function bh(f) {
  return f && f.__esModule && Object.prototype.hasOwnProperty.call(f, "default") ? f.default : f;
}
var Xf = { exports: {} }, $u = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mm;
function Eh() {
  if (mm) return $u;
  mm = 1;
  var f = Symbol.for("react.transitional.element"), b = Symbol.for("react.fragment");
  function A(o, C, B) {
    var x = null;
    if (B !== void 0 && (x = "" + B), C.key !== void 0 && (x = "" + C.key), "key" in C) {
      B = {};
      for (var G in C)
        G !== "key" && (B[G] = C[G]);
    } else B = C;
    return C = B.ref, {
      $$typeof: f,
      type: o,
      key: x,
      ref: C !== void 0 ? C : null,
      props: B
    };
  }
  return $u.Fragment = b, $u.jsx = A, $u.jsxs = A, $u;
}
var vm;
function _h() {
  return vm || (vm = 1, Xf.exports = Eh()), Xf.exports;
}
var T = _h(), Qf = { exports: {} }, J = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hm;
function Th() {
  if (hm) return J;
  hm = 1;
  var f = Symbol.for("react.transitional.element"), b = Symbol.for("react.portal"), A = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), B = Symbol.for("react.consumer"), x = Symbol.for("react.context"), G = Symbol.for("react.forward_ref"), M = Symbol.for("react.suspense"), _ = Symbol.for("react.memo"), U = Symbol.for("react.lazy"), D = Symbol.for("react.activity"), q = Symbol.iterator;
  function $(r) {
    return r === null || typeof r != "object" ? null : (r = q && r[q] || r["@@iterator"], typeof r == "function" ? r : null);
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
  }, k = Object.assign, vl = {};
  function Hl(r, p, N) {
    this.props = r, this.context = p, this.refs = vl, this.updater = N || il;
  }
  Hl.prototype.isReactComponent = {}, Hl.prototype.setState = function(r, p) {
    if (typeof r != "object" && typeof r != "function" && r != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, r, p, "setState");
  }, Hl.prototype.forceUpdate = function(r) {
    this.updater.enqueueForceUpdate(this, r, "forceUpdate");
  };
  function V() {
  }
  V.prototype = Hl.prototype;
  function Ul(r, p, N) {
    this.props = r, this.context = p, this.refs = vl, this.updater = N || il;
  }
  var I = Ul.prototype = new V();
  I.constructor = Ul, k(I, Hl.prototype), I.isPureReactComponent = !0;
  var gl = Array.isArray;
  function zl() {
  }
  var L = { H: null, A: null, T: null, S: null }, ql = Object.prototype.hasOwnProperty;
  function sl(r, p, N) {
    var j = N.ref;
    return {
      $$typeof: f,
      type: r,
      key: p,
      ref: j !== void 0 ? j : null,
      props: N
    };
  }
  function gt(r, p) {
    return sl(r.type, p, r.props);
  }
  function Bl(r) {
    return typeof r == "object" && r !== null && r.$$typeof === f;
  }
  function Yl(r) {
    var p = { "=": "=0", ":": "=2" };
    return "$" + r.replace(/[=:]/g, function(N) {
      return p[N];
    });
  }
  var nt = /\/+/g;
  function Gl(r, p) {
    return typeof r == "object" && r !== null && r.key != null ? Yl("" + r.key) : p.toString(36);
  }
  function $l(r) {
    switch (r.status) {
      case "fulfilled":
        return r.value;
      case "rejected":
        throw r.reason;
      default:
        switch (typeof r.status == "string" ? r.then(zl, zl) : (r.status = "pending", r.then(
          function(p) {
            r.status === "pending" && (r.status = "fulfilled", r.value = p);
          },
          function(p) {
            r.status === "pending" && (r.status = "rejected", r.reason = p);
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
  function S(r, p, N, j, K) {
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
            case b:
              P = !0;
              break;
            case U:
              return P = r._init, S(
                P(r._payload),
                p,
                N,
                j,
                K
              );
          }
      }
    if (P)
      return K = K(r), P = j === "" ? "." + Gl(r, 0) : j, gl(K) ? (N = "", P != null && (N = P.replace(nt, "$&/") + "/"), S(K, p, N, "", function(ve) {
        return ve;
      })) : K != null && (Bl(K) && (K = gt(
        K,
        N + (K.key == null || r && r.key === K.key ? "" : ("" + K.key).replace(
          nt,
          "$&/"
        ) + "/") + P
      )), p.push(K)), 1;
    P = 0;
    var Xl = j === "" ? "." : j + ":";
    if (gl(r))
      for (var xl = 0; xl < r.length; xl++)
        j = r[xl], w = Xl + Gl(j, xl), P += S(
          j,
          p,
          N,
          w,
          K
        );
    else if (xl = $(r), typeof xl == "function")
      for (r = xl.call(r), xl = 0; !(j = r.next()).done; )
        j = j.value, w = Xl + Gl(j, xl++), P += S(
          j,
          p,
          N,
          w,
          K
        );
    else if (w === "object") {
      if (typeof r.then == "function")
        return S(
          $l(r),
          p,
          N,
          j,
          K
        );
      throw p = String(r), Error(
        "Objects are not valid as a React child (found: " + (p === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : p) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return P;
  }
  function R(r, p, N) {
    if (r == null) return r;
    var j = [], K = 0;
    return S(r, j, "", "", function(w) {
      return p.call(N, w, K++);
    }), j;
  }
  function Q(r) {
    if (r._status === -1) {
      var p = r._result;
      p = p(), p.then(
        function(N) {
          (r._status === 0 || r._status === -1) && (r._status = 1, r._result = N);
        },
        function(N) {
          (r._status === 0 || r._status === -1) && (r._status = 2, r._result = N);
        }
      ), r._status === -1 && (r._status = 0, r._result = p);
    }
    if (r._status === 1) return r._result.default;
    throw r._result;
  }
  var rl = typeof reportError == "function" ? reportError : function(r) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var p = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof r == "object" && r !== null && typeof r.message == "string" ? String(r.message) : String(r),
        error: r
      });
      if (!window.dispatchEvent(p)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", r);
      return;
    }
    console.error(r);
  }, cl = {
    map: R,
    forEach: function(r, p, N) {
      R(
        r,
        function() {
          p.apply(this, arguments);
        },
        N
      );
    },
    count: function(r) {
      var p = 0;
      return R(r, function() {
        p++;
      }), p;
    },
    toArray: function(r) {
      return R(r, function(p) {
        return p;
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
  return J.Activity = D, J.Children = cl, J.Component = Hl, J.Fragment = A, J.Profiler = C, J.PureComponent = Ul, J.StrictMode = o, J.Suspense = M, J.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = L, J.__COMPILER_RUNTIME = {
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
  }, J.cloneElement = function(r, p, N) {
    if (r == null)
      throw Error(
        "The argument must be a React element, but you passed " + r + "."
      );
    var j = k({}, r.props), K = r.key;
    if (p != null)
      for (w in p.key !== void 0 && (K = "" + p.key), p)
        !ql.call(p, w) || w === "key" || w === "__self" || w === "__source" || w === "ref" && p.ref === void 0 || (j[w] = p[w]);
    var w = arguments.length - 2;
    if (w === 1) j.children = N;
    else if (1 < w) {
      for (var P = Array(w), Xl = 0; Xl < w; Xl++)
        P[Xl] = arguments[Xl + 2];
      j.children = P;
    }
    return sl(r.type, K, j);
  }, J.createContext = function(r) {
    return r = {
      $$typeof: x,
      _currentValue: r,
      _currentValue2: r,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, r.Provider = r, r.Consumer = {
      $$typeof: B,
      _context: r
    }, r;
  }, J.createElement = function(r, p, N) {
    var j, K = {}, w = null;
    if (p != null)
      for (j in p.key !== void 0 && (w = "" + p.key), p)
        ql.call(p, j) && j !== "key" && j !== "__self" && j !== "__source" && (K[j] = p[j]);
    var P = arguments.length - 2;
    if (P === 1) K.children = N;
    else if (1 < P) {
      for (var Xl = Array(P), xl = 0; xl < P; xl++)
        Xl[xl] = arguments[xl + 2];
      K.children = Xl;
    }
    if (r && r.defaultProps)
      for (j in P = r.defaultProps, P)
        K[j] === void 0 && (K[j] = P[j]);
    return sl(r, w, K);
  }, J.createRef = function() {
    return { current: null };
  }, J.forwardRef = function(r) {
    return { $$typeof: G, render: r };
  }, J.isValidElement = Bl, J.lazy = function(r) {
    return {
      $$typeof: U,
      _payload: { _status: -1, _result: r },
      _init: Q
    };
  }, J.memo = function(r, p) {
    return {
      $$typeof: _,
      type: r,
      compare: p === void 0 ? null : p
    };
  }, J.startTransition = function(r) {
    var p = L.T, N = {};
    L.T = N;
    try {
      var j = r(), K = L.S;
      K !== null && K(N, j), typeof j == "object" && j !== null && typeof j.then == "function" && j.then(zl, rl);
    } catch (w) {
      rl(w);
    } finally {
      p !== null && N.types !== null && (p.types = N.types), L.T = p;
    }
  }, J.unstable_useCacheRefresh = function() {
    return L.H.useCacheRefresh();
  }, J.use = function(r) {
    return L.H.use(r);
  }, J.useActionState = function(r, p, N) {
    return L.H.useActionState(r, p, N);
  }, J.useCallback = function(r, p) {
    return L.H.useCallback(r, p);
  }, J.useContext = function(r) {
    return L.H.useContext(r);
  }, J.useDebugValue = function() {
  }, J.useDeferredValue = function(r, p) {
    return L.H.useDeferredValue(r, p);
  }, J.useEffect = function(r, p) {
    return L.H.useEffect(r, p);
  }, J.useEffectEvent = function(r) {
    return L.H.useEffectEvent(r);
  }, J.useId = function() {
    return L.H.useId();
  }, J.useImperativeHandle = function(r, p, N) {
    return L.H.useImperativeHandle(r, p, N);
  }, J.useInsertionEffect = function(r, p) {
    return L.H.useInsertionEffect(r, p);
  }, J.useLayoutEffect = function(r, p) {
    return L.H.useLayoutEffect(r, p);
  }, J.useMemo = function(r, p) {
    return L.H.useMemo(r, p);
  }, J.useOptimistic = function(r, p) {
    return L.H.useOptimistic(r, p);
  }, J.useReducer = function(r, p, N) {
    return L.H.useReducer(r, p, N);
  }, J.useRef = function(r) {
    return L.H.useRef(r);
  }, J.useState = function(r) {
    return L.H.useState(r);
  }, J.useSyncExternalStore = function(r, p, N) {
    return L.H.useSyncExternalStore(
      r,
      p,
      N
    );
  }, J.useTransition = function() {
    return L.H.useTransition();
  }, J.version = "19.2.6", J;
}
var ym;
function pi() {
  return ym || (ym = 1, Qf.exports = Th()), Qf.exports;
}
var fl = pi();
const rs = /* @__PURE__ */ bh(fl);
var Vf = { exports: {} }, Fu = {}, Zf = { exports: {} }, Lf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gm;
function zh() {
  return gm || (gm = 1, (function(f) {
    function b(S, R) {
      var Q = S.length;
      S.push(R);
      l: for (; 0 < Q; ) {
        var rl = Q - 1 >>> 1, cl = S[rl];
        if (0 < C(cl, R))
          S[rl] = R, S[Q] = cl, Q = rl;
        else break l;
      }
    }
    function A(S) {
      return S.length === 0 ? null : S[0];
    }
    function o(S) {
      if (S.length === 0) return null;
      var R = S[0], Q = S.pop();
      if (Q !== R) {
        S[0] = Q;
        l: for (var rl = 0, cl = S.length, r = cl >>> 1; rl < r; ) {
          var p = 2 * (rl + 1) - 1, N = S[p], j = p + 1, K = S[j];
          if (0 > C(N, Q))
            j < cl && 0 > C(K, N) ? (S[rl] = K, S[j] = Q, rl = j) : (S[rl] = N, S[p] = Q, rl = p);
          else if (j < cl && 0 > C(K, Q))
            S[rl] = K, S[j] = Q, rl = j;
          else break l;
        }
      }
      return R;
    }
    function C(S, R) {
      var Q = S.sortIndex - R.sortIndex;
      return Q !== 0 ? Q : S.id - R.id;
    }
    if (f.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var B = performance;
      f.unstable_now = function() {
        return B.now();
      };
    } else {
      var x = Date, G = x.now();
      f.unstable_now = function() {
        return x.now() - G;
      };
    }
    var M = [], _ = [], U = 1, D = null, q = 3, $ = !1, il = !1, k = !1, vl = !1, Hl = typeof setTimeout == "function" ? setTimeout : null, V = typeof clearTimeout == "function" ? clearTimeout : null, Ul = typeof setImmediate < "u" ? setImmediate : null;
    function I(S) {
      for (var R = A(_); R !== null; ) {
        if (R.callback === null) o(_);
        else if (R.startTime <= S)
          o(_), R.sortIndex = R.expirationTime, b(M, R);
        else break;
        R = A(_);
      }
    }
    function gl(S) {
      if (k = !1, I(S), !il)
        if (A(M) !== null)
          il = !0, zl || (zl = !0, Yl());
        else {
          var R = A(_);
          R !== null && $l(gl, R.startTime - S);
        }
    }
    var zl = !1, L = -1, ql = 5, sl = -1;
    function gt() {
      return vl ? !0 : !(f.unstable_now() - sl < ql);
    }
    function Bl() {
      if (vl = !1, zl) {
        var S = f.unstable_now();
        sl = S;
        var R = !0;
        try {
          l: {
            il = !1, k && (k = !1, V(L), L = -1), $ = !0;
            var Q = q;
            try {
              t: {
                for (I(S), D = A(M); D !== null && !(D.expirationTime > S && gt()); ) {
                  var rl = D.callback;
                  if (typeof rl == "function") {
                    D.callback = null, q = D.priorityLevel;
                    var cl = rl(
                      D.expirationTime <= S
                    );
                    if (S = f.unstable_now(), typeof cl == "function") {
                      D.callback = cl, I(S), R = !0;
                      break t;
                    }
                    D === A(M) && o(M), I(S);
                  } else o(M);
                  D = A(M);
                }
                if (D !== null) R = !0;
                else {
                  var r = A(_);
                  r !== null && $l(
                    gl,
                    r.startTime - S
                  ), R = !1;
                }
              }
              break l;
            } finally {
              D = null, q = Q, $ = !1;
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
      return q;
    }, f.unstable_next = function(S) {
      switch (q) {
        case 1:
        case 2:
        case 3:
          var R = 3;
          break;
        default:
          R = q;
      }
      var Q = q;
      q = R;
      try {
        return S();
      } finally {
        q = Q;
      }
    }, f.unstable_requestPaint = function() {
      vl = !0;
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
      var Q = q;
      q = S;
      try {
        return R();
      } finally {
        q = Q;
      }
    }, f.unstable_scheduleCallback = function(S, R, Q) {
      var rl = f.unstable_now();
      switch (typeof Q == "object" && Q !== null ? (Q = Q.delay, Q = typeof Q == "number" && 0 < Q ? rl + Q : rl) : Q = rl, S) {
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
        id: U++,
        callback: R,
        priorityLevel: S,
        startTime: Q,
        expirationTime: cl,
        sortIndex: -1
      }, Q > rl ? (S.sortIndex = Q, b(_, S), A(M) === null && S === A(_) && (k ? (V(L), L = -1) : k = !0, $l(gl, Q - rl))) : (S.sortIndex = cl, b(M, S), il || $ || (il = !0, zl || (zl = !0, Yl()))), S;
    }, f.unstable_shouldYield = gt, f.unstable_wrapCallback = function(S) {
      var R = q;
      return function() {
        var Q = q;
        q = R;
        try {
          return S.apply(this, arguments);
        } finally {
          q = Q;
        }
      };
    };
  })(Lf)), Lf;
}
var Sm;
function ph() {
  return Sm || (Sm = 1, Zf.exports = zh()), Zf.exports;
}
var Kf = { exports: {} }, at = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bm;
function Ah() {
  if (bm) return at;
  bm = 1;
  var f = pi();
  function b(M) {
    var _ = "https://react.dev/errors/" + M;
    if (1 < arguments.length) {
      _ += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var U = 2; U < arguments.length; U++)
        _ += "&args[]=" + encodeURIComponent(arguments[U]);
    }
    return "Minified React error #" + M + "; visit " + _ + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function A() {
  }
  var o = {
    d: {
      f: A,
      r: function() {
        throw Error(b(522));
      },
      D: A,
      C: A,
      L: A,
      m: A,
      X: A,
      S: A,
      M: A
    },
    p: 0,
    findDOMNode: null
  }, C = Symbol.for("react.portal");
  function B(M, _, U) {
    var D = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: C,
      key: D == null ? null : "" + D,
      children: M,
      containerInfo: _,
      implementation: U
    };
  }
  var x = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function G(M, _) {
    if (M === "font") return "";
    if (typeof _ == "string")
      return _ === "use-credentials" ? _ : "";
  }
  return at.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, at.createPortal = function(M, _) {
    var U = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!_ || _.nodeType !== 1 && _.nodeType !== 9 && _.nodeType !== 11)
      throw Error(b(299));
    return B(M, _, null, U);
  }, at.flushSync = function(M) {
    var _ = x.T, U = o.p;
    try {
      if (x.T = null, o.p = 2, M) return M();
    } finally {
      x.T = _, o.p = U, o.d.f();
    }
  }, at.preconnect = function(M, _) {
    typeof M == "string" && (_ ? (_ = _.crossOrigin, _ = typeof _ == "string" ? _ === "use-credentials" ? _ : "" : void 0) : _ = null, o.d.C(M, _));
  }, at.prefetchDNS = function(M) {
    typeof M == "string" && o.d.D(M);
  }, at.preinit = function(M, _) {
    if (typeof M == "string" && _ && typeof _.as == "string") {
      var U = _.as, D = G(U, _.crossOrigin), q = typeof _.integrity == "string" ? _.integrity : void 0, $ = typeof _.fetchPriority == "string" ? _.fetchPriority : void 0;
      U === "style" ? o.d.S(
        M,
        typeof _.precedence == "string" ? _.precedence : void 0,
        {
          crossOrigin: D,
          integrity: q,
          fetchPriority: $
        }
      ) : U === "script" && o.d.X(M, {
        crossOrigin: D,
        integrity: q,
        fetchPriority: $,
        nonce: typeof _.nonce == "string" ? _.nonce : void 0
      });
    }
  }, at.preinitModule = function(M, _) {
    if (typeof M == "string")
      if (typeof _ == "object" && _ !== null) {
        if (_.as == null || _.as === "script") {
          var U = G(
            _.as,
            _.crossOrigin
          );
          o.d.M(M, {
            crossOrigin: U,
            integrity: typeof _.integrity == "string" ? _.integrity : void 0,
            nonce: typeof _.nonce == "string" ? _.nonce : void 0
          });
        }
      } else _ == null && o.d.M(M);
  }, at.preload = function(M, _) {
    if (typeof M == "string" && typeof _ == "object" && _ !== null && typeof _.as == "string") {
      var U = _.as, D = G(U, _.crossOrigin);
      o.d.L(M, U, {
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
        var U = G(_.as, _.crossOrigin);
        o.d.m(M, {
          as: typeof _.as == "string" && _.as !== "script" ? _.as : void 0,
          crossOrigin: U,
          integrity: typeof _.integrity == "string" ? _.integrity : void 0
        });
      } else o.d.m(M);
  }, at.requestFormReset = function(M) {
    o.d.r(M);
  }, at.unstable_batchedUpdates = function(M, _) {
    return M(_);
  }, at.useFormState = function(M, _, U) {
    return x.H.useFormState(M, _, U);
  }, at.useFormStatus = function() {
    return x.H.useHostTransitionStatus();
  }, at.version = "19.2.6", at;
}
var Em;
function Oh() {
  if (Em) return Kf.exports;
  Em = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (b) {
        console.error(b);
      }
  }
  return f(), Kf.exports = Ah(), Kf.exports;
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
var _m;
function Dh() {
  if (_m) return Fu;
  _m = 1;
  var f = ph(), b = pi(), A = Oh();
  function o(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        t += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function C(l) {
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
  function x(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function G(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function M(l) {
    if (B(l) !== l)
      throw Error(o(188));
  }
  function _(l) {
    var t = l.alternate;
    if (!t) {
      if (t = B(l), t === null) throw Error(o(188));
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
        throw Error(o(188));
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
          if (!i) throw Error(o(189));
        }
      }
      if (e.alternate !== a) throw Error(o(190));
    }
    if (e.tag !== 3) throw Error(o(188));
    return e.stateNode.current === e ? l : t;
  }
  function U(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (t = U(l), t !== null) return t;
      l = l.sibling;
    }
    return null;
  }
  var D = Object.assign, q = Symbol.for("react.element"), $ = Symbol.for("react.transitional.element"), il = Symbol.for("react.portal"), k = Symbol.for("react.fragment"), vl = Symbol.for("react.strict_mode"), Hl = Symbol.for("react.profiler"), V = Symbol.for("react.consumer"), Ul = Symbol.for("react.context"), I = Symbol.for("react.forward_ref"), gl = Symbol.for("react.suspense"), zl = Symbol.for("react.suspense_list"), L = Symbol.for("react.memo"), ql = Symbol.for("react.lazy"), sl = Symbol.for("react.activity"), gt = Symbol.for("react.memo_cache_sentinel"), Bl = Symbol.iterator;
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
      case vl:
        return "StrictMode";
      case gl:
        return "Suspense";
      case zl:
        return "SuspenseList";
      case sl:
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
  var $l = Array.isArray, S = b.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, R = A.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, rl = [], cl = -1;
  function r(l) {
    return { current: l };
  }
  function p(l) {
    0 > cl || (l.current = rl[cl], rl[cl] = null, cl--);
  }
  function N(l, t) {
    cl++, rl[cl] = l.current, l.current = t;
  }
  var j = r(null), K = r(null), w = r(null), P = r(null);
  function Xl(l, t) {
    switch (N(w, t), N(K, l), N(j, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? qr(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI)
          t = qr(t), l = Br(t, l);
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
    p(j), N(j, l);
  }
  function xl() {
    p(j), p(K), p(w);
  }
  function ve(l) {
    l.memoizedState !== null && N(P, l);
    var t = j.current, e = Br(t, l.type);
    t !== e && (N(K, l), N(j, e));
  }
  function Le(l) {
    K.current === l && (p(j), p(K)), P.current === l && (p(P), Ku._currentValue = Q);
  }
  var tu, en;
  function St(l) {
    if (tu === void 0)
      try {
        throw Error();
      } catch (e) {
        var t = e.stack.trim().match(/\n( *(at )?)/);
        tu = t && t[1] || "", en = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + tu + l + en;
  }
  var ma = !1;
  function an(l, t) {
    if (!l || ma) return "";
    ma = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var O = function() {
                throw Error();
              };
              if (Object.defineProperty(O.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(O, []);
                } catch (g) {
                  var y = g;
                }
                Reflect.construct(l, [], O);
              } else {
                try {
                  O.call();
                } catch (g) {
                  y = g;
                }
                l.call(O.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (g) {
                y = g;
              }
              (O = l()) && typeof O.catch == "function" && O.catch(function() {
              });
            }
          } catch (g) {
            if (g && y && typeof g.stack == "string")
              return [g.stack, y.stack];
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
`), h = c.split(`
`);
        for (u = a = 0; a < s.length && !s[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; u < h.length && !h[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (a === s.length || u === h.length)
          for (a = s.length - 1, u = h.length - 1; 1 <= a && 0 <= u && s[a] !== h[u]; )
            u--;
        for (; 1 <= a && 0 <= u; a--, u--)
          if (s[a] !== h[u]) {
            if (a !== 1 || u !== 1)
              do
                if (a--, u--, 0 > u || s[a] !== h[u]) {
                  var E = `
` + s[a].replace(" at new ", " at ");
                  return l.displayName && E.includes("<anonymous>") && (E = E.replace("<anonymous>", l.displayName)), E;
                }
              while (1 <= a && 0 <= u);
            break;
          }
      }
    } finally {
      ma = !1, Error.prepareStackTrace = e;
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
        return an(l.type, !1);
      case 11:
        return an(l.type.render, !1);
      case 1:
        return an(l.type, !0);
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
  var pl = Object.prototype.hasOwnProperty, Al = f.unstable_scheduleCallback, ct = f.unstable_cancelCallback, ft = f.unstable_shouldYield, Ql = f.unstable_requestPaint, Ol = f.unstable_now, Ke = f.unstable_getCurrentPriorityLevel, he = f.unstable_ImmediatePriority, eu = f.unstable_UserBlockingPriority, Je = f.unstable_NormalPriority, st = f.unstable_LowPriority, Mt = f.unstable_IdlePriority, au = f.log, Oi = f.unstable_setDisableYieldValue, wt = null, bt = null;
  function ye(l) {
    if (typeof au == "function" && Oi(l), bt && typeof bt.setStrictMode == "function")
      try {
        bt.setStrictMode(wt, l);
      } catch {
      }
  }
  var Et = Math.clz32 ? Math.clz32 : nv, av = Math.log, uv = Math.LN2;
  function nv(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (av(l) / uv | 0) | 0;
  }
  var un = 256, nn = 262144, cn = 4194304;
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
  function fn(l, t, e) {
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
  function iv(l, t) {
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
  function ys() {
    var l = cn;
    return cn <<= 1, (cn & 62914560) === 0 && (cn = 4194304), l;
  }
  function Di(l) {
    for (var t = [], e = 0; 31 > e; e++) t.push(l);
    return t;
  }
  function nu(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function cv(l, t, e, a, u, n) {
    var i = l.pendingLanes;
    l.pendingLanes = e, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= e, l.entangledLanes &= e, l.errorRecoveryDisabledLanes &= e, l.shellSuspendCounter = 0;
    var c = l.entanglements, s = l.expirationTimes, h = l.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var E = 31 - Et(e), O = 1 << E;
      c[E] = 0, s[E] = -1;
      var y = h[E];
      if (y !== null)
        for (h[E] = null, E = 0; E < y.length; E++) {
          var g = y[E];
          g !== null && (g.lane &= -536870913);
        }
      e &= ~O;
    }
    a !== 0 && gs(l, a, 0), n !== 0 && u === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(i & ~t));
  }
  function gs(l, t, e) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var a = 31 - Et(t);
    l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | e & 261930;
  }
  function Ss(l, t) {
    var e = l.entangledLanes |= t;
    for (l = l.entanglements; e; ) {
      var a = 31 - Et(e), u = 1 << a;
      u & t | l[a] & t && (l[a] |= t), e &= ~u;
    }
  }
  function bs(l, t) {
    var e = t & -t;
    return e = (e & 42) !== 0 ? 1 : Mi(e), (e & (l.suspendedLanes | t)) !== 0 ? 0 : e;
  }
  function Mi(l) {
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
  function Ni(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Es() {
    var l = R.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : im(l.type));
  }
  function _s(l, t) {
    var e = R.p;
    try {
      return R.p = l, t();
    } finally {
      R.p = e;
    }
  }
  var ge = Math.random().toString(36).slice(2), Il = "__reactFiber$" + ge, ot = "__reactProps$" + ge, va = "__reactContainer$" + ge, Ri = "__reactEvents$" + ge, fv = "__reactListeners$" + ge, sv = "__reactHandles$" + ge, Ts = "__reactResources$" + ge, iu = "__reactMarker$" + ge;
  function Ui(l) {
    delete l[Il], delete l[ot], delete l[Ri], delete l[fv], delete l[sv];
  }
  function ha(l) {
    var t = l[Il];
    if (t) return t;
    for (var e = l.parentNode; e; ) {
      if (t = e[va] || e[Il]) {
        if (e = t.alternate, t.child !== null || e !== null && e.child !== null)
          for (l = Lr(l); l !== null; ) {
            if (e = l[Il]) return e;
            l = Lr(l);
          }
        return t;
      }
      l = e, e = l.parentNode;
    }
    return null;
  }
  function ya(l) {
    if (l = l[Il] || l[va]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return l;
    }
    return null;
  }
  function cu(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(o(33));
  }
  function ga(l) {
    var t = l[Ts];
    return t || (t = l[Ts] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Fl(l) {
    l[iu] = !0;
  }
  var zs = /* @__PURE__ */ new Set(), ps = {};
  function We(l, t) {
    Sa(l, t), Sa(l + "Capture", t);
  }
  function Sa(l, t) {
    for (ps[l] = t, l = 0; l < t.length; l++)
      zs.add(t[l]);
  }
  var ov = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), As = {}, Os = {};
  function dv(l) {
    return pl.call(Os, l) ? !0 : pl.call(As, l) ? !1 : ov.test(l) ? Os[l] = !0 : (As[l] = !0, !1);
  }
  function sn(l, t, e) {
    if (dv(t))
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
  function on(l, t, e) {
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
  function Ds(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function rv(l, t, e) {
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
  function xi(l) {
    if (!l._valueTracker) {
      var t = Ds(l) ? "checked" : "value";
      l._valueTracker = rv(
        l,
        t,
        "" + l[t]
      );
    }
  }
  function Ms(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var e = t.getValue(), a = "";
    return l && (a = Ds(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== e ? (t.setValue(l), !0) : !1;
  }
  function dn(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var mv = /[\n"\\]/g;
  function Rt(l) {
    return l.replace(
      mv,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function ji(l, t, e, a, u, n, i, c) {
    l.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? l.type = i : l.removeAttribute("type"), t != null ? i === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + Nt(t)) : l.value !== "" + Nt(t) && (l.value = "" + Nt(t)) : i !== "submit" && i !== "reset" || l.removeAttribute("value"), t != null ? Ci(l, i, Nt(t)) : e != null ? Ci(l, i, Nt(e)) : a != null && l.removeAttribute("value"), u == null && n != null && (l.defaultChecked = !!n), u != null && (l.checked = u && typeof u != "function" && typeof u != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.name = "" + Nt(c) : l.removeAttribute("name");
  }
  function Ns(l, t, e, a, u, n, i, c) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || e != null) {
      if (!(n !== "submit" && n !== "reset" || t != null)) {
        xi(l);
        return;
      }
      e = e != null ? "" + Nt(e) : "", t = t != null ? "" + Nt(t) : e, c || t === l.value || (l.value = t), l.defaultValue = t;
    }
    a = a ?? u, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = c ? l.checked : !!a, l.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (l.name = i), xi(l);
  }
  function Ci(l, t, e) {
    t === "number" && dn(l.ownerDocument) === l || l.defaultValue === "" + e || (l.defaultValue = "" + e);
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
  function Rs(l, t, e) {
    if (t != null && (t = "" + Nt(t), t !== l.value && (l.value = t), e == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = e != null ? "" + Nt(e) : "";
  }
  function Us(l, t, e, a) {
    if (t == null) {
      if (a != null) {
        if (e != null) throw Error(o(92));
        if ($l(a)) {
          if (1 < a.length) throw Error(o(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), t = e;
    }
    e = Nt(t), l.defaultValue = e, a = l.textContent, a === e && a !== "" && a !== null && (l.value = a), xi(l);
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
  var vv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function xs(l, t, e) {
    var a = t.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, e) : typeof e != "number" || e === 0 || vv.has(t) ? t === "float" ? l.cssFloat = e : l[t] = ("" + e).trim() : l[t] = e + "px";
  }
  function js(l, t, e) {
    if (t != null && typeof t != "object")
      throw Error(o(62));
    if (l = l.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
      for (var u in t)
        a = t[u], t.hasOwnProperty(u) && e[u] !== a && xs(l, u, a);
    } else
      for (var n in t)
        t.hasOwnProperty(n) && xs(l, n, t[n]);
  }
  function Hi(l) {
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
  var hv = /* @__PURE__ */ new Map([
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
  ]), yv = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function rn(l) {
    return yv.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function $t() {
  }
  var qi = null;
  function Bi(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var _a = null, Ta = null;
  function Cs(l) {
    var t = ya(l);
    if (t && (l = t.stateNode)) {
      var e = l[ot] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if (ji(
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
                if (!u) throw Error(o(90));
                ji(
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
              a = e[t], a.form === l.form && Ms(a);
          }
          break l;
        case "textarea":
          Rs(l, e.value, e.defaultValue);
          break l;
        case "select":
          t = e.value, t != null && ba(l, !!e.multiple, t, !1);
      }
    }
  }
  var Yi = !1;
  function Hs(l, t, e) {
    if (Yi) return l(t, e);
    Yi = !0;
    try {
      var a = l(t);
      return a;
    } finally {
      if (Yi = !1, (_a !== null || Ta !== null) && (Pn(), _a && (t = _a, l = Ta, Ta = _a = null, Cs(t), l)))
        for (t = 0; t < l.length; t++) Cs(l[t]);
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
        o(231, t, typeof e)
      );
    return e;
  }
  var Ft = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Gi = !1;
  if (Ft)
    try {
      var su = {};
      Object.defineProperty(su, "passive", {
        get: function() {
          Gi = !0;
        }
      }), window.addEventListener("test", su, su), window.removeEventListener("test", su, su);
    } catch {
      Gi = !1;
    }
  var Se = null, Xi = null, mn = null;
  function qs() {
    if (mn) return mn;
    var l, t = Xi, e = t.length, a, u = "value" in Se ? Se.value : Se.textContent, n = u.length;
    for (l = 0; l < e && t[l] === u[l]; l++) ;
    var i = e - l;
    for (a = 1; a <= i && t[e - a] === u[n - a]; a++) ;
    return mn = u.slice(l, 1 < a ? 1 - a : void 0);
  }
  function vn(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function hn() {
    return !0;
  }
  function Bs() {
    return !1;
  }
  function dt(l) {
    function t(e, a, u, n, i) {
      this._reactName = e, this._targetInst = u, this.type = a, this.nativeEvent = n, this.target = i, this.currentTarget = null;
      for (var c in l)
        l.hasOwnProperty(c) && (e = l[c], this[c] = e ? e(n) : n[c]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? hn : Bs, this.isPropagationStopped = Bs, this;
    }
    return D(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = hn);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = hn);
      },
      persist: function() {
      },
      isPersistent: hn
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
  }, yn = dt($e), ou = D({}, $e, { view: 0, detail: 0 }), gv = dt(ou), Qi, Vi, du, gn = D({}, ou, {
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
    getModifierState: Li,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== du && (du && l.type === "mousemove" ? (Qi = l.screenX - du.screenX, Vi = l.screenY - du.screenY) : Vi = Qi = 0, du = l), Qi);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : Vi;
    }
  }), Ys = dt(gn), Sv = D({}, gn, { dataTransfer: 0 }), bv = dt(Sv), Ev = D({}, ou, { relatedTarget: 0 }), Zi = dt(Ev), _v = D({}, $e, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Tv = dt(_v), zv = D({}, $e, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), pv = dt(zv), Av = D({}, $e, { data: 0 }), Gs = dt(Av), Ov = {
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
  }, Dv = {
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
  }, Mv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Nv(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = Mv[l]) ? !!t[l] : !1;
  }
  function Li() {
    return Nv;
  }
  var Rv = D({}, ou, {
    key: function(l) {
      if (l.key) {
        var t = Ov[l.key] || l.key;
        if (t !== "Unidentified") return t;
      }
      return l.type === "keypress" ? (l = vn(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? Dv[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Li,
    charCode: function(l) {
      return l.type === "keypress" ? vn(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? vn(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), Uv = dt(Rv), xv = D({}, gn, {
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
  }), Xs = dt(xv), jv = D({}, ou, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Li
  }), Cv = dt(jv), Hv = D({}, $e, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), qv = dt(Hv), Bv = D({}, gn, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Yv = dt(Bv), Gv = D({}, $e, {
    newState: 0,
    oldState: 0
  }), Xv = dt(Gv), Qv = [9, 13, 27, 32], Ki = Ft && "CompositionEvent" in window, ru = null;
  Ft && "documentMode" in document && (ru = document.documentMode);
  var Vv = Ft && "TextEvent" in window && !ru, Qs = Ft && (!Ki || ru && 8 < ru && 11 >= ru), Vs = " ", Zs = !1;
  function Ls(l, t) {
    switch (l) {
      case "keyup":
        return Qv.indexOf(t.keyCode) !== -1;
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
  function Ks(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var za = !1;
  function Zv(l, t) {
    switch (l) {
      case "compositionend":
        return Ks(t);
      case "keypress":
        return t.which !== 32 ? null : (Zs = !0, Vs);
      case "textInput":
        return l = t.data, l === Vs && Zs ? null : l;
      default:
        return null;
    }
  }
  function Lv(l, t) {
    if (za)
      return l === "compositionend" || !Ki && Ls(l, t) ? (l = qs(), mn = Xi = Se = null, za = !1, l) : null;
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
        return Qs && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Kv = {
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
  function Js(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!Kv[l.type] : t === "textarea";
  }
  function ws(l, t, e, a) {
    _a ? Ta ? Ta.push(a) : Ta = [a] : _a = a, t = ii(t, "onChange"), 0 < t.length && (e = new yn(
      "onChange",
      "change",
      null,
      e,
      a
    ), l.push({ event: e, listeners: t }));
  }
  var mu = null, vu = null;
  function Jv(l) {
    Rr(l, 0);
  }
  function Sn(l) {
    var t = cu(l);
    if (Ms(t)) return l;
  }
  function Ws(l, t) {
    if (l === "change") return t;
  }
  var $s = !1;
  if (Ft) {
    var Ji;
    if (Ft) {
      var wi = "oninput" in document;
      if (!wi) {
        var Fs = document.createElement("div");
        Fs.setAttribute("oninput", "return;"), wi = typeof Fs.oninput == "function";
      }
      Ji = wi;
    } else Ji = !1;
    $s = Ji && (!document.documentMode || 9 < document.documentMode);
  }
  function ks() {
    mu && (mu.detachEvent("onpropertychange", Is), vu = mu = null);
  }
  function Is(l) {
    if (l.propertyName === "value" && Sn(vu)) {
      var t = [];
      ws(
        t,
        vu,
        l,
        Bi(l)
      ), Hs(Jv, t);
    }
  }
  function wv(l, t, e) {
    l === "focusin" ? (ks(), mu = t, vu = e, mu.attachEvent("onpropertychange", Is)) : l === "focusout" && ks();
  }
  function Wv(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return Sn(vu);
  }
  function $v(l, t) {
    if (l === "click") return Sn(t);
  }
  function Fv(l, t) {
    if (l === "input" || l === "change")
      return Sn(t);
  }
  function kv(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var _t = typeof Object.is == "function" ? Object.is : kv;
  function hu(l, t) {
    if (_t(l, t)) return !0;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null)
      return !1;
    var e = Object.keys(l), a = Object.keys(t);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var u = e[a];
      if (!pl.call(t, u) || !_t(l[u], t[u]))
        return !1;
    }
    return !0;
  }
  function Ps(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function lo(l, t) {
    var e = Ps(l);
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
      e = Ps(e);
    }
  }
  function to(l, t) {
    return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? to(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function eo(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = dn(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var e = typeof t.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) l = t.contentWindow;
      else break;
      t = dn(l.document);
    }
    return t;
  }
  function Wi(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var Iv = Ft && "documentMode" in document && 11 >= document.documentMode, pa = null, $i = null, yu = null, Fi = !1;
  function ao(l, t, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    Fi || pa == null || pa !== dn(a) || (a = pa, "selectionStart" in a && Wi(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), yu && hu(yu, a) || (yu = a, a = ii($i, "onSelect"), 0 < a.length && (t = new yn(
      "onSelect",
      "select",
      null,
      t,
      e
    ), l.push({ event: t, listeners: a }), t.target = pa)));
  }
  function Fe(l, t) {
    var e = {};
    return e[l.toLowerCase()] = t.toLowerCase(), e["Webkit" + l] = "webkit" + t, e["Moz" + l] = "moz" + t, e;
  }
  var Aa = {
    animationend: Fe("Animation", "AnimationEnd"),
    animationiteration: Fe("Animation", "AnimationIteration"),
    animationstart: Fe("Animation", "AnimationStart"),
    transitionrun: Fe("Transition", "TransitionRun"),
    transitionstart: Fe("Transition", "TransitionStart"),
    transitioncancel: Fe("Transition", "TransitionCancel"),
    transitionend: Fe("Transition", "TransitionEnd")
  }, ki = {}, uo = {};
  Ft && (uo = document.createElement("div").style, "AnimationEvent" in window || (delete Aa.animationend.animation, delete Aa.animationiteration.animation, delete Aa.animationstart.animation), "TransitionEvent" in window || delete Aa.transitionend.transition);
  function ke(l) {
    if (ki[l]) return ki[l];
    if (!Aa[l]) return l;
    var t = Aa[l], e;
    for (e in t)
      if (t.hasOwnProperty(e) && e in uo)
        return ki[l] = t[e];
    return l;
  }
  var no = ke("animationend"), io = ke("animationiteration"), co = ke("animationstart"), Pv = ke("transitionrun"), l0 = ke("transitionstart"), t0 = ke("transitioncancel"), fo = ke("transitionend"), so = /* @__PURE__ */ new Map(), Ii = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Ii.push("scrollEnd");
  function Gt(l, t) {
    so.set(l, t), We(t, [l]);
  }
  var bn = typeof reportError == "function" ? reportError : function(l) {
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
  }, Ut = [], Oa = 0, Pi = 0;
  function En() {
    for (var l = Oa, t = Pi = Oa = 0; t < l; ) {
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
      n !== 0 && oo(e, u, n);
    }
  }
  function _n(l, t, e, a) {
    Ut[Oa++] = l, Ut[Oa++] = t, Ut[Oa++] = e, Ut[Oa++] = a, Pi |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
  }
  function lc(l, t, e, a) {
    return _n(l, t, e, a), Tn(l);
  }
  function Ie(l, t) {
    return _n(l, null, null, t), Tn(l);
  }
  function oo(l, t, e) {
    l.lanes |= e;
    var a = l.alternate;
    a !== null && (a.lanes |= e);
    for (var u = !1, n = l.return; n !== null; )
      n.childLanes |= e, a = n.alternate, a !== null && (a.childLanes |= e), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (u = !0)), l = n, n = n.return;
    return l.tag === 3 ? (n = l.stateNode, u && t !== null && (u = 31 - Et(e), l = n.hiddenUpdates, a = l[u], a === null ? l[u] = [t] : a.push(t), t.lane = e | 536870912), n) : null;
  }
  function Tn(l) {
    if (50 < Yu)
      throw Yu = 0, of = null, Error(o(185));
    for (var t = l.return; t !== null; )
      l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var Da = {};
  function e0(l, t, e, a) {
    this.tag = l, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Tt(l, t, e, a) {
    return new e0(l, t, e, a);
  }
  function tc(l) {
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
  function ro(l, t) {
    l.flags &= 65011714;
    var e = l.alternate;
    return e === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, l.type = e.type, t = e.dependencies, l.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), l;
  }
  function zn(l, t, e, a, u, n) {
    var i = 0;
    if (a = l, typeof l == "function") tc(l) && (i = 1);
    else if (typeof l == "string")
      i = ch(
        l,
        e,
        j.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      l: switch (l) {
        case sl:
          return l = Tt(31, e, t, u), l.elementType = sl, l.lanes = n, l;
        case k:
          return Pe(e.children, u, n, t);
        case vl:
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
            o(130, l === null ? "null" : typeof l, "")
          ), a = null;
      }
    return t = Tt(i, e, t, u), t.elementType = l, t.type = a, t.lanes = n, t;
  }
  function Pe(l, t, e, a) {
    return l = Tt(7, l, a, t), l.lanes = e, l;
  }
  function ec(l, t, e) {
    return l = Tt(6, l, null, t), l.lanes = e, l;
  }
  function mo(l) {
    var t = Tt(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function ac(l, t, e) {
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
  var vo = /* @__PURE__ */ new WeakMap();
  function xt(l, t) {
    if (typeof l == "object" && l !== null) {
      var e = vo.get(l);
      return e !== void 0 ? e : (t = {
        value: l,
        source: t,
        stack: Nl(t)
      }, vo.set(l, t), t);
    }
    return {
      value: l,
      source: t,
      stack: Nl(t)
    };
  }
  var Ma = [], Na = 0, pn = null, gu = 0, jt = [], Ct = 0, be = null, Vt = 1, Zt = "";
  function It(l, t) {
    Ma[Na++] = gu, Ma[Na++] = pn, pn = l, gu = t;
  }
  function ho(l, t, e) {
    jt[Ct++] = Vt, jt[Ct++] = Zt, jt[Ct++] = be, be = l;
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
  function uc(l) {
    l.return !== null && (It(l, 1), ho(l, 1, 0));
  }
  function nc(l) {
    for (; l === pn; )
      pn = Ma[--Na], Ma[Na] = null, gu = Ma[--Na], Ma[Na] = null;
    for (; l === be; )
      be = jt[--Ct], jt[Ct] = null, Zt = jt[--Ct], jt[Ct] = null, Vt = jt[--Ct], jt[Ct] = null;
  }
  function yo(l, t) {
    jt[Ct++] = Vt, jt[Ct++] = Zt, jt[Ct++] = be, Vt = t.id, Zt = t.overflow, be = l;
  }
  var Pl = null, Dl = null, nl = !1, Ee = null, Ht = !1, ic = Error(o(519));
  function _e(l) {
    var t = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Su(xt(t, l)), ic;
  }
  function go(l) {
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
        tl("invalid", t), Ns(
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
        tl("invalid", t), Us(t, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || t.textContent === "" + e || a.suppressHydrationWarning === !0 || Cr(t.textContent, e) ? (a.popover != null && (tl("beforetoggle", t), tl("toggle", t)), a.onScroll != null && tl("scroll", t), a.onScrollEnd != null && tl("scrollend", t), a.onClick != null && (t.onclick = $t), t = !0) : t = !1, t || _e(l, !0);
  }
  function So(l) {
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
    if (!nl) return So(l), nl = !0, !1;
    var t = l.tag, e;
    if ((e = t !== 3 && t !== 27) && ((e = t === 5) && (e = l.type, e = !(e !== "form" && e !== "button") || Af(l.type, l.memoizedProps)), e = !e), e && Dl && _e(l), So(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(317));
      Dl = Zr(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(317));
      Dl = Zr(l);
    } else
      t === 27 ? (t = Dl, He(l.type) ? (l = Rf, Rf = null, Dl = l) : Dl = t) : Dl = Pl ? Bt(l.stateNode.nextSibling) : null;
    return !0;
  }
  function la() {
    Dl = Pl = null, nl = !1;
  }
  function cc() {
    var l = Ee;
    return l !== null && (ht === null ? ht = l : ht.push.apply(
      ht,
      l
    ), Ee = null), l;
  }
  function Su(l) {
    Ee === null ? Ee = [l] : Ee.push(l);
  }
  var fc = r(null), ta = null, Pt = null;
  function Te(l, t, e) {
    N(fc, t._currentValue), t._currentValue = e;
  }
  function le(l) {
    l._currentValue = fc.current, p(fc);
  }
  function sc(l, t, e) {
    for (; l !== null; ) {
      var a = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === e) break;
      l = l.return;
    }
  }
  function oc(l, t, e, a) {
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
              n.lanes |= e, c = n.alternate, c !== null && (c.lanes |= e), sc(
                n.return,
                e,
                l
              ), a || (i = null);
              break l;
            }
          n = c.next;
        }
      } else if (u.tag === 18) {
        if (i = u.return, i === null) throw Error(o(341));
        i.lanes |= e, n = i.alternate, n !== null && (n.lanes |= e), sc(i, e, l), i = null;
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
        if (i === null) throw Error(o(387));
        if (i = i.memoizedProps, i !== null) {
          var c = u.type;
          _t(u.pendingProps.value, i.value) || (l !== null ? l.push(c) : l = [c]);
        }
      } else if (u === P.current) {
        if (i = u.alternate, i === null) throw Error(o(387));
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState && (l !== null ? l.push(Ku) : l = [Ku]);
      }
      u = u.return;
    }
    l !== null && oc(
      t,
      l,
      e,
      a
    ), t.flags |= 262144;
  }
  function An(l) {
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
    return bo(ta, l);
  }
  function On(l, t) {
    return ta === null && ea(l), bo(l, t);
  }
  function bo(l, t) {
    var e = t._currentValue;
    if (t = { context: t, memoizedValue: e, next: null }, Pt === null) {
      if (l === null) throw Error(o(308));
      Pt = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
    } else Pt = Pt.next = t;
    return e;
  }
  var a0 = typeof AbortController < "u" ? AbortController : function() {
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
  }, u0 = f.unstable_scheduleCallback, n0 = f.unstable_NormalPriority, Ll = {
    $$typeof: Ul,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function dc() {
    return {
      controller: new a0(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function bu(l) {
    l.refCount--, l.refCount === 0 && u0(n0, function() {
      l.controller.abort();
    });
  }
  var Eu = null, rc = 0, xa = 0, ja = null;
  function i0(l, t) {
    if (Eu === null) {
      var e = Eu = [];
      rc = 0, xa = yf(), ja = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return rc++, t.then(Eo, Eo), t;
  }
  function Eo() {
    if (--rc === 0 && Eu !== null) {
      ja !== null && (ja.status = "fulfilled");
      var l = Eu;
      Eu = null, xa = 0, ja = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function c0(l, t) {
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
  var _o = S.S;
  S.S = function(l, t) {
    ur = Ol(), typeof t == "object" && t !== null && typeof t.then == "function" && i0(l, t), _o !== null && _o(l, t);
  };
  var aa = r(null);
  function mc() {
    var l = aa.current;
    return l !== null ? l : Tl.pooledCache;
  }
  function Dn(l, t) {
    t === null ? N(aa, aa.current) : N(aa, t.pool);
  }
  function To() {
    var l = mc();
    return l === null ? null : { parent: Ll._currentValue, pool: l };
  }
  var Ca = Error(o(460)), vc = Error(o(474)), Mn = Error(o(542)), Nn = { then: function() {
  } };
  function zo(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function po(l, t, e) {
    switch (e = l[e], e === void 0 ? l.push(t) : e !== t && (t.then($t, $t), t = e), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, Oo(l), l;
      default:
        if (typeof t.status == "string") t.then($t, $t);
        else {
          if (l = Tl, l !== null && 100 < l.shellSuspendCounter)
            throw Error(o(482));
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
            throw l = t.reason, Oo(l), l;
        }
        throw na = t, Ca;
    }
  }
  function ua(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (na = e, Ca) : e;
    }
  }
  var na = null;
  function Ao() {
    if (na === null) throw Error(o(459));
    var l = na;
    return na = null, l;
  }
  function Oo(l) {
    if (l === Ca || l === Mn)
      throw Error(o(483));
  }
  var Ha = null, _u = 0;
  function Rn(l) {
    var t = _u;
    return _u += 1, Ha === null && (Ha = []), po(Ha, l, t);
  }
  function Tu(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function Un(l, t) {
    throw t.$$typeof === q ? Error(o(525)) : (l = Object.prototype.toString.call(t), Error(
      o(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
      )
    ));
  }
  function Do(l) {
    function t(m, d) {
      if (l) {
        var v = m.deletions;
        v === null ? (m.deletions = [d], m.flags |= 16) : v.push(d);
      }
    }
    function e(m, d) {
      if (!l) return null;
      for (; d !== null; )
        t(m, d), d = d.sibling;
      return null;
    }
    function a(m) {
      for (var d = /* @__PURE__ */ new Map(); m !== null; )
        m.key !== null ? d.set(m.key, m) : d.set(m.index, m), m = m.sibling;
      return d;
    }
    function u(m, d) {
      return m = kt(m, d), m.index = 0, m.sibling = null, m;
    }
    function n(m, d, v) {
      return m.index = v, l ? (v = m.alternate, v !== null ? (v = v.index, v < d ? (m.flags |= 67108866, d) : v) : (m.flags |= 67108866, d)) : (m.flags |= 1048576, d);
    }
    function i(m) {
      return l && m.alternate === null && (m.flags |= 67108866), m;
    }
    function c(m, d, v, z) {
      return d === null || d.tag !== 6 ? (d = ec(v, m.mode, z), d.return = m, d) : (d = u(d, v), d.return = m, d);
    }
    function s(m, d, v, z) {
      var X = v.type;
      return X === k ? E(
        m,
        d,
        v.props.children,
        z,
        v.key
      ) : d !== null && (d.elementType === X || typeof X == "object" && X !== null && X.$$typeof === ql && ua(X) === d.type) ? (d = u(d, v.props), Tu(d, v), d.return = m, d) : (d = zn(
        v.type,
        v.key,
        v.props,
        null,
        m.mode,
        z
      ), Tu(d, v), d.return = m, d);
    }
    function h(m, d, v, z) {
      return d === null || d.tag !== 4 || d.stateNode.containerInfo !== v.containerInfo || d.stateNode.implementation !== v.implementation ? (d = ac(v, m.mode, z), d.return = m, d) : (d = u(d, v.children || []), d.return = m, d);
    }
    function E(m, d, v, z, X) {
      return d === null || d.tag !== 7 ? (d = Pe(
        v,
        m.mode,
        z,
        X
      ), d.return = m, d) : (d = u(d, v), d.return = m, d);
    }
    function O(m, d, v) {
      if (typeof d == "string" && d !== "" || typeof d == "number" || typeof d == "bigint")
        return d = ec(
          "" + d,
          m.mode,
          v
        ), d.return = m, d;
      if (typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case $:
            return v = zn(
              d.type,
              d.key,
              d.props,
              null,
              m.mode,
              v
            ), Tu(v, d), v.return = m, v;
          case il:
            return d = ac(
              d,
              m.mode,
              v
            ), d.return = m, d;
          case ql:
            return d = ua(d), O(m, d, v);
        }
        if ($l(d) || Yl(d))
          return d = Pe(
            d,
            m.mode,
            v,
            null
          ), d.return = m, d;
        if (typeof d.then == "function")
          return O(m, Rn(d), v);
        if (d.$$typeof === Ul)
          return O(
            m,
            On(m, d),
            v
          );
        Un(m, d);
      }
      return null;
    }
    function y(m, d, v, z) {
      var X = d !== null ? d.key : null;
      if (typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint")
        return X !== null ? null : c(m, d, "" + v, z);
      if (typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case $:
            return v.key === X ? s(m, d, v, z) : null;
          case il:
            return v.key === X ? h(m, d, v, z) : null;
          case ql:
            return v = ua(v), y(m, d, v, z);
        }
        if ($l(v) || Yl(v))
          return X !== null ? null : E(m, d, v, z, null);
        if (typeof v.then == "function")
          return y(
            m,
            d,
            Rn(v),
            z
          );
        if (v.$$typeof === Ul)
          return y(
            m,
            d,
            On(m, v),
            z
          );
        Un(m, v);
      }
      return null;
    }
    function g(m, d, v, z, X) {
      if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
        return m = m.get(v) || null, c(d, m, "" + z, X);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case $:
            return m = m.get(
              z.key === null ? v : z.key
            ) || null, s(d, m, z, X);
          case il:
            return m = m.get(
              z.key === null ? v : z.key
            ) || null, h(d, m, z, X);
          case ql:
            return z = ua(z), g(
              m,
              d,
              v,
              z,
              X
            );
        }
        if ($l(z) || Yl(z))
          return m = m.get(v) || null, E(d, m, z, X, null);
        if (typeof z.then == "function")
          return g(
            m,
            d,
            v,
            Rn(z),
            X
          );
        if (z.$$typeof === Ul)
          return g(
            m,
            d,
            v,
            On(d, z),
            X
          );
        Un(d, z);
      }
      return null;
    }
    function H(m, d, v, z) {
      for (var X = null, ol = null, Y = d, F = d = 0, al = null; Y !== null && F < v.length; F++) {
        Y.index > F ? (al = Y, Y = null) : al = Y.sibling;
        var dl = y(
          m,
          Y,
          v[F],
          z
        );
        if (dl === null) {
          Y === null && (Y = al);
          break;
        }
        l && Y && dl.alternate === null && t(m, Y), d = n(dl, d, F), ol === null ? X = dl : ol.sibling = dl, ol = dl, Y = al;
      }
      if (F === v.length)
        return e(m, Y), nl && It(m, F), X;
      if (Y === null) {
        for (; F < v.length; F++)
          Y = O(m, v[F], z), Y !== null && (d = n(
            Y,
            d,
            F
          ), ol === null ? X = Y : ol.sibling = Y, ol = Y);
        return nl && It(m, F), X;
      }
      for (Y = a(Y); F < v.length; F++)
        al = g(
          Y,
          m,
          F,
          v[F],
          z
        ), al !== null && (l && al.alternate !== null && Y.delete(
          al.key === null ? F : al.key
        ), d = n(
          al,
          d,
          F
        ), ol === null ? X = al : ol.sibling = al, ol = al);
      return l && Y.forEach(function(Xe) {
        return t(m, Xe);
      }), nl && It(m, F), X;
    }
    function Z(m, d, v, z) {
      if (v == null) throw Error(o(151));
      for (var X = null, ol = null, Y = d, F = d = 0, al = null, dl = v.next(); Y !== null && !dl.done; F++, dl = v.next()) {
        Y.index > F ? (al = Y, Y = null) : al = Y.sibling;
        var Xe = y(m, Y, dl.value, z);
        if (Xe === null) {
          Y === null && (Y = al);
          break;
        }
        l && Y && Xe.alternate === null && t(m, Y), d = n(Xe, d, F), ol === null ? X = Xe : ol.sibling = Xe, ol = Xe, Y = al;
      }
      if (dl.done)
        return e(m, Y), nl && It(m, F), X;
      if (Y === null) {
        for (; !dl.done; F++, dl = v.next())
          dl = O(m, dl.value, z), dl !== null && (d = n(dl, d, F), ol === null ? X = dl : ol.sibling = dl, ol = dl);
        return nl && It(m, F), X;
      }
      for (Y = a(Y); !dl.done; F++, dl = v.next())
        dl = g(Y, m, F, dl.value, z), dl !== null && (l && dl.alternate !== null && Y.delete(dl.key === null ? F : dl.key), d = n(dl, d, F), ol === null ? X = dl : ol.sibling = dl, ol = dl);
      return l && Y.forEach(function(Sh) {
        return t(m, Sh);
      }), nl && It(m, F), X;
    }
    function _l(m, d, v, z) {
      if (typeof v == "object" && v !== null && v.type === k && v.key === null && (v = v.props.children), typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case $:
            l: {
              for (var X = v.key; d !== null; ) {
                if (d.key === X) {
                  if (X = v.type, X === k) {
                    if (d.tag === 7) {
                      e(
                        m,
                        d.sibling
                      ), z = u(
                        d,
                        v.props.children
                      ), z.return = m, m = z;
                      break l;
                    }
                  } else if (d.elementType === X || typeof X == "object" && X !== null && X.$$typeof === ql && ua(X) === d.type) {
                    e(
                      m,
                      d.sibling
                    ), z = u(d, v.props), Tu(z, v), z.return = m, m = z;
                    break l;
                  }
                  e(m, d);
                  break;
                } else t(m, d);
                d = d.sibling;
              }
              v.type === k ? (z = Pe(
                v.props.children,
                m.mode,
                z,
                v.key
              ), z.return = m, m = z) : (z = zn(
                v.type,
                v.key,
                v.props,
                null,
                m.mode,
                z
              ), Tu(z, v), z.return = m, m = z);
            }
            return i(m);
          case il:
            l: {
              for (X = v.key; d !== null; ) {
                if (d.key === X)
                  if (d.tag === 4 && d.stateNode.containerInfo === v.containerInfo && d.stateNode.implementation === v.implementation) {
                    e(
                      m,
                      d.sibling
                    ), z = u(d, v.children || []), z.return = m, m = z;
                    break l;
                  } else {
                    e(m, d);
                    break;
                  }
                else t(m, d);
                d = d.sibling;
              }
              z = ac(v, m.mode, z), z.return = m, m = z;
            }
            return i(m);
          case ql:
            return v = ua(v), _l(
              m,
              d,
              v,
              z
            );
        }
        if ($l(v))
          return H(
            m,
            d,
            v,
            z
          );
        if (Yl(v)) {
          if (X = Yl(v), typeof X != "function") throw Error(o(150));
          return v = X.call(v), Z(
            m,
            d,
            v,
            z
          );
        }
        if (typeof v.then == "function")
          return _l(
            m,
            d,
            Rn(v),
            z
          );
        if (v.$$typeof === Ul)
          return _l(
            m,
            d,
            On(m, v),
            z
          );
        Un(m, v);
      }
      return typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint" ? (v = "" + v, d !== null && d.tag === 6 ? (e(m, d.sibling), z = u(d, v), z.return = m, m = z) : (e(m, d), z = ec(v, m.mode, z), z.return = m, m = z), i(m)) : e(m, d);
    }
    return function(m, d, v, z) {
      try {
        _u = 0;
        var X = _l(
          m,
          d,
          v,
          z
        );
        return Ha = null, X;
      } catch (Y) {
        if (Y === Ca || Y === Mn) throw Y;
        var ol = Tt(29, Y, null, m.mode);
        return ol.lanes = z, ol.return = m, ol;
      } finally {
      }
    };
  }
  var ia = Do(!0), Mo = Do(!1), ze = !1;
  function hc(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function yc(l, t) {
    l = l.updateQueue, t.updateQueue === l && (t.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function pe(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function Ae(l, t, e) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (ml & 2) !== 0) {
      var u = a.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), a.pending = t, t = Tn(l), oo(l, null, e), t;
    }
    return _n(l, a, t, e), Tn(l);
  }
  function zu(l, t, e) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (e & 4194048) !== 0)) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, Ss(l, e);
    }
  }
  function gc(l, t) {
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
  var Sc = !1;
  function pu() {
    if (Sc) {
      var l = ja;
      if (l !== null) throw l;
    }
  }
  function Au(l, t, e, a) {
    Sc = !1;
    var u = l.updateQueue;
    ze = !1;
    var n = u.firstBaseUpdate, i = u.lastBaseUpdate, c = u.shared.pending;
    if (c !== null) {
      u.shared.pending = null;
      var s = c, h = s.next;
      s.next = null, i === null ? n = h : i.next = h, i = s;
      var E = l.alternate;
      E !== null && (E = E.updateQueue, c = E.lastBaseUpdate, c !== i && (c === null ? E.firstBaseUpdate = h : c.next = h, E.lastBaseUpdate = s));
    }
    if (n !== null) {
      var O = u.baseState;
      i = 0, E = h = s = null, c = n;
      do {
        var y = c.lane & -536870913, g = y !== c.lane;
        if (g ? (el & y) === y : (a & y) === y) {
          y !== 0 && y === xa && (Sc = !0), E !== null && (E = E.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          l: {
            var H = l, Z = c;
            y = t;
            var _l = e;
            switch (Z.tag) {
              case 1:
                if (H = Z.payload, typeof H == "function") {
                  O = H.call(_l, O, y);
                  break l;
                }
                O = H;
                break l;
              case 3:
                H.flags = H.flags & -65537 | 128;
              case 0:
                if (H = Z.payload, y = typeof H == "function" ? H.call(_l, O, y) : H, y == null) break l;
                O = D({}, O, y);
                break l;
              case 2:
                ze = !0;
            }
          }
          y = c.callback, y !== null && (l.flags |= 64, g && (l.flags |= 8192), g = u.callbacks, g === null ? u.callbacks = [y] : g.push(y));
        } else
          g = {
            lane: y,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null
          }, E === null ? (h = E = g, s = O) : E = E.next = g, i |= y;
        if (c = c.next, c === null) {
          if (c = u.shared.pending, c === null)
            break;
          g = c, c = g.next, g.next = null, u.lastBaseUpdate = g, u.shared.pending = null;
        }
      } while (!0);
      E === null && (s = O), u.baseState = s, u.firstBaseUpdate = h, u.lastBaseUpdate = E, n === null && (u.shared.lanes = 0), Re |= i, l.lanes = i, l.memoizedState = O;
    }
  }
  function No(l, t) {
    if (typeof l != "function")
      throw Error(o(191, l));
    l.call(t);
  }
  function Ro(l, t) {
    var e = l.callbacks;
    if (e !== null)
      for (l.callbacks = null, l = 0; l < e.length; l++)
        No(e[l], t);
  }
  var qa = r(null), xn = r(0);
  function Uo(l, t) {
    l = se, N(xn, l), N(qa, t), se = l | t.baseLanes;
  }
  function bc() {
    N(xn, se), N(qa, qa.current);
  }
  function Ec() {
    se = xn.current, p(qa), p(xn);
  }
  var zt = r(null), qt = null;
  function Oe(l) {
    var t = l.alternate;
    N(Vl, Vl.current & 1), N(zt, l), qt === null && (t === null || qa.current !== null || t.memoizedState !== null) && (qt = l);
  }
  function _c(l) {
    N(Vl, Vl.current), N(zt, l), qt === null && (qt = l);
  }
  function xo(l) {
    l.tag === 22 ? (N(Vl, Vl.current), N(zt, l), qt === null && (qt = l)) : De();
  }
  function De() {
    N(Vl, Vl.current), N(zt, zt.current);
  }
  function pt(l) {
    p(zt), qt === l && (qt = null), p(Vl);
  }
  var Vl = r(0);
  function jn(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || Mf(e) || Nf(e)))
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
  var te = 0, W = null, bl = null, Kl = null, Cn = !1, Ba = !1, ca = !1, Hn = 0, Ou = 0, Ya = null, f0 = 0;
  function jl() {
    throw Error(o(321));
  }
  function Tc(l, t) {
    if (t === null) return !1;
    for (var e = 0; e < t.length && e < l.length; e++)
      if (!_t(l[e], t[e])) return !1;
    return !0;
  }
  function zc(l, t, e, a, u, n) {
    return te = n, W = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, S.H = l === null || l.memoizedState === null ? hd : Yc, ca = !1, n = e(a, u), ca = !1, Ba && (n = Co(
      t,
      e,
      a,
      u
    )), jo(l), n;
  }
  function jo(l) {
    S.H = Nu;
    var t = bl !== null && bl.next !== null;
    if (te = 0, Kl = bl = W = null, Cn = !1, Ou = 0, Ya = null, t) throw Error(o(300));
    l === null || Jl || (l = l.dependencies, l !== null && An(l) && (Jl = !0));
  }
  function Co(l, t, e, a) {
    W = l;
    var u = 0;
    do {
      if (Ba && (Ya = null), Ou = 0, Ba = !1, 25 <= u) throw Error(o(301));
      if (u += 1, Kl = bl = null, l.updateQueue != null) {
        var n = l.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      S.H = yd, n = t(e, a);
    } while (Ba);
    return n;
  }
  function s0() {
    var l = S.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? Du(t) : t, l = l.useState()[0], (bl !== null ? bl.memoizedState : null) !== l && (W.flags |= 1024), t;
  }
  function pc() {
    var l = Hn !== 0;
    return Hn = 0, l;
  }
  function Ac(l, t, e) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~e;
  }
  function Oc(l) {
    if (Cn) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      Cn = !1;
    }
    te = 0, Kl = bl = W = null, Ba = !1, Ou = Hn = 0, Ya = null;
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
        throw W.alternate === null ? Error(o(467)) : Error(o(310));
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
  function qn() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Du(l) {
    var t = Ou;
    return Ou += 1, Ya === null && (Ya = []), l = po(Ya, l, t), t = W, (Kl === null ? t.memoizedState : Kl.next) === null && (t = t.alternate, S.H = t === null || t.memoizedState === null ? hd : Yc), l;
  }
  function Bn(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Du(l);
      if (l.$$typeof === Ul) return lt(l);
    }
    throw Error(o(438, String(l)));
  }
  function Dc(l) {
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
    if (t == null && (t = { data: [], index: 0 }), e === null && (e = qn(), W.updateQueue = e), e.memoCache = t, e = t.data[t.index], e === void 0)
      for (e = t.data[t.index] = Array(l), a = 0; a < l; a++)
        e[a] = gt;
    return t.index++, e;
  }
  function ee(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function Yn(l) {
    var t = Zl();
    return Mc(t, bl, l);
  }
  function Mc(l, t, e) {
    var a = l.queue;
    if (a === null) throw Error(o(311));
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
      var c = i = null, s = null, h = t, E = !1;
      do {
        var O = h.lane & -536870913;
        if (O !== h.lane ? (el & O) === O : (te & O) === O) {
          var y = h.revertLane;
          if (y === 0)
            s !== null && (s = s.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: h.action,
              hasEagerState: h.hasEagerState,
              eagerState: h.eagerState,
              next: null
            }), O === xa && (E = !0);
          else if ((te & y) === y) {
            h = h.next, y === xa && (E = !0);
            continue;
          } else
            O = {
              lane: 0,
              revertLane: h.revertLane,
              gesture: null,
              action: h.action,
              hasEagerState: h.hasEagerState,
              eagerState: h.eagerState,
              next: null
            }, s === null ? (c = s = O, i = n) : s = s.next = O, W.lanes |= y, Re |= y;
          O = h.action, ca && e(n, O), n = h.hasEagerState ? h.eagerState : e(n, O);
        } else
          y = {
            lane: O,
            revertLane: h.revertLane,
            gesture: h.gesture,
            action: h.action,
            hasEagerState: h.hasEagerState,
            eagerState: h.eagerState,
            next: null
          }, s === null ? (c = s = y, i = n) : s = s.next = y, W.lanes |= O, Re |= O;
        h = h.next;
      } while (h !== null && h !== t);
      if (s === null ? i = n : s.next = c, !_t(n, l.memoizedState) && (Jl = !0, E && (e = ja, e !== null)))
        throw e;
      l.memoizedState = n, l.baseState = i, l.baseQueue = s, a.lastRenderedState = n;
    }
    return u === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function Nc(l) {
    var t = Zl(), e = t.queue;
    if (e === null) throw Error(o(311));
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
  function Ho(l, t, e) {
    var a = W, u = Zl(), n = nl;
    if (n) {
      if (e === void 0) throw Error(o(407));
      e = e();
    } else e = t();
    var i = !_t(
      (bl || u).memoizedState,
      e
    );
    if (i && (u.memoizedState = e, Jl = !0), u = u.queue, xc(Yo.bind(null, a, u, l), [
      l
    ]), u.getSnapshot !== t || i || Kl !== null && Kl.memoizedState.tag & 1) {
      if (a.flags |= 2048, Ga(
        9,
        { destroy: void 0 },
        Bo.bind(
          null,
          a,
          u,
          e,
          t
        ),
        null
      ), Tl === null) throw Error(o(349));
      n || (te & 127) !== 0 || qo(a, t, e);
    }
    return e;
  }
  function qo(l, t, e) {
    l.flags |= 16384, l = { getSnapshot: t, value: e }, t = W.updateQueue, t === null ? (t = qn(), W.updateQueue = t, t.stores = [l]) : (e = t.stores, e === null ? t.stores = [l] : e.push(l));
  }
  function Bo(l, t, e, a) {
    t.value = e, t.getSnapshot = a, Go(t) && Xo(l);
  }
  function Yo(l, t, e) {
    return e(function() {
      Go(t) && Xo(l);
    });
  }
  function Go(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var e = t();
      return !_t(l, e);
    } catch {
      return !0;
    }
  }
  function Xo(l) {
    var t = Ie(l, 2);
    t !== null && yt(t, l, 2);
  }
  function Rc(l) {
    var t = it();
    if (typeof l == "function") {
      var e = l;
      if (l = e(), ca) {
        ye(!0);
        try {
          e();
        } finally {
          ye(!1);
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
  function Qo(l, t, e, a) {
    return l.baseState = e, Mc(
      l,
      bl,
      typeof a == "function" ? a : ee
    );
  }
  function o0(l, t, e, a, u) {
    if (Qn(l)) throw Error(o(485));
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
      S.T !== null ? e(!0) : n.isTransition = !1, a(n), e = t.pending, e === null ? (n.next = t.pending = n, Vo(t, n)) : (n.next = e.next, t.pending = e.next = n);
    }
  }
  function Vo(l, t) {
    var e = t.action, a = t.payload, u = l.state;
    if (t.isTransition) {
      var n = S.T, i = {};
      S.T = i;
      try {
        var c = e(u, a), s = S.S;
        s !== null && s(i, c), Zo(l, t, c);
      } catch (h) {
        Uc(l, t, h);
      } finally {
        n !== null && i.types !== null && (n.types = i.types), S.T = n;
      }
    } else
      try {
        n = e(u, a), Zo(l, t, n);
      } catch (h) {
        Uc(l, t, h);
      }
  }
  function Zo(l, t, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        Lo(l, t, a);
      },
      function(a) {
        return Uc(l, t, a);
      }
    ) : Lo(l, t, e);
  }
  function Lo(l, t, e) {
    t.status = "fulfilled", t.value = e, Ko(t), l.state = e, t = l.pending, t !== null && (e = t.next, e === t ? l.pending = null : (e = e.next, t.next = e, Vo(l, e)));
  }
  function Uc(l, t, e) {
    var a = l.pending;
    if (l.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = e, Ko(t), t = t.next;
      while (t !== a);
    }
    l.action = null;
  }
  function Ko(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function Jo(l, t) {
    return t;
  }
  function wo(l, t) {
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
      lastRenderedReducer: Jo,
      lastRenderedState: t
    }, e.queue = a, e = rd.bind(
      null,
      W,
      a
    ), a.dispatch = e, a = Rc(!1), n = Bc.bind(
      null,
      W,
      !1,
      a.queue
    ), a = it(), u = {
      state: t,
      dispatch: null,
      action: l,
      pending: null
    }, a.queue = u, e = o0.bind(
      null,
      W,
      u,
      n,
      e
    ), u.dispatch = e, a.memoizedState = l, [t, e, !1];
  }
  function Wo(l) {
    var t = Zl();
    return $o(t, bl, l);
  }
  function $o(l, t, e) {
    if (t = Mc(
      l,
      t,
      Jo
    )[0], l = Yn(ee)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = Du(t);
      } catch (i) {
        throw i === Ca ? Mn : i;
      }
    else a = t;
    t = Zl();
    var u = t.queue, n = u.dispatch;
    return e !== t.memoizedState && (W.flags |= 2048, Ga(
      9,
      { destroy: void 0 },
      d0.bind(null, u, e),
      null
    )), [a, n, l];
  }
  function d0(l, t) {
    l.action = t;
  }
  function Fo(l) {
    var t = Zl(), e = bl;
    if (e !== null)
      return $o(t, e, l);
    Zl(), t = t.memoizedState, e = Zl();
    var a = e.queue.dispatch;
    return e.memoizedState = l, [t, a, !1];
  }
  function Ga(l, t, e, a) {
    return l = { tag: l, create: e, deps: a, inst: t, next: null }, t = W.updateQueue, t === null && (t = qn(), W.updateQueue = t), e = t.lastEffect, e === null ? t.lastEffect = l.next = l : (a = e.next, e.next = l, l.next = a, t.lastEffect = l), l;
  }
  function ko() {
    return Zl().memoizedState;
  }
  function Gn(l, t, e, a) {
    var u = it();
    W.flags |= l, u.memoizedState = Ga(
      1 | t,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function Xn(l, t, e, a) {
    var u = Zl();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    bl !== null && a !== null && Tc(a, bl.memoizedState.deps) ? u.memoizedState = Ga(t, n, e, a) : (W.flags |= l, u.memoizedState = Ga(
      1 | t,
      n,
      e,
      a
    ));
  }
  function Io(l, t) {
    Gn(8390656, 8, l, t);
  }
  function xc(l, t) {
    Xn(2048, 8, l, t);
  }
  function r0(l) {
    W.flags |= 4;
    var t = W.updateQueue;
    if (t === null)
      t = qn(), W.updateQueue = t, t.events = [l];
    else {
      var e = t.events;
      e === null ? t.events = [l] : e.push(l);
    }
  }
  function Po(l) {
    var t = Zl().memoizedState;
    return r0({ ref: t, nextImpl: l }), function() {
      if ((ml & 2) !== 0) throw Error(o(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function ld(l, t) {
    return Xn(4, 2, l, t);
  }
  function td(l, t) {
    return Xn(4, 4, l, t);
  }
  function ed(l, t) {
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
  function ad(l, t, e) {
    e = e != null ? e.concat([l]) : null, Xn(4, 4, ed.bind(null, t, l), e);
  }
  function jc() {
  }
  function ud(l, t) {
    var e = Zl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    return t !== null && Tc(t, a[1]) ? a[0] : (e.memoizedState = [l, t], l);
  }
  function nd(l, t) {
    var e = Zl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    if (t !== null && Tc(t, a[1]))
      return a[0];
    if (a = l(), ca) {
      ye(!0);
      try {
        l();
      } finally {
        ye(!1);
      }
    }
    return e.memoizedState = [a, t], a;
  }
  function Cc(l, t, e) {
    return e === void 0 || (te & 1073741824) !== 0 && (el & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = e, l = ir(), W.lanes |= l, Re |= l, e);
  }
  function id(l, t, e, a) {
    return _t(e, t) ? e : qa.current !== null ? (l = Cc(l, e, a), _t(l, t) || (Jl = !0), l) : (te & 42) === 0 || (te & 1073741824) !== 0 && (el & 261930) === 0 ? (Jl = !0, l.memoizedState = e) : (l = ir(), W.lanes |= l, Re |= l, t);
  }
  function cd(l, t, e, a, u) {
    var n = R.p;
    R.p = n !== 0 && 8 > n ? n : 8;
    var i = S.T, c = {};
    S.T = c, Bc(l, !1, t, e);
    try {
      var s = u(), h = S.S;
      if (h !== null && h(c, s), s !== null && typeof s == "object" && typeof s.then == "function") {
        var E = c0(
          s,
          a
        );
        Mu(
          l,
          t,
          E,
          Dt(l)
        );
      } else
        Mu(
          l,
          t,
          a,
          Dt(l)
        );
    } catch (O) {
      Mu(
        l,
        t,
        { then: function() {
        }, status: "rejected", reason: O },
        Dt()
      );
    } finally {
      R.p = n, i !== null && c.types !== null && (i.types = c.types), S.T = i;
    }
  }
  function m0() {
  }
  function Hc(l, t, e, a) {
    if (l.tag !== 5) throw Error(o(476));
    var u = fd(l).queue;
    cd(
      l,
      u,
      t,
      Q,
      e === null ? m0 : function() {
        return sd(l), e(a);
      }
    );
  }
  function fd(l) {
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
  function sd(l) {
    var t = fd(l);
    t.next === null && (t = l.alternate.memoizedState), Mu(
      l,
      t.next.queue,
      {},
      Dt()
    );
  }
  function qc() {
    return lt(Ku);
  }
  function od() {
    return Zl().memoizedState;
  }
  function dd() {
    return Zl().memoizedState;
  }
  function v0(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var e = Dt();
          l = pe(e);
          var a = Ae(t, l, e);
          a !== null && (yt(a, t, e), zu(a, t, e)), t = { cache: dc() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function h0(l, t, e) {
    var a = Dt();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Qn(l) ? md(t, e) : (e = lc(l, t, e, a), e !== null && (yt(e, l, a), vd(e, t, a)));
  }
  function rd(l, t, e) {
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
    if (Qn(l)) md(t, u);
    else {
      var n = l.alternate;
      if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null))
        try {
          var i = t.lastRenderedState, c = n(i, e);
          if (u.hasEagerState = !0, u.eagerState = c, _t(c, i))
            return _n(l, t, u, 0), Tl === null && En(), !1;
        } catch {
        } finally {
        }
      if (e = lc(l, t, u, a), e !== null)
        return yt(e, l, a), vd(e, t, a), !0;
    }
    return !1;
  }
  function Bc(l, t, e, a) {
    if (a = {
      lane: 2,
      revertLane: yf(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Qn(l)) {
      if (t) throw Error(o(479));
    } else
      t = lc(
        l,
        e,
        a,
        2
      ), t !== null && yt(t, l, 2);
  }
  function Qn(l) {
    var t = l.alternate;
    return l === W || t !== null && t === W;
  }
  function md(l, t) {
    Ba = Cn = !0;
    var e = l.pending;
    e === null ? t.next = t : (t.next = e.next, e.next = t), l.pending = t;
  }
  function vd(l, t, e) {
    if ((e & 4194048) !== 0) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, Ss(l, e);
    }
  }
  var Nu = {
    readContext: lt,
    use: Bn,
    useCallback: jl,
    useContext: jl,
    useEffect: jl,
    useImperativeHandle: jl,
    useLayoutEffect: jl,
    useInsertionEffect: jl,
    useMemo: jl,
    useReducer: jl,
    useRef: jl,
    useState: jl,
    useDebugValue: jl,
    useDeferredValue: jl,
    useTransition: jl,
    useSyncExternalStore: jl,
    useId: jl,
    useHostTransitionStatus: jl,
    useFormState: jl,
    useActionState: jl,
    useOptimistic: jl,
    useMemoCache: jl,
    useCacheRefresh: jl
  };
  Nu.useEffectEvent = jl;
  var hd = {
    readContext: lt,
    use: Bn,
    useCallback: function(l, t) {
      return it().memoizedState = [
        l,
        t === void 0 ? null : t
      ], l;
    },
    useContext: lt,
    useEffect: Io,
    useImperativeHandle: function(l, t, e) {
      e = e != null ? e.concat([l]) : null, Gn(
        4194308,
        4,
        ed.bind(null, t, l),
        e
      );
    },
    useLayoutEffect: function(l, t) {
      return Gn(4194308, 4, l, t);
    },
    useInsertionEffect: function(l, t) {
      Gn(4, 2, l, t);
    },
    useMemo: function(l, t) {
      var e = it();
      t = t === void 0 ? null : t;
      var a = l();
      if (ca) {
        ye(!0);
        try {
          l();
        } finally {
          ye(!1);
        }
      }
      return e.memoizedState = [a, t], a;
    },
    useReducer: function(l, t, e) {
      var a = it();
      if (e !== void 0) {
        var u = e(t);
        if (ca) {
          ye(!0);
          try {
            e(t);
          } finally {
            ye(!1);
          }
        }
      } else u = t;
      return a.memoizedState = a.baseState = u, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: u
      }, a.queue = l, l = l.dispatch = h0.bind(
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
      l = Rc(l);
      var t = l.queue, e = rd.bind(null, W, t);
      return t.dispatch = e, [l.memoizedState, e];
    },
    useDebugValue: jc,
    useDeferredValue: function(l, t) {
      var e = it();
      return Cc(e, l, t);
    },
    useTransition: function() {
      var l = Rc(!1);
      return l = cd.bind(
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
          throw Error(o(407));
        e = e();
      } else {
        if (e = t(), Tl === null)
          throw Error(o(349));
        (el & 127) !== 0 || qo(a, t, e);
      }
      u.memoizedState = e;
      var n = { value: e, getSnapshot: t };
      return u.queue = n, Io(Yo.bind(null, a, n, l), [
        l
      ]), a.flags |= 2048, Ga(
        9,
        { destroy: void 0 },
        Bo.bind(
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
        e = (a & ~(1 << 32 - Et(a) - 1)).toString(32) + e, t = "_" + t + "R_" + e, e = Hn++, 0 < e && (t += "H" + e.toString(32)), t += "_";
      } else
        e = f0++, t = "_" + t + "r_" + e.toString(32) + "_";
      return l.memoizedState = t;
    },
    useHostTransitionStatus: qc,
    useFormState: wo,
    useActionState: wo,
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
      return t.queue = e, t = Bc.bind(
        null,
        W,
        !0,
        e
      ), e.dispatch = t, [l, t];
    },
    useMemoCache: Dc,
    useCacheRefresh: function() {
      return it().memoizedState = v0.bind(
        null,
        W
      );
    },
    useEffectEvent: function(l) {
      var t = it(), e = { impl: l };
      return t.memoizedState = e, function() {
        if ((ml & 2) !== 0)
          throw Error(o(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, Yc = {
    readContext: lt,
    use: Bn,
    useCallback: ud,
    useContext: lt,
    useEffect: xc,
    useImperativeHandle: ad,
    useInsertionEffect: ld,
    useLayoutEffect: td,
    useMemo: nd,
    useReducer: Yn,
    useRef: ko,
    useState: function() {
      return Yn(ee);
    },
    useDebugValue: jc,
    useDeferredValue: function(l, t) {
      var e = Zl();
      return id(
        e,
        bl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = Yn(ee)[0], t = Zl().memoizedState;
      return [
        typeof l == "boolean" ? l : Du(l),
        t
      ];
    },
    useSyncExternalStore: Ho,
    useId: od,
    useHostTransitionStatus: qc,
    useFormState: Wo,
    useActionState: Wo,
    useOptimistic: function(l, t) {
      var e = Zl();
      return Qo(e, bl, l, t);
    },
    useMemoCache: Dc,
    useCacheRefresh: dd
  };
  Yc.useEffectEvent = Po;
  var yd = {
    readContext: lt,
    use: Bn,
    useCallback: ud,
    useContext: lt,
    useEffect: xc,
    useImperativeHandle: ad,
    useInsertionEffect: ld,
    useLayoutEffect: td,
    useMemo: nd,
    useReducer: Nc,
    useRef: ko,
    useState: function() {
      return Nc(ee);
    },
    useDebugValue: jc,
    useDeferredValue: function(l, t) {
      var e = Zl();
      return bl === null ? Cc(e, l, t) : id(
        e,
        bl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = Nc(ee)[0], t = Zl().memoizedState;
      return [
        typeof l == "boolean" ? l : Du(l),
        t
      ];
    },
    useSyncExternalStore: Ho,
    useId: od,
    useHostTransitionStatus: qc,
    useFormState: Fo,
    useActionState: Fo,
    useOptimistic: function(l, t) {
      var e = Zl();
      return bl !== null ? Qo(e, bl, l, t) : (e.baseState = l, [l, e.queue.dispatch]);
    },
    useMemoCache: Dc,
    useCacheRefresh: dd
  };
  yd.useEffectEvent = Po;
  function Gc(l, t, e, a) {
    t = l.memoizedState, e = e(a, t), e = e == null ? t : D({}, t, e), l.memoizedState = e, l.lanes === 0 && (l.updateQueue.baseState = e);
  }
  var Xc = {
    enqueueSetState: function(l, t, e) {
      l = l._reactInternals;
      var a = Dt(), u = pe(a);
      u.payload = t, e != null && (u.callback = e), t = Ae(l, u, a), t !== null && (yt(t, l, a), zu(t, l, a));
    },
    enqueueReplaceState: function(l, t, e) {
      l = l._reactInternals;
      var a = Dt(), u = pe(a);
      u.tag = 1, u.payload = t, e != null && (u.callback = e), t = Ae(l, u, a), t !== null && (yt(t, l, a), zu(t, l, a));
    },
    enqueueForceUpdate: function(l, t) {
      l = l._reactInternals;
      var e = Dt(), a = pe(e);
      a.tag = 2, t != null && (a.callback = t), t = Ae(l, a, e), t !== null && (yt(t, l, e), zu(t, l, e));
    }
  };
  function gd(l, t, e, a, u, n, i) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, n, i) : t.prototype && t.prototype.isPureReactComponent ? !hu(e, a) || !hu(u, n) : !0;
  }
  function Sd(l, t, e, a) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(e, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(e, a), t.state !== l && Xc.enqueueReplaceState(t, t.state, null);
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
  function bd(l) {
    bn(l);
  }
  function Ed(l) {
    console.error(l);
  }
  function _d(l) {
    bn(l);
  }
  function Vn(l, t) {
    try {
      var e = l.onUncaughtError;
      e(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Td(l, t, e) {
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
  function Qc(l, t, e) {
    return e = pe(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      Vn(l, t);
    }, e;
  }
  function zd(l) {
    return l = pe(l), l.tag = 3, l;
  }
  function pd(l, t, e, a) {
    var u = e.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = a.value;
      l.payload = function() {
        return u(n);
      }, l.callback = function() {
        Td(t, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (l.callback = function() {
      Td(t, e, a), typeof u != "function" && (Ue === null ? Ue = /* @__PURE__ */ new Set([this]) : Ue.add(this));
      var c = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: c !== null ? c : ""
      });
    });
  }
  function y0(l, t, e, a, u) {
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
            return qt === null ? li() : e.alternate === null && Cl === 0 && (Cl = 3), e.flags &= -257, e.flags |= 65536, e.lanes = u, a === Nn ? e.flags |= 16384 : (t = e.updateQueue, t === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), mf(l, a, u)), !1;
          case 22:
            return e.flags |= 65536, a === Nn ? e.flags |= 16384 : (t = e.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = t) : (e = t.retryQueue, e === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), mf(l, a, u)), !1;
        }
        throw Error(o(435, e.tag));
      }
      return mf(l, a, u), li(), !1;
    }
    if (nl)
      return t = zt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, a !== ic && (l = Error(o(422), { cause: a }), Su(xt(l, e)))) : (a !== ic && (t = Error(o(423), {
        cause: a
      }), Su(
        xt(t, e)
      )), l = l.current.alternate, l.flags |= 65536, u &= -u, l.lanes |= u, a = xt(a, e), u = Qc(
        l.stateNode,
        a,
        u
      ), gc(l, u), Cl !== 4 && (Cl = 2)), !1;
    var n = Error(o(520), { cause: a });
    if (n = xt(n, e), Bu === null ? Bu = [n] : Bu.push(n), Cl !== 4 && (Cl = 2), t === null) return !0;
    a = xt(a, e), e = t;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, l = u & -u, e.lanes |= l, l = Qc(e.stateNode, a, l), gc(e, l), !1;
        case 1:
          if (t = e.type, n = e.stateNode, (e.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (Ue === null || !Ue.has(n))))
            return e.flags |= 65536, u &= -u, e.lanes |= u, u = zd(u), pd(
              u,
              l,
              e,
              a
            ), gc(e, u), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var Vc = Error(o(461)), Jl = !1;
  function tt(l, t, e, a) {
    t.child = l === null ? Mo(t, null, e, a) : ia(
      t,
      l.child,
      e,
      a
    );
  }
  function Ad(l, t, e, a, u) {
    e = e.render;
    var n = t.ref;
    if ("ref" in a) {
      var i = {};
      for (var c in a)
        c !== "ref" && (i[c] = a[c]);
    } else i = a;
    return ea(t), a = zc(
      l,
      t,
      e,
      i,
      n,
      u
    ), c = pc(), l !== null && !Jl ? (Ac(l, t, u), ae(l, t, u)) : (nl && c && uc(t), t.flags |= 1, tt(l, t, a, u), t.child);
  }
  function Od(l, t, e, a, u) {
    if (l === null) {
      var n = e.type;
      return typeof n == "function" && !tc(n) && n.defaultProps === void 0 && e.compare === null ? (t.tag = 15, t.type = n, Dd(
        l,
        t,
        n,
        a,
        u
      )) : (l = zn(
        e.type,
        null,
        a,
        t,
        t.mode,
        u
      ), l.ref = t.ref, l.return = t, t.child = l);
    }
    if (n = l.child, !Fc(l, u)) {
      var i = n.memoizedProps;
      if (e = e.compare, e = e !== null ? e : hu, e(i, a) && l.ref === t.ref)
        return ae(l, t, u);
    }
    return t.flags |= 1, l = kt(n, a), l.ref = t.ref, l.return = t, t.child = l;
  }
  function Dd(l, t, e, a, u) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (hu(n, a) && l.ref === t.ref)
        if (Jl = !1, t.pendingProps = a = n, Fc(l, u))
          (l.flags & 131072) !== 0 && (Jl = !0);
        else
          return t.lanes = l.lanes, ae(l, t, u);
    }
    return Zc(
      l,
      t,
      e,
      a,
      u
    );
  }
  function Md(l, t, e, a) {
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
        return Nd(
          l,
          t,
          n,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && Dn(
          t,
          n !== null ? n.cachePool : null
        ), n !== null ? Uo(t, n) : bc(), xo(t);
      else
        return a = t.lanes = 536870912, Nd(
          l,
          t,
          n !== null ? n.baseLanes | e : e,
          e,
          a
        );
    } else
      n !== null ? (Dn(t, n.cachePool), Uo(t, n), De(), t.memoizedState = null) : (l !== null && Dn(t, null), bc(), De());
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
  function Nd(l, t, e, a, u) {
    var n = mc();
    return n = n === null ? null : { parent: Ll._currentValue, pool: n }, t.memoizedState = {
      baseLanes: e,
      cachePool: n
    }, l !== null && Dn(t, null), bc(), xo(t), l !== null && Ua(l, t, a, !0), t.childLanes = u, null;
  }
  function Zn(l, t) {
    return t = Kn(
      { mode: t.mode, children: t.children },
      l.mode
    ), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function Rd(l, t, e) {
    return ia(t, l.child, null, e), l = Zn(t, t.pendingProps), l.flags |= 2, pt(t), t.memoizedState = null, l;
  }
  function g0(l, t, e) {
    var a = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (nl) {
        if (a.mode === "hidden")
          return l = Zn(t, a), t.lanes = 536870912, Ru(null, l);
        if (_c(t), (l = Dl) ? (l = Vr(
          l,
          Ht
        ), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: be !== null ? { id: Vt, overflow: Zt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = mo(l), e.return = t, t.child = e, Pl = t, Dl = null)) : l = null, l === null) throw _e(t);
        return t.lanes = 536870912, null;
      }
      return Zn(t, a);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var i = n.dehydrated;
      if (_c(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = Rd(
            l,
            t,
            e
          );
        else if (t.memoizedState !== null)
          t.child = l.child, t.flags |= 128, t = null;
        else throw Error(o(558));
      else if (Jl || Ua(l, t, e, !1), u = (e & l.childLanes) !== 0, Jl || u) {
        if (a = Tl, a !== null && (i = bs(a, e), i !== 0 && i !== n.retryLane))
          throw n.retryLane = i, Ie(l, i), yt(a, l, i), Vc;
        li(), t = Rd(
          l,
          t,
          e
        );
      } else
        l = n.treeContext, Dl = Bt(i.nextSibling), Pl = t, nl = !0, Ee = null, Ht = !1, l !== null && yo(t, l), t = Zn(t, a), t.flags |= 4096;
      return t;
    }
    return l = kt(l.child, {
      mode: a.mode,
      children: a.children
    }), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function Ln(l, t) {
    var e = t.ref;
    if (e === null)
      l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(o(284));
      (l === null || l.ref !== e) && (t.flags |= 4194816);
    }
  }
  function Zc(l, t, e, a, u) {
    return ea(t), e = zc(
      l,
      t,
      e,
      a,
      void 0,
      u
    ), a = pc(), l !== null && !Jl ? (Ac(l, t, u), ae(l, t, u)) : (nl && a && uc(t), t.flags |= 1, tt(l, t, e, u), t.child);
  }
  function Ud(l, t, e, a, u, n) {
    return ea(t), t.updateQueue = null, e = Co(
      t,
      a,
      e,
      u
    ), jo(l), a = pc(), l !== null && !Jl ? (Ac(l, t, n), ae(l, t, n)) : (nl && a && uc(t), t.flags |= 1, tt(l, t, e, n), t.child);
  }
  function xd(l, t, e, a, u) {
    if (ea(t), t.stateNode === null) {
      var n = Da, i = e.contextType;
      typeof i == "object" && i !== null && (n = lt(i)), n = new e(a, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = Xc, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = a, n.state = t.memoizedState, n.refs = {}, hc(t), i = e.contextType, n.context = typeof i == "object" && i !== null ? lt(i) : Da, n.state = t.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (Gc(
        t,
        e,
        i,
        a
      ), n.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (i = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), i !== n.state && Xc.enqueueReplaceState(n, n.state, null), Au(t, a, n, u), pu(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (l === null) {
      n = t.stateNode;
      var c = t.memoizedProps, s = fa(e, c);
      n.props = s;
      var h = n.context, E = e.contextType;
      i = Da, typeof E == "object" && E !== null && (i = lt(E));
      var O = e.getDerivedStateFromProps;
      E = typeof O == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = t.pendingProps !== c, E || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || h !== i) && Sd(
        t,
        n,
        a,
        i
      ), ze = !1;
      var y = t.memoizedState;
      n.state = y, Au(t, a, n, u), pu(), h = t.memoizedState, c || y !== h || ze ? (typeof O == "function" && (Gc(
        t,
        e,
        O,
        a
      ), h = t.memoizedState), (s = ze || gd(
        t,
        e,
        s,
        a,
        y,
        h,
        i
      )) ? (E || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = h), n.props = a, n.state = h, n.context = i, a = s) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      n = t.stateNode, yc(l, t), i = t.memoizedProps, E = fa(e, i), n.props = E, O = t.pendingProps, y = n.context, h = e.contextType, s = Da, typeof h == "object" && h !== null && (s = lt(h)), c = e.getDerivedStateFromProps, (h = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i !== O || y !== s) && Sd(
        t,
        n,
        a,
        s
      ), ze = !1, y = t.memoizedState, n.state = y, Au(t, a, n, u), pu();
      var g = t.memoizedState;
      i !== O || y !== g || ze || l !== null && l.dependencies !== null && An(l.dependencies) ? (typeof c == "function" && (Gc(
        t,
        e,
        c,
        a
      ), g = t.memoizedState), (E = ze || gd(
        t,
        e,
        E,
        a,
        y,
        g,
        s
      ) || l !== null && l.dependencies !== null && An(l.dependencies)) ? (h || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, g, s), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        a,
        g,
        s
      )), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || i === l.memoizedProps && y === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && y === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = g), n.props = a, n.state = g, n.context = s, a = E) : (typeof n.componentDidUpdate != "function" || i === l.memoizedProps && y === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && y === l.memoizedState || (t.flags |= 1024), a = !1);
    }
    return n = a, Ln(l, t), a = (t.flags & 128) !== 0, n || a ? (n = t.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && a ? (t.child = ia(
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
  function jd(l, t, e, a) {
    return la(), t.flags |= 256, tt(l, t, e, a), t.child;
  }
  var Lc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Kc(l) {
    return { baseLanes: l, cachePool: To() };
  }
  function Jc(l, t, e) {
    return l = l !== null ? l.childLanes & ~e : 0, t && (l |= Ot), l;
  }
  function Cd(l, t, e) {
    var a = t.pendingProps, u = !1, n = (t.flags & 128) !== 0, i;
    if ((i = n) || (i = l !== null && l.memoizedState === null ? !1 : (Vl.current & 2) !== 0), i && (u = !0, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (nl) {
        if (u ? Oe(t) : De(), (l = Dl) ? (l = Vr(
          l,
          Ht
        ), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: be !== null ? { id: Vt, overflow: Zt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = mo(l), e.return = t, t.child = e, Pl = t, Dl = null)) : l = null, l === null) throw _e(t);
        return Nf(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var c = a.children;
      return a = a.fallback, u ? (De(), u = t.mode, c = Kn(
        { mode: "hidden", children: c },
        u
      ), a = Pe(
        a,
        u,
        e,
        null
      ), c.return = t, a.return = t, c.sibling = a, t.child = c, a = t.child, a.memoizedState = Kc(e), a.childLanes = Jc(
        l,
        i,
        e
      ), t.memoizedState = Lc, Ru(null, a)) : (Oe(t), wc(t, c));
    }
    var s = l.memoizedState;
    if (s !== null && (c = s.dehydrated, c !== null)) {
      if (n)
        t.flags & 256 ? (Oe(t), t.flags &= -257, t = Wc(
          l,
          t,
          e
        )) : t.memoizedState !== null ? (De(), t.child = l.child, t.flags |= 128, t = null) : (De(), c = a.fallback, u = t.mode, a = Kn(
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
        ), a = t.child, a.memoizedState = Kc(e), a.childLanes = Jc(
          l,
          i,
          e
        ), t.memoizedState = Lc, t = Ru(null, a));
      else if (Oe(t), Nf(c)) {
        if (i = c.nextSibling && c.nextSibling.dataset, i) var h = i.dgst;
        i = h, a = Error(o(419)), a.stack = "", a.digest = i, Su({ value: a, source: null, stack: null }), t = Wc(
          l,
          t,
          e
        );
      } else if (Jl || Ua(l, t, e, !1), i = (e & l.childLanes) !== 0, Jl || i) {
        if (i = Tl, i !== null && (a = bs(i, e), a !== 0 && a !== s.retryLane))
          throw s.retryLane = a, Ie(l, a), yt(i, l, a), Vc;
        Mf(c) || li(), t = Wc(
          l,
          t,
          e
        );
      } else
        Mf(c) ? (t.flags |= 192, t.child = l.child, t = null) : (l = s.treeContext, Dl = Bt(
          c.nextSibling
        ), Pl = t, nl = !0, Ee = null, Ht = !1, l !== null && yo(t, l), t = wc(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (De(), c = a.fallback, u = t.mode, s = l.child, h = s.sibling, a = kt(s, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = s.subtreeFlags & 65011712, h !== null ? c = kt(
      h,
      c
    ) : (c = Pe(
      c,
      u,
      e,
      null
    ), c.flags |= 2), c.return = t, a.return = t, a.sibling = c, t.child = a, Ru(null, a), a = t.child, c = l.child.memoizedState, c === null ? c = Kc(e) : (u = c.cachePool, u !== null ? (s = Ll._currentValue, u = u.parent !== s ? { parent: s, pool: s } : u) : u = To(), c = {
      baseLanes: c.baseLanes | e,
      cachePool: u
    }), a.memoizedState = c, a.childLanes = Jc(
      l,
      i,
      e
    ), t.memoizedState = Lc, Ru(l.child, a)) : (Oe(t), e = l.child, l = e.sibling, e = kt(e, {
      mode: "visible",
      children: a.children
    }), e.return = t, e.sibling = null, l !== null && (i = t.deletions, i === null ? (t.deletions = [l], t.flags |= 16) : i.push(l)), t.child = e, t.memoizedState = null, e);
  }
  function wc(l, t) {
    return t = Kn(
      { mode: "visible", children: t },
      l.mode
    ), t.return = l, l.child = t;
  }
  function Kn(l, t) {
    return l = Tt(22, l, null, t), l.lanes = 0, l;
  }
  function Wc(l, t, e) {
    return ia(t, l.child, null, e), l = wc(
      t,
      t.pendingProps.children
    ), l.flags |= 2, t.memoizedState = null, l;
  }
  function Hd(l, t, e) {
    l.lanes |= t;
    var a = l.alternate;
    a !== null && (a.lanes |= t), sc(l.return, t, e);
  }
  function $c(l, t, e, a, u, n) {
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
  function qd(l, t, e) {
    var a = t.pendingProps, u = a.revealOrder, n = a.tail;
    a = a.children;
    var i = Vl.current, c = (i & 2) !== 0;
    if (c ? (i = i & 1 | 2, t.flags |= 128) : i &= 1, N(Vl, i), tt(l, t, a, e), a = nl ? gu : 0, !c && l !== null && (l.flags & 128) !== 0)
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && Hd(l, e, t);
        else if (l.tag === 19)
          Hd(l, e, t);
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
          l = e.alternate, l !== null && jn(l) === null && (u = e), e = e.sibling;
        e = u, e === null ? (u = t.child, t.child = null) : (u = e.sibling, e.sibling = null), $c(
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
          if (l = u.alternate, l !== null && jn(l) === null) {
            t.child = u;
            break;
          }
          l = u.sibling, u.sibling = e, e = u, u = l;
        }
        $c(
          t,
          !0,
          e,
          null,
          n,
          a
        );
        break;
      case "together":
        $c(
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
      throw Error(o(153));
    if (t.child !== null) {
      for (l = t.child, e = kt(l, l.pendingProps), t.child = e, e.return = t; l.sibling !== null; )
        l = l.sibling, e = e.sibling = kt(l, l.pendingProps), e.return = t;
      e.sibling = null;
    }
    return t.child;
  }
  function Fc(l, t) {
    return (l.lanes & t) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && An(l)));
  }
  function S0(l, t, e) {
    switch (t.tag) {
      case 3:
        Xl(t, t.stateNode.containerInfo), Te(t, Ll, l.memoizedState.cache), la();
        break;
      case 27:
      case 5:
        ve(t);
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
          return t.flags |= 128, _c(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (Oe(t), t.flags |= 128, null) : (e & t.child.childLanes) !== 0 ? Cd(l, t, e) : (Oe(t), l = ae(
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
            return qd(
              l,
              t,
              e
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), N(Vl, Vl.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, Md(
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
  function Bd(l, t, e) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps)
        Jl = !0;
      else {
        if (!Fc(l, e) && (t.flags & 128) === 0)
          return Jl = !1, S0(
            l,
            t,
            e
          );
        Jl = (l.flags & 131072) !== 0;
      }
    else
      Jl = !1, nl && (t.flags & 1048576) !== 0 && ho(t, gu, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (l = ua(t.elementType), t.type = l, typeof l == "function")
            tc(l) ? (a = fa(l, a), t.tag = 1, t = xd(
              null,
              t,
              l,
              a,
              e
            )) : (t.tag = 0, t = Zc(
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
                t.tag = 11, t = Ad(
                  null,
                  t,
                  l,
                  a,
                  e
                );
                break l;
              } else if (u === L) {
                t.tag = 14, t = Od(
                  null,
                  t,
                  l,
                  a,
                  e
                );
                break l;
              }
            }
            throw t = Gl(l) || l, Error(o(306, t, ""));
          }
        }
        return t;
      case 0:
        return Zc(
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
        ), xd(
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
          ), l === null) throw Error(o(387));
          a = t.pendingProps;
          var n = t.memoizedState;
          u = n.element, yc(l, t), Au(t, a, null, e);
          var i = t.memoizedState;
          if (a = i.cache, Te(t, Ll, a), a !== n.cache && oc(
            t,
            [Ll],
            e,
            !0
          ), pu(), a = i.element, n.isDehydrated)
            if (n = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
              t = jd(
                l,
                t,
                a,
                e
              );
              break l;
            } else if (a !== u) {
              u = xt(
                Error(o(424)),
                t
              ), Su(u), t = jd(
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
              for (Dl = Bt(l.firstChild), Pl = t, nl = !0, Ee = null, Ht = !0, e = Mo(
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
        return Ln(l, t), l === null ? (e = Wr(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = e : nl || (e = t.type, l = t.pendingProps, a = ci(
          w.current
        ).createElement(e), a[Il] = t, a[ot] = l, et(a, e, l), Fl(a), t.stateNode = a) : t.memoizedState = Wr(
          t.type,
          l.memoizedProps,
          t.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return ve(t), l === null && nl && (a = t.stateNode = Kr(
          t.type,
          t.pendingProps,
          w.current
        ), Pl = t, Ht = !0, u = Dl, He(t.type) ? (Rf = u, Dl = Bt(a.firstChild)) : Dl = u), tt(
          l,
          t,
          t.pendingProps.children,
          e
        ), Ln(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && nl && ((u = a = Dl) && (a = W0(
          a,
          t.type,
          t.pendingProps,
          Ht
        ), a !== null ? (t.stateNode = a, Pl = t, Dl = Bt(a.firstChild), Ht = !1, u = !0) : u = !1), u || _e(t)), ve(t), u = t.type, n = t.pendingProps, i = l !== null ? l.memoizedProps : null, a = n.children, Af(u, n) ? a = null : i !== null && Af(u, i) && (t.flags |= 32), t.memoizedState !== null && (u = zc(
          l,
          t,
          s0,
          null,
          null,
          e
        ), Ku._currentValue = u), Ln(l, t), tt(l, t, a, e), t.child;
      case 6:
        return l === null && nl && ((l = e = Dl) && (e = $0(
          e,
          t.pendingProps,
          Ht
        ), e !== null ? (t.stateNode = e, Pl = t, Dl = null, l = !0) : l = !1), l || _e(t)), null;
      case 13:
        return Cd(l, t, e);
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
        return Ad(
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
        return Od(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 15:
        return Dd(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 19:
        return qd(l, t, e);
      case 31:
        return g0(l, t, e);
      case 22:
        return Md(
          l,
          t,
          e,
          t.pendingProps
        );
      case 24:
        return ea(t), a = lt(Ll), l === null ? (u = mc(), u === null && (u = Tl, n = dc(), u.pooledCache = n, n.refCount++, n !== null && (u.pooledCacheLanes |= e), u = n), t.memoizedState = { parent: a, cache: u }, hc(t), Te(t, Ll, u)) : ((l.lanes & e) !== 0 && (yc(l, t), Au(t, null, null, e), pu()), u = l.memoizedState, n = t.memoizedState, u.parent !== a ? (u = { parent: a, cache: a }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), Te(t, Ll, a)) : (a = n.cache, Te(t, Ll, a), a !== u.cache && oc(
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
    throw Error(o(156, t.tag));
  }
  function ue(l) {
    l.flags |= 4;
  }
  function kc(l, t, e, a, u) {
    if ((t = (l.mode & 32) !== 0) && (t = !1), t) {
      if (l.flags |= 16777216, (u & 335544128) === u)
        if (l.stateNode.complete) l.flags |= 8192;
        else if (or()) l.flags |= 8192;
        else
          throw na = Nn, vc;
    } else l.flags &= -16777217;
  }
  function Yd(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !Pr(t))
      if (or()) l.flags |= 8192;
      else
        throw na = Nn, vc;
  }
  function Jn(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? ys() : 536870912, l.lanes |= t, Za |= t);
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
  function b0(l, t, e) {
    var a = t.pendingProps;
    switch (nc(t), t.tag) {
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
        return e = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), le(Ll), xl(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (l === null || l.child === null) && (Ra(t) ? ue(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, cc())), Ml(t), null;
      case 26:
        var u = t.type, n = t.memoizedState;
        return l === null ? (ue(t), n !== null ? (Ml(t), Yd(t, n)) : (Ml(t), kc(
          t,
          u,
          null,
          a,
          e
        ))) : n ? n !== l.memoizedState ? (ue(t), Ml(t), Yd(t, n)) : (Ml(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== a && ue(t), Ml(t), kc(
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
              throw Error(o(166));
            return Ml(t), null;
          }
          l = j.current, Ra(t) ? go(t) : (l = Kr(u, a, e), t.stateNode = l, ue(t));
        }
        return Ml(t), null;
      case 5:
        if (Le(t), u = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && ue(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Ml(t), null;
          }
          if (n = j.current, Ra(t))
            go(t);
          else {
            var i = ci(
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
        return Ml(t), kc(
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
            throw Error(o(166));
          if (l = w.current, Ra(t)) {
            if (l = t.stateNode, e = t.memoizedProps, a = null, u = Pl, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            l[Il] = t, l = !!(l.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || Cr(l.nodeValue, e)), l || _e(t, !0);
          } else
            l = ci(l).createTextNode(
              a
            ), l[Il] = t, t.stateNode = l;
        }
        return Ml(t), null;
      case 31:
        if (e = t.memoizedState, l === null || l.memoizedState !== null) {
          if (a = Ra(t), e !== null) {
            if (l === null) {
              if (!a) throw Error(o(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(557));
              l[Il] = t;
            } else
              la(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ml(t), l = !1;
          } else
            e = cc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), l = !0;
          if (!l)
            return t.flags & 256 ? (pt(t), t) : (pt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(o(558));
        }
        return Ml(t), null;
      case 13:
        if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (u = Ra(t), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!u) throw Error(o(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(o(317));
              u[Il] = t;
            } else
              la(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ml(t), u = !1;
          } else
            u = cc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (pt(t), t) : (pt(t), null);
        }
        return pt(t), (t.flags & 128) !== 0 ? (t.lanes = e, t) : (e = a !== null, l = l !== null && l.memoizedState !== null, e && (a = t.child, u = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (u = a.alternate.memoizedState.cachePool.pool), n = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== u && (a.flags |= 2048)), e !== l && e && (t.child.flags |= 8192), Jn(t, t.updateQueue), Ml(t), null);
      case 4:
        return xl(), l === null && Ef(t.stateNode.containerInfo), Ml(t), null;
      case 10:
        return le(t.type), Ml(t), null;
      case 19:
        if (p(Vl), a = t.memoizedState, a === null) return Ml(t), null;
        if (u = (t.flags & 128) !== 0, n = a.rendering, n === null)
          if (u) Uu(a, !1);
          else {
            if (Cl !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = t.child; l !== null; ) {
                if (n = jn(l), n !== null) {
                  for (t.flags |= 128, Uu(a, !1), l = n.updateQueue, t.updateQueue = l, Jn(t, l), t.subtreeFlags = 0, l = e, e = t.child; e !== null; )
                    ro(e, l), e = e.sibling;
                  return N(
                    Vl,
                    Vl.current & 1 | 2
                  ), nl && It(t, a.treeForkCount), t.child;
                }
                l = l.sibling;
              }
            a.tail !== null && Ol() > kn && (t.flags |= 128, u = !0, Uu(a, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (l = jn(n), l !== null) {
              if (t.flags |= 128, u = !0, l = l.updateQueue, t.updateQueue = l, Jn(t, l), Uu(a, !0), a.tail === null && a.tailMode === "hidden" && !n.alternate && !nl)
                return Ml(t), null;
            } else
              2 * Ol() - a.renderingStartTime > kn && e !== 536870912 && (t.flags |= 128, u = !0, Uu(a, !1), t.lanes = 4194304);
          a.isBackwards ? (n.sibling = t.child, t.child = n) : (l = a.last, l !== null ? l.sibling = n : t.child = n, a.last = n);
        }
        return a.tail !== null ? (l = a.tail, a.rendering = l, a.tail = l.sibling, a.renderingStartTime = Ol(), l.sibling = null, e = Vl.current, N(
          Vl,
          u ? e & 1 | 2 : e & 1
        ), nl && It(t, a.treeForkCount), l) : (Ml(t), null);
      case 22:
      case 23:
        return pt(t), Ec(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (e & 536870912) !== 0 && (t.flags & 128) === 0 && (Ml(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ml(t), e = t.updateQueue, e !== null && Jn(t, e.retryQueue), e = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== e && (t.flags |= 2048), l !== null && p(aa), null;
      case 24:
        return e = null, l !== null && (e = l.memoizedState.cache), t.memoizedState.cache !== e && (t.flags |= 2048), le(Ll), Ml(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function E0(l, t) {
    switch (nc(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return le(Ll), xl(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Le(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (pt(t), t.alternate === null)
            throw Error(o(340));
          la();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (pt(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(o(340));
          la();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return p(Vl), null;
      case 4:
        return xl(), null;
      case 10:
        return le(t.type), null;
      case 22:
      case 23:
        return pt(t), Ec(), l !== null && p(aa), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return le(Ll), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Gd(l, t) {
    switch (nc(t), t.tag) {
      case 3:
        le(Ll), xl();
        break;
      case 26:
      case 27:
      case 5:
        Le(t);
        break;
      case 4:
        xl();
        break;
      case 31:
        t.memoizedState !== null && pt(t);
        break;
      case 13:
        pt(t);
        break;
      case 19:
        p(Vl);
        break;
      case 10:
        le(t.type);
        break;
      case 22:
      case 23:
        pt(t), Ec(), l !== null && p(aa);
        break;
      case 24:
        le(Ll);
    }
  }
  function xu(l, t) {
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
      yl(t, t.return, c);
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
              var s = e, h = c;
              try {
                h();
              } catch (E) {
                yl(
                  u,
                  s,
                  E
                );
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (E) {
      yl(t, t.return, E);
    }
  }
  function Xd(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var e = l.stateNode;
      try {
        Ro(t, e);
      } catch (a) {
        yl(l, l.return, a);
      }
    }
  }
  function Qd(l, t, e) {
    e.props = fa(
      l.type,
      l.memoizedProps
    ), e.state = l.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      yl(l, t, a);
    }
  }
  function ju(l, t) {
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
      yl(l, t, u);
    }
  }
  function Lt(l, t) {
    var e = l.ref, a = l.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (u) {
          yl(l, t, u);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (u) {
          yl(l, t, u);
        }
      else e.current = null;
  }
  function Vd(l) {
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
      yl(l, l.return, u);
    }
  }
  function Ic(l, t, e) {
    try {
      var a = l.stateNode;
      V0(a, l.type, e, t), a[ot] = t;
    } catch (u) {
      yl(l, l.return, u);
    }
  }
  function Zd(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && He(l.type) || l.tag === 4;
  }
  function Pc(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || Zd(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && He(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function lf(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(l, t) : (t = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, t.appendChild(l), e = e._reactRootContainer, e != null || t.onclick !== null || (t.onclick = $t));
    else if (a !== 4 && (a === 27 && He(l.type) && (e = l.stateNode, t = null), l = l.child, l !== null))
      for (lf(l, t, e), l = l.sibling; l !== null; )
        lf(l, t, e), l = l.sibling;
  }
  function wn(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? e.insertBefore(l, t) : e.appendChild(l);
    else if (a !== 4 && (a === 27 && He(l.type) && (e = l.stateNode), l = l.child, l !== null))
      for (wn(l, t, e), l = l.sibling; l !== null; )
        wn(l, t, e), l = l.sibling;
  }
  function Ld(l) {
    var t = l.stateNode, e = l.memoizedProps;
    try {
      for (var a = l.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      et(t, a, e), t[Il] = l, t[ot] = e;
    } catch (n) {
      yl(l, l.return, n);
    }
  }
  var ne = !1, wl = !1, tf = !1, Kd = typeof WeakSet == "function" ? WeakSet : Set, kl = null;
  function _0(l, t) {
    if (l = l.containerInfo, zf = vi, l = eo(l), Wi(l)) {
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
            var i = 0, c = -1, s = -1, h = 0, E = 0, O = l, y = null;
            t: for (; ; ) {
              for (var g; O !== e || u !== 0 && O.nodeType !== 3 || (c = i + u), O !== n || a !== 0 && O.nodeType !== 3 || (s = i + a), O.nodeType === 3 && (i += O.nodeValue.length), (g = O.firstChild) !== null; )
                y = O, O = g;
              for (; ; ) {
                if (O === l) break t;
                if (y === e && ++h === u && (c = i), y === n && ++E === a && (s = i), (g = O.nextSibling) !== null) break;
                O = y, y = O.parentNode;
              }
              O = g;
            }
            e = c === -1 || s === -1 ? null : { start: c, end: s };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (pf = { focusedElem: l, selectionRange: e }, vi = !1, kl = t; kl !== null; )
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
                  var H = fa(
                    e.type,
                    u
                  );
                  l = a.getSnapshotBeforeUpdate(
                    H,
                    n
                  ), a.__reactInternalSnapshotBeforeUpdate = l;
                } catch (Z) {
                  yl(
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
                  Df(l);
                else if (e === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Df(l);
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
              if ((l & 1024) !== 0) throw Error(o(163));
          }
          if (l = t.sibling, l !== null) {
            l.return = t.return, kl = l;
            break;
          }
          kl = t.return;
        }
  }
  function Jd(l, t, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ce(l, e), a & 4 && xu(5, e);
        break;
      case 1:
        if (ce(l, e), a & 4)
          if (l = e.stateNode, t === null)
            try {
              l.componentDidMount();
            } catch (i) {
              yl(e, e.return, i);
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
              yl(
                e,
                e.return,
                i
              );
            }
          }
        a & 64 && Xd(e), a & 512 && ju(e, e.return);
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
            Ro(l, t);
          } catch (i) {
            yl(e, e.return, i);
          }
        }
        break;
      case 27:
        t === null && a & 4 && Ld(e);
      case 26:
      case 5:
        ce(l, e), t === null && a & 4 && Vd(e), a & 512 && ju(e, e.return);
        break;
      case 12:
        ce(l, e);
        break;
      case 31:
        ce(l, e), a & 4 && $d(l, e);
        break;
      case 13:
        ce(l, e), a & 4 && Fd(l, e), a & 64 && (l = e.memoizedState, l !== null && (l = l.dehydrated, l !== null && (e = R0.bind(
          null,
          e
        ), F0(l, e))));
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
  function wd(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, wd(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && Ui(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var Rl = null, rt = !1;
  function ie(l, t, e) {
    for (e = e.child; e !== null; )
      Wd(l, t, e), e = e.sibling;
  }
  function Wd(l, t, e) {
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
              yl(
                e,
                t,
                n
              );
            }
          else
            try {
              Rl.removeChild(e.stateNode);
            } catch (n) {
              yl(
                e,
                t,
                n
              );
            }
        break;
      case 18:
        Rl !== null && (rt ? (l = Rl, Xr(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          e.stateNode
        ), ka(l)) : Xr(Rl, e.stateNode));
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
        wl || (Lt(e, t), a = e.stateNode, typeof a.componentWillUnmount == "function" && Qd(
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
  function $d(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        ka(l);
      } catch (e) {
        yl(t, t.return, e);
      }
    }
  }
  function Fd(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        ka(l);
      } catch (e) {
        yl(t, t.return, e);
      }
  }
  function T0(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new Kd()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new Kd()), t;
      default:
        throw Error(o(435, l.tag));
    }
  }
  function Wn(l, t) {
    var e = T0(l);
    t.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var u = U0.bind(null, l, a);
        a.then(u, u);
      }
    });
  }
  function mt(l, t) {
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
        if (Rl === null) throw Error(o(160));
        Wd(n, i, u), Rl = null, rt = !1, n = u.alternate, n !== null && (n.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        kd(t, l), t = t.sibling;
  }
  var Xt = null;
  function kd(l, t) {
    var e = l.alternate, a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        mt(t, l), vt(l), a & 4 && (Me(3, l, l.return), xu(3, l), Me(5, l, l.return));
        break;
      case 1:
        mt(t, l), vt(l), a & 512 && (wl || e === null || Lt(e, e.return)), a & 64 && ne && (l = l.updateQueue, l !== null && (a = l.callbacks, a !== null && (e = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var u = Xt;
        if (mt(t, l), vt(l), a & 512 && (wl || e === null || Lt(e, e.return)), a & 4) {
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
                      var i = kr(
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
                      if (i = kr(
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
                      throw Error(o(468, a));
                  }
                  n[Il] = l, Fl(n), a = n;
                }
                l.stateNode = a;
              } else
                Ir(
                  u,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = Fr(
                u,
                a,
                l.memoizedProps
              );
          else
            n !== a ? (n === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : n.count--, a === null ? Ir(
              u,
              l.type,
              l.stateNode
            ) : Fr(
              u,
              a,
              l.memoizedProps
            )) : a === null && l.stateNode !== null && Ic(
              l,
              l.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        mt(t, l), vt(l), a & 512 && (wl || e === null || Lt(e, e.return)), e !== null && a & 4 && Ic(
          l,
          l.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (mt(t, l), vt(l), a & 512 && (wl || e === null || Lt(e, e.return)), l.flags & 32) {
          u = l.stateNode;
          try {
            Ea(u, "");
          } catch (H) {
            yl(l, l.return, H);
          }
        }
        a & 4 && l.stateNode != null && (u = l.memoizedProps, Ic(
          l,
          u,
          e !== null ? e.memoizedProps : u
        )), a & 1024 && (tf = !0);
        break;
      case 6:
        if (mt(t, l), vt(l), a & 4) {
          if (l.stateNode === null)
            throw Error(o(162));
          a = l.memoizedProps, e = l.stateNode;
          try {
            e.nodeValue = a;
          } catch (H) {
            yl(l, l.return, H);
          }
        }
        break;
      case 3:
        if (oi = null, u = Xt, Xt = fi(t.containerInfo), mt(t, l), Xt = u, vt(l), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            ka(t.containerInfo);
          } catch (H) {
            yl(l, l.return, H);
          }
        tf && (tf = !1, Id(l));
        break;
      case 4:
        a = Xt, Xt = fi(
          l.stateNode.containerInfo
        ), mt(t, l), vt(l), Xt = a;
        break;
      case 12:
        mt(t, l), vt(l);
        break;
      case 31:
        mt(t, l), vt(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, Wn(l, a)));
        break;
      case 13:
        mt(t, l), vt(l), l.child.flags & 8192 && l.memoizedState !== null != (e !== null && e.memoizedState !== null) && (Fn = Ol()), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, Wn(l, a)));
        break;
      case 22:
        u = l.memoizedState !== null;
        var s = e !== null && e.memoizedState !== null, h = ne, E = wl;
        if (ne = h || u, wl = E || s, mt(t, l), wl = E, ne = h, vt(l), a & 8192)
          l: for (t = l.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (e === null || s || ne || wl || sa(l)), e = null, t = l; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (e === null) {
                s = e = t;
                try {
                  if (n = s.stateNode, u)
                    i = n.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    c = s.stateNode;
                    var O = s.memoizedProps.style, y = O != null && O.hasOwnProperty("display") ? O.display : null;
                    c.style.display = y == null || typeof y == "boolean" ? "" : ("" + y).trim();
                  }
                } catch (H) {
                  yl(s, s.return, H);
                }
              }
            } else if (t.tag === 6) {
              if (e === null) {
                s = t;
                try {
                  s.stateNode.nodeValue = u ? "" : s.memoizedProps;
                } catch (H) {
                  yl(s, s.return, H);
                }
              }
            } else if (t.tag === 18) {
              if (e === null) {
                s = t;
                try {
                  var g = s.stateNode;
                  u ? Qr(g, !0) : Qr(s.stateNode, !1);
                } catch (H) {
                  yl(s, s.return, H);
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
        a & 4 && (a = l.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, Wn(l, e))));
        break;
      case 19:
        mt(t, l), vt(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, Wn(l, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        mt(t, l), vt(l);
    }
  }
  function vt(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var e, a = l.return; a !== null; ) {
          if (Zd(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(o(160));
        switch (e.tag) {
          case 27:
            var u = e.stateNode, n = Pc(l);
            wn(l, n, u);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && (Ea(i, ""), e.flags &= -33);
            var c = Pc(l);
            wn(l, c, i);
            break;
          case 3:
          case 4:
            var s = e.stateNode.containerInfo, h = Pc(l);
            lf(
              l,
              h,
              s
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (E) {
        yl(l, l.return, E);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function Id(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        Id(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
      }
  }
  function ce(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Jd(l, t.alternate, t), t = t.sibling;
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
          typeof e.componentWillUnmount == "function" && Qd(
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
          ), xu(4, n);
          break;
        case 1:
          if (fe(
            u,
            n,
            e
          ), a = n, u = a.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (h) {
              yl(a, a.return, h);
            }
          if (a = n, u = a.updateQueue, u !== null) {
            var c = a.stateNode;
            try {
              var s = u.shared.hiddenCallbacks;
              if (s !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < s.length; u++)
                  No(s[u], c);
            } catch (h) {
              yl(a, a.return, h);
            }
          }
          e && i & 64 && Xd(n), ju(n, n.return);
          break;
        case 27:
          Ld(n);
        case 26:
        case 5:
          fe(
            u,
            n,
            e
          ), e && a === null && i & 4 && Vd(n), ju(n, n.return);
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
          ), e && i & 4 && $d(u, n);
          break;
        case 13:
          fe(
            u,
            n,
            e
          ), e && i & 4 && Fd(u, n);
          break;
        case 22:
          n.memoizedState === null && fe(
            u,
            n,
            e
          ), ju(n, n.return);
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
  function ef(l, t) {
    var e = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== e && (l != null && l.refCount++, e != null && bu(e));
  }
  function af(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && bu(l));
  }
  function Qt(l, t, e, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Pd(
          l,
          t,
          e,
          a
        ), t = t.sibling;
  }
  function Pd(l, t, e, a) {
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
        ), u & 2048 && xu(9, t);
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
            yl(t, t.return, s);
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
        ) : Cu(l, t) : n._visibility & 2 ? Qt(
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
        )), u & 2048 && ef(i, t);
        break;
      case 24:
        Qt(
          l,
          t,
          e,
          a
        ), u & 2048 && af(t.alternate, t);
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
      var n = l, i = t, c = e, s = a, h = i.flags;
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
          ), xu(8, i);
          break;
        case 23:
          break;
        case 22:
          var E = i.stateNode;
          i.memoizedState !== null ? E._visibility & 2 ? Xa(
            n,
            i,
            c,
            s,
            u
          ) : Cu(
            n,
            i
          ) : (E._visibility |= 2, Xa(
            n,
            i,
            c,
            s,
            u
          )), u && h & 2048 && ef(
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
          ), u && h & 2048 && af(i.alternate, i);
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
  function Cu(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var e = l, a = t, u = a.flags;
        switch (a.tag) {
          case 22:
            Cu(e, a), u & 2048 && ef(
              a.alternate,
              a
            );
            break;
          case 24:
            Cu(e, a), u & 2048 && af(a.alternate, a);
            break;
          default:
            Cu(e, a);
        }
        t = t.sibling;
      }
  }
  var Hu = 8192;
  function Qa(l, t, e) {
    if (l.subtreeFlags & Hu)
      for (l = l.child; l !== null; )
        lr(
          l,
          t,
          e
        ), l = l.sibling;
  }
  function lr(l, t, e) {
    switch (l.tag) {
      case 26:
        Qa(
          l,
          t,
          e
        ), l.flags & Hu && l.memoizedState !== null && fh(
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
        Xt = fi(l.stateNode.containerInfo), Qa(
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
  function tr(l) {
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
          kl = a, ar(
            a,
            l
          );
        }
      tr(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        er(l), l = l.sibling;
  }
  function er(l) {
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
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, $n(l)) : qu(l);
        break;
      default:
        qu(l);
    }
  }
  function $n(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          kl = a, ar(
            a,
            l
          );
        }
      tr(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          Me(8, t, t.return), $n(t);
          break;
        case 22:
          e = t.stateNode, e._visibility & 2 && (e._visibility &= -3, $n(t));
          break;
        default:
          $n(t);
      }
      l = l.sibling;
    }
  }
  function ar(l, t) {
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
          if (wd(a), a === e) {
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
  var z0 = {
    getCacheForType: function(l) {
      var t = lt(Ll), e = t.data.get(l);
      return e === void 0 && (e = l(), t.data.set(l, e)), e;
    },
    cacheSignal: function() {
      return lt(Ll).controller.signal;
    }
  }, p0 = typeof WeakMap == "function" ? WeakMap : Map, ml = 0, Tl = null, ll = null, el = 0, hl = 0, At = null, Ne = !1, Va = !1, uf = !1, se = 0, Cl = 0, Re = 0, oa = 0, nf = 0, Ot = 0, Za = 0, Bu = null, ht = null, cf = !1, Fn = 0, ur = 0, kn = 1 / 0, In = null, Ue = null, Wl = 0, xe = null, La = null, oe = 0, ff = 0, sf = null, nr = null, Yu = 0, of = null;
  function Dt() {
    return (ml & 2) !== 0 && el !== 0 ? el & -el : S.T !== null ? yf() : Es();
  }
  function ir() {
    if (Ot === 0)
      if ((el & 536870912) === 0 || nl) {
        var l = nn;
        nn <<= 1, (nn & 3932160) === 0 && (nn = 262144), Ot = l;
      } else Ot = 536870912;
    return l = zt.current, l !== null && (l.flags |= 32), Ot;
  }
  function yt(l, t, e) {
    (l === Tl && (hl === 2 || hl === 9) || l.cancelPendingCommit !== null) && (Ka(l, 0), je(
      l,
      el,
      Ot,
      !1
    )), nu(l, e), ((ml & 2) === 0 || l !== Tl) && (l === Tl && ((ml & 2) === 0 && (oa |= e), Cl === 4 && je(
      l,
      el,
      Ot,
      !1
    )), Kt(l));
  }
  function cr(l, t, e) {
    if ((ml & 6) !== 0) throw Error(o(327));
    var a = !e && (t & 127) === 0 && (t & l.expiredLanes) === 0 || uu(l, t), u = a ? D0(l, t) : rf(l, t, !0), n = a;
    do {
      if (u === 0) {
        Va && !a && je(l, t, 0, !1);
        break;
      } else {
        if (e = l.current.alternate, n && !A0(e)) {
          u = rf(l, t, !1), n = !1;
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
              if (s && (Ka(c, i).flags |= 256), i = rf(
                c,
                i,
                !1
              ), i !== 2) {
                if (uf && !s) {
                  c.errorRecoveryDisabledLanes |= n, oa |= n, u = 4;
                  break l;
                }
                n = ht, ht = u, n !== null && (ht === null ? ht = n : ht.push.apply(
                  ht,
                  n
                ));
              }
              u = i;
            }
            if (n = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Ka(l, 0), je(l, t, 0, !0);
          break;
        }
        l: {
          switch (a = l, n = u, n) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              je(
                a,
                t,
                Ot,
                !Ne
              );
              break l;
            case 2:
              ht = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && (u = Fn + 300 - Ol(), 10 < u)) {
            if (je(
              a,
              t,
              Ot,
              !Ne
            ), fn(a, 0, !0) !== 0) break l;
            oe = t, a.timeoutHandle = Yr(
              fr.bind(
                null,
                a,
                e,
                ht,
                In,
                cf,
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
          fr(
            a,
            e,
            ht,
            In,
            cf,
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
  function fr(l, t, e, a, u, n, i, c, s, h, E, O, y, g) {
    if (l.timeoutHandle = -1, O = t.subtreeFlags, O & 8192 || (O & 16785408) === 16785408) {
      O = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: $t
      }, lr(
        t,
        n,
        O
      );
      var H = (n & 62914560) === n ? Fn - Ol() : (n & 4194048) === n ? ur - Ol() : 0;
      if (H = sh(
        O,
        H
      ), H !== null) {
        oe = n, l.cancelPendingCommit = H(
          yr.bind(
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
            E,
            O,
            null,
            y,
            g
          )
        ), je(l, n, i, !h);
        return;
      }
    }
    yr(
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
  function A0(l) {
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
  function je(l, t, e, a) {
    t &= ~nf, t &= ~oa, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
    for (var u = t; 0 < u; ) {
      var n = 31 - Et(u), i = 1 << n;
      a[n] = -1, u &= ~i;
    }
    e !== 0 && gs(l, e, t);
  }
  function Pn() {
    return (ml & 6) === 0 ? (Gu(0), !1) : !0;
  }
  function df() {
    if (ll !== null) {
      if (hl === 0)
        var l = ll.return;
      else
        l = ll, Pt = ta = null, Oc(l), Ha = null, _u = 0, l = ll;
      for (; l !== null; )
        Gd(l.alternate, l), l = l.return;
      ll = null;
    }
  }
  function Ka(l, t) {
    var e = l.timeoutHandle;
    e !== -1 && (l.timeoutHandle = -1, K0(e)), e = l.cancelPendingCommit, e !== null && (l.cancelPendingCommit = null, e()), oe = 0, df(), Tl = l, ll = e = kt(l.current, null), el = t, hl = 0, At = null, Ne = !1, Va = uu(l, t), uf = !1, Za = Ot = nf = oa = Re = Cl = 0, ht = Bu = null, cf = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = l.entangledLanes;
    if (a !== 0)
      for (l = l.entanglements, a &= t; 0 < a; ) {
        var u = 31 - Et(a), n = 1 << u;
        t |= l[u], a &= ~n;
      }
    return se = t, En(), e;
  }
  function sr(l, t) {
    W = null, S.H = Nu, t === Ca || t === Mn ? (t = Ao(), hl = 3) : t === vc ? (t = Ao(), hl = 4) : hl = t === Vc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, At = t, ll === null && (Cl = 1, Vn(
      l,
      xt(t, l.current)
    ));
  }
  function or() {
    var l = zt.current;
    return l === null ? !0 : (el & 4194048) === el ? qt === null : (el & 62914560) === el || (el & 536870912) !== 0 ? l === qt : !1;
  }
  function dr() {
    var l = S.H;
    return S.H = Nu, l === null ? Nu : l;
  }
  function rr() {
    var l = S.A;
    return S.A = z0, l;
  }
  function li() {
    Cl = 4, Ne || (el & 4194048) !== el && zt.current !== null || (Va = !0), (Re & 134217727) === 0 && (oa & 134217727) === 0 || Tl === null || je(
      Tl,
      el,
      Ot,
      !1
    );
  }
  function rf(l, t, e) {
    var a = ml;
    ml |= 2;
    var u = dr(), n = rr();
    (Tl !== l || el !== t) && (In = null, Ka(l, t)), t = !1;
    var i = Cl;
    l: do
      try {
        if (hl !== 0 && ll !== null) {
          var c = ll, s = At;
          switch (hl) {
            case 8:
              df(), i = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              zt.current === null && (t = !0);
              var h = hl;
              if (hl = 0, At = null, Ja(l, c, s, h), e && Va) {
                i = 0;
                break l;
              }
              break;
            default:
              h = hl, hl = 0, At = null, Ja(l, c, s, h);
          }
        }
        O0(), i = Cl;
        break;
      } catch (E) {
        sr(l, E);
      }
    while (!0);
    return t && l.shellSuspendCounter++, Pt = ta = null, ml = a, S.H = u, S.A = n, ll === null && (Tl = null, el = 0, En()), i;
  }
  function O0() {
    for (; ll !== null; ) mr(ll);
  }
  function D0(l, t) {
    var e = ml;
    ml |= 2;
    var a = dr(), u = rr();
    Tl !== l || el !== t ? (In = null, kn = Ol() + 500, Ka(l, t)) : Va = uu(
      l,
      t
    );
    l: do
      try {
        if (hl !== 0 && ll !== null) {
          t = ll;
          var n = At;
          t: switch (hl) {
            case 1:
              hl = 0, At = null, Ja(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (zo(n)) {
                hl = 0, At = null, vr(t);
                break;
              }
              t = function() {
                hl !== 2 && hl !== 9 || Tl !== l || (hl = 7), Kt(l);
              }, n.then(t, t);
              break l;
            case 3:
              hl = 7;
              break l;
            case 4:
              hl = 5;
              break l;
            case 7:
              zo(n) ? (hl = 0, At = null, vr(t)) : (hl = 0, At = null, Ja(l, t, n, 7));
              break;
            case 5:
              var i = null;
              switch (ll.tag) {
                case 26:
                  i = ll.memoizedState;
                case 5:
                case 27:
                  var c = ll;
                  if (i ? Pr(i) : c.stateNode.complete) {
                    hl = 0, At = null;
                    var s = c.sibling;
                    if (s !== null) ll = s;
                    else {
                      var h = c.return;
                      h !== null ? (ll = h, ti(h)) : ll = null;
                    }
                    break t;
                  }
              }
              hl = 0, At = null, Ja(l, t, n, 5);
              break;
            case 6:
              hl = 0, At = null, Ja(l, t, n, 6);
              break;
            case 8:
              df(), Cl = 6;
              break l;
            default:
              throw Error(o(462));
          }
        }
        M0();
        break;
      } catch (E) {
        sr(l, E);
      }
    while (!0);
    return Pt = ta = null, S.H = a, S.A = u, ml = e, ll !== null ? 0 : (Tl = null, el = 0, En(), Cl);
  }
  function M0() {
    for (; ll !== null && !ft(); )
      mr(ll);
  }
  function mr(l) {
    var t = Bd(l.alternate, l, se);
    l.memoizedProps = l.pendingProps, t === null ? ti(l) : ll = t;
  }
  function vr(l) {
    var t = l, e = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Ud(
          e,
          t,
          t.pendingProps,
          t.type,
          void 0,
          el
        );
        break;
      case 11:
        t = Ud(
          e,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          el
        );
        break;
      case 5:
        Oc(t);
      default:
        Gd(e, t), t = ll = ro(t, se), t = Bd(e, t, se);
    }
    l.memoizedProps = l.pendingProps, t === null ? ti(l) : ll = t;
  }
  function Ja(l, t, e, a) {
    Pt = ta = null, Oc(t), Ha = null, _u = 0;
    var u = t.return;
    try {
      if (y0(
        l,
        u,
        t,
        e,
        el
      )) {
        Cl = 1, Vn(
          l,
          xt(e, l.current)
        ), ll = null;
        return;
      }
    } catch (n) {
      if (u !== null) throw ll = u, n;
      Cl = 1, Vn(
        l,
        xt(e, l.current)
      ), ll = null;
      return;
    }
    t.flags & 32768 ? (nl || a === 1 ? l = !0 : Va || (el & 536870912) !== 0 ? l = !1 : (Ne = l = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = zt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), hr(t, l)) : ti(t);
  }
  function ti(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        hr(
          t,
          Ne
        );
        return;
      }
      l = t.return;
      var e = b0(
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
    Cl === 0 && (Cl = 5);
  }
  function hr(l, t) {
    do {
      var e = E0(l.alternate, l);
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
    Cl = 6, ll = null;
  }
  function yr(l, t, e, a, u, n, i, c, s) {
    l.cancelPendingCommit = null;
    do
      ei();
    while (Wl !== 0);
    if ((ml & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === l.current) throw Error(o(177));
      if (n = t.lanes | t.childLanes, n |= Pi, cv(
        l,
        e,
        n,
        i,
        c,
        s
      ), l === Tl && (ll = Tl = null, el = 0), La = t, xe = l, oe = e, ff = n, sf = u, nr = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, x0(Je, function() {
        return _r(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = S.T, S.T = null, u = R.p, R.p = 2, i = ml, ml |= 4;
        try {
          _0(l, t, e);
        } finally {
          ml = i, R.p = u, S.T = a;
        }
      }
      Wl = 1, gr(), Sr(), br();
    }
  }
  function gr() {
    if (Wl === 1) {
      Wl = 0;
      var l = xe, t = La, e = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || e) {
        e = S.T, S.T = null;
        var a = R.p;
        R.p = 2;
        var u = ml;
        ml |= 4;
        try {
          kd(t, l);
          var n = pf, i = eo(l.containerInfo), c = n.focusedElem, s = n.selectionRange;
          if (i !== c && c && c.ownerDocument && to(
            c.ownerDocument.documentElement,
            c
          )) {
            if (s !== null && Wi(c)) {
              var h = s.start, E = s.end;
              if (E === void 0 && (E = h), "selectionStart" in c)
                c.selectionStart = h, c.selectionEnd = Math.min(
                  E,
                  c.value.length
                );
              else {
                var O = c.ownerDocument || document, y = O && O.defaultView || window;
                if (y.getSelection) {
                  var g = y.getSelection(), H = c.textContent.length, Z = Math.min(s.start, H), _l = s.end === void 0 ? Z : Math.min(s.end, H);
                  !g.extend && Z > _l && (i = _l, _l = Z, Z = i);
                  var m = lo(
                    c,
                    Z
                  ), d = lo(
                    c,
                    _l
                  );
                  if (m && d && (g.rangeCount !== 1 || g.anchorNode !== m.node || g.anchorOffset !== m.offset || g.focusNode !== d.node || g.focusOffset !== d.offset)) {
                    var v = O.createRange();
                    v.setStart(m.node, m.offset), g.removeAllRanges(), Z > _l ? (g.addRange(v), g.extend(d.node, d.offset)) : (v.setEnd(d.node, d.offset), g.addRange(v));
                  }
                }
              }
            }
            for (O = [], g = c; g = g.parentNode; )
              g.nodeType === 1 && O.push({
                element: g,
                left: g.scrollLeft,
                top: g.scrollTop
              });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < O.length; c++) {
              var z = O[c];
              z.element.scrollLeft = z.left, z.element.scrollTop = z.top;
            }
          }
          vi = !!zf, pf = zf = null;
        } finally {
          ml = u, R.p = a, S.T = e;
        }
      }
      l.current = t, Wl = 2;
    }
  }
  function Sr() {
    if (Wl === 2) {
      Wl = 0;
      var l = xe, t = La, e = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || e) {
        e = S.T, S.T = null;
        var a = R.p;
        R.p = 2;
        var u = ml;
        ml |= 4;
        try {
          Jd(l, t.alternate, t);
        } finally {
          ml = u, R.p = a, S.T = e;
        }
      }
      Wl = 3;
    }
  }
  function br() {
    if (Wl === 4 || Wl === 3) {
      Wl = 0, Ql();
      var l = xe, t = La, e = oe, a = nr;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Wl = 5 : (Wl = 0, La = xe = null, Er(l, l.pendingLanes));
      var u = l.pendingLanes;
      if (u === 0 && (Ue = null), Ni(e), t = t.stateNode, bt && typeof bt.onCommitFiberRoot == "function")
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
      (oe & 3) !== 0 && ei(), Kt(l), u = l.pendingLanes, (e & 261930) !== 0 && (u & 42) !== 0 ? l === of ? Yu++ : (Yu = 0, of = l) : Yu = 0, Gu(0);
    }
  }
  function Er(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, bu(t)));
  }
  function ei() {
    return gr(), Sr(), br(), _r();
  }
  function _r() {
    if (Wl !== 5) return !1;
    var l = xe, t = ff;
    ff = 0;
    var e = Ni(oe), a = S.T, u = R.p;
    try {
      R.p = 32 > e ? 32 : e, S.T = null, e = sf, sf = null;
      var n = xe, i = oe;
      if (Wl = 0, La = xe = null, oe = 0, (ml & 6) !== 0) throw Error(o(331));
      var c = ml;
      if (ml |= 4, er(n.current), Pd(
        n,
        n.current,
        i,
        e
      ), ml = c, Gu(0, !1), bt && typeof bt.onPostCommitFiberRoot == "function")
        try {
          bt.onPostCommitFiberRoot(wt, n);
        } catch {
        }
      return !0;
    } finally {
      R.p = u, S.T = a, Er(l, t);
    }
  }
  function Tr(l, t, e) {
    t = xt(e, t), t = Qc(l.stateNode, t, 2), l = Ae(l, t, 2), l !== null && (nu(l, 2), Kt(l));
  }
  function yl(l, t, e) {
    if (l.tag === 3)
      Tr(l, l, e);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Tr(
            t,
            l,
            e
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Ue === null || !Ue.has(a))) {
            l = xt(e, l), e = zd(2), a = Ae(t, e, 2), a !== null && (pd(
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
  function mf(l, t, e) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new p0();
      var u = /* @__PURE__ */ new Set();
      a.set(t, u);
    } else
      u = a.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), a.set(t, u));
    u.has(e) || (uf = !0, u.add(e), l = N0.bind(null, l, t, e), t.then(l, l));
  }
  function N0(l, t, e) {
    var a = l.pingCache;
    a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & e, l.warmLanes &= ~e, Tl === l && (el & e) === e && (Cl === 4 || Cl === 3 && (el & 62914560) === el && 300 > Ol() - Fn ? (ml & 2) === 0 && Ka(l, 0) : nf |= e, Za === el && (Za = 0)), Kt(l);
  }
  function zr(l, t) {
    t === 0 && (t = ys()), l = Ie(l, t), l !== null && (nu(l, t), Kt(l));
  }
  function R0(l) {
    var t = l.memoizedState, e = 0;
    t !== null && (e = t.retryLane), zr(l, e);
  }
  function U0(l, t) {
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
        throw Error(o(314));
    }
    a !== null && a.delete(t), zr(l, e);
  }
  function x0(l, t) {
    return Al(l, t);
  }
  var ai = null, wa = null, vf = !1, ui = !1, hf = !1, Ce = 0;
  function Kt(l) {
    l !== wa && l.next === null && (wa === null ? ai = wa = l : wa = wa.next = l), ui = !0, vf || (vf = !0, C0());
  }
  function Gu(l, t) {
    if (!hf && ui) {
      hf = !0;
      do
        for (var e = !1, a = ai; a !== null; ) {
          if (l !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = a.suspendedLanes, c = a.pingedLanes;
              n = (1 << 31 - Et(42 | l) + 1) - 1, n &= u & ~(i & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (e = !0, Dr(a, n));
          } else
            n = el, n = fn(
              a,
              a === Tl ? n : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (n & 3) === 0 || uu(a, n) || (e = !0, Dr(a, n));
          a = a.next;
        }
      while (e);
      hf = !1;
    }
  }
  function j0() {
    pr();
  }
  function pr() {
    ui = vf = !1;
    var l = 0;
    Ce !== 0 && L0() && (l = Ce);
    for (var t = Ol(), e = null, a = ai; a !== null; ) {
      var u = a.next, n = Ar(a, t);
      n === 0 ? (a.next = null, e === null ? ai = u : e.next = u, u === null && (wa = e)) : (e = a, (l !== 0 || (n & 3) !== 0) && (ui = !0)), a = u;
    }
    Wl !== 0 && Wl !== 5 || Gu(l), Ce !== 0 && (Ce = 0);
  }
  function Ar(l, t) {
    for (var e = l.suspendedLanes, a = l.pingedLanes, u = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
      var i = 31 - Et(n), c = 1 << i, s = u[i];
      s === -1 ? ((c & e) === 0 || (c & a) !== 0) && (u[i] = iv(c, t)) : s <= t && (l.expiredLanes |= c), n &= ~c;
    }
    if (t = Tl, e = el, e = fn(
      l,
      l === t ? e : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a = l.callbackNode, e === 0 || l === t && (hl === 2 || hl === 9) || l.cancelPendingCommit !== null)
      return a !== null && a !== null && ct(a), l.callbackNode = null, l.callbackPriority = 0;
    if ((e & 3) === 0 || uu(l, e)) {
      if (t = e & -e, t === l.callbackPriority) return t;
      switch (a !== null && ct(a), Ni(e)) {
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
      return a = Or.bind(null, l), e = Al(e, a), l.callbackPriority = t, l.callbackNode = e, t;
    }
    return a !== null && a !== null && ct(a), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function Or(l, t) {
    if (Wl !== 0 && Wl !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var e = l.callbackNode;
    if (ei() && l.callbackNode !== e)
      return null;
    var a = el;
    return a = fn(
      l,
      l === Tl ? a : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a === 0 ? null : (cr(l, a, t), Ar(l, Ol()), l.callbackNode != null && l.callbackNode === e ? Or.bind(null, l) : null);
  }
  function Dr(l, t) {
    if (ei()) return null;
    cr(l, t, !0);
  }
  function C0() {
    J0(function() {
      (ml & 6) !== 0 ? Al(
        he,
        j0
      ) : pr();
    });
  }
  function yf() {
    if (Ce === 0) {
      var l = xa;
      l === 0 && (l = un, un <<= 1, (un & 261888) === 0 && (un = 256)), Ce = l;
    }
    return Ce;
  }
  function Mr(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : rn("" + l);
  }
  function Nr(l, t) {
    var e = t.ownerDocument.createElement("input");
    return e.name = t.name, e.value = t.value, l.id && e.setAttribute("form", l.id), t.parentNode.insertBefore(e, t), l = new FormData(l), e.parentNode.removeChild(e), l;
  }
  function H0(l, t, e, a, u) {
    if (t === "submit" && e && e.stateNode === u) {
      var n = Mr(
        (u[ot] || null).action
      ), i = a.submitter;
      i && (t = (t = i[ot] || null) ? Mr(t.formAction) : i.getAttribute("formAction"), t !== null && (n = t, i = null));
      var c = new yn(
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
                if (Ce !== 0) {
                  var s = i ? Nr(u, i) : new FormData(u);
                  Hc(
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
                typeof n == "function" && (c.preventDefault(), s = i ? Nr(u, i) : new FormData(u), Hc(
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
  for (var gf = 0; gf < Ii.length; gf++) {
    var Sf = Ii[gf], q0 = Sf.toLowerCase(), B0 = Sf[0].toUpperCase() + Sf.slice(1);
    Gt(
      q0,
      "on" + B0
    );
  }
  Gt(no, "onAnimationEnd"), Gt(io, "onAnimationIteration"), Gt(co, "onAnimationStart"), Gt("dblclick", "onDoubleClick"), Gt("focusin", "onFocus"), Gt("focusout", "onBlur"), Gt(Pv, "onTransitionRun"), Gt(l0, "onTransitionStart"), Gt(t0, "onTransitionCancel"), Gt(fo, "onTransitionEnd"), Sa("onMouseEnter", ["mouseout", "mouseover"]), Sa("onMouseLeave", ["mouseout", "mouseover"]), Sa("onPointerEnter", ["pointerout", "pointerover"]), Sa("onPointerLeave", ["pointerout", "pointerover"]), We(
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
  ), Y0 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Xu)
  );
  function Rr(l, t) {
    t = (t & 4) !== 0;
    for (var e = 0; e < l.length; e++) {
      var a = l[e], u = a.event;
      a = a.listeners;
      l: {
        var n = void 0;
        if (t)
          for (var i = a.length - 1; 0 <= i; i--) {
            var c = a[i], s = c.instance, h = c.currentTarget;
            if (c = c.listener, s !== n && u.isPropagationStopped())
              break l;
            n = c, u.currentTarget = h;
            try {
              n(u);
            } catch (E) {
              bn(E);
            }
            u.currentTarget = null, n = s;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (c = a[i], s = c.instance, h = c.currentTarget, c = c.listener, s !== n && u.isPropagationStopped())
              break l;
            n = c, u.currentTarget = h;
            try {
              n(u);
            } catch (E) {
              bn(E);
            }
            u.currentTarget = null, n = s;
          }
      }
    }
  }
  function tl(l, t) {
    var e = t[Ri];
    e === void 0 && (e = t[Ri] = /* @__PURE__ */ new Set());
    var a = l + "__bubble";
    e.has(a) || (Ur(t, l, 2, !1), e.add(a));
  }
  function bf(l, t, e) {
    var a = 0;
    t && (a |= 4), Ur(
      e,
      l,
      a,
      t
    );
  }
  var ni = "_reactListening" + Math.random().toString(36).slice(2);
  function Ef(l) {
    if (!l[ni]) {
      l[ni] = !0, zs.forEach(function(e) {
        e !== "selectionchange" && (Y0.has(e) || bf(e, !1, l), bf(e, !0, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[ni] || (t[ni] = !0, bf("selectionchange", !1, t));
    }
  }
  function Ur(l, t, e, a) {
    switch (im(t)) {
      case 2:
        var u = rh;
        break;
      case 8:
        u = mh;
        break;
      default:
        u = Hf;
    }
    e = u.bind(
      null,
      t,
      e,
      l
    ), u = void 0, !Gi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), a ? u !== void 0 ? l.addEventListener(t, e, {
      capture: !0,
      passive: u
    }) : l.addEventListener(t, e, !0) : u !== void 0 ? l.addEventListener(t, e, {
      passive: u
    }) : l.addEventListener(t, e, !1);
  }
  function _f(l, t, e, a, u) {
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
            if (i = ha(c), i === null) return;
            if (s = i.tag, s === 5 || s === 6 || s === 26 || s === 27) {
              a = n = i;
              continue l;
            }
            c = c.parentNode;
          }
        }
        a = a.return;
      }
    Hs(function() {
      var h = n, E = Bi(e), O = [];
      l: {
        var y = so.get(l);
        if (y !== void 0) {
          var g = yn, H = l;
          switch (l) {
            case "keypress":
              if (vn(e) === 0) break l;
            case "keydown":
            case "keyup":
              g = Uv;
              break;
            case "focusin":
              H = "focus", g = Zi;
              break;
            case "focusout":
              H = "blur", g = Zi;
              break;
            case "beforeblur":
            case "afterblur":
              g = Zi;
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
              g = Ys;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              g = bv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              g = Cv;
              break;
            case no:
            case io:
            case co:
              g = Tv;
              break;
            case fo:
              g = qv;
              break;
            case "scroll":
            case "scrollend":
              g = gv;
              break;
            case "wheel":
              g = Yv;
              break;
            case "copy":
            case "cut":
            case "paste":
              g = pv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              g = Xs;
              break;
            case "toggle":
            case "beforetoggle":
              g = Xv;
          }
          var Z = (t & 4) !== 0, _l = !Z && (l === "scroll" || l === "scrollend"), m = Z ? y !== null ? y + "Capture" : null : y;
          Z = [];
          for (var d = h, v; d !== null; ) {
            var z = d;
            if (v = z.stateNode, z = z.tag, z !== 5 && z !== 26 && z !== 27 || v === null || m === null || (z = fu(d, m), z != null && Z.push(
              Qu(d, z, v)
            )), _l) break;
            d = d.return;
          }
          0 < Z.length && (y = new g(
            y,
            H,
            null,
            e,
            E
          ), O.push({ event: y, listeners: Z }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (y = l === "mouseover" || l === "pointerover", g = l === "mouseout" || l === "pointerout", y && e !== qi && (H = e.relatedTarget || e.fromElement) && (ha(H) || H[va]))
            break l;
          if ((g || y) && (y = E.window === E ? E : (y = E.ownerDocument) ? y.defaultView || y.parentWindow : window, g ? (H = e.relatedTarget || e.toElement, g = h, H = H ? ha(H) : null, H !== null && (_l = B(H), Z = H.tag, H !== _l || Z !== 5 && Z !== 27 && Z !== 6) && (H = null)) : (g = null, H = h), g !== H)) {
            if (Z = Ys, z = "onMouseLeave", m = "onMouseEnter", d = "mouse", (l === "pointerout" || l === "pointerover") && (Z = Xs, z = "onPointerLeave", m = "onPointerEnter", d = "pointer"), _l = g == null ? y : cu(g), v = H == null ? y : cu(H), y = new Z(
              z,
              d + "leave",
              g,
              e,
              E
            ), y.target = _l, y.relatedTarget = v, z = null, ha(E) === h && (Z = new Z(
              m,
              d + "enter",
              H,
              e,
              E
            ), Z.target = v, Z.relatedTarget = _l, z = Z), _l = z, g && H)
              t: {
                for (Z = G0, m = g, d = H, v = 0, z = m; z; z = Z(z))
                  v++;
                z = 0;
                for (var X = d; X; X = Z(X))
                  z++;
                for (; 0 < v - z; )
                  m = Z(m), v--;
                for (; 0 < z - v; )
                  d = Z(d), z--;
                for (; v--; ) {
                  if (m === d || d !== null && m === d.alternate) {
                    Z = m;
                    break t;
                  }
                  m = Z(m), d = Z(d);
                }
                Z = null;
              }
            else Z = null;
            g !== null && xr(
              O,
              y,
              g,
              Z,
              !1
            ), H !== null && _l !== null && xr(
              O,
              _l,
              H,
              Z,
              !0
            );
          }
        }
        l: {
          if (y = h ? cu(h) : window, g = y.nodeName && y.nodeName.toLowerCase(), g === "select" || g === "input" && y.type === "file")
            var ol = Ws;
          else if (Js(y))
            if ($s)
              ol = Fv;
            else {
              ol = Wv;
              var Y = wv;
            }
          else
            g = y.nodeName, !g || g.toLowerCase() !== "input" || y.type !== "checkbox" && y.type !== "radio" ? h && Hi(h.elementType) && (ol = Ws) : ol = $v;
          if (ol && (ol = ol(l, h))) {
            ws(
              O,
              ol,
              e,
              E
            );
            break l;
          }
          Y && Y(l, y, h), l === "focusout" && h && y.type === "number" && h.memoizedProps.value != null && Ci(y, "number", y.value);
        }
        switch (Y = h ? cu(h) : window, l) {
          case "focusin":
            (Js(Y) || Y.contentEditable === "true") && (pa = Y, $i = h, yu = null);
            break;
          case "focusout":
            yu = $i = pa = null;
            break;
          case "mousedown":
            Fi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Fi = !1, ao(O, e, E);
            break;
          case "selectionchange":
            if (Iv) break;
          case "keydown":
          case "keyup":
            ao(O, e, E);
        }
        var F;
        if (Ki)
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
          za ? Ls(l, e) && (al = "onCompositionEnd") : l === "keydown" && e.keyCode === 229 && (al = "onCompositionStart");
        al && (Qs && e.locale !== "ko" && (za || al !== "onCompositionStart" ? al === "onCompositionEnd" && za && (F = qs()) : (Se = E, Xi = "value" in Se ? Se.value : Se.textContent, za = !0)), Y = ii(h, al), 0 < Y.length && (al = new Gs(
          al,
          l,
          null,
          e,
          E
        ), O.push({ event: al, listeners: Y }), F ? al.data = F : (F = Ks(e), F !== null && (al.data = F)))), (F = Vv ? Zv(l, e) : Lv(l, e)) && (al = ii(h, "onBeforeInput"), 0 < al.length && (Y = new Gs(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          E
        ), O.push({
          event: Y,
          listeners: al
        }), Y.data = F)), H0(
          O,
          l,
          h,
          e,
          E
        );
      }
      Rr(O, t);
    });
  }
  function Qu(l, t, e) {
    return {
      instance: l,
      listener: t,
      currentTarget: e
    };
  }
  function ii(l, t) {
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
  function G0(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function xr(l, t, e, a, u) {
    for (var n = t._reactName, i = []; e !== null && e !== a; ) {
      var c = e, s = c.alternate, h = c.stateNode;
      if (c = c.tag, s !== null && s === a) break;
      c !== 5 && c !== 26 && c !== 27 || h === null || (s = h, u ? (h = fu(e, n), h != null && i.unshift(
        Qu(e, h, s)
      )) : u || (h = fu(e, n), h != null && i.push(
        Qu(e, h, s)
      ))), e = e.return;
    }
    i.length !== 0 && l.push({ event: t, listeners: i });
  }
  var X0 = /\r\n?/g, Q0 = /\u0000|\uFFFD/g;
  function jr(l) {
    return (typeof l == "string" ? l : "" + l).replace(X0, `
`).replace(Q0, "");
  }
  function Cr(l, t) {
    return t = jr(t), jr(l) === t;
  }
  function El(l, t, e, a, u, n) {
    switch (e) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || Ea(l, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && Ea(l, "" + a);
        break;
      case "className":
        on(l, "class", a);
        break;
      case "tabIndex":
        on(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        on(l, e, a);
        break;
      case "style":
        js(l, a, n);
        break;
      case "data":
        if (t !== "object") {
          on(l, "data", a);
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
        a = rn("" + a), l.setAttribute(e, a);
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
        a = rn("" + a), l.setAttribute(e, a);
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
            throw Error(o(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(o(60));
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
        e = rn("" + a), l.setAttributeNS(
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
        tl("beforetoggle", l), tl("toggle", l), sn(l, "popover", a);
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
        sn(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = hv.get(e) || e, sn(l, e, a));
    }
  }
  function Tf(l, t, e, a, u, n) {
    switch (e) {
      case "style":
        js(l, a, n);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(o(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(o(60));
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
        if (!ps.hasOwnProperty(e))
          l: {
            if (e[0] === "o" && e[1] === "n" && (u = e.endsWith("Capture"), t = e.slice(2, u ? e.length - 7 : void 0), n = l[ot] || null, n = n != null ? n[e] : null, typeof n == "function" && l.removeEventListener(t, n, u), typeof a == "function")) {
              typeof n != "function" && n !== null && (e in l ? l[e] = null : l.hasAttribute(e) && l.removeAttribute(e)), l.addEventListener(t, a, u);
              break l;
            }
            e in l ? l[e] = a : a === !0 ? l.setAttribute(e, "") : sn(l, e, a);
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
                  throw Error(o(137, t));
                default:
                  El(l, t, n, i, e, null);
              }
          }
        u && El(l, t, "srcSet", e.srcSet, e, null), a && El(l, t, "src", e.src, e, null);
        return;
      case "input":
        tl("invalid", l);
        var c = n = i = u = null, s = null, h = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var E = e[a];
            if (E != null)
              switch (a) {
                case "name":
                  u = E;
                  break;
                case "type":
                  i = E;
                  break;
                case "checked":
                  s = E;
                  break;
                case "defaultChecked":
                  h = E;
                  break;
                case "value":
                  n = E;
                  break;
                case "defaultValue":
                  c = E;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (E != null)
                    throw Error(o(137, t));
                  break;
                default:
                  El(l, t, a, E, e, null);
              }
          }
        Ns(
          l,
          n,
          c,
          s,
          h,
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
                if (c != null) throw Error(o(91));
                break;
              default:
                El(l, t, i, c, e, null);
            }
        Us(l, a, u, n);
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
        for (h in e)
          if (e.hasOwnProperty(h) && (a = e[h], a != null))
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, t));
              default:
                El(l, t, h, a, e, null);
            }
        return;
      default:
        if (Hi(t)) {
          for (E in e)
            e.hasOwnProperty(E) && (a = e[E], a !== void 0 && Tf(
              l,
              t,
              E,
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
  function V0(l, t, e, a) {
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
        var u = null, n = null, i = null, c = null, s = null, h = null, E = null;
        for (g in e) {
          var O = e[g];
          if (e.hasOwnProperty(g) && O != null)
            switch (g) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                s = O;
              default:
                a.hasOwnProperty(g) || El(l, t, g, null, a, O);
            }
        }
        for (var y in a) {
          var g = a[y];
          if (O = e[y], a.hasOwnProperty(y) && (g != null || O != null))
            switch (y) {
              case "type":
                n = g;
                break;
              case "name":
                u = g;
                break;
              case "checked":
                h = g;
                break;
              case "defaultChecked":
                E = g;
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
                  throw Error(o(137, t));
                break;
              default:
                g !== O && El(
                  l,
                  t,
                  y,
                  g,
                  a,
                  O
                );
            }
        }
        ji(
          l,
          i,
          c,
          s,
          h,
          E,
          n,
          u
        );
        return;
      case "select":
        g = i = c = y = null;
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
                y = n;
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
        t = c, e = i, a = g, y != null ? ba(l, !!e, y, !1) : !!a != !!e && (t != null ? ba(l, !!e, t, !0) : ba(l, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        g = y = null;
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
                y = u;
                break;
              case "defaultValue":
                g = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(o(91));
                break;
              default:
                u !== n && El(l, t, i, u, a, n);
            }
        Rs(l, y, g);
        return;
      case "option":
        for (var H in e)
          if (y = e[H], e.hasOwnProperty(H) && y != null && !a.hasOwnProperty(H))
            switch (H) {
              case "selected":
                l.selected = !1;
                break;
              default:
                El(
                  l,
                  t,
                  H,
                  null,
                  a,
                  y
                );
            }
        for (s in a)
          if (y = a[s], g = e[s], a.hasOwnProperty(s) && y !== g && (y != null || g != null))
            switch (s) {
              case "selected":
                l.selected = y && typeof y != "function" && typeof y != "symbol";
                break;
              default:
                El(
                  l,
                  t,
                  s,
                  y,
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
          y = e[Z], e.hasOwnProperty(Z) && y != null && !a.hasOwnProperty(Z) && El(l, t, Z, null, a, y);
        for (h in a)
          if (y = a[h], g = e[h], a.hasOwnProperty(h) && y !== g && (y != null || g != null))
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (y != null)
                  throw Error(o(137, t));
                break;
              default:
                El(
                  l,
                  t,
                  h,
                  y,
                  a,
                  g
                );
            }
        return;
      default:
        if (Hi(t)) {
          for (var _l in e)
            y = e[_l], e.hasOwnProperty(_l) && y !== void 0 && !a.hasOwnProperty(_l) && Tf(
              l,
              t,
              _l,
              void 0,
              a,
              y
            );
          for (E in a)
            y = a[E], g = e[E], !a.hasOwnProperty(E) || y === g || y === void 0 && g === void 0 || Tf(
              l,
              t,
              E,
              y,
              a,
              g
            );
          return;
        }
    }
    for (var m in e)
      y = e[m], e.hasOwnProperty(m) && y != null && !a.hasOwnProperty(m) && El(l, t, m, null, a, y);
    for (O in a)
      y = a[O], g = e[O], !a.hasOwnProperty(O) || y === g || y == null && g == null || El(l, t, O, y, a, g);
  }
  function Hr(l) {
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
  function Z0() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, t = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var u = e[a], n = u.transferSize, i = u.initiatorType, c = u.duration;
        if (n && c && Hr(i)) {
          for (i = 0, c = u.responseEnd, a += 1; a < e.length; a++) {
            var s = e[a], h = s.startTime;
            if (h > c) break;
            var E = s.transferSize, O = s.initiatorType;
            E && Hr(O) && (s = s.responseEnd, i += E * (s < c ? 1 : (c - h) / (s - h)));
          }
          if (--a, t += 8 * (n + i) / (u.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var zf = null, pf = null;
  function ci(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function qr(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Br(l, t) {
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
  function Af(l, t) {
    return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Of = null;
  function L0() {
    var l = window.event;
    return l && l.type === "popstate" ? l === Of ? !1 : (Of = l, !0) : (Of = null, !1);
  }
  var Yr = typeof setTimeout == "function" ? setTimeout : void 0, K0 = typeof clearTimeout == "function" ? clearTimeout : void 0, Gr = typeof Promise == "function" ? Promise : void 0, J0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Gr < "u" ? function(l) {
    return Gr.resolve(null).then(l).catch(w0);
  } : Yr;
  function w0(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function He(l) {
    return l === "head";
  }
  function Xr(l, t) {
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
  function Qr(l, t) {
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
  function Df(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var e = t;
      switch (t = t.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Df(e), Ui(e);
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
  function W0(l, t, e, a) {
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
  function $0(l, t, e) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !e || (l = Bt(l.nextSibling), l === null)) return null;
    return l;
  }
  function Vr(l, t) {
    for (; l.nodeType !== 8; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = Bt(l.nextSibling), l === null)) return null;
    return l;
  }
  function Mf(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function Nf(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function F0(l, t) {
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
  var Rf = null;
  function Zr(l) {
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
  function Lr(l) {
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
  function Kr(l, t, e) {
    switch (t = ci(e), l) {
      case "html":
        if (l = t.documentElement, !l) throw Error(o(452));
        return l;
      case "head":
        if (l = t.head, !l) throw Error(o(453));
        return l;
      case "body":
        if (l = t.body, !l) throw Error(o(454));
        return l;
      default:
        throw Error(o(451));
    }
  }
  function Vu(l) {
    for (var t = l.attributes; t.length; )
      l.removeAttributeNode(t[0]);
    Ui(l);
  }
  var Yt = /* @__PURE__ */ new Map(), Jr = /* @__PURE__ */ new Set();
  function fi(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var de = R.d;
  R.d = {
    f: k0,
    r: I0,
    D: P0,
    C: lh,
    L: th,
    m: eh,
    X: uh,
    S: ah,
    M: nh
  };
  function k0() {
    var l = de.f(), t = Pn();
    return l || t;
  }
  function I0(l) {
    var t = ya(l);
    t !== null && t.tag === 5 && t.type === "form" ? sd(t) : de.r(l);
  }
  var Wa = typeof document > "u" ? null : document;
  function wr(l, t, e) {
    var a = Wa;
    if (a && typeof t == "string" && t) {
      var u = Rt(t);
      u = 'link[rel="' + l + '"][href="' + u + '"]', typeof e == "string" && (u += '[crossorigin="' + e + '"]'), Jr.has(u) || (Jr.add(u), l = { rel: l, crossOrigin: e, href: t }, a.querySelector(u) === null && (t = a.createElement("link"), et(t, "link", l), Fl(t), a.head.appendChild(t)));
    }
  }
  function P0(l) {
    de.D(l), wr("dns-prefetch", l, null);
  }
  function lh(l, t) {
    de.C(l, t), wr("preconnect", l, t);
  }
  function th(l, t, e) {
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
  function eh(l, t) {
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
  function ah(l, t, e) {
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
          ), (e = Yt.get(n)) && Uf(l, e);
          var s = i = a.createElement("link");
          Fl(s), et(s, "link", l), s._p = new Promise(function(h, E) {
            s.onload = h, s.onerror = E;
          }), s.addEventListener("load", function() {
            c.loading |= 1;
          }), s.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, si(i, t, a);
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
  function uh(l, t) {
    de.X(l, t);
    var e = Wa;
    if (e && l) {
      var a = ga(e).hoistableScripts, u = Fa(l), n = a.get(u);
      n || (n = e.querySelector(Lu(u)), n || (l = D({ src: l, async: !0 }, t), (t = Yt.get(u)) && xf(l, t), n = e.createElement("script"), Fl(n), et(n, "link", l), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function nh(l, t) {
    de.M(l, t);
    var e = Wa;
    if (e && l) {
      var a = ga(e).hoistableScripts, u = Fa(l), n = a.get(u);
      n || (n = e.querySelector(Lu(u)), n || (l = D({ src: l, async: !0, type: "module" }, t), (t = Yt.get(u)) && xf(l, t), n = e.createElement("script"), Fl(n), et(n, "link", l), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function Wr(l, t, e, a) {
    var u = (u = w.current) ? fi(u) : null;
    if (!u) throw Error(o(446));
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
          }, Yt.set(l, e), n || ih(
            u,
            l,
            e,
            i.state
          ))), t && a === null)
            throw Error(o(528, ""));
          return i;
        }
        if (t && a !== null)
          throw Error(o(529, ""));
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
        throw Error(o(444, l));
    }
  }
  function $a(l) {
    return 'href="' + Rt(l) + '"';
  }
  function Zu(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function $r(l) {
    return D({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function ih(l, t, e, a) {
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
  function Fr(l, t, e) {
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
          ), Fl(a), et(a, "style", u), si(a, e.precedence, l), t.instance = a;
        case "stylesheet":
          u = $a(e.href);
          var n = l.querySelector(
            Zu(u)
          );
          if (n)
            return t.state.loading |= 4, t.instance = n, Fl(n), n;
          a = $r(e), (u = Yt.get(u)) && Uf(a, u), n = (l.ownerDocument || l).createElement("link"), Fl(n);
          var i = n;
          return i._p = new Promise(function(c, s) {
            i.onload = c, i.onerror = s;
          }), et(n, "link", a), t.state.loading |= 4, si(n, e.precedence, l), t.instance = n;
        case "script":
          return n = Fa(e.src), (u = l.querySelector(
            Lu(n)
          )) ? (t.instance = u, Fl(u), u) : (a = e, (u = Yt.get(n)) && (a = D({}, e), xf(a, u)), l = l.ownerDocument || l, u = l.createElement("script"), Fl(u), et(u, "link", a), l.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, si(a, e.precedence, l));
    return t.instance;
  }
  function si(l, t, e) {
    for (var a = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = a.length ? a[a.length - 1] : null, n = u, i = 0; i < a.length; i++) {
      var c = a[i];
      if (c.dataset.precedence === t) n = c;
      else if (n !== u) break;
    }
    n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = e.nodeType === 9 ? e.head : e, t.insertBefore(l, t.firstChild));
  }
  function Uf(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
  }
  function xf(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
  }
  var oi = null;
  function kr(l, t, e) {
    if (oi === null) {
      var a = /* @__PURE__ */ new Map(), u = oi = /* @__PURE__ */ new Map();
      u.set(e, a);
    } else
      u = oi, a = u.get(e), a || (a = /* @__PURE__ */ new Map(), u.set(e, a));
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
  function Ir(l, t, e) {
    l = l.ownerDocument || l, l.head.insertBefore(
      e,
      t === "title" ? l.querySelector("head > title") : null
    );
  }
  function ch(l, t, e) {
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
  function Pr(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function fh(l, t, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var u = $a(a.href), n = t.querySelector(
          Zu(u)
        );
        if (n) {
          t = n._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = di.bind(l), t.then(l, l)), e.state.loading |= 4, e.instance = n, Fl(n);
          return;
        }
        n = t.ownerDocument || t, a = $r(a), (u = Yt.get(u)) && Uf(a, u), n = n.createElement("link"), Fl(n);
        var i = n;
        i._p = new Promise(function(c, s) {
          i.onload = c, i.onerror = s;
        }), et(n, "link", a), e.instance = n;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(e, t), (t = e.state.preload) && (e.state.loading & 3) === 0 && (l.count++, e = di.bind(l), t.addEventListener("load", e), t.addEventListener("error", e));
    }
  }
  var jf = 0;
  function sh(l, t) {
    return l.stylesheets && l.count === 0 && mi(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (l.stylesheets && mi(l, l.stylesheets), l.unsuspend) {
          var n = l.unsuspend;
          l.unsuspend = null, n();
        }
      }, 6e4 + t);
      0 < l.imgBytes && jf === 0 && (jf = 62500 * Z0());
      var u = setTimeout(
        function() {
          if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && mi(l, l.stylesheets), l.unsuspend)) {
            var n = l.unsuspend;
            l.unsuspend = null, n();
          }
        },
        (l.imgBytes > jf ? 50 : 800) + t
      );
      return l.unsuspend = e, function() {
        l.unsuspend = null, clearTimeout(a), clearTimeout(u);
      };
    } : null;
  }
  function di() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) mi(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var ri = null;
  function mi(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, ri = /* @__PURE__ */ new Map(), t.forEach(oh, l), ri = null, di.call(l));
  }
  function oh(l, t) {
    if (!(t.state.loading & 4)) {
      var e = ri.get(l);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), ri.set(l, e);
        for (var u = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), n = 0; n < u.length; n++) {
          var i = u[n];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      u = t.instance, i = u.getAttribute("data-precedence"), n = e.get(i) || a, n === a && e.set(null, u), e.set(i, u), this.count++, a = di.bind(this), u.addEventListener("load", a), u.addEventListener("error", a), n ? n.parentNode.insertBefore(u, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(u, l.firstChild)), t.state.loading |= 4;
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
  function dh(l, t, e, a, u, n, i, c, s) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Di(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Di(0), this.hiddenUpdates = Di(null), this.identifierPrefix = a, this.onUncaughtError = u, this.onCaughtError = n, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = s, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function lm(l, t, e, a, u, n, i, c, s, h, E, O) {
    return l = new dh(
      l,
      t,
      e,
      i,
      s,
      h,
      E,
      O,
      c
    ), t = 1, n === !0 && (t |= 24), n = Tt(3, null, null, t), l.current = n, n.stateNode = l, t = dc(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: t
    }, hc(n), l;
  }
  function tm(l) {
    return l ? (l = Da, l) : Da;
  }
  function em(l, t, e, a, u, n) {
    u = tm(u), a.context === null ? a.context = u : a.pendingContext = u, a = pe(t), a.payload = { element: e }, n = n === void 0 ? null : n, n !== null && (a.callback = n), e = Ae(l, a, t), e !== null && (yt(e, l, t), zu(e, l, t));
  }
  function am(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var e = l.retryLane;
      l.retryLane = e !== 0 && e < t ? e : t;
    }
  }
  function Cf(l, t) {
    am(l, t), (l = l.alternate) && am(l, t);
  }
  function um(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Ie(l, 67108864);
      t !== null && yt(t, l, 67108864), Cf(l, 67108864);
    }
  }
  function nm(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Dt();
      t = Mi(t);
      var e = Ie(l, t);
      e !== null && yt(e, l, t), Cf(l, t);
    }
  }
  var vi = !0;
  function rh(l, t, e, a) {
    var u = S.T;
    S.T = null;
    var n = R.p;
    try {
      R.p = 2, Hf(l, t, e, a);
    } finally {
      R.p = n, S.T = u;
    }
  }
  function mh(l, t, e, a) {
    var u = S.T;
    S.T = null;
    var n = R.p;
    try {
      R.p = 8, Hf(l, t, e, a);
    } finally {
      R.p = n, S.T = u;
    }
  }
  function Hf(l, t, e, a) {
    if (vi) {
      var u = qf(a);
      if (u === null)
        _f(
          l,
          t,
          a,
          hi,
          e
        ), cm(l, a);
      else if (hh(
        u,
        l,
        t,
        e,
        a
      ))
        a.stopPropagation();
      else if (cm(l, a), t & 4 && -1 < vh.indexOf(l)) {
        for (; u !== null; ) {
          var n = ya(u);
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
                    Kt(n), (ml & 6) === 0 && (kn = Ol() + 500, Gu(0));
                  }
                }
                break;
              case 31:
              case 13:
                c = Ie(n, 2), c !== null && yt(c, n, 2), Pn(), Cf(n, 2);
            }
          if (n = qf(a), n === null && _f(
            l,
            t,
            a,
            hi,
            e
          ), n === u) break;
          u = n;
        }
        u !== null && a.stopPropagation();
      } else
        _f(
          l,
          t,
          a,
          null,
          e
        );
    }
  }
  function qf(l) {
    return l = Bi(l), Bf(l);
  }
  var hi = null;
  function Bf(l) {
    if (hi = null, l = ha(l), l !== null) {
      var t = B(l);
      if (t === null) l = null;
      else {
        var e = t.tag;
        if (e === 13) {
          if (l = x(t), l !== null) return l;
          l = null;
        } else if (e === 31) {
          if (l = G(t), l !== null) return l;
          l = null;
        } else if (e === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return hi = l, null;
  }
  function im(l) {
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
          case he:
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
  var Yf = !1, qe = null, Be = null, Ye = null, Ju = /* @__PURE__ */ new Map(), wu = /* @__PURE__ */ new Map(), Ge = [], vh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function cm(l, t) {
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
    }, t !== null && (t = ya(t), t !== null && um(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), l);
  }
  function hh(l, t, e, a, u) {
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
  function fm(l) {
    var t = ha(l.target);
    if (t !== null) {
      var e = B(t);
      if (e !== null) {
        if (t = e.tag, t === 13) {
          if (t = x(e), t !== null) {
            l.blockedOn = t, _s(l.priority, function() {
              nm(e);
            });
            return;
          }
        } else if (t === 31) {
          if (t = G(e), t !== null) {
            l.blockedOn = t, _s(l.priority, function() {
              nm(e);
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
  function yi(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var e = qf(l.nativeEvent);
      if (e === null) {
        e = l.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        qi = a, e.target.dispatchEvent(a), qi = null;
      } else
        return t = ya(e), t !== null && um(t), l.blockedOn = e, !1;
      t.shift();
    }
    return !0;
  }
  function sm(l, t, e) {
    yi(l) && e.delete(t);
  }
  function yh() {
    Yf = !1, qe !== null && yi(qe) && (qe = null), Be !== null && yi(Be) && (Be = null), Ye !== null && yi(Ye) && (Ye = null), Ju.forEach(sm), wu.forEach(sm);
  }
  function gi(l, t) {
    l.blockedOn === t && (l.blockedOn = null, Yf || (Yf = !0, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      yh
    )));
  }
  var Si = null;
  function om(l) {
    Si !== l && (Si = l, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      function() {
        Si === l && (Si = null);
        for (var t = 0; t < l.length; t += 3) {
          var e = l[t], a = l[t + 1], u = l[t + 2];
          if (typeof a != "function") {
            if (Bf(a || e) === null)
              continue;
            break;
          }
          var n = ya(e);
          n !== null && (l.splice(t, 3), t -= 3, Hc(
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
      return gi(s, l);
    }
    qe !== null && gi(qe, l), Be !== null && gi(Be, l), Ye !== null && gi(Ye, l), Ju.forEach(t), wu.forEach(t);
    for (var e = 0; e < Ge.length; e++) {
      var a = Ge[e];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < Ge.length && (e = Ge[0], e.blockedOn === null); )
      fm(e), e.blockedOn === null && Ge.shift();
    if (e = (l.ownerDocument || l).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var u = e[a], n = e[a + 1], i = u[ot] || null;
        if (typeof n == "function")
          i || om(e);
        else if (i) {
          var c = null;
          if (n && n.hasAttribute("formAction")) {
            if (u = n, i = n[ot] || null)
              c = i.formAction;
            else if (Bf(u) !== null) continue;
          } else c = i.action;
          typeof c == "function" ? e[a + 1] = c : (e.splice(a, 3), a -= 3), om(e);
        }
      }
  }
  function dm() {
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
  function Gf(l) {
    this._internalRoot = l;
  }
  bi.prototype.render = Gf.prototype.render = function(l) {
    var t = this._internalRoot;
    if (t === null) throw Error(o(409));
    var e = t.current, a = Dt();
    em(e, a, l, t, null, null);
  }, bi.prototype.unmount = Gf.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      em(l.current, 2, null, l, null, null), Pn(), t[va] = null;
    }
  };
  function bi(l) {
    this._internalRoot = l;
  }
  bi.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = Es();
      l = { blockedOn: null, target: l, priority: t };
      for (var e = 0; e < Ge.length && t !== 0 && t < Ge[e].priority; e++) ;
      Ge.splice(e, 0, l), e === 0 && fm(l);
    }
  };
  var rm = b.version;
  if (rm !== "19.2.6")
    throw Error(
      o(
        527,
        rm,
        "19.2.6"
      )
    );
  R.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function" ? Error(o(188)) : (l = Object.keys(l).join(","), Error(o(268, l)));
    return l = _(t), l = l !== null ? U(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var gh = {
    bundleType: 0,
    version: "19.2.6",
    rendererPackageName: "react-dom",
    currentDispatcherRef: S,
    reconcilerVersion: "19.2.6"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ei = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ei.isDisabled && Ei.supportsFiber)
      try {
        wt = Ei.inject(
          gh
        ), bt = Ei;
      } catch {
      }
  }
  return Fu.createRoot = function(l, t) {
    if (!C(l)) throw Error(o(299));
    var e = !1, a = "", u = bd, n = Ed, i = _d;
    return t != null && (t.unstable_strictMode === !0 && (e = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = lm(
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
      dm
    ), l[va] = t.current, Ef(l), new Gf(t);
  }, Fu.hydrateRoot = function(l, t, e) {
    if (!C(l)) throw Error(o(299));
    var a = !1, u = "", n = bd, i = Ed, c = _d, s = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (u = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (c = e.onRecoverableError), e.formState !== void 0 && (s = e.formState)), t = lm(
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
      dm
    ), t.context = tm(null), e = t.current, a = Dt(), a = Mi(a), u = pe(a), u.callback = null, Ae(e, u, a), e = a, t.current.lanes = e, nu(t, e), Kt(t), l[va] = t.current, Ef(l), new bi(t);
  }, Fu.version = "19.2.6", Fu;
}
var Tm;
function Mh() {
  if (Tm) return Vf.exports;
  Tm = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (b) {
        console.error(b);
      }
  }
  return f(), Vf.exports = Dh(), Vf.exports;
}
var Nh = Mh(), Jf = { exports: {} }, wf = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zm;
function Rh() {
  if (zm) return wf;
  zm = 1;
  var f = pi();
  function b(D, q) {
    return D === q && (D !== 0 || 1 / D === 1 / q) || D !== D && q !== q;
  }
  var A = typeof Object.is == "function" ? Object.is : b, o = f.useState, C = f.useEffect, B = f.useLayoutEffect, x = f.useDebugValue;
  function G(D, q) {
    var $ = q(), il = o({ inst: { value: $, getSnapshot: q } }), k = il[0].inst, vl = il[1];
    return B(
      function() {
        k.value = $, k.getSnapshot = q, M(k) && vl({ inst: k });
      },
      [D, $, q]
    ), C(
      function() {
        return M(k) && vl({ inst: k }), D(function() {
          M(k) && vl({ inst: k });
        });
      },
      [D]
    ), x($), $;
  }
  function M(D) {
    var q = D.getSnapshot;
    D = D.value;
    try {
      var $ = q();
      return !A(D, $);
    } catch {
      return !0;
    }
  }
  function _(D, q) {
    return q();
  }
  var U = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? _ : G;
  return wf.useSyncExternalStore = f.useSyncExternalStore !== void 0 ? f.useSyncExternalStore : U, wf;
}
var pm;
function Uh() {
  return pm || (pm = 1, Jf.exports = Rh()), Jf.exports;
}
var Am = Uh();
const Ym = 0, Gm = 1, Xm = 2, Om = 3;
var Dm = Object.prototype.hasOwnProperty;
function ts(f, b) {
  var A, o;
  if (f === b) return !0;
  if (f && b && (A = f.constructor) === b.constructor) {
    if (A === Date) return f.getTime() === b.getTime();
    if (A === RegExp) return f.toString() === b.toString();
    if (A === Array) {
      if ((o = f.length) === b.length)
        for (; o-- && ts(f[o], b[o]); ) ;
      return o === -1;
    }
    if (!A || typeof f == "object") {
      o = 0;
      for (A in f)
        if (Dm.call(f, A) && ++o && !Dm.call(b, A) || !(A in b) || !ts(f[A], b[A])) return !1;
      return Object.keys(b).length === o;
    }
  }
  return f !== f && b !== b;
}
const re = /* @__PURE__ */ new WeakMap(), me = () => {
}, ut = (
  /*#__NOINLINE__*/
  me()
), es = Object, ul = (f) => f === ut, Jt = (f) => typeof f == "function", Ze = (f, b) => ({
  ...f,
  ...b
}), Qm = (f) => Jt(f.then), Wf = {}, _i = {}, ms = "undefined", tn = typeof window != ms, as = typeof document != ms, xh = tn && "Deno" in window, jh = () => tn && typeof window.requestAnimationFrame != ms, Vm = (f, b) => {
  const A = re.get(f);
  return [
    // Getter
    () => !ul(b) && f.get(b) || Wf,
    // Setter
    (o) => {
      if (!ul(b)) {
        const C = f.get(b);
        b in _i || (_i[b] = C), A[5](b, Ze(C, o), C || Wf);
      }
    },
    // Subscriber
    A[6],
    // Get server cache snapshot
    () => !ul(b) && b in _i ? _i[b] : !ul(b) && f.get(b) || Wf
  ];
};
let us = !0;
const Ch = () => us, [ns, is] = tn && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  me,
  me
], Hh = () => {
  const f = as && document.visibilityState;
  return ul(f) || f !== "hidden";
}, qh = (f) => (as && document.addEventListener("visibilitychange", f), ns("focus", f), () => {
  as && document.removeEventListener("visibilitychange", f), is("focus", f);
}), Bh = (f) => {
  const b = () => {
    us = !0, f();
  }, A = () => {
    us = !1;
  };
  return ns("online", b), ns("offline", A), () => {
    is("online", b), is("offline", A);
  };
}, Yh = {
  isOnline: Ch,
  isVisible: Hh
}, Gh = {
  initFocus: qh,
  initReconnect: Bh
}, Mm = !rs.useId, lu = !tn || xh, Xh = (f) => jh() ? window.requestAnimationFrame(f) : setTimeout(f, 1), $f = lu ? fl.useEffect : fl.useLayoutEffect, Ff = typeof navigator < "u" && navigator.connection, Nm = !lu && Ff && ([
  "slow-2g",
  "2g"
].includes(Ff.effectiveType) || Ff.saveData), Ti = /* @__PURE__ */ new WeakMap(), Qh = (f) => es.prototype.toString.call(f), kf = (f, b) => f === `[object ${b}]`;
let Vh = 0;
const cs = (f) => {
  const b = typeof f, A = Qh(f), o = kf(A, "Date"), C = kf(A, "RegExp"), B = kf(A, "Object");
  let x, G;
  if (es(f) === f && !o && !C) {
    if (x = Ti.get(f), x) return x;
    if (x = ++Vh + "~", Ti.set(f, x), Array.isArray(f)) {
      for (x = "@", G = 0; G < f.length; G++)
        x += cs(f[G]) + ",";
      Ti.set(f, x);
    }
    if (B) {
      x = "#";
      const M = es.keys(f).sort();
      for (; !ul(G = M.pop()); )
        ul(f[G]) || (x += G + ":" + cs(f[G]) + ",");
      Ti.set(f, x);
    }
  } else
    x = o ? f.toJSON() : b == "symbol" ? f.toString() : b == "string" ? JSON.stringify(f) : "" + f;
  return x;
}, vs = (f) => {
  if (Jt(f))
    try {
      f = f();
    } catch {
      f = "";
    }
  const b = f;
  return f = typeof f == "string" ? f : (Array.isArray(f) ? f.length : f) ? cs(f) : "", [
    f,
    b
  ];
};
let Zh = 0;
const fs = () => ++Zh;
async function Zm(...f) {
  const [b, A, o, C] = f, B = Ze({
    populateCache: !0,
    throwOnError: !0
  }, typeof C == "boolean" ? {
    revalidate: C
  } : C || {});
  let x = B.populateCache;
  const G = B.rollbackOnError;
  let M = B.optimisticData;
  const _ = (q) => typeof G == "function" ? G(q) : G !== !1, U = B.throwOnError;
  if (Jt(A)) {
    const q = A, $ = [], il = b.keys();
    for (const k of il)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(k) && q(b.get(k)._k) && $.push(k);
    return Promise.all($.map(D));
  }
  return D(A);
  async function D(q) {
    const [$] = vs(q);
    if (!$) return;
    const [il, k] = Vm(b, $), [vl, Hl, V, Ul] = re.get(b), I = () => {
      const Gl = vl[$];
      return (Jt(B.revalidate) ? B.revalidate(il().data, q) : B.revalidate !== !1) && (delete V[$], delete Ul[$], Gl && Gl[0]) ? Gl[0](Xm).then(() => il().data) : il().data;
    };
    if (f.length < 3)
      return I();
    let gl = o, zl, L = !1;
    const ql = fs();
    Hl[$] = [
      ql,
      0
    ];
    const sl = !ul(M), gt = il(), Bl = gt.data, Yl = gt._c, nt = ul(Yl) ? Bl : Yl;
    if (sl && (M = Jt(M) ? M(nt, Bl) : M, k({
      data: M,
      _c: nt
    })), Jt(gl))
      try {
        gl = gl(nt);
      } catch (Gl) {
        zl = Gl, L = !0;
      }
    if (gl && Qm(gl))
      if (gl = await gl.catch((Gl) => {
        zl = Gl, L = !0;
      }), ql !== Hl[$][0]) {
        if (L) throw zl;
        return gl;
      } else L && sl && _(zl) && (x = !0, k({
        data: nt,
        _c: ut
      }));
    if (x && !L)
      if (Jt(x)) {
        const Gl = x(gl, nt);
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
    if (Hl[$][1] = fs(), Promise.resolve(I()).then(() => {
      k({
        _c: ut
      });
    }), L) {
      if (U) throw zl;
      return;
    }
    return gl;
  }
}
const Rm = (f, b) => {
  for (const A in f)
    f[A][0] && f[A][0](b);
}, Lh = (f, b) => {
  if (!re.has(f)) {
    const A = Ze(Gh, b), o = /* @__PURE__ */ Object.create(null), C = Zm.bind(ut, f);
    let B = me;
    const x = /* @__PURE__ */ Object.create(null), G = (U, D) => {
      const q = x[U] || [];
      return x[U] = q, q.push(D), () => q.splice(q.indexOf(D), 1);
    }, M = (U, D, q) => {
      f.set(U, D);
      const $ = x[U];
      if ($)
        for (const il of $)
          il(D, q);
    }, _ = () => {
      if (!re.has(f) && (re.set(f, [
        o,
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        C,
        M,
        G
      ]), !lu)) {
        const U = A.initFocus(setTimeout.bind(ut, Rm.bind(ut, o, Ym))), D = A.initReconnect(setTimeout.bind(ut, Rm.bind(ut, o, Gm)));
        B = () => {
          U && U(), D && D(), re.delete(f);
        };
      }
    };
    return _(), [
      f,
      C,
      _,
      B
    ];
  }
  return [
    f,
    re.get(f)[4]
  ];
}, Kh = (f, b, A, o, C) => {
  const B = A.errorRetryCount, x = C.retryCount, G = ~~((Math.random() + 0.5) * (1 << (x < 8 ? x : 8))) * A.errorRetryInterval;
  !ul(B) && x > B || setTimeout(o, G, C);
}, Jh = ts, [Lm, wh] = Lh(/* @__PURE__ */ new Map()), Wh = Ze(
  {
    // events
    onLoadingSlow: me,
    onSuccess: me,
    onError: me,
    onErrorRetry: Kh,
    onDiscarded: me,
    // switches
    revalidateOnFocus: !0,
    revalidateOnReconnect: !0,
    revalidateIfStale: !0,
    shouldRetryOnError: !0,
    // timeouts
    errorRetryInterval: Nm ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: Nm ? 5e3 : 3e3,
    // providers
    compare: Jh,
    isPaused: () => !1,
    cache: Lm,
    mutate: wh,
    fallback: {}
  },
  // use web preset by default
  Yh
), $h = (f, b) => {
  const A = Ze(f, b);
  if (b) {
    const { use: o, fallback: C } = f, { use: B, fallback: x } = b;
    o && B && (A.use = o.concat(B)), C && x && (A.fallback = Ze(C, x));
  }
  return A;
}, Fh = fl.createContext({}), kh = "$inf$", Km = tn && window.__SWR_DEVTOOLS_USE__, Ih = Km ? window.__SWR_DEVTOOLS_USE__ : [], Ph = () => {
  Km && (window.__SWR_DEVTOOLS_REACT__ = rs);
}, ly = (f) => Jt(f[1]) ? [
  f[0],
  f[1],
  f[2] || {}
] : [
  f[0],
  null,
  (f[1] === null ? f[2] : f[1]) || {}
], ty = () => {
  const f = fl.useContext(Fh);
  return fl.useMemo(() => Ze(Wh, f), [
    f
  ]);
}, ey = (f) => (b, A, o) => f(b, A && ((...B) => {
  const [x] = vs(b), [, , , G] = re.get(Lm);
  if (x.startsWith(kh))
    return A(...B);
  const M = G[x];
  return ul(M) ? A(...B) : (delete G[x], M);
}), o), ay = Ih.concat(ey), uy = (f) => function(...A) {
  const o = ty(), [C, B, x] = ly(A), G = $h(o, x);
  let M = f;
  const { use: _ } = G, U = (_ || []).concat(ay);
  for (let D = U.length; D--; )
    M = U[D](M);
  return M(C, B || G.fetcher || null, G);
}, ny = (f, b, A) => {
  const o = b[f] || (b[f] = []);
  return o.push(A), () => {
    const C = o.indexOf(A);
    C >= 0 && (o[C] = o[o.length - 1], o.pop());
  };
};
Ph();
const If = rs.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
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
      throw f.status = "pending", f.then((b) => {
        f.status = "fulfilled", f.value = b;
      }, (b) => {
        f.status = "rejected", f.reason = b;
      }), f;
  }
}), Pf = {
  dedupe: !0
}, Um = Promise.resolve(ut), iy = () => me, cy = (f, b, A) => {
  const { cache: o, compare: C, suspense: B, fallbackData: x, revalidateOnMount: G, revalidateIfStale: M, refreshInterval: _, refreshWhenHidden: U, refreshWhenOffline: D, keepPreviousData: q, strictServerPrefetchWarning: $ } = A, [il, k, vl, Hl] = re.get(o), [V, Ul] = vs(f), I = fl.useRef(!1), gl = fl.useRef(!1), zl = fl.useRef(V), L = fl.useRef(b), ql = fl.useRef(A), sl = () => ql.current, gt = () => sl().isVisible() && sl().isOnline(), [Bl, Yl, nt, Gl] = Vm(o, V), $l = fl.useRef({}).current, S = ul(x) ? ul(A.fallback) ? ut : A.fallback[V] : x, R = (Sl, Nl) => {
    for (const pl in $l) {
      const Al = pl;
      if (Al === "data") {
        if (!C(Sl[Al], Nl[Al]) && (!ul(Sl[Al]) || !C(w, Nl[Al])))
          return !1;
      } else if (Nl[Al] !== Sl[Al])
        return !1;
    }
    return !0;
  }, Q = !I.current, rl = fl.useMemo(() => {
    const Sl = Bl(), Nl = Gl(), pl = (Ql) => {
      const Ol = Ze(Ql);
      return delete Ol._k, (() => {
        if (!V || !b || sl().isPaused()) return !1;
        if (Q && !ul(G)) return G;
        const he = ul(S) ? Ol.data : S;
        return ul(he) || M;
      })() ? {
        isValidating: !0,
        isLoading: !0,
        ...Ol
      } : Ol;
    }, Al = pl(Sl), ct = Sl === Nl ? Al : pl(Nl);
    let ft = Al;
    return [
      () => {
        const Ql = pl(Bl());
        return R(Ql, ft) ? (ft.data = Ql.data, ft.isLoading = Ql.isLoading, ft.isValidating = Ql.isValidating, ft.error = Ql.error, ft) : (ft = Ql, Ql);
      },
      () => ct
    ];
  }, [
    o,
    V
  ]), cl = Am.useSyncExternalStore(fl.useCallback(
    (Sl) => nt(V, (Nl, pl) => {
      R(pl, Nl) || Sl();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      o,
      V
    ]
  ), rl[0], rl[1]), r = il[V] && il[V].length > 0, p = cl.data, N = ul(p) ? S && Qm(S) ? If(S) : S : p, j = cl.error, K = fl.useRef(N), w = q ? ul(p) ? ul(K.current) ? N : K.current : p : N, P = V && ul(N), Xl = fl.useRef(null);
  !lu && // getServerSnapshot is only called during hydration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Am.useSyncExternalStore(iy, () => (Xl.current = !1, Xl), () => (Xl.current = !0, Xl));
  const xl = Xl.current;
  $ && xl && !B && P && console.warn(`Missing pre-initiated data for serialized key "${V}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
  const ve = !V || !b || sl().isPaused() || r && !ul(j) ? !1 : Q && !ul(G) ? G : B ? ul(N) ? !1 : M : ul(N) || M, Le = Q && ve, tu = ul(cl.isValidating) ? Le : cl.isValidating, en = ul(cl.isLoading) ? Le : cl.isLoading, St = fl.useCallback(
    async (Sl) => {
      const Nl = L.current;
      if (!V || !Nl || gl.current || sl().isPaused())
        return !1;
      let pl, Al, ct = !0;
      const ft = Sl || {}, Ql = !vl[V] || !ft.dedupe, Ol = () => Mm ? !gl.current && V === zl.current && I.current : V === zl.current, Ke = {
        isValidating: !1,
        isLoading: !1
      }, he = () => {
        Yl(Ke);
      }, eu = () => {
        const st = vl[V];
        st && st[1] === Al && delete vl[V];
      }, Je = {
        isValidating: !0
      };
      ul(Bl().data) && (Je.isLoading = !0);
      try {
        if (Ql && (Yl(Je), A.loadingTimeout && ul(Bl().data) && setTimeout(() => {
          ct && Ol() && sl().onLoadingSlow(V, A);
        }, A.loadingTimeout), vl[V] = [
          Nl(Ul),
          fs()
        ]), [pl, Al] = vl[V], pl = await pl, Ql && setTimeout(eu, A.dedupingInterval), !vl[V] || vl[V][1] !== Al)
          return Ql && Ol() && sl().onDiscarded(V), !1;
        Ke.error = ut;
        const st = k[V];
        if (!ul(st) && // case 1
        (Al <= st[0] || // case 2
        Al <= st[1] || // case 3
        st[1] === 0))
          return he(), Ql && Ol() && sl().onDiscarded(V), !1;
        const Mt = Bl().data;
        Ke.data = C(Mt, pl) ? Mt : pl, Ql && Ol() && sl().onSuccess(pl, V, A);
      } catch (st) {
        eu();
        const Mt = sl(), { shouldRetryOnError: au } = Mt;
        Mt.isPaused() || (Ke.error = st, Ql && Ol() && (Mt.onError(st, V, Mt), (au === !0 || Jt(au) && au(st)) && (!sl().revalidateOnFocus || !sl().revalidateOnReconnect || gt()) && Mt.onErrorRetry(st, V, Mt, (Oi) => {
          const wt = il[V];
          wt && wt[0] && wt[0](Om, Oi);
        }, {
          retryCount: (ft.retryCount || 0) + 1,
          dedupe: !0
        })));
      }
      return ct = !1, he(), !0;
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
      o
    ]
  ), ma = fl.useCallback(
    // Use callback to make sure `keyRef.current` returns latest result every time
    (...Sl) => Zm(o, zl.current, ...Sl),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if ($f(() => {
    L.current = b, ql.current = A, ul(p) || (K.current = p);
  }), $f(() => {
    if (!V) return;
    const Sl = St.bind(ut, Pf);
    let Nl = 0;
    sl().revalidateOnFocus && (Nl = Date.now() + sl().focusThrottleInterval);
    const Al = ny(V, il, (ct, ft = {}) => {
      if (ct == Ym) {
        const Ql = Date.now();
        sl().revalidateOnFocus && Ql > Nl && gt() && (Nl = Ql + sl().focusThrottleInterval, Sl());
      } else if (ct == Gm)
        sl().revalidateOnReconnect && gt() && Sl();
      else {
        if (ct == Xm)
          return St();
        if (ct == Om)
          return St(ft);
      }
    });
    return gl.current = !1, zl.current = V, I.current = !0, Yl({
      _k: Ul
    }), ve && (vl[V] || (ul(N) || lu ? Sl() : Xh(Sl))), () => {
      gl.current = !0, Al();
    };
  }, [
    V
  ]), $f(() => {
    let Sl;
    function Nl() {
      const Al = Jt(_) ? _(Bl().data) : _;
      Al && Sl !== -1 && (Sl = setTimeout(pl, Al));
    }
    function pl() {
      !Bl().error && (U || sl().isVisible()) && (D || sl().isOnline()) ? St(Pf).then(Nl) : Nl();
    }
    return Nl(), () => {
      Sl && (clearTimeout(Sl), Sl = -1);
    };
  }, [
    _,
    U,
    D,
    V
  ]), fl.useDebugValue(w), B) {
    if (!Mm && lu && P)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    P && (L.current = b, ql.current = A, gl.current = !1);
    const Sl = Hl[V], Nl = !ul(Sl) && P ? ma(Sl) : Um;
    if (If(Nl), !ul(j) && P)
      throw j;
    const pl = P ? St(Pf) : Um;
    !ul(w) && P && (pl.status = "fulfilled", pl.value = !0), If(pl);
  }
  return {
    mutate: ma,
    get data() {
      return $l.data = !0, w;
    },
    get error() {
      return $l.error = !0, j;
    },
    get isValidating() {
      return $l.isValidating = !0, tu;
    },
    get isLoading() {
      return $l.isLoading = !0, en;
    }
  };
}, ss = uy(cy), Jm = "/api/v1/extensions/nexus.video.ltx23";
async function Ia(f, b) {
  const A = await fetch(`${Jm}${f}`, {
    headers: { "Content-Type": "application/json", ...b?.headers ?? {} },
    ...b
  });
  if (!A.ok) {
    const o = await A.text();
    throw new Error(`${A.status} ${A.statusText}: ${o}`);
  }
  return await A.json();
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
function fy(f) {
  return `${Jm}/artifacts/${f}`;
}
const sy = "/api/v1", xm = "nexus.video.ltx23";
async function jm(f, b) {
  const A = await fetch(`${sy}${f}`, {
    headers: { "Content-Type": "application/json", ...b?.headers ?? {} },
    ...b
  });
  if (!A.ok) {
    const C = await A.text();
    throw new Error(`${A.status}: ${C}`);
  }
  return (await A.json()).data;
}
const Cm = {
  listDependencies: () => jm(`/extensions/${xm}/dependencies`),
  startInstall: (f = !1) => jm(
    `/extensions/${xm}/install${f ? "?force=true" : ""}`,
    { method: "POST" }
  )
};
var oy = "_1vmg9ib0", Iu = "_1vmg9ib1", Pu = "_1vmg9ib2", dy = "_1vmg9ib3", ra = "_1vmg9ib4", Pa = "_1vmg9ib5", ls = "_1vmg9ib6", ry = "_1vmg9ib7 _1vmg9ib6", Hm = "_1vmg9ib8 _1vmg9ib6", qm = "_1vmg9ib9", wm = "_1vmg9iba", Wm = "_1vmg9ibb _1vmg9iba", my = "_1vmg9ibc _1vmg9iba", hs = "_1vmg9ibd", Qe = "_1vmg9ibe", Ve = "_1vmg9ibf", da = "_1vmg9ibg", $m = "_1vmg9ibi _1vmg9ibh", Fm = "_1vmg9ibj _1vmg9ibh", km = "_1vmg9ibk _1vmg9ibh", Im = "_1vmg9ibl _1vmg9ibh", os = "_1vmg9ibm", ln = "_1vmg9ibn", vy = "_1vmg9ibo", hy = "_1vmg9ibp", ds = "_1vmg9ibr _1vmg9ibq", Pm = "_1vmg9ibs _1vmg9ibq", lv = "_1vmg9ibt _1vmg9ibq", tv = "_1vmg9ibu _1vmg9ibq", yy = "_1vmg9ibv", gy = "_1vmg9ibw", Sy = "_1vmg9ibx", by = "_1vmg9iby", Ey = "_1vmg9ibz _1vmg9iba", Ai = "_1vmg9ib10", _y = "_1vmg9ib11", Ty = "_1vmg9ib12", zy = "_1vmg9ib13", py = "_1vmg9ib14", Ay = "_1vmg9ib15";
const Oy = {
  prompt: "a slow cinematic dolly shot over a futuristic city at dusk",
  duration_seconds: 6,
  runtime_profile: "auto",
  quality_preset: "balanced_16gb"
};
function Dy() {
  const [f, b] = fl.useState(Oy), [A, o] = fl.useState(null), [C, B] = fl.useState(null), [x, G] = fl.useState(!1), [M, _] = fl.useState(null), [U, D] = fl.useState(null), [q, $] = fl.useState(!1), { data: il } = ss(
    "/runtime-profiles",
    () => ku.listProfiles(),
    { revalidateOnFocus: !1 }
  ), { data: k, mutate: vl } = ss(
    M ? `/renders/${M}` : null,
    () => M ? ku.getRender(M) : Promise.resolve(null),
    {
      refreshInterval: (I) => I ? I.status === "completed" || I.status === "failed" || I.status === "cancelled" ? 0 : 600 : 1e3
    }
  ), Hl = fl.useCallback(async () => {
    G(!0), B(null);
    try {
      const I = await ku.plan(f);
      o(I);
    } catch (I) {
      B(I instanceof Error ? I.message : String(I)), o(null);
    } finally {
      G(!1);
    }
  }, [f]), V = fl.useCallback(async () => {
    $(!0), D(null);
    try {
      const I = await ku.createRender(f);
      _(I.id), vl();
    } catch (I) {
      D(I instanceof Error ? I.message : String(I));
    } finally {
      $(!1);
    }
  }, [f, vl]), Ul = fl.useCallback(async () => {
    if (M)
      try {
        await ku.cancel(M), vl();
      } catch (I) {
        console.error("cancel failed", I);
      }
  }, [M, vl]);
  return /* @__PURE__ */ T.jsxs("div", { className: oy, children: [
    /* @__PURE__ */ T.jsxs("div", { className: Ty, children: [
      /* @__PURE__ */ T.jsx(My, {}),
      /* @__PURE__ */ T.jsx(
        Uy,
        {
          draft: f,
          onChange: b,
          profiles: il ?? [],
          onPlan: Hl,
          onSubmit: V,
          planning: x,
          submitting: q,
          plan: A,
          planError: C,
          submitError: U
        }
      )
    ] }),
    /* @__PURE__ */ T.jsx(Cy, { run: k ?? null, onCancel: Ul })
  ] });
}
function My() {
  const [f, b] = fl.useState(!1), [A, o] = fl.useState(null), { data: C, mutate: B } = ss(
    "host:dependencies",
    () => Cm.listDependencies(),
    {
      refreshInterval: (U) => U ? U.steps.some(
        (q) => q.status === "running" || q.status === "pending"
      ) ? 1e3 : 5e3 : 1500
    }
  ), x = fl.useCallback(
    async (U = !1) => {
      b(!0), o(null);
      try {
        await Cm.startInstall(U), B();
      } catch (D) {
        o(D instanceof Error ? D.message : String(D));
      } finally {
        b(!1);
      }
    },
    [B]
  );
  if (!C) return null;
  const G = C.steps.find((U) => U.status === "failed"), M = C.all_satisfied, _ = C.steps.some(
    (U) => U.status === "running" || !M && U.status === "pending"
  );
  return /* @__PURE__ */ T.jsxs("section", { className: Iu, children: [
    /* @__PURE__ */ T.jsxs("div", { className: zy, children: [
      /* @__PURE__ */ T.jsx("h3", { className: Pu, style: { fontSize: "15px" }, children: "Runtime" }),
      /* @__PURE__ */ T.jsx("span", { className: Ny(M, !!G, _), children: M ? "ready" : G ? "install failed" : _ ? "installing…" : "not installed" })
    ] }),
    /* @__PURE__ */ T.jsx("ul", { className: py, children: C.steps.map((U) => /* @__PURE__ */ T.jsxs("li", { className: Ay, children: [
      /* @__PURE__ */ T.jsx("span", { className: Ry(U.status) }),
      /* @__PURE__ */ T.jsx("span", { children: U.id }),
      /* @__PURE__ */ T.jsx("span", { className: Ai, children: U.artifact?.summary ?? U.status })
    ] }, U.id)) }),
    G?.last_error ? /* @__PURE__ */ T.jsxs("div", { className: ln, children: [
      /* @__PURE__ */ T.jsxs("strong", { children: [
        G.id,
        " failed"
      ] }),
      ": ",
      G.last_error.message
    ] }) : null,
    A ? /* @__PURE__ */ T.jsx("div", { className: ln, children: A }) : null,
    !M || G ? /* @__PURE__ */ T.jsxs("div", { className: hs, children: [
      /* @__PURE__ */ T.jsx(
        "button",
        {
          type: "button",
          className: wm,
          disabled: f || _,
          onClick: () => void x(!1),
          children: _ || f ? "Installing…" : "Install runtime"
        }
      ),
      G ? /* @__PURE__ */ T.jsx(
        "button",
        {
          type: "button",
          className: Wm,
          disabled: f || _,
          onClick: () => void x(!0),
          children: "Force reinstall"
        }
      ) : null
    ] }) : null
  ] });
}
function Ny(f, b, A) {
  return b ? Im : f ? $m : A ? Fm : km;
}
function Ry(f) {
  switch (f) {
    case "ok":
      return lv;
    case "running":
      return Pm;
    case "failed":
      return tv;
    default:
      return ds;
  }
}
function Uy({
  draft: f,
  onChange: b,
  profiles: A,
  onPlan: o,
  onSubmit: C,
  planning: B,
  submitting: x,
  plan: G,
  planError: M,
  submitError: _
}) {
  const U = fl.useCallback(
    (D, q) => b({ ...f, [D]: q }),
    [f, b]
  );
  return /* @__PURE__ */ T.jsxs("section", { className: Iu, children: [
    /* @__PURE__ */ T.jsx("h2", { className: Pu, children: "LTX 2.3 Video Generator" }),
    /* @__PURE__ */ T.jsx("p", { className: dy, children: "Prompt-driven video synthesis · external-segments mode · 16 GB safe defaults" }),
    /* @__PURE__ */ T.jsxs("div", { className: ra, children: [
      /* @__PURE__ */ T.jsx("label", { className: Pa, htmlFor: "ltx-prompt", children: "Prompt" }),
      /* @__PURE__ */ T.jsx(
        "textarea",
        {
          id: "ltx-prompt",
          className: ry,
          value: f.prompt,
          onChange: (D) => U("prompt", D.target.value),
          placeholder: "describe the scene…"
        }
      )
    ] }),
    /* @__PURE__ */ T.jsxs("div", { className: ra, children: [
      /* @__PURE__ */ T.jsx("label", { className: Pa, htmlFor: "ltx-neg", children: "Negative prompt (optional)" }),
      /* @__PURE__ */ T.jsx(
        "input",
        {
          id: "ltx-neg",
          className: ls,
          value: f.negative_prompt ?? "",
          onChange: (D) => U(
            "negative_prompt",
            D.target.value.length > 0 ? D.target.value : void 0
          ),
          placeholder: "flicker, watermark, distortion…"
        }
      )
    ] }),
    /* @__PURE__ */ T.jsxs("div", { className: qm, children: [
      /* @__PURE__ */ T.jsxs("div", { className: ra, children: [
        /* @__PURE__ */ T.jsx("label", { className: Pa, htmlFor: "ltx-duration", children: "Duration (s)" }),
        /* @__PURE__ */ T.jsx(
          "input",
          {
            id: "ltx-duration",
            className: ls,
            type: "number",
            min: 1,
            max: 300,
            value: f.duration_seconds,
            onChange: (D) => U(
              "duration_seconds",
              Math.max(1, Math.min(300, Number(D.target.value) || 1))
            )
          }
        )
      ] }),
      /* @__PURE__ */ T.jsxs("div", { className: ra, children: [
        /* @__PURE__ */ T.jsx("label", { className: Pa, htmlFor: "ltx-seed", children: "Seed (optional)" }),
        /* @__PURE__ */ T.jsx(
          "input",
          {
            id: "ltx-seed",
            className: ls,
            type: "number",
            value: f.seed ?? "",
            onChange: (D) => {
              const q = D.target.value;
              U("seed", q === "" ? void 0 : Number(q));
            },
            placeholder: "leave blank for random"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ T.jsxs("div", { className: qm, children: [
      /* @__PURE__ */ T.jsxs("div", { className: ra, children: [
        /* @__PURE__ */ T.jsx("label", { className: Pa, htmlFor: "ltx-runtime", children: "Runtime" }),
        /* @__PURE__ */ T.jsxs(
          "select",
          {
            id: "ltx-runtime",
            className: Hm,
            value: f.runtime_profile,
            onChange: (D) => U(
              "runtime_profile",
              D.target.value
            ),
            children: [
              /* @__PURE__ */ T.jsx("option", { value: "auto", children: "Auto (recommended)" }),
              /* @__PURE__ */ T.jsx("option", { value: "rtx40-fp8", children: "RTX 40 FP8" }),
              /* @__PURE__ */ T.jsx("option", { value: "rtx50-fp8", children: "RTX 50 FP8 (Blackwell)" }),
              /* @__PURE__ */ T.jsx("option", { value: "rtx50-nvfp4", children: "RTX 50 NVFP4 (experimental)" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ T.jsxs("div", { className: ra, children: [
        /* @__PURE__ */ T.jsx("label", { className: Pa, htmlFor: "ltx-quality", children: "Quality" }),
        /* @__PURE__ */ T.jsxs(
          "select",
          {
            id: "ltx-quality",
            className: Hm,
            value: f.quality_preset,
            onChange: (D) => U("quality_preset", D.target.value),
            children: [
              /* @__PURE__ */ T.jsx("option", { value: "draft", children: "Draft (fastest)" }),
              /* @__PURE__ */ T.jsx("option", { value: "balanced_16gb", children: "Balanced 16 GB" }),
              /* @__PURE__ */ T.jsx("option", { value: "quality_16gb", children: "Quality 16 GB" }),
              /* @__PURE__ */ T.jsx("option", { value: "high", children: "High (24 GB+)" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ T.jsx(xy, { profiles: A, selected: f.runtime_profile }),
    /* @__PURE__ */ T.jsxs("div", { className: hs, children: [
      /* @__PURE__ */ T.jsx(
        "button",
        {
          type: "button",
          className: Wm,
          onClick: o,
          disabled: B || x || f.prompt.trim().length === 0,
          children: B ? "Planning…" : "Preview plan"
        }
      ),
      /* @__PURE__ */ T.jsx(
        "button",
        {
          type: "button",
          className: wm,
          onClick: C,
          disabled: x || f.prompt.trim().length === 0,
          children: x ? "Submitting…" : "Generate video"
        }
      )
    ] }),
    M ? /* @__PURE__ */ T.jsx("div", { className: ln, children: M }) : null,
    _ ? /* @__PURE__ */ T.jsx("div", { className: ln, children: _ }) : null,
    G ? /* @__PURE__ */ T.jsx(jy, { plan: G }) : null
  ] });
}
function xy({
  profiles: f,
  selected: b
}) {
  if (f.length === 0) return null;
  const A = b === "auto" ? "nexus.video.ltx23.fake" : `nexus.video.ltx23.${b}`, o = f.find((B) => B.runtime_id === A);
  if (!o) return null;
  const C = o.healthy ? "ok" : "warn";
  return /* @__PURE__ */ T.jsxs("div", { className: os, children: [
    /* @__PURE__ */ T.jsx("strong", { children: o.display_name }),
    ": ",
    o.status_message,
    o.experimental ? " (experimental)" : null
  ] });
}
function jy({ plan: f }) {
  const b = f.vram_risk === "safe" ? $m : f.vram_risk === "moderate" ? Fm : f.vram_risk === "risky" ? km : Im;
  return /* @__PURE__ */ T.jsxs("div", { className: Iu, style: { background: "transparent", padding: 0 }, children: [
    /* @__PURE__ */ T.jsx("h3", { className: Pu, style: { fontSize: "15px" }, children: "Render plan" }),
    /* @__PURE__ */ T.jsxs("div", { className: Qe, children: [
      /* @__PURE__ */ T.jsx("span", { className: Ve, children: "Mode" }),
      /* @__PURE__ */ T.jsx("span", { className: da, children: f.mode })
    ] }),
    /* @__PURE__ */ T.jsxs("div", { className: Qe, children: [
      /* @__PURE__ */ T.jsx("span", { className: Ve, children: "Segments" }),
      /* @__PURE__ */ T.jsx("span", { className: da, children: f.segment_count })
    ] }),
    /* @__PURE__ */ T.jsxs("div", { className: Qe, children: [
      /* @__PURE__ */ T.jsx("span", { className: Ve, children: "Resolution" }),
      /* @__PURE__ */ T.jsxs("span", { className: da, children: [
        f.width,
        "×",
        f.height
      ] })
    ] }),
    /* @__PURE__ */ T.jsxs("div", { className: Qe, children: [
      /* @__PURE__ */ T.jsx("span", { className: Ve, children: "FPS" }),
      /* @__PURE__ */ T.jsxs("span", { className: da, children: [
        f.base_fps,
        " → ",
        f.output_fps,
        " (",
        f.interpolation,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ T.jsxs("div", { className: Qe, children: [
      /* @__PURE__ */ T.jsx("span", { className: Ve, children: "Duration" }),
      /* @__PURE__ */ T.jsxs("span", { className: da, children: [
        f.requested_duration_seconds.toFixed(1),
        "s"
      ] })
    ] }),
    /* @__PURE__ */ T.jsxs("div", { className: Qe, children: [
      /* @__PURE__ */ T.jsx("span", { className: Ve, children: "VRAM budget" }),
      /* @__PURE__ */ T.jsxs("span", { className: da, children: [
        f.gpu_memory_budget_mb,
        " MB"
      ] })
    ] }),
    /* @__PURE__ */ T.jsxs("div", { className: Qe, children: [
      /* @__PURE__ */ T.jsx("span", { className: Ve, children: "VRAM risk" }),
      /* @__PURE__ */ T.jsx("span", { className: b, children: f.vram_risk })
    ] }),
    /* @__PURE__ */ T.jsxs("div", { className: Qe, children: [
      /* @__PURE__ */ T.jsx("span", { className: Ve, children: "Runtime" }),
      /* @__PURE__ */ T.jsx("span", { className: da, children: f.runtime_profile })
    ] }),
    f.warnings.length > 0 ? /* @__PURE__ */ T.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: f.warnings.map((A) => /* @__PURE__ */ T.jsxs("div", { className: os, children: [
      /* @__PURE__ */ T.jsx("strong", { children: A.code }),
      ": ",
      A.message
    ] }, A.code)) }) : null
  ] });
}
function Cy({
  run: f,
  onCancel: b
}) {
  if (!f)
    return /* @__PURE__ */ T.jsxs("section", { className: Iu, children: [
      /* @__PURE__ */ T.jsx("h2", { className: Pu, children: "Output" }),
      /* @__PURE__ */ T.jsx("p", { className: _y, children: "No render in progress yet. Configure the form on the left and press “Generate video”." })
    ] });
  const A = f.status === "completed" || f.status === "failed" || f.status === "cancelled";
  return /* @__PURE__ */ T.jsxs("section", { className: Iu, children: [
    /* @__PURE__ */ T.jsxs("h2", { className: Pu, children: [
      "Render ",
      Gy(f.id)
    ] }),
    /* @__PURE__ */ T.jsxs("p", { className: Ai, children: [
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
    /* @__PURE__ */ T.jsx(Hy, { run: f }),
    f.error_code ? /* @__PURE__ */ T.jsxs("div", { className: ln, children: [
      /* @__PURE__ */ T.jsx("strong", { children: f.error_code }),
      ":",
      " ",
      f.error_message ?? "unknown error"
    ] }) : null,
    /* @__PURE__ */ T.jsx(qy, { segments: f.segments }),
    f.status === "completed" && f.final_artifact_id ? /* @__PURE__ */ T.jsx(Yy, { artifactId: f.final_artifact_id }) : null,
    A ? null : /* @__PURE__ */ T.jsx("div", { className: hs, children: /* @__PURE__ */ T.jsx(
      "button",
      {
        type: "button",
        className: my,
        onClick: b,
        children: "Cancel"
      }
    ) })
  ] });
}
function Hy({ run: f }) {
  return /* @__PURE__ */ T.jsxs("div", { className: ra, children: [
    /* @__PURE__ */ T.jsxs(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13
        },
        children: [
          /* @__PURE__ */ T.jsx("span", { children: /* @__PURE__ */ T.jsx("strong", { children: f.status }) }),
          /* @__PURE__ */ T.jsxs("span", { children: [
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
    /* @__PURE__ */ T.jsx("div", { className: yy, children: /* @__PURE__ */ T.jsx(
      "div",
      {
        className: gy,
        style: { width: `${Math.max(2, f.progress_percent)}%` }
      }
    ) })
  ] });
}
function qy({
  segments: f
}) {
  return /* @__PURE__ */ T.jsx("div", { className: vy, children: f.map((b) => /* @__PURE__ */ T.jsxs("div", { className: hy, children: [
    /* @__PURE__ */ T.jsx("span", { className: By(b.status) }),
    /* @__PURE__ */ T.jsxs("span", { children: [
      "Segment ",
      b.index + 1,
      " · ",
      b.duration_seconds.toFixed(1),
      "s"
    ] }),
    /* @__PURE__ */ T.jsx("span", { className: Ai, children: b.status })
  ] }, b.index)) });
}
function By(f) {
  switch (f) {
    case "queued":
      return ds;
    case "rendering":
      return Pm;
    case "completed":
      return lv;
    case "failed":
      return tv;
    default:
      return ds;
  }
}
function Yy({ artifactId: f }) {
  const b = fy(f);
  return /* @__PURE__ */ T.jsxs("div", { className: Sy, children: [
    /* @__PURE__ */ T.jsx("video", { className: by, src: b, controls: !0, preload: "metadata" }),
    /* @__PURE__ */ T.jsx(
      "a",
      {
        className: Ey,
        href: b,
        download: `${f}.mp4`,
        children: "Download MP4"
      }
    ),
    /* @__PURE__ */ T.jsxs("p", { className: Ai, children: [
      "artifact: ",
      f
    ] })
  ] });
}
function Gy(f) {
  return f.length > 12 ? `${f.slice(0, 6)}…${f.slice(-4)}` : f;
}
const zi = "ltx23-video-app", Bm = "ltx23-video-stylesheet";
function Xy() {
  if (typeof document > "u" || document.getElementById(Bm)) return;
  const f = new URL("./ltx23-video.css", import.meta.url).href, b = document.createElement("link");
  b.id = Bm, b.rel = "stylesheet", b.href = f, document.head.appendChild(b);
}
Xy();
class ev extends HTMLElement {
  root = null;
  connectedCallback() {
    this.root = Nh.createRoot(this), this.paint();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null;
  }
  paint() {
    this.root && this.root.render(
      /* @__PURE__ */ T.jsx(fl.StrictMode, { children: /* @__PURE__ */ T.jsx(Dy, {}) })
    );
  }
}
customElements.get(zi) || customElements.define(zi, ev);
function Qy() {
  customElements.get(zi) || customElements.define(zi, ev);
}
export {
  Qy as register
};
//# sourceMappingURL=ltx23-video.js.map
