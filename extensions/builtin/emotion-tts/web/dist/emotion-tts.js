function Jw(n, a) {
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
function cb(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Ld = { exports: {} }, Yl = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sv;
function Ww() {
  if (Sv) return Yl;
  Sv = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function r(s, o, c) {
    var h = null;
    if (c !== void 0 && (h = "" + c), o.key !== void 0 && (h = "" + o.key), "key" in o) {
      c = {};
      for (var m in o)
        m !== "key" && (c[m] = o[m]);
    } else c = o;
    return o = c.ref, {
      $$typeof: n,
      type: s,
      key: h,
      ref: o !== void 0 ? o : null,
      props: c
    };
  }
  return Yl.Fragment = a, Yl.jsx = r, Yl.jsxs = r, Yl;
}
var wv;
function eE() {
  return wv || (wv = 1, Ld.exports = Ww()), Ld.exports;
}
var f = eE(), Ud = { exports: {} }, Ue = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ev;
function tE() {
  if (Ev) return Ue;
  Ev = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), h = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), v = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), g = Symbol.for("react.activity"), S = Symbol.iterator;
  function w(N) {
    return N === null || typeof N != "object" ? null : (N = S && N[S] || N["@@iterator"], typeof N == "function" ? N : null);
  }
  var j = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, T = Object.assign, A = {};
  function C(N, X, P) {
    this.props = N, this.context = X, this.refs = A, this.updater = P || j;
  }
  C.prototype.isReactComponent = {}, C.prototype.setState = function(N, X) {
    if (typeof N != "object" && typeof N != "function" && N != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, N, X, "setState");
  }, C.prototype.forceUpdate = function(N) {
    this.updater.enqueueForceUpdate(this, N, "forceUpdate");
  };
  function D() {
  }
  D.prototype = C.prototype;
  function z(N, X, P) {
    this.props = N, this.context = X, this.refs = A, this.updater = P || j;
  }
  var k = z.prototype = new D();
  k.constructor = z, T(k, C.prototype), k.isPureReactComponent = !0;
  var W = Array.isArray;
  function G() {
  }
  var ee = { H: null, A: null, T: null, S: null }, R = Object.prototype.hasOwnProperty;
  function H(N, X, P) {
    var ie = P.ref;
    return {
      $$typeof: n,
      type: N,
      key: X,
      ref: ie !== void 0 ? ie : null,
      props: P
    };
  }
  function Z(N, X) {
    return H(N.type, X, N.props);
  }
  function ue(N) {
    return typeof N == "object" && N !== null && N.$$typeof === n;
  }
  function oe(N) {
    var X = { "=": "=0", ":": "=2" };
    return "$" + N.replace(/[=:]/g, function(P) {
      return X[P];
    });
  }
  var ve = /\/+/g;
  function je(N, X) {
    return typeof N == "object" && N !== null && N.key != null ? oe("" + N.key) : X.toString(36);
  }
  function le(N) {
    switch (N.status) {
      case "fulfilled":
        return N.value;
      case "rejected":
        throw N.reason;
      default:
        switch (typeof N.status == "string" ? N.then(G, G) : (N.status = "pending", N.then(
          function(X) {
            N.status === "pending" && (N.status = "fulfilled", N.value = X);
          },
          function(X) {
            N.status === "pending" && (N.status = "rejected", N.reason = X);
          }
        )), N.status) {
          case "fulfilled":
            return N.value;
          case "rejected":
            throw N.reason;
        }
    }
    throw N;
  }
  function L(N, X, P, ie, fe) {
    var ye = typeof N;
    (ye === "undefined" || ye === "boolean") && (N = null);
    var Me = !1;
    if (N === null) Me = !0;
    else
      switch (ye) {
        case "bigint":
        case "string":
        case "number":
          Me = !0;
          break;
        case "object":
          switch (N.$$typeof) {
            case n:
            case a:
              Me = !0;
              break;
            case b:
              return Me = N._init, L(
                Me(N._payload),
                X,
                P,
                ie,
                fe
              );
          }
      }
    if (Me)
      return fe = fe(N), Me = ie === "" ? "." + je(N, 0) : ie, W(fe) ? (P = "", Me != null && (P = Me.replace(ve, "$&/") + "/"), L(fe, X, P, "", function(De) {
        return De;
      })) : fe != null && (ue(fe) && (fe = Z(
        fe,
        P + (fe.key == null || N && N.key === fe.key ? "" : ("" + fe.key).replace(
          ve,
          "$&/"
        ) + "/") + Me
      )), X.push(fe)), 1;
    Me = 0;
    var Ae = ie === "" ? "." : ie + ":";
    if (W(N))
      for (var se = 0; se < N.length; se++)
        ie = N[se], ye = Ae + je(ie, se), Me += L(
          ie,
          X,
          P,
          ye,
          fe
        );
    else if (se = w(N), typeof se == "function")
      for (N = se.call(N), se = 0; !(ie = N.next()).done; )
        ie = ie.value, ye = Ae + je(ie, se++), Me += L(
          ie,
          X,
          P,
          ye,
          fe
        );
    else if (ye === "object") {
      if (typeof N.then == "function")
        return L(
          le(N),
          X,
          P,
          ie,
          fe
        );
      throw X = String(N), Error(
        "Objects are not valid as a React child (found: " + (X === "[object Object]" ? "object with keys {" + Object.keys(N).join(", ") + "}" : X) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Me;
  }
  function U(N, X, P) {
    if (N == null) return N;
    var ie = [], fe = 0;
    return L(N, ie, "", "", function(ye) {
      return X.call(P, ye, fe++);
    }), ie;
  }
  function q(N) {
    if (N._status === -1) {
      var X = N._result;
      X = X(), X.then(
        function(P) {
          (N._status === 0 || N._status === -1) && (N._status = 1, N._result = P);
        },
        function(P) {
          (N._status === 0 || N._status === -1) && (N._status = 2, N._result = P);
        }
      ), N._status === -1 && (N._status = 0, N._result = X);
    }
    if (N._status === 1) return N._result.default;
    throw N._result;
  }
  var Q = typeof reportError == "function" ? reportError : function(N) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var X = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof N == "object" && N !== null && typeof N.message == "string" ? String(N.message) : String(N),
        error: N
      });
      if (!window.dispatchEvent(X)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", N);
      return;
    }
    console.error(N);
  }, ae = {
    map: U,
    forEach: function(N, X, P) {
      U(
        N,
        function() {
          X.apply(this, arguments);
        },
        P
      );
    },
    count: function(N) {
      var X = 0;
      return U(N, function() {
        X++;
      }), X;
    },
    toArray: function(N) {
      return U(N, function(X) {
        return X;
      }) || [];
    },
    only: function(N) {
      if (!ue(N))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return N;
    }
  };
  return Ue.Activity = g, Ue.Children = ae, Ue.Component = C, Ue.Fragment = r, Ue.Profiler = o, Ue.PureComponent = z, Ue.StrictMode = s, Ue.Suspense = v, Ue.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ee, Ue.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(N) {
      return ee.H.useMemoCache(N);
    }
  }, Ue.cache = function(N) {
    return function() {
      return N.apply(null, arguments);
    };
  }, Ue.cacheSignal = function() {
    return null;
  }, Ue.cloneElement = function(N, X, P) {
    if (N == null)
      throw Error(
        "The argument must be a React element, but you passed " + N + "."
      );
    var ie = T({}, N.props), fe = N.key;
    if (X != null)
      for (ye in X.key !== void 0 && (fe = "" + X.key), X)
        !R.call(X, ye) || ye === "key" || ye === "__self" || ye === "__source" || ye === "ref" && X.ref === void 0 || (ie[ye] = X[ye]);
    var ye = arguments.length - 2;
    if (ye === 1) ie.children = P;
    else if (1 < ye) {
      for (var Me = Array(ye), Ae = 0; Ae < ye; Ae++)
        Me[Ae] = arguments[Ae + 2];
      ie.children = Me;
    }
    return H(N.type, fe, ie);
  }, Ue.createContext = function(N) {
    return N = {
      $$typeof: h,
      _currentValue: N,
      _currentValue2: N,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, N.Provider = N, N.Consumer = {
      $$typeof: c,
      _context: N
    }, N;
  }, Ue.createElement = function(N, X, P) {
    var ie, fe = {}, ye = null;
    if (X != null)
      for (ie in X.key !== void 0 && (ye = "" + X.key), X)
        R.call(X, ie) && ie !== "key" && ie !== "__self" && ie !== "__source" && (fe[ie] = X[ie]);
    var Me = arguments.length - 2;
    if (Me === 1) fe.children = P;
    else if (1 < Me) {
      for (var Ae = Array(Me), se = 0; se < Me; se++)
        Ae[se] = arguments[se + 2];
      fe.children = Ae;
    }
    if (N && N.defaultProps)
      for (ie in Me = N.defaultProps, Me)
        fe[ie] === void 0 && (fe[ie] = Me[ie]);
    return H(N, ye, fe);
  }, Ue.createRef = function() {
    return { current: null };
  }, Ue.forwardRef = function(N) {
    return { $$typeof: m, render: N };
  }, Ue.isValidElement = ue, Ue.lazy = function(N) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: N },
      _init: q
    };
  }, Ue.memo = function(N, X) {
    return {
      $$typeof: p,
      type: N,
      compare: X === void 0 ? null : X
    };
  }, Ue.startTransition = function(N) {
    var X = ee.T, P = {};
    ee.T = P;
    try {
      var ie = N(), fe = ee.S;
      fe !== null && fe(P, ie), typeof ie == "object" && ie !== null && typeof ie.then == "function" && ie.then(G, Q);
    } catch (ye) {
      Q(ye);
    } finally {
      X !== null && P.types !== null && (X.types = P.types), ee.T = X;
    }
  }, Ue.unstable_useCacheRefresh = function() {
    return ee.H.useCacheRefresh();
  }, Ue.use = function(N) {
    return ee.H.use(N);
  }, Ue.useActionState = function(N, X, P) {
    return ee.H.useActionState(N, X, P);
  }, Ue.useCallback = function(N, X) {
    return ee.H.useCallback(N, X);
  }, Ue.useContext = function(N) {
    return ee.H.useContext(N);
  }, Ue.useDebugValue = function() {
  }, Ue.useDeferredValue = function(N, X) {
    return ee.H.useDeferredValue(N, X);
  }, Ue.useEffect = function(N, X) {
    return ee.H.useEffect(N, X);
  }, Ue.useEffectEvent = function(N) {
    return ee.H.useEffectEvent(N);
  }, Ue.useId = function() {
    return ee.H.useId();
  }, Ue.useImperativeHandle = function(N, X, P) {
    return ee.H.useImperativeHandle(N, X, P);
  }, Ue.useInsertionEffect = function(N, X) {
    return ee.H.useInsertionEffect(N, X);
  }, Ue.useLayoutEffect = function(N, X) {
    return ee.H.useLayoutEffect(N, X);
  }, Ue.useMemo = function(N, X) {
    return ee.H.useMemo(N, X);
  }, Ue.useOptimistic = function(N, X) {
    return ee.H.useOptimistic(N, X);
  }, Ue.useReducer = function(N, X, P) {
    return ee.H.useReducer(N, X, P);
  }, Ue.useRef = function(N) {
    return ee.H.useRef(N);
  }, Ue.useState = function(N) {
    return ee.H.useState(N);
  }, Ue.useSyncExternalStore = function(N, X, P) {
    return ee.H.useSyncExternalStore(
      N,
      X,
      P
    );
  }, Ue.useTransition = function() {
    return ee.H.useTransition();
  }, Ue.version = "19.2.5", Ue;
}
var jv;
function Jf() {
  return jv || (jv = 1, Ud.exports = tE()), Ud.exports;
}
var x = Jf();
const de = /* @__PURE__ */ cb(x), nE = /* @__PURE__ */ Jw({
  __proto__: null,
  default: de
}, [x]);
var Vd = { exports: {} }, Fl = {}, kd = { exports: {} }, Bd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tv;
function aE() {
  return Tv || (Tv = 1, (function(n) {
    function a(L, U) {
      var q = L.length;
      L.push(U);
      e: for (; 0 < q; ) {
        var Q = q - 1 >>> 1, ae = L[Q];
        if (0 < o(ae, U))
          L[Q] = U, L[q] = ae, q = Q;
        else break e;
      }
    }
    function r(L) {
      return L.length === 0 ? null : L[0];
    }
    function s(L) {
      if (L.length === 0) return null;
      var U = L[0], q = L.pop();
      if (q !== U) {
        L[0] = q;
        e: for (var Q = 0, ae = L.length, N = ae >>> 1; Q < N; ) {
          var X = 2 * (Q + 1) - 1, P = L[X], ie = X + 1, fe = L[ie];
          if (0 > o(P, q))
            ie < ae && 0 > o(fe, P) ? (L[Q] = fe, L[ie] = q, Q = ie) : (L[Q] = P, L[X] = q, Q = X);
          else if (ie < ae && 0 > o(fe, q))
            L[Q] = fe, L[ie] = q, Q = ie;
          else break e;
        }
      }
      return U;
    }
    function o(L, U) {
      var q = L.sortIndex - U.sortIndex;
      return q !== 0 ? q : L.id - U.id;
    }
    if (n.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var c = performance;
      n.unstable_now = function() {
        return c.now();
      };
    } else {
      var h = Date, m = h.now();
      n.unstable_now = function() {
        return h.now() - m;
      };
    }
    var v = [], p = [], b = 1, g = null, S = 3, w = !1, j = !1, T = !1, A = !1, C = typeof setTimeout == "function" ? setTimeout : null, D = typeof clearTimeout == "function" ? clearTimeout : null, z = typeof setImmediate < "u" ? setImmediate : null;
    function k(L) {
      for (var U = r(p); U !== null; ) {
        if (U.callback === null) s(p);
        else if (U.startTime <= L)
          s(p), U.sortIndex = U.expirationTime, a(v, U);
        else break;
        U = r(p);
      }
    }
    function W(L) {
      if (T = !1, k(L), !j)
        if (r(v) !== null)
          j = !0, G || (G = !0, oe());
        else {
          var U = r(p);
          U !== null && le(W, U.startTime - L);
        }
    }
    var G = !1, ee = -1, R = 5, H = -1;
    function Z() {
      return A ? !0 : !(n.unstable_now() - H < R);
    }
    function ue() {
      if (A = !1, G) {
        var L = n.unstable_now();
        H = L;
        var U = !0;
        try {
          e: {
            j = !1, T && (T = !1, D(ee), ee = -1), w = !0;
            var q = S;
            try {
              t: {
                for (k(L), g = r(v); g !== null && !(g.expirationTime > L && Z()); ) {
                  var Q = g.callback;
                  if (typeof Q == "function") {
                    g.callback = null, S = g.priorityLevel;
                    var ae = Q(
                      g.expirationTime <= L
                    );
                    if (L = n.unstable_now(), typeof ae == "function") {
                      g.callback = ae, k(L), U = !0;
                      break t;
                    }
                    g === r(v) && s(v), k(L);
                  } else s(v);
                  g = r(v);
                }
                if (g !== null) U = !0;
                else {
                  var N = r(p);
                  N !== null && le(
                    W,
                    N.startTime - L
                  ), U = !1;
                }
              }
              break e;
            } finally {
              g = null, S = q, w = !1;
            }
            U = void 0;
          }
        } finally {
          U ? oe() : G = !1;
        }
      }
    }
    var oe;
    if (typeof z == "function")
      oe = function() {
        z(ue);
      };
    else if (typeof MessageChannel < "u") {
      var ve = new MessageChannel(), je = ve.port2;
      ve.port1.onmessage = ue, oe = function() {
        je.postMessage(null);
      };
    } else
      oe = function() {
        C(ue, 0);
      };
    function le(L, U) {
      ee = C(function() {
        L(n.unstable_now());
      }, U);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(L) {
      L.callback = null;
    }, n.unstable_forceFrameRate = function(L) {
      0 > L || 125 < L ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : R = 0 < L ? Math.floor(1e3 / L) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, n.unstable_next = function(L) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var U = 3;
          break;
        default:
          U = S;
      }
      var q = S;
      S = U;
      try {
        return L();
      } finally {
        S = q;
      }
    }, n.unstable_requestPaint = function() {
      A = !0;
    }, n.unstable_runWithPriority = function(L, U) {
      switch (L) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          L = 3;
      }
      var q = S;
      S = L;
      try {
        return U();
      } finally {
        S = q;
      }
    }, n.unstable_scheduleCallback = function(L, U, q) {
      var Q = n.unstable_now();
      switch (typeof q == "object" && q !== null ? (q = q.delay, q = typeof q == "number" && 0 < q ? Q + q : Q) : q = Q, L) {
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
      return ae = q + ae, L = {
        id: b++,
        callback: U,
        priorityLevel: L,
        startTime: q,
        expirationTime: ae,
        sortIndex: -1
      }, q > Q ? (L.sortIndex = q, a(p, L), r(v) === null && L === r(p) && (T ? (D(ee), ee = -1) : T = !0, le(W, q - Q))) : (L.sortIndex = ae, a(v, L), j || w || (j = !0, G || (G = !0, oe()))), L;
    }, n.unstable_shouldYield = Z, n.unstable_wrapCallback = function(L) {
      var U = S;
      return function() {
        var q = S;
        S = U;
        try {
          return L.apply(this, arguments);
        } finally {
          S = q;
        }
      };
    };
  })(Bd)), Bd;
}
var Cv;
function iE() {
  return Cv || (Cv = 1, kd.exports = aE()), kd.exports;
}
var Hd = { exports: {} }, Wt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Nv;
function rE() {
  if (Nv) return Wt;
  Nv = 1;
  var n = Jf();
  function a(v) {
    var p = "https://react.dev/errors/" + v;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        p += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + v + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function c(v, p, b) {
    var g = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: g == null ? null : "" + g,
      children: v,
      containerInfo: p,
      implementation: b
    };
  }
  var h = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(v, p) {
    if (v === "font") return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return Wt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, Wt.createPortal = function(v, p) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(a(299));
    return c(v, p, null, b);
  }, Wt.flushSync = function(v) {
    var p = h.T, b = s.p;
    try {
      if (h.T = null, s.p = 2, v) return v();
    } finally {
      h.T = p, s.p = b, s.d.f();
    }
  }, Wt.preconnect = function(v, p) {
    typeof v == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, s.d.C(v, p));
  }, Wt.prefetchDNS = function(v) {
    typeof v == "string" && s.d.D(v);
  }, Wt.preinit = function(v, p) {
    if (typeof v == "string" && p && typeof p.as == "string") {
      var b = p.as, g = m(b, p.crossOrigin), S = typeof p.integrity == "string" ? p.integrity : void 0, w = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      b === "style" ? s.d.S(
        v,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: g,
          integrity: S,
          fetchPriority: w
        }
      ) : b === "script" && s.d.X(v, {
        crossOrigin: g,
        integrity: S,
        fetchPriority: w,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, Wt.preinitModule = function(v, p) {
    if (typeof v == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var b = m(
            p.as,
            p.crossOrigin
          );
          s.d.M(v, {
            crossOrigin: b,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0
          });
        }
      } else p == null && s.d.M(v);
  }, Wt.preload = function(v, p) {
    if (typeof v == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var b = p.as, g = m(b, p.crossOrigin);
      s.d.L(v, b, {
        crossOrigin: g,
        integrity: typeof p.integrity == "string" ? p.integrity : void 0,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0,
        type: typeof p.type == "string" ? p.type : void 0,
        fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0,
        referrerPolicy: typeof p.referrerPolicy == "string" ? p.referrerPolicy : void 0,
        imageSrcSet: typeof p.imageSrcSet == "string" ? p.imageSrcSet : void 0,
        imageSizes: typeof p.imageSizes == "string" ? p.imageSizes : void 0,
        media: typeof p.media == "string" ? p.media : void 0
      });
    }
  }, Wt.preloadModule = function(v, p) {
    if (typeof v == "string")
      if (p) {
        var b = m(p.as, p.crossOrigin);
        s.d.m(v, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: b,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else s.d.m(v);
  }, Wt.requestFormReset = function(v) {
    s.d.r(v);
  }, Wt.unstable_batchedUpdates = function(v, p) {
    return v(p);
  }, Wt.useFormState = function(v, p, b) {
    return h.H.useFormState(v, p, b);
  }, Wt.useFormStatus = function() {
    return h.H.useHostTransitionStatus();
  }, Wt.version = "19.2.5", Wt;
}
var Mv;
function db() {
  if (Mv) return Hd.exports;
  Mv = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Hd.exports = rE(), Hd.exports;
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
var Rv;
function lE() {
  if (Rv) return Fl;
  Rv = 1;
  var n = iE(), a = Jf(), r = db();
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
  function h(e) {
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
  function v(e) {
    if (c(e) !== e)
      throw Error(s(188));
  }
  function p(e) {
    var t = e.alternate;
    if (!t) {
      if (t = c(e), t === null) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var i = e, l = t; ; ) {
      var u = i.return;
      if (u === null) break;
      var d = u.alternate;
      if (d === null) {
        if (l = u.return, l !== null) {
          i = l;
          continue;
        }
        break;
      }
      if (u.child === d.child) {
        for (d = u.child; d; ) {
          if (d === i) return v(u), e;
          if (d === l) return v(u), t;
          d = d.sibling;
        }
        throw Error(s(188));
      }
      if (i.return !== l.return) i = u, l = d;
      else {
        for (var y = !1, E = u.child; E; ) {
          if (E === i) {
            y = !0, i = u, l = d;
            break;
          }
          if (E === l) {
            y = !0, l = u, i = d;
            break;
          }
          E = E.sibling;
        }
        if (!y) {
          for (E = d.child; E; ) {
            if (E === i) {
              y = !0, i = d, l = u;
              break;
            }
            if (E === l) {
              y = !0, l = d, i = u;
              break;
            }
            E = E.sibling;
          }
          if (!y) throw Error(s(189));
        }
      }
      if (i.alternate !== l) throw Error(s(190));
    }
    if (i.tag !== 3) throw Error(s(188));
    return i.stateNode.current === i ? e : t;
  }
  function b(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = b(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var g = Object.assign, S = Symbol.for("react.element"), w = Symbol.for("react.transitional.element"), j = Symbol.for("react.portal"), T = Symbol.for("react.fragment"), A = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), D = Symbol.for("react.consumer"), z = Symbol.for("react.context"), k = Symbol.for("react.forward_ref"), W = Symbol.for("react.suspense"), G = Symbol.for("react.suspense_list"), ee = Symbol.for("react.memo"), R = Symbol.for("react.lazy"), H = Symbol.for("react.activity"), Z = Symbol.for("react.memo_cache_sentinel"), ue = Symbol.iterator;
  function oe(e) {
    return e === null || typeof e != "object" ? null : (e = ue && e[ue] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var ve = Symbol.for("react.client.reference");
  function je(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === ve ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case T:
        return "Fragment";
      case C:
        return "Profiler";
      case A:
        return "StrictMode";
      case W:
        return "Suspense";
      case G:
        return "SuspenseList";
      case H:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case j:
          return "Portal";
        case z:
          return e.displayName || "Context";
        case D:
          return (e._context.displayName || "Context") + ".Consumer";
        case k:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ee:
          return t = e.displayName || null, t !== null ? t : je(e.type) || "Memo";
        case R:
          t = e._payload, e = e._init;
          try {
            return je(e(t));
          } catch {
          }
      }
    return null;
  }
  var le = Array.isArray, L = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, U = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Q = [], ae = -1;
  function N(e) {
    return { current: e };
  }
  function X(e) {
    0 > ae || (e.current = Q[ae], Q[ae] = null, ae--);
  }
  function P(e, t) {
    ae++, Q[ae] = e.current, e.current = t;
  }
  var ie = N(null), fe = N(null), ye = N(null), Me = N(null);
  function Ae(e, t) {
    switch (P(ye, t), P(fe, e), P(ie, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Fg(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Fg(t), e = Ig(t, e);
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
    X(ie), P(ie, e);
  }
  function se() {
    X(ie), X(fe), X(ye);
  }
  function De(e) {
    e.memoizedState !== null && P(Me, e);
    var t = ie.current, i = Ig(t, e.type);
    t !== i && (P(fe, e), P(ie, i));
  }
  function Oe(e) {
    fe.current === e && (X(ie), X(fe)), Me.current === e && (X(Me), Bl._currentValue = q);
  }
  var _e, We;
  function ft(e) {
    if (_e === void 0)
      try {
        throw Error();
      } catch (i) {
        var t = i.stack.trim().match(/\n( *(at )?)/);
        _e = t && t[1] || "", We = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + _e + e + We;
  }
  var Mn = !1;
  function ta(e, t) {
    if (!e || Mn) return "";
    Mn = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var ne = function() {
                throw Error();
              };
              if (Object.defineProperty(ne.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(ne, []);
                } catch (K) {
                  var I = K;
                }
                Reflect.construct(e, [], ne);
              } else {
                try {
                  ne.call();
                } catch (K) {
                  I = K;
                }
                e.call(ne.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (K) {
                I = K;
              }
              (ne = e()) && typeof ne.catch == "function" && ne.catch(function() {
              });
            }
          } catch (K) {
            if (K && I && typeof K.stack == "string")
              return [K.stack, I.stack];
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
      var d = l.DetermineComponentFrameRoot(), y = d[0], E = d[1];
      if (y && E) {
        var _ = y.split(`
`), F = E.split(`
`);
        for (u = l = 0; l < _.length && !_[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; u < F.length && !F[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (l === _.length || u === F.length)
          for (l = _.length - 1, u = F.length - 1; 1 <= l && 0 <= u && _[l] !== F[u]; )
            u--;
        for (; 1 <= l && 0 <= u; l--, u--)
          if (_[l] !== F[u]) {
            if (l !== 1 || u !== 1)
              do
                if (l--, u--, 0 > u || _[l] !== F[u]) {
                  var J = `
` + _[l].replace(" at new ", " at ");
                  return e.displayName && J.includes("<anonymous>") && (J = J.replace("<anonymous>", e.displayName)), J;
                }
              while (1 <= l && 0 <= u);
            break;
          }
      }
    } finally {
      Mn = !1, Error.prepareStackTrace = i;
    }
    return (i = e ? e.displayName || e.name : "") ? ft(i) : "";
  }
  function Ft(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return ft(e.type);
      case 16:
        return ft("Lazy");
      case 13:
        return e.child !== t && t !== null ? ft("Suspense Fallback") : ft("Suspense");
      case 19:
        return ft("SuspenseList");
      case 0:
      case 15:
        return ta(e.type, !1);
      case 11:
        return ta(e.type.render, !1);
      case 1:
        return ta(e.type, !0);
      case 31:
        return ft("Activity");
      default:
        return "";
    }
  }
  function ha(e) {
    try {
      var t = "", i = null;
      do
        t += Ft(e, i), i = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var Mt = Object.prototype.hasOwnProperty, na = n.unstable_scheduleCallback, ma = n.unstable_cancelCallback, Vt = n.unstable_shouldYield, Rn = n.unstable_requestPaint, he = n.unstable_now, Le = n.unstable_getCurrentPriorityLevel, Be = n.unstable_ImmediatePriority, ht = n.unstable_UserBlockingPriority, nn = n.unstable_NormalPriority, an = n.unstable_LowPriority, kt = n.unstable_IdlePriority, Ti = n.log, aa = n.unstable_setDisableYieldValue, Gn = null, It = null;
  function Et(e) {
    if (typeof Ti == "function" && aa(e), It && typeof It.setStrictMode == "function")
      try {
        It.setStrictMode(Gn, e);
      } catch {
      }
  }
  var Bt = Math.clz32 ? Math.clz32 : An, er = Math.log, qa = Math.LN2;
  function An(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (er(e) / qa | 0) | 0;
  }
  var pa = 256, Xn = 262144, ia = 4194304;
  function sn(e) {
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
  function ze(e, t, i) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var u = 0, d = e.suspendedLanes, y = e.pingedLanes;
    e = e.warmLanes;
    var E = l & 134217727;
    return E !== 0 ? (l = E & ~d, l !== 0 ? u = sn(l) : (y &= E, y !== 0 ? u = sn(y) : i || (i = E & ~e, i !== 0 && (u = sn(i))))) : (E = l & ~d, E !== 0 ? u = sn(E) : y !== 0 ? u = sn(y) : i || (i = l & ~e, i !== 0 && (u = sn(i)))), u === 0 ? 0 : t !== 0 && t !== u && (t & d) === 0 && (d = u & -u, i = t & -t, d >= i || d === 32 && (i & 4194048) !== 0) ? t : u;
  }
  function ot(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Rt(e, t) {
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
  function Ht() {
    var e = ia;
    return ia <<= 1, (ia & 62914560) === 0 && (ia = 4194304), e;
  }
  function gn(e) {
    for (var t = [], i = 0; 31 > i; i++) t.push(e);
    return t;
  }
  function at(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Gt(e, t, i, l, u, d) {
    var y = e.pendingLanes;
    e.pendingLanes = i, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= i, e.entangledLanes &= i, e.errorRecoveryDisabledLanes &= i, e.shellSuspendCounter = 0;
    var E = e.entanglements, _ = e.expirationTimes, F = e.hiddenUpdates;
    for (i = y & ~i; 0 < i; ) {
      var J = 31 - Bt(i), ne = 1 << J;
      E[J] = 0, _[J] = -1;
      var I = F[J];
      if (I !== null)
        for (F[J] = null, J = 0; J < I.length; J++) {
          var K = I[J];
          K !== null && (K.lane &= -536870913);
        }
      i &= ~ne;
    }
    l !== 0 && ga(e, l, 0), d !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= d & ~(y & ~t));
  }
  function ga(e, t, i) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - Bt(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | i & 261930;
  }
  function Pt(e, t) {
    var i = e.entangledLanes |= t;
    for (e = e.entanglements; i; ) {
      var l = 31 - Bt(i), u = 1 << l;
      u & t | e[l] & t && (e[l] |= t), i &= ~u;
    }
  }
  function M(e, t) {
    var i = t & -t;
    return i = (i & 42) !== 0 ? 1 : V(i), (i & (e.suspendedLanes | t)) !== 0 ? 0 : i;
  }
  function V(e) {
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
  function $(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function re() {
    var e = U.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : mv(e.type));
  }
  function ce(e, t) {
    var i = U.p;
    try {
      return U.p = e, t();
    } finally {
      U.p = i;
    }
  }
  var xe = Math.random().toString(36).slice(2), me = "__reactFiber$" + xe, pe = "__reactProps$" + xe, we = "__reactContainer$" + xe, ge = "__reactEvents$" + xe, Ne = "__reactListeners$" + xe, Te = "__reactHandles$" + xe, Qe = "__reactResources$" + xe, He = "__reactMarker$" + xe;
  function ut(e) {
    delete e[me], delete e[pe], delete e[ge], delete e[Ne], delete e[Te];
  }
  function it(e) {
    var t = e[me];
    if (t) return t;
    for (var i = e.parentNode; i; ) {
      if (t = i[we] || i[me]) {
        if (i = t.alternate, t.child !== null || i !== null && i.child !== null)
          for (e = Jg(e); e !== null; ) {
            if (i = e[me]) return i;
            e = Jg(e);
          }
        return t;
      }
      e = i, i = e.parentNode;
    }
    return null;
  }
  function yt(e) {
    if (e = e[me] || e[we]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Ye(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(s(33));
  }
  function At(e) {
    var t = e[Qe];
    return t || (t = e[Qe] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function dt(e) {
    e[He] = !0;
  }
  var $a = /* @__PURE__ */ new Set(), Kn = {};
  function $t(e, t) {
    ra(e, t), ra(e + "Capture", t);
  }
  function ra(e, t) {
    for (Kn[e] = t, e = 0; e < t.length; e++)
      $a.add(t[e]);
  }
  var Ci = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), la = {}, Ni = {};
  function tr(e) {
    return Mt.call(Ni, e) ? !0 : Mt.call(la, e) ? !1 : Ci.test(e) ? Ni[e] = !0 : (la[e] = !0, !1);
  }
  function qe(e, t, i) {
    if (tr(t))
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
  function jt(e, t, i) {
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
  function Jt(e, t, i, l) {
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
  function _t(e) {
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
  function mt(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function nr(e, t, i) {
    var l = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var u = l.get, d = l.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(y) {
          i = "" + y, d.call(this, y);
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
  function ar(e) {
    if (!e._valueTracker) {
      var t = mt(e) ? "checked" : "value";
      e._valueTracker = nr(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function ws(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var i = t.getValue(), l = "";
    return e && (l = mt(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== i ? (t.setValue(e), !0) : !1;
  }
  function Es(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var G1 = /[\n"\\]/g;
  function _n(e) {
    return e.replace(
      G1,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ru(e, t, i, l, u, d, y, E) {
    e.name = "", y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? e.type = y : e.removeAttribute("type"), t != null ? y === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + _t(t)) : e.value !== "" + _t(t) && (e.value = "" + _t(t)) : y !== "submit" && y !== "reset" || e.removeAttribute("value"), t != null ? Au(e, y, _t(t)) : i != null ? Au(e, y, _t(i)) : l != null && e.removeAttribute("value"), u == null && d != null && (e.defaultChecked = !!d), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + _t(E) : e.removeAttribute("name");
  }
  function kh(e, t, i, l, u, d, y, E) {
    if (d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.type = d), t != null || i != null) {
      if (!(d !== "submit" && d !== "reset" || t != null)) {
        ar(e);
        return;
      }
      i = i != null ? "" + _t(i) : "", t = t != null ? "" + _t(t) : i, E || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? u, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = E ? e.checked : !!l, e.defaultChecked = !!l, y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" && (e.name = y), ar(e);
  }
  function Au(e, t, i) {
    t === "number" && Es(e.ownerDocument) === e || e.defaultValue === "" + i || (e.defaultValue = "" + i);
  }
  function ir(e, t, i, l) {
    if (e = e.options, t) {
      t = {};
      for (var u = 0; u < i.length; u++)
        t["$" + i[u]] = !0;
      for (i = 0; i < e.length; i++)
        u = t.hasOwnProperty("$" + e[i].value), e[i].selected !== u && (e[i].selected = u), u && l && (e[i].defaultSelected = !0);
    } else {
      for (i = "" + _t(i), t = null, u = 0; u < e.length; u++) {
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
    if (t != null && (t = "" + _t(t), t !== e.value && (e.value = t), i == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = i != null ? "" + _t(i) : "";
  }
  function Hh(e, t, i, l) {
    if (t == null) {
      if (l != null) {
        if (i != null) throw Error(s(92));
        if (le(l)) {
          if (1 < l.length) throw Error(s(93));
          l = l[0];
        }
        i = l;
      }
      i == null && (i = ""), t = i;
    }
    i = _t(t), e.defaultValue = i, l = e.textContent, l === i && l !== "" && l !== null && (e.value = l), ar(e);
  }
  function rr(e, t) {
    if (t) {
      var i = e.firstChild;
      if (i && i === e.lastChild && i.nodeType === 3) {
        i.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var X1 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function qh(e, t, i) {
    var l = t.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, i) : typeof i != "number" || i === 0 || X1.has(t) ? t === "float" ? e.cssFloat = i : e[t] = ("" + i).trim() : e[t] = i + "px";
  }
  function $h(e, t, i) {
    if (t != null && typeof t != "object")
      throw Error(s(62));
    if (e = e.style, i != null) {
      for (var l in i)
        !i.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var u in t)
        l = t[u], t.hasOwnProperty(u) && i[u] !== l && qh(e, u, l);
    } else
      for (var d in t)
        t.hasOwnProperty(d) && qh(e, d, t[d]);
  }
  function _u(e) {
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
  var K1 = /* @__PURE__ */ new Map([
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
  ]), Q1 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function js(e) {
    return Q1.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function va() {
  }
  var Du = null;
  function zu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var lr = null, sr = null;
  function Yh(e) {
    var t = yt(e);
    if (t && (e = t.stateNode)) {
      var i = e[pe] || null;
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
              'input[name="' + _n(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < i.length; t++) {
              var l = i[t];
              if (l !== e && l.form === e.form) {
                var u = l[pe] || null;
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
              l = i[t], l.form === e.form && ws(l);
          }
          break e;
        case "textarea":
          Bh(e, i.value, i.defaultValue);
          break e;
        case "select":
          t = i.value, t != null && ir(e, !!i.multiple, t, !1);
      }
    }
  }
  var Ou = !1;
  function Fh(e, t, i) {
    if (Ou) return e(t, i);
    Ou = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (Ou = !1, (lr !== null || sr !== null) && (fo(), lr && (t = lr, e = sr, sr = lr = null, Yh(t), e)))
        for (t = 0; t < e.length; t++) Yh(e[t]);
    }
  }
  function nl(e, t) {
    var i = e.stateNode;
    if (i === null) return null;
    var l = i[pe] || null;
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
  var ya = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Lu = !1;
  if (ya)
    try {
      var al = {};
      Object.defineProperty(al, "passive", {
        get: function() {
          Lu = !0;
        }
      }), window.addEventListener("test", al, al), window.removeEventListener("test", al, al);
    } catch {
      Lu = !1;
    }
  var Ya = null, Uu = null, Ts = null;
  function Ih() {
    if (Ts) return Ts;
    var e, t = Uu, i = t.length, l, u = "value" in Ya ? Ya.value : Ya.textContent, d = u.length;
    for (e = 0; e < i && t[e] === u[e]; e++) ;
    var y = i - e;
    for (l = 1; l <= y && t[i - l] === u[d - l]; l++) ;
    return Ts = u.slice(e, 1 < l ? 1 - l : void 0);
  }
  function Cs(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ns() {
    return !0;
  }
  function Gh() {
    return !1;
  }
  function on(e) {
    function t(i, l, u, d, y) {
      this._reactName = i, this._targetInst = u, this.type = l, this.nativeEvent = d, this.target = y, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (i = e[E], this[E] = i ? i(d) : d[E]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? Ns : Gh, this.isPropagationStopped = Gh, this;
    }
    return g(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = Ns);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = Ns);
      },
      persist: function() {
      },
      isPersistent: Ns
    }), t;
  }
  var Mi = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Ms = on(Mi), il = g({}, Mi, { view: 0, detail: 0 }), Z1 = on(il), Vu, ku, rl, Rs = g({}, il, {
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
    getModifierState: Hu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== rl && (rl && e.type === "mousemove" ? (Vu = e.screenX - rl.screenX, ku = e.screenY - rl.screenY) : ku = Vu = 0, rl = e), Vu);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : ku;
    }
  }), Xh = on(Rs), P1 = g({}, Rs, { dataTransfer: 0 }), J1 = on(P1), W1 = g({}, il, { relatedTarget: 0 }), Bu = on(W1), eS = g({}, Mi, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), tS = on(eS), nS = g({}, Mi, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), aS = on(nS), iS = g({}, Mi, { data: 0 }), Kh = on(iS), rS = {
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
  }, lS = {
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
  function oS(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = sS[e]) ? !!t[e] : !1;
  }
  function Hu() {
    return oS;
  }
  var uS = g({}, il, {
    key: function(e) {
      if (e.key) {
        var t = rS[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Cs(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? lS[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Hu,
    charCode: function(e) {
      return e.type === "keypress" ? Cs(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Cs(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), cS = on(uS), dS = g({}, Rs, {
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
  }), Qh = on(dS), fS = g({}, il, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Hu
  }), hS = on(fS), mS = g({}, Mi, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), pS = on(mS), gS = g({}, Rs, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), vS = on(gS), yS = g({}, Mi, {
    newState: 0,
    oldState: 0
  }), bS = on(yS), xS = [9, 13, 27, 32], qu = ya && "CompositionEvent" in window, ll = null;
  ya && "documentMode" in document && (ll = document.documentMode);
  var SS = ya && "TextEvent" in window && !ll, Zh = ya && (!qu || ll && 8 < ll && 11 >= ll), Ph = " ", Jh = !1;
  function Wh(e, t) {
    switch (e) {
      case "keyup":
        return xS.indexOf(t.keyCode) !== -1;
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
  function em(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var or = !1;
  function wS(e, t) {
    switch (e) {
      case "compositionend":
        return em(t);
      case "keypress":
        return t.which !== 32 ? null : (Jh = !0, Ph);
      case "textInput":
        return e = t.data, e === Ph && Jh ? null : e;
      default:
        return null;
    }
  }
  function ES(e, t) {
    if (or)
      return e === "compositionend" || !qu && Wh(e, t) ? (e = Ih(), Ts = Uu = Ya = null, or = !1, e) : null;
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
  var jS = {
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
  function tm(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!jS[e.type] : t === "textarea";
  }
  function nm(e, t, i, l) {
    lr ? sr ? sr.push(l) : sr = [l] : lr = l, t = bo(t, "onChange"), 0 < t.length && (i = new Ms(
      "onChange",
      "change",
      null,
      i,
      l
    ), e.push({ event: i, listeners: t }));
  }
  var sl = null, ol = null;
  function TS(e) {
    kg(e, 0);
  }
  function As(e) {
    var t = Ye(e);
    if (ws(t)) return e;
  }
  function am(e, t) {
    if (e === "change") return t;
  }
  var im = !1;
  if (ya) {
    var $u;
    if (ya) {
      var Yu = "oninput" in document;
      if (!Yu) {
        var rm = document.createElement("div");
        rm.setAttribute("oninput", "return;"), Yu = typeof rm.oninput == "function";
      }
      $u = Yu;
    } else $u = !1;
    im = $u && (!document.documentMode || 9 < document.documentMode);
  }
  function lm() {
    sl && (sl.detachEvent("onpropertychange", sm), ol = sl = null);
  }
  function sm(e) {
    if (e.propertyName === "value" && As(ol)) {
      var t = [];
      nm(
        t,
        ol,
        e,
        zu(e)
      ), Fh(TS, t);
    }
  }
  function CS(e, t, i) {
    e === "focusin" ? (lm(), sl = t, ol = i, sl.attachEvent("onpropertychange", sm)) : e === "focusout" && lm();
  }
  function NS(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return As(ol);
  }
  function MS(e, t) {
    if (e === "click") return As(t);
  }
  function RS(e, t) {
    if (e === "input" || e === "change")
      return As(t);
  }
  function AS(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var vn = typeof Object.is == "function" ? Object.is : AS;
  function ul(e, t) {
    if (vn(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var i = Object.keys(e), l = Object.keys(t);
    if (i.length !== l.length) return !1;
    for (l = 0; l < i.length; l++) {
      var u = i[l];
      if (!Mt.call(t, u) || !vn(e[u], t[u]))
        return !1;
    }
    return !0;
  }
  function om(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function um(e, t) {
    var i = om(e);
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
      i = om(i);
    }
  }
  function cm(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? cm(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function dm(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Es(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var i = typeof t.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) e = t.contentWindow;
      else break;
      t = Es(e.document);
    }
    return t;
  }
  function Fu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var _S = ya && "documentMode" in document && 11 >= document.documentMode, ur = null, Iu = null, cl = null, Gu = !1;
  function fm(e, t, i) {
    var l = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Gu || ur == null || ur !== Es(l) || (l = ur, "selectionStart" in l && Fu(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), cl && ul(cl, l) || (cl = l, l = bo(Iu, "onSelect"), 0 < l.length && (t = new Ms(
      "onSelect",
      "select",
      null,
      t,
      i
    ), e.push({ event: t, listeners: l }), t.target = ur)));
  }
  function Ri(e, t) {
    var i = {};
    return i[e.toLowerCase()] = t.toLowerCase(), i["Webkit" + e] = "webkit" + t, i["Moz" + e] = "moz" + t, i;
  }
  var cr = {
    animationend: Ri("Animation", "AnimationEnd"),
    animationiteration: Ri("Animation", "AnimationIteration"),
    animationstart: Ri("Animation", "AnimationStart"),
    transitionrun: Ri("Transition", "TransitionRun"),
    transitionstart: Ri("Transition", "TransitionStart"),
    transitioncancel: Ri("Transition", "TransitionCancel"),
    transitionend: Ri("Transition", "TransitionEnd")
  }, Xu = {}, hm = {};
  ya && (hm = document.createElement("div").style, "AnimationEvent" in window || (delete cr.animationend.animation, delete cr.animationiteration.animation, delete cr.animationstart.animation), "TransitionEvent" in window || delete cr.transitionend.transition);
  function Ai(e) {
    if (Xu[e]) return Xu[e];
    if (!cr[e]) return e;
    var t = cr[e], i;
    for (i in t)
      if (t.hasOwnProperty(i) && i in hm)
        return Xu[e] = t[i];
    return e;
  }
  var mm = Ai("animationend"), pm = Ai("animationiteration"), gm = Ai("animationstart"), DS = Ai("transitionrun"), zS = Ai("transitionstart"), OS = Ai("transitioncancel"), vm = Ai("transitionend"), ym = /* @__PURE__ */ new Map(), Ku = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Ku.push("scrollEnd");
  function Qn(e, t) {
    ym.set(e, t), $t(t, [e]);
  }
  var _s = typeof reportError == "function" ? reportError : function(e) {
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
  }, Dn = [], dr = 0, Qu = 0;
  function Ds() {
    for (var e = dr, t = Qu = dr = 0; t < e; ) {
      var i = Dn[t];
      Dn[t++] = null;
      var l = Dn[t];
      Dn[t++] = null;
      var u = Dn[t];
      Dn[t++] = null;
      var d = Dn[t];
      if (Dn[t++] = null, l !== null && u !== null) {
        var y = l.pending;
        y === null ? u.next = u : (u.next = y.next, y.next = u), l.pending = u;
      }
      d !== 0 && bm(i, u, d);
    }
  }
  function zs(e, t, i, l) {
    Dn[dr++] = e, Dn[dr++] = t, Dn[dr++] = i, Dn[dr++] = l, Qu |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function Zu(e, t, i, l) {
    return zs(e, t, i, l), Os(e);
  }
  function _i(e, t) {
    return zs(e, null, null, t), Os(e);
  }
  function bm(e, t, i) {
    e.lanes |= i;
    var l = e.alternate;
    l !== null && (l.lanes |= i);
    for (var u = !1, d = e.return; d !== null; )
      d.childLanes |= i, l = d.alternate, l !== null && (l.childLanes |= i), d.tag === 22 && (e = d.stateNode, e === null || e._visibility & 1 || (u = !0)), e = d, d = d.return;
    return e.tag === 3 ? (d = e.stateNode, u && t !== null && (u = 31 - Bt(i), e = d.hiddenUpdates, l = e[u], l === null ? e[u] = [t] : l.push(t), t.lane = i | 536870912), d) : null;
  }
  function Os(e) {
    if (50 < Dl)
      throw Dl = 0, rd = null, Error(s(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var fr = {};
  function LS(e, t, i, l) {
    this.tag = e, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function yn(e, t, i, l) {
    return new LS(e, t, i, l);
  }
  function Pu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function ba(e, t) {
    var i = e.alternate;
    return i === null ? (i = yn(
      e.tag,
      t,
      e.key,
      e.mode
    ), i.elementType = e.elementType, i.type = e.type, i.stateNode = e.stateNode, i.alternate = e, e.alternate = i) : (i.pendingProps = t, i.type = e.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = e.flags & 65011712, i.childLanes = e.childLanes, i.lanes = e.lanes, i.child = e.child, i.memoizedProps = e.memoizedProps, i.memoizedState = e.memoizedState, i.updateQueue = e.updateQueue, t = e.dependencies, i.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, i.sibling = e.sibling, i.index = e.index, i.ref = e.ref, i.refCleanup = e.refCleanup, i;
  }
  function xm(e, t) {
    e.flags &= 65011714;
    var i = e.alternate;
    return i === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = i.childLanes, e.lanes = i.lanes, e.child = i.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = i.memoizedProps, e.memoizedState = i.memoizedState, e.updateQueue = i.updateQueue, e.type = i.type, t = i.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Ls(e, t, i, l, u, d) {
    var y = 0;
    if (l = e, typeof e == "function") Pu(e) && (y = 1);
    else if (typeof e == "string")
      y = Hw(
        e,
        i,
        ie.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case H:
          return e = yn(31, i, t, u), e.elementType = H, e.lanes = d, e;
        case T:
          return Di(i.children, u, d, t);
        case A:
          y = 8, u |= 24;
          break;
        case C:
          return e = yn(12, i, t, u | 2), e.elementType = C, e.lanes = d, e;
        case W:
          return e = yn(13, i, t, u), e.elementType = W, e.lanes = d, e;
        case G:
          return e = yn(19, i, t, u), e.elementType = G, e.lanes = d, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case z:
                y = 10;
                break e;
              case D:
                y = 9;
                break e;
              case k:
                y = 11;
                break e;
              case ee:
                y = 14;
                break e;
              case R:
                y = 16, l = null;
                break e;
            }
          y = 29, i = Error(
            s(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = yn(y, i, t, u), t.elementType = e, t.type = l, t.lanes = d, t;
  }
  function Di(e, t, i, l) {
    return e = yn(7, e, l, t), e.lanes = i, e;
  }
  function Ju(e, t, i) {
    return e = yn(6, e, null, t), e.lanes = i, e;
  }
  function Sm(e) {
    var t = yn(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Wu(e, t, i) {
    return t = yn(
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
  var wm = /* @__PURE__ */ new WeakMap();
  function zn(e, t) {
    if (typeof e == "object" && e !== null) {
      var i = wm.get(e);
      return i !== void 0 ? i : (t = {
        value: e,
        source: t,
        stack: ha(t)
      }, wm.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: ha(t)
    };
  }
  var hr = [], mr = 0, Us = null, dl = 0, On = [], Ln = 0, Fa = null, sa = 1, oa = "";
  function xa(e, t) {
    hr[mr++] = dl, hr[mr++] = Us, Us = e, dl = t;
  }
  function Em(e, t, i) {
    On[Ln++] = sa, On[Ln++] = oa, On[Ln++] = Fa, Fa = e;
    var l = sa;
    e = oa;
    var u = 32 - Bt(l) - 1;
    l &= ~(1 << u), i += 1;
    var d = 32 - Bt(t) + u;
    if (30 < d) {
      var y = u - u % 5;
      d = (l & (1 << y) - 1).toString(32), l >>= y, u -= y, sa = 1 << 32 - Bt(t) + u | i << u | l, oa = d + e;
    } else
      sa = 1 << d | i << u | l, oa = e;
  }
  function ec(e) {
    e.return !== null && (xa(e, 1), Em(e, 1, 0));
  }
  function tc(e) {
    for (; e === Us; )
      Us = hr[--mr], hr[mr] = null, dl = hr[--mr], hr[mr] = null;
    for (; e === Fa; )
      Fa = On[--Ln], On[Ln] = null, oa = On[--Ln], On[Ln] = null, sa = On[--Ln], On[Ln] = null;
  }
  function jm(e, t) {
    On[Ln++] = sa, On[Ln++] = oa, On[Ln++] = Fa, sa = t.id, oa = t.overflow, Fa = e;
  }
  var Xt = null, pt = null, Ke = !1, Ia = null, Un = !1, nc = Error(s(519));
  function Ga(e) {
    var t = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw fl(zn(t, e)), nc;
  }
  function Tm(e) {
    var t = e.stateNode, i = e.type, l = e.memoizedProps;
    switch (t[me] = e, t[pe] = l, i) {
      case "dialog":
        Ie("cancel", t), Ie("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ie("load", t);
        break;
      case "video":
      case "audio":
        for (i = 0; i < Ol.length; i++)
          Ie(Ol[i], t);
        break;
      case "source":
        Ie("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Ie("error", t), Ie("load", t);
        break;
      case "details":
        Ie("toggle", t);
        break;
      case "input":
        Ie("invalid", t), kh(
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
        Ie("invalid", t);
        break;
      case "textarea":
        Ie("invalid", t), Hh(t, l.value, l.defaultValue, l.children);
    }
    i = l.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || t.textContent === "" + i || l.suppressHydrationWarning === !0 || $g(t.textContent, i) ? (l.popover != null && (Ie("beforetoggle", t), Ie("toggle", t)), l.onScroll != null && Ie("scroll", t), l.onScrollEnd != null && Ie("scrollend", t), l.onClick != null && (t.onclick = va), t = !0) : t = !1, t || Ga(e, !0);
  }
  function Cm(e) {
    for (Xt = e.return; Xt; )
      switch (Xt.tag) {
        case 5:
        case 31:
        case 13:
          Un = !1;
          return;
        case 27:
        case 3:
          Un = !0;
          return;
        default:
          Xt = Xt.return;
      }
  }
  function pr(e) {
    if (e !== Xt) return !1;
    if (!Ke) return Cm(e), Ke = !0, !1;
    var t = e.tag, i;
    if ((i = t !== 3 && t !== 27) && ((i = t === 5) && (i = e.type, i = !(i !== "form" && i !== "button") || xd(e.type, e.memoizedProps)), i = !i), i && pt && Ga(e), Cm(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      pt = Pg(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      pt = Pg(e);
    } else
      t === 27 ? (t = pt, li(e.type) ? (e = Td, Td = null, pt = e) : pt = t) : pt = Xt ? kn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function zi() {
    pt = Xt = null, Ke = !1;
  }
  function ac() {
    var e = Ia;
    return e !== null && (fn === null ? fn = e : fn.push.apply(
      fn,
      e
    ), Ia = null), e;
  }
  function fl(e) {
    Ia === null ? Ia = [e] : Ia.push(e);
  }
  var ic = N(null), Oi = null, Sa = null;
  function Xa(e, t, i) {
    P(ic, t._currentValue), t._currentValue = i;
  }
  function wa(e) {
    e._currentValue = ic.current, X(ic);
  }
  function rc(e, t, i) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === i) break;
      e = e.return;
    }
  }
  function lc(e, t, i, l) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var d = u.dependencies;
      if (d !== null) {
        var y = u.child;
        d = d.firstContext;
        e: for (; d !== null; ) {
          var E = d;
          d = u;
          for (var _ = 0; _ < t.length; _++)
            if (E.context === t[_]) {
              d.lanes |= i, E = d.alternate, E !== null && (E.lanes |= i), rc(
                d.return,
                i,
                e
              ), l || (y = null);
              break e;
            }
          d = E.next;
        }
      } else if (u.tag === 18) {
        if (y = u.return, y === null) throw Error(s(341));
        y.lanes |= i, d = y.alternate, d !== null && (d.lanes |= i), rc(y, i, e), y = null;
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
  function gr(e, t, i, l) {
    e = null;
    for (var u = t, d = !1; u !== null; ) {
      if (!d) {
        if ((u.flags & 524288) !== 0) d = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var y = u.alternate;
        if (y === null) throw Error(s(387));
        if (y = y.memoizedProps, y !== null) {
          var E = u.type;
          vn(u.pendingProps.value, y.value) || (e !== null ? e.push(E) : e = [E]);
        }
      } else if (u === Me.current) {
        if (y = u.alternate, y === null) throw Error(s(387));
        y.memoizedState.memoizedState !== u.memoizedState.memoizedState && (e !== null ? e.push(Bl) : e = [Bl]);
      }
      u = u.return;
    }
    e !== null && lc(
      t,
      e,
      i,
      l
    ), t.flags |= 262144;
  }
  function Vs(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!vn(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Li(e) {
    Oi = e, Sa = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Kt(e) {
    return Nm(Oi, e);
  }
  function ks(e, t) {
    return Oi === null && Li(e), Nm(e, t);
  }
  function Nm(e, t) {
    var i = t._currentValue;
    if (t = { context: t, memoizedValue: i, next: null }, Sa === null) {
      if (e === null) throw Error(s(308));
      Sa = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Sa = Sa.next = t;
    return i;
  }
  var US = typeof AbortController < "u" ? AbortController : function() {
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
  }, VS = n.unstable_scheduleCallback, kS = n.unstable_NormalPriority, Dt = {
    $$typeof: z,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function sc() {
    return {
      controller: new US(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function hl(e) {
    e.refCount--, e.refCount === 0 && VS(kS, function() {
      e.controller.abort();
    });
  }
  var ml = null, oc = 0, vr = 0, yr = null;
  function BS(e, t) {
    if (ml === null) {
      var i = ml = [];
      oc = 0, vr = dd(), yr = {
        status: "pending",
        value: void 0,
        then: function(l) {
          i.push(l);
        }
      };
    }
    return oc++, t.then(Mm, Mm), t;
  }
  function Mm() {
    if (--oc === 0 && ml !== null) {
      yr !== null && (yr.status = "fulfilled");
      var e = ml;
      ml = null, vr = 0, yr = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function HS(e, t) {
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
  var Rm = L.S;
  L.S = function(e, t) {
    fg = he(), typeof t == "object" && t !== null && typeof t.then == "function" && BS(e, t), Rm !== null && Rm(e, t);
  };
  var Ui = N(null);
  function uc() {
    var e = Ui.current;
    return e !== null ? e : ct.pooledCache;
  }
  function Bs(e, t) {
    t === null ? P(Ui, Ui.current) : P(Ui, t.pool);
  }
  function Am() {
    var e = uc();
    return e === null ? null : { parent: Dt._currentValue, pool: e };
  }
  var br = Error(s(460)), cc = Error(s(474)), Hs = Error(s(542)), qs = { then: function() {
  } };
  function _m(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Dm(e, t, i) {
    switch (i = e[i], i === void 0 ? e.push(t) : i !== t && (t.then(va, va), t = i), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Om(e), e;
      default:
        if (typeof t.status == "string") t.then(va, va);
        else {
          if (e = ct, e !== null && 100 < e.shellSuspendCounter)
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
        throw ki = t, br;
    }
  }
  function Vi(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (ki = i, br) : i;
    }
  }
  var ki = null;
  function zm() {
    if (ki === null) throw Error(s(459));
    var e = ki;
    return ki = null, e;
  }
  function Om(e) {
    if (e === br || e === Hs)
      throw Error(s(483));
  }
  var xr = null, pl = 0;
  function $s(e) {
    var t = pl;
    return pl += 1, xr === null && (xr = []), Dm(xr, e, t);
  }
  function gl(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Ys(e, t) {
    throw t.$$typeof === S ? Error(s(525)) : (e = Object.prototype.toString.call(t), Error(
      s(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Lm(e) {
    function t(B, O) {
      if (e) {
        var Y = B.deletions;
        Y === null ? (B.deletions = [O], B.flags |= 16) : Y.push(O);
      }
    }
    function i(B, O) {
      if (!e) return null;
      for (; O !== null; )
        t(B, O), O = O.sibling;
      return null;
    }
    function l(B) {
      for (var O = /* @__PURE__ */ new Map(); B !== null; )
        B.key !== null ? O.set(B.key, B) : O.set(B.index, B), B = B.sibling;
      return O;
    }
    function u(B, O) {
      return B = ba(B, O), B.index = 0, B.sibling = null, B;
    }
    function d(B, O, Y) {
      return B.index = Y, e ? (Y = B.alternate, Y !== null ? (Y = Y.index, Y < O ? (B.flags |= 67108866, O) : Y) : (B.flags |= 67108866, O)) : (B.flags |= 1048576, O);
    }
    function y(B) {
      return e && B.alternate === null && (B.flags |= 67108866), B;
    }
    function E(B, O, Y, te) {
      return O === null || O.tag !== 6 ? (O = Ju(Y, B.mode, te), O.return = B, O) : (O = u(O, Y), O.return = B, O);
    }
    function _(B, O, Y, te) {
      var Ce = Y.type;
      return Ce === T ? J(
        B,
        O,
        Y.props.children,
        te,
        Y.key
      ) : O !== null && (O.elementType === Ce || typeof Ce == "object" && Ce !== null && Ce.$$typeof === R && Vi(Ce) === O.type) ? (O = u(O, Y.props), gl(O, Y), O.return = B, O) : (O = Ls(
        Y.type,
        Y.key,
        Y.props,
        null,
        B.mode,
        te
      ), gl(O, Y), O.return = B, O);
    }
    function F(B, O, Y, te) {
      return O === null || O.tag !== 4 || O.stateNode.containerInfo !== Y.containerInfo || O.stateNode.implementation !== Y.implementation ? (O = Wu(Y, B.mode, te), O.return = B, O) : (O = u(O, Y.children || []), O.return = B, O);
    }
    function J(B, O, Y, te, Ce) {
      return O === null || O.tag !== 7 ? (O = Di(
        Y,
        B.mode,
        te,
        Ce
      ), O.return = B, O) : (O = u(O, Y), O.return = B, O);
    }
    function ne(B, O, Y) {
      if (typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint")
        return O = Ju(
          "" + O,
          B.mode,
          Y
        ), O.return = B, O;
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case w:
            return Y = Ls(
              O.type,
              O.key,
              O.props,
              null,
              B.mode,
              Y
            ), gl(Y, O), Y.return = B, Y;
          case j:
            return O = Wu(
              O,
              B.mode,
              Y
            ), O.return = B, O;
          case R:
            return O = Vi(O), ne(B, O, Y);
        }
        if (le(O) || oe(O))
          return O = Di(
            O,
            B.mode,
            Y,
            null
          ), O.return = B, O;
        if (typeof O.then == "function")
          return ne(B, $s(O), Y);
        if (O.$$typeof === z)
          return ne(
            B,
            ks(B, O),
            Y
          );
        Ys(B, O);
      }
      return null;
    }
    function I(B, O, Y, te) {
      var Ce = O !== null ? O.key : null;
      if (typeof Y == "string" && Y !== "" || typeof Y == "number" || typeof Y == "bigint")
        return Ce !== null ? null : E(B, O, "" + Y, te);
      if (typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case w:
            return Y.key === Ce ? _(B, O, Y, te) : null;
          case j:
            return Y.key === Ce ? F(B, O, Y, te) : null;
          case R:
            return Y = Vi(Y), I(B, O, Y, te);
        }
        if (le(Y) || oe(Y))
          return Ce !== null ? null : J(B, O, Y, te, null);
        if (typeof Y.then == "function")
          return I(
            B,
            O,
            $s(Y),
            te
          );
        if (Y.$$typeof === z)
          return I(
            B,
            O,
            ks(B, Y),
            te
          );
        Ys(B, Y);
      }
      return null;
    }
    function K(B, O, Y, te, Ce) {
      if (typeof te == "string" && te !== "" || typeof te == "number" || typeof te == "bigint")
        return B = B.get(Y) || null, E(O, B, "" + te, Ce);
      if (typeof te == "object" && te !== null) {
        switch (te.$$typeof) {
          case w:
            return B = B.get(
              te.key === null ? Y : te.key
            ) || null, _(O, B, te, Ce);
          case j:
            return B = B.get(
              te.key === null ? Y : te.key
            ) || null, F(O, B, te, Ce);
          case R:
            return te = Vi(te), K(
              B,
              O,
              Y,
              te,
              Ce
            );
        }
        if (le(te) || oe(te))
          return B = B.get(Y) || null, J(O, B, te, Ce, null);
        if (typeof te.then == "function")
          return K(
            B,
            O,
            Y,
            $s(te),
            Ce
          );
        if (te.$$typeof === z)
          return K(
            B,
            O,
            Y,
            ks(O, te),
            Ce
          );
        Ys(O, te);
      }
      return null;
    }
    function be(B, O, Y, te) {
      for (var Ce = null, Ze = null, Ee = O, ke = O = 0, Xe = null; Ee !== null && ke < Y.length; ke++) {
        Ee.index > ke ? (Xe = Ee, Ee = null) : Xe = Ee.sibling;
        var Pe = I(
          B,
          Ee,
          Y[ke],
          te
        );
        if (Pe === null) {
          Ee === null && (Ee = Xe);
          break;
        }
        e && Ee && Pe.alternate === null && t(B, Ee), O = d(Pe, O, ke), Ze === null ? Ce = Pe : Ze.sibling = Pe, Ze = Pe, Ee = Xe;
      }
      if (ke === Y.length)
        return i(B, Ee), Ke && xa(B, ke), Ce;
      if (Ee === null) {
        for (; ke < Y.length; ke++)
          Ee = ne(B, Y[ke], te), Ee !== null && (O = d(
            Ee,
            O,
            ke
          ), Ze === null ? Ce = Ee : Ze.sibling = Ee, Ze = Ee);
        return Ke && xa(B, ke), Ce;
      }
      for (Ee = l(Ee); ke < Y.length; ke++)
        Xe = K(
          Ee,
          B,
          ke,
          Y[ke],
          te
        ), Xe !== null && (e && Xe.alternate !== null && Ee.delete(
          Xe.key === null ? ke : Xe.key
        ), O = d(
          Xe,
          O,
          ke
        ), Ze === null ? Ce = Xe : Ze.sibling = Xe, Ze = Xe);
      return e && Ee.forEach(function(di) {
        return t(B, di);
      }), Ke && xa(B, ke), Ce;
    }
    function Re(B, O, Y, te) {
      if (Y == null) throw Error(s(151));
      for (var Ce = null, Ze = null, Ee = O, ke = O = 0, Xe = null, Pe = Y.next(); Ee !== null && !Pe.done; ke++, Pe = Y.next()) {
        Ee.index > ke ? (Xe = Ee, Ee = null) : Xe = Ee.sibling;
        var di = I(B, Ee, Pe.value, te);
        if (di === null) {
          Ee === null && (Ee = Xe);
          break;
        }
        e && Ee && di.alternate === null && t(B, Ee), O = d(di, O, ke), Ze === null ? Ce = di : Ze.sibling = di, Ze = di, Ee = Xe;
      }
      if (Pe.done)
        return i(B, Ee), Ke && xa(B, ke), Ce;
      if (Ee === null) {
        for (; !Pe.done; ke++, Pe = Y.next())
          Pe = ne(B, Pe.value, te), Pe !== null && (O = d(Pe, O, ke), Ze === null ? Ce = Pe : Ze.sibling = Pe, Ze = Pe);
        return Ke && xa(B, ke), Ce;
      }
      for (Ee = l(Ee); !Pe.done; ke++, Pe = Y.next())
        Pe = K(Ee, B, ke, Pe.value, te), Pe !== null && (e && Pe.alternate !== null && Ee.delete(Pe.key === null ? ke : Pe.key), O = d(Pe, O, ke), Ze === null ? Ce = Pe : Ze.sibling = Pe, Ze = Pe);
      return e && Ee.forEach(function(Pw) {
        return t(B, Pw);
      }), Ke && xa(B, ke), Ce;
    }
    function st(B, O, Y, te) {
      if (typeof Y == "object" && Y !== null && Y.type === T && Y.key === null && (Y = Y.props.children), typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case w:
            e: {
              for (var Ce = Y.key; O !== null; ) {
                if (O.key === Ce) {
                  if (Ce = Y.type, Ce === T) {
                    if (O.tag === 7) {
                      i(
                        B,
                        O.sibling
                      ), te = u(
                        O,
                        Y.props.children
                      ), te.return = B, B = te;
                      break e;
                    }
                  } else if (O.elementType === Ce || typeof Ce == "object" && Ce !== null && Ce.$$typeof === R && Vi(Ce) === O.type) {
                    i(
                      B,
                      O.sibling
                    ), te = u(O, Y.props), gl(te, Y), te.return = B, B = te;
                    break e;
                  }
                  i(B, O);
                  break;
                } else t(B, O);
                O = O.sibling;
              }
              Y.type === T ? (te = Di(
                Y.props.children,
                B.mode,
                te,
                Y.key
              ), te.return = B, B = te) : (te = Ls(
                Y.type,
                Y.key,
                Y.props,
                null,
                B.mode,
                te
              ), gl(te, Y), te.return = B, B = te);
            }
            return y(B);
          case j:
            e: {
              for (Ce = Y.key; O !== null; ) {
                if (O.key === Ce)
                  if (O.tag === 4 && O.stateNode.containerInfo === Y.containerInfo && O.stateNode.implementation === Y.implementation) {
                    i(
                      B,
                      O.sibling
                    ), te = u(O, Y.children || []), te.return = B, B = te;
                    break e;
                  } else {
                    i(B, O);
                    break;
                  }
                else t(B, O);
                O = O.sibling;
              }
              te = Wu(Y, B.mode, te), te.return = B, B = te;
            }
            return y(B);
          case R:
            return Y = Vi(Y), st(
              B,
              O,
              Y,
              te
            );
        }
        if (le(Y))
          return be(
            B,
            O,
            Y,
            te
          );
        if (oe(Y)) {
          if (Ce = oe(Y), typeof Ce != "function") throw Error(s(150));
          return Y = Ce.call(Y), Re(
            B,
            O,
            Y,
            te
          );
        }
        if (typeof Y.then == "function")
          return st(
            B,
            O,
            $s(Y),
            te
          );
        if (Y.$$typeof === z)
          return st(
            B,
            O,
            ks(B, Y),
            te
          );
        Ys(B, Y);
      }
      return typeof Y == "string" && Y !== "" || typeof Y == "number" || typeof Y == "bigint" ? (Y = "" + Y, O !== null && O.tag === 6 ? (i(B, O.sibling), te = u(O, Y), te.return = B, B = te) : (i(B, O), te = Ju(Y, B.mode, te), te.return = B, B = te), y(B)) : i(B, O);
    }
    return function(B, O, Y, te) {
      try {
        pl = 0;
        var Ce = st(
          B,
          O,
          Y,
          te
        );
        return xr = null, Ce;
      } catch (Ee) {
        if (Ee === br || Ee === Hs) throw Ee;
        var Ze = yn(29, Ee, null, B.mode);
        return Ze.lanes = te, Ze.return = B, Ze;
      } finally {
      }
    };
  }
  var Bi = Lm(!0), Um = Lm(!1), Ka = !1;
  function dc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function fc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Qa(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Za(e, t, i) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (et & 2) !== 0) {
      var u = l.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), l.pending = t, t = Os(e), bm(e, null, i), t;
    }
    return zs(e, l, t, i), Os(e);
  }
  function vl(e, t, i) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (i & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, i |= l, t.lanes = i, Pt(e, i);
    }
  }
  function hc(e, t) {
    var i = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, i === l)) {
      var u = null, d = null;
      if (i = i.firstBaseUpdate, i !== null) {
        do {
          var y = {
            lane: i.lane,
            tag: i.tag,
            payload: i.payload,
            callback: null,
            next: null
          };
          d === null ? u = d = y : d = d.next = y, i = i.next;
        } while (i !== null);
        d === null ? u = d = t : d = d.next = t;
      } else u = d = t;
      i = {
        baseState: l.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: d,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = i;
      return;
    }
    e = i.lastBaseUpdate, e === null ? i.firstBaseUpdate = t : e.next = t, i.lastBaseUpdate = t;
  }
  var mc = !1;
  function yl() {
    if (mc) {
      var e = yr;
      if (e !== null) throw e;
    }
  }
  function bl(e, t, i, l) {
    mc = !1;
    var u = e.updateQueue;
    Ka = !1;
    var d = u.firstBaseUpdate, y = u.lastBaseUpdate, E = u.shared.pending;
    if (E !== null) {
      u.shared.pending = null;
      var _ = E, F = _.next;
      _.next = null, y === null ? d = F : y.next = F, y = _;
      var J = e.alternate;
      J !== null && (J = J.updateQueue, E = J.lastBaseUpdate, E !== y && (E === null ? J.firstBaseUpdate = F : E.next = F, J.lastBaseUpdate = _));
    }
    if (d !== null) {
      var ne = u.baseState;
      y = 0, J = F = _ = null, E = d;
      do {
        var I = E.lane & -536870913, K = I !== E.lane;
        if (K ? (Ge & I) === I : (l & I) === I) {
          I !== 0 && I === vr && (mc = !0), J !== null && (J = J.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var be = e, Re = E;
            I = t;
            var st = i;
            switch (Re.tag) {
              case 1:
                if (be = Re.payload, typeof be == "function") {
                  ne = be.call(st, ne, I);
                  break e;
                }
                ne = be;
                break e;
              case 3:
                be.flags = be.flags & -65537 | 128;
              case 0:
                if (be = Re.payload, I = typeof be == "function" ? be.call(st, ne, I) : be, I == null) break e;
                ne = g({}, ne, I);
                break e;
              case 2:
                Ka = !0;
            }
          }
          I = E.callback, I !== null && (e.flags |= 64, K && (e.flags |= 8192), K = u.callbacks, K === null ? u.callbacks = [I] : K.push(I));
        } else
          K = {
            lane: I,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          }, J === null ? (F = J = K, _ = ne) : J = J.next = K, y |= I;
        if (E = E.next, E === null) {
          if (E = u.shared.pending, E === null)
            break;
          K = E, E = K.next, K.next = null, u.lastBaseUpdate = K, u.shared.pending = null;
        }
      } while (!0);
      J === null && (_ = ne), u.baseState = _, u.firstBaseUpdate = F, u.lastBaseUpdate = J, d === null && (u.shared.lanes = 0), ti |= y, e.lanes = y, e.memoizedState = ne;
    }
  }
  function Vm(e, t) {
    if (typeof e != "function")
      throw Error(s(191, e));
    e.call(t);
  }
  function km(e, t) {
    var i = e.callbacks;
    if (i !== null)
      for (e.callbacks = null, e = 0; e < i.length; e++)
        Vm(i[e], t);
  }
  var Sr = N(null), Fs = N(0);
  function Bm(e, t) {
    e = _a, P(Fs, e), P(Sr, t), _a = e | t.baseLanes;
  }
  function pc() {
    P(Fs, _a), P(Sr, Sr.current);
  }
  function gc() {
    _a = Fs.current, X(Sr), X(Fs);
  }
  var bn = N(null), Vn = null;
  function Pa(e) {
    var t = e.alternate;
    P(Tt, Tt.current & 1), P(bn, e), Vn === null && (t === null || Sr.current !== null || t.memoizedState !== null) && (Vn = e);
  }
  function vc(e) {
    P(Tt, Tt.current), P(bn, e), Vn === null && (Vn = e);
  }
  function Hm(e) {
    e.tag === 22 ? (P(Tt, Tt.current), P(bn, e), Vn === null && (Vn = e)) : Ja();
  }
  function Ja() {
    P(Tt, Tt.current), P(bn, bn.current);
  }
  function xn(e) {
    X(bn), Vn === e && (Vn = null), X(Tt);
  }
  var Tt = N(0);
  function Is(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var i = t.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || Ed(i) || jd(i)))
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
  var Ea = 0, Ve = null, rt = null, zt = null, Gs = !1, wr = !1, Hi = !1, Xs = 0, xl = 0, Er = null, qS = 0;
  function St() {
    throw Error(s(321));
  }
  function yc(e, t) {
    if (t === null) return !1;
    for (var i = 0; i < t.length && i < e.length; i++)
      if (!vn(e[i], t[i])) return !1;
    return !0;
  }
  function bc(e, t, i, l, u, d) {
    return Ea = d, Ve = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, L.H = e === null || e.memoizedState === null ? Ep : Oc, Hi = !1, d = i(l, u), Hi = !1, wr && (d = $m(
      t,
      i,
      l,
      u
    )), qm(e), d;
  }
  function qm(e) {
    L.H = El;
    var t = rt !== null && rt.next !== null;
    if (Ea = 0, zt = rt = Ve = null, Gs = !1, xl = 0, Er = null, t) throw Error(s(300));
    e === null || Ot || (e = e.dependencies, e !== null && Vs(e) && (Ot = !0));
  }
  function $m(e, t, i, l) {
    Ve = e;
    var u = 0;
    do {
      if (wr && (Er = null), xl = 0, wr = !1, 25 <= u) throw Error(s(301));
      if (u += 1, zt = rt = null, e.updateQueue != null) {
        var d = e.updateQueue;
        d.lastEffect = null, d.events = null, d.stores = null, d.memoCache != null && (d.memoCache.index = 0);
      }
      L.H = jp, d = t(i, l);
    } while (wr);
    return d;
  }
  function $S() {
    var e = L.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Sl(t) : t, e = e.useState()[0], (rt !== null ? rt.memoizedState : null) !== e && (Ve.flags |= 1024), t;
  }
  function xc() {
    var e = Xs !== 0;
    return Xs = 0, e;
  }
  function Sc(e, t, i) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i;
  }
  function wc(e) {
    if (Gs) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Gs = !1;
    }
    Ea = 0, zt = rt = Ve = null, wr = !1, xl = Xs = 0, Er = null;
  }
  function rn() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return zt === null ? Ve.memoizedState = zt = e : zt = zt.next = e, zt;
  }
  function Ct() {
    if (rt === null) {
      var e = Ve.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = rt.next;
    var t = zt === null ? Ve.memoizedState : zt.next;
    if (t !== null)
      zt = t, rt = e;
    else {
      if (e === null)
        throw Ve.alternate === null ? Error(s(467)) : Error(s(310));
      rt = e, e = {
        memoizedState: rt.memoizedState,
        baseState: rt.baseState,
        baseQueue: rt.baseQueue,
        queue: rt.queue,
        next: null
      }, zt === null ? Ve.memoizedState = zt = e : zt = zt.next = e;
    }
    return zt;
  }
  function Ks() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Sl(e) {
    var t = xl;
    return xl += 1, Er === null && (Er = []), e = Dm(Er, e, t), t = Ve, (zt === null ? t.memoizedState : zt.next) === null && (t = t.alternate, L.H = t === null || t.memoizedState === null ? Ep : Oc), e;
  }
  function Qs(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Sl(e);
      if (e.$$typeof === z) return Kt(e);
    }
    throw Error(s(438, String(e)));
  }
  function Ec(e) {
    var t = null, i = Ve.updateQueue;
    if (i !== null && (t = i.memoCache), t == null) {
      var l = Ve.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), i === null && (i = Ks(), Ve.updateQueue = i), i.memoCache = t, i = t.data[t.index], i === void 0)
      for (i = t.data[t.index] = Array(e), l = 0; l < e; l++)
        i[l] = Z;
    return t.index++, i;
  }
  function ja(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Zs(e) {
    var t = Ct();
    return jc(t, rt, e);
  }
  function jc(e, t, i) {
    var l = e.queue;
    if (l === null) throw Error(s(311));
    l.lastRenderedReducer = i;
    var u = e.baseQueue, d = l.pending;
    if (d !== null) {
      if (u !== null) {
        var y = u.next;
        u.next = d.next, d.next = y;
      }
      t.baseQueue = u = d, l.pending = null;
    }
    if (d = e.baseState, u === null) e.memoizedState = d;
    else {
      t = u.next;
      var E = y = null, _ = null, F = t, J = !1;
      do {
        var ne = F.lane & -536870913;
        if (ne !== F.lane ? (Ge & ne) === ne : (Ea & ne) === ne) {
          var I = F.revertLane;
          if (I === 0)
            _ !== null && (_ = _.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: F.action,
              hasEagerState: F.hasEagerState,
              eagerState: F.eagerState,
              next: null
            }), ne === vr && (J = !0);
          else if ((Ea & I) === I) {
            F = F.next, I === vr && (J = !0);
            continue;
          } else
            ne = {
              lane: 0,
              revertLane: F.revertLane,
              gesture: null,
              action: F.action,
              hasEagerState: F.hasEagerState,
              eagerState: F.eagerState,
              next: null
            }, _ === null ? (E = _ = ne, y = d) : _ = _.next = ne, Ve.lanes |= I, ti |= I;
          ne = F.action, Hi && i(d, ne), d = F.hasEagerState ? F.eagerState : i(d, ne);
        } else
          I = {
            lane: ne,
            revertLane: F.revertLane,
            gesture: F.gesture,
            action: F.action,
            hasEagerState: F.hasEagerState,
            eagerState: F.eagerState,
            next: null
          }, _ === null ? (E = _ = I, y = d) : _ = _.next = I, Ve.lanes |= ne, ti |= ne;
        F = F.next;
      } while (F !== null && F !== t);
      if (_ === null ? y = d : _.next = E, !vn(d, e.memoizedState) && (Ot = !0, J && (i = yr, i !== null)))
        throw i;
      e.memoizedState = d, e.baseState = y, e.baseQueue = _, l.lastRenderedState = d;
    }
    return u === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Tc(e) {
    var t = Ct(), i = t.queue;
    if (i === null) throw Error(s(311));
    i.lastRenderedReducer = e;
    var l = i.dispatch, u = i.pending, d = t.memoizedState;
    if (u !== null) {
      i.pending = null;
      var y = u = u.next;
      do
        d = e(d, y.action), y = y.next;
      while (y !== u);
      vn(d, t.memoizedState) || (Ot = !0), t.memoizedState = d, t.baseQueue === null && (t.baseState = d), i.lastRenderedState = d;
    }
    return [d, l];
  }
  function Ym(e, t, i) {
    var l = Ve, u = Ct(), d = Ke;
    if (d) {
      if (i === void 0) throw Error(s(407));
      i = i();
    } else i = t();
    var y = !vn(
      (rt || u).memoizedState,
      i
    );
    if (y && (u.memoizedState = i, Ot = !0), u = u.queue, Mc(Gm.bind(null, l, u, e), [
      e
    ]), u.getSnapshot !== t || y || zt !== null && zt.memoizedState.tag & 1) {
      if (l.flags |= 2048, jr(
        9,
        { destroy: void 0 },
        Im.bind(
          null,
          l,
          u,
          i,
          t
        ),
        null
      ), ct === null) throw Error(s(349));
      d || (Ea & 127) !== 0 || Fm(l, t, i);
    }
    return i;
  }
  function Fm(e, t, i) {
    e.flags |= 16384, e = { getSnapshot: t, value: i }, t = Ve.updateQueue, t === null ? (t = Ks(), Ve.updateQueue = t, t.stores = [e]) : (i = t.stores, i === null ? t.stores = [e] : i.push(e));
  }
  function Im(e, t, i, l) {
    t.value = i, t.getSnapshot = l, Xm(t) && Km(e);
  }
  function Gm(e, t, i) {
    return i(function() {
      Xm(t) && Km(e);
    });
  }
  function Xm(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var i = t();
      return !vn(e, i);
    } catch {
      return !0;
    }
  }
  function Km(e) {
    var t = _i(e, 2);
    t !== null && hn(t, e, 2);
  }
  function Cc(e) {
    var t = rn();
    if (typeof e == "function") {
      var i = e;
      if (e = i(), Hi) {
        Et(!0);
        try {
          i();
        } finally {
          Et(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ja,
      lastRenderedState: e
    }, t;
  }
  function Qm(e, t, i, l) {
    return e.baseState = i, jc(
      e,
      rt,
      typeof l == "function" ? l : ja
    );
  }
  function YS(e, t, i, l, u) {
    if (Ws(e)) throw Error(s(485));
    if (e = t.action, e !== null) {
      var d = {
        payload: u,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(y) {
          d.listeners.push(y);
        }
      };
      L.T !== null ? i(!0) : d.isTransition = !1, l(d), i = t.pending, i === null ? (d.next = t.pending = d, Zm(t, d)) : (d.next = i.next, t.pending = i.next = d);
    }
  }
  function Zm(e, t) {
    var i = t.action, l = t.payload, u = e.state;
    if (t.isTransition) {
      var d = L.T, y = {};
      L.T = y;
      try {
        var E = i(u, l), _ = L.S;
        _ !== null && _(y, E), Pm(e, t, E);
      } catch (F) {
        Nc(e, t, F);
      } finally {
        d !== null && y.types !== null && (d.types = y.types), L.T = d;
      }
    } else
      try {
        d = i(u, l), Pm(e, t, d);
      } catch (F) {
        Nc(e, t, F);
      }
  }
  function Pm(e, t, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(l) {
        Jm(e, t, l);
      },
      function(l) {
        return Nc(e, t, l);
      }
    ) : Jm(e, t, i);
  }
  function Jm(e, t, i) {
    t.status = "fulfilled", t.value = i, Wm(t), e.state = i, t = e.pending, t !== null && (i = t.next, i === t ? e.pending = null : (i = i.next, t.next = i, Zm(e, i)));
  }
  function Nc(e, t, i) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = i, Wm(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function Wm(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function ep(e, t) {
    return t;
  }
  function tp(e, t) {
    if (Ke) {
      var i = ct.formState;
      if (i !== null) {
        e: {
          var l = Ve;
          if (Ke) {
            if (pt) {
              t: {
                for (var u = pt, d = Un; u.nodeType !== 8; ) {
                  if (!d) {
                    u = null;
                    break t;
                  }
                  if (u = kn(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                d = u.data, u = d === "F!" || d === "F" ? u : null;
              }
              if (u) {
                pt = kn(
                  u.nextSibling
                ), l = u.data === "F!";
                break e;
              }
            }
            Ga(l);
          }
          l = !1;
        }
        l && (t = i[0]);
      }
    }
    return i = rn(), i.memoizedState = i.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ep,
      lastRenderedState: t
    }, i.queue = l, i = xp.bind(
      null,
      Ve,
      l
    ), l.dispatch = i, l = Cc(!1), d = zc.bind(
      null,
      Ve,
      !1,
      l.queue
    ), l = rn(), u = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = u, i = YS.bind(
      null,
      Ve,
      u,
      d,
      i
    ), u.dispatch = i, l.memoizedState = e, [t, i, !1];
  }
  function np(e) {
    var t = Ct();
    return ap(t, rt, e);
  }
  function ap(e, t, i) {
    if (t = jc(
      e,
      t,
      ep
    )[0], e = Zs(ja)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = Sl(t);
      } catch (y) {
        throw y === br ? Hs : y;
      }
    else l = t;
    t = Ct();
    var u = t.queue, d = u.dispatch;
    return i !== t.memoizedState && (Ve.flags |= 2048, jr(
      9,
      { destroy: void 0 },
      FS.bind(null, u, i),
      null
    )), [l, d, e];
  }
  function FS(e, t) {
    e.action = t;
  }
  function ip(e) {
    var t = Ct(), i = rt;
    if (i !== null)
      return ap(t, i, e);
    Ct(), t = t.memoizedState, i = Ct();
    var l = i.queue.dispatch;
    return i.memoizedState = e, [t, l, !1];
  }
  function jr(e, t, i, l) {
    return e = { tag: e, create: i, deps: l, inst: t, next: null }, t = Ve.updateQueue, t === null && (t = Ks(), Ve.updateQueue = t), i = t.lastEffect, i === null ? t.lastEffect = e.next = e : (l = i.next, i.next = e, e.next = l, t.lastEffect = e), e;
  }
  function rp() {
    return Ct().memoizedState;
  }
  function Ps(e, t, i, l) {
    var u = rn();
    Ve.flags |= e, u.memoizedState = jr(
      1 | t,
      { destroy: void 0 },
      i,
      l === void 0 ? null : l
    );
  }
  function Js(e, t, i, l) {
    var u = Ct();
    l = l === void 0 ? null : l;
    var d = u.memoizedState.inst;
    rt !== null && l !== null && yc(l, rt.memoizedState.deps) ? u.memoizedState = jr(t, d, i, l) : (Ve.flags |= e, u.memoizedState = jr(
      1 | t,
      d,
      i,
      l
    ));
  }
  function lp(e, t) {
    Ps(8390656, 8, e, t);
  }
  function Mc(e, t) {
    Js(2048, 8, e, t);
  }
  function IS(e) {
    Ve.flags |= 4;
    var t = Ve.updateQueue;
    if (t === null)
      t = Ks(), Ve.updateQueue = t, t.events = [e];
    else {
      var i = t.events;
      i === null ? t.events = [e] : i.push(e);
    }
  }
  function sp(e) {
    var t = Ct().memoizedState;
    return IS({ ref: t, nextImpl: e }), function() {
      if ((et & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function op(e, t) {
    return Js(4, 2, e, t);
  }
  function up(e, t) {
    return Js(4, 4, e, t);
  }
  function cp(e, t) {
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
  function dp(e, t, i) {
    i = i != null ? i.concat([e]) : null, Js(4, 4, cp.bind(null, t, e), i);
  }
  function Rc() {
  }
  function fp(e, t) {
    var i = Ct();
    t = t === void 0 ? null : t;
    var l = i.memoizedState;
    return t !== null && yc(t, l[1]) ? l[0] : (i.memoizedState = [e, t], e);
  }
  function hp(e, t) {
    var i = Ct();
    t = t === void 0 ? null : t;
    var l = i.memoizedState;
    if (t !== null && yc(t, l[1]))
      return l[0];
    if (l = e(), Hi) {
      Et(!0);
      try {
        e();
      } finally {
        Et(!1);
      }
    }
    return i.memoizedState = [l, t], l;
  }
  function Ac(e, t, i) {
    return i === void 0 || (Ea & 1073741824) !== 0 && (Ge & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = i, e = mg(), Ve.lanes |= e, ti |= e, i);
  }
  function mp(e, t, i, l) {
    return vn(i, t) ? i : Sr.current !== null ? (e = Ac(e, i, l), vn(e, t) || (Ot = !0), e) : (Ea & 42) === 0 || (Ea & 1073741824) !== 0 && (Ge & 261930) === 0 ? (Ot = !0, e.memoizedState = i) : (e = mg(), Ve.lanes |= e, ti |= e, t);
  }
  function pp(e, t, i, l, u) {
    var d = U.p;
    U.p = d !== 0 && 8 > d ? d : 8;
    var y = L.T, E = {};
    L.T = E, zc(e, !1, t, i);
    try {
      var _ = u(), F = L.S;
      if (F !== null && F(E, _), _ !== null && typeof _ == "object" && typeof _.then == "function") {
        var J = HS(
          _,
          l
        );
        wl(
          e,
          t,
          J,
          En(e)
        );
      } else
        wl(
          e,
          t,
          l,
          En(e)
        );
    } catch (ne) {
      wl(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: ne },
        En()
      );
    } finally {
      U.p = d, y !== null && E.types !== null && (y.types = E.types), L.T = y;
    }
  }
  function GS() {
  }
  function _c(e, t, i, l) {
    if (e.tag !== 5) throw Error(s(476));
    var u = gp(e).queue;
    pp(
      e,
      u,
      t,
      q,
      i === null ? GS : function() {
        return vp(e), i(l);
      }
    );
  }
  function gp(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: q,
      baseState: q,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ja,
        lastRenderedState: q
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
        lastRenderedReducer: ja,
        lastRenderedState: i
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function vp(e) {
    var t = gp(e);
    t.next === null && (t = e.alternate.memoizedState), wl(
      e,
      t.next.queue,
      {},
      En()
    );
  }
  function Dc() {
    return Kt(Bl);
  }
  function yp() {
    return Ct().memoizedState;
  }
  function bp() {
    return Ct().memoizedState;
  }
  function XS(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var i = En();
          e = Qa(i);
          var l = Za(t, e, i);
          l !== null && (hn(l, t, i), vl(l, t, i)), t = { cache: sc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function KS(e, t, i) {
    var l = En();
    i = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ws(e) ? Sp(t, i) : (i = Zu(e, t, i, l), i !== null && (hn(i, e, l), wp(i, t, l)));
  }
  function xp(e, t, i) {
    var l = En();
    wl(e, t, i, l);
  }
  function wl(e, t, i, l) {
    var u = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Ws(e)) Sp(t, u);
    else {
      var d = e.alternate;
      if (e.lanes === 0 && (d === null || d.lanes === 0) && (d = t.lastRenderedReducer, d !== null))
        try {
          var y = t.lastRenderedState, E = d(y, i);
          if (u.hasEagerState = !0, u.eagerState = E, vn(E, y))
            return zs(e, t, u, 0), ct === null && Ds(), !1;
        } catch {
        } finally {
        }
      if (i = Zu(e, t, u, l), i !== null)
        return hn(i, e, l), wp(i, t, l), !0;
    }
    return !1;
  }
  function zc(e, t, i, l) {
    if (l = {
      lane: 2,
      revertLane: dd(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ws(e)) {
      if (t) throw Error(s(479));
    } else
      t = Zu(
        e,
        i,
        l,
        2
      ), t !== null && hn(t, e, 2);
  }
  function Ws(e) {
    var t = e.alternate;
    return e === Ve || t !== null && t === Ve;
  }
  function Sp(e, t) {
    wr = Gs = !0;
    var i = e.pending;
    i === null ? t.next = t : (t.next = i.next, i.next = t), e.pending = t;
  }
  function wp(e, t, i) {
    if ((i & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, i |= l, t.lanes = i, Pt(e, i);
    }
  }
  var El = {
    readContext: Kt,
    use: Qs,
    useCallback: St,
    useContext: St,
    useEffect: St,
    useImperativeHandle: St,
    useLayoutEffect: St,
    useInsertionEffect: St,
    useMemo: St,
    useReducer: St,
    useRef: St,
    useState: St,
    useDebugValue: St,
    useDeferredValue: St,
    useTransition: St,
    useSyncExternalStore: St,
    useId: St,
    useHostTransitionStatus: St,
    useFormState: St,
    useActionState: St,
    useOptimistic: St,
    useMemoCache: St,
    useCacheRefresh: St
  };
  El.useEffectEvent = St;
  var Ep = {
    readContext: Kt,
    use: Qs,
    useCallback: function(e, t) {
      return rn().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Kt,
    useEffect: lp,
    useImperativeHandle: function(e, t, i) {
      i = i != null ? i.concat([e]) : null, Ps(
        4194308,
        4,
        cp.bind(null, t, e),
        i
      );
    },
    useLayoutEffect: function(e, t) {
      return Ps(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Ps(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var i = rn();
      t = t === void 0 ? null : t;
      var l = e();
      if (Hi) {
        Et(!0);
        try {
          e();
        } finally {
          Et(!1);
        }
      }
      return i.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, i) {
      var l = rn();
      if (i !== void 0) {
        var u = i(t);
        if (Hi) {
          Et(!0);
          try {
            i(t);
          } finally {
            Et(!1);
          }
        }
      } else u = t;
      return l.memoizedState = l.baseState = u, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      }, l.queue = e, e = e.dispatch = KS.bind(
        null,
        Ve,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = rn();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Cc(e);
      var t = e.queue, i = xp.bind(null, Ve, t);
      return t.dispatch = i, [e.memoizedState, i];
    },
    useDebugValue: Rc,
    useDeferredValue: function(e, t) {
      var i = rn();
      return Ac(i, e, t);
    },
    useTransition: function() {
      var e = Cc(!1);
      return e = pp.bind(
        null,
        Ve,
        e.queue,
        !0,
        !1
      ), rn().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, i) {
      var l = Ve, u = rn();
      if (Ke) {
        if (i === void 0)
          throw Error(s(407));
        i = i();
      } else {
        if (i = t(), ct === null)
          throw Error(s(349));
        (Ge & 127) !== 0 || Fm(l, t, i);
      }
      u.memoizedState = i;
      var d = { value: i, getSnapshot: t };
      return u.queue = d, lp(Gm.bind(null, l, d, e), [
        e
      ]), l.flags |= 2048, jr(
        9,
        { destroy: void 0 },
        Im.bind(
          null,
          l,
          d,
          i,
          t
        ),
        null
      ), i;
    },
    useId: function() {
      var e = rn(), t = ct.identifierPrefix;
      if (Ke) {
        var i = oa, l = sa;
        i = (l & ~(1 << 32 - Bt(l) - 1)).toString(32) + i, t = "_" + t + "R_" + i, i = Xs++, 0 < i && (t += "H" + i.toString(32)), t += "_";
      } else
        i = qS++, t = "_" + t + "r_" + i.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Dc,
    useFormState: tp,
    useActionState: tp,
    useOptimistic: function(e) {
      var t = rn();
      t.memoizedState = t.baseState = e;
      var i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = i, t = zc.bind(
        null,
        Ve,
        !0,
        i
      ), i.dispatch = t, [e, t];
    },
    useMemoCache: Ec,
    useCacheRefresh: function() {
      return rn().memoizedState = XS.bind(
        null,
        Ve
      );
    },
    useEffectEvent: function(e) {
      var t = rn(), i = { impl: e };
      return t.memoizedState = i, function() {
        if ((et & 2) !== 0)
          throw Error(s(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, Oc = {
    readContext: Kt,
    use: Qs,
    useCallback: fp,
    useContext: Kt,
    useEffect: Mc,
    useImperativeHandle: dp,
    useInsertionEffect: op,
    useLayoutEffect: up,
    useMemo: hp,
    useReducer: Zs,
    useRef: rp,
    useState: function() {
      return Zs(ja);
    },
    useDebugValue: Rc,
    useDeferredValue: function(e, t) {
      var i = Ct();
      return mp(
        i,
        rt.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Zs(ja)[0], t = Ct().memoizedState;
      return [
        typeof e == "boolean" ? e : Sl(e),
        t
      ];
    },
    useSyncExternalStore: Ym,
    useId: yp,
    useHostTransitionStatus: Dc,
    useFormState: np,
    useActionState: np,
    useOptimistic: function(e, t) {
      var i = Ct();
      return Qm(i, rt, e, t);
    },
    useMemoCache: Ec,
    useCacheRefresh: bp
  };
  Oc.useEffectEvent = sp;
  var jp = {
    readContext: Kt,
    use: Qs,
    useCallback: fp,
    useContext: Kt,
    useEffect: Mc,
    useImperativeHandle: dp,
    useInsertionEffect: op,
    useLayoutEffect: up,
    useMemo: hp,
    useReducer: Tc,
    useRef: rp,
    useState: function() {
      return Tc(ja);
    },
    useDebugValue: Rc,
    useDeferredValue: function(e, t) {
      var i = Ct();
      return rt === null ? Ac(i, e, t) : mp(
        i,
        rt.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Tc(ja)[0], t = Ct().memoizedState;
      return [
        typeof e == "boolean" ? e : Sl(e),
        t
      ];
    },
    useSyncExternalStore: Ym,
    useId: yp,
    useHostTransitionStatus: Dc,
    useFormState: ip,
    useActionState: ip,
    useOptimistic: function(e, t) {
      var i = Ct();
      return rt !== null ? Qm(i, rt, e, t) : (i.baseState = e, [e, i.queue.dispatch]);
    },
    useMemoCache: Ec,
    useCacheRefresh: bp
  };
  jp.useEffectEvent = sp;
  function Lc(e, t, i, l) {
    t = e.memoizedState, i = i(l, t), i = i == null ? t : g({}, t, i), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
  }
  var Uc = {
    enqueueSetState: function(e, t, i) {
      e = e._reactInternals;
      var l = En(), u = Qa(l);
      u.payload = t, i != null && (u.callback = i), t = Za(e, u, l), t !== null && (hn(t, e, l), vl(t, e, l));
    },
    enqueueReplaceState: function(e, t, i) {
      e = e._reactInternals;
      var l = En(), u = Qa(l);
      u.tag = 1, u.payload = t, i != null && (u.callback = i), t = Za(e, u, l), t !== null && (hn(t, e, l), vl(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var i = En(), l = Qa(i);
      l.tag = 2, t != null && (l.callback = t), t = Za(e, l, i), t !== null && (hn(t, e, i), vl(t, e, i));
    }
  };
  function Tp(e, t, i, l, u, d, y) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, d, y) : t.prototype && t.prototype.isPureReactComponent ? !ul(i, l) || !ul(u, d) : !0;
  }
  function Cp(e, t, i, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(i, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(i, l), t.state !== e && Uc.enqueueReplaceState(t, t.state, null);
  }
  function qi(e, t) {
    var i = t;
    if ("ref" in t) {
      i = {};
      for (var l in t)
        l !== "ref" && (i[l] = t[l]);
    }
    if (e = e.defaultProps) {
      i === t && (i = g({}, i));
      for (var u in e)
        i[u] === void 0 && (i[u] = e[u]);
    }
    return i;
  }
  function Np(e) {
    _s(e);
  }
  function Mp(e) {
    console.error(e);
  }
  function Rp(e) {
    _s(e);
  }
  function eo(e, t) {
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
  function Vc(e, t, i) {
    return i = Qa(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      eo(e, t);
    }, i;
  }
  function _p(e) {
    return e = Qa(e), e.tag = 3, e;
  }
  function Dp(e, t, i, l) {
    var u = i.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var d = l.value;
      e.payload = function() {
        return u(d);
      }, e.callback = function() {
        Ap(t, i, l);
      };
    }
    var y = i.stateNode;
    y !== null && typeof y.componentDidCatch == "function" && (e.callback = function() {
      Ap(t, i, l), typeof u != "function" && (ni === null ? ni = /* @__PURE__ */ new Set([this]) : ni.add(this));
      var E = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function QS(e, t, i, l, u) {
    if (i.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = i.alternate, t !== null && gr(
        t,
        i,
        u,
        !0
      ), i = bn.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return Vn === null ? ho() : i.alternate === null && wt === 0 && (wt = 3), i.flags &= -257, i.flags |= 65536, i.lanes = u, l === qs ? i.flags |= 16384 : (t = i.updateQueue, t === null ? i.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), od(e, l, u)), !1;
          case 22:
            return i.flags |= 65536, l === qs ? i.flags |= 16384 : (t = i.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, i.updateQueue = t) : (i = t.retryQueue, i === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : i.add(l)), od(e, l, u)), !1;
        }
        throw Error(s(435, i.tag));
      }
      return od(e, l, u), ho(), !1;
    }
    if (Ke)
      return t = bn.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, l !== nc && (e = Error(s(422), { cause: l }), fl(zn(e, i)))) : (l !== nc && (t = Error(s(423), {
        cause: l
      }), fl(
        zn(t, i)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, l = zn(l, i), u = Vc(
        e.stateNode,
        l,
        u
      ), hc(e, u), wt !== 4 && (wt = 2)), !1;
    var d = Error(s(520), { cause: l });
    if (d = zn(d, i), _l === null ? _l = [d] : _l.push(d), wt !== 4 && (wt = 2), t === null) return !0;
    l = zn(l, i), i = t;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, e = u & -u, i.lanes |= e, e = Vc(i.stateNode, l, e), hc(i, e), !1;
        case 1:
          if (t = i.type, d = i.stateNode, (i.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (ni === null || !ni.has(d))))
            return i.flags |= 65536, u &= -u, i.lanes |= u, u = _p(u), Dp(
              u,
              e,
              i,
              l
            ), hc(i, u), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var kc = Error(s(461)), Ot = !1;
  function Qt(e, t, i, l) {
    t.child = e === null ? Um(t, null, i, l) : Bi(
      t,
      e.child,
      i,
      l
    );
  }
  function zp(e, t, i, l, u) {
    i = i.render;
    var d = t.ref;
    if ("ref" in l) {
      var y = {};
      for (var E in l)
        E !== "ref" && (y[E] = l[E]);
    } else y = l;
    return Li(t), l = bc(
      e,
      t,
      i,
      y,
      d,
      u
    ), E = xc(), e !== null && !Ot ? (Sc(e, t, u), Ta(e, t, u)) : (Ke && E && ec(t), t.flags |= 1, Qt(e, t, l, u), t.child);
  }
  function Op(e, t, i, l, u) {
    if (e === null) {
      var d = i.type;
      return typeof d == "function" && !Pu(d) && d.defaultProps === void 0 && i.compare === null ? (t.tag = 15, t.type = d, Lp(
        e,
        t,
        d,
        l,
        u
      )) : (e = Ls(
        i.type,
        null,
        l,
        t,
        t.mode,
        u
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (d = e.child, !Gc(e, u)) {
      var y = d.memoizedProps;
      if (i = i.compare, i = i !== null ? i : ul, i(y, l) && e.ref === t.ref)
        return Ta(e, t, u);
    }
    return t.flags |= 1, e = ba(d, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Lp(e, t, i, l, u) {
    if (e !== null) {
      var d = e.memoizedProps;
      if (ul(d, l) && e.ref === t.ref)
        if (Ot = !1, t.pendingProps = l = d, Gc(e, u))
          (e.flags & 131072) !== 0 && (Ot = !0);
        else
          return t.lanes = e.lanes, Ta(e, t, u);
    }
    return Bc(
      e,
      t,
      i,
      l,
      u
    );
  }
  function Up(e, t, i, l) {
    var u = l.children, d = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (d = d !== null ? d.baseLanes | i : i, e !== null) {
          for (l = t.child = e.child, u = 0; l !== null; )
            u = u | l.lanes | l.childLanes, l = l.sibling;
          l = u & ~d;
        } else l = 0, t.child = null;
        return Vp(
          e,
          t,
          d,
          i,
          l
        );
      }
      if ((i & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Bs(
          t,
          d !== null ? d.cachePool : null
        ), d !== null ? Bm(t, d) : pc(), Hm(t);
      else
        return l = t.lanes = 536870912, Vp(
          e,
          t,
          d !== null ? d.baseLanes | i : i,
          i,
          l
        );
    } else
      d !== null ? (Bs(t, d.cachePool), Bm(t, d), Ja(), t.memoizedState = null) : (e !== null && Bs(t, null), pc(), Ja());
    return Qt(e, t, u, i), t.child;
  }
  function jl(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Vp(e, t, i, l, u) {
    var d = uc();
    return d = d === null ? null : { parent: Dt._currentValue, pool: d }, t.memoizedState = {
      baseLanes: i,
      cachePool: d
    }, e !== null && Bs(t, null), pc(), Hm(t), e !== null && gr(e, t, l, !0), t.childLanes = u, null;
  }
  function to(e, t) {
    return t = ao(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function kp(e, t, i) {
    return Bi(t, e.child, null, i), e = to(t, t.pendingProps), e.flags |= 2, xn(t), t.memoizedState = null, e;
  }
  function ZS(e, t, i) {
    var l = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Ke) {
        if (l.mode === "hidden")
          return e = to(t, l), t.lanes = 536870912, jl(null, e);
        if (vc(t), (e = pt) ? (e = Zg(
          e,
          Un
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Fa !== null ? { id: sa, overflow: oa } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Sm(e), i.return = t, t.child = i, Xt = t, pt = null)) : e = null, e === null) throw Ga(t);
        return t.lanes = 536870912, null;
      }
      return to(t, l);
    }
    var d = e.memoizedState;
    if (d !== null) {
      var y = d.dehydrated;
      if (vc(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = kp(
            e,
            t,
            i
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(s(558));
      else if (Ot || gr(e, t, i, !1), u = (i & e.childLanes) !== 0, Ot || u) {
        if (l = ct, l !== null && (y = M(l, i), y !== 0 && y !== d.retryLane))
          throw d.retryLane = y, _i(e, y), hn(l, e, y), kc;
        ho(), t = kp(
          e,
          t,
          i
        );
      } else
        e = d.treeContext, pt = kn(y.nextSibling), Xt = t, Ke = !0, Ia = null, Un = !1, e !== null && jm(t, e), t = to(t, l), t.flags |= 4096;
      return t;
    }
    return e = ba(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function no(e, t) {
    var i = t.ref;
    if (i === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(s(284));
      (e === null || e.ref !== i) && (t.flags |= 4194816);
    }
  }
  function Bc(e, t, i, l, u) {
    return Li(t), i = bc(
      e,
      t,
      i,
      l,
      void 0,
      u
    ), l = xc(), e !== null && !Ot ? (Sc(e, t, u), Ta(e, t, u)) : (Ke && l && ec(t), t.flags |= 1, Qt(e, t, i, u), t.child);
  }
  function Bp(e, t, i, l, u, d) {
    return Li(t), t.updateQueue = null, i = $m(
      t,
      l,
      i,
      u
    ), qm(e), l = xc(), e !== null && !Ot ? (Sc(e, t, d), Ta(e, t, d)) : (Ke && l && ec(t), t.flags |= 1, Qt(e, t, i, d), t.child);
  }
  function Hp(e, t, i, l, u) {
    if (Li(t), t.stateNode === null) {
      var d = fr, y = i.contextType;
      typeof y == "object" && y !== null && (d = Kt(y)), d = new i(l, d), t.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null, d.updater = Uc, t.stateNode = d, d._reactInternals = t, d = t.stateNode, d.props = l, d.state = t.memoizedState, d.refs = {}, dc(t), y = i.contextType, d.context = typeof y == "object" && y !== null ? Kt(y) : fr, d.state = t.memoizedState, y = i.getDerivedStateFromProps, typeof y == "function" && (Lc(
        t,
        i,
        y,
        l
      ), d.state = t.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof d.getSnapshotBeforeUpdate == "function" || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (y = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), y !== d.state && Uc.enqueueReplaceState(d, d.state, null), bl(t, l, d, u), yl(), d.state = t.memoizedState), typeof d.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      d = t.stateNode;
      var E = t.memoizedProps, _ = qi(i, E);
      d.props = _;
      var F = d.context, J = i.contextType;
      y = fr, typeof J == "object" && J !== null && (y = Kt(J));
      var ne = i.getDerivedStateFromProps;
      J = typeof ne == "function" || typeof d.getSnapshotBeforeUpdate == "function", E = t.pendingProps !== E, J || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (E || F !== y) && Cp(
        t,
        d,
        l,
        y
      ), Ka = !1;
      var I = t.memoizedState;
      d.state = I, bl(t, l, d, u), yl(), F = t.memoizedState, E || I !== F || Ka ? (typeof ne == "function" && (Lc(
        t,
        i,
        ne,
        l
      ), F = t.memoizedState), (_ = Ka || Tp(
        t,
        i,
        _,
        l,
        I,
        F,
        y
      )) ? (J || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = F), d.props = l, d.state = F, d.context = y, l = _) : (typeof d.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      d = t.stateNode, fc(e, t), y = t.memoizedProps, J = qi(i, y), d.props = J, ne = t.pendingProps, I = d.context, F = i.contextType, _ = fr, typeof F == "object" && F !== null && (_ = Kt(F)), E = i.getDerivedStateFromProps, (F = typeof E == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (y !== ne || I !== _) && Cp(
        t,
        d,
        l,
        _
      ), Ka = !1, I = t.memoizedState, d.state = I, bl(t, l, d, u), yl();
      var K = t.memoizedState;
      y !== ne || I !== K || Ka || e !== null && e.dependencies !== null && Vs(e.dependencies) ? (typeof E == "function" && (Lc(
        t,
        i,
        E,
        l
      ), K = t.memoizedState), (J = Ka || Tp(
        t,
        i,
        J,
        l,
        I,
        K,
        _
      ) || e !== null && e.dependencies !== null && Vs(e.dependencies)) ? (F || typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function" || (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(l, K, _), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(
        l,
        K,
        _
      )), typeof d.componentDidUpdate == "function" && (t.flags |= 4), typeof d.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof d.componentDidUpdate != "function" || y === e.memoizedProps && I === e.memoizedState || (t.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && I === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = K), d.props = l, d.state = K, d.context = _, l = J) : (typeof d.componentDidUpdate != "function" || y === e.memoizedProps && I === e.memoizedState || (t.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && I === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return d = l, no(e, t), l = (t.flags & 128) !== 0, d || l ? (d = t.stateNode, i = l && typeof i.getDerivedStateFromError != "function" ? null : d.render(), t.flags |= 1, e !== null && l ? (t.child = Bi(
      t,
      e.child,
      null,
      u
    ), t.child = Bi(
      t,
      null,
      i,
      u
    )) : Qt(e, t, i, u), t.memoizedState = d.state, e = t.child) : e = Ta(
      e,
      t,
      u
    ), e;
  }
  function qp(e, t, i, l) {
    return zi(), t.flags |= 256, Qt(e, t, i, l), t.child;
  }
  var Hc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function qc(e) {
    return { baseLanes: e, cachePool: Am() };
  }
  function $c(e, t, i) {
    return e = e !== null ? e.childLanes & ~i : 0, t && (e |= wn), e;
  }
  function $p(e, t, i) {
    var l = t.pendingProps, u = !1, d = (t.flags & 128) !== 0, y;
    if ((y = d) || (y = e !== null && e.memoizedState === null ? !1 : (Tt.current & 2) !== 0), y && (u = !0, t.flags &= -129), y = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Ke) {
        if (u ? Pa(t) : Ja(), (e = pt) ? (e = Zg(
          e,
          Un
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Fa !== null ? { id: sa, overflow: oa } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Sm(e), i.return = t, t.child = i, Xt = t, pt = null)) : e = null, e === null) throw Ga(t);
        return jd(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var E = l.children;
      return l = l.fallback, u ? (Ja(), u = t.mode, E = ao(
        { mode: "hidden", children: E },
        u
      ), l = Di(
        l,
        u,
        i,
        null
      ), E.return = t, l.return = t, E.sibling = l, t.child = E, l = t.child, l.memoizedState = qc(i), l.childLanes = $c(
        e,
        y,
        i
      ), t.memoizedState = Hc, jl(null, l)) : (Pa(t), Yc(t, E));
    }
    var _ = e.memoizedState;
    if (_ !== null && (E = _.dehydrated, E !== null)) {
      if (d)
        t.flags & 256 ? (Pa(t), t.flags &= -257, t = Fc(
          e,
          t,
          i
        )) : t.memoizedState !== null ? (Ja(), t.child = e.child, t.flags |= 128, t = null) : (Ja(), E = l.fallback, u = t.mode, l = ao(
          { mode: "visible", children: l.children },
          u
        ), E = Di(
          E,
          u,
          i,
          null
        ), E.flags |= 2, l.return = t, E.return = t, l.sibling = E, t.child = l, Bi(
          t,
          e.child,
          null,
          i
        ), l = t.child, l.memoizedState = qc(i), l.childLanes = $c(
          e,
          y,
          i
        ), t.memoizedState = Hc, t = jl(null, l));
      else if (Pa(t), jd(E)) {
        if (y = E.nextSibling && E.nextSibling.dataset, y) var F = y.dgst;
        y = F, l = Error(s(419)), l.stack = "", l.digest = y, fl({ value: l, source: null, stack: null }), t = Fc(
          e,
          t,
          i
        );
      } else if (Ot || gr(e, t, i, !1), y = (i & e.childLanes) !== 0, Ot || y) {
        if (y = ct, y !== null && (l = M(y, i), l !== 0 && l !== _.retryLane))
          throw _.retryLane = l, _i(e, l), hn(y, e, l), kc;
        Ed(E) || ho(), t = Fc(
          e,
          t,
          i
        );
      } else
        Ed(E) ? (t.flags |= 192, t.child = e.child, t = null) : (e = _.treeContext, pt = kn(
          E.nextSibling
        ), Xt = t, Ke = !0, Ia = null, Un = !1, e !== null && jm(t, e), t = Yc(
          t,
          l.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (Ja(), E = l.fallback, u = t.mode, _ = e.child, F = _.sibling, l = ba(_, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = _.subtreeFlags & 65011712, F !== null ? E = ba(
      F,
      E
    ) : (E = Di(
      E,
      u,
      i,
      null
    ), E.flags |= 2), E.return = t, l.return = t, l.sibling = E, t.child = l, jl(null, l), l = t.child, E = e.child.memoizedState, E === null ? E = qc(i) : (u = E.cachePool, u !== null ? (_ = Dt._currentValue, u = u.parent !== _ ? { parent: _, pool: _ } : u) : u = Am(), E = {
      baseLanes: E.baseLanes | i,
      cachePool: u
    }), l.memoizedState = E, l.childLanes = $c(
      e,
      y,
      i
    ), t.memoizedState = Hc, jl(e.child, l)) : (Pa(t), i = e.child, e = i.sibling, i = ba(i, {
      mode: "visible",
      children: l.children
    }), i.return = t, i.sibling = null, e !== null && (y = t.deletions, y === null ? (t.deletions = [e], t.flags |= 16) : y.push(e)), t.child = i, t.memoizedState = null, i);
  }
  function Yc(e, t) {
    return t = ao(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function ao(e, t) {
    return e = yn(22, e, null, t), e.lanes = 0, e;
  }
  function Fc(e, t, i) {
    return Bi(t, e.child, null, i), e = Yc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Yp(e, t, i) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), rc(e.return, t, i);
  }
  function Ic(e, t, i, l, u, d) {
    var y = e.memoizedState;
    y === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: i,
      tailMode: u,
      treeForkCount: d
    } : (y.isBackwards = t, y.rendering = null, y.renderingStartTime = 0, y.last = l, y.tail = i, y.tailMode = u, y.treeForkCount = d);
  }
  function Fp(e, t, i) {
    var l = t.pendingProps, u = l.revealOrder, d = l.tail;
    l = l.children;
    var y = Tt.current, E = (y & 2) !== 0;
    if (E ? (y = y & 1 | 2, t.flags |= 128) : y &= 1, P(Tt, y), Qt(e, t, l, i), l = Ke ? dl : 0, !E && e !== null && (e.flags & 128) !== 0)
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
          e = i.alternate, e !== null && Is(e) === null && (u = i), i = i.sibling;
        i = u, i === null ? (u = t.child, t.child = null) : (u = i.sibling, i.sibling = null), Ic(
          t,
          !1,
          u,
          i,
          d,
          l
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (i = null, u = t.child, t.child = null; u !== null; ) {
          if (e = u.alternate, e !== null && Is(e) === null) {
            t.child = u;
            break;
          }
          e = u.sibling, u.sibling = i, i = u, u = e;
        }
        Ic(
          t,
          !0,
          i,
          null,
          d,
          l
        );
        break;
      case "together":
        Ic(
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
  function Ta(e, t, i) {
    if (e !== null && (t.dependencies = e.dependencies), ti |= t.lanes, (i & t.childLanes) === 0)
      if (e !== null) {
        if (gr(
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
      for (e = t.child, i = ba(e, e.pendingProps), t.child = i, i.return = t; e.sibling !== null; )
        e = e.sibling, i = i.sibling = ba(e, e.pendingProps), i.return = t;
      i.sibling = null;
    }
    return t.child;
  }
  function Gc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Vs(e)));
  }
  function PS(e, t, i) {
    switch (t.tag) {
      case 3:
        Ae(t, t.stateNode.containerInfo), Xa(t, Dt, e.memoizedState.cache), zi();
        break;
      case 27:
      case 5:
        De(t);
        break;
      case 4:
        Ae(t, t.stateNode.containerInfo);
        break;
      case 10:
        Xa(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, vc(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (Pa(t), t.flags |= 128, null) : (i & t.child.childLanes) !== 0 ? $p(e, t, i) : (Pa(t), e = Ta(
            e,
            t,
            i
          ), e !== null ? e.sibling : null);
        Pa(t);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (l = (i & t.childLanes) !== 0, l || (gr(
          e,
          t,
          i,
          !1
        ), l = (i & t.childLanes) !== 0), u) {
          if (l)
            return Fp(
              e,
              t,
              i
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), P(Tt, Tt.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, Up(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        Xa(t, Dt, e.memoizedState.cache);
    }
    return Ta(e, t, i);
  }
  function Ip(e, t, i) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Ot = !0;
      else {
        if (!Gc(e, i) && (t.flags & 128) === 0)
          return Ot = !1, PS(
            e,
            t,
            i
          );
        Ot = (e.flags & 131072) !== 0;
      }
    else
      Ot = !1, Ke && (t.flags & 1048576) !== 0 && Em(t, dl, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = Vi(t.elementType), t.type = e, typeof e == "function")
            Pu(e) ? (l = qi(e, l), t.tag = 1, t = Hp(
              null,
              t,
              e,
              l,
              i
            )) : (t.tag = 0, t = Bc(
              null,
              t,
              e,
              l,
              i
            ));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === k) {
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
            throw t = je(e) || e, Error(s(306, t, ""));
          }
        }
        return t;
      case 0:
        return Bc(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 1:
        return l = t.type, u = qi(
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
          if (Ae(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(s(387));
          l = t.pendingProps;
          var d = t.memoizedState;
          u = d.element, fc(e, t), bl(t, l, null, i);
          var y = t.memoizedState;
          if (l = y.cache, Xa(t, Dt, l), l !== d.cache && lc(
            t,
            [Dt],
            i,
            !0
          ), yl(), l = y.element, d.isDehydrated)
            if (d = {
              element: l,
              isDehydrated: !1,
              cache: y.cache
            }, t.updateQueue.baseState = d, t.memoizedState = d, t.flags & 256) {
              t = qp(
                e,
                t,
                l,
                i
              );
              break e;
            } else if (l !== u) {
              u = zn(
                Error(s(424)),
                t
              ), fl(u), t = qp(
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
              for (pt = kn(e.firstChild), Xt = t, Ke = !0, Ia = null, Un = !0, i = Um(
                t,
                null,
                l,
                i
              ), t.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (zi(), l === u) {
              t = Ta(
                e,
                t,
                i
              );
              break e;
            }
            Qt(e, t, l, i);
          }
          t = t.child;
        }
        return t;
      case 26:
        return no(e, t), e === null ? (i = nv(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = i : Ke || (i = t.type, e = t.pendingProps, l = xo(
          ye.current
        ).createElement(i), l[me] = t, l[pe] = e, Zt(l, i, e), dt(l), t.stateNode = l) : t.memoizedState = nv(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return De(t), e === null && Ke && (l = t.stateNode = Wg(
          t.type,
          t.pendingProps,
          ye.current
        ), Xt = t, Un = !0, u = pt, li(t.type) ? (Td = u, pt = kn(l.firstChild)) : pt = u), Qt(
          e,
          t,
          t.pendingProps.children,
          i
        ), no(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Ke && ((u = l = pt) && (l = Nw(
          l,
          t.type,
          t.pendingProps,
          Un
        ), l !== null ? (t.stateNode = l, Xt = t, pt = kn(l.firstChild), Un = !1, u = !0) : u = !1), u || Ga(t)), De(t), u = t.type, d = t.pendingProps, y = e !== null ? e.memoizedProps : null, l = d.children, xd(u, d) ? l = null : y !== null && xd(u, y) && (t.flags |= 32), t.memoizedState !== null && (u = bc(
          e,
          t,
          $S,
          null,
          null,
          i
        ), Bl._currentValue = u), no(e, t), Qt(e, t, l, i), t.child;
      case 6:
        return e === null && Ke && ((e = i = pt) && (i = Mw(
          i,
          t.pendingProps,
          Un
        ), i !== null ? (t.stateNode = i, Xt = t, pt = null, e = !0) : e = !1), e || Ga(t)), null;
      case 13:
        return $p(e, t, i);
      case 4:
        return Ae(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = Bi(
          t,
          null,
          l,
          i
        ) : Qt(e, t, l, i), t.child;
      case 11:
        return zp(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 7:
        return Qt(
          e,
          t,
          t.pendingProps,
          i
        ), t.child;
      case 8:
        return Qt(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 12:
        return Qt(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 10:
        return l = t.pendingProps, Xa(t, t.type, l.value), Qt(e, t, l.children, i), t.child;
      case 9:
        return u = t.type._context, l = t.pendingProps.children, Li(t), u = Kt(u), l = l(u), t.flags |= 1, Qt(e, t, l, i), t.child;
      case 14:
        return Op(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 15:
        return Lp(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 19:
        return Fp(e, t, i);
      case 31:
        return ZS(e, t, i);
      case 22:
        return Up(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        return Li(t), l = Kt(Dt), e === null ? (u = uc(), u === null && (u = ct, d = sc(), u.pooledCache = d, d.refCount++, d !== null && (u.pooledCacheLanes |= i), u = d), t.memoizedState = { parent: l, cache: u }, dc(t), Xa(t, Dt, u)) : ((e.lanes & i) !== 0 && (fc(e, t), bl(t, null, null, i), yl()), u = e.memoizedState, d = t.memoizedState, u.parent !== l ? (u = { parent: l, cache: l }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), Xa(t, Dt, l)) : (l = d.cache, Xa(t, Dt, l), l !== u.cache && lc(
          t,
          [Dt],
          i,
          !0
        ))), Qt(
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
  function Ca(e) {
    e.flags |= 4;
  }
  function Xc(e, t, i, l, u) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (yg()) e.flags |= 8192;
        else
          throw ki = qs, cc;
    } else e.flags &= -16777217;
  }
  function Gp(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !sv(t))
      if (yg()) e.flags |= 8192;
      else
        throw ki = qs, cc;
  }
  function io(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Ht() : 536870912, e.lanes |= t, Mr |= t);
  }
  function Tl(e, t) {
    if (!Ke)
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
  function gt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, i = 0, l = 0;
    if (t)
      for (var u = e.child; u !== null; )
        i |= u.lanes | u.childLanes, l |= u.subtreeFlags & 65011712, l |= u.flags & 65011712, u.return = e, u = u.sibling;
    else
      for (u = e.child; u !== null; )
        i |= u.lanes | u.childLanes, l |= u.subtreeFlags, l |= u.flags, u.return = e, u = u.sibling;
    return e.subtreeFlags |= l, e.childLanes = i, t;
  }
  function JS(e, t, i) {
    var l = t.pendingProps;
    switch (tc(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return gt(t), null;
      case 1:
        return gt(t), null;
      case 3:
        return i = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), wa(Dt), se(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (pr(t) ? Ca(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, ac())), gt(t), null;
      case 26:
        var u = t.type, d = t.memoizedState;
        return e === null ? (Ca(t), d !== null ? (gt(t), Gp(t, d)) : (gt(t), Xc(
          t,
          u,
          null,
          l,
          i
        ))) : d ? d !== e.memoizedState ? (Ca(t), gt(t), Gp(t, d)) : (gt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && Ca(t), gt(t), Xc(
          t,
          u,
          e,
          l,
          i
        )), null;
      case 27:
        if (Oe(t), i = ye.current, u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Ca(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(s(166));
            return gt(t), null;
          }
          e = ie.current, pr(t) ? Tm(t) : (e = Wg(u, l, i), t.stateNode = e, Ca(t));
        }
        return gt(t), null;
      case 5:
        if (Oe(t), u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Ca(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(s(166));
            return gt(t), null;
          }
          if (d = ie.current, pr(t))
            Tm(t);
          else {
            var y = xo(
              ye.current
            );
            switch (d) {
              case 1:
                d = y.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                d = y.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    d = y.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    d = y.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    d = y.createElement("div"), d.innerHTML = "<script><\/script>", d = d.removeChild(
                      d.firstChild
                    );
                    break;
                  case "select":
                    d = typeof l.is == "string" ? y.createElement("select", {
                      is: l.is
                    }) : y.createElement("select"), l.multiple ? d.multiple = !0 : l.size && (d.size = l.size);
                    break;
                  default:
                    d = typeof l.is == "string" ? y.createElement(u, { is: l.is }) : y.createElement(u);
                }
            }
            d[me] = t, d[pe] = l;
            e: for (y = t.child; y !== null; ) {
              if (y.tag === 5 || y.tag === 6)
                d.appendChild(y.stateNode);
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
            t.stateNode = d;
            e: switch (Zt(d, u, l), u) {
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
            l && Ca(t);
          }
        }
        return gt(t), Xc(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          i
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== l && Ca(t);
        else {
          if (typeof l != "string" && t.stateNode === null)
            throw Error(s(166));
          if (e = ye.current, pr(t)) {
            if (e = t.stateNode, i = t.memoizedProps, l = null, u = Xt, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  l = u.memoizedProps;
              }
            e[me] = t, e = !!(e.nodeValue === i || l !== null && l.suppressHydrationWarning === !0 || $g(e.nodeValue, i)), e || Ga(t, !0);
          } else
            e = xo(e).createTextNode(
              l
            ), e[me] = t, t.stateNode = e;
        }
        return gt(t), null;
      case 31:
        if (i = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = pr(t), i !== null) {
            if (e === null) {
              if (!l) throw Error(s(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(557));
              e[me] = t;
            } else
              zi(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            gt(t), e = !1;
          } else
            i = ac(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), e = !0;
          if (!e)
            return t.flags & 256 ? (xn(t), t) : (xn(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(s(558));
        }
        return gt(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (u = pr(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(s(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[me] = t;
            } else
              zi(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            gt(t), u = !1;
          } else
            u = ac(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (xn(t), t) : (xn(t), null);
        }
        return xn(t), (t.flags & 128) !== 0 ? (t.lanes = i, t) : (i = l !== null, e = e !== null && e.memoizedState !== null, i && (l = t.child, u = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (u = l.alternate.memoizedState.cachePool.pool), d = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (d = l.memoizedState.cachePool.pool), d !== u && (l.flags |= 2048)), i !== e && i && (t.child.flags |= 8192), io(t, t.updateQueue), gt(t), null);
      case 4:
        return se(), e === null && pd(t.stateNode.containerInfo), gt(t), null;
      case 10:
        return wa(t.type), gt(t), null;
      case 19:
        if (X(Tt), l = t.memoizedState, l === null) return gt(t), null;
        if (u = (t.flags & 128) !== 0, d = l.rendering, d === null)
          if (u) Tl(l, !1);
          else {
            if (wt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (d = Is(e), d !== null) {
                  for (t.flags |= 128, Tl(l, !1), e = d.updateQueue, t.updateQueue = e, io(t, e), t.subtreeFlags = 0, e = i, i = t.child; i !== null; )
                    xm(i, e), i = i.sibling;
                  return P(
                    Tt,
                    Tt.current & 1 | 2
                  ), Ke && xa(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && he() > uo && (t.flags |= 128, u = !0, Tl(l, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = Is(d), e !== null) {
              if (t.flags |= 128, u = !0, e = e.updateQueue, t.updateQueue = e, io(t, e), Tl(l, !0), l.tail === null && l.tailMode === "hidden" && !d.alternate && !Ke)
                return gt(t), null;
            } else
              2 * he() - l.renderingStartTime > uo && i !== 536870912 && (t.flags |= 128, u = !0, Tl(l, !1), t.lanes = 4194304);
          l.isBackwards ? (d.sibling = t.child, t.child = d) : (e = l.last, e !== null ? e.sibling = d : t.child = d, l.last = d);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = he(), e.sibling = null, i = Tt.current, P(
          Tt,
          u ? i & 1 | 2 : i & 1
        ), Ke && xa(t, l.treeForkCount), e) : (gt(t), null);
      case 22:
      case 23:
        return xn(t), gc(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (i & 536870912) !== 0 && (t.flags & 128) === 0 && (gt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : gt(t), i = t.updateQueue, i !== null && io(t, i.retryQueue), i = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== i && (t.flags |= 2048), e !== null && X(Ui), null;
      case 24:
        return i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), wa(Dt), gt(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function WS(e, t) {
    switch (tc(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return wa(Dt), se(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Oe(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (xn(t), t.alternate === null)
            throw Error(s(340));
          zi();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (xn(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(s(340));
          zi();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return X(Tt), null;
      case 4:
        return se(), null;
      case 10:
        return wa(t.type), null;
      case 22:
      case 23:
        return xn(t), gc(), e !== null && X(Ui), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return wa(Dt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Xp(e, t) {
    switch (tc(t), t.tag) {
      case 3:
        wa(Dt), se();
        break;
      case 26:
      case 27:
      case 5:
        Oe(t);
        break;
      case 4:
        se();
        break;
      case 31:
        t.memoizedState !== null && xn(t);
        break;
      case 13:
        xn(t);
        break;
      case 19:
        X(Tt);
        break;
      case 10:
        wa(t.type);
        break;
      case 22:
      case 23:
        xn(t), gc(), e !== null && X(Ui);
        break;
      case 24:
        wa(Dt);
    }
  }
  function Cl(e, t) {
    try {
      var i = t.updateQueue, l = i !== null ? i.lastEffect : null;
      if (l !== null) {
        var u = l.next;
        i = u;
        do {
          if ((i.tag & e) === e) {
            l = void 0;
            var d = i.create, y = i.inst;
            l = d(), y.destroy = l;
          }
          i = i.next;
        } while (i !== u);
      }
    } catch (E) {
      nt(t, t.return, E);
    }
  }
  function Wa(e, t, i) {
    try {
      var l = t.updateQueue, u = l !== null ? l.lastEffect : null;
      if (u !== null) {
        var d = u.next;
        l = d;
        do {
          if ((l.tag & e) === e) {
            var y = l.inst, E = y.destroy;
            if (E !== void 0) {
              y.destroy = void 0, u = t;
              var _ = i, F = E;
              try {
                F();
              } catch (J) {
                nt(
                  u,
                  _,
                  J
                );
              }
            }
          }
          l = l.next;
        } while (l !== d);
      }
    } catch (J) {
      nt(t, t.return, J);
    }
  }
  function Kp(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var i = e.stateNode;
      try {
        km(t, i);
      } catch (l) {
        nt(e, e.return, l);
      }
    }
  }
  function Qp(e, t, i) {
    i.props = qi(
      e.type,
      e.memoizedProps
    ), i.state = e.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (l) {
      nt(e, t, l);
    }
  }
  function Nl(e, t) {
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
      nt(e, t, u);
    }
  }
  function ua(e, t) {
    var i = e.ref, l = e.refCleanup;
    if (i !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (u) {
          nt(e, t, u);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (u) {
          nt(e, t, u);
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
      nt(e, e.return, u);
    }
  }
  function Kc(e, t, i) {
    try {
      var l = e.stateNode;
      Sw(l, e.type, i, t), l[pe] = t;
    } catch (u) {
      nt(e, e.return, u);
    }
  }
  function Pp(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && li(e.type) || e.tag === 4;
  }
  function Qc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Pp(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && li(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Zc(e, t, i) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(e, t) : (t = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, t.appendChild(e), i = i._reactRootContainer, i != null || t.onclick !== null || (t.onclick = va));
    else if (l !== 4 && (l === 27 && li(e.type) && (i = e.stateNode, t = null), e = e.child, e !== null))
      for (Zc(e, t, i), e = e.sibling; e !== null; )
        Zc(e, t, i), e = e.sibling;
  }
  function ro(e, t, i) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? i.insertBefore(e, t) : i.appendChild(e);
    else if (l !== 4 && (l === 27 && li(e.type) && (i = e.stateNode), e = e.child, e !== null))
      for (ro(e, t, i), e = e.sibling; e !== null; )
        ro(e, t, i), e = e.sibling;
  }
  function Jp(e) {
    var t = e.stateNode, i = e.memoizedProps;
    try {
      for (var l = e.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      Zt(t, l, i), t[me] = e, t[pe] = i;
    } catch (d) {
      nt(e, e.return, d);
    }
  }
  var Na = !1, Lt = !1, Pc = !1, Wp = typeof WeakSet == "function" ? WeakSet : Set, Yt = null;
  function ew(e, t) {
    if (e = e.containerInfo, yd = No, e = dm(e), Fu(e)) {
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
            var u = l.anchorOffset, d = l.focusNode;
            l = l.focusOffset;
            try {
              i.nodeType, d.nodeType;
            } catch {
              i = null;
              break e;
            }
            var y = 0, E = -1, _ = -1, F = 0, J = 0, ne = e, I = null;
            t: for (; ; ) {
              for (var K; ne !== i || u !== 0 && ne.nodeType !== 3 || (E = y + u), ne !== d || l !== 0 && ne.nodeType !== 3 || (_ = y + l), ne.nodeType === 3 && (y += ne.nodeValue.length), (K = ne.firstChild) !== null; )
                I = ne, ne = K;
              for (; ; ) {
                if (ne === e) break t;
                if (I === i && ++F === u && (E = y), I === d && ++J === l && (_ = y), (K = ne.nextSibling) !== null) break;
                ne = I, I = ne.parentNode;
              }
              ne = K;
            }
            i = E === -1 || _ === -1 ? null : { start: E, end: _ };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (bd = { focusedElem: e, selectionRange: i }, No = !1, Yt = t; Yt !== null; )
      if (t = Yt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Yt = e;
      else
        for (; Yt !== null; ) {
          switch (t = Yt, d = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (i = 0; i < e.length; i++)
                  u = e[i], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && d !== null) {
                e = void 0, i = t, u = d.memoizedProps, d = d.memoizedState, l = i.stateNode;
                try {
                  var be = qi(
                    i.type,
                    u
                  );
                  e = l.getSnapshotBeforeUpdate(
                    be,
                    d
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Re) {
                  nt(
                    i,
                    i.return,
                    Re
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, i = e.nodeType, i === 9)
                  wd(e);
                else if (i === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      wd(e);
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
            e.return = t.return, Yt = e;
            break;
          }
          Yt = t.return;
        }
  }
  function eg(e, t, i) {
    var l = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        Ra(e, i), l & 4 && Cl(5, i);
        break;
      case 1:
        if (Ra(e, i), l & 4)
          if (e = i.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (y) {
              nt(i, i.return, y);
            }
          else {
            var u = qi(
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
              nt(
                i,
                i.return,
                y
              );
            }
          }
        l & 64 && Kp(i), l & 512 && Nl(i, i.return);
        break;
      case 3:
        if (Ra(e, i), l & 64 && (e = i.updateQueue, e !== null)) {
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
            km(e, t);
          } catch (y) {
            nt(i, i.return, y);
          }
        }
        break;
      case 27:
        t === null && l & 4 && Jp(i);
      case 26:
      case 5:
        Ra(e, i), t === null && l & 4 && Zp(i), l & 512 && Nl(i, i.return);
        break;
      case 12:
        Ra(e, i);
        break;
      case 31:
        Ra(e, i), l & 4 && ag(e, i);
        break;
      case 13:
        Ra(e, i), l & 4 && ig(e, i), l & 64 && (e = i.memoizedState, e !== null && (e = e.dehydrated, e !== null && (i = uw.bind(
          null,
          i
        ), Rw(e, i))));
        break;
      case 22:
        if (l = i.memoizedState !== null || Na, !l) {
          t = t !== null && t.memoizedState !== null || Lt, u = Na;
          var d = Lt;
          Na = l, (Lt = t) && !d ? Aa(
            e,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : Ra(e, i), Na = u, Lt = d;
        }
        break;
      case 30:
        break;
      default:
        Ra(e, i);
    }
  }
  function tg(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, tg(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ut(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var bt = null, un = !1;
  function Ma(e, t, i) {
    for (i = i.child; i !== null; )
      ng(e, t, i), i = i.sibling;
  }
  function ng(e, t, i) {
    if (It && typeof It.onCommitFiberUnmount == "function")
      try {
        It.onCommitFiberUnmount(Gn, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        Lt || ua(i, t), Ma(
          e,
          t,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        Lt || ua(i, t);
        var l = bt, u = un;
        li(i.type) && (bt = i.stateNode, un = !1), Ma(
          e,
          t,
          i
        ), Ul(i.stateNode), bt = l, un = u;
        break;
      case 5:
        Lt || ua(i, t);
      case 6:
        if (l = bt, u = un, bt = null, Ma(
          e,
          t,
          i
        ), bt = l, un = u, bt !== null)
          if (un)
            try {
              (bt.nodeType === 9 ? bt.body : bt.nodeName === "HTML" ? bt.ownerDocument.body : bt).removeChild(i.stateNode);
            } catch (d) {
              nt(
                i,
                t,
                d
              );
            }
          else
            try {
              bt.removeChild(i.stateNode);
            } catch (d) {
              nt(
                i,
                t,
                d
              );
            }
        break;
      case 18:
        bt !== null && (un ? (e = bt, Kg(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          i.stateNode
        ), Ur(e)) : Kg(bt, i.stateNode));
        break;
      case 4:
        l = bt, u = un, bt = i.stateNode.containerInfo, un = !0, Ma(
          e,
          t,
          i
        ), bt = l, un = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Wa(2, i, t), Lt || Wa(4, i, t), Ma(
          e,
          t,
          i
        );
        break;
      case 1:
        Lt || (ua(i, t), l = i.stateNode, typeof l.componentWillUnmount == "function" && Qp(
          i,
          t,
          l
        )), Ma(
          e,
          t,
          i
        );
        break;
      case 21:
        Ma(
          e,
          t,
          i
        );
        break;
      case 22:
        Lt = (l = Lt) || i.memoizedState !== null, Ma(
          e,
          t,
          i
        ), Lt = l;
        break;
      default:
        Ma(
          e,
          t,
          i
        );
    }
  }
  function ag(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Ur(e);
      } catch (i) {
        nt(t, t.return, i);
      }
    }
  }
  function ig(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Ur(e);
      } catch (i) {
        nt(t, t.return, i);
      }
  }
  function tw(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Wp()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Wp()), t;
      default:
        throw Error(s(435, e.tag));
    }
  }
  function lo(e, t) {
    var i = tw(e);
    t.forEach(function(l) {
      if (!i.has(l)) {
        i.add(l);
        var u = cw.bind(null, e, l);
        l.then(u, u);
      }
    });
  }
  function cn(e, t) {
    var i = t.deletions;
    if (i !== null)
      for (var l = 0; l < i.length; l++) {
        var u = i[l], d = e, y = t, E = y;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (li(E.type)) {
                bt = E.stateNode, un = !1;
                break e;
              }
              break;
            case 5:
              bt = E.stateNode, un = !1;
              break e;
            case 3:
            case 4:
              bt = E.stateNode.containerInfo, un = !0;
              break e;
          }
          E = E.return;
        }
        if (bt === null) throw Error(s(160));
        ng(d, y, u), bt = null, un = !1, d = u.alternate, d !== null && (d.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        rg(t, e), t = t.sibling;
  }
  var Zn = null;
  function rg(e, t) {
    var i = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        cn(t, e), dn(e), l & 4 && (Wa(3, e, e.return), Cl(3, e), Wa(5, e, e.return));
        break;
      case 1:
        cn(t, e), dn(e), l & 512 && (Lt || i === null || ua(i, i.return)), l & 64 && Na && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (i = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = i === null ? l : i.concat(l))));
        break;
      case 26:
        var u = Zn;
        if (cn(t, e), dn(e), l & 512 && (Lt || i === null || ua(i, i.return)), l & 4) {
          var d = i !== null ? i.memoizedState : null;
          if (l = e.memoizedState, i === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, i = e.memoizedProps, u = u.ownerDocument || u;
                  t: switch (l) {
                    case "title":
                      d = u.getElementsByTagName("title")[0], (!d || d[He] || d[me] || d.namespaceURI === "http://www.w3.org/2000/svg" || d.hasAttribute("itemprop")) && (d = u.createElement(l), u.head.insertBefore(
                        d,
                        u.querySelector("head > title")
                      )), Zt(d, l, i), d[me] = e, dt(d), l = d;
                      break e;
                    case "link":
                      var y = rv(
                        "link",
                        "href",
                        u
                      ).get(l + (i.href || ""));
                      if (y) {
                        for (var E = 0; E < y.length; E++)
                          if (d = y[E], d.getAttribute("href") === (i.href == null || i.href === "" ? null : i.href) && d.getAttribute("rel") === (i.rel == null ? null : i.rel) && d.getAttribute("title") === (i.title == null ? null : i.title) && d.getAttribute("crossorigin") === (i.crossOrigin == null ? null : i.crossOrigin)) {
                            y.splice(E, 1);
                            break t;
                          }
                      }
                      d = u.createElement(l), Zt(d, l, i), u.head.appendChild(d);
                      break;
                    case "meta":
                      if (y = rv(
                        "meta",
                        "content",
                        u
                      ).get(l + (i.content || ""))) {
                        for (E = 0; E < y.length; E++)
                          if (d = y[E], d.getAttribute("content") === (i.content == null ? null : "" + i.content) && d.getAttribute("name") === (i.name == null ? null : i.name) && d.getAttribute("property") === (i.property == null ? null : i.property) && d.getAttribute("http-equiv") === (i.httpEquiv == null ? null : i.httpEquiv) && d.getAttribute("charset") === (i.charSet == null ? null : i.charSet)) {
                            y.splice(E, 1);
                            break t;
                          }
                      }
                      d = u.createElement(l), Zt(d, l, i), u.head.appendChild(d);
                      break;
                    default:
                      throw Error(s(468, l));
                  }
                  d[me] = e, dt(d), l = d;
                }
                e.stateNode = l;
              } else
                lv(
                  u,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = iv(
                u,
                l,
                e.memoizedProps
              );
          else
            d !== l ? (d === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : d.count--, l === null ? lv(
              u,
              e.type,
              e.stateNode
            ) : iv(
              u,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && Kc(
              e,
              e.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        cn(t, e), dn(e), l & 512 && (Lt || i === null || ua(i, i.return)), i !== null && l & 4 && Kc(
          e,
          e.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (cn(t, e), dn(e), l & 512 && (Lt || i === null || ua(i, i.return)), e.flags & 32) {
          u = e.stateNode;
          try {
            rr(u, "");
          } catch (be) {
            nt(e, e.return, be);
          }
        }
        l & 4 && e.stateNode != null && (u = e.memoizedProps, Kc(
          e,
          u,
          i !== null ? i.memoizedProps : u
        )), l & 1024 && (Pc = !0);
        break;
      case 6:
        if (cn(t, e), dn(e), l & 4) {
          if (e.stateNode === null)
            throw Error(s(162));
          l = e.memoizedProps, i = e.stateNode;
          try {
            i.nodeValue = l;
          } catch (be) {
            nt(e, e.return, be);
          }
        }
        break;
      case 3:
        if (Eo = null, u = Zn, Zn = So(t.containerInfo), cn(t, e), Zn = u, dn(e), l & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            Ur(t.containerInfo);
          } catch (be) {
            nt(e, e.return, be);
          }
        Pc && (Pc = !1, lg(e));
        break;
      case 4:
        l = Zn, Zn = So(
          e.stateNode.containerInfo
        ), cn(t, e), dn(e), Zn = l;
        break;
      case 12:
        cn(t, e), dn(e);
        break;
      case 31:
        cn(t, e), dn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, lo(e, l)));
        break;
      case 13:
        cn(t, e), dn(e), e.child.flags & 8192 && e.memoizedState !== null != (i !== null && i.memoizedState !== null) && (oo = he()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, lo(e, l)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var _ = i !== null && i.memoizedState !== null, F = Na, J = Lt;
        if (Na = F || u, Lt = J || _, cn(t, e), Lt = J, Na = F, dn(e), l & 8192)
          e: for (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (i === null || _ || Na || Lt || $i(e)), i = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (i === null) {
                _ = i = t;
                try {
                  if (d = _.stateNode, u)
                    y = d.style, typeof y.setProperty == "function" ? y.setProperty("display", "none", "important") : y.display = "none";
                  else {
                    E = _.stateNode;
                    var ne = _.memoizedProps.style, I = ne != null && ne.hasOwnProperty("display") ? ne.display : null;
                    E.style.display = I == null || typeof I == "boolean" ? "" : ("" + I).trim();
                  }
                } catch (be) {
                  nt(_, _.return, be);
                }
              }
            } else if (t.tag === 6) {
              if (i === null) {
                _ = t;
                try {
                  _.stateNode.nodeValue = u ? "" : _.memoizedProps;
                } catch (be) {
                  nt(_, _.return, be);
                }
              }
            } else if (t.tag === 18) {
              if (i === null) {
                _ = t;
                try {
                  var K = _.stateNode;
                  u ? Qg(K, !0) : Qg(_.stateNode, !1);
                } catch (be) {
                  nt(_, _.return, be);
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
        l & 4 && (l = e.updateQueue, l !== null && (i = l.retryQueue, i !== null && (l.retryQueue = null, lo(e, i))));
        break;
      case 19:
        cn(t, e), dn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, lo(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        cn(t, e), dn(e);
    }
  }
  function dn(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var i, l = e.return; l !== null; ) {
          if (Pp(l)) {
            i = l;
            break;
          }
          l = l.return;
        }
        if (i == null) throw Error(s(160));
        switch (i.tag) {
          case 27:
            var u = i.stateNode, d = Qc(e);
            ro(e, d, u);
            break;
          case 5:
            var y = i.stateNode;
            i.flags & 32 && (rr(y, ""), i.flags &= -33);
            var E = Qc(e);
            ro(e, E, y);
            break;
          case 3:
          case 4:
            var _ = i.stateNode.containerInfo, F = Qc(e);
            Zc(
              e,
              F,
              _
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (J) {
        nt(e, e.return, J);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function lg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        lg(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Ra(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        eg(e, t.alternate, t), t = t.sibling;
  }
  function $i(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Wa(4, t, t.return), $i(t);
          break;
        case 1:
          ua(t, t.return);
          var i = t.stateNode;
          typeof i.componentWillUnmount == "function" && Qp(
            t,
            t.return,
            i
          ), $i(t);
          break;
        case 27:
          Ul(t.stateNode);
        case 26:
        case 5:
          ua(t, t.return), $i(t);
          break;
        case 22:
          t.memoizedState === null && $i(t);
          break;
        case 30:
          $i(t);
          break;
        default:
          $i(t);
      }
      e = e.sibling;
    }
  }
  function Aa(e, t, i) {
    for (i = i && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate, u = e, d = t, y = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          Aa(
            u,
            d,
            i
          ), Cl(4, d);
          break;
        case 1:
          if (Aa(
            u,
            d,
            i
          ), l = d, u = l.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (F) {
              nt(l, l.return, F);
            }
          if (l = d, u = l.updateQueue, u !== null) {
            var E = l.stateNode;
            try {
              var _ = u.shared.hiddenCallbacks;
              if (_ !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < _.length; u++)
                  Vm(_[u], E);
            } catch (F) {
              nt(l, l.return, F);
            }
          }
          i && y & 64 && Kp(d), Nl(d, d.return);
          break;
        case 27:
          Jp(d);
        case 26:
        case 5:
          Aa(
            u,
            d,
            i
          ), i && l === null && y & 4 && Zp(d), Nl(d, d.return);
          break;
        case 12:
          Aa(
            u,
            d,
            i
          );
          break;
        case 31:
          Aa(
            u,
            d,
            i
          ), i && y & 4 && ag(u, d);
          break;
        case 13:
          Aa(
            u,
            d,
            i
          ), i && y & 4 && ig(u, d);
          break;
        case 22:
          d.memoizedState === null && Aa(
            u,
            d,
            i
          ), Nl(d, d.return);
          break;
        case 30:
          break;
        default:
          Aa(
            u,
            d,
            i
          );
      }
      t = t.sibling;
    }
  }
  function Jc(e, t) {
    var i = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== i && (e != null && e.refCount++, i != null && hl(i));
  }
  function Wc(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && hl(e));
  }
  function Pn(e, t, i, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        sg(
          e,
          t,
          i,
          l
        ), t = t.sibling;
  }
  function sg(e, t, i, l) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Pn(
          e,
          t,
          i,
          l
        ), u & 2048 && Cl(9, t);
        break;
      case 1:
        Pn(
          e,
          t,
          i,
          l
        );
        break;
      case 3:
        Pn(
          e,
          t,
          i,
          l
        ), u & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && hl(e)));
        break;
      case 12:
        if (u & 2048) {
          Pn(
            e,
            t,
            i,
            l
          ), e = t.stateNode;
          try {
            var d = t.memoizedProps, y = d.id, E = d.onPostCommit;
            typeof E == "function" && E(
              y,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (_) {
            nt(t, t.return, _);
          }
        } else
          Pn(
            e,
            t,
            i,
            l
          );
        break;
      case 31:
        Pn(
          e,
          t,
          i,
          l
        );
        break;
      case 13:
        Pn(
          e,
          t,
          i,
          l
        );
        break;
      case 23:
        break;
      case 22:
        d = t.stateNode, y = t.alternate, t.memoizedState !== null ? d._visibility & 2 ? Pn(
          e,
          t,
          i,
          l
        ) : Ml(e, t) : d._visibility & 2 ? Pn(
          e,
          t,
          i,
          l
        ) : (d._visibility |= 2, Tr(
          e,
          t,
          i,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && Jc(y, t);
        break;
      case 24:
        Pn(
          e,
          t,
          i,
          l
        ), u & 2048 && Wc(t.alternate, t);
        break;
      default:
        Pn(
          e,
          t,
          i,
          l
        );
    }
  }
  function Tr(e, t, i, l, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var d = e, y = t, E = i, _ = l, F = y.flags;
      switch (y.tag) {
        case 0:
        case 11:
        case 15:
          Tr(
            d,
            y,
            E,
            _,
            u
          ), Cl(8, y);
          break;
        case 23:
          break;
        case 22:
          var J = y.stateNode;
          y.memoizedState !== null ? J._visibility & 2 ? Tr(
            d,
            y,
            E,
            _,
            u
          ) : Ml(
            d,
            y
          ) : (J._visibility |= 2, Tr(
            d,
            y,
            E,
            _,
            u
          )), u && F & 2048 && Jc(
            y.alternate,
            y
          );
          break;
        case 24:
          Tr(
            d,
            y,
            E,
            _,
            u
          ), u && F & 2048 && Wc(y.alternate, y);
          break;
        default:
          Tr(
            d,
            y,
            E,
            _,
            u
          );
      }
      t = t.sibling;
    }
  }
  function Ml(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var i = e, l = t, u = l.flags;
        switch (l.tag) {
          case 22:
            Ml(i, l), u & 2048 && Jc(
              l.alternate,
              l
            );
            break;
          case 24:
            Ml(i, l), u & 2048 && Wc(l.alternate, l);
            break;
          default:
            Ml(i, l);
        }
        t = t.sibling;
      }
  }
  var Rl = 8192;
  function Cr(e, t, i) {
    if (e.subtreeFlags & Rl)
      for (e = e.child; e !== null; )
        og(
          e,
          t,
          i
        ), e = e.sibling;
  }
  function og(e, t, i) {
    switch (e.tag) {
      case 26:
        Cr(
          e,
          t,
          i
        ), e.flags & Rl && e.memoizedState !== null && qw(
          i,
          Zn,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Cr(
          e,
          t,
          i
        );
        break;
      case 3:
      case 4:
        var l = Zn;
        Zn = So(e.stateNode.containerInfo), Cr(
          e,
          t,
          i
        ), Zn = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = Rl, Rl = 16777216, Cr(
          e,
          t,
          i
        ), Rl = l) : Cr(
          e,
          t,
          i
        ));
        break;
      default:
        Cr(
          e,
          t,
          i
        );
    }
  }
  function ug(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Al(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var l = t[i];
          Yt = l, dg(
            l,
            e
          );
        }
      ug(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        cg(e), e = e.sibling;
  }
  function cg(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Al(e), e.flags & 2048 && Wa(9, e, e.return);
        break;
      case 3:
        Al(e);
        break;
      case 12:
        Al(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, so(e)) : Al(e);
        break;
      default:
        Al(e);
    }
  }
  function so(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var l = t[i];
          Yt = l, dg(
            l,
            e
          );
        }
      ug(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Wa(8, t, t.return), so(t);
          break;
        case 22:
          i = t.stateNode, i._visibility & 2 && (i._visibility &= -3, so(t));
          break;
        default:
          so(t);
      }
      e = e.sibling;
    }
  }
  function dg(e, t) {
    for (; Yt !== null; ) {
      var i = Yt;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Wa(8, i, t);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var l = i.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          hl(i.memoizedState.cache);
      }
      if (l = i.child, l !== null) l.return = i, Yt = l;
      else
        e: for (i = e; Yt !== null; ) {
          l = Yt;
          var u = l.sibling, d = l.return;
          if (tg(l), l === i) {
            Yt = null;
            break e;
          }
          if (u !== null) {
            u.return = d, Yt = u;
            break e;
          }
          Yt = d;
        }
    }
  }
  var nw = {
    getCacheForType: function(e) {
      var t = Kt(Dt), i = t.data.get(e);
      return i === void 0 && (i = e(), t.data.set(e, i)), i;
    },
    cacheSignal: function() {
      return Kt(Dt).controller.signal;
    }
  }, aw = typeof WeakMap == "function" ? WeakMap : Map, et = 0, ct = null, Fe = null, Ge = 0, tt = 0, Sn = null, ei = !1, Nr = !1, ed = !1, _a = 0, wt = 0, ti = 0, Yi = 0, td = 0, wn = 0, Mr = 0, _l = null, fn = null, nd = !1, oo = 0, fg = 0, uo = 1 / 0, co = null, ni = null, qt = 0, ai = null, Rr = null, Da = 0, ad = 0, id = null, hg = null, Dl = 0, rd = null;
  function En() {
    return (et & 2) !== 0 && Ge !== 0 ? Ge & -Ge : L.T !== null ? dd() : re();
  }
  function mg() {
    if (wn === 0)
      if ((Ge & 536870912) === 0 || Ke) {
        var e = Xn;
        Xn <<= 1, (Xn & 3932160) === 0 && (Xn = 262144), wn = e;
      } else wn = 536870912;
    return e = bn.current, e !== null && (e.flags |= 32), wn;
  }
  function hn(e, t, i) {
    (e === ct && (tt === 2 || tt === 9) || e.cancelPendingCommit !== null) && (Ar(e, 0), ii(
      e,
      Ge,
      wn,
      !1
    )), at(e, i), ((et & 2) === 0 || e !== ct) && (e === ct && ((et & 2) === 0 && (Yi |= i), wt === 4 && ii(
      e,
      Ge,
      wn,
      !1
    )), ca(e));
  }
  function pg(e, t, i) {
    if ((et & 6) !== 0) throw Error(s(327));
    var l = !i && (t & 127) === 0 && (t & e.expiredLanes) === 0 || ot(e, t), u = l ? lw(e, t) : sd(e, t, !0), d = l;
    do {
      if (u === 0) {
        Nr && !l && ii(e, t, 0, !1);
        break;
      } else {
        if (i = e.current.alternate, d && !iw(i)) {
          u = sd(e, t, !1), d = !1;
          continue;
        }
        if (u === 2) {
          if (d = t, e.errorRecoveryDisabledLanes & d)
            var y = 0;
          else
            y = e.pendingLanes & -536870913, y = y !== 0 ? y : y & 536870912 ? 536870912 : 0;
          if (y !== 0) {
            t = y;
            e: {
              var E = e;
              u = _l;
              var _ = E.current.memoizedState.isDehydrated;
              if (_ && (Ar(E, y).flags |= 256), y = sd(
                E,
                y,
                !1
              ), y !== 2) {
                if (ed && !_) {
                  E.errorRecoveryDisabledLanes |= d, Yi |= d, u = 4;
                  break e;
                }
                d = fn, fn = u, d !== null && (fn === null ? fn = d : fn.push.apply(
                  fn,
                  d
                ));
              }
              u = y;
            }
            if (d = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Ar(e, 0), ii(e, t, 0, !0);
          break;
        }
        e: {
          switch (l = e, d = u, d) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ii(
                l,
                t,
                wn,
                !ei
              );
              break e;
            case 2:
              fn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && (u = oo + 300 - he(), 10 < u)) {
            if (ii(
              l,
              t,
              wn,
              !ei
            ), ze(l, 0, !0) !== 0) break e;
            Da = t, l.timeoutHandle = Gg(
              gg.bind(
                null,
                l,
                i,
                fn,
                co,
                nd,
                t,
                wn,
                Yi,
                Mr,
                ei,
                d,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break e;
          }
          gg(
            l,
            i,
            fn,
            co,
            nd,
            t,
            wn,
            Yi,
            Mr,
            ei,
            d,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    ca(e);
  }
  function gg(e, t, i, l, u, d, y, E, _, F, J, ne, I, K) {
    if (e.timeoutHandle = -1, ne = t.subtreeFlags, ne & 8192 || (ne & 16785408) === 16785408) {
      ne = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: va
      }, og(
        t,
        d,
        ne
      );
      var be = (d & 62914560) === d ? oo - he() : (d & 4194048) === d ? fg - he() : 0;
      if (be = $w(
        ne,
        be
      ), be !== null) {
        Da = d, e.cancelPendingCommit = be(
          jg.bind(
            null,
            e,
            t,
            d,
            i,
            l,
            u,
            y,
            E,
            _,
            J,
            ne,
            null,
            I,
            K
          )
        ), ii(e, d, y, !F);
        return;
      }
    }
    jg(
      e,
      t,
      d,
      i,
      l,
      u,
      y,
      E,
      _
    );
  }
  function iw(e) {
    for (var t = e; ; ) {
      var i = t.tag;
      if ((i === 0 || i === 11 || i === 15) && t.flags & 16384 && (i = t.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var l = 0; l < i.length; l++) {
          var u = i[l], d = u.getSnapshot;
          u = u.value;
          try {
            if (!vn(d(), u)) return !1;
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
  function ii(e, t, i, l) {
    t &= ~td, t &= ~Yi, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var u = t; 0 < u; ) {
      var d = 31 - Bt(u), y = 1 << d;
      l[d] = -1, u &= ~y;
    }
    i !== 0 && ga(e, i, t);
  }
  function fo() {
    return (et & 6) === 0 ? (zl(0), !1) : !0;
  }
  function ld() {
    if (Fe !== null) {
      if (tt === 0)
        var e = Fe.return;
      else
        e = Fe, Sa = Oi = null, wc(e), xr = null, pl = 0, e = Fe;
      for (; e !== null; )
        Xp(e.alternate, e), e = e.return;
      Fe = null;
    }
  }
  function Ar(e, t) {
    var i = e.timeoutHandle;
    i !== -1 && (e.timeoutHandle = -1, jw(i)), i = e.cancelPendingCommit, i !== null && (e.cancelPendingCommit = null, i()), Da = 0, ld(), ct = e, Fe = i = ba(e.current, null), Ge = t, tt = 0, Sn = null, ei = !1, Nr = ot(e, t), ed = !1, Mr = wn = td = Yi = ti = wt = 0, fn = _l = null, nd = !1, (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var u = 31 - Bt(l), d = 1 << u;
        t |= e[u], l &= ~d;
      }
    return _a = t, Ds(), i;
  }
  function vg(e, t) {
    Ve = null, L.H = El, t === br || t === Hs ? (t = zm(), tt = 3) : t === cc ? (t = zm(), tt = 4) : tt = t === kc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Sn = t, Fe === null && (wt = 1, eo(
      e,
      zn(t, e.current)
    ));
  }
  function yg() {
    var e = bn.current;
    return e === null ? !0 : (Ge & 4194048) === Ge ? Vn === null : (Ge & 62914560) === Ge || (Ge & 536870912) !== 0 ? e === Vn : !1;
  }
  function bg() {
    var e = L.H;
    return L.H = El, e === null ? El : e;
  }
  function xg() {
    var e = L.A;
    return L.A = nw, e;
  }
  function ho() {
    wt = 4, ei || (Ge & 4194048) !== Ge && bn.current !== null || (Nr = !0), (ti & 134217727) === 0 && (Yi & 134217727) === 0 || ct === null || ii(
      ct,
      Ge,
      wn,
      !1
    );
  }
  function sd(e, t, i) {
    var l = et;
    et |= 2;
    var u = bg(), d = xg();
    (ct !== e || Ge !== t) && (co = null, Ar(e, t)), t = !1;
    var y = wt;
    e: do
      try {
        if (tt !== 0 && Fe !== null) {
          var E = Fe, _ = Sn;
          switch (tt) {
            case 8:
              ld(), y = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              bn.current === null && (t = !0);
              var F = tt;
              if (tt = 0, Sn = null, _r(e, E, _, F), i && Nr) {
                y = 0;
                break e;
              }
              break;
            default:
              F = tt, tt = 0, Sn = null, _r(e, E, _, F);
          }
        }
        rw(), y = wt;
        break;
      } catch (J) {
        vg(e, J);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Sa = Oi = null, et = l, L.H = u, L.A = d, Fe === null && (ct = null, Ge = 0, Ds()), y;
  }
  function rw() {
    for (; Fe !== null; ) Sg(Fe);
  }
  function lw(e, t) {
    var i = et;
    et |= 2;
    var l = bg(), u = xg();
    ct !== e || Ge !== t ? (co = null, uo = he() + 500, Ar(e, t)) : Nr = ot(
      e,
      t
    );
    e: do
      try {
        if (tt !== 0 && Fe !== null) {
          t = Fe;
          var d = Sn;
          t: switch (tt) {
            case 1:
              tt = 0, Sn = null, _r(e, t, d, 1);
              break;
            case 2:
            case 9:
              if (_m(d)) {
                tt = 0, Sn = null, wg(t);
                break;
              }
              t = function() {
                tt !== 2 && tt !== 9 || ct !== e || (tt = 7), ca(e);
              }, d.then(t, t);
              break e;
            case 3:
              tt = 7;
              break e;
            case 4:
              tt = 5;
              break e;
            case 7:
              _m(d) ? (tt = 0, Sn = null, wg(t)) : (tt = 0, Sn = null, _r(e, t, d, 7));
              break;
            case 5:
              var y = null;
              switch (Fe.tag) {
                case 26:
                  y = Fe.memoizedState;
                case 5:
                case 27:
                  var E = Fe;
                  if (y ? sv(y) : E.stateNode.complete) {
                    tt = 0, Sn = null;
                    var _ = E.sibling;
                    if (_ !== null) Fe = _;
                    else {
                      var F = E.return;
                      F !== null ? (Fe = F, mo(F)) : Fe = null;
                    }
                    break t;
                  }
              }
              tt = 0, Sn = null, _r(e, t, d, 5);
              break;
            case 6:
              tt = 0, Sn = null, _r(e, t, d, 6);
              break;
            case 8:
              ld(), wt = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        sw();
        break;
      } catch (J) {
        vg(e, J);
      }
    while (!0);
    return Sa = Oi = null, L.H = l, L.A = u, et = i, Fe !== null ? 0 : (ct = null, Ge = 0, Ds(), wt);
  }
  function sw() {
    for (; Fe !== null && !Vt(); )
      Sg(Fe);
  }
  function Sg(e) {
    var t = Ip(e.alternate, e, _a);
    e.memoizedProps = e.pendingProps, t === null ? mo(e) : Fe = t;
  }
  function wg(e) {
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
          Ge
        );
        break;
      case 11:
        t = Bp(
          i,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Ge
        );
        break;
      case 5:
        wc(t);
      default:
        Xp(i, t), t = Fe = xm(t, _a), t = Ip(i, t, _a);
    }
    e.memoizedProps = e.pendingProps, t === null ? mo(e) : Fe = t;
  }
  function _r(e, t, i, l) {
    Sa = Oi = null, wc(t), xr = null, pl = 0;
    var u = t.return;
    try {
      if (QS(
        e,
        u,
        t,
        i,
        Ge
      )) {
        wt = 1, eo(
          e,
          zn(i, e.current)
        ), Fe = null;
        return;
      }
    } catch (d) {
      if (u !== null) throw Fe = u, d;
      wt = 1, eo(
        e,
        zn(i, e.current)
      ), Fe = null;
      return;
    }
    t.flags & 32768 ? (Ke || l === 1 ? e = !0 : Nr || (Ge & 536870912) !== 0 ? e = !1 : (ei = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = bn.current, l !== null && l.tag === 13 && (l.flags |= 16384))), Eg(t, e)) : mo(t);
  }
  function mo(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Eg(
          t,
          ei
        );
        return;
      }
      e = t.return;
      var i = JS(
        t.alternate,
        t,
        _a
      );
      if (i !== null) {
        Fe = i;
        return;
      }
      if (t = t.sibling, t !== null) {
        Fe = t;
        return;
      }
      Fe = t = e;
    } while (t !== null);
    wt === 0 && (wt = 5);
  }
  function Eg(e, t) {
    do {
      var i = WS(e.alternate, e);
      if (i !== null) {
        i.flags &= 32767, Fe = i;
        return;
      }
      if (i = e.return, i !== null && (i.flags |= 32768, i.subtreeFlags = 0, i.deletions = null), !t && (e = e.sibling, e !== null)) {
        Fe = e;
        return;
      }
      Fe = e = i;
    } while (e !== null);
    wt = 6, Fe = null;
  }
  function jg(e, t, i, l, u, d, y, E, _) {
    e.cancelPendingCommit = null;
    do
      po();
    while (qt !== 0);
    if ((et & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (d = t.lanes | t.childLanes, d |= Qu, Gt(
        e,
        i,
        d,
        y,
        E,
        _
      ), e === ct && (Fe = ct = null, Ge = 0), Rr = t, ai = e, Da = i, ad = d, id = u, hg = l, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, dw(nn, function() {
        return Rg(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
        l = L.T, L.T = null, u = U.p, U.p = 2, y = et, et |= 4;
        try {
          ew(e, t, i);
        } finally {
          et = y, U.p = u, L.T = l;
        }
      }
      qt = 1, Tg(), Cg(), Ng();
    }
  }
  function Tg() {
    if (qt === 1) {
      qt = 0;
      var e = ai, t = Rr, i = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || i) {
        i = L.T, L.T = null;
        var l = U.p;
        U.p = 2;
        var u = et;
        et |= 4;
        try {
          rg(t, e);
          var d = bd, y = dm(e.containerInfo), E = d.focusedElem, _ = d.selectionRange;
          if (y !== E && E && E.ownerDocument && cm(
            E.ownerDocument.documentElement,
            E
          )) {
            if (_ !== null && Fu(E)) {
              var F = _.start, J = _.end;
              if (J === void 0 && (J = F), "selectionStart" in E)
                E.selectionStart = F, E.selectionEnd = Math.min(
                  J,
                  E.value.length
                );
              else {
                var ne = E.ownerDocument || document, I = ne && ne.defaultView || window;
                if (I.getSelection) {
                  var K = I.getSelection(), be = E.textContent.length, Re = Math.min(_.start, be), st = _.end === void 0 ? Re : Math.min(_.end, be);
                  !K.extend && Re > st && (y = st, st = Re, Re = y);
                  var B = um(
                    E,
                    Re
                  ), O = um(
                    E,
                    st
                  );
                  if (B && O && (K.rangeCount !== 1 || K.anchorNode !== B.node || K.anchorOffset !== B.offset || K.focusNode !== O.node || K.focusOffset !== O.offset)) {
                    var Y = ne.createRange();
                    Y.setStart(B.node, B.offset), K.removeAllRanges(), Re > st ? (K.addRange(Y), K.extend(O.node, O.offset)) : (Y.setEnd(O.node, O.offset), K.addRange(Y));
                  }
                }
              }
            }
            for (ne = [], K = E; K = K.parentNode; )
              K.nodeType === 1 && ne.push({
                element: K,
                left: K.scrollLeft,
                top: K.scrollTop
              });
            for (typeof E.focus == "function" && E.focus(), E = 0; E < ne.length; E++) {
              var te = ne[E];
              te.element.scrollLeft = te.left, te.element.scrollTop = te.top;
            }
          }
          No = !!yd, bd = yd = null;
        } finally {
          et = u, U.p = l, L.T = i;
        }
      }
      e.current = t, qt = 2;
    }
  }
  function Cg() {
    if (qt === 2) {
      qt = 0;
      var e = ai, t = Rr, i = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || i) {
        i = L.T, L.T = null;
        var l = U.p;
        U.p = 2;
        var u = et;
        et |= 4;
        try {
          eg(e, t.alternate, t);
        } finally {
          et = u, U.p = l, L.T = i;
        }
      }
      qt = 3;
    }
  }
  function Ng() {
    if (qt === 4 || qt === 3) {
      qt = 0, Rn();
      var e = ai, t = Rr, i = Da, l = hg;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? qt = 5 : (qt = 0, Rr = ai = null, Mg(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (u === 0 && (ni = null), $(i), t = t.stateNode, It && typeof It.onCommitFiberRoot == "function")
        try {
          It.onCommitFiberRoot(
            Gn,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        t = L.T, u = U.p, U.p = 2, L.T = null;
        try {
          for (var d = e.onRecoverableError, y = 0; y < l.length; y++) {
            var E = l[y];
            d(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          L.T = t, U.p = u;
        }
      }
      (Da & 3) !== 0 && po(), ca(e), u = e.pendingLanes, (i & 261930) !== 0 && (u & 42) !== 0 ? e === rd ? Dl++ : (Dl = 0, rd = e) : Dl = 0, zl(0);
    }
  }
  function Mg(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, hl(t)));
  }
  function po() {
    return Tg(), Cg(), Ng(), Rg();
  }
  function Rg() {
    if (qt !== 5) return !1;
    var e = ai, t = ad;
    ad = 0;
    var i = $(Da), l = L.T, u = U.p;
    try {
      U.p = 32 > i ? 32 : i, L.T = null, i = id, id = null;
      var d = ai, y = Da;
      if (qt = 0, Rr = ai = null, Da = 0, (et & 6) !== 0) throw Error(s(331));
      var E = et;
      if (et |= 4, cg(d.current), sg(
        d,
        d.current,
        y,
        i
      ), et = E, zl(0, !1), It && typeof It.onPostCommitFiberRoot == "function")
        try {
          It.onPostCommitFiberRoot(Gn, d);
        } catch {
        }
      return !0;
    } finally {
      U.p = u, L.T = l, Mg(e, t);
    }
  }
  function Ag(e, t, i) {
    t = zn(i, t), t = Vc(e.stateNode, t, 2), e = Za(e, t, 2), e !== null && (at(e, 2), ca(e));
  }
  function nt(e, t, i) {
    if (e.tag === 3)
      Ag(e, e, i);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Ag(
            t,
            e,
            i
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (ni === null || !ni.has(l))) {
            e = zn(i, e), i = _p(2), l = Za(t, i, 2), l !== null && (Dp(
              i,
              l,
              t,
              e
            ), at(l, 2), ca(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function od(e, t, i) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new aw();
      var u = /* @__PURE__ */ new Set();
      l.set(t, u);
    } else
      u = l.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), l.set(t, u));
    u.has(i) || (ed = !0, u.add(i), e = ow.bind(null, e, t, i), t.then(e, e));
  }
  function ow(e, t, i) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & i, e.warmLanes &= ~i, ct === e && (Ge & i) === i && (wt === 4 || wt === 3 && (Ge & 62914560) === Ge && 300 > he() - oo ? (et & 2) === 0 && Ar(e, 0) : td |= i, Mr === Ge && (Mr = 0)), ca(e);
  }
  function _g(e, t) {
    t === 0 && (t = Ht()), e = _i(e, t), e !== null && (at(e, t), ca(e));
  }
  function uw(e) {
    var t = e.memoizedState, i = 0;
    t !== null && (i = t.retryLane), _g(e, i);
  }
  function cw(e, t) {
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
    l !== null && l.delete(t), _g(e, i);
  }
  function dw(e, t) {
    return na(e, t);
  }
  var go = null, Dr = null, ud = !1, vo = !1, cd = !1, ri = 0;
  function ca(e) {
    e !== Dr && e.next === null && (Dr === null ? go = Dr = e : Dr = Dr.next = e), vo = !0, ud || (ud = !0, hw());
  }
  function zl(e, t) {
    if (!cd && vo) {
      cd = !0;
      do
        for (var i = !1, l = go; l !== null; ) {
          if (e !== 0) {
            var u = l.pendingLanes;
            if (u === 0) var d = 0;
            else {
              var y = l.suspendedLanes, E = l.pingedLanes;
              d = (1 << 31 - Bt(42 | e) + 1) - 1, d &= u & ~(y & ~E), d = d & 201326741 ? d & 201326741 | 1 : d ? d | 2 : 0;
            }
            d !== 0 && (i = !0, Lg(l, d));
          } else
            d = Ge, d = ze(
              l,
              l === ct ? d : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (d & 3) === 0 || ot(l, d) || (i = !0, Lg(l, d));
          l = l.next;
        }
      while (i);
      cd = !1;
    }
  }
  function fw() {
    Dg();
  }
  function Dg() {
    vo = ud = !1;
    var e = 0;
    ri !== 0 && Ew() && (e = ri);
    for (var t = he(), i = null, l = go; l !== null; ) {
      var u = l.next, d = zg(l, t);
      d === 0 ? (l.next = null, i === null ? go = u : i.next = u, u === null && (Dr = i)) : (i = l, (e !== 0 || (d & 3) !== 0) && (vo = !0)), l = u;
    }
    qt !== 0 && qt !== 5 || zl(e), ri !== 0 && (ri = 0);
  }
  function zg(e, t) {
    for (var i = e.suspendedLanes, l = e.pingedLanes, u = e.expirationTimes, d = e.pendingLanes & -62914561; 0 < d; ) {
      var y = 31 - Bt(d), E = 1 << y, _ = u[y];
      _ === -1 ? ((E & i) === 0 || (E & l) !== 0) && (u[y] = Rt(E, t)) : _ <= t && (e.expiredLanes |= E), d &= ~E;
    }
    if (t = ct, i = Ge, i = ze(
      e,
      e === t ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, i === 0 || e === t && (tt === 2 || tt === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && ma(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((i & 3) === 0 || ot(e, i)) {
      if (t = i & -i, t === e.callbackPriority) return t;
      switch (l !== null && ma(l), $(i)) {
        case 2:
        case 8:
          i = ht;
          break;
        case 32:
          i = nn;
          break;
        case 268435456:
          i = kt;
          break;
        default:
          i = nn;
      }
      return l = Og.bind(null, e), i = na(i, l), e.callbackPriority = t, e.callbackNode = i, t;
    }
    return l !== null && l !== null && ma(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Og(e, t) {
    if (qt !== 0 && qt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var i = e.callbackNode;
    if (po() && e.callbackNode !== i)
      return null;
    var l = Ge;
    return l = ze(
      e,
      e === ct ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (pg(e, l, t), zg(e, he()), e.callbackNode != null && e.callbackNode === i ? Og.bind(null, e) : null);
  }
  function Lg(e, t) {
    if (po()) return null;
    pg(e, t, !0);
  }
  function hw() {
    Tw(function() {
      (et & 6) !== 0 ? na(
        Be,
        fw
      ) : Dg();
    });
  }
  function dd() {
    if (ri === 0) {
      var e = vr;
      e === 0 && (e = pa, pa <<= 1, (pa & 261888) === 0 && (pa = 256)), ri = e;
    }
    return ri;
  }
  function Ug(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : js("" + e);
  }
  function Vg(e, t) {
    var i = t.ownerDocument.createElement("input");
    return i.name = t.name, i.value = t.value, e.id && i.setAttribute("form", e.id), t.parentNode.insertBefore(i, t), e = new FormData(e), i.parentNode.removeChild(i), e;
  }
  function mw(e, t, i, l, u) {
    if (t === "submit" && i && i.stateNode === u) {
      var d = Ug(
        (u[pe] || null).action
      ), y = l.submitter;
      y && (t = (t = y[pe] || null) ? Ug(t.formAction) : y.getAttribute("formAction"), t !== null && (d = t, y = null));
      var E = new Ms(
        "action",
        "action",
        null,
        l,
        u
      );
      e.push({
        event: E,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (ri !== 0) {
                  var _ = y ? Vg(u, y) : new FormData(u);
                  _c(
                    i,
                    {
                      pending: !0,
                      data: _,
                      method: u.method,
                      action: d
                    },
                    null,
                    _
                  );
                }
              } else
                typeof d == "function" && (E.preventDefault(), _ = y ? Vg(u, y) : new FormData(u), _c(
                  i,
                  {
                    pending: !0,
                    data: _,
                    method: u.method,
                    action: d
                  },
                  d,
                  _
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var fd = 0; fd < Ku.length; fd++) {
    var hd = Ku[fd], pw = hd.toLowerCase(), gw = hd[0].toUpperCase() + hd.slice(1);
    Qn(
      pw,
      "on" + gw
    );
  }
  Qn(mm, "onAnimationEnd"), Qn(pm, "onAnimationIteration"), Qn(gm, "onAnimationStart"), Qn("dblclick", "onDoubleClick"), Qn("focusin", "onFocus"), Qn("focusout", "onBlur"), Qn(DS, "onTransitionRun"), Qn(zS, "onTransitionStart"), Qn(OS, "onTransitionCancel"), Qn(vm, "onTransitionEnd"), ra("onMouseEnter", ["mouseout", "mouseover"]), ra("onMouseLeave", ["mouseout", "mouseover"]), ra("onPointerEnter", ["pointerout", "pointerover"]), ra("onPointerLeave", ["pointerout", "pointerover"]), $t(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), $t(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), $t("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), $t(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), $t(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), $t(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Ol = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), vw = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ol)
  );
  function kg(e, t) {
    t = (t & 4) !== 0;
    for (var i = 0; i < e.length; i++) {
      var l = e[i], u = l.event;
      l = l.listeners;
      e: {
        var d = void 0;
        if (t)
          for (var y = l.length - 1; 0 <= y; y--) {
            var E = l[y], _ = E.instance, F = E.currentTarget;
            if (E = E.listener, _ !== d && u.isPropagationStopped())
              break e;
            d = E, u.currentTarget = F;
            try {
              d(u);
            } catch (J) {
              _s(J);
            }
            u.currentTarget = null, d = _;
          }
        else
          for (y = 0; y < l.length; y++) {
            if (E = l[y], _ = E.instance, F = E.currentTarget, E = E.listener, _ !== d && u.isPropagationStopped())
              break e;
            d = E, u.currentTarget = F;
            try {
              d(u);
            } catch (J) {
              _s(J);
            }
            u.currentTarget = null, d = _;
          }
      }
    }
  }
  function Ie(e, t) {
    var i = t[ge];
    i === void 0 && (i = t[ge] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    i.has(l) || (Bg(t, e, 2, !1), i.add(l));
  }
  function md(e, t, i) {
    var l = 0;
    t && (l |= 4), Bg(
      i,
      e,
      l,
      t
    );
  }
  var yo = "_reactListening" + Math.random().toString(36).slice(2);
  function pd(e) {
    if (!e[yo]) {
      e[yo] = !0, $a.forEach(function(i) {
        i !== "selectionchange" && (vw.has(i) || md(i, !1, e), md(i, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[yo] || (t[yo] = !0, md("selectionchange", !1, t));
    }
  }
  function Bg(e, t, i, l) {
    switch (mv(t)) {
      case 2:
        var u = Iw;
        break;
      case 8:
        u = Gw;
        break;
      default:
        u = Ad;
    }
    i = u.bind(
      null,
      t,
      i,
      e
    ), u = void 0, !Lu || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), l ? u !== void 0 ? e.addEventListener(t, i, {
      capture: !0,
      passive: u
    }) : e.addEventListener(t, i, !0) : u !== void 0 ? e.addEventListener(t, i, {
      passive: u
    }) : e.addEventListener(t, i, !1);
  }
  function gd(e, t, i, l, u) {
    var d = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var y = l.tag;
        if (y === 3 || y === 4) {
          var E = l.stateNode.containerInfo;
          if (E === u) break;
          if (y === 4)
            for (y = l.return; y !== null; ) {
              var _ = y.tag;
              if ((_ === 3 || _ === 4) && y.stateNode.containerInfo === u)
                return;
              y = y.return;
            }
          for (; E !== null; ) {
            if (y = it(E), y === null) return;
            if (_ = y.tag, _ === 5 || _ === 6 || _ === 26 || _ === 27) {
              l = d = y;
              continue e;
            }
            E = E.parentNode;
          }
        }
        l = l.return;
      }
    Fh(function() {
      var F = d, J = zu(i), ne = [];
      e: {
        var I = ym.get(e);
        if (I !== void 0) {
          var K = Ms, be = e;
          switch (e) {
            case "keypress":
              if (Cs(i) === 0) break e;
            case "keydown":
            case "keyup":
              K = cS;
              break;
            case "focusin":
              be = "focus", K = Bu;
              break;
            case "focusout":
              be = "blur", K = Bu;
              break;
            case "beforeblur":
            case "afterblur":
              K = Bu;
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
              K = Xh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              K = J1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              K = hS;
              break;
            case mm:
            case pm:
            case gm:
              K = tS;
              break;
            case vm:
              K = pS;
              break;
            case "scroll":
            case "scrollend":
              K = Z1;
              break;
            case "wheel":
              K = vS;
              break;
            case "copy":
            case "cut":
            case "paste":
              K = aS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              K = Qh;
              break;
            case "toggle":
            case "beforetoggle":
              K = bS;
          }
          var Re = (t & 4) !== 0, st = !Re && (e === "scroll" || e === "scrollend"), B = Re ? I !== null ? I + "Capture" : null : I;
          Re = [];
          for (var O = F, Y; O !== null; ) {
            var te = O;
            if (Y = te.stateNode, te = te.tag, te !== 5 && te !== 26 && te !== 27 || Y === null || B === null || (te = nl(O, B), te != null && Re.push(
              Ll(O, te, Y)
            )), st) break;
            O = O.return;
          }
          0 < Re.length && (I = new K(
            I,
            be,
            null,
            i,
            J
          ), ne.push({ event: I, listeners: Re }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (I = e === "mouseover" || e === "pointerover", K = e === "mouseout" || e === "pointerout", I && i !== Du && (be = i.relatedTarget || i.fromElement) && (it(be) || be[we]))
            break e;
          if ((K || I) && (I = J.window === J ? J : (I = J.ownerDocument) ? I.defaultView || I.parentWindow : window, K ? (be = i.relatedTarget || i.toElement, K = F, be = be ? it(be) : null, be !== null && (st = c(be), Re = be.tag, be !== st || Re !== 5 && Re !== 27 && Re !== 6) && (be = null)) : (K = null, be = F), K !== be)) {
            if (Re = Xh, te = "onMouseLeave", B = "onMouseEnter", O = "mouse", (e === "pointerout" || e === "pointerover") && (Re = Qh, te = "onPointerLeave", B = "onPointerEnter", O = "pointer"), st = K == null ? I : Ye(K), Y = be == null ? I : Ye(be), I = new Re(
              te,
              O + "leave",
              K,
              i,
              J
            ), I.target = st, I.relatedTarget = Y, te = null, it(J) === F && (Re = new Re(
              B,
              O + "enter",
              be,
              i,
              J
            ), Re.target = Y, Re.relatedTarget = st, te = Re), st = te, K && be)
              t: {
                for (Re = yw, B = K, O = be, Y = 0, te = B; te; te = Re(te))
                  Y++;
                te = 0;
                for (var Ce = O; Ce; Ce = Re(Ce))
                  te++;
                for (; 0 < Y - te; )
                  B = Re(B), Y--;
                for (; 0 < te - Y; )
                  O = Re(O), te--;
                for (; Y--; ) {
                  if (B === O || O !== null && B === O.alternate) {
                    Re = B;
                    break t;
                  }
                  B = Re(B), O = Re(O);
                }
                Re = null;
              }
            else Re = null;
            K !== null && Hg(
              ne,
              I,
              K,
              Re,
              !1
            ), be !== null && st !== null && Hg(
              ne,
              st,
              be,
              Re,
              !0
            );
          }
        }
        e: {
          if (I = F ? Ye(F) : window, K = I.nodeName && I.nodeName.toLowerCase(), K === "select" || K === "input" && I.type === "file")
            var Ze = am;
          else if (tm(I))
            if (im)
              Ze = RS;
            else {
              Ze = NS;
              var Ee = CS;
            }
          else
            K = I.nodeName, !K || K.toLowerCase() !== "input" || I.type !== "checkbox" && I.type !== "radio" ? F && _u(F.elementType) && (Ze = am) : Ze = MS;
          if (Ze && (Ze = Ze(e, F))) {
            nm(
              ne,
              Ze,
              i,
              J
            );
            break e;
          }
          Ee && Ee(e, I, F), e === "focusout" && F && I.type === "number" && F.memoizedProps.value != null && Au(I, "number", I.value);
        }
        switch (Ee = F ? Ye(F) : window, e) {
          case "focusin":
            (tm(Ee) || Ee.contentEditable === "true") && (ur = Ee, Iu = F, cl = null);
            break;
          case "focusout":
            cl = Iu = ur = null;
            break;
          case "mousedown":
            Gu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Gu = !1, fm(ne, i, J);
            break;
          case "selectionchange":
            if (_S) break;
          case "keydown":
          case "keyup":
            fm(ne, i, J);
        }
        var ke;
        if (qu)
          e: {
            switch (e) {
              case "compositionstart":
                var Xe = "onCompositionStart";
                break e;
              case "compositionend":
                Xe = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Xe = "onCompositionUpdate";
                break e;
            }
            Xe = void 0;
          }
        else
          or ? Wh(e, i) && (Xe = "onCompositionEnd") : e === "keydown" && i.keyCode === 229 && (Xe = "onCompositionStart");
        Xe && (Zh && i.locale !== "ko" && (or || Xe !== "onCompositionStart" ? Xe === "onCompositionEnd" && or && (ke = Ih()) : (Ya = J, Uu = "value" in Ya ? Ya.value : Ya.textContent, or = !0)), Ee = bo(F, Xe), 0 < Ee.length && (Xe = new Kh(
          Xe,
          e,
          null,
          i,
          J
        ), ne.push({ event: Xe, listeners: Ee }), ke ? Xe.data = ke : (ke = em(i), ke !== null && (Xe.data = ke)))), (ke = SS ? wS(e, i) : ES(e, i)) && (Xe = bo(F, "onBeforeInput"), 0 < Xe.length && (Ee = new Kh(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          J
        ), ne.push({
          event: Ee,
          listeners: Xe
        }), Ee.data = ke)), mw(
          ne,
          e,
          F,
          i,
          J
        );
      }
      kg(ne, t);
    });
  }
  function Ll(e, t, i) {
    return {
      instance: e,
      listener: t,
      currentTarget: i
    };
  }
  function bo(e, t) {
    for (var i = t + "Capture", l = []; e !== null; ) {
      var u = e, d = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || d === null || (u = nl(e, i), u != null && l.unshift(
        Ll(e, u, d)
      ), u = nl(e, t), u != null && l.push(
        Ll(e, u, d)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function yw(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Hg(e, t, i, l, u) {
    for (var d = t._reactName, y = []; i !== null && i !== l; ) {
      var E = i, _ = E.alternate, F = E.stateNode;
      if (E = E.tag, _ !== null && _ === l) break;
      E !== 5 && E !== 26 && E !== 27 || F === null || (_ = F, u ? (F = nl(i, d), F != null && y.unshift(
        Ll(i, F, _)
      )) : u || (F = nl(i, d), F != null && y.push(
        Ll(i, F, _)
      ))), i = i.return;
    }
    y.length !== 0 && e.push({ event: t, listeners: y });
  }
  var bw = /\r\n?/g, xw = /\u0000|\uFFFD/g;
  function qg(e) {
    return (typeof e == "string" ? e : "" + e).replace(bw, `
`).replace(xw, "");
  }
  function $g(e, t) {
    return t = qg(t), qg(e) === t;
  }
  function lt(e, t, i, l, u, d) {
    switch (i) {
      case "children":
        typeof l == "string" ? t === "body" || t === "textarea" && l === "" || rr(e, l) : (typeof l == "number" || typeof l == "bigint") && t !== "body" && rr(e, "" + l);
        break;
      case "className":
        jt(e, "class", l);
        break;
      case "tabIndex":
        jt(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        jt(e, i, l);
        break;
      case "style":
        $h(e, l, d);
        break;
      case "data":
        if (t !== "object") {
          jt(e, "data", l);
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
        l = js("" + l), e.setAttribute(i, l);
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
          typeof d == "function" && (i === "formAction" ? (t !== "input" && lt(e, t, "name", u.name, u, null), lt(
            e,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), lt(
            e,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), lt(
            e,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (lt(e, t, "encType", u.encType, u, null), lt(e, t, "method", u.method, u, null), lt(e, t, "target", u.target, u, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(i);
          break;
        }
        l = js("" + l), e.setAttribute(i, l);
        break;
      case "onClick":
        l != null && (e.onclick = va);
        break;
      case "onScroll":
        l != null && Ie("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Ie("scrollend", e);
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
        i = js("" + l), e.setAttributeNS(
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
        Ie("beforetoggle", e), Ie("toggle", e), qe(e, "popover", l);
        break;
      case "xlinkActuate":
        Jt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        Jt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        Jt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        Jt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        Jt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        Jt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        Jt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        Jt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        Jt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        qe(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = K1.get(i) || i, qe(e, i, l));
    }
  }
  function vd(e, t, i, l, u, d) {
    switch (i) {
      case "style":
        $h(e, l, d);
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
        typeof l == "string" ? rr(e, l) : (typeof l == "number" || typeof l == "bigint") && rr(e, "" + l);
        break;
      case "onScroll":
        l != null && Ie("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Ie("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = va);
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
        if (!Kn.hasOwnProperty(i))
          e: {
            if (i[0] === "o" && i[1] === "n" && (u = i.endsWith("Capture"), t = i.slice(2, u ? i.length - 7 : void 0), d = e[pe] || null, d = d != null ? d[i] : null, typeof d == "function" && e.removeEventListener(t, d, u), typeof l == "function")) {
              typeof d != "function" && d !== null && (i in e ? e[i] = null : e.hasAttribute(i) && e.removeAttribute(i)), e.addEventListener(t, l, u);
              break e;
            }
            i in e ? e[i] = l : l === !0 ? e.setAttribute(i, "") : qe(e, i, l);
          }
    }
  }
  function Zt(e, t, i) {
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
        Ie("error", e), Ie("load", e);
        var l = !1, u = !1, d;
        for (d in i)
          if (i.hasOwnProperty(d)) {
            var y = i[d];
            if (y != null)
              switch (d) {
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
                  lt(e, t, d, y, i, null);
              }
          }
        u && lt(e, t, "srcSet", i.srcSet, i, null), l && lt(e, t, "src", i.src, i, null);
        return;
      case "input":
        Ie("invalid", e);
        var E = d = y = u = null, _ = null, F = null;
        for (l in i)
          if (i.hasOwnProperty(l)) {
            var J = i[l];
            if (J != null)
              switch (l) {
                case "name":
                  u = J;
                  break;
                case "type":
                  y = J;
                  break;
                case "checked":
                  _ = J;
                  break;
                case "defaultChecked":
                  F = J;
                  break;
                case "value":
                  d = J;
                  break;
                case "defaultValue":
                  E = J;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (J != null)
                    throw Error(s(137, t));
                  break;
                default:
                  lt(e, t, l, J, i, null);
              }
          }
        kh(
          e,
          d,
          E,
          _,
          F,
          y,
          u,
          !1
        );
        return;
      case "select":
        Ie("invalid", e), l = y = d = null;
        for (u in i)
          if (i.hasOwnProperty(u) && (E = i[u], E != null))
            switch (u) {
              case "value":
                d = E;
                break;
              case "defaultValue":
                y = E;
                break;
              case "multiple":
                l = E;
              default:
                lt(e, t, u, E, i, null);
            }
        t = d, i = y, e.multiple = !!l, t != null ? ir(e, !!l, t, !1) : i != null && ir(e, !!l, i, !0);
        return;
      case "textarea":
        Ie("invalid", e), d = u = l = null;
        for (y in i)
          if (i.hasOwnProperty(y) && (E = i[y], E != null))
            switch (y) {
              case "value":
                l = E;
                break;
              case "defaultValue":
                u = E;
                break;
              case "children":
                d = E;
                break;
              case "dangerouslySetInnerHTML":
                if (E != null) throw Error(s(91));
                break;
              default:
                lt(e, t, y, E, i, null);
            }
        Hh(e, l, u, d);
        return;
      case "option":
        for (_ in i)
          if (i.hasOwnProperty(_) && (l = i[_], l != null))
            switch (_) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                lt(e, t, _, l, i, null);
            }
        return;
      case "dialog":
        Ie("beforetoggle", e), Ie("toggle", e), Ie("cancel", e), Ie("close", e);
        break;
      case "iframe":
      case "object":
        Ie("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Ol.length; l++)
          Ie(Ol[l], e);
        break;
      case "image":
        Ie("error", e), Ie("load", e);
        break;
      case "details":
        Ie("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Ie("error", e), Ie("load", e);
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
        for (F in i)
          if (i.hasOwnProperty(F) && (l = i[F], l != null))
            switch (F) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, t));
              default:
                lt(e, t, F, l, i, null);
            }
        return;
      default:
        if (_u(t)) {
          for (J in i)
            i.hasOwnProperty(J) && (l = i[J], l !== void 0 && vd(
              e,
              t,
              J,
              l,
              i,
              void 0
            ));
          return;
        }
    }
    for (E in i)
      i.hasOwnProperty(E) && (l = i[E], l != null && lt(e, t, E, l, i, null));
  }
  function Sw(e, t, i, l) {
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
        var u = null, d = null, y = null, E = null, _ = null, F = null, J = null;
        for (K in i) {
          var ne = i[K];
          if (i.hasOwnProperty(K) && ne != null)
            switch (K) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                _ = ne;
              default:
                l.hasOwnProperty(K) || lt(e, t, K, null, l, ne);
            }
        }
        for (var I in l) {
          var K = l[I];
          if (ne = i[I], l.hasOwnProperty(I) && (K != null || ne != null))
            switch (I) {
              case "type":
                d = K;
                break;
              case "name":
                u = K;
                break;
              case "checked":
                F = K;
                break;
              case "defaultChecked":
                J = K;
                break;
              case "value":
                y = K;
                break;
              case "defaultValue":
                E = K;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (K != null)
                  throw Error(s(137, t));
                break;
              default:
                K !== ne && lt(
                  e,
                  t,
                  I,
                  K,
                  l,
                  ne
                );
            }
        }
        Ru(
          e,
          y,
          E,
          _,
          F,
          J,
          d,
          u
        );
        return;
      case "select":
        K = y = E = I = null;
        for (d in i)
          if (_ = i[d], i.hasOwnProperty(d) && _ != null)
            switch (d) {
              case "value":
                break;
              case "multiple":
                K = _;
              default:
                l.hasOwnProperty(d) || lt(
                  e,
                  t,
                  d,
                  null,
                  l,
                  _
                );
            }
        for (u in l)
          if (d = l[u], _ = i[u], l.hasOwnProperty(u) && (d != null || _ != null))
            switch (u) {
              case "value":
                I = d;
                break;
              case "defaultValue":
                E = d;
                break;
              case "multiple":
                y = d;
              default:
                d !== _ && lt(
                  e,
                  t,
                  u,
                  d,
                  l,
                  _
                );
            }
        t = E, i = y, l = K, I != null ? ir(e, !!i, I, !1) : !!l != !!i && (t != null ? ir(e, !!i, t, !0) : ir(e, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        K = I = null;
        for (E in i)
          if (u = i[E], i.hasOwnProperty(E) && u != null && !l.hasOwnProperty(E))
            switch (E) {
              case "value":
                break;
              case "children":
                break;
              default:
                lt(e, t, E, null, l, u);
            }
        for (y in l)
          if (u = l[y], d = i[y], l.hasOwnProperty(y) && (u != null || d != null))
            switch (y) {
              case "value":
                I = u;
                break;
              case "defaultValue":
                K = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== d && lt(e, t, y, u, l, d);
            }
        Bh(e, I, K);
        return;
      case "option":
        for (var be in i)
          if (I = i[be], i.hasOwnProperty(be) && I != null && !l.hasOwnProperty(be))
            switch (be) {
              case "selected":
                e.selected = !1;
                break;
              default:
                lt(
                  e,
                  t,
                  be,
                  null,
                  l,
                  I
                );
            }
        for (_ in l)
          if (I = l[_], K = i[_], l.hasOwnProperty(_) && I !== K && (I != null || K != null))
            switch (_) {
              case "selected":
                e.selected = I && typeof I != "function" && typeof I != "symbol";
                break;
              default:
                lt(
                  e,
                  t,
                  _,
                  I,
                  l,
                  K
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
        for (var Re in i)
          I = i[Re], i.hasOwnProperty(Re) && I != null && !l.hasOwnProperty(Re) && lt(e, t, Re, null, l, I);
        for (F in l)
          if (I = l[F], K = i[F], l.hasOwnProperty(F) && I !== K && (I != null || K != null))
            switch (F) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (I != null)
                  throw Error(s(137, t));
                break;
              default:
                lt(
                  e,
                  t,
                  F,
                  I,
                  l,
                  K
                );
            }
        return;
      default:
        if (_u(t)) {
          for (var st in i)
            I = i[st], i.hasOwnProperty(st) && I !== void 0 && !l.hasOwnProperty(st) && vd(
              e,
              t,
              st,
              void 0,
              l,
              I
            );
          for (J in l)
            I = l[J], K = i[J], !l.hasOwnProperty(J) || I === K || I === void 0 && K === void 0 || vd(
              e,
              t,
              J,
              I,
              l,
              K
            );
          return;
        }
    }
    for (var B in i)
      I = i[B], i.hasOwnProperty(B) && I != null && !l.hasOwnProperty(B) && lt(e, t, B, null, l, I);
    for (ne in l)
      I = l[ne], K = i[ne], !l.hasOwnProperty(ne) || I === K || I == null && K == null || lt(e, t, ne, I, l, K);
  }
  function Yg(e) {
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
  function ww() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, i = performance.getEntriesByType("resource"), l = 0; l < i.length; l++) {
        var u = i[l], d = u.transferSize, y = u.initiatorType, E = u.duration;
        if (d && E && Yg(y)) {
          for (y = 0, E = u.responseEnd, l += 1; l < i.length; l++) {
            var _ = i[l], F = _.startTime;
            if (F > E) break;
            var J = _.transferSize, ne = _.initiatorType;
            J && Yg(ne) && (_ = _.responseEnd, y += J * (_ < E ? 1 : (E - F) / (_ - F)));
          }
          if (--l, t += 8 * (d + y) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var yd = null, bd = null;
  function xo(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Fg(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Ig(e, t) {
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
  function xd(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Sd = null;
  function Ew() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Sd ? !1 : (Sd = e, !0) : (Sd = null, !1);
  }
  var Gg = typeof setTimeout == "function" ? setTimeout : void 0, jw = typeof clearTimeout == "function" ? clearTimeout : void 0, Xg = typeof Promise == "function" ? Promise : void 0, Tw = typeof queueMicrotask == "function" ? queueMicrotask : typeof Xg < "u" ? function(e) {
    return Xg.resolve(null).then(e).catch(Cw);
  } : Gg;
  function Cw(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function li(e) {
    return e === "head";
  }
  function Kg(e, t) {
    var i = t, l = 0;
    do {
      var u = i.nextSibling;
      if (e.removeChild(i), u && u.nodeType === 8)
        if (i = u.data, i === "/$" || i === "/&") {
          if (l === 0) {
            e.removeChild(u), Ur(t);
            return;
          }
          l--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          l++;
        else if (i === "html")
          Ul(e.ownerDocument.documentElement);
        else if (i === "head") {
          i = e.ownerDocument.head, Ul(i);
          for (var d = i.firstChild; d; ) {
            var y = d.nextSibling, E = d.nodeName;
            d[He] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && d.rel.toLowerCase() === "stylesheet" || i.removeChild(d), d = y;
          }
        } else
          i === "body" && Ul(e.ownerDocument.body);
      i = u;
    } while (i);
    Ur(t);
  }
  function Qg(e, t) {
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
  function wd(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var i = t;
      switch (t = t.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          wd(i), ut(i);
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
  function Nw(e, t, i, l) {
    for (; e.nodeType === 1; ) {
      var u = i;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[He])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (d = e.getAttribute("rel"), d === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (d !== u.rel || e.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || e.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || e.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (d = e.getAttribute("src"), (d !== (u.src == null ? null : u.src) || e.getAttribute("type") !== (u.type == null ? null : u.type) || e.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && d && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var d = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && e.getAttribute("name") === d)
          return e;
      } else return e;
      if (e = kn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Mw(e, t, i) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !i || (e = kn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Zg(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = kn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Ed(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function jd(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Rw(e, t) {
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
  function kn(e) {
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
  var Td = null;
  function Pg(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data;
        if (i === "/$" || i === "/&") {
          if (t === 0)
            return kn(e.nextSibling);
          t--;
        } else
          i !== "$" && i !== "$!" && i !== "$?" && i !== "$~" && i !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Jg(e) {
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
  function Wg(e, t, i) {
    switch (t = xo(i), e) {
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
  function Ul(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    ut(e);
  }
  var Bn = /* @__PURE__ */ new Map(), ev = /* @__PURE__ */ new Set();
  function So(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var za = U.d;
  U.d = {
    f: Aw,
    r: _w,
    D: Dw,
    C: zw,
    L: Ow,
    m: Lw,
    X: Vw,
    S: Uw,
    M: kw
  };
  function Aw() {
    var e = za.f(), t = fo();
    return e || t;
  }
  function _w(e) {
    var t = yt(e);
    t !== null && t.tag === 5 && t.type === "form" ? vp(t) : za.r(e);
  }
  var zr = typeof document > "u" ? null : document;
  function tv(e, t, i) {
    var l = zr;
    if (l && typeof t == "string" && t) {
      var u = _n(t);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof i == "string" && (u += '[crossorigin="' + i + '"]'), ev.has(u) || (ev.add(u), e = { rel: e, crossOrigin: i, href: t }, l.querySelector(u) === null && (t = l.createElement("link"), Zt(t, "link", e), dt(t), l.head.appendChild(t)));
    }
  }
  function Dw(e) {
    za.D(e), tv("dns-prefetch", e, null);
  }
  function zw(e, t) {
    za.C(e, t), tv("preconnect", e, t);
  }
  function Ow(e, t, i) {
    za.L(e, t, i);
    var l = zr;
    if (l && e && t) {
      var u = 'link[rel="preload"][as="' + _n(t) + '"]';
      t === "image" && i && i.imageSrcSet ? (u += '[imagesrcset="' + _n(
        i.imageSrcSet
      ) + '"]', typeof i.imageSizes == "string" && (u += '[imagesizes="' + _n(
        i.imageSizes
      ) + '"]')) : u += '[href="' + _n(e) + '"]';
      var d = u;
      switch (t) {
        case "style":
          d = Or(e);
          break;
        case "script":
          d = Lr(e);
      }
      Bn.has(d) || (e = g(
        {
          rel: "preload",
          href: t === "image" && i && i.imageSrcSet ? void 0 : e,
          as: t
        },
        i
      ), Bn.set(d, e), l.querySelector(u) !== null || t === "style" && l.querySelector(Vl(d)) || t === "script" && l.querySelector(kl(d)) || (t = l.createElement("link"), Zt(t, "link", e), dt(t), l.head.appendChild(t)));
    }
  }
  function Lw(e, t) {
    za.m(e, t);
    var i = zr;
    if (i && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + _n(l) + '"][href="' + _n(e) + '"]', d = u;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          d = Lr(e);
      }
      if (!Bn.has(d) && (e = g({ rel: "modulepreload", href: e }, t), Bn.set(d, e), i.querySelector(u) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(kl(d)))
              return;
        }
        l = i.createElement("link"), Zt(l, "link", e), dt(l), i.head.appendChild(l);
      }
    }
  }
  function Uw(e, t, i) {
    za.S(e, t, i);
    var l = zr;
    if (l && e) {
      var u = At(l).hoistableStyles, d = Or(e);
      t = t || "default";
      var y = u.get(d);
      if (!y) {
        var E = { loading: 0, preload: null };
        if (y = l.querySelector(
          Vl(d)
        ))
          E.loading = 5;
        else {
          e = g(
            { rel: "stylesheet", href: e, "data-precedence": t },
            i
          ), (i = Bn.get(d)) && Cd(e, i);
          var _ = y = l.createElement("link");
          dt(_), Zt(_, "link", e), _._p = new Promise(function(F, J) {
            _.onload = F, _.onerror = J;
          }), _.addEventListener("load", function() {
            E.loading |= 1;
          }), _.addEventListener("error", function() {
            E.loading |= 2;
          }), E.loading |= 4, wo(y, t, l);
        }
        y = {
          type: "stylesheet",
          instance: y,
          count: 1,
          state: E
        }, u.set(d, y);
      }
    }
  }
  function Vw(e, t) {
    za.X(e, t);
    var i = zr;
    if (i && e) {
      var l = At(i).hoistableScripts, u = Lr(e), d = l.get(u);
      d || (d = i.querySelector(kl(u)), d || (e = g({ src: e, async: !0 }, t), (t = Bn.get(u)) && Nd(e, t), d = i.createElement("script"), dt(d), Zt(d, "link", e), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, l.set(u, d));
    }
  }
  function kw(e, t) {
    za.M(e, t);
    var i = zr;
    if (i && e) {
      var l = At(i).hoistableScripts, u = Lr(e), d = l.get(u);
      d || (d = i.querySelector(kl(u)), d || (e = g({ src: e, async: !0, type: "module" }, t), (t = Bn.get(u)) && Nd(e, t), d = i.createElement("script"), dt(d), Zt(d, "link", e), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, l.set(u, d));
    }
  }
  function nv(e, t, i, l) {
    var u = (u = ye.current) ? So(u) : null;
    if (!u) throw Error(s(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (t = Or(i.href), i = At(
          u
        ).hoistableStyles, l = i.get(t), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          e = Or(i.href);
          var d = At(
            u
          ).hoistableStyles, y = d.get(e);
          if (y || (u = u.ownerDocument || u, y = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, d.set(e, y), (d = u.querySelector(
            Vl(e)
          )) && !d._p && (y.instance = d, y.state.loading = 5), Bn.has(e) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, Bn.set(e, i), d || Bw(
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
        return t = i.async, i = i.src, typeof i == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Lr(i), i = At(
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
  function Or(e) {
    return 'href="' + _n(e) + '"';
  }
  function Vl(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function av(e) {
    return g({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Bw(e, t, i, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? l.loading = 1 : (t = e.createElement("link"), l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    }), Zt(t, "link", i), dt(t), e.head.appendChild(t));
  }
  function Lr(e) {
    return '[src="' + _n(e) + '"]';
  }
  function kl(e) {
    return "script[async]" + e;
  }
  function iv(e, t, i) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + _n(i.href) + '"]'
          );
          if (l)
            return t.instance = l, dt(l), l;
          var u = g({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), dt(l), Zt(l, "style", u), wo(l, i.precedence, e), t.instance = l;
        case "stylesheet":
          u = Or(i.href);
          var d = e.querySelector(
            Vl(u)
          );
          if (d)
            return t.state.loading |= 4, t.instance = d, dt(d), d;
          l = av(i), (u = Bn.get(u)) && Cd(l, u), d = (e.ownerDocument || e).createElement("link"), dt(d);
          var y = d;
          return y._p = new Promise(function(E, _) {
            y.onload = E, y.onerror = _;
          }), Zt(d, "link", l), t.state.loading |= 4, wo(d, i.precedence, e), t.instance = d;
        case "script":
          return d = Lr(i.src), (u = e.querySelector(
            kl(d)
          )) ? (t.instance = u, dt(u), u) : (l = i, (u = Bn.get(d)) && (l = g({}, i), Nd(l, u)), e = e.ownerDocument || e, u = e.createElement("script"), dt(u), Zt(u, "link", l), e.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(s(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, wo(l, i.precedence, e));
    return t.instance;
  }
  function wo(e, t, i) {
    for (var l = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = l.length ? l[l.length - 1] : null, d = u, y = 0; y < l.length; y++) {
      var E = l[y];
      if (E.dataset.precedence === t) d = E;
      else if (d !== u) break;
    }
    d ? d.parentNode.insertBefore(e, d.nextSibling) : (t = i.nodeType === 9 ? i.head : i, t.insertBefore(e, t.firstChild));
  }
  function Cd(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Nd(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Eo = null;
  function rv(e, t, i) {
    if (Eo === null) {
      var l = /* @__PURE__ */ new Map(), u = Eo = /* @__PURE__ */ new Map();
      u.set(i, l);
    } else
      u = Eo, l = u.get(i), l || (l = /* @__PURE__ */ new Map(), u.set(i, l));
    if (l.has(e)) return l;
    for (l.set(e, null), i = i.getElementsByTagName(e), u = 0; u < i.length; u++) {
      var d = i[u];
      if (!(d[He] || d[me] || e === "link" && d.getAttribute("rel") === "stylesheet") && d.namespaceURI !== "http://www.w3.org/2000/svg") {
        var y = d.getAttribute(t) || "";
        y = e + y;
        var E = l.get(y);
        E ? E.push(d) : l.set(y, [d]);
      }
    }
    return l;
  }
  function lv(e, t, i) {
    e = e.ownerDocument || e, e.head.insertBefore(
      i,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function Hw(e, t, i) {
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
  function sv(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function qw(e, t, i, l) {
    if (i.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var u = Or(l.href), d = t.querySelector(
          Vl(u)
        );
        if (d) {
          t = d._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = jo.bind(e), t.then(e, e)), i.state.loading |= 4, i.instance = d, dt(d);
          return;
        }
        d = t.ownerDocument || t, l = av(l), (u = Bn.get(u)) && Cd(l, u), d = d.createElement("link"), dt(d);
        var y = d;
        y._p = new Promise(function(E, _) {
          y.onload = E, y.onerror = _;
        }), Zt(d, "link", l), i.instance = d;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(i, t), (t = i.state.preload) && (i.state.loading & 3) === 0 && (e.count++, i = jo.bind(e), t.addEventListener("load", i), t.addEventListener("error", i));
    }
  }
  var Md = 0;
  function $w(e, t) {
    return e.stylesheets && e.count === 0 && Co(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(i) {
      var l = setTimeout(function() {
        if (e.stylesheets && Co(e, e.stylesheets), e.unsuspend) {
          var d = e.unsuspend;
          e.unsuspend = null, d();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Md === 0 && (Md = 62500 * ww());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Co(e, e.stylesheets), e.unsuspend)) {
            var d = e.unsuspend;
            e.unsuspend = null, d();
          }
        },
        (e.imgBytes > Md ? 50 : 800) + t
      );
      return e.unsuspend = i, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(u);
      };
    } : null;
  }
  function jo() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Co(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var To = null;
  function Co(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, To = /* @__PURE__ */ new Map(), t.forEach(Yw, e), To = null, jo.call(e));
  }
  function Yw(e, t) {
    if (!(t.state.loading & 4)) {
      var i = To.get(e);
      if (i) var l = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), To.set(e, i);
        for (var u = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), d = 0; d < u.length; d++) {
          var y = u[d];
          (y.nodeName === "LINK" || y.getAttribute("media") !== "not all") && (i.set(y.dataset.precedence, y), l = y);
        }
        l && i.set(null, l);
      }
      u = t.instance, y = u.getAttribute("data-precedence"), d = i.get(y) || l, d === l && i.set(null, u), i.set(y, u), this.count++, l = jo.bind(this), u.addEventListener("load", l), u.addEventListener("error", l), d ? d.parentNode.insertBefore(u, d.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(u, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Bl = {
    $$typeof: z,
    Provider: null,
    Consumer: null,
    _currentValue: q,
    _currentValue2: q,
    _threadCount: 0
  };
  function Fw(e, t, i, l, u, d, y, E, _) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = gn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = gn(0), this.hiddenUpdates = gn(null), this.identifierPrefix = l, this.onUncaughtError = u, this.onCaughtError = d, this.onRecoverableError = y, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = _, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function ov(e, t, i, l, u, d, y, E, _, F, J, ne) {
    return e = new Fw(
      e,
      t,
      i,
      y,
      _,
      F,
      J,
      ne,
      E
    ), t = 1, d === !0 && (t |= 24), d = yn(3, null, null, t), e.current = d, d.stateNode = e, t = sc(), t.refCount++, e.pooledCache = t, t.refCount++, d.memoizedState = {
      element: l,
      isDehydrated: i,
      cache: t
    }, dc(d), e;
  }
  function uv(e) {
    return e ? (e = fr, e) : fr;
  }
  function cv(e, t, i, l, u, d) {
    u = uv(u), l.context === null ? l.context = u : l.pendingContext = u, l = Qa(t), l.payload = { element: i }, d = d === void 0 ? null : d, d !== null && (l.callback = d), i = Za(e, l, t), i !== null && (hn(i, e, t), vl(i, e, t));
  }
  function dv(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var i = e.retryLane;
      e.retryLane = i !== 0 && i < t ? i : t;
    }
  }
  function Rd(e, t) {
    dv(e, t), (e = e.alternate) && dv(e, t);
  }
  function fv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = _i(e, 67108864);
      t !== null && hn(t, e, 67108864), Rd(e, 67108864);
    }
  }
  function hv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = En();
      t = V(t);
      var i = _i(e, t);
      i !== null && hn(i, e, t), Rd(e, t);
    }
  }
  var No = !0;
  function Iw(e, t, i, l) {
    var u = L.T;
    L.T = null;
    var d = U.p;
    try {
      U.p = 2, Ad(e, t, i, l);
    } finally {
      U.p = d, L.T = u;
    }
  }
  function Gw(e, t, i, l) {
    var u = L.T;
    L.T = null;
    var d = U.p;
    try {
      U.p = 8, Ad(e, t, i, l);
    } finally {
      U.p = d, L.T = u;
    }
  }
  function Ad(e, t, i, l) {
    if (No) {
      var u = _d(l);
      if (u === null)
        gd(
          e,
          t,
          l,
          Mo,
          i
        ), pv(e, l);
      else if (Kw(
        u,
        e,
        t,
        i,
        l
      ))
        l.stopPropagation();
      else if (pv(e, l), t & 4 && -1 < Xw.indexOf(e)) {
        for (; u !== null; ) {
          var d = yt(u);
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (d = d.stateNode, d.current.memoizedState.isDehydrated) {
                  var y = sn(d.pendingLanes);
                  if (y !== 0) {
                    var E = d;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; y; ) {
                      var _ = 1 << 31 - Bt(y);
                      E.entanglements[1] |= _, y &= ~_;
                    }
                    ca(d), (et & 6) === 0 && (uo = he() + 500, zl(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = _i(d, 2), E !== null && hn(E, d, 2), fo(), Rd(d, 2);
            }
          if (d = _d(l), d === null && gd(
            e,
            t,
            l,
            Mo,
            i
          ), d === u) break;
          u = d;
        }
        u !== null && l.stopPropagation();
      } else
        gd(
          e,
          t,
          l,
          null,
          i
        );
    }
  }
  function _d(e) {
    return e = zu(e), Dd(e);
  }
  var Mo = null;
  function Dd(e) {
    if (Mo = null, e = it(e), e !== null) {
      var t = c(e);
      if (t === null) e = null;
      else {
        var i = t.tag;
        if (i === 13) {
          if (e = h(t), e !== null) return e;
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
    return Mo = e, null;
  }
  function mv(e) {
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
        switch (Le()) {
          case Be:
            return 2;
          case ht:
            return 8;
          case nn:
          case an:
            return 32;
          case kt:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var zd = !1, si = null, oi = null, ui = null, Hl = /* @__PURE__ */ new Map(), ql = /* @__PURE__ */ new Map(), ci = [], Xw = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function pv(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        si = null;
        break;
      case "dragenter":
      case "dragleave":
        oi = null;
        break;
      case "mouseover":
      case "mouseout":
        ui = null;
        break;
      case "pointerover":
      case "pointerout":
        Hl.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        ql.delete(t.pointerId);
    }
  }
  function $l(e, t, i, l, u, d) {
    return e === null || e.nativeEvent !== d ? (e = {
      blockedOn: t,
      domEventName: i,
      eventSystemFlags: l,
      nativeEvent: d,
      targetContainers: [u]
    }, t !== null && (t = yt(t), t !== null && fv(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), e);
  }
  function Kw(e, t, i, l, u) {
    switch (t) {
      case "focusin":
        return si = $l(
          si,
          e,
          t,
          i,
          l,
          u
        ), !0;
      case "dragenter":
        return oi = $l(
          oi,
          e,
          t,
          i,
          l,
          u
        ), !0;
      case "mouseover":
        return ui = $l(
          ui,
          e,
          t,
          i,
          l,
          u
        ), !0;
      case "pointerover":
        var d = u.pointerId;
        return Hl.set(
          d,
          $l(
            Hl.get(d) || null,
            e,
            t,
            i,
            l,
            u
          )
        ), !0;
      case "gotpointercapture":
        return d = u.pointerId, ql.set(
          d,
          $l(
            ql.get(d) || null,
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
  function gv(e) {
    var t = it(e.target);
    if (t !== null) {
      var i = c(t);
      if (i !== null) {
        if (t = i.tag, t === 13) {
          if (t = h(i), t !== null) {
            e.blockedOn = t, ce(e.priority, function() {
              hv(i);
            });
            return;
          }
        } else if (t === 31) {
          if (t = m(i), t !== null) {
            e.blockedOn = t, ce(e.priority, function() {
              hv(i);
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
      var i = _d(e.nativeEvent);
      if (i === null) {
        i = e.nativeEvent;
        var l = new i.constructor(
          i.type,
          i
        );
        Du = l, i.target.dispatchEvent(l), Du = null;
      } else
        return t = yt(i), t !== null && fv(t), e.blockedOn = i, !1;
      t.shift();
    }
    return !0;
  }
  function vv(e, t, i) {
    Ro(e) && i.delete(t);
  }
  function Qw() {
    zd = !1, si !== null && Ro(si) && (si = null), oi !== null && Ro(oi) && (oi = null), ui !== null && Ro(ui) && (ui = null), Hl.forEach(vv), ql.forEach(vv);
  }
  function Ao(e, t) {
    e.blockedOn === t && (e.blockedOn = null, zd || (zd = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      Qw
    )));
  }
  var _o = null;
  function yv(e) {
    _o !== e && (_o = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        _o === e && (_o = null);
        for (var t = 0; t < e.length; t += 3) {
          var i = e[t], l = e[t + 1], u = e[t + 2];
          if (typeof l != "function") {
            if (Dd(l || i) === null)
              continue;
            break;
          }
          var d = yt(i);
          d !== null && (e.splice(t, 3), t -= 3, _c(
            d,
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
  function Ur(e) {
    function t(_) {
      return Ao(_, e);
    }
    si !== null && Ao(si, e), oi !== null && Ao(oi, e), ui !== null && Ao(ui, e), Hl.forEach(t), ql.forEach(t);
    for (var i = 0; i < ci.length; i++) {
      var l = ci[i];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < ci.length && (i = ci[0], i.blockedOn === null); )
      gv(i), i.blockedOn === null && ci.shift();
    if (i = (e.ownerDocument || e).$$reactFormReplay, i != null)
      for (l = 0; l < i.length; l += 3) {
        var u = i[l], d = i[l + 1], y = u[pe] || null;
        if (typeof d == "function")
          y || yv(i);
        else if (y) {
          var E = null;
          if (d && d.hasAttribute("formAction")) {
            if (u = d, y = d[pe] || null)
              E = y.formAction;
            else if (Dd(u) !== null) continue;
          } else E = y.action;
          typeof E == "function" ? i[l + 1] = E : (i.splice(l, 3), l -= 3), yv(i);
        }
      }
  }
  function bv() {
    function e(d) {
      d.canIntercept && d.info === "react-transition" && d.intercept({
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
        var d = navigation.currentEntry;
        d && d.url != null && navigation.navigate(d.url, {
          state: d.getState(),
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
  function Od(e) {
    this._internalRoot = e;
  }
  Do.prototype.render = Od.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var i = t.current, l = En();
    cv(i, l, e, t, null, null);
  }, Do.prototype.unmount = Od.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      cv(e.current, 2, null, e, null, null), fo(), t[we] = null;
    }
  };
  function Do(e) {
    this._internalRoot = e;
  }
  Do.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = re();
      e = { blockedOn: null, target: e, priority: t };
      for (var i = 0; i < ci.length && t !== 0 && t < ci[i].priority; i++) ;
      ci.splice(i, 0, e), i === 0 && gv(e);
    }
  };
  var xv = a.version;
  if (xv !== "19.2.5")
    throw Error(
      s(
        527,
        xv,
        "19.2.5"
      )
    );
  U.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = p(t), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var Zw = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: L,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var zo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!zo.isDisabled && zo.supportsFiber)
      try {
        Gn = zo.inject(
          Zw
        ), It = zo;
      } catch {
      }
  }
  return Fl.createRoot = function(e, t) {
    if (!o(e)) throw Error(s(299));
    var i = !1, l = "", u = Np, d = Mp, y = Rp;
    return t != null && (t.unstable_strictMode === !0 && (i = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (d = t.onCaughtError), t.onRecoverableError !== void 0 && (y = t.onRecoverableError)), t = ov(
      e,
      1,
      !1,
      null,
      null,
      i,
      l,
      null,
      u,
      d,
      y,
      bv
    ), e[we] = t.current, pd(e), new Od(t);
  }, Fl.hydrateRoot = function(e, t, i) {
    if (!o(e)) throw Error(s(299));
    var l = !1, u = "", d = Np, y = Mp, E = Rp, _ = null;
    return i != null && (i.unstable_strictMode === !0 && (l = !0), i.identifierPrefix !== void 0 && (u = i.identifierPrefix), i.onUncaughtError !== void 0 && (d = i.onUncaughtError), i.onCaughtError !== void 0 && (y = i.onCaughtError), i.onRecoverableError !== void 0 && (E = i.onRecoverableError), i.formState !== void 0 && (_ = i.formState)), t = ov(
      e,
      1,
      !0,
      t,
      i ?? null,
      l,
      u,
      _,
      d,
      y,
      E,
      bv
    ), t.context = uv(null), i = t.current, l = En(), l = V(l), u = Qa(l), u.callback = null, Za(i, u, l), i = l, t.current.lanes = i, at(t, i), ca(t), e[we] = t.current, pd(e), new Do(t);
  }, Fl.version = "19.2.5", Fl;
}
var Av;
function sE() {
  if (Av) return Vd.exports;
  Av = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Vd.exports = lE(), Vd.exports;
}
var oE = sE();
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
var fb = (n) => {
  throw TypeError(n);
}, uE = (n, a, r) => a.has(n) || fb("Cannot " + r), qd = (n, a, r) => (uE(n, a, "read from private field"), r ? r.call(n) : a.get(n)), cE = (n, a, r) => a.has(n) ? fb("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(n) : a.set(n, r);
function _v(n) {
  return typeof n == "object" && n != null && "pathname" in n && "search" in n && "hash" in n && "state" in n && "key" in n;
}
function dE(n = {}) {
  let { initialEntries: a = ["/"], initialIndex: r, v5Compat: s = !1 } = n, o;
  o = a.map(
    (w, j) => b(
      w,
      typeof w == "string" ? null : w.state,
      j === 0 ? "default" : void 0,
      typeof w == "string" ? void 0 : w.unstable_mask
    )
  );
  let c = v(
    r ?? o.length - 1
  ), h = "POP", m = null;
  function v(w) {
    return Math.min(Math.max(w, 0), o.length - 1);
  }
  function p() {
    return o[c];
  }
  function b(w, j = null, T, A) {
    let C = Sf(
      o ? p().pathname : "/",
      w,
      j,
      T,
      A
    );
    return Nt(
      C.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        w
      )}`
    ), C;
  }
  function g(w) {
    return typeof w == "string" ? w : fa(w);
  }
  return {
    get index() {
      return c;
    },
    get action() {
      return h;
    },
    get location() {
      return p();
    },
    createHref: g,
    createURL(w) {
      return new URL(g(w), "http://localhost");
    },
    encodeLocation(w) {
      let j = typeof w == "string" ? ea(w) : w;
      return {
        pathname: j.pathname || "",
        search: j.search || "",
        hash: j.hash || ""
      };
    },
    push(w, j) {
      h = "PUSH";
      let T = _v(w) ? w : b(w, j);
      c += 1, o.splice(c, o.length, T), s && m && m({ action: h, location: T, delta: 1 });
    },
    replace(w, j) {
      h = "REPLACE";
      let T = _v(w) ? w : b(w, j);
      o[c] = T, s && m && m({ action: h, location: T, delta: 0 });
    },
    go(w) {
      h = "POP";
      let j = v(c + w), T = o[j];
      c = j, m && m({ action: h, location: T, delta: w });
    },
    listen(w) {
      return m = w, () => {
        m = null;
      };
    }
  };
}
function $e(n, a) {
  if (n === !1 || n === null || typeof n > "u")
    throw new Error(a);
}
function Nt(n, a) {
  if (!n) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function fE() {
  return Math.random().toString(36).substring(2, 10);
}
function Sf(n, a, r = null, s, o) {
  return {
    pathname: typeof n == "string" ? n : n.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? ea(a) : a,
    state: r,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || s || fE(),
    unstable_mask: o
  };
}
function fa({
  pathname: n = "/",
  search: a = "",
  hash: r = ""
}) {
  return a && a !== "?" && (n += a.charAt(0) === "?" ? a : "?" + a), r && r !== "#" && (n += r.charAt(0) === "#" ? r : "#" + r), n;
}
function ea(n) {
  let a = {};
  if (n) {
    let r = n.indexOf("#");
    r >= 0 && (a.hash = n.substring(r), n = n.substring(0, r));
    let s = n.indexOf("?");
    s >= 0 && (a.search = n.substring(s), n = n.substring(0, s)), n && (a.pathname = n);
  }
  return a;
}
function hE(n, a = !1) {
  let r = "http://localhost";
  typeof window < "u" && (r = window.location.origin !== "null" ? window.location.origin : window.location.href), $e(r, "No window.location.(origin|href) available to create URL");
  let s = typeof n == "string" ? n : fa(n);
  return s = s.replace(/ $/, "%20"), !a && s.startsWith("//") && (s = r + s), new URL(s, r);
}
var Jl, Dv = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(n) {
    if (cE(this, Jl, /* @__PURE__ */ new Map()), n)
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
    if (qd(this, Jl).has(n))
      return qd(this, Jl).get(n);
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
    qd(this, Jl).set(n, a);
  }
};
Jl = /* @__PURE__ */ new WeakMap();
var mE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function pE(n) {
  return mE.has(
    n
  );
}
var gE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function vE(n) {
  return gE.has(
    n
  );
}
function yE(n) {
  return n.index === !0;
}
function rs(n, a, r = [], s = {}, o = !1) {
  return n.map((c, h) => {
    let m = [...r, String(h)], v = typeof c.id == "string" ? c.id : m.join("-");
    if ($e(
      c.index !== !0 || !c.children,
      "Cannot specify children on an index route"
    ), $e(
      o || !s[v],
      `Found a route id collision on id "${v}".  Route id's must be globally unique within Data Router usages`
    ), yE(c)) {
      let p = {
        ...c,
        id: v
      };
      return s[v] = zv(
        p,
        a(p)
      ), p;
    } else {
      let p = {
        ...c,
        id: v,
        children: void 0
      };
      return s[v] = zv(
        p,
        a(p)
      ), c.children && (p.children = rs(
        c.children,
        a,
        m,
        s,
        o
      )), p;
    }
  });
}
function zv(n, a) {
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
function gi(n, a, r = "/") {
  return Wl(n, a, r, !1);
}
function Wl(n, a, r, s) {
  let o = typeof a == "string" ? ea(a) : a, c = Fn(o.pathname || "/", r);
  if (c == null)
    return null;
  let h = hb(n);
  xE(h);
  let m = null;
  for (let v = 0; m == null && v < h.length; ++v) {
    let p = _E(c);
    m = RE(
      h[v],
      p,
      s
    );
  }
  return m;
}
function bE(n, a) {
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
function hb(n, a = [], r = [], s = "", o = !1) {
  let c = (h, m, v = o, p) => {
    let b = {
      relativePath: p === void 0 ? h.path || "" : p,
      caseSensitive: h.caseSensitive === !0,
      childrenIndex: m,
      route: h
    };
    if (b.relativePath.startsWith("/")) {
      if (!b.relativePath.startsWith(s) && v)
        return;
      $e(
        b.relativePath.startsWith(s),
        `Absolute route path "${b.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), b.relativePath = b.relativePath.slice(s.length);
    }
    let g = qn([s, b.relativePath]), S = r.concat(b);
    h.children && h.children.length > 0 && ($e(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      h.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${g}".`
    ), hb(
      h.children,
      a,
      S,
      g,
      v
    )), !(h.path == null && !h.index) && a.push({
      path: g,
      score: NE(g, h.index),
      routesMeta: S
    });
  };
  return n.forEach((h, m) => {
    if (h.path === "" || !h.path?.includes("?"))
      c(h, m);
    else
      for (let v of mb(h.path))
        c(h, m, !0, v);
  }), a;
}
function mb(n) {
  let a = n.split("/");
  if (a.length === 0) return [];
  let [r, ...s] = a, o = r.endsWith("?"), c = r.replace(/\?$/, "");
  if (s.length === 0)
    return o ? [c, ""] : [c];
  let h = mb(s.join("/")), m = [];
  return m.push(
    ...h.map(
      (v) => v === "" ? c : [c, v].join("/")
    )
  ), o && m.push(...h), m.map(
    (v) => n.startsWith("/") && v === "" ? "/" : v
  );
}
function xE(n) {
  n.sort(
    (a, r) => a.score !== r.score ? r.score - a.score : ME(
      a.routesMeta.map((s) => s.childrenIndex),
      r.routesMeta.map((s) => s.childrenIndex)
    )
  );
}
var SE = /^:[\w-]+$/, wE = 3, EE = 2, jE = 1, TE = 10, CE = -2, Ov = (n) => n === "*";
function NE(n, a) {
  let r = n.split("/"), s = r.length;
  return r.some(Ov) && (s += CE), a && (s += EE), r.filter((o) => !Ov(o)).reduce(
    (o, c) => o + (SE.test(c) ? wE : c === "" ? jE : TE),
    s
  );
}
function ME(n, a) {
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
function RE(n, a, r = !1) {
  let { routesMeta: s } = n, o = {}, c = "/", h = [];
  for (let m = 0; m < s.length; ++m) {
    let v = s[m], p = m === s.length - 1, b = c === "/" ? a : a.slice(c.length) || "/", g = au(
      { path: v.relativePath, caseSensitive: v.caseSensitive, end: p },
      b
    ), S = v.route;
    if (!g && p && r && !s[s.length - 1].route.index && (g = au(
      {
        path: v.relativePath,
        caseSensitive: v.caseSensitive,
        end: !1
      },
      b
    )), !g)
      return null;
    Object.assign(o, g.params), h.push({
      // TODO: Can this as be avoided?
      params: o,
      pathname: qn([c, g.pathname]),
      pathnameBase: OE(
        qn([c, g.pathnameBase])
      ),
      route: S
    }), g.pathnameBase !== "/" && (c = qn([c, g.pathnameBase]));
  }
  return h;
}
function au(n, a) {
  typeof n == "string" && (n = { path: n, caseSensitive: !1, end: !0 });
  let [r, s] = AE(
    n.path,
    n.caseSensitive,
    n.end
  ), o = a.match(r);
  if (!o) return null;
  let c = o[0], h = c.replace(/(.)\/+$/, "$1"), m = o.slice(1);
  return {
    params: s.reduce(
      (p, { paramName: b, isOptional: g }, S) => {
        if (b === "*") {
          let j = m[S] || "";
          h = c.slice(0, c.length - j.length).replace(/(.)\/+$/, "$1");
        }
        const w = m[S];
        return g && !w ? p[b] = void 0 : p[b] = (w || "").replace(/%2F/g, "/"), p;
      },
      {}
    ),
    pathname: c,
    pathnameBase: h,
    pattern: n
  };
}
function AE(n, a = !1, r = !0) {
  Nt(
    n === "*" || !n.endsWith("*") || n.endsWith("/*"),
    `Route path "${n}" will be treated as if it were "${n.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/, "/*")}".`
  );
  let s = [], o = "^" + n.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (h, m, v, p, b) => {
      if (s.push({ paramName: m, isOptional: v != null }), v) {
        let g = b.charAt(p + h.length);
        return g && g !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return n.endsWith("*") ? (s.push({ paramName: "*" }), o += n === "*" || n === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? o += "\\/*$" : n !== "" && n !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, a ? void 0 : "i"), s];
}
function _E(n) {
  try {
    return n.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return Nt(
      !1,
      `The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), n;
  }
}
function Fn(n, a) {
  if (a === "/") return n;
  if (!n.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let r = a.endsWith("/") ? a.length - 1 : a.length, s = n.charAt(r);
  return s && s !== "/" ? null : n.slice(r) || "/";
}
function DE({
  basename: n,
  pathname: a
}) {
  return a === "/" ? n : qn([n, a]);
}
var pb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Wf = (n) => pb.test(n);
function zE(n, a = "/") {
  let {
    pathname: r,
    search: s = "",
    hash: o = ""
  } = typeof n == "string" ? ea(n) : n, c;
  return r ? (r = th(r), r.startsWith("/") ? c = Lv(r.substring(1), "/") : c = Lv(r, a)) : c = a, {
    pathname: c,
    search: LE(s),
    hash: UE(o)
  };
}
function Lv(n, a) {
  let r = iu(a).split("/");
  return n.split("/").forEach((o) => {
    o === ".." ? r.length > 1 && r.pop() : o !== "." && r.push(o);
  }), r.length > 1 ? r.join("/") : "/";
}
function $d(n, a, r, s) {
  return `Cannot include a '${n}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    s
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function gb(n) {
  return n.filter(
    (a, r) => r === 0 || a.route.path && a.route.path.length > 0
  );
}
function eh(n) {
  let a = gb(n);
  return a.map(
    (r, s) => s === a.length - 1 ? r.pathname : r.pathnameBase
  );
}
function pu(n, a, r, s = !1) {
  let o;
  typeof n == "string" ? o = ea(n) : (o = { ...n }, $e(
    !o.pathname || !o.pathname.includes("?"),
    $d("?", "pathname", "search", o)
  ), $e(
    !o.pathname || !o.pathname.includes("#"),
    $d("#", "pathname", "hash", o)
  ), $e(
    !o.search || !o.search.includes("#"),
    $d("#", "search", "hash", o)
  ));
  let c = n === "" || o.pathname === "", h = c ? "/" : o.pathname, m;
  if (h == null)
    m = r;
  else {
    let g = a.length - 1;
    if (!s && h.startsWith("..")) {
      let S = h.split("/");
      for (; S[0] === ".."; )
        S.shift(), g -= 1;
      o.pathname = S.join("/");
    }
    m = g >= 0 ? a[g] : "/";
  }
  let v = zE(o, m), p = h && h !== "/" && h.endsWith("/"), b = (c || h === ".") && r.endsWith("/");
  return !v.pathname.endsWith("/") && (p || b) && (v.pathname += "/"), v;
}
var th = (n) => n.replace(/\/\/+/g, "/"), qn = (n) => th(n.join("/")), iu = (n) => n.replace(/\/+$/, ""), OE = (n) => iu(n).replace(/^\/*/, "/"), LE = (n) => !n || n === "?" ? "" : n.startsWith("?") ? n : "?" + n, UE = (n) => !n || n === "#" ? "" : n.startsWith("#") ? n : "#" + n, VE = (n, a = 302) => {
  let r = a;
  typeof r == "number" ? r = { status: r } : typeof r.status > "u" && (r.status = 302);
  let s = new Headers(r.headers);
  return s.set("Location", n), new Response(null, { ...r, headers: s });
}, gu = class {
  constructor(n, a, r, s = !1) {
    this.status = n, this.statusText = a || "", this.internal = s, r instanceof Error ? (this.data = r.toString(), this.error = r) : this.data = r;
  }
};
function ls(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.internal == "boolean" && "data" in n;
}
function fs(n) {
  let a = n.map((r) => r.route.path).filter(Boolean);
  return qn(a) || "/";
}
var vb = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function yb(n, a) {
  let r = n;
  if (typeof r != "string" || !pb.test(r))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: r
    };
  let s = r, o = !1;
  if (vb)
    try {
      let c = new URL(window.location.href), h = r.startsWith("//") ? new URL(c.protocol + r) : new URL(r), m = Fn(h.pathname, a);
      h.origin === c.origin && m != null ? r = m + h.search + h.hash : o = !0;
    } catch {
      Nt(
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
var yi = Symbol("Uninstrumented");
function kE(n, a) {
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
        let h = Object.keys(r);
        for (let m of h)
          c[m] && r[m].push(c[m]);
      }
    })
  );
  let s = {};
  if (typeof a.lazy == "function" && r.lazy.length > 0) {
    let o = qr(r.lazy, a.lazy, () => {
    });
    o && (s.lazy = o);
  }
  if (typeof a.lazy == "object") {
    let o = a.lazy;
    ["middleware", "loader", "action"].forEach((c) => {
      let h = o[c], m = r[`lazy.${c}`];
      if (typeof h == "function" && m.length > 0) {
        let v = qr(m, h, () => {
        });
        v && (s.lazy = Object.assign(s.lazy || {}, {
          [c]: v
        }));
      }
    });
  }
  return ["loader", "action"].forEach((o) => {
    let c = a[o];
    if (typeof c == "function" && r[o].length > 0) {
      let h = c[yi] ?? c, m = qr(
        r[o],
        h,
        (...v) => Uv(v[0])
      );
      m && (o === "loader" && h.hydrate === !0 && (m.hydrate = !0), m[yi] = h, s[o] = m);
    }
  }), a.middleware && a.middleware.length > 0 && r.middleware.length > 0 && (s.middleware = a.middleware.map((o) => {
    let c = o[yi] ?? o, h = qr(
      r.middleware,
      c,
      (...m) => Uv(m[0])
    );
    return h ? (h[yi] = c, h) : o;
  })), s;
}
function BE(n, a) {
  let r = {
    navigate: [],
    fetch: []
  };
  if (a.forEach(
    (s) => s({
      instrument(o) {
        let c = Object.keys(o);
        for (let h of c)
          o[h] && r[h].push(o[h]);
      }
    })
  ), r.navigate.length > 0) {
    let s = n.navigate[yi] ?? n.navigate, o = qr(
      r.navigate,
      s,
      (...c) => {
        let [h, m] = c;
        return {
          to: typeof h == "number" || typeof h == "string" ? h : h ? fa(h) : ".",
          ...Vv(n, m ?? {})
        };
      }
    );
    o && (o[yi] = s, n.navigate = o);
  }
  if (r.fetch.length > 0) {
    let s = n.fetch[yi] ?? n.fetch, o = qr(r.fetch, s, (...c) => {
      let [h, , m, v] = c;
      return {
        href: m ?? ".",
        fetcherKey: h,
        ...Vv(n, v ?? {})
      };
    });
    o && (o[yi] = s, n.fetch = o);
  }
  return n;
}
function qr(n, a, r) {
  return n.length === 0 ? null : async (...s) => {
    let o = await bb(
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
async function bb(n, a, r, s) {
  let o = n[s], c;
  if (o) {
    let h, m = async () => (h ? console.error("You cannot call instrumented handlers more than once") : h = bb(n, a, r, s - 1), c = await h, $e(c, "Expected a result"), c.type === "error" && c.value instanceof Error ? { status: "error", error: c.value } : { status: "success", error: void 0 });
    try {
      await o(m, a);
    } catch (v) {
      console.error("An instrumentation function threw an error:", v);
    }
    h || await m(), await h;
  } else
    try {
      c = { type: "success", value: await r() };
    } catch (h) {
      c = { type: "error", value: h };
    }
  return c || {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function Uv(n) {
  let { request: a, context: r, params: s, unstable_pattern: o } = n;
  return {
    request: HE(a),
    params: { ...s },
    unstable_pattern: o,
    context: qE(r)
  };
}
function Vv(n, a) {
  return {
    currentUrl: fa(n.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function HE(n) {
  return {
    method: n.method,
    url: n.url,
    headers: {
      get: (...a) => n.headers.get(...a)
    }
  };
}
function qE(n) {
  if (YE(n)) {
    let a = { ...n };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => n.get(a)
    };
}
var $E = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function YE(n) {
  if (n === null || typeof n != "object")
    return !1;
  const a = Object.getPrototypeOf(n);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === $E;
}
var xb = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], FE = new Set(
  xb
), IE = [
  "GET",
  ...xb
], GE = new Set(IE), Sb = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), XE = /* @__PURE__ */ new Set([307, 308]), Yd = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, KE = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Il = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, QE = (n) => ({
  hasErrorBoundary: !!n.hasErrorBoundary
}), wb = "remix-router-transitions", Eb = Symbol("ResetLoaderData");
function ZE(n) {
  const a = n.window ? n.window : typeof window < "u" ? window : void 0, r = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  $e(
    n.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let s = n.hydrationRouteProperties || [], o = n.mapRouteProperties || QE, c = o;
  if (n.unstable_instrumentations) {
    let M = n.unstable_instrumentations;
    c = (V) => ({
      ...o(V),
      ...kE(
        M.map(($) => $.route).filter(Boolean),
        V
      )
    });
  }
  let h = {}, m = rs(
    n.routes,
    c,
    void 0,
    h
  ), v, p = n.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let b = n.dataStrategy || tj, g = {
    unstable_passThroughRequests: !1,
    ...n.future
  }, S = null, w = /* @__PURE__ */ new Set(), j = null, T = null, A = null, C = n.hydrationData != null, D = gi(m, n.history.location, p), z = !1, k = null, W, G;
  if (D == null && !n.patchRoutesOnNavigation) {
    let M = Hn(404, {
      pathname: n.history.location.pathname
    }), { matches: V, route: $ } = Oo(m);
    W = !0, G = !W, D = V, k = { [$.id]: M };
  } else if (D && !n.hydrationData && gn(
    D,
    m,
    n.history.location.pathname
  ).active && (D = null), D)
    if (D.some((M) => M.route.lazy))
      W = !1, G = !W;
    else if (!D.some((M) => nh(M.route)))
      W = !0, G = !W;
    else {
      let M = n.hydrationData ? n.hydrationData.loaderData : null, V = n.hydrationData ? n.hydrationData.errors : null, $ = D;
      if (V) {
        let re = D.findIndex(
          (ce) => V[ce.route.id] !== void 0
        );
        $ = $.slice(0, re + 1);
      }
      G = !1, W = !0, $.forEach((re) => {
        let ce = jb(re.route, M, V);
        G = G || ce.renderFallback, W = W && !ce.shouldLoad;
      });
    }
  else {
    W = !1, G = !W, D = [];
    let M = gn(
      null,
      m,
      n.history.location.pathname
    );
    M.active && M.matches && (z = !0, D = M.matches);
  }
  let ee, R = {
    historyAction: n.history.action,
    location: n.history.location,
    matches: D,
    initialized: W,
    renderFallback: G,
    navigation: Yd,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: n.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: n.hydrationData && n.hydrationData.loaderData || {},
    actionData: n.hydrationData && n.hydrationData.actionData || null,
    errors: n.hydrationData && n.hydrationData.errors || k,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, H = "POP", Z = null, ue = !1, oe, ve = !1, je = /* @__PURE__ */ new Map(), le = null, L = !1, U = !1, q = /* @__PURE__ */ new Set(), Q = /* @__PURE__ */ new Map(), ae = 0, N = -1, X = /* @__PURE__ */ new Map(), P = /* @__PURE__ */ new Set(), ie = /* @__PURE__ */ new Map(), fe = /* @__PURE__ */ new Map(), ye = /* @__PURE__ */ new Set(), Me = /* @__PURE__ */ new Map(), Ae, se = null;
  function De() {
    if (S = n.history.listen(
      ({ action: M, location: V, delta: $ }) => {
        if (Ae) {
          Ae(), Ae = void 0;
          return;
        }
        Nt(
          Me.size === 0 || $ != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let re = ia({
          currentLocation: R.location,
          nextLocation: V,
          historyAction: M
        });
        if (re && $ != null) {
          let ce = new Promise((xe) => {
            Ae = xe;
          });
          n.history.go($ * -1), Xn(re, {
            state: "blocked",
            location: V,
            proceed() {
              Xn(re, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: V
              }), ce.then(() => n.history.go($));
            },
            reset() {
              let xe = new Map(R.blockers);
              xe.set(re, Il), We({ blockers: xe });
            }
          }), Z?.resolve(), Z = null;
          return;
        }
        return Ft(M, V);
      }
    ), r) {
      bj(a, je);
      let M = () => xj(a, je);
      a.addEventListener("pagehide", M), le = () => a.removeEventListener("pagehide", M);
    }
    return R.initialized || Ft("POP", R.location, {
      initialHydration: !0
    }), ee;
  }
  function Oe() {
    S && S(), le && le(), w.clear(), oe && oe.abort(), R.fetchers.forEach((M, V) => Gn(V)), R.blockers.forEach((M, V) => pa(V));
  }
  function _e(M) {
    return w.add(M), () => w.delete(M);
  }
  function We(M, V = {}) {
    M.matches && (M.matches = M.matches.map((ce) => {
      let xe = h[ce.route.id], me = ce.route;
      return me.element !== xe.element || me.errorElement !== xe.errorElement || me.hydrateFallbackElement !== xe.hydrateFallbackElement ? {
        ...ce,
        route: xe
      } : ce;
    })), R = {
      ...R,
      ...M
    };
    let $ = [], re = [];
    R.fetchers.forEach((ce, xe) => {
      ce.state === "idle" && (ye.has(xe) ? $.push(xe) : re.push(xe));
    }), ye.forEach((ce) => {
      !R.fetchers.has(ce) && !Q.has(ce) && $.push(ce);
    }), [...w].forEach(
      (ce) => ce(R, {
        deletedFetchers: $,
        newErrors: M.errors ?? null,
        viewTransitionOpts: V.viewTransitionOpts,
        flushSync: V.flushSync === !0
      })
    ), $.forEach((ce) => Gn(ce)), re.forEach((ce) => R.fetchers.delete(ce));
  }
  function ft(M, V, { flushSync: $ } = {}) {
    let re = R.actionData != null && R.navigation.formMethod != null && en(R.navigation.formMethod) && R.navigation.state === "loading" && M.state?._isRedirect !== !0, ce;
    V.actionData ? Object.keys(V.actionData).length > 0 ? ce = V.actionData : ce = null : re ? ce = R.actionData : ce = null;
    let xe = V.loaderData ? Kv(
      R.loaderData,
      V.loaderData,
      V.matches || [],
      V.errors
    ) : R.loaderData, me = R.blockers;
    me.size > 0 && (me = new Map(me), me.forEach((Ne, Te) => me.set(Te, Il)));
    let pe = L ? !1 : Ht(M, V.matches || R.matches), we = ue === !0 || R.navigation.formMethod != null && en(R.navigation.formMethod) && M.state?._isRedirect !== !0;
    v && (m = v, v = void 0), L || H === "POP" || (H === "PUSH" ? n.history.push(M, M.state) : H === "REPLACE" && n.history.replace(M, M.state));
    let ge;
    if (H === "POP") {
      let Ne = je.get(R.location.pathname);
      Ne && Ne.has(M.pathname) ? ge = {
        currentLocation: R.location,
        nextLocation: M
      } : je.has(M.pathname) && (ge = {
        currentLocation: M,
        nextLocation: R.location
      });
    } else if (ve) {
      let Ne = je.get(R.location.pathname);
      Ne ? Ne.add(M.pathname) : (Ne = /* @__PURE__ */ new Set([M.pathname]), je.set(R.location.pathname, Ne)), ge = {
        currentLocation: R.location,
        nextLocation: M
      };
    }
    We(
      {
        ...V,
        // matches, errors, fetchers go through as-is
        actionData: ce,
        loaderData: xe,
        historyAction: H,
        location: M,
        initialized: !0,
        renderFallback: !1,
        navigation: Yd,
        revalidation: "idle",
        restoreScrollPosition: pe,
        preventScrollReset: we,
        blockers: me
      },
      {
        viewTransitionOpts: ge,
        flushSync: $ === !0
      }
    ), H = "POP", ue = !1, ve = !1, L = !1, U = !1, Z?.resolve(), Z = null, se?.resolve(), se = null;
  }
  async function Mn(M, V) {
    if (Z?.resolve(), Z = null, typeof M == "number") {
      Z || (Z = Jv());
      let ut = Z.promise;
      return n.history.go(M), ut;
    }
    let $ = wf(
      R.location,
      R.matches,
      p,
      M,
      V?.fromRouteId,
      V?.relative
    ), { path: re, submission: ce, error: xe } = kv(
      !1,
      $,
      V
    ), me;
    V?.unstable_mask && (me = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof V.unstable_mask == "string" ? ea(V.unstable_mask) : {
        ...R.location.unstable_mask,
        ...V.unstable_mask
      }
    });
    let pe = R.location, we = Sf(
      pe,
      re,
      V && V.state,
      void 0,
      me
    );
    we = {
      ...we,
      ...n.history.encodeLocation(we)
    };
    let ge = V && V.replace != null ? V.replace : void 0, Ne = "PUSH";
    ge === !0 ? Ne = "REPLACE" : ge === !1 || ce != null && en(ce.formMethod) && ce.formAction === R.location.pathname + R.location.search && (Ne = "REPLACE");
    let Te = V && "preventScrollReset" in V ? V.preventScrollReset === !0 : void 0, Qe = (V && V.flushSync) === !0, He = ia({
      currentLocation: pe,
      nextLocation: we,
      historyAction: Ne
    });
    if (He) {
      Xn(He, {
        state: "blocked",
        location: we,
        proceed() {
          Xn(He, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: we
          }), Mn(M, V);
        },
        reset() {
          let ut = new Map(R.blockers);
          ut.set(He, Il), We({ blockers: ut });
        }
      });
      return;
    }
    await Ft(Ne, we, {
      submission: ce,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: xe,
      preventScrollReset: Te,
      replace: V && V.replace,
      enableViewTransition: V && V.viewTransition,
      flushSync: Qe,
      callSiteDefaultShouldRevalidate: V && V.unstable_defaultShouldRevalidate
    });
  }
  function ta() {
    se || (se = Jv()), nn(), We({ revalidation: "loading" });
    let M = se.promise;
    return R.navigation.state === "submitting" ? M : R.navigation.state === "idle" ? (Ft(R.historyAction, R.location, {
      startUninterruptedRevalidation: !0
    }), M) : (Ft(
      H || R.historyAction,
      R.navigation.location,
      {
        overrideNavigation: R.navigation,
        // Proxy through any rending view transition
        enableViewTransition: ve === !0
      }
    ), M);
  }
  async function Ft(M, V, $) {
    oe && oe.abort(), oe = null, H = M, L = ($ && $.startUninterruptedRevalidation) === !0, Rt(R.location, R.matches), ue = ($ && $.preventScrollReset) === !0, ve = ($ && $.enableViewTransition) === !0;
    let re = v || m, ce = $ && $.overrideNavigation, xe = $?.initialHydration && R.matches && R.matches.length > 0 && !z ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      R.matches
    ) : gi(re, V, p), me = ($ && $.flushSync) === !0;
    if (xe && R.initialized && !U && uj(R.location, V) && !($ && $.submission && en($.submission.formMethod))) {
      ft(V, { matches: xe }, { flushSync: me });
      return;
    }
    let pe = gn(xe, re, V.pathname);
    if (pe.active && pe.matches && (xe = pe.matches), !xe) {
      let { error: it, notFoundMatches: yt, route: Ye } = sn(
        V.pathname
      );
      ft(
        V,
        {
          matches: yt,
          loaderData: {},
          errors: {
            [Ye.id]: it
          }
        },
        { flushSync: me }
      );
      return;
    }
    oe = new AbortController();
    let we = Hr(
      n.history,
      V,
      oe.signal,
      $ && $.submission
    ), ge = n.getContext ? await n.getContext() : new Dv(), Ne;
    if ($ && $.pendingError)
      Ne = [
        vi(xe).route.id,
        { type: "error", error: $.pendingError }
      ];
    else if ($ && $.submission && en($.submission.formMethod)) {
      let it = await ha(
        we,
        V,
        $.submission,
        xe,
        ge,
        pe.active,
        $ && $.initialHydration === !0,
        { replace: $.replace, flushSync: me }
      );
      if (it.shortCircuited)
        return;
      if (it.pendingActionResult) {
        let [yt, Ye] = it.pendingActionResult;
        if (jn(Ye) && ls(Ye.error) && Ye.error.status === 404) {
          oe = null, ft(V, {
            matches: it.matches,
            loaderData: {},
            errors: {
              [yt]: Ye.error
            }
          });
          return;
        }
      }
      xe = it.matches || xe, Ne = it.pendingActionResult, ce = Fd(V, $.submission), me = !1, pe.active = !1, we = Hr(
        n.history,
        we.url,
        we.signal
      );
    }
    let {
      shortCircuited: Te,
      matches: Qe,
      loaderData: He,
      errors: ut
    } = await Mt(
      we,
      V,
      xe,
      ge,
      pe.active,
      ce,
      $ && $.submission,
      $ && $.fetcherSubmission,
      $ && $.replace,
      $ && $.initialHydration === !0,
      me,
      Ne,
      $ && $.callSiteDefaultShouldRevalidate
    );
    Te || (oe = null, ft(V, {
      matches: Qe || xe,
      ...Qv(Ne),
      loaderData: He,
      errors: ut
    }));
  }
  async function ha(M, V, $, re, ce, xe, me, pe = {}) {
    nn();
    let we = vj(V, $);
    if (We({ navigation: we }, { flushSync: pe.flushSync === !0 }), xe) {
      let Te = await at(
        re,
        V.pathname,
        M.signal
      );
      if (Te.type === "aborted")
        return { shortCircuited: !0 };
      if (Te.type === "error") {
        if (Te.partialMatches.length === 0) {
          let { matches: He, route: ut } = Oo(m);
          return {
            matches: He,
            pendingActionResult: [
              ut.id,
              {
                type: "error",
                error: Te.error
              }
            ]
          };
        }
        let Qe = vi(Te.partialMatches).route.id;
        return {
          matches: Te.partialMatches,
          pendingActionResult: [
            Qe,
            {
              type: "error",
              error: Te.error
            }
          ]
        };
      } else if (Te.matches)
        re = Te.matches;
      else {
        let { notFoundMatches: Qe, error: He, route: ut } = sn(
          V.pathname
        );
        return {
          matches: Qe,
          pendingActionResult: [
            ut.id,
            {
              type: "error",
              error: He
            }
          ]
        };
      }
    }
    let ge, Ne = Zo(re, V);
    if (!Ne.route.action && !Ne.route.lazy)
      ge = {
        type: "error",
        error: Hn(405, {
          method: M.method,
          pathname: V.pathname,
          routeId: Ne.route.id
        })
      };
    else {
      let Te = Fr(
        c,
        h,
        M,
        V,
        re,
        Ne,
        me ? [] : s,
        ce
      ), Qe = await Be(
        M,
        V,
        Te,
        ce,
        null
      );
      if (ge = Qe[Ne.route.id], !ge) {
        for (let He of re)
          if (Qe[He.route.id]) {
            ge = Qe[He.route.id];
            break;
          }
      }
      if (M.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Xi(ge)) {
      let Te;
      return pe && pe.replace != null ? Te = pe.replace : Te = Iv(
        ge.response.headers.get("Location"),
        new URL(M.url),
        p,
        n.history
      ) === R.location.pathname + R.location.search, await Le(M, ge, !0, {
        submission: $,
        replace: Te
      }), { shortCircuited: !0 };
    }
    if (jn(ge)) {
      let Te = vi(re, Ne.route.id);
      return (pe && pe.replace) !== !0 && (H = "PUSH"), {
        matches: re,
        pendingActionResult: [
          Te.route.id,
          ge,
          Ne.route.id
        ]
      };
    }
    return {
      matches: re,
      pendingActionResult: [Ne.route.id, ge]
    };
  }
  async function Mt(M, V, $, re, ce, xe, me, pe, we, ge, Ne, Te, Qe) {
    let He = xe || Fd(V, me), ut = me || pe || Pv(He), it = !L && !ge;
    if (ce) {
      if (it) {
        let jt = na(Te);
        We(
          {
            navigation: He,
            ...jt !== void 0 ? { actionData: jt } : {}
          },
          {
            flushSync: Ne
          }
        );
      }
      let qe = await at(
        $,
        V.pathname,
        M.signal
      );
      if (qe.type === "aborted")
        return { shortCircuited: !0 };
      if (qe.type === "error") {
        if (qe.partialMatches.length === 0) {
          let { matches: Jt, route: _t } = Oo(m);
          return {
            matches: Jt,
            loaderData: {},
            errors: {
              [_t.id]: qe.error
            }
          };
        }
        let jt = vi(qe.partialMatches).route.id;
        return {
          matches: qe.partialMatches,
          loaderData: {},
          errors: {
            [jt]: qe.error
          }
        };
      } else if (qe.matches)
        $ = qe.matches;
      else {
        let { error: jt, notFoundMatches: Jt, route: _t } = sn(
          V.pathname
        );
        return {
          matches: Jt,
          loaderData: {},
          errors: {
            [_t.id]: jt
          }
        };
      }
    }
    let yt = v || m, { dsMatches: Ye, revalidatingFetchers: At } = Bv(
      M,
      re,
      c,
      h,
      n.history,
      R,
      $,
      ut,
      V,
      ge ? [] : s,
      ge === !0,
      U,
      q,
      ye,
      ie,
      P,
      yt,
      p,
      n.patchRoutesOnNavigation != null,
      Te,
      Qe
    );
    if (N = ++ae, !n.dataStrategy && !Ye.some((qe) => qe.shouldLoad) && !Ye.some(
      (qe) => qe.route.middleware && qe.route.middleware.length > 0
    ) && At.length === 0) {
      let qe = er();
      return ft(
        V,
        {
          matches: $,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Te && jn(Te[1]) ? { [Te[0]]: Te[1].error } : null,
          ...Qv(Te),
          ...qe ? { fetchers: new Map(R.fetchers) } : {}
        },
        { flushSync: Ne }
      ), { shortCircuited: !0 };
    }
    if (it) {
      let qe = {};
      if (!ce) {
        qe.navigation = He;
        let jt = na(Te);
        jt !== void 0 && (qe.actionData = jt);
      }
      At.length > 0 && (qe.fetchers = ma(At)), We(qe, { flushSync: Ne });
    }
    At.forEach((qe) => {
      Et(qe.key), qe.controller && Q.set(qe.key, qe.controller);
    });
    let dt = () => At.forEach((qe) => Et(qe.key));
    oe && oe.signal.addEventListener(
      "abort",
      dt
    );
    let { loaderResults: $a, fetcherResults: Kn } = await ht(
      Ye,
      At,
      M,
      V,
      re
    );
    if (M.signal.aborted)
      return { shortCircuited: !0 };
    oe && oe.signal.removeEventListener(
      "abort",
      dt
    ), At.forEach((qe) => Q.delete(qe.key));
    let $t = Lo($a);
    if ($t)
      return await Le(M, $t.result, !0, {
        replace: we
      }), { shortCircuited: !0 };
    if ($t = Lo(Kn), $t)
      return P.add($t.key), await Le(M, $t.result, !0, {
        replace: we
      }), { shortCircuited: !0 };
    let { loaderData: ra, errors: Ci } = Xv(
      R,
      $,
      $a,
      Te,
      At,
      Kn
    );
    ge && R.errors && (Ci = { ...R.errors, ...Ci });
    let la = er(), Ni = qa(N), tr = la || Ni || At.length > 0;
    return {
      matches: $,
      loaderData: ra,
      errors: Ci,
      ...tr ? { fetchers: new Map(R.fetchers) } : {}
    };
  }
  function na(M) {
    if (M && !jn(M[1]))
      return {
        [M[0]]: M[1].data
      };
    if (R.actionData)
      return Object.keys(R.actionData).length === 0 ? null : R.actionData;
  }
  function ma(M) {
    return M.forEach((V) => {
      let $ = R.fetchers.get(V.key), re = Gl(
        void 0,
        $ ? $.data : void 0
      );
      R.fetchers.set(V.key, re);
    }), new Map(R.fetchers);
  }
  async function Vt(M, V, $, re) {
    Et(M);
    let ce = (re && re.flushSync) === !0, xe = v || m, me = wf(
      R.location,
      R.matches,
      p,
      $,
      V,
      re?.relative
    ), pe = gi(xe, me, p), we = gn(pe, xe, me);
    if (we.active && we.matches && (pe = we.matches), !pe) {
      kt(
        M,
        V,
        Hn(404, { pathname: me }),
        { flushSync: ce }
      );
      return;
    }
    let { path: ge, submission: Ne, error: Te } = kv(
      !0,
      me,
      re
    );
    if (Te) {
      kt(M, V, Te, { flushSync: ce });
      return;
    }
    let Qe = n.getContext ? await n.getContext() : new Dv(), He = (re && re.preventScrollReset) === !0;
    if (Ne && en(Ne.formMethod)) {
      await Rn(
        M,
        V,
        ge,
        pe,
        Qe,
        we.active,
        ce,
        He,
        Ne,
        re && re.unstable_defaultShouldRevalidate
      );
      return;
    }
    ie.set(M, { routeId: V, path: ge }), await he(
      M,
      V,
      ge,
      pe,
      Qe,
      we.active,
      ce,
      He,
      Ne
    );
  }
  async function Rn(M, V, $, re, ce, xe, me, pe, we, ge) {
    nn(), ie.delete(M);
    let Ne = R.fetchers.get(M);
    an(M, yj(we, Ne), {
      flushSync: me
    });
    let Te = new AbortController(), Qe = Hr(
      n.history,
      $,
      Te.signal,
      we
    );
    if (xe) {
      let mt = await at(
        re,
        new URL(Qe.url).pathname,
        Qe.signal,
        M
      );
      if (mt.type === "aborted")
        return;
      if (mt.type === "error") {
        kt(M, V, mt.error, { flushSync: me });
        return;
      } else if (mt.matches)
        re = mt.matches;
      else {
        kt(
          M,
          V,
          Hn(404, { pathname: $ }),
          { flushSync: me }
        );
        return;
      }
    }
    let He = Zo(re, $);
    if (!He.route.action && !He.route.lazy) {
      let mt = Hn(405, {
        method: we.formMethod,
        pathname: $,
        routeId: V
      });
      kt(M, V, mt, { flushSync: me });
      return;
    }
    Q.set(M, Te);
    let ut = ae, it = Fr(
      c,
      h,
      Qe,
      $,
      re,
      He,
      s,
      ce
    ), yt = await Be(
      Qe,
      $,
      it,
      ce,
      M
    ), Ye = yt[He.route.id];
    if (!Ye) {
      for (let mt of it)
        if (yt[mt.route.id]) {
          Ye = yt[mt.route.id];
          break;
        }
    }
    if (Qe.signal.aborted) {
      Q.get(M) === Te && Q.delete(M);
      return;
    }
    if (ye.has(M)) {
      if (Xi(Ye) || jn(Ye)) {
        an(M, La(void 0));
        return;
      }
    } else {
      if (Xi(Ye))
        if (Q.delete(M), N > ut) {
          an(M, La(void 0));
          return;
        } else
          return P.add(M), an(M, Gl(we)), Le(Qe, Ye, !1, {
            fetcherSubmission: we,
            preventScrollReset: pe
          });
      if (jn(Ye)) {
        kt(M, V, Ye.error);
        return;
      }
    }
    let At = R.navigation.location || R.location, dt = Hr(
      n.history,
      At,
      Te.signal
    ), $a = v || m, Kn = R.navigation.state !== "idle" ? gi($a, R.navigation.location, p) : R.matches;
    $e(Kn, "Didn't find any matches after fetcher action");
    let $t = ++ae;
    X.set(M, $t);
    let ra = Gl(we, Ye.data);
    R.fetchers.set(M, ra);
    let { dsMatches: Ci, revalidatingFetchers: la } = Bv(
      dt,
      ce,
      c,
      h,
      n.history,
      R,
      Kn,
      we,
      At,
      s,
      !1,
      U,
      q,
      ye,
      ie,
      P,
      $a,
      p,
      n.patchRoutesOnNavigation != null,
      [He.route.id, Ye],
      ge
    );
    la.filter((mt) => mt.key !== M).forEach((mt) => {
      let nr = mt.key, ar = R.fetchers.get(nr), ws = Gl(
        void 0,
        ar ? ar.data : void 0
      );
      R.fetchers.set(nr, ws), Et(nr), mt.controller && Q.set(nr, mt.controller);
    }), We({ fetchers: new Map(R.fetchers) });
    let Ni = () => la.forEach((mt) => Et(mt.key));
    Te.signal.addEventListener(
      "abort",
      Ni
    );
    let { loaderResults: tr, fetcherResults: qe } = await ht(
      Ci,
      la,
      dt,
      At,
      ce
    );
    if (Te.signal.aborted)
      return;
    if (Te.signal.removeEventListener(
      "abort",
      Ni
    ), X.delete(M), Q.delete(M), la.forEach((mt) => Q.delete(mt.key)), R.fetchers.has(M)) {
      let mt = La(Ye.data);
      R.fetchers.set(M, mt);
    }
    let jt = Lo(tr);
    if (jt)
      return Le(
        dt,
        jt.result,
        !1,
        { preventScrollReset: pe }
      );
    if (jt = Lo(qe), jt)
      return P.add(jt.key), Le(
        dt,
        jt.result,
        !1,
        { preventScrollReset: pe }
      );
    let { loaderData: Jt, errors: _t } = Xv(
      R,
      Kn,
      tr,
      void 0,
      la,
      qe
    );
    qa($t), R.navigation.state === "loading" && $t > N ? ($e(H, "Expected pending action"), oe && oe.abort(), ft(R.navigation.location, {
      matches: Kn,
      loaderData: Jt,
      errors: _t,
      fetchers: new Map(R.fetchers)
    })) : (We({
      errors: _t,
      loaderData: Kv(
        R.loaderData,
        Jt,
        Kn,
        _t
      ),
      fetchers: new Map(R.fetchers)
    }), U = !1);
  }
  async function he(M, V, $, re, ce, xe, me, pe, we) {
    let ge = R.fetchers.get(M);
    an(
      M,
      Gl(
        we,
        ge ? ge.data : void 0
      ),
      { flushSync: me }
    );
    let Ne = new AbortController(), Te = Hr(
      n.history,
      $,
      Ne.signal
    );
    if (xe) {
      let Ye = await at(
        re,
        new URL(Te.url).pathname,
        Te.signal,
        M
      );
      if (Ye.type === "aborted")
        return;
      if (Ye.type === "error") {
        kt(M, V, Ye.error, { flushSync: me });
        return;
      } else if (Ye.matches)
        re = Ye.matches;
      else {
        kt(
          M,
          V,
          Hn(404, { pathname: $ }),
          { flushSync: me }
        );
        return;
      }
    }
    let Qe = Zo(re, $);
    Q.set(M, Ne);
    let He = ae, ut = Fr(
      c,
      h,
      Te,
      $,
      re,
      Qe,
      s,
      ce
    ), it = await Be(
      Te,
      $,
      ut,
      ce,
      M
    ), yt = it[Qe.route.id];
    if (!yt) {
      for (let Ye of re)
        if (it[Ye.route.id]) {
          yt = it[Ye.route.id];
          break;
        }
    }
    if (Q.get(M) === Ne && Q.delete(M), !Te.signal.aborted) {
      if (ye.has(M)) {
        an(M, La(void 0));
        return;
      }
      if (Xi(yt))
        if (N > He) {
          an(M, La(void 0));
          return;
        } else {
          P.add(M), await Le(Te, yt, !1, {
            preventScrollReset: pe
          });
          return;
        }
      if (jn(yt)) {
        kt(M, V, yt.error);
        return;
      }
      an(M, La(yt.data));
    }
  }
  async function Le(M, V, $, {
    submission: re,
    fetcherSubmission: ce,
    preventScrollReset: xe,
    replace: me
  } = {}) {
    $ || (Z?.resolve(), Z = null), V.response.headers.has("X-Remix-Revalidate") && (U = !0);
    let pe = V.response.headers.get("Location");
    $e(pe, "Expected a Location header on the redirect Response"), pe = Iv(
      pe,
      new URL(M.url),
      p,
      n.history
    );
    let we = Sf(R.location, pe, {
      _isRedirect: !0
    });
    if (r) {
      let ut = !1;
      if (V.response.headers.has("X-Remix-Reload-Document"))
        ut = !0;
      else if (Wf(pe)) {
        const it = hE(pe, !0);
        ut = // Hard reload if it's an absolute URL to a new origin
        it.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        Fn(it.pathname, p) == null;
      }
      if (ut) {
        me ? a.location.replace(pe) : a.location.assign(pe);
        return;
      }
    }
    oe = null;
    let ge = me === !0 || V.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Ne, formAction: Te, formEncType: Qe } = R.navigation;
    !re && !ce && Ne && Te && Qe && (re = Pv(R.navigation));
    let He = re || ce;
    if (XE.has(V.response.status) && He && en(He.formMethod))
      await Ft(ge, we, {
        submission: {
          ...He,
          formAction: pe
        },
        // Preserve these flags across redirects
        preventScrollReset: xe || ue,
        enableViewTransition: $ ? ve : void 0
      });
    else {
      let ut = Fd(
        we,
        re
      );
      await Ft(ge, we, {
        overrideNavigation: ut,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: ce,
        // Preserve these flags across redirects
        preventScrollReset: xe || ue,
        enableViewTransition: $ ? ve : void 0
      });
    }
  }
  async function Be(M, V, $, re, ce) {
    let xe, me = {};
    try {
      xe = await aj(
        b,
        M,
        V,
        $,
        ce,
        re,
        !1
      );
    } catch (pe) {
      return $.filter((we) => we.shouldLoad).forEach((we) => {
        me[we.route.id] = {
          type: "error",
          error: pe
        };
      }), me;
    }
    if (M.signal.aborted)
      return me;
    if (!en(M.method))
      for (let pe of $) {
        if (xe[pe.route.id]?.type === "error")
          break;
        !xe.hasOwnProperty(pe.route.id) && !R.loaderData.hasOwnProperty(pe.route.id) && (!R.errors || !R.errors.hasOwnProperty(pe.route.id)) && pe.shouldCallHandler() && (xe[pe.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${pe.route.id}`
          )
        });
      }
    for (let [pe, we] of Object.entries(xe))
      if (hj(we)) {
        let ge = we.result;
        me[pe] = {
          type: "redirect",
          response: sj(
            ge,
            M,
            pe,
            $,
            p
          )
        };
      } else
        me[pe] = await lj(we);
    return me;
  }
  async function ht(M, V, $, re, ce) {
    let xe = Be(
      $,
      re,
      M,
      ce,
      null
    ), me = Promise.all(
      V.map(async (ge) => {
        if (ge.matches && ge.match && ge.request && ge.controller) {
          let Te = (await Be(
            ge.request,
            ge.path,
            ge.matches,
            ce,
            ge.key
          ))[ge.match.route.id];
          return { [ge.key]: Te };
        } else
          return Promise.resolve({
            [ge.key]: {
              type: "error",
              error: Hn(404, {
                pathname: ge.path
              })
            }
          });
      })
    ), pe = await xe, we = (await me).reduce(
      (ge, Ne) => Object.assign(ge, Ne),
      {}
    );
    return {
      loaderResults: pe,
      fetcherResults: we
    };
  }
  function nn() {
    U = !0, ie.forEach((M, V) => {
      Q.has(V) && q.add(V), Et(V);
    });
  }
  function an(M, V, $ = {}) {
    R.fetchers.set(M, V), We(
      { fetchers: new Map(R.fetchers) },
      { flushSync: ($ && $.flushSync) === !0 }
    );
  }
  function kt(M, V, $, re = {}) {
    let ce = vi(R.matches, V);
    Gn(M), We(
      {
        errors: {
          [ce.route.id]: $
        },
        fetchers: new Map(R.fetchers)
      },
      { flushSync: (re && re.flushSync) === !0 }
    );
  }
  function Ti(M) {
    return fe.set(M, (fe.get(M) || 0) + 1), ye.has(M) && ye.delete(M), R.fetchers.get(M) || KE;
  }
  function aa(M, V) {
    Et(M, V?.reason), an(M, La(null));
  }
  function Gn(M) {
    let V = R.fetchers.get(M);
    Q.has(M) && !(V && V.state === "loading" && X.has(M)) && Et(M), ie.delete(M), X.delete(M), P.delete(M), ye.delete(M), q.delete(M), R.fetchers.delete(M);
  }
  function It(M) {
    let V = (fe.get(M) || 0) - 1;
    V <= 0 ? (fe.delete(M), ye.add(M)) : fe.set(M, V), We({ fetchers: new Map(R.fetchers) });
  }
  function Et(M, V) {
    let $ = Q.get(M);
    $ && ($.abort(V), Q.delete(M));
  }
  function Bt(M) {
    for (let V of M) {
      let $ = Ti(V), re = La($.data);
      R.fetchers.set(V, re);
    }
  }
  function er() {
    let M = [], V = !1;
    for (let $ of P) {
      let re = R.fetchers.get($);
      $e(re, `Expected fetcher: ${$}`), re.state === "loading" && (P.delete($), M.push($), V = !0);
    }
    return Bt(M), V;
  }
  function qa(M) {
    let V = [];
    for (let [$, re] of X)
      if (re < M) {
        let ce = R.fetchers.get($);
        $e(ce, `Expected fetcher: ${$}`), ce.state === "loading" && (Et($), X.delete($), V.push($));
      }
    return Bt(V), V.length > 0;
  }
  function An(M, V) {
    let $ = R.blockers.get(M) || Il;
    return Me.get(M) !== V && Me.set(M, V), $;
  }
  function pa(M) {
    R.blockers.delete(M), Me.delete(M);
  }
  function Xn(M, V) {
    let $ = R.blockers.get(M) || Il;
    $e(
      $.state === "unblocked" && V.state === "blocked" || $.state === "blocked" && V.state === "blocked" || $.state === "blocked" && V.state === "proceeding" || $.state === "blocked" && V.state === "unblocked" || $.state === "proceeding" && V.state === "unblocked",
      `Invalid blocker state transition: ${$.state} -> ${V.state}`
    );
    let re = new Map(R.blockers);
    re.set(M, V), We({ blockers: re });
  }
  function ia({
    currentLocation: M,
    nextLocation: V,
    historyAction: $
  }) {
    if (Me.size === 0)
      return;
    Me.size > 1 && Nt(!1, "A router only supports one blocker at a time");
    let re = Array.from(Me.entries()), [ce, xe] = re[re.length - 1], me = R.blockers.get(ce);
    if (!(me && me.state === "proceeding") && xe({ currentLocation: M, nextLocation: V, historyAction: $ }))
      return ce;
  }
  function sn(M) {
    let V = Hn(404, { pathname: M }), $ = v || m, { matches: re, route: ce } = Oo($);
    return { notFoundMatches: re, route: ce, error: V };
  }
  function ze(M, V, $) {
    if (j = M, A = V, T = $ || null, !C && R.navigation === Yd) {
      C = !0;
      let re = Ht(R.location, R.matches);
      re != null && We({ restoreScrollPosition: re });
    }
    return () => {
      j = null, A = null, T = null;
    };
  }
  function ot(M, V) {
    return T && T(
      M,
      V.map((re) => bE(re, R.loaderData))
    ) || M.key;
  }
  function Rt(M, V) {
    if (j && A) {
      let $ = ot(M, V);
      j[$] = A();
    }
  }
  function Ht(M, V) {
    if (j) {
      let $ = ot(M, V), re = j[$];
      if (typeof re == "number")
        return re;
    }
    return null;
  }
  function gn(M, V, $) {
    if (n.patchRoutesOnNavigation)
      if (M) {
        if (Object.keys(M[0].params).length > 0)
          return { active: !0, matches: Wl(
            V,
            $,
            p,
            !0
          ) };
      } else
        return { active: !0, matches: Wl(
          V,
          $,
          p,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function at(M, V, $, re) {
    if (!n.patchRoutesOnNavigation)
      return { type: "success", matches: M };
    let ce = M;
    for (; ; ) {
      let xe = v == null, me = v || m, pe = h;
      try {
        await n.patchRoutesOnNavigation({
          signal: $,
          path: V,
          matches: ce,
          fetcherKey: re,
          patch: (Ne, Te) => {
            $.aborted || Hv(
              Ne,
              Te,
              me,
              pe,
              c,
              !1
            );
          }
        });
      } catch (Ne) {
        return { type: "error", error: Ne, partialMatches: ce };
      } finally {
        xe && !$.aborted && (m = [...m]);
      }
      if ($.aborted)
        return { type: "aborted" };
      let we = gi(me, V, p), ge = null;
      if (we) {
        if (Object.keys(we[0].params).length === 0)
          return { type: "success", matches: we };
        if (ge = Wl(
          me,
          V,
          p,
          !0
        ), !(ge && ce.length < ge.length && Gt(
          ce,
          ge.slice(0, ce.length)
        )))
          return { type: "success", matches: we };
      }
      if (ge || (ge = Wl(
        me,
        V,
        p,
        !0
      )), !ge || Gt(ce, ge))
        return { type: "success", matches: null };
      ce = ge;
    }
  }
  function Gt(M, V) {
    return M.length === V.length && M.every(($, re) => $.route.id === V[re].route.id);
  }
  function ga(M) {
    h = {}, v = rs(
      M,
      c,
      void 0,
      h
    );
  }
  function Pt(M, V, $ = !1) {
    let re = v == null;
    Hv(
      M,
      V,
      v || m,
      h,
      c,
      $
    ), re && (m = [...m], We({}));
  }
  return ee = {
    get basename() {
      return p;
    },
    get future() {
      return g;
    },
    get state() {
      return R;
    },
    get routes() {
      return m;
    },
    get window() {
      return a;
    },
    initialize: De,
    subscribe: _e,
    enableScrollRestoration: ze,
    navigate: Mn,
    fetch: Vt,
    revalidate: ta,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (M) => n.history.createHref(M),
    encodeLocation: (M) => n.history.encodeLocation(M),
    getFetcher: Ti,
    resetFetcher: aa,
    deleteFetcher: It,
    dispose: Oe,
    getBlocker: An,
    deleteBlocker: pa,
    patchRoutes: Pt,
    _internalFetchControllers: Q,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: ga,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(M) {
      We(M);
    }
  }, n.unstable_instrumentations && (ee = BE(
    ee,
    n.unstable_instrumentations.map((M) => M.router).filter(Boolean)
  )), ee;
}
function PE(n) {
  return n != null && ("formData" in n && n.formData != null || "body" in n && n.body !== void 0);
}
function wf(n, a, r, s, o, c) {
  let h, m;
  if (o) {
    h = [];
    for (let p of a)
      if (h.push(p), p.route.id === o) {
        m = p;
        break;
      }
  } else
    h = a, m = a[a.length - 1];
  let v = pu(
    s || ".",
    eh(h),
    Fn(n.pathname, r) || n.pathname,
    c === "path"
  );
  if (s == null && (v.search = n.search, v.hash = n.hash), (s == null || s === "" || s === ".") && m) {
    let p = ih(v.search);
    if (m.route.index && !p)
      v.search = v.search ? v.search.replace(/^\?/, "?index&") : "?index";
    else if (!m.route.index && p) {
      let b = new URLSearchParams(v.search), g = b.getAll("index");
      b.delete("index"), g.filter((w) => w).forEach((w) => b.append("index", w));
      let S = b.toString();
      v.search = S ? `?${S}` : "";
    }
  }
  return r !== "/" && (v.pathname = DE({ basename: r, pathname: v.pathname })), fa(v);
}
function kv(n, a, r) {
  if (!r || !PE(r))
    return { path: a };
  if (r.formMethod && !gj(r.formMethod))
    return {
      path: a,
      error: Hn(405, { method: r.formMethod })
    };
  let s = () => ({
    path: a,
    error: Hn(400, { type: "invalid-body" })
  }), c = (r.formMethod || "get").toUpperCase(), h = _b(a);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!en(c))
        return s();
      let g = typeof r.body == "string" ? r.body : r.body instanceof FormData || r.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(r.body.entries()).reduce(
          (S, [w, j]) => `${S}${w}=${j}
`,
          ""
        )
      ) : String(r.body);
      return {
        path: a,
        submission: {
          formMethod: c,
          formAction: h,
          formEncType: r.formEncType,
          formData: void 0,
          json: void 0,
          text: g
        }
      };
    } else if (r.formEncType === "application/json") {
      if (!en(c))
        return s();
      try {
        let g = typeof r.body == "string" ? JSON.parse(r.body) : r.body;
        return {
          path: a,
          submission: {
            formMethod: c,
            formAction: h,
            formEncType: r.formEncType,
            formData: void 0,
            json: g,
            text: void 0
          }
        };
      } catch {
        return s();
      }
    }
  }
  $e(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let m, v;
  if (r.formData)
    m = jf(r.formData), v = r.formData;
  else if (r.body instanceof FormData)
    m = jf(r.body), v = r.body;
  else if (r.body instanceof URLSearchParams)
    m = r.body, v = Gv(m);
  else if (r.body == null)
    m = new URLSearchParams(), v = new FormData();
  else
    try {
      m = new URLSearchParams(r.body), v = Gv(m);
    } catch {
      return s();
    }
  let p = {
    formMethod: c,
    formAction: h,
    formEncType: r && r.formEncType || "application/x-www-form-urlencoded",
    formData: v,
    json: void 0,
    text: void 0
  };
  if (en(p.formMethod))
    return { path: a, submission: p };
  let b = ea(a);
  return n && b.search && ih(b.search) && m.append("index", ""), b.search = `?${m}`, { path: fa(b), submission: p };
}
function Bv(n, a, r, s, o, c, h, m, v, p, b, g, S, w, j, T, A, C, D, z, k) {
  let W = z ? jn(z[1]) ? z[1].error : z[1].data : void 0, G = o.createURL(c.location), ee = o.createURL(v), R;
  if (b && c.errors) {
    let le = Object.keys(c.errors)[0];
    R = h.findIndex((L) => L.route.id === le);
  } else if (z && jn(z[1])) {
    let le = z[0];
    R = h.findIndex((L) => L.route.id === le) - 1;
  }
  let H = z ? z[1].statusCode : void 0, Z = H && H >= 400, ue = {
    currentUrl: G,
    currentParams: c.matches[0]?.params || {},
    nextUrl: ee,
    nextParams: h[0].params,
    ...m,
    actionResult: W,
    actionStatus: H
  }, oe = fs(h), ve = h.map((le, L) => {
    let { route: U } = le, q = null;
    if (R != null && L > R)
      q = !1;
    else if (U.lazy)
      q = !0;
    else if (!nh(U))
      q = !1;
    else if (b) {
      let { shouldLoad: X } = jb(
        U,
        c.loaderData,
        c.errors
      );
      q = X;
    } else JE(c.loaderData, c.matches[L], le) && (q = !0);
    if (q !== null)
      return Ef(
        r,
        s,
        n,
        v,
        oe,
        le,
        p,
        a,
        q
      );
    let Q = !1;
    typeof k == "boolean" ? Q = k : Z ? Q = !1 : (g || G.pathname + G.search === ee.pathname + ee.search || G.search !== ee.search || WE(c.matches[L], le)) && (Q = !0);
    let ae = {
      ...ue,
      defaultShouldRevalidate: Q
    }, N = ns(le, ae);
    return Ef(
      r,
      s,
      n,
      v,
      oe,
      le,
      p,
      a,
      N,
      ae,
      k
    );
  }), je = [];
  return j.forEach((le, L) => {
    if (b || !h.some((ie) => ie.route.id === le.routeId) || w.has(L))
      return;
    let U = c.fetchers.get(L), q = U && U.state !== "idle" && U.data === void 0, Q = gi(A, le.path, C);
    if (!Q) {
      if (D && q)
        return;
      je.push({
        key: L,
        routeId: le.routeId,
        path: le.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (T.has(L))
      return;
    let ae = Zo(Q, le.path), N = new AbortController(), X = Hr(
      o,
      le.path,
      N.signal
    ), P = null;
    if (S.has(L))
      S.delete(L), P = Fr(
        r,
        s,
        X,
        le.path,
        Q,
        ae,
        p,
        a
      );
    else if (q)
      g && (P = Fr(
        r,
        s,
        X,
        le.path,
        Q,
        ae,
        p,
        a
      ));
    else {
      let ie;
      typeof k == "boolean" ? ie = k : Z ? ie = !1 : ie = g;
      let fe = {
        ...ue,
        defaultShouldRevalidate: ie
      };
      ns(ae, fe) && (P = Fr(
        r,
        s,
        X,
        le.path,
        Q,
        ae,
        p,
        a,
        fe
      ));
    }
    P && je.push({
      key: L,
      routeId: le.routeId,
      path: le.path,
      matches: P,
      match: ae,
      request: X,
      controller: N
    });
  }), { dsMatches: ve, revalidatingFetchers: je };
}
function nh(n) {
  return n.loader != null || n.middleware != null && n.middleware.length > 0;
}
function jb(n, a, r) {
  if (n.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!nh(n))
    return { shouldLoad: !1, renderFallback: !1 };
  let s = a != null && n.id in a, o = r != null && r[n.id] !== void 0;
  if (!s && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof n.loader == "function" && n.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !s };
  let c = !s && !o;
  return { shouldLoad: c, renderFallback: c };
}
function JE(n, a, r) {
  let s = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    r.route.id !== a.route.id
  ), o = !n.hasOwnProperty(r.route.id);
  return s || o;
}
function WE(n, a) {
  let r = n.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    n.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r != null && r.endsWith("*") && n.params["*"] !== a.params["*"]
  );
}
function ns(n, a) {
  if (n.route.shouldRevalidate) {
    let r = n.route.shouldRevalidate(a);
    if (typeof r == "boolean")
      return r;
  }
  return a.defaultShouldRevalidate;
}
function Hv(n, a, r, s, o, c) {
  let h;
  if (n) {
    let p = s[n];
    $e(
      p,
      `No route found to patch children into: routeId = ${n}`
    ), p.children || (p.children = []), h = p.children;
  } else
    h = r;
  let m = [], v = [];
  if (a.forEach((p) => {
    let b = h.find(
      (g) => Tb(p, g)
    );
    b ? v.push({ existingRoute: b, newRoute: p }) : m.push(p);
  }), m.length > 0) {
    let p = rs(
      m,
      o,
      [n || "_", "patch", String(h?.length || "0")],
      s
    );
    h.push(...p);
  }
  if (c && v.length > 0)
    for (let p = 0; p < v.length; p++) {
      let { existingRoute: b, newRoute: g } = v[p], S = b, [w] = rs(
        [g],
        o,
        [],
        // Doesn't matter for mutated routes since they already have an id
        {},
        // Don't touch the manifest here since we're updating in place
        !0
      );
      Object.assign(S, {
        element: w.element ? w.element : S.element,
        errorElement: w.errorElement ? w.errorElement : S.errorElement,
        hydrateFallbackElement: w.hydrateFallbackElement ? w.hydrateFallbackElement : S.hydrateFallbackElement
      });
    }
}
function Tb(n, a) {
  return "id" in n && "id" in a && n.id === a.id ? !0 : n.index === a.index && n.path === a.path && n.caseSensitive === a.caseSensitive ? (!n.children || n.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : n.children?.every(
    (r, s) => a.children?.some((o) => Tb(r, o))
  ) ?? !1 : !1;
}
var qv = /* @__PURE__ */ new WeakMap(), Cb = ({
  key: n,
  route: a,
  manifest: r,
  mapRouteProperties: s
}) => {
  let o = r[a.id];
  if ($e(o, "No route found in manifest"), !o.lazy || typeof o.lazy != "object")
    return;
  let c = o.lazy[n];
  if (!c)
    return;
  let h = qv.get(o);
  h || (h = {}, qv.set(o, h));
  let m = h[n];
  if (m)
    return m;
  let v = (async () => {
    let p = pE(n), g = o[n] !== void 0 && n !== "hasErrorBoundary";
    if (p)
      Nt(
        !p,
        "Route property " + n + " is not a supported lazy route property. This property will be ignored."
      ), h[n] = Promise.resolve();
    else if (g)
      Nt(
        !1,
        `Route "${o.id}" has a static property "${n}" defined. The lazy property will be ignored.`
      );
    else {
      let S = await c();
      S != null && (Object.assign(o, { [n]: S }), Object.assign(o, s(o)));
    }
    typeof o.lazy == "object" && (o.lazy[n] = void 0, Object.values(o.lazy).every((S) => S === void 0) && (o.lazy = void 0));
  })();
  return h[n] = v, v;
}, $v = /* @__PURE__ */ new WeakMap();
function ej(n, a, r, s, o) {
  let c = r[n.id];
  if ($e(c, "No route found in manifest"), !n.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof n.lazy == "function") {
    let b = $v.get(c);
    if (b)
      return {
        lazyRoutePromise: b,
        lazyHandlerPromise: b
      };
    let g = (async () => {
      $e(
        typeof n.lazy == "function",
        "No lazy route function found"
      );
      let S = await n.lazy(), w = {};
      for (let j in S) {
        let T = S[j];
        if (T === void 0)
          continue;
        let A = vE(j), D = c[j] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        j !== "hasErrorBoundary";
        A ? Nt(
          !A,
          "Route property " + j + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : D ? Nt(
          !D,
          `Route "${c.id}" has a static property "${j}" defined but its lazy function is also returning a value for this property. The lazy route property "${j}" will be ignored.`
        ) : w[j] = T;
      }
      Object.assign(c, w), Object.assign(c, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...s(c),
        lazy: void 0
      });
    })();
    return $v.set(c, g), g.catch(() => {
    }), {
      lazyRoutePromise: g,
      lazyHandlerPromise: g
    };
  }
  let h = Object.keys(n.lazy), m = [], v;
  for (let b of h) {
    if (o && o.includes(b))
      continue;
    let g = Cb({
      key: b,
      route: n,
      manifest: r,
      mapRouteProperties: s
    });
    g && (m.push(g), b === a && (v = g));
  }
  let p = m.length > 0 ? Promise.all(m).then(() => {
  }) : void 0;
  return p?.catch(() => {
  }), v?.catch(() => {
  }), {
    lazyRoutePromise: p,
    lazyHandlerPromise: v
  };
}
async function Yv(n) {
  let a = n.matches.filter((o) => o.shouldLoad), r = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, c) => {
    r[a[c].route.id] = o;
  }), r;
}
async function tj(n) {
  return n.matches.some((a) => a.route.middleware) ? Nb(n, () => Yv(n)) : Yv(n);
}
function Nb(n, a) {
  return nj(
    n,
    a,
    (s) => {
      if (pj(s))
        throw s;
      return s;
    },
    dj,
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
      let { matches: h } = n, m = Math.min(
        // Throwing route
        Math.max(
          h.findIndex((p) => p.route.id === o),
          0
        ),
        // or the shallowest route that needs to load data
        Math.max(
          h.findIndex((p) => p.shouldCallHandler()),
          0
        )
      ), v = vi(
        h,
        h[m].route.id
      ).route.id;
      return Promise.resolve({
        [v]: { type: "error", result: s }
      });
    }
  }
}
async function nj(n, a, r, s, o) {
  let { matches: c, ...h } = n, m = c.flatMap(
    (p) => p.route.middleware ? p.route.middleware.map((b) => [p.route.id, b]) : []
  );
  return await Mb(
    h,
    m,
    a,
    r,
    s,
    o
  );
}
async function Mb(n, a, r, s, o, c, h = 0) {
  let { request: m } = n;
  if (m.signal.aborted)
    throw m.signal.reason ?? new Error(`Request aborted: ${m.method} ${m.url}`);
  let v = a[h];
  if (!v)
    return await r();
  let [p, b] = v, g, S = async () => {
    if (g)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return g = { value: await Mb(
        n,
        a,
        r,
        s,
        o,
        c,
        h + 1
      ) }, g.value;
    } catch (w) {
      return g = { value: await c(w, p, g) }, g.value;
    }
  };
  try {
    let w = await b(n, S), j = w != null ? s(w) : void 0;
    return o(j) ? j : g ? j ?? g.value : (g = { value: await S() }, g.value);
  } catch (w) {
    return await c(w, p, g);
  }
}
function Rb(n, a, r, s, o) {
  let c = Cb({
    key: "middleware",
    route: s.route,
    manifest: a,
    mapRouteProperties: n
  }), h = ej(
    s.route,
    en(r.method) ? "action" : "loader",
    a,
    n,
    o
  );
  return {
    middleware: c,
    route: h.lazyRoutePromise,
    handler: h.lazyHandlerPromise
  };
}
function Ef(n, a, r, s, o, c, h, m, v, p = null, b) {
  let g = !1, S = Rb(
    n,
    a,
    r,
    c,
    h
  );
  return {
    ...c,
    _lazyPromises: S,
    shouldLoad: v,
    shouldRevalidateArgs: p,
    shouldCallHandler(w) {
      return g = !0, p ? typeof b == "boolean" ? ns(c, {
        ...p,
        defaultShouldRevalidate: b
      }) : typeof w == "boolean" ? ns(c, {
        ...p,
        defaultShouldRevalidate: w
      }) : ns(c, p) : v;
    },
    resolve(w) {
      let { lazy: j, loader: T, middleware: A } = c.route, C = g || v || w && !en(r.method) && (j || T), D = A && A.length > 0 && !T && !j;
      return C && (en(r.method) || !D) ? ij({
        request: r,
        path: s,
        unstable_pattern: o,
        match: c,
        lazyHandlerPromise: S?.handler,
        lazyRoutePromise: S?.route,
        handlerOverride: w,
        scopedContext: m
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function Fr(n, a, r, s, o, c, h, m, v = null) {
  return o.map((p) => p.route.id !== c.route.id ? {
    ...p,
    shouldLoad: !1,
    shouldRevalidateArgs: v,
    shouldCallHandler: () => !1,
    _lazyPromises: Rb(
      n,
      a,
      r,
      p,
      h
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Ef(
    n,
    a,
    r,
    s,
    fs(o),
    p,
    h,
    m,
    !0,
    v
  ));
}
async function aj(n, a, r, s, o, c, h) {
  s.some((b) => b._lazyPromises?.middleware) && await Promise.all(s.map((b) => b._lazyPromises?.middleware));
  let m = {
    request: a,
    unstable_url: Ab(a, r),
    unstable_pattern: fs(s),
    params: s[0].params,
    context: c,
    matches: s
  }, p = await n({
    ...m,
    fetcherKey: o,
    runClientMiddleware: (b) => {
      let g = m;
      return Nb(g, () => b({
        ...g,
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
      s.flatMap((b) => [
        b._lazyPromises?.handler,
        b._lazyPromises?.route
      ])
    );
  } catch {
  }
  return p;
}
async function ij({
  request: n,
  path: a,
  unstable_pattern: r,
  match: s,
  lazyHandlerPromise: o,
  lazyRoutePromise: c,
  handlerOverride: h,
  scopedContext: m
}) {
  let v, p, b = en(n.method), g = b ? "action" : "loader", S = (w) => {
    let j, T = new Promise((D, z) => j = z);
    p = () => j(), n.signal.addEventListener("abort", p);
    let A = (D) => typeof w != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${g}" [routeId: ${s.route.id}]`
      )
    ) : w(
      {
        request: n,
        unstable_url: Ab(n, a),
        unstable_pattern: r,
        params: s.params,
        context: m
      },
      ...D !== void 0 ? [D] : []
    ), C = (async () => {
      try {
        return { type: "data", result: await (h ? h((z) => A(z)) : A()) };
      } catch (D) {
        return { type: "error", result: D };
      }
    })();
    return Promise.race([C, T]);
  };
  try {
    let w = b ? s.route.action : s.route.loader;
    if (o || c)
      if (w) {
        let j, [T] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          S(w).catch((A) => {
            j = A;
          }),
          // Ensure all lazy route promises are resolved before continuing
          o,
          c
        ]);
        if (j !== void 0)
          throw j;
        v = T;
      } else {
        await o;
        let j = b ? s.route.action : s.route.loader;
        if (j)
          [v] = await Promise.all([S(j), c]);
        else if (g === "action") {
          let T = new URL(n.url), A = T.pathname + T.search;
          throw Hn(405, {
            method: n.method,
            pathname: A,
            routeId: s.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (w)
      v = await S(w);
    else {
      let j = new URL(n.url), T = j.pathname + j.search;
      throw Hn(404, {
        pathname: T
      });
    }
  } catch (w) {
    return { type: "error", result: w };
  } finally {
    p && n.signal.removeEventListener("abort", p);
  }
  return v;
}
async function rj(n) {
  let a = n.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? n.body == null ? null : n.json() : n.text();
}
async function lj(n) {
  let { result: a, type: r } = n;
  if (ah(a)) {
    let s;
    try {
      s = await rj(a);
    } catch (o) {
      return { type: "error", error: o };
    }
    return r === "error" ? {
      type: "error",
      error: new gu(a.status, a.statusText, s),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: s,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return r === "error" ? Zv(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: cj(a),
    statusCode: ls(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: ls(a) ? a.status : void 0
  } : Zv(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function sj(n, a, r, s, o) {
  let c = n.headers.get("Location");
  if ($e(
    c,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !Wf(c)) {
    let h = s.slice(
      0,
      s.findIndex((m) => m.route.id === r) + 1
    );
    c = wf(
      new URL(a.url),
      h,
      o,
      c
    ), n.headers.set("Location", c);
  }
  return n;
}
var Fv = [
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
function Iv(n, a, r, s) {
  if (Wf(n)) {
    let o = n, c = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (Fv.includes(c.protocol))
      throw new Error("Invalid redirect location");
    let h = Fn(c.pathname, r) != null;
    if (c.origin === a.origin && h)
      return th(c.pathname) + c.search + c.hash;
  }
  try {
    let o = s.createURL(n);
    if (Fv.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return n;
}
function Hr(n, a, r, s) {
  let o = n.createURL(_b(a)).toString(), c = { signal: r };
  if (s && en(s.formMethod)) {
    let { formMethod: h, formEncType: m } = s;
    c.method = h.toUpperCase(), m === "application/json" ? (c.headers = new Headers({ "Content-Type": m }), c.body = JSON.stringify(s.json)) : m === "text/plain" ? c.body = s.text : m === "application/x-www-form-urlencoded" && s.formData ? c.body = jf(s.formData) : c.body = s.formData;
  }
  return new Request(o, c);
}
function Ab(n, a) {
  let r = new URL(n.url), s = typeof a == "string" ? ea(a) : a;
  if (r.pathname = s.pathname || "/", s.search) {
    let o = new URLSearchParams(s.search), c = o.getAll("index");
    o.delete("index");
    for (let h of c.filter(Boolean))
      o.append("index", h);
    r.search = o.size ? `?${o.toString()}` : "";
  } else
    r.search = "";
  return r.hash = s.hash || "", r;
}
function jf(n) {
  let a = new URLSearchParams();
  for (let [r, s] of n.entries())
    a.append(r, typeof s == "string" ? s : s.name);
  return a;
}
function Gv(n) {
  let a = new FormData();
  for (let [r, s] of n.entries())
    a.append(r, s);
  return a;
}
function oj(n, a, r, s = !1, o = !1) {
  let c = {}, h = null, m, v = !1, p = {}, b = r && jn(r[1]) ? r[1].error : void 0;
  return n.forEach((g) => {
    if (!(g.route.id in a))
      return;
    let S = g.route.id, w = a[S];
    if ($e(
      !Xi(w),
      "Cannot handle redirect results in processLoaderData"
    ), jn(w)) {
      let j = w.error;
      if (b !== void 0 && (j = b, b = void 0), h = h || {}, o)
        h[S] = j;
      else {
        let T = vi(n, S);
        h[T.route.id] == null && (h[T.route.id] = j);
      }
      s || (c[S] = Eb), v || (v = !0, m = ls(w.error) ? w.error.status : 500), w.headers && (p[S] = w.headers);
    } else
      c[S] = w.data, w.statusCode && w.statusCode !== 200 && !v && (m = w.statusCode), w.headers && (p[S] = w.headers);
  }), b !== void 0 && r && (h = { [r[0]]: b }, r[2] && (c[r[2]] = void 0)), {
    loaderData: c,
    errors: h,
    statusCode: m || 200,
    loaderHeaders: p
  };
}
function Xv(n, a, r, s, o, c) {
  let { loaderData: h, errors: m } = oj(
    a,
    r,
    s
  );
  return o.filter((v) => !v.matches || v.matches.some((p) => p.shouldLoad)).forEach((v) => {
    let { key: p, match: b, controller: g } = v;
    if (g && g.signal.aborted)
      return;
    let S = c[p];
    if ($e(S, "Did not find corresponding fetcher result"), jn(S)) {
      let w = vi(n.matches, b?.route.id);
      m && m[w.route.id] || (m = {
        ...m,
        [w.route.id]: S.error
      }), n.fetchers.delete(p);
    } else if (Xi(S))
      $e(!1, "Unhandled fetcher revalidation redirect");
    else {
      let w = La(S.data);
      n.fetchers.set(p, w);
    }
  }), { loaderData: h, errors: m };
}
function Kv(n, a, r, s) {
  let o = Object.entries(a).filter(([, c]) => c !== Eb).reduce((c, [h, m]) => (c[h] = m, c), {});
  for (let c of r) {
    let h = c.route.id;
    if (!a.hasOwnProperty(h) && n.hasOwnProperty(h) && c.route.loader && (o[h] = n[h]), s && s.hasOwnProperty(h))
      break;
  }
  return o;
}
function Qv(n) {
  return n ? jn(n[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [n[0]]: n[1].data
    }
  } : {};
}
function vi(n, a) {
  return (a ? n.slice(0, n.findIndex((s) => s.route.id === a) + 1) : [...n]).reverse().find((s) => s.route.hasErrorBoundary === !0) || n[0];
}
function Oo(n) {
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
function Hn(n, {
  pathname: a,
  routeId: r,
  method: s,
  type: o,
  message: c
} = {}) {
  let h = "Unknown Server Error", m = "Unknown @remix-run/router error";
  return n === 400 ? (h = "Bad Request", s && a && r ? m = `You made a ${s} request to "${a}" but did not provide a \`loader\` for route "${r}", so there is no way to handle the request.` : o === "invalid-body" && (m = "Unable to encode submission body")) : n === 403 ? (h = "Forbidden", m = `Route "${r}" does not match URL "${a}"`) : n === 404 ? (h = "Not Found", m = `No route matches URL "${a}"`) : n === 405 && (h = "Method Not Allowed", s && a && r ? m = `You made a ${s.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${r}", so there is no way to handle the request.` : s && (m = `Invalid request method "${s.toUpperCase()}"`)), new gu(
    n || 500,
    h,
    new Error(m),
    !0
  );
}
function Lo(n) {
  let a = Object.entries(n);
  for (let r = a.length - 1; r >= 0; r--) {
    let [s, o] = a[r];
    if (Xi(o))
      return { key: s, result: o };
  }
}
function _b(n) {
  let a = typeof n == "string" ? ea(n) : n;
  return fa({ ...a, hash: "" });
}
function uj(n, a) {
  return n.pathname !== a.pathname || n.search !== a.search ? !1 : n.hash === "" ? a.hash !== "" : n.hash === a.hash ? !0 : a.hash !== "";
}
function cj(n) {
  return new gu(
    n.init?.status ?? 500,
    n.init?.statusText ?? "Internal Server Error",
    n.data
  );
}
function dj(n) {
  return n != null && typeof n == "object" && Object.entries(n).every(
    ([a, r]) => typeof a == "string" && fj(r)
  );
}
function fj(n) {
  return n != null && typeof n == "object" && "type" in n && "result" in n && (n.type === "data" || n.type === "error");
}
function hj(n) {
  return ah(n.result) && Sb.has(n.result.status);
}
function jn(n) {
  return n.type === "error";
}
function Xi(n) {
  return (n && n.type) === "redirect";
}
function Zv(n) {
  return typeof n == "object" && n != null && "type" in n && "data" in n && "init" in n && n.type === "DataWithResponseInit";
}
function ah(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.headers == "object" && typeof n.body < "u";
}
function mj(n) {
  return Sb.has(n);
}
function pj(n) {
  return ah(n) && mj(n.status) && n.headers.has("Location");
}
function gj(n) {
  return GE.has(n.toUpperCase());
}
function en(n) {
  return FE.has(n.toUpperCase());
}
function ih(n) {
  return new URLSearchParams(n).getAll("index").some((a) => a === "");
}
function Zo(n, a) {
  let r = typeof a == "string" ? ea(a).search : a.search;
  if (n[n.length - 1].route.index && ih(r || ""))
    return n[n.length - 1];
  let s = gb(n);
  return s[s.length - 1];
}
function Pv(n) {
  let { formMethod: a, formAction: r, formEncType: s, text: o, formData: c, json: h } = n;
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
    if (h !== void 0)
      return {
        formMethod: a,
        formAction: r,
        formEncType: s,
        formData: void 0,
        json: h,
        text: void 0
      };
  }
}
function Fd(n, a) {
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
function vj(n, a) {
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
function Gl(n, a) {
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
function yj(n, a) {
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
function La(n) {
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
function bj(n, a) {
  try {
    let r = n.sessionStorage.getItem(
      wb
    );
    if (r) {
      let s = JSON.parse(r);
      for (let [o, c] of Object.entries(s || {}))
        c && Array.isArray(c) && a.set(o, new Set(c || []));
    }
  } catch {
  }
}
function xj(n, a) {
  if (a.size > 0) {
    let r = {};
    for (let [s, o] of a)
      r[s] = [...o];
    try {
      n.sessionStorage.setItem(
        wb,
        JSON.stringify(r)
      );
    } catch (s) {
      Nt(
        !1,
        `Failed to save applied view transitions in sessionStorage (${s}).`
      );
    }
  }
}
function Jv() {
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
var Wi = x.createContext(null);
Wi.displayName = "DataRouter";
var hs = x.createContext(null);
hs.displayName = "DataRouterState";
var Db = x.createContext(!1);
function zb() {
  return x.useContext(Db);
}
var rh = x.createContext({
  isTransitioning: !1
});
rh.displayName = "ViewTransition";
var Ob = x.createContext(
  /* @__PURE__ */ new Map()
);
Ob.displayName = "Fetchers";
var Sj = x.createContext(null);
Sj.displayName = "Await";
var In = x.createContext(
  null
);
In.displayName = "Navigation";
var vu = x.createContext(
  null
);
vu.displayName = "Location";
var ka = x.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
ka.displayName = "Route";
var lh = x.createContext(null);
lh.displayName = "RouteError";
var Lb = "REACT_ROUTER_ERROR", wj = "REDIRECT", Ej = "ROUTE_ERROR_RESPONSE";
function jj(n) {
  if (n.startsWith(`${Lb}:${wj}:{`))
    try {
      let a = JSON.parse(n.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function Tj(n) {
  if (n.startsWith(
    `${Lb}:${Ej}:{`
  ))
    try {
      let a = JSON.parse(n.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new gu(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function Cj(n, { relative: a } = {}) {
  $e(
    ms(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: s } = x.useContext(In), { hash: o, pathname: c, search: h } = ps(n, { relative: a }), m = c;
  return r !== "/" && (m = c === "/" ? r : qn([r, c])), s.createHref({ pathname: m, search: h, hash: o });
}
function ms() {
  return x.useContext(vu) != null;
}
function Ba() {
  return $e(
    ms(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), x.useContext(vu).location;
}
var Ub = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Vb(n) {
  x.useContext(In).static || x.useLayoutEffect(n);
}
function Qr() {
  let { isDataRoute: n } = x.useContext(ka);
  return n ? kj() : Nj();
}
function Nj() {
  $e(
    ms(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let n = x.useContext(Wi), { basename: a, navigator: r } = x.useContext(In), { matches: s } = x.useContext(ka), { pathname: o } = Ba(), c = JSON.stringify(eh(s)), h = x.useRef(!1);
  return Vb(() => {
    h.current = !0;
  }), x.useCallback(
    (v, p = {}) => {
      if (Nt(h.current, Ub), !h.current) return;
      if (typeof v == "number") {
        r.go(v);
        return;
      }
      let b = pu(
        v,
        JSON.parse(c),
        o,
        p.relative === "path"
      );
      n == null && a !== "/" && (b.pathname = b.pathname === "/" ? a : qn([a, b.pathname])), (p.replace ? r.replace : r.push)(
        b,
        p.state,
        p
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
x.createContext(null);
function ps(n, { relative: a } = {}) {
  let { matches: r } = x.useContext(ka), { pathname: s } = Ba(), o = JSON.stringify(eh(r));
  return x.useMemo(
    () => pu(
      n,
      JSON.parse(o),
      s,
      a === "path"
    ),
    [n, o, s, a]
  );
}
function Mj(n, a, r) {
  $e(
    ms(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: s } = x.useContext(In), { matches: o } = x.useContext(ka), c = o[o.length - 1], h = c ? c.params : {}, m = c ? c.pathname : "/", v = c ? c.pathnameBase : "/", p = c && c.route;
  {
    let A = p && p.path || "";
    Hb(
      m,
      !p || A.endsWith("*") || A.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${A}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${A}"> to <Route path="${A === "/" ? "*" : `${A}/*`}">.`
    );
  }
  let b = Ba(), g;
  g = b;
  let S = g.pathname || "/", w = S;
  if (v !== "/") {
    let A = v.replace(/^\//, "").split("/");
    w = "/" + S.replace(/^\//, "").split("/").slice(A.length).join("/");
  }
  let j = gi(n, { pathname: w });
  return Nt(
    p || j != null,
    `No routes matched location "${g.pathname}${g.search}${g.hash}" `
  ), Nt(
    j == null || j[j.length - 1].route.element !== void 0 || j[j.length - 1].route.Component !== void 0 || j[j.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), zj(
    j && j.map(
      (A) => Object.assign({}, A, {
        params: Object.assign({}, h, A.params),
        pathname: qn([
          v,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            A.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : A.pathname
        ]),
        pathnameBase: A.pathnameBase === "/" ? v : qn([
          v,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            A.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : A.pathnameBase
        ])
      })
    ),
    o,
    r
  );
}
function Rj() {
  let n = Vj(), a = ls(n) ? `${n.status} ${n.statusText}` : n instanceof Error ? n.message : JSON.stringify(n), r = n instanceof Error ? n.stack : null, s = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: s }, c = { padding: "2px 4px", backgroundColor: s }, h = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    n
  ), h = /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ x.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ x.createElement("code", { style: c }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ x.createElement("code", { style: c }, "errorElement"), " prop on your route.")), /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ x.createElement("h3", { style: { fontStyle: "italic" } }, a), r ? /* @__PURE__ */ x.createElement("pre", { style: o }, r) : null, h);
}
var Aj = /* @__PURE__ */ x.createElement(Rj, null), kb = class extends x.Component {
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
      const r = Tj(n.digest);
      r && (n = r);
    }
    let a = n !== void 0 ? /* @__PURE__ */ x.createElement(ka.Provider, { value: this.props.routeContext }, /* @__PURE__ */ x.createElement(
      lh.Provider,
      {
        value: n,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ x.createElement(_j, { error: n }, a) : a;
  }
};
kb.contextType = Db;
var Id = /* @__PURE__ */ new WeakMap();
function _j({
  children: n,
  error: a
}) {
  let { basename: r } = x.useContext(In);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let s = jj(a.digest);
    if (s) {
      let o = Id.get(a);
      if (o) throw o;
      let c = yb(s.location, r);
      if (vb && !Id.get(a))
        if (c.isExternal || s.reloadDocument)
          window.location.href = c.absoluteURL || c.to;
        else {
          const h = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(c.to, {
              replace: s.replace
            })
          );
          throw Id.set(a, h), h;
        }
      return /* @__PURE__ */ x.createElement(
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
function Dj({ routeContext: n, match: a, children: r }) {
  let s = x.useContext(Wi);
  return s && s.static && s.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (s.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ x.createElement(ka.Provider, { value: n }, r);
}
function zj(n, a = [], r) {
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
    let b = o.findIndex(
      (g) => g.route.id && c?.[g.route.id] !== void 0
    );
    $e(
      b >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        c
      ).join(",")}`
    ), o = o.slice(
      0,
      Math.min(o.length, b + 1)
    );
  }
  let h = !1, m = -1;
  if (r && s) {
    h = s.renderFallback;
    for (let b = 0; b < o.length; b++) {
      let g = o[b];
      if ((g.route.HydrateFallback || g.route.hydrateFallbackElement) && (m = b), g.route.id) {
        let { loaderData: S, errors: w } = s, j = g.route.loader && !S.hasOwnProperty(g.route.id) && (!w || w[g.route.id] === void 0);
        if (g.route.lazy || j) {
          r.isStatic && (h = !0), m >= 0 ? o = o.slice(0, m + 1) : o = [o[0]];
          break;
        }
      }
    }
  }
  let v = r?.onError, p = s && v ? (b, g) => {
    v(b, {
      location: s.location,
      params: s.matches?.[0]?.params ?? {},
      unstable_pattern: fs(s.matches),
      errorInfo: g
    });
  } : void 0;
  return o.reduceRight(
    (b, g, S) => {
      let w, j = !1, T = null, A = null;
      s && (w = c && g.route.id ? c[g.route.id] : void 0, T = g.route.errorElement || Aj, h && (m < 0 && S === 0 ? (Hb(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), j = !0, A = null) : m === S && (j = !0, A = g.route.hydrateFallbackElement || null)));
      let C = a.concat(o.slice(0, S + 1)), D = () => {
        let z;
        return w ? z = T : j ? z = A : g.route.Component ? z = /* @__PURE__ */ x.createElement(g.route.Component, null) : g.route.element ? z = g.route.element : z = b, /* @__PURE__ */ x.createElement(
          Dj,
          {
            match: g,
            routeContext: {
              outlet: b,
              matches: C,
              isDataRoute: s != null
            },
            children: z
          }
        );
      };
      return s && (g.route.ErrorBoundary || g.route.errorElement || S === 0) ? /* @__PURE__ */ x.createElement(
        kb,
        {
          location: s.location,
          revalidation: s.revalidation,
          component: T,
          error: w,
          children: D(),
          routeContext: { outlet: null, matches: C, isDataRoute: !0 },
          onError: p
        }
      ) : D();
    },
    null
  );
}
function sh(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Oj(n) {
  let a = x.useContext(Wi);
  return $e(a, sh(n)), a;
}
function Bb(n) {
  let a = x.useContext(hs);
  return $e(a, sh(n)), a;
}
function Lj(n) {
  let a = x.useContext(ka);
  return $e(a, sh(n)), a;
}
function yu(n) {
  let a = Lj(n), r = a.matches[a.matches.length - 1];
  return $e(
    r.route.id,
    `${n} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function Uj() {
  return yu(
    "useRouteId"
    /* UseRouteId */
  );
}
function gs() {
  let n = Bb(
    "useLoaderData"
    /* UseLoaderData */
  ), a = yu(
    "useLoaderData"
    /* UseLoaderData */
  );
  return n.loaderData[a];
}
function Vj() {
  let n = x.useContext(lh), a = Bb(
    "useRouteError"
    /* UseRouteError */
  ), r = yu(
    "useRouteError"
    /* UseRouteError */
  );
  return n !== void 0 ? n : a.errors?.[r];
}
function kj() {
  let { router: n } = Oj(
    "useNavigate"
    /* UseNavigateStable */
  ), a = yu(
    "useNavigate"
    /* UseNavigateStable */
  ), r = x.useRef(!1);
  return Vb(() => {
    r.current = !0;
  }), x.useCallback(
    async (o, c = {}) => {
      Nt(r.current, Ub), r.current && (typeof o == "number" ? await n.navigate(o) : await n.navigate(o, { fromRouteId: a, ...c }));
    },
    [n, a]
  );
}
var Wv = {};
function Hb(n, a, r) {
  !a && !Wv[n] && (Wv[n] = !0, Nt(!1, r));
}
var ey = {};
function ty(n, a) {
  !n && !ey[a] && (ey[a] = !0, console.warn(a));
}
var Bj = "useOptimistic", ny = nE[Bj], Hj = () => {
};
function qj(n) {
  return ny ? ny(n) : [n, Hj];
}
function $j(n) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: n.hasErrorBoundary || n.ErrorBoundary != null || n.errorElement != null
  };
  return n.Component && (n.element && Nt(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: x.createElement(n.Component),
    Component: void 0
  })), n.HydrateFallback && (n.hydrateFallbackElement && Nt(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: x.createElement(n.HydrateFallback),
    HydrateFallback: void 0
  })), n.ErrorBoundary && (n.errorElement && Nt(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: x.createElement(n.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var Yj = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function Fj(n, a) {
  return ZE({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: dE({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: n,
    hydrationRouteProperties: Yj,
    mapRouteProperties: $j,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var Ij = class {
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
function Gj({
  router: n,
  flushSync: a,
  onError: r,
  unstable_useTransitions: s
}) {
  s = zb() || s;
  let [c, h] = x.useState(n.state), [m, v] = qj(c), [p, b] = x.useState(), [g, S] = x.useState({
    isTransitioning: !1
  }), [w, j] = x.useState(), [T, A] = x.useState(), [C, D] = x.useState(), z = x.useRef(/* @__PURE__ */ new Map()), k = x.useCallback(
    (H, { deletedFetchers: Z, newErrors: ue, flushSync: oe, viewTransitionOpts: ve }) => {
      ue && r && Object.values(ue).forEach(
        (le) => r(le, {
          location: H.location,
          params: H.matches[0]?.params ?? {},
          unstable_pattern: fs(H.matches)
        })
      ), H.fetchers.forEach((le, L) => {
        le.data !== void 0 && z.current.set(L, le.data);
      }), Z.forEach((le) => z.current.delete(le)), ty(
        oe === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let je = n.window != null && n.window.document != null && typeof n.window.document.startViewTransition == "function";
      if (ty(
        ve == null || je,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !ve || !je) {
        a && oe ? a(() => h(H)) : s === !1 ? h(H) : x.startTransition(() => {
          s === !0 && v((le) => ay(le, H)), h(H);
        });
        return;
      }
      if (a && oe) {
        a(() => {
          T && (w?.resolve(), T.skipTransition()), S({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: ve.currentLocation,
            nextLocation: ve.nextLocation
          });
        });
        let le = n.window.document.startViewTransition(() => {
          a(() => h(H));
        });
        le.finished.finally(() => {
          a(() => {
            j(void 0), A(void 0), b(void 0), S({ isTransitioning: !1 });
          });
        }), a(() => A(le));
        return;
      }
      T ? (w?.resolve(), T.skipTransition(), D({
        state: H,
        currentLocation: ve.currentLocation,
        nextLocation: ve.nextLocation
      })) : (b(H), S({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: ve.currentLocation,
        nextLocation: ve.nextLocation
      }));
    },
    [
      n.window,
      a,
      T,
      w,
      s,
      v,
      r
    ]
  );
  x.useLayoutEffect(() => n.subscribe(k), [n, k]);
  let W = m.initialized;
  x.useLayoutEffect(() => {
    !W && n.state.initialized && k(n.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [W, k, n.state]), x.useEffect(() => {
    g.isTransitioning && !g.flushSync && j(new Ij());
  }, [g]), x.useEffect(() => {
    if (w && p && n.window) {
      let H = p, Z = w.promise, ue = n.window.document.startViewTransition(async () => {
        s === !1 ? h(H) : x.startTransition(() => {
          s === !0 && v((oe) => ay(oe, H)), h(H);
        }), await Z;
      });
      ue.finished.finally(() => {
        j(void 0), A(void 0), b(void 0), S({ isTransitioning: !1 });
      }), A(ue);
    }
  }, [
    p,
    w,
    n.window,
    s,
    v
  ]), x.useEffect(() => {
    w && p && m.location.key === p.location.key && w.resolve();
  }, [w, T, m.location, p]), x.useEffect(() => {
    !g.isTransitioning && C && (b(C.state), S({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: C.currentLocation,
      nextLocation: C.nextLocation
    }), D(void 0));
  }, [g.isTransitioning, C]);
  let G = x.useMemo(() => ({
    createHref: n.createHref,
    encodeLocation: n.encodeLocation,
    go: (H) => n.navigate(H),
    push: (H, Z, ue) => n.navigate(H, {
      state: Z,
      preventScrollReset: ue?.preventScrollReset
    }),
    replace: (H, Z, ue) => n.navigate(H, {
      replace: !0,
      state: Z,
      preventScrollReset: ue?.preventScrollReset
    })
  }), [n]), ee = n.basename || "/", R = x.useMemo(
    () => ({
      router: n,
      navigator: G,
      static: !1,
      basename: ee,
      onError: r
    }),
    [n, G, ee, r]
  );
  return /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement(Wi.Provider, { value: R }, /* @__PURE__ */ x.createElement(hs.Provider, { value: m }, /* @__PURE__ */ x.createElement(Ob.Provider, { value: z.current }, /* @__PURE__ */ x.createElement(rh.Provider, { value: g }, /* @__PURE__ */ x.createElement(
    Qj,
    {
      basename: ee,
      location: m.location,
      navigationType: m.historyAction,
      navigator: G,
      unstable_useTransitions: s
    },
    /* @__PURE__ */ x.createElement(
      Xj,
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
function ay(n, a) {
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
var Xj = x.memo(Kj);
function Kj({
  routes: n,
  future: a,
  state: r,
  isStatic: s,
  onError: o
}) {
  return Mj(n, void 0, { state: r, isStatic: s, onError: o });
}
function Qj({
  basename: n = "/",
  children: a = null,
  location: r,
  navigationType: s = "POP",
  navigator: o,
  static: c = !1,
  unstable_useTransitions: h
}) {
  $e(
    !ms(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let m = n.replace(/^\/*/, "/"), v = x.useMemo(
    () => ({
      basename: m,
      navigator: o,
      static: c,
      unstable_useTransitions: h,
      future: {}
    }),
    [m, o, c, h]
  );
  typeof r == "string" && (r = ea(r));
  let {
    pathname: p = "/",
    search: b = "",
    hash: g = "",
    state: S = null,
    key: w = "default",
    unstable_mask: j
  } = r, T = x.useMemo(() => {
    let A = Fn(p, m);
    return A == null ? null : {
      location: {
        pathname: A,
        search: b,
        hash: g,
        state: S,
        key: w,
        unstable_mask: j
      },
      navigationType: s
    };
  }, [
    m,
    p,
    b,
    g,
    S,
    w,
    s,
    j
  ]);
  return Nt(
    T != null,
    `<Router basename="${m}"> is not able to match the URL "${p}${b}${g}" because it does not start with the basename, so the <Router> won't render anything.`
  ), T == null ? null : /* @__PURE__ */ x.createElement(In.Provider, { value: v }, /* @__PURE__ */ x.createElement(vu.Provider, { children: a, value: T }));
}
var Po = "get", Jo = "application/x-www-form-urlencoded";
function bu(n) {
  return typeof HTMLElement < "u" && n instanceof HTMLElement;
}
function Zj(n) {
  return bu(n) && n.tagName.toLowerCase() === "button";
}
function Pj(n) {
  return bu(n) && n.tagName.toLowerCase() === "form";
}
function Jj(n) {
  return bu(n) && n.tagName.toLowerCase() === "input";
}
function Wj(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function eT(n, a) {
  return n.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !Wj(n);
}
var Uo = null;
function tT() {
  if (Uo === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Uo = !1;
    } catch {
      Uo = !0;
    }
  return Uo;
}
var nT = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function Gd(n) {
  return n != null && !nT.has(n) ? (Nt(
    !1,
    `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Jo}"`
  ), null) : n;
}
function aT(n, a) {
  let r, s, o, c, h;
  if (Pj(n)) {
    let m = n.getAttribute("action");
    s = m ? Fn(m, a) : null, r = n.getAttribute("method") || Po, o = Gd(n.getAttribute("enctype")) || Jo, c = new FormData(n);
  } else if (Zj(n) || Jj(n) && (n.type === "submit" || n.type === "image")) {
    let m = n.form;
    if (m == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let v = n.getAttribute("formaction") || m.getAttribute("action");
    if (s = v ? Fn(v, a) : null, r = n.getAttribute("formmethod") || m.getAttribute("method") || Po, o = Gd(n.getAttribute("formenctype")) || Gd(m.getAttribute("enctype")) || Jo, c = new FormData(m, n), !tT()) {
      let { name: p, type: b, value: g } = n;
      if (b === "image") {
        let S = p ? `${p}.` : "";
        c.append(`${S}x`, "0"), c.append(`${S}y`, "0");
      } else p && c.append(p, g);
    }
  } else {
    if (bu(n))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = Po, s = null, o = Jo, h = n;
  }
  return c && o === "text/plain" && (h = c, c = void 0), { action: s, method: r.toLowerCase(), encType: o, formData: c, body: h };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function oh(n, a) {
  if (n === !1 || n === null || typeof n > "u")
    throw new Error(a);
}
function qb(n, a, r, s) {
  let o = typeof n == "string" ? new URL(
    n,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : n;
  return r ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${s}` : o.pathname = `${o.pathname}.${s}` : o.pathname === "/" ? o.pathname = `_root.${s}` : a && Fn(o.pathname, a) === "/" ? o.pathname = `${iu(a)}/_root.${s}` : o.pathname = `${iu(o.pathname)}.${s}`, o;
}
async function iT(n, a) {
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
function rT(n) {
  return n == null ? !1 : n.href == null ? n.rel === "preload" && typeof n.imageSrcSet == "string" && typeof n.imageSizes == "string" : typeof n.rel == "string" && typeof n.href == "string";
}
async function lT(n, a, r) {
  let s = await Promise.all(
    n.map(async (o) => {
      let c = a.routes[o.route.id];
      if (c) {
        let h = await iT(c, r);
        return h.links ? h.links() : [];
      }
      return [];
    })
  );
  return cT(
    s.flat(1).filter(rT).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function iy(n, a, r, s, o, c) {
  let h = (v, p) => r[p] ? v.route.id !== r[p].route.id : !0, m = (v, p) => (
    // param change, /users/123 -> /users/456
    r[p].pathname !== v.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r[p].route.path?.endsWith("*") && r[p].params["*"] !== v.params["*"]
  );
  return c === "assets" ? a.filter(
    (v, p) => h(v, p) || m(v, p)
  ) : c === "data" ? a.filter((v, p) => {
    let b = s.routes[v.route.id];
    if (!b || !b.hasLoader)
      return !1;
    if (h(v, p) || m(v, p))
      return !0;
    if (v.route.shouldRevalidate) {
      let g = v.route.shouldRevalidate({
        currentUrl: new URL(
          o.pathname + o.search + o.hash,
          window.origin
        ),
        currentParams: r[0]?.params || {},
        nextUrl: new URL(n, window.origin),
        nextParams: v.params,
        defaultShouldRevalidate: !0
      });
      if (typeof g == "boolean")
        return g;
    }
    return !0;
  }) : [];
}
function sT(n, a, { includeHydrateFallback: r } = {}) {
  return oT(
    n.map((s) => {
      let o = a.routes[s.route.id];
      if (!o) return [];
      let c = [o.module];
      return o.clientActionModule && (c = c.concat(o.clientActionModule)), o.clientLoaderModule && (c = c.concat(o.clientLoaderModule)), r && o.hydrateFallbackModule && (c = c.concat(o.hydrateFallbackModule)), o.imports && (c = c.concat(o.imports)), c;
    }).flat(1)
  );
}
function oT(n) {
  return [...new Set(n)];
}
function uT(n) {
  let a = {}, r = Object.keys(n).sort();
  for (let s of r)
    a[s] = n[s];
  return a;
}
function cT(n, a) {
  let r = /* @__PURE__ */ new Set();
  return new Set(a), n.reduce((s, o) => {
    let c = JSON.stringify(uT(o));
    return r.has(c) || (r.add(c), s.push({ key: c, link: o })), s;
  }, []);
}
function uh() {
  let n = x.useContext(Wi);
  return oh(
    n,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), n;
}
function dT() {
  let n = x.useContext(hs);
  return oh(
    n,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), n;
}
var ch = x.createContext(void 0);
ch.displayName = "FrameworkContext";
function dh() {
  let n = x.useContext(ch);
  return oh(
    n,
    "You must render this element inside a <HydratedRouter> element"
  ), n;
}
function fT(n, a) {
  let r = x.useContext(ch), [s, o] = x.useState(!1), [c, h] = x.useState(!1), { onFocus: m, onBlur: v, onMouseEnter: p, onMouseLeave: b, onTouchStart: g } = a, S = x.useRef(null);
  x.useEffect(() => {
    if (n === "render" && h(!0), n === "viewport") {
      let T = (C) => {
        C.forEach((D) => {
          h(D.isIntersecting);
        });
      }, A = new IntersectionObserver(T, { threshold: 0.5 });
      return S.current && A.observe(S.current), () => {
        A.disconnect();
      };
    }
  }, [n]), x.useEffect(() => {
    if (s) {
      let T = setTimeout(() => {
        h(!0);
      }, 100);
      return () => {
        clearTimeout(T);
      };
    }
  }, [s]);
  let w = () => {
    o(!0);
  }, j = () => {
    o(!1), h(!1);
  };
  return r ? n !== "intent" ? [c, S, {}] : [
    c,
    S,
    {
      onFocus: Xl(m, w),
      onBlur: Xl(v, j),
      onMouseEnter: Xl(p, w),
      onMouseLeave: Xl(b, j),
      onTouchStart: Xl(g, w)
    }
  ] : [!1, S, {}];
}
function Xl(n, a) {
  return (r) => {
    n && n(r), r.defaultPrevented || a(r);
  };
}
function hT({ page: n, ...a }) {
  let r = zb(), { router: s } = uh(), o = x.useMemo(
    () => gi(s.routes, n, s.basename),
    [s.routes, n, s.basename]
  );
  return o ? r ? /* @__PURE__ */ x.createElement(pT, { page: n, matches: o, ...a }) : /* @__PURE__ */ x.createElement(gT, { page: n, matches: o, ...a }) : null;
}
function mT(n) {
  let { manifest: a, routeModules: r } = dh(), [s, o] = x.useState([]);
  return x.useEffect(() => {
    let c = !1;
    return lT(n, a, r).then(
      (h) => {
        c || o(h);
      }
    ), () => {
      c = !0;
    };
  }, [n, a, r]), s;
}
function pT({
  page: n,
  matches: a,
  ...r
}) {
  let s = Ba(), { future: o } = dh(), { basename: c } = uh(), h = x.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let m = qb(
      n,
      c,
      o.unstable_trailingSlashAwareDataRequests,
      "rsc"
    ), v = !1, p = [];
    for (let b of a)
      typeof b.route.shouldRevalidate == "function" ? v = !0 : p.push(b.route.id);
    return v && p.length > 0 && m.searchParams.set("_routes", p.join(",")), [m.pathname + m.search];
  }, [
    c,
    o.unstable_trailingSlashAwareDataRequests,
    n,
    s,
    a
  ]);
  return /* @__PURE__ */ x.createElement(x.Fragment, null, h.map((m) => /* @__PURE__ */ x.createElement("link", { key: m, rel: "prefetch", as: "fetch", href: m, ...r })));
}
function gT({
  page: n,
  matches: a,
  ...r
}) {
  let s = Ba(), { future: o, manifest: c, routeModules: h } = dh(), { basename: m } = uh(), { loaderData: v, matches: p } = dT(), b = x.useMemo(
    () => iy(
      n,
      a,
      p,
      c,
      s,
      "data"
    ),
    [n, a, p, c, s]
  ), g = x.useMemo(
    () => iy(
      n,
      a,
      p,
      c,
      s,
      "assets"
    ),
    [n, a, p, c, s]
  ), S = x.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let T = /* @__PURE__ */ new Set(), A = !1;
    if (a.forEach((D) => {
      let z = c.routes[D.route.id];
      !z || !z.hasLoader || (!b.some((k) => k.route.id === D.route.id) && D.route.id in v && h[D.route.id]?.shouldRevalidate || z.hasClientLoader ? A = !0 : T.add(D.route.id));
    }), T.size === 0)
      return [];
    let C = qb(
      n,
      m,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return A && T.size > 0 && C.searchParams.set(
      "_routes",
      a.filter((D) => T.has(D.route.id)).map((D) => D.route.id).join(",")
    ), [C.pathname + C.search];
  }, [
    m,
    o.unstable_trailingSlashAwareDataRequests,
    v,
    s,
    c,
    b,
    a,
    n,
    h
  ]), w = x.useMemo(
    () => sT(g, c),
    [g, c]
  ), j = mT(g);
  return /* @__PURE__ */ x.createElement(x.Fragment, null, S.map((T) => /* @__PURE__ */ x.createElement("link", { key: T, rel: "prefetch", as: "fetch", href: T, ...r })), w.map((T) => /* @__PURE__ */ x.createElement("link", { key: T, rel: "modulepreload", href: T, ...r })), j.map(({ key: T, link: A }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ x.createElement(
      "link",
      {
        key: T,
        nonce: r.nonce,
        ...A,
        crossOrigin: A.crossOrigin ?? r.crossOrigin
      }
    )
  )));
}
function vT(...n) {
  return (a) => {
    n.forEach((r) => {
      typeof r == "function" ? r(a) : r != null && (r.current = a);
    });
  };
}
var yT = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  yT && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var $b = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, xu = x.forwardRef(
  function({
    onClick: a,
    discover: r = "render",
    prefetch: s = "none",
    relative: o,
    reloadDocument: c,
    replace: h,
    unstable_mask: m,
    state: v,
    target: p,
    to: b,
    preventScrollReset: g,
    viewTransition: S,
    unstable_defaultShouldRevalidate: w,
    ...j
  }, T) {
    let { basename: A, navigator: C, unstable_useTransitions: D } = x.useContext(In), z = typeof b == "string" && $b.test(b), k = yb(b, A);
    b = k.to;
    let W = Cj(b, { relative: o }), G = Ba(), ee = null;
    if (m) {
      let le = pu(
        m,
        [],
        G.unstable_mask ? G.unstable_mask.pathname : "/",
        !0
      );
      A !== "/" && (le.pathname = le.pathname === "/" ? A : qn([A, le.pathname])), ee = C.createHref(le);
    }
    let [R, H, Z] = fT(
      s,
      j
    ), ue = wT(b, {
      replace: h,
      unstable_mask: m,
      state: v,
      target: p,
      preventScrollReset: g,
      relative: o,
      viewTransition: S,
      unstable_defaultShouldRevalidate: w,
      unstable_useTransitions: D
    });
    function oe(le) {
      a && a(le), le.defaultPrevented || ue(le);
    }
    let ve = !(k.isExternal || c), je = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ x.createElement(
        "a",
        {
          ...j,
          ...Z,
          href: (ve ? ee : void 0) || k.absoluteURL || W,
          onClick: ve ? oe : a,
          ref: vT(T, H),
          target: p,
          "data-discover": !z && r === "render" ? "true" : void 0
        }
      )
    );
    return R && !z ? /* @__PURE__ */ x.createElement(x.Fragment, null, je, /* @__PURE__ */ x.createElement(hT, { page: W })) : je;
  }
);
xu.displayName = "Link";
var bT = x.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: r = !1,
    className: s = "",
    end: o = !1,
    style: c,
    to: h,
    viewTransition: m,
    children: v,
    ...p
  }, b) {
    let g = ps(h, { relative: p.relative }), S = Ba(), w = x.useContext(hs), { navigator: j, basename: T } = x.useContext(In), A = w != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    NT(g) && m === !0, C = j.encodeLocation ? j.encodeLocation(g).pathname : g.pathname, D = S.pathname, z = w && w.navigation && w.navigation.location ? w.navigation.location.pathname : null;
    r || (D = D.toLowerCase(), z = z ? z.toLowerCase() : null, C = C.toLowerCase()), z && T && (z = Fn(z, T) || z);
    const k = C !== "/" && C.endsWith("/") ? C.length - 1 : C.length;
    let W = D === C || !o && D.startsWith(C) && D.charAt(k) === "/", G = z != null && (z === C || !o && z.startsWith(C) && z.charAt(C.length) === "/"), ee = {
      isActive: W,
      isPending: G,
      isTransitioning: A
    }, R = W ? a : void 0, H;
    typeof s == "function" ? H = s(ee) : H = [
      s,
      W ? "active" : null,
      G ? "pending" : null,
      A ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let Z = typeof c == "function" ? c(ee) : c;
    return /* @__PURE__ */ x.createElement(
      xu,
      {
        ...p,
        "aria-current": R,
        className: H,
        ref: b,
        style: Z,
        to: h,
        viewTransition: m
      },
      typeof v == "function" ? v(ee) : v
    );
  }
);
bT.displayName = "NavLink";
var xT = x.forwardRef(
  ({
    discover: n = "render",
    fetcherKey: a,
    navigate: r,
    reloadDocument: s,
    replace: o,
    state: c,
    method: h = Po,
    action: m,
    onSubmit: v,
    relative: p,
    preventScrollReset: b,
    viewTransition: g,
    unstable_defaultShouldRevalidate: S,
    ...w
  }, j) => {
    let { unstable_useTransitions: T } = x.useContext(In), A = TT(), C = CT(m, { relative: p }), D = h.toLowerCase() === "get" ? "get" : "post", z = typeof m == "string" && $b.test(m), k = (W) => {
      if (v && v(W), W.defaultPrevented) return;
      W.preventDefault();
      let G = W.nativeEvent.submitter, ee = G?.getAttribute("formmethod") || h, R = () => A(G || W.currentTarget, {
        fetcherKey: a,
        method: ee,
        navigate: r,
        replace: o,
        state: c,
        relative: p,
        preventScrollReset: b,
        viewTransition: g,
        unstable_defaultShouldRevalidate: S
      });
      T && r !== !1 ? x.startTransition(() => R()) : R();
    };
    return /* @__PURE__ */ x.createElement(
      "form",
      {
        ref: j,
        method: D,
        action: C,
        onSubmit: s ? v : k,
        ...w,
        "data-discover": !z && n === "render" ? "true" : void 0
      }
    );
  }
);
xT.displayName = "Form";
function ST(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Yb(n) {
  let a = x.useContext(Wi);
  return $e(a, ST(n)), a;
}
function wT(n, {
  target: a,
  replace: r,
  unstable_mask: s,
  state: o,
  preventScrollReset: c,
  relative: h,
  viewTransition: m,
  unstable_defaultShouldRevalidate: v,
  unstable_useTransitions: p
} = {}) {
  let b = Qr(), g = Ba(), S = ps(n, { relative: h });
  return x.useCallback(
    (w) => {
      if (eT(w, a)) {
        w.preventDefault();
        let j = r !== void 0 ? r : fa(g) === fa(S), T = () => b(n, {
          replace: j,
          unstable_mask: s,
          state: o,
          preventScrollReset: c,
          relative: h,
          viewTransition: m,
          unstable_defaultShouldRevalidate: v
        });
        p ? x.startTransition(() => T()) : T();
      }
    },
    [
      g,
      b,
      S,
      r,
      s,
      o,
      a,
      n,
      c,
      h,
      m,
      v,
      p
    ]
  );
}
var ET = 0, jT = () => `__${String(++ET)}__`;
function TT() {
  let { router: n } = Yb(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = x.useContext(In), r = Uj(), s = n.fetch, o = n.navigate;
  return x.useCallback(
    async (c, h = {}) => {
      let { action: m, method: v, encType: p, formData: b, body: g } = aT(
        c,
        a
      );
      if (h.navigate === !1) {
        let S = h.fetcherKey || jT();
        await s(S, r, h.action || m, {
          unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: b,
          body: g,
          formMethod: h.method || v,
          formEncType: h.encType || p,
          flushSync: h.flushSync
        });
      } else
        await o(h.action || m, {
          unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: b,
          body: g,
          formMethod: h.method || v,
          formEncType: h.encType || p,
          replace: h.replace,
          state: h.state,
          fromRouteId: r,
          flushSync: h.flushSync,
          viewTransition: h.viewTransition
        });
    },
    [s, o, a, r]
  );
}
function CT(n, { relative: a } = {}) {
  let { basename: r } = x.useContext(In), s = x.useContext(ka);
  $e(s, "useFormAction must be used inside a RouteContext");
  let [o] = s.matches.slice(-1), c = { ...ps(n || ".", { relative: a }) }, h = Ba();
  if (n == null) {
    c.search = h.search;
    let m = new URLSearchParams(c.search), v = m.getAll("index");
    if (v.some((b) => b === "")) {
      m.delete("index"), v.filter((g) => g).forEach((g) => m.append("index", g));
      let b = m.toString();
      c.search = b ? `?${b}` : "";
    }
  }
  return (!n || n === ".") && o.route.index && (c.search = c.search ? c.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (c.pathname = c.pathname === "/" ? r : qn([r, c.pathname])), fa(c);
}
function NT(n, { relative: a } = {}) {
  let r = x.useContext(rh);
  $e(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = Yb(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = ps(n, { relative: a });
  if (!r.isTransitioning)
    return !1;
  let c = Fn(r.currentLocation.pathname, s) || r.currentLocation.pathname, h = Fn(r.nextLocation.pathname, s) || r.nextLocation.pathname;
  return au(o.pathname, h) != null || au(o.pathname, c) != null;
}
class Zr extends Error {
  constructor(a, r, s, o) {
    super(s), this.status = a, this.category = r, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const Ei = "/api/v1/extensions/nexus.audio.emotiontts";
async function vt(n, a) {
  const r = n.startsWith("http") ? n : `${Ei}${n}`, s = await fetch(r, {
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
    throw new Zr(
      s.status,
      o?.category ?? "unknown",
      o?.message ?? s.statusText,
      o?.requestId
    );
  }
  if (s.status !== 204)
    return await s.json();
}
function MT(n, a, r) {
  const s = n.startsWith("http") ? n : `${Ei}${n}`, o = new EventSource(s);
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
async function RT() {
  return vt("/deployments");
}
async function ry(n) {
  return vt(`/deployments/${n}`);
}
async function AT(n, a) {
  return vt(`/deployments/${n}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function ly(n) {
  return vt(`/mappings?deploymentId=${encodeURIComponent(n)}`);
}
async function fh(n, a) {
  return vt("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: n })
  });
}
async function ru(n, a, r) {
  return vt(
    `/mappings/${a}?deploymentId=${encodeURIComponent(n)}`,
    {
      method: "PATCH",
      body: JSON.stringify(r)
    }
  );
}
async function Fb(n, a) {
  await vt(
    `/mappings/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
async function _T(n) {
  return vt(`/mappings/export?deploymentId=${encodeURIComponent(n)}`);
}
async function DT(n, a, r = "error") {
  return vt("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: n, mappings: a, conflictStrategy: r })
  });
}
async function zT(n, a = {}) {
  const r = new URLSearchParams();
  a.limit && r.set("limit", String(a.limit)), a.status && r.set("status", a.status);
  const s = r.toString(), o = s ? `?${s}` : "";
  return vt(`/deployments/${n}/runs${o}`);
}
async function OT(n, a) {
  return vt(`/deployments/${n}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function hh(n, a) {
  return vt(`/deployments/${n}/runs/${a}`);
}
async function LT(n, a) {
  return vt(`/deployments/${n}/runs/${a}/cancel`, { method: "POST" });
}
async function Ib(n, a) {
  return vt(`/deployments/${n}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function UT(n, a) {
  return vt(`/deployments/${n}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function sy(n, a, r, s) {
  return MT(
    `/deployments/${n}/runs/${a}/progress`,
    r,
    s
  );
}
async function ss(n) {
  return vt(`/voice-assets?deploymentId=${encodeURIComponent(n)}`);
}
async function Gb(n, a, r, s, o) {
  const c = new FormData();
  c.append("deploymentId", n), c.append("displayName", r), c.append("kind", s), c.append("audio", a);
  const h = await fetch(`${Ei}/voice-assets`, {
    method: "POST",
    body: c
  });
  if (!h.ok)
    throw new Error(`upload failed: ${h.status}`);
  return await h.json();
}
async function VT(n) {
  return vt(`/workflow?deploymentId=${encodeURIComponent(n)}`);
}
var kT = "mux0i60", BT = "mux0i61", HT = "mux0i62", qT = "mux0i63";
function vs({ count: n = "0", title: a, hint: r }) {
  return /* @__PURE__ */ f.jsxs("div", { className: kT, children: [
    /* @__PURE__ */ f.jsx("span", { className: BT, "aria-hidden": "true", children: n }),
    /* @__PURE__ */ f.jsx("h3", { className: HT, children: a }),
    r ? /* @__PURE__ */ f.jsx("p", { className: qT, children: r }) : null
  ] });
}
var $T = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, YT = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, FT = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, IT = "zwn3019";
function Ua({
  tone: n = "raised",
  density: a = "comfortable",
  elevation: r = "subtle",
  as: s = "section",
  children: o,
  className: c,
  style: h,
  ...m
}) {
  const v = [$T[n], FT[a], YT[r], c].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsx(s, { className: v, style: h, "data-elevation": r, ...m, children: o });
}
function GT({ children: n, className: a }) {
  const r = [IT, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsx("div", { className: r, children: n });
}
var Zi = "vrkn5p0", XT = "_93p6291", KT = "_93p6292", QT = "_93p6293", ZT = "_93p6294", PT = "_93p6295", JT = "_93p6296", WT = "_93p6297", eC = "_93p6298", tC = "_93p6299", nC = "_93p629a", aC = "_93p629b", iC = "_93p629c", rC = "_93p629d", lC = "_93p629e";
function sC() {
  const { deployments: n } = gs(), a = n.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ f.jsxs("main", { className: XT, children: [
    /* @__PURE__ */ f.jsxs("header", { className: KT, children: [
      /* @__PURE__ */ f.jsx("p", { className: QT, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ f.jsxs("h1", { className: ZT, children: [
        "Direct your characters.",
        /* @__PURE__ */ f.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ f.jsx("p", { className: PT, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ f.jsxs("p", { className: JT, children: [
        /* @__PURE__ */ f.jsx("span", { className: WT, children: n.length }),
        /* @__PURE__ */ f.jsxs("span", { children: [
          a,
          " ready"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ f.jsxs(
      Ua,
      {
        density: "airy",
        elevation: "raised",
        className: eC,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ f.jsx("h2", { id: "deployments-section-list", className: Zi, children: "01 / Deployments" }),
          n.length === 0 ? /* @__PURE__ */ f.jsx(
            vs,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ f.jsx("ul", { className: tC, children: n.map((r) => /* @__PURE__ */ f.jsx("li", { children: /* @__PURE__ */ f.jsxs(xu, { to: `/${r.deploymentId}/recipe`, className: nC, children: [
            /* @__PURE__ */ f.jsx("span", { className: aC, "aria-hidden": "true", children: oC(r.displayName) }),
            /* @__PURE__ */ f.jsxs("span", { children: [
              /* @__PURE__ */ f.jsx("span", { className: iC, children: r.displayName }),
              /* @__PURE__ */ f.jsx("span", { className: rC, children: r.deploymentId })
            ] }),
            /* @__PURE__ */ f.jsx("span", { className: lC, "aria-hidden": "true", children: "→" })
          ] }) }, r.deploymentId)) })
        ]
      }
    )
  ] });
}
function oC(n) {
  const a = n.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
var uC = db();
const cC = /* @__PURE__ */ cb(uC);
function dC(n) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
  r.type = "text/css", a.appendChild(r), r.styleSheet ? r.styleSheet.cssText = n : r.appendChild(document.createTextNode(n));
}
const fC = (n) => {
  switch (n) {
    case "success":
      return pC;
    case "info":
      return vC;
    case "warning":
      return gC;
    case "error":
      return yC;
    default:
      return null;
  }
}, hC = Array(12).fill(0), mC = ({ visible: n, className: a }) => /* @__PURE__ */ de.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": n
}, /* @__PURE__ */ de.createElement("div", {
  className: "sonner-spinner"
}, hC.map((r, s) => /* @__PURE__ */ de.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${s}`
})))), pC = /* @__PURE__ */ de.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ de.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), gC = /* @__PURE__ */ de.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ de.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), vC = /* @__PURE__ */ de.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ de.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), yC = /* @__PURE__ */ de.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ de.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), bC = /* @__PURE__ */ de.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ de.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ de.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})), xC = () => {
  const [n, a] = de.useState(document.hidden);
  return de.useEffect(() => {
    const r = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", r), () => window.removeEventListener("visibilitychange", r);
  }, []), n;
};
let Tf = 1;
class SC {
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
      const { message: s, ...o } = a, c = typeof a?.id == "number" || ((r = a.id) == null ? void 0 : r.length) > 0 ? a.id : Tf++, h = this.toasts.find((v) => v.id === c), m = a.dismissible === void 0 ? !0 : a.dismissible;
      return this.dismissedToasts.has(c) && this.dismissedToasts.delete(c), h ? this.toasts = this.toasts.map((v) => v.id === c ? (this.publish({
        ...v,
        ...a,
        id: c,
        title: s
      }), {
        ...v,
        ...a,
        id: c,
        dismissible: m,
        title: s
      }) : v) : this.addToast({
        title: s,
        ...o,
        dismissible: m,
        id: c
      }), c;
    }, this.dismiss = (a) => (a ? (this.dismissedToasts.add(a), requestAnimationFrame(() => this.subscribers.forEach((r) => r({
      id: a,
      dismiss: !0
    })))) : this.toasts.forEach((r) => {
      this.subscribers.forEach((s) => s({
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
      let s;
      r.loading !== void 0 && (s = this.create({
        ...r,
        promise: a,
        type: "loading",
        message: r.loading,
        description: typeof r.description != "function" ? r.description : void 0
      }));
      const o = Promise.resolve(a instanceof Function ? a() : a);
      let c = s !== void 0, h;
      const m = o.then(async (p) => {
        if (h = [
          "resolve",
          p
        ], de.isValidElement(p))
          c = !1, this.create({
            id: s,
            type: "default",
            message: p
          });
        else if (EC(p) && !p.ok) {
          c = !1;
          const g = typeof r.error == "function" ? await r.error(`HTTP error! status: ${p.status}`) : r.error, S = typeof r.description == "function" ? await r.description(`HTTP error! status: ${p.status}`) : r.description, j = typeof g == "object" && !de.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: s,
            type: "error",
            description: S,
            ...j
          });
        } else if (p instanceof Error) {
          c = !1;
          const g = typeof r.error == "function" ? await r.error(p) : r.error, S = typeof r.description == "function" ? await r.description(p) : r.description, j = typeof g == "object" && !de.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: s,
            type: "error",
            description: S,
            ...j
          });
        } else if (r.success !== void 0) {
          c = !1;
          const g = typeof r.success == "function" ? await r.success(p) : r.success, S = typeof r.description == "function" ? await r.description(p) : r.description, j = typeof g == "object" && !de.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: s,
            type: "success",
            description: S,
            ...j
          });
        }
      }).catch(async (p) => {
        if (h = [
          "reject",
          p
        ], r.error !== void 0) {
          c = !1;
          const b = typeof r.error == "function" ? await r.error(p) : r.error, g = typeof r.description == "function" ? await r.description(p) : r.description, w = typeof b == "object" && !de.isValidElement(b) ? b : {
            message: b
          };
          this.create({
            id: s,
            type: "error",
            description: g,
            ...w
          });
        }
      }).finally(() => {
        c && (this.dismiss(s), s = void 0), r.finally == null || r.finally.call(r);
      }), v = () => new Promise((p, b) => m.then(() => h[0] === "reject" ? b(h[1]) : p(h[1])).catch(b));
      return typeof s != "string" && typeof s != "number" ? {
        unwrap: v
      } : Object.assign(s, {
        unwrap: v
      });
    }, this.custom = (a, r) => {
      const s = r?.id || Tf++;
      return this.create({
        jsx: a(s),
        id: s,
        ...r
      }), s;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const mn = new SC(), wC = (n, a) => {
  const r = a?.id || Tf++;
  return mn.addToast({
    title: n,
    ...a,
    id: r
  }), r;
}, EC = (n) => n && typeof n == "object" && "ok" in n && typeof n.ok == "boolean" && "status" in n && typeof n.status == "number", jC = wC, TC = () => mn.toasts, CC = () => mn.getActiveToasts(), oy = Object.assign(jC, {
  success: mn.success,
  info: mn.info,
  warning: mn.warning,
  error: mn.error,
  custom: mn.custom,
  message: mn.message,
  promise: mn.promise,
  dismiss: mn.dismiss,
  loading: mn.loading
}, {
  getHistory: TC,
  getToasts: CC
});
dC("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Vo(n) {
  return n.label !== void 0;
}
const NC = 3, MC = "24px", RC = "16px", uy = 4e3, AC = 356, _C = 14, DC = 45, zC = 200;
function da(...n) {
  return n.filter(Boolean).join(" ");
}
function OC(n) {
  const [a, r] = n.split("-"), s = [];
  return a && s.push(a), r && s.push(r), s;
}
const LC = (n) => {
  var a, r, s, o, c, h, m, v, p;
  const { invert: b, toast: g, unstyled: S, interacting: w, setHeights: j, visibleToasts: T, heights: A, index: C, toasts: D, expanded: z, removeToast: k, defaultRichColors: W, closeButton: G, style: ee, cancelButtonStyle: R, actionButtonStyle: H, className: Z = "", descriptionClassName: ue = "", duration: oe, position: ve, gap: je, expandByDefault: le, classNames: L, icons: U, closeButtonAriaLabel: q = "Close toast" } = n, [Q, ae] = de.useState(null), [N, X] = de.useState(null), [P, ie] = de.useState(!1), [fe, ye] = de.useState(!1), [Me, Ae] = de.useState(!1), [se, De] = de.useState(!1), [Oe, _e] = de.useState(!1), [We, ft] = de.useState(0), [Mn, ta] = de.useState(0), Ft = de.useRef(g.duration || oe || uy), ha = de.useRef(null), Mt = de.useRef(null), na = C === 0, ma = C + 1 <= T, Vt = g.type, Rn = g.dismissible !== !1, he = g.className || "", Le = g.descriptionClassName || "", Be = de.useMemo(() => A.findIndex((ze) => ze.toastId === g.id) || 0, [
    A,
    g.id
  ]), ht = de.useMemo(() => {
    var ze;
    return (ze = g.closeButton) != null ? ze : G;
  }, [
    g.closeButton,
    G
  ]), nn = de.useMemo(() => g.duration || oe || uy, [
    g.duration,
    oe
  ]), an = de.useRef(0), kt = de.useRef(0), Ti = de.useRef(0), aa = de.useRef(null), [Gn, It] = ve.split("-"), Et = de.useMemo(() => A.reduce((ze, ot, Rt) => Rt >= Be ? ze : ze + ot.height, 0), [
    A,
    Be
  ]), Bt = xC(), er = g.invert || b, qa = Vt === "loading";
  kt.current = de.useMemo(() => Be * je + Et, [
    Be,
    Et
  ]), de.useEffect(() => {
    Ft.current = nn;
  }, [
    nn
  ]), de.useEffect(() => {
    ie(!0);
  }, []), de.useEffect(() => {
    const ze = Mt.current;
    if (ze) {
      const ot = ze.getBoundingClientRect().height;
      return ta(ot), j((Rt) => [
        {
          toastId: g.id,
          height: ot,
          position: g.position
        },
        ...Rt
      ]), () => j((Rt) => Rt.filter((Ht) => Ht.toastId !== g.id));
    }
  }, [
    j,
    g.id
  ]), de.useLayoutEffect(() => {
    if (!P) return;
    const ze = Mt.current, ot = ze.style.height;
    ze.style.height = "auto";
    const Rt = ze.getBoundingClientRect().height;
    ze.style.height = ot, ta(Rt), j((Ht) => Ht.find((at) => at.toastId === g.id) ? Ht.map((at) => at.toastId === g.id ? {
      ...at,
      height: Rt
    } : at) : [
      {
        toastId: g.id,
        height: Rt,
        position: g.position
      },
      ...Ht
    ]);
  }, [
    P,
    g.title,
    g.description,
    j,
    g.id,
    g.jsx,
    g.action,
    g.cancel
  ]);
  const An = de.useCallback(() => {
    ye(!0), ft(kt.current), j((ze) => ze.filter((ot) => ot.toastId !== g.id)), setTimeout(() => {
      k(g);
    }, zC);
  }, [
    g,
    k,
    j,
    kt
  ]);
  de.useEffect(() => {
    if (g.promise && Vt === "loading" || g.duration === 1 / 0 || g.type === "loading") return;
    let ze;
    return z || w || Bt ? (() => {
      if (Ti.current < an.current) {
        const Ht = (/* @__PURE__ */ new Date()).getTime() - an.current;
        Ft.current = Ft.current - Ht;
      }
      Ti.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      Ft.current !== 1 / 0 && (an.current = (/* @__PURE__ */ new Date()).getTime(), ze = setTimeout(() => {
        g.onAutoClose == null || g.onAutoClose.call(g, g), An();
      }, Ft.current));
    })(), () => clearTimeout(ze);
  }, [
    z,
    w,
    g,
    Vt,
    Bt,
    An
  ]), de.useEffect(() => {
    g.delete && (An(), g.onDismiss == null || g.onDismiss.call(g, g));
  }, [
    An,
    g.delete
  ]);
  function pa() {
    var ze;
    if (U?.loading) {
      var ot;
      return /* @__PURE__ */ de.createElement("div", {
        className: da(L?.loader, g == null || (ot = g.classNames) == null ? void 0 : ot.loader, "sonner-loader"),
        "data-visible": Vt === "loading"
      }, U.loading);
    }
    return /* @__PURE__ */ de.createElement(mC, {
      className: da(L?.loader, g == null || (ze = g.classNames) == null ? void 0 : ze.loader),
      visible: Vt === "loading"
    });
  }
  const Xn = g.icon || U?.[Vt] || fC(Vt);
  var ia, sn;
  return /* @__PURE__ */ de.createElement("li", {
    tabIndex: 0,
    ref: Mt,
    className: da(Z, he, L?.toast, g == null || (a = g.classNames) == null ? void 0 : a.toast, L?.default, L?.[Vt], g == null || (r = g.classNames) == null ? void 0 : r[Vt]),
    "data-sonner-toast": "",
    "data-rich-colors": (ia = g.richColors) != null ? ia : W,
    "data-styled": !(g.jsx || g.unstyled || S),
    "data-mounted": P,
    "data-promise": !!g.promise,
    "data-swiped": Oe,
    "data-removed": fe,
    "data-visible": ma,
    "data-y-position": Gn,
    "data-x-position": It,
    "data-index": C,
    "data-front": na,
    "data-swiping": Me,
    "data-dismissible": Rn,
    "data-type": Vt,
    "data-invert": er,
    "data-swipe-out": se,
    "data-swipe-direction": N,
    "data-expanded": !!(z || le && P),
    "data-testid": g.testId,
    style: {
      "--index": C,
      "--toasts-before": C,
      "--z-index": D.length - C,
      "--offset": `${fe ? We : kt.current}px`,
      "--initial-height": le ? "auto" : `${Mn}px`,
      ...ee,
      ...g.style
    },
    onDragEnd: () => {
      Ae(!1), ae(null), aa.current = null;
    },
    onPointerDown: (ze) => {
      ze.button !== 2 && (qa || !Rn || (ha.current = /* @__PURE__ */ new Date(), ft(kt.current), ze.target.setPointerCapture(ze.pointerId), ze.target.tagName !== "BUTTON" && (Ae(!0), aa.current = {
        x: ze.clientX,
        y: ze.clientY
      })));
    },
    onPointerUp: () => {
      var ze, ot, Rt;
      if (se || !Rn) return;
      aa.current = null;
      const Ht = Number(((ze = Mt.current) == null ? void 0 : ze.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), gn = Number(((ot = Mt.current) == null ? void 0 : ot.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), at = (/* @__PURE__ */ new Date()).getTime() - ((Rt = ha.current) == null ? void 0 : Rt.getTime()), Gt = Q === "x" ? Ht : gn, ga = Math.abs(Gt) / at;
      if (Math.abs(Gt) >= DC || ga > 0.11) {
        ft(kt.current), g.onDismiss == null || g.onDismiss.call(g, g), X(Q === "x" ? Ht > 0 ? "right" : "left" : gn > 0 ? "down" : "up"), An(), De(!0);
        return;
      } else {
        var Pt, M;
        (Pt = Mt.current) == null || Pt.style.setProperty("--swipe-amount-x", "0px"), (M = Mt.current) == null || M.style.setProperty("--swipe-amount-y", "0px");
      }
      _e(!1), Ae(!1), ae(null);
    },
    onPointerMove: (ze) => {
      var ot, Rt, Ht;
      if (!aa.current || !Rn || ((ot = window.getSelection()) == null ? void 0 : ot.toString().length) > 0) return;
      const at = ze.clientY - aa.current.y, Gt = ze.clientX - aa.current.x;
      var ga;
      const Pt = (ga = n.swipeDirections) != null ? ga : OC(ve);
      !Q && (Math.abs(Gt) > 1 || Math.abs(at) > 1) && ae(Math.abs(Gt) > Math.abs(at) ? "x" : "y");
      let M = {
        x: 0,
        y: 0
      };
      const V = ($) => 1 / (1.5 + Math.abs($) / 20);
      if (Q === "y") {
        if (Pt.includes("top") || Pt.includes("bottom"))
          if (Pt.includes("top") && at < 0 || Pt.includes("bottom") && at > 0)
            M.y = at;
          else {
            const $ = at * V(at);
            M.y = Math.abs($) < Math.abs(at) ? $ : at;
          }
      } else if (Q === "x" && (Pt.includes("left") || Pt.includes("right")))
        if (Pt.includes("left") && Gt < 0 || Pt.includes("right") && Gt > 0)
          M.x = Gt;
        else {
          const $ = Gt * V(Gt);
          M.x = Math.abs($) < Math.abs(Gt) ? $ : Gt;
        }
      (Math.abs(M.x) > 0 || Math.abs(M.y) > 0) && _e(!0), (Rt = Mt.current) == null || Rt.style.setProperty("--swipe-amount-x", `${M.x}px`), (Ht = Mt.current) == null || Ht.style.setProperty("--swipe-amount-y", `${M.y}px`);
    }
  }, ht && !g.jsx && Vt !== "loading" ? /* @__PURE__ */ de.createElement("button", {
    "aria-label": q,
    "data-disabled": qa,
    "data-close-button": !0,
    onClick: qa || !Rn ? () => {
    } : () => {
      An(), g.onDismiss == null || g.onDismiss.call(g, g);
    },
    className: da(L?.closeButton, g == null || (s = g.classNames) == null ? void 0 : s.closeButton)
  }, (sn = U?.close) != null ? sn : bC) : null, (Vt || g.icon || g.promise) && g.icon !== null && (U?.[Vt] !== null || g.icon) ? /* @__PURE__ */ de.createElement("div", {
    "data-icon": "",
    className: da(L?.icon, g == null || (o = g.classNames) == null ? void 0 : o.icon)
  }, g.promise || g.type === "loading" && !g.icon ? g.icon || pa() : null, g.type !== "loading" ? Xn : null) : null, /* @__PURE__ */ de.createElement("div", {
    "data-content": "",
    className: da(L?.content, g == null || (c = g.classNames) == null ? void 0 : c.content)
  }, /* @__PURE__ */ de.createElement("div", {
    "data-title": "",
    className: da(L?.title, g == null || (h = g.classNames) == null ? void 0 : h.title)
  }, g.jsx ? g.jsx : typeof g.title == "function" ? g.title() : g.title), g.description ? /* @__PURE__ */ de.createElement("div", {
    "data-description": "",
    className: da(ue, Le, L?.description, g == null || (m = g.classNames) == null ? void 0 : m.description)
  }, typeof g.description == "function" ? g.description() : g.description) : null), /* @__PURE__ */ de.isValidElement(g.cancel) ? g.cancel : g.cancel && Vo(g.cancel) ? /* @__PURE__ */ de.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: g.cancelButtonStyle || R,
    onClick: (ze) => {
      Vo(g.cancel) && Rn && (g.cancel.onClick == null || g.cancel.onClick.call(g.cancel, ze), An());
    },
    className: da(L?.cancelButton, g == null || (v = g.classNames) == null ? void 0 : v.cancelButton)
  }, g.cancel.label) : null, /* @__PURE__ */ de.isValidElement(g.action) ? g.action : g.action && Vo(g.action) ? /* @__PURE__ */ de.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: g.actionButtonStyle || H,
    onClick: (ze) => {
      Vo(g.action) && (g.action.onClick == null || g.action.onClick.call(g.action, ze), !ze.defaultPrevented && An());
    },
    className: da(L?.actionButton, g == null || (p = g.classNames) == null ? void 0 : p.actionButton)
  }, g.action.label) : null);
};
function cy() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const n = document.documentElement.getAttribute("dir");
  return n === "auto" || !n ? window.getComputedStyle(document.documentElement).direction : n;
}
function UC(n, a) {
  const r = {};
  return [
    n,
    a
  ].forEach((s, o) => {
    const c = o === 1, h = c ? "--mobile-offset" : "--offset", m = c ? RC : MC;
    function v(p) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((b) => {
        r[`${h}-${b}`] = typeof p == "number" ? `${p}px` : p;
      });
    }
    typeof s == "number" || typeof s == "string" ? v(s) : typeof s == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((p) => {
      s[p] === void 0 ? r[`${h}-${p}`] = m : r[`${h}-${p}`] = typeof s[p] == "number" ? `${s[p]}px` : s[p];
    }) : v(m);
  }), r;
}
const VC = /* @__PURE__ */ de.forwardRef(function(a, r) {
  const { id: s, invert: o, position: c = "bottom-right", hotkey: h = [
    "altKey",
    "KeyT"
  ], expand: m, closeButton: v, className: p, offset: b, mobileOffset: g, theme: S = "light", richColors: w, duration: j, style: T, visibleToasts: A = NC, toastOptions: C, dir: D = cy(), gap: z = _C, icons: k, containerAriaLabel: W = "Notifications" } = a, [G, ee] = de.useState([]), R = de.useMemo(() => s ? G.filter((P) => P.toasterId === s) : G.filter((P) => !P.toasterId), [
    G,
    s
  ]), H = de.useMemo(() => Array.from(new Set([
    c
  ].concat(R.filter((P) => P.position).map((P) => P.position)))), [
    R,
    c
  ]), [Z, ue] = de.useState([]), [oe, ve] = de.useState(!1), [je, le] = de.useState(!1), [L, U] = de.useState(S !== "system" ? S : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), q = de.useRef(null), Q = h.join("+").replace(/Key/g, "").replace(/Digit/g, ""), ae = de.useRef(null), N = de.useRef(!1), X = de.useCallback((P) => {
    ee((ie) => {
      var fe;
      return (fe = ie.find((ye) => ye.id === P.id)) != null && fe.delete || mn.dismiss(P.id), ie.filter(({ id: ye }) => ye !== P.id);
    });
  }, []);
  return de.useEffect(() => mn.subscribe((P) => {
    if (P.dismiss) {
      requestAnimationFrame(() => {
        ee((ie) => ie.map((fe) => fe.id === P.id ? {
          ...fe,
          delete: !0
        } : fe));
      });
      return;
    }
    setTimeout(() => {
      cC.flushSync(() => {
        ee((ie) => {
          const fe = ie.findIndex((ye) => ye.id === P.id);
          return fe !== -1 ? [
            ...ie.slice(0, fe),
            {
              ...ie[fe],
              ...P
            },
            ...ie.slice(fe + 1)
          ] : [
            P,
            ...ie
          ];
        });
      });
    });
  }), [
    G
  ]), de.useEffect(() => {
    if (S !== "system") {
      U(S);
      return;
    }
    if (S === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? U("dark") : U("light")), typeof window > "u") return;
    const P = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      P.addEventListener("change", ({ matches: ie }) => {
        U(ie ? "dark" : "light");
      });
    } catch {
      P.addListener(({ matches: fe }) => {
        try {
          U(fe ? "dark" : "light");
        } catch (ye) {
          console.error(ye);
        }
      });
    }
  }, [
    S
  ]), de.useEffect(() => {
    G.length <= 1 && ve(!1);
  }, [
    G
  ]), de.useEffect(() => {
    const P = (ie) => {
      var fe;
      if (h.every((Ae) => ie[Ae] || ie.code === Ae)) {
        var Me;
        ve(!0), (Me = q.current) == null || Me.focus();
      }
      ie.code === "Escape" && (document.activeElement === q.current || (fe = q.current) != null && fe.contains(document.activeElement)) && ve(!1);
    };
    return document.addEventListener("keydown", P), () => document.removeEventListener("keydown", P);
  }, [
    h
  ]), de.useEffect(() => {
    if (q.current)
      return () => {
        ae.current && (ae.current.focus({
          preventScroll: !0
        }), ae.current = null, N.current = !1);
      };
  }, [
    q.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ de.createElement("section", {
    ref: r,
    "aria-label": `${W} ${Q}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, H.map((P, ie) => {
    var fe;
    const [ye, Me] = P.split("-");
    return R.length ? /* @__PURE__ */ de.createElement("ol", {
      key: P,
      dir: D === "auto" ? cy() : D,
      tabIndex: -1,
      ref: q,
      className: p,
      "data-sonner-toaster": !0,
      "data-sonner-theme": L,
      "data-y-position": ye,
      "data-x-position": Me,
      style: {
        "--front-toast-height": `${((fe = Z[0]) == null ? void 0 : fe.height) || 0}px`,
        "--width": `${AC}px`,
        "--gap": `${z}px`,
        ...T,
        ...UC(b, g)
      },
      onBlur: (Ae) => {
        N.current && !Ae.currentTarget.contains(Ae.relatedTarget) && (N.current = !1, ae.current && (ae.current.focus({
          preventScroll: !0
        }), ae.current = null));
      },
      onFocus: (Ae) => {
        Ae.target instanceof HTMLElement && Ae.target.dataset.dismissible === "false" || N.current || (N.current = !0, ae.current = Ae.relatedTarget);
      },
      onMouseEnter: () => ve(!0),
      onMouseMove: () => ve(!0),
      onMouseLeave: () => {
        je || ve(!1);
      },
      onDragEnd: () => ve(!1),
      onPointerDown: (Ae) => {
        Ae.target instanceof HTMLElement && Ae.target.dataset.dismissible === "false" || le(!0);
      },
      onPointerUp: () => le(!1)
    }, R.filter((Ae) => !Ae.position && ie === 0 || Ae.position === P).map((Ae, se) => {
      var De, Oe;
      return /* @__PURE__ */ de.createElement(LC, {
        key: Ae.id,
        icons: k,
        index: se,
        toast: Ae,
        defaultRichColors: w,
        duration: (De = C?.duration) != null ? De : j,
        className: C?.className,
        descriptionClassName: C?.descriptionClassName,
        invert: o,
        visibleToasts: A,
        closeButton: (Oe = C?.closeButton) != null ? Oe : v,
        interacting: je,
        position: P,
        style: C?.style,
        unstyled: C?.unstyled,
        classNames: C?.classNames,
        cancelButtonStyle: C?.cancelButtonStyle,
        actionButtonStyle: C?.actionButtonStyle,
        closeButtonAriaLabel: C?.closeButtonAriaLabel,
        removeToast: X,
        toasts: R.filter((_e) => _e.position == Ae.position),
        heights: Z.filter((_e) => _e.position == Ae.position),
        setHeights: ue,
        expandByDefault: m,
        gap: z,
        expanded: oe,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), dy = 32, fy = -30, hy = -6, my = 0.5, py = 2, gy = -24, vy = 24, yy = -12, by = 12, xy = -12, Sy = 12, wy = -60, Ey = -20;
class Gr extends Error {
  constructor(a, r) {
    super(r), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function kC(n, a, r, s = {}) {
  const o = `/voice-assets/${encodeURIComponent(n)}/edit?deploymentId=${encodeURIComponent(a)}`, c = `${Ei}${o}`, h = await fetch(c, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(r),
    ...s.signal ? { signal: s.signal } : {}
  });
  if (h.status === 409) {
    const m = await h.json().catch(() => null), v = m?.error?.current_digest ?? "", p = m?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Gr(v, p);
  }
  if (!h.ok)
    throw new Error(await Su(h, "apply"));
  return await h.json();
}
async function BC(n, a, r, s, o = {}) {
  const c = `/deployments/${encodeURIComponent(n)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(r)}/edit`, h = `${Ei}${c}`, m = await fetch(h, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(s),
    ...o.signal ? { signal: o.signal } : {}
  });
  if (m.status === 409) {
    const v = await m.json().catch(() => null), p = v?.error?.current_digest ?? "", b = v?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Gr(p, b);
  }
  if (!m.ok)
    throw new Error(await Su(m, "apply"));
  return await m.json();
}
async function HC(n, a, r = {}) {
  const s = `${Ei}/voice-assets/${encodeURIComponent(n)}/edit?deploymentId=${encodeURIComponent(a)}`, o = await fetch(s, {
    method: "DELETE",
    ...r.signal ? { signal: r.signal } : {}
  });
  if (!o.ok && o.status !== 204)
    throw new Error(`clear edit failed: ${o.status}`);
}
async function qC(n, a, r, s = {}) {
  const o = `${Ei}/voice-assets/${encodeURIComponent(n)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, c = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain: r }),
    ...s.signal ? { signal: s.signal } : {}
  });
  if (!c.ok)
    throw new Error(await Su(c, "preview"));
  return c.blob();
}
async function Cf(n, a, r, s = 50, o = {}) {
  const c = `${Ei}/audit/${encodeURIComponent(a)}/${encodeURIComponent(r)}?deploymentId=${encodeURIComponent(n)}&limit=${encodeURIComponent(String(s))}`, h = await fetch(c, {
    method: "GET",
    headers: { accept: "application/json" },
    ...o.signal ? { signal: o.signal } : {}
  });
  if (!h.ok)
    throw new Error(await Su(h, "audit fetch"));
  return await h.json();
}
function pn() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function Xb(n, a) {
  if (n.version !== 1)
    return { message: "Unsupported chain version." };
  if (n.ops.length > dy)
    return {
      message: `Chain exceeds the maximum of ${dy} operations.`
    };
  for (const r of n.ops) {
    const s = $C(r, a);
    if (s) return s;
  }
  return null;
}
function $C(n, a) {
  switch (n.mode) {
    case "trim":
    case "crop":
    case "mute":
      return YC(n.id, n.start_ms, n.end_ms, a);
    case "normalize":
      return n.target_lufs < fy || n.target_lufs > hy ? {
        opId: n.id,
        message: `Normalize target must be between ${fy} and ${hy} LUFS.`
      } : null;
    case "speed":
      return n.factor < my || n.factor > py ? {
        opId: n.id,
        message: `Speed factor must be between ${my}× and ${py}×.`
      } : null;
    case "fade_in":
    case "fade_out":
      return n.duration_ms < 1 ? { opId: n.id, message: "Fade duration must be at least 1 ms." } : null;
    case "gain":
      return n.gain_db < gy || n.gain_db > vy ? {
        opId: n.id,
        message: `Volume must be between ${gy} and ${vy} dB.`
      } : null;
    case "eq3":
      for (const [r, s] of [
        ["low_db", n.low_db],
        ["mid_db", n.mid_db],
        ["high_db", n.high_db]
      ])
        if (s < yy || s > by)
          return {
            opId: n.id,
            message: `EQ ${r} must be between ${yy} and ${by} dB.`
          };
      return null;
    case "pitch_shift":
      return n.semitones < xy || n.semitones > Sy ? {
        opId: n.id,
        message: `Pitch must be between ${xy} and ${Sy} semitones.`
      } : null;
    case "silence_strip":
      return n.threshold_db < wy || n.threshold_db > Ey ? {
        opId: n.id,
        message: `Silence threshold must be between ${wy} and ${Ey} dB.`
      } : null;
    default:
      return {
        message: "Unknown edit op mode in chain — refusing to apply."
      };
  }
}
function YC(n, a, r, s) {
  return a < 0 ? { opId: n, message: "Start must be ≥ 0 ms." } : r <= a ? { opId: n, message: "End must be greater than start." } : s > 0 && r > s ? { opId: n, message: "End extends past source duration." } : null;
}
async function Su(n, a) {
  const r = await n.json().catch(() => null);
  return r?.error?.message ?? r?.message ?? `${a} failed: ${n.status}`;
}
async function Kb(n) {
  return vt(`/presets?deploymentId=${encodeURIComponent(n)}`);
}
async function FC(n, a, r) {
  return vt("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: n, presetName: a, vector: r })
  });
}
async function IC(n, a) {
  await vt(
    `/presets/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
var jy = "_190jlds0", GC = "_190jlds1", XC = "_190jlds2", KC = "_190jlds3", QC = "_190jlds4", ZC = "_190jlds7", PC = "_190jlds8", JC = "_190jlds9", WC = "_190jldsa", eN = "_190jldsb", Ty = "_190jldsc", tN = "_190jldsd", Cy = "_190jldse", nN = "_190jldsf", aN = "_190jldsg", iN = "_190jldsh", Qb = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, Zb = { sm: "_4ydn546", md: "_4ydn547", lg: "_4ydn548" };
function Je({
  variant: n = "primary",
  size: a = "md",
  type: r = "button",
  loading: s = !1,
  disabled: o,
  children: c,
  className: h,
  style: m,
  ...v
}) {
  const p = [Qb[n], Zb[a], h].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsx(
    "button",
    {
      type: r,
      className: p,
      style: m,
      disabled: s || o,
      "aria-busy": s || void 0,
      ...v,
      children: c
    }
  );
}
function rN({
  deploymentId: n,
  targets: a,
  onRevertToIdentity: r,
  emptyHint: s
}) {
  const [o, c] = x.useState(() => Vr(a[0])), [h, m] = x.useState([]), [v, p] = x.useState(!1), [b, g] = x.useState(null), [S, w] = x.useState(!1), j = x.useMemo(
    () => a.find((C) => Vr(C) === o) ?? a[0],
    [a, o]
  );
  x.useEffect(() => {
    a.length && (a.some((C) => Vr(C) === o) || c(Vr(a[0])));
  }, [a, o]), x.useEffect(() => {
    if (!j) {
      m([]);
      return;
    }
    let C = !1;
    return p(!0), g(null), Cf(n, j.kind, j.id, 50).then((D) => {
      C || m(D.entries);
    }).catch((D) => {
      C || g(D instanceof Error ? D.message : "audit fetch failed");
    }).finally(() => {
      C || p(!1);
    }), () => {
      C = !0;
    };
  }, [n, j]);
  const T = x.useCallback(() => {
    if (!j) return;
    const C = {
      deploymentId: n,
      targetKind: j.kind,
      targetId: j.id,
      targetLabel: j.label,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      entries: h
    }, D = new Blob([JSON.stringify(C, null, 2)], {
      type: "application/json"
    }), z = URL.createObjectURL(D), k = document.createElement("a");
    k.href = z, k.download = `audit-${j.kind}-${j.id}-${Date.now()}.json`, document.body.appendChild(k), k.click(), document.body.removeChild(k), URL.revokeObjectURL(z);
  }, [n, h, j]), A = x.useCallback(async () => {
    if (!(!j || !r) && window.confirm(
      `Revert "${j.label}" to identity (no edits)? This will write a new audit entry.`
    )) {
      w(!0);
      try {
        await r(j);
        const C = await Cf(n, j.kind, j.id, 50);
        m(C.entries);
      } catch (C) {
        g(C instanceof Error ? C.message : "revert failed");
      } finally {
        w(!1);
      }
    }
  }, [n, r, j]);
  return a.length === 0 ? /* @__PURE__ */ f.jsx("div", { className: jy, children: /* @__PURE__ */ f.jsx("p", { className: Cy, children: s ?? "Audit history surfaces here once a script is parsed and at least one cast member is mapped." }) }) : /* @__PURE__ */ f.jsxs("div", { className: jy, children: [
    /* @__PURE__ */ f.jsxs("header", { className: GC, children: [
      /* @__PURE__ */ f.jsxs("div", { className: XC, children: [
        /* @__PURE__ */ f.jsx("label", { htmlFor: "audit-target-select", className: Ty, children: "Target" }),
        /* @__PURE__ */ f.jsx(
          "select",
          {
            id: "audit-target-select",
            className: KC,
            value: o,
            onChange: (C) => c(C.target.value),
            children: a.map((C) => /* @__PURE__ */ f.jsxs("option", { value: Vr(C), children: [
              C.kind === "voice_asset" ? "Voice asset" : "Utterance",
              " · ",
              C.label
            ] }, Vr(C)))
          }
        )
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: QC, children: [
        /* @__PURE__ */ f.jsx(
          Je,
          {
            variant: "ghost",
            size: "sm",
            onClick: T,
            disabled: h.length === 0,
            children: "Export JSON"
          }
        ),
        r && /* @__PURE__ */ f.jsx(
          Je,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => void A(),
            disabled: S || !j,
            children: S ? "Reverting…" : "Revert to identity"
          }
        )
      ] })
    ] }),
    b && /* @__PURE__ */ f.jsx("div", { className: aN, children: b }),
    v && !b && /* @__PURE__ */ f.jsx("div", { className: iN, "aria-live": "polite", children: "Loading edit history…" }),
    !v && !b && h.length === 0 && /* @__PURE__ */ f.jsxs("p", { className: Cy, children: [
      "No edits recorded for this target yet.",
      /* @__PURE__ */ f.jsx("br", {}),
      /* @__PURE__ */ f.jsx("span", { className: nN, children: "Apply a chain in the editor to populate the history." })
    ] }),
    !v && !b && h.length > 0 && /* @__PURE__ */ f.jsx("ul", { className: ZC, children: h.map((C) => /* @__PURE__ */ f.jsxs("li", { className: PC, children: [
      /* @__PURE__ */ f.jsx("span", { className: JC, children: lN(C.recorded_at) }),
      /* @__PURE__ */ f.jsx("span", { className: WC, children: C.operation_count === 0 ? "cleared" : `${C.operation_count} ops` }),
      /* @__PURE__ */ f.jsxs("span", { className: eN, title: C.digest_after, children: [
        C.digest_after.slice(0, 12),
        "…"
      ] }),
      /* @__PURE__ */ f.jsx("span", { className: Ty, children: C.actor || "—" }),
      /* @__PURE__ */ f.jsx(
        "span",
        {
          className: tN,
          style: {
            background: `color-mix(in oklab, ${C.operation_count === 0 ? "var(--error)" : "var(--accent)"} 14%, transparent)`,
            color: C.operation_count === 0 ? "var(--error)" : "var(--accent)"
          },
          children: C.digest_before === "" || !C.digest_before ? "create" : C.operation_count === 0 ? "clear" : "update"
        }
      )
    ] }, C.entry_id)) })
  ] });
}
function Vr(n) {
  return n ? `${n.kind}:${n.id}` : "";
}
function lN(n) {
  const a = new Date(n);
  return Number.isNaN(a.getTime()) ? n : a.toLocaleString();
}
var sN = "_1uzgubz0", oN = "_1uzgubz1", uN = "_1uzgubz2", cN = "_1uzgubz3", dN = "_1uzgubz4", fN = "_1uzgubz5", hN = "_1uzgubz6", mN = "_1uzgubz7", Ny = "_1uzgubz8", pN = "_1uzgubz9", Pb = "_1uzgubza", Jb = "_1uzgubzb", gN = "_1uzgubzc", vN = "_1uzgubzd", Xd = "_1uzgubze", Kd = "_1uzgubzf", yN = "_1uzgubzg", bN = "_1uzgubzh", My = "_1uzgubzi", Ry = "_1uzgubzj", Ay = "_1uzgubzk", _y = "_1uzgubzl", Dy = "_1uzgubzm", xN = "_1uzgubzn", SN = "_1uzgubzo", wN = "_1uzgubzp", EN = "_1uzgubzq";
function jN({
  characterName: n,
  color: a,
  lineCount: r,
  mapping: s,
  voiceAssets: o,
  presets: c,
  active: h,
  onToggle: m,
  onAssignVoiceAsset: v,
  onAssignPreset: p,
  onUploadFile: b,
  onClearMapping: g
}) {
  const [S, w] = x.useState(!1), j = s ? o.find((D) => D.voiceAssetId === s.speakerVoiceAssetId) : null, T = s?.defaultVectorPresetId ? c.find((D) => D.presetId === s.defaultVectorPresetId) ?? null : null, A = (n[0] ?? "?").toUpperCase(), C = s !== null;
  return /* @__PURE__ */ f.jsxs("div", { className: `${sN}${h ? ` ${oN}` : ""}`, children: [
    /* @__PURE__ */ f.jsxs(
      "button",
      {
        type: "button",
        className: uN,
        onClick: m,
        "aria-expanded": h,
        children: [
          /* @__PURE__ */ f.jsx(
            "span",
            {
              className: cN,
              style: {
                background: `color-mix(in oklab, ${a} 22%, transparent)`,
                color: a
              },
              children: A
            }
          ),
          /* @__PURE__ */ f.jsxs("span", { className: dN, children: [
            /* @__PURE__ */ f.jsx("span", { className: fN, style: { color: a }, children: n }),
            /* @__PURE__ */ f.jsxs("span", { className: hN, children: [
              r,
              " lines"
            ] })
          ] }),
          /* @__PURE__ */ f.jsxs("span", { className: mN, children: [
            j ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
              /* @__PURE__ */ f.jsx("span", { className: Ny, children: j.displayName }),
              j.durationMs != null && /* @__PURE__ */ f.jsxs("span", { children: [
                zy(j.durationMs),
                " ·",
                " ",
                j.sampleRate ? `${j.sampleRate} Hz` : "—"
              ] })
            ] }) : T ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
              /* @__PURE__ */ f.jsx("span", { className: Ny, children: T.presetName }),
              /* @__PURE__ */ f.jsx("span", { children: "preset" })
            ] }) : /* @__PURE__ */ f.jsx("span", { children: "no voice assigned" }),
            s?.voiceAssetChainDigest && /* @__PURE__ */ f.jsxs("span", { className: gN, children: [
              "chain · ",
              s.voiceAssetChainDigest.slice(0, 8)
            ] })
          ] }),
          /* @__PURE__ */ f.jsx(
            "span",
            {
              className: `${pN} ${C ? Pb : Jb}`,
              children: C ? "Mapped" : "Unmapped"
            }
          )
        ]
      }
    ),
    h && /* @__PURE__ */ f.jsxs("div", { className: vN, children: [
      /* @__PURE__ */ f.jsxs("div", { className: Xd, children: [
        /* @__PURE__ */ f.jsx("span", { className: Kd, children: "Drop new audio" }),
        /* @__PURE__ */ f.jsxs(
          "label",
          {
            className: `${yN}${S ? ` ${bN}` : ""}`,
            onDragEnter: (D) => {
              D.preventDefault(), w(!0);
            },
            onDragOver: (D) => D.preventDefault(),
            onDragLeave: () => w(!1),
            onDrop: (D) => {
              D.preventDefault(), w(!1);
              const z = D.dataTransfer.files?.[0];
              z && b && b(z);
            },
            children: [
              /* @__PURE__ */ f.jsx("span", { children: "Drop a WAV / MP3 / FLAC here, or click to browse" }),
              /* @__PURE__ */ f.jsx(
                "input",
                {
                  type: "file",
                  accept: "audio/*",
                  style: { display: "none" },
                  onChange: (D) => {
                    const z = D.target.files?.[0];
                    z && b && b(z);
                  }
                }
              )
            ]
          }
        )
      ] }),
      o.length > 0 && /* @__PURE__ */ f.jsxs("div", { className: Xd, children: [
        /* @__PURE__ */ f.jsx("span", { className: Kd, children: "Reference library" }),
        /* @__PURE__ */ f.jsx("div", { className: My, children: o.map((D) => /* @__PURE__ */ f.jsxs(
          "button",
          {
            type: "button",
            className: `${Ry}${s?.speakerVoiceAssetId === D.voiceAssetId ? ` ${Ay}` : ""}`,
            onClick: () => v(D.voiceAssetId),
            children: [
              /* @__PURE__ */ f.jsx("span", { className: _y, children: D.displayName }),
              /* @__PURE__ */ f.jsxs("span", { className: Dy, children: [
                D.durationMs != null ? zy(D.durationMs) : "—",
                " ",
                "·",
                " ",
                D.sampleRate ? `${D.sampleRate} Hz` : "—"
              ] })
            ]
          },
          D.voiceAssetId
        )) })
      ] }),
      c.length > 0 && p && /* @__PURE__ */ f.jsxs("div", { className: Xd, children: [
        /* @__PURE__ */ f.jsx("span", { className: Kd, children: "Preset voices" }),
        /* @__PURE__ */ f.jsx("div", { className: My, children: c.map((D) => /* @__PURE__ */ f.jsxs(
          "button",
          {
            type: "button",
            className: `${Ry}${s?.defaultVectorPresetId === D.presetId ? ` ${Ay}` : ""}`,
            onClick: () => p(D.presetId),
            children: [
              /* @__PURE__ */ f.jsx("span", { className: _y, children: D.presetName }),
              /* @__PURE__ */ f.jsx("span", { className: Dy, children: "preset · vector" })
            ]
          },
          D.presetId
        )) })
      ] }),
      C && g && /* @__PURE__ */ f.jsx(
        "button",
        {
          type: "button",
          onClick: g,
          style: {
            alignSelf: "flex-start",
            background: "transparent",
            border: "none",
            color: "var(--on-surface-variant)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            cursor: "pointer"
          },
          children: "Clear mapping →"
        }
      )
    ] })
  ] });
}
function zy(n) {
  if (!Number.isFinite(n) || n < 0) return "0:00";
  const a = Math.round(n / 1e3), r = Math.floor(a / 60), s = a % 60;
  return `${r}:${s.toString().padStart(2, "0")}`;
}
function TN({
  unmappedCount: n,
  totalCount: a,
  children: r,
  emptyHint: s
}) {
  if (a === 0)
    return /* @__PURE__ */ f.jsx("p", { className: EN, children: s ?? "Add at least one tagged dialogue line to populate the cast." });
  const o = n === 0;
  return /* @__PURE__ */ f.jsxs("div", { children: [
    /* @__PURE__ */ f.jsx("header", { className: xN, children: /* @__PURE__ */ f.jsx(
      "span",
      {
        className: `${SN} ${o ? Pb : Jb}`,
        children: o ? `All ${a} mapped` : `${n} of ${a} unmapped`
      }
    ) }),
    /* @__PURE__ */ f.jsx("ul", { className: wN, children: r })
  ] });
}
const CN = "huggingface/IndexTeam/IndexTTS-2";
async function NN(n) {
  const a = await fetch(`/api/v1/model-store/families/${encodeURIComponent(n)}/download`, {
    method: "POST",
    headers: { "content-type": "application/json" }
  });
  if (!a.ok)
    throw new Error(`Model download start failed: ${a.status}`);
  return await a.json();
}
async function MN() {
  return vt("/runtime/health");
}
async function RN() {
  await vt("/runtime/start", { method: "POST" });
}
async function AN() {
  return vt("/runtime/stop", { method: "POST" });
}
async function _N() {
  await vt("/runtime/restart", { method: "POST" });
}
function DN(n) {
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
var zN = "g5r6d10", ON = "g5r6d11", LN = "g5r6d12", UN = "g5r6d13", VN = "g5r6d14", kN = "g5r6d15", BN = "g5r6d1a", HN = "g5r6d1b", qN = "g5r6d1c", $N = "g5r6d1d", YN = "g5r6d1e", FN = "g5r6d1g", IN = "g5r6d1h", Oy = "g5r6d1i", GN = "g5r6d1j", XN = "g5r6d1k", KN = "g5r6d1l", Ly = "g5r6d1m", Uy = "g5r6d1n", QN = "g5r6d1o", ZN = "g5r6d1p", Tn = "g5r6d1q", pi = "g5r6d1r", Vy = "g5r6d1s", PN = "g5r6d1t", JN = "g5r6d1u", fi = "g5r6d1v", WN = "g5r6d1w", eM = "g5r6d1x", tM = "g5r6d1y", nM = "g5r6d1z", aM = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function Nn({
  severity: n,
  children: a,
  role: r,
  ariaLive: s,
  className: o,
  style: c
}) {
  const h = [aM[n], o].filter(Boolean).join(" "), m = r ?? (n === "error" ? "alert" : "status"), v = s ?? (n === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ f.jsx("div", { className: h, role: m, "aria-live": v, style: c, children: a });
}
var Wb = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, ex = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, iM = "_13bb4njb";
function xi({
  tone: n,
  size: a = "sm",
  pulse: r = !1,
  children: s,
  className: o,
  style: c,
  title: h
}) {
  const m = r && n !== "faint", v = [Wb[a], ex[n], m ? iM : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsx("span", { className: v, style: c, title: h, children: s });
}
const rM = 4e3;
function lM({ deployment: n }) {
  const a = Qr(), [r, s] = x.useState(null), [o, c] = x.useState(null), [h, m] = x.useState(!1);
  x.useEffect(() => {
    let A = !1;
    const C = async () => {
      try {
        const z = await MN();
        A || (s(z), c(null));
      } catch (z) {
        A || c(Kl(z));
      }
    };
    C();
    const D = setInterval(C, rM);
    return () => {
      A = !0, clearInterval(D);
    };
  }, []);
  const v = x.useCallback(async () => {
    m(!0), c(null);
    try {
      await RN();
    } catch (A) {
      c(Kl(A));
    } finally {
      m(!1);
    }
  }, []), p = x.useCallback(async () => {
    m(!0);
    try {
      await AN();
    } catch (A) {
      c(Kl(A));
    } finally {
      m(!1);
    }
  }, []), b = x.useCallback(async () => {
    m(!0);
    try {
      await _N();
    } catch (A) {
      c(Kl(A));
    } finally {
      m(!1);
    }
  }, []), g = x.useCallback(async () => {
    m(!0);
    try {
      await NN(CN);
    } catch (A) {
      c(Kl(A));
    } finally {
      m(!1);
    }
  }, []), S = r?.badge ?? "not_installed", w = S === "stopped" || S === "not_installed", j = S === "ready" || S === "running" || S === "starting", T = o?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ f.jsxs("output", { className: pi, "aria-live": "polite", children: [
    /* @__PURE__ */ f.jsx("span", { className: Tn, children: "Runtime" }),
    /* @__PURE__ */ f.jsx("span", { children: n.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ f.jsx("span", { className: Tn, children: "Badge" }),
    /* @__PURE__ */ f.jsx(xi, { tone: sM(S), pulse: S === "starting" || S === "installing", children: DN(S) }),
    r && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
      /* @__PURE__ */ f.jsx("span", { className: Tn, children: "Uptime" }),
      /* @__PURE__ */ f.jsx("span", { children: oM(r.uptimeSeconds) }),
      /* @__PURE__ */ f.jsx("span", { className: Tn, children: "VRAM" }),
      /* @__PURE__ */ f.jsxs("span", { children: [
        r.vramUsedMb,
        " / ",
        r.vramTotalMb,
        " MB"
      ] })
    ] }),
    w && /* @__PURE__ */ f.jsx(Je, { disabled: h, onClick: v, children: "Install / Start runtime" }),
    j && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
      /* @__PURE__ */ f.jsx(Je, { variant: "danger", disabled: h, onClick: p, children: "Stop backend" }),
      /* @__PURE__ */ f.jsx(Je, { variant: "secondary", disabled: h, onClick: b, children: "Restart" })
    ] }),
    T && /* @__PURE__ */ f.jsx(Je, { disabled: h, onClick: g, children: "Download IndexTTS-2 model" }),
    /* @__PURE__ */ f.jsx(
      Je,
      {
        variant: "secondary",
        onClick: () => a(`/${n.deploymentId}/mappings`),
        title: "Manage character → voice mappings (upload voice samples, edit emotion defaults)",
        children: "Mappings"
      }
    ),
    o && !T && /* @__PURE__ */ f.jsx(Nn, { severity: "error", children: o })
  ] });
}
function sM(n) {
  switch (n) {
    case "ready":
    case "running":
      return "success";
    case "starting":
    case "stopping":
    case "installing":
      return "accent";
    case "failed":
      return "danger";
    default:
      return "neutral";
  }
}
function oM(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60);
  return a < 60 ? `${a}m ${n % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function Kl(n) {
  return n instanceof Zr || n instanceof Error ? n.message : "unknown error";
}
const lu = {
  flat: { low: 0, mid: 0, high: 0 },
  warm: { low: 3, mid: 0, high: -2 },
  bright: { low: -1, mid: 0, high: 4 },
  voice: { low: -2, mid: 3, high: 2 },
  telephone: { low: -8, mid: 6, high: -8 }
}, wu = {
  volumeDb: 0,
  eq3: { low: 0, mid: 0, high: 0, preset: "flat" },
  speed: { mode: "audio", value: 1 },
  pitchSt: 0,
  normalize: { mode: "off", targetDbOrLufs: -16 },
  fade: { inS: 0, outS: 0, inCurve: "equal_power", outCurve: "equal_power" },
  silence: { enabled: !1, thresholdDb: -40 }
}, Va = 1e-3;
function uM(n, a, r) {
  for (const s of Object.keys(lu)) {
    const o = lu[s];
    if (Math.abs(o.low - n) < Va && Math.abs(o.mid - a) < Va && Math.abs(o.high - r) < Va)
      return s;
  }
  return "custom";
}
function cM(n) {
  let a = fM();
  for (const r of n.ops)
    a = dM(a, r);
  return a;
}
function dM(n, a) {
  switch (a.mode) {
    case "gain":
      return { ...n, volumeDb: a.gain_db };
    case "eq3":
      return {
        ...n,
        eq3: {
          low: a.low_db,
          mid: a.mid_db,
          high: a.high_db,
          preset: uM(a.low_db, a.mid_db, a.high_db)
        }
      };
    case "speed":
      return { ...n, speed: { mode: "audio", value: a.factor } };
    case "pitch_shift":
      return { ...n, pitchSt: a.semitones };
    case "normalize":
      return {
        ...n,
        normalize: { mode: "loudness", targetDbOrLufs: a.target_lufs }
      };
    case "fade_in":
      return {
        ...n,
        fade: { ...n.fade, inS: a.duration_ms / 1e3 }
      };
    case "fade_out":
      return {
        ...n,
        fade: { ...n.fade, outS: a.duration_ms / 1e3 }
      };
    case "silence_strip":
      return {
        ...n,
        silence: { enabled: !0, thresholdDb: a.threshold_db }
      };
    default:
      return n;
  }
}
function fM() {
  return {
    volumeDb: 0,
    eq3: { low: 0, mid: 0, high: 0, preset: "flat" },
    speed: { mode: "audio", value: 1 },
    pitchSt: 0,
    normalize: { mode: "off", targetDbOrLufs: -16 },
    fade: {
      inS: 0,
      outS: 0,
      inCurve: "equal_power",
      outCurve: "equal_power"
    },
    silence: { enabled: !1, thresholdDb: -40 }
  };
}
function Ha(n, a) {
  return n.ops.filter((r) => r.mode !== a);
}
function ji(n, a) {
  return [...n, a];
}
function tx(n, a) {
  const r = Ha(n, "gain");
  if (Math.abs(a) < Va) return { ...n, ops: r };
  const s = { id: pn(), mode: "gain", gain_db: a };
  return { ...n, ops: ji(r, s) };
}
function nx(n, a, r, s) {
  const o = Ha(n, "eq3");
  if (Math.abs(a) < Va && Math.abs(r) < Va && Math.abs(s) < Va)
    return { ...n, ops: o };
  const c = {
    id: pn(),
    mode: "eq3",
    low_db: a,
    mid_db: r,
    high_db: s
  };
  return { ...n, ops: ji(o, c) };
}
function hM(n, a) {
  const r = Ha(n, "speed");
  if (Math.abs(a - 1) < Va) return { ...n, ops: r };
  const s = { id: pn(), mode: "speed", factor: a };
  return { ...n, ops: ji(r, s) };
}
function ax(n, a) {
  const r = Ha(n, "pitch_shift");
  if (Math.abs(a) < Va) return { ...n, ops: r };
  const s = {
    id: pn(),
    mode: "pitch_shift",
    semitones: a
  };
  return { ...n, ops: ji(r, s) };
}
function mM(n, a, r) {
  const s = Ha(n, "normalize");
  if (a === "off") return { ...n, ops: s };
  const o = {
    id: pn(),
    mode: "normalize",
    target_lufs: r
  };
  return { ...n, ops: ji(s, o) };
}
function ix(n, a) {
  const r = Ha(n, "fade_in");
  if (a <= 0) return { ...n, ops: r };
  const s = {
    id: pn(),
    mode: "fade_in",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...n, ops: ji(r, s) };
}
function rx(n, a) {
  const r = Ha(n, "fade_out");
  if (a <= 0) return { ...n, ops: r };
  const s = {
    id: pn(),
    mode: "fade_out",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...n, ops: ji(r, s) };
}
function lx(n, a, r) {
  const s = Ha(n, "silence_strip");
  if (!a) return { ...n, ops: s };
  const o = {
    id: pn(),
    mode: "silence_strip",
    threshold_db: r
  };
  return { ...n, ops: ji(s, o) };
}
function pM(n, a) {
  let r = n;
  return r = tx(r, a.volumeDb), r = nx(r, a.eq3.low, a.eq3.mid, a.eq3.high), a.speed.mode === "audio" ? r = hM(r, a.speed.value) : r = { ...r, ops: Ha(r, "speed") }, r = ax(r, a.pitchSt), r = mM(
    r,
    a.normalize.mode === "off" ? "off" : "loudness",
    a.normalize.targetDbOrLufs
  ), r = ix(r, a.fade.inS), r = rx(r, a.fade.outS), r = lx(r, a.silence.enabled, a.silence.thresholdDb), r;
}
const sx = /* @__PURE__ */ new Set([
  "gain",
  "eq3",
  "pitch_shift",
  "fade_in",
  "fade_out",
  "silence_strip"
]);
function ox(n, a) {
  const r = {
    ...n,
    ops: n.ops.filter((c) => !sx.has(c.mode))
  };
  let o = tx({ version: 1, ops: [] }, a.volumeDb);
  return o = nx(
    o,
    a.eq3.low,
    a.eq3.mid,
    a.eq3.high
  ), o = ax(o, a.pitchSt), o = ix(o, a.fade.inS), o = rx(o, a.fade.outS), o = lx(
    o,
    a.silence.enabled,
    a.silence.thresholdDb
  ), { ...r, ops: [...r.ops, ...o.ops] };
}
function ux(n) {
  const a = {
    ...n,
    ops: n.ops.filter((r) => sx.has(r.mode))
  };
  return cM(a);
}
var gM = "_1rsa80i0", vM = "_1rsa80i1", yM = "_1rsa80i2", bM = "_1rsa80i3", xM = "_1rsa80i4", SM = "_1rsa80i5", wM = "_1rsa80i6", EM = "_1rsa80i7", jM = "_1rsa80i8", TM = "_1rsa80i9";
const cx = ["flat", "warm", "bright", "voice", "telephone"], Ql = -12, ko = 12, CM = 0.5;
function NM(n) {
  const { low: a, mid: r, high: s, preset: o, onChange: c, disabled: h } = n, m = (p) => {
    const b = lu[p];
    c(b.low, b.mid, b.high, p);
  }, v = (p, b) => {
    const g = { low: a, mid: r, high: s, [p]: b }, S = RM(g.low, g.mid, g.high);
    c(g.low, g.mid, g.high, S);
  };
  return /* @__PURE__ */ f.jsxs("div", { className: gM, children: [
    /* @__PURE__ */ f.jsxs("div", { className: vM, role: "group", "aria-label": "EQ presets", children: [
      cx.map((p) => /* @__PURE__ */ f.jsx(
        "button",
        {
          type: "button",
          className: yM,
          "data-active": o === p,
          onClick: () => m(p),
          disabled: h,
          children: p
        },
        p
      )),
      o === "custom" ? /* @__PURE__ */ f.jsx("span", { className: bM, children: "custom" }) : null
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: xM, children: [
      /* @__PURE__ */ f.jsx(
        Qd,
        {
          label: "Low",
          value: a,
          onChange: (p) => v("low", p),
          disabled: h
        }
      ),
      /* @__PURE__ */ f.jsx(
        Qd,
        {
          label: "Mid",
          value: r,
          onChange: (p) => v("mid", p),
          disabled: h
        }
      ),
      /* @__PURE__ */ f.jsx(
        Qd,
        {
          label: "High",
          value: s,
          onChange: (p) => v("high", p),
          disabled: h
        }
      )
    ] })
  ] });
}
function Qd({ label: n, value: a, onChange: r, disabled: s }) {
  const o = (a - Ql) / (ko - Ql) * 100, c = `eq3-${n.toLowerCase()}`;
  return /* @__PURE__ */ f.jsxs("div", { className: SM, children: [
    /* @__PURE__ */ f.jsx("label", { htmlFor: c, className: wM, children: n }),
    /* @__PURE__ */ f.jsx(
      "input",
      {
        id: c,
        type: "range",
        min: Ql,
        max: ko,
        step: CM,
        value: a,
        disabled: s,
        className: jM,
        style: { "--fill": `${o}%` },
        onChange: (h) => r(Number(h.target.value)),
        "aria-valuemin": Ql,
        "aria-valuemax": ko,
        "aria-valuenow": a
      }
    ),
    /* @__PURE__ */ f.jsx("span", { className: EM, children: MM(a) }),
    /* @__PURE__ */ f.jsxs("span", { className: TM, "aria-hidden": "true", children: [
      /* @__PURE__ */ f.jsx("span", { children: Ql }),
      /* @__PURE__ */ f.jsx("span", { children: "0" }),
      /* @__PURE__ */ f.jsxs("span", { children: [
        "+",
        ko
      ] })
    ] })
  ] });
}
function MM(n) {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} dB`;
}
const Zd = 1e-3;
function RM(n, a, r) {
  for (const s of cx) {
    const o = lu[s];
    if (Math.abs(o.low - n) < Zd && Math.abs(o.mid - a) < Zd && Math.abs(o.high - r) < Zd)
      return s;
  }
  return "custom";
}
var AM = "_85bhwb0", _M = "_85bhwb1", ky = "_85bhwb2", DM = "_85bhwb3", zM = "_85bhwb4", OM = "_85bhwb5", LM = "_85bhwb6", UM = "_85bhwb7";
const Bo = 0.5, Pd = 2, VM = 0.05;
function kM(n) {
  const { mode: a, value: r, supportsSynthSpeed: s, onChange: o, onReRenderAtSynthTime: c, disabled: h } = n, m = (r - Bo) / (Pd - Bo) * 100, v = "speed-slider", p = (g) => o(g, r), b = (g) => o(a, g);
  return /* @__PURE__ */ f.jsxs("div", { className: AM, children: [
    s ? /* @__PURE__ */ f.jsxs("div", { className: _M, role: "group", "aria-label": "Speed mode", children: [
      /* @__PURE__ */ f.jsx(
        "button",
        {
          type: "button",
          className: ky,
          "data-active": a === "audio",
          onClick: () => p("audio"),
          disabled: h,
          children: "Audio"
        }
      ),
      /* @__PURE__ */ f.jsx(
        "button",
        {
          type: "button",
          className: ky,
          "data-active": a === "synth",
          onClick: () => p("synth"),
          disabled: h,
          children: "Synth"
        }
      )
    ] }) : null,
    /* @__PURE__ */ f.jsxs("div", { className: DM, children: [
      /* @__PURE__ */ f.jsx(
        "input",
        {
          id: v,
          type: "range",
          min: Bo,
          max: Pd,
          step: VM,
          value: r,
          disabled: h,
          className: zM,
          style: { "--fill": `${m}%` },
          onChange: (g) => b(Number(g.target.value)),
          "aria-valuemin": Bo,
          "aria-valuemax": Pd,
          "aria-valuenow": r,
          "aria-label": "Speed factor"
        }
      ),
      /* @__PURE__ */ f.jsx("span", { className: OM, children: `${r.toFixed(2)}×` })
    ] }),
    a === "synth" && s ? /* @__PURE__ */ f.jsxs("div", { className: LM, children: [
      /* @__PURE__ */ f.jsx(
        Je,
        {
          variant: "primary",
          size: "sm",
          onClick: c,
          disabled: h || !c,
          children: "Re-render at synth-time"
        }
      ),
      /* @__PURE__ */ f.jsx("span", { className: UM, children: "Synth-time speed re-runs the worker for new utterances." })
    ] }) : null
  ] });
}
var BM = "kgszk50", HM = "kgszk51", By = "kgszk52", qM = "kgszk53", $M = "kgszk54", dx = "kgszk55", YM = "kgszk56", FM = "kgszk58", mh = "kgszk59", fx = "kgszk5a", ph = "kgszk5b", IM = "kgszk5c", GM = "kgszk5d", XM = "kgszk5e", Hy = "kgszk5f", qy = "kgszk5g", $y = "kgszk5h", KM = "kgszk5i", QM = "kgszk5j", ZM = "kgszk5l", os = "kgszk5m", us = "kgszk5n";
const PM = -24, JM = 24, WM = 0.5, eR = -12, tR = 12, nR = 0.5, aR = -30, iR = -6, rR = -12, lR = 0, Ho = -60, Jd = -20;
function gh(n) {
  const {
    state: a,
    onChange: r,
    supportsSynthSpeed: s,
    onReRenderAtSynthTime: o,
    pendingExecution: c = !1,
    disabled: h = !1,
    onApply: m,
    applyLabel: v = "Apply edit"
  } = n, p = (g) => {
    r({ ...a, ...g });
  }, b = cR(a);
  return /* @__PURE__ */ f.jsxs("div", { className: BM, children: [
    /* @__PURE__ */ f.jsxs("div", { className: HM, children: [
      b.length === 0 ? /* @__PURE__ */ f.jsx("span", { className: qM, children: "No active edits" }) : /* @__PURE__ */ f.jsxs("span", { className: By, children: [
        /* @__PURE__ */ f.jsx("span", { "aria-hidden": "true", children: "Active:" }),
        /* @__PURE__ */ f.jsx("span", { children: b.join(" · ") })
      ] }),
      c ? /* @__PURE__ */ f.jsxs("span", { className: By, "aria-live": "polite", children: [
        /* @__PURE__ */ f.jsx("span", { className: $M, "aria-hidden": "true" }),
        "Re-rendering"
      ] }) : null
    ] }),
    /* @__PURE__ */ f.jsx(
      Yy,
      {
        label: "Volume",
        sub: "Pre-mix gain in dB",
        min: PM,
        max: JM,
        step: WM,
        format: dR,
        value: a.volumeDb,
        onChange: (g) => p({ volumeDb: g }),
        disabled: h
      }
    ),
    /* @__PURE__ */ f.jsxs("div", { className: os, children: [
      /* @__PURE__ */ f.jsx("span", { className: us, children: "3-band EQ" }),
      /* @__PURE__ */ f.jsx(
        NM,
        {
          low: a.eq3.low,
          mid: a.eq3.mid,
          high: a.eq3.high,
          preset: a.eq3.preset,
          disabled: h,
          onChange: (g, S, w, j) => p({ eq3: { low: g, mid: S, high: w, preset: j } })
        }
      )
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: os, children: [
      /* @__PURE__ */ f.jsx("span", { className: us, children: "Speed" }),
      /* @__PURE__ */ f.jsx(
        kM,
        {
          mode: a.speed.mode,
          value: a.speed.value,
          supportsSynthSpeed: s,
          ...o ? { onReRenderAtSynthTime: o } : {},
          disabled: h,
          onChange: (g, S) => p({ speed: { mode: g, value: S } })
        }
      )
    ] }),
    /* @__PURE__ */ f.jsx(
      Yy,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: eR,
        max: tR,
        step: nR,
        format: fR,
        value: a.pitchSt,
        onChange: (g) => p({ pitchSt: g }),
        disabled: h
      }
    ),
    /* @__PURE__ */ f.jsx(
      sR,
      {
        normalize: a.normalize,
        disabled: h,
        onChange: (g) => p({ normalize: g })
      }
    ),
    /* @__PURE__ */ f.jsx(
      oR,
      {
        inS: a.fade.inS,
        outS: a.fade.outS,
        disabled: h,
        onChange: (g, S) => p({ fade: { ...a.fade, inS: g, outS: S } })
      }
    ),
    /* @__PURE__ */ f.jsx(
      uR,
      {
        enabled: a.silence.enabled,
        thresholdDb: a.silence.thresholdDb,
        disabled: h,
        onChange: (g, S) => p({ silence: { enabled: g, thresholdDb: S } })
      }
    ),
    m ? /* @__PURE__ */ f.jsxs("div", { className: ZM, children: [
      /* @__PURE__ */ f.jsx(
        Je,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => r(wu),
          disabled: h,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ f.jsx(Je, { variant: "primary", size: "md", onClick: m, disabled: h, children: v })
    ] }) : null
  ] });
}
function Yy(n) {
  const { label: a, sub: r, min: s, max: o, step: c, format: h, value: m, onChange: v, disabled: p } = n, b = (m - s) / (o - s) * 100, g = `dm-${a.toLowerCase()}`;
  return /* @__PURE__ */ f.jsxs("div", { className: dx, children: [
    /* @__PURE__ */ f.jsxs("div", { className: YM, children: [
      /* @__PURE__ */ f.jsx("label", { htmlFor: g, className: FM, children: a }),
      /* @__PURE__ */ f.jsx("span", { className: fx, children: r })
    ] }),
    /* @__PURE__ */ f.jsx(
      "input",
      {
        id: g,
        type: "range",
        min: s,
        max: o,
        step: c,
        value: m,
        disabled: p,
        className: ph,
        style: { "--fill": `${b}%` },
        onChange: (S) => v(Number(S.target.value)),
        "aria-valuemin": s,
        "aria-valuemax": o,
        "aria-valuenow": m
      }
    ),
    /* @__PURE__ */ f.jsx("span", { className: mh, children: h(m) })
  ] });
}
function sR({ normalize: n, onChange: a, disabled: r }) {
  const o = n.mode === "loudness" ? { min: aR, max: iR, step: 0.5, suffix: "LUFS" } : { min: rR, max: lR, step: 0.5, suffix: "dB" }, c = hR(n.targetDbOrLufs, o.min, o.max), h = (c - o.min) / (o.max - o.min) * 100, m = (v) => {
    if (v === "off") {
      a({ mode: v, targetDbOrLufs: n.targetDbOrLufs });
      return;
    }
    if (v === "peak") {
      a({ mode: v, targetDbOrLufs: -1 });
      return;
    }
    a({ mode: v, targetDbOrLufs: -16 });
  };
  return /* @__PURE__ */ f.jsxs("div", { className: os, children: [
    /* @__PURE__ */ f.jsx("span", { className: us, children: "Normalize" }),
    /* @__PURE__ */ f.jsx("div", { className: IM, role: "group", "aria-label": "Normalize mode", children: ["off", "peak", "loudness"].map((v) => /* @__PURE__ */ f.jsx(
      "button",
      {
        type: "button",
        className: GM,
        "data-active": n.mode === v,
        disabled: r,
        onClick: () => m(v),
        children: v
      },
      v
    )) }),
    n.mode !== "off" ? /* @__PURE__ */ f.jsxs("div", { className: dx, children: [
      /* @__PURE__ */ f.jsx("span", { className: fx, children: "Target" }),
      /* @__PURE__ */ f.jsx(
        "input",
        {
          type: "range",
          min: o.min,
          max: o.max,
          step: o.step,
          value: c,
          disabled: r,
          className: ph,
          style: { "--fill": `${h}%` },
          onChange: (v) => a({ mode: n.mode, targetDbOrLufs: Number(v.target.value) }),
          "aria-valuemin": o.min,
          "aria-valuemax": o.max,
          "aria-valuenow": c,
          "aria-label": `Normalize target ${o.suffix}`
        }
      ),
      /* @__PURE__ */ f.jsxs("span", { className: mh, children: [
        c.toFixed(1),
        " ",
        o.suffix
      ] })
    ] }) : null
  ] });
}
function oR({ inS: n, outS: a, onChange: r, disabled: s }) {
  return /* @__PURE__ */ f.jsxs("div", { className: os, children: [
    /* @__PURE__ */ f.jsx("span", { className: us, children: "Fade" }),
    /* @__PURE__ */ f.jsxs("div", { className: XM, children: [
      /* @__PURE__ */ f.jsxs("div", { className: Hy, children: [
        /* @__PURE__ */ f.jsx("label", { className: qy, htmlFor: "fade-in", children: "Fade in (s)" }),
        /* @__PURE__ */ f.jsx(
          "input",
          {
            id: "fade-in",
            type: "number",
            min: 0,
            step: 0.05,
            value: n,
            disabled: s,
            className: $y,
            onChange: (o) => r(Math.max(0, Number(o.target.value)), a)
          }
        )
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: Hy, children: [
        /* @__PURE__ */ f.jsx("label", { className: qy, htmlFor: "fade-out", children: "Fade out (s)" }),
        /* @__PURE__ */ f.jsx(
          "input",
          {
            id: "fade-out",
            type: "number",
            min: 0,
            step: 0.05,
            value: a,
            disabled: s,
            className: $y,
            onChange: (o) => r(n, Math.max(0, Number(o.target.value)))
          }
        )
      ] })
    ] })
  ] });
}
function uR({ enabled: n, thresholdDb: a, onChange: r, disabled: s }) {
  const o = (a - Ho) / (Jd - Ho) * 100;
  return /* @__PURE__ */ f.jsxs("div", { className: os, children: [
    /* @__PURE__ */ f.jsx("span", { className: us, children: "Silence trim" }),
    /* @__PURE__ */ f.jsxs("div", { className: KM, children: [
      /* @__PURE__ */ f.jsxs("label", { className: QM, children: [
        /* @__PURE__ */ f.jsx(
          "input",
          {
            type: "checkbox",
            checked: n,
            disabled: s,
            onChange: (c) => r(c.target.checked, a)
          }
        ),
        "Enabled"
      ] }),
      /* @__PURE__ */ f.jsx(
        "input",
        {
          type: "range",
          min: Ho,
          max: Jd,
          step: 1,
          value: a,
          disabled: s || !n,
          className: ph,
          style: { "--fill": `${o}%`, flex: 1 },
          onChange: (c) => r(n, Number(c.target.value)),
          "aria-valuemin": Ho,
          "aria-valuemax": Jd,
          "aria-valuenow": a,
          "aria-label": "Silence threshold dB"
        }
      ),
      /* @__PURE__ */ f.jsxs("span", { className: mh, children: [
        a.toFixed(0),
        " dB"
      ] })
    ] })
  ] });
}
const kr = 1e-3;
function cR(n) {
  const a = [];
  return Math.abs(n.volumeDb) >= kr && a.push("gain"), (Math.abs(n.eq3.low) >= kr || Math.abs(n.eq3.mid) >= kr || Math.abs(n.eq3.high) >= kr) && a.push("eq3"), n.speed.mode === "audio" && Math.abs(n.speed.value - 1) >= kr && a.push("speed"), Math.abs(n.pitchSt) >= kr && a.push("pitch"), n.normalize.mode !== "off" && a.push("normalize"), n.fade.inS > 0 && a.push("fade-in"), n.fade.outS > 0 && a.push("fade-out"), n.silence.enabled && a.push("silence"), a;
}
function dR(n) {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} dB`;
}
function fR(n) {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} st`;
}
function hR(n, a, r) {
  return Number.isFinite(n) ? Math.max(a, Math.min(r, n)) : a;
}
var mR = "skdk4g1", pR = "skdk4g3", gR = "skdk4g4", vR = "skdk4g5", Fy = "skdk4g6", Iy = "skdk4g7", yR = "skdk4g8", Gy = "skdk4g9", Xy = "skdk4ga", bR = "skdk4gb", xR = "skdk4gc", SR = "skdk4gd", Ky = "skdk4ge", wR = "cgsfgh0", ER = "cgsfgh1", jR = "cgsfgh2", TR = "cgsfgh3", CR = "cgsfgh4", NR = "cgsfgh5", MR = "cgsfgh6", RR = "cgsfgh7", AR = "cgsfgh8", _R = "cgsfgh9", DR = "cgsfgha", zR = "cgsfghb", OR = "cgsfghc", LR = "cgsfghd", UR = "cgsfghe", VR = "cgsfghf", kR = "cgsfghg", BR = "cgsfghh", HR = "cgsfghi", qR = "cgsfghj", $R = "cgsfghk";
const ln = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], es = {
  happy: "Happy",
  angry: "Angry",
  sad: "Sad",
  afraid: "Afraid",
  disgusted: "Disgusted",
  melancholic: "Melancholic",
  surprised: "Surprised",
  calm: "Calm"
}, Nf = {
  happy: 0,
  angry: 0,
  sad: 0,
  afraid: 0,
  disgusted: 0,
  melancholic: 0,
  surprised: 0,
  calm: 0
}, hx = 0.05;
function YR(n) {
  let a = null, r = -1 / 0;
  for (const s of ln) {
    const o = n[s];
    o > r && (r = o, a = s);
  }
  return !a || r <= hx ? null : a;
}
function mx(n, a = 3) {
  return ln.map((r) => ({ key: r, label: es[r], value: n[r] })).filter((r) => r.value > hx).sort((r, s) => s.value - r.value).slice(0, a);
}
function FR(n) {
  let a = 0;
  for (const r of ln) a += n[r] * n[r];
  return Math.sqrt(a);
}
function Qy(n) {
  const a = mx(n, 2), r = a[0];
  if (!r) return "";
  const s = a[1];
  return !s || r.value - s.value > 0.25 ? Wd(r.label) : `${Wd(r.label)} + ${s.label.toLowerCase()}`;
}
function Wd(n) {
  if (!n) return n;
  const a = n[0];
  return a ? a.toUpperCase() + n.slice(1) : n;
}
function Mf(n) {
  const a = { ...Nf };
  for (const r of ln) {
    const s = n[r];
    a[r] = Number.isFinite(s) ? Math.max(0, Math.min(1, s)) : 0;
  }
  return a;
}
const Zy = 0.05, Py = 0.2;
function IR(n) {
  const { vec: a, onChange: r, size: s } = n, [o, c] = x.useState(a), [h, m] = x.useState(null), v = x.useRef(null), p = x.useRef(a);
  x.useEffect(() => {
    c(a), p.current = a;
  }, [a]);
  const b = x.useCallback(
    (A) => {
      const C = Mf(A);
      c(C), p.current = C, r(C);
    },
    [r]
  ), g = x.useCallback((A) => {
    const C = Mf(A);
    c(C), p.current = C;
  }, []), S = x.useCallback(
    (A) => {
      const C = v.current;
      if (!C) return;
      const D = A.clientX - C.centerX, z = A.clientY - C.centerY, k = Math.sqrt(D * D + z * z), W = s / 2, G = Math.max(0, Math.min(1, k / W)), ee = { ...p.current, [C.axis]: G };
      g(ee);
    },
    [s, g]
  ), w = x.useCallback(
    (A) => {
      v.current && (window.removeEventListener("pointermove", S), window.removeEventListener("pointerup", w), window.removeEventListener("pointercancel", w), v.current = null, b(p.current));
    },
    [b, S]
  ), j = x.useCallback(
    (A, C) => {
      C.preventDefault();
      const D = C.currentTarget, k = (D.ownerSVGElement ?? D).getBoundingClientRect(), W = k.left + k.width / 2, G = k.top + k.height / 2, R = ln.indexOf(A) / ln.length * Math.PI * 2 - Math.PI / 2;
      v.current = {
        axis: A,
        pointerId: C.pointerId,
        centerX: W,
        centerY: G,
        angle: R
      }, m(A), window.addEventListener("pointermove", S), window.addEventListener("pointerup", w), window.addEventListener("pointercancel", w);
    },
    [S, w]
  ), T = x.useCallback(
    (A, C) => {
      const D = p.current[A];
      let z = D;
      switch (C.key) {
        case "ArrowUp":
        case "ArrowRight":
          z = D + Zy;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          z = D - Zy;
          break;
        case "PageUp":
          z = D + Py;
          break;
        case "PageDown":
          z = D - Py;
          break;
        case "Home":
          z = 0;
          break;
        case "End":
          z = 1;
          break;
        default:
          return;
      }
      C.preventDefault(), m(A), b({ ...p.current, [A]: z });
    },
    [b]
  );
  return {
    liveVec: o,
    activeAxis: h,
    setActiveAxis: m,
    onPointerDown: j,
    onKeyDown: T
  };
}
const GR = [0.25, 0.5, 0.75, 1];
function XR({
  vec: n,
  onChange: a,
  size: r = 360,
  readOnly: s = !1,
  reduceMotion: o = !1
}) {
  const c = IR({ vec: n, onChange: a, size: r }), h = r / 2, m = r / 2, v = r / 2 * 0.78, p = x.useMemo(() => KR(h, m, v), [h, m, v]), b = x.useMemo(() => ln.map((w, j) => {
    const T = Wo(c.liveVec[w]), A = p[j];
    return A ? `${h + A.dx * T},${m + A.dy * T}` : "0,0";
  }).join(" "), [p, h, m, c.liveVec]), g = YR(c.liveVec), S = FR(c.liveVec);
  return /* @__PURE__ */ f.jsxs("div", { className: wR, children: [
    /* @__PURE__ */ f.jsx("div", { className: ER, style: { width: r, height: r }, children: /* @__PURE__ */ f.jsxs(
      "svg",
      {
        className: jR,
        viewBox: `0 0 ${r} ${r}`,
        role: "img",
        "aria-label": "8-axis emotion radar",
        children: [
          GR.map((w) => /* @__PURE__ */ f.jsx(
            "circle",
            {
              className: TR,
              cx: h,
              cy: m,
              r: v * w
            },
            w
          )),
          ln.map((w, j) => {
            const T = p[j];
            if (!T) return null;
            const A = h + T.dx * 1.18, C = m + T.dy * 1.18, D = c.activeAxis === w;
            return /* @__PURE__ */ f.jsxs("g", { children: [
              /* @__PURE__ */ f.jsx(
                "line",
                {
                  className: CR,
                  x1: h,
                  y1: m,
                  x2: h + T.dx,
                  y2: m + T.dy
                }
              ),
              /* @__PURE__ */ f.jsx(
                "text",
                {
                  className: `${AR}${D ? ` ${_R}` : ""}`,
                  x: A,
                  y: C,
                  textAnchor: "middle",
                  dominantBaseline: "middle",
                  children: es[w]
                }
              )
            ] }, w);
          }),
          /* @__PURE__ */ f.jsx("polygon", { className: NR, points: b }),
          !s && ln.map((w, j) => {
            const T = Wo(c.liveVec[w]), A = p[j];
            if (!A) return null;
            const C = h + A.dx * T, D = m + A.dy * T, z = c.activeAxis === w;
            return /* @__PURE__ */ f.jsx(
              "circle",
              {
                className: `${MR}${z ? ` ${RR}` : ""}`,
                cx: C,
                cy: D,
                r: 6,
                tabIndex: 0,
                role: "slider",
                "aria-label": `${es[w]} axis`,
                "aria-valuemin": 0,
                "aria-valuemax": 1,
                "aria-valuenow": T,
                onPointerDown: (k) => c.onPointerDown(w, k),
                onKeyDown: (k) => c.onKeyDown(w, k),
                onFocus: () => c.setActiveAxis(w),
                onBlur: () => c.setActiveAxis(null)
              },
              w
            );
          })
        ]
      }
    ) }),
    /* @__PURE__ */ f.jsxs("div", { className: DR, children: [
      /* @__PURE__ */ f.jsx("span", { className: zR, children: g ? es[g].toLowerCase() : "neutral" }),
      /* @__PURE__ */ f.jsxs("span", { className: OR, children: [
        "‖v‖ = ",
        S.toFixed(2)
      ] })
    ] }),
    /* @__PURE__ */ f.jsx("div", { className: LR, role: "group", "aria-label": "Axis values", children: ln.map((w) => {
      const j = Wo(c.liveVec[w]), T = c.activeAxis === w;
      return /* @__PURE__ */ f.jsxs(
        "button",
        {
          type: "button",
          className: `${UR}${T ? ` ${VR}` : ""}`,
          onClick: () => a({
            ...c.liveVec,
            [w]: j > 0.05 ? 0 : 0.5
          }),
          "aria-pressed": j > 0.05,
          children: [
            es[w].toLowerCase(),
            /* @__PURE__ */ f.jsx("span", { className: kR, children: j.toFixed(2) })
          ]
        },
        w
      );
    }) })
  ] });
}
function KR(n, a, r) {
  return ln.map((s, o) => {
    const c = o / ln.length * Math.PI * 2 - Math.PI / 2;
    return {
      dx: Math.cos(c) * r,
      dy: Math.sin(c) * r
    };
  });
}
function Wo(n) {
  return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 0;
}
function QR({ vec: n, size: a = 36 }) {
  const r = a / 2, s = a / 2, o = a / 2 * 0.86, c = x.useMemo(() => ln.map((h, m) => {
    const v = Wo(n[h]), p = m / ln.length * Math.PI * 2 - Math.PI / 2, b = r + Math.cos(p) * o * v, g = s + Math.sin(p) * o * v;
    return `${b},${g}`;
  }).join(" "), [r, s, o, n]);
  return /* @__PURE__ */ f.jsx("span", { className: BR, "aria-hidden": "true", children: /* @__PURE__ */ f.jsxs(
    "svg",
    {
      className: HR,
      width: a,
      height: a,
      viewBox: `0 0 ${a} ${a}`,
      children: [
        /* @__PURE__ */ f.jsx("circle", { className: qR, cx: r, cy: s, r: o }),
        /* @__PURE__ */ f.jsx("polygon", { className: $R, points: c })
      ]
    }
  ) });
}
var Rf = "gvwvwg0", ZR = "gvwvwg1", px = "gvwvwg2", gx = "gvwvwg3", PR = "gvwvwg4", JR = "gvwvwg5", WR = "gvwvwg6", eA = "gvwvwg7", tA = "gvwvwg8", nA = "gvwvwg9", aA = "gvwvwga", iA = "gvwvwgb", rA = "gvwvwgc", lA = "gvwvwgd";
function sA({
  vec: n,
  onSave: a,
  saving: r = !1
}) {
  const [s, o] = x.useState(Qy(n)), [c, h] = x.useState(!1), m = mx(n, 3);
  x.useEffect(() => {
    c || o(Qy(n));
  }, [n, c]);
  const v = s.trim().length > 0;
  return /* @__PURE__ */ f.jsxs("div", { className: Rf, children: [
    /* @__PURE__ */ f.jsx("header", { className: ZR, children: /* @__PURE__ */ f.jsx("span", { className: px, children: "Save current vector as preset" }) }),
    /* @__PURE__ */ f.jsx("div", { className: gx, children: m.length === 0 ? /* @__PURE__ */ f.jsx("span", { children: "(neutral — drag the radar to set a vector first)" }) : m.map((p) => /* @__PURE__ */ f.jsxs("span", { className: PR, children: [
      p.label.toLowerCase(),
      /* @__PURE__ */ f.jsx("span", { className: JR, children: p.value.toFixed(2) })
    ] }, p.key)) }),
    /* @__PURE__ */ f.jsxs("div", { className: WR, children: [
      /* @__PURE__ */ f.jsx(
        "input",
        {
          className: eA,
          type: "text",
          placeholder: "Preset name",
          value: s,
          onChange: (p) => {
            o(p.target.value), h(!0);
          }
        }
      ),
      /* @__PURE__ */ f.jsx(
        Je,
        {
          variant: "primary",
          disabled: !v || r,
          onClick: () => {
            a(s.trim()), h(!1);
          },
          children: r ? "Saving…" : "Save preset"
        }
      )
    ] })
  ] });
}
function oA({
  presets: n,
  activePresetId: a,
  onSelect: r,
  onDelete: s
}) {
  return n.length === 0 ? /* @__PURE__ */ f.jsxs("div", { className: Rf, children: [
    /* @__PURE__ */ f.jsx("span", { className: px, children: "Preset library" }),
    /* @__PURE__ */ f.jsx("span", { className: gx, children: "No presets yet. Save your current vector to build the library." })
  ] }) : /* @__PURE__ */ f.jsxs("div", { className: Rf, children: [
    /* @__PURE__ */ f.jsx("span", { className: lA, children: "Preset library" }),
    /* @__PURE__ */ f.jsx("div", { className: tA, children: n.map((o) => {
      const c = uA(o), h = o.presetId === a;
      return /* @__PURE__ */ f.jsxs(
        "div",
        {
          className: `${nA}${h ? ` ${aA}` : ""}`,
          children: [
            /* @__PURE__ */ f.jsxs(
              "button",
              {
                type: "button",
                style: { display: "contents", border: "none", background: "transparent", cursor: "pointer" },
                onClick: () => r(o),
                children: [
                  /* @__PURE__ */ f.jsx(QR, { vec: c, size: 28 }),
                  /* @__PURE__ */ f.jsx("span", { className: iA, children: o.presetName })
                ]
              }
            ),
            s && /* @__PURE__ */ f.jsx(
              "button",
              {
                type: "button",
                className: rA,
                onClick: () => {
                  window.confirm(`Delete preset "${o.presetName}"? This cannot be undone.`) && s(o.presetId);
                },
                "aria-label": `Delete ${o.presetName}`,
                children: "×"
              }
            )
          ]
        },
        o.presetId
      );
    }) })
  ] });
}
const Af = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function uA(n) {
  const a = Af.reduce(
    (r, s) => ({ ...r, [s]: 0 }),
    {}
  );
  return Array.isArray(n.vector) ? Af.reduce(
    (r, s, o) => ({ ...r, [s]: n.vector[o] ?? 0 }),
    a
  ) : a;
}
function Jy(n) {
  return Af.map((a) => n[a] ?? 0);
}
const cA = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
];
function dA({
  value: n,
  onChange: a,
  deploymentId: r
}) {
  const s = n.mode ?? "none", o = x.useMemo(() => fA(n.vector), [n.vector]), c = n.emotionAlpha ?? 1, [h, m] = x.useState([]), [v, p] = x.useState(null), [b, g] = x.useState(!1), [S, w] = x.useState(null), j = x.useRef(!0);
  x.useEffect(() => (j.current = !0, () => {
    j.current = !1;
  }), []), x.useEffect(() => {
    let G = !1;
    return Kb(r).then((ee) => {
      G || m(Wy(ee.presets));
    }).catch((ee) => {
      G || p(ef(ee));
    }), () => {
      G = !0;
    };
  }, [r]);
  const T = (G) => {
    a({ ...n, mode: G });
  }, A = (G) => {
    a({
      ...n,
      mode: "emotion_vector",
      vector: Jy(G)
    }), S && w(null);
  }, C = (G) => {
    const ee = Math.max(0, Math.min(1, Number.isFinite(G) ? G : 1));
    a({ ...n, emotionAlpha: ee });
  }, D = async (G) => {
    g(!0), p(null);
    try {
      const ee = await FC(r, G, Jy(o));
      if (!j.current) return;
      m(
        (R) => Wy([ee, ...R.filter((H) => H.presetId !== ee.presetId)])
      ), w(ee.presetId);
    } catch (ee) {
      j.current && p(ef(ee));
    } finally {
      j.current && g(!1);
    }
  }, z = async (G) => {
    const ee = h;
    m((R) => R.filter((H) => H.presetId !== G)), S === G && w(null);
    try {
      await IC(r, G);
    } catch (R) {
      j.current && (m(ee), p(ef(R)));
    }
  }, k = (G) => {
    w(G.presetId), a({
      ...n,
      mode: "emotion_vector",
      vector: G.vector
    });
  }, W = (G) => {
    a({ ...n, mode: "qwen_template", qwenTemplate: G });
  };
  return /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
    /* @__PURE__ */ f.jsx("div", { className: `${Oy} ${mR}`, children: /* @__PURE__ */ f.jsx(
      XR,
      {
        vec: o,
        onChange: A,
        readOnly: s !== "emotion_vector"
      }
    ) }),
    /* @__PURE__ */ f.jsxs("div", { className: Oy, children: [
      /* @__PURE__ */ f.jsx("div", { className: pR, role: "radiogroup", "aria-label": "Emotion mode", children: cA.map((G) => /* @__PURE__ */ f.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": s === G.id,
          className: `${gR}${s === G.id ? ` ${vR}` : ""}`,
          onClick: () => T(G.id),
          children: G.label
        },
        G.id
      )) }),
      s === "none" && /* @__PURE__ */ f.jsxs("div", { className: Ky, children: [
        "Neutral default. Per-line ",
        /* @__PURE__ */ f.jsx("code", { children: "[Char|emotion_vector:…]" }),
        " overrides still apply when present."
      ] }),
      s === "emotion_vector" && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
        /* @__PURE__ */ f.jsxs("div", { className: Fy, children: [
          /* @__PURE__ */ f.jsxs("span", { children: [
            /* @__PURE__ */ f.jsx("span", { className: Iy, children: "Alpha" }),
            /* @__PURE__ */ f.jsx("br", {}),
            /* @__PURE__ */ f.jsx("span", { className: yR, children: "Global mix · per-line overrides bypass it" })
          ] }),
          /* @__PURE__ */ f.jsx(
            "input",
            {
              type: "range",
              min: 0,
              max: 1,
              step: 0.01,
              value: c,
              className: Gy,
              style: { "--fill": `${c * 100}%` },
              onChange: (G) => C(Number(G.target.value)),
              "aria-label": "Emotion alpha"
            }
          ),
          /* @__PURE__ */ f.jsxs("span", { className: Xy, children: [
            (c * 100).toFixed(0),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ f.jsx(
          sA,
          {
            vec: o,
            onSave: D,
            saving: b
          }
        ),
        /* @__PURE__ */ f.jsx(
          oA,
          {
            presets: h,
            activePresetId: S,
            onSelect: k,
            onDelete: z
          }
        )
      ] }),
      s === "qwen_template" && /* @__PURE__ */ f.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
        /* @__PURE__ */ f.jsx(
          "textarea",
          {
            className: bR,
            placeholder: 'e.g. "Friendly teen, slightly skeptical"',
            value: n.qwenTemplate ?? "",
            onChange: (G) => W(G.target.value)
          }
        ),
        /* @__PURE__ */ f.jsxs("span", { className: xR, children: [
          "The Qwen prompt is mapped to a vector at synth time. Per-line",
          " ",
          /* @__PURE__ */ f.jsx("code", { children: "[Char|qwen:…]" }),
          " overrides take precedence."
        ] }),
        /* @__PURE__ */ f.jsxs("div", { className: Fy, children: [
          /* @__PURE__ */ f.jsx("span", { className: Iy, children: "Alpha" }),
          /* @__PURE__ */ f.jsx(
            "input",
            {
              type: "range",
              min: 0,
              max: 1,
              step: 0.01,
              value: c,
              className: Gy,
              style: { "--fill": `${c * 100}%` },
              onChange: (G) => C(Number(G.target.value)),
              "aria-label": "Emotion alpha"
            }
          ),
          /* @__PURE__ */ f.jsxs("span", { className: Xy, children: [
            (c * 100).toFixed(0),
            "%"
          ] })
        ] })
      ] }),
      s === "audio_ref" && /* @__PURE__ */ f.jsx("div", { className: Ky, children: "Audio reference uses the voice asset assigned per character. Open the cast section to assign references; per-character overrides take precedence." }),
      v && /* @__PURE__ */ f.jsx("div", { className: SR, children: v })
    ] })
  ] });
}
function fA(n) {
  if (!n || !Array.isArray(n)) return Mf(Nf);
  const a = { ...Nf };
  return ln.forEach((r, s) => {
    const o = n[s];
    a[r] = Number.isFinite(o) ? Math.max(0, Math.min(1, o)) : 0;
  }), a;
}
function Wy(n) {
  return [...n].sort((a, r) => r.updatedAt - a.updatedAt);
}
function ef(n) {
  return n instanceof Zr || n instanceof Error ? n.message : "Unknown error";
}
const e0 = [
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
], hA = {
  help: "Read hits, write misses. Fastest on re-runs."
};
function mA({
  outputFormat: n,
  onOutputFormatChange: a,
  speedFactor: r,
  onSpeedFactorChange: s,
  cachePolicy: o,
  onCachePolicyChange: c,
  generation: h,
  onGenerationChange: m
}) {
  const v = (b, g) => {
    m({ ...h, [b]: g });
  }, p = e0.find((b) => b.id === o) ?? hA;
  return /* @__PURE__ */ f.jsxs("div", { children: [
    /* @__PURE__ */ f.jsxs("label", { className: pi, children: [
      /* @__PURE__ */ f.jsx("span", { className: Tn, children: "Format" }),
      /* @__PURE__ */ f.jsxs("select", { value: n, onChange: (b) => a(b.currentTarget.value), children: [
        /* @__PURE__ */ f.jsx("option", { value: "mp3", children: "mp3" }),
        /* @__PURE__ */ f.jsx("option", { value: "wav", children: "wav" }),
        /* @__PURE__ */ f.jsx("option", { value: "flac", children: "flac" })
      ] })
    ] }),
    /* @__PURE__ */ f.jsxs("label", { className: pi, children: [
      /* @__PURE__ */ f.jsx("span", { className: Tn, children: "Speed" }),
      /* @__PURE__ */ f.jsx(
        "input",
        {
          type: "range",
          min: 0.5,
          max: 2,
          step: 0.05,
          value: r,
          onChange: (b) => s(Number(b.currentTarget.value))
        }
      ),
      /* @__PURE__ */ f.jsxs("output", { children: [
        r.toFixed(2),
        "×"
      ] })
    ] }),
    /* @__PURE__ */ f.jsxs(
      "div",
      {
        className: pi,
        role: "radiogroup",
        "aria-label": "Cache policy",
        children: [
          /* @__PURE__ */ f.jsx("span", { className: Tn, children: "Cache" }),
          e0.map((b) => /* @__PURE__ */ f.jsx(
            Je,
            {
              variant: o === b.id ? "primary" : "secondary",
              size: "sm",
              role: "radio",
              "aria-checked": o === b.id,
              onClick: () => c(b.id),
              title: b.help,
              children: b.label
            },
            b.id
          ))
        ]
      }
    ),
    /* @__PURE__ */ f.jsx("p", { className: Tn, "aria-live": "polite", children: p.help }),
    /* @__PURE__ */ f.jsxs("label", { className: pi, children: [
      /* @__PURE__ */ f.jsx("span", { className: Tn, children: "Temperature" }),
      /* @__PURE__ */ f.jsx(
        "input",
        {
          type: "number",
          min: 0,
          max: 2,
          step: 0.05,
          defaultValue: 0.8,
          onChange: (b) => v("temperature", Number(b.currentTarget.value))
        }
      )
    ] }),
    /* @__PURE__ */ f.jsxs("label", { className: pi, children: [
      /* @__PURE__ */ f.jsx("span", { className: Tn, children: "Top-p" }),
      /* @__PURE__ */ f.jsx(
        "input",
        {
          type: "number",
          min: 0,
          max: 1,
          step: 0.05,
          defaultValue: 0.8,
          onChange: (b) => v("top_p", Number(b.currentTarget.value))
        }
      )
    ] }),
    /* @__PURE__ */ f.jsxs("label", { className: pi, children: [
      /* @__PURE__ */ f.jsx("span", { className: Tn, children: "Seed" }),
      /* @__PURE__ */ f.jsx(
        "input",
        {
          type: "number",
          defaultValue: 42,
          onChange: (b) => v("seed", Number(b.currentTarget.value))
        }
      )
    ] })
  ] });
}
var pA = "iv43qk0", t0 = "iv43qk1", gA = "iv43qk2", n0 = "iv43qk3", vA = "iv43qk4", yA = "iv43qk5", bA = "iv43qk6", xA = "iv43qk7", SA = { vector: "iv43qk8", qwen: "iv43qk9", preset: "iv43qka", audio: "iv43qkb", raw: "iv43qkc" }, wA = "iv43qkd", EA = "iv43qke", tf = "iv43qkf", nf = "iv43qkg";
function jA({
  lines: n,
  characterColors: a,
  onLineClick: r
}) {
  if (n.length === 0)
    return /* @__PURE__ */ f.jsx("p", { className: wA, children: "Paste dialogue above to see character-tagged lines, override badges, and per-line previews here." });
  const s = n.length, o = n.filter((h) => h.character !== null).length, c = s - o;
  return /* @__PURE__ */ f.jsxs("div", { children: [
    /* @__PURE__ */ f.jsxs("div", { className: EA, children: [
      /* @__PURE__ */ f.jsxs("span", { className: tf, children: [
        /* @__PURE__ */ f.jsx("span", { className: nf, children: s }),
        "lines"
      ] }),
      /* @__PURE__ */ f.jsxs("span", { className: tf, children: [
        /* @__PURE__ */ f.jsx("span", { className: nf, children: o }),
        "spoken"
      ] }),
      /* @__PURE__ */ f.jsxs("span", { className: tf, children: [
        /* @__PURE__ */ f.jsx("span", { className: nf, children: c }),
        "narration"
      ] })
    ] }),
    /* @__PURE__ */ f.jsx("ol", { className: pA, children: n.map((h) => /* @__PURE__ */ f.jsx(
      TA,
      {
        line: h,
        ...h.character && a[h.character] ? { color: a[h.character] } : {},
        ...r ? { onClick: () => r(h.idx) } : {}
      },
      h.idx
    )) })
  ] });
}
function TA({ line: n, color: a, onClick: r }) {
  return n.character === null ? /* @__PURE__ */ f.jsxs("li", { className: `${t0} ${gA}`, children: [
    /* @__PURE__ */ f.jsx("span", { className: n0, children: String(n.idx + 1).padStart(2, "0") }),
    /* @__PURE__ */ f.jsx("span", { className: bA, children: n.text })
  ] }) : /* @__PURE__ */ f.jsxs(
    "li",
    {
      className: t0,
      onClick: r,
      style: r ? { cursor: "pointer" } : void 0,
      children: [
        /* @__PURE__ */ f.jsx("span", { className: n0, children: String(n.idx + 1).padStart(2, "0") }),
        /* @__PURE__ */ f.jsx("span", { className: vA, style: a ? { color: a } : void 0, children: n.character }),
        /* @__PURE__ */ f.jsxs("span", { className: yA, children: [
          n.text,
          n.override && /* @__PURE__ */ f.jsxs("span", { className: `${xA} ${SA[n.override.kind]}`, children: [
            n.override.kind,
            n.override.label ? ` · ${n.override.label}` : ""
          ] })
        ] })
      ]
    }
  );
}
var CA = "_46z95i0", NA = "_46z95i1", MA = "_46z95i2", RA = "_46z95i3", AA = "_46z95i4", _A = "_46z95i5", DA = "_46z95i6";
const zA = {
  intensity: 0.6,
  pace: 1,
  pitchSt: 0
};
function OA({ value: n, onChange: a }) {
  return /* @__PURE__ */ f.jsxs("div", { className: CA, children: [
    /* @__PURE__ */ f.jsx(
      af,
      {
        label: "Intensity",
        sub: "How emotionally amplified each line reads",
        min: 0,
        max: 1,
        step: 0.01,
        format: (r) => `${Math.round(r * 100)}%`,
        value: n.intensity,
        onChange: (r) => a({ ...n, intensity: r })
      }
    ),
    /* @__PURE__ */ f.jsx(
      af,
      {
        label: "Pace",
        sub: "Time-stretched playback per line",
        min: 0.5,
        max: 2,
        step: 0.01,
        format: (r) => `${r.toFixed(2)}×`,
        value: n.pace,
        onChange: (r) => a({ ...n, pace: r })
      }
    ),
    /* @__PURE__ */ f.jsx(
      af,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: -12,
        max: 12,
        step: 0.5,
        format: (r) => `${r >= 0 ? "+" : ""}${r.toFixed(1)} st`,
        value: n.pitchSt,
        onChange: (r) => a({ ...n, pitchSt: r })
      }
    )
  ] });
}
function af({ label: n, sub: a, min: r, max: s, step: o, format: c, value: h, onChange: m }) {
  const v = (h - r) / (s - r) * 100, p = `perf-${n.toLowerCase()}`;
  return /* @__PURE__ */ f.jsxs("div", { className: NA, children: [
    /* @__PURE__ */ f.jsxs("div", { className: MA, children: [
      /* @__PURE__ */ f.jsx("label", { htmlFor: p, className: RA, children: n }),
      /* @__PURE__ */ f.jsx("span", { className: AA, children: a })
    ] }),
    /* @__PURE__ */ f.jsx(
      "input",
      {
        id: p,
        type: "range",
        min: r,
        max: s,
        step: o,
        value: h,
        className: _A,
        style: { "--fill": `${v}%` },
        onChange: (b) => m(Number(b.target.value))
      }
    ),
    /* @__PURE__ */ f.jsx("span", { className: DA, children: c(h) })
  ] });
}
var LA = "qe93dj0", UA = "qe93dj1", VA = "qe93dj2", kA = "qe93dj3", BA = "qe93dj4", HA = "qe93dj5", qA = "qe93dj6", $A = { ok: "qe93dj7", warn: "qe93dj8", info: "qe93dj9" }, YA = "qe93dja", FA = "qe93djb";
function IA({ checks: n }) {
  const a = n.filter((r) => r.status === "ok").length;
  return /* @__PURE__ */ f.jsxs("div", { className: LA, children: [
    /* @__PURE__ */ f.jsxs("header", { className: UA, children: [
      /* @__PURE__ */ f.jsx("span", { className: VA, children: "Pre-flight" }),
      /* @__PURE__ */ f.jsxs("span", { className: kA, children: [
        a,
        "/",
        n.length,
        " OK"
      ] })
    ] }),
    /* @__PURE__ */ f.jsx("ul", { className: BA, children: n.map((r) => /* @__PURE__ */ f.jsxs("li", { className: HA, children: [
      /* @__PURE__ */ f.jsx(
        "span",
        {
          "aria-hidden": "true",
          className: `${qA} ${$A[r.status]}`
        }
      ),
      /* @__PURE__ */ f.jsx("span", { className: YA, children: r.label }),
      r.detail && /* @__PURE__ */ f.jsx("span", { className: FA, children: r.detail })
    ] }, r.id)) })
  ] });
}
var GA = "xq3iim0", XA = "xq3iim2 xq3iim1", KA = "xq3iim3 xq3iim1", QA = "xq3iim4", ZA = "xq3iim5", PA = "xq3iim6", JA = "xq3iim7";
function WA({
  deploymentId: n,
  initialVoiceAssetId: a,
  onChange: r
}) {
  const [s, o] = x.useState([]), [c, h] = x.useState(a), [m, v] = x.useState(!0), [p, b] = x.useState(!1), [g, S] = x.useState(null);
  x.useEffect(() => {
    let j = !1;
    return v(!0), ss(n).then(({ voiceAssets: T }) => {
      j || o(T);
    }).catch((T) => {
      j || S(T instanceof Error ? T.message : "Failed to load voices");
    }).finally(() => {
      j || v(!1);
    }), () => {
      j = !0;
    };
  }, [n]);
  async function w(j) {
    b(!0), S(null);
    const T = c;
    h(j);
    try {
      await AT(n, j), r?.(j);
    } catch (A) {
      h(T), S(A instanceof Error ? A.message : "Failed to update default voice");
    } finally {
      b(!1);
    }
  }
  return m ? /* @__PURE__ */ f.jsx("p", { className: PA, children: "Loading voices…" }) : g ? /* @__PURE__ */ f.jsx("p", { className: JA, children: g }) : s.length === 0 ? /* @__PURE__ */ f.jsx("div", { role: "radiogroup", "aria-label": "Default voice for quick mode", children: /* @__PURE__ */ f.jsx(
    vs,
    {
      title: "No voices yet.",
      hint: "Upload a voice in Mappings to enable quick mode."
    }
  ) }) : /* @__PURE__ */ f.jsx(
    "div",
    {
      role: "radiogroup",
      "aria-label": "Default voice for quick mode",
      className: GA,
      children: s.map((j) => {
        const T = j.voiceAssetId === c;
        return /* @__PURE__ */ f.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": T,
            disabled: p,
            onClick: () => void w(T ? null : j.voiceAssetId),
            className: T ? KA : XA,
            children: [
              /* @__PURE__ */ f.jsx("span", { className: QA, children: j.displayName }),
              j.durationMs !== null && j.durationMs !== void 0 && /* @__PURE__ */ f.jsx("span", { className: ZA, children: e2(j.durationMs) })
            ]
          },
          j.voiceAssetId
        );
      })
    }
  );
}
function e2(n) {
  const a = n / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const r = Math.floor(a / 60), s = Math.round(a - r * 60);
  return `${r}:${s.toString().padStart(2, "0")}`;
}
var a0 = "_17fbpt30", i0 = "_17fbpt31", r0 = "_17fbpt32", t2 = "_17fbpt33", n2 = "_17fbpt34", a2 = "_17fbpt35", l0 = "_17fbpt36", i2 = "_17fbpt37", r2 = "_17fbpt38";
const l2 = {
  completed: "success",
  running: "accent",
  queued: "neutral",
  failed: "danger",
  cancelled: "faint",
  partial: "warning"
};
function s2({
  runs: n,
  deploymentId: a,
  onOpenQueue: r,
  onOpenRun: s,
  emptyHint: o
}) {
  return n.length === 0 ? /* @__PURE__ */ f.jsxs("div", { className: a0, children: [
    /* @__PURE__ */ f.jsx("header", { className: i0, children: /* @__PURE__ */ f.jsx(
      "a",
      {
        className: r0,
        href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
        onClick: r ? (c) => {
          c.preventDefault(), r();
        } : void 0,
        children: "Open queue →"
      }
    ) }),
    /* @__PURE__ */ f.jsx("p", { className: i2, children: "No runs yet." }),
    /* @__PURE__ */ f.jsx("p", { className: r2, children: o ?? "Hit Generate to enqueue a batch." })
  ] }) : /* @__PURE__ */ f.jsxs("div", { className: a0, children: [
    /* @__PURE__ */ f.jsxs("header", { className: i0, children: [
      /* @__PURE__ */ f.jsx("span", {}),
      /* @__PURE__ */ f.jsx(
        "a",
        {
          className: r0,
          href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
          onClick: r ? (c) => {
            c.preventDefault(), r();
          } : void 0,
          children: "Open queue →"
        }
      )
    ] }),
    /* @__PURE__ */ f.jsx("ul", { className: t2, children: n.slice(0, 5).map((c) => /* @__PURE__ */ f.jsx("li", { children: /* @__PURE__ */ f.jsxs(
      "button",
      {
        type: "button",
        className: n2,
        onClick: s ? () => s(c.runId) : void 0,
        children: [
          /* @__PURE__ */ f.jsx("span", { className: a2, children: c.runId }),
          /* @__PURE__ */ f.jsx("span", { className: `${Wb.sm} ${ex[l2[c.status] ?? "neutral"]}`, children: c.status }),
          /* @__PURE__ */ f.jsx("span", { className: l0, children: o2(c.startedAt ?? c.queuedAt) }),
          /* @__PURE__ */ f.jsx("span", { className: l0, children: c.kind })
        ]
      }
    ) }, c.runId)) })
  ] });
}
function o2(n) {
  if (!n) return "—";
  const a = n > 1e12 ? Math.floor(n / 1e3) : n, r = new Date(a * 1e3);
  if (Number.isNaN(r.getTime())) return "—";
  const o = Date.now() - r.getTime();
  return o < 6e4 ? "just now" : o < 36e5 ? `${Math.floor(o / 6e4)}m ago` : o < 864e5 ? `${Math.floor(o / 36e5)}h ago` : r.toISOString().slice(0, 16).replace("T", " ");
}
function u2(n) {
  const a = Qr(), [r, s] = x.useState("idle"), [o, c] = x.useState(null), [h, m] = x.useState(/* @__PURE__ */ new Map()), [v, p] = x.useState(null), [b, g] = x.useState(null), S = x.useRef(null);
  x.useEffect(() => () => {
    S.current?.();
  }, []);
  const w = x.useCallback(async () => {
    s("starting"), p(null), m(/* @__PURE__ */ new Map()), g(null);
    try {
      const H = await OT(n.deploymentId, n.createPayload);
      c(H.runId), s("running"), S.current?.(), S.current = sy(
        n.deploymentId,
        H.runId,
        (Z) => s0(Z, m, s, g, n.deploymentId, H.runId),
        () => s("error")
      );
    } catch (H) {
      s("error"), p(rf(H));
    }
  }, [n.deploymentId, n.createPayload]), j = x.useCallback(async () => {
    if (o)
      try {
        await LT(n.deploymentId, o);
      } catch (H) {
        p(rf(H));
      }
  }, [n.deploymentId, o]), T = Array.from(h.values()).sort((H, Z) => H.globalIndex - Z.globalIndex), A = r === "starting" || r === "running", C = b?.status === "partial", D = T.filter((H) => H.status === "failed"), z = (() => {
    if (r !== "terminal" || D.length === 0) return null;
    const H = /* @__PURE__ */ new Map();
    for (const ve of D) {
      const je = ve.failureCategory ?? "unknown";
      H.set(je, (H.get(je) ?? 0) + 1);
    }
    let Z = "unknown", ue = 0;
    for (const [ve, je] of H)
      je > ue && (Z = ve, ue = je);
    const oe = T.length;
    return { category: Z, count: ue, total: oe };
  })(), k = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, W = "Check the run detail page for the per-segment error log.", G = v?.toLowerCase().includes("unmapped") ?? !1, ee = n.diagnostics ?? [], R = ee.find((H) => H.status === "fail");
  return /* @__PURE__ */ f.jsxs("div", { children: [
    ee.length > 0 && /* @__PURE__ */ f.jsx("ul", { className: WN, "aria-label": "Pre-flight checks", children: ee.map((H) => /* @__PURE__ */ f.jsxs("li", { className: eM, children: [
      /* @__PURE__ */ f.jsx(xi, { tone: d2(H.status), children: f2(H.status) }),
      /* @__PURE__ */ f.jsx("span", { className: tM, children: H.label }),
      H.detail && /* @__PURE__ */ f.jsx("span", { className: nM, children: H.detail })
    ] }, H.label)) }),
    v && /* @__PURE__ */ f.jsxs(
      Nn,
      {
        severity: "error",
        style: {
          marginBottom: 12,
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 8
        },
        children: [
          /* @__PURE__ */ f.jsx("strong", { children: "Run failed to start" }),
          /* @__PURE__ */ f.jsx("span", { children: v }),
          G && /* @__PURE__ */ f.jsx(
            Je,
            {
              variant: "secondary",
              onClick: () => a(`/${n.deploymentId}/mappings`),
              style: { alignSelf: "flex-start" },
              children: "Open Mappings →"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ f.jsxs("div", { className: pi, children: [
      /* @__PURE__ */ f.jsx(
        Je,
        {
          disabled: !n.canGenerate || A || !!R,
          onClick: w,
          children: r === "running" ? "Running…" : "Generate + Export ZIP"
        }
      ),
      /* @__PURE__ */ f.jsx(Je, { variant: "danger", disabled: !A, onClick: j, children: "Cancel" })
    ] }),
    z && /* @__PURE__ */ f.jsxs(Nn, { severity: "error", style: { flexDirection: "column", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ f.jsxs("strong", { children: [
        "Run failed — ",
        z.count,
        " of ",
        z.total,
        " segments failed with ",
        /* @__PURE__ */ f.jsx("code", { children: z.category })
      ] }),
      /* @__PURE__ */ f.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: k[z.category] ?? W })
    ] }),
    b?.exportArtifactRef && /* @__PURE__ */ f.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${b.exportArtifactRef}/download`,
        download: !0,
        className: `${Qb.secondary} ${Zb.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    C && b && /* @__PURE__ */ f.jsxs(Nn, { severity: "warning", children: [
      /* @__PURE__ */ f.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ f.jsx(
        Je,
        {
          variant: "secondary",
          disabled: !!R,
          onClick: async () => {
            try {
              const H = await Ib(n.deploymentId, b.runId);
              c(H.runId), m(/* @__PURE__ */ new Map()), g(null), s("running"), S.current?.(), S.current = sy(
                n.deploymentId,
                H.runId,
                (Z) => s0(Z, m, s, g, n.deploymentId, H.runId),
                () => s("error")
              );
            } catch (H) {
              p(rf(H)), s("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    T.length > 0 && /* @__PURE__ */ f.jsxs("table", { className: PN, children: [
      /* @__PURE__ */ f.jsx("thead", { children: /* @__PURE__ */ f.jsxs("tr", { children: [
        /* @__PURE__ */ f.jsx("th", { className: fi, children: "#" }),
        /* @__PURE__ */ f.jsx("th", { className: fi, children: "Status" }),
        /* @__PURE__ */ f.jsx("th", { className: fi, children: "Duration" }),
        /* @__PURE__ */ f.jsx("th", { className: fi, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ f.jsx("tbody", { children: T.map((H) => /* @__PURE__ */ f.jsxs("tr", { className: JN, children: [
        /* @__PURE__ */ f.jsx("td", { className: fi, children: H.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ f.jsx("td", { className: fi, children: /* @__PURE__ */ f.jsx(xi, { tone: c2(H.status), children: H.status }) }),
        /* @__PURE__ */ f.jsx("td", { className: fi, children: H.durationMs ? `${H.durationMs} ms` : "—" }),
        /* @__PURE__ */ f.jsx("td", { className: fi, children: H.failureCategory ?? "" })
      ] }, H.globalIndex)) })
    ] })
  ] });
}
async function s0(n, a, r, s, o, c) {
  switch (n.type) {
    case "segment_started":
      a((h) => {
        const m = new Map(h);
        return m.set(n.globalIndex, { globalIndex: n.globalIndex, status: "running" }), m;
      });
      return;
    case "segment_completed":
      a((h) => {
        const m = new Map(h);
        return m.set(n.globalIndex, {
          globalIndex: n.globalIndex,
          status: "completed",
          durationMs: n.durationMs
        }), m;
      });
      return;
    case "segment_failed":
      a((h) => {
        const m = new Map(h);
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
        const h = await hh(o, c);
        s(h);
      } catch {
      }
      return;
  }
}
function c2(n) {
  switch (n) {
    case "completed":
      return "success";
    case "running":
      return "accent";
    case "failed":
      return "danger";
    default:
      return "neutral";
  }
}
function d2(n) {
  switch (n) {
    case "ok":
      return "success";
    case "warn":
      return "warning";
    case "fail":
      return "danger";
  }
}
function f2(n) {
  switch (n) {
    case "ok":
      return "ok";
    case "warn":
      return "warn";
    case "fail":
      return "stop";
  }
}
function rf(n) {
  return n instanceof Zr || n instanceof Error ? n.message : "unknown error";
}
const o0 = [
  // audit-allow: hex — neon decorative palette per design lang
  "var(--accent, #ba9eff)",
  // audit-allow: hex — neon decorative palette per design lang
  "var(--secondary, #9093ff)",
  // audit-allow: hex — neon decorative palette per design lang
  "var(--tertiary, #ff8439)",
  // audit-allow: hex — neon decorative palette per design lang
  "var(--success, #80e0a8)",
  // audit-allow: hex — neon decorative palette per design lang
  "var(--warning, #f0c265)",
  // audit-allow: hex — neon decorative palette per design lang
  "var(--info, #7fdbff)"
];
function h2(n) {
  const a = Qr(), r = x.useRef(null), { tokens: s, attributions: o, unresolved: c, predictedFilenames: h, characterColor: m } = x.useMemo(
    () => p2(n.value, n.outputFormat, n.mappings),
    [n.value, n.outputFormat, n.mappings]
  ), v = (p) => {
    const b = r.current;
    b && (b.scrollTop = p.currentTarget.scrollTop, b.scrollLeft = p.currentTarget.scrollLeft);
  };
  return /* @__PURE__ */ f.jsxs("div", { children: [
    /* @__PURE__ */ f.jsxs("div", { className: GN, children: [
      /* @__PURE__ */ f.jsx("div", { ref: r, className: XN, "aria-hidden": "true", children: s.map((p, b) => m2(p, b, m)) }),
      /* @__PURE__ */ f.jsx(
        "textarea",
        {
          className: KN,
          value: n.value,
          onChange: (p) => n.onChange(p.currentTarget.value),
          onScroll: v,
          placeholder: `[Bob] Hey there
[Alice] Hello
...`,
          "aria-label": "Dialogue script",
          spellCheck: !1
        }
      )
    ] }),
    c.length > 0 && /* @__PURE__ */ f.jsxs(Nn, { severity: "error", children: [
      /* @__PURE__ */ f.jsx("strong", { children: "Unresolved characters:" }),
      " ",
      c.map((p) => /* @__PURE__ */ f.jsxs(
        Je,
        {
          variant: "secondary",
          size: "sm",
          onClick: () => a(
            `/${n.deploymentId}/mappings/new?character=${encodeURIComponent(p)}`
          ),
          children: [
            "Create mapping for ",
            p
          ]
        },
        p
      ))
    ] }),
    o.length > 0 && /* @__PURE__ */ f.jsxs("div", { children: [
      /* @__PURE__ */ f.jsx("span", { className: Tn, children: "Parsed lines" }),
      /* @__PURE__ */ f.jsx("ul", { className: Vy, children: o.map((p) => /* @__PURE__ */ f.jsxs("li", { children: [
        "#",
        p.lineNumber.toString().padStart(3, "0"),
        " [",
        p.character,
        "] ",
        p.text,
        !p.hasMapping && p.character !== "Narrator" && " — unresolved"
      ] }, p.lineNumber)) })
    ] }),
    h.length > 0 && /* @__PURE__ */ f.jsxs("div", { children: [
      /* @__PURE__ */ f.jsx("span", { className: Tn, children: "Predicted filenames" }),
      /* @__PURE__ */ f.jsx("ul", { className: Vy, children: h.map((p) => /* @__PURE__ */ f.jsx("li", { children: p }, p)) })
    ] })
  ] });
}
function m2(n, a, r) {
  if (n.kind === "blank")
    return /* @__PURE__ */ f.jsxs("span", { children: [
      n.raw,
      `
`
    ] }, a);
  if (n.kind === "narrator")
    return /* @__PURE__ */ f.jsxs("span", { children: [
      /* @__PURE__ */ f.jsx("span", { className: Uy, children: n.raw }),
      `
`
    ] }, a);
  const s = r.get(n.character?.toLowerCase() ?? "") ?? "currentColor", o = n.hasMapping ? Ly : `${Ly} ${QN}`;
  return /* @__PURE__ */ f.jsxs("span", { children: [
    /* @__PURE__ */ f.jsxs("span", { className: o, style: { color: s }, children: [
      "[",
      n.character,
      n.override && /* @__PURE__ */ f.jsxs("span", { className: ZN, children: [
        "|",
        n.override
      ] }),
      "]"
    ] }),
    /* @__PURE__ */ f.jsxs("span", { className: Uy, children: [
      " ",
      n.text ?? ""
    ] }),
    `
`
  ] }, a);
}
function p2(n, a, r) {
  const s = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], c = [], h = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map(), v = [], p = /* @__PURE__ */ new Map();
  let b = 0;
  const g = n.split(/\r?\n/);
  let S = 0;
  return g.forEach((w, j) => {
    const T = w.trim();
    if (!T) {
      o.push({ kind: "blank", raw: w });
      return;
    }
    const A = j + 1, C = T.match(s);
    let D = "Narrator", z = T, k, W = !1;
    if (C?.groups) {
      W = !0;
      const H = (C.groups.body ?? "").trim(), Z = (C.groups.rest ?? "").trim();
      D = ((H.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", k = (H.includes("|") ? H.slice(H.indexOf("|") + 1) : "").trim() || void 0, z = Z;
    }
    S += 1;
    const G = D.toLowerCase(), ee = (m.get(G) ?? 0) + 1;
    m.set(G, ee);
    const R = D === "Narrator" || r.has(G);
    if (R || h.add(D), D !== "Narrator" && !p.has(G) && (p.set(G, o0[b % o0.length] ?? "currentColor"), b += 1), W) {
      const H = { kind: "character", raw: w, character: D, text: z, hasMapping: R };
      k !== void 0 && (H.override = k), o.push(H);
    } else
      o.push({ kind: "narrator", raw: w });
    c.push({ lineNumber: A, character: D, text: z, hasMapping: R }), v.push(
      `${S.toString().padStart(3, "0")}_${g2(D)}_${ee.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: c,
    unresolved: Array.from(h),
    predictedFilenames: v,
    characterColor: p
  };
}
function g2(n) {
  const a = n.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
const lf = [
  "#ba9eff",
  "#9093ff",
  "#ff8439",
  "#22c55e",
  "#ffd34a",
  "#ff7aa8"
], v2 = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;
function y2(n) {
  const a = [];
  if (!n) return a;
  const r = n.split(/\r?\n/);
  for (let s = 0; s < r.length; s += 1) {
    const c = (r[s] ?? "").trim();
    if (c.length === 0) continue;
    const h = c.match(v2);
    if (!h || !h.groups) {
      a.push({ idx: s, character: null, text: c, override: null });
      continue;
    }
    const m = h.groups.body ?? "", v = (h.groups.rest ?? "").trim(), [p = "", ...b] = m.split("|"), g = p.trim();
    if (!g) {
      a.push({ idx: s, character: null, text: v || c, override: null });
      continue;
    }
    const S = g.split(":")[0]?.trim() || null, w = b.join("|").trim(), j = w ? b2(w) : null;
    a.push({
      idx: s,
      character: S,
      text: v,
      override: j
    });
  }
  return a;
}
function b2(n) {
  const a = n.trim();
  if (!a) return { kind: "raw", label: "" };
  const r = a.indexOf(":"), s = r >= 0 ? a.slice(0, r).trim().toLowerCase() : a.toLowerCase(), o = r >= 0 ? a.slice(r + 1).trim() : "";
  switch (s) {
    case "emotion_vector":
    case "vector":
      return { kind: "vector", label: o || a };
    case "qwen":
    case "qwen_template":
      return { kind: "qwen", label: o || a };
    case "preset":
      return { kind: "preset", label: o || a };
    case "audio":
      return { kind: "audio", label: o || a };
    default:
      return { kind: "raw", label: a };
  }
}
function x2(n) {
  const a = /* @__PURE__ */ new Set(), r = [];
  for (const s of n) {
    if (!s.character) continue;
    const o = s.character.toLowerCase();
    a.has(o) || (a.add(o), r.push(s.character));
  }
  return r;
}
function S2(n) {
  const a = {};
  for (let r = 0; r < n.length; r += 1) {
    const s = n[r];
    s && (a[s] = lf[r % lf.length] ?? lf[0]);
  }
  return a;
}
function w2(n) {
  const a = {};
  for (const r of n)
    r.character && (a[r.character] = (a[r.character] ?? 0) + 1);
  return a;
}
function E2(n) {
  const a = n.workflowCustomised ?? !1, r = n.unmappableFields ?? [];
  return /* @__PURE__ */ f.jsxs("div", { className: zN, children: [
    /* @__PURE__ */ f.jsxs("header", { className: ON, children: [
      /* @__PURE__ */ f.jsx("div", { className: UN, children: "EmotionTTS · Recipe Studio" }),
      /* @__PURE__ */ f.jsx("div", { className: LN, children: /* @__PURE__ */ f.jsx("h1", { className: VN, children: n.deployment.displayName }) }),
      /* @__PURE__ */ f.jsx("p", { className: kN, children: "Author the script, cast the voices, sculpt the emotion, and modulate every utterance — all from a single screen, with cache-bound previews and a non-destructive edit chain." }),
      n.hero
    ] }),
    a && /* @__PURE__ */ f.jsxs(Nn, { severity: "warning", children: [
      /* @__PURE__ */ f.jsx("strong", { children: "Workflow customised." }),
      " ",
      r.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${r.join(", ")}.`,
      " ",
      /* @__PURE__ */ f.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: BN, children: [
      /* @__PURE__ */ f.jsx(
        Fi,
        {
          number: "01",
          title: "Script",
          id: "recipe-section-script",
          variant: "default",
          children: n.scriptSection
        }
      ),
      /* @__PURE__ */ f.jsx(
        Fi,
        {
          number: "02",
          title: "Parsed dialogue",
          id: "recipe-section-parsed",
          variant: "default",
          children: n.parsedDialogueSection
        }
      ),
      /* @__PURE__ */ f.jsx(
        Fi,
        {
          number: "03",
          title: "Cast",
          id: "recipe-section-cast",
          variant: "default",
          children: n.castSection
        }
      ),
      /* @__PURE__ */ f.jsx(
        Fi,
        {
          number: "04",
          title: "Emotion",
          id: "recipe-section-emotion",
          variant: "split",
          children: n.emotionSection
        }
      ),
      /* @__PURE__ */ f.jsx(
        Fi,
        {
          number: "05",
          title: "Performance",
          id: "recipe-section-performance",
          variant: "default",
          children: n.performanceSection
        }
      ),
      /* @__PURE__ */ f.jsx(
        Fi,
        {
          number: "06",
          title: "Recent runs",
          id: "recipe-section-runs",
          variant: "default",
          children: n.recentRunsSection
        }
      ),
      n.auditSection && /* @__PURE__ */ f.jsx(
        Fi,
        {
          number: "07",
          title: "Edit history",
          id: "recipe-section-audit",
          variant: "default",
          children: n.auditSection
        }
      )
    ] })
  ] });
}
function Fi({ number: n, title: a, id: r, variant: s, children: o }) {
  return /* @__PURE__ */ f.jsxs("section", { className: HN, "aria-labelledby": r, children: [
    /* @__PURE__ */ f.jsx("header", { className: qN, children: /* @__PURE__ */ f.jsxs("div", { children: [
      /* @__PURE__ */ f.jsxs("div", { className: $N, children: [
        n,
        " / ",
        a
      ] }),
      /* @__PURE__ */ f.jsx("h2", { id: r, className: YN, children: a })
    ] }) }),
    /* @__PURE__ */ f.jsx("div", { className: s === "split" ? IN : FN, children: o })
  ] });
}
const Oa = {
  success(n) {
    oy.success(n);
  },
  error(n) {
    oy.error(n);
  }
};
function j2() {
  const { deployment: n, mappings: a, runs: r, workflow: s } = gs(), [o, c] = x.useState(a), [h, m] = x.useState([]), [v, p] = x.useState([]), [b, g] = x.useState(null), [S, w] = x.useState(wu), [j, T] = x.useState(""), [A, C] = x.useState(
    n.defaultOutputFormat ?? "mp3"
  ), [D, z] = x.useState(n.defaultSpeedFactor ?? 1), [k, W] = x.useState({
    mode: "none",
    emotionAlpha: 1
  }), [G, ee] = x.useState({}), [R, H] = x.useState("use_cache"), [Z, ue] = x.useState(n.defaultVoiceAssetId != null), [oe, ve] = x.useState(zA);
  x.useEffect(() => {
    let se = !1;
    return ss(n.deploymentId).then((De) => {
      se || m(De.voiceAssets);
    }).catch(() => {
    }), Kb(n.deploymentId).then((De) => {
      se || p(De.presets);
    }).catch(() => {
    }), () => {
      se = !0;
    };
  }, [n.deploymentId]);
  const je = x.useMemo(() => y2(j), [j]), le = x.useMemo(() => x2(je), [je]), L = x.useMemo(() => S2(le), [le]), U = x.useMemo(() => w2(je), [je]), q = x.useMemo(() => {
    const se = /* @__PURE__ */ new Map();
    for (const De of o)
      se.set(De.characterName.toLowerCase(), De);
    return se;
  }, [o]), Q = x.useMemo(() => Z ? 0 : le.filter((se) => !q.has(se.toLowerCase())).length, [le, q, Z]), ae = x.useCallback(
    async (se, De) => {
      const Oe = q.get(se.toLowerCase());
      try {
        if (Oe) {
          const _e = await ru(n.deploymentId, Oe.mappingId, De);
          c(
            (We) => We.map((ft) => ft.mappingId === _e.mappingId ? _e : ft)
          ), Oa.success(`Updated mapping for ${se}`);
        } else if (De.speakerVoiceAssetId) {
          const _e = await fh(n.deploymentId, {
            ...De,
            characterName: se,
            speakerVoiceAssetId: De.speakerVoiceAssetId
          });
          c((We) => [...We, _e]), Oa.success(`Mapped ${se} to voice`);
        }
      } catch (_e) {
        Oa.error(_e instanceof Error ? _e.message : "mapping failed");
      }
    },
    [q, n.deploymentId]
  ), N = x.useCallback(
    async (se) => {
      const De = q.get(se.toLowerCase());
      if (De)
        try {
          await Fb(n.deploymentId, De.mappingId), c((Oe) => Oe.filter((_e) => _e.mappingId !== De.mappingId)), Oa.success(`Cleared mapping for ${se}`);
        } catch (Oe) {
          Oa.error(Oe instanceof Error ? Oe.message : "clear failed");
        }
    },
    [q, n.deploymentId]
  ), X = x.useCallback(
    async (se, De) => {
      try {
        const Oe = await Gb(
          n.deploymentId,
          De,
          De.name.replace(/\.[^.]+$/, ""),
          "speaker"
        );
        m((_e) => [Oe, ..._e]), await ae(se, { speakerVoiceAssetId: Oe.voiceAssetId });
      } catch (Oe) {
        Oa.error(Oe instanceof Error ? Oe.message : "upload failed");
      }
    },
    [n.deploymentId, ae]
  ), P = x.useCallback(
    (se) => {
      w(se), pM({ version: 1, ops: [] }, se);
    },
    []
  ), ie = x.useMemo(() => {
    const se = [], De = /* @__PURE__ */ new Set();
    for (const Oe of o) {
      const _e = Oe.speakerVoiceAssetId;
      if (!_e || De.has(_e)) continue;
      De.add(_e);
      const ft = h.find((Mn) => Mn.voiceAssetId === _e)?.displayName ?? `${Oe.characterName} · ${_e.slice(0, 8)}`;
      se.push({ kind: "voice_asset", id: _e, label: ft });
    }
    for (const Oe of h)
      De.has(Oe.voiceAssetId) || (De.add(Oe.voiceAssetId), se.push({ kind: "voice_asset", id: Oe.voiceAssetId, label: Oe.displayName }));
    return se;
  }, [o, h]), fe = x.useCallback(
    async (se) => {
      if (se.kind !== "voice_asset") {
        Oa.error("Revert is only supported for voice assets in v1.");
        return;
      }
      try {
        await HC(se.id, n.deploymentId);
        const De = o.filter((Oe) => Oe.speakerVoiceAssetId === se.id);
        await Promise.all(
          De.map(
            (Oe) => ru(n.deploymentId, Oe.mappingId, {
              voiceAssetChainDigest: null
            }).catch(() => null)
          )
        ), c(
          (Oe) => Oe.map(
            (_e) => _e.speakerVoiceAssetId === se.id ? { ..._e, voiceAssetChainDigest: null } : _e
          )
        ), Oa.success(`Cleared edit chain on ${se.label}`);
      } catch (De) {
        Oa.error(De instanceof Error ? De.message : "revert failed");
      }
    },
    [n.deploymentId, o]
  ), ye = x.useMemo(
    () => ({
      script: j,
      parserMode: Z ? "raw_text" : "dialogue",
      outputFormat: A,
      speedFactor: oe.pace,
      globalEmotion: { ...k, emotionAlpha: oe.intensity },
      generation: G,
      cachePolicy: R
    }),
    [j, Z, A, oe.pace, oe.intensity, k, G, R]
  ), Me = x.useMemo(
    () => N2({
      script: j,
      quickMode: Z,
      defaultVoiceAssetId: n.defaultVoiceAssetId,
      characters: le,
      unmappedCount: Q,
      globalEmotion: k,
      performance: oe
    }),
    [j, Z, n.defaultVoiceAssetId, le, Q, k, oe]
  ), Ae = x.useMemo(
    () => Me.filter((se) => se.id !== "performance").map((se) => ({
      label: se.label,
      status: se.status === "ok" ? "ok" : se.status === "warn" ? "warn" : "fail",
      detail: se.detail
    })),
    [Me]
  );
  return /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
    /* @__PURE__ */ f.jsx(VC, { position: "bottom-right", richColors: !0, theme: "dark" }),
    /* @__PURE__ */ f.jsx(
      E2,
      {
        deployment: n,
        workflowCustomised: s.workflow.customised,
        unmappableFields: s.unmappableFields,
        hero: /* @__PURE__ */ f.jsx(lM, { deployment: n }),
        scriptSection: /* @__PURE__ */ f.jsx(
          T2,
          {
            quickMode: Z,
            onToggleQuickMode: ue,
            deployment: n,
            script: j,
            onScriptChange: T,
            outputFormat: A,
            mappingsByLower: q
          }
        ),
        parsedDialogueSection: /* @__PURE__ */ f.jsx(jA, { lines: je, characterColors: L }),
        castSection: /* @__PURE__ */ f.jsx(TN, { unmappedCount: Q, totalCount: le.length, children: le.map((se) => {
          const De = q.get(se.toLowerCase()) ?? null, Oe = L[se] ?? "#ba9eff";
          return /* @__PURE__ */ f.jsx("li", { style: { listStyle: "none" }, children: /* @__PURE__ */ f.jsx(
            jN,
            {
              characterName: se,
              color: Oe,
              lineCount: U[se] ?? 0,
              mapping: De,
              voiceAssets: h,
              presets: v,
              active: b === se,
              onToggle: () => g((_e) => _e === se ? null : se),
              onAssignVoiceAsset: (_e) => ae(se, { speakerVoiceAssetId: _e }),
              onAssignPreset: (_e) => ae(se, { defaultVectorPresetId: _e }),
              onUploadFile: (_e) => X(se, _e),
              onClearMapping: () => N(se)
            }
          ) }, se);
        }) }),
        emotionSection: /* @__PURE__ */ f.jsx(
          dA,
          {
            value: k,
            onChange: W,
            deploymentId: n.deploymentId
          }
        ),
        performanceSection: /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
          /* @__PURE__ */ f.jsx(OA, { value: oe, onChange: ve }),
          /* @__PURE__ */ f.jsx(
            gh,
            {
              state: S,
              onChange: P,
              supportsSynthSpeed: !1
            }
          ),
          /* @__PURE__ */ f.jsx(IA, { checks: Me }),
          /* @__PURE__ */ f.jsx(
            mA,
            {
              outputFormat: A,
              onOutputFormatChange: C,
              speedFactor: D,
              onSpeedFactorChange: z,
              cachePolicy: R,
              onCachePolicyChange: H,
              generation: G,
              onGenerationChange: ee
            }
          ),
          /* @__PURE__ */ f.jsx(
            u2,
            {
              deploymentId: n.deploymentId,
              createPayload: ye,
              canGenerate: j.trim().length > 0,
              diagnostics: Ae
            }
          )
        ] }),
        recentRunsSection: /* @__PURE__ */ f.jsx(s2, { runs: r, deploymentId: n.deploymentId }),
        auditSection: /* @__PURE__ */ f.jsx(
          rN,
          {
            deploymentId: n.deploymentId,
            targets: ie,
            onRevertToIdentity: fe
          }
        )
      }
    )
  ] });
}
function T2({
  quickMode: n,
  onToggleQuickMode: a,
  deployment: r,
  script: s,
  onScriptChange: o,
  outputFormat: c,
  mappingsByLower: h
}) {
  const m = s.length, v = s.trim() ? s.trim().split(/\s+/).length : 0, p = s.trim() ? s.trim().split(/\r?\n/).filter((b) => b.trim()).length : 0;
  return /* @__PURE__ */ f.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: [
    /* @__PURE__ */ f.jsxs(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap"
        },
        children: [
          /* @__PURE__ */ f.jsxs("label", { style: { display: "inline-flex", alignItems: "center", gap: 8 }, children: [
            /* @__PURE__ */ f.jsx(
              "input",
              {
                type: "checkbox",
                checked: n,
                onChange: (b) => a(b.target.checked)
              }
            ),
            "Quick mode (no character mapping required)"
          ] }),
          n && /* @__PURE__ */ f.jsx(
            WA,
            {
              deploymentId: r.deploymentId,
              initialVoiceAssetId: r.defaultVoiceAssetId ?? null
            }
          ),
          /* @__PURE__ */ f.jsxs(
            "div",
            {
              style: {
                display: "inline-flex",
                gap: 16,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--on-surface-variant)",
                marginLeft: "auto"
              },
              "aria-live": "polite",
              children: [
                /* @__PURE__ */ f.jsxs("span", { children: [
                  /* @__PURE__ */ f.jsx("strong", { style: { color: "var(--accent)", fontFamily: "var(--font-mono)" }, children: m.toString().padStart(3, "0") }),
                  " ",
                  "chars"
                ] }),
                /* @__PURE__ */ f.jsxs("span", { children: [
                  /* @__PURE__ */ f.jsx("strong", { style: { color: "var(--accent)", fontFamily: "var(--font-mono)" }, children: p.toString().padStart(2, "0") }),
                  " ",
                  "lines"
                ] }),
                /* @__PURE__ */ f.jsxs("span", { children: [
                  /* @__PURE__ */ f.jsx("strong", { style: { color: "var(--accent)", fontFamily: "var(--font-mono)" }, children: v.toString().padStart(3, "0") }),
                  " ",
                  "words"
                ] })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ f.jsx(
      h2,
      {
        value: s,
        onChange: o,
        outputFormat: c,
        mappings: h,
        deploymentId: r.deploymentId
      }
    ),
    /* @__PURE__ */ f.jsx(C2, {})
  ] });
}
function C2() {
  return /* @__PURE__ */ f.jsxs(
    "ul",
    {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 16,
        padding: 0,
        margin: 0,
        listStyle: "none",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--on-surface-variant)"
      },
      children: [
        /* @__PURE__ */ f.jsxs("li", { children: [
          /* @__PURE__ */ f.jsx("code", { style: { color: "var(--accent)" }, children: "[Char]" }),
          " plain line"
        ] }),
        /* @__PURE__ */ f.jsxs("li", { children: [
          /* @__PURE__ */ f.jsx("code", { style: { color: "var(--accent)" }, children: "[Char|emotion_vector:happy=0.7]" }),
          " per-line vector"
        ] }),
        /* @__PURE__ */ f.jsxs("li", { children: [
          /* @__PURE__ */ f.jsx("code", { style: { color: "var(--secondary)" }, children: "[Char|qwen:warm]" }),
          " AI prompt mapping"
        ] }),
        /* @__PURE__ */ f.jsxs("li", { children: [
          /* @__PURE__ */ f.jsx("code", { style: { color: "var(--tertiary)" }, children: "[Char|preset:Bittersweet]" }),
          " saved preset"
        ] }),
        /* @__PURE__ */ f.jsxs("li", { children: [
          /* @__PURE__ */ f.jsx("code", { style: { color: "var(--acid-green)" }, children: "[Char|audio:slow_breath.wav]" }),
          " audio reference"
        ] })
      ]
    }
  );
}
function N2({
  script: n,
  quickMode: a,
  defaultVoiceAssetId: r,
  characters: s,
  unmappedCount: o,
  globalEmotion: c,
  performance: h
}) {
  const m = [], v = n.trim();
  if (!v)
    m.push({ id: "script", status: "warn", label: "Script", detail: "empty" });
  else {
    const p = v.split(/\r?\n/).filter((b) => b.trim()).length;
    m.push({
      id: "script",
      status: "ok",
      label: "Script",
      detail: `${p} lines · ${v.length} chars`
    });
  }
  if (a ? m.push({
    id: "voice",
    status: r ? "ok" : "warn",
    label: "Quick voice",
    detail: r ? "default voice set" : "no default voice"
  }) : s.length === 0 ? m.push({ id: "cast", status: "info", label: "Cast", detail: "no characters detected" }) : o === 0 ? m.push({ id: "cast", status: "ok", label: "Cast", detail: `${s.length} mapped` }) : m.push({
    id: "cast",
    status: "warn",
    label: "Cast",
    detail: `${o} unmapped`
  }), c.mode === "qwen_template" && !c.qwenTemplate?.trim())
    m.push({ id: "emotion", status: "warn", label: "Emotion", detail: "Qwen template empty" });
  else if (c.mode === "emotion_vector") {
    const p = c.vector, b = Array.isArray(p) && p.some((g) => Math.abs(g) > 0.01);
    m.push({
      id: "emotion",
      status: b ? "ok" : "info",
      label: "Emotion",
      detail: b ? "8-axis vector" : "neutral vector"
    });
  } else c.mode === "audio_ref" ? m.push({ id: "emotion", status: "ok", label: "Emotion", detail: "audio reference" }) : m.push({ id: "emotion", status: "info", label: "Emotion", detail: "neutral" });
  return m.push({
    id: "performance",
    status: "info",
    label: "Performance",
    detail: `intensity ${Math.round(h.intensity * 100)}% · pace ${h.pace.toFixed(2)}× · pitch ${h.pitchSt >= 0 ? "+" : ""}${h.pitchSt.toFixed(1)}st`
  }), m;
}
const u0 = /* @__PURE__ */ new Map();
function M2(n, a) {
  const [r, s] = x.useState({
    peaks: null,
    isLoading: !0,
    error: null
  });
  return x.useEffect(() => {
    if (!n || a <= 0) {
      s({ peaks: null, isLoading: !1, error: null });
      return;
    }
    const o = `${n}::${a}`, c = u0.get(o);
    if (c) {
      s({ peaks: c, isLoading: !1, error: null });
      return;
    }
    const h = new AbortController();
    return s({ peaks: null, isLoading: !0, error: null }), R2(n, a, h.signal).then((m) => {
      h.signal.aborted || (u0.set(o, m), s({ peaks: m, isLoading: !1, error: null }));
    }).catch((m) => {
      if (h.signal.aborted) return;
      const v = m instanceof Error ? m.message : "decode failed";
      s({ peaks: null, isLoading: !1, error: v });
    }), () => h.abort();
  }, [n, a]), r;
}
async function R2(n, a, r) {
  const s = await fetch(n, { signal: r });
  if (!s.ok) throw new Error(`failed to load audio (${s.status})`);
  const o = await s.arrayBuffer();
  if (r.aborted) throw new DOMException("aborted", "AbortError");
  const h = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return A2(h, a);
}
function A2(n, a) {
  const r = n.numberOfChannels, s = n.length, o = Math.max(1, Math.floor(s / a)), c = new Float32Array(a), h = [];
  for (let m = 0; m < r; m += 1) h.push(n.getChannelData(m));
  for (let m = 0; m < a; m += 1) {
    const v = m * o, p = Math.min(s, v + o);
    let b = 0;
    for (let g = v; g < p; g += 1) {
      let S = 0;
      for (let j = 0; j < r; j += 1) {
        const T = h[j];
        T && (S += Math.abs(T[g] ?? 0));
      }
      const w = S / r;
      w > b && (b = w);
    }
    c[m] = b;
  }
  return c;
}
const c0 = "(prefers-reduced-motion: reduce)";
function _2() {
  const [n, a] = x.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(c0).matches);
  return x.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const r = window.matchMedia(c0), s = (o) => a(o.matches);
    return r.addEventListener("change", s), () => r.removeEventListener("change", s);
  }, []), n;
}
var D2 = "mquzal0", z2 = "mquzal1", d0 = "mquzal2", f0 = "mquzal3", h0 = "mquzal4", O2 = "mquzal5", m0 = "mquzal6", p0 = "mquzal7";
const L2 = 120, U2 = 720;
function vx(n) {
  const {
    audioUrl: a,
    durationMs: r,
    startMs: s,
    endMs: o,
    onChangeStart: c,
    onChangeEnd: h,
    isPlaying: m = !1,
    playbackPositionMs: v = 0,
    onSeek: p,
    width: b = U2,
    height: g = L2
  } = n, S = x.useRef(null), w = x.useRef(null), j = x.useRef(null), T = M2(a, b), A = _2();
  x.useEffect(() => {
    V2(S.current, T.peaks, b, g);
  }, [T.peaks, b, g]);
  const C = x.useCallback(
    (R) => {
      const H = w.current?.getBoundingClientRect();
      if (!H || H.width <= 0) return 0;
      const Z = Math.max(0, Math.min(1, (R - H.left) / H.width));
      return Math.round(Z * r);
    },
    [r]
  );
  x.useEffect(() => {
    const R = (Z) => {
      if (!j.current) return;
      const ue = C(Z.clientX);
      j.current === "start" ? c(qo(ue, 0, o - 1)) : h(qo(ue, s + 1, r));
    }, H = () => {
      j.current = null;
    };
    return window.addEventListener("pointermove", R), window.addEventListener("pointerup", H), () => {
      window.removeEventListener("pointermove", R), window.removeEventListener("pointerup", H);
    };
  }, [C, r, o, s, c, h]);
  const D = (R) => (H) => {
    H.preventDefault(), H.stopPropagation(), j.current = R;
  }, z = (R) => {
    !p || R.target.closest("[data-handle]") || p(C(R.clientX));
  }, k = (R) => (H) => {
    const Z = H.shiftKey ? 100 : H.ctrlKey ? 1 : 10;
    let ue = 0;
    if (H.key === "ArrowLeft") ue = -Z;
    else if (H.key === "ArrowRight") ue = Z;
    else return;
    H.preventDefault(), R === "start" ? c(qo(s + ue, 0, o - 1)) : h(qo(o + ue, s + 1, r));
  }, W = sf(s, r), G = sf(o, r), ee = sf(v, r);
  return /* @__PURE__ */ f.jsxs(
    "div",
    {
      ref: w,
      className: D2,
      style: { height: g },
      onPointerDown: z,
      children: [
        /* @__PURE__ */ f.jsx(
          "canvas",
          {
            ref: S,
            width: b,
            height: g,
            className: z2,
            "aria-label": "Audio waveform"
          }
        ),
        T.isLoading && /* @__PURE__ */ f.jsx("div", { className: p0, children: "Decoding waveform…" }),
        T.error && /* @__PURE__ */ f.jsx("div", { className: p0, role: "alert", children: T.error }),
        /* @__PURE__ */ f.jsx("div", { className: m0, style: { left: 0, width: `${W}%` } }),
        /* @__PURE__ */ f.jsx(
          "div",
          {
            className: m0,
            style: { left: `${G}%`, right: 0, width: `${100 - G}%` }
          }
        ),
        /* @__PURE__ */ f.jsxs(
          "div",
          {
            className: d0,
            style: { left: `${W}%` },
            role: "slider",
            "aria-label": "Region start",
            "aria-valuemin": 0,
            "aria-valuemax": r,
            "aria-valuenow": s,
            tabIndex: 0,
            onPointerDown: D("start"),
            onKeyDown: k("start"),
            "data-handle": "start",
            children: [
              /* @__PURE__ */ f.jsx("span", { className: f0, "aria-hidden": "true" }),
              /* @__PURE__ */ f.jsx("span", { className: h0, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ f.jsxs(
          "div",
          {
            className: d0,
            style: { left: `${G}%` },
            role: "slider",
            "aria-label": "Region end",
            "aria-valuemin": 0,
            "aria-valuemax": r,
            "aria-valuenow": o,
            tabIndex: 0,
            onPointerDown: D("end"),
            onKeyDown: k("end"),
            "data-handle": "end",
            children: [
              /* @__PURE__ */ f.jsx("span", { className: f0, "aria-hidden": "true" }),
              /* @__PURE__ */ f.jsx("span", { className: h0, "aria-hidden": "true" })
            ]
          }
        ),
        m && /* @__PURE__ */ f.jsx(
          "div",
          {
            className: O2,
            style: {
              left: `${ee}%`,
              transition: A ? "none" : void 0
            },
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function sf(n, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(100, n / a * 100));
}
function qo(n, a, r) {
  return Math.max(a, Math.min(r, n));
}
function V2(n, a, r, s) {
  if (!n) return;
  const o = n.getContext("2d");
  if (!o || (o.clearRect(0, 0, r, s), !a || a.length === 0)) return;
  const c = s / 2;
  o.fillStyle = k2(n, "--color-primary", "#ba9eff");
  const h = Math.min(a.length, r);
  for (let m = 0; m < h; m += 1) {
    const v = a[m] ?? 0, p = Math.max(1, v * (s - 4));
    o.fillRect(m, c - p / 2, 1, p);
  }
}
function k2(n, a, r) {
  return getComputedStyle(n).getPropertyValue(a).trim() || r;
}
var B2 = "r8lfsm0", H2 = "r8lfsm1", q2 = "r8lfsm2", g0 = "r8lfsm3", $2 = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, Y2 = "_1b1zchy3", F2 = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, I2 = "_1b1zchy6", G2 = "_1b1zchy7";
const yx = x.createContext("standalone");
function bx({
  variant: n = "standalone",
  children: a,
  className: r,
  style: s,
  ...o
}) {
  const c = [$2[n], r].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsx(yx.Provider, { value: n, children: /* @__PURE__ */ f.jsx("div", { className: c, style: s, ...o, children: a }) });
}
function xx({
  title: n,
  meta: a,
  children: r,
  className: s,
  titleId: o
}) {
  const c = x.useContext(yx), h = [Y2, s].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsxs("div", { className: h, children: [
    /* @__PURE__ */ f.jsx("h3", { id: o, className: F2[c], children: n }),
    a ? /* @__PURE__ */ f.jsx("span", { className: I2, children: a }) : null,
    r
  ] });
}
function Sx({
  children: n,
  className: a,
  role: r = "group"
}) {
  const s = [G2, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsx("div", { className: s, role: r, children: n });
}
const v0 = -16, X2 = 80, K2 = 720;
function Q2(n) {
  const { deploymentId: a, runId: r, utterance: s, audioUrl: o, onApplied: c, onError: h, onCancel: m } = n, v = s.durationMs ?? 0, [p, b] = x.useState(() => y0(v)), [g, S] = x.useState(wu), [w, j] = x.useState(!1), [T, A] = x.useState(!1), [C, D] = x.useState(null), [z, k] = x.useState(!1), W = x.useRef(null), G = x.useRef(null), ee = x.useRef(null);
  x.useEffect(() => {
    const q = y0(v);
    b(q), S(ux(q)), A(!1), D(null), ee.current = null;
  }, [s.utteranceId, v]);
  const R = x.useCallback((q) => {
    S(q), b((Q) => ox(Q, q));
  }, []);
  x.useEffect(() => () => G.current?.abort(), []), x.useEffect(() => {
    W.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [s.utteranceId]);
  const H = x.useCallback(
    (q) => {
      q.key === "Escape" && (q.stopPropagation(), m());
    },
    [m]
  ), Z = x.useMemo(
    () => p.ops.find((q) => q.mode === "trim"),
    [p.ops]
  ), ue = Z?.start_ms ?? 0, oe = Z?.end_ms ?? Math.max(1, v), ve = x.useCallback((q, Q) => {
    b((ae) => Z2(ae, "trim", (N) => ({
      ...N,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(q)),
      end_ms: Math.max(Math.floor(q) + 1, Math.floor(Q))
    })));
  }, []), je = x.useCallback((q) => ve(q, oe), [oe, ve]), le = x.useCallback((q) => ve(ue, q), [ue, ve]), L = x.useCallback((q) => {
    A(q), b((Q) => {
      const ae = Q.ops.filter((N) => N.mode !== "normalize");
      if (q) {
        const N = {
          id: pn(),
          mode: "normalize",
          target_lufs: v0
        };
        return { ...Q, ops: [...ae, N] };
      }
      return { ...Q, ops: ae };
    });
  }, []), U = x.useCallback(async () => {
    const q = Xb(p, v);
    if (q) {
      D(q.message);
      return;
    }
    if (D(null), z) return;
    G.current?.abort();
    const Q = new AbortController();
    G.current = Q, k(!0);
    try {
      const ae = ee.current ?? void 0, N = await BC(
        a,
        r,
        s.utteranceId,
        ae ? { chain: p, digest_before: ae } : { chain: p },
        { signal: Q.signal }
      );
      if (Q.signal.aborted) return;
      ee.current = N.chain_digest, c(N);
    } catch (ae) {
      if (Q.signal.aborted) return;
      ae instanceof Gr && (ee.current = ae.currentDigest || null);
      const N = ae instanceof Gr ? "Edit chain has changed in another tab. Reload to continue." : ae instanceof Error ? ae.message : "apply failed";
      D(N), h(N);
    } finally {
      Q.signal.aborted || k(!1);
    }
  }, [p, v, z, a, r, s.utteranceId, c, h]);
  return /* @__PURE__ */ f.jsx(bx, { variant: "nested", children: /* @__PURE__ */ f.jsxs("div", { ref: W, onKeyDown: H, children: [
    /* @__PURE__ */ f.jsx(xx, { title: "Edit segment", meta: `Source · ${$o(v)}` }),
    /* @__PURE__ */ f.jsx(
      vx,
      {
        audioUrl: o,
        durationMs: Math.max(1, v),
        startMs: ue,
        endMs: oe,
        onChangeStart: je,
        onChangeEnd: le,
        height: X2,
        width: K2
      }
    ),
    /* @__PURE__ */ f.jsxs("div", { className: B2, children: [
      /* @__PURE__ */ f.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ f.jsxs("span", { className: H2, children: [
        $o(ue),
        " → ",
        $o(oe),
        " · ",
        $o(oe - ue)
      ] })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: q2, children: [
      /* @__PURE__ */ f.jsxs("label", { className: g0, children: [
        /* @__PURE__ */ f.jsx(
          "input",
          {
            type: "checkbox",
            checked: T,
            onChange: (q) => L(q.currentTarget.checked),
            "aria-label": "Toggle loudness normalization"
          }
        ),
        /* @__PURE__ */ f.jsxs("span", { children: [
          "Normalize to ",
          v0.toFixed(0),
          " LUFS (broadcast-friendly)"
        ] })
      ] }),
      /* @__PURE__ */ f.jsxs(
        "button",
        {
          type: "button",
          className: g0,
          onClick: () => j((q) => !q),
          style: {
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: 0,
            textAlign: "left",
            color: "var(--accent)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.18em"
          },
          "aria-expanded": w,
          children: [
            w ? "▾" : "▸",
            " Advanced effects · gain · eq · pitch · fade · silence trim"
          ]
        }
      )
    ] }),
    w && /* @__PURE__ */ f.jsx(
      gh,
      {
        state: g,
        onChange: R,
        supportsSynthSpeed: !1
      }
    ),
    /* @__PURE__ */ f.jsxs(Sx, { children: [
      /* @__PURE__ */ f.jsx(Je, { size: "sm", onClick: () => void U(), disabled: z, children: z ? "Applying…" : "Apply" }),
      /* @__PURE__ */ f.jsx(Je, { variant: "ghost", size: "sm", onClick: m, disabled: z, children: "Cancel" })
    ] }),
    C && /* @__PURE__ */ f.jsx(Nn, { severity: "error", children: C })
  ] }) });
}
function y0(n) {
  return n <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: pn(),
    mode: "trim",
    start_ms: 0,
    end_ms: n
  }] };
}
function Z2(n, a, r) {
  const s = n.ops.findIndex((c) => c.mode === a);
  if (s === -1) {
    const c = { id: pn(), mode: a };
    return { ...n, ops: [...n.ops, r(c)] };
  }
  const o = [...n.ops];
  return o[s] = r(o[s]), { ...n, ops: o };
}
function $o(n) {
  return !Number.isFinite(n) || n < 0 ? "0.0s" : n < 1e3 ? `${Math.round(n)} ms` : `${(Math.round(n / 100) / 10).toFixed(1)}s`;
}
var P2 = "jq2zyb2", J2 = "jq2zyb3", W2 = "jq2zyb4", e_ = "jq2zyb5", t_ = "jq2zyb6", n_ = "jq2zyb7", a_ = "jq2zyb8", i_ = "jq2zyb9", r_ = "jq2zyba", l_ = "jq2zybb", s_ = "jq2zybc", o_ = "jq2zybd", u_ = "jq2zybe", c_ = "jq2zybf jq2zybe", d_ = "jq2zybg", f_ = "jq2zybh", h_ = "jq2zybi", m_ = "jq2zybj", p_ = "jq2zybk", g_ = "jq2zybl", v_ = "jq2zybm", y_ = "jq2zybn", b_ = "jq2zybo", x_ = "jq2zybp", S_ = "jq2zybq", w_ = "jq2zybr", E_ = "jq2zybs", j_ = "jq2zybt", T_ = "jq2zybu", C_ = "jq2zybv", N_ = "jq2zybw", M_ = "jq2zybx", R_ = "jq2zyby", A_ = "jq2zybz", b0 = "jq2zyb10", __ = "jq2zyb11", D_ = "jq2zyb12", z_ = "jq2zyb13", O_ = "jq2zyb14";
const L_ = ["cancelled", "failed", "partial"], U_ = 2600;
function V_() {
  const { run: n } = gs(), a = Qr(), [r, s] = x.useState(n), [o, c] = x.useState(!1), [h, m] = x.useState(null), [v, p] = x.useState(null), [b, g] = x.useState(
    null
  );
  x.useEffect(() => {
    s(n);
  }, [n]), x.useEffect(() => {
    if (!b) return;
    const k = setTimeout(() => g(null), U_);
    return () => clearTimeout(k);
  }, [b]);
  const S = x.useMemo(() => H_(r), [r]), w = L_.includes(r.status) && r.kind === "batch", j = (r.exportZipStaleAt ?? null) !== null, T = async () => {
    if (r.deploymentId) {
      c(!0), m(null);
      try {
        const { runId: k } = await Ib(r.deploymentId, r.runId);
        a(`/${r.deploymentId}/runs/${k}`);
      } catch (k) {
        m(Y_(k));
      } finally {
        c(!1);
      }
    }
  }, A = x.useCallback((k) => {
    p((W) => W === k ? null : k);
  }, []), C = x.useCallback(() => {
    p(null);
  }, []), D = (k, W) => {
    s((G) => B_(G, k, W)), p(null), g({ message: "Segment edited", severity: "success" });
  }, z = x.useCallback((k) => {
    g({ message: k, severity: "error" });
  }, []);
  return /* @__PURE__ */ f.jsxs("main", { className: P2, children: [
    /* @__PURE__ */ f.jsxs("div", { className: J2, children: [
      /* @__PURE__ */ f.jsxs("header", { className: W2, children: [
        /* @__PURE__ */ f.jsxs("p", { className: e_, children: [
          r.deploymentId ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
            /* @__PURE__ */ f.jsx(xu, { to: `/${r.deploymentId}/recipe`, className: t_, children: "← Back to recipe" }),
            /* @__PURE__ */ f.jsx("span", { className: n_, children: "·" })
          ] }) : null,
          /* @__PURE__ */ f.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ f.jsxs("div", { className: a_, children: [
          /* @__PURE__ */ f.jsxs("h1", { className: i_, children: [
            q_(r.kind),
            /* @__PURE__ */ f.jsx("span", { className: r_, children: r.runId })
          ] }),
          /* @__PURE__ */ f.jsx(xi, { size: "md", tone: F_(r.status), pulse: r.status === "running", children: r.status })
        ] })
      ] }),
      /* @__PURE__ */ f.jsxs("section", { className: l_, "aria-label": "Run statistics", children: [
        /* @__PURE__ */ f.jsx(Yo, { label: "Format", value: r.outputFormat.toUpperCase(), mono: !0 }),
        /* @__PURE__ */ f.jsx(Yo, { label: "Speed", value: `${r.speedFactor.toFixed(2)}×`, mono: !0 }),
        /* @__PURE__ */ f.jsx(
          Yo,
          {
            label: "Completed",
            value: `${S.completed} / ${S.total}`,
            progress: S.total > 0 ? S.completed / S.total : 0
          }
        ),
        /* @__PURE__ */ f.jsx(
          Yo,
          {
            label: "Cache hit",
            value: `${S.cacheRatio}%`,
            progress: S.cacheRatio / 100
          }
        )
      ] }),
      w && /* @__PURE__ */ f.jsxs("section", { className: f_, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ f.jsxs("div", { className: h_, children: [
          /* @__PURE__ */ f.jsx("h2", { id: "run-detail-resume-title", className: m_, children: S.failed > 0 ? `${S.failed} line${S.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ f.jsx("p", { className: p_, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ f.jsx(Je, { size: "lg", disabled: o, onClick: () => void T(), children: o ? "Resuming…" : S.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        h && /* @__PURE__ */ f.jsx("p", { className: g_, role: "alert", children: h })
      ] }),
      /* @__PURE__ */ f.jsxs(Ua, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ f.jsxs(GT, { children: [
          /* @__PURE__ */ f.jsx("h2", { id: "run-detail-utterances", className: Zi, children: "01 / Utterances" }),
          S.completed > 0 && /* @__PURE__ */ f.jsxs("span", { className: v_, children: [
            /* @__PURE__ */ f.jsx("span", { className: y_, children: S.cached }),
            "/",
            S.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ f.jsx("ul", { className: b_, children: r.utterances.map((k) => {
          const W = v === k.utteranceId, G = k.status === "completed" && k.audioArtifactRef !== null && k.audioArtifactRef !== void 0, ee = k.derivedArtifactRef ?? k.audioArtifactRef ?? null, R = ee ? `/api/v1/artifacts/${encodeURIComponent(ee)}/download` : "", H = (k.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ f.jsxs("li", { className: S_, children: [
            /* @__PURE__ */ f.jsxs("div", { className: x_, children: [
              /* @__PURE__ */ f.jsxs("span", { className: j_, children: [
                "#",
                k.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ f.jsx("span", { className: T_, title: k.characterDisplay, children: k.characterDisplay }),
              /* @__PURE__ */ f.jsx("span", { className: C_, title: k.text, children: k.text }),
              /* @__PURE__ */ f.jsxs("span", { className: N_, children: [
                k.cacheHit && /* @__PURE__ */ f.jsx("span", { className: M_, children: "cached" }),
                H && /* @__PURE__ */ f.jsx("span", { className: w_, children: "edited" }),
                k.durationMs ? /* @__PURE__ */ f.jsx("span", { children: $_(k.durationMs) }) : null,
                /* @__PURE__ */ f.jsx(xi, { tone: I_(k.status), children: k.status }),
                G && /* @__PURE__ */ f.jsx(
                  "button",
                  {
                    type: "button",
                    className: E_,
                    onClick: () => A(k.utteranceId),
                    "aria-expanded": W,
                    "aria-label": W ? "Close segment editor" : "Edit segment",
                    children: W ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            W && R && r.deploymentId && /* @__PURE__ */ f.jsx(
              Q2,
              {
                deploymentId: r.deploymentId,
                runId: r.runId,
                utterance: k,
                audioUrl: R,
                onApplied: (Z) => D(k.utteranceId, Z),
                onError: z,
                onCancel: C
              }
            )
          ] }, k.utteranceId);
        }) })
      ] }),
      k_(r, j)
    ] }),
    b && /* @__PURE__ */ f.jsx(
      "div",
      {
        className: O_,
        role: b.severity === "error" ? "alert" : "status",
        "aria-live": b.severity === "error" ? "assertive" : "polite",
        children: b.message
      }
    )
  ] });
}
function k_(n, a) {
  if (!n.exportArtifactRef && !a) return null;
  const s = !!n.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ f.jsx("div", { className: R_, children: a ? /* @__PURE__ */ f.jsxs("div", { className: __, children: [
    /* @__PURE__ */ f.jsx("p", { className: D_, children: s }),
    /* @__PURE__ */ f.jsxs(
      "button",
      {
        type: "button",
        className: z_,
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ f.jsx("span", { className: b0, children: "↻" })
        ]
      }
    )
  ] }) : n.exportArtifactRef ? /* @__PURE__ */ f.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${n.exportArtifactRef}/download`,
      download: !0,
      className: A_,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ f.jsx("span", { className: b0, children: "↓" })
      ]
    }
  ) : null });
}
function B_(n, a, r) {
  const s = n.utterances.map((o) => o.utteranceId !== a ? o : {
    ...o,
    derivedArtifactRef: r.derived_artifact_ref,
    durationMs: r.derived_duration_ms
  });
  return {
    ...n,
    utterances: s,
    exportZipStaleAt: n.exportZipStaleAt ?? Math.floor(Date.now() / 1e3)
  };
}
function Yo({ label: n, value: a, mono: r, progress: s }) {
  const o = s !== void 0 ? Math.min(1, Math.max(0, s)) : void 0;
  return /* @__PURE__ */ f.jsxs(
    "div",
    {
      className: s_,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ f.jsx("span", { className: o_, children: n }),
        /* @__PURE__ */ f.jsx("span", { className: r ? c_ : u_, children: a }),
        o !== void 0 && /* @__PURE__ */ f.jsx("span", { className: d_, "aria-hidden": "true" })
      ]
    }
  );
}
function H_(n) {
  const a = n.utterances.length, r = n.utterances.filter((h) => h.status === "completed").length, s = n.utterances.filter(
    (h) => h.status === "failed" || h.status === "cancelled"
  ).length, o = n.utterances.filter((h) => h.cacheHit).length, c = r > 0 ? Math.round(o / r * 100) : 0;
  return { total: a, completed: r, failed: s, cached: o, cacheRatio: c };
}
function q_(n) {
  switch (n) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function $_(n) {
  return n < 1e3 ? `${n} ms` : `${(n / 1e3).toFixed(n < 1e4 ? 2 : 1)} s`;
}
function Y_(n) {
  return n instanceof Zr ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
function F_(n) {
  switch (n) {
    case "running":
      return "accent";
    case "completed":
      return "success";
    case "failed":
      return "danger";
    case "partial":
      return "warning";
    default:
      return "neutral";
  }
}
function I_(n) {
  switch (n) {
    case "running":
      return "accent";
    case "completed":
      return "success";
    case "failed":
      return "danger";
    case "cancelled":
      return "faint";
    default:
      return "neutral";
  }
}
var G_ = "pcphqj2", X_ = "pcphqj3", K_ = "pcphqj4", Q_ = "pcphqj5", Z_ = "pcphqj6", P_ = "pcphqj7", J_ = "pcphqj8", W_ = "pcphqj9", e3 = "pcphqja", x0 = "pcphqjb", t3 = "pcphqjc", n3 = "pcphqjd", a3 = "pcphqje pcphqjd", i3 = "pcphqjf", r3 = "pcphqjg", l3 = "pcphqjh", s3 = "pcphqji", o3 = "pcphqjj pcphqji", u3 = "pcphqjk pcphqji", c3 = "pcphqjl pcphqji", d3 = "pcphqjm", of = "pcphqjn", uf = "pcphqjo";
function f3() {
  const [n, a] = x.useState(null), [r, s] = x.useState(null);
  return x.useEffect(() => {
    let o = !1;
    const c = async () => {
      try {
        const m = await vt("/runtime/queue");
        o || (a(m.entries), s(null));
      } catch (m) {
        o || s(m instanceof Error ? m.message : "Unknown error");
      }
    };
    c();
    const h = setInterval(() => void c(), 3e3);
    return () => {
      o = !0, clearInterval(h);
    };
  }, []), /* @__PURE__ */ f.jsx("main", { className: G_, children: /* @__PURE__ */ f.jsxs("div", { className: X_, children: [
    /* @__PURE__ */ f.jsxs("header", { className: K_, children: [
      /* @__PURE__ */ f.jsx("p", { className: Q_, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ f.jsxs("div", { className: Z_, children: [
        /* @__PURE__ */ f.jsx("h1", { className: P_, children: "Queue" }),
        /* @__PURE__ */ f.jsx("span", { className: J_, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ f.jsx("p", { className: W_, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    r ? /* @__PURE__ */ f.jsx(Nn, { severity: "error", children: r }) : n === null ? null : n.length === 0 ? /* @__PURE__ */ f.jsx(Ua, { density: "compact", children: /* @__PURE__ */ f.jsx(vs, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ f.jsxs(Ua, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ f.jsx("h2", { id: "runtime-queue-section", className: Zi, children: "01 / In flight" }),
      /* @__PURE__ */ f.jsx("ul", { className: e3, children: n.map((o) => {
        const c = o.position === 1;
        return /* @__PURE__ */ f.jsxs(
          "li",
          {
            className: c ? `${x0} ${t3}` : x0,
            children: [
              /* @__PURE__ */ f.jsx("span", { className: c ? a3 : n3, children: o.position }),
              /* @__PURE__ */ f.jsxs("span", { className: i3, children: [
                /* @__PURE__ */ f.jsx("span", { className: r3, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ f.jsx("span", { className: l3, children: o.runId })
              ] }),
              /* @__PURE__ */ f.jsx("span", { className: h3(o.kind), children: m3(o.kind) }),
              /* @__PURE__ */ f.jsx("span", { className: d3, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
                /* @__PURE__ */ f.jsx("span", { className: of, children: p3(o.etaSeconds) }),
                /* @__PURE__ */ f.jsx("span", { className: uf, children: "eta" })
              ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
                /* @__PURE__ */ f.jsx("span", { className: of, children: o.utteranceTotal }),
                /* @__PURE__ */ f.jsx("span", { className: uf, children: "lines" })
              ] }) : /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
                /* @__PURE__ */ f.jsx("span", { className: of, children: "—" }),
                /* @__PURE__ */ f.jsx("span", { className: uf, children: "pending" })
              ] }) })
            ]
          },
          o.runId
        );
      }) })
    ] })
  ] }) });
}
function h3(n) {
  switch (n) {
    case "batch":
      return o3;
    case "test_line":
      return u3;
    case "resume":
      return c3;
    default:
      return s3;
  }
}
function m3(n) {
  switch (n) {
    case "test_line":
      return "test line";
    default:
      return n;
  }
}
function p3(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60), r = n % 60;
  return r === 0 ? `${a}m` : `${a}m ${r}s`;
}
function g3() {
  const { deploymentId: n, prefillCharacterName: a } = gs(), r = Qr(), [s, o] = x.useState(a), [c, h] = x.useState(""), [m, v] = x.useState("none"), [p, b] = x.useState(!1), [g, S] = x.useState(null), w = x.useRef(null);
  x.useEffect(() => {
    w.current?.scrollIntoView({ behavior: "smooth", block: "center" }), w.current?.focus();
  }, []);
  const j = async (T) => {
    T.preventDefault(), b(!0), S(null);
    try {
      await fh(n, {
        characterName: s,
        speakerVoiceAssetId: c,
        defaultEmotionMode: m
      }), r(`/${n}/recipe`);
    } catch (A) {
      S(A instanceof Error ? A.message : "failed");
    } finally {
      b(!1);
    }
  };
  return /* @__PURE__ */ f.jsxs("main", { children: [
    /* @__PURE__ */ f.jsx("h1", { children: "New character mapping" }),
    /* @__PURE__ */ f.jsxs("form", { onSubmit: j, children: [
      /* @__PURE__ */ f.jsxs("label", { children: [
        "Character name",
        /* @__PURE__ */ f.jsx(
          "input",
          {
            ref: w,
            value: s,
            onChange: (T) => o(T.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ f.jsxs("label", { children: [
        "Speaker voice asset id",
        /* @__PURE__ */ f.jsx(
          "input",
          {
            value: c,
            onChange: (T) => h(T.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ f.jsxs("label", { children: [
        "Emotion mode",
        /* @__PURE__ */ f.jsxs("select", { value: m, onChange: (T) => v(T.currentTarget.value), children: [
          /* @__PURE__ */ f.jsx("option", { value: "none", children: "None" }),
          /* @__PURE__ */ f.jsx("option", { value: "audio_ref", children: "Audio ref" }),
          /* @__PURE__ */ f.jsx("option", { value: "vector_preset", children: "Vector preset" }),
          /* @__PURE__ */ f.jsx("option", { value: "qwen_template", children: "Qwen template" })
        ] })
      ] }),
      /* @__PURE__ */ f.jsx(Je, { type: "submit", variant: "primary", disabled: p, children: "Save mapping" }),
      g && /* @__PURE__ */ f.jsx(Nn, { severity: "error", children: g })
    ] })
  ] });
}
const wx = x.createContext({});
function vh(n) {
  const a = x.useRef(null);
  return a.current === null && (a.current = n()), a.current;
}
const v3 = typeof window < "u", Ex = v3 ? x.useLayoutEffect : x.useEffect, Eu = /* @__PURE__ */ x.createContext(null);
function y3(n, a) {
  n.indexOf(a) === -1 && n.push(a);
}
function b3(n, a) {
  const r = n.indexOf(a);
  r > -1 && n.splice(r, 1);
}
const Si = (n, a, r) => r > a ? a : r < n ? n : r;
function S0(n, a) {
  return a ? `${n}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : n;
}
let ys = () => {
}, Xr = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (ys = (n, a, r) => {
  !n && typeof console < "u" && console.warn(S0(a, r));
}, Xr = (n, a, r) => {
  if (!n)
    throw new Error(S0(a, r));
});
const wi = {}, jx = (n) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);
function x3(n) {
  return typeof n == "object" && n !== null;
}
const Tx = (n) => /^0[^.\s]+$/u.test(n);
// @__NO_SIDE_EFFECTS__
function Cx(n) {
  let a;
  return () => (a === void 0 && (a = n()), a);
}
const Pr = /* @__NO_SIDE_EFFECTS__ */ (n) => n, S3 = (n, a) => (r) => a(n(r)), ju = (...n) => n.reduce(S3), Nx = /* @__NO_SIDE_EFFECTS__ */ (n, a, r) => {
  const s = a - n;
  return s === 0 ? 1 : (r - n) / s;
};
class Mx {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return y3(this.subscriptions, a), () => b3(this.subscriptions, a);
  }
  notify(a, r, s) {
    const o = this.subscriptions.length;
    if (o)
      if (o === 1)
        this.subscriptions[0](a, r, s);
      else
        for (let c = 0; c < o; c++) {
          const h = this.subscriptions[c];
          h && h(a, r, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const $n = /* @__NO_SIDE_EFFECTS__ */ (n) => n * 1e3, Jn = /* @__NO_SIDE_EFFECTS__ */ (n) => n / 1e3;
function Rx(n, a) {
  return a ? n * (1e3 / a) : 0;
}
const Ax = (n, a, r) => (((1 - 3 * r + 3 * a) * n + (3 * r - 6 * a)) * n + 3 * a) * n, w3 = 1e-7, E3 = 12;
function j3(n, a, r, s, o) {
  let c, h, m = 0;
  do
    h = a + (r - a) / 2, c = Ax(h, s, o) - n, c > 0 ? r = h : a = h;
  while (Math.abs(c) > w3 && ++m < E3);
  return h;
}
function bs(n, a, r, s) {
  if (n === a && r === s)
    return Pr;
  const o = (c) => j3(c, 0, 1, n, r);
  return (c) => c === 0 || c === 1 ? c : Ax(o(c), a, s);
}
const _x = (n) => (a) => a <= 0.5 ? n(2 * a) / 2 : (2 - n(2 * (1 - a))) / 2, Dx = (n) => (a) => 1 - n(1 - a), zx = /* @__PURE__ */ bs(0.33, 1.53, 0.69, 0.99), yh = /* @__PURE__ */ Dx(zx), Ox = /* @__PURE__ */ _x(yh), Lx = (n) => n >= 1 ? 1 : (n *= 2) < 1 ? 0.5 * yh(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))), bh = (n) => 1 - Math.sin(Math.acos(n)), T3 = Dx(bh), Ux = _x(bh), C3 = /* @__PURE__ */ bs(0.42, 0, 1, 1), N3 = /* @__PURE__ */ bs(0, 0, 0.58, 1), Vx = /* @__PURE__ */ bs(0.42, 0, 0.58, 1), M3 = (n) => Array.isArray(n) && typeof n[0] != "number", kx = (n) => Array.isArray(n) && typeof n[0] == "number", w0 = {
  linear: Pr,
  easeIn: C3,
  easeInOut: Vx,
  easeOut: N3,
  circIn: bh,
  circInOut: Ux,
  circOut: T3,
  backIn: yh,
  backInOut: Ox,
  backOut: zx,
  anticipate: Lx
}, R3 = (n) => typeof n == "string", E0 = (n) => {
  if (kx(n)) {
    Xr(n.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, r, s, o] = n;
    return bs(a, r, s, o);
  } else if (R3(n))
    return Xr(w0[n] !== void 0, `Invalid easing type '${n}'`, "invalid-easing-type"), w0[n];
  return n;
}, Fo = [
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
function A3(n, a) {
  let r = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), o = !1, c = !1;
  const h = /* @__PURE__ */ new WeakSet();
  let m = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function v(b) {
    h.has(b) && (p.schedule(b), n()), b(m);
  }
  const p = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (b, g = !1, S = !1) => {
      const j = S && o ? r : s;
      return g && h.add(b), j.add(b), b;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (b) => {
      s.delete(b), h.delete(b);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (b) => {
      if (m = b, o) {
        c = !0;
        return;
      }
      o = !0;
      const g = r;
      r = s, s = g, r.forEach(v), r.clear(), o = !1, c && (c = !1, p.process(b));
    }
  };
  return p;
}
const _3 = 40;
function Bx(n, a) {
  let r = !1, s = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, c = () => r = !0, h = Fo.reduce((z, k) => (z[k] = A3(c), z), {}), { setup: m, read: v, resolveKeyframes: p, preUpdate: b, update: g, preRender: S, render: w, postRender: j } = h, T = () => {
    const z = wi.useManualTiming, k = z ? o.timestamp : performance.now();
    r = !1, z || (o.delta = s ? 1e3 / 60 : Math.max(Math.min(k - o.timestamp, _3), 1)), o.timestamp = k, o.isProcessing = !0, m.process(o), v.process(o), p.process(o), b.process(o), g.process(o), S.process(o), w.process(o), j.process(o), o.isProcessing = !1, r && a && (s = !1, n(T));
  }, A = () => {
    r = !0, s = !0, o.isProcessing || n(T);
  };
  return { schedule: Fo.reduce((z, k) => {
    const W = h[k];
    return z[k] = (G, ee = !1, R = !1) => (r || A(), W.schedule(G, ee, R)), z;
  }, {}), cancel: (z) => {
    for (let k = 0; k < Fo.length; k++)
      h[Fo[k]].cancel(z);
  }, state: o, steps: h };
}
const { schedule: Yn, cancel: _f, state: su } = /* @__PURE__ */ Bx(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Pr, !0);
let eu;
function D3() {
  eu = void 0;
}
const Cn = {
  now: () => (eu === void 0 && Cn.set(su.isProcessing || wi.useManualTiming ? su.timestamp : performance.now()), eu),
  set: (n) => {
    eu = n, queueMicrotask(D3);
  }
}, Hx = (n) => (a) => typeof a == "string" && a.startsWith(n), qx = /* @__PURE__ */ Hx("--"), z3 = /* @__PURE__ */ Hx("var(--"), xh = (n) => z3(n) ? O3.test(n.split("/*")[0].trim()) : !1, O3 = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function j0(n) {
  return typeof n != "string" ? !1 : n.split("/*")[0].includes("var(--");
}
const Jr = {
  test: (n) => typeof n == "number",
  parse: parseFloat,
  transform: (n) => n
}, cs = {
  ...Jr,
  transform: (n) => Si(0, 1, n)
}, Io = {
  ...Jr,
  default: 1
}, as = (n) => Math.round(n * 1e5) / 1e5, Sh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function L3(n) {
  return n == null;
}
const U3 = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, wh = (n, a) => (r) => !!(typeof r == "string" && U3.test(r) && r.startsWith(n) || a && !L3(r) && Object.prototype.hasOwnProperty.call(r, a)), $x = (n, a, r) => (s) => {
  if (typeof s != "string")
    return s;
  const [o, c, h, m] = s.match(Sh);
  return {
    [n]: parseFloat(o),
    [a]: parseFloat(c),
    [r]: parseFloat(h),
    alpha: m !== void 0 ? parseFloat(m) : 1
  };
}, V3 = (n) => Si(0, 255, n), cf = {
  ...Jr,
  transform: (n) => Math.round(V3(n))
}, Ki = {
  test: /* @__PURE__ */ wh("rgb", "red"),
  parse: /* @__PURE__ */ $x("red", "green", "blue"),
  transform: ({ red: n, green: a, blue: r, alpha: s = 1 }) => "rgba(" + cf.transform(n) + ", " + cf.transform(a) + ", " + cf.transform(r) + ", " + as(cs.transform(s)) + ")"
};
function k3(n) {
  let a = "", r = "", s = "", o = "";
  return n.length > 5 ? (a = n.substring(1, 3), r = n.substring(3, 5), s = n.substring(5, 7), o = n.substring(7, 9)) : (a = n.substring(1, 2), r = n.substring(2, 3), s = n.substring(3, 4), o = n.substring(4, 5), a += a, r += r, s += s, o += o), {
    red: parseInt(a, 16),
    green: parseInt(r, 16),
    blue: parseInt(s, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const Df = {
  test: /* @__PURE__ */ wh("#"),
  parse: k3,
  transform: Ki.transform
}, xs = /* @__NO_SIDE_EFFECTS__ */ (n) => ({
  test: (a) => typeof a == "string" && a.endsWith(n) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${n}`
}), mi = /* @__PURE__ */ xs("deg"), Ir = /* @__PURE__ */ xs("%"), Se = /* @__PURE__ */ xs("px"), B3 = /* @__PURE__ */ xs("vh"), H3 = /* @__PURE__ */ xs("vw"), T0 = {
  ...Ir,
  parse: (n) => Ir.parse(n) / 100,
  transform: (n) => Ir.transform(n * 100)
}, $r = {
  test: /* @__PURE__ */ wh("hsl", "hue"),
  parse: /* @__PURE__ */ $x("hue", "saturation", "lightness"),
  transform: ({ hue: n, saturation: a, lightness: r, alpha: s = 1 }) => "hsla(" + Math.round(n) + ", " + Ir.transform(as(a)) + ", " + Ir.transform(as(r)) + ", " + as(cs.transform(s)) + ")"
}, Ut = {
  test: (n) => Ki.test(n) || Df.test(n) || $r.test(n),
  parse: (n) => Ki.test(n) ? Ki.parse(n) : $r.test(n) ? $r.parse(n) : Df.parse(n),
  transform: (n) => typeof n == "string" ? n : n.hasOwnProperty("red") ? Ki.transform(n) : $r.transform(n),
  getAnimatableNone: (n) => {
    const a = Ut.parse(n);
    return a.alpha = 0, Ut.transform(a);
  }
}, q3 = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function $3(n) {
  return isNaN(n) && typeof n == "string" && (n.match(Sh)?.length || 0) + (n.match(q3)?.length || 0) > 0;
}
const Yx = "number", Fx = "color", Y3 = "var", F3 = "var(", C0 = "${}", I3 = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Kr(n) {
  const a = n.toString(), r = [], s = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let c = 0;
  const m = a.replace(I3, (v) => (Ut.test(v) ? (s.color.push(c), o.push(Fx), r.push(Ut.parse(v))) : v.startsWith(F3) ? (s.var.push(c), o.push(Y3), r.push(v)) : (s.number.push(c), o.push(Yx), r.push(parseFloat(v))), ++c, C0)).split(C0);
  return { values: r, split: m, indexes: s, types: o };
}
function G3(n) {
  return Kr(n).values;
}
function Ix({ split: n, types: a }) {
  const r = n.length;
  return (s) => {
    let o = "";
    for (let c = 0; c < r; c++)
      if (o += n[c], s[c] !== void 0) {
        const h = a[c];
        h === Yx ? o += as(s[c]) : h === Fx ? o += Ut.transform(s[c]) : o += s[c];
      }
    return o;
  };
}
function X3(n) {
  return Ix(Kr(n));
}
const K3 = (n) => typeof n == "number" ? 0 : Ut.test(n) ? Ut.getAnimatableNone(n) : n, Q3 = (n, a) => typeof n == "number" ? a?.trim().endsWith("/") ? n : 0 : K3(n);
function Z3(n) {
  const a = Kr(n);
  return Ix(a)(a.values.map((s, o) => Q3(s, a.split[o])));
}
const Wn = {
  test: $3,
  parse: G3,
  createTransformer: X3,
  getAnimatableNone: Z3
};
function df(n, a, r) {
  return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? n + (a - n) * 6 * r : r < 1 / 2 ? a : r < 2 / 3 ? n + (a - n) * (2 / 3 - r) * 6 : n;
}
function P3({ hue: n, saturation: a, lightness: r, alpha: s }) {
  n /= 360, a /= 100, r /= 100;
  let o = 0, c = 0, h = 0;
  if (!a)
    o = c = h = r;
  else {
    const m = r < 0.5 ? r * (1 + a) : r + a - r * a, v = 2 * r - m;
    o = df(v, m, n + 1 / 3), c = df(v, m, n), h = df(v, m, n - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(c * 255),
    blue: Math.round(h * 255),
    alpha: s
  };
}
function ou(n, a) {
  return (r) => r > 0 ? a : n;
}
const Ss = (n, a, r) => n + (a - n) * r, ff = (n, a, r) => {
  const s = n * n, o = r * (a * a - s) + s;
  return o < 0 ? 0 : Math.sqrt(o);
}, J3 = [Df, Ki, $r], W3 = (n) => J3.find((a) => a.test(n));
function N0(n) {
  const a = W3(n);
  if (ys(!!a, `'${n}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let r = a.parse(n);
  return a === $r && (r = P3(r)), r;
}
const M0 = (n, a) => {
  const r = N0(n), s = N0(a);
  if (!r || !s)
    return ou(n, a);
  const o = { ...r };
  return (c) => (o.red = ff(r.red, s.red, c), o.green = ff(r.green, s.green, c), o.blue = ff(r.blue, s.blue, c), o.alpha = Ss(r.alpha, s.alpha, c), Ki.transform(o));
}, zf = /* @__PURE__ */ new Set(["none", "hidden"]);
function eD(n, a) {
  return zf.has(n) ? (r) => r <= 0 ? n : a : (r) => r >= 1 ? a : n;
}
function tD(n, a) {
  return (r) => Ss(n, a, r);
}
function Eh(n) {
  return typeof n == "number" ? tD : typeof n == "string" ? xh(n) ? ou : Ut.test(n) ? M0 : iD : Array.isArray(n) ? Gx : typeof n == "object" ? Ut.test(n) ? M0 : nD : ou;
}
function Gx(n, a) {
  const r = [...n], s = r.length, o = n.map((c, h) => Eh(c)(c, a[h]));
  return (c) => {
    for (let h = 0; h < s; h++)
      r[h] = o[h](c);
    return r;
  };
}
function nD(n, a) {
  const r = { ...n, ...a }, s = {};
  for (const o in r)
    n[o] !== void 0 && a[o] !== void 0 && (s[o] = Eh(n[o])(n[o], a[o]));
  return (o) => {
    for (const c in s)
      r[c] = s[c](o);
    return r;
  };
}
function aD(n, a) {
  const r = [], s = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const c = a.types[o], h = n.indexes[c][s[c]], m = n.values[h] ?? 0;
    r[o] = m, s[c]++;
  }
  return r;
}
const iD = (n, a) => {
  const r = Wn.createTransformer(a), s = Kr(n), o = Kr(a);
  return s.indexes.var.length === o.indexes.var.length && s.indexes.color.length === o.indexes.color.length && s.indexes.number.length >= o.indexes.number.length ? zf.has(n) && !o.values.length || zf.has(a) && !s.values.length ? eD(n, a) : ju(Gx(aD(s, o), o.values), r) : (ys(!0, `Complex values '${n}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), ou(n, a));
};
function Xx(n, a, r) {
  return typeof n == "number" && typeof a == "number" && typeof r == "number" ? Ss(n, a, r) : Eh(n)(n, a);
}
const rD = (n) => {
  const a = ({ timestamp: r }) => n(r);
  return {
    start: (r = !0) => Yn.update(a, r),
    stop: () => _f(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => su.isProcessing ? su.timestamp : Cn.now()
  };
}, Kx = (n, a, r = 10) => {
  let s = "";
  const o = Math.max(Math.round(a / r), 2);
  for (let c = 0; c < o; c++)
    s += Math.round(n(c / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, uu = 2e4;
function jh(n) {
  let a = 0;
  const r = 50;
  let s = n.next(a);
  for (; !s.done && a < uu; )
    a += r, s = n.next(a);
  return a >= uu ? 1 / 0 : a;
}
function lD(n, a = 100, r) {
  const s = r({ ...n, keyframes: [0, a] }), o = Math.min(jh(s), uu);
  return {
    type: "keyframes",
    ease: (c) => s.next(o * c).value / a,
    duration: /* @__PURE__ */ Jn(o)
  };
}
const xt = {
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
function Of(n, a) {
  return n * Math.sqrt(1 - a * a);
}
const sD = 12;
function oD(n, a, r) {
  let s = r;
  for (let o = 1; o < sD; o++)
    s = s - n(s) / a(s);
  return s;
}
const hf = 1e-3;
function uD({ duration: n = xt.duration, bounce: a = xt.bounce, velocity: r = xt.velocity, mass: s = xt.mass }) {
  let o, c;
  ys(n <= /* @__PURE__ */ $n(xt.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let h = 1 - a;
  h = Si(xt.minDamping, xt.maxDamping, h), n = Si(xt.minDuration, xt.maxDuration, /* @__PURE__ */ Jn(n)), h < 1 ? (o = (p) => {
    const b = p * h, g = b * n, S = b - r, w = Of(p, h), j = Math.exp(-g);
    return hf - S / w * j;
  }, c = (p) => {
    const g = p * h * n, S = g * r + r, w = Math.pow(h, 2) * Math.pow(p, 2) * n, j = Math.exp(-g), T = Of(Math.pow(p, 2), h);
    return (-o(p) + hf > 0 ? -1 : 1) * ((S - w) * j) / T;
  }) : (o = (p) => {
    const b = Math.exp(-p * n), g = (p - r) * n + 1;
    return -hf + b * g;
  }, c = (p) => {
    const b = Math.exp(-p * n), g = (r - p) * (n * n);
    return b * g;
  });
  const m = 5 / n, v = oD(o, c, m);
  if (n = /* @__PURE__ */ $n(n), isNaN(v))
    return {
      stiffness: xt.stiffness,
      damping: xt.damping,
      duration: n
    };
  {
    const p = Math.pow(v, 2) * s;
    return {
      stiffness: p,
      damping: h * 2 * Math.sqrt(s * p),
      duration: n
    };
  }
}
const cD = ["duration", "bounce"], dD = ["stiffness", "damping", "mass"];
function R0(n, a) {
  return a.some((r) => n[r] !== void 0);
}
function fD(n) {
  let a = {
    velocity: xt.velocity,
    stiffness: xt.stiffness,
    damping: xt.damping,
    mass: xt.mass,
    isResolvedFromDuration: !1,
    ...n
  };
  if (!R0(n, dD) && R0(n, cD))
    if (a.velocity = 0, n.visualDuration) {
      const r = n.visualDuration, s = 2 * Math.PI / (r * 1.2), o = s * s, c = 2 * Si(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: xt.mass,
        stiffness: o,
        damping: c
      };
    } else {
      const r = uD({ ...n, velocity: 0 });
      a = {
        ...a,
        ...r,
        mass: xt.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function cu(n = xt.visualDuration, a = xt.bounce) {
  const r = typeof n != "object" ? {
    visualDuration: n,
    keyframes: [0, 1],
    bounce: a
  } : n;
  let { restSpeed: s, restDelta: o } = r;
  const c = r.keyframes[0], h = r.keyframes[r.keyframes.length - 1], m = { done: !1, value: c }, { stiffness: v, damping: p, mass: b, duration: g, velocity: S, isResolvedFromDuration: w } = fD({
    ...r,
    velocity: -/* @__PURE__ */ Jn(r.velocity || 0)
  }), j = S || 0, T = p / (2 * Math.sqrt(v * b)), A = h - c, C = /* @__PURE__ */ Jn(Math.sqrt(v / b)), D = Math.abs(A) < 5;
  s || (s = D ? xt.restSpeed.granular : xt.restSpeed.default), o || (o = D ? xt.restDelta.granular : xt.restDelta.default);
  let z, k, W, G, ee, R;
  if (T < 1)
    W = Of(C, T), G = (j + T * C * A) / W, z = (Z) => {
      const ue = Math.exp(-T * C * Z);
      return h - ue * (G * Math.sin(W * Z) + A * Math.cos(W * Z));
    }, ee = T * C * G + A * W, R = T * C * A - G * W, k = (Z) => Math.exp(-T * C * Z) * (ee * Math.sin(W * Z) + R * Math.cos(W * Z));
  else if (T === 1) {
    z = (ue) => h - Math.exp(-C * ue) * (A + (j + C * A) * ue);
    const Z = j + C * A;
    k = (ue) => Math.exp(-C * ue) * (C * Z * ue - j);
  } else {
    const Z = C * Math.sqrt(T * T - 1);
    z = (je) => {
      const le = Math.exp(-T * C * je), L = Math.min(Z * je, 300);
      return h - le * ((j + T * C * A) * Math.sinh(L) + Z * A * Math.cosh(L)) / Z;
    };
    const ue = (j + T * C * A) / Z, oe = T * C * ue - A * Z, ve = T * C * A - ue * Z;
    k = (je) => {
      const le = Math.exp(-T * C * je), L = Math.min(Z * je, 300);
      return le * (oe * Math.sinh(L) + ve * Math.cosh(L));
    };
  }
  const H = {
    calculatedDuration: w && g || null,
    velocity: (Z) => /* @__PURE__ */ $n(k(Z)),
    next: (Z) => {
      if (!w && T < 1) {
        const oe = Math.exp(-T * C * Z), ve = Math.sin(W * Z), je = Math.cos(W * Z), le = h - oe * (G * ve + A * je), L = /* @__PURE__ */ $n(oe * (ee * ve + R * je));
        return m.done = Math.abs(L) <= s && Math.abs(h - le) <= o, m.value = m.done ? h : le, m;
      }
      const ue = z(Z);
      if (w)
        m.done = Z >= g;
      else {
        const oe = /* @__PURE__ */ $n(k(Z));
        m.done = Math.abs(oe) <= s && Math.abs(h - ue) <= o;
      }
      return m.value = m.done ? h : ue, m;
    },
    toString: () => {
      const Z = Math.min(jh(H), uu), ue = Kx((oe) => H.next(Z * oe).value, Z, 30);
      return Z + "ms " + ue;
    },
    toTransition: () => {
    }
  };
  return H;
}
cu.applyToOptions = (n) => {
  const a = lD(n, 100, cu);
  return n.ease = a.ease, n.duration = /* @__PURE__ */ $n(a.duration), n.type = "keyframes", n;
};
const hD = 5;
function Qx(n, a, r) {
  const s = Math.max(a - hD, 0);
  return Rx(r - n(s), a - s);
}
function Lf({ keyframes: n, velocity: a = 0, power: r = 0.8, timeConstant: s = 325, bounceDamping: o = 10, bounceStiffness: c = 500, modifyTarget: h, min: m, max: v, restDelta: p = 0.5, restSpeed: b }) {
  const g = n[0], S = {
    done: !1,
    value: g
  }, w = (R) => m !== void 0 && R < m || v !== void 0 && R > v, j = (R) => m === void 0 ? v : v === void 0 || Math.abs(m - R) < Math.abs(v - R) ? m : v;
  let T = r * a;
  const A = g + T, C = h === void 0 ? A : h(A);
  C !== A && (T = C - g);
  const D = (R) => -T * Math.exp(-R / s), z = (R) => C + D(R), k = (R) => {
    const H = D(R), Z = z(R);
    S.done = Math.abs(H) <= p, S.value = S.done ? C : Z;
  };
  let W, G;
  const ee = (R) => {
    w(S.value) && (W = R, G = cu({
      keyframes: [S.value, j(S.value)],
      velocity: Qx(z, R, S.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: c,
      restDelta: p,
      restSpeed: b
    }));
  };
  return ee(0), {
    calculatedDuration: null,
    next: (R) => {
      let H = !1;
      return !G && W === void 0 && (H = !0, k(R), ee(R)), W !== void 0 && R >= W ? G.next(R - W) : (!H && k(R), S);
    }
  };
}
function mD(n, a, r) {
  const s = [], o = r || wi.mix || Xx, c = n.length - 1;
  for (let h = 0; h < c; h++) {
    let m = o(n[h], n[h + 1]);
    if (a) {
      const v = Array.isArray(a) ? a[h] || Pr : a;
      m = ju(v, m);
    }
    s.push(m);
  }
  return s;
}
function pD(n, a, { clamp: r = !0, ease: s, mixer: o } = {}) {
  const c = n.length;
  if (Xr(c === a.length, "Both input and output ranges must be the same length", "range-length"), c === 1)
    return () => a[0];
  if (c === 2 && a[0] === a[1])
    return () => a[1];
  const h = n[0] === n[1];
  n[0] > n[c - 1] && (n = [...n].reverse(), a = [...a].reverse());
  const m = mD(a, s, o), v = m.length, p = (b) => {
    if (h && b < n[0])
      return a[0];
    let g = 0;
    if (v > 1)
      for (; g < n.length - 2 && !(b < n[g + 1]); g++)
        ;
    const S = /* @__PURE__ */ Nx(n[g], n[g + 1], b);
    return m[g](S);
  };
  return r ? (b) => p(Si(n[0], n[c - 1], b)) : p;
}
function gD(n, a) {
  const r = n[n.length - 1];
  for (let s = 1; s <= a; s++) {
    const o = /* @__PURE__ */ Nx(0, a, s);
    n.push(Ss(r, 1, o));
  }
}
function vD(n) {
  const a = [0];
  return gD(a, n.length - 1), a;
}
function yD(n, a) {
  return n.map((r) => r * a);
}
function bD(n, a) {
  return n.map(() => a || Vx).splice(0, n.length - 1);
}
function is({ duration: n = 300, keyframes: a, times: r, ease: s = "easeInOut" }) {
  const o = M3(s) ? s.map(E0) : E0(s), c = {
    done: !1,
    value: a[0]
  }, h = yD(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    r && r.length === a.length ? r : vD(a),
    n
  ), m = pD(h, a, {
    ease: Array.isArray(o) ? o : bD(a, o)
  });
  return {
    calculatedDuration: n,
    next: (v) => (c.value = m(v), c.done = v >= n, c)
  };
}
const xD = (n) => n !== null;
function Tu(n, { repeat: a, repeatType: r = "loop" }, s, o = 1) {
  const c = n.filter(xD), m = o < 0 || a && r !== "loop" && a % 2 === 1 ? 0 : c.length - 1;
  return !m || s === void 0 ? c[m] : s;
}
const SD = {
  decay: Lf,
  inertia: Lf,
  tween: is,
  keyframes: is,
  spring: cu
};
function Zx(n) {
  typeof n.type == "string" && (n.type = SD[n.type]);
}
class Th {
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
const wD = (n) => n / 100;
class du extends Th {
  constructor(a) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: r } = this.options;
      r && r.updatedAt !== Cn.now() && this.tick(Cn.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = a, this.initAnimation(), this.play(), a.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: a } = this;
    Zx(a);
    const { type: r = is, repeat: s = 0, repeatDelay: o = 0, repeatType: c, velocity: h = 0 } = a;
    let { keyframes: m } = a;
    const v = r || is;
    v !== is && typeof m[0] != "number" && (this.mixKeyframes = ju(wD, Xx(m[0], m[1])), m = [0, 100]);
    const p = v({ ...a, keyframes: m });
    c === "mirror" && (this.mirroredGenerator = v({
      ...a,
      keyframes: [...m].reverse(),
      velocity: -h
    })), p.calculatedDuration === null && (p.calculatedDuration = jh(p));
    const { calculatedDuration: b } = p;
    this.calculatedDuration = b, this.resolvedDuration = b + o, this.totalDuration = this.resolvedDuration * (s + 1) - o, this.generator = p;
  }
  updateTime(a) {
    const r = Math.round(a - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = r;
  }
  tick(a, r = !1) {
    const { generator: s, totalDuration: o, mixKeyframes: c, mirroredGenerator: h, resolvedDuration: m, calculatedDuration: v } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: p = 0, keyframes: b, repeat: g, repeatType: S, repeatDelay: w, type: j, onUpdate: T, finalKeyframe: A } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), r ? this.currentTime = a : this.updateTime(a);
    const C = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1), D = this.playbackSpeed >= 0 ? C < 0 : C > o;
    this.currentTime = Math.max(C, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let z = this.currentTime, k = s;
    if (g) {
      const R = Math.min(this.currentTime, o) / m;
      let H = Math.floor(R), Z = R % 1;
      !Z && R >= 1 && (Z = 1), Z === 1 && H--, H = Math.min(H, g + 1), !!(H % 2) && (S === "reverse" ? (Z = 1 - Z, w && (Z -= w / m)) : S === "mirror" && (k = h)), z = Si(0, 1, Z) * m;
    }
    let W;
    D ? (this.delayState.value = b[0], W = this.delayState) : W = k.next(z), c && !D && (W.value = c(W.value));
    let { done: G } = W;
    !D && v !== null && (G = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const ee = this.holdTime === null && (this.state === "finished" || this.state === "running" && G);
    return ee && j !== Lf && (W.value = Tu(b, this.options, A, this.speed)), T && T(W.value), ee && this.finish(), W;
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
    return /* @__PURE__ */ Jn(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Jn(a);
  }
  get time() {
    return /* @__PURE__ */ Jn(this.currentTime);
  }
  set time(a) {
    a = /* @__PURE__ */ $n(a), this.currentTime = a, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = a : this.driver && (this.startTime = this.driver.now() - a / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = a, this.tick(a));
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
    return Qx((s) => this.generator.next(s).value, a, r);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(a) {
    const r = this.playbackSpeed !== a;
    r && this.driver && this.updateTime(Cn.now()), this.playbackSpeed = a, r && this.driver && (this.time = /* @__PURE__ */ Jn(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: a = rD, startTime: r } = this.options;
    this.driver || (this.driver = a((o) => this.tick(o))), this.options.onPlay?.();
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = r ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(Cn.now()), this.holdTime = this.currentTime;
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
function ED(n) {
  for (let a = 1; a < n.length; a++)
    n[a] ?? (n[a] = n[a - 1]);
}
const Qi = (n) => n * 180 / Math.PI, Uf = (n) => {
  const a = Qi(Math.atan2(n[1], n[0]));
  return Vf(a);
}, jD = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (n) => (Math.abs(n[0]) + Math.abs(n[3])) / 2,
  rotate: Uf,
  rotateZ: Uf,
  skewX: (n) => Qi(Math.atan(n[1])),
  skewY: (n) => Qi(Math.atan(n[2])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[2])) / 2
}, Vf = (n) => (n = n % 360, n < 0 && (n += 360), n), A0 = Uf, _0 = (n) => Math.sqrt(n[0] * n[0] + n[1] * n[1]), D0 = (n) => Math.sqrt(n[4] * n[4] + n[5] * n[5]), TD = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: _0,
  scaleY: D0,
  scale: (n) => (_0(n) + D0(n)) / 2,
  rotateX: (n) => Vf(Qi(Math.atan2(n[6], n[5]))),
  rotateY: (n) => Vf(Qi(Math.atan2(-n[2], n[0]))),
  rotateZ: A0,
  rotate: A0,
  skewX: (n) => Qi(Math.atan(n[4])),
  skewY: (n) => Qi(Math.atan(n[1])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[4])) / 2
};
function kf(n) {
  return n.includes("scale") ? 1 : 0;
}
function Bf(n, a) {
  if (!n || n === "none")
    return kf(a);
  const r = n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, o;
  if (r)
    s = TD, o = r;
  else {
    const m = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = jD, o = m;
  }
  if (!o)
    return kf(a);
  const c = s[a], h = o[1].split(",").map(ND);
  return typeof c == "function" ? c(h) : h[c];
}
const CD = (n, a) => {
  const { transform: r = "none" } = getComputedStyle(n);
  return Bf(r, a);
};
function ND(n) {
  return parseFloat(n.trim());
}
const Wr = [
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
], el = new Set(Wr), z0 = (n) => n === Jr || n === Se, MD = /* @__PURE__ */ new Set(["x", "y", "z"]), RD = Wr.filter((n) => !MD.has(n));
function AD(n) {
  const a = [];
  return RD.forEach((r) => {
    const s = n.getValue(r);
    s !== void 0 && (a.push([r, s.get()]), s.set(r.startsWith("scale") ? 1 : 0));
  }), a;
}
const bi = {
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
  x: (n, { transform: a }) => Bf(a, "x"),
  y: (n, { transform: a }) => Bf(a, "y")
};
bi.translateX = bi.x;
bi.translateY = bi.y;
const Pi = /* @__PURE__ */ new Set();
let Hf = !1, qf = !1, $f = !1;
function Px() {
  if (qf) {
    const n = Array.from(Pi).filter((s) => s.needsMeasurement), a = new Set(n.map((s) => s.element)), r = /* @__PURE__ */ new Map();
    a.forEach((s) => {
      const o = AD(s);
      o.length && (r.set(s, o), s.render());
    }), n.forEach((s) => s.measureInitialState()), a.forEach((s) => {
      s.render();
      const o = r.get(s);
      o && o.forEach(([c, h]) => {
        s.getValue(c)?.set(h);
      });
    }), n.forEach((s) => s.measureEndState()), n.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  qf = !1, Hf = !1, Pi.forEach((n) => n.complete($f)), Pi.clear();
}
function Jx() {
  Pi.forEach((n) => {
    n.readKeyframes(), n.needsMeasurement && (qf = !0);
  });
}
function _D() {
  $f = !0, Jx(), Px(), $f = !1;
}
class Ch {
  constructor(a, r, s, o, c, h = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = r, this.name = s, this.motionValue = o, this.element = c, this.isAsync = h;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Pi.add(this), Hf || (Hf = !0, Yn.read(Jx), Yn.resolveKeyframes(Px))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, name: r, element: s, motionValue: o } = this;
    if (a[0] === null) {
      const c = o?.get(), h = a[a.length - 1];
      if (c !== void 0)
        a[0] = c;
      else if (s && r) {
        const m = s.readValue(r, h);
        m != null && (a[0] = m);
      }
      a[0] === void 0 && (a[0] = h), o && c === void 0 && o.set(a[0]);
    }
    ED(a);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, a), Pi.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Pi.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const DD = (n) => n.startsWith("--");
function Wx(n, a, r) {
  DD(a) ? n.style.setProperty(a, r) : n.style[a] = r;
}
const zD = {};
function e1(n, a) {
  const r = /* @__PURE__ */ Cx(n);
  return () => zD[a] ?? r();
}
const OD = /* @__PURE__ */ e1(() => window.ScrollTimeline !== void 0, "scrollTimeline"), t1 = /* @__PURE__ */ e1(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), ts = ([n, a, r, s]) => `cubic-bezier(${n}, ${a}, ${r}, ${s})`, O0 = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ ts([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ ts([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ ts([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ ts([0.33, 1.53, 0.69, 0.99])
};
function n1(n, a) {
  if (n)
    return typeof n == "function" ? t1() ? Kx(n, a) : "ease-out" : kx(n) ? ts(n) : Array.isArray(n) ? n.map((r) => n1(r, a) || O0.easeOut) : O0[n];
}
function LD(n, a, r, { delay: s = 0, duration: o = 300, repeat: c = 0, repeatType: h = "loop", ease: m = "easeOut", times: v } = {}, p = void 0) {
  const b = {
    [a]: r
  };
  v && (b.offset = v);
  const g = n1(m, o);
  Array.isArray(g) && (b.easing = g);
  const S = {
    delay: s,
    duration: o,
    easing: Array.isArray(g) ? "linear" : g,
    fill: "both",
    iterations: c + 1,
    direction: h === "reverse" ? "alternate" : "normal"
  };
  return p && (S.pseudoElement = p), n.animate(b, S);
}
function a1(n) {
  return typeof n == "function" && "applyToOptions" in n;
}
function UD({ type: n, ...a }) {
  return a1(n) && t1() ? n.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class i1 extends Th {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: r, name: s, keyframes: o, pseudoElement: c, allowFlatten: h = !1, finalKeyframe: m, onComplete: v } = a;
    this.isPseudoElement = !!c, this.allowFlatten = h, this.options = a, Xr(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const p = UD(a);
    this.animation = LD(r, s, o, p, c), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !c) {
        const b = Tu(o, this.options, m, this.speed);
        this.updateMotionValue && this.updateMotionValue(b), Wx(r, s, b), this.animation.cancel();
      }
      v?.(), this.notifyFinished();
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
    return /* @__PURE__ */ Jn(Number(a));
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Jn(a);
  }
  get time() {
    return /* @__PURE__ */ Jn(Number(this.animation.currentTime) || 0);
  }
  set time(a) {
    const r = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ $n(a), r && this.animation.pause();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && OD() ? (this.animation.timeline = a, r && (this.animation.rangeStart = r), s && (this.animation.rangeEnd = s), Pr) : o(this);
  }
}
const r1 = {
  anticipate: Lx,
  backInOut: Ox,
  circInOut: Ux
};
function VD(n) {
  return n in r1;
}
function kD(n) {
  typeof n.ease == "string" && VD(n.ease) && (n.ease = r1[n.ease]);
}
const mf = 10;
class BD extends i1 {
  constructor(a) {
    kD(a), Zx(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const { motionValue: r, onUpdate: s, onComplete: o, element: c, ...h } = this.options;
    if (!r)
      return;
    if (a !== void 0) {
      r.set(a);
      return;
    }
    const m = new du({
      ...h,
      autoplay: !1
    }), v = Math.max(mf, Cn.now() - this.startTime), p = Si(0, mf, v - mf), b = m.sample(v).value, { name: g } = this.options;
    c && g && Wx(c, g, b), r.setWithVelocity(m.sample(Math.max(0, v - p)).value, b, p), m.stop();
  }
}
const L0 = (n, a) => a === "zIndex" ? !1 : !!(typeof n == "number" || Array.isArray(n) || typeof n == "string" && // It's animatable if we have a string
(Wn.test(n) || n === "0") && // And it contains numbers and/or colors
!n.startsWith("url("));
function HD(n) {
  const a = n[0];
  if (n.length === 1)
    return !0;
  for (let r = 0; r < n.length; r++)
    if (n[r] !== a)
      return !0;
}
function qD(n, a, r, s) {
  const o = n[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const c = n[n.length - 1], h = L0(o, a), m = L0(c, a);
  return ys(h === m, `You are trying to animate ${a} from "${o}" to "${c}". "${h ? c : o}" is not an animatable value.`, "value-not-animatable"), !h || !m ? !1 : HD(n) || (r === "spring" || a1(r)) && s;
}
function Yf(n) {
  n.duration = 0, n.type = "keyframes";
}
const l1 = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), $D = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function YD(n) {
  for (let a = 0; a < n.length; a++)
    if (typeof n[a] == "string" && $D.test(n[a]))
      return !0;
  return !1;
}
const FD = /* @__PURE__ */ new Set([
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
]), ID = /* @__PURE__ */ Cx(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function GD(n) {
  const { motionValue: a, name: r, repeatDelay: s, repeatType: o, damping: c, type: h, keyframes: m } = n;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: p, transformTemplate: b } = a.owner.getProps();
  return ID() && r && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (l1.has(r) || FD.has(r) && YD(m)) && (r !== "transform" || !b) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !p && !s && o !== "mirror" && c !== 0 && h !== "inertia";
}
const XD = 40;
class KD extends Th {
  constructor({ autoplay: a = !0, delay: r = 0, type: s = "keyframes", repeat: o = 0, repeatDelay: c = 0, repeatType: h = "loop", keyframes: m, name: v, motionValue: p, element: b, ...g }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = Cn.now();
    const S = {
      autoplay: a,
      delay: r,
      type: s,
      repeat: o,
      repeatDelay: c,
      repeatType: h,
      name: v,
      motionValue: p,
      element: b,
      ...g
    }, w = b?.KeyframeResolver || Ch;
    this.keyframeResolver = new w(m, (j, T, A) => this.onKeyframesResolved(j, T, S, !A), v, p, b), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, r, s, o) {
    this.keyframeResolver = void 0;
    const { name: c, type: h, velocity: m, delay: v, isHandoff: p, onUpdate: b } = s;
    this.resolvedAt = Cn.now();
    let g = !0;
    qD(a, c, h, m) || (g = !1, (wi.instantAnimations || !v) && b?.(Tu(a, s, r)), a[0] = a[a.length - 1], Yf(s), s.repeat = 0);
    const w = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > XD ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: r,
      ...s,
      keyframes: a
    }, j = g && !p && GD(w), T = w.motionValue?.owner?.current;
    let A;
    if (j)
      try {
        A = new BD({
          ...w,
          element: T
        });
      } catch {
        A = new du(w);
      }
    else
      A = new du(w);
    A.finished.then(() => {
      this.notifyFinished();
    }).catch(Pr), this.pendingTimeline && (this.stopTimeline = A.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = A;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(a, r) {
    return this.finished.finally(a).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), _D()), this._animation;
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
function s1(n, a, r, s = 0, o = 1) {
  const c = Array.from(n).sort((p, b) => p.sortNodePosition(b)).indexOf(a), h = n.size, m = (h - 1) * s;
  return typeof r == "function" ? r(c, h) : o === 1 ? c * s : m - c * s;
}
const QD = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function ZD(n) {
  const a = QD.exec(n);
  if (!a)
    return [,];
  const [, r, s, o] = a;
  return [`--${r ?? s}`, o];
}
const PD = 4;
function o1(n, a, r = 1) {
  Xr(r <= PD, `Max CSS variable fallback depth detected in property "${n}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, o] = ZD(n);
  if (!s)
    return;
  const c = window.getComputedStyle(a).getPropertyValue(s);
  if (c) {
    const h = c.trim();
    return jx(h) ? parseFloat(h) : h;
  }
  return xh(o) ? o1(o, a, r + 1) : o;
}
const JD = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, WD = (n) => ({
  type: "spring",
  stiffness: 550,
  damping: n === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), ez = {
  type: "keyframes",
  duration: 0.8
}, tz = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, nz = (n, { keyframes: a }) => a.length > 2 ? ez : el.has(n) ? n.startsWith("scale") ? WD(a[1]) : JD : tz;
function u1(n, a) {
  if (n?.inherit && a) {
    const { inherit: r, ...s } = n;
    return { ...a, ...s };
  }
  return n;
}
function c1(n, a) {
  const r = n?.[a] ?? n?.default ?? n;
  return r !== n ? u1(r, n) : r;
}
const az = /* @__PURE__ */ new Set([
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
function iz(n) {
  for (const a in n)
    if (!az.has(a))
      return !0;
  return !1;
}
const rz = (n, a, r, s = {}, o, c) => (h) => {
  const m = c1(s, n) || {}, v = m.delay || s.delay || 0;
  let { elapsed: p = 0 } = s;
  p = p - /* @__PURE__ */ $n(v);
  const b = {
    keyframes: Array.isArray(r) ? r : [null, r],
    ease: "easeOut",
    velocity: a.getVelocity(),
    ...m,
    delay: -p,
    onUpdate: (S) => {
      a.set(S), m.onUpdate && m.onUpdate(S);
    },
    onComplete: () => {
      h(), m.onComplete && m.onComplete();
    },
    name: n,
    motionValue: a,
    element: c ? void 0 : o
  };
  iz(m) || Object.assign(b, nz(n, b)), b.duration && (b.duration = /* @__PURE__ */ $n(b.duration)), b.repeatDelay && (b.repeatDelay = /* @__PURE__ */ $n(b.repeatDelay)), b.from !== void 0 && (b.keyframes[0] = b.from);
  let g = !1;
  if ((b.type === !1 || b.duration === 0 && !b.repeatDelay) && (Yf(b), b.delay === 0 && (g = !0)), (wi.instantAnimations || wi.skipAnimations || o?.shouldSkipAnimations) && (g = !0, Yf(b), b.delay = 0), b.allowFlatten = !m.type && !m.ease, g && !c && a.get() !== void 0) {
    const S = Tu(b.keyframes, m);
    if (S !== void 0) {
      Yn.update(() => {
        b.onUpdate(S), b.onComplete();
      });
      return;
    }
  }
  return m.isSync ? new du(b) : new KD(b);
};
function U0(n) {
  const a = [{}, {}];
  return n?.values.forEach((r, s) => {
    a[0][s] = r.get(), a[1][s] = r.getVelocity();
  }), a;
}
function Nh(n, a, r, s) {
  if (typeof a == "function") {
    const [o, c] = U0(s);
    a = a(r !== void 0 ? r : n.custom, o, c);
  }
  if (typeof a == "string" && (a = n.variants && n.variants[a]), typeof a == "function") {
    const [o, c] = U0(s);
    a = a(r !== void 0 ? r : n.custom, o, c);
  }
  return a;
}
function Ji(n, a, r) {
  const s = n.getProps();
  return Nh(s, a, r !== void 0 ? r : s.custom, n);
}
const d1 = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Wr
]), V0 = 30, lz = (n) => !isNaN(parseFloat(n));
class sz {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(a, r = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      const o = Cn.now();
      if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const c of this.dependents)
          c.dirty();
    }, this.hasAnimated = !1, this.setCurrent(a), this.owner = r.owner;
  }
  setCurrent(a) {
    this.current = a, this.updatedAt = Cn.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = lz(this.current));
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
    this.events[a] || (this.events[a] = new Mx());
    const s = this.events[a].add(r);
    return a === "change" ? () => {
      s(), Yn.read(() => {
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
    const a = Cn.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > V0)
      return 0;
    const r = Math.min(this.updatedAt - this.prevUpdatedAt, V0);
    return Rx(parseFloat(this.current) - parseFloat(this.prevFrameValue), r);
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
function fu(n, a) {
  return new sz(n, a);
}
const Ff = (n) => Array.isArray(n);
function oz(n, a, r) {
  n.hasValue(a) ? n.getValue(a).set(r) : n.addValue(a, fu(r));
}
function uz(n) {
  return Ff(n) ? n[n.length - 1] || 0 : n;
}
function cz(n, a) {
  const r = Ji(n, a);
  let { transitionEnd: s = {}, transition: o = {}, ...c } = r || {};
  c = { ...c, ...s };
  for (const h in c) {
    const m = uz(c[h]);
    oz(n, h, m);
  }
}
const tn = (n) => !!(n && n.getVelocity);
function dz(n) {
  return !!(tn(n) && n.add);
}
function fz(n, a) {
  const r = n.getValue("willChange");
  if (dz(r))
    return r.add(a);
  if (!r && wi.WillChange) {
    const s = new wi.WillChange("auto");
    n.addValue("willChange", s), s.add(a);
  }
}
function Mh(n) {
  return n.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const hz = "framerAppearId", f1 = "data-" + Mh(hz);
function mz(n) {
  return n.props[f1];
}
function pz({ protectedKeys: n, needsAnimating: a }, r) {
  const s = n.hasOwnProperty(r) && a[r] !== !0;
  return a[r] = !1, s;
}
function h1(n, a, { delay: r = 0, transitionOverride: s, type: o } = {}) {
  let { transition: c, transitionEnd: h, ...m } = a;
  const v = n.getDefaultTransition();
  c = c ? u1(c, v) : v;
  const p = c?.reduceMotion;
  s && (c = s);
  const b = [], g = o && n.animationState && n.animationState.getState()[o];
  for (const S in m) {
    const w = n.getValue(S, n.latestValues[S] ?? null), j = m[S];
    if (j === void 0 || g && pz(g, S))
      continue;
    const T = {
      delay: r,
      ...c1(c || {}, S)
    }, A = w.get();
    if (A !== void 0 && !w.isAnimating() && !Array.isArray(j) && j === A && !T.velocity) {
      Yn.update(() => w.set(j));
      continue;
    }
    let C = !1;
    if (window.MotionHandoffAnimation) {
      const k = mz(n);
      if (k) {
        const W = window.MotionHandoffAnimation(k, S, Yn);
        W !== null && (T.startTime = W, C = !0);
      }
    }
    fz(n, S);
    const D = p ?? n.shouldReduceMotion;
    w.start(rz(S, w, j, D && d1.has(S) ? { type: !1 } : T, n, C));
    const z = w.animation;
    z && b.push(z);
  }
  if (h) {
    const S = () => Yn.update(() => {
      h && cz(n, h);
    });
    b.length ? Promise.all(b).then(S) : S();
  }
  return b;
}
function If(n, a, r = {}) {
  const s = Ji(n, a, r.type === "exit" ? n.presenceContext?.custom : void 0);
  let { transition: o = n.getDefaultTransition() || {} } = s || {};
  r.transitionOverride && (o = r.transitionOverride);
  const c = s ? () => Promise.all(h1(n, s, r)) : () => Promise.resolve(), h = n.variantChildren && n.variantChildren.size ? (v = 0) => {
    const { delayChildren: p = 0, staggerChildren: b, staggerDirection: g } = o;
    return gz(n, a, v, p, b, g, r);
  } : () => Promise.resolve(), { when: m } = o;
  if (m) {
    const [v, p] = m === "beforeChildren" ? [c, h] : [h, c];
    return v().then(() => p());
  } else
    return Promise.all([c(), h(r.delay)]);
}
function gz(n, a, r = 0, s = 0, o = 0, c = 1, h) {
  const m = [];
  for (const v of n.variantChildren)
    v.notify("AnimationStart", a), m.push(If(v, a, {
      ...h,
      delay: r + (typeof s == "function" ? 0 : s) + s1(n.variantChildren, v, s, o, c)
    }).then(() => v.notify("AnimationComplete", a)));
  return Promise.all(m);
}
function vz(n, a, r = {}) {
  n.notify("AnimationStart", a);
  let s;
  if (Array.isArray(a)) {
    const o = a.map((c) => If(n, c, r));
    s = Promise.all(o);
  } else if (typeof a == "string")
    s = If(n, a, r);
  else {
    const o = typeof a == "function" ? Ji(n, a, r.custom) : a;
    s = Promise.all(h1(n, o, r));
  }
  return s.then(() => {
    n.notify("AnimationComplete", a);
  });
}
const yz = {
  test: (n) => n === "auto",
  parse: (n) => n
}, m1 = (n) => (a) => a.test(n), p1 = [Jr, Se, Ir, mi, H3, B3, yz], k0 = (n) => p1.find(m1(n));
function bz(n) {
  return typeof n == "number" ? n === 0 : n !== null ? n === "none" || n === "0" || Tx(n) : !0;
}
const xz = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Sz(n) {
  const [a, r] = n.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return n;
  const [s] = r.match(Sh) || [];
  if (!s)
    return n;
  const o = r.replace(s, "");
  let c = xz.has(a) ? 1 : 0;
  return s !== r && (c *= 100), a + "(" + c + o + ")";
}
const wz = /\b([a-z-]*)\(.*?\)/gu, Gf = {
  ...Wn,
  getAnimatableNone: (n) => {
    const a = n.match(wz);
    return a ? a.map(Sz).join(" ") : n;
  }
}, Xf = {
  ...Wn,
  getAnimatableNone: (n) => {
    const a = Wn.parse(n);
    return Wn.createTransformer(n)(a.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, B0 = {
  ...Jr,
  transform: Math.round
}, Ez = {
  rotate: mi,
  rotateX: mi,
  rotateY: mi,
  rotateZ: mi,
  scale: Io,
  scaleX: Io,
  scaleY: Io,
  scaleZ: Io,
  skew: mi,
  skewX: mi,
  skewY: mi,
  distance: Se,
  translateX: Se,
  translateY: Se,
  translateZ: Se,
  x: Se,
  y: Se,
  z: Se,
  perspective: Se,
  transformPerspective: Se,
  opacity: cs,
  originX: T0,
  originY: T0,
  originZ: Se
}, Rh = {
  // Border props
  borderWidth: Se,
  borderTopWidth: Se,
  borderRightWidth: Se,
  borderBottomWidth: Se,
  borderLeftWidth: Se,
  borderRadius: Se,
  borderTopLeftRadius: Se,
  borderTopRightRadius: Se,
  borderBottomRightRadius: Se,
  borderBottomLeftRadius: Se,
  // Positioning props
  width: Se,
  maxWidth: Se,
  height: Se,
  maxHeight: Se,
  top: Se,
  right: Se,
  bottom: Se,
  left: Se,
  inset: Se,
  insetBlock: Se,
  insetBlockStart: Se,
  insetBlockEnd: Se,
  insetInline: Se,
  insetInlineStart: Se,
  insetInlineEnd: Se,
  // Spacing props
  padding: Se,
  paddingTop: Se,
  paddingRight: Se,
  paddingBottom: Se,
  paddingLeft: Se,
  paddingBlock: Se,
  paddingBlockStart: Se,
  paddingBlockEnd: Se,
  paddingInline: Se,
  paddingInlineStart: Se,
  paddingInlineEnd: Se,
  margin: Se,
  marginTop: Se,
  marginRight: Se,
  marginBottom: Se,
  marginLeft: Se,
  marginBlock: Se,
  marginBlockStart: Se,
  marginBlockEnd: Se,
  marginInline: Se,
  marginInlineStart: Se,
  marginInlineEnd: Se,
  // Typography
  fontSize: Se,
  // Misc
  backgroundPositionX: Se,
  backgroundPositionY: Se,
  ...Ez,
  zIndex: B0,
  // SVG
  fillOpacity: cs,
  strokeOpacity: cs,
  numOctaves: B0
}, jz = {
  ...Rh,
  // Color props
  color: Ut,
  backgroundColor: Ut,
  outlineColor: Ut,
  fill: Ut,
  stroke: Ut,
  // Border props
  borderColor: Ut,
  borderTopColor: Ut,
  borderRightColor: Ut,
  borderBottomColor: Ut,
  borderLeftColor: Ut,
  filter: Gf,
  WebkitFilter: Gf,
  mask: Xf,
  WebkitMask: Xf
}, g1 = (n) => jz[n], Tz = /* @__PURE__ */ new Set([Gf, Xf]);
function v1(n, a) {
  let r = g1(n);
  return Tz.has(r) || (r = Wn), r.getAnimatableNone ? r.getAnimatableNone(a) : void 0;
}
const Cz = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Nz(n, a, r) {
  let s = 0, o;
  for (; s < n.length && !o; ) {
    const c = n[s];
    typeof c == "string" && !Cz.has(c) && Kr(c).values.length && (o = n[s]), s++;
  }
  if (o && r)
    for (const c of a)
      n[c] = v1(r, o);
}
class Mz extends Ch {
  constructor(a, r, s, o, c) {
    super(a, r, s, o, c, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, element: r, name: s } = this;
    if (!r || !r.current)
      return;
    super.readKeyframes();
    for (let b = 0; b < a.length; b++) {
      let g = a[b];
      if (typeof g == "string" && (g = g.trim(), xh(g))) {
        const S = o1(g, r.current);
        S !== void 0 && (a[b] = S), b === a.length - 1 && (this.finalKeyframe = g);
      }
    }
    if (this.resolveNoneKeyframes(), !d1.has(s) || a.length !== 2)
      return;
    const [o, c] = a, h = k0(o), m = k0(c), v = j0(o), p = j0(c);
    if (v !== p && bi[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (h !== m)
      if (z0(h) && z0(m))
        for (let b = 0; b < a.length; b++) {
          const g = a[b];
          typeof g == "string" && (a[b] = parseFloat(g));
        }
      else bi[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: r } = this, s = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || bz(a[o])) && s.push(o);
    s.length && Nz(a, s, r);
  }
  measureInitialState() {
    const { element: a, unresolvedKeyframes: r, name: s } = this;
    if (!a || !a.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = bi[s](a.measureViewportBox(), window.getComputedStyle(a.current)), r[0] = this.measuredOrigin;
    const o = r[r.length - 1];
    o !== void 0 && a.getValue(s, o).jump(o, !1);
  }
  measureEndState() {
    const { element: a, name: r, unresolvedKeyframes: s } = this;
    if (!a || !a.current)
      return;
    const o = a.getValue(r);
    o && o.jump(this.measuredOrigin, !1);
    const c = s.length - 1, h = s[c];
    s[c] = bi[r](a.measureViewportBox(), window.getComputedStyle(a.current)), h !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = h), this.removedTransforms?.length && this.removedTransforms.forEach(([m, v]) => {
      a.getValue(m).set(v);
    }), this.resolveNoneKeyframes();
  }
}
function Rz(n, a, r) {
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
const y1 = (n, a) => a && typeof n == "number" ? a.transform(n) : n;
function tu(n) {
  return x3(n) && "offsetHeight" in n && !("ownerSVGElement" in n);
}
const { schedule: Az } = /* @__PURE__ */ Bx(queueMicrotask, !1), _z = {
  y: !1
};
function Dz() {
  return _z.y;
}
function b1(n, a) {
  const r = Rz(n), s = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: s.signal
  };
  return [r, o, () => s.abort()];
}
function zz(n) {
  return !(n.pointerType === "touch" || Dz());
}
function Oz(n, a, r = {}) {
  const [s, o, c] = b1(n, r);
  return s.forEach((h) => {
    let m = !1, v = !1, p;
    const b = () => {
      h.removeEventListener("pointerleave", j);
    }, g = (A) => {
      p && (p(A), p = void 0), b();
    }, S = (A) => {
      m = !1, window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), v && (v = !1, g(A));
    }, w = () => {
      m = !0, window.addEventListener("pointerup", S, o), window.addEventListener("pointercancel", S, o);
    }, j = (A) => {
      if (A.pointerType !== "touch") {
        if (m) {
          v = !0;
          return;
        }
        g(A);
      }
    }, T = (A) => {
      if (!zz(A))
        return;
      v = !1;
      const C = a(h, A);
      typeof C == "function" && (p = C, h.addEventListener("pointerleave", j, o));
    };
    h.addEventListener("pointerenter", T, o), h.addEventListener("pointerdown", w, o);
  }), c;
}
const x1 = (n, a) => a ? n === a ? !0 : x1(n, a.parentElement) : !1, Lz = (n) => n.pointerType === "mouse" ? typeof n.button != "number" || n.button <= 0 : n.isPrimary !== !1, Uz = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function Vz(n) {
  return Uz.has(n.tagName) || n.isContentEditable === !0;
}
const nu = /* @__PURE__ */ new WeakSet();
function H0(n) {
  return (a) => {
    a.key === "Enter" && n(a);
  };
}
function pf(n, a) {
  n.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const kz = (n, a) => {
  const r = n.currentTarget;
  if (!r)
    return;
  const s = H0(() => {
    if (nu.has(r))
      return;
    pf(r, "down");
    const o = H0(() => {
      pf(r, "up");
    }), c = () => pf(r, "cancel");
    r.addEventListener("keyup", o, a), r.addEventListener("blur", c, a);
  });
  r.addEventListener("keydown", s, a), r.addEventListener("blur", () => r.removeEventListener("keydown", s), a);
};
function q0(n) {
  return Lz(n) && !0;
}
const $0 = /* @__PURE__ */ new WeakSet();
function Bz(n, a, r = {}) {
  const [s, o, c] = b1(n, r), h = (m) => {
    const v = m.currentTarget;
    if (!q0(m) || $0.has(m))
      return;
    nu.add(v), r.stopPropagation && $0.add(m);
    const p = a(v, m), b = (w, j) => {
      window.removeEventListener("pointerup", g), window.removeEventListener("pointercancel", S), nu.has(v) && nu.delete(v), q0(w) && typeof p == "function" && p(w, { success: j });
    }, g = (w) => {
      b(w, v === window || v === document || r.useGlobalTarget || x1(v, w.target));
    }, S = (w) => {
      b(w, !1);
    };
    window.addEventListener("pointerup", g, o), window.addEventListener("pointercancel", S, o);
  };
  return s.forEach((m) => {
    (r.useGlobalTarget ? window : m).addEventListener("pointerdown", h, o), tu(m) && (m.addEventListener("focus", (p) => kz(p, o)), !Vz(m) && !m.hasAttribute("tabindex") && (m.tabIndex = 0));
  }), c;
}
const Hz = [...p1, Ut, Wn], qz = (n) => Hz.find(m1(n)), Y0 = () => ({ min: 0, max: 0 }), S1 = () => ({
  x: Y0(),
  y: Y0()
}), $z = /* @__PURE__ */ new WeakMap();
function Cu(n) {
  return n !== null && typeof n == "object" && typeof n.start == "function";
}
function ds(n) {
  return typeof n == "string" || Array.isArray(n);
}
const Ah = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], _h = ["initial", ...Ah];
function Nu(n) {
  return Cu(n.animate) || _h.some((a) => ds(n[a]));
}
function w1(n) {
  return !!(Nu(n) || n.variants);
}
function Yz(n, a, r) {
  for (const s in a) {
    const o = a[s], c = r[s];
    if (tn(o))
      n.addValue(s, o);
    else if (tn(c))
      n.addValue(s, fu(o, { owner: n }));
    else if (c !== o)
      if (n.hasValue(s)) {
        const h = n.getValue(s);
        h.liveStyle === !0 ? h.jump(o) : h.hasAnimated || h.set(o);
      } else {
        const h = n.getStaticValue(s);
        n.addValue(s, fu(h !== void 0 ? h : o, { owner: n }));
      }
  }
  for (const s in r)
    a[s] === void 0 && n.removeValue(s);
  return a;
}
const Kf = { current: null }, E1 = { current: !1 }, Fz = typeof window < "u";
function Iz() {
  if (E1.current = !0, !!Fz)
    if (window.matchMedia) {
      const n = window.matchMedia("(prefers-reduced-motion)"), a = () => Kf.current = n.matches;
      n.addEventListener("change", a), a();
    } else
      Kf.current = !1;
}
const F0 = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let hu = {};
function j1(n) {
  hu = n;
}
function Gz() {
  return hu;
}
class Xz {
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
  constructor({ parent: a, props: r, presenceContext: s, reducedMotionConfig: o, skipAnimations: c, blockInitialAnimation: h, visualState: m }, v = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Ch, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const w = Cn.now();
      this.renderScheduledAt < w && (this.renderScheduledAt = w, Yn.render(this.render, !1, !0));
    };
    const { latestValues: p, renderState: b } = m;
    this.latestValues = p, this.baseTarget = { ...p }, this.initialValues = r.initial ? { ...p } : {}, this.renderState = b, this.parent = a, this.props = r, this.presenceContext = s, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = c, this.options = v, this.blockInitialAnimation = !!h, this.isControllingVariants = Nu(r), this.isVariantNode = w1(r), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: g, ...S } = this.scrapeMotionValuesFromProps(r, {}, this);
    for (const w in S) {
      const j = S[w];
      p[w] !== void 0 && tn(j) && j.set(p[w]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const r in this.initialValues)
        this.values.get(r)?.jump(this.initialValues[r]), this.latestValues[r] = this.initialValues[r];
    this.current = a, $z.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((r, s) => this.bindToMotionValue(s, r)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (E1.current || Iz(), this.shouldReduceMotion = Kf.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), _f(this.notifyUpdate), _f(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), r.accelerate && l1.has(a) && this.current instanceof HTMLElement) {
      const { factory: h, keyframes: m, times: v, ease: p, duration: b } = r.accelerate, g = new i1({
        element: this.current,
        name: a,
        keyframes: m,
        times: v,
        ease: p,
        duration: /* @__PURE__ */ $n(b)
      }), S = h(g);
      this.valueSubscriptions.set(a, () => {
        S(), g.cancel();
      });
      return;
    }
    const s = el.has(a);
    s && this.onBindTransform && this.onBindTransform();
    const o = r.on("change", (h) => {
      this.latestValues[a] = h, this.props.onUpdate && Yn.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
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
    for (a in hu) {
      const r = hu[a];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : S1();
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
    for (let s = 0; s < F0.length; s++) {
      const o = F0[s];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const c = "on" + o, h = a[c];
      h && (this.propEventSubscriptions[o] = this.on(o, h));
    }
    this.prevMotionValues = Yz(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return s === void 0 && r !== void 0 && (s = fu(r === null ? void 0 : r, { owner: this }), this.addValue(a, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, r) {
    let s = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return s != null && (typeof s == "string" && (jx(s) || Tx(s)) ? s = parseFloat(s) : !qz(s) && Wn.test(r) && (s = v1(a, r)), this.setBaseTarget(a, tn(s) ? s.get() : s)), tn(s) ? s.get() : s;
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
      const c = Nh(this.props, r, this.presenceContext?.custom);
      c && (s = c[a]);
    }
    if (r && s !== void 0)
      return s;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !tn(o) ? o : this.initialValues[a] !== void 0 && s === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, r) {
    return this.events[a] || (this.events[a] = new Mx()), this.events[a].add(r);
  }
  notify(a, ...r) {
    this.events[a] && this.events[a].notify(...r);
  }
  scheduleRenderMicrotask() {
    Az.render(this.render);
  }
}
class T1 extends Xz {
  constructor() {
    super(...arguments), this.KeyframeResolver = Mz;
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
    tn(a) && (this.childSubscription = a.on("change", (r) => {
      this.current && (this.current.textContent = `${r}`);
    }));
  }
}
class tl {
  constructor(a) {
    this.isMounted = !1, this.node = a;
  }
  update() {
  }
}
function Kz({ top: n, left: a, right: r, bottom: s }) {
  return {
    x: { min: a, max: r },
    y: { min: n, max: s }
  };
}
function Qz(n, a) {
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
function Zz(n, a) {
  return Kz(Qz(n.getBoundingClientRect(), a));
}
const Pz = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Jz = Wr.length;
function Wz(n, a, r) {
  let s = "", o = !0;
  for (let c = 0; c < Jz; c++) {
    const h = Wr[c], m = n[h];
    if (m === void 0)
      continue;
    let v = !0;
    if (typeof m == "number")
      v = m === (h.startsWith("scale") ? 1 : 0);
    else {
      const p = parseFloat(m);
      v = h.startsWith("scale") ? p === 1 : p === 0;
    }
    if (!v || r) {
      const p = y1(m, Rh[h]);
      if (!v) {
        o = !1;
        const b = Pz[h] || h;
        s += `${b}(${p}) `;
      }
      r && (a[h] = p);
    }
  }
  return s = s.trim(), r ? s = r(a, o ? "" : s) : o && (s = "none"), s;
}
function Dh(n, a, r) {
  const { style: s, vars: o, transformOrigin: c } = n;
  let h = !1, m = !1;
  for (const v in a) {
    const p = a[v];
    if (el.has(v)) {
      h = !0;
      continue;
    } else if (qx(v)) {
      o[v] = p;
      continue;
    } else {
      const b = y1(p, Rh[v]);
      v.startsWith("origin") ? (m = !0, c[v] = b) : s[v] = b;
    }
  }
  if (a.transform || (h || r ? s.transform = Wz(a, n.transform, r) : s.transform && (s.transform = "none")), m) {
    const { originX: v = "50%", originY: p = "50%", originZ: b = 0 } = c;
    s.transformOrigin = `${v} ${p} ${b}`;
  }
}
function C1(n, { style: a, vars: r }, s, o) {
  const c = n.style;
  let h;
  for (h in a)
    c[h] = a[h];
  o?.applyProjectionStyles(c, s);
  for (h in r)
    c.setProperty(h, r[h]);
}
function I0(n, a) {
  return a.max === a.min ? 0 : n / (a.max - a.min) * 100;
}
const Zl = {
  correct: (n, a) => {
    if (!a.target)
      return n;
    if (typeof n == "string")
      if (Se.test(n))
        n = parseFloat(n);
      else
        return n;
    const r = I0(n, a.target.x), s = I0(n, a.target.y);
    return `${r}% ${s}%`;
  }
}, e5 = {
  correct: (n, { treeScale: a, projectionDelta: r }) => {
    const s = n, o = Wn.parse(n);
    if (o.length > 5)
      return s;
    const c = Wn.createTransformer(n), h = typeof o[0] != "number" ? 1 : 0, m = r.x.scale * a.x, v = r.y.scale * a.y;
    o[0 + h] /= m, o[1 + h] /= v;
    const p = Ss(m, v, 0.5);
    return typeof o[2 + h] == "number" && (o[2 + h] /= p), typeof o[3 + h] == "number" && (o[3 + h] /= p), c(o);
  }
}, t5 = {
  borderRadius: {
    ...Zl,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: Zl,
  borderTopRightRadius: Zl,
  borderBottomLeftRadius: Zl,
  borderBottomRightRadius: Zl,
  boxShadow: e5
};
function N1(n, { layout: a, layoutId: r }) {
  return el.has(n) || n.startsWith("origin") || (a || r !== void 0) && (!!t5[n] || n === "opacity");
}
function zh(n, a, r) {
  const s = n.style, o = a?.style, c = {};
  if (!s)
    return c;
  for (const h in s)
    (tn(s[h]) || o && tn(o[h]) || N1(h, n) || r?.getValue(h)?.liveStyle !== void 0) && (c[h] = s[h]);
  return c;
}
function n5(n) {
  return window.getComputedStyle(n);
}
class a5 extends T1 {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = C1;
  }
  readValueFromInstance(a, r) {
    if (el.has(r))
      return this.projection?.isProjecting ? kf(r) : CD(a, r);
    {
      const s = n5(a), o = (qx(r) ? s.getPropertyValue(r) : s[r]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: r }) {
    return Zz(a, r);
  }
  build(a, r, s) {
    Dh(a, r, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, r, s) {
    return zh(a, r, s);
  }
}
const i5 = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, r5 = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function l5(n, a, r = 1, s = 0, o = !0) {
  n.pathLength = 1;
  const c = o ? i5 : r5;
  n[c.offset] = `${-s}`, n[c.array] = `${a} ${r}`;
}
const s5 = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function M1(n, {
  attrX: a,
  attrY: r,
  attrScale: s,
  pathLength: o,
  pathSpacing: c = 1,
  pathOffset: h = 0,
  // This is object creation, which we try to avoid per-frame.
  ...m
}, v, p, b) {
  if (Dh(n, m, p), v) {
    n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
    return;
  }
  n.attrs = n.style, n.style = {};
  const { attrs: g, style: S } = n;
  g.transform && (S.transform = g.transform, delete g.transform), (S.transform || g.transformOrigin) && (S.transformOrigin = g.transformOrigin ?? "50% 50%", delete g.transformOrigin), S.transform && (S.transformBox = b?.transformBox ?? "fill-box", delete g.transformBox);
  for (const w of s5)
    g[w] !== void 0 && (S[w] = g[w], delete g[w]);
  a !== void 0 && (g.x = a), r !== void 0 && (g.y = r), s !== void 0 && (g.scale = s), o !== void 0 && l5(g, o, c, h, !1);
}
const R1 = /* @__PURE__ */ new Set([
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
]), A1 = (n) => typeof n == "string" && n.toLowerCase() === "svg";
function o5(n, a, r, s) {
  C1(n, a, void 0, s);
  for (const o in a.attrs)
    n.setAttribute(R1.has(o) ? o : Mh(o), a.attrs[o]);
}
function _1(n, a, r) {
  const s = zh(n, a, r);
  for (const o in n)
    if (tn(n[o]) || tn(a[o])) {
      const c = Wr.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      s[c] = n[o];
    }
  return s;
}
class u5 extends T1 {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = S1;
  }
  getBaseTargetFromProps(a, r) {
    return a[r];
  }
  readValueFromInstance(a, r) {
    if (el.has(r)) {
      const s = g1(r);
      return s && s.default || 0;
    }
    return r = R1.has(r) ? r : Mh(r), a.getAttribute(r);
  }
  scrapeMotionValuesFromProps(a, r, s) {
    return _1(a, r, s);
  }
  build(a, r, s) {
    M1(a, r, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(a, r, s, o) {
    o5(a, r, s, o);
  }
  mount(a) {
    this.isSVGTag = A1(a.tagName), super.mount(a);
  }
}
const c5 = _h.length;
function D1(n) {
  if (!n)
    return;
  if (!n.isControllingVariants) {
    const r = n.parent ? D1(n.parent) || {} : {};
    return n.props.initial !== void 0 && (r.initial = n.props.initial), r;
  }
  const a = {};
  for (let r = 0; r < c5; r++) {
    const s = _h[r], o = n.props[s];
    (ds(o) || o === !1) && (a[s] = o);
  }
  return a;
}
function z1(n, a) {
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
const d5 = [...Ah].reverse(), f5 = Ah.length;
function h5(n) {
  return (a) => Promise.all(a.map(({ animation: r, options: s }) => vz(n, r, s)));
}
function m5(n) {
  let a = h5(n), r = G0(), s = !0, o = !1;
  const c = (p) => (b, g) => {
    const S = Ji(n, g, p === "exit" ? n.presenceContext?.custom : void 0);
    if (S) {
      const { transition: w, transitionEnd: j, ...T } = S;
      b = { ...b, ...T, ...j };
    }
    return b;
  };
  function h(p) {
    a = p(n);
  }
  function m(p) {
    const { props: b } = n, g = D1(n.parent) || {}, S = [], w = /* @__PURE__ */ new Set();
    let j = {}, T = 1 / 0;
    for (let C = 0; C < f5; C++) {
      const D = d5[C], z = r[D], k = b[D] !== void 0 ? b[D] : g[D], W = ds(k), G = D === p ? z.isActive : null;
      G === !1 && (T = C);
      let ee = k === g[D] && k !== b[D] && W;
      if (ee && (s || o) && n.manuallyAnimateOnMount && (ee = !1), z.protectedKeys = { ...j }, // If it isn't active and hasn't *just* been set as inactive
      !z.isActive && G === null || // If we didn't and don't have any defined prop for this animation type
      !k && !z.prevProp || // Or if the prop doesn't define an animation
      Cu(k) || typeof k == "boolean")
        continue;
      if (D === "exit" && z.isActive && G !== !0) {
        z.prevResolvedValues && (j = {
          ...j,
          ...z.prevResolvedValues
        });
        continue;
      }
      const R = p5(z.prevProp, k);
      let H = R || // If we're making this variant active, we want to always make it active
      D === p && z.isActive && !ee && W || // If we removed a higher-priority variant (i is in reverse order)
      C > T && W, Z = !1;
      const ue = Array.isArray(k) ? k : [k];
      let oe = ue.reduce(c(D), {});
      G === !1 && (oe = {});
      const { prevResolvedValues: ve = {} } = z, je = {
        ...ve,
        ...oe
      }, le = (q) => {
        H = !0, w.has(q) && (Z = !0, w.delete(q)), z.needsAnimating[q] = !0;
        const Q = n.getValue(q);
        Q && (Q.liveStyle = !1);
      };
      for (const q in je) {
        const Q = oe[q], ae = ve[q];
        if (j.hasOwnProperty(q))
          continue;
        let N = !1;
        Ff(Q) && Ff(ae) ? N = !z1(Q, ae) : N = Q !== ae, N ? Q != null ? le(q) : w.add(q) : Q !== void 0 && w.has(q) ? le(q) : z.protectedKeys[q] = !0;
      }
      z.prevProp = k, z.prevResolvedValues = oe, z.isActive && (j = { ...j, ...oe }), (s || o) && n.blockInitialAnimation && (H = !1);
      const L = ee && R;
      H && (!L || Z) && S.push(...ue.map((q) => {
        const Q = { type: D };
        if (typeof q == "string" && (s || o) && !L && n.manuallyAnimateOnMount && n.parent) {
          const { parent: ae } = n, N = Ji(ae, q);
          if (ae.enteringChildren && N) {
            const { delayChildren: X } = N.transition || {};
            Q.delay = s1(ae.enteringChildren, n, X);
          }
        }
        return {
          animation: q,
          options: Q
        };
      }));
    }
    if (w.size) {
      const C = {};
      if (typeof b.initial != "boolean") {
        const D = Ji(n, Array.isArray(b.initial) ? b.initial[0] : b.initial);
        D && D.transition && (C.transition = D.transition);
      }
      w.forEach((D) => {
        const z = n.getBaseTarget(D), k = n.getValue(D);
        k && (k.liveStyle = !0), C[D] = z ?? null;
      }), S.push({ animation: C });
    }
    let A = !!S.length;
    return s && (b.initial === !1 || b.initial === b.animate) && !n.manuallyAnimateOnMount && (A = !1), s = !1, o = !1, A ? a(S) : Promise.resolve();
  }
  function v(p, b) {
    if (r[p].isActive === b)
      return Promise.resolve();
    n.variantChildren?.forEach((S) => S.animationState?.setActive(p, b)), r[p].isActive = b;
    const g = m(p);
    for (const S in r)
      r[S].protectedKeys = {};
    return g;
  }
  return {
    animateChanges: m,
    setActive: v,
    setAnimateFunction: h,
    getState: () => r,
    reset: () => {
      r = G0(), o = !0;
    }
  };
}
function p5(n, a) {
  return typeof a == "string" ? a !== n : Array.isArray(a) ? !z1(a, n) : !1;
}
function Ii(n = !1) {
  return {
    isActive: n,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function G0() {
  return {
    animate: Ii(!0),
    whileInView: Ii(),
    whileHover: Ii(),
    whileTap: Ii(),
    whileDrag: Ii(),
    whileFocus: Ii(),
    exit: Ii()
  };
}
function X0(n, a, r, s = { passive: !0 }) {
  return n.addEventListener(a, r, s), () => n.removeEventListener(a, r);
}
function g5(n) {
  return tn(n) ? n.get() : n;
}
const Oh = x.createContext({
  transformPagePoint: (n) => n,
  isStatic: !1,
  reducedMotion: "never"
});
function K0(n, a) {
  if (typeof n == "function")
    return n(a);
  n != null && (n.current = a);
}
function v5(...n) {
  return (a) => {
    let r = !1;
    const s = n.map((o) => {
      const c = K0(o, a);
      return !r && typeof c == "function" && (r = !0), c;
    });
    if (r)
      return () => {
        for (let o = 0; o < s.length; o++) {
          const c = s[o];
          typeof c == "function" ? c() : K0(n[o], null);
        }
      };
  };
}
function y5(...n) {
  return x.useCallback(v5(...n), n);
}
class b5 extends x.Component {
  getSnapshotBeforeUpdate(a) {
    const r = this.props.childRef.current;
    if (tu(r) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const s = r.offsetParent, o = tu(s) && s.offsetWidth || 0, c = tu(s) && s.offsetHeight || 0, h = getComputedStyle(r), m = this.props.sizeRef.current;
      m.height = parseFloat(h.height), m.width = parseFloat(h.width), m.top = r.offsetTop, m.left = r.offsetLeft, m.right = o - m.width - m.left, m.bottom = c - m.height - m.top;
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
function x5({ children: n, isPresent: a, anchorX: r, anchorY: s, root: o, pop: c }) {
  const h = x.useId(), m = x.useRef(null), v = x.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: p } = x.useContext(Oh), b = n.props?.ref ?? n?.ref, g = y5(m, b);
  return x.useInsertionEffect(() => {
    const { width: S, height: w, top: j, left: T, right: A, bottom: C } = v.current;
    if (a || c === !1 || !m.current || !S || !w)
      return;
    const D = r === "left" ? `left: ${T}` : `right: ${A}`, z = s === "bottom" ? `bottom: ${C}` : `top: ${j}`;
    m.current.dataset.motionPopId = h;
    const k = document.createElement("style");
    p && (k.nonce = p);
    const W = o ?? document.head;
    return W.appendChild(k), k.sheet && k.sheet.insertRule(`
          [data-motion-pop-id="${h}"] {
            position: absolute !important;
            width: ${S}px !important;
            height: ${w}px !important;
            ${D}px !important;
            ${z}px !important;
          }
        `), () => {
      m.current?.removeAttribute("data-motion-pop-id"), W.contains(k) && W.removeChild(k);
    };
  }, [a]), f.jsx(b5, { isPresent: a, childRef: m, sizeRef: v, pop: c, children: c === !1 ? n : x.cloneElement(n, { ref: g }) });
}
const S5 = ({ children: n, initial: a, isPresent: r, onExitComplete: s, custom: o, presenceAffectsLayout: c, mode: h, anchorX: m, anchorY: v, root: p }) => {
  const b = vh(w5), g = x.useId();
  let S = !0, w = x.useMemo(() => (S = !1, {
    id: g,
    initial: a,
    isPresent: r,
    custom: o,
    onExitComplete: (j) => {
      b.set(j, !0);
      for (const T of b.values())
        if (!T)
          return;
      s && s();
    },
    register: (j) => (b.set(j, !1), () => b.delete(j))
  }), [r, b, s]);
  return c && S && (w = { ...w }), x.useMemo(() => {
    b.forEach((j, T) => b.set(T, !1));
  }, [r]), x.useEffect(() => {
    !r && !b.size && s && s();
  }, [r]), n = f.jsx(x5, { pop: h === "popLayout", isPresent: r, anchorX: m, anchorY: v, root: p, children: n }), f.jsx(Eu.Provider, { value: w, children: n });
};
function w5() {
  return /* @__PURE__ */ new Map();
}
function E5(n = !0) {
  const a = x.useContext(Eu);
  if (a === null)
    return [!0, null];
  const { isPresent: r, onExitComplete: s, register: o } = a, c = x.useId();
  x.useEffect(() => {
    if (n)
      return o(c);
  }, [n]);
  const h = x.useCallback(() => n && s && s(c), [c, s, n]);
  return !r && s ? [!1, h] : [!0];
}
const Go = (n) => n.key || "";
function Q0(n) {
  const a = [];
  return x.Children.forEach(n, (r) => {
    x.isValidElement(r) && a.push(r);
  }), a;
}
const j5 = ({ children: n, custom: a, initial: r = !0, onExitComplete: s, presenceAffectsLayout: o = !0, mode: c = "sync", propagate: h = !1, anchorX: m = "left", anchorY: v = "top", root: p }) => {
  const [b, g] = E5(h), S = x.useMemo(() => Q0(n), [n]), w = h && !b ? [] : S.map(Go), j = x.useRef(!0), T = x.useRef(S), A = vh(() => /* @__PURE__ */ new Map()), C = x.useRef(/* @__PURE__ */ new Set()), [D, z] = x.useState(S), [k, W] = x.useState(S);
  Ex(() => {
    j.current = !1, T.current = S;
    for (let R = 0; R < k.length; R++) {
      const H = Go(k[R]);
      w.includes(H) ? (A.delete(H), C.current.delete(H)) : A.get(H) !== !0 && A.set(H, !1);
    }
  }, [k, w.length, w.join("-")]);
  const G = [];
  if (S !== D) {
    let R = [...S];
    for (let H = 0; H < k.length; H++) {
      const Z = k[H], ue = Go(Z);
      w.includes(ue) || (R.splice(H, 0, Z), G.push(Z));
    }
    return c === "wait" && G.length && (R = G), W(Q0(R)), z(S), null;
  }
  const { forceRender: ee } = x.useContext(wx);
  return f.jsx(f.Fragment, { children: k.map((R) => {
    const H = Go(R), Z = h && !b ? !1 : S === k || w.includes(H), ue = () => {
      if (C.current.has(H))
        return;
      if (A.has(H))
        C.current.add(H), A.set(H, !0);
      else
        return;
      let oe = !0;
      A.forEach((ve) => {
        ve || (oe = !1);
      }), oe && (ee?.(), W(T.current), h && g?.(), s && s());
    };
    return f.jsx(S5, { isPresent: Z, initial: !j.current || r ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: c, root: p, onExitComplete: Z ? void 0 : ue, anchorX: m, anchorY: v, children: R }, H);
  }) });
}, Lh = x.createContext({ strict: !1 }), Z0 = {
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
let P0 = !1;
function T5() {
  if (P0)
    return;
  const n = {};
  for (const a in Z0)
    n[a] = {
      isEnabled: (r) => Z0[a].some((s) => !!r[s])
    };
  j1(n), P0 = !0;
}
function O1() {
  return T5(), Gz();
}
function Qf(n) {
  const a = O1();
  for (const r in n)
    a[r] = {
      ...a[r],
      ...n[r]
    };
  j1(a);
}
function L1({ children: n, features: a, strict: r = !1 }) {
  const [, s] = x.useState(!gf(a)), o = x.useRef(void 0);
  if (!gf(a)) {
    const { renderer: c, ...h } = a;
    o.current = c, Qf(h);
  }
  return x.useEffect(() => {
    gf(a) && a().then(({ renderer: c, ...h }) => {
      Qf(h), o.current = c, s(!0);
    });
  }, []), f.jsx(Lh.Provider, { value: { renderer: o.current, strict: r }, children: n });
}
function gf(n) {
  return typeof n == "function";
}
const C5 = /* @__PURE__ */ new Set([
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
function mu(n) {
  return n.startsWith("while") || n.startsWith("drag") && n !== "draggable" || n.startsWith("layout") || n.startsWith("onTap") || n.startsWith("onPan") || n.startsWith("onLayout") || C5.has(n);
}
let U1 = (n) => !mu(n);
function N5(n) {
  typeof n == "function" && (U1 = (a) => a.startsWith("on") ? !mu(a) : n(a));
}
try {
  N5(require("@emotion/is-prop-valid").default);
} catch {
}
function M5(n, a, r) {
  const s = {};
  for (const o in n)
    o === "values" && typeof n.values == "object" || tn(n[o]) || (U1(o) || r === !0 && mu(o) || !a && !mu(o) || // If trying to use native HTML drag events, forward drag listeners
    n.draggable && o.startsWith("onDrag")) && (s[o] = n[o]);
  return s;
}
const Mu = /* @__PURE__ */ x.createContext({});
function R5(n, a) {
  if (Nu(n)) {
    const { initial: r, animate: s } = n;
    return {
      initial: r === !1 || ds(r) ? r : void 0,
      animate: ds(s) ? s : void 0
    };
  }
  return n.inherit !== !1 ? a : {};
}
function A5(n) {
  const { initial: a, animate: r } = R5(n, x.useContext(Mu));
  return x.useMemo(() => ({ initial: a, animate: r }), [J0(a), J0(r)]);
}
function J0(n) {
  return Array.isArray(n) ? n.join(" ") : n;
}
const Uh = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function V1(n, a, r) {
  for (const s in a)
    !tn(a[s]) && !N1(s, r) && (n[s] = a[s]);
}
function _5({ transformTemplate: n }, a) {
  return x.useMemo(() => {
    const r = Uh();
    return Dh(r, a, n), Object.assign({}, r.vars, r.style);
  }, [a]);
}
function D5(n, a) {
  const r = n.style || {}, s = {};
  return V1(s, r, n), Object.assign(s, _5(n, a)), s;
}
function z5(n, a) {
  const r = {}, s = D5(n, a);
  return n.drag && n.dragListener !== !1 && (r.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = n.drag === !0 ? "none" : `pan-${n.drag === "x" ? "y" : "x"}`), n.tabIndex === void 0 && (n.onTap || n.onTapStart || n.whileTap) && (r.tabIndex = 0), r.style = s, r;
}
const k1 = () => ({
  ...Uh(),
  attrs: {}
});
function O5(n, a, r, s) {
  const o = x.useMemo(() => {
    const c = k1();
    return M1(c, a, A1(s), n.transformTemplate, n.style), {
      ...c.attrs,
      style: { ...c.style }
    };
  }, [a]);
  if (n.style) {
    const c = {};
    V1(c, n.style, n), o.style = { ...c, ...o.style };
  }
  return o;
}
const L5 = [
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
function Vh(n) {
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
      !!(L5.indexOf(n) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(n))
    )
  );
}
function U5(n, a, r, { latestValues: s }, o, c = !1, h) {
  const v = (h ?? Vh(n) ? O5 : z5)(a, s, o, n), p = M5(a, typeof n == "string", c), b = n !== x.Fragment ? { ...p, ...v, ref: r } : {}, { children: g } = a, S = x.useMemo(() => tn(g) ? g.get() : g, [g]);
  return x.createElement(n, {
    ...b,
    children: S
  });
}
function V5({ scrapeMotionValuesFromProps: n, createRenderState: a }, r, s, o) {
  return {
    latestValues: k5(r, s, o, n),
    renderState: a()
  };
}
function k5(n, a, r, s) {
  const o = {}, c = s(n, {});
  for (const S in c)
    o[S] = g5(c[S]);
  let { initial: h, animate: m } = n;
  const v = Nu(n), p = w1(n);
  a && p && !v && n.inherit !== !1 && (h === void 0 && (h = a.initial), m === void 0 && (m = a.animate));
  let b = r ? r.initial === !1 : !1;
  b = b || h === !1;
  const g = b ? m : h;
  if (g && typeof g != "boolean" && !Cu(g)) {
    const S = Array.isArray(g) ? g : [g];
    for (let w = 0; w < S.length; w++) {
      const j = Nh(n, S[w]);
      if (j) {
        const { transitionEnd: T, transition: A, ...C } = j;
        for (const D in C) {
          let z = C[D];
          if (Array.isArray(z)) {
            const k = b ? z.length - 1 : 0;
            z = z[k];
          }
          z !== null && (o[D] = z);
        }
        for (const D in T)
          o[D] = T[D];
      }
    }
  }
  return o;
}
const B1 = (n) => (a, r) => {
  const s = x.useContext(Mu), o = x.useContext(Eu), c = () => V5(n, a, s, o);
  return r ? c() : vh(c);
}, B5 = /* @__PURE__ */ B1({
  scrapeMotionValuesFromProps: zh,
  createRenderState: Uh
}), H5 = /* @__PURE__ */ B1({
  scrapeMotionValuesFromProps: _1,
  createRenderState: k1
}), q5 = Symbol.for("motionComponentSymbol");
function $5(n, a, r) {
  const s = x.useRef(r);
  x.useInsertionEffect(() => {
    s.current = r;
  });
  const o = x.useRef(null);
  return x.useCallback((c) => {
    c && n.onMount?.(c);
    const h = s.current;
    if (typeof h == "function")
      if (c) {
        const m = h(c);
        typeof m == "function" && (o.current = m);
      } else o.current ? (o.current(), o.current = null) : h(c);
    else h && (h.current = c);
    a && (c ? a.mount(c) : a.unmount());
  }, [a]);
}
const Y5 = x.createContext({});
function F5(n) {
  return n && typeof n == "object" && Object.prototype.hasOwnProperty.call(n, "current");
}
function I5(n, a, r, s, o, c) {
  const { visualElement: h } = x.useContext(Mu), m = x.useContext(Lh), v = x.useContext(Eu), p = x.useContext(Oh), b = p.reducedMotion, g = p.skipAnimations, S = x.useRef(null), w = x.useRef(!1);
  s = s || m.renderer, !S.current && s && (S.current = s(n, {
    visualState: a,
    parent: h,
    props: r,
    presenceContext: v,
    blockInitialAnimation: v ? v.initial === !1 : !1,
    reducedMotionConfig: b,
    skipAnimations: g,
    isSVG: c
  }), w.current && S.current && (S.current.manuallyAnimateOnMount = !0));
  const j = S.current, T = x.useContext(Y5);
  j && !j.projection && o && (j.type === "html" || j.type === "svg") && G5(S.current, r, o, T);
  const A = x.useRef(!1);
  x.useInsertionEffect(() => {
    j && A.current && j.update(r, v);
  });
  const C = r[f1], D = x.useRef(!!C && typeof window < "u" && !window.MotionHandoffIsComplete?.(C) && window.MotionHasOptimisedAnimation?.(C));
  return Ex(() => {
    w.current = !0, j && (A.current = !0, window.MotionIsMounted = !0, j.updateFeatures(), j.scheduleRenderMicrotask(), D.current && j.animationState && j.animationState.animateChanges());
  }), x.useEffect(() => {
    j && (!D.current && j.animationState && j.animationState.animateChanges(), D.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(C);
    }), D.current = !1), j.enteringChildren = void 0);
  }), j;
}
function G5(n, a, r, s) {
  const { layoutId: o, layout: c, drag: h, dragConstraints: m, layoutScroll: v, layoutRoot: p, layoutAnchor: b, layoutCrossfade: g } = a;
  n.projection = new r(n.latestValues, a["data-framer-portal-id"] ? void 0 : H1(n.parent)), n.projection.setOptions({
    layoutId: o,
    layout: c,
    alwaysMeasureLayout: !!h || m && F5(m),
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
    crossfade: g,
    layoutScroll: v,
    layoutRoot: p,
    layoutAnchor: b
  });
}
function H1(n) {
  if (n)
    return n.options.allowProjection !== !1 ? n.projection : H1(n.parent);
}
function vf(n, { forwardMotionProps: a = !1, type: r } = {}, s, o) {
  s && Qf(s);
  const c = r ? r === "svg" : Vh(n), h = c ? H5 : B5;
  function m(p, b) {
    let g;
    const S = {
      ...x.useContext(Oh),
      ...p,
      layoutId: X5(p)
    }, { isStatic: w } = S, j = A5(p), T = h(p, w);
    if (!w && typeof window < "u") {
      K5();
      const A = Q5(S);
      g = A.MeasureLayout, j.visualElement = I5(n, T, S, o, A.ProjectionNode, c);
    }
    return f.jsxs(Mu.Provider, { value: j, children: [g && j.visualElement ? f.jsx(g, { visualElement: j.visualElement, ...S }) : null, U5(n, p, $5(T, j.visualElement, b), T, w, a, c)] });
  }
  m.displayName = `motion.${typeof n == "string" ? n : `create(${n.displayName ?? n.name ?? ""})`}`;
  const v = x.forwardRef(m);
  return v[q5] = n, v;
}
function X5({ layoutId: n }) {
  const a = x.useContext(wx).id;
  return a && n !== void 0 ? a + "-" + n : n;
}
function K5(n, a) {
  x.useContext(Lh).strict;
}
function Q5(n) {
  const a = O1(), { drag: r, layout: s } = a;
  if (!r && !s)
    return {};
  const o = { ...r, ...s };
  return {
    MeasureLayout: r?.isEnabled(n) || s?.isEnabled(n) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function Z5(n, a) {
  if (typeof Proxy > "u")
    return vf;
  const r = /* @__PURE__ */ new Map(), s = (c, h) => vf(c, h, n, a), o = (c, h) => s(c, h);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (c, h) => h === "create" ? s : (r.has(h) || r.set(h, vf(h, void 0, n, a)), r.get(h))
  });
}
const q1 = /* @__PURE__ */ Z5(), P5 = (n, a) => a.isSVG ?? Vh(n) ? new u5(a) : new a5(a, {
  allowProjection: n !== x.Fragment
});
class J5 extends tl {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = m5(a));
  }
  updateAnimationControlsSubscription() {
    const { animate: a } = this.node.getProps();
    Cu(a) && (this.unmountControls = a.subscribe(this.node));
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
let W5 = 0;
class eO extends tl {
  constructor() {
    super(...arguments), this.id = W5++, this.isExitComplete = !1;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: a, onExitComplete: r } = this.node.presenceContext, { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || a === s)
      return;
    if (a && s === !1) {
      if (this.isExitComplete) {
        const { initial: c, custom: h } = this.node.getProps();
        if (typeof c == "string") {
          const m = Ji(this.node, c, h);
          if (m) {
            const { transition: v, transitionEnd: p, ...b } = m;
            for (const g in b)
              this.node.getValue(g)?.jump(b[g]);
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
const tO = {
  animation: {
    Feature: J5
  },
  exit: {
    Feature: eO
  }
};
function $1(n) {
  return {
    point: {
      x: n.pageX,
      y: n.pageY
    }
  };
}
function W0(n, a, r) {
  const { props: s } = n;
  n.animationState && s.whileHover && n.animationState.setActive("whileHover", r === "Start");
  const o = "onHover" + r, c = s[o];
  c && Yn.postRender(() => c(a, $1(a)));
}
class nO extends tl {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = Oz(a, (r, s) => (W0(this.node, s, "Start"), (o) => W0(this.node, o, "End"))));
  }
  unmount() {
  }
}
class aO extends tl {
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
    this.unmount = ju(X0(this.node.current, "focus", () => this.onFocus()), X0(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function eb(n, a, r) {
  const { props: s } = n;
  if (n.current instanceof HTMLButtonElement && n.current.disabled)
    return;
  n.animationState && s.whileTap && n.animationState.setActive("whileTap", r === "Start");
  const o = "onTap" + (r === "End" ? "" : r), c = s[o];
  c && Yn.postRender(() => c(a, $1(a)));
}
class iO extends tl {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: r, propagate: s } = this.node.props;
    this.unmount = Bz(a, (o, c) => (eb(this.node, c, "Start"), (h, { success: m }) => eb(this.node, h, m ? "End" : "Cancel")), {
      useGlobalTarget: r,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const Zf = /* @__PURE__ */ new WeakMap(), yf = /* @__PURE__ */ new WeakMap(), rO = (n) => {
  const a = Zf.get(n.target);
  a && a(n);
}, lO = (n) => {
  n.forEach(rO);
};
function sO({ root: n, ...a }) {
  const r = n || document;
  yf.has(r) || yf.set(r, {});
  const s = yf.get(r), o = JSON.stringify(a);
  return s[o] || (s[o] = new IntersectionObserver(lO, { root: n, ...a })), s[o];
}
function oO(n, a, r) {
  const s = sO(a);
  return Zf.set(n, r), s.observe(n), () => {
    Zf.delete(n), s.unobserve(n);
  };
}
const uO = {
  some: 0,
  all: 1
};
class cO extends tl {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: r, margin: s, amount: o = "some", once: c } = a, h = {
      root: r ? r.current : void 0,
      rootMargin: s,
      threshold: typeof o == "number" ? o : uO[o]
    }, m = (v) => {
      const { isIntersecting: p } = v;
      if (this.isInView === p || (this.isInView = p, c && !p && this.hasEnteredView))
        return;
      p && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", p);
      const { onViewportEnter: b, onViewportLeave: g } = this.node.getProps(), S = p ? b : g;
      S && S(v);
    };
    this.stopObserver = oO(this.node.current, h, m);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: r } = this.node;
    ["amount", "margin", "root"].some(dO(a, r)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function dO({ viewport: n = {} }, { viewport: a = {} } = {}) {
  return (r) => n[r] !== a[r];
}
const fO = {
  inView: {
    Feature: cO
  },
  tap: {
    Feature: iO
  },
  focus: {
    Feature: aO
  },
  hover: {
    Feature: nO
  }
}, Y1 = {
  renderer: P5,
  ...tO,
  ...fO
};
var hO = "_1oor31e0", mO = "_1oor31e1", pO = "_1oor31e2", gO = "_1oor31e3", vO = "_1oor31e4", yO = "_1oor31e5", bO = "_1oor31e6", xO = "_1oor31e7", SO = "_1oor31e8";
const wO = 8;
function EO(n) {
  const { entries: a, loading: r, error: s } = n;
  return /* @__PURE__ */ f.jsxs("div", { className: hO, "aria-busy": !!r, children: [
    s && /* @__PURE__ */ f.jsx(Nn, { severity: "error", children: s }),
    r && !s && /* @__PURE__ */ f.jsx("div", { className: SO, "aria-live": "polite", children: "Loading edit history…" }),
    !r && !s && a.length === 0 && /* @__PURE__ */ f.jsx("div", { className: xO, children: "No edits yet" }),
    !r && !s && a.length > 0 && /* @__PURE__ */ f.jsx("ul", { className: mO, children: a.map((o) => /* @__PURE__ */ f.jsxs("li", { className: pO, children: [
      /* @__PURE__ */ f.jsx("span", { className: gO, children: TO(o.recorded_at) }),
      /* @__PURE__ */ f.jsx("span", { className: vO, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ f.jsx("span", { className: yO, title: o.digest_after, children: jO(o.digest_after) }),
      /* @__PURE__ */ f.jsx("span", { className: bO, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function jO(n) {
  return n ? `${n.slice(0, wO)}…` : "—";
}
function TO(n) {
  const a = new Date(n);
  return Number.isNaN(a.getTime()) ? n : a.toLocaleString();
}
var tb = "_1c63kaw0", CO = "_1c63kaw1", NO = "_1c63kaw2", MO = "_1c63kaw3", RO = "_1c63kaw4", AO = "_1c63kaw5", _O = "_1c63kaw6", DO = "_1c63kaw7";
function zO({ chain: n, onRemoveOp: a }) {
  return n.ops.length === 0 ? /* @__PURE__ */ f.jsx("div", { className: tb, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ f.jsx("span", { className: CO, children: "No edits yet" }) }) : /* @__PURE__ */ f.jsx("ol", { className: tb, "data-testid": "edit-chain-list", children: n.ops.map((r, s) => /* @__PURE__ */ f.jsxs("li", { className: NO, children: [
    /* @__PURE__ */ f.jsxs("span", { className: MO, "aria-hidden": "true", children: [
      s + 1,
      "."
    ] }),
    /* @__PURE__ */ f.jsxs("span", { className: RO, children: [
      /* @__PURE__ */ f.jsx("span", { className: AO, children: nb(r) }),
      /* @__PURE__ */ f.jsx("span", { className: _O, children: OO(r) })
    ] }),
    /* @__PURE__ */ f.jsx(
      "button",
      {
        type: "button",
        className: DO,
        onClick: () => a(r.id),
        "aria-label": `Remove ${nb(r)} (position ${s + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, r.id)) });
}
function nb(n) {
  switch (n.mode) {
    case "trim":
      return "Trim";
    case "crop":
      return "Crop";
    case "normalize":
      return "Normalize";
    case "speed":
      return "Speed";
    case "fade_in":
      return "Fade in";
    case "fade_out":
      return "Fade out";
    case "mute":
      return "Mute";
    case "gain":
      return "Volume";
    case "eq3":
      return "EQ";
    case "pitch_shift":
      return "Pitch";
    case "silence_strip":
      return "Silence trim";
  }
}
function OO(n) {
  switch (n.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${ab(n.start_ms)} → ${ab(n.end_ms)}`;
    case "normalize":
      return `${n.target_lufs.toFixed(1)} LUFS`;
    case "speed":
      return `${n.factor.toFixed(2)}×`;
    case "fade_in":
      return `${n.duration_ms} ms in`;
    case "fade_out":
      return `${n.duration_ms} ms out`;
    case "gain":
      return `${n.gain_db >= 0 ? "+" : ""}${n.gain_db.toFixed(1)} dB`;
    case "eq3":
      return `${bf(n.low_db)} / ${bf(n.mid_db)} / ${bf(n.high_db)}`;
    case "pitch_shift":
      return `${n.semitones >= 0 ? "+" : ""}${n.semitones.toFixed(1)} st`;
    case "silence_strip":
      return `${n.threshold_db.toFixed(0)} dB`;
  }
}
function bf(n) {
  return `${n >= 0 ? "+" : ""}${n.toFixed(0)}`;
}
function ab(n) {
  return !Number.isFinite(n) || n < 0 ? "0.00s" : `${(n / 1e3).toFixed(2)}s`;
}
var Xo = "_1o3ytop0", ib = "_1o3ytop1", LO = "_1o3ytop2", Ko = "_1o3ytop3", UO = "_1o3ytop4", VO = "_1o3ytopa", kO = "_1o3ytopb", BO = "_1o3ytopc", HO = "_1o3ytopd", qO = "_1o3ytope", $O = "_1o3ytopf";
const rb = -16;
function YO(n) {
  const { voiceAsset: a, deploymentId: r, onChainPersisted: s, onError: o } = n, c = a.durationMs ?? 0, h = x.useMemo(
    () => FO(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [m, v] = x.useState(() => xf(c)), [p, b] = x.useState(wu), [g, S] = x.useState(!1), [w, j] = x.useState(null), [T, A] = x.useState(null), [C, D] = x.useState(!1), [z, k] = x.useState(!1), [W, G] = x.useState(!1), [ee, R] = x.useState(null), [H, Z] = x.useState([]), [ue, oe] = x.useState(null), [ve, je] = x.useState([]), [le, L] = x.useState(!1), [U, q] = x.useState(null), [Q, ae] = x.useState(0), N = x.useRef(null), X = x.useRef(null), P = x.useRef(null), ie = x.useRef(null), fe = x.useRef(null), ye = x.useRef(0), Me = x.useMemo(
    () => m.ops.some((he) => he.mode === "normalize"),
    [m.ops]
  );
  x.useEffect(() => {
    const he = xf(c);
    v(he), b(ux(he)), j(null), G(!1), Z([]), oe(null), fe.current = null;
  }, [a.voiceAssetId, c]);
  const Ae = x.useCallback((he) => {
    b(he), v((Le) => ox(Le, he));
  }, []);
  x.useEffect(() => {
    ie.current?.abort();
    const he = new AbortController();
    return ie.current = he, L(!0), q(null), Cf(r, "voice_asset", a.voiceAssetId, 50, {
      signal: he.signal
    }).then((Le) => {
      he.signal.aborted || je(Le.entries);
    }).catch((Le) => {
      if (he.signal.aborted) return;
      const Be = Le instanceof Error ? Le.message : "audit fetch failed";
      q(Be);
    }).finally(() => {
      he.signal.aborted || L(!1);
    }), () => he.abort();
  }, [r, a.voiceAssetId, Q]), x.useEffect(() => () => {
    T && URL.revokeObjectURL(T);
  }, [T]), x.useEffect(() => () => {
    X.current?.abort(), P.current?.abort(), ie.current?.abort();
  }, []);
  const se = m.ops.find((he) => he.mode === "trim"), De = m.ops.find((he) => he.mode === "normalize"), Oe = se?.start_ms ?? 0, _e = se?.end_ms ?? Math.max(1, c), We = x.useCallback((he, Le) => {
    v(
      (Be) => lb(
        Be,
        "trim",
        (ht) => ({
          ...ht,
          mode: "trim",
          start_ms: Math.max(0, Math.floor(he)),
          end_ms: Math.max(Math.floor(he) + 1, Math.floor(Le))
        })
      )
    );
  }, []), ft = x.useCallback(
    (he) => We(he, _e),
    [_e, We]
  ), Mn = x.useCallback(
    (he) => We(Oe, he),
    [Oe, We]
  ), ta = x.useCallback((he) => {
    v((Le) => {
      const Be = Le.ops.filter((ht) => ht.mode !== "normalize");
      if (he) {
        const ht = {
          id: pn(),
          mode: "normalize",
          target_lufs: rb
        };
        return { ...Le, ops: [...Be, ht] };
      }
      return { ...Le, ops: Be };
    });
  }, []), Ft = x.useCallback(
    (he) => {
      const Le = m.ops.findIndex((nn) => nn.id === he);
      if (Le === -1) return;
      const Be = m.ops[Le];
      if (!Be) return;
      const ht = [...m.ops.slice(0, Le), ...m.ops.slice(Le + 1)];
      v({ ...m, ops: ht }), Z((nn) => [...nn, { op: Be, index: Le }]);
    },
    [m]
  ), ha = x.useCallback(() => {
    const he = H[H.length - 1];
    if (!he) return;
    const Le = Math.min(he.index, m.ops.length), Be = [...m.ops.slice(0, Le), he.op, ...m.ops.slice(Le)];
    v({ ...m, ops: Be }), Z(H.slice(0, -1));
  }, [m, H]), Mt = x.useCallback(() => {
    const he = Xb(m, c);
    return he ? (j(he.message), !1) : (j(null), !0);
  }, [m, c]), na = x.useCallback(async () => {
    if (!Mt() || C) return;
    X.current?.abort();
    const he = new AbortController();
    X.current = he;
    const Le = ++ye.current;
    k(!0);
    try {
      const Be = await qC(a.voiceAssetId, r, m, {
        signal: he.signal
      });
      if (he.signal.aborted || Le !== ye.current) return;
      T && URL.revokeObjectURL(T);
      const ht = URL.createObjectURL(Be);
      A(ht), G(!0), requestAnimationFrame(() => N.current?.play().catch(() => {
      }));
    } catch (Be) {
      if (he.signal.aborted) return;
      const ht = Be instanceof Error ? Be.message : "preview failed";
      j(ht), o(ht);
    } finally {
      he.signal.aborted || k(!1);
    }
  }, [Mt, C, a.voiceAssetId, r, m, T, o]), ma = x.useCallback(async () => {
    if (!Mt() || z || C) return;
    X.current?.abort(), P.current?.abort();
    const he = new AbortController();
    P.current = he, D(!0);
    try {
      const Le = fe.current ?? void 0, Be = await kC(
        a.voiceAssetId,
        r,
        Le ? { chain: m, digest_before: Le } : { chain: m },
        { signal: he.signal }
      );
      if (he.signal.aborted) return;
      fe.current = Be.chain_digest, oe(Be.chain_digest), j(null), R(Be.measured_lufs ?? null), Z([]), s(Be), ae((ht) => ht + 1);
    } catch (Le) {
      if (he.signal.aborted) return;
      const Be = Le instanceof Gr;
      Le instanceof Gr && (fe.current = Le.currentDigest || null);
      const ht = Be ? "Edit chain has changed in another tab. Reload to continue." : Le instanceof Error ? Le.message : "apply failed";
      j(ht), o(ht);
    } finally {
      he.signal.aborted || D(!1);
    }
  }, [
    Mt,
    z,
    C,
    a.voiceAssetId,
    r,
    m,
    s,
    o
  ]), Vt = x.useCallback(() => {
    X.current?.abort(), v(xf(c)), j(null), R(null), G(!1), Z([]), ae((he) => he + 1), T && (URL.revokeObjectURL(T), A(null));
  }, [c, T]), Rn = x.useCallback((he) => {
    v(
      (Le) => lb(
        Le,
        "normalize",
        (Be) => ({
          ...Be,
          mode: "normalize",
          target_lufs: he
        })
      )
    );
  }, []);
  return /* @__PURE__ */ f.jsxs(bx, { variant: "standalone", children: [
    /* @__PURE__ */ f.jsx(
      xx,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${Qo(c)}`
      }
    ),
    /* @__PURE__ */ f.jsx(
      vx,
      {
        audioUrl: h,
        durationMs: Math.max(1, c),
        startMs: Oe,
        endMs: _e,
        onChangeStart: ft,
        onChangeEnd: Mn
      }
    ),
    /* @__PURE__ */ f.jsxs("div", { className: Xo, children: [
      /* @__PURE__ */ f.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ f.jsxs("span", { className: ib, children: [
        Qo(Oe),
        " → ",
        Qo(_e),
        " · ",
        Qo(_e - Oe)
      ] })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: LO, children: [
      /* @__PURE__ */ f.jsxs("div", { className: Ko, children: [
        /* @__PURE__ */ f.jsxs("span", { className: Xo, children: [
          /* @__PURE__ */ f.jsx("span", { children: "Normalize loudness" }),
          Me && De && /* @__PURE__ */ f.jsxs("span", { className: VO, children: [
            "target ",
            De.target_lufs.toFixed(1),
            " LUFS",
            ee !== null && ` · measured ${ee.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ f.jsxs("label", { className: UO, children: [
          /* @__PURE__ */ f.jsx(
            "input",
            {
              type: "checkbox",
              checked: Me,
              onChange: (he) => ta(he.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ f.jsxs("span", { children: [
            "Target ",
            rb.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        Me && De && /* @__PURE__ */ f.jsx(
          "input",
          {
            type: "range",
            className: BO,
            min: -30,
            max: -6,
            step: 0.5,
            value: De.target_lufs,
            onChange: (he) => Rn(Number(he.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: Ko, children: [
        /* @__PURE__ */ f.jsxs("span", { className: Xo, children: [
          "Operations · ",
          m.ops.length
        ] }),
        /* @__PURE__ */ f.jsx(zO, { chain: m, onRemoveOp: Ft })
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: Ko, children: [
        /* @__PURE__ */ f.jsxs(
          "button",
          {
            type: "button",
            onClick: () => S((he) => !he),
            style: {
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: 0,
              textAlign: "left",
              color: "var(--accent)",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.18em"
            },
            "aria-expanded": g,
            children: [
              g ? "▾" : "▸",
              " Advanced effects · gain · eq · pitch · fade · silence trim"
            ]
          }
        ),
        g && /* @__PURE__ */ f.jsx(
          gh,
          {
            state: p,
            onChange: Ae,
            supportsSynthSpeed: !1
          }
        )
      ] }),
      ue && /* @__PURE__ */ f.jsx("div", { className: Ko, children: /* @__PURE__ */ f.jsxs("span", { className: Xo, children: [
        /* @__PURE__ */ f.jsx("span", { children: "Chain digest" }),
        /* @__PURE__ */ f.jsxs(
          "span",
          {
            className: ib,
            style: { color: "var(--secondary)" },
            title: ue,
            children: [
              ue.slice(0, 12),
              "…"
            ]
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ f.jsxs(Sx, { children: [
      /* @__PURE__ */ f.jsx(
        Je,
        {
          variant: "secondary",
          onClick: () => void na(),
          disabled: z || C,
          children: z ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ f.jsx(
        Je,
        {
          onClick: () => void ma(),
          disabled: C || z,
          children: C ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ f.jsx(
        Je,
        {
          variant: "ghost",
          onClick: Vt,
          disabled: C || z,
          children: "Reset"
        }
      ),
      H.length > 0 && /* @__PURE__ */ f.jsxs(
        Je,
        {
          variant: "ghost",
          size: "sm",
          onClick: ha,
          disabled: C || z,
          "data-testid": "undo-last-removal",
          "aria-label": "Undo last removal",
          children: [
            "Undo last removal (",
            H.length,
            ")"
          ]
        }
      ),
      W && /* @__PURE__ */ f.jsx(
        "span",
        {
          className: $O,
          "data-testid": "preview-consumed-hint",
          role: "note",
          "aria-live": "polite",
          children: "Preview again after edits to verify before applying"
        }
      )
    ] }),
    T && // biome-ignore lint/a11y/useMediaCaption: synthesised speech preview, no captions track
    /* @__PURE__ */ f.jsx(
      "audio",
      {
        ref: N,
        src: T,
        controls: !0,
        className: kO,
        "aria-label": "Edit preview"
      }
    ),
    w && /* @__PURE__ */ f.jsx(Nn, { severity: "error", children: w }),
    /* @__PURE__ */ f.jsxs("details", { className: HO, children: [
      /* @__PURE__ */ f.jsxs("summary", { className: qO, children: [
        "Edit history",
        ve.length > 0 ? ` · ${ve.length}` : ""
      ] }),
      /* @__PURE__ */ f.jsx(
        EO,
        {
          entries: ve,
          loading: le,
          error: U
        }
      )
    ] })
  ] });
}
function xf(n) {
  return n <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: pn(),
    mode: "trim",
    start_ms: 0,
    end_ms: n
  }] };
}
function lb(n, a, r) {
  const s = n.ops.findIndex((c) => c.mode === a);
  if (s === -1) {
    const c = { id: pn(), mode: a };
    return { ...n, ops: [...n.ops, r(c)] };
  }
  const o = [...n.ops];
  return o[s] = r(o[s]), { ...n, ops: o };
}
function Qo(n) {
  return !Number.isFinite(n) || n < 0 ? "0.0s" : n < 1e3 ? `${Math.round(n)} ms` : `${(Math.round(n / 100) / 10).toFixed(1)}s`;
}
function FO(n) {
  return n.startsWith("http://") || n.startsWith("https://") || n.startsWith("/") ? n : `/api/v1/artifacts/${encodeURIComponent(n)}`;
}
var IO = "go9vi12", GO = "go9vi13", XO = "go9vi14", KO = "go9vi15", QO = "go9vi16", ZO = "go9vi17", PO = "go9vi18", JO = "go9vi19", WO = "go9vi1a go9vi19", e4 = "go9vi1b", t4 = "go9vi1c", n4 = "go9vi1d", a4 = "go9vi1e", i4 = "go9vi1f", r4 = "go9vi1g", l4 = "go9vi1h", s4 = "go9vi1i", Gi = "go9vi1j", Pl = "go9vi1k", Yr = "go9vi1l", o4 = "go9vi1m go9vi1l", u4 = "go9vi1n", c4 = "go9vi1o go9vi1n", d4 = "go9vi1p go9vi1n", f4 = "go9vi1q", h4 = "go9vi1r", m4 = "go9vi1s", p4 = "go9vi1t", F1 = "go9vi1u", g4 = "go9vi1v", v4 = "go9vi1w", y4 = "go9vi1x go9vi1l", b4 = "go9vi1y", x4 = "go9vi1z", S4 = "go9vi110", w4 = "go9vi111", E4 = "go9vi112", j4 = "go9vi113";
const T4 = ["none", "audio_ref", "vector_preset", "qwen_template"];
function C4() {
  const { deployment: n, mappings: a, voiceAssets: r } = gs(), [s, o] = x.useState(a), [c, h] = x.useState(r), [m, v] = x.useState(
    a[0]?.mappingId ?? null
  ), [p, b] = x.useState(""), [g, S] = x.useState(null), [w, j] = x.useState(null), [T, A] = x.useState(null), C = x.useMemo(() => {
    const U = /* @__PURE__ */ new Map();
    for (const q of c) U.set(q.voiceAssetId, q);
    return U;
  }, [c]), D = x.useMemo(() => {
    const U = p.trim().toLowerCase();
    return U ? s.filter((q) => q.characterName.toLowerCase().includes(U)) : s;
  }, [s, p]), z = x.useMemo(
    () => s.find((U) => U.mappingId === m) ?? null,
    [s, m]
  );
  x.useEffect(() => {
    o(a), h(r), v(a[0]?.mappingId ?? null);
  }, [a, r]), x.useEffect(() => {
    if (!w) return;
    const U = setTimeout(() => j(null), 2600);
    return () => clearTimeout(U);
  }, [w]);
  const k = x.useCallback(async () => {
    const U = await ss(n.deploymentId);
    h(U.voiceAssets);
  }, [n.deploymentId]), W = x.useCallback(
    (U) => {
      o(
        (q) => q.map((Q) => Q.mappingId === m ? { ...Q, ...U } : Q)
      );
    },
    [m]
  ), G = x.useCallback(
    async (U) => {
      if (!z) return;
      const q = z;
      try {
        const Q = await ru(n.deploymentId, z.mappingId, U);
        o((ae) => ae.map((N) => N.mappingId === Q.mappingId ? Q : N));
      } catch (Q) {
        o(
          (ae) => ae.map((N) => N.mappingId === q.mappingId ? q : N)
        ), S(hi(Q));
      }
    },
    [z, n.deploymentId]
  ), ee = x.useCallback(async () => {
    const U = c[0];
    if (!U) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const q = D4(s), Q = await fh(n.deploymentId, {
        characterName: q,
        speakerVoiceAssetId: U.voiceAssetId,
        defaultEmotionMode: "none"
      });
      o((ae) => [...ae, Q]), v(Q.mappingId);
    } catch (q) {
      S(hi(q));
    }
  }, [n.deploymentId, c, s]), R = x.useCallback(() => {
    z && A({ id: z.mappingId, name: z.characterName });
  }, [z]), H = x.useCallback(async () => {
    if (!T) return;
    const { id: U, name: q } = T;
    A(null);
    try {
      await Fb(n.deploymentId, U), o((Q) => Q.filter((ae) => ae.mappingId !== U)), v(null), j(`Mapping for ${q} deactivated.`);
    } catch (Q) {
      S(hi(Q));
    }
  }, [n.deploymentId, T]), Z = x.useCallback(
    async (U, q, Q) => {
      try {
        const ae = await Gb(n.deploymentId, U, q, Q);
        return h((N) => [ae, ...N]), j(`${ae.displayName} uploaded.`), ae;
      } catch (ae) {
        return S(hi(ae)), null;
      }
    },
    [n.deploymentId]
  ), ue = x.useCallback(async () => {
    try {
      const U = await _T(n.deploymentId);
      k4(U, `${n.deploymentId}-mappings.json`), j("Mappings exported to JSON.");
    } catch (U) {
      S(hi(U));
    }
  }, [n.deploymentId]), oe = x.useCallback(
    async (U, q) => {
      try {
        const Q = await DT(
          n.deploymentId,
          U.mappings,
          q
        );
        j(
          `Imported ${Q.created.length} • skipped ${Q.skipped.length} • replaced ${Q.replaced.length}.`
        );
        const ae = await ss(n.deploymentId);
        h(ae.voiceAssets);
      } catch (Q) {
        S(hi(Q));
      }
    },
    [n.deploymentId]
  ), ve = x.useCallback(
    async (U) => {
      if (await k(), z && U.chain_digest)
        try {
          const q = await ru(n.deploymentId, z.mappingId, {
            voiceAssetChainDigest: U.chain_digest
          });
          o(
            (Q) => Q.map((ae) => ae.mappingId === q.mappingId ? q : ae)
          );
        } catch (q) {
          S(hi(q));
        }
      j("Edit applied.");
    },
    [k, z, n.deploymentId]
  ), je = x.useCallback((U) => {
    S(U);
  }, []), le = x.useCallback(
    async (U, q) => {
      if (!z) return null;
      const Q = U.trim() || `[${z.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await UT(n.deploymentId, {
          line: Q,
          outputFormat: q
        })).runId };
      } catch (ae) {
        return S(hi(ae)), null;
      }
    },
    [n.deploymentId, z]
  ), L = c.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ f.jsxs("div", { className: IO, children: [
    /* @__PURE__ */ f.jsxs("aside", { className: GO, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ f.jsxs("header", { className: XO, children: [
        /* @__PURE__ */ f.jsxs("div", { children: [
          /* @__PURE__ */ f.jsx("h1", { id: "mapping-sidebar-heading", className: KO, children: "Cast" }),
          /* @__PURE__ */ f.jsxs("span", { className: QO, children: [
            s.length,
            " active · ",
            c.length,
            " ",
            L
          ] })
        ] }),
        /* @__PURE__ */ f.jsx(Je, { variant: "primary", size: "sm", onClick: ee, children: "+ Add" })
      ] }),
      /* @__PURE__ */ f.jsx(
        "input",
        {
          type: "search",
          className: ZO,
          placeholder: "Search characters",
          value: p,
          onChange: (U) => b(U.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ f.jsx(_4, { onExport: ue, onImport: oe, onParseError: S }),
      /* @__PURE__ */ f.jsx("div", { className: PO, children: D.length === 0 ? /* @__PURE__ */ f.jsx(
        vs,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : D.map((U) => {
        const q = C.get(U.speakerVoiceAssetId), Q = U.mappingId === m;
        return /* @__PURE__ */ f.jsxs(
          "button",
          {
            type: "button",
            className: Q ? WO : JO,
            onClick: () => v(U.mappingId),
            "aria-pressed": Q,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ f.jsx("span", { className: e4, "aria-hidden": "true", children: z4(U.characterName) }),
              /* @__PURE__ */ f.jsxs("span", { className: t4, children: [
                /* @__PURE__ */ f.jsx("span", { className: n4, children: U.characterName }),
                /* @__PURE__ */ f.jsxs("span", { className: a4, children: [
                  U.defaultEmotionMode,
                  " · ",
                  q?.displayName ?? "no voice"
                ] })
              ] })
            ]
          },
          U.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ f.jsxs("section", { className: i4, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ f.jsx(L1, { features: Y1, children: /* @__PURE__ */ f.jsx(j5, { children: w && /* @__PURE__ */ f.jsx(
        q1.div,
        {
          className: g4,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: w
        },
        w
      ) }) }),
      g && /* @__PURE__ */ f.jsx(Nn, { severity: "error", children: g }),
      T && /* @__PURE__ */ f.jsxs(Nn, { severity: "warning", children: [
        /* @__PURE__ */ f.jsxs("span", { style: { flex: 1 }, children: [
          "Deactivate mapping for ",
          T.name,
          "?"
        ] }),
        /* @__PURE__ */ f.jsx(Je, { variant: "danger", size: "sm", onClick: () => void H(), children: "Delete" }),
        /* @__PURE__ */ f.jsx(Je, { variant: "ghost", size: "sm", onClick: () => A(null), children: "Cancel" })
      ] }),
      z ? /* @__PURE__ */ f.jsx(
        M4,
        {
          deploymentId: n.deploymentId,
          mapping: z,
          voiceAssets: c,
          onNameChange: (U) => {
            W({ characterName: U });
          },
          onNameBlur: (U) => {
            U !== z.characterName && U.trim() && G({ characterName: U.trim() });
          },
          onSpeakerChange: (U) => {
            W({ speakerVoiceAssetId: U }), G({ speakerVoiceAssetId: U });
          },
          onModeChange: (U) => {
            W({ defaultEmotionMode: U }), G({ defaultEmotionMode: U });
          },
          onQwenChange: (U) => {
            W({ defaultQwenTemplate: U });
          },
          onQwenBlur: (U) => {
            G({ defaultQwenTemplate: U });
          },
          onSpeedChange: (U) => {
            W({ defaultSpeedFactor: U });
          },
          onSpeedCommit: (U) => {
            G({ defaultSpeedFactor: U });
          },
          onEmotionVoiceChange: (U) => {
            const q = U || null;
            W({ defaultEmotionVoiceAssetId: q }), G({ defaultEmotionVoiceAssetId: q });
          },
          onDelete: R,
          onUploadVoice: async (U, q, Q) => {
            const ae = await Z(U, q, Q);
            return ae && Q === "speaker" && (W({ speakerVoiceAssetId: ae.voiceAssetId }), G({ speakerVoiceAssetId: ae.voiceAssetId })), await k(), ae;
          },
          onTestLine: le,
          onEditChainPersisted: ve,
          onEditError: je
        },
        z.mappingId
      ) : /* @__PURE__ */ f.jsx(
        N4,
        {
          voiceCount: c.length,
          onUploadVoice: async (U) => {
            await Z(U, U.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function N4({ voiceCount: n, onUploadVoice: a }) {
  return n === 0 ? /* @__PURE__ */ f.jsxs(Ua, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ f.jsxs("div", { className: S4, children: [
      /* @__PURE__ */ f.jsx("p", { className: Zi, children: "01 / Onboarding" }),
      /* @__PURE__ */ f.jsx("h2", { id: "onboarding-heading", className: w4, children: "Upload your first voice" }),
      /* @__PURE__ */ f.jsxs("p", { className: E4, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ f.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ f.jsx(
      I1,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (r) => (await a(r), null)
      }
    )
  ] }) : /* @__PURE__ */ f.jsx(Ua, { density: "airy", children: /* @__PURE__ */ f.jsx(
    vs,
    {
      title: "No character selected.",
      hint: "Pick one on the left or + Add"
    }
  ) });
}
function M4(n) {
  const { mapping: a, voiceAssets: r } = n, s = r.find((T) => T.voiceAssetId === a.speakerVoiceAssetId) ?? null, o = r.find((T) => T.voiceAssetId === a.defaultEmotionVoiceAssetId) ?? null, [c, h] = x.useState(""), [m, v] = x.useState("mp3"), [p, b] = x.useState("idle"), [g, S] = x.useState(null), w = x.useRef(!1);
  x.useEffect(() => (w.current = !1, () => {
    w.current = !0;
  }), []);
  const j = x.useCallback(async () => {
    w.current = !1, b("running"), S(null);
    const T = await n.onTestLine(c, m);
    if (w.current) return;
    if (!T) {
      b("error"), S("Failed to enqueue test-line run.");
      return;
    }
    const { runId: A } = T;
    for (let C = 0; C < 60; C += 1) {
      if (await new Promise((D) => setTimeout(D, 500)), w.current) return;
      try {
        const D = await hh(n.deploymentId, A);
        if (w.current) return;
        if (D.status === "completed") {
          b("done");
          return;
        }
        if (D.status === "failed" || D.status === "cancelled") {
          b("error"), S(`Run ${D.status}.`);
          return;
        }
      } catch (D) {
        if (w.current) return;
        b("error"), S(D instanceof Error ? D.message : "unknown error");
        return;
      }
    }
    w.current || (b("error"), S("test-line timed out after 30s"));
  }, [n.onTestLine, n.deploymentId, c, m]);
  return /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
    /* @__PURE__ */ f.jsxs("header", { className: r4, children: [
      /* @__PURE__ */ f.jsxs("div", { children: [
        /* @__PURE__ */ f.jsx("p", { className: Zi, children: "Character" }),
        /* @__PURE__ */ f.jsx("h2", { className: l4, children: a.characterName })
      ] }),
      /* @__PURE__ */ f.jsx("div", { className: F1, children: /* @__PURE__ */ f.jsx(Je, { variant: "danger", size: "sm", onClick: n.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ f.jsxs(
      Ua,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: v4,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ f.jsx(
            "input",
            {
              type: "text",
              className: y4,
              placeholder: `[${a.characterName}] This is a test of the voice.`,
              value: c,
              onChange: (T) => h(T.currentTarget.value),
              "aria-label": "Test-line text",
              disabled: p === "running"
            }
          ),
          /* @__PURE__ */ f.jsxs(
            "select",
            {
              className: Yr,
              value: m,
              onChange: (T) => v(T.currentTarget.value),
              "aria-label": "Test-line output format",
              disabled: p === "running",
              children: [
                /* @__PURE__ */ f.jsx("option", { value: "mp3", children: "mp3" }),
                /* @__PURE__ */ f.jsx("option", { value: "wav", children: "wav" }),
                /* @__PURE__ */ f.jsx("option", { value: "flac", children: "flac" })
              ]
            }
          ),
          /* @__PURE__ */ f.jsx(
            Je,
            {
              variant: "primary",
              size: "sm",
              onClick: () => void j(),
              disabled: p === "running",
              children: p === "running" ? "Synthesising…" : "Test this line"
            }
          ),
          p === "done" && /* @__PURE__ */ f.jsx(xi, { tone: "success", children: "Synthesised — see host logs for output path." }),
          p === "error" && g && /* @__PURE__ */ f.jsx(xi, { tone: "danger", children: g })
        ]
      }
    ),
    /* @__PURE__ */ f.jsxs("div", { className: s4, children: [
      /* @__PURE__ */ f.jsxs(Ua, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ f.jsx("h3", { id: "identity-heading", className: Zi, children: "01 / Identity & Performance" }),
        /* @__PURE__ */ f.jsxs("label", { className: Pl, children: [
          /* @__PURE__ */ f.jsx("span", { className: Gi, children: "Character name" }),
          /* @__PURE__ */ f.jsx(
            "input",
            {
              className: Yr,
              value: a.characterName,
              onChange: (T) => n.onNameChange(T.currentTarget.value),
              onBlur: (T) => n.onNameBlur(T.currentTarget.value)
            }
          )
        ] }),
        /* @__PURE__ */ f.jsxs("label", { className: Pl, children: [
          /* @__PURE__ */ f.jsx("span", { className: Gi, children: "Emotion mode" }),
          /* @__PURE__ */ f.jsx(
            "select",
            {
              className: Yr,
              value: a.defaultEmotionMode,
              onChange: (T) => n.onModeChange(T.currentTarget.value),
              children: T4.map((T) => /* @__PURE__ */ f.jsx("option", { value: T, children: O4(T) }, T))
            }
          )
        ] }),
        a.defaultEmotionMode === "qwen_template" && /* @__PURE__ */ f.jsxs("label", { className: Pl, children: [
          /* @__PURE__ */ f.jsxs("span", { className: Gi, children: [
            "Qwen template (use ",
            "{seg}",
            " for the line text)"
          ] }),
          /* @__PURE__ */ f.jsx(
            "textarea",
            {
              className: o4,
              value: a.defaultQwenTemplate ?? "",
              onChange: (T) => n.onQwenChange(T.currentTarget.value),
              onBlur: (T) => n.onQwenBlur(T.currentTarget.value)
            }
          )
        ] }),
        a.defaultEmotionMode === "audio_ref" && /* @__PURE__ */ f.jsxs("label", { className: Pl, children: [
          /* @__PURE__ */ f.jsx("span", { className: Gi, children: "Emotion reference" }),
          /* @__PURE__ */ f.jsxs(
            "select",
            {
              className: Yr,
              value: a.defaultEmotionVoiceAssetId ?? "",
              onChange: (T) => n.onEmotionVoiceChange(T.currentTarget.value),
              children: [
                /* @__PURE__ */ f.jsx("option", { value: "", children: "— none —" }),
                r.map((T) => /* @__PURE__ */ f.jsxs("option", { value: T.voiceAssetId, children: [
                  T.displayName,
                  " · ",
                  T.kind
                ] }, T.voiceAssetId))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ f.jsxs("label", { className: Pl, children: [
          /* @__PURE__ */ f.jsxs("span", { className: Gi, children: [
            "Speed · ",
            a.defaultSpeedFactor?.toFixed(2) ?? "—",
            "×"
          ] }),
          /* @__PURE__ */ f.jsx(
            "input",
            {
              type: "range",
              min: 0.5,
              max: 2,
              step: 0.05,
              value: a.defaultSpeedFactor ?? 1,
              onChange: (T) => n.onSpeedChange(Number(T.currentTarget.value)),
              onMouseUp: (T) => n.onSpeedCommit(Number(T.currentTarget.value)),
              onTouchEnd: (T) => n.onSpeedCommit(Number(T.currentTarget.value))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ f.jsxs(Ua, { density: "comfortable", "aria-labelledby": "voice-heading", children: [
        /* @__PURE__ */ f.jsx("h3", { id: "voice-heading", className: Zi, children: "02 / Voice Reference" }),
        /* @__PURE__ */ f.jsx("span", { className: Gi, children: "Speaker reference" }),
        /* @__PURE__ */ f.jsx(
          R4,
          {
            value: a.speakerVoiceAssetId,
            voices: r,
            onChange: n.onSpeakerChange
          }
        ),
        s && /* @__PURE__ */ f.jsx(sb, { voice: s }),
        /* @__PURE__ */ f.jsx(
          I1,
          {
            label: s ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (T) => n.onUploadVoice(T, T.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        s && /* @__PURE__ */ f.jsx(
          YO,
          {
            voiceAsset: s,
            deploymentId: n.deploymentId,
            onChainPersisted: n.onEditChainPersisted,
            onError: n.onEditError
          }
        ),
        o && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
          /* @__PURE__ */ f.jsx("span", { className: Gi, children: "Emotion reference voice" }),
          /* @__PURE__ */ f.jsx(sb, { voice: o })
        ] })
      ] })
    ] })
  ] });
}
function R4({
  value: n,
  voices: a,
  onChange: r
}) {
  return /* @__PURE__ */ f.jsxs(
    "select",
    {
      className: Yr,
      value: n,
      onChange: (s) => r(s.currentTarget.value),
      "aria-label": "Speaker reference voice",
      children: [
        a.length === 0 && /* @__PURE__ */ f.jsx("option", { value: "", children: "— upload a voice first —" }),
        a.map((s) => /* @__PURE__ */ f.jsx("option", { value: s.voiceAssetId, children: s.displayName }, s.voiceAssetId))
      ]
    }
  );
}
function sb({ voice: n }) {
  const a = L4(n.durationMs ?? null);
  return /* @__PURE__ */ f.jsxs("div", { children: [
    /* @__PURE__ */ f.jsxs("div", { className: f4, children: [
      /* @__PURE__ */ f.jsx("span", { children: n.displayName }),
      /* @__PURE__ */ f.jsx("span", { children: n.kind }),
      n.durationMs != null && /* @__PURE__ */ f.jsx("span", { children: U4(n.durationMs) }),
      n.sampleRate && /* @__PURE__ */ f.jsxs("span", { children: [
        n.sampleRate,
        " Hz"
      ] })
    ] }),
    n.durationMs != null && /* @__PURE__ */ f.jsxs("div", { className: h4, children: [
      /* @__PURE__ */ f.jsx("div", { className: m4, children: /* @__PURE__ */ f.jsx(L1, { features: Y1, children: /* @__PURE__ */ f.jsx(
        q1.div,
        {
          className: p4,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, n.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ f.jsx(xi, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ f.jsx(A4, { seed: n.contentSha256 })
  ] });
}
function A4({ seed: n }) {
  const a = x.useMemo(() => V4(n, 48), [n]);
  return /* @__PURE__ */ f.jsx("div", { className: b4, "aria-hidden": "true", children: a.map((r, s) => /* @__PURE__ */ f.jsx(
    "span",
    {
      className: x4,
      style: { height: `${Math.max(6, r * 100)}%` }
    },
    `${n}-${s}`
  )) });
}
function I1({
  label: n,
  onFile: a
}) {
  const [r, s] = x.useState(!1), [o, c] = x.useState(!1), h = x.useRef(null), m = x.useCallback(
    async (v) => {
      c(!0);
      try {
        await a(v);
      } finally {
        c(!1);
      }
    },
    [a]
  );
  return /* @__PURE__ */ f.jsxs(
    "div",
    {
      className: o ? d4 : r ? c4 : u4,
      onDragOver: (v) => {
        v.preventDefault(), s(!0);
      },
      onDragLeave: () => s(!1),
      onDrop: (v) => {
        v.preventDefault(), s(!1);
        const p = v.dataTransfer.files?.[0];
        p && m(p);
      },
      onClick: () => h.current?.click(),
      role: "button",
      tabIndex: 0,
      onKeyDown: (v) => {
        (v.key === "Enter" || v.key === " ") && (v.preventDefault(), h.current?.click());
      },
      "aria-busy": o,
      children: [
        /* @__PURE__ */ f.jsx(
          "input",
          {
            ref: h,
            type: "file",
            accept: "audio/*",
            onChange: (v) => {
              const p = v.currentTarget.files?.[0];
              p && m(p), v.currentTarget.value = "";
            }
          }
        ),
        o ? "Uploading…" : n
      ]
    }
  );
}
function _4({
  onExport: n,
  onImport: a,
  onParseError: r
}) {
  const [s, o] = x.useState("error"), c = x.useRef(null);
  return /* @__PURE__ */ f.jsxs("div", { className: F1, children: [
    /* @__PURE__ */ f.jsx(Je, { variant: "secondary", size: "sm", onClick: n, children: "Export JSON" }),
    /* @__PURE__ */ f.jsx(
      "input",
      {
        ref: c,
        type: "file",
        accept: "application/json,.json",
        className: j4,
        "aria-hidden": "true",
        tabIndex: -1,
        onChange: async (h) => {
          const m = h.currentTarget.files?.[0];
          if (h.currentTarget.value = "", !!m)
            try {
              const v = await m.text(), p = JSON.parse(v);
              a(p, s);
            } catch {
              r("Import failed: file is not a valid JSON mapping bundle.");
            }
        }
      }
    ),
    /* @__PURE__ */ f.jsx(Je, { variant: "secondary", size: "sm", onClick: () => c.current?.click(), children: "Import JSON" }),
    /* @__PURE__ */ f.jsxs(
      "select",
      {
        className: Yr,
        value: s,
        onChange: (h) => o(h.currentTarget.value),
        "aria-label": "Import conflict strategy",
        children: [
          /* @__PURE__ */ f.jsx("option", { value: "error", children: "Error on conflict" }),
          /* @__PURE__ */ f.jsx("option", { value: "skip", children: "Skip existing" }),
          /* @__PURE__ */ f.jsx("option", { value: "replace", children: "Replace existing" })
        ]
      }
    )
  ] });
}
function D4(n) {
  const a = new Set(n.map((s) => s.characterName.toLowerCase()));
  let r = 1;
  for (; a.has(`character ${r}`); ) r += 1;
  return `Character ${r}`;
}
function z4(n) {
  const a = n.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function O4(n) {
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
function L4(n) {
  return n == null ? null : n < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : n > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : n > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function U4(n) {
  return n < 1e3 ? `${n} ms` : `${Math.round(n / 100) / 10}s`;
}
function V4(n, a) {
  const r = [];
  for (let s = 0; s < a; s += 1) {
    const o = n.charCodeAt(s % n.length);
    r.push((o * 31 + s * 7) % 100 / 100);
  }
  return r;
}
function k4(n, a) {
  const r = new Blob([JSON.stringify(n, null, 2)], { type: "application/json" }), s = URL.createObjectURL(r), o = document.createElement("a");
  o.href = s, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(s);
}
function hi(n) {
  return n instanceof Zr || n instanceof Error ? n.message : "unknown error";
}
function B4() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: n } = await RT();
        return { deployments: n };
      },
      Component: sC
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: n }) => {
        const a = Br(n, "deploymentId");
        return VE(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: n }) => {
        const a = Br(n, "deploymentId"), [r, { mappings: s }, { runs: o }, c] = await Promise.all([
          ry(a),
          ly(a),
          zT(a, { limit: 10 }),
          VT(a)
        ]);
        return { deployment: r, mappings: s, runs: o, workflow: c };
      },
      Component: j2
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: n }) => {
        const a = Br(n, "deploymentId"), r = Br(n, "runId");
        return { run: await hh(a, r) };
      },
      Component: V_
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: n }) => {
        const a = Br(n, "deploymentId"), [r, { mappings: s }, { voiceAssets: o }] = await Promise.all([
          ry(a),
          ly(a),
          ss(a)
        ]);
        return { deployment: r, mappings: s, voiceAssets: o };
      },
      Component: C4
    },
    {
      path: "/:deploymentId/mappings/new",
      loader: ({ params: n, request: a }) => {
        const r = Br(n, "deploymentId"), s = new URL(a.url);
        return {
          deploymentId: r,
          prefillCharacterName: s.searchParams.get("character") ?? ""
        };
      },
      Component: g3
    },
    {
      path: "/runtime/queue",
      Component: f3
    }
  ];
}
function Br(n, a) {
  const r = n[a];
  if (!r)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return r;
}
const Pf = "emotion-tts-app", H4 = "ext-event", ob = "emotion-tts-stylesheet", ub = ["accent", "density", "card"];
function q4(n) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[n];
}
function $4() {
  if (typeof document > "u" || document.getElementById(ob)) return;
  const n = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = ob, a.rel = "stylesheet", a.href = n, document.head.appendChild(a);
}
$4();
class Y4 extends HTMLElement {
  root = null;
  ctx = null;
  observer = null;
  static get observedAttributes() {
    return ["route", "deployment-id"];
  }
  connectedCallback() {
    this.root = oE.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.paint();
  }
  attributeChangedCallback() {
    this.paint();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null;
  }
  syncTweaksFromBody() {
    for (const a of ub) {
      const r = q4(a);
      r === void 0 ? delete this.dataset[a] : this.dataset[a] !== r && (this.dataset[a] = r);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: ub.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), r = Fj(B4(), { initialEntries: [a] });
    this.root.render(
      /* @__PURE__ */ f.jsx(x.StrictMode, { children: /* @__PURE__ */ f.jsx(Gj, { router: r }) })
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
      new CustomEvent(H4, {
        detail: { topic: a, payload: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function F4() {
  typeof customElements > "u" || customElements.get(Pf) || customElements.define(Pf, Y4);
}
typeof customElements < "u" && !customElements.get(Pf) && F4();
export {
  F4 as register
};
//# sourceMappingURL=emotion-tts.js.map
