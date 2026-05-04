function oE(n, a) {
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
function wb(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var qd = { exports: {} }, Il = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zv;
function uE() {
  if (zv) return Il;
  zv = 1;
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
  return Il.Fragment = a, Il.jsx = r, Il.jsxs = r, Il;
}
var Ov;
function cE() {
  return Ov || (Ov = 1, qd.exports = uE()), qd.exports;
}
var f = cE(), $d = { exports: {} }, Ue = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Lv;
function dE() {
  if (Lv) return Ue;
  Lv = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), h = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), S = Symbol.iterator;
  function w(N) {
    return N === null || typeof N != "object" ? null : (N = S && N[S] || N["@@iterator"], typeof N == "function" ? N : null);
  }
  var T = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, j = Object.assign, _ = {};
  function C(N, K, Z) {
    this.props = N, this.context = K, this.refs = _, this.updater = Z || T;
  }
  C.prototype.isReactComponent = {}, C.prototype.setState = function(N, K) {
    if (typeof N != "object" && typeof N != "function" && N != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, N, K, "setState");
  }, C.prototype.forceUpdate = function(N) {
    this.updater.enqueueForceUpdate(this, N, "forceUpdate");
  };
  function L() {
  }
  L.prototype = C.prototype;
  function z(N, K, Z) {
    this.props = N, this.context = K, this.refs = _, this.updater = Z || T;
  }
  var R = z.prototype = new L();
  R.constructor = z, j(R, C.prototype), R.isPureReactComponent = !0;
  var J = Array.isArray;
  function G() {
  }
  var W = { H: null, A: null, T: null, S: null }, A = Object.prototype.hasOwnProperty;
  function O(N, K, Z) {
    var le = Z.ref;
    return {
      $$typeof: n,
      type: N,
      key: K,
      ref: le !== void 0 ? le : null,
      props: Z
    };
  }
  function $(N, K) {
    return O(N.type, K, N.props);
  }
  function re(N) {
    return typeof N == "object" && N !== null && N.$$typeof === n;
  }
  function ae(N) {
    var K = { "=": "=0", ":": "=2" };
    return "$" + N.replace(/[=:]/g, function(Z) {
      return K[Z];
    });
  }
  var me = /\/+/g;
  function ge(N, K) {
    return typeof N == "object" && N !== null && N.key != null ? ae("" + N.key) : K.toString(36);
  }
  function oe(N) {
    switch (N.status) {
      case "fulfilled":
        return N.value;
      case "rejected":
        throw N.reason;
      default:
        switch (typeof N.status == "string" ? N.then(G, G) : (N.status = "pending", N.then(
          function(K) {
            N.status === "pending" && (N.status = "fulfilled", N.value = K);
          },
          function(K) {
            N.status === "pending" && (N.status = "rejected", N.reason = K);
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
  function U(N, K, Z, le, ce) {
    var ve = typeof N;
    (ve === "undefined" || ve === "boolean") && (N = null);
    var ze = !1;
    if (N === null) ze = !0;
    else
      switch (ve) {
        case "bigint":
        case "string":
        case "number":
          ze = !0;
          break;
        case "object":
          switch (N.$$typeof) {
            case n:
            case a:
              ze = !0;
              break;
            case b:
              return ze = N._init, U(
                ze(N._payload),
                K,
                Z,
                le,
                ce
              );
          }
      }
    if (ze)
      return ce = ce(N), ze = le === "" ? "." + ge(N, 0) : le, J(ce) ? (Z = "", ze != null && (Z = ze.replace(me, "$&/") + "/"), U(ce, K, Z, "", function(kt) {
        return kt;
      })) : ce != null && (re(ce) && (ce = $(
        ce,
        Z + (ce.key == null || N && N.key === ce.key ? "" : ("" + ce.key).replace(
          me,
          "$&/"
        ) + "/") + ze
      )), K.push(ce)), 1;
    ze = 0;
    var _e = le === "" ? "." : le + ":";
    if (J(N))
      for (var Be = 0; Be < N.length; Be++)
        le = N[Be], ve = _e + ge(le, Be), ze += U(
          le,
          K,
          Z,
          ve,
          ce
        );
    else if (Be = w(N), typeof Be == "function")
      for (N = Be.call(N), Be = 0; !(le = N.next()).done; )
        le = le.value, ve = _e + ge(le, Be++), ze += U(
          le,
          K,
          Z,
          ve,
          ce
        );
    else if (ve === "object") {
      if (typeof N.then == "function")
        return U(
          oe(N),
          K,
          Z,
          le,
          ce
        );
      throw K = String(N), Error(
        "Objects are not valid as a React child (found: " + (K === "[object Object]" ? "object with keys {" + Object.keys(N).join(", ") + "}" : K) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ze;
  }
  function V(N, K, Z) {
    if (N == null) return N;
    var le = [], ce = 0;
    return U(N, le, "", "", function(ve) {
      return K.call(Z, ve, ce++);
    }), le;
  }
  function q(N) {
    if (N._status === -1) {
      var K = N._result;
      K = K(), K.then(
        function(Z) {
          (N._status === 0 || N._status === -1) && (N._status = 1, N._result = Z);
        },
        function(Z) {
          (N._status === 0 || N._status === -1) && (N._status = 2, N._result = Z);
        }
      ), N._status === -1 && (N._status = 0, N._result = K);
    }
    if (N._status === 1) return N._result.default;
    throw N._result;
  }
  var Q = typeof reportError == "function" ? reportError : function(N) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var K = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof N == "object" && N !== null && typeof N.message == "string" ? String(N.message) : String(N),
        error: N
      });
      if (!window.dispatchEvent(K)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", N);
      return;
    }
    console.error(N);
  }, te = {
    map: V,
    forEach: function(N, K, Z) {
      V(
        N,
        function() {
          K.apply(this, arguments);
        },
        Z
      );
    },
    count: function(N) {
      var K = 0;
      return V(N, function() {
        K++;
      }), K;
    },
    toArray: function(N) {
      return V(N, function(K) {
        return K;
      }) || [];
    },
    only: function(N) {
      if (!re(N))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return N;
    }
  };
  return Ue.Activity = v, Ue.Children = te, Ue.Component = C, Ue.Fragment = r, Ue.Profiler = o, Ue.PureComponent = z, Ue.StrictMode = s, Ue.Suspense = g, Ue.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = W, Ue.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(N) {
      return W.H.useMemoCache(N);
    }
  }, Ue.cache = function(N) {
    return function() {
      return N.apply(null, arguments);
    };
  }, Ue.cacheSignal = function() {
    return null;
  }, Ue.cloneElement = function(N, K, Z) {
    if (N == null)
      throw Error(
        "The argument must be a React element, but you passed " + N + "."
      );
    var le = j({}, N.props), ce = N.key;
    if (K != null)
      for (ve in K.key !== void 0 && (ce = "" + K.key), K)
        !A.call(K, ve) || ve === "key" || ve === "__self" || ve === "__source" || ve === "ref" && K.ref === void 0 || (le[ve] = K[ve]);
    var ve = arguments.length - 2;
    if (ve === 1) le.children = Z;
    else if (1 < ve) {
      for (var ze = Array(ve), _e = 0; _e < ve; _e++)
        ze[_e] = arguments[_e + 2];
      le.children = ze;
    }
    return O(N.type, ce, le);
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
  }, Ue.createElement = function(N, K, Z) {
    var le, ce = {}, ve = null;
    if (K != null)
      for (le in K.key !== void 0 && (ve = "" + K.key), K)
        A.call(K, le) && le !== "key" && le !== "__self" && le !== "__source" && (ce[le] = K[le]);
    var ze = arguments.length - 2;
    if (ze === 1) ce.children = Z;
    else if (1 < ze) {
      for (var _e = Array(ze), Be = 0; Be < ze; Be++)
        _e[Be] = arguments[Be + 2];
      ce.children = _e;
    }
    if (N && N.defaultProps)
      for (le in ze = N.defaultProps, ze)
        ce[le] === void 0 && (ce[le] = ze[le]);
    return O(N, ve, ce);
  }, Ue.createRef = function() {
    return { current: null };
  }, Ue.forwardRef = function(N) {
    return { $$typeof: p, render: N };
  }, Ue.isValidElement = re, Ue.lazy = function(N) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: N },
      _init: q
    };
  }, Ue.memo = function(N, K) {
    return {
      $$typeof: m,
      type: N,
      compare: K === void 0 ? null : K
    };
  }, Ue.startTransition = function(N) {
    var K = W.T, Z = {};
    W.T = Z;
    try {
      var le = N(), ce = W.S;
      ce !== null && ce(Z, le), typeof le == "object" && le !== null && typeof le.then == "function" && le.then(G, Q);
    } catch (ve) {
      Q(ve);
    } finally {
      K !== null && Z.types !== null && (K.types = Z.types), W.T = K;
    }
  }, Ue.unstable_useCacheRefresh = function() {
    return W.H.useCacheRefresh();
  }, Ue.use = function(N) {
    return W.H.use(N);
  }, Ue.useActionState = function(N, K, Z) {
    return W.H.useActionState(N, K, Z);
  }, Ue.useCallback = function(N, K) {
    return W.H.useCallback(N, K);
  }, Ue.useContext = function(N) {
    return W.H.useContext(N);
  }, Ue.useDebugValue = function() {
  }, Ue.useDeferredValue = function(N, K) {
    return W.H.useDeferredValue(N, K);
  }, Ue.useEffect = function(N, K) {
    return W.H.useEffect(N, K);
  }, Ue.useEffectEvent = function(N) {
    return W.H.useEffectEvent(N);
  }, Ue.useId = function() {
    return W.H.useId();
  }, Ue.useImperativeHandle = function(N, K, Z) {
    return W.H.useImperativeHandle(N, K, Z);
  }, Ue.useInsertionEffect = function(N, K) {
    return W.H.useInsertionEffect(N, K);
  }, Ue.useLayoutEffect = function(N, K) {
    return W.H.useLayoutEffect(N, K);
  }, Ue.useMemo = function(N, K) {
    return W.H.useMemo(N, K);
  }, Ue.useOptimistic = function(N, K) {
    return W.H.useOptimistic(N, K);
  }, Ue.useReducer = function(N, K, Z) {
    return W.H.useReducer(N, K, Z);
  }, Ue.useRef = function(N) {
    return W.H.useRef(N);
  }, Ue.useState = function(N) {
    return W.H.useState(N);
  }, Ue.useSyncExternalStore = function(N, K, Z) {
    return W.H.useSyncExternalStore(
      N,
      K,
      Z
    );
  }, Ue.useTransition = function() {
    return W.H.useTransition();
  }, Ue.version = "19.2.5", Ue;
}
var Uv;
function ch() {
  return Uv || (Uv = 1, $d.exports = dE()), $d.exports;
}
var x = ch();
const de = /* @__PURE__ */ wb(x), fE = /* @__PURE__ */ oE({
  __proto__: null,
  default: de
}, [x]);
var Id = { exports: {} }, Yl = {}, Yd = { exports: {} }, Fd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kv;
function hE() {
  return kv || (kv = 1, (function(n) {
    function a(U, V) {
      var q = U.length;
      U.push(V);
      e: for (; 0 < q; ) {
        var Q = q - 1 >>> 1, te = U[Q];
        if (0 < o(te, V))
          U[Q] = V, U[q] = te, q = Q;
        else break e;
      }
    }
    function r(U) {
      return U.length === 0 ? null : U[0];
    }
    function s(U) {
      if (U.length === 0) return null;
      var V = U[0], q = U.pop();
      if (q !== V) {
        U[0] = q;
        e: for (var Q = 0, te = U.length, N = te >>> 1; Q < N; ) {
          var K = 2 * (Q + 1) - 1, Z = U[K], le = K + 1, ce = U[le];
          if (0 > o(Z, q))
            le < te && 0 > o(ce, Z) ? (U[Q] = ce, U[le] = q, Q = le) : (U[Q] = Z, U[K] = q, Q = K);
          else if (le < te && 0 > o(ce, q))
            U[Q] = ce, U[le] = q, Q = le;
          else break e;
        }
      }
      return V;
    }
    function o(U, V) {
      var q = U.sortIndex - V.sortIndex;
      return q !== 0 ? q : U.id - V.id;
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
    var g = [], m = [], b = 1, v = null, S = 3, w = !1, T = !1, j = !1, _ = !1, C = typeof setTimeout == "function" ? setTimeout : null, L = typeof clearTimeout == "function" ? clearTimeout : null, z = typeof setImmediate < "u" ? setImmediate : null;
    function R(U) {
      for (var V = r(m); V !== null; ) {
        if (V.callback === null) s(m);
        else if (V.startTime <= U)
          s(m), V.sortIndex = V.expirationTime, a(g, V);
        else break;
        V = r(m);
      }
    }
    function J(U) {
      if (j = !1, R(U), !T)
        if (r(g) !== null)
          T = !0, G || (G = !0, ae());
        else {
          var V = r(m);
          V !== null && oe(J, V.startTime - U);
        }
    }
    var G = !1, W = -1, A = 5, O = -1;
    function $() {
      return _ ? !0 : !(n.unstable_now() - O < A);
    }
    function re() {
      if (_ = !1, G) {
        var U = n.unstable_now();
        O = U;
        var V = !0;
        try {
          e: {
            T = !1, j && (j = !1, L(W), W = -1), w = !0;
            var q = S;
            try {
              t: {
                for (R(U), v = r(g); v !== null && !(v.expirationTime > U && $()); ) {
                  var Q = v.callback;
                  if (typeof Q == "function") {
                    v.callback = null, S = v.priorityLevel;
                    var te = Q(
                      v.expirationTime <= U
                    );
                    if (U = n.unstable_now(), typeof te == "function") {
                      v.callback = te, R(U), V = !0;
                      break t;
                    }
                    v === r(g) && s(g), R(U);
                  } else s(g);
                  v = r(g);
                }
                if (v !== null) V = !0;
                else {
                  var N = r(m);
                  N !== null && oe(
                    J,
                    N.startTime - U
                  ), V = !1;
                }
              }
              break e;
            } finally {
              v = null, S = q, w = !1;
            }
            V = void 0;
          }
        } finally {
          V ? ae() : G = !1;
        }
      }
    }
    var ae;
    if (typeof z == "function")
      ae = function() {
        z(re);
      };
    else if (typeof MessageChannel < "u") {
      var me = new MessageChannel(), ge = me.port2;
      me.port1.onmessage = re, ae = function() {
        ge.postMessage(null);
      };
    } else
      ae = function() {
        C(re, 0);
      };
    function oe(U, V) {
      W = C(function() {
        U(n.unstable_now());
      }, V);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(U) {
      U.callback = null;
    }, n.unstable_forceFrameRate = function(U) {
      0 > U || 125 < U ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : A = 0 < U ? Math.floor(1e3 / U) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, n.unstable_next = function(U) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var V = 3;
          break;
        default:
          V = S;
      }
      var q = S;
      S = V;
      try {
        return U();
      } finally {
        S = q;
      }
    }, n.unstable_requestPaint = function() {
      _ = !0;
    }, n.unstable_runWithPriority = function(U, V) {
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
        return V();
      } finally {
        S = q;
      }
    }, n.unstable_scheduleCallback = function(U, V, q) {
      var Q = n.unstable_now();
      switch (typeof q == "object" && q !== null ? (q = q.delay, q = typeof q == "number" && 0 < q ? Q + q : Q) : q = Q, U) {
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
      return te = q + te, U = {
        id: b++,
        callback: V,
        priorityLevel: U,
        startTime: q,
        expirationTime: te,
        sortIndex: -1
      }, q > Q ? (U.sortIndex = q, a(m, U), r(g) === null && U === r(m) && (j ? (L(W), W = -1) : j = !0, oe(J, q - Q))) : (U.sortIndex = te, a(g, U), T || w || (T = !0, G || (G = !0, ae()))), U;
    }, n.unstable_shouldYield = $, n.unstable_wrapCallback = function(U) {
      var V = S;
      return function() {
        var q = S;
        S = V;
        try {
          return U.apply(this, arguments);
        } finally {
          S = q;
        }
      };
    };
  })(Fd)), Fd;
}
var Vv;
function mE() {
  return Vv || (Vv = 1, Yd.exports = hE()), Yd.exports;
}
var Gd = { exports: {} }, rn = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bv;
function pE() {
  if (Bv) return rn;
  Bv = 1;
  var n = ch();
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
  return rn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, rn.createPortal = function(g, m) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(a(299));
    return c(g, m, null, b);
  }, rn.flushSync = function(g) {
    var m = h.T, b = s.p;
    try {
      if (h.T = null, s.p = 2, g) return g();
    } finally {
      h.T = m, s.p = b, s.d.f();
    }
  }, rn.preconnect = function(g, m) {
    typeof g == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, s.d.C(g, m));
  }, rn.prefetchDNS = function(g) {
    typeof g == "string" && s.d.D(g);
  }, rn.preinit = function(g, m) {
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
  }, rn.preinitModule = function(g, m) {
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
  }, rn.preload = function(g, m) {
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
  }, rn.preloadModule = function(g, m) {
    if (typeof g == "string")
      if (m) {
        var b = p(m.as, m.crossOrigin);
        s.d.m(g, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: b,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0
        });
      } else s.d.m(g);
  }, rn.requestFormReset = function(g) {
    s.d.r(g);
  }, rn.unstable_batchedUpdates = function(g, m) {
    return g(m);
  }, rn.useFormState = function(g, m, b) {
    return h.H.useFormState(g, m, b);
  }, rn.useFormStatus = function() {
    return h.H.useHostTransitionStatus();
  }, rn.version = "19.2.5", rn;
}
var Hv;
function Eb() {
  if (Hv) return Gd.exports;
  Hv = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Gd.exports = pE(), Gd.exports;
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
var qv;
function gE() {
  if (qv) return Yl;
  qv = 1;
  var n = mE(), a = ch(), r = Eb();
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
  var v = Object.assign, S = Symbol.for("react.element"), w = Symbol.for("react.transitional.element"), T = Symbol.for("react.portal"), j = Symbol.for("react.fragment"), _ = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), L = Symbol.for("react.consumer"), z = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), J = Symbol.for("react.suspense"), G = Symbol.for("react.suspense_list"), W = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), O = Symbol.for("react.activity"), $ = Symbol.for("react.memo_cache_sentinel"), re = Symbol.iterator;
  function ae(e) {
    return e === null || typeof e != "object" ? null : (e = re && e[re] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var me = Symbol.for("react.client.reference");
  function ge(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === me ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case j:
        return "Fragment";
      case C:
        return "Profiler";
      case _:
        return "StrictMode";
      case J:
        return "Suspense";
      case G:
        return "SuspenseList";
      case O:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case T:
          return "Portal";
        case z:
          return e.displayName || "Context";
        case L:
          return (e._context.displayName || "Context") + ".Consumer";
        case R:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case W:
          return t = e.displayName || null, t !== null ? t : ge(e.type) || "Memo";
        case A:
          t = e._payload, e = e._init;
          try {
            return ge(e(t));
          } catch {
          }
      }
    return null;
  }
  var oe = Array.isArray, U = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, V = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Q = [], te = -1;
  function N(e) {
    return { current: e };
  }
  function K(e) {
    0 > te || (e.current = Q[te], Q[te] = null, te--);
  }
  function Z(e, t) {
    te++, Q[te] = e.current, e.current = t;
  }
  var le = N(null), ce = N(null), ve = N(null), ze = N(null);
  function _e(e, t) {
    switch (Z(ve, t), Z(ce, e), Z(le, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? nv(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = nv(t), e = av(t, e);
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
    K(le), Z(le, e);
  }
  function Be() {
    K(le), K(ce), K(ve);
  }
  function kt(e) {
    e.memoizedState !== null && Z(ze, e);
    var t = le.current, i = av(t, e.type);
    t !== i && (Z(ce, e), Z(le, i));
  }
  function Ft(e) {
    ce.current === e && (K(le), K(ce)), ze.current === e && (K(ze), Bl._currentValue = q);
  }
  var fe, je;
  function Ne(e) {
    if (fe === void 0)
      try {
        throw Error();
      } catch (i) {
        var t = i.stack.trim().match(/\n( *(at )?)/);
        fe = t && t[1] || "", je = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + fe + e + je;
  }
  var Me = !1;
  function Kt(e, t) {
    if (!e || Me) return "";
    Me = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var ie = function() {
                throw Error();
              };
              if (Object.defineProperty(ie.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(ie, []);
                } catch (P) {
                  var X = P;
                }
                Reflect.construct(e, [], ie);
              } else {
                try {
                  ie.call();
                } catch (P) {
                  X = P;
                }
                e.call(ie.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (P) {
                X = P;
              }
              (ie = e()) && typeof ie.catch == "function" && ie.catch(function() {
              });
            }
          } catch (P) {
            if (P && X && typeof P.stack == "string")
              return [P.stack, X.stack];
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
      Me = !1, Error.prepareStackTrace = i;
    }
    return (i = e ? e.displayName || e.name : "") ? Ne(i) : "";
  }
  function at(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ne(e.type);
      case 16:
        return Ne("Lazy");
      case 13:
        return e.child !== t && t !== null ? Ne("Suspense Fallback") : Ne("Suspense");
      case 19:
        return Ne("SuspenseList");
      case 0:
      case 15:
        return Kt(e.type, !1);
      case 11:
        return Kt(e.type.render, !1);
      case 1:
        return Kt(e.type, !0);
      case 31:
        return Ne("Activity");
      default:
        return "";
    }
  }
  function on(e) {
    try {
      var t = "", i = null;
      do
        t += at(e, i), i = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var Qt = Object.prototype.hasOwnProperty, bn = n.unstable_scheduleCallback, ma = n.unstable_cancelCallback, Vt = n.unstable_shouldYield, Dn = n.unstable_requestPaint, Bt = n.unstable_now, ye = n.unstable_getCurrentPriorityLevel, Oe = n.unstable_ImmediatePriority, Qe = n.unstable_UserBlockingPriority, et = n.unstable_NormalPriority, Ht = n.unstable_LowPriority, qt = n.unstable_IdlePriority, Ei = n.log, ia = n.unstable_setDisableYieldValue, Qn = null, Pt = null;
  function Et(e) {
    if (typeof Ei == "function" && ia(e), Pt && typeof Pt.setStrictMode == "function")
      try {
        Pt.setStrictMode(Qn, e);
      } catch {
      }
  }
  var $t = Math.clz32 ? Math.clz32 : zn, Ji = Math.log, Ba = Math.LN2;
  function zn(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Ji(e) / Ba | 0) | 0;
  }
  var pa = 256, Pn = 262144, ra = 4194304;
  function cn(e) {
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
    return E !== 0 ? (l = E & ~d, l !== 0 ? u = cn(l) : (y &= E, y !== 0 ? u = cn(y) : i || (i = E & ~e, i !== 0 && (u = cn(i))))) : (E = l & ~d, E !== 0 ? u = cn(E) : y !== 0 ? u = cn(y) : i || (i = l & ~e, i !== 0 && (u = cn(i)))), u === 0 ? 0 : t !== 0 && t !== u && (t & d) === 0 && (d = u & -u, i = t & -t, d >= i || d === 32 && (i & 4194048) !== 0) ? t : u;
  }
  function ut(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Mt(e, t) {
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
  function It() {
    var e = ra;
    return ra <<= 1, (ra & 62914560) === 0 && (ra = 4194304), e;
  }
  function xn(e) {
    for (var t = [], i = 0; 31 > i; i++) t.push(e);
    return t;
  }
  function it(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Zt(e, t, i, l, u, d) {
    var y = e.pendingLanes;
    e.pendingLanes = i, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= i, e.entangledLanes &= i, e.errorRecoveryDisabledLanes &= i, e.shellSuspendCounter = 0;
    var E = e.entanglements, D = e.expirationTimes, F = e.hiddenUpdates;
    for (i = y & ~i; 0 < i; ) {
      var ee = 31 - $t(i), ie = 1 << ee;
      E[ee] = 0, D[ee] = -1;
      var X = F[ee];
      if (X !== null)
        for (F[ee] = null, ee = 0; ee < X.length; ee++) {
          var P = X[ee];
          P !== null && (P.lane &= -536870913);
        }
      i &= ~ie;
    }
    l !== 0 && ga(e, l, 0), d !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= d & ~(y & ~t));
  }
  function ga(e, t, i) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - $t(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | i & 261930;
  }
  function nn(e, t) {
    var i = e.entangledLanes |= t;
    for (e = e.entanglements; i; ) {
      var l = 31 - $t(i), u = 1 << l;
      u & t | e[l] & t && (e[l] |= t), i &= ~u;
    }
  }
  function M(e, t) {
    var i = t & -t;
    return i = (i & 42) !== 0 ? 1 : B(i), (i & (e.suspendedLanes | t)) !== 0 ? 0 : i;
  }
  function B(e) {
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
  function se() {
    var e = V.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Cv(e.type));
  }
  function ue(e, t) {
    var i = V.p;
    try {
      return V.p = e, t();
    } finally {
      V.p = i;
    }
  }
  var Se = Math.random().toString(36).slice(2), he = "__reactFiber$" + Se, pe = "__reactProps$" + Se, Ee = "__reactContainer$" + Se, be = "__reactEvents$" + Se, Re = "__reactListeners$" + Se, Ce = "__reactHandles$" + Se, Pe = "__reactResources$" + Se, He = "__reactMarker$" + Se;
  function ct(e) {
    delete e[he], delete e[pe], delete e[be], delete e[Re], delete e[Ce];
  }
  function rt(e) {
    var t = e[he];
    if (t) return t;
    for (var i = e.parentNode; i; ) {
      if (t = i[Ee] || i[he]) {
        if (i = t.alternate, t.child !== null || i !== null && i.child !== null)
          for (e = cv(e); e !== null; ) {
            if (i = e[he]) return i;
            e = cv(e);
          }
        return t;
      }
      e = i, i = e.parentNode;
    }
    return null;
  }
  function vt(e) {
    if (e = e[he] || e[Ee]) {
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
  var Ha = /* @__PURE__ */ new Set(), Zn = {};
  function Gt(e, t) {
    la(e, t), la(e + "Capture", t);
  }
  function la(e, t) {
    for (Zn[e] = t, e = 0; e < t.length; e++)
      Ha.add(t[e]);
  }
  var Ti = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), sa = {}, ji = {};
  function Wi(e) {
    return Qt.call(ji, e) ? !0 : Qt.call(sa, e) ? !1 : Ti.test(e) ? ji[e] = !0 : (sa[e] = !0, !1);
  }
  function qe(e, t, i) {
    if (Wi(t))
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
  function an(e, t, i, l) {
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
  function Rt(e) {
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
  function er(e, t, i) {
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
  function tr(e) {
    if (!e._valueTracker) {
      var t = mt(e) ? "checked" : "value";
      e._valueTracker = er(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function Ms(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var i = t.getValue(), l = "";
    return e && (l = mt(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== i ? (t.setValue(e), !0) : !1;
  }
  function As(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var nS = /[\n"\\]/g;
  function On(e) {
    return e.replace(
      nS,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Lu(e, t, i, l, u, d, y, E) {
    e.name = "", y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? e.type = y : e.removeAttribute("type"), t != null ? y === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Rt(t)) : e.value !== "" + Rt(t) && (e.value = "" + Rt(t)) : y !== "submit" && y !== "reset" || e.removeAttribute("value"), t != null ? Uu(e, y, Rt(t)) : i != null ? Uu(e, y, Rt(i)) : l != null && e.removeAttribute("value"), u == null && d != null && (e.defaultChecked = !!d), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + Rt(E) : e.removeAttribute("name");
  }
  function Ph(e, t, i, l, u, d, y, E) {
    if (d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.type = d), t != null || i != null) {
      if (!(d !== "submit" && d !== "reset" || t != null)) {
        tr(e);
        return;
      }
      i = i != null ? "" + Rt(i) : "", t = t != null ? "" + Rt(t) : i, E || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? u, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = E ? e.checked : !!l, e.defaultChecked = !!l, y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" && (e.name = y), tr(e);
  }
  function Uu(e, t, i) {
    t === "number" && As(e.ownerDocument) === e || e.defaultValue === "" + i || (e.defaultValue = "" + i);
  }
  function nr(e, t, i, l) {
    if (e = e.options, t) {
      t = {};
      for (var u = 0; u < i.length; u++)
        t["$" + i[u]] = !0;
      for (i = 0; i < e.length; i++)
        u = t.hasOwnProperty("$" + e[i].value), e[i].selected !== u && (e[i].selected = u), u && l && (e[i].defaultSelected = !0);
    } else {
      for (i = "" + Rt(i), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === i) {
          e[u].selected = !0, l && (e[u].defaultSelected = !0);
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Zh(e, t, i) {
    if (t != null && (t = "" + Rt(t), t !== e.value && (e.value = t), i == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = i != null ? "" + Rt(i) : "";
  }
  function Jh(e, t, i, l) {
    if (t == null) {
      if (l != null) {
        if (i != null) throw Error(s(92));
        if (oe(l)) {
          if (1 < l.length) throw Error(s(93));
          l = l[0];
        }
        i = l;
      }
      i == null && (i = ""), t = i;
    }
    i = Rt(t), e.defaultValue = i, l = e.textContent, l === i && l !== "" && l !== null && (e.value = l), tr(e);
  }
  function ar(e, t) {
    if (t) {
      var i = e.firstChild;
      if (i && i === e.lastChild && i.nodeType === 3) {
        i.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var aS = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Wh(e, t, i) {
    var l = t.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, i) : typeof i != "number" || i === 0 || aS.has(t) ? t === "float" ? e.cssFloat = i : e[t] = ("" + i).trim() : e[t] = i + "px";
  }
  function em(e, t, i) {
    if (t != null && typeof t != "object")
      throw Error(s(62));
    if (e = e.style, i != null) {
      for (var l in i)
        !i.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var u in t)
        l = t[u], t.hasOwnProperty(u) && i[u] !== l && Wh(e, u, l);
    } else
      for (var d in t)
        t.hasOwnProperty(d) && Wh(e, d, t[d]);
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
  var iS = /* @__PURE__ */ new Map([
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
  ]), rS = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Rs(e) {
    return rS.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function va() {
  }
  var Vu = null;
  function Bu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var ir = null, rr = null;
  function tm(e) {
    var t = vt(e);
    if (t && (e = t.stateNode)) {
      var i = e[pe] || null;
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
                var u = l[pe] || null;
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
              l = i[t], l.form === e.form && Ms(l);
          }
          break e;
        case "textarea":
          Zh(e, i.value, i.defaultValue);
          break e;
        case "select":
          t = i.value, t != null && nr(e, !!i.multiple, t, !1);
      }
    }
  }
  var Hu = !1;
  function nm(e, t, i) {
    if (Hu) return e(t, i);
    Hu = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (Hu = !1, (ir !== null || rr !== null) && (yo(), ir && (t = ir, e = rr, rr = ir = null, tm(t), e)))
        for (t = 0; t < e.length; t++) tm(e[t]);
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
  var ya = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), qu = !1;
  if (ya)
    try {
      var al = {};
      Object.defineProperty(al, "passive", {
        get: function() {
          qu = !0;
        }
      }), window.addEventListener("test", al, al), window.removeEventListener("test", al, al);
    } catch {
      qu = !1;
    }
  var qa = null, $u = null, _s = null;
  function am() {
    if (_s) return _s;
    var e, t = $u, i = t.length, l, u = "value" in qa ? qa.value : qa.textContent, d = u.length;
    for (e = 0; e < i && t[e] === u[e]; e++) ;
    var y = i - e;
    for (l = 1; l <= y && t[i - l] === u[d - l]; l++) ;
    return _s = u.slice(e, 1 < l ? 1 - l : void 0);
  }
  function Ds(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function zs() {
    return !0;
  }
  function im() {
    return !1;
  }
  function dn(e) {
    function t(i, l, u, d, y) {
      this._reactName = i, this._targetInst = u, this.type = l, this.nativeEvent = d, this.target = y, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (i = e[E], this[E] = i ? i(d) : d[E]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? zs : im, this.isPropagationStopped = im, this;
    }
    return v(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = zs);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = zs);
      },
      persist: function() {
      },
      isPersistent: zs
    }), t;
  }
  var Ci = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Os = dn(Ci), il = v({}, Ci, { view: 0, detail: 0 }), lS = dn(il), Iu, Yu, rl, Ls = v({}, il, {
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
      return "movementX" in e ? e.movementX : (e !== rl && (rl && e.type === "mousemove" ? (Iu = e.screenX - rl.screenX, Yu = e.screenY - rl.screenY) : Yu = Iu = 0, rl = e), Iu);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Yu;
    }
  }), rm = dn(Ls), sS = v({}, Ls, { dataTransfer: 0 }), oS = dn(sS), uS = v({}, il, { relatedTarget: 0 }), Fu = dn(uS), cS = v({}, Ci, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), dS = dn(cS), fS = v({}, Ci, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), hS = dn(fS), mS = v({}, Ci, { data: 0 }), lm = dn(mS), pS = {
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
  }, gS = {
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
  }, vS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function yS(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = vS[e]) ? !!t[e] : !1;
  }
  function Gu() {
    return yS;
  }
  var bS = v({}, il, {
    key: function(e) {
      if (e.key) {
        var t = pS[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Ds(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? gS[e.keyCode] || "Unidentified" : "";
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
      return e.type === "keypress" ? Ds(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Ds(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), xS = dn(bS), SS = v({}, Ls, {
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
  }), sm = dn(SS), wS = v({}, il, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Gu
  }), ES = dn(wS), TS = v({}, Ci, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), jS = dn(TS), CS = v({}, Ls, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), NS = dn(CS), MS = v({}, Ci, {
    newState: 0,
    oldState: 0
  }), AS = dn(MS), RS = [9, 13, 27, 32], Xu = ya && "CompositionEvent" in window, ll = null;
  ya && "documentMode" in document && (ll = document.documentMode);
  var _S = ya && "TextEvent" in window && !ll, om = ya && (!Xu || ll && 8 < ll && 11 >= ll), um = " ", cm = !1;
  function dm(e, t) {
    switch (e) {
      case "keyup":
        return RS.indexOf(t.keyCode) !== -1;
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
  function fm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var lr = !1;
  function DS(e, t) {
    switch (e) {
      case "compositionend":
        return fm(t);
      case "keypress":
        return t.which !== 32 ? null : (cm = !0, um);
      case "textInput":
        return e = t.data, e === um && cm ? null : e;
      default:
        return null;
    }
  }
  function zS(e, t) {
    if (lr)
      return e === "compositionend" || !Xu && dm(e, t) ? (e = am(), _s = $u = qa = null, lr = !1, e) : null;
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
        return om && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var OS = {
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
  function hm(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!OS[e.type] : t === "textarea";
  }
  function mm(e, t, i, l) {
    ir ? rr ? rr.push(l) : rr = [l] : ir = l, t = jo(t, "onChange"), 0 < t.length && (i = new Os(
      "onChange",
      "change",
      null,
      i,
      l
    ), e.push({ event: i, listeners: t }));
  }
  var sl = null, ol = null;
  function LS(e) {
    Pg(e, 0);
  }
  function Us(e) {
    var t = Ie(e);
    if (Ms(t)) return e;
  }
  function pm(e, t) {
    if (e === "change") return t;
  }
  var gm = !1;
  if (ya) {
    var Ku;
    if (ya) {
      var Qu = "oninput" in document;
      if (!Qu) {
        var vm = document.createElement("div");
        vm.setAttribute("oninput", "return;"), Qu = typeof vm.oninput == "function";
      }
      Ku = Qu;
    } else Ku = !1;
    gm = Ku && (!document.documentMode || 9 < document.documentMode);
  }
  function ym() {
    sl && (sl.detachEvent("onpropertychange", bm), ol = sl = null);
  }
  function bm(e) {
    if (e.propertyName === "value" && Us(ol)) {
      var t = [];
      mm(
        t,
        ol,
        e,
        Bu(e)
      ), nm(LS, t);
    }
  }
  function US(e, t, i) {
    e === "focusin" ? (ym(), sl = t, ol = i, sl.attachEvent("onpropertychange", bm)) : e === "focusout" && ym();
  }
  function kS(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Us(ol);
  }
  function VS(e, t) {
    if (e === "click") return Us(t);
  }
  function BS(e, t) {
    if (e === "input" || e === "change")
      return Us(t);
  }
  function HS(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Sn = typeof Object.is == "function" ? Object.is : HS;
  function ul(e, t) {
    if (Sn(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var i = Object.keys(e), l = Object.keys(t);
    if (i.length !== l.length) return !1;
    for (l = 0; l < i.length; l++) {
      var u = i[l];
      if (!Qt.call(t, u) || !Sn(e[u], t[u]))
        return !1;
    }
    return !0;
  }
  function xm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Sm(e, t) {
    var i = xm(e);
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
      i = xm(i);
    }
  }
  function wm(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? wm(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Em(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = As(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var i = typeof t.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) e = t.contentWindow;
      else break;
      t = As(e.document);
    }
    return t;
  }
  function Pu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var qS = ya && "documentMode" in document && 11 >= document.documentMode, sr = null, Zu = null, cl = null, Ju = !1;
  function Tm(e, t, i) {
    var l = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Ju || sr == null || sr !== As(l) || (l = sr, "selectionStart" in l && Pu(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), cl && ul(cl, l) || (cl = l, l = jo(Zu, "onSelect"), 0 < l.length && (t = new Os(
      "onSelect",
      "select",
      null,
      t,
      i
    ), e.push({ event: t, listeners: l }), t.target = sr)));
  }
  function Ni(e, t) {
    var i = {};
    return i[e.toLowerCase()] = t.toLowerCase(), i["Webkit" + e] = "webkit" + t, i["Moz" + e] = "moz" + t, i;
  }
  var or = {
    animationend: Ni("Animation", "AnimationEnd"),
    animationiteration: Ni("Animation", "AnimationIteration"),
    animationstart: Ni("Animation", "AnimationStart"),
    transitionrun: Ni("Transition", "TransitionRun"),
    transitionstart: Ni("Transition", "TransitionStart"),
    transitioncancel: Ni("Transition", "TransitionCancel"),
    transitionend: Ni("Transition", "TransitionEnd")
  }, Wu = {}, jm = {};
  ya && (jm = document.createElement("div").style, "AnimationEvent" in window || (delete or.animationend.animation, delete or.animationiteration.animation, delete or.animationstart.animation), "TransitionEvent" in window || delete or.transitionend.transition);
  function Mi(e) {
    if (Wu[e]) return Wu[e];
    if (!or[e]) return e;
    var t = or[e], i;
    for (i in t)
      if (t.hasOwnProperty(i) && i in jm)
        return Wu[e] = t[i];
    return e;
  }
  var Cm = Mi("animationend"), Nm = Mi("animationiteration"), Mm = Mi("animationstart"), $S = Mi("transitionrun"), IS = Mi("transitionstart"), YS = Mi("transitioncancel"), Am = Mi("transitionend"), Rm = /* @__PURE__ */ new Map(), ec = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  ec.push("scrollEnd");
  function Jn(e, t) {
    Rm.set(e, t), Gt(t, [e]);
  }
  var ks = typeof reportError == "function" ? reportError : function(e) {
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
  }, Ln = [], ur = 0, tc = 0;
  function Vs() {
    for (var e = ur, t = tc = ur = 0; t < e; ) {
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
      d !== 0 && _m(i, u, d);
    }
  }
  function Bs(e, t, i, l) {
    Ln[ur++] = e, Ln[ur++] = t, Ln[ur++] = i, Ln[ur++] = l, tc |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function nc(e, t, i, l) {
    return Bs(e, t, i, l), Hs(e);
  }
  function Ai(e, t) {
    return Bs(e, null, null, t), Hs(e);
  }
  function _m(e, t, i) {
    e.lanes |= i;
    var l = e.alternate;
    l !== null && (l.lanes |= i);
    for (var u = !1, d = e.return; d !== null; )
      d.childLanes |= i, l = d.alternate, l !== null && (l.childLanes |= i), d.tag === 22 && (e = d.stateNode, e === null || e._visibility & 1 || (u = !0)), e = d, d = d.return;
    return e.tag === 3 ? (d = e.stateNode, u && t !== null && (u = 31 - $t(i), e = d.hiddenUpdates, l = e[u], l === null ? e[u] = [t] : l.push(t), t.lane = i | 536870912), d) : null;
  }
  function Hs(e) {
    if (50 < Dl)
      throw Dl = 0, dd = null, Error(s(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var cr = {};
  function FS(e, t, i, l) {
    this.tag = e, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function wn(e, t, i, l) {
    return new FS(e, t, i, l);
  }
  function ac(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function ba(e, t) {
    var i = e.alternate;
    return i === null ? (i = wn(
      e.tag,
      t,
      e.key,
      e.mode
    ), i.elementType = e.elementType, i.type = e.type, i.stateNode = e.stateNode, i.alternate = e, e.alternate = i) : (i.pendingProps = t, i.type = e.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = e.flags & 65011712, i.childLanes = e.childLanes, i.lanes = e.lanes, i.child = e.child, i.memoizedProps = e.memoizedProps, i.memoizedState = e.memoizedState, i.updateQueue = e.updateQueue, t = e.dependencies, i.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, i.sibling = e.sibling, i.index = e.index, i.ref = e.ref, i.refCleanup = e.refCleanup, i;
  }
  function Dm(e, t) {
    e.flags &= 65011714;
    var i = e.alternate;
    return i === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = i.childLanes, e.lanes = i.lanes, e.child = i.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = i.memoizedProps, e.memoizedState = i.memoizedState, e.updateQueue = i.updateQueue, e.type = i.type, t = i.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function qs(e, t, i, l, u, d) {
    var y = 0;
    if (l = e, typeof e == "function") ac(e) && (y = 1);
    else if (typeof e == "string")
      y = Pw(
        e,
        i,
        le.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case O:
          return e = wn(31, i, t, u), e.elementType = O, e.lanes = d, e;
        case j:
          return Ri(i.children, u, d, t);
        case _:
          y = 8, u |= 24;
          break;
        case C:
          return e = wn(12, i, t, u | 2), e.elementType = C, e.lanes = d, e;
        case J:
          return e = wn(13, i, t, u), e.elementType = J, e.lanes = d, e;
        case G:
          return e = wn(19, i, t, u), e.elementType = G, e.lanes = d, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case z:
                y = 10;
                break e;
              case L:
                y = 9;
                break e;
              case R:
                y = 11;
                break e;
              case W:
                y = 14;
                break e;
              case A:
                y = 16, l = null;
                break e;
            }
          y = 29, i = Error(
            s(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = wn(y, i, t, u), t.elementType = e, t.type = l, t.lanes = d, t;
  }
  function Ri(e, t, i, l) {
    return e = wn(7, e, l, t), e.lanes = i, e;
  }
  function ic(e, t, i) {
    return e = wn(6, e, null, t), e.lanes = i, e;
  }
  function zm(e) {
    var t = wn(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function rc(e, t, i) {
    return t = wn(
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
  var Om = /* @__PURE__ */ new WeakMap();
  function Un(e, t) {
    if (typeof e == "object" && e !== null) {
      var i = Om.get(e);
      return i !== void 0 ? i : (t = {
        value: e,
        source: t,
        stack: on(t)
      }, Om.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: on(t)
    };
  }
  var dr = [], fr = 0, $s = null, dl = 0, kn = [], Vn = 0, $a = null, oa = 1, ua = "";
  function xa(e, t) {
    dr[fr++] = dl, dr[fr++] = $s, $s = e, dl = t;
  }
  function Lm(e, t, i) {
    kn[Vn++] = oa, kn[Vn++] = ua, kn[Vn++] = $a, $a = e;
    var l = oa;
    e = ua;
    var u = 32 - $t(l) - 1;
    l &= ~(1 << u), i += 1;
    var d = 32 - $t(t) + u;
    if (30 < d) {
      var y = u - u % 5;
      d = (l & (1 << y) - 1).toString(32), l >>= y, u -= y, oa = 1 << 32 - $t(t) + u | i << u | l, ua = d + e;
    } else
      oa = 1 << d | i << u | l, ua = e;
  }
  function lc(e) {
    e.return !== null && (xa(e, 1), Lm(e, 1, 0));
  }
  function sc(e) {
    for (; e === $s; )
      $s = dr[--fr], dr[fr] = null, dl = dr[--fr], dr[fr] = null;
    for (; e === $a; )
      $a = kn[--Vn], kn[Vn] = null, ua = kn[--Vn], kn[Vn] = null, oa = kn[--Vn], kn[Vn] = null;
  }
  function Um(e, t) {
    kn[Vn++] = oa, kn[Vn++] = ua, kn[Vn++] = $a, oa = t.id, ua = t.overflow, $a = e;
  }
  var Jt = null, pt = null, Ke = !1, Ia = null, Bn = !1, oc = Error(s(519));
  function Ya(e) {
    var t = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw fl(Un(t, e)), oc;
  }
  function km(e) {
    var t = e.stateNode, i = e.type, l = e.memoizedProps;
    switch (t[he] = e, t[pe] = l, i) {
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
        for (i = 0; i < Ol.length; i++)
          Fe(Ol[i], t);
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
        Fe("invalid", t), Ph(
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
        Fe("invalid", t), Jh(t, l.value, l.defaultValue, l.children);
    }
    i = l.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || t.textContent === "" + i || l.suppressHydrationWarning === !0 || ev(t.textContent, i) ? (l.popover != null && (Fe("beforetoggle", t), Fe("toggle", t)), l.onScroll != null && Fe("scroll", t), l.onScrollEnd != null && Fe("scrollend", t), l.onClick != null && (t.onclick = va), t = !0) : t = !1, t || Ya(e, !0);
  }
  function Vm(e) {
    for (Jt = e.return; Jt; )
      switch (Jt.tag) {
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
          Jt = Jt.return;
      }
  }
  function hr(e) {
    if (e !== Jt) return !1;
    if (!Ke) return Vm(e), Ke = !0, !1;
    var t = e.tag, i;
    if ((i = t !== 3 && t !== 27) && ((i = t === 5) && (i = e.type, i = !(i !== "form" && i !== "button") || Cd(e.type, e.memoizedProps)), i = !i), i && pt && Ya(e), Vm(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      pt = uv(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      pt = uv(e);
    } else
      t === 27 ? (t = pt, ii(e.type) ? (e = _d, _d = null, pt = e) : pt = t) : pt = Jt ? qn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function _i() {
    pt = Jt = null, Ke = !1;
  }
  function uc() {
    var e = Ia;
    return e !== null && (pn === null ? pn = e : pn.push.apply(
      pn,
      e
    ), Ia = null), e;
  }
  function fl(e) {
    Ia === null ? Ia = [e] : Ia.push(e);
  }
  var cc = N(null), Di = null, Sa = null;
  function Fa(e, t, i) {
    Z(cc, t._currentValue), t._currentValue = i;
  }
  function wa(e) {
    e._currentValue = cc.current, K(cc);
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
  function mr(e, t, i, l) {
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
          Sn(u.pendingProps.value, y.value) || (e !== null ? e.push(E) : e = [E]);
        }
      } else if (u === ze.current) {
        if (y = u.alternate, y === null) throw Error(s(387));
        y.memoizedState.memoizedState !== u.memoizedState.memoizedState && (e !== null ? e.push(Bl) : e = [Bl]);
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
  function Is(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Sn(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function zi(e) {
    Di = e, Sa = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Wt(e) {
    return Bm(Di, e);
  }
  function Ys(e, t) {
    return Di === null && zi(e), Bm(e, t);
  }
  function Bm(e, t) {
    var i = t._currentValue;
    if (t = { context: t, memoizedValue: i, next: null }, Sa === null) {
      if (e === null) throw Error(s(308));
      Sa = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Sa = Sa.next = t;
    return i;
  }
  var GS = typeof AbortController < "u" ? AbortController : function() {
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
  }, XS = n.unstable_scheduleCallback, KS = n.unstable_NormalPriority, _t = {
    $$typeof: z,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function hc() {
    return {
      controller: new GS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function hl(e) {
    e.refCount--, e.refCount === 0 && XS(KS, function() {
      e.controller.abort();
    });
  }
  var ml = null, mc = 0, pr = 0, gr = null;
  function QS(e, t) {
    if (ml === null) {
      var i = ml = [];
      mc = 0, pr = vd(), gr = {
        status: "pending",
        value: void 0,
        then: function(l) {
          i.push(l);
        }
      };
    }
    return mc++, t.then(Hm, Hm), t;
  }
  function Hm() {
    if (--mc === 0 && ml !== null) {
      gr !== null && (gr.status = "fulfilled");
      var e = ml;
      ml = null, pr = 0, gr = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function PS(e, t) {
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
  var qm = U.S;
  U.S = function(e, t) {
    Tg = Bt(), typeof t == "object" && t !== null && typeof t.then == "function" && QS(e, t), qm !== null && qm(e, t);
  };
  var Oi = N(null);
  function pc() {
    var e = Oi.current;
    return e !== null ? e : dt.pooledCache;
  }
  function Fs(e, t) {
    t === null ? Z(Oi, Oi.current) : Z(Oi, t.pool);
  }
  function $m() {
    var e = pc();
    return e === null ? null : { parent: _t._currentValue, pool: e };
  }
  var vr = Error(s(460)), gc = Error(s(474)), Gs = Error(s(542)), Xs = { then: function() {
  } };
  function Im(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Ym(e, t, i) {
    switch (i = e[i], i === void 0 ? e.push(t) : i !== t && (t.then(va, va), t = i), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Gm(e), e;
      default:
        if (typeof t.status == "string") t.then(va, va);
        else {
          if (e = dt, e !== null && 100 < e.shellSuspendCounter)
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
            throw e = t.reason, Gm(e), e;
        }
        throw Ui = t, vr;
    }
  }
  function Li(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (Ui = i, vr) : i;
    }
  }
  var Ui = null;
  function Fm() {
    if (Ui === null) throw Error(s(459));
    var e = Ui;
    return Ui = null, e;
  }
  function Gm(e) {
    if (e === vr || e === Gs)
      throw Error(s(483));
  }
  var yr = null, pl = 0;
  function Ks(e) {
    var t = pl;
    return pl += 1, yr === null && (yr = []), Ym(yr, e, t);
  }
  function gl(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Qs(e, t) {
    throw t.$$typeof === S ? Error(s(525)) : (e = Object.prototype.toString.call(t), Error(
      s(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Xm(e) {
    function t(H, k) {
      if (e) {
        var Y = H.deletions;
        Y === null ? (H.deletions = [k], H.flags |= 16) : Y.push(k);
      }
    }
    function i(H, k) {
      if (!e) return null;
      for (; k !== null; )
        t(H, k), k = k.sibling;
      return null;
    }
    function l(H) {
      for (var k = /* @__PURE__ */ new Map(); H !== null; )
        H.key !== null ? k.set(H.key, H) : k.set(H.index, H), H = H.sibling;
      return k;
    }
    function u(H, k) {
      return H = ba(H, k), H.index = 0, H.sibling = null, H;
    }
    function d(H, k, Y) {
      return H.index = Y, e ? (Y = H.alternate, Y !== null ? (Y = Y.index, Y < k ? (H.flags |= 67108866, k) : Y) : (H.flags |= 67108866, k)) : (H.flags |= 1048576, k);
    }
    function y(H) {
      return e && H.alternate === null && (H.flags |= 67108866), H;
    }
    function E(H, k, Y, ne) {
      return k === null || k.tag !== 6 ? (k = ic(Y, H.mode, ne), k.return = H, k) : (k = u(k, Y), k.return = H, k);
    }
    function D(H, k, Y, ne) {
      var Ae = Y.type;
      return Ae === j ? ee(
        H,
        k,
        Y.props.children,
        ne,
        Y.key
      ) : k !== null && (k.elementType === Ae || typeof Ae == "object" && Ae !== null && Ae.$$typeof === A && Li(Ae) === k.type) ? (k = u(k, Y.props), gl(k, Y), k.return = H, k) : (k = qs(
        Y.type,
        Y.key,
        Y.props,
        null,
        H.mode,
        ne
      ), gl(k, Y), k.return = H, k);
    }
    function F(H, k, Y, ne) {
      return k === null || k.tag !== 4 || k.stateNode.containerInfo !== Y.containerInfo || k.stateNode.implementation !== Y.implementation ? (k = rc(Y, H.mode, ne), k.return = H, k) : (k = u(k, Y.children || []), k.return = H, k);
    }
    function ee(H, k, Y, ne, Ae) {
      return k === null || k.tag !== 7 ? (k = Ri(
        Y,
        H.mode,
        ne,
        Ae
      ), k.return = H, k) : (k = u(k, Y), k.return = H, k);
    }
    function ie(H, k, Y) {
      if (typeof k == "string" && k !== "" || typeof k == "number" || typeof k == "bigint")
        return k = ic(
          "" + k,
          H.mode,
          Y
        ), k.return = H, k;
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case w:
            return Y = qs(
              k.type,
              k.key,
              k.props,
              null,
              H.mode,
              Y
            ), gl(Y, k), Y.return = H, Y;
          case T:
            return k = rc(
              k,
              H.mode,
              Y
            ), k.return = H, k;
          case A:
            return k = Li(k), ie(H, k, Y);
        }
        if (oe(k) || ae(k))
          return k = Ri(
            k,
            H.mode,
            Y,
            null
          ), k.return = H, k;
        if (typeof k.then == "function")
          return ie(H, Ks(k), Y);
        if (k.$$typeof === z)
          return ie(
            H,
            Ys(H, k),
            Y
          );
        Qs(H, k);
      }
      return null;
    }
    function X(H, k, Y, ne) {
      var Ae = k !== null ? k.key : null;
      if (typeof Y == "string" && Y !== "" || typeof Y == "number" || typeof Y == "bigint")
        return Ae !== null ? null : E(H, k, "" + Y, ne);
      if (typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case w:
            return Y.key === Ae ? D(H, k, Y, ne) : null;
          case T:
            return Y.key === Ae ? F(H, k, Y, ne) : null;
          case A:
            return Y = Li(Y), X(H, k, Y, ne);
        }
        if (oe(Y) || ae(Y))
          return Ae !== null ? null : ee(H, k, Y, ne, null);
        if (typeof Y.then == "function")
          return X(
            H,
            k,
            Ks(Y),
            ne
          );
        if (Y.$$typeof === z)
          return X(
            H,
            k,
            Ys(H, Y),
            ne
          );
        Qs(H, Y);
      }
      return null;
    }
    function P(H, k, Y, ne, Ae) {
      if (typeof ne == "string" && ne !== "" || typeof ne == "number" || typeof ne == "bigint")
        return H = H.get(Y) || null, E(k, H, "" + ne, Ae);
      if (typeof ne == "object" && ne !== null) {
        switch (ne.$$typeof) {
          case w:
            return H = H.get(
              ne.key === null ? Y : ne.key
            ) || null, D(k, H, ne, Ae);
          case T:
            return H = H.get(
              ne.key === null ? Y : ne.key
            ) || null, F(k, H, ne, Ae);
          case A:
            return ne = Li(ne), P(
              H,
              k,
              Y,
              ne,
              Ae
            );
        }
        if (oe(ne) || ae(ne))
          return H = H.get(Y) || null, ee(k, H, ne, Ae, null);
        if (typeof ne.then == "function")
          return P(
            H,
            k,
            Y,
            Ks(ne),
            Ae
          );
        if (ne.$$typeof === z)
          return P(
            H,
            k,
            Y,
            Ys(k, ne),
            Ae
          );
        Qs(k, ne);
      }
      return null;
    }
    function xe(H, k, Y, ne) {
      for (var Ae = null, Ze = null, Te = k, Ve = k = 0, Xe = null; Te !== null && Ve < Y.length; Ve++) {
        Te.index > Ve ? (Xe = Te, Te = null) : Xe = Te.sibling;
        var Je = X(
          H,
          Te,
          Y[Ve],
          ne
        );
        if (Je === null) {
          Te === null && (Te = Xe);
          break;
        }
        e && Te && Je.alternate === null && t(H, Te), k = d(Je, k, Ve), Ze === null ? Ae = Je : Ze.sibling = Je, Ze = Je, Te = Xe;
      }
      if (Ve === Y.length)
        return i(H, Te), Ke && xa(H, Ve), Ae;
      if (Te === null) {
        for (; Ve < Y.length; Ve++)
          Te = ie(H, Y[Ve], ne), Te !== null && (k = d(
            Te,
            k,
            Ve
          ), Ze === null ? Ae = Te : Ze.sibling = Te, Ze = Te);
        return Ke && xa(H, Ve), Ae;
      }
      for (Te = l(Te); Ve < Y.length; Ve++)
        Xe = P(
          Te,
          H,
          Ve,
          Y[Ve],
          ne
        ), Xe !== null && (e && Xe.alternate !== null && Te.delete(
          Xe.key === null ? Ve : Xe.key
        ), k = d(
          Xe,
          k,
          Ve
        ), Ze === null ? Ae = Xe : Ze.sibling = Xe, Ze = Xe);
      return e && Te.forEach(function(ui) {
        return t(H, ui);
      }), Ke && xa(H, Ve), Ae;
    }
    function De(H, k, Y, ne) {
      if (Y == null) throw Error(s(151));
      for (var Ae = null, Ze = null, Te = k, Ve = k = 0, Xe = null, Je = Y.next(); Te !== null && !Je.done; Ve++, Je = Y.next()) {
        Te.index > Ve ? (Xe = Te, Te = null) : Xe = Te.sibling;
        var ui = X(H, Te, Je.value, ne);
        if (ui === null) {
          Te === null && (Te = Xe);
          break;
        }
        e && Te && ui.alternate === null && t(H, Te), k = d(ui, k, Ve), Ze === null ? Ae = ui : Ze.sibling = ui, Ze = ui, Te = Xe;
      }
      if (Je.done)
        return i(H, Te), Ke && xa(H, Ve), Ae;
      if (Te === null) {
        for (; !Je.done; Ve++, Je = Y.next())
          Je = ie(H, Je.value, ne), Je !== null && (k = d(Je, k, Ve), Ze === null ? Ae = Je : Ze.sibling = Je, Ze = Je);
        return Ke && xa(H, Ve), Ae;
      }
      for (Te = l(Te); !Je.done; Ve++, Je = Y.next())
        Je = P(Te, H, Ve, Je.value, ne), Je !== null && (e && Je.alternate !== null && Te.delete(Je.key === null ? Ve : Je.key), k = d(Je, k, Ve), Ze === null ? Ae = Je : Ze.sibling = Je, Ze = Je);
      return e && Te.forEach(function(sE) {
        return t(H, sE);
      }), Ke && xa(H, Ve), Ae;
    }
    function ot(H, k, Y, ne) {
      if (typeof Y == "object" && Y !== null && Y.type === j && Y.key === null && (Y = Y.props.children), typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case w:
            e: {
              for (var Ae = Y.key; k !== null; ) {
                if (k.key === Ae) {
                  if (Ae = Y.type, Ae === j) {
                    if (k.tag === 7) {
                      i(
                        H,
                        k.sibling
                      ), ne = u(
                        k,
                        Y.props.children
                      ), ne.return = H, H = ne;
                      break e;
                    }
                  } else if (k.elementType === Ae || typeof Ae == "object" && Ae !== null && Ae.$$typeof === A && Li(Ae) === k.type) {
                    i(
                      H,
                      k.sibling
                    ), ne = u(k, Y.props), gl(ne, Y), ne.return = H, H = ne;
                    break e;
                  }
                  i(H, k);
                  break;
                } else t(H, k);
                k = k.sibling;
              }
              Y.type === j ? (ne = Ri(
                Y.props.children,
                H.mode,
                ne,
                Y.key
              ), ne.return = H, H = ne) : (ne = qs(
                Y.type,
                Y.key,
                Y.props,
                null,
                H.mode,
                ne
              ), gl(ne, Y), ne.return = H, H = ne);
            }
            return y(H);
          case T:
            e: {
              for (Ae = Y.key; k !== null; ) {
                if (k.key === Ae)
                  if (k.tag === 4 && k.stateNode.containerInfo === Y.containerInfo && k.stateNode.implementation === Y.implementation) {
                    i(
                      H,
                      k.sibling
                    ), ne = u(k, Y.children || []), ne.return = H, H = ne;
                    break e;
                  } else {
                    i(H, k);
                    break;
                  }
                else t(H, k);
                k = k.sibling;
              }
              ne = rc(Y, H.mode, ne), ne.return = H, H = ne;
            }
            return y(H);
          case A:
            return Y = Li(Y), ot(
              H,
              k,
              Y,
              ne
            );
        }
        if (oe(Y))
          return xe(
            H,
            k,
            Y,
            ne
          );
        if (ae(Y)) {
          if (Ae = ae(Y), typeof Ae != "function") throw Error(s(150));
          return Y = Ae.call(Y), De(
            H,
            k,
            Y,
            ne
          );
        }
        if (typeof Y.then == "function")
          return ot(
            H,
            k,
            Ks(Y),
            ne
          );
        if (Y.$$typeof === z)
          return ot(
            H,
            k,
            Ys(H, Y),
            ne
          );
        Qs(H, Y);
      }
      return typeof Y == "string" && Y !== "" || typeof Y == "number" || typeof Y == "bigint" ? (Y = "" + Y, k !== null && k.tag === 6 ? (i(H, k.sibling), ne = u(k, Y), ne.return = H, H = ne) : (i(H, k), ne = ic(Y, H.mode, ne), ne.return = H, H = ne), y(H)) : i(H, k);
    }
    return function(H, k, Y, ne) {
      try {
        pl = 0;
        var Ae = ot(
          H,
          k,
          Y,
          ne
        );
        return yr = null, Ae;
      } catch (Te) {
        if (Te === vr || Te === Gs) throw Te;
        var Ze = wn(29, Te, null, H.mode);
        return Ze.lanes = ne, Ze.return = H, Ze;
      } finally {
      }
    };
  }
  var ki = Xm(!0), Km = Xm(!1), Ga = !1;
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
  function Xa(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Ka(e, t, i) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (We & 2) !== 0) {
      var u = l.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), l.pending = t, t = Hs(e), _m(e, null, i), t;
    }
    return Bs(e, l, t, i), Hs(e);
  }
  function vl(e, t, i) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (i & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, i |= l, t.lanes = i, nn(e, i);
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
  function yl() {
    if (xc) {
      var e = gr;
      if (e !== null) throw e;
    }
  }
  function bl(e, t, i, l) {
    xc = !1;
    var u = e.updateQueue;
    Ga = !1;
    var d = u.firstBaseUpdate, y = u.lastBaseUpdate, E = u.shared.pending;
    if (E !== null) {
      u.shared.pending = null;
      var D = E, F = D.next;
      D.next = null, y === null ? d = F : y.next = F, y = D;
      var ee = e.alternate;
      ee !== null && (ee = ee.updateQueue, E = ee.lastBaseUpdate, E !== y && (E === null ? ee.firstBaseUpdate = F : E.next = F, ee.lastBaseUpdate = D));
    }
    if (d !== null) {
      var ie = u.baseState;
      y = 0, ee = F = D = null, E = d;
      do {
        var X = E.lane & -536870913, P = X !== E.lane;
        if (P ? (Ge & X) === X : (l & X) === X) {
          X !== 0 && X === pr && (xc = !0), ee !== null && (ee = ee.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var xe = e, De = E;
            X = t;
            var ot = i;
            switch (De.tag) {
              case 1:
                if (xe = De.payload, typeof xe == "function") {
                  ie = xe.call(ot, ie, X);
                  break e;
                }
                ie = xe;
                break e;
              case 3:
                xe.flags = xe.flags & -65537 | 128;
              case 0:
                if (xe = De.payload, X = typeof xe == "function" ? xe.call(ot, ie, X) : xe, X == null) break e;
                ie = v({}, ie, X);
                break e;
              case 2:
                Ga = !0;
            }
          }
          X = E.callback, X !== null && (e.flags |= 64, P && (e.flags |= 8192), P = u.callbacks, P === null ? u.callbacks = [X] : P.push(X));
        } else
          P = {
            lane: X,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          }, ee === null ? (F = ee = P, D = ie) : ee = ee.next = P, y |= X;
        if (E = E.next, E === null) {
          if (E = u.shared.pending, E === null)
            break;
          P = E, E = P.next, P.next = null, u.lastBaseUpdate = P, u.shared.pending = null;
        }
      } while (!0);
      ee === null && (D = ie), u.baseState = D, u.firstBaseUpdate = F, u.lastBaseUpdate = ee, d === null && (u.shared.lanes = 0), Wa |= y, e.lanes = y, e.memoizedState = ie;
    }
  }
  function Qm(e, t) {
    if (typeof e != "function")
      throw Error(s(191, e));
    e.call(t);
  }
  function Pm(e, t) {
    var i = e.callbacks;
    if (i !== null)
      for (e.callbacks = null, e = 0; e < i.length; e++)
        Qm(i[e], t);
  }
  var br = N(null), Ps = N(0);
  function Zm(e, t) {
    e = _a, Z(Ps, e), Z(br, t), _a = e | t.baseLanes;
  }
  function Sc() {
    Z(Ps, _a), Z(br, br.current);
  }
  function wc() {
    _a = Ps.current, K(br), K(Ps);
  }
  var En = N(null), Hn = null;
  function Qa(e) {
    var t = e.alternate;
    Z(jt, jt.current & 1), Z(En, e), Hn === null && (t === null || br.current !== null || t.memoizedState !== null) && (Hn = e);
  }
  function Ec(e) {
    Z(jt, jt.current), Z(En, e), Hn === null && (Hn = e);
  }
  function Jm(e) {
    e.tag === 22 ? (Z(jt, jt.current), Z(En, e), Hn === null && (Hn = e)) : Pa();
  }
  function Pa() {
    Z(jt, jt.current), Z(En, En.current);
  }
  function Tn(e) {
    K(En), Hn === e && (Hn = null), K(jt);
  }
  var jt = N(0);
  function Zs(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var i = t.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || Ad(i) || Rd(i)))
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
  var Ea = 0, ke = null, lt = null, Dt = null, Js = !1, xr = !1, Vi = !1, Ws = 0, xl = 0, Sr = null, ZS = 0;
  function St() {
    throw Error(s(321));
  }
  function Tc(e, t) {
    if (t === null) return !1;
    for (var i = 0; i < t.length && i < e.length; i++)
      if (!Sn(e[i], t[i])) return !1;
    return !0;
  }
  function jc(e, t, i, l, u, d) {
    return Ea = d, ke = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, U.H = e === null || e.memoizedState === null ? Lp : Hc, Vi = !1, d = i(l, u), Vi = !1, xr && (d = ep(
      t,
      i,
      l,
      u
    )), Wm(e), d;
  }
  function Wm(e) {
    U.H = El;
    var t = lt !== null && lt.next !== null;
    if (Ea = 0, Dt = lt = ke = null, Js = !1, xl = 0, Sr = null, t) throw Error(s(300));
    e === null || zt || (e = e.dependencies, e !== null && Is(e) && (zt = !0));
  }
  function ep(e, t, i, l) {
    ke = e;
    var u = 0;
    do {
      if (xr && (Sr = null), xl = 0, xr = !1, 25 <= u) throw Error(s(301));
      if (u += 1, Dt = lt = null, e.updateQueue != null) {
        var d = e.updateQueue;
        d.lastEffect = null, d.events = null, d.stores = null, d.memoCache != null && (d.memoCache.index = 0);
      }
      U.H = Up, d = t(i, l);
    } while (xr);
    return d;
  }
  function JS() {
    var e = U.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Sl(t) : t, e = e.useState()[0], (lt !== null ? lt.memoizedState : null) !== e && (ke.flags |= 1024), t;
  }
  function Cc() {
    var e = Ws !== 0;
    return Ws = 0, e;
  }
  function Nc(e, t, i) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i;
  }
  function Mc(e) {
    if (Js) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Js = !1;
    }
    Ea = 0, Dt = lt = ke = null, xr = !1, xl = Ws = 0, Sr = null;
  }
  function un() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Dt === null ? ke.memoizedState = Dt = e : Dt = Dt.next = e, Dt;
  }
  function Ct() {
    if (lt === null) {
      var e = ke.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = lt.next;
    var t = Dt === null ? ke.memoizedState : Dt.next;
    if (t !== null)
      Dt = t, lt = e;
    else {
      if (e === null)
        throw ke.alternate === null ? Error(s(467)) : Error(s(310));
      lt = e, e = {
        memoizedState: lt.memoizedState,
        baseState: lt.baseState,
        baseQueue: lt.baseQueue,
        queue: lt.queue,
        next: null
      }, Dt === null ? ke.memoizedState = Dt = e : Dt = Dt.next = e;
    }
    return Dt;
  }
  function eo() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Sl(e) {
    var t = xl;
    return xl += 1, Sr === null && (Sr = []), e = Ym(Sr, e, t), t = ke, (Dt === null ? t.memoizedState : Dt.next) === null && (t = t.alternate, U.H = t === null || t.memoizedState === null ? Lp : Hc), e;
  }
  function to(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Sl(e);
      if (e.$$typeof === z) return Wt(e);
    }
    throw Error(s(438, String(e)));
  }
  function Ac(e) {
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
    if (t == null && (t = { data: [], index: 0 }), i === null && (i = eo(), ke.updateQueue = i), i.memoCache = t, i = t.data[t.index], i === void 0)
      for (i = t.data[t.index] = Array(e), l = 0; l < e; l++)
        i[l] = $;
    return t.index++, i;
  }
  function Ta(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function no(e) {
    var t = Ct();
    return Rc(t, lt, e);
  }
  function Rc(e, t, i) {
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
        var ie = F.lane & -536870913;
        if (ie !== F.lane ? (Ge & ie) === ie : (Ea & ie) === ie) {
          var X = F.revertLane;
          if (X === 0)
            D !== null && (D = D.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: F.action,
              hasEagerState: F.hasEagerState,
              eagerState: F.eagerState,
              next: null
            }), ie === pr && (ee = !0);
          else if ((Ea & X) === X) {
            F = F.next, X === pr && (ee = !0);
            continue;
          } else
            ie = {
              lane: 0,
              revertLane: F.revertLane,
              gesture: null,
              action: F.action,
              hasEagerState: F.hasEagerState,
              eagerState: F.eagerState,
              next: null
            }, D === null ? (E = D = ie, y = d) : D = D.next = ie, ke.lanes |= X, Wa |= X;
          ie = F.action, Vi && i(d, ie), d = F.hasEagerState ? F.eagerState : i(d, ie);
        } else
          X = {
            lane: ie,
            revertLane: F.revertLane,
            gesture: F.gesture,
            action: F.action,
            hasEagerState: F.hasEagerState,
            eagerState: F.eagerState,
            next: null
          }, D === null ? (E = D = X, y = d) : D = D.next = X, ke.lanes |= ie, Wa |= ie;
        F = F.next;
      } while (F !== null && F !== t);
      if (D === null ? y = d : D.next = E, !Sn(d, e.memoizedState) && (zt = !0, ee && (i = gr, i !== null)))
        throw i;
      e.memoizedState = d, e.baseState = y, e.baseQueue = D, l.lastRenderedState = d;
    }
    return u === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function _c(e) {
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
      Sn(d, t.memoizedState) || (zt = !0), t.memoizedState = d, t.baseQueue === null && (t.baseState = d), i.lastRenderedState = d;
    }
    return [d, l];
  }
  function tp(e, t, i) {
    var l = ke, u = Ct(), d = Ke;
    if (d) {
      if (i === void 0) throw Error(s(407));
      i = i();
    } else i = t();
    var y = !Sn(
      (lt || u).memoizedState,
      i
    );
    if (y && (u.memoizedState = i, zt = !0), u = u.queue, Oc(ip.bind(null, l, u, e), [
      e
    ]), u.getSnapshot !== t || y || Dt !== null && Dt.memoizedState.tag & 1) {
      if (l.flags |= 2048, wr(
        9,
        { destroy: void 0 },
        ap.bind(
          null,
          l,
          u,
          i,
          t
        ),
        null
      ), dt === null) throw Error(s(349));
      d || (Ea & 127) !== 0 || np(l, t, i);
    }
    return i;
  }
  function np(e, t, i) {
    e.flags |= 16384, e = { getSnapshot: t, value: i }, t = ke.updateQueue, t === null ? (t = eo(), ke.updateQueue = t, t.stores = [e]) : (i = t.stores, i === null ? t.stores = [e] : i.push(e));
  }
  function ap(e, t, i, l) {
    t.value = i, t.getSnapshot = l, rp(t) && lp(e);
  }
  function ip(e, t, i) {
    return i(function() {
      rp(t) && lp(e);
    });
  }
  function rp(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var i = t();
      return !Sn(e, i);
    } catch {
      return !0;
    }
  }
  function lp(e) {
    var t = Ai(e, 2);
    t !== null && gn(t, e, 2);
  }
  function Dc(e) {
    var t = un();
    if (typeof e == "function") {
      var i = e;
      if (e = i(), Vi) {
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
      lastRenderedReducer: Ta,
      lastRenderedState: e
    }, t;
  }
  function sp(e, t, i, l) {
    return e.baseState = i, Rc(
      e,
      lt,
      typeof l == "function" ? l : Ta
    );
  }
  function WS(e, t, i, l, u) {
    if (ro(e)) throw Error(s(485));
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
      U.T !== null ? i(!0) : d.isTransition = !1, l(d), i = t.pending, i === null ? (d.next = t.pending = d, op(t, d)) : (d.next = i.next, t.pending = i.next = d);
    }
  }
  function op(e, t) {
    var i = t.action, l = t.payload, u = e.state;
    if (t.isTransition) {
      var d = U.T, y = {};
      U.T = y;
      try {
        var E = i(u, l), D = U.S;
        D !== null && D(y, E), up(e, t, E);
      } catch (F) {
        zc(e, t, F);
      } finally {
        d !== null && y.types !== null && (d.types = y.types), U.T = d;
      }
    } else
      try {
        d = i(u, l), up(e, t, d);
      } catch (F) {
        zc(e, t, F);
      }
  }
  function up(e, t, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(l) {
        cp(e, t, l);
      },
      function(l) {
        return zc(e, t, l);
      }
    ) : cp(e, t, i);
  }
  function cp(e, t, i) {
    t.status = "fulfilled", t.value = i, dp(t), e.state = i, t = e.pending, t !== null && (i = t.next, i === t ? e.pending = null : (i = i.next, t.next = i, op(e, i)));
  }
  function zc(e, t, i) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = i, dp(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function dp(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function fp(e, t) {
    return t;
  }
  function hp(e, t) {
    if (Ke) {
      var i = dt.formState;
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
            Ya(l);
          }
          l = !1;
        }
        l && (t = i[0]);
      }
    }
    return i = un(), i.memoizedState = i.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: fp,
      lastRenderedState: t
    }, i.queue = l, i = Dp.bind(
      null,
      ke,
      l
    ), l.dispatch = i, l = Dc(!1), d = Bc.bind(
      null,
      ke,
      !1,
      l.queue
    ), l = un(), u = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = u, i = WS.bind(
      null,
      ke,
      u,
      d,
      i
    ), u.dispatch = i, l.memoizedState = e, [t, i, !1];
  }
  function mp(e) {
    var t = Ct();
    return pp(t, lt, e);
  }
  function pp(e, t, i) {
    if (t = Rc(
      e,
      t,
      fp
    )[0], e = no(Ta)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = Sl(t);
      } catch (y) {
        throw y === vr ? Gs : y;
      }
    else l = t;
    t = Ct();
    var u = t.queue, d = u.dispatch;
    return i !== t.memoizedState && (ke.flags |= 2048, wr(
      9,
      { destroy: void 0 },
      ew.bind(null, u, i),
      null
    )), [l, d, e];
  }
  function ew(e, t) {
    e.action = t;
  }
  function gp(e) {
    var t = Ct(), i = lt;
    if (i !== null)
      return pp(t, i, e);
    Ct(), t = t.memoizedState, i = Ct();
    var l = i.queue.dispatch;
    return i.memoizedState = e, [t, l, !1];
  }
  function wr(e, t, i, l) {
    return e = { tag: e, create: i, deps: l, inst: t, next: null }, t = ke.updateQueue, t === null && (t = eo(), ke.updateQueue = t), i = t.lastEffect, i === null ? t.lastEffect = e.next = e : (l = i.next, i.next = e, e.next = l, t.lastEffect = e), e;
  }
  function vp() {
    return Ct().memoizedState;
  }
  function ao(e, t, i, l) {
    var u = un();
    ke.flags |= e, u.memoizedState = wr(
      1 | t,
      { destroy: void 0 },
      i,
      l === void 0 ? null : l
    );
  }
  function io(e, t, i, l) {
    var u = Ct();
    l = l === void 0 ? null : l;
    var d = u.memoizedState.inst;
    lt !== null && l !== null && Tc(l, lt.memoizedState.deps) ? u.memoizedState = wr(t, d, i, l) : (ke.flags |= e, u.memoizedState = wr(
      1 | t,
      d,
      i,
      l
    ));
  }
  function yp(e, t) {
    ao(8390656, 8, e, t);
  }
  function Oc(e, t) {
    io(2048, 8, e, t);
  }
  function tw(e) {
    ke.flags |= 4;
    var t = ke.updateQueue;
    if (t === null)
      t = eo(), ke.updateQueue = t, t.events = [e];
    else {
      var i = t.events;
      i === null ? t.events = [e] : i.push(e);
    }
  }
  function bp(e) {
    var t = Ct().memoizedState;
    return tw({ ref: t, nextImpl: e }), function() {
      if ((We & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function xp(e, t) {
    return io(4, 2, e, t);
  }
  function Sp(e, t) {
    return io(4, 4, e, t);
  }
  function wp(e, t) {
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
  function Ep(e, t, i) {
    i = i != null ? i.concat([e]) : null, io(4, 4, wp.bind(null, t, e), i);
  }
  function Lc() {
  }
  function Tp(e, t) {
    var i = Ct();
    t = t === void 0 ? null : t;
    var l = i.memoizedState;
    return t !== null && Tc(t, l[1]) ? l[0] : (i.memoizedState = [e, t], e);
  }
  function jp(e, t) {
    var i = Ct();
    t = t === void 0 ? null : t;
    var l = i.memoizedState;
    if (t !== null && Tc(t, l[1]))
      return l[0];
    if (l = e(), Vi) {
      Et(!0);
      try {
        e();
      } finally {
        Et(!1);
      }
    }
    return i.memoizedState = [l, t], l;
  }
  function Uc(e, t, i) {
    return i === void 0 || (Ea & 1073741824) !== 0 && (Ge & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = i, e = Cg(), ke.lanes |= e, Wa |= e, i);
  }
  function Cp(e, t, i, l) {
    return Sn(i, t) ? i : br.current !== null ? (e = Uc(e, i, l), Sn(e, t) || (zt = !0), e) : (Ea & 42) === 0 || (Ea & 1073741824) !== 0 && (Ge & 261930) === 0 ? (zt = !0, e.memoizedState = i) : (e = Cg(), ke.lanes |= e, Wa |= e, t);
  }
  function Np(e, t, i, l, u) {
    var d = V.p;
    V.p = d !== 0 && 8 > d ? d : 8;
    var y = U.T, E = {};
    U.T = E, Bc(e, !1, t, i);
    try {
      var D = u(), F = U.S;
      if (F !== null && F(E, D), D !== null && typeof D == "object" && typeof D.then == "function") {
        var ee = PS(
          D,
          l
        );
        wl(
          e,
          t,
          ee,
          Nn(e)
        );
      } else
        wl(
          e,
          t,
          l,
          Nn(e)
        );
    } catch (ie) {
      wl(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: ie },
        Nn()
      );
    } finally {
      V.p = d, y !== null && E.types !== null && (y.types = E.types), U.T = y;
    }
  }
  function nw() {
  }
  function kc(e, t, i, l) {
    if (e.tag !== 5) throw Error(s(476));
    var u = Mp(e).queue;
    Np(
      e,
      u,
      t,
      q,
      i === null ? nw : function() {
        return Ap(e), i(l);
      }
    );
  }
  function Mp(e) {
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
  function Ap(e) {
    var t = Mp(e);
    t.next === null && (t = e.alternate.memoizedState), wl(
      e,
      t.next.queue,
      {},
      Nn()
    );
  }
  function Vc() {
    return Wt(Bl);
  }
  function Rp() {
    return Ct().memoizedState;
  }
  function _p() {
    return Ct().memoizedState;
  }
  function aw(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var i = Nn();
          e = Xa(i);
          var l = Ka(t, e, i);
          l !== null && (gn(l, t, i), vl(l, t, i)), t = { cache: hc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function iw(e, t, i) {
    var l = Nn();
    i = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ro(e) ? zp(t, i) : (i = nc(e, t, i, l), i !== null && (gn(i, e, l), Op(i, t, l)));
  }
  function Dp(e, t, i) {
    var l = Nn();
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
    if (ro(e)) zp(t, u);
    else {
      var d = e.alternate;
      if (e.lanes === 0 && (d === null || d.lanes === 0) && (d = t.lastRenderedReducer, d !== null))
        try {
          var y = t.lastRenderedState, E = d(y, i);
          if (u.hasEagerState = !0, u.eagerState = E, Sn(E, y))
            return Bs(e, t, u, 0), dt === null && Vs(), !1;
        } catch {
        } finally {
        }
      if (i = nc(e, t, u, l), i !== null)
        return gn(i, e, l), Op(i, t, l), !0;
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
    }, ro(e)) {
      if (t) throw Error(s(479));
    } else
      t = nc(
        e,
        i,
        l,
        2
      ), t !== null && gn(t, e, 2);
  }
  function ro(e) {
    var t = e.alternate;
    return e === ke || t !== null && t === ke;
  }
  function zp(e, t) {
    xr = Js = !0;
    var i = e.pending;
    i === null ? t.next = t : (t.next = i.next, i.next = t), e.pending = t;
  }
  function Op(e, t, i) {
    if ((i & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, i |= l, t.lanes = i, nn(e, i);
    }
  }
  var El = {
    readContext: Wt,
    use: to,
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
  var Lp = {
    readContext: Wt,
    use: to,
    useCallback: function(e, t) {
      return un().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Wt,
    useEffect: yp,
    useImperativeHandle: function(e, t, i) {
      i = i != null ? i.concat([e]) : null, ao(
        4194308,
        4,
        wp.bind(null, t, e),
        i
      );
    },
    useLayoutEffect: function(e, t) {
      return ao(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      ao(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var i = un();
      t = t === void 0 ? null : t;
      var l = e();
      if (Vi) {
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
      var l = un();
      if (i !== void 0) {
        var u = i(t);
        if (Vi) {
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
      }, l.queue = e, e = e.dispatch = iw.bind(
        null,
        ke,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = un();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Dc(e);
      var t = e.queue, i = Dp.bind(null, ke, t);
      return t.dispatch = i, [e.memoizedState, i];
    },
    useDebugValue: Lc,
    useDeferredValue: function(e, t) {
      var i = un();
      return Uc(i, e, t);
    },
    useTransition: function() {
      var e = Dc(!1);
      return e = Np.bind(
        null,
        ke,
        e.queue,
        !0,
        !1
      ), un().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, i) {
      var l = ke, u = un();
      if (Ke) {
        if (i === void 0)
          throw Error(s(407));
        i = i();
      } else {
        if (i = t(), dt === null)
          throw Error(s(349));
        (Ge & 127) !== 0 || np(l, t, i);
      }
      u.memoizedState = i;
      var d = { value: i, getSnapshot: t };
      return u.queue = d, yp(ip.bind(null, l, d, e), [
        e
      ]), l.flags |= 2048, wr(
        9,
        { destroy: void 0 },
        ap.bind(
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
      var e = un(), t = dt.identifierPrefix;
      if (Ke) {
        var i = ua, l = oa;
        i = (l & ~(1 << 32 - $t(l) - 1)).toString(32) + i, t = "_" + t + "R_" + i, i = Ws++, 0 < i && (t += "H" + i.toString(32)), t += "_";
      } else
        i = ZS++, t = "_" + t + "r_" + i.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Vc,
    useFormState: hp,
    useActionState: hp,
    useOptimistic: function(e) {
      var t = un();
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
    useMemoCache: Ac,
    useCacheRefresh: function() {
      return un().memoizedState = aw.bind(
        null,
        ke
      );
    },
    useEffectEvent: function(e) {
      var t = un(), i = { impl: e };
      return t.memoizedState = i, function() {
        if ((We & 2) !== 0)
          throw Error(s(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, Hc = {
    readContext: Wt,
    use: to,
    useCallback: Tp,
    useContext: Wt,
    useEffect: Oc,
    useImperativeHandle: Ep,
    useInsertionEffect: xp,
    useLayoutEffect: Sp,
    useMemo: jp,
    useReducer: no,
    useRef: vp,
    useState: function() {
      return no(Ta);
    },
    useDebugValue: Lc,
    useDeferredValue: function(e, t) {
      var i = Ct();
      return Cp(
        i,
        lt.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = no(Ta)[0], t = Ct().memoizedState;
      return [
        typeof e == "boolean" ? e : Sl(e),
        t
      ];
    },
    useSyncExternalStore: tp,
    useId: Rp,
    useHostTransitionStatus: Vc,
    useFormState: mp,
    useActionState: mp,
    useOptimistic: function(e, t) {
      var i = Ct();
      return sp(i, lt, e, t);
    },
    useMemoCache: Ac,
    useCacheRefresh: _p
  };
  Hc.useEffectEvent = bp;
  var Up = {
    readContext: Wt,
    use: to,
    useCallback: Tp,
    useContext: Wt,
    useEffect: Oc,
    useImperativeHandle: Ep,
    useInsertionEffect: xp,
    useLayoutEffect: Sp,
    useMemo: jp,
    useReducer: _c,
    useRef: vp,
    useState: function() {
      return _c(Ta);
    },
    useDebugValue: Lc,
    useDeferredValue: function(e, t) {
      var i = Ct();
      return lt === null ? Uc(i, e, t) : Cp(
        i,
        lt.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = _c(Ta)[0], t = Ct().memoizedState;
      return [
        typeof e == "boolean" ? e : Sl(e),
        t
      ];
    },
    useSyncExternalStore: tp,
    useId: Rp,
    useHostTransitionStatus: Vc,
    useFormState: gp,
    useActionState: gp,
    useOptimistic: function(e, t) {
      var i = Ct();
      return lt !== null ? sp(i, lt, e, t) : (i.baseState = e, [e, i.queue.dispatch]);
    },
    useMemoCache: Ac,
    useCacheRefresh: _p
  };
  Up.useEffectEvent = bp;
  function qc(e, t, i, l) {
    t = e.memoizedState, i = i(l, t), i = i == null ? t : v({}, t, i), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
  }
  var $c = {
    enqueueSetState: function(e, t, i) {
      e = e._reactInternals;
      var l = Nn(), u = Xa(l);
      u.payload = t, i != null && (u.callback = i), t = Ka(e, u, l), t !== null && (gn(t, e, l), vl(t, e, l));
    },
    enqueueReplaceState: function(e, t, i) {
      e = e._reactInternals;
      var l = Nn(), u = Xa(l);
      u.tag = 1, u.payload = t, i != null && (u.callback = i), t = Ka(e, u, l), t !== null && (gn(t, e, l), vl(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var i = Nn(), l = Xa(i);
      l.tag = 2, t != null && (l.callback = t), t = Ka(e, l, i), t !== null && (gn(t, e, i), vl(t, e, i));
    }
  };
  function kp(e, t, i, l, u, d, y) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, d, y) : t.prototype && t.prototype.isPureReactComponent ? !ul(i, l) || !ul(u, d) : !0;
  }
  function Vp(e, t, i, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(i, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(i, l), t.state !== e && $c.enqueueReplaceState(t, t.state, null);
  }
  function Bi(e, t) {
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
  function Bp(e) {
    ks(e);
  }
  function Hp(e) {
    console.error(e);
  }
  function qp(e) {
    ks(e);
  }
  function lo(e, t) {
    try {
      var i = e.onUncaughtError;
      i(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function $p(e, t, i) {
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
    return i = Xa(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      lo(e, t);
    }, i;
  }
  function Ip(e) {
    return e = Xa(e), e.tag = 3, e;
  }
  function Yp(e, t, i, l) {
    var u = i.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var d = l.value;
      e.payload = function() {
        return u(d);
      }, e.callback = function() {
        $p(t, i, l);
      };
    }
    var y = i.stateNode;
    y !== null && typeof y.componentDidCatch == "function" && (e.callback = function() {
      $p(t, i, l), typeof u != "function" && (ei === null ? ei = /* @__PURE__ */ new Set([this]) : ei.add(this));
      var E = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function rw(e, t, i, l, u) {
    if (i.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = i.alternate, t !== null && mr(
        t,
        i,
        u,
        !0
      ), i = En.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return Hn === null ? bo() : i.alternate === null && wt === 0 && (wt = 3), i.flags &= -257, i.flags |= 65536, i.lanes = u, l === Xs ? i.flags |= 16384 : (t = i.updateQueue, t === null ? i.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), md(e, l, u)), !1;
          case 22:
            return i.flags |= 65536, l === Xs ? i.flags |= 16384 : (t = i.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, i.updateQueue = t) : (i = t.retryQueue, i === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : i.add(l)), md(e, l, u)), !1;
        }
        throw Error(s(435, i.tag));
      }
      return md(e, l, u), bo(), !1;
    }
    if (Ke)
      return t = En.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, l !== oc && (e = Error(s(422), { cause: l }), fl(Un(e, i)))) : (l !== oc && (t = Error(s(423), {
        cause: l
      }), fl(
        Un(t, i)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, l = Un(l, i), u = Ic(
        e.stateNode,
        l,
        u
      ), bc(e, u), wt !== 4 && (wt = 2)), !1;
    var d = Error(s(520), { cause: l });
    if (d = Un(d, i), _l === null ? _l = [d] : _l.push(d), wt !== 4 && (wt = 2), t === null) return !0;
    l = Un(l, i), i = t;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, e = u & -u, i.lanes |= e, e = Ic(i.stateNode, l, e), bc(i, e), !1;
        case 1:
          if (t = i.type, d = i.stateNode, (i.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (ei === null || !ei.has(d))))
            return i.flags |= 65536, u &= -u, i.lanes |= u, u = Ip(u), Yp(
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
  var Yc = Error(s(461)), zt = !1;
  function en(e, t, i, l) {
    t.child = e === null ? Km(t, null, i, l) : ki(
      t,
      e.child,
      i,
      l
    );
  }
  function Fp(e, t, i, l, u) {
    i = i.render;
    var d = t.ref;
    if ("ref" in l) {
      var y = {};
      for (var E in l)
        E !== "ref" && (y[E] = l[E]);
    } else y = l;
    return zi(t), l = jc(
      e,
      t,
      i,
      y,
      d,
      u
    ), E = Cc(), e !== null && !zt ? (Nc(e, t, u), ja(e, t, u)) : (Ke && E && lc(t), t.flags |= 1, en(e, t, l, u), t.child);
  }
  function Gp(e, t, i, l, u) {
    if (e === null) {
      var d = i.type;
      return typeof d == "function" && !ac(d) && d.defaultProps === void 0 && i.compare === null ? (t.tag = 15, t.type = d, Xp(
        e,
        t,
        d,
        l,
        u
      )) : (e = qs(
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
      if (i = i.compare, i = i !== null ? i : ul, i(y, l) && e.ref === t.ref)
        return ja(e, t, u);
    }
    return t.flags |= 1, e = ba(d, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Xp(e, t, i, l, u) {
    if (e !== null) {
      var d = e.memoizedProps;
      if (ul(d, l) && e.ref === t.ref)
        if (zt = !1, t.pendingProps = l = d, Jc(e, u))
          (e.flags & 131072) !== 0 && (zt = !0);
        else
          return t.lanes = e.lanes, ja(e, t, u);
    }
    return Fc(
      e,
      t,
      i,
      l,
      u
    );
  }
  function Kp(e, t, i, l) {
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
        return Qp(
          e,
          t,
          d,
          i,
          l
        );
      }
      if ((i & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Fs(
          t,
          d !== null ? d.cachePool : null
        ), d !== null ? Zm(t, d) : Sc(), Jm(t);
      else
        return l = t.lanes = 536870912, Qp(
          e,
          t,
          d !== null ? d.baseLanes | i : i,
          i,
          l
        );
    } else
      d !== null ? (Fs(t, d.cachePool), Zm(t, d), Pa(), t.memoizedState = null) : (e !== null && Fs(t, null), Sc(), Pa());
    return en(e, t, u, i), t.child;
  }
  function Tl(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Qp(e, t, i, l, u) {
    var d = pc();
    return d = d === null ? null : { parent: _t._currentValue, pool: d }, t.memoizedState = {
      baseLanes: i,
      cachePool: d
    }, e !== null && Fs(t, null), Sc(), Jm(t), e !== null && mr(e, t, l, !0), t.childLanes = u, null;
  }
  function so(e, t) {
    return t = uo(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Pp(e, t, i) {
    return ki(t, e.child, null, i), e = so(t, t.pendingProps), e.flags |= 2, Tn(t), t.memoizedState = null, e;
  }
  function lw(e, t, i) {
    var l = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Ke) {
        if (l.mode === "hidden")
          return e = so(t, l), t.lanes = 536870912, Tl(null, e);
        if (Ec(t), (e = pt) ? (e = ov(
          e,
          Bn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: $a !== null ? { id: oa, overflow: ua } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = zm(e), i.return = t, t.child = i, Jt = t, pt = null)) : e = null, e === null) throw Ya(t);
        return t.lanes = 536870912, null;
      }
      return so(t, l);
    }
    var d = e.memoizedState;
    if (d !== null) {
      var y = d.dehydrated;
      if (Ec(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = Pp(
            e,
            t,
            i
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(s(558));
      else if (zt || mr(e, t, i, !1), u = (i & e.childLanes) !== 0, zt || u) {
        if (l = dt, l !== null && (y = M(l, i), y !== 0 && y !== d.retryLane))
          throw d.retryLane = y, Ai(e, y), gn(l, e, y), Yc;
        bo(), t = Pp(
          e,
          t,
          i
        );
      } else
        e = d.treeContext, pt = qn(y.nextSibling), Jt = t, Ke = !0, Ia = null, Bn = !1, e !== null && Um(t, e), t = so(t, l), t.flags |= 4096;
      return t;
    }
    return e = ba(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function oo(e, t) {
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
    return zi(t), i = jc(
      e,
      t,
      i,
      l,
      void 0,
      u
    ), l = Cc(), e !== null && !zt ? (Nc(e, t, u), ja(e, t, u)) : (Ke && l && lc(t), t.flags |= 1, en(e, t, i, u), t.child);
  }
  function Zp(e, t, i, l, u, d) {
    return zi(t), t.updateQueue = null, i = ep(
      t,
      l,
      i,
      u
    ), Wm(e), l = Cc(), e !== null && !zt ? (Nc(e, t, d), ja(e, t, d)) : (Ke && l && lc(t), t.flags |= 1, en(e, t, i, d), t.child);
  }
  function Jp(e, t, i, l, u) {
    if (zi(t), t.stateNode === null) {
      var d = cr, y = i.contextType;
      typeof y == "object" && y !== null && (d = Wt(y)), d = new i(l, d), t.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null, d.updater = $c, t.stateNode = d, d._reactInternals = t, d = t.stateNode, d.props = l, d.state = t.memoizedState, d.refs = {}, vc(t), y = i.contextType, d.context = typeof y == "object" && y !== null ? Wt(y) : cr, d.state = t.memoizedState, y = i.getDerivedStateFromProps, typeof y == "function" && (qc(
        t,
        i,
        y,
        l
      ), d.state = t.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof d.getSnapshotBeforeUpdate == "function" || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (y = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), y !== d.state && $c.enqueueReplaceState(d, d.state, null), bl(t, l, d, u), yl(), d.state = t.memoizedState), typeof d.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      d = t.stateNode;
      var E = t.memoizedProps, D = Bi(i, E);
      d.props = D;
      var F = d.context, ee = i.contextType;
      y = cr, typeof ee == "object" && ee !== null && (y = Wt(ee));
      var ie = i.getDerivedStateFromProps;
      ee = typeof ie == "function" || typeof d.getSnapshotBeforeUpdate == "function", E = t.pendingProps !== E, ee || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (E || F !== y) && Vp(
        t,
        d,
        l,
        y
      ), Ga = !1;
      var X = t.memoizedState;
      d.state = X, bl(t, l, d, u), yl(), F = t.memoizedState, E || X !== F || Ga ? (typeof ie == "function" && (qc(
        t,
        i,
        ie,
        l
      ), F = t.memoizedState), (D = Ga || kp(
        t,
        i,
        D,
        l,
        X,
        F,
        y
      )) ? (ee || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = F), d.props = l, d.state = F, d.context = y, l = D) : (typeof d.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      d = t.stateNode, yc(e, t), y = t.memoizedProps, ee = Bi(i, y), d.props = ee, ie = t.pendingProps, X = d.context, F = i.contextType, D = cr, typeof F == "object" && F !== null && (D = Wt(F)), E = i.getDerivedStateFromProps, (F = typeof E == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (y !== ie || X !== D) && Vp(
        t,
        d,
        l,
        D
      ), Ga = !1, X = t.memoizedState, d.state = X, bl(t, l, d, u), yl();
      var P = t.memoizedState;
      y !== ie || X !== P || Ga || e !== null && e.dependencies !== null && Is(e.dependencies) ? (typeof E == "function" && (qc(
        t,
        i,
        E,
        l
      ), P = t.memoizedState), (ee = Ga || kp(
        t,
        i,
        ee,
        l,
        X,
        P,
        D
      ) || e !== null && e.dependencies !== null && Is(e.dependencies)) ? (F || typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function" || (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(l, P, D), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(
        l,
        P,
        D
      )), typeof d.componentDidUpdate == "function" && (t.flags |= 4), typeof d.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof d.componentDidUpdate != "function" || y === e.memoizedProps && X === e.memoizedState || (t.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && X === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = P), d.props = l, d.state = P, d.context = D, l = ee) : (typeof d.componentDidUpdate != "function" || y === e.memoizedProps && X === e.memoizedState || (t.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || y === e.memoizedProps && X === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return d = l, oo(e, t), l = (t.flags & 128) !== 0, d || l ? (d = t.stateNode, i = l && typeof i.getDerivedStateFromError != "function" ? null : d.render(), t.flags |= 1, e !== null && l ? (t.child = ki(
      t,
      e.child,
      null,
      u
    ), t.child = ki(
      t,
      null,
      i,
      u
    )) : en(e, t, i, u), t.memoizedState = d.state, e = t.child) : e = ja(
      e,
      t,
      u
    ), e;
  }
  function Wp(e, t, i, l) {
    return _i(), t.flags |= 256, en(e, t, i, l), t.child;
  }
  var Gc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Xc(e) {
    return { baseLanes: e, cachePool: $m() };
  }
  function Kc(e, t, i) {
    return e = e !== null ? e.childLanes & ~i : 0, t && (e |= Cn), e;
  }
  function eg(e, t, i) {
    var l = t.pendingProps, u = !1, d = (t.flags & 128) !== 0, y;
    if ((y = d) || (y = e !== null && e.memoizedState === null ? !1 : (jt.current & 2) !== 0), y && (u = !0, t.flags &= -129), y = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Ke) {
        if (u ? Qa(t) : Pa(), (e = pt) ? (e = ov(
          e,
          Bn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: $a !== null ? { id: oa, overflow: ua } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = zm(e), i.return = t, t.child = i, Jt = t, pt = null)) : e = null, e === null) throw Ya(t);
        return Rd(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var E = l.children;
      return l = l.fallback, u ? (Pa(), u = t.mode, E = uo(
        { mode: "hidden", children: E },
        u
      ), l = Ri(
        l,
        u,
        i,
        null
      ), E.return = t, l.return = t, E.sibling = l, t.child = E, l = t.child, l.memoizedState = Xc(i), l.childLanes = Kc(
        e,
        y,
        i
      ), t.memoizedState = Gc, Tl(null, l)) : (Qa(t), Qc(t, E));
    }
    var D = e.memoizedState;
    if (D !== null && (E = D.dehydrated, E !== null)) {
      if (d)
        t.flags & 256 ? (Qa(t), t.flags &= -257, t = Pc(
          e,
          t,
          i
        )) : t.memoizedState !== null ? (Pa(), t.child = e.child, t.flags |= 128, t = null) : (Pa(), E = l.fallback, u = t.mode, l = uo(
          { mode: "visible", children: l.children },
          u
        ), E = Ri(
          E,
          u,
          i,
          null
        ), E.flags |= 2, l.return = t, E.return = t, l.sibling = E, t.child = l, ki(
          t,
          e.child,
          null,
          i
        ), l = t.child, l.memoizedState = Xc(i), l.childLanes = Kc(
          e,
          y,
          i
        ), t.memoizedState = Gc, t = Tl(null, l));
      else if (Qa(t), Rd(E)) {
        if (y = E.nextSibling && E.nextSibling.dataset, y) var F = y.dgst;
        y = F, l = Error(s(419)), l.stack = "", l.digest = y, fl({ value: l, source: null, stack: null }), t = Pc(
          e,
          t,
          i
        );
      } else if (zt || mr(e, t, i, !1), y = (i & e.childLanes) !== 0, zt || y) {
        if (y = dt, y !== null && (l = M(y, i), l !== 0 && l !== D.retryLane))
          throw D.retryLane = l, Ai(e, l), gn(y, e, l), Yc;
        Ad(E) || bo(), t = Pc(
          e,
          t,
          i
        );
      } else
        Ad(E) ? (t.flags |= 192, t.child = e.child, t = null) : (e = D.treeContext, pt = qn(
          E.nextSibling
        ), Jt = t, Ke = !0, Ia = null, Bn = !1, e !== null && Um(t, e), t = Qc(
          t,
          l.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (Pa(), E = l.fallback, u = t.mode, D = e.child, F = D.sibling, l = ba(D, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = D.subtreeFlags & 65011712, F !== null ? E = ba(
      F,
      E
    ) : (E = Ri(
      E,
      u,
      i,
      null
    ), E.flags |= 2), E.return = t, l.return = t, l.sibling = E, t.child = l, Tl(null, l), l = t.child, E = e.child.memoizedState, E === null ? E = Xc(i) : (u = E.cachePool, u !== null ? (D = _t._currentValue, u = u.parent !== D ? { parent: D, pool: D } : u) : u = $m(), E = {
      baseLanes: E.baseLanes | i,
      cachePool: u
    }), l.memoizedState = E, l.childLanes = Kc(
      e,
      y,
      i
    ), t.memoizedState = Gc, Tl(e.child, l)) : (Qa(t), i = e.child, e = i.sibling, i = ba(i, {
      mode: "visible",
      children: l.children
    }), i.return = t, i.sibling = null, e !== null && (y = t.deletions, y === null ? (t.deletions = [e], t.flags |= 16) : y.push(e)), t.child = i, t.memoizedState = null, i);
  }
  function Qc(e, t) {
    return t = uo(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function uo(e, t) {
    return e = wn(22, e, null, t), e.lanes = 0, e;
  }
  function Pc(e, t, i) {
    return ki(t, e.child, null, i), e = Qc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function tg(e, t, i) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), dc(e.return, t, i);
  }
  function Zc(e, t, i, l, u, d) {
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
  function ng(e, t, i) {
    var l = t.pendingProps, u = l.revealOrder, d = l.tail;
    l = l.children;
    var y = jt.current, E = (y & 2) !== 0;
    if (E ? (y = y & 1 | 2, t.flags |= 128) : y &= 1, Z(jt, y), en(e, t, l, i), l = Ke ? dl : 0, !E && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && tg(e, i, t);
        else if (e.tag === 19)
          tg(e, i, t);
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
        i = u, i === null ? (u = t.child, t.child = null) : (u = i.sibling, i.sibling = null), Zc(
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
        Zc(
          t,
          !0,
          i,
          null,
          d,
          l
        );
        break;
      case "together":
        Zc(
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
  function ja(e, t, i) {
    if (e !== null && (t.dependencies = e.dependencies), Wa |= t.lanes, (i & t.childLanes) === 0)
      if (e !== null) {
        if (mr(
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
  function Jc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Is(e)));
  }
  function sw(e, t, i) {
    switch (t.tag) {
      case 3:
        _e(t, t.stateNode.containerInfo), Fa(t, _t, e.memoizedState.cache), _i();
        break;
      case 27:
      case 5:
        kt(t);
        break;
      case 4:
        _e(t, t.stateNode.containerInfo);
        break;
      case 10:
        Fa(
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
          return l.dehydrated !== null ? (Qa(t), t.flags |= 128, null) : (i & t.child.childLanes) !== 0 ? eg(e, t, i) : (Qa(t), e = ja(
            e,
            t,
            i
          ), e !== null ? e.sibling : null);
        Qa(t);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (l = (i & t.childLanes) !== 0, l || (mr(
          e,
          t,
          i,
          !1
        ), l = (i & t.childLanes) !== 0), u) {
          if (l)
            return ng(
              e,
              t,
              i
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), Z(jt, jt.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, Kp(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        Fa(t, _t, e.memoizedState.cache);
    }
    return ja(e, t, i);
  }
  function ag(e, t, i) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        zt = !0;
      else {
        if (!Jc(e, i) && (t.flags & 128) === 0)
          return zt = !1, sw(
            e,
            t,
            i
          );
        zt = (e.flags & 131072) !== 0;
      }
    else
      zt = !1, Ke && (t.flags & 1048576) !== 0 && Lm(t, dl, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = Li(t.elementType), t.type = e, typeof e == "function")
            ac(e) ? (l = Bi(e, l), t.tag = 1, t = Jp(
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
                t.tag = 11, t = Fp(
                  null,
                  t,
                  e,
                  l,
                  i
                );
                break e;
              } else if (u === W) {
                t.tag = 14, t = Gp(
                  null,
                  t,
                  e,
                  l,
                  i
                );
                break e;
              }
            }
            throw t = ge(e) || e, Error(s(306, t, ""));
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
        return l = t.type, u = Bi(
          l,
          t.pendingProps
        ), Jp(
          e,
          t,
          l,
          u,
          i
        );
      case 3:
        e: {
          if (_e(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(s(387));
          l = t.pendingProps;
          var d = t.memoizedState;
          u = d.element, yc(e, t), bl(t, l, null, i);
          var y = t.memoizedState;
          if (l = y.cache, Fa(t, _t, l), l !== d.cache && fc(
            t,
            [_t],
            i,
            !0
          ), yl(), l = y.element, d.isDehydrated)
            if (d = {
              element: l,
              isDehydrated: !1,
              cache: y.cache
            }, t.updateQueue.baseState = d, t.memoizedState = d, t.flags & 256) {
              t = Wp(
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
              ), fl(u), t = Wp(
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
              for (pt = qn(e.firstChild), Jt = t, Ke = !0, Ia = null, Bn = !0, i = Km(
                t,
                null,
                l,
                i
              ), t.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (_i(), l === u) {
              t = ja(
                e,
                t,
                i
              );
              break e;
            }
            en(e, t, l, i);
          }
          t = t.child;
        }
        return t;
      case 26:
        return oo(e, t), e === null ? (i = mv(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = i : Ke || (i = t.type, e = t.pendingProps, l = Co(
          ve.current
        ).createElement(i), l[he] = t, l[pe] = e, tn(l, i, e), ht(l), t.stateNode = l) : t.memoizedState = mv(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return kt(t), e === null && Ke && (l = t.stateNode = dv(
          t.type,
          t.pendingProps,
          ve.current
        ), Jt = t, Bn = !0, u = pt, ii(t.type) ? (_d = u, pt = qn(l.firstChild)) : pt = u), en(
          e,
          t,
          t.pendingProps.children,
          i
        ), oo(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Ke && ((u = l = pt) && (l = kw(
          l,
          t.type,
          t.pendingProps,
          Bn
        ), l !== null ? (t.stateNode = l, Jt = t, pt = qn(l.firstChild), Bn = !1, u = !0) : u = !1), u || Ya(t)), kt(t), u = t.type, d = t.pendingProps, y = e !== null ? e.memoizedProps : null, l = d.children, Cd(u, d) ? l = null : y !== null && Cd(u, y) && (t.flags |= 32), t.memoizedState !== null && (u = jc(
          e,
          t,
          JS,
          null,
          null,
          i
        ), Bl._currentValue = u), oo(e, t), en(e, t, l, i), t.child;
      case 6:
        return e === null && Ke && ((e = i = pt) && (i = Vw(
          i,
          t.pendingProps,
          Bn
        ), i !== null ? (t.stateNode = i, Jt = t, pt = null, e = !0) : e = !1), e || Ya(t)), null;
      case 13:
        return eg(e, t, i);
      case 4:
        return _e(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = ki(
          t,
          null,
          l,
          i
        ) : en(e, t, l, i), t.child;
      case 11:
        return Fp(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 7:
        return en(
          e,
          t,
          t.pendingProps,
          i
        ), t.child;
      case 8:
        return en(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 12:
        return en(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 10:
        return l = t.pendingProps, Fa(t, t.type, l.value), en(e, t, l.children, i), t.child;
      case 9:
        return u = t.type._context, l = t.pendingProps.children, zi(t), u = Wt(u), l = l(u), t.flags |= 1, en(e, t, l, i), t.child;
      case 14:
        return Gp(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 15:
        return Xp(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 19:
        return ng(e, t, i);
      case 31:
        return lw(e, t, i);
      case 22:
        return Kp(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        return zi(t), l = Wt(_t), e === null ? (u = pc(), u === null && (u = dt, d = hc(), u.pooledCache = d, d.refCount++, d !== null && (u.pooledCacheLanes |= i), u = d), t.memoizedState = { parent: l, cache: u }, vc(t), Fa(t, _t, u)) : ((e.lanes & i) !== 0 && (yc(e, t), bl(t, null, null, i), yl()), u = e.memoizedState, d = t.memoizedState, u.parent !== l ? (u = { parent: l, cache: l }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), Fa(t, _t, l)) : (l = d.cache, Fa(t, _t, l), l !== u.cache && fc(
          t,
          [_t],
          i,
          !0
        ))), en(
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
  function Wc(e, t, i, l, u) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Rg()) e.flags |= 8192;
        else
          throw Ui = Xs, gc;
    } else e.flags &= -16777217;
  }
  function ig(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !bv(t))
      if (Rg()) e.flags |= 8192;
      else
        throw Ui = Xs, gc;
  }
  function co(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? It() : 536870912, e.lanes |= t, Cr |= t);
  }
  function jl(e, t) {
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
  function ow(e, t, i) {
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
        return i = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), wa(_t), Be(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (hr(t) ? Ca(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, uc())), gt(t), null;
      case 26:
        var u = t.type, d = t.memoizedState;
        return e === null ? (Ca(t), d !== null ? (gt(t), ig(t, d)) : (gt(t), Wc(
          t,
          u,
          null,
          l,
          i
        ))) : d ? d !== e.memoizedState ? (Ca(t), gt(t), ig(t, d)) : (gt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && Ca(t), gt(t), Wc(
          t,
          u,
          e,
          l,
          i
        )), null;
      case 27:
        if (Ft(t), i = ve.current, u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Ca(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(s(166));
            return gt(t), null;
          }
          e = le.current, hr(t) ? km(t) : (e = dv(u, l, i), t.stateNode = e, Ca(t));
        }
        return gt(t), null;
      case 5:
        if (Ft(t), u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Ca(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(s(166));
            return gt(t), null;
          }
          if (d = le.current, hr(t))
            km(t);
          else {
            var y = Co(
              ve.current
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
            d[he] = t, d[pe] = l;
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
            e: switch (tn(d, u, l), u) {
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
        return gt(t), Wc(
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
          if (e = ve.current, hr(t)) {
            if (e = t.stateNode, i = t.memoizedProps, l = null, u = Jt, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  l = u.memoizedProps;
              }
            e[he] = t, e = !!(e.nodeValue === i || l !== null && l.suppressHydrationWarning === !0 || ev(e.nodeValue, i)), e || Ya(t, !0);
          } else
            e = Co(e).createTextNode(
              l
            ), e[he] = t, t.stateNode = e;
        }
        return gt(t), null;
      case 31:
        if (i = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = hr(t), i !== null) {
            if (e === null) {
              if (!l) throw Error(s(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(557));
              e[he] = t;
            } else
              _i(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            gt(t), e = !1;
          } else
            i = uc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), e = !0;
          if (!e)
            return t.flags & 256 ? (Tn(t), t) : (Tn(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(s(558));
        }
        return gt(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (u = hr(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(s(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[he] = t;
            } else
              _i(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            gt(t), u = !1;
          } else
            u = uc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (Tn(t), t) : (Tn(t), null);
        }
        return Tn(t), (t.flags & 128) !== 0 ? (t.lanes = i, t) : (i = l !== null, e = e !== null && e.memoizedState !== null, i && (l = t.child, u = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (u = l.alternate.memoizedState.cachePool.pool), d = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (d = l.memoizedState.cachePool.pool), d !== u && (l.flags |= 2048)), i !== e && i && (t.child.flags |= 8192), co(t, t.updateQueue), gt(t), null);
      case 4:
        return Be(), e === null && Sd(t.stateNode.containerInfo), gt(t), null;
      case 10:
        return wa(t.type), gt(t), null;
      case 19:
        if (K(jt), l = t.memoizedState, l === null) return gt(t), null;
        if (u = (t.flags & 128) !== 0, d = l.rendering, d === null)
          if (u) jl(l, !1);
          else {
            if (wt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (d = Zs(e), d !== null) {
                  for (t.flags |= 128, jl(l, !1), e = d.updateQueue, t.updateQueue = e, co(t, e), t.subtreeFlags = 0, e = i, i = t.child; i !== null; )
                    Dm(i, e), i = i.sibling;
                  return Z(
                    jt,
                    jt.current & 1 | 2
                  ), Ke && xa(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && Bt() > go && (t.flags |= 128, u = !0, jl(l, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = Zs(d), e !== null) {
              if (t.flags |= 128, u = !0, e = e.updateQueue, t.updateQueue = e, co(t, e), jl(l, !0), l.tail === null && l.tailMode === "hidden" && !d.alternate && !Ke)
                return gt(t), null;
            } else
              2 * Bt() - l.renderingStartTime > go && i !== 536870912 && (t.flags |= 128, u = !0, jl(l, !1), t.lanes = 4194304);
          l.isBackwards ? (d.sibling = t.child, t.child = d) : (e = l.last, e !== null ? e.sibling = d : t.child = d, l.last = d);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = Bt(), e.sibling = null, i = jt.current, Z(
          jt,
          u ? i & 1 | 2 : i & 1
        ), Ke && xa(t, l.treeForkCount), e) : (gt(t), null);
      case 22:
      case 23:
        return Tn(t), wc(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (i & 536870912) !== 0 && (t.flags & 128) === 0 && (gt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : gt(t), i = t.updateQueue, i !== null && co(t, i.retryQueue), i = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== i && (t.flags |= 2048), e !== null && K(Oi), null;
      case 24:
        return i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), wa(_t), gt(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function uw(e, t) {
    switch (sc(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return wa(_t), Be(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Ft(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Tn(t), t.alternate === null)
            throw Error(s(340));
          _i();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Tn(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(s(340));
          _i();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return K(jt), null;
      case 4:
        return Be(), null;
      case 10:
        return wa(t.type), null;
      case 22:
      case 23:
        return Tn(t), wc(), e !== null && K(Oi), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return wa(_t), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function rg(e, t) {
    switch (sc(t), t.tag) {
      case 3:
        wa(_t), Be();
        break;
      case 26:
      case 27:
      case 5:
        Ft(t);
        break;
      case 4:
        Be();
        break;
      case 31:
        t.memoizedState !== null && Tn(t);
        break;
      case 13:
        Tn(t);
        break;
      case 19:
        K(jt);
        break;
      case 10:
        wa(t.type);
        break;
      case 22:
      case 23:
        Tn(t), wc(), e !== null && K(Oi);
        break;
      case 24:
        wa(_t);
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
  function Za(e, t, i) {
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
                nt(
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
      nt(t, t.return, ee);
    }
  }
  function lg(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var i = e.stateNode;
      try {
        Pm(t, i);
      } catch (l) {
        nt(e, e.return, l);
      }
    }
  }
  function sg(e, t, i) {
    i.props = Bi(
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
  function ca(e, t) {
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
  function og(e) {
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
  function ed(e, t, i) {
    try {
      var l = e.stateNode;
      _w(l, e.type, i, t), l[pe] = t;
    } catch (u) {
      nt(e, e.return, u);
    }
  }
  function ug(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ii(e.type) || e.tag === 4;
  }
  function td(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || ug(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && ii(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function nd(e, t, i) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(e, t) : (t = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, t.appendChild(e), i = i._reactRootContainer, i != null || t.onclick !== null || (t.onclick = va));
    else if (l !== 4 && (l === 27 && ii(e.type) && (i = e.stateNode, t = null), e = e.child, e !== null))
      for (nd(e, t, i), e = e.sibling; e !== null; )
        nd(e, t, i), e = e.sibling;
  }
  function fo(e, t, i) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? i.insertBefore(e, t) : i.appendChild(e);
    else if (l !== 4 && (l === 27 && ii(e.type) && (i = e.stateNode), e = e.child, e !== null))
      for (fo(e, t, i), e = e.sibling; e !== null; )
        fo(e, t, i), e = e.sibling;
  }
  function cg(e) {
    var t = e.stateNode, i = e.memoizedProps;
    try {
      for (var l = e.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      tn(t, l, i), t[he] = e, t[pe] = i;
    } catch (d) {
      nt(e, e.return, d);
    }
  }
  var Na = !1, Ot = !1, ad = !1, dg = typeof WeakSet == "function" ? WeakSet : Set, Xt = null;
  function cw(e, t) {
    if (e = e.containerInfo, Td = zo, e = Em(e), Pu(e)) {
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
            var y = 0, E = -1, D = -1, F = 0, ee = 0, ie = e, X = null;
            t: for (; ; ) {
              for (var P; ie !== i || u !== 0 && ie.nodeType !== 3 || (E = y + u), ie !== d || l !== 0 && ie.nodeType !== 3 || (D = y + l), ie.nodeType === 3 && (y += ie.nodeValue.length), (P = ie.firstChild) !== null; )
                X = ie, ie = P;
              for (; ; ) {
                if (ie === e) break t;
                if (X === i && ++F === u && (E = y), X === d && ++ee === l && (D = y), (P = ie.nextSibling) !== null) break;
                ie = X, X = ie.parentNode;
              }
              ie = P;
            }
            i = E === -1 || D === -1 ? null : { start: E, end: D };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (jd = { focusedElem: e, selectionRange: i }, zo = !1, Xt = t; Xt !== null; )
      if (t = Xt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Xt = e;
      else
        for (; Xt !== null; ) {
          switch (t = Xt, d = t.alternate, e = t.flags, t.tag) {
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
                  var xe = Bi(
                    i.type,
                    u
                  );
                  e = l.getSnapshotBeforeUpdate(
                    xe,
                    d
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (De) {
                  nt(
                    i,
                    i.return,
                    De
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
            e.return = t.return, Xt = e;
            break;
          }
          Xt = t.return;
        }
  }
  function fg(e, t, i) {
    var l = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        Aa(e, i), l & 4 && Cl(5, i);
        break;
      case 1:
        if (Aa(e, i), l & 4)
          if (e = i.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (y) {
              nt(i, i.return, y);
            }
          else {
            var u = Bi(
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
        l & 64 && lg(i), l & 512 && Nl(i, i.return);
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
            Pm(e, t);
          } catch (y) {
            nt(i, i.return, y);
          }
        }
        break;
      case 27:
        t === null && l & 4 && cg(i);
      case 26:
      case 5:
        Aa(e, i), t === null && l & 4 && og(i), l & 512 && Nl(i, i.return);
        break;
      case 12:
        Aa(e, i);
        break;
      case 31:
        Aa(e, i), l & 4 && pg(e, i);
        break;
      case 13:
        Aa(e, i), l & 4 && gg(e, i), l & 64 && (e = i.memoizedState, e !== null && (e = e.dehydrated, e !== null && (i = bw.bind(
          null,
          i
        ), Bw(e, i))));
        break;
      case 22:
        if (l = i.memoizedState !== null || Na, !l) {
          t = t !== null && t.memoizedState !== null || Ot, u = Na;
          var d = Ot;
          Na = l, (Ot = t) && !d ? Ra(
            e,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : Aa(e, i), Na = u, Ot = d;
        }
        break;
      case 30:
        break;
      default:
        Aa(e, i);
    }
  }
  function hg(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, hg(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ct(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var yt = null, fn = !1;
  function Ma(e, t, i) {
    for (i = i.child; i !== null; )
      mg(e, t, i), i = i.sibling;
  }
  function mg(e, t, i) {
    if (Pt && typeof Pt.onCommitFiberUnmount == "function")
      try {
        Pt.onCommitFiberUnmount(Qn, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        Ot || ca(i, t), Ma(
          e,
          t,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        Ot || ca(i, t);
        var l = yt, u = fn;
        ii(i.type) && (yt = i.stateNode, fn = !1), Ma(
          e,
          t,
          i
        ), Ul(i.stateNode), yt = l, fn = u;
        break;
      case 5:
        Ot || ca(i, t);
      case 6:
        if (l = yt, u = fn, yt = null, Ma(
          e,
          t,
          i
        ), yt = l, fn = u, yt !== null)
          if (fn)
            try {
              (yt.nodeType === 9 ? yt.body : yt.nodeName === "HTML" ? yt.ownerDocument.body : yt).removeChild(i.stateNode);
            } catch (d) {
              nt(
                i,
                t,
                d
              );
            }
          else
            try {
              yt.removeChild(i.stateNode);
            } catch (d) {
              nt(
                i,
                t,
                d
              );
            }
        break;
      case 18:
        yt !== null && (fn ? (e = yt, lv(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          i.stateNode
        ), Or(e)) : lv(yt, i.stateNode));
        break;
      case 4:
        l = yt, u = fn, yt = i.stateNode.containerInfo, fn = !0, Ma(
          e,
          t,
          i
        ), yt = l, fn = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Za(2, i, t), Ot || Za(4, i, t), Ma(
          e,
          t,
          i
        );
        break;
      case 1:
        Ot || (ca(i, t), l = i.stateNode, typeof l.componentWillUnmount == "function" && sg(
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
        Ot = (l = Ot) || i.memoizedState !== null, Ma(
          e,
          t,
          i
        ), Ot = l;
        break;
      default:
        Ma(
          e,
          t,
          i
        );
    }
  }
  function pg(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Or(e);
      } catch (i) {
        nt(t, t.return, i);
      }
    }
  }
  function gg(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Or(e);
      } catch (i) {
        nt(t, t.return, i);
      }
  }
  function dw(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new dg()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new dg()), t;
      default:
        throw Error(s(435, e.tag));
    }
  }
  function ho(e, t) {
    var i = dw(e);
    t.forEach(function(l) {
      if (!i.has(l)) {
        i.add(l);
        var u = xw.bind(null, e, l);
        l.then(u, u);
      }
    });
  }
  function hn(e, t) {
    var i = t.deletions;
    if (i !== null)
      for (var l = 0; l < i.length; l++) {
        var u = i[l], d = e, y = t, E = y;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (ii(E.type)) {
                yt = E.stateNode, fn = !1;
                break e;
              }
              break;
            case 5:
              yt = E.stateNode, fn = !1;
              break e;
            case 3:
            case 4:
              yt = E.stateNode.containerInfo, fn = !0;
              break e;
          }
          E = E.return;
        }
        if (yt === null) throw Error(s(160));
        mg(d, y, u), yt = null, fn = !1, d = u.alternate, d !== null && (d.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        vg(t, e), t = t.sibling;
  }
  var Wn = null;
  function vg(e, t) {
    var i = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        hn(t, e), mn(e), l & 4 && (Za(3, e, e.return), Cl(3, e), Za(5, e, e.return));
        break;
      case 1:
        hn(t, e), mn(e), l & 512 && (Ot || i === null || ca(i, i.return)), l & 64 && Na && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (i = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = i === null ? l : i.concat(l))));
        break;
      case 26:
        var u = Wn;
        if (hn(t, e), mn(e), l & 512 && (Ot || i === null || ca(i, i.return)), l & 4) {
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
                      )), tn(d, l, i), d[he] = e, ht(d), l = d;
                      break e;
                    case "link":
                      var y = vv(
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
                      d = u.createElement(l), tn(d, l, i), u.head.appendChild(d);
                      break;
                    case "meta":
                      if (y = vv(
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
                      d = u.createElement(l), tn(d, l, i), u.head.appendChild(d);
                      break;
                    default:
                      throw Error(s(468, l));
                  }
                  d[he] = e, ht(d), l = d;
                }
                e.stateNode = l;
              } else
                yv(
                  u,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = gv(
                u,
                l,
                e.memoizedProps
              );
          else
            d !== l ? (d === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : d.count--, l === null ? yv(
              u,
              e.type,
              e.stateNode
            ) : gv(
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
        hn(t, e), mn(e), l & 512 && (Ot || i === null || ca(i, i.return)), i !== null && l & 4 && ed(
          e,
          e.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (hn(t, e), mn(e), l & 512 && (Ot || i === null || ca(i, i.return)), e.flags & 32) {
          u = e.stateNode;
          try {
            ar(u, "");
          } catch (xe) {
            nt(e, e.return, xe);
          }
        }
        l & 4 && e.stateNode != null && (u = e.memoizedProps, ed(
          e,
          u,
          i !== null ? i.memoizedProps : u
        )), l & 1024 && (ad = !0);
        break;
      case 6:
        if (hn(t, e), mn(e), l & 4) {
          if (e.stateNode === null)
            throw Error(s(162));
          l = e.memoizedProps, i = e.stateNode;
          try {
            i.nodeValue = l;
          } catch (xe) {
            nt(e, e.return, xe);
          }
        }
        break;
      case 3:
        if (Ao = null, u = Wn, Wn = No(t.containerInfo), hn(t, e), Wn = u, mn(e), l & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            Or(t.containerInfo);
          } catch (xe) {
            nt(e, e.return, xe);
          }
        ad && (ad = !1, yg(e));
        break;
      case 4:
        l = Wn, Wn = No(
          e.stateNode.containerInfo
        ), hn(t, e), mn(e), Wn = l;
        break;
      case 12:
        hn(t, e), mn(e);
        break;
      case 31:
        hn(t, e), mn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, ho(e, l)));
        break;
      case 13:
        hn(t, e), mn(e), e.child.flags & 8192 && e.memoizedState !== null != (i !== null && i.memoizedState !== null) && (po = Bt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, ho(e, l)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var D = i !== null && i.memoizedState !== null, F = Na, ee = Ot;
        if (Na = F || u, Ot = ee || D, hn(t, e), Ot = ee, Na = F, mn(e), l & 8192)
          e: for (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (i === null || D || Na || Ot || Hi(e)), i = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (i === null) {
                D = i = t;
                try {
                  if (d = D.stateNode, u)
                    y = d.style, typeof y.setProperty == "function" ? y.setProperty("display", "none", "important") : y.display = "none";
                  else {
                    E = D.stateNode;
                    var ie = D.memoizedProps.style, X = ie != null && ie.hasOwnProperty("display") ? ie.display : null;
                    E.style.display = X == null || typeof X == "boolean" ? "" : ("" + X).trim();
                  }
                } catch (xe) {
                  nt(D, D.return, xe);
                }
              }
            } else if (t.tag === 6) {
              if (i === null) {
                D = t;
                try {
                  D.stateNode.nodeValue = u ? "" : D.memoizedProps;
                } catch (xe) {
                  nt(D, D.return, xe);
                }
              }
            } else if (t.tag === 18) {
              if (i === null) {
                D = t;
                try {
                  var P = D.stateNode;
                  u ? sv(P, !0) : sv(D.stateNode, !1);
                } catch (xe) {
                  nt(D, D.return, xe);
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
        l & 4 && (l = e.updateQueue, l !== null && (i = l.retryQueue, i !== null && (l.retryQueue = null, ho(e, i))));
        break;
      case 19:
        hn(t, e), mn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, ho(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        hn(t, e), mn(e);
    }
  }
  function mn(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var i, l = e.return; l !== null; ) {
          if (ug(l)) {
            i = l;
            break;
          }
          l = l.return;
        }
        if (i == null) throw Error(s(160));
        switch (i.tag) {
          case 27:
            var u = i.stateNode, d = td(e);
            fo(e, d, u);
            break;
          case 5:
            var y = i.stateNode;
            i.flags & 32 && (ar(y, ""), i.flags &= -33);
            var E = td(e);
            fo(e, E, y);
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
        nt(e, e.return, ee);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function yg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        yg(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Aa(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        fg(e, t.alternate, t), t = t.sibling;
  }
  function Hi(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Za(4, t, t.return), Hi(t);
          break;
        case 1:
          ca(t, t.return);
          var i = t.stateNode;
          typeof i.componentWillUnmount == "function" && sg(
            t,
            t.return,
            i
          ), Hi(t);
          break;
        case 27:
          Ul(t.stateNode);
        case 26:
        case 5:
          ca(t, t.return), Hi(t);
          break;
        case 22:
          t.memoizedState === null && Hi(t);
          break;
        case 30:
          Hi(t);
          break;
        default:
          Hi(t);
      }
      e = e.sibling;
    }
  }
  function Ra(e, t, i) {
    for (i = i && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate, u = e, d = t, y = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          Ra(
            u,
            d,
            i
          ), Cl(4, d);
          break;
        case 1:
          if (Ra(
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
              var D = u.shared.hiddenCallbacks;
              if (D !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < D.length; u++)
                  Qm(D[u], E);
            } catch (F) {
              nt(l, l.return, F);
            }
          }
          i && y & 64 && lg(d), Nl(d, d.return);
          break;
        case 27:
          cg(d);
        case 26:
        case 5:
          Ra(
            u,
            d,
            i
          ), i && l === null && y & 4 && og(d), Nl(d, d.return);
          break;
        case 12:
          Ra(
            u,
            d,
            i
          );
          break;
        case 31:
          Ra(
            u,
            d,
            i
          ), i && y & 4 && pg(u, d);
          break;
        case 13:
          Ra(
            u,
            d,
            i
          ), i && y & 4 && gg(u, d);
          break;
        case 22:
          d.memoizedState === null && Ra(
            u,
            d,
            i
          ), Nl(d, d.return);
          break;
        case 30:
          break;
        default:
          Ra(
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
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== i && (e != null && e.refCount++, i != null && hl(i));
  }
  function rd(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && hl(e));
  }
  function ea(e, t, i, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        bg(
          e,
          t,
          i,
          l
        ), t = t.sibling;
  }
  function bg(e, t, i, l) {
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
        ), u & 2048 && Cl(9, t);
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
        ), u & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && hl(e)));
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
            nt(t, t.return, D);
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
        ) : Ml(e, t) : d._visibility & 2 ? ea(
          e,
          t,
          i,
          l
        ) : (d._visibility |= 2, Er(
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
  function Er(e, t, i, l, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var d = e, y = t, E = i, D = l, F = y.flags;
      switch (y.tag) {
        case 0:
        case 11:
        case 15:
          Er(
            d,
            y,
            E,
            D,
            u
          ), Cl(8, y);
          break;
        case 23:
          break;
        case 22:
          var ee = y.stateNode;
          y.memoizedState !== null ? ee._visibility & 2 ? Er(
            d,
            y,
            E,
            D,
            u
          ) : Ml(
            d,
            y
          ) : (ee._visibility |= 2, Er(
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
          Er(
            d,
            y,
            E,
            D,
            u
          ), u && F & 2048 && rd(y.alternate, y);
          break;
        default:
          Er(
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
  function Ml(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var i = e, l = t, u = l.flags;
        switch (l.tag) {
          case 22:
            Ml(i, l), u & 2048 && id(
              l.alternate,
              l
            );
            break;
          case 24:
            Ml(i, l), u & 2048 && rd(l.alternate, l);
            break;
          default:
            Ml(i, l);
        }
        t = t.sibling;
      }
  }
  var Al = 8192;
  function Tr(e, t, i) {
    if (e.subtreeFlags & Al)
      for (e = e.child; e !== null; )
        xg(
          e,
          t,
          i
        ), e = e.sibling;
  }
  function xg(e, t, i) {
    switch (e.tag) {
      case 26:
        Tr(
          e,
          t,
          i
        ), e.flags & Al && e.memoizedState !== null && Zw(
          i,
          Wn,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Tr(
          e,
          t,
          i
        );
        break;
      case 3:
      case 4:
        var l = Wn;
        Wn = No(e.stateNode.containerInfo), Tr(
          e,
          t,
          i
        ), Wn = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = Al, Al = 16777216, Tr(
          e,
          t,
          i
        ), Al = l) : Tr(
          e,
          t,
          i
        ));
        break;
      default:
        Tr(
          e,
          t,
          i
        );
    }
  }
  function Sg(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Rl(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var l = t[i];
          Xt = l, Eg(
            l,
            e
          );
        }
      Sg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        wg(e), e = e.sibling;
  }
  function wg(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Rl(e), e.flags & 2048 && Za(9, e, e.return);
        break;
      case 3:
        Rl(e);
        break;
      case 12:
        Rl(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, mo(e)) : Rl(e);
        break;
      default:
        Rl(e);
    }
  }
  function mo(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var l = t[i];
          Xt = l, Eg(
            l,
            e
          );
        }
      Sg(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Za(8, t, t.return), mo(t);
          break;
        case 22:
          i = t.stateNode, i._visibility & 2 && (i._visibility &= -3, mo(t));
          break;
        default:
          mo(t);
      }
      e = e.sibling;
    }
  }
  function Eg(e, t) {
    for (; Xt !== null; ) {
      var i = Xt;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Za(8, i, t);
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
      if (l = i.child, l !== null) l.return = i, Xt = l;
      else
        e: for (i = e; Xt !== null; ) {
          l = Xt;
          var u = l.sibling, d = l.return;
          if (hg(l), l === i) {
            Xt = null;
            break e;
          }
          if (u !== null) {
            u.return = d, Xt = u;
            break e;
          }
          Xt = d;
        }
    }
  }
  var fw = {
    getCacheForType: function(e) {
      var t = Wt(_t), i = t.data.get(e);
      return i === void 0 && (i = e(), t.data.set(e, i)), i;
    },
    cacheSignal: function() {
      return Wt(_t).controller.signal;
    }
  }, hw = typeof WeakMap == "function" ? WeakMap : Map, We = 0, dt = null, Ye = null, Ge = 0, tt = 0, jn = null, Ja = !1, jr = !1, ld = !1, _a = 0, wt = 0, Wa = 0, qi = 0, sd = 0, Cn = 0, Cr = 0, _l = null, pn = null, od = !1, po = 0, Tg = 0, go = 1 / 0, vo = null, ei = null, Yt = 0, ti = null, Nr = null, Da = 0, ud = 0, cd = null, jg = null, Dl = 0, dd = null;
  function Nn() {
    return (We & 2) !== 0 && Ge !== 0 ? Ge & -Ge : U.T !== null ? vd() : se();
  }
  function Cg() {
    if (Cn === 0)
      if ((Ge & 536870912) === 0 || Ke) {
        var e = Pn;
        Pn <<= 1, (Pn & 3932160) === 0 && (Pn = 262144), Cn = e;
      } else Cn = 536870912;
    return e = En.current, e !== null && (e.flags |= 32), Cn;
  }
  function gn(e, t, i) {
    (e === dt && (tt === 2 || tt === 9) || e.cancelPendingCommit !== null) && (Mr(e, 0), ni(
      e,
      Ge,
      Cn,
      !1
    )), it(e, i), ((We & 2) === 0 || e !== dt) && (e === dt && ((We & 2) === 0 && (qi |= i), wt === 4 && ni(
      e,
      Ge,
      Cn,
      !1
    )), da(e));
  }
  function Ng(e, t, i) {
    if ((We & 6) !== 0) throw Error(s(327));
    var l = !i && (t & 127) === 0 && (t & e.expiredLanes) === 0 || ut(e, t), u = l ? gw(e, t) : hd(e, t, !0), d = l;
    do {
      if (u === 0) {
        jr && !l && ni(e, t, 0, !1);
        break;
      } else {
        if (i = e.current.alternate, d && !mw(i)) {
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
              u = _l;
              var D = E.current.memoizedState.isDehydrated;
              if (D && (Mr(E, y).flags |= 256), y = hd(
                E,
                y,
                !1
              ), y !== 2) {
                if (ld && !D) {
                  E.errorRecoveryDisabledLanes |= d, qi |= d, u = 4;
                  break e;
                }
                d = pn, pn = u, d !== null && (pn === null ? pn = d : pn.push.apply(
                  pn,
                  d
                ));
              }
              u = y;
            }
            if (d = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Mr(e, 0), ni(e, t, 0, !0);
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
              ni(
                l,
                t,
                Cn,
                !Ja
              );
              break e;
            case 2:
              pn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && (u = po + 300 - Bt(), 10 < u)) {
            if (ni(
              l,
              t,
              Cn,
              !Ja
            ), Le(l, 0, !0) !== 0) break e;
            Da = t, l.timeoutHandle = iv(
              Mg.bind(
                null,
                l,
                i,
                pn,
                vo,
                od,
                t,
                Cn,
                qi,
                Cr,
                Ja,
                d,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break e;
          }
          Mg(
            l,
            i,
            pn,
            vo,
            od,
            t,
            Cn,
            qi,
            Cr,
            Ja,
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
  function Mg(e, t, i, l, u, d, y, E, D, F, ee, ie, X, P) {
    if (e.timeoutHandle = -1, ie = t.subtreeFlags, ie & 8192 || (ie & 16785408) === 16785408) {
      ie = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: va
      }, xg(
        t,
        d,
        ie
      );
      var xe = (d & 62914560) === d ? po - Bt() : (d & 4194048) === d ? Tg - Bt() : 0;
      if (xe = Jw(
        ie,
        xe
      ), xe !== null) {
        Da = d, e.cancelPendingCommit = xe(
          Ug.bind(
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
            ie,
            null,
            X,
            P
          )
        ), ni(e, d, y, !F);
        return;
      }
    }
    Ug(
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
  function mw(e) {
    for (var t = e; ; ) {
      var i = t.tag;
      if ((i === 0 || i === 11 || i === 15) && t.flags & 16384 && (i = t.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var l = 0; l < i.length; l++) {
          var u = i[l], d = u.getSnapshot;
          u = u.value;
          try {
            if (!Sn(d(), u)) return !1;
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
  function ni(e, t, i, l) {
    t &= ~sd, t &= ~qi, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var u = t; 0 < u; ) {
      var d = 31 - $t(u), y = 1 << d;
      l[d] = -1, u &= ~y;
    }
    i !== 0 && ga(e, i, t);
  }
  function yo() {
    return (We & 6) === 0 ? (zl(0), !1) : !0;
  }
  function fd() {
    if (Ye !== null) {
      if (tt === 0)
        var e = Ye.return;
      else
        e = Ye, Sa = Di = null, Mc(e), yr = null, pl = 0, e = Ye;
      for (; e !== null; )
        rg(e.alternate, e), e = e.return;
      Ye = null;
    }
  }
  function Mr(e, t) {
    var i = e.timeoutHandle;
    i !== -1 && (e.timeoutHandle = -1, Ow(i)), i = e.cancelPendingCommit, i !== null && (e.cancelPendingCommit = null, i()), Da = 0, fd(), dt = e, Ye = i = ba(e.current, null), Ge = t, tt = 0, jn = null, Ja = !1, jr = ut(e, t), ld = !1, Cr = Cn = sd = qi = Wa = wt = 0, pn = _l = null, od = !1, (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var u = 31 - $t(l), d = 1 << u;
        t |= e[u], l &= ~d;
      }
    return _a = t, Vs(), i;
  }
  function Ag(e, t) {
    ke = null, U.H = El, t === vr || t === Gs ? (t = Fm(), tt = 3) : t === gc ? (t = Fm(), tt = 4) : tt = t === Yc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, jn = t, Ye === null && (wt = 1, lo(
      e,
      Un(t, e.current)
    ));
  }
  function Rg() {
    var e = En.current;
    return e === null ? !0 : (Ge & 4194048) === Ge ? Hn === null : (Ge & 62914560) === Ge || (Ge & 536870912) !== 0 ? e === Hn : !1;
  }
  function _g() {
    var e = U.H;
    return U.H = El, e === null ? El : e;
  }
  function Dg() {
    var e = U.A;
    return U.A = fw, e;
  }
  function bo() {
    wt = 4, Ja || (Ge & 4194048) !== Ge && En.current !== null || (jr = !0), (Wa & 134217727) === 0 && (qi & 134217727) === 0 || dt === null || ni(
      dt,
      Ge,
      Cn,
      !1
    );
  }
  function hd(e, t, i) {
    var l = We;
    We |= 2;
    var u = _g(), d = Dg();
    (dt !== e || Ge !== t) && (vo = null, Mr(e, t)), t = !1;
    var y = wt;
    e: do
      try {
        if (tt !== 0 && Ye !== null) {
          var E = Ye, D = jn;
          switch (tt) {
            case 8:
              fd(), y = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              En.current === null && (t = !0);
              var F = tt;
              if (tt = 0, jn = null, Ar(e, E, D, F), i && jr) {
                y = 0;
                break e;
              }
              break;
            default:
              F = tt, tt = 0, jn = null, Ar(e, E, D, F);
          }
        }
        pw(), y = wt;
        break;
      } catch (ee) {
        Ag(e, ee);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Sa = Di = null, We = l, U.H = u, U.A = d, Ye === null && (dt = null, Ge = 0, Vs()), y;
  }
  function pw() {
    for (; Ye !== null; ) zg(Ye);
  }
  function gw(e, t) {
    var i = We;
    We |= 2;
    var l = _g(), u = Dg();
    dt !== e || Ge !== t ? (vo = null, go = Bt() + 500, Mr(e, t)) : jr = ut(
      e,
      t
    );
    e: do
      try {
        if (tt !== 0 && Ye !== null) {
          t = Ye;
          var d = jn;
          t: switch (tt) {
            case 1:
              tt = 0, jn = null, Ar(e, t, d, 1);
              break;
            case 2:
            case 9:
              if (Im(d)) {
                tt = 0, jn = null, Og(t);
                break;
              }
              t = function() {
                tt !== 2 && tt !== 9 || dt !== e || (tt = 7), da(e);
              }, d.then(t, t);
              break e;
            case 3:
              tt = 7;
              break e;
            case 4:
              tt = 5;
              break e;
            case 7:
              Im(d) ? (tt = 0, jn = null, Og(t)) : (tt = 0, jn = null, Ar(e, t, d, 7));
              break;
            case 5:
              var y = null;
              switch (Ye.tag) {
                case 26:
                  y = Ye.memoizedState;
                case 5:
                case 27:
                  var E = Ye;
                  if (y ? bv(y) : E.stateNode.complete) {
                    tt = 0, jn = null;
                    var D = E.sibling;
                    if (D !== null) Ye = D;
                    else {
                      var F = E.return;
                      F !== null ? (Ye = F, xo(F)) : Ye = null;
                    }
                    break t;
                  }
              }
              tt = 0, jn = null, Ar(e, t, d, 5);
              break;
            case 6:
              tt = 0, jn = null, Ar(e, t, d, 6);
              break;
            case 8:
              fd(), wt = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        vw();
        break;
      } catch (ee) {
        Ag(e, ee);
      }
    while (!0);
    return Sa = Di = null, U.H = l, U.A = u, We = i, Ye !== null ? 0 : (dt = null, Ge = 0, Vs(), wt);
  }
  function vw() {
    for (; Ye !== null && !Vt(); )
      zg(Ye);
  }
  function zg(e) {
    var t = ag(e.alternate, e, _a);
    e.memoizedProps = e.pendingProps, t === null ? xo(e) : Ye = t;
  }
  function Og(e) {
    var t = e, i = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Zp(
          i,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Ge
        );
        break;
      case 11:
        t = Zp(
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
        rg(i, t), t = Ye = Dm(t, _a), t = ag(i, t, _a);
    }
    e.memoizedProps = e.pendingProps, t === null ? xo(e) : Ye = t;
  }
  function Ar(e, t, i, l) {
    Sa = Di = null, Mc(t), yr = null, pl = 0;
    var u = t.return;
    try {
      if (rw(
        e,
        u,
        t,
        i,
        Ge
      )) {
        wt = 1, lo(
          e,
          Un(i, e.current)
        ), Ye = null;
        return;
      }
    } catch (d) {
      if (u !== null) throw Ye = u, d;
      wt = 1, lo(
        e,
        Un(i, e.current)
      ), Ye = null;
      return;
    }
    t.flags & 32768 ? (Ke || l === 1 ? e = !0 : jr || (Ge & 536870912) !== 0 ? e = !1 : (Ja = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = En.current, l !== null && l.tag === 13 && (l.flags |= 16384))), Lg(t, e)) : xo(t);
  }
  function xo(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Lg(
          t,
          Ja
        );
        return;
      }
      e = t.return;
      var i = ow(
        t.alternate,
        t,
        _a
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
  function Lg(e, t) {
    do {
      var i = uw(e.alternate, e);
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
  function Ug(e, t, i, l, u, d, y, E, D) {
    e.cancelPendingCommit = null;
    do
      So();
    while (Yt !== 0);
    if ((We & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (d = t.lanes | t.childLanes, d |= tc, Zt(
        e,
        i,
        d,
        y,
        E,
        D
      ), e === dt && (Ye = dt = null, Ge = 0), Nr = t, ti = e, Da = i, ud = d, cd = u, jg = l, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Sw(et, function() {
        return qg(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
        l = U.T, U.T = null, u = V.p, V.p = 2, y = We, We |= 4;
        try {
          cw(e, t, i);
        } finally {
          We = y, V.p = u, U.T = l;
        }
      }
      Yt = 1, kg(), Vg(), Bg();
    }
  }
  function kg() {
    if (Yt === 1) {
      Yt = 0;
      var e = ti, t = Nr, i = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || i) {
        i = U.T, U.T = null;
        var l = V.p;
        V.p = 2;
        var u = We;
        We |= 4;
        try {
          vg(t, e);
          var d = jd, y = Em(e.containerInfo), E = d.focusedElem, D = d.selectionRange;
          if (y !== E && E && E.ownerDocument && wm(
            E.ownerDocument.documentElement,
            E
          )) {
            if (D !== null && Pu(E)) {
              var F = D.start, ee = D.end;
              if (ee === void 0 && (ee = F), "selectionStart" in E)
                E.selectionStart = F, E.selectionEnd = Math.min(
                  ee,
                  E.value.length
                );
              else {
                var ie = E.ownerDocument || document, X = ie && ie.defaultView || window;
                if (X.getSelection) {
                  var P = X.getSelection(), xe = E.textContent.length, De = Math.min(D.start, xe), ot = D.end === void 0 ? De : Math.min(D.end, xe);
                  !P.extend && De > ot && (y = ot, ot = De, De = y);
                  var H = Sm(
                    E,
                    De
                  ), k = Sm(
                    E,
                    ot
                  );
                  if (H && k && (P.rangeCount !== 1 || P.anchorNode !== H.node || P.anchorOffset !== H.offset || P.focusNode !== k.node || P.focusOffset !== k.offset)) {
                    var Y = ie.createRange();
                    Y.setStart(H.node, H.offset), P.removeAllRanges(), De > ot ? (P.addRange(Y), P.extend(k.node, k.offset)) : (Y.setEnd(k.node, k.offset), P.addRange(Y));
                  }
                }
              }
            }
            for (ie = [], P = E; P = P.parentNode; )
              P.nodeType === 1 && ie.push({
                element: P,
                left: P.scrollLeft,
                top: P.scrollTop
              });
            for (typeof E.focus == "function" && E.focus(), E = 0; E < ie.length; E++) {
              var ne = ie[E];
              ne.element.scrollLeft = ne.left, ne.element.scrollTop = ne.top;
            }
          }
          zo = !!Td, jd = Td = null;
        } finally {
          We = u, V.p = l, U.T = i;
        }
      }
      e.current = t, Yt = 2;
    }
  }
  function Vg() {
    if (Yt === 2) {
      Yt = 0;
      var e = ti, t = Nr, i = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || i) {
        i = U.T, U.T = null;
        var l = V.p;
        V.p = 2;
        var u = We;
        We |= 4;
        try {
          fg(e, t.alternate, t);
        } finally {
          We = u, V.p = l, U.T = i;
        }
      }
      Yt = 3;
    }
  }
  function Bg() {
    if (Yt === 4 || Yt === 3) {
      Yt = 0, Dn();
      var e = ti, t = Nr, i = Da, l = jg;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Yt = 5 : (Yt = 0, Nr = ti = null, Hg(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (u === 0 && (ei = null), I(i), t = t.stateNode, Pt && typeof Pt.onCommitFiberRoot == "function")
        try {
          Pt.onCommitFiberRoot(
            Qn,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        t = U.T, u = V.p, V.p = 2, U.T = null;
        try {
          for (var d = e.onRecoverableError, y = 0; y < l.length; y++) {
            var E = l[y];
            d(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          U.T = t, V.p = u;
        }
      }
      (Da & 3) !== 0 && So(), da(e), u = e.pendingLanes, (i & 261930) !== 0 && (u & 42) !== 0 ? e === dd ? Dl++ : (Dl = 0, dd = e) : Dl = 0, zl(0);
    }
  }
  function Hg(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, hl(t)));
  }
  function So() {
    return kg(), Vg(), Bg(), qg();
  }
  function qg() {
    if (Yt !== 5) return !1;
    var e = ti, t = ud;
    ud = 0;
    var i = I(Da), l = U.T, u = V.p;
    try {
      V.p = 32 > i ? 32 : i, U.T = null, i = cd, cd = null;
      var d = ti, y = Da;
      if (Yt = 0, Nr = ti = null, Da = 0, (We & 6) !== 0) throw Error(s(331));
      var E = We;
      if (We |= 4, wg(d.current), bg(
        d,
        d.current,
        y,
        i
      ), We = E, zl(0, !1), Pt && typeof Pt.onPostCommitFiberRoot == "function")
        try {
          Pt.onPostCommitFiberRoot(Qn, d);
        } catch {
        }
      return !0;
    } finally {
      V.p = u, U.T = l, Hg(e, t);
    }
  }
  function $g(e, t, i) {
    t = Un(i, t), t = Ic(e.stateNode, t, 2), e = Ka(e, t, 2), e !== null && (it(e, 2), da(e));
  }
  function nt(e, t, i) {
    if (e.tag === 3)
      $g(e, e, i);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          $g(
            t,
            e,
            i
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (ei === null || !ei.has(l))) {
            e = Un(i, e), i = Ip(2), l = Ka(t, i, 2), l !== null && (Yp(
              i,
              l,
              t,
              e
            ), it(l, 2), da(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function md(e, t, i) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new hw();
      var u = /* @__PURE__ */ new Set();
      l.set(t, u);
    } else
      u = l.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), l.set(t, u));
    u.has(i) || (ld = !0, u.add(i), e = yw.bind(null, e, t, i), t.then(e, e));
  }
  function yw(e, t, i) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & i, e.warmLanes &= ~i, dt === e && (Ge & i) === i && (wt === 4 || wt === 3 && (Ge & 62914560) === Ge && 300 > Bt() - po ? (We & 2) === 0 && Mr(e, 0) : sd |= i, Cr === Ge && (Cr = 0)), da(e);
  }
  function Ig(e, t) {
    t === 0 && (t = It()), e = Ai(e, t), e !== null && (it(e, t), da(e));
  }
  function bw(e) {
    var t = e.memoizedState, i = 0;
    t !== null && (i = t.retryLane), Ig(e, i);
  }
  function xw(e, t) {
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
    l !== null && l.delete(t), Ig(e, i);
  }
  function Sw(e, t) {
    return bn(e, t);
  }
  var wo = null, Rr = null, pd = !1, Eo = !1, gd = !1, ai = 0;
  function da(e) {
    e !== Rr && e.next === null && (Rr === null ? wo = Rr = e : Rr = Rr.next = e), Eo = !0, pd || (pd = !0, Ew());
  }
  function zl(e, t) {
    if (!gd && Eo) {
      gd = !0;
      do
        for (var i = !1, l = wo; l !== null; ) {
          if (e !== 0) {
            var u = l.pendingLanes;
            if (u === 0) var d = 0;
            else {
              var y = l.suspendedLanes, E = l.pingedLanes;
              d = (1 << 31 - $t(42 | e) + 1) - 1, d &= u & ~(y & ~E), d = d & 201326741 ? d & 201326741 | 1 : d ? d | 2 : 0;
            }
            d !== 0 && (i = !0, Xg(l, d));
          } else
            d = Ge, d = Le(
              l,
              l === dt ? d : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (d & 3) === 0 || ut(l, d) || (i = !0, Xg(l, d));
          l = l.next;
        }
      while (i);
      gd = !1;
    }
  }
  function ww() {
    Yg();
  }
  function Yg() {
    Eo = pd = !1;
    var e = 0;
    ai !== 0 && zw() && (e = ai);
    for (var t = Bt(), i = null, l = wo; l !== null; ) {
      var u = l.next, d = Fg(l, t);
      d === 0 ? (l.next = null, i === null ? wo = u : i.next = u, u === null && (Rr = i)) : (i = l, (e !== 0 || (d & 3) !== 0) && (Eo = !0)), l = u;
    }
    Yt !== 0 && Yt !== 5 || zl(e), ai !== 0 && (ai = 0);
  }
  function Fg(e, t) {
    for (var i = e.suspendedLanes, l = e.pingedLanes, u = e.expirationTimes, d = e.pendingLanes & -62914561; 0 < d; ) {
      var y = 31 - $t(d), E = 1 << y, D = u[y];
      D === -1 ? ((E & i) === 0 || (E & l) !== 0) && (u[y] = Mt(E, t)) : D <= t && (e.expiredLanes |= E), d &= ~E;
    }
    if (t = dt, i = Ge, i = Le(
      e,
      e === t ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, i === 0 || e === t && (tt === 2 || tt === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && ma(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((i & 3) === 0 || ut(e, i)) {
      if (t = i & -i, t === e.callbackPriority) return t;
      switch (l !== null && ma(l), I(i)) {
        case 2:
        case 8:
          i = Qe;
          break;
        case 32:
          i = et;
          break;
        case 268435456:
          i = qt;
          break;
        default:
          i = et;
      }
      return l = Gg.bind(null, e), i = bn(i, l), e.callbackPriority = t, e.callbackNode = i, t;
    }
    return l !== null && l !== null && ma(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Gg(e, t) {
    if (Yt !== 0 && Yt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var i = e.callbackNode;
    if (So() && e.callbackNode !== i)
      return null;
    var l = Ge;
    return l = Le(
      e,
      e === dt ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (Ng(e, l, t), Fg(e, Bt()), e.callbackNode != null && e.callbackNode === i ? Gg.bind(null, e) : null);
  }
  function Xg(e, t) {
    if (So()) return null;
    Ng(e, t, !0);
  }
  function Ew() {
    Lw(function() {
      (We & 6) !== 0 ? bn(
        Oe,
        ww
      ) : Yg();
    });
  }
  function vd() {
    if (ai === 0) {
      var e = pr;
      e === 0 && (e = pa, pa <<= 1, (pa & 261888) === 0 && (pa = 256)), ai = e;
    }
    return ai;
  }
  function Kg(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Rs("" + e);
  }
  function Qg(e, t) {
    var i = t.ownerDocument.createElement("input");
    return i.name = t.name, i.value = t.value, e.id && i.setAttribute("form", e.id), t.parentNode.insertBefore(i, t), e = new FormData(e), i.parentNode.removeChild(i), e;
  }
  function Tw(e, t, i, l, u) {
    if (t === "submit" && i && i.stateNode === u) {
      var d = Kg(
        (u[pe] || null).action
      ), y = l.submitter;
      y && (t = (t = y[pe] || null) ? Kg(t.formAction) : y.getAttribute("formAction"), t !== null && (d = t, y = null));
      var E = new Os(
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
                if (ai !== 0) {
                  var D = y ? Qg(u, y) : new FormData(u);
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
                typeof d == "function" && (E.preventDefault(), D = y ? Qg(u, y) : new FormData(u), kc(
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
    var bd = ec[yd], jw = bd.toLowerCase(), Cw = bd[0].toUpperCase() + bd.slice(1);
    Jn(
      jw,
      "on" + Cw
    );
  }
  Jn(Cm, "onAnimationEnd"), Jn(Nm, "onAnimationIteration"), Jn(Mm, "onAnimationStart"), Jn("dblclick", "onDoubleClick"), Jn("focusin", "onFocus"), Jn("focusout", "onBlur"), Jn($S, "onTransitionRun"), Jn(IS, "onTransitionStart"), Jn(YS, "onTransitionCancel"), Jn(Am, "onTransitionEnd"), la("onMouseEnter", ["mouseout", "mouseover"]), la("onMouseLeave", ["mouseout", "mouseover"]), la("onPointerEnter", ["pointerout", "pointerover"]), la("onPointerLeave", ["pointerout", "pointerover"]), Gt(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Gt(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Gt("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Gt(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Gt(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Gt(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Ol = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Nw = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ol)
  );
  function Pg(e, t) {
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
              ks(ee);
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
              ks(ee);
            }
            u.currentTarget = null, d = D;
          }
      }
    }
  }
  function Fe(e, t) {
    var i = t[be];
    i === void 0 && (i = t[be] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    i.has(l) || (Zg(t, e, 2, !1), i.add(l));
  }
  function xd(e, t, i) {
    var l = 0;
    t && (l |= 4), Zg(
      i,
      e,
      l,
      t
    );
  }
  var To = "_reactListening" + Math.random().toString(36).slice(2);
  function Sd(e) {
    if (!e[To]) {
      e[To] = !0, Ha.forEach(function(i) {
        i !== "selectionchange" && (Nw.has(i) || xd(i, !1, e), xd(i, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[To] || (t[To] = !0, xd("selectionchange", !1, t));
    }
  }
  function Zg(e, t, i, l) {
    switch (Cv(t)) {
      case 2:
        var u = tE;
        break;
      case 8:
        u = nE;
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
            if (y = rt(E), y === null) return;
            if (D = y.tag, D === 5 || D === 6 || D === 26 || D === 27) {
              l = d = y;
              continue e;
            }
            E = E.parentNode;
          }
        }
        l = l.return;
      }
    nm(function() {
      var F = d, ee = Bu(i), ie = [];
      e: {
        var X = Rm.get(e);
        if (X !== void 0) {
          var P = Os, xe = e;
          switch (e) {
            case "keypress":
              if (Ds(i) === 0) break e;
            case "keydown":
            case "keyup":
              P = xS;
              break;
            case "focusin":
              xe = "focus", P = Fu;
              break;
            case "focusout":
              xe = "blur", P = Fu;
              break;
            case "beforeblur":
            case "afterblur":
              P = Fu;
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
              P = rm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              P = oS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              P = ES;
              break;
            case Cm:
            case Nm:
            case Mm:
              P = dS;
              break;
            case Am:
              P = jS;
              break;
            case "scroll":
            case "scrollend":
              P = lS;
              break;
            case "wheel":
              P = NS;
              break;
            case "copy":
            case "cut":
            case "paste":
              P = hS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              P = sm;
              break;
            case "toggle":
            case "beforetoggle":
              P = AS;
          }
          var De = (t & 4) !== 0, ot = !De && (e === "scroll" || e === "scrollend"), H = De ? X !== null ? X + "Capture" : null : X;
          De = [];
          for (var k = F, Y; k !== null; ) {
            var ne = k;
            if (Y = ne.stateNode, ne = ne.tag, ne !== 5 && ne !== 26 && ne !== 27 || Y === null || H === null || (ne = nl(k, H), ne != null && De.push(
              Ll(k, ne, Y)
            )), ot) break;
            k = k.return;
          }
          0 < De.length && (X = new P(
            X,
            xe,
            null,
            i,
            ee
          ), ie.push({ event: X, listeners: De }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (X = e === "mouseover" || e === "pointerover", P = e === "mouseout" || e === "pointerout", X && i !== Vu && (xe = i.relatedTarget || i.fromElement) && (rt(xe) || xe[Ee]))
            break e;
          if ((P || X) && (X = ee.window === ee ? ee : (X = ee.ownerDocument) ? X.defaultView || X.parentWindow : window, P ? (xe = i.relatedTarget || i.toElement, P = F, xe = xe ? rt(xe) : null, xe !== null && (ot = c(xe), De = xe.tag, xe !== ot || De !== 5 && De !== 27 && De !== 6) && (xe = null)) : (P = null, xe = F), P !== xe)) {
            if (De = rm, ne = "onMouseLeave", H = "onMouseEnter", k = "mouse", (e === "pointerout" || e === "pointerover") && (De = sm, ne = "onPointerLeave", H = "onPointerEnter", k = "pointer"), ot = P == null ? X : Ie(P), Y = xe == null ? X : Ie(xe), X = new De(
              ne,
              k + "leave",
              P,
              i,
              ee
            ), X.target = ot, X.relatedTarget = Y, ne = null, rt(ee) === F && (De = new De(
              H,
              k + "enter",
              xe,
              i,
              ee
            ), De.target = Y, De.relatedTarget = ot, ne = De), ot = ne, P && xe)
              t: {
                for (De = Mw, H = P, k = xe, Y = 0, ne = H; ne; ne = De(ne))
                  Y++;
                ne = 0;
                for (var Ae = k; Ae; Ae = De(Ae))
                  ne++;
                for (; 0 < Y - ne; )
                  H = De(H), Y--;
                for (; 0 < ne - Y; )
                  k = De(k), ne--;
                for (; Y--; ) {
                  if (H === k || k !== null && H === k.alternate) {
                    De = H;
                    break t;
                  }
                  H = De(H), k = De(k);
                }
                De = null;
              }
            else De = null;
            P !== null && Jg(
              ie,
              X,
              P,
              De,
              !1
            ), xe !== null && ot !== null && Jg(
              ie,
              ot,
              xe,
              De,
              !0
            );
          }
        }
        e: {
          if (X = F ? Ie(F) : window, P = X.nodeName && X.nodeName.toLowerCase(), P === "select" || P === "input" && X.type === "file")
            var Ze = pm;
          else if (hm(X))
            if (gm)
              Ze = BS;
            else {
              Ze = kS;
              var Te = US;
            }
          else
            P = X.nodeName, !P || P.toLowerCase() !== "input" || X.type !== "checkbox" && X.type !== "radio" ? F && ku(F.elementType) && (Ze = pm) : Ze = VS;
          if (Ze && (Ze = Ze(e, F))) {
            mm(
              ie,
              Ze,
              i,
              ee
            );
            break e;
          }
          Te && Te(e, X, F), e === "focusout" && F && X.type === "number" && F.memoizedProps.value != null && Uu(X, "number", X.value);
        }
        switch (Te = F ? Ie(F) : window, e) {
          case "focusin":
            (hm(Te) || Te.contentEditable === "true") && (sr = Te, Zu = F, cl = null);
            break;
          case "focusout":
            cl = Zu = sr = null;
            break;
          case "mousedown":
            Ju = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ju = !1, Tm(ie, i, ee);
            break;
          case "selectionchange":
            if (qS) break;
          case "keydown":
          case "keyup":
            Tm(ie, i, ee);
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
          lr ? dm(e, i) && (Xe = "onCompositionEnd") : e === "keydown" && i.keyCode === 229 && (Xe = "onCompositionStart");
        Xe && (om && i.locale !== "ko" && (lr || Xe !== "onCompositionStart" ? Xe === "onCompositionEnd" && lr && (Ve = am()) : (qa = ee, $u = "value" in qa ? qa.value : qa.textContent, lr = !0)), Te = jo(F, Xe), 0 < Te.length && (Xe = new lm(
          Xe,
          e,
          null,
          i,
          ee
        ), ie.push({ event: Xe, listeners: Te }), Ve ? Xe.data = Ve : (Ve = fm(i), Ve !== null && (Xe.data = Ve)))), (Ve = _S ? DS(e, i) : zS(e, i)) && (Xe = jo(F, "onBeforeInput"), 0 < Xe.length && (Te = new lm(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          ee
        ), ie.push({
          event: Te,
          listeners: Xe
        }), Te.data = Ve)), Tw(
          ie,
          e,
          F,
          i,
          ee
        );
      }
      Pg(ie, t);
    });
  }
  function Ll(e, t, i) {
    return {
      instance: e,
      listener: t,
      currentTarget: i
    };
  }
  function jo(e, t) {
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
  function Mw(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Jg(e, t, i, l, u) {
    for (var d = t._reactName, y = []; i !== null && i !== l; ) {
      var E = i, D = E.alternate, F = E.stateNode;
      if (E = E.tag, D !== null && D === l) break;
      E !== 5 && E !== 26 && E !== 27 || F === null || (D = F, u ? (F = nl(i, d), F != null && y.unshift(
        Ll(i, F, D)
      )) : u || (F = nl(i, d), F != null && y.push(
        Ll(i, F, D)
      ))), i = i.return;
    }
    y.length !== 0 && e.push({ event: t, listeners: y });
  }
  var Aw = /\r\n?/g, Rw = /\u0000|\uFFFD/g;
  function Wg(e) {
    return (typeof e == "string" ? e : "" + e).replace(Aw, `
`).replace(Rw, "");
  }
  function ev(e, t) {
    return t = Wg(t), Wg(e) === t;
  }
  function st(e, t, i, l, u, d) {
    switch (i) {
      case "children":
        typeof l == "string" ? t === "body" || t === "textarea" && l === "" || ar(e, l) : (typeof l == "number" || typeof l == "bigint") && t !== "body" && ar(e, "" + l);
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
        em(e, l, d);
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
          typeof d == "function" && (i === "formAction" ? (t !== "input" && st(e, t, "name", u.name, u, null), st(
            e,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), st(
            e,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), st(
            e,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (st(e, t, "encType", u.encType, u, null), st(e, t, "method", u.method, u, null), st(e, t, "target", u.target, u, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(i);
          break;
        }
        l = Rs("" + l), e.setAttribute(i, l);
        break;
      case "onClick":
        l != null && (e.onclick = va);
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
        an(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        an(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        an(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        an(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        an(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        an(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        an(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        an(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        an(
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
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = iS.get(i) || i, qe(e, i, l));
    }
  }
  function Ed(e, t, i, l, u, d) {
    switch (i) {
      case "style":
        em(e, l, d);
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
        typeof l == "string" ? ar(e, l) : (typeof l == "number" || typeof l == "bigint") && ar(e, "" + l);
        break;
      case "onScroll":
        l != null && Fe("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Fe("scrollend", e);
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
        if (!Zn.hasOwnProperty(i))
          e: {
            if (i[0] === "o" && i[1] === "n" && (u = i.endsWith("Capture"), t = i.slice(2, u ? i.length - 7 : void 0), d = e[pe] || null, d = d != null ? d[i] : null, typeof d == "function" && e.removeEventListener(t, d, u), typeof l == "function")) {
              typeof d != "function" && d !== null && (i in e ? e[i] = null : e.hasAttribute(i) && e.removeAttribute(i)), e.addEventListener(t, l, u);
              break e;
            }
            i in e ? e[i] = l : l === !0 ? e.setAttribute(i, "") : qe(e, i, l);
          }
    }
  }
  function tn(e, t, i) {
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
                  st(e, t, d, y, i, null);
              }
          }
        u && st(e, t, "srcSet", i.srcSet, i, null), l && st(e, t, "src", i.src, i, null);
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
                  st(e, t, l, ee, i, null);
              }
          }
        Ph(
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
                st(e, t, u, E, i, null);
            }
        t = d, i = y, e.multiple = !!l, t != null ? nr(e, !!l, t, !1) : i != null && nr(e, !!l, i, !0);
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
                st(e, t, y, E, i, null);
            }
        Jh(e, l, u, d);
        return;
      case "option":
        for (D in i)
          if (i.hasOwnProperty(D) && (l = i[D], l != null))
            switch (D) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                st(e, t, D, l, i, null);
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
        for (l = 0; l < Ol.length; l++)
          Fe(Ol[l], e);
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
                st(e, t, F, l, i, null);
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
      i.hasOwnProperty(E) && (l = i[E], l != null && st(e, t, E, l, i, null));
  }
  function _w(e, t, i, l) {
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
        for (P in i) {
          var ie = i[P];
          if (i.hasOwnProperty(P) && ie != null)
            switch (P) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                D = ie;
              default:
                l.hasOwnProperty(P) || st(e, t, P, null, l, ie);
            }
        }
        for (var X in l) {
          var P = l[X];
          if (ie = i[X], l.hasOwnProperty(X) && (P != null || ie != null))
            switch (X) {
              case "type":
                d = P;
                break;
              case "name":
                u = P;
                break;
              case "checked":
                F = P;
                break;
              case "defaultChecked":
                ee = P;
                break;
              case "value":
                y = P;
                break;
              case "defaultValue":
                E = P;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (P != null)
                  throw Error(s(137, t));
                break;
              default:
                P !== ie && st(
                  e,
                  t,
                  X,
                  P,
                  l,
                  ie
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
        P = y = E = X = null;
        for (d in i)
          if (D = i[d], i.hasOwnProperty(d) && D != null)
            switch (d) {
              case "value":
                break;
              case "multiple":
                P = D;
              default:
                l.hasOwnProperty(d) || st(
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
                X = d;
                break;
              case "defaultValue":
                E = d;
                break;
              case "multiple":
                y = d;
              default:
                d !== D && st(
                  e,
                  t,
                  u,
                  d,
                  l,
                  D
                );
            }
        t = E, i = y, l = P, X != null ? nr(e, !!i, X, !1) : !!l != !!i && (t != null ? nr(e, !!i, t, !0) : nr(e, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        P = X = null;
        for (E in i)
          if (u = i[E], i.hasOwnProperty(E) && u != null && !l.hasOwnProperty(E))
            switch (E) {
              case "value":
                break;
              case "children":
                break;
              default:
                st(e, t, E, null, l, u);
            }
        for (y in l)
          if (u = l[y], d = i[y], l.hasOwnProperty(y) && (u != null || d != null))
            switch (y) {
              case "value":
                X = u;
                break;
              case "defaultValue":
                P = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== d && st(e, t, y, u, l, d);
            }
        Zh(e, X, P);
        return;
      case "option":
        for (var xe in i)
          if (X = i[xe], i.hasOwnProperty(xe) && X != null && !l.hasOwnProperty(xe))
            switch (xe) {
              case "selected":
                e.selected = !1;
                break;
              default:
                st(
                  e,
                  t,
                  xe,
                  null,
                  l,
                  X
                );
            }
        for (D in l)
          if (X = l[D], P = i[D], l.hasOwnProperty(D) && X !== P && (X != null || P != null))
            switch (D) {
              case "selected":
                e.selected = X && typeof X != "function" && typeof X != "symbol";
                break;
              default:
                st(
                  e,
                  t,
                  D,
                  X,
                  l,
                  P
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
        for (var De in i)
          X = i[De], i.hasOwnProperty(De) && X != null && !l.hasOwnProperty(De) && st(e, t, De, null, l, X);
        for (F in l)
          if (X = l[F], P = i[F], l.hasOwnProperty(F) && X !== P && (X != null || P != null))
            switch (F) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (X != null)
                  throw Error(s(137, t));
                break;
              default:
                st(
                  e,
                  t,
                  F,
                  X,
                  l,
                  P
                );
            }
        return;
      default:
        if (ku(t)) {
          for (var ot in i)
            X = i[ot], i.hasOwnProperty(ot) && X !== void 0 && !l.hasOwnProperty(ot) && Ed(
              e,
              t,
              ot,
              void 0,
              l,
              X
            );
          for (ee in l)
            X = l[ee], P = i[ee], !l.hasOwnProperty(ee) || X === P || X === void 0 && P === void 0 || Ed(
              e,
              t,
              ee,
              X,
              l,
              P
            );
          return;
        }
    }
    for (var H in i)
      X = i[H], i.hasOwnProperty(H) && X != null && !l.hasOwnProperty(H) && st(e, t, H, null, l, X);
    for (ie in l)
      X = l[ie], P = i[ie], !l.hasOwnProperty(ie) || X === P || X == null && P == null || st(e, t, ie, X, l, P);
  }
  function tv(e) {
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
  function Dw() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, i = performance.getEntriesByType("resource"), l = 0; l < i.length; l++) {
        var u = i[l], d = u.transferSize, y = u.initiatorType, E = u.duration;
        if (d && E && tv(y)) {
          for (y = 0, E = u.responseEnd, l += 1; l < i.length; l++) {
            var D = i[l], F = D.startTime;
            if (F > E) break;
            var ee = D.transferSize, ie = D.initiatorType;
            ee && tv(ie) && (D = D.responseEnd, y += ee * (D < E ? 1 : (E - F) / (D - F)));
          }
          if (--l, t += 8 * (d + y) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Td = null, jd = null;
  function Co(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function nv(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function av(e, t) {
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
  function zw() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Nd ? !1 : (Nd = e, !0) : (Nd = null, !1);
  }
  var iv = typeof setTimeout == "function" ? setTimeout : void 0, Ow = typeof clearTimeout == "function" ? clearTimeout : void 0, rv = typeof Promise == "function" ? Promise : void 0, Lw = typeof queueMicrotask == "function" ? queueMicrotask : typeof rv < "u" ? function(e) {
    return rv.resolve(null).then(e).catch(Uw);
  } : iv;
  function Uw(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ii(e) {
    return e === "head";
  }
  function lv(e, t) {
    var i = t, l = 0;
    do {
      var u = i.nextSibling;
      if (e.removeChild(i), u && u.nodeType === 8)
        if (i = u.data, i === "/$" || i === "/&") {
          if (l === 0) {
            e.removeChild(u), Or(t);
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
    Or(t);
  }
  function sv(e, t) {
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
          Md(i), ct(i);
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
  function kw(e, t, i, l) {
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
  function Vw(e, t, i) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !i || (e = qn(e.nextSibling), e === null)) return null;
    return e;
  }
  function ov(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = qn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Ad(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Rd(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Bw(e, t) {
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
  function uv(e) {
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
  function cv(e) {
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
  function dv(e, t, i) {
    switch (t = Co(i), e) {
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
    ct(e);
  }
  var $n = /* @__PURE__ */ new Map(), fv = /* @__PURE__ */ new Set();
  function No(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var za = V.d;
  V.d = {
    f: Hw,
    r: qw,
    D: $w,
    C: Iw,
    L: Yw,
    m: Fw,
    X: Xw,
    S: Gw,
    M: Kw
  };
  function Hw() {
    var e = za.f(), t = yo();
    return e || t;
  }
  function qw(e) {
    var t = vt(e);
    t !== null && t.tag === 5 && t.type === "form" ? Ap(t) : za.r(e);
  }
  var _r = typeof document > "u" ? null : document;
  function hv(e, t, i) {
    var l = _r;
    if (l && typeof t == "string" && t) {
      var u = On(t);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof i == "string" && (u += '[crossorigin="' + i + '"]'), fv.has(u) || (fv.add(u), e = { rel: e, crossOrigin: i, href: t }, l.querySelector(u) === null && (t = l.createElement("link"), tn(t, "link", e), ht(t), l.head.appendChild(t)));
    }
  }
  function $w(e) {
    za.D(e), hv("dns-prefetch", e, null);
  }
  function Iw(e, t) {
    za.C(e, t), hv("preconnect", e, t);
  }
  function Yw(e, t, i) {
    za.L(e, t, i);
    var l = _r;
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
          d = Dr(e);
          break;
        case "script":
          d = zr(e);
      }
      $n.has(d) || (e = v(
        {
          rel: "preload",
          href: t === "image" && i && i.imageSrcSet ? void 0 : e,
          as: t
        },
        i
      ), $n.set(d, e), l.querySelector(u) !== null || t === "style" && l.querySelector(kl(d)) || t === "script" && l.querySelector(Vl(d)) || (t = l.createElement("link"), tn(t, "link", e), ht(t), l.head.appendChild(t)));
    }
  }
  function Fw(e, t) {
    za.m(e, t);
    var i = _r;
    if (i && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + On(l) + '"][href="' + On(e) + '"]', d = u;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          d = zr(e);
      }
      if (!$n.has(d) && (e = v({ rel: "modulepreload", href: e }, t), $n.set(d, e), i.querySelector(u) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(Vl(d)))
              return;
        }
        l = i.createElement("link"), tn(l, "link", e), ht(l), i.head.appendChild(l);
      }
    }
  }
  function Gw(e, t, i) {
    za.S(e, t, i);
    var l = _r;
    if (l && e) {
      var u = At(l).hoistableStyles, d = Dr(e);
      t = t || "default";
      var y = u.get(d);
      if (!y) {
        var E = { loading: 0, preload: null };
        if (y = l.querySelector(
          kl(d)
        ))
          E.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": t },
            i
          ), (i = $n.get(d)) && Dd(e, i);
          var D = y = l.createElement("link");
          ht(D), tn(D, "link", e), D._p = new Promise(function(F, ee) {
            D.onload = F, D.onerror = ee;
          }), D.addEventListener("load", function() {
            E.loading |= 1;
          }), D.addEventListener("error", function() {
            E.loading |= 2;
          }), E.loading |= 4, Mo(y, t, l);
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
  function Xw(e, t) {
    za.X(e, t);
    var i = _r;
    if (i && e) {
      var l = At(i).hoistableScripts, u = zr(e), d = l.get(u);
      d || (d = i.querySelector(Vl(u)), d || (e = v({ src: e, async: !0 }, t), (t = $n.get(u)) && zd(e, t), d = i.createElement("script"), ht(d), tn(d, "link", e), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, l.set(u, d));
    }
  }
  function Kw(e, t) {
    za.M(e, t);
    var i = _r;
    if (i && e) {
      var l = At(i).hoistableScripts, u = zr(e), d = l.get(u);
      d || (d = i.querySelector(Vl(u)), d || (e = v({ src: e, async: !0, type: "module" }, t), (t = $n.get(u)) && zd(e, t), d = i.createElement("script"), ht(d), tn(d, "link", e), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, l.set(u, d));
    }
  }
  function mv(e, t, i, l) {
    var u = (u = ve.current) ? No(u) : null;
    if (!u) throw Error(s(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (t = Dr(i.href), i = At(
          u
        ).hoistableStyles, l = i.get(t), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          e = Dr(i.href);
          var d = At(
            u
          ).hoistableStyles, y = d.get(e);
          if (y || (u = u.ownerDocument || u, y = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, d.set(e, y), (d = u.querySelector(
            kl(e)
          )) && !d._p && (y.instance = d, y.state.loading = 5), $n.has(e) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, $n.set(e, i), d || Qw(
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
        return t = i.async, i = i.src, typeof i == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = zr(i), i = At(
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
  function Dr(e) {
    return 'href="' + On(e) + '"';
  }
  function kl(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function pv(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Qw(e, t, i, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? l.loading = 1 : (t = e.createElement("link"), l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    }), tn(t, "link", i), ht(t), e.head.appendChild(t));
  }
  function zr(e) {
    return '[src="' + On(e) + '"]';
  }
  function Vl(e) {
    return "script[async]" + e;
  }
  function gv(e, t, i) {
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
          ), ht(l), tn(l, "style", u), Mo(l, i.precedence, e), t.instance = l;
        case "stylesheet":
          u = Dr(i.href);
          var d = e.querySelector(
            kl(u)
          );
          if (d)
            return t.state.loading |= 4, t.instance = d, ht(d), d;
          l = pv(i), (u = $n.get(u)) && Dd(l, u), d = (e.ownerDocument || e).createElement("link"), ht(d);
          var y = d;
          return y._p = new Promise(function(E, D) {
            y.onload = E, y.onerror = D;
          }), tn(d, "link", l), t.state.loading |= 4, Mo(d, i.precedence, e), t.instance = d;
        case "script":
          return d = zr(i.src), (u = e.querySelector(
            Vl(d)
          )) ? (t.instance = u, ht(u), u) : (l = i, (u = $n.get(d)) && (l = v({}, i), zd(l, u)), e = e.ownerDocument || e, u = e.createElement("script"), ht(u), tn(u, "link", l), e.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(s(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, Mo(l, i.precedence, e));
    return t.instance;
  }
  function Mo(e, t, i) {
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
  var Ao = null;
  function vv(e, t, i) {
    if (Ao === null) {
      var l = /* @__PURE__ */ new Map(), u = Ao = /* @__PURE__ */ new Map();
      u.set(i, l);
    } else
      u = Ao, l = u.get(i), l || (l = /* @__PURE__ */ new Map(), u.set(i, l));
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
  function yv(e, t, i) {
    e = e.ownerDocument || e, e.head.insertBefore(
      i,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function Pw(e, t, i) {
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
  function bv(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Zw(e, t, i, l) {
    if (i.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var u = Dr(l.href), d = t.querySelector(
          kl(u)
        );
        if (d) {
          t = d._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Ro.bind(e), t.then(e, e)), i.state.loading |= 4, i.instance = d, ht(d);
          return;
        }
        d = t.ownerDocument || t, l = pv(l), (u = $n.get(u)) && Dd(l, u), d = d.createElement("link"), ht(d);
        var y = d;
        y._p = new Promise(function(E, D) {
          y.onload = E, y.onerror = D;
        }), tn(d, "link", l), i.instance = d;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(i, t), (t = i.state.preload) && (i.state.loading & 3) === 0 && (e.count++, i = Ro.bind(e), t.addEventListener("load", i), t.addEventListener("error", i));
    }
  }
  var Od = 0;
  function Jw(e, t) {
    return e.stylesheets && e.count === 0 && Do(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(i) {
      var l = setTimeout(function() {
        if (e.stylesheets && Do(e, e.stylesheets), e.unsuspend) {
          var d = e.unsuspend;
          e.unsuspend = null, d();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Od === 0 && (Od = 62500 * Dw());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Do(e, e.stylesheets), e.unsuspend)) {
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
      if (this.stylesheets) Do(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var _o = null;
  function Do(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, _o = /* @__PURE__ */ new Map(), t.forEach(Ww, e), _o = null, Ro.call(e));
  }
  function Ww(e, t) {
    if (!(t.state.loading & 4)) {
      var i = _o.get(e);
      if (i) var l = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), _o.set(e, i);
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
  var Bl = {
    $$typeof: z,
    Provider: null,
    Consumer: null,
    _currentValue: q,
    _currentValue2: q,
    _threadCount: 0
  };
  function eE(e, t, i, l, u, d, y, E, D) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = xn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = xn(0), this.hiddenUpdates = xn(null), this.identifierPrefix = l, this.onUncaughtError = u, this.onCaughtError = d, this.onRecoverableError = y, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = D, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function xv(e, t, i, l, u, d, y, E, D, F, ee, ie) {
    return e = new eE(
      e,
      t,
      i,
      y,
      D,
      F,
      ee,
      ie,
      E
    ), t = 1, d === !0 && (t |= 24), d = wn(3, null, null, t), e.current = d, d.stateNode = e, t = hc(), t.refCount++, e.pooledCache = t, t.refCount++, d.memoizedState = {
      element: l,
      isDehydrated: i,
      cache: t
    }, vc(d), e;
  }
  function Sv(e) {
    return e ? (e = cr, e) : cr;
  }
  function wv(e, t, i, l, u, d) {
    u = Sv(u), l.context === null ? l.context = u : l.pendingContext = u, l = Xa(t), l.payload = { element: i }, d = d === void 0 ? null : d, d !== null && (l.callback = d), i = Ka(e, l, t), i !== null && (gn(i, e, t), vl(i, e, t));
  }
  function Ev(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var i = e.retryLane;
      e.retryLane = i !== 0 && i < t ? i : t;
    }
  }
  function Ld(e, t) {
    Ev(e, t), (e = e.alternate) && Ev(e, t);
  }
  function Tv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ai(e, 67108864);
      t !== null && gn(t, e, 67108864), Ld(e, 67108864);
    }
  }
  function jv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Nn();
      t = B(t);
      var i = Ai(e, t);
      i !== null && gn(i, e, t), Ld(e, t);
    }
  }
  var zo = !0;
  function tE(e, t, i, l) {
    var u = U.T;
    U.T = null;
    var d = V.p;
    try {
      V.p = 2, Ud(e, t, i, l);
    } finally {
      V.p = d, U.T = u;
    }
  }
  function nE(e, t, i, l) {
    var u = U.T;
    U.T = null;
    var d = V.p;
    try {
      V.p = 8, Ud(e, t, i, l);
    } finally {
      V.p = d, U.T = u;
    }
  }
  function Ud(e, t, i, l) {
    if (zo) {
      var u = kd(l);
      if (u === null)
        wd(
          e,
          t,
          l,
          Oo,
          i
        ), Nv(e, l);
      else if (iE(
        u,
        e,
        t,
        i,
        l
      ))
        l.stopPropagation();
      else if (Nv(e, l), t & 4 && -1 < aE.indexOf(e)) {
        for (; u !== null; ) {
          var d = vt(u);
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (d = d.stateNode, d.current.memoizedState.isDehydrated) {
                  var y = cn(d.pendingLanes);
                  if (y !== 0) {
                    var E = d;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; y; ) {
                      var D = 1 << 31 - $t(y);
                      E.entanglements[1] |= D, y &= ~D;
                    }
                    da(d), (We & 6) === 0 && (go = Bt() + 500, zl(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = Ai(d, 2), E !== null && gn(E, d, 2), yo(), Ld(d, 2);
            }
          if (d = kd(l), d === null && wd(
            e,
            t,
            l,
            Oo,
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
  var Oo = null;
  function Vd(e) {
    if (Oo = null, e = rt(e), e !== null) {
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
    return Oo = e, null;
  }
  function Cv(e) {
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
        switch (ye()) {
          case Oe:
            return 2;
          case Qe:
            return 8;
          case et:
          case Ht:
            return 32;
          case qt:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Bd = !1, ri = null, li = null, si = null, Hl = /* @__PURE__ */ new Map(), ql = /* @__PURE__ */ new Map(), oi = [], aE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Nv(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        ri = null;
        break;
      case "dragenter":
      case "dragleave":
        li = null;
        break;
      case "mouseover":
      case "mouseout":
        si = null;
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
    }, t !== null && (t = vt(t), t !== null && Tv(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), e);
  }
  function iE(e, t, i, l, u) {
    switch (t) {
      case "focusin":
        return ri = $l(
          ri,
          e,
          t,
          i,
          l,
          u
        ), !0;
      case "dragenter":
        return li = $l(
          li,
          e,
          t,
          i,
          l,
          u
        ), !0;
      case "mouseover":
        return si = $l(
          si,
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
  function Mv(e) {
    var t = rt(e.target);
    if (t !== null) {
      var i = c(t);
      if (i !== null) {
        if (t = i.tag, t === 13) {
          if (t = h(i), t !== null) {
            e.blockedOn = t, ue(e.priority, function() {
              jv(i);
            });
            return;
          }
        } else if (t === 31) {
          if (t = p(i), t !== null) {
            e.blockedOn = t, ue(e.priority, function() {
              jv(i);
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
  function Lo(e) {
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
        return t = vt(i), t !== null && Tv(t), e.blockedOn = i, !1;
      t.shift();
    }
    return !0;
  }
  function Av(e, t, i) {
    Lo(e) && i.delete(t);
  }
  function rE() {
    Bd = !1, ri !== null && Lo(ri) && (ri = null), li !== null && Lo(li) && (li = null), si !== null && Lo(si) && (si = null), Hl.forEach(Av), ql.forEach(Av);
  }
  function Uo(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Bd || (Bd = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      rE
    )));
  }
  var ko = null;
  function Rv(e) {
    ko !== e && (ko = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        ko === e && (ko = null);
        for (var t = 0; t < e.length; t += 3) {
          var i = e[t], l = e[t + 1], u = e[t + 2];
          if (typeof l != "function") {
            if (Vd(l || i) === null)
              continue;
            break;
          }
          var d = vt(i);
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
  function Or(e) {
    function t(D) {
      return Uo(D, e);
    }
    ri !== null && Uo(ri, e), li !== null && Uo(li, e), si !== null && Uo(si, e), Hl.forEach(t), ql.forEach(t);
    for (var i = 0; i < oi.length; i++) {
      var l = oi[i];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < oi.length && (i = oi[0], i.blockedOn === null); )
      Mv(i), i.blockedOn === null && oi.shift();
    if (i = (e.ownerDocument || e).$$reactFormReplay, i != null)
      for (l = 0; l < i.length; l += 3) {
        var u = i[l], d = i[l + 1], y = u[pe] || null;
        if (typeof d == "function")
          y || Rv(i);
        else if (y) {
          var E = null;
          if (d && d.hasAttribute("formAction")) {
            if (u = d, y = d[pe] || null)
              E = y.formAction;
            else if (Vd(u) !== null) continue;
          } else E = y.action;
          typeof E == "function" ? i[l + 1] = E : (i.splice(l, 3), l -= 3), Rv(i);
        }
      }
  }
  function _v() {
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
  Vo.prototype.render = Hd.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var i = t.current, l = Nn();
    wv(i, l, e, t, null, null);
  }, Vo.prototype.unmount = Hd.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      wv(e.current, 2, null, e, null, null), yo(), t[Ee] = null;
    }
  };
  function Vo(e) {
    this._internalRoot = e;
  }
  Vo.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = se();
      e = { blockedOn: null, target: e, priority: t };
      for (var i = 0; i < oi.length && t !== 0 && t < oi[i].priority; i++) ;
      oi.splice(i, 0, e), i === 0 && Mv(e);
    }
  };
  var Dv = a.version;
  if (Dv !== "19.2.5")
    throw Error(
      s(
        527,
        Dv,
        "19.2.5"
      )
    );
  V.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = m(t), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var lE = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: U,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Bo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Bo.isDisabled && Bo.supportsFiber)
      try {
        Qn = Bo.inject(
          lE
        ), Pt = Bo;
      } catch {
      }
  }
  return Yl.createRoot = function(e, t) {
    if (!o(e)) throw Error(s(299));
    var i = !1, l = "", u = Bp, d = Hp, y = qp;
    return t != null && (t.unstable_strictMode === !0 && (i = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (d = t.onCaughtError), t.onRecoverableError !== void 0 && (y = t.onRecoverableError)), t = xv(
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
      _v
    ), e[Ee] = t.current, Sd(e), new Hd(t);
  }, Yl.hydrateRoot = function(e, t, i) {
    if (!o(e)) throw Error(s(299));
    var l = !1, u = "", d = Bp, y = Hp, E = qp, D = null;
    return i != null && (i.unstable_strictMode === !0 && (l = !0), i.identifierPrefix !== void 0 && (u = i.identifierPrefix), i.onUncaughtError !== void 0 && (d = i.onUncaughtError), i.onCaughtError !== void 0 && (y = i.onCaughtError), i.onRecoverableError !== void 0 && (E = i.onRecoverableError), i.formState !== void 0 && (D = i.formState)), t = xv(
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
      _v
    ), t.context = Sv(null), i = t.current, l = Nn(), l = B(l), u = Xa(l), u.callback = null, Ka(i, u, l), i = l, t.current.lanes = i, it(t, i), da(t), e[Ee] = t.current, Sd(e), new Vo(t);
  }, Yl.version = "19.2.5", Yl;
}
var $v;
function vE() {
  if ($v) return Id.exports;
  $v = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Id.exports = gE(), Id.exports;
}
var yE = vE();
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
var Tb = (n) => {
  throw TypeError(n);
}, bE = (n, a, r) => a.has(n) || Tb("Cannot " + r), Xd = (n, a, r) => (bE(n, a, "read from private field"), r ? r.call(n) : a.get(n)), xE = (n, a, r) => a.has(n) ? Tb("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(n) : a.set(n, r);
function Iv(n) {
  return typeof n == "object" && n != null && "pathname" in n && "search" in n && "hash" in n && "state" in n && "key" in n;
}
function SE(n = {}) {
  let { initialEntries: a = ["/"], initialIndex: r, v5Compat: s = !1 } = n, o;
  o = a.map(
    (w, T) => b(
      w,
      typeof w == "string" ? null : w.state,
      T === 0 ? "default" : void 0,
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
  function b(w, T = null, j, _) {
    let C = Of(
      o ? m().pathname : "/",
      w,
      T,
      j,
      _
    );
    return Nt(
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
      let T = typeof w == "string" ? aa(w) : w;
      return {
        pathname: T.pathname || "",
        search: T.search || "",
        hash: T.hash || ""
      };
    },
    push(w, T) {
      h = "PUSH";
      let j = Iv(w) ? w : b(w, T);
      c += 1, o.splice(c, o.length, j), s && p && p({ action: h, location: j, delta: 1 });
    },
    replace(w, T) {
      h = "REPLACE";
      let j = Iv(w) ? w : b(w, T);
      o[c] = j, s && p && p({ action: h, location: j, delta: 0 });
    },
    go(w) {
      h = "POP";
      let T = g(c + w), j = o[T];
      c = T, p && p({ action: h, location: j, delta: w });
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
function Nt(n, a) {
  if (!n) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function wE() {
  return Math.random().toString(36).substring(2, 10);
}
function Of(n, a, r = null, s, o) {
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
    key: a && a.key || s || wE(),
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
function EE(n, a = !1) {
  let r = "http://localhost";
  typeof window < "u" && (r = window.location.origin !== "null" ? window.location.origin : window.location.href), $e(r, "No window.location.(origin|href) available to create URL");
  let s = typeof n == "string" ? n : ha(n);
  return s = s.replace(/ $/, "%20"), !a && s.startsWith("//") && (s = r + s), new URL(s, r);
}
var Wl, Yv = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(n) {
    if (xE(this, Wl, /* @__PURE__ */ new Map()), n)
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
    if (Xd(this, Wl).has(n))
      return Xd(this, Wl).get(n);
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
    Xd(this, Wl).set(n, a);
  }
};
Wl = /* @__PURE__ */ new WeakMap();
var TE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function jE(n) {
  return TE.has(
    n
  );
}
var CE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function NE(n) {
  return CE.has(
    n
  );
}
function ME(n) {
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
    ), ME(c)) {
      let m = {
        ...c,
        id: g
      };
      return s[g] = Fv(
        m,
        a(m)
      ), m;
    } else {
      let m = {
        ...c,
        id: g,
        children: void 0
      };
      return s[g] = Fv(
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
function Fv(n, a) {
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
function hi(n, a, r = "/") {
  return es(n, a, r, !1);
}
function es(n, a, r, s) {
  let o = typeof a == "string" ? aa(a) : a, c = Xn(o.pathname || "/", r);
  if (c == null)
    return null;
  let h = jb(n);
  RE(h);
  let p = null;
  for (let g = 0; p == null && g < h.length; ++g) {
    let m = qE(c);
    p = BE(
      h[g],
      m,
      s
    );
  }
  return p;
}
function AE(n, a) {
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
function jb(n, a = [], r = [], s = "", o = !1) {
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
    ), jb(
      h.children,
      a,
      S,
      v,
      g
    )), !(h.path == null && !h.index) && a.push({
      path: v,
      score: kE(v, h.index),
      routesMeta: S
    });
  };
  return n.forEach((h, p) => {
    if (h.path === "" || !h.path?.includes("?"))
      c(h, p);
    else
      for (let g of Cb(h.path))
        c(h, p, !0, g);
  }), a;
}
function Cb(n) {
  let a = n.split("/");
  if (a.length === 0) return [];
  let [r, ...s] = a, o = r.endsWith("?"), c = r.replace(/\?$/, "");
  if (s.length === 0)
    return o ? [c, ""] : [c];
  let h = Cb(s.join("/")), p = [];
  return p.push(
    ...h.map(
      (g) => g === "" ? c : [c, g].join("/")
    )
  ), o && p.push(...h), p.map(
    (g) => n.startsWith("/") && g === "" ? "/" : g
  );
}
function RE(n) {
  n.sort(
    (a, r) => a.score !== r.score ? r.score - a.score : VE(
      a.routesMeta.map((s) => s.childrenIndex),
      r.routesMeta.map((s) => s.childrenIndex)
    )
  );
}
var _E = /^:[\w-]+$/, DE = 3, zE = 2, OE = 1, LE = 10, UE = -2, Gv = (n) => n === "*";
function kE(n, a) {
  let r = n.split("/"), s = r.length;
  return r.some(Gv) && (s += UE), a && (s += zE), r.filter((o) => !Gv(o)).reduce(
    (o, c) => o + (_E.test(c) ? DE : c === "" ? OE : LE),
    s
  );
}
function VE(n, a) {
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
function BE(n, a, r = !1) {
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
      pathnameBase: YE(
        Yn([c, v.pathnameBase])
      ),
      route: S
    }), v.pathnameBase !== "/" && (c = Yn([c, v.pathnameBase]));
  }
  return h;
}
function cu(n, a) {
  typeof n == "string" && (n = { path: n, caseSensitive: !1, end: !0 });
  let [r, s] = HE(
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
          let T = p[S] || "";
          h = c.slice(0, c.length - T.length).replace(/(.)\/+$/, "$1");
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
function HE(n, a = !1, r = !0) {
  Nt(
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
function qE(n) {
  try {
    return n.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return Nt(
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
function $E({
  basename: n,
  pathname: a
}) {
  return a === "/" ? n : Yn([n, a]);
}
var Nb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, dh = (n) => Nb.test(n);
function IE(n, a = "/") {
  let {
    pathname: r,
    search: s = "",
    hash: o = ""
  } = typeof n == "string" ? aa(n) : n, c;
  return r ? (r = hh(r), r.startsWith("/") ? c = Xv(r.substring(1), "/") : c = Xv(r, a)) : c = a, {
    pathname: c,
    search: FE(s),
    hash: GE(o)
  };
}
function Xv(n, a) {
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
function Mb(n) {
  return n.filter(
    (a, r) => r === 0 || a.route.path && a.route.path.length > 0
  );
}
function fh(n) {
  let a = Mb(n);
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
  let g = IE(o, p), m = h && h !== "/" && h.endsWith("/"), b = (c || h === ".") && r.endsWith("/");
  return !g.pathname.endsWith("/") && (m || b) && (g.pathname += "/"), g;
}
var hh = (n) => n.replace(/\/\/+/g, "/"), Yn = (n) => hh(n.join("/")), du = (n) => n.replace(/\/+$/, ""), YE = (n) => du(n).replace(/^\/*/, "/"), FE = (n) => !n || n === "?" ? "" : n.startsWith("?") ? n : "?" + n, GE = (n) => !n || n === "#" ? "" : n.startsWith("#") ? n : "#" + n, XE = (n, a = 302) => {
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
var Ab = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Rb(n, a) {
  let r = n;
  if (typeof r != "string" || !Nb.test(r))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: r
    };
  let s = r, o = !1;
  if (Ab)
    try {
      let c = new URL(window.location.href), h = r.startsWith("//") ? new URL(c.protocol + r) : new URL(r), p = Xn(h.pathname, a);
      h.origin === c.origin && p != null ? r = p + h.search + h.hash : o = !0;
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
var pi = Symbol("Uninstrumented");
function KE(n, a) {
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
    let o = qr(r.lazy, a.lazy, () => {
    });
    o && (s.lazy = o);
  }
  if (typeof a.lazy == "object") {
    let o = a.lazy;
    ["middleware", "loader", "action"].forEach((c) => {
      let h = o[c], p = r[`lazy.${c}`];
      if (typeof h == "function" && p.length > 0) {
        let g = qr(p, h, () => {
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
      let h = c[pi] ?? c, p = qr(
        r[o],
        h,
        (...g) => Kv(g[0])
      );
      p && (o === "loader" && h.hydrate === !0 && (p.hydrate = !0), p[pi] = h, s[o] = p);
    }
  }), a.middleware && a.middleware.length > 0 && r.middleware.length > 0 && (s.middleware = a.middleware.map((o) => {
    let c = o[pi] ?? o, h = qr(
      r.middleware,
      c,
      (...p) => Kv(p[0])
    );
    return h ? (h[pi] = c, h) : o;
  })), s;
}
function QE(n, a) {
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
    let s = n.navigate[pi] ?? n.navigate, o = qr(
      r.navigate,
      s,
      (...c) => {
        let [h, p] = c;
        return {
          to: typeof h == "number" || typeof h == "string" ? h : h ? ha(h) : ".",
          ...Qv(n, p ?? {})
        };
      }
    );
    o && (o[pi] = s, n.navigate = o);
  }
  if (r.fetch.length > 0) {
    let s = n.fetch[pi] ?? n.fetch, o = qr(r.fetch, s, (...c) => {
      let [h, , p, g] = c;
      return {
        href: p ?? ".",
        fetcherKey: h,
        ...Qv(n, g ?? {})
      };
    });
    o && (o[pi] = s, n.fetch = o);
  }
  return n;
}
function qr(n, a, r) {
  return n.length === 0 ? null : async (...s) => {
    let o = await _b(
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
async function _b(n, a, r, s) {
  let o = n[s], c;
  if (o) {
    let h, p = async () => (h ? console.error("You cannot call instrumented handlers more than once") : h = _b(n, a, r, s - 1), c = await h, $e(c, "Expected a result"), c.type === "error" && c.value instanceof Error ? { status: "error", error: c.value } : { status: "success", error: void 0 });
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
function Kv(n) {
  let { request: a, context: r, params: s, unstable_pattern: o } = n;
  return {
    request: PE(a),
    params: { ...s },
    unstable_pattern: o,
    context: ZE(r)
  };
}
function Qv(n, a) {
  return {
    currentUrl: ha(n.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function PE(n) {
  return {
    method: n.method,
    url: n.url,
    headers: {
      get: (...a) => n.headers.get(...a)
    }
  };
}
function ZE(n) {
  if (WE(n)) {
    let a = { ...n };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => n.get(a)
    };
}
var JE = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function WE(n) {
  if (n === null || typeof n != "object")
    return !1;
  const a = Object.getPrototypeOf(n);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === JE;
}
var Db = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], eT = new Set(
  Db
), tT = [
  "GET",
  ...Db
], nT = new Set(tT), zb = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), aT = /* @__PURE__ */ new Set([307, 308]), Qd = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, iT = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Fl = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, rT = (n) => ({
  hasErrorBoundary: !!n.hasErrorBoundary
}), Ob = "remix-router-transitions", Lb = Symbol("ResetLoaderData");
function lT(n) {
  const a = n.window ? n.window : typeof window < "u" ? window : void 0, r = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  $e(
    n.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let s = n.hydrationRouteProperties || [], o = n.mapRouteProperties || rT, c = o;
  if (n.unstable_instrumentations) {
    let M = n.unstable_instrumentations;
    c = (B) => ({
      ...o(B),
      ...KE(
        M.map((I) => I.route).filter(Boolean),
        B
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
  let b = n.dataStrategy || dT, v = {
    unstable_passThroughRequests: !1,
    ...n.future
  }, S = null, w = /* @__PURE__ */ new Set(), T = null, j = null, _ = null, C = n.hydrationData != null, L = hi(p, n.history.location, m), z = !1, R = null, J, G;
  if (L == null && !n.patchRoutesOnNavigation) {
    let M = In(404, {
      pathname: n.history.location.pathname
    }), { matches: B, route: I } = Ho(p);
    J = !0, G = !J, L = B, R = { [I.id]: M };
  } else if (L && !n.hydrationData && xn(
    L,
    p,
    n.history.location.pathname
  ).active && (L = null), L)
    if (L.some((M) => M.route.lazy))
      J = !1, G = !J;
    else if (!L.some((M) => mh(M.route)))
      J = !0, G = !J;
    else {
      let M = n.hydrationData ? n.hydrationData.loaderData : null, B = n.hydrationData ? n.hydrationData.errors : null, I = L;
      if (B) {
        let se = L.findIndex(
          (ue) => B[ue.route.id] !== void 0
        );
        I = I.slice(0, se + 1);
      }
      G = !1, J = !0, I.forEach((se) => {
        let ue = Ub(se.route, M, B);
        G = G || ue.renderFallback, J = J && !ue.shouldLoad;
      });
    }
  else {
    J = !1, G = !J, L = [];
    let M = xn(
      null,
      p,
      n.history.location.pathname
    );
    M.active && M.matches && (z = !0, L = M.matches);
  }
  let W, A = {
    historyAction: n.history.action,
    location: n.history.location,
    matches: L,
    initialized: J,
    renderFallback: G,
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
  }, O = "POP", $ = null, re = !1, ae, me = !1, ge = /* @__PURE__ */ new Map(), oe = null, U = !1, V = !1, q = /* @__PURE__ */ new Set(), Q = /* @__PURE__ */ new Map(), te = 0, N = -1, K = /* @__PURE__ */ new Map(), Z = /* @__PURE__ */ new Set(), le = /* @__PURE__ */ new Map(), ce = /* @__PURE__ */ new Map(), ve = /* @__PURE__ */ new Set(), ze = /* @__PURE__ */ new Map(), _e, Be = null;
  function kt() {
    if (S = n.history.listen(
      ({ action: M, location: B, delta: I }) => {
        if (_e) {
          _e(), _e = void 0;
          return;
        }
        Nt(
          ze.size === 0 || I != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let se = ra({
          currentLocation: A.location,
          nextLocation: B,
          historyAction: M
        });
        if (se && I != null) {
          let ue = new Promise((Se) => {
            _e = Se;
          });
          n.history.go(I * -1), Pn(se, {
            state: "blocked",
            location: B,
            proceed() {
              Pn(se, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: B
              }), ue.then(() => n.history.go(I));
            },
            reset() {
              let Se = new Map(A.blockers);
              Se.set(se, Fl), je({ blockers: Se });
            }
          }), $?.resolve(), $ = null;
          return;
        }
        return at(M, B);
      }
    ), r) {
      AT(a, ge);
      let M = () => RT(a, ge);
      a.addEventListener("pagehide", M), oe = () => a.removeEventListener("pagehide", M);
    }
    return A.initialized || at("POP", A.location, {
      initialHydration: !0
    }), W;
  }
  function Ft() {
    S && S(), oe && oe(), w.clear(), ae && ae.abort(), A.fetchers.forEach((M, B) => Qn(B)), A.blockers.forEach((M, B) => pa(B));
  }
  function fe(M) {
    return w.add(M), () => w.delete(M);
  }
  function je(M, B = {}) {
    M.matches && (M.matches = M.matches.map((ue) => {
      let Se = h[ue.route.id], he = ue.route;
      return he.element !== Se.element || he.errorElement !== Se.errorElement || he.hydrateFallbackElement !== Se.hydrateFallbackElement ? {
        ...ue,
        route: Se
      } : ue;
    })), A = {
      ...A,
      ...M
    };
    let I = [], se = [];
    A.fetchers.forEach((ue, Se) => {
      ue.state === "idle" && (ve.has(Se) ? I.push(Se) : se.push(Se));
    }), ve.forEach((ue) => {
      !A.fetchers.has(ue) && !Q.has(ue) && I.push(ue);
    }), [...w].forEach(
      (ue) => ue(A, {
        deletedFetchers: I,
        newErrors: M.errors ?? null,
        viewTransitionOpts: B.viewTransitionOpts,
        flushSync: B.flushSync === !0
      })
    ), I.forEach((ue) => Qn(ue)), se.forEach((ue) => A.fetchers.delete(ue));
  }
  function Ne(M, B, { flushSync: I } = {}) {
    let se = A.actionData != null && A.navigation.formMethod != null && ln(A.navigation.formMethod) && A.navigation.state === "loading" && M.state?._isRedirect !== !0, ue;
    B.actionData ? Object.keys(B.actionData).length > 0 ? ue = B.actionData : ue = null : se ? ue = A.actionData : ue = null;
    let Se = B.loaderData ? ly(
      A.loaderData,
      B.loaderData,
      B.matches || [],
      B.errors
    ) : A.loaderData, he = A.blockers;
    he.size > 0 && (he = new Map(he), he.forEach((Re, Ce) => he.set(Ce, Fl)));
    let pe = U ? !1 : It(M, B.matches || A.matches), Ee = re === !0 || A.navigation.formMethod != null && ln(A.navigation.formMethod) && M.state?._isRedirect !== !0;
    g && (p = g, g = void 0), U || O === "POP" || (O === "PUSH" ? n.history.push(M, M.state) : O === "REPLACE" && n.history.replace(M, M.state));
    let be;
    if (O === "POP") {
      let Re = ge.get(A.location.pathname);
      Re && Re.has(M.pathname) ? be = {
        currentLocation: A.location,
        nextLocation: M
      } : ge.has(M.pathname) && (be = {
        currentLocation: M,
        nextLocation: A.location
      });
    } else if (me) {
      let Re = ge.get(A.location.pathname);
      Re ? Re.add(M.pathname) : (Re = /* @__PURE__ */ new Set([M.pathname]), ge.set(A.location.pathname, Re)), be = {
        currentLocation: A.location,
        nextLocation: M
      };
    }
    je(
      {
        ...B,
        // matches, errors, fetchers go through as-is
        actionData: ue,
        loaderData: Se,
        historyAction: O,
        location: M,
        initialized: !0,
        renderFallback: !1,
        navigation: Qd,
        revalidation: "idle",
        restoreScrollPosition: pe,
        preventScrollReset: Ee,
        blockers: he
      },
      {
        viewTransitionOpts: be,
        flushSync: I === !0
      }
    ), O = "POP", re = !1, me = !1, U = !1, V = !1, $?.resolve(), $ = null, Be?.resolve(), Be = null;
  }
  async function Me(M, B) {
    if ($?.resolve(), $ = null, typeof M == "number") {
      $ || ($ = cy());
      let ct = $.promise;
      return n.history.go(M), ct;
    }
    let I = Lf(
      A.location,
      A.matches,
      m,
      M,
      B?.fromRouteId,
      B?.relative
    ), { path: se, submission: ue, error: Se } = Pv(
      !1,
      I,
      B
    ), he;
    B?.unstable_mask && (he = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof B.unstable_mask == "string" ? aa(B.unstable_mask) : {
        ...A.location.unstable_mask,
        ...B.unstable_mask
      }
    });
    let pe = A.location, Ee = Of(
      pe,
      se,
      B && B.state,
      void 0,
      he
    );
    Ee = {
      ...Ee,
      ...n.history.encodeLocation(Ee)
    };
    let be = B && B.replace != null ? B.replace : void 0, Re = "PUSH";
    be === !0 ? Re = "REPLACE" : be === !1 || ue != null && ln(ue.formMethod) && ue.formAction === A.location.pathname + A.location.search && (Re = "REPLACE");
    let Ce = B && "preventScrollReset" in B ? B.preventScrollReset === !0 : void 0, Pe = (B && B.flushSync) === !0, He = ra({
      currentLocation: pe,
      nextLocation: Ee,
      historyAction: Re
    });
    if (He) {
      Pn(He, {
        state: "blocked",
        location: Ee,
        proceed() {
          Pn(He, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: Ee
          }), Me(M, B);
        },
        reset() {
          let ct = new Map(A.blockers);
          ct.set(He, Fl), je({ blockers: ct });
        }
      });
      return;
    }
    await at(Re, Ee, {
      submission: ue,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Se,
      preventScrollReset: Ce,
      replace: B && B.replace,
      enableViewTransition: B && B.viewTransition,
      flushSync: Pe,
      callSiteDefaultShouldRevalidate: B && B.unstable_defaultShouldRevalidate
    });
  }
  function Kt() {
    Be || (Be = cy()), et(), je({ revalidation: "loading" });
    let M = Be.promise;
    return A.navigation.state === "submitting" ? M : A.navigation.state === "idle" ? (at(A.historyAction, A.location, {
      startUninterruptedRevalidation: !0
    }), M) : (at(
      O || A.historyAction,
      A.navigation.location,
      {
        overrideNavigation: A.navigation,
        // Proxy through any rending view transition
        enableViewTransition: me === !0
      }
    ), M);
  }
  async function at(M, B, I) {
    ae && ae.abort(), ae = null, O = M, U = (I && I.startUninterruptedRevalidation) === !0, Mt(A.location, A.matches), re = (I && I.preventScrollReset) === !0, me = (I && I.enableViewTransition) === !0;
    let se = g || p, ue = I && I.overrideNavigation, Se = I?.initialHydration && A.matches && A.matches.length > 0 && !z ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      A.matches
    ) : hi(se, B, m), he = (I && I.flushSync) === !0;
    if (Se && A.initialized && !V && bT(A.location, B) && !(I && I.submission && ln(I.submission.formMethod))) {
      Ne(B, { matches: Se }, { flushSync: he });
      return;
    }
    let pe = xn(Se, se, B.pathname);
    if (pe.active && pe.matches && (Se = pe.matches), !Se) {
      let { error: rt, notFoundMatches: vt, route: Ie } = cn(
        B.pathname
      );
      Ne(
        B,
        {
          matches: vt,
          loaderData: {},
          errors: {
            [Ie.id]: rt
          }
        },
        { flushSync: he }
      );
      return;
    }
    ae = new AbortController();
    let Ee = Br(
      n.history,
      B,
      ae.signal,
      I && I.submission
    ), be = n.getContext ? await n.getContext() : new Yv(), Re;
    if (I && I.pendingError)
      Re = [
        mi(Se).route.id,
        { type: "error", error: I.pendingError }
      ];
    else if (I && I.submission && ln(I.submission.formMethod)) {
      let rt = await on(
        Ee,
        B,
        I.submission,
        Se,
        be,
        pe.active,
        I && I.initialHydration === !0,
        { replace: I.replace, flushSync: he }
      );
      if (rt.shortCircuited)
        return;
      if (rt.pendingActionResult) {
        let [vt, Ie] = rt.pendingActionResult;
        if (An(Ie) && us(Ie.error) && Ie.error.status === 404) {
          ae = null, Ne(B, {
            matches: rt.matches,
            loaderData: {},
            errors: {
              [vt]: Ie.error
            }
          });
          return;
        }
      }
      Se = rt.matches || Se, Re = rt.pendingActionResult, ue = Pd(B, I.submission), he = !1, pe.active = !1, Ee = Br(
        n.history,
        Ee.url,
        Ee.signal
      );
    }
    let {
      shortCircuited: Ce,
      matches: Pe,
      loaderData: He,
      errors: ct
    } = await Qt(
      Ee,
      B,
      Se,
      be,
      pe.active,
      ue,
      I && I.submission,
      I && I.fetcherSubmission,
      I && I.replace,
      I && I.initialHydration === !0,
      he,
      Re,
      I && I.callSiteDefaultShouldRevalidate
    );
    Ce || (ae = null, Ne(B, {
      matches: Pe || Se,
      ...sy(Re),
      loaderData: He,
      errors: ct
    }));
  }
  async function on(M, B, I, se, ue, Se, he, pe = {}) {
    et();
    let Ee = NT(B, I);
    if (je({ navigation: Ee }, { flushSync: pe.flushSync === !0 }), Se) {
      let Ce = await it(
        se,
        B.pathname,
        M.signal
      );
      if (Ce.type === "aborted")
        return { shortCircuited: !0 };
      if (Ce.type === "error") {
        if (Ce.partialMatches.length === 0) {
          let { matches: He, route: ct } = Ho(p);
          return {
            matches: He,
            pendingActionResult: [
              ct.id,
              {
                type: "error",
                error: Ce.error
              }
            ]
          };
        }
        let Pe = mi(Ce.partialMatches).route.id;
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
        se = Ce.matches;
      else {
        let { notFoundMatches: Pe, error: He, route: ct } = cn(
          B.pathname
        );
        return {
          matches: Pe,
          pendingActionResult: [
            ct.id,
            {
              type: "error",
              error: He
            }
          ]
        };
      }
    }
    let be, Re = au(se, B);
    if (!Re.route.action && !Re.route.lazy)
      be = {
        type: "error",
        error: In(405, {
          method: M.method,
          pathname: B.pathname,
          routeId: Re.route.id
        })
      };
    else {
      let Ce = Fr(
        c,
        h,
        M,
        B,
        se,
        Re,
        he ? [] : s,
        ue
      ), Pe = await Oe(
        M,
        B,
        Ce,
        ue,
        null
      );
      if (be = Pe[Re.route.id], !be) {
        for (let He of se)
          if (Pe[He.route.id]) {
            be = Pe[He.route.id];
            break;
          }
      }
      if (M.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Fi(be)) {
      let Ce;
      return pe && pe.replace != null ? Ce = pe.replace : Ce = ay(
        be.response.headers.get("Location"),
        new URL(M.url),
        m,
        n.history
      ) === A.location.pathname + A.location.search, await ye(M, be, !0, {
        submission: I,
        replace: Ce
      }), { shortCircuited: !0 };
    }
    if (An(be)) {
      let Ce = mi(se, Re.route.id);
      return (pe && pe.replace) !== !0 && (O = "PUSH"), {
        matches: se,
        pendingActionResult: [
          Ce.route.id,
          be,
          Re.route.id
        ]
      };
    }
    return {
      matches: se,
      pendingActionResult: [Re.route.id, be]
    };
  }
  async function Qt(M, B, I, se, ue, Se, he, pe, Ee, be, Re, Ce, Pe) {
    let He = Se || Pd(B, he), ct = he || pe || uy(He), rt = !U && !be;
    if (ue) {
      if (rt) {
        let Tt = bn(Ce);
        je(
          {
            navigation: He,
            ...Tt !== void 0 ? { actionData: Tt } : {}
          },
          {
            flushSync: Re
          }
        );
      }
      let qe = await it(
        I,
        B.pathname,
        M.signal
      );
      if (qe.type === "aborted")
        return { shortCircuited: !0 };
      if (qe.type === "error") {
        if (qe.partialMatches.length === 0) {
          let { matches: an, route: Rt } = Ho(p);
          return {
            matches: an,
            loaderData: {},
            errors: {
              [Rt.id]: qe.error
            }
          };
        }
        let Tt = mi(qe.partialMatches).route.id;
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
        let { error: Tt, notFoundMatches: an, route: Rt } = cn(
          B.pathname
        );
        return {
          matches: an,
          loaderData: {},
          errors: {
            [Rt.id]: Tt
          }
        };
      }
    }
    let vt = g || p, { dsMatches: Ie, revalidatingFetchers: At } = Zv(
      M,
      se,
      c,
      h,
      n.history,
      A,
      I,
      ct,
      B,
      be ? [] : s,
      be === !0,
      V,
      q,
      ve,
      le,
      Z,
      vt,
      m,
      n.patchRoutesOnNavigation != null,
      Ce,
      Pe
    );
    if (N = ++te, !n.dataStrategy && !Ie.some((qe) => qe.shouldLoad) && !Ie.some(
      (qe) => qe.route.middleware && qe.route.middleware.length > 0
    ) && At.length === 0) {
      let qe = Ji();
      return Ne(
        B,
        {
          matches: I,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Ce && An(Ce[1]) ? { [Ce[0]]: Ce[1].error } : null,
          ...sy(Ce),
          ...qe ? { fetchers: new Map(A.fetchers) } : {}
        },
        { flushSync: Re }
      ), { shortCircuited: !0 };
    }
    if (rt) {
      let qe = {};
      if (!ue) {
        qe.navigation = He;
        let Tt = bn(Ce);
        Tt !== void 0 && (qe.actionData = Tt);
      }
      At.length > 0 && (qe.fetchers = ma(At)), je(qe, { flushSync: Re });
    }
    At.forEach((qe) => {
      Et(qe.key), qe.controller && Q.set(qe.key, qe.controller);
    });
    let ht = () => At.forEach((qe) => Et(qe.key));
    ae && ae.signal.addEventListener(
      "abort",
      ht
    );
    let { loaderResults: Ha, fetcherResults: Zn } = await Qe(
      Ie,
      At,
      M,
      B,
      se
    );
    if (M.signal.aborted)
      return { shortCircuited: !0 };
    ae && ae.signal.removeEventListener(
      "abort",
      ht
    ), At.forEach((qe) => Q.delete(qe.key));
    let Gt = qo(Ha);
    if (Gt)
      return await ye(M, Gt.result, !0, {
        replace: Ee
      }), { shortCircuited: !0 };
    if (Gt = qo(Zn), Gt)
      return Z.add(Gt.key), await ye(M, Gt.result, !0, {
        replace: Ee
      }), { shortCircuited: !0 };
    let { loaderData: la, errors: Ti } = ry(
      A,
      I,
      Ha,
      Ce,
      At,
      Zn
    );
    be && A.errors && (Ti = { ...A.errors, ...Ti });
    let sa = Ji(), ji = Ba(N), Wi = sa || ji || At.length > 0;
    return {
      matches: I,
      loaderData: la,
      errors: Ti,
      ...Wi ? { fetchers: new Map(A.fetchers) } : {}
    };
  }
  function bn(M) {
    if (M && !An(M[1]))
      return {
        [M[0]]: M[1].data
      };
    if (A.actionData)
      return Object.keys(A.actionData).length === 0 ? null : A.actionData;
  }
  function ma(M) {
    return M.forEach((B) => {
      let I = A.fetchers.get(B.key), se = Gl(
        void 0,
        I ? I.data : void 0
      );
      A.fetchers.set(B.key, se);
    }), new Map(A.fetchers);
  }
  async function Vt(M, B, I, se) {
    Et(M);
    let ue = (se && se.flushSync) === !0, Se = g || p, he = Lf(
      A.location,
      A.matches,
      m,
      I,
      B,
      se?.relative
    ), pe = hi(Se, he, m), Ee = xn(pe, Se, he);
    if (Ee.active && Ee.matches && (pe = Ee.matches), !pe) {
      qt(
        M,
        B,
        In(404, { pathname: he }),
        { flushSync: ue }
      );
      return;
    }
    let { path: be, submission: Re, error: Ce } = Pv(
      !0,
      he,
      se
    );
    if (Ce) {
      qt(M, B, Ce, { flushSync: ue });
      return;
    }
    let Pe = n.getContext ? await n.getContext() : new Yv(), He = (se && se.preventScrollReset) === !0;
    if (Re && ln(Re.formMethod)) {
      await Dn(
        M,
        B,
        be,
        pe,
        Pe,
        Ee.active,
        ue,
        He,
        Re,
        se && se.unstable_defaultShouldRevalidate
      );
      return;
    }
    le.set(M, { routeId: B, path: be }), await Bt(
      M,
      B,
      be,
      pe,
      Pe,
      Ee.active,
      ue,
      He,
      Re
    );
  }
  async function Dn(M, B, I, se, ue, Se, he, pe, Ee, be) {
    et(), le.delete(M);
    let Re = A.fetchers.get(M);
    Ht(M, MT(Ee, Re), {
      flushSync: he
    });
    let Ce = new AbortController(), Pe = Br(
      n.history,
      I,
      Ce.signal,
      Ee
    );
    if (Se) {
      let mt = await it(
        se,
        new URL(Pe.url).pathname,
        Pe.signal,
        M
      );
      if (mt.type === "aborted")
        return;
      if (mt.type === "error") {
        qt(M, B, mt.error, { flushSync: he });
        return;
      } else if (mt.matches)
        se = mt.matches;
      else {
        qt(
          M,
          B,
          In(404, { pathname: I }),
          { flushSync: he }
        );
        return;
      }
    }
    let He = au(se, I);
    if (!He.route.action && !He.route.lazy) {
      let mt = In(405, {
        method: Ee.formMethod,
        pathname: I,
        routeId: B
      });
      qt(M, B, mt, { flushSync: he });
      return;
    }
    Q.set(M, Ce);
    let ct = te, rt = Fr(
      c,
      h,
      Pe,
      I,
      se,
      He,
      s,
      ue
    ), vt = await Oe(
      Pe,
      I,
      rt,
      ue,
      M
    ), Ie = vt[He.route.id];
    if (!Ie) {
      for (let mt of rt)
        if (vt[mt.route.id]) {
          Ie = vt[mt.route.id];
          break;
        }
    }
    if (Pe.signal.aborted) {
      Q.get(M) === Ce && Q.delete(M);
      return;
    }
    if (ve.has(M)) {
      if (Fi(Ie) || An(Ie)) {
        Ht(M, Oa(void 0));
        return;
      }
    } else {
      if (Fi(Ie))
        if (Q.delete(M), N > ct) {
          Ht(M, Oa(void 0));
          return;
        } else
          return Z.add(M), Ht(M, Gl(Ee)), ye(Pe, Ie, !1, {
            fetcherSubmission: Ee,
            preventScrollReset: pe
          });
      if (An(Ie)) {
        qt(M, B, Ie.error);
        return;
      }
    }
    let At = A.navigation.location || A.location, ht = Br(
      n.history,
      At,
      Ce.signal
    ), Ha = g || p, Zn = A.navigation.state !== "idle" ? hi(Ha, A.navigation.location, m) : A.matches;
    $e(Zn, "Didn't find any matches after fetcher action");
    let Gt = ++te;
    K.set(M, Gt);
    let la = Gl(Ee, Ie.data);
    A.fetchers.set(M, la);
    let { dsMatches: Ti, revalidatingFetchers: sa } = Zv(
      ht,
      ue,
      c,
      h,
      n.history,
      A,
      Zn,
      Ee,
      At,
      s,
      !1,
      V,
      q,
      ve,
      le,
      Z,
      Ha,
      m,
      n.patchRoutesOnNavigation != null,
      [He.route.id, Ie],
      be
    );
    sa.filter((mt) => mt.key !== M).forEach((mt) => {
      let er = mt.key, tr = A.fetchers.get(er), Ms = Gl(
        void 0,
        tr ? tr.data : void 0
      );
      A.fetchers.set(er, Ms), Et(er), mt.controller && Q.set(er, mt.controller);
    }), je({ fetchers: new Map(A.fetchers) });
    let ji = () => sa.forEach((mt) => Et(mt.key));
    Ce.signal.addEventListener(
      "abort",
      ji
    );
    let { loaderResults: Wi, fetcherResults: qe } = await Qe(
      Ti,
      sa,
      ht,
      At,
      ue
    );
    if (Ce.signal.aborted)
      return;
    if (Ce.signal.removeEventListener(
      "abort",
      ji
    ), K.delete(M), Q.delete(M), sa.forEach((mt) => Q.delete(mt.key)), A.fetchers.has(M)) {
      let mt = Oa(Ie.data);
      A.fetchers.set(M, mt);
    }
    let Tt = qo(Wi);
    if (Tt)
      return ye(
        ht,
        Tt.result,
        !1,
        { preventScrollReset: pe }
      );
    if (Tt = qo(qe), Tt)
      return Z.add(Tt.key), ye(
        ht,
        Tt.result,
        !1,
        { preventScrollReset: pe }
      );
    let { loaderData: an, errors: Rt } = ry(
      A,
      Zn,
      Wi,
      void 0,
      sa,
      qe
    );
    Ba(Gt), A.navigation.state === "loading" && Gt > N ? ($e(O, "Expected pending action"), ae && ae.abort(), Ne(A.navigation.location, {
      matches: Zn,
      loaderData: an,
      errors: Rt,
      fetchers: new Map(A.fetchers)
    })) : (je({
      errors: Rt,
      loaderData: ly(
        A.loaderData,
        an,
        Zn,
        Rt
      ),
      fetchers: new Map(A.fetchers)
    }), V = !1);
  }
  async function Bt(M, B, I, se, ue, Se, he, pe, Ee) {
    let be = A.fetchers.get(M);
    Ht(
      M,
      Gl(
        Ee,
        be ? be.data : void 0
      ),
      { flushSync: he }
    );
    let Re = new AbortController(), Ce = Br(
      n.history,
      I,
      Re.signal
    );
    if (Se) {
      let Ie = await it(
        se,
        new URL(Ce.url).pathname,
        Ce.signal,
        M
      );
      if (Ie.type === "aborted")
        return;
      if (Ie.type === "error") {
        qt(M, B, Ie.error, { flushSync: he });
        return;
      } else if (Ie.matches)
        se = Ie.matches;
      else {
        qt(
          M,
          B,
          In(404, { pathname: I }),
          { flushSync: he }
        );
        return;
      }
    }
    let Pe = au(se, I);
    Q.set(M, Re);
    let He = te, ct = Fr(
      c,
      h,
      Ce,
      I,
      se,
      Pe,
      s,
      ue
    ), rt = await Oe(
      Ce,
      I,
      ct,
      ue,
      M
    ), vt = rt[Pe.route.id];
    if (!vt) {
      for (let Ie of se)
        if (rt[Ie.route.id]) {
          vt = rt[Ie.route.id];
          break;
        }
    }
    if (Q.get(M) === Re && Q.delete(M), !Ce.signal.aborted) {
      if (ve.has(M)) {
        Ht(M, Oa(void 0));
        return;
      }
      if (Fi(vt))
        if (N > He) {
          Ht(M, Oa(void 0));
          return;
        } else {
          Z.add(M), await ye(Ce, vt, !1, {
            preventScrollReset: pe
          });
          return;
        }
      if (An(vt)) {
        qt(M, B, vt.error);
        return;
      }
      Ht(M, Oa(vt.data));
    }
  }
  async function ye(M, B, I, {
    submission: se,
    fetcherSubmission: ue,
    preventScrollReset: Se,
    replace: he
  } = {}) {
    I || ($?.resolve(), $ = null), B.response.headers.has("X-Remix-Revalidate") && (V = !0);
    let pe = B.response.headers.get("Location");
    $e(pe, "Expected a Location header on the redirect Response"), pe = ay(
      pe,
      new URL(M.url),
      m,
      n.history
    );
    let Ee = Of(A.location, pe, {
      _isRedirect: !0
    });
    if (r) {
      let ct = !1;
      if (B.response.headers.has("X-Remix-Reload-Document"))
        ct = !0;
      else if (dh(pe)) {
        const rt = EE(pe, !0);
        ct = // Hard reload if it's an absolute URL to a new origin
        rt.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        Xn(rt.pathname, m) == null;
      }
      if (ct) {
        he ? a.location.replace(pe) : a.location.assign(pe);
        return;
      }
    }
    ae = null;
    let be = he === !0 || B.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Re, formAction: Ce, formEncType: Pe } = A.navigation;
    !se && !ue && Re && Ce && Pe && (se = uy(A.navigation));
    let He = se || ue;
    if (aT.has(B.response.status) && He && ln(He.formMethod))
      await at(be, Ee, {
        submission: {
          ...He,
          formAction: pe
        },
        // Preserve these flags across redirects
        preventScrollReset: Se || re,
        enableViewTransition: I ? me : void 0
      });
    else {
      let ct = Pd(
        Ee,
        se
      );
      await at(be, Ee, {
        overrideNavigation: ct,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: ue,
        // Preserve these flags across redirects
        preventScrollReset: Se || re,
        enableViewTransition: I ? me : void 0
      });
    }
  }
  async function Oe(M, B, I, se, ue) {
    let Se, he = {};
    try {
      Se = await hT(
        b,
        M,
        B,
        I,
        ue,
        se,
        !1
      );
    } catch (pe) {
      return I.filter((Ee) => Ee.shouldLoad).forEach((Ee) => {
        he[Ee.route.id] = {
          type: "error",
          error: pe
        };
      }), he;
    }
    if (M.signal.aborted)
      return he;
    if (!ln(M.method))
      for (let pe of I) {
        if (Se[pe.route.id]?.type === "error")
          break;
        !Se.hasOwnProperty(pe.route.id) && !A.loaderData.hasOwnProperty(pe.route.id) && (!A.errors || !A.errors.hasOwnProperty(pe.route.id)) && pe.shouldCallHandler() && (Se[pe.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${pe.route.id}`
          )
        });
      }
    for (let [pe, Ee] of Object.entries(Se))
      if (ET(Ee)) {
        let be = Ee.result;
        he[pe] = {
          type: "redirect",
          response: vT(
            be,
            M,
            pe,
            I,
            m
          )
        };
      } else
        he[pe] = await gT(Ee);
    return he;
  }
  async function Qe(M, B, I, se, ue) {
    let Se = Oe(
      I,
      se,
      M,
      ue,
      null
    ), he = Promise.all(
      B.map(async (be) => {
        if (be.matches && be.match && be.request && be.controller) {
          let Ce = (await Oe(
            be.request,
            be.path,
            be.matches,
            ue,
            be.key
          ))[be.match.route.id];
          return { [be.key]: Ce };
        } else
          return Promise.resolve({
            [be.key]: {
              type: "error",
              error: In(404, {
                pathname: be.path
              })
            }
          });
      })
    ), pe = await Se, Ee = (await he).reduce(
      (be, Re) => Object.assign(be, Re),
      {}
    );
    return {
      loaderResults: pe,
      fetcherResults: Ee
    };
  }
  function et() {
    V = !0, le.forEach((M, B) => {
      Q.has(B) && q.add(B), Et(B);
    });
  }
  function Ht(M, B, I = {}) {
    A.fetchers.set(M, B), je(
      { fetchers: new Map(A.fetchers) },
      { flushSync: (I && I.flushSync) === !0 }
    );
  }
  function qt(M, B, I, se = {}) {
    let ue = mi(A.matches, B);
    Qn(M), je(
      {
        errors: {
          [ue.route.id]: I
        },
        fetchers: new Map(A.fetchers)
      },
      { flushSync: (se && se.flushSync) === !0 }
    );
  }
  function Ei(M) {
    return ce.set(M, (ce.get(M) || 0) + 1), ve.has(M) && ve.delete(M), A.fetchers.get(M) || iT;
  }
  function ia(M, B) {
    Et(M, B?.reason), Ht(M, Oa(null));
  }
  function Qn(M) {
    let B = A.fetchers.get(M);
    Q.has(M) && !(B && B.state === "loading" && K.has(M)) && Et(M), le.delete(M), K.delete(M), Z.delete(M), ve.delete(M), q.delete(M), A.fetchers.delete(M);
  }
  function Pt(M) {
    let B = (ce.get(M) || 0) - 1;
    B <= 0 ? (ce.delete(M), ve.add(M)) : ce.set(M, B), je({ fetchers: new Map(A.fetchers) });
  }
  function Et(M, B) {
    let I = Q.get(M);
    I && (I.abort(B), Q.delete(M));
  }
  function $t(M) {
    for (let B of M) {
      let I = Ei(B), se = Oa(I.data);
      A.fetchers.set(B, se);
    }
  }
  function Ji() {
    let M = [], B = !1;
    for (let I of Z) {
      let se = A.fetchers.get(I);
      $e(se, `Expected fetcher: ${I}`), se.state === "loading" && (Z.delete(I), M.push(I), B = !0);
    }
    return $t(M), B;
  }
  function Ba(M) {
    let B = [];
    for (let [I, se] of K)
      if (se < M) {
        let ue = A.fetchers.get(I);
        $e(ue, `Expected fetcher: ${I}`), ue.state === "loading" && (Et(I), K.delete(I), B.push(I));
      }
    return $t(B), B.length > 0;
  }
  function zn(M, B) {
    let I = A.blockers.get(M) || Fl;
    return ze.get(M) !== B && ze.set(M, B), I;
  }
  function pa(M) {
    A.blockers.delete(M), ze.delete(M);
  }
  function Pn(M, B) {
    let I = A.blockers.get(M) || Fl;
    $e(
      I.state === "unblocked" && B.state === "blocked" || I.state === "blocked" && B.state === "blocked" || I.state === "blocked" && B.state === "proceeding" || I.state === "blocked" && B.state === "unblocked" || I.state === "proceeding" && B.state === "unblocked",
      `Invalid blocker state transition: ${I.state} -> ${B.state}`
    );
    let se = new Map(A.blockers);
    se.set(M, B), je({ blockers: se });
  }
  function ra({
    currentLocation: M,
    nextLocation: B,
    historyAction: I
  }) {
    if (ze.size === 0)
      return;
    ze.size > 1 && Nt(!1, "A router only supports one blocker at a time");
    let se = Array.from(ze.entries()), [ue, Se] = se[se.length - 1], he = A.blockers.get(ue);
    if (!(he && he.state === "proceeding") && Se({ currentLocation: M, nextLocation: B, historyAction: I }))
      return ue;
  }
  function cn(M) {
    let B = In(404, { pathname: M }), I = g || p, { matches: se, route: ue } = Ho(I);
    return { notFoundMatches: se, route: ue, error: B };
  }
  function Le(M, B, I) {
    if (T = M, _ = B, j = I || null, !C && A.navigation === Qd) {
      C = !0;
      let se = It(A.location, A.matches);
      se != null && je({ restoreScrollPosition: se });
    }
    return () => {
      T = null, _ = null, j = null;
    };
  }
  function ut(M, B) {
    return j && j(
      M,
      B.map((se) => AE(se, A.loaderData))
    ) || M.key;
  }
  function Mt(M, B) {
    if (T && _) {
      let I = ut(M, B);
      T[I] = _();
    }
  }
  function It(M, B) {
    if (T) {
      let I = ut(M, B), se = T[I];
      if (typeof se == "number")
        return se;
    }
    return null;
  }
  function xn(M, B, I) {
    if (n.patchRoutesOnNavigation)
      if (M) {
        if (Object.keys(M[0].params).length > 0)
          return { active: !0, matches: es(
            B,
            I,
            m,
            !0
          ) };
      } else
        return { active: !0, matches: es(
          B,
          I,
          m,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function it(M, B, I, se) {
    if (!n.patchRoutesOnNavigation)
      return { type: "success", matches: M };
    let ue = M;
    for (; ; ) {
      let Se = g == null, he = g || p, pe = h;
      try {
        await n.patchRoutesOnNavigation({
          signal: I,
          path: B,
          matches: ue,
          fetcherKey: se,
          patch: (Re, Ce) => {
            I.aborted || Jv(
              Re,
              Ce,
              he,
              pe,
              c,
              !1
            );
          }
        });
      } catch (Re) {
        return { type: "error", error: Re, partialMatches: ue };
      } finally {
        Se && !I.aborted && (p = [...p]);
      }
      if (I.aborted)
        return { type: "aborted" };
      let Ee = hi(he, B, m), be = null;
      if (Ee) {
        if (Object.keys(Ee[0].params).length === 0)
          return { type: "success", matches: Ee };
        if (be = es(
          he,
          B,
          m,
          !0
        ), !(be && ue.length < be.length && Zt(
          ue,
          be.slice(0, ue.length)
        )))
          return { type: "success", matches: Ee };
      }
      if (be || (be = es(
        he,
        B,
        m,
        !0
      )), !be || Zt(ue, be))
        return { type: "success", matches: null };
      ue = be;
    }
  }
  function Zt(M, B) {
    return M.length === B.length && M.every((I, se) => I.route.id === B[se].route.id);
  }
  function ga(M) {
    h = {}, g = os(
      M,
      c,
      void 0,
      h
    );
  }
  function nn(M, B, I = !1) {
    let se = g == null;
    Jv(
      M,
      B,
      g || p,
      h,
      c,
      I
    ), se && (p = [...p], je({}));
  }
  return W = {
    get basename() {
      return m;
    },
    get future() {
      return v;
    },
    get state() {
      return A;
    },
    get routes() {
      return p;
    },
    get window() {
      return a;
    },
    initialize: kt,
    subscribe: fe,
    enableScrollRestoration: Le,
    navigate: Me,
    fetch: Vt,
    revalidate: Kt,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (M) => n.history.createHref(M),
    encodeLocation: (M) => n.history.encodeLocation(M),
    getFetcher: Ei,
    resetFetcher: ia,
    deleteFetcher: Pt,
    dispose: Ft,
    getBlocker: zn,
    deleteBlocker: pa,
    patchRoutes: nn,
    _internalFetchControllers: Q,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: ga,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(M) {
      je(M);
    }
  }, n.unstable_instrumentations && (W = QE(
    W,
    n.unstable_instrumentations.map((M) => M.router).filter(Boolean)
  )), W;
}
function sT(n) {
  return n != null && ("formData" in n && n.formData != null || "body" in n && n.body !== void 0);
}
function Lf(n, a, r, s, o, c) {
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
    fh(h),
    Xn(n.pathname, r) || n.pathname,
    c === "path"
  );
  if (s == null && (g.search = n.search, g.hash = n.hash), (s == null || s === "" || s === ".") && p) {
    let m = gh(g.search);
    if (p.route.index && !m)
      g.search = g.search ? g.search.replace(/^\?/, "?index&") : "?index";
    else if (!p.route.index && m) {
      let b = new URLSearchParams(g.search), v = b.getAll("index");
      b.delete("index"), v.filter((w) => w).forEach((w) => b.append("index", w));
      let S = b.toString();
      g.search = S ? `?${S}` : "";
    }
  }
  return r !== "/" && (g.pathname = $E({ basename: r, pathname: g.pathname })), ha(g);
}
function Pv(n, a, r) {
  if (!r || !sT(r))
    return { path: a };
  if (r.formMethod && !CT(r.formMethod))
    return {
      path: a,
      error: In(405, { method: r.formMethod })
    };
  let s = () => ({
    path: a,
    error: In(400, { type: "invalid-body" })
  }), c = (r.formMethod || "get").toUpperCase(), h = Ib(a);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!ln(c))
        return s();
      let v = typeof r.body == "string" ? r.body : r.body instanceof FormData || r.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(r.body.entries()).reduce(
          (S, [w, T]) => `${S}${w}=${T}
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
      if (!ln(c))
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
    p = kf(r.formData), g = r.formData;
  else if (r.body instanceof FormData)
    p = kf(r.body), g = r.body;
  else if (r.body instanceof URLSearchParams)
    p = r.body, g = iy(p);
  else if (r.body == null)
    p = new URLSearchParams(), g = new FormData();
  else
    try {
      p = new URLSearchParams(r.body), g = iy(p);
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
  if (ln(m.formMethod))
    return { path: a, submission: m };
  let b = aa(a);
  return n && b.search && gh(b.search) && p.append("index", ""), b.search = `?${p}`, { path: ha(b), submission: m };
}
function Zv(n, a, r, s, o, c, h, p, g, m, b, v, S, w, T, j, _, C, L, z, R) {
  let J = z ? An(z[1]) ? z[1].error : z[1].data : void 0, G = o.createURL(c.location), W = o.createURL(g), A;
  if (b && c.errors) {
    let oe = Object.keys(c.errors)[0];
    A = h.findIndex((U) => U.route.id === oe);
  } else if (z && An(z[1])) {
    let oe = z[0];
    A = h.findIndex((U) => U.route.id === oe) - 1;
  }
  let O = z ? z[1].statusCode : void 0, $ = O && O >= 400, re = {
    currentUrl: G,
    currentParams: c.matches[0]?.params || {},
    nextUrl: W,
    nextParams: h[0].params,
    ...p,
    actionResult: J,
    actionStatus: O
  }, ae = vs(h), me = h.map((oe, U) => {
    let { route: V } = oe, q = null;
    if (A != null && U > A)
      q = !1;
    else if (V.lazy)
      q = !0;
    else if (!mh(V))
      q = !1;
    else if (b) {
      let { shouldLoad: K } = Ub(
        V,
        c.loaderData,
        c.errors
      );
      q = K;
    } else oT(c.loaderData, c.matches[U], oe) && (q = !0);
    if (q !== null)
      return Uf(
        r,
        s,
        n,
        g,
        ae,
        oe,
        m,
        a,
        q
      );
    let Q = !1;
    typeof R == "boolean" ? Q = R : $ ? Q = !1 : (v || G.pathname + G.search === W.pathname + W.search || G.search !== W.search || uT(c.matches[U], oe)) && (Q = !0);
    let te = {
      ...re,
      defaultShouldRevalidate: Q
    }, N = is(oe, te);
    return Uf(
      r,
      s,
      n,
      g,
      ae,
      oe,
      m,
      a,
      N,
      te,
      R
    );
  }), ge = [];
  return T.forEach((oe, U) => {
    if (b || !h.some((le) => le.route.id === oe.routeId) || w.has(U))
      return;
    let V = c.fetchers.get(U), q = V && V.state !== "idle" && V.data === void 0, Q = hi(_, oe.path, C);
    if (!Q) {
      if (L && q)
        return;
      ge.push({
        key: U,
        routeId: oe.routeId,
        path: oe.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (j.has(U))
      return;
    let te = au(Q, oe.path), N = new AbortController(), K = Br(
      o,
      oe.path,
      N.signal
    ), Z = null;
    if (S.has(U))
      S.delete(U), Z = Fr(
        r,
        s,
        K,
        oe.path,
        Q,
        te,
        m,
        a
      );
    else if (q)
      v && (Z = Fr(
        r,
        s,
        K,
        oe.path,
        Q,
        te,
        m,
        a
      ));
    else {
      let le;
      typeof R == "boolean" ? le = R : $ ? le = !1 : le = v;
      let ce = {
        ...re,
        defaultShouldRevalidate: le
      };
      is(te, ce) && (Z = Fr(
        r,
        s,
        K,
        oe.path,
        Q,
        te,
        m,
        a,
        ce
      ));
    }
    Z && ge.push({
      key: U,
      routeId: oe.routeId,
      path: oe.path,
      matches: Z,
      match: te,
      request: K,
      controller: N
    });
  }), { dsMatches: me, revalidatingFetchers: ge };
}
function mh(n) {
  return n.loader != null || n.middleware != null && n.middleware.length > 0;
}
function Ub(n, a, r) {
  if (n.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!mh(n))
    return { shouldLoad: !1, renderFallback: !1 };
  let s = a != null && n.id in a, o = r != null && r[n.id] !== void 0;
  if (!s && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof n.loader == "function" && n.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !s };
  let c = !s && !o;
  return { shouldLoad: c, renderFallback: c };
}
function oT(n, a, r) {
  let s = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    r.route.id !== a.route.id
  ), o = !n.hasOwnProperty(r.route.id);
  return s || o;
}
function uT(n, a) {
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
function Jv(n, a, r, s, o, c) {
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
      (v) => kb(m, v)
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
function kb(n, a) {
  return "id" in n && "id" in a && n.id === a.id ? !0 : n.index === a.index && n.path === a.path && n.caseSensitive === a.caseSensitive ? (!n.children || n.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : n.children?.every(
    (r, s) => a.children?.some((o) => kb(r, o))
  ) ?? !1 : !1;
}
var Wv = /* @__PURE__ */ new WeakMap(), Vb = ({
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
  let h = Wv.get(o);
  h || (h = {}, Wv.set(o, h));
  let p = h[n];
  if (p)
    return p;
  let g = (async () => {
    let m = jE(n), v = o[n] !== void 0 && n !== "hasErrorBoundary";
    if (m)
      Nt(
        !m,
        "Route property " + n + " is not a supported lazy route property. This property will be ignored."
      ), h[n] = Promise.resolve();
    else if (v)
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
  return h[n] = g, g;
}, ey = /* @__PURE__ */ new WeakMap();
function cT(n, a, r, s, o) {
  let c = r[n.id];
  if ($e(c, "No route found in manifest"), !n.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof n.lazy == "function") {
    let b = ey.get(c);
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
      for (let T in S) {
        let j = S[T];
        if (j === void 0)
          continue;
        let _ = NE(T), L = c[T] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        T !== "hasErrorBoundary";
        _ ? Nt(
          !_,
          "Route property " + T + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : L ? Nt(
          !L,
          `Route "${c.id}" has a static property "${T}" defined but its lazy function is also returning a value for this property. The lazy route property "${T}" will be ignored.`
        ) : w[T] = j;
      }
      Object.assign(c, w), Object.assign(c, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...s(c),
        lazy: void 0
      });
    })();
    return ey.set(c, v), v.catch(() => {
    }), {
      lazyRoutePromise: v,
      lazyHandlerPromise: v
    };
  }
  let h = Object.keys(n.lazy), p = [], g;
  for (let b of h) {
    if (o && o.includes(b))
      continue;
    let v = Vb({
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
async function ty(n) {
  let a = n.matches.filter((o) => o.shouldLoad), r = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, c) => {
    r[a[c].route.id] = o;
  }), r;
}
async function dT(n) {
  return n.matches.some((a) => a.route.middleware) ? Bb(n, () => ty(n)) : ty(n);
}
function Bb(n, a) {
  return fT(
    n,
    a,
    (s) => {
      if (jT(s))
        throw s;
      return s;
    },
    ST,
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
      ), g = mi(
        h,
        h[p].route.id
      ).route.id;
      return Promise.resolve({
        [g]: { type: "error", result: s }
      });
    }
  }
}
async function fT(n, a, r, s, o) {
  let { matches: c, ...h } = n, p = c.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((b) => [m.route.id, b]) : []
  );
  return await Hb(
    h,
    p,
    a,
    r,
    s,
    o
  );
}
async function Hb(n, a, r, s, o, c, h = 0) {
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
      return v = { value: await Hb(
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
    let w = await b(n, S), T = w != null ? s(w) : void 0;
    return o(T) ? T : v ? T ?? v.value : (v = { value: await S() }, v.value);
  } catch (w) {
    return await c(w, m, v);
  }
}
function qb(n, a, r, s, o) {
  let c = Vb({
    key: "middleware",
    route: s.route,
    manifest: a,
    mapRouteProperties: n
  }), h = cT(
    s.route,
    ln(r.method) ? "action" : "loader",
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
function Uf(n, a, r, s, o, c, h, p, g, m = null, b) {
  let v = !1, S = qb(
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
      let { lazy: T, loader: j, middleware: _ } = c.route, C = v || g || w && !ln(r.method) && (T || j), L = _ && _.length > 0 && !j && !T;
      return C && (ln(r.method) || !L) ? mT({
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
function Fr(n, a, r, s, o, c, h, p, g = null) {
  return o.map((m) => m.route.id !== c.route.id ? {
    ...m,
    shouldLoad: !1,
    shouldRevalidateArgs: g,
    shouldCallHandler: () => !1,
    _lazyPromises: qb(
      n,
      a,
      r,
      m,
      h
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Uf(
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
async function hT(n, a, r, s, o, c, h) {
  s.some((b) => b._lazyPromises?.middleware) && await Promise.all(s.map((b) => b._lazyPromises?.middleware));
  let p = {
    request: a,
    unstable_url: $b(a, r),
    unstable_pattern: vs(s),
    params: s[0].params,
    context: c,
    matches: s
  }, m = await n({
    ...p,
    fetcherKey: o,
    runClientMiddleware: (b) => {
      let v = p;
      return Bb(v, () => b({
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
async function mT({
  request: n,
  path: a,
  unstable_pattern: r,
  match: s,
  lazyHandlerPromise: o,
  lazyRoutePromise: c,
  handlerOverride: h,
  scopedContext: p
}) {
  let g, m, b = ln(n.method), v = b ? "action" : "loader", S = (w) => {
    let T, j = new Promise((L, z) => T = z);
    m = () => T(), n.signal.addEventListener("abort", m);
    let _ = (L) => typeof w != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${v}" [routeId: ${s.route.id}]`
      )
    ) : w(
      {
        request: n,
        unstable_url: $b(n, a),
        unstable_pattern: r,
        params: s.params,
        context: p
      },
      ...L !== void 0 ? [L] : []
    ), C = (async () => {
      try {
        return { type: "data", result: await (h ? h((z) => _(z)) : _()) };
      } catch (L) {
        return { type: "error", result: L };
      }
    })();
    return Promise.race([C, j]);
  };
  try {
    let w = b ? s.route.action : s.route.loader;
    if (o || c)
      if (w) {
        let T, [j] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          S(w).catch((_) => {
            T = _;
          }),
          // Ensure all lazy route promises are resolved before continuing
          o,
          c
        ]);
        if (T !== void 0)
          throw T;
        g = j;
      } else {
        await o;
        let T = b ? s.route.action : s.route.loader;
        if (T)
          [g] = await Promise.all([S(T), c]);
        else if (v === "action") {
          let j = new URL(n.url), _ = j.pathname + j.search;
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
      let T = new URL(n.url), j = T.pathname + T.search;
      throw In(404, {
        pathname: j
      });
    }
  } catch (w) {
    return { type: "error", result: w };
  } finally {
    m && n.signal.removeEventListener("abort", m);
  }
  return g;
}
async function pT(n) {
  let a = n.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? n.body == null ? null : n.json() : n.text();
}
async function gT(n) {
  let { result: a, type: r } = n;
  if (ph(a)) {
    let s;
    try {
      s = await pT(a);
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
  return r === "error" ? oy(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: xT(a),
    statusCode: us(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: us(a) ? a.status : void 0
  } : oy(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function vT(n, a, r, s, o) {
  let c = n.headers.get("Location");
  if ($e(
    c,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !dh(c)) {
    let h = s.slice(
      0,
      s.findIndex((p) => p.route.id === r) + 1
    );
    c = Lf(
      new URL(a.url),
      h,
      o,
      c
    ), n.headers.set("Location", c);
  }
  return n;
}
var ny = [
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
function ay(n, a, r, s) {
  if (dh(n)) {
    let o = n, c = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (ny.includes(c.protocol))
      throw new Error("Invalid redirect location");
    let h = Xn(c.pathname, r) != null;
    if (c.origin === a.origin && h)
      return hh(c.pathname) + c.search + c.hash;
  }
  try {
    let o = s.createURL(n);
    if (ny.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return n;
}
function Br(n, a, r, s) {
  let o = n.createURL(Ib(a)).toString(), c = { signal: r };
  if (s && ln(s.formMethod)) {
    let { formMethod: h, formEncType: p } = s;
    c.method = h.toUpperCase(), p === "application/json" ? (c.headers = new Headers({ "Content-Type": p }), c.body = JSON.stringify(s.json)) : p === "text/plain" ? c.body = s.text : p === "application/x-www-form-urlencoded" && s.formData ? c.body = kf(s.formData) : c.body = s.formData;
  }
  return new Request(o, c);
}
function $b(n, a) {
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
function kf(n) {
  let a = new URLSearchParams();
  for (let [r, s] of n.entries())
    a.append(r, typeof s == "string" ? s : s.name);
  return a;
}
function iy(n) {
  let a = new FormData();
  for (let [r, s] of n.entries())
    a.append(r, s);
  return a;
}
function yT(n, a, r, s = !1, o = !1) {
  let c = {}, h = null, p, g = !1, m = {}, b = r && An(r[1]) ? r[1].error : void 0;
  return n.forEach((v) => {
    if (!(v.route.id in a))
      return;
    let S = v.route.id, w = a[S];
    if ($e(
      !Fi(w),
      "Cannot handle redirect results in processLoaderData"
    ), An(w)) {
      let T = w.error;
      if (b !== void 0 && (T = b, b = void 0), h = h || {}, o)
        h[S] = T;
      else {
        let j = mi(n, S);
        h[j.route.id] == null && (h[j.route.id] = T);
      }
      s || (c[S] = Lb), g || (g = !0, p = us(w.error) ? w.error.status : 500), w.headers && (m[S] = w.headers);
    } else
      c[S] = w.data, w.statusCode && w.statusCode !== 200 && !g && (p = w.statusCode), w.headers && (m[S] = w.headers);
  }), b !== void 0 && r && (h = { [r[0]]: b }, r[2] && (c[r[2]] = void 0)), {
    loaderData: c,
    errors: h,
    statusCode: p || 200,
    loaderHeaders: m
  };
}
function ry(n, a, r, s, o, c) {
  let { loaderData: h, errors: p } = yT(
    a,
    r,
    s
  );
  return o.filter((g) => !g.matches || g.matches.some((m) => m.shouldLoad)).forEach((g) => {
    let { key: m, match: b, controller: v } = g;
    if (v && v.signal.aborted)
      return;
    let S = c[m];
    if ($e(S, "Did not find corresponding fetcher result"), An(S)) {
      let w = mi(n.matches, b?.route.id);
      p && p[w.route.id] || (p = {
        ...p,
        [w.route.id]: S.error
      }), n.fetchers.delete(m);
    } else if (Fi(S))
      $e(!1, "Unhandled fetcher revalidation redirect");
    else {
      let w = Oa(S.data);
      n.fetchers.set(m, w);
    }
  }), { loaderData: h, errors: p };
}
function ly(n, a, r, s) {
  let o = Object.entries(a).filter(([, c]) => c !== Lb).reduce((c, [h, p]) => (c[h] = p, c), {});
  for (let c of r) {
    let h = c.route.id;
    if (!a.hasOwnProperty(h) && n.hasOwnProperty(h) && c.route.loader && (o[h] = n[h]), s && s.hasOwnProperty(h))
      break;
  }
  return o;
}
function sy(n) {
  return n ? An(n[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [n[0]]: n[1].data
    }
  } : {};
}
function mi(n, a) {
  return (a ? n.slice(0, n.findIndex((s) => s.route.id === a) + 1) : [...n]).reverse().find((s) => s.route.hasErrorBoundary === !0) || n[0];
}
function Ho(n) {
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
function qo(n) {
  let a = Object.entries(n);
  for (let r = a.length - 1; r >= 0; r--) {
    let [s, o] = a[r];
    if (Fi(o))
      return { key: s, result: o };
  }
}
function Ib(n) {
  let a = typeof n == "string" ? aa(n) : n;
  return ha({ ...a, hash: "" });
}
function bT(n, a) {
  return n.pathname !== a.pathname || n.search !== a.search ? !1 : n.hash === "" ? a.hash !== "" : n.hash === a.hash ? !0 : a.hash !== "";
}
function xT(n) {
  return new wu(
    n.init?.status ?? 500,
    n.init?.statusText ?? "Internal Server Error",
    n.data
  );
}
function ST(n) {
  return n != null && typeof n == "object" && Object.entries(n).every(
    ([a, r]) => typeof a == "string" && wT(r)
  );
}
function wT(n) {
  return n != null && typeof n == "object" && "type" in n && "result" in n && (n.type === "data" || n.type === "error");
}
function ET(n) {
  return ph(n.result) && zb.has(n.result.status);
}
function An(n) {
  return n.type === "error";
}
function Fi(n) {
  return (n && n.type) === "redirect";
}
function oy(n) {
  return typeof n == "object" && n != null && "type" in n && "data" in n && "init" in n && n.type === "DataWithResponseInit";
}
function ph(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.headers == "object" && typeof n.body < "u";
}
function TT(n) {
  return zb.has(n);
}
function jT(n) {
  return ph(n) && TT(n.status) && n.headers.has("Location");
}
function CT(n) {
  return nT.has(n.toUpperCase());
}
function ln(n) {
  return eT.has(n.toUpperCase());
}
function gh(n) {
  return new URLSearchParams(n).getAll("index").some((a) => a === "");
}
function au(n, a) {
  let r = typeof a == "string" ? aa(a).search : a.search;
  if (n[n.length - 1].route.index && gh(r || ""))
    return n[n.length - 1];
  let s = Mb(n);
  return s[s.length - 1];
}
function uy(n) {
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
function Pd(n, a) {
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
function NT(n, a) {
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
function MT(n, a) {
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
function Oa(n) {
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
function AT(n, a) {
  try {
    let r = n.sessionStorage.getItem(
      Ob
    );
    if (r) {
      let s = JSON.parse(r);
      for (let [o, c] of Object.entries(s || {}))
        c && Array.isArray(c) && a.set(o, new Set(c || []));
    }
  } catch {
  }
}
function RT(n, a) {
  if (a.size > 0) {
    let r = {};
    for (let [s, o] of a)
      r[s] = [...o];
    try {
      n.sessionStorage.setItem(
        Ob,
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
function cy() {
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
var Zi = x.createContext(null);
Zi.displayName = "DataRouter";
var ys = x.createContext(null);
ys.displayName = "DataRouterState";
var Yb = x.createContext(!1);
function Fb() {
  return x.useContext(Yb);
}
var vh = x.createContext({
  isTransitioning: !1
});
vh.displayName = "ViewTransition";
var Gb = x.createContext(
  /* @__PURE__ */ new Map()
);
Gb.displayName = "Fetchers";
var _T = x.createContext(null);
_T.displayName = "Await";
var Kn = x.createContext(
  null
);
Kn.displayName = "Navigation";
var Eu = x.createContext(
  null
);
Eu.displayName = "Location";
var ka = x.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
ka.displayName = "Route";
var yh = x.createContext(null);
yh.displayName = "RouteError";
var Xb = "REACT_ROUTER_ERROR", DT = "REDIRECT", zT = "ROUTE_ERROR_RESPONSE";
function OT(n) {
  if (n.startsWith(`${Xb}:${DT}:{`))
    try {
      let a = JSON.parse(n.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function LT(n) {
  if (n.startsWith(
    `${Xb}:${zT}:{`
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
function UT(n, { relative: a } = {}) {
  $e(
    bs(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: s } = x.useContext(Kn), { hash: o, pathname: c, search: h } = Ss(n, { relative: a }), p = c;
  return r !== "/" && (p = c === "/" ? r : Yn([r, c])), s.createHref({ pathname: p, search: h, hash: o });
}
function bs() {
  return x.useContext(Eu) != null;
}
function Va() {
  return $e(
    bs(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), x.useContext(Eu).location;
}
var Kb = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Qb(n) {
  x.useContext(Kn).static || x.useLayoutEffect(n);
}
function xs() {
  let { isDataRoute: n } = x.useContext(ka);
  return n ? KT() : kT();
}
function kT() {
  $e(
    bs(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let n = x.useContext(Zi), { basename: a, navigator: r } = x.useContext(Kn), { matches: s } = x.useContext(ka), { pathname: o } = Va(), c = JSON.stringify(fh(s)), h = x.useRef(!1);
  return Qb(() => {
    h.current = !0;
  }), x.useCallback(
    (g, m = {}) => {
      if (Nt(h.current, Kb), !h.current) return;
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
function Ss(n, { relative: a } = {}) {
  let { matches: r } = x.useContext(ka), { pathname: s } = Va(), o = JSON.stringify(fh(r));
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
function VT(n, a, r) {
  $e(
    bs(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: s } = x.useContext(Kn), { matches: o } = x.useContext(ka), c = o[o.length - 1], h = c ? c.params : {}, p = c ? c.pathname : "/", g = c ? c.pathnameBase : "/", m = c && c.route;
  {
    let _ = m && m.path || "";
    Jb(
      p,
      !m || _.endsWith("*") || _.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${p}" (under <Route path="${_}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${_}"> to <Route path="${_ === "/" ? "*" : `${_}/*`}">.`
    );
  }
  let b = Va(), v;
  v = b;
  let S = v.pathname || "/", w = S;
  if (g !== "/") {
    let _ = g.replace(/^\//, "").split("/");
    w = "/" + S.replace(/^\//, "").split("/").slice(_.length).join("/");
  }
  let T = hi(n, { pathname: w });
  return Nt(
    m || T != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `
  ), Nt(
    T == null || T[T.length - 1].route.element !== void 0 || T[T.length - 1].route.Component !== void 0 || T[T.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), IT(
    T && T.map(
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
function BT() {
  let n = XT(), a = us(n) ? `${n.status} ${n.statusText}` : n instanceof Error ? n.message : JSON.stringify(n), r = n instanceof Error ? n.stack : null, s = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: s }, c = { padding: "2px 4px", backgroundColor: s }, h = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    n
  ), h = /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ x.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ x.createElement("code", { style: c }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ x.createElement("code", { style: c }, "errorElement"), " prop on your route.")), /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ x.createElement("h3", { style: { fontStyle: "italic" } }, a), r ? /* @__PURE__ */ x.createElement("pre", { style: o }, r) : null, h);
}
var HT = /* @__PURE__ */ x.createElement(BT, null), Pb = class extends x.Component {
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
      const r = LT(n.digest);
      r && (n = r);
    }
    let a = n !== void 0 ? /* @__PURE__ */ x.createElement(ka.Provider, { value: this.props.routeContext }, /* @__PURE__ */ x.createElement(
      yh.Provider,
      {
        value: n,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ x.createElement(qT, { error: n }, a) : a;
  }
};
Pb.contextType = Yb;
var Zd = /* @__PURE__ */ new WeakMap();
function qT({
  children: n,
  error: a
}) {
  let { basename: r } = x.useContext(Kn);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let s = OT(a.digest);
    if (s) {
      let o = Zd.get(a);
      if (o) throw o;
      let c = Rb(s.location, r);
      if (Ab && !Zd.get(a))
        if (c.isExternal || s.reloadDocument)
          window.location.href = c.absoluteURL || c.to;
        else {
          const h = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(c.to, {
              replace: s.replace
            })
          );
          throw Zd.set(a, h), h;
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
function $T({ routeContext: n, match: a, children: r }) {
  let s = x.useContext(Zi);
  return s && s.static && s.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (s.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ x.createElement(ka.Provider, { value: n }, r);
}
function IT(n, a = [], r) {
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
        let { loaderData: S, errors: w } = s, T = v.route.loader && !S.hasOwnProperty(v.route.id) && (!w || w[v.route.id] === void 0);
        if (v.route.lazy || T) {
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
      let w, T = !1, j = null, _ = null;
      s && (w = c && v.route.id ? c[v.route.id] : void 0, j = v.route.errorElement || HT, h && (p < 0 && S === 0 ? (Jb(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), T = !0, _ = null) : p === S && (T = !0, _ = v.route.hydrateFallbackElement || null)));
      let C = a.concat(o.slice(0, S + 1)), L = () => {
        let z;
        return w ? z = j : T ? z = _ : v.route.Component ? z = /* @__PURE__ */ x.createElement(v.route.Component, null) : v.route.element ? z = v.route.element : z = b, /* @__PURE__ */ x.createElement(
          $T,
          {
            match: v,
            routeContext: {
              outlet: b,
              matches: C,
              isDataRoute: s != null
            },
            children: z
          }
        );
      };
      return s && (v.route.ErrorBoundary || v.route.errorElement || S === 0) ? /* @__PURE__ */ x.createElement(
        Pb,
        {
          location: s.location,
          revalidation: s.revalidation,
          component: j,
          error: w,
          children: L(),
          routeContext: { outlet: null, matches: C, isDataRoute: !0 },
          onError: m
        }
      ) : L();
    },
    null
  );
}
function bh(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function YT(n) {
  let a = x.useContext(Zi);
  return $e(a, bh(n)), a;
}
function Zb(n) {
  let a = x.useContext(ys);
  return $e(a, bh(n)), a;
}
function FT(n) {
  let a = x.useContext(ka);
  return $e(a, bh(n)), a;
}
function Tu(n) {
  let a = FT(n), r = a.matches[a.matches.length - 1];
  return $e(
    r.route.id,
    `${n} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function GT() {
  return Tu(
    "useRouteId"
    /* UseRouteId */
  );
}
function ws() {
  let n = Zb(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Tu(
    "useLoaderData"
    /* UseLoaderData */
  );
  return n.loaderData[a];
}
function XT() {
  let n = x.useContext(yh), a = Zb(
    "useRouteError"
    /* UseRouteError */
  ), r = Tu(
    "useRouteError"
    /* UseRouteError */
  );
  return n !== void 0 ? n : a.errors?.[r];
}
function KT() {
  let { router: n } = YT(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Tu(
    "useNavigate"
    /* UseNavigateStable */
  ), r = x.useRef(!1);
  return Qb(() => {
    r.current = !0;
  }), x.useCallback(
    async (o, c = {}) => {
      Nt(r.current, Kb), r.current && (typeof o == "number" ? await n.navigate(o) : await n.navigate(o, { fromRouteId: a, ...c }));
    },
    [n, a]
  );
}
var dy = {};
function Jb(n, a, r) {
  !a && !dy[n] && (dy[n] = !0, Nt(!1, r));
}
var fy = {};
function hy(n, a) {
  !n && !fy[a] && (fy[a] = !0, console.warn(a));
}
var QT = "useOptimistic", my = fE[QT], PT = () => {
};
function ZT(n) {
  return my ? my(n) : [n, PT];
}
function JT(n) {
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
var WT = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function ej(n, a) {
  return lT({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: SE({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: n,
    hydrationRouteProperties: WT,
    mapRouteProperties: JT,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var tj = class {
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
function nj({
  router: n,
  flushSync: a,
  onError: r,
  unstable_useTransitions: s
}) {
  s = Fb() || s;
  let [c, h] = x.useState(n.state), [p, g] = ZT(c), [m, b] = x.useState(), [v, S] = x.useState({
    isTransitioning: !1
  }), [w, T] = x.useState(), [j, _] = x.useState(), [C, L] = x.useState(), z = x.useRef(/* @__PURE__ */ new Map()), R = x.useCallback(
    (O, { deletedFetchers: $, newErrors: re, flushSync: ae, viewTransitionOpts: me }) => {
      re && r && Object.values(re).forEach(
        (oe) => r(oe, {
          location: O.location,
          params: O.matches[0]?.params ?? {},
          unstable_pattern: vs(O.matches)
        })
      ), O.fetchers.forEach((oe, U) => {
        oe.data !== void 0 && z.current.set(U, oe.data);
      }), $.forEach((oe) => z.current.delete(oe)), hy(
        ae === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let ge = n.window != null && n.window.document != null && typeof n.window.document.startViewTransition == "function";
      if (hy(
        me == null || ge,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !me || !ge) {
        a && ae ? a(() => h(O)) : s === !1 ? h(O) : x.startTransition(() => {
          s === !0 && g((oe) => py(oe, O)), h(O);
        });
        return;
      }
      if (a && ae) {
        a(() => {
          j && (w?.resolve(), j.skipTransition()), S({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: me.currentLocation,
            nextLocation: me.nextLocation
          });
        });
        let oe = n.window.document.startViewTransition(() => {
          a(() => h(O));
        });
        oe.finished.finally(() => {
          a(() => {
            T(void 0), _(void 0), b(void 0), S({ isTransitioning: !1 });
          });
        }), a(() => _(oe));
        return;
      }
      j ? (w?.resolve(), j.skipTransition(), L({
        state: O,
        currentLocation: me.currentLocation,
        nextLocation: me.nextLocation
      })) : (b(O), S({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: me.currentLocation,
        nextLocation: me.nextLocation
      }));
    },
    [
      n.window,
      a,
      j,
      w,
      s,
      g,
      r
    ]
  );
  x.useLayoutEffect(() => n.subscribe(R), [n, R]);
  let J = p.initialized;
  x.useLayoutEffect(() => {
    !J && n.state.initialized && R(n.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [J, R, n.state]), x.useEffect(() => {
    v.isTransitioning && !v.flushSync && T(new tj());
  }, [v]), x.useEffect(() => {
    if (w && m && n.window) {
      let O = m, $ = w.promise, re = n.window.document.startViewTransition(async () => {
        s === !1 ? h(O) : x.startTransition(() => {
          s === !0 && g((ae) => py(ae, O)), h(O);
        }), await $;
      });
      re.finished.finally(() => {
        T(void 0), _(void 0), b(void 0), S({ isTransitioning: !1 });
      }), _(re);
    }
  }, [
    m,
    w,
    n.window,
    s,
    g
  ]), x.useEffect(() => {
    w && m && p.location.key === m.location.key && w.resolve();
  }, [w, j, p.location, m]), x.useEffect(() => {
    !v.isTransitioning && C && (b(C.state), S({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: C.currentLocation,
      nextLocation: C.nextLocation
    }), L(void 0));
  }, [v.isTransitioning, C]);
  let G = x.useMemo(() => ({
    createHref: n.createHref,
    encodeLocation: n.encodeLocation,
    go: (O) => n.navigate(O),
    push: (O, $, re) => n.navigate(O, {
      state: $,
      preventScrollReset: re?.preventScrollReset
    }),
    replace: (O, $, re) => n.navigate(O, {
      replace: !0,
      state: $,
      preventScrollReset: re?.preventScrollReset
    })
  }), [n]), W = n.basename || "/", A = x.useMemo(
    () => ({
      router: n,
      navigator: G,
      static: !1,
      basename: W,
      onError: r
    }),
    [n, G, W, r]
  );
  return /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement(Zi.Provider, { value: A }, /* @__PURE__ */ x.createElement(ys.Provider, { value: p }, /* @__PURE__ */ x.createElement(Gb.Provider, { value: z.current }, /* @__PURE__ */ x.createElement(vh.Provider, { value: v }, /* @__PURE__ */ x.createElement(
    rj,
    {
      basename: W,
      location: p.location,
      navigationType: p.historyAction,
      navigator: G,
      unstable_useTransitions: s
    },
    /* @__PURE__ */ x.createElement(
      aj,
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
function py(n, a) {
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
var aj = x.memo(ij);
function ij({
  routes: n,
  future: a,
  state: r,
  isStatic: s,
  onError: o
}) {
  return VT(n, void 0, { state: r, isStatic: s, onError: o });
}
function rj({
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
    unstable_mask: T
  } = r, j = x.useMemo(() => {
    let _ = Xn(m, p);
    return _ == null ? null : {
      location: {
        pathname: _,
        search: b,
        hash: v,
        state: S,
        key: w,
        unstable_mask: T
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
    T
  ]);
  return Nt(
    j != null,
    `<Router basename="${p}"> is not able to match the URL "${m}${b}${v}" because it does not start with the basename, so the <Router> won't render anything.`
  ), j == null ? null : /* @__PURE__ */ x.createElement(Kn.Provider, { value: g }, /* @__PURE__ */ x.createElement(Eu.Provider, { children: a, value: j }));
}
var iu = "get", ru = "application/x-www-form-urlencoded";
function ju(n) {
  return typeof HTMLElement < "u" && n instanceof HTMLElement;
}
function lj(n) {
  return ju(n) && n.tagName.toLowerCase() === "button";
}
function sj(n) {
  return ju(n) && n.tagName.toLowerCase() === "form";
}
function oj(n) {
  return ju(n) && n.tagName.toLowerCase() === "input";
}
function uj(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function cj(n, a) {
  return n.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !uj(n);
}
var $o = null;
function dj() {
  if ($o === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), $o = !1;
    } catch {
      $o = !0;
    }
  return $o;
}
var fj = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function Jd(n) {
  return n != null && !fj.has(n) ? (Nt(
    !1,
    `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${ru}"`
  ), null) : n;
}
function hj(n, a) {
  let r, s, o, c, h;
  if (sj(n)) {
    let p = n.getAttribute("action");
    s = p ? Xn(p, a) : null, r = n.getAttribute("method") || iu, o = Jd(n.getAttribute("enctype")) || ru, c = new FormData(n);
  } else if (lj(n) || oj(n) && (n.type === "submit" || n.type === "image")) {
    let p = n.form;
    if (p == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let g = n.getAttribute("formaction") || p.getAttribute("action");
    if (s = g ? Xn(g, a) : null, r = n.getAttribute("formmethod") || p.getAttribute("method") || iu, o = Jd(n.getAttribute("formenctype")) || Jd(p.getAttribute("enctype")) || ru, c = new FormData(p, n), !dj()) {
      let { name: m, type: b, value: v } = n;
      if (b === "image") {
        let S = m ? `${m}.` : "";
        c.append(`${S}x`, "0"), c.append(`${S}y`, "0");
      } else m && c.append(m, v);
    }
  } else {
    if (ju(n))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = iu, s = null, o = ru, h = n;
  }
  return c && o === "text/plain" && (h = c, c = void 0), { action: s, method: r.toLowerCase(), encType: o, formData: c, body: h };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function xh(n, a) {
  if (n === !1 || n === null || typeof n > "u")
    throw new Error(a);
}
function Wb(n, a, r, s) {
  let o = typeof n == "string" ? new URL(
    n,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : n;
  return r ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${s}` : o.pathname = `${o.pathname}.${s}` : o.pathname === "/" ? o.pathname = `_root.${s}` : a && Xn(o.pathname, a) === "/" ? o.pathname = `${du(a)}/_root.${s}` : o.pathname = `${du(o.pathname)}.${s}`, o;
}
async function mj(n, a) {
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
function pj(n) {
  return n == null ? !1 : n.href == null ? n.rel === "preload" && typeof n.imageSrcSet == "string" && typeof n.imageSizes == "string" : typeof n.rel == "string" && typeof n.href == "string";
}
async function gj(n, a, r) {
  let s = await Promise.all(
    n.map(async (o) => {
      let c = a.routes[o.route.id];
      if (c) {
        let h = await mj(c, r);
        return h.links ? h.links() : [];
      }
      return [];
    })
  );
  return xj(
    s.flat(1).filter(pj).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function gy(n, a, r, s, o, c) {
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
function vj(n, a, { includeHydrateFallback: r } = {}) {
  return yj(
    n.map((s) => {
      let o = a.routes[s.route.id];
      if (!o) return [];
      let c = [o.module];
      return o.clientActionModule && (c = c.concat(o.clientActionModule)), o.clientLoaderModule && (c = c.concat(o.clientLoaderModule)), r && o.hydrateFallbackModule && (c = c.concat(o.hydrateFallbackModule)), o.imports && (c = c.concat(o.imports)), c;
    }).flat(1)
  );
}
function yj(n) {
  return [...new Set(n)];
}
function bj(n) {
  let a = {}, r = Object.keys(n).sort();
  for (let s of r)
    a[s] = n[s];
  return a;
}
function xj(n, a) {
  let r = /* @__PURE__ */ new Set();
  return new Set(a), n.reduce((s, o) => {
    let c = JSON.stringify(bj(o));
    return r.has(c) || (r.add(c), s.push({ key: c, link: o })), s;
  }, []);
}
function Sh() {
  let n = x.useContext(Zi);
  return xh(
    n,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), n;
}
function Sj() {
  let n = x.useContext(ys);
  return xh(
    n,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), n;
}
var wh = x.createContext(void 0);
wh.displayName = "FrameworkContext";
function Eh() {
  let n = x.useContext(wh);
  return xh(
    n,
    "You must render this element inside a <HydratedRouter> element"
  ), n;
}
function wj(n, a) {
  let r = x.useContext(wh), [s, o] = x.useState(!1), [c, h] = x.useState(!1), { onFocus: p, onBlur: g, onMouseEnter: m, onMouseLeave: b, onTouchStart: v } = a, S = x.useRef(null);
  x.useEffect(() => {
    if (n === "render" && h(!0), n === "viewport") {
      let j = (C) => {
        C.forEach((L) => {
          h(L.isIntersecting);
        });
      }, _ = new IntersectionObserver(j, { threshold: 0.5 });
      return S.current && _.observe(S.current), () => {
        _.disconnect();
      };
    }
  }, [n]), x.useEffect(() => {
    if (s) {
      let j = setTimeout(() => {
        h(!0);
      }, 100);
      return () => {
        clearTimeout(j);
      };
    }
  }, [s]);
  let w = () => {
    o(!0);
  }, T = () => {
    o(!1), h(!1);
  };
  return r ? n !== "intent" ? [c, S, {}] : [
    c,
    S,
    {
      onFocus: Xl(p, w),
      onBlur: Xl(g, T),
      onMouseEnter: Xl(m, w),
      onMouseLeave: Xl(b, T),
      onTouchStart: Xl(v, w)
    }
  ] : [!1, S, {}];
}
function Xl(n, a) {
  return (r) => {
    n && n(r), r.defaultPrevented || a(r);
  };
}
function Ej({ page: n, ...a }) {
  let r = Fb(), { router: s } = Sh(), o = x.useMemo(
    () => hi(s.routes, n, s.basename),
    [s.routes, n, s.basename]
  );
  return o ? r ? /* @__PURE__ */ x.createElement(jj, { page: n, matches: o, ...a }) : /* @__PURE__ */ x.createElement(Cj, { page: n, matches: o, ...a }) : null;
}
function Tj(n) {
  let { manifest: a, routeModules: r } = Eh(), [s, o] = x.useState([]);
  return x.useEffect(() => {
    let c = !1;
    return gj(n, a, r).then(
      (h) => {
        c || o(h);
      }
    ), () => {
      c = !0;
    };
  }, [n, a, r]), s;
}
function jj({
  page: n,
  matches: a,
  ...r
}) {
  let s = Va(), { future: o } = Eh(), { basename: c } = Sh(), h = x.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let p = Wb(
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
function Cj({
  page: n,
  matches: a,
  ...r
}) {
  let s = Va(), { future: o, manifest: c, routeModules: h } = Eh(), { basename: p } = Sh(), { loaderData: g, matches: m } = Sj(), b = x.useMemo(
    () => gy(
      n,
      a,
      m,
      c,
      s,
      "data"
    ),
    [n, a, m, c, s]
  ), v = x.useMemo(
    () => gy(
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
    let j = /* @__PURE__ */ new Set(), _ = !1;
    if (a.forEach((L) => {
      let z = c.routes[L.route.id];
      !z || !z.hasLoader || (!b.some((R) => R.route.id === L.route.id) && L.route.id in g && h[L.route.id]?.shouldRevalidate || z.hasClientLoader ? _ = !0 : j.add(L.route.id));
    }), j.size === 0)
      return [];
    let C = Wb(
      n,
      p,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return _ && j.size > 0 && C.searchParams.set(
      "_routes",
      a.filter((L) => j.has(L.route.id)).map((L) => L.route.id).join(",")
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
    () => vj(v, c),
    [v, c]
  ), T = Tj(v);
  return /* @__PURE__ */ x.createElement(x.Fragment, null, S.map((j) => /* @__PURE__ */ x.createElement("link", { key: j, rel: "prefetch", as: "fetch", href: j, ...r })), w.map((j) => /* @__PURE__ */ x.createElement("link", { key: j, rel: "modulepreload", href: j, ...r })), T.map(({ key: j, link: _ }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ x.createElement(
      "link",
      {
        key: j,
        nonce: r.nonce,
        ..._,
        crossOrigin: _.crossOrigin ?? r.crossOrigin
      }
    )
  )));
}
function Nj(...n) {
  return (a) => {
    n.forEach((r) => {
      typeof r == "function" ? r(a) : r != null && (r.current = a);
    });
  };
}
var Mj = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  Mj && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var ex = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Cu = x.forwardRef(
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
    ...T
  }, j) {
    let { basename: _, navigator: C, unstable_useTransitions: L } = x.useContext(Kn), z = typeof b == "string" && ex.test(b), R = Rb(b, _);
    b = R.to;
    let J = UT(b, { relative: o }), G = Va(), W = null;
    if (p) {
      let oe = Su(
        p,
        [],
        G.unstable_mask ? G.unstable_mask.pathname : "/",
        !0
      );
      _ !== "/" && (oe.pathname = oe.pathname === "/" ? _ : Yn([_, oe.pathname])), W = C.createHref(oe);
    }
    let [A, O, $] = wj(
      s,
      T
    ), re = Dj(b, {
      replace: h,
      unstable_mask: p,
      state: g,
      target: m,
      preventScrollReset: v,
      relative: o,
      viewTransition: S,
      unstable_defaultShouldRevalidate: w,
      unstable_useTransitions: L
    });
    function ae(oe) {
      a && a(oe), oe.defaultPrevented || re(oe);
    }
    let me = !(R.isExternal || c), ge = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ x.createElement(
        "a",
        {
          ...T,
          ...$,
          href: (me ? W : void 0) || R.absoluteURL || J,
          onClick: me ? ae : a,
          ref: Nj(j, O),
          target: m,
          "data-discover": !z && r === "render" ? "true" : void 0
        }
      )
    );
    return A && !z ? /* @__PURE__ */ x.createElement(x.Fragment, null, ge, /* @__PURE__ */ x.createElement(Ej, { page: J })) : ge;
  }
);
Cu.displayName = "Link";
var Aj = x.forwardRef(
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
    let v = Ss(h, { relative: m.relative }), S = Va(), w = x.useContext(ys), { navigator: T, basename: j } = x.useContext(Kn), _ = w != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    kj(v) && p === !0, C = T.encodeLocation ? T.encodeLocation(v).pathname : v.pathname, L = S.pathname, z = w && w.navigation && w.navigation.location ? w.navigation.location.pathname : null;
    r || (L = L.toLowerCase(), z = z ? z.toLowerCase() : null, C = C.toLowerCase()), z && j && (z = Xn(z, j) || z);
    const R = C !== "/" && C.endsWith("/") ? C.length - 1 : C.length;
    let J = L === C || !o && L.startsWith(C) && L.charAt(R) === "/", G = z != null && (z === C || !o && z.startsWith(C) && z.charAt(C.length) === "/"), W = {
      isActive: J,
      isPending: G,
      isTransitioning: _
    }, A = J ? a : void 0, O;
    typeof s == "function" ? O = s(W) : O = [
      s,
      J ? "active" : null,
      G ? "pending" : null,
      _ ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let $ = typeof c == "function" ? c(W) : c;
    return /* @__PURE__ */ x.createElement(
      Cu,
      {
        ...m,
        "aria-current": A,
        className: O,
        ref: b,
        style: $,
        to: h,
        viewTransition: p
      },
      typeof g == "function" ? g(W) : g
    );
  }
);
Aj.displayName = "NavLink";
var Rj = x.forwardRef(
  ({
    discover: n = "render",
    fetcherKey: a,
    navigate: r,
    reloadDocument: s,
    replace: o,
    state: c,
    method: h = iu,
    action: p,
    onSubmit: g,
    relative: m,
    preventScrollReset: b,
    viewTransition: v,
    unstable_defaultShouldRevalidate: S,
    ...w
  }, T) => {
    let { unstable_useTransitions: j } = x.useContext(Kn), _ = Lj(), C = Uj(p, { relative: m }), L = h.toLowerCase() === "get" ? "get" : "post", z = typeof p == "string" && ex.test(p), R = (J) => {
      if (g && g(J), J.defaultPrevented) return;
      J.preventDefault();
      let G = J.nativeEvent.submitter, W = G?.getAttribute("formmethod") || h, A = () => _(G || J.currentTarget, {
        fetcherKey: a,
        method: W,
        navigate: r,
        replace: o,
        state: c,
        relative: m,
        preventScrollReset: b,
        viewTransition: v,
        unstable_defaultShouldRevalidate: S
      });
      j && r !== !1 ? x.startTransition(() => A()) : A();
    };
    return /* @__PURE__ */ x.createElement(
      "form",
      {
        ref: T,
        method: L,
        action: C,
        onSubmit: s ? g : R,
        ...w,
        "data-discover": !z && n === "render" ? "true" : void 0
      }
    );
  }
);
Rj.displayName = "Form";
function _j(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function tx(n) {
  let a = x.useContext(Zi);
  return $e(a, _j(n)), a;
}
function Dj(n, {
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
  let b = xs(), v = Va(), S = Ss(n, { relative: h });
  return x.useCallback(
    (w) => {
      if (cj(w, a)) {
        w.preventDefault();
        let T = r !== void 0 ? r : ha(v) === ha(S), j = () => b(n, {
          replace: T,
          unstable_mask: s,
          state: o,
          preventScrollReset: c,
          relative: h,
          viewTransition: p,
          unstable_defaultShouldRevalidate: g
        });
        m ? x.startTransition(() => j()) : j();
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
var zj = 0, Oj = () => `__${String(++zj)}__`;
function Lj() {
  let { router: n } = tx(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = x.useContext(Kn), r = GT(), s = n.fetch, o = n.navigate;
  return x.useCallback(
    async (c, h = {}) => {
      let { action: p, method: g, encType: m, formData: b, body: v } = hj(
        c,
        a
      );
      if (h.navigate === !1) {
        let S = h.fetcherKey || Oj();
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
function Uj(n, { relative: a } = {}) {
  let { basename: r } = x.useContext(Kn), s = x.useContext(ka);
  $e(s, "useFormAction must be used inside a RouteContext");
  let [o] = s.matches.slice(-1), c = { ...Ss(n || ".", { relative: a }) }, h = Va();
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
function kj(n, { relative: a } = {}) {
  let r = x.useContext(vh);
  $e(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = tx(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = Ss(n, { relative: a });
  if (!r.isTransitioning)
    return !1;
  let c = Xn(r.currentLocation.pathname, s) || r.currentLocation.pathname, h = Xn(r.nextLocation.pathname, s) || r.nextLocation.pathname;
  return cu(o.pathname, h) != null || cu(o.pathname, c) != null;
}
class Pr extends Error {
  constructor(a, r, s, o) {
    super(s), this.status = a, this.category = r, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const xi = "/api/v1/extensions/nexus.audio.emotiontts";
async function bt(n, a) {
  const r = n.startsWith("http") ? n : `${xi}${n}`, s = await fetch(r, {
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
    throw new Pr(
      s.status,
      o?.category ?? "unknown",
      o?.message ?? s.statusText,
      o?.requestId
    );
  }
  if (s.status !== 204)
    return await s.json();
}
function Vj(n, a, r) {
  const s = n.startsWith("http") ? n : `${xi}${n}`, o = new EventSource(s);
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
async function Bj() {
  return bt("/deployments");
}
async function vy(n) {
  return bt(`/deployments/${n}`);
}
async function Hj(n, a) {
  return bt(`/deployments/${n}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function yy(n) {
  return bt(`/mappings?deploymentId=${encodeURIComponent(n)}`);
}
async function Th(n, a) {
  return bt("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: n })
  });
}
async function rs(n, a, r) {
  return bt(
    `/mappings/${a}?deploymentId=${encodeURIComponent(n)}`,
    {
      method: "PATCH",
      body: JSON.stringify(r)
    }
  );
}
async function nx(n, a) {
  await bt(
    `/mappings/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
async function qj(n) {
  return bt(`/mappings/export?deploymentId=${encodeURIComponent(n)}`);
}
async function $j(n, a, r = "error") {
  return bt("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: n, mappings: a, conflictStrategy: r })
  });
}
async function Ij(n, a = {}) {
  const r = new URLSearchParams();
  a.limit && r.set("limit", String(a.limit)), a.status && r.set("status", a.status);
  const s = r.toString(), o = s ? `?${s}` : "";
  return bt(`/deployments/${n}/runs${o}`);
}
async function Yj(n, a) {
  return bt(`/deployments/${n}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function jh(n, a) {
  return bt(`/deployments/${n}/runs/${a}`);
}
async function Fj(n, a) {
  return bt(`/deployments/${n}/runs/${a}/cancel`, { method: "POST" });
}
async function ax(n, a) {
  return bt(`/deployments/${n}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function Gj(n, a) {
  return bt(`/deployments/${n}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function by(n, a, r, s) {
  return Vj(
    `/deployments/${n}/runs/${a}/progress`,
    r,
    s
  );
}
async function cs(n) {
  return bt(`/voice-assets?deploymentId=${encodeURIComponent(n)}`);
}
async function ix(n, a, r, s, o) {
  const c = new FormData();
  c.append("deploymentId", n), c.append("displayName", r), c.append("kind", s), c.append("audio", a);
  const h = await fetch(`${xi}/voice-assets`, {
    method: "POST",
    body: c
  });
  if (!h.ok)
    throw new Error(`upload failed: ${h.status}`);
  return await h.json();
}
async function Xj(n) {
  return bt(`/workflow?deploymentId=${encodeURIComponent(n)}`);
}
var Kj = "mux0i60", Qj = "mux0i61", Pj = "mux0i62", Zj = "mux0i63";
function Es({ count: n = "0", title: a, hint: r }) {
  return /* @__PURE__ */ f.jsxs("div", { className: Kj, children: [
    /* @__PURE__ */ f.jsx("span", { className: Qj, "aria-hidden": "true", children: n }),
    /* @__PURE__ */ f.jsx("h3", { className: Pj, children: a }),
    r ? /* @__PURE__ */ f.jsx("p", { className: Zj, children: r }) : null
  ] });
}
var Jj = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, Wj = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, eC = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, tC = "zwn3019";
function La({
  tone: n = "raised",
  density: a = "comfortable",
  elevation: r = "subtle",
  as: s = "section",
  children: o,
  className: c,
  style: h,
  ...p
}) {
  const g = [Jj[n], eC[a], Wj[r], c].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsx(s, { className: g, style: h, "data-elevation": r, ...p, children: o });
}
function nC({ children: n, className: a }) {
  const r = [tC, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsx("div", { className: r, children: n });
}
var Ki = "vrkn5p0", aC = "_93p6291", iC = "_93p6292", rC = "_93p6293", lC = "_93p6294", sC = "_93p6295", oC = "_93p6296", uC = "_93p6297", cC = "_93p6298", dC = "_93p6299", fC = "_93p629a", hC = "_93p629b", mC = "_93p629c", pC = "_93p629d", gC = "_93p629e";
function vC() {
  const { deployments: n } = ws(), a = n.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ f.jsxs("main", { className: aC, children: [
    /* @__PURE__ */ f.jsxs("header", { className: iC, children: [
      /* @__PURE__ */ f.jsx("p", { className: rC, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ f.jsxs("h1", { className: lC, children: [
        "Direct your characters.",
        /* @__PURE__ */ f.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ f.jsx("p", { className: sC, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ f.jsxs("p", { className: oC, children: [
        /* @__PURE__ */ f.jsx("span", { className: uC, children: n.length }),
        /* @__PURE__ */ f.jsxs("span", { children: [
          a,
          " ready"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ f.jsxs(
      La,
      {
        density: "airy",
        elevation: "raised",
        className: cC,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ f.jsx("h2", { id: "deployments-section-list", className: Ki, children: "01 / Deployments" }),
          n.length === 0 ? /* @__PURE__ */ f.jsx(
            Es,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ f.jsx("ul", { className: dC, children: n.map((r) => /* @__PURE__ */ f.jsx("li", { children: /* @__PURE__ */ f.jsxs(Cu, { to: `/${r.deploymentId}/recipe`, className: fC, children: [
            /* @__PURE__ */ f.jsx("span", { className: hC, "aria-hidden": "true", children: yC(r.displayName) }),
            /* @__PURE__ */ f.jsxs("span", { children: [
              /* @__PURE__ */ f.jsx("span", { className: mC, children: r.displayName }),
              /* @__PURE__ */ f.jsx("span", { className: pC, children: r.deploymentId })
            ] }),
            /* @__PURE__ */ f.jsx("span", { className: gC, "aria-hidden": "true", children: "→" })
          ] }) }, r.deploymentId)) })
        ]
      }
    )
  ] });
}
function yC(n) {
  const a = n.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
var bC = Eb();
const xC = /* @__PURE__ */ wb(bC);
function SC(n) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
  r.type = "text/css", a.appendChild(r), r.styleSheet ? r.styleSheet.cssText = n : r.appendChild(document.createTextNode(n));
}
const wC = (n) => {
  switch (n) {
    case "success":
      return jC;
    case "info":
      return NC;
    case "warning":
      return CC;
    case "error":
      return MC;
    default:
      return null;
  }
}, EC = Array(12).fill(0), TC = ({ visible: n, className: a }) => /* @__PURE__ */ de.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": n
}, /* @__PURE__ */ de.createElement("div", {
  className: "sonner-spinner"
}, EC.map((r, s) => /* @__PURE__ */ de.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${s}`
})))), jC = /* @__PURE__ */ de.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ de.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), CC = /* @__PURE__ */ de.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ de.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), NC = /* @__PURE__ */ de.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ de.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), MC = /* @__PURE__ */ de.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ de.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), AC = /* @__PURE__ */ de.createElement("svg", {
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
})), RC = () => {
  const [n, a] = de.useState(document.hidden);
  return de.useEffect(() => {
    const r = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", r), () => window.removeEventListener("visibilitychange", r);
  }, []), n;
};
let Vf = 1;
class _C {
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
      const { message: s, ...o } = a, c = typeof a?.id == "number" || ((r = a.id) == null ? void 0 : r.length) > 0 ? a.id : Vf++, h = this.toasts.find((g) => g.id === c), p = a.dismissible === void 0 ? !0 : a.dismissible;
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
        ], de.isValidElement(m))
          c = !1, this.create({
            id: s,
            type: "default",
            message: m
          });
        else if (zC(m) && !m.ok) {
          c = !1;
          const v = typeof r.error == "function" ? await r.error(`HTTP error! status: ${m.status}`) : r.error, S = typeof r.description == "function" ? await r.description(`HTTP error! status: ${m.status}`) : r.description, T = typeof v == "object" && !de.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: s,
            type: "error",
            description: S,
            ...T
          });
        } else if (m instanceof Error) {
          c = !1;
          const v = typeof r.error == "function" ? await r.error(m) : r.error, S = typeof r.description == "function" ? await r.description(m) : r.description, T = typeof v == "object" && !de.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: s,
            type: "error",
            description: S,
            ...T
          });
        } else if (r.success !== void 0) {
          c = !1;
          const v = typeof r.success == "function" ? await r.success(m) : r.success, S = typeof r.description == "function" ? await r.description(m) : r.description, T = typeof v == "object" && !de.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: s,
            type: "success",
            description: S,
            ...T
          });
        }
      }).catch(async (m) => {
        if (h = [
          "reject",
          m
        ], r.error !== void 0) {
          c = !1;
          const b = typeof r.error == "function" ? await r.error(m) : r.error, v = typeof r.description == "function" ? await r.description(m) : r.description, w = typeof b == "object" && !de.isValidElement(b) ? b : {
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
      const s = r?.id || Vf++;
      return this.create({
        jsx: a(s),
        id: s,
        ...r
      }), s;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const vn = new _C(), DC = (n, a) => {
  const r = a?.id || Vf++;
  return vn.addToast({
    title: n,
    ...a,
    id: r
  }), r;
}, zC = (n) => n && typeof n == "object" && "ok" in n && typeof n.ok == "boolean" && "status" in n && typeof n.status == "number", OC = DC, LC = () => vn.toasts, UC = () => vn.getActiveToasts(), xy = Object.assign(OC, {
  success: vn.success,
  info: vn.info,
  warning: vn.warning,
  error: vn.error,
  custom: vn.custom,
  message: vn.message,
  promise: vn.promise,
  dismiss: vn.dismiss,
  loading: vn.loading
}, {
  getHistory: LC,
  getToasts: UC
});
SC("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Io(n) {
  return n.label !== void 0;
}
const kC = 3, VC = "24px", BC = "16px", Sy = 4e3, HC = 356, qC = 14, $C = 45, IC = 200;
function fa(...n) {
  return n.filter(Boolean).join(" ");
}
function YC(n) {
  const [a, r] = n.split("-"), s = [];
  return a && s.push(a), r && s.push(r), s;
}
const FC = (n) => {
  var a, r, s, o, c, h, p, g, m;
  const { invert: b, toast: v, unstyled: S, interacting: w, setHeights: T, visibleToasts: j, heights: _, index: C, toasts: L, expanded: z, removeToast: R, defaultRichColors: J, closeButton: G, style: W, cancelButtonStyle: A, actionButtonStyle: O, className: $ = "", descriptionClassName: re = "", duration: ae, position: me, gap: ge, expandByDefault: oe, classNames: U, icons: V, closeButtonAriaLabel: q = "Close toast" } = n, [Q, te] = de.useState(null), [N, K] = de.useState(null), [Z, le] = de.useState(!1), [ce, ve] = de.useState(!1), [ze, _e] = de.useState(!1), [Be, kt] = de.useState(!1), [Ft, fe] = de.useState(!1), [je, Ne] = de.useState(0), [Me, Kt] = de.useState(0), at = de.useRef(v.duration || ae || Sy), on = de.useRef(null), Qt = de.useRef(null), bn = C === 0, ma = C + 1 <= j, Vt = v.type, Dn = v.dismissible !== !1, Bt = v.className || "", ye = v.descriptionClassName || "", Oe = de.useMemo(() => _.findIndex((Le) => Le.toastId === v.id) || 0, [
    _,
    v.id
  ]), Qe = de.useMemo(() => {
    var Le;
    return (Le = v.closeButton) != null ? Le : G;
  }, [
    v.closeButton,
    G
  ]), et = de.useMemo(() => v.duration || ae || Sy, [
    v.duration,
    ae
  ]), Ht = de.useRef(0), qt = de.useRef(0), Ei = de.useRef(0), ia = de.useRef(null), [Qn, Pt] = me.split("-"), Et = de.useMemo(() => _.reduce((Le, ut, Mt) => Mt >= Oe ? Le : Le + ut.height, 0), [
    _,
    Oe
  ]), $t = RC(), Ji = v.invert || b, Ba = Vt === "loading";
  qt.current = de.useMemo(() => Oe * ge + Et, [
    Oe,
    Et
  ]), de.useEffect(() => {
    at.current = et;
  }, [
    et
  ]), de.useEffect(() => {
    le(!0);
  }, []), de.useEffect(() => {
    const Le = Qt.current;
    if (Le) {
      const ut = Le.getBoundingClientRect().height;
      return Kt(ut), T((Mt) => [
        {
          toastId: v.id,
          height: ut,
          position: v.position
        },
        ...Mt
      ]), () => T((Mt) => Mt.filter((It) => It.toastId !== v.id));
    }
  }, [
    T,
    v.id
  ]), de.useLayoutEffect(() => {
    if (!Z) return;
    const Le = Qt.current, ut = Le.style.height;
    Le.style.height = "auto";
    const Mt = Le.getBoundingClientRect().height;
    Le.style.height = ut, Kt(Mt), T((It) => It.find((it) => it.toastId === v.id) ? It.map((it) => it.toastId === v.id ? {
      ...it,
      height: Mt
    } : it) : [
      {
        toastId: v.id,
        height: Mt,
        position: v.position
      },
      ...It
    ]);
  }, [
    Z,
    v.title,
    v.description,
    T,
    v.id,
    v.jsx,
    v.action,
    v.cancel
  ]);
  const zn = de.useCallback(() => {
    ve(!0), Ne(qt.current), T((Le) => Le.filter((ut) => ut.toastId !== v.id)), setTimeout(() => {
      R(v);
    }, IC);
  }, [
    v,
    R,
    T,
    qt
  ]);
  de.useEffect(() => {
    if (v.promise && Vt === "loading" || v.duration === 1 / 0 || v.type === "loading") return;
    let Le;
    return z || w || $t ? (() => {
      if (Ei.current < Ht.current) {
        const It = (/* @__PURE__ */ new Date()).getTime() - Ht.current;
        at.current = at.current - It;
      }
      Ei.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      at.current !== 1 / 0 && (Ht.current = (/* @__PURE__ */ new Date()).getTime(), Le = setTimeout(() => {
        v.onAutoClose == null || v.onAutoClose.call(v, v), zn();
      }, at.current));
    })(), () => clearTimeout(Le);
  }, [
    z,
    w,
    v,
    Vt,
    $t,
    zn
  ]), de.useEffect(() => {
    v.delete && (zn(), v.onDismiss == null || v.onDismiss.call(v, v));
  }, [
    zn,
    v.delete
  ]);
  function pa() {
    var Le;
    if (V?.loading) {
      var ut;
      return /* @__PURE__ */ de.createElement("div", {
        className: fa(U?.loader, v == null || (ut = v.classNames) == null ? void 0 : ut.loader, "sonner-loader"),
        "data-visible": Vt === "loading"
      }, V.loading);
    }
    return /* @__PURE__ */ de.createElement(TC, {
      className: fa(U?.loader, v == null || (Le = v.classNames) == null ? void 0 : Le.loader),
      visible: Vt === "loading"
    });
  }
  const Pn = v.icon || V?.[Vt] || wC(Vt);
  var ra, cn;
  return /* @__PURE__ */ de.createElement("li", {
    tabIndex: 0,
    ref: Qt,
    className: fa($, Bt, U?.toast, v == null || (a = v.classNames) == null ? void 0 : a.toast, U?.default, U?.[Vt], v == null || (r = v.classNames) == null ? void 0 : r[Vt]),
    "data-sonner-toast": "",
    "data-rich-colors": (ra = v.richColors) != null ? ra : J,
    "data-styled": !(v.jsx || v.unstyled || S),
    "data-mounted": Z,
    "data-promise": !!v.promise,
    "data-swiped": Ft,
    "data-removed": ce,
    "data-visible": ma,
    "data-y-position": Qn,
    "data-x-position": Pt,
    "data-index": C,
    "data-front": bn,
    "data-swiping": ze,
    "data-dismissible": Dn,
    "data-type": Vt,
    "data-invert": Ji,
    "data-swipe-out": Be,
    "data-swipe-direction": N,
    "data-expanded": !!(z || oe && Z),
    "data-testid": v.testId,
    style: {
      "--index": C,
      "--toasts-before": C,
      "--z-index": L.length - C,
      "--offset": `${ce ? je : qt.current}px`,
      "--initial-height": oe ? "auto" : `${Me}px`,
      ...W,
      ...v.style
    },
    onDragEnd: () => {
      _e(!1), te(null), ia.current = null;
    },
    onPointerDown: (Le) => {
      Le.button !== 2 && (Ba || !Dn || (on.current = /* @__PURE__ */ new Date(), Ne(qt.current), Le.target.setPointerCapture(Le.pointerId), Le.target.tagName !== "BUTTON" && (_e(!0), ia.current = {
        x: Le.clientX,
        y: Le.clientY
      })));
    },
    onPointerUp: () => {
      var Le, ut, Mt;
      if (Be || !Dn) return;
      ia.current = null;
      const It = Number(((Le = Qt.current) == null ? void 0 : Le.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), xn = Number(((ut = Qt.current) == null ? void 0 : ut.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), it = (/* @__PURE__ */ new Date()).getTime() - ((Mt = on.current) == null ? void 0 : Mt.getTime()), Zt = Q === "x" ? It : xn, ga = Math.abs(Zt) / it;
      if (Math.abs(Zt) >= $C || ga > 0.11) {
        Ne(qt.current), v.onDismiss == null || v.onDismiss.call(v, v), K(Q === "x" ? It > 0 ? "right" : "left" : xn > 0 ? "down" : "up"), zn(), kt(!0);
        return;
      } else {
        var nn, M;
        (nn = Qt.current) == null || nn.style.setProperty("--swipe-amount-x", "0px"), (M = Qt.current) == null || M.style.setProperty("--swipe-amount-y", "0px");
      }
      fe(!1), _e(!1), te(null);
    },
    onPointerMove: (Le) => {
      var ut, Mt, It;
      if (!ia.current || !Dn || ((ut = window.getSelection()) == null ? void 0 : ut.toString().length) > 0) return;
      const it = Le.clientY - ia.current.y, Zt = Le.clientX - ia.current.x;
      var ga;
      const nn = (ga = n.swipeDirections) != null ? ga : YC(me);
      !Q && (Math.abs(Zt) > 1 || Math.abs(it) > 1) && te(Math.abs(Zt) > Math.abs(it) ? "x" : "y");
      let M = {
        x: 0,
        y: 0
      };
      const B = (I) => 1 / (1.5 + Math.abs(I) / 20);
      if (Q === "y") {
        if (nn.includes("top") || nn.includes("bottom"))
          if (nn.includes("top") && it < 0 || nn.includes("bottom") && it > 0)
            M.y = it;
          else {
            const I = it * B(it);
            M.y = Math.abs(I) < Math.abs(it) ? I : it;
          }
      } else if (Q === "x" && (nn.includes("left") || nn.includes("right")))
        if (nn.includes("left") && Zt < 0 || nn.includes("right") && Zt > 0)
          M.x = Zt;
        else {
          const I = Zt * B(Zt);
          M.x = Math.abs(I) < Math.abs(Zt) ? I : Zt;
        }
      (Math.abs(M.x) > 0 || Math.abs(M.y) > 0) && fe(!0), (Mt = Qt.current) == null || Mt.style.setProperty("--swipe-amount-x", `${M.x}px`), (It = Qt.current) == null || It.style.setProperty("--swipe-amount-y", `${M.y}px`);
    }
  }, Qe && !v.jsx && Vt !== "loading" ? /* @__PURE__ */ de.createElement("button", {
    "aria-label": q,
    "data-disabled": Ba,
    "data-close-button": !0,
    onClick: Ba || !Dn ? () => {
    } : () => {
      zn(), v.onDismiss == null || v.onDismiss.call(v, v);
    },
    className: fa(U?.closeButton, v == null || (s = v.classNames) == null ? void 0 : s.closeButton)
  }, (cn = V?.close) != null ? cn : AC) : null, (Vt || v.icon || v.promise) && v.icon !== null && (V?.[Vt] !== null || v.icon) ? /* @__PURE__ */ de.createElement("div", {
    "data-icon": "",
    className: fa(U?.icon, v == null || (o = v.classNames) == null ? void 0 : o.icon)
  }, v.promise || v.type === "loading" && !v.icon ? v.icon || pa() : null, v.type !== "loading" ? Pn : null) : null, /* @__PURE__ */ de.createElement("div", {
    "data-content": "",
    className: fa(U?.content, v == null || (c = v.classNames) == null ? void 0 : c.content)
  }, /* @__PURE__ */ de.createElement("div", {
    "data-title": "",
    className: fa(U?.title, v == null || (h = v.classNames) == null ? void 0 : h.title)
  }, v.jsx ? v.jsx : typeof v.title == "function" ? v.title() : v.title), v.description ? /* @__PURE__ */ de.createElement("div", {
    "data-description": "",
    className: fa(re, ye, U?.description, v == null || (p = v.classNames) == null ? void 0 : p.description)
  }, typeof v.description == "function" ? v.description() : v.description) : null), /* @__PURE__ */ de.isValidElement(v.cancel) ? v.cancel : v.cancel && Io(v.cancel) ? /* @__PURE__ */ de.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: v.cancelButtonStyle || A,
    onClick: (Le) => {
      Io(v.cancel) && Dn && (v.cancel.onClick == null || v.cancel.onClick.call(v.cancel, Le), zn());
    },
    className: fa(U?.cancelButton, v == null || (g = v.classNames) == null ? void 0 : g.cancelButton)
  }, v.cancel.label) : null, /* @__PURE__ */ de.isValidElement(v.action) ? v.action : v.action && Io(v.action) ? /* @__PURE__ */ de.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: v.actionButtonStyle || O,
    onClick: (Le) => {
      Io(v.action) && (v.action.onClick == null || v.action.onClick.call(v.action, Le), !Le.defaultPrevented && zn());
    },
    className: fa(U?.actionButton, v == null || (m = v.classNames) == null ? void 0 : m.actionButton)
  }, v.action.label) : null);
};
function wy() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const n = document.documentElement.getAttribute("dir");
  return n === "auto" || !n ? window.getComputedStyle(document.documentElement).direction : n;
}
function GC(n, a) {
  const r = {};
  return [
    n,
    a
  ].forEach((s, o) => {
    const c = o === 1, h = c ? "--mobile-offset" : "--offset", p = c ? BC : VC;
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
const XC = /* @__PURE__ */ de.forwardRef(function(a, r) {
  const { id: s, invert: o, position: c = "bottom-right", hotkey: h = [
    "altKey",
    "KeyT"
  ], expand: p, closeButton: g, className: m, offset: b, mobileOffset: v, theme: S = "light", richColors: w, duration: T, style: j, visibleToasts: _ = kC, toastOptions: C, dir: L = wy(), gap: z = qC, icons: R, containerAriaLabel: J = "Notifications" } = a, [G, W] = de.useState([]), A = de.useMemo(() => s ? G.filter((Z) => Z.toasterId === s) : G.filter((Z) => !Z.toasterId), [
    G,
    s
  ]), O = de.useMemo(() => Array.from(new Set([
    c
  ].concat(A.filter((Z) => Z.position).map((Z) => Z.position)))), [
    A,
    c
  ]), [$, re] = de.useState([]), [ae, me] = de.useState(!1), [ge, oe] = de.useState(!1), [U, V] = de.useState(S !== "system" ? S : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), q = de.useRef(null), Q = h.join("+").replace(/Key/g, "").replace(/Digit/g, ""), te = de.useRef(null), N = de.useRef(!1), K = de.useCallback((Z) => {
    W((le) => {
      var ce;
      return (ce = le.find((ve) => ve.id === Z.id)) != null && ce.delete || vn.dismiss(Z.id), le.filter(({ id: ve }) => ve !== Z.id);
    });
  }, []);
  return de.useEffect(() => vn.subscribe((Z) => {
    if (Z.dismiss) {
      requestAnimationFrame(() => {
        W((le) => le.map((ce) => ce.id === Z.id ? {
          ...ce,
          delete: !0
        } : ce));
      });
      return;
    }
    setTimeout(() => {
      xC.flushSync(() => {
        W((le) => {
          const ce = le.findIndex((ve) => ve.id === Z.id);
          return ce !== -1 ? [
            ...le.slice(0, ce),
            {
              ...le[ce],
              ...Z
            },
            ...le.slice(ce + 1)
          ] : [
            Z,
            ...le
          ];
        });
      });
    });
  }), [
    G
  ]), de.useEffect(() => {
    if (S !== "system") {
      V(S);
      return;
    }
    if (S === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? V("dark") : V("light")), typeof window > "u") return;
    const Z = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      Z.addEventListener("change", ({ matches: le }) => {
        V(le ? "dark" : "light");
      });
    } catch {
      Z.addListener(({ matches: ce }) => {
        try {
          V(ce ? "dark" : "light");
        } catch (ve) {
          console.error(ve);
        }
      });
    }
  }, [
    S
  ]), de.useEffect(() => {
    G.length <= 1 && me(!1);
  }, [
    G
  ]), de.useEffect(() => {
    const Z = (le) => {
      var ce;
      if (h.every((_e) => le[_e] || le.code === _e)) {
        var ze;
        me(!0), (ze = q.current) == null || ze.focus();
      }
      le.code === "Escape" && (document.activeElement === q.current || (ce = q.current) != null && ce.contains(document.activeElement)) && me(!1);
    };
    return document.addEventListener("keydown", Z), () => document.removeEventListener("keydown", Z);
  }, [
    h
  ]), de.useEffect(() => {
    if (q.current)
      return () => {
        te.current && (te.current.focus({
          preventScroll: !0
        }), te.current = null, N.current = !1);
      };
  }, [
    q.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ de.createElement("section", {
    ref: r,
    "aria-label": `${J} ${Q}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, O.map((Z, le) => {
    var ce;
    const [ve, ze] = Z.split("-");
    return A.length ? /* @__PURE__ */ de.createElement("ol", {
      key: Z,
      dir: L === "auto" ? wy() : L,
      tabIndex: -1,
      ref: q,
      className: m,
      "data-sonner-toaster": !0,
      "data-sonner-theme": U,
      "data-y-position": ve,
      "data-x-position": ze,
      style: {
        "--front-toast-height": `${((ce = $[0]) == null ? void 0 : ce.height) || 0}px`,
        "--width": `${HC}px`,
        "--gap": `${z}px`,
        ...j,
        ...GC(b, v)
      },
      onBlur: (_e) => {
        N.current && !_e.currentTarget.contains(_e.relatedTarget) && (N.current = !1, te.current && (te.current.focus({
          preventScroll: !0
        }), te.current = null));
      },
      onFocus: (_e) => {
        _e.target instanceof HTMLElement && _e.target.dataset.dismissible === "false" || N.current || (N.current = !0, te.current = _e.relatedTarget);
      },
      onMouseEnter: () => me(!0),
      onMouseMove: () => me(!0),
      onMouseLeave: () => {
        ge || me(!1);
      },
      onDragEnd: () => me(!1),
      onPointerDown: (_e) => {
        _e.target instanceof HTMLElement && _e.target.dataset.dismissible === "false" || oe(!0);
      },
      onPointerUp: () => oe(!1)
    }, A.filter((_e) => !_e.position && le === 0 || _e.position === Z).map((_e, Be) => {
      var kt, Ft;
      return /* @__PURE__ */ de.createElement(FC, {
        key: _e.id,
        icons: R,
        index: Be,
        toast: _e,
        defaultRichColors: w,
        duration: (kt = C?.duration) != null ? kt : T,
        className: C?.className,
        descriptionClassName: C?.descriptionClassName,
        invert: o,
        visibleToasts: _,
        closeButton: (Ft = C?.closeButton) != null ? Ft : g,
        interacting: ge,
        position: Z,
        style: C?.style,
        unstyled: C?.unstyled,
        classNames: C?.classNames,
        cancelButtonStyle: C?.cancelButtonStyle,
        actionButtonStyle: C?.actionButtonStyle,
        closeButtonAriaLabel: C?.closeButtonAriaLabel,
        removeToast: K,
        toasts: A.filter((fe) => fe.position == _e.position),
        heights: $.filter((fe) => fe.position == _e.position),
        setHeights: re,
        expandByDefault: p,
        gap: z,
        expanded: ae,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), Ey = 32, Ty = -30, jy = -6, Cy = 0.5, Ny = 2, My = -24, Ay = 24, Ry = -12, _y = 12, Dy = -12, zy = 12, Oy = -60, Ly = -20;
class Xr extends Error {
  constructor(a, r) {
    super(r), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function rx(n, a, r, s = {}) {
  const o = `/voice-assets/${encodeURIComponent(n)}/edit?deploymentId=${encodeURIComponent(a)}`, c = `${xi}${o}`, h = await fetch(c, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(r),
    ...s.signal ? { signal: s.signal } : {}
  });
  if (h.status === 409) {
    const p = await h.json().catch(() => null), g = p?.error?.current_digest ?? "", m = p?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Xr(g, m);
  }
  if (!h.ok)
    throw new Error(await Nu(h, "apply"));
  return await h.json();
}
async function KC(n, a, r, s, o = {}) {
  const c = `/deployments/${encodeURIComponent(n)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(r)}/edit`, h = `${xi}${c}`, p = await fetch(h, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(s),
    ...o.signal ? { signal: o.signal } : {}
  });
  if (p.status === 409) {
    const g = await p.json().catch(() => null), m = g?.error?.current_digest ?? "", b = g?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Xr(m, b);
  }
  if (!p.ok)
    throw new Error(await Nu(p, "apply"));
  return await p.json();
}
async function QC(n, a, r = {}) {
  const s = `${xi}/voice-assets/${encodeURIComponent(n)}/edit?deploymentId=${encodeURIComponent(a)}`, o = await fetch(s, {
    method: "DELETE",
    ...r.signal ? { signal: r.signal } : {}
  });
  if (!o.ok && o.status !== 204)
    throw new Error(`clear edit failed: ${o.status}`);
}
async function PC(n, a, r, s = {}) {
  const o = `${xi}/voice-assets/${encodeURIComponent(n)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, c = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain: r }),
    ...s.signal ? { signal: s.signal } : {}
  });
  if (!c.ok)
    throw new Error(await Nu(c, "preview"));
  return c.blob();
}
async function lu(n, a, r, s = 50, o = {}) {
  const c = `${xi}/audit/${encodeURIComponent(a)}/${encodeURIComponent(r)}?deploymentId=${encodeURIComponent(n)}&limit=${encodeURIComponent(String(s))}`, h = await fetch(c, {
    method: "GET",
    headers: { accept: "application/json" },
    ...o.signal ? { signal: o.signal } : {}
  });
  if (!h.ok)
    throw new Error(await Nu(h, "audit fetch"));
  return await h.json();
}
function yn() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function lx(n, a) {
  if (n.version !== 1)
    return { message: "Unsupported chain version." };
  if (n.ops.length > Ey)
    return {
      message: `Chain exceeds the maximum of ${Ey} operations.`
    };
  for (const r of n.ops) {
    const s = ZC(r, a);
    if (s) return s;
  }
  return null;
}
function ZC(n, a) {
  switch (n.mode) {
    case "trim":
    case "crop":
    case "mute":
      return JC(n.id, n.start_ms, n.end_ms, a);
    case "normalize":
      return n.target_lufs < Ty || n.target_lufs > jy ? {
        opId: n.id,
        message: `Normalize target must be between ${Ty} and ${jy} LUFS.`
      } : null;
    case "speed":
      return n.factor < Cy || n.factor > Ny ? {
        opId: n.id,
        message: `Speed factor must be between ${Cy}× and ${Ny}×.`
      } : null;
    case "fade_in":
    case "fade_out":
      return n.duration_ms < 1 ? { opId: n.id, message: "Fade duration must be at least 1 ms." } : null;
    case "gain":
      return n.gain_db < My || n.gain_db > Ay ? {
        opId: n.id,
        message: `Volume must be between ${My} and ${Ay} dB.`
      } : null;
    case "eq3":
      for (const [r, s] of [
        ["low_db", n.low_db],
        ["mid_db", n.mid_db],
        ["high_db", n.high_db]
      ])
        if (s < Ry || s > _y)
          return {
            opId: n.id,
            message: `EQ ${r} must be between ${Ry} and ${_y} dB.`
          };
      return null;
    case "pitch_shift":
      return n.semitones < Dy || n.semitones > zy ? {
        opId: n.id,
        message: `Pitch must be between ${Dy} and ${zy} semitones.`
      } : null;
    case "silence_strip":
      return n.threshold_db < Oy || n.threshold_db > Ly ? {
        opId: n.id,
        message: `Silence threshold must be between ${Oy} and ${Ly} dB.`
      } : null;
    default:
      return {
        message: "Unknown edit op mode in chain — refusing to apply."
      };
  }
}
function JC(n, a, r, s) {
  return a < 0 ? { opId: n, message: "Start must be ≥ 0 ms." } : r <= a ? { opId: n, message: "End must be greater than start." } : s > 0 && r > s ? { opId: n, message: "End extends past source duration." } : null;
}
async function Nu(n, a) {
  const r = await n.json().catch(() => null);
  return r?.error?.message ?? r?.message ?? `${a} failed: ${n.status}`;
}
async function sx(n) {
  return bt(`/presets?deploymentId=${encodeURIComponent(n)}`);
}
async function WC(n, a, r) {
  return bt("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: n, presetName: a, vector: r })
  });
}
async function eN(n, a) {
  await bt(
    `/presets/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
var Uy = "_190jlds0", tN = "_190jlds1", nN = "_190jlds2", aN = "_190jlds3", iN = "_190jlds4", rN = "_190jlds5", lN = "_190jlds7", sN = "_190jlds8", oN = "_190jlds9", uN = "_190jldsa", cN = "_190jldsb", ky = "_190jldsc", dN = "_190jldsd", Vy = "_190jldse", fN = "_190jldsf", hN = "_190jldsg", mN = "_190jldsh", ox = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, ux = { sm: "_4ydn546", md: "_4ydn547", lg: "_4ydn548" };
function ft({
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
  const m = [ox[n], ux[a], h].filter(Boolean).join(" ");
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
function pN({
  deploymentId: n,
  targets: a,
  onRevertToIdentity: r,
  onRevertToChain: s,
  emptyHint: o
}) {
  const [c, h] = x.useState(() => Lr(a[0])), [p, g] = x.useState([]), [m, b] = x.useState(!1), [v, S] = x.useState(null), [w, T] = x.useState(!1), [j, _] = x.useState(null), C = x.useMemo(
    () => a.find((R) => Lr(R) === c) ?? a[0],
    [a, c]
  );
  x.useEffect(() => {
    a.length && (a.some((R) => Lr(R) === c) || h(Lr(a[0])));
  }, [a, c]), x.useEffect(() => {
    if (!C) {
      g([]);
      return;
    }
    let R = !1;
    return b(!0), S(null), lu(n, C.kind, C.id, 50).then((J) => {
      R || g(J.entries);
    }).catch((J) => {
      R || S(J instanceof Error ? J.message : "audit fetch failed");
    }).finally(() => {
      R || b(!1);
    }), () => {
      R = !0;
    };
  }, [n, C]);
  const L = x.useCallback(() => {
    if (!C) return;
    const R = {
      deploymentId: n,
      targetKind: C.kind,
      targetId: C.id,
      targetLabel: C.label,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      entries: p
    }, J = new Blob([JSON.stringify(R, null, 2)], {
      type: "application/json"
    }), G = URL.createObjectURL(J), W = document.createElement("a");
    W.href = G, W.download = `audit-${C.kind}-${C.id}-${Date.now()}.json`, document.body.appendChild(W), W.click(), document.body.removeChild(W), URL.revokeObjectURL(G);
  }, [n, p, C]), z = x.useCallback(async () => {
    if (!(!C || !r) && window.confirm(
      `Revert "${C.label}" to identity (no edits)? This will write a new audit entry.`
    )) {
      T(!0);
      try {
        await r(C);
        const R = await lu(n, C.kind, C.id, 50);
        g(R.entries);
      } catch (R) {
        S(R instanceof Error ? R.message : "revert failed");
      } finally {
        T(!1);
      }
    }
  }, [n, r, C]);
  return a.length === 0 ? /* @__PURE__ */ f.jsx("div", { className: Uy, children: /* @__PURE__ */ f.jsx("p", { className: Vy, children: o ?? "Audit history surfaces here once a script is parsed and at least one cast member is mapped." }) }) : /* @__PURE__ */ f.jsxs("div", { className: Uy, children: [
    /* @__PURE__ */ f.jsxs("header", { className: tN, children: [
      /* @__PURE__ */ f.jsxs("div", { className: nN, children: [
        /* @__PURE__ */ f.jsx("label", { htmlFor: "audit-target-select", className: ky, children: "Target" }),
        /* @__PURE__ */ f.jsx(
          "select",
          {
            id: "audit-target-select",
            className: aN,
            value: c,
            onChange: (R) => h(R.target.value),
            children: a.map((R) => /* @__PURE__ */ f.jsxs("option", { value: Lr(R), children: [
              R.kind === "voice_asset" ? "Voice asset" : "Utterance",
              " · ",
              R.label
            ] }, Lr(R)))
          }
        )
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: iN, children: [
        /* @__PURE__ */ f.jsx(
          ft,
          {
            variant: "ghost",
            size: "sm",
            onClick: L,
            disabled: p.length === 0 || m,
            children: "Export JSON"
          }
        ),
        r && /* @__PURE__ */ f.jsx(
          ft,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => void z(),
            disabled: w || !C,
            children: w ? "Reverting…" : "Revert to identity"
          }
        )
      ] })
    ] }),
    v && /* @__PURE__ */ f.jsx("div", { className: hN, children: v }),
    m && !v && /* @__PURE__ */ f.jsx("div", { className: mN, "aria-live": "polite", children: "Loading edit history…" }),
    !m && !v && p.length === 0 && /* @__PURE__ */ f.jsxs("p", { className: Vy, children: [
      "No edits recorded for this target yet.",
      /* @__PURE__ */ f.jsx("br", {}),
      /* @__PURE__ */ f.jsx("span", { className: fN, children: "Apply a chain in the editor to populate the history." })
    ] }),
    !m && !v && p.length > 0 && /* @__PURE__ */ f.jsx("ul", { className: lN, children: p.map((R) => {
      const J = s && C && !!R.chain_snapshot_json && R.operation_count > 0;
      return /* @__PURE__ */ f.jsxs("li", { className: sN, children: [
        /* @__PURE__ */ f.jsx("span", { className: oN, children: gN(R.recorded_at) }),
        /* @__PURE__ */ f.jsx("span", { className: uN, children: R.operation_count === 0 ? "cleared" : `${R.operation_count} ops` }),
        /* @__PURE__ */ f.jsxs("span", { className: cN, title: R.digest_after, children: [
          R.digest_after.slice(0, 12),
          "…"
        ] }),
        /* @__PURE__ */ f.jsx("span", { className: ky, children: R.actor || "—" }),
        /* @__PURE__ */ f.jsx(
          "span",
          {
            className: dN,
            style: {
              background: `color-mix(in oklab, ${R.operation_count === 0 ? "var(--error)" : "var(--accent)"} 14%, transparent)`,
              color: R.operation_count === 0 ? "var(--error)" : "var(--accent)"
            },
            children: R.digest_before === "" || !R.digest_before ? "create" : R.operation_count === 0 ? "clear" : "update"
          }
        ),
        J && /* @__PURE__ */ f.jsx(
          "button",
          {
            type: "button",
            className: rN,
            disabled: w || j !== null,
            onClick: async () => {
              if (!(!C || !R.chain_snapshot_json) && !(j !== null || w) && window.confirm(
                `Replay this ${R.operation_count}-op chain on "${C.label}"? A new audit entry will be written.`
              )) {
                _(R.entry_id);
                try {
                  await s(C, R.chain_snapshot_json, R);
                  const G = await lu(
                    n,
                    C.kind,
                    C.id,
                    50
                  );
                  g(G.entries);
                } catch (G) {
                  S(G instanceof Error ? G.message : "revert failed");
                } finally {
                  _(null);
                }
              }
            },
            children: j === R.entry_id ? "Reverting…" : "Revert →"
          }
        )
      ] }, R.entry_id);
    }) })
  ] });
}
function Lr(n) {
  return n ? `${n.kind}:${n.id}` : "";
}
function gN(n) {
  const a = new Date(n);
  return Number.isNaN(a.getTime()) ? n : a.toLocaleString();
}
var vN = "_1uzgubz0", yN = "_1uzgubz1", bN = "_1uzgubz2", xN = "_1uzgubz3", SN = "_1uzgubz4", wN = "_1uzgubz5", EN = "_1uzgubz6", TN = "_1uzgubz7", By = "_1uzgubz8", jN = "_1uzgubz9", cx = "_1uzgubza", dx = "_1uzgubzb", CN = "_1uzgubzc", NN = "_1uzgubzd", Wd = "_1uzgubze", ef = "_1uzgubzf", MN = "_1uzgubzg", AN = "_1uzgubzh", Hy = "_1uzgubzi", qy = "_1uzgubzj", $y = "_1uzgubzk", Iy = "_1uzgubzl", Yy = "_1uzgubzm", RN = "_1uzgubzn", _N = "_1uzgubzo", DN = "_1uzgubzp", zN = "_1uzgubzq", ON = "_1uzgubzr";
function LN({
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
  const [S, w] = x.useState(!1), T = s ? o.find((L) => L.voiceAssetId === s.speakerVoiceAssetId) : null, j = s?.defaultVectorPresetId ? c.find((L) => L.presetId === s.defaultVectorPresetId) ?? null : null, _ = (n[0] ?? "?").toUpperCase(), C = s !== null;
  return /* @__PURE__ */ f.jsxs("div", { className: `${vN}${h ? ` ${yN}` : ""}`, children: [
    /* @__PURE__ */ f.jsxs(
      "button",
      {
        type: "button",
        className: bN,
        onClick: p,
        "aria-expanded": h,
        children: [
          /* @__PURE__ */ f.jsx(
            "span",
            {
              className: xN,
              style: {
                background: `color-mix(in oklab, ${a} 22%, transparent)`,
                color: a
              },
              children: _
            }
          ),
          /* @__PURE__ */ f.jsxs("span", { className: SN, children: [
            /* @__PURE__ */ f.jsx("span", { className: wN, style: { color: a }, children: n }),
            /* @__PURE__ */ f.jsxs("span", { className: EN, children: [
              r,
              " lines"
            ] })
          ] }),
          /* @__PURE__ */ f.jsxs("span", { className: TN, children: [
            T ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
              /* @__PURE__ */ f.jsx("span", { className: By, children: T.displayName }),
              T.durationMs != null && /* @__PURE__ */ f.jsxs("span", { children: [
                Fy(T.durationMs),
                " ·",
                " ",
                T.sampleRate ? `${T.sampleRate} Hz` : "—"
              ] })
            ] }) : j ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
              /* @__PURE__ */ f.jsx("span", { className: By, children: j.presetName }),
              /* @__PURE__ */ f.jsx("span", { children: "preset" })
            ] }) : /* @__PURE__ */ f.jsx("span", { children: "no voice assigned" }),
            s?.voiceAssetChainDigest && /* @__PURE__ */ f.jsxs("span", { className: CN, children: [
              "chain · ",
              s.voiceAssetChainDigest.slice(0, 8)
            ] })
          ] }),
          /* @__PURE__ */ f.jsx(
            "span",
            {
              className: `${jN} ${C ? cx : dx}`,
              children: C ? "Mapped" : "Unmapped"
            }
          )
        ]
      }
    ),
    h && /* @__PURE__ */ f.jsxs("div", { className: NN, children: [
      /* @__PURE__ */ f.jsxs("div", { className: Wd, children: [
        /* @__PURE__ */ f.jsx("span", { className: ef, children: "Drop new audio" }),
        /* @__PURE__ */ f.jsxs(
          "label",
          {
            className: `${MN}${S ? ` ${AN}` : ""}`,
            onDragEnter: (L) => {
              L.preventDefault(), w(!0);
            },
            onDragOver: (L) => L.preventDefault(),
            onDragLeave: () => w(!1),
            onDrop: (L) => {
              L.preventDefault(), w(!1);
              const z = L.dataTransfer.files?.[0];
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
                  onChange: (L) => {
                    const z = L.target.files?.[0];
                    z && b && b(z);
                  }
                }
              )
            ]
          }
        )
      ] }),
      o.length > 0 && /* @__PURE__ */ f.jsxs("div", { className: Wd, children: [
        /* @__PURE__ */ f.jsx("span", { className: ef, children: "Reference library" }),
        /* @__PURE__ */ f.jsx("div", { className: Hy, children: o.map((L) => /* @__PURE__ */ f.jsxs(
          "button",
          {
            type: "button",
            className: `${qy}${s?.speakerVoiceAssetId === L.voiceAssetId ? ` ${$y}` : ""}`,
            onClick: () => g(L.voiceAssetId),
            children: [
              /* @__PURE__ */ f.jsx("span", { className: Iy, children: L.displayName }),
              /* @__PURE__ */ f.jsxs("span", { className: Yy, children: [
                L.durationMs != null ? Fy(L.durationMs) : "—",
                " ",
                "·",
                " ",
                L.sampleRate ? `${L.sampleRate} Hz` : "—"
              ] })
            ]
          },
          L.voiceAssetId
        )) })
      ] }),
      c.length > 0 && m && /* @__PURE__ */ f.jsxs("div", { className: Wd, children: [
        /* @__PURE__ */ f.jsx("span", { className: ef, children: "Preset voices" }),
        /* @__PURE__ */ f.jsx("div", { className: Hy, children: c.map((L) => /* @__PURE__ */ f.jsxs(
          "button",
          {
            type: "button",
            className: `${qy}${s?.defaultVectorPresetId === L.presetId ? ` ${$y}` : ""}`,
            onClick: () => m(L.presetId),
            children: [
              /* @__PURE__ */ f.jsx("span", { className: Iy, children: L.presetName }),
              /* @__PURE__ */ f.jsx("span", { className: Yy, children: "preset · vector" })
            ]
          },
          L.presetId
        )) })
      ] }),
      C && v && /* @__PURE__ */ f.jsx("button", { type: "button", className: ON, onClick: v, children: "Clear mapping →" })
    ] })
  ] });
}
function Fy(n) {
  if (!Number.isFinite(n) || n < 0) return "0:00";
  const a = Math.round(n / 1e3), r = Math.floor(a / 60), s = a % 60;
  return `${r}:${s.toString().padStart(2, "0")}`;
}
function UN({
  unmappedCount: n,
  totalCount: a,
  children: r,
  emptyHint: s
}) {
  if (a === 0)
    return /* @__PURE__ */ f.jsx("p", { className: zN, children: s ?? "Add at least one tagged dialogue line to populate the cast." });
  const o = n === 0;
  return /* @__PURE__ */ f.jsxs("div", { children: [
    /* @__PURE__ */ f.jsx("header", { className: RN, children: /* @__PURE__ */ f.jsx(
      "span",
      {
        className: `${_N} ${o ? cx : dx}`,
        children: o ? `All ${a} mapped` : `${n} of ${a} unmapped`
      }
    ) }),
    /* @__PURE__ */ f.jsx("ul", { className: DN, children: r })
  ] });
}
async function Bf() {
  return bt("/runtime/health");
}
async function kN() {
  await bt("/runtime/start", { method: "POST" });
}
async function VN() {
  return bt("/runtime/stop", { method: "POST" });
}
function fx(n) {
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
var BN = "g5r6d10", HN = "g5r6d11", qN = "g5r6d12", $N = "g5r6d13", IN = "g5r6d14", YN = "g5r6d15", FN = "g5r6d1a", GN = "g5r6d1b", XN = "g5r6d1c", KN = "g5r6d1d", QN = "g5r6d1e", PN = "g5r6d1g", ZN = "g5r6d1h", JN = "g5r6d1i", WN = "g5r6d1j", eM = "g5r6d1k", tM = "g5r6d1l", Gy = "g5r6d1m", nM = "g5r6d1n", aM = "g5r6d1o", iM = "g5r6d1p", Xy = "g5r6d1q", Ky = "g5r6d1r", rM = "g5r6d1s", lM = "g5r6d1t", $r = "g5r6d1u", hx = "g5r6d1v", Qy = "g5r6d1w", sM = "g5r6d1x", oM = "g5r6d1y", ci = "g5r6d1z", uM = "g5r6d110", cM = "g5r6d111", dM = "g5r6d112", fM = "g5r6d113", hM = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function _n({
  severity: n,
  children: a,
  role: r,
  ariaLive: s,
  className: o,
  style: c
}) {
  const h = [hM[n], o].filter(Boolean).join(" "), p = r ?? (n === "error" ? "alert" : "status"), g = s ?? (n === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ f.jsx("div", { className: h, role: p, "aria-live": g, style: c, children: a });
}
var mx = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, px = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, mM = "_13bb4njb";
function vi({
  tone: n,
  size: a = "sm",
  pulse: r = !1,
  children: s,
  className: o,
  style: c,
  title: h
}) {
  const p = r && n !== "faint", g = [mx[a], px[n], p ? mM : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsx("span", { className: g, style: c, title: h, children: s });
}
const pM = 4e3;
function gM({ deployment: n }) {
  const [a, r] = x.useState(null), [s, o] = x.useState(null);
  x.useEffect(() => {
    let p = !1;
    const g = async () => {
      try {
        const b = await Bf();
        p || (r(b), o(null));
      } catch (b) {
        p || o(bM(b));
      }
    };
    g();
    const m = setInterval(g, pM);
    return () => {
      p = !0, clearInterval(m);
    };
  }, []);
  const c = a?.badge ?? "not_installed", h = s?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ f.jsxs("output", { className: hx, "aria-live": "polite", children: [
    /* @__PURE__ */ f.jsx("span", { className: $r, children: "Runtime" }),
    /* @__PURE__ */ f.jsx("span", { children: n.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ f.jsx("span", { className: $r, children: "Badge" }),
    /* @__PURE__ */ f.jsx(vi, { tone: vM(c), pulse: c === "starting" || c === "installing", children: fx(c) }),
    a && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
      /* @__PURE__ */ f.jsx("span", { className: $r, children: "Uptime" }),
      /* @__PURE__ */ f.jsx("span", { children: yM(a.uptimeSeconds) }),
      /* @__PURE__ */ f.jsx("span", { className: $r, children: "VRAM" }),
      /* @__PURE__ */ f.jsxs("span", { children: [
        a.vramUsedMb,
        " / ",
        a.vramTotalMb,
        " MB"
      ] })
    ] }),
    s && !h && /* @__PURE__ */ f.jsx(_n, { severity: "error", children: s })
  ] });
}
function vM(n) {
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
function yM(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60);
  return a < 60 ? `${a}m ${n % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function bM(n) {
  return n instanceof Pr || n instanceof Error ? n.message : "unknown error";
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
}, Ua = 1e-3;
function xM(n, a, r) {
  for (const s of Object.keys(fu)) {
    const o = fu[s];
    if (Math.abs(o.low - n) < Ua && Math.abs(o.mid - a) < Ua && Math.abs(o.high - r) < Ua)
      return s;
  }
  return "custom";
}
function SM(n) {
  let a = EM();
  for (const r of n.ops)
    a = wM(a, r);
  return a;
}
function wM(n, a) {
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
          preset: xM(a.low_db, a.mid_db, a.high_db)
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
function EM() {
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
function Si(n, a) {
  return n.ops.filter((r) => r.mode !== a);
}
function wi(n, a) {
  return [...n, a];
}
function TM(n, a) {
  const r = Si(n, "gain");
  if (Math.abs(a) < Ua) return { ...n, ops: r };
  const s = { id: yn(), mode: "gain", gain_db: a };
  return { ...n, ops: wi(r, s) };
}
function jM(n, a, r, s) {
  const o = Si(n, "eq3");
  if (Math.abs(a) < Ua && Math.abs(r) < Ua && Math.abs(s) < Ua)
    return { ...n, ops: o };
  const c = {
    id: yn(),
    mode: "eq3",
    low_db: a,
    mid_db: r,
    high_db: s
  };
  return { ...n, ops: wi(o, c) };
}
function CM(n, a) {
  const r = Si(n, "speed");
  if (Math.abs(a - 1) < Ua) return { ...n, ops: r };
  const s = { id: yn(), mode: "speed", factor: a };
  return { ...n, ops: wi(r, s) };
}
function NM(n, a) {
  const r = Si(n, "pitch_shift");
  if (Math.abs(a) < Ua) return { ...n, ops: r };
  const s = {
    id: yn(),
    mode: "pitch_shift",
    semitones: a
  };
  return { ...n, ops: wi(r, s) };
}
function MM(n, a, r) {
  const s = Si(n, "normalize");
  if (a === "off") return { ...n, ops: s };
  const o = {
    id: yn(),
    mode: "normalize",
    target_lufs: r
  };
  return { ...n, ops: wi(s, o) };
}
function AM(n, a) {
  const r = Si(n, "fade_in");
  if (a <= 0) return { ...n, ops: r };
  const s = {
    id: yn(),
    mode: "fade_in",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...n, ops: wi(r, s) };
}
function RM(n, a) {
  const r = Si(n, "fade_out");
  if (a <= 0) return { ...n, ops: r };
  const s = {
    id: yn(),
    mode: "fade_out",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...n, ops: wi(r, s) };
}
function _M(n, a, r) {
  const s = Si(n, "silence_strip");
  if (!a) return { ...n, ops: s };
  const o = {
    id: yn(),
    mode: "silence_strip",
    threshold_db: r
  };
  return { ...n, ops: wi(s, o) };
}
const gx = /* @__PURE__ */ new Set([
  "gain",
  "eq3",
  "speed",
  "pitch_shift",
  "normalize",
  "fade_in",
  "fade_out",
  "silence_strip"
]);
function vx(n, a) {
  const r = {
    ...n,
    ops: n.ops.filter((c) => !gx.has(c.mode))
  };
  let o = TM({ version: 1, ops: [] }, a.volumeDb);
  return o = jM(
    o,
    a.eq3.low,
    a.eq3.mid,
    a.eq3.high
  ), a.speed.mode === "audio" && (o = CM(o, a.speed.value)), o = NM(o, a.pitchSt), o = MM(
    o,
    a.normalize.mode === "off" ? "off" : "loudness",
    a.normalize.targetDbOrLufs
  ), o = AM(o, a.fade.inS), o = RM(o, a.fade.outS), o = _M(
    o,
    a.silence.enabled,
    a.silence.thresholdDb
  ), { ...r, ops: [...r.ops, ...o.ops] };
}
function yx(n) {
  const a = {
    ...n,
    ops: n.ops.filter((r) => gx.has(r.mode))
  };
  return SM(a);
}
var DM = "_1rsa80i0", zM = "_1rsa80i1", OM = "_1rsa80i2", LM = "_1rsa80i3", UM = "_1rsa80i4", kM = "_1rsa80i5", VM = "_1rsa80i6", BM = "_1rsa80i7", HM = "_1rsa80i8", qM = "_1rsa80i9";
const bx = ["flat", "warm", "bright", "voice", "telephone"], Kl = -12, Yo = 12, $M = 0.5;
function IM(n) {
  const { low: a, mid: r, high: s, preset: o, onChange: c, disabled: h } = n, p = (m) => {
    const b = fu[m];
    c(b.low, b.mid, b.high, m);
  }, g = (m, b) => {
    const v = { low: a, mid: r, high: s, [m]: b }, S = FM(v.low, v.mid, v.high);
    c(v.low, v.mid, v.high, S);
  };
  return /* @__PURE__ */ f.jsxs("div", { className: DM, children: [
    /* @__PURE__ */ f.jsxs("div", { className: zM, role: "group", "aria-label": "EQ presets", children: [
      bx.map((m) => /* @__PURE__ */ f.jsx(
        "button",
        {
          type: "button",
          className: OM,
          "data-active": o === m,
          onClick: () => p(m),
          disabled: h,
          children: m
        },
        m
      )),
      o === "custom" ? /* @__PURE__ */ f.jsx("span", { className: LM, children: "custom" }) : null
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: UM, children: [
      /* @__PURE__ */ f.jsx(
        tf,
        {
          label: "Low",
          value: a,
          onChange: (m) => g("low", m),
          disabled: h
        }
      ),
      /* @__PURE__ */ f.jsx(
        tf,
        {
          label: "Mid",
          value: r,
          onChange: (m) => g("mid", m),
          disabled: h
        }
      ),
      /* @__PURE__ */ f.jsx(
        tf,
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
function tf({ label: n, value: a, onChange: r, disabled: s }) {
  const o = (a - Kl) / (Yo - Kl) * 100, c = x.useId();
  return /* @__PURE__ */ f.jsxs("div", { className: kM, children: [
    /* @__PURE__ */ f.jsx("label", { htmlFor: c, className: VM, children: n }),
    /* @__PURE__ */ f.jsx(
      "input",
      {
        id: c,
        type: "range",
        min: Kl,
        max: Yo,
        step: $M,
        value: a,
        disabled: s,
        className: HM,
        style: { "--fill": `${o}%` },
        onChange: (h) => r(Number(h.target.value)),
        "aria-valuemin": Kl,
        "aria-valuemax": Yo,
        "aria-valuenow": a
      }
    ),
    /* @__PURE__ */ f.jsx("span", { className: BM, children: YM(a) }),
    /* @__PURE__ */ f.jsxs("span", { className: qM, "aria-hidden": "true", children: [
      /* @__PURE__ */ f.jsx("span", { children: Kl }),
      /* @__PURE__ */ f.jsx("span", { children: "0" }),
      /* @__PURE__ */ f.jsxs("span", { children: [
        "+",
        Yo
      ] })
    ] })
  ] });
}
function YM(n) {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} dB`;
}
const nf = 1e-3;
function FM(n, a, r) {
  for (const s of bx) {
    const o = fu[s];
    if (Math.abs(o.low - n) < nf && Math.abs(o.mid - a) < nf && Math.abs(o.high - r) < nf)
      return s;
  }
  return "custom";
}
var GM = "_85bhwb0", XM = "_85bhwb1", Py = "_85bhwb2", KM = "_85bhwb3", QM = "_85bhwb4", PM = "_85bhwb5", ZM = "_85bhwb6", JM = "_85bhwb7";
const Fo = 0.5, af = 2, WM = 0.05;
function eA(n) {
  const { mode: a, value: r, supportsSynthSpeed: s, onChange: o, onReRenderAtSynthTime: c, disabled: h } = n, p = (r - Fo) / (af - Fo) * 100, g = x.useId(), m = (v) => o(v, r), b = (v) => o(a, v);
  return /* @__PURE__ */ f.jsxs("div", { className: GM, children: [
    s ? /* @__PURE__ */ f.jsxs("div", { className: XM, role: "group", "aria-label": "Speed mode", children: [
      /* @__PURE__ */ f.jsx(
        "button",
        {
          type: "button",
          className: Py,
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
          className: Py,
          "data-active": a === "synth",
          onClick: () => m("synth"),
          disabled: h,
          children: "Synth"
        }
      )
    ] }) : null,
    /* @__PURE__ */ f.jsxs("div", { className: KM, children: [
      /* @__PURE__ */ f.jsx(
        "input",
        {
          id: g,
          type: "range",
          min: Fo,
          max: af,
          step: WM,
          value: r,
          disabled: h,
          className: QM,
          style: { "--fill": `${p}%` },
          onChange: (v) => b(Number(v.target.value)),
          "aria-valuemin": Fo,
          "aria-valuemax": af,
          "aria-valuenow": r,
          "aria-label": "Speed factor"
        }
      ),
      /* @__PURE__ */ f.jsx("span", { className: PM, children: `${r.toFixed(2)}×` })
    ] }),
    a === "synth" && s ? /* @__PURE__ */ f.jsxs("div", { className: ZM, children: [
      /* @__PURE__ */ f.jsx(
        ft,
        {
          variant: "primary",
          size: "sm",
          onClick: c,
          disabled: h || !c,
          children: "Re-render at synth-time"
        }
      ),
      /* @__PURE__ */ f.jsx("span", { className: JM, children: "Synth-time speed re-runs the worker for new utterances." })
    ] }) : null
  ] });
}
var tA = "kgszk50", nA = "kgszk51", Zy = "kgszk52", aA = "kgszk53", iA = "kgszk54", xx = "kgszk55", rA = "kgszk56", lA = "kgszk58", Ch = "kgszk59", Sx = "kgszk5a", Nh = "kgszk5b", sA = "kgszk5c", oA = "kgszk5d", uA = "kgszk5e", Jy = "kgszk5f", Wy = "kgszk5g", e0 = "kgszk5h", cA = "kgszk5i", dA = "kgszk5j", fA = "kgszk5l", ds = "kgszk5m", fs = "kgszk5n";
const hA = -24, mA = 24, pA = 0.5, gA = -12, vA = 12, yA = 0.5, bA = -30, xA = -6, SA = -12, wA = 0, Go = -60, rf = -20;
function Mh(n) {
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
  }, v = CA(a), S = (w) => {
    const T = w.target;
    T && (T.tagName === "INPUT" || T.tagName === "BUTTON" || T.closest("input, button")) && c?.();
  };
  return /* @__PURE__ */ f.jsxs("div", { className: tA, onPointerDownCapture: S, children: [
    /* @__PURE__ */ f.jsxs("div", { className: nA, children: [
      v.length === 0 ? /* @__PURE__ */ f.jsx("span", { className: aA, children: "No active edits" }) : /* @__PURE__ */ f.jsxs("span", { className: Zy, children: [
        /* @__PURE__ */ f.jsx("span", { "aria-hidden": "true", children: "Active:" }),
        /* @__PURE__ */ f.jsx("span", { children: v.join(" · ") })
      ] }),
      h ? /* @__PURE__ */ f.jsxs("span", { className: Zy, "aria-live": "polite", children: [
        /* @__PURE__ */ f.jsx("span", { className: iA, "aria-hidden": "true" }),
        "Re-rendering"
      ] }) : null
    ] }),
    /* @__PURE__ */ f.jsx(
      t0,
      {
        label: "Volume",
        sub: "Pre-mix gain in dB",
        min: hA,
        max: mA,
        step: pA,
        format: NA,
        value: a.volumeDb,
        onChange: (w) => b({ volumeDb: w }),
        disabled: p
      }
    ),
    /* @__PURE__ */ f.jsxs("div", { className: ds, children: [
      /* @__PURE__ */ f.jsx("span", { className: fs, children: "3-band EQ" }),
      /* @__PURE__ */ f.jsx(
        IM,
        {
          low: a.eq3.low,
          mid: a.eq3.mid,
          high: a.eq3.high,
          preset: a.eq3.preset,
          disabled: p,
          onChange: (w, T, j, _) => b({ eq3: { low: w, mid: T, high: j, preset: _ } })
        }
      )
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: ds, children: [
      /* @__PURE__ */ f.jsx("span", { className: fs, children: "Speed" }),
      /* @__PURE__ */ f.jsx(
        eA,
        {
          mode: a.speed.mode,
          value: a.speed.value,
          supportsSynthSpeed: s,
          ...o ? { onReRenderAtSynthTime: o } : {},
          disabled: p,
          onChange: (w, T) => b({ speed: { mode: w, value: T } })
        }
      )
    ] }),
    /* @__PURE__ */ f.jsx(
      t0,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: gA,
        max: vA,
        step: yA,
        format: MA,
        value: a.pitchSt,
        onChange: (w) => b({ pitchSt: w }),
        disabled: p
      }
    ),
    /* @__PURE__ */ f.jsx(
      EA,
      {
        normalize: a.normalize,
        disabled: p,
        onChange: (w) => b({ normalize: w })
      }
    ),
    /* @__PURE__ */ f.jsx(
      TA,
      {
        inS: a.fade.inS,
        outS: a.fade.outS,
        disabled: p,
        onChange: (w, T) => b({ fade: { ...a.fade, inS: w, outS: T } })
      }
    ),
    /* @__PURE__ */ f.jsx(
      jA,
      {
        enabled: a.silence.enabled,
        thresholdDb: a.silence.thresholdDb,
        disabled: p,
        onChange: (w, T) => b({ silence: { enabled: w, thresholdDb: T } })
      }
    ),
    g ? /* @__PURE__ */ f.jsxs("div", { className: fA, children: [
      /* @__PURE__ */ f.jsx(
        ft,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => r(Mu),
          disabled: p,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ f.jsx(ft, { variant: "primary", size: "md", onClick: g, disabled: p, children: m })
    ] }) : null
  ] });
}
function t0(n) {
  const { label: a, sub: r, min: s, max: o, step: c, format: h, value: p, onChange: g, disabled: m } = n, b = (p - s) / (o - s) * 100, v = x.useId();
  return /* @__PURE__ */ f.jsxs("div", { className: xx, children: [
    /* @__PURE__ */ f.jsxs("div", { className: rA, children: [
      /* @__PURE__ */ f.jsx("label", { htmlFor: v, className: lA, children: a }),
      /* @__PURE__ */ f.jsx("span", { className: Sx, children: r })
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
        className: Nh,
        style: { "--fill": `${b}%` },
        onChange: (S) => g(Number(S.target.value)),
        "aria-valuemin": s,
        "aria-valuemax": o,
        "aria-valuenow": p
      }
    ),
    /* @__PURE__ */ f.jsx("span", { className: Ch, children: h(p) })
  ] });
}
function EA({ normalize: n, onChange: a, disabled: r }) {
  const o = n.mode === "loudness" ? { min: bA, max: xA, step: 0.5, suffix: "LUFS" } : { min: SA, max: wA, step: 0.5, suffix: "dB" }, c = AA(n.targetDbOrLufs, o.min, o.max), h = (c - o.min) / (o.max - o.min) * 100, p = (g) => {
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
    /* @__PURE__ */ f.jsx("div", { className: sA, role: "group", "aria-label": "Normalize mode", children: ["off", "peak", "loudness"].map((g) => {
      const m = g === "peak";
      return /* @__PURE__ */ f.jsxs(
        "button",
        {
          type: "button",
          className: oA,
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
    n.mode !== "off" ? /* @__PURE__ */ f.jsxs("div", { className: xx, children: [
      /* @__PURE__ */ f.jsx("span", { className: Sx, children: "Target" }),
      /* @__PURE__ */ f.jsx(
        "input",
        {
          type: "range",
          min: o.min,
          max: o.max,
          step: o.step,
          value: c,
          disabled: r,
          className: Nh,
          style: { "--fill": `${h}%` },
          onChange: (g) => a({ mode: n.mode, targetDbOrLufs: Number(g.target.value) }),
          "aria-valuemin": o.min,
          "aria-valuemax": o.max,
          "aria-valuenow": c,
          "aria-label": `Normalize target ${o.suffix}`
        }
      ),
      /* @__PURE__ */ f.jsxs("span", { className: Ch, children: [
        c.toFixed(1),
        " ",
        o.suffix
      ] })
    ] }) : null
  ] });
}
function TA({ inS: n, outS: a, onChange: r, disabled: s }) {
  const o = x.useId(), c = x.useId();
  return /* @__PURE__ */ f.jsxs("div", { className: ds, children: [
    /* @__PURE__ */ f.jsx("span", { className: fs, children: "Fade" }),
    /* @__PURE__ */ f.jsxs("div", { className: uA, children: [
      /* @__PURE__ */ f.jsxs("div", { className: Jy, children: [
        /* @__PURE__ */ f.jsx("label", { className: Wy, htmlFor: o, children: "Fade in (s)" }),
        /* @__PURE__ */ f.jsx(
          "input",
          {
            id: o,
            type: "number",
            min: 0,
            step: 0.05,
            value: n,
            disabled: s,
            className: e0,
            onChange: (h) => r(Math.max(0, Number(h.target.value)), a)
          }
        )
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: Jy, children: [
        /* @__PURE__ */ f.jsx("label", { className: Wy, htmlFor: c, children: "Fade out (s)" }),
        /* @__PURE__ */ f.jsx(
          "input",
          {
            id: c,
            type: "number",
            min: 0,
            step: 0.05,
            value: a,
            disabled: s,
            className: e0,
            onChange: (h) => r(n, Math.max(0, Number(h.target.value)))
          }
        )
      ] })
    ] })
  ] });
}
function jA({ enabled: n, thresholdDb: a, onChange: r, disabled: s }) {
  const o = (a - Go) / (rf - Go) * 100;
  return /* @__PURE__ */ f.jsxs("div", { className: ds, children: [
    /* @__PURE__ */ f.jsx("span", { className: fs, children: "Silence trim" }),
    /* @__PURE__ */ f.jsxs("div", { className: cA, children: [
      /* @__PURE__ */ f.jsxs("label", { className: dA, children: [
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
          max: rf,
          step: 1,
          value: a,
          disabled: s || !n,
          className: Nh,
          style: { "--fill": `${o}%`, flex: 1 },
          onChange: (c) => r(n, Number(c.target.value)),
          "aria-valuemin": Go,
          "aria-valuemax": rf,
          "aria-valuenow": a,
          "aria-label": "Silence threshold dB"
        }
      ),
      /* @__PURE__ */ f.jsxs("span", { className: Ch, children: [
        a.toFixed(0),
        " dB"
      ] })
    ] })
  ] });
}
const Ur = 1e-3;
function CA(n) {
  const a = [];
  return Math.abs(n.volumeDb) >= Ur && a.push("gain"), (Math.abs(n.eq3.low) >= Ur || Math.abs(n.eq3.mid) >= Ur || Math.abs(n.eq3.high) >= Ur) && a.push("eq3"), n.speed.mode === "audio" && Math.abs(n.speed.value - 1) >= Ur && a.push("speed"), Math.abs(n.pitchSt) >= Ur && a.push("pitch"), n.normalize.mode !== "off" && a.push("normalize"), n.fade.inS > 0 && a.push("fade-in"), n.fade.outS > 0 && a.push("fade-out"), n.silence.enabled && a.push("silence"), a;
}
function NA(n) {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} dB`;
}
function MA(n) {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} st`;
}
function AA(n, a, r) {
  return Number.isFinite(n) ? Math.max(a, Math.min(r, n)) : a;
}
var RA = "skdk4g1", _A = "skdk4g3", DA = "skdk4g4", zA = "skdk4g5", n0 = "skdk4g6", a0 = "skdk4g7", OA = "skdk4g8", i0 = "skdk4g9", r0 = "skdk4ga", LA = "skdk4gb", l0 = "skdk4gc", UA = "skdk4gd", s0 = "skdk4ge", kA = "cgsfgh1", VA = "cgsfgh2", BA = "cgsfgh3", HA = "cgsfgh4", qA = "cgsfgh5", $A = "cgsfgh6", IA = "cgsfgh7", YA = "cgsfgh8", FA = "cgsfgh9", GA = "cgsfgha", XA = "cgsfghb", KA = "cgsfghc", QA = "cgsfghd", PA = "cgsfghe", ZA = "cgsfghf", JA = "cgsfghg", WA = "cgsfghh", eR = "cgsfghi", tR = "cgsfghj", nR = "cgsfghk", aR = "cgsfghl", iR = "cgsfghm", rR = "cgsfghn", lR = "cgsfgho", sR = "cgsfghp";
const Ut = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], ts = {
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
}, wx = 0.05;
function oR(n) {
  let a = null, r = -1 / 0;
  for (const s of Ut) {
    const o = n[s];
    o > r && (r = o, a = s);
  }
  return !a || r <= wx ? null : a;
}
function Ex(n, a = 3) {
  return Ut.map((r) => ({ key: r, label: ts[r], value: n[r] })).filter((r) => r.value > wx).sort((r, s) => s.value - r.value).slice(0, a);
}
function uR(n) {
  let a = 0;
  for (const r of Ut) a += n[r] * n[r];
  return Math.sqrt(a);
}
function o0(n) {
  const a = Ex(n, 2), r = a[0];
  if (!r) return "";
  const s = a[1];
  return !s || r.value - s.value > 0.25 ? lf(r.label) : `${lf(r.label)} + ${s.label.toLowerCase()}`;
}
function lf(n) {
  if (!n) return n;
  const a = n[0];
  return a ? a.toUpperCase() + n.slice(1) : n;
}
function ms(n) {
  const a = { ...hs };
  for (const r of Ut) {
    const s = n[r];
    a[r] = Number.isFinite(s) ? Math.max(0, Math.min(1, s)) : 0;
  }
  return a;
}
const u0 = 0.05, c0 = 0.2, cR = 22, dR = 320, sf = 0.78;
function of(n, a, r, s) {
  const o = Math.cos(r), c = Math.sin(r), h = n * o + a * c;
  return Math.max(0, Math.min(1, h / s));
}
function fR(n) {
  const { vec: a, onChange: r, size: s, reduceMotion: o = !1 } = n, [c, h] = x.useState(a), [p, g] = x.useState(null), [m, b] = x.useState(null), v = x.useRef(null), S = x.useRef(a), w = x.useRef(o), T = x.useRef(null), j = x.useRef(0);
  w.current = o, x.useEffect(() => {
    h(a), S.current = a;
  }, [a]);
  const _ = x.useCallback(
    (O) => {
      const $ = ms(O);
      h($), S.current = $, r($);
    },
    [r]
  ), C = x.useCallback((O) => {
    const $ = ms(O);
    h($), S.current = $;
  }, []), L = x.useCallback(
    (O) => {
      const $ = v.current;
      if (!$ || w.current) return;
      const re = O.clientX - $.centerX, ae = O.clientY - $.centerY, me = s / 2 * sf, ge = of(re, ae, $.angle, me), oe = { ...S.current, [$.axis]: ge };
      C(oe);
    },
    [s, C]
  ), z = x.useCallback(
    (O) => {
      const $ = v.current;
      if ($) {
        if (window.removeEventListener("pointermove", L), window.removeEventListener("pointerup", z), window.removeEventListener("pointercancel", z), w.current) {
          const re = O.clientX - $.centerX, ae = O.clientY - $.centerY, me = s / 2 * sf, ge = of(re, ae, $.angle, me), oe = { ...S.current, [$.axis]: ge };
          v.current = null, _(oe);
          return;
        }
        v.current = null, _(S.current);
      }
    },
    [_, L, s]
  );
  x.useEffect(() => () => {
    window.removeEventListener("pointermove", L), window.removeEventListener("pointerup", z), window.removeEventListener("pointercancel", z), v.current = null, T.current !== null && (window.clearTimeout(T.current), T.current = null);
  }, [L, z]);
  const R = x.useCallback((O, $) => {
    w.current || (j.current += 1, b({ x: O, y: $, key: j.current }), T.current !== null && window.clearTimeout(T.current), T.current = window.setTimeout(() => {
      b(null), T.current = null;
    }, dR));
  }, []), J = x.useCallback(
    (O, $, re, ae, me) => {
      const ge = re.getBoundingClientRect(), oe = ge.left + ge.width / 2, U = ge.top + ge.height / 2, q = Ut.indexOf(O) / Ut.length * Math.PI * 2 - Math.PI / 2;
      if (v.current = {
        axis: O,
        pointerId: $,
        centerX: oe,
        centerY: U,
        angle: q
      }, g(O), ae !== void 0 && me !== void 0) {
        const Q = ae - oe, te = me - U, N = s / 2 * sf, K = of(Q, te, q, N), Z = { ...S.current, [O]: K };
        w.current ? _(Z) : C(Z);
      }
      window.addEventListener("pointermove", L), window.addEventListener("pointerup", z), window.addEventListener("pointercancel", z);
    },
    [_, L, z, s, C]
  ), G = x.useCallback(
    (O, $) => {
      $.preventDefault();
      const re = $.currentTarget, ae = re.ownerSVGElement ?? re;
      J(O, $.pointerId, ae);
    },
    [J]
  ), W = x.useCallback(
    (O) => {
      const $ = O.currentTarget, re = $ instanceof SVGSVGElement ? $ : $.ownerSVGElement ?? $, ae = re.getBoundingClientRect(), me = ae.left + ae.width / 2, ge = ae.top + ae.height / 2, oe = O.clientX - me, U = O.clientY - ge;
      if (Math.sqrt(oe * oe + U * U) < 8) return;
      let q = Math.atan2(U, oe) * 180 / Math.PI;
      q = ((q + 90) % 360 + 360) % 360;
      let Q = null, te = 999;
      for (let Z = 0; Z < Ut.length; Z++) {
        const le = Ut[Z];
        if (!le) continue;
        const ce = Z / Ut.length * 360, ve = Math.abs((ce - q + 540) % 360 - 180);
        ve < te && (te = ve, Q = le);
      }
      if (!Q || te > cR) return;
      O.preventDefault();
      const N = (O.clientX - ae.left) / ae.width * s, K = (O.clientY - ae.top) / ae.height * s;
      R(N, K), J(Q, O.pointerId, re, O.clientX, O.clientY);
    },
    [J, s, R]
  ), A = x.useCallback(
    (O, $) => {
      const re = S.current[O];
      let ae = re;
      switch ($.key) {
        case "ArrowUp":
        case "ArrowRight":
          ae = re + u0;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          ae = re - u0;
          break;
        case "PageUp":
          ae = re + c0;
          break;
        case "PageDown":
          ae = re - c0;
          break;
        case "Home":
          ae = 0;
          break;
        case "End":
          ae = 1;
          break;
        default:
          return;
      }
      $.preventDefault(), g(O), _({ ...S.current, [O]: ae });
    },
    [_]
  );
  return {
    liveVec: c,
    activeAxis: p,
    setActiveAxis: g,
    onPointerDown: G,
    onKeyDown: A,
    onSurfacePointerDown: W,
    surfacePing: m
  };
}
const hR = [0.25, 0.5, 0.75, 1];
function mR({
  vec: n,
  onChange: a,
  size: r = 360,
  readOnly: s = !1,
  reduceMotion: o = !1
}) {
  const c = fR({ vec: n, onChange: a, size: r, reduceMotion: o }), h = r / 2, p = r / 2, g = r / 2 * 0.78, m = x.useMemo(() => pR(h, p, g), [h, p, g]), b = x.useMemo(() => Ut.map((w, T) => {
    const j = ns(c.liveVec[w]), _ = m[T];
    return _ ? `${h + _.dx * j},${p + _.dy * j}` : "0,0";
  }).join(" "), [m, h, p, c.liveVec]), v = oR(c.liveVec), S = uR(c.liveVec);
  return /* @__PURE__ */ f.jsxs("div", { className: kA, children: [
    /* @__PURE__ */ f.jsx("div", { className: VA, style: { width: r, height: r }, children: /* @__PURE__ */ f.jsxs(
      "svg",
      {
        className: BA,
        viewBox: `0 0 ${r} ${r}`,
        role: "img",
        "aria-label": "8-axis emotion radar",
        onPointerDown: s ? void 0 : c.onSurfacePointerDown,
        style: s ? void 0 : { cursor: "crosshair", touchAction: "none" },
        children: [
          hR.map((w) => /* @__PURE__ */ f.jsx(
            "circle",
            {
              className: HA,
              cx: h,
              cy: p,
              r: g * w
            },
            w
          )),
          Ut.map((w, T) => {
            const j = m[T];
            if (!j) return null;
            const _ = h + j.dx * 1.18, C = p + j.dy * 1.18, L = c.activeAxis === w;
            return /* @__PURE__ */ f.jsxs("g", { children: [
              /* @__PURE__ */ f.jsx(
                "line",
                {
                  className: qA,
                  x1: h,
                  y1: p,
                  x2: h + j.dx,
                  y2: p + j.dy
                }
              ),
              /* @__PURE__ */ f.jsx(
                "text",
                {
                  className: `${QA}${L ? ` ${PA}` : ""}`,
                  x: _,
                  y: C,
                  textAnchor: "middle",
                  dominantBaseline: "middle",
                  children: ts[w]
                }
              )
            ] }, w);
          }),
          Ut.map((w, T) => {
            const j = ns(c.liveVec[w]);
            if (j <= 0.01) return null;
            const _ = m[T];
            if (!_) return null;
            const C = c.activeAxis === w;
            return /* @__PURE__ */ f.jsx(
              "line",
              {
                className: `${IA}${C ? ` ${YA}` : ""}`,
                x1: h,
                y1: p,
                x2: h + _.dx * j,
                y2: p + _.dy * j
              },
              `petal-${w}`
            );
          }),
          /* @__PURE__ */ f.jsx("polygon", { className: $A, points: b }),
          c.surfacePing && /* @__PURE__ */ f.jsx(
            "circle",
            {
              className: KA,
              cx: c.surfacePing.x,
              cy: c.surfacePing.y,
              r: 10
            },
            c.surfacePing.key
          ),
          !s && Ut.map((w, T) => {
            const j = ns(c.liveVec[w]), _ = m[T];
            if (!_) return null;
            const C = h + _.dx * j, L = p + _.dy * j, z = c.activeAxis === w;
            return /* @__PURE__ */ f.jsxs("g", { children: [
              /* @__PURE__ */ f.jsx(
                "circle",
                {
                  className: FA,
                  cx: C,
                  cy: L,
                  r: 14,
                  tabIndex: 0,
                  role: "slider",
                  "aria-label": `${ts[w]} axis`,
                  "aria-valuemin": 0,
                  "aria-valuemax": 1,
                  "aria-valuenow": j,
                  onPointerDown: (R) => c.onPointerDown(w, R),
                  onKeyDown: (R) => c.onKeyDown(w, R),
                  onFocus: () => c.setActiveAxis(w),
                  onBlur: () => c.setActiveAxis(null)
                }
              ),
              /* @__PURE__ */ f.jsx(
                "circle",
                {
                  className: `${GA}${z ? ` ${XA}` : ""}`,
                  cx: C,
                  cy: L,
                  r: 6
                }
              )
            ] }, w);
          })
        ]
      }
    ) }),
    /* @__PURE__ */ f.jsxs("div", { className: ZA, children: [
      /* @__PURE__ */ f.jsx("span", { className: JA, children: v ? ts[v].toLowerCase() : "neutral" }),
      /* @__PURE__ */ f.jsxs("span", { className: WA, children: [
        "‖v‖ = ",
        S.toFixed(2)
      ] })
    ] }),
    /* @__PURE__ */ f.jsx("div", { className: eR, role: "group", "aria-label": "Axis values", children: Ut.map((w) => {
      const T = ns(c.liveVec[w]), j = c.activeAxis === w;
      return /* @__PURE__ */ f.jsxs(
        "button",
        {
          type: "button",
          className: `${tR}${j ? ` ${nR}` : ""}`,
          onClick: () => a({
            ...c.liveVec,
            [w]: T > 0.05 ? 0 : 0.5
          }),
          "aria-pressed": T > 0.05,
          children: [
            ts[w].toLowerCase(),
            /* @__PURE__ */ f.jsx("span", { className: aR, children: T.toFixed(2) })
          ]
        },
        w
      );
    }) })
  ] });
}
function pR(n, a, r) {
  return Ut.map((s, o) => {
    const c = o / Ut.length * Math.PI * 2 - Math.PI / 2;
    return {
      dx: Math.cos(c) * r,
      dy: Math.sin(c) * r
    };
  });
}
function ns(n) {
  return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 0;
}
function gR({ vec: n, size: a = 36 }) {
  const r = a / 2, s = a / 2, o = a / 2 * 0.86, c = x.useMemo(() => Ut.map((h, p) => {
    const g = ns(n[h]), m = p / Ut.length * Math.PI * 2 - Math.PI / 2, b = r + Math.cos(m) * o * g, v = s + Math.sin(m) * o * g;
    return `${b},${v}`;
  }).join(" "), [r, s, o, n]);
  return /* @__PURE__ */ f.jsx("span", { className: iR, "aria-hidden": "true", children: /* @__PURE__ */ f.jsxs(
    "svg",
    {
      className: rR,
      width: a,
      height: a,
      viewBox: `0 0 ${a} ${a}`,
      children: [
        /* @__PURE__ */ f.jsx("circle", { className: lR, cx: r, cy: s, r: o }),
        /* @__PURE__ */ f.jsx("polygon", { className: sR, points: c })
      ]
    }
  ) });
}
var Hf = "gvwvwg0", vR = "gvwvwg1", Tx = "gvwvwg2", jx = "gvwvwg3", yR = "gvwvwg4", bR = "gvwvwg5", xR = "gvwvwg6", SR = "gvwvwg7", wR = "gvwvwg8", ER = "gvwvwg9", TR = "gvwvwga", jR = "gvwvwgb", CR = "gvwvwgc", NR = "gvwvwgd", MR = "gvwvwge";
function AR({
  vec: n,
  onSave: a,
  saving: r = !1
}) {
  const [s, o] = x.useState(o0(n)), [c, h] = x.useState(!1), p = Ex(n, 3);
  x.useEffect(() => {
    c || o(o0(n));
  }, [n, c]);
  const g = s.trim().length > 0;
  return /* @__PURE__ */ f.jsxs("div", { className: Hf, children: [
    /* @__PURE__ */ f.jsx("header", { className: vR, children: /* @__PURE__ */ f.jsx("span", { className: Tx, children: "Save current vector as preset" }) }),
    /* @__PURE__ */ f.jsx("div", { className: jx, children: p.length === 0 ? /* @__PURE__ */ f.jsx("span", { children: "(neutral — drag the radar to set a vector first)" }) : p.map((m) => /* @__PURE__ */ f.jsxs("span", { className: yR, children: [
      m.label.toLowerCase(),
      /* @__PURE__ */ f.jsx("span", { className: bR, children: m.value.toFixed(2) })
    ] }, m.key)) }),
    /* @__PURE__ */ f.jsxs("div", { className: xR, children: [
      /* @__PURE__ */ f.jsx(
        "input",
        {
          className: SR,
          type: "text",
          placeholder: "Preset name",
          value: s,
          onChange: (m) => {
            o(m.target.value), h(!0);
          }
        }
      ),
      /* @__PURE__ */ f.jsx(
        ft,
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
function RR({
  presets: n,
  activePresetId: a,
  onSelect: r,
  onDelete: s
}) {
  return n.length === 0 ? /* @__PURE__ */ f.jsxs("div", { className: Hf, children: [
    /* @__PURE__ */ f.jsx("span", { className: Tx, children: "Preset library" }),
    /* @__PURE__ */ f.jsx("span", { className: jx, children: "No presets yet. Save your current vector to build the library." })
  ] }) : /* @__PURE__ */ f.jsxs("div", { className: Hf, children: [
    /* @__PURE__ */ f.jsx("span", { className: MR, children: "Preset library" }),
    /* @__PURE__ */ f.jsx("div", { className: wR, children: n.map((o) => {
      const c = _R(o), h = o.presetId === a;
      return /* @__PURE__ */ f.jsxs(
        "div",
        {
          className: `${ER}${h ? ` ${jR}` : ""}`,
          children: [
            /* @__PURE__ */ f.jsxs(
              "button",
              {
                type: "button",
                className: TR,
                onClick: () => r(o),
                "aria-pressed": h,
                children: [
                  /* @__PURE__ */ f.jsx(gR, { vec: c, size: 28 }),
                  /* @__PURE__ */ f.jsx("span", { className: CR, children: o.presetName })
                ]
              }
            ),
            s && /* @__PURE__ */ f.jsx(
              "button",
              {
                type: "button",
                className: NR,
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
const qf = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function _R(n) {
  const a = qf.reduce(
    (s, o) => ({ ...s, [o]: 0 }),
    {}
  );
  if (!Array.isArray(n.vector)) return a;
  const r = qf.reduce(
    (s, o, c) => ({ ...s, [o]: n.vector[c] ?? 0 }),
    a
  );
  return ms(r);
}
function uf(n) {
  return qf.map((a) => n[a] ?? 0);
}
const DR = [
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
], zR = [
  "very",
  "extremely",
  "deeply",
  "intensely",
  "absolutely",
  "totally",
  "really",
  "so"
], OR = [
  "slightly",
  "a bit",
  "a little",
  "kinda",
  "kind of",
  "somewhat",
  "barely"
], LR = ["not", "no", "never", "without", "lack", "lacking", "free of"];
function UR(n) {
  const a = n.toLowerCase().trim();
  if (!a) return { ...hs };
  const s = a.split(/\s+/).some((h) => zR.includes(h)) ? 1.2 : 1, o = OR.some((h) => a.includes(h)) ? 0.55 : 1, c = { ...hs };
  for (const h of DR) {
    let p = 0;
    for (const g of h.keywords) {
      const m = g.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"), v = new RegExp(`\\b${m}\\b`).exec(a);
      if (!v) continue;
      const S = v.index, w = a.slice(0, S), T = Math.max(
        w.lastIndexOf(","),
        w.lastIndexOf(";"),
        w.lastIndexOf(" but "),
        w.lastIndexOf(" yet ")
      ), _ = w.slice(T >= 0 ? T : 0).slice(-30);
      LR.some((C) => new RegExp(`\\b${C}\\b`).test(_)) || (p += 1);
    }
    if (p > 0) {
      const g = h.weight * Math.min(1, 0.55 + 0.2 * (p - 1)) * s * o;
      c[h.axis] = Math.min(1, g);
    }
  }
  return Ut.every((h) => c[h] === 0) && (c.calm = 0.4), ms(c);
}
const kR = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
];
function VR({
  value: n,
  onChange: a,
  deploymentId: r
}) {
  const s = n.mode ?? "none", o = x.useMemo(() => BR(n.vector), [n.vector]), c = n.emotionAlpha ?? 1, [h, p] = x.useState([]), [g, m] = x.useState(null), [b, v] = x.useState(!1), [S, w] = x.useState(null), T = x.useRef(!0);
  x.useEffect(() => (T.current = !0, () => {
    T.current = !1;
  }), []), x.useEffect(() => {
    let G = !1;
    return sx(r).then((W) => {
      G || p(d0(W.presets));
    }).catch((W) => {
      G || m(cf(W));
    }), () => {
      G = !0;
    };
  }, [r]);
  const j = (G) => {
    a({ ...n, mode: G });
  }, _ = (G) => {
    a({
      ...n,
      mode: "emotion_vector",
      vector: uf(G)
    }), S && w(null);
  }, C = (G) => {
    const W = Math.max(0, Math.min(1, Number.isFinite(G) ? G : 1));
    a({ ...n, emotionAlpha: W });
  }, L = async (G) => {
    v(!0), m(null);
    try {
      const W = await WC(r, G, uf(o));
      if (!T.current) return;
      p(
        (A) => d0([W, ...A.filter((O) => O.presetId !== W.presetId)])
      ), w(W.presetId);
    } catch (W) {
      T.current && m(cf(W));
    } finally {
      T.current && v(!1);
    }
  }, z = async (G) => {
    const W = h;
    p((A) => A.filter((O) => O.presetId !== G)), S === G && w(null);
    try {
      await eN(r, G);
    } catch (A) {
      T.current && (p(W), m(cf(A)));
    }
  }, R = (G) => {
    w(G.presetId), a({
      ...n,
      mode: "emotion_vector",
      vector: G.vector
    });
  }, J = (G) => {
    a({ ...n, mode: "qwen_template", qwenTemplate: G });
  };
  return /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
    /* @__PURE__ */ f.jsx("div", { className: `${Gy} ${RA}`, children: /* @__PURE__ */ f.jsx(
      mR,
      {
        vec: o,
        onChange: _,
        readOnly: s !== "emotion_vector"
      }
    ) }),
    /* @__PURE__ */ f.jsxs("div", { className: Gy, children: [
      /* @__PURE__ */ f.jsx("div", { className: _A, role: "radiogroup", "aria-label": "Emotion mode", children: kR.map((G) => /* @__PURE__ */ f.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": s === G.id,
          className: `${DA}${s === G.id ? ` ${zA}` : ""}`,
          onClick: () => j(G.id),
          children: G.label
        },
        G.id
      )) }),
      s === "none" && /* @__PURE__ */ f.jsxs("div", { className: s0, children: [
        "Neutral default. Per-line ",
        /* @__PURE__ */ f.jsx("code", { children: "[Char|emotion_vector:…]" }),
        " overrides still apply when present."
      ] }),
      s === "emotion_vector" && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
        /* @__PURE__ */ f.jsxs("div", { className: n0, children: [
          /* @__PURE__ */ f.jsxs("span", { children: [
            /* @__PURE__ */ f.jsx("span", { className: a0, children: "Alpha" }),
            /* @__PURE__ */ f.jsx("br", {}),
            /* @__PURE__ */ f.jsx("span", { className: OA, children: "Global mix · per-line overrides bypass it" })
          ] }),
          /* @__PURE__ */ f.jsx(
            "input",
            {
              type: "range",
              min: 0,
              max: 1,
              step: 0.01,
              value: c,
              className: i0,
              style: { "--fill": `${c * 100}%` },
              onChange: (G) => C(Number(G.target.value)),
              "aria-label": "Emotion alpha"
            }
          ),
          /* @__PURE__ */ f.jsxs("span", { className: r0, children: [
            (c * 100).toFixed(0),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ f.jsx(
          AR,
          {
            vec: o,
            onSave: L,
            saving: b
          }
        ),
        /* @__PURE__ */ f.jsx(
          RR,
          {
            presets: h,
            activePresetId: S,
            onSelect: R,
            onDelete: z
          }
        )
      ] }),
      s === "qwen_template" && /* @__PURE__ */ f.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
        /* @__PURE__ */ f.jsx(
          "textarea",
          {
            className: LA,
            placeholder: 'e.g. "Friendly teen, slightly skeptical"',
            value: n.qwenTemplate ?? "",
            onChange: (G) => J(G.target.value)
          }
        ),
        /* @__PURE__ */ f.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
          /* @__PURE__ */ f.jsx(
            ft,
            {
              variant: "secondary",
              onClick: () => {
                const G = (n.qwenTemplate ?? "").trim();
                if (!G) return;
                const W = UR(G);
                a({
                  ...n,
                  mode: "emotion_vector",
                  vector: uf(W)
                });
              },
              disabled: !(n.qwenTemplate ?? "").trim(),
              children: "Map to vector →"
            }
          ),
          /* @__PURE__ */ f.jsx("span", { className: l0, children: "Heuristic v1: keyword-based mapping. Switches to vector mode on success." })
        ] }),
        /* @__PURE__ */ f.jsxs("span", { className: l0, children: [
          "The Qwen prompt is mapped to a vector at synth time. Per-line",
          " ",
          /* @__PURE__ */ f.jsx("code", { children: "[Char|qwen:…]" }),
          " overrides take precedence."
        ] }),
        /* @__PURE__ */ f.jsxs("div", { className: n0, children: [
          /* @__PURE__ */ f.jsx("span", { className: a0, children: "Alpha" }),
          /* @__PURE__ */ f.jsx(
            "input",
            {
              type: "range",
              min: 0,
              max: 1,
              step: 0.01,
              value: c,
              className: i0,
              style: { "--fill": `${c * 100}%` },
              onChange: (G) => C(Number(G.target.value)),
              "aria-label": "Emotion alpha"
            }
          ),
          /* @__PURE__ */ f.jsxs("span", { className: r0, children: [
            (c * 100).toFixed(0),
            "%"
          ] })
        ] })
      ] }),
      s === "audio_ref" && /* @__PURE__ */ f.jsx("div", { className: s0, children: "Audio reference uses the voice asset assigned per character. Open the cast section to assign references; per-character overrides take precedence." }),
      g && /* @__PURE__ */ f.jsx("div", { className: UA, children: g })
    ] })
  ] });
}
function BR(n) {
  if (!n || !Array.isArray(n)) return ms(hs);
  const a = { ...hs };
  return Ut.forEach((r, s) => {
    const o = n[s];
    a[r] = Number.isFinite(o) ? Math.max(0, Math.min(1, o)) : 0;
  }), a;
}
function d0(n) {
  return [...n].sort((a, r) => r.updatedAt - a.updatedAt);
}
function cf(n) {
  return n instanceof Pr || n instanceof Error ? n.message : "Unknown error";
}
var HR = "_5u1uau0", Ql = "_5u1uau1", qR = "_5u1uau2", kr = "_5u1uau3", Pl = "_5u1uau4", $R = "_5u1uau5", df = "_5u1uau6", IR = "_5u1uau7", YR = "_5u1uau8", FR = "_5u1uau9", GR = "_5u1uaua", XR = "_5u1uaub", KR = "_5u1uauc", QR = "_5u1uaud";
const ff = [
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
], PR = ["mp3", "wav", "flac"], Xo = 0.5, hf = 2, ZR = 0.05, JR = 0.8, WR = 0.8, e2 = 42;
function mf(n, a, r) {
  const s = n[a];
  if (typeof s == "number" && Number.isFinite(s)) return s;
  if (typeof s == "string") {
    const o = Number(s);
    if (Number.isFinite(o)) return o;
  }
  return r;
}
function t2({
  outputFormat: n,
  onOutputFormatChange: a,
  speedFactor: r,
  onSpeedFactorChange: s,
  cachePolicy: o,
  onCachePolicyChange: c,
  generation: h,
  onGenerationChange: p
}) {
  const g = x.useId(), m = x.useId(), b = x.useId(), v = x.useId(), S = x.useId(), w = (z, R) => {
    p({ ...h, [z]: R });
  }, T = ff.find((z) => z.id === o) ?? ff[0], j = (r - Xo) / (hf - Xo) * 100, _ = mf(h, "temperature", JR), C = mf(h, "top_p", WR), L = mf(h, "seed", e2);
  return /* @__PURE__ */ f.jsxs("div", { className: HR, children: [
    /* @__PURE__ */ f.jsxs("div", { className: Ql, children: [
      /* @__PURE__ */ f.jsx("label", { htmlFor: g, className: kr, children: "Format" }),
      /* @__PURE__ */ f.jsx("div", { className: Pl, children: /* @__PURE__ */ f.jsx(
        "select",
        {
          id: g,
          className: $R,
          value: n,
          onChange: (z) => a(z.currentTarget.value),
          children: PR.map((z) => /* @__PURE__ */ f.jsx("option", { value: z, children: z }, z))
        }
      ) })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: Ql, children: [
      /* @__PURE__ */ f.jsx("label", { htmlFor: m, className: kr, children: "Speed" }),
      /* @__PURE__ */ f.jsxs("div", { className: `${Pl} ${IR}`, children: [
        /* @__PURE__ */ f.jsx(
          "input",
          {
            id: m,
            type: "range",
            className: YR,
            min: Xo,
            max: hf,
            step: ZR,
            value: r,
            style: { "--range-pct": `${j}%` },
            onChange: (z) => s(Number(z.currentTarget.value)),
            "aria-valuemin": Xo,
            "aria-valuemax": hf,
            "aria-valuenow": r
          }
        ),
        /* @__PURE__ */ f.jsxs("span", { className: FR, children: [
          r.toFixed(2),
          "×"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: qR, role: "radiogroup", "aria-label": "Cache policy", children: [
      /* @__PURE__ */ f.jsx("span", { className: kr, children: "Cache" }),
      /* @__PURE__ */ f.jsx("div", { className: GR, children: ff.map((z) => /* @__PURE__ */ f.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": o === z.id,
          className: XR,
          onClick: () => c(z.id),
          title: z.help,
          children: z.label
        },
        z.id
      )) }),
      /* @__PURE__ */ f.jsx("p", { className: KR, "aria-live": "polite", children: T.help })
    ] }),
    /* @__PURE__ */ f.jsx("div", { className: QR, "aria-hidden": "true" }),
    /* @__PURE__ */ f.jsxs("div", { className: Ql, children: [
      /* @__PURE__ */ f.jsx("label", { htmlFor: b, className: kr, children: "Temperature" }),
      /* @__PURE__ */ f.jsx("div", { className: Pl, children: /* @__PURE__ */ f.jsx(
        "input",
        {
          id: b,
          type: "number",
          className: df,
          min: 0,
          max: 2,
          step: 0.05,
          value: _,
          onChange: (z) => w("temperature", Number(z.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: Ql, children: [
      /* @__PURE__ */ f.jsx("label", { htmlFor: v, className: kr, children: "Top-p" }),
      /* @__PURE__ */ f.jsx("div", { className: Pl, children: /* @__PURE__ */ f.jsx(
        "input",
        {
          id: v,
          type: "number",
          className: df,
          min: 0,
          max: 1,
          step: 0.05,
          value: C,
          onChange: (z) => w("top_p", Number(z.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: Ql, children: [
      /* @__PURE__ */ f.jsx("label", { htmlFor: S, className: kr, children: "Seed" }),
      /* @__PURE__ */ f.jsx("div", { className: Pl, children: /* @__PURE__ */ f.jsx(
        "input",
        {
          id: S,
          type: "number",
          className: df,
          step: 1,
          value: L,
          onChange: (z) => w("seed", Math.trunc(Number(z.currentTarget.value)))
        }
      ) })
    ] })
  ] });
}
var n2 = "iv43qk0", f0 = "iv43qk1", a2 = "iv43qk2", h0 = "iv43qk3", i2 = "iv43qk4", r2 = "iv43qk5", l2 = "iv43qk6", s2 = "iv43qk7", o2 = { vector: "iv43qk8", qwen: "iv43qk9", preset: "iv43qka", audio: "iv43qkb", raw: "iv43qkc" }, u2 = "iv43qkd", c2 = "iv43qke", pf = "iv43qkf", gf = "iv43qkg";
function d2({
  lines: n,
  characterColors: a,
  onLineClick: r
}) {
  if (n.length === 0)
    return /* @__PURE__ */ f.jsx("p", { className: u2, children: "Paste dialogue above to see character-tagged lines, override badges, and per-line previews here." });
  const s = n.length, o = n.filter((h) => h.character !== null).length, c = s - o;
  return /* @__PURE__ */ f.jsxs("div", { children: [
    /* @__PURE__ */ f.jsxs("div", { className: c2, children: [
      /* @__PURE__ */ f.jsxs("span", { className: pf, children: [
        /* @__PURE__ */ f.jsx("span", { className: gf, children: s }),
        "lines"
      ] }),
      /* @__PURE__ */ f.jsxs("span", { className: pf, children: [
        /* @__PURE__ */ f.jsx("span", { className: gf, children: o }),
        "spoken"
      ] }),
      /* @__PURE__ */ f.jsxs("span", { className: pf, children: [
        /* @__PURE__ */ f.jsx("span", { className: gf, children: c }),
        "narration"
      ] })
    ] }),
    /* @__PURE__ */ f.jsx("ol", { className: n2, children: n.map((h) => /* @__PURE__ */ f.jsx(
      f2,
      {
        line: h,
        ...h.character && a[h.character] ? { color: a[h.character] } : {},
        ...r ? { onClick: () => r(h.idx) } : {}
      },
      h.idx
    )) })
  ] });
}
function f2({ line: n, color: a, onClick: r }) {
  return n.character === null ? /* @__PURE__ */ f.jsxs("li", { className: `${f0} ${a2}`, children: [
    /* @__PURE__ */ f.jsx("span", { className: h0, children: String(n.idx + 1).padStart(2, "0") }),
    /* @__PURE__ */ f.jsx("span", { className: l2, children: n.text })
  ] }) : /* @__PURE__ */ f.jsxs(
    "li",
    {
      className: f0,
      onClick: r,
      style: r ? { cursor: "pointer" } : void 0,
      children: [
        /* @__PURE__ */ f.jsx("span", { className: h0, children: String(n.idx + 1).padStart(2, "0") }),
        /* @__PURE__ */ f.jsx("span", { className: i2, style: a ? { color: a } : void 0, children: n.character }),
        /* @__PURE__ */ f.jsxs("span", { className: r2, children: [
          n.text,
          n.override && /* @__PURE__ */ f.jsxs("span", { className: `${s2} ${o2[n.override.kind]}`, children: [
            n.override.kind,
            n.override.label ? ` · ${n.override.label}` : ""
          ] })
        ] })
      ]
    }
  );
}
var h2 = "_46z95i0", m2 = "_46z95i1", p2 = "_46z95i2", g2 = "_46z95i3", v2 = "_46z95i4", y2 = "_46z95i5", b2 = "_46z95i6";
const x2 = {
  intensity: 0.6,
  pace: 1,
  pitchSt: 0
};
function S2({ value: n, onChange: a }) {
  return /* @__PURE__ */ f.jsxs("div", { className: h2, children: [
    /* @__PURE__ */ f.jsx(
      vf,
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
      vf,
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
      vf,
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
function vf({ label: n, sub: a, min: r, max: s, step: o, format: c, value: h, onChange: p }) {
  const g = (h - r) / (s - r) * 100, m = `perf-${n.toLowerCase()}`;
  return /* @__PURE__ */ f.jsxs("div", { className: m2, children: [
    /* @__PURE__ */ f.jsxs("div", { className: p2, children: [
      /* @__PURE__ */ f.jsx("label", { htmlFor: m, className: g2, children: n }),
      /* @__PURE__ */ f.jsx("span", { className: v2, children: a })
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
        className: y2,
        style: { "--fill": `${g}%` },
        onChange: (b) => p(Number(b.target.value))
      }
    ),
    /* @__PURE__ */ f.jsx("span", { className: b2, children: c(h) })
  ] });
}
var w2 = "qe93dj0", E2 = "qe93dj1", T2 = "qe93dj2", j2 = "qe93dj3", C2 = "qe93dj4", N2 = "qe93dj5", M2 = "qe93dj6", A2 = { ok: "qe93dj7", warn: "qe93dj8", info: "qe93dj9" }, R2 = "qe93dja", _2 = "qe93djb";
function D2({ checks: n }) {
  const a = n.filter((r) => r.status === "ok").length;
  return /* @__PURE__ */ f.jsxs("div", { className: w2, children: [
    /* @__PURE__ */ f.jsxs("header", { className: E2, children: [
      /* @__PURE__ */ f.jsx("span", { className: T2, children: "Pre-flight" }),
      /* @__PURE__ */ f.jsxs("span", { className: j2, children: [
        a,
        "/",
        n.length,
        " OK"
      ] })
    ] }),
    /* @__PURE__ */ f.jsx("ul", { className: C2, children: n.map((r) => /* @__PURE__ */ f.jsxs("li", { className: N2, children: [
      /* @__PURE__ */ f.jsx(
        "span",
        {
          "aria-hidden": "true",
          className: `${M2} ${A2[r.status]}`
        }
      ),
      /* @__PURE__ */ f.jsx("span", { className: R2, children: r.label }),
      r.detail && /* @__PURE__ */ f.jsx("span", { className: _2, children: r.detail })
    ] }, r.id)) })
  ] });
}
var z2 = "xq3iim0", O2 = "xq3iim2 xq3iim1", L2 = "xq3iim3 xq3iim1", U2 = "xq3iim4", k2 = "xq3iim5", V2 = "xq3iim6", B2 = "xq3iim7";
function H2({
  deploymentId: n,
  initialVoiceAssetId: a,
  onChange: r
}) {
  const [s, o] = x.useState([]), [c, h] = x.useState(a), [p, g] = x.useState(!0), [m, b] = x.useState(!1), [v, S] = x.useState(null);
  x.useEffect(() => {
    let T = !1;
    return g(!0), cs(n).then(({ voiceAssets: j }) => {
      T || o(j);
    }).catch((j) => {
      T || S(j instanceof Error ? j.message : "Failed to load voices");
    }).finally(() => {
      T || g(!1);
    }), () => {
      T = !0;
    };
  }, [n]);
  async function w(T) {
    b(!0), S(null);
    const j = c;
    h(T);
    try {
      await Hj(n, T), r?.(T);
    } catch (_) {
      h(j), S(_ instanceof Error ? _.message : "Failed to update default voice");
    } finally {
      b(!1);
    }
  }
  return p ? /* @__PURE__ */ f.jsx("p", { className: V2, children: "Loading voices…" }) : v ? /* @__PURE__ */ f.jsx("p", { className: B2, children: v }) : s.length === 0 ? /* @__PURE__ */ f.jsx("div", { role: "radiogroup", "aria-label": "Default voice for quick mode", children: /* @__PURE__ */ f.jsx(
    Es,
    {
      title: "No voices yet.",
      hint: "Upload a voice in Mappings to enable quick mode."
    }
  ) }) : /* @__PURE__ */ f.jsx(
    "div",
    {
      role: "radiogroup",
      "aria-label": "Default voice for quick mode",
      className: z2,
      children: s.map((T) => {
        const j = T.voiceAssetId === c;
        return /* @__PURE__ */ f.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": j,
            disabled: m,
            onClick: () => void w(j ? null : T.voiceAssetId),
            className: j ? L2 : O2,
            children: [
              /* @__PURE__ */ f.jsx("span", { className: U2, children: T.displayName }),
              T.durationMs !== null && T.durationMs !== void 0 && /* @__PURE__ */ f.jsx("span", { className: k2, children: q2(T.durationMs) })
            ]
          },
          T.voiceAssetId
        );
      })
    }
  );
}
function q2(n) {
  const a = n / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const r = Math.floor(a / 60), s = Math.round(a - r * 60);
  return `${r}:${s.toString().padStart(2, "0")}`;
}
var m0 = "_17fbpt30", p0 = "_17fbpt31", g0 = "_17fbpt32", $2 = "_17fbpt33", I2 = "_17fbpt34", Y2 = "_17fbpt35", v0 = "_17fbpt36", F2 = "_17fbpt37", G2 = "_17fbpt38";
const X2 = {
  completed: "success",
  running: "accent",
  queued: "neutral",
  failed: "danger",
  cancelled: "faint",
  partial: "warning"
};
function K2({
  runs: n,
  deploymentId: a,
  onOpenQueue: r,
  onOpenRun: s,
  emptyHint: o
}) {
  return n.length === 0 ? /* @__PURE__ */ f.jsxs("div", { className: m0, children: [
    /* @__PURE__ */ f.jsx("header", { className: p0, children: /* @__PURE__ */ f.jsx(
      "a",
      {
        className: g0,
        href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
        onClick: r ? (c) => {
          c.preventDefault(), r();
        } : void 0,
        children: "Open queue →"
      }
    ) }),
    /* @__PURE__ */ f.jsx("p", { className: F2, children: "No runs yet." }),
    /* @__PURE__ */ f.jsx("p", { className: G2, children: o ?? "Hit Generate to enqueue a batch." })
  ] }) : /* @__PURE__ */ f.jsxs("div", { className: m0, children: [
    /* @__PURE__ */ f.jsxs("header", { className: p0, children: [
      /* @__PURE__ */ f.jsx("span", {}),
      /* @__PURE__ */ f.jsx(
        "a",
        {
          className: g0,
          href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
          onClick: r ? (c) => {
            c.preventDefault(), r();
          } : void 0,
          children: "Open queue →"
        }
      )
    ] }),
    /* @__PURE__ */ f.jsx("ul", { className: $2, children: n.slice(0, 5).map((c) => /* @__PURE__ */ f.jsx("li", { children: /* @__PURE__ */ f.jsxs(
      "button",
      {
        type: "button",
        className: I2,
        onClick: s ? () => s(c.runId) : void 0,
        children: [
          /* @__PURE__ */ f.jsx("span", { className: Y2, children: c.runId }),
          /* @__PURE__ */ f.jsx("span", { className: `${mx.sm} ${px[X2[c.status] ?? "neutral"]}`, children: c.status }),
          /* @__PURE__ */ f.jsx("span", { className: v0, children: Q2(c.startedAt ?? c.queuedAt) }),
          /* @__PURE__ */ f.jsx("span", { className: v0, children: c.kind })
        ]
      }
    ) }, c.runId)) })
  ] });
}
function Q2(n) {
  if (!n) return "—";
  const a = n > 1e12 ? Math.floor(n / 1e3) : n, r = new Date(a * 1e3);
  if (Number.isNaN(r.getTime())) return "—";
  const o = Date.now() - r.getTime();
  return o < 6e4 ? "just now" : o < 36e5 ? `${Math.floor(o / 6e4)}m ago` : o < 864e5 ? `${Math.floor(o / 36e5)}h ago` : r.toISOString().slice(0, 16).replace("T", " ");
}
function P2(n) {
  const a = xs(), [r, s] = x.useState("idle"), [o, c] = x.useState(null), [h, p] = x.useState(/* @__PURE__ */ new Map()), [g, m] = x.useState(null), [b, v] = x.useState(null), S = x.useRef(null);
  x.useEffect(() => () => {
    S.current?.();
  }, []);
  const w = x.useCallback(async () => {
    s("starting"), m(null), p(/* @__PURE__ */ new Map()), v(null);
    try {
      const O = await Yj(n.deploymentId, n.createPayload);
      c(O.runId), s("running"), S.current?.(), S.current = by(
        n.deploymentId,
        O.runId,
        ($) => y0($, p, s, v, n.deploymentId, O.runId),
        () => s("error")
      );
    } catch (O) {
      s("error"), m(yf(O));
    }
  }, [n.deploymentId, n.createPayload]), T = x.useCallback(async () => {
    if (o)
      try {
        await Fj(n.deploymentId, o);
      } catch (O) {
        m(yf(O));
      }
  }, [n.deploymentId, o]), j = Array.from(h.values()).sort((O, $) => O.globalIndex - $.globalIndex), _ = r === "starting" || r === "running", C = b?.status === "partial", L = j.filter((O) => O.status === "failed"), z = (() => {
    if (r !== "terminal" || L.length === 0) return null;
    const O = /* @__PURE__ */ new Map();
    for (const me of L) {
      const ge = me.failureCategory ?? "unknown";
      O.set(ge, (O.get(ge) ?? 0) + 1);
    }
    let $ = "unknown", re = 0;
    for (const [me, ge] of O)
      ge > re && ($ = me, re = ge);
    const ae = j.length;
    return { category: $, count: re, total: ae };
  })(), R = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, J = "Check the run detail page for the per-segment error log.", G = g?.toLowerCase().includes("unmapped") ?? !1, W = n.diagnostics ?? [], A = W.find((O) => O.status === "fail");
  return /* @__PURE__ */ f.jsxs("div", { children: [
    W.length > 0 && /* @__PURE__ */ f.jsx("ul", { className: uM, "aria-label": "Pre-flight checks", children: W.map((O) => /* @__PURE__ */ f.jsxs("li", { className: cM, children: [
      /* @__PURE__ */ f.jsx(vi, { tone: J2(O.status), children: W2(O.status) }),
      /* @__PURE__ */ f.jsx("span", { className: dM, children: O.label }),
      O.detail && /* @__PURE__ */ f.jsx("span", { className: fM, children: O.detail })
    ] }, O.label)) }),
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
          G && /* @__PURE__ */ f.jsx(
            ft,
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
    /* @__PURE__ */ f.jsxs("div", { className: hx, children: [
      /* @__PURE__ */ f.jsx(
        ft,
        {
          disabled: !n.canGenerate || _ || !!A,
          onClick: w,
          children: r === "running" ? "Running…" : "Generate + Export ZIP"
        }
      ),
      /* @__PURE__ */ f.jsx(ft, { variant: "danger", disabled: !_, onClick: T, children: "Cancel" })
    ] }),
    z && /* @__PURE__ */ f.jsxs(_n, { severity: "error", style: { flexDirection: "column", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ f.jsxs("strong", { children: [
        "Run failed — ",
        z.count,
        " of ",
        z.total,
        " segments failed with ",
        /* @__PURE__ */ f.jsx("code", { children: z.category })
      ] }),
      /* @__PURE__ */ f.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: R[z.category] ?? J })
    ] }),
    b?.exportArtifactRef && /* @__PURE__ */ f.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${b.exportArtifactRef}/download`,
        download: !0,
        className: `${ox.secondary} ${ux.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    C && b && /* @__PURE__ */ f.jsxs(_n, { severity: "warning", children: [
      /* @__PURE__ */ f.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ f.jsx(
        ft,
        {
          variant: "secondary",
          disabled: !!A,
          onClick: async () => {
            try {
              const O = await ax(n.deploymentId, b.runId);
              c(O.runId), p(/* @__PURE__ */ new Map()), v(null), s("running"), S.current?.(), S.current = by(
                n.deploymentId,
                O.runId,
                ($) => y0($, p, s, v, n.deploymentId, O.runId),
                () => s("error")
              );
            } catch (O) {
              m(yf(O)), s("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    j.length > 0 && /* @__PURE__ */ f.jsxs("table", { className: sM, children: [
      /* @__PURE__ */ f.jsx("thead", { children: /* @__PURE__ */ f.jsxs("tr", { children: [
        /* @__PURE__ */ f.jsx("th", { className: ci, children: "#" }),
        /* @__PURE__ */ f.jsx("th", { className: ci, children: "Status" }),
        /* @__PURE__ */ f.jsx("th", { className: ci, children: "Duration" }),
        /* @__PURE__ */ f.jsx("th", { className: ci, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ f.jsx("tbody", { children: j.map((O) => /* @__PURE__ */ f.jsxs("tr", { className: oM, children: [
        /* @__PURE__ */ f.jsx("td", { className: ci, children: O.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ f.jsx("td", { className: ci, children: /* @__PURE__ */ f.jsx(vi, { tone: Z2(O.status), children: O.status }) }),
        /* @__PURE__ */ f.jsx("td", { className: ci, children: O.durationMs ? `${O.durationMs} ms` : "—" }),
        /* @__PURE__ */ f.jsx("td", { className: ci, children: O.failureCategory ?? "" })
      ] }, O.globalIndex)) })
    ] })
  ] });
}
async function y0(n, a, r, s, o, c) {
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
        const h = await jh(o, c);
        s(h);
      } catch {
      }
      return;
  }
}
function Z2(n) {
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
function J2(n) {
  switch (n) {
    case "ok":
      return "success";
    case "warn":
      return "warning";
    case "fail":
      return "danger";
  }
}
function W2(n) {
  switch (n) {
    case "ok":
      return "ok";
    case "warn":
      return "warn";
    case "fail":
      return "stop";
  }
}
function yf(n) {
  return n instanceof Pr || n instanceof Error ? n.message : "unknown error";
}
const b0 = [
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
function e_(n) {
  const a = xs(), r = x.useRef(null), { tokens: s, attributions: o, unresolved: c, predictedFilenames: h, characterColor: p } = x.useMemo(
    () => n_(n.value, n.outputFormat, n.mappings),
    [n.value, n.outputFormat, n.mappings]
  ), g = (m) => {
    const b = r.current;
    b && (b.scrollTop = m.currentTarget.scrollTop, b.scrollLeft = m.currentTarget.scrollLeft);
  };
  return /* @__PURE__ */ f.jsxs("div", { children: [
    /* @__PURE__ */ f.jsxs("div", { className: nM, children: [
      /* @__PURE__ */ f.jsx("div", { ref: r, className: aM, "aria-hidden": "true", children: s.map((m, b) => t_(m, b, p)) }),
      /* @__PURE__ */ f.jsx(
        "textarea",
        {
          className: iM,
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
        ft,
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
      /* @__PURE__ */ f.jsx("span", { className: $r, children: "Parsed lines" }),
      /* @__PURE__ */ f.jsx("ul", { className: Qy, children: o.map((m) => /* @__PURE__ */ f.jsxs("li", { children: [
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
      /* @__PURE__ */ f.jsx("span", { className: $r, children: "Predicted filenames" }),
      /* @__PURE__ */ f.jsx("ul", { className: Qy, children: h.map((m) => /* @__PURE__ */ f.jsx("li", { children: m }, m)) })
    ] })
  ] });
}
function t_(n, a, r) {
  if (n.kind === "blank")
    return /* @__PURE__ */ f.jsxs("span", { children: [
      n.raw,
      `
`
    ] }, a);
  if (n.kind === "narrator")
    return /* @__PURE__ */ f.jsxs("span", { children: [
      /* @__PURE__ */ f.jsx("span", { className: Ky, children: n.raw }),
      `
`
    ] }, a);
  const s = r.get(n.character?.toLowerCase() ?? "") ?? "currentColor", o = n.hasMapping ? Xy : `${Xy} ${rM}`;
  return /* @__PURE__ */ f.jsxs("span", { children: [
    /* @__PURE__ */ f.jsxs("span", { className: o, style: { color: s }, children: [
      "[",
      n.character,
      n.override && /* @__PURE__ */ f.jsxs("span", { className: lM, children: [
        "|",
        n.override
      ] }),
      "]"
    ] }),
    /* @__PURE__ */ f.jsxs("span", { className: Ky, children: [
      " ",
      n.text ?? ""
    ] }),
    `
`
  ] }, a);
}
function n_(n, a, r) {
  const s = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], c = [], h = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Map(), g = [], m = /* @__PURE__ */ new Map();
  let b = 0;
  const v = n.split(/\r?\n/);
  let S = 0;
  return v.forEach((w, T) => {
    const j = w.trim();
    if (!j) {
      o.push({ kind: "blank", raw: w });
      return;
    }
    const _ = T + 1, C = j.match(s);
    let L = "Narrator", z = j, R, J = !1;
    if (C?.groups) {
      J = !0;
      const O = (C.groups.body ?? "").trim(), $ = (C.groups.rest ?? "").trim();
      L = ((O.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", R = (O.includes("|") ? O.slice(O.indexOf("|") + 1) : "").trim() || void 0, z = $;
    }
    S += 1;
    const G = L.toLowerCase(), W = (p.get(G) ?? 0) + 1;
    p.set(G, W);
    const A = L === "Narrator" || r.has(G);
    if (A || h.add(L), L !== "Narrator" && !m.has(G) && (m.set(G, b0[b % b0.length] ?? "currentColor"), b += 1), J) {
      const O = { kind: "character", raw: w, character: L, text: z, hasMapping: A };
      R !== void 0 && (O.override = R), o.push(O);
    } else
      o.push({ kind: "narrator", raw: w });
    c.push({ lineNumber: _, character: L, text: z, hasMapping: A }), g.push(
      `${S.toString().padStart(3, "0")}_${a_(L)}_${W.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: c,
    unresolved: Array.from(h),
    predictedFilenames: g,
    characterColor: m
  };
}
function a_(n) {
  const a = n.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
const bf = [
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
], i_ = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;
function r_(n) {
  const a = [];
  if (!n) return a;
  const r = n.split(/\r?\n/);
  for (let s = 0; s < r.length; s += 1) {
    const c = (r[s] ?? "").trim();
    if (c.length === 0) continue;
    const h = c.match(i_);
    if (!h || !h.groups) {
      a.push({ idx: s, character: null, text: c, override: null });
      continue;
    }
    const p = h.groups.body ?? "", g = (h.groups.rest ?? "").trim(), [m = "", ...b] = p.split("|"), v = m.trim();
    if (!v) {
      a.push({ idx: s, character: null, text: g || c, override: null });
      continue;
    }
    const S = v.split(":")[0]?.trim() || null, w = b.join("|").trim(), T = w ? l_(w) : null;
    a.push({
      idx: s,
      character: S,
      text: g,
      override: T
    });
  }
  return a;
}
function l_(n) {
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
function s_(n) {
  const a = /* @__PURE__ */ new Set(), r = [];
  for (const s of n) {
    if (!s.character) continue;
    const o = s.character.toLowerCase();
    a.has(o) || (a.add(o), r.push(s.character));
  }
  return r;
}
function o_(n) {
  const a = {};
  for (let r = 0; r < n.length; r += 1) {
    const s = n[r];
    s && (a[s] = bf[r % bf.length] ?? bf[0]);
  }
  return a;
}
function u_(n) {
  const a = {};
  for (const r of n)
    r.character && (a[r.character] = (a[r.character] ?? 0) + 1);
  return a;
}
function c_(n) {
  const a = n.workflowCustomised ?? !1, r = n.unmappableFields ?? [], s = h_(n.deployment.displayName, n.deployment.deploymentId), o = d_(360);
  return /* @__PURE__ */ f.jsxs("div", { className: BN, children: [
    /* @__PURE__ */ f.jsxs("header", { className: HN, children: [
      /* @__PURE__ */ f.jsx("div", { className: $N, children: "EmotionTTS · Recipe Studio" }),
      /* @__PURE__ */ f.jsx("div", { className: qN, children: /* @__PURE__ */ f.jsx("h1", { className: IN, children: s }) }),
      /* @__PURE__ */ f.jsx("p", { className: YN, children: "Author the script, cast the voices, sculpt the emotion, and modulate every utterance — all from a single screen, with cache-bound previews and a non-destructive edit chain." }),
      n.hero
    ] }),
    a && /* @__PURE__ */ f.jsxs(_n, { severity: "warning", children: [
      /* @__PURE__ */ f.jsx("strong", { children: "Workflow customised." }),
      " ",
      r.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${r.join(", ")}.`,
      " ",
      /* @__PURE__ */ f.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    n.quickActions && /* @__PURE__ */ f.jsx("div", { className: JN, "aria-label": "Quick actions", children: n.quickActions }),
    /* @__PURE__ */ f.jsxs("div", { className: FN, children: [
      /* @__PURE__ */ f.jsx(
        $i,
        {
          number: "01",
          title: "Script",
          id: "recipe-section-script",
          variant: "default",
          children: n.scriptSection
        }
      ),
      /* @__PURE__ */ f.jsx(
        $i,
        {
          number: "02",
          title: "Parsed dialogue",
          id: "recipe-section-parsed",
          variant: "default",
          children: n.parsedDialogueSection
        }
      ),
      /* @__PURE__ */ f.jsx(
        $i,
        {
          number: "03",
          title: "Cast",
          id: "recipe-section-cast",
          variant: "default",
          children: n.castSection
        }
      ),
      /* @__PURE__ */ f.jsx(
        $i,
        {
          number: "04",
          title: "Emotion",
          id: "recipe-section-emotion",
          variant: "split",
          children: n.emotionSection
        }
      ),
      /* @__PURE__ */ f.jsx(
        $i,
        {
          number: "05",
          title: "Performance",
          id: "recipe-section-performance",
          variant: "default",
          children: n.performanceSection
        }
      ),
      /* @__PURE__ */ f.jsx(
        $i,
        {
          number: "06",
          title: "Recent runs",
          id: "recipe-section-runs",
          variant: "default",
          children: n.recentRunsSection
        }
      ),
      n.auditSection && /* @__PURE__ */ f.jsx(
        $i,
        {
          number: "07",
          title: "Edit history",
          id: "recipe-section-audit",
          variant: "default",
          defaultCollapsed: !0,
          children: n.auditSection
        }
      )
    ] }),
    /* @__PURE__ */ f.jsx(
      "button",
      {
        type: "button",
        className: WN,
        "data-visible": o ? "true" : "false",
        "aria-label": "Scroll to top",
        title: "Scroll to top",
        onClick: f_,
        children: "↑"
      }
    )
  ] });
}
function d_(n) {
  const [a, r] = x.useState(!1);
  return x.useEffect(() => {
    const s = Cx(), o = () => s instanceof Window ? window.scrollY : s.scrollTop, c = () => r(o() > n);
    c();
    const h = { passive: !0 };
    return s.addEventListener("scroll", c, h), () => s.removeEventListener("scroll", c, h);
  }, [n]), a;
}
function Cx() {
  if (typeof document > "u") return window;
  let n = document.querySelector("emotion-tts-app");
  for (; n; ) {
    const a = window.getComputedStyle(n);
    if (/(auto|scroll|overlay)/.test(a.overflowY)) return n;
    n = n.parentElement;
  }
  return window;
}
function f_() {
  const n = Cx();
  n instanceof Window ? window.scrollTo({ top: 0, behavior: "smooth" }) : n.scrollTo({ top: 0, behavior: "smooth" });
}
function h_(n, a) {
  const r = (n ?? "").trim();
  return !r || r === a ? "Recipe Studio" : r;
}
function $i({
  number: n,
  title: a,
  id: r,
  variant: s,
  defaultCollapsed: o = !1,
  children: c
}) {
  const [h, p] = x.useState(o), g = `${r}-body`;
  return /* @__PURE__ */ f.jsxs("section", { className: GN, "aria-labelledby": r, children: [
    /* @__PURE__ */ f.jsx("header", { className: XN, children: /* @__PURE__ */ f.jsxs(
      "button",
      {
        type: "button",
        className: PN,
        "aria-expanded": !h,
        "aria-controls": g,
        onClick: () => p((m) => !m),
        children: [
          /* @__PURE__ */ f.jsxs("span", { className: KN, children: [
            n,
            " / ",
            a
          ] }),
          /* @__PURE__ */ f.jsx("h2", { id: r, className: QN, children: a }),
          /* @__PURE__ */ f.jsx(
            "span",
            {
              className: ZN,
              "data-collapsed": h ? "true" : "false",
              "aria-hidden": "true",
              children: "▾"
            }
          )
        ]
      }
    ) }),
    !h && /* @__PURE__ */ f.jsx(
      "div",
      {
        id: g,
        className: s === "split" ? tM : eM,
        children: c
      }
    )
  ] });
}
const Mn = {
  success(n) {
    xy.success(n);
  },
  error(n) {
    xy.error(n);
  }
};
function m_(n) {
  try {
    const a = JSON.parse(n);
    return typeof a == "object" && a !== null ? a : {};
  } catch {
    return {};
  }
}
function p_() {
  const { deployment: n, mappings: a, runs: r, workflow: s } = ws(), [o, c] = x.useState(a), [h, p] = x.useState([]), [g, m] = x.useState([]), [b, v] = x.useState(null), [S, w] = x.useState(Mu), [T, j] = x.useState(""), [_, C] = x.useState(
    n.defaultOutputFormat ?? "mp3"
  ), [L, z] = x.useState(n.defaultSpeedFactor ?? 1), [R, J] = x.useState({
    mode: "none",
    emotionAlpha: 1
  }), [G, W] = x.useState(() => ({
    temperature: 0.8,
    top_p: 0.8,
    seed: 42,
    ...n.defaultGenerationOverridesJson ? m_(n.defaultGenerationOverridesJson) : {}
  })), [A, O] = x.useState("use_cache"), [$, re] = x.useState(
    n.defaultVoiceAssetId ?? null
  ), [ae, me] = x.useState(n.defaultVoiceAssetId != null), [ge, oe] = x.useState(x2);
  x.useEffect(() => {
    let fe = !1;
    return cs(n.deploymentId).then((je) => {
      fe || p(je.voiceAssets);
    }).catch(() => {
    }), sx(n.deploymentId).then((je) => {
      fe || m(je.presets);
    }).catch(() => {
    }), () => {
      fe = !0;
    };
  }, [n.deploymentId]);
  const U = x.useMemo(() => r_(T), [T]), V = x.useMemo(() => s_(U), [U]), q = x.useMemo(() => o_(V), [V]), Q = x.useMemo(() => u_(U), [U]), te = x.useMemo(() => {
    const fe = /* @__PURE__ */ new Map();
    for (const je of o)
      fe.set(je.characterName.toLowerCase(), je);
    return fe;
  }, [o]), N = x.useMemo(() => ae && $ ? 0 : V.filter((fe) => !te.has(fe.toLowerCase())).length, [V, te, ae, $]), K = x.useCallback(
    async (fe, je) => {
      const Ne = te.get(fe.toLowerCase());
      try {
        if (Ne) {
          const Me = await rs(n.deploymentId, Ne.mappingId, je);
          c(
            (Kt) => Kt.map((at) => at.mappingId === Me.mappingId ? Me : at)
          ), Mn.success(`Updated mapping for ${fe}`);
        } else if (je.speakerVoiceAssetId) {
          const Me = await Th(n.deploymentId, {
            ...je,
            characterName: fe,
            speakerVoiceAssetId: je.speakerVoiceAssetId
          });
          c((Kt) => [...Kt, Me]), Mn.success(`Mapped ${fe} to voice`);
        }
      } catch (Me) {
        Mn.error(Me instanceof Error ? Me.message : "mapping failed");
      }
    },
    [te, n.deploymentId]
  ), Z = x.useCallback(
    async (fe) => {
      const je = te.get(fe.toLowerCase());
      if (je)
        try {
          await nx(n.deploymentId, je.mappingId), c((Ne) => Ne.filter((Me) => Me.mappingId !== je.mappingId)), Mn.success(`Cleared mapping for ${fe}`);
        } catch (Ne) {
          Mn.error(Ne instanceof Error ? Ne.message : "clear failed");
        }
    },
    [te, n.deploymentId]
  ), le = x.useCallback(
    async (fe, je) => {
      try {
        const Ne = await ix(
          n.deploymentId,
          je,
          je.name.replace(/\.[^.]+$/, ""),
          "speaker"
        );
        p((Me) => [Ne, ...Me]), await K(fe, { speakerVoiceAssetId: Ne.voiceAssetId });
      } catch (Ne) {
        Mn.error(Ne instanceof Error ? Ne.message : "upload failed");
      }
    },
    [n.deploymentId, K]
  ), ce = x.useCallback((fe) => {
    w(fe);
  }, []), ve = x.useMemo(() => {
    const fe = [], je = /* @__PURE__ */ new Set();
    for (const Ne of o) {
      const Me = Ne.speakerVoiceAssetId;
      if (!Me || je.has(Me)) continue;
      je.add(Me);
      const at = h.find((on) => on.voiceAssetId === Me)?.displayName ?? `${Ne.characterName} · ${Me.slice(0, 8)}`;
      fe.push({ kind: "voice_asset", id: Me, label: at });
    }
    for (const Ne of h)
      je.has(Ne.voiceAssetId) || (je.add(Ne.voiceAssetId), fe.push({ kind: "voice_asset", id: Ne.voiceAssetId, label: Ne.displayName }));
    return fe;
  }, [o, h]), ze = x.useCallback(
    async (fe, je) => {
      if (fe.kind !== "voice_asset") {
        Mn.error("Targeted revert is only supported for voice assets in v1.");
        return;
      }
      let Ne;
      try {
        const Me = JSON.parse(je);
        if (typeof Me != "object" || Me === null || Me.version !== 1 || !Array.isArray(Me.ops))
          throw new Error("snapshot is not a valid EditChain");
        Ne = Me;
      } catch (Me) {
        Mn.error(
          Me instanceof Error ? `Audit snapshot is malformed: ${Me.message}` : "Audit snapshot is malformed; cannot revert."
        );
        return;
      }
      try {
        const Me = await rx(fe.id, n.deploymentId, {
          chain: Ne
        }), Kt = o.filter((at) => at.speakerVoiceAssetId === fe.id);
        await Promise.all(
          Kt.map(
            (at) => rs(n.deploymentId, at.mappingId, {
              voiceAssetChainDigest: Me.chain_digest
            }).catch(() => null)
          )
        ), c(
          (at) => at.map(
            (on) => on.speakerVoiceAssetId === fe.id ? { ...on, voiceAssetChainDigest: Me.chain_digest } : on
          )
        ), Mn.success(`Reverted ${fe.label} to a prior chain`);
      } catch (Me) {
        Mn.error(Me instanceof Error ? Me.message : "revert failed");
      }
    },
    [n.deploymentId, o]
  ), _e = x.useCallback(
    async (fe) => {
      if (fe.kind !== "voice_asset") {
        Mn.error("Revert is only supported for voice assets in v1.");
        return;
      }
      try {
        await QC(fe.id, n.deploymentId);
        const je = o.filter((Ne) => Ne.speakerVoiceAssetId === fe.id);
        await Promise.all(
          je.map(
            (Ne) => rs(n.deploymentId, Ne.mappingId, {
              voiceAssetChainDigest: null
            }).catch(() => null)
          )
        ), c(
          (Ne) => Ne.map(
            (Me) => Me.speakerVoiceAssetId === fe.id ? { ...Me, voiceAssetChainDigest: null } : Me
          )
        ), Mn.success(`Cleared edit chain on ${fe.label}`);
      } catch (je) {
        Mn.error(je instanceof Error ? je.message : "revert failed");
      }
    },
    [n.deploymentId, o]
  ), Be = x.useMemo(
    () => ({
      script: T,
      parserMode: ae ? "raw_text" : "dialogue",
      outputFormat: _,
      speedFactor: L,
      globalEmotion: { ...R, emotionAlpha: ge.intensity },
      generation: G,
      cachePolicy: A
    }),
    [T, ae, _, L, ge.intensity, R, G, A]
  ), kt = x.useMemo(
    () => y_({
      script: T,
      quickMode: ae,
      defaultVoiceAssetId: $,
      characters: V,
      unmappedCount: N,
      globalEmotion: R,
      performance: ge
    }),
    [T, ae, $, V, N, R, ge]
  ), Ft = x.useMemo(
    () => kt.filter((fe) => fe.id !== "performance").map((fe) => ({
      label: fe.label,
      status: fe.status === "ok" ? "ok" : fe.status === "warn" ? "warn" : "fail",
      detail: fe.detail
    })),
    [kt]
  );
  return /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
    /* @__PURE__ */ f.jsx(XC, { position: "bottom-right", richColors: !0, theme: "dark" }),
    /* @__PURE__ */ f.jsx(
      c_,
      {
        deployment: n,
        workflowCustomised: s.workflow.customised,
        unmappableFields: s.unmappableFields,
        hero: /* @__PURE__ */ f.jsx(gM, { deployment: n }),
        quickActions: /* @__PURE__ */ f.jsx(
          P2,
          {
            deploymentId: n.deploymentId,
            createPayload: Be,
            canGenerate: T.trim().length > 0,
            diagnostics: Ft
          }
        ),
        scriptSection: /* @__PURE__ */ f.jsx(
          g_,
          {
            quickMode: ae,
            onToggleQuickMode: me,
            deployment: n,
            script: T,
            onScriptChange: j,
            outputFormat: _,
            mappingsByLower: te,
            defaultVoiceAssetId: $,
            onDefaultVoiceAssetIdChange: re
          }
        ),
        parsedDialogueSection: /* @__PURE__ */ f.jsx(d2, { lines: U, characterColors: q }),
        castSection: /* @__PURE__ */ f.jsx(UN, { unmappedCount: N, totalCount: V.length, children: V.map((fe) => {
          const je = te.get(fe.toLowerCase()) ?? null, Ne = q[fe] ?? "#ba9eff";
          return /* @__PURE__ */ f.jsx("li", { style: { listStyle: "none" }, children: /* @__PURE__ */ f.jsx(
            LN,
            {
              characterName: fe,
              color: Ne,
              lineCount: Q[fe] ?? 0,
              mapping: je,
              voiceAssets: h,
              presets: g,
              active: b === fe,
              onToggle: () => v((Me) => Me === fe ? null : fe),
              onAssignVoiceAsset: (Me) => K(fe, { speakerVoiceAssetId: Me }),
              onAssignPreset: (Me) => K(fe, { defaultVectorPresetId: Me }),
              onUploadFile: (Me) => le(fe, Me),
              onClearMapping: () => Z(fe)
            }
          ) }, fe);
        }) }),
        emotionSection: /* @__PURE__ */ f.jsx(
          VR,
          {
            value: R,
            onChange: J,
            deploymentId: n.deploymentId
          }
        ),
        performanceSection: /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
          /* @__PURE__ */ f.jsx(
            S2,
            {
              value: { ...ge, pace: L },
              onChange: (fe) => {
                oe(fe), fe.pace !== L && z(fe.pace);
              }
            }
          ),
          /* @__PURE__ */ f.jsx(
            Mh,
            {
              state: S,
              onChange: ce,
              supportsSynthSpeed: !1
            }
          ),
          /* @__PURE__ */ f.jsx(D2, { checks: kt }),
          /* @__PURE__ */ f.jsx(
            t2,
            {
              outputFormat: _,
              onOutputFormatChange: C,
              speedFactor: L,
              onSpeedFactorChange: z,
              cachePolicy: A,
              onCachePolicyChange: O,
              generation: G,
              onGenerationChange: W
            }
          )
        ] }),
        recentRunsSection: /* @__PURE__ */ f.jsx(K2, { runs: r, deploymentId: n.deploymentId }),
        auditSection: /* @__PURE__ */ f.jsx(
          pN,
          {
            deploymentId: n.deploymentId,
            targets: ve,
            onRevertToIdentity: _e,
            onRevertToChain: ze
          }
        )
      }
    )
  ] });
}
function g_({
  quickMode: n,
  onToggleQuickMode: a,
  deployment: r,
  script: s,
  onScriptChange: o,
  outputFormat: c,
  mappingsByLower: h,
  defaultVoiceAssetId: p,
  onDefaultVoiceAssetIdChange: g
}) {
  const m = s.length, b = s.trim() ? s.trim().split(/\s+/).length : 0, v = s.trim() ? s.trim().split(/\r?\n/).filter((S) => S.trim()).length : 0;
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
                onChange: (S) => a(S.target.checked)
              }
            ),
            "Quick mode (no character mapping required)"
          ] }),
          n && /* @__PURE__ */ f.jsx(
            H2,
            {
              deploymentId: r.deploymentId,
              initialVoiceAssetId: p,
              onChange: g
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
                  /* @__PURE__ */ f.jsx("strong", { style: { color: "var(--accent)", fontFamily: "var(--font-mono)" }, children: v.toString().padStart(2, "0") }),
                  " ",
                  "lines"
                ] }),
                /* @__PURE__ */ f.jsxs("span", { children: [
                  /* @__PURE__ */ f.jsx("strong", { style: { color: "var(--accent)", fontFamily: "var(--font-mono)" }, children: b.toString().padStart(3, "0") }),
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
      e_,
      {
        value: s,
        onChange: o,
        outputFormat: c,
        mappings: h,
        deploymentId: r.deploymentId
      }
    ),
    /* @__PURE__ */ f.jsx(v_, {})
  ] });
}
function v_() {
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
function y_({
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
const x0 = /* @__PURE__ */ new Map();
function b_(n, a) {
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
    const o = `${n}::${a}`, c = x0.get(o);
    if (c) {
      s({ peaks: c, isLoading: !1, error: null });
      return;
    }
    const h = new AbortController();
    return s({ peaks: null, isLoading: !0, error: null }), x_(n, a, h.signal).then((p) => {
      h.signal.aborted || (x0.set(o, p), s({ peaks: p, isLoading: !1, error: null }));
    }).catch((p) => {
      if (h.signal.aborted) return;
      const g = p instanceof Error ? p.message : "decode failed";
      s({ peaks: null, isLoading: !1, error: g });
    }), () => h.abort();
  }, [n, a]), r;
}
async function x_(n, a, r) {
  const s = await fetch(n, { signal: r });
  if (!s.ok) throw new Error(`failed to load audio (${s.status})`);
  const o = await s.arrayBuffer();
  if (r.aborted) throw new DOMException("aborted", "AbortError");
  const h = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return S_(h, a);
}
function S_(n, a) {
  const r = n.numberOfChannels, s = n.length, o = Math.max(1, Math.floor(s / a)), c = new Float32Array(a), h = [];
  for (let p = 0; p < r; p += 1) h.push(n.getChannelData(p));
  for (let p = 0; p < a; p += 1) {
    const g = p * o, m = Math.min(s, g + o);
    let b = 0;
    for (let v = g; v < m; v += 1) {
      let S = 0;
      for (let T = 0; T < r; T += 1) {
        const j = h[T];
        j && (S += Math.abs(j[v] ?? 0));
      }
      const w = S / r;
      w > b && (b = w);
    }
    c[p] = b;
  }
  return c;
}
const S0 = "(prefers-reduced-motion: reduce)";
function w_() {
  const [n, a] = x.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(S0).matches);
  return x.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const r = window.matchMedia(S0), s = (o) => a(o.matches);
    return r.addEventListener("change", s), () => r.removeEventListener("change", s);
  }, []), n;
}
var E_ = "mquzal0", T_ = "mquzal1", w0 = "mquzal2", E0 = "mquzal3", T0 = "mquzal4", j_ = "mquzal5", j0 = "mquzal6", C0 = "mquzal7";
const C_ = 120, N_ = 720;
function Nx(n) {
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
    width: b = N_,
    height: v = C_
  } = n, S = x.useRef(null), w = x.useRef(null), T = x.useRef(null), j = b_(a, b), _ = w_();
  x.useEffect(() => {
    M_(S.current, j.peaks, b, v);
  }, [j.peaks, b, v]);
  const C = x.useCallback(
    (A) => {
      const O = w.current?.getBoundingClientRect();
      if (!O || O.width <= 0) return 0;
      const $ = Math.max(0, Math.min(1, (A - O.left) / O.width));
      return Math.round($ * r);
    },
    [r]
  );
  x.useEffect(() => {
    const A = ($) => {
      if (!T.current) return;
      const re = C($.clientX);
      T.current === "start" ? c(Ko(re, 0, o - 1)) : h(Ko(re, s + 1, r));
    }, O = () => {
      T.current = null;
    };
    return window.addEventListener("pointermove", A), window.addEventListener("pointerup", O), () => {
      window.removeEventListener("pointermove", A), window.removeEventListener("pointerup", O);
    };
  }, [C, r, o, s, c, h]);
  const L = (A) => (O) => {
    O.preventDefault(), O.stopPropagation(), T.current = A;
  }, z = (A) => {
    !m || A.target.closest("[data-handle]") || m(C(A.clientX));
  }, R = (A) => (O) => {
    const $ = O.shiftKey ? 100 : O.ctrlKey ? 1 : 10;
    let re = 0;
    if (O.key === "ArrowLeft") re = -$;
    else if (O.key === "ArrowRight") re = $;
    else return;
    O.preventDefault(), A === "start" ? c(Ko(s + re, 0, o - 1)) : h(Ko(o + re, s + 1, r));
  }, J = xf(s, r), G = xf(o, r), W = xf(g, r);
  return /* @__PURE__ */ f.jsxs(
    "div",
    {
      ref: w,
      className: E_,
      style: { height: v },
      onPointerDown: z,
      children: [
        /* @__PURE__ */ f.jsx(
          "canvas",
          {
            ref: S,
            width: b,
            height: v,
            className: T_,
            "aria-label": "Audio waveform"
          }
        ),
        j.isLoading && /* @__PURE__ */ f.jsx("div", { className: C0, children: "Decoding waveform…" }),
        j.error && /* @__PURE__ */ f.jsx("div", { className: C0, role: "alert", children: j.error }),
        /* @__PURE__ */ f.jsx("div", { className: j0, style: { left: 0, width: `${J}%` } }),
        /* @__PURE__ */ f.jsx(
          "div",
          {
            className: j0,
            style: { left: `${G}%`, right: 0, width: `${100 - G}%` }
          }
        ),
        /* @__PURE__ */ f.jsxs(
          "div",
          {
            className: w0,
            style: { left: `${J}%` },
            role: "slider",
            "aria-label": "Region start",
            "aria-valuemin": 0,
            "aria-valuemax": r,
            "aria-valuenow": s,
            tabIndex: 0,
            onPointerDown: L("start"),
            onKeyDown: R("start"),
            "data-handle": "start",
            children: [
              /* @__PURE__ */ f.jsx("span", { className: E0, "aria-hidden": "true" }),
              /* @__PURE__ */ f.jsx("span", { className: T0, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ f.jsxs(
          "div",
          {
            className: w0,
            style: { left: `${G}%` },
            role: "slider",
            "aria-label": "Region end",
            "aria-valuemin": 0,
            "aria-valuemax": r,
            "aria-valuenow": o,
            tabIndex: 0,
            onPointerDown: L("end"),
            onKeyDown: R("end"),
            "data-handle": "end",
            children: [
              /* @__PURE__ */ f.jsx("span", { className: E0, "aria-hidden": "true" }),
              /* @__PURE__ */ f.jsx("span", { className: T0, "aria-hidden": "true" })
            ]
          }
        ),
        p && /* @__PURE__ */ f.jsx(
          "div",
          {
            className: j_,
            style: {
              left: `${W}%`,
              transition: _ ? "none" : void 0
            },
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function xf(n, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(100, n / a * 100));
}
function Ko(n, a, r) {
  return Math.max(a, Math.min(r, n));
}
function M_(n, a, r, s) {
  if (!n) return;
  const o = n.getContext("2d");
  if (!o || (o.clearRect(0, 0, r, s), !a || a.length === 0)) return;
  const c = s / 2;
  o.fillStyle = A_(n, "--color-primary", "#ba9eff");
  const h = Math.min(a.length, r);
  for (let p = 0; p < h; p += 1) {
    const g = a[p] ?? 0, m = Math.max(1, g * (s - 4));
    o.fillRect(p, c - m / 2, 1, m);
  }
}
function A_(n, a, r) {
  return getComputedStyle(n).getPropertyValue(a).trim() || r;
}
var R_ = "r8lfsm0", __ = "r8lfsm1", D_ = "r8lfsm2", z_ = "r8lfsm3", O_ = "r8lfsm4", L_ = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, U_ = "_1b1zchy3", k_ = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, V_ = "_1b1zchy6", B_ = "_1b1zchy7";
const Mx = x.createContext("standalone");
function Ax({
  variant: n = "standalone",
  children: a,
  className: r,
  style: s,
  ...o
}) {
  const c = [L_[n], r].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsx(Mx.Provider, { value: n, children: /* @__PURE__ */ f.jsx("div", { className: c, style: s, ...o, children: a }) });
}
function Rx({
  title: n,
  meta: a,
  children: r,
  className: s,
  titleId: o
}) {
  const c = x.useContext(Mx), h = [U_, s].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsxs("div", { className: h, children: [
    /* @__PURE__ */ f.jsx("h3", { id: o, className: k_[c], children: n }),
    a ? /* @__PURE__ */ f.jsx("span", { className: V_, children: a }) : null,
    r
  ] });
}
function _x({
  children: n,
  className: a,
  role: r = "group"
}) {
  const s = [B_, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ f.jsx("div", { className: s, role: r, children: n });
}
const N0 = -16, H_ = 80, q_ = 720;
function $_(n) {
  const { deploymentId: a, runId: r, utterance: s, audioUrl: o, onApplied: c, onError: h, onCancel: p } = n, g = s.durationMs ?? 0, [m, b] = x.useState(() => M0(g)), [v, S] = x.useState(Mu), [w, T] = x.useState(!1), [j, _] = x.useState(!1), [C, L] = x.useState(null), [z, R] = x.useState(!1), J = x.useRef(null), G = x.useRef(null), W = x.useRef(null);
  x.useEffect(() => {
    const q = M0(g);
    b(q), S(yx(q)), _(!1), L(null), W.current = null;
  }, [s.utteranceId, g]);
  const A = x.useCallback((q) => {
    S(q), b((Q) => vx(Q, q));
  }, []);
  x.useEffect(() => () => G.current?.abort(), []), x.useEffect(() => {
    J.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [s.utteranceId]);
  const O = x.useCallback(
    (q) => {
      q.key === "Escape" && (q.stopPropagation(), p());
    },
    [p]
  ), $ = x.useMemo(
    () => m.ops.find((q) => q.mode === "trim"),
    [m.ops]
  ), re = $?.start_ms ?? 0, ae = $?.end_ms ?? Math.max(1, g), me = x.useCallback((q, Q) => {
    b((te) => I_(te, "trim", (N) => ({
      ...N,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(q)),
      end_ms: Math.max(Math.floor(q) + 1, Math.floor(Q))
    })));
  }, []), ge = x.useCallback((q) => me(q, ae), [ae, me]), oe = x.useCallback((q) => me(re, q), [re, me]), U = x.useCallback((q) => {
    _(q), b((Q) => {
      const te = Q.ops.filter((N) => N.mode !== "normalize");
      if (q) {
        const N = {
          id: yn(),
          mode: "normalize",
          target_lufs: N0
        };
        return { ...Q, ops: [...te, N] };
      }
      return { ...Q, ops: te };
    });
  }, []), V = x.useCallback(async () => {
    const q = lx(m, g);
    if (q) {
      L(q.message);
      return;
    }
    if (L(null), z) return;
    G.current?.abort();
    const Q = new AbortController();
    G.current = Q, R(!0);
    try {
      const te = W.current ?? void 0, N = await KC(
        a,
        r,
        s.utteranceId,
        te ? { chain: m, digest_before: te } : { chain: m },
        { signal: Q.signal }
      );
      if (Q.signal.aborted) return;
      W.current = N.chain_digest, c(N);
    } catch (te) {
      if (Q.signal.aborted) return;
      te instanceof Xr && (W.current = te.currentDigest || null);
      const N = te instanceof Xr ? "Edit chain has changed in another tab. Reload to continue." : te instanceof Error ? te.message : "apply failed";
      L(N), h(N);
    } finally {
      Q.signal.aborted || R(!1);
    }
  }, [m, g, z, a, r, s.utteranceId, c, h]);
  return /* @__PURE__ */ f.jsx(Ax, { variant: "nested", children: /* @__PURE__ */ f.jsxs("div", { ref: J, onKeyDown: O, children: [
    /* @__PURE__ */ f.jsx(Rx, { title: "Edit segment", meta: `Source · ${Qo(g)}` }),
    /* @__PURE__ */ f.jsx(
      Nx,
      {
        audioUrl: o,
        durationMs: Math.max(1, g),
        startMs: re,
        endMs: ae,
        onChangeStart: ge,
        onChangeEnd: oe,
        height: H_,
        width: q_
      }
    ),
    /* @__PURE__ */ f.jsxs("div", { className: R_, children: [
      /* @__PURE__ */ f.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ f.jsxs("span", { className: __, children: [
        Qo(re),
        " → ",
        Qo(ae),
        " · ",
        Qo(ae - re)
      ] })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: D_, children: [
      /* @__PURE__ */ f.jsxs("label", { className: z_, children: [
        /* @__PURE__ */ f.jsx(
          "input",
          {
            type: "checkbox",
            checked: j,
            onChange: (q) => U(q.currentTarget.checked),
            "aria-label": "Toggle loudness normalization"
          }
        ),
        /* @__PURE__ */ f.jsxs("span", { children: [
          "Normalize to ",
          N0.toFixed(0),
          " LUFS (broadcast-friendly)"
        ] })
      ] }),
      /* @__PURE__ */ f.jsxs(
        "button",
        {
          type: "button",
          className: O_,
          onClick: () => T((q) => !q),
          "aria-expanded": w,
          children: [
            w ? "▾" : "▸",
            " Advanced effects · gain · eq · pitch · fade · silence trim"
          ]
        }
      )
    ] }),
    w && /* @__PURE__ */ f.jsx(
      Mh,
      {
        state: v,
        onChange: A,
        supportsSynthSpeed: !1
      }
    ),
    /* @__PURE__ */ f.jsxs(_x, { children: [
      /* @__PURE__ */ f.jsx(ft, { size: "sm", onClick: () => void V(), disabled: z, children: z ? "Applying…" : "Apply" }),
      /* @__PURE__ */ f.jsx(ft, { variant: "ghost", size: "sm", onClick: p, disabled: z, children: "Cancel" })
    ] }),
    C && /* @__PURE__ */ f.jsx(_n, { severity: "error", children: C })
  ] }) });
}
function M0(n) {
  return n <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: yn(),
    mode: "trim",
    start_ms: 0,
    end_ms: n
  }] };
}
function I_(n, a, r) {
  const s = n.ops.findIndex((c) => c.mode === a);
  if (s === -1) {
    const c = { id: yn(), mode: a };
    return { ...n, ops: [...n.ops, r(c)] };
  }
  const o = [...n.ops];
  return o[s] = r(o[s]), { ...n, ops: o };
}
function Qo(n) {
  return !Number.isFinite(n) || n < 0 ? "0.0s" : n < 1e3 ? `${Math.round(n)} ms` : `${(Math.round(n / 100) / 10).toFixed(1)}s`;
}
var Y_ = "jq2zyb2", F_ = "jq2zyb3", G_ = "jq2zyb4", X_ = "jq2zyb5", K_ = "jq2zyb6", Q_ = "jq2zyb7", P_ = "jq2zyb8", Z_ = "jq2zyb9", J_ = "jq2zyba", W_ = "jq2zybb", e3 = "jq2zybc", t3 = "jq2zybd", n3 = "jq2zybe", a3 = "jq2zybf jq2zybe", i3 = "jq2zybg", r3 = "jq2zybh", l3 = "jq2zybi", s3 = "jq2zybj", o3 = "jq2zybk", u3 = "jq2zybl", c3 = "jq2zybm", d3 = "jq2zybn", f3 = "jq2zybo", h3 = "jq2zybp", m3 = "jq2zybq", p3 = "jq2zybr", g3 = "jq2zybs", v3 = "jq2zybt", y3 = "jq2zybu", b3 = "jq2zybv", x3 = "jq2zybw", S3 = "jq2zybx", w3 = "jq2zyby", E3 = "jq2zybz", A0 = "jq2zyb10", T3 = "jq2zyb11", j3 = "jq2zyb12", C3 = "jq2zyb13", N3 = "jq2zyb14";
const M3 = ["cancelled", "failed", "partial"], A3 = 2600;
function R3() {
  const { run: n } = ws(), a = xs(), [r, s] = x.useState(n), [o, c] = x.useState(!1), [h, p] = x.useState(null), [g, m] = x.useState(null), [b, v] = x.useState(
    null
  );
  x.useEffect(() => {
    s(n);
  }, [n]), x.useEffect(() => {
    if (!b) return;
    const R = setTimeout(() => v(null), A3);
    return () => clearTimeout(R);
  }, [b]);
  const S = x.useMemo(() => z3(r), [r]), w = M3.includes(r.status) && r.kind === "batch", T = (r.exportZipStaleAt ?? null) !== null, j = async () => {
    if (r.deploymentId) {
      c(!0), p(null);
      try {
        const { runId: R } = await ax(r.deploymentId, r.runId);
        a(`/${r.deploymentId}/runs/${R}`);
      } catch (R) {
        p(U3(R));
      } finally {
        c(!1);
      }
    }
  }, _ = x.useCallback((R) => {
    m((J) => J === R ? null : R);
  }, []), C = x.useCallback(() => {
    m(null);
  }, []), L = (R, J) => {
    s((G) => D3(G, R, J)), m(null), v({ message: "Segment edited", severity: "success" });
  }, z = x.useCallback((R) => {
    v({ message: R, severity: "error" });
  }, []);
  return /* @__PURE__ */ f.jsxs("main", { className: Y_, children: [
    /* @__PURE__ */ f.jsxs("div", { className: F_, children: [
      /* @__PURE__ */ f.jsxs("header", { className: G_, children: [
        /* @__PURE__ */ f.jsxs("p", { className: X_, children: [
          r.deploymentId ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
            /* @__PURE__ */ f.jsx(Cu, { to: `/${r.deploymentId}/recipe`, className: K_, children: "← Back to recipe" }),
            /* @__PURE__ */ f.jsx("span", { className: Q_, children: "·" })
          ] }) : null,
          /* @__PURE__ */ f.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ f.jsxs("div", { className: P_, children: [
          /* @__PURE__ */ f.jsxs("h1", { className: Z_, children: [
            O3(r.kind),
            /* @__PURE__ */ f.jsx("span", { className: J_, children: r.runId })
          ] }),
          /* @__PURE__ */ f.jsx(vi, { size: "md", tone: k3(r.status), pulse: r.status === "running", children: r.status })
        ] })
      ] }),
      /* @__PURE__ */ f.jsxs("section", { className: W_, "aria-label": "Run statistics", children: [
        /* @__PURE__ */ f.jsx(Po, { label: "Format", value: r.outputFormat.toUpperCase(), mono: !0 }),
        /* @__PURE__ */ f.jsx(Po, { label: "Speed", value: `${r.speedFactor.toFixed(2)}×`, mono: !0 }),
        /* @__PURE__ */ f.jsx(
          Po,
          {
            label: "Completed",
            value: `${S.completed} / ${S.total}`,
            progress: S.total > 0 ? S.completed / S.total : 0
          }
        ),
        /* @__PURE__ */ f.jsx(
          Po,
          {
            label: "Cache hit",
            value: `${S.cacheRatio}%`,
            progress: S.cacheRatio / 100
          }
        )
      ] }),
      w && /* @__PURE__ */ f.jsxs("section", { className: r3, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ f.jsxs("div", { className: l3, children: [
          /* @__PURE__ */ f.jsx("h2", { id: "run-detail-resume-title", className: s3, children: S.failed > 0 ? `${S.failed} line${S.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ f.jsx("p", { className: o3, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ f.jsx(ft, { size: "lg", disabled: o, onClick: () => void j(), children: o ? "Resuming…" : S.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        h && /* @__PURE__ */ f.jsx("p", { className: u3, role: "alert", children: h })
      ] }),
      /* @__PURE__ */ f.jsxs(La, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ f.jsxs(nC, { children: [
          /* @__PURE__ */ f.jsx("h2", { id: "run-detail-utterances", className: Ki, children: "01 / Utterances" }),
          S.completed > 0 && /* @__PURE__ */ f.jsxs("span", { className: c3, children: [
            /* @__PURE__ */ f.jsx("span", { className: d3, children: S.cached }),
            "/",
            S.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ f.jsx("ul", { className: f3, children: r.utterances.map((R) => {
          const J = g === R.utteranceId, G = R.status === "completed" && R.audioArtifactRef !== null && R.audioArtifactRef !== void 0, W = R.derivedArtifactRef ?? R.audioArtifactRef ?? null, A = W ? `/api/v1/artifacts/${encodeURIComponent(W)}/download` : "", O = (R.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ f.jsxs("li", { className: m3, children: [
            /* @__PURE__ */ f.jsxs("div", { className: h3, children: [
              /* @__PURE__ */ f.jsxs("span", { className: v3, children: [
                "#",
                R.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ f.jsx("span", { className: y3, title: R.characterDisplay, children: R.characterDisplay }),
              /* @__PURE__ */ f.jsx("span", { className: b3, title: R.text, children: R.text }),
              /* @__PURE__ */ f.jsxs("span", { className: x3, children: [
                R.cacheHit && /* @__PURE__ */ f.jsx("span", { className: S3, children: "cached" }),
                O && /* @__PURE__ */ f.jsx("span", { className: p3, children: "edited" }),
                R.durationMs ? /* @__PURE__ */ f.jsx("span", { children: L3(R.durationMs) }) : null,
                /* @__PURE__ */ f.jsx(vi, { tone: V3(R.status), children: R.status }),
                G && /* @__PURE__ */ f.jsx(
                  "button",
                  {
                    type: "button",
                    className: g3,
                    onClick: () => _(R.utteranceId),
                    "aria-expanded": J,
                    "aria-label": J ? "Close segment editor" : "Edit segment",
                    children: J ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            J && A && r.deploymentId && /* @__PURE__ */ f.jsx(
              $_,
              {
                deploymentId: r.deploymentId,
                runId: r.runId,
                utterance: R,
                audioUrl: A,
                onApplied: ($) => L(R.utteranceId, $),
                onError: z,
                onCancel: C
              }
            )
          ] }, R.utteranceId);
        }) })
      ] }),
      _3(r, T)
    ] }),
    b && /* @__PURE__ */ f.jsx(
      "div",
      {
        className: N3,
        role: b.severity === "error" ? "alert" : "status",
        "aria-live": b.severity === "error" ? "assertive" : "polite",
        children: b.message
      }
    )
  ] });
}
function _3(n, a) {
  if (!n.exportArtifactRef && !a) return null;
  const s = !!n.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ f.jsx("div", { className: w3, children: a ? /* @__PURE__ */ f.jsxs("div", { className: T3, children: [
    /* @__PURE__ */ f.jsx("p", { className: j3, children: s }),
    /* @__PURE__ */ f.jsxs(
      "button",
      {
        type: "button",
        className: C3,
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ f.jsx("span", { className: A0, children: "↻" })
        ]
      }
    )
  ] }) : n.exportArtifactRef ? /* @__PURE__ */ f.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${n.exportArtifactRef}/download`,
      download: !0,
      className: E3,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ f.jsx("span", { className: A0, children: "↓" })
      ]
    }
  ) : null });
}
function D3(n, a, r) {
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
function Po({ label: n, value: a, mono: r, progress: s }) {
  const o = s !== void 0 ? Math.min(1, Math.max(0, s)) : void 0;
  return /* @__PURE__ */ f.jsxs(
    "div",
    {
      className: e3,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ f.jsx("span", { className: t3, children: n }),
        /* @__PURE__ */ f.jsx("span", { className: r ? a3 : n3, children: a }),
        o !== void 0 && /* @__PURE__ */ f.jsx("span", { className: i3, "aria-hidden": "true" })
      ]
    }
  );
}
function z3(n) {
  const a = n.utterances.length, r = n.utterances.filter((h) => h.status === "completed").length, s = n.utterances.filter(
    (h) => h.status === "failed" || h.status === "cancelled"
  ).length, o = n.utterances.filter((h) => h.cacheHit).length, c = r > 0 ? Math.round(o / r * 100) : 0;
  return { total: a, completed: r, failed: s, cached: o, cacheRatio: c };
}
function O3(n) {
  switch (n) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function L3(n) {
  return n < 1e3 ? `${n} ms` : `${(n / 1e3).toFixed(n < 1e4 ? 2 : 1)} s`;
}
function U3(n) {
  return n instanceof Pr ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
function k3(n) {
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
function V3(n) {
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
var B3 = "pcphqj2", H3 = "pcphqj3", q3 = "pcphqj4", $3 = "pcphqj5", I3 = "pcphqj6", Y3 = "pcphqj7", F3 = "pcphqj8", G3 = "pcphqj9", X3 = "pcphqja", R0 = "pcphqjb", K3 = "pcphqjc", Q3 = "pcphqjd", P3 = "pcphqje pcphqjd", Z3 = "pcphqjf", J3 = "pcphqjg", W3 = "pcphqjh", eD = "pcphqji", tD = "pcphqjj pcphqji", nD = "pcphqjk pcphqji", aD = "pcphqjl pcphqji", iD = "pcphqjm", Sf = "pcphqjn", wf = "pcphqjo";
function rD() {
  const [n, a] = x.useState(null), [r, s] = x.useState(null);
  return x.useEffect(() => {
    let o = !1;
    const c = async () => {
      try {
        const p = await bt("/runtime/queue");
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
  }, []), /* @__PURE__ */ f.jsx("main", { className: B3, children: /* @__PURE__ */ f.jsxs("div", { className: H3, children: [
    /* @__PURE__ */ f.jsxs("header", { className: q3, children: [
      /* @__PURE__ */ f.jsx("p", { className: $3, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ f.jsxs("div", { className: I3, children: [
        /* @__PURE__ */ f.jsx("h1", { className: Y3, children: "Queue" }),
        /* @__PURE__ */ f.jsx("span", { className: F3, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ f.jsx("p", { className: G3, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    r ? /* @__PURE__ */ f.jsx(_n, { severity: "error", children: r }) : n === null ? null : n.length === 0 ? /* @__PURE__ */ f.jsx(La, { density: "compact", children: /* @__PURE__ */ f.jsx(Es, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ f.jsxs(La, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ f.jsx("h2", { id: "runtime-queue-section", className: Ki, children: "01 / In flight" }),
      /* @__PURE__ */ f.jsx("ul", { className: X3, children: n.map((o) => {
        const c = o.position === 1;
        return /* @__PURE__ */ f.jsxs(
          "li",
          {
            className: c ? `${R0} ${K3}` : R0,
            children: [
              /* @__PURE__ */ f.jsx("span", { className: c ? P3 : Q3, children: o.position }),
              /* @__PURE__ */ f.jsxs("span", { className: Z3, children: [
                /* @__PURE__ */ f.jsx("span", { className: J3, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ f.jsx("span", { className: W3, children: o.runId })
              ] }),
              /* @__PURE__ */ f.jsx("span", { className: lD(o.kind), children: sD(o.kind) }),
              /* @__PURE__ */ f.jsx("span", { className: iD, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
                /* @__PURE__ */ f.jsx("span", { className: Sf, children: oD(o.etaSeconds) }),
                /* @__PURE__ */ f.jsx("span", { className: wf, children: "eta" })
              ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
                /* @__PURE__ */ f.jsx("span", { className: Sf, children: o.utteranceTotal }),
                /* @__PURE__ */ f.jsx("span", { className: wf, children: "lines" })
              ] }) : /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
                /* @__PURE__ */ f.jsx("span", { className: Sf, children: "—" }),
                /* @__PURE__ */ f.jsx("span", { className: wf, children: "pending" })
              ] }) })
            ]
          },
          o.runId
        );
      }) })
    ] })
  ] }) });
}
function lD(n) {
  switch (n) {
    case "batch":
      return tD;
    case "test_line":
      return nD;
    case "resume":
      return aD;
    default:
      return eD;
  }
}
function sD(n) {
  switch (n) {
    case "test_line":
      return "test line";
    default:
      return n;
  }
}
function oD(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60), r = n % 60;
  return r === 0 ? `${a}m` : `${a}m ${r}s`;
}
function uD() {
  const { deploymentId: n, prefillCharacterName: a } = ws(), r = xs(), [s, o] = x.useState(a), [c, h] = x.useState(""), [p, g] = x.useState("none"), [m, b] = x.useState(!1), [v, S] = x.useState(null), w = x.useRef(null);
  x.useEffect(() => {
    w.current?.scrollIntoView({ behavior: "smooth", block: "center" }), w.current?.focus();
  }, []);
  const T = async (j) => {
    j.preventDefault(), b(!0), S(null);
    try {
      await Th(n, {
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
    /* @__PURE__ */ f.jsxs("form", { onSubmit: T, children: [
      /* @__PURE__ */ f.jsxs("label", { children: [
        "Character name",
        /* @__PURE__ */ f.jsx(
          "input",
          {
            ref: w,
            value: s,
            onChange: (j) => o(j.currentTarget.value),
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
            onChange: (j) => h(j.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ f.jsxs("label", { children: [
        "Emotion mode",
        /* @__PURE__ */ f.jsxs("select", { value: p, onChange: (j) => g(j.currentTarget.value), children: [
          /* @__PURE__ */ f.jsx("option", { value: "none", children: "None" }),
          /* @__PURE__ */ f.jsx("option", { value: "audio_ref", children: "Audio ref" }),
          /* @__PURE__ */ f.jsx("option", { value: "vector_preset", children: "Vector preset" }),
          /* @__PURE__ */ f.jsx("option", { value: "qwen_template", children: "Qwen template" })
        ] })
      ] }),
      /* @__PURE__ */ f.jsx(ft, { type: "submit", variant: "primary", disabled: m, children: "Save mapping" }),
      v && /* @__PURE__ */ f.jsx(_n, { severity: "error", children: v })
    ] })
  ] });
}
const Dx = x.createContext({});
function Ah(n) {
  const a = x.useRef(null);
  return a.current === null && (a.current = n()), a.current;
}
const cD = typeof window < "u", zx = cD ? x.useLayoutEffect : x.useEffect, Au = /* @__PURE__ */ x.createContext(null);
function dD(n, a) {
  n.indexOf(a) === -1 && n.push(a);
}
function fD(n, a) {
  const r = n.indexOf(a);
  r > -1 && n.splice(r, 1);
}
const yi = (n, a, r) => r > a ? a : r < n ? n : r;
function _0(n, a) {
  return a ? `${n}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : n;
}
let Ts = () => {
}, Kr = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (Ts = (n, a, r) => {
  !n && typeof console < "u" && console.warn(_0(a, r));
}, Kr = (n, a, r) => {
  if (!n)
    throw new Error(_0(a, r));
});
const bi = {}, Ox = (n) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);
function hD(n) {
  return typeof n == "object" && n !== null;
}
const Lx = (n) => /^0[^.\s]+$/u.test(n);
// @__NO_SIDE_EFFECTS__
function Ux(n) {
  let a;
  return () => (a === void 0 && (a = n()), a);
}
const Zr = /* @__NO_SIDE_EFFECTS__ */ (n) => n, mD = (n, a) => (r) => a(n(r)), Ru = (...n) => n.reduce(mD), kx = /* @__NO_SIDE_EFFECTS__ */ (n, a, r) => {
  const s = a - n;
  return s === 0 ? 1 : (r - n) / s;
};
class Vx {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return dD(this.subscriptions, a), () => fD(this.subscriptions, a);
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
function Bx(n, a) {
  return a ? n * (1e3 / a) : 0;
}
const Hx = (n, a, r) => (((1 - 3 * r + 3 * a) * n + (3 * r - 6 * a)) * n + 3 * a) * n, pD = 1e-7, gD = 12;
function vD(n, a, r, s, o) {
  let c, h, p = 0;
  do
    h = a + (r - a) / 2, c = Hx(h, s, o) - n, c > 0 ? r = h : a = h;
  while (Math.abs(c) > pD && ++p < gD);
  return h;
}
function js(n, a, r, s) {
  if (n === a && r === s)
    return Zr;
  const o = (c) => vD(c, 0, 1, n, r);
  return (c) => c === 0 || c === 1 ? c : Hx(o(c), a, s);
}
const qx = (n) => (a) => a <= 0.5 ? n(2 * a) / 2 : (2 - n(2 * (1 - a))) / 2, $x = (n) => (a) => 1 - n(1 - a), Ix = /* @__PURE__ */ js(0.33, 1.53, 0.69, 0.99), Rh = /* @__PURE__ */ $x(Ix), Yx = /* @__PURE__ */ qx(Rh), Fx = (n) => n >= 1 ? 1 : (n *= 2) < 1 ? 0.5 * Rh(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))), _h = (n) => 1 - Math.sin(Math.acos(n)), yD = $x(_h), Gx = qx(_h), bD = /* @__PURE__ */ js(0.42, 0, 1, 1), xD = /* @__PURE__ */ js(0, 0, 0.58, 1), Xx = /* @__PURE__ */ js(0.42, 0, 0.58, 1), SD = (n) => Array.isArray(n) && typeof n[0] != "number", Kx = (n) => Array.isArray(n) && typeof n[0] == "number", D0 = {
  linear: Zr,
  easeIn: bD,
  easeInOut: Xx,
  easeOut: xD,
  circIn: _h,
  circInOut: Gx,
  circOut: yD,
  backIn: Rh,
  backInOut: Yx,
  backOut: Ix,
  anticipate: Fx
}, wD = (n) => typeof n == "string", z0 = (n) => {
  if (Kx(n)) {
    Kr(n.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, r, s, o] = n;
    return js(a, r, s, o);
  } else if (wD(n))
    return Kr(D0[n] !== void 0, `Invalid easing type '${n}'`, "invalid-easing-type"), D0[n];
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
function ED(n, a) {
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
      const T = S && o ? r : s;
      return v && h.add(b), T.add(b), b;
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
const TD = 40;
function Qx(n, a) {
  let r = !1, s = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, c = () => r = !0, h = Zo.reduce((z, R) => (z[R] = ED(c), z), {}), { setup: p, read: g, resolveKeyframes: m, preUpdate: b, update: v, preRender: S, render: w, postRender: T } = h, j = () => {
    const z = bi.useManualTiming, R = z ? o.timestamp : performance.now();
    r = !1, z || (o.delta = s ? 1e3 / 60 : Math.max(Math.min(R - o.timestamp, TD), 1)), o.timestamp = R, o.isProcessing = !0, p.process(o), g.process(o), m.process(o), b.process(o), v.process(o), S.process(o), w.process(o), T.process(o), o.isProcessing = !1, r && a && (s = !1, n(j));
  }, _ = () => {
    r = !0, s = !0, o.isProcessing || n(j);
  };
  return { schedule: Zo.reduce((z, R) => {
    const J = h[R];
    return z[R] = (G, W = !1, A = !1) => (r || _(), J.schedule(G, W, A)), z;
  }, {}), cancel: (z) => {
    for (let R = 0; R < Zo.length; R++)
      h[Zo[R]].cancel(z);
  }, state: o, steps: h };
}
const { schedule: Gn, cancel: $f, state: hu } = /* @__PURE__ */ Qx(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Zr, !0);
let su;
function jD() {
  su = void 0;
}
const Rn = {
  now: () => (su === void 0 && Rn.set(hu.isProcessing || bi.useManualTiming ? hu.timestamp : performance.now()), su),
  set: (n) => {
    su = n, queueMicrotask(jD);
  }
}, Px = (n) => (a) => typeof a == "string" && a.startsWith(n), Zx = /* @__PURE__ */ Px("--"), CD = /* @__PURE__ */ Px("var(--"), Dh = (n) => CD(n) ? ND.test(n.split("/*")[0].trim()) : !1, ND = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function O0(n) {
  return typeof n != "string" ? !1 : n.split("/*")[0].includes("var(--");
}
const Jr = {
  test: (n) => typeof n == "number",
  parse: parseFloat,
  transform: (n) => n
}, ps = {
  ...Jr,
  transform: (n) => yi(0, 1, n)
}, Jo = {
  ...Jr,
  default: 1
}, ls = (n) => Math.round(n * 1e5) / 1e5, zh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function MD(n) {
  return n == null;
}
const AD = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Oh = (n, a) => (r) => !!(typeof r == "string" && AD.test(r) && r.startsWith(n) || a && !MD(r) && Object.prototype.hasOwnProperty.call(r, a)), Jx = (n, a, r) => (s) => {
  if (typeof s != "string")
    return s;
  const [o, c, h, p] = s.match(zh);
  return {
    [n]: parseFloat(o),
    [a]: parseFloat(c),
    [r]: parseFloat(h),
    alpha: p !== void 0 ? parseFloat(p) : 1
  };
}, RD = (n) => yi(0, 255, n), Ef = {
  ...Jr,
  transform: (n) => Math.round(RD(n))
}, Gi = {
  test: /* @__PURE__ */ Oh("rgb", "red"),
  parse: /* @__PURE__ */ Jx("red", "green", "blue"),
  transform: ({ red: n, green: a, blue: r, alpha: s = 1 }) => "rgba(" + Ef.transform(n) + ", " + Ef.transform(a) + ", " + Ef.transform(r) + ", " + ls(ps.transform(s)) + ")"
};
function _D(n) {
  let a = "", r = "", s = "", o = "";
  return n.length > 5 ? (a = n.substring(1, 3), r = n.substring(3, 5), s = n.substring(5, 7), o = n.substring(7, 9)) : (a = n.substring(1, 2), r = n.substring(2, 3), s = n.substring(3, 4), o = n.substring(4, 5), a += a, r += r, s += s, o += o), {
    red: parseInt(a, 16),
    green: parseInt(r, 16),
    blue: parseInt(s, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const If = {
  test: /* @__PURE__ */ Oh("#"),
  parse: _D,
  transform: Gi.transform
}, Cs = /* @__NO_SIDE_EFFECTS__ */ (n) => ({
  test: (a) => typeof a == "string" && a.endsWith(n) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${n}`
}), fi = /* @__PURE__ */ Cs("deg"), Gr = /* @__PURE__ */ Cs("%"), we = /* @__PURE__ */ Cs("px"), DD = /* @__PURE__ */ Cs("vh"), zD = /* @__PURE__ */ Cs("vw"), L0 = {
  ...Gr,
  parse: (n) => Gr.parse(n) / 100,
  transform: (n) => Gr.transform(n * 100)
}, Ir = {
  test: /* @__PURE__ */ Oh("hsl", "hue"),
  parse: /* @__PURE__ */ Jx("hue", "saturation", "lightness"),
  transform: ({ hue: n, saturation: a, lightness: r, alpha: s = 1 }) => "hsla(" + Math.round(n) + ", " + Gr.transform(ls(a)) + ", " + Gr.transform(ls(r)) + ", " + ls(ps.transform(s)) + ")"
}, Lt = {
  test: (n) => Gi.test(n) || If.test(n) || Ir.test(n),
  parse: (n) => Gi.test(n) ? Gi.parse(n) : Ir.test(n) ? Ir.parse(n) : If.parse(n),
  transform: (n) => typeof n == "string" ? n : n.hasOwnProperty("red") ? Gi.transform(n) : Ir.transform(n),
  getAnimatableNone: (n) => {
    const a = Lt.parse(n);
    return a.alpha = 0, Lt.transform(a);
  }
}, OD = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function LD(n) {
  return isNaN(n) && typeof n == "string" && (n.match(zh)?.length || 0) + (n.match(OD)?.length || 0) > 0;
}
const Wx = "number", e1 = "color", UD = "var", kD = "var(", U0 = "${}", VD = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Qr(n) {
  const a = n.toString(), r = [], s = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let c = 0;
  const p = a.replace(VD, (g) => (Lt.test(g) ? (s.color.push(c), o.push(e1), r.push(Lt.parse(g))) : g.startsWith(kD) ? (s.var.push(c), o.push(UD), r.push(g)) : (s.number.push(c), o.push(Wx), r.push(parseFloat(g))), ++c, U0)).split(U0);
  return { values: r, split: p, indexes: s, types: o };
}
function BD(n) {
  return Qr(n).values;
}
function t1({ split: n, types: a }) {
  const r = n.length;
  return (s) => {
    let o = "";
    for (let c = 0; c < r; c++)
      if (o += n[c], s[c] !== void 0) {
        const h = a[c];
        h === Wx ? o += ls(s[c]) : h === e1 ? o += Lt.transform(s[c]) : o += s[c];
      }
    return o;
  };
}
function HD(n) {
  return t1(Qr(n));
}
const qD = (n) => typeof n == "number" ? 0 : Lt.test(n) ? Lt.getAnimatableNone(n) : n, $D = (n, a) => typeof n == "number" ? a?.trim().endsWith("/") ? n : 0 : qD(n);
function ID(n) {
  const a = Qr(n);
  return t1(a)(a.values.map((s, o) => $D(s, a.split[o])));
}
const na = {
  test: LD,
  parse: BD,
  createTransformer: HD,
  getAnimatableNone: ID
};
function Tf(n, a, r) {
  return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? n + (a - n) * 6 * r : r < 1 / 2 ? a : r < 2 / 3 ? n + (a - n) * (2 / 3 - r) * 6 : n;
}
function YD({ hue: n, saturation: a, lightness: r, alpha: s }) {
  n /= 360, a /= 100, r /= 100;
  let o = 0, c = 0, h = 0;
  if (!a)
    o = c = h = r;
  else {
    const p = r < 0.5 ? r * (1 + a) : r + a - r * a, g = 2 * r - p;
    o = Tf(g, p, n + 1 / 3), c = Tf(g, p, n), h = Tf(g, p, n - 1 / 3);
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
const Ns = (n, a, r) => n + (a - n) * r, jf = (n, a, r) => {
  const s = n * n, o = r * (a * a - s) + s;
  return o < 0 ? 0 : Math.sqrt(o);
}, FD = [If, Gi, Ir], GD = (n) => FD.find((a) => a.test(n));
function k0(n) {
  const a = GD(n);
  if (Ts(!!a, `'${n}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let r = a.parse(n);
  return a === Ir && (r = YD(r)), r;
}
const V0 = (n, a) => {
  const r = k0(n), s = k0(a);
  if (!r || !s)
    return mu(n, a);
  const o = { ...r };
  return (c) => (o.red = jf(r.red, s.red, c), o.green = jf(r.green, s.green, c), o.blue = jf(r.blue, s.blue, c), o.alpha = Ns(r.alpha, s.alpha, c), Gi.transform(o));
}, Yf = /* @__PURE__ */ new Set(["none", "hidden"]);
function XD(n, a) {
  return Yf.has(n) ? (r) => r <= 0 ? n : a : (r) => r >= 1 ? a : n;
}
function KD(n, a) {
  return (r) => Ns(n, a, r);
}
function Lh(n) {
  return typeof n == "number" ? KD : typeof n == "string" ? Dh(n) ? mu : Lt.test(n) ? V0 : ZD : Array.isArray(n) ? n1 : typeof n == "object" ? Lt.test(n) ? V0 : QD : mu;
}
function n1(n, a) {
  const r = [...n], s = r.length, o = n.map((c, h) => Lh(c)(c, a[h]));
  return (c) => {
    for (let h = 0; h < s; h++)
      r[h] = o[h](c);
    return r;
  };
}
function QD(n, a) {
  const r = { ...n, ...a }, s = {};
  for (const o in r)
    n[o] !== void 0 && a[o] !== void 0 && (s[o] = Lh(n[o])(n[o], a[o]));
  return (o) => {
    for (const c in s)
      r[c] = s[c](o);
    return r;
  };
}
function PD(n, a) {
  const r = [], s = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const c = a.types[o], h = n.indexes[c][s[c]], p = n.values[h] ?? 0;
    r[o] = p, s[c]++;
  }
  return r;
}
const ZD = (n, a) => {
  const r = na.createTransformer(a), s = Qr(n), o = Qr(a);
  return s.indexes.var.length === o.indexes.var.length && s.indexes.color.length === o.indexes.color.length && s.indexes.number.length >= o.indexes.number.length ? Yf.has(n) && !o.values.length || Yf.has(a) && !s.values.length ? XD(n, a) : Ru(n1(PD(s, o), o.values), r) : (Ts(!0, `Complex values '${n}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), mu(n, a));
};
function a1(n, a, r) {
  return typeof n == "number" && typeof a == "number" && typeof r == "number" ? Ns(n, a, r) : Lh(n)(n, a);
}
const JD = (n) => {
  const a = ({ timestamp: r }) => n(r);
  return {
    start: (r = !0) => Gn.update(a, r),
    stop: () => $f(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => hu.isProcessing ? hu.timestamp : Rn.now()
  };
}, i1 = (n, a, r = 10) => {
  let s = "";
  const o = Math.max(Math.round(a / r), 2);
  for (let c = 0; c < o; c++)
    s += Math.round(n(c / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, pu = 2e4;
function Uh(n) {
  let a = 0;
  const r = 50;
  let s = n.next(a);
  for (; !s.done && a < pu; )
    a += r, s = n.next(a);
  return a >= pu ? 1 / 0 : a;
}
function WD(n, a = 100, r) {
  const s = r({ ...n, keyframes: [0, a] }), o = Math.min(Uh(s), pu);
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
function Ff(n, a) {
  return n * Math.sqrt(1 - a * a);
}
const ez = 12;
function tz(n, a, r) {
  let s = r;
  for (let o = 1; o < ez; o++)
    s = s - n(s) / a(s);
  return s;
}
const Cf = 1e-3;
function nz({ duration: n = xt.duration, bounce: a = xt.bounce, velocity: r = xt.velocity, mass: s = xt.mass }) {
  let o, c;
  Ts(n <= /* @__PURE__ */ Fn(xt.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let h = 1 - a;
  h = yi(xt.minDamping, xt.maxDamping, h), n = yi(xt.minDuration, xt.maxDuration, /* @__PURE__ */ ta(n)), h < 1 ? (o = (m) => {
    const b = m * h, v = b * n, S = b - r, w = Ff(m, h), T = Math.exp(-v);
    return Cf - S / w * T;
  }, c = (m) => {
    const v = m * h * n, S = v * r + r, w = Math.pow(h, 2) * Math.pow(m, 2) * n, T = Math.exp(-v), j = Ff(Math.pow(m, 2), h);
    return (-o(m) + Cf > 0 ? -1 : 1) * ((S - w) * T) / j;
  }) : (o = (m) => {
    const b = Math.exp(-m * n), v = (m - r) * n + 1;
    return -Cf + b * v;
  }, c = (m) => {
    const b = Math.exp(-m * n), v = (r - m) * (n * n);
    return b * v;
  });
  const p = 5 / n, g = tz(o, c, p);
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
const az = ["duration", "bounce"], iz = ["stiffness", "damping", "mass"];
function B0(n, a) {
  return a.some((r) => n[r] !== void 0);
}
function rz(n) {
  let a = {
    velocity: xt.velocity,
    stiffness: xt.stiffness,
    damping: xt.damping,
    mass: xt.mass,
    isResolvedFromDuration: !1,
    ...n
  };
  if (!B0(n, iz) && B0(n, az))
    if (a.velocity = 0, n.visualDuration) {
      const r = n.visualDuration, s = 2 * Math.PI / (r * 1.2), o = s * s, c = 2 * yi(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: xt.mass,
        stiffness: o,
        damping: c
      };
    } else {
      const r = nz({ ...n, velocity: 0 });
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
  const c = r.keyframes[0], h = r.keyframes[r.keyframes.length - 1], p = { done: !1, value: c }, { stiffness: g, damping: m, mass: b, duration: v, velocity: S, isResolvedFromDuration: w } = rz({
    ...r,
    velocity: -/* @__PURE__ */ ta(r.velocity || 0)
  }), T = S || 0, j = m / (2 * Math.sqrt(g * b)), _ = h - c, C = /* @__PURE__ */ ta(Math.sqrt(g / b)), L = Math.abs(_) < 5;
  s || (s = L ? xt.restSpeed.granular : xt.restSpeed.default), o || (o = L ? xt.restDelta.granular : xt.restDelta.default);
  let z, R, J, G, W, A;
  if (j < 1)
    J = Ff(C, j), G = (T + j * C * _) / J, z = ($) => {
      const re = Math.exp(-j * C * $);
      return h - re * (G * Math.sin(J * $) + _ * Math.cos(J * $));
    }, W = j * C * G + _ * J, A = j * C * _ - G * J, R = ($) => Math.exp(-j * C * $) * (W * Math.sin(J * $) + A * Math.cos(J * $));
  else if (j === 1) {
    z = (re) => h - Math.exp(-C * re) * (_ + (T + C * _) * re);
    const $ = T + C * _;
    R = (re) => Math.exp(-C * re) * (C * $ * re - T);
  } else {
    const $ = C * Math.sqrt(j * j - 1);
    z = (ge) => {
      const oe = Math.exp(-j * C * ge), U = Math.min($ * ge, 300);
      return h - oe * ((T + j * C * _) * Math.sinh(U) + $ * _ * Math.cosh(U)) / $;
    };
    const re = (T + j * C * _) / $, ae = j * C * re - _ * $, me = j * C * _ - re * $;
    R = (ge) => {
      const oe = Math.exp(-j * C * ge), U = Math.min($ * ge, 300);
      return oe * (ae * Math.sinh(U) + me * Math.cosh(U));
    };
  }
  const O = {
    calculatedDuration: w && v || null,
    velocity: ($) => /* @__PURE__ */ Fn(R($)),
    next: ($) => {
      if (!w && j < 1) {
        const ae = Math.exp(-j * C * $), me = Math.sin(J * $), ge = Math.cos(J * $), oe = h - ae * (G * me + _ * ge), U = /* @__PURE__ */ Fn(ae * (W * me + A * ge));
        return p.done = Math.abs(U) <= s && Math.abs(h - oe) <= o, p.value = p.done ? h : oe, p;
      }
      const re = z($);
      if (w)
        p.done = $ >= v;
      else {
        const ae = /* @__PURE__ */ Fn(R($));
        p.done = Math.abs(ae) <= s && Math.abs(h - re) <= o;
      }
      return p.value = p.done ? h : re, p;
    },
    toString: () => {
      const $ = Math.min(Uh(O), pu), re = i1((ae) => O.next($ * ae).value, $, 30);
      return $ + "ms " + re;
    },
    toTransition: () => {
    }
  };
  return O;
}
gu.applyToOptions = (n) => {
  const a = WD(n, 100, gu);
  return n.ease = a.ease, n.duration = /* @__PURE__ */ Fn(a.duration), n.type = "keyframes", n;
};
const lz = 5;
function r1(n, a, r) {
  const s = Math.max(a - lz, 0);
  return Bx(r - n(s), a - s);
}
function Gf({ keyframes: n, velocity: a = 0, power: r = 0.8, timeConstant: s = 325, bounceDamping: o = 10, bounceStiffness: c = 500, modifyTarget: h, min: p, max: g, restDelta: m = 0.5, restSpeed: b }) {
  const v = n[0], S = {
    done: !1,
    value: v
  }, w = (A) => p !== void 0 && A < p || g !== void 0 && A > g, T = (A) => p === void 0 ? g : g === void 0 || Math.abs(p - A) < Math.abs(g - A) ? p : g;
  let j = r * a;
  const _ = v + j, C = h === void 0 ? _ : h(_);
  C !== _ && (j = C - v);
  const L = (A) => -j * Math.exp(-A / s), z = (A) => C + L(A), R = (A) => {
    const O = L(A), $ = z(A);
    S.done = Math.abs(O) <= m, S.value = S.done ? C : $;
  };
  let J, G;
  const W = (A) => {
    w(S.value) && (J = A, G = gu({
      keyframes: [S.value, T(S.value)],
      velocity: r1(z, A, S.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: c,
      restDelta: m,
      restSpeed: b
    }));
  };
  return W(0), {
    calculatedDuration: null,
    next: (A) => {
      let O = !1;
      return !G && J === void 0 && (O = !0, R(A), W(A)), J !== void 0 && A >= J ? G.next(A - J) : (!O && R(A), S);
    }
  };
}
function sz(n, a, r) {
  const s = [], o = r || bi.mix || a1, c = n.length - 1;
  for (let h = 0; h < c; h++) {
    let p = o(n[h], n[h + 1]);
    if (a) {
      const g = Array.isArray(a) ? a[h] || Zr : a;
      p = Ru(g, p);
    }
    s.push(p);
  }
  return s;
}
function oz(n, a, { clamp: r = !0, ease: s, mixer: o } = {}) {
  const c = n.length;
  if (Kr(c === a.length, "Both input and output ranges must be the same length", "range-length"), c === 1)
    return () => a[0];
  if (c === 2 && a[0] === a[1])
    return () => a[1];
  const h = n[0] === n[1];
  n[0] > n[c - 1] && (n = [...n].reverse(), a = [...a].reverse());
  const p = sz(a, s, o), g = p.length, m = (b) => {
    if (h && b < n[0])
      return a[0];
    let v = 0;
    if (g > 1)
      for (; v < n.length - 2 && !(b < n[v + 1]); v++)
        ;
    const S = /* @__PURE__ */ kx(n[v], n[v + 1], b);
    return p[v](S);
  };
  return r ? (b) => m(yi(n[0], n[c - 1], b)) : m;
}
function uz(n, a) {
  const r = n[n.length - 1];
  for (let s = 1; s <= a; s++) {
    const o = /* @__PURE__ */ kx(0, a, s);
    n.push(Ns(r, 1, o));
  }
}
function cz(n) {
  const a = [0];
  return uz(a, n.length - 1), a;
}
function dz(n, a) {
  return n.map((r) => r * a);
}
function fz(n, a) {
  return n.map(() => a || Xx).splice(0, n.length - 1);
}
function ss({ duration: n = 300, keyframes: a, times: r, ease: s = "easeInOut" }) {
  const o = SD(s) ? s.map(z0) : z0(s), c = {
    done: !1,
    value: a[0]
  }, h = dz(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    r && r.length === a.length ? r : cz(a),
    n
  ), p = oz(h, a, {
    ease: Array.isArray(o) ? o : fz(a, o)
  });
  return {
    calculatedDuration: n,
    next: (g) => (c.value = p(g), c.done = g >= n, c)
  };
}
const hz = (n) => n !== null;
function _u(n, { repeat: a, repeatType: r = "loop" }, s, o = 1) {
  const c = n.filter(hz), p = o < 0 || a && r !== "loop" && a % 2 === 1 ? 0 : c.length - 1;
  return !p || s === void 0 ? c[p] : s;
}
const mz = {
  decay: Gf,
  inertia: Gf,
  tween: ss,
  keyframes: ss,
  spring: gu
};
function l1(n) {
  typeof n.type == "string" && (n.type = mz[n.type]);
}
class kh {
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
const pz = (n) => n / 100;
class vu extends kh {
  constructor(a) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: r } = this.options;
      r && r.updatedAt !== Rn.now() && this.tick(Rn.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = a, this.initAnimation(), this.play(), a.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: a } = this;
    l1(a);
    const { type: r = ss, repeat: s = 0, repeatDelay: o = 0, repeatType: c, velocity: h = 0 } = a;
    let { keyframes: p } = a;
    const g = r || ss;
    g !== ss && typeof p[0] != "number" && (this.mixKeyframes = Ru(pz, a1(p[0], p[1])), p = [0, 100]);
    const m = g({ ...a, keyframes: p });
    c === "mirror" && (this.mirroredGenerator = g({
      ...a,
      keyframes: [...p].reverse(),
      velocity: -h
    })), m.calculatedDuration === null && (m.calculatedDuration = Uh(m));
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
    const { delay: m = 0, keyframes: b, repeat: v, repeatType: S, repeatDelay: w, type: T, onUpdate: j, finalKeyframe: _ } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), r ? this.currentTime = a : this.updateTime(a);
    const C = this.currentTime - m * (this.playbackSpeed >= 0 ? 1 : -1), L = this.playbackSpeed >= 0 ? C < 0 : C > o;
    this.currentTime = Math.max(C, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let z = this.currentTime, R = s;
    if (v) {
      const A = Math.min(this.currentTime, o) / p;
      let O = Math.floor(A), $ = A % 1;
      !$ && A >= 1 && ($ = 1), $ === 1 && O--, O = Math.min(O, v + 1), !!(O % 2) && (S === "reverse" ? ($ = 1 - $, w && ($ -= w / p)) : S === "mirror" && (R = h)), z = yi(0, 1, $) * p;
    }
    let J;
    L ? (this.delayState.value = b[0], J = this.delayState) : J = R.next(z), c && !L && (J.value = c(J.value));
    let { done: G } = J;
    !L && g !== null && (G = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const W = this.holdTime === null && (this.state === "finished" || this.state === "running" && G);
    return W && T !== Gf && (J.value = _u(b, this.options, _, this.speed)), j && j(J.value), W && this.finish(), J;
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
    return r1((s) => this.generator.next(s).value, a, r);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(a) {
    const r = this.playbackSpeed !== a;
    r && this.driver && this.updateTime(Rn.now()), this.playbackSpeed = a, r && this.driver && (this.time = /* @__PURE__ */ ta(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: a = JD, startTime: r } = this.options;
    this.driver || (this.driver = a((o) => this.tick(o))), this.options.onPlay?.();
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = r ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(Rn.now()), this.holdTime = this.currentTime;
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
function gz(n) {
  for (let a = 1; a < n.length; a++)
    n[a] ?? (n[a] = n[a - 1]);
}
const Xi = (n) => n * 180 / Math.PI, Xf = (n) => {
  const a = Xi(Math.atan2(n[1], n[0]));
  return Kf(a);
}, vz = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (n) => (Math.abs(n[0]) + Math.abs(n[3])) / 2,
  rotate: Xf,
  rotateZ: Xf,
  skewX: (n) => Xi(Math.atan(n[1])),
  skewY: (n) => Xi(Math.atan(n[2])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[2])) / 2
}, Kf = (n) => (n = n % 360, n < 0 && (n += 360), n), H0 = Xf, q0 = (n) => Math.sqrt(n[0] * n[0] + n[1] * n[1]), $0 = (n) => Math.sqrt(n[4] * n[4] + n[5] * n[5]), yz = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: q0,
  scaleY: $0,
  scale: (n) => (q0(n) + $0(n)) / 2,
  rotateX: (n) => Kf(Xi(Math.atan2(n[6], n[5]))),
  rotateY: (n) => Kf(Xi(Math.atan2(-n[2], n[0]))),
  rotateZ: H0,
  rotate: H0,
  skewX: (n) => Xi(Math.atan(n[4])),
  skewY: (n) => Xi(Math.atan(n[1])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[4])) / 2
};
function Qf(n) {
  return n.includes("scale") ? 1 : 0;
}
function Pf(n, a) {
  if (!n || n === "none")
    return Qf(a);
  const r = n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, o;
  if (r)
    s = yz, o = r;
  else {
    const p = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = vz, o = p;
  }
  if (!o)
    return Qf(a);
  const c = s[a], h = o[1].split(",").map(xz);
  return typeof c == "function" ? c(h) : h[c];
}
const bz = (n, a) => {
  const { transform: r = "none" } = getComputedStyle(n);
  return Pf(r, a);
};
function xz(n) {
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
], el = new Set(Wr), I0 = (n) => n === Jr || n === we, Sz = /* @__PURE__ */ new Set(["x", "y", "z"]), wz = Wr.filter((n) => !Sz.has(n));
function Ez(n) {
  const a = [];
  return wz.forEach((r) => {
    const s = n.getValue(r);
    s !== void 0 && (a.push([r, s.get()]), s.set(r.startsWith("scale") ? 1 : 0));
  }), a;
}
const gi = {
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
  x: (n, { transform: a }) => Pf(a, "x"),
  y: (n, { transform: a }) => Pf(a, "y")
};
gi.translateX = gi.x;
gi.translateY = gi.y;
const Qi = /* @__PURE__ */ new Set();
let Zf = !1, Jf = !1, Wf = !1;
function s1() {
  if (Jf) {
    const n = Array.from(Qi).filter((s) => s.needsMeasurement), a = new Set(n.map((s) => s.element)), r = /* @__PURE__ */ new Map();
    a.forEach((s) => {
      const o = Ez(s);
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
  Jf = !1, Zf = !1, Qi.forEach((n) => n.complete(Wf)), Qi.clear();
}
function o1() {
  Qi.forEach((n) => {
    n.readKeyframes(), n.needsMeasurement && (Jf = !0);
  });
}
function Tz() {
  Wf = !0, o1(), s1(), Wf = !1;
}
class Vh {
  constructor(a, r, s, o, c, h = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = r, this.name = s, this.motionValue = o, this.element = c, this.isAsync = h;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Qi.add(this), Zf || (Zf = !0, Gn.read(o1), Gn.resolveKeyframes(s1))) : (this.readKeyframes(), this.complete());
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
    gz(a);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, a), Qi.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Qi.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const jz = (n) => n.startsWith("--");
function u1(n, a, r) {
  jz(a) ? n.style.setProperty(a, r) : n.style[a] = r;
}
const Cz = {};
function c1(n, a) {
  const r = /* @__PURE__ */ Ux(n);
  return () => Cz[a] ?? r();
}
const Nz = /* @__PURE__ */ c1(() => window.ScrollTimeline !== void 0, "scrollTimeline"), d1 = /* @__PURE__ */ c1(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), as = ([n, a, r, s]) => `cubic-bezier(${n}, ${a}, ${r}, ${s})`, Y0 = {
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
function f1(n, a) {
  if (n)
    return typeof n == "function" ? d1() ? i1(n, a) : "ease-out" : Kx(n) ? as(n) : Array.isArray(n) ? n.map((r) => f1(r, a) || Y0.easeOut) : Y0[n];
}
function Mz(n, a, r, { delay: s = 0, duration: o = 300, repeat: c = 0, repeatType: h = "loop", ease: p = "easeOut", times: g } = {}, m = void 0) {
  const b = {
    [a]: r
  };
  g && (b.offset = g);
  const v = f1(p, o);
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
function h1(n) {
  return typeof n == "function" && "applyToOptions" in n;
}
function Az({ type: n, ...a }) {
  return h1(n) && d1() ? n.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class m1 extends kh {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: r, name: s, keyframes: o, pseudoElement: c, allowFlatten: h = !1, finalKeyframe: p, onComplete: g } = a;
    this.isPseudoElement = !!c, this.allowFlatten = h, this.options = a, Kr(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const m = Az(a);
    this.animation = Mz(r, s, o, m, c), m.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !c) {
        const b = _u(o, this.options, p, this.speed);
        this.updateMotionValue && this.updateMotionValue(b), u1(r, s, b), this.animation.cancel();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && Nz() ? (this.animation.timeline = a, r && (this.animation.rangeStart = r), s && (this.animation.rangeEnd = s), Zr) : o(this);
  }
}
const p1 = {
  anticipate: Fx,
  backInOut: Yx,
  circInOut: Gx
};
function Rz(n) {
  return n in p1;
}
function _z(n) {
  typeof n.ease == "string" && Rz(n.ease) && (n.ease = p1[n.ease]);
}
const Nf = 10;
class Dz extends m1 {
  constructor(a) {
    _z(a), l1(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    }), g = Math.max(Nf, Rn.now() - this.startTime), m = yi(0, Nf, g - Nf), b = p.sample(g).value, { name: v } = this.options;
    c && v && u1(c, v, b), r.setWithVelocity(p.sample(Math.max(0, g - m)).value, b, m), p.stop();
  }
}
const F0 = (n, a) => a === "zIndex" ? !1 : !!(typeof n == "number" || Array.isArray(n) || typeof n == "string" && // It's animatable if we have a string
(na.test(n) || n === "0") && // And it contains numbers and/or colors
!n.startsWith("url("));
function zz(n) {
  const a = n[0];
  if (n.length === 1)
    return !0;
  for (let r = 0; r < n.length; r++)
    if (n[r] !== a)
      return !0;
}
function Oz(n, a, r, s) {
  const o = n[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const c = n[n.length - 1], h = F0(o, a), p = F0(c, a);
  return Ts(h === p, `You are trying to animate ${a} from "${o}" to "${c}". "${h ? c : o}" is not an animatable value.`, "value-not-animatable"), !h || !p ? !1 : zz(n) || (r === "spring" || h1(r)) && s;
}
function eh(n) {
  n.duration = 0, n.type = "keyframes";
}
const g1 = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), Lz = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function Uz(n) {
  for (let a = 0; a < n.length; a++)
    if (typeof n[a] == "string" && Lz.test(n[a]))
      return !0;
  return !1;
}
const kz = /* @__PURE__ */ new Set([
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
]), Vz = /* @__PURE__ */ Ux(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Bz(n) {
  const { motionValue: a, name: r, repeatDelay: s, repeatType: o, damping: c, type: h, keyframes: p } = n;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: m, transformTemplate: b } = a.owner.getProps();
  return Vz() && r && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (g1.has(r) || kz.has(r) && Uz(p)) && (r !== "transform" || !b) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !m && !s && o !== "mirror" && c !== 0 && h !== "inertia";
}
const Hz = 40;
class qz extends kh {
  constructor({ autoplay: a = !0, delay: r = 0, type: s = "keyframes", repeat: o = 0, repeatDelay: c = 0, repeatType: h = "loop", keyframes: p, name: g, motionValue: m, element: b, ...v }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = Rn.now();
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
    }, w = b?.KeyframeResolver || Vh;
    this.keyframeResolver = new w(p, (T, j, _) => this.onKeyframesResolved(T, j, S, !_), g, m, b), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, r, s, o) {
    this.keyframeResolver = void 0;
    const { name: c, type: h, velocity: p, delay: g, isHandoff: m, onUpdate: b } = s;
    this.resolvedAt = Rn.now();
    let v = !0;
    Oz(a, c, h, p) || (v = !1, (bi.instantAnimations || !g) && b?.(_u(a, s, r)), a[0] = a[a.length - 1], eh(s), s.repeat = 0);
    const w = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > Hz ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: r,
      ...s,
      keyframes: a
    }, T = v && !m && Bz(w), j = w.motionValue?.owner?.current;
    let _;
    if (T)
      try {
        _ = new Dz({
          ...w,
          element: j
        });
      } catch {
        _ = new vu(w);
      }
    else
      _ = new vu(w);
    _.finished.then(() => {
      this.notifyFinished();
    }).catch(Zr), this.pendingTimeline && (this.stopTimeline = _.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = _;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(a, r) {
    return this.finished.finally(a).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), Tz()), this._animation;
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
function v1(n, a, r, s = 0, o = 1) {
  const c = Array.from(n).sort((m, b) => m.sortNodePosition(b)).indexOf(a), h = n.size, p = (h - 1) * s;
  return typeof r == "function" ? r(c, h) : o === 1 ? c * s : p - c * s;
}
const $z = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Iz(n) {
  const a = $z.exec(n);
  if (!a)
    return [,];
  const [, r, s, o] = a;
  return [`--${r ?? s}`, o];
}
const Yz = 4;
function y1(n, a, r = 1) {
  Kr(r <= Yz, `Max CSS variable fallback depth detected in property "${n}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, o] = Iz(n);
  if (!s)
    return;
  const c = window.getComputedStyle(a).getPropertyValue(s);
  if (c) {
    const h = c.trim();
    return Ox(h) ? parseFloat(h) : h;
  }
  return Dh(o) ? y1(o, a, r + 1) : o;
}
const Fz = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, Gz = (n) => ({
  type: "spring",
  stiffness: 550,
  damping: n === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), Xz = {
  type: "keyframes",
  duration: 0.8
}, Kz = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, Qz = (n, { keyframes: a }) => a.length > 2 ? Xz : el.has(n) ? n.startsWith("scale") ? Gz(a[1]) : Fz : Kz;
function b1(n, a) {
  if (n?.inherit && a) {
    const { inherit: r, ...s } = n;
    return { ...a, ...s };
  }
  return n;
}
function x1(n, a) {
  const r = n?.[a] ?? n?.default ?? n;
  return r !== n ? b1(r, n) : r;
}
const Pz = /* @__PURE__ */ new Set([
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
function Zz(n) {
  for (const a in n)
    if (!Pz.has(a))
      return !0;
  return !1;
}
const Jz = (n, a, r, s = {}, o, c) => (h) => {
  const p = x1(s, n) || {}, g = p.delay || s.delay || 0;
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
  Zz(p) || Object.assign(b, Qz(n, b)), b.duration && (b.duration = /* @__PURE__ */ Fn(b.duration)), b.repeatDelay && (b.repeatDelay = /* @__PURE__ */ Fn(b.repeatDelay)), b.from !== void 0 && (b.keyframes[0] = b.from);
  let v = !1;
  if ((b.type === !1 || b.duration === 0 && !b.repeatDelay) && (eh(b), b.delay === 0 && (v = !0)), (bi.instantAnimations || bi.skipAnimations || o?.shouldSkipAnimations) && (v = !0, eh(b), b.delay = 0), b.allowFlatten = !p.type && !p.ease, v && !c && a.get() !== void 0) {
    const S = _u(b.keyframes, p);
    if (S !== void 0) {
      Gn.update(() => {
        b.onUpdate(S), b.onComplete();
      });
      return;
    }
  }
  return p.isSync ? new vu(b) : new qz(b);
};
function G0(n) {
  const a = [{}, {}];
  return n?.values.forEach((r, s) => {
    a[0][s] = r.get(), a[1][s] = r.getVelocity();
  }), a;
}
function Bh(n, a, r, s) {
  if (typeof a == "function") {
    const [o, c] = G0(s);
    a = a(r !== void 0 ? r : n.custom, o, c);
  }
  if (typeof a == "string" && (a = n.variants && n.variants[a]), typeof a == "function") {
    const [o, c] = G0(s);
    a = a(r !== void 0 ? r : n.custom, o, c);
  }
  return a;
}
function Pi(n, a, r) {
  const s = n.getProps();
  return Bh(s, a, r !== void 0 ? r : s.custom, n);
}
const S1 = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Wr
]), X0 = 30, Wz = (n) => !isNaN(parseFloat(n));
class e5 {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(a, r = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      const o = Rn.now();
      if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const c of this.dependents)
          c.dirty();
    }, this.hasAnimated = !1, this.setCurrent(a), this.owner = r.owner;
  }
  setCurrent(a) {
    this.current = a, this.updatedAt = Rn.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = Wz(this.current));
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
    this.events[a] || (this.events[a] = new Vx());
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
    const a = Rn.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > X0)
      return 0;
    const r = Math.min(this.updatedAt - this.prevUpdatedAt, X0);
    return Bx(parseFloat(this.current) - parseFloat(this.prevFrameValue), r);
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
  return new e5(n, a);
}
const th = (n) => Array.isArray(n);
function t5(n, a, r) {
  n.hasValue(a) ? n.getValue(a).set(r) : n.addValue(a, yu(r));
}
function n5(n) {
  return th(n) ? n[n.length - 1] || 0 : n;
}
function a5(n, a) {
  const r = Pi(n, a);
  let { transitionEnd: s = {}, transition: o = {}, ...c } = r || {};
  c = { ...c, ...s };
  for (const h in c) {
    const p = n5(c[h]);
    t5(n, h, p);
  }
}
const sn = (n) => !!(n && n.getVelocity);
function i5(n) {
  return !!(sn(n) && n.add);
}
function r5(n, a) {
  const r = n.getValue("willChange");
  if (i5(r))
    return r.add(a);
  if (!r && bi.WillChange) {
    const s = new bi.WillChange("auto");
    n.addValue("willChange", s), s.add(a);
  }
}
function Hh(n) {
  return n.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const l5 = "framerAppearId", w1 = "data-" + Hh(l5);
function s5(n) {
  return n.props[w1];
}
function o5({ protectedKeys: n, needsAnimating: a }, r) {
  const s = n.hasOwnProperty(r) && a[r] !== !0;
  return a[r] = !1, s;
}
function E1(n, a, { delay: r = 0, transitionOverride: s, type: o } = {}) {
  let { transition: c, transitionEnd: h, ...p } = a;
  const g = n.getDefaultTransition();
  c = c ? b1(c, g) : g;
  const m = c?.reduceMotion;
  s && (c = s);
  const b = [], v = o && n.animationState && n.animationState.getState()[o];
  for (const S in p) {
    const w = n.getValue(S, n.latestValues[S] ?? null), T = p[S];
    if (T === void 0 || v && o5(v, S))
      continue;
    const j = {
      delay: r,
      ...x1(c || {}, S)
    }, _ = w.get();
    if (_ !== void 0 && !w.isAnimating() && !Array.isArray(T) && T === _ && !j.velocity) {
      Gn.update(() => w.set(T));
      continue;
    }
    let C = !1;
    if (window.MotionHandoffAnimation) {
      const R = s5(n);
      if (R) {
        const J = window.MotionHandoffAnimation(R, S, Gn);
        J !== null && (j.startTime = J, C = !0);
      }
    }
    r5(n, S);
    const L = m ?? n.shouldReduceMotion;
    w.start(Jz(S, w, T, L && S1.has(S) ? { type: !1 } : j, n, C));
    const z = w.animation;
    z && b.push(z);
  }
  if (h) {
    const S = () => Gn.update(() => {
      h && a5(n, h);
    });
    b.length ? Promise.all(b).then(S) : S();
  }
  return b;
}
function nh(n, a, r = {}) {
  const s = Pi(n, a, r.type === "exit" ? n.presenceContext?.custom : void 0);
  let { transition: o = n.getDefaultTransition() || {} } = s || {};
  r.transitionOverride && (o = r.transitionOverride);
  const c = s ? () => Promise.all(E1(n, s, r)) : () => Promise.resolve(), h = n.variantChildren && n.variantChildren.size ? (g = 0) => {
    const { delayChildren: m = 0, staggerChildren: b, staggerDirection: v } = o;
    return u5(n, a, g, m, b, v, r);
  } : () => Promise.resolve(), { when: p } = o;
  if (p) {
    const [g, m] = p === "beforeChildren" ? [c, h] : [h, c];
    return g().then(() => m());
  } else
    return Promise.all([c(), h(r.delay)]);
}
function u5(n, a, r = 0, s = 0, o = 0, c = 1, h) {
  const p = [];
  for (const g of n.variantChildren)
    g.notify("AnimationStart", a), p.push(nh(g, a, {
      ...h,
      delay: r + (typeof s == "function" ? 0 : s) + v1(n.variantChildren, g, s, o, c)
    }).then(() => g.notify("AnimationComplete", a)));
  return Promise.all(p);
}
function c5(n, a, r = {}) {
  n.notify("AnimationStart", a);
  let s;
  if (Array.isArray(a)) {
    const o = a.map((c) => nh(n, c, r));
    s = Promise.all(o);
  } else if (typeof a == "string")
    s = nh(n, a, r);
  else {
    const o = typeof a == "function" ? Pi(n, a, r.custom) : a;
    s = Promise.all(E1(n, o, r));
  }
  return s.then(() => {
    n.notify("AnimationComplete", a);
  });
}
const d5 = {
  test: (n) => n === "auto",
  parse: (n) => n
}, T1 = (n) => (a) => a.test(n), j1 = [Jr, we, Gr, fi, zD, DD, d5], K0 = (n) => j1.find(T1(n));
function f5(n) {
  return typeof n == "number" ? n === 0 : n !== null ? n === "none" || n === "0" || Lx(n) : !0;
}
const h5 = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function m5(n) {
  const [a, r] = n.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return n;
  const [s] = r.match(zh) || [];
  if (!s)
    return n;
  const o = r.replace(s, "");
  let c = h5.has(a) ? 1 : 0;
  return s !== r && (c *= 100), a + "(" + c + o + ")";
}
const p5 = /\b([a-z-]*)\(.*?\)/gu, ah = {
  ...na,
  getAnimatableNone: (n) => {
    const a = n.match(p5);
    return a ? a.map(m5).join(" ") : n;
  }
}, ih = {
  ...na,
  getAnimatableNone: (n) => {
    const a = na.parse(n);
    return na.createTransformer(n)(a.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, Q0 = {
  ...Jr,
  transform: Math.round
}, g5 = {
  rotate: fi,
  rotateX: fi,
  rotateY: fi,
  rotateZ: fi,
  scale: Jo,
  scaleX: Jo,
  scaleY: Jo,
  scaleZ: Jo,
  skew: fi,
  skewX: fi,
  skewY: fi,
  distance: we,
  translateX: we,
  translateY: we,
  translateZ: we,
  x: we,
  y: we,
  z: we,
  perspective: we,
  transformPerspective: we,
  opacity: ps,
  originX: L0,
  originY: L0,
  originZ: we
}, qh = {
  // Border props
  borderWidth: we,
  borderTopWidth: we,
  borderRightWidth: we,
  borderBottomWidth: we,
  borderLeftWidth: we,
  borderRadius: we,
  borderTopLeftRadius: we,
  borderTopRightRadius: we,
  borderBottomRightRadius: we,
  borderBottomLeftRadius: we,
  // Positioning props
  width: we,
  maxWidth: we,
  height: we,
  maxHeight: we,
  top: we,
  right: we,
  bottom: we,
  left: we,
  inset: we,
  insetBlock: we,
  insetBlockStart: we,
  insetBlockEnd: we,
  insetInline: we,
  insetInlineStart: we,
  insetInlineEnd: we,
  // Spacing props
  padding: we,
  paddingTop: we,
  paddingRight: we,
  paddingBottom: we,
  paddingLeft: we,
  paddingBlock: we,
  paddingBlockStart: we,
  paddingBlockEnd: we,
  paddingInline: we,
  paddingInlineStart: we,
  paddingInlineEnd: we,
  margin: we,
  marginTop: we,
  marginRight: we,
  marginBottom: we,
  marginLeft: we,
  marginBlock: we,
  marginBlockStart: we,
  marginBlockEnd: we,
  marginInline: we,
  marginInlineStart: we,
  marginInlineEnd: we,
  // Typography
  fontSize: we,
  // Misc
  backgroundPositionX: we,
  backgroundPositionY: we,
  ...g5,
  zIndex: Q0,
  // SVG
  fillOpacity: ps,
  strokeOpacity: ps,
  numOctaves: Q0
}, v5 = {
  ...qh,
  // Color props
  color: Lt,
  backgroundColor: Lt,
  outlineColor: Lt,
  fill: Lt,
  stroke: Lt,
  // Border props
  borderColor: Lt,
  borderTopColor: Lt,
  borderRightColor: Lt,
  borderBottomColor: Lt,
  borderLeftColor: Lt,
  filter: ah,
  WebkitFilter: ah,
  mask: ih,
  WebkitMask: ih
}, C1 = (n) => v5[n], y5 = /* @__PURE__ */ new Set([ah, ih]);
function N1(n, a) {
  let r = C1(n);
  return y5.has(r) || (r = na), r.getAnimatableNone ? r.getAnimatableNone(a) : void 0;
}
const b5 = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function x5(n, a, r) {
  let s = 0, o;
  for (; s < n.length && !o; ) {
    const c = n[s];
    typeof c == "string" && !b5.has(c) && Qr(c).values.length && (o = n[s]), s++;
  }
  if (o && r)
    for (const c of a)
      n[c] = N1(r, o);
}
class S5 extends Vh {
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
      if (typeof v == "string" && (v = v.trim(), Dh(v))) {
        const S = y1(v, r.current);
        S !== void 0 && (a[b] = S), b === a.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !S1.has(s) || a.length !== 2)
      return;
    const [o, c] = a, h = K0(o), p = K0(c), g = O0(o), m = O0(c);
    if (g !== m && gi[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (h !== p)
      if (I0(h) && I0(p))
        for (let b = 0; b < a.length; b++) {
          const v = a[b];
          typeof v == "string" && (a[b] = parseFloat(v));
        }
      else gi[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: r } = this, s = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || f5(a[o])) && s.push(o);
    s.length && x5(a, s, r);
  }
  measureInitialState() {
    const { element: a, unresolvedKeyframes: r, name: s } = this;
    if (!a || !a.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = gi[s](a.measureViewportBox(), window.getComputedStyle(a.current)), r[0] = this.measuredOrigin;
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
    s[c] = gi[r](a.measureViewportBox(), window.getComputedStyle(a.current)), h !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = h), this.removedTransforms?.length && this.removedTransforms.forEach(([p, g]) => {
      a.getValue(p).set(g);
    }), this.resolveNoneKeyframes();
  }
}
function w5(n, a, r) {
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
const M1 = (n, a) => a && typeof n == "number" ? a.transform(n) : n;
function ou(n) {
  return hD(n) && "offsetHeight" in n && !("ownerSVGElement" in n);
}
const { schedule: E5 } = /* @__PURE__ */ Qx(queueMicrotask, !1), T5 = {
  y: !1
};
function j5() {
  return T5.y;
}
function A1(n, a) {
  const r = w5(n), s = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: s.signal
  };
  return [r, o, () => s.abort()];
}
function C5(n) {
  return !(n.pointerType === "touch" || j5());
}
function N5(n, a, r = {}) {
  const [s, o, c] = A1(n, r);
  return s.forEach((h) => {
    let p = !1, g = !1, m;
    const b = () => {
      h.removeEventListener("pointerleave", T);
    }, v = (_) => {
      m && (m(_), m = void 0), b();
    }, S = (_) => {
      p = !1, window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), g && (g = !1, v(_));
    }, w = () => {
      p = !0, window.addEventListener("pointerup", S, o), window.addEventListener("pointercancel", S, o);
    }, T = (_) => {
      if (_.pointerType !== "touch") {
        if (p) {
          g = !0;
          return;
        }
        v(_);
      }
    }, j = (_) => {
      if (!C5(_))
        return;
      g = !1;
      const C = a(h, _);
      typeof C == "function" && (m = C, h.addEventListener("pointerleave", T, o));
    };
    h.addEventListener("pointerenter", j, o), h.addEventListener("pointerdown", w, o);
  }), c;
}
const R1 = (n, a) => a ? n === a ? !0 : R1(n, a.parentElement) : !1, M5 = (n) => n.pointerType === "mouse" ? typeof n.button != "number" || n.button <= 0 : n.isPrimary !== !1, A5 = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function R5(n) {
  return A5.has(n.tagName) || n.isContentEditable === !0;
}
const uu = /* @__PURE__ */ new WeakSet();
function P0(n) {
  return (a) => {
    a.key === "Enter" && n(a);
  };
}
function Mf(n, a) {
  n.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const _5 = (n, a) => {
  const r = n.currentTarget;
  if (!r)
    return;
  const s = P0(() => {
    if (uu.has(r))
      return;
    Mf(r, "down");
    const o = P0(() => {
      Mf(r, "up");
    }), c = () => Mf(r, "cancel");
    r.addEventListener("keyup", o, a), r.addEventListener("blur", c, a);
  });
  r.addEventListener("keydown", s, a), r.addEventListener("blur", () => r.removeEventListener("keydown", s), a);
};
function Z0(n) {
  return M5(n) && !0;
}
const J0 = /* @__PURE__ */ new WeakSet();
function D5(n, a, r = {}) {
  const [s, o, c] = A1(n, r), h = (p) => {
    const g = p.currentTarget;
    if (!Z0(p) || J0.has(p))
      return;
    uu.add(g), r.stopPropagation && J0.add(p);
    const m = a(g, p), b = (w, T) => {
      window.removeEventListener("pointerup", v), window.removeEventListener("pointercancel", S), uu.has(g) && uu.delete(g), Z0(w) && typeof m == "function" && m(w, { success: T });
    }, v = (w) => {
      b(w, g === window || g === document || r.useGlobalTarget || R1(g, w.target));
    }, S = (w) => {
      b(w, !1);
    };
    window.addEventListener("pointerup", v, o), window.addEventListener("pointercancel", S, o);
  };
  return s.forEach((p) => {
    (r.useGlobalTarget ? window : p).addEventListener("pointerdown", h, o), ou(p) && (p.addEventListener("focus", (m) => _5(m, o)), !R5(p) && !p.hasAttribute("tabindex") && (p.tabIndex = 0));
  }), c;
}
const z5 = [...j1, Lt, na], O5 = (n) => z5.find(T1(n)), W0 = () => ({ min: 0, max: 0 }), _1 = () => ({
  x: W0(),
  y: W0()
}), L5 = /* @__PURE__ */ new WeakMap();
function Du(n) {
  return n !== null && typeof n == "object" && typeof n.start == "function";
}
function gs(n) {
  return typeof n == "string" || Array.isArray(n);
}
const $h = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Ih = ["initial", ...$h];
function zu(n) {
  return Du(n.animate) || Ih.some((a) => gs(n[a]));
}
function D1(n) {
  return !!(zu(n) || n.variants);
}
function U5(n, a, r) {
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
const rh = { current: null }, z1 = { current: !1 }, k5 = typeof window < "u";
function V5() {
  if (z1.current = !0, !!k5)
    if (window.matchMedia) {
      const n = window.matchMedia("(prefers-reduced-motion)"), a = () => rh.current = n.matches;
      n.addEventListener("change", a), a();
    } else
      rh.current = !1;
}
const eb = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let bu = {};
function O1(n) {
  bu = n;
}
function B5() {
  return bu;
}
class H5 {
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
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Vh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const w = Rn.now();
      this.renderScheduledAt < w && (this.renderScheduledAt = w, Gn.render(this.render, !1, !0));
    };
    const { latestValues: m, renderState: b } = p;
    this.latestValues = m, this.baseTarget = { ...m }, this.initialValues = r.initial ? { ...m } : {}, this.renderState = b, this.parent = a, this.props = r, this.presenceContext = s, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = c, this.options = g, this.blockInitialAnimation = !!h, this.isControllingVariants = zu(r), this.isVariantNode = D1(r), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: v, ...S } = this.scrapeMotionValuesFromProps(r, {}, this);
    for (const w in S) {
      const T = S[w];
      m[w] !== void 0 && sn(T) && T.set(m[w]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const r in this.initialValues)
        this.values.get(r)?.jump(this.initialValues[r]), this.latestValues[r] = this.initialValues[r];
    this.current = a, L5.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((r, s) => this.bindToMotionValue(s, r)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (z1.current || V5(), this.shouldReduceMotion = rh.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), $f(this.notifyUpdate), $f(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), r.accelerate && g1.has(a) && this.current instanceof HTMLElement) {
      const { factory: h, keyframes: p, times: g, ease: m, duration: b } = r.accelerate, v = new m1({
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
    const s = el.has(a);
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : _1();
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
    for (let s = 0; s < eb.length; s++) {
      const o = eb[s];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const c = "on" + o, h = a[c];
      h && (this.propEventSubscriptions[o] = this.on(o, h));
    }
    this.prevMotionValues = U5(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return s != null && (typeof s == "string" && (Ox(s) || Lx(s)) ? s = parseFloat(s) : !O5(s) && na.test(r) && (s = N1(a, r)), this.setBaseTarget(a, sn(s) ? s.get() : s)), sn(s) ? s.get() : s;
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
      const c = Bh(this.props, r, this.presenceContext?.custom);
      c && (s = c[a]);
    }
    if (r && s !== void 0)
      return s;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !sn(o) ? o : this.initialValues[a] !== void 0 && s === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, r) {
    return this.events[a] || (this.events[a] = new Vx()), this.events[a].add(r);
  }
  notify(a, ...r) {
    this.events[a] && this.events[a].notify(...r);
  }
  scheduleRenderMicrotask() {
    E5.render(this.render);
  }
}
class L1 extends H5 {
  constructor() {
    super(...arguments), this.KeyframeResolver = S5;
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
class tl {
  constructor(a) {
    this.isMounted = !1, this.node = a;
  }
  update() {
  }
}
function q5({ top: n, left: a, right: r, bottom: s }) {
  return {
    x: { min: a, max: r },
    y: { min: n, max: s }
  };
}
function $5(n, a) {
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
function I5(n, a) {
  return q5($5(n.getBoundingClientRect(), a));
}
const Y5 = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, F5 = Wr.length;
function G5(n, a, r) {
  let s = "", o = !0;
  for (let c = 0; c < F5; c++) {
    const h = Wr[c], p = n[h];
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
      const m = M1(p, qh[h]);
      if (!g) {
        o = !1;
        const b = Y5[h] || h;
        s += `${b}(${m}) `;
      }
      r && (a[h] = m);
    }
  }
  return s = s.trim(), r ? s = r(a, o ? "" : s) : o && (s = "none"), s;
}
function Yh(n, a, r) {
  const { style: s, vars: o, transformOrigin: c } = n;
  let h = !1, p = !1;
  for (const g in a) {
    const m = a[g];
    if (el.has(g)) {
      h = !0;
      continue;
    } else if (Zx(g)) {
      o[g] = m;
      continue;
    } else {
      const b = M1(m, qh[g]);
      g.startsWith("origin") ? (p = !0, c[g] = b) : s[g] = b;
    }
  }
  if (a.transform || (h || r ? s.transform = G5(a, n.transform, r) : s.transform && (s.transform = "none")), p) {
    const { originX: g = "50%", originY: m = "50%", originZ: b = 0 } = c;
    s.transformOrigin = `${g} ${m} ${b}`;
  }
}
function U1(n, { style: a, vars: r }, s, o) {
  const c = n.style;
  let h;
  for (h in a)
    c[h] = a[h];
  o?.applyProjectionStyles(c, s);
  for (h in r)
    c.setProperty(h, r[h]);
}
function tb(n, a) {
  return a.max === a.min ? 0 : n / (a.max - a.min) * 100;
}
const Zl = {
  correct: (n, a) => {
    if (!a.target)
      return n;
    if (typeof n == "string")
      if (we.test(n))
        n = parseFloat(n);
      else
        return n;
    const r = tb(n, a.target.x), s = tb(n, a.target.y);
    return `${r}% ${s}%`;
  }
}, X5 = {
  correct: (n, { treeScale: a, projectionDelta: r }) => {
    const s = n, o = na.parse(n);
    if (o.length > 5)
      return s;
    const c = na.createTransformer(n), h = typeof o[0] != "number" ? 1 : 0, p = r.x.scale * a.x, g = r.y.scale * a.y;
    o[0 + h] /= p, o[1 + h] /= g;
    const m = Ns(p, g, 0.5);
    return typeof o[2 + h] == "number" && (o[2 + h] /= m), typeof o[3 + h] == "number" && (o[3 + h] /= m), c(o);
  }
}, K5 = {
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
  boxShadow: X5
};
function k1(n, { layout: a, layoutId: r }) {
  return el.has(n) || n.startsWith("origin") || (a || r !== void 0) && (!!K5[n] || n === "opacity");
}
function Fh(n, a, r) {
  const s = n.style, o = a?.style, c = {};
  if (!s)
    return c;
  for (const h in s)
    (sn(s[h]) || o && sn(o[h]) || k1(h, n) || r?.getValue(h)?.liveStyle !== void 0) && (c[h] = s[h]);
  return c;
}
function Q5(n) {
  return window.getComputedStyle(n);
}
class P5 extends L1 {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = U1;
  }
  readValueFromInstance(a, r) {
    if (el.has(r))
      return this.projection?.isProjecting ? Qf(r) : bz(a, r);
    {
      const s = Q5(a), o = (Zx(r) ? s.getPropertyValue(r) : s[r]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: r }) {
    return I5(a, r);
  }
  build(a, r, s) {
    Yh(a, r, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, r, s) {
    return Fh(a, r, s);
  }
}
const Z5 = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, J5 = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function W5(n, a, r = 1, s = 0, o = !0) {
  n.pathLength = 1;
  const c = o ? Z5 : J5;
  n[c.offset] = `${-s}`, n[c.array] = `${a} ${r}`;
}
const eO = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function V1(n, {
  attrX: a,
  attrY: r,
  attrScale: s,
  pathLength: o,
  pathSpacing: c = 1,
  pathOffset: h = 0,
  // This is object creation, which we try to avoid per-frame.
  ...p
}, g, m, b) {
  if (Yh(n, p, m), g) {
    n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
    return;
  }
  n.attrs = n.style, n.style = {};
  const { attrs: v, style: S } = n;
  v.transform && (S.transform = v.transform, delete v.transform), (S.transform || v.transformOrigin) && (S.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), S.transform && (S.transformBox = b?.transformBox ?? "fill-box", delete v.transformBox);
  for (const w of eO)
    v[w] !== void 0 && (S[w] = v[w], delete v[w]);
  a !== void 0 && (v.x = a), r !== void 0 && (v.y = r), s !== void 0 && (v.scale = s), o !== void 0 && W5(v, o, c, h, !1);
}
const B1 = /* @__PURE__ */ new Set([
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
]), H1 = (n) => typeof n == "string" && n.toLowerCase() === "svg";
function tO(n, a, r, s) {
  U1(n, a, void 0, s);
  for (const o in a.attrs)
    n.setAttribute(B1.has(o) ? o : Hh(o), a.attrs[o]);
}
function q1(n, a, r) {
  const s = Fh(n, a, r);
  for (const o in n)
    if (sn(n[o]) || sn(a[o])) {
      const c = Wr.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      s[c] = n[o];
    }
  return s;
}
class nO extends L1 {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = _1;
  }
  getBaseTargetFromProps(a, r) {
    return a[r];
  }
  readValueFromInstance(a, r) {
    if (el.has(r)) {
      const s = C1(r);
      return s && s.default || 0;
    }
    return r = B1.has(r) ? r : Hh(r), a.getAttribute(r);
  }
  scrapeMotionValuesFromProps(a, r, s) {
    return q1(a, r, s);
  }
  build(a, r, s) {
    V1(a, r, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(a, r, s, o) {
    tO(a, r, s, o);
  }
  mount(a) {
    this.isSVGTag = H1(a.tagName), super.mount(a);
  }
}
const aO = Ih.length;
function $1(n) {
  if (!n)
    return;
  if (!n.isControllingVariants) {
    const r = n.parent ? $1(n.parent) || {} : {};
    return n.props.initial !== void 0 && (r.initial = n.props.initial), r;
  }
  const a = {};
  for (let r = 0; r < aO; r++) {
    const s = Ih[r], o = n.props[s];
    (gs(o) || o === !1) && (a[s] = o);
  }
  return a;
}
function I1(n, a) {
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
const iO = [...$h].reverse(), rO = $h.length;
function lO(n) {
  return (a) => Promise.all(a.map(({ animation: r, options: s }) => c5(n, r, s)));
}
function sO(n) {
  let a = lO(n), r = nb(), s = !0, o = !1;
  const c = (m) => (b, v) => {
    const S = Pi(n, v, m === "exit" ? n.presenceContext?.custom : void 0);
    if (S) {
      const { transition: w, transitionEnd: T, ...j } = S;
      b = { ...b, ...j, ...T };
    }
    return b;
  };
  function h(m) {
    a = m(n);
  }
  function p(m) {
    const { props: b } = n, v = $1(n.parent) || {}, S = [], w = /* @__PURE__ */ new Set();
    let T = {}, j = 1 / 0;
    for (let C = 0; C < rO; C++) {
      const L = iO[C], z = r[L], R = b[L] !== void 0 ? b[L] : v[L], J = gs(R), G = L === m ? z.isActive : null;
      G === !1 && (j = C);
      let W = R === v[L] && R !== b[L] && J;
      if (W && (s || o) && n.manuallyAnimateOnMount && (W = !1), z.protectedKeys = { ...T }, // If it isn't active and hasn't *just* been set as inactive
      !z.isActive && G === null || // If we didn't and don't have any defined prop for this animation type
      !R && !z.prevProp || // Or if the prop doesn't define an animation
      Du(R) || typeof R == "boolean")
        continue;
      if (L === "exit" && z.isActive && G !== !0) {
        z.prevResolvedValues && (T = {
          ...T,
          ...z.prevResolvedValues
        });
        continue;
      }
      const A = oO(z.prevProp, R);
      let O = A || // If we're making this variant active, we want to always make it active
      L === m && z.isActive && !W && J || // If we removed a higher-priority variant (i is in reverse order)
      C > j && J, $ = !1;
      const re = Array.isArray(R) ? R : [R];
      let ae = re.reduce(c(L), {});
      G === !1 && (ae = {});
      const { prevResolvedValues: me = {} } = z, ge = {
        ...me,
        ...ae
      }, oe = (q) => {
        O = !0, w.has(q) && ($ = !0, w.delete(q)), z.needsAnimating[q] = !0;
        const Q = n.getValue(q);
        Q && (Q.liveStyle = !1);
      };
      for (const q in ge) {
        const Q = ae[q], te = me[q];
        if (T.hasOwnProperty(q))
          continue;
        let N = !1;
        th(Q) && th(te) ? N = !I1(Q, te) : N = Q !== te, N ? Q != null ? oe(q) : w.add(q) : Q !== void 0 && w.has(q) ? oe(q) : z.protectedKeys[q] = !0;
      }
      z.prevProp = R, z.prevResolvedValues = ae, z.isActive && (T = { ...T, ...ae }), (s || o) && n.blockInitialAnimation && (O = !1);
      const U = W && A;
      O && (!U || $) && S.push(...re.map((q) => {
        const Q = { type: L };
        if (typeof q == "string" && (s || o) && !U && n.manuallyAnimateOnMount && n.parent) {
          const { parent: te } = n, N = Pi(te, q);
          if (te.enteringChildren && N) {
            const { delayChildren: K } = N.transition || {};
            Q.delay = v1(te.enteringChildren, n, K);
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
        const L = Pi(n, Array.isArray(b.initial) ? b.initial[0] : b.initial);
        L && L.transition && (C.transition = L.transition);
      }
      w.forEach((L) => {
        const z = n.getBaseTarget(L), R = n.getValue(L);
        R && (R.liveStyle = !0), C[L] = z ?? null;
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
      r = nb(), o = !0;
    }
  };
}
function oO(n, a) {
  return typeof a == "string" ? a !== n : Array.isArray(a) ? !I1(a, n) : !1;
}
function Ii(n = !1) {
  return {
    isActive: n,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function nb() {
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
function ab(n, a, r, s = { passive: !0 }) {
  return n.addEventListener(a, r, s), () => n.removeEventListener(a, r);
}
function uO(n) {
  return sn(n) ? n.get() : n;
}
const Gh = x.createContext({
  transformPagePoint: (n) => n,
  isStatic: !1,
  reducedMotion: "never"
});
function ib(n, a) {
  if (typeof n == "function")
    return n(a);
  n != null && (n.current = a);
}
function cO(...n) {
  return (a) => {
    let r = !1;
    const s = n.map((o) => {
      const c = ib(o, a);
      return !r && typeof c == "function" && (r = !0), c;
    });
    if (r)
      return () => {
        for (let o = 0; o < s.length; o++) {
          const c = s[o];
          typeof c == "function" ? c() : ib(n[o], null);
        }
      };
  };
}
function dO(...n) {
  return x.useCallback(cO(...n), n);
}
class fO extends x.Component {
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
function hO({ children: n, isPresent: a, anchorX: r, anchorY: s, root: o, pop: c }) {
  const h = x.useId(), p = x.useRef(null), g = x.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: m } = x.useContext(Gh), b = n.props?.ref ?? n?.ref, v = dO(p, b);
  return x.useInsertionEffect(() => {
    const { width: S, height: w, top: T, left: j, right: _, bottom: C } = g.current;
    if (a || c === !1 || !p.current || !S || !w)
      return;
    const L = r === "left" ? `left: ${j}` : `right: ${_}`, z = s === "bottom" ? `bottom: ${C}` : `top: ${T}`;
    p.current.dataset.motionPopId = h;
    const R = document.createElement("style");
    m && (R.nonce = m);
    const J = o ?? document.head;
    return J.appendChild(R), R.sheet && R.sheet.insertRule(`
          [data-motion-pop-id="${h}"] {
            position: absolute !important;
            width: ${S}px !important;
            height: ${w}px !important;
            ${L}px !important;
            ${z}px !important;
          }
        `), () => {
      p.current?.removeAttribute("data-motion-pop-id"), J.contains(R) && J.removeChild(R);
    };
  }, [a]), f.jsx(fO, { isPresent: a, childRef: p, sizeRef: g, pop: c, children: c === !1 ? n : x.cloneElement(n, { ref: v }) });
}
const mO = ({ children: n, initial: a, isPresent: r, onExitComplete: s, custom: o, presenceAffectsLayout: c, mode: h, anchorX: p, anchorY: g, root: m }) => {
  const b = Ah(pO), v = x.useId();
  let S = !0, w = x.useMemo(() => (S = !1, {
    id: v,
    initial: a,
    isPresent: r,
    custom: o,
    onExitComplete: (T) => {
      b.set(T, !0);
      for (const j of b.values())
        if (!j)
          return;
      s && s();
    },
    register: (T) => (b.set(T, !1), () => b.delete(T))
  }), [r, b, s]);
  return c && S && (w = { ...w }), x.useMemo(() => {
    b.forEach((T, j) => b.set(j, !1));
  }, [r]), x.useEffect(() => {
    !r && !b.size && s && s();
  }, [r]), n = f.jsx(hO, { pop: h === "popLayout", isPresent: r, anchorX: p, anchorY: g, root: m, children: n }), f.jsx(Au.Provider, { value: w, children: n });
};
function pO() {
  return /* @__PURE__ */ new Map();
}
function gO(n = !0) {
  const a = x.useContext(Au);
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
const Wo = (n) => n.key || "";
function rb(n) {
  const a = [];
  return x.Children.forEach(n, (r) => {
    x.isValidElement(r) && a.push(r);
  }), a;
}
const vO = ({ children: n, custom: a, initial: r = !0, onExitComplete: s, presenceAffectsLayout: o = !0, mode: c = "sync", propagate: h = !1, anchorX: p = "left", anchorY: g = "top", root: m }) => {
  const [b, v] = gO(h), S = x.useMemo(() => rb(n), [n]), w = h && !b ? [] : S.map(Wo), T = x.useRef(!0), j = x.useRef(S), _ = Ah(() => /* @__PURE__ */ new Map()), C = x.useRef(/* @__PURE__ */ new Set()), [L, z] = x.useState(S), [R, J] = x.useState(S);
  zx(() => {
    T.current = !1, j.current = S;
    for (let A = 0; A < R.length; A++) {
      const O = Wo(R[A]);
      w.includes(O) ? (_.delete(O), C.current.delete(O)) : _.get(O) !== !0 && _.set(O, !1);
    }
  }, [R, w.length, w.join("-")]);
  const G = [];
  if (S !== L) {
    let A = [...S];
    for (let O = 0; O < R.length; O++) {
      const $ = R[O], re = Wo($);
      w.includes(re) || (A.splice(O, 0, $), G.push($));
    }
    return c === "wait" && G.length && (A = G), J(rb(A)), z(S), null;
  }
  const { forceRender: W } = x.useContext(Dx);
  return f.jsx(f.Fragment, { children: R.map((A) => {
    const O = Wo(A), $ = h && !b ? !1 : S === R || w.includes(O), re = () => {
      if (C.current.has(O))
        return;
      if (_.has(O))
        C.current.add(O), _.set(O, !0);
      else
        return;
      let ae = !0;
      _.forEach((me) => {
        me || (ae = !1);
      }), ae && (W?.(), J(j.current), h && v?.(), s && s());
    };
    return f.jsx(mO, { isPresent: $, initial: !T.current || r ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: c, root: m, onExitComplete: $ ? void 0 : re, anchorX: p, anchorY: g, children: A }, O);
  }) });
}, Xh = x.createContext({ strict: !1 }), lb = {
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
let sb = !1;
function yO() {
  if (sb)
    return;
  const n = {};
  for (const a in lb)
    n[a] = {
      isEnabled: (r) => lb[a].some((s) => !!r[s])
    };
  O1(n), sb = !0;
}
function Y1() {
  return yO(), B5();
}
function lh(n) {
  const a = Y1();
  for (const r in n)
    a[r] = {
      ...a[r],
      ...n[r]
    };
  O1(a);
}
function F1({ children: n, features: a, strict: r = !1 }) {
  const [, s] = x.useState(!Af(a)), o = x.useRef(void 0);
  if (!Af(a)) {
    const { renderer: c, ...h } = a;
    o.current = c, lh(h);
  }
  return x.useEffect(() => {
    Af(a) && a().then(({ renderer: c, ...h }) => {
      lh(h), o.current = c, s(!0);
    });
  }, []), f.jsx(Xh.Provider, { value: { renderer: o.current, strict: r }, children: n });
}
function Af(n) {
  return typeof n == "function";
}
const bO = /* @__PURE__ */ new Set([
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
  return n.startsWith("while") || n.startsWith("drag") && n !== "draggable" || n.startsWith("layout") || n.startsWith("onTap") || n.startsWith("onPan") || n.startsWith("onLayout") || bO.has(n);
}
let G1 = (n) => !xu(n);
function xO(n) {
  typeof n == "function" && (G1 = (a) => a.startsWith("on") ? !xu(a) : n(a));
}
try {
  xO(require("@emotion/is-prop-valid").default);
} catch {
}
function SO(n, a, r) {
  const s = {};
  for (const o in n)
    o === "values" && typeof n.values == "object" || sn(n[o]) || (G1(o) || r === !0 && xu(o) || !a && !xu(o) || // If trying to use native HTML drag events, forward drag listeners
    n.draggable && o.startsWith("onDrag")) && (s[o] = n[o]);
  return s;
}
const Ou = /* @__PURE__ */ x.createContext({});
function wO(n, a) {
  if (zu(n)) {
    const { initial: r, animate: s } = n;
    return {
      initial: r === !1 || gs(r) ? r : void 0,
      animate: gs(s) ? s : void 0
    };
  }
  return n.inherit !== !1 ? a : {};
}
function EO(n) {
  const { initial: a, animate: r } = wO(n, x.useContext(Ou));
  return x.useMemo(() => ({ initial: a, animate: r }), [ob(a), ob(r)]);
}
function ob(n) {
  return Array.isArray(n) ? n.join(" ") : n;
}
const Kh = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function X1(n, a, r) {
  for (const s in a)
    !sn(a[s]) && !k1(s, r) && (n[s] = a[s]);
}
function TO({ transformTemplate: n }, a) {
  return x.useMemo(() => {
    const r = Kh();
    return Yh(r, a, n), Object.assign({}, r.vars, r.style);
  }, [a]);
}
function jO(n, a) {
  const r = n.style || {}, s = {};
  return X1(s, r, n), Object.assign(s, TO(n, a)), s;
}
function CO(n, a) {
  const r = {}, s = jO(n, a);
  return n.drag && n.dragListener !== !1 && (r.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = n.drag === !0 ? "none" : `pan-${n.drag === "x" ? "y" : "x"}`), n.tabIndex === void 0 && (n.onTap || n.onTapStart || n.whileTap) && (r.tabIndex = 0), r.style = s, r;
}
const K1 = () => ({
  ...Kh(),
  attrs: {}
});
function NO(n, a, r, s) {
  const o = x.useMemo(() => {
    const c = K1();
    return V1(c, a, H1(s), n.transformTemplate, n.style), {
      ...c.attrs,
      style: { ...c.style }
    };
  }, [a]);
  if (n.style) {
    const c = {};
    X1(c, n.style, n), o.style = { ...c, ...o.style };
  }
  return o;
}
const MO = [
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
function Qh(n) {
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
      !!(MO.indexOf(n) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(n))
    )
  );
}
function AO(n, a, r, { latestValues: s }, o, c = !1, h) {
  const g = (h ?? Qh(n) ? NO : CO)(a, s, o, n), m = SO(a, typeof n == "string", c), b = n !== x.Fragment ? { ...m, ...g, ref: r } : {}, { children: v } = a, S = x.useMemo(() => sn(v) ? v.get() : v, [v]);
  return x.createElement(n, {
    ...b,
    children: S
  });
}
function RO({ scrapeMotionValuesFromProps: n, createRenderState: a }, r, s, o) {
  return {
    latestValues: _O(r, s, o, n),
    renderState: a()
  };
}
function _O(n, a, r, s) {
  const o = {}, c = s(n, {});
  for (const S in c)
    o[S] = uO(c[S]);
  let { initial: h, animate: p } = n;
  const g = zu(n), m = D1(n);
  a && m && !g && n.inherit !== !1 && (h === void 0 && (h = a.initial), p === void 0 && (p = a.animate));
  let b = r ? r.initial === !1 : !1;
  b = b || h === !1;
  const v = b ? p : h;
  if (v && typeof v != "boolean" && !Du(v)) {
    const S = Array.isArray(v) ? v : [v];
    for (let w = 0; w < S.length; w++) {
      const T = Bh(n, S[w]);
      if (T) {
        const { transitionEnd: j, transition: _, ...C } = T;
        for (const L in C) {
          let z = C[L];
          if (Array.isArray(z)) {
            const R = b ? z.length - 1 : 0;
            z = z[R];
          }
          z !== null && (o[L] = z);
        }
        for (const L in j)
          o[L] = j[L];
      }
    }
  }
  return o;
}
const Q1 = (n) => (a, r) => {
  const s = x.useContext(Ou), o = x.useContext(Au), c = () => RO(n, a, s, o);
  return r ? c() : Ah(c);
}, DO = /* @__PURE__ */ Q1({
  scrapeMotionValuesFromProps: Fh,
  createRenderState: Kh
}), zO = /* @__PURE__ */ Q1({
  scrapeMotionValuesFromProps: q1,
  createRenderState: K1
}), OO = Symbol.for("motionComponentSymbol");
function LO(n, a, r) {
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
const UO = x.createContext({});
function kO(n) {
  return n && typeof n == "object" && Object.prototype.hasOwnProperty.call(n, "current");
}
function VO(n, a, r, s, o, c) {
  const { visualElement: h } = x.useContext(Ou), p = x.useContext(Xh), g = x.useContext(Au), m = x.useContext(Gh), b = m.reducedMotion, v = m.skipAnimations, S = x.useRef(null), w = x.useRef(!1);
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
  const T = S.current, j = x.useContext(UO);
  T && !T.projection && o && (T.type === "html" || T.type === "svg") && BO(S.current, r, o, j);
  const _ = x.useRef(!1);
  x.useInsertionEffect(() => {
    T && _.current && T.update(r, g);
  });
  const C = r[w1], L = x.useRef(!!C && typeof window < "u" && !window.MotionHandoffIsComplete?.(C) && window.MotionHasOptimisedAnimation?.(C));
  return zx(() => {
    w.current = !0, T && (_.current = !0, window.MotionIsMounted = !0, T.updateFeatures(), T.scheduleRenderMicrotask(), L.current && T.animationState && T.animationState.animateChanges());
  }), x.useEffect(() => {
    T && (!L.current && T.animationState && T.animationState.animateChanges(), L.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(C);
    }), L.current = !1), T.enteringChildren = void 0);
  }), T;
}
function BO(n, a, r, s) {
  const { layoutId: o, layout: c, drag: h, dragConstraints: p, layoutScroll: g, layoutRoot: m, layoutAnchor: b, layoutCrossfade: v } = a;
  n.projection = new r(n.latestValues, a["data-framer-portal-id"] ? void 0 : P1(n.parent)), n.projection.setOptions({
    layoutId: o,
    layout: c,
    alwaysMeasureLayout: !!h || p && kO(p),
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
function P1(n) {
  if (n)
    return n.options.allowProjection !== !1 ? n.projection : P1(n.parent);
}
function Rf(n, { forwardMotionProps: a = !1, type: r } = {}, s, o) {
  s && lh(s);
  const c = r ? r === "svg" : Qh(n), h = c ? zO : DO;
  function p(m, b) {
    let v;
    const S = {
      ...x.useContext(Gh),
      ...m,
      layoutId: HO(m)
    }, { isStatic: w } = S, T = EO(m), j = h(m, w);
    if (!w && typeof window < "u") {
      qO();
      const _ = $O(S);
      v = _.MeasureLayout, T.visualElement = VO(n, j, S, o, _.ProjectionNode, c);
    }
    return f.jsxs(Ou.Provider, { value: T, children: [v && T.visualElement ? f.jsx(v, { visualElement: T.visualElement, ...S }) : null, AO(n, m, LO(j, T.visualElement, b), j, w, a, c)] });
  }
  p.displayName = `motion.${typeof n == "string" ? n : `create(${n.displayName ?? n.name ?? ""})`}`;
  const g = x.forwardRef(p);
  return g[OO] = n, g;
}
function HO({ layoutId: n }) {
  const a = x.useContext(Dx).id;
  return a && n !== void 0 ? a + "-" + n : n;
}
function qO(n, a) {
  x.useContext(Xh).strict;
}
function $O(n) {
  const a = Y1(), { drag: r, layout: s } = a;
  if (!r && !s)
    return {};
  const o = { ...r, ...s };
  return {
    MeasureLayout: r?.isEnabled(n) || s?.isEnabled(n) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function IO(n, a) {
  if (typeof Proxy > "u")
    return Rf;
  const r = /* @__PURE__ */ new Map(), s = (c, h) => Rf(c, h, n, a), o = (c, h) => s(c, h);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (c, h) => h === "create" ? s : (r.has(h) || r.set(h, Rf(h, void 0, n, a)), r.get(h))
  });
}
const Z1 = /* @__PURE__ */ IO(), YO = (n, a) => a.isSVG ?? Qh(n) ? new nO(a) : new P5(a, {
  allowProjection: n !== x.Fragment
});
class FO extends tl {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = sO(a));
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
let GO = 0;
class XO extends tl {
  constructor() {
    super(...arguments), this.id = GO++, this.isExitComplete = !1;
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
          const p = Pi(this.node, c, h);
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
const KO = {
  animation: {
    Feature: FO
  },
  exit: {
    Feature: XO
  }
};
function J1(n) {
  return {
    point: {
      x: n.pageX,
      y: n.pageY
    }
  };
}
function ub(n, a, r) {
  const { props: s } = n;
  n.animationState && s.whileHover && n.animationState.setActive("whileHover", r === "Start");
  const o = "onHover" + r, c = s[o];
  c && Gn.postRender(() => c(a, J1(a)));
}
class QO extends tl {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = N5(a, (r, s) => (ub(this.node, s, "Start"), (o) => ub(this.node, o, "End"))));
  }
  unmount() {
  }
}
class PO extends tl {
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
    this.unmount = Ru(ab(this.node.current, "focus", () => this.onFocus()), ab(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function cb(n, a, r) {
  const { props: s } = n;
  if (n.current instanceof HTMLButtonElement && n.current.disabled)
    return;
  n.animationState && s.whileTap && n.animationState.setActive("whileTap", r === "Start");
  const o = "onTap" + (r === "End" ? "" : r), c = s[o];
  c && Gn.postRender(() => c(a, J1(a)));
}
class ZO extends tl {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: r, propagate: s } = this.node.props;
    this.unmount = D5(a, (o, c) => (cb(this.node, c, "Start"), (h, { success: p }) => cb(this.node, h, p ? "End" : "Cancel")), {
      useGlobalTarget: r,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const sh = /* @__PURE__ */ new WeakMap(), _f = /* @__PURE__ */ new WeakMap(), JO = (n) => {
  const a = sh.get(n.target);
  a && a(n);
}, WO = (n) => {
  n.forEach(JO);
};
function e4({ root: n, ...a }) {
  const r = n || document;
  _f.has(r) || _f.set(r, {});
  const s = _f.get(r), o = JSON.stringify(a);
  return s[o] || (s[o] = new IntersectionObserver(WO, { root: n, ...a })), s[o];
}
function t4(n, a, r) {
  const s = e4(a);
  return sh.set(n, r), s.observe(n), () => {
    sh.delete(n), s.unobserve(n);
  };
}
const n4 = {
  some: 0,
  all: 1
};
class a4 extends tl {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: r, margin: s, amount: o = "some", once: c } = a, h = {
      root: r ? r.current : void 0,
      rootMargin: s,
      threshold: typeof o == "number" ? o : n4[o]
    }, p = (g) => {
      const { isIntersecting: m } = g;
      if (this.isInView === m || (this.isInView = m, c && !m && this.hasEnteredView))
        return;
      m && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", m);
      const { onViewportEnter: b, onViewportLeave: v } = this.node.getProps(), S = m ? b : v;
      S && S(g);
    };
    this.stopObserver = t4(this.node.current, h, p);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: r } = this.node;
    ["amount", "margin", "root"].some(i4(a, r)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function i4({ viewport: n = {} }, { viewport: a = {} } = {}) {
  return (r) => n[r] !== a[r];
}
const r4 = {
  inView: {
    Feature: a4
  },
  tap: {
    Feature: ZO
  },
  focus: {
    Feature: PO
  },
  hover: {
    Feature: QO
  }
}, W1 = {
  renderer: YO,
  ...KO,
  ...r4
};
var l4 = "_1oor31e0", s4 = "_1oor31e1", o4 = "_1oor31e2", u4 = "_1oor31e3", c4 = "_1oor31e4", d4 = "_1oor31e5", f4 = "_1oor31e6", h4 = "_1oor31e7", m4 = "_1oor31e8";
const p4 = 8;
function g4(n) {
  const { entries: a, loading: r, error: s } = n;
  return /* @__PURE__ */ f.jsxs("div", { className: l4, "aria-busy": !!r, children: [
    s && /* @__PURE__ */ f.jsx(_n, { severity: "error", children: s }),
    r && !s && /* @__PURE__ */ f.jsx("div", { className: m4, "aria-live": "polite", children: "Loading edit history…" }),
    !r && !s && a.length === 0 && /* @__PURE__ */ f.jsx("div", { className: h4, children: "No edits yet" }),
    !r && !s && a.length > 0 && /* @__PURE__ */ f.jsx("ul", { className: s4, children: a.map((o) => /* @__PURE__ */ f.jsxs("li", { className: o4, children: [
      /* @__PURE__ */ f.jsx("span", { className: u4, children: y4(o.recorded_at) }),
      /* @__PURE__ */ f.jsx("span", { className: c4, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ f.jsx("span", { className: d4, title: o.digest_after, children: v4(o.digest_after) }),
      /* @__PURE__ */ f.jsx("span", { className: f4, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function v4(n) {
  return n ? `${n.slice(0, p4)}…` : "—";
}
function y4(n) {
  const a = new Date(n);
  return Number.isNaN(a.getTime()) ? n : a.toLocaleString();
}
var db = "_1c63kaw0", b4 = "_1c63kaw1", x4 = "_1c63kaw2", S4 = "_1c63kaw3", w4 = "_1c63kaw4", E4 = "_1c63kaw5", T4 = "_1c63kaw6", j4 = "_1c63kaw7";
function C4({ chain: n, onRemoveOp: a }) {
  return n.ops.length === 0 ? /* @__PURE__ */ f.jsx("div", { className: db, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ f.jsx("span", { className: b4, children: "No edits yet" }) }) : /* @__PURE__ */ f.jsx("ol", { className: db, "data-testid": "edit-chain-list", children: n.ops.map((r, s) => /* @__PURE__ */ f.jsxs("li", { className: x4, children: [
    /* @__PURE__ */ f.jsxs("span", { className: S4, "aria-hidden": "true", children: [
      s + 1,
      "."
    ] }),
    /* @__PURE__ */ f.jsxs("span", { className: w4, children: [
      /* @__PURE__ */ f.jsx("span", { className: E4, children: fb(r) }),
      /* @__PURE__ */ f.jsx("span", { className: T4, children: N4(r) })
    ] }),
    /* @__PURE__ */ f.jsx(
      "button",
      {
        type: "button",
        className: j4,
        onClick: () => a(r.id),
        "aria-label": `Remove ${fb(r)} (position ${s + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, r.id)) });
}
function fb(n) {
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
function N4(n) {
  switch (n.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${hb(n.start_ms)} → ${hb(n.end_ms)}`;
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
      return `${Df(n.low_db)} / ${Df(n.mid_db)} / ${Df(n.high_db)}`;
    case "pitch_shift":
      return `${n.semitones >= 0 ? "+" : ""}${n.semitones.toFixed(1)} st`;
    case "silence_strip":
      return `${n.threshold_db.toFixed(0)} dB`;
    default:
      return "—";
  }
}
function Df(n) {
  return `${n >= 0 ? "+" : ""}${n.toFixed(0)}`;
}
function hb(n) {
  return !Number.isFinite(n) || n < 0 ? "0.00s" : `${(n / 1e3).toFixed(2)}s`;
}
var eu = "_1o3ytop0", M4 = "_1o3ytop1", A4 = "_1o3ytop2", R4 = "_1o3ytop3", _4 = "_1o3ytop4", tu = "_1o3ytop5", D4 = "_1o3ytop6", z4 = "_1o3ytopc", O4 = "_1o3ytopd", L4 = "_1o3ytope", U4 = "_1o3ytopf", k4 = "_1o3ytopg", V4 = "_1o3ytoph";
const mb = -16;
function B4(n) {
  const {
    voiceAsset: a,
    deploymentId: r,
    affectedCharacterNames: s = [],
    onChainPersisted: o,
    onError: c
  } = n, h = a.durationMs ?? 0, p = x.useMemo(
    () => H4(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [g, m] = x.useState(() => zf(h)), [b, v] = x.useState(Mu), [S, w] = x.useState(!1), [T, j] = x.useState(null), [_, C] = x.useState(null), [L, z] = x.useState(!1), [R, J] = x.useState(!1), [G, W] = x.useState(!1), [A, O] = x.useState(null), [$, re] = x.useState([]), [ae, me] = x.useState(null), [ge, oe] = x.useState([]), [U, V] = x.useState(!1), [q, Q] = x.useState(null), [te, N] = x.useState(0), K = x.useRef(null), Z = x.useRef(null), le = x.useRef(null), ce = x.useRef(null), ve = x.useRef(null), ze = x.useRef(0), _e = x.useMemo(
    () => g.ops.some((ye) => ye.mode === "normalize"),
    [g.ops]
  );
  x.useEffect(() => {
    const ye = zf(h);
    m(ye), v(yx(ye)), j(null), W(!1), re([]), me(null), ve.current = null;
  }, [a.voiceAssetId, h]);
  const Be = x.useCallback((ye) => {
    v(ye), m((Oe) => vx(Oe, ye));
  }, []);
  x.useEffect(() => {
    ce.current?.abort();
    const ye = new AbortController();
    return ce.current = ye, V(!0), Q(null), lu(r, "voice_asset", a.voiceAssetId, 50, {
      signal: ye.signal
    }).then((Oe) => {
      ye.signal.aborted || oe(Oe.entries);
    }).catch((Oe) => {
      if (ye.signal.aborted) return;
      const Qe = Oe instanceof Error ? Oe.message : "audit fetch failed";
      Q(Qe);
    }).finally(() => {
      ye.signal.aborted || V(!1);
    }), () => ye.abort();
  }, [r, a.voiceAssetId, te]), x.useEffect(() => () => {
    _ && URL.revokeObjectURL(_);
  }, [_]), x.useEffect(() => () => {
    Z.current?.abort(), le.current?.abort(), ce.current?.abort();
  }, []);
  const kt = g.ops.find((ye) => ye.mode === "trim"), Ft = g.ops.find((ye) => ye.mode === "normalize"), fe = kt?.start_ms ?? 0, je = kt?.end_ms ?? Math.max(1, h), Ne = x.useCallback((ye, Oe) => {
    m(
      (Qe) => pb(
        Qe,
        "trim",
        (et) => ({
          ...et,
          mode: "trim",
          start_ms: Math.max(0, Math.floor(ye)),
          end_ms: Math.max(Math.floor(ye) + 1, Math.floor(Oe))
        })
      )
    );
  }, []), Me = x.useCallback(
    (ye) => Ne(ye, je),
    [je, Ne]
  ), Kt = x.useCallback(
    (ye) => Ne(fe, ye),
    [fe, Ne]
  ), at = x.useCallback((ye) => {
    m((Oe) => {
      const Qe = Oe.ops.filter((et) => et.mode !== "normalize");
      if (ye) {
        const et = {
          id: yn(),
          mode: "normalize",
          target_lufs: mb
        };
        return { ...Oe, ops: [...Qe, et] };
      }
      return { ...Oe, ops: Qe };
    });
  }, []), on = x.useCallback(
    (ye) => {
      const Oe = g.ops.findIndex((Ht) => Ht.id === ye);
      if (Oe === -1) return;
      const Qe = g.ops[Oe];
      if (!Qe) return;
      const et = [...g.ops.slice(0, Oe), ...g.ops.slice(Oe + 1)];
      m({ ...g, ops: et }), re((Ht) => [...Ht, { op: Qe, index: Oe }]);
    },
    [g]
  ), Qt = x.useCallback(() => {
    const ye = $[$.length - 1];
    if (!ye) return;
    const Oe = Math.min(ye.index, g.ops.length), Qe = [...g.ops.slice(0, Oe), ye.op, ...g.ops.slice(Oe)];
    m({ ...g, ops: Qe }), re($.slice(0, -1));
  }, [g, $]), bn = x.useCallback(() => {
    const ye = lx(g, h);
    return ye ? (j(ye.message), !1) : (j(null), !0);
  }, [g, h]), ma = x.useCallback(async () => {
    if (!bn() || L) return;
    Z.current?.abort();
    const ye = new AbortController();
    Z.current = ye;
    const Oe = ++ze.current;
    J(!0);
    try {
      const Qe = await PC(a.voiceAssetId, r, g, {
        signal: ye.signal
      });
      if (ye.signal.aborted || Oe !== ze.current) return;
      _ && URL.revokeObjectURL(_);
      const et = URL.createObjectURL(Qe);
      C(et), W(!0), requestAnimationFrame(() => K.current?.play().catch(() => {
      }));
    } catch (Qe) {
      if (ye.signal.aborted) return;
      const et = Qe instanceof Error ? Qe.message : "preview failed";
      j(et), c(et);
    } finally {
      ye.signal.aborted || J(!1);
    }
  }, [bn, L, a.voiceAssetId, r, g, _, c]), Vt = x.useCallback(async () => {
    if (!bn() || R || L) return;
    if (s.length > 1) {
      const Oe = s.join(", ");
      if (!window.confirm(
        `This voice asset is referenced by ${s.length} characters: ${Oe}.

Applying this edit chain will affect every line they speak in the next batch.

Continue?`
      )) return;
    }
    Z.current?.abort(), le.current?.abort();
    const ye = new AbortController();
    le.current = ye, z(!0);
    try {
      const Oe = ve.current ?? void 0, Qe = await rx(
        a.voiceAssetId,
        r,
        Oe ? { chain: g, digest_before: Oe } : { chain: g },
        { signal: ye.signal }
      );
      if (ye.signal.aborted) return;
      ve.current = Qe.chain_digest, me(Qe.chain_digest), j(null), O(Qe.measured_lufs ?? null), re([]), o(Qe), N((et) => et + 1);
    } catch (Oe) {
      if (ye.signal.aborted) return;
      const Qe = Oe instanceof Xr;
      Oe instanceof Xr && (ve.current = Oe.currentDigest || null);
      const et = Qe ? "Edit chain has changed in another tab. Reload to continue." : Oe instanceof Error ? Oe.message : "apply failed";
      j(et), c(et);
    } finally {
      ye.signal.aborted || z(!1);
    }
  }, [
    bn,
    R,
    L,
    s,
    a.voiceAssetId,
    r,
    g,
    o,
    c
  ]), Dn = x.useCallback(() => {
    Z.current?.abort(), m(zf(h)), j(null), O(null), W(!1), re([]), N((ye) => ye + 1), _ && (URL.revokeObjectURL(_), C(null));
  }, [h, _]), Bt = x.useCallback((ye) => {
    m(
      (Oe) => pb(
        Oe,
        "normalize",
        (Qe) => ({
          ...Qe,
          mode: "normalize",
          target_lufs: ye
        })
      )
    );
  }, []);
  return /* @__PURE__ */ f.jsxs(Ax, { variant: "standalone", children: [
    /* @__PURE__ */ f.jsx(
      Rx,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${nu(h)}`
      }
    ),
    /* @__PURE__ */ f.jsx(
      Nx,
      {
        audioUrl: p,
        durationMs: Math.max(1, h),
        startMs: fe,
        endMs: je,
        onChangeStart: Me,
        onChangeEnd: Kt
      }
    ),
    /* @__PURE__ */ f.jsxs("div", { className: eu, children: [
      /* @__PURE__ */ f.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ f.jsxs("span", { className: M4, children: [
        nu(fe),
        " → ",
        nu(je),
        " · ",
        nu(je - fe)
      ] })
    ] }),
    /* @__PURE__ */ f.jsxs("div", { className: _4, children: [
      /* @__PURE__ */ f.jsxs("div", { className: tu, children: [
        /* @__PURE__ */ f.jsxs("span", { className: eu, children: [
          /* @__PURE__ */ f.jsx("span", { children: "Normalize loudness" }),
          _e && Ft && /* @__PURE__ */ f.jsxs("span", { className: z4, children: [
            "target ",
            Ft.target_lufs.toFixed(1),
            " LUFS",
            A !== null && ` · measured ${A.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ f.jsxs("label", { className: D4, children: [
          /* @__PURE__ */ f.jsx(
            "input",
            {
              type: "checkbox",
              checked: _e,
              onChange: (ye) => at(ye.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ f.jsxs("span", { children: [
            "Target ",
            mb.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        _e && Ft && /* @__PURE__ */ f.jsx(
          "input",
          {
            type: "range",
            className: L4,
            min: -30,
            max: -6,
            step: 0.5,
            value: Ft.target_lufs,
            onChange: (ye) => Bt(Number(ye.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: tu, children: [
        /* @__PURE__ */ f.jsxs("span", { className: eu, children: [
          "Operations · ",
          g.ops.length
        ] }),
        /* @__PURE__ */ f.jsx(C4, { chain: g, onRemoveOp: on })
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: tu, children: [
        /* @__PURE__ */ f.jsxs(
          "button",
          {
            type: "button",
            className: A4,
            onClick: () => w((ye) => !ye),
            "aria-expanded": S,
            children: [
              S ? "▾" : "▸",
              " Advanced effects · gain · eq · pitch · fade · silence trim"
            ]
          }
        ),
        S && /* @__PURE__ */ f.jsx(
          Mh,
          {
            state: b,
            onChange: Be,
            supportsSynthSpeed: !1
          }
        )
      ] }),
      ae && /* @__PURE__ */ f.jsx("div", { className: tu, children: /* @__PURE__ */ f.jsxs("span", { className: eu, children: [
        /* @__PURE__ */ f.jsx("span", { children: "Chain digest" }),
        /* @__PURE__ */ f.jsxs("span", { className: R4, title: ae, children: [
          ae.slice(0, 12),
          "…"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ f.jsxs(_x, { children: [
      /* @__PURE__ */ f.jsx(
        ft,
        {
          variant: "secondary",
          onClick: () => void ma(),
          disabled: R || L,
          children: R ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ f.jsx(
        ft,
        {
          onClick: () => void Vt(),
          disabled: L || R,
          children: L ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ f.jsx(
        ft,
        {
          variant: "ghost",
          onClick: Dn,
          disabled: L || R,
          children: "Reset"
        }
      ),
      $.length > 0 && /* @__PURE__ */ f.jsxs(
        ft,
        {
          variant: "ghost",
          size: "sm",
          onClick: Qt,
          disabled: L || R,
          "data-testid": "undo-last-removal",
          "aria-label": "Undo last removal",
          children: [
            "Undo last removal (",
            $.length,
            ")"
          ]
        }
      ),
      G && /* @__PURE__ */ f.jsx(
        "span",
        {
          className: V4,
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
        ref: K,
        src: _,
        controls: !0,
        className: O4,
        "aria-label": "Edit preview"
      }
    ),
    T && /* @__PURE__ */ f.jsx(_n, { severity: "error", children: T }),
    /* @__PURE__ */ f.jsxs("details", { className: U4, children: [
      /* @__PURE__ */ f.jsxs("summary", { className: k4, children: [
        "Edit history",
        ge.length > 0 ? ` · ${ge.length}` : ""
      ] }),
      /* @__PURE__ */ f.jsx(
        g4,
        {
          entries: ge,
          loading: U,
          error: q
        }
      )
    ] })
  ] });
}
function zf(n) {
  return n <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: yn(),
    mode: "trim",
    start_ms: 0,
    end_ms: n
  }] };
}
function pb(n, a, r) {
  const s = n.ops.findIndex((c) => c.mode === a);
  if (s === -1) {
    const c = { id: yn(), mode: a };
    return { ...n, ops: [...n.ops, r(c)] };
  }
  const o = [...n.ops];
  return o[s] = r(o[s]), { ...n, ops: o };
}
function nu(n) {
  return !Number.isFinite(n) || n < 0 ? "0.0s" : n < 1e3 ? `${Math.round(n)} ms` : `${(Math.round(n / 100) / 10).toFixed(1)}s`;
}
function H4(n) {
  return n.startsWith("http://") || n.startsWith("https://") || n.startsWith("/") ? n : `/api/v1/artifacts/${encodeURIComponent(n)}`;
}
var q4 = "go9vi12", $4 = "go9vi13", I4 = "go9vi14", Y4 = "go9vi15", F4 = "go9vi16", G4 = "go9vi17", X4 = "go9vi18", K4 = "go9vi19", Q4 = "go9vi1a go9vi19", P4 = "go9vi1b", Z4 = "go9vi1c", J4 = "go9vi1d", W4 = "go9vi1e", e6 = "go9vi1f", t6 = "go9vi1g", n6 = "go9vi1h", a6 = "go9vi1i", Yi = "go9vi1j", Jl = "go9vi1k", Yr = "go9vi1l", i6 = "go9vi1m go9vi1l", r6 = "go9vi1n", l6 = "go9vi1o go9vi1n", s6 = "go9vi1p go9vi1n", o6 = "go9vi1q", u6 = "go9vi1r", c6 = "go9vi1s", d6 = "go9vi1t", eS = "go9vi1u", f6 = "go9vi1v", h6 = "go9vi1w", m6 = "go9vi1x go9vi1l", p6 = "go9vi1y", g6 = "go9vi1z", v6 = "go9vi110", y6 = "go9vi111", b6 = "go9vi112", x6 = "go9vi113";
const S6 = ["none", "audio_ref", "vector_preset", "qwen_template"];
function w6() {
  const { deployment: n, mappings: a, voiceAssets: r } = ws(), [s, o] = x.useState(a), [c, h] = x.useState(r), [p, g] = x.useState(
    a[0]?.mappingId ?? null
  ), [m, b] = x.useState(""), [v, S] = x.useState(null), [w, T] = x.useState(null), [j, _] = x.useState(null), C = x.useMemo(() => {
    const V = /* @__PURE__ */ new Map();
    for (const q of c) V.set(q.voiceAssetId, q);
    return V;
  }, [c]), L = x.useMemo(() => {
    const V = m.trim().toLowerCase();
    return V ? s.filter((q) => q.characterName.toLowerCase().includes(V)) : s;
  }, [s, m]), z = x.useMemo(
    () => s.find((V) => V.mappingId === p) ?? null,
    [s, p]
  );
  x.useEffect(() => {
    o(a), h(r), g(a[0]?.mappingId ?? null);
  }, [a, r]), x.useEffect(() => {
    if (!w) return;
    const V = setTimeout(() => T(null), 2600);
    return () => clearTimeout(V);
  }, [w]);
  const R = x.useCallback(async () => {
    const V = await cs(n.deploymentId);
    h(V.voiceAssets);
  }, [n.deploymentId]), J = x.useCallback(
    (V) => {
      o(
        (q) => q.map((Q) => Q.mappingId === p ? { ...Q, ...V } : Q)
      );
    },
    [p]
  ), G = x.useCallback(
    async (V) => {
      if (!z) return;
      const q = z;
      try {
        const Q = await rs(n.deploymentId, z.mappingId, V);
        o((te) => te.map((N) => N.mappingId === Q.mappingId ? Q : N));
      } catch (Q) {
        o(
          (te) => te.map((N) => N.mappingId === q.mappingId ? q : N)
        ), S(di(Q));
      }
    },
    [z, n.deploymentId]
  ), W = x.useCallback(async () => {
    const V = c[0];
    if (!V) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const q = M6(s), Q = await Th(n.deploymentId, {
        characterName: q,
        speakerVoiceAssetId: V.voiceAssetId,
        defaultEmotionMode: "none"
      });
      o((te) => [...te, Q]), g(Q.mappingId);
    } catch (q) {
      S(di(q));
    }
  }, [n.deploymentId, c, s]), A = x.useCallback(() => {
    z && _({ id: z.mappingId, name: z.characterName });
  }, [z]), O = x.useCallback(async () => {
    if (!j) return;
    const { id: V, name: q } = j;
    _(null);
    try {
      await nx(n.deploymentId, V), o((Q) => Q.filter((te) => te.mappingId !== V)), g(null), T(`Mapping for ${q} deactivated.`);
    } catch (Q) {
      S(di(Q));
    }
  }, [n.deploymentId, j]), $ = x.useCallback(
    async (V, q, Q) => {
      try {
        const te = await ix(n.deploymentId, V, q, Q);
        return h((N) => [te, ...N]), T(`${te.displayName} uploaded.`), te;
      } catch (te) {
        return S(di(te)), null;
      }
    },
    [n.deploymentId]
  ), re = x.useCallback(async () => {
    try {
      const V = await qj(n.deploymentId);
      O6(V, `${n.deploymentId}-mappings.json`), T("Mappings exported to JSON.");
    } catch (V) {
      S(di(V));
    }
  }, [n.deploymentId]), ae = x.useCallback(
    async (V, q) => {
      try {
        const Q = await $j(
          n.deploymentId,
          V.mappings,
          q
        );
        T(
          `Imported ${Q.created.length} • skipped ${Q.skipped.length} • replaced ${Q.replaced.length}.`
        );
        const te = await cs(n.deploymentId);
        h(te.voiceAssets);
      } catch (Q) {
        S(di(Q));
      }
    },
    [n.deploymentId]
  ), me = x.useCallback(
    async (V) => {
      if (await R(), z && V.chain_digest)
        try {
          const q = await rs(n.deploymentId, z.mappingId, {
            voiceAssetChainDigest: V.chain_digest
          });
          o(
            (Q) => Q.map((te) => te.mappingId === q.mappingId ? q : te)
          );
        } catch (q) {
          S(di(q));
        }
      T("Edit applied.");
    },
    [R, z, n.deploymentId]
  ), ge = x.useCallback((V) => {
    S(V);
  }, []), oe = x.useCallback(
    async (V, q) => {
      if (!z) return null;
      const Q = V.trim() || `[${z.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await Gj(n.deploymentId, {
          line: Q,
          outputFormat: q
        })).runId };
      } catch (te) {
        return S(di(te)), null;
      }
    },
    [n.deploymentId, z]
  ), U = c.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ f.jsxs("div", { className: q4, children: [
    /* @__PURE__ */ f.jsxs("aside", { className: $4, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ f.jsxs("header", { className: I4, children: [
        /* @__PURE__ */ f.jsxs("div", { children: [
          /* @__PURE__ */ f.jsx("h1", { id: "mapping-sidebar-heading", className: Y4, children: "Cast" }),
          /* @__PURE__ */ f.jsxs("span", { className: F4, children: [
            s.length,
            " active · ",
            c.length,
            " ",
            U
          ] })
        ] }),
        /* @__PURE__ */ f.jsx(ft, { variant: "primary", size: "sm", onClick: W, children: "+ Add" })
      ] }),
      /* @__PURE__ */ f.jsx(
        "input",
        {
          type: "search",
          className: G4,
          placeholder: "Search characters",
          value: m,
          onChange: (V) => b(V.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ f.jsx(N6, { onExport: re, onImport: ae, onParseError: S }),
      /* @__PURE__ */ f.jsx("div", { className: X4, children: L.length === 0 ? /* @__PURE__ */ f.jsx(
        Es,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : L.map((V) => {
        const q = C.get(V.speakerVoiceAssetId), Q = V.mappingId === p;
        return /* @__PURE__ */ f.jsxs(
          "button",
          {
            type: "button",
            className: Q ? Q4 : K4,
            onClick: () => g(V.mappingId),
            "aria-pressed": Q,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ f.jsx("span", { className: P4, "aria-hidden": "true", children: A6(V.characterName) }),
              /* @__PURE__ */ f.jsxs("span", { className: Z4, children: [
                /* @__PURE__ */ f.jsx("span", { className: J4, children: V.characterName }),
                /* @__PURE__ */ f.jsxs("span", { className: W4, children: [
                  V.defaultEmotionMode,
                  " · ",
                  q?.displayName ?? "no voice"
                ] })
              ] })
            ]
          },
          V.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ f.jsxs("section", { className: e6, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ f.jsx(F1, { features: W1, children: /* @__PURE__ */ f.jsx(vO, { children: w && /* @__PURE__ */ f.jsx(
        Z1.div,
        {
          className: f6,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: w
        },
        w
      ) }) }),
      v && /* @__PURE__ */ f.jsx(_n, { severity: "error", children: v }),
      j && /* @__PURE__ */ f.jsxs(_n, { severity: "warning", children: [
        /* @__PURE__ */ f.jsxs("span", { style: { flex: 1 }, children: [
          "Deactivate mapping for ",
          j.name,
          "?"
        ] }),
        /* @__PURE__ */ f.jsx(ft, { variant: "danger", size: "sm", onClick: () => void O(), children: "Delete" }),
        /* @__PURE__ */ f.jsx(ft, { variant: "ghost", size: "sm", onClick: () => _(null), children: "Cancel" })
      ] }),
      z ? /* @__PURE__ */ f.jsx(
        T6,
        {
          deploymentId: n.deploymentId,
          mapping: z,
          voiceAssets: c,
          allMappings: s,
          onNameChange: (V) => {
            J({ characterName: V });
          },
          onNameBlur: (V) => {
            V !== z.characterName && V.trim() && G({ characterName: V.trim() });
          },
          onSpeakerChange: (V) => {
            J({ speakerVoiceAssetId: V }), G({ speakerVoiceAssetId: V });
          },
          onModeChange: (V) => {
            J({ defaultEmotionMode: V }), G({ defaultEmotionMode: V });
          },
          onQwenChange: (V) => {
            J({ defaultQwenTemplate: V });
          },
          onQwenBlur: (V) => {
            G({ defaultQwenTemplate: V });
          },
          onSpeedChange: (V) => {
            J({ defaultSpeedFactor: V });
          },
          onSpeedCommit: (V) => {
            G({ defaultSpeedFactor: V });
          },
          onEmotionVoiceChange: (V) => {
            const q = V || null;
            J({ defaultEmotionVoiceAssetId: q }), G({ defaultEmotionVoiceAssetId: q });
          },
          onDelete: A,
          onUploadVoice: async (V, q, Q) => {
            const te = await $(V, q, Q);
            return te && Q === "speaker" && (J({ speakerVoiceAssetId: te.voiceAssetId }), G({ speakerVoiceAssetId: te.voiceAssetId })), await R(), te;
          },
          onTestLine: oe,
          onEditChainPersisted: me,
          onEditError: ge
        },
        z.mappingId
      ) : /* @__PURE__ */ f.jsx(
        E6,
        {
          voiceCount: c.length,
          onUploadVoice: async (V) => {
            await $(V, V.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function E6({ voiceCount: n, onUploadVoice: a }) {
  return n === 0 ? /* @__PURE__ */ f.jsxs(La, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ f.jsxs("div", { className: v6, children: [
      /* @__PURE__ */ f.jsx("p", { className: Ki, children: "01 / Onboarding" }),
      /* @__PURE__ */ f.jsx("h2", { id: "onboarding-heading", className: y6, children: "Upload your first voice" }),
      /* @__PURE__ */ f.jsxs("p", { className: b6, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ f.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ f.jsx(
      tS,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (r) => (await a(r), null)
      }
    )
  ] }) : /* @__PURE__ */ f.jsx(La, { density: "airy", children: /* @__PURE__ */ f.jsx(
    Es,
    {
      title: "No character selected.",
      hint: "Pick one on the left or + Add"
    }
  ) });
}
function T6(n) {
  const { mapping: a, voiceAssets: r, allMappings: s } = n, o = r.find((C) => C.voiceAssetId === a.speakerVoiceAssetId) ?? null, c = x.useMemo(
    () => s.filter(
      (C) => C.isActive && C.speakerVoiceAssetId === a.speakerVoiceAssetId
    ).map((C) => C.characterName),
    [s, a.speakerVoiceAssetId]
  ), h = r.find((C) => C.voiceAssetId === a.defaultEmotionVoiceAssetId) ?? null, [p, g] = x.useState(""), [m, b] = x.useState("mp3"), [v, S] = x.useState("idle"), [w, T] = x.useState(null), j = x.useRef(!1);
  x.useEffect(() => (j.current = !1, () => {
    j.current = !0;
  }), []);
  const _ = x.useCallback(async () => {
    j.current = !1, S("running"), T(null);
    const C = await n.onTestLine(p, m);
    if (j.current) return;
    if (!C) {
      S("error"), T("Failed to enqueue test-line run.");
      return;
    }
    const { runId: L } = C;
    for (let z = 0; z < 60; z += 1) {
      if (await new Promise((R) => setTimeout(R, 500)), j.current) return;
      try {
        const R = await jh(n.deploymentId, L);
        if (j.current) return;
        if (R.status === "completed") {
          S("done");
          return;
        }
        if (R.status === "failed" || R.status === "cancelled") {
          S("error"), T(`Run ${R.status}.`);
          return;
        }
      } catch (R) {
        if (j.current) return;
        S("error"), T(R instanceof Error ? R.message : "unknown error");
        return;
      }
    }
    j.current || (S("error"), T("test-line timed out after 30s"));
  }, [n.onTestLine, n.deploymentId, p, m]);
  return /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
    /* @__PURE__ */ f.jsxs("header", { className: t6, children: [
      /* @__PURE__ */ f.jsxs("div", { children: [
        /* @__PURE__ */ f.jsx("p", { className: Ki, children: "Character" }),
        /* @__PURE__ */ f.jsx("h2", { className: n6, children: a.characterName })
      ] }),
      /* @__PURE__ */ f.jsx("div", { className: eS, children: /* @__PURE__ */ f.jsx(ft, { variant: "danger", size: "sm", onClick: n.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ f.jsxs(
      La,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: h6,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ f.jsx(
            "input",
            {
              type: "text",
              className: m6,
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
              className: Yr,
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
            ft,
            {
              variant: "primary",
              size: "sm",
              onClick: () => void _(),
              disabled: v === "running",
              children: v === "running" ? "Synthesising…" : "Test this line"
            }
          ),
          v === "done" && /* @__PURE__ */ f.jsx(vi, { tone: "success", children: "Synthesised — see host logs for output path." }),
          v === "error" && w && /* @__PURE__ */ f.jsx(vi, { tone: "danger", children: w })
        ]
      }
    ),
    /* @__PURE__ */ f.jsxs("div", { className: a6, children: [
      /* @__PURE__ */ f.jsxs(La, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ f.jsx("h3", { id: "identity-heading", className: Ki, children: "01 / Identity & Performance" }),
        /* @__PURE__ */ f.jsxs("label", { className: Jl, children: [
          /* @__PURE__ */ f.jsx("span", { className: Yi, children: "Character name" }),
          /* @__PURE__ */ f.jsx(
            "input",
            {
              className: Yr,
              value: a.characterName,
              onChange: (C) => n.onNameChange(C.currentTarget.value),
              onBlur: (C) => n.onNameBlur(C.currentTarget.value)
            }
          )
        ] }),
        /* @__PURE__ */ f.jsxs("label", { className: Jl, children: [
          /* @__PURE__ */ f.jsx("span", { className: Yi, children: "Emotion mode" }),
          /* @__PURE__ */ f.jsx(
            "select",
            {
              className: Yr,
              value: a.defaultEmotionMode,
              onChange: (C) => n.onModeChange(C.currentTarget.value),
              children: S6.map((C) => /* @__PURE__ */ f.jsx("option", { value: C, children: R6(C) }, C))
            }
          )
        ] }),
        a.defaultEmotionMode === "qwen_template" && /* @__PURE__ */ f.jsxs("label", { className: Jl, children: [
          /* @__PURE__ */ f.jsxs("span", { className: Yi, children: [
            "Qwen template (use ",
            "{seg}",
            " for the line text)"
          ] }),
          /* @__PURE__ */ f.jsx(
            "textarea",
            {
              className: i6,
              value: a.defaultQwenTemplate ?? "",
              onChange: (C) => n.onQwenChange(C.currentTarget.value),
              onBlur: (C) => n.onQwenBlur(C.currentTarget.value)
            }
          )
        ] }),
        a.defaultEmotionMode === "audio_ref" && /* @__PURE__ */ f.jsxs("label", { className: Jl, children: [
          /* @__PURE__ */ f.jsx("span", { className: Yi, children: "Emotion reference" }),
          /* @__PURE__ */ f.jsxs(
            "select",
            {
              className: Yr,
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
        /* @__PURE__ */ f.jsxs("label", { className: Jl, children: [
          /* @__PURE__ */ f.jsxs("span", { className: Yi, children: [
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
      /* @__PURE__ */ f.jsxs(La, { density: "comfortable", "aria-labelledby": "voice-heading", children: [
        /* @__PURE__ */ f.jsx("h3", { id: "voice-heading", className: Ki, children: "02 / Voice Reference" }),
        /* @__PURE__ */ f.jsx("span", { className: Yi, children: "Speaker reference" }),
        /* @__PURE__ */ f.jsx(
          j6,
          {
            value: a.speakerVoiceAssetId,
            voices: r,
            onChange: n.onSpeakerChange
          }
        ),
        o && /* @__PURE__ */ f.jsx(gb, { voice: o }),
        /* @__PURE__ */ f.jsx(
          tS,
          {
            label: o ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (C) => n.onUploadVoice(C, C.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ f.jsx(
          B4,
          {
            voiceAsset: o,
            deploymentId: n.deploymentId,
            affectedCharacterNames: c,
            onChainPersisted: n.onEditChainPersisted,
            onError: n.onEditError
          }
        ),
        h && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
          /* @__PURE__ */ f.jsx("span", { className: Yi, children: "Emotion reference voice" }),
          /* @__PURE__ */ f.jsx(gb, { voice: h })
        ] })
      ] })
    ] })
  ] });
}
function j6({
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
function gb({ voice: n }) {
  const a = _6(n.durationMs ?? null);
  return /* @__PURE__ */ f.jsxs("div", { children: [
    /* @__PURE__ */ f.jsxs("div", { className: o6, children: [
      /* @__PURE__ */ f.jsx("span", { children: n.displayName }),
      /* @__PURE__ */ f.jsx("span", { children: n.kind }),
      n.durationMs != null && /* @__PURE__ */ f.jsx("span", { children: D6(n.durationMs) }),
      n.sampleRate && /* @__PURE__ */ f.jsxs("span", { children: [
        n.sampleRate,
        " Hz"
      ] })
    ] }),
    n.durationMs != null && /* @__PURE__ */ f.jsxs("div", { className: u6, children: [
      /* @__PURE__ */ f.jsx("div", { className: c6, children: /* @__PURE__ */ f.jsx(F1, { features: W1, children: /* @__PURE__ */ f.jsx(
        Z1.div,
        {
          className: d6,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, n.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ f.jsx(vi, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ f.jsx(C6, { seed: n.contentSha256 })
  ] });
}
function C6({ seed: n }) {
  const a = x.useMemo(() => z6(n, 48), [n]);
  return /* @__PURE__ */ f.jsx("div", { className: p6, "aria-hidden": "true", children: a.map((r, s) => /* @__PURE__ */ f.jsx(
    "span",
    {
      className: g6,
      style: { height: `${Math.max(6, r * 100)}%` }
    },
    `${n}-${s}`
  )) });
}
function tS({
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
      className: o ? s6 : r ? l6 : r6,
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
function N6({
  onExport: n,
  onImport: a,
  onParseError: r
}) {
  const [s, o] = x.useState("error"), c = x.useRef(null);
  return /* @__PURE__ */ f.jsxs("div", { className: eS, children: [
    /* @__PURE__ */ f.jsx(ft, { variant: "secondary", size: "sm", onClick: n, children: "Export JSON" }),
    /* @__PURE__ */ f.jsx(
      "input",
      {
        ref: c,
        type: "file",
        accept: "application/json,.json",
        className: x6,
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
    /* @__PURE__ */ f.jsx(ft, { variant: "secondary", size: "sm", onClick: () => c.current?.click(), children: "Import JSON" }),
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
function M6(n) {
  const a = new Set(n.map((s) => s.characterName.toLowerCase()));
  let r = 1;
  for (; a.has(`character ${r}`); ) r += 1;
  return `Character ${r}`;
}
function A6(n) {
  const a = n.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function R6(n) {
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
function _6(n) {
  return n == null ? null : n < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : n > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : n > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function D6(n) {
  return n < 1e3 ? `${n} ms` : `${Math.round(n / 100) / 10}s`;
}
function z6(n, a) {
  const r = [];
  for (let s = 0; s < a; s += 1) {
    const o = n.charCodeAt(s % n.length);
    r.push((o * 31 + s * 7) % 100 / 100);
  }
  return r;
}
function O6(n, a) {
  const r = new Blob([JSON.stringify(n, null, 2)], { type: "application/json" }), s = URL.createObjectURL(r), o = document.createElement("a");
  o.href = s, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(s);
}
function di(n) {
  return n instanceof Pr || n instanceof Error ? n.message : "unknown error";
}
function L6() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: n } = await Bj();
        return { deployments: n };
      },
      Component: vC
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: n }) => {
        const a = Vr(n, "deploymentId");
        return XE(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: n }) => {
        const a = Vr(n, "deploymentId"), [r, { mappings: s }, { runs: o }, c] = await Promise.all([
          vy(a),
          yy(a),
          Ij(a, { limit: 10 }),
          Xj(a)
        ]);
        return { deployment: r, mappings: s, runs: o, workflow: c };
      },
      Component: p_
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: n }) => {
        const a = Vr(n, "deploymentId"), r = Vr(n, "runId");
        return { run: await jh(a, r) };
      },
      Component: R3
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: n }) => {
        const a = Vr(n, "deploymentId"), [r, { mappings: s }, { voiceAssets: o }] = await Promise.all([
          vy(a),
          yy(a),
          cs(a)
        ]);
        return { deployment: r, mappings: s, voiceAssets: o };
      },
      Component: w6
    },
    {
      path: "/:deploymentId/mappings/new",
      loader: ({ params: n, request: a }) => {
        const r = Vr(n, "deploymentId"), s = new URL(a.url);
        return {
          deploymentId: r,
          prefillCharacterName: s.searchParams.get("character") ?? ""
        };
      },
      Component: uD
    },
    {
      path: "/runtime/queue",
      Component: rD
    }
  ];
}
function Vr(n, a) {
  const r = n[a];
  if (!r)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return r;
}
const vb = "ext-actions-request", U6 = "ext-actions-declare", k6 = "ext-action-state", yb = "ext-action-invoke", oh = "emotion-tts:navigate", Hr = "emotion-tts.run", bb = "emotion-tts.mappings", V6 = 4e3;
function B6(n, a) {
  let r = null, s = !1;
  const o = () => {
    const T = r?.badge ?? "not_installed";
    return H6(T, s);
  }, c = () => ({
    primary: o(),
    secondary: {
      id: bb,
      label: "Mappings",
      icon: "tune",
      tone: "secondary",
      tooltip: "Manage character → voice mappings"
    }
  }), h = () => {
    n.dispatchEvent(
      new CustomEvent(U6, {
        detail: { actions: c() },
        bubbles: !1
      })
    );
  }, p = () => {
    n.dispatchEvent(
      new CustomEvent(k6, {
        detail: { action: o() },
        bubbles: !1
      })
    );
  }, g = () => h(), m = (T) => {
    const j = T.detail?.id;
    j === Hr ? b() : j === bb && n.dispatchEvent(
      new CustomEvent(oh, {
        detail: { path: `/${a}/mappings` },
        bubbles: !1
      })
    );
  }, b = async () => {
    const T = r?.badge ?? "not_installed", j = T === "ready" || T === "running" || T === "starting";
    s = !0, p();
    try {
      j ? await VN() : await kN();
      try {
        r = await Bf();
      } catch {
      }
    } catch {
    } finally {
      s = !1, p();
    }
  };
  n.addEventListener(vb, g), n.addEventListener(yb, m);
  let v = !1;
  const S = async () => {
    try {
      const T = await Bf();
      if (v) return;
      r = T, p();
    } catch {
    }
  };
  S();
  const w = window.setInterval(() => void S(), V6);
  return h(), {
    dispose: () => {
      v = !0, window.clearInterval(w), n.removeEventListener(vb, g), n.removeEventListener(yb, m);
    }
  };
}
function H6(n, a) {
  const r = n === "ready" || n === "running" || n === "starting", s = n === "stopped" || n === "not_installed" || n === "failed";
  return a ? {
    id: Hr,
    label: r ? "Stopping…" : "Starting…",
    icon: r ? "stop" : "play_arrow",
    tone: "primary",
    state: "loading"
  } : n === "starting" || n === "installing" || n === "stopping" ? {
    id: Hr,
    label: fx(n),
    icon: "hourglass_top",
    tone: "primary",
    state: "loading"
  } : r ? {
    id: Hr,
    label: "Stop runtime",
    icon: "stop",
    tone: "primary",
    state: "idle",
    tooltip: "Stop the EmotionTTS worker"
  } : s ? {
    id: Hr,
    label: n === "not_installed" ? "Install / Start runtime" : "Start runtime",
    icon: "play_arrow",
    tone: "primary",
    state: "idle",
    tooltip: "Start the EmotionTTS worker for this deployment"
  } : {
    id: Hr,
    label: "Start runtime",
    icon: "play_arrow",
    tone: "primary",
    state: "idle"
  };
}
const uh = "emotion-tts-app", q6 = "ext-event", xb = "emotion-tts-stylesheet", Sb = ["accent", "density", "card"];
function $6(n) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[n];
}
function I6() {
  if (typeof document > "u" || document.getElementById(xb)) return;
  const n = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = xb, a.rel = "stylesheet", a.href = n, document.head.appendChild(a);
}
I6();
class Y6 extends HTMLElement {
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
    this.root = yE.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(oh, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = B6(this, a), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (r) => {
      const s = r.detail?.path;
      s && this.router && this.router.navigate(s);
    };
    this.navigateListener = a, this.addEventListener(oh, a);
  }
  syncTweaksFromBody() {
    for (const a of Sb) {
      const r = $6(a);
      r === void 0 ? delete this.dataset[a] : this.dataset[a] !== r && (this.dataset[a] = r);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: Sb.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), r = ej(L6(), { initialEntries: [a] });
    this.router = r, this.root.render(
      /* @__PURE__ */ f.jsx(x.StrictMode, { children: /* @__PURE__ */ f.jsx(nj, { router: r }) })
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
      new CustomEvent(q6, {
        detail: { topic: a, payload: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function F6() {
  typeof customElements > "u" || customElements.get(uh) || customElements.define(uh, Y6);
}
typeof customElements < "u" && !customElements.get(uh) && F6();
export {
  F6 as register
};
//# sourceMappingURL=emotion-tts.js.map
