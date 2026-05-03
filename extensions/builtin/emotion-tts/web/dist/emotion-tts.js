function Pw(n, a) {
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
function mb(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var qd = { exports: {} }, Fl = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Nv;
function Jw() {
  if (Nv) return Fl;
  Nv = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function r(s, o, c) {
    var h = null;
    if (c !== void 0 && (h = "" + c), o.key !== void 0 && (h = "" + o.key), "key" in o) {
      c = {};
      for (var p in o)
        p !== "key" && (c[p] = o[p]);
    } else c = o;
    return o = c.ref, {
      $$typeof: n,
      type: s,
      key: h,
      ref: o !== void 0 ? o : null,
      props: c
    };
  }
  return Fl.Fragment = a, Fl.jsx = r, Fl.jsxs = r, Fl;
}
var Mv;
function Ww() {
  return Mv || (Mv = 1, qd.exports = Jw()), qd.exports;
}
var f = Ww(), $d = { exports: {} }, Ue = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Rv;
function eE() {
  if (Rv) return Ue;
  Rv = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), h = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), S = Symbol.iterator;
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
  }, T = Object.assign, _ = {};
  function C(N, P, W) {
    this.props = N, this.context = P, this.refs = _, this.updater = W || j;
  }
  C.prototype.isReactComponent = {}, C.prototype.setState = function(N, P) {
    if (typeof N != "object" && typeof N != "function" && N != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, N, P, "setState");
  }, C.prototype.forceUpdate = function(N) {
    this.updater.enqueueForceUpdate(this, N, "forceUpdate");
  };
  function z() {
  }
  z.prototype = C.prototype;
  function O(N, P, W) {
    this.props = N, this.context = P, this.refs = _, this.updater = W || j;
  }
  var R = O.prototype = new z();
  R.constructor = O, T(R, C.prototype), R.isPureReactComponent = !0;
  var X = Array.isArray;
  function $() {
  }
  var Q = { H: null, A: null, T: null, S: null }, M = Object.prototype.hasOwnProperty;
  function B(N, P, W) {
    var ie = W.ref;
    return {
      $$typeof: n,
      type: N,
      key: P,
      ref: ie !== void 0 ? ie : null,
      props: W
    };
  }
  function J(N, P) {
    return B(N.type, P, N.props);
  }
  function se(N) {
    return typeof N == "object" && N !== null && N.$$typeof === n;
  }
  function oe(N) {
    var P = { "=": "=0", ":": "=2" };
    return "$" + N.replace(/[=:]/g, function(W) {
      return P[W];
    });
  }
  var be = /\/+/g;
  function Se(N, P) {
    return typeof N == "object" && N !== null && N.key != null ? oe("" + N.key) : P.toString(36);
  }
  function le(N) {
    switch (N.status) {
      case "fulfilled":
        return N.value;
      case "rejected":
        throw N.reason;
      default:
        switch (typeof N.status == "string" ? N.then($, $) : (N.status = "pending", N.then(
          function(P) {
            N.status === "pending" && (N.status = "fulfilled", N.value = P);
          },
          function(P) {
            N.status === "pending" && (N.status = "rejected", N.reason = P);
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
  function U(N, P, W, ie, de) {
    var ye = typeof N;
    (ye === "undefined" || ye === "boolean") && (N = null);
    var De = !1;
    if (N === null) De = !0;
    else
      switch (ye) {
        case "bigint":
        case "string":
        case "number":
          De = !0;
          break;
        case "object":
          switch (N.$$typeof) {
            case n:
            case a:
              De = !0;
              break;
            case b:
              return De = N._init, U(
                De(N._payload),
                P,
                W,
                ie,
                de
              );
          }
      }
    if (De)
      return de = de(N), De = ie === "" ? "." + Se(N, 0) : ie, X(de) ? (W = "", De != null && (W = De.replace(be, "$&/") + "/"), U(de, P, W, "", function(fe) {
        return fe;
      })) : de != null && (se(de) && (de = J(
        de,
        W + (de.key == null || N && N.key === de.key ? "" : ("" + de.key).replace(
          be,
          "$&/"
        ) + "/") + De
      )), P.push(de)), 1;
    De = 0;
    var Re = ie === "" ? "." : ie + ":";
    if (X(N))
      for (var Be = 0; Be < N.length; Be++)
        ie = N[Be], ye = Re + Se(ie, Be), De += U(
          ie,
          P,
          W,
          ye,
          de
        );
    else if (Be = w(N), typeof Be == "function")
      for (N = Be.call(N), Be = 0; !(ie = N.next()).done; )
        ie = ie.value, ye = Re + Se(ie, Be++), De += U(
          ie,
          P,
          W,
          ye,
          de
        );
    else if (ye === "object") {
      if (typeof N.then == "function")
        return U(
          le(N),
          P,
          W,
          ie,
          de
        );
      throw P = String(N), Error(
        "Objects are not valid as a React child (found: " + (P === "[object Object]" ? "object with keys {" + Object.keys(N).join(", ") + "}" : P) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return De;
  }
  function k(N, P, W) {
    if (N == null) return N;
    var ie = [], de = 0;
    return U(N, ie, "", "", function(ye) {
      return P.call(W, ye, de++);
    }), ie;
  }
  function q(N) {
    if (N._status === -1) {
      var P = N._result;
      P = P(), P.then(
        function(W) {
          (N._status === 0 || N._status === -1) && (N._status = 1, N._result = W);
        },
        function(W) {
          (N._status === 0 || N._status === -1) && (N._status = 2, N._result = W);
        }
      ), N._status === -1 && (N._status = 0, N._result = P);
    }
    if (N._status === 1) return N._result.default;
    throw N._result;
  }
  var Z = typeof reportError == "function" ? reportError : function(N) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var P = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof N == "object" && N !== null && typeof N.message == "string" ? String(N.message) : String(N),
        error: N
      });
      if (!window.dispatchEvent(P)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", N);
      return;
    }
    console.error(N);
  }, ae = {
    map: k,
    forEach: function(N, P, W) {
      k(
        N,
        function() {
          P.apply(this, arguments);
        },
        W
      );
    },
    count: function(N) {
      var P = 0;
      return k(N, function() {
        P++;
      }), P;
    },
    toArray: function(N) {
      return k(N, function(P) {
        return P;
      }) || [];
    },
    only: function(N) {
      if (!se(N))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return N;
    }
  };
  return Ue.Activity = v, Ue.Children = ae, Ue.Component = C, Ue.Fragment = r, Ue.Profiler = o, Ue.PureComponent = O, Ue.StrictMode = s, Ue.Suspense = g, Ue.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Q, Ue.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(N) {
      return Q.H.useMemoCache(N);
    }
  }, Ue.cache = function(N) {
    return function() {
      return N.apply(null, arguments);
    };
  }, Ue.cacheSignal = function() {
    return null;
  }, Ue.cloneElement = function(N, P, W) {
    if (N == null)
      throw Error(
        "The argument must be a React element, but you passed " + N + "."
      );
    var ie = T({}, N.props), de = N.key;
    if (P != null)
      for (ye in P.key !== void 0 && (de = "" + P.key), P)
        !M.call(P, ye) || ye === "key" || ye === "__self" || ye === "__source" || ye === "ref" && P.ref === void 0 || (ie[ye] = P[ye]);
    var ye = arguments.length - 2;
    if (ye === 1) ie.children = W;
    else if (1 < ye) {
      for (var De = Array(ye), Re = 0; Re < ye; Re++)
        De[Re] = arguments[Re + 2];
      ie.children = De;
    }
    return B(N.type, de, ie);
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
  }, Ue.createElement = function(N, P, W) {
    var ie, de = {}, ye = null;
    if (P != null)
      for (ie in P.key !== void 0 && (ye = "" + P.key), P)
        M.call(P, ie) && ie !== "key" && ie !== "__self" && ie !== "__source" && (de[ie] = P[ie]);
    var De = arguments.length - 2;
    if (De === 1) de.children = W;
    else if (1 < De) {
      for (var Re = Array(De), Be = 0; Be < De; Be++)
        Re[Be] = arguments[Be + 2];
      de.children = Re;
    }
    if (N && N.defaultProps)
      for (ie in De = N.defaultProps, De)
        de[ie] === void 0 && (de[ie] = De[ie]);
    return B(N, ye, de);
  }, Ue.createRef = function() {
    return { current: null };
  }, Ue.forwardRef = function(N) {
    return { $$typeof: p, render: N };
  }, Ue.isValidElement = se, Ue.lazy = function(N) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: N },
      _init: q
    };
  }, Ue.memo = function(N, P) {
    return {
      $$typeof: m,
      type: N,
      compare: P === void 0 ? null : P
    };
  }, Ue.startTransition = function(N) {
    var P = Q.T, W = {};
    Q.T = W;
    try {
      var ie = N(), de = Q.S;
      de !== null && de(W, ie), typeof ie == "object" && ie !== null && typeof ie.then == "function" && ie.then($, Z);
    } catch (ye) {
      Z(ye);
    } finally {
      P !== null && W.types !== null && (P.types = W.types), Q.T = P;
    }
  }, Ue.unstable_useCacheRefresh = function() {
    return Q.H.useCacheRefresh();
  }, Ue.use = function(N) {
    return Q.H.use(N);
  }, Ue.useActionState = function(N, P, W) {
    return Q.H.useActionState(N, P, W);
  }, Ue.useCallback = function(N, P) {
    return Q.H.useCallback(N, P);
  }, Ue.useContext = function(N) {
    return Q.H.useContext(N);
  }, Ue.useDebugValue = function() {
  }, Ue.useDeferredValue = function(N, P) {
    return Q.H.useDeferredValue(N, P);
  }, Ue.useEffect = function(N, P) {
    return Q.H.useEffect(N, P);
  }, Ue.useEffectEvent = function(N) {
    return Q.H.useEffectEvent(N);
  }, Ue.useId = function() {
    return Q.H.useId();
  }, Ue.useImperativeHandle = function(N, P, W) {
    return Q.H.useImperativeHandle(N, P, W);
  }, Ue.useInsertionEffect = function(N, P) {
    return Q.H.useInsertionEffect(N, P);
  }, Ue.useLayoutEffect = function(N, P) {
    return Q.H.useLayoutEffect(N, P);
  }, Ue.useMemo = function(N, P) {
    return Q.H.useMemo(N, P);
  }, Ue.useOptimistic = function(N, P) {
    return Q.H.useOptimistic(N, P);
  }, Ue.useReducer = function(N, P, W) {
    return Q.H.useReducer(N, P, W);
  }, Ue.useRef = function(N) {
    return Q.H.useRef(N);
  }, Ue.useState = function(N) {
    return Q.H.useState(N);
  }, Ue.useSyncExternalStore = function(N, P, W) {
    return Q.H.useSyncExternalStore(
      N,
      P,
      W
    );
  }, Ue.useTransition = function() {
    return Q.H.useTransition();
  }, Ue.version = "19.2.5", Ue;
}
var Av;
function ih() {
  return Av || (Av = 1, $d.exports = eE()), $d.exports;
}
var x = ih();
const ce = /* @__PURE__ */ mb(x), tE = /* @__PURE__ */ Pw({
  __proto__: null,
  default: ce
}, [x]);
var Id = { exports: {} }, Gl = {}, Yd = { exports: {} }, Fd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _v;
function nE() {
  return _v || (_v = 1, (function(n) {
    function a(U, k) {
      var q = U.length;
      U.push(k);
      e: for (; 0 < q; ) {
        var Z = q - 1 >>> 1, ae = U[Z];
        if (0 < o(ae, k))
          U[Z] = k, U[q] = ae, q = Z;
        else break e;
      }
    }
    function r(U) {
      return U.length === 0 ? null : U[0];
    }
    function s(U) {
      if (U.length === 0) return null;
      var k = U[0], q = U.pop();
      if (q !== k) {
        U[0] = q;
        e: for (var Z = 0, ae = U.length, N = ae >>> 1; Z < N; ) {
          var P = 2 * (Z + 1) - 1, W = U[P], ie = P + 1, de = U[ie];
          if (0 > o(W, q))
            ie < ae && 0 > o(de, W) ? (U[Z] = de, U[ie] = q, Z = ie) : (U[Z] = W, U[P] = q, Z = P);
          else if (ie < ae && 0 > o(de, q))
            U[Z] = de, U[ie] = q, Z = ie;
          else break e;
        }
      }
      return k;
    }
    function o(U, k) {
      var q = U.sortIndex - k.sortIndex;
      return q !== 0 ? q : U.id - k.id;
    }
    if (n.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var c = performance;
      n.unstable_now = function() {
        return c.now();
      };
    } else {
      var h = Date, p = h.now();
      n.unstable_now = function() {
        return h.now() - p;
      };
    }
    var g = [], m = [], b = 1, v = null, S = 3, w = !1, j = !1, T = !1, _ = !1, C = typeof setTimeout == "function" ? setTimeout : null, z = typeof clearTimeout == "function" ? clearTimeout : null, O = typeof setImmediate < "u" ? setImmediate : null;
    function R(U) {
      for (var k = r(m); k !== null; ) {
        if (k.callback === null) s(m);
        else if (k.startTime <= U)
          s(m), k.sortIndex = k.expirationTime, a(g, k);
        else break;
        k = r(m);
      }
    }
    function X(U) {
      if (T = !1, R(U), !j)
        if (r(g) !== null)
          j = !0, $ || ($ = !0, oe());
        else {
          var k = r(m);
          k !== null && le(X, k.startTime - U);
        }
    }
    var $ = !1, Q = -1, M = 5, B = -1;
    function J() {
      return _ ? !0 : !(n.unstable_now() - B < M);
    }
    function se() {
      if (_ = !1, $) {
        var U = n.unstable_now();
        B = U;
        var k = !0;
        try {
          e: {
            j = !1, T && (T = !1, z(Q), Q = -1), w = !0;
            var q = S;
            try {
              t: {
                for (R(U), v = r(g); v !== null && !(v.expirationTime > U && J()); ) {
                  var Z = v.callback;
                  if (typeof Z == "function") {
                    v.callback = null, S = v.priorityLevel;
                    var ae = Z(
                      v.expirationTime <= U
                    );
                    if (U = n.unstable_now(), typeof ae == "function") {
                      v.callback = ae, R(U), k = !0;
                      break t;
                    }
                    v === r(g) && s(g), R(U);
                  } else s(g);
                  v = r(g);
                }
                if (v !== null) k = !0;
                else {
                  var N = r(m);
                  N !== null && le(
                    X,
                    N.startTime - U
                  ), k = !1;
                }
              }
              break e;
            } finally {
              v = null, S = q, w = !1;
            }
            k = void 0;
          }
        } finally {
          k ? oe() : $ = !1;
        }
      }
    }
    var oe;
    if (typeof O == "function")
      oe = function() {
        O(se);
      };
    else if (typeof MessageChannel < "u") {
      var be = new MessageChannel(), Se = be.port2;
      be.port1.onmessage = se, oe = function() {
        Se.postMessage(null);
      };
    } else
      oe = function() {
        C(se, 0);
      };
    function le(U, k) {
      Q = C(function() {
        U(n.unstable_now());
      }, k);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(U) {
      U.callback = null;
    }, n.unstable_forceFrameRate = function(U) {
      0 > U || 125 < U ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : M = 0 < U ? Math.floor(1e3 / U) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, n.unstable_next = function(U) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var k = 3;
          break;
        default:
          k = S;
      }
      var q = S;
      S = k;
      try {
        return U();
      } finally {
        S = q;
      }
    }, n.unstable_requestPaint = function() {
      _ = !0;
    }, n.unstable_runWithPriority = function(U, k) {
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
      var q = S;
      S = U;
      try {
        return k();
      } finally {
        S = q;
      }
    }, n.unstable_scheduleCallback = function(U, k, q) {
      var Z = n.unstable_now();
      switch (typeof q == "object" && q !== null ? (q = q.delay, q = typeof q == "number" && 0 < q ? Z + q : Z) : q = Z, U) {
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
      return ae = q + ae, U = {
        id: b++,
        callback: k,
        priorityLevel: U,
        startTime: q,
        expirationTime: ae,
        sortIndex: -1
      }, q > Z ? (U.sortIndex = q, a(m, U), r(g) === null && U === r(m) && (T ? (z(Q), Q = -1) : T = !0, le(X, q - Z))) : (U.sortIndex = ae, a(g, U), j || w || (j = !0, $ || ($ = !0, oe()))), U;
    }, n.unstable_shouldYield = J, n.unstable_wrapCallback = function(U) {
      var k = S;
      return function() {
        var q = S;
        S = k;
        try {
          return U.apply(this, arguments);
        } finally {
          S = q;
        }
      };
    };
  })(Fd)), Fd;
}
var Dv;
function aE() {
  return Dv || (Dv = 1, Yd.exports = nE()), Yd.exports;
}
var Gd = { exports: {} }, an = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zv;
function iE() {
  if (zv) return an;
  zv = 1;
  var n = ih();
  function a(g) {
    var m = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        m += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + g + "; visit " + m + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function c(g, m, b) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: v == null ? null : "" + v,
      children: g,
      containerInfo: m,
      implementation: b
    };
  }
  var h = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(g, m) {
    if (g === "font") return "";
    if (typeof m == "string")
      return m === "use-credentials" ? m : "";
  }
  return an.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, an.createPortal = function(g, m) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(a(299));
    return c(g, m, null, b);
  }, an.flushSync = function(g) {
    var m = h.T, b = s.p;
    try {
      if (h.T = null, s.p = 2, g) return g();
    } finally {
      h.T = m, s.p = b, s.d.f();
    }
  }, an.preconnect = function(g, m) {
    typeof g == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, s.d.C(g, m));
  }, an.prefetchDNS = function(g) {
    typeof g == "string" && s.d.D(g);
  }, an.preinit = function(g, m) {
    if (typeof g == "string" && m && typeof m.as == "string") {
      var b = m.as, v = p(b, m.crossOrigin), S = typeof m.integrity == "string" ? m.integrity : void 0, w = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
      b === "style" ? s.d.S(
        g,
        typeof m.precedence == "string" ? m.precedence : void 0,
        {
          crossOrigin: v,
          integrity: S,
          fetchPriority: w
        }
      ) : b === "script" && s.d.X(g, {
        crossOrigin: v,
        integrity: S,
        fetchPriority: w,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0
      });
    }
  }, an.preinitModule = function(g, m) {
    if (typeof g == "string")
      if (typeof m == "object" && m !== null) {
        if (m.as == null || m.as === "script") {
          var b = p(
            m.as,
            m.crossOrigin
          );
          s.d.M(g, {
            crossOrigin: b,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
            nonce: typeof m.nonce == "string" ? m.nonce : void 0
          });
        }
      } else m == null && s.d.M(g);
  }, an.preload = function(g, m) {
    if (typeof g == "string" && typeof m == "object" && m !== null && typeof m.as == "string") {
      var b = m.as, v = p(b, m.crossOrigin);
      s.d.L(g, b, {
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
  }, an.preloadModule = function(g, m) {
    if (typeof g == "string")
      if (m) {
        var b = p(m.as, m.crossOrigin);
        s.d.m(g, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: b,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0
        });
      } else s.d.m(g);
  }, an.requestFormReset = function(g) {
    s.d.r(g);
  }, an.unstable_batchedUpdates = function(g, m) {
    return g(m);
  }, an.useFormState = function(g, m, b) {
    return h.H.useFormState(g, m, b);
  }, an.useFormStatus = function() {
    return h.H.useHostTransitionStatus();
  }, an.version = "19.2.5", an;
}
var Ov;
function pb() {
  if (Ov) return Gd.exports;
  Ov = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Gd.exports = iE(), Gd.exports;
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
var Lv;
function rE() {
  if (Lv) return Gl;
  Lv = 1;
  var n = aE(), a = ih(), r = pb();
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
  function p(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function g(e) {
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
          if (d === i) return g(u), e;
          if (d === l) return g(u), t;
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
  var v = Object.assign, S = Symbol.for("react.element"), w = Symbol.for("react.transitional.element"), j = Symbol.for("react.portal"), T = Symbol.for("react.fragment"), _ = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), z = Symbol.for("react.consumer"), O = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), X = Symbol.for("react.suspense"), $ = Symbol.for("react.suspense_list"), Q = Symbol.for("react.memo"), M = Symbol.for("react.lazy"), B = Symbol.for("react.activity"), J = Symbol.for("react.memo_cache_sentinel"), se = Symbol.iterator;
  function oe(e) {
    return e === null || typeof e != "object" ? null : (e = se && e[se] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var be = Symbol.for("react.client.reference");
  function Se(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === be ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case T:
        return "Fragment";
      case C:
        return "Profiler";
      case _:
        return "StrictMode";
      case X:
        return "Suspense";
      case $:
        return "SuspenseList";
      case B:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case j:
          return "Portal";
        case O:
          return e.displayName || "Context";
        case z:
          return (e._context.displayName || "Context") + ".Consumer";
        case R:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case Q:
          return t = e.displayName || null, t !== null ? t : Se(e.type) || "Memo";
        case M:
          t = e._payload, e = e._init;
          try {
            return Se(e(t));
          } catch {
          }
      }
    return null;
  }
  var le = Array.isArray, U = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, k = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Z = [], ae = -1;
  function N(e) {
    return { current: e };
  }
  function P(e) {
    0 > ae || (e.current = Z[ae], Z[ae] = null, ae--);
  }
  function W(e, t) {
    ae++, Z[ae] = e.current, e.current = t;
  }
  var ie = N(null), de = N(null), ye = N(null), De = N(null);
  function Re(e, t) {
    switch (W(ye, t), W(de, e), W(ie, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Zg(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Zg(t), e = Pg(t, e);
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
    P(ie), W(ie, e);
  }
  function Be() {
    P(ie), P(de), P(ye);
  }
  function fe(e) {
    e.memoizedState !== null && W(De, e);
    var t = ie.current, i = Pg(t, e.type);
    t !== i && (W(de, e), W(ie, i));
  }
  function Oe(e) {
    de.current === e && (P(ie), P(de)), De.current === e && (P(De), ql._currentValue = q);
  }
  var Ae, pe;
  function tt(e) {
    if (Ae === void 0)
      try {
        throw Error();
      } catch (i) {
        var t = i.stack.trim().match(/\n( *(at )?)/);
        Ae = t && t[1] || "", pe = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Ae + e + pe;
  }
  var Et = !1;
  function en(e, t) {
    if (!e || Et) return "";
    Et = !0;
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
                  var G = K;
                }
                Reflect.construct(e, [], ne);
              } else {
                try {
                  ne.call();
                } catch (K) {
                  G = K;
                }
                e.call(ne.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (K) {
                G = K;
              }
              (ne = e()) && typeof ne.catch == "function" && ne.catch(function() {
              });
            }
          } catch (K) {
            if (K && G && typeof K.stack == "string")
              return [K.stack, G.stack];
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
        var D = y.split(`
`), F = E.split(`
`);
        for (u = l = 0; l < D.length && !D[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; u < F.length && !F[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (l === D.length || u === F.length)
          for (l = D.length - 1, u = F.length - 1; 1 <= l && 0 <= u && D[l] !== F[u]; )
            u--;
        for (; 1 <= l && 0 <= u; l--, u--)
          if (D[l] !== F[u]) {
            if (l !== 1 || u !== 1)
              do
                if (l--, u--, 0 > u || D[l] !== F[u]) {
                  var ee = `
` + D[l].replace(" at new ", " at ");
                  return e.displayName && ee.includes("<anonymous>") && (ee = ee.replace("<anonymous>", e.displayName)), ee;
                }
              while (1 <= l && 0 <= u);
            break;
          }
      }
    } finally {
      Et = !1, Error.prepareStackTrace = i;
    }
    return (i = e ? e.displayName || e.name : "") ? tt(i) : "";
  }
  function Gt(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return tt(e.type);
      case 16:
        return tt("Lazy");
      case 13:
        return e.child !== t && t !== null ? tt("Suspense Fallback") : tt("Suspense");
      case 19:
        return tt("SuspenseList");
      case 0:
      case 15:
        return en(e.type, !1);
      case 11:
        return en(e.type.render, !1);
      case 1:
        return en(e.type, !0);
      case 31:
        return tt("Activity");
      default:
        return "";
    }
  }
  function ma(e) {
    try {
      var t = "", i = null;
      do
        t += Gt(e, i), i = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var Xt = Object.prototype.hasOwnProperty, yn = n.unstable_scheduleCallback, pa = n.unstable_cancelCallback, kt = n.unstable_shouldYield, Dn = n.unstable_requestPaint, Vt = n.unstable_now, ge = n.unstable_getCurrentPriorityLevel, ze = n.unstable_ImmediatePriority, Qe = n.unstable_UserBlockingPriority, nt = n.unstable_NormalPriority, Bt = n.unstable_LowPriority, Ht = n.unstable_IdlePriority, Ti = n.log, ia = n.unstable_setDisableYieldValue, Qn = null, Kt = null;
  function jt(e) {
    if (typeof Ti == "function" && ia(e), Kt && typeof Kt.setStrictMode == "function")
      try {
        Kt.setStrictMode(Qn, e);
      } catch {
      }
  }
  var qt = Math.clz32 ? Math.clz32 : zn, er = Math.log, Ha = Math.LN2;
  function zn(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (er(e) / Ha | 0) | 0;
  }
  var ga = 256, Zn = 262144, ra = 4194304;
  function un(e) {
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
  function Le(e, t, i) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var u = 0, d = e.suspendedLanes, y = e.pingedLanes;
    e = e.warmLanes;
    var E = l & 134217727;
    return E !== 0 ? (l = E & ~d, l !== 0 ? u = un(l) : (y &= E, y !== 0 ? u = un(y) : i || (i = E & ~e, i !== 0 && (u = un(i))))) : (E = l & ~d, E !== 0 ? u = un(E) : y !== 0 ? u = un(y) : i || (i = l & ~e, i !== 0 && (u = un(i)))), u === 0 ? 0 : t !== 0 && t !== u && (t & d) === 0 && (d = u & -u, i = t & -t, d >= i || d === 32 && (i & 4194048) !== 0) ? t : u;
  }
  function ct(e, t) {
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
  function $t() {
    var e = ra;
    return ra <<= 1, (ra & 62914560) === 0 && (ra = 4194304), e;
  }
  function bn(e) {
    for (var t = [], i = 0; 31 > i; i++) t.push(e);
    return t;
  }
  function rt(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Qt(e, t, i, l, u, d) {
    var y = e.pendingLanes;
    e.pendingLanes = i, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= i, e.entangledLanes &= i, e.errorRecoveryDisabledLanes &= i, e.shellSuspendCounter = 0;
    var E = e.entanglements, D = e.expirationTimes, F = e.hiddenUpdates;
    for (i = y & ~i; 0 < i; ) {
      var ee = 31 - qt(i), ne = 1 << ee;
      E[ee] = 0, D[ee] = -1;
      var G = F[ee];
      if (G !== null)
        for (F[ee] = null, ee = 0; ee < G.length; ee++) {
          var K = G[ee];
          K !== null && (K.lane &= -536870913);
        }
      i &= ~ne;
    }
    l !== 0 && va(e, l, 0), d !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= d & ~(y & ~t));
  }
  function va(e, t, i) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - qt(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | i & 261930;
  }
  function tn(e, t) {
    var i = e.entangledLanes |= t;
    for (e = e.entanglements; i; ) {
      var l = 31 - qt(i), u = 1 << l;
      u & t | e[l] & t && (e[l] |= t), i &= ~u;
    }
  }
  function A(e, t) {
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
  function I(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function re() {
    var e = k.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : xv(e.type));
  }
  function ue(e, t) {
    var i = k.p;
    try {
      return k.p = e, t();
    } finally {
      k.p = i;
    }
  }
  var we = Math.random().toString(36).slice(2), he = "__reactFiber$" + we, me = "__reactProps$" + we, je = "__reactContainer$" + we, ve = "__reactEvents$" + we, Me = "__reactListeners$" + we, Ce = "__reactHandles$" + we, Pe = "__reactResources$" + we, He = "__reactMarker$" + we;
  function dt(e) {
    delete e[he], delete e[me], delete e[ve], delete e[Me], delete e[Ce];
  }
  function lt(e) {
    var t = e[he];
    if (t) return t;
    for (var i = e.parentNode; i; ) {
      if (t = i[je] || i[he]) {
        if (i = t.alternate, t.child !== null || i !== null && i.child !== null)
          for (e = iv(e); e !== null; ) {
            if (i = e[he]) return i;
            e = iv(e);
          }
        return t;
      }
      e = i, i = e.parentNode;
    }
    return null;
  }
  function yt(e) {
    if (e = e[he] || e[je]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Ie(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(s(33));
  }
  function At(e) {
    var t = e[Pe];
    return t || (t = e[Pe] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function ht(e) {
    e[He] = !0;
  }
  var qa = /* @__PURE__ */ new Set(), Pn = {};
  function Yt(e, t) {
    la(e, t), la(e + "Capture", t);
  }
  function la(e, t) {
    for (Pn[e] = t, e = 0; e < t.length; e++)
      qa.add(t[e]);
  }
  var Ci = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), sa = {}, Ni = {};
  function tr(e) {
    return Xt.call(Ni, e) ? !0 : Xt.call(sa, e) ? !1 : Ci.test(e) ? Ni[e] = !0 : (sa[e] = !0, !1);
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
  function Tt(e, t, i) {
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
  function nn(e, t, i, l) {
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
  function Ns(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var i = t.getValue(), l = "";
    return e && (l = mt(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== i ? (t.setValue(e), !0) : !1;
  }
  function Ms(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var F1 = /[\n"\\]/g;
  function On(e) {
    return e.replace(
      F1,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Lu(e, t, i, l, u, d, y, E) {
    e.name = "", y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? e.type = y : e.removeAttribute("type"), t != null ? y === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + _t(t)) : e.value !== "" + _t(t) && (e.value = "" + _t(t)) : y !== "submit" && y !== "reset" || e.removeAttribute("value"), t != null ? Uu(e, y, _t(t)) : i != null ? Uu(e, y, _t(i)) : l != null && e.removeAttribute("value"), u == null && d != null && (e.defaultChecked = !!d), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + _t(E) : e.removeAttribute("name");
  }
  function Yh(e, t, i, l, u, d, y, E) {
    if (d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.type = d), t != null || i != null) {
      if (!(d !== "submit" && d !== "reset" || t != null)) {
        ar(e);
        return;
      }
      i = i != null ? "" + _t(i) : "", t = t != null ? "" + _t(t) : i, E || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? u, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = E ? e.checked : !!l, e.defaultChecked = !!l, y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" && (e.name = y), ar(e);
  }
  function Uu(e, t, i) {
    t === "number" && Ms(e.ownerDocument) === e || e.defaultValue === "" + i || (e.defaultValue = "" + i);
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
  function Fh(e, t, i) {
    if (t != null && (t = "" + _t(t), t !== e.value && (e.value = t), i == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = i != null ? "" + _t(i) : "";
  }
  function Gh(e, t, i, l) {
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
  var G1 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Xh(e, t, i) {
    var l = t.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, i) : typeof i != "number" || i === 0 || G1.has(t) ? t === "float" ? e.cssFloat = i : e[t] = ("" + i).trim() : e[t] = i + "px";
  }
  function Kh(e, t, i) {
    if (t != null && typeof t != "object")
      throw Error(s(62));
    if (e = e.style, i != null) {
      for (var l in i)
        !i.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var u in t)
        l = t[u], t.hasOwnProperty(u) && i[u] !== l && Xh(e, u, l);
    } else
      for (var d in t)
        t.hasOwnProperty(d) && Xh(e, d, t[d]);
  }
  function ku(e) {
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
  var X1 = /* @__PURE__ */ new Map([
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
  ]), K1 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Rs(e) {
    return K1.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function ya() {
  }
  var Vu = null;
  function Bu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var lr = null, sr = null;
  function Qh(e) {
    var t = yt(e);
    if (t && (e = t.stateNode)) {
      var i = e[me] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Lu(
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
              'input[name="' + On(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < i.length; t++) {
              var l = i[t];
              if (l !== e && l.form === e.form) {
                var u = l[me] || null;
                if (!u) throw Error(s(90));
                Lu(
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
              l = i[t], l.form === e.form && Ns(l);
          }
          break e;
        case "textarea":
          Fh(e, i.value, i.defaultValue);
          break e;
        case "select":
          t = i.value, t != null && ir(e, !!i.multiple, t, !1);
      }
    }
  }
  var Hu = !1;
  function Zh(e, t, i) {
    if (Hu) return e(t, i);
    Hu = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (Hu = !1, (lr !== null || sr !== null) && (vo(), lr && (t = lr, e = sr, sr = lr = null, Qh(t), e)))
        for (t = 0; t < e.length; t++) Qh(e[t]);
    }
  }
  function il(e, t) {
    var i = e.stateNode;
    if (i === null) return null;
    var l = i[me] || null;
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
  var ba = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), qu = !1;
  if (ba)
    try {
      var rl = {};
      Object.defineProperty(rl, "passive", {
        get: function() {
          qu = !0;
        }
      }), window.addEventListener("test", rl, rl), window.removeEventListener("test", rl, rl);
    } catch {
      qu = !1;
    }
  var $a = null, $u = null, As = null;
  function Ph() {
    if (As) return As;
    var e, t = $u, i = t.length, l, u = "value" in $a ? $a.value : $a.textContent, d = u.length;
    for (e = 0; e < i && t[e] === u[e]; e++) ;
    var y = i - e;
    for (l = 1; l <= y && t[i - l] === u[d - l]; l++) ;
    return As = u.slice(e, 1 < l ? 1 - l : void 0);
  }
  function _s(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ds() {
    return !0;
  }
  function Jh() {
    return !1;
  }
  function cn(e) {
    function t(i, l, u, d, y) {
      this._reactName = i, this._targetInst = u, this.type = l, this.nativeEvent = d, this.target = y, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (i = e[E], this[E] = i ? i(d) : d[E]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? Ds : Jh, this.isPropagationStopped = Jh, this;
    }
    return v(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = Ds);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = Ds);
      },
      persist: function() {
      },
      isPersistent: Ds
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
  }, zs = cn(Mi), ll = v({}, Mi, { view: 0, detail: 0 }), Q1 = cn(ll), Iu, Yu, sl, Os = v({}, ll, {
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
    getModifierState: Gu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== sl && (sl && e.type === "mousemove" ? (Iu = e.screenX - sl.screenX, Yu = e.screenY - sl.screenY) : Yu = Iu = 0, sl = e), Iu);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Yu;
    }
  }), Wh = cn(Os), Z1 = v({}, Os, { dataTransfer: 0 }), P1 = cn(Z1), J1 = v({}, ll, { relatedTarget: 0 }), Fu = cn(J1), W1 = v({}, Mi, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), eS = cn(W1), tS = v({}, Mi, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), nS = cn(tS), aS = v({}, Mi, { data: 0 }), em = cn(aS), iS = {
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
  function sS(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = lS[e]) ? !!t[e] : !1;
  }
  function Gu() {
    return sS;
  }
  var oS = v({}, ll, {
    key: function(e) {
      if (e.key) {
        var t = iS[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = _s(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? rS[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Gu,
    charCode: function(e) {
      return e.type === "keypress" ? _s(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? _s(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), uS = cn(oS), cS = v({}, Os, {
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
  }), tm = cn(cS), dS = v({}, ll, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Gu
  }), fS = cn(dS), hS = v({}, Mi, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), mS = cn(hS), pS = v({}, Os, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), gS = cn(pS), vS = v({}, Mi, {
    newState: 0,
    oldState: 0
  }), yS = cn(vS), bS = [9, 13, 27, 32], Xu = ba && "CompositionEvent" in window, ol = null;
  ba && "documentMode" in document && (ol = document.documentMode);
  var xS = ba && "TextEvent" in window && !ol, nm = ba && (!Xu || ol && 8 < ol && 11 >= ol), am = " ", im = !1;
  function rm(e, t) {
    switch (e) {
      case "keyup":
        return bS.indexOf(t.keyCode) !== -1;
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
  function lm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var or = !1;
  function SS(e, t) {
    switch (e) {
      case "compositionend":
        return lm(t);
      case "keypress":
        return t.which !== 32 ? null : (im = !0, am);
      case "textInput":
        return e = t.data, e === am && im ? null : e;
      default:
        return null;
    }
  }
  function wS(e, t) {
    if (or)
      return e === "compositionend" || !Xu && rm(e, t) ? (e = Ph(), As = $u = $a = null, or = !1, e) : null;
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
        return nm && t.locale !== "ko" ? null : t.data;
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
  function sm(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!ES[e.type] : t === "textarea";
  }
  function om(e, t, i, l) {
    lr ? sr ? sr.push(l) : sr = [l] : lr = l, t = jo(t, "onChange"), 0 < t.length && (i = new zs(
      "onChange",
      "change",
      null,
      i,
      l
    ), e.push({ event: i, listeners: t }));
  }
  var ul = null, cl = null;
  function jS(e) {
    Yg(e, 0);
  }
  function Ls(e) {
    var t = Ie(e);
    if (Ns(t)) return e;
  }
  function um(e, t) {
    if (e === "change") return t;
  }
  var cm = !1;
  if (ba) {
    var Ku;
    if (ba) {
      var Qu = "oninput" in document;
      if (!Qu) {
        var dm = document.createElement("div");
        dm.setAttribute("oninput", "return;"), Qu = typeof dm.oninput == "function";
      }
      Ku = Qu;
    } else Ku = !1;
    cm = Ku && (!document.documentMode || 9 < document.documentMode);
  }
  function fm() {
    ul && (ul.detachEvent("onpropertychange", hm), cl = ul = null);
  }
  function hm(e) {
    if (e.propertyName === "value" && Ls(cl)) {
      var t = [];
      om(
        t,
        cl,
        e,
        Bu(e)
      ), Zh(jS, t);
    }
  }
  function TS(e, t, i) {
    e === "focusin" ? (fm(), ul = t, cl = i, ul.attachEvent("onpropertychange", hm)) : e === "focusout" && fm();
  }
  function CS(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Ls(cl);
  }
  function NS(e, t) {
    if (e === "click") return Ls(t);
  }
  function MS(e, t) {
    if (e === "input" || e === "change")
      return Ls(t);
  }
  function RS(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var xn = typeof Object.is == "function" ? Object.is : RS;
  function dl(e, t) {
    if (xn(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var i = Object.keys(e), l = Object.keys(t);
    if (i.length !== l.length) return !1;
    for (l = 0; l < i.length; l++) {
      var u = i[l];
      if (!Xt.call(t, u) || !xn(e[u], t[u]))
        return !1;
    }
    return !0;
  }
  function mm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function pm(e, t) {
    var i = mm(e);
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
      i = mm(i);
    }
  }
  function gm(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? gm(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function vm(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Ms(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var i = typeof t.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) e = t.contentWindow;
      else break;
      t = Ms(e.document);
    }
    return t;
  }
  function Zu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var AS = ba && "documentMode" in document && 11 >= document.documentMode, ur = null, Pu = null, fl = null, Ju = !1;
  function ym(e, t, i) {
    var l = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Ju || ur == null || ur !== Ms(l) || (l = ur, "selectionStart" in l && Zu(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), fl && dl(fl, l) || (fl = l, l = jo(Pu, "onSelect"), 0 < l.length && (t = new zs(
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
  }, Wu = {}, bm = {};
  ba && (bm = document.createElement("div").style, "AnimationEvent" in window || (delete cr.animationend.animation, delete cr.animationiteration.animation, delete cr.animationstart.animation), "TransitionEvent" in window || delete cr.transitionend.transition);
  function Ai(e) {
    if (Wu[e]) return Wu[e];
    if (!cr[e]) return e;
    var t = cr[e], i;
    for (i in t)
      if (t.hasOwnProperty(i) && i in bm)
        return Wu[e] = t[i];
    return e;
  }
  var xm = Ai("animationend"), Sm = Ai("animationiteration"), wm = Ai("animationstart"), _S = Ai("transitionrun"), DS = Ai("transitionstart"), zS = Ai("transitioncancel"), Em = Ai("transitionend"), jm = /* @__PURE__ */ new Map(), ec = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  ec.push("scrollEnd");
  function Jn(e, t) {
    jm.set(e, t), Yt(t, [e]);
  }
  var Us = typeof reportError == "function" ? reportError : function(e) {
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
  }, Ln = [], dr = 0, tc = 0;
  function ks() {
    for (var e = dr, t = tc = dr = 0; t < e; ) {
      var i = Ln[t];
      Ln[t++] = null;
      var l = Ln[t];
      Ln[t++] = null;
      var u = Ln[t];
      Ln[t++] = null;
      var d = Ln[t];
      if (Ln[t++] = null, l !== null && u !== null) {
        var y = l.pending;
        y === null ? u.next = u : (u.next = y.next, y.next = u), l.pending = u;
      }
      d !== 0 && Tm(i, u, d);
    }
  }
  function Vs(e, t, i, l) {
    Ln[dr++] = e, Ln[dr++] = t, Ln[dr++] = i, Ln[dr++] = l, tc |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function nc(e, t, i, l) {
    return Vs(e, t, i, l), Bs(e);
  }
  function _i(e, t) {
    return Vs(e, null, null, t), Bs(e);
  }
  function Tm(e, t, i) {
    e.lanes |= i;
    var l = e.alternate;
    l !== null && (l.lanes |= i);
    for (var u = !1, d = e.return; d !== null; )
      d.childLanes |= i, l = d.alternate, l !== null && (l.childLanes |= i), d.tag === 22 && (e = d.stateNode, e === null || e._visibility & 1 || (u = !0)), e = d, d = d.return;
    return e.tag === 3 ? (d = e.stateNode, u && t !== null && (u = 31 - qt(i), e = d.hiddenUpdates, l = e[u], l === null ? e[u] = [t] : l.push(t), t.lane = i | 536870912), d) : null;
  }
  function Bs(e) {
    if (50 < Ol)
      throw Ol = 0, dd = null, Error(s(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var fr = {};
  function OS(e, t, i, l) {
    this.tag = e, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Sn(e, t, i, l) {
    return new OS(e, t, i, l);
  }
  function ac(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function xa(e, t) {
    var i = e.alternate;
    return i === null ? (i = Sn(
      e.tag,
      t,
      e.key,
      e.mode
    ), i.elementType = e.elementType, i.type = e.type, i.stateNode = e.stateNode, i.alternate = e, e.alternate = i) : (i.pendingProps = t, i.type = e.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = e.flags & 65011712, i.childLanes = e.childLanes, i.lanes = e.lanes, i.child = e.child, i.memoizedProps = e.memoizedProps, i.memoizedState = e.memoizedState, i.updateQueue = e.updateQueue, t = e.dependencies, i.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, i.sibling = e.sibling, i.index = e.index, i.ref = e.ref, i.refCleanup = e.refCleanup, i;
  }
  function Cm(e, t) {
    e.flags &= 65011714;
    var i = e.alternate;
    return i === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = i.childLanes, e.lanes = i.lanes, e.child = i.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = i.memoizedProps, e.memoizedState = i.memoizedState, e.updateQueue = i.updateQueue, e.type = i.type, t = i.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Hs(e, t, i, l, u, d) {
    var y = 0;
    if (l = e, typeof e == "function") ac(e) && (y = 1);
    else if (typeof e == "string")
      y = Bw(
        e,
        i,
        ie.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case B:
          return e = Sn(31, i, t, u), e.elementType = B, e.lanes = d, e;
        case T:
          return Di(i.children, u, d, t);
        case _:
          y = 8, u |= 24;
          break;
        case C:
          return e = Sn(12, i, t, u | 2), e.elementType = C, e.lanes = d, e;
        case X:
          return e = Sn(13, i, t, u), e.elementType = X, e.lanes = d, e;
        case $:
          return e = Sn(19, i, t, u), e.elementType = $, e.lanes = d, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case O:
                y = 10;
                break e;
              case z:
                y = 9;
                break e;
              case R:
                y = 11;
                break e;
              case Q:
                y = 14;
                break e;
              case M:
                y = 16, l = null;
                break e;
            }
          y = 29, i = Error(
            s(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = Sn(y, i, t, u), t.elementType = e, t.type = l, t.lanes = d, t;
  }
  function Di(e, t, i, l) {
    return e = Sn(7, e, l, t), e.lanes = i, e;
  }
  function ic(e, t, i) {
    return e = Sn(6, e, null, t), e.lanes = i, e;
  }
  function Nm(e) {
    var t = Sn(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function rc(e, t, i) {
    return t = Sn(
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
  var Mm = /* @__PURE__ */ new WeakMap();
  function Un(e, t) {
    if (typeof e == "object" && e !== null) {
      var i = Mm.get(e);
      return i !== void 0 ? i : (t = {
        value: e,
        source: t,
        stack: ma(t)
      }, Mm.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: ma(t)
    };
  }
  var hr = [], mr = 0, qs = null, hl = 0, kn = [], Vn = 0, Ia = null, oa = 1, ua = "";
  function Sa(e, t) {
    hr[mr++] = hl, hr[mr++] = qs, qs = e, hl = t;
  }
  function Rm(e, t, i) {
    kn[Vn++] = oa, kn[Vn++] = ua, kn[Vn++] = Ia, Ia = e;
    var l = oa;
    e = ua;
    var u = 32 - qt(l) - 1;
    l &= ~(1 << u), i += 1;
    var d = 32 - qt(t) + u;
    if (30 < d) {
      var y = u - u % 5;
      d = (l & (1 << y) - 1).toString(32), l >>= y, u -= y, oa = 1 << 32 - qt(t) + u | i << u | l, ua = d + e;
    } else
      oa = 1 << d | i << u | l, ua = e;
  }
  function lc(e) {
    e.return !== null && (Sa(e, 1), Rm(e, 1, 0));
  }
  function sc(e) {
    for (; e === qs; )
      qs = hr[--mr], hr[mr] = null, hl = hr[--mr], hr[mr] = null;
    for (; e === Ia; )
      Ia = kn[--Vn], kn[Vn] = null, ua = kn[--Vn], kn[Vn] = null, oa = kn[--Vn], kn[Vn] = null;
  }
  function Am(e, t) {
    kn[Vn++] = oa, kn[Vn++] = ua, kn[Vn++] = Ia, oa = t.id, ua = t.overflow, Ia = e;
  }
  var Zt = null, pt = null, Ke = !1, Ya = null, Bn = !1, oc = Error(s(519));
  function Fa(e) {
    var t = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw ml(Un(t, e)), oc;
  }
  function _m(e) {
    var t = e.stateNode, i = e.type, l = e.memoizedProps;
    switch (t[he] = e, t[me] = l, i) {
      case "dialog":
        Fe("cancel", t), Fe("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Fe("load", t);
        break;
      case "video":
      case "audio":
        for (i = 0; i < Ul.length; i++)
          Fe(Ul[i], t);
        break;
      case "source":
        Fe("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Fe("error", t), Fe("load", t);
        break;
      case "details":
        Fe("toggle", t);
        break;
      case "input":
        Fe("invalid", t), Yh(
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
        Fe("invalid", t);
        break;
      case "textarea":
        Fe("invalid", t), Gh(t, l.value, l.defaultValue, l.children);
    }
    i = l.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || t.textContent === "" + i || l.suppressHydrationWarning === !0 || Kg(t.textContent, i) ? (l.popover != null && (Fe("beforetoggle", t), Fe("toggle", t)), l.onScroll != null && Fe("scroll", t), l.onScrollEnd != null && Fe("scrollend", t), l.onClick != null && (t.onclick = ya), t = !0) : t = !1, t || Fa(e, !0);
  }
  function Dm(e) {
    for (Zt = e.return; Zt; )
      switch (Zt.tag) {
        case 5:
        case 31:
        case 13:
          Bn = !1;
          return;
        case 27:
        case 3:
          Bn = !0;
          return;
        default:
          Zt = Zt.return;
      }
  }
  function pr(e) {
    if (e !== Zt) return !1;
    if (!Ke) return Dm(e), Ke = !0, !1;
    var t = e.tag, i;
    if ((i = t !== 3 && t !== 27) && ((i = t === 5) && (i = e.type, i = !(i !== "form" && i !== "button") || Cd(e.type, e.memoizedProps)), i = !i), i && pt && Fa(e), Dm(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      pt = av(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      pt = av(e);
    } else
      t === 27 ? (t = pt, ri(e.type) ? (e = _d, _d = null, pt = e) : pt = t) : pt = Zt ? qn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function zi() {
    pt = Zt = null, Ke = !1;
  }
  function uc() {
    var e = Ya;
    return e !== null && (mn === null ? mn = e : mn.push.apply(
      mn,
      e
    ), Ya = null), e;
  }
  function ml(e) {
    Ya === null ? Ya = [e] : Ya.push(e);
  }
  var cc = N(null), Oi = null, wa = null;
  function Ga(e, t, i) {
    W(cc, t._currentValue), t._currentValue = i;
  }
  function Ea(e) {
    e._currentValue = cc.current, P(cc);
  }
  function dc(e, t, i) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === i) break;
      e = e.return;
    }
  }
  function fc(e, t, i, l) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var d = u.dependencies;
      if (d !== null) {
        var y = u.child;
        d = d.firstContext;
        e: for (; d !== null; ) {
          var E = d;
          d = u;
          for (var D = 0; D < t.length; D++)
            if (E.context === t[D]) {
              d.lanes |= i, E = d.alternate, E !== null && (E.lanes |= i), dc(
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
        y.lanes |= i, d = y.alternate, d !== null && (d.lanes |= i), dc(y, i, e), y = null;
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
          xn(u.pendingProps.value, y.value) || (e !== null ? e.push(E) : e = [E]);
        }
      } else if (u === De.current) {
        if (y = u.alternate, y === null) throw Error(s(387));
        y.memoizedState.memoizedState !== u.memoizedState.memoizedState && (e !== null ? e.push(ql) : e = [ql]);
      }
      u = u.return;
    }
    e !== null && fc(
      t,
      e,
      i,
      l
    ), t.flags |= 262144;
  }
  function $s(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!xn(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Li(e) {
    Oi = e, wa = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Pt(e) {
    return zm(Oi, e);
  }
  function Is(e, t) {
    return Oi === null && Li(e), zm(e, t);
  }
  function zm(e, t) {
    var i = t._currentValue;
    if (t = { context: t, memoizedValue: i, next: null }, wa === null) {
      if (e === null) throw Error(s(308));
      wa = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else wa = wa.next = t;
    return i;
  }
  var LS = typeof AbortController < "u" ? AbortController : function() {
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
  }, US = n.unstable_scheduleCallback, kS = n.unstable_NormalPriority, Dt = {
    $$typeof: O,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function hc() {
    return {
      controller: new LS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function pl(e) {
    e.refCount--, e.refCount === 0 && US(kS, function() {
      e.controller.abort();
    });
  }
  var gl = null, mc = 0, vr = 0, yr = null;
  function VS(e, t) {
    if (gl === null) {
      var i = gl = [];
      mc = 0, vr = vd(), yr = {
        status: "pending",
        value: void 0,
        then: function(l) {
          i.push(l);
        }
      };
    }
    return mc++, t.then(Om, Om), t;
  }
  function Om() {
    if (--mc === 0 && gl !== null) {
      yr !== null && (yr.status = "fulfilled");
      var e = gl;
      gl = null, vr = 0, yr = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function BS(e, t) {
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
  var Lm = U.S;
  U.S = function(e, t) {
    yg = Vt(), typeof t == "object" && t !== null && typeof t.then == "function" && VS(e, t), Lm !== null && Lm(e, t);
  };
  var Ui = N(null);
  function pc() {
    var e = Ui.current;
    return e !== null ? e : ft.pooledCache;
  }
  function Ys(e, t) {
    t === null ? W(Ui, Ui.current) : W(Ui, t.pool);
  }
  function Um() {
    var e = pc();
    return e === null ? null : { parent: Dt._currentValue, pool: e };
  }
  var br = Error(s(460)), gc = Error(s(474)), Fs = Error(s(542)), Gs = { then: function() {
  } };
  function km(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Vm(e, t, i) {
    switch (i = e[i], i === void 0 ? e.push(t) : i !== t && (t.then(ya, ya), t = i), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Hm(e), e;
      default:
        if (typeof t.status == "string") t.then(ya, ya);
        else {
          if (e = ft, e !== null && 100 < e.shellSuspendCounter)
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
            throw e = t.reason, Hm(e), e;
        }
        throw Vi = t, br;
    }
  }
  function ki(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (Vi = i, br) : i;
    }
  }
  var Vi = null;
  function Bm() {
    if (Vi === null) throw Error(s(459));
    var e = Vi;
    return Vi = null, e;
  }
  function Hm(e) {
    if (e === br || e === Fs)
      throw Error(s(483));
  }
  var xr = null, vl = 0;
  function Xs(e) {
    var t = vl;
    return vl += 1, xr === null && (xr = []), Vm(xr, e, t);
  }
  function yl(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Ks(e, t) {
    throw t.$$typeof === S ? Error(s(525)) : (e = Object.prototype.toString.call(t), Error(
      s(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function qm(e) {
    function t(H, L) {
      if (e) {
        var Y = H.deletions;
        Y === null ? (H.deletions = [L], H.flags |= 16) : Y.push(L);
      }
    }
    function i(H, L) {
      if (!e) return null;
      for (; L !== null; )
        t(H, L), L = L.sibling;
      return null;
    }
    function l(H) {
      for (var L = /* @__PURE__ */ new Map(); H !== null; )
        H.key !== null ? L.set(H.key, H) : L.set(H.index, H), H = H.sibling;
      return L;
    }
    function u(H, L) {
      return H = xa(H, L), H.index = 0, H.sibling = null, H;
    }
    function d(H, L, Y) {
      return H.index = Y, e ? (Y = H.alternate, Y !== null ? (Y = Y.index, Y < L ? (H.flags |= 67108866, L) : Y) : (H.flags |= 67108866, L)) : (H.flags |= 1048576, L);
    }
    function y(H) {
      return e && H.alternate === null && (H.flags |= 67108866), H;
    }
    function E(H, L, Y, te) {
      return L === null || L.tag !== 6 ? (L = ic(Y, H.mode, te), L.return = H, L) : (L = u(L, Y), L.return = H, L);
    }
    function D(H, L, Y, te) {
      var Ne = Y.type;
      return Ne === T ? ee(
        H,
        L,
        Y.props.children,
        te,
        Y.key
      ) : L !== null && (L.elementType === Ne || typeof Ne == "object" && Ne !== null && Ne.$$typeof === M && ki(Ne) === L.type) ? (L = u(L, Y.props), yl(L, Y), L.return = H, L) : (L = Hs(
        Y.type,
        Y.key,
        Y.props,
        null,
        H.mode,
        te
      ), yl(L, Y), L.return = H, L);
    }
    function F(H, L, Y, te) {
      return L === null || L.tag !== 4 || L.stateNode.containerInfo !== Y.containerInfo || L.stateNode.implementation !== Y.implementation ? (L = rc(Y, H.mode, te), L.return = H, L) : (L = u(L, Y.children || []), L.return = H, L);
    }
    function ee(H, L, Y, te, Ne) {
      return L === null || L.tag !== 7 ? (L = Di(
        Y,
        H.mode,
        te,
        Ne
      ), L.return = H, L) : (L = u(L, Y), L.return = H, L);
    }
    function ne(H, L, Y) {
      if (typeof L == "string" && L !== "" || typeof L == "number" || typeof L == "bigint")
        return L = ic(
          "" + L,
          H.mode,
          Y
        ), L.return = H, L;
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case w:
            return Y = Hs(
              L.type,
              L.key,
              L.props,
              null,
              H.mode,
              Y
            ), yl(Y, L), Y.return = H, Y;
          case j:
            return L = rc(
              L,
              H.mode,
              Y
            ), L.return = H, L;
          case M:
            return L = ki(L), ne(H, L, Y);
        }
        if (le(L) || oe(L))
          return L = Di(
            L,
            H.mode,
            Y,
            null
          ), L.return = H, L;
        if (typeof L.then == "function")
          return ne(H, Xs(L), Y);
        if (L.$$typeof === O)
          return ne(
            H,
            Is(H, L),
            Y
          );
        Ks(H, L);
      }
      return null;
    }
    function G(H, L, Y, te) {
      var Ne = L !== null ? L.key : null;
      if (typeof Y == "string" && Y !== "" || typeof Y == "number" || typeof Y == "bigint")
        return Ne !== null ? null : E(H, L, "" + Y, te);
      if (typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case w:
            return Y.key === Ne ? D(H, L, Y, te) : null;
          case j:
            return Y.key === Ne ? F(H, L, Y, te) : null;
          case M:
            return Y = ki(Y), G(H, L, Y, te);
        }
        if (le(Y) || oe(Y))
          return Ne !== null ? null : ee(H, L, Y, te, null);
        if (typeof Y.then == "function")
          return G(
            H,
            L,
            Xs(Y),
            te
          );
        if (Y.$$typeof === O)
          return G(
            H,
            L,
            Is(H, Y),
            te
          );
        Ks(H, Y);
      }
      return null;
    }
    function K(H, L, Y, te, Ne) {
      if (typeof te == "string" && te !== "" || typeof te == "number" || typeof te == "bigint")
        return H = H.get(Y) || null, E(L, H, "" + te, Ne);
      if (typeof te == "object" && te !== null) {
        switch (te.$$typeof) {
          case w:
            return H = H.get(
              te.key === null ? Y : te.key
            ) || null, D(L, H, te, Ne);
          case j:
            return H = H.get(
              te.key === null ? Y : te.key
            ) || null, F(L, H, te, Ne);
          case M:
            return te = ki(te), K(
              H,
              L,
              Y,
              te,
              Ne
            );
        }
        if (le(te) || oe(te))
          return H = H.get(Y) || null, ee(L, H, te, Ne, null);
        if (typeof te.then == "function")
          return K(
            H,
            L,
            Y,
            Xs(te),
            Ne
          );
        if (te.$$typeof === O)
          return K(
            H,
            L,
            Y,
            Is(L, te),
            Ne
          );
        Ks(L, te);
      }
      return null;
    }
    function xe(H, L, Y, te) {
      for (var Ne = null, Je = null, Te = L, Ve = L = 0, Xe = null; Te !== null && Ve < Y.length; Ve++) {
        Te.index > Ve ? (Xe = Te, Te = null) : Xe = Te.sibling;
        var We = G(
          H,
          Te,
          Y[Ve],
          te
        );
        if (We === null) {
          Te === null && (Te = Xe);
          break;
        }
        e && Te && We.alternate === null && t(H, Te), L = d(We, L, Ve), Je === null ? Ne = We : Je.sibling = We, Je = We, Te = Xe;
      }
      if (Ve === Y.length)
        return i(H, Te), Ke && Sa(H, Ve), Ne;
      if (Te === null) {
        for (; Ve < Y.length; Ve++)
          Te = ne(H, Y[Ve], te), Te !== null && (L = d(
            Te,
            L,
            Ve
          ), Je === null ? Ne = Te : Je.sibling = Te, Je = Te);
        return Ke && Sa(H, Ve), Ne;
      }
      for (Te = l(Te); Ve < Y.length; Ve++)
        Xe = K(
          Te,
          H,
          Ve,
          Y[Ve],
          te
        ), Xe !== null && (e && Xe.alternate !== null && Te.delete(
          Xe.key === null ? Ve : Xe.key
        ), L = d(
          Xe,
          L,
          Ve
        ), Je === null ? Ne = Xe : Je.sibling = Xe, Je = Xe);
      return e && Te.forEach(function(ci) {
        return t(H, ci);
      }), Ke && Sa(H, Ve), Ne;
    }
    function _e(H, L, Y, te) {
      if (Y == null) throw Error(s(151));
      for (var Ne = null, Je = null, Te = L, Ve = L = 0, Xe = null, We = Y.next(); Te !== null && !We.done; Ve++, We = Y.next()) {
        Te.index > Ve ? (Xe = Te, Te = null) : Xe = Te.sibling;
        var ci = G(H, Te, We.value, te);
        if (ci === null) {
          Te === null && (Te = Xe);
          break;
        }
        e && Te && ci.alternate === null && t(H, Te), L = d(ci, L, Ve), Je === null ? Ne = ci : Je.sibling = ci, Je = ci, Te = Xe;
      }
      if (We.done)
        return i(H, Te), Ke && Sa(H, Ve), Ne;
      if (Te === null) {
        for (; !We.done; Ve++, We = Y.next())
          We = ne(H, We.value, te), We !== null && (L = d(We, L, Ve), Je === null ? Ne = We : Je.sibling = We, Je = We);
        return Ke && Sa(H, Ve), Ne;
      }
      for (Te = l(Te); !We.done; Ve++, We = Y.next())
        We = K(Te, H, Ve, We.value, te), We !== null && (e && We.alternate !== null && Te.delete(We.key === null ? Ve : We.key), L = d(We, L, Ve), Je === null ? Ne = We : Je.sibling = We, Je = We);
      return e && Te.forEach(function(Zw) {
        return t(H, Zw);
      }), Ke && Sa(H, Ve), Ne;
    }
    function ut(H, L, Y, te) {
      if (typeof Y == "object" && Y !== null && Y.type === T && Y.key === null && (Y = Y.props.children), typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case w:
            e: {
              for (var Ne = Y.key; L !== null; ) {
                if (L.key === Ne) {
                  if (Ne = Y.type, Ne === T) {
                    if (L.tag === 7) {
                      i(
                        H,
                        L.sibling
                      ), te = u(
                        L,
                        Y.props.children
                      ), te.return = H, H = te;
                      break e;
                    }
                  } else if (L.elementType === Ne || typeof Ne == "object" && Ne !== null && Ne.$$typeof === M && ki(Ne) === L.type) {
                    i(
                      H,
                      L.sibling
                    ), te = u(L, Y.props), yl(te, Y), te.return = H, H = te;
                    break e;
                  }
                  i(H, L);
                  break;
                } else t(H, L);
                L = L.sibling;
              }
              Y.type === T ? (te = Di(
                Y.props.children,
                H.mode,
                te,
                Y.key
              ), te.return = H, H = te) : (te = Hs(
                Y.type,
                Y.key,
                Y.props,
                null,
                H.mode,
                te
              ), yl(te, Y), te.return = H, H = te);
            }
            return y(H);
          case j:
            e: {
              for (Ne = Y.key; L !== null; ) {
                if (L.key === Ne)
                  if (L.tag === 4 && L.stateNode.containerInfo === Y.containerInfo && L.stateNode.implementation === Y.implementation) {
                    i(
                      H,
                      L.sibling
                    ), te = u(L, Y.children || []), te.return = H, H = te;
                    break e;
                  } else {
                    i(H, L);
                    break;
                  }
                else t(H, L);
                L = L.sibling;
              }
              te = rc(Y, H.mode, te), te.return = H, H = te;
            }
            return y(H);
          case M:
            return Y = ki(Y), ut(
              H,
              L,
              Y,
              te
            );
        }
        if (le(Y))
          return xe(
            H,
            L,
            Y,
            te
          );
        if (oe(Y)) {
          if (Ne = oe(Y), typeof Ne != "function") throw Error(s(150));
          return Y = Ne.call(Y), _e(
            H,
            L,
            Y,
            te
          );
        }
        if (typeof Y.then == "function")
          return ut(
            H,
            L,
            Xs(Y),
            te
          );
        if (Y.$$typeof === O)
          return ut(
            H,
            L,
            Is(H, Y),
            te
          );
        Ks(H, Y);
      }
      return typeof Y == "string" && Y !== "" || typeof Y == "number" || typeof Y == "bigint" ? (Y = "" + Y, L !== null && L.tag === 6 ? (i(H, L.sibling), te = u(L, Y), te.return = H, H = te) : (i(H, L), te = ic(Y, H.mode, te), te.return = H, H = te), y(H)) : i(H, L);
    }
    return function(H, L, Y, te) {
      try {
        vl = 0;
        var Ne = ut(
          H,
          L,
          Y,
          te
        );
        return xr = null, Ne;
      } catch (Te) {
        if (Te === br || Te === Fs) throw Te;
        var Je = Sn(29, Te, null, H.mode);
        return Je.lanes = te, Je.return = H, Je;
      } finally {
      }
    };
  }
  var Bi = qm(!0), $m = qm(!1), Xa = !1;
  function vc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function yc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Ka(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Qa(e, t, i) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (et & 2) !== 0) {
      var u = l.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), l.pending = t, t = Bs(e), Tm(e, null, i), t;
    }
    return Vs(e, l, t, i), Bs(e);
  }
  function bl(e, t, i) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (i & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, i |= l, t.lanes = i, tn(e, i);
    }
  }
  function bc(e, t) {
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
  var xc = !1;
  function xl() {
    if (xc) {
      var e = yr;
      if (e !== null) throw e;
    }
  }
  function Sl(e, t, i, l) {
    xc = !1;
    var u = e.updateQueue;
    Xa = !1;
    var d = u.firstBaseUpdate, y = u.lastBaseUpdate, E = u.shared.pending;
    if (E !== null) {
      u.shared.pending = null;
      var D = E, F = D.next;
      D.next = null, y === null ? d = F : y.next = F, y = D;
      var ee = e.alternate;
      ee !== null && (ee = ee.updateQueue, E = ee.lastBaseUpdate, E !== y && (E === null ? ee.firstBaseUpdate = F : E.next = F, ee.lastBaseUpdate = D));
    }
    if (d !== null) {
      var ne = u.baseState;
      y = 0, ee = F = D = null, E = d;
      do {
        var G = E.lane & -536870913, K = G !== E.lane;
        if (K ? (Ge & G) === G : (l & G) === G) {
          G !== 0 && G === vr && (xc = !0), ee !== null && (ee = ee.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var xe = e, _e = E;
            G = t;
            var ut = i;
            switch (_e.tag) {
              case 1:
                if (xe = _e.payload, typeof xe == "function") {
                  ne = xe.call(ut, ne, G);
                  break e;
                }
                ne = xe;
                break e;
              case 3:
                xe.flags = xe.flags & -65537 | 128;
              case 0:
                if (xe = _e.payload, G = typeof xe == "function" ? xe.call(ut, ne, G) : xe, G == null) break e;
                ne = v({}, ne, G);
                break e;
              case 2:
                Xa = !0;
            }
          }
          G = E.callback, G !== null && (e.flags |= 64, K && (e.flags |= 8192), K = u.callbacks, K === null ? u.callbacks = [G] : K.push(G));
        } else
          K = {
            lane: G,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          }, ee === null ? (F = ee = K, D = ne) : ee = ee.next = K, y |= G;
        if (E = E.next, E === null) {
          if (E = u.shared.pending, E === null)
            break;
          K = E, E = K.next, K.next = null, u.lastBaseUpdate = K, u.shared.pending = null;
        }
      } while (!0);
      ee === null && (D = ne), u.baseState = D, u.firstBaseUpdate = F, u.lastBaseUpdate = ee, d === null && (u.shared.lanes = 0), ei |= y, e.lanes = y, e.memoizedState = ne;
    }
  }
  function Im(e, t) {
    if (typeof e != "function")
      throw Error(s(191, e));
    e.call(t);
  }
  function Ym(e, t) {
    var i = e.callbacks;
    if (i !== null)
      for (e.callbacks = null, e = 0; e < i.length; e++)
        Im(i[e], t);
  }
  var Sr = N(null), Qs = N(0);
  function Fm(e, t) {
    e = Da, W(Qs, e), W(Sr, t), Da = e | t.baseLanes;
  }
  function Sc() {
    W(Qs, Da), W(Sr, Sr.current);
  }
  function wc() {
    Da = Qs.current, P(Sr), P(Qs);
  }
  var wn = N(null), Hn = null;
  function Za(e) {
    var t = e.alternate;
    W(Ct, Ct.current & 1), W(wn, e), Hn === null && (t === null || Sr.current !== null || t.memoizedState !== null) && (Hn = e);
  }
  function Ec(e) {
    W(Ct, Ct.current), W(wn, e), Hn === null && (Hn = e);
  }
  function Gm(e) {
    e.tag === 22 ? (W(Ct, Ct.current), W(wn, e), Hn === null && (Hn = e)) : Pa();
  }
  function Pa() {
    W(Ct, Ct.current), W(wn, wn.current);
  }
  function En(e) {
    P(wn), Hn === e && (Hn = null), P(Ct);
  }
  var Ct = N(0);
  function Zs(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var i = t.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || Rd(i) || Ad(i)))
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
  var ja = 0, ke = null, st = null, zt = null, Ps = !1, wr = !1, Hi = !1, Js = 0, wl = 0, Er = null, HS = 0;
  function St() {
    throw Error(s(321));
  }
  function jc(e, t) {
    if (t === null) return !1;
    for (var i = 0; i < t.length && i < e.length; i++)
      if (!xn(e[i], t[i])) return !1;
    return !0;
  }
  function Tc(e, t, i, l, u, d) {
    return ja = d, ke = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, U.H = e === null || e.memoizedState === null ? Rp : Hc, Hi = !1, d = i(l, u), Hi = !1, wr && (d = Km(
      t,
      i,
      l,
      u
    )), Xm(e), d;
  }
  function Xm(e) {
    U.H = Tl;
    var t = st !== null && st.next !== null;
    if (ja = 0, zt = st = ke = null, Ps = !1, wl = 0, Er = null, t) throw Error(s(300));
    e === null || Ot || (e = e.dependencies, e !== null && $s(e) && (Ot = !0));
  }
  function Km(e, t, i, l) {
    ke = e;
    var u = 0;
    do {
      if (wr && (Er = null), wl = 0, wr = !1, 25 <= u) throw Error(s(301));
      if (u += 1, zt = st = null, e.updateQueue != null) {
        var d = e.updateQueue;
        d.lastEffect = null, d.events = null, d.stores = null, d.memoCache != null && (d.memoCache.index = 0);
      }
      U.H = Ap, d = t(i, l);
    } while (wr);
    return d;
  }
  function qS() {
    var e = U.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? El(t) : t, e = e.useState()[0], (st !== null ? st.memoizedState : null) !== e && (ke.flags |= 1024), t;
  }
  function Cc() {
    var e = Js !== 0;
    return Js = 0, e;
  }
  function Nc(e, t, i) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i;
  }
  function Mc(e) {
    if (Ps) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Ps = !1;
    }
    ja = 0, zt = st = ke = null, wr = !1, wl = Js = 0, Er = null;
  }
  function on() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return zt === null ? ke.memoizedState = zt = e : zt = zt.next = e, zt;
  }
  function Nt() {
    if (st === null) {
      var e = ke.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = st.next;
    var t = zt === null ? ke.memoizedState : zt.next;
    if (t !== null)
      zt = t, st = e;
    else {
      if (e === null)
        throw ke.alternate === null ? Error(s(467)) : Error(s(310));
      st = e, e = {
        memoizedState: st.memoizedState,
        baseState: st.baseState,
        baseQueue: st.baseQueue,
        queue: st.queue,
        next: null
      }, zt === null ? ke.memoizedState = zt = e : zt = zt.next = e;
    }
    return zt;
  }
  function Ws() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function El(e) {
    var t = wl;
    return wl += 1, Er === null && (Er = []), e = Vm(Er, e, t), t = ke, (zt === null ? t.memoizedState : zt.next) === null && (t = t.alternate, U.H = t === null || t.memoizedState === null ? Rp : Hc), e;
  }
  function eo(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return El(e);
      if (e.$$typeof === O) return Pt(e);
    }
    throw Error(s(438, String(e)));
  }
  function Rc(e) {
    var t = null, i = ke.updateQueue;
    if (i !== null && (t = i.memoCache), t == null) {
      var l = ke.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), i === null && (i = Ws(), ke.updateQueue = i), i.memoCache = t, i = t.data[t.index], i === void 0)
      for (i = t.data[t.index] = Array(e), l = 0; l < e; l++)
        i[l] = J;
    return t.index++, i;
  }
  function Ta(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function to(e) {
    var t = Nt();
    return Ac(t, st, e);
  }
  function Ac(e, t, i) {
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
      var E = y = null, D = null, F = t, ee = !1;
      do {
        var ne = F.lane & -536870913;
        if (ne !== F.lane ? (Ge & ne) === ne : (ja & ne) === ne) {
          var G = F.revertLane;
          if (G === 0)
            D !== null && (D = D.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: F.action,
              hasEagerState: F.hasEagerState,
              eagerState: F.eagerState,
              next: null
            }), ne === vr && (ee = !0);
          else if ((ja & G) === G) {
            F = F.next, G === vr && (ee = !0);
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
            }, D === null ? (E = D = ne, y = d) : D = D.next = ne, ke.lanes |= G, ei |= G;
          ne = F.action, Hi && i(d, ne), d = F.hasEagerState ? F.eagerState : i(d, ne);
        } else
          G = {
            lane: ne,
            revertLane: F.revertLane,
            gesture: F.gesture,
            action: F.action,
            hasEagerState: F.hasEagerState,
            eagerState: F.eagerState,
            next: null
          }, D === null ? (E = D = G, y = d) : D = D.next = G, ke.lanes |= ne, ei |= ne;
        F = F.next;
      } while (F !== null && F !== t);
      if (D === null ? y = d : D.next = E, !xn(d, e.memoizedState) && (Ot = !0, ee && (i = yr, i !== null)))
        throw i;
      e.memoizedState = d, e.baseState = y, e.baseQueue = D, l.lastRenderedState = d;
    }
    return u === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function _c(e) {
    var t = Nt(), i = t.queue;
    if (i === null) throw Error(s(311));
    i.lastRenderedReducer = e;
    var l = i.dispatch, u = i.pending, d = t.memoizedState;
    if (u !== null) {
      i.pending = null;
      var y = u = u.next;
      do
        d = e(d, y.action), y = y.next;
      while (y !== u);
      xn(d, t.memoizedState) || (Ot = !0), t.memoizedState = d, t.baseQueue === null && (t.baseState = d), i.lastRenderedState = d;
    }
    return [d, l];
  }
  function Qm(e, t, i) {
    var l = ke, u = Nt(), d = Ke;
    if (d) {
      if (i === void 0) throw Error(s(407));
      i = i();
    } else i = t();
    var y = !xn(
      (st || u).memoizedState,
      i
    );
    if (y && (u.memoizedState = i, Ot = !0), u = u.queue, Oc(Jm.bind(null, l, u, e), [
      e
    ]), u.getSnapshot !== t || y || zt !== null && zt.memoizedState.tag & 1) {
      if (l.flags |= 2048, jr(
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
      ), ft === null) throw Error(s(349));
      d || (ja & 127) !== 0 || Zm(l, t, i);
    }
    return i;
  }
  function Zm(e, t, i) {
    e.flags |= 16384, e = { getSnapshot: t, value: i }, t = ke.updateQueue, t === null ? (t = Ws(), ke.updateQueue = t, t.stores = [e]) : (i = t.stores, i === null ? t.stores = [e] : i.push(e));
  }
  function Pm(e, t, i, l) {
    t.value = i, t.getSnapshot = l, Wm(t) && ep(e);
  }
  function Jm(e, t, i) {
    return i(function() {
      Wm(t) && ep(e);
    });
  }
  function Wm(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var i = t();
      return !xn(e, i);
    } catch {
      return !0;
    }
  }
  function ep(e) {
    var t = _i(e, 2);
    t !== null && pn(t, e, 2);
  }
  function Dc(e) {
    var t = on();
    if (typeof e == "function") {
      var i = e;
      if (e = i(), Hi) {
        jt(!0);
        try {
          i();
        } finally {
          jt(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ta,
      lastRenderedState: e
    }, t;
  }
  function tp(e, t, i, l) {
    return e.baseState = i, Ac(
      e,
      st,
      typeof l == "function" ? l : Ta
    );
  }
  function $S(e, t, i, l, u) {
    if (io(e)) throw Error(s(485));
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
      U.T !== null ? i(!0) : d.isTransition = !1, l(d), i = t.pending, i === null ? (d.next = t.pending = d, np(t, d)) : (d.next = i.next, t.pending = i.next = d);
    }
  }
  function np(e, t) {
    var i = t.action, l = t.payload, u = e.state;
    if (t.isTransition) {
      var d = U.T, y = {};
      U.T = y;
      try {
        var E = i(u, l), D = U.S;
        D !== null && D(y, E), ap(e, t, E);
      } catch (F) {
        zc(e, t, F);
      } finally {
        d !== null && y.types !== null && (d.types = y.types), U.T = d;
      }
    } else
      try {
        d = i(u, l), ap(e, t, d);
      } catch (F) {
        zc(e, t, F);
      }
  }
  function ap(e, t, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(l) {
        ip(e, t, l);
      },
      function(l) {
        return zc(e, t, l);
      }
    ) : ip(e, t, i);
  }
  function ip(e, t, i) {
    t.status = "fulfilled", t.value = i, rp(t), e.state = i, t = e.pending, t !== null && (i = t.next, i === t ? e.pending = null : (i = i.next, t.next = i, np(e, i)));
  }
  function zc(e, t, i) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = i, rp(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function rp(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function lp(e, t) {
    return t;
  }
  function sp(e, t) {
    if (Ke) {
      var i = ft.formState;
      if (i !== null) {
        e: {
          var l = ke;
          if (Ke) {
            if (pt) {
              t: {
                for (var u = pt, d = Bn; u.nodeType !== 8; ) {
                  if (!d) {
                    u = null;
                    break t;
                  }
                  if (u = qn(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                d = u.data, u = d === "F!" || d === "F" ? u : null;
              }
              if (u) {
                pt = qn(
                  u.nextSibling
                ), l = u.data === "F!";
                break e;
              }
            }
            Fa(l);
          }
          l = !1;
        }
        l && (t = i[0]);
      }
    }
    return i = on(), i.memoizedState = i.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: lp,
      lastRenderedState: t
    }, i.queue = l, i = Cp.bind(
      null,
      ke,
      l
    ), l.dispatch = i, l = Dc(!1), d = Bc.bind(
      null,
      ke,
      !1,
      l.queue
    ), l = on(), u = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = u, i = $S.bind(
      null,
      ke,
      u,
      d,
      i
    ), u.dispatch = i, l.memoizedState = e, [t, i, !1];
  }
  function op(e) {
    var t = Nt();
    return up(t, st, e);
  }
  function up(e, t, i) {
    if (t = Ac(
      e,
      t,
      lp
    )[0], e = to(Ta)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = El(t);
      } catch (y) {
        throw y === br ? Fs : y;
      }
    else l = t;
    t = Nt();
    var u = t.queue, d = u.dispatch;
    return i !== t.memoizedState && (ke.flags |= 2048, jr(
      9,
      { destroy: void 0 },
      IS.bind(null, u, i),
      null
    )), [l, d, e];
  }
  function IS(e, t) {
    e.action = t;
  }
  function cp(e) {
    var t = Nt(), i = st;
    if (i !== null)
      return up(t, i, e);
    Nt(), t = t.memoizedState, i = Nt();
    var l = i.queue.dispatch;
    return i.memoizedState = e, [t, l, !1];
  }
  function jr(e, t, i, l) {
    return e = { tag: e, create: i, deps: l, inst: t, next: null }, t = ke.updateQueue, t === null && (t = Ws(), ke.updateQueue = t), i = t.lastEffect, i === null ? t.lastEffect = e.next = e : (l = i.next, i.next = e, e.next = l, t.lastEffect = e), e;
  }
  function dp() {
    return Nt().memoizedState;
  }
  function no(e, t, i, l) {
    var u = on();
    ke.flags |= e, u.memoizedState = jr(
      1 | t,
      { destroy: void 0 },
      i,
      l === void 0 ? null : l
    );
  }
  function ao(e, t, i, l) {
    var u = Nt();
    l = l === void 0 ? null : l;
    var d = u.memoizedState.inst;
    st !== null && l !== null && jc(l, st.memoizedState.deps) ? u.memoizedState = jr(t, d, i, l) : (ke.flags |= e, u.memoizedState = jr(
      1 | t,
      d,
      i,
      l
    ));
  }
  function fp(e, t) {
    no(8390656, 8, e, t);
  }
  function Oc(e, t) {
    ao(2048, 8, e, t);
  }
  function YS(e) {
    ke.flags |= 4;
    var t = ke.updateQueue;
    if (t === null)
      t = Ws(), ke.updateQueue = t, t.events = [e];
    else {
      var i = t.events;
      i === null ? t.events = [e] : i.push(e);
    }
  }
  function hp(e) {
    var t = Nt().memoizedState;
    return YS({ ref: t, nextImpl: e }), function() {
      if ((et & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function mp(e, t) {
    return ao(4, 2, e, t);
  }
  function pp(e, t) {
    return ao(4, 4, e, t);
  }
  function gp(e, t) {
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
  function vp(e, t, i) {
    i = i != null ? i.concat([e]) : null, ao(4, 4, gp.bind(null, t, e), i);
  }
  function Lc() {
  }
  function yp(e, t) {
    var i = Nt();
    t = t === void 0 ? null : t;
    var l = i.memoizedState;
    return t !== null && jc(t, l[1]) ? l[0] : (i.memoizedState = [e, t], e);
  }
  function bp(e, t) {
    var i = Nt();
    t = t === void 0 ? null : t;
    var l = i.memoizedState;
    if (t !== null && jc(t, l[1]))
      return l[0];
    if (l = e(), Hi) {
      jt(!0);
      try {
        e();
      } finally {
        jt(!1);
      }
    }
    return i.memoizedState = [l, t], l;
  }
  function Uc(e, t, i) {
    return i === void 0 || (ja & 1073741824) !== 0 && (Ge & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = i, e = xg(), ke.lanes |= e, ei |= e, i);
  }
  function xp(e, t, i, l) {
    return xn(i, t) ? i : Sr.current !== null ? (e = Uc(e, i, l), xn(e, t) || (Ot = !0), e) : (ja & 42) === 0 || (ja & 1073741824) !== 0 && (Ge & 261930) === 0 ? (Ot = !0, e.memoizedState = i) : (e = xg(), ke.lanes |= e, ei |= e, t);
  }
  function Sp(e, t, i, l, u) {
    var d = k.p;
    k.p = d !== 0 && 8 > d ? d : 8;
    var y = U.T, E = {};
    U.T = E, Bc(e, !1, t, i);
    try {
      var D = u(), F = U.S;
      if (F !== null && F(E, D), D !== null && typeof D == "object" && typeof D.then == "function") {
        var ee = BS(
          D,
          l
        );
        jl(
          e,
          t,
          ee,
          Cn(e)
        );
      } else
        jl(
          e,
          t,
          l,
          Cn(e)
        );
    } catch (ne) {
      jl(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: ne },
        Cn()
      );
    } finally {
      k.p = d, y !== null && E.types !== null && (y.types = E.types), U.T = y;
    }
  }
  function FS() {
  }
  function kc(e, t, i, l) {
    if (e.tag !== 5) throw Error(s(476));
    var u = wp(e).queue;
    Sp(
      e,
      u,
      t,
      q,
      i === null ? FS : function() {
        return Ep(e), i(l);
      }
    );
  }
  function wp(e) {
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
        lastRenderedReducer: Ta,
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
        lastRenderedReducer: Ta,
        lastRenderedState: i
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Ep(e) {
    var t = wp(e);
    t.next === null && (t = e.alternate.memoizedState), jl(
      e,
      t.next.queue,
      {},
      Cn()
    );
  }
  function Vc() {
    return Pt(ql);
  }
  function jp() {
    return Nt().memoizedState;
  }
  function Tp() {
    return Nt().memoizedState;
  }
  function GS(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var i = Cn();
          e = Ka(i);
          var l = Qa(t, e, i);
          l !== null && (pn(l, t, i), bl(l, t, i)), t = { cache: hc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function XS(e, t, i) {
    var l = Cn();
    i = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, io(e) ? Np(t, i) : (i = nc(e, t, i, l), i !== null && (pn(i, e, l), Mp(i, t, l)));
  }
  function Cp(e, t, i) {
    var l = Cn();
    jl(e, t, i, l);
  }
  function jl(e, t, i, l) {
    var u = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (io(e)) Np(t, u);
    else {
      var d = e.alternate;
      if (e.lanes === 0 && (d === null || d.lanes === 0) && (d = t.lastRenderedReducer, d !== null))
        try {
          var y = t.lastRenderedState, E = d(y, i);
          if (u.hasEagerState = !0, u.eagerState = E, xn(E, y))
            return Vs(e, t, u, 0), ft === null && ks(), !1;
        } catch {
        } finally {
        }
      if (i = nc(e, t, u, l), i !== null)
        return pn(i, e, l), Mp(i, t, l), !0;
    }
    return !1;
  }
  function Bc(e, t, i, l) {
    if (l = {
      lane: 2,
      revertLane: vd(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, io(e)) {
      if (t) throw Error(s(479));
    } else
      t = nc(
        e,
        i,
        l,
        2
      ), t !== null && pn(t, e, 2);
  }
  function io(e) {
    var t = e.alternate;
    return e === ke || t !== null && t === ke;
  }
  function Np(e, t) {
    wr = Ps = !0;
    var i = e.pending;
    i === null ? t.next = t : (t.next = i.next, i.next = t), e.pending = t;
  }
  function Mp(e, t, i) {
    if ((i & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, i |= l, t.lanes = i, tn(e, i);
    }
  }
  var Tl = {
    readContext: Pt,
    use: eo,
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
  Tl.useEffectEvent = St;
  var Rp = {
    readContext: Pt,
    use: eo,
    useCallback: function(e, t) {
      return on().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Pt,
    useEffect: fp,
    useImperativeHandle: function(e, t, i) {
      i = i != null ? i.concat([e]) : null, no(
        4194308,
        4,
        gp.bind(null, t, e),
        i
      );
    },
    useLayoutEffect: function(e, t) {
      return no(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      no(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var i = on();
      t = t === void 0 ? null : t;
      var l = e();
      if (Hi) {
        jt(!0);
        try {
          e();
        } finally {
          jt(!1);
        }
      }
      return i.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, i) {
      var l = on();
      if (i !== void 0) {
        var u = i(t);
        if (Hi) {
          jt(!0);
          try {
            i(t);
          } finally {
            jt(!1);
          }
        }
      } else u = t;
      return l.memoizedState = l.baseState = u, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      }, l.queue = e, e = e.dispatch = XS.bind(
        null,
        ke,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = on();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Dc(e);
      var t = e.queue, i = Cp.bind(null, ke, t);
      return t.dispatch = i, [e.memoizedState, i];
    },
    useDebugValue: Lc,
    useDeferredValue: function(e, t) {
      var i = on();
      return Uc(i, e, t);
    },
    useTransition: function() {
      var e = Dc(!1);
      return e = Sp.bind(
        null,
        ke,
        e.queue,
        !0,
        !1
      ), on().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, i) {
      var l = ke, u = on();
      if (Ke) {
        if (i === void 0)
          throw Error(s(407));
        i = i();
      } else {
        if (i = t(), ft === null)
          throw Error(s(349));
        (Ge & 127) !== 0 || Zm(l, t, i);
      }
      u.memoizedState = i;
      var d = { value: i, getSnapshot: t };
      return u.queue = d, fp(Jm.bind(null, l, d, e), [
        e
      ]), l.flags |= 2048, jr(
        9,
        { destroy: void 0 },
        Pm.bind(
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
      var e = on(), t = ft.identifierPrefix;
      if (Ke) {
        var i = ua, l = oa;
        i = (l & ~(1 << 32 - qt(l) - 1)).toString(32) + i, t = "_" + t + "R_" + i, i = Js++, 0 < i && (t += "H" + i.toString(32)), t += "_";
      } else
        i = HS++, t = "_" + t + "r_" + i.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Vc,
    useFormState: sp,
    useActionState: sp,
    useOptimistic: function(e) {
      var t = on();
      t.memoizedState = t.baseState = e;
      var i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = i, t = Bc.bind(
        null,
        ke,
        !0,
        i
      ), i.dispatch = t, [e, t];
    },
    useMemoCache: Rc,
    useCacheRefresh: function() {
      return on().memoizedState = GS.bind(
        null,
        ke
      );
    },
    useEffectEvent: function(e) {
      var t = on(), i = { impl: e };
      return t.memoizedState = i, function() {
        if ((et & 2) !== 0)
          throw Error(s(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, Hc = {
    readContext: Pt,
    use: eo,
    useCallback: yp,
    useContext: Pt,
    useEffect: Oc,
    useImperativeHandle: vp,
    useInsertionEffect: mp,
    useLayoutEffect: pp,
    useMemo: bp,
    useReducer: to,
    useRef: dp,
    useState: function() {
      return to(Ta);
    },
    useDebugValue: Lc,
    useDeferredValue: function(e, t) {
      var i = Nt();
      return xp(
        i,
        st.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = to(Ta)[0], t = Nt().memoizedState;
      return [
        typeof e == "boolean" ? e : El(e),
        t
      ];
    },
    useSyncExternalStore: Qm,
    useId: jp,
    useHostTransitionStatus: Vc,
    useFormState: op,
    useActionState: op,
    useOptimistic: function(e, t) {
      var i = Nt();
      return tp(i, st, e, t);
    },
    useMemoCache: Rc,
    useCacheRefresh: Tp
  };
  Hc.useEffectEvent = hp;
  var Ap = {
    readContext: Pt,
    use: eo,
    useCallback: yp,
    useContext: Pt,
    useEffect: Oc,
    useImperativeHandle: vp,
    useInsertionEffect: mp,
    useLayoutEffect: pp,
    useMemo: bp,
    useReducer: _c,
    useRef: dp,
    useState: function() {
      return _c(Ta);
    },
    useDebugValue: Lc,
    useDeferredValue: function(e, t) {
      var i = Nt();
      return st === null ? Uc(i, e, t) : xp(
        i,
        st.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = _c(Ta)[0], t = Nt().memoizedState;
      return [
        typeof e == "boolean" ? e : El(e),
        t
      ];
    },
    useSyncExternalStore: Qm,
    useId: jp,
    useHostTransitionStatus: Vc,
    useFormState: cp,
    useActionState: cp,
    useOptimistic: function(e, t) {
      var i = Nt();
      return st !== null ? tp(i, st, e, t) : (i.baseState = e, [e, i.queue.dispatch]);
    },
    useMemoCache: Rc,
    useCacheRefresh: Tp
  };
  Ap.useEffectEvent = hp;
  function qc(e, t, i, l) {
    t = e.memoizedState, i = i(l, t), i = i == null ? t : v({}, t, i), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
  }
  var $c = {
    enqueueSetState: function(e, t, i) {
      e = e._reactInternals;
      var l = Cn(), u = Ka(l);
      u.payload = t, i != null && (u.callback = i), t = Qa(e, u, l), t !== null && (pn(t, e, l), bl(t, e, l));
    },
    enqueueReplaceState: function(e, t, i) {
      e = e._reactInternals;
      var l = Cn(), u = Ka(l);
      u.tag = 1, u.payload = t, i != null && (u.callback = i), t = Qa(e, u, l), t !== null && (pn(t, e, l), bl(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var i = Cn(), l = Ka(i);
      l.tag = 2, t != null && (l.callback = t), t = Qa(e, l, i), t !== null && (pn(t, e, i), bl(t, e, i));
    }
  };
  function _p(e, t, i, l, u, d, y) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, d, y) : t.prototype && t.prototype.isPureReactComponent ? !dl(i, l) || !dl(u, d) : !0;
  }
  function Dp(e, t, i, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(i, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(i, l), t.state !== e && $c.enqueueReplaceState(t, t.state, null);
  }
  function qi(e, t) {
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
  function zp(e) {
    Us(e);
  }
  function Op(e) {
    console.error(e);
  }
  function Lp(e) {
    Us(e);
  }
  function ro(e, t) {
    try {
      var i = e.onUncaughtError;
      i(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function Up(e, t, i) {
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
  function Ic(e, t, i) {
    return i = Ka(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      ro(e, t);
    }, i;
  }
  function kp(e) {
    return e = Ka(e), e.tag = 3, e;
  }
  function Vp(e, t, i, l) {
    var u = i.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var d = l.value;
      e.payload = function() {
        return u(d);
      }, e.callback = function() {
        Up(t, i, l);
      };
    }
    var y = i.stateNode;
    y !== null && typeof y.componentDidCatch == "function" && (e.callback = function() {
      Up(t, i, l), typeof u != "function" && (ti === null ? ti = /* @__PURE__ */ new Set([this]) : ti.add(this));
      var E = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function KS(e, t, i, l, u) {
    if (i.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = i.alternate, t !== null && gr(
        t,
        i,
        u,
        !0
      ), i = wn.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return Hn === null ? yo() : i.alternate === null && wt === 0 && (wt = 3), i.flags &= -257, i.flags |= 65536, i.lanes = u, l === Gs ? i.flags |= 16384 : (t = i.updateQueue, t === null ? i.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), md(e, l, u)), !1;
          case 22:
            return i.flags |= 65536, l === Gs ? i.flags |= 16384 : (t = i.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, i.updateQueue = t) : (i = t.retryQueue, i === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : i.add(l)), md(e, l, u)), !1;
        }
        throw Error(s(435, i.tag));
      }
      return md(e, l, u), yo(), !1;
    }
    if (Ke)
      return t = wn.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, l !== oc && (e = Error(s(422), { cause: l }), ml(Un(e, i)))) : (l !== oc && (t = Error(s(423), {
        cause: l
      }), ml(
        Un(t, i)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, l = Un(l, i), u = Ic(
        e.stateNode,
        l,
        u
      ), bc(e, u), wt !== 4 && (wt = 2)), !1;
    var d = Error(s(520), { cause: l });
    if (d = Un(d, i), zl === null ? zl = [d] : zl.push(d), wt !== 4 && (wt = 2), t === null) return !0;
    l = Un(l, i), i = t;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, e = u & -u, i.lanes |= e, e = Ic(i.stateNode, l, e), bc(i, e), !1;
        case 1:
          if (t = i.type, d = i.stateNode, (i.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (ti === null || !ti.has(d))))
            return i.flags |= 65536, u &= -u, i.lanes |= u, u = kp(u), Vp(
              u,
              e,
              i,
              l
            ), bc(i, u), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var Yc = Error(s(461)), Ot = !1;
  function Jt(e, t, i, l) {
    t.child = e === null ? $m(t, null, i, l) : Bi(
      t,
      e.child,
      i,
      l
    );
  }
  function Bp(e, t, i, l, u) {
    i = i.render;
    var d = t.ref;
    if ("ref" in l) {
      var y = {};
      for (var E in l)
        E !== "ref" && (y[E] = l[E]);
    } else y = l;
    return Li(t), l = Tc(
      e,
      t,
      i,
      y,
      d,
      u
    ), E = Cc(), e !== null && !Ot ? (Nc(e, t, u), Ca(e, t, u)) : (Ke && E && lc(t), t.flags |= 1, Jt(e, t, l, u), t.child);
  }
  function Hp(e, t, i, l, u) {
    if (e === null) {
      var d = i.type;
      return typeof d == "function" && !ac(d) && d.defaultProps === void 0 && i.compare === null ? (t.tag = 15, t.type = d, qp(
        e,
        t,
        d,
        l,
        u
      )) : (e = Hs(
        i.type,
        null,
        l,
        t,
        t.mode,
        u
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (d = e.child, !Jc(e, u)) {
      var y = d.memoizedProps;
      if (i = i.compare, i = i !== null ? i : dl, i(y, l) && e.ref === t.ref)
        return Ca(e, t, u);
    }
    return t.flags |= 1, e = xa(d, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function qp(e, t, i, l, u) {
    if (e !== null) {
      var d = e.memoizedProps;
      if (dl(d, l) && e.ref === t.ref)
        if (Ot = !1, t.pendingProps = l = d, Jc(e, u))
          (e.flags & 131072) !== 0 && (Ot = !0);
        else
          return t.lanes = e.lanes, Ca(e, t, u);
    }
    return Fc(
      e,
      t,
      i,
      l,
      u
    );
  }
  function $p(e, t, i, l) {
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
        return Ip(
          e,
          t,
          d,
          i,
          l
        );
      }
      if ((i & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Ys(
          t,
          d !== null ? d.cachePool : null
        ), d !== null ? Fm(t, d) : Sc(), Gm(t);
      else
        return l = t.lanes = 536870912, Ip(
          e,
          t,
          d !== null ? d.baseLanes | i : i,
          i,
          l
        );
    } else
      d !== null ? (Ys(t, d.cachePool), Fm(t, d), Pa(), t.memoizedState = null) : (e !== null && Ys(t, null), Sc(), Pa());
    return Jt(e, t, u, i), t.child;
  }
  function Cl(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Ip(e, t, i, l, u) {
    var d = pc();
    return d = d === null ? null : { parent: Dt._currentValue, pool: d }, t.memoizedState = {
      baseLanes: i,
      cachePool: d
    }, e !== null && Ys(t, null), Sc(), Gm(t), e !== null && gr(e, t, l, !0), t.childLanes = u, null;
  }
  function lo(e, t) {
    return t = oo(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Yp(e, t, i) {
    return Bi(t, e.child, null, i), e = lo(t, t.pendingProps), e.flags |= 2, En(t), t.memoizedState = null, e;
  }
  function QS(e, t, i) {
    var l = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Ke) {
        if (l.mode === "hidden")
          return e = lo(t, l), t.lanes = 536870912, Cl(null, e);
        if (Ec(t), (e = pt) ? (e = nv(
          e,
          Bn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Ia !== null ? { id: oa, overflow: ua } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Nm(e), i.return = t, t.child = i, Zt = t, pt = null)) : e = null, e === null) throw Fa(t);
        return t.lanes = 536870912, null;
      }
      return lo(t, l);
    }
    var d = e.memoizedState;
    if (d !== null) {
      var y = d.dehydrated;
      if (Ec(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = Yp(
            e,
            t,
            i
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(s(558));
      else if (Ot || gr(e, t, i, !1), u = (i & e.childLanes) !== 0, Ot || u) {
        if (l = ft, l !== null && (y = A(l, i), y !== 0 && y !== d.retryLane))
          throw d.retryLane = y, _i(e, y), pn(l, e, y), Yc;
        yo(), t = Yp(
          e,
          t,
          i
        );
      } else
        e = d.treeContext, pt = qn(y.nextSibling), Zt = t, Ke = !0, Ya = null, Bn = !1, e !== null && Am(t, e), t = lo(t, l), t.flags |= 4096;
      return t;
    }
    return e = xa(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function so(e, t) {
    var i = t.ref;
    if (i === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(s(284));
      (e === null || e.ref !== i) && (t.flags |= 4194816);
    }
  }
  function Fc(e, t, i, l, u) {
    return Li(t), i = Tc(
      e,
      t,
      i,
      l,
      void 0,
      u
    ), l = Cc(), e !== null && !Ot ? (Nc(e, t, u), Ca(e, t, u)) : (Ke && l && lc(t), t.flags |= 1, Jt(e, t, i, u), t.child);
  }
  function Fp(e, t, i, l, u, d) {
    return Li(t), t.updateQueue = null, i = Km(
      t,
      l,
      i,
      u
    ), Xm(e), l = Cc(), e !== null && !Ot ? (Nc(e, t, d), Ca(e, t, d)) : (Ke && l && lc(t), t.flags |= 1, Jt(e, t, i, d), t.child);
  }
  function Gp(e, t, i, l, u) {
    if (Li(t), t.stateNode === null) {
      var d = fr, y = i.contextType;
      typeof y == "object" && y !== null && (d = Pt(y)), d = new i(l, d), t.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null, d.updater = $c, t.stateNode = d, d._reactInternals = t, d = t.stateNode, d.props = l, d.state = t.memoizedState, d.refs = {}, vc(t), y = i.contextType, d.context = typeof y == "object" && y !== null ? Pt(y) : fr, d.state = t.memoizedState, y = i.getDerivedStateFromProps, typeof y == "function" && (qc(
        t,
        i,
        y,
        l
      ), d.state = t.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof d.getSnapshotBeforeUpdate == "function" || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (y = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), y !== d.state && $c.enqueueReplaceState(d, d.state, null), Sl(t, l, d, u), xl(), d.state = t.memoizedState), typeof d.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      d = t.stateNode;
      var E = t.memoizedProps, D = qi(i, E);
      d.props = D;
      var F = d.context, ee = i.contextType;
      y = fr, typeof ee == "object" && ee !== null && (y = Pt(ee));
      var ne = i.getDerivedStateFromProps;
      ee = typeof ne == "function" || typeof d.getSnapshotBeforeUpdate == "function", E = t.pendingProps !== E, ee || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (E || F !== y) && Dp(
        t,
        d,
        l,
        y
      ), Xa = !1;
      var G = t.memoizedState;
      d.state = G, Sl(t, l, d, u), xl(), F = t.memoizedState, E || G !== F || Xa ? (typeof ne == "function" && (qc(
        t,
        i,
        ne,
        l
      ), F = t.memoizedState), (D = Xa || _p(
        t,
        i,
        D,
        l,
        G,
        F,
        y
      )) ? (ee || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = F), d.props = l, d.state = F, d.context = y, l = D) : (typeof d.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      d = t.stateNode, yc(e, t), y = t.memoizedProps, ee = qi(i, y), d.props = ee, ne = t.pendingProps, G = d.context, F = i.contextType, D = fr, typeof F == "object" && F !== null && (D = Pt(F)), E = i.getDerivedStateFromProps, (F = typeof E == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (y !== ne || G !== D) && Dp(
        t,
        d,
        l,
        D
      ), Xa = !1, G = t.memoizedState, d.state = G, Sl(t, l, d, u), xl();
      var K = t.memoizedState;
      y !== ne || G !== K || Xa || e !== null && e.dependencies !== null && $s(e.dependencies) ? (typeof E == "function" && (qc(
        t,
        i,
        E,
        l
      ), K = t.memoizedState), (ee = Xa || _p(
        t,
        i,
        ee,
        l,
        G,
        K,
        D
      ) || e !== null && e.dependencies !== null && $s(e.dependencies)) ? (F || typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function" || (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(l, K, D), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(
        l,
        K,
        D
      )), typeof d.componentDidUpdate == "function" && (t.flags |= 4), typeof d.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof d.componentDidUpdate != "function" || y === e.memoizedProps && G === e.memoizedState || (t.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && G === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = K), d.props = l, d.state = K, d.context = D, l = ee) : (typeof d.componentDidUpdate != "function" || y === e.memoizedProps && G === e.memoizedState || (t.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && G === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return d = l, so(e, t), l = (t.flags & 128) !== 0, d || l ? (d = t.stateNode, i = l && typeof i.getDerivedStateFromError != "function" ? null : d.render(), t.flags |= 1, e !== null && l ? (t.child = Bi(
      t,
      e.child,
      null,
      u
    ), t.child = Bi(
      t,
      null,
      i,
      u
    )) : Jt(e, t, i, u), t.memoizedState = d.state, e = t.child) : e = Ca(
      e,
      t,
      u
    ), e;
  }
  function Xp(e, t, i, l) {
    return zi(), t.flags |= 256, Jt(e, t, i, l), t.child;
  }
  var Gc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Xc(e) {
    return { baseLanes: e, cachePool: Um() };
  }
  function Kc(e, t, i) {
    return e = e !== null ? e.childLanes & ~i : 0, t && (e |= Tn), e;
  }
  function Kp(e, t, i) {
    var l = t.pendingProps, u = !1, d = (t.flags & 128) !== 0, y;
    if ((y = d) || (y = e !== null && e.memoizedState === null ? !1 : (Ct.current & 2) !== 0), y && (u = !0, t.flags &= -129), y = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Ke) {
        if (u ? Za(t) : Pa(), (e = pt) ? (e = nv(
          e,
          Bn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Ia !== null ? { id: oa, overflow: ua } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Nm(e), i.return = t, t.child = i, Zt = t, pt = null)) : e = null, e === null) throw Fa(t);
        return Ad(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var E = l.children;
      return l = l.fallback, u ? (Pa(), u = t.mode, E = oo(
        { mode: "hidden", children: E },
        u
      ), l = Di(
        l,
        u,
        i,
        null
      ), E.return = t, l.return = t, E.sibling = l, t.child = E, l = t.child, l.memoizedState = Xc(i), l.childLanes = Kc(
        e,
        y,
        i
      ), t.memoizedState = Gc, Cl(null, l)) : (Za(t), Qc(t, E));
    }
    var D = e.memoizedState;
    if (D !== null && (E = D.dehydrated, E !== null)) {
      if (d)
        t.flags & 256 ? (Za(t), t.flags &= -257, t = Zc(
          e,
          t,
          i
        )) : t.memoizedState !== null ? (Pa(), t.child = e.child, t.flags |= 128, t = null) : (Pa(), E = l.fallback, u = t.mode, l = oo(
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
        ), l = t.child, l.memoizedState = Xc(i), l.childLanes = Kc(
          e,
          y,
          i
        ), t.memoizedState = Gc, t = Cl(null, l));
      else if (Za(t), Ad(E)) {
        if (y = E.nextSibling && E.nextSibling.dataset, y) var F = y.dgst;
        y = F, l = Error(s(419)), l.stack = "", l.digest = y, ml({ value: l, source: null, stack: null }), t = Zc(
          e,
          t,
          i
        );
      } else if (Ot || gr(e, t, i, !1), y = (i & e.childLanes) !== 0, Ot || y) {
        if (y = ft, y !== null && (l = A(y, i), l !== 0 && l !== D.retryLane))
          throw D.retryLane = l, _i(e, l), pn(y, e, l), Yc;
        Rd(E) || yo(), t = Zc(
          e,
          t,
          i
        );
      } else
        Rd(E) ? (t.flags |= 192, t.child = e.child, t = null) : (e = D.treeContext, pt = qn(
          E.nextSibling
        ), Zt = t, Ke = !0, Ya = null, Bn = !1, e !== null && Am(t, e), t = Qc(
          t,
          l.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (Pa(), E = l.fallback, u = t.mode, D = e.child, F = D.sibling, l = xa(D, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = D.subtreeFlags & 65011712, F !== null ? E = xa(
      F,
      E
    ) : (E = Di(
      E,
      u,
      i,
      null
    ), E.flags |= 2), E.return = t, l.return = t, l.sibling = E, t.child = l, Cl(null, l), l = t.child, E = e.child.memoizedState, E === null ? E = Xc(i) : (u = E.cachePool, u !== null ? (D = Dt._currentValue, u = u.parent !== D ? { parent: D, pool: D } : u) : u = Um(), E = {
      baseLanes: E.baseLanes | i,
      cachePool: u
    }), l.memoizedState = E, l.childLanes = Kc(
      e,
      y,
      i
    ), t.memoizedState = Gc, Cl(e.child, l)) : (Za(t), i = e.child, e = i.sibling, i = xa(i, {
      mode: "visible",
      children: l.children
    }), i.return = t, i.sibling = null, e !== null && (y = t.deletions, y === null ? (t.deletions = [e], t.flags |= 16) : y.push(e)), t.child = i, t.memoizedState = null, i);
  }
  function Qc(e, t) {
    return t = oo(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function oo(e, t) {
    return e = Sn(22, e, null, t), e.lanes = 0, e;
  }
  function Zc(e, t, i) {
    return Bi(t, e.child, null, i), e = Qc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Qp(e, t, i) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), dc(e.return, t, i);
  }
  function Pc(e, t, i, l, u, d) {
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
  function Zp(e, t, i) {
    var l = t.pendingProps, u = l.revealOrder, d = l.tail;
    l = l.children;
    var y = Ct.current, E = (y & 2) !== 0;
    if (E ? (y = y & 1 | 2, t.flags |= 128) : y &= 1, W(Ct, y), Jt(e, t, l, i), l = Ke ? hl : 0, !E && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Qp(e, i, t);
        else if (e.tag === 19)
          Qp(e, i, t);
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
          e = i.alternate, e !== null && Zs(e) === null && (u = i), i = i.sibling;
        i = u, i === null ? (u = t.child, t.child = null) : (u = i.sibling, i.sibling = null), Pc(
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
          if (e = u.alternate, e !== null && Zs(e) === null) {
            t.child = u;
            break;
          }
          e = u.sibling, u.sibling = i, i = u, u = e;
        }
        Pc(
          t,
          !0,
          i,
          null,
          d,
          l
        );
        break;
      case "together":
        Pc(
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
  function Ca(e, t, i) {
    if (e !== null && (t.dependencies = e.dependencies), ei |= t.lanes, (i & t.childLanes) === 0)
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
      for (e = t.child, i = xa(e, e.pendingProps), t.child = i, i.return = t; e.sibling !== null; )
        e = e.sibling, i = i.sibling = xa(e, e.pendingProps), i.return = t;
      i.sibling = null;
    }
    return t.child;
  }
  function Jc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && $s(e)));
  }
  function ZS(e, t, i) {
    switch (t.tag) {
      case 3:
        Re(t, t.stateNode.containerInfo), Ga(t, Dt, e.memoizedState.cache), zi();
        break;
      case 27:
      case 5:
        fe(t);
        break;
      case 4:
        Re(t, t.stateNode.containerInfo);
        break;
      case 10:
        Ga(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Ec(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (Za(t), t.flags |= 128, null) : (i & t.child.childLanes) !== 0 ? Kp(e, t, i) : (Za(t), e = Ca(
            e,
            t,
            i
          ), e !== null ? e.sibling : null);
        Za(t);
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
            return Zp(
              e,
              t,
              i
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), W(Ct, Ct.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, $p(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        Ga(t, Dt, e.memoizedState.cache);
    }
    return Ca(e, t, i);
  }
  function Pp(e, t, i) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Ot = !0;
      else {
        if (!Jc(e, i) && (t.flags & 128) === 0)
          return Ot = !1, ZS(
            e,
            t,
            i
          );
        Ot = (e.flags & 131072) !== 0;
      }
    else
      Ot = !1, Ke && (t.flags & 1048576) !== 0 && Rm(t, hl, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = ki(t.elementType), t.type = e, typeof e == "function")
            ac(e) ? (l = qi(e, l), t.tag = 1, t = Gp(
              null,
              t,
              e,
              l,
              i
            )) : (t.tag = 0, t = Fc(
              null,
              t,
              e,
              l,
              i
            ));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === R) {
                t.tag = 11, t = Bp(
                  null,
                  t,
                  e,
                  l,
                  i
                );
                break e;
              } else if (u === Q) {
                t.tag = 14, t = Hp(
                  null,
                  t,
                  e,
                  l,
                  i
                );
                break e;
              }
            }
            throw t = Se(e) || e, Error(s(306, t, ""));
          }
        }
        return t;
      case 0:
        return Fc(
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
        ), Gp(
          e,
          t,
          l,
          u,
          i
        );
      case 3:
        e: {
          if (Re(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(s(387));
          l = t.pendingProps;
          var d = t.memoizedState;
          u = d.element, yc(e, t), Sl(t, l, null, i);
          var y = t.memoizedState;
          if (l = y.cache, Ga(t, Dt, l), l !== d.cache && fc(
            t,
            [Dt],
            i,
            !0
          ), xl(), l = y.element, d.isDehydrated)
            if (d = {
              element: l,
              isDehydrated: !1,
              cache: y.cache
            }, t.updateQueue.baseState = d, t.memoizedState = d, t.flags & 256) {
              t = Xp(
                e,
                t,
                l,
                i
              );
              break e;
            } else if (l !== u) {
              u = Un(
                Error(s(424)),
                t
              ), ml(u), t = Xp(
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
              for (pt = qn(e.firstChild), Zt = t, Ke = !0, Ya = null, Bn = !0, i = $m(
                t,
                null,
                l,
                i
              ), t.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (zi(), l === u) {
              t = Ca(
                e,
                t,
                i
              );
              break e;
            }
            Jt(e, t, l, i);
          }
          t = t.child;
        }
        return t;
      case 26:
        return so(e, t), e === null ? (i = ov(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = i : Ke || (i = t.type, e = t.pendingProps, l = To(
          ye.current
        ).createElement(i), l[he] = t, l[me] = e, Wt(l, i, e), ht(l), t.stateNode = l) : t.memoizedState = ov(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return fe(t), e === null && Ke && (l = t.stateNode = rv(
          t.type,
          t.pendingProps,
          ye.current
        ), Zt = t, Bn = !0, u = pt, ri(t.type) ? (_d = u, pt = qn(l.firstChild)) : pt = u), Jt(
          e,
          t,
          t.pendingProps.children,
          i
        ), so(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Ke && ((u = l = pt) && (l = Cw(
          l,
          t.type,
          t.pendingProps,
          Bn
        ), l !== null ? (t.stateNode = l, Zt = t, pt = qn(l.firstChild), Bn = !1, u = !0) : u = !1), u || Fa(t)), fe(t), u = t.type, d = t.pendingProps, y = e !== null ? e.memoizedProps : null, l = d.children, Cd(u, d) ? l = null : y !== null && Cd(u, y) && (t.flags |= 32), t.memoizedState !== null && (u = Tc(
          e,
          t,
          qS,
          null,
          null,
          i
        ), ql._currentValue = u), so(e, t), Jt(e, t, l, i), t.child;
      case 6:
        return e === null && Ke && ((e = i = pt) && (i = Nw(
          i,
          t.pendingProps,
          Bn
        ), i !== null ? (t.stateNode = i, Zt = t, pt = null, e = !0) : e = !1), e || Fa(t)), null;
      case 13:
        return Kp(e, t, i);
      case 4:
        return Re(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = Bi(
          t,
          null,
          l,
          i
        ) : Jt(e, t, l, i), t.child;
      case 11:
        return Bp(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 7:
        return Jt(
          e,
          t,
          t.pendingProps,
          i
        ), t.child;
      case 8:
        return Jt(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 12:
        return Jt(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 10:
        return l = t.pendingProps, Ga(t, t.type, l.value), Jt(e, t, l.children, i), t.child;
      case 9:
        return u = t.type._context, l = t.pendingProps.children, Li(t), u = Pt(u), l = l(u), t.flags |= 1, Jt(e, t, l, i), t.child;
      case 14:
        return Hp(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 15:
        return qp(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 19:
        return Zp(e, t, i);
      case 31:
        return QS(e, t, i);
      case 22:
        return $p(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        return Li(t), l = Pt(Dt), e === null ? (u = pc(), u === null && (u = ft, d = hc(), u.pooledCache = d, d.refCount++, d !== null && (u.pooledCacheLanes |= i), u = d), t.memoizedState = { parent: l, cache: u }, vc(t), Ga(t, Dt, u)) : ((e.lanes & i) !== 0 && (yc(e, t), Sl(t, null, null, i), xl()), u = e.memoizedState, d = t.memoizedState, u.parent !== l ? (u = { parent: l, cache: l }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), Ga(t, Dt, l)) : (l = d.cache, Ga(t, Dt, l), l !== u.cache && fc(
          t,
          [Dt],
          i,
          !0
        ))), Jt(
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
  function Na(e) {
    e.flags |= 4;
  }
  function Wc(e, t, i, l, u) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (jg()) e.flags |= 8192;
        else
          throw Vi = Gs, gc;
    } else e.flags &= -16777217;
  }
  function Jp(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !hv(t))
      if (jg()) e.flags |= 8192;
      else
        throw Vi = Gs, gc;
  }
  function uo(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? $t() : 536870912, e.lanes |= t, Mr |= t);
  }
  function Nl(e, t) {
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
  function PS(e, t, i) {
    var l = t.pendingProps;
    switch (sc(t), t.tag) {
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
        return i = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), Ea(Dt), Be(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (pr(t) ? Na(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, uc())), gt(t), null;
      case 26:
        var u = t.type, d = t.memoizedState;
        return e === null ? (Na(t), d !== null ? (gt(t), Jp(t, d)) : (gt(t), Wc(
          t,
          u,
          null,
          l,
          i
        ))) : d ? d !== e.memoizedState ? (Na(t), gt(t), Jp(t, d)) : (gt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && Na(t), gt(t), Wc(
          t,
          u,
          e,
          l,
          i
        )), null;
      case 27:
        if (Oe(t), i = ye.current, u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Na(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(s(166));
            return gt(t), null;
          }
          e = ie.current, pr(t) ? _m(t) : (e = rv(u, l, i), t.stateNode = e, Na(t));
        }
        return gt(t), null;
      case 5:
        if (Oe(t), u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Na(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(s(166));
            return gt(t), null;
          }
          if (d = ie.current, pr(t))
            _m(t);
          else {
            var y = To(
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
            d[he] = t, d[me] = l;
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
            e: switch (Wt(d, u, l), u) {
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
            l && Na(t);
          }
        }
        return gt(t), Wc(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          i
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== l && Na(t);
        else {
          if (typeof l != "string" && t.stateNode === null)
            throw Error(s(166));
          if (e = ye.current, pr(t)) {
            if (e = t.stateNode, i = t.memoizedProps, l = null, u = Zt, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  l = u.memoizedProps;
              }
            e[he] = t, e = !!(e.nodeValue === i || l !== null && l.suppressHydrationWarning === !0 || Kg(e.nodeValue, i)), e || Fa(t, !0);
          } else
            e = To(e).createTextNode(
              l
            ), e[he] = t, t.stateNode = e;
        }
        return gt(t), null;
      case 31:
        if (i = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = pr(t), i !== null) {
            if (e === null) {
              if (!l) throw Error(s(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(557));
              e[he] = t;
            } else
              zi(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            gt(t), e = !1;
          } else
            i = uc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), e = !0;
          if (!e)
            return t.flags & 256 ? (En(t), t) : (En(t), null);
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
              u[he] = t;
            } else
              zi(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            gt(t), u = !1;
          } else
            u = uc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (En(t), t) : (En(t), null);
        }
        return En(t), (t.flags & 128) !== 0 ? (t.lanes = i, t) : (i = l !== null, e = e !== null && e.memoizedState !== null, i && (l = t.child, u = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (u = l.alternate.memoizedState.cachePool.pool), d = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (d = l.memoizedState.cachePool.pool), d !== u && (l.flags |= 2048)), i !== e && i && (t.child.flags |= 8192), uo(t, t.updateQueue), gt(t), null);
      case 4:
        return Be(), e === null && Sd(t.stateNode.containerInfo), gt(t), null;
      case 10:
        return Ea(t.type), gt(t), null;
      case 19:
        if (P(Ct), l = t.memoizedState, l === null) return gt(t), null;
        if (u = (t.flags & 128) !== 0, d = l.rendering, d === null)
          if (u) Nl(l, !1);
          else {
            if (wt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (d = Zs(e), d !== null) {
                  for (t.flags |= 128, Nl(l, !1), e = d.updateQueue, t.updateQueue = e, uo(t, e), t.subtreeFlags = 0, e = i, i = t.child; i !== null; )
                    Cm(i, e), i = i.sibling;
                  return W(
                    Ct,
                    Ct.current & 1 | 2
                  ), Ke && Sa(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && Vt() > po && (t.flags |= 128, u = !0, Nl(l, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = Zs(d), e !== null) {
              if (t.flags |= 128, u = !0, e = e.updateQueue, t.updateQueue = e, uo(t, e), Nl(l, !0), l.tail === null && l.tailMode === "hidden" && !d.alternate && !Ke)
                return gt(t), null;
            } else
              2 * Vt() - l.renderingStartTime > po && i !== 536870912 && (t.flags |= 128, u = !0, Nl(l, !1), t.lanes = 4194304);
          l.isBackwards ? (d.sibling = t.child, t.child = d) : (e = l.last, e !== null ? e.sibling = d : t.child = d, l.last = d);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = Vt(), e.sibling = null, i = Ct.current, W(
          Ct,
          u ? i & 1 | 2 : i & 1
        ), Ke && Sa(t, l.treeForkCount), e) : (gt(t), null);
      case 22:
      case 23:
        return En(t), wc(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (i & 536870912) !== 0 && (t.flags & 128) === 0 && (gt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : gt(t), i = t.updateQueue, i !== null && uo(t, i.retryQueue), i = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== i && (t.flags |= 2048), e !== null && P(Ui), null;
      case 24:
        return i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), Ea(Dt), gt(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function JS(e, t) {
    switch (sc(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Ea(Dt), Be(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Oe(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (En(t), t.alternate === null)
            throw Error(s(340));
          zi();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (En(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(s(340));
          zi();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return P(Ct), null;
      case 4:
        return Be(), null;
      case 10:
        return Ea(t.type), null;
      case 22:
      case 23:
        return En(t), wc(), e !== null && P(Ui), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Ea(Dt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Wp(e, t) {
    switch (sc(t), t.tag) {
      case 3:
        Ea(Dt), Be();
        break;
      case 26:
      case 27:
      case 5:
        Oe(t);
        break;
      case 4:
        Be();
        break;
      case 31:
        t.memoizedState !== null && En(t);
        break;
      case 13:
        En(t);
        break;
      case 19:
        P(Ct);
        break;
      case 10:
        Ea(t.type);
        break;
      case 22:
      case 23:
        En(t), wc(), e !== null && P(Ui);
        break;
      case 24:
        Ea(Dt);
    }
  }
  function Ml(e, t) {
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
      it(t, t.return, E);
    }
  }
  function Ja(e, t, i) {
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
              var D = i, F = E;
              try {
                F();
              } catch (ee) {
                it(
                  u,
                  D,
                  ee
                );
              }
            }
          }
          l = l.next;
        } while (l !== d);
      }
    } catch (ee) {
      it(t, t.return, ee);
    }
  }
  function eg(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var i = e.stateNode;
      try {
        Ym(t, i);
      } catch (l) {
        it(e, e.return, l);
      }
    }
  }
  function tg(e, t, i) {
    i.props = qi(
      e.type,
      e.memoizedProps
    ), i.state = e.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (l) {
      it(e, t, l);
    }
  }
  function Rl(e, t) {
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
      it(e, t, u);
    }
  }
  function ca(e, t) {
    var i = e.ref, l = e.refCleanup;
    if (i !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (u) {
          it(e, t, u);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (u) {
          it(e, t, u);
        }
      else i.current = null;
  }
  function ng(e) {
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
      it(e, e.return, u);
    }
  }
  function ed(e, t, i) {
    try {
      var l = e.stateNode;
      xw(l, e.type, i, t), l[me] = t;
    } catch (u) {
      it(e, e.return, u);
    }
  }
  function ag(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ri(e.type) || e.tag === 4;
  }
  function td(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || ag(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && ri(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function nd(e, t, i) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(e, t) : (t = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, t.appendChild(e), i = i._reactRootContainer, i != null || t.onclick !== null || (t.onclick = ya));
    else if (l !== 4 && (l === 27 && ri(e.type) && (i = e.stateNode, t = null), e = e.child, e !== null))
      for (nd(e, t, i), e = e.sibling; e !== null; )
        nd(e, t, i), e = e.sibling;
  }
  function co(e, t, i) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? i.insertBefore(e, t) : i.appendChild(e);
    else if (l !== 4 && (l === 27 && ri(e.type) && (i = e.stateNode), e = e.child, e !== null))
      for (co(e, t, i), e = e.sibling; e !== null; )
        co(e, t, i), e = e.sibling;
  }
  function ig(e) {
    var t = e.stateNode, i = e.memoizedProps;
    try {
      for (var l = e.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      Wt(t, l, i), t[he] = e, t[me] = i;
    } catch (d) {
      it(e, e.return, d);
    }
  }
  var Ma = !1, Lt = !1, ad = !1, rg = typeof WeakSet == "function" ? WeakSet : Set, Ft = null;
  function WS(e, t) {
    if (e = e.containerInfo, jd = Do, e = vm(e), Zu(e)) {
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
            var y = 0, E = -1, D = -1, F = 0, ee = 0, ne = e, G = null;
            t: for (; ; ) {
              for (var K; ne !== i || u !== 0 && ne.nodeType !== 3 || (E = y + u), ne !== d || l !== 0 && ne.nodeType !== 3 || (D = y + l), ne.nodeType === 3 && (y += ne.nodeValue.length), (K = ne.firstChild) !== null; )
                G = ne, ne = K;
              for (; ; ) {
                if (ne === e) break t;
                if (G === i && ++F === u && (E = y), G === d && ++ee === l && (D = y), (K = ne.nextSibling) !== null) break;
                ne = G, G = ne.parentNode;
              }
              ne = K;
            }
            i = E === -1 || D === -1 ? null : { start: E, end: D };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Td = { focusedElem: e, selectionRange: i }, Do = !1, Ft = t; Ft !== null; )
      if (t = Ft, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Ft = e;
      else
        for (; Ft !== null; ) {
          switch (t = Ft, d = t.alternate, e = t.flags, t.tag) {
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
                  var xe = qi(
                    i.type,
                    u
                  );
                  e = l.getSnapshotBeforeUpdate(
                    xe,
                    d
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (_e) {
                  it(
                    i,
                    i.return,
                    _e
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, i = e.nodeType, i === 9)
                  Md(e);
                else if (i === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Md(e);
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
            e.return = t.return, Ft = e;
            break;
          }
          Ft = t.return;
        }
  }
  function lg(e, t, i) {
    var l = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        Aa(e, i), l & 4 && Ml(5, i);
        break;
      case 1:
        if (Aa(e, i), l & 4)
          if (e = i.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (y) {
              it(i, i.return, y);
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
              it(
                i,
                i.return,
                y
              );
            }
          }
        l & 64 && eg(i), l & 512 && Rl(i, i.return);
        break;
      case 3:
        if (Aa(e, i), l & 64 && (e = i.updateQueue, e !== null)) {
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
            Ym(e, t);
          } catch (y) {
            it(i, i.return, y);
          }
        }
        break;
      case 27:
        t === null && l & 4 && ig(i);
      case 26:
      case 5:
        Aa(e, i), t === null && l & 4 && ng(i), l & 512 && Rl(i, i.return);
        break;
      case 12:
        Aa(e, i);
        break;
      case 31:
        Aa(e, i), l & 4 && ug(e, i);
        break;
      case 13:
        Aa(e, i), l & 4 && cg(e, i), l & 64 && (e = i.memoizedState, e !== null && (e = e.dehydrated, e !== null && (i = ow.bind(
          null,
          i
        ), Mw(e, i))));
        break;
      case 22:
        if (l = i.memoizedState !== null || Ma, !l) {
          t = t !== null && t.memoizedState !== null || Lt, u = Ma;
          var d = Lt;
          Ma = l, (Lt = t) && !d ? _a(
            e,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : Aa(e, i), Ma = u, Lt = d;
        }
        break;
      case 30:
        break;
      default:
        Aa(e, i);
    }
  }
  function sg(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, sg(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && dt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var bt = null, dn = !1;
  function Ra(e, t, i) {
    for (i = i.child; i !== null; )
      og(e, t, i), i = i.sibling;
  }
  function og(e, t, i) {
    if (Kt && typeof Kt.onCommitFiberUnmount == "function")
      try {
        Kt.onCommitFiberUnmount(Qn, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        Lt || ca(i, t), Ra(
          e,
          t,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        Lt || ca(i, t);
        var l = bt, u = dn;
        ri(i.type) && (bt = i.stateNode, dn = !1), Ra(
          e,
          t,
          i
        ), Vl(i.stateNode), bt = l, dn = u;
        break;
      case 5:
        Lt || ca(i, t);
      case 6:
        if (l = bt, u = dn, bt = null, Ra(
          e,
          t,
          i
        ), bt = l, dn = u, bt !== null)
          if (dn)
            try {
              (bt.nodeType === 9 ? bt.body : bt.nodeName === "HTML" ? bt.ownerDocument.body : bt).removeChild(i.stateNode);
            } catch (d) {
              it(
                i,
                t,
                d
              );
            }
          else
            try {
              bt.removeChild(i.stateNode);
            } catch (d) {
              it(
                i,
                t,
                d
              );
            }
        break;
      case 18:
        bt !== null && (dn ? (e = bt, ev(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          i.stateNode
        ), Ur(e)) : ev(bt, i.stateNode));
        break;
      case 4:
        l = bt, u = dn, bt = i.stateNode.containerInfo, dn = !0, Ra(
          e,
          t,
          i
        ), bt = l, dn = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ja(2, i, t), Lt || Ja(4, i, t), Ra(
          e,
          t,
          i
        );
        break;
      case 1:
        Lt || (ca(i, t), l = i.stateNode, typeof l.componentWillUnmount == "function" && tg(
          i,
          t,
          l
        )), Ra(
          e,
          t,
          i
        );
        break;
      case 21:
        Ra(
          e,
          t,
          i
        );
        break;
      case 22:
        Lt = (l = Lt) || i.memoizedState !== null, Ra(
          e,
          t,
          i
        ), Lt = l;
        break;
      default:
        Ra(
          e,
          t,
          i
        );
    }
  }
  function ug(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Ur(e);
      } catch (i) {
        it(t, t.return, i);
      }
    }
  }
  function cg(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Ur(e);
      } catch (i) {
        it(t, t.return, i);
      }
  }
  function ew(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new rg()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new rg()), t;
      default:
        throw Error(s(435, e.tag));
    }
  }
  function fo(e, t) {
    var i = ew(e);
    t.forEach(function(l) {
      if (!i.has(l)) {
        i.add(l);
        var u = uw.bind(null, e, l);
        l.then(u, u);
      }
    });
  }
  function fn(e, t) {
    var i = t.deletions;
    if (i !== null)
      for (var l = 0; l < i.length; l++) {
        var u = i[l], d = e, y = t, E = y;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (ri(E.type)) {
                bt = E.stateNode, dn = !1;
                break e;
              }
              break;
            case 5:
              bt = E.stateNode, dn = !1;
              break e;
            case 3:
            case 4:
              bt = E.stateNode.containerInfo, dn = !0;
              break e;
          }
          E = E.return;
        }
        if (bt === null) throw Error(s(160));
        og(d, y, u), bt = null, dn = !1, d = u.alternate, d !== null && (d.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        dg(t, e), t = t.sibling;
  }
  var Wn = null;
  function dg(e, t) {
    var i = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        fn(t, e), hn(e), l & 4 && (Ja(3, e, e.return), Ml(3, e), Ja(5, e, e.return));
        break;
      case 1:
        fn(t, e), hn(e), l & 512 && (Lt || i === null || ca(i, i.return)), l & 64 && Ma && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (i = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = i === null ? l : i.concat(l))));
        break;
      case 26:
        var u = Wn;
        if (fn(t, e), hn(e), l & 512 && (Lt || i === null || ca(i, i.return)), l & 4) {
          var d = i !== null ? i.memoizedState : null;
          if (l = e.memoizedState, i === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, i = e.memoizedProps, u = u.ownerDocument || u;
                  t: switch (l) {
                    case "title":
                      d = u.getElementsByTagName("title")[0], (!d || d[He] || d[he] || d.namespaceURI === "http://www.w3.org/2000/svg" || d.hasAttribute("itemprop")) && (d = u.createElement(l), u.head.insertBefore(
                        d,
                        u.querySelector("head > title")
                      )), Wt(d, l, i), d[he] = e, ht(d), l = d;
                      break e;
                    case "link":
                      var y = dv(
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
                      d = u.createElement(l), Wt(d, l, i), u.head.appendChild(d);
                      break;
                    case "meta":
                      if (y = dv(
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
                      d = u.createElement(l), Wt(d, l, i), u.head.appendChild(d);
                      break;
                    default:
                      throw Error(s(468, l));
                  }
                  d[he] = e, ht(d), l = d;
                }
                e.stateNode = l;
              } else
                fv(
                  u,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = cv(
                u,
                l,
                e.memoizedProps
              );
          else
            d !== l ? (d === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : d.count--, l === null ? fv(
              u,
              e.type,
              e.stateNode
            ) : cv(
              u,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && ed(
              e,
              e.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        fn(t, e), hn(e), l & 512 && (Lt || i === null || ca(i, i.return)), i !== null && l & 4 && ed(
          e,
          e.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (fn(t, e), hn(e), l & 512 && (Lt || i === null || ca(i, i.return)), e.flags & 32) {
          u = e.stateNode;
          try {
            rr(u, "");
          } catch (xe) {
            it(e, e.return, xe);
          }
        }
        l & 4 && e.stateNode != null && (u = e.memoizedProps, ed(
          e,
          u,
          i !== null ? i.memoizedProps : u
        )), l & 1024 && (ad = !0);
        break;
      case 6:
        if (fn(t, e), hn(e), l & 4) {
          if (e.stateNode === null)
            throw Error(s(162));
          l = e.memoizedProps, i = e.stateNode;
          try {
            i.nodeValue = l;
          } catch (xe) {
            it(e, e.return, xe);
          }
        }
        break;
      case 3:
        if (Mo = null, u = Wn, Wn = Co(t.containerInfo), fn(t, e), Wn = u, hn(e), l & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            Ur(t.containerInfo);
          } catch (xe) {
            it(e, e.return, xe);
          }
        ad && (ad = !1, fg(e));
        break;
      case 4:
        l = Wn, Wn = Co(
          e.stateNode.containerInfo
        ), fn(t, e), hn(e), Wn = l;
        break;
      case 12:
        fn(t, e), hn(e);
        break;
      case 31:
        fn(t, e), hn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, fo(e, l)));
        break;
      case 13:
        fn(t, e), hn(e), e.child.flags & 8192 && e.memoizedState !== null != (i !== null && i.memoizedState !== null) && (mo = Vt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, fo(e, l)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var D = i !== null && i.memoizedState !== null, F = Ma, ee = Lt;
        if (Ma = F || u, Lt = ee || D, fn(t, e), Lt = ee, Ma = F, hn(e), l & 8192)
          e: for (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (i === null || D || Ma || Lt || $i(e)), i = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (i === null) {
                D = i = t;
                try {
                  if (d = D.stateNode, u)
                    y = d.style, typeof y.setProperty == "function" ? y.setProperty("display", "none", "important") : y.display = "none";
                  else {
                    E = D.stateNode;
                    var ne = D.memoizedProps.style, G = ne != null && ne.hasOwnProperty("display") ? ne.display : null;
                    E.style.display = G == null || typeof G == "boolean" ? "" : ("" + G).trim();
                  }
                } catch (xe) {
                  it(D, D.return, xe);
                }
              }
            } else if (t.tag === 6) {
              if (i === null) {
                D = t;
                try {
                  D.stateNode.nodeValue = u ? "" : D.memoizedProps;
                } catch (xe) {
                  it(D, D.return, xe);
                }
              }
            } else if (t.tag === 18) {
              if (i === null) {
                D = t;
                try {
                  var K = D.stateNode;
                  u ? tv(K, !0) : tv(D.stateNode, !1);
                } catch (xe) {
                  it(D, D.return, xe);
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
        l & 4 && (l = e.updateQueue, l !== null && (i = l.retryQueue, i !== null && (l.retryQueue = null, fo(e, i))));
        break;
      case 19:
        fn(t, e), hn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, fo(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        fn(t, e), hn(e);
    }
  }
  function hn(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var i, l = e.return; l !== null; ) {
          if (ag(l)) {
            i = l;
            break;
          }
          l = l.return;
        }
        if (i == null) throw Error(s(160));
        switch (i.tag) {
          case 27:
            var u = i.stateNode, d = td(e);
            co(e, d, u);
            break;
          case 5:
            var y = i.stateNode;
            i.flags & 32 && (rr(y, ""), i.flags &= -33);
            var E = td(e);
            co(e, E, y);
            break;
          case 3:
          case 4:
            var D = i.stateNode.containerInfo, F = td(e);
            nd(
              e,
              F,
              D
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (ee) {
        it(e, e.return, ee);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function fg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        fg(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Aa(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        lg(e, t.alternate, t), t = t.sibling;
  }
  function $i(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ja(4, t, t.return), $i(t);
          break;
        case 1:
          ca(t, t.return);
          var i = t.stateNode;
          typeof i.componentWillUnmount == "function" && tg(
            t,
            t.return,
            i
          ), $i(t);
          break;
        case 27:
          Vl(t.stateNode);
        case 26:
        case 5:
          ca(t, t.return), $i(t);
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
  function _a(e, t, i) {
    for (i = i && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate, u = e, d = t, y = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          _a(
            u,
            d,
            i
          ), Ml(4, d);
          break;
        case 1:
          if (_a(
            u,
            d,
            i
          ), l = d, u = l.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (F) {
              it(l, l.return, F);
            }
          if (l = d, u = l.updateQueue, u !== null) {
            var E = l.stateNode;
            try {
              var D = u.shared.hiddenCallbacks;
              if (D !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < D.length; u++)
                  Im(D[u], E);
            } catch (F) {
              it(l, l.return, F);
            }
          }
          i && y & 64 && eg(d), Rl(d, d.return);
          break;
        case 27:
          ig(d);
        case 26:
        case 5:
          _a(
            u,
            d,
            i
          ), i && l === null && y & 4 && ng(d), Rl(d, d.return);
          break;
        case 12:
          _a(
            u,
            d,
            i
          );
          break;
        case 31:
          _a(
            u,
            d,
            i
          ), i && y & 4 && ug(u, d);
          break;
        case 13:
          _a(
            u,
            d,
            i
          ), i && y & 4 && cg(u, d);
          break;
        case 22:
          d.memoizedState === null && _a(
            u,
            d,
            i
          ), Rl(d, d.return);
          break;
        case 30:
          break;
        default:
          _a(
            u,
            d,
            i
          );
      }
      t = t.sibling;
    }
  }
  function id(e, t) {
    var i = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== i && (e != null && e.refCount++, i != null && pl(i));
  }
  function rd(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && pl(e));
  }
  function ea(e, t, i, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        hg(
          e,
          t,
          i,
          l
        ), t = t.sibling;
  }
  function hg(e, t, i, l) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        ea(
          e,
          t,
          i,
          l
        ), u & 2048 && Ml(9, t);
        break;
      case 1:
        ea(
          e,
          t,
          i,
          l
        );
        break;
      case 3:
        ea(
          e,
          t,
          i,
          l
        ), u & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && pl(e)));
        break;
      case 12:
        if (u & 2048) {
          ea(
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
          } catch (D) {
            it(t, t.return, D);
          }
        } else
          ea(
            e,
            t,
            i,
            l
          );
        break;
      case 31:
        ea(
          e,
          t,
          i,
          l
        );
        break;
      case 13:
        ea(
          e,
          t,
          i,
          l
        );
        break;
      case 23:
        break;
      case 22:
        d = t.stateNode, y = t.alternate, t.memoizedState !== null ? d._visibility & 2 ? ea(
          e,
          t,
          i,
          l
        ) : Al(e, t) : d._visibility & 2 ? ea(
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
        )), u & 2048 && id(y, t);
        break;
      case 24:
        ea(
          e,
          t,
          i,
          l
        ), u & 2048 && rd(t.alternate, t);
        break;
      default:
        ea(
          e,
          t,
          i,
          l
        );
    }
  }
  function Tr(e, t, i, l, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var d = e, y = t, E = i, D = l, F = y.flags;
      switch (y.tag) {
        case 0:
        case 11:
        case 15:
          Tr(
            d,
            y,
            E,
            D,
            u
          ), Ml(8, y);
          break;
        case 23:
          break;
        case 22:
          var ee = y.stateNode;
          y.memoizedState !== null ? ee._visibility & 2 ? Tr(
            d,
            y,
            E,
            D,
            u
          ) : Al(
            d,
            y
          ) : (ee._visibility |= 2, Tr(
            d,
            y,
            E,
            D,
            u
          )), u && F & 2048 && id(
            y.alternate,
            y
          );
          break;
        case 24:
          Tr(
            d,
            y,
            E,
            D,
            u
          ), u && F & 2048 && rd(y.alternate, y);
          break;
        default:
          Tr(
            d,
            y,
            E,
            D,
            u
          );
      }
      t = t.sibling;
    }
  }
  function Al(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var i = e, l = t, u = l.flags;
        switch (l.tag) {
          case 22:
            Al(i, l), u & 2048 && id(
              l.alternate,
              l
            );
            break;
          case 24:
            Al(i, l), u & 2048 && rd(l.alternate, l);
            break;
          default:
            Al(i, l);
        }
        t = t.sibling;
      }
  }
  var _l = 8192;
  function Cr(e, t, i) {
    if (e.subtreeFlags & _l)
      for (e = e.child; e !== null; )
        mg(
          e,
          t,
          i
        ), e = e.sibling;
  }
  function mg(e, t, i) {
    switch (e.tag) {
      case 26:
        Cr(
          e,
          t,
          i
        ), e.flags & _l && e.memoizedState !== null && Hw(
          i,
          Wn,
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
        var l = Wn;
        Wn = Co(e.stateNode.containerInfo), Cr(
          e,
          t,
          i
        ), Wn = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = _l, _l = 16777216, Cr(
          e,
          t,
          i
        ), _l = l) : Cr(
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
  function pg(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Dl(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var l = t[i];
          Ft = l, vg(
            l,
            e
          );
        }
      pg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        gg(e), e = e.sibling;
  }
  function gg(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Dl(e), e.flags & 2048 && Ja(9, e, e.return);
        break;
      case 3:
        Dl(e);
        break;
      case 12:
        Dl(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, ho(e)) : Dl(e);
        break;
      default:
        Dl(e);
    }
  }
  function ho(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var l = t[i];
          Ft = l, vg(
            l,
            e
          );
        }
      pg(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Ja(8, t, t.return), ho(t);
          break;
        case 22:
          i = t.stateNode, i._visibility & 2 && (i._visibility &= -3, ho(t));
          break;
        default:
          ho(t);
      }
      e = e.sibling;
    }
  }
  function vg(e, t) {
    for (; Ft !== null; ) {
      var i = Ft;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Ja(8, i, t);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var l = i.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          pl(i.memoizedState.cache);
      }
      if (l = i.child, l !== null) l.return = i, Ft = l;
      else
        e: for (i = e; Ft !== null; ) {
          l = Ft;
          var u = l.sibling, d = l.return;
          if (sg(l), l === i) {
            Ft = null;
            break e;
          }
          if (u !== null) {
            u.return = d, Ft = u;
            break e;
          }
          Ft = d;
        }
    }
  }
  var tw = {
    getCacheForType: function(e) {
      var t = Pt(Dt), i = t.data.get(e);
      return i === void 0 && (i = e(), t.data.set(e, i)), i;
    },
    cacheSignal: function() {
      return Pt(Dt).controller.signal;
    }
  }, nw = typeof WeakMap == "function" ? WeakMap : Map, et = 0, ft = null, Ye = null, Ge = 0, at = 0, jn = null, Wa = !1, Nr = !1, ld = !1, Da = 0, wt = 0, ei = 0, Ii = 0, sd = 0, Tn = 0, Mr = 0, zl = null, mn = null, od = !1, mo = 0, yg = 0, po = 1 / 0, go = null, ti = null, It = 0, ni = null, Rr = null, za = 0, ud = 0, cd = null, bg = null, Ol = 0, dd = null;
  function Cn() {
    return (et & 2) !== 0 && Ge !== 0 ? Ge & -Ge : U.T !== null ? vd() : re();
  }
  function xg() {
    if (Tn === 0)
      if ((Ge & 536870912) === 0 || Ke) {
        var e = Zn;
        Zn <<= 1, (Zn & 3932160) === 0 && (Zn = 262144), Tn = e;
      } else Tn = 536870912;
    return e = wn.current, e !== null && (e.flags |= 32), Tn;
  }
  function pn(e, t, i) {
    (e === ft && (at === 2 || at === 9) || e.cancelPendingCommit !== null) && (Ar(e, 0), ai(
      e,
      Ge,
      Tn,
      !1
    )), rt(e, i), ((et & 2) === 0 || e !== ft) && (e === ft && ((et & 2) === 0 && (Ii |= i), wt === 4 && ai(
      e,
      Ge,
      Tn,
      !1
    )), da(e));
  }
  function Sg(e, t, i) {
    if ((et & 6) !== 0) throw Error(s(327));
    var l = !i && (t & 127) === 0 && (t & e.expiredLanes) === 0 || ct(e, t), u = l ? rw(e, t) : hd(e, t, !0), d = l;
    do {
      if (u === 0) {
        Nr && !l && ai(e, t, 0, !1);
        break;
      } else {
        if (i = e.current.alternate, d && !aw(i)) {
          u = hd(e, t, !1), d = !1;
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
              u = zl;
              var D = E.current.memoizedState.isDehydrated;
              if (D && (Ar(E, y).flags |= 256), y = hd(
                E,
                y,
                !1
              ), y !== 2) {
                if (ld && !D) {
                  E.errorRecoveryDisabledLanes |= d, Ii |= d, u = 4;
                  break e;
                }
                d = mn, mn = u, d !== null && (mn === null ? mn = d : mn.push.apply(
                  mn,
                  d
                ));
              }
              u = y;
            }
            if (d = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Ar(e, 0), ai(e, t, 0, !0);
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
              ai(
                l,
                t,
                Tn,
                !Wa
              );
              break e;
            case 2:
              mn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && (u = mo + 300 - Vt(), 10 < u)) {
            if (ai(
              l,
              t,
              Tn,
              !Wa
            ), Le(l, 0, !0) !== 0) break e;
            za = t, l.timeoutHandle = Jg(
              wg.bind(
                null,
                l,
                i,
                mn,
                go,
                od,
                t,
                Tn,
                Ii,
                Mr,
                Wa,
                d,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break e;
          }
          wg(
            l,
            i,
            mn,
            go,
            od,
            t,
            Tn,
            Ii,
            Mr,
            Wa,
            d,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    da(e);
  }
  function wg(e, t, i, l, u, d, y, E, D, F, ee, ne, G, K) {
    if (e.timeoutHandle = -1, ne = t.subtreeFlags, ne & 8192 || (ne & 16785408) === 16785408) {
      ne = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: ya
      }, mg(
        t,
        d,
        ne
      );
      var xe = (d & 62914560) === d ? mo - Vt() : (d & 4194048) === d ? yg - Vt() : 0;
      if (xe = qw(
        ne,
        xe
      ), xe !== null) {
        za = d, e.cancelPendingCommit = xe(
          Ag.bind(
            null,
            e,
            t,
            d,
            i,
            l,
            u,
            y,
            E,
            D,
            ee,
            ne,
            null,
            G,
            K
          )
        ), ai(e, d, y, !F);
        return;
      }
    }
    Ag(
      e,
      t,
      d,
      i,
      l,
      u,
      y,
      E,
      D
    );
  }
  function aw(e) {
    for (var t = e; ; ) {
      var i = t.tag;
      if ((i === 0 || i === 11 || i === 15) && t.flags & 16384 && (i = t.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var l = 0; l < i.length; l++) {
          var u = i[l], d = u.getSnapshot;
          u = u.value;
          try {
            if (!xn(d(), u)) return !1;
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
  function ai(e, t, i, l) {
    t &= ~sd, t &= ~Ii, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var u = t; 0 < u; ) {
      var d = 31 - qt(u), y = 1 << d;
      l[d] = -1, u &= ~y;
    }
    i !== 0 && va(e, i, t);
  }
  function vo() {
    return (et & 6) === 0 ? (Ll(0), !1) : !0;
  }
  function fd() {
    if (Ye !== null) {
      if (at === 0)
        var e = Ye.return;
      else
        e = Ye, wa = Oi = null, Mc(e), xr = null, vl = 0, e = Ye;
      for (; e !== null; )
        Wp(e.alternate, e), e = e.return;
      Ye = null;
    }
  }
  function Ar(e, t) {
    var i = e.timeoutHandle;
    i !== -1 && (e.timeoutHandle = -1, Ew(i)), i = e.cancelPendingCommit, i !== null && (e.cancelPendingCommit = null, i()), za = 0, fd(), ft = e, Ye = i = xa(e.current, null), Ge = t, at = 0, jn = null, Wa = !1, Nr = ct(e, t), ld = !1, Mr = Tn = sd = Ii = ei = wt = 0, mn = zl = null, od = !1, (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var u = 31 - qt(l), d = 1 << u;
        t |= e[u], l &= ~d;
      }
    return Da = t, ks(), i;
  }
  function Eg(e, t) {
    ke = null, U.H = Tl, t === br || t === Fs ? (t = Bm(), at = 3) : t === gc ? (t = Bm(), at = 4) : at = t === Yc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, jn = t, Ye === null && (wt = 1, ro(
      e,
      Un(t, e.current)
    ));
  }
  function jg() {
    var e = wn.current;
    return e === null ? !0 : (Ge & 4194048) === Ge ? Hn === null : (Ge & 62914560) === Ge || (Ge & 536870912) !== 0 ? e === Hn : !1;
  }
  function Tg() {
    var e = U.H;
    return U.H = Tl, e === null ? Tl : e;
  }
  function Cg() {
    var e = U.A;
    return U.A = tw, e;
  }
  function yo() {
    wt = 4, Wa || (Ge & 4194048) !== Ge && wn.current !== null || (Nr = !0), (ei & 134217727) === 0 && (Ii & 134217727) === 0 || ft === null || ai(
      ft,
      Ge,
      Tn,
      !1
    );
  }
  function hd(e, t, i) {
    var l = et;
    et |= 2;
    var u = Tg(), d = Cg();
    (ft !== e || Ge !== t) && (go = null, Ar(e, t)), t = !1;
    var y = wt;
    e: do
      try {
        if (at !== 0 && Ye !== null) {
          var E = Ye, D = jn;
          switch (at) {
            case 8:
              fd(), y = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              wn.current === null && (t = !0);
              var F = at;
              if (at = 0, jn = null, _r(e, E, D, F), i && Nr) {
                y = 0;
                break e;
              }
              break;
            default:
              F = at, at = 0, jn = null, _r(e, E, D, F);
          }
        }
        iw(), y = wt;
        break;
      } catch (ee) {
        Eg(e, ee);
      }
    while (!0);
    return t && e.shellSuspendCounter++, wa = Oi = null, et = l, U.H = u, U.A = d, Ye === null && (ft = null, Ge = 0, ks()), y;
  }
  function iw() {
    for (; Ye !== null; ) Ng(Ye);
  }
  function rw(e, t) {
    var i = et;
    et |= 2;
    var l = Tg(), u = Cg();
    ft !== e || Ge !== t ? (go = null, po = Vt() + 500, Ar(e, t)) : Nr = ct(
      e,
      t
    );
    e: do
      try {
        if (at !== 0 && Ye !== null) {
          t = Ye;
          var d = jn;
          t: switch (at) {
            case 1:
              at = 0, jn = null, _r(e, t, d, 1);
              break;
            case 2:
            case 9:
              if (km(d)) {
                at = 0, jn = null, Mg(t);
                break;
              }
              t = function() {
                at !== 2 && at !== 9 || ft !== e || (at = 7), da(e);
              }, d.then(t, t);
              break e;
            case 3:
              at = 7;
              break e;
            case 4:
              at = 5;
              break e;
            case 7:
              km(d) ? (at = 0, jn = null, Mg(t)) : (at = 0, jn = null, _r(e, t, d, 7));
              break;
            case 5:
              var y = null;
              switch (Ye.tag) {
                case 26:
                  y = Ye.memoizedState;
                case 5:
                case 27:
                  var E = Ye;
                  if (y ? hv(y) : E.stateNode.complete) {
                    at = 0, jn = null;
                    var D = E.sibling;
                    if (D !== null) Ye = D;
                    else {
                      var F = E.return;
                      F !== null ? (Ye = F, bo(F)) : Ye = null;
                    }
                    break t;
                  }
              }
              at = 0, jn = null, _r(e, t, d, 5);
              break;
            case 6:
              at = 0, jn = null, _r(e, t, d, 6);
              break;
            case 8:
              fd(), wt = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        lw();
        break;
      } catch (ee) {
        Eg(e, ee);
      }
    while (!0);
    return wa = Oi = null, U.H = l, U.A = u, et = i, Ye !== null ? 0 : (ft = null, Ge = 0, ks(), wt);
  }
  function lw() {
    for (; Ye !== null && !kt(); )
      Ng(Ye);
  }
  function Ng(e) {
    var t = Pp(e.alternate, e, Da);
    e.memoizedProps = e.pendingProps, t === null ? bo(e) : Ye = t;
  }
  function Mg(e) {
    var t = e, i = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Fp(
          i,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Ge
        );
        break;
      case 11:
        t = Fp(
          i,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Ge
        );
        break;
      case 5:
        Mc(t);
      default:
        Wp(i, t), t = Ye = Cm(t, Da), t = Pp(i, t, Da);
    }
    e.memoizedProps = e.pendingProps, t === null ? bo(e) : Ye = t;
  }
  function _r(e, t, i, l) {
    wa = Oi = null, Mc(t), xr = null, vl = 0;
    var u = t.return;
    try {
      if (KS(
        e,
        u,
        t,
        i,
        Ge
      )) {
        wt = 1, ro(
          e,
          Un(i, e.current)
        ), Ye = null;
        return;
      }
    } catch (d) {
      if (u !== null) throw Ye = u, d;
      wt = 1, ro(
        e,
        Un(i, e.current)
      ), Ye = null;
      return;
    }
    t.flags & 32768 ? (Ke || l === 1 ? e = !0 : Nr || (Ge & 536870912) !== 0 ? e = !1 : (Wa = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = wn.current, l !== null && l.tag === 13 && (l.flags |= 16384))), Rg(t, e)) : bo(t);
  }
  function bo(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Rg(
          t,
          Wa
        );
        return;
      }
      e = t.return;
      var i = PS(
        t.alternate,
        t,
        Da
      );
      if (i !== null) {
        Ye = i;
        return;
      }
      if (t = t.sibling, t !== null) {
        Ye = t;
        return;
      }
      Ye = t = e;
    } while (t !== null);
    wt === 0 && (wt = 5);
  }
  function Rg(e, t) {
    do {
      var i = JS(e.alternate, e);
      if (i !== null) {
        i.flags &= 32767, Ye = i;
        return;
      }
      if (i = e.return, i !== null && (i.flags |= 32768, i.subtreeFlags = 0, i.deletions = null), !t && (e = e.sibling, e !== null)) {
        Ye = e;
        return;
      }
      Ye = e = i;
    } while (e !== null);
    wt = 6, Ye = null;
  }
  function Ag(e, t, i, l, u, d, y, E, D) {
    e.cancelPendingCommit = null;
    do
      xo();
    while (It !== 0);
    if ((et & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (d = t.lanes | t.childLanes, d |= tc, Qt(
        e,
        i,
        d,
        y,
        E,
        D
      ), e === ft && (Ye = ft = null, Ge = 0), Rr = t, ni = e, za = i, ud = d, cd = u, bg = l, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, cw(nt, function() {
        return Lg(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
        l = U.T, U.T = null, u = k.p, k.p = 2, y = et, et |= 4;
        try {
          WS(e, t, i);
        } finally {
          et = y, k.p = u, U.T = l;
        }
      }
      It = 1, _g(), Dg(), zg();
    }
  }
  function _g() {
    if (It === 1) {
      It = 0;
      var e = ni, t = Rr, i = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || i) {
        i = U.T, U.T = null;
        var l = k.p;
        k.p = 2;
        var u = et;
        et |= 4;
        try {
          dg(t, e);
          var d = Td, y = vm(e.containerInfo), E = d.focusedElem, D = d.selectionRange;
          if (y !== E && E && E.ownerDocument && gm(
            E.ownerDocument.documentElement,
            E
          )) {
            if (D !== null && Zu(E)) {
              var F = D.start, ee = D.end;
              if (ee === void 0 && (ee = F), "selectionStart" in E)
                E.selectionStart = F, E.selectionEnd = Math.min(
                  ee,
                  E.value.length
                );
              else {
                var ne = E.ownerDocument || document, G = ne && ne.defaultView || window;
                if (G.getSelection) {
                  var K = G.getSelection(), xe = E.textContent.length, _e = Math.min(D.start, xe), ut = D.end === void 0 ? _e : Math.min(D.end, xe);
                  !K.extend && _e > ut && (y = ut, ut = _e, _e = y);
                  var H = pm(
                    E,
                    _e
                  ), L = pm(
                    E,
                    ut
                  );
                  if (H && L && (K.rangeCount !== 1 || K.anchorNode !== H.node || K.anchorOffset !== H.offset || K.focusNode !== L.node || K.focusOffset !== L.offset)) {
                    var Y = ne.createRange();
                    Y.setStart(H.node, H.offset), K.removeAllRanges(), _e > ut ? (K.addRange(Y), K.extend(L.node, L.offset)) : (Y.setEnd(L.node, L.offset), K.addRange(Y));
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
          Do = !!jd, Td = jd = null;
        } finally {
          et = u, k.p = l, U.T = i;
        }
      }
      e.current = t, It = 2;
    }
  }
  function Dg() {
    if (It === 2) {
      It = 0;
      var e = ni, t = Rr, i = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || i) {
        i = U.T, U.T = null;
        var l = k.p;
        k.p = 2;
        var u = et;
        et |= 4;
        try {
          lg(e, t.alternate, t);
        } finally {
          et = u, k.p = l, U.T = i;
        }
      }
      It = 3;
    }
  }
  function zg() {
    if (It === 4 || It === 3) {
      It = 0, Dn();
      var e = ni, t = Rr, i = za, l = bg;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? It = 5 : (It = 0, Rr = ni = null, Og(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (u === 0 && (ti = null), I(i), t = t.stateNode, Kt && typeof Kt.onCommitFiberRoot == "function")
        try {
          Kt.onCommitFiberRoot(
            Qn,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        t = U.T, u = k.p, k.p = 2, U.T = null;
        try {
          for (var d = e.onRecoverableError, y = 0; y < l.length; y++) {
            var E = l[y];
            d(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          U.T = t, k.p = u;
        }
      }
      (za & 3) !== 0 && xo(), da(e), u = e.pendingLanes, (i & 261930) !== 0 && (u & 42) !== 0 ? e === dd ? Ol++ : (Ol = 0, dd = e) : Ol = 0, Ll(0);
    }
  }
  function Og(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, pl(t)));
  }
  function xo() {
    return _g(), Dg(), zg(), Lg();
  }
  function Lg() {
    if (It !== 5) return !1;
    var e = ni, t = ud;
    ud = 0;
    var i = I(za), l = U.T, u = k.p;
    try {
      k.p = 32 > i ? 32 : i, U.T = null, i = cd, cd = null;
      var d = ni, y = za;
      if (It = 0, Rr = ni = null, za = 0, (et & 6) !== 0) throw Error(s(331));
      var E = et;
      if (et |= 4, gg(d.current), hg(
        d,
        d.current,
        y,
        i
      ), et = E, Ll(0, !1), Kt && typeof Kt.onPostCommitFiberRoot == "function")
        try {
          Kt.onPostCommitFiberRoot(Qn, d);
        } catch {
        }
      return !0;
    } finally {
      k.p = u, U.T = l, Og(e, t);
    }
  }
  function Ug(e, t, i) {
    t = Un(i, t), t = Ic(e.stateNode, t, 2), e = Qa(e, t, 2), e !== null && (rt(e, 2), da(e));
  }
  function it(e, t, i) {
    if (e.tag === 3)
      Ug(e, e, i);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Ug(
            t,
            e,
            i
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (ti === null || !ti.has(l))) {
            e = Un(i, e), i = kp(2), l = Qa(t, i, 2), l !== null && (Vp(
              i,
              l,
              t,
              e
            ), rt(l, 2), da(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function md(e, t, i) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new nw();
      var u = /* @__PURE__ */ new Set();
      l.set(t, u);
    } else
      u = l.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), l.set(t, u));
    u.has(i) || (ld = !0, u.add(i), e = sw.bind(null, e, t, i), t.then(e, e));
  }
  function sw(e, t, i) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & i, e.warmLanes &= ~i, ft === e && (Ge & i) === i && (wt === 4 || wt === 3 && (Ge & 62914560) === Ge && 300 > Vt() - mo ? (et & 2) === 0 && Ar(e, 0) : sd |= i, Mr === Ge && (Mr = 0)), da(e);
  }
  function kg(e, t) {
    t === 0 && (t = $t()), e = _i(e, t), e !== null && (rt(e, t), da(e));
  }
  function ow(e) {
    var t = e.memoizedState, i = 0;
    t !== null && (i = t.retryLane), kg(e, i);
  }
  function uw(e, t) {
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
    l !== null && l.delete(t), kg(e, i);
  }
  function cw(e, t) {
    return yn(e, t);
  }
  var So = null, Dr = null, pd = !1, wo = !1, gd = !1, ii = 0;
  function da(e) {
    e !== Dr && e.next === null && (Dr === null ? So = Dr = e : Dr = Dr.next = e), wo = !0, pd || (pd = !0, fw());
  }
  function Ll(e, t) {
    if (!gd && wo) {
      gd = !0;
      do
        for (var i = !1, l = So; l !== null; ) {
          if (e !== 0) {
            var u = l.pendingLanes;
            if (u === 0) var d = 0;
            else {
              var y = l.suspendedLanes, E = l.pingedLanes;
              d = (1 << 31 - qt(42 | e) + 1) - 1, d &= u & ~(y & ~E), d = d & 201326741 ? d & 201326741 | 1 : d ? d | 2 : 0;
            }
            d !== 0 && (i = !0, qg(l, d));
          } else
            d = Ge, d = Le(
              l,
              l === ft ? d : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (d & 3) === 0 || ct(l, d) || (i = !0, qg(l, d));
          l = l.next;
        }
      while (i);
      gd = !1;
    }
  }
  function dw() {
    Vg();
  }
  function Vg() {
    wo = pd = !1;
    var e = 0;
    ii !== 0 && ww() && (e = ii);
    for (var t = Vt(), i = null, l = So; l !== null; ) {
      var u = l.next, d = Bg(l, t);
      d === 0 ? (l.next = null, i === null ? So = u : i.next = u, u === null && (Dr = i)) : (i = l, (e !== 0 || (d & 3) !== 0) && (wo = !0)), l = u;
    }
    It !== 0 && It !== 5 || Ll(e), ii !== 0 && (ii = 0);
  }
  function Bg(e, t) {
    for (var i = e.suspendedLanes, l = e.pingedLanes, u = e.expirationTimes, d = e.pendingLanes & -62914561; 0 < d; ) {
      var y = 31 - qt(d), E = 1 << y, D = u[y];
      D === -1 ? ((E & i) === 0 || (E & l) !== 0) && (u[y] = Rt(E, t)) : D <= t && (e.expiredLanes |= E), d &= ~E;
    }
    if (t = ft, i = Ge, i = Le(
      e,
      e === t ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, i === 0 || e === t && (at === 2 || at === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && pa(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((i & 3) === 0 || ct(e, i)) {
      if (t = i & -i, t === e.callbackPriority) return t;
      switch (l !== null && pa(l), I(i)) {
        case 2:
        case 8:
          i = Qe;
          break;
        case 32:
          i = nt;
          break;
        case 268435456:
          i = Ht;
          break;
        default:
          i = nt;
      }
      return l = Hg.bind(null, e), i = yn(i, l), e.callbackPriority = t, e.callbackNode = i, t;
    }
    return l !== null && l !== null && pa(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Hg(e, t) {
    if (It !== 0 && It !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var i = e.callbackNode;
    if (xo() && e.callbackNode !== i)
      return null;
    var l = Ge;
    return l = Le(
      e,
      e === ft ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (Sg(e, l, t), Bg(e, Vt()), e.callbackNode != null && e.callbackNode === i ? Hg.bind(null, e) : null);
  }
  function qg(e, t) {
    if (xo()) return null;
    Sg(e, t, !0);
  }
  function fw() {
    jw(function() {
      (et & 6) !== 0 ? yn(
        ze,
        dw
      ) : Vg();
    });
  }
  function vd() {
    if (ii === 0) {
      var e = vr;
      e === 0 && (e = ga, ga <<= 1, (ga & 261888) === 0 && (ga = 256)), ii = e;
    }
    return ii;
  }
  function $g(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Rs("" + e);
  }
  function Ig(e, t) {
    var i = t.ownerDocument.createElement("input");
    return i.name = t.name, i.value = t.value, e.id && i.setAttribute("form", e.id), t.parentNode.insertBefore(i, t), e = new FormData(e), i.parentNode.removeChild(i), e;
  }
  function hw(e, t, i, l, u) {
    if (t === "submit" && i && i.stateNode === u) {
      var d = $g(
        (u[me] || null).action
      ), y = l.submitter;
      y && (t = (t = y[me] || null) ? $g(t.formAction) : y.getAttribute("formAction"), t !== null && (d = t, y = null));
      var E = new zs(
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
                if (ii !== 0) {
                  var D = y ? Ig(u, y) : new FormData(u);
                  kc(
                    i,
                    {
                      pending: !0,
                      data: D,
                      method: u.method,
                      action: d
                    },
                    null,
                    D
                  );
                }
              } else
                typeof d == "function" && (E.preventDefault(), D = y ? Ig(u, y) : new FormData(u), kc(
                  i,
                  {
                    pending: !0,
                    data: D,
                    method: u.method,
                    action: d
                  },
                  d,
                  D
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var yd = 0; yd < ec.length; yd++) {
    var bd = ec[yd], mw = bd.toLowerCase(), pw = bd[0].toUpperCase() + bd.slice(1);
    Jn(
      mw,
      "on" + pw
    );
  }
  Jn(xm, "onAnimationEnd"), Jn(Sm, "onAnimationIteration"), Jn(wm, "onAnimationStart"), Jn("dblclick", "onDoubleClick"), Jn("focusin", "onFocus"), Jn("focusout", "onBlur"), Jn(_S, "onTransitionRun"), Jn(DS, "onTransitionStart"), Jn(zS, "onTransitionCancel"), Jn(Em, "onTransitionEnd"), la("onMouseEnter", ["mouseout", "mouseover"]), la("onMouseLeave", ["mouseout", "mouseover"]), la("onPointerEnter", ["pointerout", "pointerover"]), la("onPointerLeave", ["pointerout", "pointerover"]), Yt(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Yt(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Yt("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Yt(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Yt(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Yt(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Ul = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), gw = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ul)
  );
  function Yg(e, t) {
    t = (t & 4) !== 0;
    for (var i = 0; i < e.length; i++) {
      var l = e[i], u = l.event;
      l = l.listeners;
      e: {
        var d = void 0;
        if (t)
          for (var y = l.length - 1; 0 <= y; y--) {
            var E = l[y], D = E.instance, F = E.currentTarget;
            if (E = E.listener, D !== d && u.isPropagationStopped())
              break e;
            d = E, u.currentTarget = F;
            try {
              d(u);
            } catch (ee) {
              Us(ee);
            }
            u.currentTarget = null, d = D;
          }
        else
          for (y = 0; y < l.length; y++) {
            if (E = l[y], D = E.instance, F = E.currentTarget, E = E.listener, D !== d && u.isPropagationStopped())
              break e;
            d = E, u.currentTarget = F;
            try {
              d(u);
            } catch (ee) {
              Us(ee);
            }
            u.currentTarget = null, d = D;
          }
      }
    }
  }
  function Fe(e, t) {
    var i = t[ve];
    i === void 0 && (i = t[ve] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    i.has(l) || (Fg(t, e, 2, !1), i.add(l));
  }
  function xd(e, t, i) {
    var l = 0;
    t && (l |= 4), Fg(
      i,
      e,
      l,
      t
    );
  }
  var Eo = "_reactListening" + Math.random().toString(36).slice(2);
  function Sd(e) {
    if (!e[Eo]) {
      e[Eo] = !0, qa.forEach(function(i) {
        i !== "selectionchange" && (gw.has(i) || xd(i, !1, e), xd(i, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Eo] || (t[Eo] = !0, xd("selectionchange", !1, t));
    }
  }
  function Fg(e, t, i, l) {
    switch (xv(t)) {
      case 2:
        var u = Yw;
        break;
      case 8:
        u = Fw;
        break;
      default:
        u = Ud;
    }
    i = u.bind(
      null,
      t,
      i,
      e
    ), u = void 0, !qu || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), l ? u !== void 0 ? e.addEventListener(t, i, {
      capture: !0,
      passive: u
    }) : e.addEventListener(t, i, !0) : u !== void 0 ? e.addEventListener(t, i, {
      passive: u
    }) : e.addEventListener(t, i, !1);
  }
  function wd(e, t, i, l, u) {
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
              var D = y.tag;
              if ((D === 3 || D === 4) && y.stateNode.containerInfo === u)
                return;
              y = y.return;
            }
          for (; E !== null; ) {
            if (y = lt(E), y === null) return;
            if (D = y.tag, D === 5 || D === 6 || D === 26 || D === 27) {
              l = d = y;
              continue e;
            }
            E = E.parentNode;
          }
        }
        l = l.return;
      }
    Zh(function() {
      var F = d, ee = Bu(i), ne = [];
      e: {
        var G = jm.get(e);
        if (G !== void 0) {
          var K = zs, xe = e;
          switch (e) {
            case "keypress":
              if (_s(i) === 0) break e;
            case "keydown":
            case "keyup":
              K = uS;
              break;
            case "focusin":
              xe = "focus", K = Fu;
              break;
            case "focusout":
              xe = "blur", K = Fu;
              break;
            case "beforeblur":
            case "afterblur":
              K = Fu;
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
              K = Wh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              K = P1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              K = fS;
              break;
            case xm:
            case Sm:
            case wm:
              K = eS;
              break;
            case Em:
              K = mS;
              break;
            case "scroll":
            case "scrollend":
              K = Q1;
              break;
            case "wheel":
              K = gS;
              break;
            case "copy":
            case "cut":
            case "paste":
              K = nS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              K = tm;
              break;
            case "toggle":
            case "beforetoggle":
              K = yS;
          }
          var _e = (t & 4) !== 0, ut = !_e && (e === "scroll" || e === "scrollend"), H = _e ? G !== null ? G + "Capture" : null : G;
          _e = [];
          for (var L = F, Y; L !== null; ) {
            var te = L;
            if (Y = te.stateNode, te = te.tag, te !== 5 && te !== 26 && te !== 27 || Y === null || H === null || (te = il(L, H), te != null && _e.push(
              kl(L, te, Y)
            )), ut) break;
            L = L.return;
          }
          0 < _e.length && (G = new K(
            G,
            xe,
            null,
            i,
            ee
          ), ne.push({ event: G, listeners: _e }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (G = e === "mouseover" || e === "pointerover", K = e === "mouseout" || e === "pointerout", G && i !== Vu && (xe = i.relatedTarget || i.fromElement) && (lt(xe) || xe[je]))
            break e;
          if ((K || G) && (G = ee.window === ee ? ee : (G = ee.ownerDocument) ? G.defaultView || G.parentWindow : window, K ? (xe = i.relatedTarget || i.toElement, K = F, xe = xe ? lt(xe) : null, xe !== null && (ut = c(xe), _e = xe.tag, xe !== ut || _e !== 5 && _e !== 27 && _e !== 6) && (xe = null)) : (K = null, xe = F), K !== xe)) {
            if (_e = Wh, te = "onMouseLeave", H = "onMouseEnter", L = "mouse", (e === "pointerout" || e === "pointerover") && (_e = tm, te = "onPointerLeave", H = "onPointerEnter", L = "pointer"), ut = K == null ? G : Ie(K), Y = xe == null ? G : Ie(xe), G = new _e(
              te,
              L + "leave",
              K,
              i,
              ee
            ), G.target = ut, G.relatedTarget = Y, te = null, lt(ee) === F && (_e = new _e(
              H,
              L + "enter",
              xe,
              i,
              ee
            ), _e.target = Y, _e.relatedTarget = ut, te = _e), ut = te, K && xe)
              t: {
                for (_e = vw, H = K, L = xe, Y = 0, te = H; te; te = _e(te))
                  Y++;
                te = 0;
                for (var Ne = L; Ne; Ne = _e(Ne))
                  te++;
                for (; 0 < Y - te; )
                  H = _e(H), Y--;
                for (; 0 < te - Y; )
                  L = _e(L), te--;
                for (; Y--; ) {
                  if (H === L || L !== null && H === L.alternate) {
                    _e = H;
                    break t;
                  }
                  H = _e(H), L = _e(L);
                }
                _e = null;
              }
            else _e = null;
            K !== null && Gg(
              ne,
              G,
              K,
              _e,
              !1
            ), xe !== null && ut !== null && Gg(
              ne,
              ut,
              xe,
              _e,
              !0
            );
          }
        }
        e: {
          if (G = F ? Ie(F) : window, K = G.nodeName && G.nodeName.toLowerCase(), K === "select" || K === "input" && G.type === "file")
            var Je = um;
          else if (sm(G))
            if (cm)
              Je = MS;
            else {
              Je = CS;
              var Te = TS;
            }
          else
            K = G.nodeName, !K || K.toLowerCase() !== "input" || G.type !== "checkbox" && G.type !== "radio" ? F && ku(F.elementType) && (Je = um) : Je = NS;
          if (Je && (Je = Je(e, F))) {
            om(
              ne,
              Je,
              i,
              ee
            );
            break e;
          }
          Te && Te(e, G, F), e === "focusout" && F && G.type === "number" && F.memoizedProps.value != null && Uu(G, "number", G.value);
        }
        switch (Te = F ? Ie(F) : window, e) {
          case "focusin":
            (sm(Te) || Te.contentEditable === "true") && (ur = Te, Pu = F, fl = null);
            break;
          case "focusout":
            fl = Pu = ur = null;
            break;
          case "mousedown":
            Ju = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ju = !1, ym(ne, i, ee);
            break;
          case "selectionchange":
            if (AS) break;
          case "keydown":
          case "keyup":
            ym(ne, i, ee);
        }
        var Ve;
        if (Xu)
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
          or ? rm(e, i) && (Xe = "onCompositionEnd") : e === "keydown" && i.keyCode === 229 && (Xe = "onCompositionStart");
        Xe && (nm && i.locale !== "ko" && (or || Xe !== "onCompositionStart" ? Xe === "onCompositionEnd" && or && (Ve = Ph()) : ($a = ee, $u = "value" in $a ? $a.value : $a.textContent, or = !0)), Te = jo(F, Xe), 0 < Te.length && (Xe = new em(
          Xe,
          e,
          null,
          i,
          ee
        ), ne.push({ event: Xe, listeners: Te }), Ve ? Xe.data = Ve : (Ve = lm(i), Ve !== null && (Xe.data = Ve)))), (Ve = xS ? SS(e, i) : wS(e, i)) && (Xe = jo(F, "onBeforeInput"), 0 < Xe.length && (Te = new em(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          ee
        ), ne.push({
          event: Te,
          listeners: Xe
        }), Te.data = Ve)), hw(
          ne,
          e,
          F,
          i,
          ee
        );
      }
      Yg(ne, t);
    });
  }
  function kl(e, t, i) {
    return {
      instance: e,
      listener: t,
      currentTarget: i
    };
  }
  function jo(e, t) {
    for (var i = t + "Capture", l = []; e !== null; ) {
      var u = e, d = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || d === null || (u = il(e, i), u != null && l.unshift(
        kl(e, u, d)
      ), u = il(e, t), u != null && l.push(
        kl(e, u, d)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function vw(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Gg(e, t, i, l, u) {
    for (var d = t._reactName, y = []; i !== null && i !== l; ) {
      var E = i, D = E.alternate, F = E.stateNode;
      if (E = E.tag, D !== null && D === l) break;
      E !== 5 && E !== 26 && E !== 27 || F === null || (D = F, u ? (F = il(i, d), F != null && y.unshift(
        kl(i, F, D)
      )) : u || (F = il(i, d), F != null && y.push(
        kl(i, F, D)
      ))), i = i.return;
    }
    y.length !== 0 && e.push({ event: t, listeners: y });
  }
  var yw = /\r\n?/g, bw = /\u0000|\uFFFD/g;
  function Xg(e) {
    return (typeof e == "string" ? e : "" + e).replace(yw, `
`).replace(bw, "");
  }
  function Kg(e, t) {
    return t = Xg(t), Xg(e) === t;
  }
  function ot(e, t, i, l, u, d) {
    switch (i) {
      case "children":
        typeof l == "string" ? t === "body" || t === "textarea" && l === "" || rr(e, l) : (typeof l == "number" || typeof l == "bigint") && t !== "body" && rr(e, "" + l);
        break;
      case "className":
        Tt(e, "class", l);
        break;
      case "tabIndex":
        Tt(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Tt(e, i, l);
        break;
      case "style":
        Kh(e, l, d);
        break;
      case "data":
        if (t !== "object") {
          Tt(e, "data", l);
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
        l = Rs("" + l), e.setAttribute(i, l);
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
          typeof d == "function" && (i === "formAction" ? (t !== "input" && ot(e, t, "name", u.name, u, null), ot(
            e,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), ot(
            e,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), ot(
            e,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (ot(e, t, "encType", u.encType, u, null), ot(e, t, "method", u.method, u, null), ot(e, t, "target", u.target, u, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(i);
          break;
        }
        l = Rs("" + l), e.setAttribute(i, l);
        break;
      case "onClick":
        l != null && (e.onclick = ya);
        break;
      case "onScroll":
        l != null && Fe("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Fe("scrollend", e);
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
        i = Rs("" + l), e.setAttributeNS(
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
        Fe("beforetoggle", e), Fe("toggle", e), qe(e, "popover", l);
        break;
      case "xlinkActuate":
        nn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        nn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        nn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        nn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        nn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        nn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        nn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        nn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        nn(
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
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = X1.get(i) || i, qe(e, i, l));
    }
  }
  function Ed(e, t, i, l, u, d) {
    switch (i) {
      case "style":
        Kh(e, l, d);
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
        l != null && Fe("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Fe("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = ya);
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
        if (!Pn.hasOwnProperty(i))
          e: {
            if (i[0] === "o" && i[1] === "n" && (u = i.endsWith("Capture"), t = i.slice(2, u ? i.length - 7 : void 0), d = e[me] || null, d = d != null ? d[i] : null, typeof d == "function" && e.removeEventListener(t, d, u), typeof l == "function")) {
              typeof d != "function" && d !== null && (i in e ? e[i] = null : e.hasAttribute(i) && e.removeAttribute(i)), e.addEventListener(t, l, u);
              break e;
            }
            i in e ? e[i] = l : l === !0 ? e.setAttribute(i, "") : qe(e, i, l);
          }
    }
  }
  function Wt(e, t, i) {
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
        Fe("error", e), Fe("load", e);
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
                  ot(e, t, d, y, i, null);
              }
          }
        u && ot(e, t, "srcSet", i.srcSet, i, null), l && ot(e, t, "src", i.src, i, null);
        return;
      case "input":
        Fe("invalid", e);
        var E = d = y = u = null, D = null, F = null;
        for (l in i)
          if (i.hasOwnProperty(l)) {
            var ee = i[l];
            if (ee != null)
              switch (l) {
                case "name":
                  u = ee;
                  break;
                case "type":
                  y = ee;
                  break;
                case "checked":
                  D = ee;
                  break;
                case "defaultChecked":
                  F = ee;
                  break;
                case "value":
                  d = ee;
                  break;
                case "defaultValue":
                  E = ee;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (ee != null)
                    throw Error(s(137, t));
                  break;
                default:
                  ot(e, t, l, ee, i, null);
              }
          }
        Yh(
          e,
          d,
          E,
          D,
          F,
          y,
          u,
          !1
        );
        return;
      case "select":
        Fe("invalid", e), l = y = d = null;
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
                ot(e, t, u, E, i, null);
            }
        t = d, i = y, e.multiple = !!l, t != null ? ir(e, !!l, t, !1) : i != null && ir(e, !!l, i, !0);
        return;
      case "textarea":
        Fe("invalid", e), d = u = l = null;
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
                ot(e, t, y, E, i, null);
            }
        Gh(e, l, u, d);
        return;
      case "option":
        for (D in i)
          if (i.hasOwnProperty(D) && (l = i[D], l != null))
            switch (D) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                ot(e, t, D, l, i, null);
            }
        return;
      case "dialog":
        Fe("beforetoggle", e), Fe("toggle", e), Fe("cancel", e), Fe("close", e);
        break;
      case "iframe":
      case "object":
        Fe("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Ul.length; l++)
          Fe(Ul[l], e);
        break;
      case "image":
        Fe("error", e), Fe("load", e);
        break;
      case "details":
        Fe("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Fe("error", e), Fe("load", e);
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
                ot(e, t, F, l, i, null);
            }
        return;
      default:
        if (ku(t)) {
          for (ee in i)
            i.hasOwnProperty(ee) && (l = i[ee], l !== void 0 && Ed(
              e,
              t,
              ee,
              l,
              i,
              void 0
            ));
          return;
        }
    }
    for (E in i)
      i.hasOwnProperty(E) && (l = i[E], l != null && ot(e, t, E, l, i, null));
  }
  function xw(e, t, i, l) {
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
        var u = null, d = null, y = null, E = null, D = null, F = null, ee = null;
        for (K in i) {
          var ne = i[K];
          if (i.hasOwnProperty(K) && ne != null)
            switch (K) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                D = ne;
              default:
                l.hasOwnProperty(K) || ot(e, t, K, null, l, ne);
            }
        }
        for (var G in l) {
          var K = l[G];
          if (ne = i[G], l.hasOwnProperty(G) && (K != null || ne != null))
            switch (G) {
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
                ee = K;
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
                K !== ne && ot(
                  e,
                  t,
                  G,
                  K,
                  l,
                  ne
                );
            }
        }
        Lu(
          e,
          y,
          E,
          D,
          F,
          ee,
          d,
          u
        );
        return;
      case "select":
        K = y = E = G = null;
        for (d in i)
          if (D = i[d], i.hasOwnProperty(d) && D != null)
            switch (d) {
              case "value":
                break;
              case "multiple":
                K = D;
              default:
                l.hasOwnProperty(d) || ot(
                  e,
                  t,
                  d,
                  null,
                  l,
                  D
                );
            }
        for (u in l)
          if (d = l[u], D = i[u], l.hasOwnProperty(u) && (d != null || D != null))
            switch (u) {
              case "value":
                G = d;
                break;
              case "defaultValue":
                E = d;
                break;
              case "multiple":
                y = d;
              default:
                d !== D && ot(
                  e,
                  t,
                  u,
                  d,
                  l,
                  D
                );
            }
        t = E, i = y, l = K, G != null ? ir(e, !!i, G, !1) : !!l != !!i && (t != null ? ir(e, !!i, t, !0) : ir(e, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        K = G = null;
        for (E in i)
          if (u = i[E], i.hasOwnProperty(E) && u != null && !l.hasOwnProperty(E))
            switch (E) {
              case "value":
                break;
              case "children":
                break;
              default:
                ot(e, t, E, null, l, u);
            }
        for (y in l)
          if (u = l[y], d = i[y], l.hasOwnProperty(y) && (u != null || d != null))
            switch (y) {
              case "value":
                G = u;
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
                u !== d && ot(e, t, y, u, l, d);
            }
        Fh(e, G, K);
        return;
      case "option":
        for (var xe in i)
          if (G = i[xe], i.hasOwnProperty(xe) && G != null && !l.hasOwnProperty(xe))
            switch (xe) {
              case "selected":
                e.selected = !1;
                break;
              default:
                ot(
                  e,
                  t,
                  xe,
                  null,
                  l,
                  G
                );
            }
        for (D in l)
          if (G = l[D], K = i[D], l.hasOwnProperty(D) && G !== K && (G != null || K != null))
            switch (D) {
              case "selected":
                e.selected = G && typeof G != "function" && typeof G != "symbol";
                break;
              default:
                ot(
                  e,
                  t,
                  D,
                  G,
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
        for (var _e in i)
          G = i[_e], i.hasOwnProperty(_e) && G != null && !l.hasOwnProperty(_e) && ot(e, t, _e, null, l, G);
        for (F in l)
          if (G = l[F], K = i[F], l.hasOwnProperty(F) && G !== K && (G != null || K != null))
            switch (F) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (G != null)
                  throw Error(s(137, t));
                break;
              default:
                ot(
                  e,
                  t,
                  F,
                  G,
                  l,
                  K
                );
            }
        return;
      default:
        if (ku(t)) {
          for (var ut in i)
            G = i[ut], i.hasOwnProperty(ut) && G !== void 0 && !l.hasOwnProperty(ut) && Ed(
              e,
              t,
              ut,
              void 0,
              l,
              G
            );
          for (ee in l)
            G = l[ee], K = i[ee], !l.hasOwnProperty(ee) || G === K || G === void 0 && K === void 0 || Ed(
              e,
              t,
              ee,
              G,
              l,
              K
            );
          return;
        }
    }
    for (var H in i)
      G = i[H], i.hasOwnProperty(H) && G != null && !l.hasOwnProperty(H) && ot(e, t, H, null, l, G);
    for (ne in l)
      G = l[ne], K = i[ne], !l.hasOwnProperty(ne) || G === K || G == null && K == null || ot(e, t, ne, G, l, K);
  }
  function Qg(e) {
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
  function Sw() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, i = performance.getEntriesByType("resource"), l = 0; l < i.length; l++) {
        var u = i[l], d = u.transferSize, y = u.initiatorType, E = u.duration;
        if (d && E && Qg(y)) {
          for (y = 0, E = u.responseEnd, l += 1; l < i.length; l++) {
            var D = i[l], F = D.startTime;
            if (F > E) break;
            var ee = D.transferSize, ne = D.initiatorType;
            ee && Qg(ne) && (D = D.responseEnd, y += ee * (D < E ? 1 : (E - F) / (D - F)));
          }
          if (--l, t += 8 * (d + y) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var jd = null, Td = null;
  function To(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Zg(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Pg(e, t) {
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
  function Cd(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Nd = null;
  function ww() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Nd ? !1 : (Nd = e, !0) : (Nd = null, !1);
  }
  var Jg = typeof setTimeout == "function" ? setTimeout : void 0, Ew = typeof clearTimeout == "function" ? clearTimeout : void 0, Wg = typeof Promise == "function" ? Promise : void 0, jw = typeof queueMicrotask == "function" ? queueMicrotask : typeof Wg < "u" ? function(e) {
    return Wg.resolve(null).then(e).catch(Tw);
  } : Jg;
  function Tw(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ri(e) {
    return e === "head";
  }
  function ev(e, t) {
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
          Vl(e.ownerDocument.documentElement);
        else if (i === "head") {
          i = e.ownerDocument.head, Vl(i);
          for (var d = i.firstChild; d; ) {
            var y = d.nextSibling, E = d.nodeName;
            d[He] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && d.rel.toLowerCase() === "stylesheet" || i.removeChild(d), d = y;
          }
        } else
          i === "body" && Vl(e.ownerDocument.body);
      i = u;
    } while (i);
    Ur(t);
  }
  function tv(e, t) {
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
  function Md(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var i = t;
      switch (t = t.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Md(i), dt(i);
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
  function Cw(e, t, i, l) {
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
      if (e = qn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Nw(e, t, i) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !i || (e = qn(e.nextSibling), e === null)) return null;
    return e;
  }
  function nv(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = qn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Rd(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Ad(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Mw(e, t) {
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
  function qn(e) {
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
  var _d = null;
  function av(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data;
        if (i === "/$" || i === "/&") {
          if (t === 0)
            return qn(e.nextSibling);
          t--;
        } else
          i !== "$" && i !== "$!" && i !== "$?" && i !== "$~" && i !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function iv(e) {
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
  function rv(e, t, i) {
    switch (t = To(i), e) {
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
  function Vl(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    dt(e);
  }
  var $n = /* @__PURE__ */ new Map(), lv = /* @__PURE__ */ new Set();
  function Co(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Oa = k.d;
  k.d = {
    f: Rw,
    r: Aw,
    D: _w,
    C: Dw,
    L: zw,
    m: Ow,
    X: Uw,
    S: Lw,
    M: kw
  };
  function Rw() {
    var e = Oa.f(), t = vo();
    return e || t;
  }
  function Aw(e) {
    var t = yt(e);
    t !== null && t.tag === 5 && t.type === "form" ? Ep(t) : Oa.r(e);
  }
  var zr = typeof document > "u" ? null : document;
  function sv(e, t, i) {
    var l = zr;
    if (l && typeof t == "string" && t) {
      var u = On(t);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof i == "string" && (u += '[crossorigin="' + i + '"]'), lv.has(u) || (lv.add(u), e = { rel: e, crossOrigin: i, href: t }, l.querySelector(u) === null && (t = l.createElement("link"), Wt(t, "link", e), ht(t), l.head.appendChild(t)));
    }
  }
  function _w(e) {
    Oa.D(e), sv("dns-prefetch", e, null);
  }
  function Dw(e, t) {
    Oa.C(e, t), sv("preconnect", e, t);
  }
  function zw(e, t, i) {
    Oa.L(e, t, i);
    var l = zr;
    if (l && e && t) {
      var u = 'link[rel="preload"][as="' + On(t) + '"]';
      t === "image" && i && i.imageSrcSet ? (u += '[imagesrcset="' + On(
        i.imageSrcSet
      ) + '"]', typeof i.imageSizes == "string" && (u += '[imagesizes="' + On(
        i.imageSizes
      ) + '"]')) : u += '[href="' + On(e) + '"]';
      var d = u;
      switch (t) {
        case "style":
          d = Or(e);
          break;
        case "script":
          d = Lr(e);
      }
      $n.has(d) || (e = v(
        {
          rel: "preload",
          href: t === "image" && i && i.imageSrcSet ? void 0 : e,
          as: t
        },
        i
      ), $n.set(d, e), l.querySelector(u) !== null || t === "style" && l.querySelector(Bl(d)) || t === "script" && l.querySelector(Hl(d)) || (t = l.createElement("link"), Wt(t, "link", e), ht(t), l.head.appendChild(t)));
    }
  }
  function Ow(e, t) {
    Oa.m(e, t);
    var i = zr;
    if (i && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + On(l) + '"][href="' + On(e) + '"]', d = u;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          d = Lr(e);
      }
      if (!$n.has(d) && (e = v({ rel: "modulepreload", href: e }, t), $n.set(d, e), i.querySelector(u) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(Hl(d)))
              return;
        }
        l = i.createElement("link"), Wt(l, "link", e), ht(l), i.head.appendChild(l);
      }
    }
  }
  function Lw(e, t, i) {
    Oa.S(e, t, i);
    var l = zr;
    if (l && e) {
      var u = At(l).hoistableStyles, d = Or(e);
      t = t || "default";
      var y = u.get(d);
      if (!y) {
        var E = { loading: 0, preload: null };
        if (y = l.querySelector(
          Bl(d)
        ))
          E.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": t },
            i
          ), (i = $n.get(d)) && Dd(e, i);
          var D = y = l.createElement("link");
          ht(D), Wt(D, "link", e), D._p = new Promise(function(F, ee) {
            D.onload = F, D.onerror = ee;
          }), D.addEventListener("load", function() {
            E.loading |= 1;
          }), D.addEventListener("error", function() {
            E.loading |= 2;
          }), E.loading |= 4, No(y, t, l);
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
  function Uw(e, t) {
    Oa.X(e, t);
    var i = zr;
    if (i && e) {
      var l = At(i).hoistableScripts, u = Lr(e), d = l.get(u);
      d || (d = i.querySelector(Hl(u)), d || (e = v({ src: e, async: !0 }, t), (t = $n.get(u)) && zd(e, t), d = i.createElement("script"), ht(d), Wt(d, "link", e), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, l.set(u, d));
    }
  }
  function kw(e, t) {
    Oa.M(e, t);
    var i = zr;
    if (i && e) {
      var l = At(i).hoistableScripts, u = Lr(e), d = l.get(u);
      d || (d = i.querySelector(Hl(u)), d || (e = v({ src: e, async: !0, type: "module" }, t), (t = $n.get(u)) && zd(e, t), d = i.createElement("script"), ht(d), Wt(d, "link", e), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, l.set(u, d));
    }
  }
  function ov(e, t, i, l) {
    var u = (u = ye.current) ? Co(u) : null;
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
            Bl(e)
          )) && !d._p && (y.instance = d, y.state.loading = 5), $n.has(e) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, $n.set(e, i), d || Vw(
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
    return 'href="' + On(e) + '"';
  }
  function Bl(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function uv(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Vw(e, t, i, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? l.loading = 1 : (t = e.createElement("link"), l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    }), Wt(t, "link", i), ht(t), e.head.appendChild(t));
  }
  function Lr(e) {
    return '[src="' + On(e) + '"]';
  }
  function Hl(e) {
    return "script[async]" + e;
  }
  function cv(e, t, i) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + On(i.href) + '"]'
          );
          if (l)
            return t.instance = l, ht(l), l;
          var u = v({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), ht(l), Wt(l, "style", u), No(l, i.precedence, e), t.instance = l;
        case "stylesheet":
          u = Or(i.href);
          var d = e.querySelector(
            Bl(u)
          );
          if (d)
            return t.state.loading |= 4, t.instance = d, ht(d), d;
          l = uv(i), (u = $n.get(u)) && Dd(l, u), d = (e.ownerDocument || e).createElement("link"), ht(d);
          var y = d;
          return y._p = new Promise(function(E, D) {
            y.onload = E, y.onerror = D;
          }), Wt(d, "link", l), t.state.loading |= 4, No(d, i.precedence, e), t.instance = d;
        case "script":
          return d = Lr(i.src), (u = e.querySelector(
            Hl(d)
          )) ? (t.instance = u, ht(u), u) : (l = i, (u = $n.get(d)) && (l = v({}, i), zd(l, u)), e = e.ownerDocument || e, u = e.createElement("script"), ht(u), Wt(u, "link", l), e.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(s(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, No(l, i.precedence, e));
    return t.instance;
  }
  function No(e, t, i) {
    for (var l = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = l.length ? l[l.length - 1] : null, d = u, y = 0; y < l.length; y++) {
      var E = l[y];
      if (E.dataset.precedence === t) d = E;
      else if (d !== u) break;
    }
    d ? d.parentNode.insertBefore(e, d.nextSibling) : (t = i.nodeType === 9 ? i.head : i, t.insertBefore(e, t.firstChild));
  }
  function Dd(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function zd(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Mo = null;
  function dv(e, t, i) {
    if (Mo === null) {
      var l = /* @__PURE__ */ new Map(), u = Mo = /* @__PURE__ */ new Map();
      u.set(i, l);
    } else
      u = Mo, l = u.get(i), l || (l = /* @__PURE__ */ new Map(), u.set(i, l));
    if (l.has(e)) return l;
    for (l.set(e, null), i = i.getElementsByTagName(e), u = 0; u < i.length; u++) {
      var d = i[u];
      if (!(d[He] || d[he] || e === "link" && d.getAttribute("rel") === "stylesheet") && d.namespaceURI !== "http://www.w3.org/2000/svg") {
        var y = d.getAttribute(t) || "";
        y = e + y;
        var E = l.get(y);
        E ? E.push(d) : l.set(y, [d]);
      }
    }
    return l;
  }
  function fv(e, t, i) {
    e = e.ownerDocument || e, e.head.insertBefore(
      i,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function Bw(e, t, i) {
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
  function hv(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Hw(e, t, i, l) {
    if (i.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var u = Or(l.href), d = t.querySelector(
          Bl(u)
        );
        if (d) {
          t = d._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Ro.bind(e), t.then(e, e)), i.state.loading |= 4, i.instance = d, ht(d);
          return;
        }
        d = t.ownerDocument || t, l = uv(l), (u = $n.get(u)) && Dd(l, u), d = d.createElement("link"), ht(d);
        var y = d;
        y._p = new Promise(function(E, D) {
          y.onload = E, y.onerror = D;
        }), Wt(d, "link", l), i.instance = d;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(i, t), (t = i.state.preload) && (i.state.loading & 3) === 0 && (e.count++, i = Ro.bind(e), t.addEventListener("load", i), t.addEventListener("error", i));
    }
  }
  var Od = 0;
  function qw(e, t) {
    return e.stylesheets && e.count === 0 && _o(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(i) {
      var l = setTimeout(function() {
        if (e.stylesheets && _o(e, e.stylesheets), e.unsuspend) {
          var d = e.unsuspend;
          e.unsuspend = null, d();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Od === 0 && (Od = 62500 * Sw());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && _o(e, e.stylesheets), e.unsuspend)) {
            var d = e.unsuspend;
            e.unsuspend = null, d();
          }
        },
        (e.imgBytes > Od ? 50 : 800) + t
      );
      return e.unsuspend = i, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(u);
      };
    } : null;
  }
  function Ro() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) _o(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Ao = null;
  function _o(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Ao = /* @__PURE__ */ new Map(), t.forEach($w, e), Ao = null, Ro.call(e));
  }
  function $w(e, t) {
    if (!(t.state.loading & 4)) {
      var i = Ao.get(e);
      if (i) var l = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), Ao.set(e, i);
        for (var u = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), d = 0; d < u.length; d++) {
          var y = u[d];
          (y.nodeName === "LINK" || y.getAttribute("media") !== "not all") && (i.set(y.dataset.precedence, y), l = y);
        }
        l && i.set(null, l);
      }
      u = t.instance, y = u.getAttribute("data-precedence"), d = i.get(y) || l, d === l && i.set(null, u), i.set(y, u), this.count++, l = Ro.bind(this), u.addEventListener("load", l), u.addEventListener("error", l), d ? d.parentNode.insertBefore(u, d.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(u, e.firstChild)), t.state.loading |= 4;
    }
  }
  var ql = {
    $$typeof: O,
    Provider: null,
    Consumer: null,
    _currentValue: q,
    _currentValue2: q,
    _threadCount: 0
  };
  function Iw(e, t, i, l, u, d, y, E, D) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = bn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = bn(0), this.hiddenUpdates = bn(null), this.identifierPrefix = l, this.onUncaughtError = u, this.onCaughtError = d, this.onRecoverableError = y, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = D, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function mv(e, t, i, l, u, d, y, E, D, F, ee, ne) {
    return e = new Iw(
      e,
      t,
      i,
      y,
      D,
      F,
      ee,
      ne,
      E
    ), t = 1, d === !0 && (t |= 24), d = Sn(3, null, null, t), e.current = d, d.stateNode = e, t = hc(), t.refCount++, e.pooledCache = t, t.refCount++, d.memoizedState = {
      element: l,
      isDehydrated: i,
      cache: t
    }, vc(d), e;
  }
  function pv(e) {
    return e ? (e = fr, e) : fr;
  }
  function gv(e, t, i, l, u, d) {
    u = pv(u), l.context === null ? l.context = u : l.pendingContext = u, l = Ka(t), l.payload = { element: i }, d = d === void 0 ? null : d, d !== null && (l.callback = d), i = Qa(e, l, t), i !== null && (pn(i, e, t), bl(i, e, t));
  }
  function vv(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var i = e.retryLane;
      e.retryLane = i !== 0 && i < t ? i : t;
    }
  }
  function Ld(e, t) {
    vv(e, t), (e = e.alternate) && vv(e, t);
  }
  function yv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = _i(e, 67108864);
      t !== null && pn(t, e, 67108864), Ld(e, 67108864);
    }
  }
  function bv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Cn();
      t = V(t);
      var i = _i(e, t);
      i !== null && pn(i, e, t), Ld(e, t);
    }
  }
  var Do = !0;
  function Yw(e, t, i, l) {
    var u = U.T;
    U.T = null;
    var d = k.p;
    try {
      k.p = 2, Ud(e, t, i, l);
    } finally {
      k.p = d, U.T = u;
    }
  }
  function Fw(e, t, i, l) {
    var u = U.T;
    U.T = null;
    var d = k.p;
    try {
      k.p = 8, Ud(e, t, i, l);
    } finally {
      k.p = d, U.T = u;
    }
  }
  function Ud(e, t, i, l) {
    if (Do) {
      var u = kd(l);
      if (u === null)
        wd(
          e,
          t,
          l,
          zo,
          i
        ), Sv(e, l);
      else if (Xw(
        u,
        e,
        t,
        i,
        l
      ))
        l.stopPropagation();
      else if (Sv(e, l), t & 4 && -1 < Gw.indexOf(e)) {
        for (; u !== null; ) {
          var d = yt(u);
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (d = d.stateNode, d.current.memoizedState.isDehydrated) {
                  var y = un(d.pendingLanes);
                  if (y !== 0) {
                    var E = d;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; y; ) {
                      var D = 1 << 31 - qt(y);
                      E.entanglements[1] |= D, y &= ~D;
                    }
                    da(d), (et & 6) === 0 && (po = Vt() + 500, Ll(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = _i(d, 2), E !== null && pn(E, d, 2), vo(), Ld(d, 2);
            }
          if (d = kd(l), d === null && wd(
            e,
            t,
            l,
            zo,
            i
          ), d === u) break;
          u = d;
        }
        u !== null && l.stopPropagation();
      } else
        wd(
          e,
          t,
          l,
          null,
          i
        );
    }
  }
  function kd(e) {
    return e = Bu(e), Vd(e);
  }
  var zo = null;
  function Vd(e) {
    if (zo = null, e = lt(e), e !== null) {
      var t = c(e);
      if (t === null) e = null;
      else {
        var i = t.tag;
        if (i === 13) {
          if (e = h(t), e !== null) return e;
          e = null;
        } else if (i === 31) {
          if (e = p(t), e !== null) return e;
          e = null;
        } else if (i === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return zo = e, null;
  }
  function xv(e) {
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
        switch (ge()) {
          case ze:
            return 2;
          case Qe:
            return 8;
          case nt:
          case Bt:
            return 32;
          case Ht:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Bd = !1, li = null, si = null, oi = null, $l = /* @__PURE__ */ new Map(), Il = /* @__PURE__ */ new Map(), ui = [], Gw = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Sv(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        li = null;
        break;
      case "dragenter":
      case "dragleave":
        si = null;
        break;
      case "mouseover":
      case "mouseout":
        oi = null;
        break;
      case "pointerover":
      case "pointerout":
        $l.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Il.delete(t.pointerId);
    }
  }
  function Yl(e, t, i, l, u, d) {
    return e === null || e.nativeEvent !== d ? (e = {
      blockedOn: t,
      domEventName: i,
      eventSystemFlags: l,
      nativeEvent: d,
      targetContainers: [u]
    }, t !== null && (t = yt(t), t !== null && yv(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), e);
  }
  function Xw(e, t, i, l, u) {
    switch (t) {
      case "focusin":
        return li = Yl(
          li,
          e,
          t,
          i,
          l,
          u
        ), !0;
      case "dragenter":
        return si = Yl(
          si,
          e,
          t,
          i,
          l,
          u
        ), !0;
      case "mouseover":
        return oi = Yl(
          oi,
          e,
          t,
          i,
          l,
          u
        ), !0;
      case "pointerover":
        var d = u.pointerId;
        return $l.set(
          d,
          Yl(
            $l.get(d) || null,
            e,
            t,
            i,
            l,
            u
          )
        ), !0;
      case "gotpointercapture":
        return d = u.pointerId, Il.set(
          d,
          Yl(
            Il.get(d) || null,
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
  function wv(e) {
    var t = lt(e.target);
    if (t !== null) {
      var i = c(t);
      if (i !== null) {
        if (t = i.tag, t === 13) {
          if (t = h(i), t !== null) {
            e.blockedOn = t, ue(e.priority, function() {
              bv(i);
            });
            return;
          }
        } else if (t === 31) {
          if (t = p(i), t !== null) {
            e.blockedOn = t, ue(e.priority, function() {
              bv(i);
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
  function Oo(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var i = kd(e.nativeEvent);
      if (i === null) {
        i = e.nativeEvent;
        var l = new i.constructor(
          i.type,
          i
        );
        Vu = l, i.target.dispatchEvent(l), Vu = null;
      } else
        return t = yt(i), t !== null && yv(t), e.blockedOn = i, !1;
      t.shift();
    }
    return !0;
  }
  function Ev(e, t, i) {
    Oo(e) && i.delete(t);
  }
  function Kw() {
    Bd = !1, li !== null && Oo(li) && (li = null), si !== null && Oo(si) && (si = null), oi !== null && Oo(oi) && (oi = null), $l.forEach(Ev), Il.forEach(Ev);
  }
  function Lo(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Bd || (Bd = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      Kw
    )));
  }
  var Uo = null;
  function jv(e) {
    Uo !== e && (Uo = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        Uo === e && (Uo = null);
        for (var t = 0; t < e.length; t += 3) {
          var i = e[t], l = e[t + 1], u = e[t + 2];
          if (typeof l != "function") {
            if (Vd(l || i) === null)
              continue;
            break;
          }
          var d = yt(i);
          d !== null && (e.splice(t, 3), t -= 3, kc(
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
    function t(D) {
      return Lo(D, e);
    }
    li !== null && Lo(li, e), si !== null && Lo(si, e), oi !== null && Lo(oi, e), $l.forEach(t), Il.forEach(t);
    for (var i = 0; i < ui.length; i++) {
      var l = ui[i];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < ui.length && (i = ui[0], i.blockedOn === null); )
      wv(i), i.blockedOn === null && ui.shift();
    if (i = (e.ownerDocument || e).$$reactFormReplay, i != null)
      for (l = 0; l < i.length; l += 3) {
        var u = i[l], d = i[l + 1], y = u[me] || null;
        if (typeof d == "function")
          y || jv(i);
        else if (y) {
          var E = null;
          if (d && d.hasAttribute("formAction")) {
            if (u = d, y = d[me] || null)
              E = y.formAction;
            else if (Vd(u) !== null) continue;
          } else E = y.action;
          typeof E == "function" ? i[l + 1] = E : (i.splice(l, 3), l -= 3), jv(i);
        }
      }
  }
  function Tv() {
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
  function Hd(e) {
    this._internalRoot = e;
  }
  ko.prototype.render = Hd.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var i = t.current, l = Cn();
    gv(i, l, e, t, null, null);
  }, ko.prototype.unmount = Hd.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      gv(e.current, 2, null, e, null, null), vo(), t[je] = null;
    }
  };
  function ko(e) {
    this._internalRoot = e;
  }
  ko.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = re();
      e = { blockedOn: null, target: e, priority: t };
      for (var i = 0; i < ui.length && t !== 0 && t < ui[i].priority; i++) ;
      ui.splice(i, 0, e), i === 0 && wv(e);
    }
  };
  var Cv = a.version;
  if (Cv !== "19.2.5")
    throw Error(
      s(
        527,
        Cv,
        "19.2.5"
      )
    );
  k.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = m(t), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var Qw = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: U,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Vo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Vo.isDisabled && Vo.supportsFiber)
      try {
        Qn = Vo.inject(
          Qw
        ), Kt = Vo;
      } catch {
      }
  }
  return Gl.createRoot = function(e, t) {
    if (!o(e)) throw Error(s(299));
    var i = !1, l = "", u = zp, d = Op, y = Lp;
    return t != null && (t.unstable_strictMode === !0 && (i = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (d = t.onCaughtError), t.onRecoverableError !== void 0 && (y = t.onRecoverableError)), t = mv(
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
      Tv
    ), e[je] = t.current, Sd(e), new Hd(t);
  }, Gl.hydrateRoot = function(e, t, i) {
    if (!o(e)) throw Error(s(299));
    var l = !1, u = "", d = zp, y = Op, E = Lp, D = null;
    return i != null && (i.unstable_strictMode === !0 && (l = !0), i.identifierPrefix !== void 0 && (u = i.identifierPrefix), i.onUncaughtError !== void 0 && (d = i.onUncaughtError), i.onCaughtError !== void 0 && (y = i.onCaughtError), i.onRecoverableError !== void 0 && (E = i.onRecoverableError), i.formState !== void 0 && (D = i.formState)), t = mv(
      e,
      1,
      !0,
      t,
      i ?? null,
      l,
      u,
      D,
      d,
      y,
      E,
      Tv
    ), t.context = pv(null), i = t.current, l = Cn(), l = V(l), u = Ka(l), u.callback = null, Qa(i, u, l), i = l, t.current.lanes = i, rt(t, i), da(t), e[je] = t.current, Sd(e), new ko(t);
  }, Gl.version = "19.2.5", Gl;
}
var Uv;
function lE() {
  if (Uv) return Id.exports;
  Uv = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Id.exports = rE(), Id.exports;
}
var sE = lE();
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
var gb = (n) => {
  throw TypeError(n);
}, oE = (n, a, r) => a.has(n) || gb("Cannot " + r), Xd = (n, a, r) => (oE(n, a, "read from private field"), r ? r.call(n) : a.get(n)), uE = (n, a, r) => a.has(n) ? gb("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(n) : a.set(n, r);
function kv(n) {
  return typeof n == "object" && n != null && "pathname" in n && "search" in n && "hash" in n && "state" in n && "key" in n;
}
function cE(n = {}) {
  let { initialEntries: a = ["/"], initialIndex: r, v5Compat: s = !1 } = n, o;
  o = a.map(
    (w, j) => b(
      w,
      typeof w == "string" ? null : w.state,
      j === 0 ? "default" : void 0,
      typeof w == "string" ? void 0 : w.unstable_mask
    )
  );
  let c = g(
    r ?? o.length - 1
  ), h = "POP", p = null;
  function g(w) {
    return Math.min(Math.max(w, 0), o.length - 1);
  }
  function m() {
    return o[c];
  }
  function b(w, j = null, T, _) {
    let C = Af(
      o ? m().pathname : "/",
      w,
      j,
      T,
      _
    );
    return Mt(
      C.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        w
      )}`
    ), C;
  }
  function v(w) {
    return typeof w == "string" ? w : ha(w);
  }
  return {
    get index() {
      return c;
    },
    get action() {
      return h;
    },
    get location() {
      return m();
    },
    createHref: v,
    createURL(w) {
      return new URL(v(w), "http://localhost");
    },
    encodeLocation(w) {
      let j = typeof w == "string" ? aa(w) : w;
      return {
        pathname: j.pathname || "",
        search: j.search || "",
        hash: j.hash || ""
      };
    },
    push(w, j) {
      h = "PUSH";
      let T = kv(w) ? w : b(w, j);
      c += 1, o.splice(c, o.length, T), s && p && p({ action: h, location: T, delta: 1 });
    },
    replace(w, j) {
      h = "REPLACE";
      let T = kv(w) ? w : b(w, j);
      o[c] = T, s && p && p({ action: h, location: T, delta: 0 });
    },
    go(w) {
      h = "POP";
      let j = g(c + w), T = o[j];
      c = j, p && p({ action: h, location: T, delta: w });
    },
    listen(w) {
      return p = w, () => {
        p = null;
      };
    }
  };
}
function $e(n, a) {
  if (n === !1 || n === null || typeof n > "u")
    throw new Error(a);
}
function Mt(n, a) {
  if (!n) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function dE() {
  return Math.random().toString(36).substring(2, 10);
}
function Af(n, a, r = null, s, o) {
  return {
    pathname: typeof n == "string" ? n : n.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? aa(a) : a,
    state: r,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || s || dE(),
    unstable_mask: o
  };
}
function ha({
  pathname: n = "/",
  search: a = "",
  hash: r = ""
}) {
  return a && a !== "?" && (n += a.charAt(0) === "?" ? a : "?" + a), r && r !== "#" && (n += r.charAt(0) === "#" ? r : "#" + r), n;
}
function aa(n) {
  let a = {};
  if (n) {
    let r = n.indexOf("#");
    r >= 0 && (a.hash = n.substring(r), n = n.substring(0, r));
    let s = n.indexOf("?");
    s >= 0 && (a.search = n.substring(s), n = n.substring(0, s)), n && (a.pathname = n);
  }
  return a;
}
function fE(n, a = !1) {
  let r = "http://localhost";
  typeof window < "u" && (r = window.location.origin !== "null" ? window.location.origin : window.location.href), $e(r, "No window.location.(origin|href) available to create URL");
  let s = typeof n == "string" ? n : ha(n);
  return s = s.replace(/ $/, "%20"), !a && s.startsWith("//") && (s = r + s), new URL(s, r);
}
var es, Vv = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(n) {
    if (uE(this, es, /* @__PURE__ */ new Map()), n)
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
    if (Xd(this, es).has(n))
      return Xd(this, es).get(n);
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
    Xd(this, es).set(n, a);
  }
};
es = /* @__PURE__ */ new WeakMap();
var hE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function mE(n) {
  return hE.has(
    n
  );
}
var pE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function gE(n) {
  return pE.has(
    n
  );
}
function vE(n) {
  return n.index === !0;
}
function os(n, a, r = [], s = {}, o = !1) {
  return n.map((c, h) => {
    let p = [...r, String(h)], g = typeof c.id == "string" ? c.id : p.join("-");
    if ($e(
      c.index !== !0 || !c.children,
      "Cannot specify children on an index route"
    ), $e(
      o || !s[g],
      `Found a route id collision on id "${g}".  Route id's must be globally unique within Data Router usages`
    ), vE(c)) {
      let m = {
        ...c,
        id: g
      };
      return s[g] = Bv(
        m,
        a(m)
      ), m;
    } else {
      let m = {
        ...c,
        id: g,
        children: void 0
      };
      return s[g] = Bv(
        m,
        a(m)
      ), c.children && (m.children = os(
        c.children,
        a,
        p,
        s,
        o
      )), m;
    }
  });
}
function Bv(n, a) {
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
function pi(n, a, r = "/") {
  return ts(n, a, r, !1);
}
function ts(n, a, r, s) {
  let o = typeof a == "string" ? aa(a) : a, c = Xn(o.pathname || "/", r);
  if (c == null)
    return null;
  let h = vb(n);
  bE(h);
  let p = null;
  for (let g = 0; p == null && g < h.length; ++g) {
    let m = AE(c);
    p = ME(
      h[g],
      m,
      s
    );
  }
  return p;
}
function yE(n, a) {
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
function vb(n, a = [], r = [], s = "", o = !1) {
  let c = (h, p, g = o, m) => {
    let b = {
      relativePath: m === void 0 ? h.path || "" : m,
      caseSensitive: h.caseSensitive === !0,
      childrenIndex: p,
      route: h
    };
    if (b.relativePath.startsWith("/")) {
      if (!b.relativePath.startsWith(s) && g)
        return;
      $e(
        b.relativePath.startsWith(s),
        `Absolute route path "${b.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), b.relativePath = b.relativePath.slice(s.length);
    }
    let v = Yn([s, b.relativePath]), S = r.concat(b);
    h.children && h.children.length > 0 && ($e(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      h.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${v}".`
    ), vb(
      h.children,
      a,
      S,
      v,
      g
    )), !(h.path == null && !h.index) && a.push({
      path: v,
      score: CE(v, h.index),
      routesMeta: S
    });
  };
  return n.forEach((h, p) => {
    if (h.path === "" || !h.path?.includes("?"))
      c(h, p);
    else
      for (let g of yb(h.path))
        c(h, p, !0, g);
  }), a;
}
function yb(n) {
  let a = n.split("/");
  if (a.length === 0) return [];
  let [r, ...s] = a, o = r.endsWith("?"), c = r.replace(/\?$/, "");
  if (s.length === 0)
    return o ? [c, ""] : [c];
  let h = yb(s.join("/")), p = [];
  return p.push(
    ...h.map(
      (g) => g === "" ? c : [c, g].join("/")
    )
  ), o && p.push(...h), p.map(
    (g) => n.startsWith("/") && g === "" ? "/" : g
  );
}
function bE(n) {
  n.sort(
    (a, r) => a.score !== r.score ? r.score - a.score : NE(
      a.routesMeta.map((s) => s.childrenIndex),
      r.routesMeta.map((s) => s.childrenIndex)
    )
  );
}
var xE = /^:[\w-]+$/, SE = 3, wE = 2, EE = 1, jE = 10, TE = -2, Hv = (n) => n === "*";
function CE(n, a) {
  let r = n.split("/"), s = r.length;
  return r.some(Hv) && (s += TE), a && (s += wE), r.filter((o) => !Hv(o)).reduce(
    (o, c) => o + (xE.test(c) ? SE : c === "" ? EE : jE),
    s
  );
}
function NE(n, a) {
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
function ME(n, a, r = !1) {
  let { routesMeta: s } = n, o = {}, c = "/", h = [];
  for (let p = 0; p < s.length; ++p) {
    let g = s[p], m = p === s.length - 1, b = c === "/" ? a : a.slice(c.length) || "/", v = cu(
      { path: g.relativePath, caseSensitive: g.caseSensitive, end: m },
      b
    ), S = g.route;
    if (!v && m && r && !s[s.length - 1].route.index && (v = cu(
      {
        path: g.relativePath,
        caseSensitive: g.caseSensitive,
        end: !1
      },
      b
    )), !v)
      return null;
    Object.assign(o, v.params), h.push({
      // TODO: Can this as be avoided?
      params: o,
      pathname: Yn([c, v.pathname]),
      pathnameBase: zE(
        Yn([c, v.pathnameBase])
      ),
      route: S
    }), v.pathnameBase !== "/" && (c = Yn([c, v.pathnameBase]));
  }
  return h;
}
function cu(n, a) {
  typeof n == "string" && (n = { path: n, caseSensitive: !1, end: !0 });
  let [r, s] = RE(
    n.path,
    n.caseSensitive,
    n.end
  ), o = a.match(r);
  if (!o) return null;
  let c = o[0], h = c.replace(/(.)\/+$/, "$1"), p = o.slice(1);
  return {
    params: s.reduce(
      (m, { paramName: b, isOptional: v }, S) => {
        if (b === "*") {
          let j = p[S] || "";
          h = c.slice(0, c.length - j.length).replace(/(.)\/+$/, "$1");
        }
        const w = p[S];
        return v && !w ? m[b] = void 0 : m[b] = (w || "").replace(/%2F/g, "/"), m;
      },
      {}
    ),
    pathname: c,
    pathnameBase: h,
    pattern: n
  };
}
function RE(n, a = !1, r = !0) {
  Mt(
    n === "*" || !n.endsWith("*") || n.endsWith("/*"),
    `Route path "${n}" will be treated as if it were "${n.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/, "/*")}".`
  );
  let s = [], o = "^" + n.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (h, p, g, m, b) => {
      if (s.push({ paramName: p, isOptional: g != null }), g) {
        let v = b.charAt(m + h.length);
        return v && v !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return n.endsWith("*") ? (s.push({ paramName: "*" }), o += n === "*" || n === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? o += "\\/*$" : n !== "" && n !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, a ? void 0 : "i"), s];
}
function AE(n) {
  try {
    return n.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return Mt(
      !1,
      `The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), n;
  }
}
function Xn(n, a) {
  if (a === "/") return n;
  if (!n.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let r = a.endsWith("/") ? a.length - 1 : a.length, s = n.charAt(r);
  return s && s !== "/" ? null : n.slice(r) || "/";
}
function _E({
  basename: n,
  pathname: a
}) {
  return a === "/" ? n : Yn([n, a]);
}
var bb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, rh = (n) => bb.test(n);
function DE(n, a = "/") {
  let {
    pathname: r,
    search: s = "",
    hash: o = ""
  } = typeof n == "string" ? aa(n) : n, c;
  return r ? (r = sh(r), r.startsWith("/") ? c = qv(r.substring(1), "/") : c = qv(r, a)) : c = a, {
    pathname: c,
    search: OE(s),
    hash: LE(o)
  };
}
function qv(n, a) {
  let r = du(a).split("/");
  return n.split("/").forEach((o) => {
    o === ".." ? r.length > 1 && r.pop() : o !== "." && r.push(o);
  }), r.length > 1 ? r.join("/") : "/";
}
function Kd(n, a, r, s) {
  return `Cannot include a '${n}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    s
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function xb(n) {
  return n.filter(
    (a, r) => r === 0 || a.route.path && a.route.path.length > 0
  );
}
function lh(n) {
  let a = xb(n);
  return a.map(
    (r, s) => s === a.length - 1 ? r.pathname : r.pathnameBase
  );
}
function Su(n, a, r, s = !1) {
  let o;
  typeof n == "string" ? o = aa(n) : (o = { ...n }, $e(
    !o.pathname || !o.pathname.includes("?"),
    Kd("?", "pathname", "search", o)
  ), $e(
    !o.pathname || !o.pathname.includes("#"),
    Kd("#", "pathname", "hash", o)
  ), $e(
    !o.search || !o.search.includes("#"),
    Kd("#", "search", "hash", o)
  ));
  let c = n === "" || o.pathname === "", h = c ? "/" : o.pathname, p;
  if (h == null)
    p = r;
  else {
    let v = a.length - 1;
    if (!s && h.startsWith("..")) {
      let S = h.split("/");
      for (; S[0] === ".."; )
        S.shift(), v -= 1;
      o.pathname = S.join("/");
    }
    p = v >= 0 ? a[v] : "/";
  }
  let g = DE(o, p), m = h && h !== "/" && h.endsWith("/"), b = (c || h === ".") && r.endsWith("/");
  return !g.pathname.endsWith("/") && (m || b) && (g.pathname += "/"), g;
}
var sh = (n) => n.replace(/\/\/+/g, "/"), Yn = (n) => sh(n.join("/")), du = (n) => n.replace(/\/+$/, ""), zE = (n) => du(n).replace(/^\/*/, "/"), OE = (n) => !n || n === "?" ? "" : n.startsWith("?") ? n : "?" + n, LE = (n) => !n || n === "#" ? "" : n.startsWith("#") ? n : "#" + n, UE = (n, a = 302) => {
  let r = a;
  typeof r == "number" ? r = { status: r } : typeof r.status > "u" && (r.status = 302);
  let s = new Headers(r.headers);
  return s.set("Location", n), new Response(null, { ...r, headers: s });
}, wu = class {
  constructor(n, a, r, s = !1) {
    this.status = n, this.statusText = a || "", this.internal = s, r instanceof Error ? (this.data = r.toString(), this.error = r) : this.data = r;
  }
};
function us(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.internal == "boolean" && "data" in n;
}
function vs(n) {
  let a = n.map((r) => r.route.path).filter(Boolean);
  return Yn(a) || "/";
}
var Sb = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function wb(n, a) {
  let r = n;
  if (typeof r != "string" || !bb.test(r))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: r
    };
  let s = r, o = !1;
  if (Sb)
    try {
      let c = new URL(window.location.href), h = r.startsWith("//") ? new URL(c.protocol + r) : new URL(r), p = Xn(h.pathname, a);
      h.origin === c.origin && p != null ? r = p + h.search + h.hash : o = !0;
    } catch {
      Mt(
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
var vi = Symbol("Uninstrumented");
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
        for (let p of h)
          c[p] && r[p].push(c[p]);
      }
    })
  );
  let s = {};
  if (typeof a.lazy == "function" && r.lazy.length > 0) {
    let o = Ir(r.lazy, a.lazy, () => {
    });
    o && (s.lazy = o);
  }
  if (typeof a.lazy == "object") {
    let o = a.lazy;
    ["middleware", "loader", "action"].forEach((c) => {
      let h = o[c], p = r[`lazy.${c}`];
      if (typeof h == "function" && p.length > 0) {
        let g = Ir(p, h, () => {
        });
        g && (s.lazy = Object.assign(s.lazy || {}, {
          [c]: g
        }));
      }
    });
  }
  return ["loader", "action"].forEach((o) => {
    let c = a[o];
    if (typeof c == "function" && r[o].length > 0) {
      let h = c[vi] ?? c, p = Ir(
        r[o],
        h,
        (...g) => $v(g[0])
      );
      p && (o === "loader" && h.hydrate === !0 && (p.hydrate = !0), p[vi] = h, s[o] = p);
    }
  }), a.middleware && a.middleware.length > 0 && r.middleware.length > 0 && (s.middleware = a.middleware.map((o) => {
    let c = o[vi] ?? o, h = Ir(
      r.middleware,
      c,
      (...p) => $v(p[0])
    );
    return h ? (h[vi] = c, h) : o;
  })), s;
}
function VE(n, a) {
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
    let s = n.navigate[vi] ?? n.navigate, o = Ir(
      r.navigate,
      s,
      (...c) => {
        let [h, p] = c;
        return {
          to: typeof h == "number" || typeof h == "string" ? h : h ? ha(h) : ".",
          ...Iv(n, p ?? {})
        };
      }
    );
    o && (o[vi] = s, n.navigate = o);
  }
  if (r.fetch.length > 0) {
    let s = n.fetch[vi] ?? n.fetch, o = Ir(r.fetch, s, (...c) => {
      let [h, , p, g] = c;
      return {
        href: p ?? ".",
        fetcherKey: h,
        ...Iv(n, g ?? {})
      };
    });
    o && (o[vi] = s, n.fetch = o);
  }
  return n;
}
function Ir(n, a, r) {
  return n.length === 0 ? null : async (...s) => {
    let o = await Eb(
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
async function Eb(n, a, r, s) {
  let o = n[s], c;
  if (o) {
    let h, p = async () => (h ? console.error("You cannot call instrumented handlers more than once") : h = Eb(n, a, r, s - 1), c = await h, $e(c, "Expected a result"), c.type === "error" && c.value instanceof Error ? { status: "error", error: c.value } : { status: "success", error: void 0 });
    try {
      await o(p, a);
    } catch (g) {
      console.error("An instrumentation function threw an error:", g);
    }
    h || await p(), await h;
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
function $v(n) {
  let { request: a, context: r, params: s, unstable_pattern: o } = n;
  return {
    request: BE(a),
    params: { ...s },
    unstable_pattern: o,
    context: HE(r)
  };
}
function Iv(n, a) {
  return {
    currentUrl: ha(n.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function BE(n) {
  return {
    method: n.method,
    url: n.url,
    headers: {
      get: (...a) => n.headers.get(...a)
    }
  };
}
function HE(n) {
  if ($E(n)) {
    let a = { ...n };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => n.get(a)
    };
}
var qE = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function $E(n) {
  if (n === null || typeof n != "object")
    return !1;
  const a = Object.getPrototypeOf(n);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === qE;
}
var jb = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], IE = new Set(
  jb
), YE = [
  "GET",
  ...jb
], FE = new Set(YE), Tb = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), GE = /* @__PURE__ */ new Set([307, 308]), Qd = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, XE = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Xl = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, KE = (n) => ({
  hasErrorBoundary: !!n.hasErrorBoundary
}), Cb = "remix-router-transitions", Nb = Symbol("ResetLoaderData");
function QE(n) {
  const a = n.window ? n.window : typeof window < "u" ? window : void 0, r = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  $e(
    n.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let s = n.hydrationRouteProperties || [], o = n.mapRouteProperties || KE, c = o;
  if (n.unstable_instrumentations) {
    let A = n.unstable_instrumentations;
    c = (V) => ({
      ...o(V),
      ...kE(
        A.map((I) => I.route).filter(Boolean),
        V
      )
    });
  }
  let h = {}, p = os(
    n.routes,
    c,
    void 0,
    h
  ), g, m = n.basename || "/";
  m.startsWith("/") || (m = `/${m}`);
  let b = n.dataStrategy || ej, v = {
    unstable_passThroughRequests: !1,
    ...n.future
  }, S = null, w = /* @__PURE__ */ new Set(), j = null, T = null, _ = null, C = n.hydrationData != null, z = pi(p, n.history.location, m), O = !1, R = null, X, $;
  if (z == null && !n.patchRoutesOnNavigation) {
    let A = In(404, {
      pathname: n.history.location.pathname
    }), { matches: V, route: I } = Bo(p);
    X = !0, $ = !X, z = V, R = { [I.id]: A };
  } else if (z && !n.hydrationData && bn(
    z,
    p,
    n.history.location.pathname
  ).active && (z = null), z)
    if (z.some((A) => A.route.lazy))
      X = !1, $ = !X;
    else if (!z.some((A) => oh(A.route)))
      X = !0, $ = !X;
    else {
      let A = n.hydrationData ? n.hydrationData.loaderData : null, V = n.hydrationData ? n.hydrationData.errors : null, I = z;
      if (V) {
        let re = z.findIndex(
          (ue) => V[ue.route.id] !== void 0
        );
        I = I.slice(0, re + 1);
      }
      $ = !1, X = !0, I.forEach((re) => {
        let ue = Mb(re.route, A, V);
        $ = $ || ue.renderFallback, X = X && !ue.shouldLoad;
      });
    }
  else {
    X = !1, $ = !X, z = [];
    let A = bn(
      null,
      p,
      n.history.location.pathname
    );
    A.active && A.matches && (O = !0, z = A.matches);
  }
  let Q, M = {
    historyAction: n.history.action,
    location: n.history.location,
    matches: z,
    initialized: X,
    renderFallback: $,
    navigation: Qd,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: n.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: n.hydrationData && n.hydrationData.loaderData || {},
    actionData: n.hydrationData && n.hydrationData.actionData || null,
    errors: n.hydrationData && n.hydrationData.errors || R,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, B = "POP", J = null, se = !1, oe, be = !1, Se = /* @__PURE__ */ new Map(), le = null, U = !1, k = !1, q = /* @__PURE__ */ new Set(), Z = /* @__PURE__ */ new Map(), ae = 0, N = -1, P = /* @__PURE__ */ new Map(), W = /* @__PURE__ */ new Set(), ie = /* @__PURE__ */ new Map(), de = /* @__PURE__ */ new Map(), ye = /* @__PURE__ */ new Set(), De = /* @__PURE__ */ new Map(), Re, Be = null;
  function fe() {
    if (S = n.history.listen(
      ({ action: A, location: V, delta: I }) => {
        if (Re) {
          Re(), Re = void 0;
          return;
        }
        Mt(
          De.size === 0 || I != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let re = ra({
          currentLocation: M.location,
          nextLocation: V,
          historyAction: A
        });
        if (re && I != null) {
          let ue = new Promise((we) => {
            Re = we;
          });
          n.history.go(I * -1), Zn(re, {
            state: "blocked",
            location: V,
            proceed() {
              Zn(re, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: V
              }), ue.then(() => n.history.go(I));
            },
            reset() {
              let we = new Map(M.blockers);
              we.set(re, Xl), pe({ blockers: we });
            }
          }), J?.resolve(), J = null;
          return;
        }
        return Gt(A, V);
      }
    ), r) {
      yj(a, Se);
      let A = () => bj(a, Se);
      a.addEventListener("pagehide", A), le = () => a.removeEventListener("pagehide", A);
    }
    return M.initialized || Gt("POP", M.location, {
      initialHydration: !0
    }), Q;
  }
  function Oe() {
    S && S(), le && le(), w.clear(), oe && oe.abort(), M.fetchers.forEach((A, V) => Qn(V)), M.blockers.forEach((A, V) => ga(V));
  }
  function Ae(A) {
    return w.add(A), () => w.delete(A);
  }
  function pe(A, V = {}) {
    A.matches && (A.matches = A.matches.map((ue) => {
      let we = h[ue.route.id], he = ue.route;
      return he.element !== we.element || he.errorElement !== we.errorElement || he.hydrateFallbackElement !== we.hydrateFallbackElement ? {
        ...ue,
        route: we
      } : ue;
    })), M = {
      ...M,
      ...A
    };
    let I = [], re = [];
    M.fetchers.forEach((ue, we) => {
      ue.state === "idle" && (ye.has(we) ? I.push(we) : re.push(we));
    }), ye.forEach((ue) => {
      !M.fetchers.has(ue) && !Z.has(ue) && I.push(ue);
    }), [...w].forEach(
      (ue) => ue(M, {
        deletedFetchers: I,
        newErrors: A.errors ?? null,
        viewTransitionOpts: V.viewTransitionOpts,
        flushSync: V.flushSync === !0
      })
    ), I.forEach((ue) => Qn(ue)), re.forEach((ue) => M.fetchers.delete(ue));
  }
  function tt(A, V, { flushSync: I } = {}) {
    let re = M.actionData != null && M.navigation.formMethod != null && rn(M.navigation.formMethod) && M.navigation.state === "loading" && A.state?._isRedirect !== !0, ue;
    V.actionData ? Object.keys(V.actionData).length > 0 ? ue = V.actionData : ue = null : re ? ue = M.actionData : ue = null;
    let we = V.loaderData ? ey(
      M.loaderData,
      V.loaderData,
      V.matches || [],
      V.errors
    ) : M.loaderData, he = M.blockers;
    he.size > 0 && (he = new Map(he), he.forEach((Me, Ce) => he.set(Ce, Xl)));
    let me = U ? !1 : $t(A, V.matches || M.matches), je = se === !0 || M.navigation.formMethod != null && rn(M.navigation.formMethod) && A.state?._isRedirect !== !0;
    g && (p = g, g = void 0), U || B === "POP" || (B === "PUSH" ? n.history.push(A, A.state) : B === "REPLACE" && n.history.replace(A, A.state));
    let ve;
    if (B === "POP") {
      let Me = Se.get(M.location.pathname);
      Me && Me.has(A.pathname) ? ve = {
        currentLocation: M.location,
        nextLocation: A
      } : Se.has(A.pathname) && (ve = {
        currentLocation: A,
        nextLocation: M.location
      });
    } else if (be) {
      let Me = Se.get(M.location.pathname);
      Me ? Me.add(A.pathname) : (Me = /* @__PURE__ */ new Set([A.pathname]), Se.set(M.location.pathname, Me)), ve = {
        currentLocation: M.location,
        nextLocation: A
      };
    }
    pe(
      {
        ...V,
        // matches, errors, fetchers go through as-is
        actionData: ue,
        loaderData: we,
        historyAction: B,
        location: A,
        initialized: !0,
        renderFallback: !1,
        navigation: Qd,
        revalidation: "idle",
        restoreScrollPosition: me,
        preventScrollReset: je,
        blockers: he
      },
      {
        viewTransitionOpts: ve,
        flushSync: I === !0
      }
    ), B = "POP", se = !1, be = !1, U = !1, k = !1, J?.resolve(), J = null, Be?.resolve(), Be = null;
  }
  async function Et(A, V) {
    if (J?.resolve(), J = null, typeof A == "number") {
      J || (J = iy());
      let dt = J.promise;
      return n.history.go(A), dt;
    }
    let I = _f(
      M.location,
      M.matches,
      m,
      A,
      V?.fromRouteId,
      V?.relative
    ), { path: re, submission: ue, error: we } = Yv(
      !1,
      I,
      V
    ), he;
    V?.unstable_mask && (he = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof V.unstable_mask == "string" ? aa(V.unstable_mask) : {
        ...M.location.unstable_mask,
        ...V.unstable_mask
      }
    });
    let me = M.location, je = Af(
      me,
      re,
      V && V.state,
      void 0,
      he
    );
    je = {
      ...je,
      ...n.history.encodeLocation(je)
    };
    let ve = V && V.replace != null ? V.replace : void 0, Me = "PUSH";
    ve === !0 ? Me = "REPLACE" : ve === !1 || ue != null && rn(ue.formMethod) && ue.formAction === M.location.pathname + M.location.search && (Me = "REPLACE");
    let Ce = V && "preventScrollReset" in V ? V.preventScrollReset === !0 : void 0, Pe = (V && V.flushSync) === !0, He = ra({
      currentLocation: me,
      nextLocation: je,
      historyAction: Me
    });
    if (He) {
      Zn(He, {
        state: "blocked",
        location: je,
        proceed() {
          Zn(He, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: je
          }), Et(A, V);
        },
        reset() {
          let dt = new Map(M.blockers);
          dt.set(He, Xl), pe({ blockers: dt });
        }
      });
      return;
    }
    await Gt(Me, je, {
      submission: ue,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: we,
      preventScrollReset: Ce,
      replace: V && V.replace,
      enableViewTransition: V && V.viewTransition,
      flushSync: Pe,
      callSiteDefaultShouldRevalidate: V && V.unstable_defaultShouldRevalidate
    });
  }
  function en() {
    Be || (Be = iy()), nt(), pe({ revalidation: "loading" });
    let A = Be.promise;
    return M.navigation.state === "submitting" ? A : M.navigation.state === "idle" ? (Gt(M.historyAction, M.location, {
      startUninterruptedRevalidation: !0
    }), A) : (Gt(
      B || M.historyAction,
      M.navigation.location,
      {
        overrideNavigation: M.navigation,
        // Proxy through any rending view transition
        enableViewTransition: be === !0
      }
    ), A);
  }
  async function Gt(A, V, I) {
    oe && oe.abort(), oe = null, B = A, U = (I && I.startUninterruptedRevalidation) === !0, Rt(M.location, M.matches), se = (I && I.preventScrollReset) === !0, be = (I && I.enableViewTransition) === !0;
    let re = g || p, ue = I && I.overrideNavigation, we = I?.initialHydration && M.matches && M.matches.length > 0 && !O ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      M.matches
    ) : pi(re, V, m), he = (I && I.flushSync) === !0;
    if (we && M.initialized && !k && oj(M.location, V) && !(I && I.submission && rn(I.submission.formMethod))) {
      tt(V, { matches: we }, { flushSync: he });
      return;
    }
    let me = bn(we, re, V.pathname);
    if (me.active && me.matches && (we = me.matches), !we) {
      let { error: lt, notFoundMatches: yt, route: Ie } = un(
        V.pathname
      );
      tt(
        V,
        {
          matches: yt,
          loaderData: {},
          errors: {
            [Ie.id]: lt
          }
        },
        { flushSync: he }
      );
      return;
    }
    oe = new AbortController();
    let je = $r(
      n.history,
      V,
      oe.signal,
      I && I.submission
    ), ve = n.getContext ? await n.getContext() : new Vv(), Me;
    if (I && I.pendingError)
      Me = [
        gi(we).route.id,
        { type: "error", error: I.pendingError }
      ];
    else if (I && I.submission && rn(I.submission.formMethod)) {
      let lt = await ma(
        je,
        V,
        I.submission,
        we,
        ve,
        me.active,
        I && I.initialHydration === !0,
        { replace: I.replace, flushSync: he }
      );
      if (lt.shortCircuited)
        return;
      if (lt.pendingActionResult) {
        let [yt, Ie] = lt.pendingActionResult;
        if (Mn(Ie) && us(Ie.error) && Ie.error.status === 404) {
          oe = null, tt(V, {
            matches: lt.matches,
            loaderData: {},
            errors: {
              [yt]: Ie.error
            }
          });
          return;
        }
      }
      we = lt.matches || we, Me = lt.pendingActionResult, ue = Zd(V, I.submission), he = !1, me.active = !1, je = $r(
        n.history,
        je.url,
        je.signal
      );
    }
    let {
      shortCircuited: Ce,
      matches: Pe,
      loaderData: He,
      errors: dt
    } = await Xt(
      je,
      V,
      we,
      ve,
      me.active,
      ue,
      I && I.submission,
      I && I.fetcherSubmission,
      I && I.replace,
      I && I.initialHydration === !0,
      he,
      Me,
      I && I.callSiteDefaultShouldRevalidate
    );
    Ce || (oe = null, tt(V, {
      matches: Pe || we,
      ...ty(Me),
      loaderData: He,
      errors: dt
    }));
  }
  async function ma(A, V, I, re, ue, we, he, me = {}) {
    nt();
    let je = gj(V, I);
    if (pe({ navigation: je }, { flushSync: me.flushSync === !0 }), we) {
      let Ce = await rt(
        re,
        V.pathname,
        A.signal
      );
      if (Ce.type === "aborted")
        return { shortCircuited: !0 };
      if (Ce.type === "error") {
        if (Ce.partialMatches.length === 0) {
          let { matches: He, route: dt } = Bo(p);
          return {
            matches: He,
            pendingActionResult: [
              dt.id,
              {
                type: "error",
                error: Ce.error
              }
            ]
          };
        }
        let Pe = gi(Ce.partialMatches).route.id;
        return {
          matches: Ce.partialMatches,
          pendingActionResult: [
            Pe,
            {
              type: "error",
              error: Ce.error
            }
          ]
        };
      } else if (Ce.matches)
        re = Ce.matches;
      else {
        let { notFoundMatches: Pe, error: He, route: dt } = un(
          V.pathname
        );
        return {
          matches: Pe,
          pendingActionResult: [
            dt.id,
            {
              type: "error",
              error: He
            }
          ]
        };
      }
    }
    let ve, Me = nu(re, V);
    if (!Me.route.action && !Me.route.lazy)
      ve = {
        type: "error",
        error: In(405, {
          method: A.method,
          pathname: V.pathname,
          routeId: Me.route.id
        })
      };
    else {
      let Ce = Gr(
        c,
        h,
        A,
        V,
        re,
        Me,
        he ? [] : s,
        ue
      ), Pe = await ze(
        A,
        V,
        Ce,
        ue,
        null
      );
      if (ve = Pe[Me.route.id], !ve) {
        for (let He of re)
          if (Pe[He.route.id]) {
            ve = Pe[He.route.id];
            break;
          }
      }
      if (A.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Xi(ve)) {
      let Ce;
      return me && me.replace != null ? Ce = me.replace : Ce = Pv(
        ve.response.headers.get("Location"),
        new URL(A.url),
        m,
        n.history
      ) === M.location.pathname + M.location.search, await ge(A, ve, !0, {
        submission: I,
        replace: Ce
      }), { shortCircuited: !0 };
    }
    if (Mn(ve)) {
      let Ce = gi(re, Me.route.id);
      return (me && me.replace) !== !0 && (B = "PUSH"), {
        matches: re,
        pendingActionResult: [
          Ce.route.id,
          ve,
          Me.route.id
        ]
      };
    }
    return {
      matches: re,
      pendingActionResult: [Me.route.id, ve]
    };
  }
  async function Xt(A, V, I, re, ue, we, he, me, je, ve, Me, Ce, Pe) {
    let He = we || Zd(V, he), dt = he || me || ay(He), lt = !U && !ve;
    if (ue) {
      if (lt) {
        let Tt = yn(Ce);
        pe(
          {
            navigation: He,
            ...Tt !== void 0 ? { actionData: Tt } : {}
          },
          {
            flushSync: Me
          }
        );
      }
      let qe = await rt(
        I,
        V.pathname,
        A.signal
      );
      if (qe.type === "aborted")
        return { shortCircuited: !0 };
      if (qe.type === "error") {
        if (qe.partialMatches.length === 0) {
          let { matches: nn, route: _t } = Bo(p);
          return {
            matches: nn,
            loaderData: {},
            errors: {
              [_t.id]: qe.error
            }
          };
        }
        let Tt = gi(qe.partialMatches).route.id;
        return {
          matches: qe.partialMatches,
          loaderData: {},
          errors: {
            [Tt]: qe.error
          }
        };
      } else if (qe.matches)
        I = qe.matches;
      else {
        let { error: Tt, notFoundMatches: nn, route: _t } = un(
          V.pathname
        );
        return {
          matches: nn,
          loaderData: {},
          errors: {
            [_t.id]: Tt
          }
        };
      }
    }
    let yt = g || p, { dsMatches: Ie, revalidatingFetchers: At } = Fv(
      A,
      re,
      c,
      h,
      n.history,
      M,
      I,
      dt,
      V,
      ve ? [] : s,
      ve === !0,
      k,
      q,
      ye,
      ie,
      W,
      yt,
      m,
      n.patchRoutesOnNavigation != null,
      Ce,
      Pe
    );
    if (N = ++ae, !n.dataStrategy && !Ie.some((qe) => qe.shouldLoad) && !Ie.some(
      (qe) => qe.route.middleware && qe.route.middleware.length > 0
    ) && At.length === 0) {
      let qe = er();
      return tt(
        V,
        {
          matches: I,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Ce && Mn(Ce[1]) ? { [Ce[0]]: Ce[1].error } : null,
          ...ty(Ce),
          ...qe ? { fetchers: new Map(M.fetchers) } : {}
        },
        { flushSync: Me }
      ), { shortCircuited: !0 };
    }
    if (lt) {
      let qe = {};
      if (!ue) {
        qe.navigation = He;
        let Tt = yn(Ce);
        Tt !== void 0 && (qe.actionData = Tt);
      }
      At.length > 0 && (qe.fetchers = pa(At)), pe(qe, { flushSync: Me });
    }
    At.forEach((qe) => {
      jt(qe.key), qe.controller && Z.set(qe.key, qe.controller);
    });
    let ht = () => At.forEach((qe) => jt(qe.key));
    oe && oe.signal.addEventListener(
      "abort",
      ht
    );
    let { loaderResults: qa, fetcherResults: Pn } = await Qe(
      Ie,
      At,
      A,
      V,
      re
    );
    if (A.signal.aborted)
      return { shortCircuited: !0 };
    oe && oe.signal.removeEventListener(
      "abort",
      ht
    ), At.forEach((qe) => Z.delete(qe.key));
    let Yt = Ho(qa);
    if (Yt)
      return await ge(A, Yt.result, !0, {
        replace: je
      }), { shortCircuited: !0 };
    if (Yt = Ho(Pn), Yt)
      return W.add(Yt.key), await ge(A, Yt.result, !0, {
        replace: je
      }), { shortCircuited: !0 };
    let { loaderData: la, errors: Ci } = Wv(
      M,
      I,
      qa,
      Ce,
      At,
      Pn
    );
    ve && M.errors && (Ci = { ...M.errors, ...Ci });
    let sa = er(), Ni = Ha(N), tr = sa || Ni || At.length > 0;
    return {
      matches: I,
      loaderData: la,
      errors: Ci,
      ...tr ? { fetchers: new Map(M.fetchers) } : {}
    };
  }
  function yn(A) {
    if (A && !Mn(A[1]))
      return {
        [A[0]]: A[1].data
      };
    if (M.actionData)
      return Object.keys(M.actionData).length === 0 ? null : M.actionData;
  }
  function pa(A) {
    return A.forEach((V) => {
      let I = M.fetchers.get(V.key), re = Kl(
        void 0,
        I ? I.data : void 0
      );
      M.fetchers.set(V.key, re);
    }), new Map(M.fetchers);
  }
  async function kt(A, V, I, re) {
    jt(A);
    let ue = (re && re.flushSync) === !0, we = g || p, he = _f(
      M.location,
      M.matches,
      m,
      I,
      V,
      re?.relative
    ), me = pi(we, he, m), je = bn(me, we, he);
    if (je.active && je.matches && (me = je.matches), !me) {
      Ht(
        A,
        V,
        In(404, { pathname: he }),
        { flushSync: ue }
      );
      return;
    }
    let { path: ve, submission: Me, error: Ce } = Yv(
      !0,
      he,
      re
    );
    if (Ce) {
      Ht(A, V, Ce, { flushSync: ue });
      return;
    }
    let Pe = n.getContext ? await n.getContext() : new Vv(), He = (re && re.preventScrollReset) === !0;
    if (Me && rn(Me.formMethod)) {
      await Dn(
        A,
        V,
        ve,
        me,
        Pe,
        je.active,
        ue,
        He,
        Me,
        re && re.unstable_defaultShouldRevalidate
      );
      return;
    }
    ie.set(A, { routeId: V, path: ve }), await Vt(
      A,
      V,
      ve,
      me,
      Pe,
      je.active,
      ue,
      He,
      Me
    );
  }
  async function Dn(A, V, I, re, ue, we, he, me, je, ve) {
    nt(), ie.delete(A);
    let Me = M.fetchers.get(A);
    Bt(A, vj(je, Me), {
      flushSync: he
    });
    let Ce = new AbortController(), Pe = $r(
      n.history,
      I,
      Ce.signal,
      je
    );
    if (we) {
      let mt = await rt(
        re,
        new URL(Pe.url).pathname,
        Pe.signal,
        A
      );
      if (mt.type === "aborted")
        return;
      if (mt.type === "error") {
        Ht(A, V, mt.error, { flushSync: he });
        return;
      } else if (mt.matches)
        re = mt.matches;
      else {
        Ht(
          A,
          V,
          In(404, { pathname: I }),
          { flushSync: he }
        );
        return;
      }
    }
    let He = nu(re, I);
    if (!He.route.action && !He.route.lazy) {
      let mt = In(405, {
        method: je.formMethod,
        pathname: I,
        routeId: V
      });
      Ht(A, V, mt, { flushSync: he });
      return;
    }
    Z.set(A, Ce);
    let dt = ae, lt = Gr(
      c,
      h,
      Pe,
      I,
      re,
      He,
      s,
      ue
    ), yt = await ze(
      Pe,
      I,
      lt,
      ue,
      A
    ), Ie = yt[He.route.id];
    if (!Ie) {
      for (let mt of lt)
        if (yt[mt.route.id]) {
          Ie = yt[mt.route.id];
          break;
        }
    }
    if (Pe.signal.aborted) {
      Z.get(A) === Ce && Z.delete(A);
      return;
    }
    if (ye.has(A)) {
      if (Xi(Ie) || Mn(Ie)) {
        Bt(A, La(void 0));
        return;
      }
    } else {
      if (Xi(Ie))
        if (Z.delete(A), N > dt) {
          Bt(A, La(void 0));
          return;
        } else
          return W.add(A), Bt(A, Kl(je)), ge(Pe, Ie, !1, {
            fetcherSubmission: je,
            preventScrollReset: me
          });
      if (Mn(Ie)) {
        Ht(A, V, Ie.error);
        return;
      }
    }
    let At = M.navigation.location || M.location, ht = $r(
      n.history,
      At,
      Ce.signal
    ), qa = g || p, Pn = M.navigation.state !== "idle" ? pi(qa, M.navigation.location, m) : M.matches;
    $e(Pn, "Didn't find any matches after fetcher action");
    let Yt = ++ae;
    P.set(A, Yt);
    let la = Kl(je, Ie.data);
    M.fetchers.set(A, la);
    let { dsMatches: Ci, revalidatingFetchers: sa } = Fv(
      ht,
      ue,
      c,
      h,
      n.history,
      M,
      Pn,
      je,
      At,
      s,
      !1,
      k,
      q,
      ye,
      ie,
      W,
      qa,
      m,
      n.patchRoutesOnNavigation != null,
      [He.route.id, Ie],
      ve
    );
    sa.filter((mt) => mt.key !== A).forEach((mt) => {
      let nr = mt.key, ar = M.fetchers.get(nr), Ns = Kl(
        void 0,
        ar ? ar.data : void 0
      );
      M.fetchers.set(nr, Ns), jt(nr), mt.controller && Z.set(nr, mt.controller);
    }), pe({ fetchers: new Map(M.fetchers) });
    let Ni = () => sa.forEach((mt) => jt(mt.key));
    Ce.signal.addEventListener(
      "abort",
      Ni
    );
    let { loaderResults: tr, fetcherResults: qe } = await Qe(
      Ci,
      sa,
      ht,
      At,
      ue
    );
    if (Ce.signal.aborted)
      return;
    if (Ce.signal.removeEventListener(
      "abort",
      Ni
    ), P.delete(A), Z.delete(A), sa.forEach((mt) => Z.delete(mt.key)), M.fetchers.has(A)) {
      let mt = La(Ie.data);
      M.fetchers.set(A, mt);
    }
    let Tt = Ho(tr);
    if (Tt)
      return ge(
        ht,
        Tt.result,
        !1,
        { preventScrollReset: me }
      );
    if (Tt = Ho(qe), Tt)
      return W.add(Tt.key), ge(
        ht,
        Tt.result,
        !1,
        { preventScrollReset: me }
      );
    let { loaderData: nn, errors: _t } = Wv(
      M,
      Pn,
      tr,
      void 0,
      sa,
      qe
    );
    Ha(Yt), M.navigation.state === "loading" && Yt > N ? ($e(B, "Expected pending action"), oe && oe.abort(), tt(M.navigation.location, {
      matches: Pn,
      loaderData: nn,
      errors: _t,
      fetchers: new Map(M.fetchers)
    })) : (pe({
      errors: _t,
      loaderData: ey(
        M.loaderData,
        nn,
        Pn,
        _t
      ),
      fetchers: new Map(M.fetchers)
    }), k = !1);
  }
  async function Vt(A, V, I, re, ue, we, he, me, je) {
    let ve = M.fetchers.get(A);
    Bt(
      A,
      Kl(
        je,
        ve ? ve.data : void 0
      ),
      { flushSync: he }
    );
    let Me = new AbortController(), Ce = $r(
      n.history,
      I,
      Me.signal
    );
    if (we) {
      let Ie = await rt(
        re,
        new URL(Ce.url).pathname,
        Ce.signal,
        A
      );
      if (Ie.type === "aborted")
        return;
      if (Ie.type === "error") {
        Ht(A, V, Ie.error, { flushSync: he });
        return;
      } else if (Ie.matches)
        re = Ie.matches;
      else {
        Ht(
          A,
          V,
          In(404, { pathname: I }),
          { flushSync: he }
        );
        return;
      }
    }
    let Pe = nu(re, I);
    Z.set(A, Me);
    let He = ae, dt = Gr(
      c,
      h,
      Ce,
      I,
      re,
      Pe,
      s,
      ue
    ), lt = await ze(
      Ce,
      I,
      dt,
      ue,
      A
    ), yt = lt[Pe.route.id];
    if (!yt) {
      for (let Ie of re)
        if (lt[Ie.route.id]) {
          yt = lt[Ie.route.id];
          break;
        }
    }
    if (Z.get(A) === Me && Z.delete(A), !Ce.signal.aborted) {
      if (ye.has(A)) {
        Bt(A, La(void 0));
        return;
      }
      if (Xi(yt))
        if (N > He) {
          Bt(A, La(void 0));
          return;
        } else {
          W.add(A), await ge(Ce, yt, !1, {
            preventScrollReset: me
          });
          return;
        }
      if (Mn(yt)) {
        Ht(A, V, yt.error);
        return;
      }
      Bt(A, La(yt.data));
    }
  }
  async function ge(A, V, I, {
    submission: re,
    fetcherSubmission: ue,
    preventScrollReset: we,
    replace: he
  } = {}) {
    I || (J?.resolve(), J = null), V.response.headers.has("X-Remix-Revalidate") && (k = !0);
    let me = V.response.headers.get("Location");
    $e(me, "Expected a Location header on the redirect Response"), me = Pv(
      me,
      new URL(A.url),
      m,
      n.history
    );
    let je = Af(M.location, me, {
      _isRedirect: !0
    });
    if (r) {
      let dt = !1;
      if (V.response.headers.has("X-Remix-Reload-Document"))
        dt = !0;
      else if (rh(me)) {
        const lt = fE(me, !0);
        dt = // Hard reload if it's an absolute URL to a new origin
        lt.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        Xn(lt.pathname, m) == null;
      }
      if (dt) {
        he ? a.location.replace(me) : a.location.assign(me);
        return;
      }
    }
    oe = null;
    let ve = he === !0 || V.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Me, formAction: Ce, formEncType: Pe } = M.navigation;
    !re && !ue && Me && Ce && Pe && (re = ay(M.navigation));
    let He = re || ue;
    if (GE.has(V.response.status) && He && rn(He.formMethod))
      await Gt(ve, je, {
        submission: {
          ...He,
          formAction: me
        },
        // Preserve these flags across redirects
        preventScrollReset: we || se,
        enableViewTransition: I ? be : void 0
      });
    else {
      let dt = Zd(
        je,
        re
      );
      await Gt(ve, je, {
        overrideNavigation: dt,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: ue,
        // Preserve these flags across redirects
        preventScrollReset: we || se,
        enableViewTransition: I ? be : void 0
      });
    }
  }
  async function ze(A, V, I, re, ue) {
    let we, he = {};
    try {
      we = await nj(
        b,
        A,
        V,
        I,
        ue,
        re,
        !1
      );
    } catch (me) {
      return I.filter((je) => je.shouldLoad).forEach((je) => {
        he[je.route.id] = {
          type: "error",
          error: me
        };
      }), he;
    }
    if (A.signal.aborted)
      return he;
    if (!rn(A.method))
      for (let me of I) {
        if (we[me.route.id]?.type === "error")
          break;
        !we.hasOwnProperty(me.route.id) && !M.loaderData.hasOwnProperty(me.route.id) && (!M.errors || !M.errors.hasOwnProperty(me.route.id)) && me.shouldCallHandler() && (we[me.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${me.route.id}`
          )
        });
      }
    for (let [me, je] of Object.entries(we))
      if (fj(je)) {
        let ve = je.result;
        he[me] = {
          type: "redirect",
          response: lj(
            ve,
            A,
            me,
            I,
            m
          )
        };
      } else
        he[me] = await rj(je);
    return he;
  }
  async function Qe(A, V, I, re, ue) {
    let we = ze(
      I,
      re,
      A,
      ue,
      null
    ), he = Promise.all(
      V.map(async (ve) => {
        if (ve.matches && ve.match && ve.request && ve.controller) {
          let Ce = (await ze(
            ve.request,
            ve.path,
            ve.matches,
            ue,
            ve.key
          ))[ve.match.route.id];
          return { [ve.key]: Ce };
        } else
          return Promise.resolve({
            [ve.key]: {
              type: "error",
              error: In(404, {
                pathname: ve.path
              })
            }
          });
      })
    ), me = await we, je = (await he).reduce(
      (ve, Me) => Object.assign(ve, Me),
      {}
    );
    return {
      loaderResults: me,
      fetcherResults: je
    };
  }
  function nt() {
    k = !0, ie.forEach((A, V) => {
      Z.has(V) && q.add(V), jt(V);
    });
  }
  function Bt(A, V, I = {}) {
    M.fetchers.set(A, V), pe(
      { fetchers: new Map(M.fetchers) },
      { flushSync: (I && I.flushSync) === !0 }
    );
  }
  function Ht(A, V, I, re = {}) {
    let ue = gi(M.matches, V);
    Qn(A), pe(
      {
        errors: {
          [ue.route.id]: I
        },
        fetchers: new Map(M.fetchers)
      },
      { flushSync: (re && re.flushSync) === !0 }
    );
  }
  function Ti(A) {
    return de.set(A, (de.get(A) || 0) + 1), ye.has(A) && ye.delete(A), M.fetchers.get(A) || XE;
  }
  function ia(A, V) {
    jt(A, V?.reason), Bt(A, La(null));
  }
  function Qn(A) {
    let V = M.fetchers.get(A);
    Z.has(A) && !(V && V.state === "loading" && P.has(A)) && jt(A), ie.delete(A), P.delete(A), W.delete(A), ye.delete(A), q.delete(A), M.fetchers.delete(A);
  }
  function Kt(A) {
    let V = (de.get(A) || 0) - 1;
    V <= 0 ? (de.delete(A), ye.add(A)) : de.set(A, V), pe({ fetchers: new Map(M.fetchers) });
  }
  function jt(A, V) {
    let I = Z.get(A);
    I && (I.abort(V), Z.delete(A));
  }
  function qt(A) {
    for (let V of A) {
      let I = Ti(V), re = La(I.data);
      M.fetchers.set(V, re);
    }
  }
  function er() {
    let A = [], V = !1;
    for (let I of W) {
      let re = M.fetchers.get(I);
      $e(re, `Expected fetcher: ${I}`), re.state === "loading" && (W.delete(I), A.push(I), V = !0);
    }
    return qt(A), V;
  }
  function Ha(A) {
    let V = [];
    for (let [I, re] of P)
      if (re < A) {
        let ue = M.fetchers.get(I);
        $e(ue, `Expected fetcher: ${I}`), ue.state === "loading" && (jt(I), P.delete(I), V.push(I));
      }
    return qt(V), V.length > 0;
  }
  function zn(A, V) {
    let I = M.blockers.get(A) || Xl;
    return De.get(A) !== V && De.set(A, V), I;
  }
  function ga(A) {
    M.blockers.delete(A), De.delete(A);
  }
  function Zn(A, V) {
    let I = M.blockers.get(A) || Xl;
    $e(
      I.state === "unblocked" && V.state === "blocked" || I.state === "blocked" && V.state === "blocked" || I.state === "blocked" && V.state === "proceeding" || I.state === "blocked" && V.state === "unblocked" || I.state === "proceeding" && V.state === "unblocked",
      `Invalid blocker state transition: ${I.state} -> ${V.state}`
    );
    let re = new Map(M.blockers);
    re.set(A, V), pe({ blockers: re });
  }
  function ra({
    currentLocation: A,
    nextLocation: V,
    historyAction: I
  }) {
    if (De.size === 0)
      return;
    De.size > 1 && Mt(!1, "A router only supports one blocker at a time");
    let re = Array.from(De.entries()), [ue, we] = re[re.length - 1], he = M.blockers.get(ue);
    if (!(he && he.state === "proceeding") && we({ currentLocation: A, nextLocation: V, historyAction: I }))
      return ue;
  }
  function un(A) {
    let V = In(404, { pathname: A }), I = g || p, { matches: re, route: ue } = Bo(I);
    return { notFoundMatches: re, route: ue, error: V };
  }
  function Le(A, V, I) {
    if (j = A, _ = V, T = I || null, !C && M.navigation === Qd) {
      C = !0;
      let re = $t(M.location, M.matches);
      re != null && pe({ restoreScrollPosition: re });
    }
    return () => {
      j = null, _ = null, T = null;
    };
  }
  function ct(A, V) {
    return T && T(
      A,
      V.map((re) => yE(re, M.loaderData))
    ) || A.key;
  }
  function Rt(A, V) {
    if (j && _) {
      let I = ct(A, V);
      j[I] = _();
    }
  }
  function $t(A, V) {
    if (j) {
      let I = ct(A, V), re = j[I];
      if (typeof re == "number")
        return re;
    }
    return null;
  }
  function bn(A, V, I) {
    if (n.patchRoutesOnNavigation)
      if (A) {
        if (Object.keys(A[0].params).length > 0)
          return { active: !0, matches: ts(
            V,
            I,
            m,
            !0
          ) };
      } else
        return { active: !0, matches: ts(
          V,
          I,
          m,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function rt(A, V, I, re) {
    if (!n.patchRoutesOnNavigation)
      return { type: "success", matches: A };
    let ue = A;
    for (; ; ) {
      let we = g == null, he = g || p, me = h;
      try {
        await n.patchRoutesOnNavigation({
          signal: I,
          path: V,
          matches: ue,
          fetcherKey: re,
          patch: (Me, Ce) => {
            I.aborted || Gv(
              Me,
              Ce,
              he,
              me,
              c,
              !1
            );
          }
        });
      } catch (Me) {
        return { type: "error", error: Me, partialMatches: ue };
      } finally {
        we && !I.aborted && (p = [...p]);
      }
      if (I.aborted)
        return { type: "aborted" };
      let je = pi(he, V, m), ve = null;
      if (je) {
        if (Object.keys(je[0].params).length === 0)
          return { type: "success", matches: je };
        if (ve = ts(
          he,
          V,
          m,
          !0
        ), !(ve && ue.length < ve.length && Qt(
          ue,
          ve.slice(0, ue.length)
        )))
          return { type: "success", matches: je };
      }
      if (ve || (ve = ts(
        he,
        V,
        m,
        !0
      )), !ve || Qt(ue, ve))
        return { type: "success", matches: null };
      ue = ve;
    }
  }
  function Qt(A, V) {
    return A.length === V.length && A.every((I, re) => I.route.id === V[re].route.id);
  }
  function va(A) {
    h = {}, g = os(
      A,
      c,
      void 0,
      h
    );
  }
  function tn(A, V, I = !1) {
    let re = g == null;
    Gv(
      A,
      V,
      g || p,
      h,
      c,
      I
    ), re && (p = [...p], pe({}));
  }
  return Q = {
    get basename() {
      return m;
    },
    get future() {
      return v;
    },
    get state() {
      return M;
    },
    get routes() {
      return p;
    },
    get window() {
      return a;
    },
    initialize: fe,
    subscribe: Ae,
    enableScrollRestoration: Le,
    navigate: Et,
    fetch: kt,
    revalidate: en,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (A) => n.history.createHref(A),
    encodeLocation: (A) => n.history.encodeLocation(A),
    getFetcher: Ti,
    resetFetcher: ia,
    deleteFetcher: Kt,
    dispose: Oe,
    getBlocker: zn,
    deleteBlocker: ga,
    patchRoutes: tn,
    _internalFetchControllers: Z,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: va,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(A) {
      pe(A);
    }
  }, n.unstable_instrumentations && (Q = VE(
    Q,
    n.unstable_instrumentations.map((A) => A.router).filter(Boolean)
  )), Q;
}
function ZE(n) {
  return n != null && ("formData" in n && n.formData != null || "body" in n && n.body !== void 0);
}
function _f(n, a, r, s, o, c) {
  let h, p;
  if (o) {
    h = [];
    for (let m of a)
      if (h.push(m), m.route.id === o) {
        p = m;
        break;
      }
  } else
    h = a, p = a[a.length - 1];
  let g = Su(
    s || ".",
    lh(h),
    Xn(n.pathname, r) || n.pathname,
    c === "path"
  );
  if (s == null && (g.search = n.search, g.hash = n.hash), (s == null || s === "" || s === ".") && p) {
    let m = ch(g.search);
    if (p.route.index && !m)
      g.search = g.search ? g.search.replace(/^\?/, "?index&") : "?index";
    else if (!p.route.index && m) {
      let b = new URLSearchParams(g.search), v = b.getAll("index");
      b.delete("index"), v.filter((w) => w).forEach((w) => b.append("index", w));
      let S = b.toString();
      g.search = S ? `?${S}` : "";
    }
  }
  return r !== "/" && (g.pathname = _E({ basename: r, pathname: g.pathname })), ha(g);
}
function Yv(n, a, r) {
  if (!r || !ZE(r))
    return { path: a };
  if (r.formMethod && !pj(r.formMethod))
    return {
      path: a,
      error: In(405, { method: r.formMethod })
    };
  let s = () => ({
    path: a,
    error: In(400, { type: "invalid-body" })
  }), c = (r.formMethod || "get").toUpperCase(), h = Lb(a);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!rn(c))
        return s();
      let v = typeof r.body == "string" ? r.body : r.body instanceof FormData || r.body instanceof URLSearchParams ? (
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
          text: v
        }
      };
    } else if (r.formEncType === "application/json") {
      if (!rn(c))
        return s();
      try {
        let v = typeof r.body == "string" ? JSON.parse(r.body) : r.body;
        return {
          path: a,
          submission: {
            formMethod: c,
            formAction: h,
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
  $e(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let p, g;
  if (r.formData)
    p = zf(r.formData), g = r.formData;
  else if (r.body instanceof FormData)
    p = zf(r.body), g = r.body;
  else if (r.body instanceof URLSearchParams)
    p = r.body, g = Jv(p);
  else if (r.body == null)
    p = new URLSearchParams(), g = new FormData();
  else
    try {
      p = new URLSearchParams(r.body), g = Jv(p);
    } catch {
      return s();
    }
  let m = {
    formMethod: c,
    formAction: h,
    formEncType: r && r.formEncType || "application/x-www-form-urlencoded",
    formData: g,
    json: void 0,
    text: void 0
  };
  if (rn(m.formMethod))
    return { path: a, submission: m };
  let b = aa(a);
  return n && b.search && ch(b.search) && p.append("index", ""), b.search = `?${p}`, { path: ha(b), submission: m };
}
function Fv(n, a, r, s, o, c, h, p, g, m, b, v, S, w, j, T, _, C, z, O, R) {
  let X = O ? Mn(O[1]) ? O[1].error : O[1].data : void 0, $ = o.createURL(c.location), Q = o.createURL(g), M;
  if (b && c.errors) {
    let le = Object.keys(c.errors)[0];
    M = h.findIndex((U) => U.route.id === le);
  } else if (O && Mn(O[1])) {
    let le = O[0];
    M = h.findIndex((U) => U.route.id === le) - 1;
  }
  let B = O ? O[1].statusCode : void 0, J = B && B >= 400, se = {
    currentUrl: $,
    currentParams: c.matches[0]?.params || {},
    nextUrl: Q,
    nextParams: h[0].params,
    ...p,
    actionResult: X,
    actionStatus: B
  }, oe = vs(h), be = h.map((le, U) => {
    let { route: k } = le, q = null;
    if (M != null && U > M)
      q = !1;
    else if (k.lazy)
      q = !0;
    else if (!oh(k))
      q = !1;
    else if (b) {
      let { shouldLoad: P } = Mb(
        k,
        c.loaderData,
        c.errors
      );
      q = P;
    } else PE(c.loaderData, c.matches[U], le) && (q = !0);
    if (q !== null)
      return Df(
        r,
        s,
        n,
        g,
        oe,
        le,
        m,
        a,
        q
      );
    let Z = !1;
    typeof R == "boolean" ? Z = R : J ? Z = !1 : (v || $.pathname + $.search === Q.pathname + Q.search || $.search !== Q.search || JE(c.matches[U], le)) && (Z = !0);
    let ae = {
      ...se,
      defaultShouldRevalidate: Z
    }, N = is(le, ae);
    return Df(
      r,
      s,
      n,
      g,
      oe,
      le,
      m,
      a,
      N,
      ae,
      R
    );
  }), Se = [];
  return j.forEach((le, U) => {
    if (b || !h.some((ie) => ie.route.id === le.routeId) || w.has(U))
      return;
    let k = c.fetchers.get(U), q = k && k.state !== "idle" && k.data === void 0, Z = pi(_, le.path, C);
    if (!Z) {
      if (z && q)
        return;
      Se.push({
        key: U,
        routeId: le.routeId,
        path: le.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (T.has(U))
      return;
    let ae = nu(Z, le.path), N = new AbortController(), P = $r(
      o,
      le.path,
      N.signal
    ), W = null;
    if (S.has(U))
      S.delete(U), W = Gr(
        r,
        s,
        P,
        le.path,
        Z,
        ae,
        m,
        a
      );
    else if (q)
      v && (W = Gr(
        r,
        s,
        P,
        le.path,
        Z,
        ae,
        m,
        a
      ));
    else {
      let ie;
      typeof R == "boolean" ? ie = R : J ? ie = !1 : ie = v;
      let de = {
        ...se,
        defaultShouldRevalidate: ie
      };
      is(ae, de) && (W = Gr(
        r,
        s,
        P,
        le.path,
        Z,
        ae,
        m,
        a,
        de
      ));
    }
    W && Se.push({
      key: U,
      routeId: le.routeId,
      path: le.path,
      matches: W,
      match: ae,
      request: P,
      controller: N
    });
  }), { dsMatches: be, revalidatingFetchers: Se };
}
function oh(n) {
  return n.loader != null || n.middleware != null && n.middleware.length > 0;
}
function Mb(n, a, r) {
  if (n.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!oh(n))
    return { shouldLoad: !1, renderFallback: !1 };
  let s = a != null && n.id in a, o = r != null && r[n.id] !== void 0;
  if (!s && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof n.loader == "function" && n.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !s };
  let c = !s && !o;
  return { shouldLoad: c, renderFallback: c };
}
function PE(n, a, r) {
  let s = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    r.route.id !== a.route.id
  ), o = !n.hasOwnProperty(r.route.id);
  return s || o;
}
function JE(n, a) {
  let r = n.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    n.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r != null && r.endsWith("*") && n.params["*"] !== a.params["*"]
  );
}
function is(n, a) {
  if (n.route.shouldRevalidate) {
    let r = n.route.shouldRevalidate(a);
    if (typeof r == "boolean")
      return r;
  }
  return a.defaultShouldRevalidate;
}
function Gv(n, a, r, s, o, c) {
  let h;
  if (n) {
    let m = s[n];
    $e(
      m,
      `No route found to patch children into: routeId = ${n}`
    ), m.children || (m.children = []), h = m.children;
  } else
    h = r;
  let p = [], g = [];
  if (a.forEach((m) => {
    let b = h.find(
      (v) => Rb(m, v)
    );
    b ? g.push({ existingRoute: b, newRoute: m }) : p.push(m);
  }), p.length > 0) {
    let m = os(
      p,
      o,
      [n || "_", "patch", String(h?.length || "0")],
      s
    );
    h.push(...m);
  }
  if (c && g.length > 0)
    for (let m = 0; m < g.length; m++) {
      let { existingRoute: b, newRoute: v } = g[m], S = b, [w] = os(
        [v],
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
function Rb(n, a) {
  return "id" in n && "id" in a && n.id === a.id ? !0 : n.index === a.index && n.path === a.path && n.caseSensitive === a.caseSensitive ? (!n.children || n.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : n.children?.every(
    (r, s) => a.children?.some((o) => Rb(r, o))
  ) ?? !1 : !1;
}
var Xv = /* @__PURE__ */ new WeakMap(), Ab = ({
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
  let h = Xv.get(o);
  h || (h = {}, Xv.set(o, h));
  let p = h[n];
  if (p)
    return p;
  let g = (async () => {
    let m = mE(n), v = o[n] !== void 0 && n !== "hasErrorBoundary";
    if (m)
      Mt(
        !m,
        "Route property " + n + " is not a supported lazy route property. This property will be ignored."
      ), h[n] = Promise.resolve();
    else if (v)
      Mt(
        !1,
        `Route "${o.id}" has a static property "${n}" defined. The lazy property will be ignored.`
      );
    else {
      let S = await c();
      S != null && (Object.assign(o, { [n]: S }), Object.assign(o, s(o)));
    }
    typeof o.lazy == "object" && (o.lazy[n] = void 0, Object.values(o.lazy).every((S) => S === void 0) && (o.lazy = void 0));
  })();
  return h[n] = g, g;
}, Kv = /* @__PURE__ */ new WeakMap();
function WE(n, a, r, s, o) {
  let c = r[n.id];
  if ($e(c, "No route found in manifest"), !n.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof n.lazy == "function") {
    let b = Kv.get(c);
    if (b)
      return {
        lazyRoutePromise: b,
        lazyHandlerPromise: b
      };
    let v = (async () => {
      $e(
        typeof n.lazy == "function",
        "No lazy route function found"
      );
      let S = await n.lazy(), w = {};
      for (let j in S) {
        let T = S[j];
        if (T === void 0)
          continue;
        let _ = gE(j), z = c[j] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        j !== "hasErrorBoundary";
        _ ? Mt(
          !_,
          "Route property " + j + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : z ? Mt(
          !z,
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
    return Kv.set(c, v), v.catch(() => {
    }), {
      lazyRoutePromise: v,
      lazyHandlerPromise: v
    };
  }
  let h = Object.keys(n.lazy), p = [], g;
  for (let b of h) {
    if (o && o.includes(b))
      continue;
    let v = Ab({
      key: b,
      route: n,
      manifest: r,
      mapRouteProperties: s
    });
    v && (p.push(v), b === a && (g = v));
  }
  let m = p.length > 0 ? Promise.all(p).then(() => {
  }) : void 0;
  return m?.catch(() => {
  }), g?.catch(() => {
  }), {
    lazyRoutePromise: m,
    lazyHandlerPromise: g
  };
}
async function Qv(n) {
  let a = n.matches.filter((o) => o.shouldLoad), r = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, c) => {
    r[a[c].route.id] = o;
  }), r;
}
async function ej(n) {
  return n.matches.some((a) => a.route.middleware) ? _b(n, () => Qv(n)) : Qv(n);
}
function _b(n, a) {
  return tj(
    n,
    a,
    (s) => {
      if (mj(s))
        throw s;
      return s;
    },
    cj,
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
      let { matches: h } = n, p = Math.min(
        // Throwing route
        Math.max(
          h.findIndex((m) => m.route.id === o),
          0
        ),
        // or the shallowest route that needs to load data
        Math.max(
          h.findIndex((m) => m.shouldCallHandler()),
          0
        )
      ), g = gi(
        h,
        h[p].route.id
      ).route.id;
      return Promise.resolve({
        [g]: { type: "error", result: s }
      });
    }
  }
}
async function tj(n, a, r, s, o) {
  let { matches: c, ...h } = n, p = c.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((b) => [m.route.id, b]) : []
  );
  return await Db(
    h,
    p,
    a,
    r,
    s,
    o
  );
}
async function Db(n, a, r, s, o, c, h = 0) {
  let { request: p } = n;
  if (p.signal.aborted)
    throw p.signal.reason ?? new Error(`Request aborted: ${p.method} ${p.url}`);
  let g = a[h];
  if (!g)
    return await r();
  let [m, b] = g, v, S = async () => {
    if (v)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return v = { value: await Db(
        n,
        a,
        r,
        s,
        o,
        c,
        h + 1
      ) }, v.value;
    } catch (w) {
      return v = { value: await c(w, m, v) }, v.value;
    }
  };
  try {
    let w = await b(n, S), j = w != null ? s(w) : void 0;
    return o(j) ? j : v ? j ?? v.value : (v = { value: await S() }, v.value);
  } catch (w) {
    return await c(w, m, v);
  }
}
function zb(n, a, r, s, o) {
  let c = Ab({
    key: "middleware",
    route: s.route,
    manifest: a,
    mapRouteProperties: n
  }), h = WE(
    s.route,
    rn(r.method) ? "action" : "loader",
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
function Df(n, a, r, s, o, c, h, p, g, m = null, b) {
  let v = !1, S = zb(
    n,
    a,
    r,
    c,
    h
  );
  return {
    ...c,
    _lazyPromises: S,
    shouldLoad: g,
    shouldRevalidateArgs: m,
    shouldCallHandler(w) {
      return v = !0, m ? typeof b == "boolean" ? is(c, {
        ...m,
        defaultShouldRevalidate: b
      }) : typeof w == "boolean" ? is(c, {
        ...m,
        defaultShouldRevalidate: w
      }) : is(c, m) : g;
    },
    resolve(w) {
      let { lazy: j, loader: T, middleware: _ } = c.route, C = v || g || w && !rn(r.method) && (j || T), z = _ && _.length > 0 && !T && !j;
      return C && (rn(r.method) || !z) ? aj({
        request: r,
        path: s,
        unstable_pattern: o,
        match: c,
        lazyHandlerPromise: S?.handler,
        lazyRoutePromise: S?.route,
        handlerOverride: w,
        scopedContext: p
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function Gr(n, a, r, s, o, c, h, p, g = null) {
  return o.map((m) => m.route.id !== c.route.id ? {
    ...m,
    shouldLoad: !1,
    shouldRevalidateArgs: g,
    shouldCallHandler: () => !1,
    _lazyPromises: zb(
      n,
      a,
      r,
      m,
      h
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Df(
    n,
    a,
    r,
    s,
    vs(o),
    m,
    h,
    p,
    !0,
    g
  ));
}
async function nj(n, a, r, s, o, c, h) {
  s.some((b) => b._lazyPromises?.middleware) && await Promise.all(s.map((b) => b._lazyPromises?.middleware));
  let p = {
    request: a,
    unstable_url: Ob(a, r),
    unstable_pattern: vs(s),
    params: s[0].params,
    context: c,
    matches: s
  }, m = await n({
    ...p,
    fetcherKey: o,
    runClientMiddleware: (b) => {
      let v = p;
      return _b(v, () => b({
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
      s.flatMap((b) => [
        b._lazyPromises?.handler,
        b._lazyPromises?.route
      ])
    );
  } catch {
  }
  return m;
}
async function aj({
  request: n,
  path: a,
  unstable_pattern: r,
  match: s,
  lazyHandlerPromise: o,
  lazyRoutePromise: c,
  handlerOverride: h,
  scopedContext: p
}) {
  let g, m, b = rn(n.method), v = b ? "action" : "loader", S = (w) => {
    let j, T = new Promise((z, O) => j = O);
    m = () => j(), n.signal.addEventListener("abort", m);
    let _ = (z) => typeof w != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${v}" [routeId: ${s.route.id}]`
      )
    ) : w(
      {
        request: n,
        unstable_url: Ob(n, a),
        unstable_pattern: r,
        params: s.params,
        context: p
      },
      ...z !== void 0 ? [z] : []
    ), C = (async () => {
      try {
        return { type: "data", result: await (h ? h((O) => _(O)) : _()) };
      } catch (z) {
        return { type: "error", result: z };
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
          S(w).catch((_) => {
            j = _;
          }),
          // Ensure all lazy route promises are resolved before continuing
          o,
          c
        ]);
        if (j !== void 0)
          throw j;
        g = T;
      } else {
        await o;
        let j = b ? s.route.action : s.route.loader;
        if (j)
          [g] = await Promise.all([S(j), c]);
        else if (v === "action") {
          let T = new URL(n.url), _ = T.pathname + T.search;
          throw In(405, {
            method: n.method,
            pathname: _,
            routeId: s.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (w)
      g = await S(w);
    else {
      let j = new URL(n.url), T = j.pathname + j.search;
      throw In(404, {
        pathname: T
      });
    }
  } catch (w) {
    return { type: "error", result: w };
  } finally {
    m && n.signal.removeEventListener("abort", m);
  }
  return g;
}
async function ij(n) {
  let a = n.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? n.body == null ? null : n.json() : n.text();
}
async function rj(n) {
  let { result: a, type: r } = n;
  if (uh(a)) {
    let s;
    try {
      s = await ij(a);
    } catch (o) {
      return { type: "error", error: o };
    }
    return r === "error" ? {
      type: "error",
      error: new wu(a.status, a.statusText, s),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: s,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return r === "error" ? ny(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: uj(a),
    statusCode: us(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: us(a) ? a.status : void 0
  } : ny(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function lj(n, a, r, s, o) {
  let c = n.headers.get("Location");
  if ($e(
    c,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !rh(c)) {
    let h = s.slice(
      0,
      s.findIndex((p) => p.route.id === r) + 1
    );
    c = _f(
      new URL(a.url),
      h,
      o,
      c
    ), n.headers.set("Location", c);
  }
  return n;
}
var Zv = [
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
function Pv(n, a, r, s) {
  if (rh(n)) {
    let o = n, c = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (Zv.includes(c.protocol))
      throw new Error("Invalid redirect location");
    let h = Xn(c.pathname, r) != null;
    if (c.origin === a.origin && h)
      return sh(c.pathname) + c.search + c.hash;
  }
  try {
    let o = s.createURL(n);
    if (Zv.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return n;
}
function $r(n, a, r, s) {
  let o = n.createURL(Lb(a)).toString(), c = { signal: r };
  if (s && rn(s.formMethod)) {
    let { formMethod: h, formEncType: p } = s;
    c.method = h.toUpperCase(), p === "application/json" ? (c.headers = new Headers({ "Content-Type": p }), c.body = JSON.stringify(s.json)) : p === "text/plain" ? c.body = s.text : p === "application/x-www-form-urlencoded" && s.formData ? c.body = zf(s.formData) : c.body = s.formData;
  }
  return new Request(o, c);
}
function Ob(n, a) {
  let r = new URL(n.url), s = typeof a == "string" ? aa(a) : a;
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
function zf(n) {
  let a = new URLSearchParams();
  for (let [r, s] of n.entries())
    a.append(r, typeof s == "string" ? s : s.name);
  return a;
}
function Jv(n) {
  let a = new FormData();
  for (let [r, s] of n.entries())
    a.append(r, s);
  return a;
}
function sj(n, a, r, s = !1, o = !1) {
  let c = {}, h = null, p, g = !1, m = {}, b = r && Mn(r[1]) ? r[1].error : void 0;
  return n.forEach((v) => {
    if (!(v.route.id in a))
      return;
    let S = v.route.id, w = a[S];
    if ($e(
      !Xi(w),
      "Cannot handle redirect results in processLoaderData"
    ), Mn(w)) {
      let j = w.error;
      if (b !== void 0 && (j = b, b = void 0), h = h || {}, o)
        h[S] = j;
      else {
        let T = gi(n, S);
        h[T.route.id] == null && (h[T.route.id] = j);
      }
      s || (c[S] = Nb), g || (g = !0, p = us(w.error) ? w.error.status : 500), w.headers && (m[S] = w.headers);
    } else
      c[S] = w.data, w.statusCode && w.statusCode !== 200 && !g && (p = w.statusCode), w.headers && (m[S] = w.headers);
  }), b !== void 0 && r && (h = { [r[0]]: b }, r[2] && (c[r[2]] = void 0)), {
    loaderData: c,
    errors: h,
    statusCode: p || 200,
    loaderHeaders: m
  };
}
function Wv(n, a, r, s, o, c) {
  let { loaderData: h, errors: p } = sj(
    a,
    r,
    s
  );
  return o.filter((g) => !g.matches || g.matches.some((m) => m.shouldLoad)).forEach((g) => {
    let { key: m, match: b, controller: v } = g;
    if (v && v.signal.aborted)
      return;
    let S = c[m];
    if ($e(S, "Did not find corresponding fetcher result"), Mn(S)) {
      let w = gi(n.matches, b?.route.id);
      p && p[w.route.id] || (p = {
        ...p,
        [w.route.id]: S.error
      }), n.fetchers.delete(m);
    } else if (Xi(S))
      $e(!1, "Unhandled fetcher revalidation redirect");
    else {
      let w = La(S.data);
      n.fetchers.set(m, w);
    }
  }), { loaderData: h, errors: p };
}
function ey(n, a, r, s) {
  let o = Object.entries(a).filter(([, c]) => c !== Nb).reduce((c, [h, p]) => (c[h] = p, c), {});
  for (let c of r) {
    let h = c.route.id;
    if (!a.hasOwnProperty(h) && n.hasOwnProperty(h) && c.route.loader && (o[h] = n[h]), s && s.hasOwnProperty(h))
      break;
  }
  return o;
}
function ty(n) {
  return n ? Mn(n[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [n[0]]: n[1].data
    }
  } : {};
}
function gi(n, a) {
  return (a ? n.slice(0, n.findIndex((s) => s.route.id === a) + 1) : [...n]).reverse().find((s) => s.route.hasErrorBoundary === !0) || n[0];
}
function Bo(n) {
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
function In(n, {
  pathname: a,
  routeId: r,
  method: s,
  type: o,
  message: c
} = {}) {
  let h = "Unknown Server Error", p = "Unknown @remix-run/router error";
  return n === 400 ? (h = "Bad Request", s && a && r ? p = `You made a ${s} request to "${a}" but did not provide a \`loader\` for route "${r}", so there is no way to handle the request.` : o === "invalid-body" && (p = "Unable to encode submission body")) : n === 403 ? (h = "Forbidden", p = `Route "${r}" does not match URL "${a}"`) : n === 404 ? (h = "Not Found", p = `No route matches URL "${a}"`) : n === 405 && (h = "Method Not Allowed", s && a && r ? p = `You made a ${s.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${r}", so there is no way to handle the request.` : s && (p = `Invalid request method "${s.toUpperCase()}"`)), new wu(
    n || 500,
    h,
    new Error(p),
    !0
  );
}
function Ho(n) {
  let a = Object.entries(n);
  for (let r = a.length - 1; r >= 0; r--) {
    let [s, o] = a[r];
    if (Xi(o))
      return { key: s, result: o };
  }
}
function Lb(n) {
  let a = typeof n == "string" ? aa(n) : n;
  return ha({ ...a, hash: "" });
}
function oj(n, a) {
  return n.pathname !== a.pathname || n.search !== a.search ? !1 : n.hash === "" ? a.hash !== "" : n.hash === a.hash ? !0 : a.hash !== "";
}
function uj(n) {
  return new wu(
    n.init?.status ?? 500,
    n.init?.statusText ?? "Internal Server Error",
    n.data
  );
}
function cj(n) {
  return n != null && typeof n == "object" && Object.entries(n).every(
    ([a, r]) => typeof a == "string" && dj(r)
  );
}
function dj(n) {
  return n != null && typeof n == "object" && "type" in n && "result" in n && (n.type === "data" || n.type === "error");
}
function fj(n) {
  return uh(n.result) && Tb.has(n.result.status);
}
function Mn(n) {
  return n.type === "error";
}
function Xi(n) {
  return (n && n.type) === "redirect";
}
function ny(n) {
  return typeof n == "object" && n != null && "type" in n && "data" in n && "init" in n && n.type === "DataWithResponseInit";
}
function uh(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.headers == "object" && typeof n.body < "u";
}
function hj(n) {
  return Tb.has(n);
}
function mj(n) {
  return uh(n) && hj(n.status) && n.headers.has("Location");
}
function pj(n) {
  return FE.has(n.toUpperCase());
}
function rn(n) {
  return IE.has(n.toUpperCase());
}
function ch(n) {
  return new URLSearchParams(n).getAll("index").some((a) => a === "");
}
function nu(n, a) {
  let r = typeof a == "string" ? aa(a).search : a.search;
  if (n[n.length - 1].route.index && ch(r || ""))
    return n[n.length - 1];
  let s = xb(n);
  return s[s.length - 1];
}
function ay(n) {
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
function Zd(n, a) {
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
function gj(n, a) {
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
function Kl(n, a) {
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
function vj(n, a) {
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
function yj(n, a) {
  try {
    let r = n.sessionStorage.getItem(
      Cb
    );
    if (r) {
      let s = JSON.parse(r);
      for (let [o, c] of Object.entries(s || {}))
        c && Array.isArray(c) && a.set(o, new Set(c || []));
    }
  } catch {
  }
}
function bj(n, a) {
  if (a.size > 0) {
    let r = {};
    for (let [s, o] of a)
      r[s] = [...o];
    try {
      n.sessionStorage.setItem(
        Cb,
        JSON.stringify(r)
      );
    } catch (s) {
      Mt(
        !1,
        `Failed to save applied view transitions in sessionStorage (${s}).`
      );
    }
  }
}
function iy() {
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
var ys = x.createContext(null);
ys.displayName = "DataRouterState";
var Ub = x.createContext(!1);
function kb() {
  return x.useContext(Ub);
}
var dh = x.createContext({
  isTransitioning: !1
});
dh.displayName = "ViewTransition";
var Vb = x.createContext(
  /* @__PURE__ */ new Map()
);
Vb.displayName = "Fetchers";
var xj = x.createContext(null);
xj.displayName = "Await";
var Kn = x.createContext(
  null
);
Kn.displayName = "Navigation";
var Eu = x.createContext(
  null
);
Eu.displayName = "Location";
var Va = x.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Va.displayName = "Route";
var fh = x.createContext(null);
fh.displayName = "RouteError";
var Bb = "REACT_ROUTER_ERROR", Sj = "REDIRECT", wj = "ROUTE_ERROR_RESPONSE";
function Ej(n) {
  if (n.startsWith(`${Bb}:${Sj}:{`))
    try {
      let a = JSON.parse(n.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function jj(n) {
  if (n.startsWith(
    `${Bb}:${wj}:{`
  ))
    try {
      let a = JSON.parse(n.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new wu(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function Tj(n, { relative: a } = {}) {
  $e(
    bs(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: s } = x.useContext(Kn), { hash: o, pathname: c, search: h } = xs(n, { relative: a }), p = c;
  return r !== "/" && (p = c === "/" ? r : Yn([r, c])), s.createHref({ pathname: p, search: h, hash: o });
}
function bs() {
  return x.useContext(Eu) != null;
}
function Ba() {
  return $e(
    bs(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), x.useContext(Eu).location;
}
var Hb = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function qb(n) {
  x.useContext(Kn).static || x.useLayoutEffect(n);
}
function Pr() {
  let { isDataRoute: n } = x.useContext(Va);
  return n ? kj() : Cj();
}
function Cj() {
  $e(
    bs(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let n = x.useContext(Wi), { basename: a, navigator: r } = x.useContext(Kn), { matches: s } = x.useContext(Va), { pathname: o } = Ba(), c = JSON.stringify(lh(s)), h = x.useRef(!1);
  return qb(() => {
    h.current = !0;
  }), x.useCallback(
    (g, m = {}) => {
      if (Mt(h.current, Hb), !h.current) return;
      if (typeof g == "number") {
        r.go(g);
        return;
      }
      let b = Su(
        g,
        JSON.parse(c),
        o,
        m.relative === "path"
      );
      n == null && a !== "/" && (b.pathname = b.pathname === "/" ? a : Yn([a, b.pathname])), (m.replace ? r.replace : r.push)(
        b,
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
x.createContext(null);
function xs(n, { relative: a } = {}) {
  let { matches: r } = x.useContext(Va), { pathname: s } = Ba(), o = JSON.stringify(lh(r));
  return x.useMemo(
    () => Su(
      n,
      JSON.parse(o),
      s,
      a === "path"
    ),
    [n, o, s, a]
  );
}
function Nj(n, a, r) {
  $e(
    bs(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: s } = x.useContext(Kn), { matches: o } = x.useContext(Va), c = o[o.length - 1], h = c ? c.params : {}, p = c ? c.pathname : "/", g = c ? c.pathnameBase : "/", m = c && c.route;
  {
    let _ = m && m.path || "";
    Yb(
      p,
      !m || _.endsWith("*") || _.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${p}" (under <Route path="${_}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${_}"> to <Route path="${_ === "/" ? "*" : `${_}/*`}">.`
    );
  }
  let b = Ba(), v;
  v = b;
  let S = v.pathname || "/", w = S;
  if (g !== "/") {
    let _ = g.replace(/^\//, "").split("/");
    w = "/" + S.replace(/^\//, "").split("/").slice(_.length).join("/");
  }
  let j = pi(n, { pathname: w });
  return Mt(
    m || j != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `
  ), Mt(
    j == null || j[j.length - 1].route.element !== void 0 || j[j.length - 1].route.Component !== void 0 || j[j.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), Dj(
    j && j.map(
      (_) => Object.assign({}, _, {
        params: Object.assign({}, h, _.params),
        pathname: Yn([
          g,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            _.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : _.pathname
        ]),
        pathnameBase: _.pathnameBase === "/" ? g : Yn([
          g,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            _.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : _.pathnameBase
        ])
      })
    ),
    o,
    r
  );
}
function Mj() {
  let n = Uj(), a = us(n) ? `${n.status} ${n.statusText}` : n instanceof Error ? n.message : JSON.stringify(n), r = n instanceof Error ? n.stack : null, s = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: s }, c = { padding: "2px 4px", backgroundColor: s }, h = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    n
  ), h = /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ x.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ x.createElement("code", { style: c }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ x.createElement("code", { style: c }, "errorElement"), " prop on your route.")), /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ x.createElement("h3", { style: { fontStyle: "italic" } }, a), r ? /* @__PURE__ */ x.createElement("pre", { style: o }, r) : null, h);
}
var Rj = /* @__PURE__ */ x.createElement(Mj, null), $b = class extends x.Component {
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
      const r = jj(n.digest);
      r && (n = r);
    }
    let a = n !== void 0 ? /* @__PURE__ */ x.createElement(Va.Provider, { value: this.props.routeContext }, /* @__PURE__ */ x.createElement(
      fh.Provider,
      {
        value: n,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ x.createElement(Aj, { error: n }, a) : a;
  }
};
$b.contextType = Ub;
var Pd = /* @__PURE__ */ new WeakMap();
function Aj({
  children: n,
  error: a
}) {
  let { basename: r } = x.useContext(Kn);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let s = Ej(a.digest);
    if (s) {
      let o = Pd.get(a);
      if (o) throw o;
      let c = wb(s.location, r);
      if (Sb && !Pd.get(a))
        if (c.isExternal || s.reloadDocument)
          window.location.href = c.absoluteURL || c.to;
        else {
          const h = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(c.to, {
              replace: s.replace
            })
          );
          throw Pd.set(a, h), h;
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
function _j({ routeContext: n, match: a, children: r }) {
  let s = x.useContext(Wi);
  return s && s.static && s.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (s.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ x.createElement(Va.Provider, { value: n }, r);
}
function Dj(n, a = [], r) {
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
      (v) => v.route.id && c?.[v.route.id] !== void 0
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
  let h = !1, p = -1;
  if (r && s) {
    h = s.renderFallback;
    for (let b = 0; b < o.length; b++) {
      let v = o[b];
      if ((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (p = b), v.route.id) {
        let { loaderData: S, errors: w } = s, j = v.route.loader && !S.hasOwnProperty(v.route.id) && (!w || w[v.route.id] === void 0);
        if (v.route.lazy || j) {
          r.isStatic && (h = !0), p >= 0 ? o = o.slice(0, p + 1) : o = [o[0]];
          break;
        }
      }
    }
  }
  let g = r?.onError, m = s && g ? (b, v) => {
    g(b, {
      location: s.location,
      params: s.matches?.[0]?.params ?? {},
      unstable_pattern: vs(s.matches),
      errorInfo: v
    });
  } : void 0;
  return o.reduceRight(
    (b, v, S) => {
      let w, j = !1, T = null, _ = null;
      s && (w = c && v.route.id ? c[v.route.id] : void 0, T = v.route.errorElement || Rj, h && (p < 0 && S === 0 ? (Yb(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), j = !0, _ = null) : p === S && (j = !0, _ = v.route.hydrateFallbackElement || null)));
      let C = a.concat(o.slice(0, S + 1)), z = () => {
        let O;
        return w ? O = T : j ? O = _ : v.route.Component ? O = /* @__PURE__ */ x.createElement(v.route.Component, null) : v.route.element ? O = v.route.element : O = b, /* @__PURE__ */ x.createElement(
          _j,
          {
            match: v,
            routeContext: {
              outlet: b,
              matches: C,
              isDataRoute: s != null
            },
            children: O
          }
        );
      };
      return s && (v.route.ErrorBoundary || v.route.errorElement || S === 0) ? /* @__PURE__ */ x.createElement(
        $b,
        {
          location: s.location,
          revalidation: s.revalidation,
          component: T,
          error: w,
          children: z(),
          routeContext: { outlet: null, matches: C, isDataRoute: !0 },
          onError: m
        }
      ) : z();
    },
    null
  );
}
function hh(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function zj(n) {
  let a = x.useContext(Wi);
  return $e(a, hh(n)), a;
}
function Ib(n) {
  let a = x.useContext(ys);
  return $e(a, hh(n)), a;
}
function Oj(n) {
  let a = x.useContext(Va);
  return $e(a, hh(n)), a;
}
function ju(n) {
  let a = Oj(n), r = a.matches[a.matches.length - 1];
  return $e(
    r.route.id,
    `${n} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function Lj() {
  return ju(
    "useRouteId"
    /* UseRouteId */
  );
}
function Ss() {
  let n = Ib(
    "useLoaderData"
    /* UseLoaderData */
  ), a = ju(
    "useLoaderData"
    /* UseLoaderData */
  );
  return n.loaderData[a];
}
function Uj() {
  let n = x.useContext(fh), a = Ib(
    "useRouteError"
    /* UseRouteError */
  ), r = ju(
    "useRouteError"
    /* UseRouteError */
  );
  return n !== void 0 ? n : a.errors?.[r];
}
function kj() {
  let { router: n } = zj(
    "useNavigate"
    /* UseNavigateStable */
  ), a = ju(
    "useNavigate"
    /* UseNavigateStable */
  ), r = x.useRef(!1);
  return qb(() => {
    r.current = !0;
  }), x.useCallback(
    async (o, c = {}) => {
      Mt(r.current, Hb), r.current && (typeof o == "number" ? await n.navigate(o) : await n.navigate(o, { fromRouteId: a, ...c }));
    },
    [n, a]
  );
}
var ry = {};
function Yb(n, a, r) {
  !a && !ry[n] && (ry[n] = !0, Mt(!1, r));
}
var ly = {};
function sy(n, a) {
  !n && !ly[a] && (ly[a] = !0, console.warn(a));
}
var Vj = "useOptimistic", oy = tE[Vj], Bj = () => {
};
function Hj(n) {
  return oy ? oy(n) : [n, Bj];
}
function qj(n) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: n.hasErrorBoundary || n.ErrorBoundary != null || n.errorElement != null
  };
  return n.Component && (n.element && Mt(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: x.createElement(n.Component),
    Component: void 0
  })), n.HydrateFallback && (n.hydrateFallbackElement && Mt(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: x.createElement(n.HydrateFallback),
    HydrateFallback: void 0
  })), n.ErrorBoundary && (n.errorElement && Mt(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: x.createElement(n.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var $j = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function Ij(n, a) {
  return QE({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: cE({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: n,
    hydrationRouteProperties: $j,
    mapRouteProperties: qj,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var Yj = class {
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
function Fj({
  router: n,
  flushSync: a,
  onError: r,
  unstable_useTransitions: s
}) {
  s = kb() || s;
  let [c, h] = x.useState(n.state), [p, g] = Hj(c), [m, b] = x.useState(), [v, S] = x.useState({
    isTransitioning: !1
  }), [w, j] = x.useState(), [T, _] = x.useState(), [C, z] = x.useState(), O = x.useRef(/* @__PURE__ */ new Map()), R = x.useCallback(
    (B, { deletedFetchers: J, newErrors: se, flushSync: oe, viewTransitionOpts: be }) => {
      se && r && Object.values(se).forEach(
        (le) => r(le, {
          location: B.location,
          params: B.matches[0]?.params ?? {},
          unstable_pattern: vs(B.matches)
        })
      ), B.fetchers.forEach((le, U) => {
        le.data !== void 0 && O.current.set(U, le.data);
      }), J.forEach((le) => O.current.delete(le)), sy(
        oe === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let Se = n.window != null && n.window.document != null && typeof n.window.document.startViewTransition == "function";
      if (sy(
        be == null || Se,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !be || !Se) {
        a && oe ? a(() => h(B)) : s === !1 ? h(B) : x.startTransition(() => {
          s === !0 && g((le) => uy(le, B)), h(B);
        });
        return;
      }
      if (a && oe) {
        a(() => {
          T && (w?.resolve(), T.skipTransition()), S({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: be.currentLocation,
            nextLocation: be.nextLocation
          });
        });
        let le = n.window.document.startViewTransition(() => {
          a(() => h(B));
        });
        le.finished.finally(() => {
          a(() => {
            j(void 0), _(void 0), b(void 0), S({ isTransitioning: !1 });
          });
        }), a(() => _(le));
        return;
      }
      T ? (w?.resolve(), T.skipTransition(), z({
        state: B,
        currentLocation: be.currentLocation,
        nextLocation: be.nextLocation
      })) : (b(B), S({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: be.currentLocation,
        nextLocation: be.nextLocation
      }));
    },
    [
      n.window,
      a,
      T,
      w,
      s,
      g,
      r
    ]
  );
  x.useLayoutEffect(() => n.subscribe(R), [n, R]);
  let X = p.initialized;
  x.useLayoutEffect(() => {
    !X && n.state.initialized && R(n.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [X, R, n.state]), x.useEffect(() => {
    v.isTransitioning && !v.flushSync && j(new Yj());
  }, [v]), x.useEffect(() => {
    if (w && m && n.window) {
      let B = m, J = w.promise, se = n.window.document.startViewTransition(async () => {
        s === !1 ? h(B) : x.startTransition(() => {
          s === !0 && g((oe) => uy(oe, B)), h(B);
        }), await J;
      });
      se.finished.finally(() => {
        j(void 0), _(void 0), b(void 0), S({ isTransitioning: !1 });
      }), _(se);
    }
  }, [
    m,
    w,
    n.window,
    s,
    g
  ]), x.useEffect(() => {
    w && m && p.location.key === m.location.key && w.resolve();
  }, [w, T, p.location, m]), x.useEffect(() => {
    !v.isTransitioning && C && (b(C.state), S({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: C.currentLocation,
      nextLocation: C.nextLocation
    }), z(void 0));
  }, [v.isTransitioning, C]);
  let $ = x.useMemo(() => ({
    createHref: n.createHref,
    encodeLocation: n.encodeLocation,
    go: (B) => n.navigate(B),
    push: (B, J, se) => n.navigate(B, {
      state: J,
      preventScrollReset: se?.preventScrollReset
    }),
    replace: (B, J, se) => n.navigate(B, {
      replace: !0,
      state: J,
      preventScrollReset: se?.preventScrollReset
    })
  }), [n]), Q = n.basename || "/", M = x.useMemo(
    () => ({
      router: n,
      navigator: $,
      static: !1,
      basename: Q,
      onError: r
    }),
    [n, $, Q, r]
  );
  return /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement(Wi.Provider, { value: M }, /* @__PURE__ */ x.createElement(ys.Provider, { value: p }, /* @__PURE__ */ x.createElement(Vb.Provider, { value: O.current }, /* @__PURE__ */ x.createElement(dh.Provider, { value: v }, /* @__PURE__ */ x.createElement(
    Kj,
    {
      basename: Q,
      location: p.location,
      navigationType: p.historyAction,
      navigator: $,
      unstable_useTransitions: s
    },
    /* @__PURE__ */ x.createElement(
      Gj,
      {
        routes: n.routes,
        future: n.future,
        state: p,
        isStatic: !1,
        onError: r
      }
    )
  ))))), null);
}
function uy(n, a) {
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
var Gj = x.memo(Xj);
function Xj({
  routes: n,
  future: a,
  state: r,
  isStatic: s,
  onError: o
}) {
  return Nj(n, void 0, { state: r, isStatic: s, onError: o });
}
function Kj({
  basename: n = "/",
  children: a = null,
  location: r,
  navigationType: s = "POP",
  navigator: o,
  static: c = !1,
  unstable_useTransitions: h
}) {
  $e(
    !bs(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let p = n.replace(/^\/*/, "/"), g = x.useMemo(
    () => ({
      basename: p,
      navigator: o,
      static: c,
      unstable_useTransitions: h,
      future: {}
    }),
    [p, o, c, h]
  );
  typeof r == "string" && (r = aa(r));
  let {
    pathname: m = "/",
    search: b = "",
    hash: v = "",
    state: S = null,
    key: w = "default",
    unstable_mask: j
  } = r, T = x.useMemo(() => {
    let _ = Xn(m, p);
    return _ == null ? null : {
      location: {
        pathname: _,
        search: b,
        hash: v,
        state: S,
        key: w,
        unstable_mask: j
      },
      navigationType: s
    };
  }, [
    p,
    m,
    b,
    v,
    S,
    w,
    s,
    j
  ]);
  return Mt(
    T != null,
    `<Router basename="${p}"> is not able to match the URL "${m}${b}${v}" because it does not start with the basename, so the <Router> won't render anything.`
  ), T == null ? null : /* @__PURE__ */ x.createElement(Kn.Provider, { value: g }, /* @__PURE__ */ x.createElement(Eu.Provider, { children: a, value: T }));
}
var au = "get", iu = "application/x-www-form-urlencoded";
function Tu(n) {
  return typeof HTMLElement < "u" && n instanceof HTMLElement;
}
function Qj(n) {
  return Tu(n) && n.tagName.toLowerCase() === "button";
}
function Zj(n) {
  return Tu(n) && n.tagName.toLowerCase() === "form";
}
function Pj(n) {
  return Tu(n) && n.tagName.toLowerCase() === "input";
}
function Jj(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function Wj(n, a) {
  return n.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !Jj(n);
}
var qo = null;
function eT() {
  if (qo === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), qo = !1;
    } catch {
      qo = !0;
    }
  return qo;
}
var tT = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function Jd(n) {
  return n != null && !tT.has(n) ? (Mt(
    !1,
    `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${iu}"`
  ), null) : n;
}
function nT(n, a) {
  let r, s, o, c, h;
  if (Zj(n)) {
    let p = n.getAttribute("action");
    s = p ? Xn(p, a) : null, r = n.getAttribute("method") || au, o = Jd(n.getAttribute("enctype")) || iu, c = new FormData(n);
  } else if (Qj(n) || Pj(n) && (n.type === "submit" || n.type === "image")) {
    let p = n.form;
    if (p == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let g = n.getAttribute("formaction") || p.getAttribute("action");
    if (s = g ? Xn(g, a) : null, r = n.getAttribute("formmethod") || p.getAttribute("method") || au, o = Jd(n.getAttribute("formenctype")) || Jd(p.getAttribute("enctype")) || iu, c = new FormData(p, n), !eT()) {
      let { name: m, type: b, value: v } = n;
      if (b === "image") {
        let S = m ? `${m}.` : "";
        c.append(`${S}x`, "0"), c.append(`${S}y`, "0");
      } else m && c.append(m, v);
    }
  } else {
    if (Tu(n))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = au, s = null, o = iu, h = n;
  }
  return c && o === "text/plain" && (h = c, c = void 0), { action: s, method: r.toLowerCase(), encType: o, formData: c, body: h };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function mh(n, a) {
  if (n === !1 || n === null || typeof n > "u")
    throw new Error(a);
}
function Fb(n, a, r, s) {
  let o = typeof n == "string" ? new URL(
    n,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : n;
  return r ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${s}` : o.pathname = `${o.pathname}.${s}` : o.pathname === "/" ? o.pathname = `_root.${s}` : a && Xn(o.pathname, a) === "/" ? o.pathname = `${du(a)}/_root.${s}` : o.pathname = `${du(o.pathname)}.${s}`, o;
}
async function aT(n, a) {
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
function iT(n) {
  return n == null ? !1 : n.href == null ? n.rel === "preload" && typeof n.imageSrcSet == "string" && typeof n.imageSizes == "string" : typeof n.rel == "string" && typeof n.href == "string";
}
async function rT(n, a, r) {
  let s = await Promise.all(
    n.map(async (o) => {
      let c = a.routes[o.route.id];
      if (c) {
        let h = await aT(c, r);
        return h.links ? h.links() : [];
      }
      return [];
    })
  );
  return uT(
    s.flat(1).filter(iT).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function cy(n, a, r, s, o, c) {
  let h = (g, m) => r[m] ? g.route.id !== r[m].route.id : !0, p = (g, m) => (
    // param change, /users/123 -> /users/456
    r[m].pathname !== g.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r[m].route.path?.endsWith("*") && r[m].params["*"] !== g.params["*"]
  );
  return c === "assets" ? a.filter(
    (g, m) => h(g, m) || p(g, m)
  ) : c === "data" ? a.filter((g, m) => {
    let b = s.routes[g.route.id];
    if (!b || !b.hasLoader)
      return !1;
    if (h(g, m) || p(g, m))
      return !0;
    if (g.route.shouldRevalidate) {
      let v = g.route.shouldRevalidate({
        currentUrl: new URL(
          o.pathname + o.search + o.hash,
          window.origin
        ),
        currentParams: r[0]?.params || {},
        nextUrl: new URL(n, window.origin),
        nextParams: g.params,
        defaultShouldRevalidate: !0
      });
      if (typeof v == "boolean")
        return v;
    }
    return !0;
  }) : [];
}
function lT(n, a, { includeHydrateFallback: r } = {}) {
  return sT(
    n.map((s) => {
      let o = a.routes[s.route.id];
      if (!o) return [];
      let c = [o.module];
      return o.clientActionModule && (c = c.concat(o.clientActionModule)), o.clientLoaderModule && (c = c.concat(o.clientLoaderModule)), r && o.hydrateFallbackModule && (c = c.concat(o.hydrateFallbackModule)), o.imports && (c = c.concat(o.imports)), c;
    }).flat(1)
  );
}
function sT(n) {
  return [...new Set(n)];
}
function oT(n) {
  let a = {}, r = Object.keys(n).sort();
  for (let s of r)
    a[s] = n[s];
  return a;
}
function uT(n, a) {
  let r = /* @__PURE__ */ new Set();
  return new Set(a), n.reduce((s, o) => {
    let c = JSON.stringify(oT(o));
    return r.has(c) || (r.add(c), s.push({ key: c, link: o })), s;
  }, []);
}
function ph() {
  let n = x.useContext(Wi);
  return mh(
    n,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), n;
}
function cT() {
  let n = x.useContext(ys);
  return mh(
    n,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), n;
}
var gh = x.createContext(void 0);
gh.displayName = "FrameworkContext";
function vh() {
  let n = x.useContext(gh);
  return mh(
    n,
    "You must render this element inside a <HydratedRouter> element"
  ), n;
}
function dT(n, a) {
  let r = x.useContext(gh), [s, o] = x.useState(!1), [c, h] = x.useState(!1), { onFocus: p, onBlur: g, onMouseEnter: m, onMouseLeave: b, onTouchStart: v } = a, S = x.useRef(null);
  x.useEffect(() => {
    if (n === "render" && h(!0), n === "viewport") {
      let T = (C) => {
        C.forEach((z) => {
          h(z.isIntersecting);
        });
      }, _ = new IntersectionObserver(T, { threshold: 0.5 });
      return S.current && _.observe(S.current), () => {
        _.disconnect();
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
      onFocus: Ql(p, w),
      onBlur: Ql(g, j),
      onMouseEnter: Ql(m, w),
      onMouseLeave: Ql(b, j),
      onTouchStart: Ql(v, w)
    }
  ] : [!1, S, {}];
}
function Ql(n, a) {
  return (r) => {
    n && n(r), r.defaultPrevented || a(r);
  };
}
function fT({ page: n, ...a }) {
  let r = kb(), { router: s } = ph(), o = x.useMemo(
    () => pi(s.routes, n, s.basename),
    [s.routes, n, s.basename]
  );
  return o ? r ? /* @__PURE__ */ x.createElement(mT, { page: n, matches: o, ...a }) : /* @__PURE__ */ x.createElement(pT, { page: n, matches: o, ...a }) : null;
}
function hT(n) {
  let { manifest: a, routeModules: r } = vh(), [s, o] = x.useState([]);
  return x.useEffect(() => {
    let c = !1;
    return rT(n, a, r).then(
      (h) => {
        c || o(h);
      }
    ), () => {
      c = !0;
    };
  }, [n, a, r]), s;
}
function mT({
  page: n,
  matches: a,
  ...r
}) {
  let s = Ba(), { future: o } = vh(), { basename: c } = ph(), h = x.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let p = Fb(
      n,
      c,
      o.unstable_trailingSlashAwareDataRequests,
      "rsc"
    ), g = !1, m = [];
    for (let b of a)
      typeof b.route.shouldRevalidate == "function" ? g = !0 : m.push(b.route.id);
    return g && m.length > 0 && p.searchParams.set("_routes", m.join(",")), [p.pathname + p.search];
  }, [
    c,
    o.unstable_trailingSlashAwareDataRequests,
    n,
    s,
    a
  ]);
  return /* @__PURE__ */ x.createElement(x.Fragment, null, h.map((p) => /* @__PURE__ */ x.createElement("link", { key: p, rel: "prefetch", as: "fetch", href: p, ...r })));
}
function pT({
  page: n,
  matches: a,
  ...r
}) {
  let s = Ba(), { future: o, manifest: c, routeModules: h } = vh(), { basename: p } = ph(), { loaderData: g, matches: m } = cT(), b = x.useMemo(
    () => cy(
      n,
      a,
      m,
      c,
      s,
      "data"
    ),
    [n, a, m, c, s]
  ), v = x.useMemo(
    () => cy(
      n,
      a,
      m,
      c,
      s,
      "assets"
    ),
    [n, a, m, c, s]
  ), S = x.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let T = /* @__PURE__ */ new Set(), _ = !1;
    if (a.forEach((z) => {
      let O = c.routes[z.route.id];
      !O || !O.hasLoader || (!b.some((R) => R.route.id === z.route.id) && z.route.id in g && h[z.route.id]?.shouldRevalidate || O.hasClientLoader ? _ = !0 : T.add(z.route.id));
    }), T.size === 0)
      return [];
    let C = Fb(
      n,
      p,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return _ && T.size > 0 && C.searchParams.set(
      "_routes",
      a.filter((z) => T.has(z.route.id)).map((z) => z.route.id).join(",")
    ), [C.pathname + C.search];
  }, [
    p,
    o.unstable_trailingSlashAwareDataRequests,
    g,
    s,
    c,
    b,
    a,
    n,
    h
  ]), w = x.useMemo(
    () => lT(v, c),
    [v, c]
  ), j = hT(v);
  return /* @__PURE__ */ x.createElement(x.Fragment, null, S.map((T) => /* @__PURE__ */ x.createElement("link", { key: T, rel: "prefetch", as: "fetch", href: T, ...r })), w.map((T) => /* @__PURE__ */ x.createElement("link", { key: T, rel: "modulepreload", href: T, ...r })), j.map(({ key: T, link: _ }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ x.createElement(
      "link",
      {
        key: T,
        nonce: r.nonce,
        ..._,
        crossOrigin: _.crossOrigin ?? r.crossOrigin
      }
    )
  )));
}
function gT(...n) {
  return (a) => {
    n.forEach((r) => {
      typeof r == "function" ? r(a) : r != null && (r.current = a);
    });
  };
}
var vT = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  vT && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var Gb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Cu = x.forwardRef(
  function({
    onClick: a,
    discover: r = "render",
    prefetch: s = "none",
    relative: o,
    reloadDocument: c,
    replace: h,
    unstable_mask: p,
    state: g,
    target: m,
    to: b,
    preventScrollReset: v,
    viewTransition: S,
    unstable_defaultShouldRevalidate: w,
    ...j
  }, T) {
    let { basename: _, navigator: C, unstable_useTransitions: z } = x.useContext(Kn), O = typeof b == "string" && Gb.test(b), R = wb(b, _);
    b = R.to;
    let X = Tj(b, { relative: o }), $ = Ba(), Q = null;
    if (p) {
      let le = Su(
        p,
        [],
        $.unstable_mask ? $.unstable_mask.pathname : "/",
        !0
      );
      _ !== "/" && (le.pathname = le.pathname === "/" ? _ : Yn([_, le.pathname])), Q = C.createHref(le);
    }
    let [M, B, J] = dT(
      s,
      j
    ), se = ST(b, {
      replace: h,
      unstable_mask: p,
      state: g,
      target: m,
      preventScrollReset: v,
      relative: o,
      viewTransition: S,
      unstable_defaultShouldRevalidate: w,
      unstable_useTransitions: z
    });
    function oe(le) {
      a && a(le), le.defaultPrevented || se(le);
    }
    let be = !(R.isExternal || c), Se = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ x.createElement(
        "a",
        {
          ...j,
          ...J,
          href: (be ? Q : void 0) || R.absoluteURL || X,
          onClick: be ? oe : a,
          ref: gT(T, B),
          target: m,
          "data-discover": !O && r === "render" ? "true" : void 0
        }
      )
    );
    return M && !O ? /* @__PURE__ */ x.createElement(x.Fragment, null, Se, /* @__PURE__ */ x.createElement(fT, { page: X })) : Se;
  }
);
Cu.displayName = "Link";
var yT = x.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: r = !1,
    className: s = "",
    end: o = !1,
    style: c,
    to: h,
    viewTransition: p,
    children: g,
    ...m
  }, b) {
    let v = xs(h, { relative: m.relative }), S = Ba(), w = x.useContext(ys), { navigator: j, basename: T } = x.useContext(Kn), _ = w != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    CT(v) && p === !0, C = j.encodeLocation ? j.encodeLocation(v).pathname : v.pathname, z = S.pathname, O = w && w.navigation && w.navigation.location ? w.navigation.location.pathname : null;
    r || (z = z.toLowerCase(), O = O ? O.toLowerCase() : null, C = C.toLowerCase()), O && T && (O = Xn(O, T) || O);
    const R = C !== "/" && C.endsWith("/") ? C.length - 1 : C.length;
    let X = z === C || !o && z.startsWith(C) && z.charAt(R) === "/", $ = O != null && (O === C || !o && O.startsWith(C) && O.charAt(C.length) === "/"), Q = {
      isActive: X,
      isPending: $,
      isTransitioning: _
    }, M = X ? a : void 0, B;
    typeof s == "function" ? B = s(Q) : B = [
      s,
      X ? "active" : null,
      $ ? "pending" : null,
      _ ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let J = typeof c == "function" ? c(Q) : c;
    return /* @__PURE__ */ x.createElement(
      Cu,
      {
        ...m,
        "aria-current": M,
        className: B,
        ref: b,
        style: J,
        to: h,
        viewTransition: p
      },
      typeof g == "function" ? g(Q) : g
    );
  }
);
yT.displayName = "NavLink";
var bT = x.forwardRef(
  ({
    discover: n = "render",
    fetcherKey: a,
    navigate: r,
    reloadDocument: s,
    replace: o,
    state: c,
    method: h = au,
    action: p,
    onSubmit: g,
    relative: m,
    preventScrollReset: b,
    viewTransition: v,
    unstable_defaultShouldRevalidate: S,
    ...w
  }, j) => {
    let { unstable_useTransitions: T } = x.useContext(Kn), _ = jT(), C = TT(p, { relative: m }), z = h.toLowerCase() === "get" ? "get" : "post", O = typeof p == "string" && Gb.test(p), R = (X) => {
      if (g && g(X), X.defaultPrevented) return;
      X.preventDefault();
      let $ = X.nativeEvent.submitter, Q = $?.getAttribute("formmethod") || h, M = () => _($ || X.currentTarget, {
        fetcherKey: a,
        method: Q,
        navigate: r,
        replace: o,
        state: c,
        relative: m,
        preventScrollReset: b,
        viewTransition: v,
        unstable_defaultShouldRevalidate: S
      });
      T && r !== !1 ? x.startTransition(() => M()) : M();
    };
    return /* @__PURE__ */ x.createElement(
      "form",
      {
        ref: j,
        method: z,
        action: C,
        onSubmit: s ? g : R,
        ...w,
        "data-discover": !O && n === "render" ? "true" : void 0
      }
    );
  }
);
bT.displayName = "Form";
function xT(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Xb(n) {
  let a = x.useContext(Wi);
  return $e(a, xT(n)), a;
}
function ST(n, {
  target: a,
  replace: r,
  unstable_mask: s,
  state: o,
  preventScrollReset: c,
  relative: h,
  viewTransition: p,
  unstable_defaultShouldRevalidate: g,
  unstable_useTransitions: m
} = {}) {
  let b = Pr(), v = Ba(), S = xs(n, { relative: h });
  return x.useCallback(
    (w) => {
      if (Wj(w, a)) {
        w.preventDefault();
        let j = r !== void 0 ? r : ha(v) === ha(S), T = () => b(n, {
          replace: j,
          unstable_mask: s,
          state: o,
          preventScrollReset: c,
          relative: h,
          viewTransition: p,
          unstable_defaultShouldRevalidate: g
        });
        m ? x.startTransition(() => T()) : T();
      }
    },
    [
      v,
      b,
      S,
      r,
      s,
      o,
      a,
      n,
      c,
      h,
      p,
      g,
      m
    ]
  );
}
var wT = 0, ET = () => `__${String(++wT)}__`;
function jT() {
  let { router: n } = Xb(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = x.useContext(Kn), r = Lj(), s = n.fetch, o = n.navigate;
  return x.useCallback(
    async (c, h = {}) => {
      let { action: p, method: g, encType: m, formData: b, body: v } = nT(
        c,
        a
      );
      if (h.navigate === !1) {
        let S = h.fetcherKey || ET();
        await s(S, r, h.action || p, {
          unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: b,
          body: v,
          formMethod: h.method || g,
          formEncType: h.encType || m,
          flushSync: h.flushSync
        });
      } else
        await o(h.action || p, {
          unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: b,
          body: v,
          formMethod: h.method || g,
          formEncType: h.encType || m,
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
function TT(n, { relative: a } = {}) {
  let { basename: r } = x.useContext(Kn), s = x.useContext(Va);
  $e(s, "useFormAction must be used inside a RouteContext");
  let [o] = s.matches.slice(-1), c = { ...xs(n || ".", { relative: a }) }, h = Ba();
  if (n == null) {
    c.search = h.search;
    let p = new URLSearchParams(c.search), g = p.getAll("index");
    if (g.some((b) => b === "")) {
      p.delete("index"), g.filter((v) => v).forEach((v) => p.append("index", v));
      let b = p.toString();
      c.search = b ? `?${b}` : "";
    }
  }
  return (!n || n === ".") && o.route.index && (c.search = c.search ? c.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (c.pathname = c.pathname === "/" ? r : Yn([r, c.pathname])), ha(c);
}
function CT(n, { relative: a } = {}) {
  let r = x.useContext(dh);
  $e(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = Xb(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = xs(n, { relative: a });
  if (!r.isTransitioning)
    return !1;
  let c = Xn(r.currentLocation.pathname, s) || r.currentLocation.pathname, h = Xn(r.nextLocation.pathname, s) || r.nextLocation.pathname;
  return cu(o.pathname, h) != null || cu(o.pathname, c) != null;
}
class Jr extends Error {
  constructor(a, r, s, o) {
    super(s), this.status = a, this.category = r, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const wi = "/api/v1/extensions/nexus.audio.emotiontts";
async function vt(n, a) {
  const r = n.startsWith("http") ? n : `${wi}${n}`, s = await fetch(r, {
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
    throw new Jr(
      s.status,
      o?.category ?? "unknown",
      o?.message ?? s.statusText,
      o?.requestId
    );
  }
  if (s.status !== 204)
    return await s.json();
}
function NT(n, a, r) {
  const s = n.startsWith("http") ? n : `${wi}${n}`, o = new EventSource(s);
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
async function MT() {
  return vt("/deployments");
}
async function dy(n) {
  return vt(`/deployments/${n}`);
}
async function RT(n, a) {
  return vt(`/deployments/${n}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function fy(n) {
  return vt(`/mappings?deploymentId=${encodeURIComponent(n)}`);
}
async function yh(n, a) {
  return vt("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: n })
  });
}
async function rs(n, a, r) {
  return vt(
    `/mappings/${a}?deploymentId=${encodeURIComponent(n)}`,
    {
      method: "PATCH",
      body: JSON.stringify(r)
    }
  );
}
async function Kb(n, a) {
  await vt(
    `/mappings/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
async function AT(n) {
  return vt(`/mappings/export?deploymentId=${encodeURIComponent(n)}`);
}
async function _T(n, a, r = "error") {
  return vt("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: n, mappings: a, conflictStrategy: r })
  });
}
async function DT(n, a = {}) {
  const r = new URLSearchParams();
  a.limit && r.set("limit", String(a.limit)), a.status && r.set("status", a.status);
  const s = r.toString(), o = s ? `?${s}` : "";
  return vt(`/deployments/${n}/runs${o}`);
}
async function zT(n, a) {
  return vt(`/deployments/${n}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function bh(n, a) {
  return vt(`/deployments/${n}/runs/${a}`);
}
async function OT(n, a) {
  return vt(`/deployments/${n}/runs/${a}/cancel`, { method: "POST" });
}
async function Qb(n, a) {
  return vt(`/deployments/${n}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function LT(n, a) {
  return vt(`/deployments/${n}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function hy(n, a, r, s) {
  return NT(
    `/deployments/${n}/runs/${a}/progress`,
    r,
    s
  );
}
async function cs(n) {
  return vt(`/voice-assets?deploymentId=${encodeURIComponent(n)}`);
}
async function Zb(n, a, r, s, o) {
  const c = new FormData();
  c.append("deploymentId", n), c.append("displayName", r), c.append("kind", s), c.append("audio", a);
  const h = await fetch(`${wi}/voice-assets`, {
    method: "POST",
    body: c
  });
  if (!h.ok)
    throw new Error(`upload failed: ${h.status}`);
  return await h.json();
}
async function UT(n) {
  return vt(`/workflow?deploymentId=${encodeURIComponent(n)}`);
}
var kT = "mux0i60", VT = "mux0i61", BT = "mux0i62", HT = "mux0i63";
function ws({ count: n = "0", title: a, hint: r }) {
  return /* @__PURE__ */ f.jsxs("div", { className: kT, children: [
    /* @__PURE__ */ f.jsx("span", { className: VT, "aria-hidden": "true", children: n }),
    /* @__PURE__ */ f.jsx("h3", { className: BT, children: a }),
    r ? /* @__PURE__ */ f.jsx("p", { className: HT, children: r }) : null
  ] });
}
var qT = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, $T = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, IT = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, YT = "zwn3019";
function Ua({
  tone: n = "raised",
  density: a = "comfortable",
  elevation: r = "subtle",
  as: s = "section",
  children: o,
  className: c,
  style: h,
  ...p
}) {
  const g = [qT[n], IT[a], $T[r], c].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsx(s, { className: g, style: h, "data-elevation": r, ...p, children: o });
}
function FT({ children: n, className: a }) {
  const r = [YT, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsx("div", { className: r, children: n });
}
var Zi = "vrkn5p0", GT = "_93p6291", XT = "_93p6292", KT = "_93p6293", QT = "_93p6294", ZT = "_93p6295", PT = "_93p6296", JT = "_93p6297", WT = "_93p6298", eC = "_93p6299", tC = "_93p629a", nC = "_93p629b", aC = "_93p629c", iC = "_93p629d", rC = "_93p629e";
function lC() {
  const { deployments: n } = Ss(), a = n.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ f.jsxs("main", { className: GT, children: [
    /* @__PURE__ */ f.jsxs("header", { className: XT, children: [
      /* @__PURE__ */ f.jsx("p", { className: KT, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ f.jsxs("h1", { className: QT, children: [
        "Direct your characters.",
        /* @__PURE__ */ f.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ f.jsx("p", { className: ZT, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ f.jsxs("p", { className: PT, children: [
        /* @__PURE__ */ f.jsx("span", { className: JT, children: n.length }),
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
        className: WT,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ f.jsx("h2", { id: "deployments-section-list", className: Zi, children: "01 / Deployments" }),
          n.length === 0 ? /* @__PURE__ */ f.jsx(
            ws,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ f.jsx("ul", { className: eC, children: n.map((r) => /* @__PURE__ */ f.jsx("li", { children: /* @__PURE__ */ f.jsxs(Cu, { to: `/${r.deploymentId}/recipe`, className: tC, children: [
            /* @__PURE__ */ f.jsx("span", { className: nC, "aria-hidden": "true", children: sC(r.displayName) }),
            /* @__PURE__ */ f.jsxs("span", { children: [
              /* @__PURE__ */ f.jsx("span", { className: aC, children: r.displayName }),
              /* @__PURE__ */ f.jsx("span", { className: iC, children: r.deploymentId })
            ] }),
            /* @__PURE__ */ f.jsx("span", { className: rC, "aria-hidden": "true", children: "→" })
          ] }) }, r.deploymentId)) })
        ]
      }
    )
  ] });
}
function sC(n) {
  const a = n.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
var oC = pb();
const uC = /* @__PURE__ */ mb(oC);
function cC(n) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
  r.type = "text/css", a.appendChild(r), r.styleSheet ? r.styleSheet.cssText = n : r.appendChild(document.createTextNode(n));
}
const dC = (n) => {
  switch (n) {
    case "success":
      return mC;
    case "info":
      return gC;
    case "warning":
      return pC;
    case "error":
      return vC;
    default:
      return null;
  }
}, fC = Array(12).fill(0), hC = ({ visible: n, className: a }) => /* @__PURE__ */ ce.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": n
}, /* @__PURE__ */ ce.createElement("div", {
  className: "sonner-spinner"
}, fC.map((r, s) => /* @__PURE__ */ ce.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${s}`
})))), mC = /* @__PURE__ */ ce.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ce.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), pC = /* @__PURE__ */ ce.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ce.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), gC = /* @__PURE__ */ ce.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ce.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), vC = /* @__PURE__ */ ce.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ce.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), yC = /* @__PURE__ */ ce.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ ce.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ ce.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})), bC = () => {
  const [n, a] = ce.useState(document.hidden);
  return ce.useEffect(() => {
    const r = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", r), () => window.removeEventListener("visibilitychange", r);
  }, []), n;
};
let Of = 1;
class xC {
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
      const { message: s, ...o } = a, c = typeof a?.id == "number" || ((r = a.id) == null ? void 0 : r.length) > 0 ? a.id : Of++, h = this.toasts.find((g) => g.id === c), p = a.dismissible === void 0 ? !0 : a.dismissible;
      return this.dismissedToasts.has(c) && this.dismissedToasts.delete(c), h ? this.toasts = this.toasts.map((g) => g.id === c ? (this.publish({
        ...g,
        ...a,
        id: c,
        title: s
      }), {
        ...g,
        ...a,
        id: c,
        dismissible: p,
        title: s
      }) : g) : this.addToast({
        title: s,
        ...o,
        dismissible: p,
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
      const p = o.then(async (m) => {
        if (h = [
          "resolve",
          m
        ], ce.isValidElement(m))
          c = !1, this.create({
            id: s,
            type: "default",
            message: m
          });
        else if (wC(m) && !m.ok) {
          c = !1;
          const v = typeof r.error == "function" ? await r.error(`HTTP error! status: ${m.status}`) : r.error, S = typeof r.description == "function" ? await r.description(`HTTP error! status: ${m.status}`) : r.description, j = typeof v == "object" && !ce.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: s,
            type: "error",
            description: S,
            ...j
          });
        } else if (m instanceof Error) {
          c = !1;
          const v = typeof r.error == "function" ? await r.error(m) : r.error, S = typeof r.description == "function" ? await r.description(m) : r.description, j = typeof v == "object" && !ce.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: s,
            type: "error",
            description: S,
            ...j
          });
        } else if (r.success !== void 0) {
          c = !1;
          const v = typeof r.success == "function" ? await r.success(m) : r.success, S = typeof r.description == "function" ? await r.description(m) : r.description, j = typeof v == "object" && !ce.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: s,
            type: "success",
            description: S,
            ...j
          });
        }
      }).catch(async (m) => {
        if (h = [
          "reject",
          m
        ], r.error !== void 0) {
          c = !1;
          const b = typeof r.error == "function" ? await r.error(m) : r.error, v = typeof r.description == "function" ? await r.description(m) : r.description, w = typeof b == "object" && !ce.isValidElement(b) ? b : {
            message: b
          };
          this.create({
            id: s,
            type: "error",
            description: v,
            ...w
          });
        }
      }).finally(() => {
        c && (this.dismiss(s), s = void 0), r.finally == null || r.finally.call(r);
      }), g = () => new Promise((m, b) => p.then(() => h[0] === "reject" ? b(h[1]) : m(h[1])).catch(b));
      return typeof s != "string" && typeof s != "number" ? {
        unwrap: g
      } : Object.assign(s, {
        unwrap: g
      });
    }, this.custom = (a, r) => {
      const s = r?.id || Of++;
      return this.create({
        jsx: a(s),
        id: s,
        ...r
      }), s;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const gn = new xC(), SC = (n, a) => {
  const r = a?.id || Of++;
  return gn.addToast({
    title: n,
    ...a,
    id: r
  }), r;
}, wC = (n) => n && typeof n == "object" && "ok" in n && typeof n.ok == "boolean" && "status" in n && typeof n.status == "number", EC = SC, jC = () => gn.toasts, TC = () => gn.getActiveToasts(), my = Object.assign(EC, {
  success: gn.success,
  info: gn.info,
  warning: gn.warning,
  error: gn.error,
  custom: gn.custom,
  message: gn.message,
  promise: gn.promise,
  dismiss: gn.dismiss,
  loading: gn.loading
}, {
  getHistory: jC,
  getToasts: TC
});
cC("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function $o(n) {
  return n.label !== void 0;
}
const CC = 3, NC = "24px", MC = "16px", py = 4e3, RC = 356, AC = 14, _C = 45, DC = 200;
function fa(...n) {
  return n.filter(Boolean).join(" ");
}
function zC(n) {
  const [a, r] = n.split("-"), s = [];
  return a && s.push(a), r && s.push(r), s;
}
const OC = (n) => {
  var a, r, s, o, c, h, p, g, m;
  const { invert: b, toast: v, unstyled: S, interacting: w, setHeights: j, visibleToasts: T, heights: _, index: C, toasts: z, expanded: O, removeToast: R, defaultRichColors: X, closeButton: $, style: Q, cancelButtonStyle: M, actionButtonStyle: B, className: J = "", descriptionClassName: se = "", duration: oe, position: be, gap: Se, expandByDefault: le, classNames: U, icons: k, closeButtonAriaLabel: q = "Close toast" } = n, [Z, ae] = ce.useState(null), [N, P] = ce.useState(null), [W, ie] = ce.useState(!1), [de, ye] = ce.useState(!1), [De, Re] = ce.useState(!1), [Be, fe] = ce.useState(!1), [Oe, Ae] = ce.useState(!1), [pe, tt] = ce.useState(0), [Et, en] = ce.useState(0), Gt = ce.useRef(v.duration || oe || py), ma = ce.useRef(null), Xt = ce.useRef(null), yn = C === 0, pa = C + 1 <= T, kt = v.type, Dn = v.dismissible !== !1, Vt = v.className || "", ge = v.descriptionClassName || "", ze = ce.useMemo(() => _.findIndex((Le) => Le.toastId === v.id) || 0, [
    _,
    v.id
  ]), Qe = ce.useMemo(() => {
    var Le;
    return (Le = v.closeButton) != null ? Le : $;
  }, [
    v.closeButton,
    $
  ]), nt = ce.useMemo(() => v.duration || oe || py, [
    v.duration,
    oe
  ]), Bt = ce.useRef(0), Ht = ce.useRef(0), Ti = ce.useRef(0), ia = ce.useRef(null), [Qn, Kt] = be.split("-"), jt = ce.useMemo(() => _.reduce((Le, ct, Rt) => Rt >= ze ? Le : Le + ct.height, 0), [
    _,
    ze
  ]), qt = bC(), er = v.invert || b, Ha = kt === "loading";
  Ht.current = ce.useMemo(() => ze * Se + jt, [
    ze,
    jt
  ]), ce.useEffect(() => {
    Gt.current = nt;
  }, [
    nt
  ]), ce.useEffect(() => {
    ie(!0);
  }, []), ce.useEffect(() => {
    const Le = Xt.current;
    if (Le) {
      const ct = Le.getBoundingClientRect().height;
      return en(ct), j((Rt) => [
        {
          toastId: v.id,
          height: ct,
          position: v.position
        },
        ...Rt
      ]), () => j((Rt) => Rt.filter(($t) => $t.toastId !== v.id));
    }
  }, [
    j,
    v.id
  ]), ce.useLayoutEffect(() => {
    if (!W) return;
    const Le = Xt.current, ct = Le.style.height;
    Le.style.height = "auto";
    const Rt = Le.getBoundingClientRect().height;
    Le.style.height = ct, en(Rt), j(($t) => $t.find((rt) => rt.toastId === v.id) ? $t.map((rt) => rt.toastId === v.id ? {
      ...rt,
      height: Rt
    } : rt) : [
      {
        toastId: v.id,
        height: Rt,
        position: v.position
      },
      ...$t
    ]);
  }, [
    W,
    v.title,
    v.description,
    j,
    v.id,
    v.jsx,
    v.action,
    v.cancel
  ]);
  const zn = ce.useCallback(() => {
    ye(!0), tt(Ht.current), j((Le) => Le.filter((ct) => ct.toastId !== v.id)), setTimeout(() => {
      R(v);
    }, DC);
  }, [
    v,
    R,
    j,
    Ht
  ]);
  ce.useEffect(() => {
    if (v.promise && kt === "loading" || v.duration === 1 / 0 || v.type === "loading") return;
    let Le;
    return O || w || qt ? (() => {
      if (Ti.current < Bt.current) {
        const $t = (/* @__PURE__ */ new Date()).getTime() - Bt.current;
        Gt.current = Gt.current - $t;
      }
      Ti.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      Gt.current !== 1 / 0 && (Bt.current = (/* @__PURE__ */ new Date()).getTime(), Le = setTimeout(() => {
        v.onAutoClose == null || v.onAutoClose.call(v, v), zn();
      }, Gt.current));
    })(), () => clearTimeout(Le);
  }, [
    O,
    w,
    v,
    kt,
    qt,
    zn
  ]), ce.useEffect(() => {
    v.delete && (zn(), v.onDismiss == null || v.onDismiss.call(v, v));
  }, [
    zn,
    v.delete
  ]);
  function ga() {
    var Le;
    if (k?.loading) {
      var ct;
      return /* @__PURE__ */ ce.createElement("div", {
        className: fa(U?.loader, v == null || (ct = v.classNames) == null ? void 0 : ct.loader, "sonner-loader"),
        "data-visible": kt === "loading"
      }, k.loading);
    }
    return /* @__PURE__ */ ce.createElement(hC, {
      className: fa(U?.loader, v == null || (Le = v.classNames) == null ? void 0 : Le.loader),
      visible: kt === "loading"
    });
  }
  const Zn = v.icon || k?.[kt] || dC(kt);
  var ra, un;
  return /* @__PURE__ */ ce.createElement("li", {
    tabIndex: 0,
    ref: Xt,
    className: fa(J, Vt, U?.toast, v == null || (a = v.classNames) == null ? void 0 : a.toast, U?.default, U?.[kt], v == null || (r = v.classNames) == null ? void 0 : r[kt]),
    "data-sonner-toast": "",
    "data-rich-colors": (ra = v.richColors) != null ? ra : X,
    "data-styled": !(v.jsx || v.unstyled || S),
    "data-mounted": W,
    "data-promise": !!v.promise,
    "data-swiped": Oe,
    "data-removed": de,
    "data-visible": pa,
    "data-y-position": Qn,
    "data-x-position": Kt,
    "data-index": C,
    "data-front": yn,
    "data-swiping": De,
    "data-dismissible": Dn,
    "data-type": kt,
    "data-invert": er,
    "data-swipe-out": Be,
    "data-swipe-direction": N,
    "data-expanded": !!(O || le && W),
    "data-testid": v.testId,
    style: {
      "--index": C,
      "--toasts-before": C,
      "--z-index": z.length - C,
      "--offset": `${de ? pe : Ht.current}px`,
      "--initial-height": le ? "auto" : `${Et}px`,
      ...Q,
      ...v.style
    },
    onDragEnd: () => {
      Re(!1), ae(null), ia.current = null;
    },
    onPointerDown: (Le) => {
      Le.button !== 2 && (Ha || !Dn || (ma.current = /* @__PURE__ */ new Date(), tt(Ht.current), Le.target.setPointerCapture(Le.pointerId), Le.target.tagName !== "BUTTON" && (Re(!0), ia.current = {
        x: Le.clientX,
        y: Le.clientY
      })));
    },
    onPointerUp: () => {
      var Le, ct, Rt;
      if (Be || !Dn) return;
      ia.current = null;
      const $t = Number(((Le = Xt.current) == null ? void 0 : Le.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), bn = Number(((ct = Xt.current) == null ? void 0 : ct.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), rt = (/* @__PURE__ */ new Date()).getTime() - ((Rt = ma.current) == null ? void 0 : Rt.getTime()), Qt = Z === "x" ? $t : bn, va = Math.abs(Qt) / rt;
      if (Math.abs(Qt) >= _C || va > 0.11) {
        tt(Ht.current), v.onDismiss == null || v.onDismiss.call(v, v), P(Z === "x" ? $t > 0 ? "right" : "left" : bn > 0 ? "down" : "up"), zn(), fe(!0);
        return;
      } else {
        var tn, A;
        (tn = Xt.current) == null || tn.style.setProperty("--swipe-amount-x", "0px"), (A = Xt.current) == null || A.style.setProperty("--swipe-amount-y", "0px");
      }
      Ae(!1), Re(!1), ae(null);
    },
    onPointerMove: (Le) => {
      var ct, Rt, $t;
      if (!ia.current || !Dn || ((ct = window.getSelection()) == null ? void 0 : ct.toString().length) > 0) return;
      const rt = Le.clientY - ia.current.y, Qt = Le.clientX - ia.current.x;
      var va;
      const tn = (va = n.swipeDirections) != null ? va : zC(be);
      !Z && (Math.abs(Qt) > 1 || Math.abs(rt) > 1) && ae(Math.abs(Qt) > Math.abs(rt) ? "x" : "y");
      let A = {
        x: 0,
        y: 0
      };
      const V = (I) => 1 / (1.5 + Math.abs(I) / 20);
      if (Z === "y") {
        if (tn.includes("top") || tn.includes("bottom"))
          if (tn.includes("top") && rt < 0 || tn.includes("bottom") && rt > 0)
            A.y = rt;
          else {
            const I = rt * V(rt);
            A.y = Math.abs(I) < Math.abs(rt) ? I : rt;
          }
      } else if (Z === "x" && (tn.includes("left") || tn.includes("right")))
        if (tn.includes("left") && Qt < 0 || tn.includes("right") && Qt > 0)
          A.x = Qt;
        else {
          const I = Qt * V(Qt);
          A.x = Math.abs(I) < Math.abs(Qt) ? I : Qt;
        }
      (Math.abs(A.x) > 0 || Math.abs(A.y) > 0) && Ae(!0), (Rt = Xt.current) == null || Rt.style.setProperty("--swipe-amount-x", `${A.x}px`), ($t = Xt.current) == null || $t.style.setProperty("--swipe-amount-y", `${A.y}px`);
    }
  }, Qe && !v.jsx && kt !== "loading" ? /* @__PURE__ */ ce.createElement("button", {
    "aria-label": q,
    "data-disabled": Ha,
    "data-close-button": !0,
    onClick: Ha || !Dn ? () => {
    } : () => {
      zn(), v.onDismiss == null || v.onDismiss.call(v, v);
    },
    className: fa(U?.closeButton, v == null || (s = v.classNames) == null ? void 0 : s.closeButton)
  }, (un = k?.close) != null ? un : yC) : null, (kt || v.icon || v.promise) && v.icon !== null && (k?.[kt] !== null || v.icon) ? /* @__PURE__ */ ce.createElement("div", {
    "data-icon": "",
    className: fa(U?.icon, v == null || (o = v.classNames) == null ? void 0 : o.icon)
  }, v.promise || v.type === "loading" && !v.icon ? v.icon || ga() : null, v.type !== "loading" ? Zn : null) : null, /* @__PURE__ */ ce.createElement("div", {
    "data-content": "",
    className: fa(U?.content, v == null || (c = v.classNames) == null ? void 0 : c.content)
  }, /* @__PURE__ */ ce.createElement("div", {
    "data-title": "",
    className: fa(U?.title, v == null || (h = v.classNames) == null ? void 0 : h.title)
  }, v.jsx ? v.jsx : typeof v.title == "function" ? v.title() : v.title), v.description ? /* @__PURE__ */ ce.createElement("div", {
    "data-description": "",
    className: fa(se, ge, U?.description, v == null || (p = v.classNames) == null ? void 0 : p.description)
  }, typeof v.description == "function" ? v.description() : v.description) : null), /* @__PURE__ */ ce.isValidElement(v.cancel) ? v.cancel : v.cancel && $o(v.cancel) ? /* @__PURE__ */ ce.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: v.cancelButtonStyle || M,
    onClick: (Le) => {
      $o(v.cancel) && Dn && (v.cancel.onClick == null || v.cancel.onClick.call(v.cancel, Le), zn());
    },
    className: fa(U?.cancelButton, v == null || (g = v.classNames) == null ? void 0 : g.cancelButton)
  }, v.cancel.label) : null, /* @__PURE__ */ ce.isValidElement(v.action) ? v.action : v.action && $o(v.action) ? /* @__PURE__ */ ce.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: v.actionButtonStyle || B,
    onClick: (Le) => {
      $o(v.action) && (v.action.onClick == null || v.action.onClick.call(v.action, Le), !Le.defaultPrevented && zn());
    },
    className: fa(U?.actionButton, v == null || (m = v.classNames) == null ? void 0 : m.actionButton)
  }, v.action.label) : null);
};
function gy() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const n = document.documentElement.getAttribute("dir");
  return n === "auto" || !n ? window.getComputedStyle(document.documentElement).direction : n;
}
function LC(n, a) {
  const r = {};
  return [
    n,
    a
  ].forEach((s, o) => {
    const c = o === 1, h = c ? "--mobile-offset" : "--offset", p = c ? MC : NC;
    function g(m) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((b) => {
        r[`${h}-${b}`] = typeof m == "number" ? `${m}px` : m;
      });
    }
    typeof s == "number" || typeof s == "string" ? g(s) : typeof s == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((m) => {
      s[m] === void 0 ? r[`${h}-${m}`] = p : r[`${h}-${m}`] = typeof s[m] == "number" ? `${s[m]}px` : s[m];
    }) : g(p);
  }), r;
}
const UC = /* @__PURE__ */ ce.forwardRef(function(a, r) {
  const { id: s, invert: o, position: c = "bottom-right", hotkey: h = [
    "altKey",
    "KeyT"
  ], expand: p, closeButton: g, className: m, offset: b, mobileOffset: v, theme: S = "light", richColors: w, duration: j, style: T, visibleToasts: _ = CC, toastOptions: C, dir: z = gy(), gap: O = AC, icons: R, containerAriaLabel: X = "Notifications" } = a, [$, Q] = ce.useState([]), M = ce.useMemo(() => s ? $.filter((W) => W.toasterId === s) : $.filter((W) => !W.toasterId), [
    $,
    s
  ]), B = ce.useMemo(() => Array.from(new Set([
    c
  ].concat(M.filter((W) => W.position).map((W) => W.position)))), [
    M,
    c
  ]), [J, se] = ce.useState([]), [oe, be] = ce.useState(!1), [Se, le] = ce.useState(!1), [U, k] = ce.useState(S !== "system" ? S : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), q = ce.useRef(null), Z = h.join("+").replace(/Key/g, "").replace(/Digit/g, ""), ae = ce.useRef(null), N = ce.useRef(!1), P = ce.useCallback((W) => {
    Q((ie) => {
      var de;
      return (de = ie.find((ye) => ye.id === W.id)) != null && de.delete || gn.dismiss(W.id), ie.filter(({ id: ye }) => ye !== W.id);
    });
  }, []);
  return ce.useEffect(() => gn.subscribe((W) => {
    if (W.dismiss) {
      requestAnimationFrame(() => {
        Q((ie) => ie.map((de) => de.id === W.id ? {
          ...de,
          delete: !0
        } : de));
      });
      return;
    }
    setTimeout(() => {
      uC.flushSync(() => {
        Q((ie) => {
          const de = ie.findIndex((ye) => ye.id === W.id);
          return de !== -1 ? [
            ...ie.slice(0, de),
            {
              ...ie[de],
              ...W
            },
            ...ie.slice(de + 1)
          ] : [
            W,
            ...ie
          ];
        });
      });
    });
  }), [
    $
  ]), ce.useEffect(() => {
    if (S !== "system") {
      k(S);
      return;
    }
    if (S === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? k("dark") : k("light")), typeof window > "u") return;
    const W = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      W.addEventListener("change", ({ matches: ie }) => {
        k(ie ? "dark" : "light");
      });
    } catch {
      W.addListener(({ matches: de }) => {
        try {
          k(de ? "dark" : "light");
        } catch (ye) {
          console.error(ye);
        }
      });
    }
  }, [
    S
  ]), ce.useEffect(() => {
    $.length <= 1 && be(!1);
  }, [
    $
  ]), ce.useEffect(() => {
    const W = (ie) => {
      var de;
      if (h.every((Re) => ie[Re] || ie.code === Re)) {
        var De;
        be(!0), (De = q.current) == null || De.focus();
      }
      ie.code === "Escape" && (document.activeElement === q.current || (de = q.current) != null && de.contains(document.activeElement)) && be(!1);
    };
    return document.addEventListener("keydown", W), () => document.removeEventListener("keydown", W);
  }, [
    h
  ]), ce.useEffect(() => {
    if (q.current)
      return () => {
        ae.current && (ae.current.focus({
          preventScroll: !0
        }), ae.current = null, N.current = !1);
      };
  }, [
    q.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ ce.createElement("section", {
    ref: r,
    "aria-label": `${X} ${Z}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, B.map((W, ie) => {
    var de;
    const [ye, De] = W.split("-");
    return M.length ? /* @__PURE__ */ ce.createElement("ol", {
      key: W,
      dir: z === "auto" ? gy() : z,
      tabIndex: -1,
      ref: q,
      className: m,
      "data-sonner-toaster": !0,
      "data-sonner-theme": U,
      "data-y-position": ye,
      "data-x-position": De,
      style: {
        "--front-toast-height": `${((de = J[0]) == null ? void 0 : de.height) || 0}px`,
        "--width": `${RC}px`,
        "--gap": `${O}px`,
        ...T,
        ...LC(b, v)
      },
      onBlur: (Re) => {
        N.current && !Re.currentTarget.contains(Re.relatedTarget) && (N.current = !1, ae.current && (ae.current.focus({
          preventScroll: !0
        }), ae.current = null));
      },
      onFocus: (Re) => {
        Re.target instanceof HTMLElement && Re.target.dataset.dismissible === "false" || N.current || (N.current = !0, ae.current = Re.relatedTarget);
      },
      onMouseEnter: () => be(!0),
      onMouseMove: () => be(!0),
      onMouseLeave: () => {
        Se || be(!1);
      },
      onDragEnd: () => be(!1),
      onPointerDown: (Re) => {
        Re.target instanceof HTMLElement && Re.target.dataset.dismissible === "false" || le(!0);
      },
      onPointerUp: () => le(!1)
    }, M.filter((Re) => !Re.position && ie === 0 || Re.position === W).map((Re, Be) => {
      var fe, Oe;
      return /* @__PURE__ */ ce.createElement(OC, {
        key: Re.id,
        icons: R,
        index: Be,
        toast: Re,
        defaultRichColors: w,
        duration: (fe = C?.duration) != null ? fe : j,
        className: C?.className,
        descriptionClassName: C?.descriptionClassName,
        invert: o,
        visibleToasts: _,
        closeButton: (Oe = C?.closeButton) != null ? Oe : g,
        interacting: Se,
        position: W,
        style: C?.style,
        unstyled: C?.unstyled,
        classNames: C?.classNames,
        cancelButtonStyle: C?.cancelButtonStyle,
        actionButtonStyle: C?.actionButtonStyle,
        closeButtonAriaLabel: C?.closeButtonAriaLabel,
        removeToast: P,
        toasts: M.filter((Ae) => Ae.position == Re.position),
        heights: J.filter((Ae) => Ae.position == Re.position),
        setHeights: se,
        expandByDefault: p,
        gap: O,
        expanded: oe,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), vy = 32, yy = -30, by = -6, xy = 0.5, Sy = 2, wy = -24, Ey = 24, jy = -12, Ty = 12, Cy = -12, Ny = 12, My = -60, Ry = -20;
class Kr extends Error {
  constructor(a, r) {
    super(r), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function Pb(n, a, r, s = {}) {
  const o = `/voice-assets/${encodeURIComponent(n)}/edit?deploymentId=${encodeURIComponent(a)}`, c = `${wi}${o}`, h = await fetch(c, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(r),
    ...s.signal ? { signal: s.signal } : {}
  });
  if (h.status === 409) {
    const p = await h.json().catch(() => null), g = p?.error?.current_digest ?? "", m = p?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Kr(g, m);
  }
  if (!h.ok)
    throw new Error(await Nu(h, "apply"));
  return await h.json();
}
async function kC(n, a, r, s, o = {}) {
  const c = `/deployments/${encodeURIComponent(n)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(r)}/edit`, h = `${wi}${c}`, p = await fetch(h, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(s),
    ...o.signal ? { signal: o.signal } : {}
  });
  if (p.status === 409) {
    const g = await p.json().catch(() => null), m = g?.error?.current_digest ?? "", b = g?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Kr(m, b);
  }
  if (!p.ok)
    throw new Error(await Nu(p, "apply"));
  return await p.json();
}
async function VC(n, a, r = {}) {
  const s = `${wi}/voice-assets/${encodeURIComponent(n)}/edit?deploymentId=${encodeURIComponent(a)}`, o = await fetch(s, {
    method: "DELETE",
    ...r.signal ? { signal: r.signal } : {}
  });
  if (!o.ok && o.status !== 204)
    throw new Error(`clear edit failed: ${o.status}`);
}
async function BC(n, a, r, s = {}) {
  const o = `${wi}/voice-assets/${encodeURIComponent(n)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, c = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain: r }),
    ...s.signal ? { signal: s.signal } : {}
  });
  if (!c.ok)
    throw new Error(await Nu(c, "preview"));
  return c.blob();
}
async function ru(n, a, r, s = 50, o = {}) {
  const c = `${wi}/audit/${encodeURIComponent(a)}/${encodeURIComponent(r)}?deploymentId=${encodeURIComponent(n)}&limit=${encodeURIComponent(String(s))}`, h = await fetch(c, {
    method: "GET",
    headers: { accept: "application/json" },
    ...o.signal ? { signal: o.signal } : {}
  });
  if (!h.ok)
    throw new Error(await Nu(h, "audit fetch"));
  return await h.json();
}
function vn() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function Jb(n, a) {
  if (n.version !== 1)
    return { message: "Unsupported chain version." };
  if (n.ops.length > vy)
    return {
      message: `Chain exceeds the maximum of ${vy} operations.`
    };
  for (const r of n.ops) {
    const s = HC(r, a);
    if (s) return s;
  }
  return null;
}
function HC(n, a) {
  switch (n.mode) {
    case "trim":
    case "crop":
    case "mute":
      return qC(n.id, n.start_ms, n.end_ms, a);
    case "normalize":
      return n.target_lufs < yy || n.target_lufs > by ? {
        opId: n.id,
        message: `Normalize target must be between ${yy} and ${by} LUFS.`
      } : null;
    case "speed":
      return n.factor < xy || n.factor > Sy ? {
        opId: n.id,
        message: `Speed factor must be between ${xy}× and ${Sy}×.`
      } : null;
    case "fade_in":
    case "fade_out":
      return n.duration_ms < 1 ? { opId: n.id, message: "Fade duration must be at least 1 ms." } : null;
    case "gain":
      return n.gain_db < wy || n.gain_db > Ey ? {
        opId: n.id,
        message: `Volume must be between ${wy} and ${Ey} dB.`
      } : null;
    case "eq3":
      for (const [r, s] of [
        ["low_db", n.low_db],
        ["mid_db", n.mid_db],
        ["high_db", n.high_db]
      ])
        if (s < jy || s > Ty)
          return {
            opId: n.id,
            message: `EQ ${r} must be between ${jy} and ${Ty} dB.`
          };
      return null;
    case "pitch_shift":
      return n.semitones < Cy || n.semitones > Ny ? {
        opId: n.id,
        message: `Pitch must be between ${Cy} and ${Ny} semitones.`
      } : null;
    case "silence_strip":
      return n.threshold_db < My || n.threshold_db > Ry ? {
        opId: n.id,
        message: `Silence threshold must be between ${My} and ${Ry} dB.`
      } : null;
    default:
      return {
        message: "Unknown edit op mode in chain — refusing to apply."
      };
  }
}
function qC(n, a, r, s) {
  return a < 0 ? { opId: n, message: "Start must be ≥ 0 ms." } : r <= a ? { opId: n, message: "End must be greater than start." } : s > 0 && r > s ? { opId: n, message: "End extends past source duration." } : null;
}
async function Nu(n, a) {
  const r = await n.json().catch(() => null);
  return r?.error?.message ?? r?.message ?? `${a} failed: ${n.status}`;
}
async function Wb(n) {
  return vt(`/presets?deploymentId=${encodeURIComponent(n)}`);
}
async function $C(n, a, r) {
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
var Ay = "_190jlds0", YC = "_190jlds1", FC = "_190jlds2", GC = "_190jlds3", XC = "_190jlds4", KC = "_190jlds5", QC = "_190jlds7", ZC = "_190jlds8", PC = "_190jlds9", JC = "_190jldsa", WC = "_190jldsb", _y = "_190jldsc", eN = "_190jldsd", Dy = "_190jldse", tN = "_190jldsf", nN = "_190jldsg", aN = "_190jldsh", ex = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, tx = { sm: "_4ydn546", md: "_4ydn547", lg: "_4ydn548" };
function Ze({
  variant: n = "primary",
  size: a = "md",
  type: r = "button",
  loading: s = !1,
  disabled: o,
  children: c,
  className: h,
  style: p,
  ...g
}) {
  const m = [ex[n], tx[a], h].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsx(
    "button",
    {
      type: r,
      className: m,
      style: p,
      disabled: s || o,
      "aria-busy": s || void 0,
      ...g,
      children: c
    }
  );
}
function iN({
  deploymentId: n,
  targets: a,
  onRevertToIdentity: r,
  onRevertToChain: s,
  emptyHint: o
}) {
  const [c, h] = x.useState(() => kr(a[0])), [p, g] = x.useState([]), [m, b] = x.useState(!1), [v, S] = x.useState(null), [w, j] = x.useState(!1), [T, _] = x.useState(null), C = x.useMemo(
    () => a.find((R) => kr(R) === c) ?? a[0],
    [a, c]
  );
  x.useEffect(() => {
    a.length && (a.some((R) => kr(R) === c) || h(kr(a[0])));
  }, [a, c]), x.useEffect(() => {
    if (!C) {
      g([]);
      return;
    }
    let R = !1;
    return b(!0), S(null), ru(n, C.kind, C.id, 50).then((X) => {
      R || g(X.entries);
    }).catch((X) => {
      R || S(X instanceof Error ? X.message : "audit fetch failed");
    }).finally(() => {
      R || b(!1);
    }), () => {
      R = !0;
    };
  }, [n, C]);
  const z = x.useCallback(() => {
    if (!C) return;
    const R = {
      deploymentId: n,
      targetKind: C.kind,
      targetId: C.id,
      targetLabel: C.label,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      entries: p
    }, X = new Blob([JSON.stringify(R, null, 2)], {
      type: "application/json"
    }), $ = URL.createObjectURL(X), Q = document.createElement("a");
    Q.href = $, Q.download = `audit-${C.kind}-${C.id}-${Date.now()}.json`, document.body.appendChild(Q), Q.click(), document.body.removeChild(Q), URL.revokeObjectURL($);
  }, [n, p, C]), O = x.useCallback(async () => {
    if (!(!C || !r) && window.confirm(
      `Revert "${C.label}" to identity (no edits)? This will write a new audit entry.`
    )) {
      j(!0);
      try {
        await r(C);
        const R = await ru(n, C.kind, C.id, 50);
        g(R.entries);
      } catch (R) {
        S(R instanceof Error ? R.message : "revert failed");
      } finally {
        j(!1);
      }
    }
  }, [n, r, C]);
  return a.length === 0 ? /* @__PURE__ */ f.jsx("div", { className: Ay, children: /* @__PURE__ */ f.jsx("p", { className: Dy, children: o ?? "Audit history surfaces here once a script is parsed and at least one cast member is mapped." }) }) : /* @__PURE__ */ f.jsxs("div", { className: Ay, children: [
    /* @__PURE__ */ f.jsxs("header", { className: YC, children: [
      /* @__PURE__ */ f.jsxs("div", { className: FC, children: [
        /* @__PURE__ */ f.jsx("label", { htmlFor: "audit-target-select", className: _y, children: "Target" }),
        /* @__PURE__ */ f.jsx(
          "select",
          {
            id: "audit-target-select",
            className: GC,
            value: c,
            onChange: (R) => h(R.target.value),
            children: a.map((R) => /* @__PURE__ */ f.jsxs("option", { value: kr(R), children: [
              R.kind === "voice_asset" ? "Voice asset" : "Utterance",
              " · ",
              R.label
            ] }, kr(R)))
          }
        )
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: XC, children: [
        /* @__PURE__ */ f.jsx(
          Ze,
          {
            variant: "ghost",
            size: "sm",
            onClick: z,
            disabled: p.length === 0 || m,
            children: "Export JSON"
          }
        ),
        r && /* @__PURE__ */ f.jsx(
          Ze,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => void O(),
            disabled: w || !C,
            children: w ? "Reverting…" : "Revert to identity"
          }
        )
      ] })
    ] }),
    v && /* @__PURE__ */ f.jsx("div", { className: nN, children: v }),
    m && !v && /* @__PURE__ */ f.jsx("div", { className: aN, "aria-live": "polite", children: "Loading edit history…" }),
    !m && !v && p.length === 0 && /* @__PURE__ */ f.jsxs("p", { className: Dy, children: [
      "No edits recorded for this target yet.",
      /* @__PURE__ */ f.jsx("br", {}),
      /* @__PURE__ */ f.jsx("span", { className: tN, children: "Apply a chain in the editor to populate the history." })
    ] }),
    !m && !v && p.length > 0 && /* @__PURE__ */ f.jsx("ul", { className: QC, children: p.map((R) => {
      const X = s && C && !!R.chain_snapshot_json && R.operation_count > 0;
      return /* @__PURE__ */ f.jsxs("li", { className: ZC, children: [
        /* @__PURE__ */ f.jsx("span", { className: PC, children: rN(R.recorded_at) }),
        /* @__PURE__ */ f.jsx("span", { className: JC, children: R.operation_count === 0 ? "cleared" : `${R.operation_count} ops` }),
        /* @__PURE__ */ f.jsxs("span", { className: WC, title: R.digest_after, children: [
          R.digest_after.slice(0, 12),
          "…"
        ] }),
        /* @__PURE__ */ f.jsx("span", { className: _y, children: R.actor || "—" }),
        /* @__PURE__ */ f.jsx(
          "span",
          {
            className: eN,
            style: {
              background: `color-mix(in oklab, ${R.operation_count === 0 ? "var(--error)" : "var(--accent)"} 14%, transparent)`,
              color: R.operation_count === 0 ? "var(--error)" : "var(--accent)"
            },
            children: R.digest_before === "" || !R.digest_before ? "create" : R.operation_count === 0 ? "clear" : "update"
          }
        ),
        X && /* @__PURE__ */ f.jsx(
          "button",
          {
            type: "button",
            className: KC,
            disabled: w || T !== null,
            onClick: async () => {
              if (!(!C || !R.chain_snapshot_json) && !(T !== null || w) && window.confirm(
                `Replay this ${R.operation_count}-op chain on "${C.label}"? A new audit entry will be written.`
              )) {
                _(R.entry_id);
                try {
                  await s(C, R.chain_snapshot_json, R);
                  const $ = await ru(
                    n,
                    C.kind,
                    C.id,
                    50
                  );
                  g($.entries);
                } catch ($) {
                  S($ instanceof Error ? $.message : "revert failed");
                } finally {
                  _(null);
                }
              }
            },
            children: T === R.entry_id ? "Reverting…" : "Revert →"
          }
        )
      ] }, R.entry_id);
    }) })
  ] });
}
function kr(n) {
  return n ? `${n.kind}:${n.id}` : "";
}
function rN(n) {
  const a = new Date(n);
  return Number.isNaN(a.getTime()) ? n : a.toLocaleString();
}
var lN = "_1uzgubz0", sN = "_1uzgubz1", oN = "_1uzgubz2", uN = "_1uzgubz3", cN = "_1uzgubz4", dN = "_1uzgubz5", fN = "_1uzgubz6", hN = "_1uzgubz7", zy = "_1uzgubz8", mN = "_1uzgubz9", nx = "_1uzgubza", ax = "_1uzgubzb", pN = "_1uzgubzc", gN = "_1uzgubzd", Wd = "_1uzgubze", ef = "_1uzgubzf", vN = "_1uzgubzg", yN = "_1uzgubzh", Oy = "_1uzgubzi", Ly = "_1uzgubzj", Uy = "_1uzgubzk", ky = "_1uzgubzl", Vy = "_1uzgubzm", bN = "_1uzgubzn", xN = "_1uzgubzo", SN = "_1uzgubzp", wN = "_1uzgubzq", EN = "_1uzgubzr";
function jN({
  characterName: n,
  color: a,
  lineCount: r,
  mapping: s,
  voiceAssets: o,
  presets: c,
  active: h,
  onToggle: p,
  onAssignVoiceAsset: g,
  onAssignPreset: m,
  onUploadFile: b,
  onClearMapping: v
}) {
  const [S, w] = x.useState(!1), j = s ? o.find((z) => z.voiceAssetId === s.speakerVoiceAssetId) : null, T = s?.defaultVectorPresetId ? c.find((z) => z.presetId === s.defaultVectorPresetId) ?? null : null, _ = (n[0] ?? "?").toUpperCase(), C = s !== null;
  return /* @__PURE__ */ f.jsxs("div", { className: `${lN}${h ? ` ${sN}` : ""}`, children: [
    /* @__PURE__ */ f.jsxs(
      "button",
      {
        type: "button",
        className: oN,
        onClick: p,
        "aria-expanded": h,
        children: [
          /* @__PURE__ */ f.jsx(
            "span",
            {
              className: uN,
              style: {
                background: `color-mix(in oklab, ${a} 22%, transparent)`,
                color: a
              },
              children: _
            }
          ),
          /* @__PURE__ */ f.jsxs("span", { className: cN, children: [
            /* @__PURE__ */ f.jsx("span", { className: dN, style: { color: a }, children: n }),
            /* @__PURE__ */ f.jsxs("span", { className: fN, children: [
              r,
              " lines"
            ] })
          ] }),
          /* @__PURE__ */ f.jsxs("span", { className: hN, children: [
            j ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
              /* @__PURE__ */ f.jsx("span", { className: zy, children: j.displayName }),
              j.durationMs != null && /* @__PURE__ */ f.jsxs("span", { children: [
                By(j.durationMs),
                " ·",
                " ",
                j.sampleRate ? `${j.sampleRate} Hz` : "—"
              ] })
            ] }) : T ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
              /* @__PURE__ */ f.jsx("span", { className: zy, children: T.presetName }),
              /* @__PURE__ */ f.jsx("span", { children: "preset" })
            ] }) : /* @__PURE__ */ f.jsx("span", { children: "no voice assigned" }),
            s?.voiceAssetChainDigest && /* @__PURE__ */ f.jsxs("span", { className: pN, children: [
              "chain · ",
              s.voiceAssetChainDigest.slice(0, 8)
            ] })
          ] }),
          /* @__PURE__ */ f.jsx(
            "span",
            {
              className: `${mN} ${C ? nx : ax}`,
              children: C ? "Mapped" : "Unmapped"
            }
          )
        ]
      }
    ),
    h && /* @__PURE__ */ f.jsxs("div", { className: gN, children: [
      /* @__PURE__ */ f.jsxs("div", { className: Wd, children: [
        /* @__PURE__ */ f.jsx("span", { className: ef, children: "Drop new audio" }),
        /* @__PURE__ */ f.jsxs(
          "label",
          {
            className: `${vN}${S ? ` ${yN}` : ""}`,
            onDragEnter: (z) => {
              z.preventDefault(), w(!0);
            },
            onDragOver: (z) => z.preventDefault(),
            onDragLeave: () => w(!1),
            onDrop: (z) => {
              z.preventDefault(), w(!1);
              const O = z.dataTransfer.files?.[0];
              O && b && b(O);
            },
            children: [
              /* @__PURE__ */ f.jsx("span", { children: "Drop a WAV / MP3 / FLAC here, or click to browse" }),
              /* @__PURE__ */ f.jsx(
                "input",
                {
                  type: "file",
                  accept: "audio/*",
                  style: { display: "none" },
                  onChange: (z) => {
                    const O = z.target.files?.[0];
                    O && b && b(O);
                  }
                }
              )
            ]
          }
        )
      ] }),
      o.length > 0 && /* @__PURE__ */ f.jsxs("div", { className: Wd, children: [
        /* @__PURE__ */ f.jsx("span", { className: ef, children: "Reference library" }),
        /* @__PURE__ */ f.jsx("div", { className: Oy, children: o.map((z) => /* @__PURE__ */ f.jsxs(
          "button",
          {
            type: "button",
            className: `${Ly}${s?.speakerVoiceAssetId === z.voiceAssetId ? ` ${Uy}` : ""}`,
            onClick: () => g(z.voiceAssetId),
            children: [
              /* @__PURE__ */ f.jsx("span", { className: ky, children: z.displayName }),
              /* @__PURE__ */ f.jsxs("span", { className: Vy, children: [
                z.durationMs != null ? By(z.durationMs) : "—",
                " ",
                "·",
                " ",
                z.sampleRate ? `${z.sampleRate} Hz` : "—"
              ] })
            ]
          },
          z.voiceAssetId
        )) })
      ] }),
      c.length > 0 && m && /* @__PURE__ */ f.jsxs("div", { className: Wd, children: [
        /* @__PURE__ */ f.jsx("span", { className: ef, children: "Preset voices" }),
        /* @__PURE__ */ f.jsx("div", { className: Oy, children: c.map((z) => /* @__PURE__ */ f.jsxs(
          "button",
          {
            type: "button",
            className: `${Ly}${s?.defaultVectorPresetId === z.presetId ? ` ${Uy}` : ""}`,
            onClick: () => m(z.presetId),
            children: [
              /* @__PURE__ */ f.jsx("span", { className: ky, children: z.presetName }),
              /* @__PURE__ */ f.jsx("span", { className: Vy, children: "preset · vector" })
            ]
          },
          z.presetId
        )) })
      ] }),
      C && v && /* @__PURE__ */ f.jsx("button", { type: "button", className: EN, onClick: v, children: "Clear mapping →" })
    ] })
  ] });
}
function By(n) {
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
    return /* @__PURE__ */ f.jsx("p", { className: wN, children: s ?? "Add at least one tagged dialogue line to populate the cast." });
  const o = n === 0;
  return /* @__PURE__ */ f.jsxs("div", { children: [
    /* @__PURE__ */ f.jsx("header", { className: bN, children: /* @__PURE__ */ f.jsx(
      "span",
      {
        className: `${xN} ${o ? nx : ax}`,
        children: o ? `All ${a} mapped` : `${n} of ${a} unmapped`
      }
    ) }),
    /* @__PURE__ */ f.jsx("ul", { className: SN, children: r })
  ] });
}
var CN = "_13ctegf0", Vr = "_13ctegf1", Br = "_13ctegf2", tf = "_13ctegf3", nf = "_13ctegf4", Io = "_13ctegf5";
function NN({
  runtimeId: n,
  device: a,
  sampleRateHz: r,
  lineCount: s,
  charCount: o,
  estimatedDurationS: c
}) {
  return /* @__PURE__ */ f.jsxs("div", { className: CN, role: "status", "aria-label": "Recipe deployment context", children: [
    /* @__PURE__ */ f.jsxs("span", { className: Vr, children: [
      /* @__PURE__ */ f.jsx("span", { className: Br, children: "Runtime" }),
      /* @__PURE__ */ f.jsx("span", { className: tf, children: n })
    ] }),
    a && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
      /* @__PURE__ */ f.jsx("span", { className: Io, "aria-hidden": "true" }),
      /* @__PURE__ */ f.jsxs("span", { className: Vr, children: [
        /* @__PURE__ */ f.jsx("span", { className: Br, children: "Device" }),
        /* @__PURE__ */ f.jsx("span", { className: tf, children: a })
      ] })
    ] }),
    typeof r == "number" && r > 0 && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
      /* @__PURE__ */ f.jsx("span", { className: Io, "aria-hidden": "true" }),
      /* @__PURE__ */ f.jsxs("span", { className: Vr, children: [
        /* @__PURE__ */ f.jsx("span", { className: Br, children: "Sample rate" }),
        /* @__PURE__ */ f.jsxs("span", { className: tf, children: [
          r,
          " Hz"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ f.jsx("span", { className: Io, "aria-hidden": "true" }),
    /* @__PURE__ */ f.jsxs("span", { className: Vr, children: [
      /* @__PURE__ */ f.jsx("span", { className: Br, children: "Lines" }),
      /* @__PURE__ */ f.jsx("span", { className: nf, children: s.toString().padStart(2, "0") })
    ] }),
    /* @__PURE__ */ f.jsxs("span", { className: Vr, children: [
      /* @__PURE__ */ f.jsx("span", { className: Br, children: "Chars" }),
      /* @__PURE__ */ f.jsx("span", { className: nf, children: o.toString().padStart(3, "0") })
    ] }),
    typeof c == "number" && c > 0 && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
      /* @__PURE__ */ f.jsx("span", { className: Io, "aria-hidden": "true" }),
      /* @__PURE__ */ f.jsxs("span", { className: Vr, children: [
        /* @__PURE__ */ f.jsx("span", { className: Br, children: "Est duration" }),
        /* @__PURE__ */ f.jsx("span", { className: nf, children: MN(c) })
      ] })
    ] })
  ] });
}
function MN(n) {
  if (!Number.isFinite(n) || n <= 0) return "—";
  const a = Math.floor(n / 60), r = Math.round(n % 60);
  return `${a}:${r.toString().padStart(2, "0")}`;
}
const RN = "huggingface/IndexTeam/IndexTTS-2";
async function AN(n) {
  const a = await fetch(`/api/v1/model-store/families/${encodeURIComponent(n)}/download`, {
    method: "POST",
    headers: { "content-type": "application/json" }
  });
  if (!a.ok)
    throw new Error(`Model download start failed: ${a.status}`);
  return await a.json();
}
async function _N() {
  return vt("/runtime/health");
}
async function DN() {
  await vt("/runtime/start", { method: "POST" });
}
async function zN() {
  return vt("/runtime/stop", { method: "POST" });
}
async function ON() {
  await vt("/runtime/restart", { method: "POST" });
}
function LN(n) {
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
var UN = "g5r6d10", kN = "g5r6d11", VN = "g5r6d12", BN = "g5r6d13", HN = "g5r6d14", qN = "g5r6d15", $N = "g5r6d1a", IN = "g5r6d1b", YN = "g5r6d1c", FN = "g5r6d1d", GN = "g5r6d1e", XN = "g5r6d1g", KN = "g5r6d1h", Hy = "g5r6d1i", QN = "g5r6d1j", ZN = "g5r6d1k", PN = "g5r6d1l", qy = "g5r6d1m", $y = "g5r6d1n", JN = "g5r6d1o", WN = "g5r6d1p", Rn = "g5r6d1q", mi = "g5r6d1r", Iy = "g5r6d1s", eM = "g5r6d1t", tM = "g5r6d1u", di = "g5r6d1v", nM = "g5r6d1w", aM = "g5r6d1x", iM = "g5r6d1y", rM = "g5r6d1z", lM = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function _n({
  severity: n,
  children: a,
  role: r,
  ariaLive: s,
  className: o,
  style: c
}) {
  const h = [lM[n], o].filter(Boolean).join(" "), p = r ?? (n === "error" ? "alert" : "status"), g = s ?? (n === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ f.jsx("div", { className: h, role: p, "aria-live": g, style: c, children: a });
}
var ix = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, rx = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, sM = "_13bb4njb";
function bi({
  tone: n,
  size: a = "sm",
  pulse: r = !1,
  children: s,
  className: o,
  style: c,
  title: h
}) {
  const p = r && n !== "faint", g = [ix[a], rx[n], p ? sM : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsx("span", { className: g, style: c, title: h, children: s });
}
const oM = 4e3;
function uM({ deployment: n }) {
  const a = Pr(), [r, s] = x.useState(null), [o, c] = x.useState(null), [h, p] = x.useState(!1);
  x.useEffect(() => {
    let _ = !1;
    const C = async () => {
      try {
        const O = await _N();
        _ || (s(O), c(null));
      } catch (O) {
        _ || c(Zl(O));
      }
    };
    C();
    const z = setInterval(C, oM);
    return () => {
      _ = !0, clearInterval(z);
    };
  }, []);
  const g = x.useCallback(async () => {
    p(!0), c(null);
    try {
      await DN();
    } catch (_) {
      c(Zl(_));
    } finally {
      p(!1);
    }
  }, []), m = x.useCallback(async () => {
    p(!0);
    try {
      await zN();
    } catch (_) {
      c(Zl(_));
    } finally {
      p(!1);
    }
  }, []), b = x.useCallback(async () => {
    p(!0);
    try {
      await ON();
    } catch (_) {
      c(Zl(_));
    } finally {
      p(!1);
    }
  }, []), v = x.useCallback(async () => {
    p(!0);
    try {
      await AN(RN);
    } catch (_) {
      c(Zl(_));
    } finally {
      p(!1);
    }
  }, []), S = r?.badge ?? "not_installed", w = S === "stopped" || S === "not_installed", j = S === "ready" || S === "running" || S === "starting", T = o?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ f.jsxs("output", { className: mi, "aria-live": "polite", children: [
    /* @__PURE__ */ f.jsx("span", { className: Rn, children: "Runtime" }),
    /* @__PURE__ */ f.jsx("span", { children: n.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ f.jsx("span", { className: Rn, children: "Badge" }),
    /* @__PURE__ */ f.jsx(bi, { tone: cM(S), pulse: S === "starting" || S === "installing", children: LN(S) }),
    r && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
      /* @__PURE__ */ f.jsx("span", { className: Rn, children: "Uptime" }),
      /* @__PURE__ */ f.jsx("span", { children: dM(r.uptimeSeconds) }),
      /* @__PURE__ */ f.jsx("span", { className: Rn, children: "VRAM" }),
      /* @__PURE__ */ f.jsxs("span", { children: [
        r.vramUsedMb,
        " / ",
        r.vramTotalMb,
        " MB"
      ] })
    ] }),
    w && /* @__PURE__ */ f.jsx(Ze, { disabled: h, onClick: g, children: "Install / Start runtime" }),
    j && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
      /* @__PURE__ */ f.jsx(Ze, { variant: "danger", disabled: h, onClick: m, children: "Stop backend" }),
      /* @__PURE__ */ f.jsx(Ze, { variant: "secondary", disabled: h, onClick: b, children: "Restart" })
    ] }),
    T && /* @__PURE__ */ f.jsx(Ze, { disabled: h, onClick: v, children: "Download IndexTTS-2 model" }),
    /* @__PURE__ */ f.jsx(
      Ze,
      {
        variant: "secondary",
        onClick: () => a(`/${n.deploymentId}/mappings`),
        title: "Manage character → voice mappings (upload voice samples, edit emotion defaults)",
        children: "Mappings"
      }
    ),
    o && !T && /* @__PURE__ */ f.jsx(_n, { severity: "error", children: o })
  ] });
}
function cM(n) {
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
function dM(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60);
  return a < 60 ? `${a}m ${n % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function Zl(n) {
  return n instanceof Jr || n instanceof Error ? n.message : "unknown error";
}
const fu = {
  flat: { low: 0, mid: 0, high: 0 },
  warm: { low: 3, mid: 0, high: -2 },
  bright: { low: -1, mid: 0, high: 4 },
  voice: { low: -2, mid: 3, high: 2 },
  telephone: { low: -8, mid: 6, high: -8 }
}, Mu = {
  volumeDb: 0,
  eq3: { low: 0, mid: 0, high: 0, preset: "flat" },
  speed: { mode: "audio", value: 1 },
  pitchSt: 0,
  normalize: { mode: "off", targetDbOrLufs: -16 },
  fade: { inS: 0, outS: 0, inCurve: "equal_power", outCurve: "equal_power" },
  silence: { enabled: !1, thresholdDb: -45 }
}, ka = 1e-3;
function fM(n, a, r) {
  for (const s of Object.keys(fu)) {
    const o = fu[s];
    if (Math.abs(o.low - n) < ka && Math.abs(o.mid - a) < ka && Math.abs(o.high - r) < ka)
      return s;
  }
  return "custom";
}
function hM(n) {
  let a = pM();
  for (const r of n.ops)
    a = mM(a, r);
  return a;
}
function mM(n, a) {
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
          preset: fM(a.low_db, a.mid_db, a.high_db)
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
function pM() {
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
    silence: { enabled: !1, thresholdDb: -45 }
  };
}
function Ei(n, a) {
  return n.ops.filter((r) => r.mode !== a);
}
function ji(n, a) {
  return [...n, a];
}
function gM(n, a) {
  const r = Ei(n, "gain");
  if (Math.abs(a) < ka) return { ...n, ops: r };
  const s = { id: vn(), mode: "gain", gain_db: a };
  return { ...n, ops: ji(r, s) };
}
function vM(n, a, r, s) {
  const o = Ei(n, "eq3");
  if (Math.abs(a) < ka && Math.abs(r) < ka && Math.abs(s) < ka)
    return { ...n, ops: o };
  const c = {
    id: vn(),
    mode: "eq3",
    low_db: a,
    mid_db: r,
    high_db: s
  };
  return { ...n, ops: ji(o, c) };
}
function yM(n, a) {
  const r = Ei(n, "speed");
  if (Math.abs(a - 1) < ka) return { ...n, ops: r };
  const s = { id: vn(), mode: "speed", factor: a };
  return { ...n, ops: ji(r, s) };
}
function bM(n, a) {
  const r = Ei(n, "pitch_shift");
  if (Math.abs(a) < ka) return { ...n, ops: r };
  const s = {
    id: vn(),
    mode: "pitch_shift",
    semitones: a
  };
  return { ...n, ops: ji(r, s) };
}
function xM(n, a, r) {
  const s = Ei(n, "normalize");
  if (a === "off") return { ...n, ops: s };
  const o = {
    id: vn(),
    mode: "normalize",
    target_lufs: r
  };
  return { ...n, ops: ji(s, o) };
}
function SM(n, a) {
  const r = Ei(n, "fade_in");
  if (a <= 0) return { ...n, ops: r };
  const s = {
    id: vn(),
    mode: "fade_in",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...n, ops: ji(r, s) };
}
function wM(n, a) {
  const r = Ei(n, "fade_out");
  if (a <= 0) return { ...n, ops: r };
  const s = {
    id: vn(),
    mode: "fade_out",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...n, ops: ji(r, s) };
}
function EM(n, a, r) {
  const s = Ei(n, "silence_strip");
  if (!a) return { ...n, ops: s };
  const o = {
    id: vn(),
    mode: "silence_strip",
    threshold_db: r
  };
  return { ...n, ops: ji(s, o) };
}
const lx = /* @__PURE__ */ new Set([
  "gain",
  "eq3",
  "speed",
  "pitch_shift",
  "normalize",
  "fade_in",
  "fade_out",
  "silence_strip"
]);
function sx(n, a) {
  const r = {
    ...n,
    ops: n.ops.filter((c) => !lx.has(c.mode))
  };
  let o = gM({ version: 1, ops: [] }, a.volumeDb);
  return o = vM(
    o,
    a.eq3.low,
    a.eq3.mid,
    a.eq3.high
  ), a.speed.mode === "audio" && (o = yM(o, a.speed.value)), o = bM(o, a.pitchSt), o = xM(
    o,
    a.normalize.mode === "off" ? "off" : "loudness",
    a.normalize.targetDbOrLufs
  ), o = SM(o, a.fade.inS), o = wM(o, a.fade.outS), o = EM(
    o,
    a.silence.enabled,
    a.silence.thresholdDb
  ), { ...r, ops: [...r.ops, ...o.ops] };
}
function ox(n) {
  const a = {
    ...n,
    ops: n.ops.filter((r) => lx.has(r.mode))
  };
  return hM(a);
}
var jM = "_1rsa80i0", TM = "_1rsa80i1", CM = "_1rsa80i2", NM = "_1rsa80i3", MM = "_1rsa80i4", RM = "_1rsa80i5", AM = "_1rsa80i6", _M = "_1rsa80i7", DM = "_1rsa80i8", zM = "_1rsa80i9";
const ux = ["flat", "warm", "bright", "voice", "telephone"], Pl = -12, Yo = 12, OM = 0.5;
function LM(n) {
  const { low: a, mid: r, high: s, preset: o, onChange: c, disabled: h } = n, p = (m) => {
    const b = fu[m];
    c(b.low, b.mid, b.high, m);
  }, g = (m, b) => {
    const v = { low: a, mid: r, high: s, [m]: b }, S = kM(v.low, v.mid, v.high);
    c(v.low, v.mid, v.high, S);
  };
  return /* @__PURE__ */ f.jsxs("div", { className: jM, children: [
    /* @__PURE__ */ f.jsxs("div", { className: TM, role: "group", "aria-label": "EQ presets", children: [
      ux.map((m) => /* @__PURE__ */ f.jsx(
        "button",
        {
          type: "button",
          className: CM,
          "data-active": o === m,
          onClick: () => p(m),
          disabled: h,
          children: m
        },
        m
      )),
      o === "custom" ? /* @__PURE__ */ f.jsx("span", { className: NM, children: "custom" }) : null
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: MM, children: [
      /* @__PURE__ */ f.jsx(
        af,
        {
          label: "Low",
          value: a,
          onChange: (m) => g("low", m),
          disabled: h
        }
      ),
      /* @__PURE__ */ f.jsx(
        af,
        {
          label: "Mid",
          value: r,
          onChange: (m) => g("mid", m),
          disabled: h
        }
      ),
      /* @__PURE__ */ f.jsx(
        af,
        {
          label: "High",
          value: s,
          onChange: (m) => g("high", m),
          disabled: h
        }
      )
    ] })
  ] });
}
function af({ label: n, value: a, onChange: r, disabled: s }) {
  const o = (a - Pl) / (Yo - Pl) * 100, c = x.useId();
  return /* @__PURE__ */ f.jsxs("div", { className: RM, children: [
    /* @__PURE__ */ f.jsx("label", { htmlFor: c, className: AM, children: n }),
    /* @__PURE__ */ f.jsx(
      "input",
      {
        id: c,
        type: "range",
        min: Pl,
        max: Yo,
        step: OM,
        value: a,
        disabled: s,
        className: DM,
        style: { "--fill": `${o}%` },
        onChange: (h) => r(Number(h.target.value)),
        "aria-valuemin": Pl,
        "aria-valuemax": Yo,
        "aria-valuenow": a
      }
    ),
    /* @__PURE__ */ f.jsx("span", { className: _M, children: UM(a) }),
    /* @__PURE__ */ f.jsxs("span", { className: zM, "aria-hidden": "true", children: [
      /* @__PURE__ */ f.jsx("span", { children: Pl }),
      /* @__PURE__ */ f.jsx("span", { children: "0" }),
      /* @__PURE__ */ f.jsxs("span", { children: [
        "+",
        Yo
      ] })
    ] })
  ] });
}
function UM(n) {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} dB`;
}
const rf = 1e-3;
function kM(n, a, r) {
  for (const s of ux) {
    const o = fu[s];
    if (Math.abs(o.low - n) < rf && Math.abs(o.mid - a) < rf && Math.abs(o.high - r) < rf)
      return s;
  }
  return "custom";
}
var VM = "_85bhwb0", BM = "_85bhwb1", Yy = "_85bhwb2", HM = "_85bhwb3", qM = "_85bhwb4", $M = "_85bhwb5", IM = "_85bhwb6", YM = "_85bhwb7";
const Fo = 0.5, lf = 2, FM = 0.05;
function GM(n) {
  const { mode: a, value: r, supportsSynthSpeed: s, onChange: o, onReRenderAtSynthTime: c, disabled: h } = n, p = (r - Fo) / (lf - Fo) * 100, g = x.useId(), m = (v) => o(v, r), b = (v) => o(a, v);
  return /* @__PURE__ */ f.jsxs("div", { className: VM, children: [
    s ? /* @__PURE__ */ f.jsxs("div", { className: BM, role: "group", "aria-label": "Speed mode", children: [
      /* @__PURE__ */ f.jsx(
        "button",
        {
          type: "button",
          className: Yy,
          "data-active": a === "audio",
          onClick: () => m("audio"),
          disabled: h,
          children: "Audio"
        }
      ),
      /* @__PURE__ */ f.jsx(
        "button",
        {
          type: "button",
          className: Yy,
          "data-active": a === "synth",
          onClick: () => m("synth"),
          disabled: h,
          children: "Synth"
        }
      )
    ] }) : null,
    /* @__PURE__ */ f.jsxs("div", { className: HM, children: [
      /* @__PURE__ */ f.jsx(
        "input",
        {
          id: g,
          type: "range",
          min: Fo,
          max: lf,
          step: FM,
          value: r,
          disabled: h,
          className: qM,
          style: { "--fill": `${p}%` },
          onChange: (v) => b(Number(v.target.value)),
          "aria-valuemin": Fo,
          "aria-valuemax": lf,
          "aria-valuenow": r,
          "aria-label": "Speed factor"
        }
      ),
      /* @__PURE__ */ f.jsx("span", { className: $M, children: `${r.toFixed(2)}×` })
    ] }),
    a === "synth" && s ? /* @__PURE__ */ f.jsxs("div", { className: IM, children: [
      /* @__PURE__ */ f.jsx(
        Ze,
        {
          variant: "primary",
          size: "sm",
          onClick: c,
          disabled: h || !c,
          children: "Re-render at synth-time"
        }
      ),
      /* @__PURE__ */ f.jsx("span", { className: YM, children: "Synth-time speed re-runs the worker for new utterances." })
    ] }) : null
  ] });
}
var XM = "kgszk50", KM = "kgszk51", Fy = "kgszk52", QM = "kgszk53", ZM = "kgszk54", cx = "kgszk55", PM = "kgszk56", JM = "kgszk58", xh = "kgszk59", dx = "kgszk5a", Sh = "kgszk5b", WM = "kgszk5c", eR = "kgszk5d", tR = "kgszk5e", Gy = "kgszk5f", Xy = "kgszk5g", Ky = "kgszk5h", nR = "kgszk5i", aR = "kgszk5j", iR = "kgszk5l", ds = "kgszk5m", fs = "kgszk5n";
const rR = -24, lR = 24, sR = 0.5, oR = -12, uR = 12, cR = 0.5, dR = -30, fR = -6, hR = -12, mR = 0, Go = -60, sf = -20;
function wh(n) {
  const {
    state: a,
    onChange: r,
    supportsSynthSpeed: s,
    onReRenderAtSynthTime: o,
    onSliderFlush: c,
    pendingExecution: h = !1,
    disabled: p = !1,
    onApply: g,
    applyLabel: m = "Apply edit"
  } = n, b = (w) => {
    r({ ...a, ...w });
  }, v = yR(a), S = (w) => {
    const j = w.target;
    j && (j.tagName === "INPUT" || j.tagName === "BUTTON" || j.closest("input, button")) && c?.();
  };
  return /* @__PURE__ */ f.jsxs("div", { className: XM, onPointerDownCapture: S, children: [
    /* @__PURE__ */ f.jsxs("div", { className: KM, children: [
      v.length === 0 ? /* @__PURE__ */ f.jsx("span", { className: QM, children: "No active edits" }) : /* @__PURE__ */ f.jsxs("span", { className: Fy, children: [
        /* @__PURE__ */ f.jsx("span", { "aria-hidden": "true", children: "Active:" }),
        /* @__PURE__ */ f.jsx("span", { children: v.join(" · ") })
      ] }),
      h ? /* @__PURE__ */ f.jsxs("span", { className: Fy, "aria-live": "polite", children: [
        /* @__PURE__ */ f.jsx("span", { className: ZM, "aria-hidden": "true" }),
        "Re-rendering"
      ] }) : null
    ] }),
    /* @__PURE__ */ f.jsx(
      Qy,
      {
        label: "Volume",
        sub: "Pre-mix gain in dB",
        min: rR,
        max: lR,
        step: sR,
        format: bR,
        value: a.volumeDb,
        onChange: (w) => b({ volumeDb: w }),
        disabled: p
      }
    ),
    /* @__PURE__ */ f.jsxs("div", { className: ds, children: [
      /* @__PURE__ */ f.jsx("span", { className: fs, children: "3-band EQ" }),
      /* @__PURE__ */ f.jsx(
        LM,
        {
          low: a.eq3.low,
          mid: a.eq3.mid,
          high: a.eq3.high,
          preset: a.eq3.preset,
          disabled: p,
          onChange: (w, j, T, _) => b({ eq3: { low: w, mid: j, high: T, preset: _ } })
        }
      )
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: ds, children: [
      /* @__PURE__ */ f.jsx("span", { className: fs, children: "Speed" }),
      /* @__PURE__ */ f.jsx(
        GM,
        {
          mode: a.speed.mode,
          value: a.speed.value,
          supportsSynthSpeed: s,
          ...o ? { onReRenderAtSynthTime: o } : {},
          disabled: p,
          onChange: (w, j) => b({ speed: { mode: w, value: j } })
        }
      )
    ] }),
    /* @__PURE__ */ f.jsx(
      Qy,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: oR,
        max: uR,
        step: cR,
        format: xR,
        value: a.pitchSt,
        onChange: (w) => b({ pitchSt: w }),
        disabled: p
      }
    ),
    /* @__PURE__ */ f.jsx(
      pR,
      {
        normalize: a.normalize,
        disabled: p,
        onChange: (w) => b({ normalize: w })
      }
    ),
    /* @__PURE__ */ f.jsx(
      gR,
      {
        inS: a.fade.inS,
        outS: a.fade.outS,
        disabled: p,
        onChange: (w, j) => b({ fade: { ...a.fade, inS: w, outS: j } })
      }
    ),
    /* @__PURE__ */ f.jsx(
      vR,
      {
        enabled: a.silence.enabled,
        thresholdDb: a.silence.thresholdDb,
        disabled: p,
        onChange: (w, j) => b({ silence: { enabled: w, thresholdDb: j } })
      }
    ),
    g ? /* @__PURE__ */ f.jsxs("div", { className: iR, children: [
      /* @__PURE__ */ f.jsx(
        Ze,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => r(Mu),
          disabled: p,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ f.jsx(Ze, { variant: "primary", size: "md", onClick: g, disabled: p, children: m })
    ] }) : null
  ] });
}
function Qy(n) {
  const { label: a, sub: r, min: s, max: o, step: c, format: h, value: p, onChange: g, disabled: m } = n, b = (p - s) / (o - s) * 100, v = x.useId();
  return /* @__PURE__ */ f.jsxs("div", { className: cx, children: [
    /* @__PURE__ */ f.jsxs("div", { className: PM, children: [
      /* @__PURE__ */ f.jsx("label", { htmlFor: v, className: JM, children: a }),
      /* @__PURE__ */ f.jsx("span", { className: dx, children: r })
    ] }),
    /* @__PURE__ */ f.jsx(
      "input",
      {
        id: v,
        type: "range",
        min: s,
        max: o,
        step: c,
        value: p,
        disabled: m,
        className: Sh,
        style: { "--fill": `${b}%` },
        onChange: (S) => g(Number(S.target.value)),
        "aria-valuemin": s,
        "aria-valuemax": o,
        "aria-valuenow": p
      }
    ),
    /* @__PURE__ */ f.jsx("span", { className: xh, children: h(p) })
  ] });
}
function pR({ normalize: n, onChange: a, disabled: r }) {
  const o = n.mode === "loudness" ? { min: dR, max: fR, step: 0.5, suffix: "LUFS" } : { min: hR, max: mR, step: 0.5, suffix: "dB" }, c = SR(n.targetDbOrLufs, o.min, o.max), h = (c - o.min) / (o.max - o.min) * 100, p = (g) => {
    if (g === "off") {
      a({ mode: g, targetDbOrLufs: n.targetDbOrLufs });
      return;
    }
    if (g === "peak") {
      a({ mode: g, targetDbOrLufs: -1 });
      return;
    }
    a({ mode: g, targetDbOrLufs: -16 });
  };
  return /* @__PURE__ */ f.jsxs("div", { className: ds, children: [
    /* @__PURE__ */ f.jsx("span", { className: fs, children: "Normalize" }),
    /* @__PURE__ */ f.jsx("div", { className: WM, role: "group", "aria-label": "Normalize mode", children: ["off", "peak", "loudness"].map((g) => {
      const m = g === "peak";
      return /* @__PURE__ */ f.jsxs(
        "button",
        {
          type: "button",
          className: eR,
          "data-active": n.mode === g,
          disabled: r || m,
          onClick: () => p(g),
          title: m ? "Peak normalize is not yet supported by the worker. Use Loudness (LUFS) instead." : void 0,
          children: [
            g,
            m ? " (soon)" : ""
          ]
        },
        g
      );
    }) }),
    n.mode !== "off" ? /* @__PURE__ */ f.jsxs("div", { className: cx, children: [
      /* @__PURE__ */ f.jsx("span", { className: dx, children: "Target" }),
      /* @__PURE__ */ f.jsx(
        "input",
        {
          type: "range",
          min: o.min,
          max: o.max,
          step: o.step,
          value: c,
          disabled: r,
          className: Sh,
          style: { "--fill": `${h}%` },
          onChange: (g) => a({ mode: n.mode, targetDbOrLufs: Number(g.target.value) }),
          "aria-valuemin": o.min,
          "aria-valuemax": o.max,
          "aria-valuenow": c,
          "aria-label": `Normalize target ${o.suffix}`
        }
      ),
      /* @__PURE__ */ f.jsxs("span", { className: xh, children: [
        c.toFixed(1),
        " ",
        o.suffix
      ] })
    ] }) : null
  ] });
}
function gR({ inS: n, outS: a, onChange: r, disabled: s }) {
  const o = x.useId(), c = x.useId();
  return /* @__PURE__ */ f.jsxs("div", { className: ds, children: [
    /* @__PURE__ */ f.jsx("span", { className: fs, children: "Fade" }),
    /* @__PURE__ */ f.jsxs("div", { className: tR, children: [
      /* @__PURE__ */ f.jsxs("div", { className: Gy, children: [
        /* @__PURE__ */ f.jsx("label", { className: Xy, htmlFor: o, children: "Fade in (s)" }),
        /* @__PURE__ */ f.jsx(
          "input",
          {
            id: o,
            type: "number",
            min: 0,
            step: 0.05,
            value: n,
            disabled: s,
            className: Ky,
            onChange: (h) => r(Math.max(0, Number(h.target.value)), a)
          }
        )
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: Gy, children: [
        /* @__PURE__ */ f.jsx("label", { className: Xy, htmlFor: c, children: "Fade out (s)" }),
        /* @__PURE__ */ f.jsx(
          "input",
          {
            id: c,
            type: "number",
            min: 0,
            step: 0.05,
            value: a,
            disabled: s,
            className: Ky,
            onChange: (h) => r(n, Math.max(0, Number(h.target.value)))
          }
        )
      ] })
    ] })
  ] });
}
function vR({ enabled: n, thresholdDb: a, onChange: r, disabled: s }) {
  const o = (a - Go) / (sf - Go) * 100;
  return /* @__PURE__ */ f.jsxs("div", { className: ds, children: [
    /* @__PURE__ */ f.jsx("span", { className: fs, children: "Silence trim" }),
    /* @__PURE__ */ f.jsxs("div", { className: nR, children: [
      /* @__PURE__ */ f.jsxs("label", { className: aR, children: [
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
          min: Go,
          max: sf,
          step: 1,
          value: a,
          disabled: s || !n,
          className: Sh,
          style: { "--fill": `${o}%`, flex: 1 },
          onChange: (c) => r(n, Number(c.target.value)),
          "aria-valuemin": Go,
          "aria-valuemax": sf,
          "aria-valuenow": a,
          "aria-label": "Silence threshold dB"
        }
      ),
      /* @__PURE__ */ f.jsxs("span", { className: xh, children: [
        a.toFixed(0),
        " dB"
      ] })
    ] })
  ] });
}
const Hr = 1e-3;
function yR(n) {
  const a = [];
  return Math.abs(n.volumeDb) >= Hr && a.push("gain"), (Math.abs(n.eq3.low) >= Hr || Math.abs(n.eq3.mid) >= Hr || Math.abs(n.eq3.high) >= Hr) && a.push("eq3"), n.speed.mode === "audio" && Math.abs(n.speed.value - 1) >= Hr && a.push("speed"), Math.abs(n.pitchSt) >= Hr && a.push("pitch"), n.normalize.mode !== "off" && a.push("normalize"), n.fade.inS > 0 && a.push("fade-in"), n.fade.outS > 0 && a.push("fade-out"), n.silence.enabled && a.push("silence"), a;
}
function bR(n) {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} dB`;
}
function xR(n) {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} st`;
}
function SR(n, a, r) {
  return Number.isFinite(n) ? Math.max(a, Math.min(r, n)) : a;
}
var wR = "skdk4g1", ER = "skdk4g3", jR = "skdk4g4", TR = "skdk4g5", Zy = "skdk4g6", Py = "skdk4g7", CR = "skdk4g8", Jy = "skdk4g9", Wy = "skdk4ga", NR = "skdk4gb", e0 = "skdk4gc", MR = "skdk4gd", t0 = "skdk4ge", RR = "cgsfgh0", AR = "cgsfgh1", _R = "cgsfgh2", DR = "cgsfgh3", zR = "cgsfgh4", OR = "cgsfgh5", LR = "cgsfgh6", UR = "cgsfgh7", kR = "cgsfgh8", VR = "cgsfgh9", BR = "cgsfgha", HR = "cgsfghb", qR = "cgsfghc", $R = "cgsfghd", IR = "cgsfghe", YR = "cgsfghf", FR = "cgsfghg", GR = "cgsfghh", XR = "cgsfghi", KR = "cgsfghj", QR = "cgsfghk";
const ln = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], ns = {
  happy: "Happy",
  angry: "Angry",
  sad: "Sad",
  afraid: "Afraid",
  disgusted: "Disgusted",
  melancholic: "Melancholic",
  surprised: "Surprised",
  calm: "Calm"
}, hs = {
  happy: 0,
  angry: 0,
  sad: 0,
  afraid: 0,
  disgusted: 0,
  melancholic: 0,
  surprised: 0,
  calm: 0
}, fx = 0.05;
function ZR(n) {
  let a = null, r = -1 / 0;
  for (const s of ln) {
    const o = n[s];
    o > r && (r = o, a = s);
  }
  return !a || r <= fx ? null : a;
}
function hx(n, a = 3) {
  return ln.map((r) => ({ key: r, label: ns[r], value: n[r] })).filter((r) => r.value > fx).sort((r, s) => s.value - r.value).slice(0, a);
}
function PR(n) {
  let a = 0;
  for (const r of ln) a += n[r] * n[r];
  return Math.sqrt(a);
}
function n0(n) {
  const a = hx(n, 2), r = a[0];
  if (!r) return "";
  const s = a[1];
  return !s || r.value - s.value > 0.25 ? of(r.label) : `${of(r.label)} + ${s.label.toLowerCase()}`;
}
function of(n) {
  if (!n) return n;
  const a = n[0];
  return a ? a.toUpperCase() + n.slice(1) : n;
}
function ms(n) {
  const a = { ...hs };
  for (const r of ln) {
    const s = n[r];
    a[r] = Number.isFinite(s) ? Math.max(0, Math.min(1, s)) : 0;
  }
  return a;
}
const a0 = 0.05, i0 = 0.2;
function JR(n) {
  const { vec: a, onChange: r, size: s, reduceMotion: o = !1 } = n, [c, h] = x.useState(a), [p, g] = x.useState(null), m = x.useRef(null), b = x.useRef(a), v = x.useRef(o);
  v.current = o, x.useEffect(() => {
    h(a), b.current = a;
  }, [a]);
  const S = x.useCallback(
    (z) => {
      const O = ms(z);
      h(O), b.current = O, r(O);
    },
    [r]
  ), w = x.useCallback((z) => {
    const O = ms(z);
    h(O), b.current = O;
  }, []), j = x.useCallback(
    (z) => {
      const O = m.current;
      if (!O || v.current) return;
      const R = z.clientX - O.centerX, X = z.clientY - O.centerY, $ = Math.sqrt(R * R + X * X), Q = s / 2, M = Math.max(0, Math.min(1, $ / Q)), B = { ...b.current, [O.axis]: M };
      w(B);
    },
    [s, w]
  ), T = x.useCallback(
    (z) => {
      const O = m.current;
      if (O) {
        if (window.removeEventListener("pointermove", j), window.removeEventListener("pointerup", T), window.removeEventListener("pointercancel", T), v.current) {
          const R = z.clientX - O.centerX, X = z.clientY - O.centerY, $ = Math.sqrt(R * R + X * X), Q = s / 2, M = Math.max(0, Math.min(1, $ / Q)), B = { ...b.current, [O.axis]: M };
          m.current = null, S(B);
          return;
        }
        m.current = null, S(b.current);
      }
    },
    [S, j, s]
  );
  x.useEffect(() => () => {
    window.removeEventListener("pointermove", j), window.removeEventListener("pointerup", T), window.removeEventListener("pointercancel", T), m.current = null;
  }, [j, T]);
  const _ = x.useCallback(
    (z, O) => {
      O.preventDefault();
      const R = O.currentTarget, $ = (R.ownerSVGElement ?? R).getBoundingClientRect(), Q = $.left + $.width / 2, M = $.top + $.height / 2, J = ln.indexOf(z) / ln.length * Math.PI * 2 - Math.PI / 2;
      m.current = {
        axis: z,
        pointerId: O.pointerId,
        centerX: Q,
        centerY: M,
        angle: J
      }, g(z), window.addEventListener("pointermove", j), window.addEventListener("pointerup", T), window.addEventListener("pointercancel", T);
    },
    [j, T]
  ), C = x.useCallback(
    (z, O) => {
      const R = b.current[z];
      let X = R;
      switch (O.key) {
        case "ArrowUp":
        case "ArrowRight":
          X = R + a0;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          X = R - a0;
          break;
        case "PageUp":
          X = R + i0;
          break;
        case "PageDown":
          X = R - i0;
          break;
        case "Home":
          X = 0;
          break;
        case "End":
          X = 1;
          break;
        default:
          return;
      }
      O.preventDefault(), g(z), S({ ...b.current, [z]: X });
    },
    [S]
  );
  return {
    liveVec: c,
    activeAxis: p,
    setActiveAxis: g,
    onPointerDown: _,
    onKeyDown: C
  };
}
const WR = [0.25, 0.5, 0.75, 1];
function eA({
  vec: n,
  onChange: a,
  size: r = 360,
  readOnly: s = !1,
  reduceMotion: o = !1
}) {
  const c = JR({ vec: n, onChange: a, size: r, reduceMotion: o }), h = r / 2, p = r / 2, g = r / 2 * 0.78, m = x.useMemo(() => tA(h, p, g), [h, p, g]), b = x.useMemo(() => ln.map((w, j) => {
    const T = lu(c.liveVec[w]), _ = m[j];
    return _ ? `${h + _.dx * T},${p + _.dy * T}` : "0,0";
  }).join(" "), [m, h, p, c.liveVec]), v = ZR(c.liveVec), S = PR(c.liveVec);
  return /* @__PURE__ */ f.jsxs("div", { className: RR, children: [
    /* @__PURE__ */ f.jsx("div", { className: AR, style: { width: r, height: r }, children: /* @__PURE__ */ f.jsxs(
      "svg",
      {
        className: _R,
        viewBox: `0 0 ${r} ${r}`,
        role: "img",
        "aria-label": "8-axis emotion radar",
        children: [
          WR.map((w) => /* @__PURE__ */ f.jsx(
            "circle",
            {
              className: DR,
              cx: h,
              cy: p,
              r: g * w
            },
            w
          )),
          ln.map((w, j) => {
            const T = m[j];
            if (!T) return null;
            const _ = h + T.dx * 1.18, C = p + T.dy * 1.18, z = c.activeAxis === w;
            return /* @__PURE__ */ f.jsxs("g", { children: [
              /* @__PURE__ */ f.jsx(
                "line",
                {
                  className: zR,
                  x1: h,
                  y1: p,
                  x2: h + T.dx,
                  y2: p + T.dy
                }
              ),
              /* @__PURE__ */ f.jsx(
                "text",
                {
                  className: `${kR}${z ? ` ${VR}` : ""}`,
                  x: _,
                  y: C,
                  textAnchor: "middle",
                  dominantBaseline: "middle",
                  children: ns[w]
                }
              )
            ] }, w);
          }),
          /* @__PURE__ */ f.jsx("polygon", { className: OR, points: b }),
          !s && ln.map((w, j) => {
            const T = lu(c.liveVec[w]), _ = m[j];
            if (!_) return null;
            const C = h + _.dx * T, z = p + _.dy * T, O = c.activeAxis === w;
            return /* @__PURE__ */ f.jsx(
              "circle",
              {
                className: `${LR}${O ? ` ${UR}` : ""}`,
                cx: C,
                cy: z,
                r: 6,
                tabIndex: 0,
                role: "slider",
                "aria-label": `${ns[w]} axis`,
                "aria-valuemin": 0,
                "aria-valuemax": 1,
                "aria-valuenow": T,
                onPointerDown: (R) => c.onPointerDown(w, R),
                onKeyDown: (R) => c.onKeyDown(w, R),
                onFocus: () => c.setActiveAxis(w),
                onBlur: () => c.setActiveAxis(null)
              },
              w
            );
          })
        ]
      }
    ) }),
    /* @__PURE__ */ f.jsxs("div", { className: BR, children: [
      /* @__PURE__ */ f.jsx("span", { className: HR, children: v ? ns[v].toLowerCase() : "neutral" }),
      /* @__PURE__ */ f.jsxs("span", { className: qR, children: [
        "‖v‖ = ",
        S.toFixed(2)
      ] })
    ] }),
    /* @__PURE__ */ f.jsx("div", { className: $R, role: "group", "aria-label": "Axis values", children: ln.map((w) => {
      const j = lu(c.liveVec[w]), T = c.activeAxis === w;
      return /* @__PURE__ */ f.jsxs(
        "button",
        {
          type: "button",
          className: `${IR}${T ? ` ${YR}` : ""}`,
          onClick: () => a({
            ...c.liveVec,
            [w]: j > 0.05 ? 0 : 0.5
          }),
          "aria-pressed": j > 0.05,
          children: [
            ns[w].toLowerCase(),
            /* @__PURE__ */ f.jsx("span", { className: FR, children: j.toFixed(2) })
          ]
        },
        w
      );
    }) })
  ] });
}
function tA(n, a, r) {
  return ln.map((s, o) => {
    const c = o / ln.length * Math.PI * 2 - Math.PI / 2;
    return {
      dx: Math.cos(c) * r,
      dy: Math.sin(c) * r
    };
  });
}
function lu(n) {
  return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 0;
}
function nA({ vec: n, size: a = 36 }) {
  const r = a / 2, s = a / 2, o = a / 2 * 0.86, c = x.useMemo(() => ln.map((h, p) => {
    const g = lu(n[h]), m = p / ln.length * Math.PI * 2 - Math.PI / 2, b = r + Math.cos(m) * o * g, v = s + Math.sin(m) * o * g;
    return `${b},${v}`;
  }).join(" "), [r, s, o, n]);
  return /* @__PURE__ */ f.jsx("span", { className: GR, "aria-hidden": "true", children: /* @__PURE__ */ f.jsxs(
    "svg",
    {
      className: XR,
      width: a,
      height: a,
      viewBox: `0 0 ${a} ${a}`,
      children: [
        /* @__PURE__ */ f.jsx("circle", { className: KR, cx: r, cy: s, r: o }),
        /* @__PURE__ */ f.jsx("polygon", { className: QR, points: c })
      ]
    }
  ) });
}
var Lf = "gvwvwg0", aA = "gvwvwg1", mx = "gvwvwg2", px = "gvwvwg3", iA = "gvwvwg4", rA = "gvwvwg5", lA = "gvwvwg6", sA = "gvwvwg7", oA = "gvwvwg8", uA = "gvwvwg9", cA = "gvwvwga", dA = "gvwvwgb", fA = "gvwvwgc", hA = "gvwvwgd", mA = "gvwvwge";
function pA({
  vec: n,
  onSave: a,
  saving: r = !1
}) {
  const [s, o] = x.useState(n0(n)), [c, h] = x.useState(!1), p = hx(n, 3);
  x.useEffect(() => {
    c || o(n0(n));
  }, [n, c]);
  const g = s.trim().length > 0;
  return /* @__PURE__ */ f.jsxs("div", { className: Lf, children: [
    /* @__PURE__ */ f.jsx("header", { className: aA, children: /* @__PURE__ */ f.jsx("span", { className: mx, children: "Save current vector as preset" }) }),
    /* @__PURE__ */ f.jsx("div", { className: px, children: p.length === 0 ? /* @__PURE__ */ f.jsx("span", { children: "(neutral — drag the radar to set a vector first)" }) : p.map((m) => /* @__PURE__ */ f.jsxs("span", { className: iA, children: [
      m.label.toLowerCase(),
      /* @__PURE__ */ f.jsx("span", { className: rA, children: m.value.toFixed(2) })
    ] }, m.key)) }),
    /* @__PURE__ */ f.jsxs("div", { className: lA, children: [
      /* @__PURE__ */ f.jsx(
        "input",
        {
          className: sA,
          type: "text",
          placeholder: "Preset name",
          value: s,
          onChange: (m) => {
            o(m.target.value), h(!0);
          }
        }
      ),
      /* @__PURE__ */ f.jsx(
        Ze,
        {
          variant: "primary",
          disabled: !g || r,
          onClick: () => {
            a(s.trim()), h(!1);
          },
          children: r ? "Saving…" : "Save preset"
        }
      )
    ] })
  ] });
}
function gA({
  presets: n,
  activePresetId: a,
  onSelect: r,
  onDelete: s
}) {
  return n.length === 0 ? /* @__PURE__ */ f.jsxs("div", { className: Lf, children: [
    /* @__PURE__ */ f.jsx("span", { className: mx, children: "Preset library" }),
    /* @__PURE__ */ f.jsx("span", { className: px, children: "No presets yet. Save your current vector to build the library." })
  ] }) : /* @__PURE__ */ f.jsxs("div", { className: Lf, children: [
    /* @__PURE__ */ f.jsx("span", { className: mA, children: "Preset library" }),
    /* @__PURE__ */ f.jsx("div", { className: oA, children: n.map((o) => {
      const c = vA(o), h = o.presetId === a;
      return /* @__PURE__ */ f.jsxs(
        "div",
        {
          className: `${uA}${h ? ` ${dA}` : ""}`,
          children: [
            /* @__PURE__ */ f.jsxs(
              "button",
              {
                type: "button",
                className: cA,
                onClick: () => r(o),
                "aria-pressed": h,
                children: [
                  /* @__PURE__ */ f.jsx(nA, { vec: c, size: 28 }),
                  /* @__PURE__ */ f.jsx("span", { className: fA, children: o.presetName })
                ]
              }
            ),
            s && /* @__PURE__ */ f.jsx(
              "button",
              {
                type: "button",
                className: hA,
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
const Uf = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function vA(n) {
  const a = Uf.reduce(
    (s, o) => ({ ...s, [o]: 0 }),
    {}
  );
  if (!Array.isArray(n.vector)) return a;
  const r = Uf.reduce(
    (s, o, c) => ({ ...s, [o]: n.vector[c] ?? 0 }),
    a
  );
  return ms(r);
}
function uf(n) {
  return Uf.map((a) => n[a] ?? 0);
}
const yA = [
  {
    axis: "happy",
    weight: 0.8,
    keywords: [
      "happy",
      "joyful",
      "cheerful",
      "upbeat",
      "smiling",
      "giggle",
      "delighted",
      "thrilled",
      "warm",
      "friendly",
      "sunny",
      "glad"
    ]
  },
  {
    axis: "angry",
    weight: 0.8,
    keywords: [
      "angry",
      "furious",
      "rage",
      "irritated",
      "pissed",
      "annoyed",
      "snarl",
      "hostile",
      "aggressive",
      "snap",
      "scold"
    ]
  },
  {
    axis: "sad",
    weight: 0.8,
    keywords: [
      "sad",
      "tearful",
      "sorrow",
      "grief",
      "mourning",
      "weep",
      "crying",
      "hurt",
      "broken",
      "down",
      "depressed"
    ]
  },
  {
    axis: "afraid",
    weight: 0.8,
    keywords: [
      "afraid",
      "fearful",
      "scared",
      "terrified",
      "panic",
      "anxious",
      "worried",
      "nervous",
      "shaky",
      "trembling",
      "frightened"
    ]
  },
  {
    axis: "disgusted",
    weight: 0.7,
    keywords: [
      "disgusted",
      "repulsed",
      "sick",
      "revolted",
      "grossed",
      "appalled",
      "loathing",
      "contempt",
      "sneer"
    ]
  },
  {
    axis: "melancholic",
    weight: 0.7,
    keywords: [
      "melancholic",
      "wistful",
      "bittersweet",
      "yearning",
      "longing",
      "pensive",
      "nostalgic",
      "dreamy",
      "hazy",
      "soft sad"
    ]
  },
  {
    axis: "surprised",
    weight: 0.7,
    keywords: [
      "surprised",
      "shocked",
      "astonished",
      "stunned",
      "amazed",
      "bewildered",
      "wonder",
      "wow",
      "gasp",
      "startled"
    ]
  },
  {
    axis: "calm",
    weight: 0.7,
    keywords: [
      "calm",
      "relaxed",
      "serene",
      "peaceful",
      "neutral",
      "steady",
      "even",
      "measured",
      "quiet",
      "composed",
      "settled"
    ]
  }
], bA = [
  "very",
  "extremely",
  "deeply",
  "intensely",
  "absolutely",
  "totally",
  "really",
  "so"
], xA = [
  "slightly",
  "a bit",
  "a little",
  "kinda",
  "kind of",
  "somewhat",
  "barely"
], SA = ["not", "no", "never", "without", "lack", "lacking", "free of"];
function wA(n) {
  const a = n.toLowerCase().trim();
  if (!a) return { ...hs };
  const s = a.split(/\s+/).some((h) => bA.includes(h)) ? 1.2 : 1, o = xA.some((h) => a.includes(h)) ? 0.55 : 1, c = { ...hs };
  for (const h of yA) {
    let p = 0;
    for (const g of h.keywords) {
      const m = g.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"), v = new RegExp(`\\b${m}\\b`).exec(a);
      if (!v) continue;
      const S = v.index, w = a.slice(0, S), j = Math.max(
        w.lastIndexOf(","),
        w.lastIndexOf(";"),
        w.lastIndexOf(" but "),
        w.lastIndexOf(" yet ")
      ), _ = w.slice(j >= 0 ? j : 0).slice(-30);
      SA.some((C) => new RegExp(`\\b${C}\\b`).test(_)) || (p += 1);
    }
    if (p > 0) {
      const g = h.weight * Math.min(1, 0.55 + 0.2 * (p - 1)) * s * o;
      c[h.axis] = Math.min(1, g);
    }
  }
  return ln.every((h) => c[h] === 0) && (c.calm = 0.4), ms(c);
}
const EA = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
];
function jA({
  value: n,
  onChange: a,
  deploymentId: r
}) {
  const s = n.mode ?? "none", o = x.useMemo(() => TA(n.vector), [n.vector]), c = n.emotionAlpha ?? 1, [h, p] = x.useState([]), [g, m] = x.useState(null), [b, v] = x.useState(!1), [S, w] = x.useState(null), j = x.useRef(!0);
  x.useEffect(() => (j.current = !0, () => {
    j.current = !1;
  }), []), x.useEffect(() => {
    let $ = !1;
    return Wb(r).then((Q) => {
      $ || p(r0(Q.presets));
    }).catch((Q) => {
      $ || m(cf(Q));
    }), () => {
      $ = !0;
    };
  }, [r]);
  const T = ($) => {
    a({ ...n, mode: $ });
  }, _ = ($) => {
    a({
      ...n,
      mode: "emotion_vector",
      vector: uf($)
    }), S && w(null);
  }, C = ($) => {
    const Q = Math.max(0, Math.min(1, Number.isFinite($) ? $ : 1));
    a({ ...n, emotionAlpha: Q });
  }, z = async ($) => {
    v(!0), m(null);
    try {
      const Q = await $C(r, $, uf(o));
      if (!j.current) return;
      p(
        (M) => r0([Q, ...M.filter((B) => B.presetId !== Q.presetId)])
      ), w(Q.presetId);
    } catch (Q) {
      j.current && m(cf(Q));
    } finally {
      j.current && v(!1);
    }
  }, O = async ($) => {
    const Q = h;
    p((M) => M.filter((B) => B.presetId !== $)), S === $ && w(null);
    try {
      await IC(r, $);
    } catch (M) {
      j.current && (p(Q), m(cf(M)));
    }
  }, R = ($) => {
    w($.presetId), a({
      ...n,
      mode: "emotion_vector",
      vector: $.vector
    });
  }, X = ($) => {
    a({ ...n, mode: "qwen_template", qwenTemplate: $ });
  };
  return /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
    /* @__PURE__ */ f.jsx("div", { className: `${Hy} ${wR}`, children: /* @__PURE__ */ f.jsx(
      eA,
      {
        vec: o,
        onChange: _,
        readOnly: s !== "emotion_vector"
      }
    ) }),
    /* @__PURE__ */ f.jsxs("div", { className: Hy, children: [
      /* @__PURE__ */ f.jsx("div", { className: ER, role: "radiogroup", "aria-label": "Emotion mode", children: EA.map(($) => /* @__PURE__ */ f.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": s === $.id,
          className: `${jR}${s === $.id ? ` ${TR}` : ""}`,
          onClick: () => T($.id),
          children: $.label
        },
        $.id
      )) }),
      s === "none" && /* @__PURE__ */ f.jsxs("div", { className: t0, children: [
        "Neutral default. Per-line ",
        /* @__PURE__ */ f.jsx("code", { children: "[Char|emotion_vector:…]" }),
        " overrides still apply when present."
      ] }),
      s === "emotion_vector" && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
        /* @__PURE__ */ f.jsxs("div", { className: Zy, children: [
          /* @__PURE__ */ f.jsxs("span", { children: [
            /* @__PURE__ */ f.jsx("span", { className: Py, children: "Alpha" }),
            /* @__PURE__ */ f.jsx("br", {}),
            /* @__PURE__ */ f.jsx("span", { className: CR, children: "Global mix · per-line overrides bypass it" })
          ] }),
          /* @__PURE__ */ f.jsx(
            "input",
            {
              type: "range",
              min: 0,
              max: 1,
              step: 0.01,
              value: c,
              className: Jy,
              style: { "--fill": `${c * 100}%` },
              onChange: ($) => C(Number($.target.value)),
              "aria-label": "Emotion alpha"
            }
          ),
          /* @__PURE__ */ f.jsxs("span", { className: Wy, children: [
            (c * 100).toFixed(0),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ f.jsx(
          pA,
          {
            vec: o,
            onSave: z,
            saving: b
          }
        ),
        /* @__PURE__ */ f.jsx(
          gA,
          {
            presets: h,
            activePresetId: S,
            onSelect: R,
            onDelete: O
          }
        )
      ] }),
      s === "qwen_template" && /* @__PURE__ */ f.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
        /* @__PURE__ */ f.jsx(
          "textarea",
          {
            className: NR,
            placeholder: 'e.g. "Friendly teen, slightly skeptical"',
            value: n.qwenTemplate ?? "",
            onChange: ($) => X($.target.value)
          }
        ),
        /* @__PURE__ */ f.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
          /* @__PURE__ */ f.jsx(
            Ze,
            {
              variant: "secondary",
              onClick: () => {
                const $ = (n.qwenTemplate ?? "").trim();
                if (!$) return;
                const Q = wA($);
                a({
                  ...n,
                  mode: "emotion_vector",
                  vector: uf(Q)
                });
              },
              disabled: !(n.qwenTemplate ?? "").trim(),
              children: "Map to vector →"
            }
          ),
          /* @__PURE__ */ f.jsx("span", { className: e0, children: "Heuristic v1: keyword-based mapping. Switches to vector mode on success." })
        ] }),
        /* @__PURE__ */ f.jsxs("span", { className: e0, children: [
          "The Qwen prompt is mapped to a vector at synth time. Per-line",
          " ",
          /* @__PURE__ */ f.jsx("code", { children: "[Char|qwen:…]" }),
          " overrides take precedence."
        ] }),
        /* @__PURE__ */ f.jsxs("div", { className: Zy, children: [
          /* @__PURE__ */ f.jsx("span", { className: Py, children: "Alpha" }),
          /* @__PURE__ */ f.jsx(
            "input",
            {
              type: "range",
              min: 0,
              max: 1,
              step: 0.01,
              value: c,
              className: Jy,
              style: { "--fill": `${c * 100}%` },
              onChange: ($) => C(Number($.target.value)),
              "aria-label": "Emotion alpha"
            }
          ),
          /* @__PURE__ */ f.jsxs("span", { className: Wy, children: [
            (c * 100).toFixed(0),
            "%"
          ] })
        ] })
      ] }),
      s === "audio_ref" && /* @__PURE__ */ f.jsx("div", { className: t0, children: "Audio reference uses the voice asset assigned per character. Open the cast section to assign references; per-character overrides take precedence." }),
      g && /* @__PURE__ */ f.jsx("div", { className: MR, children: g })
    ] })
  ] });
}
function TA(n) {
  if (!n || !Array.isArray(n)) return ms(hs);
  const a = { ...hs };
  return ln.forEach((r, s) => {
    const o = n[s];
    a[r] = Number.isFinite(o) ? Math.max(0, Math.min(1, o)) : 0;
  }), a;
}
function r0(n) {
  return [...n].sort((a, r) => r.updatedAt - a.updatedAt);
}
function cf(n) {
  return n instanceof Jr || n instanceof Error ? n.message : "Unknown error";
}
const l0 = [
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
], CA = {
  help: "Read hits, write misses. Fastest on re-runs."
};
function NA({
  outputFormat: n,
  onOutputFormatChange: a,
  speedFactor: r,
  onSpeedFactorChange: s,
  cachePolicy: o,
  onCachePolicyChange: c,
  generation: h,
  onGenerationChange: p
}) {
  const g = (b, v) => {
    p({ ...h, [b]: v });
  }, m = l0.find((b) => b.id === o) ?? CA;
  return /* @__PURE__ */ f.jsxs("div", { children: [
    /* @__PURE__ */ f.jsxs("label", { className: mi, children: [
      /* @__PURE__ */ f.jsx("span", { className: Rn, children: "Format" }),
      /* @__PURE__ */ f.jsxs("select", { value: n, onChange: (b) => a(b.currentTarget.value), children: [
        /* @__PURE__ */ f.jsx("option", { value: "mp3", children: "mp3" }),
        /* @__PURE__ */ f.jsx("option", { value: "wav", children: "wav" }),
        /* @__PURE__ */ f.jsx("option", { value: "flac", children: "flac" })
      ] })
    ] }),
    /* @__PURE__ */ f.jsxs("label", { className: mi, children: [
      /* @__PURE__ */ f.jsx("span", { className: Rn, children: "Speed" }),
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
        className: mi,
        role: "radiogroup",
        "aria-label": "Cache policy",
        children: [
          /* @__PURE__ */ f.jsx("span", { className: Rn, children: "Cache" }),
          l0.map((b) => /* @__PURE__ */ f.jsx(
            Ze,
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
    /* @__PURE__ */ f.jsx("p", { className: Rn, "aria-live": "polite", children: m.help }),
    /* @__PURE__ */ f.jsxs("label", { className: mi, children: [
      /* @__PURE__ */ f.jsx("span", { className: Rn, children: "Temperature" }),
      /* @__PURE__ */ f.jsx(
        "input",
        {
          type: "number",
          min: 0,
          max: 2,
          step: 0.05,
          defaultValue: 0.8,
          onChange: (b) => g("temperature", Number(b.currentTarget.value))
        }
      )
    ] }),
    /* @__PURE__ */ f.jsxs("label", { className: mi, children: [
      /* @__PURE__ */ f.jsx("span", { className: Rn, children: "Top-p" }),
      /* @__PURE__ */ f.jsx(
        "input",
        {
          type: "number",
          min: 0,
          max: 1,
          step: 0.05,
          defaultValue: 0.8,
          onChange: (b) => g("top_p", Number(b.currentTarget.value))
        }
      )
    ] }),
    /* @__PURE__ */ f.jsxs("label", { className: mi, children: [
      /* @__PURE__ */ f.jsx("span", { className: Rn, children: "Seed" }),
      /* @__PURE__ */ f.jsx(
        "input",
        {
          type: "number",
          defaultValue: 42,
          onChange: (b) => g("seed", Number(b.currentTarget.value))
        }
      )
    ] })
  ] });
}
var MA = "iv43qk0", s0 = "iv43qk1", RA = "iv43qk2", o0 = "iv43qk3", AA = "iv43qk4", _A = "iv43qk5", DA = "iv43qk6", zA = "iv43qk7", OA = { vector: "iv43qk8", qwen: "iv43qk9", preset: "iv43qka", audio: "iv43qkb", raw: "iv43qkc" }, LA = "iv43qkd", UA = "iv43qke", df = "iv43qkf", ff = "iv43qkg";
function kA({
  lines: n,
  characterColors: a,
  onLineClick: r
}) {
  if (n.length === 0)
    return /* @__PURE__ */ f.jsx("p", { className: LA, children: "Paste dialogue above to see character-tagged lines, override badges, and per-line previews here." });
  const s = n.length, o = n.filter((h) => h.character !== null).length, c = s - o;
  return /* @__PURE__ */ f.jsxs("div", { children: [
    /* @__PURE__ */ f.jsxs("div", { className: UA, children: [
      /* @__PURE__ */ f.jsxs("span", { className: df, children: [
        /* @__PURE__ */ f.jsx("span", { className: ff, children: s }),
        "lines"
      ] }),
      /* @__PURE__ */ f.jsxs("span", { className: df, children: [
        /* @__PURE__ */ f.jsx("span", { className: ff, children: o }),
        "spoken"
      ] }),
      /* @__PURE__ */ f.jsxs("span", { className: df, children: [
        /* @__PURE__ */ f.jsx("span", { className: ff, children: c }),
        "narration"
      ] })
    ] }),
    /* @__PURE__ */ f.jsx("ol", { className: MA, children: n.map((h) => /* @__PURE__ */ f.jsx(
      VA,
      {
        line: h,
        ...h.character && a[h.character] ? { color: a[h.character] } : {},
        ...r ? { onClick: () => r(h.idx) } : {}
      },
      h.idx
    )) })
  ] });
}
function VA({ line: n, color: a, onClick: r }) {
  return n.character === null ? /* @__PURE__ */ f.jsxs("li", { className: `${s0} ${RA}`, children: [
    /* @__PURE__ */ f.jsx("span", { className: o0, children: String(n.idx + 1).padStart(2, "0") }),
    /* @__PURE__ */ f.jsx("span", { className: DA, children: n.text })
  ] }) : /* @__PURE__ */ f.jsxs(
    "li",
    {
      className: s0,
      onClick: r,
      style: r ? { cursor: "pointer" } : void 0,
      children: [
        /* @__PURE__ */ f.jsx("span", { className: o0, children: String(n.idx + 1).padStart(2, "0") }),
        /* @__PURE__ */ f.jsx("span", { className: AA, style: a ? { color: a } : void 0, children: n.character }),
        /* @__PURE__ */ f.jsxs("span", { className: _A, children: [
          n.text,
          n.override && /* @__PURE__ */ f.jsxs("span", { className: `${zA} ${OA[n.override.kind]}`, children: [
            n.override.kind,
            n.override.label ? ` · ${n.override.label}` : ""
          ] })
        ] })
      ]
    }
  );
}
var BA = "_46z95i0", HA = "_46z95i1", qA = "_46z95i2", $A = "_46z95i3", IA = "_46z95i4", YA = "_46z95i5", FA = "_46z95i6";
const GA = {
  intensity: 0.6,
  pace: 1,
  pitchSt: 0
};
function XA({ value: n, onChange: a }) {
  return /* @__PURE__ */ f.jsxs("div", { className: BA, children: [
    /* @__PURE__ */ f.jsx(
      hf,
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
      hf,
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
      hf,
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
function hf({ label: n, sub: a, min: r, max: s, step: o, format: c, value: h, onChange: p }) {
  const g = (h - r) / (s - r) * 100, m = `perf-${n.toLowerCase()}`;
  return /* @__PURE__ */ f.jsxs("div", { className: HA, children: [
    /* @__PURE__ */ f.jsxs("div", { className: qA, children: [
      /* @__PURE__ */ f.jsx("label", { htmlFor: m, className: $A, children: n }),
      /* @__PURE__ */ f.jsx("span", { className: IA, children: a })
    ] }),
    /* @__PURE__ */ f.jsx(
      "input",
      {
        id: m,
        type: "range",
        min: r,
        max: s,
        step: o,
        value: h,
        className: YA,
        style: { "--fill": `${g}%` },
        onChange: (b) => p(Number(b.target.value))
      }
    ),
    /* @__PURE__ */ f.jsx("span", { className: FA, children: c(h) })
  ] });
}
var KA = "qe93dj0", QA = "qe93dj1", ZA = "qe93dj2", PA = "qe93dj3", JA = "qe93dj4", WA = "qe93dj5", e2 = "qe93dj6", t2 = { ok: "qe93dj7", warn: "qe93dj8", info: "qe93dj9" }, n2 = "qe93dja", a2 = "qe93djb";
function i2({ checks: n }) {
  const a = n.filter((r) => r.status === "ok").length;
  return /* @__PURE__ */ f.jsxs("div", { className: KA, children: [
    /* @__PURE__ */ f.jsxs("header", { className: QA, children: [
      /* @__PURE__ */ f.jsx("span", { className: ZA, children: "Pre-flight" }),
      /* @__PURE__ */ f.jsxs("span", { className: PA, children: [
        a,
        "/",
        n.length,
        " OK"
      ] })
    ] }),
    /* @__PURE__ */ f.jsx("ul", { className: JA, children: n.map((r) => /* @__PURE__ */ f.jsxs("li", { className: WA, children: [
      /* @__PURE__ */ f.jsx(
        "span",
        {
          "aria-hidden": "true",
          className: `${e2} ${t2[r.status]}`
        }
      ),
      /* @__PURE__ */ f.jsx("span", { className: n2, children: r.label }),
      r.detail && /* @__PURE__ */ f.jsx("span", { className: a2, children: r.detail })
    ] }, r.id)) })
  ] });
}
var r2 = "xq3iim0", l2 = "xq3iim2 xq3iim1", s2 = "xq3iim3 xq3iim1", o2 = "xq3iim4", u2 = "xq3iim5", c2 = "xq3iim6", d2 = "xq3iim7";
function f2({
  deploymentId: n,
  initialVoiceAssetId: a,
  onChange: r
}) {
  const [s, o] = x.useState([]), [c, h] = x.useState(a), [p, g] = x.useState(!0), [m, b] = x.useState(!1), [v, S] = x.useState(null);
  x.useEffect(() => {
    let j = !1;
    return g(!0), cs(n).then(({ voiceAssets: T }) => {
      j || o(T);
    }).catch((T) => {
      j || S(T instanceof Error ? T.message : "Failed to load voices");
    }).finally(() => {
      j || g(!1);
    }), () => {
      j = !0;
    };
  }, [n]);
  async function w(j) {
    b(!0), S(null);
    const T = c;
    h(j);
    try {
      await RT(n, j), r?.(j);
    } catch (_) {
      h(T), S(_ instanceof Error ? _.message : "Failed to update default voice");
    } finally {
      b(!1);
    }
  }
  return p ? /* @__PURE__ */ f.jsx("p", { className: c2, children: "Loading voices…" }) : v ? /* @__PURE__ */ f.jsx("p", { className: d2, children: v }) : s.length === 0 ? /* @__PURE__ */ f.jsx("div", { role: "radiogroup", "aria-label": "Default voice for quick mode", children: /* @__PURE__ */ f.jsx(
    ws,
    {
      title: "No voices yet.",
      hint: "Upload a voice in Mappings to enable quick mode."
    }
  ) }) : /* @__PURE__ */ f.jsx(
    "div",
    {
      role: "radiogroup",
      "aria-label": "Default voice for quick mode",
      className: r2,
      children: s.map((j) => {
        const T = j.voiceAssetId === c;
        return /* @__PURE__ */ f.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": T,
            disabled: m,
            onClick: () => void w(T ? null : j.voiceAssetId),
            className: T ? s2 : l2,
            children: [
              /* @__PURE__ */ f.jsx("span", { className: o2, children: j.displayName }),
              j.durationMs !== null && j.durationMs !== void 0 && /* @__PURE__ */ f.jsx("span", { className: u2, children: h2(j.durationMs) })
            ]
          },
          j.voiceAssetId
        );
      })
    }
  );
}
function h2(n) {
  const a = n / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const r = Math.floor(a / 60), s = Math.round(a - r * 60);
  return `${r}:${s.toString().padStart(2, "0")}`;
}
var u0 = "_17fbpt30", c0 = "_17fbpt31", d0 = "_17fbpt32", m2 = "_17fbpt33", p2 = "_17fbpt34", g2 = "_17fbpt35", f0 = "_17fbpt36", v2 = "_17fbpt37", y2 = "_17fbpt38";
const b2 = {
  completed: "success",
  running: "accent",
  queued: "neutral",
  failed: "danger",
  cancelled: "faint",
  partial: "warning"
};
function x2({
  runs: n,
  deploymentId: a,
  onOpenQueue: r,
  onOpenRun: s,
  emptyHint: o
}) {
  return n.length === 0 ? /* @__PURE__ */ f.jsxs("div", { className: u0, children: [
    /* @__PURE__ */ f.jsx("header", { className: c0, children: /* @__PURE__ */ f.jsx(
      "a",
      {
        className: d0,
        href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
        onClick: r ? (c) => {
          c.preventDefault(), r();
        } : void 0,
        children: "Open queue →"
      }
    ) }),
    /* @__PURE__ */ f.jsx("p", { className: v2, children: "No runs yet." }),
    /* @__PURE__ */ f.jsx("p", { className: y2, children: o ?? "Hit Generate to enqueue a batch." })
  ] }) : /* @__PURE__ */ f.jsxs("div", { className: u0, children: [
    /* @__PURE__ */ f.jsxs("header", { className: c0, children: [
      /* @__PURE__ */ f.jsx("span", {}),
      /* @__PURE__ */ f.jsx(
        "a",
        {
          className: d0,
          href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
          onClick: r ? (c) => {
            c.preventDefault(), r();
          } : void 0,
          children: "Open queue →"
        }
      )
    ] }),
    /* @__PURE__ */ f.jsx("ul", { className: m2, children: n.slice(0, 5).map((c) => /* @__PURE__ */ f.jsx("li", { children: /* @__PURE__ */ f.jsxs(
      "button",
      {
        type: "button",
        className: p2,
        onClick: s ? () => s(c.runId) : void 0,
        children: [
          /* @__PURE__ */ f.jsx("span", { className: g2, children: c.runId }),
          /* @__PURE__ */ f.jsx("span", { className: `${ix.sm} ${rx[b2[c.status] ?? "neutral"]}`, children: c.status }),
          /* @__PURE__ */ f.jsx("span", { className: f0, children: S2(c.startedAt ?? c.queuedAt) }),
          /* @__PURE__ */ f.jsx("span", { className: f0, children: c.kind })
        ]
      }
    ) }, c.runId)) })
  ] });
}
function S2(n) {
  if (!n) return "—";
  const a = n > 1e12 ? Math.floor(n / 1e3) : n, r = new Date(a * 1e3);
  if (Number.isNaN(r.getTime())) return "—";
  const o = Date.now() - r.getTime();
  return o < 6e4 ? "just now" : o < 36e5 ? `${Math.floor(o / 6e4)}m ago` : o < 864e5 ? `${Math.floor(o / 36e5)}h ago` : r.toISOString().slice(0, 16).replace("T", " ");
}
function w2(n) {
  const a = Pr(), [r, s] = x.useState("idle"), [o, c] = x.useState(null), [h, p] = x.useState(/* @__PURE__ */ new Map()), [g, m] = x.useState(null), [b, v] = x.useState(null), S = x.useRef(null);
  x.useEffect(() => () => {
    S.current?.();
  }, []);
  const w = x.useCallback(async () => {
    s("starting"), m(null), p(/* @__PURE__ */ new Map()), v(null);
    try {
      const B = await zT(n.deploymentId, n.createPayload);
      c(B.runId), s("running"), S.current?.(), S.current = hy(
        n.deploymentId,
        B.runId,
        (J) => h0(J, p, s, v, n.deploymentId, B.runId),
        () => s("error")
      );
    } catch (B) {
      s("error"), m(mf(B));
    }
  }, [n.deploymentId, n.createPayload]), j = x.useCallback(async () => {
    if (o)
      try {
        await OT(n.deploymentId, o);
      } catch (B) {
        m(mf(B));
      }
  }, [n.deploymentId, o]), T = Array.from(h.values()).sort((B, J) => B.globalIndex - J.globalIndex), _ = r === "starting" || r === "running", C = b?.status === "partial", z = T.filter((B) => B.status === "failed"), O = (() => {
    if (r !== "terminal" || z.length === 0) return null;
    const B = /* @__PURE__ */ new Map();
    for (const be of z) {
      const Se = be.failureCategory ?? "unknown";
      B.set(Se, (B.get(Se) ?? 0) + 1);
    }
    let J = "unknown", se = 0;
    for (const [be, Se] of B)
      Se > se && (J = be, se = Se);
    const oe = T.length;
    return { category: J, count: se, total: oe };
  })(), R = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, X = "Check the run detail page for the per-segment error log.", $ = g?.toLowerCase().includes("unmapped") ?? !1, Q = n.diagnostics ?? [], M = Q.find((B) => B.status === "fail");
  return /* @__PURE__ */ f.jsxs("div", { children: [
    Q.length > 0 && /* @__PURE__ */ f.jsx("ul", { className: nM, "aria-label": "Pre-flight checks", children: Q.map((B) => /* @__PURE__ */ f.jsxs("li", { className: aM, children: [
      /* @__PURE__ */ f.jsx(bi, { tone: j2(B.status), children: T2(B.status) }),
      /* @__PURE__ */ f.jsx("span", { className: iM, children: B.label }),
      B.detail && /* @__PURE__ */ f.jsx("span", { className: rM, children: B.detail })
    ] }, B.label)) }),
    g && /* @__PURE__ */ f.jsxs(
      _n,
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
          /* @__PURE__ */ f.jsx("span", { children: g }),
          $ && /* @__PURE__ */ f.jsx(
            Ze,
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
    /* @__PURE__ */ f.jsxs("div", { className: mi, children: [
      /* @__PURE__ */ f.jsx(
        Ze,
        {
          disabled: !n.canGenerate || _ || !!M,
          onClick: w,
          children: r === "running" ? "Running…" : "Generate + Export ZIP"
        }
      ),
      /* @__PURE__ */ f.jsx(Ze, { variant: "danger", disabled: !_, onClick: j, children: "Cancel" })
    ] }),
    O && /* @__PURE__ */ f.jsxs(_n, { severity: "error", style: { flexDirection: "column", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ f.jsxs("strong", { children: [
        "Run failed — ",
        O.count,
        " of ",
        O.total,
        " segments failed with ",
        /* @__PURE__ */ f.jsx("code", { children: O.category })
      ] }),
      /* @__PURE__ */ f.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: R[O.category] ?? X })
    ] }),
    b?.exportArtifactRef && /* @__PURE__ */ f.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${b.exportArtifactRef}/download`,
        download: !0,
        className: `${ex.secondary} ${tx.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    C && b && /* @__PURE__ */ f.jsxs(_n, { severity: "warning", children: [
      /* @__PURE__ */ f.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ f.jsx(
        Ze,
        {
          variant: "secondary",
          disabled: !!M,
          onClick: async () => {
            try {
              const B = await Qb(n.deploymentId, b.runId);
              c(B.runId), p(/* @__PURE__ */ new Map()), v(null), s("running"), S.current?.(), S.current = hy(
                n.deploymentId,
                B.runId,
                (J) => h0(J, p, s, v, n.deploymentId, B.runId),
                () => s("error")
              );
            } catch (B) {
              m(mf(B)), s("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    T.length > 0 && /* @__PURE__ */ f.jsxs("table", { className: eM, children: [
      /* @__PURE__ */ f.jsx("thead", { children: /* @__PURE__ */ f.jsxs("tr", { children: [
        /* @__PURE__ */ f.jsx("th", { className: di, children: "#" }),
        /* @__PURE__ */ f.jsx("th", { className: di, children: "Status" }),
        /* @__PURE__ */ f.jsx("th", { className: di, children: "Duration" }),
        /* @__PURE__ */ f.jsx("th", { className: di, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ f.jsx("tbody", { children: T.map((B) => /* @__PURE__ */ f.jsxs("tr", { className: tM, children: [
        /* @__PURE__ */ f.jsx("td", { className: di, children: B.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ f.jsx("td", { className: di, children: /* @__PURE__ */ f.jsx(bi, { tone: E2(B.status), children: B.status }) }),
        /* @__PURE__ */ f.jsx("td", { className: di, children: B.durationMs ? `${B.durationMs} ms` : "—" }),
        /* @__PURE__ */ f.jsx("td", { className: di, children: B.failureCategory ?? "" })
      ] }, B.globalIndex)) })
    ] })
  ] });
}
async function h0(n, a, r, s, o, c) {
  switch (n.type) {
    case "segment_started":
      a((h) => {
        const p = new Map(h);
        return p.set(n.globalIndex, { globalIndex: n.globalIndex, status: "running" }), p;
      });
      return;
    case "segment_completed":
      a((h) => {
        const p = new Map(h);
        return p.set(n.globalIndex, {
          globalIndex: n.globalIndex,
          status: "completed",
          durationMs: n.durationMs
        }), p;
      });
      return;
    case "segment_failed":
      a((h) => {
        const p = new Map(h);
        return p.set(n.globalIndex, {
          globalIndex: n.globalIndex,
          status: "failed",
          failureCategory: n.failureCategory
        }), p;
      });
      return;
    case "run_terminal":
      r("terminal");
      try {
        const h = await bh(o, c);
        s(h);
      } catch {
      }
      return;
  }
}
function E2(n) {
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
function j2(n) {
  switch (n) {
    case "ok":
      return "success";
    case "warn":
      return "warning";
    case "fail":
      return "danger";
  }
}
function T2(n) {
  switch (n) {
    case "ok":
      return "ok";
    case "warn":
      return "warn";
    case "fail":
      return "stop";
  }
}
function mf(n) {
  return n instanceof Jr || n instanceof Error ? n.message : "unknown error";
}
const m0 = [
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
function C2(n) {
  const a = Pr(), r = x.useRef(null), { tokens: s, attributions: o, unresolved: c, predictedFilenames: h, characterColor: p } = x.useMemo(
    () => M2(n.value, n.outputFormat, n.mappings),
    [n.value, n.outputFormat, n.mappings]
  ), g = (m) => {
    const b = r.current;
    b && (b.scrollTop = m.currentTarget.scrollTop, b.scrollLeft = m.currentTarget.scrollLeft);
  };
  return /* @__PURE__ */ f.jsxs("div", { children: [
    /* @__PURE__ */ f.jsxs("div", { className: QN, children: [
      /* @__PURE__ */ f.jsx("div", { ref: r, className: ZN, "aria-hidden": "true", children: s.map((m, b) => N2(m, b, p)) }),
      /* @__PURE__ */ f.jsx(
        "textarea",
        {
          className: PN,
          value: n.value,
          onChange: (m) => n.onChange(m.currentTarget.value),
          onScroll: g,
          placeholder: `[Bob] Hey there
[Alice] Hello
...`,
          "aria-label": "Dialogue script",
          spellCheck: !1
        }
      )
    ] }),
    c.length > 0 && /* @__PURE__ */ f.jsxs(_n, { severity: "error", children: [
      /* @__PURE__ */ f.jsx("strong", { children: "Unresolved characters:" }),
      " ",
      c.map((m) => /* @__PURE__ */ f.jsxs(
        Ze,
        {
          variant: "secondary",
          size: "sm",
          onClick: () => a(
            `/${n.deploymentId}/mappings/new?character=${encodeURIComponent(m)}`
          ),
          children: [
            "Create mapping for ",
            m
          ]
        },
        m
      ))
    ] }),
    o.length > 0 && /* @__PURE__ */ f.jsxs("div", { children: [
      /* @__PURE__ */ f.jsx("span", { className: Rn, children: "Parsed lines" }),
      /* @__PURE__ */ f.jsx("ul", { className: Iy, children: o.map((m) => /* @__PURE__ */ f.jsxs("li", { children: [
        "#",
        m.lineNumber.toString().padStart(3, "0"),
        " [",
        m.character,
        "] ",
        m.text,
        !m.hasMapping && m.character !== "Narrator" && " — unresolved"
      ] }, m.lineNumber)) })
    ] }),
    h.length > 0 && /* @__PURE__ */ f.jsxs("div", { children: [
      /* @__PURE__ */ f.jsx("span", { className: Rn, children: "Predicted filenames" }),
      /* @__PURE__ */ f.jsx("ul", { className: Iy, children: h.map((m) => /* @__PURE__ */ f.jsx("li", { children: m }, m)) })
    ] })
  ] });
}
function N2(n, a, r) {
  if (n.kind === "blank")
    return /* @__PURE__ */ f.jsxs("span", { children: [
      n.raw,
      `
`
    ] }, a);
  if (n.kind === "narrator")
    return /* @__PURE__ */ f.jsxs("span", { children: [
      /* @__PURE__ */ f.jsx("span", { className: $y, children: n.raw }),
      `
`
    ] }, a);
  const s = r.get(n.character?.toLowerCase() ?? "") ?? "currentColor", o = n.hasMapping ? qy : `${qy} ${JN}`;
  return /* @__PURE__ */ f.jsxs("span", { children: [
    /* @__PURE__ */ f.jsxs("span", { className: o, style: { color: s }, children: [
      "[",
      n.character,
      n.override && /* @__PURE__ */ f.jsxs("span", { className: WN, children: [
        "|",
        n.override
      ] }),
      "]"
    ] }),
    /* @__PURE__ */ f.jsxs("span", { className: $y, children: [
      " ",
      n.text ?? ""
    ] }),
    `
`
  ] }, a);
}
function M2(n, a, r) {
  const s = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], c = [], h = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Map(), g = [], m = /* @__PURE__ */ new Map();
  let b = 0;
  const v = n.split(/\r?\n/);
  let S = 0;
  return v.forEach((w, j) => {
    const T = w.trim();
    if (!T) {
      o.push({ kind: "blank", raw: w });
      return;
    }
    const _ = j + 1, C = T.match(s);
    let z = "Narrator", O = T, R, X = !1;
    if (C?.groups) {
      X = !0;
      const B = (C.groups.body ?? "").trim(), J = (C.groups.rest ?? "").trim();
      z = ((B.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", R = (B.includes("|") ? B.slice(B.indexOf("|") + 1) : "").trim() || void 0, O = J;
    }
    S += 1;
    const $ = z.toLowerCase(), Q = (p.get($) ?? 0) + 1;
    p.set($, Q);
    const M = z === "Narrator" || r.has($);
    if (M || h.add(z), z !== "Narrator" && !m.has($) && (m.set($, m0[b % m0.length] ?? "currentColor"), b += 1), X) {
      const B = { kind: "character", raw: w, character: z, text: O, hasMapping: M };
      R !== void 0 && (B.override = R), o.push(B);
    } else
      o.push({ kind: "narrator", raw: w });
    c.push({ lineNumber: _, character: z, text: O, hasMapping: M }), g.push(
      `${S.toString().padStart(3, "0")}_${R2(z)}_${Q.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: c,
    unresolved: Array.from(h),
    predictedFilenames: g,
    characterColor: m
  };
}
function R2(n) {
  const a = n.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
const pf = [
  // audit-allow: hex — neon decorative palette per design lang
  "#ba9eff",
  // audit-allow: hex — neon decorative palette per design lang
  "#9093ff",
  // audit-allow: hex — neon decorative palette per design lang
  "#ff8439",
  // audit-allow: hex — neon decorative palette per design lang
  "#22c55e",
  // audit-allow: hex — neon decorative palette per design lang
  "#ffd34a",
  // audit-allow: hex — neon decorative palette per design lang
  "#ff7aa8"
], A2 = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;
function _2(n) {
  const a = [];
  if (!n) return a;
  const r = n.split(/\r?\n/);
  for (let s = 0; s < r.length; s += 1) {
    const c = (r[s] ?? "").trim();
    if (c.length === 0) continue;
    const h = c.match(A2);
    if (!h || !h.groups) {
      a.push({ idx: s, character: null, text: c, override: null });
      continue;
    }
    const p = h.groups.body ?? "", g = (h.groups.rest ?? "").trim(), [m = "", ...b] = p.split("|"), v = m.trim();
    if (!v) {
      a.push({ idx: s, character: null, text: g || c, override: null });
      continue;
    }
    const S = v.split(":")[0]?.trim() || null, w = b.join("|").trim(), j = w ? D2(w) : null;
    a.push({
      idx: s,
      character: S,
      text: g,
      override: j
    });
  }
  return a;
}
function D2(n) {
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
function z2(n) {
  const a = /* @__PURE__ */ new Set(), r = [];
  for (const s of n) {
    if (!s.character) continue;
    const o = s.character.toLowerCase();
    a.has(o) || (a.add(o), r.push(s.character));
  }
  return r;
}
function O2(n) {
  const a = {};
  for (let r = 0; r < n.length; r += 1) {
    const s = n[r];
    s && (a[s] = pf[r % pf.length] ?? pf[0]);
  }
  return a;
}
function L2(n) {
  const a = {};
  for (const r of n)
    r.character && (a[r.character] = (a[r.character] ?? 0) + 1);
  return a;
}
function U2(n) {
  const a = n.workflowCustomised ?? !1, r = n.unmappableFields ?? [];
  return /* @__PURE__ */ f.jsxs("div", { className: UN, children: [
    /* @__PURE__ */ f.jsxs("header", { className: kN, children: [
      /* @__PURE__ */ f.jsx("div", { className: BN, children: "EmotionTTS · Recipe Studio" }),
      /* @__PURE__ */ f.jsx("div", { className: VN, children: /* @__PURE__ */ f.jsx("h1", { className: HN, children: n.deployment.displayName }) }),
      /* @__PURE__ */ f.jsx("p", { className: qN, children: "Author the script, cast the voices, sculpt the emotion, and modulate every utterance — all from a single screen, with cache-bound previews and a non-destructive edit chain." }),
      n.hero
    ] }),
    a && /* @__PURE__ */ f.jsxs(_n, { severity: "warning", children: [
      /* @__PURE__ */ f.jsx("strong", { children: "Workflow customised." }),
      " ",
      r.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${r.join(", ")}.`,
      " ",
      /* @__PURE__ */ f.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: $N, children: [
      /* @__PURE__ */ f.jsx(
        Yi,
        {
          number: "01",
          title: "Script",
          id: "recipe-section-script",
          variant: "default",
          children: n.scriptSection
        }
      ),
      /* @__PURE__ */ f.jsx(
        Yi,
        {
          number: "02",
          title: "Parsed dialogue",
          id: "recipe-section-parsed",
          variant: "default",
          children: n.parsedDialogueSection
        }
      ),
      /* @__PURE__ */ f.jsx(
        Yi,
        {
          number: "03",
          title: "Cast",
          id: "recipe-section-cast",
          variant: "default",
          children: n.castSection
        }
      ),
      /* @__PURE__ */ f.jsx(
        Yi,
        {
          number: "04",
          title: "Emotion",
          id: "recipe-section-emotion",
          variant: "split",
          children: n.emotionSection
        }
      ),
      /* @__PURE__ */ f.jsx(
        Yi,
        {
          number: "05",
          title: "Performance",
          id: "recipe-section-performance",
          variant: "default",
          children: n.performanceSection
        }
      ),
      /* @__PURE__ */ f.jsx(
        Yi,
        {
          number: "06",
          title: "Recent runs",
          id: "recipe-section-runs",
          variant: "default",
          children: n.recentRunsSection
        }
      ),
      n.auditSection && /* @__PURE__ */ f.jsx(
        Yi,
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
function Yi({ number: n, title: a, id: r, variant: s, children: o }) {
  return /* @__PURE__ */ f.jsxs("section", { className: IN, "aria-labelledby": r, children: [
    /* @__PURE__ */ f.jsx("header", { className: YN, children: /* @__PURE__ */ f.jsxs("div", { children: [
      /* @__PURE__ */ f.jsxs("div", { className: FN, children: [
        n,
        " / ",
        a
      ] }),
      /* @__PURE__ */ f.jsx("h2", { id: r, className: GN, children: a })
    ] }) }),
    /* @__PURE__ */ f.jsx("div", { className: s === "split" ? KN : XN, children: o })
  ] });
}
const Nn = {
  success(n) {
    my.success(n);
  },
  error(n) {
    my.error(n);
  }
};
function k2() {
  const { deployment: n, mappings: a, runs: r, workflow: s } = Ss(), [o, c] = x.useState(a), [h, p] = x.useState([]), [g, m] = x.useState([]), [b, v] = x.useState(null), [S, w] = x.useState(Mu), [j, T] = x.useState(""), [_, C] = x.useState(
    n.defaultOutputFormat ?? "mp3"
  ), [z, O] = x.useState(n.defaultSpeedFactor ?? 1), [R, X] = x.useState({
    mode: "none",
    emotionAlpha: 1
  }), [$, Q] = x.useState({}), [M, B] = x.useState("use_cache"), [J, se] = x.useState(n.defaultVoiceAssetId != null), [oe, be] = x.useState(GA);
  x.useEffect(() => {
    let fe = !1;
    return cs(n.deploymentId).then((Oe) => {
      fe || p(Oe.voiceAssets);
    }).catch(() => {
    }), Wb(n.deploymentId).then((Oe) => {
      fe || m(Oe.presets);
    }).catch(() => {
    }), () => {
      fe = !0;
    };
  }, [n.deploymentId]);
  const Se = x.useMemo(() => _2(j), [j]), le = x.useMemo(() => z2(Se), [Se]), U = x.useMemo(() => O2(le), [le]), k = x.useMemo(() => L2(Se), [Se]), q = x.useMemo(() => {
    const fe = /* @__PURE__ */ new Map();
    for (const Oe of o)
      fe.set(Oe.characterName.toLowerCase(), Oe);
    return fe;
  }, [o]), Z = x.useMemo(() => J ? 0 : le.filter((fe) => !q.has(fe.toLowerCase())).length, [le, q, J]), ae = x.useCallback(
    async (fe, Oe) => {
      const Ae = q.get(fe.toLowerCase());
      try {
        if (Ae) {
          const pe = await rs(n.deploymentId, Ae.mappingId, Oe);
          c(
            (tt) => tt.map((Et) => Et.mappingId === pe.mappingId ? pe : Et)
          ), Nn.success(`Updated mapping for ${fe}`);
        } else if (Oe.speakerVoiceAssetId) {
          const pe = await yh(n.deploymentId, {
            ...Oe,
            characterName: fe,
            speakerVoiceAssetId: Oe.speakerVoiceAssetId
          });
          c((tt) => [...tt, pe]), Nn.success(`Mapped ${fe} to voice`);
        }
      } catch (pe) {
        Nn.error(pe instanceof Error ? pe.message : "mapping failed");
      }
    },
    [q, n.deploymentId]
  ), N = x.useCallback(
    async (fe) => {
      const Oe = q.get(fe.toLowerCase());
      if (Oe)
        try {
          await Kb(n.deploymentId, Oe.mappingId), c((Ae) => Ae.filter((pe) => pe.mappingId !== Oe.mappingId)), Nn.success(`Cleared mapping for ${fe}`);
        } catch (Ae) {
          Nn.error(Ae instanceof Error ? Ae.message : "clear failed");
        }
    },
    [q, n.deploymentId]
  ), P = x.useCallback(
    async (fe, Oe) => {
      try {
        const Ae = await Zb(
          n.deploymentId,
          Oe,
          Oe.name.replace(/\.[^.]+$/, ""),
          "speaker"
        );
        p((pe) => [Ae, ...pe]), await ae(fe, { speakerVoiceAssetId: Ae.voiceAssetId });
      } catch (Ae) {
        Nn.error(Ae instanceof Error ? Ae.message : "upload failed");
      }
    },
    [n.deploymentId, ae]
  ), W = x.useCallback((fe) => {
    w(fe);
  }, []), ie = x.useMemo(() => {
    const fe = [], Oe = /* @__PURE__ */ new Set();
    for (const Ae of o) {
      const pe = Ae.speakerVoiceAssetId;
      if (!pe || Oe.has(pe)) continue;
      Oe.add(pe);
      const Et = h.find((en) => en.voiceAssetId === pe)?.displayName ?? `${Ae.characterName} · ${pe.slice(0, 8)}`;
      fe.push({ kind: "voice_asset", id: pe, label: Et });
    }
    for (const Ae of h)
      Oe.has(Ae.voiceAssetId) || (Oe.add(Ae.voiceAssetId), fe.push({ kind: "voice_asset", id: Ae.voiceAssetId, label: Ae.displayName }));
    return fe;
  }, [o, h]), de = x.useCallback(
    async (fe, Oe) => {
      if (fe.kind !== "voice_asset") {
        Nn.error("Targeted revert is only supported for voice assets in v1.");
        return;
      }
      let Ae;
      try {
        const pe = JSON.parse(Oe);
        if (typeof pe != "object" || pe === null || pe.version !== 1 || !Array.isArray(pe.ops))
          throw new Error("snapshot is not a valid EditChain");
        Ae = pe;
      } catch (pe) {
        Nn.error(
          pe instanceof Error ? `Audit snapshot is malformed: ${pe.message}` : "Audit snapshot is malformed; cannot revert."
        );
        return;
      }
      try {
        const pe = await Pb(fe.id, n.deploymentId, {
          chain: Ae
        }), tt = o.filter((Et) => Et.speakerVoiceAssetId === fe.id);
        await Promise.all(
          tt.map(
            (Et) => rs(n.deploymentId, Et.mappingId, {
              voiceAssetChainDigest: pe.chain_digest
            }).catch(() => null)
          )
        ), c(
          (Et) => Et.map(
            (en) => en.speakerVoiceAssetId === fe.id ? { ...en, voiceAssetChainDigest: pe.chain_digest } : en
          )
        ), Nn.success(`Reverted ${fe.label} to a prior chain`);
      } catch (pe) {
        Nn.error(pe instanceof Error ? pe.message : "revert failed");
      }
    },
    [n.deploymentId, o]
  ), ye = x.useCallback(
    async (fe) => {
      if (fe.kind !== "voice_asset") {
        Nn.error("Revert is only supported for voice assets in v1.");
        return;
      }
      try {
        await VC(fe.id, n.deploymentId);
        const Oe = o.filter((Ae) => Ae.speakerVoiceAssetId === fe.id);
        await Promise.all(
          Oe.map(
            (Ae) => rs(n.deploymentId, Ae.mappingId, {
              voiceAssetChainDigest: null
            }).catch(() => null)
          )
        ), c(
          (Ae) => Ae.map(
            (pe) => pe.speakerVoiceAssetId === fe.id ? { ...pe, voiceAssetChainDigest: null } : pe
          )
        ), Nn.success(`Cleared edit chain on ${fe.label}`);
      } catch (Oe) {
        Nn.error(Oe instanceof Error ? Oe.message : "revert failed");
      }
    },
    [n.deploymentId, o]
  ), De = x.useMemo(
    () => ({
      script: j,
      parserMode: J ? "raw_text" : "dialogue",
      outputFormat: _,
      speedFactor: z,
      globalEmotion: { ...R, emotionAlpha: oe.intensity },
      generation: $,
      cachePolicy: M
    }),
    [j, J, _, z, oe.intensity, R, $, M]
  ), Re = x.useMemo(
    () => H2({
      script: j,
      quickMode: J,
      defaultVoiceAssetId: n.defaultVoiceAssetId,
      characters: le,
      unmappedCount: Z,
      globalEmotion: R,
      performance: oe
    }),
    [j, J, n.defaultVoiceAssetId, le, Z, R, oe]
  ), Be = x.useMemo(
    () => Re.filter((fe) => fe.id !== "performance").map((fe) => ({
      label: fe.label,
      status: fe.status === "ok" ? "ok" : fe.status === "warn" ? "warn" : "fail",
      detail: fe.detail
    })),
    [Re]
  );
  return /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
    /* @__PURE__ */ f.jsx(UC, { position: "bottom-right", richColors: !0, theme: "dark" }),
    /* @__PURE__ */ f.jsx(
      U2,
      {
        deployment: n,
        workflowCustomised: s.workflow.customised,
        unmappableFields: s.unmappableFields,
        hero: /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
          /* @__PURE__ */ f.jsx(uM, { deployment: n }),
          /* @__PURE__ */ f.jsx(
            NN,
            {
              runtimeId: n.backendRuntimePreference ?? "indextts.python",
              device: null,
              sampleRateHz: null,
              lineCount: Se.length,
              charCount: j.length,
              estimatedDurationS: Se.length * 4
            }
          )
        ] }),
        scriptSection: /* @__PURE__ */ f.jsx(
          V2,
          {
            quickMode: J,
            onToggleQuickMode: se,
            deployment: n,
            script: j,
            onScriptChange: T,
            outputFormat: _,
            mappingsByLower: q
          }
        ),
        parsedDialogueSection: /* @__PURE__ */ f.jsx(kA, { lines: Se, characterColors: U }),
        castSection: /* @__PURE__ */ f.jsx(TN, { unmappedCount: Z, totalCount: le.length, children: le.map((fe) => {
          const Oe = q.get(fe.toLowerCase()) ?? null, Ae = U[fe] ?? "#ba9eff";
          return /* @__PURE__ */ f.jsx("li", { style: { listStyle: "none" }, children: /* @__PURE__ */ f.jsx(
            jN,
            {
              characterName: fe,
              color: Ae,
              lineCount: k[fe] ?? 0,
              mapping: Oe,
              voiceAssets: h,
              presets: g,
              active: b === fe,
              onToggle: () => v((pe) => pe === fe ? null : fe),
              onAssignVoiceAsset: (pe) => ae(fe, { speakerVoiceAssetId: pe }),
              onAssignPreset: (pe) => ae(fe, { defaultVectorPresetId: pe }),
              onUploadFile: (pe) => P(fe, pe),
              onClearMapping: () => N(fe)
            }
          ) }, fe);
        }) }),
        emotionSection: /* @__PURE__ */ f.jsx(
          jA,
          {
            value: R,
            onChange: X,
            deploymentId: n.deploymentId
          }
        ),
        performanceSection: /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
          /* @__PURE__ */ f.jsx(
            XA,
            {
              value: { ...oe, pace: z },
              onChange: (fe) => {
                be(fe), fe.pace !== z && O(fe.pace);
              }
            }
          ),
          /* @__PURE__ */ f.jsx(
            wh,
            {
              state: S,
              onChange: W,
              supportsSynthSpeed: !1
            }
          ),
          /* @__PURE__ */ f.jsx(i2, { checks: Re }),
          /* @__PURE__ */ f.jsx(
            NA,
            {
              outputFormat: _,
              onOutputFormatChange: C,
              speedFactor: z,
              onSpeedFactorChange: O,
              cachePolicy: M,
              onCachePolicyChange: B,
              generation: $,
              onGenerationChange: Q
            }
          ),
          /* @__PURE__ */ f.jsx(
            w2,
            {
              deploymentId: n.deploymentId,
              createPayload: De,
              canGenerate: j.trim().length > 0,
              diagnostics: Be
            }
          )
        ] }),
        recentRunsSection: /* @__PURE__ */ f.jsx(x2, { runs: r, deploymentId: n.deploymentId }),
        auditSection: /* @__PURE__ */ f.jsx(
          iN,
          {
            deploymentId: n.deploymentId,
            targets: ie,
            onRevertToIdentity: ye,
            onRevertToChain: de
          }
        )
      }
    )
  ] });
}
function V2({
  quickMode: n,
  onToggleQuickMode: a,
  deployment: r,
  script: s,
  onScriptChange: o,
  outputFormat: c,
  mappingsByLower: h
}) {
  const p = s.length, g = s.trim() ? s.trim().split(/\s+/).length : 0, m = s.trim() ? s.trim().split(/\r?\n/).filter((b) => b.trim()).length : 0;
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
            f2,
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
                  /* @__PURE__ */ f.jsx("strong", { style: { color: "var(--accent)", fontFamily: "var(--font-mono)" }, children: p.toString().padStart(3, "0") }),
                  " ",
                  "chars"
                ] }),
                /* @__PURE__ */ f.jsxs("span", { children: [
                  /* @__PURE__ */ f.jsx("strong", { style: { color: "var(--accent)", fontFamily: "var(--font-mono)" }, children: m.toString().padStart(2, "0") }),
                  " ",
                  "lines"
                ] }),
                /* @__PURE__ */ f.jsxs("span", { children: [
                  /* @__PURE__ */ f.jsx("strong", { style: { color: "var(--accent)", fontFamily: "var(--font-mono)" }, children: g.toString().padStart(3, "0") }),
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
      C2,
      {
        value: s,
        onChange: o,
        outputFormat: c,
        mappings: h,
        deploymentId: r.deploymentId
      }
    ),
    /* @__PURE__ */ f.jsx(B2, {})
  ] });
}
function B2() {
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
function H2({
  script: n,
  quickMode: a,
  defaultVoiceAssetId: r,
  characters: s,
  unmappedCount: o,
  globalEmotion: c,
  performance: h
}) {
  const p = [], g = n.trim();
  if (!g)
    p.push({ id: "script", status: "warn", label: "Script", detail: "empty" });
  else {
    const m = g.split(/\r?\n/).filter((b) => b.trim()).length;
    p.push({
      id: "script",
      status: "ok",
      label: "Script",
      detail: `${m} lines · ${g.length} chars`
    });
  }
  if (a ? p.push({
    id: "voice",
    status: r ? "ok" : "warn",
    label: "Quick voice",
    detail: r ? "default voice set" : "no default voice"
  }) : s.length === 0 ? p.push({ id: "cast", status: "info", label: "Cast", detail: "no characters detected" }) : o === 0 ? p.push({ id: "cast", status: "ok", label: "Cast", detail: `${s.length} mapped` }) : p.push({
    id: "cast",
    status: "warn",
    label: "Cast",
    detail: `${o} unmapped`
  }), c.mode === "qwen_template" && !c.qwenTemplate?.trim())
    p.push({ id: "emotion", status: "warn", label: "Emotion", detail: "Qwen template empty" });
  else if (c.mode === "emotion_vector") {
    const m = c.vector, b = Array.isArray(m) && m.some((v) => Math.abs(v) > 0.01);
    p.push({
      id: "emotion",
      status: b ? "ok" : "info",
      label: "Emotion",
      detail: b ? "8-axis vector" : "neutral vector"
    });
  } else c.mode === "audio_ref" ? p.push({ id: "emotion", status: "ok", label: "Emotion", detail: "audio reference" }) : p.push({ id: "emotion", status: "info", label: "Emotion", detail: "neutral" });
  return p.push({
    id: "performance",
    status: "info",
    label: "Performance",
    detail: `intensity ${Math.round(h.intensity * 100)}% · pace ${h.pace.toFixed(2)}× · pitch ${h.pitchSt >= 0 ? "+" : ""}${h.pitchSt.toFixed(1)}st`
  }), p;
}
const p0 = /* @__PURE__ */ new Map();
function q2(n, a) {
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
    const o = `${n}::${a}`, c = p0.get(o);
    if (c) {
      s({ peaks: c, isLoading: !1, error: null });
      return;
    }
    const h = new AbortController();
    return s({ peaks: null, isLoading: !0, error: null }), $2(n, a, h.signal).then((p) => {
      h.signal.aborted || (p0.set(o, p), s({ peaks: p, isLoading: !1, error: null }));
    }).catch((p) => {
      if (h.signal.aborted) return;
      const g = p instanceof Error ? p.message : "decode failed";
      s({ peaks: null, isLoading: !1, error: g });
    }), () => h.abort();
  }, [n, a]), r;
}
async function $2(n, a, r) {
  const s = await fetch(n, { signal: r });
  if (!s.ok) throw new Error(`failed to load audio (${s.status})`);
  const o = await s.arrayBuffer();
  if (r.aborted) throw new DOMException("aborted", "AbortError");
  const h = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return I2(h, a);
}
function I2(n, a) {
  const r = n.numberOfChannels, s = n.length, o = Math.max(1, Math.floor(s / a)), c = new Float32Array(a), h = [];
  for (let p = 0; p < r; p += 1) h.push(n.getChannelData(p));
  for (let p = 0; p < a; p += 1) {
    const g = p * o, m = Math.min(s, g + o);
    let b = 0;
    for (let v = g; v < m; v += 1) {
      let S = 0;
      for (let j = 0; j < r; j += 1) {
        const T = h[j];
        T && (S += Math.abs(T[v] ?? 0));
      }
      const w = S / r;
      w > b && (b = w);
    }
    c[p] = b;
  }
  return c;
}
const g0 = "(prefers-reduced-motion: reduce)";
function Y2() {
  const [n, a] = x.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(g0).matches);
  return x.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const r = window.matchMedia(g0), s = (o) => a(o.matches);
    return r.addEventListener("change", s), () => r.removeEventListener("change", s);
  }, []), n;
}
var F2 = "mquzal0", G2 = "mquzal1", v0 = "mquzal2", y0 = "mquzal3", b0 = "mquzal4", X2 = "mquzal5", x0 = "mquzal6", S0 = "mquzal7";
const K2 = 120, Q2 = 720;
function gx(n) {
  const {
    audioUrl: a,
    durationMs: r,
    startMs: s,
    endMs: o,
    onChangeStart: c,
    onChangeEnd: h,
    isPlaying: p = !1,
    playbackPositionMs: g = 0,
    onSeek: m,
    width: b = Q2,
    height: v = K2
  } = n, S = x.useRef(null), w = x.useRef(null), j = x.useRef(null), T = q2(a, b), _ = Y2();
  x.useEffect(() => {
    Z2(S.current, T.peaks, b, v);
  }, [T.peaks, b, v]);
  const C = x.useCallback(
    (M) => {
      const B = w.current?.getBoundingClientRect();
      if (!B || B.width <= 0) return 0;
      const J = Math.max(0, Math.min(1, (M - B.left) / B.width));
      return Math.round(J * r);
    },
    [r]
  );
  x.useEffect(() => {
    const M = (J) => {
      if (!j.current) return;
      const se = C(J.clientX);
      j.current === "start" ? c(Xo(se, 0, o - 1)) : h(Xo(se, s + 1, r));
    }, B = () => {
      j.current = null;
    };
    return window.addEventListener("pointermove", M), window.addEventListener("pointerup", B), () => {
      window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", B);
    };
  }, [C, r, o, s, c, h]);
  const z = (M) => (B) => {
    B.preventDefault(), B.stopPropagation(), j.current = M;
  }, O = (M) => {
    !m || M.target.closest("[data-handle]") || m(C(M.clientX));
  }, R = (M) => (B) => {
    const J = B.shiftKey ? 100 : B.ctrlKey ? 1 : 10;
    let se = 0;
    if (B.key === "ArrowLeft") se = -J;
    else if (B.key === "ArrowRight") se = J;
    else return;
    B.preventDefault(), M === "start" ? c(Xo(s + se, 0, o - 1)) : h(Xo(o + se, s + 1, r));
  }, X = gf(s, r), $ = gf(o, r), Q = gf(g, r);
  return /* @__PURE__ */ f.jsxs(
    "div",
    {
      ref: w,
      className: F2,
      style: { height: v },
      onPointerDown: O,
      children: [
        /* @__PURE__ */ f.jsx(
          "canvas",
          {
            ref: S,
            width: b,
            height: v,
            className: G2,
            "aria-label": "Audio waveform"
          }
        ),
        T.isLoading && /* @__PURE__ */ f.jsx("div", { className: S0, children: "Decoding waveform…" }),
        T.error && /* @__PURE__ */ f.jsx("div", { className: S0, role: "alert", children: T.error }),
        /* @__PURE__ */ f.jsx("div", { className: x0, style: { left: 0, width: `${X}%` } }),
        /* @__PURE__ */ f.jsx(
          "div",
          {
            className: x0,
            style: { left: `${$}%`, right: 0, width: `${100 - $}%` }
          }
        ),
        /* @__PURE__ */ f.jsxs(
          "div",
          {
            className: v0,
            style: { left: `${X}%` },
            role: "slider",
            "aria-label": "Region start",
            "aria-valuemin": 0,
            "aria-valuemax": r,
            "aria-valuenow": s,
            tabIndex: 0,
            onPointerDown: z("start"),
            onKeyDown: R("start"),
            "data-handle": "start",
            children: [
              /* @__PURE__ */ f.jsx("span", { className: y0, "aria-hidden": "true" }),
              /* @__PURE__ */ f.jsx("span", { className: b0, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ f.jsxs(
          "div",
          {
            className: v0,
            style: { left: `${$}%` },
            role: "slider",
            "aria-label": "Region end",
            "aria-valuemin": 0,
            "aria-valuemax": r,
            "aria-valuenow": o,
            tabIndex: 0,
            onPointerDown: z("end"),
            onKeyDown: R("end"),
            "data-handle": "end",
            children: [
              /* @__PURE__ */ f.jsx("span", { className: y0, "aria-hidden": "true" }),
              /* @__PURE__ */ f.jsx("span", { className: b0, "aria-hidden": "true" })
            ]
          }
        ),
        p && /* @__PURE__ */ f.jsx(
          "div",
          {
            className: X2,
            style: {
              left: `${Q}%`,
              transition: _ ? "none" : void 0
            },
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function gf(n, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(100, n / a * 100));
}
function Xo(n, a, r) {
  return Math.max(a, Math.min(r, n));
}
function Z2(n, a, r, s) {
  if (!n) return;
  const o = n.getContext("2d");
  if (!o || (o.clearRect(0, 0, r, s), !a || a.length === 0)) return;
  const c = s / 2;
  o.fillStyle = P2(n, "--color-primary", "#ba9eff");
  const h = Math.min(a.length, r);
  for (let p = 0; p < h; p += 1) {
    const g = a[p] ?? 0, m = Math.max(1, g * (s - 4));
    o.fillRect(p, c - m / 2, 1, m);
  }
}
function P2(n, a, r) {
  return getComputedStyle(n).getPropertyValue(a).trim() || r;
}
var J2 = "r8lfsm0", W2 = "r8lfsm1", e_ = "r8lfsm2", t_ = "r8lfsm3", n_ = "r8lfsm4", a_ = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, i_ = "_1b1zchy3", r_ = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, l_ = "_1b1zchy6", s_ = "_1b1zchy7";
const vx = x.createContext("standalone");
function yx({
  variant: n = "standalone",
  children: a,
  className: r,
  style: s,
  ...o
}) {
  const c = [a_[n], r].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsx(vx.Provider, { value: n, children: /* @__PURE__ */ f.jsx("div", { className: c, style: s, ...o, children: a }) });
}
function bx({
  title: n,
  meta: a,
  children: r,
  className: s,
  titleId: o
}) {
  const c = x.useContext(vx), h = [i_, s].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsxs("div", { className: h, children: [
    /* @__PURE__ */ f.jsx("h3", { id: o, className: r_[c], children: n }),
    a ? /* @__PURE__ */ f.jsx("span", { className: l_, children: a }) : null,
    r
  ] });
}
function xx({
  children: n,
  className: a,
  role: r = "group"
}) {
  const s = [s_, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsx("div", { className: s, role: r, children: n });
}
const w0 = -16, o_ = 80, u_ = 720;
function c_(n) {
  const { deploymentId: a, runId: r, utterance: s, audioUrl: o, onApplied: c, onError: h, onCancel: p } = n, g = s.durationMs ?? 0, [m, b] = x.useState(() => E0(g)), [v, S] = x.useState(Mu), [w, j] = x.useState(!1), [T, _] = x.useState(!1), [C, z] = x.useState(null), [O, R] = x.useState(!1), X = x.useRef(null), $ = x.useRef(null), Q = x.useRef(null);
  x.useEffect(() => {
    const q = E0(g);
    b(q), S(ox(q)), _(!1), z(null), Q.current = null;
  }, [s.utteranceId, g]);
  const M = x.useCallback((q) => {
    S(q), b((Z) => sx(Z, q));
  }, []);
  x.useEffect(() => () => $.current?.abort(), []), x.useEffect(() => {
    X.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [s.utteranceId]);
  const B = x.useCallback(
    (q) => {
      q.key === "Escape" && (q.stopPropagation(), p());
    },
    [p]
  ), J = x.useMemo(
    () => m.ops.find((q) => q.mode === "trim"),
    [m.ops]
  ), se = J?.start_ms ?? 0, oe = J?.end_ms ?? Math.max(1, g), be = x.useCallback((q, Z) => {
    b((ae) => d_(ae, "trim", (N) => ({
      ...N,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(q)),
      end_ms: Math.max(Math.floor(q) + 1, Math.floor(Z))
    })));
  }, []), Se = x.useCallback((q) => be(q, oe), [oe, be]), le = x.useCallback((q) => be(se, q), [se, be]), U = x.useCallback((q) => {
    _(q), b((Z) => {
      const ae = Z.ops.filter((N) => N.mode !== "normalize");
      if (q) {
        const N = {
          id: vn(),
          mode: "normalize",
          target_lufs: w0
        };
        return { ...Z, ops: [...ae, N] };
      }
      return { ...Z, ops: ae };
    });
  }, []), k = x.useCallback(async () => {
    const q = Jb(m, g);
    if (q) {
      z(q.message);
      return;
    }
    if (z(null), O) return;
    $.current?.abort();
    const Z = new AbortController();
    $.current = Z, R(!0);
    try {
      const ae = Q.current ?? void 0, N = await kC(
        a,
        r,
        s.utteranceId,
        ae ? { chain: m, digest_before: ae } : { chain: m },
        { signal: Z.signal }
      );
      if (Z.signal.aborted) return;
      Q.current = N.chain_digest, c(N);
    } catch (ae) {
      if (Z.signal.aborted) return;
      ae instanceof Kr && (Q.current = ae.currentDigest || null);
      const N = ae instanceof Kr ? "Edit chain has changed in another tab. Reload to continue." : ae instanceof Error ? ae.message : "apply failed";
      z(N), h(N);
    } finally {
      Z.signal.aborted || R(!1);
    }
  }, [m, g, O, a, r, s.utteranceId, c, h]);
  return /* @__PURE__ */ f.jsx(yx, { variant: "nested", children: /* @__PURE__ */ f.jsxs("div", { ref: X, onKeyDown: B, children: [
    /* @__PURE__ */ f.jsx(bx, { title: "Edit segment", meta: `Source · ${Ko(g)}` }),
    /* @__PURE__ */ f.jsx(
      gx,
      {
        audioUrl: o,
        durationMs: Math.max(1, g),
        startMs: se,
        endMs: oe,
        onChangeStart: Se,
        onChangeEnd: le,
        height: o_,
        width: u_
      }
    ),
    /* @__PURE__ */ f.jsxs("div", { className: J2, children: [
      /* @__PURE__ */ f.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ f.jsxs("span", { className: W2, children: [
        Ko(se),
        " → ",
        Ko(oe),
        " · ",
        Ko(oe - se)
      ] })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: e_, children: [
      /* @__PURE__ */ f.jsxs("label", { className: t_, children: [
        /* @__PURE__ */ f.jsx(
          "input",
          {
            type: "checkbox",
            checked: T,
            onChange: (q) => U(q.currentTarget.checked),
            "aria-label": "Toggle loudness normalization"
          }
        ),
        /* @__PURE__ */ f.jsxs("span", { children: [
          "Normalize to ",
          w0.toFixed(0),
          " LUFS (broadcast-friendly)"
        ] })
      ] }),
      /* @__PURE__ */ f.jsxs(
        "button",
        {
          type: "button",
          className: n_,
          onClick: () => j((q) => !q),
          "aria-expanded": w,
          children: [
            w ? "▾" : "▸",
            " Advanced effects · gain · eq · pitch · fade · silence trim"
          ]
        }
      )
    ] }),
    w && /* @__PURE__ */ f.jsx(
      wh,
      {
        state: v,
        onChange: M,
        supportsSynthSpeed: !1
      }
    ),
    /* @__PURE__ */ f.jsxs(xx, { children: [
      /* @__PURE__ */ f.jsx(Ze, { size: "sm", onClick: () => void k(), disabled: O, children: O ? "Applying…" : "Apply" }),
      /* @__PURE__ */ f.jsx(Ze, { variant: "ghost", size: "sm", onClick: p, disabled: O, children: "Cancel" })
    ] }),
    C && /* @__PURE__ */ f.jsx(_n, { severity: "error", children: C })
  ] }) });
}
function E0(n) {
  return n <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: vn(),
    mode: "trim",
    start_ms: 0,
    end_ms: n
  }] };
}
function d_(n, a, r) {
  const s = n.ops.findIndex((c) => c.mode === a);
  if (s === -1) {
    const c = { id: vn(), mode: a };
    return { ...n, ops: [...n.ops, r(c)] };
  }
  const o = [...n.ops];
  return o[s] = r(o[s]), { ...n, ops: o };
}
function Ko(n) {
  return !Number.isFinite(n) || n < 0 ? "0.0s" : n < 1e3 ? `${Math.round(n)} ms` : `${(Math.round(n / 100) / 10).toFixed(1)}s`;
}
var f_ = "jq2zyb2", h_ = "jq2zyb3", m_ = "jq2zyb4", p_ = "jq2zyb5", g_ = "jq2zyb6", v_ = "jq2zyb7", y_ = "jq2zyb8", b_ = "jq2zyb9", x_ = "jq2zyba", S_ = "jq2zybb", w_ = "jq2zybc", E_ = "jq2zybd", j_ = "jq2zybe", T_ = "jq2zybf jq2zybe", C_ = "jq2zybg", N_ = "jq2zybh", M_ = "jq2zybi", R_ = "jq2zybj", A_ = "jq2zybk", __ = "jq2zybl", D_ = "jq2zybm", z_ = "jq2zybn", O_ = "jq2zybo", L_ = "jq2zybp", U_ = "jq2zybq", k_ = "jq2zybr", V_ = "jq2zybs", B_ = "jq2zybt", H_ = "jq2zybu", q_ = "jq2zybv", $_ = "jq2zybw", I_ = "jq2zybx", Y_ = "jq2zyby", F_ = "jq2zybz", j0 = "jq2zyb10", G_ = "jq2zyb11", X_ = "jq2zyb12", K_ = "jq2zyb13", Q_ = "jq2zyb14";
const Z_ = ["cancelled", "failed", "partial"], P_ = 2600;
function J_() {
  const { run: n } = Ss(), a = Pr(), [r, s] = x.useState(n), [o, c] = x.useState(!1), [h, p] = x.useState(null), [g, m] = x.useState(null), [b, v] = x.useState(
    null
  );
  x.useEffect(() => {
    s(n);
  }, [n]), x.useEffect(() => {
    if (!b) return;
    const R = setTimeout(() => v(null), P_);
    return () => clearTimeout(R);
  }, [b]);
  const S = x.useMemo(() => t3(r), [r]), w = Z_.includes(r.status) && r.kind === "batch", j = (r.exportZipStaleAt ?? null) !== null, T = async () => {
    if (r.deploymentId) {
      c(!0), p(null);
      try {
        const { runId: R } = await Qb(r.deploymentId, r.runId);
        a(`/${r.deploymentId}/runs/${R}`);
      } catch (R) {
        p(i3(R));
      } finally {
        c(!1);
      }
    }
  }, _ = x.useCallback((R) => {
    m((X) => X === R ? null : R);
  }, []), C = x.useCallback(() => {
    m(null);
  }, []), z = (R, X) => {
    s(($) => e3($, R, X)), m(null), v({ message: "Segment edited", severity: "success" });
  }, O = x.useCallback((R) => {
    v({ message: R, severity: "error" });
  }, []);
  return /* @__PURE__ */ f.jsxs("main", { className: f_, children: [
    /* @__PURE__ */ f.jsxs("div", { className: h_, children: [
      /* @__PURE__ */ f.jsxs("header", { className: m_, children: [
        /* @__PURE__ */ f.jsxs("p", { className: p_, children: [
          r.deploymentId ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
            /* @__PURE__ */ f.jsx(Cu, { to: `/${r.deploymentId}/recipe`, className: g_, children: "← Back to recipe" }),
            /* @__PURE__ */ f.jsx("span", { className: v_, children: "·" })
          ] }) : null,
          /* @__PURE__ */ f.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ f.jsxs("div", { className: y_, children: [
          /* @__PURE__ */ f.jsxs("h1", { className: b_, children: [
            n3(r.kind),
            /* @__PURE__ */ f.jsx("span", { className: x_, children: r.runId })
          ] }),
          /* @__PURE__ */ f.jsx(bi, { size: "md", tone: r3(r.status), pulse: r.status === "running", children: r.status })
        ] })
      ] }),
      /* @__PURE__ */ f.jsxs("section", { className: S_, "aria-label": "Run statistics", children: [
        /* @__PURE__ */ f.jsx(Qo, { label: "Format", value: r.outputFormat.toUpperCase(), mono: !0 }),
        /* @__PURE__ */ f.jsx(Qo, { label: "Speed", value: `${r.speedFactor.toFixed(2)}×`, mono: !0 }),
        /* @__PURE__ */ f.jsx(
          Qo,
          {
            label: "Completed",
            value: `${S.completed} / ${S.total}`,
            progress: S.total > 0 ? S.completed / S.total : 0
          }
        ),
        /* @__PURE__ */ f.jsx(
          Qo,
          {
            label: "Cache hit",
            value: `${S.cacheRatio}%`,
            progress: S.cacheRatio / 100
          }
        )
      ] }),
      w && /* @__PURE__ */ f.jsxs("section", { className: N_, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ f.jsxs("div", { className: M_, children: [
          /* @__PURE__ */ f.jsx("h2", { id: "run-detail-resume-title", className: R_, children: S.failed > 0 ? `${S.failed} line${S.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ f.jsx("p", { className: A_, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ f.jsx(Ze, { size: "lg", disabled: o, onClick: () => void T(), children: o ? "Resuming…" : S.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        h && /* @__PURE__ */ f.jsx("p", { className: __, role: "alert", children: h })
      ] }),
      /* @__PURE__ */ f.jsxs(Ua, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ f.jsxs(FT, { children: [
          /* @__PURE__ */ f.jsx("h2", { id: "run-detail-utterances", className: Zi, children: "01 / Utterances" }),
          S.completed > 0 && /* @__PURE__ */ f.jsxs("span", { className: D_, children: [
            /* @__PURE__ */ f.jsx("span", { className: z_, children: S.cached }),
            "/",
            S.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ f.jsx("ul", { className: O_, children: r.utterances.map((R) => {
          const X = g === R.utteranceId, $ = R.status === "completed" && R.audioArtifactRef !== null && R.audioArtifactRef !== void 0, Q = R.derivedArtifactRef ?? R.audioArtifactRef ?? null, M = Q ? `/api/v1/artifacts/${encodeURIComponent(Q)}/download` : "", B = (R.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ f.jsxs("li", { className: U_, children: [
            /* @__PURE__ */ f.jsxs("div", { className: L_, children: [
              /* @__PURE__ */ f.jsxs("span", { className: B_, children: [
                "#",
                R.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ f.jsx("span", { className: H_, title: R.characterDisplay, children: R.characterDisplay }),
              /* @__PURE__ */ f.jsx("span", { className: q_, title: R.text, children: R.text }),
              /* @__PURE__ */ f.jsxs("span", { className: $_, children: [
                R.cacheHit && /* @__PURE__ */ f.jsx("span", { className: I_, children: "cached" }),
                B && /* @__PURE__ */ f.jsx("span", { className: k_, children: "edited" }),
                R.durationMs ? /* @__PURE__ */ f.jsx("span", { children: a3(R.durationMs) }) : null,
                /* @__PURE__ */ f.jsx(bi, { tone: l3(R.status), children: R.status }),
                $ && /* @__PURE__ */ f.jsx(
                  "button",
                  {
                    type: "button",
                    className: V_,
                    onClick: () => _(R.utteranceId),
                    "aria-expanded": X,
                    "aria-label": X ? "Close segment editor" : "Edit segment",
                    children: X ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            X && M && r.deploymentId && /* @__PURE__ */ f.jsx(
              c_,
              {
                deploymentId: r.deploymentId,
                runId: r.runId,
                utterance: R,
                audioUrl: M,
                onApplied: (J) => z(R.utteranceId, J),
                onError: O,
                onCancel: C
              }
            )
          ] }, R.utteranceId);
        }) })
      ] }),
      W_(r, j)
    ] }),
    b && /* @__PURE__ */ f.jsx(
      "div",
      {
        className: Q_,
        role: b.severity === "error" ? "alert" : "status",
        "aria-live": b.severity === "error" ? "assertive" : "polite",
        children: b.message
      }
    )
  ] });
}
function W_(n, a) {
  if (!n.exportArtifactRef && !a) return null;
  const s = !!n.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ f.jsx("div", { className: Y_, children: a ? /* @__PURE__ */ f.jsxs("div", { className: G_, children: [
    /* @__PURE__ */ f.jsx("p", { className: X_, children: s }),
    /* @__PURE__ */ f.jsxs(
      "button",
      {
        type: "button",
        className: K_,
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ f.jsx("span", { className: j0, children: "↻" })
        ]
      }
    )
  ] }) : n.exportArtifactRef ? /* @__PURE__ */ f.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${n.exportArtifactRef}/download`,
      download: !0,
      className: F_,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ f.jsx("span", { className: j0, children: "↓" })
      ]
    }
  ) : null });
}
function e3(n, a, r) {
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
function Qo({ label: n, value: a, mono: r, progress: s }) {
  const o = s !== void 0 ? Math.min(1, Math.max(0, s)) : void 0;
  return /* @__PURE__ */ f.jsxs(
    "div",
    {
      className: w_,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ f.jsx("span", { className: E_, children: n }),
        /* @__PURE__ */ f.jsx("span", { className: r ? T_ : j_, children: a }),
        o !== void 0 && /* @__PURE__ */ f.jsx("span", { className: C_, "aria-hidden": "true" })
      ]
    }
  );
}
function t3(n) {
  const a = n.utterances.length, r = n.utterances.filter((h) => h.status === "completed").length, s = n.utterances.filter(
    (h) => h.status === "failed" || h.status === "cancelled"
  ).length, o = n.utterances.filter((h) => h.cacheHit).length, c = r > 0 ? Math.round(o / r * 100) : 0;
  return { total: a, completed: r, failed: s, cached: o, cacheRatio: c };
}
function n3(n) {
  switch (n) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function a3(n) {
  return n < 1e3 ? `${n} ms` : `${(n / 1e3).toFixed(n < 1e4 ? 2 : 1)} s`;
}
function i3(n) {
  return n instanceof Jr ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
function r3(n) {
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
function l3(n) {
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
var s3 = "pcphqj2", o3 = "pcphqj3", u3 = "pcphqj4", c3 = "pcphqj5", d3 = "pcphqj6", f3 = "pcphqj7", h3 = "pcphqj8", m3 = "pcphqj9", p3 = "pcphqja", T0 = "pcphqjb", g3 = "pcphqjc", v3 = "pcphqjd", y3 = "pcphqje pcphqjd", b3 = "pcphqjf", x3 = "pcphqjg", S3 = "pcphqjh", w3 = "pcphqji", E3 = "pcphqjj pcphqji", j3 = "pcphqjk pcphqji", T3 = "pcphqjl pcphqji", C3 = "pcphqjm", vf = "pcphqjn", yf = "pcphqjo";
function N3() {
  const [n, a] = x.useState(null), [r, s] = x.useState(null);
  return x.useEffect(() => {
    let o = !1;
    const c = async () => {
      try {
        const p = await vt("/runtime/queue");
        o || (a(p.entries), s(null));
      } catch (p) {
        o || s(p instanceof Error ? p.message : "Unknown error");
      }
    };
    c();
    const h = setInterval(() => void c(), 3e3);
    return () => {
      o = !0, clearInterval(h);
    };
  }, []), /* @__PURE__ */ f.jsx("main", { className: s3, children: /* @__PURE__ */ f.jsxs("div", { className: o3, children: [
    /* @__PURE__ */ f.jsxs("header", { className: u3, children: [
      /* @__PURE__ */ f.jsx("p", { className: c3, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ f.jsxs("div", { className: d3, children: [
        /* @__PURE__ */ f.jsx("h1", { className: f3, children: "Queue" }),
        /* @__PURE__ */ f.jsx("span", { className: h3, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ f.jsx("p", { className: m3, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    r ? /* @__PURE__ */ f.jsx(_n, { severity: "error", children: r }) : n === null ? null : n.length === 0 ? /* @__PURE__ */ f.jsx(Ua, { density: "compact", children: /* @__PURE__ */ f.jsx(ws, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ f.jsxs(Ua, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ f.jsx("h2", { id: "runtime-queue-section", className: Zi, children: "01 / In flight" }),
      /* @__PURE__ */ f.jsx("ul", { className: p3, children: n.map((o) => {
        const c = o.position === 1;
        return /* @__PURE__ */ f.jsxs(
          "li",
          {
            className: c ? `${T0} ${g3}` : T0,
            children: [
              /* @__PURE__ */ f.jsx("span", { className: c ? y3 : v3, children: o.position }),
              /* @__PURE__ */ f.jsxs("span", { className: b3, children: [
                /* @__PURE__ */ f.jsx("span", { className: x3, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ f.jsx("span", { className: S3, children: o.runId })
              ] }),
              /* @__PURE__ */ f.jsx("span", { className: M3(o.kind), children: R3(o.kind) }),
              /* @__PURE__ */ f.jsx("span", { className: C3, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
                /* @__PURE__ */ f.jsx("span", { className: vf, children: A3(o.etaSeconds) }),
                /* @__PURE__ */ f.jsx("span", { className: yf, children: "eta" })
              ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
                /* @__PURE__ */ f.jsx("span", { className: vf, children: o.utteranceTotal }),
                /* @__PURE__ */ f.jsx("span", { className: yf, children: "lines" })
              ] }) : /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
                /* @__PURE__ */ f.jsx("span", { className: vf, children: "—" }),
                /* @__PURE__ */ f.jsx("span", { className: yf, children: "pending" })
              ] }) })
            ]
          },
          o.runId
        );
      }) })
    ] })
  ] }) });
}
function M3(n) {
  switch (n) {
    case "batch":
      return E3;
    case "test_line":
      return j3;
    case "resume":
      return T3;
    default:
      return w3;
  }
}
function R3(n) {
  switch (n) {
    case "test_line":
      return "test line";
    default:
      return n;
  }
}
function A3(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60), r = n % 60;
  return r === 0 ? `${a}m` : `${a}m ${r}s`;
}
function _3() {
  const { deploymentId: n, prefillCharacterName: a } = Ss(), r = Pr(), [s, o] = x.useState(a), [c, h] = x.useState(""), [p, g] = x.useState("none"), [m, b] = x.useState(!1), [v, S] = x.useState(null), w = x.useRef(null);
  x.useEffect(() => {
    w.current?.scrollIntoView({ behavior: "smooth", block: "center" }), w.current?.focus();
  }, []);
  const j = async (T) => {
    T.preventDefault(), b(!0), S(null);
    try {
      await yh(n, {
        characterName: s,
        speakerVoiceAssetId: c,
        defaultEmotionMode: p
      }), r(`/${n}/recipe`);
    } catch (_) {
      S(_ instanceof Error ? _.message : "failed");
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
        /* @__PURE__ */ f.jsxs("select", { value: p, onChange: (T) => g(T.currentTarget.value), children: [
          /* @__PURE__ */ f.jsx("option", { value: "none", children: "None" }),
          /* @__PURE__ */ f.jsx("option", { value: "audio_ref", children: "Audio ref" }),
          /* @__PURE__ */ f.jsx("option", { value: "vector_preset", children: "Vector preset" }),
          /* @__PURE__ */ f.jsx("option", { value: "qwen_template", children: "Qwen template" })
        ] })
      ] }),
      /* @__PURE__ */ f.jsx(Ze, { type: "submit", variant: "primary", disabled: m, children: "Save mapping" }),
      v && /* @__PURE__ */ f.jsx(_n, { severity: "error", children: v })
    ] })
  ] });
}
const Sx = x.createContext({});
function Eh(n) {
  const a = x.useRef(null);
  return a.current === null && (a.current = n()), a.current;
}
const D3 = typeof window < "u", wx = D3 ? x.useLayoutEffect : x.useEffect, Ru = /* @__PURE__ */ x.createContext(null);
function z3(n, a) {
  n.indexOf(a) === -1 && n.push(a);
}
function O3(n, a) {
  const r = n.indexOf(a);
  r > -1 && n.splice(r, 1);
}
const xi = (n, a, r) => r > a ? a : r < n ? n : r;
function C0(n, a) {
  return a ? `${n}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : n;
}
let Es = () => {
}, Qr = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (Es = (n, a, r) => {
  !n && typeof console < "u" && console.warn(C0(a, r));
}, Qr = (n, a, r) => {
  if (!n)
    throw new Error(C0(a, r));
});
const Si = {}, Ex = (n) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);
function L3(n) {
  return typeof n == "object" && n !== null;
}
const jx = (n) => /^0[^.\s]+$/u.test(n);
// @__NO_SIDE_EFFECTS__
function Tx(n) {
  let a;
  return () => (a === void 0 && (a = n()), a);
}
const Wr = /* @__NO_SIDE_EFFECTS__ */ (n) => n, U3 = (n, a) => (r) => a(n(r)), Au = (...n) => n.reduce(U3), Cx = /* @__NO_SIDE_EFFECTS__ */ (n, a, r) => {
  const s = a - n;
  return s === 0 ? 1 : (r - n) / s;
};
class Nx {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return z3(this.subscriptions, a), () => O3(this.subscriptions, a);
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
const Fn = /* @__NO_SIDE_EFFECTS__ */ (n) => n * 1e3, ta = /* @__NO_SIDE_EFFECTS__ */ (n) => n / 1e3;
function Mx(n, a) {
  return a ? n * (1e3 / a) : 0;
}
const Rx = (n, a, r) => (((1 - 3 * r + 3 * a) * n + (3 * r - 6 * a)) * n + 3 * a) * n, k3 = 1e-7, V3 = 12;
function B3(n, a, r, s, o) {
  let c, h, p = 0;
  do
    h = a + (r - a) / 2, c = Rx(h, s, o) - n, c > 0 ? r = h : a = h;
  while (Math.abs(c) > k3 && ++p < V3);
  return h;
}
function js(n, a, r, s) {
  if (n === a && r === s)
    return Wr;
  const o = (c) => B3(c, 0, 1, n, r);
  return (c) => c === 0 || c === 1 ? c : Rx(o(c), a, s);
}
const Ax = (n) => (a) => a <= 0.5 ? n(2 * a) / 2 : (2 - n(2 * (1 - a))) / 2, _x = (n) => (a) => 1 - n(1 - a), Dx = /* @__PURE__ */ js(0.33, 1.53, 0.69, 0.99), jh = /* @__PURE__ */ _x(Dx), zx = /* @__PURE__ */ Ax(jh), Ox = (n) => n >= 1 ? 1 : (n *= 2) < 1 ? 0.5 * jh(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))), Th = (n) => 1 - Math.sin(Math.acos(n)), H3 = _x(Th), Lx = Ax(Th), q3 = /* @__PURE__ */ js(0.42, 0, 1, 1), $3 = /* @__PURE__ */ js(0, 0, 0.58, 1), Ux = /* @__PURE__ */ js(0.42, 0, 0.58, 1), I3 = (n) => Array.isArray(n) && typeof n[0] != "number", kx = (n) => Array.isArray(n) && typeof n[0] == "number", N0 = {
  linear: Wr,
  easeIn: q3,
  easeInOut: Ux,
  easeOut: $3,
  circIn: Th,
  circInOut: Lx,
  circOut: H3,
  backIn: jh,
  backInOut: zx,
  backOut: Dx,
  anticipate: Ox
}, Y3 = (n) => typeof n == "string", M0 = (n) => {
  if (kx(n)) {
    Qr(n.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, r, s, o] = n;
    return js(a, r, s, o);
  } else if (Y3(n))
    return Qr(N0[n] !== void 0, `Invalid easing type '${n}'`, "invalid-easing-type"), N0[n];
  return n;
}, Zo = [
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
function F3(n, a) {
  let r = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), o = !1, c = !1;
  const h = /* @__PURE__ */ new WeakSet();
  let p = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function g(b) {
    h.has(b) && (m.schedule(b), n()), b(p);
  }
  const m = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (b, v = !1, S = !1) => {
      const j = S && o ? r : s;
      return v && h.add(b), j.add(b), b;
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
      if (p = b, o) {
        c = !0;
        return;
      }
      o = !0;
      const v = r;
      r = s, s = v, r.forEach(g), r.clear(), o = !1, c && (c = !1, m.process(b));
    }
  };
  return m;
}
const G3 = 40;
function Vx(n, a) {
  let r = !1, s = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, c = () => r = !0, h = Zo.reduce((O, R) => (O[R] = F3(c), O), {}), { setup: p, read: g, resolveKeyframes: m, preUpdate: b, update: v, preRender: S, render: w, postRender: j } = h, T = () => {
    const O = Si.useManualTiming, R = O ? o.timestamp : performance.now();
    r = !1, O || (o.delta = s ? 1e3 / 60 : Math.max(Math.min(R - o.timestamp, G3), 1)), o.timestamp = R, o.isProcessing = !0, p.process(o), g.process(o), m.process(o), b.process(o), v.process(o), S.process(o), w.process(o), j.process(o), o.isProcessing = !1, r && a && (s = !1, n(T));
  }, _ = () => {
    r = !0, s = !0, o.isProcessing || n(T);
  };
  return { schedule: Zo.reduce((O, R) => {
    const X = h[R];
    return O[R] = ($, Q = !1, M = !1) => (r || _(), X.schedule($, Q, M)), O;
  }, {}), cancel: (O) => {
    for (let R = 0; R < Zo.length; R++)
      h[Zo[R]].cancel(O);
  }, state: o, steps: h };
}
const { schedule: Gn, cancel: kf, state: hu } = /* @__PURE__ */ Vx(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Wr, !0);
let su;
function X3() {
  su = void 0;
}
const An = {
  now: () => (su === void 0 && An.set(hu.isProcessing || Si.useManualTiming ? hu.timestamp : performance.now()), su),
  set: (n) => {
    su = n, queueMicrotask(X3);
  }
}, Bx = (n) => (a) => typeof a == "string" && a.startsWith(n), Hx = /* @__PURE__ */ Bx("--"), K3 = /* @__PURE__ */ Bx("var(--"), Ch = (n) => K3(n) ? Q3.test(n.split("/*")[0].trim()) : !1, Q3 = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function R0(n) {
  return typeof n != "string" ? !1 : n.split("/*")[0].includes("var(--");
}
const el = {
  test: (n) => typeof n == "number",
  parse: parseFloat,
  transform: (n) => n
}, ps = {
  ...el,
  transform: (n) => xi(0, 1, n)
}, Po = {
  ...el,
  default: 1
}, ls = (n) => Math.round(n * 1e5) / 1e5, Nh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Z3(n) {
  return n == null;
}
const P3 = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Mh = (n, a) => (r) => !!(typeof r == "string" && P3.test(r) && r.startsWith(n) || a && !Z3(r) && Object.prototype.hasOwnProperty.call(r, a)), qx = (n, a, r) => (s) => {
  if (typeof s != "string")
    return s;
  const [o, c, h, p] = s.match(Nh);
  return {
    [n]: parseFloat(o),
    [a]: parseFloat(c),
    [r]: parseFloat(h),
    alpha: p !== void 0 ? parseFloat(p) : 1
  };
}, J3 = (n) => xi(0, 255, n), bf = {
  ...el,
  transform: (n) => Math.round(J3(n))
}, Ki = {
  test: /* @__PURE__ */ Mh("rgb", "red"),
  parse: /* @__PURE__ */ qx("red", "green", "blue"),
  transform: ({ red: n, green: a, blue: r, alpha: s = 1 }) => "rgba(" + bf.transform(n) + ", " + bf.transform(a) + ", " + bf.transform(r) + ", " + ls(ps.transform(s)) + ")"
};
function W3(n) {
  let a = "", r = "", s = "", o = "";
  return n.length > 5 ? (a = n.substring(1, 3), r = n.substring(3, 5), s = n.substring(5, 7), o = n.substring(7, 9)) : (a = n.substring(1, 2), r = n.substring(2, 3), s = n.substring(3, 4), o = n.substring(4, 5), a += a, r += r, s += s, o += o), {
    red: parseInt(a, 16),
    green: parseInt(r, 16),
    blue: parseInt(s, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const Vf = {
  test: /* @__PURE__ */ Mh("#"),
  parse: W3,
  transform: Ki.transform
}, Ts = /* @__NO_SIDE_EFFECTS__ */ (n) => ({
  test: (a) => typeof a == "string" && a.endsWith(n) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${n}`
}), hi = /* @__PURE__ */ Ts("deg"), Xr = /* @__PURE__ */ Ts("%"), Ee = /* @__PURE__ */ Ts("px"), eD = /* @__PURE__ */ Ts("vh"), tD = /* @__PURE__ */ Ts("vw"), A0 = {
  ...Xr,
  parse: (n) => Xr.parse(n) / 100,
  transform: (n) => Xr.transform(n * 100)
}, Yr = {
  test: /* @__PURE__ */ Mh("hsl", "hue"),
  parse: /* @__PURE__ */ qx("hue", "saturation", "lightness"),
  transform: ({ hue: n, saturation: a, lightness: r, alpha: s = 1 }) => "hsla(" + Math.round(n) + ", " + Xr.transform(ls(a)) + ", " + Xr.transform(ls(r)) + ", " + ls(ps.transform(s)) + ")"
}, Ut = {
  test: (n) => Ki.test(n) || Vf.test(n) || Yr.test(n),
  parse: (n) => Ki.test(n) ? Ki.parse(n) : Yr.test(n) ? Yr.parse(n) : Vf.parse(n),
  transform: (n) => typeof n == "string" ? n : n.hasOwnProperty("red") ? Ki.transform(n) : Yr.transform(n),
  getAnimatableNone: (n) => {
    const a = Ut.parse(n);
    return a.alpha = 0, Ut.transform(a);
  }
}, nD = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function aD(n) {
  return isNaN(n) && typeof n == "string" && (n.match(Nh)?.length || 0) + (n.match(nD)?.length || 0) > 0;
}
const $x = "number", Ix = "color", iD = "var", rD = "var(", _0 = "${}", lD = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Zr(n) {
  const a = n.toString(), r = [], s = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let c = 0;
  const p = a.replace(lD, (g) => (Ut.test(g) ? (s.color.push(c), o.push(Ix), r.push(Ut.parse(g))) : g.startsWith(rD) ? (s.var.push(c), o.push(iD), r.push(g)) : (s.number.push(c), o.push($x), r.push(parseFloat(g))), ++c, _0)).split(_0);
  return { values: r, split: p, indexes: s, types: o };
}
function sD(n) {
  return Zr(n).values;
}
function Yx({ split: n, types: a }) {
  const r = n.length;
  return (s) => {
    let o = "";
    for (let c = 0; c < r; c++)
      if (o += n[c], s[c] !== void 0) {
        const h = a[c];
        h === $x ? o += ls(s[c]) : h === Ix ? o += Ut.transform(s[c]) : o += s[c];
      }
    return o;
  };
}
function oD(n) {
  return Yx(Zr(n));
}
const uD = (n) => typeof n == "number" ? 0 : Ut.test(n) ? Ut.getAnimatableNone(n) : n, cD = (n, a) => typeof n == "number" ? a?.trim().endsWith("/") ? n : 0 : uD(n);
function dD(n) {
  const a = Zr(n);
  return Yx(a)(a.values.map((s, o) => cD(s, a.split[o])));
}
const na = {
  test: aD,
  parse: sD,
  createTransformer: oD,
  getAnimatableNone: dD
};
function xf(n, a, r) {
  return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? n + (a - n) * 6 * r : r < 1 / 2 ? a : r < 2 / 3 ? n + (a - n) * (2 / 3 - r) * 6 : n;
}
function fD({ hue: n, saturation: a, lightness: r, alpha: s }) {
  n /= 360, a /= 100, r /= 100;
  let o = 0, c = 0, h = 0;
  if (!a)
    o = c = h = r;
  else {
    const p = r < 0.5 ? r * (1 + a) : r + a - r * a, g = 2 * r - p;
    o = xf(g, p, n + 1 / 3), c = xf(g, p, n), h = xf(g, p, n - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(c * 255),
    blue: Math.round(h * 255),
    alpha: s
  };
}
function mu(n, a) {
  return (r) => r > 0 ? a : n;
}
const Cs = (n, a, r) => n + (a - n) * r, Sf = (n, a, r) => {
  const s = n * n, o = r * (a * a - s) + s;
  return o < 0 ? 0 : Math.sqrt(o);
}, hD = [Vf, Ki, Yr], mD = (n) => hD.find((a) => a.test(n));
function D0(n) {
  const a = mD(n);
  if (Es(!!a, `'${n}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let r = a.parse(n);
  return a === Yr && (r = fD(r)), r;
}
const z0 = (n, a) => {
  const r = D0(n), s = D0(a);
  if (!r || !s)
    return mu(n, a);
  const o = { ...r };
  return (c) => (o.red = Sf(r.red, s.red, c), o.green = Sf(r.green, s.green, c), o.blue = Sf(r.blue, s.blue, c), o.alpha = Cs(r.alpha, s.alpha, c), Ki.transform(o));
}, Bf = /* @__PURE__ */ new Set(["none", "hidden"]);
function pD(n, a) {
  return Bf.has(n) ? (r) => r <= 0 ? n : a : (r) => r >= 1 ? a : n;
}
function gD(n, a) {
  return (r) => Cs(n, a, r);
}
function Rh(n) {
  return typeof n == "number" ? gD : typeof n == "string" ? Ch(n) ? mu : Ut.test(n) ? z0 : bD : Array.isArray(n) ? Fx : typeof n == "object" ? Ut.test(n) ? z0 : vD : mu;
}
function Fx(n, a) {
  const r = [...n], s = r.length, o = n.map((c, h) => Rh(c)(c, a[h]));
  return (c) => {
    for (let h = 0; h < s; h++)
      r[h] = o[h](c);
    return r;
  };
}
function vD(n, a) {
  const r = { ...n, ...a }, s = {};
  for (const o in r)
    n[o] !== void 0 && a[o] !== void 0 && (s[o] = Rh(n[o])(n[o], a[o]));
  return (o) => {
    for (const c in s)
      r[c] = s[c](o);
    return r;
  };
}
function yD(n, a) {
  const r = [], s = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const c = a.types[o], h = n.indexes[c][s[c]], p = n.values[h] ?? 0;
    r[o] = p, s[c]++;
  }
  return r;
}
const bD = (n, a) => {
  const r = na.createTransformer(a), s = Zr(n), o = Zr(a);
  return s.indexes.var.length === o.indexes.var.length && s.indexes.color.length === o.indexes.color.length && s.indexes.number.length >= o.indexes.number.length ? Bf.has(n) && !o.values.length || Bf.has(a) && !s.values.length ? pD(n, a) : Au(Fx(yD(s, o), o.values), r) : (Es(!0, `Complex values '${n}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), mu(n, a));
};
function Gx(n, a, r) {
  return typeof n == "number" && typeof a == "number" && typeof r == "number" ? Cs(n, a, r) : Rh(n)(n, a);
}
const xD = (n) => {
  const a = ({ timestamp: r }) => n(r);
  return {
    start: (r = !0) => Gn.update(a, r),
    stop: () => kf(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => hu.isProcessing ? hu.timestamp : An.now()
  };
}, Xx = (n, a, r = 10) => {
  let s = "";
  const o = Math.max(Math.round(a / r), 2);
  for (let c = 0; c < o; c++)
    s += Math.round(n(c / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, pu = 2e4;
function Ah(n) {
  let a = 0;
  const r = 50;
  let s = n.next(a);
  for (; !s.done && a < pu; )
    a += r, s = n.next(a);
  return a >= pu ? 1 / 0 : a;
}
function SD(n, a = 100, r) {
  const s = r({ ...n, keyframes: [0, a] }), o = Math.min(Ah(s), pu);
  return {
    type: "keyframes",
    ease: (c) => s.next(o * c).value / a,
    duration: /* @__PURE__ */ ta(o)
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
function Hf(n, a) {
  return n * Math.sqrt(1 - a * a);
}
const wD = 12;
function ED(n, a, r) {
  let s = r;
  for (let o = 1; o < wD; o++)
    s = s - n(s) / a(s);
  return s;
}
const wf = 1e-3;
function jD({ duration: n = xt.duration, bounce: a = xt.bounce, velocity: r = xt.velocity, mass: s = xt.mass }) {
  let o, c;
  Es(n <= /* @__PURE__ */ Fn(xt.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let h = 1 - a;
  h = xi(xt.minDamping, xt.maxDamping, h), n = xi(xt.minDuration, xt.maxDuration, /* @__PURE__ */ ta(n)), h < 1 ? (o = (m) => {
    const b = m * h, v = b * n, S = b - r, w = Hf(m, h), j = Math.exp(-v);
    return wf - S / w * j;
  }, c = (m) => {
    const v = m * h * n, S = v * r + r, w = Math.pow(h, 2) * Math.pow(m, 2) * n, j = Math.exp(-v), T = Hf(Math.pow(m, 2), h);
    return (-o(m) + wf > 0 ? -1 : 1) * ((S - w) * j) / T;
  }) : (o = (m) => {
    const b = Math.exp(-m * n), v = (m - r) * n + 1;
    return -wf + b * v;
  }, c = (m) => {
    const b = Math.exp(-m * n), v = (r - m) * (n * n);
    return b * v;
  });
  const p = 5 / n, g = ED(o, c, p);
  if (n = /* @__PURE__ */ Fn(n), isNaN(g))
    return {
      stiffness: xt.stiffness,
      damping: xt.damping,
      duration: n
    };
  {
    const m = Math.pow(g, 2) * s;
    return {
      stiffness: m,
      damping: h * 2 * Math.sqrt(s * m),
      duration: n
    };
  }
}
const TD = ["duration", "bounce"], CD = ["stiffness", "damping", "mass"];
function O0(n, a) {
  return a.some((r) => n[r] !== void 0);
}
function ND(n) {
  let a = {
    velocity: xt.velocity,
    stiffness: xt.stiffness,
    damping: xt.damping,
    mass: xt.mass,
    isResolvedFromDuration: !1,
    ...n
  };
  if (!O0(n, CD) && O0(n, TD))
    if (a.velocity = 0, n.visualDuration) {
      const r = n.visualDuration, s = 2 * Math.PI / (r * 1.2), o = s * s, c = 2 * xi(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: xt.mass,
        stiffness: o,
        damping: c
      };
    } else {
      const r = jD({ ...n, velocity: 0 });
      a = {
        ...a,
        ...r,
        mass: xt.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function gu(n = xt.visualDuration, a = xt.bounce) {
  const r = typeof n != "object" ? {
    visualDuration: n,
    keyframes: [0, 1],
    bounce: a
  } : n;
  let { restSpeed: s, restDelta: o } = r;
  const c = r.keyframes[0], h = r.keyframes[r.keyframes.length - 1], p = { done: !1, value: c }, { stiffness: g, damping: m, mass: b, duration: v, velocity: S, isResolvedFromDuration: w } = ND({
    ...r,
    velocity: -/* @__PURE__ */ ta(r.velocity || 0)
  }), j = S || 0, T = m / (2 * Math.sqrt(g * b)), _ = h - c, C = /* @__PURE__ */ ta(Math.sqrt(g / b)), z = Math.abs(_) < 5;
  s || (s = z ? xt.restSpeed.granular : xt.restSpeed.default), o || (o = z ? xt.restDelta.granular : xt.restDelta.default);
  let O, R, X, $, Q, M;
  if (T < 1)
    X = Hf(C, T), $ = (j + T * C * _) / X, O = (J) => {
      const se = Math.exp(-T * C * J);
      return h - se * ($ * Math.sin(X * J) + _ * Math.cos(X * J));
    }, Q = T * C * $ + _ * X, M = T * C * _ - $ * X, R = (J) => Math.exp(-T * C * J) * (Q * Math.sin(X * J) + M * Math.cos(X * J));
  else if (T === 1) {
    O = (se) => h - Math.exp(-C * se) * (_ + (j + C * _) * se);
    const J = j + C * _;
    R = (se) => Math.exp(-C * se) * (C * J * se - j);
  } else {
    const J = C * Math.sqrt(T * T - 1);
    O = (Se) => {
      const le = Math.exp(-T * C * Se), U = Math.min(J * Se, 300);
      return h - le * ((j + T * C * _) * Math.sinh(U) + J * _ * Math.cosh(U)) / J;
    };
    const se = (j + T * C * _) / J, oe = T * C * se - _ * J, be = T * C * _ - se * J;
    R = (Se) => {
      const le = Math.exp(-T * C * Se), U = Math.min(J * Se, 300);
      return le * (oe * Math.sinh(U) + be * Math.cosh(U));
    };
  }
  const B = {
    calculatedDuration: w && v || null,
    velocity: (J) => /* @__PURE__ */ Fn(R(J)),
    next: (J) => {
      if (!w && T < 1) {
        const oe = Math.exp(-T * C * J), be = Math.sin(X * J), Se = Math.cos(X * J), le = h - oe * ($ * be + _ * Se), U = /* @__PURE__ */ Fn(oe * (Q * be + M * Se));
        return p.done = Math.abs(U) <= s && Math.abs(h - le) <= o, p.value = p.done ? h : le, p;
      }
      const se = O(J);
      if (w)
        p.done = J >= v;
      else {
        const oe = /* @__PURE__ */ Fn(R(J));
        p.done = Math.abs(oe) <= s && Math.abs(h - se) <= o;
      }
      return p.value = p.done ? h : se, p;
    },
    toString: () => {
      const J = Math.min(Ah(B), pu), se = Xx((oe) => B.next(J * oe).value, J, 30);
      return J + "ms " + se;
    },
    toTransition: () => {
    }
  };
  return B;
}
gu.applyToOptions = (n) => {
  const a = SD(n, 100, gu);
  return n.ease = a.ease, n.duration = /* @__PURE__ */ Fn(a.duration), n.type = "keyframes", n;
};
const MD = 5;
function Kx(n, a, r) {
  const s = Math.max(a - MD, 0);
  return Mx(r - n(s), a - s);
}
function qf({ keyframes: n, velocity: a = 0, power: r = 0.8, timeConstant: s = 325, bounceDamping: o = 10, bounceStiffness: c = 500, modifyTarget: h, min: p, max: g, restDelta: m = 0.5, restSpeed: b }) {
  const v = n[0], S = {
    done: !1,
    value: v
  }, w = (M) => p !== void 0 && M < p || g !== void 0 && M > g, j = (M) => p === void 0 ? g : g === void 0 || Math.abs(p - M) < Math.abs(g - M) ? p : g;
  let T = r * a;
  const _ = v + T, C = h === void 0 ? _ : h(_);
  C !== _ && (T = C - v);
  const z = (M) => -T * Math.exp(-M / s), O = (M) => C + z(M), R = (M) => {
    const B = z(M), J = O(M);
    S.done = Math.abs(B) <= m, S.value = S.done ? C : J;
  };
  let X, $;
  const Q = (M) => {
    w(S.value) && (X = M, $ = gu({
      keyframes: [S.value, j(S.value)],
      velocity: Kx(O, M, S.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: c,
      restDelta: m,
      restSpeed: b
    }));
  };
  return Q(0), {
    calculatedDuration: null,
    next: (M) => {
      let B = !1;
      return !$ && X === void 0 && (B = !0, R(M), Q(M)), X !== void 0 && M >= X ? $.next(M - X) : (!B && R(M), S);
    }
  };
}
function RD(n, a, r) {
  const s = [], o = r || Si.mix || Gx, c = n.length - 1;
  for (let h = 0; h < c; h++) {
    let p = o(n[h], n[h + 1]);
    if (a) {
      const g = Array.isArray(a) ? a[h] || Wr : a;
      p = Au(g, p);
    }
    s.push(p);
  }
  return s;
}
function AD(n, a, { clamp: r = !0, ease: s, mixer: o } = {}) {
  const c = n.length;
  if (Qr(c === a.length, "Both input and output ranges must be the same length", "range-length"), c === 1)
    return () => a[0];
  if (c === 2 && a[0] === a[1])
    return () => a[1];
  const h = n[0] === n[1];
  n[0] > n[c - 1] && (n = [...n].reverse(), a = [...a].reverse());
  const p = RD(a, s, o), g = p.length, m = (b) => {
    if (h && b < n[0])
      return a[0];
    let v = 0;
    if (g > 1)
      for (; v < n.length - 2 && !(b < n[v + 1]); v++)
        ;
    const S = /* @__PURE__ */ Cx(n[v], n[v + 1], b);
    return p[v](S);
  };
  return r ? (b) => m(xi(n[0], n[c - 1], b)) : m;
}
function _D(n, a) {
  const r = n[n.length - 1];
  for (let s = 1; s <= a; s++) {
    const o = /* @__PURE__ */ Cx(0, a, s);
    n.push(Cs(r, 1, o));
  }
}
function DD(n) {
  const a = [0];
  return _D(a, n.length - 1), a;
}
function zD(n, a) {
  return n.map((r) => r * a);
}
function OD(n, a) {
  return n.map(() => a || Ux).splice(0, n.length - 1);
}
function ss({ duration: n = 300, keyframes: a, times: r, ease: s = "easeInOut" }) {
  const o = I3(s) ? s.map(M0) : M0(s), c = {
    done: !1,
    value: a[0]
  }, h = zD(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    r && r.length === a.length ? r : DD(a),
    n
  ), p = AD(h, a, {
    ease: Array.isArray(o) ? o : OD(a, o)
  });
  return {
    calculatedDuration: n,
    next: (g) => (c.value = p(g), c.done = g >= n, c)
  };
}
const LD = (n) => n !== null;
function _u(n, { repeat: a, repeatType: r = "loop" }, s, o = 1) {
  const c = n.filter(LD), p = o < 0 || a && r !== "loop" && a % 2 === 1 ? 0 : c.length - 1;
  return !p || s === void 0 ? c[p] : s;
}
const UD = {
  decay: qf,
  inertia: qf,
  tween: ss,
  keyframes: ss,
  spring: gu
};
function Qx(n) {
  typeof n.type == "string" && (n.type = UD[n.type]);
}
class _h {
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
const kD = (n) => n / 100;
class vu extends _h {
  constructor(a) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: r } = this.options;
      r && r.updatedAt !== An.now() && this.tick(An.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = a, this.initAnimation(), this.play(), a.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: a } = this;
    Qx(a);
    const { type: r = ss, repeat: s = 0, repeatDelay: o = 0, repeatType: c, velocity: h = 0 } = a;
    let { keyframes: p } = a;
    const g = r || ss;
    g !== ss && typeof p[0] != "number" && (this.mixKeyframes = Au(kD, Gx(p[0], p[1])), p = [0, 100]);
    const m = g({ ...a, keyframes: p });
    c === "mirror" && (this.mirroredGenerator = g({
      ...a,
      keyframes: [...p].reverse(),
      velocity: -h
    })), m.calculatedDuration === null && (m.calculatedDuration = Ah(m));
    const { calculatedDuration: b } = m;
    this.calculatedDuration = b, this.resolvedDuration = b + o, this.totalDuration = this.resolvedDuration * (s + 1) - o, this.generator = m;
  }
  updateTime(a) {
    const r = Math.round(a - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = r;
  }
  tick(a, r = !1) {
    const { generator: s, totalDuration: o, mixKeyframes: c, mirroredGenerator: h, resolvedDuration: p, calculatedDuration: g } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: m = 0, keyframes: b, repeat: v, repeatType: S, repeatDelay: w, type: j, onUpdate: T, finalKeyframe: _ } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), r ? this.currentTime = a : this.updateTime(a);
    const C = this.currentTime - m * (this.playbackSpeed >= 0 ? 1 : -1), z = this.playbackSpeed >= 0 ? C < 0 : C > o;
    this.currentTime = Math.max(C, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let O = this.currentTime, R = s;
    if (v) {
      const M = Math.min(this.currentTime, o) / p;
      let B = Math.floor(M), J = M % 1;
      !J && M >= 1 && (J = 1), J === 1 && B--, B = Math.min(B, v + 1), !!(B % 2) && (S === "reverse" ? (J = 1 - J, w && (J -= w / p)) : S === "mirror" && (R = h)), O = xi(0, 1, J) * p;
    }
    let X;
    z ? (this.delayState.value = b[0], X = this.delayState) : X = R.next(O), c && !z && (X.value = c(X.value));
    let { done: $ } = X;
    !z && g !== null && ($ = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const Q = this.holdTime === null && (this.state === "finished" || this.state === "running" && $);
    return Q && j !== qf && (X.value = _u(b, this.options, _, this.speed)), T && T(X.value), Q && this.finish(), X;
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
    return /* @__PURE__ */ ta(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ ta(a);
  }
  get time() {
    return /* @__PURE__ */ ta(this.currentTime);
  }
  set time(a) {
    a = /* @__PURE__ */ Fn(a), this.currentTime = a, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = a : this.driver && (this.startTime = this.driver.now() - a / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = a, this.tick(a));
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
    return Kx((s) => this.generator.next(s).value, a, r);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(a) {
    const r = this.playbackSpeed !== a;
    r && this.driver && this.updateTime(An.now()), this.playbackSpeed = a, r && this.driver && (this.time = /* @__PURE__ */ ta(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: a = xD, startTime: r } = this.options;
    this.driver || (this.driver = a((o) => this.tick(o))), this.options.onPlay?.();
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = r ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(An.now()), this.holdTime = this.currentTime;
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
function VD(n) {
  for (let a = 1; a < n.length; a++)
    n[a] ?? (n[a] = n[a - 1]);
}
const Qi = (n) => n * 180 / Math.PI, $f = (n) => {
  const a = Qi(Math.atan2(n[1], n[0]));
  return If(a);
}, BD = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (n) => (Math.abs(n[0]) + Math.abs(n[3])) / 2,
  rotate: $f,
  rotateZ: $f,
  skewX: (n) => Qi(Math.atan(n[1])),
  skewY: (n) => Qi(Math.atan(n[2])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[2])) / 2
}, If = (n) => (n = n % 360, n < 0 && (n += 360), n), L0 = $f, U0 = (n) => Math.sqrt(n[0] * n[0] + n[1] * n[1]), k0 = (n) => Math.sqrt(n[4] * n[4] + n[5] * n[5]), HD = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: U0,
  scaleY: k0,
  scale: (n) => (U0(n) + k0(n)) / 2,
  rotateX: (n) => If(Qi(Math.atan2(n[6], n[5]))),
  rotateY: (n) => If(Qi(Math.atan2(-n[2], n[0]))),
  rotateZ: L0,
  rotate: L0,
  skewX: (n) => Qi(Math.atan(n[4])),
  skewY: (n) => Qi(Math.atan(n[1])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[4])) / 2
};
function Yf(n) {
  return n.includes("scale") ? 1 : 0;
}
function Ff(n, a) {
  if (!n || n === "none")
    return Yf(a);
  const r = n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, o;
  if (r)
    s = HD, o = r;
  else {
    const p = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = BD, o = p;
  }
  if (!o)
    return Yf(a);
  const c = s[a], h = o[1].split(",").map($D);
  return typeof c == "function" ? c(h) : h[c];
}
const qD = (n, a) => {
  const { transform: r = "none" } = getComputedStyle(n);
  return Ff(r, a);
};
function $D(n) {
  return parseFloat(n.trim());
}
const tl = [
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
], nl = new Set(tl), V0 = (n) => n === el || n === Ee, ID = /* @__PURE__ */ new Set(["x", "y", "z"]), YD = tl.filter((n) => !ID.has(n));
function FD(n) {
  const a = [];
  return YD.forEach((r) => {
    const s = n.getValue(r);
    s !== void 0 && (a.push([r, s.get()]), s.set(r.startsWith("scale") ? 1 : 0));
  }), a;
}
const yi = {
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
  x: (n, { transform: a }) => Ff(a, "x"),
  y: (n, { transform: a }) => Ff(a, "y")
};
yi.translateX = yi.x;
yi.translateY = yi.y;
const Pi = /* @__PURE__ */ new Set();
let Gf = !1, Xf = !1, Kf = !1;
function Zx() {
  if (Xf) {
    const n = Array.from(Pi).filter((s) => s.needsMeasurement), a = new Set(n.map((s) => s.element)), r = /* @__PURE__ */ new Map();
    a.forEach((s) => {
      const o = FD(s);
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
  Xf = !1, Gf = !1, Pi.forEach((n) => n.complete(Kf)), Pi.clear();
}
function Px() {
  Pi.forEach((n) => {
    n.readKeyframes(), n.needsMeasurement && (Xf = !0);
  });
}
function GD() {
  Kf = !0, Px(), Zx(), Kf = !1;
}
class Dh {
  constructor(a, r, s, o, c, h = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = r, this.name = s, this.motionValue = o, this.element = c, this.isAsync = h;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Pi.add(this), Gf || (Gf = !0, Gn.read(Px), Gn.resolveKeyframes(Zx))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, name: r, element: s, motionValue: o } = this;
    if (a[0] === null) {
      const c = o?.get(), h = a[a.length - 1];
      if (c !== void 0)
        a[0] = c;
      else if (s && r) {
        const p = s.readValue(r, h);
        p != null && (a[0] = p);
      }
      a[0] === void 0 && (a[0] = h), o && c === void 0 && o.set(a[0]);
    }
    VD(a);
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
const XD = (n) => n.startsWith("--");
function Jx(n, a, r) {
  XD(a) ? n.style.setProperty(a, r) : n.style[a] = r;
}
const KD = {};
function Wx(n, a) {
  const r = /* @__PURE__ */ Tx(n);
  return () => KD[a] ?? r();
}
const QD = /* @__PURE__ */ Wx(() => window.ScrollTimeline !== void 0, "scrollTimeline"), e1 = /* @__PURE__ */ Wx(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), as = ([n, a, r, s]) => `cubic-bezier(${n}, ${a}, ${r}, ${s})`, B0 = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ as([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ as([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ as([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ as([0.33, 1.53, 0.69, 0.99])
};
function t1(n, a) {
  if (n)
    return typeof n == "function" ? e1() ? Xx(n, a) : "ease-out" : kx(n) ? as(n) : Array.isArray(n) ? n.map((r) => t1(r, a) || B0.easeOut) : B0[n];
}
function ZD(n, a, r, { delay: s = 0, duration: o = 300, repeat: c = 0, repeatType: h = "loop", ease: p = "easeOut", times: g } = {}, m = void 0) {
  const b = {
    [a]: r
  };
  g && (b.offset = g);
  const v = t1(p, o);
  Array.isArray(v) && (b.easing = v);
  const S = {
    delay: s,
    duration: o,
    easing: Array.isArray(v) ? "linear" : v,
    fill: "both",
    iterations: c + 1,
    direction: h === "reverse" ? "alternate" : "normal"
  };
  return m && (S.pseudoElement = m), n.animate(b, S);
}
function n1(n) {
  return typeof n == "function" && "applyToOptions" in n;
}
function PD({ type: n, ...a }) {
  return n1(n) && e1() ? n.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class a1 extends _h {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: r, name: s, keyframes: o, pseudoElement: c, allowFlatten: h = !1, finalKeyframe: p, onComplete: g } = a;
    this.isPseudoElement = !!c, this.allowFlatten = h, this.options = a, Qr(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const m = PD(a);
    this.animation = ZD(r, s, o, m, c), m.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !c) {
        const b = _u(o, this.options, p, this.speed);
        this.updateMotionValue && this.updateMotionValue(b), Jx(r, s, b), this.animation.cancel();
      }
      g?.(), this.notifyFinished();
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
    return /* @__PURE__ */ ta(Number(a));
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ ta(a);
  }
  get time() {
    return /* @__PURE__ */ ta(Number(this.animation.currentTime) || 0);
  }
  set time(a) {
    const r = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Fn(a), r && this.animation.pause();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && QD() ? (this.animation.timeline = a, r && (this.animation.rangeStart = r), s && (this.animation.rangeEnd = s), Wr) : o(this);
  }
}
const i1 = {
  anticipate: Ox,
  backInOut: zx,
  circInOut: Lx
};
function JD(n) {
  return n in i1;
}
function WD(n) {
  typeof n.ease == "string" && JD(n.ease) && (n.ease = i1[n.ease]);
}
const Ef = 10;
class ez extends a1 {
  constructor(a) {
    WD(a), Qx(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const p = new vu({
      ...h,
      autoplay: !1
    }), g = Math.max(Ef, An.now() - this.startTime), m = xi(0, Ef, g - Ef), b = p.sample(g).value, { name: v } = this.options;
    c && v && Jx(c, v, b), r.setWithVelocity(p.sample(Math.max(0, g - m)).value, b, m), p.stop();
  }
}
const H0 = (n, a) => a === "zIndex" ? !1 : !!(typeof n == "number" || Array.isArray(n) || typeof n == "string" && // It's animatable if we have a string
(na.test(n) || n === "0") && // And it contains numbers and/or colors
!n.startsWith("url("));
function tz(n) {
  const a = n[0];
  if (n.length === 1)
    return !0;
  for (let r = 0; r < n.length; r++)
    if (n[r] !== a)
      return !0;
}
function nz(n, a, r, s) {
  const o = n[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const c = n[n.length - 1], h = H0(o, a), p = H0(c, a);
  return Es(h === p, `You are trying to animate ${a} from "${o}" to "${c}". "${h ? c : o}" is not an animatable value.`, "value-not-animatable"), !h || !p ? !1 : tz(n) || (r === "spring" || n1(r)) && s;
}
function Qf(n) {
  n.duration = 0, n.type = "keyframes";
}
const r1 = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), az = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function iz(n) {
  for (let a = 0; a < n.length; a++)
    if (typeof n[a] == "string" && az.test(n[a]))
      return !0;
  return !1;
}
const rz = /* @__PURE__ */ new Set([
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
]), lz = /* @__PURE__ */ Tx(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function sz(n) {
  const { motionValue: a, name: r, repeatDelay: s, repeatType: o, damping: c, type: h, keyframes: p } = n;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: m, transformTemplate: b } = a.owner.getProps();
  return lz() && r && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (r1.has(r) || rz.has(r) && iz(p)) && (r !== "transform" || !b) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !m && !s && o !== "mirror" && c !== 0 && h !== "inertia";
}
const oz = 40;
class uz extends _h {
  constructor({ autoplay: a = !0, delay: r = 0, type: s = "keyframes", repeat: o = 0, repeatDelay: c = 0, repeatType: h = "loop", keyframes: p, name: g, motionValue: m, element: b, ...v }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = An.now();
    const S = {
      autoplay: a,
      delay: r,
      type: s,
      repeat: o,
      repeatDelay: c,
      repeatType: h,
      name: g,
      motionValue: m,
      element: b,
      ...v
    }, w = b?.KeyframeResolver || Dh;
    this.keyframeResolver = new w(p, (j, T, _) => this.onKeyframesResolved(j, T, S, !_), g, m, b), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, r, s, o) {
    this.keyframeResolver = void 0;
    const { name: c, type: h, velocity: p, delay: g, isHandoff: m, onUpdate: b } = s;
    this.resolvedAt = An.now();
    let v = !0;
    nz(a, c, h, p) || (v = !1, (Si.instantAnimations || !g) && b?.(_u(a, s, r)), a[0] = a[a.length - 1], Qf(s), s.repeat = 0);
    const w = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > oz ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: r,
      ...s,
      keyframes: a
    }, j = v && !m && sz(w), T = w.motionValue?.owner?.current;
    let _;
    if (j)
      try {
        _ = new ez({
          ...w,
          element: T
        });
      } catch {
        _ = new vu(w);
      }
    else
      _ = new vu(w);
    _.finished.then(() => {
      this.notifyFinished();
    }).catch(Wr), this.pendingTimeline && (this.stopTimeline = _.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = _;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(a, r) {
    return this.finished.finally(a).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), GD()), this._animation;
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
function l1(n, a, r, s = 0, o = 1) {
  const c = Array.from(n).sort((m, b) => m.sortNodePosition(b)).indexOf(a), h = n.size, p = (h - 1) * s;
  return typeof r == "function" ? r(c, h) : o === 1 ? c * s : p - c * s;
}
const cz = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function dz(n) {
  const a = cz.exec(n);
  if (!a)
    return [,];
  const [, r, s, o] = a;
  return [`--${r ?? s}`, o];
}
const fz = 4;
function s1(n, a, r = 1) {
  Qr(r <= fz, `Max CSS variable fallback depth detected in property "${n}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, o] = dz(n);
  if (!s)
    return;
  const c = window.getComputedStyle(a).getPropertyValue(s);
  if (c) {
    const h = c.trim();
    return Ex(h) ? parseFloat(h) : h;
  }
  return Ch(o) ? s1(o, a, r + 1) : o;
}
const hz = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, mz = (n) => ({
  type: "spring",
  stiffness: 550,
  damping: n === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), pz = {
  type: "keyframes",
  duration: 0.8
}, gz = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, vz = (n, { keyframes: a }) => a.length > 2 ? pz : nl.has(n) ? n.startsWith("scale") ? mz(a[1]) : hz : gz;
function o1(n, a) {
  if (n?.inherit && a) {
    const { inherit: r, ...s } = n;
    return { ...a, ...s };
  }
  return n;
}
function u1(n, a) {
  const r = n?.[a] ?? n?.default ?? n;
  return r !== n ? o1(r, n) : r;
}
const yz = /* @__PURE__ */ new Set([
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
function bz(n) {
  for (const a in n)
    if (!yz.has(a))
      return !0;
  return !1;
}
const xz = (n, a, r, s = {}, o, c) => (h) => {
  const p = u1(s, n) || {}, g = p.delay || s.delay || 0;
  let { elapsed: m = 0 } = s;
  m = m - /* @__PURE__ */ Fn(g);
  const b = {
    keyframes: Array.isArray(r) ? r : [null, r],
    ease: "easeOut",
    velocity: a.getVelocity(),
    ...p,
    delay: -m,
    onUpdate: (S) => {
      a.set(S), p.onUpdate && p.onUpdate(S);
    },
    onComplete: () => {
      h(), p.onComplete && p.onComplete();
    },
    name: n,
    motionValue: a,
    element: c ? void 0 : o
  };
  bz(p) || Object.assign(b, vz(n, b)), b.duration && (b.duration = /* @__PURE__ */ Fn(b.duration)), b.repeatDelay && (b.repeatDelay = /* @__PURE__ */ Fn(b.repeatDelay)), b.from !== void 0 && (b.keyframes[0] = b.from);
  let v = !1;
  if ((b.type === !1 || b.duration === 0 && !b.repeatDelay) && (Qf(b), b.delay === 0 && (v = !0)), (Si.instantAnimations || Si.skipAnimations || o?.shouldSkipAnimations) && (v = !0, Qf(b), b.delay = 0), b.allowFlatten = !p.type && !p.ease, v && !c && a.get() !== void 0) {
    const S = _u(b.keyframes, p);
    if (S !== void 0) {
      Gn.update(() => {
        b.onUpdate(S), b.onComplete();
      });
      return;
    }
  }
  return p.isSync ? new vu(b) : new uz(b);
};
function q0(n) {
  const a = [{}, {}];
  return n?.values.forEach((r, s) => {
    a[0][s] = r.get(), a[1][s] = r.getVelocity();
  }), a;
}
function zh(n, a, r, s) {
  if (typeof a == "function") {
    const [o, c] = q0(s);
    a = a(r !== void 0 ? r : n.custom, o, c);
  }
  if (typeof a == "string" && (a = n.variants && n.variants[a]), typeof a == "function") {
    const [o, c] = q0(s);
    a = a(r !== void 0 ? r : n.custom, o, c);
  }
  return a;
}
function Ji(n, a, r) {
  const s = n.getProps();
  return zh(s, a, r !== void 0 ? r : s.custom, n);
}
const c1 = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...tl
]), $0 = 30, Sz = (n) => !isNaN(parseFloat(n));
class wz {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(a, r = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      const o = An.now();
      if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const c of this.dependents)
          c.dirty();
    }, this.hasAnimated = !1, this.setCurrent(a), this.owner = r.owner;
  }
  setCurrent(a) {
    this.current = a, this.updatedAt = An.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = Sz(this.current));
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
    this.events[a] || (this.events[a] = new Nx());
    const s = this.events[a].add(r);
    return a === "change" ? () => {
      s(), Gn.read(() => {
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
    const a = An.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > $0)
      return 0;
    const r = Math.min(this.updatedAt - this.prevUpdatedAt, $0);
    return Mx(parseFloat(this.current) - parseFloat(this.prevFrameValue), r);
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
function yu(n, a) {
  return new wz(n, a);
}
const Zf = (n) => Array.isArray(n);
function Ez(n, a, r) {
  n.hasValue(a) ? n.getValue(a).set(r) : n.addValue(a, yu(r));
}
function jz(n) {
  return Zf(n) ? n[n.length - 1] || 0 : n;
}
function Tz(n, a) {
  const r = Ji(n, a);
  let { transitionEnd: s = {}, transition: o = {}, ...c } = r || {};
  c = { ...c, ...s };
  for (const h in c) {
    const p = jz(c[h]);
    Ez(n, h, p);
  }
}
const sn = (n) => !!(n && n.getVelocity);
function Cz(n) {
  return !!(sn(n) && n.add);
}
function Nz(n, a) {
  const r = n.getValue("willChange");
  if (Cz(r))
    return r.add(a);
  if (!r && Si.WillChange) {
    const s = new Si.WillChange("auto");
    n.addValue("willChange", s), s.add(a);
  }
}
function Oh(n) {
  return n.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const Mz = "framerAppearId", d1 = "data-" + Oh(Mz);
function Rz(n) {
  return n.props[d1];
}
function Az({ protectedKeys: n, needsAnimating: a }, r) {
  const s = n.hasOwnProperty(r) && a[r] !== !0;
  return a[r] = !1, s;
}
function f1(n, a, { delay: r = 0, transitionOverride: s, type: o } = {}) {
  let { transition: c, transitionEnd: h, ...p } = a;
  const g = n.getDefaultTransition();
  c = c ? o1(c, g) : g;
  const m = c?.reduceMotion;
  s && (c = s);
  const b = [], v = o && n.animationState && n.animationState.getState()[o];
  for (const S in p) {
    const w = n.getValue(S, n.latestValues[S] ?? null), j = p[S];
    if (j === void 0 || v && Az(v, S))
      continue;
    const T = {
      delay: r,
      ...u1(c || {}, S)
    }, _ = w.get();
    if (_ !== void 0 && !w.isAnimating() && !Array.isArray(j) && j === _ && !T.velocity) {
      Gn.update(() => w.set(j));
      continue;
    }
    let C = !1;
    if (window.MotionHandoffAnimation) {
      const R = Rz(n);
      if (R) {
        const X = window.MotionHandoffAnimation(R, S, Gn);
        X !== null && (T.startTime = X, C = !0);
      }
    }
    Nz(n, S);
    const z = m ?? n.shouldReduceMotion;
    w.start(xz(S, w, j, z && c1.has(S) ? { type: !1 } : T, n, C));
    const O = w.animation;
    O && b.push(O);
  }
  if (h) {
    const S = () => Gn.update(() => {
      h && Tz(n, h);
    });
    b.length ? Promise.all(b).then(S) : S();
  }
  return b;
}
function Pf(n, a, r = {}) {
  const s = Ji(n, a, r.type === "exit" ? n.presenceContext?.custom : void 0);
  let { transition: o = n.getDefaultTransition() || {} } = s || {};
  r.transitionOverride && (o = r.transitionOverride);
  const c = s ? () => Promise.all(f1(n, s, r)) : () => Promise.resolve(), h = n.variantChildren && n.variantChildren.size ? (g = 0) => {
    const { delayChildren: m = 0, staggerChildren: b, staggerDirection: v } = o;
    return _z(n, a, g, m, b, v, r);
  } : () => Promise.resolve(), { when: p } = o;
  if (p) {
    const [g, m] = p === "beforeChildren" ? [c, h] : [h, c];
    return g().then(() => m());
  } else
    return Promise.all([c(), h(r.delay)]);
}
function _z(n, a, r = 0, s = 0, o = 0, c = 1, h) {
  const p = [];
  for (const g of n.variantChildren)
    g.notify("AnimationStart", a), p.push(Pf(g, a, {
      ...h,
      delay: r + (typeof s == "function" ? 0 : s) + l1(n.variantChildren, g, s, o, c)
    }).then(() => g.notify("AnimationComplete", a)));
  return Promise.all(p);
}
function Dz(n, a, r = {}) {
  n.notify("AnimationStart", a);
  let s;
  if (Array.isArray(a)) {
    const o = a.map((c) => Pf(n, c, r));
    s = Promise.all(o);
  } else if (typeof a == "string")
    s = Pf(n, a, r);
  else {
    const o = typeof a == "function" ? Ji(n, a, r.custom) : a;
    s = Promise.all(f1(n, o, r));
  }
  return s.then(() => {
    n.notify("AnimationComplete", a);
  });
}
const zz = {
  test: (n) => n === "auto",
  parse: (n) => n
}, h1 = (n) => (a) => a.test(n), m1 = [el, Ee, Xr, hi, tD, eD, zz], I0 = (n) => m1.find(h1(n));
function Oz(n) {
  return typeof n == "number" ? n === 0 : n !== null ? n === "none" || n === "0" || jx(n) : !0;
}
const Lz = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Uz(n) {
  const [a, r] = n.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return n;
  const [s] = r.match(Nh) || [];
  if (!s)
    return n;
  const o = r.replace(s, "");
  let c = Lz.has(a) ? 1 : 0;
  return s !== r && (c *= 100), a + "(" + c + o + ")";
}
const kz = /\b([a-z-]*)\(.*?\)/gu, Jf = {
  ...na,
  getAnimatableNone: (n) => {
    const a = n.match(kz);
    return a ? a.map(Uz).join(" ") : n;
  }
}, Wf = {
  ...na,
  getAnimatableNone: (n) => {
    const a = na.parse(n);
    return na.createTransformer(n)(a.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, Y0 = {
  ...el,
  transform: Math.round
}, Vz = {
  rotate: hi,
  rotateX: hi,
  rotateY: hi,
  rotateZ: hi,
  scale: Po,
  scaleX: Po,
  scaleY: Po,
  scaleZ: Po,
  skew: hi,
  skewX: hi,
  skewY: hi,
  distance: Ee,
  translateX: Ee,
  translateY: Ee,
  translateZ: Ee,
  x: Ee,
  y: Ee,
  z: Ee,
  perspective: Ee,
  transformPerspective: Ee,
  opacity: ps,
  originX: A0,
  originY: A0,
  originZ: Ee
}, Lh = {
  // Border props
  borderWidth: Ee,
  borderTopWidth: Ee,
  borderRightWidth: Ee,
  borderBottomWidth: Ee,
  borderLeftWidth: Ee,
  borderRadius: Ee,
  borderTopLeftRadius: Ee,
  borderTopRightRadius: Ee,
  borderBottomRightRadius: Ee,
  borderBottomLeftRadius: Ee,
  // Positioning props
  width: Ee,
  maxWidth: Ee,
  height: Ee,
  maxHeight: Ee,
  top: Ee,
  right: Ee,
  bottom: Ee,
  left: Ee,
  inset: Ee,
  insetBlock: Ee,
  insetBlockStart: Ee,
  insetBlockEnd: Ee,
  insetInline: Ee,
  insetInlineStart: Ee,
  insetInlineEnd: Ee,
  // Spacing props
  padding: Ee,
  paddingTop: Ee,
  paddingRight: Ee,
  paddingBottom: Ee,
  paddingLeft: Ee,
  paddingBlock: Ee,
  paddingBlockStart: Ee,
  paddingBlockEnd: Ee,
  paddingInline: Ee,
  paddingInlineStart: Ee,
  paddingInlineEnd: Ee,
  margin: Ee,
  marginTop: Ee,
  marginRight: Ee,
  marginBottom: Ee,
  marginLeft: Ee,
  marginBlock: Ee,
  marginBlockStart: Ee,
  marginBlockEnd: Ee,
  marginInline: Ee,
  marginInlineStart: Ee,
  marginInlineEnd: Ee,
  // Typography
  fontSize: Ee,
  // Misc
  backgroundPositionX: Ee,
  backgroundPositionY: Ee,
  ...Vz,
  zIndex: Y0,
  // SVG
  fillOpacity: ps,
  strokeOpacity: ps,
  numOctaves: Y0
}, Bz = {
  ...Lh,
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
  filter: Jf,
  WebkitFilter: Jf,
  mask: Wf,
  WebkitMask: Wf
}, p1 = (n) => Bz[n], Hz = /* @__PURE__ */ new Set([Jf, Wf]);
function g1(n, a) {
  let r = p1(n);
  return Hz.has(r) || (r = na), r.getAnimatableNone ? r.getAnimatableNone(a) : void 0;
}
const qz = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function $z(n, a, r) {
  let s = 0, o;
  for (; s < n.length && !o; ) {
    const c = n[s];
    typeof c == "string" && !qz.has(c) && Zr(c).values.length && (o = n[s]), s++;
  }
  if (o && r)
    for (const c of a)
      n[c] = g1(r, o);
}
class Iz extends Dh {
  constructor(a, r, s, o, c) {
    super(a, r, s, o, c, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, element: r, name: s } = this;
    if (!r || !r.current)
      return;
    super.readKeyframes();
    for (let b = 0; b < a.length; b++) {
      let v = a[b];
      if (typeof v == "string" && (v = v.trim(), Ch(v))) {
        const S = s1(v, r.current);
        S !== void 0 && (a[b] = S), b === a.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !c1.has(s) || a.length !== 2)
      return;
    const [o, c] = a, h = I0(o), p = I0(c), g = R0(o), m = R0(c);
    if (g !== m && yi[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (h !== p)
      if (V0(h) && V0(p))
        for (let b = 0; b < a.length; b++) {
          const v = a[b];
          typeof v == "string" && (a[b] = parseFloat(v));
        }
      else yi[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: r } = this, s = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || Oz(a[o])) && s.push(o);
    s.length && $z(a, s, r);
  }
  measureInitialState() {
    const { element: a, unresolvedKeyframes: r, name: s } = this;
    if (!a || !a.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = yi[s](a.measureViewportBox(), window.getComputedStyle(a.current)), r[0] = this.measuredOrigin;
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
    s[c] = yi[r](a.measureViewportBox(), window.getComputedStyle(a.current)), h !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = h), this.removedTransforms?.length && this.removedTransforms.forEach(([p, g]) => {
      a.getValue(p).set(g);
    }), this.resolveNoneKeyframes();
  }
}
function Yz(n, a, r) {
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
const v1 = (n, a) => a && typeof n == "number" ? a.transform(n) : n;
function ou(n) {
  return L3(n) && "offsetHeight" in n && !("ownerSVGElement" in n);
}
const { schedule: Fz } = /* @__PURE__ */ Vx(queueMicrotask, !1), Gz = {
  y: !1
};
function Xz() {
  return Gz.y;
}
function y1(n, a) {
  const r = Yz(n), s = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: s.signal
  };
  return [r, o, () => s.abort()];
}
function Kz(n) {
  return !(n.pointerType === "touch" || Xz());
}
function Qz(n, a, r = {}) {
  const [s, o, c] = y1(n, r);
  return s.forEach((h) => {
    let p = !1, g = !1, m;
    const b = () => {
      h.removeEventListener("pointerleave", j);
    }, v = (_) => {
      m && (m(_), m = void 0), b();
    }, S = (_) => {
      p = !1, window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), g && (g = !1, v(_));
    }, w = () => {
      p = !0, window.addEventListener("pointerup", S, o), window.addEventListener("pointercancel", S, o);
    }, j = (_) => {
      if (_.pointerType !== "touch") {
        if (p) {
          g = !0;
          return;
        }
        v(_);
      }
    }, T = (_) => {
      if (!Kz(_))
        return;
      g = !1;
      const C = a(h, _);
      typeof C == "function" && (m = C, h.addEventListener("pointerleave", j, o));
    };
    h.addEventListener("pointerenter", T, o), h.addEventListener("pointerdown", w, o);
  }), c;
}
const b1 = (n, a) => a ? n === a ? !0 : b1(n, a.parentElement) : !1, Zz = (n) => n.pointerType === "mouse" ? typeof n.button != "number" || n.button <= 0 : n.isPrimary !== !1, Pz = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function Jz(n) {
  return Pz.has(n.tagName) || n.isContentEditable === !0;
}
const uu = /* @__PURE__ */ new WeakSet();
function F0(n) {
  return (a) => {
    a.key === "Enter" && n(a);
  };
}
function jf(n, a) {
  n.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const Wz = (n, a) => {
  const r = n.currentTarget;
  if (!r)
    return;
  const s = F0(() => {
    if (uu.has(r))
      return;
    jf(r, "down");
    const o = F0(() => {
      jf(r, "up");
    }), c = () => jf(r, "cancel");
    r.addEventListener("keyup", o, a), r.addEventListener("blur", c, a);
  });
  r.addEventListener("keydown", s, a), r.addEventListener("blur", () => r.removeEventListener("keydown", s), a);
};
function G0(n) {
  return Zz(n) && !0;
}
const X0 = /* @__PURE__ */ new WeakSet();
function e5(n, a, r = {}) {
  const [s, o, c] = y1(n, r), h = (p) => {
    const g = p.currentTarget;
    if (!G0(p) || X0.has(p))
      return;
    uu.add(g), r.stopPropagation && X0.add(p);
    const m = a(g, p), b = (w, j) => {
      window.removeEventListener("pointerup", v), window.removeEventListener("pointercancel", S), uu.has(g) && uu.delete(g), G0(w) && typeof m == "function" && m(w, { success: j });
    }, v = (w) => {
      b(w, g === window || g === document || r.useGlobalTarget || b1(g, w.target));
    }, S = (w) => {
      b(w, !1);
    };
    window.addEventListener("pointerup", v, o), window.addEventListener("pointercancel", S, o);
  };
  return s.forEach((p) => {
    (r.useGlobalTarget ? window : p).addEventListener("pointerdown", h, o), ou(p) && (p.addEventListener("focus", (m) => Wz(m, o)), !Jz(p) && !p.hasAttribute("tabindex") && (p.tabIndex = 0));
  }), c;
}
const t5 = [...m1, Ut, na], n5 = (n) => t5.find(h1(n)), K0 = () => ({ min: 0, max: 0 }), x1 = () => ({
  x: K0(),
  y: K0()
}), a5 = /* @__PURE__ */ new WeakMap();
function Du(n) {
  return n !== null && typeof n == "object" && typeof n.start == "function";
}
function gs(n) {
  return typeof n == "string" || Array.isArray(n);
}
const Uh = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], kh = ["initial", ...Uh];
function zu(n) {
  return Du(n.animate) || kh.some((a) => gs(n[a]));
}
function S1(n) {
  return !!(zu(n) || n.variants);
}
function i5(n, a, r) {
  for (const s in a) {
    const o = a[s], c = r[s];
    if (sn(o))
      n.addValue(s, o);
    else if (sn(c))
      n.addValue(s, yu(o, { owner: n }));
    else if (c !== o)
      if (n.hasValue(s)) {
        const h = n.getValue(s);
        h.liveStyle === !0 ? h.jump(o) : h.hasAnimated || h.set(o);
      } else {
        const h = n.getStaticValue(s);
        n.addValue(s, yu(h !== void 0 ? h : o, { owner: n }));
      }
  }
  for (const s in r)
    a[s] === void 0 && n.removeValue(s);
  return a;
}
const eh = { current: null }, w1 = { current: !1 }, r5 = typeof window < "u";
function l5() {
  if (w1.current = !0, !!r5)
    if (window.matchMedia) {
      const n = window.matchMedia("(prefers-reduced-motion)"), a = () => eh.current = n.matches;
      n.addEventListener("change", a), a();
    } else
      eh.current = !1;
}
const Q0 = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let bu = {};
function E1(n) {
  bu = n;
}
function s5() {
  return bu;
}
class o5 {
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
  constructor({ parent: a, props: r, presenceContext: s, reducedMotionConfig: o, skipAnimations: c, blockInitialAnimation: h, visualState: p }, g = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Dh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const w = An.now();
      this.renderScheduledAt < w && (this.renderScheduledAt = w, Gn.render(this.render, !1, !0));
    };
    const { latestValues: m, renderState: b } = p;
    this.latestValues = m, this.baseTarget = { ...m }, this.initialValues = r.initial ? { ...m } : {}, this.renderState = b, this.parent = a, this.props = r, this.presenceContext = s, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = c, this.options = g, this.blockInitialAnimation = !!h, this.isControllingVariants = zu(r), this.isVariantNode = S1(r), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: v, ...S } = this.scrapeMotionValuesFromProps(r, {}, this);
    for (const w in S) {
      const j = S[w];
      m[w] !== void 0 && sn(j) && j.set(m[w]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const r in this.initialValues)
        this.values.get(r)?.jump(this.initialValues[r]), this.latestValues[r] = this.initialValues[r];
    this.current = a, a5.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((r, s) => this.bindToMotionValue(s, r)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (w1.current || l5(), this.shouldReduceMotion = eh.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), kf(this.notifyUpdate), kf(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), r.accelerate && r1.has(a) && this.current instanceof HTMLElement) {
      const { factory: h, keyframes: p, times: g, ease: m, duration: b } = r.accelerate, v = new a1({
        element: this.current,
        name: a,
        keyframes: p,
        times: g,
        ease: m,
        duration: /* @__PURE__ */ Fn(b)
      }), S = h(v);
      this.valueSubscriptions.set(a, () => {
        S(), v.cancel();
      });
      return;
    }
    const s = nl.has(a);
    s && this.onBindTransform && this.onBindTransform();
    const o = r.on("change", (h) => {
      this.latestValues[a] = h, this.props.onUpdate && Gn.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
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
    for (a in bu) {
      const r = bu[a];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : x1();
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
    for (let s = 0; s < Q0.length; s++) {
      const o = Q0[s];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const c = "on" + o, h = a[c];
      h && (this.propEventSubscriptions[o] = this.on(o, h));
    }
    this.prevMotionValues = i5(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return s === void 0 && r !== void 0 && (s = yu(r === null ? void 0 : r, { owner: this }), this.addValue(a, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, r) {
    let s = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return s != null && (typeof s == "string" && (Ex(s) || jx(s)) ? s = parseFloat(s) : !n5(s) && na.test(r) && (s = g1(a, r)), this.setBaseTarget(a, sn(s) ? s.get() : s)), sn(s) ? s.get() : s;
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
      const c = zh(this.props, r, this.presenceContext?.custom);
      c && (s = c[a]);
    }
    if (r && s !== void 0)
      return s;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !sn(o) ? o : this.initialValues[a] !== void 0 && s === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, r) {
    return this.events[a] || (this.events[a] = new Nx()), this.events[a].add(r);
  }
  notify(a, ...r) {
    this.events[a] && this.events[a].notify(...r);
  }
  scheduleRenderMicrotask() {
    Fz.render(this.render);
  }
}
class j1 extends o5 {
  constructor() {
    super(...arguments), this.KeyframeResolver = Iz;
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
    sn(a) && (this.childSubscription = a.on("change", (r) => {
      this.current && (this.current.textContent = `${r}`);
    }));
  }
}
class al {
  constructor(a) {
    this.isMounted = !1, this.node = a;
  }
  update() {
  }
}
function u5({ top: n, left: a, right: r, bottom: s }) {
  return {
    x: { min: a, max: r },
    y: { min: n, max: s }
  };
}
function c5(n, a) {
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
function d5(n, a) {
  return u5(c5(n.getBoundingClientRect(), a));
}
const f5 = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, h5 = tl.length;
function m5(n, a, r) {
  let s = "", o = !0;
  for (let c = 0; c < h5; c++) {
    const h = tl[c], p = n[h];
    if (p === void 0)
      continue;
    let g = !0;
    if (typeof p == "number")
      g = p === (h.startsWith("scale") ? 1 : 0);
    else {
      const m = parseFloat(p);
      g = h.startsWith("scale") ? m === 1 : m === 0;
    }
    if (!g || r) {
      const m = v1(p, Lh[h]);
      if (!g) {
        o = !1;
        const b = f5[h] || h;
        s += `${b}(${m}) `;
      }
      r && (a[h] = m);
    }
  }
  return s = s.trim(), r ? s = r(a, o ? "" : s) : o && (s = "none"), s;
}
function Vh(n, a, r) {
  const { style: s, vars: o, transformOrigin: c } = n;
  let h = !1, p = !1;
  for (const g in a) {
    const m = a[g];
    if (nl.has(g)) {
      h = !0;
      continue;
    } else if (Hx(g)) {
      o[g] = m;
      continue;
    } else {
      const b = v1(m, Lh[g]);
      g.startsWith("origin") ? (p = !0, c[g] = b) : s[g] = b;
    }
  }
  if (a.transform || (h || r ? s.transform = m5(a, n.transform, r) : s.transform && (s.transform = "none")), p) {
    const { originX: g = "50%", originY: m = "50%", originZ: b = 0 } = c;
    s.transformOrigin = `${g} ${m} ${b}`;
  }
}
function T1(n, { style: a, vars: r }, s, o) {
  const c = n.style;
  let h;
  for (h in a)
    c[h] = a[h];
  o?.applyProjectionStyles(c, s);
  for (h in r)
    c.setProperty(h, r[h]);
}
function Z0(n, a) {
  return a.max === a.min ? 0 : n / (a.max - a.min) * 100;
}
const Jl = {
  correct: (n, a) => {
    if (!a.target)
      return n;
    if (typeof n == "string")
      if (Ee.test(n))
        n = parseFloat(n);
      else
        return n;
    const r = Z0(n, a.target.x), s = Z0(n, a.target.y);
    return `${r}% ${s}%`;
  }
}, p5 = {
  correct: (n, { treeScale: a, projectionDelta: r }) => {
    const s = n, o = na.parse(n);
    if (o.length > 5)
      return s;
    const c = na.createTransformer(n), h = typeof o[0] != "number" ? 1 : 0, p = r.x.scale * a.x, g = r.y.scale * a.y;
    o[0 + h] /= p, o[1 + h] /= g;
    const m = Cs(p, g, 0.5);
    return typeof o[2 + h] == "number" && (o[2 + h] /= m), typeof o[3 + h] == "number" && (o[3 + h] /= m), c(o);
  }
}, g5 = {
  borderRadius: {
    ...Jl,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: Jl,
  borderTopRightRadius: Jl,
  borderBottomLeftRadius: Jl,
  borderBottomRightRadius: Jl,
  boxShadow: p5
};
function C1(n, { layout: a, layoutId: r }) {
  return nl.has(n) || n.startsWith("origin") || (a || r !== void 0) && (!!g5[n] || n === "opacity");
}
function Bh(n, a, r) {
  const s = n.style, o = a?.style, c = {};
  if (!s)
    return c;
  for (const h in s)
    (sn(s[h]) || o && sn(o[h]) || C1(h, n) || r?.getValue(h)?.liveStyle !== void 0) && (c[h] = s[h]);
  return c;
}
function v5(n) {
  return window.getComputedStyle(n);
}
class y5 extends j1 {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = T1;
  }
  readValueFromInstance(a, r) {
    if (nl.has(r))
      return this.projection?.isProjecting ? Yf(r) : qD(a, r);
    {
      const s = v5(a), o = (Hx(r) ? s.getPropertyValue(r) : s[r]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: r }) {
    return d5(a, r);
  }
  build(a, r, s) {
    Vh(a, r, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, r, s) {
    return Bh(a, r, s);
  }
}
const b5 = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, x5 = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function S5(n, a, r = 1, s = 0, o = !0) {
  n.pathLength = 1;
  const c = o ? b5 : x5;
  n[c.offset] = `${-s}`, n[c.array] = `${a} ${r}`;
}
const w5 = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function N1(n, {
  attrX: a,
  attrY: r,
  attrScale: s,
  pathLength: o,
  pathSpacing: c = 1,
  pathOffset: h = 0,
  // This is object creation, which we try to avoid per-frame.
  ...p
}, g, m, b) {
  if (Vh(n, p, m), g) {
    n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
    return;
  }
  n.attrs = n.style, n.style = {};
  const { attrs: v, style: S } = n;
  v.transform && (S.transform = v.transform, delete v.transform), (S.transform || v.transformOrigin) && (S.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), S.transform && (S.transformBox = b?.transformBox ?? "fill-box", delete v.transformBox);
  for (const w of w5)
    v[w] !== void 0 && (S[w] = v[w], delete v[w]);
  a !== void 0 && (v.x = a), r !== void 0 && (v.y = r), s !== void 0 && (v.scale = s), o !== void 0 && S5(v, o, c, h, !1);
}
const M1 = /* @__PURE__ */ new Set([
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
]), R1 = (n) => typeof n == "string" && n.toLowerCase() === "svg";
function E5(n, a, r, s) {
  T1(n, a, void 0, s);
  for (const o in a.attrs)
    n.setAttribute(M1.has(o) ? o : Oh(o), a.attrs[o]);
}
function A1(n, a, r) {
  const s = Bh(n, a, r);
  for (const o in n)
    if (sn(n[o]) || sn(a[o])) {
      const c = tl.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      s[c] = n[o];
    }
  return s;
}
class j5 extends j1 {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = x1;
  }
  getBaseTargetFromProps(a, r) {
    return a[r];
  }
  readValueFromInstance(a, r) {
    if (nl.has(r)) {
      const s = p1(r);
      return s && s.default || 0;
    }
    return r = M1.has(r) ? r : Oh(r), a.getAttribute(r);
  }
  scrapeMotionValuesFromProps(a, r, s) {
    return A1(a, r, s);
  }
  build(a, r, s) {
    N1(a, r, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(a, r, s, o) {
    E5(a, r, s, o);
  }
  mount(a) {
    this.isSVGTag = R1(a.tagName), super.mount(a);
  }
}
const T5 = kh.length;
function _1(n) {
  if (!n)
    return;
  if (!n.isControllingVariants) {
    const r = n.parent ? _1(n.parent) || {} : {};
    return n.props.initial !== void 0 && (r.initial = n.props.initial), r;
  }
  const a = {};
  for (let r = 0; r < T5; r++) {
    const s = kh[r], o = n.props[s];
    (gs(o) || o === !1) && (a[s] = o);
  }
  return a;
}
function D1(n, a) {
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
const C5 = [...Uh].reverse(), N5 = Uh.length;
function M5(n) {
  return (a) => Promise.all(a.map(({ animation: r, options: s }) => Dz(n, r, s)));
}
function R5(n) {
  let a = M5(n), r = P0(), s = !0, o = !1;
  const c = (m) => (b, v) => {
    const S = Ji(n, v, m === "exit" ? n.presenceContext?.custom : void 0);
    if (S) {
      const { transition: w, transitionEnd: j, ...T } = S;
      b = { ...b, ...T, ...j };
    }
    return b;
  };
  function h(m) {
    a = m(n);
  }
  function p(m) {
    const { props: b } = n, v = _1(n.parent) || {}, S = [], w = /* @__PURE__ */ new Set();
    let j = {}, T = 1 / 0;
    for (let C = 0; C < N5; C++) {
      const z = C5[C], O = r[z], R = b[z] !== void 0 ? b[z] : v[z], X = gs(R), $ = z === m ? O.isActive : null;
      $ === !1 && (T = C);
      let Q = R === v[z] && R !== b[z] && X;
      if (Q && (s || o) && n.manuallyAnimateOnMount && (Q = !1), O.protectedKeys = { ...j }, // If it isn't active and hasn't *just* been set as inactive
      !O.isActive && $ === null || // If we didn't and don't have any defined prop for this animation type
      !R && !O.prevProp || // Or if the prop doesn't define an animation
      Du(R) || typeof R == "boolean")
        continue;
      if (z === "exit" && O.isActive && $ !== !0) {
        O.prevResolvedValues && (j = {
          ...j,
          ...O.prevResolvedValues
        });
        continue;
      }
      const M = A5(O.prevProp, R);
      let B = M || // If we're making this variant active, we want to always make it active
      z === m && O.isActive && !Q && X || // If we removed a higher-priority variant (i is in reverse order)
      C > T && X, J = !1;
      const se = Array.isArray(R) ? R : [R];
      let oe = se.reduce(c(z), {});
      $ === !1 && (oe = {});
      const { prevResolvedValues: be = {} } = O, Se = {
        ...be,
        ...oe
      }, le = (q) => {
        B = !0, w.has(q) && (J = !0, w.delete(q)), O.needsAnimating[q] = !0;
        const Z = n.getValue(q);
        Z && (Z.liveStyle = !1);
      };
      for (const q in Se) {
        const Z = oe[q], ae = be[q];
        if (j.hasOwnProperty(q))
          continue;
        let N = !1;
        Zf(Z) && Zf(ae) ? N = !D1(Z, ae) : N = Z !== ae, N ? Z != null ? le(q) : w.add(q) : Z !== void 0 && w.has(q) ? le(q) : O.protectedKeys[q] = !0;
      }
      O.prevProp = R, O.prevResolvedValues = oe, O.isActive && (j = { ...j, ...oe }), (s || o) && n.blockInitialAnimation && (B = !1);
      const U = Q && M;
      B && (!U || J) && S.push(...se.map((q) => {
        const Z = { type: z };
        if (typeof q == "string" && (s || o) && !U && n.manuallyAnimateOnMount && n.parent) {
          const { parent: ae } = n, N = Ji(ae, q);
          if (ae.enteringChildren && N) {
            const { delayChildren: P } = N.transition || {};
            Z.delay = l1(ae.enteringChildren, n, P);
          }
        }
        return {
          animation: q,
          options: Z
        };
      }));
    }
    if (w.size) {
      const C = {};
      if (typeof b.initial != "boolean") {
        const z = Ji(n, Array.isArray(b.initial) ? b.initial[0] : b.initial);
        z && z.transition && (C.transition = z.transition);
      }
      w.forEach((z) => {
        const O = n.getBaseTarget(z), R = n.getValue(z);
        R && (R.liveStyle = !0), C[z] = O ?? null;
      }), S.push({ animation: C });
    }
    let _ = !!S.length;
    return s && (b.initial === !1 || b.initial === b.animate) && !n.manuallyAnimateOnMount && (_ = !1), s = !1, o = !1, _ ? a(S) : Promise.resolve();
  }
  function g(m, b) {
    if (r[m].isActive === b)
      return Promise.resolve();
    n.variantChildren?.forEach((S) => S.animationState?.setActive(m, b)), r[m].isActive = b;
    const v = p(m);
    for (const S in r)
      r[S].protectedKeys = {};
    return v;
  }
  return {
    animateChanges: p,
    setActive: g,
    setAnimateFunction: h,
    getState: () => r,
    reset: () => {
      r = P0(), o = !0;
    }
  };
}
function A5(n, a) {
  return typeof a == "string" ? a !== n : Array.isArray(a) ? !D1(a, n) : !1;
}
function Fi(n = !1) {
  return {
    isActive: n,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function P0() {
  return {
    animate: Fi(!0),
    whileInView: Fi(),
    whileHover: Fi(),
    whileTap: Fi(),
    whileDrag: Fi(),
    whileFocus: Fi(),
    exit: Fi()
  };
}
function J0(n, a, r, s = { passive: !0 }) {
  return n.addEventListener(a, r, s), () => n.removeEventListener(a, r);
}
function _5(n) {
  return sn(n) ? n.get() : n;
}
const Hh = x.createContext({
  transformPagePoint: (n) => n,
  isStatic: !1,
  reducedMotion: "never"
});
function W0(n, a) {
  if (typeof n == "function")
    return n(a);
  n != null && (n.current = a);
}
function D5(...n) {
  return (a) => {
    let r = !1;
    const s = n.map((o) => {
      const c = W0(o, a);
      return !r && typeof c == "function" && (r = !0), c;
    });
    if (r)
      return () => {
        for (let o = 0; o < s.length; o++) {
          const c = s[o];
          typeof c == "function" ? c() : W0(n[o], null);
        }
      };
  };
}
function z5(...n) {
  return x.useCallback(D5(...n), n);
}
class O5 extends x.Component {
  getSnapshotBeforeUpdate(a) {
    const r = this.props.childRef.current;
    if (ou(r) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const s = r.offsetParent, o = ou(s) && s.offsetWidth || 0, c = ou(s) && s.offsetHeight || 0, h = getComputedStyle(r), p = this.props.sizeRef.current;
      p.height = parseFloat(h.height), p.width = parseFloat(h.width), p.top = r.offsetTop, p.left = r.offsetLeft, p.right = o - p.width - p.left, p.bottom = c - p.height - p.top;
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
function L5({ children: n, isPresent: a, anchorX: r, anchorY: s, root: o, pop: c }) {
  const h = x.useId(), p = x.useRef(null), g = x.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: m } = x.useContext(Hh), b = n.props?.ref ?? n?.ref, v = z5(p, b);
  return x.useInsertionEffect(() => {
    const { width: S, height: w, top: j, left: T, right: _, bottom: C } = g.current;
    if (a || c === !1 || !p.current || !S || !w)
      return;
    const z = r === "left" ? `left: ${T}` : `right: ${_}`, O = s === "bottom" ? `bottom: ${C}` : `top: ${j}`;
    p.current.dataset.motionPopId = h;
    const R = document.createElement("style");
    m && (R.nonce = m);
    const X = o ?? document.head;
    return X.appendChild(R), R.sheet && R.sheet.insertRule(`
          [data-motion-pop-id="${h}"] {
            position: absolute !important;
            width: ${S}px !important;
            height: ${w}px !important;
            ${z}px !important;
            ${O}px !important;
          }
        `), () => {
      p.current?.removeAttribute("data-motion-pop-id"), X.contains(R) && X.removeChild(R);
    };
  }, [a]), f.jsx(O5, { isPresent: a, childRef: p, sizeRef: g, pop: c, children: c === !1 ? n : x.cloneElement(n, { ref: v }) });
}
const U5 = ({ children: n, initial: a, isPresent: r, onExitComplete: s, custom: o, presenceAffectsLayout: c, mode: h, anchorX: p, anchorY: g, root: m }) => {
  const b = Eh(k5), v = x.useId();
  let S = !0, w = x.useMemo(() => (S = !1, {
    id: v,
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
  }, [r]), n = f.jsx(L5, { pop: h === "popLayout", isPresent: r, anchorX: p, anchorY: g, root: m, children: n }), f.jsx(Ru.Provider, { value: w, children: n });
};
function k5() {
  return /* @__PURE__ */ new Map();
}
function V5(n = !0) {
  const a = x.useContext(Ru);
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
const Jo = (n) => n.key || "";
function eb(n) {
  const a = [];
  return x.Children.forEach(n, (r) => {
    x.isValidElement(r) && a.push(r);
  }), a;
}
const B5 = ({ children: n, custom: a, initial: r = !0, onExitComplete: s, presenceAffectsLayout: o = !0, mode: c = "sync", propagate: h = !1, anchorX: p = "left", anchorY: g = "top", root: m }) => {
  const [b, v] = V5(h), S = x.useMemo(() => eb(n), [n]), w = h && !b ? [] : S.map(Jo), j = x.useRef(!0), T = x.useRef(S), _ = Eh(() => /* @__PURE__ */ new Map()), C = x.useRef(/* @__PURE__ */ new Set()), [z, O] = x.useState(S), [R, X] = x.useState(S);
  wx(() => {
    j.current = !1, T.current = S;
    for (let M = 0; M < R.length; M++) {
      const B = Jo(R[M]);
      w.includes(B) ? (_.delete(B), C.current.delete(B)) : _.get(B) !== !0 && _.set(B, !1);
    }
  }, [R, w.length, w.join("-")]);
  const $ = [];
  if (S !== z) {
    let M = [...S];
    for (let B = 0; B < R.length; B++) {
      const J = R[B], se = Jo(J);
      w.includes(se) || (M.splice(B, 0, J), $.push(J));
    }
    return c === "wait" && $.length && (M = $), X(eb(M)), O(S), null;
  }
  const { forceRender: Q } = x.useContext(Sx);
  return f.jsx(f.Fragment, { children: R.map((M) => {
    const B = Jo(M), J = h && !b ? !1 : S === R || w.includes(B), se = () => {
      if (C.current.has(B))
        return;
      if (_.has(B))
        C.current.add(B), _.set(B, !0);
      else
        return;
      let oe = !0;
      _.forEach((be) => {
        be || (oe = !1);
      }), oe && (Q?.(), X(T.current), h && v?.(), s && s());
    };
    return f.jsx(U5, { isPresent: J, initial: !j.current || r ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: c, root: m, onExitComplete: J ? void 0 : se, anchorX: p, anchorY: g, children: M }, B);
  }) });
}, qh = x.createContext({ strict: !1 }), tb = {
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
let nb = !1;
function H5() {
  if (nb)
    return;
  const n = {};
  for (const a in tb)
    n[a] = {
      isEnabled: (r) => tb[a].some((s) => !!r[s])
    };
  E1(n), nb = !0;
}
function z1() {
  return H5(), s5();
}
function th(n) {
  const a = z1();
  for (const r in n)
    a[r] = {
      ...a[r],
      ...n[r]
    };
  E1(a);
}
function O1({ children: n, features: a, strict: r = !1 }) {
  const [, s] = x.useState(!Tf(a)), o = x.useRef(void 0);
  if (!Tf(a)) {
    const { renderer: c, ...h } = a;
    o.current = c, th(h);
  }
  return x.useEffect(() => {
    Tf(a) && a().then(({ renderer: c, ...h }) => {
      th(h), o.current = c, s(!0);
    });
  }, []), f.jsx(qh.Provider, { value: { renderer: o.current, strict: r }, children: n });
}
function Tf(n) {
  return typeof n == "function";
}
const q5 = /* @__PURE__ */ new Set([
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
function xu(n) {
  return n.startsWith("while") || n.startsWith("drag") && n !== "draggable" || n.startsWith("layout") || n.startsWith("onTap") || n.startsWith("onPan") || n.startsWith("onLayout") || q5.has(n);
}
let L1 = (n) => !xu(n);
function $5(n) {
  typeof n == "function" && (L1 = (a) => a.startsWith("on") ? !xu(a) : n(a));
}
try {
  $5(require("@emotion/is-prop-valid").default);
} catch {
}
function I5(n, a, r) {
  const s = {};
  for (const o in n)
    o === "values" && typeof n.values == "object" || sn(n[o]) || (L1(o) || r === !0 && xu(o) || !a && !xu(o) || // If trying to use native HTML drag events, forward drag listeners
    n.draggable && o.startsWith("onDrag")) && (s[o] = n[o]);
  return s;
}
const Ou = /* @__PURE__ */ x.createContext({});
function Y5(n, a) {
  if (zu(n)) {
    const { initial: r, animate: s } = n;
    return {
      initial: r === !1 || gs(r) ? r : void 0,
      animate: gs(s) ? s : void 0
    };
  }
  return n.inherit !== !1 ? a : {};
}
function F5(n) {
  const { initial: a, animate: r } = Y5(n, x.useContext(Ou));
  return x.useMemo(() => ({ initial: a, animate: r }), [ab(a), ab(r)]);
}
function ab(n) {
  return Array.isArray(n) ? n.join(" ") : n;
}
const $h = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function U1(n, a, r) {
  for (const s in a)
    !sn(a[s]) && !C1(s, r) && (n[s] = a[s]);
}
function G5({ transformTemplate: n }, a) {
  return x.useMemo(() => {
    const r = $h();
    return Vh(r, a, n), Object.assign({}, r.vars, r.style);
  }, [a]);
}
function X5(n, a) {
  const r = n.style || {}, s = {};
  return U1(s, r, n), Object.assign(s, G5(n, a)), s;
}
function K5(n, a) {
  const r = {}, s = X5(n, a);
  return n.drag && n.dragListener !== !1 && (r.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = n.drag === !0 ? "none" : `pan-${n.drag === "x" ? "y" : "x"}`), n.tabIndex === void 0 && (n.onTap || n.onTapStart || n.whileTap) && (r.tabIndex = 0), r.style = s, r;
}
const k1 = () => ({
  ...$h(),
  attrs: {}
});
function Q5(n, a, r, s) {
  const o = x.useMemo(() => {
    const c = k1();
    return N1(c, a, R1(s), n.transformTemplate, n.style), {
      ...c.attrs,
      style: { ...c.style }
    };
  }, [a]);
  if (n.style) {
    const c = {};
    U1(c, n.style, n), o.style = { ...c, ...o.style };
  }
  return o;
}
const Z5 = [
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
function Ih(n) {
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
      !!(Z5.indexOf(n) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(n))
    )
  );
}
function P5(n, a, r, { latestValues: s }, o, c = !1, h) {
  const g = (h ?? Ih(n) ? Q5 : K5)(a, s, o, n), m = I5(a, typeof n == "string", c), b = n !== x.Fragment ? { ...m, ...g, ref: r } : {}, { children: v } = a, S = x.useMemo(() => sn(v) ? v.get() : v, [v]);
  return x.createElement(n, {
    ...b,
    children: S
  });
}
function J5({ scrapeMotionValuesFromProps: n, createRenderState: a }, r, s, o) {
  return {
    latestValues: W5(r, s, o, n),
    renderState: a()
  };
}
function W5(n, a, r, s) {
  const o = {}, c = s(n, {});
  for (const S in c)
    o[S] = _5(c[S]);
  let { initial: h, animate: p } = n;
  const g = zu(n), m = S1(n);
  a && m && !g && n.inherit !== !1 && (h === void 0 && (h = a.initial), p === void 0 && (p = a.animate));
  let b = r ? r.initial === !1 : !1;
  b = b || h === !1;
  const v = b ? p : h;
  if (v && typeof v != "boolean" && !Du(v)) {
    const S = Array.isArray(v) ? v : [v];
    for (let w = 0; w < S.length; w++) {
      const j = zh(n, S[w]);
      if (j) {
        const { transitionEnd: T, transition: _, ...C } = j;
        for (const z in C) {
          let O = C[z];
          if (Array.isArray(O)) {
            const R = b ? O.length - 1 : 0;
            O = O[R];
          }
          O !== null && (o[z] = O);
        }
        for (const z in T)
          o[z] = T[z];
      }
    }
  }
  return o;
}
const V1 = (n) => (a, r) => {
  const s = x.useContext(Ou), o = x.useContext(Ru), c = () => J5(n, a, s, o);
  return r ? c() : Eh(c);
}, eO = /* @__PURE__ */ V1({
  scrapeMotionValuesFromProps: Bh,
  createRenderState: $h
}), tO = /* @__PURE__ */ V1({
  scrapeMotionValuesFromProps: A1,
  createRenderState: k1
}), nO = Symbol.for("motionComponentSymbol");
function aO(n, a, r) {
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
        const p = h(c);
        typeof p == "function" && (o.current = p);
      } else o.current ? (o.current(), o.current = null) : h(c);
    else h && (h.current = c);
    a && (c ? a.mount(c) : a.unmount());
  }, [a]);
}
const iO = x.createContext({});
function rO(n) {
  return n && typeof n == "object" && Object.prototype.hasOwnProperty.call(n, "current");
}
function lO(n, a, r, s, o, c) {
  const { visualElement: h } = x.useContext(Ou), p = x.useContext(qh), g = x.useContext(Ru), m = x.useContext(Hh), b = m.reducedMotion, v = m.skipAnimations, S = x.useRef(null), w = x.useRef(!1);
  s = s || p.renderer, !S.current && s && (S.current = s(n, {
    visualState: a,
    parent: h,
    props: r,
    presenceContext: g,
    blockInitialAnimation: g ? g.initial === !1 : !1,
    reducedMotionConfig: b,
    skipAnimations: v,
    isSVG: c
  }), w.current && S.current && (S.current.manuallyAnimateOnMount = !0));
  const j = S.current, T = x.useContext(iO);
  j && !j.projection && o && (j.type === "html" || j.type === "svg") && sO(S.current, r, o, T);
  const _ = x.useRef(!1);
  x.useInsertionEffect(() => {
    j && _.current && j.update(r, g);
  });
  const C = r[d1], z = x.useRef(!!C && typeof window < "u" && !window.MotionHandoffIsComplete?.(C) && window.MotionHasOptimisedAnimation?.(C));
  return wx(() => {
    w.current = !0, j && (_.current = !0, window.MotionIsMounted = !0, j.updateFeatures(), j.scheduleRenderMicrotask(), z.current && j.animationState && j.animationState.animateChanges());
  }), x.useEffect(() => {
    j && (!z.current && j.animationState && j.animationState.animateChanges(), z.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(C);
    }), z.current = !1), j.enteringChildren = void 0);
  }), j;
}
function sO(n, a, r, s) {
  const { layoutId: o, layout: c, drag: h, dragConstraints: p, layoutScroll: g, layoutRoot: m, layoutAnchor: b, layoutCrossfade: v } = a;
  n.projection = new r(n.latestValues, a["data-framer-portal-id"] ? void 0 : B1(n.parent)), n.projection.setOptions({
    layoutId: o,
    layout: c,
    alwaysMeasureLayout: !!h || p && rO(p),
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
    layoutScroll: g,
    layoutRoot: m,
    layoutAnchor: b
  });
}
function B1(n) {
  if (n)
    return n.options.allowProjection !== !1 ? n.projection : B1(n.parent);
}
function Cf(n, { forwardMotionProps: a = !1, type: r } = {}, s, o) {
  s && th(s);
  const c = r ? r === "svg" : Ih(n), h = c ? tO : eO;
  function p(m, b) {
    let v;
    const S = {
      ...x.useContext(Hh),
      ...m,
      layoutId: oO(m)
    }, { isStatic: w } = S, j = F5(m), T = h(m, w);
    if (!w && typeof window < "u") {
      uO();
      const _ = cO(S);
      v = _.MeasureLayout, j.visualElement = lO(n, T, S, o, _.ProjectionNode, c);
    }
    return f.jsxs(Ou.Provider, { value: j, children: [v && j.visualElement ? f.jsx(v, { visualElement: j.visualElement, ...S }) : null, P5(n, m, aO(T, j.visualElement, b), T, w, a, c)] });
  }
  p.displayName = `motion.${typeof n == "string" ? n : `create(${n.displayName ?? n.name ?? ""})`}`;
  const g = x.forwardRef(p);
  return g[nO] = n, g;
}
function oO({ layoutId: n }) {
  const a = x.useContext(Sx).id;
  return a && n !== void 0 ? a + "-" + n : n;
}
function uO(n, a) {
  x.useContext(qh).strict;
}
function cO(n) {
  const a = z1(), { drag: r, layout: s } = a;
  if (!r && !s)
    return {};
  const o = { ...r, ...s };
  return {
    MeasureLayout: r?.isEnabled(n) || s?.isEnabled(n) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function dO(n, a) {
  if (typeof Proxy > "u")
    return Cf;
  const r = /* @__PURE__ */ new Map(), s = (c, h) => Cf(c, h, n, a), o = (c, h) => s(c, h);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (c, h) => h === "create" ? s : (r.has(h) || r.set(h, Cf(h, void 0, n, a)), r.get(h))
  });
}
const H1 = /* @__PURE__ */ dO(), fO = (n, a) => a.isSVG ?? Ih(n) ? new j5(a) : new y5(a, {
  allowProjection: n !== x.Fragment
});
class hO extends al {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = R5(a));
  }
  updateAnimationControlsSubscription() {
    const { animate: a } = this.node.getProps();
    Du(a) && (this.unmountControls = a.subscribe(this.node));
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
let mO = 0;
class pO extends al {
  constructor() {
    super(...arguments), this.id = mO++, this.isExitComplete = !1;
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
          const p = Ji(this.node, c, h);
          if (p) {
            const { transition: g, transitionEnd: m, ...b } = p;
            for (const v in b)
              this.node.getValue(v)?.jump(b[v]);
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
const gO = {
  animation: {
    Feature: hO
  },
  exit: {
    Feature: pO
  }
};
function q1(n) {
  return {
    point: {
      x: n.pageX,
      y: n.pageY
    }
  };
}
function ib(n, a, r) {
  const { props: s } = n;
  n.animationState && s.whileHover && n.animationState.setActive("whileHover", r === "Start");
  const o = "onHover" + r, c = s[o];
  c && Gn.postRender(() => c(a, q1(a)));
}
class vO extends al {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = Qz(a, (r, s) => (ib(this.node, s, "Start"), (o) => ib(this.node, o, "End"))));
  }
  unmount() {
  }
}
class yO extends al {
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
    this.unmount = Au(J0(this.node.current, "focus", () => this.onFocus()), J0(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function rb(n, a, r) {
  const { props: s } = n;
  if (n.current instanceof HTMLButtonElement && n.current.disabled)
    return;
  n.animationState && s.whileTap && n.animationState.setActive("whileTap", r === "Start");
  const o = "onTap" + (r === "End" ? "" : r), c = s[o];
  c && Gn.postRender(() => c(a, q1(a)));
}
class bO extends al {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: r, propagate: s } = this.node.props;
    this.unmount = e5(a, (o, c) => (rb(this.node, c, "Start"), (h, { success: p }) => rb(this.node, h, p ? "End" : "Cancel")), {
      useGlobalTarget: r,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const nh = /* @__PURE__ */ new WeakMap(), Nf = /* @__PURE__ */ new WeakMap(), xO = (n) => {
  const a = nh.get(n.target);
  a && a(n);
}, SO = (n) => {
  n.forEach(xO);
};
function wO({ root: n, ...a }) {
  const r = n || document;
  Nf.has(r) || Nf.set(r, {});
  const s = Nf.get(r), o = JSON.stringify(a);
  return s[o] || (s[o] = new IntersectionObserver(SO, { root: n, ...a })), s[o];
}
function EO(n, a, r) {
  const s = wO(a);
  return nh.set(n, r), s.observe(n), () => {
    nh.delete(n), s.unobserve(n);
  };
}
const jO = {
  some: 0,
  all: 1
};
class TO extends al {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: r, margin: s, amount: o = "some", once: c } = a, h = {
      root: r ? r.current : void 0,
      rootMargin: s,
      threshold: typeof o == "number" ? o : jO[o]
    }, p = (g) => {
      const { isIntersecting: m } = g;
      if (this.isInView === m || (this.isInView = m, c && !m && this.hasEnteredView))
        return;
      m && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", m);
      const { onViewportEnter: b, onViewportLeave: v } = this.node.getProps(), S = m ? b : v;
      S && S(g);
    };
    this.stopObserver = EO(this.node.current, h, p);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: r } = this.node;
    ["amount", "margin", "root"].some(CO(a, r)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function CO({ viewport: n = {} }, { viewport: a = {} } = {}) {
  return (r) => n[r] !== a[r];
}
const NO = {
  inView: {
    Feature: TO
  },
  tap: {
    Feature: bO
  },
  focus: {
    Feature: yO
  },
  hover: {
    Feature: vO
  }
}, $1 = {
  renderer: fO,
  ...gO,
  ...NO
};
var MO = "_1oor31e0", RO = "_1oor31e1", AO = "_1oor31e2", _O = "_1oor31e3", DO = "_1oor31e4", zO = "_1oor31e5", OO = "_1oor31e6", LO = "_1oor31e7", UO = "_1oor31e8";
const kO = 8;
function VO(n) {
  const { entries: a, loading: r, error: s } = n;
  return /* @__PURE__ */ f.jsxs("div", { className: MO, "aria-busy": !!r, children: [
    s && /* @__PURE__ */ f.jsx(_n, { severity: "error", children: s }),
    r && !s && /* @__PURE__ */ f.jsx("div", { className: UO, "aria-live": "polite", children: "Loading edit history…" }),
    !r && !s && a.length === 0 && /* @__PURE__ */ f.jsx("div", { className: LO, children: "No edits yet" }),
    !r && !s && a.length > 0 && /* @__PURE__ */ f.jsx("ul", { className: RO, children: a.map((o) => /* @__PURE__ */ f.jsxs("li", { className: AO, children: [
      /* @__PURE__ */ f.jsx("span", { className: _O, children: HO(o.recorded_at) }),
      /* @__PURE__ */ f.jsx("span", { className: DO, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ f.jsx("span", { className: zO, title: o.digest_after, children: BO(o.digest_after) }),
      /* @__PURE__ */ f.jsx("span", { className: OO, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function BO(n) {
  return n ? `${n.slice(0, kO)}…` : "—";
}
function HO(n) {
  const a = new Date(n);
  return Number.isNaN(a.getTime()) ? n : a.toLocaleString();
}
var lb = "_1c63kaw0", qO = "_1c63kaw1", $O = "_1c63kaw2", IO = "_1c63kaw3", YO = "_1c63kaw4", FO = "_1c63kaw5", GO = "_1c63kaw6", XO = "_1c63kaw7";
function KO({ chain: n, onRemoveOp: a }) {
  return n.ops.length === 0 ? /* @__PURE__ */ f.jsx("div", { className: lb, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ f.jsx("span", { className: qO, children: "No edits yet" }) }) : /* @__PURE__ */ f.jsx("ol", { className: lb, "data-testid": "edit-chain-list", children: n.ops.map((r, s) => /* @__PURE__ */ f.jsxs("li", { className: $O, children: [
    /* @__PURE__ */ f.jsxs("span", { className: IO, "aria-hidden": "true", children: [
      s + 1,
      "."
    ] }),
    /* @__PURE__ */ f.jsxs("span", { className: YO, children: [
      /* @__PURE__ */ f.jsx("span", { className: FO, children: sb(r) }),
      /* @__PURE__ */ f.jsx("span", { className: GO, children: QO(r) })
    ] }),
    /* @__PURE__ */ f.jsx(
      "button",
      {
        type: "button",
        className: XO,
        onClick: () => a(r.id),
        "aria-label": `Remove ${sb(r)} (position ${s + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, r.id)) });
}
function sb(n) {
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
    default:
      return "Op";
  }
}
function QO(n) {
  switch (n.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${ob(n.start_ms)} → ${ob(n.end_ms)}`;
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
      return `${Mf(n.low_db)} / ${Mf(n.mid_db)} / ${Mf(n.high_db)}`;
    case "pitch_shift":
      return `${n.semitones >= 0 ? "+" : ""}${n.semitones.toFixed(1)} st`;
    case "silence_strip":
      return `${n.threshold_db.toFixed(0)} dB`;
    default:
      return "—";
  }
}
function Mf(n) {
  return `${n >= 0 ? "+" : ""}${n.toFixed(0)}`;
}
function ob(n) {
  return !Number.isFinite(n) || n < 0 ? "0.00s" : `${(n / 1e3).toFixed(2)}s`;
}
var Wo = "_1o3ytop0", ZO = "_1o3ytop1", PO = "_1o3ytop2", JO = "_1o3ytop3", WO = "_1o3ytop4", eu = "_1o3ytop5", e4 = "_1o3ytop6", t4 = "_1o3ytopc", n4 = "_1o3ytopd", a4 = "_1o3ytope", i4 = "_1o3ytopf", r4 = "_1o3ytopg", l4 = "_1o3ytoph";
const ub = -16;
function s4(n) {
  const {
    voiceAsset: a,
    deploymentId: r,
    affectedCharacterNames: s = [],
    onChainPersisted: o,
    onError: c
  } = n, h = a.durationMs ?? 0, p = x.useMemo(
    () => o4(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [g, m] = x.useState(() => Rf(h)), [b, v] = x.useState(Mu), [S, w] = x.useState(!1), [j, T] = x.useState(null), [_, C] = x.useState(null), [z, O] = x.useState(!1), [R, X] = x.useState(!1), [$, Q] = x.useState(!1), [M, B] = x.useState(null), [J, se] = x.useState([]), [oe, be] = x.useState(null), [Se, le] = x.useState([]), [U, k] = x.useState(!1), [q, Z] = x.useState(null), [ae, N] = x.useState(0), P = x.useRef(null), W = x.useRef(null), ie = x.useRef(null), de = x.useRef(null), ye = x.useRef(null), De = x.useRef(0), Re = x.useMemo(
    () => g.ops.some((ge) => ge.mode === "normalize"),
    [g.ops]
  );
  x.useEffect(() => {
    const ge = Rf(h);
    m(ge), v(ox(ge)), T(null), Q(!1), se([]), be(null), ye.current = null;
  }, [a.voiceAssetId, h]);
  const Be = x.useCallback((ge) => {
    v(ge), m((ze) => sx(ze, ge));
  }, []);
  x.useEffect(() => {
    de.current?.abort();
    const ge = new AbortController();
    return de.current = ge, k(!0), Z(null), ru(r, "voice_asset", a.voiceAssetId, 50, {
      signal: ge.signal
    }).then((ze) => {
      ge.signal.aborted || le(ze.entries);
    }).catch((ze) => {
      if (ge.signal.aborted) return;
      const Qe = ze instanceof Error ? ze.message : "audit fetch failed";
      Z(Qe);
    }).finally(() => {
      ge.signal.aborted || k(!1);
    }), () => ge.abort();
  }, [r, a.voiceAssetId, ae]), x.useEffect(() => () => {
    _ && URL.revokeObjectURL(_);
  }, [_]), x.useEffect(() => () => {
    W.current?.abort(), ie.current?.abort(), de.current?.abort();
  }, []);
  const fe = g.ops.find((ge) => ge.mode === "trim"), Oe = g.ops.find((ge) => ge.mode === "normalize"), Ae = fe?.start_ms ?? 0, pe = fe?.end_ms ?? Math.max(1, h), tt = x.useCallback((ge, ze) => {
    m(
      (Qe) => cb(
        Qe,
        "trim",
        (nt) => ({
          ...nt,
          mode: "trim",
          start_ms: Math.max(0, Math.floor(ge)),
          end_ms: Math.max(Math.floor(ge) + 1, Math.floor(ze))
        })
      )
    );
  }, []), Et = x.useCallback(
    (ge) => tt(ge, pe),
    [pe, tt]
  ), en = x.useCallback(
    (ge) => tt(Ae, ge),
    [Ae, tt]
  ), Gt = x.useCallback((ge) => {
    m((ze) => {
      const Qe = ze.ops.filter((nt) => nt.mode !== "normalize");
      if (ge) {
        const nt = {
          id: vn(),
          mode: "normalize",
          target_lufs: ub
        };
        return { ...ze, ops: [...Qe, nt] };
      }
      return { ...ze, ops: Qe };
    });
  }, []), ma = x.useCallback(
    (ge) => {
      const ze = g.ops.findIndex((Bt) => Bt.id === ge);
      if (ze === -1) return;
      const Qe = g.ops[ze];
      if (!Qe) return;
      const nt = [...g.ops.slice(0, ze), ...g.ops.slice(ze + 1)];
      m({ ...g, ops: nt }), se((Bt) => [...Bt, { op: Qe, index: ze }]);
    },
    [g]
  ), Xt = x.useCallback(() => {
    const ge = J[J.length - 1];
    if (!ge) return;
    const ze = Math.min(ge.index, g.ops.length), Qe = [...g.ops.slice(0, ze), ge.op, ...g.ops.slice(ze)];
    m({ ...g, ops: Qe }), se(J.slice(0, -1));
  }, [g, J]), yn = x.useCallback(() => {
    const ge = Jb(g, h);
    return ge ? (T(ge.message), !1) : (T(null), !0);
  }, [g, h]), pa = x.useCallback(async () => {
    if (!yn() || z) return;
    W.current?.abort();
    const ge = new AbortController();
    W.current = ge;
    const ze = ++De.current;
    X(!0);
    try {
      const Qe = await BC(a.voiceAssetId, r, g, {
        signal: ge.signal
      });
      if (ge.signal.aborted || ze !== De.current) return;
      _ && URL.revokeObjectURL(_);
      const nt = URL.createObjectURL(Qe);
      C(nt), Q(!0), requestAnimationFrame(() => P.current?.play().catch(() => {
      }));
    } catch (Qe) {
      if (ge.signal.aborted) return;
      const nt = Qe instanceof Error ? Qe.message : "preview failed";
      T(nt), c(nt);
    } finally {
      ge.signal.aborted || X(!1);
    }
  }, [yn, z, a.voiceAssetId, r, g, _, c]), kt = x.useCallback(async () => {
    if (!yn() || R || z) return;
    if (s.length > 1) {
      const ze = s.join(", ");
      if (!window.confirm(
        `This voice asset is referenced by ${s.length} characters: ${ze}.

Applying this edit chain will affect every line they speak in the next batch.

Continue?`
      )) return;
    }
    W.current?.abort(), ie.current?.abort();
    const ge = new AbortController();
    ie.current = ge, O(!0);
    try {
      const ze = ye.current ?? void 0, Qe = await Pb(
        a.voiceAssetId,
        r,
        ze ? { chain: g, digest_before: ze } : { chain: g },
        { signal: ge.signal }
      );
      if (ge.signal.aborted) return;
      ye.current = Qe.chain_digest, be(Qe.chain_digest), T(null), B(Qe.measured_lufs ?? null), se([]), o(Qe), N((nt) => nt + 1);
    } catch (ze) {
      if (ge.signal.aborted) return;
      const Qe = ze instanceof Kr;
      ze instanceof Kr && (ye.current = ze.currentDigest || null);
      const nt = Qe ? "Edit chain has changed in another tab. Reload to continue." : ze instanceof Error ? ze.message : "apply failed";
      T(nt), c(nt);
    } finally {
      ge.signal.aborted || O(!1);
    }
  }, [
    yn,
    R,
    z,
    s,
    a.voiceAssetId,
    r,
    g,
    o,
    c
  ]), Dn = x.useCallback(() => {
    W.current?.abort(), m(Rf(h)), T(null), B(null), Q(!1), se([]), N((ge) => ge + 1), _ && (URL.revokeObjectURL(_), C(null));
  }, [h, _]), Vt = x.useCallback((ge) => {
    m(
      (ze) => cb(
        ze,
        "normalize",
        (Qe) => ({
          ...Qe,
          mode: "normalize",
          target_lufs: ge
        })
      )
    );
  }, []);
  return /* @__PURE__ */ f.jsxs(yx, { variant: "standalone", children: [
    /* @__PURE__ */ f.jsx(
      bx,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${tu(h)}`
      }
    ),
    /* @__PURE__ */ f.jsx(
      gx,
      {
        audioUrl: p,
        durationMs: Math.max(1, h),
        startMs: Ae,
        endMs: pe,
        onChangeStart: Et,
        onChangeEnd: en
      }
    ),
    /* @__PURE__ */ f.jsxs("div", { className: Wo, children: [
      /* @__PURE__ */ f.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ f.jsxs("span", { className: ZO, children: [
        tu(Ae),
        " → ",
        tu(pe),
        " · ",
        tu(pe - Ae)
      ] })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: WO, children: [
      /* @__PURE__ */ f.jsxs("div", { className: eu, children: [
        /* @__PURE__ */ f.jsxs("span", { className: Wo, children: [
          /* @__PURE__ */ f.jsx("span", { children: "Normalize loudness" }),
          Re && Oe && /* @__PURE__ */ f.jsxs("span", { className: t4, children: [
            "target ",
            Oe.target_lufs.toFixed(1),
            " LUFS",
            M !== null && ` · measured ${M.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ f.jsxs("label", { className: e4, children: [
          /* @__PURE__ */ f.jsx(
            "input",
            {
              type: "checkbox",
              checked: Re,
              onChange: (ge) => Gt(ge.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ f.jsxs("span", { children: [
            "Target ",
            ub.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        Re && Oe && /* @__PURE__ */ f.jsx(
          "input",
          {
            type: "range",
            className: a4,
            min: -30,
            max: -6,
            step: 0.5,
            value: Oe.target_lufs,
            onChange: (ge) => Vt(Number(ge.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: eu, children: [
        /* @__PURE__ */ f.jsxs("span", { className: Wo, children: [
          "Operations · ",
          g.ops.length
        ] }),
        /* @__PURE__ */ f.jsx(KO, { chain: g, onRemoveOp: ma })
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: eu, children: [
        /* @__PURE__ */ f.jsxs(
          "button",
          {
            type: "button",
            className: PO,
            onClick: () => w((ge) => !ge),
            "aria-expanded": S,
            children: [
              S ? "▾" : "▸",
              " Advanced effects · gain · eq · pitch · fade · silence trim"
            ]
          }
        ),
        S && /* @__PURE__ */ f.jsx(
          wh,
          {
            state: b,
            onChange: Be,
            supportsSynthSpeed: !1
          }
        )
      ] }),
      oe && /* @__PURE__ */ f.jsx("div", { className: eu, children: /* @__PURE__ */ f.jsxs("span", { className: Wo, children: [
        /* @__PURE__ */ f.jsx("span", { children: "Chain digest" }),
        /* @__PURE__ */ f.jsxs("span", { className: JO, title: oe, children: [
          oe.slice(0, 12),
          "…"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ f.jsxs(xx, { children: [
      /* @__PURE__ */ f.jsx(
        Ze,
        {
          variant: "secondary",
          onClick: () => void pa(),
          disabled: R || z,
          children: R ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ f.jsx(
        Ze,
        {
          onClick: () => void kt(),
          disabled: z || R,
          children: z ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ f.jsx(
        Ze,
        {
          variant: "ghost",
          onClick: Dn,
          disabled: z || R,
          children: "Reset"
        }
      ),
      J.length > 0 && /* @__PURE__ */ f.jsxs(
        Ze,
        {
          variant: "ghost",
          size: "sm",
          onClick: Xt,
          disabled: z || R,
          "data-testid": "undo-last-removal",
          "aria-label": "Undo last removal",
          children: [
            "Undo last removal (",
            J.length,
            ")"
          ]
        }
      ),
      $ && /* @__PURE__ */ f.jsx(
        "span",
        {
          className: l4,
          "data-testid": "preview-consumed-hint",
          role: "note",
          "aria-live": "polite",
          children: "Preview again after edits to verify before applying"
        }
      )
    ] }),
    _ && // biome-ignore lint/a11y/useMediaCaption: synthesised speech preview, no captions track
    /* @__PURE__ */ f.jsx(
      "audio",
      {
        ref: P,
        src: _,
        controls: !0,
        className: n4,
        "aria-label": "Edit preview"
      }
    ),
    j && /* @__PURE__ */ f.jsx(_n, { severity: "error", children: j }),
    /* @__PURE__ */ f.jsxs("details", { className: i4, children: [
      /* @__PURE__ */ f.jsxs("summary", { className: r4, children: [
        "Edit history",
        Se.length > 0 ? ` · ${Se.length}` : ""
      ] }),
      /* @__PURE__ */ f.jsx(
        VO,
        {
          entries: Se,
          loading: U,
          error: q
        }
      )
    ] })
  ] });
}
function Rf(n) {
  return n <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: vn(),
    mode: "trim",
    start_ms: 0,
    end_ms: n
  }] };
}
function cb(n, a, r) {
  const s = n.ops.findIndex((c) => c.mode === a);
  if (s === -1) {
    const c = { id: vn(), mode: a };
    return { ...n, ops: [...n.ops, r(c)] };
  }
  const o = [...n.ops];
  return o[s] = r(o[s]), { ...n, ops: o };
}
function tu(n) {
  return !Number.isFinite(n) || n < 0 ? "0.0s" : n < 1e3 ? `${Math.round(n)} ms` : `${(Math.round(n / 100) / 10).toFixed(1)}s`;
}
function o4(n) {
  return n.startsWith("http://") || n.startsWith("https://") || n.startsWith("/") ? n : `/api/v1/artifacts/${encodeURIComponent(n)}`;
}
var u4 = "go9vi12", c4 = "go9vi13", d4 = "go9vi14", f4 = "go9vi15", h4 = "go9vi16", m4 = "go9vi17", p4 = "go9vi18", g4 = "go9vi19", v4 = "go9vi1a go9vi19", y4 = "go9vi1b", b4 = "go9vi1c", x4 = "go9vi1d", S4 = "go9vi1e", w4 = "go9vi1f", E4 = "go9vi1g", j4 = "go9vi1h", T4 = "go9vi1i", Gi = "go9vi1j", Wl = "go9vi1k", Fr = "go9vi1l", C4 = "go9vi1m go9vi1l", N4 = "go9vi1n", M4 = "go9vi1o go9vi1n", R4 = "go9vi1p go9vi1n", A4 = "go9vi1q", _4 = "go9vi1r", D4 = "go9vi1s", z4 = "go9vi1t", I1 = "go9vi1u", O4 = "go9vi1v", L4 = "go9vi1w", U4 = "go9vi1x go9vi1l", k4 = "go9vi1y", V4 = "go9vi1z", B4 = "go9vi110", H4 = "go9vi111", q4 = "go9vi112", $4 = "go9vi113";
const I4 = ["none", "audio_ref", "vector_preset", "qwen_template"];
function Y4() {
  const { deployment: n, mappings: a, voiceAssets: r } = Ss(), [s, o] = x.useState(a), [c, h] = x.useState(r), [p, g] = x.useState(
    a[0]?.mappingId ?? null
  ), [m, b] = x.useState(""), [v, S] = x.useState(null), [w, j] = x.useState(null), [T, _] = x.useState(null), C = x.useMemo(() => {
    const k = /* @__PURE__ */ new Map();
    for (const q of c) k.set(q.voiceAssetId, q);
    return k;
  }, [c]), z = x.useMemo(() => {
    const k = m.trim().toLowerCase();
    return k ? s.filter((q) => q.characterName.toLowerCase().includes(k)) : s;
  }, [s, m]), O = x.useMemo(
    () => s.find((k) => k.mappingId === p) ?? null,
    [s, p]
  );
  x.useEffect(() => {
    o(a), h(r), g(a[0]?.mappingId ?? null);
  }, [a, r]), x.useEffect(() => {
    if (!w) return;
    const k = setTimeout(() => j(null), 2600);
    return () => clearTimeout(k);
  }, [w]);
  const R = x.useCallback(async () => {
    const k = await cs(n.deploymentId);
    h(k.voiceAssets);
  }, [n.deploymentId]), X = x.useCallback(
    (k) => {
      o(
        (q) => q.map((Z) => Z.mappingId === p ? { ...Z, ...k } : Z)
      );
    },
    [p]
  ), $ = x.useCallback(
    async (k) => {
      if (!O) return;
      const q = O;
      try {
        const Z = await rs(n.deploymentId, O.mappingId, k);
        o((ae) => ae.map((N) => N.mappingId === Z.mappingId ? Z : N));
      } catch (Z) {
        o(
          (ae) => ae.map((N) => N.mappingId === q.mappingId ? q : N)
        ), S(fi(Z));
      }
    },
    [O, n.deploymentId]
  ), Q = x.useCallback(async () => {
    const k = c[0];
    if (!k) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const q = Z4(s), Z = await yh(n.deploymentId, {
        characterName: q,
        speakerVoiceAssetId: k.voiceAssetId,
        defaultEmotionMode: "none"
      });
      o((ae) => [...ae, Z]), g(Z.mappingId);
    } catch (q) {
      S(fi(q));
    }
  }, [n.deploymentId, c, s]), M = x.useCallback(() => {
    O && _({ id: O.mappingId, name: O.characterName });
  }, [O]), B = x.useCallback(async () => {
    if (!T) return;
    const { id: k, name: q } = T;
    _(null);
    try {
      await Kb(n.deploymentId, k), o((Z) => Z.filter((ae) => ae.mappingId !== k)), g(null), j(`Mapping for ${q} deactivated.`);
    } catch (Z) {
      S(fi(Z));
    }
  }, [n.deploymentId, T]), J = x.useCallback(
    async (k, q, Z) => {
      try {
        const ae = await Zb(n.deploymentId, k, q, Z);
        return h((N) => [ae, ...N]), j(`${ae.displayName} uploaded.`), ae;
      } catch (ae) {
        return S(fi(ae)), null;
      }
    },
    [n.deploymentId]
  ), se = x.useCallback(async () => {
    try {
      const k = await AT(n.deploymentId);
      n6(k, `${n.deploymentId}-mappings.json`), j("Mappings exported to JSON.");
    } catch (k) {
      S(fi(k));
    }
  }, [n.deploymentId]), oe = x.useCallback(
    async (k, q) => {
      try {
        const Z = await _T(
          n.deploymentId,
          k.mappings,
          q
        );
        j(
          `Imported ${Z.created.length} • skipped ${Z.skipped.length} • replaced ${Z.replaced.length}.`
        );
        const ae = await cs(n.deploymentId);
        h(ae.voiceAssets);
      } catch (Z) {
        S(fi(Z));
      }
    },
    [n.deploymentId]
  ), be = x.useCallback(
    async (k) => {
      if (await R(), O && k.chain_digest)
        try {
          const q = await rs(n.deploymentId, O.mappingId, {
            voiceAssetChainDigest: k.chain_digest
          });
          o(
            (Z) => Z.map((ae) => ae.mappingId === q.mappingId ? q : ae)
          );
        } catch (q) {
          S(fi(q));
        }
      j("Edit applied.");
    },
    [R, O, n.deploymentId]
  ), Se = x.useCallback((k) => {
    S(k);
  }, []), le = x.useCallback(
    async (k, q) => {
      if (!O) return null;
      const Z = k.trim() || `[${O.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await LT(n.deploymentId, {
          line: Z,
          outputFormat: q
        })).runId };
      } catch (ae) {
        return S(fi(ae)), null;
      }
    },
    [n.deploymentId, O]
  ), U = c.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ f.jsxs("div", { className: u4, children: [
    /* @__PURE__ */ f.jsxs("aside", { className: c4, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ f.jsxs("header", { className: d4, children: [
        /* @__PURE__ */ f.jsxs("div", { children: [
          /* @__PURE__ */ f.jsx("h1", { id: "mapping-sidebar-heading", className: f4, children: "Cast" }),
          /* @__PURE__ */ f.jsxs("span", { className: h4, children: [
            s.length,
            " active · ",
            c.length,
            " ",
            U
          ] })
        ] }),
        /* @__PURE__ */ f.jsx(Ze, { variant: "primary", size: "sm", onClick: Q, children: "+ Add" })
      ] }),
      /* @__PURE__ */ f.jsx(
        "input",
        {
          type: "search",
          className: m4,
          placeholder: "Search characters",
          value: m,
          onChange: (k) => b(k.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ f.jsx(Q4, { onExport: se, onImport: oe, onParseError: S }),
      /* @__PURE__ */ f.jsx("div", { className: p4, children: z.length === 0 ? /* @__PURE__ */ f.jsx(
        ws,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : z.map((k) => {
        const q = C.get(k.speakerVoiceAssetId), Z = k.mappingId === p;
        return /* @__PURE__ */ f.jsxs(
          "button",
          {
            type: "button",
            className: Z ? v4 : g4,
            onClick: () => g(k.mappingId),
            "aria-pressed": Z,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ f.jsx("span", { className: y4, "aria-hidden": "true", children: P4(k.characterName) }),
              /* @__PURE__ */ f.jsxs("span", { className: b4, children: [
                /* @__PURE__ */ f.jsx("span", { className: x4, children: k.characterName }),
                /* @__PURE__ */ f.jsxs("span", { className: S4, children: [
                  k.defaultEmotionMode,
                  " · ",
                  q?.displayName ?? "no voice"
                ] })
              ] })
            ]
          },
          k.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ f.jsxs("section", { className: w4, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ f.jsx(O1, { features: $1, children: /* @__PURE__ */ f.jsx(B5, { children: w && /* @__PURE__ */ f.jsx(
        H1.div,
        {
          className: O4,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: w
        },
        w
      ) }) }),
      v && /* @__PURE__ */ f.jsx(_n, { severity: "error", children: v }),
      T && /* @__PURE__ */ f.jsxs(_n, { severity: "warning", children: [
        /* @__PURE__ */ f.jsxs("span", { style: { flex: 1 }, children: [
          "Deactivate mapping for ",
          T.name,
          "?"
        ] }),
        /* @__PURE__ */ f.jsx(Ze, { variant: "danger", size: "sm", onClick: () => void B(), children: "Delete" }),
        /* @__PURE__ */ f.jsx(Ze, { variant: "ghost", size: "sm", onClick: () => _(null), children: "Cancel" })
      ] }),
      O ? /* @__PURE__ */ f.jsx(
        G4,
        {
          deploymentId: n.deploymentId,
          mapping: O,
          voiceAssets: c,
          allMappings: s,
          onNameChange: (k) => {
            X({ characterName: k });
          },
          onNameBlur: (k) => {
            k !== O.characterName && k.trim() && $({ characterName: k.trim() });
          },
          onSpeakerChange: (k) => {
            X({ speakerVoiceAssetId: k }), $({ speakerVoiceAssetId: k });
          },
          onModeChange: (k) => {
            X({ defaultEmotionMode: k }), $({ defaultEmotionMode: k });
          },
          onQwenChange: (k) => {
            X({ defaultQwenTemplate: k });
          },
          onQwenBlur: (k) => {
            $({ defaultQwenTemplate: k });
          },
          onSpeedChange: (k) => {
            X({ defaultSpeedFactor: k });
          },
          onSpeedCommit: (k) => {
            $({ defaultSpeedFactor: k });
          },
          onEmotionVoiceChange: (k) => {
            const q = k || null;
            X({ defaultEmotionVoiceAssetId: q }), $({ defaultEmotionVoiceAssetId: q });
          },
          onDelete: M,
          onUploadVoice: async (k, q, Z) => {
            const ae = await J(k, q, Z);
            return ae && Z === "speaker" && (X({ speakerVoiceAssetId: ae.voiceAssetId }), $({ speakerVoiceAssetId: ae.voiceAssetId })), await R(), ae;
          },
          onTestLine: le,
          onEditChainPersisted: be,
          onEditError: Se
        },
        O.mappingId
      ) : /* @__PURE__ */ f.jsx(
        F4,
        {
          voiceCount: c.length,
          onUploadVoice: async (k) => {
            await J(k, k.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function F4({ voiceCount: n, onUploadVoice: a }) {
  return n === 0 ? /* @__PURE__ */ f.jsxs(Ua, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ f.jsxs("div", { className: B4, children: [
      /* @__PURE__ */ f.jsx("p", { className: Zi, children: "01 / Onboarding" }),
      /* @__PURE__ */ f.jsx("h2", { id: "onboarding-heading", className: H4, children: "Upload your first voice" }),
      /* @__PURE__ */ f.jsxs("p", { className: q4, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ f.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ f.jsx(
      Y1,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (r) => (await a(r), null)
      }
    )
  ] }) : /* @__PURE__ */ f.jsx(Ua, { density: "airy", children: /* @__PURE__ */ f.jsx(
    ws,
    {
      title: "No character selected.",
      hint: "Pick one on the left or + Add"
    }
  ) });
}
function G4(n) {
  const { mapping: a, voiceAssets: r, allMappings: s } = n, o = r.find((C) => C.voiceAssetId === a.speakerVoiceAssetId) ?? null, c = x.useMemo(
    () => s.filter(
      (C) => C.isActive && C.speakerVoiceAssetId === a.speakerVoiceAssetId
    ).map((C) => C.characterName),
    [s, a.speakerVoiceAssetId]
  ), h = r.find((C) => C.voiceAssetId === a.defaultEmotionVoiceAssetId) ?? null, [p, g] = x.useState(""), [m, b] = x.useState("mp3"), [v, S] = x.useState("idle"), [w, j] = x.useState(null), T = x.useRef(!1);
  x.useEffect(() => (T.current = !1, () => {
    T.current = !0;
  }), []);
  const _ = x.useCallback(async () => {
    T.current = !1, S("running"), j(null);
    const C = await n.onTestLine(p, m);
    if (T.current) return;
    if (!C) {
      S("error"), j("Failed to enqueue test-line run.");
      return;
    }
    const { runId: z } = C;
    for (let O = 0; O < 60; O += 1) {
      if (await new Promise((R) => setTimeout(R, 500)), T.current) return;
      try {
        const R = await bh(n.deploymentId, z);
        if (T.current) return;
        if (R.status === "completed") {
          S("done");
          return;
        }
        if (R.status === "failed" || R.status === "cancelled") {
          S("error"), j(`Run ${R.status}.`);
          return;
        }
      } catch (R) {
        if (T.current) return;
        S("error"), j(R instanceof Error ? R.message : "unknown error");
        return;
      }
    }
    T.current || (S("error"), j("test-line timed out after 30s"));
  }, [n.onTestLine, n.deploymentId, p, m]);
  return /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
    /* @__PURE__ */ f.jsxs("header", { className: E4, children: [
      /* @__PURE__ */ f.jsxs("div", { children: [
        /* @__PURE__ */ f.jsx("p", { className: Zi, children: "Character" }),
        /* @__PURE__ */ f.jsx("h2", { className: j4, children: a.characterName })
      ] }),
      /* @__PURE__ */ f.jsx("div", { className: I1, children: /* @__PURE__ */ f.jsx(Ze, { variant: "danger", size: "sm", onClick: n.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ f.jsxs(
      Ua,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: L4,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ f.jsx(
            "input",
            {
              type: "text",
              className: U4,
              placeholder: `[${a.characterName}] This is a test of the voice.`,
              value: p,
              onChange: (C) => g(C.currentTarget.value),
              "aria-label": "Test-line text",
              disabled: v === "running"
            }
          ),
          /* @__PURE__ */ f.jsxs(
            "select",
            {
              className: Fr,
              value: m,
              onChange: (C) => b(C.currentTarget.value),
              "aria-label": "Test-line output format",
              disabled: v === "running",
              children: [
                /* @__PURE__ */ f.jsx("option", { value: "mp3", children: "mp3" }),
                /* @__PURE__ */ f.jsx("option", { value: "wav", children: "wav" }),
                /* @__PURE__ */ f.jsx("option", { value: "flac", children: "flac" })
              ]
            }
          ),
          /* @__PURE__ */ f.jsx(
            Ze,
            {
              variant: "primary",
              size: "sm",
              onClick: () => void _(),
              disabled: v === "running",
              children: v === "running" ? "Synthesising…" : "Test this line"
            }
          ),
          v === "done" && /* @__PURE__ */ f.jsx(bi, { tone: "success", children: "Synthesised — see host logs for output path." }),
          v === "error" && w && /* @__PURE__ */ f.jsx(bi, { tone: "danger", children: w })
        ]
      }
    ),
    /* @__PURE__ */ f.jsxs("div", { className: T4, children: [
      /* @__PURE__ */ f.jsxs(Ua, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ f.jsx("h3", { id: "identity-heading", className: Zi, children: "01 / Identity & Performance" }),
        /* @__PURE__ */ f.jsxs("label", { className: Wl, children: [
          /* @__PURE__ */ f.jsx("span", { className: Gi, children: "Character name" }),
          /* @__PURE__ */ f.jsx(
            "input",
            {
              className: Fr,
              value: a.characterName,
              onChange: (C) => n.onNameChange(C.currentTarget.value),
              onBlur: (C) => n.onNameBlur(C.currentTarget.value)
            }
          )
        ] }),
        /* @__PURE__ */ f.jsxs("label", { className: Wl, children: [
          /* @__PURE__ */ f.jsx("span", { className: Gi, children: "Emotion mode" }),
          /* @__PURE__ */ f.jsx(
            "select",
            {
              className: Fr,
              value: a.defaultEmotionMode,
              onChange: (C) => n.onModeChange(C.currentTarget.value),
              children: I4.map((C) => /* @__PURE__ */ f.jsx("option", { value: C, children: J4(C) }, C))
            }
          )
        ] }),
        a.defaultEmotionMode === "qwen_template" && /* @__PURE__ */ f.jsxs("label", { className: Wl, children: [
          /* @__PURE__ */ f.jsxs("span", { className: Gi, children: [
            "Qwen template (use ",
            "{seg}",
            " for the line text)"
          ] }),
          /* @__PURE__ */ f.jsx(
            "textarea",
            {
              className: C4,
              value: a.defaultQwenTemplate ?? "",
              onChange: (C) => n.onQwenChange(C.currentTarget.value),
              onBlur: (C) => n.onQwenBlur(C.currentTarget.value)
            }
          )
        ] }),
        a.defaultEmotionMode === "audio_ref" && /* @__PURE__ */ f.jsxs("label", { className: Wl, children: [
          /* @__PURE__ */ f.jsx("span", { className: Gi, children: "Emotion reference" }),
          /* @__PURE__ */ f.jsxs(
            "select",
            {
              className: Fr,
              value: a.defaultEmotionVoiceAssetId ?? "",
              onChange: (C) => n.onEmotionVoiceChange(C.currentTarget.value),
              children: [
                /* @__PURE__ */ f.jsx("option", { value: "", children: "— none —" }),
                r.map((C) => /* @__PURE__ */ f.jsxs("option", { value: C.voiceAssetId, children: [
                  C.displayName,
                  " · ",
                  C.kind
                ] }, C.voiceAssetId))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ f.jsxs("label", { className: Wl, children: [
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
              onChange: (C) => n.onSpeedChange(Number(C.currentTarget.value)),
              onMouseUp: (C) => n.onSpeedCommit(Number(C.currentTarget.value)),
              onTouchEnd: (C) => n.onSpeedCommit(Number(C.currentTarget.value))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ f.jsxs(Ua, { density: "comfortable", "aria-labelledby": "voice-heading", children: [
        /* @__PURE__ */ f.jsx("h3", { id: "voice-heading", className: Zi, children: "02 / Voice Reference" }),
        /* @__PURE__ */ f.jsx("span", { className: Gi, children: "Speaker reference" }),
        /* @__PURE__ */ f.jsx(
          X4,
          {
            value: a.speakerVoiceAssetId,
            voices: r,
            onChange: n.onSpeakerChange
          }
        ),
        o && /* @__PURE__ */ f.jsx(db, { voice: o }),
        /* @__PURE__ */ f.jsx(
          Y1,
          {
            label: o ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (C) => n.onUploadVoice(C, C.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ f.jsx(
          s4,
          {
            voiceAsset: o,
            deploymentId: n.deploymentId,
            affectedCharacterNames: c,
            onChainPersisted: n.onEditChainPersisted,
            onError: n.onEditError
          }
        ),
        h && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
          /* @__PURE__ */ f.jsx("span", { className: Gi, children: "Emotion reference voice" }),
          /* @__PURE__ */ f.jsx(db, { voice: h })
        ] })
      ] })
    ] })
  ] });
}
function X4({
  value: n,
  voices: a,
  onChange: r
}) {
  return /* @__PURE__ */ f.jsxs(
    "select",
    {
      className: Fr,
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
function db({ voice: n }) {
  const a = W4(n.durationMs ?? null);
  return /* @__PURE__ */ f.jsxs("div", { children: [
    /* @__PURE__ */ f.jsxs("div", { className: A4, children: [
      /* @__PURE__ */ f.jsx("span", { children: n.displayName }),
      /* @__PURE__ */ f.jsx("span", { children: n.kind }),
      n.durationMs != null && /* @__PURE__ */ f.jsx("span", { children: e6(n.durationMs) }),
      n.sampleRate && /* @__PURE__ */ f.jsxs("span", { children: [
        n.sampleRate,
        " Hz"
      ] })
    ] }),
    n.durationMs != null && /* @__PURE__ */ f.jsxs("div", { className: _4, children: [
      /* @__PURE__ */ f.jsx("div", { className: D4, children: /* @__PURE__ */ f.jsx(O1, { features: $1, children: /* @__PURE__ */ f.jsx(
        H1.div,
        {
          className: z4,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, n.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ f.jsx(bi, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ f.jsx(K4, { seed: n.contentSha256 })
  ] });
}
function K4({ seed: n }) {
  const a = x.useMemo(() => t6(n, 48), [n]);
  return /* @__PURE__ */ f.jsx("div", { className: k4, "aria-hidden": "true", children: a.map((r, s) => /* @__PURE__ */ f.jsx(
    "span",
    {
      className: V4,
      style: { height: `${Math.max(6, r * 100)}%` }
    },
    `${n}-${s}`
  )) });
}
function Y1({
  label: n,
  onFile: a
}) {
  const [r, s] = x.useState(!1), [o, c] = x.useState(!1), h = x.useRef(null), p = x.useCallback(
    async (g) => {
      c(!0);
      try {
        await a(g);
      } finally {
        c(!1);
      }
    },
    [a]
  );
  return /* @__PURE__ */ f.jsxs(
    "div",
    {
      className: o ? R4 : r ? M4 : N4,
      onDragOver: (g) => {
        g.preventDefault(), s(!0);
      },
      onDragLeave: () => s(!1),
      onDrop: (g) => {
        g.preventDefault(), s(!1);
        const m = g.dataTransfer.files?.[0];
        m && p(m);
      },
      onClick: () => h.current?.click(),
      role: "button",
      tabIndex: 0,
      onKeyDown: (g) => {
        (g.key === "Enter" || g.key === " ") && (g.preventDefault(), h.current?.click());
      },
      "aria-busy": o,
      children: [
        /* @__PURE__ */ f.jsx(
          "input",
          {
            ref: h,
            type: "file",
            accept: "audio/*",
            onChange: (g) => {
              const m = g.currentTarget.files?.[0];
              m && p(m), g.currentTarget.value = "";
            }
          }
        ),
        o ? "Uploading…" : n
      ]
    }
  );
}
function Q4({
  onExport: n,
  onImport: a,
  onParseError: r
}) {
  const [s, o] = x.useState("error"), c = x.useRef(null);
  return /* @__PURE__ */ f.jsxs("div", { className: I1, children: [
    /* @__PURE__ */ f.jsx(Ze, { variant: "secondary", size: "sm", onClick: n, children: "Export JSON" }),
    /* @__PURE__ */ f.jsx(
      "input",
      {
        ref: c,
        type: "file",
        accept: "application/json,.json",
        className: $4,
        "aria-hidden": "true",
        tabIndex: -1,
        onChange: async (h) => {
          const p = h.currentTarget.files?.[0];
          if (h.currentTarget.value = "", !!p)
            try {
              const g = await p.text(), m = JSON.parse(g);
              a(m, s);
            } catch {
              r("Import failed: file is not a valid JSON mapping bundle.");
            }
        }
      }
    ),
    /* @__PURE__ */ f.jsx(Ze, { variant: "secondary", size: "sm", onClick: () => c.current?.click(), children: "Import JSON" }),
    /* @__PURE__ */ f.jsxs(
      "select",
      {
        className: Fr,
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
function Z4(n) {
  const a = new Set(n.map((s) => s.characterName.toLowerCase()));
  let r = 1;
  for (; a.has(`character ${r}`); ) r += 1;
  return `Character ${r}`;
}
function P4(n) {
  const a = n.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function J4(n) {
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
function W4(n) {
  return n == null ? null : n < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : n > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : n > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function e6(n) {
  return n < 1e3 ? `${n} ms` : `${Math.round(n / 100) / 10}s`;
}
function t6(n, a) {
  const r = [];
  for (let s = 0; s < a; s += 1) {
    const o = n.charCodeAt(s % n.length);
    r.push((o * 31 + s * 7) % 100 / 100);
  }
  return r;
}
function n6(n, a) {
  const r = new Blob([JSON.stringify(n, null, 2)], { type: "application/json" }), s = URL.createObjectURL(r), o = document.createElement("a");
  o.href = s, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(s);
}
function fi(n) {
  return n instanceof Jr || n instanceof Error ? n.message : "unknown error";
}
function a6() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: n } = await MT();
        return { deployments: n };
      },
      Component: lC
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: n }) => {
        const a = qr(n, "deploymentId");
        return UE(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: n }) => {
        const a = qr(n, "deploymentId"), [r, { mappings: s }, { runs: o }, c] = await Promise.all([
          dy(a),
          fy(a),
          DT(a, { limit: 10 }),
          UT(a)
        ]);
        return { deployment: r, mappings: s, runs: o, workflow: c };
      },
      Component: k2
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: n }) => {
        const a = qr(n, "deploymentId"), r = qr(n, "runId");
        return { run: await bh(a, r) };
      },
      Component: J_
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: n }) => {
        const a = qr(n, "deploymentId"), [r, { mappings: s }, { voiceAssets: o }] = await Promise.all([
          dy(a),
          fy(a),
          cs(a)
        ]);
        return { deployment: r, mappings: s, voiceAssets: o };
      },
      Component: Y4
    },
    {
      path: "/:deploymentId/mappings/new",
      loader: ({ params: n, request: a }) => {
        const r = qr(n, "deploymentId"), s = new URL(a.url);
        return {
          deploymentId: r,
          prefillCharacterName: s.searchParams.get("character") ?? ""
        };
      },
      Component: _3
    },
    {
      path: "/runtime/queue",
      Component: N3
    }
  ];
}
function qr(n, a) {
  const r = n[a];
  if (!r)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return r;
}
const ah = "emotion-tts-app", i6 = "ext-event", fb = "emotion-tts-stylesheet", hb = ["accent", "density", "card"];
function r6(n) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[n];
}
function l6() {
  if (typeof document > "u" || document.getElementById(fb)) return;
  const n = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = fb, a.rel = "stylesheet", a.href = n, document.head.appendChild(a);
}
l6();
class s6 extends HTMLElement {
  root = null;
  ctx = null;
  observer = null;
  static get observedAttributes() {
    return ["route", "deployment-id"];
  }
  connectedCallback() {
    this.root = sE.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.paint();
  }
  attributeChangedCallback() {
    this.paint();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null;
  }
  syncTweaksFromBody() {
    for (const a of hb) {
      const r = r6(a);
      r === void 0 ? delete this.dataset[a] : this.dataset[a] !== r && (this.dataset[a] = r);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: hb.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), r = Ij(a6(), { initialEntries: [a] });
    this.root.render(
      /* @__PURE__ */ f.jsx(x.StrictMode, { children: /* @__PURE__ */ f.jsx(Fj, { router: r }) })
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
      new CustomEvent(i6, {
        detail: { topic: a, payload: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function o6() {
  typeof customElements > "u" || customElements.get(ah) || customElements.define(ah, s6);
}
typeof customElements < "u" && !customElements.get(ah) && o6();
export {
  o6 as register
};
//# sourceMappingURL=emotion-tts.js.map
