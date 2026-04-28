function pT(n, a) {
  for (var r = 0; r < a.length; r++) {
    const s = a[r];
    if (typeof s != "string" && !Array.isArray(s)) {
      for (const o in s)
        if (o !== "default" && !(o in n)) {
          const c = Object.getOwnPropertyDescriptor(s, o);
          c && Object.defineProperty(n, o, c.get ? c : {
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
var Of = { exports: {} }, Cr = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sg;
function gT() {
  if (Sg) return Cr;
  Sg = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function r(s, o, c) {
    var d = null;
    if (c !== void 0 && (d = "" + c), o.key !== void 0 && (d = "" + o.key), "key" in o) {
      c = {};
      for (var h in o)
        h !== "key" && (c[h] = o[h]);
    } else c = o;
    return o = c.ref, {
      $$typeof: n,
      type: s,
      key: d,
      ref: o !== void 0 ? o : null,
      props: c
    };
  }
  return Cr.Fragment = a, Cr.jsx = r, Cr.jsxs = r, Cr;
}
var xg;
function vT() {
  return xg || (xg = 1, Of.exports = gT()), Of.exports;
}
var b = vT(), _f = { exports: {} }, Ae = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tg;
function bT() {
  if (Tg) return Ae;
  Tg = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), d = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), S = Symbol.iterator;
  function T(w) {
    return w === null || typeof w != "object" ? null : (w = S && w[S] || w["@@iterator"], typeof w == "function" ? w : null);
  }
  var E = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, C = Object.assign, j = {};
  function O(w, X, ae) {
    this.props = w, this.context = X, this.refs = j, this.updater = ae || E;
  }
  O.prototype.isReactComponent = {}, O.prototype.setState = function(w, X) {
    if (typeof w != "object" && typeof w != "function" && w != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, w, X, "setState");
  }, O.prototype.forceUpdate = function(w) {
    this.updater.enqueueForceUpdate(this, w, "forceUpdate");
  };
  function Y() {
  }
  Y.prototype = O.prototype;
  function L(w, X, ae) {
    this.props = w, this.context = X, this.refs = j, this.updater = ae || E;
  }
  var Q = L.prototype = new Y();
  Q.constructor = L, C(Q, O.prototype), Q.isPureReactComponent = !0;
  var $ = Array.isArray;
  function I() {
  }
  var ee = { H: null, A: null, T: null, S: null }, N = Object.prototype.hasOwnProperty;
  function W(w, X, ae) {
    var oe = ae.ref;
    return {
      $$typeof: n,
      type: w,
      key: X,
      ref: oe !== void 0 ? oe : null,
      props: ae
    };
  }
  function te(w, X) {
    return W(w.type, X, w.props);
  }
  function P(w) {
    return typeof w == "object" && w !== null && w.$$typeof === n;
  }
  function G(w) {
    var X = { "=": "=0", ":": "=2" };
    return "$" + w.replace(/[=:]/g, function(ae) {
      return X[ae];
    });
  }
  var le = /\/+/g;
  function de(w, X) {
    return typeof w == "object" && w !== null && w.key != null ? G("" + w.key) : X.toString(36);
  }
  function se(w) {
    switch (w.status) {
      case "fulfilled":
        return w.value;
      case "rejected":
        throw w.reason;
      default:
        switch (typeof w.status == "string" ? w.then(I, I) : (w.status = "pending", w.then(
          function(X) {
            w.status === "pending" && (w.status = "fulfilled", w.value = X);
          },
          function(X) {
            w.status === "pending" && (w.status = "rejected", w.reason = X);
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
  function B(w, X, ae, oe, Te) {
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
              return De = w._init, B(
                De(w._payload),
                X,
                ae,
                oe,
                Te
              );
          }
      }
    if (De)
      return Te = Te(w), De = oe === "" ? "." + de(w, 0) : oe, $(Te) ? (ae = "", De != null && (ae = De.replace(le, "$&/") + "/"), B(Te, X, ae, "", function(ei) {
        return ei;
      })) : Te != null && (P(Te) && (Te = te(
        Te,
        ae + (Te.key == null || w && w.key === Te.key ? "" : ("" + Te.key).replace(
          le,
          "$&/"
        ) + "/") + De
      )), X.push(Te)), 1;
    De = 0;
    var mt = oe === "" ? "." : oe + ":";
    if ($(w))
      for (var Ze = 0; Ze < w.length; Ze++)
        oe = w[Ze], Me = mt + de(oe, Ze), De += B(
          oe,
          X,
          ae,
          Me,
          Te
        );
    else if (Ze = T(w), typeof Ze == "function")
      for (w = Ze.call(w), Ze = 0; !(oe = w.next()).done; )
        oe = oe.value, Me = mt + de(oe, Ze++), De += B(
          oe,
          X,
          ae,
          Me,
          Te
        );
    else if (Me === "object") {
      if (typeof w.then == "function")
        return B(
          se(w),
          X,
          ae,
          oe,
          Te
        );
      throw X = String(w), Error(
        "Objects are not valid as a React child (found: " + (X === "[object Object]" ? "object with keys {" + Object.keys(w).join(", ") + "}" : X) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return De;
  }
  function ne(w, X, ae) {
    if (w == null) return w;
    var oe = [], Te = 0;
    return B(w, oe, "", "", function(Me) {
      return X.call(ae, Me, Te++);
    }), oe;
  }
  function re(w) {
    if (w._status === -1) {
      var X = w._result;
      X = X(), X.then(
        function(ae) {
          (w._status === 0 || w._status === -1) && (w._status = 1, w._result = ae);
        },
        function(ae) {
          (w._status === 0 || w._status === -1) && (w._status = 2, w._result = ae);
        }
      ), w._status === -1 && (w._status = 0, w._result = X);
    }
    if (w._status === 1) return w._result.default;
    throw w._result;
  }
  var fe = typeof reportError == "function" ? reportError : function(w) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var X = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof w == "object" && w !== null && typeof w.message == "string" ? String(w.message) : String(w),
        error: w
      });
      if (!window.dispatchEvent(X)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", w);
      return;
    }
    console.error(w);
  }, Re = {
    map: ne,
    forEach: function(w, X, ae) {
      ne(
        w,
        function() {
          X.apply(this, arguments);
        },
        ae
      );
    },
    count: function(w) {
      var X = 0;
      return ne(w, function() {
        X++;
      }), X;
    },
    toArray: function(w) {
      return ne(w, function(X) {
        return X;
      }) || [];
    },
    only: function(w) {
      if (!P(w))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return w;
    }
  };
  return Ae.Activity = v, Ae.Children = Re, Ae.Component = O, Ae.Fragment = r, Ae.Profiler = o, Ae.PureComponent = L, Ae.StrictMode = s, Ae.Suspense = p, Ae.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ee, Ae.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(w) {
      return ee.H.useMemoCache(w);
    }
  }, Ae.cache = function(w) {
    return function() {
      return w.apply(null, arguments);
    };
  }, Ae.cacheSignal = function() {
    return null;
  }, Ae.cloneElement = function(w, X, ae) {
    if (w == null)
      throw Error(
        "The argument must be a React element, but you passed " + w + "."
      );
    var oe = C({}, w.props), Te = w.key;
    if (X != null)
      for (Me in X.key !== void 0 && (Te = "" + X.key), X)
        !N.call(X, Me) || Me === "key" || Me === "__self" || Me === "__source" || Me === "ref" && X.ref === void 0 || (oe[Me] = X[Me]);
    var Me = arguments.length - 2;
    if (Me === 1) oe.children = ae;
    else if (1 < Me) {
      for (var De = Array(Me), mt = 0; mt < Me; mt++)
        De[mt] = arguments[mt + 2];
      oe.children = De;
    }
    return W(w.type, Te, oe);
  }, Ae.createContext = function(w) {
    return w = {
      $$typeof: d,
      _currentValue: w,
      _currentValue2: w,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, w.Provider = w, w.Consumer = {
      $$typeof: c,
      _context: w
    }, w;
  }, Ae.createElement = function(w, X, ae) {
    var oe, Te = {}, Me = null;
    if (X != null)
      for (oe in X.key !== void 0 && (Me = "" + X.key), X)
        N.call(X, oe) && oe !== "key" && oe !== "__self" && oe !== "__source" && (Te[oe] = X[oe]);
    var De = arguments.length - 2;
    if (De === 1) Te.children = ae;
    else if (1 < De) {
      for (var mt = Array(De), Ze = 0; Ze < De; Ze++)
        mt[Ze] = arguments[Ze + 2];
      Te.children = mt;
    }
    if (w && w.defaultProps)
      for (oe in De = w.defaultProps, De)
        Te[oe] === void 0 && (Te[oe] = De[oe]);
    return W(w, Me, Te);
  }, Ae.createRef = function() {
    return { current: null };
  }, Ae.forwardRef = function(w) {
    return { $$typeof: h, render: w };
  }, Ae.isValidElement = P, Ae.lazy = function(w) {
    return {
      $$typeof: g,
      _payload: { _status: -1, _result: w },
      _init: re
    };
  }, Ae.memo = function(w, X) {
    return {
      $$typeof: m,
      type: w,
      compare: X === void 0 ? null : X
    };
  }, Ae.startTransition = function(w) {
    var X = ee.T, ae = {};
    ee.T = ae;
    try {
      var oe = w(), Te = ee.S;
      Te !== null && Te(ae, oe), typeof oe == "object" && oe !== null && typeof oe.then == "function" && oe.then(I, fe);
    } catch (Me) {
      fe(Me);
    } finally {
      X !== null && ae.types !== null && (X.types = ae.types), ee.T = X;
    }
  }, Ae.unstable_useCacheRefresh = function() {
    return ee.H.useCacheRefresh();
  }, Ae.use = function(w) {
    return ee.H.use(w);
  }, Ae.useActionState = function(w, X, ae) {
    return ee.H.useActionState(w, X, ae);
  }, Ae.useCallback = function(w, X) {
    return ee.H.useCallback(w, X);
  }, Ae.useContext = function(w) {
    return ee.H.useContext(w);
  }, Ae.useDebugValue = function() {
  }, Ae.useDeferredValue = function(w, X) {
    return ee.H.useDeferredValue(w, X);
  }, Ae.useEffect = function(w, X) {
    return ee.H.useEffect(w, X);
  }, Ae.useEffectEvent = function(w) {
    return ee.H.useEffectEvent(w);
  }, Ae.useId = function() {
    return ee.H.useId();
  }, Ae.useImperativeHandle = function(w, X, ae) {
    return ee.H.useImperativeHandle(w, X, ae);
  }, Ae.useInsertionEffect = function(w, X) {
    return ee.H.useInsertionEffect(w, X);
  }, Ae.useLayoutEffect = function(w, X) {
    return ee.H.useLayoutEffect(w, X);
  }, Ae.useMemo = function(w, X) {
    return ee.H.useMemo(w, X);
  }, Ae.useOptimistic = function(w, X) {
    return ee.H.useOptimistic(w, X);
  }, Ae.useReducer = function(w, X, ae) {
    return ee.H.useReducer(w, X, ae);
  }, Ae.useRef = function(w) {
    return ee.H.useRef(w);
  }, Ae.useState = function(w) {
    return ee.H.useState(w);
  }, Ae.useSyncExternalStore = function(w, X, ae) {
    return ee.H.useSyncExternalStore(
      w,
      X,
      ae
    );
  }, Ae.useTransition = function() {
    return ee.H.useTransition();
  }, Ae.version = "19.2.5", Ae;
}
var Eg;
function kd() {
  return Eg || (Eg = 1, _f.exports = bT()), _f.exports;
}
var R = kd();
const ST = /* @__PURE__ */ yT(R), xT = /* @__PURE__ */ pT({
  __proto__: null,
  default: ST
}, [R]);
var Lf = { exports: {} }, wr = {}, Vf = { exports: {} }, Uf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Rg;
function TT() {
  return Rg || (Rg = 1, (function(n) {
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
        e: for (var fe = 0, Re = B.length, w = Re >>> 1; fe < w; ) {
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
      var c = performance;
      n.unstable_now = function() {
        return c.now();
      };
    } else {
      var d = Date, h = d.now();
      n.unstable_now = function() {
        return d.now() - h;
      };
    }
    var p = [], m = [], g = 1, v = null, S = 3, T = !1, E = !1, C = !1, j = !1, O = typeof setTimeout == "function" ? setTimeout : null, Y = typeof clearTimeout == "function" ? clearTimeout : null, L = typeof setImmediate < "u" ? setImmediate : null;
    function Q(B) {
      for (var ne = r(m); ne !== null; ) {
        if (ne.callback === null) s(m);
        else if (ne.startTime <= B)
          s(m), ne.sortIndex = ne.expirationTime, a(p, ne);
        else break;
        ne = r(m);
      }
    }
    function $(B) {
      if (C = !1, Q(B), !E)
        if (r(p) !== null)
          E = !0, I || (I = !0, G());
        else {
          var ne = r(m);
          ne !== null && se($, ne.startTime - B);
        }
    }
    var I = !1, ee = -1, N = 5, W = -1;
    function te() {
      return j ? !0 : !(n.unstable_now() - W < N);
    }
    function P() {
      if (j = !1, I) {
        var B = n.unstable_now();
        W = B;
        var ne = !0;
        try {
          e: {
            E = !1, C && (C = !1, Y(ee), ee = -1), T = !0;
            var re = S;
            try {
              t: {
                for (Q(B), v = r(p); v !== null && !(v.expirationTime > B && te()); ) {
                  var fe = v.callback;
                  if (typeof fe == "function") {
                    v.callback = null, S = v.priorityLevel;
                    var Re = fe(
                      v.expirationTime <= B
                    );
                    if (B = n.unstable_now(), typeof Re == "function") {
                      v.callback = Re, Q(B), ne = !0;
                      break t;
                    }
                    v === r(p) && s(p), Q(B);
                  } else s(p);
                  v = r(p);
                }
                if (v !== null) ne = !0;
                else {
                  var w = r(m);
                  w !== null && se(
                    $,
                    w.startTime - B
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
          ne ? G() : I = !1;
        }
      }
    }
    var G;
    if (typeof L == "function")
      G = function() {
        L(P);
      };
    else if (typeof MessageChannel < "u") {
      var le = new MessageChannel(), de = le.port2;
      le.port1.onmessage = P, G = function() {
        de.postMessage(null);
      };
    } else
      G = function() {
        O(P, 0);
      };
    function se(B, ne) {
      ee = O(function() {
        B(n.unstable_now());
      }, ne);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(B) {
      B.callback = null;
    }, n.unstable_forceFrameRate = function(B) {
      0 > B || 125 < B ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : N = 0 < B ? Math.floor(1e3 / B) : 5;
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
      j = !0;
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
      }, re > fe ? (B.sortIndex = re, a(m, B), r(p) === null && B === r(m) && (C ? (Y(ee), ee = -1) : C = !0, se($, re - fe))) : (B.sortIndex = Re, a(p, B), E || T || (E = !0, I || (I = !0, G()))), B;
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
  })(Uf)), Uf;
}
var Mg;
function ET() {
  return Mg || (Mg = 1, Vf.exports = TT()), Vf.exports;
}
var Bf = { exports: {} }, Vt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ag;
function RT() {
  if (Ag) return Vt;
  Ag = 1;
  var n = kd();
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
  function c(p, m, g) {
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
    return c(p, m, null, g);
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
var Cg;
function MT() {
  if (Cg) return Bf.exports;
  Cg = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Bf.exports = RT(), Bf.exports;
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
var wg;
function AT() {
  if (wg) return wr;
  wg = 1;
  var n = ET(), a = kd(), r = MT();
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
  function c(e) {
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
    if (c(e) !== e)
      throw Error(s(188));
  }
  function m(e) {
    var t = e.alternate;
    if (!t) {
      if (t = c(e), t === null) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var i = e, l = t; ; ) {
      var u = i.return;
      if (u === null) break;
      var f = u.alternate;
      if (f === null) {
        if (l = u.return, l !== null) {
          i = l;
          continue;
        }
        break;
      }
      if (u.child === f.child) {
        for (f = u.child; f; ) {
          if (f === i) return p(u), e;
          if (f === l) return p(u), t;
          f = f.sibling;
        }
        throw Error(s(188));
      }
      if (i.return !== l.return) i = u, l = f;
      else {
        for (var y = !1, x = u.child; x; ) {
          if (x === i) {
            y = !0, i = u, l = f;
            break;
          }
          if (x === l) {
            y = !0, l = u, i = f;
            break;
          }
          x = x.sibling;
        }
        if (!y) {
          for (x = f.child; x; ) {
            if (x === i) {
              y = !0, i = f, l = u;
              break;
            }
            if (x === l) {
              y = !0, l = f, i = u;
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
  var v = Object.assign, S = Symbol.for("react.element"), T = Symbol.for("react.transitional.element"), E = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), j = Symbol.for("react.strict_mode"), O = Symbol.for("react.profiler"), Y = Symbol.for("react.consumer"), L = Symbol.for("react.context"), Q = Symbol.for("react.forward_ref"), $ = Symbol.for("react.suspense"), I = Symbol.for("react.suspense_list"), ee = Symbol.for("react.memo"), N = Symbol.for("react.lazy"), W = Symbol.for("react.activity"), te = Symbol.for("react.memo_cache_sentinel"), P = Symbol.iterator;
  function G(e) {
    return e === null || typeof e != "object" ? null : (e = P && e[P] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var le = Symbol.for("react.client.reference");
  function de(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === le ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case C:
        return "Fragment";
      case O:
        return "Profiler";
      case j:
        return "StrictMode";
      case $:
        return "Suspense";
      case I:
        return "SuspenseList";
      case W:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case E:
          return "Portal";
        case L:
          return e.displayName || "Context";
        case Y:
          return (e._context.displayName || "Context") + ".Consumer";
        case Q:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ee:
          return t = e.displayName || null, t !== null ? t : de(e.type) || "Memo";
        case N:
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
  function w(e) {
    return { current: e };
  }
  function X(e) {
    0 > Re || (e.current = fe[Re], fe[Re] = null, Re--);
  }
  function ae(e, t) {
    Re++, fe[Re] = e.current, e.current = t;
  }
  var oe = w(null), Te = w(null), Me = w(null), De = w(null);
  function mt(e, t) {
    switch (ae(Me, t), ae(Te, e), ae(oe, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Gy(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Gy(t), e = Py(t, e);
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
    var t = oe.current, i = Py(t, e.type);
    t !== i && (ae(Te, e), ae(oe, i));
  }
  function _i(e) {
    Te.current === e && (X(oe), X(Te)), De.current === e && (X(De), Er._currentValue = re);
  }
  var _l, Tt;
  function Gt(e) {
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
                } catch (k) {
                  var q = k;
                }
                Reflect.construct(e, [], Z);
              } else {
                try {
                  Z.call();
                } catch (k) {
                  q = k;
                }
                e.call(Z.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (k) {
                q = k;
              }
              (Z = e()) && typeof Z.catch == "function" && Z.catch(function() {
              });
            }
          } catch (k) {
            if (k && q && typeof k.stack == "string")
              return [k.stack, q.stack];
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
      var f = l.DetermineComponentFrameRoot(), y = f[0], x = f[1];
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
    return (i = e ? e.displayName || e.name : "") ? Gt(i) : "";
  }
  function Xn(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Gt(e.type);
      case 16:
        return Gt("Lazy");
      case 13:
        return e.child !== t && t !== null ? Gt("Suspense Fallback") : Gt("Suspense");
      case 19:
        return Gt("SuspenseList");
      case 0:
      case 15:
        return Ll(e.type, !1);
      case 11:
        return Ll(e.type.render, !1);
      case 1:
        return Ll(e.type, !0);
      case 31:
        return Gt("Activity");
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
  var Vl = Object.prototype.hasOwnProperty, Vi = n.unstable_scheduleCallback, Ul = n.unstable_cancelCallback, xu = n.unstable_shouldYield, Tu = n.unstable_requestPaint, Bt = n.unstable_now, Fn = n.unstable_getCurrentPriorityLevel, pa = n.unstable_ImmediatePriority, Bl = n.unstable_UserBlockingPriority, ya = n.unstable_NormalPriority, En = n.unstable_LowPriority, sn = n.unstable_IdlePriority, fs = n.log, Eu = n.unstable_setDisableYieldValue, Qn = null, Ht = null;
  function Mt(e) {
    if (typeof fs == "function" && Eu(e), Ht && typeof Ht.setStrictMode == "function")
      try {
        Ht.setStrictMode(Qn, e);
      } catch {
      }
  }
  var _t = Math.clz32 ? Math.clz32 : Ru, ds = Math.log, hs = Math.LN2;
  function Ru(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (ds(e) / hs | 0) | 0;
  }
  var ti = 256, Kn = 262144, ni = 4194304;
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
    var u = 0, f = e.suspendedLanes, y = e.pingedLanes;
    e = e.warmLanes;
    var x = l & 134217727;
    return x !== 0 ? (l = x & ~f, l !== 0 ? u = Rn(l) : (y &= x, y !== 0 ? u = Rn(y) : i || (i = x & ~e, i !== 0 && (u = Rn(i))))) : (x = l & ~f, x !== 0 ? u = Rn(x) : y !== 0 ? u = Rn(y) : i || (i = l & ~e, i !== 0 && (u = Rn(i)))), u === 0 ? 0 : t !== 0 && t !== u && (t & f) === 0 && (f = u & -u, i = t & -t, f >= i || f === 32 && (i & 4194048) !== 0) ? t : u;
  }
  function ga(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Mu(e, t) {
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
  function ms(e, t, i, l, u, f) {
    var y = e.pendingLanes;
    e.pendingLanes = i, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= i, e.entangledLanes &= i, e.errorRecoveryDisabledLanes &= i, e.shellSuspendCounter = 0;
    var x = e.entanglements, M = e.expirationTimes, U = e.hiddenUpdates;
    for (i = y & ~i; 0 < i; ) {
      var F = 31 - _t(i), Z = 1 << F;
      x[F] = 0, M[F] = -1;
      var q = U[F];
      if (q !== null)
        for (U[F] = null, F = 0; F < q.length; F++) {
          var k = q[F];
          k !== null && (k.lane &= -536870913);
        }
      i &= ~Z;
    }
    l !== 0 && ps(e, l, 0), f !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= f & ~(y & ~t));
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
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : hg(e.type));
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
          for (e = Iy(e); e !== null; ) {
            if (i = e[ue]) return i;
            e = Iy(e);
          }
        return t;
      }
      e = i, i = e.parentNode;
    }
    return null;
  }
  function lt(e) {
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
      var u = l.get, f = l.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(y) {
          i = "" + y, f.call(this, y);
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
  function Au(e, t, i, l, u, f, y, x) {
    e.name = "", y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? e.type = y : e.removeAttribute("type"), t != null ? y === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + yt(t)) : e.value !== "" + yt(t) && (e.value = "" + yt(t)) : y !== "submit" && y !== "reset" || e.removeAttribute("value"), t != null ? Cu(e, y, yt(t)) : i != null ? Cu(e, y, yt(i)) : l != null && e.removeAttribute("value"), u == null && f != null && (e.defaultChecked = !!f), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.name = "" + yt(x) : e.removeAttribute("name");
  }
  function Uh(e, t, i, l, u, f, y, x) {
    if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (e.type = f), t != null || i != null) {
      if (!(f !== "submit" && f !== "reset" || t != null)) {
        qi(e);
        return;
      }
      i = i != null ? "" + yt(i) : "", t = t != null ? "" + yt(t) : i, x || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? u, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = x ? e.checked : !!l, e.defaultChecked = !!l, y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" && (e.name = y), qi(e);
  }
  function Cu(e, t, i) {
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
  function Bh(e, t, i) {
    if (t != null && (t = "" + yt(t), t !== e.value && (e.value = t), i == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = i != null ? "" + yt(i) : "";
  }
  function Hh(e, t, i, l) {
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
  function ki(e, t) {
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
  function qh(e, t, i) {
    var l = t.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, i) : typeof i != "number" || i === 0 || c1.has(t) ? t === "float" ? e.cssFloat = i : e[t] = ("" + i).trim() : e[t] = i + "px";
  }
  function Yh(e, t, i) {
    if (t != null && typeof t != "object")
      throw Error(s(62));
    if (e = e.style, i != null) {
      for (var l in i)
        !i.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var u in t)
        l = t[u], t.hasOwnProperty(u) && i[u] !== l && qh(e, u, l);
    } else
      for (var f in t)
        t.hasOwnProperty(f) && qh(e, f, t[f]);
  }
  function wu(e) {
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
  var Du = null;
  function ju(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Gi = null, Pi = null;
  function kh(e) {
    var t = lt(e);
    if (t && (e = t.stateNode)) {
      var i = e[ce] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Au(
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
                Au(
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
          Bh(e, i.value, i.defaultValue);
          break e;
        case "select":
          t = i.value, t != null && Yi(e, !!i.multiple, t, !1);
      }
    }
  }
  var Nu = !1;
  function Gh(e, t, i) {
    if (Nu) return e(t, i);
    Nu = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (Nu = !1, (Gi !== null || Pi !== null) && (ro(), Gi && (t = Gi, e = Pi, Pi = Gi = null, kh(t), e)))
        for (t = 0; t < e.length; t++) kh(e[t]);
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
  var $n = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), zu = !1;
  if ($n)
    try {
      var Yl = {};
      Object.defineProperty(Yl, "passive", {
        get: function() {
          zu = !0;
        }
      }), window.addEventListener("test", Yl, Yl), window.removeEventListener("test", Yl, Yl);
    } catch {
      zu = !1;
    }
  var Sa = null, Ou = null, Ss = null;
  function Ph() {
    if (Ss) return Ss;
    var e, t = Ou, i = t.length, l, u = "value" in Sa ? Sa.value : Sa.textContent, f = u.length;
    for (e = 0; e < i && t[e] === u[e]; e++) ;
    var y = i - e;
    for (l = 1; l <= y && t[i - l] === u[f - l]; l++) ;
    return Ss = u.slice(e, 1 < l ? 1 - l : void 0);
  }
  function xs(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ts() {
    return !0;
  }
  function Xh() {
    return !1;
  }
  function Pt(e) {
    function t(i, l, u, f, y) {
      this._reactName = i, this._targetInst = u, this.type = l, this.nativeEvent = f, this.target = y, this.currentTarget = null;
      for (var x in e)
        e.hasOwnProperty(x) && (i = e[x], this[x] = i ? i(f) : f[x]);
      return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? Ts : Xh, this.isPropagationStopped = Xh, this;
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
  }, Es = Pt(li), kl = v({}, li, { view: 0, detail: 0 }), h1 = Pt(kl), _u, Lu, Gl, Rs = v({}, kl, {
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
    getModifierState: Uu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Gl && (Gl && e.type === "mousemove" ? (_u = e.screenX - Gl.screenX, Lu = e.screenY - Gl.screenY) : Lu = _u = 0, Gl = e), _u);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Lu;
    }
  }), Fh = Pt(Rs), m1 = v({}, Rs, { dataTransfer: 0 }), p1 = Pt(m1), y1 = v({}, kl, { relatedTarget: 0 }), Vu = Pt(y1), g1 = v({}, li, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), v1 = Pt(g1), b1 = v({}, li, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), S1 = Pt(b1), x1 = v({}, li, { data: 0 }), Qh = Pt(x1), T1 = {
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
  function Uu() {
    return M1;
  }
  var A1 = v({}, kl, {
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
    getModifierState: Uu,
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
  }), Kh = Pt(w1), D1 = v({}, kl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Uu
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
  }), V1 = Pt(L1), U1 = [9, 13, 27, 32], Bu = $n && "CompositionEvent" in window, Pl = null;
  $n && "documentMode" in document && (Pl = document.documentMode);
  var B1 = $n && "TextEvent" in window && !Pl, Zh = $n && (!Bu || Pl && 8 < Pl && 11 >= Pl), $h = " ", Ih = !1;
  function Jh(e, t) {
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
  function Wh(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Xi = !1;
  function H1(e, t) {
    switch (e) {
      case "compositionend":
        return Wh(t);
      case "keypress":
        return t.which !== 32 ? null : (Ih = !0, $h);
      case "textInput":
        return e = t.data, e === $h && Ih ? null : e;
      default:
        return null;
    }
  }
  function q1(e, t) {
    if (Xi)
      return e === "compositionend" || !Bu && Jh(e, t) ? (e = Ph(), Ss = Ou = Sa = null, Xi = !1, e) : null;
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
        return Zh && t.locale !== "ko" ? null : t.data;
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
  function em(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Y1[e.type] : t === "textarea";
  }
  function tm(e, t, i, l) {
    Gi ? Pi ? Pi.push(l) : Pi = [l] : Gi = l, t = mo(t, "onChange"), 0 < t.length && (i = new Es(
      "onChange",
      "change",
      null,
      i,
      l
    ), e.push({ event: i, listeners: t }));
  }
  var Xl = null, Fl = null;
  function k1(e) {
    Uy(e, 0);
  }
  function Ms(e) {
    var t = Oe(e);
    if (gs(t)) return e;
  }
  function nm(e, t) {
    if (e === "change") return t;
  }
  var am = !1;
  if ($n) {
    var Hu;
    if ($n) {
      var qu = "oninput" in document;
      if (!qu) {
        var im = document.createElement("div");
        im.setAttribute("oninput", "return;"), qu = typeof im.oninput == "function";
      }
      Hu = qu;
    } else Hu = !1;
    am = Hu && (!document.documentMode || 9 < document.documentMode);
  }
  function lm() {
    Xl && (Xl.detachEvent("onpropertychange", rm), Fl = Xl = null);
  }
  function rm(e) {
    if (e.propertyName === "value" && Ms(Fl)) {
      var t = [];
      tm(
        t,
        Fl,
        e,
        ju(e)
      ), Gh(k1, t);
    }
  }
  function G1(e, t, i) {
    e === "focusin" ? (lm(), Xl = t, Fl = i, Xl.attachEvent("onpropertychange", rm)) : e === "focusout" && lm();
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
  function Q1(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Jt = typeof Object.is == "function" ? Object.is : Q1;
  function Ql(e, t) {
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
  function sm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function om(e, t) {
    var i = sm(e);
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
      i = sm(i);
    }
  }
  function um(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? um(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function cm(e) {
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
  function Yu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var K1 = $n && "documentMode" in document && 11 >= document.documentMode, Fi = null, ku = null, Kl = null, Gu = !1;
  function fm(e, t, i) {
    var l = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Gu || Fi == null || Fi !== vs(l) || (l = Fi, "selectionStart" in l && Yu(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), Kl && Ql(Kl, l) || (Kl = l, l = mo(ku, "onSelect"), 0 < l.length && (t = new Es(
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
  var Qi = {
    animationend: ri("Animation", "AnimationEnd"),
    animationiteration: ri("Animation", "AnimationIteration"),
    animationstart: ri("Animation", "AnimationStart"),
    transitionrun: ri("Transition", "TransitionRun"),
    transitionstart: ri("Transition", "TransitionStart"),
    transitioncancel: ri("Transition", "TransitionCancel"),
    transitionend: ri("Transition", "TransitionEnd")
  }, Pu = {}, dm = {};
  $n && (dm = document.createElement("div").style, "AnimationEvent" in window || (delete Qi.animationend.animation, delete Qi.animationiteration.animation, delete Qi.animationstart.animation), "TransitionEvent" in window || delete Qi.transitionend.transition);
  function si(e) {
    if (Pu[e]) return Pu[e];
    if (!Qi[e]) return e;
    var t = Qi[e], i;
    for (i in t)
      if (t.hasOwnProperty(i) && i in dm)
        return Pu[e] = t[i];
    return e;
  }
  var hm = si("animationend"), mm = si("animationiteration"), pm = si("animationstart"), Z1 = si("transitionrun"), $1 = si("transitionstart"), I1 = si("transitioncancel"), ym = si("transitionend"), gm = /* @__PURE__ */ new Map(), Xu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Xu.push("scrollEnd");
  function An(e, t) {
    gm.set(e, t), At(t, [e]);
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
  }, un = [], Ki = 0, Fu = 0;
  function Cs() {
    for (var e = Ki, t = Fu = Ki = 0; t < e; ) {
      var i = un[t];
      un[t++] = null;
      var l = un[t];
      un[t++] = null;
      var u = un[t];
      un[t++] = null;
      var f = un[t];
      if (un[t++] = null, l !== null && u !== null) {
        var y = l.pending;
        y === null ? u.next = u : (u.next = y.next, y.next = u), l.pending = u;
      }
      f !== 0 && vm(i, u, f);
    }
  }
  function ws(e, t, i, l) {
    un[Ki++] = e, un[Ki++] = t, un[Ki++] = i, un[Ki++] = l, Fu |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function Qu(e, t, i, l) {
    return ws(e, t, i, l), Ds(e);
  }
  function oi(e, t) {
    return ws(e, null, null, t), Ds(e);
  }
  function vm(e, t, i) {
    e.lanes |= i;
    var l = e.alternate;
    l !== null && (l.lanes |= i);
    for (var u = !1, f = e.return; f !== null; )
      f.childLanes |= i, l = f.alternate, l !== null && (l.childLanes |= i), f.tag === 22 && (e = f.stateNode, e === null || e._visibility & 1 || (u = !0)), e = f, f = f.return;
    return e.tag === 3 ? (f = e.stateNode, u && t !== null && (u = 31 - _t(i), e = f.hiddenUpdates, l = e[u], l === null ? e[u] = [t] : l.push(t), t.lane = i | 536870912), f) : null;
  }
  function Ds(e) {
    if (50 < yr)
      throw yr = 0, nf = null, Error(s(185));
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
  function bm(e, t) {
    e.flags &= 65011714;
    var i = e.alternate;
    return i === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = i.childLanes, e.lanes = i.lanes, e.child = i.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = i.memoizedProps, e.memoizedState = i.memoizedState, e.updateQueue = i.updateQueue, e.type = i.type, t = i.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function js(e, t, i, l, u, f) {
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
          return e = Wt(31, i, t, u), e.elementType = W, e.lanes = f, e;
        case C:
          return ui(i.children, u, f, t);
        case j:
          y = 8, u |= 24;
          break;
        case O:
          return e = Wt(12, i, t, u | 2), e.elementType = O, e.lanes = f, e;
        case $:
          return e = Wt(13, i, t, u), e.elementType = $, e.lanes = f, e;
        case I:
          return e = Wt(19, i, t, u), e.elementType = I, e.lanes = f, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case L:
                y = 10;
                break e;
              case Y:
                y = 9;
                break e;
              case Q:
                y = 11;
                break e;
              case ee:
                y = 14;
                break e;
              case N:
                y = 16, l = null;
                break e;
            }
          y = 29, i = Error(
            s(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = Wt(y, i, t, u), t.elementType = e, t.type = l, t.lanes = f, t;
  }
  function ui(e, t, i, l) {
    return e = Wt(7, e, l, t), e.lanes = i, e;
  }
  function Zu(e, t, i) {
    return e = Wt(6, e, null, t), e.lanes = i, e;
  }
  function Sm(e) {
    var t = Wt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function $u(e, t, i) {
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
  var xm = /* @__PURE__ */ new WeakMap();
  function cn(e, t) {
    if (typeof e == "object" && e !== null) {
      var i = xm.get(e);
      return i !== void 0 ? i : (t = {
        value: e,
        source: t,
        stack: cs(t)
      }, xm.set(e, t), t);
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
  function Tm(e, t, i) {
    fn[dn++] = Vn, fn[dn++] = Un, fn[dn++] = xa, xa = e;
    var l = Vn;
    e = Un;
    var u = 32 - _t(l) - 1;
    l &= ~(1 << u), i += 1;
    var f = 32 - _t(t) + u;
    if (30 < f) {
      var y = u - u % 5;
      f = (l & (1 << y) - 1).toString(32), l >>= y, u -= y, Vn = 1 << 32 - _t(t) + u | i << u | l, Un = f + e;
    } else
      Vn = 1 << f | i << u | l, Un = e;
  }
  function Iu(e) {
    e.return !== null && (Jn(e, 1), Tm(e, 1, 0));
  }
  function Ju(e) {
    for (; e === Ns; )
      Ns = $i[--Ii], $i[Ii] = null, Zl = $i[--Ii], $i[Ii] = null;
    for (; e === xa; )
      xa = fn[--dn], fn[dn] = null, Un = fn[--dn], fn[dn] = null, Vn = fn[--dn], fn[dn] = null;
  }
  function Em(e, t) {
    fn[dn++] = Vn, fn[dn++] = Un, fn[dn++] = xa, Vn = t.id, Un = t.overflow, xa = e;
  }
  var wt = null, tt = null, Be = !1, Ta = null, hn = !1, Wu = Error(s(519));
  function Ea(e) {
    var t = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw $l(cn(t, e)), Wu;
  }
  function Rm(e) {
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
        Le("invalid", t), Uh(
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
        Le("invalid", t), Hh(t, l.value, l.defaultValue, l.children);
    }
    i = l.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || t.textContent === "" + i || l.suppressHydrationWarning === !0 || Yy(t.textContent, i) ? (l.popover != null && (Le("beforetoggle", t), Le("toggle", t)), l.onScroll != null && Le("scroll", t), l.onScrollEnd != null && Le("scrollend", t), l.onClick != null && (t.onclick = Zn), t = !0) : t = !1, t || Ea(e, !0);
  }
  function Mm(e) {
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
    if (!Be) return Mm(e), Be = !0, !1;
    var t = e.tag, i;
    if ((i = t !== 3 && t !== 27) && ((i = t === 5) && (i = e.type, i = !(i !== "form" && i !== "button") || vf(e.type, e.memoizedProps)), i = !i), i && tt && Ea(e), Mm(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      tt = $y(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      tt = $y(e);
    } else
      t === 27 ? (t = tt, Ua(e.type) ? (e = Ef, Ef = null, tt = e) : tt = t) : tt = wt ? pn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function ci() {
    tt = wt = null, Be = !1;
  }
  function ec() {
    var e = Ta;
    return e !== null && (Kt === null ? Kt = e : Kt.push.apply(
      Kt,
      e
    ), Ta = null), e;
  }
  function $l(e) {
    Ta === null ? Ta = [e] : Ta.push(e);
  }
  var tc = w(null), fi = null, Wn = null;
  function Ra(e, t, i) {
    ae(tc, t._currentValue), t._currentValue = i;
  }
  function ea(e) {
    e._currentValue = tc.current, X(tc);
  }
  function nc(e, t, i) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === i) break;
      e = e.return;
    }
  }
  function ac(e, t, i, l) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var f = u.dependencies;
      if (f !== null) {
        var y = u.child;
        f = f.firstContext;
        e: for (; f !== null; ) {
          var x = f;
          f = u;
          for (var M = 0; M < t.length; M++)
            if (x.context === t[M]) {
              f.lanes |= i, x = f.alternate, x !== null && (x.lanes |= i), nc(
                f.return,
                i,
                e
              ), l || (y = null);
              break e;
            }
          f = x.next;
        }
      } else if (u.tag === 18) {
        if (y = u.return, y === null) throw Error(s(341));
        y.lanes |= i, f = y.alternate, f !== null && (f.lanes |= i), nc(y, i, e), y = null;
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
    for (var u = t, f = !1; u !== null; ) {
      if (!f) {
        if ((u.flags & 524288) !== 0) f = !0;
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
    e !== null && ac(
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
    return Am(fi, e);
  }
  function Os(e, t) {
    return fi === null && di(e), Am(e, t);
  }
  function Am(e, t) {
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
  function ic() {
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
  var Jl = null, lc = 0, el = 0, tl = null;
  function nx(e, t) {
    if (Jl === null) {
      var i = Jl = [];
      lc = 0, el = uf(), tl = {
        status: "pending",
        value: void 0,
        then: function(l) {
          i.push(l);
        }
      };
    }
    return lc++, t.then(Cm, Cm), t;
  }
  function Cm() {
    if (--lc === 0 && Jl !== null) {
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
  var wm = B.S;
  B.S = function(e, t) {
    fy = Bt(), typeof t == "object" && t !== null && typeof t.then == "function" && nx(e, t), wm !== null && wm(e, t);
  };
  var hi = w(null);
  function rc() {
    var e = hi.current;
    return e !== null ? e : Ie.pooledCache;
  }
  function _s(e, t) {
    t === null ? ae(hi, hi.current) : ae(hi, t.pool);
  }
  function Dm() {
    var e = rc();
    return e === null ? null : { parent: gt._currentValue, pool: e };
  }
  var nl = Error(s(460)), sc = Error(s(474)), Ls = Error(s(542)), Vs = { then: function() {
  } };
  function jm(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Nm(e, t, i) {
    switch (i = e[i], i === void 0 ? e.push(t) : i !== t && (t.then(Zn, Zn), t = i), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Om(e), e;
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
            throw e = t.reason, Om(e), e;
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
  function zm() {
    if (pi === null) throw Error(s(459));
    var e = pi;
    return pi = null, e;
  }
  function Om(e) {
    if (e === nl || e === Ls)
      throw Error(s(483));
  }
  var al = null, Wl = 0;
  function Us(e) {
    var t = Wl;
    return Wl += 1, al === null && (al = []), Nm(al, e, t);
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
  function _m(e) {
    function t(_, D) {
      if (e) {
        var V = _.deletions;
        V === null ? (_.deletions = [D], _.flags |= 16) : V.push(D);
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
      return _ = In(_, D), _.index = 0, _.sibling = null, _;
    }
    function f(_, D, V) {
      return _.index = V, e ? (V = _.alternate, V !== null ? (V = V.index, V < D ? (_.flags |= 67108866, D) : V) : (_.flags |= 67108866, D)) : (_.flags |= 1048576, D);
    }
    function y(_) {
      return e && _.alternate === null && (_.flags |= 67108866), _;
    }
    function x(_, D, V, K) {
      return D === null || D.tag !== 6 ? (D = Zu(V, _.mode, K), D.return = _, D) : (D = u(D, V), D.return = _, D);
    }
    function M(_, D, V, K) {
      var Se = V.type;
      return Se === C ? F(
        _,
        D,
        V.props.children,
        K,
        V.key
      ) : D !== null && (D.elementType === Se || typeof Se == "object" && Se !== null && Se.$$typeof === N && mi(Se) === D.type) ? (D = u(D, V.props), er(D, V), D.return = _, D) : (D = js(
        V.type,
        V.key,
        V.props,
        null,
        _.mode,
        K
      ), er(D, V), D.return = _, D);
    }
    function U(_, D, V, K) {
      return D === null || D.tag !== 4 || D.stateNode.containerInfo !== V.containerInfo || D.stateNode.implementation !== V.implementation ? (D = $u(V, _.mode, K), D.return = _, D) : (D = u(D, V.children || []), D.return = _, D);
    }
    function F(_, D, V, K, Se) {
      return D === null || D.tag !== 7 ? (D = ui(
        V,
        _.mode,
        K,
        Se
      ), D.return = _, D) : (D = u(D, V), D.return = _, D);
    }
    function Z(_, D, V) {
      if (typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint")
        return D = Zu(
          "" + D,
          _.mode,
          V
        ), D.return = _, D;
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case T:
            return V = js(
              D.type,
              D.key,
              D.props,
              null,
              _.mode,
              V
            ), er(V, D), V.return = _, V;
          case E:
            return D = $u(
              D,
              _.mode,
              V
            ), D.return = _, D;
          case N:
            return D = mi(D), Z(_, D, V);
        }
        if (se(D) || G(D))
          return D = ui(
            D,
            _.mode,
            V,
            null
          ), D.return = _, D;
        if (typeof D.then == "function")
          return Z(_, Us(D), V);
        if (D.$$typeof === L)
          return Z(
            _,
            Os(_, D),
            V
          );
        Bs(_, D);
      }
      return null;
    }
    function q(_, D, V, K) {
      var Se = D !== null ? D.key : null;
      if (typeof V == "string" && V !== "" || typeof V == "number" || typeof V == "bigint")
        return Se !== null ? null : x(_, D, "" + V, K);
      if (typeof V == "object" && V !== null) {
        switch (V.$$typeof) {
          case T:
            return V.key === Se ? M(_, D, V, K) : null;
          case E:
            return V.key === Se ? U(_, D, V, K) : null;
          case N:
            return V = mi(V), q(_, D, V, K);
        }
        if (se(V) || G(V))
          return Se !== null ? null : F(_, D, V, K, null);
        if (typeof V.then == "function")
          return q(
            _,
            D,
            Us(V),
            K
          );
        if (V.$$typeof === L)
          return q(
            _,
            D,
            Os(_, V),
            K
          );
        Bs(_, V);
      }
      return null;
    }
    function k(_, D, V, K, Se) {
      if (typeof K == "string" && K !== "" || typeof K == "number" || typeof K == "bigint")
        return _ = _.get(V) || null, x(D, _, "" + K, Se);
      if (typeof K == "object" && K !== null) {
        switch (K.$$typeof) {
          case T:
            return _ = _.get(
              K.key === null ? V : K.key
            ) || null, M(D, _, K, Se);
          case E:
            return _ = _.get(
              K.key === null ? V : K.key
            ) || null, U(D, _, K, Se);
          case N:
            return K = mi(K), k(
              _,
              D,
              V,
              K,
              Se
            );
        }
        if (se(K) || G(K))
          return _ = _.get(V) || null, F(D, _, K, Se, null);
        if (typeof K.then == "function")
          return k(
            _,
            D,
            V,
            Us(K),
            Se
          );
        if (K.$$typeof === L)
          return k(
            _,
            D,
            V,
            Os(D, K),
            Se
          );
        Bs(D, K);
      }
      return null;
    }
    function me(_, D, V, K) {
      for (var Se = null, qe = null, ve = D, we = D = 0, Ue = null; ve !== null && we < V.length; we++) {
        ve.index > we ? (Ue = ve, ve = null) : Ue = ve.sibling;
        var Ye = q(
          _,
          ve,
          V[we],
          K
        );
        if (Ye === null) {
          ve === null && (ve = Ue);
          break;
        }
        e && ve && Ye.alternate === null && t(_, ve), D = f(Ye, D, we), qe === null ? Se = Ye : qe.sibling = Ye, qe = Ye, ve = Ue;
      }
      if (we === V.length)
        return i(_, ve), Be && Jn(_, we), Se;
      if (ve === null) {
        for (; we < V.length; we++)
          ve = Z(_, V[we], K), ve !== null && (D = f(
            ve,
            D,
            we
          ), qe === null ? Se = ve : qe.sibling = ve, qe = ve);
        return Be && Jn(_, we), Se;
      }
      for (ve = l(ve); we < V.length; we++)
        Ue = k(
          ve,
          _,
          we,
          V[we],
          K
        ), Ue !== null && (e && Ue.alternate !== null && ve.delete(
          Ue.key === null ? we : Ue.key
        ), D = f(
          Ue,
          D,
          we
        ), qe === null ? Se = Ue : qe.sibling = Ue, qe = Ue);
      return e && ve.forEach(function(ka) {
        return t(_, ka);
      }), Be && Jn(_, we), Se;
    }
    function Ee(_, D, V, K) {
      if (V == null) throw Error(s(151));
      for (var Se = null, qe = null, ve = D, we = D = 0, Ue = null, Ye = V.next(); ve !== null && !Ye.done; we++, Ye = V.next()) {
        ve.index > we ? (Ue = ve, ve = null) : Ue = ve.sibling;
        var ka = q(_, ve, Ye.value, K);
        if (ka === null) {
          ve === null && (ve = Ue);
          break;
        }
        e && ve && ka.alternate === null && t(_, ve), D = f(ka, D, we), qe === null ? Se = ka : qe.sibling = ka, qe = ka, ve = Ue;
      }
      if (Ye.done)
        return i(_, ve), Be && Jn(_, we), Se;
      if (ve === null) {
        for (; !Ye.done; we++, Ye = V.next())
          Ye = Z(_, Ye.value, K), Ye !== null && (D = f(Ye, D, we), qe === null ? Se = Ye : qe.sibling = Ye, qe = Ye);
        return Be && Jn(_, we), Se;
      }
      for (ve = l(ve); !Ye.done; we++, Ye = V.next())
        Ye = k(ve, _, we, Ye.value, K), Ye !== null && (e && Ye.alternate !== null && ve.delete(Ye.key === null ? we : Ye.key), D = f(Ye, D, we), qe === null ? Se = Ye : qe.sibling = Ye, qe = Ye);
      return e && ve.forEach(function(mT) {
        return t(_, mT);
      }), Be && Jn(_, we), Se;
    }
    function Ke(_, D, V, K) {
      if (typeof V == "object" && V !== null && V.type === C && V.key === null && (V = V.props.children), typeof V == "object" && V !== null) {
        switch (V.$$typeof) {
          case T:
            e: {
              for (var Se = V.key; D !== null; ) {
                if (D.key === Se) {
                  if (Se = V.type, Se === C) {
                    if (D.tag === 7) {
                      i(
                        _,
                        D.sibling
                      ), K = u(
                        D,
                        V.props.children
                      ), K.return = _, _ = K;
                      break e;
                    }
                  } else if (D.elementType === Se || typeof Se == "object" && Se !== null && Se.$$typeof === N && mi(Se) === D.type) {
                    i(
                      _,
                      D.sibling
                    ), K = u(D, V.props), er(K, V), K.return = _, _ = K;
                    break e;
                  }
                  i(_, D);
                  break;
                } else t(_, D);
                D = D.sibling;
              }
              V.type === C ? (K = ui(
                V.props.children,
                _.mode,
                K,
                V.key
              ), K.return = _, _ = K) : (K = js(
                V.type,
                V.key,
                V.props,
                null,
                _.mode,
                K
              ), er(K, V), K.return = _, _ = K);
            }
            return y(_);
          case E:
            e: {
              for (Se = V.key; D !== null; ) {
                if (D.key === Se)
                  if (D.tag === 4 && D.stateNode.containerInfo === V.containerInfo && D.stateNode.implementation === V.implementation) {
                    i(
                      _,
                      D.sibling
                    ), K = u(D, V.children || []), K.return = _, _ = K;
                    break e;
                  } else {
                    i(_, D);
                    break;
                  }
                else t(_, D);
                D = D.sibling;
              }
              K = $u(V, _.mode, K), K.return = _, _ = K;
            }
            return y(_);
          case N:
            return V = mi(V), Ke(
              _,
              D,
              V,
              K
            );
        }
        if (se(V))
          return me(
            _,
            D,
            V,
            K
          );
        if (G(V)) {
          if (Se = G(V), typeof Se != "function") throw Error(s(150));
          return V = Se.call(V), Ee(
            _,
            D,
            V,
            K
          );
        }
        if (typeof V.then == "function")
          return Ke(
            _,
            D,
            Us(V),
            K
          );
        if (V.$$typeof === L)
          return Ke(
            _,
            D,
            Os(_, V),
            K
          );
        Bs(_, V);
      }
      return typeof V == "string" && V !== "" || typeof V == "number" || typeof V == "bigint" ? (V = "" + V, D !== null && D.tag === 6 ? (i(_, D.sibling), K = u(D, V), K.return = _, _ = K) : (i(_, D), K = Zu(V, _.mode, K), K.return = _, _ = K), y(_)) : i(_, D);
    }
    return function(_, D, V, K) {
      try {
        Wl = 0;
        var Se = Ke(
          _,
          D,
          V,
          K
        );
        return al = null, Se;
      } catch (ve) {
        if (ve === nl || ve === Ls) throw ve;
        var qe = Wt(29, ve, null, _.mode);
        return qe.lanes = K, qe.return = _, qe;
      } finally {
      }
    };
  }
  var yi = _m(!0), Lm = _m(!1), Ma = !1;
  function oc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function uc(e, t) {
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
    if (l = l.shared, (ke & 2) !== 0) {
      var u = l.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), l.pending = t, t = Ds(e), vm(e, null, i), t;
    }
    return ws(e, l, t, i), Ds(e);
  }
  function tr(e, t, i) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (i & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, i |= l, t.lanes = i, ys(e, i);
    }
  }
  function cc(e, t) {
    var i = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, i === l)) {
      var u = null, f = null;
      if (i = i.firstBaseUpdate, i !== null) {
        do {
          var y = {
            lane: i.lane,
            tag: i.tag,
            payload: i.payload,
            callback: null,
            next: null
          };
          f === null ? u = f = y : f = f.next = y, i = i.next;
        } while (i !== null);
        f === null ? u = f = t : f = f.next = t;
      } else u = f = t;
      i = {
        baseState: l.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: f,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = i;
      return;
    }
    e = i.lastBaseUpdate, e === null ? i.firstBaseUpdate = t : e.next = t, i.lastBaseUpdate = t;
  }
  var fc = !1;
  function nr() {
    if (fc) {
      var e = tl;
      if (e !== null) throw e;
    }
  }
  function ar(e, t, i, l) {
    fc = !1;
    var u = e.updateQueue;
    Ma = !1;
    var f = u.firstBaseUpdate, y = u.lastBaseUpdate, x = u.shared.pending;
    if (x !== null) {
      u.shared.pending = null;
      var M = x, U = M.next;
      M.next = null, y === null ? f = U : y.next = U, y = M;
      var F = e.alternate;
      F !== null && (F = F.updateQueue, x = F.lastBaseUpdate, x !== y && (x === null ? F.firstBaseUpdate = U : x.next = U, F.lastBaseUpdate = M));
    }
    if (f !== null) {
      var Z = u.baseState;
      y = 0, F = U = M = null, x = f;
      do {
        var q = x.lane & -536870913, k = q !== x.lane;
        if (k ? (Ve & q) === q : (l & q) === q) {
          q !== 0 && q === el && (fc = !0), F !== null && (F = F.next = {
            lane: 0,
            tag: x.tag,
            payload: x.payload,
            callback: null,
            next: null
          });
          e: {
            var me = e, Ee = x;
            q = t;
            var Ke = i;
            switch (Ee.tag) {
              case 1:
                if (me = Ee.payload, typeof me == "function") {
                  Z = me.call(Ke, Z, q);
                  break e;
                }
                Z = me;
                break e;
              case 3:
                me.flags = me.flags & -65537 | 128;
              case 0:
                if (me = Ee.payload, q = typeof me == "function" ? me.call(Ke, Z, q) : me, q == null) break e;
                Z = v({}, Z, q);
                break e;
              case 2:
                Ma = !0;
            }
          }
          q = x.callback, q !== null && (e.flags |= 64, k && (e.flags |= 8192), k = u.callbacks, k === null ? u.callbacks = [q] : k.push(q));
        } else
          k = {
            lane: q,
            tag: x.tag,
            payload: x.payload,
            callback: x.callback,
            next: null
          }, F === null ? (U = F = k, M = Z) : F = F.next = k, y |= q;
        if (x = x.next, x === null) {
          if (x = u.shared.pending, x === null)
            break;
          k = x, x = k.next, k.next = null, u.lastBaseUpdate = k, u.shared.pending = null;
        }
      } while (!0);
      F === null && (M = Z), u.baseState = M, u.firstBaseUpdate = U, u.lastBaseUpdate = F, f === null && (u.shared.lanes = 0), za |= y, e.lanes = y, e.memoizedState = Z;
    }
  }
  function Vm(e, t) {
    if (typeof e != "function")
      throw Error(s(191, e));
    e.call(t);
  }
  function Um(e, t) {
    var i = e.callbacks;
    if (i !== null)
      for (e.callbacks = null, e = 0; e < i.length; e++)
        Vm(i[e], t);
  }
  var il = w(null), Hs = w(0);
  function Bm(e, t) {
    e = ua, ae(Hs, e), ae(il, t), ua = e | t.baseLanes;
  }
  function dc() {
    ae(Hs, ua), ae(il, il.current);
  }
  function hc() {
    ua = Hs.current, X(il), X(Hs);
  }
  var en = w(null), mn = null;
  function wa(e) {
    var t = e.alternate;
    ae(ft, ft.current & 1), ae(en, e), mn === null && (t === null || il.current !== null || t.memoizedState !== null) && (mn = e);
  }
  function mc(e) {
    ae(ft, ft.current), ae(en, e), mn === null && (mn = e);
  }
  function Hm(e) {
    e.tag === 22 ? (ae(ft, ft.current), ae(en, e), mn === null && (mn = e)) : Da();
  }
  function Da() {
    ae(ft, ft.current), ae(en, en.current);
  }
  function tn(e) {
    X(en), mn === e && (mn = null), X(ft);
  }
  var ft = w(0);
  function qs(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var i = t.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || xf(i) || Tf(i)))
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
  var ta = 0, Ce = null, Fe = null, vt = null, Ys = !1, ll = !1, gi = !1, ks = 0, ir = 0, rl = null, ix = 0;
  function ot() {
    throw Error(s(321));
  }
  function pc(e, t) {
    if (t === null) return !1;
    for (var i = 0; i < t.length && i < e.length; i++)
      if (!Jt(e[i], t[i])) return !1;
    return !0;
  }
  function yc(e, t, i, l, u, f) {
    return ta = f, Ce = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, B.H = e === null || e.memoizedState === null ? Tp : Nc, gi = !1, f = i(l, u), gi = !1, ll && (f = Ym(
      t,
      i,
      l,
      u
    )), qm(e), f;
  }
  function qm(e) {
    B.H = sr;
    var t = Fe !== null && Fe.next !== null;
    if (ta = 0, vt = Fe = Ce = null, Ys = !1, ir = 0, rl = null, t) throw Error(s(300));
    e === null || bt || (e = e.dependencies, e !== null && zs(e) && (bt = !0));
  }
  function Ym(e, t, i, l) {
    Ce = e;
    var u = 0;
    do {
      if (ll && (rl = null), ir = 0, ll = !1, 25 <= u) throw Error(s(301));
      if (u += 1, vt = Fe = null, e.updateQueue != null) {
        var f = e.updateQueue;
        f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
      }
      B.H = Ep, f = t(i, l);
    } while (ll);
    return f;
  }
  function lx() {
    var e = B.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? lr(t) : t, e = e.useState()[0], (Fe !== null ? Fe.memoizedState : null) !== e && (Ce.flags |= 1024), t;
  }
  function gc() {
    var e = ks !== 0;
    return ks = 0, e;
  }
  function vc(e, t, i) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i;
  }
  function bc(e) {
    if (Ys) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Ys = !1;
    }
    ta = 0, vt = Fe = Ce = null, ll = !1, ir = ks = 0, rl = null;
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
  function lr(e) {
    var t = ir;
    return ir += 1, rl === null && (rl = []), e = Nm(rl, e, t), t = Ce, (vt === null ? t.memoizedState : vt.next) === null && (t = t.alternate, B.H = t === null || t.memoizedState === null ? Tp : Nc), e;
  }
  function Ps(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return lr(e);
      if (e.$$typeof === L) return Dt(e);
    }
    throw Error(s(438, String(e)));
  }
  function Sc(e) {
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
  function Xs(e) {
    var t = dt();
    return xc(t, Fe, e);
  }
  function xc(e, t, i) {
    var l = e.queue;
    if (l === null) throw Error(s(311));
    l.lastRenderedReducer = i;
    var u = e.baseQueue, f = l.pending;
    if (f !== null) {
      if (u !== null) {
        var y = u.next;
        u.next = f.next, f.next = y;
      }
      t.baseQueue = u = f, l.pending = null;
    }
    if (f = e.baseState, u === null) e.memoizedState = f;
    else {
      t = u.next;
      var x = y = null, M = null, U = t, F = !1;
      do {
        var Z = U.lane & -536870913;
        if (Z !== U.lane ? (Ve & Z) === Z : (ta & Z) === Z) {
          var q = U.revertLane;
          if (q === 0)
            M !== null && (M = M.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: U.action,
              hasEagerState: U.hasEagerState,
              eagerState: U.eagerState,
              next: null
            }), Z === el && (F = !0);
          else if ((ta & q) === q) {
            U = U.next, q === el && (F = !0);
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
            }, M === null ? (x = M = Z, y = f) : M = M.next = Z, Ce.lanes |= q, za |= q;
          Z = U.action, gi && i(f, Z), f = U.hasEagerState ? U.eagerState : i(f, Z);
        } else
          q = {
            lane: Z,
            revertLane: U.revertLane,
            gesture: U.gesture,
            action: U.action,
            hasEagerState: U.hasEagerState,
            eagerState: U.eagerState,
            next: null
          }, M === null ? (x = M = q, y = f) : M = M.next = q, Ce.lanes |= Z, za |= Z;
        U = U.next;
      } while (U !== null && U !== t);
      if (M === null ? y = f : M.next = x, !Jt(f, e.memoizedState) && (bt = !0, F && (i = tl, i !== null)))
        throw i;
      e.memoizedState = f, e.baseState = y, e.baseQueue = M, l.lastRenderedState = f;
    }
    return u === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Tc(e) {
    var t = dt(), i = t.queue;
    if (i === null) throw Error(s(311));
    i.lastRenderedReducer = e;
    var l = i.dispatch, u = i.pending, f = t.memoizedState;
    if (u !== null) {
      i.pending = null;
      var y = u = u.next;
      do
        f = e(f, y.action), y = y.next;
      while (y !== u);
      Jt(f, t.memoizedState) || (bt = !0), t.memoizedState = f, t.baseQueue === null && (t.baseState = f), i.lastRenderedState = f;
    }
    return [f, l];
  }
  function km(e, t, i) {
    var l = Ce, u = dt(), f = Be;
    if (f) {
      if (i === void 0) throw Error(s(407));
      i = i();
    } else i = t();
    var y = !Jt(
      (Fe || u).memoizedState,
      i
    );
    if (y && (u.memoizedState = i, bt = !0), u = u.queue, Mc(Xm.bind(null, l, u, e), [
      e
    ]), u.getSnapshot !== t || y || vt !== null && vt.memoizedState.tag & 1) {
      if (l.flags |= 2048, sl(
        9,
        { destroy: void 0 },
        Pm.bind(
          null,
          l,
          u,
          i,
          t
        ),
        null
      ), Ie === null) throw Error(s(349));
      f || (ta & 127) !== 0 || Gm(l, t, i);
    }
    return i;
  }
  function Gm(e, t, i) {
    e.flags |= 16384, e = { getSnapshot: t, value: i }, t = Ce.updateQueue, t === null ? (t = Gs(), Ce.updateQueue = t, t.stores = [e]) : (i = t.stores, i === null ? t.stores = [e] : i.push(e));
  }
  function Pm(e, t, i, l) {
    t.value = i, t.getSnapshot = l, Fm(t) && Qm(e);
  }
  function Xm(e, t, i) {
    return i(function() {
      Fm(t) && Qm(e);
    });
  }
  function Fm(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var i = t();
      return !Jt(e, i);
    } catch {
      return !0;
    }
  }
  function Qm(e) {
    var t = oi(e, 2);
    t !== null && Zt(t, e, 2);
  }
  function Ec(e) {
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
    return e.baseState = i, xc(
      e,
      Fe,
      typeof l == "function" ? l : na
    );
  }
  function rx(e, t, i, l, u) {
    if (Ks(e)) throw Error(s(485));
    if (e = t.action, e !== null) {
      var f = {
        payload: u,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(y) {
          f.listeners.push(y);
        }
      };
      B.T !== null ? i(!0) : f.isTransition = !1, l(f), i = t.pending, i === null ? (f.next = t.pending = f, Zm(t, f)) : (f.next = i.next, t.pending = i.next = f);
    }
  }
  function Zm(e, t) {
    var i = t.action, l = t.payload, u = e.state;
    if (t.isTransition) {
      var f = B.T, y = {};
      B.T = y;
      try {
        var x = i(u, l), M = B.S;
        M !== null && M(y, x), $m(e, t, x);
      } catch (U) {
        Rc(e, t, U);
      } finally {
        f !== null && y.types !== null && (f.types = y.types), B.T = f;
      }
    } else
      try {
        f = i(u, l), $m(e, t, f);
      } catch (U) {
        Rc(e, t, U);
      }
  }
  function $m(e, t, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(l) {
        Im(e, t, l);
      },
      function(l) {
        return Rc(e, t, l);
      }
    ) : Im(e, t, i);
  }
  function Im(e, t, i) {
    t.status = "fulfilled", t.value = i, Jm(t), e.state = i, t = e.pending, t !== null && (i = t.next, i === t ? e.pending = null : (i = i.next, t.next = i, Zm(e, i)));
  }
  function Rc(e, t, i) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = i, Jm(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function Jm(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Wm(e, t) {
    return t;
  }
  function ep(e, t) {
    if (Be) {
      var i = Ie.formState;
      if (i !== null) {
        e: {
          var l = Ce;
          if (Be) {
            if (tt) {
              t: {
                for (var u = tt, f = hn; u.nodeType !== 8; ) {
                  if (!f) {
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
                f = u.data, u = f === "F!" || f === "F" ? u : null;
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
      lastRenderedReducer: Wm,
      lastRenderedState: t
    }, i.queue = l, i = bp.bind(
      null,
      Ce,
      l
    ), l.dispatch = i, l = Ec(!1), f = jc.bind(
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
      f,
      i
    ), u.dispatch = i, l.memoizedState = e, [t, i, !1];
  }
  function tp(e) {
    var t = dt();
    return np(t, Fe, e);
  }
  function np(e, t, i) {
    if (t = xc(
      e,
      t,
      Wm
    )[0], e = Xs(na)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = lr(t);
      } catch (y) {
        throw y === nl ? Ls : y;
      }
    else l = t;
    t = dt();
    var u = t.queue, f = u.dispatch;
    return i !== t.memoizedState && (Ce.flags |= 2048, sl(
      9,
      { destroy: void 0 },
      sx.bind(null, u, i),
      null
    )), [l, f, e];
  }
  function sx(e, t) {
    e.action = t;
  }
  function ap(e) {
    var t = dt(), i = Fe;
    if (i !== null)
      return np(t, i, e);
    dt(), t = t.memoizedState, i = dt();
    var l = i.queue.dispatch;
    return i.memoizedState = e, [t, l, !1];
  }
  function sl(e, t, i, l) {
    return e = { tag: e, create: i, deps: l, inst: t, next: null }, t = Ce.updateQueue, t === null && (t = Gs(), Ce.updateQueue = t), i = t.lastEffect, i === null ? t.lastEffect = e.next = e : (l = i.next, i.next = e, e.next = l, t.lastEffect = e), e;
  }
  function ip() {
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
  function Qs(e, t, i, l) {
    var u = dt();
    l = l === void 0 ? null : l;
    var f = u.memoizedState.inst;
    Fe !== null && l !== null && pc(l, Fe.memoizedState.deps) ? u.memoizedState = sl(t, f, i, l) : (Ce.flags |= e, u.memoizedState = sl(
      1 | t,
      f,
      i,
      l
    ));
  }
  function lp(e, t) {
    Fs(8390656, 8, e, t);
  }
  function Mc(e, t) {
    Qs(2048, 8, e, t);
  }
  function ox(e) {
    Ce.flags |= 4;
    var t = Ce.updateQueue;
    if (t === null)
      t = Gs(), Ce.updateQueue = t, t.events = [e];
    else {
      var i = t.events;
      i === null ? t.events = [e] : i.push(e);
    }
  }
  function rp(e) {
    var t = dt().memoizedState;
    return ox({ ref: t, nextImpl: e }), function() {
      if ((ke & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function sp(e, t) {
    return Qs(4, 2, e, t);
  }
  function op(e, t) {
    return Qs(4, 4, e, t);
  }
  function up(e, t) {
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
  function cp(e, t, i) {
    i = i != null ? i.concat([e]) : null, Qs(4, 4, up.bind(null, t, e), i);
  }
  function Ac() {
  }
  function fp(e, t) {
    var i = dt();
    t = t === void 0 ? null : t;
    var l = i.memoizedState;
    return t !== null && pc(t, l[1]) ? l[0] : (i.memoizedState = [e, t], e);
  }
  function dp(e, t) {
    var i = dt();
    t = t === void 0 ? null : t;
    var l = i.memoizedState;
    if (t !== null && pc(t, l[1]))
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
  function Cc(e, t, i) {
    return i === void 0 || (ta & 1073741824) !== 0 && (Ve & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = i, e = hy(), Ce.lanes |= e, za |= e, i);
  }
  function hp(e, t, i, l) {
    return Jt(i, t) ? i : il.current !== null ? (e = Cc(e, i, l), Jt(e, t) || (bt = !0), e) : (ta & 42) === 0 || (ta & 1073741824) !== 0 && (Ve & 261930) === 0 ? (bt = !0, e.memoizedState = i) : (e = hy(), Ce.lanes |= e, za |= e, t);
  }
  function mp(e, t, i, l, u) {
    var f = ne.p;
    ne.p = f !== 0 && 8 > f ? f : 8;
    var y = B.T, x = {};
    B.T = x, jc(e, !1, t, i);
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
      ne.p = f, y !== null && x.types !== null && (y.types = x.types), B.T = y;
    }
  }
  function ux() {
  }
  function wc(e, t, i, l) {
    if (e.tag !== 5) throw Error(s(476));
    var u = pp(e).queue;
    mp(
      e,
      u,
      t,
      re,
      i === null ? ux : function() {
        return yp(e), i(l);
      }
    );
  }
  function pp(e) {
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
  function yp(e) {
    var t = pp(e);
    t.next === null && (t = e.alternate.memoizedState), rr(
      e,
      t.next.queue,
      {},
      ln()
    );
  }
  function Dc() {
    return Dt(Er);
  }
  function gp() {
    return dt().memoizedState;
  }
  function vp() {
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
          l !== null && (Zt(l, t, i), tr(l, t, i)), t = { cache: ic() }, e.payload = t;
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
    }, Ks(e) ? Sp(t, i) : (i = Qu(e, t, i, l), i !== null && (Zt(i, e, l), xp(i, t, l)));
  }
  function bp(e, t, i) {
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
    if (Ks(e)) Sp(t, u);
    else {
      var f = e.alternate;
      if (e.lanes === 0 && (f === null || f.lanes === 0) && (f = t.lastRenderedReducer, f !== null))
        try {
          var y = t.lastRenderedState, x = f(y, i);
          if (u.hasEagerState = !0, u.eagerState = x, Jt(x, y))
            return ws(e, t, u, 0), Ie === null && Cs(), !1;
        } catch {
        } finally {
        }
      if (i = Qu(e, t, u, l), i !== null)
        return Zt(i, e, l), xp(i, t, l), !0;
    }
    return !1;
  }
  function jc(e, t, i, l) {
    if (l = {
      lane: 2,
      revertLane: uf(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ks(e)) {
      if (t) throw Error(s(479));
    } else
      t = Qu(
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
  function Sp(e, t) {
    ll = Ys = !0;
    var i = e.pending;
    i === null ? t.next = t : (t.next = i.next, i.next = t), e.pending = t;
  }
  function xp(e, t, i) {
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
  var Tp = {
    readContext: Dt,
    use: Ps,
    useCallback: function(e, t) {
      return qt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Dt,
    useEffect: lp,
    useImperativeHandle: function(e, t, i) {
      i = i != null ? i.concat([e]) : null, Fs(
        4194308,
        4,
        up.bind(null, t, e),
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
      e = Ec(e);
      var t = e.queue, i = bp.bind(null, Ce, t);
      return t.dispatch = i, [e.memoizedState, i];
    },
    useDebugValue: Ac,
    useDeferredValue: function(e, t) {
      var i = qt();
      return Cc(i, e, t);
    },
    useTransition: function() {
      var e = Ec(!1);
      return e = mp.bind(
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
      var f = { value: i, getSnapshot: t };
      return u.queue = f, lp(Xm.bind(null, l, f, e), [
        e
      ]), l.flags |= 2048, sl(
        9,
        { destroy: void 0 },
        Pm.bind(
          null,
          l,
          f,
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
        i = (l & ~(1 << 32 - _t(l) - 1)).toString(32) + i, t = "_" + t + "R_" + i, i = ks++, 0 < i && (t += "H" + i.toString(32)), t += "_";
      } else
        i = ix++, t = "_" + t + "r_" + i.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Dc,
    useFormState: ep,
    useActionState: ep,
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
      return t.queue = i, t = jc.bind(
        null,
        Ce,
        !0,
        i
      ), i.dispatch = t, [e, t];
    },
    useMemoCache: Sc,
    useCacheRefresh: function() {
      return qt().memoizedState = cx.bind(
        null,
        Ce
      );
    },
    useEffectEvent: function(e) {
      var t = qt(), i = { impl: e };
      return t.memoizedState = i, function() {
        if ((ke & 2) !== 0)
          throw Error(s(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, Nc = {
    readContext: Dt,
    use: Ps,
    useCallback: fp,
    useContext: Dt,
    useEffect: Mc,
    useImperativeHandle: cp,
    useInsertionEffect: sp,
    useLayoutEffect: op,
    useMemo: dp,
    useReducer: Xs,
    useRef: ip,
    useState: function() {
      return Xs(na);
    },
    useDebugValue: Ac,
    useDeferredValue: function(e, t) {
      var i = dt();
      return hp(
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
    useSyncExternalStore: km,
    useId: gp,
    useHostTransitionStatus: Dc,
    useFormState: tp,
    useActionState: tp,
    useOptimistic: function(e, t) {
      var i = dt();
      return Km(i, Fe, e, t);
    },
    useMemoCache: Sc,
    useCacheRefresh: vp
  };
  Nc.useEffectEvent = rp;
  var Ep = {
    readContext: Dt,
    use: Ps,
    useCallback: fp,
    useContext: Dt,
    useEffect: Mc,
    useImperativeHandle: cp,
    useInsertionEffect: sp,
    useLayoutEffect: op,
    useMemo: dp,
    useReducer: Tc,
    useRef: ip,
    useState: function() {
      return Tc(na);
    },
    useDebugValue: Ac,
    useDeferredValue: function(e, t) {
      var i = dt();
      return Fe === null ? Cc(i, e, t) : hp(
        i,
        Fe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Tc(na)[0], t = dt().memoizedState;
      return [
        typeof e == "boolean" ? e : lr(e),
        t
      ];
    },
    useSyncExternalStore: km,
    useId: gp,
    useHostTransitionStatus: Dc,
    useFormState: ap,
    useActionState: ap,
    useOptimistic: function(e, t) {
      var i = dt();
      return Fe !== null ? Km(i, Fe, e, t) : (i.baseState = e, [e, i.queue.dispatch]);
    },
    useMemoCache: Sc,
    useCacheRefresh: vp
  };
  Ep.useEffectEvent = rp;
  function zc(e, t, i, l) {
    t = e.memoizedState, i = i(l, t), i = i == null ? t : v({}, t, i), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
  }
  var Oc = {
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
  function Rp(e, t, i, l, u, f, y) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, f, y) : t.prototype && t.prototype.isPureReactComponent ? !Ql(i, l) || !Ql(u, f) : !0;
  }
  function Mp(e, t, i, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(i, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(i, l), t.state !== e && Oc.enqueueReplaceState(t, t.state, null);
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
  function Ap(e) {
    As(e);
  }
  function Cp(e) {
    console.error(e);
  }
  function wp(e) {
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
  function Dp(e, t, i) {
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
  function _c(e, t, i) {
    return i = Aa(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      Zs(e, t);
    }, i;
  }
  function jp(e) {
    return e = Aa(e), e.tag = 3, e;
  }
  function Np(e, t, i, l) {
    var u = i.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var f = l.value;
      e.payload = function() {
        return u(f);
      }, e.callback = function() {
        Dp(t, i, l);
      };
    }
    var y = i.stateNode;
    y !== null && typeof y.componentDidCatch == "function" && (e.callback = function() {
      Dp(t, i, l), typeof u != "function" && (Oa === null ? Oa = /* @__PURE__ */ new Set([this]) : Oa.add(this));
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
            return mn === null ? so() : i.alternate === null && ut === 0 && (ut = 3), i.flags &= -257, i.flags |= 65536, i.lanes = u, l === Vs ? i.flags |= 16384 : (t = i.updateQueue, t === null ? i.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), rf(e, l, u)), !1;
          case 22:
            return i.flags |= 65536, l === Vs ? i.flags |= 16384 : (t = i.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, i.updateQueue = t) : (i = t.retryQueue, i === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : i.add(l)), rf(e, l, u)), !1;
        }
        throw Error(s(435, i.tag));
      }
      return rf(e, l, u), so(), !1;
    }
    if (Be)
      return t = en.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, l !== Wu && (e = Error(s(422), { cause: l }), $l(cn(e, i)))) : (l !== Wu && (t = Error(s(423), {
        cause: l
      }), $l(
        cn(t, i)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, l = cn(l, i), u = _c(
        e.stateNode,
        l,
        u
      ), cc(e, u), ut !== 4 && (ut = 2)), !1;
    var f = Error(s(520), { cause: l });
    if (f = cn(f, i), pr === null ? pr = [f] : pr.push(f), ut !== 4 && (ut = 2), t === null) return !0;
    l = cn(l, i), i = t;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, e = u & -u, i.lanes |= e, e = _c(i.stateNode, l, e), cc(i, e), !1;
        case 1:
          if (t = i.type, f = i.stateNode, (i.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (Oa === null || !Oa.has(f))))
            return i.flags |= 65536, u &= -u, i.lanes |= u, u = jp(u), Np(
              u,
              e,
              i,
              l
            ), cc(i, u), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var Lc = Error(s(461)), bt = !1;
  function jt(e, t, i, l) {
    t.child = e === null ? Lm(t, null, i, l) : yi(
      t,
      e.child,
      i,
      l
    );
  }
  function zp(e, t, i, l, u) {
    i = i.render;
    var f = t.ref;
    if ("ref" in l) {
      var y = {};
      for (var x in l)
        x !== "ref" && (y[x] = l[x]);
    } else y = l;
    return di(t), l = yc(
      e,
      t,
      i,
      y,
      f,
      u
    ), x = gc(), e !== null && !bt ? (vc(e, t, u), aa(e, t, u)) : (Be && x && Iu(t), t.flags |= 1, jt(e, t, l, u), t.child);
  }
  function Op(e, t, i, l, u) {
    if (e === null) {
      var f = i.type;
      return typeof f == "function" && !Ku(f) && f.defaultProps === void 0 && i.compare === null ? (t.tag = 15, t.type = f, _p(
        e,
        t,
        f,
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
    if (f = e.child, !Gc(e, u)) {
      var y = f.memoizedProps;
      if (i = i.compare, i = i !== null ? i : Ql, i(y, l) && e.ref === t.ref)
        return aa(e, t, u);
    }
    return t.flags |= 1, e = In(f, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function _p(e, t, i, l, u) {
    if (e !== null) {
      var f = e.memoizedProps;
      if (Ql(f, l) && e.ref === t.ref)
        if (bt = !1, t.pendingProps = l = f, Gc(e, u))
          (e.flags & 131072) !== 0 && (bt = !0);
        else
          return t.lanes = e.lanes, aa(e, t, u);
    }
    return Vc(
      e,
      t,
      i,
      l,
      u
    );
  }
  function Lp(e, t, i, l) {
    var u = l.children, f = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (f = f !== null ? f.baseLanes | i : i, e !== null) {
          for (l = t.child = e.child, u = 0; l !== null; )
            u = u | l.lanes | l.childLanes, l = l.sibling;
          l = u & ~f;
        } else l = 0, t.child = null;
        return Vp(
          e,
          t,
          f,
          i,
          l
        );
      }
      if ((i & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && _s(
          t,
          f !== null ? f.cachePool : null
        ), f !== null ? Bm(t, f) : dc(), Hm(t);
      else
        return l = t.lanes = 536870912, Vp(
          e,
          t,
          f !== null ? f.baseLanes | i : i,
          i,
          l
        );
    } else
      f !== null ? (_s(t, f.cachePool), Bm(t, f), Da(), t.memoizedState = null) : (e !== null && _s(t, null), dc(), Da());
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
  function Vp(e, t, i, l, u) {
    var f = rc();
    return f = f === null ? null : { parent: gt._currentValue, pool: f }, t.memoizedState = {
      baseLanes: i,
      cachePool: f
    }, e !== null && _s(t, null), dc(), Hm(t), e !== null && Wi(e, t, l, !0), t.childLanes = u, null;
  }
  function $s(e, t) {
    return t = Js(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Up(e, t, i) {
    return yi(t, e.child, null, i), e = $s(t, t.pendingProps), e.flags |= 2, tn(t), t.memoizedState = null, e;
  }
  function hx(e, t, i) {
    var l = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Be) {
        if (l.mode === "hidden")
          return e = $s(t, l), t.lanes = 536870912, or(null, e);
        if (mc(t), (e = tt) ? (e = Zy(
          e,
          hn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: xa !== null ? { id: Vn, overflow: Un } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Sm(e), i.return = t, t.child = i, wt = t, tt = null)) : e = null, e === null) throw Ea(t);
        return t.lanes = 536870912, null;
      }
      return $s(t, l);
    }
    var f = e.memoizedState;
    if (f !== null) {
      var y = f.dehydrated;
      if (mc(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = Up(
            e,
            t,
            i
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(s(558));
      else if (bt || Wi(e, t, i, !1), u = (i & e.childLanes) !== 0, bt || u) {
        if (l = Ie, l !== null && (y = A(l, i), y !== 0 && y !== f.retryLane))
          throw f.retryLane = y, oi(e, y), Zt(l, e, y), Lc;
        so(), t = Up(
          e,
          t,
          i
        );
      } else
        e = f.treeContext, tt = pn(y.nextSibling), wt = t, Be = !0, Ta = null, hn = !1, e !== null && Em(t, e), t = $s(t, l), t.flags |= 4096;
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
  function Vc(e, t, i, l, u) {
    return di(t), i = yc(
      e,
      t,
      i,
      l,
      void 0,
      u
    ), l = gc(), e !== null && !bt ? (vc(e, t, u), aa(e, t, u)) : (Be && l && Iu(t), t.flags |= 1, jt(e, t, i, u), t.child);
  }
  function Bp(e, t, i, l, u, f) {
    return di(t), t.updateQueue = null, i = Ym(
      t,
      l,
      i,
      u
    ), qm(e), l = gc(), e !== null && !bt ? (vc(e, t, f), aa(e, t, f)) : (Be && l && Iu(t), t.flags |= 1, jt(e, t, i, f), t.child);
  }
  function Hp(e, t, i, l, u) {
    if (di(t), t.stateNode === null) {
      var f = Zi, y = i.contextType;
      typeof y == "object" && y !== null && (f = Dt(y)), f = new i(l, f), t.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = Oc, t.stateNode = f, f._reactInternals = t, f = t.stateNode, f.props = l, f.state = t.memoizedState, f.refs = {}, oc(t), y = i.contextType, f.context = typeof y == "object" && y !== null ? Dt(y) : Zi, f.state = t.memoizedState, y = i.getDerivedStateFromProps, typeof y == "function" && (zc(
        t,
        i,
        y,
        l
      ), f.state = t.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (y = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), y !== f.state && Oc.enqueueReplaceState(f, f.state, null), ar(t, l, f, u), nr(), f.state = t.memoizedState), typeof f.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      f = t.stateNode;
      var x = t.memoizedProps, M = vi(i, x);
      f.props = M;
      var U = f.context, F = i.contextType;
      y = Zi, typeof F == "object" && F !== null && (y = Dt(F));
      var Z = i.getDerivedStateFromProps;
      F = typeof Z == "function" || typeof f.getSnapshotBeforeUpdate == "function", x = t.pendingProps !== x, F || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (x || U !== y) && Mp(
        t,
        f,
        l,
        y
      ), Ma = !1;
      var q = t.memoizedState;
      f.state = q, ar(t, l, f, u), nr(), U = t.memoizedState, x || q !== U || Ma ? (typeof Z == "function" && (zc(
        t,
        i,
        Z,
        l
      ), U = t.memoizedState), (M = Ma || Rp(
        t,
        i,
        M,
        l,
        q,
        U,
        y
      )) ? (F || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = U), f.props = l, f.state = U, f.context = y, l = M) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      f = t.stateNode, uc(e, t), y = t.memoizedProps, F = vi(i, y), f.props = F, Z = t.pendingProps, q = f.context, U = i.contextType, M = Zi, typeof U == "object" && U !== null && (M = Dt(U)), x = i.getDerivedStateFromProps, (U = typeof x == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (y !== Z || q !== M) && Mp(
        t,
        f,
        l,
        M
      ), Ma = !1, q = t.memoizedState, f.state = q, ar(t, l, f, u), nr();
      var k = t.memoizedState;
      y !== Z || q !== k || Ma || e !== null && e.dependencies !== null && zs(e.dependencies) ? (typeof x == "function" && (zc(
        t,
        i,
        x,
        l
      ), k = t.memoizedState), (F = Ma || Rp(
        t,
        i,
        F,
        l,
        q,
        k,
        M
      ) || e !== null && e.dependencies !== null && zs(e.dependencies)) ? (U || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(l, k, M), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
        l,
        k,
        M
      )), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || y === e.memoizedProps && q === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && q === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = k), f.props = l, f.state = k, f.context = M, l = F) : (typeof f.componentDidUpdate != "function" || y === e.memoizedProps && q === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && q === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return f = l, Is(e, t), l = (t.flags & 128) !== 0, f || l ? (f = t.stateNode, i = l && typeof i.getDerivedStateFromError != "function" ? null : f.render(), t.flags |= 1, e !== null && l ? (t.child = yi(
      t,
      e.child,
      null,
      u
    ), t.child = yi(
      t,
      null,
      i,
      u
    )) : jt(e, t, i, u), t.memoizedState = f.state, e = t.child) : e = aa(
      e,
      t,
      u
    ), e;
  }
  function qp(e, t, i, l) {
    return ci(), t.flags |= 256, jt(e, t, i, l), t.child;
  }
  var Uc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Bc(e) {
    return { baseLanes: e, cachePool: Dm() };
  }
  function Hc(e, t, i) {
    return e = e !== null ? e.childLanes & ~i : 0, t && (e |= an), e;
  }
  function Yp(e, t, i) {
    var l = t.pendingProps, u = !1, f = (t.flags & 128) !== 0, y;
    if ((y = f) || (y = e !== null && e.memoizedState === null ? !1 : (ft.current & 2) !== 0), y && (u = !0, t.flags &= -129), y = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Be) {
        if (u ? wa(t) : Da(), (e = tt) ? (e = Zy(
          e,
          hn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: xa !== null ? { id: Vn, overflow: Un } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Sm(e), i.return = t, t.child = i, wt = t, tt = null)) : e = null, e === null) throw Ea(t);
        return Tf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
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
      ), x.return = t, l.return = t, x.sibling = l, t.child = x, l = t.child, l.memoizedState = Bc(i), l.childLanes = Hc(
        e,
        y,
        i
      ), t.memoizedState = Uc, or(null, l)) : (wa(t), qc(t, x));
    }
    var M = e.memoizedState;
    if (M !== null && (x = M.dehydrated, x !== null)) {
      if (f)
        t.flags & 256 ? (wa(t), t.flags &= -257, t = Yc(
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
        ), l = t.child, l.memoizedState = Bc(i), l.childLanes = Hc(
          e,
          y,
          i
        ), t.memoizedState = Uc, t = or(null, l));
      else if (wa(t), Tf(x)) {
        if (y = x.nextSibling && x.nextSibling.dataset, y) var U = y.dgst;
        y = U, l = Error(s(419)), l.stack = "", l.digest = y, $l({ value: l, source: null, stack: null }), t = Yc(
          e,
          t,
          i
        );
      } else if (bt || Wi(e, t, i, !1), y = (i & e.childLanes) !== 0, bt || y) {
        if (y = Ie, y !== null && (l = A(y, i), l !== 0 && l !== M.retryLane))
          throw M.retryLane = l, oi(e, l), Zt(y, e, l), Lc;
        xf(x) || so(), t = Yc(
          e,
          t,
          i
        );
      } else
        xf(x) ? (t.flags |= 192, t.child = e.child, t = null) : (e = M.treeContext, tt = pn(
          x.nextSibling
        ), wt = t, Be = !0, Ta = null, hn = !1, e !== null && Em(t, e), t = qc(
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
    ), x.flags |= 2), x.return = t, l.return = t, l.sibling = x, t.child = l, or(null, l), l = t.child, x = e.child.memoizedState, x === null ? x = Bc(i) : (u = x.cachePool, u !== null ? (M = gt._currentValue, u = u.parent !== M ? { parent: M, pool: M } : u) : u = Dm(), x = {
      baseLanes: x.baseLanes | i,
      cachePool: u
    }), l.memoizedState = x, l.childLanes = Hc(
      e,
      y,
      i
    ), t.memoizedState = Uc, or(e.child, l)) : (wa(t), i = e.child, e = i.sibling, i = In(i, {
      mode: "visible",
      children: l.children
    }), i.return = t, i.sibling = null, e !== null && (y = t.deletions, y === null ? (t.deletions = [e], t.flags |= 16) : y.push(e)), t.child = i, t.memoizedState = null, i);
  }
  function qc(e, t) {
    return t = Js(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Js(e, t) {
    return e = Wt(22, e, null, t), e.lanes = 0, e;
  }
  function Yc(e, t, i) {
    return yi(t, e.child, null, i), e = qc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function kp(e, t, i) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), nc(e.return, t, i);
  }
  function kc(e, t, i, l, u, f) {
    var y = e.memoizedState;
    y === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: i,
      tailMode: u,
      treeForkCount: f
    } : (y.isBackwards = t, y.rendering = null, y.renderingStartTime = 0, y.last = l, y.tail = i, y.tailMode = u, y.treeForkCount = f);
  }
  function Gp(e, t, i) {
    var l = t.pendingProps, u = l.revealOrder, f = l.tail;
    l = l.children;
    var y = ft.current, x = (y & 2) !== 0;
    if (x ? (y = y & 1 | 2, t.flags |= 128) : y &= 1, ae(ft, y), jt(e, t, l, i), l = Be ? Zl : 0, !x && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && kp(e, i, t);
        else if (e.tag === 19)
          kp(e, i, t);
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
        i = u, i === null ? (u = t.child, t.child = null) : (u = i.sibling, i.sibling = null), kc(
          t,
          !1,
          u,
          i,
          f,
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
        kc(
          t,
          !0,
          i,
          null,
          f,
          l
        );
        break;
      case "together":
        kc(
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
          return t.flags |= 128, mc(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (wa(t), t.flags |= 128, null) : (i & t.child.childLanes) !== 0 ? Yp(e, t, i) : (wa(t), e = aa(
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
        return t.lanes = 0, Lp(
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
  function Pp(e, t, i) {
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
      bt = !1, Be && (t.flags & 1048576) !== 0 && Tm(t, Zl, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = mi(t.elementType), t.type = e, typeof e == "function")
            Ku(e) ? (l = vi(e, l), t.tag = 1, t = Hp(
              null,
              t,
              e,
              l,
              i
            )) : (t.tag = 0, t = Vc(
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
                t.tag = 11, t = zp(
                  null,
                  t,
                  e,
                  l,
                  i
                );
                break e;
              } else if (u === ee) {
                t.tag = 14, t = Op(
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
        return Vc(
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
        ), Hp(
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
          var f = t.memoizedState;
          u = f.element, uc(e, t), ar(t, l, null, i);
          var y = t.memoizedState;
          if (l = y.cache, Ra(t, gt, l), l !== f.cache && ac(
            t,
            [gt],
            i,
            !0
          ), nr(), l = y.element, f.isDehydrated)
            if (f = {
              element: l,
              isDehydrated: !1,
              cache: y.cache
            }, t.updateQueue.baseState = f, t.memoizedState = f, t.flags & 256) {
              t = qp(
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
              ), $l(u), t = qp(
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
              for (tt = pn(e.firstChild), wt = t, Be = !0, Ta = null, hn = !0, i = Lm(
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
        return Is(e, t), e === null ? (i = tg(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = i : Be || (i = t.type, e = t.pendingProps, l = po(
          Me.current
        ).createElement(i), l[ue] = t, l[ce] = e, Nt(l, i, e), We(l), t.stateNode = l) : t.memoizedState = tg(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return ei(t), e === null && Be && (l = t.stateNode = Jy(
          t.type,
          t.pendingProps,
          Me.current
        ), wt = t, hn = !0, u = tt, Ua(t.type) ? (Ef = u, tt = pn(l.firstChild)) : tt = u), jt(
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
        ), l !== null ? (t.stateNode = l, wt = t, tt = pn(l.firstChild), hn = !1, u = !0) : u = !1), u || Ea(t)), ei(t), u = t.type, f = t.pendingProps, y = e !== null ? e.memoizedProps : null, l = f.children, vf(u, f) ? l = null : y !== null && vf(u, y) && (t.flags |= 32), t.memoizedState !== null && (u = yc(
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
        return Yp(e, t, i);
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
        return zp(
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
        return Op(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 15:
        return _p(
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
        return Lp(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        return di(t), l = Dt(gt), e === null ? (u = rc(), u === null && (u = Ie, f = ic(), u.pooledCache = f, f.refCount++, f !== null && (u.pooledCacheLanes |= i), u = f), t.memoizedState = { parent: l, cache: u }, oc(t), Ra(t, gt, u)) : ((e.lanes & i) !== 0 && (uc(e, t), ar(t, null, null, i), nr()), u = e.memoizedState, f = t.memoizedState, u.parent !== l ? (u = { parent: l, cache: l }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), Ra(t, gt, l)) : (l = f.cache, Ra(t, gt, l), l !== u.cache && ac(
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
  function Pc(e, t, i, l, u) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (gy()) e.flags |= 8192;
        else
          throw pi = Vs, sc;
    } else e.flags &= -16777217;
  }
  function Xp(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !rg(t))
      if (gy()) e.flags |= 8192;
      else
        throw pi = Vs, sc;
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
    switch (Ju(t), t.tag) {
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
        return i = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), ea(gt), Ze(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (Ji(t) ? ia(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, ec())), nt(t), null;
      case 26:
        var u = t.type, f = t.memoizedState;
        return e === null ? (ia(t), f !== null ? (nt(t), Xp(t, f)) : (nt(t), Pc(
          t,
          u,
          null,
          l,
          i
        ))) : f ? f !== e.memoizedState ? (ia(t), nt(t), Xp(t, f)) : (nt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && ia(t), nt(t), Pc(
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
          e = oe.current, Ji(t) ? Rm(t) : (e = Jy(u, l, i), t.stateNode = e, ia(t));
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
          if (f = oe.current, Ji(t))
            Rm(t);
          else {
            var y = po(
              Me.current
            );
            switch (f) {
              case 1:
                f = y.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                f = y.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    f = y.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    f = y.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    f = y.createElement("div"), f.innerHTML = "<script><\/script>", f = f.removeChild(
                      f.firstChild
                    );
                    break;
                  case "select":
                    f = typeof l.is == "string" ? y.createElement("select", {
                      is: l.is
                    }) : y.createElement("select"), l.multiple ? f.multiple = !0 : l.size && (f.size = l.size);
                    break;
                  default:
                    f = typeof l.is == "string" ? y.createElement(u, { is: l.is }) : y.createElement(u);
                }
            }
            f[ue] = t, f[ce] = l;
            e: for (y = t.child; y !== null; ) {
              if (y.tag === 5 || y.tag === 6)
                f.appendChild(y.stateNode);
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
            t.stateNode = f;
            e: switch (Nt(f, u, l), u) {
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
        return nt(t), Pc(
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
            e[ue] = t, e = !!(e.nodeValue === i || l !== null && l.suppressHydrationWarning === !0 || Yy(e.nodeValue, i)), e || Ea(t, !0);
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
            i = ec(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), e = !0;
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
            u = ec(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (tn(t), t) : (tn(t), null);
        }
        return tn(t), (t.flags & 128) !== 0 ? (t.lanes = i, t) : (i = l !== null, e = e !== null && e.memoizedState !== null, i && (l = t.child, u = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (u = l.alternate.memoizedState.cachePool.pool), f = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (f = l.memoizedState.cachePool.pool), f !== u && (l.flags |= 2048)), i !== e && i && (t.child.flags |= 8192), Ws(t, t.updateQueue), nt(t), null);
      case 4:
        return Ze(), e === null && hf(t.stateNode.containerInfo), nt(t), null;
      case 10:
        return ea(t.type), nt(t), null;
      case 19:
        if (X(ft), l = t.memoizedState, l === null) return nt(t), null;
        if (u = (t.flags & 128) !== 0, f = l.rendering, f === null)
          if (u) ur(l, !1);
          else {
            if (ut !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (f = qs(e), f !== null) {
                  for (t.flags |= 128, ur(l, !1), e = f.updateQueue, t.updateQueue = e, Ws(t, e), t.subtreeFlags = 0, e = i, i = t.child; i !== null; )
                    bm(i, e), i = i.sibling;
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
            if (e = qs(f), e !== null) {
              if (t.flags |= 128, u = !0, e = e.updateQueue, t.updateQueue = e, Ws(t, e), ur(l, !0), l.tail === null && l.tailMode === "hidden" && !f.alternate && !Be)
                return nt(t), null;
            } else
              2 * Bt() - l.renderingStartTime > io && i !== 536870912 && (t.flags |= 128, u = !0, ur(l, !1), t.lanes = 4194304);
          l.isBackwards ? (f.sibling = t.child, t.child = f) : (e = l.last, e !== null ? e.sibling = f : t.child = f, l.last = f);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = Bt(), e.sibling = null, i = ft.current, ae(
          ft,
          u ? i & 1 | 2 : i & 1
        ), Be && Jn(t, l.treeForkCount), e) : (nt(t), null);
      case 22:
      case 23:
        return tn(t), hc(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (i & 536870912) !== 0 && (t.flags & 128) === 0 && (nt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : nt(t), i = t.updateQueue, i !== null && Ws(t, i.retryQueue), i = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== i && (t.flags |= 2048), e !== null && X(hi), null;
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
    switch (Ju(t), t.tag) {
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
        return tn(t), hc(), e !== null && X(hi), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return ea(gt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Fp(e, t) {
    switch (Ju(t), t.tag) {
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
        tn(t), hc(), e !== null && X(hi);
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
            var f = i.create, y = i.inst;
            l = f(), y.destroy = l;
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
        var f = u.next;
        l = f;
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
        } while (l !== f);
      }
    } catch (F) {
      Pe(t, t.return, F);
    }
  }
  function Qp(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var i = e.stateNode;
      try {
        Um(t, i);
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
  function Zp(e) {
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
  function Xc(e, t, i) {
    try {
      var l = e.stateNode;
      Bx(l, e.type, i, t), l[ce] = t;
    } catch (u) {
      Pe(e, e.return, u);
    }
  }
  function $p(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Ua(e.type) || e.tag === 4;
  }
  function Fc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || $p(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Ua(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Qc(e, t, i) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(e, t) : (t = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, t.appendChild(e), i = i._reactRootContainer, i != null || t.onclick !== null || (t.onclick = Zn));
    else if (l !== 4 && (l === 27 && Ua(e.type) && (i = e.stateNode, t = null), e = e.child, e !== null))
      for (Qc(e, t, i), e = e.sibling; e !== null; )
        Qc(e, t, i), e = e.sibling;
  }
  function eo(e, t, i) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? i.insertBefore(e, t) : i.appendChild(e);
    else if (l !== 4 && (l === 27 && Ua(e.type) && (i = e.stateNode), e = e.child, e !== null))
      for (eo(e, t, i), e = e.sibling; e !== null; )
        eo(e, t, i), e = e.sibling;
  }
  function Ip(e) {
    var t = e.stateNode, i = e.memoizedProps;
    try {
      for (var l = e.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      Nt(t, l, i), t[ue] = e, t[ce] = i;
    } catch (f) {
      Pe(e, e.return, f);
    }
  }
  var la = !1, St = !1, Kc = !1, Jp = typeof WeakSet == "function" ? WeakSet : Set, Ct = null;
  function gx(e, t) {
    if (e = e.containerInfo, yf = To, e = cm(e), Yu(e)) {
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
            var u = l.anchorOffset, f = l.focusNode;
            l = l.focusOffset;
            try {
              i.nodeType, f.nodeType;
            } catch {
              i = null;
              break e;
            }
            var y = 0, x = -1, M = -1, U = 0, F = 0, Z = e, q = null;
            t: for (; ; ) {
              for (var k; Z !== i || u !== 0 && Z.nodeType !== 3 || (x = y + u), Z !== f || l !== 0 && Z.nodeType !== 3 || (M = y + l), Z.nodeType === 3 && (y += Z.nodeValue.length), (k = Z.firstChild) !== null; )
                q = Z, Z = k;
              for (; ; ) {
                if (Z === e) break t;
                if (q === i && ++U === u && (x = y), q === f && ++F === l && (M = y), (k = Z.nextSibling) !== null) break;
                Z = q, q = Z.parentNode;
              }
              Z = k;
            }
            i = x === -1 || M === -1 ? null : { start: x, end: M };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (gf = { focusedElem: e, selectionRange: i }, To = !1, Ct = t; Ct !== null; )
      if (t = Ct, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Ct = e;
      else
        for (; Ct !== null; ) {
          switch (t = Ct, f = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (i = 0; i < e.length; i++)
                  u = e[i], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && f !== null) {
                e = void 0, i = t, u = f.memoizedProps, f = f.memoizedState, l = i.stateNode;
                try {
                  var me = vi(
                    i.type,
                    u
                  );
                  e = l.getSnapshotBeforeUpdate(
                    me,
                    f
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
                  Sf(e);
                else if (i === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Sf(e);
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
  function Wp(e, t, i) {
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
        l & 64 && Qp(i), l & 512 && fr(i, i.return);
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
            Um(e, t);
          } catch (y) {
            Pe(i, i.return, y);
          }
        }
        break;
      case 27:
        t === null && l & 4 && Ip(i);
      case 26:
      case 5:
        sa(e, i), t === null && l & 4 && Zp(i), l & 512 && fr(i, i.return);
        break;
      case 12:
        sa(e, i);
        break;
      case 31:
        sa(e, i), l & 4 && ny(e, i);
        break;
      case 13:
        sa(e, i), l & 4 && ay(e, i), l & 64 && (e = i.memoizedState, e !== null && (e = e.dehydrated, e !== null && (i = Ax.bind(
          null,
          i
        ), Fx(e, i))));
        break;
      case 22:
        if (l = i.memoizedState !== null || la, !l) {
          t = t !== null && t.memoizedState !== null || St, u = la;
          var f = St;
          la = l, (St = t) && !f ? oa(
            e,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : sa(e, i), la = u, St = f;
        }
        break;
      case 30:
        break;
      default:
        sa(e, i);
    }
  }
  function ey(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, ey(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && $e(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var rt = null, Xt = !1;
  function ra(e, t, i) {
    for (i = i.child; i !== null; )
      ty(e, t, i), i = i.sibling;
  }
  function ty(e, t, i) {
    if (Ht && typeof Ht.onCommitFiberUnmount == "function")
      try {
        Ht.onCommitFiberUnmount(Qn, i);
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
        var l = rt, u = Xt;
        Ua(i.type) && (rt = i.stateNode, Xt = !1), ra(
          e,
          t,
          i
        ), Sr(i.stateNode), rt = l, Xt = u;
        break;
      case 5:
        St || Bn(i, t);
      case 6:
        if (l = rt, u = Xt, rt = null, ra(
          e,
          t,
          i
        ), rt = l, Xt = u, rt !== null)
          if (Xt)
            try {
              (rt.nodeType === 9 ? rt.body : rt.nodeName === "HTML" ? rt.ownerDocument.body : rt).removeChild(i.stateNode);
            } catch (f) {
              Pe(
                i,
                t,
                f
              );
            }
          else
            try {
              rt.removeChild(i.stateNode);
            } catch (f) {
              Pe(
                i,
                t,
                f
              );
            }
        break;
      case 18:
        rt !== null && (Xt ? (e = rt, Qy(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          i.stateNode
        ), bl(e)) : Qy(rt, i.stateNode));
        break;
      case 4:
        l = rt, u = Xt, rt = i.stateNode.containerInfo, Xt = !0, ra(
          e,
          t,
          i
        ), rt = l, Xt = u;
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
  function ny(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        bl(e);
      } catch (i) {
        Pe(t, t.return, i);
      }
    }
  }
  function ay(e, t) {
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
        return t === null && (t = e.stateNode = new Jp()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Jp()), t;
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
        var u = i[l], f = e, y = t, x = y;
        e: for (; x !== null; ) {
          switch (x.tag) {
            case 27:
              if (Ua(x.type)) {
                rt = x.stateNode, Xt = !1;
                break e;
              }
              break;
            case 5:
              rt = x.stateNode, Xt = !1;
              break e;
            case 3:
            case 4:
              rt = x.stateNode.containerInfo, Xt = !0;
              break e;
          }
          x = x.return;
        }
        if (rt === null) throw Error(s(160));
        ty(f, y, u), rt = null, Xt = !1, f = u.alternate, f !== null && (f.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        iy(t, e), t = t.sibling;
  }
  var Cn = null;
  function iy(e, t) {
    var i = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Ft(t, e), Qt(e), l & 4 && (ja(3, e, e.return), cr(3, e), ja(5, e, e.return));
        break;
      case 1:
        Ft(t, e), Qt(e), l & 512 && (St || i === null || Bn(i, i.return)), l & 64 && la && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (i = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = i === null ? l : i.concat(l))));
        break;
      case 26:
        var u = Cn;
        if (Ft(t, e), Qt(e), l & 512 && (St || i === null || Bn(i, i.return)), l & 4) {
          var f = i !== null ? i.memoizedState : null;
          if (l = e.memoizedState, i === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, i = e.memoizedProps, u = u.ownerDocument || u;
                  t: switch (l) {
                    case "title":
                      f = u.getElementsByTagName("title")[0], (!f || f[je] || f[ue] || f.namespaceURI === "http://www.w3.org/2000/svg" || f.hasAttribute("itemprop")) && (f = u.createElement(l), u.head.insertBefore(
                        f,
                        u.querySelector("head > title")
                      )), Nt(f, l, i), f[ue] = e, We(f), l = f;
                      break e;
                    case "link":
                      var y = ig(
                        "link",
                        "href",
                        u
                      ).get(l + (i.href || ""));
                      if (y) {
                        for (var x = 0; x < y.length; x++)
                          if (f = y[x], f.getAttribute("href") === (i.href == null || i.href === "" ? null : i.href) && f.getAttribute("rel") === (i.rel == null ? null : i.rel) && f.getAttribute("title") === (i.title == null ? null : i.title) && f.getAttribute("crossorigin") === (i.crossOrigin == null ? null : i.crossOrigin)) {
                            y.splice(x, 1);
                            break t;
                          }
                      }
                      f = u.createElement(l), Nt(f, l, i), u.head.appendChild(f);
                      break;
                    case "meta":
                      if (y = ig(
                        "meta",
                        "content",
                        u
                      ).get(l + (i.content || ""))) {
                        for (x = 0; x < y.length; x++)
                          if (f = y[x], f.getAttribute("content") === (i.content == null ? null : "" + i.content) && f.getAttribute("name") === (i.name == null ? null : i.name) && f.getAttribute("property") === (i.property == null ? null : i.property) && f.getAttribute("http-equiv") === (i.httpEquiv == null ? null : i.httpEquiv) && f.getAttribute("charset") === (i.charSet == null ? null : i.charSet)) {
                            y.splice(x, 1);
                            break t;
                          }
                      }
                      f = u.createElement(l), Nt(f, l, i), u.head.appendChild(f);
                      break;
                    default:
                      throw Error(s(468, l));
                  }
                  f[ue] = e, We(f), l = f;
                }
                e.stateNode = l;
              } else
                lg(
                  u,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = ag(
                u,
                l,
                e.memoizedProps
              );
          else
            f !== l ? (f === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : f.count--, l === null ? lg(
              u,
              e.type,
              e.stateNode
            ) : ag(
              u,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && Xc(
              e,
              e.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        Ft(t, e), Qt(e), l & 512 && (St || i === null || Bn(i, i.return)), i !== null && l & 4 && Xc(
          e,
          e.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (Ft(t, e), Qt(e), l & 512 && (St || i === null || Bn(i, i.return)), e.flags & 32) {
          u = e.stateNode;
          try {
            ki(u, "");
          } catch (me) {
            Pe(e, e.return, me);
          }
        }
        l & 4 && e.stateNode != null && (u = e.memoizedProps, Xc(
          e,
          u,
          i !== null ? i.memoizedProps : u
        )), l & 1024 && (Kc = !0);
        break;
      case 6:
        if (Ft(t, e), Qt(e), l & 4) {
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
        if (vo = null, u = Cn, Cn = yo(t.containerInfo), Ft(t, e), Cn = u, Qt(e), l & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            bl(t.containerInfo);
          } catch (me) {
            Pe(e, e.return, me);
          }
        Kc && (Kc = !1, ly(e));
        break;
      case 4:
        l = Cn, Cn = yo(
          e.stateNode.containerInfo
        ), Ft(t, e), Qt(e), Cn = l;
        break;
      case 12:
        Ft(t, e), Qt(e);
        break;
      case 31:
        Ft(t, e), Qt(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, to(e, l)));
        break;
      case 13:
        Ft(t, e), Qt(e), e.child.flags & 8192 && e.memoizedState !== null != (i !== null && i.memoizedState !== null) && (ao = Bt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, to(e, l)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var M = i !== null && i.memoizedState !== null, U = la, F = St;
        if (la = U || u, St = F || M, Ft(t, e), St = F, la = U, Qt(e), l & 8192)
          e: for (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (i === null || M || la || St || bi(e)), i = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (i === null) {
                M = i = t;
                try {
                  if (f = M.stateNode, u)
                    y = f.style, typeof y.setProperty == "function" ? y.setProperty("display", "none", "important") : y.display = "none";
                  else {
                    x = M.stateNode;
                    var Z = M.memoizedProps.style, q = Z != null && Z.hasOwnProperty("display") ? Z.display : null;
                    x.style.display = q == null || typeof q == "boolean" ? "" : ("" + q).trim();
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
                  var k = M.stateNode;
                  u ? Ky(k, !0) : Ky(M.stateNode, !1);
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
        Ft(t, e), Qt(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, to(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Ft(t, e), Qt(e);
    }
  }
  function Qt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var i, l = e.return; l !== null; ) {
          if ($p(l)) {
            i = l;
            break;
          }
          l = l.return;
        }
        if (i == null) throw Error(s(160));
        switch (i.tag) {
          case 27:
            var u = i.stateNode, f = Fc(e);
            eo(e, f, u);
            break;
          case 5:
            var y = i.stateNode;
            i.flags & 32 && (ki(y, ""), i.flags &= -33);
            var x = Fc(e);
            eo(e, x, y);
            break;
          case 3:
          case 4:
            var M = i.stateNode.containerInfo, U = Fc(e);
            Qc(
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
  function ly(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        ly(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function sa(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Wp(e, t.alternate, t), t = t.sibling;
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
      var l = t.alternate, u = e, f = t, y = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          oa(
            u,
            f,
            i
          ), cr(4, f);
          break;
        case 1:
          if (oa(
            u,
            f,
            i
          ), l = f, u = l.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (U) {
              Pe(l, l.return, U);
            }
          if (l = f, u = l.updateQueue, u !== null) {
            var x = l.stateNode;
            try {
              var M = u.shared.hiddenCallbacks;
              if (M !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < M.length; u++)
                  Vm(M[u], x);
            } catch (U) {
              Pe(l, l.return, U);
            }
          }
          i && y & 64 && Qp(f), fr(f, f.return);
          break;
        case 27:
          Ip(f);
        case 26:
        case 5:
          oa(
            u,
            f,
            i
          ), i && l === null && y & 4 && Zp(f), fr(f, f.return);
          break;
        case 12:
          oa(
            u,
            f,
            i
          );
          break;
        case 31:
          oa(
            u,
            f,
            i
          ), i && y & 4 && ny(u, f);
          break;
        case 13:
          oa(
            u,
            f,
            i
          ), i && y & 4 && ay(u, f);
          break;
        case 22:
          f.memoizedState === null && oa(
            u,
            f,
            i
          ), fr(f, f.return);
          break;
        case 30:
          break;
        default:
          oa(
            u,
            f,
            i
          );
      }
      t = t.sibling;
    }
  }
  function Zc(e, t) {
    var i = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== i && (e != null && e.refCount++, i != null && Il(i));
  }
  function $c(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Il(e));
  }
  function wn(e, t, i, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        ry(
          e,
          t,
          i,
          l
        ), t = t.sibling;
  }
  function ry(e, t, i, l) {
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
            var f = t.memoizedProps, y = f.id, x = f.onPostCommit;
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
        f = t.stateNode, y = t.alternate, t.memoizedState !== null ? f._visibility & 2 ? wn(
          e,
          t,
          i,
          l
        ) : dr(e, t) : f._visibility & 2 ? wn(
          e,
          t,
          i,
          l
        ) : (f._visibility |= 2, ol(
          e,
          t,
          i,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && Zc(y, t);
        break;
      case 24:
        wn(
          e,
          t,
          i,
          l
        ), u & 2048 && $c(t.alternate, t);
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
      var f = e, y = t, x = i, M = l, U = y.flags;
      switch (y.tag) {
        case 0:
        case 11:
        case 15:
          ol(
            f,
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
            f,
            y,
            x,
            M,
            u
          ) : dr(
            f,
            y
          ) : (F._visibility |= 2, ol(
            f,
            y,
            x,
            M,
            u
          )), u && U & 2048 && Zc(
            y.alternate,
            y
          );
          break;
        case 24:
          ol(
            f,
            y,
            x,
            M,
            u
          ), u && U & 2048 && $c(y.alternate, y);
          break;
        default:
          ol(
            f,
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
            dr(i, l), u & 2048 && Zc(
              l.alternate,
              l
            );
            break;
          case 24:
            dr(i, l), u & 2048 && $c(l.alternate, l);
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
        sy(
          e,
          t,
          i
        ), e = e.sibling;
  }
  function sy(e, t, i) {
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
  function oy(e) {
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
          Ct = l, cy(
            l,
            e
          );
        }
      oy(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        uy(e), e = e.sibling;
  }
  function uy(e) {
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
          Ct = l, cy(
            l,
            e
          );
        }
      oy(e);
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
  function cy(e, t) {
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
          var u = l.sibling, f = l.return;
          if (ey(l), l === i) {
            Ct = null;
            break e;
          }
          if (u !== null) {
            u.return = f, Ct = u;
            break e;
          }
          Ct = f;
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
  }, Sx = typeof WeakMap == "function" ? WeakMap : Map, ke = 0, Ie = null, _e = null, Ve = 0, Ge = 0, nn = null, Na = !1, cl = !1, Ic = !1, ua = 0, ut = 0, za = 0, Si = 0, Jc = 0, an = 0, fl = 0, pr = null, Kt = null, Wc = !1, ao = 0, fy = 0, io = 1 / 0, lo = null, Oa = null, Et = 0, _a = null, dl = null, ca = 0, ef = 0, tf = null, dy = null, yr = 0, nf = null;
  function ln() {
    return (ke & 2) !== 0 && Ve !== 0 ? Ve & -Ve : B.T !== null ? uf() : J();
  }
  function hy() {
    if (an === 0)
      if ((Ve & 536870912) === 0 || Be) {
        var e = Kn;
        Kn <<= 1, (Kn & 3932160) === 0 && (Kn = 262144), an = e;
      } else an = 536870912;
    return e = en.current, e !== null && (e.flags |= 32), an;
  }
  function Zt(e, t, i) {
    (e === Ie && (Ge === 2 || Ge === 9) || e.cancelPendingCommit !== null) && (hl(e, 0), La(
      e,
      Ve,
      an,
      !1
    )), On(e, i), ((ke & 2) === 0 || e !== Ie) && (e === Ie && ((ke & 2) === 0 && (Si |= i), ut === 4 && La(
      e,
      Ve,
      an,
      !1
    )), Hn(e));
  }
  function my(e, t, i) {
    if ((ke & 6) !== 0) throw Error(s(327));
    var l = !i && (t & 127) === 0 && (t & e.expiredLanes) === 0 || ga(e, t), u = l ? Ex(e, t) : lf(e, t, !0), f = l;
    do {
      if (u === 0) {
        cl && !l && La(e, t, 0, !1);
        break;
      } else {
        if (i = e.current.alternate, f && !xx(i)) {
          u = lf(e, t, !1), f = !1;
          continue;
        }
        if (u === 2) {
          if (f = t, e.errorRecoveryDisabledLanes & f)
            var y = 0;
          else
            y = e.pendingLanes & -536870913, y = y !== 0 ? y : y & 536870912 ? 536870912 : 0;
          if (y !== 0) {
            t = y;
            e: {
              var x = e;
              u = pr;
              var M = x.current.memoizedState.isDehydrated;
              if (M && (hl(x, y).flags |= 256), y = lf(
                x,
                y,
                !1
              ), y !== 2) {
                if (Ic && !M) {
                  x.errorRecoveryDisabledLanes |= f, Si |= f, u = 4;
                  break e;
                }
                f = Kt, Kt = u, f !== null && (Kt === null ? Kt = f : Kt.push.apply(
                  Kt,
                  f
                ));
              }
              u = y;
            }
            if (f = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          hl(e, 0), La(e, t, 0, !0);
          break;
        }
        e: {
          switch (l = e, f = u, f) {
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
              Kt = null;
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
            ca = t, l.timeoutHandle = Xy(
              py.bind(
                null,
                l,
                i,
                Kt,
                lo,
                Wc,
                t,
                an,
                Si,
                fl,
                Na,
                f,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break e;
          }
          py(
            l,
            i,
            Kt,
            lo,
            Wc,
            t,
            an,
            Si,
            fl,
            Na,
            f,
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
  function py(e, t, i, l, u, f, y, x, M, U, F, Z, q, k) {
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
      }, sy(
        t,
        f,
        Z
      );
      var me = (f & 62914560) === f ? ao - Bt() : (f & 4194048) === f ? fy - Bt() : 0;
      if (me = lT(
        Z,
        me
      ), me !== null) {
        ca = f, e.cancelPendingCommit = me(
          Ey.bind(
            null,
            e,
            t,
            f,
            i,
            l,
            u,
            y,
            x,
            M,
            F,
            Z,
            null,
            q,
            k
          )
        ), La(e, f, y, !U);
        return;
      }
    }
    Ey(
      e,
      t,
      f,
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
          var u = i[l], f = u.getSnapshot;
          u = u.value;
          try {
            if (!Jt(f(), u)) return !1;
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
    t &= ~Jc, t &= ~Si, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var u = t; 0 < u; ) {
      var f = 31 - _t(u), y = 1 << f;
      l[f] = -1, u &= ~y;
    }
    i !== 0 && ps(e, i, t);
  }
  function ro() {
    return (ke & 6) === 0 ? (gr(0), !1) : !0;
  }
  function af() {
    if (_e !== null) {
      if (Ge === 0)
        var e = _e.return;
      else
        e = _e, Wn = fi = null, bc(e), al = null, Wl = 0, e = _e;
      for (; e !== null; )
        Fp(e.alternate, e), e = e.return;
      _e = null;
    }
  }
  function hl(e, t) {
    var i = e.timeoutHandle;
    i !== -1 && (e.timeoutHandle = -1, Yx(i)), i = e.cancelPendingCommit, i !== null && (e.cancelPendingCommit = null, i()), ca = 0, af(), Ie = e, _e = i = In(e.current, null), Ve = t, Ge = 0, nn = null, Na = !1, cl = ga(e, t), Ic = !1, fl = an = Jc = Si = za = ut = 0, Kt = pr = null, Wc = !1, (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var u = 31 - _t(l), f = 1 << u;
        t |= e[u], l &= ~f;
      }
    return ua = t, Cs(), i;
  }
  function yy(e, t) {
    Ce = null, B.H = sr, t === nl || t === Ls ? (t = zm(), Ge = 3) : t === sc ? (t = zm(), Ge = 4) : Ge = t === Lc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, nn = t, _e === null && (ut = 1, Zs(
      e,
      cn(t, e.current)
    ));
  }
  function gy() {
    var e = en.current;
    return e === null ? !0 : (Ve & 4194048) === Ve ? mn === null : (Ve & 62914560) === Ve || (Ve & 536870912) !== 0 ? e === mn : !1;
  }
  function vy() {
    var e = B.H;
    return B.H = sr, e === null ? sr : e;
  }
  function by() {
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
  function lf(e, t, i) {
    var l = ke;
    ke |= 2;
    var u = vy(), f = by();
    (Ie !== e || Ve !== t) && (lo = null, hl(e, t)), t = !1;
    var y = ut;
    e: do
      try {
        if (Ge !== 0 && _e !== null) {
          var x = _e, M = nn;
          switch (Ge) {
            case 8:
              af(), y = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              en.current === null && (t = !0);
              var U = Ge;
              if (Ge = 0, nn = null, ml(e, x, M, U), i && cl) {
                y = 0;
                break e;
              }
              break;
            default:
              U = Ge, Ge = 0, nn = null, ml(e, x, M, U);
          }
        }
        Tx(), y = ut;
        break;
      } catch (F) {
        yy(e, F);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Wn = fi = null, ke = l, B.H = u, B.A = f, _e === null && (Ie = null, Ve = 0, Cs()), y;
  }
  function Tx() {
    for (; _e !== null; ) Sy(_e);
  }
  function Ex(e, t) {
    var i = ke;
    ke |= 2;
    var l = vy(), u = by();
    Ie !== e || Ve !== t ? (lo = null, io = Bt() + 500, hl(e, t)) : cl = ga(
      e,
      t
    );
    e: do
      try {
        if (Ge !== 0 && _e !== null) {
          t = _e;
          var f = nn;
          t: switch (Ge) {
            case 1:
              Ge = 0, nn = null, ml(e, t, f, 1);
              break;
            case 2:
            case 9:
              if (jm(f)) {
                Ge = 0, nn = null, xy(t);
                break;
              }
              t = function() {
                Ge !== 2 && Ge !== 9 || Ie !== e || (Ge = 7), Hn(e);
              }, f.then(t, t);
              break e;
            case 3:
              Ge = 7;
              break e;
            case 4:
              Ge = 5;
              break e;
            case 7:
              jm(f) ? (Ge = 0, nn = null, xy(t)) : (Ge = 0, nn = null, ml(e, t, f, 7));
              break;
            case 5:
              var y = null;
              switch (_e.tag) {
                case 26:
                  y = _e.memoizedState;
                case 5:
                case 27:
                  var x = _e;
                  if (y ? rg(y) : x.stateNode.complete) {
                    Ge = 0, nn = null;
                    var M = x.sibling;
                    if (M !== null) _e = M;
                    else {
                      var U = x.return;
                      U !== null ? (_e = U, oo(U)) : _e = null;
                    }
                    break t;
                  }
              }
              Ge = 0, nn = null, ml(e, t, f, 5);
              break;
            case 6:
              Ge = 0, nn = null, ml(e, t, f, 6);
              break;
            case 8:
              af(), ut = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        Rx();
        break;
      } catch (F) {
        yy(e, F);
      }
    while (!0);
    return Wn = fi = null, B.H = l, B.A = u, ke = i, _e !== null ? 0 : (Ie = null, Ve = 0, Cs(), ut);
  }
  function Rx() {
    for (; _e !== null && !xu(); )
      Sy(_e);
  }
  function Sy(e) {
    var t = Pp(e.alternate, e, ua);
    e.memoizedProps = e.pendingProps, t === null ? oo(e) : _e = t;
  }
  function xy(e) {
    var t = e, i = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Bp(
          i,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Ve
        );
        break;
      case 11:
        t = Bp(
          i,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Ve
        );
        break;
      case 5:
        bc(t);
      default:
        Fp(i, t), t = _e = bm(t, ua), t = Pp(i, t, ua);
    }
    e.memoizedProps = e.pendingProps, t === null ? oo(e) : _e = t;
  }
  function ml(e, t, i, l) {
    Wn = fi = null, bc(t), al = null, Wl = 0;
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
    } catch (f) {
      if (u !== null) throw _e = u, f;
      ut = 1, Zs(
        e,
        cn(i, e.current)
      ), _e = null;
      return;
    }
    t.flags & 32768 ? (Be || l === 1 ? e = !0 : cl || (Ve & 536870912) !== 0 ? e = !1 : (Na = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = en.current, l !== null && l.tag === 13 && (l.flags |= 16384))), Ty(t, e)) : oo(t);
  }
  function oo(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Ty(
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
  function Ty(e, t) {
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
  function Ey(e, t, i, l, u, f, y, x, M) {
    e.cancelPendingCommit = null;
    do
      uo();
    while (Et !== 0);
    if ((ke & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (f = t.lanes | t.childLanes, f |= Fu, ms(
        e,
        i,
        f,
        y,
        x,
        M
      ), e === Ie && (_e = Ie = null, Ve = 0), dl = t, _a = e, ca = i, ef = f, tf = u, dy = l, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, wx(ya, function() {
        return wy(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
        l = B.T, B.T = null, u = ne.p, ne.p = 2, y = ke, ke |= 4;
        try {
          gx(e, t, i);
        } finally {
          ke = y, ne.p = u, B.T = l;
        }
      }
      Et = 1, Ry(), My(), Ay();
    }
  }
  function Ry() {
    if (Et === 1) {
      Et = 0;
      var e = _a, t = dl, i = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || i) {
        i = B.T, B.T = null;
        var l = ne.p;
        ne.p = 2;
        var u = ke;
        ke |= 4;
        try {
          iy(t, e);
          var f = gf, y = cm(e.containerInfo), x = f.focusedElem, M = f.selectionRange;
          if (y !== x && x && x.ownerDocument && um(
            x.ownerDocument.documentElement,
            x
          )) {
            if (M !== null && Yu(x)) {
              var U = M.start, F = M.end;
              if (F === void 0 && (F = U), "selectionStart" in x)
                x.selectionStart = U, x.selectionEnd = Math.min(
                  F,
                  x.value.length
                );
              else {
                var Z = x.ownerDocument || document, q = Z && Z.defaultView || window;
                if (q.getSelection) {
                  var k = q.getSelection(), me = x.textContent.length, Ee = Math.min(M.start, me), Ke = M.end === void 0 ? Ee : Math.min(M.end, me);
                  !k.extend && Ee > Ke && (y = Ke, Ke = Ee, Ee = y);
                  var _ = om(
                    x,
                    Ee
                  ), D = om(
                    x,
                    Ke
                  );
                  if (_ && D && (k.rangeCount !== 1 || k.anchorNode !== _.node || k.anchorOffset !== _.offset || k.focusNode !== D.node || k.focusOffset !== D.offset)) {
                    var V = Z.createRange();
                    V.setStart(_.node, _.offset), k.removeAllRanges(), Ee > Ke ? (k.addRange(V), k.extend(D.node, D.offset)) : (V.setEnd(D.node, D.offset), k.addRange(V));
                  }
                }
              }
            }
            for (Z = [], k = x; k = k.parentNode; )
              k.nodeType === 1 && Z.push({
                element: k,
                left: k.scrollLeft,
                top: k.scrollTop
              });
            for (typeof x.focus == "function" && x.focus(), x = 0; x < Z.length; x++) {
              var K = Z[x];
              K.element.scrollLeft = K.left, K.element.scrollTop = K.top;
            }
          }
          To = !!yf, gf = yf = null;
        } finally {
          ke = u, ne.p = l, B.T = i;
        }
      }
      e.current = t, Et = 2;
    }
  }
  function My() {
    if (Et === 2) {
      Et = 0;
      var e = _a, t = dl, i = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || i) {
        i = B.T, B.T = null;
        var l = ne.p;
        ne.p = 2;
        var u = ke;
        ke |= 4;
        try {
          Wp(e, t.alternate, t);
        } finally {
          ke = u, ne.p = l, B.T = i;
        }
      }
      Et = 3;
    }
  }
  function Ay() {
    if (Et === 4 || Et === 3) {
      Et = 0, Tu();
      var e = _a, t = dl, i = ca, l = dy;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Et = 5 : (Et = 0, dl = _a = null, Cy(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (u === 0 && (Oa = null), H(i), t = t.stateNode, Ht && typeof Ht.onCommitFiberRoot == "function")
        try {
          Ht.onCommitFiberRoot(
            Qn,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        t = B.T, u = ne.p, ne.p = 2, B.T = null;
        try {
          for (var f = e.onRecoverableError, y = 0; y < l.length; y++) {
            var x = l[y];
            f(x.value, {
              componentStack: x.stack
            });
          }
        } finally {
          B.T = t, ne.p = u;
        }
      }
      (ca & 3) !== 0 && uo(), Hn(e), u = e.pendingLanes, (i & 261930) !== 0 && (u & 42) !== 0 ? e === nf ? yr++ : (yr = 0, nf = e) : yr = 0, gr(0);
    }
  }
  function Cy(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Il(t)));
  }
  function uo() {
    return Ry(), My(), Ay(), wy();
  }
  function wy() {
    if (Et !== 5) return !1;
    var e = _a, t = ef;
    ef = 0;
    var i = H(ca), l = B.T, u = ne.p;
    try {
      ne.p = 32 > i ? 32 : i, B.T = null, i = tf, tf = null;
      var f = _a, y = ca;
      if (Et = 0, dl = _a = null, ca = 0, (ke & 6) !== 0) throw Error(s(331));
      var x = ke;
      if (ke |= 4, uy(f.current), ry(
        f,
        f.current,
        y,
        i
      ), ke = x, gr(0, !1), Ht && typeof Ht.onPostCommitFiberRoot == "function")
        try {
          Ht.onPostCommitFiberRoot(Qn, f);
        } catch {
        }
      return !0;
    } finally {
      ne.p = u, B.T = l, Cy(e, t);
    }
  }
  function Dy(e, t, i) {
    t = cn(i, t), t = _c(e.stateNode, t, 2), e = Ca(e, t, 2), e !== null && (On(e, 2), Hn(e));
  }
  function Pe(e, t, i) {
    if (e.tag === 3)
      Dy(e, e, i);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Dy(
            t,
            e,
            i
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Oa === null || !Oa.has(l))) {
            e = cn(i, e), i = jp(2), l = Ca(t, i, 2), l !== null && (Np(
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
  function rf(e, t, i) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new Sx();
      var u = /* @__PURE__ */ new Set();
      l.set(t, u);
    } else
      u = l.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), l.set(t, u));
    u.has(i) || (Ic = !0, u.add(i), e = Mx.bind(null, e, t, i), t.then(e, e));
  }
  function Mx(e, t, i) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & i, e.warmLanes &= ~i, Ie === e && (Ve & i) === i && (ut === 4 || ut === 3 && (Ve & 62914560) === Ve && 300 > Bt() - ao ? (ke & 2) === 0 && hl(e, 0) : Jc |= i, fl === Ve && (fl = 0)), Hn(e);
  }
  function jy(e, t) {
    t === 0 && (t = Hl()), e = oi(e, t), e !== null && (On(e, t), Hn(e));
  }
  function Ax(e) {
    var t = e.memoizedState, i = 0;
    t !== null && (i = t.retryLane), jy(e, i);
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
    l !== null && l.delete(t), jy(e, i);
  }
  function wx(e, t) {
    return Vi(e, t);
  }
  var co = null, pl = null, sf = !1, fo = !1, of = !1, Va = 0;
  function Hn(e) {
    e !== pl && e.next === null && (pl === null ? co = pl = e : pl = pl.next = e), fo = !0, sf || (sf = !0, jx());
  }
  function gr(e, t) {
    if (!of && fo) {
      of = !0;
      do
        for (var i = !1, l = co; l !== null; ) {
          if (e !== 0) {
            var u = l.pendingLanes;
            if (u === 0) var f = 0;
            else {
              var y = l.suspendedLanes, x = l.pingedLanes;
              f = (1 << 31 - _t(42 | e) + 1) - 1, f &= u & ~(y & ~x), f = f & 201326741 ? f & 201326741 | 1 : f ? f | 2 : 0;
            }
            f !== 0 && (i = !0, _y(l, f));
          } else
            f = Ve, f = Ui(
              l,
              l === Ie ? f : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (f & 3) === 0 || ga(l, f) || (i = !0, _y(l, f));
          l = l.next;
        }
      while (i);
      of = !1;
    }
  }
  function Dx() {
    Ny();
  }
  function Ny() {
    fo = sf = !1;
    var e = 0;
    Va !== 0 && qx() && (e = Va);
    for (var t = Bt(), i = null, l = co; l !== null; ) {
      var u = l.next, f = zy(l, t);
      f === 0 ? (l.next = null, i === null ? co = u : i.next = u, u === null && (pl = i)) : (i = l, (e !== 0 || (f & 3) !== 0) && (fo = !0)), l = u;
    }
    Et !== 0 && Et !== 5 || gr(e), Va !== 0 && (Va = 0);
  }
  function zy(e, t) {
    for (var i = e.suspendedLanes, l = e.pingedLanes, u = e.expirationTimes, f = e.pendingLanes & -62914561; 0 < f; ) {
      var y = 31 - _t(f), x = 1 << y, M = u[y];
      M === -1 ? ((x & i) === 0 || (x & l) !== 0) && (u[y] = Mu(x, t)) : M <= t && (e.expiredLanes |= x), f &= ~x;
    }
    if (t = Ie, i = Ve, i = Ui(
      e,
      e === t ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, i === 0 || e === t && (Ge === 2 || Ge === 9) || e.cancelPendingCommit !== null)
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
      return l = Oy.bind(null, e), i = Vi(i, l), e.callbackPriority = t, e.callbackNode = i, t;
    }
    return l !== null && l !== null && Ul(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Oy(e, t) {
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
    ), l === 0 ? null : (my(e, l, t), zy(e, Bt()), e.callbackNode != null && e.callbackNode === i ? Oy.bind(null, e) : null);
  }
  function _y(e, t) {
    if (uo()) return null;
    my(e, t, !0);
  }
  function jx() {
    kx(function() {
      (ke & 6) !== 0 ? Vi(
        pa,
        Dx
      ) : Ny();
    });
  }
  function uf() {
    if (Va === 0) {
      var e = el;
      e === 0 && (e = ti, ti <<= 1, (ti & 261888) === 0 && (ti = 256)), Va = e;
    }
    return Va;
  }
  function Ly(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : bs("" + e);
  }
  function Vy(e, t) {
    var i = t.ownerDocument.createElement("input");
    return i.name = t.name, i.value = t.value, e.id && i.setAttribute("form", e.id), t.parentNode.insertBefore(i, t), e = new FormData(e), i.parentNode.removeChild(i), e;
  }
  function Nx(e, t, i, l, u) {
    if (t === "submit" && i && i.stateNode === u) {
      var f = Ly(
        (u[ce] || null).action
      ), y = l.submitter;
      y && (t = (t = y[ce] || null) ? Ly(t.formAction) : y.getAttribute("formAction"), t !== null && (f = t, y = null));
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
                  var M = y ? Vy(u, y) : new FormData(u);
                  wc(
                    i,
                    {
                      pending: !0,
                      data: M,
                      method: u.method,
                      action: f
                    },
                    null,
                    M
                  );
                }
              } else
                typeof f == "function" && (x.preventDefault(), M = y ? Vy(u, y) : new FormData(u), wc(
                  i,
                  {
                    pending: !0,
                    data: M,
                    method: u.method,
                    action: f
                  },
                  f,
                  M
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var cf = 0; cf < Xu.length; cf++) {
    var ff = Xu[cf], zx = ff.toLowerCase(), Ox = ff[0].toUpperCase() + ff.slice(1);
    An(
      zx,
      "on" + Ox
    );
  }
  An(hm, "onAnimationEnd"), An(mm, "onAnimationIteration"), An(pm, "onAnimationStart"), An("dblclick", "onDoubleClick"), An("focusin", "onFocus"), An("focusout", "onBlur"), An(Z1, "onTransitionRun"), An($1, "onTransitionStart"), An(I1, "onTransitionCancel"), An(ym, "onTransitionEnd"), _n("onMouseEnter", ["mouseout", "mouseover"]), _n("onMouseLeave", ["mouseout", "mouseover"]), _n("onPointerEnter", ["pointerout", "pointerover"]), _n("onPointerLeave", ["pointerout", "pointerover"]), At(
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
  function Uy(e, t) {
    t = (t & 4) !== 0;
    for (var i = 0; i < e.length; i++) {
      var l = e[i], u = l.event;
      l = l.listeners;
      e: {
        var f = void 0;
        if (t)
          for (var y = l.length - 1; 0 <= y; y--) {
            var x = l[y], M = x.instance, U = x.currentTarget;
            if (x = x.listener, M !== f && u.isPropagationStopped())
              break e;
            f = x, u.currentTarget = U;
            try {
              f(u);
            } catch (F) {
              As(F);
            }
            u.currentTarget = null, f = M;
          }
        else
          for (y = 0; y < l.length; y++) {
            if (x = l[y], M = x.instance, U = x.currentTarget, x = x.listener, M !== f && u.isPropagationStopped())
              break e;
            f = x, u.currentTarget = U;
            try {
              f(u);
            } catch (F) {
              As(F);
            }
            u.currentTarget = null, f = M;
          }
      }
    }
  }
  function Le(e, t) {
    var i = t[he];
    i === void 0 && (i = t[he] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    i.has(l) || (By(t, e, 2, !1), i.add(l));
  }
  function df(e, t, i) {
    var l = 0;
    t && (l |= 4), By(
      i,
      e,
      l,
      t
    );
  }
  var ho = "_reactListening" + Math.random().toString(36).slice(2);
  function hf(e) {
    if (!e[ho]) {
      e[ho] = !0, ba.forEach(function(i) {
        i !== "selectionchange" && (_x.has(i) || df(i, !1, e), df(i, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[ho] || (t[ho] = !0, df("selectionchange", !1, t));
    }
  }
  function By(e, t, i, l) {
    switch (hg(t)) {
      case 2:
        var u = oT;
        break;
      case 8:
        u = uT;
        break;
      default:
        u = wf;
    }
    i = u.bind(
      null,
      t,
      i,
      e
    ), u = void 0, !zu || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), l ? u !== void 0 ? e.addEventListener(t, i, {
      capture: !0,
      passive: u
    }) : e.addEventListener(t, i, !0) : u !== void 0 ? e.addEventListener(t, i, {
      passive: u
    }) : e.addEventListener(t, i, !1);
  }
  function mf(e, t, i, l, u) {
    var f = l;
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
              l = f = y;
              continue e;
            }
            x = x.parentNode;
          }
        }
        l = l.return;
      }
    Gh(function() {
      var U = f, F = ju(i), Z = [];
      e: {
        var q = gm.get(e);
        if (q !== void 0) {
          var k = Es, me = e;
          switch (e) {
            case "keypress":
              if (xs(i) === 0) break e;
            case "keydown":
            case "keyup":
              k = C1;
              break;
            case "focusin":
              me = "focus", k = Vu;
              break;
            case "focusout":
              me = "blur", k = Vu;
              break;
            case "beforeblur":
            case "afterblur":
              k = Vu;
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
              k = Fh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              k = p1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              k = j1;
              break;
            case hm:
            case mm:
            case pm:
              k = v1;
              break;
            case ym:
              k = z1;
              break;
            case "scroll":
            case "scrollend":
              k = h1;
              break;
            case "wheel":
              k = _1;
              break;
            case "copy":
            case "cut":
            case "paste":
              k = S1;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              k = Kh;
              break;
            case "toggle":
            case "beforetoggle":
              k = V1;
          }
          var Ee = (t & 4) !== 0, Ke = !Ee && (e === "scroll" || e === "scrollend"), _ = Ee ? q !== null ? q + "Capture" : null : q;
          Ee = [];
          for (var D = U, V; D !== null; ) {
            var K = D;
            if (V = K.stateNode, K = K.tag, K !== 5 && K !== 26 && K !== 27 || V === null || _ === null || (K = ql(D, _), K != null && Ee.push(
              br(D, K, V)
            )), Ke) break;
            D = D.return;
          }
          0 < Ee.length && (q = new k(
            q,
            me,
            null,
            i,
            F
          ), Z.push({ event: q, listeners: Ee }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (q = e === "mouseover" || e === "pointerover", k = e === "mouseout" || e === "pointerout", q && i !== Du && (me = i.relatedTarget || i.fromElement) && (Xe(me) || me[ge]))
            break e;
          if ((k || q) && (q = F.window === F ? F : (q = F.ownerDocument) ? q.defaultView || q.parentWindow : window, k ? (me = i.relatedTarget || i.toElement, k = U, me = me ? Xe(me) : null, me !== null && (Ke = c(me), Ee = me.tag, me !== Ke || Ee !== 5 && Ee !== 27 && Ee !== 6) && (me = null)) : (k = null, me = U), k !== me)) {
            if (Ee = Fh, K = "onMouseLeave", _ = "onMouseEnter", D = "mouse", (e === "pointerout" || e === "pointerover") && (Ee = Kh, K = "onPointerLeave", _ = "onPointerEnter", D = "pointer"), Ke = k == null ? q : Oe(k), V = me == null ? q : Oe(me), q = new Ee(
              K,
              D + "leave",
              k,
              i,
              F
            ), q.target = Ke, q.relatedTarget = V, K = null, Xe(F) === U && (Ee = new Ee(
              _,
              D + "enter",
              me,
              i,
              F
            ), Ee.target = V, Ee.relatedTarget = Ke, K = Ee), Ke = K, k && me)
              t: {
                for (Ee = Lx, _ = k, D = me, V = 0, K = _; K; K = Ee(K))
                  V++;
                K = 0;
                for (var Se = D; Se; Se = Ee(Se))
                  K++;
                for (; 0 < V - K; )
                  _ = Ee(_), V--;
                for (; 0 < K - V; )
                  D = Ee(D), K--;
                for (; V--; ) {
                  if (_ === D || D !== null && _ === D.alternate) {
                    Ee = _;
                    break t;
                  }
                  _ = Ee(_), D = Ee(D);
                }
                Ee = null;
              }
            else Ee = null;
            k !== null && Hy(
              Z,
              q,
              k,
              Ee,
              !1
            ), me !== null && Ke !== null && Hy(
              Z,
              Ke,
              me,
              Ee,
              !0
            );
          }
        }
        e: {
          if (q = U ? Oe(U) : window, k = q.nodeName && q.nodeName.toLowerCase(), k === "select" || k === "input" && q.type === "file")
            var qe = nm;
          else if (em(q))
            if (am)
              qe = F1;
            else {
              qe = P1;
              var ve = G1;
            }
          else
            k = q.nodeName, !k || k.toLowerCase() !== "input" || q.type !== "checkbox" && q.type !== "radio" ? U && wu(U.elementType) && (qe = nm) : qe = X1;
          if (qe && (qe = qe(e, U))) {
            tm(
              Z,
              qe,
              i,
              F
            );
            break e;
          }
          ve && ve(e, q, U), e === "focusout" && U && q.type === "number" && U.memoizedProps.value != null && Cu(q, "number", q.value);
        }
        switch (ve = U ? Oe(U) : window, e) {
          case "focusin":
            (em(ve) || ve.contentEditable === "true") && (Fi = ve, ku = U, Kl = null);
            break;
          case "focusout":
            Kl = ku = Fi = null;
            break;
          case "mousedown":
            Gu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Gu = !1, fm(Z, i, F);
            break;
          case "selectionchange":
            if (K1) break;
          case "keydown":
          case "keyup":
            fm(Z, i, F);
        }
        var we;
        if (Bu)
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
          Xi ? Jh(e, i) && (Ue = "onCompositionEnd") : e === "keydown" && i.keyCode === 229 && (Ue = "onCompositionStart");
        Ue && (Zh && i.locale !== "ko" && (Xi || Ue !== "onCompositionStart" ? Ue === "onCompositionEnd" && Xi && (we = Ph()) : (Sa = F, Ou = "value" in Sa ? Sa.value : Sa.textContent, Xi = !0)), ve = mo(U, Ue), 0 < ve.length && (Ue = new Qh(
          Ue,
          e,
          null,
          i,
          F
        ), Z.push({ event: Ue, listeners: ve }), we ? Ue.data = we : (we = Wh(i), we !== null && (Ue.data = we)))), (we = B1 ? H1(e, i) : q1(e, i)) && (Ue = mo(U, "onBeforeInput"), 0 < Ue.length && (ve = new Qh(
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
      Uy(Z, t);
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
      var u = e, f = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || f === null || (u = ql(e, i), u != null && l.unshift(
        br(e, u, f)
      ), u = ql(e, t), u != null && l.push(
        br(e, u, f)
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
  function Hy(e, t, i, l, u) {
    for (var f = t._reactName, y = []; i !== null && i !== l; ) {
      var x = i, M = x.alternate, U = x.stateNode;
      if (x = x.tag, M !== null && M === l) break;
      x !== 5 && x !== 26 && x !== 27 || U === null || (M = U, u ? (U = ql(i, f), U != null && y.unshift(
        br(i, U, M)
      )) : u || (U = ql(i, f), U != null && y.push(
        br(i, U, M)
      ))), i = i.return;
    }
    y.length !== 0 && e.push({ event: t, listeners: y });
  }
  var Vx = /\r\n?/g, Ux = /\u0000|\uFFFD/g;
  function qy(e) {
    return (typeof e == "string" ? e : "" + e).replace(Vx, `
`).replace(Ux, "");
  }
  function Yy(e, t) {
    return t = qy(t), qy(e) === t;
  }
  function Qe(e, t, i, l, u, f) {
    switch (i) {
      case "children":
        typeof l == "string" ? t === "body" || t === "textarea" && l === "" || ki(e, l) : (typeof l == "number" || typeof l == "bigint") && t !== "body" && ki(e, "" + l);
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
        Yh(e, l, f);
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
          typeof f == "function" && (i === "formAction" ? (t !== "input" && Qe(e, t, "name", u.name, u, null), Qe(
            e,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), Qe(
            e,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), Qe(
            e,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (Qe(e, t, "encType", u.encType, u, null), Qe(e, t, "method", u.method, u, null), Qe(e, t, "target", u.target, u, null)));
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
  function pf(e, t, i, l, u, f) {
    switch (i) {
      case "style":
        Yh(e, l, f);
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
        typeof l == "string" ? ki(e, l) : (typeof l == "number" || typeof l == "bigint") && ki(e, "" + l);
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
            if (i[0] === "o" && i[1] === "n" && (u = i.endsWith("Capture"), t = i.slice(2, u ? i.length - 7 : void 0), f = e[ce] || null, f = f != null ? f[i] : null, typeof f == "function" && e.removeEventListener(t, f, u), typeof l == "function")) {
              typeof f != "function" && f !== null && (i in e ? e[i] = null : e.hasAttribute(i) && e.removeAttribute(i)), e.addEventListener(t, l, u);
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
        var l = !1, u = !1, f;
        for (f in i)
          if (i.hasOwnProperty(f)) {
            var y = i[f];
            if (y != null)
              switch (f) {
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
                  Qe(e, t, f, y, i, null);
              }
          }
        u && Qe(e, t, "srcSet", i.srcSet, i, null), l && Qe(e, t, "src", i.src, i, null);
        return;
      case "input":
        Le("invalid", e);
        var x = f = y = u = null, M = null, U = null;
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
                  f = F;
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
                  Qe(e, t, l, F, i, null);
              }
          }
        Uh(
          e,
          f,
          x,
          M,
          U,
          y,
          u,
          !1
        );
        return;
      case "select":
        Le("invalid", e), l = y = f = null;
        for (u in i)
          if (i.hasOwnProperty(u) && (x = i[u], x != null))
            switch (u) {
              case "value":
                f = x;
                break;
              case "defaultValue":
                y = x;
                break;
              case "multiple":
                l = x;
              default:
                Qe(e, t, u, x, i, null);
            }
        t = f, i = y, e.multiple = !!l, t != null ? Yi(e, !!l, t, !1) : i != null && Yi(e, !!l, i, !0);
        return;
      case "textarea":
        Le("invalid", e), f = u = l = null;
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
                f = x;
                break;
              case "dangerouslySetInnerHTML":
                if (x != null) throw Error(s(91));
                break;
              default:
                Qe(e, t, y, x, i, null);
            }
        Hh(e, l, u, f);
        return;
      case "option":
        for (M in i)
          if (i.hasOwnProperty(M) && (l = i[M], l != null))
            switch (M) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                Qe(e, t, M, l, i, null);
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
                Qe(e, t, U, l, i, null);
            }
        return;
      default:
        if (wu(t)) {
          for (F in i)
            i.hasOwnProperty(F) && (l = i[F], l !== void 0 && pf(
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
      i.hasOwnProperty(x) && (l = i[x], l != null && Qe(e, t, x, l, i, null));
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
        var u = null, f = null, y = null, x = null, M = null, U = null, F = null;
        for (k in i) {
          var Z = i[k];
          if (i.hasOwnProperty(k) && Z != null)
            switch (k) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                M = Z;
              default:
                l.hasOwnProperty(k) || Qe(e, t, k, null, l, Z);
            }
        }
        for (var q in l) {
          var k = l[q];
          if (Z = i[q], l.hasOwnProperty(q) && (k != null || Z != null))
            switch (q) {
              case "type":
                f = k;
                break;
              case "name":
                u = k;
                break;
              case "checked":
                U = k;
                break;
              case "defaultChecked":
                F = k;
                break;
              case "value":
                y = k;
                break;
              case "defaultValue":
                x = k;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (k != null)
                  throw Error(s(137, t));
                break;
              default:
                k !== Z && Qe(
                  e,
                  t,
                  q,
                  k,
                  l,
                  Z
                );
            }
        }
        Au(
          e,
          y,
          x,
          M,
          U,
          F,
          f,
          u
        );
        return;
      case "select":
        k = y = x = q = null;
        for (f in i)
          if (M = i[f], i.hasOwnProperty(f) && M != null)
            switch (f) {
              case "value":
                break;
              case "multiple":
                k = M;
              default:
                l.hasOwnProperty(f) || Qe(
                  e,
                  t,
                  f,
                  null,
                  l,
                  M
                );
            }
        for (u in l)
          if (f = l[u], M = i[u], l.hasOwnProperty(u) && (f != null || M != null))
            switch (u) {
              case "value":
                q = f;
                break;
              case "defaultValue":
                x = f;
                break;
              case "multiple":
                y = f;
              default:
                f !== M && Qe(
                  e,
                  t,
                  u,
                  f,
                  l,
                  M
                );
            }
        t = x, i = y, l = k, q != null ? Yi(e, !!i, q, !1) : !!l != !!i && (t != null ? Yi(e, !!i, t, !0) : Yi(e, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        k = q = null;
        for (x in i)
          if (u = i[x], i.hasOwnProperty(x) && u != null && !l.hasOwnProperty(x))
            switch (x) {
              case "value":
                break;
              case "children":
                break;
              default:
                Qe(e, t, x, null, l, u);
            }
        for (y in l)
          if (u = l[y], f = i[y], l.hasOwnProperty(y) && (u != null || f != null))
            switch (y) {
              case "value":
                q = u;
                break;
              case "defaultValue":
                k = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== f && Qe(e, t, y, u, l, f);
            }
        Bh(e, q, k);
        return;
      case "option":
        for (var me in i)
          if (q = i[me], i.hasOwnProperty(me) && q != null && !l.hasOwnProperty(me))
            switch (me) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Qe(
                  e,
                  t,
                  me,
                  null,
                  l,
                  q
                );
            }
        for (M in l)
          if (q = l[M], k = i[M], l.hasOwnProperty(M) && q !== k && (q != null || k != null))
            switch (M) {
              case "selected":
                e.selected = q && typeof q != "function" && typeof q != "symbol";
                break;
              default:
                Qe(
                  e,
                  t,
                  M,
                  q,
                  l,
                  k
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
          q = i[Ee], i.hasOwnProperty(Ee) && q != null && !l.hasOwnProperty(Ee) && Qe(e, t, Ee, null, l, q);
        for (U in l)
          if (q = l[U], k = i[U], l.hasOwnProperty(U) && q !== k && (q != null || k != null))
            switch (U) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (q != null)
                  throw Error(s(137, t));
                break;
              default:
                Qe(
                  e,
                  t,
                  U,
                  q,
                  l,
                  k
                );
            }
        return;
      default:
        if (wu(t)) {
          for (var Ke in i)
            q = i[Ke], i.hasOwnProperty(Ke) && q !== void 0 && !l.hasOwnProperty(Ke) && pf(
              e,
              t,
              Ke,
              void 0,
              l,
              q
            );
          for (F in l)
            q = l[F], k = i[F], !l.hasOwnProperty(F) || q === k || q === void 0 && k === void 0 || pf(
              e,
              t,
              F,
              q,
              l,
              k
            );
          return;
        }
    }
    for (var _ in i)
      q = i[_], i.hasOwnProperty(_) && q != null && !l.hasOwnProperty(_) && Qe(e, t, _, null, l, q);
    for (Z in l)
      q = l[Z], k = i[Z], !l.hasOwnProperty(Z) || q === k || q == null && k == null || Qe(e, t, Z, q, l, k);
  }
  function ky(e) {
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
        var u = i[l], f = u.transferSize, y = u.initiatorType, x = u.duration;
        if (f && x && ky(y)) {
          for (y = 0, x = u.responseEnd, l += 1; l < i.length; l++) {
            var M = i[l], U = M.startTime;
            if (U > x) break;
            var F = M.transferSize, Z = M.initiatorType;
            F && ky(Z) && (M = M.responseEnd, y += F * (M < x ? 1 : (x - U) / (M - U)));
          }
          if (--l, t += 8 * (f + y) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var yf = null, gf = null;
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
  function Py(e, t) {
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
  function vf(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var bf = null;
  function qx() {
    var e = window.event;
    return e && e.type === "popstate" ? e === bf ? !1 : (bf = e, !0) : (bf = null, !1);
  }
  var Xy = typeof setTimeout == "function" ? setTimeout : void 0, Yx = typeof clearTimeout == "function" ? clearTimeout : void 0, Fy = typeof Promise == "function" ? Promise : void 0, kx = typeof queueMicrotask == "function" ? queueMicrotask : typeof Fy < "u" ? function(e) {
    return Fy.resolve(null).then(e).catch(Gx);
  } : Xy;
  function Gx(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Ua(e) {
    return e === "head";
  }
  function Qy(e, t) {
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
          for (var f = i.firstChild; f; ) {
            var y = f.nextSibling, x = f.nodeName;
            f[je] || x === "SCRIPT" || x === "STYLE" || x === "LINK" && f.rel.toLowerCase() === "stylesheet" || i.removeChild(f), f = y;
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
  function Sf(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var i = t;
      switch (t = t.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Sf(i), $e(i);
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
              if (f = e.getAttribute("rel"), f === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (f !== u.rel || e.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || e.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || e.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (f = e.getAttribute("src"), (f !== (u.src == null ? null : u.src) || e.getAttribute("type") !== (u.type == null ? null : u.type) || e.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && f && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var f = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && e.getAttribute("name") === f)
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
  function Zy(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = pn(e.nextSibling), e === null)) return null;
    return e;
  }
  function xf(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Tf(e) {
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
  var Ef = null;
  function $y(e) {
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
  function Iy(e) {
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
  function Jy(e, t, i) {
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
  var yn = /* @__PURE__ */ new Map(), Wy = /* @__PURE__ */ new Set();
  function yo(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var fa = ne.d;
  ne.d = {
    f: Qx,
    r: Kx,
    D: Zx,
    C: $x,
    L: Ix,
    m: Jx,
    X: eT,
    S: Wx,
    M: tT
  };
  function Qx() {
    var e = fa.f(), t = ro();
    return e || t;
  }
  function Kx(e) {
    var t = lt(e);
    t !== null && t.tag === 5 && t.type === "form" ? yp(t) : fa.r(e);
  }
  var yl = typeof document > "u" ? null : document;
  function eg(e, t, i) {
    var l = yl;
    if (l && typeof t == "string" && t) {
      var u = on(t);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof i == "string" && (u += '[crossorigin="' + i + '"]'), Wy.has(u) || (Wy.add(u), e = { rel: e, crossOrigin: i, href: t }, l.querySelector(u) === null && (t = l.createElement("link"), Nt(t, "link", e), We(t), l.head.appendChild(t)));
    }
  }
  function Zx(e) {
    fa.D(e), eg("dns-prefetch", e, null);
  }
  function $x(e, t) {
    fa.C(e, t), eg("preconnect", e, t);
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
      var f = u;
      switch (t) {
        case "style":
          f = gl(e);
          break;
        case "script":
          f = vl(e);
      }
      yn.has(f) || (e = v(
        {
          rel: "preload",
          href: t === "image" && i && i.imageSrcSet ? void 0 : e,
          as: t
        },
        i
      ), yn.set(f, e), l.querySelector(u) !== null || t === "style" && l.querySelector(xr(f)) || t === "script" && l.querySelector(Tr(f)) || (t = l.createElement("link"), Nt(t, "link", e), We(t), l.head.appendChild(t)));
    }
  }
  function Jx(e, t) {
    fa.m(e, t);
    var i = yl;
    if (i && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + on(l) + '"][href="' + on(e) + '"]', f = u;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          f = vl(e);
      }
      if (!yn.has(f) && (e = v({ rel: "modulepreload", href: e }, t), yn.set(f, e), i.querySelector(u) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(Tr(f)))
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
      var u = pt(l).hoistableStyles, f = gl(e);
      t = t || "default";
      var y = u.get(f);
      if (!y) {
        var x = { loading: 0, preload: null };
        if (y = l.querySelector(
          xr(f)
        ))
          x.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": t },
            i
          ), (i = yn.get(f)) && Rf(e, i);
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
        }, u.set(f, y);
      }
    }
  }
  function eT(e, t) {
    fa.X(e, t);
    var i = yl;
    if (i && e) {
      var l = pt(i).hoistableScripts, u = vl(e), f = l.get(u);
      f || (f = i.querySelector(Tr(u)), f || (e = v({ src: e, async: !0 }, t), (t = yn.get(u)) && Mf(e, t), f = i.createElement("script"), We(f), Nt(f, "link", e), i.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, l.set(u, f));
    }
  }
  function tT(e, t) {
    fa.M(e, t);
    var i = yl;
    if (i && e) {
      var l = pt(i).hoistableScripts, u = vl(e), f = l.get(u);
      f || (f = i.querySelector(Tr(u)), f || (e = v({ src: e, async: !0, type: "module" }, t), (t = yn.get(u)) && Mf(e, t), f = i.createElement("script"), We(f), Nt(f, "link", e), i.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, l.set(u, f));
    }
  }
  function tg(e, t, i, l) {
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
          var f = pt(
            u
          ).hoistableStyles, y = f.get(e);
          if (y || (u = u.ownerDocument || u, y = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, f.set(e, y), (f = u.querySelector(
            xr(e)
          )) && !f._p && (y.instance = f, y.state.loading = 5), yn.has(e) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, yn.set(e, i), f || nT(
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
  function ng(e) {
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
  function ag(e, t, i) {
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
          var f = e.querySelector(
            xr(u)
          );
          if (f)
            return t.state.loading |= 4, t.instance = f, We(f), f;
          l = ng(i), (u = yn.get(u)) && Rf(l, u), f = (e.ownerDocument || e).createElement("link"), We(f);
          var y = f;
          return y._p = new Promise(function(x, M) {
            y.onload = x, y.onerror = M;
          }), Nt(f, "link", l), t.state.loading |= 4, go(f, i.precedence, e), t.instance = f;
        case "script":
          return f = vl(i.src), (u = e.querySelector(
            Tr(f)
          )) ? (t.instance = u, We(u), u) : (l = i, (u = yn.get(f)) && (l = v({}, i), Mf(l, u)), e = e.ownerDocument || e, u = e.createElement("script"), We(u), Nt(u, "link", l), e.head.appendChild(u), t.instance = u);
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
    ), u = l.length ? l[l.length - 1] : null, f = u, y = 0; y < l.length; y++) {
      var x = l[y];
      if (x.dataset.precedence === t) f = x;
      else if (f !== u) break;
    }
    f ? f.parentNode.insertBefore(e, f.nextSibling) : (t = i.nodeType === 9 ? i.head : i, t.insertBefore(e, t.firstChild));
  }
  function Rf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Mf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var vo = null;
  function ig(e, t, i) {
    if (vo === null) {
      var l = /* @__PURE__ */ new Map(), u = vo = /* @__PURE__ */ new Map();
      u.set(i, l);
    } else
      u = vo, l = u.get(i), l || (l = /* @__PURE__ */ new Map(), u.set(i, l));
    if (l.has(e)) return l;
    for (l.set(e, null), i = i.getElementsByTagName(e), u = 0; u < i.length; u++) {
      var f = i[u];
      if (!(f[je] || f[ue] || e === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== "http://www.w3.org/2000/svg") {
        var y = f.getAttribute(t) || "";
        y = e + y;
        var x = l.get(y);
        x ? x.push(f) : l.set(y, [f]);
      }
    }
    return l;
  }
  function lg(e, t, i) {
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
  function rg(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function iT(e, t, i, l) {
    if (i.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var u = gl(l.href), f = t.querySelector(
          xr(u)
        );
        if (f) {
          t = f._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = bo.bind(e), t.then(e, e)), i.state.loading |= 4, i.instance = f, We(f);
          return;
        }
        f = t.ownerDocument || t, l = ng(l), (u = yn.get(u)) && Rf(l, u), f = f.createElement("link"), We(f);
        var y = f;
        y._p = new Promise(function(x, M) {
          y.onload = x, y.onerror = M;
        }), Nt(f, "link", l), i.instance = f;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(i, t), (t = i.state.preload) && (i.state.loading & 3) === 0 && (e.count++, i = bo.bind(e), t.addEventListener("load", i), t.addEventListener("error", i));
    }
  }
  var Af = 0;
  function lT(e, t) {
    return e.stylesheets && e.count === 0 && xo(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(i) {
      var l = setTimeout(function() {
        if (e.stylesheets && xo(e, e.stylesheets), e.unsuspend) {
          var f = e.unsuspend;
          e.unsuspend = null, f();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Af === 0 && (Af = 62500 * Hx());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && xo(e, e.stylesheets), e.unsuspend)) {
            var f = e.unsuspend;
            e.unsuspend = null, f();
          }
        },
        (e.imgBytes > Af ? 50 : 800) + t
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
        ), f = 0; f < u.length; f++) {
          var y = u[f];
          (y.nodeName === "LINK" || y.getAttribute("media") !== "not all") && (i.set(y.dataset.precedence, y), l = y);
        }
        l && i.set(null, l);
      }
      u = t.instance, y = u.getAttribute("data-precedence"), f = i.get(y) || l, f === l && i.set(null, u), i.set(y, u), this.count++, l = bo.bind(this), u.addEventListener("load", l), u.addEventListener("error", l), f ? f.parentNode.insertBefore(u, f.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(u, e.firstChild)), t.state.loading |= 4;
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
  function sT(e, t, i, l, u, f, y, x, M) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = va(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = va(0), this.hiddenUpdates = va(null), this.identifierPrefix = l, this.onUncaughtError = u, this.onCaughtError = f, this.onRecoverableError = y, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = M, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function sg(e, t, i, l, u, f, y, x, M, U, F, Z) {
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
    ), t = 1, f === !0 && (t |= 24), f = Wt(3, null, null, t), e.current = f, f.stateNode = e, t = ic(), t.refCount++, e.pooledCache = t, t.refCount++, f.memoizedState = {
      element: l,
      isDehydrated: i,
      cache: t
    }, oc(f), e;
  }
  function og(e) {
    return e ? (e = Zi, e) : Zi;
  }
  function ug(e, t, i, l, u, f) {
    u = og(u), l.context === null ? l.context = u : l.pendingContext = u, l = Aa(t), l.payload = { element: i }, f = f === void 0 ? null : f, f !== null && (l.callback = f), i = Ca(e, l, t), i !== null && (Zt(i, e, t), tr(i, e, t));
  }
  function cg(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var i = e.retryLane;
      e.retryLane = i !== 0 && i < t ? i : t;
    }
  }
  function Cf(e, t) {
    cg(e, t), (e = e.alternate) && cg(e, t);
  }
  function fg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = oi(e, 67108864);
      t !== null && Zt(t, e, 67108864), Cf(e, 67108864);
    }
  }
  function dg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = ln();
      t = z(t);
      var i = oi(e, t);
      i !== null && Zt(i, e, t), Cf(e, t);
    }
  }
  var To = !0;
  function oT(e, t, i, l) {
    var u = B.T;
    B.T = null;
    var f = ne.p;
    try {
      ne.p = 2, wf(e, t, i, l);
    } finally {
      ne.p = f, B.T = u;
    }
  }
  function uT(e, t, i, l) {
    var u = B.T;
    B.T = null;
    var f = ne.p;
    try {
      ne.p = 8, wf(e, t, i, l);
    } finally {
      ne.p = f, B.T = u;
    }
  }
  function wf(e, t, i, l) {
    if (To) {
      var u = Df(l);
      if (u === null)
        mf(
          e,
          t,
          l,
          Eo,
          i
        ), mg(e, l);
      else if (fT(
        u,
        e,
        t,
        i,
        l
      ))
        l.stopPropagation();
      else if (mg(e, l), t & 4 && -1 < cT.indexOf(e)) {
        for (; u !== null; ) {
          var f = lt(u);
          if (f !== null)
            switch (f.tag) {
              case 3:
                if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                  var y = Rn(f.pendingLanes);
                  if (y !== 0) {
                    var x = f;
                    for (x.pendingLanes |= 2, x.entangledLanes |= 2; y; ) {
                      var M = 1 << 31 - _t(y);
                      x.entanglements[1] |= M, y &= ~M;
                    }
                    Hn(f), (ke & 6) === 0 && (io = Bt() + 500, gr(0));
                  }
                }
                break;
              case 31:
              case 13:
                x = oi(f, 2), x !== null && Zt(x, f, 2), ro(), Cf(f, 2);
            }
          if (f = Df(l), f === null && mf(
            e,
            t,
            l,
            Eo,
            i
          ), f === u) break;
          u = f;
        }
        u !== null && l.stopPropagation();
      } else
        mf(
          e,
          t,
          l,
          null,
          i
        );
    }
  }
  function Df(e) {
    return e = ju(e), jf(e);
  }
  var Eo = null;
  function jf(e) {
    if (Eo = null, e = Xe(e), e !== null) {
      var t = c(e);
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
  function hg(e) {
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
  var Nf = !1, Ba = null, Ha = null, qa = null, Rr = /* @__PURE__ */ new Map(), Mr = /* @__PURE__ */ new Map(), Ya = [], cT = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function mg(e, t) {
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
  function Ar(e, t, i, l, u, f) {
    return e === null || e.nativeEvent !== f ? (e = {
      blockedOn: t,
      domEventName: i,
      eventSystemFlags: l,
      nativeEvent: f,
      targetContainers: [u]
    }, t !== null && (t = lt(t), t !== null && fg(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), e);
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
        var f = u.pointerId;
        return Rr.set(
          f,
          Ar(
            Rr.get(f) || null,
            e,
            t,
            i,
            l,
            u
          )
        ), !0;
      case "gotpointercapture":
        return f = u.pointerId, Mr.set(
          f,
          Ar(
            Mr.get(f) || null,
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
  function pg(e) {
    var t = Xe(e.target);
    if (t !== null) {
      var i = c(t);
      if (i !== null) {
        if (t = i.tag, t === 13) {
          if (t = d(i), t !== null) {
            e.blockedOn = t, ie(e.priority, function() {
              dg(i);
            });
            return;
          }
        } else if (t === 31) {
          if (t = h(i), t !== null) {
            e.blockedOn = t, ie(e.priority, function() {
              dg(i);
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
      var i = Df(e.nativeEvent);
      if (i === null) {
        i = e.nativeEvent;
        var l = new i.constructor(
          i.type,
          i
        );
        Du = l, i.target.dispatchEvent(l), Du = null;
      } else
        return t = lt(i), t !== null && fg(t), e.blockedOn = i, !1;
      t.shift();
    }
    return !0;
  }
  function yg(e, t, i) {
    Ro(e) && i.delete(t);
  }
  function dT() {
    Nf = !1, Ba !== null && Ro(Ba) && (Ba = null), Ha !== null && Ro(Ha) && (Ha = null), qa !== null && Ro(qa) && (qa = null), Rr.forEach(yg), Mr.forEach(yg);
  }
  function Mo(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Nf || (Nf = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      dT
    )));
  }
  var Ao = null;
  function gg(e) {
    Ao !== e && (Ao = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        Ao === e && (Ao = null);
        for (var t = 0; t < e.length; t += 3) {
          var i = e[t], l = e[t + 1], u = e[t + 2];
          if (typeof l != "function") {
            if (jf(l || i) === null)
              continue;
            break;
          }
          var f = lt(i);
          f !== null && (e.splice(t, 3), t -= 3, wc(
            f,
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
      pg(i), i.blockedOn === null && Ya.shift();
    if (i = (e.ownerDocument || e).$$reactFormReplay, i != null)
      for (l = 0; l < i.length; l += 3) {
        var u = i[l], f = i[l + 1], y = u[ce] || null;
        if (typeof f == "function")
          y || gg(i);
        else if (y) {
          var x = null;
          if (f && f.hasAttribute("formAction")) {
            if (u = f, y = f[ce] || null)
              x = y.formAction;
            else if (jf(u) !== null) continue;
          } else x = y.action;
          typeof x == "function" ? i[l + 1] = x : (i.splice(l, 3), l -= 3), gg(i);
        }
      }
  }
  function vg() {
    function e(f) {
      f.canIntercept && f.info === "react-transition" && f.intercept({
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
        var f = navigation.currentEntry;
        f && f.url != null && navigation.navigate(f.url, {
          state: f.getState(),
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
  function zf(e) {
    this._internalRoot = e;
  }
  Co.prototype.render = zf.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var i = t.current, l = ln();
    ug(i, l, e, t, null, null);
  }, Co.prototype.unmount = zf.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      ug(e.current, 2, null, e, null, null), ro(), t[ge] = null;
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
      Ya.splice(i, 0, e), i === 0 && pg(e);
    }
  };
  var bg = a.version;
  if (bg !== "19.2.5")
    throw Error(
      s(
        527,
        bg,
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
        Qn = wo.inject(
          hT
        ), Ht = wo;
      } catch {
      }
  }
  return wr.createRoot = function(e, t) {
    if (!o(e)) throw Error(s(299));
    var i = !1, l = "", u = Ap, f = Cp, y = wp;
    return t != null && (t.unstable_strictMode === !0 && (i = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (f = t.onCaughtError), t.onRecoverableError !== void 0 && (y = t.onRecoverableError)), t = sg(
      e,
      1,
      !1,
      null,
      null,
      i,
      l,
      null,
      u,
      f,
      y,
      vg
    ), e[ge] = t.current, hf(e), new zf(t);
  }, wr.hydrateRoot = function(e, t, i) {
    if (!o(e)) throw Error(s(299));
    var l = !1, u = "", f = Ap, y = Cp, x = wp, M = null;
    return i != null && (i.unstable_strictMode === !0 && (l = !0), i.identifierPrefix !== void 0 && (u = i.identifierPrefix), i.onUncaughtError !== void 0 && (f = i.onUncaughtError), i.onCaughtError !== void 0 && (y = i.onCaughtError), i.onRecoverableError !== void 0 && (x = i.onRecoverableError), i.formState !== void 0 && (M = i.formState)), t = sg(
      e,
      1,
      !0,
      t,
      i ?? null,
      l,
      u,
      M,
      f,
      y,
      x,
      vg
    ), t.context = og(null), i = t.current, l = ln(), l = z(l), u = Aa(l), u.callback = null, Ca(i, u, l), i = l, t.current.lanes = i, On(t, i), Hn(t), e[ge] = t.current, hf(e), new Co(t);
  }, wr.version = "19.2.5", wr;
}
var Dg;
function CT() {
  if (Dg) return Lf.exports;
  Dg = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Lf.exports = AT(), Lf.exports;
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
var O0 = (n) => {
  throw TypeError(n);
}, DT = (n, a, r) => a.has(n) || O0("Cannot " + r), Hf = (n, a, r) => (DT(n, a, "read from private field"), r ? r.call(n) : a.get(n)), jT = (n, a, r) => a.has(n) ? O0("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(n) : a.set(n, r);
function jg(n) {
  return typeof n == "object" && n != null && "pathname" in n && "search" in n && "hash" in n && "state" in n && "key" in n;
}
function NT(n = {}) {
  let { initialEntries: a = ["/"], initialIndex: r, v5Compat: s = !1 } = n, o;
  o = a.map(
    (T, E) => g(
      T,
      typeof T == "string" ? null : T.state,
      E === 0 ? "default" : void 0,
      typeof T == "string" ? void 0 : T.unstable_mask
    )
  );
  let c = p(
    r ?? o.length - 1
  ), d = "POP", h = null;
  function p(T) {
    return Math.min(Math.max(T, 0), o.length - 1);
  }
  function m() {
    return o[c];
  }
  function g(T, E = null, C, j) {
    let O = hd(
      o ? m().pathname : "/",
      T,
      E,
      C,
      j
    );
    return ht(
      O.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        T
      )}`
    ), O;
  }
  function v(T) {
    return typeof T == "string" ? T : Gn(T);
  }
  return {
    get index() {
      return c;
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
      let E = typeof T == "string" ? zn(T) : T;
      return {
        pathname: E.pathname || "",
        search: E.search || "",
        hash: E.hash || ""
      };
    },
    push(T, E) {
      d = "PUSH";
      let C = jg(T) ? T : g(T, E);
      c += 1, o.splice(c, o.length, C), s && h && h({ action: d, location: C, delta: 1 });
    },
    replace(T, E) {
      d = "REPLACE";
      let C = jg(T) ? T : g(T, E);
      o[c] = C, s && h && h({ action: d, location: C, delta: 0 });
    },
    go(T) {
      d = "POP";
      let E = p(c + T), C = o[E];
      c = E, h && h({ action: d, location: C, delta: T });
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
function hd(n, a, r = null, s, o) {
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
function Gn({
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
  let s = typeof n == "string" ? n : Gn(n);
  return s = s.replace(/ $/, "%20"), !a && s.startsWith("//") && (s = r + s), new URL(s, r);
}
var Br, Ng = class {
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
    if (Hf(this, Br).has(n))
      return Hf(this, Br).get(n);
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
    Hf(this, Br).set(n, a);
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
  return n.map((c, d) => {
    let h = [...r, String(d)], p = typeof c.id == "string" ? c.id : h.join("-");
    if (ze(
      c.index !== !0 || !c.children,
      "Cannot specify children on an index route"
    ), ze(
      o || !s[p],
      `Found a route id collision on id "${p}".  Route id's must be globally unique within Data Router usages`
    ), BT(c)) {
      let m = {
        ...c,
        id: p
      };
      return s[p] = zg(
        m,
        a(m)
      ), m;
    } else {
      let m = {
        ...c,
        id: p,
        children: void 0
      };
      return s[p] = zg(
        m,
        a(m)
      ), c.children && (m.children = Fr(
        c.children,
        a,
        h,
        s,
        o
      )), m;
    }
  });
}
function zg(n, a) {
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
  let o = typeof a == "string" ? zn(a) : a, c = xn(o.pathname || "/", r);
  if (c == null)
    return null;
  let d = _0(n);
  qT(d);
  let h = null;
  for (let p = 0; h == null && p < d.length; ++p) {
    let m = IT(c);
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
function _0(n, a = [], r = [], s = "", o = !1) {
  let c = (d, h, p = o, m) => {
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
    ), _0(
      d.children,
      a,
      S,
      v,
      p
    )), !(d.path == null && !d.index) && a.push({
      path: v,
      score: QT(v, d.index),
      routesMeta: S
    });
  };
  return n.forEach((d, h) => {
    if (d.path === "" || !d.path?.includes("?"))
      c(d, h);
    else
      for (let p of L0(d.path))
        c(d, h, !0, p);
  }), a;
}
function L0(n) {
  let a = n.split("/");
  if (a.length === 0) return [];
  let [r, ...s] = a, o = r.endsWith("?"), c = r.replace(/\?$/, "");
  if (s.length === 0)
    return o ? [c, ""] : [c];
  let d = L0(s.join("/")), h = [];
  return h.push(
    ...d.map(
      (p) => p === "" ? c : [c, p].join("/")
    )
  ), o && h.push(...d), h.map(
    (p) => n.startsWith("/") && p === "" ? "/" : p
  );
}
function qT(n) {
  n.sort(
    (a, r) => a.score !== r.score ? r.score - a.score : KT(
      a.routesMeta.map((s) => s.childrenIndex),
      r.routesMeta.map((s) => s.childrenIndex)
    )
  );
}
var YT = /^:[\w-]+$/, kT = 3, GT = 2, PT = 1, XT = 10, FT = -2, Og = (n) => n === "*";
function QT(n, a) {
  let r = n.split("/"), s = r.length;
  return r.some(Og) && (s += FT), a && (s += GT), r.filter((o) => !Og(o)).reduce(
    (o, c) => o + (YT.test(c) ? kT : c === "" ? PT : XT),
    s
  );
}
function KT(n, a) {
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
  let { routesMeta: s } = n, o = {}, c = "/", d = [];
  for (let h = 0; h < s.length; ++h) {
    let p = s[h], m = h === s.length - 1, g = c === "/" ? a : a.slice(c.length) || "/", v = $o(
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
      pathname: bn([c, v.pathname]),
      pathnameBase: eE(
        bn([c, v.pathnameBase])
      ),
      route: S
    }), v.pathnameBase !== "/" && (c = bn([c, v.pathnameBase]));
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
  let c = o[0], d = c.replace(/(.)\/+$/, "$1"), h = o.slice(1);
  return {
    params: s.reduce(
      (m, { paramName: g, isOptional: v }, S) => {
        if (g === "*") {
          let E = h[S] || "";
          d = c.slice(0, c.length - E.length).replace(/(.)\/+$/, "$1");
        }
        const T = h[S];
        return v && !T ? m[g] = void 0 : m[g] = (T || "").replace(/%2F/g, "/"), m;
      },
      {}
    ),
    pathname: c,
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
var V0 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Gd = (n) => V0.test(n);
function WT(n, a = "/") {
  let {
    pathname: r,
    search: s = "",
    hash: o = ""
  } = typeof n == "string" ? zn(n) : n, c;
  return r ? (r = Xd(r), r.startsWith("/") ? c = _g(r.substring(1), "/") : c = _g(r, a)) : c = a, {
    pathname: c,
    search: tE(s),
    hash: nE(o)
  };
}
function _g(n, a) {
  let r = Io(a).split("/");
  return n.split("/").forEach((o) => {
    o === ".." ? r.length > 1 && r.pop() : o !== "." && r.push(o);
  }), r.length > 1 ? r.join("/") : "/";
}
function qf(n, a, r, s) {
  return `Cannot include a '${n}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    s
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function U0(n) {
  return n.filter(
    (a, r) => r === 0 || a.route.path && a.route.path.length > 0
  );
}
function Pd(n) {
  let a = U0(n);
  return a.map(
    (r, s) => s === a.length - 1 ? r.pathname : r.pathnameBase
  );
}
function fu(n, a, r, s = !1) {
  let o;
  typeof n == "string" ? o = zn(n) : (o = { ...n }, ze(
    !o.pathname || !o.pathname.includes("?"),
    qf("?", "pathname", "search", o)
  ), ze(
    !o.pathname || !o.pathname.includes("#"),
    qf("#", "pathname", "hash", o)
  ), ze(
    !o.search || !o.search.includes("#"),
    qf("#", "search", "hash", o)
  ));
  let c = n === "" || o.pathname === "", d = c ? "/" : o.pathname, h;
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
  let p = WT(o, h), m = d && d !== "/" && d.endsWith("/"), g = (c || d === ".") && r.endsWith("/");
  return !p.pathname.endsWith("/") && (m || g) && (p.pathname += "/"), p;
}
var Xd = (n) => n.replace(/\/\/+/g, "/"), bn = (n) => Xd(n.join("/")), Io = (n) => n.replace(/\/+$/, ""), eE = (n) => Io(n).replace(/^\/*/, "/"), tE = (n) => !n || n === "?" ? "" : n.startsWith("?") ? n : "?" + n, nE = (n) => !n || n === "#" ? "" : n.startsWith("#") ? n : "#" + n, aE = (n, a = 302) => {
  let r = a;
  typeof r == "number" ? r = { status: r } : typeof r.status > "u" && (r.status = 302);
  let s = new Headers(r.headers);
  return s.set("Location", n), new Response(null, { ...r, headers: s });
}, du = class {
  constructor(n, a, r, s = !1) {
    this.status = n, this.statusText = a || "", this.internal = s, r instanceof Error ? (this.data = r.toString(), this.error = r) : this.data = r;
  }
};
function Qr(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.internal == "boolean" && "data" in n;
}
function Wr(n) {
  let a = n.map((r) => r.route.path).filter(Boolean);
  return bn(a) || "/";
}
var B0 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function H0(n, a) {
  let r = n;
  if (typeof r != "string" || !V0.test(r))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: r
    };
  let s = r, o = !1;
  if (B0)
    try {
      let c = new URL(window.location.href), d = r.startsWith("//") ? new URL(c.protocol + r) : new URL(r), h = xn(d.pathname, a);
      d.origin === c.origin && h != null ? r = h + d.search + d.hash : o = !0;
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
var Ka = Symbol("Uninstrumented");
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
      instrument(c) {
        let d = Object.keys(r);
        for (let h of d)
          c[h] && r[h].push(c[h]);
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
    ["middleware", "loader", "action"].forEach((c) => {
      let d = o[c], h = r[`lazy.${c}`];
      if (typeof d == "function" && h.length > 0) {
        let p = El(h, d, () => {
        });
        p && (s.lazy = Object.assign(s.lazy || {}, {
          [c]: p
        }));
      }
    });
  }
  return ["loader", "action"].forEach((o) => {
    let c = a[o];
    if (typeof c == "function" && r[o].length > 0) {
      let d = c[Ka] ?? c, h = El(
        r[o],
        d,
        (...p) => Lg(p[0])
      );
      h && (o === "loader" && d.hydrate === !0 && (h.hydrate = !0), h[Ka] = d, s[o] = h);
    }
  }), a.middleware && a.middleware.length > 0 && r.middleware.length > 0 && (s.middleware = a.middleware.map((o) => {
    let c = o[Ka] ?? o, d = El(
      r.middleware,
      c,
      (...h) => Lg(h[0])
    );
    return d ? (d[Ka] = c, d) : o;
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
        let c = Object.keys(o);
        for (let d of c)
          o[d] && r[d].push(o[d]);
      }
    })
  ), r.navigate.length > 0) {
    let s = n.navigate[Ka] ?? n.navigate, o = El(
      r.navigate,
      s,
      (...c) => {
        let [d, h] = c;
        return {
          to: typeof d == "number" || typeof d == "string" ? d : d ? Gn(d) : ".",
          ...Vg(n, h ?? {})
        };
      }
    );
    o && (o[Ka] = s, n.navigate = o);
  }
  if (r.fetch.length > 0) {
    let s = n.fetch[Ka] ?? n.fetch, o = El(r.fetch, s, (...c) => {
      let [d, , h, p] = c;
      return {
        href: h ?? ".",
        fetcherKey: d,
        ...Vg(n, p ?? {})
      };
    });
    o && (o[Ka] = s, n.fetch = o);
  }
  return n;
}
function El(n, a, r) {
  return n.length === 0 ? null : async (...s) => {
    let o = await q0(
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
async function q0(n, a, r, s) {
  let o = n[s], c;
  if (o) {
    let d, h = async () => (d ? console.error("You cannot call instrumented handlers more than once") : d = q0(n, a, r, s - 1), c = await d, ze(c, "Expected a result"), c.type === "error" && c.value instanceof Error ? { status: "error", error: c.value } : { status: "success", error: void 0 });
    try {
      await o(h, a);
    } catch (p) {
      console.error("An instrumentation function threw an error:", p);
    }
    d || await h(), await d;
  } else
    try {
      c = { type: "success", value: await r() };
    } catch (d) {
      c = { type: "error", value: d };
    }
  return c || {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function Lg(n) {
  let { request: a, context: r, params: s, unstable_pattern: o } = n;
  return {
    request: rE(a),
    params: { ...s },
    unstable_pattern: o,
    context: sE(r)
  };
}
function Vg(n, a) {
  return {
    currentUrl: Gn(n.state.location),
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
var Y0 = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], cE = new Set(
  Y0
), fE = [
  "GET",
  ...Y0
], dE = new Set(fE), k0 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), hE = /* @__PURE__ */ new Set([307, 308]), Yf = {
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
}), G0 = "remix-router-transitions", P0 = Symbol("ResetLoaderData");
function yE(n) {
  const a = n.window ? n.window : typeof window < "u" ? window : void 0, r = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  ze(
    n.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let s = n.hydrationRouteProperties || [], o = n.mapRouteProperties || pE, c = o;
  if (n.unstable_instrumentations) {
    let A = n.unstable_instrumentations;
    c = (z) => ({
      ...o(z),
      ...iE(
        A.map((H) => H.route).filter(Boolean),
        z
      )
    });
  }
  let d = {}, h = Fr(
    n.routes,
    c,
    void 0,
    d
  ), p, m = n.basename || "/";
  m.startsWith("/") || (m = `/${m}`);
  let g = n.dataStrategy || xE, v = {
    unstable_passThroughRequests: !1,
    ...n.future
  }, S = null, T = /* @__PURE__ */ new Set(), E = null, C = null, j = null, O = n.hydrationData != null, Y = Fa(h, n.history.location, m), L = !1, Q = null, $, I;
  if (Y == null && !n.patchRoutesOnNavigation) {
    let A = gn(404, {
      pathname: n.history.location.pathname
    }), { matches: z, route: H } = Do(h);
    $ = !0, I = !$, Y = z, Q = { [H.id]: A };
  } else if (Y && !n.hydrationData && va(
    Y,
    h,
    n.history.location.pathname
  ).active && (Y = null), Y)
    if (Y.some((A) => A.route.lazy))
      $ = !1, I = !$;
    else if (!Y.some((A) => Fd(A.route)))
      $ = !0, I = !$;
    else {
      let A = n.hydrationData ? n.hydrationData.loaderData : null, z = n.hydrationData ? n.hydrationData.errors : null, H = Y;
      if (z) {
        let J = Y.findIndex(
          (ie) => z[ie.route.id] !== void 0
        );
        H = H.slice(0, J + 1);
      }
      I = !1, $ = !0, H.forEach((J) => {
        let ie = X0(J.route, A, z);
        I = I || ie.renderFallback, $ = $ && !ie.shouldLoad;
      });
    }
  else {
    $ = !1, I = !$, Y = [];
    let A = va(
      null,
      h,
      n.history.location.pathname
    );
    A.active && A.matches && (L = !0, Y = A.matches);
  }
  let ee, N = {
    historyAction: n.history.action,
    location: n.history.location,
    matches: Y,
    initialized: $,
    renderFallback: I,
    navigation: Yf,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: n.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: n.hydrationData && n.hydrationData.loaderData || {},
    actionData: n.hydrationData && n.hydrationData.actionData || null,
    errors: n.hydrationData && n.hydrationData.errors || Q,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, W = "POP", te = null, P = !1, G, le = !1, de = /* @__PURE__ */ new Map(), se = null, B = !1, ne = !1, re = /* @__PURE__ */ new Set(), fe = /* @__PURE__ */ new Map(), Re = 0, w = -1, X = /* @__PURE__ */ new Map(), ae = /* @__PURE__ */ new Set(), oe = /* @__PURE__ */ new Map(), Te = /* @__PURE__ */ new Map(), Me = /* @__PURE__ */ new Set(), De = /* @__PURE__ */ new Map(), mt, Ze = null;
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
          currentLocation: N.location,
          nextLocation: z,
          historyAction: A
        });
        if (J && H != null) {
          let ie = new Promise((pe) => {
            mt = pe;
          });
          n.history.go(H * -1), Kn(J, {
            state: "blocked",
            location: z,
            proceed() {
              Kn(J, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: z
              }), ie.then(() => n.history.go(H));
            },
            reset() {
              let pe = new Map(N.blockers);
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
    return N.initialized || Xn("POP", N.location, {
      initialHydration: !0
    }), ee;
  }
  function _i() {
    S && S(), se && se(), T.clear(), G && G.abort(), N.fetchers.forEach((A, z) => Qn(z)), N.blockers.forEach((A, z) => ti(z));
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
    })), N = {
      ...N,
      ...A
    };
    let H = [], J = [];
    N.fetchers.forEach((ie, pe) => {
      ie.state === "idle" && (Me.has(pe) ? H.push(pe) : J.push(pe));
    }), Me.forEach((ie) => {
      !N.fetchers.has(ie) && !fe.has(ie) && H.push(ie);
    }), [...T].forEach(
      (ie) => ie(N, {
        deletedFetchers: H,
        newErrors: A.errors ?? null,
        viewTransitionOpts: z.viewTransitionOpts,
        flushSync: z.flushSync === !0
      })
    ), H.forEach((ie) => Qn(ie)), J.forEach((ie) => N.fetchers.delete(ie));
  }
  function Gt(A, z, { flushSync: H } = {}) {
    let J = N.actionData != null && N.navigation.formMethod != null && Ut(N.navigation.formMethod) && N.navigation.state === "loading" && A.state?._isRedirect !== !0, ie;
    z.actionData ? Object.keys(z.actionData).length > 0 ? ie = z.actionData : ie = null : J ? ie = N.actionData : ie = null;
    let pe = z.loaderData ? Qg(
      N.loaderData,
      z.loaderData,
      z.matches || [],
      z.errors
    ) : N.loaderData, ue = N.blockers;
    ue.size > 0 && (ue = new Map(ue), ue.forEach((xe, be) => ue.set(be, Dr)));
    let ce = B ? !1 : Hl(A, z.matches || N.matches), ge = P === !0 || N.navigation.formMethod != null && Ut(N.navigation.formMethod) && A.state?._isRedirect !== !0;
    p && (h = p, p = void 0), B || W === "POP" || (W === "PUSH" ? n.history.push(A, A.state) : W === "REPLACE" && n.history.replace(A, A.state));
    let he;
    if (W === "POP") {
      let xe = de.get(N.location.pathname);
      xe && xe.has(A.pathname) ? he = {
        currentLocation: N.location,
        nextLocation: A
      } : de.has(A.pathname) && (he = {
        currentLocation: A,
        nextLocation: N.location
      });
    } else if (le) {
      let xe = de.get(N.location.pathname);
      xe ? xe.add(A.pathname) : (xe = /* @__PURE__ */ new Set([A.pathname]), de.set(N.location.pathname, xe)), he = {
        currentLocation: N.location,
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
        navigation: Yf,
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
      te || (te = Ig());
      let $e = te.promise;
      return n.history.go(A), $e;
    }
    let H = md(
      N.location,
      N.matches,
      m,
      A,
      z?.fromRouteId,
      z?.relative
    ), { path: J, submission: ie, error: pe } = Ug(
      !1,
      H,
      z
    ), ue;
    z?.unstable_mask && (ue = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof z.unstable_mask == "string" ? zn(z.unstable_mask) : {
        ...N.location.unstable_mask,
        ...z.unstable_mask
      }
    });
    let ce = N.location, ge = hd(
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
    he === !0 ? xe = "REPLACE" : he === !1 || ie != null && Ut(ie.formMethod) && ie.formAction === N.location.pathname + N.location.search && (xe = "REPLACE");
    let be = z && "preventScrollReset" in z ? z.preventScrollReset === !0 : void 0, He = (z && z.flushSync) === !0, je = ni({
      currentLocation: ce,
      nextLocation: ge,
      historyAction: xe
    });
    if (je) {
      Kn(je, {
        state: "blocked",
        location: ge,
        proceed() {
          Kn(je, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: ge
          }), Li(A, z);
        },
        reset() {
          let $e = new Map(N.blockers);
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
    Ze || (Ze = Ig()), ya(), Tt({ revalidation: "loading" });
    let A = Ze.promise;
    return N.navigation.state === "submitting" ? A : N.navigation.state === "idle" ? (Xn(N.historyAction, N.location, {
      startUninterruptedRevalidation: !0
    }), A) : (Xn(
      W || N.historyAction,
      N.navigation.location,
      {
        overrideNavigation: N.navigation,
        // Proxy through any rending view transition
        enableViewTransition: le === !0
      }
    ), A);
  }
  async function Xn(A, z, H) {
    G && G.abort(), G = null, W = A, B = (H && H.startUninterruptedRevalidation) === !0, Mu(N.location, N.matches), P = (H && H.preventScrollReset) === !0, le = (H && H.enableViewTransition) === !0;
    let J = p || h, ie = H && H.overrideNavigation, pe = H?.initialHydration && N.matches && N.matches.length > 0 && !L ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      N.matches
    ) : Fa(J, z, m), ue = (H && H.flushSync) === !0;
    if (pe && N.initialized && !ne && DE(N.location, z) && !(H && H.submission && Ut(H.submission.formMethod))) {
      Gt(z, { matches: pe }, { flushSync: ue });
      return;
    }
    let ce = va(pe, J, z.pathname);
    if (ce.active && ce.matches && (pe = ce.matches), !pe) {
      let { error: Xe, notFoundMatches: lt, route: Oe } = Rn(
        z.pathname
      );
      Gt(
        z,
        {
          matches: lt,
          loaderData: {},
          errors: {
            [Oe.id]: Xe
          }
        },
        { flushSync: ue }
      );
      return;
    }
    G = new AbortController();
    let ge = xl(
      n.history,
      z,
      G.signal,
      H && H.submission
    ), he = n.getContext ? await n.getContext() : new Ng(), xe;
    if (H && H.pendingError)
      xe = [
        Qa(pe).route.id,
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
        let [lt, Oe] = Xe.pendingActionResult;
        if (rn(Oe) && Qr(Oe.error) && Oe.error.status === 404) {
          G = null, Gt(z, {
            matches: Xe.matches,
            loaderData: {},
            errors: {
              [lt]: Oe.error
            }
          });
          return;
        }
      }
      pe = Xe.matches || pe, xe = Xe.pendingActionResult, ie = kf(z, H.submission), ue = !1, ce.active = !1, ge = xl(
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
    be || (G = null, Gt(z, {
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
        let He = Qa(be.partialMatches).route.id;
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
        c,
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
      return ce && ce.replace != null ? be = ce.replace : be = Pg(
        he.response.headers.get("Location"),
        new URL(A.url),
        m,
        n.history
      ) === N.location.pathname + N.location.search, await Fn(A, he, !0, {
        submission: H,
        replace: be
      }), { shortCircuited: !0 };
    }
    if (rn(he)) {
      let be = Qa(J, xe.route.id);
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
    let je = pe || kf(z, ue), $e = ue || ce || $g(je), Xe = !B && !he;
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
        let ct = Qa(Ne.partialMatches).route.id;
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
    let lt = p || h, { dsMatches: Oe, revalidatingFetchers: pt } = Bg(
      A,
      J,
      c,
      d,
      n.history,
      N,
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
      lt,
      m,
      n.patchRoutesOnNavigation != null,
      be,
      He
    );
    if (w = ++Re, !n.dataStrategy && !Oe.some((Ne) => Ne.shouldLoad) && !Oe.some(
      (Ne) => Ne.route.middleware && Ne.route.middleware.length > 0
    ) && pt.length === 0) {
      let Ne = ds();
      return Gt(
        z,
        {
          matches: H,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: be && rn(be[1]) ? { [be[0]]: be[1].error } : null,
          ...Kg(be),
          ...Ne ? { fetchers: new Map(N.fetchers) } : {}
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
    G && G.signal.addEventListener(
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
    G && G.signal.removeEventListener(
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
    let { loaderData: _n, errors: ai } = Fg(
      N,
      H,
      ba,
      be,
      pt,
      Mn
    );
    he && N.errors && (ai = { ...N.errors, ...ai });
    let Ln = ds(), ii = hs(w), Bi = Ln || ii || pt.length > 0;
    return {
      matches: H,
      loaderData: _n,
      errors: ai,
      ...Bi ? { fetchers: new Map(N.fetchers) } : {}
    };
  }
  function Vi(A) {
    if (A && !rn(A[1]))
      return {
        [A[0]]: A[1].data
      };
    if (N.actionData)
      return Object.keys(N.actionData).length === 0 ? null : N.actionData;
  }
  function Ul(A) {
    return A.forEach((z) => {
      let H = N.fetchers.get(z.key), J = jr(
        void 0,
        H ? H.data : void 0
      );
      N.fetchers.set(z.key, J);
    }), new Map(N.fetchers);
  }
  async function xu(A, z, H, J) {
    Mt(A);
    let ie = (J && J.flushSync) === !0, pe = p || h, ue = md(
      N.location,
      N.matches,
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
    let { path: he, submission: xe, error: be } = Ug(
      !0,
      ue,
      J
    );
    if (be) {
      sn(A, z, be, { flushSync: ie });
      return;
    }
    let He = n.getContext ? await n.getContext() : new Ng(), je = (J && J.preventScrollReset) === !0;
    if (xe && Ut(xe.formMethod)) {
      await Tu(
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
  async function Tu(A, z, H, J, ie, pe, ue, ce, ge, he) {
    ya(), oe.delete(A);
    let xe = N.fetchers.get(A);
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
      c,
      d,
      He,
      H,
      J,
      je,
      s,
      ie
    ), lt = await pa(
      He,
      H,
      Xe,
      ie,
      A
    ), Oe = lt[je.route.id];
    if (!Oe) {
      for (let et of Xe)
        if (lt[et.route.id]) {
          Oe = lt[et.route.id];
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
        if (fe.delete(A), w > $e) {
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
    let pt = N.navigation.location || N.location, We = xl(
      n.history,
      pt,
      be.signal
    ), ba = p || h, Mn = N.navigation.state !== "idle" ? Fa(ba, N.navigation.location, m) : N.matches;
    ze(Mn, "Didn't find any matches after fetcher action");
    let At = ++Re;
    X.set(A, At);
    let _n = jr(ge, Oe.data);
    N.fetchers.set(A, _n);
    let { dsMatches: ai, revalidatingFetchers: Ln } = Bg(
      We,
      ie,
      c,
      d,
      n.history,
      N,
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
      let Hi = et.key, qi = N.fetchers.get(Hi), gs = jr(
        void 0,
        qi ? qi.data : void 0
      );
      N.fetchers.set(Hi, gs), Mt(Hi), et.controller && fe.set(Hi, et.controller);
    }), Tt({ fetchers: new Map(N.fetchers) });
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
    ), X.delete(A), fe.delete(A), Ln.forEach((et) => fe.delete(et.key)), N.fetchers.has(A)) {
      let et = da(Oe.data);
      N.fetchers.set(A, et);
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
    let { loaderData: Lt, errors: yt } = Fg(
      N,
      Mn,
      Bi,
      void 0,
      Ln,
      Ne
    );
    hs(At), N.navigation.state === "loading" && At > w ? (ze(W, "Expected pending action"), G && G.abort(), Gt(N.navigation.location, {
      matches: Mn,
      loaderData: Lt,
      errors: yt,
      fetchers: new Map(N.fetchers)
    })) : (Tt({
      errors: yt,
      loaderData: Qg(
        N.loaderData,
        Lt,
        Mn,
        yt
      ),
      fetchers: new Map(N.fetchers)
    }), ne = !1);
  }
  async function Bt(A, z, H, J, ie, pe, ue, ce, ge) {
    let he = N.fetchers.get(A);
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
      c,
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
    ), lt = Xe[He.route.id];
    if (!lt) {
      for (let Oe of J)
        if (Xe[Oe.route.id]) {
          lt = Xe[Oe.route.id];
          break;
        }
    }
    if (fe.get(A) === xe && fe.delete(A), !be.signal.aborted) {
      if (Me.has(A)) {
        En(A, da(void 0));
        return;
      }
      if (Mi(lt))
        if (w > je) {
          En(A, da(void 0));
          return;
        } else {
          ae.add(A), await Fn(be, lt, !1, {
            preventScrollReset: ce
          });
          return;
        }
      if (rn(lt)) {
        sn(A, z, lt.error);
        return;
      }
      En(A, da(lt.data));
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
    ze(ce, "Expected a Location header on the redirect Response"), ce = Pg(
      ce,
      new URL(A.url),
      m,
      n.history
    );
    let ge = hd(N.location, ce, {
      _isRedirect: !0
    });
    if (r) {
      let $e = !1;
      if (z.response.headers.has("X-Remix-Reload-Document"))
        $e = !0;
      else if (Gd(ce)) {
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
    G = null;
    let he = ue === !0 || z.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: xe, formAction: be, formEncType: He } = N.navigation;
    !J && !ie && xe && be && He && (J = $g(N.navigation));
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
      let $e = kf(
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
        !pe.hasOwnProperty(ce.route.id) && !N.loaderData.hasOwnProperty(ce.route.id) && (!N.errors || !N.errors.hasOwnProperty(ce.route.id)) && ce.shouldCallHandler() && (pe[ce.route.id] = {
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
    N.fetchers.set(A, z), Tt(
      { fetchers: new Map(N.fetchers) },
      { flushSync: (H && H.flushSync) === !0 }
    );
  }
  function sn(A, z, H, J = {}) {
    let ie = Qa(N.matches, z);
    Qn(A), Tt(
      {
        errors: {
          [ie.route.id]: H
        },
        fetchers: new Map(N.fetchers)
      },
      { flushSync: (J && J.flushSync) === !0 }
    );
  }
  function fs(A) {
    return Te.set(A, (Te.get(A) || 0) + 1), Me.has(A) && Me.delete(A), N.fetchers.get(A) || mE;
  }
  function Eu(A, z) {
    Mt(A, z?.reason), En(A, da(null));
  }
  function Qn(A) {
    let z = N.fetchers.get(A);
    fe.has(A) && !(z && z.state === "loading" && X.has(A)) && Mt(A), oe.delete(A), X.delete(A), ae.delete(A), Me.delete(A), re.delete(A), N.fetchers.delete(A);
  }
  function Ht(A) {
    let z = (Te.get(A) || 0) - 1;
    z <= 0 ? (Te.delete(A), Me.add(A)) : Te.set(A, z), Tt({ fetchers: new Map(N.fetchers) });
  }
  function Mt(A, z) {
    let H = fe.get(A);
    H && (H.abort(z), fe.delete(A));
  }
  function _t(A) {
    for (let z of A) {
      let H = fs(z), J = da(H.data);
      N.fetchers.set(z, J);
    }
  }
  function ds() {
    let A = [], z = !1;
    for (let H of ae) {
      let J = N.fetchers.get(H);
      ze(J, `Expected fetcher: ${H}`), J.state === "loading" && (ae.delete(H), A.push(H), z = !0);
    }
    return _t(A), z;
  }
  function hs(A) {
    let z = [];
    for (let [H, J] of X)
      if (J < A) {
        let ie = N.fetchers.get(H);
        ze(ie, `Expected fetcher: ${H}`), ie.state === "loading" && (Mt(H), X.delete(H), z.push(H));
      }
    return _t(z), z.length > 0;
  }
  function Ru(A, z) {
    let H = N.blockers.get(A) || Dr;
    return De.get(A) !== z && De.set(A, z), H;
  }
  function ti(A) {
    N.blockers.delete(A), De.delete(A);
  }
  function Kn(A, z) {
    let H = N.blockers.get(A) || Dr;
    ze(
      H.state === "unblocked" && z.state === "blocked" || H.state === "blocked" && z.state === "blocked" || H.state === "blocked" && z.state === "proceeding" || H.state === "blocked" && z.state === "unblocked" || H.state === "proceeding" && z.state === "unblocked",
      `Invalid blocker state transition: ${H.state} -> ${z.state}`
    );
    let J = new Map(N.blockers);
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
    let J = Array.from(De.entries()), [ie, pe] = J[J.length - 1], ue = N.blockers.get(ie);
    if (!(ue && ue.state === "proceeding") && pe({ currentLocation: A, nextLocation: z, historyAction: H }))
      return ie;
  }
  function Rn(A) {
    let z = gn(404, { pathname: A }), H = p || h, { matches: J, route: ie } = Do(H);
    return { notFoundMatches: J, route: ie, error: z };
  }
  function Ui(A, z, H) {
    if (E = A, j = z, C = H || null, !O && N.navigation === Yf) {
      O = !0;
      let J = Hl(N.location, N.matches);
      J != null && Tt({ restoreScrollPosition: J });
    }
    return () => {
      E = null, j = null, C = null;
    };
  }
  function ga(A, z) {
    return C && C(
      A,
      z.map((J) => HT(J, N.loaderData))
    ) || A.key;
  }
  function Mu(A, z) {
    if (E && j) {
      let H = ga(A, z);
      E[H] = j();
    }
  }
  function Hl(A, z) {
    if (E) {
      let H = ga(A, z), J = E[H];
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
            H.aborted || Hg(
              xe,
              be,
              ue,
              ce,
              c,
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
      c,
      void 0,
      d
    );
  }
  function ys(A, z, H = !1) {
    let J = p == null;
    Hg(
      A,
      z,
      p || h,
      d,
      c,
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
      return N;
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
    fetch: xu,
    revalidate: Ll,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (A) => n.history.createHref(A),
    encodeLocation: (A) => n.history.encodeLocation(A),
    getFetcher: fs,
    resetFetcher: Eu,
    deleteFetcher: Ht,
    dispose: _i,
    getBlocker: Ru,
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
function md(n, a, r, s, o, c) {
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
  let p = fu(
    s || ".",
    Pd(d),
    xn(n.pathname, r) || n.pathname,
    c === "path"
  );
  if (s == null && (p.search = n.search, p.hash = n.hash), (s == null || s === "" || s === ".") && h) {
    let m = Kd(p.search);
    if (h.route.index && !m)
      p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index";
    else if (!h.route.index && m) {
      let g = new URLSearchParams(p.search), v = g.getAll("index");
      g.delete("index"), v.filter((T) => T).forEach((T) => g.append("index", T));
      let S = g.toString();
      p.search = S ? `?${S}` : "";
    }
  }
  return r !== "/" && (p.pathname = JT({ basename: r, pathname: p.pathname })), Gn(p);
}
function Ug(n, a, r) {
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
  }), c = (r.formMethod || "get").toUpperCase(), d = J0(a);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!Ut(c))
        return s();
      let v = typeof r.body == "string" ? r.body : r.body instanceof FormData || r.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(r.body.entries()).reduce(
          (S, [T, E]) => `${S}${T}=${E}
`,
          ""
        )
      ) : String(r.body);
      return {
        path: a,
        submission: {
          formMethod: c,
          formAction: d,
          formEncType: r.formEncType,
          formData: void 0,
          json: void 0,
          text: v
        }
      };
    } else if (r.formEncType === "application/json") {
      if (!Ut(c))
        return s();
      try {
        let v = typeof r.body == "string" ? JSON.parse(r.body) : r.body;
        return {
          path: a,
          submission: {
            formMethod: c,
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
    h = yd(r.formData), p = r.formData;
  else if (r.body instanceof FormData)
    h = yd(r.body), p = r.body;
  else if (r.body instanceof URLSearchParams)
    h = r.body, p = Xg(h);
  else if (r.body == null)
    h = new URLSearchParams(), p = new FormData();
  else
    try {
      h = new URLSearchParams(r.body), p = Xg(h);
    } catch {
      return s();
    }
  let m = {
    formMethod: c,
    formAction: d,
    formEncType: r && r.formEncType || "application/x-www-form-urlencoded",
    formData: p,
    json: void 0,
    text: void 0
  };
  if (Ut(m.formMethod))
    return { path: a, submission: m };
  let g = zn(a);
  return n && g.search && Kd(g.search) && h.append("index", ""), g.search = `?${h}`, { path: Gn(g), submission: m };
}
function Bg(n, a, r, s, o, c, d, h, p, m, g, v, S, T, E, C, j, O, Y, L, Q) {
  let $ = L ? rn(L[1]) ? L[1].error : L[1].data : void 0, I = o.createURL(c.location), ee = o.createURL(p), N;
  if (g && c.errors) {
    let se = Object.keys(c.errors)[0];
    N = d.findIndex((B) => B.route.id === se);
  } else if (L && rn(L[1])) {
    let se = L[0];
    N = d.findIndex((B) => B.route.id === se) - 1;
  }
  let W = L ? L[1].statusCode : void 0, te = W && W >= 400, P = {
    currentUrl: I,
    currentParams: c.matches[0]?.params || {},
    nextUrl: ee,
    nextParams: d[0].params,
    ...h,
    actionResult: $,
    actionStatus: W
  }, G = Wr(d), le = d.map((se, B) => {
    let { route: ne } = se, re = null;
    if (N != null && B > N)
      re = !1;
    else if (ne.lazy)
      re = !0;
    else if (!Fd(ne))
      re = !1;
    else if (g) {
      let { shouldLoad: X } = X0(
        ne,
        c.loaderData,
        c.errors
      );
      re = X;
    } else vE(c.loaderData, c.matches[B], se) && (re = !0);
    if (re !== null)
      return pd(
        r,
        s,
        n,
        p,
        G,
        se,
        m,
        a,
        re
      );
    let fe = !1;
    typeof Q == "boolean" ? fe = Q : te ? fe = !1 : (v || I.pathname + I.search === ee.pathname + ee.search || I.search !== ee.search || bE(c.matches[B], se)) && (fe = !0);
    let Re = {
      ...P,
      defaultShouldRevalidate: fe
    }, w = Yr(se, Re);
    return pd(
      r,
      s,
      n,
      p,
      G,
      se,
      m,
      a,
      w,
      Re,
      Q
    );
  }), de = [];
  return E.forEach((se, B) => {
    if (g || !d.some((oe) => oe.route.id === se.routeId) || T.has(B))
      return;
    let ne = c.fetchers.get(B), re = ne && ne.state !== "idle" && ne.data === void 0, fe = Fa(j, se.path, O);
    if (!fe) {
      if (Y && re)
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
    if (C.has(B))
      return;
    let Re = Bo(fe, se.path), w = new AbortController(), X = xl(
      o,
      se.path,
      w.signal
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
      typeof Q == "boolean" ? oe = Q : te ? oe = !1 : oe = v;
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
      controller: w
    });
  }), { dsMatches: le, revalidatingFetchers: de };
}
function Fd(n) {
  return n.loader != null || n.middleware != null && n.middleware.length > 0;
}
function X0(n, a, r) {
  if (n.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!Fd(n))
    return { shouldLoad: !1, renderFallback: !1 };
  let s = a != null && n.id in a, o = r != null && r[n.id] !== void 0;
  if (!s && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof n.loader == "function" && n.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !s };
  let c = !s && !o;
  return { shouldLoad: c, renderFallback: c };
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
function Hg(n, a, r, s, o, c) {
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
      (v) => F0(m, v)
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
  if (c && p.length > 0)
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
function F0(n, a) {
  return "id" in n && "id" in a && n.id === a.id ? !0 : n.index === a.index && n.path === a.path && n.caseSensitive === a.caseSensitive ? (!n.children || n.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : n.children?.every(
    (r, s) => a.children?.some((o) => F0(r, o))
  ) ?? !1 : !1;
}
var qg = /* @__PURE__ */ new WeakMap(), Q0 = ({
  key: n,
  route: a,
  manifest: r,
  mapRouteProperties: s
}) => {
  let o = r[a.id];
  if (ze(o, "No route found in manifest"), !o.lazy || typeof o.lazy != "object")
    return;
  let c = o.lazy[n];
  if (!c)
    return;
  let d = qg.get(o);
  d || (d = {}, qg.set(o, d));
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
      let S = await c();
      S != null && (Object.assign(o, { [n]: S }), Object.assign(o, s(o)));
    }
    typeof o.lazy == "object" && (o.lazy[n] = void 0, Object.values(o.lazy).every((S) => S === void 0) && (o.lazy = void 0));
  })();
  return d[n] = p, p;
}, Yg = /* @__PURE__ */ new WeakMap();
function SE(n, a, r, s, o) {
  let c = r[n.id];
  if (ze(c, "No route found in manifest"), !n.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof n.lazy == "function") {
    let g = Yg.get(c);
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
      for (let E in S) {
        let C = S[E];
        if (C === void 0)
          continue;
        let j = UT(E), Y = c[E] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        E !== "hasErrorBoundary";
        j ? ht(
          !j,
          "Route property " + E + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : Y ? ht(
          !Y,
          `Route "${c.id}" has a static property "${E}" defined but its lazy function is also returning a value for this property. The lazy route property "${E}" will be ignored.`
        ) : T[E] = C;
      }
      Object.assign(c, T), Object.assign(c, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...s(c),
        lazy: void 0
      });
    })();
    return Yg.set(c, v), v.catch(() => {
    }), {
      lazyRoutePromise: v,
      lazyHandlerPromise: v
    };
  }
  let d = Object.keys(n.lazy), h = [], p;
  for (let g of d) {
    if (o && o.includes(g))
      continue;
    let v = Q0({
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
async function kg(n) {
  let a = n.matches.filter((o) => o.shouldLoad), r = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, c) => {
    r[a[c].route.id] = o;
  }), r;
}
async function xE(n) {
  return n.matches.some((a) => a.route.middleware) ? K0(n, () => kg(n)) : kg(n);
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
  function r(s, o, c) {
    if (c)
      return Promise.resolve(
        Object.assign(c.value, {
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
      ), p = Qa(
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
  let { matches: c, ...d } = n, h = c.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((g) => [m.route.id, g]) : []
  );
  return await Z0(
    d,
    h,
    a,
    r,
    s,
    o
  );
}
async function Z0(n, a, r, s, o, c, d = 0) {
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
      return v = { value: await Z0(
        n,
        a,
        r,
        s,
        o,
        c,
        d + 1
      ) }, v.value;
    } catch (T) {
      return v = { value: await c(T, m, v) }, v.value;
    }
  };
  try {
    let T = await g(n, S), E = T != null ? s(T) : void 0;
    return o(E) ? E : v ? E ?? v.value : (v = { value: await S() }, v.value);
  } catch (T) {
    return await c(T, m, v);
  }
}
function $0(n, a, r, s, o) {
  let c = Q0({
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
    middleware: c,
    route: d.lazyRoutePromise,
    handler: d.lazyHandlerPromise
  };
}
function pd(n, a, r, s, o, c, d, h, p, m = null, g) {
  let v = !1, S = $0(
    n,
    a,
    r,
    c,
    d
  );
  return {
    ...c,
    _lazyPromises: S,
    shouldLoad: p,
    shouldRevalidateArgs: m,
    shouldCallHandler(T) {
      return v = !0, m ? typeof g == "boolean" ? Yr(c, {
        ...m,
        defaultShouldRevalidate: g
      }) : typeof T == "boolean" ? Yr(c, {
        ...m,
        defaultShouldRevalidate: T
      }) : Yr(c, m) : p;
    },
    resolve(T) {
      let { lazy: E, loader: C, middleware: j } = c.route, O = v || p || T && !Ut(r.method) && (E || C), Y = j && j.length > 0 && !C && !E;
      return O && (Ut(r.method) || !Y) ? RE({
        request: r,
        path: s,
        unstable_pattern: o,
        match: c,
        lazyHandlerPromise: S?.handler,
        lazyRoutePromise: S?.route,
        handlerOverride: T,
        scopedContext: h
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function wl(n, a, r, s, o, c, d, h, p = null) {
  return o.map((m) => m.route.id !== c.route.id ? {
    ...m,
    shouldLoad: !1,
    shouldRevalidateArgs: p,
    shouldCallHandler: () => !1,
    _lazyPromises: $0(
      n,
      a,
      r,
      m,
      d
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : pd(
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
async function EE(n, a, r, s, o, c, d) {
  s.some((g) => g._lazyPromises?.middleware) && await Promise.all(s.map((g) => g._lazyPromises?.middleware));
  let h = {
    request: a,
    unstable_url: I0(a, r),
    unstable_pattern: Wr(s),
    params: s[0].params,
    context: c,
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
  lazyRoutePromise: c,
  handlerOverride: d,
  scopedContext: h
}) {
  let p, m, g = Ut(n.method), v = g ? "action" : "loader", S = (T) => {
    let E, C = new Promise((Y, L) => E = L);
    m = () => E(), n.signal.addEventListener("abort", m);
    let j = (Y) => typeof T != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${v}" [routeId: ${s.route.id}]`
      )
    ) : T(
      {
        request: n,
        unstable_url: I0(n, a),
        unstable_pattern: r,
        params: s.params,
        context: h
      },
      ...Y !== void 0 ? [Y] : []
    ), O = (async () => {
      try {
        return { type: "data", result: await (d ? d((L) => j(L)) : j()) };
      } catch (Y) {
        return { type: "error", result: Y };
      }
    })();
    return Promise.race([O, C]);
  };
  try {
    let T = g ? s.route.action : s.route.loader;
    if (o || c)
      if (T) {
        let E, [C] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          S(T).catch((j) => {
            E = j;
          }),
          // Ensure all lazy route promises are resolved before continuing
          o,
          c
        ]);
        if (E !== void 0)
          throw E;
        p = C;
      } else {
        await o;
        let E = g ? s.route.action : s.route.loader;
        if (E)
          [p] = await Promise.all([S(E), c]);
        else if (v === "action") {
          let C = new URL(n.url), j = C.pathname + C.search;
          throw gn(405, {
            method: n.method,
            pathname: j,
            routeId: s.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (T)
      p = await S(T);
    else {
      let E = new URL(n.url), C = E.pathname + E.search;
      throw gn(404, {
        pathname: C
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
  if (Qd(a)) {
    let s;
    try {
      s = await ME(a);
    } catch (o) {
      return { type: "error", error: o };
    }
    return r === "error" ? {
      type: "error",
      error: new du(a.status, a.statusText, s),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: s,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return r === "error" ? Zg(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: jE(a),
    statusCode: Qr(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: Qr(a) ? a.status : void 0
  } : Zg(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function CE(n, a, r, s, o) {
  let c = n.headers.get("Location");
  if (ze(
    c,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !Gd(c)) {
    let d = s.slice(
      0,
      s.findIndex((h) => h.route.id === r) + 1
    );
    c = md(
      new URL(a.url),
      d,
      o,
      c
    ), n.headers.set("Location", c);
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
function Pg(n, a, r, s) {
  if (Gd(n)) {
    let o = n, c = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (Gg.includes(c.protocol))
      throw new Error("Invalid redirect location");
    let d = xn(c.pathname, r) != null;
    if (c.origin === a.origin && d)
      return Xd(c.pathname) + c.search + c.hash;
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
  let o = n.createURL(J0(a)).toString(), c = { signal: r };
  if (s && Ut(s.formMethod)) {
    let { formMethod: d, formEncType: h } = s;
    c.method = d.toUpperCase(), h === "application/json" ? (c.headers = new Headers({ "Content-Type": h }), c.body = JSON.stringify(s.json)) : h === "text/plain" ? c.body = s.text : h === "application/x-www-form-urlencoded" && s.formData ? c.body = yd(s.formData) : c.body = s.formData;
  }
  return new Request(o, c);
}
function I0(n, a) {
  let r = new URL(n.url), s = typeof a == "string" ? zn(a) : a;
  if (r.pathname = s.pathname || "/", s.search) {
    let o = new URLSearchParams(s.search), c = o.getAll("index");
    o.delete("index");
    for (let d of c.filter(Boolean))
      o.append("index", d);
    r.search = o.size ? `?${o.toString()}` : "";
  } else
    r.search = "";
  return r.hash = s.hash || "", r;
}
function yd(n) {
  let a = new URLSearchParams();
  for (let [r, s] of n.entries())
    a.append(r, typeof s == "string" ? s : s.name);
  return a;
}
function Xg(n) {
  let a = new FormData();
  for (let [r, s] of n.entries())
    a.append(r, s);
  return a;
}
function wE(n, a, r, s = !1, o = !1) {
  let c = {}, d = null, h, p = !1, m = {}, g = r && rn(r[1]) ? r[1].error : void 0;
  return n.forEach((v) => {
    if (!(v.route.id in a))
      return;
    let S = v.route.id, T = a[S];
    if (ze(
      !Mi(T),
      "Cannot handle redirect results in processLoaderData"
    ), rn(T)) {
      let E = T.error;
      if (g !== void 0 && (E = g, g = void 0), d = d || {}, o)
        d[S] = E;
      else {
        let C = Qa(n, S);
        d[C.route.id] == null && (d[C.route.id] = E);
      }
      s || (c[S] = P0), p || (p = !0, h = Qr(T.error) ? T.error.status : 500), T.headers && (m[S] = T.headers);
    } else
      c[S] = T.data, T.statusCode && T.statusCode !== 200 && !p && (h = T.statusCode), T.headers && (m[S] = T.headers);
  }), g !== void 0 && r && (d = { [r[0]]: g }, r[2] && (c[r[2]] = void 0)), {
    loaderData: c,
    errors: d,
    statusCode: h || 200,
    loaderHeaders: m
  };
}
function Fg(n, a, r, s, o, c) {
  let { loaderData: d, errors: h } = wE(
    a,
    r,
    s
  );
  return o.filter((p) => !p.matches || p.matches.some((m) => m.shouldLoad)).forEach((p) => {
    let { key: m, match: g, controller: v } = p;
    if (v && v.signal.aborted)
      return;
    let S = c[m];
    if (ze(S, "Did not find corresponding fetcher result"), rn(S)) {
      let T = Qa(n.matches, g?.route.id);
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
function Qg(n, a, r, s) {
  let o = Object.entries(a).filter(([, c]) => c !== P0).reduce((c, [d, h]) => (c[d] = h, c), {});
  for (let c of r) {
    let d = c.route.id;
    if (!a.hasOwnProperty(d) && n.hasOwnProperty(d) && c.route.loader && (o[d] = n[d]), s && s.hasOwnProperty(d))
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
function Qa(n, a) {
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
  message: c
} = {}) {
  let d = "Unknown Server Error", h = "Unknown @remix-run/router error";
  return n === 400 ? (d = "Bad Request", s && a && r ? h = `You made a ${s} request to "${a}" but did not provide a \`loader\` for route "${r}", so there is no way to handle the request.` : o === "invalid-body" && (h = "Unable to encode submission body")) : n === 403 ? (d = "Forbidden", h = `Route "${r}" does not match URL "${a}"`) : n === 404 ? (d = "Not Found", h = `No route matches URL "${a}"`) : n === 405 && (d = "Method Not Allowed", s && a && r ? h = `You made a ${s.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${r}", so there is no way to handle the request.` : s && (h = `Invalid request method "${s.toUpperCase()}"`)), new du(
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
function J0(n) {
  let a = typeof n == "string" ? zn(n) : n;
  return Gn({ ...a, hash: "" });
}
function DE(n, a) {
  return n.pathname !== a.pathname || n.search !== a.search ? !1 : n.hash === "" ? a.hash !== "" : n.hash === a.hash ? !0 : a.hash !== "";
}
function jE(n) {
  return new du(
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
  return Qd(n.result) && k0.has(n.result.status);
}
function rn(n) {
  return n.type === "error";
}
function Mi(n) {
  return (n && n.type) === "redirect";
}
function Zg(n) {
  return typeof n == "object" && n != null && "type" in n && "data" in n && "init" in n && n.type === "DataWithResponseInit";
}
function Qd(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.headers == "object" && typeof n.body < "u";
}
function _E(n) {
  return k0.has(n);
}
function LE(n) {
  return Qd(n) && _E(n.status) && n.headers.has("Location");
}
function VE(n) {
  return dE.has(n.toUpperCase());
}
function Ut(n) {
  return cE.has(n.toUpperCase());
}
function Kd(n) {
  return new URLSearchParams(n).getAll("index").some((a) => a === "");
}
function Bo(n, a) {
  let r = typeof a == "string" ? zn(a).search : a.search;
  if (n[n.length - 1].route.index && Kd(r || ""))
    return n[n.length - 1];
  let s = U0(n);
  return s[s.length - 1];
}
function $g(n) {
  let { formMethod: a, formAction: r, formEncType: s, text: o, formData: c, json: d } = n;
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
    if (c != null)
      return {
        formMethod: a,
        formAction: r,
        formEncType: s,
        formData: c,
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
function kf(n, a) {
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
      for (let [o, c] of Object.entries(s || {}))
        c && Array.isArray(c) && a.set(o, new Set(c || []));
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
function Ig() {
  let n, a, r = new Promise((s, o) => {
    n = async (c) => {
      s(c);
      try {
        await r;
      } catch {
      }
    }, a = async (c) => {
      o(c);
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
var Ni = R.createContext(null);
Ni.displayName = "DataRouter";
var es = R.createContext(null);
es.displayName = "DataRouterState";
var W0 = R.createContext(!1);
function eb() {
  return R.useContext(W0);
}
var Zd = R.createContext({
  isTransitioning: !1
});
Zd.displayName = "ViewTransition";
var tb = R.createContext(
  /* @__PURE__ */ new Map()
);
tb.displayName = "Fetchers";
var YE = R.createContext(null);
YE.displayName = "Await";
var Tn = R.createContext(
  null
);
Tn.displayName = "Navigation";
var hu = R.createContext(
  null
);
hu.displayName = "Location";
var ha = R.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
ha.displayName = "Route";
var $d = R.createContext(null);
$d.displayName = "RouteError";
var nb = "REACT_ROUTER_ERROR", kE = "REDIRECT", GE = "ROUTE_ERROR_RESPONSE";
function PE(n) {
  if (n.startsWith(`${nb}:${kE}:{`))
    try {
      let a = JSON.parse(n.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function XE(n) {
  if (n.startsWith(
    `${nb}:${GE}:{`
  ))
    try {
      let a = JSON.parse(n.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new du(
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
  let { basename: r, navigator: s } = R.useContext(Tn), { hash: o, pathname: c, search: d } = ns(n, { relative: a }), h = c;
  return r !== "/" && (h = c === "/" ? r : bn([r, c])), s.createHref({ pathname: h, search: d, hash: o });
}
function ts() {
  return R.useContext(hu) != null;
}
function ma() {
  return ze(
    ts(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), R.useContext(hu).location;
}
var ab = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function ib(n) {
  R.useContext(Tn).static || R.useLayoutEffect(n);
}
function zi() {
  let { isDataRoute: n } = R.useContext(ha);
  return n ? iR() : QE();
}
function QE() {
  ze(
    ts(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let n = R.useContext(Ni), { basename: a, navigator: r } = R.useContext(Tn), { matches: s } = R.useContext(ha), { pathname: o } = ma(), c = JSON.stringify(Pd(s)), d = R.useRef(!1);
  return ib(() => {
    d.current = !0;
  }), R.useCallback(
    (p, m = {}) => {
      if (ht(d.current, ab), !d.current) return;
      if (typeof p == "number") {
        r.go(p);
        return;
      }
      let g = fu(
        p,
        JSON.parse(c),
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
      c,
      o,
      n
    ]
  );
}
R.createContext(null);
function ns(n, { relative: a } = {}) {
  let { matches: r } = R.useContext(ha), { pathname: s } = ma(), o = JSON.stringify(Pd(r));
  return R.useMemo(
    () => fu(
      n,
      JSON.parse(o),
      s,
      a === "path"
    ),
    [n, o, s, a]
  );
}
function KE(n, a, r) {
  ze(
    ts(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: s } = R.useContext(Tn), { matches: o } = R.useContext(ha), c = o[o.length - 1], d = c ? c.params : {}, h = c ? c.pathname : "/", p = c ? c.pathnameBase : "/", m = c && c.route;
  {
    let j = m && m.path || "";
    sb(
      h,
      !m || j.endsWith("*") || j.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${j}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${j}"> to <Route path="${j === "/" ? "*" : `${j}/*`}">.`
    );
  }
  let g = ma(), v;
  v = g;
  let S = v.pathname || "/", T = S;
  if (p !== "/") {
    let j = p.replace(/^\//, "").split("/");
    T = "/" + S.replace(/^\//, "").split("/").slice(j.length).join("/");
  }
  let E = Fa(n, { pathname: T });
  return ht(
    m || E != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `
  ), ht(
    E == null || E[E.length - 1].route.element !== void 0 || E[E.length - 1].route.Component !== void 0 || E[E.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), WE(
    E && E.map(
      (j) => Object.assign({}, j, {
        params: Object.assign({}, d, j.params),
        pathname: bn([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            j.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : j.pathname
        ]),
        pathnameBase: j.pathnameBase === "/" ? p : bn([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            j.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : j.pathnameBase
        ])
      })
    ),
    o,
    r
  );
}
function ZE() {
  let n = aR(), a = Qr(n) ? `${n.status} ${n.statusText}` : n instanceof Error ? n.message : JSON.stringify(n), r = n instanceof Error ? n.stack : null, s = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: s }, c = { padding: "2px 4px", backgroundColor: s }, d = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    n
  ), d = /* @__PURE__ */ R.createElement(R.Fragment, null, /* @__PURE__ */ R.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ R.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ R.createElement("code", { style: c }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ R.createElement("code", { style: c }, "errorElement"), " prop on your route.")), /* @__PURE__ */ R.createElement(R.Fragment, null, /* @__PURE__ */ R.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ R.createElement("h3", { style: { fontStyle: "italic" } }, a), r ? /* @__PURE__ */ R.createElement("pre", { style: o }, r) : null, d);
}
var $E = /* @__PURE__ */ R.createElement(ZE, null), lb = class extends R.Component {
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
    let a = n !== void 0 ? /* @__PURE__ */ R.createElement(ha.Provider, { value: this.props.routeContext }, /* @__PURE__ */ R.createElement(
      $d.Provider,
      {
        value: n,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ R.createElement(IE, { error: n }, a) : a;
  }
};
lb.contextType = W0;
var Gf = /* @__PURE__ */ new WeakMap();
function IE({
  children: n,
  error: a
}) {
  let { basename: r } = R.useContext(Tn);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let s = PE(a.digest);
    if (s) {
      let o = Gf.get(a);
      if (o) throw o;
      let c = H0(s.location, r);
      if (B0 && !Gf.get(a))
        if (c.isExternal || s.reloadDocument)
          window.location.href = c.absoluteURL || c.to;
        else {
          const d = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(c.to, {
              replace: s.replace
            })
          );
          throw Gf.set(a, d), d;
        }
      return /* @__PURE__ */ R.createElement(
        "meta",
        {
          httpEquiv: "refresh",
          content: `0;url=${c.absoluteURL || c.to}`
        }
      );
    }
  }
  return n;
}
function JE({ routeContext: n, match: a, children: r }) {
  let s = R.useContext(Ni);
  return s && s.static && s.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (s.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ R.createElement(ha.Provider, { value: n }, r);
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
  let o = n, c = s?.errors;
  if (c != null) {
    let g = o.findIndex(
      (v) => v.route.id && c?.[v.route.id] !== void 0
    );
    ze(
      g >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        c
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
        let { loaderData: S, errors: T } = s, E = v.route.loader && !S.hasOwnProperty(v.route.id) && (!T || T[v.route.id] === void 0);
        if (v.route.lazy || E) {
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
      let T, E = !1, C = null, j = null;
      s && (T = c && v.route.id ? c[v.route.id] : void 0, C = v.route.errorElement || $E, d && (h < 0 && S === 0 ? (sb(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), E = !0, j = null) : h === S && (E = !0, j = v.route.hydrateFallbackElement || null)));
      let O = a.concat(o.slice(0, S + 1)), Y = () => {
        let L;
        return T ? L = C : E ? L = j : v.route.Component ? L = /* @__PURE__ */ R.createElement(v.route.Component, null) : v.route.element ? L = v.route.element : L = g, /* @__PURE__ */ R.createElement(
          JE,
          {
            match: v,
            routeContext: {
              outlet: g,
              matches: O,
              isDataRoute: s != null
            },
            children: L
          }
        );
      };
      return s && (v.route.ErrorBoundary || v.route.errorElement || S === 0) ? /* @__PURE__ */ R.createElement(
        lb,
        {
          location: s.location,
          revalidation: s.revalidation,
          component: C,
          error: T,
          children: Y(),
          routeContext: { outlet: null, matches: O, isDataRoute: !0 },
          onError: m
        }
      ) : Y();
    },
    null
  );
}
function Id(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function eR(n) {
  let a = R.useContext(Ni);
  return ze(a, Id(n)), a;
}
function rb(n) {
  let a = R.useContext(es);
  return ze(a, Id(n)), a;
}
function tR(n) {
  let a = R.useContext(ha);
  return ze(a, Id(n)), a;
}
function mu(n) {
  let a = tR(n), r = a.matches[a.matches.length - 1];
  return ze(
    r.route.id,
    `${n} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function nR() {
  return mu(
    "useRouteId"
    /* UseRouteId */
  );
}
function as() {
  let n = rb(
    "useLoaderData"
    /* UseLoaderData */
  ), a = mu(
    "useLoaderData"
    /* UseLoaderData */
  );
  return n.loaderData[a];
}
function aR() {
  let n = R.useContext($d), a = rb(
    "useRouteError"
    /* UseRouteError */
  ), r = mu(
    "useRouteError"
    /* UseRouteError */
  );
  return n !== void 0 ? n : a.errors?.[r];
}
function iR() {
  let { router: n } = eR(
    "useNavigate"
    /* UseNavigateStable */
  ), a = mu(
    "useNavigate"
    /* UseNavigateStable */
  ), r = R.useRef(!1);
  return ib(() => {
    r.current = !0;
  }), R.useCallback(
    async (o, c = {}) => {
      ht(r.current, ab), r.current && (typeof o == "number" ? await n.navigate(o) : await n.navigate(o, { fromRouteId: a, ...c }));
    },
    [n, a]
  );
}
var Jg = {};
function sb(n, a, r) {
  !a && !Jg[n] && (Jg[n] = !0, ht(!1, r));
}
var Wg = {};
function ev(n, a) {
  !n && !Wg[a] && (Wg[a] = !0, console.warn(a));
}
var lR = "useOptimistic", tv = xT[lR], rR = () => {
};
function sR(n) {
  return tv ? tv(n) : [n, rR];
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
    element: R.createElement(n.Component),
    Component: void 0
  })), n.HydrateFallback && (n.hydrateFallbackElement && ht(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: R.createElement(n.HydrateFallback),
    HydrateFallback: void 0
  })), n.ErrorBoundary && (n.errorElement && ht(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: R.createElement(n.ErrorBoundary),
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
  s = eb() || s;
  let [c, d] = R.useState(n.state), [h, p] = sR(c), [m, g] = R.useState(), [v, S] = R.useState({
    isTransitioning: !1
  }), [T, E] = R.useState(), [C, j] = R.useState(), [O, Y] = R.useState(), L = R.useRef(/* @__PURE__ */ new Map()), Q = R.useCallback(
    (W, { deletedFetchers: te, newErrors: P, flushSync: G, viewTransitionOpts: le }) => {
      P && r && Object.values(P).forEach(
        (se) => r(se, {
          location: W.location,
          params: W.matches[0]?.params ?? {},
          unstable_pattern: Wr(W.matches)
        })
      ), W.fetchers.forEach((se, B) => {
        se.data !== void 0 && L.current.set(B, se.data);
      }), te.forEach((se) => L.current.delete(se)), ev(
        G === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let de = n.window != null && n.window.document != null && typeof n.window.document.startViewTransition == "function";
      if (ev(
        le == null || de,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !le || !de) {
        a && G ? a(() => d(W)) : s === !1 ? d(W) : R.startTransition(() => {
          s === !0 && p((se) => nv(se, W)), d(W);
        });
        return;
      }
      if (a && G) {
        a(() => {
          C && (T?.resolve(), C.skipTransition()), S({
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
            E(void 0), j(void 0), g(void 0), S({ isTransitioning: !1 });
          });
        }), a(() => j(se));
        return;
      }
      C ? (T?.resolve(), C.skipTransition(), Y({
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
      C,
      T,
      s,
      p,
      r
    ]
  );
  R.useLayoutEffect(() => n.subscribe(Q), [n, Q]);
  let $ = h.initialized;
  R.useLayoutEffect(() => {
    !$ && n.state.initialized && Q(n.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [$, Q, n.state]), R.useEffect(() => {
    v.isTransitioning && !v.flushSync && E(new fR());
  }, [v]), R.useEffect(() => {
    if (T && m && n.window) {
      let W = m, te = T.promise, P = n.window.document.startViewTransition(async () => {
        s === !1 ? d(W) : R.startTransition(() => {
          s === !0 && p((G) => nv(G, W)), d(W);
        }), await te;
      });
      P.finished.finally(() => {
        E(void 0), j(void 0), g(void 0), S({ isTransitioning: !1 });
      }), j(P);
    }
  }, [
    m,
    T,
    n.window,
    s,
    p
  ]), R.useEffect(() => {
    T && m && h.location.key === m.location.key && T.resolve();
  }, [T, C, h.location, m]), R.useEffect(() => {
    !v.isTransitioning && O && (g(O.state), S({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: O.currentLocation,
      nextLocation: O.nextLocation
    }), Y(void 0));
  }, [v.isTransitioning, O]);
  let I = R.useMemo(() => ({
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
  }), [n]), ee = n.basename || "/", N = R.useMemo(
    () => ({
      router: n,
      navigator: I,
      static: !1,
      basename: ee,
      onError: r
    }),
    [n, I, ee, r]
  );
  return /* @__PURE__ */ R.createElement(R.Fragment, null, /* @__PURE__ */ R.createElement(Ni.Provider, { value: N }, /* @__PURE__ */ R.createElement(es.Provider, { value: h }, /* @__PURE__ */ R.createElement(tb.Provider, { value: L.current }, /* @__PURE__ */ R.createElement(Zd.Provider, { value: v }, /* @__PURE__ */ R.createElement(
    pR,
    {
      basename: ee,
      location: h.location,
      navigationType: h.historyAction,
      navigator: I,
      unstable_useTransitions: s
    },
    /* @__PURE__ */ R.createElement(
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
function nv(n, a) {
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
var hR = R.memo(mR);
function mR({
  routes: n,
  future: a,
  state: r,
  isStatic: s,
  onError: o
}) {
  return KE(n, void 0, { state: r, isStatic: s, onError: o });
}
function pR({
  basename: n = "/",
  children: a = null,
  location: r,
  navigationType: s = "POP",
  navigator: o,
  static: c = !1,
  unstable_useTransitions: d
}) {
  ze(
    !ts(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let h = n.replace(/^\/*/, "/"), p = R.useMemo(
    () => ({
      basename: h,
      navigator: o,
      static: c,
      unstable_useTransitions: d,
      future: {}
    }),
    [h, o, c, d]
  );
  typeof r == "string" && (r = zn(r));
  let {
    pathname: m = "/",
    search: g = "",
    hash: v = "",
    state: S = null,
    key: T = "default",
    unstable_mask: E
  } = r, C = R.useMemo(() => {
    let j = xn(m, h);
    return j == null ? null : {
      location: {
        pathname: j,
        search: g,
        hash: v,
        state: S,
        key: T,
        unstable_mask: E
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
    E
  ]);
  return ht(
    C != null,
    `<Router basename="${h}"> is not able to match the URL "${m}${g}${v}" because it does not start with the basename, so the <Router> won't render anything.`
  ), C == null ? null : /* @__PURE__ */ R.createElement(Tn.Provider, { value: p }, /* @__PURE__ */ R.createElement(hu.Provider, { children: a, value: C }));
}
var Ho = "get", qo = "application/x-www-form-urlencoded";
function pu(n) {
  return typeof HTMLElement < "u" && n instanceof HTMLElement;
}
function yR(n) {
  return pu(n) && n.tagName.toLowerCase() === "button";
}
function gR(n) {
  return pu(n) && n.tagName.toLowerCase() === "form";
}
function vR(n) {
  return pu(n) && n.tagName.toLowerCase() === "input";
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
function Pf(n) {
  return n != null && !TR.has(n) ? (ht(
    !1,
    `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${qo}"`
  ), null) : n;
}
function ER(n, a) {
  let r, s, o, c, d;
  if (gR(n)) {
    let h = n.getAttribute("action");
    s = h ? xn(h, a) : null, r = n.getAttribute("method") || Ho, o = Pf(n.getAttribute("enctype")) || qo, c = new FormData(n);
  } else if (yR(n) || vR(n) && (n.type === "submit" || n.type === "image")) {
    let h = n.form;
    if (h == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = n.getAttribute("formaction") || h.getAttribute("action");
    if (s = p ? xn(p, a) : null, r = n.getAttribute("formmethod") || h.getAttribute("method") || Ho, o = Pf(n.getAttribute("formenctype")) || Pf(h.getAttribute("enctype")) || qo, c = new FormData(h, n), !xR()) {
      let { name: m, type: g, value: v } = n;
      if (g === "image") {
        let S = m ? `${m}.` : "";
        c.append(`${S}x`, "0"), c.append(`${S}y`, "0");
      } else m && c.append(m, v);
    }
  } else {
    if (pu(n))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = Ho, s = null, o = qo, d = n;
  }
  return c && o === "text/plain" && (d = c, c = void 0), { action: s, method: r.toLowerCase(), encType: o, formData: c, body: d };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Jd(n, a) {
  if (n === !1 || n === null || typeof n > "u")
    throw new Error(a);
}
function ob(n, a, r, s) {
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
      let c = a.routes[o.route.id];
      if (c) {
        let d = await RR(c, r);
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
function av(n, a, r, s, o, c) {
  let d = (p, m) => r[m] ? p.route.id !== r[m].route.id : !0, h = (p, m) => (
    // param change, /users/123 -> /users/456
    r[m].pathname !== p.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r[m].route.path?.endsWith("*") && r[m].params["*"] !== p.params["*"]
  );
  return c === "assets" ? a.filter(
    (p, m) => d(p, m) || h(p, m)
  ) : c === "data" ? a.filter((p, m) => {
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
      let c = [o.module];
      return o.clientActionModule && (c = c.concat(o.clientActionModule)), o.clientLoaderModule && (c = c.concat(o.clientLoaderModule)), r && o.hydrateFallbackModule && (c = c.concat(o.hydrateFallbackModule)), o.imports && (c = c.concat(o.imports)), c;
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
    let c = JSON.stringify(DR(o));
    return r.has(c) || (r.add(c), s.push({ key: c, link: o })), s;
  }, []);
}
function Wd() {
  let n = R.useContext(Ni);
  return Jd(
    n,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), n;
}
function NR() {
  let n = R.useContext(es);
  return Jd(
    n,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), n;
}
var eh = R.createContext(void 0);
eh.displayName = "FrameworkContext";
function th() {
  let n = R.useContext(eh);
  return Jd(
    n,
    "You must render this element inside a <HydratedRouter> element"
  ), n;
}
function zR(n, a) {
  let r = R.useContext(eh), [s, o] = R.useState(!1), [c, d] = R.useState(!1), { onFocus: h, onBlur: p, onMouseEnter: m, onMouseLeave: g, onTouchStart: v } = a, S = R.useRef(null);
  R.useEffect(() => {
    if (n === "render" && d(!0), n === "viewport") {
      let C = (O) => {
        O.forEach((Y) => {
          d(Y.isIntersecting);
        });
      }, j = new IntersectionObserver(C, { threshold: 0.5 });
      return S.current && j.observe(S.current), () => {
        j.disconnect();
      };
    }
  }, [n]), R.useEffect(() => {
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
  }, E = () => {
    o(!1), d(!1);
  };
  return r ? n !== "intent" ? [c, S, {}] : [
    c,
    S,
    {
      onFocus: Nr(h, T),
      onBlur: Nr(p, E),
      onMouseEnter: Nr(m, T),
      onMouseLeave: Nr(g, E),
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
  let r = eb(), { router: s } = Wd(), o = R.useMemo(
    () => Fa(s.routes, n, s.basename),
    [s.routes, n, s.basename]
  );
  return o ? r ? /* @__PURE__ */ R.createElement(LR, { page: n, matches: o, ...a }) : /* @__PURE__ */ R.createElement(VR, { page: n, matches: o, ...a }) : null;
}
function _R(n) {
  let { manifest: a, routeModules: r } = th(), [s, o] = R.useState([]);
  return R.useEffect(() => {
    let c = !1;
    return AR(n, a, r).then(
      (d) => {
        c || o(d);
      }
    ), () => {
      c = !0;
    };
  }, [n, a, r]), s;
}
function LR({
  page: n,
  matches: a,
  ...r
}) {
  let s = ma(), { future: o } = th(), { basename: c } = Wd(), d = R.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let h = ob(
      n,
      c,
      o.unstable_trailingSlashAwareDataRequests,
      "rsc"
    ), p = !1, m = [];
    for (let g of a)
      typeof g.route.shouldRevalidate == "function" ? p = !0 : m.push(g.route.id);
    return p && m.length > 0 && h.searchParams.set("_routes", m.join(",")), [h.pathname + h.search];
  }, [
    c,
    o.unstable_trailingSlashAwareDataRequests,
    n,
    s,
    a
  ]);
  return /* @__PURE__ */ R.createElement(R.Fragment, null, d.map((h) => /* @__PURE__ */ R.createElement("link", { key: h, rel: "prefetch", as: "fetch", href: h, ...r })));
}
function VR({
  page: n,
  matches: a,
  ...r
}) {
  let s = ma(), { future: o, manifest: c, routeModules: d } = th(), { basename: h } = Wd(), { loaderData: p, matches: m } = NR(), g = R.useMemo(
    () => av(
      n,
      a,
      m,
      c,
      s,
      "data"
    ),
    [n, a, m, c, s]
  ), v = R.useMemo(
    () => av(
      n,
      a,
      m,
      c,
      s,
      "assets"
    ),
    [n, a, m, c, s]
  ), S = R.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let C = /* @__PURE__ */ new Set(), j = !1;
    if (a.forEach((Y) => {
      let L = c.routes[Y.route.id];
      !L || !L.hasLoader || (!g.some((Q) => Q.route.id === Y.route.id) && Y.route.id in p && d[Y.route.id]?.shouldRevalidate || L.hasClientLoader ? j = !0 : C.add(Y.route.id));
    }), C.size === 0)
      return [];
    let O = ob(
      n,
      h,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return j && C.size > 0 && O.searchParams.set(
      "_routes",
      a.filter((Y) => C.has(Y.route.id)).map((Y) => Y.route.id).join(",")
    ), [O.pathname + O.search];
  }, [
    h,
    o.unstable_trailingSlashAwareDataRequests,
    p,
    s,
    c,
    g,
    a,
    n,
    d
  ]), T = R.useMemo(
    () => CR(v, c),
    [v, c]
  ), E = _R(v);
  return /* @__PURE__ */ R.createElement(R.Fragment, null, S.map((C) => /* @__PURE__ */ R.createElement("link", { key: C, rel: "prefetch", as: "fetch", href: C, ...r })), T.map((C) => /* @__PURE__ */ R.createElement("link", { key: C, rel: "modulepreload", href: C, ...r })), E.map(({ key: C, link: j }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ R.createElement(
      "link",
      {
        key: C,
        nonce: r.nonce,
        ...j,
        crossOrigin: j.crossOrigin ?? r.crossOrigin
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
var ub = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, is = R.forwardRef(
  function({
    onClick: a,
    discover: r = "render",
    prefetch: s = "none",
    relative: o,
    reloadDocument: c,
    replace: d,
    unstable_mask: h,
    state: p,
    target: m,
    to: g,
    preventScrollReset: v,
    viewTransition: S,
    unstable_defaultShouldRevalidate: T,
    ...E
  }, C) {
    let { basename: j, navigator: O, unstable_useTransitions: Y } = R.useContext(Tn), L = typeof g == "string" && ub.test(g), Q = H0(g, j);
    g = Q.to;
    let $ = FE(g, { relative: o }), I = ma(), ee = null;
    if (h) {
      let se = fu(
        h,
        [],
        I.unstable_mask ? I.unstable_mask.pathname : "/",
        !0
      );
      j !== "/" && (se.pathname = se.pathname === "/" ? j : bn([j, se.pathname])), ee = O.createHref(se);
    }
    let [N, W, te] = zR(
      s,
      E
    ), P = kR(g, {
      replace: d,
      unstable_mask: h,
      state: p,
      target: m,
      preventScrollReset: v,
      relative: o,
      viewTransition: S,
      unstable_defaultShouldRevalidate: T,
      unstable_useTransitions: Y
    });
    function G(se) {
      a && a(se), se.defaultPrevented || P(se);
    }
    let le = !(Q.isExternal || c), de = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ R.createElement(
        "a",
        {
          ...E,
          ...te,
          href: (le ? ee : void 0) || Q.absoluteURL || $,
          onClick: le ? G : a,
          ref: UR(C, W),
          target: m,
          "data-discover": !L && r === "render" ? "true" : void 0
        }
      )
    );
    return N && !L ? /* @__PURE__ */ R.createElement(R.Fragment, null, de, /* @__PURE__ */ R.createElement(OR, { page: $ })) : de;
  }
);
is.displayName = "Link";
var HR = R.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: r = !1,
    className: s = "",
    end: o = !1,
    style: c,
    to: d,
    viewTransition: h,
    children: p,
    ...m
  }, g) {
    let v = ns(d, { relative: m.relative }), S = ma(), T = R.useContext(es), { navigator: E, basename: C } = R.useContext(Tn), j = T != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    QR(v) && h === !0, O = E.encodeLocation ? E.encodeLocation(v).pathname : v.pathname, Y = S.pathname, L = T && T.navigation && T.navigation.location ? T.navigation.location.pathname : null;
    r || (Y = Y.toLowerCase(), L = L ? L.toLowerCase() : null, O = O.toLowerCase()), L && C && (L = xn(L, C) || L);
    const Q = O !== "/" && O.endsWith("/") ? O.length - 1 : O.length;
    let $ = Y === O || !o && Y.startsWith(O) && Y.charAt(Q) === "/", I = L != null && (L === O || !o && L.startsWith(O) && L.charAt(O.length) === "/"), ee = {
      isActive: $,
      isPending: I,
      isTransitioning: j
    }, N = $ ? a : void 0, W;
    typeof s == "function" ? W = s(ee) : W = [
      s,
      $ ? "active" : null,
      I ? "pending" : null,
      j ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let te = typeof c == "function" ? c(ee) : c;
    return /* @__PURE__ */ R.createElement(
      is,
      {
        ...m,
        "aria-current": N,
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
var qR = R.forwardRef(
  ({
    discover: n = "render",
    fetcherKey: a,
    navigate: r,
    reloadDocument: s,
    replace: o,
    state: c,
    method: d = Ho,
    action: h,
    onSubmit: p,
    relative: m,
    preventScrollReset: g,
    viewTransition: v,
    unstable_defaultShouldRevalidate: S,
    ...T
  }, E) => {
    let { unstable_useTransitions: C } = R.useContext(Tn), j = XR(), O = FR(h, { relative: m }), Y = d.toLowerCase() === "get" ? "get" : "post", L = typeof h == "string" && ub.test(h), Q = ($) => {
      if (p && p($), $.defaultPrevented) return;
      $.preventDefault();
      let I = $.nativeEvent.submitter, ee = I?.getAttribute("formmethod") || d, N = () => j(I || $.currentTarget, {
        fetcherKey: a,
        method: ee,
        navigate: r,
        replace: o,
        state: c,
        relative: m,
        preventScrollReset: g,
        viewTransition: v,
        unstable_defaultShouldRevalidate: S
      });
      C && r !== !1 ? R.startTransition(() => N()) : N();
    };
    return /* @__PURE__ */ R.createElement(
      "form",
      {
        ref: E,
        method: Y,
        action: O,
        onSubmit: s ? p : Q,
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
function cb(n) {
  let a = R.useContext(Ni);
  return ze(a, YR(n)), a;
}
function kR(n, {
  target: a,
  replace: r,
  unstable_mask: s,
  state: o,
  preventScrollReset: c,
  relative: d,
  viewTransition: h,
  unstable_defaultShouldRevalidate: p,
  unstable_useTransitions: m
} = {}) {
  let g = zi(), v = ma(), S = ns(n, { relative: d });
  return R.useCallback(
    (T) => {
      if (SR(T, a)) {
        T.preventDefault();
        let E = r !== void 0 ? r : Gn(v) === Gn(S), C = () => g(n, {
          replace: E,
          unstable_mask: s,
          state: o,
          preventScrollReset: c,
          relative: d,
          viewTransition: h,
          unstable_defaultShouldRevalidate: p
        });
        m ? R.startTransition(() => C()) : C();
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
      c,
      d,
      h,
      p,
      m
    ]
  );
}
var GR = 0, PR = () => `__${String(++GR)}__`;
function XR() {
  let { router: n } = cb(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = R.useContext(Tn), r = nR(), s = n.fetch, o = n.navigate;
  return R.useCallback(
    async (c, d = {}) => {
      let { action: h, method: p, encType: m, formData: g, body: v } = ER(
        c,
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
  let { basename: r } = R.useContext(Tn), s = R.useContext(ha);
  ze(s, "useFormAction must be used inside a RouteContext");
  let [o] = s.matches.slice(-1), c = { ...ns(n || ".", { relative: a }) }, d = ma();
  if (n == null) {
    c.search = d.search;
    let h = new URLSearchParams(c.search), p = h.getAll("index");
    if (p.some((g) => g === "")) {
      h.delete("index"), p.filter((v) => v).forEach((v) => h.append("index", v));
      let g = h.toString();
      c.search = g ? `?${g}` : "";
    }
  }
  return (!n || n === ".") && o.route.index && (c.search = c.search ? c.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (c.pathname = c.pathname === "/" ? r : bn([r, c.pathname])), Gn(c);
}
function QR(n, { relative: a } = {}) {
  let r = R.useContext(Zd);
  ze(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = cb(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = ns(n, { relative: a });
  if (!r.isTransitioning)
    return !1;
  let c = xn(r.currentLocation.pathname, s) || r.currentLocation.pathname, d = xn(r.nextLocation.pathname, s) || r.nextLocation.pathname;
  return $o(o.pathname, d) != null || $o(o.pathname, c) != null;
}
class Oi extends Error {
  constructor(a, r, s, o) {
    super(s), this.status = a, this.category = r, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const nh = "/api/v1/extensions/nexus.audio.emotiontts";
async function it(n, a) {
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
function KR(n, a, r) {
  const s = n.startsWith("http") ? n : `${nh}${n}`, o = new EventSource(s);
  return o.onmessage = (c) => {
    if (c.data)
      try {
        a(JSON.parse(c.data));
      } catch {
      }
  }, o.onerror = (c) => {
    r?.(c);
  }, () => o.close();
}
async function ZR() {
  return it("/deployments");
}
async function iv(n) {
  return it(`/deployments/${n}`);
}
async function $R(n, a) {
  return it(`/deployments/${n}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function lv(n) {
  return it(`/mappings?deploymentId=${encodeURIComponent(n)}`);
}
async function fb(n, a) {
  return it("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: n })
  });
}
async function IR(n, a) {
  return it(`/mappings/${n}`, {
    method: "PATCH",
    body: JSON.stringify(a)
  });
}
async function JR(n, a) {
  await it(`/mappings/${a}`, { method: "DELETE" });
}
async function WR(n) {
  return it(`/mappings/export?deploymentId=${encodeURIComponent(n)}`);
}
async function eM(n, a, r = "error") {
  return it("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: n, mappings: a, conflictStrategy: r })
  });
}
async function tM(n, a = {}) {
  const r = new URLSearchParams();
  a.limit && r.set("limit", String(a.limit)), a.status && r.set("status", a.status);
  const s = r.toString(), o = s ? `?${s}` : "";
  return it(`/deployments/${n}/runs${o}`);
}
async function nM(n, a) {
  return it(`/deployments/${n}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function ah(n, a) {
  return it(`/deployments/${n}/runs/${a}`);
}
async function aM(n, a) {
  return it(`/deployments/${n}/runs/${a}/cancel`, { method: "POST" });
}
async function ih(n, a) {
  return it(`/deployments/${n}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function iM(n, a) {
  return it(`/deployments/${n}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function rv(n, a, r, s) {
  return KR(
    `/deployments/${n}/runs/${a}/progress`,
    r,
    s
  );
}
async function Jo(n) {
  return it(`/voice-assets?deploymentId=${encodeURIComponent(n)}`);
}
async function lM(n, a, r, s, o) {
  const c = new FormData();
  c.append("deploymentId", n), c.append("displayName", r), c.append("kind", s), c.append("audio", a);
  const d = await fetch(`${nh}/voice-assets`, {
    method: "POST",
    body: c
  });
  if (!d.ok)
    throw new Error(`upload failed: ${d.status}`);
  return await d.json();
}
async function rM(n) {
  return it(`/workflow?deploymentId=${encodeURIComponent(n)}`);
}
var sM = "_93p6291", oM = "_93p6292", uM = "_93p6293", cM = "_93p6294", fM = "_93p6295", dM = "_93p6296", hM = "_93p6297", mM = "_93p6298", pM = "_93p6299", yM = "_93p629a", gM = "_93p629b", vM = "_93p629c", bM = "_93p629d", SM = "_93p629e", xM = "_93p629f", TM = "_93p629g", EM = "_93p629h", RM = "_93p629i";
function MM() {
  const { deployments: n } = as();
  return /* @__PURE__ */ b.jsxs("main", { className: sM, children: [
    /* @__PURE__ */ b.jsxs("header", { className: oM, children: [
      /* @__PURE__ */ b.jsx("p", { className: uM, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ b.jsxs("h1", { className: cM, children: [
        "Direct your characters.",
        /* @__PURE__ */ b.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ b.jsx("p", { className: fM, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." })
    ] }),
    /* @__PURE__ */ b.jsxs("section", { className: dM, children: [
      /* @__PURE__ */ b.jsx("h2", { className: hM, children: "Deployments" }),
      n.length === 0 ? /* @__PURE__ */ b.jsxs("div", { className: SM, children: [
        /* @__PURE__ */ b.jsx("span", { className: xM, "aria-hidden": "true", children: "◈" }),
        /* @__PURE__ */ b.jsx("p", { className: TM, children: "No deployments yet" }),
        /* @__PURE__ */ b.jsx("p", { className: EM, children: "A deployment is a named character-cast that binds voices, presets, and the runtime settings for a script. Create your first one from the host shell." }),
        /* @__PURE__ */ b.jsx("p", { className: RM, children: "Host shell → Extensions → EmotionTTS → New" })
      ] }) : /* @__PURE__ */ b.jsx("ul", { className: mM, children: n.map((a) => /* @__PURE__ */ b.jsx("li", { children: /* @__PURE__ */ b.jsxs(is, { to: `/${a.deploymentId}/recipe`, className: pM, children: [
        /* @__PURE__ */ b.jsx("span", { className: yM, "aria-hidden": "true", children: AM(a.displayName) }),
        /* @__PURE__ */ b.jsxs("span", { children: [
          /* @__PURE__ */ b.jsx("span", { className: gM, children: a.displayName }),
          /* @__PURE__ */ b.jsx("span", { className: vM, children: a.deploymentId })
        ] }),
        /* @__PURE__ */ b.jsx("span", { className: bM, "aria-hidden": "true", children: "→" })
      ] }) }, a.deploymentId)) })
    ] })
  ] });
}
function AM(n) {
  const a = n.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
const CM = "huggingface/IndexTeam/IndexTTS-2";
async function wM(n) {
  const a = await fetch(`/api/v1/model-store/families/${encodeURIComponent(n)}/download`, {
    method: "POST",
    headers: { "content-type": "application/json" }
  });
  if (!a.ok)
    throw new Error(`Model download start failed: ${a.status}`);
  return await a.json();
}
async function DM() {
  return it("/runtime/health");
}
async function jM() {
  await it("/runtime/start", { method: "POST" });
}
async function NM() {
  return it("/runtime/stop", { method: "POST" });
}
async function zM() {
  await it("/runtime/restart", { method: "POST" });
}
function OM(n) {
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
var _M = "g5r6d10", LM = "g5r6d11", VM = "g5r6d12", zr = "g5r6d13", Or = "g5r6d14", UM = "g5r6d15", BM = "g5r6d16", HM = "g5r6d17", $t = "g5r6d18", Xa = "g5r6d19", Wo = "g5r6d1b g5r6d1a", $a = "g5r6d1c g5r6d1a", db = "g5r6d1d g5r6d1a", hb = "g5r6d1e", Kr = "g5r6d1f", gd = "g5r6d1g", qM = "g5r6d1h", YM = "g5r6d1i", Ga = "g5r6d1j", mb = "g5r6d1k", pb = "g5r6d1l g5r6d1k", lh = "g5r6d1m g5r6d1k", rh = "g5r6d1n g5r6d1k";
const kM = 4e3;
function GM({ deployment: n }) {
  const a = zi(), [r, s] = R.useState(null), [o, c] = R.useState(null), [d, h] = R.useState(!1);
  R.useEffect(() => {
    let j = !1;
    const O = async () => {
      try {
        const L = await DM();
        j || (s(L), c(null));
      } catch (L) {
        j || c(_r(L));
      }
    };
    O();
    const Y = setInterval(O, kM);
    return () => {
      j = !0, clearInterval(Y);
    };
  }, []);
  const p = R.useCallback(async () => {
    h(!0), c(null);
    try {
      await jM();
    } catch (j) {
      c(_r(j));
    } finally {
      h(!1);
    }
  }, []), m = R.useCallback(async () => {
    h(!0);
    try {
      await NM();
    } catch (j) {
      c(_r(j));
    } finally {
      h(!1);
    }
  }, []), g = R.useCallback(async () => {
    h(!0);
    try {
      await zM();
    } catch (j) {
      c(_r(j));
    } finally {
      h(!1);
    }
  }, []), v = R.useCallback(async () => {
    h(!0);
    try {
      await wM(CM);
    } catch (j) {
      c(_r(j));
    } finally {
      h(!1);
    }
  }, []), S = r?.badge ?? "not_installed", T = S === "stopped" || S === "not_installed", E = S === "ready" || S === "running" || S === "starting", C = o?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ b.jsxs("div", { className: Xa, role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ b.jsx("span", { className: $t, children: "Runtime" }),
    /* @__PURE__ */ b.jsx("span", { children: n.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ b.jsx("span", { className: $t, children: "Badge" }),
    /* @__PURE__ */ b.jsx("span", { className: PM(S), children: OM(S) }),
    r && /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
      /* @__PURE__ */ b.jsx("span", { className: $t, children: "Uptime" }),
      /* @__PURE__ */ b.jsx("span", { children: XM(r.uptimeSeconds) }),
      /* @__PURE__ */ b.jsx("span", { className: $t, children: "VRAM" }),
      /* @__PURE__ */ b.jsxs("span", { children: [
        r.vramUsedMb,
        " / ",
        r.vramTotalMb,
        " MB"
      ] })
    ] }),
    T && /* @__PURE__ */ b.jsx("button", { type: "button", className: Wo, disabled: d, onClick: p, children: "Install / Start runtime" }),
    E && /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
      /* @__PURE__ */ b.jsx("button", { type: "button", className: db, disabled: d, onClick: m, children: "Stop backend" }),
      /* @__PURE__ */ b.jsx("button", { type: "button", className: $a, disabled: d, onClick: g, children: "Restart" })
    ] }),
    C && /* @__PURE__ */ b.jsx("button", { type: "button", className: Wo, disabled: d, onClick: v, children: "Download IndexTTS-2 model" }),
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
    o && !C && /* @__PURE__ */ b.jsx("span", { className: Kr, children: o })
  ] });
}
function PM(n) {
  switch (n) {
    case "ready":
    case "running":
      return pb;
    case "starting":
    case "stopping":
    case "installing":
      return lh;
    case "failed":
      return rh;
    default:
      return mb;
  }
}
function XM(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60);
  return a < 60 ? `${a}m ${n % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function _r(n) {
  return n instanceof Oi || n instanceof Error ? n.message : "unknown error";
}
async function FM(n) {
  return it(`/presets?deploymentId=${encodeURIComponent(n)}`);
}
async function QM(n, a, r) {
  return it("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: n, presetName: a, vector: r })
  });
}
async function KM(n) {
  await it(`/presets/${n}`, { method: "DELETE" });
}
var ZM = "wfqeb50", $M = "wfqeb51", IM = "wfqeb52", JM = "wfqeb53", WM = "wfqeb54", eA = "wfqeb55 wfqeb54", tA = "wfqeb56", nA = "wfqeb57", yb = "wfqeb58", gb = "wfqeb59", vb = "wfqeb5a", aA = "wfqeb5b", iA = "wfqeb5c", sv = "wfqeb5d", lA = "wfqeb5e wfqeb5d", rA = "wfqeb5f wfqeb5d", sA = "wfqeb5g", oA = "wfqeb5h", Xf = "wfqeb5i", uA = "wfqeb5j", cA = "wfqeb5k", fA = "wfqeb5l", dA = "wfqeb5m";
const sh = R.createContext({});
function oh(n) {
  const a = R.useRef(null);
  return a.current === null && (a.current = n()), a.current;
}
const hA = typeof window < "u", bb = hA ? R.useLayoutEffect : R.useEffect, yu = /* @__PURE__ */ R.createContext(null);
function uh(n, a) {
  n.indexOf(a) === -1 && n.push(a);
}
function eu(n, a) {
  const r = n.indexOf(a);
  r > -1 && n.splice(r, 1);
}
const Pn = (n, a, r) => r > a ? a : r < n ? n : r;
function ov(n, a) {
  return a ? `${n}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : n;
}
let ls = () => {
}, ji = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (ls = (n, a, r) => {
  !n && typeof console < "u" && console.warn(ov(a, r));
}, ji = (n, a, r) => {
  if (!n)
    throw new Error(ov(a, r));
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
const Sn = /* @__NO_SIDE_EFFECTS__ */ (n) => n, mA = (n, a) => (r) => a(n(r)), rs = (...n) => n.reduce(mA), Zr = /* @__NO_SIDE_EFFECTS__ */ (n, a, r) => {
  const s = a - n;
  return s === 0 ? 1 : (r - n) / s;
};
class ch {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return uh(this.subscriptions, a), () => eu(this.subscriptions, a);
  }
  notify(a, r, s) {
    const o = this.subscriptions.length;
    if (o)
      if (o === 1)
        this.subscriptions[0](a, r, s);
      else
        for (let c = 0; c < o; c++) {
          const d = this.subscriptions[c];
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
const Mb = (n, a, r) => (((1 - 3 * r + 3 * a) * n + (3 * r - 6 * a)) * n + 3 * a) * n, pA = 1e-7, yA = 12;
function gA(n, a, r, s, o) {
  let c, d, h = 0;
  do
    d = a + (r - a) / 2, c = Mb(d, s, o) - n, c > 0 ? r = d : a = d;
  while (Math.abs(c) > pA && ++h < yA);
  return d;
}
function ss(n, a, r, s) {
  if (n === a && r === s)
    return Sn;
  const o = (c) => gA(c, 0, 1, n, r);
  return (c) => c === 0 || c === 1 ? c : Mb(o(c), a, s);
}
const Ab = (n) => (a) => a <= 0.5 ? n(2 * a) / 2 : (2 - n(2 * (1 - a))) / 2, Cb = (n) => (a) => 1 - n(1 - a), wb = /* @__PURE__ */ ss(0.33, 1.53, 0.69, 0.99), fh = /* @__PURE__ */ Cb(wb), Db = /* @__PURE__ */ Ab(fh), jb = (n) => n >= 1 ? 1 : (n *= 2) < 1 ? 0.5 * fh(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))), dh = (n) => 1 - Math.sin(Math.acos(n)), Nb = Cb(dh), zb = Ab(dh), vA = /* @__PURE__ */ ss(0.42, 0, 1, 1), bA = /* @__PURE__ */ ss(0, 0, 0.58, 1), Ob = /* @__PURE__ */ ss(0.42, 0, 0.58, 1), SA = (n) => Array.isArray(n) && typeof n[0] != "number", _b = (n) => Array.isArray(n) && typeof n[0] == "number", uv = {
  linear: Sn,
  easeIn: vA,
  easeInOut: Ob,
  easeOut: bA,
  circIn: dh,
  circInOut: zb,
  circOut: Nb,
  backIn: fh,
  backInOut: Db,
  backOut: wb,
  anticipate: jb
}, xA = (n) => typeof n == "string", cv = (n) => {
  if (_b(n)) {
    ji(n.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, r, s, o] = n;
    return ss(a, r, s, o);
  } else if (xA(n))
    return ji(uv[n] !== void 0, `Invalid easing type '${n}'`, "invalid-easing-type"), uv[n];
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
function TA(n, a) {
  let r = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), o = !1, c = !1;
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
      const E = S && o ? r : s;
      return v && d.add(g), E.add(g), g;
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
        c = !0;
        return;
      }
      o = !0;
      const v = r;
      r = s, s = v, r.forEach(p), r.clear(), o = !1, c && (c = !1, m.process(g));
    }
  };
  return m;
}
const EA = 40;
function Lb(n, a) {
  let r = !1, s = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, c = () => r = !0, d = zo.reduce((L, Q) => (L[Q] = TA(c), L), {}), { setup: h, read: p, resolveKeyframes: m, preUpdate: g, update: v, preRender: S, render: T, postRender: E } = d, C = () => {
    const L = Ia.useManualTiming, Q = L ? o.timestamp : performance.now();
    r = !1, L || (o.delta = s ? 1e3 / 60 : Math.max(Math.min(Q - o.timestamp, EA), 1)), o.timestamp = Q, o.isProcessing = !0, h.process(o), p.process(o), m.process(o), g.process(o), v.process(o), S.process(o), T.process(o), E.process(o), o.isProcessing = !1, r && a && (s = !1, n(C));
  }, j = () => {
    r = !0, s = !0, o.isProcessing || n(C);
  };
  return { schedule: zo.reduce((L, Q) => {
    const $ = d[Q];
    return L[Q] = (I, ee = !1, N = !1) => (r || j(), $.schedule(I, ee, N)), L;
  }, {}), cancel: (L) => {
    for (let Q = 0; Q < zo.length; Q++)
      d[zo[Q]].cancel(L);
  }, state: o, steps: d };
}
const { schedule: Je, cancel: Ja, state: zt, steps: Ff } = /* @__PURE__ */ Lb(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Sn, !0);
let Yo;
function RA() {
  Yo = void 0;
}
const Yt = {
  now: () => (Yo === void 0 && Yt.set(zt.isProcessing || Ia.useManualTiming ? zt.timestamp : performance.now()), Yo),
  set: (n) => {
    Yo = n, queueMicrotask(RA);
  }
}, Vb = (n) => (a) => typeof a == "string" && a.startsWith(n), Ub = /* @__PURE__ */ Vb("--"), MA = /* @__PURE__ */ Vb("var(--"), hh = (n) => MA(n) ? AA.test(n.split("/*")[0].trim()) : !1, AA = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function fv(n) {
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
}, kr = (n) => Math.round(n * 1e5) / 1e5, mh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function CA(n) {
  return n == null;
}
const wA = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, ph = (n, a) => (r) => !!(typeof r == "string" && wA.test(r) && r.startsWith(n) || a && !CA(r) && Object.prototype.hasOwnProperty.call(r, a)), Bb = (n, a, r) => (s) => {
  if (typeof s != "string")
    return s;
  const [o, c, d, h] = s.match(mh);
  return {
    [n]: parseFloat(o),
    [a]: parseFloat(c),
    [r]: parseFloat(d),
    alpha: h !== void 0 ? parseFloat(h) : 1
  };
}, DA = (n) => Pn(0, 255, n), Qf = {
  ...Nl,
  transform: (n) => Math.round(DA(n))
}, Ai = {
  test: /* @__PURE__ */ ph("rgb", "red"),
  parse: /* @__PURE__ */ Bb("red", "green", "blue"),
  transform: ({ red: n, green: a, blue: r, alpha: s = 1 }) => "rgba(" + Qf.transform(n) + ", " + Qf.transform(a) + ", " + Qf.transform(r) + ", " + kr($r.transform(s)) + ")"
};
function jA(n) {
  let a = "", r = "", s = "", o = "";
  return n.length > 5 ? (a = n.substring(1, 3), r = n.substring(3, 5), s = n.substring(5, 7), o = n.substring(7, 9)) : (a = n.substring(1, 2), r = n.substring(2, 3), s = n.substring(3, 4), o = n.substring(4, 5), a += a, r += r, s += s, o += o), {
    red: parseInt(a, 16),
    green: parseInt(r, 16),
    blue: parseInt(s, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const vd = {
  test: /* @__PURE__ */ ph("#"),
  parse: jA,
  transform: Ai.transform
}, os = /* @__NO_SIDE_EFFECTS__ */ (n) => ({
  test: (a) => typeof a == "string" && a.endsWith(n) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${n}`
}), Pa = /* @__PURE__ */ os("deg"), kn = /* @__PURE__ */ os("%"), ye = /* @__PURE__ */ os("px"), NA = /* @__PURE__ */ os("vh"), zA = /* @__PURE__ */ os("vw"), dv = {
  ...kn,
  parse: (n) => kn.parse(n) / 100,
  transform: (n) => kn.transform(n * 100)
}, Rl = {
  test: /* @__PURE__ */ ph("hsl", "hue"),
  parse: /* @__PURE__ */ Bb("hue", "saturation", "lightness"),
  transform: ({ hue: n, saturation: a, lightness: r, alpha: s = 1 }) => "hsla(" + Math.round(n) + ", " + kn.transform(kr(a)) + ", " + kn.transform(kr(r)) + ", " + kr($r.transform(s)) + ")"
}, xt = {
  test: (n) => Ai.test(n) || vd.test(n) || Rl.test(n),
  parse: (n) => Ai.test(n) ? Ai.parse(n) : Rl.test(n) ? Rl.parse(n) : vd.parse(n),
  transform: (n) => typeof n == "string" ? n : n.hasOwnProperty("red") ? Ai.transform(n) : Rl.transform(n),
  getAnimatableNone: (n) => {
    const a = xt.parse(n);
    return a.alpha = 0, xt.transform(a);
  }
}, OA = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function _A(n) {
  return isNaN(n) && typeof n == "string" && (n.match(mh)?.length || 0) + (n.match(OA)?.length || 0) > 0;
}
const Hb = "number", qb = "color", LA = "var", VA = "var(", hv = "${}", UA = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Dl(n) {
  const a = n.toString(), r = [], s = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let c = 0;
  const h = a.replace(UA, (p) => (xt.test(p) ? (s.color.push(c), o.push(qb), r.push(xt.parse(p))) : p.startsWith(VA) ? (s.var.push(c), o.push(LA), r.push(p)) : (s.number.push(c), o.push(Hb), r.push(parseFloat(p))), ++c, hv)).split(hv);
  return { values: r, split: h, indexes: s, types: o };
}
function BA(n) {
  return Dl(n).values;
}
function Yb({ split: n, types: a }) {
  const r = n.length;
  return (s) => {
    let o = "";
    for (let c = 0; c < r; c++)
      if (o += n[c], s[c] !== void 0) {
        const d = a[c];
        d === Hb ? o += kr(s[c]) : d === qb ? o += xt.transform(s[c]) : o += s[c];
      }
    return o;
  };
}
function HA(n) {
  return Yb(Dl(n));
}
const qA = (n) => typeof n == "number" ? 0 : xt.test(n) ? xt.getAnimatableNone(n) : n, YA = (n, a) => typeof n == "number" ? a?.trim().endsWith("/") ? n : 0 : qA(n);
function kA(n) {
  const a = Dl(n);
  return Yb(a)(a.values.map((s, o) => YA(s, a.split[o])));
}
const Nn = {
  test: _A,
  parse: BA,
  createTransformer: HA,
  getAnimatableNone: kA
};
function Kf(n, a, r) {
  return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? n + (a - n) * 6 * r : r < 1 / 2 ? a : r < 2 / 3 ? n + (a - n) * (2 / 3 - r) * 6 : n;
}
function GA({ hue: n, saturation: a, lightness: r, alpha: s }) {
  n /= 360, a /= 100, r /= 100;
  let o = 0, c = 0, d = 0;
  if (!a)
    o = c = d = r;
  else {
    const h = r < 0.5 ? r * (1 + a) : r + a - r * a, p = 2 * r - h;
    o = Kf(p, h, n + 1 / 3), c = Kf(p, h, n), d = Kf(p, h, n - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(c * 255),
    blue: Math.round(d * 255),
    alpha: s
  };
}
function tu(n, a) {
  return (r) => r > 0 ? a : n;
}
const at = (n, a, r) => n + (a - n) * r, Zf = (n, a, r) => {
  const s = n * n, o = r * (a * a - s) + s;
  return o < 0 ? 0 : Math.sqrt(o);
}, PA = [vd, Ai, Rl], XA = (n) => PA.find((a) => a.test(n));
function mv(n) {
  const a = XA(n);
  if (ls(!!a, `'${n}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let r = a.parse(n);
  return a === Rl && (r = GA(r)), r;
}
const pv = (n, a) => {
  const r = mv(n), s = mv(a);
  if (!r || !s)
    return tu(n, a);
  const o = { ...r };
  return (c) => (o.red = Zf(r.red, s.red, c), o.green = Zf(r.green, s.green, c), o.blue = Zf(r.blue, s.blue, c), o.alpha = at(r.alpha, s.alpha, c), Ai.transform(o));
}, bd = /* @__PURE__ */ new Set(["none", "hidden"]);
function FA(n, a) {
  return bd.has(n) ? (r) => r <= 0 ? n : a : (r) => r >= 1 ? a : n;
}
function QA(n, a) {
  return (r) => at(n, a, r);
}
function yh(n) {
  return typeof n == "number" ? QA : typeof n == "string" ? hh(n) ? tu : xt.test(n) ? pv : $A : Array.isArray(n) ? kb : typeof n == "object" ? xt.test(n) ? pv : KA : tu;
}
function kb(n, a) {
  const r = [...n], s = r.length, o = n.map((c, d) => yh(c)(c, a[d]));
  return (c) => {
    for (let d = 0; d < s; d++)
      r[d] = o[d](c);
    return r;
  };
}
function KA(n, a) {
  const r = { ...n, ...a }, s = {};
  for (const o in r)
    n[o] !== void 0 && a[o] !== void 0 && (s[o] = yh(n[o])(n[o], a[o]));
  return (o) => {
    for (const c in s)
      r[c] = s[c](o);
    return r;
  };
}
function ZA(n, a) {
  const r = [], s = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const c = a.types[o], d = n.indexes[c][s[c]], h = n.values[d] ?? 0;
    r[o] = h, s[c]++;
  }
  return r;
}
const $A = (n, a) => {
  const r = Nn.createTransformer(a), s = Dl(n), o = Dl(a);
  return s.indexes.var.length === o.indexes.var.length && s.indexes.color.length === o.indexes.color.length && s.indexes.number.length >= o.indexes.number.length ? bd.has(n) && !o.values.length || bd.has(a) && !s.values.length ? FA(n, a) : rs(kb(ZA(s, o), o.values), r) : (ls(!0, `Complex values '${n}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), tu(n, a));
};
function Gb(n, a, r) {
  return typeof n == "number" && typeof a == "number" && typeof r == "number" ? at(n, a, r) : yh(n)(n, a);
}
const IA = (n) => {
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
  for (let c = 0; c < o; c++)
    s += Math.round(n(c / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, nu = 2e4;
function gh(n) {
  let a = 0;
  const r = 50;
  let s = n.next(a);
  for (; !s.done && a < nu; )
    a += r, s = n.next(a);
  return a >= nu ? 1 / 0 : a;
}
function JA(n, a = 100, r) {
  const s = r({ ...n, keyframes: [0, a] }), o = Math.min(gh(s), nu);
  return {
    type: "keyframes",
    ease: (c) => s.next(o * c).value / a,
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
const WA = 12;
function eC(n, a, r) {
  let s = r;
  for (let o = 1; o < WA; o++)
    s = s - n(s) / a(s);
  return s;
}
const $f = 1e-3;
function tC({ duration: n = st.duration, bounce: a = st.bounce, velocity: r = st.velocity, mass: s = st.mass }) {
  let o, c;
  ls(n <= /* @__PURE__ */ It(st.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let d = 1 - a;
  d = Pn(st.minDamping, st.maxDamping, d), n = Pn(st.minDuration, st.maxDuration, /* @__PURE__ */ vn(n)), d < 1 ? (o = (m) => {
    const g = m * d, v = g * n, S = g - r, T = Sd(m, d), E = Math.exp(-v);
    return $f - S / T * E;
  }, c = (m) => {
    const v = m * d * n, S = v * r + r, T = Math.pow(d, 2) * Math.pow(m, 2) * n, E = Math.exp(-v), C = Sd(Math.pow(m, 2), d);
    return (-o(m) + $f > 0 ? -1 : 1) * ((S - T) * E) / C;
  }) : (o = (m) => {
    const g = Math.exp(-m * n), v = (m - r) * n + 1;
    return -$f + g * v;
  }, c = (m) => {
    const g = Math.exp(-m * n), v = (r - m) * (n * n);
    return g * v;
  });
  const h = 5 / n, p = eC(o, c, h);
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
const nC = ["duration", "bounce"], aC = ["stiffness", "damping", "mass"];
function yv(n, a) {
  return a.some((r) => n[r] !== void 0);
}
function iC(n) {
  let a = {
    velocity: st.velocity,
    stiffness: st.stiffness,
    damping: st.damping,
    mass: st.mass,
    isResolvedFromDuration: !1,
    ...n
  };
  if (!yv(n, aC) && yv(n, nC))
    if (a.velocity = 0, n.visualDuration) {
      const r = n.visualDuration, s = 2 * Math.PI / (r * 1.2), o = s * s, c = 2 * Pn(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: st.mass,
        stiffness: o,
        damping: c
      };
    } else {
      const r = tC({ ...n, velocity: 0 });
      a = {
        ...a,
        ...r,
        mass: st.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function au(n = st.visualDuration, a = st.bounce) {
  const r = typeof n != "object" ? {
    visualDuration: n,
    keyframes: [0, 1],
    bounce: a
  } : n;
  let { restSpeed: s, restDelta: o } = r;
  const c = r.keyframes[0], d = r.keyframes[r.keyframes.length - 1], h = { done: !1, value: c }, { stiffness: p, damping: m, mass: g, duration: v, velocity: S, isResolvedFromDuration: T } = iC({
    ...r,
    velocity: -/* @__PURE__ */ vn(r.velocity || 0)
  }), E = S || 0, C = m / (2 * Math.sqrt(p * g)), j = d - c, O = /* @__PURE__ */ vn(Math.sqrt(p / g)), Y = Math.abs(j) < 5;
  s || (s = Y ? st.restSpeed.granular : st.restSpeed.default), o || (o = Y ? st.restDelta.granular : st.restDelta.default);
  let L, Q, $, I, ee, N;
  if (C < 1)
    $ = Sd(O, C), I = (E + C * O * j) / $, L = (te) => {
      const P = Math.exp(-C * O * te);
      return d - P * (I * Math.sin($ * te) + j * Math.cos($ * te));
    }, ee = C * O * I + j * $, N = C * O * j - I * $, Q = (te) => Math.exp(-C * O * te) * (ee * Math.sin($ * te) + N * Math.cos($ * te));
  else if (C === 1) {
    L = (P) => d - Math.exp(-O * P) * (j + (E + O * j) * P);
    const te = E + O * j;
    Q = (P) => Math.exp(-O * P) * (O * te * P - E);
  } else {
    const te = O * Math.sqrt(C * C - 1);
    L = (de) => {
      const se = Math.exp(-C * O * de), B = Math.min(te * de, 300);
      return d - se * ((E + C * O * j) * Math.sinh(B) + te * j * Math.cosh(B)) / te;
    };
    const P = (E + C * O * j) / te, G = C * O * P - j * te, le = C * O * j - P * te;
    Q = (de) => {
      const se = Math.exp(-C * O * de), B = Math.min(te * de, 300);
      return se * (G * Math.sinh(B) + le * Math.cosh(B));
    };
  }
  const W = {
    calculatedDuration: T && v || null,
    velocity: (te) => /* @__PURE__ */ It(Q(te)),
    next: (te) => {
      if (!T && C < 1) {
        const G = Math.exp(-C * O * te), le = Math.sin($ * te), de = Math.cos($ * te), se = d - G * (I * le + j * de), B = /* @__PURE__ */ It(G * (ee * le + N * de));
        return h.done = Math.abs(B) <= s && Math.abs(d - se) <= o, h.value = h.done ? d : se, h;
      }
      const P = L(te);
      if (T)
        h.done = te >= v;
      else {
        const G = /* @__PURE__ */ It(Q(te));
        h.done = Math.abs(G) <= s && Math.abs(d - P) <= o;
      }
      return h.value = h.done ? d : P, h;
    },
    toString: () => {
      const te = Math.min(gh(W), nu), P = Pb((G) => W.next(te * G).value, te, 30);
      return te + "ms " + P;
    },
    toTransition: () => {
    }
  };
  return W;
}
au.applyToOptions = (n) => {
  const a = JA(n, 100, au);
  return n.ease = a.ease, n.duration = /* @__PURE__ */ It(a.duration), n.type = "keyframes", n;
};
const lC = 5;
function Xb(n, a, r) {
  const s = Math.max(a - lC, 0);
  return Rb(r - n(s), a - s);
}
function xd({ keyframes: n, velocity: a = 0, power: r = 0.8, timeConstant: s = 325, bounceDamping: o = 10, bounceStiffness: c = 500, modifyTarget: d, min: h, max: p, restDelta: m = 0.5, restSpeed: g }) {
  const v = n[0], S = {
    done: !1,
    value: v
  }, T = (N) => h !== void 0 && N < h || p !== void 0 && N > p, E = (N) => h === void 0 ? p : p === void 0 || Math.abs(h - N) < Math.abs(p - N) ? h : p;
  let C = r * a;
  const j = v + C, O = d === void 0 ? j : d(j);
  O !== j && (C = O - v);
  const Y = (N) => -C * Math.exp(-N / s), L = (N) => O + Y(N), Q = (N) => {
    const W = Y(N), te = L(N);
    S.done = Math.abs(W) <= m, S.value = S.done ? O : te;
  };
  let $, I;
  const ee = (N) => {
    T(S.value) && ($ = N, I = au({
      keyframes: [S.value, E(S.value)],
      velocity: Xb(L, N, S.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: c,
      restDelta: m,
      restSpeed: g
    }));
  };
  return ee(0), {
    calculatedDuration: null,
    next: (N) => {
      let W = !1;
      return !I && $ === void 0 && (W = !0, Q(N), ee(N)), $ !== void 0 && N >= $ ? I.next(N - $) : (!W && Q(N), S);
    }
  };
}
function rC(n, a, r) {
  const s = [], o = r || Ia.mix || Gb, c = n.length - 1;
  for (let d = 0; d < c; d++) {
    let h = o(n[d], n[d + 1]);
    if (a) {
      const p = Array.isArray(a) ? a[d] || Sn : a;
      h = rs(p, h);
    }
    s.push(h);
  }
  return s;
}
function sC(n, a, { clamp: r = !0, ease: s, mixer: o } = {}) {
  const c = n.length;
  if (ji(c === a.length, "Both input and output ranges must be the same length", "range-length"), c === 1)
    return () => a[0];
  if (c === 2 && a[0] === a[1])
    return () => a[1];
  const d = n[0] === n[1];
  n[0] > n[c - 1] && (n = [...n].reverse(), a = [...a].reverse());
  const h = rC(a, s, o), p = h.length, m = (g) => {
    if (d && g < n[0])
      return a[0];
    let v = 0;
    if (p > 1)
      for (; v < n.length - 2 && !(g < n[v + 1]); v++)
        ;
    const S = /* @__PURE__ */ Zr(n[v], n[v + 1], g);
    return h[v](S);
  };
  return r ? (g) => m(Pn(n[0], n[c - 1], g)) : m;
}
function oC(n, a) {
  const r = n[n.length - 1];
  for (let s = 1; s <= a; s++) {
    const o = /* @__PURE__ */ Zr(0, a, s);
    n.push(at(r, 1, o));
  }
}
function uC(n) {
  const a = [0];
  return oC(a, n.length - 1), a;
}
function cC(n, a) {
  return n.map((r) => r * a);
}
function fC(n, a) {
  return n.map(() => a || Ob).splice(0, n.length - 1);
}
function Gr({ duration: n = 300, keyframes: a, times: r, ease: s = "easeInOut" }) {
  const o = SA(s) ? s.map(cv) : cv(s), c = {
    done: !1,
    value: a[0]
  }, d = cC(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    r && r.length === a.length ? r : uC(a),
    n
  ), h = sC(d, a, {
    ease: Array.isArray(o) ? o : fC(a, o)
  });
  return {
    calculatedDuration: n,
    next: (p) => (c.value = h(p), c.done = p >= n, c)
  };
}
const dC = (n) => n !== null;
function gu(n, { repeat: a, repeatType: r = "loop" }, s, o = 1) {
  const c = n.filter(dC), h = o < 0 || a && r !== "loop" && a % 2 === 1 ? 0 : c.length - 1;
  return !h || s === void 0 ? c[h] : s;
}
const hC = {
  decay: xd,
  inertia: xd,
  tween: Gr,
  keyframes: Gr,
  spring: au
};
function Fb(n) {
  typeof n.type == "string" && (n.type = hC[n.type]);
}
class vh {
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
const mC = (n) => n / 100;
class iu extends vh {
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
    const { type: r = Gr, repeat: s = 0, repeatDelay: o = 0, repeatType: c, velocity: d = 0 } = a;
    let { keyframes: h } = a;
    const p = r || Gr;
    p !== Gr && typeof h[0] != "number" && (this.mixKeyframes = rs(mC, Gb(h[0], h[1])), h = [0, 100]);
    const m = p({ ...a, keyframes: h });
    c === "mirror" && (this.mirroredGenerator = p({
      ...a,
      keyframes: [...h].reverse(),
      velocity: -d
    })), m.calculatedDuration === null && (m.calculatedDuration = gh(m));
    const { calculatedDuration: g } = m;
    this.calculatedDuration = g, this.resolvedDuration = g + o, this.totalDuration = this.resolvedDuration * (s + 1) - o, this.generator = m;
  }
  updateTime(a) {
    const r = Math.round(a - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = r;
  }
  tick(a, r = !1) {
    const { generator: s, totalDuration: o, mixKeyframes: c, mirroredGenerator: d, resolvedDuration: h, calculatedDuration: p } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: m = 0, keyframes: g, repeat: v, repeatType: S, repeatDelay: T, type: E, onUpdate: C, finalKeyframe: j } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), r ? this.currentTime = a : this.updateTime(a);
    const O = this.currentTime - m * (this.playbackSpeed >= 0 ? 1 : -1), Y = this.playbackSpeed >= 0 ? O < 0 : O > o;
    this.currentTime = Math.max(O, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let L = this.currentTime, Q = s;
    if (v) {
      const N = Math.min(this.currentTime, o) / h;
      let W = Math.floor(N), te = N % 1;
      !te && N >= 1 && (te = 1), te === 1 && W--, W = Math.min(W, v + 1), !!(W % 2) && (S === "reverse" ? (te = 1 - te, T && (te -= T / h)) : S === "mirror" && (Q = d)), L = Pn(0, 1, te) * h;
    }
    let $;
    Y ? (this.delayState.value = g[0], $ = this.delayState) : $ = Q.next(L), c && !Y && ($.value = c($.value));
    let { done: I } = $;
    !Y && p !== null && (I = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const ee = this.holdTime === null && (this.state === "finished" || this.state === "running" && I);
    return ee && E !== xd && ($.value = gu(g, this.options, j, this.speed)), C && C($.value), ee && this.finish(), $;
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
    const { driver: a = IA, startTime: r } = this.options;
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
function pC(n) {
  for (let a = 1; a < n.length; a++)
    n[a] ?? (n[a] = n[a - 1]);
}
const Ci = (n) => n * 180 / Math.PI, Td = (n) => {
  const a = Ci(Math.atan2(n[1], n[0]));
  return Ed(a);
}, yC = {
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
}, Ed = (n) => (n = n % 360, n < 0 && (n += 360), n), gv = Td, vv = (n) => Math.sqrt(n[0] * n[0] + n[1] * n[1]), bv = (n) => Math.sqrt(n[4] * n[4] + n[5] * n[5]), gC = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: vv,
  scaleY: bv,
  scale: (n) => (vv(n) + bv(n)) / 2,
  rotateX: (n) => Ed(Ci(Math.atan2(n[6], n[5]))),
  rotateY: (n) => Ed(Ci(Math.atan2(-n[2], n[0]))),
  rotateZ: gv,
  rotate: gv,
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
    s = gC, o = r;
  else {
    const h = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = yC, o = h;
  }
  if (!o)
    return Rd(a);
  const c = s[a], d = o[1].split(",").map(bC);
  return typeof c == "function" ? c(d) : d[c];
}
const vC = (n, a) => {
  const { transform: r = "none" } = getComputedStyle(n);
  return Md(r, a);
};
function bC(n) {
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
], Ol = new Set(zl), Sv = (n) => n === Nl || n === ye, SC = /* @__PURE__ */ new Set(["x", "y", "z"]), xC = zl.filter((n) => !SC.has(n));
function TC(n) {
  const a = [];
  return xC.forEach((r) => {
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
function Qb() {
  if (Cd) {
    const n = Array.from(wi).filter((s) => s.needsMeasurement), a = new Set(n.map((s) => s.element)), r = /* @__PURE__ */ new Map();
    a.forEach((s) => {
      const o = TC(s);
      o.length && (r.set(s, o), s.render());
    }), n.forEach((s) => s.measureInitialState()), a.forEach((s) => {
      s.render();
      const o = r.get(s);
      o && o.forEach(([c, d]) => {
        s.getValue(c)?.set(d);
      });
    }), n.forEach((s) => s.measureEndState()), n.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  Cd = !1, Ad = !1, wi.forEach((n) => n.complete(wd)), wi.clear();
}
function Kb() {
  wi.forEach((n) => {
    n.readKeyframes(), n.needsMeasurement && (Cd = !0);
  });
}
function EC() {
  wd = !0, Kb(), Qb(), wd = !1;
}
class bh {
  constructor(a, r, s, o, c, d = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = r, this.name = s, this.motionValue = o, this.element = c, this.isAsync = d;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (wi.add(this), Ad || (Ad = !0, Je.read(Kb), Je.resolveKeyframes(Qb))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, name: r, element: s, motionValue: o } = this;
    if (a[0] === null) {
      const c = o?.get(), d = a[a.length - 1];
      if (c !== void 0)
        a[0] = c;
      else if (s && r) {
        const h = s.readValue(r, d);
        h != null && (a[0] = h);
      }
      a[0] === void 0 && (a[0] = d), o && c === void 0 && o.set(a[0]);
    }
    pC(a);
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
const RC = (n) => n.startsWith("--");
function Zb(n, a, r) {
  RC(a) ? n.style.setProperty(a, r) : n.style[a] = r;
}
const MC = {};
function $b(n, a) {
  const r = /* @__PURE__ */ Eb(n);
  return () => MC[a] ?? r();
}
const AC = /* @__PURE__ */ $b(() => window.ScrollTimeline !== void 0, "scrollTimeline"), Ib = /* @__PURE__ */ $b(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), qr = ([n, a, r, s]) => `cubic-bezier(${n}, ${a}, ${r}, ${s})`, xv = {
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
    return typeof n == "function" ? Ib() ? Pb(n, a) : "ease-out" : _b(n) ? qr(n) : Array.isArray(n) ? n.map((r) => Jb(r, a) || xv.easeOut) : xv[n];
}
function CC(n, a, r, { delay: s = 0, duration: o = 300, repeat: c = 0, repeatType: d = "loop", ease: h = "easeOut", times: p } = {}, m = void 0) {
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
    iterations: c + 1,
    direction: d === "reverse" ? "alternate" : "normal"
  };
  return m && (S.pseudoElement = m), n.animate(g, S);
}
function Wb(n) {
  return typeof n == "function" && "applyToOptions" in n;
}
function wC({ type: n, ...a }) {
  return Wb(n) && Ib() ? n.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class eS extends vh {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: r, name: s, keyframes: o, pseudoElement: c, allowFlatten: d = !1, finalKeyframe: h, onComplete: p } = a;
    this.isPseudoElement = !!c, this.allowFlatten = d, this.options = a, ji(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const m = wC(a);
    this.animation = CC(r, s, o, m, c), m.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !c) {
        const g = gu(o, this.options, h, this.speed);
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && AC() ? (this.animation.timeline = a, r && (this.animation.rangeStart = r), s && (this.animation.rangeEnd = s), Sn) : o(this);
  }
}
const tS = {
  anticipate: jb,
  backInOut: Db,
  circInOut: zb
};
function DC(n) {
  return n in tS;
}
function jC(n) {
  typeof n.ease == "string" && DC(n.ease) && (n.ease = tS[n.ease]);
}
const If = 10;
class NC extends eS {
  constructor(a) {
    jC(a), Fb(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const { motionValue: r, onUpdate: s, onComplete: o, element: c, ...d } = this.options;
    if (!r)
      return;
    if (a !== void 0) {
      r.set(a);
      return;
    }
    const h = new iu({
      ...d,
      autoplay: !1
    }), p = Math.max(If, Yt.now() - this.startTime), m = Pn(0, If, p - If), g = h.sample(p).value, { name: v } = this.options;
    c && v && Zb(c, v, g), r.setWithVelocity(h.sample(Math.max(0, p - m)).value, g, m), h.stop();
  }
}
const Tv = (n, a) => a === "zIndex" ? !1 : !!(typeof n == "number" || Array.isArray(n) || typeof n == "string" && // It's animatable if we have a string
(Nn.test(n) || n === "0") && // And it contains numbers and/or colors
!n.startsWith("url("));
function zC(n) {
  const a = n[0];
  if (n.length === 1)
    return !0;
  for (let r = 0; r < n.length; r++)
    if (n[r] !== a)
      return !0;
}
function OC(n, a, r, s) {
  const o = n[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const c = n[n.length - 1], d = Tv(o, a), h = Tv(c, a);
  return ls(d === h, `You are trying to animate ${a} from "${o}" to "${c}". "${d ? c : o}" is not an animatable value.`, "value-not-animatable"), !d || !h ? !1 : zC(n) || (r === "spring" || Wb(r)) && s;
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
]), _C = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function LC(n) {
  for (let a = 0; a < n.length; a++)
    if (typeof n[a] == "string" && _C.test(n[a]))
      return !0;
  return !1;
}
const VC = /* @__PURE__ */ new Set([
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
]), UC = /* @__PURE__ */ Eb(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function BC(n) {
  const { motionValue: a, name: r, repeatDelay: s, repeatType: o, damping: c, type: d, keyframes: h } = n;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: m, transformTemplate: g } = a.owner.getProps();
  return UC() && r && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (nS.has(r) || VC.has(r) && LC(h)) && (r !== "transform" || !g) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !m && !s && o !== "mirror" && c !== 0 && d !== "inertia";
}
const HC = 40;
class qC extends vh {
  constructor({ autoplay: a = !0, delay: r = 0, type: s = "keyframes", repeat: o = 0, repeatDelay: c = 0, repeatType: d = "loop", keyframes: h, name: p, motionValue: m, element: g, ...v }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = Yt.now();
    const S = {
      autoplay: a,
      delay: r,
      type: s,
      repeat: o,
      repeatDelay: c,
      repeatType: d,
      name: p,
      motionValue: m,
      element: g,
      ...v
    }, T = g?.KeyframeResolver || bh;
    this.keyframeResolver = new T(h, (E, C, j) => this.onKeyframesResolved(E, C, S, !j), p, m, g), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, r, s, o) {
    this.keyframeResolver = void 0;
    const { name: c, type: d, velocity: h, delay: p, isHandoff: m, onUpdate: g } = s;
    this.resolvedAt = Yt.now();
    let v = !0;
    OC(a, c, d, h) || (v = !1, (Ia.instantAnimations || !p) && g?.(gu(a, s, r)), a[0] = a[a.length - 1], Dd(s), s.repeat = 0);
    const T = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > HC ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: r,
      ...s,
      keyframes: a
    }, E = v && !m && BC(T), C = T.motionValue?.owner?.current;
    let j;
    if (E)
      try {
        j = new NC({
          ...T,
          element: C
        });
      } catch {
        j = new iu(T);
      }
    else
      j = new iu(T);
    j.finished.then(() => {
      this.notifyFinished();
    }).catch(Sn), this.pendingTimeline && (this.stopTimeline = j.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = j;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(a, r) {
    return this.finished.finally(a).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), EC()), this._animation;
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
  const c = Array.from(n).sort((m, g) => m.sortNodePosition(g)).indexOf(a), d = n.size, h = (d - 1) * s;
  return typeof r == "function" ? r(c, d) : o === 1 ? c * s : h - c * s;
}
const YC = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function kC(n) {
  const a = YC.exec(n);
  if (!a)
    return [,];
  const [, r, s, o] = a;
  return [`--${r ?? s}`, o];
}
const GC = 4;
function iS(n, a, r = 1) {
  ji(r <= GC, `Max CSS variable fallback depth detected in property "${n}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, o] = kC(n);
  if (!s)
    return;
  const c = window.getComputedStyle(a).getPropertyValue(s);
  if (c) {
    const d = c.trim();
    return Sb(d) ? parseFloat(d) : d;
  }
  return hh(o) ? iS(o, a, r + 1) : o;
}
const PC = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, XC = (n) => ({
  type: "spring",
  stiffness: 550,
  damping: n === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), FC = {
  type: "keyframes",
  duration: 0.8
}, QC = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, KC = (n, { keyframes: a }) => a.length > 2 ? FC : Ol.has(n) ? n.startsWith("scale") ? XC(a[1]) : PC : QC;
function lS(n, a) {
  if (n?.inherit && a) {
    const { inherit: r, ...s } = n;
    return { ...a, ...s };
  }
  return n;
}
function Sh(n, a) {
  const r = n?.[a] ?? n?.default ?? n;
  return r !== n ? lS(r, n) : r;
}
const ZC = /* @__PURE__ */ new Set([
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
function $C(n) {
  for (const a in n)
    if (!ZC.has(a))
      return !0;
  return !1;
}
const xh = (n, a, r, s = {}, o, c) => (d) => {
  const h = Sh(s, n) || {}, p = h.delay || s.delay || 0;
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
    element: c ? void 0 : o
  };
  $C(h) || Object.assign(g, KC(n, g)), g.duration && (g.duration = /* @__PURE__ */ It(g.duration)), g.repeatDelay && (g.repeatDelay = /* @__PURE__ */ It(g.repeatDelay)), g.from !== void 0 && (g.keyframes[0] = g.from);
  let v = !1;
  if ((g.type === !1 || g.duration === 0 && !g.repeatDelay) && (Dd(g), g.delay === 0 && (v = !0)), (Ia.instantAnimations || Ia.skipAnimations || o?.shouldSkipAnimations) && (v = !0, Dd(g), g.delay = 0), g.allowFlatten = !h.type && !h.ease, v && !c && a.get() !== void 0) {
    const S = gu(g.keyframes, h);
    if (S !== void 0) {
      Je.update(() => {
        g.onUpdate(S), g.onComplete();
      });
      return;
    }
  }
  return h.isSync ? new iu(g) : new qC(g);
};
function Ev(n) {
  const a = [{}, {}];
  return n?.values.forEach((r, s) => {
    a[0][s] = r.get(), a[1][s] = r.getVelocity();
  }), a;
}
function Th(n, a, r, s) {
  if (typeof a == "function") {
    const [o, c] = Ev(s);
    a = a(r !== void 0 ? r : n.custom, o, c);
  }
  if (typeof a == "string" && (a = n.variants && n.variants[a]), typeof a == "function") {
    const [o, c] = Ev(s);
    a = a(r !== void 0 ? r : n.custom, o, c);
  }
  return a;
}
function Di(n, a, r) {
  const s = n.getProps();
  return Th(s, a, r !== void 0 ? r : s.custom, n);
}
const rS = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...zl
]), Rv = 30, IC = (n) => !isNaN(parseFloat(n));
class JC {
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
        for (const c of this.dependents)
          c.dirty();
    }, this.hasAnimated = !1, this.setCurrent(a), this.owner = r.owner;
  }
  setCurrent(a) {
    this.current = a, this.updatedAt = Yt.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = IC(this.current));
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
    this.events[a] || (this.events[a] = new ch());
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
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > Rv)
      return 0;
    const r = Math.min(this.updatedAt - this.prevUpdatedAt, Rv);
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
  return new JC(n, a);
}
const jd = (n) => Array.isArray(n);
function WC(n, a, r) {
  n.hasValue(a) ? n.getValue(a).set(r) : n.addValue(a, jl(r));
}
function ew(n) {
  return jd(n) ? n[n.length - 1] || 0 : n;
}
function tw(n, a) {
  const r = Di(n, a);
  let { transitionEnd: s = {}, transition: o = {}, ...c } = r || {};
  c = { ...c, ...s };
  for (const d in c) {
    const h = ew(c[d]);
    WC(n, d, h);
  }
}
const Ot = (n) => !!(n && n.getVelocity);
function nw(n) {
  return !!(Ot(n) && n.add);
}
function Nd(n, a) {
  const r = n.getValue("willChange");
  if (nw(r))
    return r.add(a);
  if (!r && Ia.WillChange) {
    const s = new Ia.WillChange("auto");
    n.addValue("willChange", s), s.add(a);
  }
}
function Eh(n) {
  return n.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const aw = "framerAppearId", sS = "data-" + Eh(aw);
function oS(n) {
  return n.props[sS];
}
function iw({ protectedKeys: n, needsAnimating: a }, r) {
  const s = n.hasOwnProperty(r) && a[r] !== !0;
  return a[r] = !1, s;
}
function uS(n, a, { delay: r = 0, transitionOverride: s, type: o } = {}) {
  let { transition: c, transitionEnd: d, ...h } = a;
  const p = n.getDefaultTransition();
  c = c ? lS(c, p) : p;
  const m = c?.reduceMotion;
  s && (c = s);
  const g = [], v = o && n.animationState && n.animationState.getState()[o];
  for (const S in h) {
    const T = n.getValue(S, n.latestValues[S] ?? null), E = h[S];
    if (E === void 0 || v && iw(v, S))
      continue;
    const C = {
      delay: r,
      ...Sh(c || {}, S)
    }, j = T.get();
    if (j !== void 0 && !T.isAnimating() && !Array.isArray(E) && E === j && !C.velocity) {
      Je.update(() => T.set(E));
      continue;
    }
    let O = !1;
    if (window.MotionHandoffAnimation) {
      const Q = oS(n);
      if (Q) {
        const $ = window.MotionHandoffAnimation(Q, S, Je);
        $ !== null && (C.startTime = $, O = !0);
      }
    }
    Nd(n, S);
    const Y = m ?? n.shouldReduceMotion;
    T.start(xh(S, T, E, Y && rS.has(S) ? { type: !1 } : C, n, O));
    const L = T.animation;
    L && g.push(L);
  }
  if (d) {
    const S = () => Je.update(() => {
      d && tw(n, d);
    });
    g.length ? Promise.all(g).then(S) : S();
  }
  return g;
}
function zd(n, a, r = {}) {
  const s = Di(n, a, r.type === "exit" ? n.presenceContext?.custom : void 0);
  let { transition: o = n.getDefaultTransition() || {} } = s || {};
  r.transitionOverride && (o = r.transitionOverride);
  const c = s ? () => Promise.all(uS(n, s, r)) : () => Promise.resolve(), d = n.variantChildren && n.variantChildren.size ? (p = 0) => {
    const { delayChildren: m = 0, staggerChildren: g, staggerDirection: v } = o;
    return lw(n, a, p, m, g, v, r);
  } : () => Promise.resolve(), { when: h } = o;
  if (h) {
    const [p, m] = h === "beforeChildren" ? [c, d] : [d, c];
    return p().then(() => m());
  } else
    return Promise.all([c(), d(r.delay)]);
}
function lw(n, a, r = 0, s = 0, o = 0, c = 1, d) {
  const h = [];
  for (const p of n.variantChildren)
    p.notify("AnimationStart", a), h.push(zd(p, a, {
      ...d,
      delay: r + (typeof s == "function" ? 0 : s) + aS(n.variantChildren, p, s, o, c)
    }).then(() => p.notify("AnimationComplete", a)));
  return Promise.all(h);
}
function rw(n, a, r = {}) {
  n.notify("AnimationStart", a);
  let s;
  if (Array.isArray(a)) {
    const o = a.map((c) => zd(n, c, r));
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
const sw = {
  test: (n) => n === "auto",
  parse: (n) => n
}, cS = (n) => (a) => a.test(n), fS = [Nl, ye, kn, Pa, zA, NA, sw], Mv = (n) => fS.find(cS(n));
function ow(n) {
  return typeof n == "number" ? n === 0 : n !== null ? n === "none" || n === "0" || Tb(n) : !0;
}
const uw = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function cw(n) {
  const [a, r] = n.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return n;
  const [s] = r.match(mh) || [];
  if (!s)
    return n;
  const o = r.replace(s, "");
  let c = uw.has(a) ? 1 : 0;
  return s !== r && (c *= 100), a + "(" + c + o + ")";
}
const fw = /\b([a-z-]*)\(.*?\)/gu, Od = {
  ...Nn,
  getAnimatableNone: (n) => {
    const a = n.match(fw);
    return a ? a.map(cw).join(" ") : n;
  }
}, _d = {
  ...Nn,
  getAnimatableNone: (n) => {
    const a = Nn.parse(n);
    return Nn.createTransformer(n)(a.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, Av = {
  ...Nl,
  transform: Math.round
}, dw = {
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
  originX: dv,
  originY: dv,
  originZ: ye
}, Rh = {
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
  ...dw,
  zIndex: Av,
  // SVG
  fillOpacity: $r,
  strokeOpacity: $r,
  numOctaves: Av
}, hw = {
  ...Rh,
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
}, dS = (n) => hw[n], mw = /* @__PURE__ */ new Set([Od, _d]);
function hS(n, a) {
  let r = dS(n);
  return mw.has(r) || (r = Nn), r.getAnimatableNone ? r.getAnimatableNone(a) : void 0;
}
const pw = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function yw(n, a, r) {
  let s = 0, o;
  for (; s < n.length && !o; ) {
    const c = n[s];
    typeof c == "string" && !pw.has(c) && Dl(c).values.length && (o = n[s]), s++;
  }
  if (o && r)
    for (const c of a)
      n[c] = hS(r, o);
}
class gw extends bh {
  constructor(a, r, s, o, c) {
    super(a, r, s, o, c, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, element: r, name: s } = this;
    if (!r || !r.current)
      return;
    super.readKeyframes();
    for (let g = 0; g < a.length; g++) {
      let v = a[g];
      if (typeof v == "string" && (v = v.trim(), hh(v))) {
        const S = iS(v, r.current);
        S !== void 0 && (a[g] = S), g === a.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !rS.has(s) || a.length !== 2)
      return;
    const [o, c] = a, d = Mv(o), h = Mv(c), p = fv(o), m = fv(c);
    if (p !== m && Za[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (d !== h)
      if (Sv(d) && Sv(h))
        for (let g = 0; g < a.length; g++) {
          const v = a[g];
          typeof v == "string" && (a[g] = parseFloat(v));
        }
      else Za[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: r } = this, s = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || ow(a[o])) && s.push(o);
    s.length && yw(a, s, r);
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
    const c = s.length - 1, d = s[c];
    s[c] = Za[r](a.measureViewportBox(), window.getComputedStyle(a.current)), d !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = d), this.removedTransforms?.length && this.removedTransforms.forEach(([h, p]) => {
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
function ko(n) {
  return xb(n) && "offsetHeight" in n && !("ownerSVGElement" in n);
}
const { schedule: Mh } = /* @__PURE__ */ Lb(queueMicrotask, !1), jn = {
  x: !1,
  y: !1
};
function yS() {
  return jn.x || jn.y;
}
function vw(n) {
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
function bw(n) {
  return !(n.pointerType === "touch" || yS());
}
function Sw(n, a, r = {}) {
  const [s, o, c] = gS(n, r);
  return s.forEach((d) => {
    let h = !1, p = !1, m;
    const g = () => {
      d.removeEventListener("pointerleave", E);
    }, v = (j) => {
      m && (m(j), m = void 0), g();
    }, S = (j) => {
      h = !1, window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), p && (p = !1, v(j));
    }, T = () => {
      h = !0, window.addEventListener("pointerup", S, o), window.addEventListener("pointercancel", S, o);
    }, E = (j) => {
      if (j.pointerType !== "touch") {
        if (h) {
          p = !0;
          return;
        }
        v(j);
      }
    }, C = (j) => {
      if (!bw(j))
        return;
      p = !1;
      const O = a(d, j);
      typeof O == "function" && (m = O, d.addEventListener("pointerleave", E, o));
    };
    d.addEventListener("pointerenter", C, o), d.addEventListener("pointerdown", T, o);
  }), c;
}
const vS = (n, a) => a ? n === a ? !0 : vS(n, a.parentElement) : !1, Ah = (n) => n.pointerType === "mouse" ? typeof n.button != "number" || n.button <= 0 : n.isPrimary !== !1, xw = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function Tw(n) {
  return xw.has(n.tagName) || n.isContentEditable === !0;
}
const Ew = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function Rw(n) {
  return Ew.has(n.tagName) || n.isContentEditable === !0;
}
const Go = /* @__PURE__ */ new WeakSet();
function Cv(n) {
  return (a) => {
    a.key === "Enter" && n(a);
  };
}
function Jf(n, a) {
  n.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const Mw = (n, a) => {
  const r = n.currentTarget;
  if (!r)
    return;
  const s = Cv(() => {
    if (Go.has(r))
      return;
    Jf(r, "down");
    const o = Cv(() => {
      Jf(r, "up");
    }), c = () => Jf(r, "cancel");
    r.addEventListener("keyup", o, a), r.addEventListener("blur", c, a);
  });
  r.addEventListener("keydown", s, a), r.addEventListener("blur", () => r.removeEventListener("keydown", s), a);
};
function wv(n) {
  return Ah(n) && !yS();
}
const Dv = /* @__PURE__ */ new WeakSet();
function Aw(n, a, r = {}) {
  const [s, o, c] = gS(n, r), d = (h) => {
    const p = h.currentTarget;
    if (!wv(h) || Dv.has(h))
      return;
    Go.add(p), r.stopPropagation && Dv.add(h);
    const m = a(p, h), g = (T, E) => {
      window.removeEventListener("pointerup", v), window.removeEventListener("pointercancel", S), Go.has(p) && Go.delete(p), wv(T) && typeof m == "function" && m(T, { success: E });
    }, v = (T) => {
      g(T, p === window || p === document || r.useGlobalTarget || vS(p, T.target));
    }, S = (T) => {
      g(T, !1);
    };
    window.addEventListener("pointerup", v, o), window.addEventListener("pointercancel", S, o);
  };
  return s.forEach((h) => {
    (r.useGlobalTarget ? window : h).addEventListener("pointerdown", d, o), ko(h) && (h.addEventListener("focus", (m) => Mw(m, o)), !Tw(h) && !h.hasAttribute("tabindex") && (h.tabIndex = 0));
  }), c;
}
function Ch(n) {
  return xb(n) && "ownerSVGElement" in n;
}
const Po = /* @__PURE__ */ new WeakMap();
let Xo;
const bS = (n, a, r) => (s, o) => o && o[0] ? o[0][n + "Size"] : Ch(s) && "getBBox" in s ? s.getBBox()[a] : s[r], Cw = /* @__PURE__ */ bS("inline", "width", "offsetWidth"), ww = /* @__PURE__ */ bS("block", "height", "offsetHeight");
function Dw({ target: n, borderBoxSize: a }) {
  Po.get(n)?.forEach((r) => {
    r(n, {
      get width() {
        return Cw(n, a);
      },
      get height() {
        return ww(n, a);
      }
    });
  });
}
function jw(n) {
  n.forEach(Dw);
}
function Nw() {
  typeof ResizeObserver > "u" || (Xo = new ResizeObserver(jw));
}
function zw(n, a) {
  Xo || Nw();
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
function Ow() {
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
function _w(n) {
  return Fo.add(n), Ml || Ow(), () => {
    Fo.delete(n), !Fo.size && typeof Ml == "function" && (window.removeEventListener("resize", Ml), Ml = void 0);
  };
}
function jv(n, a) {
  return typeof n == "function" ? _w(n) : zw(n, a);
}
function Lw(n) {
  return Ch(n) && n.tagName === "svg";
}
const Vw = [...fS, xt, Nn], Uw = (n) => Vw.find(cS(n)), Nv = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), Al = () => ({
  x: Nv(),
  y: Nv()
}), zv = () => ({ min: 0, max: 0 }), Rt = () => ({
  x: zv(),
  y: zv()
}), Bw = /* @__PURE__ */ new WeakMap();
function vu(n) {
  return n !== null && typeof n == "object" && typeof n.start == "function";
}
function Ir(n) {
  return typeof n == "string" || Array.isArray(n);
}
const wh = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Dh = ["initial", ...wh];
function bu(n) {
  return vu(n.animate) || Dh.some((a) => Ir(n[a]));
}
function SS(n) {
  return !!(bu(n) || n.variants);
}
function Hw(n, a, r) {
  for (const s in a) {
    const o = a[s], c = r[s];
    if (Ot(o))
      n.addValue(s, o);
    else if (Ot(c))
      n.addValue(s, jl(o, { owner: n }));
    else if (c !== o)
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
const lu = { current: null }, jh = { current: !1 }, qw = typeof window < "u";
function xS() {
  if (jh.current = !0, !!qw)
    if (window.matchMedia) {
      const n = window.matchMedia("(prefers-reduced-motion)"), a = () => lu.current = n.matches;
      n.addEventListener("change", a), a();
    } else
      lu.current = !1;
}
const Ov = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let ru = {};
function TS(n) {
  ru = n;
}
function Yw() {
  return ru;
}
class kw {
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
  constructor({ parent: a, props: r, presenceContext: s, reducedMotionConfig: o, skipAnimations: c, blockInitialAnimation: d, visualState: h }, p = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = bh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const T = Yt.now();
      this.renderScheduledAt < T && (this.renderScheduledAt = T, Je.render(this.render, !1, !0));
    };
    const { latestValues: m, renderState: g } = h;
    this.latestValues = m, this.baseTarget = { ...m }, this.initialValues = r.initial ? { ...m } : {}, this.renderState = g, this.parent = a, this.props = r, this.presenceContext = s, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = c, this.options = p, this.blockInitialAnimation = !!d, this.isControllingVariants = bu(r), this.isVariantNode = SS(r), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: v, ...S } = this.scrapeMotionValuesFromProps(r, {}, this);
    for (const T in S) {
      const E = S[T];
      m[T] !== void 0 && Ot(E) && E.set(m[T]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const r in this.initialValues)
        this.values.get(r)?.jump(this.initialValues[r]), this.latestValues[r] = this.initialValues[r];
    this.current = a, Bw.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((r, s) => this.bindToMotionValue(s, r)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (jh.current || xS(), this.shouldReduceMotion = lu.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
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
    let c;
    typeof window < "u" && window.MotionCheckAppearSync && (c = window.MotionCheckAppearSync(this, a, r)), this.valueSubscriptions.set(a, () => {
      o(), c && c(), r.owner && r.stop();
    });
  }
  sortNodePosition(a) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== a.type ? 0 : this.sortInstanceNodePosition(this.current, a.current);
  }
  updateFeatures() {
    let a = "animation";
    for (a in ru) {
      const r = ru[a];
      if (!r)
        continue;
      const { isEnabled: s, Feature: o } = r;
      if (!this.features[a] && o && s(this.props) && (this.features[a] = new o(this)), this.features[a]) {
        const c = this.features[a];
        c.isMounted ? c.update() : (c.mount(), c.isMounted = !0);
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
    for (let s = 0; s < Ov.length; s++) {
      const o = Ov[s];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const c = "on" + o, d = a[c];
      d && (this.propEventSubscriptions[o] = this.on(o, d));
    }
    this.prevMotionValues = Hw(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return s != null && (typeof s == "string" && (Sb(s) || Tb(s)) ? s = parseFloat(s) : !Uw(s) && Nn.test(r) && (s = hS(a, r)), this.setBaseTarget(a, Ot(s) ? s.get() : s)), Ot(s) ? s.get() : s;
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
      const c = Th(this.props, r, this.presenceContext?.custom);
      c && (s = c[a]);
    }
    if (r && s !== void 0)
      return s;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !Ot(o) ? o : this.initialValues[a] !== void 0 && s === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, r) {
    return this.events[a] || (this.events[a] = new ch()), this.events[a].add(r);
  }
  notify(a, ...r) {
    this.events[a] && this.events[a].notify(...r);
  }
  scheduleRenderMicrotask() {
    Mh.render(this.render);
  }
}
class ES extends kw {
  constructor() {
    super(...arguments), this.KeyframeResolver = gw;
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
function Pw(n, a) {
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
function Wf(n) {
  return n === void 0 || n === 1;
}
function Ld({ scale: n, scaleX: a, scaleY: r }) {
  return !Wf(n) || !Wf(a) || !Wf(r);
}
function Ri(n) {
  return Ld(n) || MS(n) || n.z || n.rotate || n.rotateX || n.rotateY || n.skewX || n.skewY;
}
function MS(n) {
  return _v(n.x) || _v(n.y);
}
function _v(n) {
  return n && n !== "0%";
}
function su(n, a, r) {
  const s = n - r, o = a * s;
  return r + o;
}
function Lv(n, a, r, s, o) {
  return o !== void 0 && (n = su(n, o, s)), su(n, r, s) + a;
}
function Vd(n, a = 0, r = 1, s, o) {
  n.min = Lv(n.min, a, r, s, o), n.max = Lv(n.max, a, r, s, o);
}
function AS(n, { x: a, y: r }) {
  Vd(n.x, a.translate, a.scale, a.originPoint), Vd(n.y, r.translate, r.scale, r.originPoint);
}
const Vv = 0.999999999999, Uv = 1.0000000000001;
function Xw(n, a, r, s = !1) {
  const o = r.length;
  if (!o)
    return;
  a.x = a.y = 1;
  let c, d;
  for (let h = 0; h < o; h++) {
    c = r[h], d = c.projectionDelta;
    const { visualElement: p } = c.options;
    p && p.props.style && p.props.style.display === "contents" || (s && c.options.layoutScroll && c.scroll && c !== c.root && (Yn(n.x, -c.scroll.offset.x), Yn(n.y, -c.scroll.offset.y)), d && (a.x *= d.x.scale, a.y *= d.y.scale, AS(n, d)), s && Ri(c.latestValues) && Qo(n, c.latestValues, c.layout?.layoutBox));
  }
  a.x < Uv && a.x > Vv && (a.x = 1), a.y < Uv && a.y > Vv && (a.y = 1);
}
function Yn(n, a) {
  n.min += a, n.max += a;
}
function Bv(n, a, r, s, o = 0.5) {
  const c = at(n.min, n.max, o);
  Vd(n, a, r, c, s);
}
function Hv(n, a) {
  return typeof n == "string" ? parseFloat(n) / 100 * (a.max - a.min) : n;
}
function Qo(n, a, r) {
  const s = r ?? n;
  Bv(n.x, Hv(a.x, s.x), a.scaleX, a.scale, a.originX), Bv(n.y, Hv(a.y, s.y), a.scaleY, a.scale, a.originY);
}
function CS(n, a) {
  return RS(Pw(n.getBoundingClientRect(), a));
}
function Fw(n, a, r) {
  const s = CS(n, r), { scroll: o } = a;
  return o && (Yn(s.x, o.offset.x), Yn(s.y, o.offset.y)), s;
}
const Qw = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Kw = zl.length;
function Zw(n, a, r) {
  let s = "", o = !0;
  for (let c = 0; c < Kw; c++) {
    const d = zl[c], h = n[d];
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
      const m = pS(h, Rh[d]);
      if (!p) {
        o = !1;
        const g = Qw[d] || d;
        s += `${g}(${m}) `;
      }
      r && (a[d] = m);
    }
  }
  return s = s.trim(), r ? s = r(a, o ? "" : s) : o && (s = "none"), s;
}
function Nh(n, a, r) {
  const { style: s, vars: o, transformOrigin: c } = n;
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
      const g = pS(m, Rh[p]);
      p.startsWith("origin") ? (h = !0, c[p] = g) : s[p] = g;
    }
  }
  if (a.transform || (d || r ? s.transform = Zw(a, n.transform, r) : s.transform && (s.transform = "none")), h) {
    const { originX: p = "50%", originY: m = "50%", originZ: g = 0 } = c;
    s.transformOrigin = `${p} ${m} ${g}`;
  }
}
function wS(n, { style: a, vars: r }, s, o) {
  const c = n.style;
  let d;
  for (d in a)
    c[d] = a[d];
  o?.applyProjectionStyles(c, s);
  for (d in r)
    c.setProperty(d, r[d]);
}
function qv(n, a) {
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
    const r = qv(n, a.target.x), s = qv(n, a.target.y);
    return `${r}% ${s}%`;
  }
}, $w = {
  correct: (n, { treeScale: a, projectionDelta: r }) => {
    const s = n, o = Nn.parse(n);
    if (o.length > 5)
      return s;
    const c = Nn.createTransformer(n), d = typeof o[0] != "number" ? 1 : 0, h = r.x.scale * a.x, p = r.y.scale * a.y;
    o[0 + d] /= h, o[1 + d] /= p;
    const m = at(h, p, 0.5);
    return typeof o[2 + d] == "number" && (o[2 + d] /= m), typeof o[3 + d] == "number" && (o[3 + d] /= m), c(o);
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
  boxShadow: $w
};
function DS(n, { layout: a, layoutId: r }) {
  return Ol.has(n) || n.startsWith("origin") || (a || r !== void 0) && (!!Ud[n] || n === "opacity");
}
function zh(n, a, r) {
  const s = n.style, o = a?.style, c = {};
  if (!s)
    return c;
  for (const d in s)
    (Ot(s[d]) || o && Ot(o[d]) || DS(d, n) || r?.getValue(d)?.liveStyle !== void 0) && (c[d] = s[d]);
  return c;
}
function Iw(n) {
  return window.getComputedStyle(n);
}
class Jw extends ES {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = wS;
  }
  readValueFromInstance(a, r) {
    if (Ol.has(r))
      return this.projection?.isProjecting ? Rd(r) : vC(a, r);
    {
      const s = Iw(a), o = (Ub(r) ? s.getPropertyValue(r) : s[r]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: r }) {
    return CS(a, r);
  }
  build(a, r, s) {
    Nh(a, r, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, r, s) {
    return zh(a, r, s);
  }
}
const Ww = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, e2 = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function t2(n, a, r = 1, s = 0, o = !0) {
  n.pathLength = 1;
  const c = o ? Ww : e2;
  n[c.offset] = `${-s}`, n[c.array] = `${a} ${r}`;
}
const n2 = [
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
  pathSpacing: c = 1,
  pathOffset: d = 0,
  // This is object creation, which we try to avoid per-frame.
  ...h
}, p, m, g) {
  if (Nh(n, h, m), p) {
    n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
    return;
  }
  n.attrs = n.style, n.style = {};
  const { attrs: v, style: S } = n;
  v.transform && (S.transform = v.transform, delete v.transform), (S.transform || v.transformOrigin) && (S.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), S.transform && (S.transformBox = g?.transformBox ?? "fill-box", delete v.transformBox);
  for (const T of n2)
    v[T] !== void 0 && (S[T] = v[T], delete v[T]);
  a !== void 0 && (v.x = a), r !== void 0 && (v.y = r), s !== void 0 && (v.scale = s), o !== void 0 && t2(v, o, c, d, !1);
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
function a2(n, a, r, s) {
  wS(n, a, void 0, s);
  for (const o in a.attrs)
    n.setAttribute(NS.has(o) ? o : Eh(o), a.attrs[o]);
}
function OS(n, a, r) {
  const s = zh(n, a, r);
  for (const o in n)
    if (Ot(n[o]) || Ot(a[o])) {
      const c = zl.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      s[c] = n[o];
    }
  return s;
}
class i2 extends ES {
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
    return r = NS.has(r) ? r : Eh(r), a.getAttribute(r);
  }
  scrapeMotionValuesFromProps(a, r, s) {
    return OS(a, r, s);
  }
  build(a, r, s) {
    jS(a, r, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(a, r, s, o) {
    a2(a, r, s, o);
  }
  mount(a) {
    this.isSVGTag = zS(a.tagName), super.mount(a);
  }
}
const l2 = Dh.length;
function _S(n) {
  if (!n)
    return;
  if (!n.isControllingVariants) {
    const r = n.parent ? _S(n.parent) || {} : {};
    return n.props.initial !== void 0 && (r.initial = n.props.initial), r;
  }
  const a = {};
  for (let r = 0; r < l2; r++) {
    const s = Dh[r], o = n.props[s];
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
const r2 = [...wh].reverse(), s2 = wh.length;
function o2(n) {
  return (a) => Promise.all(a.map(({ animation: r, options: s }) => rw(n, r, s)));
}
function u2(n) {
  let a = o2(n), r = Yv(), s = !0, o = !1;
  const c = (m) => (g, v) => {
    const S = Di(n, v, m === "exit" ? n.presenceContext?.custom : void 0);
    if (S) {
      const { transition: T, transitionEnd: E, ...C } = S;
      g = { ...g, ...C, ...E };
    }
    return g;
  };
  function d(m) {
    a = m(n);
  }
  function h(m) {
    const { props: g } = n, v = _S(n.parent) || {}, S = [], T = /* @__PURE__ */ new Set();
    let E = {}, C = 1 / 0;
    for (let O = 0; O < s2; O++) {
      const Y = r2[O], L = r[Y], Q = g[Y] !== void 0 ? g[Y] : v[Y], $ = Ir(Q), I = Y === m ? L.isActive : null;
      I === !1 && (C = O);
      let ee = Q === v[Y] && Q !== g[Y] && $;
      if (ee && (s || o) && n.manuallyAnimateOnMount && (ee = !1), L.protectedKeys = { ...E }, // If it isn't active and hasn't *just* been set as inactive
      !L.isActive && I === null || // If we didn't and don't have any defined prop for this animation type
      !Q && !L.prevProp || // Or if the prop doesn't define an animation
      vu(Q) || typeof Q == "boolean")
        continue;
      if (Y === "exit" && L.isActive && I !== !0) {
        L.prevResolvedValues && (E = {
          ...E,
          ...L.prevResolvedValues
        });
        continue;
      }
      const N = c2(L.prevProp, Q);
      let W = N || // If we're making this variant active, we want to always make it active
      Y === m && L.isActive && !ee && $ || // If we removed a higher-priority variant (i is in reverse order)
      O > C && $, te = !1;
      const P = Array.isArray(Q) ? Q : [Q];
      let G = P.reduce(c(Y), {});
      I === !1 && (G = {});
      const { prevResolvedValues: le = {} } = L, de = {
        ...le,
        ...G
      }, se = (re) => {
        W = !0, T.has(re) && (te = !0, T.delete(re)), L.needsAnimating[re] = !0;
        const fe = n.getValue(re);
        fe && (fe.liveStyle = !1);
      };
      for (const re in de) {
        const fe = G[re], Re = le[re];
        if (E.hasOwnProperty(re))
          continue;
        let w = !1;
        jd(fe) && jd(Re) ? w = !LS(fe, Re) : w = fe !== Re, w ? fe != null ? se(re) : T.add(re) : fe !== void 0 && T.has(re) ? se(re) : L.protectedKeys[re] = !0;
      }
      L.prevProp = Q, L.prevResolvedValues = G, L.isActive && (E = { ...E, ...G }), (s || o) && n.blockInitialAnimation && (W = !1);
      const B = ee && N;
      W && (!B || te) && S.push(...P.map((re) => {
        const fe = { type: Y };
        if (typeof re == "string" && (s || o) && !B && n.manuallyAnimateOnMount && n.parent) {
          const { parent: Re } = n, w = Di(Re, re);
          if (Re.enteringChildren && w) {
            const { delayChildren: X } = w.transition || {};
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
      const O = {};
      if (typeof g.initial != "boolean") {
        const Y = Di(n, Array.isArray(g.initial) ? g.initial[0] : g.initial);
        Y && Y.transition && (O.transition = Y.transition);
      }
      T.forEach((Y) => {
        const L = n.getBaseTarget(Y), Q = n.getValue(Y);
        Q && (Q.liveStyle = !0), O[Y] = L ?? null;
      }), S.push({ animation: O });
    }
    let j = !!S.length;
    return s && (g.initial === !1 || g.initial === g.animate) && !n.manuallyAnimateOnMount && (j = !1), s = !1, o = !1, j ? a(S) : Promise.resolve();
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
      r = Yv(), o = !0;
    }
  };
}
function c2(n, a) {
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
function Yv() {
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
function kv(n, a) {
  n.translate = a.translate, n.scale = a.scale, n.originPoint = a.originPoint, n.origin = a.origin;
}
const VS = 1e-4, f2 = 1 - VS, d2 = 1 + VS, US = 0.01, h2 = 0 - US, m2 = 0 + US;
function kt(n) {
  return n.max - n.min;
}
function p2(n, a, r) {
  return Math.abs(n - a) <= r;
}
function Gv(n, a, r, s = 0.5) {
  n.origin = s, n.originPoint = at(a.min, a.max, n.origin), n.scale = kt(r) / kt(a), n.translate = at(r.min, r.max, n.origin) - n.originPoint, (n.scale >= f2 && n.scale <= d2 || isNaN(n.scale)) && (n.scale = 1), (n.translate >= h2 && n.translate <= m2 || isNaN(n.translate)) && (n.translate = 0);
}
function Pr(n, a, r, s) {
  Gv(n.x, a.x, r.x, s ? s.originX : void 0), Gv(n.y, a.y, r.y, s ? s.originY : void 0);
}
function Pv(n, a, r, s = 0) {
  const o = s ? at(r.min, r.max, s) : r.min;
  n.min = o + a.min, n.max = n.min + kt(a);
}
function y2(n, a, r, s) {
  Pv(n.x, a.x, r.x, s?.x), Pv(n.y, a.y, r.y, s?.y);
}
function Xv(n, a, r, s = 0) {
  const o = s ? at(r.min, r.max, s) : r.min;
  n.min = a.min - o, n.max = n.min + kt(a);
}
function ou(n, a, r, s) {
  Xv(n.x, a.x, r.x, s?.x), Xv(n.y, a.y, r.y, s?.y);
}
function Fv(n, a, r, s, o) {
  return n -= a, n = su(n, 1 / r, s), o !== void 0 && (n = su(n, 1 / o, s)), n;
}
function g2(n, a = 0, r = 1, s = 0.5, o, c = n, d = n) {
  if (kn.test(a) && (a = parseFloat(a), a = at(d.min, d.max, a / 100) - d.min), typeof a != "number")
    return;
  let h = at(c.min, c.max, s);
  n === c && (h -= a), n.min = Fv(n.min, a, r, h, o), n.max = Fv(n.max, a, r, h, o);
}
function Qv(n, a, [r, s, o], c, d) {
  g2(n, a[r], a[s], a[o], a.scale, c, d);
}
const v2 = ["x", "scaleX", "originX"], b2 = ["y", "scaleY", "originY"];
function Kv(n, a, r, s) {
  Qv(n.x, a, v2, r ? r.x : void 0, s ? s.x : void 0), Qv(n.y, a, b2, r ? r.y : void 0, s ? s.y : void 0);
}
function Zv(n) {
  return n.translate === 0 && n.scale === 1;
}
function BS(n) {
  return Zv(n.x) && Zv(n.y);
}
function $v(n, a) {
  return n.min === a.min && n.max === a.max;
}
function S2(n, a) {
  return $v(n.x, a.x) && $v(n.y, a.y);
}
function Iv(n, a) {
  return Math.round(n.min) === Math.round(a.min) && Math.round(n.max) === Math.round(a.max);
}
function HS(n, a) {
  return Iv(n.x, a.x) && Iv(n.y, a.y);
}
function Jv(n) {
  return kt(n.x) / kt(n.y);
}
function Wv(n, a) {
  return n.translate === a.translate && n.scale === a.scale && n.originPoint === a.originPoint;
}
function qn(n) {
  return [n("x"), n("y")];
}
function x2(n, a, r) {
  let s = "";
  const o = n.x.translate / a.x, c = n.y.translate / a.y, d = r?.z || 0;
  if ((o || c || d) && (s = `translate3d(${o}px, ${c}px, ${d}px) `), (a.x !== 1 || a.y !== 1) && (s += `scale(${1 / a.x}, ${1 / a.y}) `), r) {
    const { transformPerspective: m, rotate: g, rotateX: v, rotateY: S, skewX: T, skewY: E } = r;
    m && (s = `perspective(${m}px) ${s}`), g && (s += `rotate(${g}deg) `), v && (s += `rotateX(${v}deg) `), S && (s += `rotateY(${S}deg) `), T && (s += `skewX(${T}deg) `), E && (s += `skewY(${E}deg) `);
  }
  const h = n.x.scale * a.x, p = n.y.scale * a.y;
  return (h !== 1 || p !== 1) && (s += `scale(${h}, ${p})`), s || "none";
}
const qS = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius"
], T2 = qS.length, e0 = (n) => typeof n == "string" ? parseFloat(n) : n, t0 = (n) => typeof n == "number" || ye.test(n);
function E2(n, a, r, s, o, c) {
  o ? (n.opacity = at(0, r.opacity ?? 1, R2(s)), n.opacityExit = at(a.opacity ?? 1, 0, M2(s))) : c && (n.opacity = at(a.opacity ?? 1, r.opacity ?? 1, s));
  for (let d = 0; d < T2; d++) {
    const h = qS[d];
    let p = n0(a, h), m = n0(r, h);
    if (p === void 0 && m === void 0)
      continue;
    p || (p = 0), m || (m = 0), p === 0 || m === 0 || t0(p) === t0(m) ? (n[h] = Math.max(at(e0(p), e0(m), s), 0), (kn.test(m) || kn.test(p)) && (n[h] += "%")) : n[h] = m;
  }
  (a.rotate || r.rotate) && (n.rotate = at(a.rotate || 0, r.rotate || 0, s));
}
function n0(n, a) {
  return n[a] !== void 0 ? n[a] : n.borderRadius;
}
const R2 = /* @__PURE__ */ YS(0, 0.5, Nb), M2 = /* @__PURE__ */ YS(0.5, 0.95, Sn);
function YS(n, a, r) {
  return (s) => s < n ? 0 : s > a ? 1 : r(/* @__PURE__ */ Zr(n, a, s));
}
function A2(n, a, r) {
  const s = Ot(n) ? n : jl(n);
  return s.start(xh("", s, a, r)), s.animation;
}
function Jr(n, a, r, s = { passive: !0 }) {
  return n.addEventListener(a, r, s), () => n.removeEventListener(a, r);
}
const C2 = (n, a) => n.depth - a.depth;
class w2 {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(a) {
    uh(this.children, a), this.isDirty = !0;
  }
  remove(a) {
    eu(this.children, a), this.isDirty = !0;
  }
  forEach(a) {
    this.isDirty && this.children.sort(C2), this.isDirty = !1, this.children.forEach(a);
  }
}
function D2(n, a) {
  const r = Yt.now(), s = ({ timestamp: o }) => {
    const c = o - r;
    c >= a && (Ja(s), n(c - a));
  };
  return Je.setup(s, !0), () => Ja(s);
}
function Ko(n) {
  return Ot(n) ? n.get() : n;
}
class j2 {
  constructor() {
    this.members = [];
  }
  add(a) {
    uh(this.members, a);
    for (let r = this.members.length - 1; r >= 0; r--) {
      const s = this.members[r];
      if (s === a || s === this.lead || s === this.prevLead)
        continue;
      const o = s.instance;
      (!o || o.isConnected === !1) && !s.snapshot && (eu(this.members, s), s.unmount());
    }
    a.scheduleRender();
  }
  remove(a) {
    if (eu(this.members, a), a === this.prevLead && (this.prevLead = void 0), a === this.lead) {
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
      const { layoutDependency: o } = s.options, { layoutDependency: c } = a.options;
      (o === void 0 || o !== c) && (a.resumeFrom = s, r && (s.preserveOpacity = !0), s.snapshot && (a.snapshot = s.snapshot, a.snapshot.latestValues = s.animationValues || s.latestValues), a.root?.isUpdating && (a.isLayoutDirty = !0)), a.options.crossfade === !1 && s.hide();
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
}, ed = ["", "X", "Y", "Z"], N2 = 1e3;
let z2 = 0;
function td(n, a, r, s) {
  const { latestValues: o } = a;
  o[n] && (r[n] = o[n], a.setStaticValue(n, 0), s && (s[n] = 0));
}
function kS(n) {
  if (n.hasCheckedOptimisedAppear = !0, n.root === n)
    return;
  const { visualElement: a } = n.options;
  if (!a)
    return;
  const r = oS(a);
  if (window.MotionHasOptimisedAnimation(r, "transform")) {
    const { layout: o, layoutId: c } = n.options;
    window.MotionCancelOptimisedAnimation(r, "transform", Je, !(o || c));
  }
  const { parent: s } = n;
  s && !s.hasCheckedOptimisedAppear && kS(s);
}
function GS({ attachResizeListener: n, defaultParent: a, measureScroll: r, checkIsScrollRoot: s, resetTransform: o }) {
  return class {
    constructor(d = {}, h = a?.()) {
      this.id = z2++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(L2), this.nodes.forEach(Y2), this.nodes.forEach(k2), this.nodes.forEach(V2);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = d, this.root = h ? h.root || h : this, this.path = h ? [...h.path, h] : [], this.parent = h, this.depth = h ? h.depth + 1 : 0;
      for (let p = 0; p < this.path.length; p++)
        this.path[p].shouldResetTransform = !0;
      this.root === this && (this.nodes = new w2());
    }
    addEventListener(d, h) {
      return this.eventHandlers.has(d) || this.eventHandlers.set(d, new ch()), this.eventHandlers.get(d).add(h);
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
      this.isSVG = Ch(d) && !Lw(d), this.instance = d;
      const { layoutId: h, layout: p, visualElement: m } = this.options;
      if (m && !m.current && m.mount(d), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (p || h) && (this.isLayoutDirty = !0), n) {
        let g, v = 0;
        const S = () => this.root.updateBlockedByResize = !1;
        Je.read(() => {
          v = window.innerWidth;
        }), n(d, () => {
          const T = window.innerWidth;
          T !== v && (v = T, this.root.updateBlockedByResize = !0, g && g(), g = D2(S, 250), Zo.hasAnimatedSinceResize && (Zo.hasAnimatedSinceResize = !1, this.nodes.forEach(l0)));
        });
      }
      h && this.root.registerSharedNode(h, this), this.options.animate !== !1 && m && (h || p) && this.addEventListener("didUpdate", ({ delta: g, hasLayoutChanged: v, hasRelativeLayoutChanged: S, layout: T }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const E = this.options.transition || m.getDefaultTransition() || Q2, { onLayoutAnimationStart: C, onLayoutAnimationComplete: j } = m.getProps(), O = !this.targetLayout || !HS(this.targetLayout, T), Y = !v && S;
        if (this.options.layoutRoot || this.resumeFrom || Y || v && (O || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const L = {
            ...Sh(E, "layout"),
            onPlay: C,
            onComplete: j
          };
          (m.shouldReduceMotion || this.options.layoutRoot) && (L.delay = 0, L.type = !1), this.startAnimation(L), this.setAnimationOrigin(g, Y);
        } else
          v || l0(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
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
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && kS(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
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
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), p && this.nodes.forEach(B2), this.nodes.forEach(a0);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(i0);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(H2), this.nodes.forEach(q2), this.nodes.forEach(O2), this.nodes.forEach(_2)) : this.nodes.forEach(i0), this.clearAllSnapshots();
      const h = Yt.now();
      zt.delta = Pn(0, 1e3 / 60, h - zt.timestamp), zt.timestamp = h, zt.isProcessing = !0, Ff.update.process(zt), Ff.preRender.process(zt), Ff.render.process(zt), zt.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Mh.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(U2), this.sharedNodes.forEach(P2);
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
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !kt(this.snapshot.measuredBox.x) && !kt(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
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
      if (!(this.scroll?.wasRoot || this.path.some(Z2))) {
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
        !h && v.options.layoutScroll && v.scroll && v !== v.root && (Yn(m.x, -v.scroll.offset.x), Yn(m.y, -v.scroll.offset.y)), Ri(v.latestValues) && Qo(m, v.latestValues, v.layout?.layoutBox);
      }
      return Ri(this.latestValues) && Qo(m, this.latestValues, this.layout?.layoutBox), m;
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
      S && this.linkedParentVersion !== S.layoutVersion && !S.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && S && S.layout ? this.createRelativeTarget(S, this.layout.layoutBox, S.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = Rt(), this.targetWithTransforms = Rt()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), y2(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : Dn(this.target, this.layout.layoutBox), AS(this.target, this.targetDelta)) : Dn(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && S && !!S.resumingFrom == !!this.resumingFrom && !S.options.layoutScroll && S.target && this.animationProgress !== 1 ? this.createRelativeTarget(S, this.target, S.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || Ld(this.parent.latestValues) || MS(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(d, h, p) {
      this.relativeParent = d, this.linkedParentVersion = d.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = Rt(), this.relativeTargetOrigin = Rt(), ou(this.relativeTargetOrigin, h, p, this.options.layoutAnchor || void 0), Dn(this.relativeTarget, this.relativeTargetOrigin);
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
      Xw(this.layoutCorrected, this.treeScale, this.path, h), d.layout && !d.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (d.target = d.layout.layoutBox, d.targetWithTransforms = Rt());
      const { target: T } = d;
      if (!T) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (kv(this.prevProjectionDelta.x, this.projectionDelta.x), kv(this.prevProjectionDelta.y, this.projectionDelta.y)), Pr(this.projectionDelta, this.layoutCorrected, T, this.latestValues), (this.treeScale.x !== v || this.treeScale.y !== S || !Wv(this.projectionDelta.x, this.prevProjectionDelta.x) || !Wv(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", T));
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
      const S = Rt(), T = p ? p.source : void 0, E = this.layout ? this.layout.source : void 0, C = T !== E, j = this.getStack(), O = !j || j.members.length <= 1, Y = !!(C && !O && this.options.crossfade === !0 && !this.path.some(F2));
      this.animationProgress = 0;
      let L;
      this.mixTargetDelta = (Q) => {
        const $ = Q / 1e3;
        r0(v.x, d.x, $), r0(v.y, d.y, $), this.setTargetDelta(v), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (ou(S, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), X2(this.relativeTarget, this.relativeTargetOrigin, S, $), L && S2(this.relativeTarget, L) && (this.isProjectionDirty = !1), L || (L = Rt()), Dn(L, this.relativeTarget)), C && (this.animationValues = g, E2(g, m, this.latestValues, $, Y, O)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = $;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(d) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (Ja(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = Je.update(() => {
        Zo.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = jl(0)), this.motionValue.jump(0, !1), this.currentAnimation = A2(this.motionValue, [0, 1e3], {
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
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(N2), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const d = this.getLead();
      let { targetWithTransforms: h, target: p, layout: m, latestValues: g } = d;
      if (!(!h || !p || !m)) {
        if (this !== d && this.layout && m && PS(this.options.animationType, this.layout.layoutBox, m.layoutBox)) {
          p = this.target || Rt();
          const v = kt(this.layout.layoutBox.x);
          p.x.min = d.target.x.min, p.x.max = p.x.min + v;
          const S = kt(this.layout.layoutBox.y);
          p.y.min = d.target.y.min, p.y.max = p.y.min + S;
        }
        Dn(h, p), Qo(h, g), Pr(this.projectionDeltaWithTransform, this.layoutCorrected, h, g);
      }
    }
    registerSharedNode(d, h) {
      this.sharedNodes.has(d) || this.sharedNodes.set(d, new j2()), this.sharedNodes.get(d).add(h);
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
      p.z && td("z", d, m, this.animationValues);
      for (let g = 0; g < ed.length; g++)
        td(`rotate${ed[g]}`, d, m, this.animationValues), td(`skew${ed[g]}`, d, m, this.animationValues);
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
        this.needsReset = !1, d.visibility = "", d.opacity = "", d.pointerEvents = Ko(h?.pointerEvents) || "", d.transform = p ? p(this.latestValues, "") : "none";
        return;
      }
      const m = this.getLead();
      if (!this.projectionDelta || !this.layout || !m.target) {
        this.options.layoutId && (d.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, d.pointerEvents = Ko(h?.pointerEvents) || ""), this.hasProjected && !Ri(this.latestValues) && (d.transform = p ? p({}, "") : "none", this.hasProjected = !1);
        return;
      }
      d.visibility = "";
      const g = m.animationValues || m.latestValues;
      this.applyTransformsToTarget();
      let v = x2(this.projectionDeltaWithTransform, this.treeScale, g);
      p && (v = p(g, v)), d.transform = v;
      const { x: S, y: T } = this.projectionDelta;
      d.transformOrigin = `${S.origin * 100}% ${T.origin * 100}% 0`, m.animationValues ? d.opacity = m === this ? g.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : g.opacityExit : d.opacity = m === this ? g.opacity !== void 0 ? g.opacity : "" : g.opacityExit !== void 0 ? g.opacityExit : 0;
      for (const E in Ud) {
        if (g[E] === void 0)
          continue;
        const { correct: C, applyTo: j, isCSSVariable: O } = Ud[E], Y = v === "none" ? g[E] : C(g[E], m);
        if (j) {
          const L = j.length;
          for (let Q = 0; Q < L; Q++)
            d[j[Q]] = Y;
        } else
          O ? this.options.visualElement.renderState.vars[E] = Y : d[E] = Y;
      }
      this.options.layoutId && (d.pointerEvents = m === this ? Ko(h?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((d) => d.currentAnimation?.stop()), this.root.nodes.forEach(a0), this.root.sharedNodes.clear();
    }
  };
}
function O2(n) {
  n.updateLayout();
}
function _2(n) {
  const a = n.resumeFrom?.snapshot || n.snapshot;
  if (n.isLead() && n.layout && a && n.hasListeners("didUpdate")) {
    const { layoutBox: r, measuredBox: s } = n.layout, { animationType: o } = n.options, c = a.source !== n.layout.source;
    if (o === "size")
      qn((g) => {
        const v = c ? a.measuredBox[g] : a.layoutBox[g], S = kt(v);
        v.min = r[g].min, v.max = v.min + S;
      });
    else if (o === "x" || o === "y") {
      const g = o === "x" ? "y" : "x";
      Bd(c ? a.measuredBox[g] : a.layoutBox[g], r[g]);
    } else PS(o, a.layoutBox, r) && qn((g) => {
      const v = c ? a.measuredBox[g] : a.layoutBox[g], S = kt(r[g]);
      v.max = v.min + S, n.relativeTarget && !n.currentAnimation && (n.isProjectionDirty = !0, n.relativeTarget[g].max = n.relativeTarget[g].min + S);
    });
    const d = Al();
    Pr(d, r, a.layoutBox);
    const h = Al();
    c ? Pr(h, n.applyTransform(s, !0), a.measuredBox) : Pr(h, r, a.layoutBox);
    const p = !BS(d);
    let m = !1;
    if (!n.resumeFrom) {
      const g = n.getClosestProjectingParent();
      if (g && !g.resumeFrom) {
        const { snapshot: v, layout: S } = g;
        if (v && S) {
          const T = n.options.layoutAnchor || void 0, E = Rt();
          ou(E, a.layoutBox, v.layoutBox, T);
          const C = Rt();
          ou(C, r, S.layoutBox, T), HS(E, C) || (m = !0), g.options.layoutRoot && (n.relativeTarget = C, n.relativeTargetOrigin = E, n.relativeParent = g);
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
function L2(n) {
  n.parent && (n.isProjecting() || (n.isProjectionDirty = n.parent.isProjectionDirty), n.isSharedProjectionDirty || (n.isSharedProjectionDirty = !!(n.isProjectionDirty || n.parent.isProjectionDirty || n.parent.isSharedProjectionDirty)), n.isTransformDirty || (n.isTransformDirty = n.parent.isTransformDirty));
}
function V2(n) {
  n.isProjectionDirty = n.isSharedProjectionDirty = n.isTransformDirty = !1;
}
function U2(n) {
  n.clearSnapshot();
}
function a0(n) {
  n.clearMeasurements();
}
function B2(n) {
  n.isLayoutDirty = !0, n.updateLayout();
}
function i0(n) {
  n.isLayoutDirty = !1;
}
function H2(n) {
  n.isAnimationBlocked && n.layout && !n.isLayoutDirty && (n.snapshot = n.layout, n.isLayoutDirty = !0);
}
function q2(n) {
  const { visualElement: a } = n.options;
  a && a.getProps().onBeforeLayoutMeasure && a.notify("BeforeLayoutMeasure"), n.resetTransform();
}
function l0(n) {
  n.finishAnimation(), n.targetDelta = n.relativeTarget = n.target = void 0, n.isProjectionDirty = !0;
}
function Y2(n) {
  n.resolveTargetDelta();
}
function k2(n) {
  n.calcProjection();
}
function G2(n) {
  n.resetSkewAndRotation();
}
function P2(n) {
  n.removeLeadSnapshot();
}
function r0(n, a, r) {
  n.translate = at(a.translate, 0, r), n.scale = at(a.scale, 1, r), n.origin = a.origin, n.originPoint = a.originPoint;
}
function s0(n, a, r, s) {
  n.min = at(a.min, r.min, s), n.max = at(a.max, r.max, s);
}
function X2(n, a, r, s) {
  s0(n.x, a.x, r.x, s), s0(n.y, a.y, r.y, s);
}
function F2(n) {
  return n.animationValues && n.animationValues.opacityExit !== void 0;
}
const Q2 = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, o0 = (n) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(n), u0 = o0("applewebkit/") && !o0("chrome/") ? Math.round : Sn;
function c0(n) {
  n.min = u0(n.min), n.max = u0(n.max);
}
function K2(n) {
  c0(n.x), c0(n.y);
}
function PS(n, a, r) {
  return n === "position" || n === "preserve-aspect" && !p2(Jv(a), Jv(r), 0.2);
}
function Z2(n) {
  return n !== n.root && n.scroll?.wasRoot;
}
const $2 = GS({
  attachResizeListener: (n, a) => Jr(n, "resize", a),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), nd = {
  current: void 0
}, XS = GS({
  measureScroll: (n) => ({
    x: n.scrollLeft,
    y: n.scrollTop
  }),
  defaultParent: () => {
    if (!nd.current) {
      const n = new $2({});
      n.mount(window), n.setOptions({ layoutScroll: !0 }), nd.current = n;
    }
    return nd.current;
  },
  resetTransform: (n, a) => {
    n.style.transform = a !== void 0 ? a : "none";
  },
  checkIsScrollRoot: (n) => window.getComputedStyle(n).position === "fixed"
}), Oh = R.createContext({
  transformPagePoint: (n) => n,
  isStatic: !1,
  reducedMotion: "never"
});
function f0(n, a) {
  if (typeof n == "function")
    return n(a);
  n != null && (n.current = a);
}
function I2(...n) {
  return (a) => {
    let r = !1;
    const s = n.map((o) => {
      const c = f0(o, a);
      return !r && typeof c == "function" && (r = !0), c;
    });
    if (r)
      return () => {
        for (let o = 0; o < s.length; o++) {
          const c = s[o];
          typeof c == "function" ? c() : f0(n[o], null);
        }
      };
  };
}
function J2(...n) {
  return R.useCallback(I2(...n), n);
}
class W2 extends R.Component {
  getSnapshotBeforeUpdate(a) {
    const r = this.props.childRef.current;
    if (ko(r) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const s = r.offsetParent, o = ko(s) && s.offsetWidth || 0, c = ko(s) && s.offsetHeight || 0, d = getComputedStyle(r), h = this.props.sizeRef.current;
      h.height = parseFloat(d.height), h.width = parseFloat(d.width), h.top = r.offsetTop, h.left = r.offsetLeft, h.right = o - h.width - h.left, h.bottom = c - h.height - h.top;
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
function eD({ children: n, isPresent: a, anchorX: r, anchorY: s, root: o, pop: c }) {
  const d = R.useId(), h = R.useRef(null), p = R.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: m } = R.useContext(Oh), g = n.props?.ref ?? n?.ref, v = J2(h, g);
  return R.useInsertionEffect(() => {
    const { width: S, height: T, top: E, left: C, right: j, bottom: O } = p.current;
    if (a || c === !1 || !h.current || !S || !T)
      return;
    const Y = r === "left" ? `left: ${C}` : `right: ${j}`, L = s === "bottom" ? `bottom: ${O}` : `top: ${E}`;
    h.current.dataset.motionPopId = d;
    const Q = document.createElement("style");
    m && (Q.nonce = m);
    const $ = o ?? document.head;
    return $.appendChild(Q), Q.sheet && Q.sheet.insertRule(`
          [data-motion-pop-id="${d}"] {
            position: absolute !important;
            width: ${S}px !important;
            height: ${T}px !important;
            ${Y}px !important;
            ${L}px !important;
          }
        `), () => {
      h.current?.removeAttribute("data-motion-pop-id"), $.contains(Q) && $.removeChild(Q);
    };
  }, [a]), b.jsx(W2, { isPresent: a, childRef: h, sizeRef: p, pop: c, children: c === !1 ? n : R.cloneElement(n, { ref: v }) });
}
const tD = ({ children: n, initial: a, isPresent: r, onExitComplete: s, custom: o, presenceAffectsLayout: c, mode: d, anchorX: h, anchorY: p, root: m }) => {
  const g = oh(nD), v = R.useId();
  let S = !0, T = R.useMemo(() => (S = !1, {
    id: v,
    initial: a,
    isPresent: r,
    custom: o,
    onExitComplete: (E) => {
      g.set(E, !0);
      for (const C of g.values())
        if (!C)
          return;
      s && s();
    },
    register: (E) => (g.set(E, !1), () => g.delete(E))
  }), [r, g, s]);
  return c && S && (T = { ...T }), R.useMemo(() => {
    g.forEach((E, C) => g.set(C, !1));
  }, [r]), R.useEffect(() => {
    !r && !g.size && s && s();
  }, [r]), n = b.jsx(eD, { pop: d === "popLayout", isPresent: r, anchorX: h, anchorY: p, root: m, children: n }), b.jsx(yu.Provider, { value: T, children: n });
};
function nD() {
  return /* @__PURE__ */ new Map();
}
function FS(n = !0) {
  const a = R.useContext(yu);
  if (a === null)
    return [!0, null];
  const { isPresent: r, onExitComplete: s, register: o } = a, c = R.useId();
  R.useEffect(() => {
    if (n)
      return o(c);
  }, [n]);
  const d = R.useCallback(() => n && s && s(c), [c, s, n]);
  return !r && s ? [!1, d] : [!0];
}
const _o = (n) => n.key || "";
function d0(n) {
  const a = [];
  return R.Children.forEach(n, (r) => {
    R.isValidElement(r) && a.push(r);
  }), a;
}
const aD = ({ children: n, custom: a, initial: r = !0, onExitComplete: s, presenceAffectsLayout: o = !0, mode: c = "sync", propagate: d = !1, anchorX: h = "left", anchorY: p = "top", root: m }) => {
  const [g, v] = FS(d), S = R.useMemo(() => d0(n), [n]), T = d && !g ? [] : S.map(_o), E = R.useRef(!0), C = R.useRef(S), j = oh(() => /* @__PURE__ */ new Map()), O = R.useRef(/* @__PURE__ */ new Set()), [Y, L] = R.useState(S), [Q, $] = R.useState(S);
  bb(() => {
    E.current = !1, C.current = S;
    for (let N = 0; N < Q.length; N++) {
      const W = _o(Q[N]);
      T.includes(W) ? (j.delete(W), O.current.delete(W)) : j.get(W) !== !0 && j.set(W, !1);
    }
  }, [Q, T.length, T.join("-")]);
  const I = [];
  if (S !== Y) {
    let N = [...S];
    for (let W = 0; W < Q.length; W++) {
      const te = Q[W], P = _o(te);
      T.includes(P) || (N.splice(W, 0, te), I.push(te));
    }
    return c === "wait" && I.length && (N = I), $(d0(N)), L(S), null;
  }
  const { forceRender: ee } = R.useContext(sh);
  return b.jsx(b.Fragment, { children: Q.map((N) => {
    const W = _o(N), te = d && !g ? !1 : S === Q || T.includes(W), P = () => {
      if (O.current.has(W))
        return;
      if (j.has(W))
        O.current.add(W), j.set(W, !0);
      else
        return;
      let G = !0;
      j.forEach((le) => {
        le || (G = !1);
      }), G && (ee?.(), $(C.current), d && v?.(), s && s());
    };
    return b.jsx(tD, { isPresent: te, initial: !E.current || r ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: c, root: m, onExitComplete: te ? void 0 : P, anchorX: h, anchorY: p, children: N }, W);
  }) });
}, QS = R.createContext({ strict: !1 }), h0 = {
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
let m0 = !1;
function iD() {
  if (m0)
    return;
  const n = {};
  for (const a in h0)
    n[a] = {
      isEnabled: (r) => h0[a].some((s) => !!r[s])
    };
  TS(n), m0 = !0;
}
function KS() {
  return iD(), Yw();
}
function lD(n) {
  const a = KS();
  for (const r in n)
    a[r] = {
      ...a[r],
      ...n[r]
    };
  TS(a);
}
const rD = /* @__PURE__ */ new Set([
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
function uu(n) {
  return n.startsWith("while") || n.startsWith("drag") && n !== "draggable" || n.startsWith("layout") || n.startsWith("onTap") || n.startsWith("onPan") || n.startsWith("onLayout") || rD.has(n);
}
let ZS = (n) => !uu(n);
function sD(n) {
  typeof n == "function" && (ZS = (a) => a.startsWith("on") ? !uu(a) : n(a));
}
try {
  sD(require("@emotion/is-prop-valid").default);
} catch {
}
function oD(n, a, r) {
  const s = {};
  for (const o in n)
    o === "values" && typeof n.values == "object" || Ot(n[o]) || (ZS(o) || r === !0 && uu(o) || !a && !uu(o) || // If trying to use native HTML drag events, forward drag listeners
    n.draggable && o.startsWith("onDrag")) && (s[o] = n[o]);
  return s;
}
const Su = /* @__PURE__ */ R.createContext({});
function uD(n, a) {
  if (bu(n)) {
    const { initial: r, animate: s } = n;
    return {
      initial: r === !1 || Ir(r) ? r : void 0,
      animate: Ir(s) ? s : void 0
    };
  }
  return n.inherit !== !1 ? a : {};
}
function cD(n) {
  const { initial: a, animate: r } = uD(n, R.useContext(Su));
  return R.useMemo(() => ({ initial: a, animate: r }), [p0(a), p0(r)]);
}
function p0(n) {
  return Array.isArray(n) ? n.join(" ") : n;
}
const _h = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function $S(n, a, r) {
  for (const s in a)
    !Ot(a[s]) && !DS(s, r) && (n[s] = a[s]);
}
function fD({ transformTemplate: n }, a) {
  return R.useMemo(() => {
    const r = _h();
    return Nh(r, a, n), Object.assign({}, r.vars, r.style);
  }, [a]);
}
function dD(n, a) {
  const r = n.style || {}, s = {};
  return $S(s, r, n), Object.assign(s, fD(n, a)), s;
}
function hD(n, a) {
  const r = {}, s = dD(n, a);
  return n.drag && n.dragListener !== !1 && (r.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = n.drag === !0 ? "none" : `pan-${n.drag === "x" ? "y" : "x"}`), n.tabIndex === void 0 && (n.onTap || n.onTapStart || n.whileTap) && (r.tabIndex = 0), r.style = s, r;
}
const IS = () => ({
  ..._h(),
  attrs: {}
});
function mD(n, a, r, s) {
  const o = R.useMemo(() => {
    const c = IS();
    return jS(c, a, zS(s), n.transformTemplate, n.style), {
      ...c.attrs,
      style: { ...c.style }
    };
  }, [a]);
  if (n.style) {
    const c = {};
    $S(c, n.style, n), o.style = { ...c, ...o.style };
  }
  return o;
}
const pD = [
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
function Lh(n) {
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
      !!(pD.indexOf(n) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(n))
    )
  );
}
function yD(n, a, r, { latestValues: s }, o, c = !1, d) {
  const p = (d ?? Lh(n) ? mD : hD)(a, s, o, n), m = oD(a, typeof n == "string", c), g = n !== R.Fragment ? { ...m, ...p, ref: r } : {}, { children: v } = a, S = R.useMemo(() => Ot(v) ? v.get() : v, [v]);
  return R.createElement(n, {
    ...g,
    children: S
  });
}
function gD({ scrapeMotionValuesFromProps: n, createRenderState: a }, r, s, o) {
  return {
    latestValues: vD(r, s, o, n),
    renderState: a()
  };
}
function vD(n, a, r, s) {
  const o = {}, c = s(n, {});
  for (const S in c)
    o[S] = Ko(c[S]);
  let { initial: d, animate: h } = n;
  const p = bu(n), m = SS(n);
  a && m && !p && n.inherit !== !1 && (d === void 0 && (d = a.initial), h === void 0 && (h = a.animate));
  let g = r ? r.initial === !1 : !1;
  g = g || d === !1;
  const v = g ? h : d;
  if (v && typeof v != "boolean" && !vu(v)) {
    const S = Array.isArray(v) ? v : [v];
    for (let T = 0; T < S.length; T++) {
      const E = Th(n, S[T]);
      if (E) {
        const { transitionEnd: C, transition: j, ...O } = E;
        for (const Y in O) {
          let L = O[Y];
          if (Array.isArray(L)) {
            const Q = g ? L.length - 1 : 0;
            L = L[Q];
          }
          L !== null && (o[Y] = L);
        }
        for (const Y in C)
          o[Y] = C[Y];
      }
    }
  }
  return o;
}
const JS = (n) => (a, r) => {
  const s = R.useContext(Su), o = R.useContext(yu), c = () => gD(n, a, s, o);
  return r ? c() : oh(c);
}, bD = /* @__PURE__ */ JS({
  scrapeMotionValuesFromProps: zh,
  createRenderState: _h
}), SD = /* @__PURE__ */ JS({
  scrapeMotionValuesFromProps: OS,
  createRenderState: IS
}), xD = Symbol.for("motionComponentSymbol");
function TD(n, a, r) {
  const s = R.useRef(r);
  R.useInsertionEffect(() => {
    s.current = r;
  });
  const o = R.useRef(null);
  return R.useCallback((c) => {
    c && n.onMount?.(c);
    const d = s.current;
    if (typeof d == "function")
      if (c) {
        const h = d(c);
        typeof h == "function" && (o.current = h);
      } else o.current ? (o.current(), o.current = null) : d(c);
    else d && (d.current = c);
    a && (c ? a.mount(c) : a.unmount());
  }, [a]);
}
const WS = R.createContext({});
function Tl(n) {
  return n && typeof n == "object" && Object.prototype.hasOwnProperty.call(n, "current");
}
function ED(n, a, r, s, o, c) {
  const { visualElement: d } = R.useContext(Su), h = R.useContext(QS), p = R.useContext(yu), m = R.useContext(Oh), g = m.reducedMotion, v = m.skipAnimations, S = R.useRef(null), T = R.useRef(!1);
  s = s || h.renderer, !S.current && s && (S.current = s(n, {
    visualState: a,
    parent: d,
    props: r,
    presenceContext: p,
    blockInitialAnimation: p ? p.initial === !1 : !1,
    reducedMotionConfig: g,
    skipAnimations: v,
    isSVG: c
  }), T.current && S.current && (S.current.manuallyAnimateOnMount = !0));
  const E = S.current, C = R.useContext(WS);
  E && !E.projection && o && (E.type === "html" || E.type === "svg") && RD(S.current, r, o, C);
  const j = R.useRef(!1);
  R.useInsertionEffect(() => {
    E && j.current && E.update(r, p);
  });
  const O = r[sS], Y = R.useRef(!!O && typeof window < "u" && !window.MotionHandoffIsComplete?.(O) && window.MotionHasOptimisedAnimation?.(O));
  return bb(() => {
    T.current = !0, E && (j.current = !0, window.MotionIsMounted = !0, E.updateFeatures(), E.scheduleRenderMicrotask(), Y.current && E.animationState && E.animationState.animateChanges());
  }), R.useEffect(() => {
    E && (!Y.current && E.animationState && E.animationState.animateChanges(), Y.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(O);
    }), Y.current = !1), E.enteringChildren = void 0);
  }), E;
}
function RD(n, a, r, s) {
  const { layoutId: o, layout: c, drag: d, dragConstraints: h, layoutScroll: p, layoutRoot: m, layoutAnchor: g, layoutCrossfade: v } = a;
  n.projection = new r(n.latestValues, a["data-framer-portal-id"] ? void 0 : e1(n.parent)), n.projection.setOptions({
    layoutId: o,
    layout: c,
    alwaysMeasureLayout: !!d || h && Tl(h),
    visualElement: n,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof c == "string" ? c : "both",
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
function ad(n, { forwardMotionProps: a = !1, type: r } = {}, s, o) {
  s && lD(s);
  const c = r ? r === "svg" : Lh(n), d = c ? SD : bD;
  function h(m, g) {
    let v;
    const S = {
      ...R.useContext(Oh),
      ...m,
      layoutId: MD(m)
    }, { isStatic: T } = S, E = cD(m), C = d(m, T);
    if (!T && typeof window < "u") {
      AD();
      const j = CD(S);
      v = j.MeasureLayout, E.visualElement = ED(n, C, S, o, j.ProjectionNode, c);
    }
    return b.jsxs(Su.Provider, { value: E, children: [v && E.visualElement ? b.jsx(v, { visualElement: E.visualElement, ...S }) : null, yD(n, m, TD(C, E.visualElement, g), C, T, a, c)] });
  }
  h.displayName = `motion.${typeof n == "string" ? n : `create(${n.displayName ?? n.name ?? ""})`}`;
  const p = R.forwardRef(h);
  return p[xD] = n, p;
}
function MD({ layoutId: n }) {
  const a = R.useContext(sh).id;
  return a && n !== void 0 ? a + "-" + n : n;
}
function AD(n, a) {
  R.useContext(QS).strict;
}
function CD(n) {
  const a = KS(), { drag: r, layout: s } = a;
  if (!r && !s)
    return {};
  const o = { ...r, ...s };
  return {
    MeasureLayout: r?.isEnabled(n) || s?.isEnabled(n) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function wD(n, a) {
  if (typeof Proxy > "u")
    return ad;
  const r = /* @__PURE__ */ new Map(), s = (c, d) => ad(c, d, n, a), o = (c, d) => s(c, d);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (c, d) => d === "create" ? s : (r.has(d) || r.set(d, ad(d, void 0, n, a)), r.get(d))
  });
}
const DD = (n, a) => a.isSVG ?? Lh(n) ? new i2(a) : new Jw(a, {
  allowProjection: n !== R.Fragment
});
class jD extends Wa {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = u2(a));
  }
  updateAnimationControlsSubscription() {
    const { animate: a } = this.node.getProps();
    vu(a) && (this.unmountControls = a.subscribe(this.node));
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
let ND = 0;
class zD extends Wa {
  constructor() {
    super(...arguments), this.id = ND++, this.isExitComplete = !1;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: a, onExitComplete: r } = this.node.presenceContext, { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || a === s)
      return;
    if (a && s === !1) {
      if (this.isExitComplete) {
        const { initial: c, custom: d } = this.node.getProps();
        if (typeof c == "string") {
          const h = Di(this.node, c, d);
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
const OD = {
  animation: {
    Feature: jD
  },
  exit: {
    Feature: zD
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
const _D = (n) => (a) => Ah(a) && n(a, us(a));
function Xr(n, a, r, s) {
  return Jr(n, a, _D(r), s);
}
const t1 = ({ current: n }) => n ? n.ownerDocument.defaultView : null, y0 = (n, a) => Math.abs(n - a);
function LD(n, a) {
  const r = y0(n.x, a.x), s = y0(n.y, a.y);
  return Math.sqrt(r ** 2 + s ** 2);
}
const g0 = /* @__PURE__ */ new Set(["auto", "scroll"]);
class n1 {
  constructor(a, r, { transformPagePoint: s, contextWindow: o = window, dragSnapToOrigin: c = !1, distanceThreshold: d = 3, element: h } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (T) => {
      this.handleScroll(T.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = Lo(this.lastRawMoveEventInfo, this.transformPagePoint));
      const T = id(this.lastMoveEventInfo, this.history), E = this.startEvent !== null, C = LD(T.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!E && !C)
        return;
      const { point: j } = T, { timestamp: O } = zt;
      this.history.push({ ...j, timestamp: O });
      const { onStart: Y, onMove: L } = this.handlers;
      E || (Y && Y(this.lastMoveEvent, T), this.startEvent = this.lastMoveEvent), L && L(this.lastMoveEvent, T);
    }, this.handlePointerMove = (T, E) => {
      this.lastMoveEvent = T, this.lastRawMoveEventInfo = E, this.lastMoveEventInfo = Lo(E, this.transformPagePoint), Je.update(this.updatePoint, !0);
    }, this.handlePointerUp = (T, E) => {
      this.end();
      const { onEnd: C, onSessionEnd: j, resumeAnimation: O } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && O && O(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const Y = id(T.type === "pointercancel" ? this.lastMoveEventInfo : Lo(E, this.transformPagePoint), this.history);
      this.startEvent && C && C(T, Y), j && j(T, Y);
    }, !Ah(a))
      return;
    this.dragSnapToOrigin = c, this.handlers = r, this.transformPagePoint = s, this.distanceThreshold = d, this.contextWindow = o || window;
    const p = us(a), m = Lo(p, this.transformPagePoint), { point: g } = m, { timestamp: v } = zt;
    this.history = [{ ...g, timestamp: v }];
    const { onSessionStart: S } = r;
    S && S(a, id(m, this.history)), this.removeListeners = rs(Xr(this.contextWindow, "pointermove", this.handlePointerMove), Xr(this.contextWindow, "pointerup", this.handlePointerUp), Xr(this.contextWindow, "pointercancel", this.handlePointerUp)), h && this.startScrollTracking(h);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(a) {
    let r = a.parentElement;
    for (; r; ) {
      const s = getComputedStyle(r);
      (g0.has(s.overflowX) || g0.has(s.overflowY)) && this.scrollPositions.set(r, {
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
    }, c = { x: o.x - r.x, y: o.y - r.y };
    c.x === 0 && c.y === 0 || (s ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += c.x, this.lastMoveEventInfo.point.y += c.y) : this.history.length > 0 && (this.history[0].x -= c.x, this.history[0].y -= c.y), this.scrollPositions.set(a, o), Je.update(this.updatePoint, !0));
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
function v0(n, a) {
  return { x: n.x - a.x, y: n.y - a.y };
}
function id({ point: n }, a) {
  return {
    point: n,
    delta: v0(n, a1(a)),
    offset: v0(n, VD(a)),
    velocity: UD(a, 0.1)
  };
}
function VD(n) {
  return n[0];
}
function a1(n) {
  return n[n.length - 1];
}
function UD(n, a) {
  if (n.length < 2)
    return { x: 0, y: 0 };
  let r = n.length - 1, s = null;
  const o = a1(n);
  for (; r >= 0 && (s = n[r], !(o.timestamp - s.timestamp > /* @__PURE__ */ It(a))); )
    r--;
  if (!s)
    return { x: 0, y: 0 };
  s === n[0] && n.length > 2 && o.timestamp - s.timestamp > /* @__PURE__ */ It(a) * 2 && (s = n[1]);
  const c = /* @__PURE__ */ vn(o.timestamp - s.timestamp);
  if (c === 0)
    return { x: 0, y: 0 };
  const d = {
    x: (o.x - s.x) / c,
    y: (o.y - s.y) / c
  };
  return d.x === 1 / 0 && (d.x = 0), d.y === 1 / 0 && (d.y = 0), d;
}
function BD(n, { min: a, max: r }, s) {
  return a !== void 0 && n < a ? n = s ? at(a, n, s.min) : Math.max(n, a) : r !== void 0 && n > r && (n = s ? at(r, n, s.max) : Math.min(n, r)), n;
}
function b0(n, a, r) {
  return {
    min: a !== void 0 ? n.min + a : void 0,
    max: r !== void 0 ? n.max + r - (n.max - n.min) : void 0
  };
}
function HD(n, { top: a, left: r, bottom: s, right: o }) {
  return {
    x: b0(n.x, r, o),
    y: b0(n.y, a, s)
  };
}
function S0(n, a) {
  let r = a.min - n.min, s = a.max - n.max;
  return a.max - a.min < n.max - n.min && ([r, s] = [s, r]), { min: r, max: s };
}
function qD(n, a) {
  return {
    x: S0(n.x, a.x),
    y: S0(n.y, a.y)
  };
}
function YD(n, a) {
  let r = 0.5;
  const s = kt(n), o = kt(a);
  return o > s ? r = /* @__PURE__ */ Zr(a.min, a.max - s, n.min) : s > o && (r = /* @__PURE__ */ Zr(n.min, n.max - o, a.min)), Pn(0, 1, r);
}
function kD(n, a) {
  const r = {};
  return a.min !== void 0 && (r.min = a.min - n.min), a.max !== void 0 && (r.max = a.max - n.min), r;
}
const Hd = 0.35;
function GD(n = Hd) {
  return n === !1 ? n = 0 : n === !0 && (n = Hd), {
    x: x0(n, "left", "right"),
    y: x0(n, "top", "bottom")
  };
}
function x0(n, a, r) {
  return {
    min: T0(n, a),
    max: T0(n, r)
  };
}
function T0(n, a) {
  return typeof n == "number" ? n : n[a] || 0;
}
const PD = /* @__PURE__ */ new WeakMap();
class XD {
  constructor(a) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = Rt(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = a;
  }
  start(a, { snapToCursor: r = !1, distanceThreshold: s } = {}) {
    const { presenceContext: o } = this.visualElement;
    if (o && o.isPresent === !1)
      return;
    const c = (v) => {
      r && this.snapToCursor(us(v).point), this.stopAnimation();
    }, d = (v, S) => {
      const { drag: T, dragPropagation: E, onDragStart: C } = this.getProps();
      if (T && !E && (this.openDragLock && this.openDragLock(), this.openDragLock = vw(T), !this.openDragLock))
        return;
      this.latestPointerEvent = v, this.latestPanInfo = S, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), qn((O) => {
        let Y = this.getAxisMotionValue(O).get() || 0;
        if (kn.test(Y)) {
          const { projection: L } = this.visualElement;
          if (L && L.layout) {
            const Q = L.layout.layoutBox[O];
            Q && (Y = kt(Q) * (parseFloat(Y) / 100));
          }
        }
        this.originPoint[O] = Y;
      }), C && Je.update(() => C(v, S), !1, !0), Nd(this.visualElement, "transform");
      const { animationState: j } = this.visualElement;
      j && j.setActive("whileDrag", !0);
    }, h = (v, S) => {
      this.latestPointerEvent = v, this.latestPanInfo = S;
      const { dragPropagation: T, dragDirectionLock: E, onDirectionLock: C, onDrag: j } = this.getProps();
      if (!T && !this.openDragLock)
        return;
      const { offset: O } = S;
      if (E && this.currentDirection === null) {
        this.currentDirection = QD(O), this.currentDirection !== null && C && C(this.currentDirection);
        return;
      }
      this.updateAxis("x", S.point, O), this.updateAxis("y", S.point, O), this.visualElement.render(), j && Je.update(() => j(v, S), !1, !0);
    }, p = (v, S) => {
      this.latestPointerEvent = v, this.latestPanInfo = S, this.stop(v, S), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, m = () => {
      const { dragSnapToOrigin: v } = this.getProps();
      (v || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: g } = this.getProps();
    this.panSession = new n1(a, {
      onSessionStart: c,
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
    const s = a || this.latestPointerEvent, o = r || this.latestPanInfo, c = this.isDragging;
    if (this.cancel(), !c || !o || !s)
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
    const c = this.getAxisMotionValue(a);
    let d = this.originPoint[a] + s[a];
    this.constraints && this.constraints[a] && (d = BD(d, this.constraints[a], this.elastic[a])), c.set(d);
  }
  resolveConstraints() {
    const { dragConstraints: a, dragElastic: r } = this.getProps(), s = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, o = this.constraints;
    a && Tl(a) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : a && s ? this.constraints = HD(s.layoutBox, a) : this.constraints = !1, this.elastic = GD(r), o !== this.constraints && !Tl(a) && s && this.constraints && !this.hasMutatedConstraints && qn((c) => {
      this.constraints !== !1 && this.getAxisMotionValue(c) && (this.constraints[c] = kD(s.layoutBox[c], this.constraints[c]));
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
    const c = Fw(s, o.root, this.visualElement.getTransformPagePoint());
    let d = qD(o.layout.layoutBox, c);
    if (r) {
      const h = r(Gw(d));
      this.hasMutatedConstraints = !!h, h && (d = RS(h));
    }
    return d;
  }
  startAnimation(a) {
    const { drag: r, dragMomentum: s, dragElastic: o, dragTransition: c, dragSnapToOrigin: d, onDragTransitionEnd: h } = this.getProps(), p = this.constraints || {}, m = qn((g) => {
      if (!Vo(g, r, this.currentDirection))
        return;
      let v = p && p[g] || {};
      (d === !0 || d === g) && (v = { min: 0, max: 0 });
      const S = o ? 200 : 1e6, T = o ? 40 : 1e7, E = {
        type: "inertia",
        velocity: s ? a[g] : 0,
        bounceStiffness: S,
        bounceDamping: T,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...c,
        ...v
      };
      return this.startAxisValueAnimation(g, E);
    });
    return Promise.all(m).then(h);
  }
  startAxisValueAnimation(a, r) {
    const s = this.getAxisMotionValue(a);
    return Nd(this.visualElement, a), s.start(xh(a, s, 0, r, this.visualElement, !1));
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
      const { projection: o } = this.visualElement, c = this.getAxisMotionValue(r);
      if (o && o.layout) {
        const { min: d, max: h } = o.layout.layoutBox[r], p = c.get() || 0;
        c.set(a[r] - at(d, h, 0.5) + p);
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
        o[d] = YD({ min: p, max: p }, this.constraints[d]);
      }
    });
    const { transformTemplate: c } = this.visualElement.getProps();
    this.visualElement.current.style.transform = c ? c({}, "") : "none", s.root && s.root.updateScroll(), s.updateLayout(), this.constraints = !1, this.resolveConstraints(), qn((d) => {
      if (!Vo(d, a, null))
        return;
      const h = this.getAxisMotionValue(d), { min: p, max: m } = this.constraints[d];
      h.set(at(p, m, o[d]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    PD.set(this.visualElement, this);
    const a = this.visualElement.current, r = Xr(a, "pointerdown", (m) => {
      const { drag: g, dragListener: v = !0 } = this.getProps(), S = m.target, T = S !== a && Rw(S);
      g && v && !T && this.start(m);
    });
    let s;
    const o = () => {
      const { dragConstraints: m } = this.getProps();
      Tl(m) && m.current && (this.constraints = this.resolveRefConstraints(), s || (s = FD(a, m.current, () => this.scalePositionWithinConstraints())));
    }, { projection: c } = this.visualElement, d = c.addEventListener("measure", o);
    c && !c.layout && (c.root && c.root.updateScroll(), c.updateLayout()), Je.read(o);
    const h = Jr(window, "resize", () => this.scalePositionWithinConstraints()), p = c.addEventListener("didUpdate", (({ delta: m, hasLayoutChanged: g }) => {
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
    const a = this.visualElement.getProps(), { drag: r = !1, dragDirectionLock: s = !1, dragPropagation: o = !1, dragConstraints: c = !1, dragElastic: d = Hd, dragMomentum: h = !0 } = a;
    return {
      ...a,
      drag: r,
      dragDirectionLock: s,
      dragPropagation: o,
      dragConstraints: c,
      dragElastic: d,
      dragMomentum: h
    };
  }
}
function E0(n) {
  let a = !0;
  return () => {
    if (a) {
      a = !1;
      return;
    }
    n();
  };
}
function FD(n, a, r) {
  const s = jv(n, E0(r)), o = jv(a, E0(r));
  return () => {
    s(), o();
  };
}
function Vo(n, a, r) {
  return (a === !0 || a === n) && (r === null || r === n);
}
function QD(n, a = 10) {
  let r = null;
  return Math.abs(n.y) > a ? r = "y" : Math.abs(n.x) > a && (r = "x"), r;
}
class KD extends Wa {
  constructor(a) {
    super(a), this.removeGroupControls = Sn, this.removeListeners = Sn, this.controls = new XD(a);
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
const ld = (n) => (a, r) => {
  n && Je.update(() => n(a, r), !1, !0);
};
class ZD extends Wa {
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
      onSessionStart: ld(a),
      onStart: ld(r),
      onMove: ld(s),
      onEnd: (c, d) => {
        delete this.session, o && Je.postRender(() => o(c, d));
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
let rd = !1;
class $D extends R.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: a, layoutGroup: r, switchLayoutGroup: s, layoutId: o } = this.props, { projection: c } = a;
    c && (r.group && r.group.add(c), s && s.register && o && s.register(c), rd && c.root.didUpdate(), c.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), c.setOptions({
      ...c.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), Zo.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(a) {
    const { layoutDependency: r, visualElement: s, drag: o, isPresent: c } = this.props, { projection: d } = s;
    return d && (d.isPresent = c, a.layoutDependency !== r && d.setOptions({
      ...d.options,
      layoutDependency: r
    }), rd = !0, o || a.layoutDependency !== r || r === void 0 || a.isPresent !== c ? d.willUpdate() : this.safeToRemove(), a.isPresent !== c && (c ? d.promote() : d.relegate() || Je.postRender(() => {
      const h = d.getStack();
      (!h || !h.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { visualElement: a, layoutAnchor: r } = this.props, { projection: s } = a;
    s && (s.options.layoutAnchor = r, s.root.didUpdate(), Mh.postRender(() => {
      !s.currentAnimation && s.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: a, layoutGroup: r, switchLayoutGroup: s } = this.props, { projection: o } = a;
    rd = !0, o && (o.scheduleCheckAfterUnmount(), r && r.group && r.group.remove(o), s && s.deregister && s.deregister(o));
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
  const [a, r] = FS(), s = R.useContext(sh);
  return b.jsx($D, { ...n, layoutGroup: s, switchLayoutGroup: R.useContext(WS), isPresent: a, safeToRemove: r });
}
const ID = {
  pan: {
    Feature: ZD
  },
  drag: {
    Feature: KD,
    ProjectionNode: XS,
    MeasureLayout: i1
  }
};
function R0(n, a, r) {
  const { props: s } = n;
  n.animationState && s.whileHover && n.animationState.setActive("whileHover", r === "Start");
  const o = "onHover" + r, c = s[o];
  c && Je.postRender(() => c(a, us(a)));
}
class JD extends Wa {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = Sw(a, (r, s) => (R0(this.node, s, "Start"), (o) => R0(this.node, o, "End"))));
  }
  unmount() {
  }
}
class WD extends Wa {
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
function M0(n, a, r) {
  const { props: s } = n;
  if (n.current instanceof HTMLButtonElement && n.current.disabled)
    return;
  n.animationState && s.whileTap && n.animationState.setActive("whileTap", r === "Start");
  const o = "onTap" + (r === "End" ? "" : r), c = s[o];
  c && Je.postRender(() => c(a, us(a)));
}
class ej extends Wa {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: r, propagate: s } = this.node.props;
    this.unmount = Aw(a, (o, c) => (M0(this.node, c, "Start"), (d, { success: h }) => M0(this.node, d, h ? "End" : "Cancel")), {
      useGlobalTarget: r,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const qd = /* @__PURE__ */ new WeakMap(), sd = /* @__PURE__ */ new WeakMap(), tj = (n) => {
  const a = qd.get(n.target);
  a && a(n);
}, nj = (n) => {
  n.forEach(tj);
};
function aj({ root: n, ...a }) {
  const r = n || document;
  sd.has(r) || sd.set(r, {});
  const s = sd.get(r), o = JSON.stringify(a);
  return s[o] || (s[o] = new IntersectionObserver(nj, { root: n, ...a })), s[o];
}
function ij(n, a, r) {
  const s = aj(a);
  return qd.set(n, r), s.observe(n), () => {
    qd.delete(n), s.unobserve(n);
  };
}
const lj = {
  some: 0,
  all: 1
};
class rj extends Wa {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: r, margin: s, amount: o = "some", once: c } = a, d = {
      root: r ? r.current : void 0,
      rootMargin: s,
      threshold: typeof o == "number" ? o : lj[o]
    }, h = (p) => {
      const { isIntersecting: m } = p;
      if (this.isInView === m || (this.isInView = m, c && !m && this.hasEnteredView))
        return;
      m && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", m);
      const { onViewportEnter: g, onViewportLeave: v } = this.node.getProps(), S = m ? g : v;
      S && S(p);
    };
    this.stopObserver = ij(this.node.current, d, h);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: r } = this.node;
    ["amount", "margin", "root"].some(sj(a, r)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function sj({ viewport: n = {} }, { viewport: a = {} } = {}) {
  return (r) => n[r] !== a[r];
}
const oj = {
  inView: {
    Feature: rj
  },
  tap: {
    Feature: ej
  },
  focus: {
    Feature: WD
  },
  hover: {
    Feature: JD
  }
}, uj = {
  layout: {
    ProjectionNode: XS,
    MeasureLayout: i1
  }
}, cj = {
  ...OD,
  ...oj,
  ...ID,
  ...uj
}, Vh = /* @__PURE__ */ wD(cj, DD);
function fj() {
  !jh.current && xS();
  const [n] = R.useState(lu.current);
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
function dj({ vector: n, pulseKey: a, size: r = 220 }) {
  const s = fj(), o = r / 2, c = r / 2, d = r / 2 - 28, h = Vr.length, p = Vr.map((v, S) => {
    const T = -Math.PI / 2 + 2 * Math.PI * S / h, E = Math.max(0, Math.min(1, n[S] ?? 0));
    return { x: o + Math.cos(T) * d * E, y: c + Math.sin(T) * d * E };
  }), m = Vr.map((v, S) => {
    const T = -Math.PI / 2 + 2 * Math.PI * S / h;
    return { x: o + Math.cos(T) * d, y: c + Math.sin(T) * d, angle: T };
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
              points: m.map((S) => `${o + (S.x - o) * v},${c + (S.y - c) * v}`).join(" ")
            },
            v
          )),
          m.map((v, S) => /* @__PURE__ */ b.jsx("line", { x1: o, y1: c, x2: v.x, y2: v.y }, S))
        ] }),
        /* @__PURE__ */ b.jsx(
          Vh.polygon,
          {
            points: g,
            fill: "currentColor",
            fillOpacity: 0.32,
            stroke: "currentColor",
            strokeWidth: 1.5,
            initial: s || a === void 0 ? !1 : { scale: 0.92, opacity: 0.2 },
            animate: { scale: 1, opacity: 1 },
            style: { transformOrigin: `${o}px ${c}px` },
            transition: s ? { duration: 0 } : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }
          },
          a ?? "static"
        ),
        m.map((v, S) => /* @__PURE__ */ b.jsx(
          "text",
          {
            x: o + Math.cos(v.angle) * (d + 16),
            y: c + Math.sin(v.angle) * (d + 16) + 3,
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
const hj = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function mj({ vector: n, onChange: a, disabled: r = !1 }) {
  const s = (o, c) => {
    const d = Math.max(0, Math.min(1, Number.isFinite(c) ? c : 0)), h = [...n];
    h[o] = d, a(h);
  };
  return /* @__PURE__ */ b.jsx("div", { className: tA, role: "group", "aria-label": "Emotion axes", children: hj.map((o, c) => /* @__PURE__ */ b.jsxs("div", { className: nA, children: [
    /* @__PURE__ */ b.jsx("label", { htmlFor: `emo-slider-${c}`, className: yb, children: o }),
    /* @__PURE__ */ b.jsx(
      "input",
      {
        id: `emo-slider-${c}`,
        type: "range",
        min: 0,
        max: 1,
        step: 0.01,
        value: n[c] ?? 0,
        disabled: r,
        onChange: (d) => s(c, Number(d.currentTarget.value)),
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": n[c] ?? 0,
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
        value: Number((n[c] ?? 0).toFixed(2)),
        disabled: r,
        onChange: (d) => s(c, Number(d.currentTarget.value)),
        className: vb,
        "aria-label": `${o} numeric value`
      }
    )
  ] }, o)) });
}
const pj = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
], l1 = [0, 0, 0, 0, 0, 0, 0, 0], yj = `Per-line overrides (inside the [Char|…] tag):

  [Bob|emotion_vector:happy=0.7,surprised=0.2]  text…
  [Alice|qwen:Friendly teen voice]              text…
  [Carol:happy_sarah]                           text…   (legacy compat ref)

Precedence (highest wins): inline → legacy compat ref → mapping default → global panel.
Global alpha applies to every line unless a mapping overrides it.`;
function gj({ value: n, onChange: a, deploymentId: r }) {
  const s = n.mode ?? "none", o = vj(n.vector), c = n.emotionAlpha ?? 1, [d, h] = R.useState([]), [p, m] = R.useState(null), [g, v] = R.useState(""), [S, T] = R.useState(""), [E, C] = R.useState(0), [j, O] = R.useState(!1), Y = R.useRef(!0);
  R.useEffect(() => (Y.current = !0, () => {
    Y.current = !1;
  }), []), R.useEffect(() => {
    let G = !1;
    return m(null), FM(r).then((le) => {
      G || h(A0(le.presets));
    }).catch((le) => {
      G || m(od(le));
    }), () => {
      G = !0;
    };
  }, [r]);
  const L = R.useMemo(
    () => d.find((G) => G.presetId === S) ?? null,
    [d, S]
  ), Q = (G) => {
    a({ ...n, mode: G });
  }, $ = (G) => {
    a({ ...n, mode: "emotion_vector", vector: G }), L && !Sj(L.vector, G) && T("");
  }, I = (G) => {
    const le = Math.max(0, Math.min(1, Number.isFinite(G) ? G : 1));
    a({ ...n, emotionAlpha: le });
  }, ee = (G) => {
    const le = d.find((de) => de.presetId === G);
    le && (T(G), a({ ...n, mode: "emotion_vector", vector: le.vector }), C((de) => de + 1));
  }, N = async () => {
    const G = g.trim();
    if (G) {
      O(!0), m(null);
      try {
        const le = await QM(r, G, o);
        if (!Y.current) return;
        h((de) => A0([le, ...de.filter((se) => se.presetId !== le.presetId)])), T(le.presetId), v(""), C((de) => de + 1);
      } catch (le) {
        Y.current && m(od(le));
      } finally {
        Y.current && O(!1);
      }
    }
  }, W = async (G) => {
    const le = d;
    h((de) => de.filter((se) => se.presetId !== G)), S === G && T("");
    try {
      await KM(G);
    } catch (de) {
      Y.current && (h(le), m(od(de)));
    }
  }, te = () => $(l1), P = () => {
    const G = Array.from({ length: 8 }, () => Math.round(Math.random() * 100) / 100);
    $(G), C((le) => le + 1);
  };
  return /* @__PURE__ */ b.jsxs("div", { className: ZM, children: [
    /* @__PURE__ */ b.jsxs("div", { className: $M, children: [
      /* @__PURE__ */ b.jsx(dj, { vector: o, pulseKey: E }),
      /* @__PURE__ */ b.jsx("span", { className: Xf, children: xj(s, L?.presetName) })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: IM, children: [
      /* @__PURE__ */ b.jsx("div", { className: JM, role: "radiogroup", "aria-label": "Emotion source", children: pj.map((G) => /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": s === G.id,
          className: s === G.id ? eA : WM,
          onClick: () => Q(G.id),
          children: G.label
        },
        G.id
      )) }),
      s === "emotion_vector" && /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
        /* @__PURE__ */ b.jsxs("div", { className: aA, children: [
          /* @__PURE__ */ b.jsxs(
            "select",
            {
              className: iA,
              value: S,
              onChange: (G) => ee(G.currentTarget.value),
              "aria-label": "Load preset",
              children: [
                /* @__PURE__ */ b.jsx("option", { value: "", children: "— Load preset —" }),
                d.map((G) => /* @__PURE__ */ b.jsx("option", { value: G.presetId, children: G.presetName }, G.presetId))
              ]
            }
          ),
          S && /* @__PURE__ */ b.jsx(
            "button",
            {
              type: "button",
              className: rA,
              onClick: () => void W(S),
              disabled: j,
              children: "Delete preset"
            }
          ),
          /* @__PURE__ */ b.jsx("button", { type: "button", className: sv, onClick: te, children: "Reset" }),
          /* @__PURE__ */ b.jsx("button", { type: "button", className: sv, onClick: P, children: "Random" })
        ] }),
        /* @__PURE__ */ b.jsx(mj, { vector: o, onChange: $ }),
        /* @__PURE__ */ b.jsxs(
          "form",
          {
            className: uA,
            onSubmit: (G) => {
              G.preventDefault(), N();
            },
            children: [
              /* @__PURE__ */ b.jsx(
                "input",
                {
                  type: "text",
                  className: cA,
                  value: g,
                  placeholder: "Name current vector",
                  onChange: (G) => v(G.currentTarget.value),
                  maxLength: 120,
                  "aria-label": "Preset name"
                }
              ),
              /* @__PURE__ */ b.jsx(
                "button",
                {
                  type: "submit",
                  className: lA,
                  disabled: j || g.trim().length === 0,
                  children: "Save preset"
                }
              )
            ]
          }
        )
      ] }),
      s === "qwen_template" && /* @__PURE__ */ b.jsxs("label", { children: [
        /* @__PURE__ */ b.jsxs("span", { className: Xf, children: [
          "Qwen template — use ",
          "{seg}",
          " for the line text."
        ] }),
        /* @__PURE__ */ b.jsx(
          "textarea",
          {
            className: oA,
            value: n.qwenTemplate ?? "",
            onChange: (G) => a({ ...n, mode: "qwen_template", qwenTemplate: G.currentTarget.value }),
            rows: 4
          }
        )
      ] }),
      s === "audio_ref" && /* @__PURE__ */ b.jsx("p", { className: Xf, children: "Audio references are attached per character in the mapping editor — the global panel only toggles the mode." }),
      s !== "none" && /* @__PURE__ */ b.jsxs("div", { className: sA, children: [
        /* @__PURE__ */ b.jsx("span", { className: yb, children: "alpha" }),
        /* @__PURE__ */ b.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 1,
            step: 0.01,
            value: c,
            className: gb,
            onChange: (G) => I(Number(G.currentTarget.value)),
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
            value: Number(c.toFixed(2)),
            className: vb,
            onChange: (G) => I(Number(G.currentTarget.value)),
            "aria-label": "Emotion alpha numeric"
          }
        )
      ] }),
      p && /* @__PURE__ */ b.jsx("p", { className: fA, children: p }),
      /* @__PURE__ */ b.jsx("pre", { className: dA, children: yj })
    ] })
  ] });
}
function vj(n) {
  return !n || n.length !== 8 ? [...l1] : n.map((a) => bj(a));
}
function bj(n) {
  return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 0;
}
function Sj(n, a) {
  for (let r = 0; r < 8; r += 1) {
    const s = n[r] ?? 0, o = a[r] ?? 0;
    if (Math.abs(s - o) > 1e-6) return !1;
  }
  return !0;
}
function A0(n) {
  return [...n].sort((a, r) => r.updatedAt - a.updatedAt);
}
function xj(n, a) {
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
function od(n) {
  return n instanceof Oi ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
const ud = [
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
function Tj({
  outputFormat: n,
  onOutputFormatChange: a,
  speedFactor: r,
  onSpeedFactorChange: s,
  cachePolicy: o,
  onCachePolicyChange: c,
  generation: d,
  onGenerationChange: h
}) {
  const p = (g, v) => {
    h({ ...d, [g]: v });
  }, m = ud.find((g) => g.id === o) ?? ud[0];
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
          ud.map((g) => /* @__PURE__ */ b.jsx(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": o === g.id,
              className: o === g.id ? Wo : $a,
              onClick: () => c(g.id),
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
const Ej = ["cancelled", "failed", "partial"];
function Rj({ runs: n, deploymentId: a }) {
  const r = zi(), [s, o] = R.useState(null), [c, d] = R.useState(null);
  if (n.length === 0)
    return /* @__PURE__ */ b.jsx("p", { className: $t, children: "No runs yet." });
  const h = async (p) => {
    o(p), d(null);
    try {
      const { runId: m } = await ih(a, p);
      r(`/${a}/runs/${m}`);
    } catch (m) {
      d(Aj(m));
    } finally {
      o(null);
    }
  };
  return /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    c && /* @__PURE__ */ b.jsx("p", { className: Kr, children: c }),
    /* @__PURE__ */ b.jsx("ul", { className: gd, children: n.map((p) => {
      const m = Ej.includes(p.status) && p.kind === "batch";
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
          /* @__PURE__ */ b.jsx("span", { className: Mj(p.status), children: "partial — resumable" }),
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
function Mj(n) {
  return n === "failed" ? rh : lh;
}
function Aj(n) {
  return n instanceof Oi ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
function Cj({ deploymentId: n, initialVoiceAssetId: a, onChange: r }) {
  const [s, o] = R.useState([]), [c, d] = R.useState(a ?? "");
  R.useEffect(() => {
    Jo(n).then(({ voiceAssets: p }) => o(p)).catch(() => o([]));
  }, [n]);
  async function h(p) {
    const m = p.target.value || null;
    d(m ?? ""), await $R(n, m), r?.(m);
  }
  return /* @__PURE__ */ b.jsxs("select", { value: c, onChange: h, children: [
    /* @__PURE__ */ b.jsx("option", { value: "", children: "— choose voice —" }),
    s.map((p) => /* @__PURE__ */ b.jsx("option", { value: p.voiceAssetId, children: p.displayName }, p.voiceAssetId))
  ] });
}
function wj(n) {
  const a = zi(), [r, s] = R.useState("idle"), [o, c] = R.useState(null), [d, h] = R.useState(/* @__PURE__ */ new Map()), [p, m] = R.useState(null), [g, v] = R.useState(null), S = R.useRef(null);
  R.useEffect(() => () => {
    S.current?.();
  }, []);
  const T = R.useCallback(async () => {
    s("starting"), m(null), h(/* @__PURE__ */ new Map()), v(null);
    try {
      const I = await nM(n.deploymentId, n.createPayload);
      c(I.runId), s("running"), S.current?.(), S.current = rv(
        n.deploymentId,
        I.runId,
        (ee) => C0(ee, h, s, v, n.deploymentId, I.runId),
        () => s("error")
      );
    } catch (I) {
      s("error"), m(cd(I));
    }
  }, [n.deploymentId, n.createPayload]), E = R.useCallback(async () => {
    if (o)
      try {
        await aM(n.deploymentId, o);
      } catch (I) {
        m(cd(I));
      }
  }, [n.deploymentId, o]), C = Array.from(d.values()).sort((I, ee) => I.globalIndex - ee.globalIndex), j = r === "starting" || r === "running", O = g?.status === "partial", Y = C.filter((I) => I.status === "failed"), L = (() => {
    if (r !== "terminal" || Y.length === 0) return null;
    const I = /* @__PURE__ */ new Map();
    for (const te of Y) {
      const P = te.failureCategory ?? "unknown";
      I.set(P, (I.get(P) ?? 0) + 1);
    }
    let ee = "unknown", N = 0;
    for (const [te, P] of I)
      P > N && (ee = te, N = P);
    const W = C.length;
    return { category: ee, count: N, total: W };
  })(), Q = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, $ = p?.toLowerCase().includes("unmapped") ?? !1;
  return /* @__PURE__ */ b.jsxs("div", { children: [
    p && /* @__PURE__ */ b.jsxs(
      "div",
      {
        className: Kr,
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
          $ && /* @__PURE__ */ b.jsx(
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
          className: Wo,
          disabled: !n.canGenerate || j,
          onClick: T,
          children: r === "running" ? "Running…" : "Generate + Export ZIP"
        }
      ),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: db,
          disabled: !j,
          onClick: E,
          children: "Cancel"
        }
      )
    ] }),
    L && /* @__PURE__ */ b.jsxs("div", { className: Kr, role: "alert", children: [
      /* @__PURE__ */ b.jsxs("strong", { children: [
        "Run failed — ",
        L.count,
        " of ",
        L.total,
        " segments failed with ",
        /* @__PURE__ */ b.jsx("code", { children: L.category })
      ] }),
      Q[L.category] && /* @__PURE__ */ b.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: Q[L.category] })
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
    O && g && /* @__PURE__ */ b.jsxs("div", { className: hb, style: { display: "flex", alignItems: "center", gap: 12 }, children: [
      /* @__PURE__ */ b.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: $a,
          onClick: async () => {
            try {
              const I = await ih(n.deploymentId, g.runId);
              c(I.runId), h(/* @__PURE__ */ new Map()), v(null), s("running"), S.current?.(), S.current = rv(
                n.deploymentId,
                I.runId,
                (ee) => C0(ee, h, s, v, n.deploymentId, I.runId),
                () => s("error")
              );
            } catch (I) {
              m(cd(I)), s("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    C.length > 0 && /* @__PURE__ */ b.jsxs("table", { className: qM, children: [
      /* @__PURE__ */ b.jsx("thead", { children: /* @__PURE__ */ b.jsxs("tr", { children: [
        /* @__PURE__ */ b.jsx("th", { className: Ga, children: "#" }),
        /* @__PURE__ */ b.jsx("th", { className: Ga, children: "Status" }),
        /* @__PURE__ */ b.jsx("th", { className: Ga, children: "Duration" }),
        /* @__PURE__ */ b.jsx("th", { className: Ga, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ b.jsx("tbody", { children: C.map((I) => /* @__PURE__ */ b.jsxs("tr", { className: YM, children: [
        /* @__PURE__ */ b.jsx("td", { className: Ga, children: I.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ b.jsx("td", { className: Ga, children: /* @__PURE__ */ b.jsx("span", { className: Dj(I.status), children: I.status }) }),
        /* @__PURE__ */ b.jsx("td", { className: Ga, children: I.durationMs ? `${I.durationMs} ms` : "—" }),
        /* @__PURE__ */ b.jsx("td", { className: Ga, children: I.failureCategory ?? "" })
      ] }, I.globalIndex)) })
    ] })
  ] });
}
async function C0(n, a, r, s, o, c) {
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
        const d = await ah(o, c);
        s(d);
      } catch {
      }
      return;
  }
}
function Dj(n) {
  switch (n) {
    case "completed":
      return pb;
    case "running":
      return lh;
    case "failed":
      return rh;
    default:
      return mb;
  }
}
function cd(n) {
  return n instanceof Oi || n instanceof Error ? n.message : "unknown error";
}
function jj(n) {
  const a = zi(), { attributions: r, unresolved: s, predictedFilenames: o } = R.useMemo(
    () => Nj(n.value, n.outputFormat, n.mappings),
    [n.value, n.outputFormat, n.mappings]
  );
  return /* @__PURE__ */ b.jsxs("div", { children: [
    /* @__PURE__ */ b.jsx(
      "textarea",
      {
        className: HM,
        value: n.value,
        onChange: (c) => n.onChange(c.currentTarget.value),
        placeholder: `[Bob] Hey there
[Alice] Hello
...`,
        "aria-label": "Dialogue script",
        spellCheck: !1
      }
    ),
    s.length > 0 && /* @__PURE__ */ b.jsxs("div", { className: Kr, role: "alert", children: [
      /* @__PURE__ */ b.jsx("strong", { children: "Unresolved characters:" }),
      " ",
      s.map((c) => /* @__PURE__ */ b.jsxs(
        "button",
        {
          type: "button",
          className: $a,
          onClick: () => a(
            `/${n.deploymentId}/mappings/new?character=${encodeURIComponent(c)}`
          ),
          children: [
            "Create mapping for ",
            c
          ]
        },
        c
      ))
    ] }),
    r.length > 0 && /* @__PURE__ */ b.jsxs("div", { children: [
      /* @__PURE__ */ b.jsx("span", { className: $t, children: "Parsed lines" }),
      /* @__PURE__ */ b.jsx("ul", { className: gd, children: r.map((c) => /* @__PURE__ */ b.jsxs("li", { children: [
        "#",
        c.lineNumber.toString().padStart(3, "0"),
        " [",
        c.character,
        "] ",
        c.text,
        !c.hasMapping && c.character !== "Narrator" && " — unresolved"
      ] }, c.lineNumber)) })
    ] }),
    o.length > 0 && /* @__PURE__ */ b.jsxs("div", { children: [
      /* @__PURE__ */ b.jsx("span", { className: $t, children: "Predicted filenames" }),
      /* @__PURE__ */ b.jsx("ul", { className: gd, children: o.map((c) => /* @__PURE__ */ b.jsx("li", { children: c }, c)) })
    ] })
  ] });
}
function Nj(n, a, r) {
  const s = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], c = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Map(), h = [], p = n.split(/\r?\n/);
  let m = 0;
  return p.forEach((g, v) => {
    const S = g.trim();
    if (!S) return;
    const T = v + 1, E = S.match(s);
    let C = "Narrator", j = S;
    if (E && E.groups) {
      const Q = (E.groups.body ?? "").trim(), $ = (E.groups.rest ?? "").trim();
      C = ((Q.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", j = $;
    }
    m += 1;
    const O = C.toLowerCase(), Y = (d.get(O) ?? 0) + 1;
    d.set(O, Y);
    const L = C === "Narrator" || r.has(O);
    L || c.add(C), o.push({ lineNumber: T, character: C, text: j, hasMapping: L }), h.push(
      `${m.toString().padStart(3, "0")}_${zj(C)}_${Y.toString().padStart(3, "0")}.${a}`
    );
  }), {
    attributions: o,
    unresolved: Array.from(c),
    predictedFilenames: h
  };
}
function zj(n) {
  const a = n.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
function Oj(n) {
  const a = n.workflowCustomised ?? !1, r = n.unmappableFields ?? [];
  return /* @__PURE__ */ b.jsxs("div", { className: _M, children: [
    /* @__PURE__ */ b.jsxs("header", { className: UM, children: [
      /* @__PURE__ */ b.jsx("h1", { className: BM, children: n.deployment.displayName }),
      n.header
    ] }),
    a && /* @__PURE__ */ b.jsxs("section", { className: hb, "aria-live": "polite", children: [
      /* @__PURE__ */ b.jsx("strong", { children: "Workflow customised." }),
      " ",
      r.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${r.join(", ")}.`,
      " ",
      /* @__PURE__ */ b.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: LM, children: [
      /* @__PURE__ */ b.jsxs("section", { className: zr, "aria-label": "Dialogue script", children: [
        /* @__PURE__ */ b.jsx("h2", { className: Or, children: "Script" }),
        n.scriptEditor
      ] }),
      /* @__PURE__ */ b.jsxs("section", { className: zr, "aria-label": "Generation settings", children: [
        /* @__PURE__ */ b.jsx("h2", { className: Or, children: "Settings" }),
        n.settingsPanel
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: VM, children: [
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
function _j() {
  const { deployment: n, mappings: a, runs: r, workflow: s } = as(), [o, c] = R.useState(""), [d, h] = R.useState(
    n.defaultOutputFormat ?? "mp3"
  ), [p, m] = R.useState(n.defaultSpeedFactor ?? 1), [g, v] = R.useState({
    mode: "none",
    emotionAlpha: 1
  }), [S, T] = R.useState({}), [E, C] = R.useState("use_cache"), [j, O] = R.useState(n.defaultVoiceAssetId != null), Y = R.useMemo(
    () => ({
      script: o,
      parserMode: j ? "raw_text" : "dialogue",
      outputFormat: d,
      speedFactor: p,
      globalEmotion: g,
      generation: S,
      cachePolicy: E
    }),
    [o, j, d, p, g, S, E]
  ), L = R.useMemo(() => {
    const Q = /* @__PURE__ */ new Map();
    for (const $ of a)
      Q.set($.characterName.toLowerCase(), $);
    return Q;
  }, [a]);
  return /* @__PURE__ */ b.jsx(
    Oj,
    {
      deployment: n,
      workflowCustomised: s.workflow.customised,
      unmappableFields: s.unmappableFields,
      header: /* @__PURE__ */ b.jsx(GM, { deployment: n }),
      scriptEditor: /* @__PURE__ */ b.jsxs("div", { children: [
        /* @__PURE__ */ b.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }, children: [
          /* @__PURE__ */ b.jsxs("label", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
            /* @__PURE__ */ b.jsx(
              "input",
              {
                type: "checkbox",
                checked: j,
                onChange: (Q) => O(Q.target.checked)
              }
            ),
            "Quick mode (no character mapping required)"
          ] }),
          j && /* @__PURE__ */ b.jsx(
            Cj,
            {
              deploymentId: n.deploymentId,
              initialVoiceAssetId: n.defaultVoiceAssetId ?? null
            }
          )
        ] }),
        /* @__PURE__ */ b.jsx(
          jj,
          {
            value: o,
            onChange: c,
            outputFormat: d,
            mappings: L,
            deploymentId: n.deploymentId
          }
        )
      ] }),
      emotionPanel: /* @__PURE__ */ b.jsx(
        gj,
        {
          value: g,
          onChange: v,
          deploymentId: n.deploymentId
        }
      ),
      settingsPanel: /* @__PURE__ */ b.jsx(
        Tj,
        {
          outputFormat: d,
          onOutputFormatChange: h,
          speedFactor: p,
          onSpeedFactorChange: m,
          cachePolicy: E,
          onCachePolicyChange: C,
          generation: S,
          onGenerationChange: T
        }
      ),
      runPanel: /* @__PURE__ */ b.jsx(
        wj,
        {
          deploymentId: n.deploymentId,
          createPayload: Y,
          canGenerate: o.trim().length > 0
        }
      ),
      historyPanel: /* @__PURE__ */ b.jsx(Rj, { runs: r, deploymentId: n.deploymentId })
    }
  );
}
var Lj = "jq2zyb3", Vj = "jq2zyb4", Uj = "jq2zyb5", Bj = "jq2zyb6", Hj = "jq2zyb7", qj = "jq2zyb8", Yj = "jq2zyb9", kj = "jq2zyba", Gj = "jq2zybb", Pj = { queued: "jq2zybd jq2zybc", running: "jq2zybe jq2zybc", completed: "jq2zybf jq2zybc", failed: "jq2zybg jq2zybc", cancelled: "jq2zybh jq2zybc", partial: "jq2zybi jq2zybc" }, Xj = "jq2zybj", Fj = "jq2zybk", Qj = "jq2zybl", Kj = "jq2zybm", Zj = "jq2zybn jq2zybm", $j = "jq2zybo", Ij = "jq2zybp", Jj = "jq2zybq", Wj = "jq2zybr", eN = "jq2zybs", tN = "jq2zybt", nN = "jq2zybu", aN = "jq2zybv", iN = "jq2zybw", lN = "jq2zybx", rN = "jq2zyby", sN = "jq2zybz", oN = "jq2zyb10", uN = "jq2zyb11", cN = "jq2zyb12", fN = "jq2zyb13", dN = "jq2zyb14", hN = "jq2zyb15", mN = "jq2zyb16", pN = { queued: "jq2zyb18 jq2zyb17", running: "jq2zyb19 jq2zyb17", completed: "jq2zyb1a jq2zyb17", failed: "jq2zyb1b jq2zyb17", cancelled: "jq2zyb1c jq2zyb17" }, yN = "jq2zyb1d", gN = "jq2zyb1e", vN = "jq2zyb1f";
const bN = ["cancelled", "failed", "partial"];
function SN() {
  const { run: n } = as(), a = zi(), [r, s] = R.useState(!1), [o, c] = R.useState(null), d = R.useMemo(() => xN(n), [n]), h = bN.includes(n.status) && n.kind === "batch", p = async () => {
    if (n.deploymentId) {
      s(!0), c(null);
      try {
        const { runId: m } = await ih(n.deploymentId, n.runId);
        a(`/${n.deploymentId}/runs/${m}`);
      } catch (m) {
        c(RN(m));
      } finally {
        s(!1);
      }
    }
  };
  return /* @__PURE__ */ b.jsx("main", { className: Lj, children: /* @__PURE__ */ b.jsxs("div", { className: Vj, children: [
    /* @__PURE__ */ b.jsxs("header", { className: Uj, children: [
      /* @__PURE__ */ b.jsxs("p", { className: Bj, children: [
        n.deploymentId ? /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
          /* @__PURE__ */ b.jsx(is, { to: `/${n.deploymentId}/recipe`, className: Hj, children: "← Back to recipe" }),
          /* @__PURE__ */ b.jsx("span", { className: qj, children: "·" })
        ] }) : null,
        /* @__PURE__ */ b.jsx("span", { children: "Run detail" })
      ] }),
      /* @__PURE__ */ b.jsxs("div", { className: Yj, children: [
        /* @__PURE__ */ b.jsxs("h1", { className: kj, children: [
          TN(n.kind),
          /* @__PURE__ */ b.jsx("span", { className: Gj, children: n.runId })
        ] }),
        /* @__PURE__ */ b.jsx("span", { className: Pj[n.status], children: n.status })
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("section", { className: Xj, "aria-label": "Run statistics", children: [
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
    h && /* @__PURE__ */ b.jsxs("section", { className: Ij, "aria-label": "Resume run", children: [
      /* @__PURE__ */ b.jsxs("div", { className: Jj, children: [
        /* @__PURE__ */ b.jsx("p", { className: Wj, children: d.failed > 0 ? `${d.failed} line${d.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
        /* @__PURE__ */ b.jsx("p", { className: eN, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
      ] }),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: tN,
          disabled: r,
          onClick: () => void p(),
          children: r ? "Resuming…" : d.failed > 0 ? "Rerun failed lines" : "Resume run"
        }
      ),
      o && /* @__PURE__ */ b.jsx("p", { className: nN, role: "alert", children: o })
    ] }),
    /* @__PURE__ */ b.jsxs("section", { className: aN, "aria-label": "Utterances", children: [
      /* @__PURE__ */ b.jsxs("div", { className: iN, children: [
        /* @__PURE__ */ b.jsx("h2", { className: lN, children: "Utterances" }),
        d.completed > 0 && /* @__PURE__ */ b.jsxs("span", { className: rN, children: [
          /* @__PURE__ */ b.jsx("span", { className: sN, children: d.cached }),
          "/",
          d.completed,
          " from cache"
        ] })
      ] }),
      /* @__PURE__ */ b.jsx("ul", { className: oN, children: n.utterances.map((m) => /* @__PURE__ */ b.jsxs("li", { className: uN, children: [
        /* @__PURE__ */ b.jsxs("span", { className: cN, children: [
          "#",
          m.globalIndex.toString().padStart(3, "0")
        ] }),
        /* @__PURE__ */ b.jsx("span", { className: fN, title: m.characterDisplay, children: m.characterDisplay }),
        /* @__PURE__ */ b.jsx("span", { className: dN, title: m.text, children: m.text }),
        /* @__PURE__ */ b.jsxs("span", { className: hN, children: [
          m.cacheHit && /* @__PURE__ */ b.jsx("span", { className: mN, children: "cached" }),
          m.durationMs ? /* @__PURE__ */ b.jsx("span", { children: EN(m.durationMs) }) : null,
          /* @__PURE__ */ b.jsx("span", { className: pN[m.status], children: m.status })
        ] })
      ] }, m.utteranceId)) })
    ] }),
    n.exportArtifactRef && /* @__PURE__ */ b.jsx("div", { className: yN, children: /* @__PURE__ */ b.jsxs(
      "a",
      {
        href: `/api/v1/artifacts/${n.exportArtifactRef}/download`,
        download: !0,
        className: gN,
        children: [
          "Download ZIP ",
          /* @__PURE__ */ b.jsx("span", { className: vN, children: "↓" })
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
      className: Fj,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ b.jsx("span", { className: Qj, children: n }),
        /* @__PURE__ */ b.jsx("span", { className: r ? Zj : Kj, children: a }),
        o !== void 0 && /* @__PURE__ */ b.jsx("span", { className: $j, "aria-hidden": "true" })
      ]
    }
  );
}
function xN(n) {
  const a = n.utterances.length, r = n.utterances.filter((d) => d.status === "completed").length, s = n.utterances.filter(
    (d) => d.status === "failed" || d.status === "cancelled"
  ).length, o = n.utterances.filter((d) => d.cacheHit).length, c = r > 0 ? Math.round(o / r * 100) : 0;
  return { total: a, completed: r, failed: s, cached: o, cacheRatio: c };
}
function TN(n) {
  switch (n) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function EN(n) {
  return n < 1e3 ? `${n} ms` : `${(n / 1e3).toFixed(n < 1e4 ? 2 : 1)} s`;
}
function RN(n) {
  return n instanceof Oi ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
var MN = "pcphqj2", AN = "pcphqj3", CN = "pcphqj4", wN = "pcphqj5", DN = "pcphqj6", jN = "pcphqj7", NN = "pcphqj8", zN = "pcphqj9", w0 = "pcphqja", ON = "pcphqjb", D0 = "pcphqjc", _N = "pcphqjd", LN = "pcphqje", VN = "pcphqjf pcphqje", UN = "pcphqjg", BN = "pcphqjh", HN = "pcphqji", qN = "pcphqjj", YN = "pcphqjk pcphqjj", kN = "pcphqjl pcphqjj", GN = "pcphqjm pcphqjj", PN = "pcphqjn", fd = "pcphqjo", dd = "pcphqjp", XN = "pcphqjq", FN = "pcphqjr", QN = "pcphqjs", KN = "pcphqjt", ZN = "pcphqju";
function $N() {
  const [n, a] = R.useState(null), [r, s] = R.useState(null);
  return R.useEffect(() => {
    let o = !1;
    const c = async () => {
      try {
        const h = await it("/runtime/queue");
        o || (a(h.entries), s(null));
      } catch (h) {
        o || s(h instanceof Error ? h.message : "Unknown error");
      }
    };
    c();
    const d = setInterval(() => void c(), 3e3);
    return () => {
      o = !0, clearInterval(d);
    };
  }, []), /* @__PURE__ */ b.jsx("main", { className: MN, children: /* @__PURE__ */ b.jsxs("div", { className: AN, children: [
    /* @__PURE__ */ b.jsxs("header", { className: CN, children: [
      /* @__PURE__ */ b.jsx("p", { className: wN, children: "Runtime" }),
      /* @__PURE__ */ b.jsxs("div", { className: DN, children: [
        /* @__PURE__ */ b.jsx("h1", { className: jN, children: "Queue" }),
        /* @__PURE__ */ b.jsx("span", { className: NN, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ b.jsx("p", { className: zN, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    r ? /* @__PURE__ */ b.jsx("section", { className: ZN, role: "alert", children: r }) : n === null ? null : n.length === 0 ? /* @__PURE__ */ b.jsx("section", { className: w0, children: /* @__PURE__ */ b.jsxs("div", { className: XN, children: [
      /* @__PURE__ */ b.jsx("span", { className: FN, children: "○" }),
      /* @__PURE__ */ b.jsx("p", { className: QN, children: "Queue is quiet" }),
      /* @__PURE__ */ b.jsx("p", { className: KN, children: "No runs are pending. Start a synthesis from a deployment's recipe surface." })
    ] }) }) : /* @__PURE__ */ b.jsx("section", { className: w0, "aria-label": "Queued runs", children: /* @__PURE__ */ b.jsx("ul", { className: ON, children: n.map((o) => {
      const c = o.position === 1;
      return /* @__PURE__ */ b.jsxs(
        "li",
        {
          className: c ? `${D0} ${_N}` : D0,
          children: [
            /* @__PURE__ */ b.jsx("span", { className: c ? VN : LN, children: o.position }),
            /* @__PURE__ */ b.jsxs("span", { className: UN, children: [
              /* @__PURE__ */ b.jsx("span", { className: BN, children: o.deploymentName ?? o.deploymentId }),
              /* @__PURE__ */ b.jsx("span", { className: HN, children: o.runId })
            ] }),
            /* @__PURE__ */ b.jsx("span", { className: IN(o.kind), children: JN(o.kind) }),
            /* @__PURE__ */ b.jsx("span", { className: PN, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
              /* @__PURE__ */ b.jsx("span", { className: fd, children: WN(o.etaSeconds) }),
              /* @__PURE__ */ b.jsx("span", { className: dd, children: "eta" })
            ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
              /* @__PURE__ */ b.jsx("span", { className: fd, children: o.utteranceTotal }),
              /* @__PURE__ */ b.jsx("span", { className: dd, children: "lines" })
            ] }) : /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
              /* @__PURE__ */ b.jsx("span", { className: fd, children: "—" }),
              /* @__PURE__ */ b.jsx("span", { className: dd, children: "pending" })
            ] }) })
          ]
        },
        o.runId
      );
    }) }) })
  ] }) });
}
function IN(n) {
  switch (n) {
    case "batch":
      return YN;
    case "test_line":
      return kN;
    case "resume":
      return GN;
    default:
      return qN;
  }
}
function JN(n) {
  switch (n) {
    case "test_line":
      return "test line";
    default:
      return n;
  }
}
function WN(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60), r = n % 60;
  return r === 0 ? `${a}m` : `${a}m ${r}s`;
}
function ez() {
  const { deploymentId: n, prefillCharacterName: a } = as(), r = zi(), [s, o] = R.useState(a), [c, d] = R.useState(""), [h, p] = R.useState("none"), [m, g] = R.useState(!1), [v, S] = R.useState(null), T = R.useRef(null);
  R.useEffect(() => {
    T.current?.scrollIntoView({ behavior: "smooth", block: "center" }), T.current?.focus();
  }, []);
  const E = async (C) => {
    C.preventDefault(), g(!0), S(null);
    try {
      await fb(n, {
        characterName: s,
        speakerVoiceAssetId: c,
        defaultEmotionMode: h
      }), r(`/${n}/recipe`);
    } catch (j) {
      S(j instanceof Error ? j.message : "failed");
    } finally {
      g(!1);
    }
  };
  return /* @__PURE__ */ b.jsxs("main", { children: [
    /* @__PURE__ */ b.jsx("h1", { children: "New character mapping" }),
    /* @__PURE__ */ b.jsxs("form", { onSubmit: E, children: [
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
            value: c,
            onChange: (C) => d(C.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ b.jsxs("label", { children: [
        "Emotion mode",
        /* @__PURE__ */ b.jsxs("select", { value: h, onChange: (C) => p(C.currentTarget.value), children: [
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
var tz = "go9vi12", nz = "go9vi13", az = "go9vi14", iz = "go9vi15", lz = "go9vi16", rz = "go9vi17", sz = "go9vi18", oz = "go9vi19", uz = "go9vi1a go9vi19", cz = "go9vi1b", fz = "go9vi1c", dz = "go9vi1d", hz = "go9vi1e", mz = "go9vi1f", pz = "go9vi1g", yz = "go9vi1h", gz = "go9vi1i", vz = "go9vi1j", bz = "go9vi1k", cu = "go9vi1l", Ti = "go9vi1m", Ur = "go9vi1n", Cl = "go9vi1o", Sz = "go9vi1p go9vi1o", xz = "go9vi1q", Tz = "go9vi1r go9vi1q", Ez = "go9vi1s go9vi1q", Rz = "go9vi1t", Mz = "go9vi1u", Az = "go9vi1v", Cz = "go9vi1w", wz = "go9vi1x", Dz = "go9vi1y", r1 = "go9vi1z", s1 = "go9vi110", j0 = "go9vi111 go9vi110", jz = "go9vi112 go9vi110", Nz = "go9vi113", zz = "go9vi114", Oz = "go9vi115", _z = "go9vi116 go9vi1o", Lz = "go9vi117", Vz = "go9vi118";
const Uz = ["none", "audio_ref", "vector_preset", "qwen_template"];
function Bz() {
  const { deployment: n, mappings: a, voiceAssets: r } = as(), [s, o] = R.useState(a), [c, d] = R.useState(r), [h, p] = R.useState(
    a[0]?.mappingId ?? null
  ), [m, g] = R.useState(""), [v, S] = R.useState(null), [T, E] = R.useState(null), C = R.useMemo(() => {
    const P = /* @__PURE__ */ new Map();
    for (const G of c) P.set(G.voiceAssetId, G);
    return P;
  }, [c]), j = R.useMemo(() => {
    const P = m.trim().toLowerCase();
    return P ? s.filter((G) => G.characterName.toLowerCase().includes(P)) : s;
  }, [s, m]), O = R.useMemo(
    () => s.find((P) => P.mappingId === h) ?? null,
    [s, h]
  );
  R.useEffect(() => {
    o(a), d(r), p(a[0]?.mappingId ?? null);
  }, [a, r]), R.useEffect(() => {
    if (!T) return;
    const P = setTimeout(() => E(null), 2600);
    return () => clearTimeout(P);
  }, [T]);
  const Y = R.useCallback(async () => {
    const P = await Jo(n.deploymentId);
    d(P.voiceAssets);
  }, [n.deploymentId]), L = R.useCallback(
    (P) => {
      o(
        (G) => G.map((le) => le.mappingId === h ? { ...le, ...P } : le)
      );
    },
    [h]
  ), Q = R.useCallback(
    async (P) => {
      if (!O) return;
      const G = O;
      try {
        const le = await IR(O.mappingId, P);
        o((de) => de.map((se) => se.mappingId === le.mappingId ? le : se));
      } catch (le) {
        o(
          (de) => de.map((se) => se.mappingId === G.mappingId ? G : se)
        ), S(Ei(le));
      }
    },
    [O]
  ), $ = R.useCallback(async () => {
    const P = c[0];
    if (!P) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const G = Pz(s), le = await fb(n.deploymentId, {
        characterName: G,
        speakerVoiceAssetId: P.voiceAssetId,
        defaultEmotionMode: "none"
      });
      o((de) => [...de, le]), p(le.mappingId);
    } catch (G) {
      S(Ei(G));
    }
  }, [n.deploymentId, c, s]), I = R.useCallback(async () => {
    if (O && confirm(`Deactivate mapping for ${O.characterName}?`))
      try {
        await JR(n.deploymentId, O.mappingId), o((P) => P.filter((G) => G.mappingId !== O.mappingId)), p(null), E(`Mapping for ${O.characterName} deactivated.`);
      } catch (P) {
        S(Ei(P));
      }
  }, [n.deploymentId, O]), ee = R.useCallback(
    async (P, G, le) => {
      try {
        const de = await lM(n.deploymentId, P, G, le);
        return d((se) => [de, ...se]), E(`${de.displayName} uploaded.`), de;
      } catch (de) {
        return S(Ei(de)), null;
      }
    },
    [n.deploymentId]
  ), N = R.useCallback(async () => {
    try {
      const P = await WR(n.deploymentId);
      $z(P, `${n.deploymentId}-mappings.json`), E("Mappings exported to JSON.");
    } catch (P) {
      S(Ei(P));
    }
  }, [n.deploymentId]), W = R.useCallback(
    async (P, G) => {
      try {
        const le = await eM(
          n.deploymentId,
          P.mappings,
          G
        );
        E(
          `Imported ${le.created.length} • skipped ${le.skipped.length} • replaced ${le.replaced.length}.`
        );
        const de = await Jo(n.deploymentId);
        d(de.voiceAssets);
      } catch (le) {
        S(Ei(le));
      }
    },
    [n.deploymentId]
  ), te = R.useCallback(
    async (P, G) => {
      if (!O) return null;
      const le = P.trim() || `[${O.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await iM(n.deploymentId, {
          line: le,
          outputFormat: G
        })).runId };
      } catch (de) {
        return S(Ei(de)), null;
      }
    },
    [n.deploymentId, O]
  );
  return /* @__PURE__ */ b.jsxs("div", { className: tz, children: [
    /* @__PURE__ */ b.jsxs("aside", { className: nz, "aria-label": "Character mappings", children: [
      /* @__PURE__ */ b.jsxs("header", { className: az, children: [
        /* @__PURE__ */ b.jsxs("div", { children: [
          /* @__PURE__ */ b.jsx("h1", { className: iz, children: "Mappings" }),
          /* @__PURE__ */ b.jsxs("span", { className: lz, children: [
            s.length,
            " active · ",
            c.length,
            " voice",
            c.length === 1 ? "" : "s"
          ] })
        ] }),
        /* @__PURE__ */ b.jsx("button", { type: "button", className: s1, onClick: $, children: "+ Add" })
      ] }),
      /* @__PURE__ */ b.jsx(
        "input",
        {
          type: "search",
          className: rz,
          placeholder: "Search characters",
          value: m,
          onChange: (P) => g(P.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ b.jsx(Gz, { onExport: N, onImport: W }),
      /* @__PURE__ */ b.jsx("div", { className: sz, children: j.length === 0 ? /* @__PURE__ */ b.jsx("div", { className: mz, children: "No mappings yet. Click Add to create one." }) : j.map((P) => {
        const G = C.get(P.speakerVoiceAssetId), le = P.mappingId === h;
        return /* @__PURE__ */ b.jsxs(
          "button",
          {
            type: "button",
            className: le ? uz : oz,
            onClick: () => p(P.mappingId),
            "aria-pressed": le,
            children: [
              /* @__PURE__ */ b.jsx("span", { className: cz, "aria-hidden": "true", children: Xz(P.characterName) }),
              /* @__PURE__ */ b.jsxs("span", { className: fz, children: [
                /* @__PURE__ */ b.jsx("span", { className: dz, children: P.characterName }),
                /* @__PURE__ */ b.jsxs("span", { className: hz, children: [
                  P.defaultEmotionMode,
                  " · ",
                  G?.displayName ?? "no voice"
                ] })
              ] })
            ]
          },
          P.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ b.jsxs("section", { className: pz, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ b.jsx(aD, { children: T && /* @__PURE__ */ b.jsx(
        Vh.div,
        {
          className: zz,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: T
        },
        T
      ) }),
      v && /* @__PURE__ */ b.jsx("div", { className: Nz, role: "alert", children: v }),
      O ? /* @__PURE__ */ b.jsx(
        qz,
        {
          deploymentId: n.deploymentId,
          mapping: O,
          voiceAssets: c,
          onNameChange: (P) => {
            L({ characterName: P });
          },
          onNameBlur: (P) => {
            P !== O.characterName && P.trim() && Q({ characterName: P.trim() });
          },
          onSpeakerChange: (P) => {
            L({ speakerVoiceAssetId: P }), Q({ speakerVoiceAssetId: P });
          },
          onModeChange: (P) => {
            L({ defaultEmotionMode: P }), Q({ defaultEmotionMode: P });
          },
          onQwenChange: (P) => {
            L({ defaultQwenTemplate: P });
          },
          onQwenBlur: (P) => {
            Q({ defaultQwenTemplate: P });
          },
          onSpeedChange: (P) => {
            L({ defaultSpeedFactor: P });
          },
          onSpeedCommit: (P) => {
            Q({ defaultSpeedFactor: P });
          },
          onEmotionVoiceChange: (P) => {
            const G = P || null;
            L({ defaultEmotionVoiceAssetId: G }), Q({ defaultEmotionVoiceAssetId: G });
          },
          onDelete: I,
          onUploadVoice: async (P, G, le) => {
            const de = await ee(P, G, le);
            return de && le === "speaker" && (L({ speakerVoiceAssetId: de.voiceAssetId }), Q({ speakerVoiceAssetId: de.voiceAssetId })), await Y(), de;
          },
          onTestLine: te
        }
      ) : /* @__PURE__ */ b.jsx(
        Hz,
        {
          voiceCount: c.length,
          onUploadVoice: async (P) => {
            await ee(P, P.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function Hz({ voiceCount: n, onUploadVoice: a }) {
  return n === 0 ? /* @__PURE__ */ b.jsxs("div", { className: cu, style: { padding: "3rem 2rem" }, children: [
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
  ] }) : /* @__PURE__ */ b.jsx("div", { className: cu, style: { textAlign: "center", padding: "4rem" }, children: /* @__PURE__ */ b.jsxs("p", { style: { fontFamily: "var(--font)", fontSize: "1.1rem", color: "var(--text-muted)" }, children: [
    "Select a character on the left, or click ",
    /* @__PURE__ */ b.jsx("strong", { children: "+ Add" }),
    " to create one."
  ] }) });
}
function qz(n) {
  const { mapping: a, voiceAssets: r } = n, s = r.find((E) => E.voiceAssetId === a.speakerVoiceAssetId) ?? null, o = r.find((E) => E.voiceAssetId === a.defaultEmotionVoiceAssetId) ?? null, [c, d] = R.useState(""), [h, p] = R.useState("mp3"), [m, g] = R.useState("idle"), [v, S] = R.useState(null), T = R.useCallback(async () => {
    g("running"), S(null);
    const E = await n.onTestLine(c, h);
    if (!E) {
      g("error"), S("Failed to enqueue test-line run.");
      return;
    }
    const { runId: C } = E;
    for (let j = 0; j < 60; j += 1) {
      await new Promise((O) => setTimeout(O, 500));
      try {
        const O = await ah(n.deploymentId, C);
        if (O.status === "completed") {
          g("done");
          return;
        }
        if (O.status === "failed" || O.status === "cancelled") {
          g("error"), S(`Run ${O.status}.`);
          return;
        }
      } catch (O) {
        g("error"), S(O instanceof Error ? O.message : "unknown error");
        return;
      }
    }
    g("error"), S("test-line timed out after 30s");
  }, [n.onTestLine, n.deploymentId, c, h]);
  return /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    /* @__PURE__ */ b.jsxs("header", { className: yz, children: [
      /* @__PURE__ */ b.jsxs("div", { children: [
        /* @__PURE__ */ b.jsx("span", { className: vz, children: "Character" }),
        /* @__PURE__ */ b.jsx("h2", { className: gz, children: a.characterName })
      ] }),
      /* @__PURE__ */ b.jsx("div", { className: r1, children: /* @__PURE__ */ b.jsx("button", { type: "button", className: jz, onClick: n.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: Oz, children: [
      /* @__PURE__ */ b.jsx(
        "input",
        {
          type: "text",
          className: _z,
          placeholder: `[${a.characterName}] This is a test of the voice.`,
          value: c,
          onChange: (E) => d(E.currentTarget.value),
          "aria-label": "Test-line text",
          disabled: m === "running"
        }
      ),
      /* @__PURE__ */ b.jsxs(
        "select",
        {
          className: Cl,
          value: h,
          onChange: (E) => p(E.currentTarget.value),
          "aria-label": "Test-line output format",
          disabled: m === "running",
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
          onClick: () => void T(),
          disabled: m === "running",
          children: m === "running" ? "Synthesising…" : "Test this line"
        }
      ),
      m === "done" && /* @__PURE__ */ b.jsx("span", { style: { marginLeft: 12, color: "var(--color-success, #4caf50)" }, children: "Synthesised — see host logs for the output file path." }),
      m === "error" && v && /* @__PURE__ */ b.jsx("span", { style: { marginLeft: 12, color: "var(--color-error, crimson)" }, children: v })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: bz, children: [
      /* @__PURE__ */ b.jsxs("div", { className: cu, children: [
        /* @__PURE__ */ b.jsxs("label", { className: Ur, children: [
          /* @__PURE__ */ b.jsx("span", { className: Ti, children: "Character name" }),
          /* @__PURE__ */ b.jsx(
            "input",
            {
              className: Cl,
              value: a.characterName,
              onChange: (E) => n.onNameChange(E.currentTarget.value),
              onBlur: (E) => n.onNameBlur(E.currentTarget.value)
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
              onChange: (E) => n.onModeChange(E.currentTarget.value),
              children: Uz.map((E) => /* @__PURE__ */ b.jsx("option", { value: E, children: Fz(E) }, E))
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
              className: Sz,
              value: a.defaultQwenTemplate ?? "",
              onChange: (E) => n.onQwenChange(E.currentTarget.value),
              onBlur: (E) => n.onQwenBlur(E.currentTarget.value)
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
              onChange: (E) => n.onEmotionVoiceChange(E.currentTarget.value),
              children: [
                /* @__PURE__ */ b.jsx("option", { value: "", children: "— none —" }),
                r.map((E) => /* @__PURE__ */ b.jsxs("option", { value: E.voiceAssetId, children: [
                  E.displayName,
                  " · ",
                  E.kind
                ] }, E.voiceAssetId))
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
              onChange: (E) => n.onSpeedChange(Number(E.currentTarget.value)),
              onMouseUp: (E) => n.onSpeedCommit(Number(E.currentTarget.value)),
              onTouchEnd: (E) => n.onSpeedCommit(Number(E.currentTarget.value))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ b.jsxs("div", { className: cu, children: [
        /* @__PURE__ */ b.jsx("span", { className: Ti, children: "Speaker reference" }),
        /* @__PURE__ */ b.jsx(
          Yz,
          {
            value: a.speakerVoiceAssetId,
            voices: r,
            onChange: n.onSpeakerChange
          }
        ),
        s && /* @__PURE__ */ b.jsx(N0, { voice: s }),
        /* @__PURE__ */ b.jsx(
          o1,
          {
            label: s ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (E) => n.onUploadVoice(E, E.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
          /* @__PURE__ */ b.jsx("span", { className: Ti, children: "Emotion reference voice" }),
          /* @__PURE__ */ b.jsx(N0, { voice: o })
        ] })
      ] })
    ] })
  ] });
}
function Yz({
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
function N0({ voice: n }) {
  const a = Qz(n.durationMs ?? null);
  return /* @__PURE__ */ b.jsxs("div", { children: [
    /* @__PURE__ */ b.jsxs("div", { className: Rz, children: [
      /* @__PURE__ */ b.jsx("span", { children: n.displayName }),
      /* @__PURE__ */ b.jsx("span", { children: n.kind }),
      n.durationMs != null && /* @__PURE__ */ b.jsx("span", { children: Kz(n.durationMs) }),
      n.sampleRate && /* @__PURE__ */ b.jsxs("span", { children: [
        n.sampleRate,
        " Hz"
      ] })
    ] }),
    n.durationMs != null && /* @__PURE__ */ b.jsxs("div", { className: Mz, children: [
      /* @__PURE__ */ b.jsx("div", { className: Az, children: /* @__PURE__ */ b.jsx(
        Vh.div,
        {
          className: Cz,
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
          className: a.level === "warn" ? wz : Dz,
          children: a.message
        }
      )
    ] }),
    /* @__PURE__ */ b.jsx(kz, { seed: n.contentSha256 })
  ] });
}
function kz({ seed: n }) {
  const a = R.useMemo(() => Zz(n, 48), [n]);
  return /* @__PURE__ */ b.jsx("div", { className: Lz, "aria-hidden": "true", children: a.map((r, s) => /* @__PURE__ */ b.jsx(
    "span",
    {
      className: Vz,
      style: { height: `${Math.max(6, r * 100)}%` }
    },
    s
  )) });
}
function o1({
  label: n,
  onFile: a
}) {
  const [r, s] = R.useState(!1), [o, c] = R.useState(!1), d = R.useRef(null), h = R.useCallback(
    async (p) => {
      c(!0);
      try {
        await a(p);
      } finally {
        c(!1);
      }
    },
    [a]
  );
  return /* @__PURE__ */ b.jsxs(
    "div",
    {
      className: o ? Ez : r ? Tz : xz,
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
function Gz({
  onExport: n,
  onImport: a
}) {
  const [r, s] = R.useState("error"), o = R.useRef(null);
  return /* @__PURE__ */ b.jsxs("div", { className: r1, children: [
    /* @__PURE__ */ b.jsx("button", { type: "button", className: j0, onClick: n, children: "Export JSON" }),
    /* @__PURE__ */ b.jsx(
      "input",
      {
        ref: o,
        type: "file",
        accept: "application/json,.json",
        style: { display: "none" },
        onChange: async (c) => {
          const d = c.currentTarget.files?.[0];
          if (c.currentTarget.value = "", !!d)
            try {
              const h = await d.text(), p = JSON.parse(h);
              a(p, r);
            } catch {
              alert("Import failed: file is not a valid JSON mapping bundle.");
            }
        }
      }
    ),
    /* @__PURE__ */ b.jsx("button", { type: "button", className: j0, onClick: () => o.current?.click(), children: "Import JSON" }),
    /* @__PURE__ */ b.jsxs(
      "select",
      {
        className: Cl,
        value: r,
        onChange: (c) => s(c.currentTarget.value),
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
function Pz(n) {
  const a = new Set(n.map((s) => s.characterName.toLowerCase()));
  let r = n.length + 1;
  for (; a.has(`character ${r}`); ) r += 1;
  return `Character ${r}`;
}
function Xz(n) {
  const a = n.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function Fz(n) {
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
function Qz(n) {
  return n == null ? null : n < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : n > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : n > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function Kz(n) {
  return n < 1e3 ? `${n} ms` : `${Math.round(n / 100) / 10}s`;
}
function Zz(n, a) {
  const r = [];
  for (let s = 0; s < a; s += 1) {
    const o = n.charCodeAt(s % n.length);
    r.push((o * 31 + s * 7) % 100 / 100);
  }
  return r;
}
function $z(n, a) {
  const r = new Blob([JSON.stringify(n, null, 2)], { type: "application/json" }), s = URL.createObjectURL(r), o = document.createElement("a");
  o.href = s, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(s);
}
function Ei(n) {
  return n instanceof Oi || n instanceof Error ? n.message : "unknown error";
}
function Iz() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: n } = await ZR();
        return { deployments: n };
      },
      Component: MM
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
        const a = Sl(n, "deploymentId"), [r, { mappings: s }, { runs: o }, c] = await Promise.all([
          iv(a),
          lv(a),
          tM(a, { limit: 10 }),
          rM(a)
        ]);
        return { deployment: r, mappings: s, runs: o, workflow: c };
      },
      Component: _j
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: n }) => {
        const a = Sl(n, "deploymentId"), r = Sl(n, "runId");
        return { run: await ah(a, r) };
      },
      Component: SN
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: n }) => {
        const a = Sl(n, "deploymentId"), [r, { mappings: s }, { voiceAssets: o }] = await Promise.all([
          iv(a),
          lv(a),
          Jo(a)
        ]);
        return { deployment: r, mappings: s, voiceAssets: o };
      },
      Component: Bz
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
      Component: ez
    },
    {
      path: "/runtime/queue",
      Component: $N
    }
  ];
}
function Sl(n, a) {
  const r = n[a];
  if (!r)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return r;
}
const Yd = "emotion-tts-app", Jz = "ext-event", z0 = "emotion-tts-stylesheet";
function Wz() {
  if (typeof document > "u" || document.getElementById(z0)) return;
  const n = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = z0, a.rel = "stylesheet", a.href = n, document.head.appendChild(a);
}
Wz();
class eO extends HTMLElement {
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
    const a = this.resolveInitialEntry(), r = cR(Iz(), { initialEntries: [a] });
    this.root.render(
      /* @__PURE__ */ b.jsx(R.StrictMode, { children: /* @__PURE__ */ b.jsx(dR, { router: r }) })
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
      new CustomEvent(Jz, {
        detail: { topic: a, payload: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function tO() {
  typeof customElements > "u" || customElements.get(Yd) || customElements.define(Yd, eO);
}
typeof customElements < "u" && !customElements.get(Yd) && tO();
export {
  tO as register
};
//# sourceMappingURL=emotion-tts.js.map
