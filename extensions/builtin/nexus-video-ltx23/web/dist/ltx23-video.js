function T0(f) {
  return f && f.__esModule && Object.prototype.hasOwnProperty.call(f, "default") ? f.default : f;
}
var Zf = { exports: {} }, Fu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hm;
function z0() {
  if (hm) return Fu;
  hm = 1;
  var f = Symbol.for("react.transitional.element"), S = Symbol.for("react.fragment");
  function _(o, U, C) {
    var M = null;
    if (C !== void 0 && (M = "" + C), U.key !== void 0 && (M = "" + U.key), "key" in U) {
      C = {};
      for (var Y in U)
        Y !== "key" && (C[Y] = U[Y]);
    } else C = U;
    return U = C.ref, {
      $$typeof: f,
      type: o,
      key: M,
      ref: U !== void 0 ? U : null,
      props: C
    };
  }
  return Fu.Fragment = S, Fu.jsx = _, Fu.jsxs = _, Fu;
}
var ym;
function A0() {
  return ym || (ym = 1, Zf.exports = z0()), Zf.exports;
}
var g = A0(), Kf = { exports: {} }, J = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gm;
function O0() {
  if (gm) return J;
  gm = 1;
  var f = Symbol.for("react.transitional.element"), S = Symbol.for("react.portal"), _ = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), U = Symbol.for("react.profiler"), C = Symbol.for("react.consumer"), M = Symbol.for("react.context"), Y = Symbol.for("react.forward_ref"), D = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), N = Symbol.for("react.activity"), H = Symbol.iterator;
  function $(d) {
    return d === null || typeof d != "object" ? null : (d = H && d[H] || d["@@iterator"], typeof d == "function" ? d : null);
  }
  var cl = {
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
  function Hl(d, A, R) {
    this.props = d, this.context = A, this.refs = vl, this.updater = R || cl;
  }
  Hl.prototype.isReactComponent = {}, Hl.prototype.setState = function(d, A) {
    if (typeof d != "object" && typeof d != "function" && d != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, d, A, "setState");
  }, Hl.prototype.forceUpdate = function(d) {
    this.updater.enqueueForceUpdate(this, d, "forceUpdate");
  };
  function V() {
  }
  V.prototype = Hl.prototype;
  function xl(d, A, R) {
    this.props = d, this.context = A, this.refs = vl, this.updater = R || cl;
  }
  var I = xl.prototype = new V();
  I.constructor = xl, k(I, Hl.prototype), I.isPureReactComponent = !0;
  var gl = Array.isArray;
  function Tl() {
  }
  var Z = { H: null, A: null, T: null, S: null }, ql = Object.prototype.hasOwnProperty;
  function sl(d, A, R) {
    var q = R.ref;
    return {
      $$typeof: f,
      type: d,
      key: A,
      ref: q !== void 0 ? q : null,
      props: R
    };
  }
  function St(d, A) {
    return sl(d.type, A, d.props);
  }
  function Bl(d) {
    return typeof d == "object" && d !== null && d.$$typeof === f;
  }
  function Yl(d) {
    var A = { "=": "=0", ":": "=2" };
    return "$" + d.replace(/[=:]/g, function(R) {
      return A[R];
    });
  }
  var nt = /\/+/g;
  function Gl(d, A) {
    return typeof d == "object" && d !== null && d.key != null ? Yl("" + d.key) : A.toString(36);
  }
  function $l(d) {
    switch (d.status) {
      case "fulfilled":
        return d.value;
      case "rejected":
        throw d.reason;
      default:
        switch (typeof d.status == "string" ? d.then(Tl, Tl) : (d.status = "pending", d.then(
          function(A) {
            d.status === "pending" && (d.status = "fulfilled", d.value = A);
          },
          function(A) {
            d.status === "pending" && (d.status = "rejected", d.reason = A);
          }
        )), d.status) {
          case "fulfilled":
            return d.value;
          case "rejected":
            throw d.reason;
        }
    }
    throw d;
  }
  function E(d, A, R, q, K) {
    var w = typeof d;
    (w === "undefined" || w === "boolean") && (d = null);
    var P = !1;
    if (d === null) P = !0;
    else
      switch (w) {
        case "bigint":
        case "string":
        case "number":
          P = !0;
          break;
        case "object":
          switch (d.$$typeof) {
            case f:
            case S:
              P = !0;
              break;
            case x:
              return P = d._init, E(
                P(d._payload),
                A,
                R,
                q,
                K
              );
          }
      }
    if (P)
      return K = K(d), P = q === "" ? "." + Gl(d, 0) : q, gl(K) ? (R = "", P != null && (R = P.replace(nt, "$&/") + "/"), E(K, A, R, "", function(ye) {
        return ye;
      })) : K != null && (Bl(K) && (K = St(
        K,
        R + (K.key == null || d && d.key === K.key ? "" : ("" + K.key).replace(
          nt,
          "$&/"
        ) + "/") + P
      )), A.push(K)), 1;
    P = 0;
    var Xl = q === "" ? "." : q + ":";
    if (gl(d))
      for (var jl = 0; jl < d.length; jl++)
        q = d[jl], w = Xl + Gl(q, jl), P += E(
          q,
          A,
          R,
          w,
          K
        );
    else if (jl = $(d), typeof jl == "function")
      for (d = jl.call(d), jl = 0; !(q = d.next()).done; )
        q = q.value, w = Xl + Gl(q, jl++), P += E(
          q,
          A,
          R,
          w,
          K
        );
    else if (w === "object") {
      if (typeof d.then == "function")
        return E(
          $l(d),
          A,
          R,
          q,
          K
        );
      throw A = String(d), Error(
        "Objects are not valid as a React child (found: " + (A === "[object Object]" ? "object with keys {" + Object.keys(d).join(", ") + "}" : A) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return P;
  }
  function j(d, A, R) {
    if (d == null) return d;
    var q = [], K = 0;
    return E(d, q, "", "", function(w) {
      return A.call(R, w, K++);
    }), q;
  }
  function Q(d) {
    if (d._status === -1) {
      var A = d._result;
      A = A(), A.then(
        function(R) {
          (d._status === 0 || d._status === -1) && (d._status = 1, d._result = R);
        },
        function(R) {
          (d._status === 0 || d._status === -1) && (d._status = 2, d._result = R);
        }
      ), d._status === -1 && (d._status = 0, d._result = A);
    }
    if (d._status === 1) return d._result.default;
    throw d._result;
  }
  var dl = typeof reportError == "function" ? reportError : function(d) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var A = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof d == "object" && d !== null && typeof d.message == "string" ? String(d.message) : String(d),
        error: d
      });
      if (!window.dispatchEvent(A)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", d);
      return;
    }
    console.error(d);
  }, fl = {
    map: j,
    forEach: function(d, A, R) {
      j(
        d,
        function() {
          A.apply(this, arguments);
        },
        R
      );
    },
    count: function(d) {
      var A = 0;
      return j(d, function() {
        A++;
      }), A;
    },
    toArray: function(d) {
      return j(d, function(A) {
        return A;
      }) || [];
    },
    only: function(d) {
      if (!Bl(d))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return d;
    }
  };
  return J.Activity = N, J.Children = fl, J.Component = Hl, J.Fragment = _, J.Profiler = U, J.PureComponent = xl, J.StrictMode = o, J.Suspense = D, J.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Z, J.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(d) {
      return Z.H.useMemoCache(d);
    }
  }, J.cache = function(d) {
    return function() {
      return d.apply(null, arguments);
    };
  }, J.cacheSignal = function() {
    return null;
  }, J.cloneElement = function(d, A, R) {
    if (d == null)
      throw Error(
        "The argument must be a React element, but you passed " + d + "."
      );
    var q = k({}, d.props), K = d.key;
    if (A != null)
      for (w in A.key !== void 0 && (K = "" + A.key), A)
        !ql.call(A, w) || w === "key" || w === "__self" || w === "__source" || w === "ref" && A.ref === void 0 || (q[w] = A[w]);
    var w = arguments.length - 2;
    if (w === 1) q.children = R;
    else if (1 < w) {
      for (var P = Array(w), Xl = 0; Xl < w; Xl++)
        P[Xl] = arguments[Xl + 2];
      q.children = P;
    }
    return sl(d.type, K, q);
  }, J.createContext = function(d) {
    return d = {
      $$typeof: M,
      _currentValue: d,
      _currentValue2: d,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, d.Provider = d, d.Consumer = {
      $$typeof: C,
      _context: d
    }, d;
  }, J.createElement = function(d, A, R) {
    var q, K = {}, w = null;
    if (A != null)
      for (q in A.key !== void 0 && (w = "" + A.key), A)
        ql.call(A, q) && q !== "key" && q !== "__self" && q !== "__source" && (K[q] = A[q]);
    var P = arguments.length - 2;
    if (P === 1) K.children = R;
    else if (1 < P) {
      for (var Xl = Array(P), jl = 0; jl < P; jl++)
        Xl[jl] = arguments[jl + 2];
      K.children = Xl;
    }
    if (d && d.defaultProps)
      for (q in P = d.defaultProps, P)
        K[q] === void 0 && (K[q] = P[q]);
    return sl(d, w, K);
  }, J.createRef = function() {
    return { current: null };
  }, J.forwardRef = function(d) {
    return { $$typeof: Y, render: d };
  }, J.isValidElement = Bl, J.lazy = function(d) {
    return {
      $$typeof: x,
      _payload: { _status: -1, _result: d },
      _init: Q
    };
  }, J.memo = function(d, A) {
    return {
      $$typeof: p,
      type: d,
      compare: A === void 0 ? null : A
    };
  }, J.startTransition = function(d) {
    var A = Z.T, R = {};
    Z.T = R;
    try {
      var q = d(), K = Z.S;
      K !== null && K(R, q), typeof q == "object" && q !== null && typeof q.then == "function" && q.then(Tl, dl);
    } catch (w) {
      dl(w);
    } finally {
      A !== null && R.types !== null && (A.types = R.types), Z.T = A;
    }
  }, J.unstable_useCacheRefresh = function() {
    return Z.H.useCacheRefresh();
  }, J.use = function(d) {
    return Z.H.use(d);
  }, J.useActionState = function(d, A, R) {
    return Z.H.useActionState(d, A, R);
  }, J.useCallback = function(d, A) {
    return Z.H.useCallback(d, A);
  }, J.useContext = function(d) {
    return Z.H.useContext(d);
  }, J.useDebugValue = function() {
  }, J.useDeferredValue = function(d, A) {
    return Z.H.useDeferredValue(d, A);
  }, J.useEffect = function(d, A) {
    return Z.H.useEffect(d, A);
  }, J.useEffectEvent = function(d) {
    return Z.H.useEffectEvent(d);
  }, J.useId = function() {
    return Z.H.useId();
  }, J.useImperativeHandle = function(d, A, R) {
    return Z.H.useImperativeHandle(d, A, R);
  }, J.useInsertionEffect = function(d, A) {
    return Z.H.useInsertionEffect(d, A);
  }, J.useLayoutEffect = function(d, A) {
    return Z.H.useLayoutEffect(d, A);
  }, J.useMemo = function(d, A) {
    return Z.H.useMemo(d, A);
  }, J.useOptimistic = function(d, A) {
    return Z.H.useOptimistic(d, A);
  }, J.useReducer = function(d, A, R) {
    return Z.H.useReducer(d, A, R);
  }, J.useRef = function(d) {
    return Z.H.useRef(d);
  }, J.useState = function(d) {
    return Z.H.useState(d);
  }, J.useSyncExternalStore = function(d, A, R) {
    return Z.H.useSyncExternalStore(
      d,
      A,
      R
    );
  }, J.useTransition = function() {
    return Z.H.useTransition();
  }, J.version = "19.2.6", J;
}
var Sm;
function Di() {
  return Sm || (Sm = 1, Kf.exports = O0()), Kf.exports;
}
var ll = Di();
const vs = /* @__PURE__ */ T0(ll);
var Jf = { exports: {} }, ku = {}, wf = { exports: {} }, Wf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bm;
function N0() {
  return bm || (bm = 1, (function(f) {
    function S(E, j) {
      var Q = E.length;
      E.push(j);
      l: for (; 0 < Q; ) {
        var dl = Q - 1 >>> 1, fl = E[dl];
        if (0 < U(fl, j))
          E[dl] = j, E[Q] = fl, Q = dl;
        else break l;
      }
    }
    function _(E) {
      return E.length === 0 ? null : E[0];
    }
    function o(E) {
      if (E.length === 0) return null;
      var j = E[0], Q = E.pop();
      if (Q !== j) {
        E[0] = Q;
        l: for (var dl = 0, fl = E.length, d = fl >>> 1; dl < d; ) {
          var A = 2 * (dl + 1) - 1, R = E[A], q = A + 1, K = E[q];
          if (0 > U(R, Q))
            q < fl && 0 > U(K, R) ? (E[dl] = K, E[q] = Q, dl = q) : (E[dl] = R, E[A] = Q, dl = A);
          else if (q < fl && 0 > U(K, Q))
            E[dl] = K, E[q] = Q, dl = q;
          else break l;
        }
      }
      return j;
    }
    function U(E, j) {
      var Q = E.sortIndex - j.sortIndex;
      return Q !== 0 ? Q : E.id - j.id;
    }
    if (f.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var C = performance;
      f.unstable_now = function() {
        return C.now();
      };
    } else {
      var M = Date, Y = M.now();
      f.unstable_now = function() {
        return M.now() - Y;
      };
    }
    var D = [], p = [], x = 1, N = null, H = 3, $ = !1, cl = !1, k = !1, vl = !1, Hl = typeof setTimeout == "function" ? setTimeout : null, V = typeof clearTimeout == "function" ? clearTimeout : null, xl = typeof setImmediate < "u" ? setImmediate : null;
    function I(E) {
      for (var j = _(p); j !== null; ) {
        if (j.callback === null) o(p);
        else if (j.startTime <= E)
          o(p), j.sortIndex = j.expirationTime, S(D, j);
        else break;
        j = _(p);
      }
    }
    function gl(E) {
      if (k = !1, I(E), !cl)
        if (_(D) !== null)
          cl = !0, Tl || (Tl = !0, Yl());
        else {
          var j = _(p);
          j !== null && $l(gl, j.startTime - E);
        }
    }
    var Tl = !1, Z = -1, ql = 5, sl = -1;
    function St() {
      return vl ? !0 : !(f.unstable_now() - sl < ql);
    }
    function Bl() {
      if (vl = !1, Tl) {
        var E = f.unstable_now();
        sl = E;
        var j = !0;
        try {
          l: {
            cl = !1, k && (k = !1, V(Z), Z = -1), $ = !0;
            var Q = H;
            try {
              t: {
                for (I(E), N = _(D); N !== null && !(N.expirationTime > E && St()); ) {
                  var dl = N.callback;
                  if (typeof dl == "function") {
                    N.callback = null, H = N.priorityLevel;
                    var fl = dl(
                      N.expirationTime <= E
                    );
                    if (E = f.unstable_now(), typeof fl == "function") {
                      N.callback = fl, I(E), j = !0;
                      break t;
                    }
                    N === _(D) && o(D), I(E);
                  } else o(D);
                  N = _(D);
                }
                if (N !== null) j = !0;
                else {
                  var d = _(p);
                  d !== null && $l(
                    gl,
                    d.startTime - E
                  ), j = !1;
                }
              }
              break l;
            } finally {
              N = null, H = Q, $ = !1;
            }
            j = void 0;
          }
        } finally {
          j ? Yl() : Tl = !1;
        }
      }
    }
    var Yl;
    if (typeof xl == "function")
      Yl = function() {
        xl(Bl);
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
    function $l(E, j) {
      Z = Hl(function() {
        E(f.unstable_now());
      }, j);
    }
    f.unstable_IdlePriority = 5, f.unstable_ImmediatePriority = 1, f.unstable_LowPriority = 4, f.unstable_NormalPriority = 3, f.unstable_Profiling = null, f.unstable_UserBlockingPriority = 2, f.unstable_cancelCallback = function(E) {
      E.callback = null;
    }, f.unstable_forceFrameRate = function(E) {
      0 > E || 125 < E ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : ql = 0 < E ? Math.floor(1e3 / E) : 5;
    }, f.unstable_getCurrentPriorityLevel = function() {
      return H;
    }, f.unstable_next = function(E) {
      switch (H) {
        case 1:
        case 2:
        case 3:
          var j = 3;
          break;
        default:
          j = H;
      }
      var Q = H;
      H = j;
      try {
        return E();
      } finally {
        H = Q;
      }
    }, f.unstable_requestPaint = function() {
      vl = !0;
    }, f.unstable_runWithPriority = function(E, j) {
      switch (E) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          E = 3;
      }
      var Q = H;
      H = E;
      try {
        return j();
      } finally {
        H = Q;
      }
    }, f.unstable_scheduleCallback = function(E, j, Q) {
      var dl = f.unstable_now();
      switch (typeof Q == "object" && Q !== null ? (Q = Q.delay, Q = typeof Q == "number" && 0 < Q ? dl + Q : dl) : Q = dl, E) {
        case 1:
          var fl = -1;
          break;
        case 2:
          fl = 250;
          break;
        case 5:
          fl = 1073741823;
          break;
        case 4:
          fl = 1e4;
          break;
        default:
          fl = 5e3;
      }
      return fl = Q + fl, E = {
        id: x++,
        callback: j,
        priorityLevel: E,
        startTime: Q,
        expirationTime: fl,
        sortIndex: -1
      }, Q > dl ? (E.sortIndex = Q, S(p, E), _(D) === null && E === _(p) && (k ? (V(Z), Z = -1) : k = !0, $l(gl, Q - dl))) : (E.sortIndex = fl, S(D, E), cl || $ || (cl = !0, Tl || (Tl = !0, Yl()))), E;
    }, f.unstable_shouldYield = St, f.unstable_wrapCallback = function(E) {
      var j = H;
      return function() {
        var Q = H;
        H = j;
        try {
          return E.apply(this, arguments);
        } finally {
          H = Q;
        }
      };
    };
  })(Wf)), Wf;
}
var _m;
function D0() {
  return _m || (_m = 1, wf.exports = N0()), wf.exports;
}
var $f = { exports: {} }, at = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Em;
function M0() {
  if (Em) return at;
  Em = 1;
  var f = Di();
  function S(D) {
    var p = "https://react.dev/errors/" + D;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var x = 2; x < arguments.length; x++)
        p += "&args[]=" + encodeURIComponent(arguments[x]);
    }
    return "Minified React error #" + D + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function _() {
  }
  var o = {
    d: {
      f: _,
      r: function() {
        throw Error(S(522));
      },
      D: _,
      C: _,
      L: _,
      m: _,
      X: _,
      S: _,
      M: _
    },
    p: 0,
    findDOMNode: null
  }, U = Symbol.for("react.portal");
  function C(D, p, x) {
    var N = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: U,
      key: N == null ? null : "" + N,
      children: D,
      containerInfo: p,
      implementation: x
    };
  }
  var M = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function Y(D, p) {
    if (D === "font") return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return at.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, at.createPortal = function(D, p) {
    var x = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(S(299));
    return C(D, p, null, x);
  }, at.flushSync = function(D) {
    var p = M.T, x = o.p;
    try {
      if (M.T = null, o.p = 2, D) return D();
    } finally {
      M.T = p, o.p = x, o.d.f();
    }
  }, at.preconnect = function(D, p) {
    typeof D == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, o.d.C(D, p));
  }, at.prefetchDNS = function(D) {
    typeof D == "string" && o.d.D(D);
  }, at.preinit = function(D, p) {
    if (typeof D == "string" && p && typeof p.as == "string") {
      var x = p.as, N = Y(x, p.crossOrigin), H = typeof p.integrity == "string" ? p.integrity : void 0, $ = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      x === "style" ? o.d.S(
        D,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: N,
          integrity: H,
          fetchPriority: $
        }
      ) : x === "script" && o.d.X(D, {
        crossOrigin: N,
        integrity: H,
        fetchPriority: $,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, at.preinitModule = function(D, p) {
    if (typeof D == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var x = Y(
            p.as,
            p.crossOrigin
          );
          o.d.M(D, {
            crossOrigin: x,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0
          });
        }
      } else p == null && o.d.M(D);
  }, at.preload = function(D, p) {
    if (typeof D == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var x = p.as, N = Y(x, p.crossOrigin);
      o.d.L(D, x, {
        crossOrigin: N,
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
  }, at.preloadModule = function(D, p) {
    if (typeof D == "string")
      if (p) {
        var x = Y(p.as, p.crossOrigin);
        o.d.m(D, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: x,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else o.d.m(D);
  }, at.requestFormReset = function(D) {
    o.d.r(D);
  }, at.unstable_batchedUpdates = function(D, p) {
    return D(p);
  }, at.useFormState = function(D, p, x) {
    return M.H.useFormState(D, p, x);
  }, at.useFormStatus = function() {
    return M.H.useHostTransitionStatus();
  }, at.version = "19.2.6", at;
}
var pm;
function R0() {
  if (pm) return $f.exports;
  pm = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (S) {
        console.error(S);
      }
  }
  return f(), $f.exports = M0(), $f.exports;
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
var Tm;
function x0() {
  if (Tm) return ku;
  Tm = 1;
  var f = D0(), S = Di(), _ = R0();
  function o(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        t += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function U(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function C(l) {
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
  function M(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function Y(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function D(l) {
    if (C(l) !== l)
      throw Error(o(188));
  }
  function p(l) {
    var t = l.alternate;
    if (!t) {
      if (t = C(l), t === null) throw Error(o(188));
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
          if (n === e) return D(u), l;
          if (n === a) return D(u), t;
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
  function x(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (t = x(l), t !== null) return t;
      l = l.sibling;
    }
    return null;
  }
  var N = Object.assign, H = Symbol.for("react.element"), $ = Symbol.for("react.transitional.element"), cl = Symbol.for("react.portal"), k = Symbol.for("react.fragment"), vl = Symbol.for("react.strict_mode"), Hl = Symbol.for("react.profiler"), V = Symbol.for("react.consumer"), xl = Symbol.for("react.context"), I = Symbol.for("react.forward_ref"), gl = Symbol.for("react.suspense"), Tl = Symbol.for("react.suspense_list"), Z = Symbol.for("react.memo"), ql = Symbol.for("react.lazy"), sl = Symbol.for("react.activity"), St = Symbol.for("react.memo_cache_sentinel"), Bl = Symbol.iterator;
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
      case Tl:
        return "SuspenseList";
      case sl:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case cl:
          return "Portal";
        case xl:
          return l.displayName || "Context";
        case V:
          return (l._context.displayName || "Context") + ".Consumer";
        case I:
          var t = l.render;
          return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case Z:
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
  var $l = Array.isArray, E = S.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, j = _.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, dl = [], fl = -1;
  function d(l) {
    return { current: l };
  }
  function A(l) {
    0 > fl || (l.current = dl[fl], dl[fl] = null, fl--);
  }
  function R(l, t) {
    fl++, dl[fl] = l.current, l.current = t;
  }
  var q = d(null), K = d(null), w = d(null), P = d(null);
  function Xl(l, t) {
    switch (R(w, t), R(K, l), R(q, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? Yd(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI)
          t = Yd(t), l = Gd(t, l);
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
    A(q), R(q, l);
  }
  function jl() {
    A(q), A(K), A(w);
  }
  function ye(l) {
    l.memoizedState !== null && R(P, l);
    var t = q.current, e = Gd(t, l.type);
    t !== e && (R(K, l), R(q, e));
  }
  function We(l) {
    K.current === l && (A(q), A(K)), P.current === l && (A(P), Ju._currentValue = Q);
  }
  var eu, nn;
  function bt(l) {
    if (eu === void 0)
      try {
        throw Error();
      } catch (e) {
        var t = e.stack.trim().match(/\n( *(at )?)/);
        eu = t && t[1] || "", nn = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + eu + l + nn;
  }
  var ya = !1;
  function cn(l, t) {
    if (!l || ya) return "";
    ya = !0;
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
                } catch (b) {
                  var y = b;
                }
                Reflect.construct(l, [], O);
              } else {
                try {
                  O.call();
                } catch (b) {
                  y = b;
                }
                l.call(O.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (b) {
                y = b;
              }
              (O = l()) && typeof O.catch == "function" && O.catch(function() {
              });
            }
          } catch (b) {
            if (b && y && typeof b.stack == "string")
              return [b.stack, y.stack];
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
                  var T = `
` + s[a].replace(" at new ", " at ");
                  return l.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", l.displayName)), T;
                }
              while (1 <= a && 0 <= u);
            break;
          }
      }
    } finally {
      ya = !1, Error.prepareStackTrace = e;
    }
    return (e = l ? l.displayName || l.name : "") ? bt(e) : "";
  }
  function Sl(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return bt(l.type);
      case 16:
        return bt("Lazy");
      case 13:
        return l.child !== t && t !== null ? bt("Suspense Fallback") : bt("Suspense");
      case 19:
        return bt("SuspenseList");
      case 0:
      case 15:
        return cn(l.type, !1);
      case 11:
        return cn(l.type.render, !1);
      case 1:
        return cn(l.type, !0);
      case 31:
        return bt("Activity");
      default:
        return "";
    }
  }
  function Ml(l) {
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
  var zl = Object.prototype.hasOwnProperty, Al = f.unstable_scheduleCallback, ct = f.unstable_cancelCallback, ft = f.unstable_shouldYield, Ql = f.unstable_requestPaint, Ol = f.unstable_now, $e = f.unstable_getCurrentPriorityLevel, ge = f.unstable_ImmediatePriority, au = f.unstable_UserBlockingPriority, Fe = f.unstable_NormalPriority, st = f.unstable_LowPriority, Mt = f.unstable_IdlePriority, uu = f.log, Ri = f.unstable_setDisableYieldValue, Wt = null, _t = null;
  function Se(l) {
    if (typeof uu == "function" && Ri(l), _t && typeof _t.setStrictMode == "function")
      try {
        _t.setStrictMode(Wt, l);
      } catch {
      }
  }
  var Et = Math.clz32 ? Math.clz32 : sv, cv = Math.log, fv = Math.LN2;
  function sv(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (cv(l) / fv | 0) | 0;
  }
  var fn = 256, sn = 262144, on = 4194304;
  function ke(l) {
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
  function rn(l, t, e) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var u = 0, n = l.suspendedLanes, i = l.pingedLanes;
    l = l.warmLanes;
    var c = a & 134217727;
    return c !== 0 ? (a = c & ~n, a !== 0 ? u = ke(a) : (i &= c, i !== 0 ? u = ke(i) : e || (e = c & ~l, e !== 0 && (u = ke(e))))) : (c = a & ~n, c !== 0 ? u = ke(c) : i !== 0 ? u = ke(i) : e || (e = a & ~l, e !== 0 && (u = ke(e)))), u === 0 ? 0 : t !== 0 && t !== u && (t & n) === 0 && (n = u & -u, e = t & -t, n >= e || n === 32 && (e & 4194048) !== 0) ? t : u;
  }
  function nu(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function ov(l, t) {
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
  function Ss() {
    var l = on;
    return on <<= 1, (on & 62914560) === 0 && (on = 4194304), l;
  }
  function xi(l) {
    for (var t = [], e = 0; 31 > e; e++) t.push(l);
    return t;
  }
  function iu(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function rv(l, t, e, a, u, n) {
    var i = l.pendingLanes;
    l.pendingLanes = e, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= e, l.entangledLanes &= e, l.errorRecoveryDisabledLanes &= e, l.shellSuspendCounter = 0;
    var c = l.entanglements, s = l.expirationTimes, h = l.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var T = 31 - Et(e), O = 1 << T;
      c[T] = 0, s[T] = -1;
      var y = h[T];
      if (y !== null)
        for (h[T] = null, T = 0; T < y.length; T++) {
          var b = y[T];
          b !== null && (b.lane &= -536870913);
        }
      e &= ~O;
    }
    a !== 0 && bs(l, a, 0), n !== 0 && u === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(i & ~t));
  }
  function bs(l, t, e) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var a = 31 - Et(t);
    l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | e & 261930;
  }
  function _s(l, t) {
    var e = l.entangledLanes |= t;
    for (l = l.entanglements; e; ) {
      var a = 31 - Et(e), u = 1 << a;
      u & t | l[a] & t && (l[a] |= t), e &= ~u;
    }
  }
  function Es(l, t) {
    var e = t & -t;
    return e = (e & 42) !== 0 ? 1 : ji(e), (e & (l.suspendedLanes | t)) !== 0 ? 0 : e;
  }
  function ji(l) {
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
  function Ui(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ps() {
    var l = j.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : fm(l.type));
  }
  function Ts(l, t) {
    var e = j.p;
    try {
      return j.p = l, t();
    } finally {
      j.p = e;
    }
  }
  var be = Math.random().toString(36).slice(2), Il = "__reactFiber$" + be, ot = "__reactProps$" + be, ga = "__reactContainer$" + be, Ci = "__reactEvents$" + be, dv = "__reactListeners$" + be, mv = "__reactHandles$" + be, zs = "__reactResources$" + be, cu = "__reactMarker$" + be;
  function Hi(l) {
    delete l[Il], delete l[ot], delete l[Ci], delete l[dv], delete l[mv];
  }
  function Sa(l) {
    var t = l[Il];
    if (t) return t;
    for (var e = l.parentNode; e; ) {
      if (t = e[ga] || e[Il]) {
        if (e = t.alternate, t.child !== null || e !== null && e.child !== null)
          for (l = Jd(l); l !== null; ) {
            if (e = l[Il]) return e;
            l = Jd(l);
          }
        return t;
      }
      l = e, e = l.parentNode;
    }
    return null;
  }
  function ba(l) {
    if (l = l[Il] || l[ga]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return l;
    }
    return null;
  }
  function fu(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(o(33));
  }
  function _a(l) {
    var t = l[zs];
    return t || (t = l[zs] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Fl(l) {
    l[cu] = !0;
  }
  var As = /* @__PURE__ */ new Set(), Os = {};
  function Ie(l, t) {
    Ea(l, t), Ea(l + "Capture", t);
  }
  function Ea(l, t) {
    for (Os[l] = t, l = 0; l < t.length; l++)
      As.add(t[l]);
  }
  var vv = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Ns = {}, Ds = {};
  function hv(l) {
    return zl.call(Ds, l) ? !0 : zl.call(Ns, l) ? !1 : vv.test(l) ? Ds[l] = !0 : (Ns[l] = !0, !1);
  }
  function dn(l, t, e) {
    if (hv(t))
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
  function mn(l, t, e) {
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
  function $t(l, t, e, a) {
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
  function Rt(l) {
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
  function Ms(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function yv(l, t, e) {
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
  function qi(l) {
    if (!l._valueTracker) {
      var t = Ms(l) ? "checked" : "value";
      l._valueTracker = yv(
        l,
        t,
        "" + l[t]
      );
    }
  }
  function Rs(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var e = t.getValue(), a = "";
    return l && (a = Ms(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== e ? (t.setValue(l), !0) : !1;
  }
  function vn(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var gv = /[\n"\\]/g;
  function xt(l) {
    return l.replace(
      gv,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Bi(l, t, e, a, u, n, i, c) {
    l.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? l.type = i : l.removeAttribute("type"), t != null ? i === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + Rt(t)) : l.value !== "" + Rt(t) && (l.value = "" + Rt(t)) : i !== "submit" && i !== "reset" || l.removeAttribute("value"), t != null ? Yi(l, i, Rt(t)) : e != null ? Yi(l, i, Rt(e)) : a != null && l.removeAttribute("value"), u == null && n != null && (l.defaultChecked = !!n), u != null && (l.checked = u && typeof u != "function" && typeof u != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.name = "" + Rt(c) : l.removeAttribute("name");
  }
  function xs(l, t, e, a, u, n, i, c) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || e != null) {
      if (!(n !== "submit" && n !== "reset" || t != null)) {
        qi(l);
        return;
      }
      e = e != null ? "" + Rt(e) : "", t = t != null ? "" + Rt(t) : e, c || t === l.value || (l.value = t), l.defaultValue = t;
    }
    a = a ?? u, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = c ? l.checked : !!a, l.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (l.name = i), qi(l);
  }
  function Yi(l, t, e) {
    t === "number" && vn(l.ownerDocument) === l || l.defaultValue === "" + e || (l.defaultValue = "" + e);
  }
  function pa(l, t, e, a) {
    if (l = l.options, t) {
      t = {};
      for (var u = 0; u < e.length; u++)
        t["$" + e[u]] = !0;
      for (e = 0; e < l.length; e++)
        u = t.hasOwnProperty("$" + l[e].value), l[e].selected !== u && (l[e].selected = u), u && a && (l[e].defaultSelected = !0);
    } else {
      for (e = "" + Rt(e), t = null, u = 0; u < l.length; u++) {
        if (l[u].value === e) {
          l[u].selected = !0, a && (l[u].defaultSelected = !0);
          return;
        }
        t !== null || l[u].disabled || (t = l[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function js(l, t, e) {
    if (t != null && (t = "" + Rt(t), t !== l.value && (l.value = t), e == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = e != null ? "" + Rt(e) : "";
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
    e = Rt(t), l.defaultValue = e, a = l.textContent, a === e && a !== "" && a !== null && (l.value = a), qi(l);
  }
  function Ta(l, t) {
    if (t) {
      var e = l.firstChild;
      if (e && e === l.lastChild && e.nodeType === 3) {
        e.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var Sv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Cs(l, t, e) {
    var a = t.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, e) : typeof e != "number" || e === 0 || Sv.has(t) ? t === "float" ? l.cssFloat = e : l[t] = ("" + e).trim() : l[t] = e + "px";
  }
  function Hs(l, t, e) {
    if (t != null && typeof t != "object")
      throw Error(o(62));
    if (l = l.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
      for (var u in t)
        a = t[u], t.hasOwnProperty(u) && e[u] !== a && Cs(l, u, a);
    } else
      for (var n in t)
        t.hasOwnProperty(n) && Cs(l, n, t[n]);
  }
  function Gi(l) {
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
  var bv = /* @__PURE__ */ new Map([
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
  ]), _v = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function hn(l) {
    return _v.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function Ft() {
  }
  var Xi = null;
  function Qi(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var za = null, Aa = null;
  function qs(l) {
    var t = ba(l);
    if (t && (l = t.stateNode)) {
      var e = l[ot] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if (Bi(
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
              'input[name="' + xt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < e.length; t++) {
              var a = e[t];
              if (a !== l && a.form === l.form) {
                var u = a[ot] || null;
                if (!u) throw Error(o(90));
                Bi(
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
              a = e[t], a.form === l.form && Rs(a);
          }
          break l;
        case "textarea":
          js(l, e.value, e.defaultValue);
          break l;
        case "select":
          t = e.value, t != null && pa(l, !!e.multiple, t, !1);
      }
    }
  }
  var Vi = !1;
  function Bs(l, t, e) {
    if (Vi) return l(t, e);
    Vi = !0;
    try {
      var a = l(t);
      return a;
    } finally {
      if (Vi = !1, (za !== null || Aa !== null) && (ei(), za && (t = za, l = Aa, Aa = za = null, qs(t), l)))
        for (t = 0; t < l.length; t++) qs(l[t]);
    }
  }
  function su(l, t) {
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
  var kt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Li = !1;
  if (kt)
    try {
      var ou = {};
      Object.defineProperty(ou, "passive", {
        get: function() {
          Li = !0;
        }
      }), window.addEventListener("test", ou, ou), window.removeEventListener("test", ou, ou);
    } catch {
      Li = !1;
    }
  var _e = null, Zi = null, yn = null;
  function Ys() {
    if (yn) return yn;
    var l, t = Zi, e = t.length, a, u = "value" in _e ? _e.value : _e.textContent, n = u.length;
    for (l = 0; l < e && t[l] === u[l]; l++) ;
    var i = e - l;
    for (a = 1; a <= i && t[e - a] === u[n - a]; a++) ;
    return yn = u.slice(l, 1 < a ? 1 - a : void 0);
  }
  function gn(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function Sn() {
    return !0;
  }
  function Gs() {
    return !1;
  }
  function rt(l) {
    function t(e, a, u, n, i) {
      this._reactName = e, this._targetInst = u, this.type = a, this.nativeEvent = n, this.target = i, this.currentTarget = null;
      for (var c in l)
        l.hasOwnProperty(c) && (e = l[c], this[c] = e ? e(n) : n[c]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? Sn : Gs, this.isPropagationStopped = Gs, this;
    }
    return N(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Sn);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Sn);
      },
      persist: function() {
      },
      isPersistent: Sn
    }), t;
  }
  var Pe = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, bn = rt(Pe), ru = N({}, Pe, { view: 0, detail: 0 }), Ev = rt(ru), Ki, Ji, du, _n = N({}, ru, {
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
    getModifierState: Wi,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== du && (du && l.type === "mousemove" ? (Ki = l.screenX - du.screenX, Ji = l.screenY - du.screenY) : Ji = Ki = 0, du = l), Ki);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : Ji;
    }
  }), Xs = rt(_n), pv = N({}, _n, { dataTransfer: 0 }), Tv = rt(pv), zv = N({}, ru, { relatedTarget: 0 }), wi = rt(zv), Av = N({}, Pe, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Ov = rt(Av), Nv = N({}, Pe, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), Dv = rt(Nv), Mv = N({}, Pe, { data: 0 }), Qs = rt(Mv), Rv = {
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
  }, xv = {
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
  }, jv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Uv(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = jv[l]) ? !!t[l] : !1;
  }
  function Wi() {
    return Uv;
  }
  var Cv = N({}, ru, {
    key: function(l) {
      if (l.key) {
        var t = Rv[l.key] || l.key;
        if (t !== "Unidentified") return t;
      }
      return l.type === "keypress" ? (l = gn(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? xv[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Wi,
    charCode: function(l) {
      return l.type === "keypress" ? gn(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? gn(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), Hv = rt(Cv), qv = N({}, _n, {
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
  }), Vs = rt(qv), Bv = N({}, ru, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Wi
  }), Yv = rt(Bv), Gv = N({}, Pe, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Xv = rt(Gv), Qv = N({}, _n, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Vv = rt(Qv), Lv = N({}, Pe, {
    newState: 0,
    oldState: 0
  }), Zv = rt(Lv), Kv = [9, 13, 27, 32], $i = kt && "CompositionEvent" in window, mu = null;
  kt && "documentMode" in document && (mu = document.documentMode);
  var Jv = kt && "TextEvent" in window && !mu, Ls = kt && (!$i || mu && 8 < mu && 11 >= mu), Zs = " ", Ks = !1;
  function Js(l, t) {
    switch (l) {
      case "keyup":
        return Kv.indexOf(t.keyCode) !== -1;
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
  function ws(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var Oa = !1;
  function wv(l, t) {
    switch (l) {
      case "compositionend":
        return ws(t);
      case "keypress":
        return t.which !== 32 ? null : (Ks = !0, Zs);
      case "textInput":
        return l = t.data, l === Zs && Ks ? null : l;
      default:
        return null;
    }
  }
  function Wv(l, t) {
    if (Oa)
      return l === "compositionend" || !$i && Js(l, t) ? (l = Ys(), yn = Zi = _e = null, Oa = !1, l) : null;
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
        return Ls && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var $v = {
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
  function Ws(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!$v[l.type] : t === "textarea";
  }
  function $s(l, t, e, a) {
    za ? Aa ? Aa.push(a) : Aa = [a] : za = a, t = si(t, "onChange"), 0 < t.length && (e = new bn(
      "onChange",
      "change",
      null,
      e,
      a
    ), l.push({ event: e, listeners: t }));
  }
  var vu = null, hu = null;
  function Fv(l) {
    jd(l, 0);
  }
  function En(l) {
    var t = fu(l);
    if (Rs(t)) return l;
  }
  function Fs(l, t) {
    if (l === "change") return t;
  }
  var ks = !1;
  if (kt) {
    var Fi;
    if (kt) {
      var ki = "oninput" in document;
      if (!ki) {
        var Is = document.createElement("div");
        Is.setAttribute("oninput", "return;"), ki = typeof Is.oninput == "function";
      }
      Fi = ki;
    } else Fi = !1;
    ks = Fi && (!document.documentMode || 9 < document.documentMode);
  }
  function Ps() {
    vu && (vu.detachEvent("onpropertychange", lo), hu = vu = null);
  }
  function lo(l) {
    if (l.propertyName === "value" && En(hu)) {
      var t = [];
      $s(
        t,
        hu,
        l,
        Qi(l)
      ), Bs(Fv, t);
    }
  }
  function kv(l, t, e) {
    l === "focusin" ? (Ps(), vu = t, hu = e, vu.attachEvent("onpropertychange", lo)) : l === "focusout" && Ps();
  }
  function Iv(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return En(hu);
  }
  function Pv(l, t) {
    if (l === "click") return En(t);
  }
  function lh(l, t) {
    if (l === "input" || l === "change")
      return En(t);
  }
  function th(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var pt = typeof Object.is == "function" ? Object.is : th;
  function yu(l, t) {
    if (pt(l, t)) return !0;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null)
      return !1;
    var e = Object.keys(l), a = Object.keys(t);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var u = e[a];
      if (!zl.call(t, u) || !pt(l[u], t[u]))
        return !1;
    }
    return !0;
  }
  function to(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function eo(l, t) {
    var e = to(l);
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
      e = to(e);
    }
  }
  function ao(l, t) {
    return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ao(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function uo(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = vn(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var e = typeof t.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) l = t.contentWindow;
      else break;
      t = vn(l.document);
    }
    return t;
  }
  function Ii(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var eh = kt && "documentMode" in document && 11 >= document.documentMode, Na = null, Pi = null, gu = null, lc = !1;
  function no(l, t, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    lc || Na == null || Na !== vn(a) || (a = Na, "selectionStart" in a && Ii(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), gu && yu(gu, a) || (gu = a, a = si(Pi, "onSelect"), 0 < a.length && (t = new bn(
      "onSelect",
      "select",
      null,
      t,
      e
    ), l.push({ event: t, listeners: a }), t.target = Na)));
  }
  function la(l, t) {
    var e = {};
    return e[l.toLowerCase()] = t.toLowerCase(), e["Webkit" + l] = "webkit" + t, e["Moz" + l] = "moz" + t, e;
  }
  var Da = {
    animationend: la("Animation", "AnimationEnd"),
    animationiteration: la("Animation", "AnimationIteration"),
    animationstart: la("Animation", "AnimationStart"),
    transitionrun: la("Transition", "TransitionRun"),
    transitionstart: la("Transition", "TransitionStart"),
    transitioncancel: la("Transition", "TransitionCancel"),
    transitionend: la("Transition", "TransitionEnd")
  }, tc = {}, io = {};
  kt && (io = document.createElement("div").style, "AnimationEvent" in window || (delete Da.animationend.animation, delete Da.animationiteration.animation, delete Da.animationstart.animation), "TransitionEvent" in window || delete Da.transitionend.transition);
  function ta(l) {
    if (tc[l]) return tc[l];
    if (!Da[l]) return l;
    var t = Da[l], e;
    for (e in t)
      if (t.hasOwnProperty(e) && e in io)
        return tc[l] = t[e];
    return l;
  }
  var co = ta("animationend"), fo = ta("animationiteration"), so = ta("animationstart"), ah = ta("transitionrun"), uh = ta("transitionstart"), nh = ta("transitioncancel"), oo = ta("transitionend"), ro = /* @__PURE__ */ new Map(), ec = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  ec.push("scrollEnd");
  function Xt(l, t) {
    ro.set(l, t), Ie(t, [l]);
  }
  var pn = typeof reportError == "function" ? reportError : function(l) {
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
  }, jt = [], Ma = 0, ac = 0;
  function Tn() {
    for (var l = Ma, t = ac = Ma = 0; t < l; ) {
      var e = jt[t];
      jt[t++] = null;
      var a = jt[t];
      jt[t++] = null;
      var u = jt[t];
      jt[t++] = null;
      var n = jt[t];
      if (jt[t++] = null, a !== null && u !== null) {
        var i = a.pending;
        i === null ? u.next = u : (u.next = i.next, i.next = u), a.pending = u;
      }
      n !== 0 && mo(e, u, n);
    }
  }
  function zn(l, t, e, a) {
    jt[Ma++] = l, jt[Ma++] = t, jt[Ma++] = e, jt[Ma++] = a, ac |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
  }
  function uc(l, t, e, a) {
    return zn(l, t, e, a), An(l);
  }
  function ea(l, t) {
    return zn(l, null, null, t), An(l);
  }
  function mo(l, t, e) {
    l.lanes |= e;
    var a = l.alternate;
    a !== null && (a.lanes |= e);
    for (var u = !1, n = l.return; n !== null; )
      n.childLanes |= e, a = n.alternate, a !== null && (a.childLanes |= e), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (u = !0)), l = n, n = n.return;
    return l.tag === 3 ? (n = l.stateNode, u && t !== null && (u = 31 - Et(e), l = n.hiddenUpdates, a = l[u], a === null ? l[u] = [t] : a.push(t), t.lane = e | 536870912), n) : null;
  }
  function An(l) {
    if (50 < Gu)
      throw Gu = 0, vf = null, Error(o(185));
    for (var t = l.return; t !== null; )
      l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var Ra = {};
  function ih(l, t, e, a) {
    this.tag = l, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Tt(l, t, e, a) {
    return new ih(l, t, e, a);
  }
  function nc(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function It(l, t) {
    var e = l.alternate;
    return e === null ? (e = Tt(
      l.tag,
      t,
      l.key,
      l.mode
    ), e.elementType = l.elementType, e.type = l.type, e.stateNode = l.stateNode, e.alternate = l, l.alternate = e) : (e.pendingProps = t, e.type = l.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = l.flags & 65011712, e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, t = l.dependencies, e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, e.sibling = l.sibling, e.index = l.index, e.ref = l.ref, e.refCleanup = l.refCleanup, e;
  }
  function vo(l, t) {
    l.flags &= 65011714;
    var e = l.alternate;
    return e === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, l.type = e.type, t = e.dependencies, l.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), l;
  }
  function On(l, t, e, a, u, n) {
    var i = 0;
    if (a = l, typeof l == "function") nc(l) && (i = 1);
    else if (typeof l == "string")
      i = r0(
        l,
        e,
        q.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      l: switch (l) {
        case sl:
          return l = Tt(31, e, t, u), l.elementType = sl, l.lanes = n, l;
        case k:
          return aa(e.children, u, n, t);
        case vl:
          i = 8, u |= 24;
          break;
        case Hl:
          return l = Tt(12, e, t, u | 2), l.elementType = Hl, l.lanes = n, l;
        case gl:
          return l = Tt(13, e, t, u), l.elementType = gl, l.lanes = n, l;
        case Tl:
          return l = Tt(19, e, t, u), l.elementType = Tl, l.lanes = n, l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case xl:
                i = 10;
                break l;
              case V:
                i = 9;
                break l;
              case I:
                i = 11;
                break l;
              case Z:
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
  function aa(l, t, e, a) {
    return l = Tt(7, l, a, t), l.lanes = e, l;
  }
  function ic(l, t, e) {
    return l = Tt(6, l, null, t), l.lanes = e, l;
  }
  function ho(l) {
    var t = Tt(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function cc(l, t, e) {
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
  var yo = /* @__PURE__ */ new WeakMap();
  function Ut(l, t) {
    if (typeof l == "object" && l !== null) {
      var e = yo.get(l);
      return e !== void 0 ? e : (t = {
        value: l,
        source: t,
        stack: Ml(t)
      }, yo.set(l, t), t);
    }
    return {
      value: l,
      source: t,
      stack: Ml(t)
    };
  }
  var xa = [], ja = 0, Nn = null, Su = 0, Ct = [], Ht = 0, Ee = null, Lt = 1, Zt = "";
  function Pt(l, t) {
    xa[ja++] = Su, xa[ja++] = Nn, Nn = l, Su = t;
  }
  function go(l, t, e) {
    Ct[Ht++] = Lt, Ct[Ht++] = Zt, Ct[Ht++] = Ee, Ee = l;
    var a = Lt;
    l = Zt;
    var u = 32 - Et(a) - 1;
    a &= ~(1 << u), e += 1;
    var n = 32 - Et(t) + u;
    if (30 < n) {
      var i = u - u % 5;
      n = (a & (1 << i) - 1).toString(32), a >>= i, u -= i, Lt = 1 << 32 - Et(t) + u | e << u | a, Zt = n + l;
    } else
      Lt = 1 << n | e << u | a, Zt = l;
  }
  function fc(l) {
    l.return !== null && (Pt(l, 1), go(l, 1, 0));
  }
  function sc(l) {
    for (; l === Nn; )
      Nn = xa[--ja], xa[ja] = null, Su = xa[--ja], xa[ja] = null;
    for (; l === Ee; )
      Ee = Ct[--Ht], Ct[Ht] = null, Zt = Ct[--Ht], Ct[Ht] = null, Lt = Ct[--Ht], Ct[Ht] = null;
  }
  function So(l, t) {
    Ct[Ht++] = Lt, Ct[Ht++] = Zt, Ct[Ht++] = Ee, Lt = t.id, Zt = t.overflow, Ee = l;
  }
  var Pl = null, Nl = null, il = !1, pe = null, qt = !1, oc = Error(o(519));
  function Te(l) {
    var t = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw bu(Ut(t, l)), oc;
  }
  function bo(l) {
    var t = l.stateNode, e = l.type, a = l.memoizedProps;
    switch (t[Il] = l, t[ot] = a, e) {
      case "dialog":
        el("cancel", t), el("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        el("load", t);
        break;
      case "video":
      case "audio":
        for (e = 0; e < Qu.length; e++)
          el(Qu[e], t);
        break;
      case "source":
        el("error", t);
        break;
      case "img":
      case "image":
      case "link":
        el("error", t), el("load", t);
        break;
      case "details":
        el("toggle", t);
        break;
      case "input":
        el("invalid", t), xs(
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
        el("invalid", t);
        break;
      case "textarea":
        el("invalid", t), Us(t, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || t.textContent === "" + e || a.suppressHydrationWarning === !0 || qd(t.textContent, e) ? (a.popover != null && (el("beforetoggle", t), el("toggle", t)), a.onScroll != null && el("scroll", t), a.onScrollEnd != null && el("scrollend", t), a.onClick != null && (t.onclick = Ft), t = !0) : t = !1, t || Te(l, !0);
  }
  function _o(l) {
    for (Pl = l.return; Pl; )
      switch (Pl.tag) {
        case 5:
        case 31:
        case 13:
          qt = !1;
          return;
        case 27:
        case 3:
          qt = !0;
          return;
        default:
          Pl = Pl.return;
      }
  }
  function Ua(l) {
    if (l !== Pl) return !1;
    if (!il) return _o(l), il = !0, !1;
    var t = l.tag, e;
    if ((e = t !== 3 && t !== 27) && ((e = t === 5) && (e = l.type, e = !(e !== "form" && e !== "button") || Mf(l.type, l.memoizedProps)), e = !e), e && Nl && Te(l), _o(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(317));
      Nl = Kd(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(317));
      Nl = Kd(l);
    } else
      t === 27 ? (t = Nl, Be(l.type) ? (l = Cf, Cf = null, Nl = l) : Nl = t) : Nl = Pl ? Yt(l.stateNode.nextSibling) : null;
    return !0;
  }
  function ua() {
    Nl = Pl = null, il = !1;
  }
  function rc() {
    var l = pe;
    return l !== null && (ht === null ? ht = l : ht.push.apply(
      ht,
      l
    ), pe = null), l;
  }
  function bu(l) {
    pe === null ? pe = [l] : pe.push(l);
  }
  var dc = d(null), na = null, le = null;
  function ze(l, t, e) {
    R(dc, t._currentValue), t._currentValue = e;
  }
  function te(l) {
    l._currentValue = dc.current, A(dc);
  }
  function mc(l, t, e) {
    for (; l !== null; ) {
      var a = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === e) break;
      l = l.return;
    }
  }
  function vc(l, t, e, a) {
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
              n.lanes |= e, c = n.alternate, c !== null && (c.lanes |= e), mc(
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
        i.lanes |= e, n = i.alternate, n !== null && (n.lanes |= e), mc(i, e, l), i = null;
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
  function Ca(l, t, e, a) {
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
          pt(u.pendingProps.value, i.value) || (l !== null ? l.push(c) : l = [c]);
        }
      } else if (u === P.current) {
        if (i = u.alternate, i === null) throw Error(o(387));
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState && (l !== null ? l.push(Ju) : l = [Ju]);
      }
      u = u.return;
    }
    l !== null && vc(
      t,
      l,
      e,
      a
    ), t.flags |= 262144;
  }
  function Dn(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!pt(
        l.context._currentValue,
        l.memoizedValue
      ))
        return !0;
      l = l.next;
    }
    return !1;
  }
  function ia(l) {
    na = l, le = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function lt(l) {
    return Eo(na, l);
  }
  function Mn(l, t) {
    return na === null && ia(l), Eo(l, t);
  }
  function Eo(l, t) {
    var e = t._currentValue;
    if (t = { context: t, memoizedValue: e, next: null }, le === null) {
      if (l === null) throw Error(o(308));
      le = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
    } else le = le.next = t;
    return e;
  }
  var ch = typeof AbortController < "u" ? AbortController : function() {
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
  }, fh = f.unstable_scheduleCallback, sh = f.unstable_NormalPriority, Zl = {
    $$typeof: xl,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function hc() {
    return {
      controller: new ch(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function _u(l) {
    l.refCount--, l.refCount === 0 && fh(sh, function() {
      l.controller.abort();
    });
  }
  var Eu = null, yc = 0, Ha = 0, qa = null;
  function oh(l, t) {
    if (Eu === null) {
      var e = Eu = [];
      yc = 0, Ha = _f(), qa = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return yc++, t.then(po, po), t;
  }
  function po() {
    if (--yc === 0 && Eu !== null) {
      qa !== null && (qa.status = "fulfilled");
      var l = Eu;
      Eu = null, Ha = 0, qa = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function rh(l, t) {
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
  var To = E.S;
  E.S = function(l, t) {
    id = Ol(), typeof t == "object" && t !== null && typeof t.then == "function" && oh(l, t), To !== null && To(l, t);
  };
  var ca = d(null);
  function gc() {
    var l = ca.current;
    return l !== null ? l : pl.pooledCache;
  }
  function Rn(l, t) {
    t === null ? R(ca, ca.current) : R(ca, t.pool);
  }
  function zo() {
    var l = gc();
    return l === null ? null : { parent: Zl._currentValue, pool: l };
  }
  var Ba = Error(o(460)), Sc = Error(o(474)), xn = Error(o(542)), jn = { then: function() {
  } };
  function Ao(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function Oo(l, t, e) {
    switch (e = l[e], e === void 0 ? l.push(t) : e !== t && (t.then(Ft, Ft), t = e), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, Do(l), l;
      default:
        if (typeof t.status == "string") t.then(Ft, Ft);
        else {
          if (l = pl, l !== null && 100 < l.shellSuspendCounter)
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
            throw l = t.reason, Do(l), l;
        }
        throw sa = t, Ba;
    }
  }
  function fa(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (sa = e, Ba) : e;
    }
  }
  var sa = null;
  function No() {
    if (sa === null) throw Error(o(459));
    var l = sa;
    return sa = null, l;
  }
  function Do(l) {
    if (l === Ba || l === xn)
      throw Error(o(483));
  }
  var Ya = null, pu = 0;
  function Un(l) {
    var t = pu;
    return pu += 1, Ya === null && (Ya = []), Oo(Ya, l, t);
  }
  function Tu(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function Cn(l, t) {
    throw t.$$typeof === H ? Error(o(525)) : (l = Object.prototype.toString.call(t), Error(
      o(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
      )
    ));
  }
  function Mo(l) {
    function t(m, r) {
      if (l) {
        var v = m.deletions;
        v === null ? (m.deletions = [r], m.flags |= 16) : v.push(r);
      }
    }
    function e(m, r) {
      if (!l) return null;
      for (; r !== null; )
        t(m, r), r = r.sibling;
      return null;
    }
    function a(m) {
      for (var r = /* @__PURE__ */ new Map(); m !== null; )
        m.key !== null ? r.set(m.key, m) : r.set(m.index, m), m = m.sibling;
      return r;
    }
    function u(m, r) {
      return m = It(m, r), m.index = 0, m.sibling = null, m;
    }
    function n(m, r, v) {
      return m.index = v, l ? (v = m.alternate, v !== null ? (v = v.index, v < r ? (m.flags |= 67108866, r) : v) : (m.flags |= 67108866, r)) : (m.flags |= 1048576, r);
    }
    function i(m) {
      return l && m.alternate === null && (m.flags |= 67108866), m;
    }
    function c(m, r, v, z) {
      return r === null || r.tag !== 6 ? (r = ic(v, m.mode, z), r.return = m, r) : (r = u(r, v), r.return = m, r);
    }
    function s(m, r, v, z) {
      var X = v.type;
      return X === k ? T(
        m,
        r,
        v.props.children,
        z,
        v.key
      ) : r !== null && (r.elementType === X || typeof X == "object" && X !== null && X.$$typeof === ql && fa(X) === r.type) ? (r = u(r, v.props), Tu(r, v), r.return = m, r) : (r = On(
        v.type,
        v.key,
        v.props,
        null,
        m.mode,
        z
      ), Tu(r, v), r.return = m, r);
    }
    function h(m, r, v, z) {
      return r === null || r.tag !== 4 || r.stateNode.containerInfo !== v.containerInfo || r.stateNode.implementation !== v.implementation ? (r = cc(v, m.mode, z), r.return = m, r) : (r = u(r, v.children || []), r.return = m, r);
    }
    function T(m, r, v, z, X) {
      return r === null || r.tag !== 7 ? (r = aa(
        v,
        m.mode,
        z,
        X
      ), r.return = m, r) : (r = u(r, v), r.return = m, r);
    }
    function O(m, r, v) {
      if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint")
        return r = ic(
          "" + r,
          m.mode,
          v
        ), r.return = m, r;
      if (typeof r == "object" && r !== null) {
        switch (r.$$typeof) {
          case $:
            return v = On(
              r.type,
              r.key,
              r.props,
              null,
              m.mode,
              v
            ), Tu(v, r), v.return = m, v;
          case cl:
            return r = cc(
              r,
              m.mode,
              v
            ), r.return = m, r;
          case ql:
            return r = fa(r), O(m, r, v);
        }
        if ($l(r) || Yl(r))
          return r = aa(
            r,
            m.mode,
            v,
            null
          ), r.return = m, r;
        if (typeof r.then == "function")
          return O(m, Un(r), v);
        if (r.$$typeof === xl)
          return O(
            m,
            Mn(m, r),
            v
          );
        Cn(m, r);
      }
      return null;
    }
    function y(m, r, v, z) {
      var X = r !== null ? r.key : null;
      if (typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint")
        return X !== null ? null : c(m, r, "" + v, z);
      if (typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case $:
            return v.key === X ? s(m, r, v, z) : null;
          case cl:
            return v.key === X ? h(m, r, v, z) : null;
          case ql:
            return v = fa(v), y(m, r, v, z);
        }
        if ($l(v) || Yl(v))
          return X !== null ? null : T(m, r, v, z, null);
        if (typeof v.then == "function")
          return y(
            m,
            r,
            Un(v),
            z
          );
        if (v.$$typeof === xl)
          return y(
            m,
            r,
            Mn(m, v),
            z
          );
        Cn(m, v);
      }
      return null;
    }
    function b(m, r, v, z, X) {
      if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
        return m = m.get(v) || null, c(r, m, "" + z, X);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case $:
            return m = m.get(
              z.key === null ? v : z.key
            ) || null, s(r, m, z, X);
          case cl:
            return m = m.get(
              z.key === null ? v : z.key
            ) || null, h(r, m, z, X);
          case ql:
            return z = fa(z), b(
              m,
              r,
              v,
              z,
              X
            );
        }
        if ($l(z) || Yl(z))
          return m = m.get(v) || null, T(r, m, z, X, null);
        if (typeof z.then == "function")
          return b(
            m,
            r,
            v,
            Un(z),
            X
          );
        if (z.$$typeof === xl)
          return b(
            m,
            r,
            v,
            Mn(r, z),
            X
          );
        Cn(r, z);
      }
      return null;
    }
    function B(m, r, v, z) {
      for (var X = null, ol = null, G = r, F = r = 0, ul = null; G !== null && F < v.length; F++) {
        G.index > F ? (ul = G, G = null) : ul = G.sibling;
        var rl = y(
          m,
          G,
          v[F],
          z
        );
        if (rl === null) {
          G === null && (G = ul);
          break;
        }
        l && G && rl.alternate === null && t(m, G), r = n(rl, r, F), ol === null ? X = rl : ol.sibling = rl, ol = rl, G = ul;
      }
      if (F === v.length)
        return e(m, G), il && Pt(m, F), X;
      if (G === null) {
        for (; F < v.length; F++)
          G = O(m, v[F], z), G !== null && (r = n(
            G,
            r,
            F
          ), ol === null ? X = G : ol.sibling = G, ol = G);
        return il && Pt(m, F), X;
      }
      for (G = a(G); F < v.length; F++)
        ul = b(
          G,
          m,
          F,
          v[F],
          z
        ), ul !== null && (l && ul.alternate !== null && G.delete(
          ul.key === null ? F : ul.key
        ), r = n(
          ul,
          r,
          F
        ), ol === null ? X = ul : ol.sibling = ul, ol = ul);
      return l && G.forEach(function(Ve) {
        return t(m, Ve);
      }), il && Pt(m, F), X;
    }
    function L(m, r, v, z) {
      if (v == null) throw Error(o(151));
      for (var X = null, ol = null, G = r, F = r = 0, ul = null, rl = v.next(); G !== null && !rl.done; F++, rl = v.next()) {
        G.index > F ? (ul = G, G = null) : ul = G.sibling;
        var Ve = y(m, G, rl.value, z);
        if (Ve === null) {
          G === null && (G = ul);
          break;
        }
        l && G && Ve.alternate === null && t(m, G), r = n(Ve, r, F), ol === null ? X = Ve : ol.sibling = Ve, ol = Ve, G = ul;
      }
      if (rl.done)
        return e(m, G), il && Pt(m, F), X;
      if (G === null) {
        for (; !rl.done; F++, rl = v.next())
          rl = O(m, rl.value, z), rl !== null && (r = n(rl, r, F), ol === null ? X = rl : ol.sibling = rl, ol = rl);
        return il && Pt(m, F), X;
      }
      for (G = a(G); !rl.done; F++, rl = v.next())
        rl = b(G, m, F, rl.value, z), rl !== null && (l && rl.alternate !== null && G.delete(rl.key === null ? F : rl.key), r = n(rl, r, F), ol === null ? X = rl : ol.sibling = rl, ol = rl);
      return l && G.forEach(function(p0) {
        return t(m, p0);
      }), il && Pt(m, F), X;
    }
    function El(m, r, v, z) {
      if (typeof v == "object" && v !== null && v.type === k && v.key === null && (v = v.props.children), typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case $:
            l: {
              for (var X = v.key; r !== null; ) {
                if (r.key === X) {
                  if (X = v.type, X === k) {
                    if (r.tag === 7) {
                      e(
                        m,
                        r.sibling
                      ), z = u(
                        r,
                        v.props.children
                      ), z.return = m, m = z;
                      break l;
                    }
                  } else if (r.elementType === X || typeof X == "object" && X !== null && X.$$typeof === ql && fa(X) === r.type) {
                    e(
                      m,
                      r.sibling
                    ), z = u(r, v.props), Tu(z, v), z.return = m, m = z;
                    break l;
                  }
                  e(m, r);
                  break;
                } else t(m, r);
                r = r.sibling;
              }
              v.type === k ? (z = aa(
                v.props.children,
                m.mode,
                z,
                v.key
              ), z.return = m, m = z) : (z = On(
                v.type,
                v.key,
                v.props,
                null,
                m.mode,
                z
              ), Tu(z, v), z.return = m, m = z);
            }
            return i(m);
          case cl:
            l: {
              for (X = v.key; r !== null; ) {
                if (r.key === X)
                  if (r.tag === 4 && r.stateNode.containerInfo === v.containerInfo && r.stateNode.implementation === v.implementation) {
                    e(
                      m,
                      r.sibling
                    ), z = u(r, v.children || []), z.return = m, m = z;
                    break l;
                  } else {
                    e(m, r);
                    break;
                  }
                else t(m, r);
                r = r.sibling;
              }
              z = cc(v, m.mode, z), z.return = m, m = z;
            }
            return i(m);
          case ql:
            return v = fa(v), El(
              m,
              r,
              v,
              z
            );
        }
        if ($l(v))
          return B(
            m,
            r,
            v,
            z
          );
        if (Yl(v)) {
          if (X = Yl(v), typeof X != "function") throw Error(o(150));
          return v = X.call(v), L(
            m,
            r,
            v,
            z
          );
        }
        if (typeof v.then == "function")
          return El(
            m,
            r,
            Un(v),
            z
          );
        if (v.$$typeof === xl)
          return El(
            m,
            r,
            Mn(m, v),
            z
          );
        Cn(m, v);
      }
      return typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint" ? (v = "" + v, r !== null && r.tag === 6 ? (e(m, r.sibling), z = u(r, v), z.return = m, m = z) : (e(m, r), z = ic(v, m.mode, z), z.return = m, m = z), i(m)) : e(m, r);
    }
    return function(m, r, v, z) {
      try {
        pu = 0;
        var X = El(
          m,
          r,
          v,
          z
        );
        return Ya = null, X;
      } catch (G) {
        if (G === Ba || G === xn) throw G;
        var ol = Tt(29, G, null, m.mode);
        return ol.lanes = z, ol.return = m, ol;
      } finally {
      }
    };
  }
  var oa = Mo(!0), Ro = Mo(!1), Ae = !1;
  function bc(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function _c(l, t) {
    l = l.updateQueue, t.updateQueue === l && (t.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function Oe(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function Ne(l, t, e) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (ml & 2) !== 0) {
      var u = a.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), a.pending = t, t = An(l), mo(l, null, e), t;
    }
    return zn(l, a, t, e), An(l);
  }
  function zu(l, t, e) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (e & 4194048) !== 0)) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, _s(l, e);
    }
  }
  function Ec(l, t) {
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
  var pc = !1;
  function Au() {
    if (pc) {
      var l = qa;
      if (l !== null) throw l;
    }
  }
  function Ou(l, t, e, a) {
    pc = !1;
    var u = l.updateQueue;
    Ae = !1;
    var n = u.firstBaseUpdate, i = u.lastBaseUpdate, c = u.shared.pending;
    if (c !== null) {
      u.shared.pending = null;
      var s = c, h = s.next;
      s.next = null, i === null ? n = h : i.next = h, i = s;
      var T = l.alternate;
      T !== null && (T = T.updateQueue, c = T.lastBaseUpdate, c !== i && (c === null ? T.firstBaseUpdate = h : c.next = h, T.lastBaseUpdate = s));
    }
    if (n !== null) {
      var O = u.baseState;
      i = 0, T = h = s = null, c = n;
      do {
        var y = c.lane & -536870913, b = y !== c.lane;
        if (b ? (al & y) === y : (a & y) === y) {
          y !== 0 && y === Ha && (pc = !0), T !== null && (T = T.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          l: {
            var B = l, L = c;
            y = t;
            var El = e;
            switch (L.tag) {
              case 1:
                if (B = L.payload, typeof B == "function") {
                  O = B.call(El, O, y);
                  break l;
                }
                O = B;
                break l;
              case 3:
                B.flags = B.flags & -65537 | 128;
              case 0:
                if (B = L.payload, y = typeof B == "function" ? B.call(El, O, y) : B, y == null) break l;
                O = N({}, O, y);
                break l;
              case 2:
                Ae = !0;
            }
          }
          y = c.callback, y !== null && (l.flags |= 64, b && (l.flags |= 8192), b = u.callbacks, b === null ? u.callbacks = [y] : b.push(y));
        } else
          b = {
            lane: y,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null
          }, T === null ? (h = T = b, s = O) : T = T.next = b, i |= y;
        if (c = c.next, c === null) {
          if (c = u.shared.pending, c === null)
            break;
          b = c, c = b.next, b.next = null, u.lastBaseUpdate = b, u.shared.pending = null;
        }
      } while (!0);
      T === null && (s = O), u.baseState = s, u.firstBaseUpdate = h, u.lastBaseUpdate = T, n === null && (u.shared.lanes = 0), je |= i, l.lanes = i, l.memoizedState = O;
    }
  }
  function xo(l, t) {
    if (typeof l != "function")
      throw Error(o(191, l));
    l.call(t);
  }
  function jo(l, t) {
    var e = l.callbacks;
    if (e !== null)
      for (l.callbacks = null, l = 0; l < e.length; l++)
        xo(e[l], t);
  }
  var Ga = d(null), Hn = d(0);
  function Uo(l, t) {
    l = oe, R(Hn, l), R(Ga, t), oe = l | t.baseLanes;
  }
  function Tc() {
    R(Hn, oe), R(Ga, Ga.current);
  }
  function zc() {
    oe = Hn.current, A(Ga), A(Hn);
  }
  var zt = d(null), Bt = null;
  function De(l) {
    var t = l.alternate;
    R(Vl, Vl.current & 1), R(zt, l), Bt === null && (t === null || Ga.current !== null || t.memoizedState !== null) && (Bt = l);
  }
  function Ac(l) {
    R(Vl, Vl.current), R(zt, l), Bt === null && (Bt = l);
  }
  function Co(l) {
    l.tag === 22 ? (R(Vl, Vl.current), R(zt, l), Bt === null && (Bt = l)) : Me();
  }
  function Me() {
    R(Vl, Vl.current), R(zt, zt.current);
  }
  function At(l) {
    A(zt), Bt === l && (Bt = null), A(Vl);
  }
  var Vl = d(0);
  function qn(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || jf(e) || Uf(e)))
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
  var ee = 0, W = null, bl = null, Kl = null, Bn = !1, Xa = !1, ra = !1, Yn = 0, Nu = 0, Qa = null, dh = 0;
  function Ul() {
    throw Error(o(321));
  }
  function Oc(l, t) {
    if (t === null) return !1;
    for (var e = 0; e < t.length && e < l.length; e++)
      if (!pt(l[e], t[e])) return !1;
    return !0;
  }
  function Nc(l, t, e, a, u, n) {
    return ee = n, W = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, E.H = l === null || l.memoizedState === null ? gr : Vc, ra = !1, n = e(a, u), ra = !1, Xa && (n = qo(
      t,
      e,
      a,
      u
    )), Ho(l), n;
  }
  function Ho(l) {
    E.H = Ru;
    var t = bl !== null && bl.next !== null;
    if (ee = 0, Kl = bl = W = null, Bn = !1, Nu = 0, Qa = null, t) throw Error(o(300));
    l === null || Jl || (l = l.dependencies, l !== null && Dn(l) && (Jl = !0));
  }
  function qo(l, t, e, a) {
    W = l;
    var u = 0;
    do {
      if (Xa && (Qa = null), Nu = 0, Xa = !1, 25 <= u) throw Error(o(301));
      if (u += 1, Kl = bl = null, l.updateQueue != null) {
        var n = l.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      E.H = Sr, n = t(e, a);
    } while (Xa);
    return n;
  }
  function mh() {
    var l = E.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? Du(t) : t, l = l.useState()[0], (bl !== null ? bl.memoizedState : null) !== l && (W.flags |= 1024), t;
  }
  function Dc() {
    var l = Yn !== 0;
    return Yn = 0, l;
  }
  function Mc(l, t, e) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~e;
  }
  function Rc(l) {
    if (Bn) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      Bn = !1;
    }
    ee = 0, Kl = bl = W = null, Xa = !1, Nu = Yn = 0, Qa = null;
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
  function Ll() {
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
  function Gn() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Du(l) {
    var t = Nu;
    return Nu += 1, Qa === null && (Qa = []), l = Oo(Qa, l, t), t = W, (Kl === null ? t.memoizedState : Kl.next) === null && (t = t.alternate, E.H = t === null || t.memoizedState === null ? gr : Vc), l;
  }
  function Xn(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Du(l);
      if (l.$$typeof === xl) return lt(l);
    }
    throw Error(o(438, String(l)));
  }
  function xc(l) {
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
    if (t == null && (t = { data: [], index: 0 }), e === null && (e = Gn(), W.updateQueue = e), e.memoCache = t, e = t.data[t.index], e === void 0)
      for (e = t.data[t.index] = Array(l), a = 0; a < l; a++)
        e[a] = St;
    return t.index++, e;
  }
  function ae(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function Qn(l) {
    var t = Ll();
    return jc(t, bl, l);
  }
  function jc(l, t, e) {
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
      var c = i = null, s = null, h = t, T = !1;
      do {
        var O = h.lane & -536870913;
        if (O !== h.lane ? (al & O) === O : (ee & O) === O) {
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
            }), O === Ha && (T = !0);
          else if ((ee & y) === y) {
            h = h.next, y === Ha && (T = !0);
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
            }, s === null ? (c = s = O, i = n) : s = s.next = O, W.lanes |= y, je |= y;
          O = h.action, ra && e(n, O), n = h.hasEagerState ? h.eagerState : e(n, O);
        } else
          y = {
            lane: O,
            revertLane: h.revertLane,
            gesture: h.gesture,
            action: h.action,
            hasEagerState: h.hasEagerState,
            eagerState: h.eagerState,
            next: null
          }, s === null ? (c = s = y, i = n) : s = s.next = y, W.lanes |= O, je |= O;
        h = h.next;
      } while (h !== null && h !== t);
      if (s === null ? i = n : s.next = c, !pt(n, l.memoizedState) && (Jl = !0, T && (e = qa, e !== null)))
        throw e;
      l.memoizedState = n, l.baseState = i, l.baseQueue = s, a.lastRenderedState = n;
    }
    return u === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function Uc(l) {
    var t = Ll(), e = t.queue;
    if (e === null) throw Error(o(311));
    e.lastRenderedReducer = l;
    var a = e.dispatch, u = e.pending, n = t.memoizedState;
    if (u !== null) {
      e.pending = null;
      var i = u = u.next;
      do
        n = l(n, i.action), i = i.next;
      while (i !== u);
      pt(n, t.memoizedState) || (Jl = !0), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), e.lastRenderedState = n;
    }
    return [n, a];
  }
  function Bo(l, t, e) {
    var a = W, u = Ll(), n = il;
    if (n) {
      if (e === void 0) throw Error(o(407));
      e = e();
    } else e = t();
    var i = !pt(
      (bl || u).memoizedState,
      e
    );
    if (i && (u.memoizedState = e, Jl = !0), u = u.queue, qc(Xo.bind(null, a, u, l), [
      l
    ]), u.getSnapshot !== t || i || Kl !== null && Kl.memoizedState.tag & 1) {
      if (a.flags |= 2048, Va(
        9,
        { destroy: void 0 },
        Go.bind(
          null,
          a,
          u,
          e,
          t
        ),
        null
      ), pl === null) throw Error(o(349));
      n || (ee & 127) !== 0 || Yo(a, t, e);
    }
    return e;
  }
  function Yo(l, t, e) {
    l.flags |= 16384, l = { getSnapshot: t, value: e }, t = W.updateQueue, t === null ? (t = Gn(), W.updateQueue = t, t.stores = [l]) : (e = t.stores, e === null ? t.stores = [l] : e.push(l));
  }
  function Go(l, t, e, a) {
    t.value = e, t.getSnapshot = a, Qo(t) && Vo(l);
  }
  function Xo(l, t, e) {
    return e(function() {
      Qo(t) && Vo(l);
    });
  }
  function Qo(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var e = t();
      return !pt(l, e);
    } catch {
      return !0;
    }
  }
  function Vo(l) {
    var t = ea(l, 2);
    t !== null && yt(t, l, 2);
  }
  function Cc(l) {
    var t = it();
    if (typeof l == "function") {
      var e = l;
      if (l = e(), ra) {
        Se(!0);
        try {
          e();
        } finally {
          Se(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = l, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ae,
      lastRenderedState: l
    }, t;
  }
  function Lo(l, t, e, a) {
    return l.baseState = e, jc(
      l,
      bl,
      typeof a == "function" ? a : ae
    );
  }
  function vh(l, t, e, a, u) {
    if (Zn(l)) throw Error(o(485));
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
      E.T !== null ? e(!0) : n.isTransition = !1, a(n), e = t.pending, e === null ? (n.next = t.pending = n, Zo(t, n)) : (n.next = e.next, t.pending = e.next = n);
    }
  }
  function Zo(l, t) {
    var e = t.action, a = t.payload, u = l.state;
    if (t.isTransition) {
      var n = E.T, i = {};
      E.T = i;
      try {
        var c = e(u, a), s = E.S;
        s !== null && s(i, c), Ko(l, t, c);
      } catch (h) {
        Hc(l, t, h);
      } finally {
        n !== null && i.types !== null && (n.types = i.types), E.T = n;
      }
    } else
      try {
        n = e(u, a), Ko(l, t, n);
      } catch (h) {
        Hc(l, t, h);
      }
  }
  function Ko(l, t, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        Jo(l, t, a);
      },
      function(a) {
        return Hc(l, t, a);
      }
    ) : Jo(l, t, e);
  }
  function Jo(l, t, e) {
    t.status = "fulfilled", t.value = e, wo(t), l.state = e, t = l.pending, t !== null && (e = t.next, e === t ? l.pending = null : (e = e.next, t.next = e, Zo(l, e)));
  }
  function Hc(l, t, e) {
    var a = l.pending;
    if (l.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = e, wo(t), t = t.next;
      while (t !== a);
    }
    l.action = null;
  }
  function wo(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function Wo(l, t) {
    return t;
  }
  function $o(l, t) {
    if (il) {
      var e = pl.formState;
      if (e !== null) {
        l: {
          var a = W;
          if (il) {
            if (Nl) {
              t: {
                for (var u = Nl, n = qt; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break t;
                  }
                  if (u = Yt(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                n = u.data, u = n === "F!" || n === "F" ? u : null;
              }
              if (u) {
                Nl = Yt(
                  u.nextSibling
                ), a = u.data === "F!";
                break l;
              }
            }
            Te(a);
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
      lastRenderedReducer: Wo,
      lastRenderedState: t
    }, e.queue = a, e = vr.bind(
      null,
      W,
      a
    ), a.dispatch = e, a = Cc(!1), n = Qc.bind(
      null,
      W,
      !1,
      a.queue
    ), a = it(), u = {
      state: t,
      dispatch: null,
      action: l,
      pending: null
    }, a.queue = u, e = vh.bind(
      null,
      W,
      u,
      n,
      e
    ), u.dispatch = e, a.memoizedState = l, [t, e, !1];
  }
  function Fo(l) {
    var t = Ll();
    return ko(t, bl, l);
  }
  function ko(l, t, e) {
    if (t = jc(
      l,
      t,
      Wo
    )[0], l = Qn(ae)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = Du(t);
      } catch (i) {
        throw i === Ba ? xn : i;
      }
    else a = t;
    t = Ll();
    var u = t.queue, n = u.dispatch;
    return e !== t.memoizedState && (W.flags |= 2048, Va(
      9,
      { destroy: void 0 },
      hh.bind(null, u, e),
      null
    )), [a, n, l];
  }
  function hh(l, t) {
    l.action = t;
  }
  function Io(l) {
    var t = Ll(), e = bl;
    if (e !== null)
      return ko(t, e, l);
    Ll(), t = t.memoizedState, e = Ll();
    var a = e.queue.dispatch;
    return e.memoizedState = l, [t, a, !1];
  }
  function Va(l, t, e, a) {
    return l = { tag: l, create: e, deps: a, inst: t, next: null }, t = W.updateQueue, t === null && (t = Gn(), W.updateQueue = t), e = t.lastEffect, e === null ? t.lastEffect = l.next = l : (a = e.next, e.next = l, l.next = a, t.lastEffect = l), l;
  }
  function Po() {
    return Ll().memoizedState;
  }
  function Vn(l, t, e, a) {
    var u = it();
    W.flags |= l, u.memoizedState = Va(
      1 | t,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function Ln(l, t, e, a) {
    var u = Ll();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    bl !== null && a !== null && Oc(a, bl.memoizedState.deps) ? u.memoizedState = Va(t, n, e, a) : (W.flags |= l, u.memoizedState = Va(
      1 | t,
      n,
      e,
      a
    ));
  }
  function lr(l, t) {
    Vn(8390656, 8, l, t);
  }
  function qc(l, t) {
    Ln(2048, 8, l, t);
  }
  function yh(l) {
    W.flags |= 4;
    var t = W.updateQueue;
    if (t === null)
      t = Gn(), W.updateQueue = t, t.events = [l];
    else {
      var e = t.events;
      e === null ? t.events = [l] : e.push(l);
    }
  }
  function tr(l) {
    var t = Ll().memoizedState;
    return yh({ ref: t, nextImpl: l }), function() {
      if ((ml & 2) !== 0) throw Error(o(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function er(l, t) {
    return Ln(4, 2, l, t);
  }
  function ar(l, t) {
    return Ln(4, 4, l, t);
  }
  function ur(l, t) {
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
  function nr(l, t, e) {
    e = e != null ? e.concat([l]) : null, Ln(4, 4, ur.bind(null, t, l), e);
  }
  function Bc() {
  }
  function ir(l, t) {
    var e = Ll();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    return t !== null && Oc(t, a[1]) ? a[0] : (e.memoizedState = [l, t], l);
  }
  function cr(l, t) {
    var e = Ll();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    if (t !== null && Oc(t, a[1]))
      return a[0];
    if (a = l(), ra) {
      Se(!0);
      try {
        l();
      } finally {
        Se(!1);
      }
    }
    return e.memoizedState = [a, t], a;
  }
  function Yc(l, t, e) {
    return e === void 0 || (ee & 1073741824) !== 0 && (al & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = e, l = fd(), W.lanes |= l, je |= l, e);
  }
  function fr(l, t, e, a) {
    return pt(e, t) ? e : Ga.current !== null ? (l = Yc(l, e, a), pt(l, t) || (Jl = !0), l) : (ee & 42) === 0 || (ee & 1073741824) !== 0 && (al & 261930) === 0 ? (Jl = !0, l.memoizedState = e) : (l = fd(), W.lanes |= l, je |= l, t);
  }
  function sr(l, t, e, a, u) {
    var n = j.p;
    j.p = n !== 0 && 8 > n ? n : 8;
    var i = E.T, c = {};
    E.T = c, Qc(l, !1, t, e);
    try {
      var s = u(), h = E.S;
      if (h !== null && h(c, s), s !== null && typeof s == "object" && typeof s.then == "function") {
        var T = rh(
          s,
          a
        );
        Mu(
          l,
          t,
          T,
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
      j.p = n, i !== null && c.types !== null && (i.types = c.types), E.T = i;
    }
  }
  function gh() {
  }
  function Gc(l, t, e, a) {
    if (l.tag !== 5) throw Error(o(476));
    var u = or(l).queue;
    sr(
      l,
      u,
      t,
      Q,
      e === null ? gh : function() {
        return rr(l), e(a);
      }
    );
  }
  function or(l) {
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
        lastRenderedReducer: ae,
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
        lastRenderedReducer: ae,
        lastRenderedState: e
      },
      next: null
    }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
  }
  function rr(l) {
    var t = or(l);
    t.next === null && (t = l.alternate.memoizedState), Mu(
      l,
      t.next.queue,
      {},
      Dt()
    );
  }
  function Xc() {
    return lt(Ju);
  }
  function dr() {
    return Ll().memoizedState;
  }
  function mr() {
    return Ll().memoizedState;
  }
  function Sh(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var e = Dt();
          l = Oe(e);
          var a = Ne(t, l, e);
          a !== null && (yt(a, t, e), zu(a, t, e)), t = { cache: hc() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function bh(l, t, e) {
    var a = Dt();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Zn(l) ? hr(t, e) : (e = uc(l, t, e, a), e !== null && (yt(e, l, a), yr(e, t, a)));
  }
  function vr(l, t, e) {
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
    if (Zn(l)) hr(t, u);
    else {
      var n = l.alternate;
      if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null))
        try {
          var i = t.lastRenderedState, c = n(i, e);
          if (u.hasEagerState = !0, u.eagerState = c, pt(c, i))
            return zn(l, t, u, 0), pl === null && Tn(), !1;
        } catch {
        } finally {
        }
      if (e = uc(l, t, u, a), e !== null)
        return yt(e, l, a), yr(e, t, a), !0;
    }
    return !1;
  }
  function Qc(l, t, e, a) {
    if (a = {
      lane: 2,
      revertLane: _f(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Zn(l)) {
      if (t) throw Error(o(479));
    } else
      t = uc(
        l,
        e,
        a,
        2
      ), t !== null && yt(t, l, 2);
  }
  function Zn(l) {
    var t = l.alternate;
    return l === W || t !== null && t === W;
  }
  function hr(l, t) {
    Xa = Bn = !0;
    var e = l.pending;
    e === null ? t.next = t : (t.next = e.next, e.next = t), l.pending = t;
  }
  function yr(l, t, e) {
    if ((e & 4194048) !== 0) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, _s(l, e);
    }
  }
  var Ru = {
    readContext: lt,
    use: Xn,
    useCallback: Ul,
    useContext: Ul,
    useEffect: Ul,
    useImperativeHandle: Ul,
    useLayoutEffect: Ul,
    useInsertionEffect: Ul,
    useMemo: Ul,
    useReducer: Ul,
    useRef: Ul,
    useState: Ul,
    useDebugValue: Ul,
    useDeferredValue: Ul,
    useTransition: Ul,
    useSyncExternalStore: Ul,
    useId: Ul,
    useHostTransitionStatus: Ul,
    useFormState: Ul,
    useActionState: Ul,
    useOptimistic: Ul,
    useMemoCache: Ul,
    useCacheRefresh: Ul
  };
  Ru.useEffectEvent = Ul;
  var gr = {
    readContext: lt,
    use: Xn,
    useCallback: function(l, t) {
      return it().memoizedState = [
        l,
        t === void 0 ? null : t
      ], l;
    },
    useContext: lt,
    useEffect: lr,
    useImperativeHandle: function(l, t, e) {
      e = e != null ? e.concat([l]) : null, Vn(
        4194308,
        4,
        ur.bind(null, t, l),
        e
      );
    },
    useLayoutEffect: function(l, t) {
      return Vn(4194308, 4, l, t);
    },
    useInsertionEffect: function(l, t) {
      Vn(4, 2, l, t);
    },
    useMemo: function(l, t) {
      var e = it();
      t = t === void 0 ? null : t;
      var a = l();
      if (ra) {
        Se(!0);
        try {
          l();
        } finally {
          Se(!1);
        }
      }
      return e.memoizedState = [a, t], a;
    },
    useReducer: function(l, t, e) {
      var a = it();
      if (e !== void 0) {
        var u = e(t);
        if (ra) {
          Se(!0);
          try {
            e(t);
          } finally {
            Se(!1);
          }
        }
      } else u = t;
      return a.memoizedState = a.baseState = u, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: u
      }, a.queue = l, l = l.dispatch = bh.bind(
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
      l = Cc(l);
      var t = l.queue, e = vr.bind(null, W, t);
      return t.dispatch = e, [l.memoizedState, e];
    },
    useDebugValue: Bc,
    useDeferredValue: function(l, t) {
      var e = it();
      return Yc(e, l, t);
    },
    useTransition: function() {
      var l = Cc(!1);
      return l = sr.bind(
        null,
        W,
        l.queue,
        !0,
        !1
      ), it().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, t, e) {
      var a = W, u = it();
      if (il) {
        if (e === void 0)
          throw Error(o(407));
        e = e();
      } else {
        if (e = t(), pl === null)
          throw Error(o(349));
        (al & 127) !== 0 || Yo(a, t, e);
      }
      u.memoizedState = e;
      var n = { value: e, getSnapshot: t };
      return u.queue = n, lr(Xo.bind(null, a, n, l), [
        l
      ]), a.flags |= 2048, Va(
        9,
        { destroy: void 0 },
        Go.bind(
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
      var l = it(), t = pl.identifierPrefix;
      if (il) {
        var e = Zt, a = Lt;
        e = (a & ~(1 << 32 - Et(a) - 1)).toString(32) + e, t = "_" + t + "R_" + e, e = Yn++, 0 < e && (t += "H" + e.toString(32)), t += "_";
      } else
        e = dh++, t = "_" + t + "r_" + e.toString(32) + "_";
      return l.memoizedState = t;
    },
    useHostTransitionStatus: Xc,
    useFormState: $o,
    useActionState: $o,
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
      return t.queue = e, t = Qc.bind(
        null,
        W,
        !0,
        e
      ), e.dispatch = t, [l, t];
    },
    useMemoCache: xc,
    useCacheRefresh: function() {
      return it().memoizedState = Sh.bind(
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
  }, Vc = {
    readContext: lt,
    use: Xn,
    useCallback: ir,
    useContext: lt,
    useEffect: qc,
    useImperativeHandle: nr,
    useInsertionEffect: er,
    useLayoutEffect: ar,
    useMemo: cr,
    useReducer: Qn,
    useRef: Po,
    useState: function() {
      return Qn(ae);
    },
    useDebugValue: Bc,
    useDeferredValue: function(l, t) {
      var e = Ll();
      return fr(
        e,
        bl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = Qn(ae)[0], t = Ll().memoizedState;
      return [
        typeof l == "boolean" ? l : Du(l),
        t
      ];
    },
    useSyncExternalStore: Bo,
    useId: dr,
    useHostTransitionStatus: Xc,
    useFormState: Fo,
    useActionState: Fo,
    useOptimistic: function(l, t) {
      var e = Ll();
      return Lo(e, bl, l, t);
    },
    useMemoCache: xc,
    useCacheRefresh: mr
  };
  Vc.useEffectEvent = tr;
  var Sr = {
    readContext: lt,
    use: Xn,
    useCallback: ir,
    useContext: lt,
    useEffect: qc,
    useImperativeHandle: nr,
    useInsertionEffect: er,
    useLayoutEffect: ar,
    useMemo: cr,
    useReducer: Uc,
    useRef: Po,
    useState: function() {
      return Uc(ae);
    },
    useDebugValue: Bc,
    useDeferredValue: function(l, t) {
      var e = Ll();
      return bl === null ? Yc(e, l, t) : fr(
        e,
        bl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = Uc(ae)[0], t = Ll().memoizedState;
      return [
        typeof l == "boolean" ? l : Du(l),
        t
      ];
    },
    useSyncExternalStore: Bo,
    useId: dr,
    useHostTransitionStatus: Xc,
    useFormState: Io,
    useActionState: Io,
    useOptimistic: function(l, t) {
      var e = Ll();
      return bl !== null ? Lo(e, bl, l, t) : (e.baseState = l, [l, e.queue.dispatch]);
    },
    useMemoCache: xc,
    useCacheRefresh: mr
  };
  Sr.useEffectEvent = tr;
  function Lc(l, t, e, a) {
    t = l.memoizedState, e = e(a, t), e = e == null ? t : N({}, t, e), l.memoizedState = e, l.lanes === 0 && (l.updateQueue.baseState = e);
  }
  var Zc = {
    enqueueSetState: function(l, t, e) {
      l = l._reactInternals;
      var a = Dt(), u = Oe(a);
      u.payload = t, e != null && (u.callback = e), t = Ne(l, u, a), t !== null && (yt(t, l, a), zu(t, l, a));
    },
    enqueueReplaceState: function(l, t, e) {
      l = l._reactInternals;
      var a = Dt(), u = Oe(a);
      u.tag = 1, u.payload = t, e != null && (u.callback = e), t = Ne(l, u, a), t !== null && (yt(t, l, a), zu(t, l, a));
    },
    enqueueForceUpdate: function(l, t) {
      l = l._reactInternals;
      var e = Dt(), a = Oe(e);
      a.tag = 2, t != null && (a.callback = t), t = Ne(l, a, e), t !== null && (yt(t, l, e), zu(t, l, e));
    }
  };
  function br(l, t, e, a, u, n, i) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, n, i) : t.prototype && t.prototype.isPureReactComponent ? !yu(e, a) || !yu(u, n) : !0;
  }
  function _r(l, t, e, a) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(e, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(e, a), t.state !== l && Zc.enqueueReplaceState(t, t.state, null);
  }
  function da(l, t) {
    var e = t;
    if ("ref" in t) {
      e = {};
      for (var a in t)
        a !== "ref" && (e[a] = t[a]);
    }
    if (l = l.defaultProps) {
      e === t && (e = N({}, e));
      for (var u in l)
        e[u] === void 0 && (e[u] = l[u]);
    }
    return e;
  }
  function Er(l) {
    pn(l);
  }
  function pr(l) {
    console.error(l);
  }
  function Tr(l) {
    pn(l);
  }
  function Kn(l, t) {
    try {
      var e = l.onUncaughtError;
      e(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function zr(l, t, e) {
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
  function Kc(l, t, e) {
    return e = Oe(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      Kn(l, t);
    }, e;
  }
  function Ar(l) {
    return l = Oe(l), l.tag = 3, l;
  }
  function Or(l, t, e, a) {
    var u = e.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = a.value;
      l.payload = function() {
        return u(n);
      }, l.callback = function() {
        zr(t, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (l.callback = function() {
      zr(t, e, a), typeof u != "function" && (Ue === null ? Ue = /* @__PURE__ */ new Set([this]) : Ue.add(this));
      var c = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: c !== null ? c : ""
      });
    });
  }
  function _h(l, t, e, a, u) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = e.alternate, t !== null && Ca(
        t,
        e,
        u,
        !0
      ), e = zt.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return Bt === null ? ai() : e.alternate === null && Cl === 0 && (Cl = 3), e.flags &= -257, e.flags |= 65536, e.lanes = u, a === jn ? e.flags |= 16384 : (t = e.updateQueue, t === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), gf(l, a, u)), !1;
          case 22:
            return e.flags |= 65536, a === jn ? e.flags |= 16384 : (t = e.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = t) : (e = t.retryQueue, e === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), gf(l, a, u)), !1;
        }
        throw Error(o(435, e.tag));
      }
      return gf(l, a, u), ai(), !1;
    }
    if (il)
      return t = zt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, a !== oc && (l = Error(o(422), { cause: a }), bu(Ut(l, e)))) : (a !== oc && (t = Error(o(423), {
        cause: a
      }), bu(
        Ut(t, e)
      )), l = l.current.alternate, l.flags |= 65536, u &= -u, l.lanes |= u, a = Ut(a, e), u = Kc(
        l.stateNode,
        a,
        u
      ), Ec(l, u), Cl !== 4 && (Cl = 2)), !1;
    var n = Error(o(520), { cause: a });
    if (n = Ut(n, e), Yu === null ? Yu = [n] : Yu.push(n), Cl !== 4 && (Cl = 2), t === null) return !0;
    a = Ut(a, e), e = t;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, l = u & -u, e.lanes |= l, l = Kc(e.stateNode, a, l), Ec(e, l), !1;
        case 1:
          if (t = e.type, n = e.stateNode, (e.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (Ue === null || !Ue.has(n))))
            return e.flags |= 65536, u &= -u, e.lanes |= u, u = Ar(u), Or(
              u,
              l,
              e,
              a
            ), Ec(e, u), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var Jc = Error(o(461)), Jl = !1;
  function tt(l, t, e, a) {
    t.child = l === null ? Ro(t, null, e, a) : oa(
      t,
      l.child,
      e,
      a
    );
  }
  function Nr(l, t, e, a, u) {
    e = e.render;
    var n = t.ref;
    if ("ref" in a) {
      var i = {};
      for (var c in a)
        c !== "ref" && (i[c] = a[c]);
    } else i = a;
    return ia(t), a = Nc(
      l,
      t,
      e,
      i,
      n,
      u
    ), c = Dc(), l !== null && !Jl ? (Mc(l, t, u), ue(l, t, u)) : (il && c && fc(t), t.flags |= 1, tt(l, t, a, u), t.child);
  }
  function Dr(l, t, e, a, u) {
    if (l === null) {
      var n = e.type;
      return typeof n == "function" && !nc(n) && n.defaultProps === void 0 && e.compare === null ? (t.tag = 15, t.type = n, Mr(
        l,
        t,
        n,
        a,
        u
      )) : (l = On(
        e.type,
        null,
        a,
        t,
        t.mode,
        u
      ), l.ref = t.ref, l.return = t, t.child = l);
    }
    if (n = l.child, !lf(l, u)) {
      var i = n.memoizedProps;
      if (e = e.compare, e = e !== null ? e : yu, e(i, a) && l.ref === t.ref)
        return ue(l, t, u);
    }
    return t.flags |= 1, l = It(n, a), l.ref = t.ref, l.return = t, t.child = l;
  }
  function Mr(l, t, e, a, u) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (yu(n, a) && l.ref === t.ref)
        if (Jl = !1, t.pendingProps = a = n, lf(l, u))
          (l.flags & 131072) !== 0 && (Jl = !0);
        else
          return t.lanes = l.lanes, ue(l, t, u);
    }
    return wc(
      l,
      t,
      e,
      a,
      u
    );
  }
  function Rr(l, t, e, a) {
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
        return xr(
          l,
          t,
          n,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && Rn(
          t,
          n !== null ? n.cachePool : null
        ), n !== null ? Uo(t, n) : Tc(), Co(t);
      else
        return a = t.lanes = 536870912, xr(
          l,
          t,
          n !== null ? n.baseLanes | e : e,
          e,
          a
        );
    } else
      n !== null ? (Rn(t, n.cachePool), Uo(t, n), Me(), t.memoizedState = null) : (l !== null && Rn(t, null), Tc(), Me());
    return tt(l, t, u, e), t.child;
  }
  function xu(l, t) {
    return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function xr(l, t, e, a, u) {
    var n = gc();
    return n = n === null ? null : { parent: Zl._currentValue, pool: n }, t.memoizedState = {
      baseLanes: e,
      cachePool: n
    }, l !== null && Rn(t, null), Tc(), Co(t), l !== null && Ca(l, t, a, !0), t.childLanes = u, null;
  }
  function Jn(l, t) {
    return t = Wn(
      { mode: t.mode, children: t.children },
      l.mode
    ), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function jr(l, t, e) {
    return oa(t, l.child, null, e), l = Jn(t, t.pendingProps), l.flags |= 2, At(t), t.memoizedState = null, l;
  }
  function Eh(l, t, e) {
    var a = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (il) {
        if (a.mode === "hidden")
          return l = Jn(t, a), t.lanes = 536870912, xu(null, l);
        if (Ac(t), (l = Nl) ? (l = Zd(
          l,
          qt
        ), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: Ee !== null ? { id: Lt, overflow: Zt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = ho(l), e.return = t, t.child = e, Pl = t, Nl = null)) : l = null, l === null) throw Te(t);
        return t.lanes = 536870912, null;
      }
      return Jn(t, a);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var i = n.dehydrated;
      if (Ac(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = jr(
            l,
            t,
            e
          );
        else if (t.memoizedState !== null)
          t.child = l.child, t.flags |= 128, t = null;
        else throw Error(o(558));
      else if (Jl || Ca(l, t, e, !1), u = (e & l.childLanes) !== 0, Jl || u) {
        if (a = pl, a !== null && (i = Es(a, e), i !== 0 && i !== n.retryLane))
          throw n.retryLane = i, ea(l, i), yt(a, l, i), Jc;
        ai(), t = jr(
          l,
          t,
          e
        );
      } else
        l = n.treeContext, Nl = Yt(i.nextSibling), Pl = t, il = !0, pe = null, qt = !1, l !== null && So(t, l), t = Jn(t, a), t.flags |= 4096;
      return t;
    }
    return l = It(l.child, {
      mode: a.mode,
      children: a.children
    }), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function wn(l, t) {
    var e = t.ref;
    if (e === null)
      l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(o(284));
      (l === null || l.ref !== e) && (t.flags |= 4194816);
    }
  }
  function wc(l, t, e, a, u) {
    return ia(t), e = Nc(
      l,
      t,
      e,
      a,
      void 0,
      u
    ), a = Dc(), l !== null && !Jl ? (Mc(l, t, u), ue(l, t, u)) : (il && a && fc(t), t.flags |= 1, tt(l, t, e, u), t.child);
  }
  function Ur(l, t, e, a, u, n) {
    return ia(t), t.updateQueue = null, e = qo(
      t,
      a,
      e,
      u
    ), Ho(l), a = Dc(), l !== null && !Jl ? (Mc(l, t, n), ue(l, t, n)) : (il && a && fc(t), t.flags |= 1, tt(l, t, e, n), t.child);
  }
  function Cr(l, t, e, a, u) {
    if (ia(t), t.stateNode === null) {
      var n = Ra, i = e.contextType;
      typeof i == "object" && i !== null && (n = lt(i)), n = new e(a, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = Zc, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = a, n.state = t.memoizedState, n.refs = {}, bc(t), i = e.contextType, n.context = typeof i == "object" && i !== null ? lt(i) : Ra, n.state = t.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (Lc(
        t,
        e,
        i,
        a
      ), n.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (i = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), i !== n.state && Zc.enqueueReplaceState(n, n.state, null), Ou(t, a, n, u), Au(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (l === null) {
      n = t.stateNode;
      var c = t.memoizedProps, s = da(e, c);
      n.props = s;
      var h = n.context, T = e.contextType;
      i = Ra, typeof T == "object" && T !== null && (i = lt(T));
      var O = e.getDerivedStateFromProps;
      T = typeof O == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = t.pendingProps !== c, T || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || h !== i) && _r(
        t,
        n,
        a,
        i
      ), Ae = !1;
      var y = t.memoizedState;
      n.state = y, Ou(t, a, n, u), Au(), h = t.memoizedState, c || y !== h || Ae ? (typeof O == "function" && (Lc(
        t,
        e,
        O,
        a
      ), h = t.memoizedState), (s = Ae || br(
        t,
        e,
        s,
        a,
        y,
        h,
        i
      )) ? (T || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = h), n.props = a, n.state = h, n.context = i, a = s) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      n = t.stateNode, _c(l, t), i = t.memoizedProps, T = da(e, i), n.props = T, O = t.pendingProps, y = n.context, h = e.contextType, s = Ra, typeof h == "object" && h !== null && (s = lt(h)), c = e.getDerivedStateFromProps, (h = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i !== O || y !== s) && _r(
        t,
        n,
        a,
        s
      ), Ae = !1, y = t.memoizedState, n.state = y, Ou(t, a, n, u), Au();
      var b = t.memoizedState;
      i !== O || y !== b || Ae || l !== null && l.dependencies !== null && Dn(l.dependencies) ? (typeof c == "function" && (Lc(
        t,
        e,
        c,
        a
      ), b = t.memoizedState), (T = Ae || br(
        t,
        e,
        T,
        a,
        y,
        b,
        s
      ) || l !== null && l.dependencies !== null && Dn(l.dependencies)) ? (h || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, b, s), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        a,
        b,
        s
      )), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || i === l.memoizedProps && y === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && y === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = b), n.props = a, n.state = b, n.context = s, a = T) : (typeof n.componentDidUpdate != "function" || i === l.memoizedProps && y === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && y === l.memoizedState || (t.flags |= 1024), a = !1);
    }
    return n = a, wn(l, t), a = (t.flags & 128) !== 0, n || a ? (n = t.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && a ? (t.child = oa(
      t,
      l.child,
      null,
      u
    ), t.child = oa(
      t,
      null,
      e,
      u
    )) : tt(l, t, e, u), t.memoizedState = n.state, l = t.child) : l = ue(
      l,
      t,
      u
    ), l;
  }
  function Hr(l, t, e, a) {
    return ua(), t.flags |= 256, tt(l, t, e, a), t.child;
  }
  var Wc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function $c(l) {
    return { baseLanes: l, cachePool: zo() };
  }
  function Fc(l, t, e) {
    return l = l !== null ? l.childLanes & ~e : 0, t && (l |= Nt), l;
  }
  function qr(l, t, e) {
    var a = t.pendingProps, u = !1, n = (t.flags & 128) !== 0, i;
    if ((i = n) || (i = l !== null && l.memoizedState === null ? !1 : (Vl.current & 2) !== 0), i && (u = !0, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (il) {
        if (u ? De(t) : Me(), (l = Nl) ? (l = Zd(
          l,
          qt
        ), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: Ee !== null ? { id: Lt, overflow: Zt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = ho(l), e.return = t, t.child = e, Pl = t, Nl = null)) : l = null, l === null) throw Te(t);
        return Uf(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var c = a.children;
      return a = a.fallback, u ? (Me(), u = t.mode, c = Wn(
        { mode: "hidden", children: c },
        u
      ), a = aa(
        a,
        u,
        e,
        null
      ), c.return = t, a.return = t, c.sibling = a, t.child = c, a = t.child, a.memoizedState = $c(e), a.childLanes = Fc(
        l,
        i,
        e
      ), t.memoizedState = Wc, xu(null, a)) : (De(t), kc(t, c));
    }
    var s = l.memoizedState;
    if (s !== null && (c = s.dehydrated, c !== null)) {
      if (n)
        t.flags & 256 ? (De(t), t.flags &= -257, t = Ic(
          l,
          t,
          e
        )) : t.memoizedState !== null ? (Me(), t.child = l.child, t.flags |= 128, t = null) : (Me(), c = a.fallback, u = t.mode, a = Wn(
          { mode: "visible", children: a.children },
          u
        ), c = aa(
          c,
          u,
          e,
          null
        ), c.flags |= 2, a.return = t, c.return = t, a.sibling = c, t.child = a, oa(
          t,
          l.child,
          null,
          e
        ), a = t.child, a.memoizedState = $c(e), a.childLanes = Fc(
          l,
          i,
          e
        ), t.memoizedState = Wc, t = xu(null, a));
      else if (De(t), Uf(c)) {
        if (i = c.nextSibling && c.nextSibling.dataset, i) var h = i.dgst;
        i = h, a = Error(o(419)), a.stack = "", a.digest = i, bu({ value: a, source: null, stack: null }), t = Ic(
          l,
          t,
          e
        );
      } else if (Jl || Ca(l, t, e, !1), i = (e & l.childLanes) !== 0, Jl || i) {
        if (i = pl, i !== null && (a = Es(i, e), a !== 0 && a !== s.retryLane))
          throw s.retryLane = a, ea(l, a), yt(i, l, a), Jc;
        jf(c) || ai(), t = Ic(
          l,
          t,
          e
        );
      } else
        jf(c) ? (t.flags |= 192, t.child = l.child, t = null) : (l = s.treeContext, Nl = Yt(
          c.nextSibling
        ), Pl = t, il = !0, pe = null, qt = !1, l !== null && So(t, l), t = kc(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (Me(), c = a.fallback, u = t.mode, s = l.child, h = s.sibling, a = It(s, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = s.subtreeFlags & 65011712, h !== null ? c = It(
      h,
      c
    ) : (c = aa(
      c,
      u,
      e,
      null
    ), c.flags |= 2), c.return = t, a.return = t, a.sibling = c, t.child = a, xu(null, a), a = t.child, c = l.child.memoizedState, c === null ? c = $c(e) : (u = c.cachePool, u !== null ? (s = Zl._currentValue, u = u.parent !== s ? { parent: s, pool: s } : u) : u = zo(), c = {
      baseLanes: c.baseLanes | e,
      cachePool: u
    }), a.memoizedState = c, a.childLanes = Fc(
      l,
      i,
      e
    ), t.memoizedState = Wc, xu(l.child, a)) : (De(t), e = l.child, l = e.sibling, e = It(e, {
      mode: "visible",
      children: a.children
    }), e.return = t, e.sibling = null, l !== null && (i = t.deletions, i === null ? (t.deletions = [l], t.flags |= 16) : i.push(l)), t.child = e, t.memoizedState = null, e);
  }
  function kc(l, t) {
    return t = Wn(
      { mode: "visible", children: t },
      l.mode
    ), t.return = l, l.child = t;
  }
  function Wn(l, t) {
    return l = Tt(22, l, null, t), l.lanes = 0, l;
  }
  function Ic(l, t, e) {
    return oa(t, l.child, null, e), l = kc(
      t,
      t.pendingProps.children
    ), l.flags |= 2, t.memoizedState = null, l;
  }
  function Br(l, t, e) {
    l.lanes |= t;
    var a = l.alternate;
    a !== null && (a.lanes |= t), mc(l.return, t, e);
  }
  function Pc(l, t, e, a, u, n) {
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
  function Yr(l, t, e) {
    var a = t.pendingProps, u = a.revealOrder, n = a.tail;
    a = a.children;
    var i = Vl.current, c = (i & 2) !== 0;
    if (c ? (i = i & 1 | 2, t.flags |= 128) : i &= 1, R(Vl, i), tt(l, t, a, e), a = il ? Su : 0, !c && l !== null && (l.flags & 128) !== 0)
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && Br(l, e, t);
        else if (l.tag === 19)
          Br(l, e, t);
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
          l = e.alternate, l !== null && qn(l) === null && (u = e), e = e.sibling;
        e = u, e === null ? (u = t.child, t.child = null) : (u = e.sibling, e.sibling = null), Pc(
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
          if (l = u.alternate, l !== null && qn(l) === null) {
            t.child = u;
            break;
          }
          l = u.sibling, u.sibling = e, e = u, u = l;
        }
        Pc(
          t,
          !0,
          e,
          null,
          n,
          a
        );
        break;
      case "together":
        Pc(
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
  function ue(l, t, e) {
    if (l !== null && (t.dependencies = l.dependencies), je |= t.lanes, (e & t.childLanes) === 0)
      if (l !== null) {
        if (Ca(
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
      for (l = t.child, e = It(l, l.pendingProps), t.child = e, e.return = t; l.sibling !== null; )
        l = l.sibling, e = e.sibling = It(l, l.pendingProps), e.return = t;
      e.sibling = null;
    }
    return t.child;
  }
  function lf(l, t) {
    return (l.lanes & t) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && Dn(l)));
  }
  function ph(l, t, e) {
    switch (t.tag) {
      case 3:
        Xl(t, t.stateNode.containerInfo), ze(t, Zl, l.memoizedState.cache), ua();
        break;
      case 27:
      case 5:
        ye(t);
        break;
      case 4:
        Xl(t, t.stateNode.containerInfo);
        break;
      case 10:
        ze(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Ac(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (De(t), t.flags |= 128, null) : (e & t.child.childLanes) !== 0 ? qr(l, t, e) : (De(t), l = ue(
            l,
            t,
            e
          ), l !== null ? l.sibling : null);
        De(t);
        break;
      case 19:
        var u = (l.flags & 128) !== 0;
        if (a = (e & t.childLanes) !== 0, a || (Ca(
          l,
          t,
          e,
          !1
        ), a = (e & t.childLanes) !== 0), u) {
          if (a)
            return Yr(
              l,
              t,
              e
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), R(Vl, Vl.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, Rr(
          l,
          t,
          e,
          t.pendingProps
        );
      case 24:
        ze(t, Zl, l.memoizedState.cache);
    }
    return ue(l, t, e);
  }
  function Gr(l, t, e) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps)
        Jl = !0;
      else {
        if (!lf(l, e) && (t.flags & 128) === 0)
          return Jl = !1, ph(
            l,
            t,
            e
          );
        Jl = (l.flags & 131072) !== 0;
      }
    else
      Jl = !1, il && (t.flags & 1048576) !== 0 && go(t, Su, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (l = fa(t.elementType), t.type = l, typeof l == "function")
            nc(l) ? (a = da(l, a), t.tag = 1, t = Cr(
              null,
              t,
              l,
              a,
              e
            )) : (t.tag = 0, t = wc(
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
                t.tag = 11, t = Nr(
                  null,
                  t,
                  l,
                  a,
                  e
                );
                break l;
              } else if (u === Z) {
                t.tag = 14, t = Dr(
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
        return wc(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 1:
        return a = t.type, u = da(
          a,
          t.pendingProps
        ), Cr(
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
          u = n.element, _c(l, t), Ou(t, a, null, e);
          var i = t.memoizedState;
          if (a = i.cache, ze(t, Zl, a), a !== n.cache && vc(
            t,
            [Zl],
            e,
            !0
          ), Au(), a = i.element, n.isDehydrated)
            if (n = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
              t = Hr(
                l,
                t,
                a,
                e
              );
              break l;
            } else if (a !== u) {
              u = Ut(
                Error(o(424)),
                t
              ), bu(u), t = Hr(
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
              for (Nl = Yt(l.firstChild), Pl = t, il = !0, pe = null, qt = !0, e = Ro(
                t,
                null,
                a,
                e
              ), t.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
            }
          else {
            if (ua(), a === u) {
              t = ue(
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
        return wn(l, t), l === null ? (e = Fd(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = e : il || (e = t.type, l = t.pendingProps, a = oi(
          w.current
        ).createElement(e), a[Il] = t, a[ot] = l, et(a, e, l), Fl(a), t.stateNode = a) : t.memoizedState = Fd(
          t.type,
          l.memoizedProps,
          t.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return ye(t), l === null && il && (a = t.stateNode = wd(
          t.type,
          t.pendingProps,
          w.current
        ), Pl = t, qt = !0, u = Nl, Be(t.type) ? (Cf = u, Nl = Yt(a.firstChild)) : Nl = u), tt(
          l,
          t,
          t.pendingProps.children,
          e
        ), wn(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && il && ((u = a = Nl) && (a = Ih(
          a,
          t.type,
          t.pendingProps,
          qt
        ), a !== null ? (t.stateNode = a, Pl = t, Nl = Yt(a.firstChild), qt = !1, u = !0) : u = !1), u || Te(t)), ye(t), u = t.type, n = t.pendingProps, i = l !== null ? l.memoizedProps : null, a = n.children, Mf(u, n) ? a = null : i !== null && Mf(u, i) && (t.flags |= 32), t.memoizedState !== null && (u = Nc(
          l,
          t,
          mh,
          null,
          null,
          e
        ), Ju._currentValue = u), wn(l, t), tt(l, t, a, e), t.child;
      case 6:
        return l === null && il && ((l = e = Nl) && (e = Ph(
          e,
          t.pendingProps,
          qt
        ), e !== null ? (t.stateNode = e, Pl = t, Nl = null, l = !0) : l = !1), l || Te(t)), null;
      case 13:
        return qr(l, t, e);
      case 4:
        return Xl(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, l === null ? t.child = oa(
          t,
          null,
          a,
          e
        ) : tt(l, t, a, e), t.child;
      case 11:
        return Nr(
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
        return a = t.pendingProps, ze(t, t.type, a.value), tt(l, t, a.children, e), t.child;
      case 9:
        return u = t.type._context, a = t.pendingProps.children, ia(t), u = lt(u), a = a(u), t.flags |= 1, tt(l, t, a, e), t.child;
      case 14:
        return Dr(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 15:
        return Mr(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 19:
        return Yr(l, t, e);
      case 31:
        return Eh(l, t, e);
      case 22:
        return Rr(
          l,
          t,
          e,
          t.pendingProps
        );
      case 24:
        return ia(t), a = lt(Zl), l === null ? (u = gc(), u === null && (u = pl, n = hc(), u.pooledCache = n, n.refCount++, n !== null && (u.pooledCacheLanes |= e), u = n), t.memoizedState = { parent: a, cache: u }, bc(t), ze(t, Zl, u)) : ((l.lanes & e) !== 0 && (_c(l, t), Ou(t, null, null, e), Au()), u = l.memoizedState, n = t.memoizedState, u.parent !== a ? (u = { parent: a, cache: a }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), ze(t, Zl, a)) : (a = n.cache, ze(t, Zl, a), a !== u.cache && vc(
          t,
          [Zl],
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
  function ne(l) {
    l.flags |= 4;
  }
  function tf(l, t, e, a, u) {
    if ((t = (l.mode & 32) !== 0) && (t = !1), t) {
      if (l.flags |= 16777216, (u & 335544128) === u)
        if (l.stateNode.complete) l.flags |= 8192;
        else if (dd()) l.flags |= 8192;
        else
          throw sa = jn, Sc;
    } else l.flags &= -16777217;
  }
  function Xr(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !tm(t))
      if (dd()) l.flags |= 8192;
      else
        throw sa = jn, Sc;
  }
  function $n(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? Ss() : 536870912, l.lanes |= t, Ja |= t);
  }
  function ju(l, t) {
    if (!il)
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
  function Dl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, e = 0, a = 0;
    if (t)
      for (var u = l.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags & 65011712, a |= u.flags & 65011712, u.return = l, u = u.sibling;
    else
      for (u = l.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags, a |= u.flags, u.return = l, u = u.sibling;
    return l.subtreeFlags |= a, l.childLanes = e, t;
  }
  function Th(l, t, e) {
    var a = t.pendingProps;
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
        return Dl(t), null;
      case 1:
        return Dl(t), null;
      case 3:
        return e = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), te(Zl), jl(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (l === null || l.child === null) && (Ua(t) ? ne(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, rc())), Dl(t), null;
      case 26:
        var u = t.type, n = t.memoizedState;
        return l === null ? (ne(t), n !== null ? (Dl(t), Xr(t, n)) : (Dl(t), tf(
          t,
          u,
          null,
          a,
          e
        ))) : n ? n !== l.memoizedState ? (ne(t), Dl(t), Xr(t, n)) : (Dl(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== a && ne(t), Dl(t), tf(
          t,
          u,
          l,
          a,
          e
        )), null;
      case 27:
        if (We(t), e = w.current, u = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && ne(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Dl(t), null;
          }
          l = q.current, Ua(t) ? bo(t) : (l = wd(u, a, e), t.stateNode = l, ne(t));
        }
        return Dl(t), null;
      case 5:
        if (We(t), u = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && ne(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Dl(t), null;
          }
          if (n = q.current, Ua(t))
            bo(t);
          else {
            var i = oi(
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
            a && ne(t);
          }
        }
        return Dl(t), tf(
          t,
          t.type,
          l === null ? null : l.memoizedProps,
          t.pendingProps,
          e
        ), null;
      case 6:
        if (l && t.stateNode != null)
          l.memoizedProps !== a && ne(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(o(166));
          if (l = w.current, Ua(t)) {
            if (l = t.stateNode, e = t.memoizedProps, a = null, u = Pl, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            l[Il] = t, l = !!(l.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || qd(l.nodeValue, e)), l || Te(t, !0);
          } else
            l = oi(l).createTextNode(
              a
            ), l[Il] = t, t.stateNode = l;
        }
        return Dl(t), null;
      case 31:
        if (e = t.memoizedState, l === null || l.memoizedState !== null) {
          if (a = Ua(t), e !== null) {
            if (l === null) {
              if (!a) throw Error(o(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(557));
              l[Il] = t;
            } else
              ua(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Dl(t), l = !1;
          } else
            e = rc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), l = !0;
          if (!l)
            return t.flags & 256 ? (At(t), t) : (At(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(o(558));
        }
        return Dl(t), null;
      case 13:
        if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (u = Ua(t), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!u) throw Error(o(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(o(317));
              u[Il] = t;
            } else
              ua(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Dl(t), u = !1;
          } else
            u = rc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (At(t), t) : (At(t), null);
        }
        return At(t), (t.flags & 128) !== 0 ? (t.lanes = e, t) : (e = a !== null, l = l !== null && l.memoizedState !== null, e && (a = t.child, u = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (u = a.alternate.memoizedState.cachePool.pool), n = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== u && (a.flags |= 2048)), e !== l && e && (t.child.flags |= 8192), $n(t, t.updateQueue), Dl(t), null);
      case 4:
        return jl(), l === null && zf(t.stateNode.containerInfo), Dl(t), null;
      case 10:
        return te(t.type), Dl(t), null;
      case 19:
        if (A(Vl), a = t.memoizedState, a === null) return Dl(t), null;
        if (u = (t.flags & 128) !== 0, n = a.rendering, n === null)
          if (u) ju(a, !1);
          else {
            if (Cl !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = t.child; l !== null; ) {
                if (n = qn(l), n !== null) {
                  for (t.flags |= 128, ju(a, !1), l = n.updateQueue, t.updateQueue = l, $n(t, l), t.subtreeFlags = 0, l = e, e = t.child; e !== null; )
                    vo(e, l), e = e.sibling;
                  return R(
                    Vl,
                    Vl.current & 1 | 2
                  ), il && Pt(t, a.treeForkCount), t.child;
                }
                l = l.sibling;
              }
            a.tail !== null && Ol() > li && (t.flags |= 128, u = !0, ju(a, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (l = qn(n), l !== null) {
              if (t.flags |= 128, u = !0, l = l.updateQueue, t.updateQueue = l, $n(t, l), ju(a, !0), a.tail === null && a.tailMode === "hidden" && !n.alternate && !il)
                return Dl(t), null;
            } else
              2 * Ol() - a.renderingStartTime > li && e !== 536870912 && (t.flags |= 128, u = !0, ju(a, !1), t.lanes = 4194304);
          a.isBackwards ? (n.sibling = t.child, t.child = n) : (l = a.last, l !== null ? l.sibling = n : t.child = n, a.last = n);
        }
        return a.tail !== null ? (l = a.tail, a.rendering = l, a.tail = l.sibling, a.renderingStartTime = Ol(), l.sibling = null, e = Vl.current, R(
          Vl,
          u ? e & 1 | 2 : e & 1
        ), il && Pt(t, a.treeForkCount), l) : (Dl(t), null);
      case 22:
      case 23:
        return At(t), zc(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (e & 536870912) !== 0 && (t.flags & 128) === 0 && (Dl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Dl(t), e = t.updateQueue, e !== null && $n(t, e.retryQueue), e = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== e && (t.flags |= 2048), l !== null && A(ca), null;
      case 24:
        return e = null, l !== null && (e = l.memoizedState.cache), t.memoizedState.cache !== e && (t.flags |= 2048), te(Zl), Dl(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function zh(l, t) {
    switch (sc(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return te(Zl), jl(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return We(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (At(t), t.alternate === null)
            throw Error(o(340));
          ua();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (At(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(o(340));
          ua();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return A(Vl), null;
      case 4:
        return jl(), null;
      case 10:
        return te(t.type), null;
      case 22:
      case 23:
        return At(t), zc(), l !== null && A(ca), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return te(Zl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Qr(l, t) {
    switch (sc(t), t.tag) {
      case 3:
        te(Zl), jl();
        break;
      case 26:
      case 27:
      case 5:
        We(t);
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
        A(Vl);
        break;
      case 10:
        te(t.type);
        break;
      case 22:
      case 23:
        At(t), zc(), l !== null && A(ca);
        break;
      case 24:
        te(Zl);
    }
  }
  function Uu(l, t) {
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
  function Re(l, t, e) {
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
              } catch (T) {
                yl(
                  u,
                  s,
                  T
                );
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (T) {
      yl(t, t.return, T);
    }
  }
  function Vr(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var e = l.stateNode;
      try {
        jo(t, e);
      } catch (a) {
        yl(l, l.return, a);
      }
    }
  }
  function Lr(l, t, e) {
    e.props = da(
      l.type,
      l.memoizedProps
    ), e.state = l.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      yl(l, t, a);
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
      yl(l, t, u);
    }
  }
  function Kt(l, t) {
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
  function Zr(l) {
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
  function ef(l, t, e) {
    try {
      var a = l.stateNode;
      Jh(a, l.type, e, t), a[ot] = t;
    } catch (u) {
      yl(l, l.return, u);
    }
  }
  function Kr(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && Be(l.type) || l.tag === 4;
  }
  function af(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || Kr(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && Be(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function uf(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(l, t) : (t = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, t.appendChild(l), e = e._reactRootContainer, e != null || t.onclick !== null || (t.onclick = Ft));
    else if (a !== 4 && (a === 27 && Be(l.type) && (e = l.stateNode, t = null), l = l.child, l !== null))
      for (uf(l, t, e), l = l.sibling; l !== null; )
        uf(l, t, e), l = l.sibling;
  }
  function Fn(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? e.insertBefore(l, t) : e.appendChild(l);
    else if (a !== 4 && (a === 27 && Be(l.type) && (e = l.stateNode), l = l.child, l !== null))
      for (Fn(l, t, e), l = l.sibling; l !== null; )
        Fn(l, t, e), l = l.sibling;
  }
  function Jr(l) {
    var t = l.stateNode, e = l.memoizedProps;
    try {
      for (var a = l.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      et(t, a, e), t[Il] = l, t[ot] = e;
    } catch (n) {
      yl(l, l.return, n);
    }
  }
  var ie = !1, wl = !1, nf = !1, wr = typeof WeakSet == "function" ? WeakSet : Set, kl = null;
  function Ah(l, t) {
    if (l = l.containerInfo, Nf = gi, l = uo(l), Ii(l)) {
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
            var i = 0, c = -1, s = -1, h = 0, T = 0, O = l, y = null;
            t: for (; ; ) {
              for (var b; O !== e || u !== 0 && O.nodeType !== 3 || (c = i + u), O !== n || a !== 0 && O.nodeType !== 3 || (s = i + a), O.nodeType === 3 && (i += O.nodeValue.length), (b = O.firstChild) !== null; )
                y = O, O = b;
              for (; ; ) {
                if (O === l) break t;
                if (y === e && ++h === u && (c = i), y === n && ++T === a && (s = i), (b = O.nextSibling) !== null) break;
                O = y, y = O.parentNode;
              }
              O = b;
            }
            e = c === -1 || s === -1 ? null : { start: c, end: s };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (Df = { focusedElem: l, selectionRange: e }, gi = !1, kl = t; kl !== null; )
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
                  var B = da(
                    e.type,
                    u
                  );
                  l = a.getSnapshotBeforeUpdate(
                    B,
                    n
                  ), a.__reactInternalSnapshotBeforeUpdate = l;
                } catch (L) {
                  yl(
                    e,
                    e.return,
                    L
                  );
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (l = t.stateNode.containerInfo, e = l.nodeType, e === 9)
                  xf(l);
                else if (e === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      xf(l);
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
  function Wr(l, t, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        fe(l, e), a & 4 && Uu(5, e);
        break;
      case 1:
        if (fe(l, e), a & 4)
          if (l = e.stateNode, t === null)
            try {
              l.componentDidMount();
            } catch (i) {
              yl(e, e.return, i);
            }
          else {
            var u = da(
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
        a & 64 && Vr(e), a & 512 && Cu(e, e.return);
        break;
      case 3:
        if (fe(l, e), a & 64 && (l = e.updateQueue, l !== null)) {
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
            jo(l, t);
          } catch (i) {
            yl(e, e.return, i);
          }
        }
        break;
      case 27:
        t === null && a & 4 && Jr(e);
      case 26:
      case 5:
        fe(l, e), t === null && a & 4 && Zr(e), a & 512 && Cu(e, e.return);
        break;
      case 12:
        fe(l, e);
        break;
      case 31:
        fe(l, e), a & 4 && kr(l, e);
        break;
      case 13:
        fe(l, e), a & 4 && Ir(l, e), a & 64 && (l = e.memoizedState, l !== null && (l = l.dehydrated, l !== null && (e = Ch.bind(
          null,
          e
        ), l0(l, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || ie, !a) {
          t = t !== null && t.memoizedState !== null || wl, u = ie;
          var n = wl;
          ie = a, (wl = t) && !n ? se(
            l,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : fe(l, e), ie = u, wl = n;
        }
        break;
      case 30:
        break;
      default:
        fe(l, e);
    }
  }
  function $r(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, $r(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && Hi(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var Rl = null, dt = !1;
  function ce(l, t, e) {
    for (e = e.child; e !== null; )
      Fr(l, t, e), e = e.sibling;
  }
  function Fr(l, t, e) {
    if (_t && typeof _t.onCommitFiberUnmount == "function")
      try {
        _t.onCommitFiberUnmount(Wt, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        wl || Kt(e, t), ce(
          l,
          t,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        wl || Kt(e, t);
        var a = Rl, u = dt;
        Be(e.type) && (Rl = e.stateNode, dt = !1), ce(
          l,
          t,
          e
        ), Lu(e.stateNode), Rl = a, dt = u;
        break;
      case 5:
        wl || Kt(e, t);
      case 6:
        if (a = Rl, u = dt, Rl = null, ce(
          l,
          t,
          e
        ), Rl = a, dt = u, Rl !== null)
          if (dt)
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
        Rl !== null && (dt ? (l = Rl, Vd(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          e.stateNode
        ), lu(l)) : Vd(Rl, e.stateNode));
        break;
      case 4:
        a = Rl, u = dt, Rl = e.stateNode.containerInfo, dt = !0, ce(
          l,
          t,
          e
        ), Rl = a, dt = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Re(2, e, t), wl || Re(4, e, t), ce(
          l,
          t,
          e
        );
        break;
      case 1:
        wl || (Kt(e, t), a = e.stateNode, typeof a.componentWillUnmount == "function" && Lr(
          e,
          t,
          a
        )), ce(
          l,
          t,
          e
        );
        break;
      case 21:
        ce(
          l,
          t,
          e
        );
        break;
      case 22:
        wl = (a = wl) || e.memoizedState !== null, ce(
          l,
          t,
          e
        ), wl = a;
        break;
      default:
        ce(
          l,
          t,
          e
        );
    }
  }
  function kr(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        lu(l);
      } catch (e) {
        yl(t, t.return, e);
      }
    }
  }
  function Ir(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        lu(l);
      } catch (e) {
        yl(t, t.return, e);
      }
  }
  function Oh(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new wr()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new wr()), t;
      default:
        throw Error(o(435, l.tag));
    }
  }
  function kn(l, t) {
    var e = Oh(l);
    t.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var u = Hh.bind(null, l, a);
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
              if (Be(c.type)) {
                Rl = c.stateNode, dt = !1;
                break l;
              }
              break;
            case 5:
              Rl = c.stateNode, dt = !1;
              break l;
            case 3:
            case 4:
              Rl = c.stateNode.containerInfo, dt = !0;
              break l;
          }
          c = c.return;
        }
        if (Rl === null) throw Error(o(160));
        Fr(n, i, u), Rl = null, dt = !1, n = u.alternate, n !== null && (n.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Pr(t, l), t = t.sibling;
  }
  var Qt = null;
  function Pr(l, t) {
    var e = l.alternate, a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        mt(t, l), vt(l), a & 4 && (Re(3, l, l.return), Uu(3, l), Re(5, l, l.return));
        break;
      case 1:
        mt(t, l), vt(l), a & 512 && (wl || e === null || Kt(e, e.return)), a & 64 && ie && (l = l.updateQueue, l !== null && (a = l.callbacks, a !== null && (e = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var u = Qt;
        if (mt(t, l), vt(l), a & 512 && (wl || e === null || Kt(e, e.return)), a & 4) {
          var n = e !== null ? e.memoizedState : null;
          if (a = l.memoizedState, e === null)
            if (a === null)
              if (l.stateNode === null) {
                l: {
                  a = l.type, e = l.memoizedProps, u = u.ownerDocument || u;
                  t: switch (a) {
                    case "title":
                      n = u.getElementsByTagName("title")[0], (!n || n[cu] || n[Il] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = u.createElement(a), u.head.insertBefore(
                        n,
                        u.querySelector("head > title")
                      )), et(n, a, e), n[Il] = l, Fl(n), a = n;
                      break l;
                    case "link":
                      var i = Pd(
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
                      if (i = Pd(
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
                lm(
                  u,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = Id(
                u,
                a,
                l.memoizedProps
              );
          else
            n !== a ? (n === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : n.count--, a === null ? lm(
              u,
              l.type,
              l.stateNode
            ) : Id(
              u,
              a,
              l.memoizedProps
            )) : a === null && l.stateNode !== null && ef(
              l,
              l.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        mt(t, l), vt(l), a & 512 && (wl || e === null || Kt(e, e.return)), e !== null && a & 4 && ef(
          l,
          l.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (mt(t, l), vt(l), a & 512 && (wl || e === null || Kt(e, e.return)), l.flags & 32) {
          u = l.stateNode;
          try {
            Ta(u, "");
          } catch (B) {
            yl(l, l.return, B);
          }
        }
        a & 4 && l.stateNode != null && (u = l.memoizedProps, ef(
          l,
          u,
          e !== null ? e.memoizedProps : u
        )), a & 1024 && (nf = !0);
        break;
      case 6:
        if (mt(t, l), vt(l), a & 4) {
          if (l.stateNode === null)
            throw Error(o(162));
          a = l.memoizedProps, e = l.stateNode;
          try {
            e.nodeValue = a;
          } catch (B) {
            yl(l, l.return, B);
          }
        }
        break;
      case 3:
        if (mi = null, u = Qt, Qt = ri(t.containerInfo), mt(t, l), Qt = u, vt(l), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            lu(t.containerInfo);
          } catch (B) {
            yl(l, l.return, B);
          }
        nf && (nf = !1, ld(l));
        break;
      case 4:
        a = Qt, Qt = ri(
          l.stateNode.containerInfo
        ), mt(t, l), vt(l), Qt = a;
        break;
      case 12:
        mt(t, l), vt(l);
        break;
      case 31:
        mt(t, l), vt(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, kn(l, a)));
        break;
      case 13:
        mt(t, l), vt(l), l.child.flags & 8192 && l.memoizedState !== null != (e !== null && e.memoizedState !== null) && (Pn = Ol()), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, kn(l, a)));
        break;
      case 22:
        u = l.memoizedState !== null;
        var s = e !== null && e.memoizedState !== null, h = ie, T = wl;
        if (ie = h || u, wl = T || s, mt(t, l), wl = T, ie = h, vt(l), a & 8192)
          l: for (t = l.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (e === null || s || ie || wl || ma(l)), e = null, t = l; ; ) {
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
                } catch (B) {
                  yl(s, s.return, B);
                }
              }
            } else if (t.tag === 6) {
              if (e === null) {
                s = t;
                try {
                  s.stateNode.nodeValue = u ? "" : s.memoizedProps;
                } catch (B) {
                  yl(s, s.return, B);
                }
              }
            } else if (t.tag === 18) {
              if (e === null) {
                s = t;
                try {
                  var b = s.stateNode;
                  u ? Ld(b, !0) : Ld(s.stateNode, !1);
                } catch (B) {
                  yl(s, s.return, B);
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
        a & 4 && (a = l.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, kn(l, e))));
        break;
      case 19:
        mt(t, l), vt(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, kn(l, a)));
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
          if (Kr(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(o(160));
        switch (e.tag) {
          case 27:
            var u = e.stateNode, n = af(l);
            Fn(l, n, u);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && (Ta(i, ""), e.flags &= -33);
            var c = af(l);
            Fn(l, c, i);
            break;
          case 3:
          case 4:
            var s = e.stateNode.containerInfo, h = af(l);
            uf(
              l,
              h,
              s
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (T) {
        yl(l, l.return, T);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function ld(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        ld(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
      }
  }
  function fe(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Wr(l, t.alternate, t), t = t.sibling;
  }
  function ma(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Re(4, t, t.return), ma(t);
          break;
        case 1:
          Kt(t, t.return);
          var e = t.stateNode;
          typeof e.componentWillUnmount == "function" && Lr(
            t,
            t.return,
            e
          ), ma(t);
          break;
        case 27:
          Lu(t.stateNode);
        case 26:
        case 5:
          Kt(t, t.return), ma(t);
          break;
        case 22:
          t.memoizedState === null && ma(t);
          break;
        case 30:
          ma(t);
          break;
        default:
          ma(t);
      }
      l = l.sibling;
    }
  }
  function se(l, t, e) {
    for (e = e && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, u = l, n = t, i = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          se(
            u,
            n,
            e
          ), Uu(4, n);
          break;
        case 1:
          if (se(
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
                  xo(s[u], c);
            } catch (h) {
              yl(a, a.return, h);
            }
          }
          e && i & 64 && Vr(n), Cu(n, n.return);
          break;
        case 27:
          Jr(n);
        case 26:
        case 5:
          se(
            u,
            n,
            e
          ), e && a === null && i & 4 && Zr(n), Cu(n, n.return);
          break;
        case 12:
          se(
            u,
            n,
            e
          );
          break;
        case 31:
          se(
            u,
            n,
            e
          ), e && i & 4 && kr(u, n);
          break;
        case 13:
          se(
            u,
            n,
            e
          ), e && i & 4 && Ir(u, n);
          break;
        case 22:
          n.memoizedState === null && se(
            u,
            n,
            e
          ), Cu(n, n.return);
          break;
        case 30:
          break;
        default:
          se(
            u,
            n,
            e
          );
      }
      t = t.sibling;
    }
  }
  function cf(l, t) {
    var e = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== e && (l != null && l.refCount++, e != null && _u(e));
  }
  function ff(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && _u(l));
  }
  function Vt(l, t, e, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        td(
          l,
          t,
          e,
          a
        ), t = t.sibling;
  }
  function td(l, t, e, a) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Vt(
          l,
          t,
          e,
          a
        ), u & 2048 && Uu(9, t);
        break;
      case 1:
        Vt(
          l,
          t,
          e,
          a
        );
        break;
      case 3:
        Vt(
          l,
          t,
          e,
          a
        ), u & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && _u(l)));
        break;
      case 12:
        if (u & 2048) {
          Vt(
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
          Vt(
            l,
            t,
            e,
            a
          );
        break;
      case 31:
        Vt(
          l,
          t,
          e,
          a
        );
        break;
      case 13:
        Vt(
          l,
          t,
          e,
          a
        );
        break;
      case 23:
        break;
      case 22:
        n = t.stateNode, i = t.alternate, t.memoizedState !== null ? n._visibility & 2 ? Vt(
          l,
          t,
          e,
          a
        ) : Hu(l, t) : n._visibility & 2 ? Vt(
          l,
          t,
          e,
          a
        ) : (n._visibility |= 2, La(
          l,
          t,
          e,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && cf(i, t);
        break;
      case 24:
        Vt(
          l,
          t,
          e,
          a
        ), u & 2048 && ff(t.alternate, t);
        break;
      default:
        Vt(
          l,
          t,
          e,
          a
        );
    }
  }
  function La(l, t, e, a, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var n = l, i = t, c = e, s = a, h = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          La(
            n,
            i,
            c,
            s,
            u
          ), Uu(8, i);
          break;
        case 23:
          break;
        case 22:
          var T = i.stateNode;
          i.memoizedState !== null ? T._visibility & 2 ? La(
            n,
            i,
            c,
            s,
            u
          ) : Hu(
            n,
            i
          ) : (T._visibility |= 2, La(
            n,
            i,
            c,
            s,
            u
          )), u && h & 2048 && cf(
            i.alternate,
            i
          );
          break;
        case 24:
          La(
            n,
            i,
            c,
            s,
            u
          ), u && h & 2048 && ff(i.alternate, i);
          break;
        default:
          La(
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
  function Hu(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var e = l, a = t, u = a.flags;
        switch (a.tag) {
          case 22:
            Hu(e, a), u & 2048 && cf(
              a.alternate,
              a
            );
            break;
          case 24:
            Hu(e, a), u & 2048 && ff(a.alternate, a);
            break;
          default:
            Hu(e, a);
        }
        t = t.sibling;
      }
  }
  var qu = 8192;
  function Za(l, t, e) {
    if (l.subtreeFlags & qu)
      for (l = l.child; l !== null; )
        ed(
          l,
          t,
          e
        ), l = l.sibling;
  }
  function ed(l, t, e) {
    switch (l.tag) {
      case 26:
        Za(
          l,
          t,
          e
        ), l.flags & qu && l.memoizedState !== null && d0(
          e,
          Qt,
          l.memoizedState,
          l.memoizedProps
        );
        break;
      case 5:
        Za(
          l,
          t,
          e
        );
        break;
      case 3:
      case 4:
        var a = Qt;
        Qt = ri(l.stateNode.containerInfo), Za(
          l,
          t,
          e
        ), Qt = a;
        break;
      case 22:
        l.memoizedState === null && (a = l.alternate, a !== null && a.memoizedState !== null ? (a = qu, qu = 16777216, Za(
          l,
          t,
          e
        ), qu = a) : Za(
          l,
          t,
          e
        ));
        break;
      default:
        Za(
          l,
          t,
          e
        );
    }
  }
  function ad(l) {
    var t = l.alternate;
    if (t !== null && (l = t.child, l !== null)) {
      t.child = null;
      do
        t = l.sibling, l.sibling = null, l = t;
      while (l !== null);
    }
  }
  function Bu(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          kl = a, nd(
            a,
            l
          );
        }
      ad(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        ud(l), l = l.sibling;
  }
  function ud(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Bu(l), l.flags & 2048 && Re(9, l, l.return);
        break;
      case 3:
        Bu(l);
        break;
      case 12:
        Bu(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, In(l)) : Bu(l);
        break;
      default:
        Bu(l);
    }
  }
  function In(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          kl = a, nd(
            a,
            l
          );
        }
      ad(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          Re(8, t, t.return), In(t);
          break;
        case 22:
          e = t.stateNode, e._visibility & 2 && (e._visibility &= -3, In(t));
          break;
        default:
          In(t);
      }
      l = l.sibling;
    }
  }
  function nd(l, t) {
    for (; kl !== null; ) {
      var e = kl;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Re(8, e, t);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          _u(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, kl = a;
      else
        l: for (e = l; kl !== null; ) {
          a = kl;
          var u = a.sibling, n = a.return;
          if ($r(a), a === e) {
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
  var Nh = {
    getCacheForType: function(l) {
      var t = lt(Zl), e = t.data.get(l);
      return e === void 0 && (e = l(), t.data.set(l, e)), e;
    },
    cacheSignal: function() {
      return lt(Zl).controller.signal;
    }
  }, Dh = typeof WeakMap == "function" ? WeakMap : Map, ml = 0, pl = null, tl = null, al = 0, hl = 0, Ot = null, xe = !1, Ka = !1, sf = !1, oe = 0, Cl = 0, je = 0, va = 0, of = 0, Nt = 0, Ja = 0, Yu = null, ht = null, rf = !1, Pn = 0, id = 0, li = 1 / 0, ti = null, Ue = null, Wl = 0, Ce = null, wa = null, re = 0, df = 0, mf = null, cd = null, Gu = 0, vf = null;
  function Dt() {
    return (ml & 2) !== 0 && al !== 0 ? al & -al : E.T !== null ? _f() : ps();
  }
  function fd() {
    if (Nt === 0)
      if ((al & 536870912) === 0 || il) {
        var l = sn;
        sn <<= 1, (sn & 3932160) === 0 && (sn = 262144), Nt = l;
      } else Nt = 536870912;
    return l = zt.current, l !== null && (l.flags |= 32), Nt;
  }
  function yt(l, t, e) {
    (l === pl && (hl === 2 || hl === 9) || l.cancelPendingCommit !== null) && (Wa(l, 0), He(
      l,
      al,
      Nt,
      !1
    )), iu(l, e), ((ml & 2) === 0 || l !== pl) && (l === pl && ((ml & 2) === 0 && (va |= e), Cl === 4 && He(
      l,
      al,
      Nt,
      !1
    )), Jt(l));
  }
  function sd(l, t, e) {
    if ((ml & 6) !== 0) throw Error(o(327));
    var a = !e && (t & 127) === 0 && (t & l.expiredLanes) === 0 || nu(l, t), u = a ? xh(l, t) : yf(l, t, !0), n = a;
    do {
      if (u === 0) {
        Ka && !a && He(l, t, 0, !1);
        break;
      } else {
        if (e = l.current.alternate, n && !Mh(e)) {
          u = yf(l, t, !1), n = !1;
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
              u = Yu;
              var s = c.current.memoizedState.isDehydrated;
              if (s && (Wa(c, i).flags |= 256), i = yf(
                c,
                i,
                !1
              ), i !== 2) {
                if (sf && !s) {
                  c.errorRecoveryDisabledLanes |= n, va |= n, u = 4;
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
          Wa(l, 0), He(l, t, 0, !0);
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
              He(
                a,
                t,
                Nt,
                !xe
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
          if ((t & 62914560) === t && (u = Pn + 300 - Ol(), 10 < u)) {
            if (He(
              a,
              t,
              Nt,
              !xe
            ), rn(a, 0, !0) !== 0) break l;
            re = t, a.timeoutHandle = Xd(
              od.bind(
                null,
                a,
                e,
                ht,
                ti,
                rf,
                t,
                Nt,
                va,
                Ja,
                xe,
                n,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break l;
          }
          od(
            a,
            e,
            ht,
            ti,
            rf,
            t,
            Nt,
            va,
            Ja,
            xe,
            n,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Jt(l);
  }
  function od(l, t, e, a, u, n, i, c, s, h, T, O, y, b) {
    if (l.timeoutHandle = -1, O = t.subtreeFlags, O & 8192 || (O & 16785408) === 16785408) {
      O = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ft
      }, ed(
        t,
        n,
        O
      );
      var B = (n & 62914560) === n ? Pn - Ol() : (n & 4194048) === n ? id - Ol() : 0;
      if (B = m0(
        O,
        B
      ), B !== null) {
        re = n, l.cancelPendingCommit = B(
          Sd.bind(
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
            T,
            O,
            null,
            y,
            b
          )
        ), He(l, n, i, !h);
        return;
      }
    }
    Sd(
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
  function Mh(l) {
    for (var t = l; ; ) {
      var e = t.tag;
      if ((e === 0 || e === 11 || e === 15) && t.flags & 16384 && (e = t.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var a = 0; a < e.length; a++) {
          var u = e[a], n = u.getSnapshot;
          u = u.value;
          try {
            if (!pt(n(), u)) return !1;
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
  function He(l, t, e, a) {
    t &= ~of, t &= ~va, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
    for (var u = t; 0 < u; ) {
      var n = 31 - Et(u), i = 1 << n;
      a[n] = -1, u &= ~i;
    }
    e !== 0 && bs(l, e, t);
  }
  function ei() {
    return (ml & 6) === 0 ? (Xu(0), !1) : !0;
  }
  function hf() {
    if (tl !== null) {
      if (hl === 0)
        var l = tl.return;
      else
        l = tl, le = na = null, Rc(l), Ya = null, pu = 0, l = tl;
      for (; l !== null; )
        Qr(l.alternate, l), l = l.return;
      tl = null;
    }
  }
  function Wa(l, t) {
    var e = l.timeoutHandle;
    e !== -1 && (l.timeoutHandle = -1, $h(e)), e = l.cancelPendingCommit, e !== null && (l.cancelPendingCommit = null, e()), re = 0, hf(), pl = l, tl = e = It(l.current, null), al = t, hl = 0, Ot = null, xe = !1, Ka = nu(l, t), sf = !1, Ja = Nt = of = va = je = Cl = 0, ht = Yu = null, rf = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = l.entangledLanes;
    if (a !== 0)
      for (l = l.entanglements, a &= t; 0 < a; ) {
        var u = 31 - Et(a), n = 1 << u;
        t |= l[u], a &= ~n;
      }
    return oe = t, Tn(), e;
  }
  function rd(l, t) {
    W = null, E.H = Ru, t === Ba || t === xn ? (t = No(), hl = 3) : t === Sc ? (t = No(), hl = 4) : hl = t === Jc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Ot = t, tl === null && (Cl = 1, Kn(
      l,
      Ut(t, l.current)
    ));
  }
  function dd() {
    var l = zt.current;
    return l === null ? !0 : (al & 4194048) === al ? Bt === null : (al & 62914560) === al || (al & 536870912) !== 0 ? l === Bt : !1;
  }
  function md() {
    var l = E.H;
    return E.H = Ru, l === null ? Ru : l;
  }
  function vd() {
    var l = E.A;
    return E.A = Nh, l;
  }
  function ai() {
    Cl = 4, xe || (al & 4194048) !== al && zt.current !== null || (Ka = !0), (je & 134217727) === 0 && (va & 134217727) === 0 || pl === null || He(
      pl,
      al,
      Nt,
      !1
    );
  }
  function yf(l, t, e) {
    var a = ml;
    ml |= 2;
    var u = md(), n = vd();
    (pl !== l || al !== t) && (ti = null, Wa(l, t)), t = !1;
    var i = Cl;
    l: do
      try {
        if (hl !== 0 && tl !== null) {
          var c = tl, s = Ot;
          switch (hl) {
            case 8:
              hf(), i = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              zt.current === null && (t = !0);
              var h = hl;
              if (hl = 0, Ot = null, $a(l, c, s, h), e && Ka) {
                i = 0;
                break l;
              }
              break;
            default:
              h = hl, hl = 0, Ot = null, $a(l, c, s, h);
          }
        }
        Rh(), i = Cl;
        break;
      } catch (T) {
        rd(l, T);
      }
    while (!0);
    return t && l.shellSuspendCounter++, le = na = null, ml = a, E.H = u, E.A = n, tl === null && (pl = null, al = 0, Tn()), i;
  }
  function Rh() {
    for (; tl !== null; ) hd(tl);
  }
  function xh(l, t) {
    var e = ml;
    ml |= 2;
    var a = md(), u = vd();
    pl !== l || al !== t ? (ti = null, li = Ol() + 500, Wa(l, t)) : Ka = nu(
      l,
      t
    );
    l: do
      try {
        if (hl !== 0 && tl !== null) {
          t = tl;
          var n = Ot;
          t: switch (hl) {
            case 1:
              hl = 0, Ot = null, $a(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (Ao(n)) {
                hl = 0, Ot = null, yd(t);
                break;
              }
              t = function() {
                hl !== 2 && hl !== 9 || pl !== l || (hl = 7), Jt(l);
              }, n.then(t, t);
              break l;
            case 3:
              hl = 7;
              break l;
            case 4:
              hl = 5;
              break l;
            case 7:
              Ao(n) ? (hl = 0, Ot = null, yd(t)) : (hl = 0, Ot = null, $a(l, t, n, 7));
              break;
            case 5:
              var i = null;
              switch (tl.tag) {
                case 26:
                  i = tl.memoizedState;
                case 5:
                case 27:
                  var c = tl;
                  if (i ? tm(i) : c.stateNode.complete) {
                    hl = 0, Ot = null;
                    var s = c.sibling;
                    if (s !== null) tl = s;
                    else {
                      var h = c.return;
                      h !== null ? (tl = h, ui(h)) : tl = null;
                    }
                    break t;
                  }
              }
              hl = 0, Ot = null, $a(l, t, n, 5);
              break;
            case 6:
              hl = 0, Ot = null, $a(l, t, n, 6);
              break;
            case 8:
              hf(), Cl = 6;
              break l;
            default:
              throw Error(o(462));
          }
        }
        jh();
        break;
      } catch (T) {
        rd(l, T);
      }
    while (!0);
    return le = na = null, E.H = a, E.A = u, ml = e, tl !== null ? 0 : (pl = null, al = 0, Tn(), Cl);
  }
  function jh() {
    for (; tl !== null && !ft(); )
      hd(tl);
  }
  function hd(l) {
    var t = Gr(l.alternate, l, oe);
    l.memoizedProps = l.pendingProps, t === null ? ui(l) : tl = t;
  }
  function yd(l) {
    var t = l, e = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Ur(
          e,
          t,
          t.pendingProps,
          t.type,
          void 0,
          al
        );
        break;
      case 11:
        t = Ur(
          e,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          al
        );
        break;
      case 5:
        Rc(t);
      default:
        Qr(e, t), t = tl = vo(t, oe), t = Gr(e, t, oe);
    }
    l.memoizedProps = l.pendingProps, t === null ? ui(l) : tl = t;
  }
  function $a(l, t, e, a) {
    le = na = null, Rc(t), Ya = null, pu = 0;
    var u = t.return;
    try {
      if (_h(
        l,
        u,
        t,
        e,
        al
      )) {
        Cl = 1, Kn(
          l,
          Ut(e, l.current)
        ), tl = null;
        return;
      }
    } catch (n) {
      if (u !== null) throw tl = u, n;
      Cl = 1, Kn(
        l,
        Ut(e, l.current)
      ), tl = null;
      return;
    }
    t.flags & 32768 ? (il || a === 1 ? l = !0 : Ka || (al & 536870912) !== 0 ? l = !1 : (xe = l = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = zt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), gd(t, l)) : ui(t);
  }
  function ui(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        gd(
          t,
          xe
        );
        return;
      }
      l = t.return;
      var e = Th(
        t.alternate,
        t,
        oe
      );
      if (e !== null) {
        tl = e;
        return;
      }
      if (t = t.sibling, t !== null) {
        tl = t;
        return;
      }
      tl = t = l;
    } while (t !== null);
    Cl === 0 && (Cl = 5);
  }
  function gd(l, t) {
    do {
      var e = zh(l.alternate, l);
      if (e !== null) {
        e.flags &= 32767, tl = e;
        return;
      }
      if (e = l.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !t && (l = l.sibling, l !== null)) {
        tl = l;
        return;
      }
      tl = l = e;
    } while (l !== null);
    Cl = 6, tl = null;
  }
  function Sd(l, t, e, a, u, n, i, c, s) {
    l.cancelPendingCommit = null;
    do
      ni();
    while (Wl !== 0);
    if ((ml & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === l.current) throw Error(o(177));
      if (n = t.lanes | t.childLanes, n |= ac, rv(
        l,
        e,
        n,
        i,
        c,
        s
      ), l === pl && (tl = pl = null, al = 0), wa = t, Ce = l, re = e, df = n, mf = u, cd = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, qh(Fe, function() {
        return Td(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = E.T, E.T = null, u = j.p, j.p = 2, i = ml, ml |= 4;
        try {
          Ah(l, t, e);
        } finally {
          ml = i, j.p = u, E.T = a;
        }
      }
      Wl = 1, bd(), _d(), Ed();
    }
  }
  function bd() {
    if (Wl === 1) {
      Wl = 0;
      var l = Ce, t = wa, e = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || e) {
        e = E.T, E.T = null;
        var a = j.p;
        j.p = 2;
        var u = ml;
        ml |= 4;
        try {
          Pr(t, l);
          var n = Df, i = uo(l.containerInfo), c = n.focusedElem, s = n.selectionRange;
          if (i !== c && c && c.ownerDocument && ao(
            c.ownerDocument.documentElement,
            c
          )) {
            if (s !== null && Ii(c)) {
              var h = s.start, T = s.end;
              if (T === void 0 && (T = h), "selectionStart" in c)
                c.selectionStart = h, c.selectionEnd = Math.min(
                  T,
                  c.value.length
                );
              else {
                var O = c.ownerDocument || document, y = O && O.defaultView || window;
                if (y.getSelection) {
                  var b = y.getSelection(), B = c.textContent.length, L = Math.min(s.start, B), El = s.end === void 0 ? L : Math.min(s.end, B);
                  !b.extend && L > El && (i = El, El = L, L = i);
                  var m = eo(
                    c,
                    L
                  ), r = eo(
                    c,
                    El
                  );
                  if (m && r && (b.rangeCount !== 1 || b.anchorNode !== m.node || b.anchorOffset !== m.offset || b.focusNode !== r.node || b.focusOffset !== r.offset)) {
                    var v = O.createRange();
                    v.setStart(m.node, m.offset), b.removeAllRanges(), L > El ? (b.addRange(v), b.extend(r.node, r.offset)) : (v.setEnd(r.node, r.offset), b.addRange(v));
                  }
                }
              }
            }
            for (O = [], b = c; b = b.parentNode; )
              b.nodeType === 1 && O.push({
                element: b,
                left: b.scrollLeft,
                top: b.scrollTop
              });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < O.length; c++) {
              var z = O[c];
              z.element.scrollLeft = z.left, z.element.scrollTop = z.top;
            }
          }
          gi = !!Nf, Df = Nf = null;
        } finally {
          ml = u, j.p = a, E.T = e;
        }
      }
      l.current = t, Wl = 2;
    }
  }
  function _d() {
    if (Wl === 2) {
      Wl = 0;
      var l = Ce, t = wa, e = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || e) {
        e = E.T, E.T = null;
        var a = j.p;
        j.p = 2;
        var u = ml;
        ml |= 4;
        try {
          Wr(l, t.alternate, t);
        } finally {
          ml = u, j.p = a, E.T = e;
        }
      }
      Wl = 3;
    }
  }
  function Ed() {
    if (Wl === 4 || Wl === 3) {
      Wl = 0, Ql();
      var l = Ce, t = wa, e = re, a = cd;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Wl = 5 : (Wl = 0, wa = Ce = null, pd(l, l.pendingLanes));
      var u = l.pendingLanes;
      if (u === 0 && (Ue = null), Ui(e), t = t.stateNode, _t && typeof _t.onCommitFiberRoot == "function")
        try {
          _t.onCommitFiberRoot(
            Wt,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        t = E.T, u = j.p, j.p = 2, E.T = null;
        try {
          for (var n = l.onRecoverableError, i = 0; i < a.length; i++) {
            var c = a[i];
            n(c.value, {
              componentStack: c.stack
            });
          }
        } finally {
          E.T = t, j.p = u;
        }
      }
      (re & 3) !== 0 && ni(), Jt(l), u = l.pendingLanes, (e & 261930) !== 0 && (u & 42) !== 0 ? l === vf ? Gu++ : (Gu = 0, vf = l) : Gu = 0, Xu(0);
    }
  }
  function pd(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, _u(t)));
  }
  function ni() {
    return bd(), _d(), Ed(), Td();
  }
  function Td() {
    if (Wl !== 5) return !1;
    var l = Ce, t = df;
    df = 0;
    var e = Ui(re), a = E.T, u = j.p;
    try {
      j.p = 32 > e ? 32 : e, E.T = null, e = mf, mf = null;
      var n = Ce, i = re;
      if (Wl = 0, wa = Ce = null, re = 0, (ml & 6) !== 0) throw Error(o(331));
      var c = ml;
      if (ml |= 4, ud(n.current), td(
        n,
        n.current,
        i,
        e
      ), ml = c, Xu(0, !1), _t && typeof _t.onPostCommitFiberRoot == "function")
        try {
          _t.onPostCommitFiberRoot(Wt, n);
        } catch {
        }
      return !0;
    } finally {
      j.p = u, E.T = a, pd(l, t);
    }
  }
  function zd(l, t, e) {
    t = Ut(e, t), t = Kc(l.stateNode, t, 2), l = Ne(l, t, 2), l !== null && (iu(l, 2), Jt(l));
  }
  function yl(l, t, e) {
    if (l.tag === 3)
      zd(l, l, e);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          zd(
            t,
            l,
            e
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Ue === null || !Ue.has(a))) {
            l = Ut(e, l), e = Ar(2), a = Ne(t, e, 2), a !== null && (Or(
              e,
              a,
              t,
              l
            ), iu(a, 2), Jt(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function gf(l, t, e) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new Dh();
      var u = /* @__PURE__ */ new Set();
      a.set(t, u);
    } else
      u = a.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), a.set(t, u));
    u.has(e) || (sf = !0, u.add(e), l = Uh.bind(null, l, t, e), t.then(l, l));
  }
  function Uh(l, t, e) {
    var a = l.pingCache;
    a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & e, l.warmLanes &= ~e, pl === l && (al & e) === e && (Cl === 4 || Cl === 3 && (al & 62914560) === al && 300 > Ol() - Pn ? (ml & 2) === 0 && Wa(l, 0) : of |= e, Ja === al && (Ja = 0)), Jt(l);
  }
  function Ad(l, t) {
    t === 0 && (t = Ss()), l = ea(l, t), l !== null && (iu(l, t), Jt(l));
  }
  function Ch(l) {
    var t = l.memoizedState, e = 0;
    t !== null && (e = t.retryLane), Ad(l, e);
  }
  function Hh(l, t) {
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
    a !== null && a.delete(t), Ad(l, e);
  }
  function qh(l, t) {
    return Al(l, t);
  }
  var ii = null, Fa = null, Sf = !1, ci = !1, bf = !1, qe = 0;
  function Jt(l) {
    l !== Fa && l.next === null && (Fa === null ? ii = Fa = l : Fa = Fa.next = l), ci = !0, Sf || (Sf = !0, Yh());
  }
  function Xu(l, t) {
    if (!bf && ci) {
      bf = !0;
      do
        for (var e = !1, a = ii; a !== null; ) {
          if (l !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = a.suspendedLanes, c = a.pingedLanes;
              n = (1 << 31 - Et(42 | l) + 1) - 1, n &= u & ~(i & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (e = !0, Md(a, n));
          } else
            n = al, n = rn(
              a,
              a === pl ? n : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (n & 3) === 0 || nu(a, n) || (e = !0, Md(a, n));
          a = a.next;
        }
      while (e);
      bf = !1;
    }
  }
  function Bh() {
    Od();
  }
  function Od() {
    ci = Sf = !1;
    var l = 0;
    qe !== 0 && Wh() && (l = qe);
    for (var t = Ol(), e = null, a = ii; a !== null; ) {
      var u = a.next, n = Nd(a, t);
      n === 0 ? (a.next = null, e === null ? ii = u : e.next = u, u === null && (Fa = e)) : (e = a, (l !== 0 || (n & 3) !== 0) && (ci = !0)), a = u;
    }
    Wl !== 0 && Wl !== 5 || Xu(l), qe !== 0 && (qe = 0);
  }
  function Nd(l, t) {
    for (var e = l.suspendedLanes, a = l.pingedLanes, u = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
      var i = 31 - Et(n), c = 1 << i, s = u[i];
      s === -1 ? ((c & e) === 0 || (c & a) !== 0) && (u[i] = ov(c, t)) : s <= t && (l.expiredLanes |= c), n &= ~c;
    }
    if (t = pl, e = al, e = rn(
      l,
      l === t ? e : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a = l.callbackNode, e === 0 || l === t && (hl === 2 || hl === 9) || l.cancelPendingCommit !== null)
      return a !== null && a !== null && ct(a), l.callbackNode = null, l.callbackPriority = 0;
    if ((e & 3) === 0 || nu(l, e)) {
      if (t = e & -e, t === l.callbackPriority) return t;
      switch (a !== null && ct(a), Ui(e)) {
        case 2:
        case 8:
          e = au;
          break;
        case 32:
          e = Fe;
          break;
        case 268435456:
          e = Mt;
          break;
        default:
          e = Fe;
      }
      return a = Dd.bind(null, l), e = Al(e, a), l.callbackPriority = t, l.callbackNode = e, t;
    }
    return a !== null && a !== null && ct(a), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function Dd(l, t) {
    if (Wl !== 0 && Wl !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var e = l.callbackNode;
    if (ni() && l.callbackNode !== e)
      return null;
    var a = al;
    return a = rn(
      l,
      l === pl ? a : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a === 0 ? null : (sd(l, a, t), Nd(l, Ol()), l.callbackNode != null && l.callbackNode === e ? Dd.bind(null, l) : null);
  }
  function Md(l, t) {
    if (ni()) return null;
    sd(l, t, !0);
  }
  function Yh() {
    Fh(function() {
      (ml & 6) !== 0 ? Al(
        ge,
        Bh
      ) : Od();
    });
  }
  function _f() {
    if (qe === 0) {
      var l = Ha;
      l === 0 && (l = fn, fn <<= 1, (fn & 261888) === 0 && (fn = 256)), qe = l;
    }
    return qe;
  }
  function Rd(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : hn("" + l);
  }
  function xd(l, t) {
    var e = t.ownerDocument.createElement("input");
    return e.name = t.name, e.value = t.value, l.id && e.setAttribute("form", l.id), t.parentNode.insertBefore(e, t), l = new FormData(l), e.parentNode.removeChild(e), l;
  }
  function Gh(l, t, e, a, u) {
    if (t === "submit" && e && e.stateNode === u) {
      var n = Rd(
        (u[ot] || null).action
      ), i = a.submitter;
      i && (t = (t = i[ot] || null) ? Rd(t.formAction) : i.getAttribute("formAction"), t !== null && (n = t, i = null));
      var c = new bn(
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
                if (qe !== 0) {
                  var s = i ? xd(u, i) : new FormData(u);
                  Gc(
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
                typeof n == "function" && (c.preventDefault(), s = i ? xd(u, i) : new FormData(u), Gc(
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
  for (var Ef = 0; Ef < ec.length; Ef++) {
    var pf = ec[Ef], Xh = pf.toLowerCase(), Qh = pf[0].toUpperCase() + pf.slice(1);
    Xt(
      Xh,
      "on" + Qh
    );
  }
  Xt(co, "onAnimationEnd"), Xt(fo, "onAnimationIteration"), Xt(so, "onAnimationStart"), Xt("dblclick", "onDoubleClick"), Xt("focusin", "onFocus"), Xt("focusout", "onBlur"), Xt(ah, "onTransitionRun"), Xt(uh, "onTransitionStart"), Xt(nh, "onTransitionCancel"), Xt(oo, "onTransitionEnd"), Ea("onMouseEnter", ["mouseout", "mouseover"]), Ea("onMouseLeave", ["mouseout", "mouseover"]), Ea("onPointerEnter", ["pointerout", "pointerover"]), Ea("onPointerLeave", ["pointerout", "pointerover"]), Ie(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Ie(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Ie("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Ie(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Ie(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Ie(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Qu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Vh = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Qu)
  );
  function jd(l, t) {
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
            } catch (T) {
              pn(T);
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
            } catch (T) {
              pn(T);
            }
            u.currentTarget = null, n = s;
          }
      }
    }
  }
  function el(l, t) {
    var e = t[Ci];
    e === void 0 && (e = t[Ci] = /* @__PURE__ */ new Set());
    var a = l + "__bubble";
    e.has(a) || (Ud(t, l, 2, !1), e.add(a));
  }
  function Tf(l, t, e) {
    var a = 0;
    t && (a |= 4), Ud(
      e,
      l,
      a,
      t
    );
  }
  var fi = "_reactListening" + Math.random().toString(36).slice(2);
  function zf(l) {
    if (!l[fi]) {
      l[fi] = !0, As.forEach(function(e) {
        e !== "selectionchange" && (Vh.has(e) || Tf(e, !1, l), Tf(e, !0, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[fi] || (t[fi] = !0, Tf("selectionchange", !1, t));
    }
  }
  function Ud(l, t, e, a) {
    switch (fm(t)) {
      case 2:
        var u = y0;
        break;
      case 8:
        u = g0;
        break;
      default:
        u = Gf;
    }
    e = u.bind(
      null,
      t,
      e,
      l
    ), u = void 0, !Li || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), a ? u !== void 0 ? l.addEventListener(t, e, {
      capture: !0,
      passive: u
    }) : l.addEventListener(t, e, !0) : u !== void 0 ? l.addEventListener(t, e, {
      passive: u
    }) : l.addEventListener(t, e, !1);
  }
  function Af(l, t, e, a, u) {
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
            if (i = Sa(c), i === null) return;
            if (s = i.tag, s === 5 || s === 6 || s === 26 || s === 27) {
              a = n = i;
              continue l;
            }
            c = c.parentNode;
          }
        }
        a = a.return;
      }
    Bs(function() {
      var h = n, T = Qi(e), O = [];
      l: {
        var y = ro.get(l);
        if (y !== void 0) {
          var b = bn, B = l;
          switch (l) {
            case "keypress":
              if (gn(e) === 0) break l;
            case "keydown":
            case "keyup":
              b = Hv;
              break;
            case "focusin":
              B = "focus", b = wi;
              break;
            case "focusout":
              B = "blur", b = wi;
              break;
            case "beforeblur":
            case "afterblur":
              b = wi;
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
              b = Xs;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              b = Tv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              b = Yv;
              break;
            case co:
            case fo:
            case so:
              b = Ov;
              break;
            case oo:
              b = Xv;
              break;
            case "scroll":
            case "scrollend":
              b = Ev;
              break;
            case "wheel":
              b = Vv;
              break;
            case "copy":
            case "cut":
            case "paste":
              b = Dv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              b = Vs;
              break;
            case "toggle":
            case "beforetoggle":
              b = Zv;
          }
          var L = (t & 4) !== 0, El = !L && (l === "scroll" || l === "scrollend"), m = L ? y !== null ? y + "Capture" : null : y;
          L = [];
          for (var r = h, v; r !== null; ) {
            var z = r;
            if (v = z.stateNode, z = z.tag, z !== 5 && z !== 26 && z !== 27 || v === null || m === null || (z = su(r, m), z != null && L.push(
              Vu(r, z, v)
            )), El) break;
            r = r.return;
          }
          0 < L.length && (y = new b(
            y,
            B,
            null,
            e,
            T
          ), O.push({ event: y, listeners: L }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (y = l === "mouseover" || l === "pointerover", b = l === "mouseout" || l === "pointerout", y && e !== Xi && (B = e.relatedTarget || e.fromElement) && (Sa(B) || B[ga]))
            break l;
          if ((b || y) && (y = T.window === T ? T : (y = T.ownerDocument) ? y.defaultView || y.parentWindow : window, b ? (B = e.relatedTarget || e.toElement, b = h, B = B ? Sa(B) : null, B !== null && (El = C(B), L = B.tag, B !== El || L !== 5 && L !== 27 && L !== 6) && (B = null)) : (b = null, B = h), b !== B)) {
            if (L = Xs, z = "onMouseLeave", m = "onMouseEnter", r = "mouse", (l === "pointerout" || l === "pointerover") && (L = Vs, z = "onPointerLeave", m = "onPointerEnter", r = "pointer"), El = b == null ? y : fu(b), v = B == null ? y : fu(B), y = new L(
              z,
              r + "leave",
              b,
              e,
              T
            ), y.target = El, y.relatedTarget = v, z = null, Sa(T) === h && (L = new L(
              m,
              r + "enter",
              B,
              e,
              T
            ), L.target = v, L.relatedTarget = El, z = L), El = z, b && B)
              t: {
                for (L = Lh, m = b, r = B, v = 0, z = m; z; z = L(z))
                  v++;
                z = 0;
                for (var X = r; X; X = L(X))
                  z++;
                for (; 0 < v - z; )
                  m = L(m), v--;
                for (; 0 < z - v; )
                  r = L(r), z--;
                for (; v--; ) {
                  if (m === r || r !== null && m === r.alternate) {
                    L = m;
                    break t;
                  }
                  m = L(m), r = L(r);
                }
                L = null;
              }
            else L = null;
            b !== null && Cd(
              O,
              y,
              b,
              L,
              !1
            ), B !== null && El !== null && Cd(
              O,
              El,
              B,
              L,
              !0
            );
          }
        }
        l: {
          if (y = h ? fu(h) : window, b = y.nodeName && y.nodeName.toLowerCase(), b === "select" || b === "input" && y.type === "file")
            var ol = Fs;
          else if (Ws(y))
            if (ks)
              ol = lh;
            else {
              ol = Iv;
              var G = kv;
            }
          else
            b = y.nodeName, !b || b.toLowerCase() !== "input" || y.type !== "checkbox" && y.type !== "radio" ? h && Gi(h.elementType) && (ol = Fs) : ol = Pv;
          if (ol && (ol = ol(l, h))) {
            $s(
              O,
              ol,
              e,
              T
            );
            break l;
          }
          G && G(l, y, h), l === "focusout" && h && y.type === "number" && h.memoizedProps.value != null && Yi(y, "number", y.value);
        }
        switch (G = h ? fu(h) : window, l) {
          case "focusin":
            (Ws(G) || G.contentEditable === "true") && (Na = G, Pi = h, gu = null);
            break;
          case "focusout":
            gu = Pi = Na = null;
            break;
          case "mousedown":
            lc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            lc = !1, no(O, e, T);
            break;
          case "selectionchange":
            if (eh) break;
          case "keydown":
          case "keyup":
            no(O, e, T);
        }
        var F;
        if ($i)
          l: {
            switch (l) {
              case "compositionstart":
                var ul = "onCompositionStart";
                break l;
              case "compositionend":
                ul = "onCompositionEnd";
                break l;
              case "compositionupdate":
                ul = "onCompositionUpdate";
                break l;
            }
            ul = void 0;
          }
        else
          Oa ? Js(l, e) && (ul = "onCompositionEnd") : l === "keydown" && e.keyCode === 229 && (ul = "onCompositionStart");
        ul && (Ls && e.locale !== "ko" && (Oa || ul !== "onCompositionStart" ? ul === "onCompositionEnd" && Oa && (F = Ys()) : (_e = T, Zi = "value" in _e ? _e.value : _e.textContent, Oa = !0)), G = si(h, ul), 0 < G.length && (ul = new Qs(
          ul,
          l,
          null,
          e,
          T
        ), O.push({ event: ul, listeners: G }), F ? ul.data = F : (F = ws(e), F !== null && (ul.data = F)))), (F = Jv ? wv(l, e) : Wv(l, e)) && (ul = si(h, "onBeforeInput"), 0 < ul.length && (G = new Qs(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          T
        ), O.push({
          event: G,
          listeners: ul
        }), G.data = F)), Gh(
          O,
          l,
          h,
          e,
          T
        );
      }
      jd(O, t);
    });
  }
  function Vu(l, t, e) {
    return {
      instance: l,
      listener: t,
      currentTarget: e
    };
  }
  function si(l, t) {
    for (var e = t + "Capture", a = []; l !== null; ) {
      var u = l, n = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || n === null || (u = su(l, e), u != null && a.unshift(
        Vu(l, u, n)
      ), u = su(l, t), u != null && a.push(
        Vu(l, u, n)
      )), l.tag === 3) return a;
      l = l.return;
    }
    return [];
  }
  function Lh(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Cd(l, t, e, a, u) {
    for (var n = t._reactName, i = []; e !== null && e !== a; ) {
      var c = e, s = c.alternate, h = c.stateNode;
      if (c = c.tag, s !== null && s === a) break;
      c !== 5 && c !== 26 && c !== 27 || h === null || (s = h, u ? (h = su(e, n), h != null && i.unshift(
        Vu(e, h, s)
      )) : u || (h = su(e, n), h != null && i.push(
        Vu(e, h, s)
      ))), e = e.return;
    }
    i.length !== 0 && l.push({ event: t, listeners: i });
  }
  var Zh = /\r\n?/g, Kh = /\u0000|\uFFFD/g;
  function Hd(l) {
    return (typeof l == "string" ? l : "" + l).replace(Zh, `
`).replace(Kh, "");
  }
  function qd(l, t) {
    return t = Hd(t), Hd(l) === t;
  }
  function _l(l, t, e, a, u, n) {
    switch (e) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || Ta(l, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && Ta(l, "" + a);
        break;
      case "className":
        mn(l, "class", a);
        break;
      case "tabIndex":
        mn(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        mn(l, e, a);
        break;
      case "style":
        Hs(l, a, n);
        break;
      case "data":
        if (t !== "object") {
          mn(l, "data", a);
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
        a = hn("" + a), l.setAttribute(e, a);
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
          typeof n == "function" && (e === "formAction" ? (t !== "input" && _l(l, t, "name", u.name, u, null), _l(
            l,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), _l(
            l,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), _l(
            l,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (_l(l, t, "encType", u.encType, u, null), _l(l, t, "method", u.method, u, null), _l(l, t, "target", u.target, u, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        a = hn("" + a), l.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (l.onclick = Ft);
        break;
      case "onScroll":
        a != null && el("scroll", l);
        break;
      case "onScrollEnd":
        a != null && el("scrollend", l);
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
        e = hn("" + a), l.setAttributeNS(
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
        el("beforetoggle", l), el("toggle", l), dn(l, "popover", a);
        break;
      case "xlinkActuate":
        $t(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        $t(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        $t(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        $t(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        $t(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        $t(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        $t(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        $t(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        $t(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        dn(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = bv.get(e) || e, dn(l, e, a));
    }
  }
  function Of(l, t, e, a, u, n) {
    switch (e) {
      case "style":
        Hs(l, a, n);
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
        typeof a == "string" ? Ta(l, a) : (typeof a == "number" || typeof a == "bigint") && Ta(l, "" + a);
        break;
      case "onScroll":
        a != null && el("scroll", l);
        break;
      case "onScrollEnd":
        a != null && el("scrollend", l);
        break;
      case "onClick":
        a != null && (l.onclick = Ft);
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
        if (!Os.hasOwnProperty(e))
          l: {
            if (e[0] === "o" && e[1] === "n" && (u = e.endsWith("Capture"), t = e.slice(2, u ? e.length - 7 : void 0), n = l[ot] || null, n = n != null ? n[e] : null, typeof n == "function" && l.removeEventListener(t, n, u), typeof a == "function")) {
              typeof n != "function" && n !== null && (e in l ? l[e] = null : l.hasAttribute(e) && l.removeAttribute(e)), l.addEventListener(t, a, u);
              break l;
            }
            e in l ? l[e] = a : a === !0 ? l.setAttribute(e, "") : dn(l, e, a);
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
        el("error", l), el("load", l);
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
                  _l(l, t, n, i, e, null);
              }
          }
        u && _l(l, t, "srcSet", e.srcSet, e, null), a && _l(l, t, "src", e.src, e, null);
        return;
      case "input":
        el("invalid", l);
        var c = n = i = u = null, s = null, h = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var T = e[a];
            if (T != null)
              switch (a) {
                case "name":
                  u = T;
                  break;
                case "type":
                  i = T;
                  break;
                case "checked":
                  s = T;
                  break;
                case "defaultChecked":
                  h = T;
                  break;
                case "value":
                  n = T;
                  break;
                case "defaultValue":
                  c = T;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (T != null)
                    throw Error(o(137, t));
                  break;
                default:
                  _l(l, t, a, T, e, null);
              }
          }
        xs(
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
        el("invalid", l), a = i = n = null;
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
                _l(l, t, u, c, e, null);
            }
        t = n, e = i, l.multiple = !!a, t != null ? pa(l, !!a, t, !1) : e != null && pa(l, !!a, e, !0);
        return;
      case "textarea":
        el("invalid", l), n = u = a = null;
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
                _l(l, t, i, c, e, null);
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
                _l(l, t, s, a, e, null);
            }
        return;
      case "dialog":
        el("beforetoggle", l), el("toggle", l), el("cancel", l), el("close", l);
        break;
      case "iframe":
      case "object":
        el("load", l);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Qu.length; a++)
          el(Qu[a], l);
        break;
      case "image":
        el("error", l), el("load", l);
        break;
      case "details":
        el("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        el("error", l), el("load", l);
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
                _l(l, t, h, a, e, null);
            }
        return;
      default:
        if (Gi(t)) {
          for (T in e)
            e.hasOwnProperty(T) && (a = e[T], a !== void 0 && Of(
              l,
              t,
              T,
              a,
              e,
              void 0
            ));
          return;
        }
    }
    for (c in e)
      e.hasOwnProperty(c) && (a = e[c], a != null && _l(l, t, c, a, e, null));
  }
  function Jh(l, t, e, a) {
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
        var u = null, n = null, i = null, c = null, s = null, h = null, T = null;
        for (b in e) {
          var O = e[b];
          if (e.hasOwnProperty(b) && O != null)
            switch (b) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                s = O;
              default:
                a.hasOwnProperty(b) || _l(l, t, b, null, a, O);
            }
        }
        for (var y in a) {
          var b = a[y];
          if (O = e[y], a.hasOwnProperty(y) && (b != null || O != null))
            switch (y) {
              case "type":
                n = b;
                break;
              case "name":
                u = b;
                break;
              case "checked":
                h = b;
                break;
              case "defaultChecked":
                T = b;
                break;
              case "value":
                i = b;
                break;
              case "defaultValue":
                c = b;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (b != null)
                  throw Error(o(137, t));
                break;
              default:
                b !== O && _l(
                  l,
                  t,
                  y,
                  b,
                  a,
                  O
                );
            }
        }
        Bi(
          l,
          i,
          c,
          s,
          h,
          T,
          n,
          u
        );
        return;
      case "select":
        b = i = c = y = null;
        for (n in e)
          if (s = e[n], e.hasOwnProperty(n) && s != null)
            switch (n) {
              case "value":
                break;
              case "multiple":
                b = s;
              default:
                a.hasOwnProperty(n) || _l(
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
                n !== s && _l(
                  l,
                  t,
                  u,
                  n,
                  a,
                  s
                );
            }
        t = c, e = i, a = b, y != null ? pa(l, !!e, y, !1) : !!a != !!e && (t != null ? pa(l, !!e, t, !0) : pa(l, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        b = y = null;
        for (c in e)
          if (u = e[c], e.hasOwnProperty(c) && u != null && !a.hasOwnProperty(c))
            switch (c) {
              case "value":
                break;
              case "children":
                break;
              default:
                _l(l, t, c, null, a, u);
            }
        for (i in a)
          if (u = a[i], n = e[i], a.hasOwnProperty(i) && (u != null || n != null))
            switch (i) {
              case "value":
                y = u;
                break;
              case "defaultValue":
                b = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(o(91));
                break;
              default:
                u !== n && _l(l, t, i, u, a, n);
            }
        js(l, y, b);
        return;
      case "option":
        for (var B in e)
          if (y = e[B], e.hasOwnProperty(B) && y != null && !a.hasOwnProperty(B))
            switch (B) {
              case "selected":
                l.selected = !1;
                break;
              default:
                _l(
                  l,
                  t,
                  B,
                  null,
                  a,
                  y
                );
            }
        for (s in a)
          if (y = a[s], b = e[s], a.hasOwnProperty(s) && y !== b && (y != null || b != null))
            switch (s) {
              case "selected":
                l.selected = y && typeof y != "function" && typeof y != "symbol";
                break;
              default:
                _l(
                  l,
                  t,
                  s,
                  y,
                  a,
                  b
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
        for (var L in e)
          y = e[L], e.hasOwnProperty(L) && y != null && !a.hasOwnProperty(L) && _l(l, t, L, null, a, y);
        for (h in a)
          if (y = a[h], b = e[h], a.hasOwnProperty(h) && y !== b && (y != null || b != null))
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (y != null)
                  throw Error(o(137, t));
                break;
              default:
                _l(
                  l,
                  t,
                  h,
                  y,
                  a,
                  b
                );
            }
        return;
      default:
        if (Gi(t)) {
          for (var El in e)
            y = e[El], e.hasOwnProperty(El) && y !== void 0 && !a.hasOwnProperty(El) && Of(
              l,
              t,
              El,
              void 0,
              a,
              y
            );
          for (T in a)
            y = a[T], b = e[T], !a.hasOwnProperty(T) || y === b || y === void 0 && b === void 0 || Of(
              l,
              t,
              T,
              y,
              a,
              b
            );
          return;
        }
    }
    for (var m in e)
      y = e[m], e.hasOwnProperty(m) && y != null && !a.hasOwnProperty(m) && _l(l, t, m, null, a, y);
    for (O in a)
      y = a[O], b = e[O], !a.hasOwnProperty(O) || y === b || y == null && b == null || _l(l, t, O, y, a, b);
  }
  function Bd(l) {
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
  function wh() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, t = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var u = e[a], n = u.transferSize, i = u.initiatorType, c = u.duration;
        if (n && c && Bd(i)) {
          for (i = 0, c = u.responseEnd, a += 1; a < e.length; a++) {
            var s = e[a], h = s.startTime;
            if (h > c) break;
            var T = s.transferSize, O = s.initiatorType;
            T && Bd(O) && (s = s.responseEnd, i += T * (s < c ? 1 : (c - h) / (s - h)));
          }
          if (--a, t += 8 * (n + i) / (u.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var Nf = null, Df = null;
  function oi(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Yd(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Gd(l, t) {
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
  function Mf(l, t) {
    return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Rf = null;
  function Wh() {
    var l = window.event;
    return l && l.type === "popstate" ? l === Rf ? !1 : (Rf = l, !0) : (Rf = null, !1);
  }
  var Xd = typeof setTimeout == "function" ? setTimeout : void 0, $h = typeof clearTimeout == "function" ? clearTimeout : void 0, Qd = typeof Promise == "function" ? Promise : void 0, Fh = typeof queueMicrotask == "function" ? queueMicrotask : typeof Qd < "u" ? function(l) {
    return Qd.resolve(null).then(l).catch(kh);
  } : Xd;
  function kh(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function Be(l) {
    return l === "head";
  }
  function Vd(l, t) {
    var e = t, a = 0;
    do {
      var u = e.nextSibling;
      if (l.removeChild(e), u && u.nodeType === 8)
        if (e = u.data, e === "/$" || e === "/&") {
          if (a === 0) {
            l.removeChild(u), lu(t);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          Lu(l.ownerDocument.documentElement);
        else if (e === "head") {
          e = l.ownerDocument.head, Lu(e);
          for (var n = e.firstChild; n; ) {
            var i = n.nextSibling, c = n.nodeName;
            n[cu] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && n.rel.toLowerCase() === "stylesheet" || e.removeChild(n), n = i;
          }
        } else
          e === "body" && Lu(l.ownerDocument.body);
      e = u;
    } while (e);
    lu(t);
  }
  function Ld(l, t) {
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
  function xf(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var e = t;
      switch (t = t.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          xf(e), Hi(e);
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
  function Ih(l, t, e, a) {
    for (; l.nodeType === 1; ) {
      var u = e;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (a) {
        if (!l[cu])
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
      if (l = Yt(l.nextSibling), l === null) break;
    }
    return null;
  }
  function Ph(l, t, e) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !e || (l = Yt(l.nextSibling), l === null)) return null;
    return l;
  }
  function Zd(l, t) {
    for (; l.nodeType !== 8; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = Yt(l.nextSibling), l === null)) return null;
    return l;
  }
  function jf(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function Uf(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function l0(l, t) {
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
  function Yt(l) {
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
  var Cf = null;
  function Kd(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "/$" || e === "/&") {
          if (t === 0)
            return Yt(l.nextSibling);
          t--;
        } else
          e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function Jd(l) {
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
  function wd(l, t, e) {
    switch (t = oi(e), l) {
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
  function Lu(l) {
    for (var t = l.attributes; t.length; )
      l.removeAttributeNode(t[0]);
    Hi(l);
  }
  var Gt = /* @__PURE__ */ new Map(), Wd = /* @__PURE__ */ new Set();
  function ri(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var de = j.d;
  j.d = {
    f: t0,
    r: e0,
    D: a0,
    C: u0,
    L: n0,
    m: i0,
    X: f0,
    S: c0,
    M: s0
  };
  function t0() {
    var l = de.f(), t = ei();
    return l || t;
  }
  function e0(l) {
    var t = ba(l);
    t !== null && t.tag === 5 && t.type === "form" ? rr(t) : de.r(l);
  }
  var ka = typeof document > "u" ? null : document;
  function $d(l, t, e) {
    var a = ka;
    if (a && typeof t == "string" && t) {
      var u = xt(t);
      u = 'link[rel="' + l + '"][href="' + u + '"]', typeof e == "string" && (u += '[crossorigin="' + e + '"]'), Wd.has(u) || (Wd.add(u), l = { rel: l, crossOrigin: e, href: t }, a.querySelector(u) === null && (t = a.createElement("link"), et(t, "link", l), Fl(t), a.head.appendChild(t)));
    }
  }
  function a0(l) {
    de.D(l), $d("dns-prefetch", l, null);
  }
  function u0(l, t) {
    de.C(l, t), $d("preconnect", l, t);
  }
  function n0(l, t, e) {
    de.L(l, t, e);
    var a = ka;
    if (a && l && t) {
      var u = 'link[rel="preload"][as="' + xt(t) + '"]';
      t === "image" && e && e.imageSrcSet ? (u += '[imagesrcset="' + xt(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (u += '[imagesizes="' + xt(
        e.imageSizes
      ) + '"]')) : u += '[href="' + xt(l) + '"]';
      var n = u;
      switch (t) {
        case "style":
          n = Ia(l);
          break;
        case "script":
          n = Pa(l);
      }
      Gt.has(n) || (l = N(
        {
          rel: "preload",
          href: t === "image" && e && e.imageSrcSet ? void 0 : l,
          as: t
        },
        e
      ), Gt.set(n, l), a.querySelector(u) !== null || t === "style" && a.querySelector(Zu(n)) || t === "script" && a.querySelector(Ku(n)) || (t = a.createElement("link"), et(t, "link", l), Fl(t), a.head.appendChild(t)));
    }
  }
  function i0(l, t) {
    de.m(l, t);
    var e = ka;
    if (e && l) {
      var a = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + xt(a) + '"][href="' + xt(l) + '"]', n = u;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = Pa(l);
      }
      if (!Gt.has(n) && (l = N({ rel: "modulepreload", href: l }, t), Gt.set(n, l), e.querySelector(u) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(Ku(n)))
              return;
        }
        a = e.createElement("link"), et(a, "link", l), Fl(a), e.head.appendChild(a);
      }
    }
  }
  function c0(l, t, e) {
    de.S(l, t, e);
    var a = ka;
    if (a && l) {
      var u = _a(a).hoistableStyles, n = Ia(l);
      t = t || "default";
      var i = u.get(n);
      if (!i) {
        var c = { loading: 0, preload: null };
        if (i = a.querySelector(
          Zu(n)
        ))
          c.loading = 5;
        else {
          l = N(
            { rel: "stylesheet", href: l, "data-precedence": t },
            e
          ), (e = Gt.get(n)) && Hf(l, e);
          var s = i = a.createElement("link");
          Fl(s), et(s, "link", l), s._p = new Promise(function(h, T) {
            s.onload = h, s.onerror = T;
          }), s.addEventListener("load", function() {
            c.loading |= 1;
          }), s.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, di(i, t, a);
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
  function f0(l, t) {
    de.X(l, t);
    var e = ka;
    if (e && l) {
      var a = _a(e).hoistableScripts, u = Pa(l), n = a.get(u);
      n || (n = e.querySelector(Ku(u)), n || (l = N({ src: l, async: !0 }, t), (t = Gt.get(u)) && qf(l, t), n = e.createElement("script"), Fl(n), et(n, "link", l), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function s0(l, t) {
    de.M(l, t);
    var e = ka;
    if (e && l) {
      var a = _a(e).hoistableScripts, u = Pa(l), n = a.get(u);
      n || (n = e.querySelector(Ku(u)), n || (l = N({ src: l, async: !0, type: "module" }, t), (t = Gt.get(u)) && qf(l, t), n = e.createElement("script"), Fl(n), et(n, "link", l), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function Fd(l, t, e, a) {
    var u = (u = w.current) ? ri(u) : null;
    if (!u) throw Error(o(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (t = Ia(e.href), e = _a(
          u
        ).hoistableStyles, a = e.get(t), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          l = Ia(e.href);
          var n = _a(
            u
          ).hoistableStyles, i = n.get(l);
          if (i || (u = u.ownerDocument || u, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, n.set(l, i), (n = u.querySelector(
            Zu(l)
          )) && !n._p && (i.instance = n, i.state.loading = 5), Gt.has(l) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Gt.set(l, e), n || o0(
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
        return t = e.async, e = e.src, typeof e == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Pa(e), e = _a(
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
  function Ia(l) {
    return 'href="' + xt(l) + '"';
  }
  function Zu(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function kd(l) {
    return N({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function o0(l, t, e, a) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = l.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), et(t, "link", e), Fl(t), l.head.appendChild(t));
  }
  function Pa(l) {
    return '[src="' + xt(l) + '"]';
  }
  function Ku(l) {
    return "script[async]" + l;
  }
  function Id(l, t, e) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = l.querySelector(
            'style[data-href~="' + xt(e.href) + '"]'
          );
          if (a)
            return t.instance = a, Fl(a), a;
          var u = N({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (l.ownerDocument || l).createElement(
            "style"
          ), Fl(a), et(a, "style", u), di(a, e.precedence, l), t.instance = a;
        case "stylesheet":
          u = Ia(e.href);
          var n = l.querySelector(
            Zu(u)
          );
          if (n)
            return t.state.loading |= 4, t.instance = n, Fl(n), n;
          a = kd(e), (u = Gt.get(u)) && Hf(a, u), n = (l.ownerDocument || l).createElement("link"), Fl(n);
          var i = n;
          return i._p = new Promise(function(c, s) {
            i.onload = c, i.onerror = s;
          }), et(n, "link", a), t.state.loading |= 4, di(n, e.precedence, l), t.instance = n;
        case "script":
          return n = Pa(e.src), (u = l.querySelector(
            Ku(n)
          )) ? (t.instance = u, Fl(u), u) : (a = e, (u = Gt.get(n)) && (a = N({}, e), qf(a, u)), l = l.ownerDocument || l, u = l.createElement("script"), Fl(u), et(u, "link", a), l.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, di(a, e.precedence, l));
    return t.instance;
  }
  function di(l, t, e) {
    for (var a = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = a.length ? a[a.length - 1] : null, n = u, i = 0; i < a.length; i++) {
      var c = a[i];
      if (c.dataset.precedence === t) n = c;
      else if (n !== u) break;
    }
    n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = e.nodeType === 9 ? e.head : e, t.insertBefore(l, t.firstChild));
  }
  function Hf(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
  }
  function qf(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
  }
  var mi = null;
  function Pd(l, t, e) {
    if (mi === null) {
      var a = /* @__PURE__ */ new Map(), u = mi = /* @__PURE__ */ new Map();
      u.set(e, a);
    } else
      u = mi, a = u.get(e), a || (a = /* @__PURE__ */ new Map(), u.set(e, a));
    if (a.has(l)) return a;
    for (a.set(l, null), e = e.getElementsByTagName(l), u = 0; u < e.length; u++) {
      var n = e[u];
      if (!(n[cu] || n[Il] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = n.getAttribute(t) || "";
        i = l + i;
        var c = a.get(i);
        c ? c.push(n) : a.set(i, [n]);
      }
    }
    return a;
  }
  function lm(l, t, e) {
    l = l.ownerDocument || l, l.head.insertBefore(
      e,
      t === "title" ? l.querySelector("head > title") : null
    );
  }
  function r0(l, t, e) {
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
  function tm(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function d0(l, t, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var u = Ia(a.href), n = t.querySelector(
          Zu(u)
        );
        if (n) {
          t = n._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = vi.bind(l), t.then(l, l)), e.state.loading |= 4, e.instance = n, Fl(n);
          return;
        }
        n = t.ownerDocument || t, a = kd(a), (u = Gt.get(u)) && Hf(a, u), n = n.createElement("link"), Fl(n);
        var i = n;
        i._p = new Promise(function(c, s) {
          i.onload = c, i.onerror = s;
        }), et(n, "link", a), e.instance = n;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(e, t), (t = e.state.preload) && (e.state.loading & 3) === 0 && (l.count++, e = vi.bind(l), t.addEventListener("load", e), t.addEventListener("error", e));
    }
  }
  var Bf = 0;
  function m0(l, t) {
    return l.stylesheets && l.count === 0 && yi(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (l.stylesheets && yi(l, l.stylesheets), l.unsuspend) {
          var n = l.unsuspend;
          l.unsuspend = null, n();
        }
      }, 6e4 + t);
      0 < l.imgBytes && Bf === 0 && (Bf = 62500 * wh());
      var u = setTimeout(
        function() {
          if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && yi(l, l.stylesheets), l.unsuspend)) {
            var n = l.unsuspend;
            l.unsuspend = null, n();
          }
        },
        (l.imgBytes > Bf ? 50 : 800) + t
      );
      return l.unsuspend = e, function() {
        l.unsuspend = null, clearTimeout(a), clearTimeout(u);
      };
    } : null;
  }
  function vi() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) yi(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var hi = null;
  function yi(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, hi = /* @__PURE__ */ new Map(), t.forEach(v0, l), hi = null, vi.call(l));
  }
  function v0(l, t) {
    if (!(t.state.loading & 4)) {
      var e = hi.get(l);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), hi.set(l, e);
        for (var u = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), n = 0; n < u.length; n++) {
          var i = u[n];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      u = t.instance, i = u.getAttribute("data-precedence"), n = e.get(i) || a, n === a && e.set(null, u), e.set(i, u), this.count++, a = vi.bind(this), u.addEventListener("load", a), u.addEventListener("error", a), n ? n.parentNode.insertBefore(u, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(u, l.firstChild)), t.state.loading |= 4;
    }
  }
  var Ju = {
    $$typeof: xl,
    Provider: null,
    Consumer: null,
    _currentValue: Q,
    _currentValue2: Q,
    _threadCount: 0
  };
  function h0(l, t, e, a, u, n, i, c, s) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = xi(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = xi(0), this.hiddenUpdates = xi(null), this.identifierPrefix = a, this.onUncaughtError = u, this.onCaughtError = n, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = s, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function em(l, t, e, a, u, n, i, c, s, h, T, O) {
    return l = new h0(
      l,
      t,
      e,
      i,
      s,
      h,
      T,
      O,
      c
    ), t = 1, n === !0 && (t |= 24), n = Tt(3, null, null, t), l.current = n, n.stateNode = l, t = hc(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: t
    }, bc(n), l;
  }
  function am(l) {
    return l ? (l = Ra, l) : Ra;
  }
  function um(l, t, e, a, u, n) {
    u = am(u), a.context === null ? a.context = u : a.pendingContext = u, a = Oe(t), a.payload = { element: e }, n = n === void 0 ? null : n, n !== null && (a.callback = n), e = Ne(l, a, t), e !== null && (yt(e, l, t), zu(e, l, t));
  }
  function nm(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var e = l.retryLane;
      l.retryLane = e !== 0 && e < t ? e : t;
    }
  }
  function Yf(l, t) {
    nm(l, t), (l = l.alternate) && nm(l, t);
  }
  function im(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = ea(l, 67108864);
      t !== null && yt(t, l, 67108864), Yf(l, 67108864);
    }
  }
  function cm(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Dt();
      t = ji(t);
      var e = ea(l, t);
      e !== null && yt(e, l, t), Yf(l, t);
    }
  }
  var gi = !0;
  function y0(l, t, e, a) {
    var u = E.T;
    E.T = null;
    var n = j.p;
    try {
      j.p = 2, Gf(l, t, e, a);
    } finally {
      j.p = n, E.T = u;
    }
  }
  function g0(l, t, e, a) {
    var u = E.T;
    E.T = null;
    var n = j.p;
    try {
      j.p = 8, Gf(l, t, e, a);
    } finally {
      j.p = n, E.T = u;
    }
  }
  function Gf(l, t, e, a) {
    if (gi) {
      var u = Xf(a);
      if (u === null)
        Af(
          l,
          t,
          a,
          Si,
          e
        ), sm(l, a);
      else if (b0(
        u,
        l,
        t,
        e,
        a
      ))
        a.stopPropagation();
      else if (sm(l, a), t & 4 && -1 < S0.indexOf(l)) {
        for (; u !== null; ) {
          var n = ba(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                  var i = ke(n.pendingLanes);
                  if (i !== 0) {
                    var c = n;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                      var s = 1 << 31 - Et(i);
                      c.entanglements[1] |= s, i &= ~s;
                    }
                    Jt(n), (ml & 6) === 0 && (li = Ol() + 500, Xu(0));
                  }
                }
                break;
              case 31:
              case 13:
                c = ea(n, 2), c !== null && yt(c, n, 2), ei(), Yf(n, 2);
            }
          if (n = Xf(a), n === null && Af(
            l,
            t,
            a,
            Si,
            e
          ), n === u) break;
          u = n;
        }
        u !== null && a.stopPropagation();
      } else
        Af(
          l,
          t,
          a,
          null,
          e
        );
    }
  }
  function Xf(l) {
    return l = Qi(l), Qf(l);
  }
  var Si = null;
  function Qf(l) {
    if (Si = null, l = Sa(l), l !== null) {
      var t = C(l);
      if (t === null) l = null;
      else {
        var e = t.tag;
        if (e === 13) {
          if (l = M(t), l !== null) return l;
          l = null;
        } else if (e === 31) {
          if (l = Y(t), l !== null) return l;
          l = null;
        } else if (e === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return Si = l, null;
  }
  function fm(l) {
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
        switch ($e()) {
          case ge:
            return 2;
          case au:
            return 8;
          case Fe:
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
  var Vf = !1, Ye = null, Ge = null, Xe = null, wu = /* @__PURE__ */ new Map(), Wu = /* @__PURE__ */ new Map(), Qe = [], S0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function sm(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        Ye = null;
        break;
      case "dragenter":
      case "dragleave":
        Ge = null;
        break;
      case "mouseover":
      case "mouseout":
        Xe = null;
        break;
      case "pointerover":
      case "pointerout":
        wu.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Wu.delete(t.pointerId);
    }
  }
  function $u(l, t, e, a, u, n) {
    return l === null || l.nativeEvent !== n ? (l = {
      blockedOn: t,
      domEventName: e,
      eventSystemFlags: a,
      nativeEvent: n,
      targetContainers: [u]
    }, t !== null && (t = ba(t), t !== null && im(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), l);
  }
  function b0(l, t, e, a, u) {
    switch (t) {
      case "focusin":
        return Ye = $u(
          Ye,
          l,
          t,
          e,
          a,
          u
        ), !0;
      case "dragenter":
        return Ge = $u(
          Ge,
          l,
          t,
          e,
          a,
          u
        ), !0;
      case "mouseover":
        return Xe = $u(
          Xe,
          l,
          t,
          e,
          a,
          u
        ), !0;
      case "pointerover":
        var n = u.pointerId;
        return wu.set(
          n,
          $u(
            wu.get(n) || null,
            l,
            t,
            e,
            a,
            u
          )
        ), !0;
      case "gotpointercapture":
        return n = u.pointerId, Wu.set(
          n,
          $u(
            Wu.get(n) || null,
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
  function om(l) {
    var t = Sa(l.target);
    if (t !== null) {
      var e = C(t);
      if (e !== null) {
        if (t = e.tag, t === 13) {
          if (t = M(e), t !== null) {
            l.blockedOn = t, Ts(l.priority, function() {
              cm(e);
            });
            return;
          }
        } else if (t === 31) {
          if (t = Y(e), t !== null) {
            l.blockedOn = t, Ts(l.priority, function() {
              cm(e);
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
  function bi(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var e = Xf(l.nativeEvent);
      if (e === null) {
        e = l.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        Xi = a, e.target.dispatchEvent(a), Xi = null;
      } else
        return t = ba(e), t !== null && im(t), l.blockedOn = e, !1;
      t.shift();
    }
    return !0;
  }
  function rm(l, t, e) {
    bi(l) && e.delete(t);
  }
  function _0() {
    Vf = !1, Ye !== null && bi(Ye) && (Ye = null), Ge !== null && bi(Ge) && (Ge = null), Xe !== null && bi(Xe) && (Xe = null), wu.forEach(rm), Wu.forEach(rm);
  }
  function _i(l, t) {
    l.blockedOn === t && (l.blockedOn = null, Vf || (Vf = !0, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      _0
    )));
  }
  var Ei = null;
  function dm(l) {
    Ei !== l && (Ei = l, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      function() {
        Ei === l && (Ei = null);
        for (var t = 0; t < l.length; t += 3) {
          var e = l[t], a = l[t + 1], u = l[t + 2];
          if (typeof a != "function") {
            if (Qf(a || e) === null)
              continue;
            break;
          }
          var n = ba(e);
          n !== null && (l.splice(t, 3), t -= 3, Gc(
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
  function lu(l) {
    function t(s) {
      return _i(s, l);
    }
    Ye !== null && _i(Ye, l), Ge !== null && _i(Ge, l), Xe !== null && _i(Xe, l), wu.forEach(t), Wu.forEach(t);
    for (var e = 0; e < Qe.length; e++) {
      var a = Qe[e];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < Qe.length && (e = Qe[0], e.blockedOn === null); )
      om(e), e.blockedOn === null && Qe.shift();
    if (e = (l.ownerDocument || l).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var u = e[a], n = e[a + 1], i = u[ot] || null;
        if (typeof n == "function")
          i || dm(e);
        else if (i) {
          var c = null;
          if (n && n.hasAttribute("formAction")) {
            if (u = n, i = n[ot] || null)
              c = i.formAction;
            else if (Qf(u) !== null) continue;
          } else c = i.action;
          typeof c == "function" ? e[a + 1] = c : (e.splice(a, 3), a -= 3), dm(e);
        }
      }
  }
  function mm() {
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
  function Lf(l) {
    this._internalRoot = l;
  }
  pi.prototype.render = Lf.prototype.render = function(l) {
    var t = this._internalRoot;
    if (t === null) throw Error(o(409));
    var e = t.current, a = Dt();
    um(e, a, l, t, null, null);
  }, pi.prototype.unmount = Lf.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      um(l.current, 2, null, l, null, null), ei(), t[ga] = null;
    }
  };
  function pi(l) {
    this._internalRoot = l;
  }
  pi.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = ps();
      l = { blockedOn: null, target: l, priority: t };
      for (var e = 0; e < Qe.length && t !== 0 && t < Qe[e].priority; e++) ;
      Qe.splice(e, 0, l), e === 0 && om(l);
    }
  };
  var vm = S.version;
  if (vm !== "19.2.6")
    throw Error(
      o(
        527,
        vm,
        "19.2.6"
      )
    );
  j.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function" ? Error(o(188)) : (l = Object.keys(l).join(","), Error(o(268, l)));
    return l = p(t), l = l !== null ? x(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var E0 = {
    bundleType: 0,
    version: "19.2.6",
    rendererPackageName: "react-dom",
    currentDispatcherRef: E,
    reconcilerVersion: "19.2.6"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ti = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ti.isDisabled && Ti.supportsFiber)
      try {
        Wt = Ti.inject(
          E0
        ), _t = Ti;
      } catch {
      }
  }
  return ku.createRoot = function(l, t) {
    if (!U(l)) throw Error(o(299));
    var e = !1, a = "", u = Er, n = pr, i = Tr;
    return t != null && (t.unstable_strictMode === !0 && (e = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = em(
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
      mm
    ), l[ga] = t.current, zf(l), new Lf(t);
  }, ku.hydrateRoot = function(l, t, e) {
    if (!U(l)) throw Error(o(299));
    var a = !1, u = "", n = Er, i = pr, c = Tr, s = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (u = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (c = e.onRecoverableError), e.formState !== void 0 && (s = e.formState)), t = em(
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
      mm
    ), t.context = am(null), e = t.current, a = Dt(), a = ji(a), u = Oe(a), u.callback = null, Ne(e, u, a), e = a, t.current.lanes = e, iu(t, e), Jt(t), l[ga] = t.current, zf(l), new pi(t);
  }, ku.version = "19.2.6", ku;
}
var zm;
function j0() {
  if (zm) return Jf.exports;
  zm = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (S) {
        console.error(S);
      }
  }
  return f(), Jf.exports = x0(), Jf.exports;
}
var U0 = j0(), Ff = { exports: {} }, kf = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Am;
function C0() {
  if (Am) return kf;
  Am = 1;
  var f = Di();
  function S(N, H) {
    return N === H && (N !== 0 || 1 / N === 1 / H) || N !== N && H !== H;
  }
  var _ = typeof Object.is == "function" ? Object.is : S, o = f.useState, U = f.useEffect, C = f.useLayoutEffect, M = f.useDebugValue;
  function Y(N, H) {
    var $ = H(), cl = o({ inst: { value: $, getSnapshot: H } }), k = cl[0].inst, vl = cl[1];
    return C(
      function() {
        k.value = $, k.getSnapshot = H, D(k) && vl({ inst: k });
      },
      [N, $, H]
    ), U(
      function() {
        return D(k) && vl({ inst: k }), N(function() {
          D(k) && vl({ inst: k });
        });
      },
      [N]
    ), M($), $;
  }
  function D(N) {
    var H = N.getSnapshot;
    N = N.value;
    try {
      var $ = H();
      return !_(N, $);
    } catch {
      return !0;
    }
  }
  function p(N, H) {
    return H();
  }
  var x = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? p : Y;
  return kf.useSyncExternalStore = f.useSyncExternalStore !== void 0 ? f.useSyncExternalStore : x, kf;
}
var Om;
function H0() {
  return Om || (Om = 1, Ff.exports = C0()), Ff.exports;
}
var Nm = H0();
const Xm = 0, Qm = 1, Vm = 2, Dm = 3;
var Mm = Object.prototype.hasOwnProperty;
function us(f, S) {
  var _, o;
  if (f === S) return !0;
  if (f && S && (_ = f.constructor) === S.constructor) {
    if (_ === Date) return f.getTime() === S.getTime();
    if (_ === RegExp) return f.toString() === S.toString();
    if (_ === Array) {
      if ((o = f.length) === S.length)
        for (; o-- && us(f[o], S[o]); ) ;
      return o === -1;
    }
    if (!_ || typeof f == "object") {
      o = 0;
      for (_ in f)
        if (Mm.call(f, _) && ++o && !Mm.call(S, _) || !(_ in S) || !us(f[_], S[_])) return !1;
      return Object.keys(S).length === o;
    }
  }
  return f !== f && S !== S;
}
const ve = /* @__PURE__ */ new WeakMap(), he = () => {
}, ut = (
  /*#__NOINLINE__*/
  he()
), ns = Object, nl = (f) => f === ut, wt = (f) => typeof f == "function", we = (f, S) => ({
  ...f,
  ...S
}), Lm = (f) => wt(f.then), If = {}, zi = {}, hs = "undefined", un = typeof window != hs, is = typeof document != hs, q0 = un && "Deno" in window, B0 = () => un && typeof window.requestAnimationFrame != hs, Zm = (f, S) => {
  const _ = ve.get(f);
  return [
    // Getter
    () => !nl(S) && f.get(S) || If,
    // Setter
    (o) => {
      if (!nl(S)) {
        const U = f.get(S);
        S in zi || (zi[S] = U), _[5](S, we(U, o), U || If);
      }
    },
    // Subscriber
    _[6],
    // Get server cache snapshot
    () => !nl(S) && S in zi ? zi[S] : !nl(S) && f.get(S) || If
  ];
};
let cs = !0;
const Y0 = () => cs, [fs, ss] = un && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  he,
  he
], G0 = () => {
  const f = is && document.visibilityState;
  return nl(f) || f !== "hidden";
}, X0 = (f) => (is && document.addEventListener("visibilitychange", f), fs("focus", f), () => {
  is && document.removeEventListener("visibilitychange", f), ss("focus", f);
}), Q0 = (f) => {
  const S = () => {
    cs = !0, f();
  }, _ = () => {
    cs = !1;
  };
  return fs("online", S), fs("offline", _), () => {
    ss("online", S), ss("offline", _);
  };
}, V0 = {
  isOnline: Y0,
  isVisible: G0
}, L0 = {
  initFocus: X0,
  initReconnect: Q0
}, Rm = !vs.useId, tu = !un || q0, Z0 = (f) => B0() ? window.requestAnimationFrame(f) : setTimeout(f, 1), Pf = tu ? ll.useEffect : ll.useLayoutEffect, ls = typeof navigator < "u" && navigator.connection, xm = !tu && ls && ([
  "slow-2g",
  "2g"
].includes(ls.effectiveType) || ls.saveData), Ai = /* @__PURE__ */ new WeakMap(), K0 = (f) => ns.prototype.toString.call(f), ts = (f, S) => f === `[object ${S}]`;
let J0 = 0;
const os = (f) => {
  const S = typeof f, _ = K0(f), o = ts(_, "Date"), U = ts(_, "RegExp"), C = ts(_, "Object");
  let M, Y;
  if (ns(f) === f && !o && !U) {
    if (M = Ai.get(f), M) return M;
    if (M = ++J0 + "~", Ai.set(f, M), Array.isArray(f)) {
      for (M = "@", Y = 0; Y < f.length; Y++)
        M += os(f[Y]) + ",";
      Ai.set(f, M);
    }
    if (C) {
      M = "#";
      const D = ns.keys(f).sort();
      for (; !nl(Y = D.pop()); )
        nl(f[Y]) || (M += Y + ":" + os(f[Y]) + ",");
      Ai.set(f, M);
    }
  } else
    M = o ? f.toJSON() : S == "symbol" ? f.toString() : S == "string" ? JSON.stringify(f) : "" + f;
  return M;
}, ys = (f) => {
  if (wt(f))
    try {
      f = f();
    } catch {
      f = "";
    }
  const S = f;
  return f = typeof f == "string" ? f : (Array.isArray(f) ? f.length : f) ? os(f) : "", [
    f,
    S
  ];
};
let w0 = 0;
const rs = () => ++w0;
async function Km(...f) {
  const [S, _, o, U] = f, C = we({
    populateCache: !0,
    throwOnError: !0
  }, typeof U == "boolean" ? {
    revalidate: U
  } : U || {});
  let M = C.populateCache;
  const Y = C.rollbackOnError;
  let D = C.optimisticData;
  const p = (H) => typeof Y == "function" ? Y(H) : Y !== !1, x = C.throwOnError;
  if (wt(_)) {
    const H = _, $ = [], cl = S.keys();
    for (const k of cl)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(k) && H(S.get(k)._k) && $.push(k);
    return Promise.all($.map(N));
  }
  return N(_);
  async function N(H) {
    const [$] = ys(H);
    if (!$) return;
    const [cl, k] = Zm(S, $), [vl, Hl, V, xl] = ve.get(S), I = () => {
      const Gl = vl[$];
      return (wt(C.revalidate) ? C.revalidate(cl().data, H) : C.revalidate !== !1) && (delete V[$], delete xl[$], Gl && Gl[0]) ? Gl[0](Vm).then(() => cl().data) : cl().data;
    };
    if (f.length < 3)
      return I();
    let gl = o, Tl, Z = !1;
    const ql = rs();
    Hl[$] = [
      ql,
      0
    ];
    const sl = !nl(D), St = cl(), Bl = St.data, Yl = St._c, nt = nl(Yl) ? Bl : Yl;
    if (sl && (D = wt(D) ? D(nt, Bl) : D, k({
      data: D,
      _c: nt
    })), wt(gl))
      try {
        gl = gl(nt);
      } catch (Gl) {
        Tl = Gl, Z = !0;
      }
    if (gl && Lm(gl))
      if (gl = await gl.catch((Gl) => {
        Tl = Gl, Z = !0;
      }), ql !== Hl[$][0]) {
        if (Z) throw Tl;
        return gl;
      } else Z && sl && p(Tl) && (M = !0, k({
        data: nt,
        _c: ut
      }));
    if (M && !Z)
      if (wt(M)) {
        const Gl = M(gl, nt);
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
    if (Hl[$][1] = rs(), Promise.resolve(I()).then(() => {
      k({
        _c: ut
      });
    }), Z) {
      if (x) throw Tl;
      return;
    }
    return gl;
  }
}
const jm = (f, S) => {
  for (const _ in f)
    f[_][0] && f[_][0](S);
}, W0 = (f, S) => {
  if (!ve.has(f)) {
    const _ = we(L0, S), o = /* @__PURE__ */ Object.create(null), U = Km.bind(ut, f);
    let C = he;
    const M = /* @__PURE__ */ Object.create(null), Y = (x, N) => {
      const H = M[x] || [];
      return M[x] = H, H.push(N), () => H.splice(H.indexOf(N), 1);
    }, D = (x, N, H) => {
      f.set(x, N);
      const $ = M[x];
      if ($)
        for (const cl of $)
          cl(N, H);
    }, p = () => {
      if (!ve.has(f) && (ve.set(f, [
        o,
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        U,
        D,
        Y
      ]), !tu)) {
        const x = _.initFocus(setTimeout.bind(ut, jm.bind(ut, o, Xm))), N = _.initReconnect(setTimeout.bind(ut, jm.bind(ut, o, Qm)));
        C = () => {
          x && x(), N && N(), ve.delete(f);
        };
      }
    };
    return p(), [
      f,
      U,
      p,
      C
    ];
  }
  return [
    f,
    ve.get(f)[4]
  ];
}, $0 = (f, S, _, o, U) => {
  const C = _.errorRetryCount, M = U.retryCount, Y = ~~((Math.random() + 0.5) * (1 << (M < 8 ? M : 8))) * _.errorRetryInterval;
  !nl(C) && M > C || setTimeout(o, Y, U);
}, F0 = us, [Jm, k0] = W0(/* @__PURE__ */ new Map()), I0 = we(
  {
    // events
    onLoadingSlow: he,
    onSuccess: he,
    onError: he,
    onErrorRetry: $0,
    onDiscarded: he,
    // switches
    revalidateOnFocus: !0,
    revalidateOnReconnect: !0,
    revalidateIfStale: !0,
    shouldRetryOnError: !0,
    // timeouts
    errorRetryInterval: xm ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: xm ? 5e3 : 3e3,
    // providers
    compare: F0,
    isPaused: () => !1,
    cache: Jm,
    mutate: k0,
    fallback: {}
  },
  // use web preset by default
  V0
), P0 = (f, S) => {
  const _ = we(f, S);
  if (S) {
    const { use: o, fallback: U } = f, { use: C, fallback: M } = S;
    o && C && (_.use = o.concat(C)), U && M && (_.fallback = we(U, M));
  }
  return _;
}, ly = ll.createContext({}), ty = "$inf$", wm = un && window.__SWR_DEVTOOLS_USE__, ey = wm ? window.__SWR_DEVTOOLS_USE__ : [], ay = () => {
  wm && (window.__SWR_DEVTOOLS_REACT__ = vs);
}, uy = (f) => wt(f[1]) ? [
  f[0],
  f[1],
  f[2] || {}
] : [
  f[0],
  null,
  (f[1] === null ? f[2] : f[1]) || {}
], ny = () => {
  const f = ll.useContext(ly);
  return ll.useMemo(() => we(I0, f), [
    f
  ]);
}, iy = (f) => (S, _, o) => f(S, _ && ((...C) => {
  const [M] = ys(S), [, , , Y] = ve.get(Jm);
  if (M.startsWith(ty))
    return _(...C);
  const D = Y[M];
  return nl(D) ? _(...C) : (delete Y[M], D);
}), o), cy = ey.concat(iy), fy = (f) => function(..._) {
  const o = ny(), [U, C, M] = uy(_), Y = P0(o, M);
  let D = f;
  const { use: p } = Y, x = (p || []).concat(cy);
  for (let N = x.length; N--; )
    D = x[N](D);
  return D(U, C || Y.fetcher || null, Y);
}, sy = (f, S, _) => {
  const o = S[f] || (S[f] = []);
  return o.push(_), () => {
    const U = o.indexOf(_);
    U >= 0 && (o[U] = o[o.length - 1], o.pop());
  };
};
ay();
const es = vs.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
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
      throw f.status = "pending", f.then((S) => {
        f.status = "fulfilled", f.value = S;
      }, (S) => {
        f.status = "rejected", f.reason = S;
      }), f;
  }
}), as = {
  dedupe: !0
}, Um = Promise.resolve(ut), oy = () => he, ry = (f, S, _) => {
  const { cache: o, compare: U, suspense: C, fallbackData: M, revalidateOnMount: Y, revalidateIfStale: D, refreshInterval: p, refreshWhenHidden: x, refreshWhenOffline: N, keepPreviousData: H, strictServerPrefetchWarning: $ } = _, [cl, k, vl, Hl] = ve.get(o), [V, xl] = ys(f), I = ll.useRef(!1), gl = ll.useRef(!1), Tl = ll.useRef(V), Z = ll.useRef(S), ql = ll.useRef(_), sl = () => ql.current, St = () => sl().isVisible() && sl().isOnline(), [Bl, Yl, nt, Gl] = Zm(o, V), $l = ll.useRef({}).current, E = nl(M) ? nl(_.fallback) ? ut : _.fallback[V] : M, j = (Sl, Ml) => {
    for (const zl in $l) {
      const Al = zl;
      if (Al === "data") {
        if (!U(Sl[Al], Ml[Al]) && (!nl(Sl[Al]) || !U(w, Ml[Al])))
          return !1;
      } else if (Ml[Al] !== Sl[Al])
        return !1;
    }
    return !0;
  }, Q = !I.current, dl = ll.useMemo(() => {
    const Sl = Bl(), Ml = Gl(), zl = (Ql) => {
      const Ol = we(Ql);
      return delete Ol._k, (() => {
        if (!V || !S || sl().isPaused()) return !1;
        if (Q && !nl(Y)) return Y;
        const ge = nl(E) ? Ol.data : E;
        return nl(ge) || D;
      })() ? {
        isValidating: !0,
        isLoading: !0,
        ...Ol
      } : Ol;
    }, Al = zl(Sl), ct = Sl === Ml ? Al : zl(Ml);
    let ft = Al;
    return [
      () => {
        const Ql = zl(Bl());
        return j(Ql, ft) ? (ft.data = Ql.data, ft.isLoading = Ql.isLoading, ft.isValidating = Ql.isValidating, ft.error = Ql.error, ft) : (ft = Ql, Ql);
      },
      () => ct
    ];
  }, [
    o,
    V
  ]), fl = Nm.useSyncExternalStore(ll.useCallback(
    (Sl) => nt(V, (Ml, zl) => {
      j(zl, Ml) || Sl();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      o,
      V
    ]
  ), dl[0], dl[1]), d = cl[V] && cl[V].length > 0, A = fl.data, R = nl(A) ? E && Lm(E) ? es(E) : E : A, q = fl.error, K = ll.useRef(R), w = H ? nl(A) ? nl(K.current) ? R : K.current : A : R, P = V && nl(R), Xl = ll.useRef(null);
  !tu && // getServerSnapshot is only called during hydration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Nm.useSyncExternalStore(oy, () => (Xl.current = !1, Xl), () => (Xl.current = !0, Xl));
  const jl = Xl.current;
  $ && jl && !C && P && console.warn(`Missing pre-initiated data for serialized key "${V}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
  const ye = !V || !S || sl().isPaused() || d && !nl(q) ? !1 : Q && !nl(Y) ? Y : C ? nl(R) ? !1 : D : nl(R) || D, We = Q && ye, eu = nl(fl.isValidating) ? We : fl.isValidating, nn = nl(fl.isLoading) ? We : fl.isLoading, bt = ll.useCallback(
    async (Sl) => {
      const Ml = Z.current;
      if (!V || !Ml || gl.current || sl().isPaused())
        return !1;
      let zl, Al, ct = !0;
      const ft = Sl || {}, Ql = !vl[V] || !ft.dedupe, Ol = () => Rm ? !gl.current && V === Tl.current && I.current : V === Tl.current, $e = {
        isValidating: !1,
        isLoading: !1
      }, ge = () => {
        Yl($e);
      }, au = () => {
        const st = vl[V];
        st && st[1] === Al && delete vl[V];
      }, Fe = {
        isValidating: !0
      };
      nl(Bl().data) && (Fe.isLoading = !0);
      try {
        if (Ql && (Yl(Fe), _.loadingTimeout && nl(Bl().data) && setTimeout(() => {
          ct && Ol() && sl().onLoadingSlow(V, _);
        }, _.loadingTimeout), vl[V] = [
          Ml(xl),
          rs()
        ]), [zl, Al] = vl[V], zl = await zl, Ql && setTimeout(au, _.dedupingInterval), !vl[V] || vl[V][1] !== Al)
          return Ql && Ol() && sl().onDiscarded(V), !1;
        $e.error = ut;
        const st = k[V];
        if (!nl(st) && // case 1
        (Al <= st[0] || // case 2
        Al <= st[1] || // case 3
        st[1] === 0))
          return ge(), Ql && Ol() && sl().onDiscarded(V), !1;
        const Mt = Bl().data;
        $e.data = U(Mt, zl) ? Mt : zl, Ql && Ol() && sl().onSuccess(zl, V, _);
      } catch (st) {
        au();
        const Mt = sl(), { shouldRetryOnError: uu } = Mt;
        Mt.isPaused() || ($e.error = st, Ql && Ol() && (Mt.onError(st, V, Mt), (uu === !0 || wt(uu) && uu(st)) && (!sl().revalidateOnFocus || !sl().revalidateOnReconnect || St()) && Mt.onErrorRetry(st, V, Mt, (Ri) => {
          const Wt = cl[V];
          Wt && Wt[0] && Wt[0](Dm, Ri);
        }, {
          retryCount: (ft.retryCount || 0) + 1,
          dedupe: !0
        })));
      }
      return ct = !1, ge(), !0;
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
  ), ya = ll.useCallback(
    // Use callback to make sure `keyRef.current` returns latest result every time
    (...Sl) => Km(o, Tl.current, ...Sl),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (Pf(() => {
    Z.current = S, ql.current = _, nl(A) || (K.current = A);
  }), Pf(() => {
    if (!V) return;
    const Sl = bt.bind(ut, as);
    let Ml = 0;
    sl().revalidateOnFocus && (Ml = Date.now() + sl().focusThrottleInterval);
    const Al = sy(V, cl, (ct, ft = {}) => {
      if (ct == Xm) {
        const Ql = Date.now();
        sl().revalidateOnFocus && Ql > Ml && St() && (Ml = Ql + sl().focusThrottleInterval, Sl());
      } else if (ct == Qm)
        sl().revalidateOnReconnect && St() && Sl();
      else {
        if (ct == Vm)
          return bt();
        if (ct == Dm)
          return bt(ft);
      }
    });
    return gl.current = !1, Tl.current = V, I.current = !0, Yl({
      _k: xl
    }), ye && (vl[V] || (nl(R) || tu ? Sl() : Z0(Sl))), () => {
      gl.current = !0, Al();
    };
  }, [
    V
  ]), Pf(() => {
    let Sl;
    function Ml() {
      const Al = wt(p) ? p(Bl().data) : p;
      Al && Sl !== -1 && (Sl = setTimeout(zl, Al));
    }
    function zl() {
      !Bl().error && (x || sl().isVisible()) && (N || sl().isOnline()) ? bt(as).then(Ml) : Ml();
    }
    return Ml(), () => {
      Sl && (clearTimeout(Sl), Sl = -1);
    };
  }, [
    p,
    x,
    N,
    V
  ]), ll.useDebugValue(w), C) {
    if (!Rm && tu && P)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    P && (Z.current = S, ql.current = _, gl.current = !1);
    const Sl = Hl[V], Ml = !nl(Sl) && P ? ya(Sl) : Um;
    if (es(Ml), !nl(q) && P)
      throw q;
    const zl = P ? bt(as) : Um;
    !nl(w) && P && (zl.status = "fulfilled", zl.value = !0), es(zl);
  }
  return {
    mutate: ya,
    get data() {
      return $l.data = !0, w;
    },
    get error() {
      return $l.error = !0, q;
    },
    get isValidating() {
      return $l.isValidating = !0, eu;
    },
    get isLoading() {
      return $l.isLoading = !0, nn;
    }
  };
}, Oi = fy(ry), Wm = "/api/v1/extensions/nexus.video.ltx23";
async function Ke(f, S) {
  const _ = await fetch(`${Wm}${f}`, {
    headers: { "Content-Type": "application/json", ...S?.headers ?? {} },
    ...S
  });
  if (!_.ok) {
    const o = await _.text();
    throw new Error(`${_.status} ${_.statusText}: ${o}`);
  }
  return await _.json();
}
const Iu = {
  health: () => Ke("/health"),
  listProfiles: () => Ke("/runtime-profiles"),
  plan: (f) => Ke("/recipe/plan", {
    method: "POST",
    body: JSON.stringify(f)
  }),
  createRender: (f) => Ke(
    "/renders",
    { method: "POST", body: JSON.stringify(f) }
  ),
  getRender: (f) => Ke(`/renders/${f}`),
  cancel: (f) => Ke(`/renders/${f}/cancel`, { method: "POST" })
};
function dy(f) {
  return `${Wm}/artifacts/${f}`;
}
const my = "/api/v1", Cm = "nexus.video.ltx23";
async function Hm(f, S) {
  const _ = await fetch(`${my}${f}`, {
    headers: { "Content-Type": "application/json", ...S?.headers ?? {} },
    ...S
  });
  if (!_.ok) {
    const U = await _.text();
    throw new Error(`${_.status}: ${U}`);
  }
  return (await _.json()).data;
}
const qm = {
  listDependencies: () => Hm(`/extensions/${Cm}/dependencies`),
  startInstall: (f = !1) => Hm(
    `/extensions/${Cm}/install${f ? "?force=true" : ""}`,
    { method: "POST" }
  )
}, Bm = {
  status: (f) => Ke(`/profiles/${f}/install`),
  start: (f) => Ke(`/profiles/${f}/install`, {
    method: "POST"
  })
};
var vy = "_1vmg9ib0", ln = "_1vmg9ib1", tn = "_1vmg9ib2", hy = "_1vmg9ib3", me = "_1vmg9ib4", Je = "_1vmg9ib5", Pu = "_1vmg9ib6", yy = "_1vmg9ib7 _1vmg9ib6", Ym = "_1vmg9ib8 _1vmg9ib6", ds = "_1vmg9ib9", gs = "_1vmg9iba", $m = "_1vmg9ibb _1vmg9iba", gy = "_1vmg9ibc _1vmg9iba", Mi = "_1vmg9ibd", Le = "_1vmg9ibe", Ze = "_1vmg9ibf", ha = "_1vmg9ibg", Fm = "_1vmg9ibi _1vmg9ibh", km = "_1vmg9ibj _1vmg9ibh", Im = "_1vmg9ibk _1vmg9ibh", Pm = "_1vmg9ibl _1vmg9ibh", en = "_1vmg9ibm", an = "_1vmg9ibn", Sy = "_1vmg9ibo", by = "_1vmg9ibp", ms = "_1vmg9ibr _1vmg9ibq", lv = "_1vmg9ibs _1vmg9ibq", tv = "_1vmg9ibt _1vmg9ibq", ev = "_1vmg9ibu _1vmg9ibq", _y = "_1vmg9ibv", Ey = "_1vmg9ibw", py = "_1vmg9ibx", Ty = "_1vmg9iby", zy = "_1vmg9ibz _1vmg9iba", gt = "_1vmg9ib10", Ay = "_1vmg9ib11", Oy = "_1vmg9ib12", Ny = "_1vmg9ib13", Dy = "_1vmg9ib14", My = "_1vmg9ib15", av = "_1vmg9ib16", uv = "_1vmg9ib17", Ry = "_1vmg9ib18";
const xy = {
  prompt: "a slow cinematic dolly shot over a futuristic city at dusk",
  duration_seconds: 6,
  runtime_profile: "auto",
  quality_preset: "balanced_16gb"
};
function jy() {
  const [f, S] = ll.useState(xy), [_, o] = ll.useState(null), [U, C] = ll.useState(null), [M, Y] = ll.useState(!1), [D, p] = ll.useState(null), [x, N] = ll.useState(null), [H, $] = ll.useState(!1), { data: cl } = Oi(
    "/runtime-profiles",
    () => Iu.listProfiles(),
    { revalidateOnFocus: !1 }
  ), { data: k, mutate: vl } = Oi(
    D ? `/renders/${D}` : null,
    () => D ? Iu.getRender(D) : Promise.resolve(null),
    {
      refreshInterval: (I) => I ? I.status === "completed" || I.status === "failed" || I.status === "cancelled" ? 0 : 600 : 1e3
    }
  ), Hl = ll.useCallback(async () => {
    Y(!0), C(null);
    try {
      const I = await Iu.plan(f);
      o(I);
    } catch (I) {
      C(I instanceof Error ? I.message : String(I)), o(null);
    } finally {
      Y(!1);
    }
  }, [f]), V = ll.useCallback(async () => {
    $(!0), N(null);
    try {
      const I = await Iu.createRender(f);
      p(I.id), vl();
    } catch (I) {
      N(I instanceof Error ? I.message : String(I));
    } finally {
      $(!1);
    }
  }, [f, vl]), xl = ll.useCallback(async () => {
    if (D)
      try {
        await Iu.cancel(D), vl();
      } catch (I) {
        console.error("cancel failed", I);
      }
  }, [D, vl]);
  return /* @__PURE__ */ g.jsxs("div", { className: vy, children: [
    /* @__PURE__ */ g.jsxs("div", { className: Oy, children: [
      /* @__PURE__ */ g.jsx(Uy, {}),
      /* @__PURE__ */ g.jsx(
        qy,
        {
          draft: f,
          onChange: S,
          profiles: cl ?? [],
          onPlan: Hl,
          onSubmit: V,
          planning: M,
          submitting: H,
          plan: _,
          planError: U,
          submitError: x
        }
      )
    ] }),
    /* @__PURE__ */ g.jsx(Ly, { run: k ?? null, onCancel: xl })
  ] });
}
function Uy() {
  const [f, S] = ll.useState(!1), [_, o] = ll.useState(null), { data: U, mutate: C } = Oi(
    "host:dependencies",
    () => qm.listDependencies(),
    {
      refreshInterval: (x) => x ? x.steps.some(
        (H) => H.status === "running" || H.status === "pending"
      ) ? 1e3 : 5e3 : 1500
    }
  ), M = ll.useCallback(
    async (x = !1) => {
      S(!0), o(null);
      try {
        await qm.startInstall(x), C();
      } catch (N) {
        o(N instanceof Error ? N.message : String(N));
      } finally {
        S(!1);
      }
    },
    [C]
  );
  if (!U) return null;
  const Y = U.steps.find((x) => x.status === "failed"), D = U.all_satisfied, p = U.steps.some(
    (x) => x.status === "running" || !D && x.status === "pending"
  );
  return /* @__PURE__ */ g.jsxs("section", { className: ln, children: [
    /* @__PURE__ */ g.jsxs("div", { className: Ny, children: [
      /* @__PURE__ */ g.jsx("h3", { className: tn, style: { fontSize: "15px" }, children: "Runtime" }),
      /* @__PURE__ */ g.jsx("span", { className: Cy(D, !!Y, p), children: D ? "ready" : Y ? "install failed" : p ? "installing…" : "not installed" })
    ] }),
    /* @__PURE__ */ g.jsx("ul", { className: Dy, children: U.steps.map((x) => /* @__PURE__ */ g.jsxs("li", { className: My, children: [
      /* @__PURE__ */ g.jsx("span", { className: Hy(x.status) }),
      /* @__PURE__ */ g.jsx("span", { children: x.id }),
      /* @__PURE__ */ g.jsx("span", { className: gt, children: x.artifact?.summary ?? x.status })
    ] }, x.id)) }),
    Y?.last_error ? /* @__PURE__ */ g.jsxs("div", { className: an, children: [
      /* @__PURE__ */ g.jsxs("strong", { children: [
        Y.id,
        " failed"
      ] }),
      ": ",
      Y.last_error.message
    ] }) : null,
    _ ? /* @__PURE__ */ g.jsx("div", { className: an, children: _ }) : null,
    !D || Y ? /* @__PURE__ */ g.jsxs("div", { className: Mi, children: [
      /* @__PURE__ */ g.jsx(
        "button",
        {
          type: "button",
          className: gs,
          disabled: f || p,
          onClick: () => void M(!1),
          children: p || f ? "Installing…" : "Install runtime"
        }
      ),
      Y ? /* @__PURE__ */ g.jsx(
        "button",
        {
          type: "button",
          className: $m,
          disabled: f || p,
          onClick: () => void M(!0),
          children: "Force reinstall"
        }
      ) : null
    ] }) : null
  ] });
}
function Cy(f, S, _) {
  return S ? Pm : f ? Fm : _ ? km : Im;
}
function Hy(f) {
  switch (f) {
    case "ok":
      return tv;
    case "running":
      return lv;
    case "failed":
      return ev;
    default:
      return ms;
  }
}
function qy({
  draft: f,
  onChange: S,
  profiles: _,
  onPlan: o,
  onSubmit: U,
  planning: C,
  submitting: M,
  plan: Y,
  planError: D,
  submitError: p
}) {
  const x = ll.useCallback(
    (N, H) => S({ ...f, [N]: H }),
    [f, S]
  );
  return /* @__PURE__ */ g.jsxs("section", { className: ln, children: [
    /* @__PURE__ */ g.jsx("h2", { className: tn, children: "LTX 2.3 Video Generator" }),
    /* @__PURE__ */ g.jsx("p", { className: hy, children: "Prompt-driven video synthesis · external-segments mode · 16 GB safe defaults" }),
    /* @__PURE__ */ g.jsxs("div", { className: me, children: [
      /* @__PURE__ */ g.jsx("label", { className: Je, htmlFor: "ltx-prompt", children: "Prompt" }),
      /* @__PURE__ */ g.jsx(
        "textarea",
        {
          id: "ltx-prompt",
          className: yy,
          value: f.prompt,
          onChange: (N) => x("prompt", N.target.value),
          placeholder: "describe the scene…"
        }
      )
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: me, children: [
      /* @__PURE__ */ g.jsx("label", { className: Je, htmlFor: "ltx-neg", children: "Negative prompt (optional)" }),
      /* @__PURE__ */ g.jsx(
        "input",
        {
          id: "ltx-neg",
          className: Pu,
          value: f.negative_prompt ?? "",
          onChange: (N) => x(
            "negative_prompt",
            N.target.value.length > 0 ? N.target.value : void 0
          ),
          placeholder: "flicker, watermark, distortion…"
        }
      )
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: ds, children: [
      /* @__PURE__ */ g.jsxs("div", { className: me, children: [
        /* @__PURE__ */ g.jsx("label", { className: Je, htmlFor: "ltx-duration", children: "Duration (s)" }),
        /* @__PURE__ */ g.jsx(
          "input",
          {
            id: "ltx-duration",
            className: Pu,
            type: "number",
            min: 1,
            max: 300,
            value: f.duration_seconds,
            onChange: (N) => x(
              "duration_seconds",
              Math.max(1, Math.min(300, Number(N.target.value) || 1))
            )
          }
        )
      ] }),
      /* @__PURE__ */ g.jsxs("div", { className: me, children: [
        /* @__PURE__ */ g.jsx("label", { className: Je, htmlFor: "ltx-seed", children: "Seed (optional)" }),
        /* @__PURE__ */ g.jsx(
          "input",
          {
            id: "ltx-seed",
            className: Pu,
            type: "number",
            value: f.seed ?? "",
            onChange: (N) => {
              const H = N.target.value;
              x("seed", H === "" ? void 0 : Number(H));
            },
            placeholder: "leave blank for random"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: ds, children: [
      /* @__PURE__ */ g.jsxs("div", { className: me, children: [
        /* @__PURE__ */ g.jsx("label", { className: Je, htmlFor: "ltx-runtime", children: "Runtime" }),
        /* @__PURE__ */ g.jsxs(
          "select",
          {
            id: "ltx-runtime",
            className: Ym,
            value: f.runtime_profile,
            onChange: (N) => x(
              "runtime_profile",
              N.target.value
            ),
            children: [
              /* @__PURE__ */ g.jsx("option", { value: "auto", children: "Auto (recommended)" }),
              /* @__PURE__ */ g.jsx("option", { value: "rtx40-fp8", children: "RTX 40 FP8" }),
              /* @__PURE__ */ g.jsx("option", { value: "rtx50-fp8", children: "RTX 50 FP8 (Blackwell)" }),
              /* @__PURE__ */ g.jsx("option", { value: "rtx50-nvfp4", children: "RTX 50 NVFP4 (experimental)" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ g.jsxs("div", { className: me, children: [
        /* @__PURE__ */ g.jsx("label", { className: Je, htmlFor: "ltx-quality", children: "Quality" }),
        /* @__PURE__ */ g.jsxs(
          "select",
          {
            id: "ltx-quality",
            className: Ym,
            value: f.quality_preset,
            onChange: (N) => x("quality_preset", N.target.value),
            children: [
              /* @__PURE__ */ g.jsx("option", { value: "draft", children: "Draft (fastest)" }),
              /* @__PURE__ */ g.jsx("option", { value: "balanced_16gb", children: "Balanced 16 GB" }),
              /* @__PURE__ */ g.jsx("option", { value: "quality_16gb", children: "Quality 16 GB" }),
              /* @__PURE__ */ g.jsx("option", { value: "high", children: "High (24 GB+)" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ g.jsx(Xy, { profiles: _, selected: f.runtime_profile }),
    /* @__PURE__ */ g.jsx(By, { selected: f.runtime_profile }),
    /* @__PURE__ */ g.jsx(Qy, { draft: f, update: x }),
    /* @__PURE__ */ g.jsxs("div", { className: Mi, children: [
      /* @__PURE__ */ g.jsx(
        "button",
        {
          type: "button",
          className: $m,
          onClick: o,
          disabled: C || M || f.prompt.trim().length === 0,
          children: C ? "Planning…" : "Preview plan"
        }
      ),
      /* @__PURE__ */ g.jsx(
        "button",
        {
          type: "button",
          className: gs,
          onClick: U,
          disabled: M || f.prompt.trim().length === 0,
          children: M ? "Submitting…" : "Generate video"
        }
      )
    ] }),
    D ? /* @__PURE__ */ g.jsx("div", { className: an, children: D }) : null,
    p ? /* @__PURE__ */ g.jsx("div", { className: an, children: p }) : null,
    Y ? /* @__PURE__ */ g.jsx(Vy, { plan: Y }) : null
  ] });
}
function By({
  selected: f
}) {
  const S = Gy(f), [_, o] = ll.useState(!1), [U, C] = ll.useState(null), { data: M, mutate: Y } = Oi(
    S ? `profile-install:${S}` : null,
    () => S ? Bm.status(S) : Promise.resolve(null),
    {
      refreshInterval: (H) => H && H.in_flight ? 2e3 : 0
    }
  ), D = ll.useCallback(async () => {
    if (S) {
      o(!0), C(null);
      try {
        await Bm.start(S), Y();
      } catch (H) {
        C(H instanceof Error ? H.message : String(H));
      } finally {
        o(!1);
      }
    }
  }, [S, Y]);
  if (!S || !M) return null;
  if (M.installed)
    return /* @__PURE__ */ g.jsxs("div", { className: en, children: [
      /* @__PURE__ */ g.jsx("strong", { children: "Runtime installed" }),
      " · ",
      M.repo
    ] });
  const p = M.in_flight || _, x = nv(M.phase), N = p ? x ?? "Installing…" : "Install runtime & download weights";
  return /* @__PURE__ */ g.jsxs("div", { className: en, children: [
    /* @__PURE__ */ g.jsx("strong", { children: "Runtime not installed" }),
    ": ",
    M.repo ?? "unknown repo",
    /* @__PURE__ */ g.jsxs("div", { className: gt, style: { marginTop: 4 }, children: [
      "Resolves the diffusers extras (torch · diffusers · accelerate) via",
      " ",
      /* @__PURE__ */ g.jsx("code", { children: "uv sync --extra diffusers" }),
      ", then downloads weights from Hugging Face into ",
      M.dest ?? "<host_data_dir>/models/…",
      "."
    ] }),
    M.last_error ? /* @__PURE__ */ g.jsxs("div", { className: gt, style: { marginTop: 4, color: "#e57373" }, children: [
      "Last error: ",
      M.last_error
    ] }) : null,
    U ? /* @__PURE__ */ g.jsx("div", { className: gt, style: { marginTop: 4, color: "#e57373" }, children: U }) : null,
    /* @__PURE__ */ g.jsx("div", { className: Mi, style: { marginTop: 8 }, children: /* @__PURE__ */ g.jsx(
      "button",
      {
        type: "button",
        className: gs,
        disabled: p,
        onClick: () => void D(),
        children: N
      }
    ) }),
    /* @__PURE__ */ g.jsx(
      Yy,
      {
        phase: M.phase,
        recentProgress: M.recent_progress
      }
    )
  ] });
}
function nv(f) {
  if (!f) return null;
  if (f.startsWith("error:")) return "Failed";
  switch (f) {
    case "starting":
      return "Starting…";
    case "resolving_deps":
      return "Resolving deps…";
    case "downloading_weights":
      return "Downloading weights…";
    case "done":
      return "Finishing…";
    default:
      return f;
  }
}
function Yy({
  phase: f,
  recentProgress: S
}) {
  if (!f && S.length === 0) return null;
  const _ = nv(f);
  return /* @__PURE__ */ g.jsxs("details", { className: av, children: [
    /* @__PURE__ */ g.jsxs("summary", { className: uv, children: [
      "Install progress",
      _ ? /* @__PURE__ */ g.jsxs("span", { className: gt, children: [
        " · ",
        _
      ] }) : null,
      S.length > 0 ? /* @__PURE__ */ g.jsxs("span", { className: gt, children: [
        " · ",
        S.length,
        " lines"
      ] }) : null
    ] }),
    S.length === 0 ? /* @__PURE__ */ g.jsx("p", { className: gt, style: { marginTop: 6 }, children: "No output captured yet." }) : /* @__PURE__ */ g.jsx("pre", { className: Ry, children: S.join(`
`) })
  ] });
}
function Gy(f) {
  return f === "auto" ? null : f;
}
function Xy({
  profiles: f,
  selected: S
}) {
  if (f.length === 0) return null;
  const _ = S === "auto" ? "nexus.video.ltx23.fake" : `nexus.video.ltx23.${S}`, o = f.find((C) => C.runtime_id === _);
  if (!o) return null;
  const U = o.healthy ? "ok" : "warn";
  return /* @__PURE__ */ g.jsxs("div", { className: en, children: [
    /* @__PURE__ */ g.jsx("strong", { children: o.display_name }),
    ": ",
    o.status_message,
    o.experimental ? " (experimental)" : null
  ] });
}
function Qy({
  draft: f,
  update: S
}) {
  const _ = f.advanced ?? {}, o = ll.useCallback(
    (U, C) => {
      const M = { ..._ };
      C == null ? delete M[U] : M[U] = C, S("advanced", Object.keys(M).length > 0 ? M : void 0);
    },
    [_, S]
  );
  return /* @__PURE__ */ g.jsxs("details", { className: av, children: [
    /* @__PURE__ */ g.jsxs("summary", { className: uv, children: [
      "Advanced — guidance & steps",
      _.guidance_scale !== void 0 ? /* @__PURE__ */ g.jsxs("span", { className: gt, children: [
        " · cfg ",
        _.guidance_scale
      ] }) : null,
      _.num_inference_steps !== void 0 ? /* @__PURE__ */ g.jsxs("span", { className: gt, children: [
        " · ",
        _.num_inference_steps,
        " steps"
      ] }) : null
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: ds, style: { marginTop: 10 }, children: [
      /* @__PURE__ */ g.jsxs("div", { className: me, children: [
        /* @__PURE__ */ g.jsx("label", { className: Je, htmlFor: "ltx-cfg", children: "Guidance scale (temperature)" }),
        /* @__PURE__ */ g.jsx(
          "input",
          {
            id: "ltx-cfg",
            className: Pu,
            type: "number",
            min: 1,
            max: 15,
            step: 0.5,
            value: _.guidance_scale ?? "",
            onChange: (U) => {
              const C = U.target.value;
              o(
                "guidance_scale",
                C === "" ? void 0 : Number(C)
              );
            },
            placeholder: "4.0 (default)"
          }
        ),
        /* @__PURE__ */ g.jsx("span", { className: gt, children: "1–7. Higher = stricter prompt adherence; lower = more creative drift. Distilled LTX 2.3 default is 4.0." })
      ] }),
      /* @__PURE__ */ g.jsxs("div", { className: me, children: [
        /* @__PURE__ */ g.jsx("label", { className: Je, htmlFor: "ltx-steps", children: "Inference steps" }),
        /* @__PURE__ */ g.jsx(
          "input",
          {
            id: "ltx-steps",
            className: Pu,
            type: "number",
            min: 2,
            max: 50,
            step: 1,
            value: _.num_inference_steps ?? "",
            onChange: (U) => {
              const C = U.target.value;
              o(
                "num_inference_steps",
                C === "" ? void 0 : Math.round(Number(C))
              );
            },
            placeholder: "8 (default)"
          }
        ),
        /* @__PURE__ */ g.jsx("span", { className: gt, children: "Distilled model is tuned for 8. Higher steps improve detail with ~linear wall-clock cost." })
      ] })
    ] })
  ] });
}
function Vy({ plan: f }) {
  const S = f.vram_risk === "safe" ? Fm : f.vram_risk === "moderate" ? km : f.vram_risk === "risky" ? Im : Pm;
  return /* @__PURE__ */ g.jsxs("div", { className: ln, style: { background: "transparent", padding: 0 }, children: [
    /* @__PURE__ */ g.jsx("h3", { className: tn, style: { fontSize: "15px" }, children: "Render plan" }),
    /* @__PURE__ */ g.jsxs("div", { className: Le, children: [
      /* @__PURE__ */ g.jsx("span", { className: Ze, children: "Mode" }),
      /* @__PURE__ */ g.jsx("span", { className: ha, children: f.mode })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: Le, children: [
      /* @__PURE__ */ g.jsx("span", { className: Ze, children: "Segments" }),
      /* @__PURE__ */ g.jsx("span", { className: ha, children: f.segment_count })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: Le, children: [
      /* @__PURE__ */ g.jsx("span", { className: Ze, children: "Resolution" }),
      /* @__PURE__ */ g.jsxs("span", { className: ha, children: [
        f.width,
        "×",
        f.height
      ] })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: Le, children: [
      /* @__PURE__ */ g.jsx("span", { className: Ze, children: "FPS" }),
      /* @__PURE__ */ g.jsxs("span", { className: ha, children: [
        f.base_fps,
        " → ",
        f.output_fps,
        " (",
        f.interpolation,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: Le, children: [
      /* @__PURE__ */ g.jsx("span", { className: Ze, children: "Duration" }),
      /* @__PURE__ */ g.jsxs("span", { className: ha, children: [
        f.requested_duration_seconds.toFixed(1),
        "s"
      ] })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: Le, children: [
      /* @__PURE__ */ g.jsx("span", { className: Ze, children: "VRAM budget" }),
      /* @__PURE__ */ g.jsxs("span", { className: ha, children: [
        f.gpu_memory_budget_mb,
        " MB"
      ] })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: Le, children: [
      /* @__PURE__ */ g.jsx("span", { className: Ze, children: "VRAM risk" }),
      /* @__PURE__ */ g.jsx("span", { className: S, children: f.vram_risk })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: Le, children: [
      /* @__PURE__ */ g.jsx("span", { className: Ze, children: "Runtime" }),
      /* @__PURE__ */ g.jsx("span", { className: ha, children: f.runtime_profile })
    ] }),
    f.warnings.length > 0 ? /* @__PURE__ */ g.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: f.warnings.map((_) => /* @__PURE__ */ g.jsxs("div", { className: en, children: [
      /* @__PURE__ */ g.jsx("strong", { children: _.code }),
      ": ",
      _.message
    ] }, _.code)) }) : null
  ] });
}
function Ly({
  run: f,
  onCancel: S
}) {
  if (!f)
    return /* @__PURE__ */ g.jsxs("section", { className: ln, children: [
      /* @__PURE__ */ g.jsx("h2", { className: tn, children: "Output" }),
      /* @__PURE__ */ g.jsx("p", { className: Ay, children: "No render in progress yet. Configure the form on the left and press “Generate video”." })
    ] });
  const _ = f.status === "completed" || f.status === "failed" || f.status === "cancelled";
  return /* @__PURE__ */ g.jsxs("section", { className: ln, children: [
    /* @__PURE__ */ g.jsxs("h2", { className: tn, children: [
      "Render ",
      Wy(f.id)
    ] }),
    /* @__PURE__ */ g.jsxs("p", { className: gt, children: [
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
    /* @__PURE__ */ g.jsx(Zy, { run: f }),
    f.error_code ? /* @__PURE__ */ g.jsxs("div", { className: an, children: [
      /* @__PURE__ */ g.jsx("strong", { children: f.error_code }),
      ":",
      " ",
      f.error_message ?? "unknown error"
    ] }) : null,
    /* @__PURE__ */ g.jsx(Ky, { segments: f.segments }),
    f.status === "completed" && f.final_artifact_id ? /* @__PURE__ */ g.jsx(wy, { artifactId: f.final_artifact_id }) : null,
    _ ? null : /* @__PURE__ */ g.jsx("div", { className: Mi, children: /* @__PURE__ */ g.jsx(
      "button",
      {
        type: "button",
        className: gy,
        onClick: S,
        children: "Cancel"
      }
    ) })
  ] });
}
function Zy({ run: f }) {
  return /* @__PURE__ */ g.jsxs("div", { className: me, children: [
    /* @__PURE__ */ g.jsxs(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13
        },
        children: [
          /* @__PURE__ */ g.jsx("span", { children: /* @__PURE__ */ g.jsx("strong", { children: f.status }) }),
          /* @__PURE__ */ g.jsxs("span", { children: [
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
    /* @__PURE__ */ g.jsx("div", { className: _y, children: /* @__PURE__ */ g.jsx(
      "div",
      {
        className: Ey,
        style: { width: `${Math.max(2, f.progress_percent)}%` }
      }
    ) })
  ] });
}
function Ky({
  segments: f
}) {
  return /* @__PURE__ */ g.jsx("div", { className: Sy, children: f.map((S) => /* @__PURE__ */ g.jsxs("div", { className: by, children: [
    /* @__PURE__ */ g.jsx("span", { className: Jy(S.status) }),
    /* @__PURE__ */ g.jsxs("span", { children: [
      "Segment ",
      S.index + 1,
      " · ",
      S.duration_seconds.toFixed(1),
      "s"
    ] }),
    /* @__PURE__ */ g.jsx("span", { className: gt, children: S.status })
  ] }, S.index)) });
}
function Jy(f) {
  switch (f) {
    case "queued":
      return ms;
    case "rendering":
      return lv;
    case "completed":
      return tv;
    case "failed":
      return ev;
    default:
      return ms;
  }
}
function wy({ artifactId: f }) {
  const S = dy(f);
  return /* @__PURE__ */ g.jsxs("div", { className: py, children: [
    /* @__PURE__ */ g.jsx("video", { className: Ty, src: S, controls: !0, preload: "metadata" }),
    /* @__PURE__ */ g.jsx(
      "a",
      {
        className: zy,
        href: S,
        download: `${f}.mp4`,
        children: "Download MP4"
      }
    ),
    /* @__PURE__ */ g.jsxs("p", { className: gt, children: [
      "artifact: ",
      f
    ] })
  ] });
}
function Wy(f) {
  return f.length > 12 ? `${f.slice(0, 6)}…${f.slice(-4)}` : f;
}
const Ni = "ltx23-video-app", Gm = "ltx23-video-stylesheet";
function $y() {
  if (typeof document > "u" || document.getElementById(Gm)) return;
  const f = new URL("./ltx23-video.css", import.meta.url).href, S = document.createElement("link");
  S.id = Gm, S.rel = "stylesheet", S.href = f, document.head.appendChild(S);
}
$y();
class iv extends HTMLElement {
  root = null;
  connectedCallback() {
    this.root = U0.createRoot(this), this.paint();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null;
  }
  paint() {
    this.root && this.root.render(
      /* @__PURE__ */ g.jsx(ll.StrictMode, { children: /* @__PURE__ */ g.jsx(jy, {}) })
    );
  }
}
customElements.get(Ni) || customElements.define(Ni, iv);
function Fy() {
  customElements.get(Ni) || customElements.define(Ni, iv);
}
export {
  Fy as register
};
//# sourceMappingURL=ltx23-video.js.map
