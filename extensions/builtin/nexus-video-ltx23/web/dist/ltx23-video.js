function _h(f) {
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
var vm;
function Th() {
  if (vm) return Fu;
  vm = 1;
  var f = Symbol.for("react.transitional.element"), g = Symbol.for("react.fragment");
  function p(o, C, B) {
    var R = null;
    if (B !== void 0 && (R = "" + B), C.key !== void 0 && (R = "" + C.key), "key" in C) {
      B = {};
      for (var Y in C)
        Y !== "key" && (B[Y] = C[Y]);
    } else B = C;
    return C = B.ref, {
      $$typeof: f,
      type: o,
      key: R,
      ref: C !== void 0 ? C : null,
      props: B
    };
  }
  return Fu.Fragment = g, Fu.jsx = p, Fu.jsxs = p, Fu;
}
var hm;
function ph() {
  return hm || (hm = 1, Zf.exports = Th()), Zf.exports;
}
var b = ph(), Lf = { exports: {} }, J = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ym;
function zh() {
  if (ym) return J;
  ym = 1;
  var f = Symbol.for("react.transitional.element"), g = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), B = Symbol.for("react.consumer"), R = Symbol.for("react.context"), Y = Symbol.for("react.forward_ref"), N = Symbol.for("react.suspense"), _ = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), D = Symbol.for("react.activity"), j = Symbol.iterator;
  function $(d) {
    return d === null || typeof d != "object" ? null : (d = j && d[j] || d["@@iterator"], typeof d == "function" ? d : null);
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
  function Hl(d, A, M) {
    this.props = d, this.context = A, this.refs = vl, this.updater = M || cl;
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
  function Ul(d, A, M) {
    this.props = d, this.context = A, this.refs = vl, this.updater = M || cl;
  }
  var I = Ul.prototype = new V();
  I.constructor = Ul, k(I, Hl.prototype), I.isPureReactComponent = !0;
  var gl = Array.isArray;
  function pl() {
  }
  var L = { H: null, A: null, T: null, S: null }, ql = Object.prototype.hasOwnProperty;
  function sl(d, A, M) {
    var H = M.ref;
    return {
      $$typeof: f,
      type: d,
      key: A,
      ref: H !== void 0 ? H : null,
      props: M
    };
  }
  function gt(d, A) {
    return sl(d.type, A, d.props);
  }
  function Bl(d) {
    return typeof d == "object" && d !== null && d.$$typeof === f;
  }
  function Yl(d) {
    var A = { "=": "=0", ":": "=2" };
    return "$" + d.replace(/[=:]/g, function(M) {
      return A[M];
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
        switch (typeof d.status == "string" ? d.then(pl, pl) : (d.status = "pending", d.then(
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
  function E(d, A, M, H, K) {
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
            case g:
              P = !0;
              break;
            case x:
              return P = d._init, E(
                P(d._payload),
                A,
                M,
                H,
                K
              );
          }
      }
    if (P)
      return K = K(d), P = H === "" ? "." + Gl(d, 0) : H, gl(K) ? (M = "", P != null && (M = P.replace(nt, "$&/") + "/"), E(K, A, M, "", function(he) {
        return he;
      })) : K != null && (Bl(K) && (K = gt(
        K,
        M + (K.key == null || d && d.key === K.key ? "" : ("" + K.key).replace(
          nt,
          "$&/"
        ) + "/") + P
      )), A.push(K)), 1;
    P = 0;
    var Xl = H === "" ? "." : H + ":";
    if (gl(d))
      for (var xl = 0; xl < d.length; xl++)
        H = d[xl], w = Xl + Gl(H, xl), P += E(
          H,
          A,
          M,
          w,
          K
        );
    else if (xl = $(d), typeof xl == "function")
      for (d = xl.call(d), xl = 0; !(H = d.next()).done; )
        H = H.value, w = Xl + Gl(H, xl++), P += E(
          H,
          A,
          M,
          w,
          K
        );
    else if (w === "object") {
      if (typeof d.then == "function")
        return E(
          $l(d),
          A,
          M,
          H,
          K
        );
      throw A = String(d), Error(
        "Objects are not valid as a React child (found: " + (A === "[object Object]" ? "object with keys {" + Object.keys(d).join(", ") + "}" : A) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return P;
  }
  function U(d, A, M) {
    if (d == null) return d;
    var H = [], K = 0;
    return E(d, H, "", "", function(w) {
      return A.call(M, w, K++);
    }), H;
  }
  function Q(d) {
    if (d._status === -1) {
      var A = d._result;
      A = A(), A.then(
        function(M) {
          (d._status === 0 || d._status === -1) && (d._status = 1, d._result = M);
        },
        function(M) {
          (d._status === 0 || d._status === -1) && (d._status = 2, d._result = M);
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
    map: U,
    forEach: function(d, A, M) {
      U(
        d,
        function() {
          A.apply(this, arguments);
        },
        M
      );
    },
    count: function(d) {
      var A = 0;
      return U(d, function() {
        A++;
      }), A;
    },
    toArray: function(d) {
      return U(d, function(A) {
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
  return J.Activity = D, J.Children = fl, J.Component = Hl, J.Fragment = p, J.Profiler = C, J.PureComponent = Ul, J.StrictMode = o, J.Suspense = N, J.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = L, J.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(d) {
      return L.H.useMemoCache(d);
    }
  }, J.cache = function(d) {
    return function() {
      return d.apply(null, arguments);
    };
  }, J.cacheSignal = function() {
    return null;
  }, J.cloneElement = function(d, A, M) {
    if (d == null)
      throw Error(
        "The argument must be a React element, but you passed " + d + "."
      );
    var H = k({}, d.props), K = d.key;
    if (A != null)
      for (w in A.key !== void 0 && (K = "" + A.key), A)
        !ql.call(A, w) || w === "key" || w === "__self" || w === "__source" || w === "ref" && A.ref === void 0 || (H[w] = A[w]);
    var w = arguments.length - 2;
    if (w === 1) H.children = M;
    else if (1 < w) {
      for (var P = Array(w), Xl = 0; Xl < w; Xl++)
        P[Xl] = arguments[Xl + 2];
      H.children = P;
    }
    return sl(d.type, K, H);
  }, J.createContext = function(d) {
    return d = {
      $$typeof: R,
      _currentValue: d,
      _currentValue2: d,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, d.Provider = d, d.Consumer = {
      $$typeof: B,
      _context: d
    }, d;
  }, J.createElement = function(d, A, M) {
    var H, K = {}, w = null;
    if (A != null)
      for (H in A.key !== void 0 && (w = "" + A.key), A)
        ql.call(A, H) && H !== "key" && H !== "__self" && H !== "__source" && (K[H] = A[H]);
    var P = arguments.length - 2;
    if (P === 1) K.children = M;
    else if (1 < P) {
      for (var Xl = Array(P), xl = 0; xl < P; xl++)
        Xl[xl] = arguments[xl + 2];
      K.children = Xl;
    }
    if (d && d.defaultProps)
      for (H in P = d.defaultProps, P)
        K[H] === void 0 && (K[H] = P[H]);
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
      $$typeof: _,
      type: d,
      compare: A === void 0 ? null : A
    };
  }, J.startTransition = function(d) {
    var A = L.T, M = {};
    L.T = M;
    try {
      var H = d(), K = L.S;
      K !== null && K(M, H), typeof H == "object" && H !== null && typeof H.then == "function" && H.then(pl, dl);
    } catch (w) {
      dl(w);
    } finally {
      A !== null && M.types !== null && (A.types = M.types), L.T = A;
    }
  }, J.unstable_useCacheRefresh = function() {
    return L.H.useCacheRefresh();
  }, J.use = function(d) {
    return L.H.use(d);
  }, J.useActionState = function(d, A, M) {
    return L.H.useActionState(d, A, M);
  }, J.useCallback = function(d, A) {
    return L.H.useCallback(d, A);
  }, J.useContext = function(d) {
    return L.H.useContext(d);
  }, J.useDebugValue = function() {
  }, J.useDeferredValue = function(d, A) {
    return L.H.useDeferredValue(d, A);
  }, J.useEffect = function(d, A) {
    return L.H.useEffect(d, A);
  }, J.useEffectEvent = function(d) {
    return L.H.useEffectEvent(d);
  }, J.useId = function() {
    return L.H.useId();
  }, J.useImperativeHandle = function(d, A, M) {
    return L.H.useImperativeHandle(d, A, M);
  }, J.useInsertionEffect = function(d, A) {
    return L.H.useInsertionEffect(d, A);
  }, J.useLayoutEffect = function(d, A) {
    return L.H.useLayoutEffect(d, A);
  }, J.useMemo = function(d, A) {
    return L.H.useMemo(d, A);
  }, J.useOptimistic = function(d, A) {
    return L.H.useOptimistic(d, A);
  }, J.useReducer = function(d, A, M) {
    return L.H.useReducer(d, A, M);
  }, J.useRef = function(d) {
    return L.H.useRef(d);
  }, J.useState = function(d) {
    return L.H.useState(d);
  }, J.useSyncExternalStore = function(d, A, M) {
    return L.H.useSyncExternalStore(
      d,
      A,
      M
    );
  }, J.useTransition = function() {
    return L.H.useTransition();
  }, J.version = "19.2.6", J;
}
var gm;
function Di() {
  return gm || (gm = 1, Lf.exports = zh()), Lf.exports;
}
var el = Di();
const ms = /* @__PURE__ */ _h(el);
var Kf = { exports: {} }, ku = {}, Jf = { exports: {} }, wf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sm;
function Ah() {
  return Sm || (Sm = 1, (function(f) {
    function g(E, U) {
      var Q = E.length;
      E.push(U);
      l: for (; 0 < Q; ) {
        var dl = Q - 1 >>> 1, fl = E[dl];
        if (0 < C(fl, U))
          E[dl] = U, E[Q] = fl, Q = dl;
        else break l;
      }
    }
    function p(E) {
      return E.length === 0 ? null : E[0];
    }
    function o(E) {
      if (E.length === 0) return null;
      var U = E[0], Q = E.pop();
      if (Q !== U) {
        E[0] = Q;
        l: for (var dl = 0, fl = E.length, d = fl >>> 1; dl < d; ) {
          var A = 2 * (dl + 1) - 1, M = E[A], H = A + 1, K = E[H];
          if (0 > C(M, Q))
            H < fl && 0 > C(K, M) ? (E[dl] = K, E[H] = Q, dl = H) : (E[dl] = M, E[A] = Q, dl = A);
          else if (H < fl && 0 > C(K, Q))
            E[dl] = K, E[H] = Q, dl = H;
          else break l;
        }
      }
      return U;
    }
    function C(E, U) {
      var Q = E.sortIndex - U.sortIndex;
      return Q !== 0 ? Q : E.id - U.id;
    }
    if (f.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var B = performance;
      f.unstable_now = function() {
        return B.now();
      };
    } else {
      var R = Date, Y = R.now();
      f.unstable_now = function() {
        return R.now() - Y;
      };
    }
    var N = [], _ = [], x = 1, D = null, j = 3, $ = !1, cl = !1, k = !1, vl = !1, Hl = typeof setTimeout == "function" ? setTimeout : null, V = typeof clearTimeout == "function" ? clearTimeout : null, Ul = typeof setImmediate < "u" ? setImmediate : null;
    function I(E) {
      for (var U = p(_); U !== null; ) {
        if (U.callback === null) o(_);
        else if (U.startTime <= E)
          o(_), U.sortIndex = U.expirationTime, g(N, U);
        else break;
        U = p(_);
      }
    }
    function gl(E) {
      if (k = !1, I(E), !cl)
        if (p(N) !== null)
          cl = !0, pl || (pl = !0, Yl());
        else {
          var U = p(_);
          U !== null && $l(gl, U.startTime - E);
        }
    }
    var pl = !1, L = -1, ql = 5, sl = -1;
    function gt() {
      return vl ? !0 : !(f.unstable_now() - sl < ql);
    }
    function Bl() {
      if (vl = !1, pl) {
        var E = f.unstable_now();
        sl = E;
        var U = !0;
        try {
          l: {
            cl = !1, k && (k = !1, V(L), L = -1), $ = !0;
            var Q = j;
            try {
              t: {
                for (I(E), D = p(N); D !== null && !(D.expirationTime > E && gt()); ) {
                  var dl = D.callback;
                  if (typeof dl == "function") {
                    D.callback = null, j = D.priorityLevel;
                    var fl = dl(
                      D.expirationTime <= E
                    );
                    if (E = f.unstable_now(), typeof fl == "function") {
                      D.callback = fl, I(E), U = !0;
                      break t;
                    }
                    D === p(N) && o(N), I(E);
                  } else o(N);
                  D = p(N);
                }
                if (D !== null) U = !0;
                else {
                  var d = p(_);
                  d !== null && $l(
                    gl,
                    d.startTime - E
                  ), U = !1;
                }
              }
              break l;
            } finally {
              D = null, j = Q, $ = !1;
            }
            U = void 0;
          }
        } finally {
          U ? Yl() : pl = !1;
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
    function $l(E, U) {
      L = Hl(function() {
        E(f.unstable_now());
      }, U);
    }
    f.unstable_IdlePriority = 5, f.unstable_ImmediatePriority = 1, f.unstable_LowPriority = 4, f.unstable_NormalPriority = 3, f.unstable_Profiling = null, f.unstable_UserBlockingPriority = 2, f.unstable_cancelCallback = function(E) {
      E.callback = null;
    }, f.unstable_forceFrameRate = function(E) {
      0 > E || 125 < E ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : ql = 0 < E ? Math.floor(1e3 / E) : 5;
    }, f.unstable_getCurrentPriorityLevel = function() {
      return j;
    }, f.unstable_next = function(E) {
      switch (j) {
        case 1:
        case 2:
        case 3:
          var U = 3;
          break;
        default:
          U = j;
      }
      var Q = j;
      j = U;
      try {
        return E();
      } finally {
        j = Q;
      }
    }, f.unstable_requestPaint = function() {
      vl = !0;
    }, f.unstable_runWithPriority = function(E, U) {
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
      var Q = j;
      j = E;
      try {
        return U();
      } finally {
        j = Q;
      }
    }, f.unstable_scheduleCallback = function(E, U, Q) {
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
        callback: U,
        priorityLevel: E,
        startTime: Q,
        expirationTime: fl,
        sortIndex: -1
      }, Q > dl ? (E.sortIndex = Q, g(_, E), p(N) === null && E === p(_) && (k ? (V(L), L = -1) : k = !0, $l(gl, Q - dl))) : (E.sortIndex = fl, g(N, E), cl || $ || (cl = !0, pl || (pl = !0, Yl()))), E;
    }, f.unstable_shouldYield = gt, f.unstable_wrapCallback = function(E) {
      var U = j;
      return function() {
        var Q = j;
        j = U;
        try {
          return E.apply(this, arguments);
        } finally {
          j = Q;
        }
      };
    };
  })(wf)), wf;
}
var bm;
function Oh() {
  return bm || (bm = 1, Jf.exports = Ah()), Jf.exports;
}
var Wf = { exports: {} }, at = {};
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
function Dh() {
  if (Em) return at;
  Em = 1;
  var f = Di();
  function g(N) {
    var _ = "https://react.dev/errors/" + N;
    if (1 < arguments.length) {
      _ += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var x = 2; x < arguments.length; x++)
        _ += "&args[]=" + encodeURIComponent(arguments[x]);
    }
    return "Minified React error #" + N + "; visit " + _ + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function p() {
  }
  var o = {
    d: {
      f: p,
      r: function() {
        throw Error(g(522));
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
  }, C = Symbol.for("react.portal");
  function B(N, _, x) {
    var D = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: C,
      key: D == null ? null : "" + D,
      children: N,
      containerInfo: _,
      implementation: x
    };
  }
  var R = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function Y(N, _) {
    if (N === "font") return "";
    if (typeof _ == "string")
      return _ === "use-credentials" ? _ : "";
  }
  return at.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, at.createPortal = function(N, _) {
    var x = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!_ || _.nodeType !== 1 && _.nodeType !== 9 && _.nodeType !== 11)
      throw Error(g(299));
    return B(N, _, null, x);
  }, at.flushSync = function(N) {
    var _ = R.T, x = o.p;
    try {
      if (R.T = null, o.p = 2, N) return N();
    } finally {
      R.T = _, o.p = x, o.d.f();
    }
  }, at.preconnect = function(N, _) {
    typeof N == "string" && (_ ? (_ = _.crossOrigin, _ = typeof _ == "string" ? _ === "use-credentials" ? _ : "" : void 0) : _ = null, o.d.C(N, _));
  }, at.prefetchDNS = function(N) {
    typeof N == "string" && o.d.D(N);
  }, at.preinit = function(N, _) {
    if (typeof N == "string" && _ && typeof _.as == "string") {
      var x = _.as, D = Y(x, _.crossOrigin), j = typeof _.integrity == "string" ? _.integrity : void 0, $ = typeof _.fetchPriority == "string" ? _.fetchPriority : void 0;
      x === "style" ? o.d.S(
        N,
        typeof _.precedence == "string" ? _.precedence : void 0,
        {
          crossOrigin: D,
          integrity: j,
          fetchPriority: $
        }
      ) : x === "script" && o.d.X(N, {
        crossOrigin: D,
        integrity: j,
        fetchPriority: $,
        nonce: typeof _.nonce == "string" ? _.nonce : void 0
      });
    }
  }, at.preinitModule = function(N, _) {
    if (typeof N == "string")
      if (typeof _ == "object" && _ !== null) {
        if (_.as == null || _.as === "script") {
          var x = Y(
            _.as,
            _.crossOrigin
          );
          o.d.M(N, {
            crossOrigin: x,
            integrity: typeof _.integrity == "string" ? _.integrity : void 0,
            nonce: typeof _.nonce == "string" ? _.nonce : void 0
          });
        }
      } else _ == null && o.d.M(N);
  }, at.preload = function(N, _) {
    if (typeof N == "string" && typeof _ == "object" && _ !== null && typeof _.as == "string") {
      var x = _.as, D = Y(x, _.crossOrigin);
      o.d.L(N, x, {
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
  }, at.preloadModule = function(N, _) {
    if (typeof N == "string")
      if (_) {
        var x = Y(_.as, _.crossOrigin);
        o.d.m(N, {
          as: typeof _.as == "string" && _.as !== "script" ? _.as : void 0,
          crossOrigin: x,
          integrity: typeof _.integrity == "string" ? _.integrity : void 0
        });
      } else o.d.m(N);
  }, at.requestFormReset = function(N) {
    o.d.r(N);
  }, at.unstable_batchedUpdates = function(N, _) {
    return N(_);
  }, at.useFormState = function(N, _, x) {
    return R.H.useFormState(N, _, x);
  }, at.useFormStatus = function() {
    return R.H.useHostTransitionStatus();
  }, at.version = "19.2.6", at;
}
var _m;
function Nh() {
  if (_m) return Wf.exports;
  _m = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (g) {
        console.error(g);
      }
  }
  return f(), Wf.exports = Dh(), Wf.exports;
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
function Mh() {
  if (Tm) return ku;
  Tm = 1;
  var f = Oh(), g = Di(), p = Nh();
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
  function R(l) {
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
  function N(l) {
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
          if (n === e) return N(u), l;
          if (n === a) return N(u), t;
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
  var D = Object.assign, j = Symbol.for("react.element"), $ = Symbol.for("react.transitional.element"), cl = Symbol.for("react.portal"), k = Symbol.for("react.fragment"), vl = Symbol.for("react.strict_mode"), Hl = Symbol.for("react.profiler"), V = Symbol.for("react.consumer"), Ul = Symbol.for("react.context"), I = Symbol.for("react.forward_ref"), gl = Symbol.for("react.suspense"), pl = Symbol.for("react.suspense_list"), L = Symbol.for("react.memo"), ql = Symbol.for("react.lazy"), sl = Symbol.for("react.activity"), gt = Symbol.for("react.memo_cache_sentinel"), Bl = Symbol.iterator;
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
      case pl:
        return "SuspenseList";
      case sl:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case cl:
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
  var $l = Array.isArray, E = g.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, U = p.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = {
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
  function M(l, t) {
    fl++, dl[fl] = l.current, l.current = t;
  }
  var H = d(null), K = d(null), w = d(null), P = d(null);
  function Xl(l, t) {
    switch (M(w, t), M(K, l), M(H, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? Bd(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI)
          t = Bd(t), l = Yd(t, l);
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
    A(H), M(H, l);
  }
  function xl() {
    A(H), A(K), A(w);
  }
  function he(l) {
    l.memoizedState !== null && M(P, l);
    var t = H.current, e = Yd(t, l.type);
    t !== e && (M(K, l), M(H, e));
  }
  function Je(l) {
    K.current === l && (A(H), A(K)), P.current === l && (A(P), Ju._currentValue = Q);
  }
  var eu, un;
  function St(l) {
    if (eu === void 0)
      try {
        throw Error();
      } catch (e) {
        var t = e.stack.trim().match(/\n( *(at )?)/);
        eu = t && t[1] || "", un = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + eu + l + un;
  }
  var ha = !1;
  function nn(l, t) {
    if (!l || ha) return "";
    ha = !0;
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
                } catch (S) {
                  var y = S;
                }
                Reflect.construct(l, [], O);
              } else {
                try {
                  O.call();
                } catch (S) {
                  y = S;
                }
                l.call(O.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (S) {
                y = S;
              }
              (O = l()) && typeof O.catch == "function" && O.catch(function() {
              });
            }
          } catch (S) {
            if (S && y && typeof S.stack == "string")
              return [S.stack, y.stack];
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
      ha = !1, Error.prepareStackTrace = e;
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
        return nn(l.type, !1);
      case 11:
        return nn(l.type.render, !1);
      case 1:
        return nn(l.type, !0);
      case 31:
        return St("Activity");
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
  var zl = Object.prototype.hasOwnProperty, Al = f.unstable_scheduleCallback, ct = f.unstable_cancelCallback, ft = f.unstable_shouldYield, Ql = f.unstable_requestPaint, Ol = f.unstable_now, we = f.unstable_getCurrentPriorityLevel, ye = f.unstable_ImmediatePriority, au = f.unstable_UserBlockingPriority, We = f.unstable_NormalPriority, st = f.unstable_LowPriority, Nt = f.unstable_IdlePriority, uu = f.log, Mi = f.unstable_setDisableYieldValue, Wt = null, bt = null;
  function ge(l) {
    if (typeof uu == "function" && Mi(l), bt && typeof bt.setStrictMode == "function")
      try {
        bt.setStrictMode(Wt, l);
      } catch {
      }
  }
  var Et = Math.clz32 ? Math.clz32 : cv, nv = Math.log, iv = Math.LN2;
  function cv(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (nv(l) / iv | 0) | 0;
  }
  var cn = 256, fn = 262144, sn = 4194304;
  function $e(l) {
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
  function on(l, t, e) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var u = 0, n = l.suspendedLanes, i = l.pingedLanes;
    l = l.warmLanes;
    var c = a & 134217727;
    return c !== 0 ? (a = c & ~n, a !== 0 ? u = $e(a) : (i &= c, i !== 0 ? u = $e(i) : e || (e = c & ~l, e !== 0 && (u = $e(e))))) : (c = a & ~n, c !== 0 ? u = $e(c) : i !== 0 ? u = $e(i) : e || (e = a & ~l, e !== 0 && (u = $e(e)))), u === 0 ? 0 : t !== 0 && t !== u && (t & n) === 0 && (n = u & -u, e = t & -t, n >= e || n === 32 && (e & 4194048) !== 0) ? t : u;
  }
  function nu(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function fv(l, t) {
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
  function gs() {
    var l = sn;
    return sn <<= 1, (sn & 62914560) === 0 && (sn = 4194304), l;
  }
  function Ri(l) {
    for (var t = [], e = 0; 31 > e; e++) t.push(l);
    return t;
  }
  function iu(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function sv(l, t, e, a, u, n) {
    var i = l.pendingLanes;
    l.pendingLanes = e, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= e, l.entangledLanes &= e, l.errorRecoveryDisabledLanes &= e, l.shellSuspendCounter = 0;
    var c = l.entanglements, s = l.expirationTimes, h = l.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var T = 31 - Et(e), O = 1 << T;
      c[T] = 0, s[T] = -1;
      var y = h[T];
      if (y !== null)
        for (h[T] = null, T = 0; T < y.length; T++) {
          var S = y[T];
          S !== null && (S.lane &= -536870913);
        }
      e &= ~O;
    }
    a !== 0 && Ss(l, a, 0), n !== 0 && u === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(i & ~t));
  }
  function Ss(l, t, e) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var a = 31 - Et(t);
    l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | e & 261930;
  }
  function bs(l, t) {
    var e = l.entangledLanes |= t;
    for (l = l.entanglements; e; ) {
      var a = 31 - Et(e), u = 1 << a;
      u & t | l[a] & t && (l[a] |= t), e &= ~u;
    }
  }
  function Es(l, t) {
    var e = t & -t;
    return e = (e & 42) !== 0 ? 1 : Ui(e), (e & (l.suspendedLanes | t)) !== 0 ? 0 : e;
  }
  function Ui(l) {
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
  function xi(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function _s() {
    var l = U.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : cm(l.type));
  }
  function Ts(l, t) {
    var e = U.p;
    try {
      return U.p = l, t();
    } finally {
      U.p = e;
    }
  }
  var Se = Math.random().toString(36).slice(2), Il = "__reactFiber$" + Se, ot = "__reactProps$" + Se, ya = "__reactContainer$" + Se, ji = "__reactEvents$" + Se, ov = "__reactListeners$" + Se, rv = "__reactHandles$" + Se, ps = "__reactResources$" + Se, cu = "__reactMarker$" + Se;
  function Ci(l) {
    delete l[Il], delete l[ot], delete l[ji], delete l[ov], delete l[rv];
  }
  function ga(l) {
    var t = l[Il];
    if (t) return t;
    for (var e = l.parentNode; e; ) {
      if (t = e[ya] || e[Il]) {
        if (e = t.alternate, t.child !== null || e !== null && e.child !== null)
          for (l = Kd(l); l !== null; ) {
            if (e = l[Il]) return e;
            l = Kd(l);
          }
        return t;
      }
      l = e, e = l.parentNode;
    }
    return null;
  }
  function Sa(l) {
    if (l = l[Il] || l[ya]) {
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
  function ba(l) {
    var t = l[ps];
    return t || (t = l[ps] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Fl(l) {
    l[cu] = !0;
  }
  var zs = /* @__PURE__ */ new Set(), As = {};
  function Fe(l, t) {
    Ea(l, t), Ea(l + "Capture", t);
  }
  function Ea(l, t) {
    for (As[l] = t, l = 0; l < t.length; l++)
      zs.add(t[l]);
  }
  var dv = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Os = {}, Ds = {};
  function mv(l) {
    return zl.call(Ds, l) ? !0 : zl.call(Os, l) ? !1 : dv.test(l) ? Ds[l] = !0 : (Os[l] = !0, !1);
  }
  function rn(l, t, e) {
    if (mv(t))
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
  function dn(l, t, e) {
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
  function Mt(l) {
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
  function Ns(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function vv(l, t, e) {
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
  function Hi(l) {
    if (!l._valueTracker) {
      var t = Ns(l) ? "checked" : "value";
      l._valueTracker = vv(
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
    return l && (a = Ns(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== e ? (t.setValue(l), !0) : !1;
  }
  function mn(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var hv = /[\n"\\]/g;
  function Rt(l) {
    return l.replace(
      hv,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function qi(l, t, e, a, u, n, i, c) {
    l.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? l.type = i : l.removeAttribute("type"), t != null ? i === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + Mt(t)) : l.value !== "" + Mt(t) && (l.value = "" + Mt(t)) : i !== "submit" && i !== "reset" || l.removeAttribute("value"), t != null ? Bi(l, i, Mt(t)) : e != null ? Bi(l, i, Mt(e)) : a != null && l.removeAttribute("value"), u == null && n != null && (l.defaultChecked = !!n), u != null && (l.checked = u && typeof u != "function" && typeof u != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.name = "" + Mt(c) : l.removeAttribute("name");
  }
  function Rs(l, t, e, a, u, n, i, c) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || e != null) {
      if (!(n !== "submit" && n !== "reset" || t != null)) {
        Hi(l);
        return;
      }
      e = e != null ? "" + Mt(e) : "", t = t != null ? "" + Mt(t) : e, c || t === l.value || (l.value = t), l.defaultValue = t;
    }
    a = a ?? u, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = c ? l.checked : !!a, l.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (l.name = i), Hi(l);
  }
  function Bi(l, t, e) {
    t === "number" && mn(l.ownerDocument) === l || l.defaultValue === "" + e || (l.defaultValue = "" + e);
  }
  function _a(l, t, e, a) {
    if (l = l.options, t) {
      t = {};
      for (var u = 0; u < e.length; u++)
        t["$" + e[u]] = !0;
      for (e = 0; e < l.length; e++)
        u = t.hasOwnProperty("$" + l[e].value), l[e].selected !== u && (l[e].selected = u), u && a && (l[e].defaultSelected = !0);
    } else {
      for (e = "" + Mt(e), t = null, u = 0; u < l.length; u++) {
        if (l[u].value === e) {
          l[u].selected = !0, a && (l[u].defaultSelected = !0);
          return;
        }
        t !== null || l[u].disabled || (t = l[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Us(l, t, e) {
    if (t != null && (t = "" + Mt(t), t !== l.value && (l.value = t), e == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = e != null ? "" + Mt(e) : "";
  }
  function xs(l, t, e, a) {
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
    e = Mt(t), l.defaultValue = e, a = l.textContent, a === e && a !== "" && a !== null && (l.value = a), Hi(l);
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
  var yv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function js(l, t, e) {
    var a = t.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, e) : typeof e != "number" || e === 0 || yv.has(t) ? t === "float" ? l.cssFloat = e : l[t] = ("" + e).trim() : l[t] = e + "px";
  }
  function Cs(l, t, e) {
    if (t != null && typeof t != "object")
      throw Error(o(62));
    if (l = l.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
      for (var u in t)
        a = t[u], t.hasOwnProperty(u) && e[u] !== a && js(l, u, a);
    } else
      for (var n in t)
        t.hasOwnProperty(n) && js(l, n, t[n]);
  }
  function Yi(l) {
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
  var gv = /* @__PURE__ */ new Map([
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
  ]), Sv = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function vn(l) {
    return Sv.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function Ft() {
  }
  var Gi = null;
  function Xi(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var pa = null, za = null;
  function Hs(l) {
    var t = Sa(l);
    if (t && (l = t.stateNode)) {
      var e = l[ot] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if (qi(
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
                qi(
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
          Us(l, e.value, e.defaultValue);
          break l;
        case "select":
          t = e.value, t != null && _a(l, !!e.multiple, t, !1);
      }
    }
  }
  var Qi = !1;
  function qs(l, t, e) {
    if (Qi) return l(t, e);
    Qi = !0;
    try {
      var a = l(t);
      return a;
    } finally {
      if (Qi = !1, (pa !== null || za !== null) && (ti(), pa && (t = pa, l = za, za = pa = null, Hs(t), l)))
        for (t = 0; t < l.length; t++) Hs(l[t]);
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
  var kt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Vi = !1;
  if (kt)
    try {
      var ou = {};
      Object.defineProperty(ou, "passive", {
        get: function() {
          Vi = !0;
        }
      }), window.addEventListener("test", ou, ou), window.removeEventListener("test", ou, ou);
    } catch {
      Vi = !1;
    }
  var be = null, Zi = null, hn = null;
  function Bs() {
    if (hn) return hn;
    var l, t = Zi, e = t.length, a, u = "value" in be ? be.value : be.textContent, n = u.length;
    for (l = 0; l < e && t[l] === u[l]; l++) ;
    var i = e - l;
    for (a = 1; a <= i && t[e - a] === u[n - a]; a++) ;
    return hn = u.slice(l, 1 < a ? 1 - a : void 0);
  }
  function yn(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function gn() {
    return !0;
  }
  function Ys() {
    return !1;
  }
  function rt(l) {
    function t(e, a, u, n, i) {
      this._reactName = e, this._targetInst = u, this.type = a, this.nativeEvent = n, this.target = i, this.currentTarget = null;
      for (var c in l)
        l.hasOwnProperty(c) && (e = l[c], this[c] = e ? e(n) : n[c]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? gn : Ys, this.isPropagationStopped = Ys, this;
    }
    return D(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = gn);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = gn);
      },
      persist: function() {
      },
      isPersistent: gn
    }), t;
  }
  var ke = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Sn = rt(ke), ru = D({}, ke, { view: 0, detail: 0 }), bv = rt(ru), Li, Ki, du, bn = D({}, ru, {
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
    getModifierState: wi,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== du && (du && l.type === "mousemove" ? (Li = l.screenX - du.screenX, Ki = l.screenY - du.screenY) : Ki = Li = 0, du = l), Li);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : Ki;
    }
  }), Gs = rt(bn), Ev = D({}, bn, { dataTransfer: 0 }), _v = rt(Ev), Tv = D({}, ru, { relatedTarget: 0 }), Ji = rt(Tv), pv = D({}, ke, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), zv = rt(pv), Av = D({}, ke, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), Ov = rt(Av), Dv = D({}, ke, { data: 0 }), Xs = rt(Dv), Nv = {
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
  }, Mv = {
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
  }, Rv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Uv(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = Rv[l]) ? !!t[l] : !1;
  }
  function wi() {
    return Uv;
  }
  var xv = D({}, ru, {
    key: function(l) {
      if (l.key) {
        var t = Nv[l.key] || l.key;
        if (t !== "Unidentified") return t;
      }
      return l.type === "keypress" ? (l = yn(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? Mv[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: wi,
    charCode: function(l) {
      return l.type === "keypress" ? yn(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? yn(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), jv = rt(xv), Cv = D({}, bn, {
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
  }), Qs = rt(Cv), Hv = D({}, ru, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: wi
  }), qv = rt(Hv), Bv = D({}, ke, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Yv = rt(Bv), Gv = D({}, bn, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Xv = rt(Gv), Qv = D({}, ke, {
    newState: 0,
    oldState: 0
  }), Vv = rt(Qv), Zv = [9, 13, 27, 32], Wi = kt && "CompositionEvent" in window, mu = null;
  kt && "documentMode" in document && (mu = document.documentMode);
  var Lv = kt && "TextEvent" in window && !mu, Vs = kt && (!Wi || mu && 8 < mu && 11 >= mu), Zs = " ", Ls = !1;
  function Ks(l, t) {
    switch (l) {
      case "keyup":
        return Zv.indexOf(t.keyCode) !== -1;
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
  function Js(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var Aa = !1;
  function Kv(l, t) {
    switch (l) {
      case "compositionend":
        return Js(t);
      case "keypress":
        return t.which !== 32 ? null : (Ls = !0, Zs);
      case "textInput":
        return l = t.data, l === Zs && Ls ? null : l;
      default:
        return null;
    }
  }
  function Jv(l, t) {
    if (Aa)
      return l === "compositionend" || !Wi && Ks(l, t) ? (l = Bs(), hn = Zi = be = null, Aa = !1, l) : null;
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
        return Vs && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var wv = {
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
  function ws(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!wv[l.type] : t === "textarea";
  }
  function Ws(l, t, e, a) {
    pa ? za ? za.push(a) : za = [a] : pa = a, t = fi(t, "onChange"), 0 < t.length && (e = new Sn(
      "onChange",
      "change",
      null,
      e,
      a
    ), l.push({ event: e, listeners: t }));
  }
  var vu = null, hu = null;
  function Wv(l) {
    Ud(l, 0);
  }
  function En(l) {
    var t = fu(l);
    if (Ms(t)) return l;
  }
  function $s(l, t) {
    if (l === "change") return t;
  }
  var Fs = !1;
  if (kt) {
    var $i;
    if (kt) {
      var Fi = "oninput" in document;
      if (!Fi) {
        var ks = document.createElement("div");
        ks.setAttribute("oninput", "return;"), Fi = typeof ks.oninput == "function";
      }
      $i = Fi;
    } else $i = !1;
    Fs = $i && (!document.documentMode || 9 < document.documentMode);
  }
  function Is() {
    vu && (vu.detachEvent("onpropertychange", Ps), hu = vu = null);
  }
  function Ps(l) {
    if (l.propertyName === "value" && En(hu)) {
      var t = [];
      Ws(
        t,
        hu,
        l,
        Xi(l)
      ), qs(Wv, t);
    }
  }
  function $v(l, t, e) {
    l === "focusin" ? (Is(), vu = t, hu = e, vu.attachEvent("onpropertychange", Ps)) : l === "focusout" && Is();
  }
  function Fv(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return En(hu);
  }
  function kv(l, t) {
    if (l === "click") return En(t);
  }
  function Iv(l, t) {
    if (l === "input" || l === "change")
      return En(t);
  }
  function Pv(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var _t = typeof Object.is == "function" ? Object.is : Pv;
  function yu(l, t) {
    if (_t(l, t)) return !0;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null)
      return !1;
    var e = Object.keys(l), a = Object.keys(t);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var u = e[a];
      if (!zl.call(t, u) || !_t(l[u], t[u]))
        return !1;
    }
    return !0;
  }
  function lo(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function to(l, t) {
    var e = lo(l);
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
      e = lo(e);
    }
  }
  function eo(l, t) {
    return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? eo(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function ao(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = mn(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var e = typeof t.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) l = t.contentWindow;
      else break;
      t = mn(l.document);
    }
    return t;
  }
  function ki(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var l0 = kt && "documentMode" in document && 11 >= document.documentMode, Oa = null, Ii = null, gu = null, Pi = !1;
  function uo(l, t, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    Pi || Oa == null || Oa !== mn(a) || (a = Oa, "selectionStart" in a && ki(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), gu && yu(gu, a) || (gu = a, a = fi(Ii, "onSelect"), 0 < a.length && (t = new Sn(
      "onSelect",
      "select",
      null,
      t,
      e
    ), l.push({ event: t, listeners: a }), t.target = Oa)));
  }
  function Ie(l, t) {
    var e = {};
    return e[l.toLowerCase()] = t.toLowerCase(), e["Webkit" + l] = "webkit" + t, e["Moz" + l] = "moz" + t, e;
  }
  var Da = {
    animationend: Ie("Animation", "AnimationEnd"),
    animationiteration: Ie("Animation", "AnimationIteration"),
    animationstart: Ie("Animation", "AnimationStart"),
    transitionrun: Ie("Transition", "TransitionRun"),
    transitionstart: Ie("Transition", "TransitionStart"),
    transitioncancel: Ie("Transition", "TransitionCancel"),
    transitionend: Ie("Transition", "TransitionEnd")
  }, lc = {}, no = {};
  kt && (no = document.createElement("div").style, "AnimationEvent" in window || (delete Da.animationend.animation, delete Da.animationiteration.animation, delete Da.animationstart.animation), "TransitionEvent" in window || delete Da.transitionend.transition);
  function Pe(l) {
    if (lc[l]) return lc[l];
    if (!Da[l]) return l;
    var t = Da[l], e;
    for (e in t)
      if (t.hasOwnProperty(e) && e in no)
        return lc[l] = t[e];
    return l;
  }
  var io = Pe("animationend"), co = Pe("animationiteration"), fo = Pe("animationstart"), t0 = Pe("transitionrun"), e0 = Pe("transitionstart"), a0 = Pe("transitioncancel"), so = Pe("transitionend"), oo = /* @__PURE__ */ new Map(), tc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  tc.push("scrollEnd");
  function Gt(l, t) {
    oo.set(l, t), Fe(t, [l]);
  }
  var _n = typeof reportError == "function" ? reportError : function(l) {
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
  }, Ut = [], Na = 0, ec = 0;
  function Tn() {
    for (var l = Na, t = ec = Na = 0; t < l; ) {
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
      n !== 0 && ro(e, u, n);
    }
  }
  function pn(l, t, e, a) {
    Ut[Na++] = l, Ut[Na++] = t, Ut[Na++] = e, Ut[Na++] = a, ec |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
  }
  function ac(l, t, e, a) {
    return pn(l, t, e, a), zn(l);
  }
  function la(l, t) {
    return pn(l, null, null, t), zn(l);
  }
  function ro(l, t, e) {
    l.lanes |= e;
    var a = l.alternate;
    a !== null && (a.lanes |= e);
    for (var u = !1, n = l.return; n !== null; )
      n.childLanes |= e, a = n.alternate, a !== null && (a.childLanes |= e), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (u = !0)), l = n, n = n.return;
    return l.tag === 3 ? (n = l.stateNode, u && t !== null && (u = 31 - Et(e), l = n.hiddenUpdates, a = l[u], a === null ? l[u] = [t] : a.push(t), t.lane = e | 536870912), n) : null;
  }
  function zn(l) {
    if (50 < Gu)
      throw Gu = 0, mf = null, Error(o(185));
    for (var t = l.return; t !== null; )
      l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var Ma = {};
  function u0(l, t, e, a) {
    this.tag = l, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Tt(l, t, e, a) {
    return new u0(l, t, e, a);
  }
  function uc(l) {
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
  function mo(l, t) {
    l.flags &= 65011714;
    var e = l.alternate;
    return e === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, l.type = e.type, t = e.dependencies, l.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), l;
  }
  function An(l, t, e, a, u, n) {
    var i = 0;
    if (a = l, typeof l == "function") uc(l) && (i = 1);
    else if (typeof l == "string")
      i = sh(
        l,
        e,
        H.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      l: switch (l) {
        case sl:
          return l = Tt(31, e, t, u), l.elementType = sl, l.lanes = n, l;
        case k:
          return ta(e.children, u, n, t);
        case vl:
          i = 8, u |= 24;
          break;
        case Hl:
          return l = Tt(12, e, t, u | 2), l.elementType = Hl, l.lanes = n, l;
        case gl:
          return l = Tt(13, e, t, u), l.elementType = gl, l.lanes = n, l;
        case pl:
          return l = Tt(19, e, t, u), l.elementType = pl, l.lanes = n, l;
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
  function ta(l, t, e, a) {
    return l = Tt(7, l, a, t), l.lanes = e, l;
  }
  function nc(l, t, e) {
    return l = Tt(6, l, null, t), l.lanes = e, l;
  }
  function vo(l) {
    var t = Tt(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function ic(l, t, e) {
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
  var ho = /* @__PURE__ */ new WeakMap();
  function xt(l, t) {
    if (typeof l == "object" && l !== null) {
      var e = ho.get(l);
      return e !== void 0 ? e : (t = {
        value: l,
        source: t,
        stack: Ml(t)
      }, ho.set(l, t), t);
    }
    return {
      value: l,
      source: t,
      stack: Ml(t)
    };
  }
  var Ra = [], Ua = 0, On = null, Su = 0, jt = [], Ct = 0, Ee = null, Vt = 1, Zt = "";
  function Pt(l, t) {
    Ra[Ua++] = Su, Ra[Ua++] = On, On = l, Su = t;
  }
  function yo(l, t, e) {
    jt[Ct++] = Vt, jt[Ct++] = Zt, jt[Ct++] = Ee, Ee = l;
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
  function cc(l) {
    l.return !== null && (Pt(l, 1), yo(l, 1, 0));
  }
  function fc(l) {
    for (; l === On; )
      On = Ra[--Ua], Ra[Ua] = null, Su = Ra[--Ua], Ra[Ua] = null;
    for (; l === Ee; )
      Ee = jt[--Ct], jt[Ct] = null, Zt = jt[--Ct], jt[Ct] = null, Vt = jt[--Ct], jt[Ct] = null;
  }
  function go(l, t) {
    jt[Ct++] = Vt, jt[Ct++] = Zt, jt[Ct++] = Ee, Vt = t.id, Zt = t.overflow, Ee = l;
  }
  var Pl = null, Dl = null, il = !1, _e = null, Ht = !1, sc = Error(o(519));
  function Te(l) {
    var t = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw bu(xt(t, l)), sc;
  }
  function So(l) {
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
        for (e = 0; e < Qu.length; e++)
          tl(Qu[e], t);
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
        tl("invalid", t), Rs(
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
        tl("invalid", t), xs(t, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || t.textContent === "" + e || a.suppressHydrationWarning === !0 || Hd(t.textContent, e) ? (a.popover != null && (tl("beforetoggle", t), tl("toggle", t)), a.onScroll != null && tl("scroll", t), a.onScrollEnd != null && tl("scrollend", t), a.onClick != null && (t.onclick = Ft), t = !0) : t = !1, t || Te(l, !0);
  }
  function bo(l) {
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
  function xa(l) {
    if (l !== Pl) return !1;
    if (!il) return bo(l), il = !0, !1;
    var t = l.tag, e;
    if ((e = t !== 3 && t !== 27) && ((e = t === 5) && (e = l.type, e = !(e !== "form" && e !== "button") || Nf(l.type, l.memoizedProps)), e = !e), e && Dl && Te(l), bo(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(317));
      Dl = Ld(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(317));
      Dl = Ld(l);
    } else
      t === 27 ? (t = Dl, qe(l.type) ? (l = jf, jf = null, Dl = l) : Dl = t) : Dl = Pl ? Bt(l.stateNode.nextSibling) : null;
    return !0;
  }
  function ea() {
    Dl = Pl = null, il = !1;
  }
  function oc() {
    var l = _e;
    return l !== null && (ht === null ? ht = l : ht.push.apply(
      ht,
      l
    ), _e = null), l;
  }
  function bu(l) {
    _e === null ? _e = [l] : _e.push(l);
  }
  var rc = d(null), aa = null, le = null;
  function pe(l, t, e) {
    M(rc, t._currentValue), t._currentValue = e;
  }
  function te(l) {
    l._currentValue = rc.current, A(rc);
  }
  function dc(l, t, e) {
    for (; l !== null; ) {
      var a = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === e) break;
      l = l.return;
    }
  }
  function mc(l, t, e, a) {
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
              n.lanes |= e, c = n.alternate, c !== null && (c.lanes |= e), dc(
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
        i.lanes |= e, n = i.alternate, n !== null && (n.lanes |= e), dc(i, e, l), i = null;
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
  function ja(l, t, e, a) {
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
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState && (l !== null ? l.push(Ju) : l = [Ju]);
      }
      u = u.return;
    }
    l !== null && mc(
      t,
      l,
      e,
      a
    ), t.flags |= 262144;
  }
  function Dn(l) {
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
  function ua(l) {
    aa = l, le = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function lt(l) {
    return Eo(aa, l);
  }
  function Nn(l, t) {
    return aa === null && ua(l), Eo(l, t);
  }
  function Eo(l, t) {
    var e = t._currentValue;
    if (t = { context: t, memoizedValue: e, next: null }, le === null) {
      if (l === null) throw Error(o(308));
      le = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
    } else le = le.next = t;
    return e;
  }
  var n0 = typeof AbortController < "u" ? AbortController : function() {
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
  }, i0 = f.unstable_scheduleCallback, c0 = f.unstable_NormalPriority, Ll = {
    $$typeof: Ul,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function vc() {
    return {
      controller: new n0(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Eu(l) {
    l.refCount--, l.refCount === 0 && i0(c0, function() {
      l.controller.abort();
    });
  }
  var _u = null, hc = 0, Ca = 0, Ha = null;
  function f0(l, t) {
    if (_u === null) {
      var e = _u = [];
      hc = 0, Ca = bf(), Ha = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return hc++, t.then(_o, _o), t;
  }
  function _o() {
    if (--hc === 0 && _u !== null) {
      Ha !== null && (Ha.status = "fulfilled");
      var l = _u;
      _u = null, Ca = 0, Ha = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function s0(l, t) {
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
    nd = Ol(), typeof t == "object" && t !== null && typeof t.then == "function" && f0(l, t), To !== null && To(l, t);
  };
  var na = d(null);
  function yc() {
    var l = na.current;
    return l !== null ? l : Tl.pooledCache;
  }
  function Mn(l, t) {
    t === null ? M(na, na.current) : M(na, t.pool);
  }
  function po() {
    var l = yc();
    return l === null ? null : { parent: Ll._currentValue, pool: l };
  }
  var qa = Error(o(460)), gc = Error(o(474)), Rn = Error(o(542)), Un = { then: function() {
  } };
  function zo(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function Ao(l, t, e) {
    switch (e = l[e], e === void 0 ? l.push(t) : e !== t && (t.then(Ft, Ft), t = e), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, Do(l), l;
      default:
        if (typeof t.status == "string") t.then(Ft, Ft);
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
            throw l = t.reason, Do(l), l;
        }
        throw ca = t, qa;
    }
  }
  function ia(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (ca = e, qa) : e;
    }
  }
  var ca = null;
  function Oo() {
    if (ca === null) throw Error(o(459));
    var l = ca;
    return ca = null, l;
  }
  function Do(l) {
    if (l === qa || l === Rn)
      throw Error(o(483));
  }
  var Ba = null, Tu = 0;
  function xn(l) {
    var t = Tu;
    return Tu += 1, Ba === null && (Ba = []), Ao(Ba, l, t);
  }
  function pu(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function jn(l, t) {
    throw t.$$typeof === j ? Error(o(525)) : (l = Object.prototype.toString.call(t), Error(
      o(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
      )
    ));
  }
  function No(l) {
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
      return r === null || r.tag !== 6 ? (r = nc(v, m.mode, z), r.return = m, r) : (r = u(r, v), r.return = m, r);
    }
    function s(m, r, v, z) {
      var X = v.type;
      return X === k ? T(
        m,
        r,
        v.props.children,
        z,
        v.key
      ) : r !== null && (r.elementType === X || typeof X == "object" && X !== null && X.$$typeof === ql && ia(X) === r.type) ? (r = u(r, v.props), pu(r, v), r.return = m, r) : (r = An(
        v.type,
        v.key,
        v.props,
        null,
        m.mode,
        z
      ), pu(r, v), r.return = m, r);
    }
    function h(m, r, v, z) {
      return r === null || r.tag !== 4 || r.stateNode.containerInfo !== v.containerInfo || r.stateNode.implementation !== v.implementation ? (r = ic(v, m.mode, z), r.return = m, r) : (r = u(r, v.children || []), r.return = m, r);
    }
    function T(m, r, v, z, X) {
      return r === null || r.tag !== 7 ? (r = ta(
        v,
        m.mode,
        z,
        X
      ), r.return = m, r) : (r = u(r, v), r.return = m, r);
    }
    function O(m, r, v) {
      if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint")
        return r = nc(
          "" + r,
          m.mode,
          v
        ), r.return = m, r;
      if (typeof r == "object" && r !== null) {
        switch (r.$$typeof) {
          case $:
            return v = An(
              r.type,
              r.key,
              r.props,
              null,
              m.mode,
              v
            ), pu(v, r), v.return = m, v;
          case cl:
            return r = ic(
              r,
              m.mode,
              v
            ), r.return = m, r;
          case ql:
            return r = ia(r), O(m, r, v);
        }
        if ($l(r) || Yl(r))
          return r = ta(
            r,
            m.mode,
            v,
            null
          ), r.return = m, r;
        if (typeof r.then == "function")
          return O(m, xn(r), v);
        if (r.$$typeof === Ul)
          return O(
            m,
            Nn(m, r),
            v
          );
        jn(m, r);
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
            return v = ia(v), y(m, r, v, z);
        }
        if ($l(v) || Yl(v))
          return X !== null ? null : T(m, r, v, z, null);
        if (typeof v.then == "function")
          return y(
            m,
            r,
            xn(v),
            z
          );
        if (v.$$typeof === Ul)
          return y(
            m,
            r,
            Nn(m, v),
            z
          );
        jn(m, v);
      }
      return null;
    }
    function S(m, r, v, z, X) {
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
            return z = ia(z), S(
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
          return S(
            m,
            r,
            v,
            xn(z),
            X
          );
        if (z.$$typeof === Ul)
          return S(
            m,
            r,
            v,
            Nn(r, z),
            X
          );
        jn(r, z);
      }
      return null;
    }
    function q(m, r, v, z) {
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
        ul = S(
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
      return l && G.forEach(function(Qe) {
        return t(m, Qe);
      }), il && Pt(m, F), X;
    }
    function Z(m, r, v, z) {
      if (v == null) throw Error(o(151));
      for (var X = null, ol = null, G = r, F = r = 0, ul = null, rl = v.next(); G !== null && !rl.done; F++, rl = v.next()) {
        G.index > F ? (ul = G, G = null) : ul = G.sibling;
        var Qe = y(m, G, rl.value, z);
        if (Qe === null) {
          G === null && (G = ul);
          break;
        }
        l && G && Qe.alternate === null && t(m, G), r = n(Qe, r, F), ol === null ? X = Qe : ol.sibling = Qe, ol = Qe, G = ul;
      }
      if (rl.done)
        return e(m, G), il && Pt(m, F), X;
      if (G === null) {
        for (; !rl.done; F++, rl = v.next())
          rl = O(m, rl.value, z), rl !== null && (r = n(rl, r, F), ol === null ? X = rl : ol.sibling = rl, ol = rl);
        return il && Pt(m, F), X;
      }
      for (G = a(G); !rl.done; F++, rl = v.next())
        rl = S(G, m, F, rl.value, z), rl !== null && (l && rl.alternate !== null && G.delete(rl.key === null ? F : rl.key), r = n(rl, r, F), ol === null ? X = rl : ol.sibling = rl, ol = rl);
      return l && G.forEach(function(Eh) {
        return t(m, Eh);
      }), il && Pt(m, F), X;
    }
    function _l(m, r, v, z) {
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
                  } else if (r.elementType === X || typeof X == "object" && X !== null && X.$$typeof === ql && ia(X) === r.type) {
                    e(
                      m,
                      r.sibling
                    ), z = u(r, v.props), pu(z, v), z.return = m, m = z;
                    break l;
                  }
                  e(m, r);
                  break;
                } else t(m, r);
                r = r.sibling;
              }
              v.type === k ? (z = ta(
                v.props.children,
                m.mode,
                z,
                v.key
              ), z.return = m, m = z) : (z = An(
                v.type,
                v.key,
                v.props,
                null,
                m.mode,
                z
              ), pu(z, v), z.return = m, m = z);
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
              z = ic(v, m.mode, z), z.return = m, m = z;
            }
            return i(m);
          case ql:
            return v = ia(v), _l(
              m,
              r,
              v,
              z
            );
        }
        if ($l(v))
          return q(
            m,
            r,
            v,
            z
          );
        if (Yl(v)) {
          if (X = Yl(v), typeof X != "function") throw Error(o(150));
          return v = X.call(v), Z(
            m,
            r,
            v,
            z
          );
        }
        if (typeof v.then == "function")
          return _l(
            m,
            r,
            xn(v),
            z
          );
        if (v.$$typeof === Ul)
          return _l(
            m,
            r,
            Nn(m, v),
            z
          );
        jn(m, v);
      }
      return typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint" ? (v = "" + v, r !== null && r.tag === 6 ? (e(m, r.sibling), z = u(r, v), z.return = m, m = z) : (e(m, r), z = nc(v, m.mode, z), z.return = m, m = z), i(m)) : e(m, r);
    }
    return function(m, r, v, z) {
      try {
        Tu = 0;
        var X = _l(
          m,
          r,
          v,
          z
        );
        return Ba = null, X;
      } catch (G) {
        if (G === qa || G === Rn) throw G;
        var ol = Tt(29, G, null, m.mode);
        return ol.lanes = z, ol.return = m, ol;
      } finally {
      }
    };
  }
  var fa = No(!0), Mo = No(!1), ze = !1;
  function Sc(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function bc(l, t) {
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
  function Oe(l, t, e) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (ml & 2) !== 0) {
      var u = a.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), a.pending = t, t = zn(l), ro(l, null, e), t;
    }
    return pn(l, a, t, e), zn(l);
  }
  function zu(l, t, e) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (e & 4194048) !== 0)) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, bs(l, e);
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
  var _c = !1;
  function Au() {
    if (_c) {
      var l = Ha;
      if (l !== null) throw l;
    }
  }
  function Ou(l, t, e, a) {
    _c = !1;
    var u = l.updateQueue;
    ze = !1;
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
        var y = c.lane & -536870913, S = y !== c.lane;
        if (S ? (al & y) === y : (a & y) === y) {
          y !== 0 && y === Ca && (_c = !0), T !== null && (T = T.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          l: {
            var q = l, Z = c;
            y = t;
            var _l = e;
            switch (Z.tag) {
              case 1:
                if (q = Z.payload, typeof q == "function") {
                  O = q.call(_l, O, y);
                  break l;
                }
                O = q;
                break l;
              case 3:
                q.flags = q.flags & -65537 | 128;
              case 0:
                if (q = Z.payload, y = typeof q == "function" ? q.call(_l, O, y) : q, y == null) break l;
                O = D({}, O, y);
                break l;
              case 2:
                ze = !0;
            }
          }
          y = c.callback, y !== null && (l.flags |= 64, S && (l.flags |= 8192), S = u.callbacks, S === null ? u.callbacks = [y] : S.push(y));
        } else
          S = {
            lane: y,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null
          }, T === null ? (h = T = S, s = O) : T = T.next = S, i |= y;
        if (c = c.next, c === null) {
          if (c = u.shared.pending, c === null)
            break;
          S = c, c = S.next, S.next = null, u.lastBaseUpdate = S, u.shared.pending = null;
        }
      } while (!0);
      T === null && (s = O), u.baseState = s, u.firstBaseUpdate = h, u.lastBaseUpdate = T, n === null && (u.shared.lanes = 0), Ue |= i, l.lanes = i, l.memoizedState = O;
    }
  }
  function Ro(l, t) {
    if (typeof l != "function")
      throw Error(o(191, l));
    l.call(t);
  }
  function Uo(l, t) {
    var e = l.callbacks;
    if (e !== null)
      for (l.callbacks = null, l = 0; l < e.length; l++)
        Ro(e[l], t);
  }
  var Ya = d(null), Cn = d(0);
  function xo(l, t) {
    l = oe, M(Cn, l), M(Ya, t), oe = l | t.baseLanes;
  }
  function Tc() {
    M(Cn, oe), M(Ya, Ya.current);
  }
  function pc() {
    oe = Cn.current, A(Ya), A(Cn);
  }
  var pt = d(null), qt = null;
  function De(l) {
    var t = l.alternate;
    M(Vl, Vl.current & 1), M(pt, l), qt === null && (t === null || Ya.current !== null || t.memoizedState !== null) && (qt = l);
  }
  function zc(l) {
    M(Vl, Vl.current), M(pt, l), qt === null && (qt = l);
  }
  function jo(l) {
    l.tag === 22 ? (M(Vl, Vl.current), M(pt, l), qt === null && (qt = l)) : Ne();
  }
  function Ne() {
    M(Vl, Vl.current), M(pt, pt.current);
  }
  function zt(l) {
    A(pt), qt === l && (qt = null), A(Vl);
  }
  var Vl = d(0);
  function Hn(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || Uf(e) || xf(e)))
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
  var ee = 0, W = null, bl = null, Kl = null, qn = !1, Ga = !1, sa = !1, Bn = 0, Du = 0, Xa = null, o0 = 0;
  function jl() {
    throw Error(o(321));
  }
  function Ac(l, t) {
    if (t === null) return !1;
    for (var e = 0; e < t.length && e < l.length; e++)
      if (!_t(l[e], t[e])) return !1;
    return !0;
  }
  function Oc(l, t, e, a, u, n) {
    return ee = n, W = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, E.H = l === null || l.memoizedState === null ? yr : Qc, sa = !1, n = e(a, u), sa = !1, Ga && (n = Ho(
      t,
      e,
      a,
      u
    )), Co(l), n;
  }
  function Co(l) {
    E.H = Ru;
    var t = bl !== null && bl.next !== null;
    if (ee = 0, Kl = bl = W = null, qn = !1, Du = 0, Xa = null, t) throw Error(o(300));
    l === null || Jl || (l = l.dependencies, l !== null && Dn(l) && (Jl = !0));
  }
  function Ho(l, t, e, a) {
    W = l;
    var u = 0;
    do {
      if (Ga && (Xa = null), Du = 0, Ga = !1, 25 <= u) throw Error(o(301));
      if (u += 1, Kl = bl = null, l.updateQueue != null) {
        var n = l.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      E.H = gr, n = t(e, a);
    } while (Ga);
    return n;
  }
  function r0() {
    var l = E.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? Nu(t) : t, l = l.useState()[0], (bl !== null ? bl.memoizedState : null) !== l && (W.flags |= 1024), t;
  }
  function Dc() {
    var l = Bn !== 0;
    return Bn = 0, l;
  }
  function Nc(l, t, e) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~e;
  }
  function Mc(l) {
    if (qn) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      qn = !1;
    }
    ee = 0, Kl = bl = W = null, Ga = !1, Du = Bn = 0, Xa = null;
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
  function Yn() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Nu(l) {
    var t = Du;
    return Du += 1, Xa === null && (Xa = []), l = Ao(Xa, l, t), t = W, (Kl === null ? t.memoizedState : Kl.next) === null && (t = t.alternate, E.H = t === null || t.memoizedState === null ? yr : Qc), l;
  }
  function Gn(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Nu(l);
      if (l.$$typeof === Ul) return lt(l);
    }
    throw Error(o(438, String(l)));
  }
  function Rc(l) {
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
    if (t == null && (t = { data: [], index: 0 }), e === null && (e = Yn(), W.updateQueue = e), e.memoCache = t, e = t.data[t.index], e === void 0)
      for (e = t.data[t.index] = Array(l), a = 0; a < l; a++)
        e[a] = gt;
    return t.index++, e;
  }
  function ae(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function Xn(l) {
    var t = Zl();
    return Uc(t, bl, l);
  }
  function Uc(l, t, e) {
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
            }), O === Ca && (T = !0);
          else if ((ee & y) === y) {
            h = h.next, y === Ca && (T = !0);
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
            }, s === null ? (c = s = O, i = n) : s = s.next = O, W.lanes |= y, Ue |= y;
          O = h.action, sa && e(n, O), n = h.hasEagerState ? h.eagerState : e(n, O);
        } else
          y = {
            lane: O,
            revertLane: h.revertLane,
            gesture: h.gesture,
            action: h.action,
            hasEagerState: h.hasEagerState,
            eagerState: h.eagerState,
            next: null
          }, s === null ? (c = s = y, i = n) : s = s.next = y, W.lanes |= O, Ue |= O;
        h = h.next;
      } while (h !== null && h !== t);
      if (s === null ? i = n : s.next = c, !_t(n, l.memoizedState) && (Jl = !0, T && (e = Ha, e !== null)))
        throw e;
      l.memoizedState = n, l.baseState = i, l.baseQueue = s, a.lastRenderedState = n;
    }
    return u === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function xc(l) {
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
  function qo(l, t, e) {
    var a = W, u = Zl(), n = il;
    if (n) {
      if (e === void 0) throw Error(o(407));
      e = e();
    } else e = t();
    var i = !_t(
      (bl || u).memoizedState,
      e
    );
    if (i && (u.memoizedState = e, Jl = !0), u = u.queue, Hc(Go.bind(null, a, u, l), [
      l
    ]), u.getSnapshot !== t || i || Kl !== null && Kl.memoizedState.tag & 1) {
      if (a.flags |= 2048, Qa(
        9,
        { destroy: void 0 },
        Yo.bind(
          null,
          a,
          u,
          e,
          t
        ),
        null
      ), Tl === null) throw Error(o(349));
      n || (ee & 127) !== 0 || Bo(a, t, e);
    }
    return e;
  }
  function Bo(l, t, e) {
    l.flags |= 16384, l = { getSnapshot: t, value: e }, t = W.updateQueue, t === null ? (t = Yn(), W.updateQueue = t, t.stores = [l]) : (e = t.stores, e === null ? t.stores = [l] : e.push(l));
  }
  function Yo(l, t, e, a) {
    t.value = e, t.getSnapshot = a, Xo(t) && Qo(l);
  }
  function Go(l, t, e) {
    return e(function() {
      Xo(t) && Qo(l);
    });
  }
  function Xo(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var e = t();
      return !_t(l, e);
    } catch {
      return !0;
    }
  }
  function Qo(l) {
    var t = la(l, 2);
    t !== null && yt(t, l, 2);
  }
  function jc(l) {
    var t = it();
    if (typeof l == "function") {
      var e = l;
      if (l = e(), sa) {
        ge(!0);
        try {
          e();
        } finally {
          ge(!1);
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
  function Vo(l, t, e, a) {
    return l.baseState = e, Uc(
      l,
      bl,
      typeof a == "function" ? a : ae
    );
  }
  function d0(l, t, e, a, u) {
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
        s !== null && s(i, c), Lo(l, t, c);
      } catch (h) {
        Cc(l, t, h);
      } finally {
        n !== null && i.types !== null && (n.types = i.types), E.T = n;
      }
    } else
      try {
        n = e(u, a), Lo(l, t, n);
      } catch (h) {
        Cc(l, t, h);
      }
  }
  function Lo(l, t, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        Ko(l, t, a);
      },
      function(a) {
        return Cc(l, t, a);
      }
    ) : Ko(l, t, e);
  }
  function Ko(l, t, e) {
    t.status = "fulfilled", t.value = e, Jo(t), l.state = e, t = l.pending, t !== null && (e = t.next, e === t ? l.pending = null : (e = e.next, t.next = e, Zo(l, e)));
  }
  function Cc(l, t, e) {
    var a = l.pending;
    if (l.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = e, Jo(t), t = t.next;
      while (t !== a);
    }
    l.action = null;
  }
  function Jo(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function wo(l, t) {
    return t;
  }
  function Wo(l, t) {
    if (il) {
      var e = Tl.formState;
      if (e !== null) {
        l: {
          var a = W;
          if (il) {
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
      lastRenderedReducer: wo,
      lastRenderedState: t
    }, e.queue = a, e = mr.bind(
      null,
      W,
      a
    ), a.dispatch = e, a = jc(!1), n = Xc.bind(
      null,
      W,
      !1,
      a.queue
    ), a = it(), u = {
      state: t,
      dispatch: null,
      action: l,
      pending: null
    }, a.queue = u, e = d0.bind(
      null,
      W,
      u,
      n,
      e
    ), u.dispatch = e, a.memoizedState = l, [t, e, !1];
  }
  function $o(l) {
    var t = Zl();
    return Fo(t, bl, l);
  }
  function Fo(l, t, e) {
    if (t = Uc(
      l,
      t,
      wo
    )[0], l = Xn(ae)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = Nu(t);
      } catch (i) {
        throw i === qa ? Rn : i;
      }
    else a = t;
    t = Zl();
    var u = t.queue, n = u.dispatch;
    return e !== t.memoizedState && (W.flags |= 2048, Qa(
      9,
      { destroy: void 0 },
      m0.bind(null, u, e),
      null
    )), [a, n, l];
  }
  function m0(l, t) {
    l.action = t;
  }
  function ko(l) {
    var t = Zl(), e = bl;
    if (e !== null)
      return Fo(t, e, l);
    Zl(), t = t.memoizedState, e = Zl();
    var a = e.queue.dispatch;
    return e.memoizedState = l, [t, a, !1];
  }
  function Qa(l, t, e, a) {
    return l = { tag: l, create: e, deps: a, inst: t, next: null }, t = W.updateQueue, t === null && (t = Yn(), W.updateQueue = t), e = t.lastEffect, e === null ? t.lastEffect = l.next = l : (a = e.next, e.next = l, l.next = a, t.lastEffect = l), l;
  }
  function Io() {
    return Zl().memoizedState;
  }
  function Qn(l, t, e, a) {
    var u = it();
    W.flags |= l, u.memoizedState = Qa(
      1 | t,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function Vn(l, t, e, a) {
    var u = Zl();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    bl !== null && a !== null && Ac(a, bl.memoizedState.deps) ? u.memoizedState = Qa(t, n, e, a) : (W.flags |= l, u.memoizedState = Qa(
      1 | t,
      n,
      e,
      a
    ));
  }
  function Po(l, t) {
    Qn(8390656, 8, l, t);
  }
  function Hc(l, t) {
    Vn(2048, 8, l, t);
  }
  function v0(l) {
    W.flags |= 4;
    var t = W.updateQueue;
    if (t === null)
      t = Yn(), W.updateQueue = t, t.events = [l];
    else {
      var e = t.events;
      e === null ? t.events = [l] : e.push(l);
    }
  }
  function lr(l) {
    var t = Zl().memoizedState;
    return v0({ ref: t, nextImpl: l }), function() {
      if ((ml & 2) !== 0) throw Error(o(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function tr(l, t) {
    return Vn(4, 2, l, t);
  }
  function er(l, t) {
    return Vn(4, 4, l, t);
  }
  function ar(l, t) {
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
  function ur(l, t, e) {
    e = e != null ? e.concat([l]) : null, Vn(4, 4, ar.bind(null, t, l), e);
  }
  function qc() {
  }
  function nr(l, t) {
    var e = Zl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    return t !== null && Ac(t, a[1]) ? a[0] : (e.memoizedState = [l, t], l);
  }
  function ir(l, t) {
    var e = Zl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    if (t !== null && Ac(t, a[1]))
      return a[0];
    if (a = l(), sa) {
      ge(!0);
      try {
        l();
      } finally {
        ge(!1);
      }
    }
    return e.memoizedState = [a, t], a;
  }
  function Bc(l, t, e) {
    return e === void 0 || (ee & 1073741824) !== 0 && (al & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = e, l = cd(), W.lanes |= l, Ue |= l, e);
  }
  function cr(l, t, e, a) {
    return _t(e, t) ? e : Ya.current !== null ? (l = Bc(l, e, a), _t(l, t) || (Jl = !0), l) : (ee & 42) === 0 || (ee & 1073741824) !== 0 && (al & 261930) === 0 ? (Jl = !0, l.memoizedState = e) : (l = cd(), W.lanes |= l, Ue |= l, t);
  }
  function fr(l, t, e, a, u) {
    var n = U.p;
    U.p = n !== 0 && 8 > n ? n : 8;
    var i = E.T, c = {};
    E.T = c, Xc(l, !1, t, e);
    try {
      var s = u(), h = E.S;
      if (h !== null && h(c, s), s !== null && typeof s == "object" && typeof s.then == "function") {
        var T = s0(
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
      U.p = n, i !== null && c.types !== null && (i.types = c.types), E.T = i;
    }
  }
  function h0() {
  }
  function Yc(l, t, e, a) {
    if (l.tag !== 5) throw Error(o(476));
    var u = sr(l).queue;
    fr(
      l,
      u,
      t,
      Q,
      e === null ? h0 : function() {
        return or(l), e(a);
      }
    );
  }
  function sr(l) {
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
  function or(l) {
    var t = sr(l);
    t.next === null && (t = l.alternate.memoizedState), Mu(
      l,
      t.next.queue,
      {},
      Dt()
    );
  }
  function Gc() {
    return lt(Ju);
  }
  function rr() {
    return Zl().memoizedState;
  }
  function dr() {
    return Zl().memoizedState;
  }
  function y0(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var e = Dt();
          l = Ae(e);
          var a = Oe(t, l, e);
          a !== null && (yt(a, t, e), zu(a, t, e)), t = { cache: vc() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function g0(l, t, e) {
    var a = Dt();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Zn(l) ? vr(t, e) : (e = ac(l, t, e, a), e !== null && (yt(e, l, a), hr(e, t, a)));
  }
  function mr(l, t, e) {
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
    if (Zn(l)) vr(t, u);
    else {
      var n = l.alternate;
      if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null))
        try {
          var i = t.lastRenderedState, c = n(i, e);
          if (u.hasEagerState = !0, u.eagerState = c, _t(c, i))
            return pn(l, t, u, 0), Tl === null && Tn(), !1;
        } catch {
        } finally {
        }
      if (e = ac(l, t, u, a), e !== null)
        return yt(e, l, a), hr(e, t, a), !0;
    }
    return !1;
  }
  function Xc(l, t, e, a) {
    if (a = {
      lane: 2,
      revertLane: bf(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Zn(l)) {
      if (t) throw Error(o(479));
    } else
      t = ac(
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
  function vr(l, t) {
    Ga = qn = !0;
    var e = l.pending;
    e === null ? t.next = t : (t.next = e.next, e.next = t), l.pending = t;
  }
  function hr(l, t, e) {
    if ((e & 4194048) !== 0) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, bs(l, e);
    }
  }
  var Ru = {
    readContext: lt,
    use: Gn,
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
  Ru.useEffectEvent = jl;
  var yr = {
    readContext: lt,
    use: Gn,
    useCallback: function(l, t) {
      return it().memoizedState = [
        l,
        t === void 0 ? null : t
      ], l;
    },
    useContext: lt,
    useEffect: Po,
    useImperativeHandle: function(l, t, e) {
      e = e != null ? e.concat([l]) : null, Qn(
        4194308,
        4,
        ar.bind(null, t, l),
        e
      );
    },
    useLayoutEffect: function(l, t) {
      return Qn(4194308, 4, l, t);
    },
    useInsertionEffect: function(l, t) {
      Qn(4, 2, l, t);
    },
    useMemo: function(l, t) {
      var e = it();
      t = t === void 0 ? null : t;
      var a = l();
      if (sa) {
        ge(!0);
        try {
          l();
        } finally {
          ge(!1);
        }
      }
      return e.memoizedState = [a, t], a;
    },
    useReducer: function(l, t, e) {
      var a = it();
      if (e !== void 0) {
        var u = e(t);
        if (sa) {
          ge(!0);
          try {
            e(t);
          } finally {
            ge(!1);
          }
        }
      } else u = t;
      return a.memoizedState = a.baseState = u, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: u
      }, a.queue = l, l = l.dispatch = g0.bind(
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
      l = jc(l);
      var t = l.queue, e = mr.bind(null, W, t);
      return t.dispatch = e, [l.memoizedState, e];
    },
    useDebugValue: qc,
    useDeferredValue: function(l, t) {
      var e = it();
      return Bc(e, l, t);
    },
    useTransition: function() {
      var l = jc(!1);
      return l = fr.bind(
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
        if (e = t(), Tl === null)
          throw Error(o(349));
        (al & 127) !== 0 || Bo(a, t, e);
      }
      u.memoizedState = e;
      var n = { value: e, getSnapshot: t };
      return u.queue = n, Po(Go.bind(null, a, n, l), [
        l
      ]), a.flags |= 2048, Qa(
        9,
        { destroy: void 0 },
        Yo.bind(
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
      if (il) {
        var e = Zt, a = Vt;
        e = (a & ~(1 << 32 - Et(a) - 1)).toString(32) + e, t = "_" + t + "R_" + e, e = Bn++, 0 < e && (t += "H" + e.toString(32)), t += "_";
      } else
        e = o0++, t = "_" + t + "r_" + e.toString(32) + "_";
      return l.memoizedState = t;
    },
    useHostTransitionStatus: Gc,
    useFormState: Wo,
    useActionState: Wo,
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
      return t.queue = e, t = Xc.bind(
        null,
        W,
        !0,
        e
      ), e.dispatch = t, [l, t];
    },
    useMemoCache: Rc,
    useCacheRefresh: function() {
      return it().memoizedState = y0.bind(
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
  }, Qc = {
    readContext: lt,
    use: Gn,
    useCallback: nr,
    useContext: lt,
    useEffect: Hc,
    useImperativeHandle: ur,
    useInsertionEffect: tr,
    useLayoutEffect: er,
    useMemo: ir,
    useReducer: Xn,
    useRef: Io,
    useState: function() {
      return Xn(ae);
    },
    useDebugValue: qc,
    useDeferredValue: function(l, t) {
      var e = Zl();
      return cr(
        e,
        bl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = Xn(ae)[0], t = Zl().memoizedState;
      return [
        typeof l == "boolean" ? l : Nu(l),
        t
      ];
    },
    useSyncExternalStore: qo,
    useId: rr,
    useHostTransitionStatus: Gc,
    useFormState: $o,
    useActionState: $o,
    useOptimistic: function(l, t) {
      var e = Zl();
      return Vo(e, bl, l, t);
    },
    useMemoCache: Rc,
    useCacheRefresh: dr
  };
  Qc.useEffectEvent = lr;
  var gr = {
    readContext: lt,
    use: Gn,
    useCallback: nr,
    useContext: lt,
    useEffect: Hc,
    useImperativeHandle: ur,
    useInsertionEffect: tr,
    useLayoutEffect: er,
    useMemo: ir,
    useReducer: xc,
    useRef: Io,
    useState: function() {
      return xc(ae);
    },
    useDebugValue: qc,
    useDeferredValue: function(l, t) {
      var e = Zl();
      return bl === null ? Bc(e, l, t) : cr(
        e,
        bl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = xc(ae)[0], t = Zl().memoizedState;
      return [
        typeof l == "boolean" ? l : Nu(l),
        t
      ];
    },
    useSyncExternalStore: qo,
    useId: rr,
    useHostTransitionStatus: Gc,
    useFormState: ko,
    useActionState: ko,
    useOptimistic: function(l, t) {
      var e = Zl();
      return bl !== null ? Vo(e, bl, l, t) : (e.baseState = l, [l, e.queue.dispatch]);
    },
    useMemoCache: Rc,
    useCacheRefresh: dr
  };
  gr.useEffectEvent = lr;
  function Vc(l, t, e, a) {
    t = l.memoizedState, e = e(a, t), e = e == null ? t : D({}, t, e), l.memoizedState = e, l.lanes === 0 && (l.updateQueue.baseState = e);
  }
  var Zc = {
    enqueueSetState: function(l, t, e) {
      l = l._reactInternals;
      var a = Dt(), u = Ae(a);
      u.payload = t, e != null && (u.callback = e), t = Oe(l, u, a), t !== null && (yt(t, l, a), zu(t, l, a));
    },
    enqueueReplaceState: function(l, t, e) {
      l = l._reactInternals;
      var a = Dt(), u = Ae(a);
      u.tag = 1, u.payload = t, e != null && (u.callback = e), t = Oe(l, u, a), t !== null && (yt(t, l, a), zu(t, l, a));
    },
    enqueueForceUpdate: function(l, t) {
      l = l._reactInternals;
      var e = Dt(), a = Ae(e);
      a.tag = 2, t != null && (a.callback = t), t = Oe(l, a, e), t !== null && (yt(t, l, e), zu(t, l, e));
    }
  };
  function Sr(l, t, e, a, u, n, i) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, n, i) : t.prototype && t.prototype.isPureReactComponent ? !yu(e, a) || !yu(u, n) : !0;
  }
  function br(l, t, e, a) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(e, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(e, a), t.state !== l && Zc.enqueueReplaceState(t, t.state, null);
  }
  function oa(l, t) {
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
  function Er(l) {
    _n(l);
  }
  function _r(l) {
    console.error(l);
  }
  function Tr(l) {
    _n(l);
  }
  function Ln(l, t) {
    try {
      var e = l.onUncaughtError;
      e(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function pr(l, t, e) {
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
  function Lc(l, t, e) {
    return e = Ae(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      Ln(l, t);
    }, e;
  }
  function zr(l) {
    return l = Ae(l), l.tag = 3, l;
  }
  function Ar(l, t, e, a) {
    var u = e.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = a.value;
      l.payload = function() {
        return u(n);
      }, l.callback = function() {
        pr(t, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (l.callback = function() {
      pr(t, e, a), typeof u != "function" && (xe === null ? xe = /* @__PURE__ */ new Set([this]) : xe.add(this));
      var c = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: c !== null ? c : ""
      });
    });
  }
  function S0(l, t, e, a, u) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = e.alternate, t !== null && ja(
        t,
        e,
        u,
        !0
      ), e = pt.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return qt === null ? ei() : e.alternate === null && Cl === 0 && (Cl = 3), e.flags &= -257, e.flags |= 65536, e.lanes = u, a === Un ? e.flags |= 16384 : (t = e.updateQueue, t === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), yf(l, a, u)), !1;
          case 22:
            return e.flags |= 65536, a === Un ? e.flags |= 16384 : (t = e.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = t) : (e = t.retryQueue, e === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), yf(l, a, u)), !1;
        }
        throw Error(o(435, e.tag));
      }
      return yf(l, a, u), ei(), !1;
    }
    if (il)
      return t = pt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, a !== sc && (l = Error(o(422), { cause: a }), bu(xt(l, e)))) : (a !== sc && (t = Error(o(423), {
        cause: a
      }), bu(
        xt(t, e)
      )), l = l.current.alternate, l.flags |= 65536, u &= -u, l.lanes |= u, a = xt(a, e), u = Lc(
        l.stateNode,
        a,
        u
      ), Ec(l, u), Cl !== 4 && (Cl = 2)), !1;
    var n = Error(o(520), { cause: a });
    if (n = xt(n, e), Yu === null ? Yu = [n] : Yu.push(n), Cl !== 4 && (Cl = 2), t === null) return !0;
    a = xt(a, e), e = t;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, l = u & -u, e.lanes |= l, l = Lc(e.stateNode, a, l), Ec(e, l), !1;
        case 1:
          if (t = e.type, n = e.stateNode, (e.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (xe === null || !xe.has(n))))
            return e.flags |= 65536, u &= -u, e.lanes |= u, u = zr(u), Ar(
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
  var Kc = Error(o(461)), Jl = !1;
  function tt(l, t, e, a) {
    t.child = l === null ? Mo(t, null, e, a) : fa(
      t,
      l.child,
      e,
      a
    );
  }
  function Or(l, t, e, a, u) {
    e = e.render;
    var n = t.ref;
    if ("ref" in a) {
      var i = {};
      for (var c in a)
        c !== "ref" && (i[c] = a[c]);
    } else i = a;
    return ua(t), a = Oc(
      l,
      t,
      e,
      i,
      n,
      u
    ), c = Dc(), l !== null && !Jl ? (Nc(l, t, u), ue(l, t, u)) : (il && c && cc(t), t.flags |= 1, tt(l, t, a, u), t.child);
  }
  function Dr(l, t, e, a, u) {
    if (l === null) {
      var n = e.type;
      return typeof n == "function" && !uc(n) && n.defaultProps === void 0 && e.compare === null ? (t.tag = 15, t.type = n, Nr(
        l,
        t,
        n,
        a,
        u
      )) : (l = An(
        e.type,
        null,
        a,
        t,
        t.mode,
        u
      ), l.ref = t.ref, l.return = t, t.child = l);
    }
    if (n = l.child, !Pc(l, u)) {
      var i = n.memoizedProps;
      if (e = e.compare, e = e !== null ? e : yu, e(i, a) && l.ref === t.ref)
        return ue(l, t, u);
    }
    return t.flags |= 1, l = It(n, a), l.ref = t.ref, l.return = t, t.child = l;
  }
  function Nr(l, t, e, a, u) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (yu(n, a) && l.ref === t.ref)
        if (Jl = !1, t.pendingProps = a = n, Pc(l, u))
          (l.flags & 131072) !== 0 && (Jl = !0);
        else
          return t.lanes = l.lanes, ue(l, t, u);
    }
    return Jc(
      l,
      t,
      e,
      a,
      u
    );
  }
  function Mr(l, t, e, a) {
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
        return Rr(
          l,
          t,
          n,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && Mn(
          t,
          n !== null ? n.cachePool : null
        ), n !== null ? xo(t, n) : Tc(), jo(t);
      else
        return a = t.lanes = 536870912, Rr(
          l,
          t,
          n !== null ? n.baseLanes | e : e,
          e,
          a
        );
    } else
      n !== null ? (Mn(t, n.cachePool), xo(t, n), Ne(), t.memoizedState = null) : (l !== null && Mn(t, null), Tc(), Ne());
    return tt(l, t, u, e), t.child;
  }
  function Uu(l, t) {
    return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Rr(l, t, e, a, u) {
    var n = yc();
    return n = n === null ? null : { parent: Ll._currentValue, pool: n }, t.memoizedState = {
      baseLanes: e,
      cachePool: n
    }, l !== null && Mn(t, null), Tc(), jo(t), l !== null && ja(l, t, a, !0), t.childLanes = u, null;
  }
  function Kn(l, t) {
    return t = wn(
      { mode: t.mode, children: t.children },
      l.mode
    ), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function Ur(l, t, e) {
    return fa(t, l.child, null, e), l = Kn(t, t.pendingProps), l.flags |= 2, zt(t), t.memoizedState = null, l;
  }
  function b0(l, t, e) {
    var a = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (il) {
        if (a.mode === "hidden")
          return l = Kn(t, a), t.lanes = 536870912, Uu(null, l);
        if (zc(t), (l = Dl) ? (l = Zd(
          l,
          Ht
        ), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: Ee !== null ? { id: Vt, overflow: Zt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = vo(l), e.return = t, t.child = e, Pl = t, Dl = null)) : l = null, l === null) throw Te(t);
        return t.lanes = 536870912, null;
      }
      return Kn(t, a);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var i = n.dehydrated;
      if (zc(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = Ur(
            l,
            t,
            e
          );
        else if (t.memoizedState !== null)
          t.child = l.child, t.flags |= 128, t = null;
        else throw Error(o(558));
      else if (Jl || ja(l, t, e, !1), u = (e & l.childLanes) !== 0, Jl || u) {
        if (a = Tl, a !== null && (i = Es(a, e), i !== 0 && i !== n.retryLane))
          throw n.retryLane = i, la(l, i), yt(a, l, i), Kc;
        ei(), t = Ur(
          l,
          t,
          e
        );
      } else
        l = n.treeContext, Dl = Bt(i.nextSibling), Pl = t, il = !0, _e = null, Ht = !1, l !== null && go(t, l), t = Kn(t, a), t.flags |= 4096;
      return t;
    }
    return l = It(l.child, {
      mode: a.mode,
      children: a.children
    }), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function Jn(l, t) {
    var e = t.ref;
    if (e === null)
      l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(o(284));
      (l === null || l.ref !== e) && (t.flags |= 4194816);
    }
  }
  function Jc(l, t, e, a, u) {
    return ua(t), e = Oc(
      l,
      t,
      e,
      a,
      void 0,
      u
    ), a = Dc(), l !== null && !Jl ? (Nc(l, t, u), ue(l, t, u)) : (il && a && cc(t), t.flags |= 1, tt(l, t, e, u), t.child);
  }
  function xr(l, t, e, a, u, n) {
    return ua(t), t.updateQueue = null, e = Ho(
      t,
      a,
      e,
      u
    ), Co(l), a = Dc(), l !== null && !Jl ? (Nc(l, t, n), ue(l, t, n)) : (il && a && cc(t), t.flags |= 1, tt(l, t, e, n), t.child);
  }
  function jr(l, t, e, a, u) {
    if (ua(t), t.stateNode === null) {
      var n = Ma, i = e.contextType;
      typeof i == "object" && i !== null && (n = lt(i)), n = new e(a, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = Zc, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = a, n.state = t.memoizedState, n.refs = {}, Sc(t), i = e.contextType, n.context = typeof i == "object" && i !== null ? lt(i) : Ma, n.state = t.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (Vc(
        t,
        e,
        i,
        a
      ), n.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (i = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), i !== n.state && Zc.enqueueReplaceState(n, n.state, null), Ou(t, a, n, u), Au(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (l === null) {
      n = t.stateNode;
      var c = t.memoizedProps, s = oa(e, c);
      n.props = s;
      var h = n.context, T = e.contextType;
      i = Ma, typeof T == "object" && T !== null && (i = lt(T));
      var O = e.getDerivedStateFromProps;
      T = typeof O == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = t.pendingProps !== c, T || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || h !== i) && br(
        t,
        n,
        a,
        i
      ), ze = !1;
      var y = t.memoizedState;
      n.state = y, Ou(t, a, n, u), Au(), h = t.memoizedState, c || y !== h || ze ? (typeof O == "function" && (Vc(
        t,
        e,
        O,
        a
      ), h = t.memoizedState), (s = ze || Sr(
        t,
        e,
        s,
        a,
        y,
        h,
        i
      )) ? (T || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = h), n.props = a, n.state = h, n.context = i, a = s) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      n = t.stateNode, bc(l, t), i = t.memoizedProps, T = oa(e, i), n.props = T, O = t.pendingProps, y = n.context, h = e.contextType, s = Ma, typeof h == "object" && h !== null && (s = lt(h)), c = e.getDerivedStateFromProps, (h = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i !== O || y !== s) && br(
        t,
        n,
        a,
        s
      ), ze = !1, y = t.memoizedState, n.state = y, Ou(t, a, n, u), Au();
      var S = t.memoizedState;
      i !== O || y !== S || ze || l !== null && l.dependencies !== null && Dn(l.dependencies) ? (typeof c == "function" && (Vc(
        t,
        e,
        c,
        a
      ), S = t.memoizedState), (T = ze || Sr(
        t,
        e,
        T,
        a,
        y,
        S,
        s
      ) || l !== null && l.dependencies !== null && Dn(l.dependencies)) ? (h || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, S, s), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        a,
        S,
        s
      )), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || i === l.memoizedProps && y === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && y === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = S), n.props = a, n.state = S, n.context = s, a = T) : (typeof n.componentDidUpdate != "function" || i === l.memoizedProps && y === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && y === l.memoizedState || (t.flags |= 1024), a = !1);
    }
    return n = a, Jn(l, t), a = (t.flags & 128) !== 0, n || a ? (n = t.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && a ? (t.child = fa(
      t,
      l.child,
      null,
      u
    ), t.child = fa(
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
  function Cr(l, t, e, a) {
    return ea(), t.flags |= 256, tt(l, t, e, a), t.child;
  }
  var wc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Wc(l) {
    return { baseLanes: l, cachePool: po() };
  }
  function $c(l, t, e) {
    return l = l !== null ? l.childLanes & ~e : 0, t && (l |= Ot), l;
  }
  function Hr(l, t, e) {
    var a = t.pendingProps, u = !1, n = (t.flags & 128) !== 0, i;
    if ((i = n) || (i = l !== null && l.memoizedState === null ? !1 : (Vl.current & 2) !== 0), i && (u = !0, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (il) {
        if (u ? De(t) : Ne(), (l = Dl) ? (l = Zd(
          l,
          Ht
        ), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: Ee !== null ? { id: Vt, overflow: Zt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = vo(l), e.return = t, t.child = e, Pl = t, Dl = null)) : l = null, l === null) throw Te(t);
        return xf(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var c = a.children;
      return a = a.fallback, u ? (Ne(), u = t.mode, c = wn(
        { mode: "hidden", children: c },
        u
      ), a = ta(
        a,
        u,
        e,
        null
      ), c.return = t, a.return = t, c.sibling = a, t.child = c, a = t.child, a.memoizedState = Wc(e), a.childLanes = $c(
        l,
        i,
        e
      ), t.memoizedState = wc, Uu(null, a)) : (De(t), Fc(t, c));
    }
    var s = l.memoizedState;
    if (s !== null && (c = s.dehydrated, c !== null)) {
      if (n)
        t.flags & 256 ? (De(t), t.flags &= -257, t = kc(
          l,
          t,
          e
        )) : t.memoizedState !== null ? (Ne(), t.child = l.child, t.flags |= 128, t = null) : (Ne(), c = a.fallback, u = t.mode, a = wn(
          { mode: "visible", children: a.children },
          u
        ), c = ta(
          c,
          u,
          e,
          null
        ), c.flags |= 2, a.return = t, c.return = t, a.sibling = c, t.child = a, fa(
          t,
          l.child,
          null,
          e
        ), a = t.child, a.memoizedState = Wc(e), a.childLanes = $c(
          l,
          i,
          e
        ), t.memoizedState = wc, t = Uu(null, a));
      else if (De(t), xf(c)) {
        if (i = c.nextSibling && c.nextSibling.dataset, i) var h = i.dgst;
        i = h, a = Error(o(419)), a.stack = "", a.digest = i, bu({ value: a, source: null, stack: null }), t = kc(
          l,
          t,
          e
        );
      } else if (Jl || ja(l, t, e, !1), i = (e & l.childLanes) !== 0, Jl || i) {
        if (i = Tl, i !== null && (a = Es(i, e), a !== 0 && a !== s.retryLane))
          throw s.retryLane = a, la(l, a), yt(i, l, a), Kc;
        Uf(c) || ei(), t = kc(
          l,
          t,
          e
        );
      } else
        Uf(c) ? (t.flags |= 192, t.child = l.child, t = null) : (l = s.treeContext, Dl = Bt(
          c.nextSibling
        ), Pl = t, il = !0, _e = null, Ht = !1, l !== null && go(t, l), t = Fc(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (Ne(), c = a.fallback, u = t.mode, s = l.child, h = s.sibling, a = It(s, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = s.subtreeFlags & 65011712, h !== null ? c = It(
      h,
      c
    ) : (c = ta(
      c,
      u,
      e,
      null
    ), c.flags |= 2), c.return = t, a.return = t, a.sibling = c, t.child = a, Uu(null, a), a = t.child, c = l.child.memoizedState, c === null ? c = Wc(e) : (u = c.cachePool, u !== null ? (s = Ll._currentValue, u = u.parent !== s ? { parent: s, pool: s } : u) : u = po(), c = {
      baseLanes: c.baseLanes | e,
      cachePool: u
    }), a.memoizedState = c, a.childLanes = $c(
      l,
      i,
      e
    ), t.memoizedState = wc, Uu(l.child, a)) : (De(t), e = l.child, l = e.sibling, e = It(e, {
      mode: "visible",
      children: a.children
    }), e.return = t, e.sibling = null, l !== null && (i = t.deletions, i === null ? (t.deletions = [l], t.flags |= 16) : i.push(l)), t.child = e, t.memoizedState = null, e);
  }
  function Fc(l, t) {
    return t = wn(
      { mode: "visible", children: t },
      l.mode
    ), t.return = l, l.child = t;
  }
  function wn(l, t) {
    return l = Tt(22, l, null, t), l.lanes = 0, l;
  }
  function kc(l, t, e) {
    return fa(t, l.child, null, e), l = Fc(
      t,
      t.pendingProps.children
    ), l.flags |= 2, t.memoizedState = null, l;
  }
  function qr(l, t, e) {
    l.lanes |= t;
    var a = l.alternate;
    a !== null && (a.lanes |= t), dc(l.return, t, e);
  }
  function Ic(l, t, e, a, u, n) {
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
  function Br(l, t, e) {
    var a = t.pendingProps, u = a.revealOrder, n = a.tail;
    a = a.children;
    var i = Vl.current, c = (i & 2) !== 0;
    if (c ? (i = i & 1 | 2, t.flags |= 128) : i &= 1, M(Vl, i), tt(l, t, a, e), a = il ? Su : 0, !c && l !== null && (l.flags & 128) !== 0)
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && qr(l, e, t);
        else if (l.tag === 19)
          qr(l, e, t);
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
          l = e.alternate, l !== null && Hn(l) === null && (u = e), e = e.sibling;
        e = u, e === null ? (u = t.child, t.child = null) : (u = e.sibling, e.sibling = null), Ic(
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
          if (l = u.alternate, l !== null && Hn(l) === null) {
            t.child = u;
            break;
          }
          l = u.sibling, u.sibling = e, e = u, u = l;
        }
        Ic(
          t,
          !0,
          e,
          null,
          n,
          a
        );
        break;
      case "together":
        Ic(
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
    if (l !== null && (t.dependencies = l.dependencies), Ue |= t.lanes, (e & t.childLanes) === 0)
      if (l !== null) {
        if (ja(
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
  function Pc(l, t) {
    return (l.lanes & t) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && Dn(l)));
  }
  function E0(l, t, e) {
    switch (t.tag) {
      case 3:
        Xl(t, t.stateNode.containerInfo), pe(t, Ll, l.memoizedState.cache), ea();
        break;
      case 27:
      case 5:
        he(t);
        break;
      case 4:
        Xl(t, t.stateNode.containerInfo);
        break;
      case 10:
        pe(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, zc(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (De(t), t.flags |= 128, null) : (e & t.child.childLanes) !== 0 ? Hr(l, t, e) : (De(t), l = ue(
            l,
            t,
            e
          ), l !== null ? l.sibling : null);
        De(t);
        break;
      case 19:
        var u = (l.flags & 128) !== 0;
        if (a = (e & t.childLanes) !== 0, a || (ja(
          l,
          t,
          e,
          !1
        ), a = (e & t.childLanes) !== 0), u) {
          if (a)
            return Br(
              l,
              t,
              e
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), M(Vl, Vl.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, Mr(
          l,
          t,
          e,
          t.pendingProps
        );
      case 24:
        pe(t, Ll, l.memoizedState.cache);
    }
    return ue(l, t, e);
  }
  function Yr(l, t, e) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps)
        Jl = !0;
      else {
        if (!Pc(l, e) && (t.flags & 128) === 0)
          return Jl = !1, E0(
            l,
            t,
            e
          );
        Jl = (l.flags & 131072) !== 0;
      }
    else
      Jl = !1, il && (t.flags & 1048576) !== 0 && yo(t, Su, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (l = ia(t.elementType), t.type = l, typeof l == "function")
            uc(l) ? (a = oa(l, a), t.tag = 1, t = jr(
              null,
              t,
              l,
              a,
              e
            )) : (t.tag = 0, t = Jc(
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
                t.tag = 11, t = Or(
                  null,
                  t,
                  l,
                  a,
                  e
                );
                break l;
              } else if (u === L) {
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
        return Jc(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 1:
        return a = t.type, u = oa(
          a,
          t.pendingProps
        ), jr(
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
          u = n.element, bc(l, t), Ou(t, a, null, e);
          var i = t.memoizedState;
          if (a = i.cache, pe(t, Ll, a), a !== n.cache && mc(
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
              t = Cr(
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
              ), bu(u), t = Cr(
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
              for (Dl = Bt(l.firstChild), Pl = t, il = !0, _e = null, Ht = !0, e = Mo(
                t,
                null,
                a,
                e
              ), t.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
            }
          else {
            if (ea(), a === u) {
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
        return Jn(l, t), l === null ? (e = $d(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = e : il || (e = t.type, l = t.pendingProps, a = si(
          w.current
        ).createElement(e), a[Il] = t, a[ot] = l, et(a, e, l), Fl(a), t.stateNode = a) : t.memoizedState = $d(
          t.type,
          l.memoizedProps,
          t.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return he(t), l === null && il && (a = t.stateNode = Jd(
          t.type,
          t.pendingProps,
          w.current
        ), Pl = t, Ht = !0, u = Dl, qe(t.type) ? (jf = u, Dl = Bt(a.firstChild)) : Dl = u), tt(
          l,
          t,
          t.pendingProps.children,
          e
        ), Jn(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && il && ((u = a = Dl) && (a = F0(
          a,
          t.type,
          t.pendingProps,
          Ht
        ), a !== null ? (t.stateNode = a, Pl = t, Dl = Bt(a.firstChild), Ht = !1, u = !0) : u = !1), u || Te(t)), he(t), u = t.type, n = t.pendingProps, i = l !== null ? l.memoizedProps : null, a = n.children, Nf(u, n) ? a = null : i !== null && Nf(u, i) && (t.flags |= 32), t.memoizedState !== null && (u = Oc(
          l,
          t,
          r0,
          null,
          null,
          e
        ), Ju._currentValue = u), Jn(l, t), tt(l, t, a, e), t.child;
      case 6:
        return l === null && il && ((l = e = Dl) && (e = k0(
          e,
          t.pendingProps,
          Ht
        ), e !== null ? (t.stateNode = e, Pl = t, Dl = null, l = !0) : l = !1), l || Te(t)), null;
      case 13:
        return Hr(l, t, e);
      case 4:
        return Xl(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, l === null ? t.child = fa(
          t,
          null,
          a,
          e
        ) : tt(l, t, a, e), t.child;
      case 11:
        return Or(
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
        return a = t.pendingProps, pe(t, t.type, a.value), tt(l, t, a.children, e), t.child;
      case 9:
        return u = t.type._context, a = t.pendingProps.children, ua(t), u = lt(u), a = a(u), t.flags |= 1, tt(l, t, a, e), t.child;
      case 14:
        return Dr(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 15:
        return Nr(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 19:
        return Br(l, t, e);
      case 31:
        return b0(l, t, e);
      case 22:
        return Mr(
          l,
          t,
          e,
          t.pendingProps
        );
      case 24:
        return ua(t), a = lt(Ll), l === null ? (u = yc(), u === null && (u = Tl, n = vc(), u.pooledCache = n, n.refCount++, n !== null && (u.pooledCacheLanes |= e), u = n), t.memoizedState = { parent: a, cache: u }, Sc(t), pe(t, Ll, u)) : ((l.lanes & e) !== 0 && (bc(l, t), Ou(t, null, null, e), Au()), u = l.memoizedState, n = t.memoizedState, u.parent !== a ? (u = { parent: a, cache: a }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), pe(t, Ll, a)) : (a = n.cache, pe(t, Ll, a), a !== u.cache && mc(
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
  function ne(l) {
    l.flags |= 4;
  }
  function lf(l, t, e, a, u) {
    if ((t = (l.mode & 32) !== 0) && (t = !1), t) {
      if (l.flags |= 16777216, (u & 335544128) === u)
        if (l.stateNode.complete) l.flags |= 8192;
        else if (rd()) l.flags |= 8192;
        else
          throw ca = Un, gc;
    } else l.flags &= -16777217;
  }
  function Gr(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !lm(t))
      if (rd()) l.flags |= 8192;
      else
        throw ca = Un, gc;
  }
  function Wn(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? gs() : 536870912, l.lanes |= t, Ka |= t);
  }
  function xu(l, t) {
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
  function Nl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, e = 0, a = 0;
    if (t)
      for (var u = l.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags & 65011712, a |= u.flags & 65011712, u.return = l, u = u.sibling;
    else
      for (u = l.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags, a |= u.flags, u.return = l, u = u.sibling;
    return l.subtreeFlags |= a, l.childLanes = e, t;
  }
  function _0(l, t, e) {
    var a = t.pendingProps;
    switch (fc(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Nl(t), null;
      case 1:
        return Nl(t), null;
      case 3:
        return e = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), te(Ll), xl(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (l === null || l.child === null) && (xa(t) ? ne(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, oc())), Nl(t), null;
      case 26:
        var u = t.type, n = t.memoizedState;
        return l === null ? (ne(t), n !== null ? (Nl(t), Gr(t, n)) : (Nl(t), lf(
          t,
          u,
          null,
          a,
          e
        ))) : n ? n !== l.memoizedState ? (ne(t), Nl(t), Gr(t, n)) : (Nl(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== a && ne(t), Nl(t), lf(
          t,
          u,
          l,
          a,
          e
        )), null;
      case 27:
        if (Je(t), e = w.current, u = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && ne(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Nl(t), null;
          }
          l = H.current, xa(t) ? So(t) : (l = Jd(u, a, e), t.stateNode = l, ne(t));
        }
        return Nl(t), null;
      case 5:
        if (Je(t), u = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && ne(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Nl(t), null;
          }
          if (n = H.current, xa(t))
            So(t);
          else {
            var i = si(
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
        return Nl(t), lf(
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
          if (l = w.current, xa(t)) {
            if (l = t.stateNode, e = t.memoizedProps, a = null, u = Pl, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            l[Il] = t, l = !!(l.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || Hd(l.nodeValue, e)), l || Te(t, !0);
          } else
            l = si(l).createTextNode(
              a
            ), l[Il] = t, t.stateNode = l;
        }
        return Nl(t), null;
      case 31:
        if (e = t.memoizedState, l === null || l.memoizedState !== null) {
          if (a = xa(t), e !== null) {
            if (l === null) {
              if (!a) throw Error(o(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(557));
              l[Il] = t;
            } else
              ea(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Nl(t), l = !1;
          } else
            e = oc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), l = !0;
          if (!l)
            return t.flags & 256 ? (zt(t), t) : (zt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(o(558));
        }
        return Nl(t), null;
      case 13:
        if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (u = xa(t), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!u) throw Error(o(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(o(317));
              u[Il] = t;
            } else
              ea(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Nl(t), u = !1;
          } else
            u = oc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (zt(t), t) : (zt(t), null);
        }
        return zt(t), (t.flags & 128) !== 0 ? (t.lanes = e, t) : (e = a !== null, l = l !== null && l.memoizedState !== null, e && (a = t.child, u = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (u = a.alternate.memoizedState.cachePool.pool), n = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== u && (a.flags |= 2048)), e !== l && e && (t.child.flags |= 8192), Wn(t, t.updateQueue), Nl(t), null);
      case 4:
        return xl(), l === null && pf(t.stateNode.containerInfo), Nl(t), null;
      case 10:
        return te(t.type), Nl(t), null;
      case 19:
        if (A(Vl), a = t.memoizedState, a === null) return Nl(t), null;
        if (u = (t.flags & 128) !== 0, n = a.rendering, n === null)
          if (u) xu(a, !1);
          else {
            if (Cl !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = t.child; l !== null; ) {
                if (n = Hn(l), n !== null) {
                  for (t.flags |= 128, xu(a, !1), l = n.updateQueue, t.updateQueue = l, Wn(t, l), t.subtreeFlags = 0, l = e, e = t.child; e !== null; )
                    mo(e, l), e = e.sibling;
                  return M(
                    Vl,
                    Vl.current & 1 | 2
                  ), il && Pt(t, a.treeForkCount), t.child;
                }
                l = l.sibling;
              }
            a.tail !== null && Ol() > Pn && (t.flags |= 128, u = !0, xu(a, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (l = Hn(n), l !== null) {
              if (t.flags |= 128, u = !0, l = l.updateQueue, t.updateQueue = l, Wn(t, l), xu(a, !0), a.tail === null && a.tailMode === "hidden" && !n.alternate && !il)
                return Nl(t), null;
            } else
              2 * Ol() - a.renderingStartTime > Pn && e !== 536870912 && (t.flags |= 128, u = !0, xu(a, !1), t.lanes = 4194304);
          a.isBackwards ? (n.sibling = t.child, t.child = n) : (l = a.last, l !== null ? l.sibling = n : t.child = n, a.last = n);
        }
        return a.tail !== null ? (l = a.tail, a.rendering = l, a.tail = l.sibling, a.renderingStartTime = Ol(), l.sibling = null, e = Vl.current, M(
          Vl,
          u ? e & 1 | 2 : e & 1
        ), il && Pt(t, a.treeForkCount), l) : (Nl(t), null);
      case 22:
      case 23:
        return zt(t), pc(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (e & 536870912) !== 0 && (t.flags & 128) === 0 && (Nl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Nl(t), e = t.updateQueue, e !== null && Wn(t, e.retryQueue), e = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== e && (t.flags |= 2048), l !== null && A(na), null;
      case 24:
        return e = null, l !== null && (e = l.memoizedState.cache), t.memoizedState.cache !== e && (t.flags |= 2048), te(Ll), Nl(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function T0(l, t) {
    switch (fc(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return te(Ll), xl(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Je(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (zt(t), t.alternate === null)
            throw Error(o(340));
          ea();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (zt(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(o(340));
          ea();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return A(Vl), null;
      case 4:
        return xl(), null;
      case 10:
        return te(t.type), null;
      case 22:
      case 23:
        return zt(t), pc(), l !== null && A(na), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return te(Ll), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Xr(l, t) {
    switch (fc(t), t.tag) {
      case 3:
        te(Ll), xl();
        break;
      case 26:
      case 27:
      case 5:
        Je(t);
        break;
      case 4:
        xl();
        break;
      case 31:
        t.memoizedState !== null && zt(t);
        break;
      case 13:
        zt(t);
        break;
      case 19:
        A(Vl);
        break;
      case 10:
        te(t.type);
        break;
      case 22:
      case 23:
        zt(t), pc(), l !== null && A(na);
        break;
      case 24:
        te(Ll);
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
  function Qr(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var e = l.stateNode;
      try {
        Uo(t, e);
      } catch (a) {
        yl(l, l.return, a);
      }
    }
  }
  function Vr(l, t, e) {
    e.props = oa(
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
  function tf(l, t, e) {
    try {
      var a = l.stateNode;
      L0(a, l.type, e, t), a[ot] = t;
    } catch (u) {
      yl(l, l.return, u);
    }
  }
  function Lr(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && qe(l.type) || l.tag === 4;
  }
  function ef(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || Lr(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && qe(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function af(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(l, t) : (t = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, t.appendChild(l), e = e._reactRootContainer, e != null || t.onclick !== null || (t.onclick = Ft));
    else if (a !== 4 && (a === 27 && qe(l.type) && (e = l.stateNode, t = null), l = l.child, l !== null))
      for (af(l, t, e), l = l.sibling; l !== null; )
        af(l, t, e), l = l.sibling;
  }
  function $n(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? e.insertBefore(l, t) : e.appendChild(l);
    else if (a !== 4 && (a === 27 && qe(l.type) && (e = l.stateNode), l = l.child, l !== null))
      for ($n(l, t, e), l = l.sibling; l !== null; )
        $n(l, t, e), l = l.sibling;
  }
  function Kr(l) {
    var t = l.stateNode, e = l.memoizedProps;
    try {
      for (var a = l.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      et(t, a, e), t[Il] = l, t[ot] = e;
    } catch (n) {
      yl(l, l.return, n);
    }
  }
  var ie = !1, wl = !1, uf = !1, Jr = typeof WeakSet == "function" ? WeakSet : Set, kl = null;
  function p0(l, t) {
    if (l = l.containerInfo, Of = yi, l = ao(l), ki(l)) {
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
              for (var S; O !== e || u !== 0 && O.nodeType !== 3 || (c = i + u), O !== n || a !== 0 && O.nodeType !== 3 || (s = i + a), O.nodeType === 3 && (i += O.nodeValue.length), (S = O.firstChild) !== null; )
                y = O, O = S;
              for (; ; ) {
                if (O === l) break t;
                if (y === e && ++h === u && (c = i), y === n && ++T === a && (s = i), (S = O.nextSibling) !== null) break;
                O = y, y = O.parentNode;
              }
              O = S;
            }
            e = c === -1 || s === -1 ? null : { start: c, end: s };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (Df = { focusedElem: l, selectionRange: e }, yi = !1, kl = t; kl !== null; )
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
                  var q = oa(
                    e.type,
                    u
                  );
                  l = a.getSnapshotBeforeUpdate(
                    q,
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
                  Rf(l);
                else if (e === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Rf(l);
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
  function wr(l, t, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        fe(l, e), a & 4 && ju(5, e);
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
            var u = oa(
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
        a & 64 && Qr(e), a & 512 && Cu(e, e.return);
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
            Uo(l, t);
          } catch (i) {
            yl(e, e.return, i);
          }
        }
        break;
      case 27:
        t === null && a & 4 && Kr(e);
      case 26:
      case 5:
        fe(l, e), t === null && a & 4 && Zr(e), a & 512 && Cu(e, e.return);
        break;
      case 12:
        fe(l, e);
        break;
      case 31:
        fe(l, e), a & 4 && Fr(l, e);
        break;
      case 13:
        fe(l, e), a & 4 && kr(l, e), a & 64 && (l = e.memoizedState, l !== null && (l = l.dehydrated, l !== null && (e = x0.bind(
          null,
          e
        ), I0(l, e))));
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
  function Wr(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, Wr(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && Ci(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var Rl = null, dt = !1;
  function ce(l, t, e) {
    for (e = e.child; e !== null; )
      $r(l, t, e), e = e.sibling;
  }
  function $r(l, t, e) {
    if (bt && typeof bt.onCommitFiberUnmount == "function")
      try {
        bt.onCommitFiberUnmount(Wt, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        wl || Lt(e, t), ce(
          l,
          t,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        wl || Lt(e, t);
        var a = Rl, u = dt;
        qe(e.type) && (Rl = e.stateNode, dt = !1), ce(
          l,
          t,
          e
        ), Zu(e.stateNode), Rl = a, dt = u;
        break;
      case 5:
        wl || Lt(e, t);
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
        Rl !== null && (dt ? (l = Rl, Qd(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          e.stateNode
        ), Pa(l)) : Qd(Rl, e.stateNode));
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
        Me(2, e, t), wl || Me(4, e, t), ce(
          l,
          t,
          e
        );
        break;
      case 1:
        wl || (Lt(e, t), a = e.stateNode, typeof a.componentWillUnmount == "function" && Vr(
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
  function Fr(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        Pa(l);
      } catch (e) {
        yl(t, t.return, e);
      }
    }
  }
  function kr(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        Pa(l);
      } catch (e) {
        yl(t, t.return, e);
      }
  }
  function z0(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new Jr()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new Jr()), t;
      default:
        throw Error(o(435, l.tag));
    }
  }
  function Fn(l, t) {
    var e = z0(l);
    t.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var u = j0.bind(null, l, a);
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
              if (qe(c.type)) {
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
        $r(n, i, u), Rl = null, dt = !1, n = u.alternate, n !== null && (n.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Ir(t, l), t = t.sibling;
  }
  var Xt = null;
  function Ir(l, t) {
    var e = l.alternate, a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        mt(t, l), vt(l), a & 4 && (Me(3, l, l.return), ju(3, l), Me(5, l, l.return));
        break;
      case 1:
        mt(t, l), vt(l), a & 512 && (wl || e === null || Lt(e, e.return)), a & 64 && ie && (l = l.updateQueue, l !== null && (a = l.callbacks, a !== null && (e = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
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
                      n = u.getElementsByTagName("title")[0], (!n || n[cu] || n[Il] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = u.createElement(a), u.head.insertBefore(
                        n,
                        u.querySelector("head > title")
                      )), et(n, a, e), n[Il] = l, Fl(n), a = n;
                      break l;
                    case "link":
                      var i = Id(
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
                      if (i = Id(
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
                Pd(
                  u,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = kd(
                u,
                a,
                l.memoizedProps
              );
          else
            n !== a ? (n === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : n.count--, a === null ? Pd(
              u,
              l.type,
              l.stateNode
            ) : kd(
              u,
              a,
              l.memoizedProps
            )) : a === null && l.stateNode !== null && tf(
              l,
              l.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        mt(t, l), vt(l), a & 512 && (wl || e === null || Lt(e, e.return)), e !== null && a & 4 && tf(
          l,
          l.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (mt(t, l), vt(l), a & 512 && (wl || e === null || Lt(e, e.return)), l.flags & 32) {
          u = l.stateNode;
          try {
            Ta(u, "");
          } catch (q) {
            yl(l, l.return, q);
          }
        }
        a & 4 && l.stateNode != null && (u = l.memoizedProps, tf(
          l,
          u,
          e !== null ? e.memoizedProps : u
        )), a & 1024 && (uf = !0);
        break;
      case 6:
        if (mt(t, l), vt(l), a & 4) {
          if (l.stateNode === null)
            throw Error(o(162));
          a = l.memoizedProps, e = l.stateNode;
          try {
            e.nodeValue = a;
          } catch (q) {
            yl(l, l.return, q);
          }
        }
        break;
      case 3:
        if (di = null, u = Xt, Xt = oi(t.containerInfo), mt(t, l), Xt = u, vt(l), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            Pa(t.containerInfo);
          } catch (q) {
            yl(l, l.return, q);
          }
        uf && (uf = !1, Pr(l));
        break;
      case 4:
        a = Xt, Xt = oi(
          l.stateNode.containerInfo
        ), mt(t, l), vt(l), Xt = a;
        break;
      case 12:
        mt(t, l), vt(l);
        break;
      case 31:
        mt(t, l), vt(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, Fn(l, a)));
        break;
      case 13:
        mt(t, l), vt(l), l.child.flags & 8192 && l.memoizedState !== null != (e !== null && e.memoizedState !== null) && (In = Ol()), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, Fn(l, a)));
        break;
      case 22:
        u = l.memoizedState !== null;
        var s = e !== null && e.memoizedState !== null, h = ie, T = wl;
        if (ie = h || u, wl = T || s, mt(t, l), wl = T, ie = h, vt(l), a & 8192)
          l: for (t = l.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (e === null || s || ie || wl || ra(l)), e = null, t = l; ; ) {
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
                } catch (q) {
                  yl(s, s.return, q);
                }
              }
            } else if (t.tag === 6) {
              if (e === null) {
                s = t;
                try {
                  s.stateNode.nodeValue = u ? "" : s.memoizedProps;
                } catch (q) {
                  yl(s, s.return, q);
                }
              }
            } else if (t.tag === 18) {
              if (e === null) {
                s = t;
                try {
                  var S = s.stateNode;
                  u ? Vd(S, !0) : Vd(s.stateNode, !1);
                } catch (q) {
                  yl(s, s.return, q);
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
        a & 4 && (a = l.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, Fn(l, e))));
        break;
      case 19:
        mt(t, l), vt(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, Fn(l, a)));
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
          if (Lr(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(o(160));
        switch (e.tag) {
          case 27:
            var u = e.stateNode, n = ef(l);
            $n(l, n, u);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && (Ta(i, ""), e.flags &= -33);
            var c = ef(l);
            $n(l, c, i);
            break;
          case 3:
          case 4:
            var s = e.stateNode.containerInfo, h = ef(l);
            af(
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
  function Pr(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        Pr(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
      }
  }
  function fe(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        wr(l, t.alternate, t), t = t.sibling;
  }
  function ra(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Me(4, t, t.return), ra(t);
          break;
        case 1:
          Lt(t, t.return);
          var e = t.stateNode;
          typeof e.componentWillUnmount == "function" && Vr(
            t,
            t.return,
            e
          ), ra(t);
          break;
        case 27:
          Zu(t.stateNode);
        case 26:
        case 5:
          Lt(t, t.return), ra(t);
          break;
        case 22:
          t.memoizedState === null && ra(t);
          break;
        case 30:
          ra(t);
          break;
        default:
          ra(t);
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
          ), ju(4, n);
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
                  Ro(s[u], c);
            } catch (h) {
              yl(a, a.return, h);
            }
          }
          e && i & 64 && Qr(n), Cu(n, n.return);
          break;
        case 27:
          Kr(n);
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
          ), e && i & 4 && Fr(u, n);
          break;
        case 13:
          se(
            u,
            n,
            e
          ), e && i & 4 && kr(u, n);
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
  function nf(l, t) {
    var e = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== e && (l != null && l.refCount++, e != null && Eu(e));
  }
  function cf(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Eu(l));
  }
  function Qt(l, t, e, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        ld(
          l,
          t,
          e,
          a
        ), t = t.sibling;
  }
  function ld(l, t, e, a) {
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
        ), u & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Eu(l)));
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
        ) : Hu(l, t) : n._visibility & 2 ? Qt(
          l,
          t,
          e,
          a
        ) : (n._visibility |= 2, Va(
          l,
          t,
          e,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && nf(i, t);
        break;
      case 24:
        Qt(
          l,
          t,
          e,
          a
        ), u & 2048 && cf(t.alternate, t);
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
  function Va(l, t, e, a, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var n = l, i = t, c = e, s = a, h = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Va(
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
          var T = i.stateNode;
          i.memoizedState !== null ? T._visibility & 2 ? Va(
            n,
            i,
            c,
            s,
            u
          ) : Hu(
            n,
            i
          ) : (T._visibility |= 2, Va(
            n,
            i,
            c,
            s,
            u
          )), u && h & 2048 && nf(
            i.alternate,
            i
          );
          break;
        case 24:
          Va(
            n,
            i,
            c,
            s,
            u
          ), u && h & 2048 && cf(i.alternate, i);
          break;
        default:
          Va(
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
            Hu(e, a), u & 2048 && nf(
              a.alternate,
              a
            );
            break;
          case 24:
            Hu(e, a), u & 2048 && cf(a.alternate, a);
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
        td(
          l,
          t,
          e
        ), l = l.sibling;
  }
  function td(l, t, e) {
    switch (l.tag) {
      case 26:
        Za(
          l,
          t,
          e
        ), l.flags & qu && l.memoizedState !== null && oh(
          e,
          Xt,
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
        var a = Xt;
        Xt = oi(l.stateNode.containerInfo), Za(
          l,
          t,
          e
        ), Xt = a;
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
  function ed(l) {
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
          kl = a, ud(
            a,
            l
          );
        }
      ed(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        ad(l), l = l.sibling;
  }
  function ad(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Bu(l), l.flags & 2048 && Me(9, l, l.return);
        break;
      case 3:
        Bu(l);
        break;
      case 12:
        Bu(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, kn(l)) : Bu(l);
        break;
      default:
        Bu(l);
    }
  }
  function kn(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          kl = a, ud(
            a,
            l
          );
        }
      ed(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          Me(8, t, t.return), kn(t);
          break;
        case 22:
          e = t.stateNode, e._visibility & 2 && (e._visibility &= -3, kn(t));
          break;
        default:
          kn(t);
      }
      l = l.sibling;
    }
  }
  function ud(l, t) {
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
          Eu(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, kl = a;
      else
        l: for (e = l; kl !== null; ) {
          a = kl;
          var u = a.sibling, n = a.return;
          if (Wr(a), a === e) {
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
  var A0 = {
    getCacheForType: function(l) {
      var t = lt(Ll), e = t.data.get(l);
      return e === void 0 && (e = l(), t.data.set(l, e)), e;
    },
    cacheSignal: function() {
      return lt(Ll).controller.signal;
    }
  }, O0 = typeof WeakMap == "function" ? WeakMap : Map, ml = 0, Tl = null, ll = null, al = 0, hl = 0, At = null, Re = !1, La = !1, ff = !1, oe = 0, Cl = 0, Ue = 0, da = 0, sf = 0, Ot = 0, Ka = 0, Yu = null, ht = null, of = !1, In = 0, nd = 0, Pn = 1 / 0, li = null, xe = null, Wl = 0, je = null, Ja = null, re = 0, rf = 0, df = null, id = null, Gu = 0, mf = null;
  function Dt() {
    return (ml & 2) !== 0 && al !== 0 ? al & -al : E.T !== null ? bf() : _s();
  }
  function cd() {
    if (Ot === 0)
      if ((al & 536870912) === 0 || il) {
        var l = fn;
        fn <<= 1, (fn & 3932160) === 0 && (fn = 262144), Ot = l;
      } else Ot = 536870912;
    return l = pt.current, l !== null && (l.flags |= 32), Ot;
  }
  function yt(l, t, e) {
    (l === Tl && (hl === 2 || hl === 9) || l.cancelPendingCommit !== null) && (wa(l, 0), Ce(
      l,
      al,
      Ot,
      !1
    )), iu(l, e), ((ml & 2) === 0 || l !== Tl) && (l === Tl && ((ml & 2) === 0 && (da |= e), Cl === 4 && Ce(
      l,
      al,
      Ot,
      !1
    )), Kt(l));
  }
  function fd(l, t, e) {
    if ((ml & 6) !== 0) throw Error(o(327));
    var a = !e && (t & 127) === 0 && (t & l.expiredLanes) === 0 || nu(l, t), u = a ? M0(l, t) : hf(l, t, !0), n = a;
    do {
      if (u === 0) {
        La && !a && Ce(l, t, 0, !1);
        break;
      } else {
        if (e = l.current.alternate, n && !D0(e)) {
          u = hf(l, t, !1), n = !1;
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
              if (s && (wa(c, i).flags |= 256), i = hf(
                c,
                i,
                !1
              ), i !== 2) {
                if (ff && !s) {
                  c.errorRecoveryDisabledLanes |= n, da |= n, u = 4;
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
          wa(l, 0), Ce(l, t, 0, !0);
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
              Ce(
                a,
                t,
                Ot,
                !Re
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
          if ((t & 62914560) === t && (u = In + 300 - Ol(), 10 < u)) {
            if (Ce(
              a,
              t,
              Ot,
              !Re
            ), on(a, 0, !0) !== 0) break l;
            re = t, a.timeoutHandle = Gd(
              sd.bind(
                null,
                a,
                e,
                ht,
                li,
                of,
                t,
                Ot,
                da,
                Ka,
                Re,
                n,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break l;
          }
          sd(
            a,
            e,
            ht,
            li,
            of,
            t,
            Ot,
            da,
            Ka,
            Re,
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
  function sd(l, t, e, a, u, n, i, c, s, h, T, O, y, S) {
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
      }, td(
        t,
        n,
        O
      );
      var q = (n & 62914560) === n ? In - Ol() : (n & 4194048) === n ? nd - Ol() : 0;
      if (q = rh(
        O,
        q
      ), q !== null) {
        re = n, l.cancelPendingCommit = q(
          gd.bind(
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
            S
          )
        ), Ce(l, n, i, !h);
        return;
      }
    }
    gd(
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
  function D0(l) {
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
    t &= ~sf, t &= ~da, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
    for (var u = t; 0 < u; ) {
      var n = 31 - Et(u), i = 1 << n;
      a[n] = -1, u &= ~i;
    }
    e !== 0 && Ss(l, e, t);
  }
  function ti() {
    return (ml & 6) === 0 ? (Xu(0), !1) : !0;
  }
  function vf() {
    if (ll !== null) {
      if (hl === 0)
        var l = ll.return;
      else
        l = ll, le = aa = null, Mc(l), Ba = null, Tu = 0, l = ll;
      for (; l !== null; )
        Xr(l.alternate, l), l = l.return;
      ll = null;
    }
  }
  function wa(l, t) {
    var e = l.timeoutHandle;
    e !== -1 && (l.timeoutHandle = -1, w0(e)), e = l.cancelPendingCommit, e !== null && (l.cancelPendingCommit = null, e()), re = 0, vf(), Tl = l, ll = e = It(l.current, null), al = t, hl = 0, At = null, Re = !1, La = nu(l, t), ff = !1, Ka = Ot = sf = da = Ue = Cl = 0, ht = Yu = null, of = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = l.entangledLanes;
    if (a !== 0)
      for (l = l.entanglements, a &= t; 0 < a; ) {
        var u = 31 - Et(a), n = 1 << u;
        t |= l[u], a &= ~n;
      }
    return oe = t, Tn(), e;
  }
  function od(l, t) {
    W = null, E.H = Ru, t === qa || t === Rn ? (t = Oo(), hl = 3) : t === gc ? (t = Oo(), hl = 4) : hl = t === Kc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, At = t, ll === null && (Cl = 1, Ln(
      l,
      xt(t, l.current)
    ));
  }
  function rd() {
    var l = pt.current;
    return l === null ? !0 : (al & 4194048) === al ? qt === null : (al & 62914560) === al || (al & 536870912) !== 0 ? l === qt : !1;
  }
  function dd() {
    var l = E.H;
    return E.H = Ru, l === null ? Ru : l;
  }
  function md() {
    var l = E.A;
    return E.A = A0, l;
  }
  function ei() {
    Cl = 4, Re || (al & 4194048) !== al && pt.current !== null || (La = !0), (Ue & 134217727) === 0 && (da & 134217727) === 0 || Tl === null || Ce(
      Tl,
      al,
      Ot,
      !1
    );
  }
  function hf(l, t, e) {
    var a = ml;
    ml |= 2;
    var u = dd(), n = md();
    (Tl !== l || al !== t) && (li = null, wa(l, t)), t = !1;
    var i = Cl;
    l: do
      try {
        if (hl !== 0 && ll !== null) {
          var c = ll, s = At;
          switch (hl) {
            case 8:
              vf(), i = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              pt.current === null && (t = !0);
              var h = hl;
              if (hl = 0, At = null, Wa(l, c, s, h), e && La) {
                i = 0;
                break l;
              }
              break;
            default:
              h = hl, hl = 0, At = null, Wa(l, c, s, h);
          }
        }
        N0(), i = Cl;
        break;
      } catch (T) {
        od(l, T);
      }
    while (!0);
    return t && l.shellSuspendCounter++, le = aa = null, ml = a, E.H = u, E.A = n, ll === null && (Tl = null, al = 0, Tn()), i;
  }
  function N0() {
    for (; ll !== null; ) vd(ll);
  }
  function M0(l, t) {
    var e = ml;
    ml |= 2;
    var a = dd(), u = md();
    Tl !== l || al !== t ? (li = null, Pn = Ol() + 500, wa(l, t)) : La = nu(
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
              hl = 0, At = null, Wa(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (zo(n)) {
                hl = 0, At = null, hd(t);
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
              zo(n) ? (hl = 0, At = null, hd(t)) : (hl = 0, At = null, Wa(l, t, n, 7));
              break;
            case 5:
              var i = null;
              switch (ll.tag) {
                case 26:
                  i = ll.memoizedState;
                case 5:
                case 27:
                  var c = ll;
                  if (i ? lm(i) : c.stateNode.complete) {
                    hl = 0, At = null;
                    var s = c.sibling;
                    if (s !== null) ll = s;
                    else {
                      var h = c.return;
                      h !== null ? (ll = h, ai(h)) : ll = null;
                    }
                    break t;
                  }
              }
              hl = 0, At = null, Wa(l, t, n, 5);
              break;
            case 6:
              hl = 0, At = null, Wa(l, t, n, 6);
              break;
            case 8:
              vf(), Cl = 6;
              break l;
            default:
              throw Error(o(462));
          }
        }
        R0();
        break;
      } catch (T) {
        od(l, T);
      }
    while (!0);
    return le = aa = null, E.H = a, E.A = u, ml = e, ll !== null ? 0 : (Tl = null, al = 0, Tn(), Cl);
  }
  function R0() {
    for (; ll !== null && !ft(); )
      vd(ll);
  }
  function vd(l) {
    var t = Yr(l.alternate, l, oe);
    l.memoizedProps = l.pendingProps, t === null ? ai(l) : ll = t;
  }
  function hd(l) {
    var t = l, e = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = xr(
          e,
          t,
          t.pendingProps,
          t.type,
          void 0,
          al
        );
        break;
      case 11:
        t = xr(
          e,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          al
        );
        break;
      case 5:
        Mc(t);
      default:
        Xr(e, t), t = ll = mo(t, oe), t = Yr(e, t, oe);
    }
    l.memoizedProps = l.pendingProps, t === null ? ai(l) : ll = t;
  }
  function Wa(l, t, e, a) {
    le = aa = null, Mc(t), Ba = null, Tu = 0;
    var u = t.return;
    try {
      if (S0(
        l,
        u,
        t,
        e,
        al
      )) {
        Cl = 1, Ln(
          l,
          xt(e, l.current)
        ), ll = null;
        return;
      }
    } catch (n) {
      if (u !== null) throw ll = u, n;
      Cl = 1, Ln(
        l,
        xt(e, l.current)
      ), ll = null;
      return;
    }
    t.flags & 32768 ? (il || a === 1 ? l = !0 : La || (al & 536870912) !== 0 ? l = !1 : (Re = l = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = pt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), yd(t, l)) : ai(t);
  }
  function ai(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        yd(
          t,
          Re
        );
        return;
      }
      l = t.return;
      var e = _0(
        t.alternate,
        t,
        oe
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
  function yd(l, t) {
    do {
      var e = T0(l.alternate, l);
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
  function gd(l, t, e, a, u, n, i, c, s) {
    l.cancelPendingCommit = null;
    do
      ui();
    while (Wl !== 0);
    if ((ml & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === l.current) throw Error(o(177));
      if (n = t.lanes | t.childLanes, n |= ec, sv(
        l,
        e,
        n,
        i,
        c,
        s
      ), l === Tl && (ll = Tl = null, al = 0), Ja = t, je = l, re = e, rf = n, df = u, id = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, C0(We, function() {
        return Td(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = E.T, E.T = null, u = U.p, U.p = 2, i = ml, ml |= 4;
        try {
          p0(l, t, e);
        } finally {
          ml = i, U.p = u, E.T = a;
        }
      }
      Wl = 1, Sd(), bd(), Ed();
    }
  }
  function Sd() {
    if (Wl === 1) {
      Wl = 0;
      var l = je, t = Ja, e = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || e) {
        e = E.T, E.T = null;
        var a = U.p;
        U.p = 2;
        var u = ml;
        ml |= 4;
        try {
          Ir(t, l);
          var n = Df, i = ao(l.containerInfo), c = n.focusedElem, s = n.selectionRange;
          if (i !== c && c && c.ownerDocument && eo(
            c.ownerDocument.documentElement,
            c
          )) {
            if (s !== null && ki(c)) {
              var h = s.start, T = s.end;
              if (T === void 0 && (T = h), "selectionStart" in c)
                c.selectionStart = h, c.selectionEnd = Math.min(
                  T,
                  c.value.length
                );
              else {
                var O = c.ownerDocument || document, y = O && O.defaultView || window;
                if (y.getSelection) {
                  var S = y.getSelection(), q = c.textContent.length, Z = Math.min(s.start, q), _l = s.end === void 0 ? Z : Math.min(s.end, q);
                  !S.extend && Z > _l && (i = _l, _l = Z, Z = i);
                  var m = to(
                    c,
                    Z
                  ), r = to(
                    c,
                    _l
                  );
                  if (m && r && (S.rangeCount !== 1 || S.anchorNode !== m.node || S.anchorOffset !== m.offset || S.focusNode !== r.node || S.focusOffset !== r.offset)) {
                    var v = O.createRange();
                    v.setStart(m.node, m.offset), S.removeAllRanges(), Z > _l ? (S.addRange(v), S.extend(r.node, r.offset)) : (v.setEnd(r.node, r.offset), S.addRange(v));
                  }
                }
              }
            }
            for (O = [], S = c; S = S.parentNode; )
              S.nodeType === 1 && O.push({
                element: S,
                left: S.scrollLeft,
                top: S.scrollTop
              });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < O.length; c++) {
              var z = O[c];
              z.element.scrollLeft = z.left, z.element.scrollTop = z.top;
            }
          }
          yi = !!Of, Df = Of = null;
        } finally {
          ml = u, U.p = a, E.T = e;
        }
      }
      l.current = t, Wl = 2;
    }
  }
  function bd() {
    if (Wl === 2) {
      Wl = 0;
      var l = je, t = Ja, e = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || e) {
        e = E.T, E.T = null;
        var a = U.p;
        U.p = 2;
        var u = ml;
        ml |= 4;
        try {
          wr(l, t.alternate, t);
        } finally {
          ml = u, U.p = a, E.T = e;
        }
      }
      Wl = 3;
    }
  }
  function Ed() {
    if (Wl === 4 || Wl === 3) {
      Wl = 0, Ql();
      var l = je, t = Ja, e = re, a = id;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Wl = 5 : (Wl = 0, Ja = je = null, _d(l, l.pendingLanes));
      var u = l.pendingLanes;
      if (u === 0 && (xe = null), xi(e), t = t.stateNode, bt && typeof bt.onCommitFiberRoot == "function")
        try {
          bt.onCommitFiberRoot(
            Wt,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        t = E.T, u = U.p, U.p = 2, E.T = null;
        try {
          for (var n = l.onRecoverableError, i = 0; i < a.length; i++) {
            var c = a[i];
            n(c.value, {
              componentStack: c.stack
            });
          }
        } finally {
          E.T = t, U.p = u;
        }
      }
      (re & 3) !== 0 && ui(), Kt(l), u = l.pendingLanes, (e & 261930) !== 0 && (u & 42) !== 0 ? l === mf ? Gu++ : (Gu = 0, mf = l) : Gu = 0, Xu(0);
    }
  }
  function _d(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, Eu(t)));
  }
  function ui() {
    return Sd(), bd(), Ed(), Td();
  }
  function Td() {
    if (Wl !== 5) return !1;
    var l = je, t = rf;
    rf = 0;
    var e = xi(re), a = E.T, u = U.p;
    try {
      U.p = 32 > e ? 32 : e, E.T = null, e = df, df = null;
      var n = je, i = re;
      if (Wl = 0, Ja = je = null, re = 0, (ml & 6) !== 0) throw Error(o(331));
      var c = ml;
      if (ml |= 4, ad(n.current), ld(
        n,
        n.current,
        i,
        e
      ), ml = c, Xu(0, !1), bt && typeof bt.onPostCommitFiberRoot == "function")
        try {
          bt.onPostCommitFiberRoot(Wt, n);
        } catch {
        }
      return !0;
    } finally {
      U.p = u, E.T = a, _d(l, t);
    }
  }
  function pd(l, t, e) {
    t = xt(e, t), t = Lc(l.stateNode, t, 2), l = Oe(l, t, 2), l !== null && (iu(l, 2), Kt(l));
  }
  function yl(l, t, e) {
    if (l.tag === 3)
      pd(l, l, e);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          pd(
            t,
            l,
            e
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (xe === null || !xe.has(a))) {
            l = xt(e, l), e = zr(2), a = Oe(t, e, 2), a !== null && (Ar(
              e,
              a,
              t,
              l
            ), iu(a, 2), Kt(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function yf(l, t, e) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new O0();
      var u = /* @__PURE__ */ new Set();
      a.set(t, u);
    } else
      u = a.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), a.set(t, u));
    u.has(e) || (ff = !0, u.add(e), l = U0.bind(null, l, t, e), t.then(l, l));
  }
  function U0(l, t, e) {
    var a = l.pingCache;
    a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & e, l.warmLanes &= ~e, Tl === l && (al & e) === e && (Cl === 4 || Cl === 3 && (al & 62914560) === al && 300 > Ol() - In ? (ml & 2) === 0 && wa(l, 0) : sf |= e, Ka === al && (Ka = 0)), Kt(l);
  }
  function zd(l, t) {
    t === 0 && (t = gs()), l = la(l, t), l !== null && (iu(l, t), Kt(l));
  }
  function x0(l) {
    var t = l.memoizedState, e = 0;
    t !== null && (e = t.retryLane), zd(l, e);
  }
  function j0(l, t) {
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
    a !== null && a.delete(t), zd(l, e);
  }
  function C0(l, t) {
    return Al(l, t);
  }
  var ni = null, $a = null, gf = !1, ii = !1, Sf = !1, He = 0;
  function Kt(l) {
    l !== $a && l.next === null && ($a === null ? ni = $a = l : $a = $a.next = l), ii = !0, gf || (gf = !0, q0());
  }
  function Xu(l, t) {
    if (!Sf && ii) {
      Sf = !0;
      do
        for (var e = !1, a = ni; a !== null; ) {
          if (l !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = a.suspendedLanes, c = a.pingedLanes;
              n = (1 << 31 - Et(42 | l) + 1) - 1, n &= u & ~(i & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (e = !0, Nd(a, n));
          } else
            n = al, n = on(
              a,
              a === Tl ? n : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (n & 3) === 0 || nu(a, n) || (e = !0, Nd(a, n));
          a = a.next;
        }
      while (e);
      Sf = !1;
    }
  }
  function H0() {
    Ad();
  }
  function Ad() {
    ii = gf = !1;
    var l = 0;
    He !== 0 && J0() && (l = He);
    for (var t = Ol(), e = null, a = ni; a !== null; ) {
      var u = a.next, n = Od(a, t);
      n === 0 ? (a.next = null, e === null ? ni = u : e.next = u, u === null && ($a = e)) : (e = a, (l !== 0 || (n & 3) !== 0) && (ii = !0)), a = u;
    }
    Wl !== 0 && Wl !== 5 || Xu(l), He !== 0 && (He = 0);
  }
  function Od(l, t) {
    for (var e = l.suspendedLanes, a = l.pingedLanes, u = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
      var i = 31 - Et(n), c = 1 << i, s = u[i];
      s === -1 ? ((c & e) === 0 || (c & a) !== 0) && (u[i] = fv(c, t)) : s <= t && (l.expiredLanes |= c), n &= ~c;
    }
    if (t = Tl, e = al, e = on(
      l,
      l === t ? e : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a = l.callbackNode, e === 0 || l === t && (hl === 2 || hl === 9) || l.cancelPendingCommit !== null)
      return a !== null && a !== null && ct(a), l.callbackNode = null, l.callbackPriority = 0;
    if ((e & 3) === 0 || nu(l, e)) {
      if (t = e & -e, t === l.callbackPriority) return t;
      switch (a !== null && ct(a), xi(e)) {
        case 2:
        case 8:
          e = au;
          break;
        case 32:
          e = We;
          break;
        case 268435456:
          e = Nt;
          break;
        default:
          e = We;
      }
      return a = Dd.bind(null, l), e = Al(e, a), l.callbackPriority = t, l.callbackNode = e, t;
    }
    return a !== null && a !== null && ct(a), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function Dd(l, t) {
    if (Wl !== 0 && Wl !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var e = l.callbackNode;
    if (ui() && l.callbackNode !== e)
      return null;
    var a = al;
    return a = on(
      l,
      l === Tl ? a : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a === 0 ? null : (fd(l, a, t), Od(l, Ol()), l.callbackNode != null && l.callbackNode === e ? Dd.bind(null, l) : null);
  }
  function Nd(l, t) {
    if (ui()) return null;
    fd(l, t, !0);
  }
  function q0() {
    W0(function() {
      (ml & 6) !== 0 ? Al(
        ye,
        H0
      ) : Ad();
    });
  }
  function bf() {
    if (He === 0) {
      var l = Ca;
      l === 0 && (l = cn, cn <<= 1, (cn & 261888) === 0 && (cn = 256)), He = l;
    }
    return He;
  }
  function Md(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : vn("" + l);
  }
  function Rd(l, t) {
    var e = t.ownerDocument.createElement("input");
    return e.name = t.name, e.value = t.value, l.id && e.setAttribute("form", l.id), t.parentNode.insertBefore(e, t), l = new FormData(l), e.parentNode.removeChild(e), l;
  }
  function B0(l, t, e, a, u) {
    if (t === "submit" && e && e.stateNode === u) {
      var n = Md(
        (u[ot] || null).action
      ), i = a.submitter;
      i && (t = (t = i[ot] || null) ? Md(t.formAction) : i.getAttribute("formAction"), t !== null && (n = t, i = null));
      var c = new Sn(
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
                if (He !== 0) {
                  var s = i ? Rd(u, i) : new FormData(u);
                  Yc(
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
                typeof n == "function" && (c.preventDefault(), s = i ? Rd(u, i) : new FormData(u), Yc(
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
  for (var Ef = 0; Ef < tc.length; Ef++) {
    var _f = tc[Ef], Y0 = _f.toLowerCase(), G0 = _f[0].toUpperCase() + _f.slice(1);
    Gt(
      Y0,
      "on" + G0
    );
  }
  Gt(io, "onAnimationEnd"), Gt(co, "onAnimationIteration"), Gt(fo, "onAnimationStart"), Gt("dblclick", "onDoubleClick"), Gt("focusin", "onFocus"), Gt("focusout", "onBlur"), Gt(t0, "onTransitionRun"), Gt(e0, "onTransitionStart"), Gt(a0, "onTransitionCancel"), Gt(so, "onTransitionEnd"), Ea("onMouseEnter", ["mouseout", "mouseover"]), Ea("onMouseLeave", ["mouseout", "mouseover"]), Ea("onPointerEnter", ["pointerout", "pointerover"]), Ea("onPointerLeave", ["pointerout", "pointerover"]), Fe(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Fe(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Fe("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Fe(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Fe(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Fe(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Qu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), X0 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Qu)
  );
  function Ud(l, t) {
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
              _n(T);
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
              _n(T);
            }
            u.currentTarget = null, n = s;
          }
      }
    }
  }
  function tl(l, t) {
    var e = t[ji];
    e === void 0 && (e = t[ji] = /* @__PURE__ */ new Set());
    var a = l + "__bubble";
    e.has(a) || (xd(t, l, 2, !1), e.add(a));
  }
  function Tf(l, t, e) {
    var a = 0;
    t && (a |= 4), xd(
      e,
      l,
      a,
      t
    );
  }
  var ci = "_reactListening" + Math.random().toString(36).slice(2);
  function pf(l) {
    if (!l[ci]) {
      l[ci] = !0, zs.forEach(function(e) {
        e !== "selectionchange" && (X0.has(e) || Tf(e, !1, l), Tf(e, !0, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[ci] || (t[ci] = !0, Tf("selectionchange", !1, t));
    }
  }
  function xd(l, t, e, a) {
    switch (cm(t)) {
      case 2:
        var u = vh;
        break;
      case 8:
        u = hh;
        break;
      default:
        u = Yf;
    }
    e = u.bind(
      null,
      t,
      e,
      l
    ), u = void 0, !Vi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), a ? u !== void 0 ? l.addEventListener(t, e, {
      capture: !0,
      passive: u
    }) : l.addEventListener(t, e, !0) : u !== void 0 ? l.addEventListener(t, e, {
      passive: u
    }) : l.addEventListener(t, e, !1);
  }
  function zf(l, t, e, a, u) {
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
            if (i = ga(c), i === null) return;
            if (s = i.tag, s === 5 || s === 6 || s === 26 || s === 27) {
              a = n = i;
              continue l;
            }
            c = c.parentNode;
          }
        }
        a = a.return;
      }
    qs(function() {
      var h = n, T = Xi(e), O = [];
      l: {
        var y = oo.get(l);
        if (y !== void 0) {
          var S = Sn, q = l;
          switch (l) {
            case "keypress":
              if (yn(e) === 0) break l;
            case "keydown":
            case "keyup":
              S = jv;
              break;
            case "focusin":
              q = "focus", S = Ji;
              break;
            case "focusout":
              q = "blur", S = Ji;
              break;
            case "beforeblur":
            case "afterblur":
              S = Ji;
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
              S = Gs;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              S = _v;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              S = qv;
              break;
            case io:
            case co:
            case fo:
              S = zv;
              break;
            case so:
              S = Yv;
              break;
            case "scroll":
            case "scrollend":
              S = bv;
              break;
            case "wheel":
              S = Xv;
              break;
            case "copy":
            case "cut":
            case "paste":
              S = Ov;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              S = Qs;
              break;
            case "toggle":
            case "beforetoggle":
              S = Vv;
          }
          var Z = (t & 4) !== 0, _l = !Z && (l === "scroll" || l === "scrollend"), m = Z ? y !== null ? y + "Capture" : null : y;
          Z = [];
          for (var r = h, v; r !== null; ) {
            var z = r;
            if (v = z.stateNode, z = z.tag, z !== 5 && z !== 26 && z !== 27 || v === null || m === null || (z = su(r, m), z != null && Z.push(
              Vu(r, z, v)
            )), _l) break;
            r = r.return;
          }
          0 < Z.length && (y = new S(
            y,
            q,
            null,
            e,
            T
          ), O.push({ event: y, listeners: Z }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (y = l === "mouseover" || l === "pointerover", S = l === "mouseout" || l === "pointerout", y && e !== Gi && (q = e.relatedTarget || e.fromElement) && (ga(q) || q[ya]))
            break l;
          if ((S || y) && (y = T.window === T ? T : (y = T.ownerDocument) ? y.defaultView || y.parentWindow : window, S ? (q = e.relatedTarget || e.toElement, S = h, q = q ? ga(q) : null, q !== null && (_l = B(q), Z = q.tag, q !== _l || Z !== 5 && Z !== 27 && Z !== 6) && (q = null)) : (S = null, q = h), S !== q)) {
            if (Z = Gs, z = "onMouseLeave", m = "onMouseEnter", r = "mouse", (l === "pointerout" || l === "pointerover") && (Z = Qs, z = "onPointerLeave", m = "onPointerEnter", r = "pointer"), _l = S == null ? y : fu(S), v = q == null ? y : fu(q), y = new Z(
              z,
              r + "leave",
              S,
              e,
              T
            ), y.target = _l, y.relatedTarget = v, z = null, ga(T) === h && (Z = new Z(
              m,
              r + "enter",
              q,
              e,
              T
            ), Z.target = v, Z.relatedTarget = _l, z = Z), _l = z, S && q)
              t: {
                for (Z = Q0, m = S, r = q, v = 0, z = m; z; z = Z(z))
                  v++;
                z = 0;
                for (var X = r; X; X = Z(X))
                  z++;
                for (; 0 < v - z; )
                  m = Z(m), v--;
                for (; 0 < z - v; )
                  r = Z(r), z--;
                for (; v--; ) {
                  if (m === r || r !== null && m === r.alternate) {
                    Z = m;
                    break t;
                  }
                  m = Z(m), r = Z(r);
                }
                Z = null;
              }
            else Z = null;
            S !== null && jd(
              O,
              y,
              S,
              Z,
              !1
            ), q !== null && _l !== null && jd(
              O,
              _l,
              q,
              Z,
              !0
            );
          }
        }
        l: {
          if (y = h ? fu(h) : window, S = y.nodeName && y.nodeName.toLowerCase(), S === "select" || S === "input" && y.type === "file")
            var ol = $s;
          else if (ws(y))
            if (Fs)
              ol = Iv;
            else {
              ol = Fv;
              var G = $v;
            }
          else
            S = y.nodeName, !S || S.toLowerCase() !== "input" || y.type !== "checkbox" && y.type !== "radio" ? h && Yi(h.elementType) && (ol = $s) : ol = kv;
          if (ol && (ol = ol(l, h))) {
            Ws(
              O,
              ol,
              e,
              T
            );
            break l;
          }
          G && G(l, y, h), l === "focusout" && h && y.type === "number" && h.memoizedProps.value != null && Bi(y, "number", y.value);
        }
        switch (G = h ? fu(h) : window, l) {
          case "focusin":
            (ws(G) || G.contentEditable === "true") && (Oa = G, Ii = h, gu = null);
            break;
          case "focusout":
            gu = Ii = Oa = null;
            break;
          case "mousedown":
            Pi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Pi = !1, uo(O, e, T);
            break;
          case "selectionchange":
            if (l0) break;
          case "keydown":
          case "keyup":
            uo(O, e, T);
        }
        var F;
        if (Wi)
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
          Aa ? Ks(l, e) && (ul = "onCompositionEnd") : l === "keydown" && e.keyCode === 229 && (ul = "onCompositionStart");
        ul && (Vs && e.locale !== "ko" && (Aa || ul !== "onCompositionStart" ? ul === "onCompositionEnd" && Aa && (F = Bs()) : (be = T, Zi = "value" in be ? be.value : be.textContent, Aa = !0)), G = fi(h, ul), 0 < G.length && (ul = new Xs(
          ul,
          l,
          null,
          e,
          T
        ), O.push({ event: ul, listeners: G }), F ? ul.data = F : (F = Js(e), F !== null && (ul.data = F)))), (F = Lv ? Kv(l, e) : Jv(l, e)) && (ul = fi(h, "onBeforeInput"), 0 < ul.length && (G = new Xs(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          T
        ), O.push({
          event: G,
          listeners: ul
        }), G.data = F)), B0(
          O,
          l,
          h,
          e,
          T
        );
      }
      Ud(O, t);
    });
  }
  function Vu(l, t, e) {
    return {
      instance: l,
      listener: t,
      currentTarget: e
    };
  }
  function fi(l, t) {
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
  function Q0(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function jd(l, t, e, a, u) {
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
  var V0 = /\r\n?/g, Z0 = /\u0000|\uFFFD/g;
  function Cd(l) {
    return (typeof l == "string" ? l : "" + l).replace(V0, `
`).replace(Z0, "");
  }
  function Hd(l, t) {
    return t = Cd(t), Cd(l) === t;
  }
  function El(l, t, e, a, u, n) {
    switch (e) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || Ta(l, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && Ta(l, "" + a);
        break;
      case "className":
        dn(l, "class", a);
        break;
      case "tabIndex":
        dn(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        dn(l, e, a);
        break;
      case "style":
        Cs(l, a, n);
        break;
      case "data":
        if (t !== "object") {
          dn(l, "data", a);
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
        a = vn("" + a), l.setAttribute(e, a);
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
        a = vn("" + a), l.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (l.onclick = Ft);
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
        e = vn("" + a), l.setAttributeNS(
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
        tl("beforetoggle", l), tl("toggle", l), rn(l, "popover", a);
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
        rn(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = gv.get(e) || e, rn(l, e, a));
    }
  }
  function Af(l, t, e, a, u, n) {
    switch (e) {
      case "style":
        Cs(l, a, n);
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
        a != null && tl("scroll", l);
        break;
      case "onScrollEnd":
        a != null && tl("scrollend", l);
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
        if (!As.hasOwnProperty(e))
          l: {
            if (e[0] === "o" && e[1] === "n" && (u = e.endsWith("Capture"), t = e.slice(2, u ? e.length - 7 : void 0), n = l[ot] || null, n = n != null ? n[e] : null, typeof n == "function" && l.removeEventListener(t, n, u), typeof a == "function")) {
              typeof n != "function" && n !== null && (e in l ? l[e] = null : l.hasAttribute(e) && l.removeAttribute(e)), l.addEventListener(t, a, u);
              break l;
            }
            e in l ? l[e] = a : a === !0 ? l.setAttribute(e, "") : rn(l, e, a);
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
                  El(l, t, a, T, e, null);
              }
          }
        Rs(
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
        t = n, e = i, l.multiple = !!a, t != null ? _a(l, !!a, t, !1) : e != null && _a(l, !!a, e, !0);
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
        xs(l, a, u, n);
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
        for (a = 0; a < Qu.length; a++)
          tl(Qu[a], l);
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
        if (Yi(t)) {
          for (T in e)
            e.hasOwnProperty(T) && (a = e[T], a !== void 0 && Af(
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
      e.hasOwnProperty(c) && (a = e[c], a != null && El(l, t, c, a, e, null));
  }
  function L0(l, t, e, a) {
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
        for (S in e) {
          var O = e[S];
          if (e.hasOwnProperty(S) && O != null)
            switch (S) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                s = O;
              default:
                a.hasOwnProperty(S) || El(l, t, S, null, a, O);
            }
        }
        for (var y in a) {
          var S = a[y];
          if (O = e[y], a.hasOwnProperty(y) && (S != null || O != null))
            switch (y) {
              case "type":
                n = S;
                break;
              case "name":
                u = S;
                break;
              case "checked":
                h = S;
                break;
              case "defaultChecked":
                T = S;
                break;
              case "value":
                i = S;
                break;
              case "defaultValue":
                c = S;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (S != null)
                  throw Error(o(137, t));
                break;
              default:
                S !== O && El(
                  l,
                  t,
                  y,
                  S,
                  a,
                  O
                );
            }
        }
        qi(
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
        S = i = c = y = null;
        for (n in e)
          if (s = e[n], e.hasOwnProperty(n) && s != null)
            switch (n) {
              case "value":
                break;
              case "multiple":
                S = s;
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
        t = c, e = i, a = S, y != null ? _a(l, !!e, y, !1) : !!a != !!e && (t != null ? _a(l, !!e, t, !0) : _a(l, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        S = y = null;
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
                S = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(o(91));
                break;
              default:
                u !== n && El(l, t, i, u, a, n);
            }
        Us(l, y, S);
        return;
      case "option":
        for (var q in e)
          if (y = e[q], e.hasOwnProperty(q) && y != null && !a.hasOwnProperty(q))
            switch (q) {
              case "selected":
                l.selected = !1;
                break;
              default:
                El(
                  l,
                  t,
                  q,
                  null,
                  a,
                  y
                );
            }
        for (s in a)
          if (y = a[s], S = e[s], a.hasOwnProperty(s) && y !== S && (y != null || S != null))
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
                  S
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
          if (y = a[h], S = e[h], a.hasOwnProperty(h) && y !== S && (y != null || S != null))
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
                  S
                );
            }
        return;
      default:
        if (Yi(t)) {
          for (var _l in e)
            y = e[_l], e.hasOwnProperty(_l) && y !== void 0 && !a.hasOwnProperty(_l) && Af(
              l,
              t,
              _l,
              void 0,
              a,
              y
            );
          for (T in a)
            y = a[T], S = e[T], !a.hasOwnProperty(T) || y === S || y === void 0 && S === void 0 || Af(
              l,
              t,
              T,
              y,
              a,
              S
            );
          return;
        }
    }
    for (var m in e)
      y = e[m], e.hasOwnProperty(m) && y != null && !a.hasOwnProperty(m) && El(l, t, m, null, a, y);
    for (O in a)
      y = a[O], S = e[O], !a.hasOwnProperty(O) || y === S || y == null && S == null || El(l, t, O, y, a, S);
  }
  function qd(l) {
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
  function K0() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, t = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var u = e[a], n = u.transferSize, i = u.initiatorType, c = u.duration;
        if (n && c && qd(i)) {
          for (i = 0, c = u.responseEnd, a += 1; a < e.length; a++) {
            var s = e[a], h = s.startTime;
            if (h > c) break;
            var T = s.transferSize, O = s.initiatorType;
            T && qd(O) && (s = s.responseEnd, i += T * (s < c ? 1 : (c - h) / (s - h)));
          }
          if (--a, t += 8 * (n + i) / (u.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var Of = null, Df = null;
  function si(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Bd(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Yd(l, t) {
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
  function Nf(l, t) {
    return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Mf = null;
  function J0() {
    var l = window.event;
    return l && l.type === "popstate" ? l === Mf ? !1 : (Mf = l, !0) : (Mf = null, !1);
  }
  var Gd = typeof setTimeout == "function" ? setTimeout : void 0, w0 = typeof clearTimeout == "function" ? clearTimeout : void 0, Xd = typeof Promise == "function" ? Promise : void 0, W0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Xd < "u" ? function(l) {
    return Xd.resolve(null).then(l).catch($0);
  } : Gd;
  function $0(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function qe(l) {
    return l === "head";
  }
  function Qd(l, t) {
    var e = t, a = 0;
    do {
      var u = e.nextSibling;
      if (l.removeChild(e), u && u.nodeType === 8)
        if (e = u.data, e === "/$" || e === "/&") {
          if (a === 0) {
            l.removeChild(u), Pa(t);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          Zu(l.ownerDocument.documentElement);
        else if (e === "head") {
          e = l.ownerDocument.head, Zu(e);
          for (var n = e.firstChild; n; ) {
            var i = n.nextSibling, c = n.nodeName;
            n[cu] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && n.rel.toLowerCase() === "stylesheet" || e.removeChild(n), n = i;
          }
        } else
          e === "body" && Zu(l.ownerDocument.body);
      e = u;
    } while (e);
    Pa(t);
  }
  function Vd(l, t) {
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
  function Rf(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var e = t;
      switch (t = t.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Rf(e), Ci(e);
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
  function F0(l, t, e, a) {
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
      if (l = Bt(l.nextSibling), l === null) break;
    }
    return null;
  }
  function k0(l, t, e) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !e || (l = Bt(l.nextSibling), l === null)) return null;
    return l;
  }
  function Zd(l, t) {
    for (; l.nodeType !== 8; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = Bt(l.nextSibling), l === null)) return null;
    return l;
  }
  function Uf(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function xf(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function I0(l, t) {
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
  var jf = null;
  function Ld(l) {
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
  function Kd(l) {
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
  function Jd(l, t, e) {
    switch (t = si(e), l) {
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
  function Zu(l) {
    for (var t = l.attributes; t.length; )
      l.removeAttributeNode(t[0]);
    Ci(l);
  }
  var Yt = /* @__PURE__ */ new Map(), wd = /* @__PURE__ */ new Set();
  function oi(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var de = U.d;
  U.d = {
    f: P0,
    r: lh,
    D: th,
    C: eh,
    L: ah,
    m: uh,
    X: ih,
    S: nh,
    M: ch
  };
  function P0() {
    var l = de.f(), t = ti();
    return l || t;
  }
  function lh(l) {
    var t = Sa(l);
    t !== null && t.tag === 5 && t.type === "form" ? or(t) : de.r(l);
  }
  var Fa = typeof document > "u" ? null : document;
  function Wd(l, t, e) {
    var a = Fa;
    if (a && typeof t == "string" && t) {
      var u = Rt(t);
      u = 'link[rel="' + l + '"][href="' + u + '"]', typeof e == "string" && (u += '[crossorigin="' + e + '"]'), wd.has(u) || (wd.add(u), l = { rel: l, crossOrigin: e, href: t }, a.querySelector(u) === null && (t = a.createElement("link"), et(t, "link", l), Fl(t), a.head.appendChild(t)));
    }
  }
  function th(l) {
    de.D(l), Wd("dns-prefetch", l, null);
  }
  function eh(l, t) {
    de.C(l, t), Wd("preconnect", l, t);
  }
  function ah(l, t, e) {
    de.L(l, t, e);
    var a = Fa;
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
          n = ka(l);
          break;
        case "script":
          n = Ia(l);
      }
      Yt.has(n) || (l = D(
        {
          rel: "preload",
          href: t === "image" && e && e.imageSrcSet ? void 0 : l,
          as: t
        },
        e
      ), Yt.set(n, l), a.querySelector(u) !== null || t === "style" && a.querySelector(Lu(n)) || t === "script" && a.querySelector(Ku(n)) || (t = a.createElement("link"), et(t, "link", l), Fl(t), a.head.appendChild(t)));
    }
  }
  function uh(l, t) {
    de.m(l, t);
    var e = Fa;
    if (e && l) {
      var a = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + Rt(a) + '"][href="' + Rt(l) + '"]', n = u;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = Ia(l);
      }
      if (!Yt.has(n) && (l = D({ rel: "modulepreload", href: l }, t), Yt.set(n, l), e.querySelector(u) === null)) {
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
  function nh(l, t, e) {
    de.S(l, t, e);
    var a = Fa;
    if (a && l) {
      var u = ba(a).hoistableStyles, n = ka(l);
      t = t || "default";
      var i = u.get(n);
      if (!i) {
        var c = { loading: 0, preload: null };
        if (i = a.querySelector(
          Lu(n)
        ))
          c.loading = 5;
        else {
          l = D(
            { rel: "stylesheet", href: l, "data-precedence": t },
            e
          ), (e = Yt.get(n)) && Cf(l, e);
          var s = i = a.createElement("link");
          Fl(s), et(s, "link", l), s._p = new Promise(function(h, T) {
            s.onload = h, s.onerror = T;
          }), s.addEventListener("load", function() {
            c.loading |= 1;
          }), s.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, ri(i, t, a);
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
  function ih(l, t) {
    de.X(l, t);
    var e = Fa;
    if (e && l) {
      var a = ba(e).hoistableScripts, u = Ia(l), n = a.get(u);
      n || (n = e.querySelector(Ku(u)), n || (l = D({ src: l, async: !0 }, t), (t = Yt.get(u)) && Hf(l, t), n = e.createElement("script"), Fl(n), et(n, "link", l), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function ch(l, t) {
    de.M(l, t);
    var e = Fa;
    if (e && l) {
      var a = ba(e).hoistableScripts, u = Ia(l), n = a.get(u);
      n || (n = e.querySelector(Ku(u)), n || (l = D({ src: l, async: !0, type: "module" }, t), (t = Yt.get(u)) && Hf(l, t), n = e.createElement("script"), Fl(n), et(n, "link", l), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function $d(l, t, e, a) {
    var u = (u = w.current) ? oi(u) : null;
    if (!u) throw Error(o(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (t = ka(e.href), e = ba(
          u
        ).hoistableStyles, a = e.get(t), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          l = ka(e.href);
          var n = ba(
            u
          ).hoistableStyles, i = n.get(l);
          if (i || (u = u.ownerDocument || u, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, n.set(l, i), (n = u.querySelector(
            Lu(l)
          )) && !n._p && (i.instance = n, i.state.loading = 5), Yt.has(l) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Yt.set(l, e), n || fh(
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
        return t = e.async, e = e.src, typeof e == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Ia(e), e = ba(
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
  function ka(l) {
    return 'href="' + Rt(l) + '"';
  }
  function Lu(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function Fd(l) {
    return D({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function fh(l, t, e, a) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = l.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), et(t, "link", e), Fl(t), l.head.appendChild(t));
  }
  function Ia(l) {
    return '[src="' + Rt(l) + '"]';
  }
  function Ku(l) {
    return "script[async]" + l;
  }
  function kd(l, t, e) {
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
          ), Fl(a), et(a, "style", u), ri(a, e.precedence, l), t.instance = a;
        case "stylesheet":
          u = ka(e.href);
          var n = l.querySelector(
            Lu(u)
          );
          if (n)
            return t.state.loading |= 4, t.instance = n, Fl(n), n;
          a = Fd(e), (u = Yt.get(u)) && Cf(a, u), n = (l.ownerDocument || l).createElement("link"), Fl(n);
          var i = n;
          return i._p = new Promise(function(c, s) {
            i.onload = c, i.onerror = s;
          }), et(n, "link", a), t.state.loading |= 4, ri(n, e.precedence, l), t.instance = n;
        case "script":
          return n = Ia(e.src), (u = l.querySelector(
            Ku(n)
          )) ? (t.instance = u, Fl(u), u) : (a = e, (u = Yt.get(n)) && (a = D({}, e), Hf(a, u)), l = l.ownerDocument || l, u = l.createElement("script"), Fl(u), et(u, "link", a), l.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, ri(a, e.precedence, l));
    return t.instance;
  }
  function ri(l, t, e) {
    for (var a = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = a.length ? a[a.length - 1] : null, n = u, i = 0; i < a.length; i++) {
      var c = a[i];
      if (c.dataset.precedence === t) n = c;
      else if (n !== u) break;
    }
    n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = e.nodeType === 9 ? e.head : e, t.insertBefore(l, t.firstChild));
  }
  function Cf(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
  }
  function Hf(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
  }
  var di = null;
  function Id(l, t, e) {
    if (di === null) {
      var a = /* @__PURE__ */ new Map(), u = di = /* @__PURE__ */ new Map();
      u.set(e, a);
    } else
      u = di, a = u.get(e), a || (a = /* @__PURE__ */ new Map(), u.set(e, a));
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
  function Pd(l, t, e) {
    l = l.ownerDocument || l, l.head.insertBefore(
      e,
      t === "title" ? l.querySelector("head > title") : null
    );
  }
  function sh(l, t, e) {
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
  function lm(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function oh(l, t, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var u = ka(a.href), n = t.querySelector(
          Lu(u)
        );
        if (n) {
          t = n._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = mi.bind(l), t.then(l, l)), e.state.loading |= 4, e.instance = n, Fl(n);
          return;
        }
        n = t.ownerDocument || t, a = Fd(a), (u = Yt.get(u)) && Cf(a, u), n = n.createElement("link"), Fl(n);
        var i = n;
        i._p = new Promise(function(c, s) {
          i.onload = c, i.onerror = s;
        }), et(n, "link", a), e.instance = n;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(e, t), (t = e.state.preload) && (e.state.loading & 3) === 0 && (l.count++, e = mi.bind(l), t.addEventListener("load", e), t.addEventListener("error", e));
    }
  }
  var qf = 0;
  function rh(l, t) {
    return l.stylesheets && l.count === 0 && hi(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (l.stylesheets && hi(l, l.stylesheets), l.unsuspend) {
          var n = l.unsuspend;
          l.unsuspend = null, n();
        }
      }, 6e4 + t);
      0 < l.imgBytes && qf === 0 && (qf = 62500 * K0());
      var u = setTimeout(
        function() {
          if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && hi(l, l.stylesheets), l.unsuspend)) {
            var n = l.unsuspend;
            l.unsuspend = null, n();
          }
        },
        (l.imgBytes > qf ? 50 : 800) + t
      );
      return l.unsuspend = e, function() {
        l.unsuspend = null, clearTimeout(a), clearTimeout(u);
      };
    } : null;
  }
  function mi() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) hi(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var vi = null;
  function hi(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, vi = /* @__PURE__ */ new Map(), t.forEach(dh, l), vi = null, mi.call(l));
  }
  function dh(l, t) {
    if (!(t.state.loading & 4)) {
      var e = vi.get(l);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), vi.set(l, e);
        for (var u = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), n = 0; n < u.length; n++) {
          var i = u[n];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      u = t.instance, i = u.getAttribute("data-precedence"), n = e.get(i) || a, n === a && e.set(null, u), e.set(i, u), this.count++, a = mi.bind(this), u.addEventListener("load", a), u.addEventListener("error", a), n ? n.parentNode.insertBefore(u, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(u, l.firstChild)), t.state.loading |= 4;
    }
  }
  var Ju = {
    $$typeof: Ul,
    Provider: null,
    Consumer: null,
    _currentValue: Q,
    _currentValue2: Q,
    _threadCount: 0
  };
  function mh(l, t, e, a, u, n, i, c, s) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ri(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ri(0), this.hiddenUpdates = Ri(null), this.identifierPrefix = a, this.onUncaughtError = u, this.onCaughtError = n, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = s, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function tm(l, t, e, a, u, n, i, c, s, h, T, O) {
    return l = new mh(
      l,
      t,
      e,
      i,
      s,
      h,
      T,
      O,
      c
    ), t = 1, n === !0 && (t |= 24), n = Tt(3, null, null, t), l.current = n, n.stateNode = l, t = vc(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: t
    }, Sc(n), l;
  }
  function em(l) {
    return l ? (l = Ma, l) : Ma;
  }
  function am(l, t, e, a, u, n) {
    u = em(u), a.context === null ? a.context = u : a.pendingContext = u, a = Ae(t), a.payload = { element: e }, n = n === void 0 ? null : n, n !== null && (a.callback = n), e = Oe(l, a, t), e !== null && (yt(e, l, t), zu(e, l, t));
  }
  function um(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var e = l.retryLane;
      l.retryLane = e !== 0 && e < t ? e : t;
    }
  }
  function Bf(l, t) {
    um(l, t), (l = l.alternate) && um(l, t);
  }
  function nm(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = la(l, 67108864);
      t !== null && yt(t, l, 67108864), Bf(l, 67108864);
    }
  }
  function im(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Dt();
      t = Ui(t);
      var e = la(l, t);
      e !== null && yt(e, l, t), Bf(l, t);
    }
  }
  var yi = !0;
  function vh(l, t, e, a) {
    var u = E.T;
    E.T = null;
    var n = U.p;
    try {
      U.p = 2, Yf(l, t, e, a);
    } finally {
      U.p = n, E.T = u;
    }
  }
  function hh(l, t, e, a) {
    var u = E.T;
    E.T = null;
    var n = U.p;
    try {
      U.p = 8, Yf(l, t, e, a);
    } finally {
      U.p = n, E.T = u;
    }
  }
  function Yf(l, t, e, a) {
    if (yi) {
      var u = Gf(a);
      if (u === null)
        zf(
          l,
          t,
          a,
          gi,
          e
        ), fm(l, a);
      else if (gh(
        u,
        l,
        t,
        e,
        a
      ))
        a.stopPropagation();
      else if (fm(l, a), t & 4 && -1 < yh.indexOf(l)) {
        for (; u !== null; ) {
          var n = Sa(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                  var i = $e(n.pendingLanes);
                  if (i !== 0) {
                    var c = n;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                      var s = 1 << 31 - Et(i);
                      c.entanglements[1] |= s, i &= ~s;
                    }
                    Kt(n), (ml & 6) === 0 && (Pn = Ol() + 500, Xu(0));
                  }
                }
                break;
              case 31:
              case 13:
                c = la(n, 2), c !== null && yt(c, n, 2), ti(), Bf(n, 2);
            }
          if (n = Gf(a), n === null && zf(
            l,
            t,
            a,
            gi,
            e
          ), n === u) break;
          u = n;
        }
        u !== null && a.stopPropagation();
      } else
        zf(
          l,
          t,
          a,
          null,
          e
        );
    }
  }
  function Gf(l) {
    return l = Xi(l), Xf(l);
  }
  var gi = null;
  function Xf(l) {
    if (gi = null, l = ga(l), l !== null) {
      var t = B(l);
      if (t === null) l = null;
      else {
        var e = t.tag;
        if (e === 13) {
          if (l = R(t), l !== null) return l;
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
    return gi = l, null;
  }
  function cm(l) {
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
        switch (we()) {
          case ye:
            return 2;
          case au:
            return 8;
          case We:
          case st:
            return 32;
          case Nt:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Qf = !1, Be = null, Ye = null, Ge = null, wu = /* @__PURE__ */ new Map(), Wu = /* @__PURE__ */ new Map(), Xe = [], yh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function fm(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        Be = null;
        break;
      case "dragenter":
      case "dragleave":
        Ye = null;
        break;
      case "mouseover":
      case "mouseout":
        Ge = null;
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
    }, t !== null && (t = Sa(t), t !== null && nm(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), l);
  }
  function gh(l, t, e, a, u) {
    switch (t) {
      case "focusin":
        return Be = $u(
          Be,
          l,
          t,
          e,
          a,
          u
        ), !0;
      case "dragenter":
        return Ye = $u(
          Ye,
          l,
          t,
          e,
          a,
          u
        ), !0;
      case "mouseover":
        return Ge = $u(
          Ge,
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
  function sm(l) {
    var t = ga(l.target);
    if (t !== null) {
      var e = B(t);
      if (e !== null) {
        if (t = e.tag, t === 13) {
          if (t = R(e), t !== null) {
            l.blockedOn = t, Ts(l.priority, function() {
              im(e);
            });
            return;
          }
        } else if (t === 31) {
          if (t = Y(e), t !== null) {
            l.blockedOn = t, Ts(l.priority, function() {
              im(e);
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
  function Si(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var e = Gf(l.nativeEvent);
      if (e === null) {
        e = l.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        Gi = a, e.target.dispatchEvent(a), Gi = null;
      } else
        return t = Sa(e), t !== null && nm(t), l.blockedOn = e, !1;
      t.shift();
    }
    return !0;
  }
  function om(l, t, e) {
    Si(l) && e.delete(t);
  }
  function Sh() {
    Qf = !1, Be !== null && Si(Be) && (Be = null), Ye !== null && Si(Ye) && (Ye = null), Ge !== null && Si(Ge) && (Ge = null), wu.forEach(om), Wu.forEach(om);
  }
  function bi(l, t) {
    l.blockedOn === t && (l.blockedOn = null, Qf || (Qf = !0, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      Sh
    )));
  }
  var Ei = null;
  function rm(l) {
    Ei !== l && (Ei = l, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      function() {
        Ei === l && (Ei = null);
        for (var t = 0; t < l.length; t += 3) {
          var e = l[t], a = l[t + 1], u = l[t + 2];
          if (typeof a != "function") {
            if (Xf(a || e) === null)
              continue;
            break;
          }
          var n = Sa(e);
          n !== null && (l.splice(t, 3), t -= 3, Yc(
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
  function Pa(l) {
    function t(s) {
      return bi(s, l);
    }
    Be !== null && bi(Be, l), Ye !== null && bi(Ye, l), Ge !== null && bi(Ge, l), wu.forEach(t), Wu.forEach(t);
    for (var e = 0; e < Xe.length; e++) {
      var a = Xe[e];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < Xe.length && (e = Xe[0], e.blockedOn === null); )
      sm(e), e.blockedOn === null && Xe.shift();
    if (e = (l.ownerDocument || l).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var u = e[a], n = e[a + 1], i = u[ot] || null;
        if (typeof n == "function")
          i || rm(e);
        else if (i) {
          var c = null;
          if (n && n.hasAttribute("formAction")) {
            if (u = n, i = n[ot] || null)
              c = i.formAction;
            else if (Xf(u) !== null) continue;
          } else c = i.action;
          typeof c == "function" ? e[a + 1] = c : (e.splice(a, 3), a -= 3), rm(e);
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
  function Vf(l) {
    this._internalRoot = l;
  }
  _i.prototype.render = Vf.prototype.render = function(l) {
    var t = this._internalRoot;
    if (t === null) throw Error(o(409));
    var e = t.current, a = Dt();
    am(e, a, l, t, null, null);
  }, _i.prototype.unmount = Vf.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      am(l.current, 2, null, l, null, null), ti(), t[ya] = null;
    }
  };
  function _i(l) {
    this._internalRoot = l;
  }
  _i.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = _s();
      l = { blockedOn: null, target: l, priority: t };
      for (var e = 0; e < Xe.length && t !== 0 && t < Xe[e].priority; e++) ;
      Xe.splice(e, 0, l), e === 0 && sm(l);
    }
  };
  var mm = g.version;
  if (mm !== "19.2.6")
    throw Error(
      o(
        527,
        mm,
        "19.2.6"
      )
    );
  U.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function" ? Error(o(188)) : (l = Object.keys(l).join(","), Error(o(268, l)));
    return l = _(t), l = l !== null ? x(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var bh = {
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
          bh
        ), bt = Ti;
      } catch {
      }
  }
  return ku.createRoot = function(l, t) {
    if (!C(l)) throw Error(o(299));
    var e = !1, a = "", u = Er, n = _r, i = Tr;
    return t != null && (t.unstable_strictMode === !0 && (e = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = tm(
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
    ), l[ya] = t.current, pf(l), new Vf(t);
  }, ku.hydrateRoot = function(l, t, e) {
    if (!C(l)) throw Error(o(299));
    var a = !1, u = "", n = Er, i = _r, c = Tr, s = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (u = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (c = e.onRecoverableError), e.formState !== void 0 && (s = e.formState)), t = tm(
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
    ), t.context = em(null), e = t.current, a = Dt(), a = Ui(a), u = Ae(a), u.callback = null, Oe(e, u, a), e = a, t.current.lanes = e, iu(t, e), Kt(t), l[ya] = t.current, pf(l), new _i(t);
  }, ku.version = "19.2.6", ku;
}
var pm;
function Rh() {
  if (pm) return Kf.exports;
  pm = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (g) {
        console.error(g);
      }
  }
  return f(), Kf.exports = Mh(), Kf.exports;
}
var Uh = Rh(), $f = { exports: {} }, Ff = {};
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
function xh() {
  if (zm) return Ff;
  zm = 1;
  var f = Di();
  function g(D, j) {
    return D === j && (D !== 0 || 1 / D === 1 / j) || D !== D && j !== j;
  }
  var p = typeof Object.is == "function" ? Object.is : g, o = f.useState, C = f.useEffect, B = f.useLayoutEffect, R = f.useDebugValue;
  function Y(D, j) {
    var $ = j(), cl = o({ inst: { value: $, getSnapshot: j } }), k = cl[0].inst, vl = cl[1];
    return B(
      function() {
        k.value = $, k.getSnapshot = j, N(k) && vl({ inst: k });
      },
      [D, $, j]
    ), C(
      function() {
        return N(k) && vl({ inst: k }), D(function() {
          N(k) && vl({ inst: k });
        });
      },
      [D]
    ), R($), $;
  }
  function N(D) {
    var j = D.getSnapshot;
    D = D.value;
    try {
      var $ = j();
      return !p(D, $);
    } catch {
      return !0;
    }
  }
  function _(D, j) {
    return j();
  }
  var x = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? _ : Y;
  return Ff.useSyncExternalStore = f.useSyncExternalStore !== void 0 ? f.useSyncExternalStore : x, Ff;
}
var Am;
function jh() {
  return Am || (Am = 1, $f.exports = xh()), $f.exports;
}
var Om = jh();
const Xm = 0, Qm = 1, Vm = 2, Dm = 3;
var Nm = Object.prototype.hasOwnProperty;
function us(f, g) {
  var p, o;
  if (f === g) return !0;
  if (f && g && (p = f.constructor) === g.constructor) {
    if (p === Date) return f.getTime() === g.getTime();
    if (p === RegExp) return f.toString() === g.toString();
    if (p === Array) {
      if ((o = f.length) === g.length)
        for (; o-- && us(f[o], g[o]); ) ;
      return o === -1;
    }
    if (!p || typeof f == "object") {
      o = 0;
      for (p in f)
        if (Nm.call(f, p) && ++o && !Nm.call(g, p) || !(p in g) || !us(f[p], g[p])) return !1;
      return Object.keys(g).length === o;
    }
  }
  return f !== f && g !== g;
}
const me = /* @__PURE__ */ new WeakMap(), ve = () => {
}, ut = (
  /*#__NOINLINE__*/
  ve()
), ns = Object, nl = (f) => f === ut, Jt = (f) => typeof f == "function", Ke = (f, g) => ({
  ...f,
  ...g
}), Zm = (f) => Jt(f.then), kf = {}, pi = {}, vs = "undefined", an = typeof window != vs, is = typeof document != vs, Ch = an && "Deno" in window, Hh = () => an && typeof window.requestAnimationFrame != vs, Lm = (f, g) => {
  const p = me.get(f);
  return [
    // Getter
    () => !nl(g) && f.get(g) || kf,
    // Setter
    (o) => {
      if (!nl(g)) {
        const C = f.get(g);
        g in pi || (pi[g] = C), p[5](g, Ke(C, o), C || kf);
      }
    },
    // Subscriber
    p[6],
    // Get server cache snapshot
    () => !nl(g) && g in pi ? pi[g] : !nl(g) && f.get(g) || kf
  ];
};
let cs = !0;
const qh = () => cs, [fs, ss] = an && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  ve,
  ve
], Bh = () => {
  const f = is && document.visibilityState;
  return nl(f) || f !== "hidden";
}, Yh = (f) => (is && document.addEventListener("visibilitychange", f), fs("focus", f), () => {
  is && document.removeEventListener("visibilitychange", f), ss("focus", f);
}), Gh = (f) => {
  const g = () => {
    cs = !0, f();
  }, p = () => {
    cs = !1;
  };
  return fs("online", g), fs("offline", p), () => {
    ss("online", g), ss("offline", p);
  };
}, Xh = {
  isOnline: qh,
  isVisible: Bh
}, Qh = {
  initFocus: Yh,
  initReconnect: Gh
}, Mm = !ms.useId, tu = !an || Ch, Vh = (f) => Hh() ? window.requestAnimationFrame(f) : setTimeout(f, 1), If = tu ? el.useEffect : el.useLayoutEffect, Pf = typeof navigator < "u" && navigator.connection, Rm = !tu && Pf && ([
  "slow-2g",
  "2g"
].includes(Pf.effectiveType) || Pf.saveData), zi = /* @__PURE__ */ new WeakMap(), Zh = (f) => ns.prototype.toString.call(f), ls = (f, g) => f === `[object ${g}]`;
let Lh = 0;
const os = (f) => {
  const g = typeof f, p = Zh(f), o = ls(p, "Date"), C = ls(p, "RegExp"), B = ls(p, "Object");
  let R, Y;
  if (ns(f) === f && !o && !C) {
    if (R = zi.get(f), R) return R;
    if (R = ++Lh + "~", zi.set(f, R), Array.isArray(f)) {
      for (R = "@", Y = 0; Y < f.length; Y++)
        R += os(f[Y]) + ",";
      zi.set(f, R);
    }
    if (B) {
      R = "#";
      const N = ns.keys(f).sort();
      for (; !nl(Y = N.pop()); )
        nl(f[Y]) || (R += Y + ":" + os(f[Y]) + ",");
      zi.set(f, R);
    }
  } else
    R = o ? f.toJSON() : g == "symbol" ? f.toString() : g == "string" ? JSON.stringify(f) : "" + f;
  return R;
}, hs = (f) => {
  if (Jt(f))
    try {
      f = f();
    } catch {
      f = "";
    }
  const g = f;
  return f = typeof f == "string" ? f : (Array.isArray(f) ? f.length : f) ? os(f) : "", [
    f,
    g
  ];
};
let Kh = 0;
const rs = () => ++Kh;
async function Km(...f) {
  const [g, p, o, C] = f, B = Ke({
    populateCache: !0,
    throwOnError: !0
  }, typeof C == "boolean" ? {
    revalidate: C
  } : C || {});
  let R = B.populateCache;
  const Y = B.rollbackOnError;
  let N = B.optimisticData;
  const _ = (j) => typeof Y == "function" ? Y(j) : Y !== !1, x = B.throwOnError;
  if (Jt(p)) {
    const j = p, $ = [], cl = g.keys();
    for (const k of cl)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(k) && j(g.get(k)._k) && $.push(k);
    return Promise.all($.map(D));
  }
  return D(p);
  async function D(j) {
    const [$] = hs(j);
    if (!$) return;
    const [cl, k] = Lm(g, $), [vl, Hl, V, Ul] = me.get(g), I = () => {
      const Gl = vl[$];
      return (Jt(B.revalidate) ? B.revalidate(cl().data, j) : B.revalidate !== !1) && (delete V[$], delete Ul[$], Gl && Gl[0]) ? Gl[0](Vm).then(() => cl().data) : cl().data;
    };
    if (f.length < 3)
      return I();
    let gl = o, pl, L = !1;
    const ql = rs();
    Hl[$] = [
      ql,
      0
    ];
    const sl = !nl(N), gt = cl(), Bl = gt.data, Yl = gt._c, nt = nl(Yl) ? Bl : Yl;
    if (sl && (N = Jt(N) ? N(nt, Bl) : N, k({
      data: N,
      _c: nt
    })), Jt(gl))
      try {
        gl = gl(nt);
      } catch (Gl) {
        pl = Gl, L = !0;
      }
    if (gl && Zm(gl))
      if (gl = await gl.catch((Gl) => {
        pl = Gl, L = !0;
      }), ql !== Hl[$][0]) {
        if (L) throw pl;
        return gl;
      } else L && sl && _(pl) && (R = !0, k({
        data: nt,
        _c: ut
      }));
    if (R && !L)
      if (Jt(R)) {
        const Gl = R(gl, nt);
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
    }), L) {
      if (x) throw pl;
      return;
    }
    return gl;
  }
}
const Um = (f, g) => {
  for (const p in f)
    f[p][0] && f[p][0](g);
}, Jh = (f, g) => {
  if (!me.has(f)) {
    const p = Ke(Qh, g), o = /* @__PURE__ */ Object.create(null), C = Km.bind(ut, f);
    let B = ve;
    const R = /* @__PURE__ */ Object.create(null), Y = (x, D) => {
      const j = R[x] || [];
      return R[x] = j, j.push(D), () => j.splice(j.indexOf(D), 1);
    }, N = (x, D, j) => {
      f.set(x, D);
      const $ = R[x];
      if ($)
        for (const cl of $)
          cl(D, j);
    }, _ = () => {
      if (!me.has(f) && (me.set(f, [
        o,
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        C,
        N,
        Y
      ]), !tu)) {
        const x = p.initFocus(setTimeout.bind(ut, Um.bind(ut, o, Xm))), D = p.initReconnect(setTimeout.bind(ut, Um.bind(ut, o, Qm)));
        B = () => {
          x && x(), D && D(), me.delete(f);
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
    me.get(f)[4]
  ];
}, wh = (f, g, p, o, C) => {
  const B = p.errorRetryCount, R = C.retryCount, Y = ~~((Math.random() + 0.5) * (1 << (R < 8 ? R : 8))) * p.errorRetryInterval;
  !nl(B) && R > B || setTimeout(o, Y, C);
}, Wh = us, [Jm, $h] = Jh(/* @__PURE__ */ new Map()), Fh = Ke(
  {
    // events
    onLoadingSlow: ve,
    onSuccess: ve,
    onError: ve,
    onErrorRetry: wh,
    onDiscarded: ve,
    // switches
    revalidateOnFocus: !0,
    revalidateOnReconnect: !0,
    revalidateIfStale: !0,
    shouldRetryOnError: !0,
    // timeouts
    errorRetryInterval: Rm ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: Rm ? 5e3 : 3e3,
    // providers
    compare: Wh,
    isPaused: () => !1,
    cache: Jm,
    mutate: $h,
    fallback: {}
  },
  // use web preset by default
  Xh
), kh = (f, g) => {
  const p = Ke(f, g);
  if (g) {
    const { use: o, fallback: C } = f, { use: B, fallback: R } = g;
    o && B && (p.use = o.concat(B)), C && R && (p.fallback = Ke(C, R));
  }
  return p;
}, Ih = el.createContext({}), Ph = "$inf$", wm = an && window.__SWR_DEVTOOLS_USE__, ly = wm ? window.__SWR_DEVTOOLS_USE__ : [], ty = () => {
  wm && (window.__SWR_DEVTOOLS_REACT__ = ms);
}, ey = (f) => Jt(f[1]) ? [
  f[0],
  f[1],
  f[2] || {}
] : [
  f[0],
  null,
  (f[1] === null ? f[2] : f[1]) || {}
], ay = () => {
  const f = el.useContext(Ih);
  return el.useMemo(() => Ke(Fh, f), [
    f
  ]);
}, uy = (f) => (g, p, o) => f(g, p && ((...B) => {
  const [R] = hs(g), [, , , Y] = me.get(Jm);
  if (R.startsWith(Ph))
    return p(...B);
  const N = Y[R];
  return nl(N) ? p(...B) : (delete Y[R], N);
}), o), ny = ly.concat(uy), iy = (f) => function(...p) {
  const o = ay(), [C, B, R] = ey(p), Y = kh(o, R);
  let N = f;
  const { use: _ } = Y, x = (_ || []).concat(ny);
  for (let D = x.length; D--; )
    N = x[D](N);
  return N(C, B || Y.fetcher || null, Y);
}, cy = (f, g, p) => {
  const o = g[f] || (g[f] = []);
  return o.push(p), () => {
    const C = o.indexOf(p);
    C >= 0 && (o[C] = o[o.length - 1], o.pop());
  };
};
ty();
const ts = ms.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
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
      throw f.status = "pending", f.then((g) => {
        f.status = "fulfilled", f.value = g;
      }, (g) => {
        f.status = "rejected", f.reason = g;
      }), f;
  }
}), es = {
  dedupe: !0
}, xm = Promise.resolve(ut), fy = () => ve, sy = (f, g, p) => {
  const { cache: o, compare: C, suspense: B, fallbackData: R, revalidateOnMount: Y, revalidateIfStale: N, refreshInterval: _, refreshWhenHidden: x, refreshWhenOffline: D, keepPreviousData: j, strictServerPrefetchWarning: $ } = p, [cl, k, vl, Hl] = me.get(o), [V, Ul] = hs(f), I = el.useRef(!1), gl = el.useRef(!1), pl = el.useRef(V), L = el.useRef(g), ql = el.useRef(p), sl = () => ql.current, gt = () => sl().isVisible() && sl().isOnline(), [Bl, Yl, nt, Gl] = Lm(o, V), $l = el.useRef({}).current, E = nl(R) ? nl(p.fallback) ? ut : p.fallback[V] : R, U = (Sl, Ml) => {
    for (const zl in $l) {
      const Al = zl;
      if (Al === "data") {
        if (!C(Sl[Al], Ml[Al]) && (!nl(Sl[Al]) || !C(w, Ml[Al])))
          return !1;
      } else if (Ml[Al] !== Sl[Al])
        return !1;
    }
    return !0;
  }, Q = !I.current, dl = el.useMemo(() => {
    const Sl = Bl(), Ml = Gl(), zl = (Ql) => {
      const Ol = Ke(Ql);
      return delete Ol._k, (() => {
        if (!V || !g || sl().isPaused()) return !1;
        if (Q && !nl(Y)) return Y;
        const ye = nl(E) ? Ol.data : E;
        return nl(ye) || N;
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
        return U(Ql, ft) ? (ft.data = Ql.data, ft.isLoading = Ql.isLoading, ft.isValidating = Ql.isValidating, ft.error = Ql.error, ft) : (ft = Ql, Ql);
      },
      () => ct
    ];
  }, [
    o,
    V
  ]), fl = Om.useSyncExternalStore(el.useCallback(
    (Sl) => nt(V, (Ml, zl) => {
      U(zl, Ml) || Sl();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      o,
      V
    ]
  ), dl[0], dl[1]), d = cl[V] && cl[V].length > 0, A = fl.data, M = nl(A) ? E && Zm(E) ? ts(E) : E : A, H = fl.error, K = el.useRef(M), w = j ? nl(A) ? nl(K.current) ? M : K.current : A : M, P = V && nl(M), Xl = el.useRef(null);
  !tu && // getServerSnapshot is only called during hydration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Om.useSyncExternalStore(fy, () => (Xl.current = !1, Xl), () => (Xl.current = !0, Xl));
  const xl = Xl.current;
  $ && xl && !B && P && console.warn(`Missing pre-initiated data for serialized key "${V}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
  const he = !V || !g || sl().isPaused() || d && !nl(H) ? !1 : Q && !nl(Y) ? Y : B ? nl(M) ? !1 : N : nl(M) || N, Je = Q && he, eu = nl(fl.isValidating) ? Je : fl.isValidating, un = nl(fl.isLoading) ? Je : fl.isLoading, St = el.useCallback(
    async (Sl) => {
      const Ml = L.current;
      if (!V || !Ml || gl.current || sl().isPaused())
        return !1;
      let zl, Al, ct = !0;
      const ft = Sl || {}, Ql = !vl[V] || !ft.dedupe, Ol = () => Mm ? !gl.current && V === pl.current && I.current : V === pl.current, we = {
        isValidating: !1,
        isLoading: !1
      }, ye = () => {
        Yl(we);
      }, au = () => {
        const st = vl[V];
        st && st[1] === Al && delete vl[V];
      }, We = {
        isValidating: !0
      };
      nl(Bl().data) && (We.isLoading = !0);
      try {
        if (Ql && (Yl(We), p.loadingTimeout && nl(Bl().data) && setTimeout(() => {
          ct && Ol() && sl().onLoadingSlow(V, p);
        }, p.loadingTimeout), vl[V] = [
          Ml(Ul),
          rs()
        ]), [zl, Al] = vl[V], zl = await zl, Ql && setTimeout(au, p.dedupingInterval), !vl[V] || vl[V][1] !== Al)
          return Ql && Ol() && sl().onDiscarded(V), !1;
        we.error = ut;
        const st = k[V];
        if (!nl(st) && // case 1
        (Al <= st[0] || // case 2
        Al <= st[1] || // case 3
        st[1] === 0))
          return ye(), Ql && Ol() && sl().onDiscarded(V), !1;
        const Nt = Bl().data;
        we.data = C(Nt, zl) ? Nt : zl, Ql && Ol() && sl().onSuccess(zl, V, p);
      } catch (st) {
        au();
        const Nt = sl(), { shouldRetryOnError: uu } = Nt;
        Nt.isPaused() || (we.error = st, Ql && Ol() && (Nt.onError(st, V, Nt), (uu === !0 || Jt(uu) && uu(st)) && (!sl().revalidateOnFocus || !sl().revalidateOnReconnect || gt()) && Nt.onErrorRetry(st, V, Nt, (Mi) => {
          const Wt = cl[V];
          Wt && Wt[0] && Wt[0](Dm, Mi);
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
      o
    ]
  ), ha = el.useCallback(
    // Use callback to make sure `keyRef.current` returns latest result every time
    (...Sl) => Km(o, pl.current, ...Sl),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (If(() => {
    L.current = g, ql.current = p, nl(A) || (K.current = A);
  }), If(() => {
    if (!V) return;
    const Sl = St.bind(ut, es);
    let Ml = 0;
    sl().revalidateOnFocus && (Ml = Date.now() + sl().focusThrottleInterval);
    const Al = cy(V, cl, (ct, ft = {}) => {
      if (ct == Xm) {
        const Ql = Date.now();
        sl().revalidateOnFocus && Ql > Ml && gt() && (Ml = Ql + sl().focusThrottleInterval, Sl());
      } else if (ct == Qm)
        sl().revalidateOnReconnect && gt() && Sl();
      else {
        if (ct == Vm)
          return St();
        if (ct == Dm)
          return St(ft);
      }
    });
    return gl.current = !1, pl.current = V, I.current = !0, Yl({
      _k: Ul
    }), he && (vl[V] || (nl(M) || tu ? Sl() : Vh(Sl))), () => {
      gl.current = !0, Al();
    };
  }, [
    V
  ]), If(() => {
    let Sl;
    function Ml() {
      const Al = Jt(_) ? _(Bl().data) : _;
      Al && Sl !== -1 && (Sl = setTimeout(zl, Al));
    }
    function zl() {
      !Bl().error && (x || sl().isVisible()) && (D || sl().isOnline()) ? St(es).then(Ml) : Ml();
    }
    return Ml(), () => {
      Sl && (clearTimeout(Sl), Sl = -1);
    };
  }, [
    _,
    x,
    D,
    V
  ]), el.useDebugValue(w), B) {
    if (!Mm && tu && P)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    P && (L.current = g, ql.current = p, gl.current = !1);
    const Sl = Hl[V], Ml = !nl(Sl) && P ? ha(Sl) : xm;
    if (ts(Ml), !nl(H) && P)
      throw H;
    const zl = P ? St(es) : xm;
    !nl(w) && P && (zl.status = "fulfilled", zl.value = !0), ts(zl);
  }
  return {
    mutate: ha,
    get data() {
      return $l.data = !0, w;
    },
    get error() {
      return $l.error = !0, H;
    },
    get isValidating() {
      return $l.isValidating = !0, eu;
    },
    get isLoading() {
      return $l.isLoading = !0, un;
    }
  };
}, Ai = iy(sy), Wm = "/api/v1/extensions/nexus.video.ltx23";
async function Le(f, g) {
  const p = await fetch(`${Wm}${f}`, {
    headers: { "Content-Type": "application/json", ...g?.headers ?? {} },
    ...g
  });
  if (!p.ok) {
    const o = await p.text();
    throw new Error(`${p.status} ${p.statusText}: ${o}`);
  }
  return await p.json();
}
const Iu = {
  health: () => Le("/health"),
  listProfiles: () => Le("/runtime-profiles"),
  plan: (f) => Le("/recipe/plan", {
    method: "POST",
    body: JSON.stringify(f)
  }),
  createRender: (f) => Le(
    "/renders",
    { method: "POST", body: JSON.stringify(f) }
  ),
  getRender: (f) => Le(`/renders/${f}`),
  cancel: (f) => Le(`/renders/${f}/cancel`, { method: "POST" })
};
function oy(f) {
  return `${Wm}/artifacts/${f}`;
}
const ry = "/api/v1", jm = "nexus.video.ltx23";
async function Cm(f, g) {
  const p = await fetch(`${ry}${f}`, {
    headers: { "Content-Type": "application/json", ...g?.headers ?? {} },
    ...g
  });
  if (!p.ok) {
    const C = await p.text();
    throw new Error(`${p.status}: ${C}`);
  }
  return (await p.json()).data;
}
const Hm = {
  listDependencies: () => Cm(`/extensions/${jm}/dependencies`),
  startInstall: (f = !1) => Cm(
    `/extensions/${jm}/install${f ? "?force=true" : ""}`,
    { method: "POST" }
  )
}, qm = {
  status: (f) => Le(`/profiles/${f}/install`),
  start: (f) => Le(`/profiles/${f}/install`, {
    method: "POST"
  })
};
var dy = "_1vmg9ib0", Pu = "_1vmg9ib1", ln = "_1vmg9ib2", my = "_1vmg9ib3", va = "_1vmg9ib4", lu = "_1vmg9ib5", as = "_1vmg9ib6", vy = "_1vmg9ib7 _1vmg9ib6", Bm = "_1vmg9ib8 _1vmg9ib6", Ym = "_1vmg9ib9", ys = "_1vmg9iba", $m = "_1vmg9ibb _1vmg9iba", hy = "_1vmg9ibc _1vmg9iba", Ni = "_1vmg9ibd", Ve = "_1vmg9ibe", Ze = "_1vmg9ibf", ma = "_1vmg9ibg", Fm = "_1vmg9ibi _1vmg9ibh", km = "_1vmg9ibj _1vmg9ibh", Im = "_1vmg9ibk _1vmg9ibh", Pm = "_1vmg9ibl _1vmg9ibh", tn = "_1vmg9ibm", en = "_1vmg9ibn", yy = "_1vmg9ibo", gy = "_1vmg9ibp", ds = "_1vmg9ibr _1vmg9ibq", lv = "_1vmg9ibs _1vmg9ibq", tv = "_1vmg9ibt _1vmg9ibq", ev = "_1vmg9ibu _1vmg9ibq", Sy = "_1vmg9ibv", by = "_1vmg9ibw", Ey = "_1vmg9ibx", _y = "_1vmg9iby", Ty = "_1vmg9ibz _1vmg9iba", wt = "_1vmg9ib10", py = "_1vmg9ib11", zy = "_1vmg9ib12", Ay = "_1vmg9ib13", Oy = "_1vmg9ib14", Dy = "_1vmg9ib15", Ny = "_1vmg9ib16", My = "_1vmg9ib17", Ry = "_1vmg9ib18";
const Uy = {
  prompt: "a slow cinematic dolly shot over a futuristic city at dusk",
  duration_seconds: 6,
  runtime_profile: "auto",
  quality_preset: "balanced_16gb"
};
function xy() {
  const [f, g] = el.useState(Uy), [p, o] = el.useState(null), [C, B] = el.useState(null), [R, Y] = el.useState(!1), [N, _] = el.useState(null), [x, D] = el.useState(null), [j, $] = el.useState(!1), { data: cl } = Ai(
    "/runtime-profiles",
    () => Iu.listProfiles(),
    { revalidateOnFocus: !1 }
  ), { data: k, mutate: vl } = Ai(
    N ? `/renders/${N}` : null,
    () => N ? Iu.getRender(N) : Promise.resolve(null),
    {
      refreshInterval: (I) => I ? I.status === "completed" || I.status === "failed" || I.status === "cancelled" ? 0 : 600 : 1e3
    }
  ), Hl = el.useCallback(async () => {
    Y(!0), B(null);
    try {
      const I = await Iu.plan(f);
      o(I);
    } catch (I) {
      B(I instanceof Error ? I.message : String(I)), o(null);
    } finally {
      Y(!1);
    }
  }, [f]), V = el.useCallback(async () => {
    $(!0), D(null);
    try {
      const I = await Iu.createRender(f);
      _(I.id), vl();
    } catch (I) {
      D(I instanceof Error ? I.message : String(I));
    } finally {
      $(!1);
    }
  }, [f, vl]), Ul = el.useCallback(async () => {
    if (N)
      try {
        await Iu.cancel(N), vl();
      } catch (I) {
        console.error("cancel failed", I);
      }
  }, [N, vl]);
  return /* @__PURE__ */ b.jsxs("div", { className: dy, children: [
    /* @__PURE__ */ b.jsxs("div", { className: zy, children: [
      /* @__PURE__ */ b.jsx(jy, {}),
      /* @__PURE__ */ b.jsx(
        qy,
        {
          draft: f,
          onChange: g,
          profiles: cl ?? [],
          onPlan: Hl,
          onSubmit: V,
          planning: R,
          submitting: j,
          plan: p,
          planError: C,
          submitError: x
        }
      )
    ] }),
    /* @__PURE__ */ b.jsx(Vy, { run: k ?? null, onCancel: Ul })
  ] });
}
function jy() {
  const [f, g] = el.useState(!1), [p, o] = el.useState(null), { data: C, mutate: B } = Ai(
    "host:dependencies",
    () => Hm.listDependencies(),
    {
      refreshInterval: (x) => x ? x.steps.some(
        (j) => j.status === "running" || j.status === "pending"
      ) ? 1e3 : 5e3 : 1500
    }
  ), R = el.useCallback(
    async (x = !1) => {
      g(!0), o(null);
      try {
        await Hm.startInstall(x), B();
      } catch (D) {
        o(D instanceof Error ? D.message : String(D));
      } finally {
        g(!1);
      }
    },
    [B]
  );
  if (!C) return null;
  const Y = C.steps.find((x) => x.status === "failed"), N = C.all_satisfied, _ = C.steps.some(
    (x) => x.status === "running" || !N && x.status === "pending"
  );
  return /* @__PURE__ */ b.jsxs("section", { className: Pu, children: [
    /* @__PURE__ */ b.jsxs("div", { className: Ay, children: [
      /* @__PURE__ */ b.jsx("h3", { className: ln, style: { fontSize: "15px" }, children: "Runtime" }),
      /* @__PURE__ */ b.jsx("span", { className: Cy(N, !!Y, _), children: N ? "ready" : Y ? "install failed" : _ ? "installing…" : "not installed" })
    ] }),
    /* @__PURE__ */ b.jsx("ul", { className: Oy, children: C.steps.map((x) => /* @__PURE__ */ b.jsxs("li", { className: Dy, children: [
      /* @__PURE__ */ b.jsx("span", { className: Hy(x.status) }),
      /* @__PURE__ */ b.jsx("span", { children: x.id }),
      /* @__PURE__ */ b.jsx("span", { className: wt, children: x.artifact?.summary ?? x.status })
    ] }, x.id)) }),
    Y?.last_error ? /* @__PURE__ */ b.jsxs("div", { className: en, children: [
      /* @__PURE__ */ b.jsxs("strong", { children: [
        Y.id,
        " failed"
      ] }),
      ": ",
      Y.last_error.message
    ] }) : null,
    p ? /* @__PURE__ */ b.jsx("div", { className: en, children: p }) : null,
    !N || Y ? /* @__PURE__ */ b.jsxs("div", { className: Ni, children: [
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: ys,
          disabled: f || _,
          onClick: () => void R(!1),
          children: _ || f ? "Installing…" : "Install runtime"
        }
      ),
      Y ? /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: $m,
          disabled: f || _,
          onClick: () => void R(!0),
          children: "Force reinstall"
        }
      ) : null
    ] }) : null
  ] });
}
function Cy(f, g, p) {
  return g ? Pm : f ? Fm : p ? km : Im;
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
      return ds;
  }
}
function qy({
  draft: f,
  onChange: g,
  profiles: p,
  onPlan: o,
  onSubmit: C,
  planning: B,
  submitting: R,
  plan: Y,
  planError: N,
  submitError: _
}) {
  const x = el.useCallback(
    (D, j) => g({ ...f, [D]: j }),
    [f, g]
  );
  return /* @__PURE__ */ b.jsxs("section", { className: Pu, children: [
    /* @__PURE__ */ b.jsx("h2", { className: ln, children: "LTX 2.3 Video Generator" }),
    /* @__PURE__ */ b.jsx("p", { className: my, children: "Prompt-driven video synthesis · external-segments mode · 16 GB safe defaults" }),
    /* @__PURE__ */ b.jsxs("div", { className: va, children: [
      /* @__PURE__ */ b.jsx("label", { className: lu, htmlFor: "ltx-prompt", children: "Prompt" }),
      /* @__PURE__ */ b.jsx(
        "textarea",
        {
          id: "ltx-prompt",
          className: vy,
          value: f.prompt,
          onChange: (D) => x("prompt", D.target.value),
          placeholder: "describe the scene…"
        }
      )
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: va, children: [
      /* @__PURE__ */ b.jsx("label", { className: lu, htmlFor: "ltx-neg", children: "Negative prompt (optional)" }),
      /* @__PURE__ */ b.jsx(
        "input",
        {
          id: "ltx-neg",
          className: as,
          value: f.negative_prompt ?? "",
          onChange: (D) => x(
            "negative_prompt",
            D.target.value.length > 0 ? D.target.value : void 0
          ),
          placeholder: "flicker, watermark, distortion…"
        }
      )
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: Ym, children: [
      /* @__PURE__ */ b.jsxs("div", { className: va, children: [
        /* @__PURE__ */ b.jsx("label", { className: lu, htmlFor: "ltx-duration", children: "Duration (s)" }),
        /* @__PURE__ */ b.jsx(
          "input",
          {
            id: "ltx-duration",
            className: as,
            type: "number",
            min: 1,
            max: 300,
            value: f.duration_seconds,
            onChange: (D) => x(
              "duration_seconds",
              Math.max(1, Math.min(300, Number(D.target.value) || 1))
            )
          }
        )
      ] }),
      /* @__PURE__ */ b.jsxs("div", { className: va, children: [
        /* @__PURE__ */ b.jsx("label", { className: lu, htmlFor: "ltx-seed", children: "Seed (optional)" }),
        /* @__PURE__ */ b.jsx(
          "input",
          {
            id: "ltx-seed",
            className: as,
            type: "number",
            value: f.seed ?? "",
            onChange: (D) => {
              const j = D.target.value;
              x("seed", j === "" ? void 0 : Number(j));
            },
            placeholder: "leave blank for random"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: Ym, children: [
      /* @__PURE__ */ b.jsxs("div", { className: va, children: [
        /* @__PURE__ */ b.jsx("label", { className: lu, htmlFor: "ltx-runtime", children: "Runtime" }),
        /* @__PURE__ */ b.jsxs(
          "select",
          {
            id: "ltx-runtime",
            className: Bm,
            value: f.runtime_profile,
            onChange: (D) => x(
              "runtime_profile",
              D.target.value
            ),
            children: [
              /* @__PURE__ */ b.jsx("option", { value: "auto", children: "Auto (recommended)" }),
              /* @__PURE__ */ b.jsx("option", { value: "rtx40-fp8", children: "RTX 40 FP8" }),
              /* @__PURE__ */ b.jsx("option", { value: "rtx50-fp8", children: "RTX 50 FP8 (Blackwell)" }),
              /* @__PURE__ */ b.jsx("option", { value: "rtx50-nvfp4", children: "RTX 50 NVFP4 (experimental)" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ b.jsxs("div", { className: va, children: [
        /* @__PURE__ */ b.jsx("label", { className: lu, htmlFor: "ltx-quality", children: "Quality" }),
        /* @__PURE__ */ b.jsxs(
          "select",
          {
            id: "ltx-quality",
            className: Bm,
            value: f.quality_preset,
            onChange: (D) => x("quality_preset", D.target.value),
            children: [
              /* @__PURE__ */ b.jsx("option", { value: "draft", children: "Draft (fastest)" }),
              /* @__PURE__ */ b.jsx("option", { value: "balanced_16gb", children: "Balanced 16 GB" }),
              /* @__PURE__ */ b.jsx("option", { value: "quality_16gb", children: "Quality 16 GB" }),
              /* @__PURE__ */ b.jsx("option", { value: "high", children: "High (24 GB+)" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ b.jsx(Xy, { profiles: p, selected: f.runtime_profile }),
    /* @__PURE__ */ b.jsx(By, { selected: f.runtime_profile }),
    /* @__PURE__ */ b.jsxs("div", { className: Ni, children: [
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: $m,
          onClick: o,
          disabled: B || R || f.prompt.trim().length === 0,
          children: B ? "Planning…" : "Preview plan"
        }
      ),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: ys,
          onClick: C,
          disabled: R || f.prompt.trim().length === 0,
          children: R ? "Submitting…" : "Generate video"
        }
      )
    ] }),
    N ? /* @__PURE__ */ b.jsx("div", { className: en, children: N }) : null,
    _ ? /* @__PURE__ */ b.jsx("div", { className: en, children: _ }) : null,
    Y ? /* @__PURE__ */ b.jsx(Qy, { plan: Y }) : null
  ] });
}
function By({
  selected: f
}) {
  const g = Gy(f), [p, o] = el.useState(!1), [C, B] = el.useState(null), { data: R, mutate: Y } = Ai(
    g ? `profile-install:${g}` : null,
    () => g ? qm.status(g) : Promise.resolve(null),
    {
      refreshInterval: (j) => j && j.in_flight ? 2e3 : 0
    }
  ), N = el.useCallback(async () => {
    if (g) {
      o(!0), B(null);
      try {
        await qm.start(g), Y();
      } catch (j) {
        B(j instanceof Error ? j.message : String(j));
      } finally {
        o(!1);
      }
    }
  }, [g, Y]);
  if (!g || !R) return null;
  if (R.installed)
    return /* @__PURE__ */ b.jsxs("div", { className: tn, children: [
      /* @__PURE__ */ b.jsx("strong", { children: "Runtime installed" }),
      " · ",
      R.repo
    ] });
  const _ = R.in_flight || p, x = av(R.phase), D = _ ? x ?? "Installing…" : "Install runtime & download weights";
  return /* @__PURE__ */ b.jsxs("div", { className: tn, children: [
    /* @__PURE__ */ b.jsx("strong", { children: "Runtime not installed" }),
    ": ",
    R.repo ?? "unknown repo",
    /* @__PURE__ */ b.jsxs("div", { className: wt, style: { marginTop: 4 }, children: [
      "Resolves the diffusers extras (torch · diffusers · accelerate) via",
      " ",
      /* @__PURE__ */ b.jsx("code", { children: "uv sync --extra diffusers" }),
      ", then downloads weights from Hugging Face into ",
      R.dest ?? "<host_data_dir>/models/…",
      "."
    ] }),
    R.last_error ? /* @__PURE__ */ b.jsxs("div", { className: wt, style: { marginTop: 4, color: "#e57373" }, children: [
      "Last error: ",
      R.last_error
    ] }) : null,
    C ? /* @__PURE__ */ b.jsx("div", { className: wt, style: { marginTop: 4, color: "#e57373" }, children: C }) : null,
    /* @__PURE__ */ b.jsx("div", { className: Ni, style: { marginTop: 8 }, children: /* @__PURE__ */ b.jsx(
      "button",
      {
        type: "button",
        className: ys,
        disabled: _,
        onClick: () => void N(),
        children: D
      }
    ) }),
    /* @__PURE__ */ b.jsx(
      Yy,
      {
        phase: R.phase,
        recentProgress: R.recent_progress
      }
    )
  ] });
}
function av(f) {
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
  recentProgress: g
}) {
  if (!f && g.length === 0) return null;
  const p = av(f);
  return /* @__PURE__ */ b.jsxs("details", { className: Ny, children: [
    /* @__PURE__ */ b.jsxs("summary", { className: My, children: [
      "Install progress",
      p ? /* @__PURE__ */ b.jsxs("span", { className: wt, children: [
        " · ",
        p
      ] }) : null,
      g.length > 0 ? /* @__PURE__ */ b.jsxs("span", { className: wt, children: [
        " · ",
        g.length,
        " lines"
      ] }) : null
    ] }),
    g.length === 0 ? /* @__PURE__ */ b.jsx("p", { className: wt, style: { marginTop: 6 }, children: "No output captured yet." }) : /* @__PURE__ */ b.jsx("pre", { className: Ry, children: g.join(`
`) })
  ] });
}
function Gy(f) {
  return f === "auto" ? null : f;
}
function Xy({
  profiles: f,
  selected: g
}) {
  if (f.length === 0) return null;
  const p = g === "auto" ? "nexus.video.ltx23.fake" : `nexus.video.ltx23.${g}`, o = f.find((B) => B.runtime_id === p);
  if (!o) return null;
  const C = o.healthy ? "ok" : "warn";
  return /* @__PURE__ */ b.jsxs("div", { className: tn, children: [
    /* @__PURE__ */ b.jsx("strong", { children: o.display_name }),
    ": ",
    o.status_message,
    o.experimental ? " (experimental)" : null
  ] });
}
function Qy({ plan: f }) {
  const g = f.vram_risk === "safe" ? Fm : f.vram_risk === "moderate" ? km : f.vram_risk === "risky" ? Im : Pm;
  return /* @__PURE__ */ b.jsxs("div", { className: Pu, style: { background: "transparent", padding: 0 }, children: [
    /* @__PURE__ */ b.jsx("h3", { className: ln, style: { fontSize: "15px" }, children: "Render plan" }),
    /* @__PURE__ */ b.jsxs("div", { className: Ve, children: [
      /* @__PURE__ */ b.jsx("span", { className: Ze, children: "Mode" }),
      /* @__PURE__ */ b.jsx("span", { className: ma, children: f.mode })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: Ve, children: [
      /* @__PURE__ */ b.jsx("span", { className: Ze, children: "Segments" }),
      /* @__PURE__ */ b.jsx("span", { className: ma, children: f.segment_count })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: Ve, children: [
      /* @__PURE__ */ b.jsx("span", { className: Ze, children: "Resolution" }),
      /* @__PURE__ */ b.jsxs("span", { className: ma, children: [
        f.width,
        "×",
        f.height
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: Ve, children: [
      /* @__PURE__ */ b.jsx("span", { className: Ze, children: "FPS" }),
      /* @__PURE__ */ b.jsxs("span", { className: ma, children: [
        f.base_fps,
        " → ",
        f.output_fps,
        " (",
        f.interpolation,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: Ve, children: [
      /* @__PURE__ */ b.jsx("span", { className: Ze, children: "Duration" }),
      /* @__PURE__ */ b.jsxs("span", { className: ma, children: [
        f.requested_duration_seconds.toFixed(1),
        "s"
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: Ve, children: [
      /* @__PURE__ */ b.jsx("span", { className: Ze, children: "VRAM budget" }),
      /* @__PURE__ */ b.jsxs("span", { className: ma, children: [
        f.gpu_memory_budget_mb,
        " MB"
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: Ve, children: [
      /* @__PURE__ */ b.jsx("span", { className: Ze, children: "VRAM risk" }),
      /* @__PURE__ */ b.jsx("span", { className: g, children: f.vram_risk })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: Ve, children: [
      /* @__PURE__ */ b.jsx("span", { className: Ze, children: "Runtime" }),
      /* @__PURE__ */ b.jsx("span", { className: ma, children: f.runtime_profile })
    ] }),
    f.warnings.length > 0 ? /* @__PURE__ */ b.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: f.warnings.map((p) => /* @__PURE__ */ b.jsxs("div", { className: tn, children: [
      /* @__PURE__ */ b.jsx("strong", { children: p.code }),
      ": ",
      p.message
    ] }, p.code)) }) : null
  ] });
}
function Vy({
  run: f,
  onCancel: g
}) {
  if (!f)
    return /* @__PURE__ */ b.jsxs("section", { className: Pu, children: [
      /* @__PURE__ */ b.jsx("h2", { className: ln, children: "Output" }),
      /* @__PURE__ */ b.jsx("p", { className: py, children: "No render in progress yet. Configure the form on the left and press “Generate video”." })
    ] });
  const p = f.status === "completed" || f.status === "failed" || f.status === "cancelled";
  return /* @__PURE__ */ b.jsxs("section", { className: Pu, children: [
    /* @__PURE__ */ b.jsxs("h2", { className: ln, children: [
      "Render ",
      wy(f.id)
    ] }),
    /* @__PURE__ */ b.jsxs("p", { className: wt, children: [
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
    /* @__PURE__ */ b.jsx(Zy, { run: f }),
    f.error_code ? /* @__PURE__ */ b.jsxs("div", { className: en, children: [
      /* @__PURE__ */ b.jsx("strong", { children: f.error_code }),
      ":",
      " ",
      f.error_message ?? "unknown error"
    ] }) : null,
    /* @__PURE__ */ b.jsx(Ly, { segments: f.segments }),
    f.status === "completed" && f.final_artifact_id ? /* @__PURE__ */ b.jsx(Jy, { artifactId: f.final_artifact_id }) : null,
    p ? null : /* @__PURE__ */ b.jsx("div", { className: Ni, children: /* @__PURE__ */ b.jsx(
      "button",
      {
        type: "button",
        className: hy,
        onClick: g,
        children: "Cancel"
      }
    ) })
  ] });
}
function Zy({ run: f }) {
  return /* @__PURE__ */ b.jsxs("div", { className: va, children: [
    /* @__PURE__ */ b.jsxs(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13
        },
        children: [
          /* @__PURE__ */ b.jsx("span", { children: /* @__PURE__ */ b.jsx("strong", { children: f.status }) }),
          /* @__PURE__ */ b.jsxs("span", { children: [
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
    /* @__PURE__ */ b.jsx("div", { className: Sy, children: /* @__PURE__ */ b.jsx(
      "div",
      {
        className: by,
        style: { width: `${Math.max(2, f.progress_percent)}%` }
      }
    ) })
  ] });
}
function Ly({
  segments: f
}) {
  return /* @__PURE__ */ b.jsx("div", { className: yy, children: f.map((g) => /* @__PURE__ */ b.jsxs("div", { className: gy, children: [
    /* @__PURE__ */ b.jsx("span", { className: Ky(g.status) }),
    /* @__PURE__ */ b.jsxs("span", { children: [
      "Segment ",
      g.index + 1,
      " · ",
      g.duration_seconds.toFixed(1),
      "s"
    ] }),
    /* @__PURE__ */ b.jsx("span", { className: wt, children: g.status })
  ] }, g.index)) });
}
function Ky(f) {
  switch (f) {
    case "queued":
      return ds;
    case "rendering":
      return lv;
    case "completed":
      return tv;
    case "failed":
      return ev;
    default:
      return ds;
  }
}
function Jy({ artifactId: f }) {
  const g = oy(f);
  return /* @__PURE__ */ b.jsxs("div", { className: Ey, children: [
    /* @__PURE__ */ b.jsx("video", { className: _y, src: g, controls: !0, preload: "metadata" }),
    /* @__PURE__ */ b.jsx(
      "a",
      {
        className: Ty,
        href: g,
        download: `${f}.mp4`,
        children: "Download MP4"
      }
    ),
    /* @__PURE__ */ b.jsxs("p", { className: wt, children: [
      "artifact: ",
      f
    ] })
  ] });
}
function wy(f) {
  return f.length > 12 ? `${f.slice(0, 6)}…${f.slice(-4)}` : f;
}
const Oi = "ltx23-video-app", Gm = "ltx23-video-stylesheet";
function Wy() {
  if (typeof document > "u" || document.getElementById(Gm)) return;
  const f = new URL("./ltx23-video.css", import.meta.url).href, g = document.createElement("link");
  g.id = Gm, g.rel = "stylesheet", g.href = f, document.head.appendChild(g);
}
Wy();
class uv extends HTMLElement {
  root = null;
  connectedCallback() {
    this.root = Uh.createRoot(this), this.paint();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null;
  }
  paint() {
    this.root && this.root.render(
      /* @__PURE__ */ b.jsx(el.StrictMode, { children: /* @__PURE__ */ b.jsx(xy, {}) })
    );
  }
}
customElements.get(Oi) || customElements.define(Oi, uv);
function $y() {
  customElements.get(Oi) || customElements.define(Oi, uv);
}
export {
  $y as register
};
//# sourceMappingURL=ltx23-video.js.map
