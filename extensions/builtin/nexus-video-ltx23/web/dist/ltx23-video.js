function cy(f) {
  return f && f.__esModule && Object.prototype.hasOwnProperty.call(f, "default") ? f.default : f;
}
var Yf = { exports: {} }, $u = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ov;
function fy() {
  if (ov) return $u;
  ov = 1;
  var f = Symbol.for("react.transitional.element"), E = Symbol.for("react.fragment");
  function p(d, q, B) {
    var C = null;
    if (B !== void 0 && (C = "" + B), q.key !== void 0 && (C = "" + q.key), "key" in q) {
      B = {};
      for (var X in q)
        X !== "key" && (B[X] = q[X]);
    } else B = q;
    return q = B.ref, {
      $$typeof: f,
      type: d,
      key: C,
      ref: q !== void 0 ? q : null,
      props: B
    };
  }
  return $u.Fragment = E, $u.jsx = p, $u.jsxs = p, $u;
}
var dv;
function sy() {
  return dv || (dv = 1, Yf.exports = fy()), Yf.exports;
}
var O = sy(), Gf = { exports: {} }, J = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rv;
function oy() {
  if (rv) return J;
  rv = 1;
  var f = Symbol.for("react.transitional.element"), E = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), d = Symbol.for("react.strict_mode"), q = Symbol.for("react.profiler"), B = Symbol.for("react.consumer"), C = Symbol.for("react.context"), X = Symbol.for("react.forward_ref"), M = Symbol.for("react.suspense"), _ = Symbol.for("react.memo"), Y = Symbol.for("react.lazy"), D = Symbol.for("react.activity"), x = Symbol.iterator;
  function $(r) {
    return r === null || typeof r != "object" ? null : (r = x && r[x] || r["@@iterator"], typeof r == "function" ? r : null);
  }
  var il = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, k = Object.assign, ml = {};
  function Hl(r, z, N) {
    this.props = r, this.context = z, this.refs = ml, this.updater = N || il;
  }
  Hl.prototype.isReactComponent = {}, Hl.prototype.setState = function(r, z) {
    if (typeof r != "object" && typeof r != "function" && r != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, r, z, "setState");
  }, Hl.prototype.forceUpdate = function(r) {
    this.updater.enqueueForceUpdate(this, r, "forceUpdate");
  };
  function V() {
  }
  V.prototype = Hl.prototype;
  function Ul(r, z, N) {
    this.props = r, this.context = z, this.refs = ml, this.updater = N || il;
  }
  var I = Ul.prototype = new V();
  I.constructor = Ul, k(I, Hl.prototype), I.isPureReactComponent = !0;
  var gl = Array.isArray;
  function zl() {
  }
  var L = { H: null, A: null, T: null, S: null }, ql = Object.prototype.hasOwnProperty;
  function fl(r, z, N) {
    var U = N.ref;
    return {
      $$typeof: f,
      type: r,
      key: z,
      ref: U !== void 0 ? U : null,
      props: N
    };
  }
  function gt(r, z) {
    return fl(r.type, z, r.props);
  }
  function Bl(r) {
    return typeof r == "object" && r !== null && r.$$typeof === f;
  }
  function Yl(r) {
    var z = { "=": "=0", ":": "=2" };
    return "$" + r.replace(/[=:]/g, function(N) {
      return z[N];
    });
  }
  var nt = /\/+/g;
  function Gl(r, z) {
    return typeof r == "object" && r !== null && r.key != null ? Yl("" + r.key) : z.toString(36);
  }
  function $l(r) {
    switch (r.status) {
      case "fulfilled":
        return r.value;
      case "rejected":
        throw r.reason;
      default:
        switch (typeof r.status == "string" ? r.then(zl, zl) : (r.status = "pending", r.then(
          function(z) {
            r.status === "pending" && (r.status = "fulfilled", r.value = z);
          },
          function(z) {
            r.status === "pending" && (r.status = "rejected", r.reason = z);
          }
        )), r.status) {
          case "fulfilled":
            return r.value;
          case "rejected":
            throw r.reason;
        }
    }
    throw r;
  }
  function S(r, z, N, U, K) {
    var w = typeof r;
    (w === "undefined" || w === "boolean") && (r = null);
    var P = !1;
    if (r === null) P = !0;
    else
      switch (w) {
        case "bigint":
        case "string":
        case "number":
          P = !0;
          break;
        case "object":
          switch (r.$$typeof) {
            case f:
            case E:
              P = !0;
              break;
            case Y:
              return P = r._init, S(
                P(r._payload),
                z,
                N,
                U,
                K
              );
          }
      }
    if (P)
      return K = K(r), P = U === "" ? "." + Gl(r, 0) : U, gl(K) ? (N = "", P != null && (N = P.replace(nt, "$&/") + "/"), S(K, z, N, "", function(me) {
        return me;
      })) : K != null && (Bl(K) && (K = gt(
        K,
        N + (K.key == null || r && r.key === K.key ? "" : ("" + K.key).replace(
          nt,
          "$&/"
        ) + "/") + P
      )), z.push(K)), 1;
    P = 0;
    var Xl = U === "" ? "." : U + ":";
    if (gl(r))
      for (var jl = 0; jl < r.length; jl++)
        U = r[jl], w = Xl + Gl(U, jl), P += S(
          U,
          z,
          N,
          w,
          K
        );
    else if (jl = $(r), typeof jl == "function")
      for (r = jl.call(r), jl = 0; !(U = r.next()).done; )
        U = U.value, w = Xl + Gl(U, jl++), P += S(
          U,
          z,
          N,
          w,
          K
        );
    else if (w === "object") {
      if (typeof r.then == "function")
        return S(
          $l(r),
          z,
          N,
          U,
          K
        );
      throw z = String(r), Error(
        "Objects are not valid as a React child (found: " + (z === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : z) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return P;
  }
  function R(r, z, N) {
    if (r == null) return r;
    var U = [], K = 0;
    return S(r, U, "", "", function(w) {
      return z.call(N, w, K++);
    }), U;
  }
  function Q(r) {
    if (r._status === -1) {
      var z = r._result;
      z = z(), z.then(
        function(N) {
          (r._status === 0 || r._status === -1) && (r._status = 1, r._result = N);
        },
        function(N) {
          (r._status === 0 || r._status === -1) && (r._status = 2, r._result = N);
        }
      ), r._status === -1 && (r._status = 0, r._result = z);
    }
    if (r._status === 1) return r._result.default;
    throw r._result;
  }
  var dl = typeof reportError == "function" ? reportError : function(r) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var z = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof r == "object" && r !== null && typeof r.message == "string" ? String(r.message) : String(r),
        error: r
      });
      if (!window.dispatchEvent(z)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", r);
      return;
    }
    console.error(r);
  }, cl = {
    map: R,
    forEach: function(r, z, N) {
      R(
        r,
        function() {
          z.apply(this, arguments);
        },
        N
      );
    },
    count: function(r) {
      var z = 0;
      return R(r, function() {
        z++;
      }), z;
    },
    toArray: function(r) {
      return R(r, function(z) {
        return z;
      }) || [];
    },
    only: function(r) {
      if (!Bl(r))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return r;
    }
  };
  return J.Activity = D, J.Children = cl, J.Component = Hl, J.Fragment = p, J.Profiler = q, J.PureComponent = Ul, J.StrictMode = d, J.Suspense = M, J.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = L, J.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(r) {
      return L.H.useMemoCache(r);
    }
  }, J.cache = function(r) {
    return function() {
      return r.apply(null, arguments);
    };
  }, J.cacheSignal = function() {
    return null;
  }, J.cloneElement = function(r, z, N) {
    if (r == null)
      throw Error(
        "The argument must be a React element, but you passed " + r + "."
      );
    var U = k({}, r.props), K = r.key;
    if (z != null)
      for (w in z.key !== void 0 && (K = "" + z.key), z)
        !ql.call(z, w) || w === "key" || w === "__self" || w === "__source" || w === "ref" && z.ref === void 0 || (U[w] = z[w]);
    var w = arguments.length - 2;
    if (w === 1) U.children = N;
    else if (1 < w) {
      for (var P = Array(w), Xl = 0; Xl < w; Xl++)
        P[Xl] = arguments[Xl + 2];
      U.children = P;
    }
    return fl(r.type, K, U);
  }, J.createContext = function(r) {
    return r = {
      $$typeof: C,
      _currentValue: r,
      _currentValue2: r,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, r.Provider = r, r.Consumer = {
      $$typeof: B,
      _context: r
    }, r;
  }, J.createElement = function(r, z, N) {
    var U, K = {}, w = null;
    if (z != null)
      for (U in z.key !== void 0 && (w = "" + z.key), z)
        ql.call(z, U) && U !== "key" && U !== "__self" && U !== "__source" && (K[U] = z[U]);
    var P = arguments.length - 2;
    if (P === 1) K.children = N;
    else if (1 < P) {
      for (var Xl = Array(P), jl = 0; jl < P; jl++)
        Xl[jl] = arguments[jl + 2];
      K.children = Xl;
    }
    if (r && r.defaultProps)
      for (U in P = r.defaultProps, P)
        K[U] === void 0 && (K[U] = P[U]);
    return fl(r, w, K);
  }, J.createRef = function() {
    return { current: null };
  }, J.forwardRef = function(r) {
    return { $$typeof: X, render: r };
  }, J.isValidElement = Bl, J.lazy = function(r) {
    return {
      $$typeof: Y,
      _payload: { _status: -1, _result: r },
      _init: Q
    };
  }, J.memo = function(r, z) {
    return {
      $$typeof: _,
      type: r,
      compare: z === void 0 ? null : z
    };
  }, J.startTransition = function(r) {
    var z = L.T, N = {};
    L.T = N;
    try {
      var U = r(), K = L.S;
      K !== null && K(N, U), typeof U == "object" && U !== null && typeof U.then == "function" && U.then(zl, dl);
    } catch (w) {
      dl(w);
    } finally {
      z !== null && N.types !== null && (z.types = N.types), L.T = z;
    }
  }, J.unstable_useCacheRefresh = function() {
    return L.H.useCacheRefresh();
  }, J.use = function(r) {
    return L.H.use(r);
  }, J.useActionState = function(r, z, N) {
    return L.H.useActionState(r, z, N);
  }, J.useCallback = function(r, z) {
    return L.H.useCallback(r, z);
  }, J.useContext = function(r) {
    return L.H.useContext(r);
  }, J.useDebugValue = function() {
  }, J.useDeferredValue = function(r, z) {
    return L.H.useDeferredValue(r, z);
  }, J.useEffect = function(r, z) {
    return L.H.useEffect(r, z);
  }, J.useEffectEvent = function(r) {
    return L.H.useEffectEvent(r);
  }, J.useId = function() {
    return L.H.useId();
  }, J.useImperativeHandle = function(r, z, N) {
    return L.H.useImperativeHandle(r, z, N);
  }, J.useInsertionEffect = function(r, z) {
    return L.H.useInsertionEffect(r, z);
  }, J.useLayoutEffect = function(r, z) {
    return L.H.useLayoutEffect(r, z);
  }, J.useMemo = function(r, z) {
    return L.H.useMemo(r, z);
  }, J.useOptimistic = function(r, z) {
    return L.H.useOptimistic(r, z);
  }, J.useReducer = function(r, z, N) {
    return L.H.useReducer(r, z, N);
  }, J.useRef = function(r) {
    return L.H.useRef(r);
  }, J.useState = function(r) {
    return L.H.useState(r);
  }, J.useSyncExternalStore = function(r, z, N) {
    return L.H.useSyncExternalStore(
      r,
      z,
      N
    );
  }, J.useTransition = function() {
    return L.H.useTransition();
  }, J.version = "19.2.6", J;
}
var vv;
function zi() {
  return vv || (vv = 1, Gf.exports = oy()), Gf.exports;
}
var vl = zi();
const ss = /* @__PURE__ */ cy(vl);
var Xf = { exports: {} }, Fu = {}, Qf = { exports: {} }, Vf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mv;
function dy() {
  return mv || (mv = 1, (function(f) {
    function E(S, R) {
      var Q = S.length;
      S.push(R);
      l: for (; 0 < Q; ) {
        var dl = Q - 1 >>> 1, cl = S[dl];
        if (0 < q(cl, R))
          S[dl] = R, S[Q] = cl, Q = dl;
        else break l;
      }
    }
    function p(S) {
      return S.length === 0 ? null : S[0];
    }
    function d(S) {
      if (S.length === 0) return null;
      var R = S[0], Q = S.pop();
      if (Q !== R) {
        S[0] = Q;
        l: for (var dl = 0, cl = S.length, r = cl >>> 1; dl < r; ) {
          var z = 2 * (dl + 1) - 1, N = S[z], U = z + 1, K = S[U];
          if (0 > q(N, Q))
            U < cl && 0 > q(K, N) ? (S[dl] = K, S[U] = Q, dl = U) : (S[dl] = N, S[z] = Q, dl = z);
          else if (U < cl && 0 > q(K, Q))
            S[dl] = K, S[U] = Q, dl = U;
          else break l;
        }
      }
      return R;
    }
    function q(S, R) {
      var Q = S.sortIndex - R.sortIndex;
      return Q !== 0 ? Q : S.id - R.id;
    }
    if (f.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var B = performance;
      f.unstable_now = function() {
        return B.now();
      };
    } else {
      var C = Date, X = C.now();
      f.unstable_now = function() {
        return C.now() - X;
      };
    }
    var M = [], _ = [], Y = 1, D = null, x = 3, $ = !1, il = !1, k = !1, ml = !1, Hl = typeof setTimeout == "function" ? setTimeout : null, V = typeof clearTimeout == "function" ? clearTimeout : null, Ul = typeof setImmediate < "u" ? setImmediate : null;
    function I(S) {
      for (var R = p(_); R !== null; ) {
        if (R.callback === null) d(_);
        else if (R.startTime <= S)
          d(_), R.sortIndex = R.expirationTime, E(M, R);
        else break;
        R = p(_);
      }
    }
    function gl(S) {
      if (k = !1, I(S), !il)
        if (p(M) !== null)
          il = !0, zl || (zl = !0, Yl());
        else {
          var R = p(_);
          R !== null && $l(gl, R.startTime - S);
        }
    }
    var zl = !1, L = -1, ql = 5, fl = -1;
    function gt() {
      return ml ? !0 : !(f.unstable_now() - fl < ql);
    }
    function Bl() {
      if (ml = !1, zl) {
        var S = f.unstable_now();
        fl = S;
        var R = !0;
        try {
          l: {
            il = !1, k && (k = !1, V(L), L = -1), $ = !0;
            var Q = x;
            try {
              t: {
                for (I(S), D = p(M); D !== null && !(D.expirationTime > S && gt()); ) {
                  var dl = D.callback;
                  if (typeof dl == "function") {
                    D.callback = null, x = D.priorityLevel;
                    var cl = dl(
                      D.expirationTime <= S
                    );
                    if (S = f.unstable_now(), typeof cl == "function") {
                      D.callback = cl, I(S), R = !0;
                      break t;
                    }
                    D === p(M) && d(M), I(S);
                  } else d(M);
                  D = p(M);
                }
                if (D !== null) R = !0;
                else {
                  var r = p(_);
                  r !== null && $l(
                    gl,
                    r.startTime - S
                  ), R = !1;
                }
              }
              break l;
            } finally {
              D = null, x = Q, $ = !1;
            }
            R = void 0;
          }
        } finally {
          R ? Yl() : zl = !1;
        }
      }
    }
    var Yl;
    if (typeof Ul == "function")
      Yl = function() {
        Ul(Bl);
      };
    else if (typeof MessageChannel < "u") {
      var nt = new MessageChannel(), Gl = nt.port2;
      nt.port1.onmessage = Bl, Yl = function() {
        Gl.postMessage(null);
      };
    } else
      Yl = function() {
        Hl(Bl, 0);
      };
    function $l(S, R) {
      L = Hl(function() {
        S(f.unstable_now());
      }, R);
    }
    f.unstable_IdlePriority = 5, f.unstable_ImmediatePriority = 1, f.unstable_LowPriority = 4, f.unstable_NormalPriority = 3, f.unstable_Profiling = null, f.unstable_UserBlockingPriority = 2, f.unstable_cancelCallback = function(S) {
      S.callback = null;
    }, f.unstable_forceFrameRate = function(S) {
      0 > S || 125 < S ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : ql = 0 < S ? Math.floor(1e3 / S) : 5;
    }, f.unstable_getCurrentPriorityLevel = function() {
      return x;
    }, f.unstable_next = function(S) {
      switch (x) {
        case 1:
        case 2:
        case 3:
          var R = 3;
          break;
        default:
          R = x;
      }
      var Q = x;
      x = R;
      try {
        return S();
      } finally {
        x = Q;
      }
    }, f.unstable_requestPaint = function() {
      ml = !0;
    }, f.unstable_runWithPriority = function(S, R) {
      switch (S) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          S = 3;
      }
      var Q = x;
      x = S;
      try {
        return R();
      } finally {
        x = Q;
      }
    }, f.unstable_scheduleCallback = function(S, R, Q) {
      var dl = f.unstable_now();
      switch (typeof Q == "object" && Q !== null ? (Q = Q.delay, Q = typeof Q == "number" && 0 < Q ? dl + Q : dl) : Q = dl, S) {
        case 1:
          var cl = -1;
          break;
        case 2:
          cl = 250;
          break;
        case 5:
          cl = 1073741823;
          break;
        case 4:
          cl = 1e4;
          break;
        default:
          cl = 5e3;
      }
      return cl = Q + cl, S = {
        id: Y++,
        callback: R,
        priorityLevel: S,
        startTime: Q,
        expirationTime: cl,
        sortIndex: -1
      }, Q > dl ? (S.sortIndex = Q, E(_, S), p(M) === null && S === p(_) && (k ? (V(L), L = -1) : k = !0, $l(gl, Q - dl))) : (S.sortIndex = cl, E(M, S), il || $ || (il = !0, zl || (zl = !0, Yl()))), S;
    }, f.unstable_shouldYield = gt, f.unstable_wrapCallback = function(S) {
      var R = x;
      return function() {
        var Q = x;
        x = R;
        try {
          return S.apply(this, arguments);
        } finally {
          x = Q;
        }
      };
    };
  })(Vf)), Vf;
}
var yv;
function ry() {
  return yv || (yv = 1, Qf.exports = dy()), Qf.exports;
}
var Zf = { exports: {} }, at = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hv;
function vy() {
  if (hv) return at;
  hv = 1;
  var f = zi();
  function E(M) {
    var _ = "https://react.dev/errors/" + M;
    if (1 < arguments.length) {
      _ += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var Y = 2; Y < arguments.length; Y++)
        _ += "&args[]=" + encodeURIComponent(arguments[Y]);
    }
    return "Minified React error #" + M + "; visit " + _ + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function p() {
  }
  var d = {
    d: {
      f: p,
      r: function() {
        throw Error(E(522));
      },
      D: p,
      C: p,
      L: p,
      m: p,
      X: p,
      S: p,
      M: p
    },
    p: 0,
    findDOMNode: null
  }, q = Symbol.for("react.portal");
  function B(M, _, Y) {
    var D = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: q,
      key: D == null ? null : "" + D,
      children: M,
      containerInfo: _,
      implementation: Y
    };
  }
  var C = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function X(M, _) {
    if (M === "font") return "";
    if (typeof _ == "string")
      return _ === "use-credentials" ? _ : "";
  }
  return at.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = d, at.createPortal = function(M, _) {
    var Y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!_ || _.nodeType !== 1 && _.nodeType !== 9 && _.nodeType !== 11)
      throw Error(E(299));
    return B(M, _, null, Y);
  }, at.flushSync = function(M) {
    var _ = C.T, Y = d.p;
    try {
      if (C.T = null, d.p = 2, M) return M();
    } finally {
      C.T = _, d.p = Y, d.d.f();
    }
  }, at.preconnect = function(M, _) {
    typeof M == "string" && (_ ? (_ = _.crossOrigin, _ = typeof _ == "string" ? _ === "use-credentials" ? _ : "" : void 0) : _ = null, d.d.C(M, _));
  }, at.prefetchDNS = function(M) {
    typeof M == "string" && d.d.D(M);
  }, at.preinit = function(M, _) {
    if (typeof M == "string" && _ && typeof _.as == "string") {
      var Y = _.as, D = X(Y, _.crossOrigin), x = typeof _.integrity == "string" ? _.integrity : void 0, $ = typeof _.fetchPriority == "string" ? _.fetchPriority : void 0;
      Y === "style" ? d.d.S(
        M,
        typeof _.precedence == "string" ? _.precedence : void 0,
        {
          crossOrigin: D,
          integrity: x,
          fetchPriority: $
        }
      ) : Y === "script" && d.d.X(M, {
        crossOrigin: D,
        integrity: x,
        fetchPriority: $,
        nonce: typeof _.nonce == "string" ? _.nonce : void 0
      });
    }
  }, at.preinitModule = function(M, _) {
    if (typeof M == "string")
      if (typeof _ == "object" && _ !== null) {
        if (_.as == null || _.as === "script") {
          var Y = X(
            _.as,
            _.crossOrigin
          );
          d.d.M(M, {
            crossOrigin: Y,
            integrity: typeof _.integrity == "string" ? _.integrity : void 0,
            nonce: typeof _.nonce == "string" ? _.nonce : void 0
          });
        }
      } else _ == null && d.d.M(M);
  }, at.preload = function(M, _) {
    if (typeof M == "string" && typeof _ == "object" && _ !== null && typeof _.as == "string") {
      var Y = _.as, D = X(Y, _.crossOrigin);
      d.d.L(M, Y, {
        crossOrigin: D,
        integrity: typeof _.integrity == "string" ? _.integrity : void 0,
        nonce: typeof _.nonce == "string" ? _.nonce : void 0,
        type: typeof _.type == "string" ? _.type : void 0,
        fetchPriority: typeof _.fetchPriority == "string" ? _.fetchPriority : void 0,
        referrerPolicy: typeof _.referrerPolicy == "string" ? _.referrerPolicy : void 0,
        imageSrcSet: typeof _.imageSrcSet == "string" ? _.imageSrcSet : void 0,
        imageSizes: typeof _.imageSizes == "string" ? _.imageSizes : void 0,
        media: typeof _.media == "string" ? _.media : void 0
      });
    }
  }, at.preloadModule = function(M, _) {
    if (typeof M == "string")
      if (_) {
        var Y = X(_.as, _.crossOrigin);
        d.d.m(M, {
          as: typeof _.as == "string" && _.as !== "script" ? _.as : void 0,
          crossOrigin: Y,
          integrity: typeof _.integrity == "string" ? _.integrity : void 0
        });
      } else d.d.m(M);
  }, at.requestFormReset = function(M) {
    d.d.r(M);
  }, at.unstable_batchedUpdates = function(M, _) {
    return M(_);
  }, at.useFormState = function(M, _, Y) {
    return C.H.useFormState(M, _, Y);
  }, at.useFormStatus = function() {
    return C.H.useHostTransitionStatus();
  }, at.version = "19.2.6", at;
}
var gv;
function my() {
  if (gv) return Zf.exports;
  gv = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (E) {
        console.error(E);
      }
  }
  return f(), Zf.exports = vy(), Zf.exports;
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
var Sv;
function yy() {
  if (Sv) return Fu;
  Sv = 1;
  var f = ry(), E = zi(), p = my();
  function d(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        t += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function q(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function B(l) {
    var t = l, e = l;
    if (l.alternate) for (; t.return; ) t = t.return;
    else {
      l = t;
      do
        t = l, (t.flags & 4098) !== 0 && (e = t.return), l = t.return;
      while (l);
    }
    return t.tag === 3 ? e : null;
  }
  function C(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function X(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function M(l) {
    if (B(l) !== l)
      throw Error(d(188));
  }
  function _(l) {
    var t = l.alternate;
    if (!t) {
      if (t = B(l), t === null) throw Error(d(188));
      return t !== l ? null : l;
    }
    for (var e = l, a = t; ; ) {
      var u = e.return;
      if (u === null) break;
      var n = u.alternate;
      if (n === null) {
        if (a = u.return, a !== null) {
          e = a;
          continue;
        }
        break;
      }
      if (u.child === n.child) {
        for (n = u.child; n; ) {
          if (n === e) return M(u), l;
          if (n === a) return M(u), t;
          n = n.sibling;
        }
        throw Error(d(188));
      }
      if (e.return !== a.return) e = u, a = n;
      else {
        for (var i = !1, c = u.child; c; ) {
          if (c === e) {
            i = !0, e = u, a = n;
            break;
          }
          if (c === a) {
            i = !0, a = u, e = n;
            break;
          }
          c = c.sibling;
        }
        if (!i) {
          for (c = n.child; c; ) {
            if (c === e) {
              i = !0, e = n, a = u;
              break;
            }
            if (c === a) {
              i = !0, a = n, e = u;
              break;
            }
            c = c.sibling;
          }
          if (!i) throw Error(d(189));
        }
      }
      if (e.alternate !== a) throw Error(d(190));
    }
    if (e.tag !== 3) throw Error(d(188));
    return e.stateNode.current === e ? l : t;
  }
  function Y(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (t = Y(l), t !== null) return t;
      l = l.sibling;
    }
    return null;
  }
  var D = Object.assign, x = Symbol.for("react.element"), $ = Symbol.for("react.transitional.element"), il = Symbol.for("react.portal"), k = Symbol.for("react.fragment"), ml = Symbol.for("react.strict_mode"), Hl = Symbol.for("react.profiler"), V = Symbol.for("react.consumer"), Ul = Symbol.for("react.context"), I = Symbol.for("react.forward_ref"), gl = Symbol.for("react.suspense"), zl = Symbol.for("react.suspense_list"), L = Symbol.for("react.memo"), ql = Symbol.for("react.lazy"), fl = Symbol.for("react.activity"), gt = Symbol.for("react.memo_cache_sentinel"), Bl = Symbol.iterator;
  function Yl(l) {
    return l === null || typeof l != "object" ? null : (l = Bl && l[Bl] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var nt = Symbol.for("react.client.reference");
  function Gl(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === nt ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case k:
        return "Fragment";
      case Hl:
        return "Profiler";
      case ml:
        return "StrictMode";
      case gl:
        return "Suspense";
      case zl:
        return "SuspenseList";
      case fl:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case il:
          return "Portal";
        case Ul:
          return l.displayName || "Context";
        case V:
          return (l._context.displayName || "Context") + ".Consumer";
        case I:
          var t = l.render;
          return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case L:
          return t = l.displayName || null, t !== null ? t : Gl(l.type) || "Memo";
        case ql:
          t = l._payload, l = l._init;
          try {
            return Gl(l(t));
          } catch {
          }
      }
    return null;
  }
  var $l = Array.isArray, S = E.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, R = p.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, dl = [], cl = -1;
  function r(l) {
    return { current: l };
  }
  function z(l) {
    0 > cl || (l.current = dl[cl], dl[cl] = null, cl--);
  }
  function N(l, t) {
    cl++, dl[cl] = l.current, l.current = t;
  }
  var U = r(null), K = r(null), w = r(null), P = r(null);
  function Xl(l, t) {
    switch (N(w, t), N(K, l), N(U, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? Cr(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI)
          t = Cr(t), l = xr(t, l);
        else
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    z(U), N(U, l);
  }
  function jl() {
    z(U), z(K), z(w);
  }
  function me(l) {
    l.memoizedState !== null && N(P, l);
    var t = U.current, e = xr(t, l.type);
    t !== e && (N(K, l), N(U, e));
  }
  function Le(l) {
    K.current === l && (z(U), z(K)), P.current === l && (z(P), Ku._currentValue = Q);
  }
  var tu, Pu;
  function St(l) {
    if (tu === void 0)
      try {
        throw Error();
      } catch (e) {
        var t = e.stack.trim().match(/\n( *(at )?)/);
        tu = t && t[1] || "", Pu = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + tu + l + Pu;
  }
  var va = !1;
  function ln(l, t) {
    if (!l || va) return "";
    va = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var A = function() {
                throw Error();
              };
              if (Object.defineProperty(A.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(A, []);
                } catch (g) {
                  var h = g;
                }
                Reflect.construct(l, [], A);
              } else {
                try {
                  A.call();
                } catch (g) {
                  h = g;
                }
                l.call(A.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (g) {
                h = g;
              }
              (A = l()) && typeof A.catch == "function" && A.catch(function() {
              });
            }
          } catch (g) {
            if (g && h && typeof g.stack == "string")
              return [g.stack, h.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var n = a.DetermineComponentFrameRoot(), i = n[0], c = n[1];
      if (i && c) {
        var s = i.split(`
`), y = c.split(`
`);
        for (u = a = 0; a < s.length && !s[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; u < y.length && !y[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (a === s.length || u === y.length)
          for (a = s.length - 1, u = y.length - 1; 1 <= a && 0 <= u && s[a] !== y[u]; )
            u--;
        for (; 1 <= a && 0 <= u; a--, u--)
          if (s[a] !== y[u]) {
            if (a !== 1 || u !== 1)
              do
                if (a--, u--, 0 > u || s[a] !== y[u]) {
                  var b = `
` + s[a].replace(" at new ", " at ");
                  return l.displayName && b.includes("<anonymous>") && (b = b.replace("<anonymous>", l.displayName)), b;
                }
              while (1 <= a && 0 <= u);
            break;
          }
      }
    } finally {
      va = !1, Error.prepareStackTrace = e;
    }
    return (e = l ? l.displayName || l.name : "") ? St(e) : "";
  }
  function Sl(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return St(l.type);
      case 16:
        return St("Lazy");
      case 13:
        return l.child !== t && t !== null ? St("Suspense Fallback") : St("Suspense");
      case 19:
        return St("SuspenseList");
      case 0:
      case 15:
        return ln(l.type, !1);
      case 11:
        return ln(l.type.render, !1);
      case 1:
        return ln(l.type, !0);
      case 31:
        return St("Activity");
      default:
        return "";
    }
  }
  function Nl(l) {
    try {
      var t = "", e = null;
      do
        t += Sl(l, e), e = l, l = l.return;
      while (l);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Al = Object.prototype.hasOwnProperty, pl = f.unstable_scheduleCallback, ct = f.unstable_cancelCallback, ft = f.unstable_shouldYield, Ql = f.unstable_requestPaint, Ol = f.unstable_now, Ke = f.unstable_getCurrentPriorityLevel, ye = f.unstable_ImmediatePriority, eu = f.unstable_UserBlockingPriority, Je = f.unstable_NormalPriority, st = f.unstable_LowPriority, Mt = f.unstable_IdlePriority, au = f.log, Ai = f.unstable_setDisableYieldValue, wt = null, bt = null;
  function he(l) {
    if (typeof au == "function" && Ai(l), bt && typeof bt.setStrictMode == "function")
      try {
        bt.setStrictMode(wt, l);
      } catch {
      }
  }
  var Et = Math.clz32 ? Math.clz32 : wv, Kv = Math.log, Jv = Math.LN2;
  function wv(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (Kv(l) / Jv | 0) | 0;
  }
  var tn = 256, en = 262144, an = 4194304;
  function we(l) {
    var t = l & 42;
    if (t !== 0) return t;
    switch (l & -l) {
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
        return l & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
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
        return l;
    }
  }
  function un(l, t, e) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var u = 0, n = l.suspendedLanes, i = l.pingedLanes;
    l = l.warmLanes;
    var c = a & 134217727;
    return c !== 0 ? (a = c & ~n, a !== 0 ? u = we(a) : (i &= c, i !== 0 ? u = we(i) : e || (e = c & ~l, e !== 0 && (u = we(e))))) : (c = a & ~n, c !== 0 ? u = we(c) : i !== 0 ? u = we(i) : e || (e = a & ~l, e !== 0 && (u = we(e)))), u === 0 ? 0 : t !== 0 && t !== u && (t & n) === 0 && (n = u & -u, e = t & -t, n >= e || n === 32 && (e & 4194048) !== 0) ? t : u;
  }
  function uu(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function Wv(l, t) {
    switch (l) {
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
  function vs() {
    var l = an;
    return an <<= 1, (an & 62914560) === 0 && (an = 4194304), l;
  }
  function pi(l) {
    for (var t = [], e = 0; 31 > e; e++) t.push(l);
    return t;
  }
  function nu(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function $v(l, t, e, a, u, n) {
    var i = l.pendingLanes;
    l.pendingLanes = e, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= e, l.entangledLanes &= e, l.errorRecoveryDisabledLanes &= e, l.shellSuspendCounter = 0;
    var c = l.entanglements, s = l.expirationTimes, y = l.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var b = 31 - Et(e), A = 1 << b;
      c[b] = 0, s[b] = -1;
      var h = y[b];
      if (h !== null)
        for (y[b] = null, b = 0; b < h.length; b++) {
          var g = h[b];
          g !== null && (g.lane &= -536870913);
        }
      e &= ~A;
    }
    a !== 0 && ms(l, a, 0), n !== 0 && u === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(i & ~t));
  }
  function ms(l, t, e) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var a = 31 - Et(t);
    l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | e & 261930;
  }
  function ys(l, t) {
    var e = l.entangledLanes |= t;
    for (l = l.entanglements; e; ) {
      var a = 31 - Et(e), u = 1 << a;
      u & t | l[a] & t && (l[a] |= t), e &= ~u;
    }
  }
  function hs(l, t) {
    var e = t & -t;
    return e = (e & 42) !== 0 ? 1 : Oi(e), (e & (l.suspendedLanes | t)) !== 0 ? 0 : e;
  }
  function Oi(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
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
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function Di(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function gs() {
    var l = R.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : av(l.type));
  }
  function Ss(l, t) {
    var e = R.p;
    try {
      return R.p = l, t();
    } finally {
      R.p = e;
    }
  }
  var ge = Math.random().toString(36).slice(2), Il = "__reactFiber$" + ge, ot = "__reactProps$" + ge, ma = "__reactContainer$" + ge, Mi = "__reactEvents$" + ge, Fv = "__reactListeners$" + ge, kv = "__reactHandles$" + ge, bs = "__reactResources$" + ge, iu = "__reactMarker$" + ge;
  function Ni(l) {
    delete l[Il], delete l[ot], delete l[Mi], delete l[Fv], delete l[kv];
  }
  function ya(l) {
    var t = l[Il];
    if (t) return t;
    for (var e = l.parentNode; e; ) {
      if (t = e[ma] || e[Il]) {
        if (e = t.alternate, t.child !== null || e !== null && e.child !== null)
          for (l = Qr(l); l !== null; ) {
            if (e = l[Il]) return e;
            l = Qr(l);
          }
        return t;
      }
      l = e, e = l.parentNode;
    }
    return null;
  }
  function ha(l) {
    if (l = l[Il] || l[ma]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return l;
    }
    return null;
  }
  function cu(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(d(33));
  }
  function ga(l) {
    var t = l[bs];
    return t || (t = l[bs] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Fl(l) {
    l[iu] = !0;
  }
  var Es = /* @__PURE__ */ new Set(), _s = {};
  function We(l, t) {
    Sa(l, t), Sa(l + "Capture", t);
  }
  function Sa(l, t) {
    for (_s[l] = t, l = 0; l < t.length; l++)
      Es.add(t[l]);
  }
  var Iv = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Ts = {}, zs = {};
  function Pv(l) {
    return Al.call(zs, l) ? !0 : Al.call(Ts, l) ? !1 : Iv.test(l) ? zs[l] = !0 : (Ts[l] = !0, !1);
  }
  function nn(l, t, e) {
    if (Pv(t))
      if (e === null) l.removeAttribute(t);
      else {
        switch (typeof e) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              l.removeAttribute(t);
              return;
            }
        }
        l.setAttribute(t, "" + e);
      }
  }
  function cn(l, t, e) {
    if (e === null) l.removeAttribute(t);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, "" + e);
    }
  }
  function Wt(l, t, e, a) {
    if (a === null) l.removeAttribute(e);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(e);
          return;
      }
      l.setAttributeNS(t, e, "" + a);
    }
  }
  function Nt(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function As(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function lm(l, t, e) {
    var a = Object.getOwnPropertyDescriptor(
      l.constructor.prototype,
      t
    );
    if (!l.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var u = a.get, n = a.set;
      return Object.defineProperty(l, t, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(i) {
          e = "" + i, n.call(this, i);
        }
      }), Object.defineProperty(l, t, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return e;
        },
        setValue: function(i) {
          e = "" + i;
        },
        stopTracking: function() {
          l._valueTracker = null, delete l[t];
        }
      };
    }
  }
  function Ri(l) {
    if (!l._valueTracker) {
      var t = As(l) ? "checked" : "value";
      l._valueTracker = lm(
        l,
        t,
        "" + l[t]
      );
    }
  }
  function ps(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var e = t.getValue(), a = "";
    return l && (a = As(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== e ? (t.setValue(l), !0) : !1;
  }
  function fn(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var tm = /[\n"\\]/g;
  function Rt(l) {
    return l.replace(
      tm,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ui(l, t, e, a, u, n, i, c) {
    l.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? l.type = i : l.removeAttribute("type"), t != null ? i === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + Nt(t)) : l.value !== "" + Nt(t) && (l.value = "" + Nt(t)) : i !== "submit" && i !== "reset" || l.removeAttribute("value"), t != null ? ji(l, i, Nt(t)) : e != null ? ji(l, i, Nt(e)) : a != null && l.removeAttribute("value"), u == null && n != null && (l.defaultChecked = !!n), u != null && (l.checked = u && typeof u != "function" && typeof u != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.name = "" + Nt(c) : l.removeAttribute("name");
  }
  function Os(l, t, e, a, u, n, i, c) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || e != null) {
      if (!(n !== "submit" && n !== "reset" || t != null)) {
        Ri(l);
        return;
      }
      e = e != null ? "" + Nt(e) : "", t = t != null ? "" + Nt(t) : e, c || t === l.value || (l.value = t), l.defaultValue = t;
    }
    a = a ?? u, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = c ? l.checked : !!a, l.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (l.name = i), Ri(l);
  }
  function ji(l, t, e) {
    t === "number" && fn(l.ownerDocument) === l || l.defaultValue === "" + e || (l.defaultValue = "" + e);
  }
  function ba(l, t, e, a) {
    if (l = l.options, t) {
      t = {};
      for (var u = 0; u < e.length; u++)
        t["$" + e[u]] = !0;
      for (e = 0; e < l.length; e++)
        u = t.hasOwnProperty("$" + l[e].value), l[e].selected !== u && (l[e].selected = u), u && a && (l[e].defaultSelected = !0);
    } else {
      for (e = "" + Nt(e), t = null, u = 0; u < l.length; u++) {
        if (l[u].value === e) {
          l[u].selected = !0, a && (l[u].defaultSelected = !0);
          return;
        }
        t !== null || l[u].disabled || (t = l[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Ds(l, t, e) {
    if (t != null && (t = "" + Nt(t), t !== l.value && (l.value = t), e == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = e != null ? "" + Nt(e) : "";
  }
  function Ms(l, t, e, a) {
    if (t == null) {
      if (a != null) {
        if (e != null) throw Error(d(92));
        if ($l(a)) {
          if (1 < a.length) throw Error(d(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), t = e;
    }
    e = Nt(t), l.defaultValue = e, a = l.textContent, a === e && a !== "" && a !== null && (l.value = a), Ri(l);
  }
  function Ea(l, t) {
    if (t) {
      var e = l.firstChild;
      if (e && e === l.lastChild && e.nodeType === 3) {
        e.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var em = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Ns(l, t, e) {
    var a = t.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, e) : typeof e != "number" || e === 0 || em.has(t) ? t === "float" ? l.cssFloat = e : l[t] = ("" + e).trim() : l[t] = e + "px";
  }
  function Rs(l, t, e) {
    if (t != null && typeof t != "object")
      throw Error(d(62));
    if (l = l.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
      for (var u in t)
        a = t[u], t.hasOwnProperty(u) && e[u] !== a && Ns(l, u, a);
    } else
      for (var n in t)
        t.hasOwnProperty(n) && Ns(l, n, t[n]);
  }
  function Ci(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
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
  var am = /* @__PURE__ */ new Map([
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
  ]), um = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function sn(l) {
    return um.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function $t() {
  }
  var xi = null;
  function Hi(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var _a = null, Ta = null;
  function Us(l) {
    var t = ha(l);
    if (t && (l = t.stateNode)) {
      var e = l[ot] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if (Ui(
            l,
            e.value,
            e.defaultValue,
            e.defaultValue,
            e.checked,
            e.defaultChecked,
            e.type,
            e.name
          ), t = e.name, e.type === "radio" && t != null) {
            for (e = l; e.parentNode; ) e = e.parentNode;
            for (e = e.querySelectorAll(
              'input[name="' + Rt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < e.length; t++) {
              var a = e[t];
              if (a !== l && a.form === l.form) {
                var u = a[ot] || null;
                if (!u) throw Error(d(90));
                Ui(
                  a,
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
            for (t = 0; t < e.length; t++)
              a = e[t], a.form === l.form && ps(a);
          }
          break l;
        case "textarea":
          Ds(l, e.value, e.defaultValue);
          break l;
        case "select":
          t = e.value, t != null && ba(l, !!e.multiple, t, !1);
      }
    }
  }
  var qi = !1;
  function js(l, t, e) {
    if (qi) return l(t, e);
    qi = !0;
    try {
      var a = l(t);
      return a;
    } finally {
      if (qi = !1, (_a !== null || Ta !== null) && (Fn(), _a && (t = _a, l = Ta, Ta = _a = null, Us(t), l)))
        for (t = 0; t < l.length; t++) Us(l[t]);
    }
  }
  function fu(l, t) {
    var e = l.stateNode;
    if (e === null) return null;
    var a = e[ot] || null;
    if (a === null) return null;
    e = a[t];
    l: switch (t) {
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
        (a = !a.disabled) || (l = l.type, a = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !a;
        break l;
      default:
        l = !1;
    }
    if (l) return null;
    if (e && typeof e != "function")
      throw Error(
        d(231, t, typeof e)
      );
    return e;
  }
  var Ft = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Bi = !1;
  if (Ft)
    try {
      var su = {};
      Object.defineProperty(su, "passive", {
        get: function() {
          Bi = !0;
        }
      }), window.addEventListener("test", su, su), window.removeEventListener("test", su, su);
    } catch {
      Bi = !1;
    }
  var Se = null, Yi = null, on = null;
  function Cs() {
    if (on) return on;
    var l, t = Yi, e = t.length, a, u = "value" in Se ? Se.value : Se.textContent, n = u.length;
    for (l = 0; l < e && t[l] === u[l]; l++) ;
    var i = e - l;
    for (a = 1; a <= i && t[e - a] === u[n - a]; a++) ;
    return on = u.slice(l, 1 < a ? 1 - a : void 0);
  }
  function dn(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function rn() {
    return !0;
  }
  function xs() {
    return !1;
  }
  function dt(l) {
    function t(e, a, u, n, i) {
      this._reactName = e, this._targetInst = u, this.type = a, this.nativeEvent = n, this.target = i, this.currentTarget = null;
      for (var c in l)
        l.hasOwnProperty(c) && (e = l[c], this[c] = e ? e(n) : n[c]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? rn : xs, this.isPropagationStopped = xs, this;
    }
    return D(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = rn);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = rn);
      },
      persist: function() {
      },
      isPersistent: rn
    }), t;
  }
  var $e = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, vn = dt($e), ou = D({}, $e, { view: 0, detail: 0 }), nm = dt(ou), Gi, Xi, du, mn = D({}, ou, {
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
    getModifierState: Vi,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== du && (du && l.type === "mousemove" ? (Gi = l.screenX - du.screenX, Xi = l.screenY - du.screenY) : Xi = Gi = 0, du = l), Gi);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : Xi;
    }
  }), Hs = dt(mn), im = D({}, mn, { dataTransfer: 0 }), cm = dt(im), fm = D({}, ou, { relatedTarget: 0 }), Qi = dt(fm), sm = D({}, $e, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), om = dt(sm), dm = D({}, $e, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), rm = dt(dm), vm = D({}, $e, { data: 0 }), qs = dt(vm), mm = {
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
  }, ym = {
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
  }, hm = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function gm(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = hm[l]) ? !!t[l] : !1;
  }
  function Vi() {
    return gm;
  }
  var Sm = D({}, ou, {
    key: function(l) {
      if (l.key) {
        var t = mm[l.key] || l.key;
        if (t !== "Unidentified") return t;
      }
      return l.type === "keypress" ? (l = dn(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? ym[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Vi,
    charCode: function(l) {
      return l.type === "keypress" ? dn(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? dn(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), bm = dt(Sm), Em = D({}, mn, {
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
  }), Bs = dt(Em), _m = D({}, ou, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Vi
  }), Tm = dt(_m), zm = D({}, $e, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Am = dt(zm), pm = D({}, mn, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Om = dt(pm), Dm = D({}, $e, {
    newState: 0,
    oldState: 0
  }), Mm = dt(Dm), Nm = [9, 13, 27, 32], Zi = Ft && "CompositionEvent" in window, ru = null;
  Ft && "documentMode" in document && (ru = document.documentMode);
  var Rm = Ft && "TextEvent" in window && !ru, Ys = Ft && (!Zi || ru && 8 < ru && 11 >= ru), Gs = " ", Xs = !1;
  function Qs(l, t) {
    switch (l) {
      case "keyup":
        return Nm.indexOf(t.keyCode) !== -1;
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
  function Vs(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var za = !1;
  function Um(l, t) {
    switch (l) {
      case "compositionend":
        return Vs(t);
      case "keypress":
        return t.which !== 32 ? null : (Xs = !0, Gs);
      case "textInput":
        return l = t.data, l === Gs && Xs ? null : l;
      default:
        return null;
    }
  }
  function jm(l, t) {
    if (za)
      return l === "compositionend" || !Zi && Qs(l, t) ? (l = Cs(), on = Yi = Se = null, za = !1, l) : null;
    switch (l) {
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
        return Ys && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Cm = {
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
  function Zs(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!Cm[l.type] : t === "textarea";
  }
  function Ls(l, t, e, a) {
    _a ? Ta ? Ta.push(a) : Ta = [a] : _a = a, t = ai(t, "onChange"), 0 < t.length && (e = new vn(
      "onChange",
      "change",
      null,
      e,
      a
    ), l.push({ event: e, listeners: t }));
  }
  var vu = null, mu = null;
  function xm(l) {
    Dr(l, 0);
  }
  function yn(l) {
    var t = cu(l);
    if (ps(t)) return l;
  }
  function Ks(l, t) {
    if (l === "change") return t;
  }
  var Js = !1;
  if (Ft) {
    var Li;
    if (Ft) {
      var Ki = "oninput" in document;
      if (!Ki) {
        var ws = document.createElement("div");
        ws.setAttribute("oninput", "return;"), Ki = typeof ws.oninput == "function";
      }
      Li = Ki;
    } else Li = !1;
    Js = Li && (!document.documentMode || 9 < document.documentMode);
  }
  function Ws() {
    vu && (vu.detachEvent("onpropertychange", $s), mu = vu = null);
  }
  function $s(l) {
    if (l.propertyName === "value" && yn(mu)) {
      var t = [];
      Ls(
        t,
        mu,
        l,
        Hi(l)
      ), js(xm, t);
    }
  }
  function Hm(l, t, e) {
    l === "focusin" ? (Ws(), vu = t, mu = e, vu.attachEvent("onpropertychange", $s)) : l === "focusout" && Ws();
  }
  function qm(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return yn(mu);
  }
  function Bm(l, t) {
    if (l === "click") return yn(t);
  }
  function Ym(l, t) {
    if (l === "input" || l === "change")
      return yn(t);
  }
  function Gm(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var _t = typeof Object.is == "function" ? Object.is : Gm;
  function yu(l, t) {
    if (_t(l, t)) return !0;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null)
      return !1;
    var e = Object.keys(l), a = Object.keys(t);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var u = e[a];
      if (!Al.call(t, u) || !_t(l[u], t[u]))
        return !1;
    }
    return !0;
  }
  function Fs(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function ks(l, t) {
    var e = Fs(l);
    l = 0;
    for (var a; e; ) {
      if (e.nodeType === 3) {
        if (a = l + e.textContent.length, l <= t && a >= t)
          return { node: e, offset: t - l };
        l = a;
      }
      l: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break l;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = Fs(e);
    }
  }
  function Is(l, t) {
    return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Is(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Ps(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = fn(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var e = typeof t.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) l = t.contentWindow;
      else break;
      t = fn(l.document);
    }
    return t;
  }
  function Ji(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var Xm = Ft && "documentMode" in document && 11 >= document.documentMode, Aa = null, wi = null, hu = null, Wi = !1;
  function lo(l, t, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    Wi || Aa == null || Aa !== fn(a) || (a = Aa, "selectionStart" in a && Ji(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), hu && yu(hu, a) || (hu = a, a = ai(wi, "onSelect"), 0 < a.length && (t = new vn(
      "onSelect",
      "select",
      null,
      t,
      e
    ), l.push({ event: t, listeners: a }), t.target = Aa)));
  }
  function Fe(l, t) {
    var e = {};
    return e[l.toLowerCase()] = t.toLowerCase(), e["Webkit" + l] = "webkit" + t, e["Moz" + l] = "moz" + t, e;
  }
  var pa = {
    animationend: Fe("Animation", "AnimationEnd"),
    animationiteration: Fe("Animation", "AnimationIteration"),
    animationstart: Fe("Animation", "AnimationStart"),
    transitionrun: Fe("Transition", "TransitionRun"),
    transitionstart: Fe("Transition", "TransitionStart"),
    transitioncancel: Fe("Transition", "TransitionCancel"),
    transitionend: Fe("Transition", "TransitionEnd")
  }, $i = {}, to = {};
  Ft && (to = document.createElement("div").style, "AnimationEvent" in window || (delete pa.animationend.animation, delete pa.animationiteration.animation, delete pa.animationstart.animation), "TransitionEvent" in window || delete pa.transitionend.transition);
  function ke(l) {
    if ($i[l]) return $i[l];
    if (!pa[l]) return l;
    var t = pa[l], e;
    for (e in t)
      if (t.hasOwnProperty(e) && e in to)
        return $i[l] = t[e];
    return l;
  }
  var eo = ke("animationend"), ao = ke("animationiteration"), uo = ke("animationstart"), Qm = ke("transitionrun"), Vm = ke("transitionstart"), Zm = ke("transitioncancel"), no = ke("transitionend"), io = /* @__PURE__ */ new Map(), Fi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Fi.push("scrollEnd");
  function Gt(l, t) {
    io.set(l, t), We(t, [l]);
  }
  var hn = typeof reportError == "function" ? reportError : function(l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
        error: l
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  }, Ut = [], Oa = 0, ki = 0;
  function gn() {
    for (var l = Oa, t = ki = Oa = 0; t < l; ) {
      var e = Ut[t];
      Ut[t++] = null;
      var a = Ut[t];
      Ut[t++] = null;
      var u = Ut[t];
      Ut[t++] = null;
      var n = Ut[t];
      if (Ut[t++] = null, a !== null && u !== null) {
        var i = a.pending;
        i === null ? u.next = u : (u.next = i.next, i.next = u), a.pending = u;
      }
      n !== 0 && co(e, u, n);
    }
  }
  function Sn(l, t, e, a) {
    Ut[Oa++] = l, Ut[Oa++] = t, Ut[Oa++] = e, Ut[Oa++] = a, ki |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
  }
  function Ii(l, t, e, a) {
    return Sn(l, t, e, a), bn(l);
  }
  function Ie(l, t) {
    return Sn(l, null, null, t), bn(l);
  }
  function co(l, t, e) {
    l.lanes |= e;
    var a = l.alternate;
    a !== null && (a.lanes |= e);
    for (var u = !1, n = l.return; n !== null; )
      n.childLanes |= e, a = n.alternate, a !== null && (a.childLanes |= e), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (u = !0)), l = n, n = n.return;
    return l.tag === 3 ? (n = l.stateNode, u && t !== null && (u = 31 - Et(e), l = n.hiddenUpdates, a = l[u], a === null ? l[u] = [t] : a.push(t), t.lane = e | 536870912), n) : null;
  }
  function bn(l) {
    if (50 < Yu)
      throw Yu = 0, ff = null, Error(d(185));
    for (var t = l.return; t !== null; )
      l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var Da = {};
  function Lm(l, t, e, a) {
    this.tag = l, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Tt(l, t, e, a) {
    return new Lm(l, t, e, a);
  }
  function Pi(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function kt(l, t) {
    var e = l.alternate;
    return e === null ? (e = Tt(
      l.tag,
      t,
      l.key,
      l.mode
    ), e.elementType = l.elementType, e.type = l.type, e.stateNode = l.stateNode, e.alternate = l, l.alternate = e) : (e.pendingProps = t, e.type = l.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = l.flags & 65011712, e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, t = l.dependencies, e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, e.sibling = l.sibling, e.index = l.index, e.ref = l.ref, e.refCleanup = l.refCleanup, e;
  }
  function fo(l, t) {
    l.flags &= 65011714;
    var e = l.alternate;
    return e === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, l.type = e.type, t = e.dependencies, l.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), l;
  }
  function En(l, t, e, a, u, n) {
    var i = 0;
    if (a = l, typeof l == "function") Pi(l) && (i = 1);
    else if (typeof l == "string")
      i = $0(
        l,
        e,
        U.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      l: switch (l) {
        case fl:
          return l = Tt(31, e, t, u), l.elementType = fl, l.lanes = n, l;
        case k:
          return Pe(e.children, u, n, t);
        case ml:
          i = 8, u |= 24;
          break;
        case Hl:
          return l = Tt(12, e, t, u | 2), l.elementType = Hl, l.lanes = n, l;
        case gl:
          return l = Tt(13, e, t, u), l.elementType = gl, l.lanes = n, l;
        case zl:
          return l = Tt(19, e, t, u), l.elementType = zl, l.lanes = n, l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case Ul:
                i = 10;
                break l;
              case V:
                i = 9;
                break l;
              case I:
                i = 11;
                break l;
              case L:
                i = 14;
                break l;
              case ql:
                i = 16, a = null;
                break l;
            }
          i = 29, e = Error(
            d(130, l === null ? "null" : typeof l, "")
          ), a = null;
      }
    return t = Tt(i, e, t, u), t.elementType = l, t.type = a, t.lanes = n, t;
  }
  function Pe(l, t, e, a) {
    return l = Tt(7, l, a, t), l.lanes = e, l;
  }
  function lc(l, t, e) {
    return l = Tt(6, l, null, t), l.lanes = e, l;
  }
  function so(l) {
    var t = Tt(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function tc(l, t, e) {
    return t = Tt(
      4,
      l.children !== null ? l.children : [],
      l.key,
      t
    ), t.lanes = e, t.stateNode = {
      containerInfo: l.containerInfo,
      pendingChildren: null,
      implementation: l.implementation
    }, t;
  }
  var oo = /* @__PURE__ */ new WeakMap();
  function jt(l, t) {
    if (typeof l == "object" && l !== null) {
      var e = oo.get(l);
      return e !== void 0 ? e : (t = {
        value: l,
        source: t,
        stack: Nl(t)
      }, oo.set(l, t), t);
    }
    return {
      value: l,
      source: t,
      stack: Nl(t)
    };
  }
  var Ma = [], Na = 0, _n = null, gu = 0, Ct = [], xt = 0, be = null, Vt = 1, Zt = "";
  function It(l, t) {
    Ma[Na++] = gu, Ma[Na++] = _n, _n = l, gu = t;
  }
  function ro(l, t, e) {
    Ct[xt++] = Vt, Ct[xt++] = Zt, Ct[xt++] = be, be = l;
    var a = Vt;
    l = Zt;
    var u = 32 - Et(a) - 1;
    a &= ~(1 << u), e += 1;
    var n = 32 - Et(t) + u;
    if (30 < n) {
      var i = u - u % 5;
      n = (a & (1 << i) - 1).toString(32), a >>= i, u -= i, Vt = 1 << 32 - Et(t) + u | e << u | a, Zt = n + l;
    } else
      Vt = 1 << n | e << u | a, Zt = l;
  }
  function ec(l) {
    l.return !== null && (It(l, 1), ro(l, 1, 0));
  }
  function ac(l) {
    for (; l === _n; )
      _n = Ma[--Na], Ma[Na] = null, gu = Ma[--Na], Ma[Na] = null;
    for (; l === be; )
      be = Ct[--xt], Ct[xt] = null, Zt = Ct[--xt], Ct[xt] = null, Vt = Ct[--xt], Ct[xt] = null;
  }
  function vo(l, t) {
    Ct[xt++] = Vt, Ct[xt++] = Zt, Ct[xt++] = be, Vt = t.id, Zt = t.overflow, be = l;
  }
  var Pl = null, Dl = null, nl = !1, Ee = null, Ht = !1, uc = Error(d(519));
  function _e(l) {
    var t = Error(
      d(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Su(jt(t, l)), uc;
  }
  function mo(l) {
    var t = l.stateNode, e = l.type, a = l.memoizedProps;
    switch (t[Il] = l, t[ot] = a, e) {
      case "dialog":
        tl("cancel", t), tl("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        tl("load", t);
        break;
      case "video":
      case "audio":
        for (e = 0; e < Xu.length; e++)
          tl(Xu[e], t);
        break;
      case "source":
        tl("error", t);
        break;
      case "img":
      case "image":
      case "link":
        tl("error", t), tl("load", t);
        break;
      case "details":
        tl("toggle", t);
        break;
      case "input":
        tl("invalid", t), Os(
          t,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0
        );
        break;
      case "select":
        tl("invalid", t);
        break;
      case "textarea":
        tl("invalid", t), Ms(t, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || t.textContent === "" + e || a.suppressHydrationWarning === !0 || Ur(t.textContent, e) ? (a.popover != null && (tl("beforetoggle", t), tl("toggle", t)), a.onScroll != null && tl("scroll", t), a.onScrollEnd != null && tl("scrollend", t), a.onClick != null && (t.onclick = $t), t = !0) : t = !1, t || _e(l, !0);
  }
  function yo(l) {
    for (Pl = l.return; Pl; )
      switch (Pl.tag) {
        case 5:
        case 31:
        case 13:
          Ht = !1;
          return;
        case 27:
        case 3:
          Ht = !0;
          return;
        default:
          Pl = Pl.return;
      }
  }
  function Ra(l) {
    if (l !== Pl) return !1;
    if (!nl) return yo(l), nl = !0, !1;
    var t = l.tag, e;
    if ((e = t !== 3 && t !== 27) && ((e = t === 5) && (e = l.type, e = !(e !== "form" && e !== "button") || zf(l.type, l.memoizedProps)), e = !e), e && Dl && _e(l), yo(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(d(317));
      Dl = Xr(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(d(317));
      Dl = Xr(l);
    } else
      t === 27 ? (t = Dl, He(l.type) ? (l = Mf, Mf = null, Dl = l) : Dl = t) : Dl = Pl ? Bt(l.stateNode.nextSibling) : null;
    return !0;
  }
  function la() {
    Dl = Pl = null, nl = !1;
  }
  function nc() {
    var l = Ee;
    return l !== null && (yt === null ? yt = l : yt.push.apply(
      yt,
      l
    ), Ee = null), l;
  }
  function Su(l) {
    Ee === null ? Ee = [l] : Ee.push(l);
  }
  var ic = r(null), ta = null, Pt = null;
  function Te(l, t, e) {
    N(ic, t._currentValue), t._currentValue = e;
  }
  function le(l) {
    l._currentValue = ic.current, z(ic);
  }
  function cc(l, t, e) {
    for (; l !== null; ) {
      var a = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === e) break;
      l = l.return;
    }
  }
  function fc(l, t, e, a) {
    var u = l.child;
    for (u !== null && (u.return = l); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var i = u.child;
        n = n.firstContext;
        l: for (; n !== null; ) {
          var c = n;
          n = u;
          for (var s = 0; s < t.length; s++)
            if (c.context === t[s]) {
              n.lanes |= e, c = n.alternate, c !== null && (c.lanes |= e), cc(
                n.return,
                e,
                l
              ), a || (i = null);
              break l;
            }
          n = c.next;
        }
      } else if (u.tag === 18) {
        if (i = u.return, i === null) throw Error(d(341));
        i.lanes |= e, n = i.alternate, n !== null && (n.lanes |= e), cc(i, e, l), i = null;
      } else i = u.child;
      if (i !== null) i.return = u;
      else
        for (i = u; i !== null; ) {
          if (i === l) {
            i = null;
            break;
          }
          if (u = i.sibling, u !== null) {
            u.return = i.return, i = u;
            break;
          }
          i = i.return;
        }
      u = i;
    }
  }
  function Ua(l, t, e, a) {
    l = null;
    for (var u = t, n = !1; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var i = u.alternate;
        if (i === null) throw Error(d(387));
        if (i = i.memoizedProps, i !== null) {
          var c = u.type;
          _t(u.pendingProps.value, i.value) || (l !== null ? l.push(c) : l = [c]);
        }
      } else if (u === P.current) {
        if (i = u.alternate, i === null) throw Error(d(387));
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState && (l !== null ? l.push(Ku) : l = [Ku]);
      }
      u = u.return;
    }
    l !== null && fc(
      t,
      l,
      e,
      a
    ), t.flags |= 262144;
  }
  function Tn(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!_t(
        l.context._currentValue,
        l.memoizedValue
      ))
        return !0;
      l = l.next;
    }
    return !1;
  }
  function ea(l) {
    ta = l, Pt = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function lt(l) {
    return ho(ta, l);
  }
  function zn(l, t) {
    return ta === null && ea(l), ho(l, t);
  }
  function ho(l, t) {
    var e = t._currentValue;
    if (t = { context: t, memoizedValue: e, next: null }, Pt === null) {
      if (l === null) throw Error(d(308));
      Pt = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
    } else Pt = Pt.next = t;
    return e;
  }
  var Km = typeof AbortController < "u" ? AbortController : function() {
    var l = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(e, a) {
        l.push(a);
      }
    };
    this.abort = function() {
      t.aborted = !0, l.forEach(function(e) {
        return e();
      });
    };
  }, Jm = f.unstable_scheduleCallback, wm = f.unstable_NormalPriority, Ll = {
    $$typeof: Ul,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function sc() {
    return {
      controller: new Km(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function bu(l) {
    l.refCount--, l.refCount === 0 && Jm(wm, function() {
      l.controller.abort();
    });
  }
  var Eu = null, oc = 0, ja = 0, Ca = null;
  function Wm(l, t) {
    if (Eu === null) {
      var e = Eu = [];
      oc = 0, ja = mf(), Ca = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return oc++, t.then(go, go), t;
  }
  function go() {
    if (--oc === 0 && Eu !== null) {
      Ca !== null && (Ca.status = "fulfilled");
      var l = Eu;
      Eu = null, ja = 0, Ca = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function $m(l, t) {
    var e = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        e.push(u);
      }
    };
    return l.then(
      function() {
        a.status = "fulfilled", a.value = t;
        for (var u = 0; u < e.length; u++) (0, e[u])(t);
      },
      function(u) {
        for (a.status = "rejected", a.reason = u, u = 0; u < e.length; u++)
          (0, e[u])(void 0);
      }
    ), a;
  }
  var So = S.S;
  S.S = function(l, t) {
    tr = Ol(), typeof t == "object" && t !== null && typeof t.then == "function" && Wm(l, t), So !== null && So(l, t);
  };
  var aa = r(null);
  function dc() {
    var l = aa.current;
    return l !== null ? l : Tl.pooledCache;
  }
  function An(l, t) {
    t === null ? N(aa, aa.current) : N(aa, t.pool);
  }
  function bo() {
    var l = dc();
    return l === null ? null : { parent: Ll._currentValue, pool: l };
  }
  var xa = Error(d(460)), rc = Error(d(474)), pn = Error(d(542)), On = { then: function() {
  } };
  function Eo(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function _o(l, t, e) {
    switch (e = l[e], e === void 0 ? l.push(t) : e !== t && (t.then($t, $t), t = e), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, zo(l), l;
      default:
        if (typeof t.status == "string") t.then($t, $t);
        else {
          if (l = Tl, l !== null && 100 < l.shellSuspendCounter)
            throw Error(d(482));
          l = t, l.status = "pending", l.then(
            function(a) {
              if (t.status === "pending") {
                var u = t;
                u.status = "fulfilled", u.value = a;
              }
            },
            function(a) {
              if (t.status === "pending") {
                var u = t;
                u.status = "rejected", u.reason = a;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw l = t.reason, zo(l), l;
        }
        throw na = t, xa;
    }
  }
  function ua(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (na = e, xa) : e;
    }
  }
  var na = null;
  function To() {
    if (na === null) throw Error(d(459));
    var l = na;
    return na = null, l;
  }
  function zo(l) {
    if (l === xa || l === pn)
      throw Error(d(483));
  }
  var Ha = null, _u = 0;
  function Dn(l) {
    var t = _u;
    return _u += 1, Ha === null && (Ha = []), _o(Ha, l, t);
  }
  function Tu(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function Mn(l, t) {
    throw t.$$typeof === x ? Error(d(525)) : (l = Object.prototype.toString.call(t), Error(
      d(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
      )
    ));
  }
  function Ao(l) {
    function t(v, o) {
      if (l) {
        var m = v.deletions;
        m === null ? (v.deletions = [o], v.flags |= 16) : m.push(o);
      }
    }
    function e(v, o) {
      if (!l) return null;
      for (; o !== null; )
        t(v, o), o = o.sibling;
      return null;
    }
    function a(v) {
      for (var o = /* @__PURE__ */ new Map(); v !== null; )
        v.key !== null ? o.set(v.key, v) : o.set(v.index, v), v = v.sibling;
      return o;
    }
    function u(v, o) {
      return v = kt(v, o), v.index = 0, v.sibling = null, v;
    }
    function n(v, o, m) {
      return v.index = m, l ? (m = v.alternate, m !== null ? (m = m.index, m < o ? (v.flags |= 67108866, o) : m) : (v.flags |= 67108866, o)) : (v.flags |= 1048576, o);
    }
    function i(v) {
      return l && v.alternate === null && (v.flags |= 67108866), v;
    }
    function c(v, o, m, T) {
      return o === null || o.tag !== 6 ? (o = lc(m, v.mode, T), o.return = v, o) : (o = u(o, m), o.return = v, o);
    }
    function s(v, o, m, T) {
      var G = m.type;
      return G === k ? b(
        v,
        o,
        m.props.children,
        T,
        m.key
      ) : o !== null && (o.elementType === G || typeof G == "object" && G !== null && G.$$typeof === ql && ua(G) === o.type) ? (o = u(o, m.props), Tu(o, m), o.return = v, o) : (o = En(
        m.type,
        m.key,
        m.props,
        null,
        v.mode,
        T
      ), Tu(o, m), o.return = v, o);
    }
    function y(v, o, m, T) {
      return o === null || o.tag !== 4 || o.stateNode.containerInfo !== m.containerInfo || o.stateNode.implementation !== m.implementation ? (o = tc(m, v.mode, T), o.return = v, o) : (o = u(o, m.children || []), o.return = v, o);
    }
    function b(v, o, m, T, G) {
      return o === null || o.tag !== 7 ? (o = Pe(
        m,
        v.mode,
        T,
        G
      ), o.return = v, o) : (o = u(o, m), o.return = v, o);
    }
    function A(v, o, m) {
      if (typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint")
        return o = lc(
          "" + o,
          v.mode,
          m
        ), o.return = v, o;
      if (typeof o == "object" && o !== null) {
        switch (o.$$typeof) {
          case $:
            return m = En(
              o.type,
              o.key,
              o.props,
              null,
              v.mode,
              m
            ), Tu(m, o), m.return = v, m;
          case il:
            return o = tc(
              o,
              v.mode,
              m
            ), o.return = v, o;
          case ql:
            return o = ua(o), A(v, o, m);
        }
        if ($l(o) || Yl(o))
          return o = Pe(
            o,
            v.mode,
            m,
            null
          ), o.return = v, o;
        if (typeof o.then == "function")
          return A(v, Dn(o), m);
        if (o.$$typeof === Ul)
          return A(
            v,
            zn(v, o),
            m
          );
        Mn(v, o);
      }
      return null;
    }
    function h(v, o, m, T) {
      var G = o !== null ? o.key : null;
      if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint")
        return G !== null ? null : c(v, o, "" + m, T);
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case $:
            return m.key === G ? s(v, o, m, T) : null;
          case il:
            return m.key === G ? y(v, o, m, T) : null;
          case ql:
            return m = ua(m), h(v, o, m, T);
        }
        if ($l(m) || Yl(m))
          return G !== null ? null : b(v, o, m, T, null);
        if (typeof m.then == "function")
          return h(
            v,
            o,
            Dn(m),
            T
          );
        if (m.$$typeof === Ul)
          return h(
            v,
            o,
            zn(v, m),
            T
          );
        Mn(v, m);
      }
      return null;
    }
    function g(v, o, m, T, G) {
      if (typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint")
        return v = v.get(m) || null, c(o, v, "" + T, G);
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case $:
            return v = v.get(
              T.key === null ? m : T.key
            ) || null, s(o, v, T, G);
          case il:
            return v = v.get(
              T.key === null ? m : T.key
            ) || null, y(o, v, T, G);
          case ql:
            return T = ua(T), g(
              v,
              o,
              m,
              T,
              G
            );
        }
        if ($l(T) || Yl(T))
          return v = v.get(m) || null, b(o, v, T, G, null);
        if (typeof T.then == "function")
          return g(
            v,
            o,
            m,
            Dn(T),
            G
          );
        if (T.$$typeof === Ul)
          return g(
            v,
            o,
            m,
            zn(o, T),
            G
          );
        Mn(o, T);
      }
      return null;
    }
    function j(v, o, m, T) {
      for (var G = null, sl = null, H = o, F = o = 0, al = null; H !== null && F < m.length; F++) {
        H.index > F ? (al = H, H = null) : al = H.sibling;
        var ol = h(
          v,
          H,
          m[F],
          T
        );
        if (ol === null) {
          H === null && (H = al);
          break;
        }
        l && H && ol.alternate === null && t(v, H), o = n(ol, o, F), sl === null ? G = ol : sl.sibling = ol, sl = ol, H = al;
      }
      if (F === m.length)
        return e(v, H), nl && It(v, F), G;
      if (H === null) {
        for (; F < m.length; F++)
          H = A(v, m[F], T), H !== null && (o = n(
            H,
            o,
            F
          ), sl === null ? G = H : sl.sibling = H, sl = H);
        return nl && It(v, F), G;
      }
      for (H = a(H); F < m.length; F++)
        al = g(
          H,
          v,
          F,
          m[F],
          T
        ), al !== null && (l && al.alternate !== null && H.delete(
          al.key === null ? F : al.key
        ), o = n(
          al,
          o,
          F
        ), sl === null ? G = al : sl.sibling = al, sl = al);
      return l && H.forEach(function(Xe) {
        return t(v, Xe);
      }), nl && It(v, F), G;
    }
    function Z(v, o, m, T) {
      if (m == null) throw Error(d(151));
      for (var G = null, sl = null, H = o, F = o = 0, al = null, ol = m.next(); H !== null && !ol.done; F++, ol = m.next()) {
        H.index > F ? (al = H, H = null) : al = H.sibling;
        var Xe = h(v, H, ol.value, T);
        if (Xe === null) {
          H === null && (H = al);
          break;
        }
        l && H && Xe.alternate === null && t(v, H), o = n(Xe, o, F), sl === null ? G = Xe : sl.sibling = Xe, sl = Xe, H = al;
      }
      if (ol.done)
        return e(v, H), nl && It(v, F), G;
      if (H === null) {
        for (; !ol.done; F++, ol = m.next())
          ol = A(v, ol.value, T), ol !== null && (o = n(ol, o, F), sl === null ? G = ol : sl.sibling = ol, sl = ol);
        return nl && It(v, F), G;
      }
      for (H = a(H); !ol.done; F++, ol = m.next())
        ol = g(H, v, F, ol.value, T), ol !== null && (l && ol.alternate !== null && H.delete(ol.key === null ? F : ol.key), o = n(ol, o, F), sl === null ? G = ol : sl.sibling = ol, sl = ol);
      return l && H.forEach(function(iy) {
        return t(v, iy);
      }), nl && It(v, F), G;
    }
    function _l(v, o, m, T) {
      if (typeof m == "object" && m !== null && m.type === k && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case $:
            l: {
              for (var G = m.key; o !== null; ) {
                if (o.key === G) {
                  if (G = m.type, G === k) {
                    if (o.tag === 7) {
                      e(
                        v,
                        o.sibling
                      ), T = u(
                        o,
                        m.props.children
                      ), T.return = v, v = T;
                      break l;
                    }
                  } else if (o.elementType === G || typeof G == "object" && G !== null && G.$$typeof === ql && ua(G) === o.type) {
                    e(
                      v,
                      o.sibling
                    ), T = u(o, m.props), Tu(T, m), T.return = v, v = T;
                    break l;
                  }
                  e(v, o);
                  break;
                } else t(v, o);
                o = o.sibling;
              }
              m.type === k ? (T = Pe(
                m.props.children,
                v.mode,
                T,
                m.key
              ), T.return = v, v = T) : (T = En(
                m.type,
                m.key,
                m.props,
                null,
                v.mode,
                T
              ), Tu(T, m), T.return = v, v = T);
            }
            return i(v);
          case il:
            l: {
              for (G = m.key; o !== null; ) {
                if (o.key === G)
                  if (o.tag === 4 && o.stateNode.containerInfo === m.containerInfo && o.stateNode.implementation === m.implementation) {
                    e(
                      v,
                      o.sibling
                    ), T = u(o, m.children || []), T.return = v, v = T;
                    break l;
                  } else {
                    e(v, o);
                    break;
                  }
                else t(v, o);
                o = o.sibling;
              }
              T = tc(m, v.mode, T), T.return = v, v = T;
            }
            return i(v);
          case ql:
            return m = ua(m), _l(
              v,
              o,
              m,
              T
            );
        }
        if ($l(m))
          return j(
            v,
            o,
            m,
            T
          );
        if (Yl(m)) {
          if (G = Yl(m), typeof G != "function") throw Error(d(150));
          return m = G.call(m), Z(
            v,
            o,
            m,
            T
          );
        }
        if (typeof m.then == "function")
          return _l(
            v,
            o,
            Dn(m),
            T
          );
        if (m.$$typeof === Ul)
          return _l(
            v,
            o,
            zn(v, m),
            T
          );
        Mn(v, m);
      }
      return typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint" ? (m = "" + m, o !== null && o.tag === 6 ? (e(v, o.sibling), T = u(o, m), T.return = v, v = T) : (e(v, o), T = lc(m, v.mode, T), T.return = v, v = T), i(v)) : e(v, o);
    }
    return function(v, o, m, T) {
      try {
        _u = 0;
        var G = _l(
          v,
          o,
          m,
          T
        );
        return Ha = null, G;
      } catch (H) {
        if (H === xa || H === pn) throw H;
        var sl = Tt(29, H, null, v.mode);
        return sl.lanes = T, sl.return = v, sl;
      } finally {
      }
    };
  }
  var ia = Ao(!0), po = Ao(!1), ze = !1;
  function vc(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function mc(l, t) {
    l = l.updateQueue, t.updateQueue === l && (t.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function Ae(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function pe(l, t, e) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (rl & 2) !== 0) {
      var u = a.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), a.pending = t, t = bn(l), co(l, null, e), t;
    }
    return Sn(l, a, t, e), bn(l);
  }
  function zu(l, t, e) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (e & 4194048) !== 0)) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, ys(l, e);
    }
  }
  function yc(l, t) {
    var e = l.updateQueue, a = l.alternate;
    if (a !== null && (a = a.updateQueue, e === a)) {
      var u = null, n = null;
      if (e = e.firstBaseUpdate, e !== null) {
        do {
          var i = {
            lane: e.lane,
            tag: e.tag,
            payload: e.payload,
            callback: null,
            next: null
          };
          n === null ? u = n = i : n = n.next = i, e = e.next;
        } while (e !== null);
        n === null ? u = n = t : n = n.next = t;
      } else u = n = t;
      e = {
        baseState: a.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: n,
        shared: a.shared,
        callbacks: a.callbacks
      }, l.updateQueue = e;
      return;
    }
    l = e.lastBaseUpdate, l === null ? e.firstBaseUpdate = t : l.next = t, e.lastBaseUpdate = t;
  }
  var hc = !1;
  function Au() {
    if (hc) {
      var l = Ca;
      if (l !== null) throw l;
    }
  }
  function pu(l, t, e, a) {
    hc = !1;
    var u = l.updateQueue;
    ze = !1;
    var n = u.firstBaseUpdate, i = u.lastBaseUpdate, c = u.shared.pending;
    if (c !== null) {
      u.shared.pending = null;
      var s = c, y = s.next;
      s.next = null, i === null ? n = y : i.next = y, i = s;
      var b = l.alternate;
      b !== null && (b = b.updateQueue, c = b.lastBaseUpdate, c !== i && (c === null ? b.firstBaseUpdate = y : c.next = y, b.lastBaseUpdate = s));
    }
    if (n !== null) {
      var A = u.baseState;
      i = 0, b = y = s = null, c = n;
      do {
        var h = c.lane & -536870913, g = h !== c.lane;
        if (g ? (el & h) === h : (a & h) === h) {
          h !== 0 && h === ja && (hc = !0), b !== null && (b = b.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          l: {
            var j = l, Z = c;
            h = t;
            var _l = e;
            switch (Z.tag) {
              case 1:
                if (j = Z.payload, typeof j == "function") {
                  A = j.call(_l, A, h);
                  break l;
                }
                A = j;
                break l;
              case 3:
                j.flags = j.flags & -65537 | 128;
              case 0:
                if (j = Z.payload, h = typeof j == "function" ? j.call(_l, A, h) : j, h == null) break l;
                A = D({}, A, h);
                break l;
              case 2:
                ze = !0;
            }
          }
          h = c.callback, h !== null && (l.flags |= 64, g && (l.flags |= 8192), g = u.callbacks, g === null ? u.callbacks = [h] : g.push(h));
        } else
          g = {
            lane: h,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null
          }, b === null ? (y = b = g, s = A) : b = b.next = g, i |= h;
        if (c = c.next, c === null) {
          if (c = u.shared.pending, c === null)
            break;
          g = c, c = g.next, g.next = null, u.lastBaseUpdate = g, u.shared.pending = null;
        }
      } while (!0);
      b === null && (s = A), u.baseState = s, u.firstBaseUpdate = y, u.lastBaseUpdate = b, n === null && (u.shared.lanes = 0), Re |= i, l.lanes = i, l.memoizedState = A;
    }
  }
  function Oo(l, t) {
    if (typeof l != "function")
      throw Error(d(191, l));
    l.call(t);
  }
  function Do(l, t) {
    var e = l.callbacks;
    if (e !== null)
      for (l.callbacks = null, l = 0; l < e.length; l++)
        Oo(e[l], t);
  }
  var qa = r(null), Nn = r(0);
  function Mo(l, t) {
    l = se, N(Nn, l), N(qa, t), se = l | t.baseLanes;
  }
  function gc() {
    N(Nn, se), N(qa, qa.current);
  }
  function Sc() {
    se = Nn.current, z(qa), z(Nn);
  }
  var zt = r(null), qt = null;
  function Oe(l) {
    var t = l.alternate;
    N(Vl, Vl.current & 1), N(zt, l), qt === null && (t === null || qa.current !== null || t.memoizedState !== null) && (qt = l);
  }
  function bc(l) {
    N(Vl, Vl.current), N(zt, l), qt === null && (qt = l);
  }
  function No(l) {
    l.tag === 22 ? (N(Vl, Vl.current), N(zt, l), qt === null && (qt = l)) : De();
  }
  function De() {
    N(Vl, Vl.current), N(zt, zt.current);
  }
  function At(l) {
    z(zt), qt === l && (qt = null), z(Vl);
  }
  var Vl = r(0);
  function Rn(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || Of(e) || Df(e)))
          return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var te = 0, W = null, bl = null, Kl = null, Un = !1, Ba = !1, ca = !1, jn = 0, Ou = 0, Ya = null, Fm = 0;
  function Cl() {
    throw Error(d(321));
  }
  function Ec(l, t) {
    if (t === null) return !1;
    for (var e = 0; e < t.length && e < l.length; e++)
      if (!_t(l[e], t[e])) return !1;
    return !0;
  }
  function _c(l, t, e, a, u, n) {
    return te = n, W = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, S.H = l === null || l.memoizedState === null ? rd : qc, ca = !1, n = e(a, u), ca = !1, Ba && (n = Uo(
      t,
      e,
      a,
      u
    )), Ro(l), n;
  }
  function Ro(l) {
    S.H = Nu;
    var t = bl !== null && bl.next !== null;
    if (te = 0, Kl = bl = W = null, Un = !1, Ou = 0, Ya = null, t) throw Error(d(300));
    l === null || Jl || (l = l.dependencies, l !== null && Tn(l) && (Jl = !0));
  }
  function Uo(l, t, e, a) {
    W = l;
    var u = 0;
    do {
      if (Ba && (Ya = null), Ou = 0, Ba = !1, 25 <= u) throw Error(d(301));
      if (u += 1, Kl = bl = null, l.updateQueue != null) {
        var n = l.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      S.H = vd, n = t(e, a);
    } while (Ba);
    return n;
  }
  function km() {
    var l = S.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? Du(t) : t, l = l.useState()[0], (bl !== null ? bl.memoizedState : null) !== l && (W.flags |= 1024), t;
  }
  function Tc() {
    var l = jn !== 0;
    return jn = 0, l;
  }
  function zc(l, t, e) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~e;
  }
  function Ac(l) {
    if (Un) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      Un = !1;
    }
    te = 0, Kl = bl = W = null, Ba = !1, Ou = jn = 0, Ya = null;
  }
  function it() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Kl === null ? W.memoizedState = Kl = l : Kl = Kl.next = l, Kl;
  }
  function Zl() {
    if (bl === null) {
      var l = W.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = bl.next;
    var t = Kl === null ? W.memoizedState : Kl.next;
    if (t !== null)
      Kl = t, bl = l;
    else {
      if (l === null)
        throw W.alternate === null ? Error(d(467)) : Error(d(310));
      bl = l, l = {
        memoizedState: bl.memoizedState,
        baseState: bl.baseState,
        baseQueue: bl.baseQueue,
        queue: bl.queue,
        next: null
      }, Kl === null ? W.memoizedState = Kl = l : Kl = Kl.next = l;
    }
    return Kl;
  }
  function Cn() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Du(l) {
    var t = Ou;
    return Ou += 1, Ya === null && (Ya = []), l = _o(Ya, l, t), t = W, (Kl === null ? t.memoizedState : Kl.next) === null && (t = t.alternate, S.H = t === null || t.memoizedState === null ? rd : qc), l;
  }
  function xn(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Du(l);
      if (l.$$typeof === Ul) return lt(l);
    }
    throw Error(d(438, String(l)));
  }
  function pc(l) {
    var t = null, e = W.updateQueue;
    if (e !== null && (t = e.memoCache), t == null) {
      var a = W.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), e === null && (e = Cn(), W.updateQueue = e), e.memoCache = t, e = t.data[t.index], e === void 0)
      for (e = t.data[t.index] = Array(l), a = 0; a < l; a++)
        e[a] = gt;
    return t.index++, e;
  }
  function ee(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function Hn(l) {
    var t = Zl();
    return Oc(t, bl, l);
  }
  function Oc(l, t, e) {
    var a = l.queue;
    if (a === null) throw Error(d(311));
    a.lastRenderedReducer = e;
    var u = l.baseQueue, n = a.pending;
    if (n !== null) {
      if (u !== null) {
        var i = u.next;
        u.next = n.next, n.next = i;
      }
      t.baseQueue = u = n, a.pending = null;
    }
    if (n = l.baseState, u === null) l.memoizedState = n;
    else {
      t = u.next;
      var c = i = null, s = null, y = t, b = !1;
      do {
        var A = y.lane & -536870913;
        if (A !== y.lane ? (el & A) === A : (te & A) === A) {
          var h = y.revertLane;
          if (h === 0)
            s !== null && (s = s.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: y.action,
              hasEagerState: y.hasEagerState,
              eagerState: y.eagerState,
              next: null
            }), A === ja && (b = !0);
          else if ((te & h) === h) {
            y = y.next, h === ja && (b = !0);
            continue;
          } else
            A = {
              lane: 0,
              revertLane: y.revertLane,
              gesture: null,
              action: y.action,
              hasEagerState: y.hasEagerState,
              eagerState: y.eagerState,
              next: null
            }, s === null ? (c = s = A, i = n) : s = s.next = A, W.lanes |= h, Re |= h;
          A = y.action, ca && e(n, A), n = y.hasEagerState ? y.eagerState : e(n, A);
        } else
          h = {
            lane: A,
            revertLane: y.revertLane,
            gesture: y.gesture,
            action: y.action,
            hasEagerState: y.hasEagerState,
            eagerState: y.eagerState,
            next: null
          }, s === null ? (c = s = h, i = n) : s = s.next = h, W.lanes |= A, Re |= A;
        y = y.next;
      } while (y !== null && y !== t);
      if (s === null ? i = n : s.next = c, !_t(n, l.memoizedState) && (Jl = !0, b && (e = Ca, e !== null)))
        throw e;
      l.memoizedState = n, l.baseState = i, l.baseQueue = s, a.lastRenderedState = n;
    }
    return u === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function Dc(l) {
    var t = Zl(), e = t.queue;
    if (e === null) throw Error(d(311));
    e.lastRenderedReducer = l;
    var a = e.dispatch, u = e.pending, n = t.memoizedState;
    if (u !== null) {
      e.pending = null;
      var i = u = u.next;
      do
        n = l(n, i.action), i = i.next;
      while (i !== u);
      _t(n, t.memoizedState) || (Jl = !0), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), e.lastRenderedState = n;
    }
    return [n, a];
  }
  function jo(l, t, e) {
    var a = W, u = Zl(), n = nl;
    if (n) {
      if (e === void 0) throw Error(d(407));
      e = e();
    } else e = t();
    var i = !_t(
      (bl || u).memoizedState,
      e
    );
    if (i && (u.memoizedState = e, Jl = !0), u = u.queue, Rc(Ho.bind(null, a, u, l), [
      l
    ]), u.getSnapshot !== t || i || Kl !== null && Kl.memoizedState.tag & 1) {
      if (a.flags |= 2048, Ga(
        9,
        { destroy: void 0 },
        xo.bind(
          null,
          a,
          u,
          e,
          t
        ),
        null
      ), Tl === null) throw Error(d(349));
      n || (te & 127) !== 0 || Co(a, t, e);
    }
    return e;
  }
  function Co(l, t, e) {
    l.flags |= 16384, l = { getSnapshot: t, value: e }, t = W.updateQueue, t === null ? (t = Cn(), W.updateQueue = t, t.stores = [l]) : (e = t.stores, e === null ? t.stores = [l] : e.push(l));
  }
  function xo(l, t, e, a) {
    t.value = e, t.getSnapshot = a, qo(t) && Bo(l);
  }
  function Ho(l, t, e) {
    return e(function() {
      qo(t) && Bo(l);
    });
  }
  function qo(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var e = t();
      return !_t(l, e);
    } catch {
      return !0;
    }
  }
  function Bo(l) {
    var t = Ie(l, 2);
    t !== null && ht(t, l, 2);
  }
  function Mc(l) {
    var t = it();
    if (typeof l == "function") {
      var e = l;
      if (l = e(), ca) {
        he(!0);
        try {
          e();
        } finally {
          he(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = l, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ee,
      lastRenderedState: l
    }, t;
  }
  function Yo(l, t, e, a) {
    return l.baseState = e, Oc(
      l,
      bl,
      typeof a == "function" ? a : ee
    );
  }
  function Im(l, t, e, a, u) {
    if (Yn(l)) throw Error(d(485));
    if (l = t.action, l !== null) {
      var n = {
        payload: u,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(i) {
          n.listeners.push(i);
        }
      };
      S.T !== null ? e(!0) : n.isTransition = !1, a(n), e = t.pending, e === null ? (n.next = t.pending = n, Go(t, n)) : (n.next = e.next, t.pending = e.next = n);
    }
  }
  function Go(l, t) {
    var e = t.action, a = t.payload, u = l.state;
    if (t.isTransition) {
      var n = S.T, i = {};
      S.T = i;
      try {
        var c = e(u, a), s = S.S;
        s !== null && s(i, c), Xo(l, t, c);
      } catch (y) {
        Nc(l, t, y);
      } finally {
        n !== null && i.types !== null && (n.types = i.types), S.T = n;
      }
    } else
      try {
        n = e(u, a), Xo(l, t, n);
      } catch (y) {
        Nc(l, t, y);
      }
  }
  function Xo(l, t, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        Qo(l, t, a);
      },
      function(a) {
        return Nc(l, t, a);
      }
    ) : Qo(l, t, e);
  }
  function Qo(l, t, e) {
    t.status = "fulfilled", t.value = e, Vo(t), l.state = e, t = l.pending, t !== null && (e = t.next, e === t ? l.pending = null : (e = e.next, t.next = e, Go(l, e)));
  }
  function Nc(l, t, e) {
    var a = l.pending;
    if (l.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = e, Vo(t), t = t.next;
      while (t !== a);
    }
    l.action = null;
  }
  function Vo(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function Zo(l, t) {
    return t;
  }
  function Lo(l, t) {
    if (nl) {
      var e = Tl.formState;
      if (e !== null) {
        l: {
          var a = W;
          if (nl) {
            if (Dl) {
              t: {
                for (var u = Dl, n = Ht; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break t;
                  }
                  if (u = Bt(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                n = u.data, u = n === "F!" || n === "F" ? u : null;
              }
              if (u) {
                Dl = Bt(
                  u.nextSibling
                ), a = u.data === "F!";
                break l;
              }
            }
            _e(a);
          }
          a = !1;
        }
        a && (t = e[0]);
      }
    }
    return e = it(), e.memoizedState = e.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Zo,
      lastRenderedState: t
    }, e.queue = a, e = sd.bind(
      null,
      W,
      a
    ), a.dispatch = e, a = Mc(!1), n = Hc.bind(
      null,
      W,
      !1,
      a.queue
    ), a = it(), u = {
      state: t,
      dispatch: null,
      action: l,
      pending: null
    }, a.queue = u, e = Im.bind(
      null,
      W,
      u,
      n,
      e
    ), u.dispatch = e, a.memoizedState = l, [t, e, !1];
  }
  function Ko(l) {
    var t = Zl();
    return Jo(t, bl, l);
  }
  function Jo(l, t, e) {
    if (t = Oc(
      l,
      t,
      Zo
    )[0], l = Hn(ee)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = Du(t);
      } catch (i) {
        throw i === xa ? pn : i;
      }
    else a = t;
    t = Zl();
    var u = t.queue, n = u.dispatch;
    return e !== t.memoizedState && (W.flags |= 2048, Ga(
      9,
      { destroy: void 0 },
      Pm.bind(null, u, e),
      null
    )), [a, n, l];
  }
  function Pm(l, t) {
    l.action = t;
  }
  function wo(l) {
    var t = Zl(), e = bl;
    if (e !== null)
      return Jo(t, e, l);
    Zl(), t = t.memoizedState, e = Zl();
    var a = e.queue.dispatch;
    return e.memoizedState = l, [t, a, !1];
  }
  function Ga(l, t, e, a) {
    return l = { tag: l, create: e, deps: a, inst: t, next: null }, t = W.updateQueue, t === null && (t = Cn(), W.updateQueue = t), e = t.lastEffect, e === null ? t.lastEffect = l.next = l : (a = e.next, e.next = l, l.next = a, t.lastEffect = l), l;
  }
  function Wo() {
    return Zl().memoizedState;
  }
  function qn(l, t, e, a) {
    var u = it();
    W.flags |= l, u.memoizedState = Ga(
      1 | t,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function Bn(l, t, e, a) {
    var u = Zl();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    bl !== null && a !== null && Ec(a, bl.memoizedState.deps) ? u.memoizedState = Ga(t, n, e, a) : (W.flags |= l, u.memoizedState = Ga(
      1 | t,
      n,
      e,
      a
    ));
  }
  function $o(l, t) {
    qn(8390656, 8, l, t);
  }
  function Rc(l, t) {
    Bn(2048, 8, l, t);
  }
  function l0(l) {
    W.flags |= 4;
    var t = W.updateQueue;
    if (t === null)
      t = Cn(), W.updateQueue = t, t.events = [l];
    else {
      var e = t.events;
      e === null ? t.events = [l] : e.push(l);
    }
  }
  function Fo(l) {
    var t = Zl().memoizedState;
    return l0({ ref: t, nextImpl: l }), function() {
      if ((rl & 2) !== 0) throw Error(d(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function ko(l, t) {
    return Bn(4, 2, l, t);
  }
  function Io(l, t) {
    return Bn(4, 4, l, t);
  }
  function Po(l, t) {
    if (typeof t == "function") {
      l = l();
      var e = t(l);
      return function() {
        typeof e == "function" ? e() : t(null);
      };
    }
    if (t != null)
      return l = l(), t.current = l, function() {
        t.current = null;
      };
  }
  function ld(l, t, e) {
    e = e != null ? e.concat([l]) : null, Bn(4, 4, Po.bind(null, t, l), e);
  }
  function Uc() {
  }
  function td(l, t) {
    var e = Zl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    return t !== null && Ec(t, a[1]) ? a[0] : (e.memoizedState = [l, t], l);
  }
  function ed(l, t) {
    var e = Zl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    if (t !== null && Ec(t, a[1]))
      return a[0];
    if (a = l(), ca) {
      he(!0);
      try {
        l();
      } finally {
        he(!1);
      }
    }
    return e.memoizedState = [a, t], a;
  }
  function jc(l, t, e) {
    return e === void 0 || (te & 1073741824) !== 0 && (el & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = e, l = ar(), W.lanes |= l, Re |= l, e);
  }
  function ad(l, t, e, a) {
    return _t(e, t) ? e : qa.current !== null ? (l = jc(l, e, a), _t(l, t) || (Jl = !0), l) : (te & 42) === 0 || (te & 1073741824) !== 0 && (el & 261930) === 0 ? (Jl = !0, l.memoizedState = e) : (l = ar(), W.lanes |= l, Re |= l, t);
  }
  function ud(l, t, e, a, u) {
    var n = R.p;
    R.p = n !== 0 && 8 > n ? n : 8;
    var i = S.T, c = {};
    S.T = c, Hc(l, !1, t, e);
    try {
      var s = u(), y = S.S;
      if (y !== null && y(c, s), s !== null && typeof s == "object" && typeof s.then == "function") {
        var b = $m(
          s,
          a
        );
        Mu(
          l,
          t,
          b,
          Dt(l)
        );
      } else
        Mu(
          l,
          t,
          a,
          Dt(l)
        );
    } catch (A) {
      Mu(
        l,
        t,
        { then: function() {
        }, status: "rejected", reason: A },
        Dt()
      );
    } finally {
      R.p = n, i !== null && c.types !== null && (i.types = c.types), S.T = i;
    }
  }
  function t0() {
  }
  function Cc(l, t, e, a) {
    if (l.tag !== 5) throw Error(d(476));
    var u = nd(l).queue;
    ud(
      l,
      u,
      t,
      Q,
      e === null ? t0 : function() {
        return id(l), e(a);
      }
    );
  }
  function nd(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: Q,
      baseState: Q,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ee,
        lastRenderedState: Q
      },
      next: null
    };
    var e = {};
    return t.next = {
      memoizedState: e,
      baseState: e,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ee,
        lastRenderedState: e
      },
      next: null
    }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
  }
  function id(l) {
    var t = nd(l);
    t.next === null && (t = l.alternate.memoizedState), Mu(
      l,
      t.next.queue,
      {},
      Dt()
    );
  }
  function xc() {
    return lt(Ku);
  }
  function cd() {
    return Zl().memoizedState;
  }
  function fd() {
    return Zl().memoizedState;
  }
  function e0(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var e = Dt();
          l = Ae(e);
          var a = pe(t, l, e);
          a !== null && (ht(a, t, e), zu(a, t, e)), t = { cache: sc() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function a0(l, t, e) {
    var a = Dt();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Yn(l) ? od(t, e) : (e = Ii(l, t, e, a), e !== null && (ht(e, l, a), dd(e, t, a)));
  }
  function sd(l, t, e) {
    var a = Dt();
    Mu(l, t, e, a);
  }
  function Mu(l, t, e, a) {
    var u = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Yn(l)) od(t, u);
    else {
      var n = l.alternate;
      if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null))
        try {
          var i = t.lastRenderedState, c = n(i, e);
          if (u.hasEagerState = !0, u.eagerState = c, _t(c, i))
            return Sn(l, t, u, 0), Tl === null && gn(), !1;
        } catch {
        } finally {
        }
      if (e = Ii(l, t, u, a), e !== null)
        return ht(e, l, a), dd(e, t, a), !0;
    }
    return !1;
  }
  function Hc(l, t, e, a) {
    if (a = {
      lane: 2,
      revertLane: mf(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Yn(l)) {
      if (t) throw Error(d(479));
    } else
      t = Ii(
        l,
        e,
        a,
        2
      ), t !== null && ht(t, l, 2);
  }
  function Yn(l) {
    var t = l.alternate;
    return l === W || t !== null && t === W;
  }
  function od(l, t) {
    Ba = Un = !0;
    var e = l.pending;
    e === null ? t.next = t : (t.next = e.next, e.next = t), l.pending = t;
  }
  function dd(l, t, e) {
    if ((e & 4194048) !== 0) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, ys(l, e);
    }
  }
  var Nu = {
    readContext: lt,
    use: xn,
    useCallback: Cl,
    useContext: Cl,
    useEffect: Cl,
    useImperativeHandle: Cl,
    useLayoutEffect: Cl,
    useInsertionEffect: Cl,
    useMemo: Cl,
    useReducer: Cl,
    useRef: Cl,
    useState: Cl,
    useDebugValue: Cl,
    useDeferredValue: Cl,
    useTransition: Cl,
    useSyncExternalStore: Cl,
    useId: Cl,
    useHostTransitionStatus: Cl,
    useFormState: Cl,
    useActionState: Cl,
    useOptimistic: Cl,
    useMemoCache: Cl,
    useCacheRefresh: Cl
  };
  Nu.useEffectEvent = Cl;
  var rd = {
    readContext: lt,
    use: xn,
    useCallback: function(l, t) {
      return it().memoizedState = [
        l,
        t === void 0 ? null : t
      ], l;
    },
    useContext: lt,
    useEffect: $o,
    useImperativeHandle: function(l, t, e) {
      e = e != null ? e.concat([l]) : null, qn(
        4194308,
        4,
        Po.bind(null, t, l),
        e
      );
    },
    useLayoutEffect: function(l, t) {
      return qn(4194308, 4, l, t);
    },
    useInsertionEffect: function(l, t) {
      qn(4, 2, l, t);
    },
    useMemo: function(l, t) {
      var e = it();
      t = t === void 0 ? null : t;
      var a = l();
      if (ca) {
        he(!0);
        try {
          l();
        } finally {
          he(!1);
        }
      }
      return e.memoizedState = [a, t], a;
    },
    useReducer: function(l, t, e) {
      var a = it();
      if (e !== void 0) {
        var u = e(t);
        if (ca) {
          he(!0);
          try {
            e(t);
          } finally {
            he(!1);
          }
        }
      } else u = t;
      return a.memoizedState = a.baseState = u, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: u
      }, a.queue = l, l = l.dispatch = a0.bind(
        null,
        W,
        l
      ), [a.memoizedState, l];
    },
    useRef: function(l) {
      var t = it();
      return l = { current: l }, t.memoizedState = l;
    },
    useState: function(l) {
      l = Mc(l);
      var t = l.queue, e = sd.bind(null, W, t);
      return t.dispatch = e, [l.memoizedState, e];
    },
    useDebugValue: Uc,
    useDeferredValue: function(l, t) {
      var e = it();
      return jc(e, l, t);
    },
    useTransition: function() {
      var l = Mc(!1);
      return l = ud.bind(
        null,
        W,
        l.queue,
        !0,
        !1
      ), it().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, t, e) {
      var a = W, u = it();
      if (nl) {
        if (e === void 0)
          throw Error(d(407));
        e = e();
      } else {
        if (e = t(), Tl === null)
          throw Error(d(349));
        (el & 127) !== 0 || Co(a, t, e);
      }
      u.memoizedState = e;
      var n = { value: e, getSnapshot: t };
      return u.queue = n, $o(Ho.bind(null, a, n, l), [
        l
      ]), a.flags |= 2048, Ga(
        9,
        { destroy: void 0 },
        xo.bind(
          null,
          a,
          n,
          e,
          t
        ),
        null
      ), e;
    },
    useId: function() {
      var l = it(), t = Tl.identifierPrefix;
      if (nl) {
        var e = Zt, a = Vt;
        e = (a & ~(1 << 32 - Et(a) - 1)).toString(32) + e, t = "_" + t + "R_" + e, e = jn++, 0 < e && (t += "H" + e.toString(32)), t += "_";
      } else
        e = Fm++, t = "_" + t + "r_" + e.toString(32) + "_";
      return l.memoizedState = t;
    },
    useHostTransitionStatus: xc,
    useFormState: Lo,
    useActionState: Lo,
    useOptimistic: function(l) {
      var t = it();
      t.memoizedState = t.baseState = l;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = e, t = Hc.bind(
        null,
        W,
        !0,
        e
      ), e.dispatch = t, [l, t];
    },
    useMemoCache: pc,
    useCacheRefresh: function() {
      return it().memoizedState = e0.bind(
        null,
        W
      );
    },
    useEffectEvent: function(l) {
      var t = it(), e = { impl: l };
      return t.memoizedState = e, function() {
        if ((rl & 2) !== 0)
          throw Error(d(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, qc = {
    readContext: lt,
    use: xn,
    useCallback: td,
    useContext: lt,
    useEffect: Rc,
    useImperativeHandle: ld,
    useInsertionEffect: ko,
    useLayoutEffect: Io,
    useMemo: ed,
    useReducer: Hn,
    useRef: Wo,
    useState: function() {
      return Hn(ee);
    },
    useDebugValue: Uc,
    useDeferredValue: function(l, t) {
      var e = Zl();
      return ad(
        e,
        bl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = Hn(ee)[0], t = Zl().memoizedState;
      return [
        typeof l == "boolean" ? l : Du(l),
        t
      ];
    },
    useSyncExternalStore: jo,
    useId: cd,
    useHostTransitionStatus: xc,
    useFormState: Ko,
    useActionState: Ko,
    useOptimistic: function(l, t) {
      var e = Zl();
      return Yo(e, bl, l, t);
    },
    useMemoCache: pc,
    useCacheRefresh: fd
  };
  qc.useEffectEvent = Fo;
  var vd = {
    readContext: lt,
    use: xn,
    useCallback: td,
    useContext: lt,
    useEffect: Rc,
    useImperativeHandle: ld,
    useInsertionEffect: ko,
    useLayoutEffect: Io,
    useMemo: ed,
    useReducer: Dc,
    useRef: Wo,
    useState: function() {
      return Dc(ee);
    },
    useDebugValue: Uc,
    useDeferredValue: function(l, t) {
      var e = Zl();
      return bl === null ? jc(e, l, t) : ad(
        e,
        bl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = Dc(ee)[0], t = Zl().memoizedState;
      return [
        typeof l == "boolean" ? l : Du(l),
        t
      ];
    },
    useSyncExternalStore: jo,
    useId: cd,
    useHostTransitionStatus: xc,
    useFormState: wo,
    useActionState: wo,
    useOptimistic: function(l, t) {
      var e = Zl();
      return bl !== null ? Yo(e, bl, l, t) : (e.baseState = l, [l, e.queue.dispatch]);
    },
    useMemoCache: pc,
    useCacheRefresh: fd
  };
  vd.useEffectEvent = Fo;
  function Bc(l, t, e, a) {
    t = l.memoizedState, e = e(a, t), e = e == null ? t : D({}, t, e), l.memoizedState = e, l.lanes === 0 && (l.updateQueue.baseState = e);
  }
  var Yc = {
    enqueueSetState: function(l, t, e) {
      l = l._reactInternals;
      var a = Dt(), u = Ae(a);
      u.payload = t, e != null && (u.callback = e), t = pe(l, u, a), t !== null && (ht(t, l, a), zu(t, l, a));
    },
    enqueueReplaceState: function(l, t, e) {
      l = l._reactInternals;
      var a = Dt(), u = Ae(a);
      u.tag = 1, u.payload = t, e != null && (u.callback = e), t = pe(l, u, a), t !== null && (ht(t, l, a), zu(t, l, a));
    },
    enqueueForceUpdate: function(l, t) {
      l = l._reactInternals;
      var e = Dt(), a = Ae(e);
      a.tag = 2, t != null && (a.callback = t), t = pe(l, a, e), t !== null && (ht(t, l, e), zu(t, l, e));
    }
  };
  function md(l, t, e, a, u, n, i) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, n, i) : t.prototype && t.prototype.isPureReactComponent ? !yu(e, a) || !yu(u, n) : !0;
  }
  function yd(l, t, e, a) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(e, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(e, a), t.state !== l && Yc.enqueueReplaceState(t, t.state, null);
  }
  function fa(l, t) {
    var e = t;
    if ("ref" in t) {
      e = {};
      for (var a in t)
        a !== "ref" && (e[a] = t[a]);
    }
    if (l = l.defaultProps) {
      e === t && (e = D({}, e));
      for (var u in l)
        e[u] === void 0 && (e[u] = l[u]);
    }
    return e;
  }
  function hd(l) {
    hn(l);
  }
  function gd(l) {
    console.error(l);
  }
  function Sd(l) {
    hn(l);
  }
  function Gn(l, t) {
    try {
      var e = l.onUncaughtError;
      e(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function bd(l, t, e) {
    try {
      var a = l.onCaughtError;
      a(e.value, {
        componentStack: e.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function Gc(l, t, e) {
    return e = Ae(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      Gn(l, t);
    }, e;
  }
  function Ed(l) {
    return l = Ae(l), l.tag = 3, l;
  }
  function _d(l, t, e, a) {
    var u = e.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = a.value;
      l.payload = function() {
        return u(n);
      }, l.callback = function() {
        bd(t, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (l.callback = function() {
      bd(t, e, a), typeof u != "function" && (Ue === null ? Ue = /* @__PURE__ */ new Set([this]) : Ue.add(this));
      var c = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: c !== null ? c : ""
      });
    });
  }
  function u0(l, t, e, a, u) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = e.alternate, t !== null && Ua(
        t,
        e,
        u,
        !0
      ), e = zt.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return qt === null ? kn() : e.alternate === null && xl === 0 && (xl = 3), e.flags &= -257, e.flags |= 65536, e.lanes = u, a === On ? e.flags |= 16384 : (t = e.updateQueue, t === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), df(l, a, u)), !1;
          case 22:
            return e.flags |= 65536, a === On ? e.flags |= 16384 : (t = e.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = t) : (e = t.retryQueue, e === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), df(l, a, u)), !1;
        }
        throw Error(d(435, e.tag));
      }
      return df(l, a, u), kn(), !1;
    }
    if (nl)
      return t = zt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, a !== uc && (l = Error(d(422), { cause: a }), Su(jt(l, e)))) : (a !== uc && (t = Error(d(423), {
        cause: a
      }), Su(
        jt(t, e)
      )), l = l.current.alternate, l.flags |= 65536, u &= -u, l.lanes |= u, a = jt(a, e), u = Gc(
        l.stateNode,
        a,
        u
      ), yc(l, u), xl !== 4 && (xl = 2)), !1;
    var n = Error(d(520), { cause: a });
    if (n = jt(n, e), Bu === null ? Bu = [n] : Bu.push(n), xl !== 4 && (xl = 2), t === null) return !0;
    a = jt(a, e), e = t;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, l = u & -u, e.lanes |= l, l = Gc(e.stateNode, a, l), yc(e, l), !1;
        case 1:
          if (t = e.type, n = e.stateNode, (e.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (Ue === null || !Ue.has(n))))
            return e.flags |= 65536, u &= -u, e.lanes |= u, u = Ed(u), _d(
              u,
              l,
              e,
              a
            ), yc(e, u), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var Xc = Error(d(461)), Jl = !1;
  function tt(l, t, e, a) {
    t.child = l === null ? po(t, null, e, a) : ia(
      t,
      l.child,
      e,
      a
    );
  }
  function Td(l, t, e, a, u) {
    e = e.render;
    var n = t.ref;
    if ("ref" in a) {
      var i = {};
      for (var c in a)
        c !== "ref" && (i[c] = a[c]);
    } else i = a;
    return ea(t), a = _c(
      l,
      t,
      e,
      i,
      n,
      u
    ), c = Tc(), l !== null && !Jl ? (zc(l, t, u), ae(l, t, u)) : (nl && c && ec(t), t.flags |= 1, tt(l, t, a, u), t.child);
  }
  function zd(l, t, e, a, u) {
    if (l === null) {
      var n = e.type;
      return typeof n == "function" && !Pi(n) && n.defaultProps === void 0 && e.compare === null ? (t.tag = 15, t.type = n, Ad(
        l,
        t,
        n,
        a,
        u
      )) : (l = En(
        e.type,
        null,
        a,
        t,
        t.mode,
        u
      ), l.ref = t.ref, l.return = t, t.child = l);
    }
    if (n = l.child, !Wc(l, u)) {
      var i = n.memoizedProps;
      if (e = e.compare, e = e !== null ? e : yu, e(i, a) && l.ref === t.ref)
        return ae(l, t, u);
    }
    return t.flags |= 1, l = kt(n, a), l.ref = t.ref, l.return = t, t.child = l;
  }
  function Ad(l, t, e, a, u) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (yu(n, a) && l.ref === t.ref)
        if (Jl = !1, t.pendingProps = a = n, Wc(l, u))
          (l.flags & 131072) !== 0 && (Jl = !0);
        else
          return t.lanes = l.lanes, ae(l, t, u);
    }
    return Qc(
      l,
      t,
      e,
      a,
      u
    );
  }
  function pd(l, t, e, a) {
    var u = a.children, n = l !== null ? l.memoizedState : null;
    if (l === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (n = n !== null ? n.baseLanes | e : e, l !== null) {
          for (a = t.child = l.child, u = 0; a !== null; )
            u = u | a.lanes | a.childLanes, a = a.sibling;
          a = u & ~n;
        } else a = 0, t.child = null;
        return Od(
          l,
          t,
          n,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && An(
          t,
          n !== null ? n.cachePool : null
        ), n !== null ? Mo(t, n) : gc(), No(t);
      else
        return a = t.lanes = 536870912, Od(
          l,
          t,
          n !== null ? n.baseLanes | e : e,
          e,
          a
        );
    } else
      n !== null ? (An(t, n.cachePool), Mo(t, n), De(), t.memoizedState = null) : (l !== null && An(t, null), gc(), De());
    return tt(l, t, u, e), t.child;
  }
  function Ru(l, t) {
    return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Od(l, t, e, a, u) {
    var n = dc();
    return n = n === null ? null : { parent: Ll._currentValue, pool: n }, t.memoizedState = {
      baseLanes: e,
      cachePool: n
    }, l !== null && An(t, null), gc(), No(t), l !== null && Ua(l, t, a, !0), t.childLanes = u, null;
  }
  function Xn(l, t) {
    return t = Vn(
      { mode: t.mode, children: t.children },
      l.mode
    ), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function Dd(l, t, e) {
    return ia(t, l.child, null, e), l = Xn(t, t.pendingProps), l.flags |= 2, At(t), t.memoizedState = null, l;
  }
  function n0(l, t, e) {
    var a = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (nl) {
        if (a.mode === "hidden")
          return l = Xn(t, a), t.lanes = 536870912, Ru(null, l);
        if (bc(t), (l = Dl) ? (l = Gr(
          l,
          Ht
        ), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: be !== null ? { id: Vt, overflow: Zt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = so(l), e.return = t, t.child = e, Pl = t, Dl = null)) : l = null, l === null) throw _e(t);
        return t.lanes = 536870912, null;
      }
      return Xn(t, a);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var i = n.dehydrated;
      if (bc(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = Dd(
            l,
            t,
            e
          );
        else if (t.memoizedState !== null)
          t.child = l.child, t.flags |= 128, t = null;
        else throw Error(d(558));
      else if (Jl || Ua(l, t, e, !1), u = (e & l.childLanes) !== 0, Jl || u) {
        if (a = Tl, a !== null && (i = hs(a, e), i !== 0 && i !== n.retryLane))
          throw n.retryLane = i, Ie(l, i), ht(a, l, i), Xc;
        kn(), t = Dd(
          l,
          t,
          e
        );
      } else
        l = n.treeContext, Dl = Bt(i.nextSibling), Pl = t, nl = !0, Ee = null, Ht = !1, l !== null && vo(t, l), t = Xn(t, a), t.flags |= 4096;
      return t;
    }
    return l = kt(l.child, {
      mode: a.mode,
      children: a.children
    }), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function Qn(l, t) {
    var e = t.ref;
    if (e === null)
      l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(d(284));
      (l === null || l.ref !== e) && (t.flags |= 4194816);
    }
  }
  function Qc(l, t, e, a, u) {
    return ea(t), e = _c(
      l,
      t,
      e,
      a,
      void 0,
      u
    ), a = Tc(), l !== null && !Jl ? (zc(l, t, u), ae(l, t, u)) : (nl && a && ec(t), t.flags |= 1, tt(l, t, e, u), t.child);
  }
  function Md(l, t, e, a, u, n) {
    return ea(t), t.updateQueue = null, e = Uo(
      t,
      a,
      e,
      u
    ), Ro(l), a = Tc(), l !== null && !Jl ? (zc(l, t, n), ae(l, t, n)) : (nl && a && ec(t), t.flags |= 1, tt(l, t, e, n), t.child);
  }
  function Nd(l, t, e, a, u) {
    if (ea(t), t.stateNode === null) {
      var n = Da, i = e.contextType;
      typeof i == "object" && i !== null && (n = lt(i)), n = new e(a, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = Yc, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = a, n.state = t.memoizedState, n.refs = {}, vc(t), i = e.contextType, n.context = typeof i == "object" && i !== null ? lt(i) : Da, n.state = t.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (Bc(
        t,
        e,
        i,
        a
      ), n.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (i = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), i !== n.state && Yc.enqueueReplaceState(n, n.state, null), pu(t, a, n, u), Au(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (l === null) {
      n = t.stateNode;
      var c = t.memoizedProps, s = fa(e, c);
      n.props = s;
      var y = n.context, b = e.contextType;
      i = Da, typeof b == "object" && b !== null && (i = lt(b));
      var A = e.getDerivedStateFromProps;
      b = typeof A == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = t.pendingProps !== c, b || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || y !== i) && yd(
        t,
        n,
        a,
        i
      ), ze = !1;
      var h = t.memoizedState;
      n.state = h, pu(t, a, n, u), Au(), y = t.memoizedState, c || h !== y || ze ? (typeof A == "function" && (Bc(
        t,
        e,
        A,
        a
      ), y = t.memoizedState), (s = ze || md(
        t,
        e,
        s,
        a,
        h,
        y,
        i
      )) ? (b || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = y), n.props = a, n.state = y, n.context = i, a = s) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      n = t.stateNode, mc(l, t), i = t.memoizedProps, b = fa(e, i), n.props = b, A = t.pendingProps, h = n.context, y = e.contextType, s = Da, typeof y == "object" && y !== null && (s = lt(y)), c = e.getDerivedStateFromProps, (y = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i !== A || h !== s) && yd(
        t,
        n,
        a,
        s
      ), ze = !1, h = t.memoizedState, n.state = h, pu(t, a, n, u), Au();
      var g = t.memoizedState;
      i !== A || h !== g || ze || l !== null && l.dependencies !== null && Tn(l.dependencies) ? (typeof c == "function" && (Bc(
        t,
        e,
        c,
        a
      ), g = t.memoizedState), (b = ze || md(
        t,
        e,
        b,
        a,
        h,
        g,
        s
      ) || l !== null && l.dependencies !== null && Tn(l.dependencies)) ? (y || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, g, s), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        a,
        g,
        s
      )), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || i === l.memoizedProps && h === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && h === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = g), n.props = a, n.state = g, n.context = s, a = b) : (typeof n.componentDidUpdate != "function" || i === l.memoizedProps && h === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && h === l.memoizedState || (t.flags |= 1024), a = !1);
    }
    return n = a, Qn(l, t), a = (t.flags & 128) !== 0, n || a ? (n = t.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && a ? (t.child = ia(
      t,
      l.child,
      null,
      u
    ), t.child = ia(
      t,
      null,
      e,
      u
    )) : tt(l, t, e, u), t.memoizedState = n.state, l = t.child) : l = ae(
      l,
      t,
      u
    ), l;
  }
  function Rd(l, t, e, a) {
    return la(), t.flags |= 256, tt(l, t, e, a), t.child;
  }
  var Vc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Zc(l) {
    return { baseLanes: l, cachePool: bo() };
  }
  function Lc(l, t, e) {
    return l = l !== null ? l.childLanes & ~e : 0, t && (l |= Ot), l;
  }
  function Ud(l, t, e) {
    var a = t.pendingProps, u = !1, n = (t.flags & 128) !== 0, i;
    if ((i = n) || (i = l !== null && l.memoizedState === null ? !1 : (Vl.current & 2) !== 0), i && (u = !0, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (nl) {
        if (u ? Oe(t) : De(), (l = Dl) ? (l = Gr(
          l,
          Ht
        ), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: be !== null ? { id: Vt, overflow: Zt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = so(l), e.return = t, t.child = e, Pl = t, Dl = null)) : l = null, l === null) throw _e(t);
        return Df(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var c = a.children;
      return a = a.fallback, u ? (De(), u = t.mode, c = Vn(
        { mode: "hidden", children: c },
        u
      ), a = Pe(
        a,
        u,
        e,
        null
      ), c.return = t, a.return = t, c.sibling = a, t.child = c, a = t.child, a.memoizedState = Zc(e), a.childLanes = Lc(
        l,
        i,
        e
      ), t.memoizedState = Vc, Ru(null, a)) : (Oe(t), Kc(t, c));
    }
    var s = l.memoizedState;
    if (s !== null && (c = s.dehydrated, c !== null)) {
      if (n)
        t.flags & 256 ? (Oe(t), t.flags &= -257, t = Jc(
          l,
          t,
          e
        )) : t.memoizedState !== null ? (De(), t.child = l.child, t.flags |= 128, t = null) : (De(), c = a.fallback, u = t.mode, a = Vn(
          { mode: "visible", children: a.children },
          u
        ), c = Pe(
          c,
          u,
          e,
          null
        ), c.flags |= 2, a.return = t, c.return = t, a.sibling = c, t.child = a, ia(
          t,
          l.child,
          null,
          e
        ), a = t.child, a.memoizedState = Zc(e), a.childLanes = Lc(
          l,
          i,
          e
        ), t.memoizedState = Vc, t = Ru(null, a));
      else if (Oe(t), Df(c)) {
        if (i = c.nextSibling && c.nextSibling.dataset, i) var y = i.dgst;
        i = y, a = Error(d(419)), a.stack = "", a.digest = i, Su({ value: a, source: null, stack: null }), t = Jc(
          l,
          t,
          e
        );
      } else if (Jl || Ua(l, t, e, !1), i = (e & l.childLanes) !== 0, Jl || i) {
        if (i = Tl, i !== null && (a = hs(i, e), a !== 0 && a !== s.retryLane))
          throw s.retryLane = a, Ie(l, a), ht(i, l, a), Xc;
        Of(c) || kn(), t = Jc(
          l,
          t,
          e
        );
      } else
        Of(c) ? (t.flags |= 192, t.child = l.child, t = null) : (l = s.treeContext, Dl = Bt(
          c.nextSibling
        ), Pl = t, nl = !0, Ee = null, Ht = !1, l !== null && vo(t, l), t = Kc(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (De(), c = a.fallback, u = t.mode, s = l.child, y = s.sibling, a = kt(s, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = s.subtreeFlags & 65011712, y !== null ? c = kt(
      y,
      c
    ) : (c = Pe(
      c,
      u,
      e,
      null
    ), c.flags |= 2), c.return = t, a.return = t, a.sibling = c, t.child = a, Ru(null, a), a = t.child, c = l.child.memoizedState, c === null ? c = Zc(e) : (u = c.cachePool, u !== null ? (s = Ll._currentValue, u = u.parent !== s ? { parent: s, pool: s } : u) : u = bo(), c = {
      baseLanes: c.baseLanes | e,
      cachePool: u
    }), a.memoizedState = c, a.childLanes = Lc(
      l,
      i,
      e
    ), t.memoizedState = Vc, Ru(l.child, a)) : (Oe(t), e = l.child, l = e.sibling, e = kt(e, {
      mode: "visible",
      children: a.children
    }), e.return = t, e.sibling = null, l !== null && (i = t.deletions, i === null ? (t.deletions = [l], t.flags |= 16) : i.push(l)), t.child = e, t.memoizedState = null, e);
  }
  function Kc(l, t) {
    return t = Vn(
      { mode: "visible", children: t },
      l.mode
    ), t.return = l, l.child = t;
  }
  function Vn(l, t) {
    return l = Tt(22, l, null, t), l.lanes = 0, l;
  }
  function Jc(l, t, e) {
    return ia(t, l.child, null, e), l = Kc(
      t,
      t.pendingProps.children
    ), l.flags |= 2, t.memoizedState = null, l;
  }
  function jd(l, t, e) {
    l.lanes |= t;
    var a = l.alternate;
    a !== null && (a.lanes |= t), cc(l.return, t, e);
  }
  function wc(l, t, e, a, u, n) {
    var i = l.memoizedState;
    i === null ? l.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: e,
      tailMode: u,
      treeForkCount: n
    } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = a, i.tail = e, i.tailMode = u, i.treeForkCount = n);
  }
  function Cd(l, t, e) {
    var a = t.pendingProps, u = a.revealOrder, n = a.tail;
    a = a.children;
    var i = Vl.current, c = (i & 2) !== 0;
    if (c ? (i = i & 1 | 2, t.flags |= 128) : i &= 1, N(Vl, i), tt(l, t, a, e), a = nl ? gu : 0, !c && l !== null && (l.flags & 128) !== 0)
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && jd(l, e, t);
        else if (l.tag === 19)
          jd(l, e, t);
        else if (l.child !== null) {
          l.child.return = l, l = l.child;
          continue;
        }
        if (l === t) break l;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t)
            break l;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    switch (u) {
      case "forwards":
        for (e = t.child, u = null; e !== null; )
          l = e.alternate, l !== null && Rn(l) === null && (u = e), e = e.sibling;
        e = u, e === null ? (u = t.child, t.child = null) : (u = e.sibling, e.sibling = null), wc(
          t,
          !1,
          u,
          e,
          n,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (e = null, u = t.child, t.child = null; u !== null; ) {
          if (l = u.alternate, l !== null && Rn(l) === null) {
            t.child = u;
            break;
          }
          l = u.sibling, u.sibling = e, e = u, u = l;
        }
        wc(
          t,
          !0,
          e,
          null,
          n,
          a
        );
        break;
      case "together":
        wc(
          t,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function ae(l, t, e) {
    if (l !== null && (t.dependencies = l.dependencies), Re |= t.lanes, (e & t.childLanes) === 0)
      if (l !== null) {
        if (Ua(
          l,
          t,
          e,
          !1
        ), (e & t.childLanes) === 0)
          return null;
      } else return null;
    if (l !== null && t.child !== l.child)
      throw Error(d(153));
    if (t.child !== null) {
      for (l = t.child, e = kt(l, l.pendingProps), t.child = e, e.return = t; l.sibling !== null; )
        l = l.sibling, e = e.sibling = kt(l, l.pendingProps), e.return = t;
      e.sibling = null;
    }
    return t.child;
  }
  function Wc(l, t) {
    return (l.lanes & t) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && Tn(l)));
  }
  function i0(l, t, e) {
    switch (t.tag) {
      case 3:
        Xl(t, t.stateNode.containerInfo), Te(t, Ll, l.memoizedState.cache), la();
        break;
      case 27:
      case 5:
        me(t);
        break;
      case 4:
        Xl(t, t.stateNode.containerInfo);
        break;
      case 10:
        Te(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, bc(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (Oe(t), t.flags |= 128, null) : (e & t.child.childLanes) !== 0 ? Ud(l, t, e) : (Oe(t), l = ae(
            l,
            t,
            e
          ), l !== null ? l.sibling : null);
        Oe(t);
        break;
      case 19:
        var u = (l.flags & 128) !== 0;
        if (a = (e & t.childLanes) !== 0, a || (Ua(
          l,
          t,
          e,
          !1
        ), a = (e & t.childLanes) !== 0), u) {
          if (a)
            return Cd(
              l,
              t,
              e
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), N(Vl, Vl.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, pd(
          l,
          t,
          e,
          t.pendingProps
        );
      case 24:
        Te(t, Ll, l.memoizedState.cache);
    }
    return ae(l, t, e);
  }
  function xd(l, t, e) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps)
        Jl = !0;
      else {
        if (!Wc(l, e) && (t.flags & 128) === 0)
          return Jl = !1, i0(
            l,
            t,
            e
          );
        Jl = (l.flags & 131072) !== 0;
      }
    else
      Jl = !1, nl && (t.flags & 1048576) !== 0 && ro(t, gu, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (l = ua(t.elementType), t.type = l, typeof l == "function")
            Pi(l) ? (a = fa(l, a), t.tag = 1, t = Nd(
              null,
              t,
              l,
              a,
              e
            )) : (t.tag = 0, t = Qc(
              null,
              t,
              l,
              a,
              e
            ));
          else {
            if (l != null) {
              var u = l.$$typeof;
              if (u === I) {
                t.tag = 11, t = Td(
                  null,
                  t,
                  l,
                  a,
                  e
                );
                break l;
              } else if (u === L) {
                t.tag = 14, t = zd(
                  null,
                  t,
                  l,
                  a,
                  e
                );
                break l;
              }
            }
            throw t = Gl(l) || l, Error(d(306, t, ""));
          }
        }
        return t;
      case 0:
        return Qc(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 1:
        return a = t.type, u = fa(
          a,
          t.pendingProps
        ), Nd(
          l,
          t,
          a,
          u,
          e
        );
      case 3:
        l: {
          if (Xl(
            t,
            t.stateNode.containerInfo
          ), l === null) throw Error(d(387));
          a = t.pendingProps;
          var n = t.memoizedState;
          u = n.element, mc(l, t), pu(t, a, null, e);
          var i = t.memoizedState;
          if (a = i.cache, Te(t, Ll, a), a !== n.cache && fc(
            t,
            [Ll],
            e,
            !0
          ), Au(), a = i.element, n.isDehydrated)
            if (n = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
              t = Rd(
                l,
                t,
                a,
                e
              );
              break l;
            } else if (a !== u) {
              u = jt(
                Error(d(424)),
                t
              ), Su(u), t = Rd(
                l,
                t,
                a,
                e
              );
              break l;
            } else {
              switch (l = t.stateNode.containerInfo, l.nodeType) {
                case 9:
                  l = l.body;
                  break;
                default:
                  l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
              }
              for (Dl = Bt(l.firstChild), Pl = t, nl = !0, Ee = null, Ht = !0, e = po(
                t,
                null,
                a,
                e
              ), t.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
            }
          else {
            if (la(), a === u) {
              t = ae(
                l,
                t,
                e
              );
              break l;
            }
            tt(l, t, a, e);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Qn(l, t), l === null ? (e = Kr(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = e : nl || (e = t.type, l = t.pendingProps, a = ui(
          w.current
        ).createElement(e), a[Il] = t, a[ot] = l, et(a, e, l), Fl(a), t.stateNode = a) : t.memoizedState = Kr(
          t.type,
          l.memoizedProps,
          t.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return me(t), l === null && nl && (a = t.stateNode = Vr(
          t.type,
          t.pendingProps,
          w.current
        ), Pl = t, Ht = !0, u = Dl, He(t.type) ? (Mf = u, Dl = Bt(a.firstChild)) : Dl = u), tt(
          l,
          t,
          t.pendingProps.children,
          e
        ), Qn(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && nl && ((u = a = Dl) && (a = q0(
          a,
          t.type,
          t.pendingProps,
          Ht
        ), a !== null ? (t.stateNode = a, Pl = t, Dl = Bt(a.firstChild), Ht = !1, u = !0) : u = !1), u || _e(t)), me(t), u = t.type, n = t.pendingProps, i = l !== null ? l.memoizedProps : null, a = n.children, zf(u, n) ? a = null : i !== null && zf(u, i) && (t.flags |= 32), t.memoizedState !== null && (u = _c(
          l,
          t,
          km,
          null,
          null,
          e
        ), Ku._currentValue = u), Qn(l, t), tt(l, t, a, e), t.child;
      case 6:
        return l === null && nl && ((l = e = Dl) && (e = B0(
          e,
          t.pendingProps,
          Ht
        ), e !== null ? (t.stateNode = e, Pl = t, Dl = null, l = !0) : l = !1), l || _e(t)), null;
      case 13:
        return Ud(l, t, e);
      case 4:
        return Xl(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, l === null ? t.child = ia(
          t,
          null,
          a,
          e
        ) : tt(l, t, a, e), t.child;
      case 11:
        return Td(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 7:
        return tt(
          l,
          t,
          t.pendingProps,
          e
        ), t.child;
      case 8:
        return tt(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 12:
        return tt(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 10:
        return a = t.pendingProps, Te(t, t.type, a.value), tt(l, t, a.children, e), t.child;
      case 9:
        return u = t.type._context, a = t.pendingProps.children, ea(t), u = lt(u), a = a(u), t.flags |= 1, tt(l, t, a, e), t.child;
      case 14:
        return zd(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 15:
        return Ad(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 19:
        return Cd(l, t, e);
      case 31:
        return n0(l, t, e);
      case 22:
        return pd(
          l,
          t,
          e,
          t.pendingProps
        );
      case 24:
        return ea(t), a = lt(Ll), l === null ? (u = dc(), u === null && (u = Tl, n = sc(), u.pooledCache = n, n.refCount++, n !== null && (u.pooledCacheLanes |= e), u = n), t.memoizedState = { parent: a, cache: u }, vc(t), Te(t, Ll, u)) : ((l.lanes & e) !== 0 && (mc(l, t), pu(t, null, null, e), Au()), u = l.memoizedState, n = t.memoizedState, u.parent !== a ? (u = { parent: a, cache: a }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), Te(t, Ll, a)) : (a = n.cache, Te(t, Ll, a), a !== u.cache && fc(
          t,
          [Ll],
          e,
          !0
        ))), tt(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(d(156, t.tag));
  }
  function ue(l) {
    l.flags |= 4;
  }
  function $c(l, t, e, a, u) {
    if ((t = (l.mode & 32) !== 0) && (t = !1), t) {
      if (l.flags |= 16777216, (u & 335544128) === u)
        if (l.stateNode.complete) l.flags |= 8192;
        else if (cr()) l.flags |= 8192;
        else
          throw na = On, rc;
    } else l.flags &= -16777217;
  }
  function Hd(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !Fr(t))
      if (cr()) l.flags |= 8192;
      else
        throw na = On, rc;
  }
  function Zn(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? vs() : 536870912, l.lanes |= t, Za |= t);
  }
  function Uu(l, t) {
    if (!nl)
      switch (l.tailMode) {
        case "hidden":
          t = l.tail;
          for (var e = null; t !== null; )
            t.alternate !== null && (e = t), t = t.sibling;
          e === null ? l.tail = null : e.sibling = null;
          break;
        case "collapsed":
          e = l.tail;
          for (var a = null; e !== null; )
            e.alternate !== null && (a = e), e = e.sibling;
          a === null ? t || l.tail === null ? l.tail = null : l.tail.sibling = null : a.sibling = null;
      }
  }
  function Ml(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, e = 0, a = 0;
    if (t)
      for (var u = l.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags & 65011712, a |= u.flags & 65011712, u.return = l, u = u.sibling;
    else
      for (u = l.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags, a |= u.flags, u.return = l, u = u.sibling;
    return l.subtreeFlags |= a, l.childLanes = e, t;
  }
  function c0(l, t, e) {
    var a = t.pendingProps;
    switch (ac(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ml(t), null;
      case 1:
        return Ml(t), null;
      case 3:
        return e = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), le(Ll), jl(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (l === null || l.child === null) && (Ra(t) ? ue(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, nc())), Ml(t), null;
      case 26:
        var u = t.type, n = t.memoizedState;
        return l === null ? (ue(t), n !== null ? (Ml(t), Hd(t, n)) : (Ml(t), $c(
          t,
          u,
          null,
          a,
          e
        ))) : n ? n !== l.memoizedState ? (ue(t), Ml(t), Hd(t, n)) : (Ml(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== a && ue(t), Ml(t), $c(
          t,
          u,
          l,
          a,
          e
        )), null;
      case 27:
        if (Le(t), e = w.current, u = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && ue(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(d(166));
            return Ml(t), null;
          }
          l = U.current, Ra(t) ? mo(t) : (l = Vr(u, a, e), t.stateNode = l, ue(t));
        }
        return Ml(t), null;
      case 5:
        if (Le(t), u = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && ue(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(d(166));
            return Ml(t), null;
          }
          if (n = U.current, Ra(t))
            mo(t);
          else {
            var i = ui(
              w.current
            );
            switch (n) {
              case 1:
                n = i.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                n = i.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    n = i.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    n = i.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    n = i.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(
                      n.firstChild
                    );
                    break;
                  case "select":
                    n = typeof a.is == "string" ? i.createElement("select", {
                      is: a.is
                    }) : i.createElement("select"), a.multiple ? n.multiple = !0 : a.size && (n.size = a.size);
                    break;
                  default:
                    n = typeof a.is == "string" ? i.createElement(u, { is: a.is }) : i.createElement(u);
                }
            }
            n[Il] = t, n[ot] = a;
            l: for (i = t.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6)
                n.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                i.child.return = i, i = i.child;
                continue;
              }
              if (i === t) break l;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === t)
                  break l;
                i = i.return;
              }
              i.sibling.return = i.return, i = i.sibling;
            }
            t.stateNode = n;
            l: switch (et(n, u, a), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break l;
              case "img":
                a = !0;
                break l;
              default:
                a = !1;
            }
            a && ue(t);
          }
        }
        return Ml(t), $c(
          t,
          t.type,
          l === null ? null : l.memoizedProps,
          t.pendingProps,
          e
        ), null;
      case 6:
        if (l && t.stateNode != null)
          l.memoizedProps !== a && ue(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(d(166));
          if (l = w.current, Ra(t)) {
            if (l = t.stateNode, e = t.memoizedProps, a = null, u = Pl, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            l[Il] = t, l = !!(l.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || Ur(l.nodeValue, e)), l || _e(t, !0);
          } else
            l = ui(l).createTextNode(
              a
            ), l[Il] = t, t.stateNode = l;
        }
        return Ml(t), null;
      case 31:
        if (e = t.memoizedState, l === null || l.memoizedState !== null) {
          if (a = Ra(t), e !== null) {
            if (l === null) {
              if (!a) throw Error(d(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(d(557));
              l[Il] = t;
            } else
              la(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ml(t), l = !1;
          } else
            e = nc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), l = !0;
          if (!l)
            return t.flags & 256 ? (At(t), t) : (At(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(d(558));
        }
        return Ml(t), null;
      case 13:
        if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (u = Ra(t), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!u) throw Error(d(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(d(317));
              u[Il] = t;
            } else
              la(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ml(t), u = !1;
          } else
            u = nc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (At(t), t) : (At(t), null);
        }
        return At(t), (t.flags & 128) !== 0 ? (t.lanes = e, t) : (e = a !== null, l = l !== null && l.memoizedState !== null, e && (a = t.child, u = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (u = a.alternate.memoizedState.cachePool.pool), n = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== u && (a.flags |= 2048)), e !== l && e && (t.child.flags |= 8192), Zn(t, t.updateQueue), Ml(t), null);
      case 4:
        return jl(), l === null && Sf(t.stateNode.containerInfo), Ml(t), null;
      case 10:
        return le(t.type), Ml(t), null;
      case 19:
        if (z(Vl), a = t.memoizedState, a === null) return Ml(t), null;
        if (u = (t.flags & 128) !== 0, n = a.rendering, n === null)
          if (u) Uu(a, !1);
          else {
            if (xl !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = t.child; l !== null; ) {
                if (n = Rn(l), n !== null) {
                  for (t.flags |= 128, Uu(a, !1), l = n.updateQueue, t.updateQueue = l, Zn(t, l), t.subtreeFlags = 0, l = e, e = t.child; e !== null; )
                    fo(e, l), e = e.sibling;
                  return N(
                    Vl,
                    Vl.current & 1 | 2
                  ), nl && It(t, a.treeForkCount), t.child;
                }
                l = l.sibling;
              }
            a.tail !== null && Ol() > Wn && (t.flags |= 128, u = !0, Uu(a, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (l = Rn(n), l !== null) {
              if (t.flags |= 128, u = !0, l = l.updateQueue, t.updateQueue = l, Zn(t, l), Uu(a, !0), a.tail === null && a.tailMode === "hidden" && !n.alternate && !nl)
                return Ml(t), null;
            } else
              2 * Ol() - a.renderingStartTime > Wn && e !== 536870912 && (t.flags |= 128, u = !0, Uu(a, !1), t.lanes = 4194304);
          a.isBackwards ? (n.sibling = t.child, t.child = n) : (l = a.last, l !== null ? l.sibling = n : t.child = n, a.last = n);
        }
        return a.tail !== null ? (l = a.tail, a.rendering = l, a.tail = l.sibling, a.renderingStartTime = Ol(), l.sibling = null, e = Vl.current, N(
          Vl,
          u ? e & 1 | 2 : e & 1
        ), nl && It(t, a.treeForkCount), l) : (Ml(t), null);
      case 22:
      case 23:
        return At(t), Sc(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (e & 536870912) !== 0 && (t.flags & 128) === 0 && (Ml(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ml(t), e = t.updateQueue, e !== null && Zn(t, e.retryQueue), e = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== e && (t.flags |= 2048), l !== null && z(aa), null;
      case 24:
        return e = null, l !== null && (e = l.memoizedState.cache), t.memoizedState.cache !== e && (t.flags |= 2048), le(Ll), Ml(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(d(156, t.tag));
  }
  function f0(l, t) {
    switch (ac(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return le(Ll), jl(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Le(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (At(t), t.alternate === null)
            throw Error(d(340));
          la();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (At(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(d(340));
          la();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return z(Vl), null;
      case 4:
        return jl(), null;
      case 10:
        return le(t.type), null;
      case 22:
      case 23:
        return At(t), Sc(), l !== null && z(aa), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return le(Ll), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function qd(l, t) {
    switch (ac(t), t.tag) {
      case 3:
        le(Ll), jl();
        break;
      case 26:
      case 27:
      case 5:
        Le(t);
        break;
      case 4:
        jl();
        break;
      case 31:
        t.memoizedState !== null && At(t);
        break;
      case 13:
        At(t);
        break;
      case 19:
        z(Vl);
        break;
      case 10:
        le(t.type);
        break;
      case 22:
      case 23:
        At(t), Sc(), l !== null && z(aa);
        break;
      case 24:
        le(Ll);
    }
  }
  function ju(l, t) {
    try {
      var e = t.updateQueue, a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        e = u;
        do {
          if ((e.tag & l) === l) {
            a = void 0;
            var n = e.create, i = e.inst;
            a = n(), i.destroy = a;
          }
          e = e.next;
        } while (e !== u);
      }
    } catch (c) {
      hl(t, t.return, c);
    }
  }
  function Me(l, t, e) {
    try {
      var a = t.updateQueue, u = a !== null ? a.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        a = n;
        do {
          if ((a.tag & l) === l) {
            var i = a.inst, c = i.destroy;
            if (c !== void 0) {
              i.destroy = void 0, u = t;
              var s = e, y = c;
              try {
                y();
              } catch (b) {
                hl(
                  u,
                  s,
                  b
                );
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (b) {
      hl(t, t.return, b);
    }
  }
  function Bd(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var e = l.stateNode;
      try {
        Do(t, e);
      } catch (a) {
        hl(l, l.return, a);
      }
    }
  }
  function Yd(l, t, e) {
    e.props = fa(
      l.type,
      l.memoizedProps
    ), e.state = l.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      hl(l, t, a);
    }
  }
  function Cu(l, t) {
    try {
      var e = l.ref;
      if (e !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var a = l.stateNode;
            break;
          case 30:
            a = l.stateNode;
            break;
          default:
            a = l.stateNode;
        }
        typeof e == "function" ? l.refCleanup = e(a) : e.current = a;
      }
    } catch (u) {
      hl(l, t, u);
    }
  }
  function Lt(l, t) {
    var e = l.ref, a = l.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (u) {
          hl(l, t, u);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (u) {
          hl(l, t, u);
        }
      else e.current = null;
  }
  function Gd(l) {
    var t = l.type, e = l.memoizedProps, a = l.stateNode;
    try {
      l: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          e.autoFocus && a.focus();
          break l;
        case "img":
          e.src ? a.src = e.src : e.srcSet && (a.srcset = e.srcSet);
      }
    } catch (u) {
      hl(l, l.return, u);
    }
  }
  function Fc(l, t, e) {
    try {
      var a = l.stateNode;
      R0(a, l.type, e, t), a[ot] = t;
    } catch (u) {
      hl(l, l.return, u);
    }
  }
  function Xd(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && He(l.type) || l.tag === 4;
  }
  function kc(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || Xd(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && He(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function Ic(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(l, t) : (t = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, t.appendChild(l), e = e._reactRootContainer, e != null || t.onclick !== null || (t.onclick = $t));
    else if (a !== 4 && (a === 27 && He(l.type) && (e = l.stateNode, t = null), l = l.child, l !== null))
      for (Ic(l, t, e), l = l.sibling; l !== null; )
        Ic(l, t, e), l = l.sibling;
  }
  function Ln(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? e.insertBefore(l, t) : e.appendChild(l);
    else if (a !== 4 && (a === 27 && He(l.type) && (e = l.stateNode), l = l.child, l !== null))
      for (Ln(l, t, e), l = l.sibling; l !== null; )
        Ln(l, t, e), l = l.sibling;
  }
  function Qd(l) {
    var t = l.stateNode, e = l.memoizedProps;
    try {
      for (var a = l.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      et(t, a, e), t[Il] = l, t[ot] = e;
    } catch (n) {
      hl(l, l.return, n);
    }
  }
  var ne = !1, wl = !1, Pc = !1, Vd = typeof WeakSet == "function" ? WeakSet : Set, kl = null;
  function s0(l, t) {
    if (l = l.containerInfo, _f = di, l = Ps(l), Ji(l)) {
      if ("selectionStart" in l)
        var e = {
          start: l.selectionStart,
          end: l.selectionEnd
        };
      else
        l: {
          e = (e = l.ownerDocument) && e.defaultView || window;
          var a = e.getSelection && e.getSelection();
          if (a && a.rangeCount !== 0) {
            e = a.anchorNode;
            var u = a.anchorOffset, n = a.focusNode;
            a = a.focusOffset;
            try {
              e.nodeType, n.nodeType;
            } catch {
              e = null;
              break l;
            }
            var i = 0, c = -1, s = -1, y = 0, b = 0, A = l, h = null;
            t: for (; ; ) {
              for (var g; A !== e || u !== 0 && A.nodeType !== 3 || (c = i + u), A !== n || a !== 0 && A.nodeType !== 3 || (s = i + a), A.nodeType === 3 && (i += A.nodeValue.length), (g = A.firstChild) !== null; )
                h = A, A = g;
              for (; ; ) {
                if (A === l) break t;
                if (h === e && ++y === u && (c = i), h === n && ++b === a && (s = i), (g = A.nextSibling) !== null) break;
                A = h, h = A.parentNode;
              }
              A = g;
            }
            e = c === -1 || s === -1 ? null : { start: c, end: s };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (Tf = { focusedElem: l, selectionRange: e }, di = !1, kl = t; kl !== null; )
      if (t = kl, l = t.child, (t.subtreeFlags & 1028) !== 0 && l !== null)
        l.return = t, kl = l;
      else
        for (; kl !== null; ) {
          switch (t = kl, n = t.alternate, l = t.flags, t.tag) {
            case 0:
              if ((l & 4) !== 0 && (l = t.updateQueue, l = l !== null ? l.events : null, l !== null))
                for (e = 0; e < l.length; e++)
                  u = l[e], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && n !== null) {
                l = void 0, e = t, u = n.memoizedProps, n = n.memoizedState, a = e.stateNode;
                try {
                  var j = fa(
                    e.type,
                    u
                  );
                  l = a.getSnapshotBeforeUpdate(
                    j,
                    n
                  ), a.__reactInternalSnapshotBeforeUpdate = l;
                } catch (Z) {
                  hl(
                    e,
                    e.return,
                    Z
                  );
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (l = t.stateNode.containerInfo, e = l.nodeType, e === 9)
                  pf(l);
                else if (e === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      pf(l);
                      break;
                    default:
                      l.textContent = "";
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
              if ((l & 1024) !== 0) throw Error(d(163));
          }
          if (l = t.sibling, l !== null) {
            l.return = t.return, kl = l;
            break;
          }
          kl = t.return;
        }
  }
  function Zd(l, t, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ce(l, e), a & 4 && ju(5, e);
        break;
      case 1:
        if (ce(l, e), a & 4)
          if (l = e.stateNode, t === null)
            try {
              l.componentDidMount();
            } catch (i) {
              hl(e, e.return, i);
            }
          else {
            var u = fa(
              e.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              l.componentDidUpdate(
                u,
                t,
                l.__reactInternalSnapshotBeforeUpdate
              );
            } catch (i) {
              hl(
                e,
                e.return,
                i
              );
            }
          }
        a & 64 && Bd(e), a & 512 && Cu(e, e.return);
        break;
      case 3:
        if (ce(l, e), a & 64 && (l = e.updateQueue, l !== null)) {
          if (t = null, e.child !== null)
            switch (e.child.tag) {
              case 27:
              case 5:
                t = e.child.stateNode;
                break;
              case 1:
                t = e.child.stateNode;
            }
          try {
            Do(l, t);
          } catch (i) {
            hl(e, e.return, i);
          }
        }
        break;
      case 27:
        t === null && a & 4 && Qd(e);
      case 26:
      case 5:
        ce(l, e), t === null && a & 4 && Gd(e), a & 512 && Cu(e, e.return);
        break;
      case 12:
        ce(l, e);
        break;
      case 31:
        ce(l, e), a & 4 && Jd(l, e);
        break;
      case 13:
        ce(l, e), a & 4 && wd(l, e), a & 64 && (l = e.memoizedState, l !== null && (l = l.dehydrated, l !== null && (e = S0.bind(
          null,
          e
        ), Y0(l, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || ne, !a) {
          t = t !== null && t.memoizedState !== null || wl, u = ne;
          var n = wl;
          ne = a, (wl = t) && !n ? fe(
            l,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : ce(l, e), ne = u, wl = n;
        }
        break;
      case 30:
        break;
      default:
        ce(l, e);
    }
  }
  function Ld(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, Ld(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && Ni(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var Rl = null, rt = !1;
  function ie(l, t, e) {
    for (e = e.child; e !== null; )
      Kd(l, t, e), e = e.sibling;
  }
  function Kd(l, t, e) {
    if (bt && typeof bt.onCommitFiberUnmount == "function")
      try {
        bt.onCommitFiberUnmount(wt, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        wl || Lt(e, t), ie(
          l,
          t,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        wl || Lt(e, t);
        var a = Rl, u = rt;
        He(e.type) && (Rl = e.stateNode, rt = !1), ie(
          l,
          t,
          e
        ), Vu(e.stateNode), Rl = a, rt = u;
        break;
      case 5:
        wl || Lt(e, t);
      case 6:
        if (a = Rl, u = rt, Rl = null, ie(
          l,
          t,
          e
        ), Rl = a, rt = u, Rl !== null)
          if (rt)
            try {
              (Rl.nodeType === 9 ? Rl.body : Rl.nodeName === "HTML" ? Rl.ownerDocument.body : Rl).removeChild(e.stateNode);
            } catch (n) {
              hl(
                e,
                t,
                n
              );
            }
          else
            try {
              Rl.removeChild(e.stateNode);
            } catch (n) {
              hl(
                e,
                t,
                n
              );
            }
        break;
      case 18:
        Rl !== null && (rt ? (l = Rl, Br(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          e.stateNode
        ), ka(l)) : Br(Rl, e.stateNode));
        break;
      case 4:
        a = Rl, u = rt, Rl = e.stateNode.containerInfo, rt = !0, ie(
          l,
          t,
          e
        ), Rl = a, rt = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Me(2, e, t), wl || Me(4, e, t), ie(
          l,
          t,
          e
        );
        break;
      case 1:
        wl || (Lt(e, t), a = e.stateNode, typeof a.componentWillUnmount == "function" && Yd(
          e,
          t,
          a
        )), ie(
          l,
          t,
          e
        );
        break;
      case 21:
        ie(
          l,
          t,
          e
        );
        break;
      case 22:
        wl = (a = wl) || e.memoizedState !== null, ie(
          l,
          t,
          e
        ), wl = a;
        break;
      default:
        ie(
          l,
          t,
          e
        );
    }
  }
  function Jd(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        ka(l);
      } catch (e) {
        hl(t, t.return, e);
      }
    }
  }
  function wd(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        ka(l);
      } catch (e) {
        hl(t, t.return, e);
      }
  }
  function o0(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new Vd()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new Vd()), t;
      default:
        throw Error(d(435, l.tag));
    }
  }
  function Kn(l, t) {
    var e = o0(l);
    t.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var u = b0.bind(null, l, a);
        a.then(u, u);
      }
    });
  }
  function vt(l, t) {
    var e = t.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var u = e[a], n = l, i = t, c = i;
        l: for (; c !== null; ) {
          switch (c.tag) {
            case 27:
              if (He(c.type)) {
                Rl = c.stateNode, rt = !1;
                break l;
              }
              break;
            case 5:
              Rl = c.stateNode, rt = !1;
              break l;
            case 3:
            case 4:
              Rl = c.stateNode.containerInfo, rt = !0;
              break l;
          }
          c = c.return;
        }
        if (Rl === null) throw Error(d(160));
        Kd(n, i, u), Rl = null, rt = !1, n = u.alternate, n !== null && (n.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Wd(t, l), t = t.sibling;
  }
  var Xt = null;
  function Wd(l, t) {
    var e = l.alternate, a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        vt(t, l), mt(l), a & 4 && (Me(3, l, l.return), ju(3, l), Me(5, l, l.return));
        break;
      case 1:
        vt(t, l), mt(l), a & 512 && (wl || e === null || Lt(e, e.return)), a & 64 && ne && (l = l.updateQueue, l !== null && (a = l.callbacks, a !== null && (e = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var u = Xt;
        if (vt(t, l), mt(l), a & 512 && (wl || e === null || Lt(e, e.return)), a & 4) {
          var n = e !== null ? e.memoizedState : null;
          if (a = l.memoizedState, e === null)
            if (a === null)
              if (l.stateNode === null) {
                l: {
                  a = l.type, e = l.memoizedProps, u = u.ownerDocument || u;
                  t: switch (a) {
                    case "title":
                      n = u.getElementsByTagName("title")[0], (!n || n[iu] || n[Il] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = u.createElement(a), u.head.insertBefore(
                        n,
                        u.querySelector("head > title")
                      )), et(n, a, e), n[Il] = l, Fl(n), a = n;
                      break l;
                    case "link":
                      var i = Wr(
                        "link",
                        "href",
                        u
                      ).get(a + (e.href || ""));
                      if (i) {
                        for (var c = 0; c < i.length; c++)
                          if (n = i[c], n.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && n.getAttribute("rel") === (e.rel == null ? null : e.rel) && n.getAttribute("title") === (e.title == null ? null : e.title) && n.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                            i.splice(c, 1);
                            break t;
                          }
                      }
                      n = u.createElement(a), et(n, a, e), u.head.appendChild(n);
                      break;
                    case "meta":
                      if (i = Wr(
                        "meta",
                        "content",
                        u
                      ).get(a + (e.content || ""))) {
                        for (c = 0; c < i.length; c++)
                          if (n = i[c], n.getAttribute("content") === (e.content == null ? null : "" + e.content) && n.getAttribute("name") === (e.name == null ? null : e.name) && n.getAttribute("property") === (e.property == null ? null : e.property) && n.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && n.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                            i.splice(c, 1);
                            break t;
                          }
                      }
                      n = u.createElement(a), et(n, a, e), u.head.appendChild(n);
                      break;
                    default:
                      throw Error(d(468, a));
                  }
                  n[Il] = l, Fl(n), a = n;
                }
                l.stateNode = a;
              } else
                $r(
                  u,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = wr(
                u,
                a,
                l.memoizedProps
              );
          else
            n !== a ? (n === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : n.count--, a === null ? $r(
              u,
              l.type,
              l.stateNode
            ) : wr(
              u,
              a,
              l.memoizedProps
            )) : a === null && l.stateNode !== null && Fc(
              l,
              l.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        vt(t, l), mt(l), a & 512 && (wl || e === null || Lt(e, e.return)), e !== null && a & 4 && Fc(
          l,
          l.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (vt(t, l), mt(l), a & 512 && (wl || e === null || Lt(e, e.return)), l.flags & 32) {
          u = l.stateNode;
          try {
            Ea(u, "");
          } catch (j) {
            hl(l, l.return, j);
          }
        }
        a & 4 && l.stateNode != null && (u = l.memoizedProps, Fc(
          l,
          u,
          e !== null ? e.memoizedProps : u
        )), a & 1024 && (Pc = !0);
        break;
      case 6:
        if (vt(t, l), mt(l), a & 4) {
          if (l.stateNode === null)
            throw Error(d(162));
          a = l.memoizedProps, e = l.stateNode;
          try {
            e.nodeValue = a;
          } catch (j) {
            hl(l, l.return, j);
          }
        }
        break;
      case 3:
        if (ci = null, u = Xt, Xt = ni(t.containerInfo), vt(t, l), Xt = u, mt(l), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            ka(t.containerInfo);
          } catch (j) {
            hl(l, l.return, j);
          }
        Pc && (Pc = !1, $d(l));
        break;
      case 4:
        a = Xt, Xt = ni(
          l.stateNode.containerInfo
        ), vt(t, l), mt(l), Xt = a;
        break;
      case 12:
        vt(t, l), mt(l);
        break;
      case 31:
        vt(t, l), mt(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, Kn(l, a)));
        break;
      case 13:
        vt(t, l), mt(l), l.child.flags & 8192 && l.memoizedState !== null != (e !== null && e.memoizedState !== null) && (wn = Ol()), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, Kn(l, a)));
        break;
      case 22:
        u = l.memoizedState !== null;
        var s = e !== null && e.memoizedState !== null, y = ne, b = wl;
        if (ne = y || u, wl = b || s, vt(t, l), wl = b, ne = y, mt(l), a & 8192)
          l: for (t = l.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (e === null || s || ne || wl || sa(l)), e = null, t = l; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (e === null) {
                s = e = t;
                try {
                  if (n = s.stateNode, u)
                    i = n.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    c = s.stateNode;
                    var A = s.memoizedProps.style, h = A != null && A.hasOwnProperty("display") ? A.display : null;
                    c.style.display = h == null || typeof h == "boolean" ? "" : ("" + h).trim();
                  }
                } catch (j) {
                  hl(s, s.return, j);
                }
              }
            } else if (t.tag === 6) {
              if (e === null) {
                s = t;
                try {
                  s.stateNode.nodeValue = u ? "" : s.memoizedProps;
                } catch (j) {
                  hl(s, s.return, j);
                }
              }
            } else if (t.tag === 18) {
              if (e === null) {
                s = t;
                try {
                  var g = s.stateNode;
                  u ? Yr(g, !0) : Yr(s.stateNode, !1);
                } catch (j) {
                  hl(s, s.return, j);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === l) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === l) break l;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === l) break l;
              e === t && (e = null), t = t.return;
            }
            e === t && (e = null), t.sibling.return = t.return, t = t.sibling;
          }
        a & 4 && (a = l.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, Kn(l, e))));
        break;
      case 19:
        vt(t, l), mt(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, Kn(l, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        vt(t, l), mt(l);
    }
  }
  function mt(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var e, a = l.return; a !== null; ) {
          if (Xd(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(d(160));
        switch (e.tag) {
          case 27:
            var u = e.stateNode, n = kc(l);
            Ln(l, n, u);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && (Ea(i, ""), e.flags &= -33);
            var c = kc(l);
            Ln(l, c, i);
            break;
          case 3:
          case 4:
            var s = e.stateNode.containerInfo, y = kc(l);
            Ic(
              l,
              y,
              s
            );
            break;
          default:
            throw Error(d(161));
        }
      } catch (b) {
        hl(l, l.return, b);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function $d(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        $d(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
      }
  }
  function ce(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Zd(l, t.alternate, t), t = t.sibling;
  }
  function sa(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Me(4, t, t.return), sa(t);
          break;
        case 1:
          Lt(t, t.return);
          var e = t.stateNode;
          typeof e.componentWillUnmount == "function" && Yd(
            t,
            t.return,
            e
          ), sa(t);
          break;
        case 27:
          Vu(t.stateNode);
        case 26:
        case 5:
          Lt(t, t.return), sa(t);
          break;
        case 22:
          t.memoizedState === null && sa(t);
          break;
        case 30:
          sa(t);
          break;
        default:
          sa(t);
      }
      l = l.sibling;
    }
  }
  function fe(l, t, e) {
    for (e = e && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, u = l, n = t, i = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          fe(
            u,
            n,
            e
          ), ju(4, n);
          break;
        case 1:
          if (fe(
            u,
            n,
            e
          ), a = n, u = a.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (y) {
              hl(a, a.return, y);
            }
          if (a = n, u = a.updateQueue, u !== null) {
            var c = a.stateNode;
            try {
              var s = u.shared.hiddenCallbacks;
              if (s !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < s.length; u++)
                  Oo(s[u], c);
            } catch (y) {
              hl(a, a.return, y);
            }
          }
          e && i & 64 && Bd(n), Cu(n, n.return);
          break;
        case 27:
          Qd(n);
        case 26:
        case 5:
          fe(
            u,
            n,
            e
          ), e && a === null && i & 4 && Gd(n), Cu(n, n.return);
          break;
        case 12:
          fe(
            u,
            n,
            e
          );
          break;
        case 31:
          fe(
            u,
            n,
            e
          ), e && i & 4 && Jd(u, n);
          break;
        case 13:
          fe(
            u,
            n,
            e
          ), e && i & 4 && wd(u, n);
          break;
        case 22:
          n.memoizedState === null && fe(
            u,
            n,
            e
          ), Cu(n, n.return);
          break;
        case 30:
          break;
        default:
          fe(
            u,
            n,
            e
          );
      }
      t = t.sibling;
    }
  }
  function lf(l, t) {
    var e = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== e && (l != null && l.refCount++, e != null && bu(e));
  }
  function tf(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && bu(l));
  }
  function Qt(l, t, e, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Fd(
          l,
          t,
          e,
          a
        ), t = t.sibling;
  }
  function Fd(l, t, e, a) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Qt(
          l,
          t,
          e,
          a
        ), u & 2048 && ju(9, t);
        break;
      case 1:
        Qt(
          l,
          t,
          e,
          a
        );
        break;
      case 3:
        Qt(
          l,
          t,
          e,
          a
        ), u & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && bu(l)));
        break;
      case 12:
        if (u & 2048) {
          Qt(
            l,
            t,
            e,
            a
          ), l = t.stateNode;
          try {
            var n = t.memoizedProps, i = n.id, c = n.onPostCommit;
            typeof c == "function" && c(
              i,
              t.alternate === null ? "mount" : "update",
              l.passiveEffectDuration,
              -0
            );
          } catch (s) {
            hl(t, t.return, s);
          }
        } else
          Qt(
            l,
            t,
            e,
            a
          );
        break;
      case 31:
        Qt(
          l,
          t,
          e,
          a
        );
        break;
      case 13:
        Qt(
          l,
          t,
          e,
          a
        );
        break;
      case 23:
        break;
      case 22:
        n = t.stateNode, i = t.alternate, t.memoizedState !== null ? n._visibility & 2 ? Qt(
          l,
          t,
          e,
          a
        ) : xu(l, t) : n._visibility & 2 ? Qt(
          l,
          t,
          e,
          a
        ) : (n._visibility |= 2, Xa(
          l,
          t,
          e,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && lf(i, t);
        break;
      case 24:
        Qt(
          l,
          t,
          e,
          a
        ), u & 2048 && tf(t.alternate, t);
        break;
      default:
        Qt(
          l,
          t,
          e,
          a
        );
    }
  }
  function Xa(l, t, e, a, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var n = l, i = t, c = e, s = a, y = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Xa(
            n,
            i,
            c,
            s,
            u
          ), ju(8, i);
          break;
        case 23:
          break;
        case 22:
          var b = i.stateNode;
          i.memoizedState !== null ? b._visibility & 2 ? Xa(
            n,
            i,
            c,
            s,
            u
          ) : xu(
            n,
            i
          ) : (b._visibility |= 2, Xa(
            n,
            i,
            c,
            s,
            u
          )), u && y & 2048 && lf(
            i.alternate,
            i
          );
          break;
        case 24:
          Xa(
            n,
            i,
            c,
            s,
            u
          ), u && y & 2048 && tf(i.alternate, i);
          break;
        default:
          Xa(
            n,
            i,
            c,
            s,
            u
          );
      }
      t = t.sibling;
    }
  }
  function xu(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var e = l, a = t, u = a.flags;
        switch (a.tag) {
          case 22:
            xu(e, a), u & 2048 && lf(
              a.alternate,
              a
            );
            break;
          case 24:
            xu(e, a), u & 2048 && tf(a.alternate, a);
            break;
          default:
            xu(e, a);
        }
        t = t.sibling;
      }
  }
  var Hu = 8192;
  function Qa(l, t, e) {
    if (l.subtreeFlags & Hu)
      for (l = l.child; l !== null; )
        kd(
          l,
          t,
          e
        ), l = l.sibling;
  }
  function kd(l, t, e) {
    switch (l.tag) {
      case 26:
        Qa(
          l,
          t,
          e
        ), l.flags & Hu && l.memoizedState !== null && F0(
          e,
          Xt,
          l.memoizedState,
          l.memoizedProps
        );
        break;
      case 5:
        Qa(
          l,
          t,
          e
        );
        break;
      case 3:
      case 4:
        var a = Xt;
        Xt = ni(l.stateNode.containerInfo), Qa(
          l,
          t,
          e
        ), Xt = a;
        break;
      case 22:
        l.memoizedState === null && (a = l.alternate, a !== null && a.memoizedState !== null ? (a = Hu, Hu = 16777216, Qa(
          l,
          t,
          e
        ), Hu = a) : Qa(
          l,
          t,
          e
        ));
        break;
      default:
        Qa(
          l,
          t,
          e
        );
    }
  }
  function Id(l) {
    var t = l.alternate;
    if (t !== null && (l = t.child, l !== null)) {
      t.child = null;
      do
        t = l.sibling, l.sibling = null, l = t;
      while (l !== null);
    }
  }
  function qu(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          kl = a, lr(
            a,
            l
          );
        }
      Id(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        Pd(l), l = l.sibling;
  }
  function Pd(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        qu(l), l.flags & 2048 && Me(9, l, l.return);
        break;
      case 3:
        qu(l);
        break;
      case 12:
        qu(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, Jn(l)) : qu(l);
        break;
      default:
        qu(l);
    }
  }
  function Jn(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          kl = a, lr(
            a,
            l
          );
        }
      Id(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          Me(8, t, t.return), Jn(t);
          break;
        case 22:
          e = t.stateNode, e._visibility & 2 && (e._visibility &= -3, Jn(t));
          break;
        default:
          Jn(t);
      }
      l = l.sibling;
    }
  }
  function lr(l, t) {
    for (; kl !== null; ) {
      var e = kl;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Me(8, e, t);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          bu(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, kl = a;
      else
        l: for (e = l; kl !== null; ) {
          a = kl;
          var u = a.sibling, n = a.return;
          if (Ld(a), a === e) {
            kl = null;
            break l;
          }
          if (u !== null) {
            u.return = n, kl = u;
            break l;
          }
          kl = n;
        }
    }
  }
  var d0 = {
    getCacheForType: function(l) {
      var t = lt(Ll), e = t.data.get(l);
      return e === void 0 && (e = l(), t.data.set(l, e)), e;
    },
    cacheSignal: function() {
      return lt(Ll).controller.signal;
    }
  }, r0 = typeof WeakMap == "function" ? WeakMap : Map, rl = 0, Tl = null, ll = null, el = 0, yl = 0, pt = null, Ne = !1, Va = !1, ef = !1, se = 0, xl = 0, Re = 0, oa = 0, af = 0, Ot = 0, Za = 0, Bu = null, yt = null, uf = !1, wn = 0, tr = 0, Wn = 1 / 0, $n = null, Ue = null, Wl = 0, je = null, La = null, oe = 0, nf = 0, cf = null, er = null, Yu = 0, ff = null;
  function Dt() {
    return (rl & 2) !== 0 && el !== 0 ? el & -el : S.T !== null ? mf() : gs();
  }
  function ar() {
    if (Ot === 0)
      if ((el & 536870912) === 0 || nl) {
        var l = en;
        en <<= 1, (en & 3932160) === 0 && (en = 262144), Ot = l;
      } else Ot = 536870912;
    return l = zt.current, l !== null && (l.flags |= 32), Ot;
  }
  function ht(l, t, e) {
    (l === Tl && (yl === 2 || yl === 9) || l.cancelPendingCommit !== null) && (Ka(l, 0), Ce(
      l,
      el,
      Ot,
      !1
    )), nu(l, e), ((rl & 2) === 0 || l !== Tl) && (l === Tl && ((rl & 2) === 0 && (oa |= e), xl === 4 && Ce(
      l,
      el,
      Ot,
      !1
    )), Kt(l));
  }
  function ur(l, t, e) {
    if ((rl & 6) !== 0) throw Error(d(327));
    var a = !e && (t & 127) === 0 && (t & l.expiredLanes) === 0 || uu(l, t), u = a ? y0(l, t) : of(l, t, !0), n = a;
    do {
      if (u === 0) {
        Va && !a && Ce(l, t, 0, !1);
        break;
      } else {
        if (e = l.current.alternate, n && !v0(e)) {
          u = of(l, t, !1), n = !1;
          continue;
        }
        if (u === 2) {
          if (n = t, l.errorRecoveryDisabledLanes & n)
            var i = 0;
          else
            i = l.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
          if (i !== 0) {
            t = i;
            l: {
              var c = l;
              u = Bu;
              var s = c.current.memoizedState.isDehydrated;
              if (s && (Ka(c, i).flags |= 256), i = of(
                c,
                i,
                !1
              ), i !== 2) {
                if (ef && !s) {
                  c.errorRecoveryDisabledLanes |= n, oa |= n, u = 4;
                  break l;
                }
                n = yt, yt = u, n !== null && (yt === null ? yt = n : yt.push.apply(
                  yt,
                  n
                ));
              }
              u = i;
            }
            if (n = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Ka(l, 0), Ce(l, t, 0, !0);
          break;
        }
        l: {
          switch (a = l, n = u, n) {
            case 0:
            case 1:
              throw Error(d(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Ce(
                a,
                t,
                Ot,
                !Ne
              );
              break l;
            case 2:
              yt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(d(329));
          }
          if ((t & 62914560) === t && (u = wn + 300 - Ol(), 10 < u)) {
            if (Ce(
              a,
              t,
              Ot,
              !Ne
            ), un(a, 0, !0) !== 0) break l;
            oe = t, a.timeoutHandle = Hr(
              nr.bind(
                null,
                a,
                e,
                yt,
                $n,
                uf,
                t,
                Ot,
                oa,
                Za,
                Ne,
                n,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break l;
          }
          nr(
            a,
            e,
            yt,
            $n,
            uf,
            t,
            Ot,
            oa,
            Za,
            Ne,
            n,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Kt(l);
  }
  function nr(l, t, e, a, u, n, i, c, s, y, b, A, h, g) {
    if (l.timeoutHandle = -1, A = t.subtreeFlags, A & 8192 || (A & 16785408) === 16785408) {
      A = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: $t
      }, kd(
        t,
        n,
        A
      );
      var j = (n & 62914560) === n ? wn - Ol() : (n & 4194048) === n ? tr - Ol() : 0;
      if (j = k0(
        A,
        j
      ), j !== null) {
        oe = n, l.cancelPendingCommit = j(
          vr.bind(
            null,
            l,
            t,
            n,
            e,
            a,
            u,
            i,
            c,
            s,
            b,
            A,
            null,
            h,
            g
          )
        ), Ce(l, n, i, !y);
        return;
      }
    }
    vr(
      l,
      t,
      n,
      e,
      a,
      u,
      i,
      c,
      s
    );
  }
  function v0(l) {
    for (var t = l; ; ) {
      var e = t.tag;
      if ((e === 0 || e === 11 || e === 15) && t.flags & 16384 && (e = t.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var a = 0; a < e.length; a++) {
          var u = e[a], n = u.getSnapshot;
          u = u.value;
          try {
            if (!_t(n(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (e = t.child, t.subtreeFlags & 16384 && e !== null)
        e.return = t, t = e;
      else {
        if (t === l) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function Ce(l, t, e, a) {
    t &= ~af, t &= ~oa, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
    for (var u = t; 0 < u; ) {
      var n = 31 - Et(u), i = 1 << n;
      a[n] = -1, u &= ~i;
    }
    e !== 0 && ms(l, e, t);
  }
  function Fn() {
    return (rl & 6) === 0 ? (Gu(0), !1) : !0;
  }
  function sf() {
    if (ll !== null) {
      if (yl === 0)
        var l = ll.return;
      else
        l = ll, Pt = ta = null, Ac(l), Ha = null, _u = 0, l = ll;
      for (; l !== null; )
        qd(l.alternate, l), l = l.return;
      ll = null;
    }
  }
  function Ka(l, t) {
    var e = l.timeoutHandle;
    e !== -1 && (l.timeoutHandle = -1, C0(e)), e = l.cancelPendingCommit, e !== null && (l.cancelPendingCommit = null, e()), oe = 0, sf(), Tl = l, ll = e = kt(l.current, null), el = t, yl = 0, pt = null, Ne = !1, Va = uu(l, t), ef = !1, Za = Ot = af = oa = Re = xl = 0, yt = Bu = null, uf = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = l.entangledLanes;
    if (a !== 0)
      for (l = l.entanglements, a &= t; 0 < a; ) {
        var u = 31 - Et(a), n = 1 << u;
        t |= l[u], a &= ~n;
      }
    return se = t, gn(), e;
  }
  function ir(l, t) {
    W = null, S.H = Nu, t === xa || t === pn ? (t = To(), yl = 3) : t === rc ? (t = To(), yl = 4) : yl = t === Xc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, pt = t, ll === null && (xl = 1, Gn(
      l,
      jt(t, l.current)
    ));
  }
  function cr() {
    var l = zt.current;
    return l === null ? !0 : (el & 4194048) === el ? qt === null : (el & 62914560) === el || (el & 536870912) !== 0 ? l === qt : !1;
  }
  function fr() {
    var l = S.H;
    return S.H = Nu, l === null ? Nu : l;
  }
  function sr() {
    var l = S.A;
    return S.A = d0, l;
  }
  function kn() {
    xl = 4, Ne || (el & 4194048) !== el && zt.current !== null || (Va = !0), (Re & 134217727) === 0 && (oa & 134217727) === 0 || Tl === null || Ce(
      Tl,
      el,
      Ot,
      !1
    );
  }
  function of(l, t, e) {
    var a = rl;
    rl |= 2;
    var u = fr(), n = sr();
    (Tl !== l || el !== t) && ($n = null, Ka(l, t)), t = !1;
    var i = xl;
    l: do
      try {
        if (yl !== 0 && ll !== null) {
          var c = ll, s = pt;
          switch (yl) {
            case 8:
              sf(), i = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              zt.current === null && (t = !0);
              var y = yl;
              if (yl = 0, pt = null, Ja(l, c, s, y), e && Va) {
                i = 0;
                break l;
              }
              break;
            default:
              y = yl, yl = 0, pt = null, Ja(l, c, s, y);
          }
        }
        m0(), i = xl;
        break;
      } catch (b) {
        ir(l, b);
      }
    while (!0);
    return t && l.shellSuspendCounter++, Pt = ta = null, rl = a, S.H = u, S.A = n, ll === null && (Tl = null, el = 0, gn()), i;
  }
  function m0() {
    for (; ll !== null; ) or(ll);
  }
  function y0(l, t) {
    var e = rl;
    rl |= 2;
    var a = fr(), u = sr();
    Tl !== l || el !== t ? ($n = null, Wn = Ol() + 500, Ka(l, t)) : Va = uu(
      l,
      t
    );
    l: do
      try {
        if (yl !== 0 && ll !== null) {
          t = ll;
          var n = pt;
          t: switch (yl) {
            case 1:
              yl = 0, pt = null, Ja(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (Eo(n)) {
                yl = 0, pt = null, dr(t);
                break;
              }
              t = function() {
                yl !== 2 && yl !== 9 || Tl !== l || (yl = 7), Kt(l);
              }, n.then(t, t);
              break l;
            case 3:
              yl = 7;
              break l;
            case 4:
              yl = 5;
              break l;
            case 7:
              Eo(n) ? (yl = 0, pt = null, dr(t)) : (yl = 0, pt = null, Ja(l, t, n, 7));
              break;
            case 5:
              var i = null;
              switch (ll.tag) {
                case 26:
                  i = ll.memoizedState;
                case 5:
                case 27:
                  var c = ll;
                  if (i ? Fr(i) : c.stateNode.complete) {
                    yl = 0, pt = null;
                    var s = c.sibling;
                    if (s !== null) ll = s;
                    else {
                      var y = c.return;
                      y !== null ? (ll = y, In(y)) : ll = null;
                    }
                    break t;
                  }
              }
              yl = 0, pt = null, Ja(l, t, n, 5);
              break;
            case 6:
              yl = 0, pt = null, Ja(l, t, n, 6);
              break;
            case 8:
              sf(), xl = 6;
              break l;
            default:
              throw Error(d(462));
          }
        }
        h0();
        break;
      } catch (b) {
        ir(l, b);
      }
    while (!0);
    return Pt = ta = null, S.H = a, S.A = u, rl = e, ll !== null ? 0 : (Tl = null, el = 0, gn(), xl);
  }
  function h0() {
    for (; ll !== null && !ft(); )
      or(ll);
  }
  function or(l) {
    var t = xd(l.alternate, l, se);
    l.memoizedProps = l.pendingProps, t === null ? In(l) : ll = t;
  }
  function dr(l) {
    var t = l, e = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Md(
          e,
          t,
          t.pendingProps,
          t.type,
          void 0,
          el
        );
        break;
      case 11:
        t = Md(
          e,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          el
        );
        break;
      case 5:
        Ac(t);
      default:
        qd(e, t), t = ll = fo(t, se), t = xd(e, t, se);
    }
    l.memoizedProps = l.pendingProps, t === null ? In(l) : ll = t;
  }
  function Ja(l, t, e, a) {
    Pt = ta = null, Ac(t), Ha = null, _u = 0;
    var u = t.return;
    try {
      if (u0(
        l,
        u,
        t,
        e,
        el
      )) {
        xl = 1, Gn(
          l,
          jt(e, l.current)
        ), ll = null;
        return;
      }
    } catch (n) {
      if (u !== null) throw ll = u, n;
      xl = 1, Gn(
        l,
        jt(e, l.current)
      ), ll = null;
      return;
    }
    t.flags & 32768 ? (nl || a === 1 ? l = !0 : Va || (el & 536870912) !== 0 ? l = !1 : (Ne = l = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = zt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), rr(t, l)) : In(t);
  }
  function In(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        rr(
          t,
          Ne
        );
        return;
      }
      l = t.return;
      var e = c0(
        t.alternate,
        t,
        se
      );
      if (e !== null) {
        ll = e;
        return;
      }
      if (t = t.sibling, t !== null) {
        ll = t;
        return;
      }
      ll = t = l;
    } while (t !== null);
    xl === 0 && (xl = 5);
  }
  function rr(l, t) {
    do {
      var e = f0(l.alternate, l);
      if (e !== null) {
        e.flags &= 32767, ll = e;
        return;
      }
      if (e = l.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !t && (l = l.sibling, l !== null)) {
        ll = l;
        return;
      }
      ll = l = e;
    } while (l !== null);
    xl = 6, ll = null;
  }
  function vr(l, t, e, a, u, n, i, c, s) {
    l.cancelPendingCommit = null;
    do
      Pn();
    while (Wl !== 0);
    if ((rl & 6) !== 0) throw Error(d(327));
    if (t !== null) {
      if (t === l.current) throw Error(d(177));
      if (n = t.lanes | t.childLanes, n |= ki, $v(
        l,
        e,
        n,
        i,
        c,
        s
      ), l === Tl && (ll = Tl = null, el = 0), La = t, je = l, oe = e, nf = n, cf = u, er = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, E0(Je, function() {
        return Sr(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = S.T, S.T = null, u = R.p, R.p = 2, i = rl, rl |= 4;
        try {
          s0(l, t, e);
        } finally {
          rl = i, R.p = u, S.T = a;
        }
      }
      Wl = 1, mr(), yr(), hr();
    }
  }
  function mr() {
    if (Wl === 1) {
      Wl = 0;
      var l = je, t = La, e = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || e) {
        e = S.T, S.T = null;
        var a = R.p;
        R.p = 2;
        var u = rl;
        rl |= 4;
        try {
          Wd(t, l);
          var n = Tf, i = Ps(l.containerInfo), c = n.focusedElem, s = n.selectionRange;
          if (i !== c && c && c.ownerDocument && Is(
            c.ownerDocument.documentElement,
            c
          )) {
            if (s !== null && Ji(c)) {
              var y = s.start, b = s.end;
              if (b === void 0 && (b = y), "selectionStart" in c)
                c.selectionStart = y, c.selectionEnd = Math.min(
                  b,
                  c.value.length
                );
              else {
                var A = c.ownerDocument || document, h = A && A.defaultView || window;
                if (h.getSelection) {
                  var g = h.getSelection(), j = c.textContent.length, Z = Math.min(s.start, j), _l = s.end === void 0 ? Z : Math.min(s.end, j);
                  !g.extend && Z > _l && (i = _l, _l = Z, Z = i);
                  var v = ks(
                    c,
                    Z
                  ), o = ks(
                    c,
                    _l
                  );
                  if (v && o && (g.rangeCount !== 1 || g.anchorNode !== v.node || g.anchorOffset !== v.offset || g.focusNode !== o.node || g.focusOffset !== o.offset)) {
                    var m = A.createRange();
                    m.setStart(v.node, v.offset), g.removeAllRanges(), Z > _l ? (g.addRange(m), g.extend(o.node, o.offset)) : (m.setEnd(o.node, o.offset), g.addRange(m));
                  }
                }
              }
            }
            for (A = [], g = c; g = g.parentNode; )
              g.nodeType === 1 && A.push({
                element: g,
                left: g.scrollLeft,
                top: g.scrollTop
              });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < A.length; c++) {
              var T = A[c];
              T.element.scrollLeft = T.left, T.element.scrollTop = T.top;
            }
          }
          di = !!_f, Tf = _f = null;
        } finally {
          rl = u, R.p = a, S.T = e;
        }
      }
      l.current = t, Wl = 2;
    }
  }
  function yr() {
    if (Wl === 2) {
      Wl = 0;
      var l = je, t = La, e = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || e) {
        e = S.T, S.T = null;
        var a = R.p;
        R.p = 2;
        var u = rl;
        rl |= 4;
        try {
          Zd(l, t.alternate, t);
        } finally {
          rl = u, R.p = a, S.T = e;
        }
      }
      Wl = 3;
    }
  }
  function hr() {
    if (Wl === 4 || Wl === 3) {
      Wl = 0, Ql();
      var l = je, t = La, e = oe, a = er;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Wl = 5 : (Wl = 0, La = je = null, gr(l, l.pendingLanes));
      var u = l.pendingLanes;
      if (u === 0 && (Ue = null), Di(e), t = t.stateNode, bt && typeof bt.onCommitFiberRoot == "function")
        try {
          bt.onCommitFiberRoot(
            wt,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        t = S.T, u = R.p, R.p = 2, S.T = null;
        try {
          for (var n = l.onRecoverableError, i = 0; i < a.length; i++) {
            var c = a[i];
            n(c.value, {
              componentStack: c.stack
            });
          }
        } finally {
          S.T = t, R.p = u;
        }
      }
      (oe & 3) !== 0 && Pn(), Kt(l), u = l.pendingLanes, (e & 261930) !== 0 && (u & 42) !== 0 ? l === ff ? Yu++ : (Yu = 0, ff = l) : Yu = 0, Gu(0);
    }
  }
  function gr(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, bu(t)));
  }
  function Pn() {
    return mr(), yr(), hr(), Sr();
  }
  function Sr() {
    if (Wl !== 5) return !1;
    var l = je, t = nf;
    nf = 0;
    var e = Di(oe), a = S.T, u = R.p;
    try {
      R.p = 32 > e ? 32 : e, S.T = null, e = cf, cf = null;
      var n = je, i = oe;
      if (Wl = 0, La = je = null, oe = 0, (rl & 6) !== 0) throw Error(d(331));
      var c = rl;
      if (rl |= 4, Pd(n.current), Fd(
        n,
        n.current,
        i,
        e
      ), rl = c, Gu(0, !1), bt && typeof bt.onPostCommitFiberRoot == "function")
        try {
          bt.onPostCommitFiberRoot(wt, n);
        } catch {
        }
      return !0;
    } finally {
      R.p = u, S.T = a, gr(l, t);
    }
  }
  function br(l, t, e) {
    t = jt(e, t), t = Gc(l.stateNode, t, 2), l = pe(l, t, 2), l !== null && (nu(l, 2), Kt(l));
  }
  function hl(l, t, e) {
    if (l.tag === 3)
      br(l, l, e);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          br(
            t,
            l,
            e
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Ue === null || !Ue.has(a))) {
            l = jt(e, l), e = Ed(2), a = pe(t, e, 2), a !== null && (_d(
              e,
              a,
              t,
              l
            ), nu(a, 2), Kt(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function df(l, t, e) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new r0();
      var u = /* @__PURE__ */ new Set();
      a.set(t, u);
    } else
      u = a.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), a.set(t, u));
    u.has(e) || (ef = !0, u.add(e), l = g0.bind(null, l, t, e), t.then(l, l));
  }
  function g0(l, t, e) {
    var a = l.pingCache;
    a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & e, l.warmLanes &= ~e, Tl === l && (el & e) === e && (xl === 4 || xl === 3 && (el & 62914560) === el && 300 > Ol() - wn ? (rl & 2) === 0 && Ka(l, 0) : af |= e, Za === el && (Za = 0)), Kt(l);
  }
  function Er(l, t) {
    t === 0 && (t = vs()), l = Ie(l, t), l !== null && (nu(l, t), Kt(l));
  }
  function S0(l) {
    var t = l.memoizedState, e = 0;
    t !== null && (e = t.retryLane), Er(l, e);
  }
  function b0(l, t) {
    var e = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var a = l.stateNode, u = l.memoizedState;
        u !== null && (e = u.retryLane);
        break;
      case 19:
        a = l.stateNode;
        break;
      case 22:
        a = l.stateNode._retryCache;
        break;
      default:
        throw Error(d(314));
    }
    a !== null && a.delete(t), Er(l, e);
  }
  function E0(l, t) {
    return pl(l, t);
  }
  var li = null, wa = null, rf = !1, ti = !1, vf = !1, xe = 0;
  function Kt(l) {
    l !== wa && l.next === null && (wa === null ? li = wa = l : wa = wa.next = l), ti = !0, rf || (rf = !0, T0());
  }
  function Gu(l, t) {
    if (!vf && ti) {
      vf = !0;
      do
        for (var e = !1, a = li; a !== null; ) {
          if (l !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = a.suspendedLanes, c = a.pingedLanes;
              n = (1 << 31 - Et(42 | l) + 1) - 1, n &= u & ~(i & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (e = !0, Ar(a, n));
          } else
            n = el, n = un(
              a,
              a === Tl ? n : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (n & 3) === 0 || uu(a, n) || (e = !0, Ar(a, n));
          a = a.next;
        }
      while (e);
      vf = !1;
    }
  }
  function _0() {
    _r();
  }
  function _r() {
    ti = rf = !1;
    var l = 0;
    xe !== 0 && j0() && (l = xe);
    for (var t = Ol(), e = null, a = li; a !== null; ) {
      var u = a.next, n = Tr(a, t);
      n === 0 ? (a.next = null, e === null ? li = u : e.next = u, u === null && (wa = e)) : (e = a, (l !== 0 || (n & 3) !== 0) && (ti = !0)), a = u;
    }
    Wl !== 0 && Wl !== 5 || Gu(l), xe !== 0 && (xe = 0);
  }
  function Tr(l, t) {
    for (var e = l.suspendedLanes, a = l.pingedLanes, u = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
      var i = 31 - Et(n), c = 1 << i, s = u[i];
      s === -1 ? ((c & e) === 0 || (c & a) !== 0) && (u[i] = Wv(c, t)) : s <= t && (l.expiredLanes |= c), n &= ~c;
    }
    if (t = Tl, e = el, e = un(
      l,
      l === t ? e : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a = l.callbackNode, e === 0 || l === t && (yl === 2 || yl === 9) || l.cancelPendingCommit !== null)
      return a !== null && a !== null && ct(a), l.callbackNode = null, l.callbackPriority = 0;
    if ((e & 3) === 0 || uu(l, e)) {
      if (t = e & -e, t === l.callbackPriority) return t;
      switch (a !== null && ct(a), Di(e)) {
        case 2:
        case 8:
          e = eu;
          break;
        case 32:
          e = Je;
          break;
        case 268435456:
          e = Mt;
          break;
        default:
          e = Je;
      }
      return a = zr.bind(null, l), e = pl(e, a), l.callbackPriority = t, l.callbackNode = e, t;
    }
    return a !== null && a !== null && ct(a), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function zr(l, t) {
    if (Wl !== 0 && Wl !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var e = l.callbackNode;
    if (Pn() && l.callbackNode !== e)
      return null;
    var a = el;
    return a = un(
      l,
      l === Tl ? a : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a === 0 ? null : (ur(l, a, t), Tr(l, Ol()), l.callbackNode != null && l.callbackNode === e ? zr.bind(null, l) : null);
  }
  function Ar(l, t) {
    if (Pn()) return null;
    ur(l, t, !0);
  }
  function T0() {
    x0(function() {
      (rl & 6) !== 0 ? pl(
        ye,
        _0
      ) : _r();
    });
  }
  function mf() {
    if (xe === 0) {
      var l = ja;
      l === 0 && (l = tn, tn <<= 1, (tn & 261888) === 0 && (tn = 256)), xe = l;
    }
    return xe;
  }
  function pr(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : sn("" + l);
  }
  function Or(l, t) {
    var e = t.ownerDocument.createElement("input");
    return e.name = t.name, e.value = t.value, l.id && e.setAttribute("form", l.id), t.parentNode.insertBefore(e, t), l = new FormData(l), e.parentNode.removeChild(e), l;
  }
  function z0(l, t, e, a, u) {
    if (t === "submit" && e && e.stateNode === u) {
      var n = pr(
        (u[ot] || null).action
      ), i = a.submitter;
      i && (t = (t = i[ot] || null) ? pr(t.formAction) : i.getAttribute("formAction"), t !== null && (n = t, i = null));
      var c = new vn(
        "action",
        "action",
        null,
        a,
        u
      );
      l.push({
        event: c,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (xe !== 0) {
                  var s = i ? Or(u, i) : new FormData(u);
                  Cc(
                    e,
                    {
                      pending: !0,
                      data: s,
                      method: u.method,
                      action: n
                    },
                    null,
                    s
                  );
                }
              } else
                typeof n == "function" && (c.preventDefault(), s = i ? Or(u, i) : new FormData(u), Cc(
                  e,
                  {
                    pending: !0,
                    data: s,
                    method: u.method,
                    action: n
                  },
                  n,
                  s
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var yf = 0; yf < Fi.length; yf++) {
    var hf = Fi[yf], A0 = hf.toLowerCase(), p0 = hf[0].toUpperCase() + hf.slice(1);
    Gt(
      A0,
      "on" + p0
    );
  }
  Gt(eo, "onAnimationEnd"), Gt(ao, "onAnimationIteration"), Gt(uo, "onAnimationStart"), Gt("dblclick", "onDoubleClick"), Gt("focusin", "onFocus"), Gt("focusout", "onBlur"), Gt(Qm, "onTransitionRun"), Gt(Vm, "onTransitionStart"), Gt(Zm, "onTransitionCancel"), Gt(no, "onTransitionEnd"), Sa("onMouseEnter", ["mouseout", "mouseover"]), Sa("onMouseLeave", ["mouseout", "mouseover"]), Sa("onPointerEnter", ["pointerout", "pointerover"]), Sa("onPointerLeave", ["pointerout", "pointerover"]), We(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), We(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), We("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), We(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), We(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), We(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Xu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), O0 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Xu)
  );
  function Dr(l, t) {
    t = (t & 4) !== 0;
    for (var e = 0; e < l.length; e++) {
      var a = l[e], u = a.event;
      a = a.listeners;
      l: {
        var n = void 0;
        if (t)
          for (var i = a.length - 1; 0 <= i; i--) {
            var c = a[i], s = c.instance, y = c.currentTarget;
            if (c = c.listener, s !== n && u.isPropagationStopped())
              break l;
            n = c, u.currentTarget = y;
            try {
              n(u);
            } catch (b) {
              hn(b);
            }
            u.currentTarget = null, n = s;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (c = a[i], s = c.instance, y = c.currentTarget, c = c.listener, s !== n && u.isPropagationStopped())
              break l;
            n = c, u.currentTarget = y;
            try {
              n(u);
            } catch (b) {
              hn(b);
            }
            u.currentTarget = null, n = s;
          }
      }
    }
  }
  function tl(l, t) {
    var e = t[Mi];
    e === void 0 && (e = t[Mi] = /* @__PURE__ */ new Set());
    var a = l + "__bubble";
    e.has(a) || (Mr(t, l, 2, !1), e.add(a));
  }
  function gf(l, t, e) {
    var a = 0;
    t && (a |= 4), Mr(
      e,
      l,
      a,
      t
    );
  }
  var ei = "_reactListening" + Math.random().toString(36).slice(2);
  function Sf(l) {
    if (!l[ei]) {
      l[ei] = !0, Es.forEach(function(e) {
        e !== "selectionchange" && (O0.has(e) || gf(e, !1, l), gf(e, !0, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[ei] || (t[ei] = !0, gf("selectionchange", !1, t));
    }
  }
  function Mr(l, t, e, a) {
    switch (av(t)) {
      case 2:
        var u = ly;
        break;
      case 8:
        u = ty;
        break;
      default:
        u = Cf;
    }
    e = u.bind(
      null,
      t,
      e,
      l
    ), u = void 0, !Bi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), a ? u !== void 0 ? l.addEventListener(t, e, {
      capture: !0,
      passive: u
    }) : l.addEventListener(t, e, !0) : u !== void 0 ? l.addEventListener(t, e, {
      passive: u
    }) : l.addEventListener(t, e, !1);
  }
  function bf(l, t, e, a, u) {
    var n = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      l: for (; ; ) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var c = a.stateNode.containerInfo;
          if (c === u) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var s = i.tag;
              if ((s === 3 || s === 4) && i.stateNode.containerInfo === u)
                return;
              i = i.return;
            }
          for (; c !== null; ) {
            if (i = ya(c), i === null) return;
            if (s = i.tag, s === 5 || s === 6 || s === 26 || s === 27) {
              a = n = i;
              continue l;
            }
            c = c.parentNode;
          }
        }
        a = a.return;
      }
    js(function() {
      var y = n, b = Hi(e), A = [];
      l: {
        var h = io.get(l);
        if (h !== void 0) {
          var g = vn, j = l;
          switch (l) {
            case "keypress":
              if (dn(e) === 0) break l;
            case "keydown":
            case "keyup":
              g = bm;
              break;
            case "focusin":
              j = "focus", g = Qi;
              break;
            case "focusout":
              j = "blur", g = Qi;
              break;
            case "beforeblur":
            case "afterblur":
              g = Qi;
              break;
            case "click":
              if (e.button === 2) break l;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              g = Hs;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              g = cm;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              g = Tm;
              break;
            case eo:
            case ao:
            case uo:
              g = om;
              break;
            case no:
              g = Am;
              break;
            case "scroll":
            case "scrollend":
              g = nm;
              break;
            case "wheel":
              g = Om;
              break;
            case "copy":
            case "cut":
            case "paste":
              g = rm;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              g = Bs;
              break;
            case "toggle":
            case "beforetoggle":
              g = Mm;
          }
          var Z = (t & 4) !== 0, _l = !Z && (l === "scroll" || l === "scrollend"), v = Z ? h !== null ? h + "Capture" : null : h;
          Z = [];
          for (var o = y, m; o !== null; ) {
            var T = o;
            if (m = T.stateNode, T = T.tag, T !== 5 && T !== 26 && T !== 27 || m === null || v === null || (T = fu(o, v), T != null && Z.push(
              Qu(o, T, m)
            )), _l) break;
            o = o.return;
          }
          0 < Z.length && (h = new g(
            h,
            j,
            null,
            e,
            b
          ), A.push({ event: h, listeners: Z }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (h = l === "mouseover" || l === "pointerover", g = l === "mouseout" || l === "pointerout", h && e !== xi && (j = e.relatedTarget || e.fromElement) && (ya(j) || j[ma]))
            break l;
          if ((g || h) && (h = b.window === b ? b : (h = b.ownerDocument) ? h.defaultView || h.parentWindow : window, g ? (j = e.relatedTarget || e.toElement, g = y, j = j ? ya(j) : null, j !== null && (_l = B(j), Z = j.tag, j !== _l || Z !== 5 && Z !== 27 && Z !== 6) && (j = null)) : (g = null, j = y), g !== j)) {
            if (Z = Hs, T = "onMouseLeave", v = "onMouseEnter", o = "mouse", (l === "pointerout" || l === "pointerover") && (Z = Bs, T = "onPointerLeave", v = "onPointerEnter", o = "pointer"), _l = g == null ? h : cu(g), m = j == null ? h : cu(j), h = new Z(
              T,
              o + "leave",
              g,
              e,
              b
            ), h.target = _l, h.relatedTarget = m, T = null, ya(b) === y && (Z = new Z(
              v,
              o + "enter",
              j,
              e,
              b
            ), Z.target = m, Z.relatedTarget = _l, T = Z), _l = T, g && j)
              t: {
                for (Z = D0, v = g, o = j, m = 0, T = v; T; T = Z(T))
                  m++;
                T = 0;
                for (var G = o; G; G = Z(G))
                  T++;
                for (; 0 < m - T; )
                  v = Z(v), m--;
                for (; 0 < T - m; )
                  o = Z(o), T--;
                for (; m--; ) {
                  if (v === o || o !== null && v === o.alternate) {
                    Z = v;
                    break t;
                  }
                  v = Z(v), o = Z(o);
                }
                Z = null;
              }
            else Z = null;
            g !== null && Nr(
              A,
              h,
              g,
              Z,
              !1
            ), j !== null && _l !== null && Nr(
              A,
              _l,
              j,
              Z,
              !0
            );
          }
        }
        l: {
          if (h = y ? cu(y) : window, g = h.nodeName && h.nodeName.toLowerCase(), g === "select" || g === "input" && h.type === "file")
            var sl = Ks;
          else if (Zs(h))
            if (Js)
              sl = Ym;
            else {
              sl = qm;
              var H = Hm;
            }
          else
            g = h.nodeName, !g || g.toLowerCase() !== "input" || h.type !== "checkbox" && h.type !== "radio" ? y && Ci(y.elementType) && (sl = Ks) : sl = Bm;
          if (sl && (sl = sl(l, y))) {
            Ls(
              A,
              sl,
              e,
              b
            );
            break l;
          }
          H && H(l, h, y), l === "focusout" && y && h.type === "number" && y.memoizedProps.value != null && ji(h, "number", h.value);
        }
        switch (H = y ? cu(y) : window, l) {
          case "focusin":
            (Zs(H) || H.contentEditable === "true") && (Aa = H, wi = y, hu = null);
            break;
          case "focusout":
            hu = wi = Aa = null;
            break;
          case "mousedown":
            Wi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Wi = !1, lo(A, e, b);
            break;
          case "selectionchange":
            if (Xm) break;
          case "keydown":
          case "keyup":
            lo(A, e, b);
        }
        var F;
        if (Zi)
          l: {
            switch (l) {
              case "compositionstart":
                var al = "onCompositionStart";
                break l;
              case "compositionend":
                al = "onCompositionEnd";
                break l;
              case "compositionupdate":
                al = "onCompositionUpdate";
                break l;
            }
            al = void 0;
          }
        else
          za ? Qs(l, e) && (al = "onCompositionEnd") : l === "keydown" && e.keyCode === 229 && (al = "onCompositionStart");
        al && (Ys && e.locale !== "ko" && (za || al !== "onCompositionStart" ? al === "onCompositionEnd" && za && (F = Cs()) : (Se = b, Yi = "value" in Se ? Se.value : Se.textContent, za = !0)), H = ai(y, al), 0 < H.length && (al = new qs(
          al,
          l,
          null,
          e,
          b
        ), A.push({ event: al, listeners: H }), F ? al.data = F : (F = Vs(e), F !== null && (al.data = F)))), (F = Rm ? Um(l, e) : jm(l, e)) && (al = ai(y, "onBeforeInput"), 0 < al.length && (H = new qs(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          b
        ), A.push({
          event: H,
          listeners: al
        }), H.data = F)), z0(
          A,
          l,
          y,
          e,
          b
        );
      }
      Dr(A, t);
    });
  }
  function Qu(l, t, e) {
    return {
      instance: l,
      listener: t,
      currentTarget: e
    };
  }
  function ai(l, t) {
    for (var e = t + "Capture", a = []; l !== null; ) {
      var u = l, n = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || n === null || (u = fu(l, e), u != null && a.unshift(
        Qu(l, u, n)
      ), u = fu(l, t), u != null && a.push(
        Qu(l, u, n)
      )), l.tag === 3) return a;
      l = l.return;
    }
    return [];
  }
  function D0(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Nr(l, t, e, a, u) {
    for (var n = t._reactName, i = []; e !== null && e !== a; ) {
      var c = e, s = c.alternate, y = c.stateNode;
      if (c = c.tag, s !== null && s === a) break;
      c !== 5 && c !== 26 && c !== 27 || y === null || (s = y, u ? (y = fu(e, n), y != null && i.unshift(
        Qu(e, y, s)
      )) : u || (y = fu(e, n), y != null && i.push(
        Qu(e, y, s)
      ))), e = e.return;
    }
    i.length !== 0 && l.push({ event: t, listeners: i });
  }
  var M0 = /\r\n?/g, N0 = /\u0000|\uFFFD/g;
  function Rr(l) {
    return (typeof l == "string" ? l : "" + l).replace(M0, `
`).replace(N0, "");
  }
  function Ur(l, t) {
    return t = Rr(t), Rr(l) === t;
  }
  function El(l, t, e, a, u, n) {
    switch (e) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || Ea(l, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && Ea(l, "" + a);
        break;
      case "className":
        cn(l, "class", a);
        break;
      case "tabIndex":
        cn(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        cn(l, e, a);
        break;
      case "style":
        Rs(l, a, n);
        break;
      case "data":
        if (t !== "object") {
          cn(l, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || e !== "href")) {
          l.removeAttribute(e);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        a = sn("" + a), l.setAttribute(e, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          l.setAttribute(
            e,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof n == "function" && (e === "formAction" ? (t !== "input" && El(l, t, "name", u.name, u, null), El(
            l,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), El(
            l,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), El(
            l,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (El(l, t, "encType", u.encType, u, null), El(l, t, "method", u.method, u, null), El(l, t, "target", u.target, u, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        a = sn("" + a), l.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (l.onclick = $t);
        break;
      case "onScroll":
        a != null && tl("scroll", l);
        break;
      case "onScrollEnd":
        a != null && tl("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(d(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(d(60));
            l.innerHTML = e;
          }
        }
        break;
      case "multiple":
        l.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        l.muted = a && typeof a != "function" && typeof a != "symbol";
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
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          l.removeAttribute("xlink:href");
          break;
        }
        e = sn("" + a), l.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          e
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
        a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, "" + a) : l.removeAttribute(e);
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
        a && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, "") : l.removeAttribute(e);
        break;
      case "capture":
      case "download":
        a === !0 ? l.setAttribute(e, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, a) : l.removeAttribute(e);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? l.setAttribute(e, a) : l.removeAttribute(e);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? l.removeAttribute(e) : l.setAttribute(e, a);
        break;
      case "popover":
        tl("beforetoggle", l), tl("toggle", l), nn(l, "popover", a);
        break;
      case "xlinkActuate":
        Wt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Wt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Wt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Wt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Wt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Wt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Wt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Wt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Wt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        nn(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = am.get(e) || e, nn(l, e, a));
    }
  }
  function Ef(l, t, e, a, u, n) {
    switch (e) {
      case "style":
        Rs(l, a, n);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(d(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(d(60));
            l.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof a == "string" ? Ea(l, a) : (typeof a == "number" || typeof a == "bigint") && Ea(l, "" + a);
        break;
      case "onScroll":
        a != null && tl("scroll", l);
        break;
      case "onScrollEnd":
        a != null && tl("scrollend", l);
        break;
      case "onClick":
        a != null && (l.onclick = $t);
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
        if (!_s.hasOwnProperty(e))
          l: {
            if (e[0] === "o" && e[1] === "n" && (u = e.endsWith("Capture"), t = e.slice(2, u ? e.length - 7 : void 0), n = l[ot] || null, n = n != null ? n[e] : null, typeof n == "function" && l.removeEventListener(t, n, u), typeof a == "function")) {
              typeof n != "function" && n !== null && (e in l ? l[e] = null : l.hasAttribute(e) && l.removeAttribute(e)), l.addEventListener(t, a, u);
              break l;
            }
            e in l ? l[e] = a : a === !0 ? l.setAttribute(e, "") : nn(l, e, a);
          }
    }
  }
  function et(l, t, e) {
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
        tl("error", l), tl("load", l);
        var a = !1, u = !1, n;
        for (n in e)
          if (e.hasOwnProperty(n)) {
            var i = e[n];
            if (i != null)
              switch (n) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(d(137, t));
                default:
                  El(l, t, n, i, e, null);
              }
          }
        u && El(l, t, "srcSet", e.srcSet, e, null), a && El(l, t, "src", e.src, e, null);
        return;
      case "input":
        tl("invalid", l);
        var c = n = i = u = null, s = null, y = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var b = e[a];
            if (b != null)
              switch (a) {
                case "name":
                  u = b;
                  break;
                case "type":
                  i = b;
                  break;
                case "checked":
                  s = b;
                  break;
                case "defaultChecked":
                  y = b;
                  break;
                case "value":
                  n = b;
                  break;
                case "defaultValue":
                  c = b;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (b != null)
                    throw Error(d(137, t));
                  break;
                default:
                  El(l, t, a, b, e, null);
              }
          }
        Os(
          l,
          n,
          c,
          s,
          y,
          i,
          u,
          !1
        );
        return;
      case "select":
        tl("invalid", l), a = i = n = null;
        for (u in e)
          if (e.hasOwnProperty(u) && (c = e[u], c != null))
            switch (u) {
              case "value":
                n = c;
                break;
              case "defaultValue":
                i = c;
                break;
              case "multiple":
                a = c;
              default:
                El(l, t, u, c, e, null);
            }
        t = n, e = i, l.multiple = !!a, t != null ? ba(l, !!a, t, !1) : e != null && ba(l, !!a, e, !0);
        return;
      case "textarea":
        tl("invalid", l), n = u = a = null;
        for (i in e)
          if (e.hasOwnProperty(i) && (c = e[i], c != null))
            switch (i) {
              case "value":
                a = c;
                break;
              case "defaultValue":
                u = c;
                break;
              case "children":
                n = c;
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(d(91));
                break;
              default:
                El(l, t, i, c, e, null);
            }
        Ms(l, a, u, n);
        return;
      case "option":
        for (s in e)
          if (e.hasOwnProperty(s) && (a = e[s], a != null))
            switch (s) {
              case "selected":
                l.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                El(l, t, s, a, e, null);
            }
        return;
      case "dialog":
        tl("beforetoggle", l), tl("toggle", l), tl("cancel", l), tl("close", l);
        break;
      case "iframe":
      case "object":
        tl("load", l);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Xu.length; a++)
          tl(Xu[a], l);
        break;
      case "image":
        tl("error", l), tl("load", l);
        break;
      case "details":
        tl("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        tl("error", l), tl("load", l);
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
        for (y in e)
          if (e.hasOwnProperty(y) && (a = e[y], a != null))
            switch (y) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(d(137, t));
              default:
                El(l, t, y, a, e, null);
            }
        return;
      default:
        if (Ci(t)) {
          for (b in e)
            e.hasOwnProperty(b) && (a = e[b], a !== void 0 && Ef(
              l,
              t,
              b,
              a,
              e,
              void 0
            ));
          return;
        }
    }
    for (c in e)
      e.hasOwnProperty(c) && (a = e[c], a != null && El(l, t, c, a, e, null));
  }
  function R0(l, t, e, a) {
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
        var u = null, n = null, i = null, c = null, s = null, y = null, b = null;
        for (g in e) {
          var A = e[g];
          if (e.hasOwnProperty(g) && A != null)
            switch (g) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                s = A;
              default:
                a.hasOwnProperty(g) || El(l, t, g, null, a, A);
            }
        }
        for (var h in a) {
          var g = a[h];
          if (A = e[h], a.hasOwnProperty(h) && (g != null || A != null))
            switch (h) {
              case "type":
                n = g;
                break;
              case "name":
                u = g;
                break;
              case "checked":
                y = g;
                break;
              case "defaultChecked":
                b = g;
                break;
              case "value":
                i = g;
                break;
              case "defaultValue":
                c = g;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (g != null)
                  throw Error(d(137, t));
                break;
              default:
                g !== A && El(
                  l,
                  t,
                  h,
                  g,
                  a,
                  A
                );
            }
        }
        Ui(
          l,
          i,
          c,
          s,
          y,
          b,
          n,
          u
        );
        return;
      case "select":
        g = i = c = h = null;
        for (n in e)
          if (s = e[n], e.hasOwnProperty(n) && s != null)
            switch (n) {
              case "value":
                break;
              case "multiple":
                g = s;
              default:
                a.hasOwnProperty(n) || El(
                  l,
                  t,
                  n,
                  null,
                  a,
                  s
                );
            }
        for (u in a)
          if (n = a[u], s = e[u], a.hasOwnProperty(u) && (n != null || s != null))
            switch (u) {
              case "value":
                h = n;
                break;
              case "defaultValue":
                c = n;
                break;
              case "multiple":
                i = n;
              default:
                n !== s && El(
                  l,
                  t,
                  u,
                  n,
                  a,
                  s
                );
            }
        t = c, e = i, a = g, h != null ? ba(l, !!e, h, !1) : !!a != !!e && (t != null ? ba(l, !!e, t, !0) : ba(l, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        g = h = null;
        for (c in e)
          if (u = e[c], e.hasOwnProperty(c) && u != null && !a.hasOwnProperty(c))
            switch (c) {
              case "value":
                break;
              case "children":
                break;
              default:
                El(l, t, c, null, a, u);
            }
        for (i in a)
          if (u = a[i], n = e[i], a.hasOwnProperty(i) && (u != null || n != null))
            switch (i) {
              case "value":
                h = u;
                break;
              case "defaultValue":
                g = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(d(91));
                break;
              default:
                u !== n && El(l, t, i, u, a, n);
            }
        Ds(l, h, g);
        return;
      case "option":
        for (var j in e)
          if (h = e[j], e.hasOwnProperty(j) && h != null && !a.hasOwnProperty(j))
            switch (j) {
              case "selected":
                l.selected = !1;
                break;
              default:
                El(
                  l,
                  t,
                  j,
                  null,
                  a,
                  h
                );
            }
        for (s in a)
          if (h = a[s], g = e[s], a.hasOwnProperty(s) && h !== g && (h != null || g != null))
            switch (s) {
              case "selected":
                l.selected = h && typeof h != "function" && typeof h != "symbol";
                break;
              default:
                El(
                  l,
                  t,
                  s,
                  h,
                  a,
                  g
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
        for (var Z in e)
          h = e[Z], e.hasOwnProperty(Z) && h != null && !a.hasOwnProperty(Z) && El(l, t, Z, null, a, h);
        for (y in a)
          if (h = a[y], g = e[y], a.hasOwnProperty(y) && h !== g && (h != null || g != null))
            switch (y) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (h != null)
                  throw Error(d(137, t));
                break;
              default:
                El(
                  l,
                  t,
                  y,
                  h,
                  a,
                  g
                );
            }
        return;
      default:
        if (Ci(t)) {
          for (var _l in e)
            h = e[_l], e.hasOwnProperty(_l) && h !== void 0 && !a.hasOwnProperty(_l) && Ef(
              l,
              t,
              _l,
              void 0,
              a,
              h
            );
          for (b in a)
            h = a[b], g = e[b], !a.hasOwnProperty(b) || h === g || h === void 0 && g === void 0 || Ef(
              l,
              t,
              b,
              h,
              a,
              g
            );
          return;
        }
    }
    for (var v in e)
      h = e[v], e.hasOwnProperty(v) && h != null && !a.hasOwnProperty(v) && El(l, t, v, null, a, h);
    for (A in a)
      h = a[A], g = e[A], !a.hasOwnProperty(A) || h === g || h == null && g == null || El(l, t, A, h, a, g);
  }
  function jr(l) {
    switch (l) {
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
  function U0() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, t = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var u = e[a], n = u.transferSize, i = u.initiatorType, c = u.duration;
        if (n && c && jr(i)) {
          for (i = 0, c = u.responseEnd, a += 1; a < e.length; a++) {
            var s = e[a], y = s.startTime;
            if (y > c) break;
            var b = s.transferSize, A = s.initiatorType;
            b && jr(A) && (s = s.responseEnd, i += b * (s < c ? 1 : (c - y) / (s - y)));
          }
          if (--a, t += 8 * (n + i) / (u.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var _f = null, Tf = null;
  function ui(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Cr(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function xr(l, t) {
    if (l === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && t === "foreignObject" ? 0 : l;
  }
  function zf(l, t) {
    return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Af = null;
  function j0() {
    var l = window.event;
    return l && l.type === "popstate" ? l === Af ? !1 : (Af = l, !0) : (Af = null, !1);
  }
  var Hr = typeof setTimeout == "function" ? setTimeout : void 0, C0 = typeof clearTimeout == "function" ? clearTimeout : void 0, qr = typeof Promise == "function" ? Promise : void 0, x0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof qr < "u" ? function(l) {
    return qr.resolve(null).then(l).catch(H0);
  } : Hr;
  function H0(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function He(l) {
    return l === "head";
  }
  function Br(l, t) {
    var e = t, a = 0;
    do {
      var u = e.nextSibling;
      if (l.removeChild(e), u && u.nodeType === 8)
        if (e = u.data, e === "/$" || e === "/&") {
          if (a === 0) {
            l.removeChild(u), ka(t);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          Vu(l.ownerDocument.documentElement);
        else if (e === "head") {
          e = l.ownerDocument.head, Vu(e);
          for (var n = e.firstChild; n; ) {
            var i = n.nextSibling, c = n.nodeName;
            n[iu] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && n.rel.toLowerCase() === "stylesheet" || e.removeChild(n), n = i;
          }
        } else
          e === "body" && Vu(l.ownerDocument.body);
      e = u;
    } while (e);
    ka(t);
  }
  function Yr(l, t) {
    var e = l;
    l = 0;
    do {
      var a = e.nextSibling;
      if (e.nodeType === 1 ? t ? (e._stashedDisplay = e.style.display, e.style.display = "none") : (e.style.display = e._stashedDisplay || "", e.getAttribute("style") === "" && e.removeAttribute("style")) : e.nodeType === 3 && (t ? (e._stashedText = e.nodeValue, e.nodeValue = "") : e.nodeValue = e._stashedText || ""), a && a.nodeType === 8)
        if (e = a.data, e === "/$") {
          if (l === 0) break;
          l--;
        } else
          e !== "$" && e !== "$?" && e !== "$~" && e !== "$!" || l++;
      e = a;
    } while (e);
  }
  function pf(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var e = t;
      switch (t = t.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          pf(e), Ni(e);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (e.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(e);
    }
  }
  function q0(l, t, e, a) {
    for (; l.nodeType === 1; ) {
      var u = e;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (a) {
        if (!l[iu])
          switch (t) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (n = l.getAttribute("rel"), n === "stylesheet" && l.hasAttribute("data-precedence"))
                break;
              if (n !== u.rel || l.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || l.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || l.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (n = l.getAttribute("src"), (n !== (u.src == null ? null : u.src) || l.getAttribute("type") !== (u.type == null ? null : u.type) || l.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && n && l.hasAttribute("async") && !l.hasAttribute("itemprop"))
                break;
              return l;
            default:
              return l;
          }
      } else if (t === "input" && l.type === "hidden") {
        var n = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && l.getAttribute("name") === n)
          return l;
      } else return l;
      if (l = Bt(l.nextSibling), l === null) break;
    }
    return null;
  }
  function B0(l, t, e) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !e || (l = Bt(l.nextSibling), l === null)) return null;
    return l;
  }
  function Gr(l, t) {
    for (; l.nodeType !== 8; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = Bt(l.nextSibling), l === null)) return null;
    return l;
  }
  function Of(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function Df(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function Y0(l, t) {
    var e = l.ownerDocument;
    if (l.data === "$~") l._reactRetry = t;
    else if (l.data !== "$?" || e.readyState !== "loading")
      t();
    else {
      var a = function() {
        t(), e.removeEventListener("DOMContentLoaded", a);
      };
      e.addEventListener("DOMContentLoaded", a), l._reactRetry = a;
    }
  }
  function Bt(l) {
    for (; l != null; l = l.nextSibling) {
      var t = l.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = l.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return l;
  }
  var Mf = null;
  function Xr(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "/$" || e === "/&") {
          if (t === 0)
            return Bt(l.nextSibling);
          t--;
        } else
          e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function Qr(l) {
    l = l.previousSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&") {
          if (t === 0) return l;
          t--;
        } else e !== "/$" && e !== "/&" || t++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function Vr(l, t, e) {
    switch (t = ui(e), l) {
      case "html":
        if (l = t.documentElement, !l) throw Error(d(452));
        return l;
      case "head":
        if (l = t.head, !l) throw Error(d(453));
        return l;
      case "body":
        if (l = t.body, !l) throw Error(d(454));
        return l;
      default:
        throw Error(d(451));
    }
  }
  function Vu(l) {
    for (var t = l.attributes; t.length; )
      l.removeAttributeNode(t[0]);
    Ni(l);
  }
  var Yt = /* @__PURE__ */ new Map(), Zr = /* @__PURE__ */ new Set();
  function ni(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var de = R.d;
  R.d = {
    f: G0,
    r: X0,
    D: Q0,
    C: V0,
    L: Z0,
    m: L0,
    X: J0,
    S: K0,
    M: w0
  };
  function G0() {
    var l = de.f(), t = Fn();
    return l || t;
  }
  function X0(l) {
    var t = ha(l);
    t !== null && t.tag === 5 && t.type === "form" ? id(t) : de.r(l);
  }
  var Wa = typeof document > "u" ? null : document;
  function Lr(l, t, e) {
    var a = Wa;
    if (a && typeof t == "string" && t) {
      var u = Rt(t);
      u = 'link[rel="' + l + '"][href="' + u + '"]', typeof e == "string" && (u += '[crossorigin="' + e + '"]'), Zr.has(u) || (Zr.add(u), l = { rel: l, crossOrigin: e, href: t }, a.querySelector(u) === null && (t = a.createElement("link"), et(t, "link", l), Fl(t), a.head.appendChild(t)));
    }
  }
  function Q0(l) {
    de.D(l), Lr("dns-prefetch", l, null);
  }
  function V0(l, t) {
    de.C(l, t), Lr("preconnect", l, t);
  }
  function Z0(l, t, e) {
    de.L(l, t, e);
    var a = Wa;
    if (a && l && t) {
      var u = 'link[rel="preload"][as="' + Rt(t) + '"]';
      t === "image" && e && e.imageSrcSet ? (u += '[imagesrcset="' + Rt(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (u += '[imagesizes="' + Rt(
        e.imageSizes
      ) + '"]')) : u += '[href="' + Rt(l) + '"]';
      var n = u;
      switch (t) {
        case "style":
          n = $a(l);
          break;
        case "script":
          n = Fa(l);
      }
      Yt.has(n) || (l = D(
        {
          rel: "preload",
          href: t === "image" && e && e.imageSrcSet ? void 0 : l,
          as: t
        },
        e
      ), Yt.set(n, l), a.querySelector(u) !== null || t === "style" && a.querySelector(Zu(n)) || t === "script" && a.querySelector(Lu(n)) || (t = a.createElement("link"), et(t, "link", l), Fl(t), a.head.appendChild(t)));
    }
  }
  function L0(l, t) {
    de.m(l, t);
    var e = Wa;
    if (e && l) {
      var a = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + Rt(a) + '"][href="' + Rt(l) + '"]', n = u;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = Fa(l);
      }
      if (!Yt.has(n) && (l = D({ rel: "modulepreload", href: l }, t), Yt.set(n, l), e.querySelector(u) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(Lu(n)))
              return;
        }
        a = e.createElement("link"), et(a, "link", l), Fl(a), e.head.appendChild(a);
      }
    }
  }
  function K0(l, t, e) {
    de.S(l, t, e);
    var a = Wa;
    if (a && l) {
      var u = ga(a).hoistableStyles, n = $a(l);
      t = t || "default";
      var i = u.get(n);
      if (!i) {
        var c = { loading: 0, preload: null };
        if (i = a.querySelector(
          Zu(n)
        ))
          c.loading = 5;
        else {
          l = D(
            { rel: "stylesheet", href: l, "data-precedence": t },
            e
          ), (e = Yt.get(n)) && Nf(l, e);
          var s = i = a.createElement("link");
          Fl(s), et(s, "link", l), s._p = new Promise(function(y, b) {
            s.onload = y, s.onerror = b;
          }), s.addEventListener("load", function() {
            c.loading |= 1;
          }), s.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, ii(i, t, a);
        }
        i = {
          type: "stylesheet",
          instance: i,
          count: 1,
          state: c
        }, u.set(n, i);
      }
    }
  }
  function J0(l, t) {
    de.X(l, t);
    var e = Wa;
    if (e && l) {
      var a = ga(e).hoistableScripts, u = Fa(l), n = a.get(u);
      n || (n = e.querySelector(Lu(u)), n || (l = D({ src: l, async: !0 }, t), (t = Yt.get(u)) && Rf(l, t), n = e.createElement("script"), Fl(n), et(n, "link", l), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function w0(l, t) {
    de.M(l, t);
    var e = Wa;
    if (e && l) {
      var a = ga(e).hoistableScripts, u = Fa(l), n = a.get(u);
      n || (n = e.querySelector(Lu(u)), n || (l = D({ src: l, async: !0, type: "module" }, t), (t = Yt.get(u)) && Rf(l, t), n = e.createElement("script"), Fl(n), et(n, "link", l), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function Kr(l, t, e, a) {
    var u = (u = w.current) ? ni(u) : null;
    if (!u) throw Error(d(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (t = $a(e.href), e = ga(
          u
        ).hoistableStyles, a = e.get(t), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          l = $a(e.href);
          var n = ga(
            u
          ).hoistableStyles, i = n.get(l);
          if (i || (u = u.ownerDocument || u, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, n.set(l, i), (n = u.querySelector(
            Zu(l)
          )) && !n._p && (i.instance = n, i.state.loading = 5), Yt.has(l) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Yt.set(l, e), n || W0(
            u,
            l,
            e,
            i.state
          ))), t && a === null)
            throw Error(d(528, ""));
          return i;
        }
        if (t && a !== null)
          throw Error(d(529, ""));
        return null;
      case "script":
        return t = e.async, e = e.src, typeof e == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Fa(e), e = ga(
          u
        ).hoistableScripts, a = e.get(t), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(d(444, l));
    }
  }
  function $a(l) {
    return 'href="' + Rt(l) + '"';
  }
  function Zu(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function Jr(l) {
    return D({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function W0(l, t, e, a) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = l.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), et(t, "link", e), Fl(t), l.head.appendChild(t));
  }
  function Fa(l) {
    return '[src="' + Rt(l) + '"]';
  }
  function Lu(l) {
    return "script[async]" + l;
  }
  function wr(l, t, e) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = l.querySelector(
            'style[data-href~="' + Rt(e.href) + '"]'
          );
          if (a)
            return t.instance = a, Fl(a), a;
          var u = D({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (l.ownerDocument || l).createElement(
            "style"
          ), Fl(a), et(a, "style", u), ii(a, e.precedence, l), t.instance = a;
        case "stylesheet":
          u = $a(e.href);
          var n = l.querySelector(
            Zu(u)
          );
          if (n)
            return t.state.loading |= 4, t.instance = n, Fl(n), n;
          a = Jr(e), (u = Yt.get(u)) && Nf(a, u), n = (l.ownerDocument || l).createElement("link"), Fl(n);
          var i = n;
          return i._p = new Promise(function(c, s) {
            i.onload = c, i.onerror = s;
          }), et(n, "link", a), t.state.loading |= 4, ii(n, e.precedence, l), t.instance = n;
        case "script":
          return n = Fa(e.src), (u = l.querySelector(
            Lu(n)
          )) ? (t.instance = u, Fl(u), u) : (a = e, (u = Yt.get(n)) && (a = D({}, e), Rf(a, u)), l = l.ownerDocument || l, u = l.createElement("script"), Fl(u), et(u, "link", a), l.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(d(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, ii(a, e.precedence, l));
    return t.instance;
  }
  function ii(l, t, e) {
    for (var a = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = a.length ? a[a.length - 1] : null, n = u, i = 0; i < a.length; i++) {
      var c = a[i];
      if (c.dataset.precedence === t) n = c;
      else if (n !== u) break;
    }
    n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = e.nodeType === 9 ? e.head : e, t.insertBefore(l, t.firstChild));
  }
  function Nf(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
  }
  function Rf(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
  }
  var ci = null;
  function Wr(l, t, e) {
    if (ci === null) {
      var a = /* @__PURE__ */ new Map(), u = ci = /* @__PURE__ */ new Map();
      u.set(e, a);
    } else
      u = ci, a = u.get(e), a || (a = /* @__PURE__ */ new Map(), u.set(e, a));
    if (a.has(l)) return a;
    for (a.set(l, null), e = e.getElementsByTagName(l), u = 0; u < e.length; u++) {
      var n = e[u];
      if (!(n[iu] || n[Il] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = n.getAttribute(t) || "";
        i = l + i;
        var c = a.get(i);
        c ? c.push(n) : a.set(i, [n]);
      }
    }
    return a;
  }
  function $r(l, t, e) {
    l = l.ownerDocument || l, l.head.insertBefore(
      e,
      t === "title" ? l.querySelector("head > title") : null
    );
  }
  function $0(l, t, e) {
    if (e === 1 || t.itemProp != null) return !1;
    switch (l) {
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
            return l = t.disabled, typeof t.precedence == "string" && l == null;
          default:
            return !0;
        }
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function Fr(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function F0(l, t, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var u = $a(a.href), n = t.querySelector(
          Zu(u)
        );
        if (n) {
          t = n._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = fi.bind(l), t.then(l, l)), e.state.loading |= 4, e.instance = n, Fl(n);
          return;
        }
        n = t.ownerDocument || t, a = Jr(a), (u = Yt.get(u)) && Nf(a, u), n = n.createElement("link"), Fl(n);
        var i = n;
        i._p = new Promise(function(c, s) {
          i.onload = c, i.onerror = s;
        }), et(n, "link", a), e.instance = n;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(e, t), (t = e.state.preload) && (e.state.loading & 3) === 0 && (l.count++, e = fi.bind(l), t.addEventListener("load", e), t.addEventListener("error", e));
    }
  }
  var Uf = 0;
  function k0(l, t) {
    return l.stylesheets && l.count === 0 && oi(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (l.stylesheets && oi(l, l.stylesheets), l.unsuspend) {
          var n = l.unsuspend;
          l.unsuspend = null, n();
        }
      }, 6e4 + t);
      0 < l.imgBytes && Uf === 0 && (Uf = 62500 * U0());
      var u = setTimeout(
        function() {
          if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && oi(l, l.stylesheets), l.unsuspend)) {
            var n = l.unsuspend;
            l.unsuspend = null, n();
          }
        },
        (l.imgBytes > Uf ? 50 : 800) + t
      );
      return l.unsuspend = e, function() {
        l.unsuspend = null, clearTimeout(a), clearTimeout(u);
      };
    } : null;
  }
  function fi() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) oi(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var si = null;
  function oi(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, si = /* @__PURE__ */ new Map(), t.forEach(I0, l), si = null, fi.call(l));
  }
  function I0(l, t) {
    if (!(t.state.loading & 4)) {
      var e = si.get(l);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), si.set(l, e);
        for (var u = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), n = 0; n < u.length; n++) {
          var i = u[n];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      u = t.instance, i = u.getAttribute("data-precedence"), n = e.get(i) || a, n === a && e.set(null, u), e.set(i, u), this.count++, a = fi.bind(this), u.addEventListener("load", a), u.addEventListener("error", a), n ? n.parentNode.insertBefore(u, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(u, l.firstChild)), t.state.loading |= 4;
    }
  }
  var Ku = {
    $$typeof: Ul,
    Provider: null,
    Consumer: null,
    _currentValue: Q,
    _currentValue2: Q,
    _threadCount: 0
  };
  function P0(l, t, e, a, u, n, i, c, s) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = pi(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = pi(0), this.hiddenUpdates = pi(null), this.identifierPrefix = a, this.onUncaughtError = u, this.onCaughtError = n, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = s, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function kr(l, t, e, a, u, n, i, c, s, y, b, A) {
    return l = new P0(
      l,
      t,
      e,
      i,
      s,
      y,
      b,
      A,
      c
    ), t = 1, n === !0 && (t |= 24), n = Tt(3, null, null, t), l.current = n, n.stateNode = l, t = sc(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: t
    }, vc(n), l;
  }
  function Ir(l) {
    return l ? (l = Da, l) : Da;
  }
  function Pr(l, t, e, a, u, n) {
    u = Ir(u), a.context === null ? a.context = u : a.pendingContext = u, a = Ae(t), a.payload = { element: e }, n = n === void 0 ? null : n, n !== null && (a.callback = n), e = pe(l, a, t), e !== null && (ht(e, l, t), zu(e, l, t));
  }
  function lv(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var e = l.retryLane;
      l.retryLane = e !== 0 && e < t ? e : t;
    }
  }
  function jf(l, t) {
    lv(l, t), (l = l.alternate) && lv(l, t);
  }
  function tv(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Ie(l, 67108864);
      t !== null && ht(t, l, 67108864), jf(l, 67108864);
    }
  }
  function ev(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Dt();
      t = Oi(t);
      var e = Ie(l, t);
      e !== null && ht(e, l, t), jf(l, t);
    }
  }
  var di = !0;
  function ly(l, t, e, a) {
    var u = S.T;
    S.T = null;
    var n = R.p;
    try {
      R.p = 2, Cf(l, t, e, a);
    } finally {
      R.p = n, S.T = u;
    }
  }
  function ty(l, t, e, a) {
    var u = S.T;
    S.T = null;
    var n = R.p;
    try {
      R.p = 8, Cf(l, t, e, a);
    } finally {
      R.p = n, S.T = u;
    }
  }
  function Cf(l, t, e, a) {
    if (di) {
      var u = xf(a);
      if (u === null)
        bf(
          l,
          t,
          a,
          ri,
          e
        ), uv(l, a);
      else if (ay(
        u,
        l,
        t,
        e,
        a
      ))
        a.stopPropagation();
      else if (uv(l, a), t & 4 && -1 < ey.indexOf(l)) {
        for (; u !== null; ) {
          var n = ha(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                  var i = we(n.pendingLanes);
                  if (i !== 0) {
                    var c = n;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                      var s = 1 << 31 - Et(i);
                      c.entanglements[1] |= s, i &= ~s;
                    }
                    Kt(n), (rl & 6) === 0 && (Wn = Ol() + 500, Gu(0));
                  }
                }
                break;
              case 31:
              case 13:
                c = Ie(n, 2), c !== null && ht(c, n, 2), Fn(), jf(n, 2);
            }
          if (n = xf(a), n === null && bf(
            l,
            t,
            a,
            ri,
            e
          ), n === u) break;
          u = n;
        }
        u !== null && a.stopPropagation();
      } else
        bf(
          l,
          t,
          a,
          null,
          e
        );
    }
  }
  function xf(l) {
    return l = Hi(l), Hf(l);
  }
  var ri = null;
  function Hf(l) {
    if (ri = null, l = ya(l), l !== null) {
      var t = B(l);
      if (t === null) l = null;
      else {
        var e = t.tag;
        if (e === 13) {
          if (l = C(t), l !== null) return l;
          l = null;
        } else if (e === 31) {
          if (l = X(t), l !== null) return l;
          l = null;
        } else if (e === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return ri = l, null;
  }
  function av(l) {
    switch (l) {
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
        switch (Ke()) {
          case ye:
            return 2;
          case eu:
            return 8;
          case Je:
          case st:
            return 32;
          case Mt:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var qf = !1, qe = null, Be = null, Ye = null, Ju = /* @__PURE__ */ new Map(), wu = /* @__PURE__ */ new Map(), Ge = [], ey = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function uv(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        qe = null;
        break;
      case "dragenter":
      case "dragleave":
        Be = null;
        break;
      case "mouseover":
      case "mouseout":
        Ye = null;
        break;
      case "pointerover":
      case "pointerout":
        Ju.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        wu.delete(t.pointerId);
    }
  }
  function Wu(l, t, e, a, u, n) {
    return l === null || l.nativeEvent !== n ? (l = {
      blockedOn: t,
      domEventName: e,
      eventSystemFlags: a,
      nativeEvent: n,
      targetContainers: [u]
    }, t !== null && (t = ha(t), t !== null && tv(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), l);
  }
  function ay(l, t, e, a, u) {
    switch (t) {
      case "focusin":
        return qe = Wu(
          qe,
          l,
          t,
          e,
          a,
          u
        ), !0;
      case "dragenter":
        return Be = Wu(
          Be,
          l,
          t,
          e,
          a,
          u
        ), !0;
      case "mouseover":
        return Ye = Wu(
          Ye,
          l,
          t,
          e,
          a,
          u
        ), !0;
      case "pointerover":
        var n = u.pointerId;
        return Ju.set(
          n,
          Wu(
            Ju.get(n) || null,
            l,
            t,
            e,
            a,
            u
          )
        ), !0;
      case "gotpointercapture":
        return n = u.pointerId, wu.set(
          n,
          Wu(
            wu.get(n) || null,
            l,
            t,
            e,
            a,
            u
          )
        ), !0;
    }
    return !1;
  }
  function nv(l) {
    var t = ya(l.target);
    if (t !== null) {
      var e = B(t);
      if (e !== null) {
        if (t = e.tag, t === 13) {
          if (t = C(e), t !== null) {
            l.blockedOn = t, Ss(l.priority, function() {
              ev(e);
            });
            return;
          }
        } else if (t === 31) {
          if (t = X(e), t !== null) {
            l.blockedOn = t, Ss(l.priority, function() {
              ev(e);
            });
            return;
          }
        } else if (t === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function vi(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var e = xf(l.nativeEvent);
      if (e === null) {
        e = l.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        xi = a, e.target.dispatchEvent(a), xi = null;
      } else
        return t = ha(e), t !== null && tv(t), l.blockedOn = e, !1;
      t.shift();
    }
    return !0;
  }
  function iv(l, t, e) {
    vi(l) && e.delete(t);
  }
  function uy() {
    qf = !1, qe !== null && vi(qe) && (qe = null), Be !== null && vi(Be) && (Be = null), Ye !== null && vi(Ye) && (Ye = null), Ju.forEach(iv), wu.forEach(iv);
  }
  function mi(l, t) {
    l.blockedOn === t && (l.blockedOn = null, qf || (qf = !0, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      uy
    )));
  }
  var yi = null;
  function cv(l) {
    yi !== l && (yi = l, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      function() {
        yi === l && (yi = null);
        for (var t = 0; t < l.length; t += 3) {
          var e = l[t], a = l[t + 1], u = l[t + 2];
          if (typeof a != "function") {
            if (Hf(a || e) === null)
              continue;
            break;
          }
          var n = ha(e);
          n !== null && (l.splice(t, 3), t -= 3, Cc(
            n,
            {
              pending: !0,
              data: u,
              method: e.method,
              action: a
            },
            a,
            u
          ));
        }
      }
    ));
  }
  function ka(l) {
    function t(s) {
      return mi(s, l);
    }
    qe !== null && mi(qe, l), Be !== null && mi(Be, l), Ye !== null && mi(Ye, l), Ju.forEach(t), wu.forEach(t);
    for (var e = 0; e < Ge.length; e++) {
      var a = Ge[e];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < Ge.length && (e = Ge[0], e.blockedOn === null); )
      nv(e), e.blockedOn === null && Ge.shift();
    if (e = (l.ownerDocument || l).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var u = e[a], n = e[a + 1], i = u[ot] || null;
        if (typeof n == "function")
          i || cv(e);
        else if (i) {
          var c = null;
          if (n && n.hasAttribute("formAction")) {
            if (u = n, i = n[ot] || null)
              c = i.formAction;
            else if (Hf(u) !== null) continue;
          } else c = i.action;
          typeof c == "function" ? e[a + 1] = c : (e.splice(a, 3), a -= 3), cv(e);
        }
      }
  }
  function fv() {
    function l(n) {
      n.canIntercept && n.info === "react-transition" && n.intercept({
        handler: function() {
          return new Promise(function(i) {
            return u = i;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      u !== null && (u(), u = null), a || setTimeout(e, 20);
    }
    function e() {
      if (!a && !navigation.transition) {
        var n = navigation.currentEntry;
        n && n.url != null && navigation.navigate(n.url, {
          state: n.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, u = null;
      return navigation.addEventListener("navigate", l), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(e, 100), function() {
        a = !0, navigation.removeEventListener("navigate", l), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), u !== null && (u(), u = null);
      };
    }
  }
  function Bf(l) {
    this._internalRoot = l;
  }
  hi.prototype.render = Bf.prototype.render = function(l) {
    var t = this._internalRoot;
    if (t === null) throw Error(d(409));
    var e = t.current, a = Dt();
    Pr(e, a, l, t, null, null);
  }, hi.prototype.unmount = Bf.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      Pr(l.current, 2, null, l, null, null), Fn(), t[ma] = null;
    }
  };
  function hi(l) {
    this._internalRoot = l;
  }
  hi.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = gs();
      l = { blockedOn: null, target: l, priority: t };
      for (var e = 0; e < Ge.length && t !== 0 && t < Ge[e].priority; e++) ;
      Ge.splice(e, 0, l), e === 0 && nv(l);
    }
  };
  var sv = E.version;
  if (sv !== "19.2.6")
    throw Error(
      d(
        527,
        sv,
        "19.2.6"
      )
    );
  R.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function" ? Error(d(188)) : (l = Object.keys(l).join(","), Error(d(268, l)));
    return l = _(t), l = l !== null ? Y(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var ny = {
    bundleType: 0,
    version: "19.2.6",
    rendererPackageName: "react-dom",
    currentDispatcherRef: S,
    reconcilerVersion: "19.2.6"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var gi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!gi.isDisabled && gi.supportsFiber)
      try {
        wt = gi.inject(
          ny
        ), bt = gi;
      } catch {
      }
  }
  return Fu.createRoot = function(l, t) {
    if (!q(l)) throw Error(d(299));
    var e = !1, a = "", u = hd, n = gd, i = Sd;
    return t != null && (t.unstable_strictMode === !0 && (e = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = kr(
      l,
      1,
      !1,
      null,
      null,
      e,
      a,
      null,
      u,
      n,
      i,
      fv
    ), l[ma] = t.current, Sf(l), new Bf(t);
  }, Fu.hydrateRoot = function(l, t, e) {
    if (!q(l)) throw Error(d(299));
    var a = !1, u = "", n = hd, i = gd, c = Sd, s = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (u = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (c = e.onRecoverableError), e.formState !== void 0 && (s = e.formState)), t = kr(
      l,
      1,
      !0,
      t,
      e ?? null,
      a,
      u,
      s,
      n,
      i,
      c,
      fv
    ), t.context = Ir(null), e = t.current, a = Dt(), a = Oi(a), u = Ae(a), u.callback = null, pe(e, u, a), e = a, t.current.lanes = e, nu(t, e), Kt(t), l[ma] = t.current, Sf(l), new hi(t);
  }, Fu.version = "19.2.6", Fu;
}
var bv;
function hy() {
  if (bv) return Xf.exports;
  bv = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (E) {
        console.error(E);
      }
  }
  return f(), Xf.exports = yy(), Xf.exports;
}
var gy = hy(), Lf = { exports: {} }, Kf = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ev;
function Sy() {
  if (Ev) return Kf;
  Ev = 1;
  var f = zi();
  function E(D, x) {
    return D === x && (D !== 0 || 1 / D === 1 / x) || D !== D && x !== x;
  }
  var p = typeof Object.is == "function" ? Object.is : E, d = f.useState, q = f.useEffect, B = f.useLayoutEffect, C = f.useDebugValue;
  function X(D, x) {
    var $ = x(), il = d({ inst: { value: $, getSnapshot: x } }), k = il[0].inst, ml = il[1];
    return B(
      function() {
        k.value = $, k.getSnapshot = x, M(k) && ml({ inst: k });
      },
      [D, $, x]
    ), q(
      function() {
        return M(k) && ml({ inst: k }), D(function() {
          M(k) && ml({ inst: k });
        });
      },
      [D]
    ), C($), $;
  }
  function M(D) {
    var x = D.getSnapshot;
    D = D.value;
    try {
      var $ = x();
      return !p(D, $);
    } catch {
      return !0;
    }
  }
  function _(D, x) {
    return x();
  }
  var Y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? _ : X;
  return Kf.useSyncExternalStore = f.useSyncExternalStore !== void 0 ? f.useSyncExternalStore : Y, Kf;
}
var _v;
function by() {
  return _v || (_v = 1, Lf.exports = Sy()), Lf.exports;
}
var Tv = by();
const xv = 0, Hv = 1, qv = 2, zv = 3;
var Av = Object.prototype.hasOwnProperty;
function Pf(f, E) {
  var p, d;
  if (f === E) return !0;
  if (f && E && (p = f.constructor) === E.constructor) {
    if (p === Date) return f.getTime() === E.getTime();
    if (p === RegExp) return f.toString() === E.toString();
    if (p === Array) {
      if ((d = f.length) === E.length)
        for (; d-- && Pf(f[d], E[d]); ) ;
      return d === -1;
    }
    if (!p || typeof f == "object") {
      d = 0;
      for (p in f)
        if (Av.call(f, p) && ++d && !Av.call(E, p) || !(p in E) || !Pf(f[p], E[p])) return !1;
      return Object.keys(E).length === d;
    }
  }
  return f !== f && E !== E;
}
const re = /* @__PURE__ */ new WeakMap(), ve = () => {
}, ut = (
  /*#__NOINLINE__*/
  ve()
), ls = Object, ul = (f) => f === ut, Jt = (f) => typeof f == "function", Ze = (f, E) => ({
  ...f,
  ...E
}), Bv = (f) => Jt(f.then), Jf = {}, Si = {}, os = "undefined", Iu = typeof window != os, ts = typeof document != os, Ey = Iu && "Deno" in window, _y = () => Iu && typeof window.requestAnimationFrame != os, Yv = (f, E) => {
  const p = re.get(f);
  return [
    // Getter
    () => !ul(E) && f.get(E) || Jf,
    // Setter
    (d) => {
      if (!ul(E)) {
        const q = f.get(E);
        E in Si || (Si[E] = q), p[5](E, Ze(q, d), q || Jf);
      }
    },
    // Subscriber
    p[6],
    // Get server cache snapshot
    () => !ul(E) && E in Si ? Si[E] : !ul(E) && f.get(E) || Jf
  ];
};
let es = !0;
const Ty = () => es, [as, us] = Iu && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  ve,
  ve
], zy = () => {
  const f = ts && document.visibilityState;
  return ul(f) || f !== "hidden";
}, Ay = (f) => (ts && document.addEventListener("visibilitychange", f), as("focus", f), () => {
  ts && document.removeEventListener("visibilitychange", f), us("focus", f);
}), py = (f) => {
  const E = () => {
    es = !0, f();
  }, p = () => {
    es = !1;
  };
  return as("online", E), as("offline", p), () => {
    us("online", E), us("offline", p);
  };
}, Oy = {
  isOnline: Ty,
  isVisible: zy
}, Dy = {
  initFocus: Ay,
  initReconnect: py
}, pv = !ss.useId, lu = !Iu || Ey, My = (f) => _y() ? window.requestAnimationFrame(f) : setTimeout(f, 1), wf = lu ? vl.useEffect : vl.useLayoutEffect, Wf = typeof navigator < "u" && navigator.connection, Ov = !lu && Wf && ([
  "slow-2g",
  "2g"
].includes(Wf.effectiveType) || Wf.saveData), bi = /* @__PURE__ */ new WeakMap(), Ny = (f) => ls.prototype.toString.call(f), $f = (f, E) => f === `[object ${E}]`;
let Ry = 0;
const ns = (f) => {
  const E = typeof f, p = Ny(f), d = $f(p, "Date"), q = $f(p, "RegExp"), B = $f(p, "Object");
  let C, X;
  if (ls(f) === f && !d && !q) {
    if (C = bi.get(f), C) return C;
    if (C = ++Ry + "~", bi.set(f, C), Array.isArray(f)) {
      for (C = "@", X = 0; X < f.length; X++)
        C += ns(f[X]) + ",";
      bi.set(f, C);
    }
    if (B) {
      C = "#";
      const M = ls.keys(f).sort();
      for (; !ul(X = M.pop()); )
        ul(f[X]) || (C += X + ":" + ns(f[X]) + ",");
      bi.set(f, C);
    }
  } else
    C = d ? f.toJSON() : E == "symbol" ? f.toString() : E == "string" ? JSON.stringify(f) : "" + f;
  return C;
}, ds = (f) => {
  if (Jt(f))
    try {
      f = f();
    } catch {
      f = "";
    }
  const E = f;
  return f = typeof f == "string" ? f : (Array.isArray(f) ? f.length : f) ? ns(f) : "", [
    f,
    E
  ];
};
let Uy = 0;
const is = () => ++Uy;
async function Gv(...f) {
  const [E, p, d, q] = f, B = Ze({
    populateCache: !0,
    throwOnError: !0
  }, typeof q == "boolean" ? {
    revalidate: q
  } : q || {});
  let C = B.populateCache;
  const X = B.rollbackOnError;
  let M = B.optimisticData;
  const _ = (x) => typeof X == "function" ? X(x) : X !== !1, Y = B.throwOnError;
  if (Jt(p)) {
    const x = p, $ = [], il = E.keys();
    for (const k of il)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(k) && x(E.get(k)._k) && $.push(k);
    return Promise.all($.map(D));
  }
  return D(p);
  async function D(x) {
    const [$] = ds(x);
    if (!$) return;
    const [il, k] = Yv(E, $), [ml, Hl, V, Ul] = re.get(E), I = () => {
      const Gl = ml[$];
      return (Jt(B.revalidate) ? B.revalidate(il().data, x) : B.revalidate !== !1) && (delete V[$], delete Ul[$], Gl && Gl[0]) ? Gl[0](qv).then(() => il().data) : il().data;
    };
    if (f.length < 3)
      return I();
    let gl = d, zl, L = !1;
    const ql = is();
    Hl[$] = [
      ql,
      0
    ];
    const fl = !ul(M), gt = il(), Bl = gt.data, Yl = gt._c, nt = ul(Yl) ? Bl : Yl;
    if (fl && (M = Jt(M) ? M(nt, Bl) : M, k({
      data: M,
      _c: nt
    })), Jt(gl))
      try {
        gl = gl(nt);
      } catch (Gl) {
        zl = Gl, L = !0;
      }
    if (gl && Bv(gl))
      if (gl = await gl.catch((Gl) => {
        zl = Gl, L = !0;
      }), ql !== Hl[$][0]) {
        if (L) throw zl;
        return gl;
      } else L && fl && _(zl) && (C = !0, k({
        data: nt,
        _c: ut
      }));
    if (C && !L)
      if (Jt(C)) {
        const Gl = C(gl, nt);
        k({
          data: Gl,
          error: ut,
          _c: ut
        });
      } else
        k({
          data: gl,
          error: ut,
          _c: ut
        });
    if (Hl[$][1] = is(), Promise.resolve(I()).then(() => {
      k({
        _c: ut
      });
    }), L) {
      if (Y) throw zl;
      return;
    }
    return gl;
  }
}
const Dv = (f, E) => {
  for (const p in f)
    f[p][0] && f[p][0](E);
}, jy = (f, E) => {
  if (!re.has(f)) {
    const p = Ze(Dy, E), d = /* @__PURE__ */ Object.create(null), q = Gv.bind(ut, f);
    let B = ve;
    const C = /* @__PURE__ */ Object.create(null), X = (Y, D) => {
      const x = C[Y] || [];
      return C[Y] = x, x.push(D), () => x.splice(x.indexOf(D), 1);
    }, M = (Y, D, x) => {
      f.set(Y, D);
      const $ = C[Y];
      if ($)
        for (const il of $)
          il(D, x);
    }, _ = () => {
      if (!re.has(f) && (re.set(f, [
        d,
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        q,
        M,
        X
      ]), !lu)) {
        const Y = p.initFocus(setTimeout.bind(ut, Dv.bind(ut, d, xv))), D = p.initReconnect(setTimeout.bind(ut, Dv.bind(ut, d, Hv)));
        B = () => {
          Y && Y(), D && D(), re.delete(f);
        };
      }
    };
    return _(), [
      f,
      q,
      _,
      B
    ];
  }
  return [
    f,
    re.get(f)[4]
  ];
}, Cy = (f, E, p, d, q) => {
  const B = p.errorRetryCount, C = q.retryCount, X = ~~((Math.random() + 0.5) * (1 << (C < 8 ? C : 8))) * p.errorRetryInterval;
  !ul(B) && C > B || setTimeout(d, X, q);
}, xy = Pf, [Xv, Hy] = jy(/* @__PURE__ */ new Map()), qy = Ze(
  {
    // events
    onLoadingSlow: ve,
    onSuccess: ve,
    onError: ve,
    onErrorRetry: Cy,
    onDiscarded: ve,
    // switches
    revalidateOnFocus: !0,
    revalidateOnReconnect: !0,
    revalidateIfStale: !0,
    shouldRetryOnError: !0,
    // timeouts
    errorRetryInterval: Ov ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: Ov ? 5e3 : 3e3,
    // providers
    compare: xy,
    isPaused: () => !1,
    cache: Xv,
    mutate: Hy,
    fallback: {}
  },
  // use web preset by default
  Oy
), By = (f, E) => {
  const p = Ze(f, E);
  if (E) {
    const { use: d, fallback: q } = f, { use: B, fallback: C } = E;
    d && B && (p.use = d.concat(B)), q && C && (p.fallback = Ze(q, C));
  }
  return p;
}, Yy = vl.createContext({}), Gy = "$inf$", Qv = Iu && window.__SWR_DEVTOOLS_USE__, Xy = Qv ? window.__SWR_DEVTOOLS_USE__ : [], Qy = () => {
  Qv && (window.__SWR_DEVTOOLS_REACT__ = ss);
}, Vy = (f) => Jt(f[1]) ? [
  f[0],
  f[1],
  f[2] || {}
] : [
  f[0],
  null,
  (f[1] === null ? f[2] : f[1]) || {}
], Zy = () => {
  const f = vl.useContext(Yy);
  return vl.useMemo(() => Ze(qy, f), [
    f
  ]);
}, Ly = (f) => (E, p, d) => f(E, p && ((...B) => {
  const [C] = ds(E), [, , , X] = re.get(Xv);
  if (C.startsWith(Gy))
    return p(...B);
  const M = X[C];
  return ul(M) ? p(...B) : (delete X[C], M);
}), d), Ky = Xy.concat(Ly), Jy = (f) => function(...p) {
  const d = Zy(), [q, B, C] = Vy(p), X = By(d, C);
  let M = f;
  const { use: _ } = X, Y = (_ || []).concat(Ky);
  for (let D = Y.length; D--; )
    M = Y[D](M);
  return M(q, B || X.fetcher || null, X);
}, wy = (f, E, p) => {
  const d = E[f] || (E[f] = []);
  return d.push(p), () => {
    const q = d.indexOf(p);
    q >= 0 && (d[q] = d[d.length - 1], d.pop());
  };
};
Qy();
const Ff = ss.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
// and emitting an error.
// We assume that this is only for the `use(thenable)` case, not `use(context)`.
// https://github.com/facebook/react/blob/aed00dacfb79d17c53218404c52b1c7aa59c4a89/packages/react-server/src/ReactFizzThenable.js#L45
((f) => {
  switch (f.status) {
    case "pending":
      throw f;
    case "fulfilled":
      return f.value;
    case "rejected":
      throw f.reason;
    default:
      throw f.status = "pending", f.then((E) => {
        f.status = "fulfilled", f.value = E;
      }, (E) => {
        f.status = "rejected", f.reason = E;
      }), f;
  }
}), kf = {
  dedupe: !0
}, Mv = Promise.resolve(ut), Wy = () => ve, $y = (f, E, p) => {
  const { cache: d, compare: q, suspense: B, fallbackData: C, revalidateOnMount: X, revalidateIfStale: M, refreshInterval: _, refreshWhenHidden: Y, refreshWhenOffline: D, keepPreviousData: x, strictServerPrefetchWarning: $ } = p, [il, k, ml, Hl] = re.get(d), [V, Ul] = ds(f), I = vl.useRef(!1), gl = vl.useRef(!1), zl = vl.useRef(V), L = vl.useRef(E), ql = vl.useRef(p), fl = () => ql.current, gt = () => fl().isVisible() && fl().isOnline(), [Bl, Yl, nt, Gl] = Yv(d, V), $l = vl.useRef({}).current, S = ul(C) ? ul(p.fallback) ? ut : p.fallback[V] : C, R = (Sl, Nl) => {
    for (const Al in $l) {
      const pl = Al;
      if (pl === "data") {
        if (!q(Sl[pl], Nl[pl]) && (!ul(Sl[pl]) || !q(w, Nl[pl])))
          return !1;
      } else if (Nl[pl] !== Sl[pl])
        return !1;
    }
    return !0;
  }, Q = !I.current, dl = vl.useMemo(() => {
    const Sl = Bl(), Nl = Gl(), Al = (Ql) => {
      const Ol = Ze(Ql);
      return delete Ol._k, (() => {
        if (!V || !E || fl().isPaused()) return !1;
        if (Q && !ul(X)) return X;
        const ye = ul(S) ? Ol.data : S;
        return ul(ye) || M;
      })() ? {
        isValidating: !0,
        isLoading: !0,
        ...Ol
      } : Ol;
    }, pl = Al(Sl), ct = Sl === Nl ? pl : Al(Nl);
    let ft = pl;
    return [
      () => {
        const Ql = Al(Bl());
        return R(Ql, ft) ? (ft.data = Ql.data, ft.isLoading = Ql.isLoading, ft.isValidating = Ql.isValidating, ft.error = Ql.error, ft) : (ft = Ql, Ql);
      },
      () => ct
    ];
  }, [
    d,
    V
  ]), cl = Tv.useSyncExternalStore(vl.useCallback(
    (Sl) => nt(V, (Nl, Al) => {
      R(Al, Nl) || Sl();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      d,
      V
    ]
  ), dl[0], dl[1]), r = il[V] && il[V].length > 0, z = cl.data, N = ul(z) ? S && Bv(S) ? Ff(S) : S : z, U = cl.error, K = vl.useRef(N), w = x ? ul(z) ? ul(K.current) ? N : K.current : z : N, P = V && ul(N), Xl = vl.useRef(null);
  !lu && // getServerSnapshot is only called during hydration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Tv.useSyncExternalStore(Wy, () => (Xl.current = !1, Xl), () => (Xl.current = !0, Xl));
  const jl = Xl.current;
  $ && jl && !B && P && console.warn(`Missing pre-initiated data for serialized key "${V}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
  const me = !V || !E || fl().isPaused() || r && !ul(U) ? !1 : Q && !ul(X) ? X : B ? ul(N) ? !1 : M : ul(N) || M, Le = Q && me, tu = ul(cl.isValidating) ? Le : cl.isValidating, Pu = ul(cl.isLoading) ? Le : cl.isLoading, St = vl.useCallback(
    async (Sl) => {
      const Nl = L.current;
      if (!V || !Nl || gl.current || fl().isPaused())
        return !1;
      let Al, pl, ct = !0;
      const ft = Sl || {}, Ql = !ml[V] || !ft.dedupe, Ol = () => pv ? !gl.current && V === zl.current && I.current : V === zl.current, Ke = {
        isValidating: !1,
        isLoading: !1
      }, ye = () => {
        Yl(Ke);
      }, eu = () => {
        const st = ml[V];
        st && st[1] === pl && delete ml[V];
      }, Je = {
        isValidating: !0
      };
      ul(Bl().data) && (Je.isLoading = !0);
      try {
        if (Ql && (Yl(Je), p.loadingTimeout && ul(Bl().data) && setTimeout(() => {
          ct && Ol() && fl().onLoadingSlow(V, p);
        }, p.loadingTimeout), ml[V] = [
          Nl(Ul),
          is()
        ]), [Al, pl] = ml[V], Al = await Al, Ql && setTimeout(eu, p.dedupingInterval), !ml[V] || ml[V][1] !== pl)
          return Ql && Ol() && fl().onDiscarded(V), !1;
        Ke.error = ut;
        const st = k[V];
        if (!ul(st) && // case 1
        (pl <= st[0] || // case 2
        pl <= st[1] || // case 3
        st[1] === 0))
          return ye(), Ql && Ol() && fl().onDiscarded(V), !1;
        const Mt = Bl().data;
        Ke.data = q(Mt, Al) ? Mt : Al, Ql && Ol() && fl().onSuccess(Al, V, p);
      } catch (st) {
        eu();
        const Mt = fl(), { shouldRetryOnError: au } = Mt;
        Mt.isPaused() || (Ke.error = st, Ql && Ol() && (Mt.onError(st, V, Mt), (au === !0 || Jt(au) && au(st)) && (!fl().revalidateOnFocus || !fl().revalidateOnReconnect || gt()) && Mt.onErrorRetry(st, V, Mt, (Ai) => {
          const wt = il[V];
          wt && wt[0] && wt[0](zv, Ai);
        }, {
          retryCount: (ft.retryCount || 0) + 1,
          dedupe: !0
        })));
      }
      return ct = !1, ye(), !0;
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
      V,
      d
    ]
  ), va = vl.useCallback(
    // Use callback to make sure `keyRef.current` returns latest result every time
    (...Sl) => Gv(d, zl.current, ...Sl),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (wf(() => {
    L.current = E, ql.current = p, ul(z) || (K.current = z);
  }), wf(() => {
    if (!V) return;
    const Sl = St.bind(ut, kf);
    let Nl = 0;
    fl().revalidateOnFocus && (Nl = Date.now() + fl().focusThrottleInterval);
    const pl = wy(V, il, (ct, ft = {}) => {
      if (ct == xv) {
        const Ql = Date.now();
        fl().revalidateOnFocus && Ql > Nl && gt() && (Nl = Ql + fl().focusThrottleInterval, Sl());
      } else if (ct == Hv)
        fl().revalidateOnReconnect && gt() && Sl();
      else {
        if (ct == qv)
          return St();
        if (ct == zv)
          return St(ft);
      }
    });
    return gl.current = !1, zl.current = V, I.current = !0, Yl({
      _k: Ul
    }), me && (ml[V] || (ul(N) || lu ? Sl() : My(Sl))), () => {
      gl.current = !0, pl();
    };
  }, [
    V
  ]), wf(() => {
    let Sl;
    function Nl() {
      const pl = Jt(_) ? _(Bl().data) : _;
      pl && Sl !== -1 && (Sl = setTimeout(Al, pl));
    }
    function Al() {
      !Bl().error && (Y || fl().isVisible()) && (D || fl().isOnline()) ? St(kf).then(Nl) : Nl();
    }
    return Nl(), () => {
      Sl && (clearTimeout(Sl), Sl = -1);
    };
  }, [
    _,
    Y,
    D,
    V
  ]), vl.useDebugValue(w), B) {
    if (!pv && lu && P)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    P && (L.current = E, ql.current = p, gl.current = !1);
    const Sl = Hl[V], Nl = !ul(Sl) && P ? va(Sl) : Mv;
    if (Ff(Nl), !ul(U) && P)
      throw U;
    const Al = P ? St(kf) : Mv;
    !ul(w) && P && (Al.status = "fulfilled", Al.value = !0), Ff(Al);
  }
  return {
    mutate: va,
    get data() {
      return $l.data = !0, w;
    },
    get error() {
      return $l.error = !0, U;
    },
    get isValidating() {
      return $l.isValidating = !0, tu;
    },
    get isLoading() {
      return $l.isLoading = !0, Pu;
    }
  };
}, Nv = Jy($y), Vv = "/api/v1/extensions/nexus.video.ltx23";
async function Ia(f, E) {
  const p = await fetch(`${Vv}${f}`, {
    headers: { "Content-Type": "application/json", ...E?.headers ?? {} },
    ...E
  });
  if (!p.ok) {
    const d = await p.text();
    throw new Error(`${p.status} ${p.statusText}: ${d}`);
  }
  return await p.json();
}
const ku = {
  health: () => Ia("/health"),
  listProfiles: () => Ia("/runtime-profiles"),
  plan: (f) => Ia("/recipe/plan", {
    method: "POST",
    body: JSON.stringify(f)
  }),
  createRender: (f) => Ia(
    "/renders",
    { method: "POST", body: JSON.stringify(f) }
  ),
  getRender: (f) => Ia(`/renders/${f}`),
  cancel: (f) => Ia(`/renders/${f}/cancel`, { method: "POST" })
};
function Fy(f) {
  return `${Vv}/artifacts/${f}`;
}
var ky = "_1vmg9ib0", Ei = "_1vmg9ib1", _i = "_1vmg9ib2", Iy = "_1vmg9ib3", ra = "_1vmg9ib4", Pa = "_1vmg9ib5", If = "_1vmg9ib6", Py = "_1vmg9ib7 _1vmg9ib6", Rv = "_1vmg9ib8 _1vmg9ib6", Uv = "_1vmg9ib9", lh = "_1vmg9iba", th = "_1vmg9ibb _1vmg9iba", eh = "_1vmg9ibc _1vmg9iba", Zv = "_1vmg9ibd", Qe = "_1vmg9ibe", Ve = "_1vmg9ibf", da = "_1vmg9ibg", ah = "_1vmg9ibi _1vmg9ibh", uh = "_1vmg9ibj _1vmg9ibh", nh = "_1vmg9ibk _1vmg9ibh", ih = "_1vmg9ibl _1vmg9ibh", cs = "_1vmg9ibm", fs = "_1vmg9ibn", ch = "_1vmg9ibo", fh = "_1vmg9ibp", jv = "_1vmg9ibr _1vmg9ibq", sh = "_1vmg9ibs _1vmg9ibq", oh = "_1vmg9ibt _1vmg9ibq", dh = "_1vmg9ibu _1vmg9ibq", rh = "_1vmg9ibv", vh = "_1vmg9ibw", mh = "_1vmg9ibx", yh = "_1vmg9iby", hh = "_1vmg9ibz _1vmg9iba", rs = "_1vmg9ib10", gh = "_1vmg9ib11";
const Sh = {
  prompt: "a slow cinematic dolly shot over a futuristic city at dusk",
  duration_seconds: 6,
  runtime_profile: "auto",
  quality_preset: "balanced_16gb"
};
function bh() {
  const [f, E] = vl.useState(Sh), [p, d] = vl.useState(null), [q, B] = vl.useState(null), [C, X] = vl.useState(!1), [M, _] = vl.useState(null), [Y, D] = vl.useState(null), [x, $] = vl.useState(!1), { data: il } = Nv(
    "/runtime-profiles",
    () => ku.listProfiles(),
    { revalidateOnFocus: !1 }
  ), { data: k, mutate: ml } = Nv(
    M ? `/renders/${M}` : null,
    () => M ? ku.getRender(M) : Promise.resolve(null),
    {
      refreshInterval: (I) => I ? I.status === "completed" || I.status === "failed" || I.status === "cancelled" ? 0 : 600 : 1e3
    }
  ), Hl = vl.useCallback(async () => {
    X(!0), B(null);
    try {
      const I = await ku.plan(f);
      d(I);
    } catch (I) {
      B(I instanceof Error ? I.message : String(I)), d(null);
    } finally {
      X(!1);
    }
  }, [f]), V = vl.useCallback(async () => {
    $(!0), D(null);
    try {
      const I = await ku.createRender(f);
      _(I.id), ml();
    } catch (I) {
      D(I instanceof Error ? I.message : String(I));
    } finally {
      $(!1);
    }
  }, [f, ml]), Ul = vl.useCallback(async () => {
    if (M)
      try {
        await ku.cancel(M), ml();
      } catch (I) {
        console.error("cancel failed", I);
      }
  }, [M, ml]);
  return /* @__PURE__ */ O.jsxs("div", { className: ky, children: [
    /* @__PURE__ */ O.jsx(
      Eh,
      {
        draft: f,
        onChange: E,
        profiles: il ?? [],
        onPlan: Hl,
        onSubmit: V,
        planning: C,
        submitting: x,
        plan: p,
        planError: q,
        submitError: Y
      }
    ),
    /* @__PURE__ */ O.jsx(zh, { run: k ?? null, onCancel: Ul })
  ] });
}
function Eh({
  draft: f,
  onChange: E,
  profiles: p,
  onPlan: d,
  onSubmit: q,
  planning: B,
  submitting: C,
  plan: X,
  planError: M,
  submitError: _
}) {
  const Y = vl.useCallback(
    (D, x) => E({ ...f, [D]: x }),
    [f, E]
  );
  return /* @__PURE__ */ O.jsxs("section", { className: Ei, children: [
    /* @__PURE__ */ O.jsx("h2", { className: _i, children: "LTX 2.3 Video Generator" }),
    /* @__PURE__ */ O.jsx("p", { className: Iy, children: "Prompt-driven video synthesis · external-segments mode · 16 GB safe defaults" }),
    /* @__PURE__ */ O.jsxs("div", { className: ra, children: [
      /* @__PURE__ */ O.jsx("label", { className: Pa, htmlFor: "ltx-prompt", children: "Prompt" }),
      /* @__PURE__ */ O.jsx(
        "textarea",
        {
          id: "ltx-prompt",
          className: Py,
          value: f.prompt,
          onChange: (D) => Y("prompt", D.target.value),
          placeholder: "describe the scene…"
        }
      )
    ] }),
    /* @__PURE__ */ O.jsxs("div", { className: ra, children: [
      /* @__PURE__ */ O.jsx("label", { className: Pa, htmlFor: "ltx-neg", children: "Negative prompt (optional)" }),
      /* @__PURE__ */ O.jsx(
        "input",
        {
          id: "ltx-neg",
          className: If,
          value: f.negative_prompt ?? "",
          onChange: (D) => Y(
            "negative_prompt",
            D.target.value.length > 0 ? D.target.value : void 0
          ),
          placeholder: "flicker, watermark, distortion…"
        }
      )
    ] }),
    /* @__PURE__ */ O.jsxs("div", { className: Uv, children: [
      /* @__PURE__ */ O.jsxs("div", { className: ra, children: [
        /* @__PURE__ */ O.jsx("label", { className: Pa, htmlFor: "ltx-duration", children: "Duration (s)" }),
        /* @__PURE__ */ O.jsx(
          "input",
          {
            id: "ltx-duration",
            className: If,
            type: "number",
            min: 1,
            max: 300,
            value: f.duration_seconds,
            onChange: (D) => Y(
              "duration_seconds",
              Math.max(1, Math.min(300, Number(D.target.value) || 1))
            )
          }
        )
      ] }),
      /* @__PURE__ */ O.jsxs("div", { className: ra, children: [
        /* @__PURE__ */ O.jsx("label", { className: Pa, htmlFor: "ltx-seed", children: "Seed (optional)" }),
        /* @__PURE__ */ O.jsx(
          "input",
          {
            id: "ltx-seed",
            className: If,
            type: "number",
            value: f.seed ?? "",
            onChange: (D) => {
              const x = D.target.value;
              Y("seed", x === "" ? void 0 : Number(x));
            },
            placeholder: "leave blank for random"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ O.jsxs("div", { className: Uv, children: [
      /* @__PURE__ */ O.jsxs("div", { className: ra, children: [
        /* @__PURE__ */ O.jsx("label", { className: Pa, htmlFor: "ltx-runtime", children: "Runtime" }),
        /* @__PURE__ */ O.jsxs(
          "select",
          {
            id: "ltx-runtime",
            className: Rv,
            value: f.runtime_profile,
            onChange: (D) => Y(
              "runtime_profile",
              D.target.value
            ),
            children: [
              /* @__PURE__ */ O.jsx("option", { value: "auto", children: "Auto (recommended)" }),
              /* @__PURE__ */ O.jsx("option", { value: "rtx40-fp8", children: "RTX 40 FP8" }),
              /* @__PURE__ */ O.jsx("option", { value: "rtx50-fp8", children: "RTX 50 FP8 (Blackwell)" }),
              /* @__PURE__ */ O.jsx("option", { value: "rtx50-nvfp4", children: "RTX 50 NVFP4 (experimental)" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ O.jsxs("div", { className: ra, children: [
        /* @__PURE__ */ O.jsx("label", { className: Pa, htmlFor: "ltx-quality", children: "Quality" }),
        /* @__PURE__ */ O.jsxs(
          "select",
          {
            id: "ltx-quality",
            className: Rv,
            value: f.quality_preset,
            onChange: (D) => Y("quality_preset", D.target.value),
            children: [
              /* @__PURE__ */ O.jsx("option", { value: "draft", children: "Draft (fastest)" }),
              /* @__PURE__ */ O.jsx("option", { value: "balanced_16gb", children: "Balanced 16 GB" }),
              /* @__PURE__ */ O.jsx("option", { value: "quality_16gb", children: "Quality 16 GB" }),
              /* @__PURE__ */ O.jsx("option", { value: "high", children: "High (24 GB+)" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ O.jsx(_h, { profiles: p, selected: f.runtime_profile }),
    /* @__PURE__ */ O.jsxs("div", { className: Zv, children: [
      /* @__PURE__ */ O.jsx(
        "button",
        {
          type: "button",
          className: th,
          onClick: d,
          disabled: B || C || f.prompt.trim().length === 0,
          children: B ? "Planning…" : "Preview plan"
        }
      ),
      /* @__PURE__ */ O.jsx(
        "button",
        {
          type: "button",
          className: lh,
          onClick: q,
          disabled: C || f.prompt.trim().length === 0,
          children: C ? "Submitting…" : "Generate video"
        }
      )
    ] }),
    M ? /* @__PURE__ */ O.jsx("div", { className: fs, children: M }) : null,
    _ ? /* @__PURE__ */ O.jsx("div", { className: fs, children: _ }) : null,
    X ? /* @__PURE__ */ O.jsx(Th, { plan: X }) : null
  ] });
}
function _h({
  profiles: f,
  selected: E
}) {
  if (f.length === 0) return null;
  const p = E === "auto" ? "nexus.video.ltx23.fake" : `nexus.video.ltx23.${E}`, d = f.find((B) => B.runtime_id === p);
  if (!d) return null;
  const q = d.healthy ? "ok" : "warn";
  return /* @__PURE__ */ O.jsxs("div", { className: cs, children: [
    /* @__PURE__ */ O.jsx("strong", { children: d.display_name }),
    ": ",
    d.status_message,
    d.experimental ? " (experimental)" : null
  ] });
}
function Th({ plan: f }) {
  const E = f.vram_risk === "safe" ? ah : f.vram_risk === "moderate" ? uh : f.vram_risk === "risky" ? nh : ih;
  return /* @__PURE__ */ O.jsxs("div", { className: Ei, style: { background: "transparent", padding: 0 }, children: [
    /* @__PURE__ */ O.jsx("h3", { className: _i, style: { fontSize: "15px" }, children: "Render plan" }),
    /* @__PURE__ */ O.jsxs("div", { className: Qe, children: [
      /* @__PURE__ */ O.jsx("span", { className: Ve, children: "Mode" }),
      /* @__PURE__ */ O.jsx("span", { className: da, children: f.mode })
    ] }),
    /* @__PURE__ */ O.jsxs("div", { className: Qe, children: [
      /* @__PURE__ */ O.jsx("span", { className: Ve, children: "Segments" }),
      /* @__PURE__ */ O.jsx("span", { className: da, children: f.segment_count })
    ] }),
    /* @__PURE__ */ O.jsxs("div", { className: Qe, children: [
      /* @__PURE__ */ O.jsx("span", { className: Ve, children: "Resolution" }),
      /* @__PURE__ */ O.jsxs("span", { className: da, children: [
        f.width,
        "×",
        f.height
      ] })
    ] }),
    /* @__PURE__ */ O.jsxs("div", { className: Qe, children: [
      /* @__PURE__ */ O.jsx("span", { className: Ve, children: "FPS" }),
      /* @__PURE__ */ O.jsxs("span", { className: da, children: [
        f.base_fps,
        " → ",
        f.output_fps,
        " (",
        f.interpolation,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ O.jsxs("div", { className: Qe, children: [
      /* @__PURE__ */ O.jsx("span", { className: Ve, children: "Duration" }),
      /* @__PURE__ */ O.jsxs("span", { className: da, children: [
        f.requested_duration_seconds.toFixed(1),
        "s"
      ] })
    ] }),
    /* @__PURE__ */ O.jsxs("div", { className: Qe, children: [
      /* @__PURE__ */ O.jsx("span", { className: Ve, children: "VRAM budget" }),
      /* @__PURE__ */ O.jsxs("span", { className: da, children: [
        f.gpu_memory_budget_mb,
        " MB"
      ] })
    ] }),
    /* @__PURE__ */ O.jsxs("div", { className: Qe, children: [
      /* @__PURE__ */ O.jsx("span", { className: Ve, children: "VRAM risk" }),
      /* @__PURE__ */ O.jsx("span", { className: E, children: f.vram_risk })
    ] }),
    /* @__PURE__ */ O.jsxs("div", { className: Qe, children: [
      /* @__PURE__ */ O.jsx("span", { className: Ve, children: "Runtime" }),
      /* @__PURE__ */ O.jsx("span", { className: da, children: f.runtime_profile })
    ] }),
    f.warnings.length > 0 ? /* @__PURE__ */ O.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: f.warnings.map((p) => /* @__PURE__ */ O.jsxs("div", { className: cs, children: [
      /* @__PURE__ */ O.jsx("strong", { children: p.code }),
      ": ",
      p.message
    ] }, p.code)) }) : null
  ] });
}
function zh({
  run: f,
  onCancel: E
}) {
  if (!f)
    return /* @__PURE__ */ O.jsxs("section", { className: Ei, children: [
      /* @__PURE__ */ O.jsx("h2", { className: _i, children: "Output" }),
      /* @__PURE__ */ O.jsx("p", { className: gh, children: "No render in progress yet. Configure the form on the left and press “Generate video”." })
    ] });
  const p = f.status === "completed" || f.status === "failed" || f.status === "cancelled";
  return /* @__PURE__ */ O.jsxs("section", { className: Ei, children: [
    /* @__PURE__ */ O.jsxs("h2", { className: _i, children: [
      "Render ",
      Mh(f.id)
    ] }),
    /* @__PURE__ */ O.jsxs("p", { className: rs, children: [
      "runtime: ",
      f.runtime_profile ?? "?",
      " · ",
      f.width,
      "×",
      f.height,
      " ·",
      " ",
      f.requested_duration_seconds.toFixed(1),
      "s"
    ] }),
    /* @__PURE__ */ O.jsx(Ah, { run: f }),
    f.error_code ? /* @__PURE__ */ O.jsxs("div", { className: fs, children: [
      /* @__PURE__ */ O.jsx("strong", { children: f.error_code }),
      ":",
      " ",
      f.error_message ?? "unknown error"
    ] }) : null,
    /* @__PURE__ */ O.jsx(ph, { segments: f.segments }),
    f.status === "completed" && f.final_artifact_id ? /* @__PURE__ */ O.jsx(Dh, { artifactId: f.final_artifact_id }) : null,
    p ? null : /* @__PURE__ */ O.jsx("div", { className: Zv, children: /* @__PURE__ */ O.jsx(
      "button",
      {
        type: "button",
        className: eh,
        onClick: E,
        children: "Cancel"
      }
    ) })
  ] });
}
function Ah({ run: f }) {
  return /* @__PURE__ */ O.jsxs("div", { className: ra, children: [
    /* @__PURE__ */ O.jsxs(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13
        },
        children: [
          /* @__PURE__ */ O.jsx("span", { children: /* @__PURE__ */ O.jsx("strong", { children: f.status }) }),
          /* @__PURE__ */ O.jsxs("span", { children: [
            f.completed_segments,
            "/",
            f.segment_count,
            " segments ·",
            " ",
            f.progress_percent.toFixed(0),
            "%"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ O.jsx("div", { className: rh, children: /* @__PURE__ */ O.jsx(
      "div",
      {
        className: vh,
        style: { width: `${Math.max(2, f.progress_percent)}%` }
      }
    ) })
  ] });
}
function ph({
  segments: f
}) {
  return /* @__PURE__ */ O.jsx("div", { className: ch, children: f.map((E) => /* @__PURE__ */ O.jsxs("div", { className: fh, children: [
    /* @__PURE__ */ O.jsx("span", { className: Oh(E.status) }),
    /* @__PURE__ */ O.jsxs("span", { children: [
      "Segment ",
      E.index + 1,
      " · ",
      E.duration_seconds.toFixed(1),
      "s"
    ] }),
    /* @__PURE__ */ O.jsx("span", { className: rs, children: E.status })
  ] }, E.index)) });
}
function Oh(f) {
  switch (f) {
    case "queued":
      return jv;
    case "rendering":
      return sh;
    case "completed":
      return oh;
    case "failed":
      return dh;
    default:
      return jv;
  }
}
function Dh({ artifactId: f }) {
  const E = Fy(f);
  return /* @__PURE__ */ O.jsxs("div", { className: mh, children: [
    /* @__PURE__ */ O.jsx("video", { className: yh, src: E, controls: !0, preload: "metadata" }),
    /* @__PURE__ */ O.jsx(
      "a",
      {
        className: hh,
        href: E,
        download: `${f}.mp4`,
        children: "Download MP4"
      }
    ),
    /* @__PURE__ */ O.jsxs("p", { className: rs, children: [
      "artifact: ",
      f
    ] })
  ] });
}
function Mh(f) {
  return f.length > 12 ? `${f.slice(0, 6)}…${f.slice(-4)}` : f;
}
const Ti = "ltx23-video-app", Cv = "ltx23-video-stylesheet";
function Nh() {
  if (typeof document > "u" || document.getElementById(Cv)) return;
  const f = new URL("./ltx23-video.css", import.meta.url).href, E = document.createElement("link");
  E.id = Cv, E.rel = "stylesheet", E.href = f, document.head.appendChild(E);
}
Nh();
class Lv extends HTMLElement {
  root = null;
  connectedCallback() {
    this.root = gy.createRoot(this), this.paint();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null;
  }
  paint() {
    this.root && this.root.render(
      /* @__PURE__ */ O.jsx(vl.StrictMode, { children: /* @__PURE__ */ O.jsx(bh, {}) })
    );
  }
}
customElements.get(Ti) || customElements.define(Ti, Lv);
function Rh() {
  customElements.get(Ti) || customElements.define(Ti, Lv);
}
export {
  Rh as register
};
//# sourceMappingURL=ltx23-video.js.map
