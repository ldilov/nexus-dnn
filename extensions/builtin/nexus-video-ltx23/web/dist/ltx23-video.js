function A0(f) {
  return f && f.__esModule && Object.prototype.hasOwnProperty.call(f, "default") ? f.default : f;
}
var Kf = { exports: {} }, Iu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sm;
function N0() {
  if (Sm) return Iu;
  Sm = 1;
  var f = Symbol.for("react.transitional.element"), b = Symbol.for("react.fragment");
  function p(o, R, U) {
    var M = null;
    if (U !== void 0 && (M = "" + U), R.key !== void 0 && (M = "" + R.key), "key" in R) {
      U = {};
      for (var B in R)
        B !== "key" && (U[B] = R[B]);
    } else U = R;
    return R = U.ref, {
      $$typeof: f,
      type: o,
      key: M,
      ref: R !== void 0 ? R : null,
      props: U
    };
  }
  return Iu.Fragment = b, Iu.jsx = p, Iu.jsxs = p, Iu;
}
var bm;
function O0() {
  return bm || (bm = 1, Kf.exports = N0()), Kf.exports;
}
var m = O0(), Jf = { exports: {} }, w = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var pm;
function D0() {
  if (pm) return w;
  pm = 1;
  var f = Symbol.for("react.transitional.element"), b = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), R = Symbol.for("react.profiler"), U = Symbol.for("react.consumer"), M = Symbol.for("react.context"), B = Symbol.for("react.forward_ref"), D = Symbol.for("react.suspense"), g = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), z = Symbol.for("react.activity"), H = Symbol.iterator;
  function Z(d) {
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
  }, I = Object.assign, vl = {};
  function Hl(d, N, j) {
    this.props = d, this.context = N, this.refs = vl, this.updater = j || cl;
  }
  Hl.prototype.isReactComponent = {}, Hl.prototype.setState = function(d, N) {
    if (typeof d != "object" && typeof d != "function" && d != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, d, N, "setState");
  }, Hl.prototype.forceUpdate = function(d) {
    this.updater.enqueueForceUpdate(this, d, "forceUpdate");
  };
  function V() {
  }
  V.prototype = Hl.prototype;
  function jl(d, N, j) {
    this.props = d, this.context = N, this.refs = vl, this.updater = j || cl;
  }
  var P = jl.prototype = new V();
  P.constructor = jl, I(P, Hl.prototype), P.isPureReactComponent = !0;
  var gl = Array.isArray;
  function Tl() {
  }
  var K = { H: null, A: null, T: null, S: null }, ql = Object.prototype.hasOwnProperty;
  function sl(d, N, j) {
    var q = j.ref;
    return {
      $$typeof: f,
      type: d,
      key: N,
      ref: q !== void 0 ? q : null,
      props: j
    };
  }
  function bt(d, N) {
    return sl(d.type, N, d.props);
  }
  function Bl(d) {
    return typeof d == "object" && d !== null && d.$$typeof === f;
  }
  function Yl(d) {
    var N = { "=": "=0", ":": "=2" };
    return "$" + d.replace(/[=:]/g, function(j) {
      return N[j];
    });
  }
  var it = /\/+/g;
  function Gl(d, N) {
    return typeof d == "object" && d !== null && d.key != null ? Yl("" + d.key) : N.toString(36);
  }
  function Wl(d) {
    switch (d.status) {
      case "fulfilled":
        return d.value;
      case "rejected":
        throw d.reason;
      default:
        switch (typeof d.status == "string" ? d.then(Tl, Tl) : (d.status = "pending", d.then(
          function(N) {
            d.status === "pending" && (d.status = "fulfilled", d.value = N);
          },
          function(N) {
            d.status === "pending" && (d.status = "rejected", d.reason = N);
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
  function E(d, N, j, q, J) {
    var $ = typeof d;
    ($ === "undefined" || $ === "boolean") && (d = null);
    var ll = !1;
    if (d === null) ll = !0;
    else
      switch ($) {
        case "bigint":
        case "string":
        case "number":
          ll = !0;
          break;
        case "object":
          switch (d.$$typeof) {
            case f:
            case b:
              ll = !0;
              break;
            case x:
              return ll = d._init, E(
                ll(d._payload),
                N,
                j,
                q,
                J
              );
          }
      }
    if (ll)
      return J = J(d), ll = q === "" ? "." + Gl(d, 0) : q, gl(J) ? (j = "", ll != null && (j = ll.replace(it, "$&/") + "/"), E(J, N, j, "", function(Se) {
        return Se;
      })) : J != null && (Bl(J) && (J = bt(
        J,
        j + (J.key == null || d && d.key === J.key ? "" : ("" + J.key).replace(
          it,
          "$&/"
        ) + "/") + ll
      )), N.push(J)), 1;
    ll = 0;
    var Xl = q === "" ? "." : q + ":";
    if (gl(d))
      for (var Rl = 0; Rl < d.length; Rl++)
        q = d[Rl], $ = Xl + Gl(q, Rl), ll += E(
          q,
          N,
          j,
          $,
          J
        );
    else if (Rl = Z(d), typeof Rl == "function")
      for (d = Rl.call(d), Rl = 0; !(q = d.next()).done; )
        q = q.value, $ = Xl + Gl(q, Rl++), ll += E(
          q,
          N,
          j,
          $,
          J
        );
    else if ($ === "object") {
      if (typeof d.then == "function")
        return E(
          Wl(d),
          N,
          j,
          q,
          J
        );
      throw N = String(d), Error(
        "Objects are not valid as a React child (found: " + (N === "[object Object]" ? "object with keys {" + Object.keys(d).join(", ") + "}" : N) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ll;
  }
  function C(d, N, j) {
    if (d == null) return d;
    var q = [], J = 0;
    return E(d, q, "", "", function($) {
      return N.call(j, $, J++);
    }), q;
  }
  function Q(d) {
    if (d._status === -1) {
      var N = d._result;
      N = N(), N.then(
        function(j) {
          (d._status === 0 || d._status === -1) && (d._status = 1, d._result = j);
        },
        function(j) {
          (d._status === 0 || d._status === -1) && (d._status = 2, d._result = j);
        }
      ), d._status === -1 && (d._status = 0, d._result = N);
    }
    if (d._status === 1) return d._result.default;
    throw d._result;
  }
  var dl = typeof reportError == "function" ? reportError : function(d) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var N = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof d == "object" && d !== null && typeof d.message == "string" ? String(d.message) : String(d),
        error: d
      });
      if (!window.dispatchEvent(N)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", d);
      return;
    }
    console.error(d);
  }, fl = {
    map: C,
    forEach: function(d, N, j) {
      C(
        d,
        function() {
          N.apply(this, arguments);
        },
        j
      );
    },
    count: function(d) {
      var N = 0;
      return C(d, function() {
        N++;
      }), N;
    },
    toArray: function(d) {
      return C(d, function(N) {
        return N;
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
  return w.Activity = z, w.Children = fl, w.Component = Hl, w.Fragment = p, w.Profiler = R, w.PureComponent = jl, w.StrictMode = o, w.Suspense = D, w.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = K, w.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(d) {
      return K.H.useMemoCache(d);
    }
  }, w.cache = function(d) {
    return function() {
      return d.apply(null, arguments);
    };
  }, w.cacheSignal = function() {
    return null;
  }, w.cloneElement = function(d, N, j) {
    if (d == null)
      throw Error(
        "The argument must be a React element, but you passed " + d + "."
      );
    var q = I({}, d.props), J = d.key;
    if (N != null)
      for ($ in N.key !== void 0 && (J = "" + N.key), N)
        !ql.call(N, $) || $ === "key" || $ === "__self" || $ === "__source" || $ === "ref" && N.ref === void 0 || (q[$] = N[$]);
    var $ = arguments.length - 2;
    if ($ === 1) q.children = j;
    else if (1 < $) {
      for (var ll = Array($), Xl = 0; Xl < $; Xl++)
        ll[Xl] = arguments[Xl + 2];
      q.children = ll;
    }
    return sl(d.type, J, q);
  }, w.createContext = function(d) {
    return d = {
      $$typeof: M,
      _currentValue: d,
      _currentValue2: d,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, d.Provider = d, d.Consumer = {
      $$typeof: U,
      _context: d
    }, d;
  }, w.createElement = function(d, N, j) {
    var q, J = {}, $ = null;
    if (N != null)
      for (q in N.key !== void 0 && ($ = "" + N.key), N)
        ql.call(N, q) && q !== "key" && q !== "__self" && q !== "__source" && (J[q] = N[q]);
    var ll = arguments.length - 2;
    if (ll === 1) J.children = j;
    else if (1 < ll) {
      for (var Xl = Array(ll), Rl = 0; Rl < ll; Rl++)
        Xl[Rl] = arguments[Rl + 2];
      J.children = Xl;
    }
    if (d && d.defaultProps)
      for (q in ll = d.defaultProps, ll)
        J[q] === void 0 && (J[q] = ll[q]);
    return sl(d, $, J);
  }, w.createRef = function() {
    return { current: null };
  }, w.forwardRef = function(d) {
    return { $$typeof: B, render: d };
  }, w.isValidElement = Bl, w.lazy = function(d) {
    return {
      $$typeof: x,
      _payload: { _status: -1, _result: d },
      _init: Q
    };
  }, w.memo = function(d, N) {
    return {
      $$typeof: g,
      type: d,
      compare: N === void 0 ? null : N
    };
  }, w.startTransition = function(d) {
    var N = K.T, j = {};
    K.T = j;
    try {
      var q = d(), J = K.S;
      J !== null && J(j, q), typeof q == "object" && q !== null && typeof q.then == "function" && q.then(Tl, dl);
    } catch ($) {
      dl($);
    } finally {
      N !== null && j.types !== null && (N.types = j.types), K.T = N;
    }
  }, w.unstable_useCacheRefresh = function() {
    return K.H.useCacheRefresh();
  }, w.use = function(d) {
    return K.H.use(d);
  }, w.useActionState = function(d, N, j) {
    return K.H.useActionState(d, N, j);
  }, w.useCallback = function(d, N) {
    return K.H.useCallback(d, N);
  }, w.useContext = function(d) {
    return K.H.useContext(d);
  }, w.useDebugValue = function() {
  }, w.useDeferredValue = function(d, N) {
    return K.H.useDeferredValue(d, N);
  }, w.useEffect = function(d, N) {
    return K.H.useEffect(d, N);
  }, w.useEffectEvent = function(d) {
    return K.H.useEffectEvent(d);
  }, w.useId = function() {
    return K.H.useId();
  }, w.useImperativeHandle = function(d, N, j) {
    return K.H.useImperativeHandle(d, N, j);
  }, w.useInsertionEffect = function(d, N) {
    return K.H.useInsertionEffect(d, N);
  }, w.useLayoutEffect = function(d, N) {
    return K.H.useLayoutEffect(d, N);
  }, w.useMemo = function(d, N) {
    return K.H.useMemo(d, N);
  }, w.useOptimistic = function(d, N) {
    return K.H.useOptimistic(d, N);
  }, w.useReducer = function(d, N, j) {
    return K.H.useReducer(d, N, j);
  }, w.useRef = function(d) {
    return K.H.useRef(d);
  }, w.useState = function(d) {
    return K.H.useState(d);
  }, w.useSyncExternalStore = function(d, N, j) {
    return K.H.useSyncExternalStore(
      d,
      N,
      j
    );
  }, w.useTransition = function() {
    return K.H.useTransition();
  }, w.version = "19.2.6", w;
}
var _m;
function Mi() {
  return _m || (_m = 1, Jf.exports = D0()), Jf.exports;
}
var F = Mi();
const vs = /* @__PURE__ */ A0(F);
var wf = { exports: {} }, Pu = {}, $f = { exports: {} }, Wf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Em;
function x0() {
  return Em || (Em = 1, (function(f) {
    function b(E, C) {
      var Q = E.length;
      E.push(C);
      l: for (; 0 < Q; ) {
        var dl = Q - 1 >>> 1, fl = E[dl];
        if (0 < R(fl, C))
          E[dl] = C, E[Q] = fl, Q = dl;
        else break l;
      }
    }
    function p(E) {
      return E.length === 0 ? null : E[0];
    }
    function o(E) {
      if (E.length === 0) return null;
      var C = E[0], Q = E.pop();
      if (Q !== C) {
        E[0] = Q;
        l: for (var dl = 0, fl = E.length, d = fl >>> 1; dl < d; ) {
          var N = 2 * (dl + 1) - 1, j = E[N], q = N + 1, J = E[q];
          if (0 > R(j, Q))
            q < fl && 0 > R(J, j) ? (E[dl] = J, E[q] = Q, dl = q) : (E[dl] = j, E[N] = Q, dl = N);
          else if (q < fl && 0 > R(J, Q))
            E[dl] = J, E[q] = Q, dl = q;
          else break l;
        }
      }
      return C;
    }
    function R(E, C) {
      var Q = E.sortIndex - C.sortIndex;
      return Q !== 0 ? Q : E.id - C.id;
    }
    if (f.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var U = performance;
      f.unstable_now = function() {
        return U.now();
      };
    } else {
      var M = Date, B = M.now();
      f.unstable_now = function() {
        return M.now() - B;
      };
    }
    var D = [], g = [], x = 1, z = null, H = 3, Z = !1, cl = !1, I = !1, vl = !1, Hl = typeof setTimeout == "function" ? setTimeout : null, V = typeof clearTimeout == "function" ? clearTimeout : null, jl = typeof setImmediate < "u" ? setImmediate : null;
    function P(E) {
      for (var C = p(g); C !== null; ) {
        if (C.callback === null) o(g);
        else if (C.startTime <= E)
          o(g), C.sortIndex = C.expirationTime, b(D, C);
        else break;
        C = p(g);
      }
    }
    function gl(E) {
      if (I = !1, P(E), !cl)
        if (p(D) !== null)
          cl = !0, Tl || (Tl = !0, Yl());
        else {
          var C = p(g);
          C !== null && Wl(gl, C.startTime - E);
        }
    }
    var Tl = !1, K = -1, ql = 5, sl = -1;
    function bt() {
      return vl ? !0 : !(f.unstable_now() - sl < ql);
    }
    function Bl() {
      if (vl = !1, Tl) {
        var E = f.unstable_now();
        sl = E;
        var C = !0;
        try {
          l: {
            cl = !1, I && (I = !1, V(K), K = -1), Z = !0;
            var Q = H;
            try {
              t: {
                for (P(E), z = p(D); z !== null && !(z.expirationTime > E && bt()); ) {
                  var dl = z.callback;
                  if (typeof dl == "function") {
                    z.callback = null, H = z.priorityLevel;
                    var fl = dl(
                      z.expirationTime <= E
                    );
                    if (E = f.unstable_now(), typeof fl == "function") {
                      z.callback = fl, P(E), C = !0;
                      break t;
                    }
                    z === p(D) && o(D), P(E);
                  } else o(D);
                  z = p(D);
                }
                if (z !== null) C = !0;
                else {
                  var d = p(g);
                  d !== null && Wl(
                    gl,
                    d.startTime - E
                  ), C = !1;
                }
              }
              break l;
            } finally {
              z = null, H = Q, Z = !1;
            }
            C = void 0;
          }
        } finally {
          C ? Yl() : Tl = !1;
        }
      }
    }
    var Yl;
    if (typeof jl == "function")
      Yl = function() {
        jl(Bl);
      };
    else if (typeof MessageChannel < "u") {
      var it = new MessageChannel(), Gl = it.port2;
      it.port1.onmessage = Bl, Yl = function() {
        Gl.postMessage(null);
      };
    } else
      Yl = function() {
        Hl(Bl, 0);
      };
    function Wl(E, C) {
      K = Hl(function() {
        E(f.unstable_now());
      }, C);
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
          var C = 3;
          break;
        default:
          C = H;
      }
      var Q = H;
      H = C;
      try {
        return E();
      } finally {
        H = Q;
      }
    }, f.unstable_requestPaint = function() {
      vl = !0;
    }, f.unstable_runWithPriority = function(E, C) {
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
        return C();
      } finally {
        H = Q;
      }
    }, f.unstable_scheduleCallback = function(E, C, Q) {
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
        callback: C,
        priorityLevel: E,
        startTime: Q,
        expirationTime: fl,
        sortIndex: -1
      }, Q > dl ? (E.sortIndex = Q, b(g, E), p(D) === null && E === p(g) && (I ? (V(K), K = -1) : I = !0, Wl(gl, Q - dl))) : (E.sortIndex = fl, b(D, E), cl || Z || (cl = !0, Tl || (Tl = !0, Yl()))), E;
    }, f.unstable_shouldYield = bt, f.unstable_wrapCallback = function(E) {
      var C = H;
      return function() {
        var Q = H;
        H = C;
        try {
          return E.apply(this, arguments);
        } finally {
          H = Q;
        }
      };
    };
  })(Wf)), Wf;
}
var Tm;
function M0() {
  return Tm || (Tm = 1, $f.exports = x0()), $f.exports;
}
var Ff = { exports: {} }, ut = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zm;
function j0() {
  if (zm) return ut;
  zm = 1;
  var f = Mi();
  function b(D) {
    var g = "https://react.dev/errors/" + D;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var x = 2; x < arguments.length; x++)
        g += "&args[]=" + encodeURIComponent(arguments[x]);
    }
    return "Minified React error #" + D + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function p() {
  }
  var o = {
    d: {
      f: p,
      r: function() {
        throw Error(b(522));
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
  }, R = Symbol.for("react.portal");
  function U(D, g, x) {
    var z = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: R,
      key: z == null ? null : "" + z,
      children: D,
      containerInfo: g,
      implementation: x
    };
  }
  var M = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function B(D, g) {
    if (D === "font") return "";
    if (typeof g == "string")
      return g === "use-credentials" ? g : "";
  }
  return ut.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, ut.createPortal = function(D, g) {
    var x = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!g || g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)
      throw Error(b(299));
    return U(D, g, null, x);
  }, ut.flushSync = function(D) {
    var g = M.T, x = o.p;
    try {
      if (M.T = null, o.p = 2, D) return D();
    } finally {
      M.T = g, o.p = x, o.d.f();
    }
  }, ut.preconnect = function(D, g) {
    typeof D == "string" && (g ? (g = g.crossOrigin, g = typeof g == "string" ? g === "use-credentials" ? g : "" : void 0) : g = null, o.d.C(D, g));
  }, ut.prefetchDNS = function(D) {
    typeof D == "string" && o.d.D(D);
  }, ut.preinit = function(D, g) {
    if (typeof D == "string" && g && typeof g.as == "string") {
      var x = g.as, z = B(x, g.crossOrigin), H = typeof g.integrity == "string" ? g.integrity : void 0, Z = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
      x === "style" ? o.d.S(
        D,
        typeof g.precedence == "string" ? g.precedence : void 0,
        {
          crossOrigin: z,
          integrity: H,
          fetchPriority: Z
        }
      ) : x === "script" && o.d.X(D, {
        crossOrigin: z,
        integrity: H,
        fetchPriority: Z,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0
      });
    }
  }, ut.preinitModule = function(D, g) {
    if (typeof D == "string")
      if (typeof g == "object" && g !== null) {
        if (g.as == null || g.as === "script") {
          var x = B(
            g.as,
            g.crossOrigin
          );
          o.d.M(D, {
            crossOrigin: x,
            integrity: typeof g.integrity == "string" ? g.integrity : void 0,
            nonce: typeof g.nonce == "string" ? g.nonce : void 0
          });
        }
      } else g == null && o.d.M(D);
  }, ut.preload = function(D, g) {
    if (typeof D == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
      var x = g.as, z = B(x, g.crossOrigin);
      o.d.L(D, x, {
        crossOrigin: z,
        integrity: typeof g.integrity == "string" ? g.integrity : void 0,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0,
        type: typeof g.type == "string" ? g.type : void 0,
        fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
        referrerPolicy: typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
        imageSrcSet: typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
        imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
        media: typeof g.media == "string" ? g.media : void 0
      });
    }
  }, ut.preloadModule = function(D, g) {
    if (typeof D == "string")
      if (g) {
        var x = B(g.as, g.crossOrigin);
        o.d.m(D, {
          as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
          crossOrigin: x,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0
        });
      } else o.d.m(D);
  }, ut.requestFormReset = function(D) {
    o.d.r(D);
  }, ut.unstable_batchedUpdates = function(D, g) {
    return D(g);
  }, ut.useFormState = function(D, g, x) {
    return M.H.useFormState(D, g, x);
  }, ut.useFormStatus = function() {
    return M.H.useHostTransitionStatus();
  }, ut.version = "19.2.6", ut;
}
var Am;
function R0() {
  if (Am) return Ff.exports;
  Am = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (b) {
        console.error(b);
      }
  }
  return f(), Ff.exports = j0(), Ff.exports;
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
var Nm;
function U0() {
  if (Nm) return Pu;
  Nm = 1;
  var f = M0(), b = Mi(), p = R0();
  function o(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        t += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function R(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function U(l) {
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
  function B(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function D(l) {
    if (U(l) !== l)
      throw Error(o(188));
  }
  function g(l) {
    var t = l.alternate;
    if (!t) {
      if (t = U(l), t === null) throw Error(o(188));
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
  var z = Object.assign, H = Symbol.for("react.element"), Z = Symbol.for("react.transitional.element"), cl = Symbol.for("react.portal"), I = Symbol.for("react.fragment"), vl = Symbol.for("react.strict_mode"), Hl = Symbol.for("react.profiler"), V = Symbol.for("react.consumer"), jl = Symbol.for("react.context"), P = Symbol.for("react.forward_ref"), gl = Symbol.for("react.suspense"), Tl = Symbol.for("react.suspense_list"), K = Symbol.for("react.memo"), ql = Symbol.for("react.lazy"), sl = Symbol.for("react.activity"), bt = Symbol.for("react.memo_cache_sentinel"), Bl = Symbol.iterator;
  function Yl(l) {
    return l === null || typeof l != "object" ? null : (l = Bl && l[Bl] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var it = Symbol.for("react.client.reference");
  function Gl(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === it ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case I:
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
        case jl:
          return l.displayName || "Context";
        case V:
          return (l._context.displayName || "Context") + ".Consumer";
        case P:
          var t = l.render;
          return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case K:
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
  var Wl = Array.isArray, E = b.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, C = p.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, dl = [], fl = -1;
  function d(l) {
    return { current: l };
  }
  function N(l) {
    0 > fl || (l.current = dl[fl], dl[fl] = null, fl--);
  }
  function j(l, t) {
    fl++, dl[fl] = l.current, l.current = t;
  }
  var q = d(null), J = d(null), $ = d(null), ll = d(null);
  function Xl(l, t) {
    switch (j($, t), j(J, l), j(q, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? Qd(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI)
          t = Qd(t), l = Vd(t, l);
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
    N(q), j(q, l);
  }
  function Rl() {
    N(q), N(J), N($);
  }
  function Se(l) {
    l.memoizedState !== null && j(ll, l);
    var t = q.current, e = Vd(t, l.type);
    t !== e && (j(J, l), j(q, e));
  }
  function We(l) {
    J.current === l && (N(q), N(J)), ll.current === l && (N(ll), $u._currentValue = Q);
  }
  var uu, cn;
  function pt(l) {
    if (uu === void 0)
      try {
        throw Error();
      } catch (e) {
        var t = e.stack.trim().match(/\n( *(at )?)/);
        uu = t && t[1] || "", cn = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + uu + l + cn;
  }
  var ga = !1;
  function fn(l, t) {
    if (!l || ga) return "";
    ga = !0;
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
                } catch (_) {
                  var S = _;
                }
                Reflect.construct(l, [], O);
              } else {
                try {
                  O.call();
                } catch (_) {
                  S = _;
                }
                l.call(O.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (_) {
                S = _;
              }
              (O = l()) && typeof O.catch == "function" && O.catch(function() {
              });
            }
          } catch (_) {
            if (_ && S && typeof _.stack == "string")
              return [_.stack, S.stack];
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
                  var T = `
` + s[a].replace(" at new ", " at ");
                  return l.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", l.displayName)), T;
                }
              while (1 <= a && 0 <= u);
            break;
          }
      }
    } finally {
      ga = !1, Error.prepareStackTrace = e;
    }
    return (e = l ? l.displayName || l.name : "") ? pt(e) : "";
  }
  function Sl(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return pt(l.type);
      case 16:
        return pt("Lazy");
      case 13:
        return l.child !== t && t !== null ? pt("Suspense Fallback") : pt("Suspense");
      case 19:
        return pt("SuspenseList");
      case 0:
      case 15:
        return fn(l.type, !1);
      case 11:
        return fn(l.type.render, !1);
      case 1:
        return fn(l.type, !0);
      case 31:
        return pt("Activity");
      default:
        return "";
    }
  }
  function xl(l) {
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
  var zl = Object.prototype.hasOwnProperty, Al = f.unstable_scheduleCallback, st = f.unstable_cancelCallback, ot = f.unstable_shouldYield, Ql = f.unstable_requestPaint, Nl = f.unstable_now, Fe = f.unstable_getCurrentPriorityLevel, be = f.unstable_ImmediatePriority, nu = f.unstable_UserBlockingPriority, ke = f.unstable_NormalPriority, rt = f.unstable_LowPriority, jt = f.unstable_IdlePriority, iu = f.log, ji = f.unstable_setDisableYieldValue, Ft = null, _t = null;
  function pe(l) {
    if (typeof iu == "function" && ji(l), _t && typeof _t.setStrictMode == "function")
      try {
        _t.setStrictMode(Ft, l);
      } catch {
      }
  }
  var Et = Math.clz32 ? Math.clz32 : rv, sv = Math.log, ov = Math.LN2;
  function rv(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (sv(l) / ov | 0) | 0;
  }
  var sn = 256, on = 262144, rn = 4194304;
  function Ie(l) {
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
  function dn(l, t, e) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var u = 0, n = l.suspendedLanes, i = l.pingedLanes;
    l = l.warmLanes;
    var c = a & 134217727;
    return c !== 0 ? (a = c & ~n, a !== 0 ? u = Ie(a) : (i &= c, i !== 0 ? u = Ie(i) : e || (e = c & ~l, e !== 0 && (u = Ie(e))))) : (c = a & ~n, c !== 0 ? u = Ie(c) : i !== 0 ? u = Ie(i) : e || (e = a & ~l, e !== 0 && (u = Ie(e)))), u === 0 ? 0 : t !== 0 && t !== u && (t & n) === 0 && (n = u & -u, e = t & -t, n >= e || n === 32 && (e & 4194048) !== 0) ? t : u;
  }
  function cu(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function dv(l, t) {
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
  function _s() {
    var l = rn;
    return rn <<= 1, (rn & 62914560) === 0 && (rn = 4194304), l;
  }
  function Ri(l) {
    for (var t = [], e = 0; 31 > e; e++) t.push(l);
    return t;
  }
  function fu(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function mv(l, t, e, a, u, n) {
    var i = l.pendingLanes;
    l.pendingLanes = e, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= e, l.entangledLanes &= e, l.errorRecoveryDisabledLanes &= e, l.shellSuspendCounter = 0;
    var c = l.entanglements, s = l.expirationTimes, y = l.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var T = 31 - Et(e), O = 1 << T;
      c[T] = 0, s[T] = -1;
      var S = y[T];
      if (S !== null)
        for (y[T] = null, T = 0; T < S.length; T++) {
          var _ = S[T];
          _ !== null && (_.lane &= -536870913);
        }
      e &= ~O;
    }
    a !== 0 && Es(l, a, 0), n !== 0 && u === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(i & ~t));
  }
  function Es(l, t, e) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var a = 31 - Et(t);
    l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | e & 261930;
  }
  function Ts(l, t) {
    var e = l.entangledLanes |= t;
    for (l = l.entanglements; e; ) {
      var a = 31 - Et(e), u = 1 << a;
      u & t | l[a] & t && (l[a] |= t), e &= ~u;
    }
  }
  function zs(l, t) {
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
  function Ci(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function As() {
    var l = C.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : rm(l.type));
  }
  function Ns(l, t) {
    var e = C.p;
    try {
      return C.p = l, t();
    } finally {
      C.p = e;
    }
  }
  var _e = Math.random().toString(36).slice(2), Pl = "__reactFiber$" + _e, dt = "__reactProps$" + _e, Sa = "__reactContainer$" + _e, Hi = "__reactEvents$" + _e, vv = "__reactListeners$" + _e, hv = "__reactHandles$" + _e, Os = "__reactResources$" + _e, su = "__reactMarker$" + _e;
  function qi(l) {
    delete l[Pl], delete l[dt], delete l[Hi], delete l[vv], delete l[hv];
  }
  function ba(l) {
    var t = l[Pl];
    if (t) return t;
    for (var e = l.parentNode; e; ) {
      if (t = e[Sa] || e[Pl]) {
        if (e = t.alternate, t.child !== null || e !== null && e.child !== null)
          for (l = Wd(l); l !== null; ) {
            if (e = l[Pl]) return e;
            l = Wd(l);
          }
        return t;
      }
      l = e, e = l.parentNode;
    }
    return null;
  }
  function pa(l) {
    if (l = l[Pl] || l[Sa]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return l;
    }
    return null;
  }
  function ou(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(o(33));
  }
  function _a(l) {
    var t = l[Os];
    return t || (t = l[Os] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Fl(l) {
    l[su] = !0;
  }
  var Ds = /* @__PURE__ */ new Set(), xs = {};
  function Pe(l, t) {
    Ea(l, t), Ea(l + "Capture", t);
  }
  function Ea(l, t) {
    for (xs[l] = t, l = 0; l < t.length; l++)
      Ds.add(t[l]);
  }
  var yv = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Ms = {}, js = {};
  function gv(l) {
    return zl.call(js, l) ? !0 : zl.call(Ms, l) ? !1 : yv.test(l) ? js[l] = !0 : (Ms[l] = !0, !1);
  }
  function mn(l, t, e) {
    if (gv(t))
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
  function vn(l, t, e) {
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
  function kt(l, t, e, a) {
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
  function Rs(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Sv(l, t, e) {
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
  function Bi(l) {
    if (!l._valueTracker) {
      var t = Rs(l) ? "checked" : "value";
      l._valueTracker = Sv(
        l,
        t,
        "" + l[t]
      );
    }
  }
  function Us(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var e = t.getValue(), a = "";
    return l && (a = Rs(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== e ? (t.setValue(l), !0) : !1;
  }
  function hn(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var bv = /[\n"\\]/g;
  function Ut(l) {
    return l.replace(
      bv,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Yi(l, t, e, a, u, n, i, c) {
    l.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? l.type = i : l.removeAttribute("type"), t != null ? i === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + Rt(t)) : l.value !== "" + Rt(t) && (l.value = "" + Rt(t)) : i !== "submit" && i !== "reset" || l.removeAttribute("value"), t != null ? Gi(l, i, Rt(t)) : e != null ? Gi(l, i, Rt(e)) : a != null && l.removeAttribute("value"), u == null && n != null && (l.defaultChecked = !!n), u != null && (l.checked = u && typeof u != "function" && typeof u != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.name = "" + Rt(c) : l.removeAttribute("name");
  }
  function Cs(l, t, e, a, u, n, i, c) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || e != null) {
      if (!(n !== "submit" && n !== "reset" || t != null)) {
        Bi(l);
        return;
      }
      e = e != null ? "" + Rt(e) : "", t = t != null ? "" + Rt(t) : e, c || t === l.value || (l.value = t), l.defaultValue = t;
    }
    a = a ?? u, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = c ? l.checked : !!a, l.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (l.name = i), Bi(l);
  }
  function Gi(l, t, e) {
    t === "number" && hn(l.ownerDocument) === l || l.defaultValue === "" + e || (l.defaultValue = "" + e);
  }
  function Ta(l, t, e, a) {
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
  function Hs(l, t, e) {
    if (t != null && (t = "" + Rt(t), t !== l.value && (l.value = t), e == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = e != null ? "" + Rt(e) : "";
  }
  function qs(l, t, e, a) {
    if (t == null) {
      if (a != null) {
        if (e != null) throw Error(o(92));
        if (Wl(a)) {
          if (1 < a.length) throw Error(o(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), t = e;
    }
    e = Rt(t), l.defaultValue = e, a = l.textContent, a === e && a !== "" && a !== null && (l.value = a), Bi(l);
  }
  function za(l, t) {
    if (t) {
      var e = l.firstChild;
      if (e && e === l.lastChild && e.nodeType === 3) {
        e.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var pv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Bs(l, t, e) {
    var a = t.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, e) : typeof e != "number" || e === 0 || pv.has(t) ? t === "float" ? l.cssFloat = e : l[t] = ("" + e).trim() : l[t] = e + "px";
  }
  function Ys(l, t, e) {
    if (t != null && typeof t != "object")
      throw Error(o(62));
    if (l = l.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
      for (var u in t)
        a = t[u], t.hasOwnProperty(u) && e[u] !== a && Bs(l, u, a);
    } else
      for (var n in t)
        t.hasOwnProperty(n) && Bs(l, n, t[n]);
  }
  function Xi(l) {
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
  var _v = /* @__PURE__ */ new Map([
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
  ]), Ev = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function yn(l) {
    return Ev.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function It() {
  }
  var Qi = null;
  function Vi(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var Aa = null, Na = null;
  function Gs(l) {
    var t = pa(l);
    if (t && (l = t.stateNode)) {
      var e = l[dt] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if (Yi(
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
              'input[name="' + Ut(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < e.length; t++) {
              var a = e[t];
              if (a !== l && a.form === l.form) {
                var u = a[dt] || null;
                if (!u) throw Error(o(90));
                Yi(
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
              a = e[t], a.form === l.form && Us(a);
          }
          break l;
        case "textarea":
          Hs(l, e.value, e.defaultValue);
          break l;
        case "select":
          t = e.value, t != null && Ta(l, !!e.multiple, t, !1);
      }
    }
  }
  var Li = !1;
  function Xs(l, t, e) {
    if (Li) return l(t, e);
    Li = !0;
    try {
      var a = l(t);
      return a;
    } finally {
      if (Li = !1, (Aa !== null || Na !== null) && (ai(), Aa && (t = Aa, l = Na, Na = Aa = null, Gs(t), l)))
        for (t = 0; t < l.length; t++) Gs(l[t]);
    }
  }
  function ru(l, t) {
    var e = l.stateNode;
    if (e === null) return null;
    var a = e[dt] || null;
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
  var Pt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Zi = !1;
  if (Pt)
    try {
      var du = {};
      Object.defineProperty(du, "passive", {
        get: function() {
          Zi = !0;
        }
      }), window.addEventListener("test", du, du), window.removeEventListener("test", du, du);
    } catch {
      Zi = !1;
    }
  var Ee = null, Ki = null, gn = null;
  function Qs() {
    if (gn) return gn;
    var l, t = Ki, e = t.length, a, u = "value" in Ee ? Ee.value : Ee.textContent, n = u.length;
    for (l = 0; l < e && t[l] === u[l]; l++) ;
    var i = e - l;
    for (a = 1; a <= i && t[e - a] === u[n - a]; a++) ;
    return gn = u.slice(l, 1 < a ? 1 - a : void 0);
  }
  function Sn(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function bn() {
    return !0;
  }
  function Vs() {
    return !1;
  }
  function mt(l) {
    function t(e, a, u, n, i) {
      this._reactName = e, this._targetInst = u, this.type = a, this.nativeEvent = n, this.target = i, this.currentTarget = null;
      for (var c in l)
        l.hasOwnProperty(c) && (e = l[c], this[c] = e ? e(n) : n[c]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? bn : Vs, this.isPropagationStopped = Vs, this;
    }
    return z(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = bn);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = bn);
      },
      persist: function() {
      },
      isPersistent: bn
    }), t;
  }
  var la = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, pn = mt(la), mu = z({}, la, { view: 0, detail: 0 }), Tv = mt(mu), Ji, wi, vu, _n = z({}, mu, {
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
      return "movementX" in l ? l.movementX : (l !== vu && (vu && l.type === "mousemove" ? (Ji = l.screenX - vu.screenX, wi = l.screenY - vu.screenY) : wi = Ji = 0, vu = l), Ji);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : wi;
    }
  }), Ls = mt(_n), zv = z({}, _n, { dataTransfer: 0 }), Av = mt(zv), Nv = z({}, mu, { relatedTarget: 0 }), $i = mt(Nv), Ov = z({}, la, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Dv = mt(Ov), xv = z({}, la, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), Mv = mt(xv), jv = z({}, la, { data: 0 }), Zs = mt(jv), Rv = {
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
  }, Uv = {
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
  }, Cv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Hv(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = Cv[l]) ? !!t[l] : !1;
  }
  function Wi() {
    return Hv;
  }
  var qv = z({}, mu, {
    key: function(l) {
      if (l.key) {
        var t = Rv[l.key] || l.key;
        if (t !== "Unidentified") return t;
      }
      return l.type === "keypress" ? (l = Sn(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? Uv[l.keyCode] || "Unidentified" : "";
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
      return l.type === "keypress" ? Sn(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? Sn(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), Bv = mt(qv), Yv = z({}, _n, {
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
  }), Ks = mt(Yv), Gv = z({}, mu, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Wi
  }), Xv = mt(Gv), Qv = z({}, la, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Vv = mt(Qv), Lv = z({}, _n, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Zv = mt(Lv), Kv = z({}, la, {
    newState: 0,
    oldState: 0
  }), Jv = mt(Kv), wv = [9, 13, 27, 32], Fi = Pt && "CompositionEvent" in window, hu = null;
  Pt && "documentMode" in document && (hu = document.documentMode);
  var $v = Pt && "TextEvent" in window && !hu, Js = Pt && (!Fi || hu && 8 < hu && 11 >= hu), ws = " ", $s = !1;
  function Ws(l, t) {
    switch (l) {
      case "keyup":
        return wv.indexOf(t.keyCode) !== -1;
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
  function Fs(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var Oa = !1;
  function Wv(l, t) {
    switch (l) {
      case "compositionend":
        return Fs(t);
      case "keypress":
        return t.which !== 32 ? null : ($s = !0, ws);
      case "textInput":
        return l = t.data, l === ws && $s ? null : l;
      default:
        return null;
    }
  }
  function Fv(l, t) {
    if (Oa)
      return l === "compositionend" || !Fi && Ws(l, t) ? (l = Qs(), gn = Ki = Ee = null, Oa = !1, l) : null;
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
        return Js && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var kv = {
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
  function ks(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!kv[l.type] : t === "textarea";
  }
  function Is(l, t, e, a) {
    Aa ? Na ? Na.push(a) : Na = [a] : Aa = a, t = oi(t, "onChange"), 0 < t.length && (e = new pn(
      "onChange",
      "change",
      null,
      e,
      a
    ), l.push({ event: e, listeners: t }));
  }
  var yu = null, gu = null;
  function Iv(l) {
    Hd(l, 0);
  }
  function En(l) {
    var t = ou(l);
    if (Us(t)) return l;
  }
  function Ps(l, t) {
    if (l === "change") return t;
  }
  var lo = !1;
  if (Pt) {
    var ki;
    if (Pt) {
      var Ii = "oninput" in document;
      if (!Ii) {
        var to = document.createElement("div");
        to.setAttribute("oninput", "return;"), Ii = typeof to.oninput == "function";
      }
      ki = Ii;
    } else ki = !1;
    lo = ki && (!document.documentMode || 9 < document.documentMode);
  }
  function eo() {
    yu && (yu.detachEvent("onpropertychange", ao), gu = yu = null);
  }
  function ao(l) {
    if (l.propertyName === "value" && En(gu)) {
      var t = [];
      Is(
        t,
        gu,
        l,
        Vi(l)
      ), Xs(Iv, t);
    }
  }
  function Pv(l, t, e) {
    l === "focusin" ? (eo(), yu = t, gu = e, yu.attachEvent("onpropertychange", ao)) : l === "focusout" && eo();
  }
  function lh(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return En(gu);
  }
  function th(l, t) {
    if (l === "click") return En(t);
  }
  function eh(l, t) {
    if (l === "input" || l === "change")
      return En(t);
  }
  function ah(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var Tt = typeof Object.is == "function" ? Object.is : ah;
  function Su(l, t) {
    if (Tt(l, t)) return !0;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null)
      return !1;
    var e = Object.keys(l), a = Object.keys(t);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var u = e[a];
      if (!zl.call(t, u) || !Tt(l[u], t[u]))
        return !1;
    }
    return !0;
  }
  function uo(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function no(l, t) {
    var e = uo(l);
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
      e = uo(e);
    }
  }
  function io(l, t) {
    return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? io(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function co(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = hn(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var e = typeof t.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) l = t.contentWindow;
      else break;
      t = hn(l.document);
    }
    return t;
  }
  function Pi(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var uh = Pt && "documentMode" in document && 11 >= document.documentMode, Da = null, lc = null, bu = null, tc = !1;
  function fo(l, t, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    tc || Da == null || Da !== hn(a) || (a = Da, "selectionStart" in a && Pi(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), bu && Su(bu, a) || (bu = a, a = oi(lc, "onSelect"), 0 < a.length && (t = new pn(
      "onSelect",
      "select",
      null,
      t,
      e
    ), l.push({ event: t, listeners: a }), t.target = Da)));
  }
  function ta(l, t) {
    var e = {};
    return e[l.toLowerCase()] = t.toLowerCase(), e["Webkit" + l] = "webkit" + t, e["Moz" + l] = "moz" + t, e;
  }
  var xa = {
    animationend: ta("Animation", "AnimationEnd"),
    animationiteration: ta("Animation", "AnimationIteration"),
    animationstart: ta("Animation", "AnimationStart"),
    transitionrun: ta("Transition", "TransitionRun"),
    transitionstart: ta("Transition", "TransitionStart"),
    transitioncancel: ta("Transition", "TransitionCancel"),
    transitionend: ta("Transition", "TransitionEnd")
  }, ec = {}, so = {};
  Pt && (so = document.createElement("div").style, "AnimationEvent" in window || (delete xa.animationend.animation, delete xa.animationiteration.animation, delete xa.animationstart.animation), "TransitionEvent" in window || delete xa.transitionend.transition);
  function ea(l) {
    if (ec[l]) return ec[l];
    if (!xa[l]) return l;
    var t = xa[l], e;
    for (e in t)
      if (t.hasOwnProperty(e) && e in so)
        return ec[l] = t[e];
    return l;
  }
  var oo = ea("animationend"), ro = ea("animationiteration"), mo = ea("animationstart"), nh = ea("transitionrun"), ih = ea("transitionstart"), ch = ea("transitioncancel"), vo = ea("transitionend"), ho = /* @__PURE__ */ new Map(), ac = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  ac.push("scrollEnd");
  function Vt(l, t) {
    ho.set(l, t), Pe(t, [l]);
  }
  var Tn = typeof reportError == "function" ? reportError : function(l) {
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
  }, Ct = [], Ma = 0, uc = 0;
  function zn() {
    for (var l = Ma, t = uc = Ma = 0; t < l; ) {
      var e = Ct[t];
      Ct[t++] = null;
      var a = Ct[t];
      Ct[t++] = null;
      var u = Ct[t];
      Ct[t++] = null;
      var n = Ct[t];
      if (Ct[t++] = null, a !== null && u !== null) {
        var i = a.pending;
        i === null ? u.next = u : (u.next = i.next, i.next = u), a.pending = u;
      }
      n !== 0 && yo(e, u, n);
    }
  }
  function An(l, t, e, a) {
    Ct[Ma++] = l, Ct[Ma++] = t, Ct[Ma++] = e, Ct[Ma++] = a, uc |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
  }
  function nc(l, t, e, a) {
    return An(l, t, e, a), Nn(l);
  }
  function aa(l, t) {
    return An(l, null, null, t), Nn(l);
  }
  function yo(l, t, e) {
    l.lanes |= e;
    var a = l.alternate;
    a !== null && (a.lanes |= e);
    for (var u = !1, n = l.return; n !== null; )
      n.childLanes |= e, a = n.alternate, a !== null && (a.childLanes |= e), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (u = !0)), l = n, n = n.return;
    return l.tag === 3 ? (n = l.stateNode, u && t !== null && (u = 31 - Et(e), l = n.hiddenUpdates, a = l[u], a === null ? l[u] = [t] : a.push(t), t.lane = e | 536870912), n) : null;
  }
  function Nn(l) {
    if (50 < Qu)
      throw Qu = 0, hf = null, Error(o(185));
    for (var t = l.return; t !== null; )
      l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var ja = {};
  function fh(l, t, e, a) {
    this.tag = l, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function zt(l, t, e, a) {
    return new fh(l, t, e, a);
  }
  function ic(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function le(l, t) {
    var e = l.alternate;
    return e === null ? (e = zt(
      l.tag,
      t,
      l.key,
      l.mode
    ), e.elementType = l.elementType, e.type = l.type, e.stateNode = l.stateNode, e.alternate = l, l.alternate = e) : (e.pendingProps = t, e.type = l.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = l.flags & 65011712, e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, t = l.dependencies, e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, e.sibling = l.sibling, e.index = l.index, e.ref = l.ref, e.refCleanup = l.refCleanup, e;
  }
  function go(l, t) {
    l.flags &= 65011714;
    var e = l.alternate;
    return e === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, l.type = e.type, t = e.dependencies, l.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), l;
  }
  function On(l, t, e, a, u, n) {
    var i = 0;
    if (a = l, typeof l == "function") ic(l) && (i = 1);
    else if (typeof l == "string")
      i = m0(
        l,
        e,
        q.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      l: switch (l) {
        case sl:
          return l = zt(31, e, t, u), l.elementType = sl, l.lanes = n, l;
        case I:
          return ua(e.children, u, n, t);
        case vl:
          i = 8, u |= 24;
          break;
        case Hl:
          return l = zt(12, e, t, u | 2), l.elementType = Hl, l.lanes = n, l;
        case gl:
          return l = zt(13, e, t, u), l.elementType = gl, l.lanes = n, l;
        case Tl:
          return l = zt(19, e, t, u), l.elementType = Tl, l.lanes = n, l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case jl:
                i = 10;
                break l;
              case V:
                i = 9;
                break l;
              case P:
                i = 11;
                break l;
              case K:
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
    return t = zt(i, e, t, u), t.elementType = l, t.type = a, t.lanes = n, t;
  }
  function ua(l, t, e, a) {
    return l = zt(7, l, a, t), l.lanes = e, l;
  }
  function cc(l, t, e) {
    return l = zt(6, l, null, t), l.lanes = e, l;
  }
  function So(l) {
    var t = zt(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function fc(l, t, e) {
    return t = zt(
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
  var bo = /* @__PURE__ */ new WeakMap();
  function Ht(l, t) {
    if (typeof l == "object" && l !== null) {
      var e = bo.get(l);
      return e !== void 0 ? e : (t = {
        value: l,
        source: t,
        stack: xl(t)
      }, bo.set(l, t), t);
    }
    return {
      value: l,
      source: t,
      stack: xl(t)
    };
  }
  var Ra = [], Ua = 0, Dn = null, pu = 0, qt = [], Bt = 0, Te = null, Kt = 1, Jt = "";
  function te(l, t) {
    Ra[Ua++] = pu, Ra[Ua++] = Dn, Dn = l, pu = t;
  }
  function po(l, t, e) {
    qt[Bt++] = Kt, qt[Bt++] = Jt, qt[Bt++] = Te, Te = l;
    var a = Kt;
    l = Jt;
    var u = 32 - Et(a) - 1;
    a &= ~(1 << u), e += 1;
    var n = 32 - Et(t) + u;
    if (30 < n) {
      var i = u - u % 5;
      n = (a & (1 << i) - 1).toString(32), a >>= i, u -= i, Kt = 1 << 32 - Et(t) + u | e << u | a, Jt = n + l;
    } else
      Kt = 1 << n | e << u | a, Jt = l;
  }
  function sc(l) {
    l.return !== null && (te(l, 1), po(l, 1, 0));
  }
  function oc(l) {
    for (; l === Dn; )
      Dn = Ra[--Ua], Ra[Ua] = null, pu = Ra[--Ua], Ra[Ua] = null;
    for (; l === Te; )
      Te = qt[--Bt], qt[Bt] = null, Jt = qt[--Bt], qt[Bt] = null, Kt = qt[--Bt], qt[Bt] = null;
  }
  function _o(l, t) {
    qt[Bt++] = Kt, qt[Bt++] = Jt, qt[Bt++] = Te, Kt = t.id, Jt = t.overflow, Te = l;
  }
  var lt = null, Ol = null, il = !1, ze = null, Yt = !1, rc = Error(o(519));
  function Ae(l) {
    var t = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw _u(Ht(t, l)), rc;
  }
  function Eo(l) {
    var t = l.stateNode, e = l.type, a = l.memoizedProps;
    switch (t[Pl] = l, t[dt] = a, e) {
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
        for (e = 0; e < Lu.length; e++)
          el(Lu[e], t);
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
        el("invalid", t), Cs(
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
        el("invalid", t), qs(t, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || t.textContent === "" + e || a.suppressHydrationWarning === !0 || Gd(t.textContent, e) ? (a.popover != null && (el("beforetoggle", t), el("toggle", t)), a.onScroll != null && el("scroll", t), a.onScrollEnd != null && el("scrollend", t), a.onClick != null && (t.onclick = It), t = !0) : t = !1, t || Ae(l, !0);
  }
  function To(l) {
    for (lt = l.return; lt; )
      switch (lt.tag) {
        case 5:
        case 31:
        case 13:
          Yt = !1;
          return;
        case 27:
        case 3:
          Yt = !0;
          return;
        default:
          lt = lt.return;
      }
  }
  function Ca(l) {
    if (l !== lt) return !1;
    if (!il) return To(l), il = !0, !1;
    var t = l.tag, e;
    if ((e = t !== 3 && t !== 27) && ((e = t === 5) && (e = l.type, e = !(e !== "form" && e !== "button") || Mf(l.type, l.memoizedProps)), e = !e), e && Ol && Ae(l), To(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(317));
      Ol = $d(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(317));
      Ol = $d(l);
    } else
      t === 27 ? (t = Ol, Ge(l.type) ? (l = Hf, Hf = null, Ol = l) : Ol = t) : Ol = lt ? Xt(l.stateNode.nextSibling) : null;
    return !0;
  }
  function na() {
    Ol = lt = null, il = !1;
  }
  function dc() {
    var l = ze;
    return l !== null && (gt === null ? gt = l : gt.push.apply(
      gt,
      l
    ), ze = null), l;
  }
  function _u(l) {
    ze === null ? ze = [l] : ze.push(l);
  }
  var mc = d(null), ia = null, ee = null;
  function Ne(l, t, e) {
    j(mc, t._currentValue), t._currentValue = e;
  }
  function ae(l) {
    l._currentValue = mc.current, N(mc);
  }
  function vc(l, t, e) {
    for (; l !== null; ) {
      var a = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === e) break;
      l = l.return;
    }
  }
  function hc(l, t, e, a) {
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
              n.lanes |= e, c = n.alternate, c !== null && (c.lanes |= e), vc(
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
        i.lanes |= e, n = i.alternate, n !== null && (n.lanes |= e), vc(i, e, l), i = null;
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
  function Ha(l, t, e, a) {
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
          Tt(u.pendingProps.value, i.value) || (l !== null ? l.push(c) : l = [c]);
        }
      } else if (u === ll.current) {
        if (i = u.alternate, i === null) throw Error(o(387));
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState && (l !== null ? l.push($u) : l = [$u]);
      }
      u = u.return;
    }
    l !== null && hc(
      t,
      l,
      e,
      a
    ), t.flags |= 262144;
  }
  function xn(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!Tt(
        l.context._currentValue,
        l.memoizedValue
      ))
        return !0;
      l = l.next;
    }
    return !1;
  }
  function ca(l) {
    ia = l, ee = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function tt(l) {
    return zo(ia, l);
  }
  function Mn(l, t) {
    return ia === null && ca(l), zo(l, t);
  }
  function zo(l, t) {
    var e = t._currentValue;
    if (t = { context: t, memoizedValue: e, next: null }, ee === null) {
      if (l === null) throw Error(o(308));
      ee = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
    } else ee = ee.next = t;
    return e;
  }
  var sh = typeof AbortController < "u" ? AbortController : function() {
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
  }, oh = f.unstable_scheduleCallback, rh = f.unstable_NormalPriority, Zl = {
    $$typeof: jl,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function yc() {
    return {
      controller: new sh(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Eu(l) {
    l.refCount--, l.refCount === 0 && oh(rh, function() {
      l.controller.abort();
    });
  }
  var Tu = null, gc = 0, qa = 0, Ba = null;
  function dh(l, t) {
    if (Tu === null) {
      var e = Tu = [];
      gc = 0, qa = _f(), Ba = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return gc++, t.then(Ao, Ao), t;
  }
  function Ao() {
    if (--gc === 0 && Tu !== null) {
      Ba !== null && (Ba.status = "fulfilled");
      var l = Tu;
      Tu = null, qa = 0, Ba = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function mh(l, t) {
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
  var No = E.S;
  E.S = function(l, t) {
    sd = Nl(), typeof t == "object" && t !== null && typeof t.then == "function" && dh(l, t), No !== null && No(l, t);
  };
  var fa = d(null);
  function Sc() {
    var l = fa.current;
    return l !== null ? l : El.pooledCache;
  }
  function jn(l, t) {
    t === null ? j(fa, fa.current) : j(fa, t.pool);
  }
  function Oo() {
    var l = Sc();
    return l === null ? null : { parent: Zl._currentValue, pool: l };
  }
  var Ya = Error(o(460)), bc = Error(o(474)), Rn = Error(o(542)), Un = { then: function() {
  } };
  function Do(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function xo(l, t, e) {
    switch (e = l[e], e === void 0 ? l.push(t) : e !== t && (t.then(It, It), t = e), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, jo(l), l;
      default:
        if (typeof t.status == "string") t.then(It, It);
        else {
          if (l = El, l !== null && 100 < l.shellSuspendCounter)
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
            throw l = t.reason, jo(l), l;
        }
        throw oa = t, Ya;
    }
  }
  function sa(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (oa = e, Ya) : e;
    }
  }
  var oa = null;
  function Mo() {
    if (oa === null) throw Error(o(459));
    var l = oa;
    return oa = null, l;
  }
  function jo(l) {
    if (l === Ya || l === Rn)
      throw Error(o(483));
  }
  var Ga = null, zu = 0;
  function Cn(l) {
    var t = zu;
    return zu += 1, Ga === null && (Ga = []), xo(Ga, l, t);
  }
  function Au(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function Hn(l, t) {
    throw t.$$typeof === H ? Error(o(525)) : (l = Object.prototype.toString.call(t), Error(
      o(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
      )
    ));
  }
  function Ro(l) {
    function t(v, r) {
      if (l) {
        var h = v.deletions;
        h === null ? (v.deletions = [r], v.flags |= 16) : h.push(r);
      }
    }
    function e(v, r) {
      if (!l) return null;
      for (; r !== null; )
        t(v, r), r = r.sibling;
      return null;
    }
    function a(v) {
      for (var r = /* @__PURE__ */ new Map(); v !== null; )
        v.key !== null ? r.set(v.key, v) : r.set(v.index, v), v = v.sibling;
      return r;
    }
    function u(v, r) {
      return v = le(v, r), v.index = 0, v.sibling = null, v;
    }
    function n(v, r, h) {
      return v.index = h, l ? (h = v.alternate, h !== null ? (h = h.index, h < r ? (v.flags |= 67108866, r) : h) : (v.flags |= 67108866, r)) : (v.flags |= 1048576, r);
    }
    function i(v) {
      return l && v.alternate === null && (v.flags |= 67108866), v;
    }
    function c(v, r, h, A) {
      return r === null || r.tag !== 6 ? (r = cc(h, v.mode, A), r.return = v, r) : (r = u(r, h), r.return = v, r);
    }
    function s(v, r, h, A) {
      var X = h.type;
      return X === I ? T(
        v,
        r,
        h.props.children,
        A,
        h.key
      ) : r !== null && (r.elementType === X || typeof X == "object" && X !== null && X.$$typeof === ql && sa(X) === r.type) ? (r = u(r, h.props), Au(r, h), r.return = v, r) : (r = On(
        h.type,
        h.key,
        h.props,
        null,
        v.mode,
        A
      ), Au(r, h), r.return = v, r);
    }
    function y(v, r, h, A) {
      return r === null || r.tag !== 4 || r.stateNode.containerInfo !== h.containerInfo || r.stateNode.implementation !== h.implementation ? (r = fc(h, v.mode, A), r.return = v, r) : (r = u(r, h.children || []), r.return = v, r);
    }
    function T(v, r, h, A, X) {
      return r === null || r.tag !== 7 ? (r = ua(
        h,
        v.mode,
        A,
        X
      ), r.return = v, r) : (r = u(r, h), r.return = v, r);
    }
    function O(v, r, h) {
      if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint")
        return r = cc(
          "" + r,
          v.mode,
          h
        ), r.return = v, r;
      if (typeof r == "object" && r !== null) {
        switch (r.$$typeof) {
          case Z:
            return h = On(
              r.type,
              r.key,
              r.props,
              null,
              v.mode,
              h
            ), Au(h, r), h.return = v, h;
          case cl:
            return r = fc(
              r,
              v.mode,
              h
            ), r.return = v, r;
          case ql:
            return r = sa(r), O(v, r, h);
        }
        if (Wl(r) || Yl(r))
          return r = ua(
            r,
            v.mode,
            h,
            null
          ), r.return = v, r;
        if (typeof r.then == "function")
          return O(v, Cn(r), h);
        if (r.$$typeof === jl)
          return O(
            v,
            Mn(v, r),
            h
          );
        Hn(v, r);
      }
      return null;
    }
    function S(v, r, h, A) {
      var X = r !== null ? r.key : null;
      if (typeof h == "string" && h !== "" || typeof h == "number" || typeof h == "bigint")
        return X !== null ? null : c(v, r, "" + h, A);
      if (typeof h == "object" && h !== null) {
        switch (h.$$typeof) {
          case Z:
            return h.key === X ? s(v, r, h, A) : null;
          case cl:
            return h.key === X ? y(v, r, h, A) : null;
          case ql:
            return h = sa(h), S(v, r, h, A);
        }
        if (Wl(h) || Yl(h))
          return X !== null ? null : T(v, r, h, A, null);
        if (typeof h.then == "function")
          return S(
            v,
            r,
            Cn(h),
            A
          );
        if (h.$$typeof === jl)
          return S(
            v,
            r,
            Mn(v, h),
            A
          );
        Hn(v, h);
      }
      return null;
    }
    function _(v, r, h, A, X) {
      if (typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint")
        return v = v.get(h) || null, c(r, v, "" + A, X);
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case Z:
            return v = v.get(
              A.key === null ? h : A.key
            ) || null, s(r, v, A, X);
          case cl:
            return v = v.get(
              A.key === null ? h : A.key
            ) || null, y(r, v, A, X);
          case ql:
            return A = sa(A), _(
              v,
              r,
              h,
              A,
              X
            );
        }
        if (Wl(A) || Yl(A))
          return v = v.get(h) || null, T(r, v, A, X, null);
        if (typeof A.then == "function")
          return _(
            v,
            r,
            h,
            Cn(A),
            X
          );
        if (A.$$typeof === jl)
          return _(
            v,
            r,
            h,
            Mn(r, A),
            X
          );
        Hn(r, A);
      }
      return null;
    }
    function Y(v, r, h, A) {
      for (var X = null, ol = null, G = r, k = r = 0, ul = null; G !== null && k < h.length; k++) {
        G.index > k ? (ul = G, G = null) : ul = G.sibling;
        var rl = S(
          v,
          G,
          h[k],
          A
        );
        if (rl === null) {
          G === null && (G = ul);
          break;
        }
        l && G && rl.alternate === null && t(v, G), r = n(rl, r, k), ol === null ? X = rl : ol.sibling = rl, ol = rl, G = ul;
      }
      if (k === h.length)
        return e(v, G), il && te(v, k), X;
      if (G === null) {
        for (; k < h.length; k++)
          G = O(v, h[k], A), G !== null && (r = n(
            G,
            r,
            k
          ), ol === null ? X = G : ol.sibling = G, ol = G);
        return il && te(v, k), X;
      }
      for (G = a(G); k < h.length; k++)
        ul = _(
          G,
          v,
          k,
          h[k],
          A
        ), ul !== null && (l && ul.alternate !== null && G.delete(
          ul.key === null ? k : ul.key
        ), r = n(
          ul,
          r,
          k
        ), ol === null ? X = ul : ol.sibling = ul, ol = ul);
      return l && G.forEach(function(Ze) {
        return t(v, Ze);
      }), il && te(v, k), X;
    }
    function L(v, r, h, A) {
      if (h == null) throw Error(o(151));
      for (var X = null, ol = null, G = r, k = r = 0, ul = null, rl = h.next(); G !== null && !rl.done; k++, rl = h.next()) {
        G.index > k ? (ul = G, G = null) : ul = G.sibling;
        var Ze = S(v, G, rl.value, A);
        if (Ze === null) {
          G === null && (G = ul);
          break;
        }
        l && G && Ze.alternate === null && t(v, G), r = n(Ze, r, k), ol === null ? X = Ze : ol.sibling = Ze, ol = Ze, G = ul;
      }
      if (rl.done)
        return e(v, G), il && te(v, k), X;
      if (G === null) {
        for (; !rl.done; k++, rl = h.next())
          rl = O(v, rl.value, A), rl !== null && (r = n(rl, r, k), ol === null ? X = rl : ol.sibling = rl, ol = rl);
        return il && te(v, k), X;
      }
      for (G = a(G); !rl.done; k++, rl = h.next())
        rl = _(G, v, k, rl.value, A), rl !== null && (l && rl.alternate !== null && G.delete(rl.key === null ? k : rl.key), r = n(rl, r, k), ol === null ? X = rl : ol.sibling = rl, ol = rl);
      return l && G.forEach(function(z0) {
        return t(v, z0);
      }), il && te(v, k), X;
    }
    function _l(v, r, h, A) {
      if (typeof h == "object" && h !== null && h.type === I && h.key === null && (h = h.props.children), typeof h == "object" && h !== null) {
        switch (h.$$typeof) {
          case Z:
            l: {
              for (var X = h.key; r !== null; ) {
                if (r.key === X) {
                  if (X = h.type, X === I) {
                    if (r.tag === 7) {
                      e(
                        v,
                        r.sibling
                      ), A = u(
                        r,
                        h.props.children
                      ), A.return = v, v = A;
                      break l;
                    }
                  } else if (r.elementType === X || typeof X == "object" && X !== null && X.$$typeof === ql && sa(X) === r.type) {
                    e(
                      v,
                      r.sibling
                    ), A = u(r, h.props), Au(A, h), A.return = v, v = A;
                    break l;
                  }
                  e(v, r);
                  break;
                } else t(v, r);
                r = r.sibling;
              }
              h.type === I ? (A = ua(
                h.props.children,
                v.mode,
                A,
                h.key
              ), A.return = v, v = A) : (A = On(
                h.type,
                h.key,
                h.props,
                null,
                v.mode,
                A
              ), Au(A, h), A.return = v, v = A);
            }
            return i(v);
          case cl:
            l: {
              for (X = h.key; r !== null; ) {
                if (r.key === X)
                  if (r.tag === 4 && r.stateNode.containerInfo === h.containerInfo && r.stateNode.implementation === h.implementation) {
                    e(
                      v,
                      r.sibling
                    ), A = u(r, h.children || []), A.return = v, v = A;
                    break l;
                  } else {
                    e(v, r);
                    break;
                  }
                else t(v, r);
                r = r.sibling;
              }
              A = fc(h, v.mode, A), A.return = v, v = A;
            }
            return i(v);
          case ql:
            return h = sa(h), _l(
              v,
              r,
              h,
              A
            );
        }
        if (Wl(h))
          return Y(
            v,
            r,
            h,
            A
          );
        if (Yl(h)) {
          if (X = Yl(h), typeof X != "function") throw Error(o(150));
          return h = X.call(h), L(
            v,
            r,
            h,
            A
          );
        }
        if (typeof h.then == "function")
          return _l(
            v,
            r,
            Cn(h),
            A
          );
        if (h.$$typeof === jl)
          return _l(
            v,
            r,
            Mn(v, h),
            A
          );
        Hn(v, h);
      }
      return typeof h == "string" && h !== "" || typeof h == "number" || typeof h == "bigint" ? (h = "" + h, r !== null && r.tag === 6 ? (e(v, r.sibling), A = u(r, h), A.return = v, v = A) : (e(v, r), A = cc(h, v.mode, A), A.return = v, v = A), i(v)) : e(v, r);
    }
    return function(v, r, h, A) {
      try {
        zu = 0;
        var X = _l(
          v,
          r,
          h,
          A
        );
        return Ga = null, X;
      } catch (G) {
        if (G === Ya || G === Rn) throw G;
        var ol = zt(29, G, null, v.mode);
        return ol.lanes = A, ol.return = v, ol;
      } finally {
      }
    };
  }
  var ra = Ro(!0), Uo = Ro(!1), Oe = !1;
  function pc(l) {
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
  function De(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function xe(l, t, e) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (ml & 2) !== 0) {
      var u = a.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), a.pending = t, t = Nn(l), yo(l, null, e), t;
    }
    return An(l, a, t, e), Nn(l);
  }
  function Nu(l, t, e) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (e & 4194048) !== 0)) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, Ts(l, e);
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
  var Tc = !1;
  function Ou() {
    if (Tc) {
      var l = Ba;
      if (l !== null) throw l;
    }
  }
  function Du(l, t, e, a) {
    Tc = !1;
    var u = l.updateQueue;
    Oe = !1;
    var n = u.firstBaseUpdate, i = u.lastBaseUpdate, c = u.shared.pending;
    if (c !== null) {
      u.shared.pending = null;
      var s = c, y = s.next;
      s.next = null, i === null ? n = y : i.next = y, i = s;
      var T = l.alternate;
      T !== null && (T = T.updateQueue, c = T.lastBaseUpdate, c !== i && (c === null ? T.firstBaseUpdate = y : c.next = y, T.lastBaseUpdate = s));
    }
    if (n !== null) {
      var O = u.baseState;
      i = 0, T = y = s = null, c = n;
      do {
        var S = c.lane & -536870913, _ = S !== c.lane;
        if (_ ? (al & S) === S : (a & S) === S) {
          S !== 0 && S === qa && (Tc = !0), T !== null && (T = T.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          l: {
            var Y = l, L = c;
            S = t;
            var _l = e;
            switch (L.tag) {
              case 1:
                if (Y = L.payload, typeof Y == "function") {
                  O = Y.call(_l, O, S);
                  break l;
                }
                O = Y;
                break l;
              case 3:
                Y.flags = Y.flags & -65537 | 128;
              case 0:
                if (Y = L.payload, S = typeof Y == "function" ? Y.call(_l, O, S) : Y, S == null) break l;
                O = z({}, O, S);
                break l;
              case 2:
                Oe = !0;
            }
          }
          S = c.callback, S !== null && (l.flags |= 64, _ && (l.flags |= 8192), _ = u.callbacks, _ === null ? u.callbacks = [S] : _.push(S));
        } else
          _ = {
            lane: S,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null
          }, T === null ? (y = T = _, s = O) : T = T.next = _, i |= S;
        if (c = c.next, c === null) {
          if (c = u.shared.pending, c === null)
            break;
          _ = c, c = _.next, _.next = null, u.lastBaseUpdate = _, u.shared.pending = null;
        }
      } while (!0);
      T === null && (s = O), u.baseState = s, u.firstBaseUpdate = y, u.lastBaseUpdate = T, n === null && (u.shared.lanes = 0), Ce |= i, l.lanes = i, l.memoizedState = O;
    }
  }
  function Co(l, t) {
    if (typeof l != "function")
      throw Error(o(191, l));
    l.call(t);
  }
  function Ho(l, t) {
    var e = l.callbacks;
    if (e !== null)
      for (l.callbacks = null, l = 0; l < e.length; l++)
        Co(e[l], t);
  }
  var Xa = d(null), qn = d(0);
  function qo(l, t) {
    l = de, j(qn, l), j(Xa, t), de = l | t.baseLanes;
  }
  function zc() {
    j(qn, de), j(Xa, Xa.current);
  }
  function Ac() {
    de = qn.current, N(Xa), N(qn);
  }
  var At = d(null), Gt = null;
  function Me(l) {
    var t = l.alternate;
    j(Vl, Vl.current & 1), j(At, l), Gt === null && (t === null || Xa.current !== null || t.memoizedState !== null) && (Gt = l);
  }
  function Nc(l) {
    j(Vl, Vl.current), j(At, l), Gt === null && (Gt = l);
  }
  function Bo(l) {
    l.tag === 22 ? (j(Vl, Vl.current), j(At, l), Gt === null && (Gt = l)) : je();
  }
  function je() {
    j(Vl, Vl.current), j(At, At.current);
  }
  function Nt(l) {
    N(At), Gt === l && (Gt = null), N(Vl);
  }
  var Vl = d(0);
  function Bn(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || Uf(e) || Cf(e)))
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
  var ue = 0, W = null, bl = null, Kl = null, Yn = !1, Qa = !1, da = !1, Gn = 0, xu = 0, Va = null, vh = 0;
  function Ul() {
    throw Error(o(321));
  }
  function Oc(l, t) {
    if (t === null) return !1;
    for (var e = 0; e < t.length && e < l.length; e++)
      if (!Tt(l[e], t[e])) return !1;
    return !0;
  }
  function Dc(l, t, e, a, u, n) {
    return ue = n, W = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, E.H = l === null || l.memoizedState === null ? pr : Lc, da = !1, n = e(a, u), da = !1, Qa && (n = Go(
      t,
      e,
      a,
      u
    )), Yo(l), n;
  }
  function Yo(l) {
    E.H = Ru;
    var t = bl !== null && bl.next !== null;
    if (ue = 0, Kl = bl = W = null, Yn = !1, xu = 0, Va = null, t) throw Error(o(300));
    l === null || Jl || (l = l.dependencies, l !== null && xn(l) && (Jl = !0));
  }
  function Go(l, t, e, a) {
    W = l;
    var u = 0;
    do {
      if (Qa && (Va = null), xu = 0, Qa = !1, 25 <= u) throw Error(o(301));
      if (u += 1, Kl = bl = null, l.updateQueue != null) {
        var n = l.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      E.H = _r, n = t(e, a);
    } while (Qa);
    return n;
  }
  function hh() {
    var l = E.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? Mu(t) : t, l = l.useState()[0], (bl !== null ? bl.memoizedState : null) !== l && (W.flags |= 1024), t;
  }
  function xc() {
    var l = Gn !== 0;
    return Gn = 0, l;
  }
  function Mc(l, t, e) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~e;
  }
  function jc(l) {
    if (Yn) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      Yn = !1;
    }
    ue = 0, Kl = bl = W = null, Qa = !1, xu = Gn = 0, Va = null;
  }
  function ct() {
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
  function Xn() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Mu(l) {
    var t = xu;
    return xu += 1, Va === null && (Va = []), l = xo(Va, l, t), t = W, (Kl === null ? t.memoizedState : Kl.next) === null && (t = t.alternate, E.H = t === null || t.memoizedState === null ? pr : Lc), l;
  }
  function Qn(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Mu(l);
      if (l.$$typeof === jl) return tt(l);
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
    if (t == null && (t = { data: [], index: 0 }), e === null && (e = Xn(), W.updateQueue = e), e.memoCache = t, e = t.data[t.index], e === void 0)
      for (e = t.data[t.index] = Array(l), a = 0; a < l; a++)
        e[a] = bt;
    return t.index++, e;
  }
  function ne(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function Vn(l) {
    var t = Ll();
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
      var c = i = null, s = null, y = t, T = !1;
      do {
        var O = y.lane & -536870913;
        if (O !== y.lane ? (al & O) === O : (ue & O) === O) {
          var S = y.revertLane;
          if (S === 0)
            s !== null && (s = s.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: y.action,
              hasEagerState: y.hasEagerState,
              eagerState: y.eagerState,
              next: null
            }), O === qa && (T = !0);
          else if ((ue & S) === S) {
            y = y.next, S === qa && (T = !0);
            continue;
          } else
            O = {
              lane: 0,
              revertLane: y.revertLane,
              gesture: null,
              action: y.action,
              hasEagerState: y.hasEagerState,
              eagerState: y.eagerState,
              next: null
            }, s === null ? (c = s = O, i = n) : s = s.next = O, W.lanes |= S, Ce |= S;
          O = y.action, da && e(n, O), n = y.hasEagerState ? y.eagerState : e(n, O);
        } else
          S = {
            lane: O,
            revertLane: y.revertLane,
            gesture: y.gesture,
            action: y.action,
            hasEagerState: y.hasEagerState,
            eagerState: y.eagerState,
            next: null
          }, s === null ? (c = s = S, i = n) : s = s.next = S, W.lanes |= O, Ce |= O;
        y = y.next;
      } while (y !== null && y !== t);
      if (s === null ? i = n : s.next = c, !Tt(n, l.memoizedState) && (Jl = !0, T && (e = Ba, e !== null)))
        throw e;
      l.memoizedState = n, l.baseState = i, l.baseQueue = s, a.lastRenderedState = n;
    }
    return u === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function Cc(l) {
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
      Tt(n, t.memoizedState) || (Jl = !0), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), e.lastRenderedState = n;
    }
    return [n, a];
  }
  function Xo(l, t, e) {
    var a = W, u = Ll(), n = il;
    if (n) {
      if (e === void 0) throw Error(o(407));
      e = e();
    } else e = t();
    var i = !Tt(
      (bl || u).memoizedState,
      e
    );
    if (i && (u.memoizedState = e, Jl = !0), u = u.queue, Bc(Lo.bind(null, a, u, l), [
      l
    ]), u.getSnapshot !== t || i || Kl !== null && Kl.memoizedState.tag & 1) {
      if (a.flags |= 2048, La(
        9,
        { destroy: void 0 },
        Vo.bind(
          null,
          a,
          u,
          e,
          t
        ),
        null
      ), El === null) throw Error(o(349));
      n || (ue & 127) !== 0 || Qo(a, t, e);
    }
    return e;
  }
  function Qo(l, t, e) {
    l.flags |= 16384, l = { getSnapshot: t, value: e }, t = W.updateQueue, t === null ? (t = Xn(), W.updateQueue = t, t.stores = [l]) : (e = t.stores, e === null ? t.stores = [l] : e.push(l));
  }
  function Vo(l, t, e, a) {
    t.value = e, t.getSnapshot = a, Zo(t) && Ko(l);
  }
  function Lo(l, t, e) {
    return e(function() {
      Zo(t) && Ko(l);
    });
  }
  function Zo(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var e = t();
      return !Tt(l, e);
    } catch {
      return !0;
    }
  }
  function Ko(l) {
    var t = aa(l, 2);
    t !== null && St(t, l, 2);
  }
  function Hc(l) {
    var t = ct();
    if (typeof l == "function") {
      var e = l;
      if (l = e(), da) {
        pe(!0);
        try {
          e();
        } finally {
          pe(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = l, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ne,
      lastRenderedState: l
    }, t;
  }
  function Jo(l, t, e, a) {
    return l.baseState = e, Uc(
      l,
      bl,
      typeof a == "function" ? a : ne
    );
  }
  function yh(l, t, e, a, u) {
    if (Kn(l)) throw Error(o(485));
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
      E.T !== null ? e(!0) : n.isTransition = !1, a(n), e = t.pending, e === null ? (n.next = t.pending = n, wo(t, n)) : (n.next = e.next, t.pending = e.next = n);
    }
  }
  function wo(l, t) {
    var e = t.action, a = t.payload, u = l.state;
    if (t.isTransition) {
      var n = E.T, i = {};
      E.T = i;
      try {
        var c = e(u, a), s = E.S;
        s !== null && s(i, c), $o(l, t, c);
      } catch (y) {
        qc(l, t, y);
      } finally {
        n !== null && i.types !== null && (n.types = i.types), E.T = n;
      }
    } else
      try {
        n = e(u, a), $o(l, t, n);
      } catch (y) {
        qc(l, t, y);
      }
  }
  function $o(l, t, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        Wo(l, t, a);
      },
      function(a) {
        return qc(l, t, a);
      }
    ) : Wo(l, t, e);
  }
  function Wo(l, t, e) {
    t.status = "fulfilled", t.value = e, Fo(t), l.state = e, t = l.pending, t !== null && (e = t.next, e === t ? l.pending = null : (e = e.next, t.next = e, wo(l, e)));
  }
  function qc(l, t, e) {
    var a = l.pending;
    if (l.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = e, Fo(t), t = t.next;
      while (t !== a);
    }
    l.action = null;
  }
  function Fo(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function ko(l, t) {
    return t;
  }
  function Io(l, t) {
    if (il) {
      var e = El.formState;
      if (e !== null) {
        l: {
          var a = W;
          if (il) {
            if (Ol) {
              t: {
                for (var u = Ol, n = Yt; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break t;
                  }
                  if (u = Xt(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                n = u.data, u = n === "F!" || n === "F" ? u : null;
              }
              if (u) {
                Ol = Xt(
                  u.nextSibling
                ), a = u.data === "F!";
                break l;
              }
            }
            Ae(a);
          }
          a = !1;
        }
        a && (t = e[0]);
      }
    }
    return e = ct(), e.memoizedState = e.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ko,
      lastRenderedState: t
    }, e.queue = a, e = gr.bind(
      null,
      W,
      a
    ), a.dispatch = e, a = Hc(!1), n = Vc.bind(
      null,
      W,
      !1,
      a.queue
    ), a = ct(), u = {
      state: t,
      dispatch: null,
      action: l,
      pending: null
    }, a.queue = u, e = yh.bind(
      null,
      W,
      u,
      n,
      e
    ), u.dispatch = e, a.memoizedState = l, [t, e, !1];
  }
  function Po(l) {
    var t = Ll();
    return lr(t, bl, l);
  }
  function lr(l, t, e) {
    if (t = Uc(
      l,
      t,
      ko
    )[0], l = Vn(ne)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = Mu(t);
      } catch (i) {
        throw i === Ya ? Rn : i;
      }
    else a = t;
    t = Ll();
    var u = t.queue, n = u.dispatch;
    return e !== t.memoizedState && (W.flags |= 2048, La(
      9,
      { destroy: void 0 },
      gh.bind(null, u, e),
      null
    )), [a, n, l];
  }
  function gh(l, t) {
    l.action = t;
  }
  function tr(l) {
    var t = Ll(), e = bl;
    if (e !== null)
      return lr(t, e, l);
    Ll(), t = t.memoizedState, e = Ll();
    var a = e.queue.dispatch;
    return e.memoizedState = l, [t, a, !1];
  }
  function La(l, t, e, a) {
    return l = { tag: l, create: e, deps: a, inst: t, next: null }, t = W.updateQueue, t === null && (t = Xn(), W.updateQueue = t), e = t.lastEffect, e === null ? t.lastEffect = l.next = l : (a = e.next, e.next = l, l.next = a, t.lastEffect = l), l;
  }
  function er() {
    return Ll().memoizedState;
  }
  function Ln(l, t, e, a) {
    var u = ct();
    W.flags |= l, u.memoizedState = La(
      1 | t,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function Zn(l, t, e, a) {
    var u = Ll();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    bl !== null && a !== null && Oc(a, bl.memoizedState.deps) ? u.memoizedState = La(t, n, e, a) : (W.flags |= l, u.memoizedState = La(
      1 | t,
      n,
      e,
      a
    ));
  }
  function ar(l, t) {
    Ln(8390656, 8, l, t);
  }
  function Bc(l, t) {
    Zn(2048, 8, l, t);
  }
  function Sh(l) {
    W.flags |= 4;
    var t = W.updateQueue;
    if (t === null)
      t = Xn(), W.updateQueue = t, t.events = [l];
    else {
      var e = t.events;
      e === null ? t.events = [l] : e.push(l);
    }
  }
  function ur(l) {
    var t = Ll().memoizedState;
    return Sh({ ref: t, nextImpl: l }), function() {
      if ((ml & 2) !== 0) throw Error(o(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function nr(l, t) {
    return Zn(4, 2, l, t);
  }
  function ir(l, t) {
    return Zn(4, 4, l, t);
  }
  function cr(l, t) {
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
  function fr(l, t, e) {
    e = e != null ? e.concat([l]) : null, Zn(4, 4, cr.bind(null, t, l), e);
  }
  function Yc() {
  }
  function sr(l, t) {
    var e = Ll();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    return t !== null && Oc(t, a[1]) ? a[0] : (e.memoizedState = [l, t], l);
  }
  function or(l, t) {
    var e = Ll();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    if (t !== null && Oc(t, a[1]))
      return a[0];
    if (a = l(), da) {
      pe(!0);
      try {
        l();
      } finally {
        pe(!1);
      }
    }
    return e.memoizedState = [a, t], a;
  }
  function Gc(l, t, e) {
    return e === void 0 || (ue & 1073741824) !== 0 && (al & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = e, l = rd(), W.lanes |= l, Ce |= l, e);
  }
  function rr(l, t, e, a) {
    return Tt(e, t) ? e : Xa.current !== null ? (l = Gc(l, e, a), Tt(l, t) || (Jl = !0), l) : (ue & 42) === 0 || (ue & 1073741824) !== 0 && (al & 261930) === 0 ? (Jl = !0, l.memoizedState = e) : (l = rd(), W.lanes |= l, Ce |= l, t);
  }
  function dr(l, t, e, a, u) {
    var n = C.p;
    C.p = n !== 0 && 8 > n ? n : 8;
    var i = E.T, c = {};
    E.T = c, Vc(l, !1, t, e);
    try {
      var s = u(), y = E.S;
      if (y !== null && y(c, s), s !== null && typeof s == "object" && typeof s.then == "function") {
        var T = mh(
          s,
          a
        );
        ju(
          l,
          t,
          T,
          xt(l)
        );
      } else
        ju(
          l,
          t,
          a,
          xt(l)
        );
    } catch (O) {
      ju(
        l,
        t,
        { then: function() {
        }, status: "rejected", reason: O },
        xt()
      );
    } finally {
      C.p = n, i !== null && c.types !== null && (i.types = c.types), E.T = i;
    }
  }
  function bh() {
  }
  function Xc(l, t, e, a) {
    if (l.tag !== 5) throw Error(o(476));
    var u = mr(l).queue;
    dr(
      l,
      u,
      t,
      Q,
      e === null ? bh : function() {
        return vr(l), e(a);
      }
    );
  }
  function mr(l) {
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
        lastRenderedReducer: ne,
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
        lastRenderedReducer: ne,
        lastRenderedState: e
      },
      next: null
    }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
  }
  function vr(l) {
    var t = mr(l);
    t.next === null && (t = l.alternate.memoizedState), ju(
      l,
      t.next.queue,
      {},
      xt()
    );
  }
  function Qc() {
    return tt($u);
  }
  function hr() {
    return Ll().memoizedState;
  }
  function yr() {
    return Ll().memoizedState;
  }
  function ph(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var e = xt();
          l = De(e);
          var a = xe(t, l, e);
          a !== null && (St(a, t, e), Nu(a, t, e)), t = { cache: yc() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function _h(l, t, e) {
    var a = xt();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Kn(l) ? Sr(t, e) : (e = nc(l, t, e, a), e !== null && (St(e, l, a), br(e, t, a)));
  }
  function gr(l, t, e) {
    var a = xt();
    ju(l, t, e, a);
  }
  function ju(l, t, e, a) {
    var u = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Kn(l)) Sr(t, u);
    else {
      var n = l.alternate;
      if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null))
        try {
          var i = t.lastRenderedState, c = n(i, e);
          if (u.hasEagerState = !0, u.eagerState = c, Tt(c, i))
            return An(l, t, u, 0), El === null && zn(), !1;
        } catch {
        } finally {
        }
      if (e = nc(l, t, u, a), e !== null)
        return St(e, l, a), br(e, t, a), !0;
    }
    return !1;
  }
  function Vc(l, t, e, a) {
    if (a = {
      lane: 2,
      revertLane: _f(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Kn(l)) {
      if (t) throw Error(o(479));
    } else
      t = nc(
        l,
        e,
        a,
        2
      ), t !== null && St(t, l, 2);
  }
  function Kn(l) {
    var t = l.alternate;
    return l === W || t !== null && t === W;
  }
  function Sr(l, t) {
    Qa = Yn = !0;
    var e = l.pending;
    e === null ? t.next = t : (t.next = e.next, e.next = t), l.pending = t;
  }
  function br(l, t, e) {
    if ((e & 4194048) !== 0) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, Ts(l, e);
    }
  }
  var Ru = {
    readContext: tt,
    use: Qn,
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
  var pr = {
    readContext: tt,
    use: Qn,
    useCallback: function(l, t) {
      return ct().memoizedState = [
        l,
        t === void 0 ? null : t
      ], l;
    },
    useContext: tt,
    useEffect: ar,
    useImperativeHandle: function(l, t, e) {
      e = e != null ? e.concat([l]) : null, Ln(
        4194308,
        4,
        cr.bind(null, t, l),
        e
      );
    },
    useLayoutEffect: function(l, t) {
      return Ln(4194308, 4, l, t);
    },
    useInsertionEffect: function(l, t) {
      Ln(4, 2, l, t);
    },
    useMemo: function(l, t) {
      var e = ct();
      t = t === void 0 ? null : t;
      var a = l();
      if (da) {
        pe(!0);
        try {
          l();
        } finally {
          pe(!1);
        }
      }
      return e.memoizedState = [a, t], a;
    },
    useReducer: function(l, t, e) {
      var a = ct();
      if (e !== void 0) {
        var u = e(t);
        if (da) {
          pe(!0);
          try {
            e(t);
          } finally {
            pe(!1);
          }
        }
      } else u = t;
      return a.memoizedState = a.baseState = u, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: u
      }, a.queue = l, l = l.dispatch = _h.bind(
        null,
        W,
        l
      ), [a.memoizedState, l];
    },
    useRef: function(l) {
      var t = ct();
      return l = { current: l }, t.memoizedState = l;
    },
    useState: function(l) {
      l = Hc(l);
      var t = l.queue, e = gr.bind(null, W, t);
      return t.dispatch = e, [l.memoizedState, e];
    },
    useDebugValue: Yc,
    useDeferredValue: function(l, t) {
      var e = ct();
      return Gc(e, l, t);
    },
    useTransition: function() {
      var l = Hc(!1);
      return l = dr.bind(
        null,
        W,
        l.queue,
        !0,
        !1
      ), ct().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, t, e) {
      var a = W, u = ct();
      if (il) {
        if (e === void 0)
          throw Error(o(407));
        e = e();
      } else {
        if (e = t(), El === null)
          throw Error(o(349));
        (al & 127) !== 0 || Qo(a, t, e);
      }
      u.memoizedState = e;
      var n = { value: e, getSnapshot: t };
      return u.queue = n, ar(Lo.bind(null, a, n, l), [
        l
      ]), a.flags |= 2048, La(
        9,
        { destroy: void 0 },
        Vo.bind(
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
      var l = ct(), t = El.identifierPrefix;
      if (il) {
        var e = Jt, a = Kt;
        e = (a & ~(1 << 32 - Et(a) - 1)).toString(32) + e, t = "_" + t + "R_" + e, e = Gn++, 0 < e && (t += "H" + e.toString(32)), t += "_";
      } else
        e = vh++, t = "_" + t + "r_" + e.toString(32) + "_";
      return l.memoizedState = t;
    },
    useHostTransitionStatus: Qc,
    useFormState: Io,
    useActionState: Io,
    useOptimistic: function(l) {
      var t = ct();
      t.memoizedState = t.baseState = l;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = e, t = Vc.bind(
        null,
        W,
        !0,
        e
      ), e.dispatch = t, [l, t];
    },
    useMemoCache: Rc,
    useCacheRefresh: function() {
      return ct().memoizedState = ph.bind(
        null,
        W
      );
    },
    useEffectEvent: function(l) {
      var t = ct(), e = { impl: l };
      return t.memoizedState = e, function() {
        if ((ml & 2) !== 0)
          throw Error(o(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, Lc = {
    readContext: tt,
    use: Qn,
    useCallback: sr,
    useContext: tt,
    useEffect: Bc,
    useImperativeHandle: fr,
    useInsertionEffect: nr,
    useLayoutEffect: ir,
    useMemo: or,
    useReducer: Vn,
    useRef: er,
    useState: function() {
      return Vn(ne);
    },
    useDebugValue: Yc,
    useDeferredValue: function(l, t) {
      var e = Ll();
      return rr(
        e,
        bl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = Vn(ne)[0], t = Ll().memoizedState;
      return [
        typeof l == "boolean" ? l : Mu(l),
        t
      ];
    },
    useSyncExternalStore: Xo,
    useId: hr,
    useHostTransitionStatus: Qc,
    useFormState: Po,
    useActionState: Po,
    useOptimistic: function(l, t) {
      var e = Ll();
      return Jo(e, bl, l, t);
    },
    useMemoCache: Rc,
    useCacheRefresh: yr
  };
  Lc.useEffectEvent = ur;
  var _r = {
    readContext: tt,
    use: Qn,
    useCallback: sr,
    useContext: tt,
    useEffect: Bc,
    useImperativeHandle: fr,
    useInsertionEffect: nr,
    useLayoutEffect: ir,
    useMemo: or,
    useReducer: Cc,
    useRef: er,
    useState: function() {
      return Cc(ne);
    },
    useDebugValue: Yc,
    useDeferredValue: function(l, t) {
      var e = Ll();
      return bl === null ? Gc(e, l, t) : rr(
        e,
        bl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = Cc(ne)[0], t = Ll().memoizedState;
      return [
        typeof l == "boolean" ? l : Mu(l),
        t
      ];
    },
    useSyncExternalStore: Xo,
    useId: hr,
    useHostTransitionStatus: Qc,
    useFormState: tr,
    useActionState: tr,
    useOptimistic: function(l, t) {
      var e = Ll();
      return bl !== null ? Jo(e, bl, l, t) : (e.baseState = l, [l, e.queue.dispatch]);
    },
    useMemoCache: Rc,
    useCacheRefresh: yr
  };
  _r.useEffectEvent = ur;
  function Zc(l, t, e, a) {
    t = l.memoizedState, e = e(a, t), e = e == null ? t : z({}, t, e), l.memoizedState = e, l.lanes === 0 && (l.updateQueue.baseState = e);
  }
  var Kc = {
    enqueueSetState: function(l, t, e) {
      l = l._reactInternals;
      var a = xt(), u = De(a);
      u.payload = t, e != null && (u.callback = e), t = xe(l, u, a), t !== null && (St(t, l, a), Nu(t, l, a));
    },
    enqueueReplaceState: function(l, t, e) {
      l = l._reactInternals;
      var a = xt(), u = De(a);
      u.tag = 1, u.payload = t, e != null && (u.callback = e), t = xe(l, u, a), t !== null && (St(t, l, a), Nu(t, l, a));
    },
    enqueueForceUpdate: function(l, t) {
      l = l._reactInternals;
      var e = xt(), a = De(e);
      a.tag = 2, t != null && (a.callback = t), t = xe(l, a, e), t !== null && (St(t, l, e), Nu(t, l, e));
    }
  };
  function Er(l, t, e, a, u, n, i) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, n, i) : t.prototype && t.prototype.isPureReactComponent ? !Su(e, a) || !Su(u, n) : !0;
  }
  function Tr(l, t, e, a) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(e, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(e, a), t.state !== l && Kc.enqueueReplaceState(t, t.state, null);
  }
  function ma(l, t) {
    var e = t;
    if ("ref" in t) {
      e = {};
      for (var a in t)
        a !== "ref" && (e[a] = t[a]);
    }
    if (l = l.defaultProps) {
      e === t && (e = z({}, e));
      for (var u in l)
        e[u] === void 0 && (e[u] = l[u]);
    }
    return e;
  }
  function zr(l) {
    Tn(l);
  }
  function Ar(l) {
    console.error(l);
  }
  function Nr(l) {
    Tn(l);
  }
  function Jn(l, t) {
    try {
      var e = l.onUncaughtError;
      e(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Or(l, t, e) {
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
  function Jc(l, t, e) {
    return e = De(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      Jn(l, t);
    }, e;
  }
  function Dr(l) {
    return l = De(l), l.tag = 3, l;
  }
  function xr(l, t, e, a) {
    var u = e.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = a.value;
      l.payload = function() {
        return u(n);
      }, l.callback = function() {
        Or(t, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (l.callback = function() {
      Or(t, e, a), typeof u != "function" && (He === null ? He = /* @__PURE__ */ new Set([this]) : He.add(this));
      var c = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: c !== null ? c : ""
      });
    });
  }
  function Eh(l, t, e, a, u) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = e.alternate, t !== null && Ha(
        t,
        e,
        u,
        !0
      ), e = At.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return Gt === null ? ui() : e.alternate === null && Cl === 0 && (Cl = 3), e.flags &= -257, e.flags |= 65536, e.lanes = u, a === Un ? e.flags |= 16384 : (t = e.updateQueue, t === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), Sf(l, a, u)), !1;
          case 22:
            return e.flags |= 65536, a === Un ? e.flags |= 16384 : (t = e.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = t) : (e = t.retryQueue, e === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), Sf(l, a, u)), !1;
        }
        throw Error(o(435, e.tag));
      }
      return Sf(l, a, u), ui(), !1;
    }
    if (il)
      return t = At.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, a !== rc && (l = Error(o(422), { cause: a }), _u(Ht(l, e)))) : (a !== rc && (t = Error(o(423), {
        cause: a
      }), _u(
        Ht(t, e)
      )), l = l.current.alternate, l.flags |= 65536, u &= -u, l.lanes |= u, a = Ht(a, e), u = Jc(
        l.stateNode,
        a,
        u
      ), Ec(l, u), Cl !== 4 && (Cl = 2)), !1;
    var n = Error(o(520), { cause: a });
    if (n = Ht(n, e), Xu === null ? Xu = [n] : Xu.push(n), Cl !== 4 && (Cl = 2), t === null) return !0;
    a = Ht(a, e), e = t;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, l = u & -u, e.lanes |= l, l = Jc(e.stateNode, a, l), Ec(e, l), !1;
        case 1:
          if (t = e.type, n = e.stateNode, (e.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (He === null || !He.has(n))))
            return e.flags |= 65536, u &= -u, e.lanes |= u, u = Dr(u), xr(
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
  var wc = Error(o(461)), Jl = !1;
  function et(l, t, e, a) {
    t.child = l === null ? Uo(t, null, e, a) : ra(
      t,
      l.child,
      e,
      a
    );
  }
  function Mr(l, t, e, a, u) {
    e = e.render;
    var n = t.ref;
    if ("ref" in a) {
      var i = {};
      for (var c in a)
        c !== "ref" && (i[c] = a[c]);
    } else i = a;
    return ca(t), a = Dc(
      l,
      t,
      e,
      i,
      n,
      u
    ), c = xc(), l !== null && !Jl ? (Mc(l, t, u), ie(l, t, u)) : (il && c && sc(t), t.flags |= 1, et(l, t, a, u), t.child);
  }
  function jr(l, t, e, a, u) {
    if (l === null) {
      var n = e.type;
      return typeof n == "function" && !ic(n) && n.defaultProps === void 0 && e.compare === null ? (t.tag = 15, t.type = n, Rr(
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
    if (n = l.child, !tf(l, u)) {
      var i = n.memoizedProps;
      if (e = e.compare, e = e !== null ? e : Su, e(i, a) && l.ref === t.ref)
        return ie(l, t, u);
    }
    return t.flags |= 1, l = le(n, a), l.ref = t.ref, l.return = t, t.child = l;
  }
  function Rr(l, t, e, a, u) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (Su(n, a) && l.ref === t.ref)
        if (Jl = !1, t.pendingProps = a = n, tf(l, u))
          (l.flags & 131072) !== 0 && (Jl = !0);
        else
          return t.lanes = l.lanes, ie(l, t, u);
    }
    return $c(
      l,
      t,
      e,
      a,
      u
    );
  }
  function Ur(l, t, e, a) {
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
        return Cr(
          l,
          t,
          n,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && jn(
          t,
          n !== null ? n.cachePool : null
        ), n !== null ? qo(t, n) : zc(), Bo(t);
      else
        return a = t.lanes = 536870912, Cr(
          l,
          t,
          n !== null ? n.baseLanes | e : e,
          e,
          a
        );
    } else
      n !== null ? (jn(t, n.cachePool), qo(t, n), je(), t.memoizedState = null) : (l !== null && jn(t, null), zc(), je());
    return et(l, t, u, e), t.child;
  }
  function Uu(l, t) {
    return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Cr(l, t, e, a, u) {
    var n = Sc();
    return n = n === null ? null : { parent: Zl._currentValue, pool: n }, t.memoizedState = {
      baseLanes: e,
      cachePool: n
    }, l !== null && jn(t, null), zc(), Bo(t), l !== null && Ha(l, t, a, !0), t.childLanes = u, null;
  }
  function wn(l, t) {
    return t = Wn(
      { mode: t.mode, children: t.children },
      l.mode
    ), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function Hr(l, t, e) {
    return ra(t, l.child, null, e), l = wn(t, t.pendingProps), l.flags |= 2, Nt(t), t.memoizedState = null, l;
  }
  function Th(l, t, e) {
    var a = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (il) {
        if (a.mode === "hidden")
          return l = wn(t, a), t.lanes = 536870912, Uu(null, l);
        if (Nc(t), (l = Ol) ? (l = wd(
          l,
          Yt
        ), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: Te !== null ? { id: Kt, overflow: Jt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = So(l), e.return = t, t.child = e, lt = t, Ol = null)) : l = null, l === null) throw Ae(t);
        return t.lanes = 536870912, null;
      }
      return wn(t, a);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var i = n.dehydrated;
      if (Nc(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = Hr(
            l,
            t,
            e
          );
        else if (t.memoizedState !== null)
          t.child = l.child, t.flags |= 128, t = null;
        else throw Error(o(558));
      else if (Jl || Ha(l, t, e, !1), u = (e & l.childLanes) !== 0, Jl || u) {
        if (a = El, a !== null && (i = zs(a, e), i !== 0 && i !== n.retryLane))
          throw n.retryLane = i, aa(l, i), St(a, l, i), wc;
        ui(), t = Hr(
          l,
          t,
          e
        );
      } else
        l = n.treeContext, Ol = Xt(i.nextSibling), lt = t, il = !0, ze = null, Yt = !1, l !== null && _o(t, l), t = wn(t, a), t.flags |= 4096;
      return t;
    }
    return l = le(l.child, {
      mode: a.mode,
      children: a.children
    }), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function $n(l, t) {
    var e = t.ref;
    if (e === null)
      l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(o(284));
      (l === null || l.ref !== e) && (t.flags |= 4194816);
    }
  }
  function $c(l, t, e, a, u) {
    return ca(t), e = Dc(
      l,
      t,
      e,
      a,
      void 0,
      u
    ), a = xc(), l !== null && !Jl ? (Mc(l, t, u), ie(l, t, u)) : (il && a && sc(t), t.flags |= 1, et(l, t, e, u), t.child);
  }
  function qr(l, t, e, a, u, n) {
    return ca(t), t.updateQueue = null, e = Go(
      t,
      a,
      e,
      u
    ), Yo(l), a = xc(), l !== null && !Jl ? (Mc(l, t, n), ie(l, t, n)) : (il && a && sc(t), t.flags |= 1, et(l, t, e, n), t.child);
  }
  function Br(l, t, e, a, u) {
    if (ca(t), t.stateNode === null) {
      var n = ja, i = e.contextType;
      typeof i == "object" && i !== null && (n = tt(i)), n = new e(a, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = Kc, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = a, n.state = t.memoizedState, n.refs = {}, pc(t), i = e.contextType, n.context = typeof i == "object" && i !== null ? tt(i) : ja, n.state = t.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (Zc(
        t,
        e,
        i,
        a
      ), n.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (i = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), i !== n.state && Kc.enqueueReplaceState(n, n.state, null), Du(t, a, n, u), Ou(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (l === null) {
      n = t.stateNode;
      var c = t.memoizedProps, s = ma(e, c);
      n.props = s;
      var y = n.context, T = e.contextType;
      i = ja, typeof T == "object" && T !== null && (i = tt(T));
      var O = e.getDerivedStateFromProps;
      T = typeof O == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = t.pendingProps !== c, T || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || y !== i) && Tr(
        t,
        n,
        a,
        i
      ), Oe = !1;
      var S = t.memoizedState;
      n.state = S, Du(t, a, n, u), Ou(), y = t.memoizedState, c || S !== y || Oe ? (typeof O == "function" && (Zc(
        t,
        e,
        O,
        a
      ), y = t.memoizedState), (s = Oe || Er(
        t,
        e,
        s,
        a,
        S,
        y,
        i
      )) ? (T || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = y), n.props = a, n.state = y, n.context = i, a = s) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      n = t.stateNode, _c(l, t), i = t.memoizedProps, T = ma(e, i), n.props = T, O = t.pendingProps, S = n.context, y = e.contextType, s = ja, typeof y == "object" && y !== null && (s = tt(y)), c = e.getDerivedStateFromProps, (y = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i !== O || S !== s) && Tr(
        t,
        n,
        a,
        s
      ), Oe = !1, S = t.memoizedState, n.state = S, Du(t, a, n, u), Ou();
      var _ = t.memoizedState;
      i !== O || S !== _ || Oe || l !== null && l.dependencies !== null && xn(l.dependencies) ? (typeof c == "function" && (Zc(
        t,
        e,
        c,
        a
      ), _ = t.memoizedState), (T = Oe || Er(
        t,
        e,
        T,
        a,
        S,
        _,
        s
      ) || l !== null && l.dependencies !== null && xn(l.dependencies)) ? (y || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, _, s), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        a,
        _,
        s
      )), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || i === l.memoizedProps && S === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && S === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = _), n.props = a, n.state = _, n.context = s, a = T) : (typeof n.componentDidUpdate != "function" || i === l.memoizedProps && S === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && S === l.memoizedState || (t.flags |= 1024), a = !1);
    }
    return n = a, $n(l, t), a = (t.flags & 128) !== 0, n || a ? (n = t.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && a ? (t.child = ra(
      t,
      l.child,
      null,
      u
    ), t.child = ra(
      t,
      null,
      e,
      u
    )) : et(l, t, e, u), t.memoizedState = n.state, l = t.child) : l = ie(
      l,
      t,
      u
    ), l;
  }
  function Yr(l, t, e, a) {
    return na(), t.flags |= 256, et(l, t, e, a), t.child;
  }
  var Wc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Fc(l) {
    return { baseLanes: l, cachePool: Oo() };
  }
  function kc(l, t, e) {
    return l = l !== null ? l.childLanes & ~e : 0, t && (l |= Dt), l;
  }
  function Gr(l, t, e) {
    var a = t.pendingProps, u = !1, n = (t.flags & 128) !== 0, i;
    if ((i = n) || (i = l !== null && l.memoizedState === null ? !1 : (Vl.current & 2) !== 0), i && (u = !0, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (il) {
        if (u ? Me(t) : je(), (l = Ol) ? (l = wd(
          l,
          Yt
        ), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: Te !== null ? { id: Kt, overflow: Jt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = So(l), e.return = t, t.child = e, lt = t, Ol = null)) : l = null, l === null) throw Ae(t);
        return Cf(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var c = a.children;
      return a = a.fallback, u ? (je(), u = t.mode, c = Wn(
        { mode: "hidden", children: c },
        u
      ), a = ua(
        a,
        u,
        e,
        null
      ), c.return = t, a.return = t, c.sibling = a, t.child = c, a = t.child, a.memoizedState = Fc(e), a.childLanes = kc(
        l,
        i,
        e
      ), t.memoizedState = Wc, Uu(null, a)) : (Me(t), Ic(t, c));
    }
    var s = l.memoizedState;
    if (s !== null && (c = s.dehydrated, c !== null)) {
      if (n)
        t.flags & 256 ? (Me(t), t.flags &= -257, t = Pc(
          l,
          t,
          e
        )) : t.memoizedState !== null ? (je(), t.child = l.child, t.flags |= 128, t = null) : (je(), c = a.fallback, u = t.mode, a = Wn(
          { mode: "visible", children: a.children },
          u
        ), c = ua(
          c,
          u,
          e,
          null
        ), c.flags |= 2, a.return = t, c.return = t, a.sibling = c, t.child = a, ra(
          t,
          l.child,
          null,
          e
        ), a = t.child, a.memoizedState = Fc(e), a.childLanes = kc(
          l,
          i,
          e
        ), t.memoizedState = Wc, t = Uu(null, a));
      else if (Me(t), Cf(c)) {
        if (i = c.nextSibling && c.nextSibling.dataset, i) var y = i.dgst;
        i = y, a = Error(o(419)), a.stack = "", a.digest = i, _u({ value: a, source: null, stack: null }), t = Pc(
          l,
          t,
          e
        );
      } else if (Jl || Ha(l, t, e, !1), i = (e & l.childLanes) !== 0, Jl || i) {
        if (i = El, i !== null && (a = zs(i, e), a !== 0 && a !== s.retryLane))
          throw s.retryLane = a, aa(l, a), St(i, l, a), wc;
        Uf(c) || ui(), t = Pc(
          l,
          t,
          e
        );
      } else
        Uf(c) ? (t.flags |= 192, t.child = l.child, t = null) : (l = s.treeContext, Ol = Xt(
          c.nextSibling
        ), lt = t, il = !0, ze = null, Yt = !1, l !== null && _o(t, l), t = Ic(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (je(), c = a.fallback, u = t.mode, s = l.child, y = s.sibling, a = le(s, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = s.subtreeFlags & 65011712, y !== null ? c = le(
      y,
      c
    ) : (c = ua(
      c,
      u,
      e,
      null
    ), c.flags |= 2), c.return = t, a.return = t, a.sibling = c, t.child = a, Uu(null, a), a = t.child, c = l.child.memoizedState, c === null ? c = Fc(e) : (u = c.cachePool, u !== null ? (s = Zl._currentValue, u = u.parent !== s ? { parent: s, pool: s } : u) : u = Oo(), c = {
      baseLanes: c.baseLanes | e,
      cachePool: u
    }), a.memoizedState = c, a.childLanes = kc(
      l,
      i,
      e
    ), t.memoizedState = Wc, Uu(l.child, a)) : (Me(t), e = l.child, l = e.sibling, e = le(e, {
      mode: "visible",
      children: a.children
    }), e.return = t, e.sibling = null, l !== null && (i = t.deletions, i === null ? (t.deletions = [l], t.flags |= 16) : i.push(l)), t.child = e, t.memoizedState = null, e);
  }
  function Ic(l, t) {
    return t = Wn(
      { mode: "visible", children: t },
      l.mode
    ), t.return = l, l.child = t;
  }
  function Wn(l, t) {
    return l = zt(22, l, null, t), l.lanes = 0, l;
  }
  function Pc(l, t, e) {
    return ra(t, l.child, null, e), l = Ic(
      t,
      t.pendingProps.children
    ), l.flags |= 2, t.memoizedState = null, l;
  }
  function Xr(l, t, e) {
    l.lanes |= t;
    var a = l.alternate;
    a !== null && (a.lanes |= t), vc(l.return, t, e);
  }
  function lf(l, t, e, a, u, n) {
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
  function Qr(l, t, e) {
    var a = t.pendingProps, u = a.revealOrder, n = a.tail;
    a = a.children;
    var i = Vl.current, c = (i & 2) !== 0;
    if (c ? (i = i & 1 | 2, t.flags |= 128) : i &= 1, j(Vl, i), et(l, t, a, e), a = il ? pu : 0, !c && l !== null && (l.flags & 128) !== 0)
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && Xr(l, e, t);
        else if (l.tag === 19)
          Xr(l, e, t);
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
          l = e.alternate, l !== null && Bn(l) === null && (u = e), e = e.sibling;
        e = u, e === null ? (u = t.child, t.child = null) : (u = e.sibling, e.sibling = null), lf(
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
          if (l = u.alternate, l !== null && Bn(l) === null) {
            t.child = u;
            break;
          }
          l = u.sibling, u.sibling = e, e = u, u = l;
        }
        lf(
          t,
          !0,
          e,
          null,
          n,
          a
        );
        break;
      case "together":
        lf(
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
  function ie(l, t, e) {
    if (l !== null && (t.dependencies = l.dependencies), Ce |= t.lanes, (e & t.childLanes) === 0)
      if (l !== null) {
        if (Ha(
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
      for (l = t.child, e = le(l, l.pendingProps), t.child = e, e.return = t; l.sibling !== null; )
        l = l.sibling, e = e.sibling = le(l, l.pendingProps), e.return = t;
      e.sibling = null;
    }
    return t.child;
  }
  function tf(l, t) {
    return (l.lanes & t) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && xn(l)));
  }
  function zh(l, t, e) {
    switch (t.tag) {
      case 3:
        Xl(t, t.stateNode.containerInfo), Ne(t, Zl, l.memoizedState.cache), na();
        break;
      case 27:
      case 5:
        Se(t);
        break;
      case 4:
        Xl(t, t.stateNode.containerInfo);
        break;
      case 10:
        Ne(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Nc(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (Me(t), t.flags |= 128, null) : (e & t.child.childLanes) !== 0 ? Gr(l, t, e) : (Me(t), l = ie(
            l,
            t,
            e
          ), l !== null ? l.sibling : null);
        Me(t);
        break;
      case 19:
        var u = (l.flags & 128) !== 0;
        if (a = (e & t.childLanes) !== 0, a || (Ha(
          l,
          t,
          e,
          !1
        ), a = (e & t.childLanes) !== 0), u) {
          if (a)
            return Qr(
              l,
              t,
              e
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), j(Vl, Vl.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, Ur(
          l,
          t,
          e,
          t.pendingProps
        );
      case 24:
        Ne(t, Zl, l.memoizedState.cache);
    }
    return ie(l, t, e);
  }
  function Vr(l, t, e) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps)
        Jl = !0;
      else {
        if (!tf(l, e) && (t.flags & 128) === 0)
          return Jl = !1, zh(
            l,
            t,
            e
          );
        Jl = (l.flags & 131072) !== 0;
      }
    else
      Jl = !1, il && (t.flags & 1048576) !== 0 && po(t, pu, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (l = sa(t.elementType), t.type = l, typeof l == "function")
            ic(l) ? (a = ma(l, a), t.tag = 1, t = Br(
              null,
              t,
              l,
              a,
              e
            )) : (t.tag = 0, t = $c(
              null,
              t,
              l,
              a,
              e
            ));
          else {
            if (l != null) {
              var u = l.$$typeof;
              if (u === P) {
                t.tag = 11, t = Mr(
                  null,
                  t,
                  l,
                  a,
                  e
                );
                break l;
              } else if (u === K) {
                t.tag = 14, t = jr(
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
        return $c(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 1:
        return a = t.type, u = ma(
          a,
          t.pendingProps
        ), Br(
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
          u = n.element, _c(l, t), Du(t, a, null, e);
          var i = t.memoizedState;
          if (a = i.cache, Ne(t, Zl, a), a !== n.cache && hc(
            t,
            [Zl],
            e,
            !0
          ), Ou(), a = i.element, n.isDehydrated)
            if (n = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
              t = Yr(
                l,
                t,
                a,
                e
              );
              break l;
            } else if (a !== u) {
              u = Ht(
                Error(o(424)),
                t
              ), _u(u), t = Yr(
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
              for (Ol = Xt(l.firstChild), lt = t, il = !0, ze = null, Yt = !0, e = Uo(
                t,
                null,
                a,
                e
              ), t.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
            }
          else {
            if (na(), a === u) {
              t = ie(
                l,
                t,
                e
              );
              break l;
            }
            et(l, t, a, e);
          }
          t = t.child;
        }
        return t;
      case 26:
        return $n(l, t), l === null ? (e = Pd(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = e : il || (e = t.type, l = t.pendingProps, a = ri(
          $.current
        ).createElement(e), a[Pl] = t, a[dt] = l, at(a, e, l), Fl(a), t.stateNode = a) : t.memoizedState = Pd(
          t.type,
          l.memoizedProps,
          t.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return Se(t), l === null && il && (a = t.stateNode = Fd(
          t.type,
          t.pendingProps,
          $.current
        ), lt = t, Yt = !0, u = Ol, Ge(t.type) ? (Hf = u, Ol = Xt(a.firstChild)) : Ol = u), et(
          l,
          t,
          t.pendingProps.children,
          e
        ), $n(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && il && ((u = a = Ol) && (a = l0(
          a,
          t.type,
          t.pendingProps,
          Yt
        ), a !== null ? (t.stateNode = a, lt = t, Ol = Xt(a.firstChild), Yt = !1, u = !0) : u = !1), u || Ae(t)), Se(t), u = t.type, n = t.pendingProps, i = l !== null ? l.memoizedProps : null, a = n.children, Mf(u, n) ? a = null : i !== null && Mf(u, i) && (t.flags |= 32), t.memoizedState !== null && (u = Dc(
          l,
          t,
          hh,
          null,
          null,
          e
        ), $u._currentValue = u), $n(l, t), et(l, t, a, e), t.child;
      case 6:
        return l === null && il && ((l = e = Ol) && (e = t0(
          e,
          t.pendingProps,
          Yt
        ), e !== null ? (t.stateNode = e, lt = t, Ol = null, l = !0) : l = !1), l || Ae(t)), null;
      case 13:
        return Gr(l, t, e);
      case 4:
        return Xl(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, l === null ? t.child = ra(
          t,
          null,
          a,
          e
        ) : et(l, t, a, e), t.child;
      case 11:
        return Mr(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 7:
        return et(
          l,
          t,
          t.pendingProps,
          e
        ), t.child;
      case 8:
        return et(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 12:
        return et(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 10:
        return a = t.pendingProps, Ne(t, t.type, a.value), et(l, t, a.children, e), t.child;
      case 9:
        return u = t.type._context, a = t.pendingProps.children, ca(t), u = tt(u), a = a(u), t.flags |= 1, et(l, t, a, e), t.child;
      case 14:
        return jr(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 15:
        return Rr(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 19:
        return Qr(l, t, e);
      case 31:
        return Th(l, t, e);
      case 22:
        return Ur(
          l,
          t,
          e,
          t.pendingProps
        );
      case 24:
        return ca(t), a = tt(Zl), l === null ? (u = Sc(), u === null && (u = El, n = yc(), u.pooledCache = n, n.refCount++, n !== null && (u.pooledCacheLanes |= e), u = n), t.memoizedState = { parent: a, cache: u }, pc(t), Ne(t, Zl, u)) : ((l.lanes & e) !== 0 && (_c(l, t), Du(t, null, null, e), Ou()), u = l.memoizedState, n = t.memoizedState, u.parent !== a ? (u = { parent: a, cache: a }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), Ne(t, Zl, a)) : (a = n.cache, Ne(t, Zl, a), a !== u.cache && hc(
          t,
          [Zl],
          e,
          !0
        ))), et(
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
  function ce(l) {
    l.flags |= 4;
  }
  function ef(l, t, e, a, u) {
    if ((t = (l.mode & 32) !== 0) && (t = !1), t) {
      if (l.flags |= 16777216, (u & 335544128) === u)
        if (l.stateNode.complete) l.flags |= 8192;
        else if (hd()) l.flags |= 8192;
        else
          throw oa = Un, bc;
    } else l.flags &= -16777217;
  }
  function Lr(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !um(t))
      if (hd()) l.flags |= 8192;
      else
        throw oa = Un, bc;
  }
  function Fn(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? _s() : 536870912, l.lanes |= t, wa |= t);
  }
  function Cu(l, t) {
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
  function Ah(l, t, e) {
    var a = t.pendingProps;
    switch (oc(t), t.tag) {
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
        return e = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), ae(Zl), Rl(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (l === null || l.child === null) && (Ca(t) ? ce(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, dc())), Dl(t), null;
      case 26:
        var u = t.type, n = t.memoizedState;
        return l === null ? (ce(t), n !== null ? (Dl(t), Lr(t, n)) : (Dl(t), ef(
          t,
          u,
          null,
          a,
          e
        ))) : n ? n !== l.memoizedState ? (ce(t), Dl(t), Lr(t, n)) : (Dl(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== a && ce(t), Dl(t), ef(
          t,
          u,
          l,
          a,
          e
        )), null;
      case 27:
        if (We(t), e = $.current, u = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && ce(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Dl(t), null;
          }
          l = q.current, Ca(t) ? Eo(t) : (l = Fd(u, a, e), t.stateNode = l, ce(t));
        }
        return Dl(t), null;
      case 5:
        if (We(t), u = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && ce(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Dl(t), null;
          }
          if (n = q.current, Ca(t))
            Eo(t);
          else {
            var i = ri(
              $.current
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
            n[Pl] = t, n[dt] = a;
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
            l: switch (at(n, u, a), u) {
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
            a && ce(t);
          }
        }
        return Dl(t), ef(
          t,
          t.type,
          l === null ? null : l.memoizedProps,
          t.pendingProps,
          e
        ), null;
      case 6:
        if (l && t.stateNode != null)
          l.memoizedProps !== a && ce(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(o(166));
          if (l = $.current, Ca(t)) {
            if (l = t.stateNode, e = t.memoizedProps, a = null, u = lt, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            l[Pl] = t, l = !!(l.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || Gd(l.nodeValue, e)), l || Ae(t, !0);
          } else
            l = ri(l).createTextNode(
              a
            ), l[Pl] = t, t.stateNode = l;
        }
        return Dl(t), null;
      case 31:
        if (e = t.memoizedState, l === null || l.memoizedState !== null) {
          if (a = Ca(t), e !== null) {
            if (l === null) {
              if (!a) throw Error(o(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(557));
              l[Pl] = t;
            } else
              na(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Dl(t), l = !1;
          } else
            e = dc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), l = !0;
          if (!l)
            return t.flags & 256 ? (Nt(t), t) : (Nt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(o(558));
        }
        return Dl(t), null;
      case 13:
        if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (u = Ca(t), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!u) throw Error(o(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(o(317));
              u[Pl] = t;
            } else
              na(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Dl(t), u = !1;
          } else
            u = dc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (Nt(t), t) : (Nt(t), null);
        }
        return Nt(t), (t.flags & 128) !== 0 ? (t.lanes = e, t) : (e = a !== null, l = l !== null && l.memoizedState !== null, e && (a = t.child, u = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (u = a.alternate.memoizedState.cachePool.pool), n = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== u && (a.flags |= 2048)), e !== l && e && (t.child.flags |= 8192), Fn(t, t.updateQueue), Dl(t), null);
      case 4:
        return Rl(), l === null && Af(t.stateNode.containerInfo), Dl(t), null;
      case 10:
        return ae(t.type), Dl(t), null;
      case 19:
        if (N(Vl), a = t.memoizedState, a === null) return Dl(t), null;
        if (u = (t.flags & 128) !== 0, n = a.rendering, n === null)
          if (u) Cu(a, !1);
          else {
            if (Cl !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = t.child; l !== null; ) {
                if (n = Bn(l), n !== null) {
                  for (t.flags |= 128, Cu(a, !1), l = n.updateQueue, t.updateQueue = l, Fn(t, l), t.subtreeFlags = 0, l = e, e = t.child; e !== null; )
                    go(e, l), e = e.sibling;
                  return j(
                    Vl,
                    Vl.current & 1 | 2
                  ), il && te(t, a.treeForkCount), t.child;
                }
                l = l.sibling;
              }
            a.tail !== null && Nl() > ti && (t.flags |= 128, u = !0, Cu(a, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (l = Bn(n), l !== null) {
              if (t.flags |= 128, u = !0, l = l.updateQueue, t.updateQueue = l, Fn(t, l), Cu(a, !0), a.tail === null && a.tailMode === "hidden" && !n.alternate && !il)
                return Dl(t), null;
            } else
              2 * Nl() - a.renderingStartTime > ti && e !== 536870912 && (t.flags |= 128, u = !0, Cu(a, !1), t.lanes = 4194304);
          a.isBackwards ? (n.sibling = t.child, t.child = n) : (l = a.last, l !== null ? l.sibling = n : t.child = n, a.last = n);
        }
        return a.tail !== null ? (l = a.tail, a.rendering = l, a.tail = l.sibling, a.renderingStartTime = Nl(), l.sibling = null, e = Vl.current, j(
          Vl,
          u ? e & 1 | 2 : e & 1
        ), il && te(t, a.treeForkCount), l) : (Dl(t), null);
      case 22:
      case 23:
        return Nt(t), Ac(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (e & 536870912) !== 0 && (t.flags & 128) === 0 && (Dl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Dl(t), e = t.updateQueue, e !== null && Fn(t, e.retryQueue), e = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== e && (t.flags |= 2048), l !== null && N(fa), null;
      case 24:
        return e = null, l !== null && (e = l.memoizedState.cache), t.memoizedState.cache !== e && (t.flags |= 2048), ae(Zl), Dl(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function Nh(l, t) {
    switch (oc(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return ae(Zl), Rl(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return We(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Nt(t), t.alternate === null)
            throw Error(o(340));
          na();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (Nt(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(o(340));
          na();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return N(Vl), null;
      case 4:
        return Rl(), null;
      case 10:
        return ae(t.type), null;
      case 22:
      case 23:
        return Nt(t), Ac(), l !== null && N(fa), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return ae(Zl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Zr(l, t) {
    switch (oc(t), t.tag) {
      case 3:
        ae(Zl), Rl();
        break;
      case 26:
      case 27:
      case 5:
        We(t);
        break;
      case 4:
        Rl();
        break;
      case 31:
        t.memoizedState !== null && Nt(t);
        break;
      case 13:
        Nt(t);
        break;
      case 19:
        N(Vl);
        break;
      case 10:
        ae(t.type);
        break;
      case 22:
      case 23:
        Nt(t), Ac(), l !== null && N(fa);
        break;
      case 24:
        ae(Zl);
    }
  }
  function Hu(l, t) {
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
              var s = e, y = c;
              try {
                y();
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
  function Kr(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var e = l.stateNode;
      try {
        Ho(t, e);
      } catch (a) {
        yl(l, l.return, a);
      }
    }
  }
  function Jr(l, t, e) {
    e.props = ma(
      l.type,
      l.memoizedProps
    ), e.state = l.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      yl(l, t, a);
    }
  }
  function qu(l, t) {
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
  function wt(l, t) {
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
  function wr(l) {
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
  function af(l, t, e) {
    try {
      var a = l.stateNode;
      $h(a, l.type, e, t), a[dt] = t;
    } catch (u) {
      yl(l, l.return, u);
    }
  }
  function $r(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && Ge(l.type) || l.tag === 4;
  }
  function uf(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || $r(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && Ge(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function nf(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(l, t) : (t = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, t.appendChild(l), e = e._reactRootContainer, e != null || t.onclick !== null || (t.onclick = It));
    else if (a !== 4 && (a === 27 && Ge(l.type) && (e = l.stateNode, t = null), l = l.child, l !== null))
      for (nf(l, t, e), l = l.sibling; l !== null; )
        nf(l, t, e), l = l.sibling;
  }
  function kn(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? e.insertBefore(l, t) : e.appendChild(l);
    else if (a !== 4 && (a === 27 && Ge(l.type) && (e = l.stateNode), l = l.child, l !== null))
      for (kn(l, t, e), l = l.sibling; l !== null; )
        kn(l, t, e), l = l.sibling;
  }
  function Wr(l) {
    var t = l.stateNode, e = l.memoizedProps;
    try {
      for (var a = l.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      at(t, a, e), t[Pl] = l, t[dt] = e;
    } catch (n) {
      yl(l, l.return, n);
    }
  }
  var fe = !1, wl = !1, cf = !1, Fr = typeof WeakSet == "function" ? WeakSet : Set, kl = null;
  function Oh(l, t) {
    if (l = l.containerInfo, Df = Si, l = co(l), Pi(l)) {
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
            var i = 0, c = -1, s = -1, y = 0, T = 0, O = l, S = null;
            t: for (; ; ) {
              for (var _; O !== e || u !== 0 && O.nodeType !== 3 || (c = i + u), O !== n || a !== 0 && O.nodeType !== 3 || (s = i + a), O.nodeType === 3 && (i += O.nodeValue.length), (_ = O.firstChild) !== null; )
                S = O, O = _;
              for (; ; ) {
                if (O === l) break t;
                if (S === e && ++y === u && (c = i), S === n && ++T === a && (s = i), (_ = O.nextSibling) !== null) break;
                O = S, S = O.parentNode;
              }
              O = _;
            }
            e = c === -1 || s === -1 ? null : { start: c, end: s };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (xf = { focusedElem: l, selectionRange: e }, Si = !1, kl = t; kl !== null; )
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
                  var Y = ma(
                    e.type,
                    u
                  );
                  l = a.getSnapshotBeforeUpdate(
                    Y,
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
  function kr(l, t, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        oe(l, e), a & 4 && Hu(5, e);
        break;
      case 1:
        if (oe(l, e), a & 4)
          if (l = e.stateNode, t === null)
            try {
              l.componentDidMount();
            } catch (i) {
              yl(e, e.return, i);
            }
          else {
            var u = ma(
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
        a & 64 && Kr(e), a & 512 && qu(e, e.return);
        break;
      case 3:
        if (oe(l, e), a & 64 && (l = e.updateQueue, l !== null)) {
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
            Ho(l, t);
          } catch (i) {
            yl(e, e.return, i);
          }
        }
        break;
      case 27:
        t === null && a & 4 && Wr(e);
      case 26:
      case 5:
        oe(l, e), t === null && a & 4 && wr(e), a & 512 && qu(e, e.return);
        break;
      case 12:
        oe(l, e);
        break;
      case 31:
        oe(l, e), a & 4 && ld(l, e);
        break;
      case 13:
        oe(l, e), a & 4 && td(l, e), a & 64 && (l = e.memoizedState, l !== null && (l = l.dehydrated, l !== null && (e = qh.bind(
          null,
          e
        ), e0(l, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || fe, !a) {
          t = t !== null && t.memoizedState !== null || wl, u = fe;
          var n = wl;
          fe = a, (wl = t) && !n ? re(
            l,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : oe(l, e), fe = u, wl = n;
        }
        break;
      case 30:
        break;
      default:
        oe(l, e);
    }
  }
  function Ir(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, Ir(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && qi(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var Ml = null, vt = !1;
  function se(l, t, e) {
    for (e = e.child; e !== null; )
      Pr(l, t, e), e = e.sibling;
  }
  function Pr(l, t, e) {
    if (_t && typeof _t.onCommitFiberUnmount == "function")
      try {
        _t.onCommitFiberUnmount(Ft, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        wl || wt(e, t), se(
          l,
          t,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        wl || wt(e, t);
        var a = Ml, u = vt;
        Ge(e.type) && (Ml = e.stateNode, vt = !1), se(
          l,
          t,
          e
        ), Ku(e.stateNode), Ml = a, vt = u;
        break;
      case 5:
        wl || wt(e, t);
      case 6:
        if (a = Ml, u = vt, Ml = null, se(
          l,
          t,
          e
        ), Ml = a, vt = u, Ml !== null)
          if (vt)
            try {
              (Ml.nodeType === 9 ? Ml.body : Ml.nodeName === "HTML" ? Ml.ownerDocument.body : Ml).removeChild(e.stateNode);
            } catch (n) {
              yl(
                e,
                t,
                n
              );
            }
          else
            try {
              Ml.removeChild(e.stateNode);
            } catch (n) {
              yl(
                e,
                t,
                n
              );
            }
        break;
      case 18:
        Ml !== null && (vt ? (l = Ml, Kd(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          e.stateNode
        ), tu(l)) : Kd(Ml, e.stateNode));
        break;
      case 4:
        a = Ml, u = vt, Ml = e.stateNode.containerInfo, vt = !0, se(
          l,
          t,
          e
        ), Ml = a, vt = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Re(2, e, t), wl || Re(4, e, t), se(
          l,
          t,
          e
        );
        break;
      case 1:
        wl || (wt(e, t), a = e.stateNode, typeof a.componentWillUnmount == "function" && Jr(
          e,
          t,
          a
        )), se(
          l,
          t,
          e
        );
        break;
      case 21:
        se(
          l,
          t,
          e
        );
        break;
      case 22:
        wl = (a = wl) || e.memoizedState !== null, se(
          l,
          t,
          e
        ), wl = a;
        break;
      default:
        se(
          l,
          t,
          e
        );
    }
  }
  function ld(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        tu(l);
      } catch (e) {
        yl(t, t.return, e);
      }
    }
  }
  function td(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        tu(l);
      } catch (e) {
        yl(t, t.return, e);
      }
  }
  function Dh(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new Fr()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new Fr()), t;
      default:
        throw Error(o(435, l.tag));
    }
  }
  function In(l, t) {
    var e = Dh(l);
    t.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var u = Bh.bind(null, l, a);
        a.then(u, u);
      }
    });
  }
  function ht(l, t) {
    var e = t.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var u = e[a], n = l, i = t, c = i;
        l: for (; c !== null; ) {
          switch (c.tag) {
            case 27:
              if (Ge(c.type)) {
                Ml = c.stateNode, vt = !1;
                break l;
              }
              break;
            case 5:
              Ml = c.stateNode, vt = !1;
              break l;
            case 3:
            case 4:
              Ml = c.stateNode.containerInfo, vt = !0;
              break l;
          }
          c = c.return;
        }
        if (Ml === null) throw Error(o(160));
        Pr(n, i, u), Ml = null, vt = !1, n = u.alternate, n !== null && (n.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        ed(t, l), t = t.sibling;
  }
  var Lt = null;
  function ed(l, t) {
    var e = l.alternate, a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ht(t, l), yt(l), a & 4 && (Re(3, l, l.return), Hu(3, l), Re(5, l, l.return));
        break;
      case 1:
        ht(t, l), yt(l), a & 512 && (wl || e === null || wt(e, e.return)), a & 64 && fe && (l = l.updateQueue, l !== null && (a = l.callbacks, a !== null && (e = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var u = Lt;
        if (ht(t, l), yt(l), a & 512 && (wl || e === null || wt(e, e.return)), a & 4) {
          var n = e !== null ? e.memoizedState : null;
          if (a = l.memoizedState, e === null)
            if (a === null)
              if (l.stateNode === null) {
                l: {
                  a = l.type, e = l.memoizedProps, u = u.ownerDocument || u;
                  t: switch (a) {
                    case "title":
                      n = u.getElementsByTagName("title")[0], (!n || n[su] || n[Pl] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = u.createElement(a), u.head.insertBefore(
                        n,
                        u.querySelector("head > title")
                      )), at(n, a, e), n[Pl] = l, Fl(n), a = n;
                      break l;
                    case "link":
                      var i = em(
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
                      n = u.createElement(a), at(n, a, e), u.head.appendChild(n);
                      break;
                    case "meta":
                      if (i = em(
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
                      n = u.createElement(a), at(n, a, e), u.head.appendChild(n);
                      break;
                    default:
                      throw Error(o(468, a));
                  }
                  n[Pl] = l, Fl(n), a = n;
                }
                l.stateNode = a;
              } else
                am(
                  u,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = tm(
                u,
                a,
                l.memoizedProps
              );
          else
            n !== a ? (n === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : n.count--, a === null ? am(
              u,
              l.type,
              l.stateNode
            ) : tm(
              u,
              a,
              l.memoizedProps
            )) : a === null && l.stateNode !== null && af(
              l,
              l.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        ht(t, l), yt(l), a & 512 && (wl || e === null || wt(e, e.return)), e !== null && a & 4 && af(
          l,
          l.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (ht(t, l), yt(l), a & 512 && (wl || e === null || wt(e, e.return)), l.flags & 32) {
          u = l.stateNode;
          try {
            za(u, "");
          } catch (Y) {
            yl(l, l.return, Y);
          }
        }
        a & 4 && l.stateNode != null && (u = l.memoizedProps, af(
          l,
          u,
          e !== null ? e.memoizedProps : u
        )), a & 1024 && (cf = !0);
        break;
      case 6:
        if (ht(t, l), yt(l), a & 4) {
          if (l.stateNode === null)
            throw Error(o(162));
          a = l.memoizedProps, e = l.stateNode;
          try {
            e.nodeValue = a;
          } catch (Y) {
            yl(l, l.return, Y);
          }
        }
        break;
      case 3:
        if (vi = null, u = Lt, Lt = di(t.containerInfo), ht(t, l), Lt = u, yt(l), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            tu(t.containerInfo);
          } catch (Y) {
            yl(l, l.return, Y);
          }
        cf && (cf = !1, ad(l));
        break;
      case 4:
        a = Lt, Lt = di(
          l.stateNode.containerInfo
        ), ht(t, l), yt(l), Lt = a;
        break;
      case 12:
        ht(t, l), yt(l);
        break;
      case 31:
        ht(t, l), yt(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, In(l, a)));
        break;
      case 13:
        ht(t, l), yt(l), l.child.flags & 8192 && l.memoizedState !== null != (e !== null && e.memoizedState !== null) && (li = Nl()), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, In(l, a)));
        break;
      case 22:
        u = l.memoizedState !== null;
        var s = e !== null && e.memoizedState !== null, y = fe, T = wl;
        if (fe = y || u, wl = T || s, ht(t, l), wl = T, fe = y, yt(l), a & 8192)
          l: for (t = l.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (e === null || s || fe || wl || va(l)), e = null, t = l; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (e === null) {
                s = e = t;
                try {
                  if (n = s.stateNode, u)
                    i = n.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    c = s.stateNode;
                    var O = s.memoizedProps.style, S = O != null && O.hasOwnProperty("display") ? O.display : null;
                    c.style.display = S == null || typeof S == "boolean" ? "" : ("" + S).trim();
                  }
                } catch (Y) {
                  yl(s, s.return, Y);
                }
              }
            } else if (t.tag === 6) {
              if (e === null) {
                s = t;
                try {
                  s.stateNode.nodeValue = u ? "" : s.memoizedProps;
                } catch (Y) {
                  yl(s, s.return, Y);
                }
              }
            } else if (t.tag === 18) {
              if (e === null) {
                s = t;
                try {
                  var _ = s.stateNode;
                  u ? Jd(_, !0) : Jd(s.stateNode, !1);
                } catch (Y) {
                  yl(s, s.return, Y);
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
        a & 4 && (a = l.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, In(l, e))));
        break;
      case 19:
        ht(t, l), yt(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, In(l, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        ht(t, l), yt(l);
    }
  }
  function yt(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var e, a = l.return; a !== null; ) {
          if ($r(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(o(160));
        switch (e.tag) {
          case 27:
            var u = e.stateNode, n = uf(l);
            kn(l, n, u);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && (za(i, ""), e.flags &= -33);
            var c = uf(l);
            kn(l, c, i);
            break;
          case 3:
          case 4:
            var s = e.stateNode.containerInfo, y = uf(l);
            nf(
              l,
              y,
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
  function ad(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        ad(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
      }
  }
  function oe(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        kr(l, t.alternate, t), t = t.sibling;
  }
  function va(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Re(4, t, t.return), va(t);
          break;
        case 1:
          wt(t, t.return);
          var e = t.stateNode;
          typeof e.componentWillUnmount == "function" && Jr(
            t,
            t.return,
            e
          ), va(t);
          break;
        case 27:
          Ku(t.stateNode);
        case 26:
        case 5:
          wt(t, t.return), va(t);
          break;
        case 22:
          t.memoizedState === null && va(t);
          break;
        case 30:
          va(t);
          break;
        default:
          va(t);
      }
      l = l.sibling;
    }
  }
  function re(l, t, e) {
    for (e = e && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, u = l, n = t, i = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          re(
            u,
            n,
            e
          ), Hu(4, n);
          break;
        case 1:
          if (re(
            u,
            n,
            e
          ), a = n, u = a.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (y) {
              yl(a, a.return, y);
            }
          if (a = n, u = a.updateQueue, u !== null) {
            var c = a.stateNode;
            try {
              var s = u.shared.hiddenCallbacks;
              if (s !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < s.length; u++)
                  Co(s[u], c);
            } catch (y) {
              yl(a, a.return, y);
            }
          }
          e && i & 64 && Kr(n), qu(n, n.return);
          break;
        case 27:
          Wr(n);
        case 26:
        case 5:
          re(
            u,
            n,
            e
          ), e && a === null && i & 4 && wr(n), qu(n, n.return);
          break;
        case 12:
          re(
            u,
            n,
            e
          );
          break;
        case 31:
          re(
            u,
            n,
            e
          ), e && i & 4 && ld(u, n);
          break;
        case 13:
          re(
            u,
            n,
            e
          ), e && i & 4 && td(u, n);
          break;
        case 22:
          n.memoizedState === null && re(
            u,
            n,
            e
          ), qu(n, n.return);
          break;
        case 30:
          break;
        default:
          re(
            u,
            n,
            e
          );
      }
      t = t.sibling;
    }
  }
  function ff(l, t) {
    var e = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== e && (l != null && l.refCount++, e != null && Eu(e));
  }
  function sf(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Eu(l));
  }
  function Zt(l, t, e, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        ud(
          l,
          t,
          e,
          a
        ), t = t.sibling;
  }
  function ud(l, t, e, a) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Zt(
          l,
          t,
          e,
          a
        ), u & 2048 && Hu(9, t);
        break;
      case 1:
        Zt(
          l,
          t,
          e,
          a
        );
        break;
      case 3:
        Zt(
          l,
          t,
          e,
          a
        ), u & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Eu(l)));
        break;
      case 12:
        if (u & 2048) {
          Zt(
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
          Zt(
            l,
            t,
            e,
            a
          );
        break;
      case 31:
        Zt(
          l,
          t,
          e,
          a
        );
        break;
      case 13:
        Zt(
          l,
          t,
          e,
          a
        );
        break;
      case 23:
        break;
      case 22:
        n = t.stateNode, i = t.alternate, t.memoizedState !== null ? n._visibility & 2 ? Zt(
          l,
          t,
          e,
          a
        ) : Bu(l, t) : n._visibility & 2 ? Zt(
          l,
          t,
          e,
          a
        ) : (n._visibility |= 2, Za(
          l,
          t,
          e,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && ff(i, t);
        break;
      case 24:
        Zt(
          l,
          t,
          e,
          a
        ), u & 2048 && sf(t.alternate, t);
        break;
      default:
        Zt(
          l,
          t,
          e,
          a
        );
    }
  }
  function Za(l, t, e, a, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var n = l, i = t, c = e, s = a, y = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Za(
            n,
            i,
            c,
            s,
            u
          ), Hu(8, i);
          break;
        case 23:
          break;
        case 22:
          var T = i.stateNode;
          i.memoizedState !== null ? T._visibility & 2 ? Za(
            n,
            i,
            c,
            s,
            u
          ) : Bu(
            n,
            i
          ) : (T._visibility |= 2, Za(
            n,
            i,
            c,
            s,
            u
          )), u && y & 2048 && ff(
            i.alternate,
            i
          );
          break;
        case 24:
          Za(
            n,
            i,
            c,
            s,
            u
          ), u && y & 2048 && sf(i.alternate, i);
          break;
        default:
          Za(
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
  function Bu(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var e = l, a = t, u = a.flags;
        switch (a.tag) {
          case 22:
            Bu(e, a), u & 2048 && ff(
              a.alternate,
              a
            );
            break;
          case 24:
            Bu(e, a), u & 2048 && sf(a.alternate, a);
            break;
          default:
            Bu(e, a);
        }
        t = t.sibling;
      }
  }
  var Yu = 8192;
  function Ka(l, t, e) {
    if (l.subtreeFlags & Yu)
      for (l = l.child; l !== null; )
        nd(
          l,
          t,
          e
        ), l = l.sibling;
  }
  function nd(l, t, e) {
    switch (l.tag) {
      case 26:
        Ka(
          l,
          t,
          e
        ), l.flags & Yu && l.memoizedState !== null && v0(
          e,
          Lt,
          l.memoizedState,
          l.memoizedProps
        );
        break;
      case 5:
        Ka(
          l,
          t,
          e
        );
        break;
      case 3:
      case 4:
        var a = Lt;
        Lt = di(l.stateNode.containerInfo), Ka(
          l,
          t,
          e
        ), Lt = a;
        break;
      case 22:
        l.memoizedState === null && (a = l.alternate, a !== null && a.memoizedState !== null ? (a = Yu, Yu = 16777216, Ka(
          l,
          t,
          e
        ), Yu = a) : Ka(
          l,
          t,
          e
        ));
        break;
      default:
        Ka(
          l,
          t,
          e
        );
    }
  }
  function id(l) {
    var t = l.alternate;
    if (t !== null && (l = t.child, l !== null)) {
      t.child = null;
      do
        t = l.sibling, l.sibling = null, l = t;
      while (l !== null);
    }
  }
  function Gu(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          kl = a, fd(
            a,
            l
          );
        }
      id(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        cd(l), l = l.sibling;
  }
  function cd(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Gu(l), l.flags & 2048 && Re(9, l, l.return);
        break;
      case 3:
        Gu(l);
        break;
      case 12:
        Gu(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, Pn(l)) : Gu(l);
        break;
      default:
        Gu(l);
    }
  }
  function Pn(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          kl = a, fd(
            a,
            l
          );
        }
      id(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          Re(8, t, t.return), Pn(t);
          break;
        case 22:
          e = t.stateNode, e._visibility & 2 && (e._visibility &= -3, Pn(t));
          break;
        default:
          Pn(t);
      }
      l = l.sibling;
    }
  }
  function fd(l, t) {
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
          Eu(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, kl = a;
      else
        l: for (e = l; kl !== null; ) {
          a = kl;
          var u = a.sibling, n = a.return;
          if (Ir(a), a === e) {
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
  var xh = {
    getCacheForType: function(l) {
      var t = tt(Zl), e = t.data.get(l);
      return e === void 0 && (e = l(), t.data.set(l, e)), e;
    },
    cacheSignal: function() {
      return tt(Zl).controller.signal;
    }
  }, Mh = typeof WeakMap == "function" ? WeakMap : Map, ml = 0, El = null, tl = null, al = 0, hl = 0, Ot = null, Ue = !1, Ja = !1, of = !1, de = 0, Cl = 0, Ce = 0, ha = 0, rf = 0, Dt = 0, wa = 0, Xu = null, gt = null, df = !1, li = 0, sd = 0, ti = 1 / 0, ei = null, He = null, $l = 0, qe = null, $a = null, me = 0, mf = 0, vf = null, od = null, Qu = 0, hf = null;
  function xt() {
    return (ml & 2) !== 0 && al !== 0 ? al & -al : E.T !== null ? _f() : As();
  }
  function rd() {
    if (Dt === 0)
      if ((al & 536870912) === 0 || il) {
        var l = on;
        on <<= 1, (on & 3932160) === 0 && (on = 262144), Dt = l;
      } else Dt = 536870912;
    return l = At.current, l !== null && (l.flags |= 32), Dt;
  }
  function St(l, t, e) {
    (l === El && (hl === 2 || hl === 9) || l.cancelPendingCommit !== null) && (Wa(l, 0), Be(
      l,
      al,
      Dt,
      !1
    )), fu(l, e), ((ml & 2) === 0 || l !== El) && (l === El && ((ml & 2) === 0 && (ha |= e), Cl === 4 && Be(
      l,
      al,
      Dt,
      !1
    )), $t(l));
  }
  function dd(l, t, e) {
    if ((ml & 6) !== 0) throw Error(o(327));
    var a = !e && (t & 127) === 0 && (t & l.expiredLanes) === 0 || cu(l, t), u = a ? Uh(l, t) : gf(l, t, !0), n = a;
    do {
      if (u === 0) {
        Ja && !a && Be(l, t, 0, !1);
        break;
      } else {
        if (e = l.current.alternate, n && !jh(e)) {
          u = gf(l, t, !1), n = !1;
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
              u = Xu;
              var s = c.current.memoizedState.isDehydrated;
              if (s && (Wa(c, i).flags |= 256), i = gf(
                c,
                i,
                !1
              ), i !== 2) {
                if (of && !s) {
                  c.errorRecoveryDisabledLanes |= n, ha |= n, u = 4;
                  break l;
                }
                n = gt, gt = u, n !== null && (gt === null ? gt = n : gt.push.apply(
                  gt,
                  n
                ));
              }
              u = i;
            }
            if (n = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Wa(l, 0), Be(l, t, 0, !0);
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
              Be(
                a,
                t,
                Dt,
                !Ue
              );
              break l;
            case 2:
              gt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && (u = li + 300 - Nl(), 10 < u)) {
            if (Be(
              a,
              t,
              Dt,
              !Ue
            ), dn(a, 0, !0) !== 0) break l;
            me = t, a.timeoutHandle = Ld(
              md.bind(
                null,
                a,
                e,
                gt,
                ei,
                df,
                t,
                Dt,
                ha,
                wa,
                Ue,
                n,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break l;
          }
          md(
            a,
            e,
            gt,
            ei,
            df,
            t,
            Dt,
            ha,
            wa,
            Ue,
            n,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    $t(l);
  }
  function md(l, t, e, a, u, n, i, c, s, y, T, O, S, _) {
    if (l.timeoutHandle = -1, O = t.subtreeFlags, O & 8192 || (O & 16785408) === 16785408) {
      O = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: It
      }, nd(
        t,
        n,
        O
      );
      var Y = (n & 62914560) === n ? li - Nl() : (n & 4194048) === n ? sd - Nl() : 0;
      if (Y = h0(
        O,
        Y
      ), Y !== null) {
        me = n, l.cancelPendingCommit = Y(
          _d.bind(
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
            S,
            _
          )
        ), Be(l, n, i, !y);
        return;
      }
    }
    _d(
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
  function jh(l) {
    for (var t = l; ; ) {
      var e = t.tag;
      if ((e === 0 || e === 11 || e === 15) && t.flags & 16384 && (e = t.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var a = 0; a < e.length; a++) {
          var u = e[a], n = u.getSnapshot;
          u = u.value;
          try {
            if (!Tt(n(), u)) return !1;
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
  function Be(l, t, e, a) {
    t &= ~rf, t &= ~ha, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
    for (var u = t; 0 < u; ) {
      var n = 31 - Et(u), i = 1 << n;
      a[n] = -1, u &= ~i;
    }
    e !== 0 && Es(l, e, t);
  }
  function ai() {
    return (ml & 6) === 0 ? (Vu(0), !1) : !0;
  }
  function yf() {
    if (tl !== null) {
      if (hl === 0)
        var l = tl.return;
      else
        l = tl, ee = ia = null, jc(l), Ga = null, zu = 0, l = tl;
      for (; l !== null; )
        Zr(l.alternate, l), l = l.return;
      tl = null;
    }
  }
  function Wa(l, t) {
    var e = l.timeoutHandle;
    e !== -1 && (l.timeoutHandle = -1, kh(e)), e = l.cancelPendingCommit, e !== null && (l.cancelPendingCommit = null, e()), me = 0, yf(), El = l, tl = e = le(l.current, null), al = t, hl = 0, Ot = null, Ue = !1, Ja = cu(l, t), of = !1, wa = Dt = rf = ha = Ce = Cl = 0, gt = Xu = null, df = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = l.entangledLanes;
    if (a !== 0)
      for (l = l.entanglements, a &= t; 0 < a; ) {
        var u = 31 - Et(a), n = 1 << u;
        t |= l[u], a &= ~n;
      }
    return de = t, zn(), e;
  }
  function vd(l, t) {
    W = null, E.H = Ru, t === Ya || t === Rn ? (t = Mo(), hl = 3) : t === bc ? (t = Mo(), hl = 4) : hl = t === wc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Ot = t, tl === null && (Cl = 1, Jn(
      l,
      Ht(t, l.current)
    ));
  }
  function hd() {
    var l = At.current;
    return l === null ? !0 : (al & 4194048) === al ? Gt === null : (al & 62914560) === al || (al & 536870912) !== 0 ? l === Gt : !1;
  }
  function yd() {
    var l = E.H;
    return E.H = Ru, l === null ? Ru : l;
  }
  function gd() {
    var l = E.A;
    return E.A = xh, l;
  }
  function ui() {
    Cl = 4, Ue || (al & 4194048) !== al && At.current !== null || (Ja = !0), (Ce & 134217727) === 0 && (ha & 134217727) === 0 || El === null || Be(
      El,
      al,
      Dt,
      !1
    );
  }
  function gf(l, t, e) {
    var a = ml;
    ml |= 2;
    var u = yd(), n = gd();
    (El !== l || al !== t) && (ei = null, Wa(l, t)), t = !1;
    var i = Cl;
    l: do
      try {
        if (hl !== 0 && tl !== null) {
          var c = tl, s = Ot;
          switch (hl) {
            case 8:
              yf(), i = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              At.current === null && (t = !0);
              var y = hl;
              if (hl = 0, Ot = null, Fa(l, c, s, y), e && Ja) {
                i = 0;
                break l;
              }
              break;
            default:
              y = hl, hl = 0, Ot = null, Fa(l, c, s, y);
          }
        }
        Rh(), i = Cl;
        break;
      } catch (T) {
        vd(l, T);
      }
    while (!0);
    return t && l.shellSuspendCounter++, ee = ia = null, ml = a, E.H = u, E.A = n, tl === null && (El = null, al = 0, zn()), i;
  }
  function Rh() {
    for (; tl !== null; ) Sd(tl);
  }
  function Uh(l, t) {
    var e = ml;
    ml |= 2;
    var a = yd(), u = gd();
    El !== l || al !== t ? (ei = null, ti = Nl() + 500, Wa(l, t)) : Ja = cu(
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
              hl = 0, Ot = null, Fa(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (Do(n)) {
                hl = 0, Ot = null, bd(t);
                break;
              }
              t = function() {
                hl !== 2 && hl !== 9 || El !== l || (hl = 7), $t(l);
              }, n.then(t, t);
              break l;
            case 3:
              hl = 7;
              break l;
            case 4:
              hl = 5;
              break l;
            case 7:
              Do(n) ? (hl = 0, Ot = null, bd(t)) : (hl = 0, Ot = null, Fa(l, t, n, 7));
              break;
            case 5:
              var i = null;
              switch (tl.tag) {
                case 26:
                  i = tl.memoizedState;
                case 5:
                case 27:
                  var c = tl;
                  if (i ? um(i) : c.stateNode.complete) {
                    hl = 0, Ot = null;
                    var s = c.sibling;
                    if (s !== null) tl = s;
                    else {
                      var y = c.return;
                      y !== null ? (tl = y, ni(y)) : tl = null;
                    }
                    break t;
                  }
              }
              hl = 0, Ot = null, Fa(l, t, n, 5);
              break;
            case 6:
              hl = 0, Ot = null, Fa(l, t, n, 6);
              break;
            case 8:
              yf(), Cl = 6;
              break l;
            default:
              throw Error(o(462));
          }
        }
        Ch();
        break;
      } catch (T) {
        vd(l, T);
      }
    while (!0);
    return ee = ia = null, E.H = a, E.A = u, ml = e, tl !== null ? 0 : (El = null, al = 0, zn(), Cl);
  }
  function Ch() {
    for (; tl !== null && !ot(); )
      Sd(tl);
  }
  function Sd(l) {
    var t = Vr(l.alternate, l, de);
    l.memoizedProps = l.pendingProps, t === null ? ni(l) : tl = t;
  }
  function bd(l) {
    var t = l, e = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = qr(
          e,
          t,
          t.pendingProps,
          t.type,
          void 0,
          al
        );
        break;
      case 11:
        t = qr(
          e,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          al
        );
        break;
      case 5:
        jc(t);
      default:
        Zr(e, t), t = tl = go(t, de), t = Vr(e, t, de);
    }
    l.memoizedProps = l.pendingProps, t === null ? ni(l) : tl = t;
  }
  function Fa(l, t, e, a) {
    ee = ia = null, jc(t), Ga = null, zu = 0;
    var u = t.return;
    try {
      if (Eh(
        l,
        u,
        t,
        e,
        al
      )) {
        Cl = 1, Jn(
          l,
          Ht(e, l.current)
        ), tl = null;
        return;
      }
    } catch (n) {
      if (u !== null) throw tl = u, n;
      Cl = 1, Jn(
        l,
        Ht(e, l.current)
      ), tl = null;
      return;
    }
    t.flags & 32768 ? (il || a === 1 ? l = !0 : Ja || (al & 536870912) !== 0 ? l = !1 : (Ue = l = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = At.current, a !== null && a.tag === 13 && (a.flags |= 16384))), pd(t, l)) : ni(t);
  }
  function ni(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        pd(
          t,
          Ue
        );
        return;
      }
      l = t.return;
      var e = Ah(
        t.alternate,
        t,
        de
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
  function pd(l, t) {
    do {
      var e = Nh(l.alternate, l);
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
  function _d(l, t, e, a, u, n, i, c, s) {
    l.cancelPendingCommit = null;
    do
      ii();
    while ($l !== 0);
    if ((ml & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === l.current) throw Error(o(177));
      if (n = t.lanes | t.childLanes, n |= uc, mv(
        l,
        e,
        n,
        i,
        c,
        s
      ), l === El && (tl = El = null, al = 0), $a = t, qe = l, me = e, mf = n, vf = u, od = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, Yh(ke, function() {
        return Nd(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = E.T, E.T = null, u = C.p, C.p = 2, i = ml, ml |= 4;
        try {
          Oh(l, t, e);
        } finally {
          ml = i, C.p = u, E.T = a;
        }
      }
      $l = 1, Ed(), Td(), zd();
    }
  }
  function Ed() {
    if ($l === 1) {
      $l = 0;
      var l = qe, t = $a, e = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || e) {
        e = E.T, E.T = null;
        var a = C.p;
        C.p = 2;
        var u = ml;
        ml |= 4;
        try {
          ed(t, l);
          var n = xf, i = co(l.containerInfo), c = n.focusedElem, s = n.selectionRange;
          if (i !== c && c && c.ownerDocument && io(
            c.ownerDocument.documentElement,
            c
          )) {
            if (s !== null && Pi(c)) {
              var y = s.start, T = s.end;
              if (T === void 0 && (T = y), "selectionStart" in c)
                c.selectionStart = y, c.selectionEnd = Math.min(
                  T,
                  c.value.length
                );
              else {
                var O = c.ownerDocument || document, S = O && O.defaultView || window;
                if (S.getSelection) {
                  var _ = S.getSelection(), Y = c.textContent.length, L = Math.min(s.start, Y), _l = s.end === void 0 ? L : Math.min(s.end, Y);
                  !_.extend && L > _l && (i = _l, _l = L, L = i);
                  var v = no(
                    c,
                    L
                  ), r = no(
                    c,
                    _l
                  );
                  if (v && r && (_.rangeCount !== 1 || _.anchorNode !== v.node || _.anchorOffset !== v.offset || _.focusNode !== r.node || _.focusOffset !== r.offset)) {
                    var h = O.createRange();
                    h.setStart(v.node, v.offset), _.removeAllRanges(), L > _l ? (_.addRange(h), _.extend(r.node, r.offset)) : (h.setEnd(r.node, r.offset), _.addRange(h));
                  }
                }
              }
            }
            for (O = [], _ = c; _ = _.parentNode; )
              _.nodeType === 1 && O.push({
                element: _,
                left: _.scrollLeft,
                top: _.scrollTop
              });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < O.length; c++) {
              var A = O[c];
              A.element.scrollLeft = A.left, A.element.scrollTop = A.top;
            }
          }
          Si = !!Df, xf = Df = null;
        } finally {
          ml = u, C.p = a, E.T = e;
        }
      }
      l.current = t, $l = 2;
    }
  }
  function Td() {
    if ($l === 2) {
      $l = 0;
      var l = qe, t = $a, e = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || e) {
        e = E.T, E.T = null;
        var a = C.p;
        C.p = 2;
        var u = ml;
        ml |= 4;
        try {
          kr(l, t.alternate, t);
        } finally {
          ml = u, C.p = a, E.T = e;
        }
      }
      $l = 3;
    }
  }
  function zd() {
    if ($l === 4 || $l === 3) {
      $l = 0, Ql();
      var l = qe, t = $a, e = me, a = od;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? $l = 5 : ($l = 0, $a = qe = null, Ad(l, l.pendingLanes));
      var u = l.pendingLanes;
      if (u === 0 && (He = null), Ci(e), t = t.stateNode, _t && typeof _t.onCommitFiberRoot == "function")
        try {
          _t.onCommitFiberRoot(
            Ft,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        t = E.T, u = C.p, C.p = 2, E.T = null;
        try {
          for (var n = l.onRecoverableError, i = 0; i < a.length; i++) {
            var c = a[i];
            n(c.value, {
              componentStack: c.stack
            });
          }
        } finally {
          E.T = t, C.p = u;
        }
      }
      (me & 3) !== 0 && ii(), $t(l), u = l.pendingLanes, (e & 261930) !== 0 && (u & 42) !== 0 ? l === hf ? Qu++ : (Qu = 0, hf = l) : Qu = 0, Vu(0);
    }
  }
  function Ad(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, Eu(t)));
  }
  function ii() {
    return Ed(), Td(), zd(), Nd();
  }
  function Nd() {
    if ($l !== 5) return !1;
    var l = qe, t = mf;
    mf = 0;
    var e = Ci(me), a = E.T, u = C.p;
    try {
      C.p = 32 > e ? 32 : e, E.T = null, e = vf, vf = null;
      var n = qe, i = me;
      if ($l = 0, $a = qe = null, me = 0, (ml & 6) !== 0) throw Error(o(331));
      var c = ml;
      if (ml |= 4, cd(n.current), ud(
        n,
        n.current,
        i,
        e
      ), ml = c, Vu(0, !1), _t && typeof _t.onPostCommitFiberRoot == "function")
        try {
          _t.onPostCommitFiberRoot(Ft, n);
        } catch {
        }
      return !0;
    } finally {
      C.p = u, E.T = a, Ad(l, t);
    }
  }
  function Od(l, t, e) {
    t = Ht(e, t), t = Jc(l.stateNode, t, 2), l = xe(l, t, 2), l !== null && (fu(l, 2), $t(l));
  }
  function yl(l, t, e) {
    if (l.tag === 3)
      Od(l, l, e);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Od(
            t,
            l,
            e
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (He === null || !He.has(a))) {
            l = Ht(e, l), e = Dr(2), a = xe(t, e, 2), a !== null && (xr(
              e,
              a,
              t,
              l
            ), fu(a, 2), $t(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function Sf(l, t, e) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new Mh();
      var u = /* @__PURE__ */ new Set();
      a.set(t, u);
    } else
      u = a.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), a.set(t, u));
    u.has(e) || (of = !0, u.add(e), l = Hh.bind(null, l, t, e), t.then(l, l));
  }
  function Hh(l, t, e) {
    var a = l.pingCache;
    a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & e, l.warmLanes &= ~e, El === l && (al & e) === e && (Cl === 4 || Cl === 3 && (al & 62914560) === al && 300 > Nl() - li ? (ml & 2) === 0 && Wa(l, 0) : rf |= e, wa === al && (wa = 0)), $t(l);
  }
  function Dd(l, t) {
    t === 0 && (t = _s()), l = aa(l, t), l !== null && (fu(l, t), $t(l));
  }
  function qh(l) {
    var t = l.memoizedState, e = 0;
    t !== null && (e = t.retryLane), Dd(l, e);
  }
  function Bh(l, t) {
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
    a !== null && a.delete(t), Dd(l, e);
  }
  function Yh(l, t) {
    return Al(l, t);
  }
  var ci = null, ka = null, bf = !1, fi = !1, pf = !1, Ye = 0;
  function $t(l) {
    l !== ka && l.next === null && (ka === null ? ci = ka = l : ka = ka.next = l), fi = !0, bf || (bf = !0, Xh());
  }
  function Vu(l, t) {
    if (!pf && fi) {
      pf = !0;
      do
        for (var e = !1, a = ci; a !== null; ) {
          if (l !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = a.suspendedLanes, c = a.pingedLanes;
              n = (1 << 31 - Et(42 | l) + 1) - 1, n &= u & ~(i & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (e = !0, Rd(a, n));
          } else
            n = al, n = dn(
              a,
              a === El ? n : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (n & 3) === 0 || cu(a, n) || (e = !0, Rd(a, n));
          a = a.next;
        }
      while (e);
      pf = !1;
    }
  }
  function Gh() {
    xd();
  }
  function xd() {
    fi = bf = !1;
    var l = 0;
    Ye !== 0 && Fh() && (l = Ye);
    for (var t = Nl(), e = null, a = ci; a !== null; ) {
      var u = a.next, n = Md(a, t);
      n === 0 ? (a.next = null, e === null ? ci = u : e.next = u, u === null && (ka = e)) : (e = a, (l !== 0 || (n & 3) !== 0) && (fi = !0)), a = u;
    }
    $l !== 0 && $l !== 5 || Vu(l), Ye !== 0 && (Ye = 0);
  }
  function Md(l, t) {
    for (var e = l.suspendedLanes, a = l.pingedLanes, u = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
      var i = 31 - Et(n), c = 1 << i, s = u[i];
      s === -1 ? ((c & e) === 0 || (c & a) !== 0) && (u[i] = dv(c, t)) : s <= t && (l.expiredLanes |= c), n &= ~c;
    }
    if (t = El, e = al, e = dn(
      l,
      l === t ? e : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a = l.callbackNode, e === 0 || l === t && (hl === 2 || hl === 9) || l.cancelPendingCommit !== null)
      return a !== null && a !== null && st(a), l.callbackNode = null, l.callbackPriority = 0;
    if ((e & 3) === 0 || cu(l, e)) {
      if (t = e & -e, t === l.callbackPriority) return t;
      switch (a !== null && st(a), Ci(e)) {
        case 2:
        case 8:
          e = nu;
          break;
        case 32:
          e = ke;
          break;
        case 268435456:
          e = jt;
          break;
        default:
          e = ke;
      }
      return a = jd.bind(null, l), e = Al(e, a), l.callbackPriority = t, l.callbackNode = e, t;
    }
    return a !== null && a !== null && st(a), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function jd(l, t) {
    if ($l !== 0 && $l !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var e = l.callbackNode;
    if (ii() && l.callbackNode !== e)
      return null;
    var a = al;
    return a = dn(
      l,
      l === El ? a : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a === 0 ? null : (dd(l, a, t), Md(l, Nl()), l.callbackNode != null && l.callbackNode === e ? jd.bind(null, l) : null);
  }
  function Rd(l, t) {
    if (ii()) return null;
    dd(l, t, !0);
  }
  function Xh() {
    Ih(function() {
      (ml & 6) !== 0 ? Al(
        be,
        Gh
      ) : xd();
    });
  }
  function _f() {
    if (Ye === 0) {
      var l = qa;
      l === 0 && (l = sn, sn <<= 1, (sn & 261888) === 0 && (sn = 256)), Ye = l;
    }
    return Ye;
  }
  function Ud(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : yn("" + l);
  }
  function Cd(l, t) {
    var e = t.ownerDocument.createElement("input");
    return e.name = t.name, e.value = t.value, l.id && e.setAttribute("form", l.id), t.parentNode.insertBefore(e, t), l = new FormData(l), e.parentNode.removeChild(e), l;
  }
  function Qh(l, t, e, a, u) {
    if (t === "submit" && e && e.stateNode === u) {
      var n = Ud(
        (u[dt] || null).action
      ), i = a.submitter;
      i && (t = (t = i[dt] || null) ? Ud(t.formAction) : i.getAttribute("formAction"), t !== null && (n = t, i = null));
      var c = new pn(
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
                if (Ye !== 0) {
                  var s = i ? Cd(u, i) : new FormData(u);
                  Xc(
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
                typeof n == "function" && (c.preventDefault(), s = i ? Cd(u, i) : new FormData(u), Xc(
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
  for (var Ef = 0; Ef < ac.length; Ef++) {
    var Tf = ac[Ef], Vh = Tf.toLowerCase(), Lh = Tf[0].toUpperCase() + Tf.slice(1);
    Vt(
      Vh,
      "on" + Lh
    );
  }
  Vt(oo, "onAnimationEnd"), Vt(ro, "onAnimationIteration"), Vt(mo, "onAnimationStart"), Vt("dblclick", "onDoubleClick"), Vt("focusin", "onFocus"), Vt("focusout", "onBlur"), Vt(nh, "onTransitionRun"), Vt(ih, "onTransitionStart"), Vt(ch, "onTransitionCancel"), Vt(vo, "onTransitionEnd"), Ea("onMouseEnter", ["mouseout", "mouseover"]), Ea("onMouseLeave", ["mouseout", "mouseover"]), Ea("onPointerEnter", ["pointerout", "pointerover"]), Ea("onPointerLeave", ["pointerout", "pointerover"]), Pe(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Pe(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Pe("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Pe(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Pe(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Pe(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Lu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Zh = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Lu)
  );
  function Hd(l, t) {
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
            } catch (T) {
              Tn(T);
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
            } catch (T) {
              Tn(T);
            }
            u.currentTarget = null, n = s;
          }
      }
    }
  }
  function el(l, t) {
    var e = t[Hi];
    e === void 0 && (e = t[Hi] = /* @__PURE__ */ new Set());
    var a = l + "__bubble";
    e.has(a) || (qd(t, l, 2, !1), e.add(a));
  }
  function zf(l, t, e) {
    var a = 0;
    t && (a |= 4), qd(
      e,
      l,
      a,
      t
    );
  }
  var si = "_reactListening" + Math.random().toString(36).slice(2);
  function Af(l) {
    if (!l[si]) {
      l[si] = !0, Ds.forEach(function(e) {
        e !== "selectionchange" && (Zh.has(e) || zf(e, !1, l), zf(e, !0, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[si] || (t[si] = !0, zf("selectionchange", !1, t));
    }
  }
  function qd(l, t, e, a) {
    switch (rm(t)) {
      case 2:
        var u = S0;
        break;
      case 8:
        u = b0;
        break;
      default:
        u = Xf;
    }
    e = u.bind(
      null,
      t,
      e,
      l
    ), u = void 0, !Zi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), a ? u !== void 0 ? l.addEventListener(t, e, {
      capture: !0,
      passive: u
    }) : l.addEventListener(t, e, !0) : u !== void 0 ? l.addEventListener(t, e, {
      passive: u
    }) : l.addEventListener(t, e, !1);
  }
  function Nf(l, t, e, a, u) {
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
            if (i = ba(c), i === null) return;
            if (s = i.tag, s === 5 || s === 6 || s === 26 || s === 27) {
              a = n = i;
              continue l;
            }
            c = c.parentNode;
          }
        }
        a = a.return;
      }
    Xs(function() {
      var y = n, T = Vi(e), O = [];
      l: {
        var S = ho.get(l);
        if (S !== void 0) {
          var _ = pn, Y = l;
          switch (l) {
            case "keypress":
              if (Sn(e) === 0) break l;
            case "keydown":
            case "keyup":
              _ = Bv;
              break;
            case "focusin":
              Y = "focus", _ = $i;
              break;
            case "focusout":
              Y = "blur", _ = $i;
              break;
            case "beforeblur":
            case "afterblur":
              _ = $i;
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
              _ = Ls;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              _ = Av;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              _ = Xv;
              break;
            case oo:
            case ro:
            case mo:
              _ = Dv;
              break;
            case vo:
              _ = Vv;
              break;
            case "scroll":
            case "scrollend":
              _ = Tv;
              break;
            case "wheel":
              _ = Zv;
              break;
            case "copy":
            case "cut":
            case "paste":
              _ = Mv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              _ = Ks;
              break;
            case "toggle":
            case "beforetoggle":
              _ = Jv;
          }
          var L = (t & 4) !== 0, _l = !L && (l === "scroll" || l === "scrollend"), v = L ? S !== null ? S + "Capture" : null : S;
          L = [];
          for (var r = y, h; r !== null; ) {
            var A = r;
            if (h = A.stateNode, A = A.tag, A !== 5 && A !== 26 && A !== 27 || h === null || v === null || (A = ru(r, v), A != null && L.push(
              Zu(r, A, h)
            )), _l) break;
            r = r.return;
          }
          0 < L.length && (S = new _(
            S,
            Y,
            null,
            e,
            T
          ), O.push({ event: S, listeners: L }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (S = l === "mouseover" || l === "pointerover", _ = l === "mouseout" || l === "pointerout", S && e !== Qi && (Y = e.relatedTarget || e.fromElement) && (ba(Y) || Y[Sa]))
            break l;
          if ((_ || S) && (S = T.window === T ? T : (S = T.ownerDocument) ? S.defaultView || S.parentWindow : window, _ ? (Y = e.relatedTarget || e.toElement, _ = y, Y = Y ? ba(Y) : null, Y !== null && (_l = U(Y), L = Y.tag, Y !== _l || L !== 5 && L !== 27 && L !== 6) && (Y = null)) : (_ = null, Y = y), _ !== Y)) {
            if (L = Ls, A = "onMouseLeave", v = "onMouseEnter", r = "mouse", (l === "pointerout" || l === "pointerover") && (L = Ks, A = "onPointerLeave", v = "onPointerEnter", r = "pointer"), _l = _ == null ? S : ou(_), h = Y == null ? S : ou(Y), S = new L(
              A,
              r + "leave",
              _,
              e,
              T
            ), S.target = _l, S.relatedTarget = h, A = null, ba(T) === y && (L = new L(
              v,
              r + "enter",
              Y,
              e,
              T
            ), L.target = h, L.relatedTarget = _l, A = L), _l = A, _ && Y)
              t: {
                for (L = Kh, v = _, r = Y, h = 0, A = v; A; A = L(A))
                  h++;
                A = 0;
                for (var X = r; X; X = L(X))
                  A++;
                for (; 0 < h - A; )
                  v = L(v), h--;
                for (; 0 < A - h; )
                  r = L(r), A--;
                for (; h--; ) {
                  if (v === r || r !== null && v === r.alternate) {
                    L = v;
                    break t;
                  }
                  v = L(v), r = L(r);
                }
                L = null;
              }
            else L = null;
            _ !== null && Bd(
              O,
              S,
              _,
              L,
              !1
            ), Y !== null && _l !== null && Bd(
              O,
              _l,
              Y,
              L,
              !0
            );
          }
        }
        l: {
          if (S = y ? ou(y) : window, _ = S.nodeName && S.nodeName.toLowerCase(), _ === "select" || _ === "input" && S.type === "file")
            var ol = Ps;
          else if (ks(S))
            if (lo)
              ol = eh;
            else {
              ol = lh;
              var G = Pv;
            }
          else
            _ = S.nodeName, !_ || _.toLowerCase() !== "input" || S.type !== "checkbox" && S.type !== "radio" ? y && Xi(y.elementType) && (ol = Ps) : ol = th;
          if (ol && (ol = ol(l, y))) {
            Is(
              O,
              ol,
              e,
              T
            );
            break l;
          }
          G && G(l, S, y), l === "focusout" && y && S.type === "number" && y.memoizedProps.value != null && Gi(S, "number", S.value);
        }
        switch (G = y ? ou(y) : window, l) {
          case "focusin":
            (ks(G) || G.contentEditable === "true") && (Da = G, lc = y, bu = null);
            break;
          case "focusout":
            bu = lc = Da = null;
            break;
          case "mousedown":
            tc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            tc = !1, fo(O, e, T);
            break;
          case "selectionchange":
            if (uh) break;
          case "keydown":
          case "keyup":
            fo(O, e, T);
        }
        var k;
        if (Fi)
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
          Oa ? Ws(l, e) && (ul = "onCompositionEnd") : l === "keydown" && e.keyCode === 229 && (ul = "onCompositionStart");
        ul && (Js && e.locale !== "ko" && (Oa || ul !== "onCompositionStart" ? ul === "onCompositionEnd" && Oa && (k = Qs()) : (Ee = T, Ki = "value" in Ee ? Ee.value : Ee.textContent, Oa = !0)), G = oi(y, ul), 0 < G.length && (ul = new Zs(
          ul,
          l,
          null,
          e,
          T
        ), O.push({ event: ul, listeners: G }), k ? ul.data = k : (k = Fs(e), k !== null && (ul.data = k)))), (k = $v ? Wv(l, e) : Fv(l, e)) && (ul = oi(y, "onBeforeInput"), 0 < ul.length && (G = new Zs(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          T
        ), O.push({
          event: G,
          listeners: ul
        }), G.data = k)), Qh(
          O,
          l,
          y,
          e,
          T
        );
      }
      Hd(O, t);
    });
  }
  function Zu(l, t, e) {
    return {
      instance: l,
      listener: t,
      currentTarget: e
    };
  }
  function oi(l, t) {
    for (var e = t + "Capture", a = []; l !== null; ) {
      var u = l, n = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || n === null || (u = ru(l, e), u != null && a.unshift(
        Zu(l, u, n)
      ), u = ru(l, t), u != null && a.push(
        Zu(l, u, n)
      )), l.tag === 3) return a;
      l = l.return;
    }
    return [];
  }
  function Kh(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Bd(l, t, e, a, u) {
    for (var n = t._reactName, i = []; e !== null && e !== a; ) {
      var c = e, s = c.alternate, y = c.stateNode;
      if (c = c.tag, s !== null && s === a) break;
      c !== 5 && c !== 26 && c !== 27 || y === null || (s = y, u ? (y = ru(e, n), y != null && i.unshift(
        Zu(e, y, s)
      )) : u || (y = ru(e, n), y != null && i.push(
        Zu(e, y, s)
      ))), e = e.return;
    }
    i.length !== 0 && l.push({ event: t, listeners: i });
  }
  var Jh = /\r\n?/g, wh = /\u0000|\uFFFD/g;
  function Yd(l) {
    return (typeof l == "string" ? l : "" + l).replace(Jh, `
`).replace(wh, "");
  }
  function Gd(l, t) {
    return t = Yd(t), Yd(l) === t;
  }
  function pl(l, t, e, a, u, n) {
    switch (e) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || za(l, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && za(l, "" + a);
        break;
      case "className":
        vn(l, "class", a);
        break;
      case "tabIndex":
        vn(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        vn(l, e, a);
        break;
      case "style":
        Ys(l, a, n);
        break;
      case "data":
        if (t !== "object") {
          vn(l, "data", a);
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
        a = yn("" + a), l.setAttribute(e, a);
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
          typeof n == "function" && (e === "formAction" ? (t !== "input" && pl(l, t, "name", u.name, u, null), pl(
            l,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), pl(
            l,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), pl(
            l,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (pl(l, t, "encType", u.encType, u, null), pl(l, t, "method", u.method, u, null), pl(l, t, "target", u.target, u, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        a = yn("" + a), l.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (l.onclick = It);
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
        e = yn("" + a), l.setAttributeNS(
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
        el("beforetoggle", l), el("toggle", l), mn(l, "popover", a);
        break;
      case "xlinkActuate":
        kt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        kt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        kt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        kt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        kt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        kt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        kt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        kt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        kt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        mn(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = _v.get(e) || e, mn(l, e, a));
    }
  }
  function Of(l, t, e, a, u, n) {
    switch (e) {
      case "style":
        Ys(l, a, n);
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
        typeof a == "string" ? za(l, a) : (typeof a == "number" || typeof a == "bigint") && za(l, "" + a);
        break;
      case "onScroll":
        a != null && el("scroll", l);
        break;
      case "onScrollEnd":
        a != null && el("scrollend", l);
        break;
      case "onClick":
        a != null && (l.onclick = It);
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
        if (!xs.hasOwnProperty(e))
          l: {
            if (e[0] === "o" && e[1] === "n" && (u = e.endsWith("Capture"), t = e.slice(2, u ? e.length - 7 : void 0), n = l[dt] || null, n = n != null ? n[e] : null, typeof n == "function" && l.removeEventListener(t, n, u), typeof a == "function")) {
              typeof n != "function" && n !== null && (e in l ? l[e] = null : l.hasAttribute(e) && l.removeAttribute(e)), l.addEventListener(t, a, u);
              break l;
            }
            e in l ? l[e] = a : a === !0 ? l.setAttribute(e, "") : mn(l, e, a);
          }
    }
  }
  function at(l, t, e) {
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
                  pl(l, t, n, i, e, null);
              }
          }
        u && pl(l, t, "srcSet", e.srcSet, e, null), a && pl(l, t, "src", e.src, e, null);
        return;
      case "input":
        el("invalid", l);
        var c = n = i = u = null, s = null, y = null;
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
                  y = T;
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
                  pl(l, t, a, T, e, null);
              }
          }
        Cs(
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
                pl(l, t, u, c, e, null);
            }
        t = n, e = i, l.multiple = !!a, t != null ? Ta(l, !!a, t, !1) : e != null && Ta(l, !!a, e, !0);
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
                pl(l, t, i, c, e, null);
            }
        qs(l, a, u, n);
        return;
      case "option":
        for (s in e)
          if (e.hasOwnProperty(s) && (a = e[s], a != null))
            switch (s) {
              case "selected":
                l.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                pl(l, t, s, a, e, null);
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
        for (a = 0; a < Lu.length; a++)
          el(Lu[a], l);
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
        for (y in e)
          if (e.hasOwnProperty(y) && (a = e[y], a != null))
            switch (y) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, t));
              default:
                pl(l, t, y, a, e, null);
            }
        return;
      default:
        if (Xi(t)) {
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
      e.hasOwnProperty(c) && (a = e[c], a != null && pl(l, t, c, a, e, null));
  }
  function $h(l, t, e, a) {
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
        var u = null, n = null, i = null, c = null, s = null, y = null, T = null;
        for (_ in e) {
          var O = e[_];
          if (e.hasOwnProperty(_) && O != null)
            switch (_) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                s = O;
              default:
                a.hasOwnProperty(_) || pl(l, t, _, null, a, O);
            }
        }
        for (var S in a) {
          var _ = a[S];
          if (O = e[S], a.hasOwnProperty(S) && (_ != null || O != null))
            switch (S) {
              case "type":
                n = _;
                break;
              case "name":
                u = _;
                break;
              case "checked":
                y = _;
                break;
              case "defaultChecked":
                T = _;
                break;
              case "value":
                i = _;
                break;
              case "defaultValue":
                c = _;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (_ != null)
                  throw Error(o(137, t));
                break;
              default:
                _ !== O && pl(
                  l,
                  t,
                  S,
                  _,
                  a,
                  O
                );
            }
        }
        Yi(
          l,
          i,
          c,
          s,
          y,
          T,
          n,
          u
        );
        return;
      case "select":
        _ = i = c = S = null;
        for (n in e)
          if (s = e[n], e.hasOwnProperty(n) && s != null)
            switch (n) {
              case "value":
                break;
              case "multiple":
                _ = s;
              default:
                a.hasOwnProperty(n) || pl(
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
                S = n;
                break;
              case "defaultValue":
                c = n;
                break;
              case "multiple":
                i = n;
              default:
                n !== s && pl(
                  l,
                  t,
                  u,
                  n,
                  a,
                  s
                );
            }
        t = c, e = i, a = _, S != null ? Ta(l, !!e, S, !1) : !!a != !!e && (t != null ? Ta(l, !!e, t, !0) : Ta(l, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        _ = S = null;
        for (c in e)
          if (u = e[c], e.hasOwnProperty(c) && u != null && !a.hasOwnProperty(c))
            switch (c) {
              case "value":
                break;
              case "children":
                break;
              default:
                pl(l, t, c, null, a, u);
            }
        for (i in a)
          if (u = a[i], n = e[i], a.hasOwnProperty(i) && (u != null || n != null))
            switch (i) {
              case "value":
                S = u;
                break;
              case "defaultValue":
                _ = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(o(91));
                break;
              default:
                u !== n && pl(l, t, i, u, a, n);
            }
        Hs(l, S, _);
        return;
      case "option":
        for (var Y in e)
          if (S = e[Y], e.hasOwnProperty(Y) && S != null && !a.hasOwnProperty(Y))
            switch (Y) {
              case "selected":
                l.selected = !1;
                break;
              default:
                pl(
                  l,
                  t,
                  Y,
                  null,
                  a,
                  S
                );
            }
        for (s in a)
          if (S = a[s], _ = e[s], a.hasOwnProperty(s) && S !== _ && (S != null || _ != null))
            switch (s) {
              case "selected":
                l.selected = S && typeof S != "function" && typeof S != "symbol";
                break;
              default:
                pl(
                  l,
                  t,
                  s,
                  S,
                  a,
                  _
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
          S = e[L], e.hasOwnProperty(L) && S != null && !a.hasOwnProperty(L) && pl(l, t, L, null, a, S);
        for (y in a)
          if (S = a[y], _ = e[y], a.hasOwnProperty(y) && S !== _ && (S != null || _ != null))
            switch (y) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (S != null)
                  throw Error(o(137, t));
                break;
              default:
                pl(
                  l,
                  t,
                  y,
                  S,
                  a,
                  _
                );
            }
        return;
      default:
        if (Xi(t)) {
          for (var _l in e)
            S = e[_l], e.hasOwnProperty(_l) && S !== void 0 && !a.hasOwnProperty(_l) && Of(
              l,
              t,
              _l,
              void 0,
              a,
              S
            );
          for (T in a)
            S = a[T], _ = e[T], !a.hasOwnProperty(T) || S === _ || S === void 0 && _ === void 0 || Of(
              l,
              t,
              T,
              S,
              a,
              _
            );
          return;
        }
    }
    for (var v in e)
      S = e[v], e.hasOwnProperty(v) && S != null && !a.hasOwnProperty(v) && pl(l, t, v, null, a, S);
    for (O in a)
      S = a[O], _ = e[O], !a.hasOwnProperty(O) || S === _ || S == null && _ == null || pl(l, t, O, S, a, _);
  }
  function Xd(l) {
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
  function Wh() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, t = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var u = e[a], n = u.transferSize, i = u.initiatorType, c = u.duration;
        if (n && c && Xd(i)) {
          for (i = 0, c = u.responseEnd, a += 1; a < e.length; a++) {
            var s = e[a], y = s.startTime;
            if (y > c) break;
            var T = s.transferSize, O = s.initiatorType;
            T && Xd(O) && (s = s.responseEnd, i += T * (s < c ? 1 : (c - y) / (s - y)));
          }
          if (--a, t += 8 * (n + i) / (u.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var Df = null, xf = null;
  function ri(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Qd(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Vd(l, t) {
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
  var jf = null;
  function Fh() {
    var l = window.event;
    return l && l.type === "popstate" ? l === jf ? !1 : (jf = l, !0) : (jf = null, !1);
  }
  var Ld = typeof setTimeout == "function" ? setTimeout : void 0, kh = typeof clearTimeout == "function" ? clearTimeout : void 0, Zd = typeof Promise == "function" ? Promise : void 0, Ih = typeof queueMicrotask == "function" ? queueMicrotask : typeof Zd < "u" ? function(l) {
    return Zd.resolve(null).then(l).catch(Ph);
  } : Ld;
  function Ph(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function Ge(l) {
    return l === "head";
  }
  function Kd(l, t) {
    var e = t, a = 0;
    do {
      var u = e.nextSibling;
      if (l.removeChild(e), u && u.nodeType === 8)
        if (e = u.data, e === "/$" || e === "/&") {
          if (a === 0) {
            l.removeChild(u), tu(t);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          Ku(l.ownerDocument.documentElement);
        else if (e === "head") {
          e = l.ownerDocument.head, Ku(e);
          for (var n = e.firstChild; n; ) {
            var i = n.nextSibling, c = n.nodeName;
            n[su] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && n.rel.toLowerCase() === "stylesheet" || e.removeChild(n), n = i;
          }
        } else
          e === "body" && Ku(l.ownerDocument.body);
      e = u;
    } while (e);
    tu(t);
  }
  function Jd(l, t) {
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
          Rf(e), qi(e);
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
  function l0(l, t, e, a) {
    for (; l.nodeType === 1; ) {
      var u = e;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (a) {
        if (!l[su])
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
      if (l = Xt(l.nextSibling), l === null) break;
    }
    return null;
  }
  function t0(l, t, e) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !e || (l = Xt(l.nextSibling), l === null)) return null;
    return l;
  }
  function wd(l, t) {
    for (; l.nodeType !== 8; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = Xt(l.nextSibling), l === null)) return null;
    return l;
  }
  function Uf(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function Cf(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function e0(l, t) {
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
  function Xt(l) {
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
  var Hf = null;
  function $d(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "/$" || e === "/&") {
          if (t === 0)
            return Xt(l.nextSibling);
          t--;
        } else
          e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function Wd(l) {
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
  function Fd(l, t, e) {
    switch (t = ri(e), l) {
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
  function Ku(l) {
    for (var t = l.attributes; t.length; )
      l.removeAttributeNode(t[0]);
    qi(l);
  }
  var Qt = /* @__PURE__ */ new Map(), kd = /* @__PURE__ */ new Set();
  function di(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var ve = C.d;
  C.d = {
    f: a0,
    r: u0,
    D: n0,
    C: i0,
    L: c0,
    m: f0,
    X: o0,
    S: s0,
    M: r0
  };
  function a0() {
    var l = ve.f(), t = ai();
    return l || t;
  }
  function u0(l) {
    var t = pa(l);
    t !== null && t.tag === 5 && t.type === "form" ? vr(t) : ve.r(l);
  }
  var Ia = typeof document > "u" ? null : document;
  function Id(l, t, e) {
    var a = Ia;
    if (a && typeof t == "string" && t) {
      var u = Ut(t);
      u = 'link[rel="' + l + '"][href="' + u + '"]', typeof e == "string" && (u += '[crossorigin="' + e + '"]'), kd.has(u) || (kd.add(u), l = { rel: l, crossOrigin: e, href: t }, a.querySelector(u) === null && (t = a.createElement("link"), at(t, "link", l), Fl(t), a.head.appendChild(t)));
    }
  }
  function n0(l) {
    ve.D(l), Id("dns-prefetch", l, null);
  }
  function i0(l, t) {
    ve.C(l, t), Id("preconnect", l, t);
  }
  function c0(l, t, e) {
    ve.L(l, t, e);
    var a = Ia;
    if (a && l && t) {
      var u = 'link[rel="preload"][as="' + Ut(t) + '"]';
      t === "image" && e && e.imageSrcSet ? (u += '[imagesrcset="' + Ut(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (u += '[imagesizes="' + Ut(
        e.imageSizes
      ) + '"]')) : u += '[href="' + Ut(l) + '"]';
      var n = u;
      switch (t) {
        case "style":
          n = Pa(l);
          break;
        case "script":
          n = lu(l);
      }
      Qt.has(n) || (l = z(
        {
          rel: "preload",
          href: t === "image" && e && e.imageSrcSet ? void 0 : l,
          as: t
        },
        e
      ), Qt.set(n, l), a.querySelector(u) !== null || t === "style" && a.querySelector(Ju(n)) || t === "script" && a.querySelector(wu(n)) || (t = a.createElement("link"), at(t, "link", l), Fl(t), a.head.appendChild(t)));
    }
  }
  function f0(l, t) {
    ve.m(l, t);
    var e = Ia;
    if (e && l) {
      var a = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + Ut(a) + '"][href="' + Ut(l) + '"]', n = u;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = lu(l);
      }
      if (!Qt.has(n) && (l = z({ rel: "modulepreload", href: l }, t), Qt.set(n, l), e.querySelector(u) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(wu(n)))
              return;
        }
        a = e.createElement("link"), at(a, "link", l), Fl(a), e.head.appendChild(a);
      }
    }
  }
  function s0(l, t, e) {
    ve.S(l, t, e);
    var a = Ia;
    if (a && l) {
      var u = _a(a).hoistableStyles, n = Pa(l);
      t = t || "default";
      var i = u.get(n);
      if (!i) {
        var c = { loading: 0, preload: null };
        if (i = a.querySelector(
          Ju(n)
        ))
          c.loading = 5;
        else {
          l = z(
            { rel: "stylesheet", href: l, "data-precedence": t },
            e
          ), (e = Qt.get(n)) && qf(l, e);
          var s = i = a.createElement("link");
          Fl(s), at(s, "link", l), s._p = new Promise(function(y, T) {
            s.onload = y, s.onerror = T;
          }), s.addEventListener("load", function() {
            c.loading |= 1;
          }), s.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, mi(i, t, a);
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
  function o0(l, t) {
    ve.X(l, t);
    var e = Ia;
    if (e && l) {
      var a = _a(e).hoistableScripts, u = lu(l), n = a.get(u);
      n || (n = e.querySelector(wu(u)), n || (l = z({ src: l, async: !0 }, t), (t = Qt.get(u)) && Bf(l, t), n = e.createElement("script"), Fl(n), at(n, "link", l), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function r0(l, t) {
    ve.M(l, t);
    var e = Ia;
    if (e && l) {
      var a = _a(e).hoistableScripts, u = lu(l), n = a.get(u);
      n || (n = e.querySelector(wu(u)), n || (l = z({ src: l, async: !0, type: "module" }, t), (t = Qt.get(u)) && Bf(l, t), n = e.createElement("script"), Fl(n), at(n, "link", l), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function Pd(l, t, e, a) {
    var u = (u = $.current) ? di(u) : null;
    if (!u) throw Error(o(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (t = Pa(e.href), e = _a(
          u
        ).hoistableStyles, a = e.get(t), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          l = Pa(e.href);
          var n = _a(
            u
          ).hoistableStyles, i = n.get(l);
          if (i || (u = u.ownerDocument || u, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, n.set(l, i), (n = u.querySelector(
            Ju(l)
          )) && !n._p && (i.instance = n, i.state.loading = 5), Qt.has(l) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Qt.set(l, e), n || d0(
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
        return t = e.async, e = e.src, typeof e == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = lu(e), e = _a(
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
  function Pa(l) {
    return 'href="' + Ut(l) + '"';
  }
  function Ju(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function lm(l) {
    return z({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function d0(l, t, e, a) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = l.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), at(t, "link", e), Fl(t), l.head.appendChild(t));
  }
  function lu(l) {
    return '[src="' + Ut(l) + '"]';
  }
  function wu(l) {
    return "script[async]" + l;
  }
  function tm(l, t, e) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = l.querySelector(
            'style[data-href~="' + Ut(e.href) + '"]'
          );
          if (a)
            return t.instance = a, Fl(a), a;
          var u = z({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (l.ownerDocument || l).createElement(
            "style"
          ), Fl(a), at(a, "style", u), mi(a, e.precedence, l), t.instance = a;
        case "stylesheet":
          u = Pa(e.href);
          var n = l.querySelector(
            Ju(u)
          );
          if (n)
            return t.state.loading |= 4, t.instance = n, Fl(n), n;
          a = lm(e), (u = Qt.get(u)) && qf(a, u), n = (l.ownerDocument || l).createElement("link"), Fl(n);
          var i = n;
          return i._p = new Promise(function(c, s) {
            i.onload = c, i.onerror = s;
          }), at(n, "link", a), t.state.loading |= 4, mi(n, e.precedence, l), t.instance = n;
        case "script":
          return n = lu(e.src), (u = l.querySelector(
            wu(n)
          )) ? (t.instance = u, Fl(u), u) : (a = e, (u = Qt.get(n)) && (a = z({}, e), Bf(a, u)), l = l.ownerDocument || l, u = l.createElement("script"), Fl(u), at(u, "link", a), l.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, mi(a, e.precedence, l));
    return t.instance;
  }
  function mi(l, t, e) {
    for (var a = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = a.length ? a[a.length - 1] : null, n = u, i = 0; i < a.length; i++) {
      var c = a[i];
      if (c.dataset.precedence === t) n = c;
      else if (n !== u) break;
    }
    n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = e.nodeType === 9 ? e.head : e, t.insertBefore(l, t.firstChild));
  }
  function qf(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
  }
  function Bf(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
  }
  var vi = null;
  function em(l, t, e) {
    if (vi === null) {
      var a = /* @__PURE__ */ new Map(), u = vi = /* @__PURE__ */ new Map();
      u.set(e, a);
    } else
      u = vi, a = u.get(e), a || (a = /* @__PURE__ */ new Map(), u.set(e, a));
    if (a.has(l)) return a;
    for (a.set(l, null), e = e.getElementsByTagName(l), u = 0; u < e.length; u++) {
      var n = e[u];
      if (!(n[su] || n[Pl] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = n.getAttribute(t) || "";
        i = l + i;
        var c = a.get(i);
        c ? c.push(n) : a.set(i, [n]);
      }
    }
    return a;
  }
  function am(l, t, e) {
    l = l.ownerDocument || l, l.head.insertBefore(
      e,
      t === "title" ? l.querySelector("head > title") : null
    );
  }
  function m0(l, t, e) {
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
  function um(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function v0(l, t, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var u = Pa(a.href), n = t.querySelector(
          Ju(u)
        );
        if (n) {
          t = n._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = hi.bind(l), t.then(l, l)), e.state.loading |= 4, e.instance = n, Fl(n);
          return;
        }
        n = t.ownerDocument || t, a = lm(a), (u = Qt.get(u)) && qf(a, u), n = n.createElement("link"), Fl(n);
        var i = n;
        i._p = new Promise(function(c, s) {
          i.onload = c, i.onerror = s;
        }), at(n, "link", a), e.instance = n;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(e, t), (t = e.state.preload) && (e.state.loading & 3) === 0 && (l.count++, e = hi.bind(l), t.addEventListener("load", e), t.addEventListener("error", e));
    }
  }
  var Yf = 0;
  function h0(l, t) {
    return l.stylesheets && l.count === 0 && gi(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (l.stylesheets && gi(l, l.stylesheets), l.unsuspend) {
          var n = l.unsuspend;
          l.unsuspend = null, n();
        }
      }, 6e4 + t);
      0 < l.imgBytes && Yf === 0 && (Yf = 62500 * Wh());
      var u = setTimeout(
        function() {
          if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && gi(l, l.stylesheets), l.unsuspend)) {
            var n = l.unsuspend;
            l.unsuspend = null, n();
          }
        },
        (l.imgBytes > Yf ? 50 : 800) + t
      );
      return l.unsuspend = e, function() {
        l.unsuspend = null, clearTimeout(a), clearTimeout(u);
      };
    } : null;
  }
  function hi() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) gi(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var yi = null;
  function gi(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, yi = /* @__PURE__ */ new Map(), t.forEach(y0, l), yi = null, hi.call(l));
  }
  function y0(l, t) {
    if (!(t.state.loading & 4)) {
      var e = yi.get(l);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), yi.set(l, e);
        for (var u = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), n = 0; n < u.length; n++) {
          var i = u[n];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      u = t.instance, i = u.getAttribute("data-precedence"), n = e.get(i) || a, n === a && e.set(null, u), e.set(i, u), this.count++, a = hi.bind(this), u.addEventListener("load", a), u.addEventListener("error", a), n ? n.parentNode.insertBefore(u, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(u, l.firstChild)), t.state.loading |= 4;
    }
  }
  var $u = {
    $$typeof: jl,
    Provider: null,
    Consumer: null,
    _currentValue: Q,
    _currentValue2: Q,
    _threadCount: 0
  };
  function g0(l, t, e, a, u, n, i, c, s) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ri(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ri(0), this.hiddenUpdates = Ri(null), this.identifierPrefix = a, this.onUncaughtError = u, this.onCaughtError = n, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = s, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function nm(l, t, e, a, u, n, i, c, s, y, T, O) {
    return l = new g0(
      l,
      t,
      e,
      i,
      s,
      y,
      T,
      O,
      c
    ), t = 1, n === !0 && (t |= 24), n = zt(3, null, null, t), l.current = n, n.stateNode = l, t = yc(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: t
    }, pc(n), l;
  }
  function im(l) {
    return l ? (l = ja, l) : ja;
  }
  function cm(l, t, e, a, u, n) {
    u = im(u), a.context === null ? a.context = u : a.pendingContext = u, a = De(t), a.payload = { element: e }, n = n === void 0 ? null : n, n !== null && (a.callback = n), e = xe(l, a, t), e !== null && (St(e, l, t), Nu(e, l, t));
  }
  function fm(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var e = l.retryLane;
      l.retryLane = e !== 0 && e < t ? e : t;
    }
  }
  function Gf(l, t) {
    fm(l, t), (l = l.alternate) && fm(l, t);
  }
  function sm(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = aa(l, 67108864);
      t !== null && St(t, l, 67108864), Gf(l, 67108864);
    }
  }
  function om(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = xt();
      t = Ui(t);
      var e = aa(l, t);
      e !== null && St(e, l, t), Gf(l, t);
    }
  }
  var Si = !0;
  function S0(l, t, e, a) {
    var u = E.T;
    E.T = null;
    var n = C.p;
    try {
      C.p = 2, Xf(l, t, e, a);
    } finally {
      C.p = n, E.T = u;
    }
  }
  function b0(l, t, e, a) {
    var u = E.T;
    E.T = null;
    var n = C.p;
    try {
      C.p = 8, Xf(l, t, e, a);
    } finally {
      C.p = n, E.T = u;
    }
  }
  function Xf(l, t, e, a) {
    if (Si) {
      var u = Qf(a);
      if (u === null)
        Nf(
          l,
          t,
          a,
          bi,
          e
        ), dm(l, a);
      else if (_0(
        u,
        l,
        t,
        e,
        a
      ))
        a.stopPropagation();
      else if (dm(l, a), t & 4 && -1 < p0.indexOf(l)) {
        for (; u !== null; ) {
          var n = pa(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                  var i = Ie(n.pendingLanes);
                  if (i !== 0) {
                    var c = n;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                      var s = 1 << 31 - Et(i);
                      c.entanglements[1] |= s, i &= ~s;
                    }
                    $t(n), (ml & 6) === 0 && (ti = Nl() + 500, Vu(0));
                  }
                }
                break;
              case 31:
              case 13:
                c = aa(n, 2), c !== null && St(c, n, 2), ai(), Gf(n, 2);
            }
          if (n = Qf(a), n === null && Nf(
            l,
            t,
            a,
            bi,
            e
          ), n === u) break;
          u = n;
        }
        u !== null && a.stopPropagation();
      } else
        Nf(
          l,
          t,
          a,
          null,
          e
        );
    }
  }
  function Qf(l) {
    return l = Vi(l), Vf(l);
  }
  var bi = null;
  function Vf(l) {
    if (bi = null, l = ba(l), l !== null) {
      var t = U(l);
      if (t === null) l = null;
      else {
        var e = t.tag;
        if (e === 13) {
          if (l = M(t), l !== null) return l;
          l = null;
        } else if (e === 31) {
          if (l = B(t), l !== null) return l;
          l = null;
        } else if (e === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return bi = l, null;
  }
  function rm(l) {
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
        switch (Fe()) {
          case be:
            return 2;
          case nu:
            return 8;
          case ke:
          case rt:
            return 32;
          case jt:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Lf = !1, Xe = null, Qe = null, Ve = null, Wu = /* @__PURE__ */ new Map(), Fu = /* @__PURE__ */ new Map(), Le = [], p0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function dm(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        Xe = null;
        break;
      case "dragenter":
      case "dragleave":
        Qe = null;
        break;
      case "mouseover":
      case "mouseout":
        Ve = null;
        break;
      case "pointerover":
      case "pointerout":
        Wu.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Fu.delete(t.pointerId);
    }
  }
  function ku(l, t, e, a, u, n) {
    return l === null || l.nativeEvent !== n ? (l = {
      blockedOn: t,
      domEventName: e,
      eventSystemFlags: a,
      nativeEvent: n,
      targetContainers: [u]
    }, t !== null && (t = pa(t), t !== null && sm(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), l);
  }
  function _0(l, t, e, a, u) {
    switch (t) {
      case "focusin":
        return Xe = ku(
          Xe,
          l,
          t,
          e,
          a,
          u
        ), !0;
      case "dragenter":
        return Qe = ku(
          Qe,
          l,
          t,
          e,
          a,
          u
        ), !0;
      case "mouseover":
        return Ve = ku(
          Ve,
          l,
          t,
          e,
          a,
          u
        ), !0;
      case "pointerover":
        var n = u.pointerId;
        return Wu.set(
          n,
          ku(
            Wu.get(n) || null,
            l,
            t,
            e,
            a,
            u
          )
        ), !0;
      case "gotpointercapture":
        return n = u.pointerId, Fu.set(
          n,
          ku(
            Fu.get(n) || null,
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
  function mm(l) {
    var t = ba(l.target);
    if (t !== null) {
      var e = U(t);
      if (e !== null) {
        if (t = e.tag, t === 13) {
          if (t = M(e), t !== null) {
            l.blockedOn = t, Ns(l.priority, function() {
              om(e);
            });
            return;
          }
        } else if (t === 31) {
          if (t = B(e), t !== null) {
            l.blockedOn = t, Ns(l.priority, function() {
              om(e);
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
  function pi(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var e = Qf(l.nativeEvent);
      if (e === null) {
        e = l.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        Qi = a, e.target.dispatchEvent(a), Qi = null;
      } else
        return t = pa(e), t !== null && sm(t), l.blockedOn = e, !1;
      t.shift();
    }
    return !0;
  }
  function vm(l, t, e) {
    pi(l) && e.delete(t);
  }
  function E0() {
    Lf = !1, Xe !== null && pi(Xe) && (Xe = null), Qe !== null && pi(Qe) && (Qe = null), Ve !== null && pi(Ve) && (Ve = null), Wu.forEach(vm), Fu.forEach(vm);
  }
  function _i(l, t) {
    l.blockedOn === t && (l.blockedOn = null, Lf || (Lf = !0, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      E0
    )));
  }
  var Ei = null;
  function hm(l) {
    Ei !== l && (Ei = l, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      function() {
        Ei === l && (Ei = null);
        for (var t = 0; t < l.length; t += 3) {
          var e = l[t], a = l[t + 1], u = l[t + 2];
          if (typeof a != "function") {
            if (Vf(a || e) === null)
              continue;
            break;
          }
          var n = pa(e);
          n !== null && (l.splice(t, 3), t -= 3, Xc(
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
  function tu(l) {
    function t(s) {
      return _i(s, l);
    }
    Xe !== null && _i(Xe, l), Qe !== null && _i(Qe, l), Ve !== null && _i(Ve, l), Wu.forEach(t), Fu.forEach(t);
    for (var e = 0; e < Le.length; e++) {
      var a = Le[e];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < Le.length && (e = Le[0], e.blockedOn === null); )
      mm(e), e.blockedOn === null && Le.shift();
    if (e = (l.ownerDocument || l).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var u = e[a], n = e[a + 1], i = u[dt] || null;
        if (typeof n == "function")
          i || hm(e);
        else if (i) {
          var c = null;
          if (n && n.hasAttribute("formAction")) {
            if (u = n, i = n[dt] || null)
              c = i.formAction;
            else if (Vf(u) !== null) continue;
          } else c = i.action;
          typeof c == "function" ? e[a + 1] = c : (e.splice(a, 3), a -= 3), hm(e);
        }
      }
  }
  function ym() {
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
  function Zf(l) {
    this._internalRoot = l;
  }
  Ti.prototype.render = Zf.prototype.render = function(l) {
    var t = this._internalRoot;
    if (t === null) throw Error(o(409));
    var e = t.current, a = xt();
    cm(e, a, l, t, null, null);
  }, Ti.prototype.unmount = Zf.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      cm(l.current, 2, null, l, null, null), ai(), t[Sa] = null;
    }
  };
  function Ti(l) {
    this._internalRoot = l;
  }
  Ti.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = As();
      l = { blockedOn: null, target: l, priority: t };
      for (var e = 0; e < Le.length && t !== 0 && t < Le[e].priority; e++) ;
      Le.splice(e, 0, l), e === 0 && mm(l);
    }
  };
  var gm = b.version;
  if (gm !== "19.2.6")
    throw Error(
      o(
        527,
        gm,
        "19.2.6"
      )
    );
  C.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function" ? Error(o(188)) : (l = Object.keys(l).join(","), Error(o(268, l)));
    return l = g(t), l = l !== null ? x(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var T0 = {
    bundleType: 0,
    version: "19.2.6",
    rendererPackageName: "react-dom",
    currentDispatcherRef: E,
    reconcilerVersion: "19.2.6"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var zi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!zi.isDisabled && zi.supportsFiber)
      try {
        Ft = zi.inject(
          T0
        ), _t = zi;
      } catch {
      }
  }
  return Pu.createRoot = function(l, t) {
    if (!R(l)) throw Error(o(299));
    var e = !1, a = "", u = zr, n = Ar, i = Nr;
    return t != null && (t.unstable_strictMode === !0 && (e = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = nm(
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
      ym
    ), l[Sa] = t.current, Af(l), new Zf(t);
  }, Pu.hydrateRoot = function(l, t, e) {
    if (!R(l)) throw Error(o(299));
    var a = !1, u = "", n = zr, i = Ar, c = Nr, s = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (u = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (c = e.onRecoverableError), e.formState !== void 0 && (s = e.formState)), t = nm(
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
      ym
    ), t.context = im(null), e = t.current, a = xt(), a = Ui(a), u = De(a), u.callback = null, xe(e, u, a), e = a, t.current.lanes = e, fu(t, e), $t(t), l[Sa] = t.current, Af(l), new Ti(t);
  }, Pu.version = "19.2.6", Pu;
}
var Om;
function C0() {
  if (Om) return wf.exports;
  Om = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (b) {
        console.error(b);
      }
  }
  return f(), wf.exports = U0(), wf.exports;
}
var H0 = C0(), kf = { exports: {} }, If = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Dm;
function q0() {
  if (Dm) return If;
  Dm = 1;
  var f = Mi();
  function b(z, H) {
    return z === H && (z !== 0 || 1 / z === 1 / H) || z !== z && H !== H;
  }
  var p = typeof Object.is == "function" ? Object.is : b, o = f.useState, R = f.useEffect, U = f.useLayoutEffect, M = f.useDebugValue;
  function B(z, H) {
    var Z = H(), cl = o({ inst: { value: Z, getSnapshot: H } }), I = cl[0].inst, vl = cl[1];
    return U(
      function() {
        I.value = Z, I.getSnapshot = H, D(I) && vl({ inst: I });
      },
      [z, Z, H]
    ), R(
      function() {
        return D(I) && vl({ inst: I }), z(function() {
          D(I) && vl({ inst: I });
        });
      },
      [z]
    ), M(Z), Z;
  }
  function D(z) {
    var H = z.getSnapshot;
    z = z.value;
    try {
      var Z = H();
      return !p(z, Z);
    } catch {
      return !0;
    }
  }
  function g(z, H) {
    return H();
  }
  var x = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? g : B;
  return If.useSyncExternalStore = f.useSyncExternalStore !== void 0 ? f.useSyncExternalStore : x, If;
}
var xm;
function B0() {
  return xm || (xm = 1, kf.exports = q0()), kf.exports;
}
var Mm = B0();
const Lm = 0, Zm = 1, Km = 2, jm = 3;
var Rm = Object.prototype.hasOwnProperty;
function ns(f, b) {
  var p, o;
  if (f === b) return !0;
  if (f && b && (p = f.constructor) === b.constructor) {
    if (p === Date) return f.getTime() === b.getTime();
    if (p === RegExp) return f.toString() === b.toString();
    if (p === Array) {
      if ((o = f.length) === b.length)
        for (; o-- && ns(f[o], b[o]); ) ;
      return o === -1;
    }
    if (!p || typeof f == "object") {
      o = 0;
      for (p in f)
        if (Rm.call(f, p) && ++o && !Rm.call(b, p) || !(p in b) || !ns(f[p], b[p])) return !1;
      return Object.keys(b).length === o;
    }
  }
  return f !== f && b !== b;
}
const he = /* @__PURE__ */ new WeakMap(), ge = () => {
}, nt = (
  /*#__NOINLINE__*/
  ge()
), is = Object, nl = (f) => f === nt, Wt = (f) => typeof f == "function", $e = (f, b) => ({
  ...f,
  ...b
}), Jm = (f) => Wt(f.then), Pf = {}, Ai = {}, hs = "undefined", un = typeof window != hs, cs = typeof document != hs, Y0 = un && "Deno" in window, G0 = () => un && typeof window.requestAnimationFrame != hs, wm = (f, b) => {
  const p = he.get(f);
  return [
    // Getter
    () => !nl(b) && f.get(b) || Pf,
    // Setter
    (o) => {
      if (!nl(b)) {
        const R = f.get(b);
        b in Ai || (Ai[b] = R), p[5](b, $e(R, o), R || Pf);
      }
    },
    // Subscriber
    p[6],
    // Get server cache snapshot
    () => !nl(b) && b in Ai ? Ai[b] : !nl(b) && f.get(b) || Pf
  ];
};
let fs = !0;
const X0 = () => fs, [ss, os] = un && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  ge,
  ge
], Q0 = () => {
  const f = cs && document.visibilityState;
  return nl(f) || f !== "hidden";
}, V0 = (f) => (cs && document.addEventListener("visibilitychange", f), ss("focus", f), () => {
  cs && document.removeEventListener("visibilitychange", f), os("focus", f);
}), L0 = (f) => {
  const b = () => {
    fs = !0, f();
  }, p = () => {
    fs = !1;
  };
  return ss("online", b), ss("offline", p), () => {
    os("online", b), os("offline", p);
  };
}, Z0 = {
  isOnline: X0,
  isVisible: Q0
}, K0 = {
  initFocus: V0,
  initReconnect: L0
}, Um = !vs.useId, eu = !un || Y0, J0 = (f) => G0() ? window.requestAnimationFrame(f) : setTimeout(f, 1), ls = eu ? F.useEffect : F.useLayoutEffect, ts = typeof navigator < "u" && navigator.connection, Cm = !eu && ts && ([
  "slow-2g",
  "2g"
].includes(ts.effectiveType) || ts.saveData), Ni = /* @__PURE__ */ new WeakMap(), w0 = (f) => is.prototype.toString.call(f), es = (f, b) => f === `[object ${b}]`;
let $0 = 0;
const rs = (f) => {
  const b = typeof f, p = w0(f), o = es(p, "Date"), R = es(p, "RegExp"), U = es(p, "Object");
  let M, B;
  if (is(f) === f && !o && !R) {
    if (M = Ni.get(f), M) return M;
    if (M = ++$0 + "~", Ni.set(f, M), Array.isArray(f)) {
      for (M = "@", B = 0; B < f.length; B++)
        M += rs(f[B]) + ",";
      Ni.set(f, M);
    }
    if (U) {
      M = "#";
      const D = is.keys(f).sort();
      for (; !nl(B = D.pop()); )
        nl(f[B]) || (M += B + ":" + rs(f[B]) + ",");
      Ni.set(f, M);
    }
  } else
    M = o ? f.toJSON() : b == "symbol" ? f.toString() : b == "string" ? JSON.stringify(f) : "" + f;
  return M;
}, ys = (f) => {
  if (Wt(f))
    try {
      f = f();
    } catch {
      f = "";
    }
  const b = f;
  return f = typeof f == "string" ? f : (Array.isArray(f) ? f.length : f) ? rs(f) : "", [
    f,
    b
  ];
};
let W0 = 0;
const ds = () => ++W0;
async function $m(...f) {
  const [b, p, o, R] = f, U = $e({
    populateCache: !0,
    throwOnError: !0
  }, typeof R == "boolean" ? {
    revalidate: R
  } : R || {});
  let M = U.populateCache;
  const B = U.rollbackOnError;
  let D = U.optimisticData;
  const g = (H) => typeof B == "function" ? B(H) : B !== !1, x = U.throwOnError;
  if (Wt(p)) {
    const H = p, Z = [], cl = b.keys();
    for (const I of cl)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(I) && H(b.get(I)._k) && Z.push(I);
    return Promise.all(Z.map(z));
  }
  return z(p);
  async function z(H) {
    const [Z] = ys(H);
    if (!Z) return;
    const [cl, I] = wm(b, Z), [vl, Hl, V, jl] = he.get(b), P = () => {
      const Gl = vl[Z];
      return (Wt(U.revalidate) ? U.revalidate(cl().data, H) : U.revalidate !== !1) && (delete V[Z], delete jl[Z], Gl && Gl[0]) ? Gl[0](Km).then(() => cl().data) : cl().data;
    };
    if (f.length < 3)
      return P();
    let gl = o, Tl, K = !1;
    const ql = ds();
    Hl[Z] = [
      ql,
      0
    ];
    const sl = !nl(D), bt = cl(), Bl = bt.data, Yl = bt._c, it = nl(Yl) ? Bl : Yl;
    if (sl && (D = Wt(D) ? D(it, Bl) : D, I({
      data: D,
      _c: it
    })), Wt(gl))
      try {
        gl = gl(it);
      } catch (Gl) {
        Tl = Gl, K = !0;
      }
    if (gl && Jm(gl))
      if (gl = await gl.catch((Gl) => {
        Tl = Gl, K = !0;
      }), ql !== Hl[Z][0]) {
        if (K) throw Tl;
        return gl;
      } else K && sl && g(Tl) && (M = !0, I({
        data: it,
        _c: nt
      }));
    if (M && !K)
      if (Wt(M)) {
        const Gl = M(gl, it);
        I({
          data: Gl,
          error: nt,
          _c: nt
        });
      } else
        I({
          data: gl,
          error: nt,
          _c: nt
        });
    if (Hl[Z][1] = ds(), Promise.resolve(P()).then(() => {
      I({
        _c: nt
      });
    }), K) {
      if (x) throw Tl;
      return;
    }
    return gl;
  }
}
const Hm = (f, b) => {
  for (const p in f)
    f[p][0] && f[p][0](b);
}, F0 = (f, b) => {
  if (!he.has(f)) {
    const p = $e(K0, b), o = /* @__PURE__ */ Object.create(null), R = $m.bind(nt, f);
    let U = ge;
    const M = /* @__PURE__ */ Object.create(null), B = (x, z) => {
      const H = M[x] || [];
      return M[x] = H, H.push(z), () => H.splice(H.indexOf(z), 1);
    }, D = (x, z, H) => {
      f.set(x, z);
      const Z = M[x];
      if (Z)
        for (const cl of Z)
          cl(z, H);
    }, g = () => {
      if (!he.has(f) && (he.set(f, [
        o,
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        R,
        D,
        B
      ]), !eu)) {
        const x = p.initFocus(setTimeout.bind(nt, Hm.bind(nt, o, Lm))), z = p.initReconnect(setTimeout.bind(nt, Hm.bind(nt, o, Zm)));
        U = () => {
          x && x(), z && z(), he.delete(f);
        };
      }
    };
    return g(), [
      f,
      R,
      g,
      U
    ];
  }
  return [
    f,
    he.get(f)[4]
  ];
}, k0 = (f, b, p, o, R) => {
  const U = p.errorRetryCount, M = R.retryCount, B = ~~((Math.random() + 0.5) * (1 << (M < 8 ? M : 8))) * p.errorRetryInterval;
  !nl(U) && M > U || setTimeout(o, B, R);
}, I0 = ns, [Wm, P0] = F0(/* @__PURE__ */ new Map()), ly = $e(
  {
    // events
    onLoadingSlow: ge,
    onSuccess: ge,
    onError: ge,
    onErrorRetry: k0,
    onDiscarded: ge,
    // switches
    revalidateOnFocus: !0,
    revalidateOnReconnect: !0,
    revalidateIfStale: !0,
    shouldRetryOnError: !0,
    // timeouts
    errorRetryInterval: Cm ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: Cm ? 5e3 : 3e3,
    // providers
    compare: I0,
    isPaused: () => !1,
    cache: Wm,
    mutate: P0,
    fallback: {}
  },
  // use web preset by default
  Z0
), ty = (f, b) => {
  const p = $e(f, b);
  if (b) {
    const { use: o, fallback: R } = f, { use: U, fallback: M } = b;
    o && U && (p.use = o.concat(U)), R && M && (p.fallback = $e(R, M));
  }
  return p;
}, ey = F.createContext({}), ay = "$inf$", Fm = un && window.__SWR_DEVTOOLS_USE__, uy = Fm ? window.__SWR_DEVTOOLS_USE__ : [], ny = () => {
  Fm && (window.__SWR_DEVTOOLS_REACT__ = vs);
}, iy = (f) => Wt(f[1]) ? [
  f[0],
  f[1],
  f[2] || {}
] : [
  f[0],
  null,
  (f[1] === null ? f[2] : f[1]) || {}
], cy = () => {
  const f = F.useContext(ey);
  return F.useMemo(() => $e(ly, f), [
    f
  ]);
}, fy = (f) => (b, p, o) => f(b, p && ((...U) => {
  const [M] = ys(b), [, , , B] = he.get(Wm);
  if (M.startsWith(ay))
    return p(...U);
  const D = B[M];
  return nl(D) ? p(...U) : (delete B[M], D);
}), o), sy = uy.concat(fy), oy = (f) => function(...p) {
  const o = cy(), [R, U, M] = iy(p), B = ty(o, M);
  let D = f;
  const { use: g } = B, x = (g || []).concat(sy);
  for (let z = x.length; z--; )
    D = x[z](D);
  return D(R, U || B.fetcher || null, B);
}, ry = (f, b, p) => {
  const o = b[f] || (b[f] = []);
  return o.push(p), () => {
    const R = o.indexOf(p);
    R >= 0 && (o[R] = o[o.length - 1], o.pop());
  };
};
ny();
const as = vs.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
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
}), us = {
  dedupe: !0
}, qm = Promise.resolve(nt), dy = () => ge, my = (f, b, p) => {
  const { cache: o, compare: R, suspense: U, fallbackData: M, revalidateOnMount: B, revalidateIfStale: D, refreshInterval: g, refreshWhenHidden: x, refreshWhenOffline: z, keepPreviousData: H, strictServerPrefetchWarning: Z } = p, [cl, I, vl, Hl] = he.get(o), [V, jl] = ys(f), P = F.useRef(!1), gl = F.useRef(!1), Tl = F.useRef(V), K = F.useRef(b), ql = F.useRef(p), sl = () => ql.current, bt = () => sl().isVisible() && sl().isOnline(), [Bl, Yl, it, Gl] = wm(o, V), Wl = F.useRef({}).current, E = nl(M) ? nl(p.fallback) ? nt : p.fallback[V] : M, C = (Sl, xl) => {
    for (const zl in Wl) {
      const Al = zl;
      if (Al === "data") {
        if (!R(Sl[Al], xl[Al]) && (!nl(Sl[Al]) || !R($, xl[Al])))
          return !1;
      } else if (xl[Al] !== Sl[Al])
        return !1;
    }
    return !0;
  }, Q = !P.current, dl = F.useMemo(() => {
    const Sl = Bl(), xl = Gl(), zl = (Ql) => {
      const Nl = $e(Ql);
      return delete Nl._k, (() => {
        if (!V || !b || sl().isPaused()) return !1;
        if (Q && !nl(B)) return B;
        const be = nl(E) ? Nl.data : E;
        return nl(be) || D;
      })() ? {
        isValidating: !0,
        isLoading: !0,
        ...Nl
      } : Nl;
    }, Al = zl(Sl), st = Sl === xl ? Al : zl(xl);
    let ot = Al;
    return [
      () => {
        const Ql = zl(Bl());
        return C(Ql, ot) ? (ot.data = Ql.data, ot.isLoading = Ql.isLoading, ot.isValidating = Ql.isValidating, ot.error = Ql.error, ot) : (ot = Ql, Ql);
      },
      () => st
    ];
  }, [
    o,
    V
  ]), fl = Mm.useSyncExternalStore(F.useCallback(
    (Sl) => it(V, (xl, zl) => {
      C(zl, xl) || Sl();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      o,
      V
    ]
  ), dl[0], dl[1]), d = cl[V] && cl[V].length > 0, N = fl.data, j = nl(N) ? E && Jm(E) ? as(E) : E : N, q = fl.error, J = F.useRef(j), $ = H ? nl(N) ? nl(J.current) ? j : J.current : N : j, ll = V && nl(j), Xl = F.useRef(null);
  !eu && // getServerSnapshot is only called during hydration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Mm.useSyncExternalStore(dy, () => (Xl.current = !1, Xl), () => (Xl.current = !0, Xl));
  const Rl = Xl.current;
  Z && Rl && !U && ll && console.warn(`Missing pre-initiated data for serialized key "${V}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
  const Se = !V || !b || sl().isPaused() || d && !nl(q) ? !1 : Q && !nl(B) ? B : U ? nl(j) ? !1 : D : nl(j) || D, We = Q && Se, uu = nl(fl.isValidating) ? We : fl.isValidating, cn = nl(fl.isLoading) ? We : fl.isLoading, pt = F.useCallback(
    async (Sl) => {
      const xl = K.current;
      if (!V || !xl || gl.current || sl().isPaused())
        return !1;
      let zl, Al, st = !0;
      const ot = Sl || {}, Ql = !vl[V] || !ot.dedupe, Nl = () => Um ? !gl.current && V === Tl.current && P.current : V === Tl.current, Fe = {
        isValidating: !1,
        isLoading: !1
      }, be = () => {
        Yl(Fe);
      }, nu = () => {
        const rt = vl[V];
        rt && rt[1] === Al && delete vl[V];
      }, ke = {
        isValidating: !0
      };
      nl(Bl().data) && (ke.isLoading = !0);
      try {
        if (Ql && (Yl(ke), p.loadingTimeout && nl(Bl().data) && setTimeout(() => {
          st && Nl() && sl().onLoadingSlow(V, p);
        }, p.loadingTimeout), vl[V] = [
          xl(jl),
          ds()
        ]), [zl, Al] = vl[V], zl = await zl, Ql && setTimeout(nu, p.dedupingInterval), !vl[V] || vl[V][1] !== Al)
          return Ql && Nl() && sl().onDiscarded(V), !1;
        Fe.error = nt;
        const rt = I[V];
        if (!nl(rt) && // case 1
        (Al <= rt[0] || // case 2
        Al <= rt[1] || // case 3
        rt[1] === 0))
          return be(), Ql && Nl() && sl().onDiscarded(V), !1;
        const jt = Bl().data;
        Fe.data = R(jt, zl) ? jt : zl, Ql && Nl() && sl().onSuccess(zl, V, p);
      } catch (rt) {
        nu();
        const jt = sl(), { shouldRetryOnError: iu } = jt;
        jt.isPaused() || (Fe.error = rt, Ql && Nl() && (jt.onError(rt, V, jt), (iu === !0 || Wt(iu) && iu(rt)) && (!sl().revalidateOnFocus || !sl().revalidateOnReconnect || bt()) && jt.onErrorRetry(rt, V, jt, (ji) => {
          const Ft = cl[V];
          Ft && Ft[0] && Ft[0](jm, ji);
        }, {
          retryCount: (ot.retryCount || 0) + 1,
          dedupe: !0
        })));
      }
      return st = !1, be(), !0;
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
  ), ga = F.useCallback(
    // Use callback to make sure `keyRef.current` returns latest result every time
    (...Sl) => $m(o, Tl.current, ...Sl),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (ls(() => {
    K.current = b, ql.current = p, nl(N) || (J.current = N);
  }), ls(() => {
    if (!V) return;
    const Sl = pt.bind(nt, us);
    let xl = 0;
    sl().revalidateOnFocus && (xl = Date.now() + sl().focusThrottleInterval);
    const Al = ry(V, cl, (st, ot = {}) => {
      if (st == Lm) {
        const Ql = Date.now();
        sl().revalidateOnFocus && Ql > xl && bt() && (xl = Ql + sl().focusThrottleInterval, Sl());
      } else if (st == Zm)
        sl().revalidateOnReconnect && bt() && Sl();
      else {
        if (st == Km)
          return pt();
        if (st == jm)
          return pt(ot);
      }
    });
    return gl.current = !1, Tl.current = V, P.current = !0, Yl({
      _k: jl
    }), Se && (vl[V] || (nl(j) || eu ? Sl() : J0(Sl))), () => {
      gl.current = !0, Al();
    };
  }, [
    V
  ]), ls(() => {
    let Sl;
    function xl() {
      const Al = Wt(g) ? g(Bl().data) : g;
      Al && Sl !== -1 && (Sl = setTimeout(zl, Al));
    }
    function zl() {
      !Bl().error && (x || sl().isVisible()) && (z || sl().isOnline()) ? pt(us).then(xl) : xl();
    }
    return xl(), () => {
      Sl && (clearTimeout(Sl), Sl = -1);
    };
  }, [
    g,
    x,
    z,
    V
  ]), F.useDebugValue($), U) {
    if (!Um && eu && ll)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    ll && (K.current = b, ql.current = p, gl.current = !1);
    const Sl = Hl[V], xl = !nl(Sl) && ll ? ga(Sl) : qm;
    if (as(xl), !nl(q) && ll)
      throw q;
    const zl = ll ? pt(us) : qm;
    !nl($) && ll && (zl.status = "fulfilled", zl.value = !0), as(zl);
  }
  return {
    mutate: ga,
    get data() {
      return Wl.data = !0, $;
    },
    get error() {
      return Wl.error = !0, q;
    },
    get isValidating() {
      return Wl.isValidating = !0, uu;
    },
    get isLoading() {
      return Wl.isLoading = !0, cn;
    }
  };
}, Oi = oy(my), km = "/api/v1/extensions/nexus.video.ltx23";
async function we(f, b) {
  const p = await fetch(`${km}${f}`, {
    headers: { "Content-Type": "application/json", ...b?.headers ?? {} },
    ...b
  });
  if (!p.ok) {
    const o = await p.text();
    throw new Error(`${p.status} ${p.statusText}: ${o}`);
  }
  return await p.json();
}
const ln = {
  health: () => we("/health"),
  listProfiles: () => we("/runtime-profiles"),
  plan: (f) => we("/recipe/plan", {
    method: "POST",
    body: JSON.stringify(f)
  }),
  createRender: (f) => we(
    "/renders",
    { method: "POST", body: JSON.stringify(f) }
  ),
  getRender: (f) => we(`/renders/${f}`),
  cancel: (f) => we(`/renders/${f}/cancel`, { method: "POST" })
};
function vy(f) {
  return `${km}/artifacts/${f}`;
}
const hy = "/api/v1", Bm = "nexus.video.ltx23";
async function Ym(f, b) {
  const p = await fetch(`${hy}${f}`, {
    headers: { "Content-Type": "application/json", ...b?.headers ?? {} },
    ...b
  });
  if (!p.ok) {
    const R = await p.text();
    throw new Error(`${p.status}: ${R}`);
  }
  return (await p.json()).data;
}
const Gm = {
  listDependencies: () => Ym(`/extensions/${Bm}/dependencies`),
  startInstall: (f = !1) => Ym(
    `/extensions/${Bm}/install${f ? "?force=true" : ""}`,
    { method: "POST" }
  )
}, Xm = {
  status: (f) => we(`/profiles/${f}/install`),
  start: (f) => we(`/profiles/${f}/install`, {
    method: "POST"
  })
};
var yy = "_1vmg9ib0", au = "_1vmg9ib1", tn = "_1vmg9ib2", gy = "_1vmg9ib3", ft = "_1vmg9ib4", Mt = "_1vmg9ib5", ye = "_1vmg9ib6", Im = "_1vmg9ib7 _1vmg9ib6", Qm = "_1vmg9ib8 _1vmg9ib6", Di = "_1vmg9ib9", gs = "_1vmg9iba", Ss = "_1vmg9ibb _1vmg9iba", Pm = "_1vmg9ibc _1vmg9iba", nn = "_1vmg9ibd", Ke = "_1vmg9ibe", Je = "_1vmg9ibf", ya = "_1vmg9ibg", lv = "_1vmg9ibi _1vmg9ibh", tv = "_1vmg9ibj _1vmg9ibh", ev = "_1vmg9ibk _1vmg9ibh", av = "_1vmg9ibl _1vmg9ibh", en = "_1vmg9ibm", an = "_1vmg9ibn", Sy = "_1vmg9ibo", by = "_1vmg9ibp", ms = "_1vmg9ibr _1vmg9ibq", uv = "_1vmg9ibs _1vmg9ibq", nv = "_1vmg9ibt _1vmg9ibq", iv = "_1vmg9ibu _1vmg9ibq", py = "_1vmg9ibv", _y = "_1vmg9ibw", Ey = "_1vmg9ibx", Ty = "_1vmg9iby", zy = "_1vmg9ibz _1vmg9iba", Il = "_1vmg9ib10", Ay = "_1vmg9ib11", Ny = "_1vmg9ib12", Oy = "_1vmg9ib13", Dy = "_1vmg9ib14", xy = "_1vmg9ib15", bs = "_1vmg9ib16", ps = "_1vmg9ib17", My = "_1vmg9ib18";
const jy = {
  prompt: "a slow cinematic dolly shot over a futuristic city at dusk",
  duration_seconds: 6,
  runtime_profile: "auto",
  quality_preset: "balanced_16gb"
};
function Ry() {
  const [f, b] = F.useState(jy), [p, o] = F.useState(null), [R, U] = F.useState(null), [M, B] = F.useState(!1), [D, g] = F.useState(null), [x, z] = F.useState(null), [H, Z] = F.useState(!1), { data: cl } = Oi(
    "/runtime-profiles",
    () => ln.listProfiles(),
    { revalidateOnFocus: !1 }
  ), { data: I, mutate: vl } = Oi(
    D ? `/renders/${D}` : null,
    () => D ? ln.getRender(D) : Promise.resolve(null),
    {
      refreshInterval: (P) => P ? P.status === "completed" || P.status === "failed" || P.status === "cancelled" ? 0 : 600 : 1e3
    }
  ), Hl = F.useCallback(async () => {
    B(!0), U(null);
    try {
      const P = await ln.plan(f);
      o(P);
    } catch (P) {
      U(P instanceof Error ? P.message : String(P)), o(null);
    } finally {
      B(!1);
    }
  }, [f]), V = F.useCallback(async () => {
    Z(!0), z(null);
    try {
      const P = await ln.createRender(f);
      g(P.id), vl();
    } catch (P) {
      z(P instanceof Error ? P.message : String(P));
    } finally {
      Z(!1);
    }
  }, [f, vl]), jl = F.useCallback(async () => {
    if (D)
      try {
        await ln.cancel(D), vl();
      } catch (P) {
        console.error("cancel failed", P);
      }
  }, [D, vl]);
  return /* @__PURE__ */ m.jsxs("div", { className: yy, children: [
    /* @__PURE__ */ m.jsxs("div", { className: Ny, children: [
      /* @__PURE__ */ m.jsx(Uy, {}),
      /* @__PURE__ */ m.jsx(
        qy,
        {
          draft: f,
          onChange: b,
          profiles: cl ?? [],
          onPlan: Hl,
          onSubmit: V,
          planning: M,
          submitting: H,
          plan: p,
          planError: R,
          submitError: x
        }
      )
    ] }),
    /* @__PURE__ */ m.jsx(Zy, { run: I ?? null, onCancel: jl })
  ] });
}
function Uy() {
  const [f, b] = F.useState(!1), [p, o] = F.useState(null), { data: R, mutate: U } = Oi(
    "host:dependencies",
    () => Gm.listDependencies(),
    {
      refreshInterval: (x) => x ? x.steps.some(
        (H) => H.status === "running" || H.status === "pending"
      ) ? 1e3 : 5e3 : 1500
    }
  ), M = F.useCallback(
    async (x = !1) => {
      b(!0), o(null);
      try {
        await Gm.startInstall(x), U();
      } catch (z) {
        o(z instanceof Error ? z.message : String(z));
      } finally {
        b(!1);
      }
    },
    [U]
  );
  if (!R) return null;
  const B = R.steps.find((x) => x.status === "failed"), D = R.all_satisfied, g = R.steps.some(
    (x) => x.status === "running" || !D && x.status === "pending"
  );
  return /* @__PURE__ */ m.jsxs("section", { className: au, children: [
    /* @__PURE__ */ m.jsxs("div", { className: Oy, children: [
      /* @__PURE__ */ m.jsx("h3", { className: tn, style: { fontSize: "15px" }, children: "Runtime" }),
      /* @__PURE__ */ m.jsx("span", { className: Cy(D, !!B, g), children: D ? "ready" : B ? "install failed" : g ? "installing…" : "not installed" })
    ] }),
    /* @__PURE__ */ m.jsx("ul", { className: Dy, children: R.steps.map((x) => /* @__PURE__ */ m.jsxs("li", { className: xy, children: [
      /* @__PURE__ */ m.jsx("span", { className: Hy(x.status) }),
      /* @__PURE__ */ m.jsx("span", { children: x.id }),
      /* @__PURE__ */ m.jsx("span", { className: Il, children: x.artifact?.summary ?? x.status })
    ] }, x.id)) }),
    B?.last_error ? /* @__PURE__ */ m.jsxs("div", { className: an, children: [
      /* @__PURE__ */ m.jsxs("strong", { children: [
        B.id,
        " failed"
      ] }),
      ": ",
      B.last_error.message
    ] }) : null,
    p ? /* @__PURE__ */ m.jsx("div", { className: an, children: p }) : null,
    !D || B ? /* @__PURE__ */ m.jsxs("div", { className: nn, children: [
      /* @__PURE__ */ m.jsx(
        "button",
        {
          type: "button",
          className: gs,
          disabled: f || g,
          onClick: () => void M(!1),
          children: g || f ? "Installing…" : "Install runtime"
        }
      ),
      B ? /* @__PURE__ */ m.jsx(
        "button",
        {
          type: "button",
          className: Ss,
          disabled: f || g,
          onClick: () => void M(!0),
          children: "Force reinstall"
        }
      ) : null
    ] }) : null
  ] });
}
function Cy(f, b, p) {
  return b ? av : f ? lv : p ? tv : ev;
}
function Hy(f) {
  switch (f) {
    case "ok":
      return nv;
    case "running":
      return uv;
    case "failed":
      return iv;
    default:
      return ms;
  }
}
function qy({
  draft: f,
  onChange: b,
  profiles: p,
  onPlan: o,
  onSubmit: R,
  planning: U,
  submitting: M,
  plan: B,
  planError: D,
  submitError: g
}) {
  const x = F.useCallback(
    (z, H) => b({ ...f, [z]: H }),
    [f, b]
  );
  return /* @__PURE__ */ m.jsxs("section", { className: au, children: [
    /* @__PURE__ */ m.jsx("h2", { className: tn, children: "LTX 2.3 Video Generator" }),
    /* @__PURE__ */ m.jsx("p", { className: gy, children: "Prompt-driven video synthesis · external-segments mode · 16 GB safe defaults" }),
    /* @__PURE__ */ m.jsxs("div", { className: ft, children: [
      /* @__PURE__ */ m.jsx("label", { className: Mt, htmlFor: "ltx-prompt", children: "Prompt" }),
      /* @__PURE__ */ m.jsx(
        "textarea",
        {
          id: "ltx-prompt",
          className: Im,
          value: f.prompt,
          onChange: (z) => x("prompt", z.target.value),
          placeholder: "describe the scene…"
        }
      )
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: ft, children: [
      /* @__PURE__ */ m.jsx("label", { className: Mt, htmlFor: "ltx-neg", children: "Negative prompt (optional)" }),
      /* @__PURE__ */ m.jsx(
        "input",
        {
          id: "ltx-neg",
          className: ye,
          value: f.negative_prompt ?? "",
          onChange: (z) => x(
            "negative_prompt",
            z.target.value.length > 0 ? z.target.value : void 0
          ),
          placeholder: "flicker, watermark, distortion…"
        }
      )
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: ft, children: [
      /* @__PURE__ */ m.jsx("label", { className: Mt, htmlFor: "ltx-character", children: "Character anchor (optional)" }),
      /* @__PURE__ */ m.jsx(
        "input",
        {
          id: "ltx-character",
          className: ye,
          value: f.character_prompt ?? "",
          onChange: (z) => x(
            "character_prompt",
            z.target.value.length > 0 ? z.target.value : void 0
          ),
          placeholder: "a woman in a red coat, short black hair, brown eyes"
        }
      ),
      /* @__PURE__ */ m.jsx("span", { className: Il, children: "Prepended to every scene's prompt; combined with image conditioning to keep characters consistent across cuts." })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: ft, children: [
      /* @__PURE__ */ m.jsx("label", { className: Mt, htmlFor: "ltx-style", children: "Style anchor (optional)" }),
      /* @__PURE__ */ m.jsx(
        "input",
        {
          id: "ltx-style",
          className: ye,
          value: f.style_prompt ?? "",
          onChange: (z) => x(
            "style_prompt",
            z.target.value.length > 0 ? z.target.value : void 0
          ),
          placeholder: "moody noir, deep teal shadows, neon highlights, 35mm film grain"
        }
      ),
      /* @__PURE__ */ m.jsx("span", { className: Il, children: "Appended to every scene's prompt; threads visual style across segment boundaries." })
    ] }),
    /* @__PURE__ */ m.jsx(Qy, { draft: f, update: x }),
    /* @__PURE__ */ m.jsxs("div", { className: Di, children: [
      /* @__PURE__ */ m.jsxs("div", { className: ft, children: [
        /* @__PURE__ */ m.jsx("label", { className: Mt, htmlFor: "ltx-duration", children: "Duration (s)" }),
        /* @__PURE__ */ m.jsx(
          "input",
          {
            id: "ltx-duration",
            className: ye,
            type: "number",
            min: 1,
            max: 300,
            value: f.duration_seconds,
            onChange: (z) => x(
              "duration_seconds",
              Math.max(1, Math.min(300, Number(z.target.value) || 1))
            )
          }
        )
      ] }),
      /* @__PURE__ */ m.jsxs("div", { className: ft, children: [
        /* @__PURE__ */ m.jsx("label", { className: Mt, htmlFor: "ltx-seed", children: "Seed (optional)" }),
        /* @__PURE__ */ m.jsx(
          "input",
          {
            id: "ltx-seed",
            className: ye,
            type: "number",
            value: f.seed ?? "",
            onChange: (z) => {
              const H = z.target.value;
              x("seed", H === "" ? void 0 : Number(H));
            },
            placeholder: "leave blank for random"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Di, children: [
      /* @__PURE__ */ m.jsxs("div", { className: ft, children: [
        /* @__PURE__ */ m.jsx("label", { className: Mt, htmlFor: "ltx-runtime", children: "Runtime" }),
        /* @__PURE__ */ m.jsxs(
          "select",
          {
            id: "ltx-runtime",
            className: Qm,
            value: f.runtime_profile,
            onChange: (z) => x(
              "runtime_profile",
              z.target.value
            ),
            children: [
              /* @__PURE__ */ m.jsx("option", { value: "auto", children: "Auto (recommended)" }),
              /* @__PURE__ */ m.jsx("option", { value: "rtx40-fp8", children: "RTX 40 FP8" }),
              /* @__PURE__ */ m.jsx("option", { value: "rtx50-fp8", children: "RTX 50 FP8 (Blackwell)" }),
              /* @__PURE__ */ m.jsx("option", { value: "rtx50-nvfp4", children: "RTX 50 NVFP4 (experimental)" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ m.jsxs("div", { className: ft, children: [
        /* @__PURE__ */ m.jsx("label", { className: Mt, htmlFor: "ltx-quality", children: "Quality" }),
        /* @__PURE__ */ m.jsxs(
          "select",
          {
            id: "ltx-quality",
            className: Qm,
            value: f.quality_preset,
            onChange: (z) => x("quality_preset", z.target.value),
            children: [
              /* @__PURE__ */ m.jsx("option", { value: "draft", children: "Draft (fastest)" }),
              /* @__PURE__ */ m.jsx("option", { value: "balanced_16gb", children: "Balanced 16 GB" }),
              /* @__PURE__ */ m.jsx("option", { value: "quality_16gb", children: "Quality 16 GB" }),
              /* @__PURE__ */ m.jsx("option", { value: "high", children: "High (24 GB+)" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ m.jsx(Xy, { profiles: p, selected: f.runtime_profile }),
    /* @__PURE__ */ m.jsx(By, { selected: f.runtime_profile }),
    /* @__PURE__ */ m.jsx(Vy, { draft: f, update: x }),
    /* @__PURE__ */ m.jsxs("div", { className: nn, children: [
      /* @__PURE__ */ m.jsx(
        "button",
        {
          type: "button",
          className: Ss,
          onClick: o,
          disabled: U || M || f.prompt.trim().length === 0,
          children: U ? "Planning…" : "Preview plan"
        }
      ),
      /* @__PURE__ */ m.jsx(
        "button",
        {
          type: "button",
          className: gs,
          onClick: R,
          disabled: M || f.prompt.trim().length === 0,
          children: M ? "Submitting…" : "Generate video"
        }
      )
    ] }),
    D ? /* @__PURE__ */ m.jsx("div", { className: an, children: D }) : null,
    g ? /* @__PURE__ */ m.jsx("div", { className: an, children: g }) : null,
    B ? /* @__PURE__ */ m.jsx(Ly, { plan: B }) : null
  ] });
}
function By({
  selected: f
}) {
  const b = Gy(f), [p, o] = F.useState(!1), [R, U] = F.useState(null), { data: M, mutate: B } = Oi(
    b ? `profile-install:${b}` : null,
    () => b ? Xm.status(b) : Promise.resolve(null),
    {
      refreshInterval: (H) => H && H.in_flight ? 2e3 : 0
    }
  ), D = F.useCallback(async () => {
    if (b) {
      o(!0), U(null);
      try {
        await Xm.start(b), B();
      } catch (H) {
        U(H instanceof Error ? H.message : String(H));
      } finally {
        o(!1);
      }
    }
  }, [b, B]);
  if (!b || !M) return null;
  if (M.installed)
    return /* @__PURE__ */ m.jsxs("div", { className: en, children: [
      /* @__PURE__ */ m.jsx("strong", { children: "Runtime installed" }),
      " · ",
      M.repo
    ] });
  const g = M.in_flight || p, x = cv(M.phase), z = g ? x ?? "Installing…" : "Install runtime & download weights";
  return /* @__PURE__ */ m.jsxs("div", { className: en, children: [
    /* @__PURE__ */ m.jsx("strong", { children: "Runtime not installed" }),
    ": ",
    M.repo ?? "unknown repo",
    /* @__PURE__ */ m.jsxs("div", { className: Il, style: { marginTop: 4 }, children: [
      "Resolves the diffusers extras (torch · diffusers · accelerate) via",
      " ",
      /* @__PURE__ */ m.jsx("code", { children: "uv sync --extra diffusers" }),
      ", then downloads weights from Hugging Face into ",
      M.dest ?? "<host_data_dir>/models/…",
      "."
    ] }),
    M.last_error ? /* @__PURE__ */ m.jsxs("div", { className: Il, style: { marginTop: 4, color: "#e57373" }, children: [
      "Last error: ",
      M.last_error
    ] }) : null,
    R ? /* @__PURE__ */ m.jsx("div", { className: Il, style: { marginTop: 4, color: "#e57373" }, children: R }) : null,
    /* @__PURE__ */ m.jsx("div", { className: nn, style: { marginTop: 8 }, children: /* @__PURE__ */ m.jsx(
      "button",
      {
        type: "button",
        className: gs,
        disabled: g,
        onClick: () => void D(),
        children: z
      }
    ) }),
    /* @__PURE__ */ m.jsx(
      Yy,
      {
        phase: M.phase,
        recentProgress: M.recent_progress
      }
    )
  ] });
}
function cv(f) {
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
  recentProgress: b
}) {
  if (!f && b.length === 0) return null;
  const p = cv(f);
  return /* @__PURE__ */ m.jsxs("details", { className: bs, children: [
    /* @__PURE__ */ m.jsxs("summary", { className: ps, children: [
      "Install progress",
      p ? /* @__PURE__ */ m.jsxs("span", { className: Il, children: [
        " · ",
        p
      ] }) : null,
      b.length > 0 ? /* @__PURE__ */ m.jsxs("span", { className: Il, children: [
        " · ",
        b.length,
        " lines"
      ] }) : null
    ] }),
    b.length === 0 ? /* @__PURE__ */ m.jsx("p", { className: Il, style: { marginTop: 6 }, children: "No output captured yet." }) : /* @__PURE__ */ m.jsx("pre", { className: My, children: b.join(`
`) })
  ] });
}
function Gy(f) {
  return f === "auto" ? null : f;
}
function Xy({
  profiles: f,
  selected: b
}) {
  if (f.length === 0) return null;
  const p = b === "auto" ? "nexus.video.ltx23.fake" : `nexus.video.ltx23.${b}`, o = f.find((U) => U.runtime_id === p);
  if (!o) return null;
  const R = o.healthy ? "ok" : "warn";
  return /* @__PURE__ */ m.jsxs("div", { className: en, children: [
    /* @__PURE__ */ m.jsx("strong", { children: o.display_name }),
    ": ",
    o.status_message,
    o.experimental ? " (experimental)" : null
  ] });
}
function Qy({
  draft: f,
  update: b
}) {
  const p = f.scenes ?? [], o = F.useCallback(
    (D) => {
      b("scenes", D.length > 0 ? D : void 0);
    },
    [b]
  ), R = F.useCallback(() => {
    const D = p.length > 0 ? f.duration_seconds / (p.length + 1) : f.duration_seconds;
    o([
      ...p,
      { prompt: "", duration_seconds: Math.max(1, Math.round(D)) }
    ]);
  }, [p, o, f.duration_seconds]), U = F.useCallback(
    (D, g) => {
      const x = p.map((z, H) => {
        if (H !== D) return z;
        const Z = { ...z };
        return g.prompt !== void 0 && (Z.prompt = g.prompt ?? ""), g.duration_seconds !== void 0 && (g.duration_seconds === null ? delete Z.duration_seconds : Z.duration_seconds = g.duration_seconds), g.seed !== void 0 && (g.seed === null ? delete Z.seed : Z.seed = g.seed), Z;
      });
      o(x);
    },
    [p, o]
  ), M = F.useCallback(
    (D) => {
      o(p.filter((g, x) => x !== D));
    },
    [p, o]
  ), B = p.reduce(
    (D, g) => D + (g.duration_seconds ?? 0),
    0
  );
  return /* @__PURE__ */ m.jsxs("details", { className: bs, children: [
    /* @__PURE__ */ m.jsxs("summary", { className: ps, children: [
      "Scenes — ",
      p.length === 0 ? "none (single prompt)" : `${p.length} scenes`,
      B > 0 ? /* @__PURE__ */ m.jsxs("span", { className: Il, children: [
        " · ",
        B.toFixed(1),
        "s / ",
        f.duration_seconds,
        "s"
      ] }) : null
    ] }),
    /* @__PURE__ */ m.jsx("p", { className: Il, style: { marginTop: 8 }, children: "Split the video into named scenes. Each scene's midpoint determines which prompt the corresponding segments use; scenes run consecutively in order. Leave empty to use the global prompt for the whole video." }),
    p.map((D, g) => /* @__PURE__ */ m.jsxs(
      "div",
      {
        className: au,
        style: { background: "rgba(0,0,0,0.18)", marginTop: 10, padding: 12 },
        children: [
          /* @__PURE__ */ m.jsxs("div", { className: ft, children: [
            /* @__PURE__ */ m.jsxs("label", { className: Mt, htmlFor: `ltx-scene-${g}-prompt`, children: [
              "Scene ",
              g + 1,
              " prompt"
            ] }),
            /* @__PURE__ */ m.jsx(
              "textarea",
              {
                id: `ltx-scene-${g}-prompt`,
                className: Im,
                value: D.prompt,
                onChange: (x) => U(g, { prompt: x.target.value }),
                placeholder: "what happens in this scene…",
                rows: 2
              }
            )
          ] }),
          /* @__PURE__ */ m.jsxs("div", { className: Di, children: [
            /* @__PURE__ */ m.jsxs("div", { className: ft, children: [
              /* @__PURE__ */ m.jsx(
                "label",
                {
                  className: Mt,
                  htmlFor: `ltx-scene-${g}-duration`,
                  children: "Duration (s)"
                }
              ),
              /* @__PURE__ */ m.jsx(
                "input",
                {
                  id: `ltx-scene-${g}-duration`,
                  className: ye,
                  type: "number",
                  min: 1,
                  step: 0.5,
                  value: D.duration_seconds ?? "",
                  onChange: (x) => {
                    const z = x.target.value;
                    U(g, {
                      duration_seconds: z === "" ? null : Number(z)
                    });
                  },
                  placeholder: "auto"
                }
              )
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: ft, children: [
              /* @__PURE__ */ m.jsx(
                "label",
                {
                  className: Mt,
                  htmlFor: `ltx-scene-${g}-seed`,
                  children: "Scene seed (optional)"
                }
              ),
              /* @__PURE__ */ m.jsx(
                "input",
                {
                  id: `ltx-scene-${g}-seed`,
                  className: ye,
                  type: "number",
                  value: D.seed ?? "",
                  onChange: (x) => {
                    const z = x.target.value;
                    U(g, {
                      seed: z === "" ? null : Number(z)
                    });
                  },
                  placeholder: "derived"
                }
              )
            ] }),
            /* @__PURE__ */ m.jsx("div", { className: ft, style: { alignSelf: "flex-end" }, children: /* @__PURE__ */ m.jsx(
              "button",
              {
                type: "button",
                className: Pm,
                onClick: () => M(g),
                children: "Remove"
              }
            ) })
          ] })
        ]
      },
      g
    )),
    /* @__PURE__ */ m.jsx("div", { className: nn, style: { marginTop: 10 }, children: /* @__PURE__ */ m.jsx(
      "button",
      {
        type: "button",
        className: Ss,
        onClick: R,
        children: "+ Add scene"
      }
    ) })
  ] });
}
function Vy({
  draft: f,
  update: b
}) {
  const p = f.advanced ?? {}, o = F.useCallback(
    (R, U) => {
      const M = { ...p };
      U == null ? delete M[R] : M[R] = U, b("advanced", Object.keys(M).length > 0 ? M : void 0);
    },
    [p, b]
  );
  return /* @__PURE__ */ m.jsxs("details", { className: bs, children: [
    /* @__PURE__ */ m.jsxs("summary", { className: ps, children: [
      "Advanced — guidance & steps",
      p.guidance_scale !== void 0 ? /* @__PURE__ */ m.jsxs("span", { className: Il, children: [
        " · cfg ",
        p.guidance_scale
      ] }) : null,
      p.num_inference_steps !== void 0 ? /* @__PURE__ */ m.jsxs("span", { className: Il, children: [
        " · ",
        p.num_inference_steps,
        " steps"
      ] }) : null
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Di, style: { marginTop: 10 }, children: [
      /* @__PURE__ */ m.jsxs("div", { className: ft, children: [
        /* @__PURE__ */ m.jsx("label", { className: Mt, htmlFor: "ltx-cfg", children: "Guidance scale (temperature)" }),
        /* @__PURE__ */ m.jsx(
          "input",
          {
            id: "ltx-cfg",
            className: ye,
            type: "number",
            min: 1,
            max: 15,
            step: 0.5,
            value: p.guidance_scale ?? "",
            onChange: (R) => {
              const U = R.target.value;
              o(
                "guidance_scale",
                U === "" ? void 0 : Number(U)
              );
            },
            placeholder: "4.0 (default)"
          }
        ),
        /* @__PURE__ */ m.jsx("span", { className: Il, children: "1–7. Higher = stricter prompt adherence; lower = more creative drift. Distilled LTX 2.3 default is 4.0." })
      ] }),
      /* @__PURE__ */ m.jsxs("div", { className: ft, children: [
        /* @__PURE__ */ m.jsx("label", { className: Mt, htmlFor: "ltx-steps", children: "Inference steps" }),
        /* @__PURE__ */ m.jsx(
          "input",
          {
            id: "ltx-steps",
            className: ye,
            type: "number",
            min: 2,
            max: 50,
            step: 1,
            value: p.num_inference_steps ?? "",
            onChange: (R) => {
              const U = R.target.value;
              o(
                "num_inference_steps",
                U === "" ? void 0 : Math.round(Number(U))
              );
            },
            placeholder: "8 (default)"
          }
        ),
        /* @__PURE__ */ m.jsx("span", { className: Il, children: "Distilled model is tuned for 8. Higher steps improve detail with ~linear wall-clock cost." })
      ] })
    ] })
  ] });
}
function Ly({ plan: f }) {
  const b = f.vram_risk === "safe" ? lv : f.vram_risk === "moderate" ? tv : f.vram_risk === "risky" ? ev : av;
  return /* @__PURE__ */ m.jsxs("div", { className: au, style: { background: "transparent", padding: 0 }, children: [
    /* @__PURE__ */ m.jsx("h3", { className: tn, style: { fontSize: "15px" }, children: "Render plan" }),
    /* @__PURE__ */ m.jsxs("div", { className: Ke, children: [
      /* @__PURE__ */ m.jsx("span", { className: Je, children: "Mode" }),
      /* @__PURE__ */ m.jsx("span", { className: ya, children: f.mode })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Ke, children: [
      /* @__PURE__ */ m.jsx("span", { className: Je, children: "Segments" }),
      /* @__PURE__ */ m.jsx("span", { className: ya, children: f.segment_count })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Ke, children: [
      /* @__PURE__ */ m.jsx("span", { className: Je, children: "Resolution" }),
      /* @__PURE__ */ m.jsxs("span", { className: ya, children: [
        f.width,
        "×",
        f.height
      ] })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Ke, children: [
      /* @__PURE__ */ m.jsx("span", { className: Je, children: "FPS" }),
      /* @__PURE__ */ m.jsxs("span", { className: ya, children: [
        f.base_fps,
        " → ",
        f.output_fps,
        " (",
        f.interpolation,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Ke, children: [
      /* @__PURE__ */ m.jsx("span", { className: Je, children: "Duration" }),
      /* @__PURE__ */ m.jsxs("span", { className: ya, children: [
        f.requested_duration_seconds.toFixed(1),
        "s"
      ] })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Ke, children: [
      /* @__PURE__ */ m.jsx("span", { className: Je, children: "VRAM budget" }),
      /* @__PURE__ */ m.jsxs("span", { className: ya, children: [
        f.gpu_memory_budget_mb,
        " MB"
      ] })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Ke, children: [
      /* @__PURE__ */ m.jsx("span", { className: Je, children: "VRAM risk" }),
      /* @__PURE__ */ m.jsx("span", { className: b, children: f.vram_risk })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Ke, children: [
      /* @__PURE__ */ m.jsx("span", { className: Je, children: "Runtime" }),
      /* @__PURE__ */ m.jsx("span", { className: ya, children: f.runtime_profile })
    ] }),
    f.warnings.length > 0 ? /* @__PURE__ */ m.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: f.warnings.map((p) => /* @__PURE__ */ m.jsxs("div", { className: en, children: [
      /* @__PURE__ */ m.jsx("strong", { children: p.code }),
      ": ",
      p.message
    ] }, p.code)) }) : null
  ] });
}
function Zy({
  run: f,
  onCancel: b
}) {
  if (!f)
    return /* @__PURE__ */ m.jsxs("section", { className: au, children: [
      /* @__PURE__ */ m.jsx("h2", { className: tn, children: "Output" }),
      /* @__PURE__ */ m.jsx("p", { className: Ay, children: "No render in progress yet. Configure the form on the left and press “Generate video”." })
    ] });
  const p = f.status === "completed" || f.status === "failed" || f.status === "cancelled";
  return /* @__PURE__ */ m.jsxs("section", { className: au, children: [
    /* @__PURE__ */ m.jsxs("h2", { className: tn, children: [
      "Render ",
      Wy(f.id)
    ] }),
    /* @__PURE__ */ m.jsxs("p", { className: Il, children: [
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
    /* @__PURE__ */ m.jsx(Ky, { run: f }),
    f.error_code ? /* @__PURE__ */ m.jsxs("div", { className: an, children: [
      /* @__PURE__ */ m.jsx("strong", { children: f.error_code }),
      ":",
      " ",
      f.error_message ?? "unknown error"
    ] }) : null,
    /* @__PURE__ */ m.jsx(Jy, { segments: f.segments }),
    f.status === "completed" && f.final_artifact_id ? /* @__PURE__ */ m.jsx($y, { artifactId: f.final_artifact_id }) : null,
    p ? null : /* @__PURE__ */ m.jsx("div", { className: nn, children: /* @__PURE__ */ m.jsx(
      "button",
      {
        type: "button",
        className: Pm,
        onClick: b,
        children: "Cancel"
      }
    ) })
  ] });
}
function Ky({ run: f }) {
  return /* @__PURE__ */ m.jsxs("div", { className: ft, children: [
    /* @__PURE__ */ m.jsxs(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13
        },
        children: [
          /* @__PURE__ */ m.jsx("span", { children: /* @__PURE__ */ m.jsx("strong", { children: f.status }) }),
          /* @__PURE__ */ m.jsxs("span", { children: [
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
    /* @__PURE__ */ m.jsx("div", { className: py, children: /* @__PURE__ */ m.jsx(
      "div",
      {
        className: _y,
        style: { width: `${Math.max(2, f.progress_percent)}%` }
      }
    ) })
  ] });
}
function Jy({
  segments: f
}) {
  return /* @__PURE__ */ m.jsx("div", { className: Sy, children: f.map((b) => /* @__PURE__ */ m.jsxs("div", { className: by, children: [
    /* @__PURE__ */ m.jsx("span", { className: wy(b.status) }),
    /* @__PURE__ */ m.jsxs("span", { children: [
      "Segment ",
      b.index + 1,
      " · ",
      b.duration_seconds.toFixed(1),
      "s"
    ] }),
    /* @__PURE__ */ m.jsx("span", { className: Il, children: b.status })
  ] }, b.index)) });
}
function wy(f) {
  switch (f) {
    case "queued":
      return ms;
    case "rendering":
      return uv;
    case "completed":
      return nv;
    case "failed":
      return iv;
    default:
      return ms;
  }
}
function $y({ artifactId: f }) {
  const b = vy(f);
  return /* @__PURE__ */ m.jsxs("div", { className: Ey, children: [
    /* @__PURE__ */ m.jsx("video", { className: Ty, src: b, controls: !0, preload: "metadata" }),
    /* @__PURE__ */ m.jsx(
      "a",
      {
        className: zy,
        href: b,
        download: `${f}.mp4`,
        children: "Download MP4"
      }
    ),
    /* @__PURE__ */ m.jsxs("p", { className: Il, children: [
      "artifact: ",
      f
    ] })
  ] });
}
function Wy(f) {
  return f.length > 12 ? `${f.slice(0, 6)}…${f.slice(-4)}` : f;
}
const xi = "ltx23-video-app", Vm = "ltx23-video-stylesheet";
function Fy() {
  if (typeof document > "u" || document.getElementById(Vm)) return;
  const f = new URL("./ltx23-video.css", import.meta.url).href, b = document.createElement("link");
  b.id = Vm, b.rel = "stylesheet", b.href = f, document.head.appendChild(b);
}
Fy();
class fv extends HTMLElement {
  root = null;
  connectedCallback() {
    this.root = H0.createRoot(this), this.paint();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null;
  }
  paint() {
    this.root && this.root.render(
      /* @__PURE__ */ m.jsx(F.StrictMode, { children: /* @__PURE__ */ m.jsx(Ry, {}) })
    );
  }
}
customElements.get(xi) || customElements.define(xi, fv);
function ky() {
  customElements.get(xi) || customElements.define(xi, fv);
}
export {
  ky as register
};
//# sourceMappingURL=ltx23-video.js.map
