function FE(t, a) {
  for (var s = 0; s < a.length; s++) {
    const i = a[s];
    if (typeof i != "string" && !Array.isArray(i)) {
      for (const o in i)
        if (o !== "default" && !(o in t)) {
          const u = Object.getOwnPropertyDescriptor(i, o);
          u && Object.defineProperty(t, o, u.get ? u : {
            enumerable: !0,
            get: () => i[o]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
function Yx(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var cf = { exports: {} }, Qi = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dy;
function PE() {
  if (dy) return Qi;
  dy = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function s(i, o, u) {
    var f = null;
    if (u !== void 0 && (f = "" + u), o.key !== void 0 && (f = "" + o.key), "key" in o) {
      u = {};
      for (var m in o)
        m !== "key" && (u[m] = o[m]);
    } else u = o;
    return o = u.ref, {
      $$typeof: t,
      type: i,
      key: f,
      ref: o !== void 0 ? o : null,
      props: u
    };
  }
  return Qi.Fragment = a, Qi.jsx = s, Qi.jsxs = s, Qi;
}
var fy;
function GE() {
  return fy || (fy = 1, cf.exports = PE()), cf.exports;
}
var c = GE(), uf = { exports: {} }, Ye = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hy;
function YE() {
  if (hy) return Ye;
  hy = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), f = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), S = Symbol.iterator;
  function w(k) {
    return k === null || typeof k != "object" ? null : (k = S && k[S] || k["@@iterator"], typeof k == "function" ? k : null);
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
  }, C = Object.assign, _ = {};
  function T(k, ne, ae) {
    this.props = k, this.context = ne, this.refs = _, this.updater = ae || j;
  }
  T.prototype.isReactComponent = {}, T.prototype.setState = function(k, ne) {
    if (typeof k != "object" && typeof k != "function" && k != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, k, ne, "setState");
  }, T.prototype.forceUpdate = function(k) {
    this.updater.enqueueForceUpdate(this, k, "forceUpdate");
  };
  function O() {
  }
  O.prototype = T.prototype;
  function R(k, ne, ae) {
    this.props = k, this.context = ne, this.refs = _, this.updater = ae || j;
  }
  var N = R.prototype = new O();
  N.constructor = R, C(N, T.prototype), N.isPureReactComponent = !0;
  var B = Array.isArray;
  function G() {
  }
  var te = { H: null, A: null, T: null, S: null }, M = Object.prototype.hasOwnProperty;
  function q(k, ne, ae) {
    var K = ae.ref;
    return {
      $$typeof: t,
      type: k,
      key: ne,
      ref: K !== void 0 ? K : null,
      props: ae
    };
  }
  function D(k, ne) {
    return q(k.type, ne, k.props);
  }
  function F(k) {
    return typeof k == "object" && k !== null && k.$$typeof === t;
  }
  function Z(k) {
    var ne = { "=": "=0", ":": "=2" };
    return "$" + k.replace(/[=:]/g, function(ae) {
      return ne[ae];
    });
  }
  var J = /\/+/g;
  function P(k, ne) {
    return typeof k == "object" && k !== null && k.key != null ? Z("" + k.key) : ne.toString(36);
  }
  function ie(k) {
    switch (k.status) {
      case "fulfilled":
        return k.value;
      case "rejected":
        throw k.reason;
      default:
        switch (typeof k.status == "string" ? k.then(G, G) : (k.status = "pending", k.then(
          function(ne) {
            k.status === "pending" && (k.status = "fulfilled", k.value = ne);
          },
          function(ne) {
            k.status === "pending" && (k.status = "rejected", k.reason = ne);
          }
        )), k.status) {
          case "fulfilled":
            return k.value;
          case "rejected":
            throw k.reason;
        }
    }
    throw k;
  }
  function A(k, ne, ae, K, U) {
    var W = typeof k;
    (W === "undefined" || W === "boolean") && (k = null);
    var ue = !1;
    if (k === null) ue = !0;
    else
      switch (W) {
        case "bigint":
        case "string":
        case "number":
          ue = !0;
          break;
        case "object":
          switch (k.$$typeof) {
            case t:
            case a:
              ue = !0;
              break;
            case b:
              return ue = k._init, A(
                ue(k._payload),
                ne,
                ae,
                K,
                U
              );
          }
      }
    if (ue)
      return U = U(k), ue = K === "" ? "." + P(k, 0) : K, B(U) ? (ae = "", ue != null && (ae = ue.replace(J, "$&/") + "/"), A(U, ne, ae, "", function(lt) {
        return lt;
      })) : U != null && (F(U) && (U = D(
        U,
        ae + (U.key == null || k && k.key === U.key ? "" : ("" + U.key).replace(
          J,
          "$&/"
        ) + "/") + ue
      )), ne.push(U)), 1;
    ue = 0;
    var be = K === "" ? "." : K + ":";
    if (B(k))
      for (var Ae = 0; Ae < k.length; Ae++)
        K = k[Ae], W = be + P(K, Ae), ue += A(
          K,
          ne,
          ae,
          W,
          U
        );
    else if (Ae = w(k), typeof Ae == "function")
      for (k = Ae.call(k), Ae = 0; !(K = k.next()).done; )
        K = K.value, W = be + P(K, Ae++), ue += A(
          K,
          ne,
          ae,
          W,
          U
        );
    else if (W === "object") {
      if (typeof k.then == "function")
        return A(
          ie(k),
          ne,
          ae,
          K,
          U
        );
      throw ne = String(k), Error(
        "Objects are not valid as a React child (found: " + (ne === "[object Object]" ? "object with keys {" + Object.keys(k).join(", ") + "}" : ne) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ue;
  }
  function V(k, ne, ae) {
    if (k == null) return k;
    var K = [], U = 0;
    return A(k, K, "", "", function(W) {
      return ne.call(ae, W, U++);
    }), K;
  }
  function $(k) {
    if (k._status === -1) {
      var ne = k._result;
      ne = ne(), ne.then(
        function(ae) {
          (k._status === 0 || k._status === -1) && (k._status = 1, k._result = ae);
        },
        function(ae) {
          (k._status === 0 || k._status === -1) && (k._status = 2, k._result = ae);
        }
      ), k._status === -1 && (k._status = 0, k._result = ne);
    }
    if (k._status === 1) return k._result.default;
    throw k._result;
  }
  var se = typeof reportError == "function" ? reportError : function(k) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var ne = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof k == "object" && k !== null && typeof k.message == "string" ? String(k.message) : String(k),
        error: k
      });
      if (!window.dispatchEvent(ne)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", k);
      return;
    }
    console.error(k);
  }, fe = {
    map: V,
    forEach: function(k, ne, ae) {
      V(
        k,
        function() {
          ne.apply(this, arguments);
        },
        ae
      );
    },
    count: function(k) {
      var ne = 0;
      return V(k, function() {
        ne++;
      }), ne;
    },
    toArray: function(k) {
      return V(k, function(ne) {
        return ne;
      }) || [];
    },
    only: function(k) {
      if (!F(k))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return k;
    }
  };
  return Ye.Activity = v, Ye.Children = fe, Ye.Component = T, Ye.Fragment = s, Ye.Profiler = o, Ye.PureComponent = R, Ye.StrictMode = i, Ye.Suspense = y, Ye.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = te, Ye.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(k) {
      return te.H.useMemoCache(k);
    }
  }, Ye.cache = function(k) {
    return function() {
      return k.apply(null, arguments);
    };
  }, Ye.cacheSignal = function() {
    return null;
  }, Ye.cloneElement = function(k, ne, ae) {
    if (k == null)
      throw Error(
        "The argument must be a React element, but you passed " + k + "."
      );
    var K = C({}, k.props), U = k.key;
    if (ne != null)
      for (W in ne.key !== void 0 && (U = "" + ne.key), ne)
        !M.call(ne, W) || W === "key" || W === "__self" || W === "__source" || W === "ref" && ne.ref === void 0 || (K[W] = ne[W]);
    var W = arguments.length - 2;
    if (W === 1) K.children = ae;
    else if (1 < W) {
      for (var ue = Array(W), be = 0; be < W; be++)
        ue[be] = arguments[be + 2];
      K.children = ue;
    }
    return q(k.type, U, K);
  }, Ye.createContext = function(k) {
    return k = {
      $$typeof: f,
      _currentValue: k,
      _currentValue2: k,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, k.Provider = k, k.Consumer = {
      $$typeof: u,
      _context: k
    }, k;
  }, Ye.createElement = function(k, ne, ae) {
    var K, U = {}, W = null;
    if (ne != null)
      for (K in ne.key !== void 0 && (W = "" + ne.key), ne)
        M.call(ne, K) && K !== "key" && K !== "__self" && K !== "__source" && (U[K] = ne[K]);
    var ue = arguments.length - 2;
    if (ue === 1) U.children = ae;
    else if (1 < ue) {
      for (var be = Array(ue), Ae = 0; Ae < ue; Ae++)
        be[Ae] = arguments[Ae + 2];
      U.children = be;
    }
    if (k && k.defaultProps)
      for (K in ue = k.defaultProps, ue)
        U[K] === void 0 && (U[K] = ue[K]);
    return q(k, W, U);
  }, Ye.createRef = function() {
    return { current: null };
  }, Ye.forwardRef = function(k) {
    return { $$typeof: m, render: k };
  }, Ye.isValidElement = F, Ye.lazy = function(k) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: k },
      _init: $
    };
  }, Ye.memo = function(k, ne) {
    return {
      $$typeof: p,
      type: k,
      compare: ne === void 0 ? null : ne
    };
  }, Ye.startTransition = function(k) {
    var ne = te.T, ae = {};
    te.T = ae;
    try {
      var K = k(), U = te.S;
      U !== null && U(ae, K), typeof K == "object" && K !== null && typeof K.then == "function" && K.then(G, se);
    } catch (W) {
      se(W);
    } finally {
      ne !== null && ae.types !== null && (ne.types = ae.types), te.T = ne;
    }
  }, Ye.unstable_useCacheRefresh = function() {
    return te.H.useCacheRefresh();
  }, Ye.use = function(k) {
    return te.H.use(k);
  }, Ye.useActionState = function(k, ne, ae) {
    return te.H.useActionState(k, ne, ae);
  }, Ye.useCallback = function(k, ne) {
    return te.H.useCallback(k, ne);
  }, Ye.useContext = function(k) {
    return te.H.useContext(k);
  }, Ye.useDebugValue = function() {
  }, Ye.useDeferredValue = function(k, ne) {
    return te.H.useDeferredValue(k, ne);
  }, Ye.useEffect = function(k, ne) {
    return te.H.useEffect(k, ne);
  }, Ye.useEffectEvent = function(k) {
    return te.H.useEffectEvent(k);
  }, Ye.useId = function() {
    return te.H.useId();
  }, Ye.useImperativeHandle = function(k, ne, ae) {
    return te.H.useImperativeHandle(k, ne, ae);
  }, Ye.useInsertionEffect = function(k, ne) {
    return te.H.useInsertionEffect(k, ne);
  }, Ye.useLayoutEffect = function(k, ne) {
    return te.H.useLayoutEffect(k, ne);
  }, Ye.useMemo = function(k, ne) {
    return te.H.useMemo(k, ne);
  }, Ye.useOptimistic = function(k, ne) {
    return te.H.useOptimistic(k, ne);
  }, Ye.useReducer = function(k, ne, ae) {
    return te.H.useReducer(k, ne, ae);
  }, Ye.useRef = function(k) {
    return te.H.useRef(k);
  }, Ye.useState = function(k) {
    return te.H.useState(k);
  }, Ye.useSyncExternalStore = function(k, ne, ae) {
    return te.H.useSyncExternalStore(
      k,
      ne,
      ae
    );
  }, Ye.useTransition = function() {
    return te.H.useTransition();
  }, Ye.version = "19.2.5", Ye;
}
var my;
function Lh() {
  return my || (my = 1, uf.exports = YE()), uf.exports;
}
var g = Lh();
const we = /* @__PURE__ */ Yx(g), KE = /* @__PURE__ */ FE({
  __proto__: null,
  default: we
}, [g]);
var df = { exports: {} }, Zi = {}, ff = { exports: {} }, hf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var py;
function XE() {
  return py || (py = 1, (function(t) {
    function a(A, V) {
      var $ = A.length;
      A.push(V);
      e: for (; 0 < $; ) {
        var se = $ - 1 >>> 1, fe = A[se];
        if (0 < o(fe, V))
          A[se] = V, A[$] = fe, $ = se;
        else break e;
      }
    }
    function s(A) {
      return A.length === 0 ? null : A[0];
    }
    function i(A) {
      if (A.length === 0) return null;
      var V = A[0], $ = A.pop();
      if ($ !== V) {
        A[0] = $;
        e: for (var se = 0, fe = A.length, k = fe >>> 1; se < k; ) {
          var ne = 2 * (se + 1) - 1, ae = A[ne], K = ne + 1, U = A[K];
          if (0 > o(ae, $))
            K < fe && 0 > o(U, ae) ? (A[se] = U, A[K] = $, se = K) : (A[se] = ae, A[ne] = $, se = ne);
          else if (K < fe && 0 > o(U, $))
            A[se] = U, A[K] = $, se = K;
          else break e;
        }
      }
      return V;
    }
    function o(A, V) {
      var $ = A.sortIndex - V.sortIndex;
      return $ !== 0 ? $ : A.id - V.id;
    }
    if (t.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var u = performance;
      t.unstable_now = function() {
        return u.now();
      };
    } else {
      var f = Date, m = f.now();
      t.unstable_now = function() {
        return f.now() - m;
      };
    }
    var y = [], p = [], b = 1, v = null, S = 3, w = !1, j = !1, C = !1, _ = !1, T = typeof setTimeout == "function" ? setTimeout : null, O = typeof clearTimeout == "function" ? clearTimeout : null, R = typeof setImmediate < "u" ? setImmediate : null;
    function N(A) {
      for (var V = s(p); V !== null; ) {
        if (V.callback === null) i(p);
        else if (V.startTime <= A)
          i(p), V.sortIndex = V.expirationTime, a(y, V);
        else break;
        V = s(p);
      }
    }
    function B(A) {
      if (C = !1, N(A), !j)
        if (s(y) !== null)
          j = !0, G || (G = !0, Z());
        else {
          var V = s(p);
          V !== null && ie(B, V.startTime - A);
        }
    }
    var G = !1, te = -1, M = 5, q = -1;
    function D() {
      return _ ? !0 : !(t.unstable_now() - q < M);
    }
    function F() {
      if (_ = !1, G) {
        var A = t.unstable_now();
        q = A;
        var V = !0;
        try {
          e: {
            j = !1, C && (C = !1, O(te), te = -1), w = !0;
            var $ = S;
            try {
              t: {
                for (N(A), v = s(y); v !== null && !(v.expirationTime > A && D()); ) {
                  var se = v.callback;
                  if (typeof se == "function") {
                    v.callback = null, S = v.priorityLevel;
                    var fe = se(
                      v.expirationTime <= A
                    );
                    if (A = t.unstable_now(), typeof fe == "function") {
                      v.callback = fe, N(A), V = !0;
                      break t;
                    }
                    v === s(y) && i(y), N(A);
                  } else i(y);
                  v = s(y);
                }
                if (v !== null) V = !0;
                else {
                  var k = s(p);
                  k !== null && ie(
                    B,
                    k.startTime - A
                  ), V = !1;
                }
              }
              break e;
            } finally {
              v = null, S = $, w = !1;
            }
            V = void 0;
          }
        } finally {
          V ? Z() : G = !1;
        }
      }
    }
    var Z;
    if (typeof R == "function")
      Z = function() {
        R(F);
      };
    else if (typeof MessageChannel < "u") {
      var J = new MessageChannel(), P = J.port2;
      J.port1.onmessage = F, Z = function() {
        P.postMessage(null);
      };
    } else
      Z = function() {
        T(F, 0);
      };
    function ie(A, V) {
      te = T(function() {
        A(t.unstable_now());
      }, V);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(A) {
      A.callback = null;
    }, t.unstable_forceFrameRate = function(A) {
      0 > A || 125 < A ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : M = 0 < A ? Math.floor(1e3 / A) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, t.unstable_next = function(A) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var V = 3;
          break;
        default:
          V = S;
      }
      var $ = S;
      S = V;
      try {
        return A();
      } finally {
        S = $;
      }
    }, t.unstable_requestPaint = function() {
      _ = !0;
    }, t.unstable_runWithPriority = function(A, V) {
      switch (A) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          A = 3;
      }
      var $ = S;
      S = A;
      try {
        return V();
      } finally {
        S = $;
      }
    }, t.unstable_scheduleCallback = function(A, V, $) {
      var se = t.unstable_now();
      switch (typeof $ == "object" && $ !== null ? ($ = $.delay, $ = typeof $ == "number" && 0 < $ ? se + $ : se) : $ = se, A) {
        case 1:
          var fe = -1;
          break;
        case 2:
          fe = 250;
          break;
        case 5:
          fe = 1073741823;
          break;
        case 4:
          fe = 1e4;
          break;
        default:
          fe = 5e3;
      }
      return fe = $ + fe, A = {
        id: b++,
        callback: V,
        priorityLevel: A,
        startTime: $,
        expirationTime: fe,
        sortIndex: -1
      }, $ > se ? (A.sortIndex = $, a(p, A), s(y) === null && A === s(p) && (C ? (O(te), te = -1) : C = !0, ie(B, $ - se))) : (A.sortIndex = fe, a(y, A), j || w || (j = !0, G || (G = !0, Z()))), A;
    }, t.unstable_shouldYield = D, t.unstable_wrapCallback = function(A) {
      var V = S;
      return function() {
        var $ = S;
        S = V;
        try {
          return A.apply(this, arguments);
        } finally {
          S = $;
        }
      };
    };
  })(hf)), hf;
}
var gy;
function QE() {
  return gy || (gy = 1, ff.exports = XE()), ff.exports;
}
var mf = { exports: {} }, vn = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vy;
function ZE() {
  if (vy) return vn;
  vy = 1;
  var t = Lh();
  function a(y) {
    var p = "https://react.dev/errors/" + y;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        p += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + y + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s() {
  }
  var i = {
    d: {
      f: s,
      r: function() {
        throw Error(a(522));
      },
      D: s,
      C: s,
      L: s,
      m: s,
      X: s,
      S: s,
      M: s
    },
    p: 0,
    findDOMNode: null
  }, o = Symbol.for("react.portal");
  function u(y, p, b) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: v == null ? null : "" + v,
      children: y,
      containerInfo: p,
      implementation: b
    };
  }
  var f = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(y, p) {
    if (y === "font") return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return vn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, vn.createPortal = function(y, p) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(a(299));
    return u(y, p, null, b);
  }, vn.flushSync = function(y) {
    var p = f.T, b = i.p;
    try {
      if (f.T = null, i.p = 2, y) return y();
    } finally {
      f.T = p, i.p = b, i.d.f();
    }
  }, vn.preconnect = function(y, p) {
    typeof y == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, i.d.C(y, p));
  }, vn.prefetchDNS = function(y) {
    typeof y == "string" && i.d.D(y);
  }, vn.preinit = function(y, p) {
    if (typeof y == "string" && p && typeof p.as == "string") {
      var b = p.as, v = m(b, p.crossOrigin), S = typeof p.integrity == "string" ? p.integrity : void 0, w = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      b === "style" ? i.d.S(
        y,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: v,
          integrity: S,
          fetchPriority: w
        }
      ) : b === "script" && i.d.X(y, {
        crossOrigin: v,
        integrity: S,
        fetchPriority: w,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, vn.preinitModule = function(y, p) {
    if (typeof y == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var b = m(
            p.as,
            p.crossOrigin
          );
          i.d.M(y, {
            crossOrigin: b,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0
          });
        }
      } else p == null && i.d.M(y);
  }, vn.preload = function(y, p) {
    if (typeof y == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var b = p.as, v = m(b, p.crossOrigin);
      i.d.L(y, b, {
        crossOrigin: v,
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
  }, vn.preloadModule = function(y, p) {
    if (typeof y == "string")
      if (p) {
        var b = m(p.as, p.crossOrigin);
        i.d.m(y, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: b,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else i.d.m(y);
  }, vn.requestFormReset = function(y) {
    i.d.r(y);
  }, vn.unstable_batchedUpdates = function(y, p) {
    return y(p);
  }, vn.useFormState = function(y, p, b) {
    return f.H.useFormState(y, p, b);
  }, vn.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, vn.version = "19.2.5", vn;
}
var yy;
function Kx() {
  if (yy) return mf.exports;
  yy = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), mf.exports = ZE(), mf.exports;
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
var by;
function JE() {
  if (by) return Zi;
  by = 1;
  var t = QE(), a = Lh(), s = Kx();
  function i(e) {
    var n = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var r = 2; r < arguments.length; r++)
        n += "&args[]=" + encodeURIComponent(arguments[r]);
    }
    return "Minified React error #" + e + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function u(e) {
    var n = e, r = e;
    if (e.alternate) for (; n.return; ) n = n.return;
    else {
      e = n;
      do
        n = e, (n.flags & 4098) !== 0 && (r = n.return), e = n.return;
      while (e);
    }
    return n.tag === 3 ? r : null;
  }
  function f(e) {
    if (e.tag === 13) {
      var n = e.memoizedState;
      if (n === null && (e = e.alternate, e !== null && (n = e.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function m(e) {
    if (e.tag === 31) {
      var n = e.memoizedState;
      if (n === null && (e = e.alternate, e !== null && (n = e.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function y(e) {
    if (u(e) !== e)
      throw Error(i(188));
  }
  function p(e) {
    var n = e.alternate;
    if (!n) {
      if (n = u(e), n === null) throw Error(i(188));
      return n !== e ? null : e;
    }
    for (var r = e, l = n; ; ) {
      var d = r.return;
      if (d === null) break;
      var h = d.alternate;
      if (h === null) {
        if (l = d.return, l !== null) {
          r = l;
          continue;
        }
        break;
      }
      if (d.child === h.child) {
        for (h = d.child; h; ) {
          if (h === r) return y(d), e;
          if (h === l) return y(d), n;
          h = h.sibling;
        }
        throw Error(i(188));
      }
      if (r.return !== l.return) r = d, l = h;
      else {
        for (var x = !1, E = d.child; E; ) {
          if (E === r) {
            x = !0, r = d, l = h;
            break;
          }
          if (E === l) {
            x = !0, l = d, r = h;
            break;
          }
          E = E.sibling;
        }
        if (!x) {
          for (E = h.child; E; ) {
            if (E === r) {
              x = !0, r = h, l = d;
              break;
            }
            if (E === l) {
              x = !0, l = h, r = d;
              break;
            }
            E = E.sibling;
          }
          if (!x) throw Error(i(189));
        }
      }
      if (r.alternate !== l) throw Error(i(190));
    }
    if (r.tag !== 3) throw Error(i(188));
    return r.stateNode.current === r ? e : n;
  }
  function b(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e;
    for (e = e.child; e !== null; ) {
      if (n = b(e), n !== null) return n;
      e = e.sibling;
    }
    return null;
  }
  var v = Object.assign, S = Symbol.for("react.element"), w = Symbol.for("react.transitional.element"), j = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), _ = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), O = Symbol.for("react.consumer"), R = Symbol.for("react.context"), N = Symbol.for("react.forward_ref"), B = Symbol.for("react.suspense"), G = Symbol.for("react.suspense_list"), te = Symbol.for("react.memo"), M = Symbol.for("react.lazy"), q = Symbol.for("react.activity"), D = Symbol.for("react.memo_cache_sentinel"), F = Symbol.iterator;
  function Z(e) {
    return e === null || typeof e != "object" ? null : (e = F && e[F] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var J = Symbol.for("react.client.reference");
  function P(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === J ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case C:
        return "Fragment";
      case T:
        return "Profiler";
      case _:
        return "StrictMode";
      case B:
        return "Suspense";
      case G:
        return "SuspenseList";
      case q:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case j:
          return "Portal";
        case R:
          return e.displayName || "Context";
        case O:
          return (e._context.displayName || "Context") + ".Consumer";
        case N:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case te:
          return n = e.displayName || null, n !== null ? n : P(e.type) || "Memo";
        case M:
          n = e._payload, e = e._init;
          try {
            return P(e(n));
          } catch {
          }
      }
    return null;
  }
  var ie = Array.isArray, A = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, V = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, $ = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, se = [], fe = -1;
  function k(e) {
    return { current: e };
  }
  function ne(e) {
    0 > fe || (e.current = se[fe], se[fe] = null, fe--);
  }
  function ae(e, n) {
    fe++, se[fe] = e.current, e.current = n;
  }
  var K = k(null), U = k(null), W = k(null), ue = k(null);
  function be(e, n) {
    switch (ae(W, n), ae(U, e), ae(K, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? zv(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = zv(n), e = Ov(n, e);
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
    ne(K), ae(K, e);
  }
  function Ae() {
    ne(K), ne(U), ne(W);
  }
  function lt(e) {
    e.memoizedState !== null && ae(ue, e);
    var n = K.current, r = Ov(n, e.type);
    n !== r && (ae(U, e), ae(K, r));
  }
  function Ne(e) {
    U.current === e && (ne(K), ne(U)), ue.current === e && (ne(ue), Gi._currentValue = $);
  }
  var We, Be;
  function Fe(e) {
    if (We === void 0)
      try {
        throw Error();
      } catch (r) {
        var n = r.stack.trim().match(/\n( *(at )?)/);
        We = n && n[1] || "", Be = -1 < r.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < r.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + We + e + Be;
  }
  var rn = !1;
  function qt(e, n) {
    if (!e || rn) return "";
    rn = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var pe = function() {
                throw Error();
              };
              if (Object.defineProperty(pe.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(pe, []);
                } catch (oe) {
                  var le = oe;
                }
                Reflect.construct(e, [], pe);
              } else {
                try {
                  pe.call();
                } catch (oe) {
                  le = oe;
                }
                e.call(pe.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (oe) {
                le = oe;
              }
              (pe = e()) && typeof pe.catch == "function" && pe.catch(function() {
              });
            }
          } catch (oe) {
            if (oe && le && typeof oe.stack == "string")
              return [oe.stack, le.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var d = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      d && d.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var h = l.DetermineComponentFrameRoot(), x = h[0], E = h[1];
      if (x && E) {
        var L = x.split(`
`), re = E.split(`
`);
        for (d = l = 0; l < L.length && !L[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; d < re.length && !re[d].includes(
          "DetermineComponentFrameRoot"
        ); )
          d++;
        if (l === L.length || d === re.length)
          for (l = L.length - 1, d = re.length - 1; 1 <= l && 0 <= d && L[l] !== re[d]; )
            d--;
        for (; 1 <= l && 0 <= d; l--, d--)
          if (L[l] !== re[d]) {
            if (l !== 1 || d !== 1)
              do
                if (l--, d--, 0 > d || L[l] !== re[d]) {
                  var de = `
` + L[l].replace(" at new ", " at ");
                  return e.displayName && de.includes("<anonymous>") && (de = de.replace("<anonymous>", e.displayName)), de;
                }
              while (1 <= l && 0 <= d);
            break;
          }
      }
    } finally {
      rn = !1, Error.prepareStackTrace = r;
    }
    return (r = e ? e.displayName || e.name : "") ? Fe(r) : "";
  }
  function At(e, n) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Fe(e.type);
      case 16:
        return Fe("Lazy");
      case 13:
        return e.child !== n && n !== null ? Fe("Suspense Fallback") : Fe("Suspense");
      case 19:
        return Fe("SuspenseList");
      case 0:
      case 15:
        return qt(e.type, !1);
      case 11:
        return qt(e.type.render, !1);
      case 1:
        return qt(e.type, !0);
      case 31:
        return Fe("Activity");
      default:
        return "";
    }
  }
  function Te(e) {
    try {
      var n = "", r = null;
      do
        n += At(e, r), r = e, e = e.return;
      while (e);
      return n;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var He = Object.prototype.hasOwnProperty, at = t.unstable_scheduleCallback, St = t.unstable_cancelCallback, ot = t.unstable_shouldYield, Ke = t.unstable_requestPaint, gt = t.unstable_now, je = t.unstable_getCurrentPriorityLevel, ke = t.unstable_ImmediatePriority, Pe = t.unstable_UserBlockingPriority, Xe = t.unstable_NormalPriority, yt = t.unstable_LowPriority, Tt = t.unstable_IdlePriority, zn = t.log, Sn = t.unstable_setDisableYieldValue, pn = null, Pt = null;
  function Dt(e) {
    if (typeof zn == "function" && Sn(e), Pt && typeof Pt.setStrictMode == "function")
      try {
        Pt.setStrictMode(pn, e);
      } catch {
      }
  }
  var Bt = Math.clz32 ? Math.clz32 : cn, sa = Math.log, wn = Math.LN2;
  function cn(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (sa(e) / wn | 0) | 0;
  }
  var En = 256, It = 262144, he = 4194304;
  function Re(e) {
    var n = e & 42;
    if (n !== 0) return n;
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
  function ve(e, n, r) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var d = 0, h = e.suspendedLanes, x = e.pingedLanes;
    e = e.warmLanes;
    var E = l & 134217727;
    return E !== 0 ? (l = E & ~h, l !== 0 ? d = Re(l) : (x &= E, x !== 0 ? d = Re(x) : r || (r = E & ~e, r !== 0 && (d = Re(r))))) : (E = l & ~h, E !== 0 ? d = Re(E) : x !== 0 ? d = Re(x) : r || (r = l & ~e, r !== 0 && (d = Re(r)))), d === 0 ? 0 : n !== 0 && n !== d && (n & h) === 0 && (h = d & -d, r = n & -n, h >= r || h === 32 && (r & 4194048) !== 0) ? n : d;
  }
  function xe(e, n) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & n) === 0;
  }
  function Y(e, n) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return n + 250;
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
        return n + 5e3;
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
  function ce() {
    var e = he;
    return he <<= 1, (he & 62914560) === 0 && (he = 4194304), e;
  }
  function Ce(e) {
    for (var n = [], r = 0; 31 > r; r++) n.push(e);
    return n;
  }
  function _e(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Ge(e, n, r, l, d, h) {
    var x = e.pendingLanes;
    e.pendingLanes = r, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= r, e.entangledLanes &= r, e.errorRecoveryDisabledLanes &= r, e.shellSuspendCounter = 0;
    var E = e.entanglements, L = e.expirationTimes, re = e.hiddenUpdates;
    for (r = x & ~r; 0 < r; ) {
      var de = 31 - Bt(r), pe = 1 << de;
      E[de] = 0, L[de] = -1;
      var le = re[de];
      if (le !== null)
        for (re[de] = null, de = 0; de < le.length; de++) {
          var oe = le[de];
          oe !== null && (oe.lane &= -536870913);
        }
      r &= ~pe;
    }
    l !== 0 && wt(e, l, 0), h !== 0 && d === 0 && e.tag !== 0 && (e.suspendedLanes |= h & ~(x & ~n));
  }
  function wt(e, n, r) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var l = 31 - Bt(n);
    e.entangledLanes |= n, e.entanglements[l] = e.entanglements[l] | 1073741824 | r & 261930;
  }
  function ft(e, n) {
    var r = e.entangledLanes |= n;
    for (e = e.entanglements; r; ) {
      var l = 31 - Bt(r), d = 1 << l;
      d & n | e[l] & n && (e[l] |= n), r &= ~d;
    }
  }
  function z(e, n) {
    var r = n & -n;
    return r = (r & 42) !== 0 ? 1 : H(r), (r & (e.suspendedLanes | n)) !== 0 ? 0 : r;
  }
  function H(e) {
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
  function Q(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ge() {
    var e = V.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : ry(e.type));
  }
  function ye(e, n) {
    var r = V.p;
    try {
      return V.p = e, n();
    } finally {
      V.p = r;
    }
  }
  var De = Math.random().toString(36).slice(2), Se = "__reactFiber$" + De, Ee = "__reactProps$" + De, Le = "__reactContainer$" + De, Me = "__reactEvents$" + De, Ve = "__reactListeners$" + De, Ue = "__reactHandles$" + De, ht = "__reactResources$" + De, et = "__reactMarker$" + De;
  function Rt(e) {
    delete e[Se], delete e[Ee], delete e[Me], delete e[Ve], delete e[Ue];
  }
  function jt(e) {
    var n = e[Se];
    if (n) return n;
    for (var r = e.parentNode; r; ) {
      if (n = r[Le] || r[Se]) {
        if (r = n.alternate, n.child !== null || r !== null && r.child !== null)
          for (e = qv(e); e !== null; ) {
            if (r = e[Se]) return r;
            e = qv(e);
          }
        return n;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function $t(e) {
    if (e = e[Se] || e[Le]) {
      var n = e.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return e;
    }
    return null;
  }
  function rt(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e.stateNode;
    throw Error(i(33));
  }
  function Qt(e) {
    var n = e[ht];
    return n || (n = e[ht] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function kt(e) {
    e[et] = !0;
  }
  var Fa = /* @__PURE__ */ new Set(), ia = {};
  function ln(e, n) {
    ma(e, n), ma(e + "Capture", n);
  }
  function ma(e, n) {
    for (ia[e] = n, e = 0; e < n.length; e++)
      Fa.add(n[e]);
  }
  var _r = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), pa = {}, Mr = {};
  function as(e) {
    return He.call(Mr, e) ? !0 : He.call(pa, e) ? !1 : _r.test(e) ? Mr[e] = !0 : (pa[e] = !0, !1);
  }
  function tt(e, n, r) {
    if (as(n))
      if (r === null) e.removeAttribute(n);
      else {
        switch (typeof r) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(n);
            return;
          case "boolean":
            var l = n.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              e.removeAttribute(n);
              return;
            }
        }
        e.setAttribute(n, "" + r);
      }
  }
  function Gt(e, n, r) {
    if (r === null) e.removeAttribute(n);
    else {
      switch (typeof r) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttribute(n, "" + r);
    }
  }
  function gn(e, n, r, l) {
    if (l === null) e.removeAttribute(r);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(r);
          return;
      }
      e.setAttributeNS(n, r, "" + l);
    }
  }
  function Zt(e) {
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
  function zt(e) {
    var n = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function rs(e, n, r) {
    var l = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      n
    );
    if (!e.hasOwnProperty(n) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var d = l.get, h = l.set;
      return Object.defineProperty(e, n, {
        configurable: !0,
        get: function() {
          return d.call(this);
        },
        set: function(x) {
          r = "" + x, h.call(this, x);
        }
      }), Object.defineProperty(e, n, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return r;
        },
        setValue: function(x) {
          r = "" + x;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[n];
        }
      };
    }
  }
  function ss(e) {
    if (!e._valueTracker) {
      var n = zt(e) ? "checked" : "value";
      e._valueTracker = rs(
        e,
        n,
        "" + e[n]
      );
    }
  }
  function Dl(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var r = n.getValue(), l = "";
    return e && (l = zt(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== r ? (n.setValue(e), !0) : !1;
  }
  function zl(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Uw = /[\n"\\]/g;
  function Fn(e) {
    return e.replace(
      Uw,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function nu(e, n, r, l, d, h, x, E) {
    e.name = "", x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.type = x : e.removeAttribute("type"), n != null ? x === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + Zt(n)) : e.value !== "" + Zt(n) && (e.value = "" + Zt(n)) : x !== "submit" && x !== "reset" || e.removeAttribute("value"), n != null ? au(e, x, Zt(n)) : r != null ? au(e, x, Zt(r)) : l != null && e.removeAttribute("value"), d == null && h != null && (e.defaultChecked = !!h), d != null && (e.checked = d && typeof d != "function" && typeof d != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + Zt(E) : e.removeAttribute("name");
  }
  function Rm(e, n, r, l, d, h, x, E) {
    if (h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (e.type = h), n != null || r != null) {
      if (!(h !== "submit" && h !== "reset" || n != null)) {
        ss(e);
        return;
      }
      r = r != null ? "" + Zt(r) : "", n = n != null ? "" + Zt(n) : r, E || n === e.value || (e.value = n), e.defaultValue = n;
    }
    l = l ?? d, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = E ? e.checked : !!l, e.defaultChecked = !!l, x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" && (e.name = x), ss(e);
  }
  function au(e, n, r) {
    n === "number" && zl(e.ownerDocument) === e || e.defaultValue === "" + r || (e.defaultValue = "" + r);
  }
  function is(e, n, r, l) {
    if (e = e.options, n) {
      n = {};
      for (var d = 0; d < r.length; d++)
        n["$" + r[d]] = !0;
      for (r = 0; r < e.length; r++)
        d = n.hasOwnProperty("$" + e[r].value), e[r].selected !== d && (e[r].selected = d), d && l && (e[r].defaultSelected = !0);
    } else {
      for (r = "" + Zt(r), n = null, d = 0; d < e.length; d++) {
        if (e[d].value === r) {
          e[d].selected = !0, l && (e[d].defaultSelected = !0);
          return;
        }
        n !== null || e[d].disabled || (n = e[d]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function _m(e, n, r) {
    if (n != null && (n = "" + Zt(n), n !== e.value && (e.value = n), r == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = r != null ? "" + Zt(r) : "";
  }
  function Mm(e, n, r, l) {
    if (n == null) {
      if (l != null) {
        if (r != null) throw Error(i(92));
        if (ie(l)) {
          if (1 < l.length) throw Error(i(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), n = r;
    }
    r = Zt(n), e.defaultValue = r, l = e.textContent, l === r && l !== "" && l !== null && (e.value = l), ss(e);
  }
  function ls(e, n) {
    if (n) {
      var r = e.firstChild;
      if (r && r === e.lastChild && r.nodeType === 3) {
        r.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var Bw = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Am(e, n, r) {
    var l = n.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === "" ? l ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : l ? e.setProperty(n, r) : typeof r != "number" || r === 0 || Bw.has(n) ? n === "float" ? e.cssFloat = r : e[n] = ("" + r).trim() : e[n] = r + "px";
  }
  function km(e, n, r) {
    if (n != null && typeof n != "object")
      throw Error(i(62));
    if (e = e.style, r != null) {
      for (var l in r)
        !r.hasOwnProperty(l) || n != null && n.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var d in n)
        l = n[d], n.hasOwnProperty(d) && r[d] !== l && Am(e, d, l);
    } else
      for (var h in n)
        n.hasOwnProperty(h) && Am(e, h, n[h]);
  }
  function ru(e) {
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
  var Iw = /* @__PURE__ */ new Map([
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
  ]), Vw = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ol(e) {
    return Vw.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function wa() {
  }
  var su = null;
  function iu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var os = null, cs = null;
  function Dm(e) {
    var n = $t(e);
    if (n && (e = n.stateNode)) {
      var r = e[Ee] || null;
      e: switch (e = n.stateNode, n.type) {
        case "input":
          if (nu(
            e,
            r.value,
            r.defaultValue,
            r.defaultValue,
            r.checked,
            r.defaultChecked,
            r.type,
            r.name
          ), n = r.name, r.type === "radio" && n != null) {
            for (r = e; r.parentNode; ) r = r.parentNode;
            for (r = r.querySelectorAll(
              'input[name="' + Fn(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < r.length; n++) {
              var l = r[n];
              if (l !== e && l.form === e.form) {
                var d = l[Ee] || null;
                if (!d) throw Error(i(90));
                nu(
                  l,
                  d.value,
                  d.defaultValue,
                  d.defaultValue,
                  d.checked,
                  d.defaultChecked,
                  d.type,
                  d.name
                );
              }
            }
            for (n = 0; n < r.length; n++)
              l = r[n], l.form === e.form && Dl(l);
          }
          break e;
        case "textarea":
          _m(e, r.value, r.defaultValue);
          break e;
        case "select":
          n = r.value, n != null && is(e, !!r.multiple, n, !1);
      }
    }
  }
  var lu = !1;
  function zm(e, n, r) {
    if (lu) return e(n, r);
    lu = !0;
    try {
      var l = e(n);
      return l;
    } finally {
      if (lu = !1, (os !== null || cs !== null) && (jo(), os && (n = os, e = cs, cs = os = null, Dm(n), e)))
        for (n = 0; n < e.length; n++) Dm(e[n]);
    }
  }
  function ci(e, n) {
    var r = e.stateNode;
    if (r === null) return null;
    var l = r[Ee] || null;
    if (l === null) return null;
    r = l[n];
    e: switch (n) {
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
    if (r && typeof r != "function")
      throw Error(
        i(231, n, typeof r)
      );
    return r;
  }
  var ja = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ou = !1;
  if (ja)
    try {
      var ui = {};
      Object.defineProperty(ui, "passive", {
        get: function() {
          ou = !0;
        }
      }), window.addEventListener("test", ui, ui), window.removeEventListener("test", ui, ui);
    } catch {
      ou = !1;
    }
  var Pa = null, cu = null, Ll = null;
  function Om() {
    if (Ll) return Ll;
    var e, n = cu, r = n.length, l, d = "value" in Pa ? Pa.value : Pa.textContent, h = d.length;
    for (e = 0; e < r && n[e] === d[e]; e++) ;
    var x = r - e;
    for (l = 1; l <= x && n[r - l] === d[h - l]; l++) ;
    return Ll = d.slice(e, 1 < l ? 1 - l : void 0);
  }
  function $l(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ul() {
    return !0;
  }
  function Lm() {
    return !1;
  }
  function Nn(e) {
    function n(r, l, d, h, x) {
      this._reactName = r, this._targetInst = d, this.type = l, this.nativeEvent = h, this.target = x, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (r = e[E], this[E] = r ? r(h) : h[E]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? Ul : Lm, this.isPropagationStopped = Lm, this;
    }
    return v(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var r = this.nativeEvent;
        r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1), this.isDefaultPrevented = Ul);
      },
      stopPropagation: function() {
        var r = this.nativeEvent;
        r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0), this.isPropagationStopped = Ul);
      },
      persist: function() {
      },
      isPersistent: Ul
    }), n;
  }
  var Ar = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Bl = Nn(Ar), di = v({}, Ar, { view: 0, detail: 0 }), qw = Nn(di), uu, du, fi, Il = v({}, di, {
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
    getModifierState: hu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== fi && (fi && e.type === "mousemove" ? (uu = e.screenX - fi.screenX, du = e.screenY - fi.screenY) : du = uu = 0, fi = e), uu);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : du;
    }
  }), $m = Nn(Il), Hw = v({}, Il, { dataTransfer: 0 }), Fw = Nn(Hw), Pw = v({}, di, { relatedTarget: 0 }), fu = Nn(Pw), Gw = v({}, Ar, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Yw = Nn(Gw), Kw = v({}, Ar, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Xw = Nn(Kw), Qw = v({}, Ar, { data: 0 }), Um = Nn(Qw), Zw = {
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
  }, Jw = {
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
  }, Ww = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function ej(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = Ww[e]) ? !!n[e] : !1;
  }
  function hu() {
    return ej;
  }
  var tj = v({}, di, {
    key: function(e) {
      if (e.key) {
        var n = Zw[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = $l(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Jw[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: hu,
    charCode: function(e) {
      return e.type === "keypress" ? $l(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? $l(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), nj = Nn(tj), aj = v({}, Il, {
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
  }), Bm = Nn(aj), rj = v({}, di, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: hu
  }), sj = Nn(rj), ij = v({}, Ar, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), lj = Nn(ij), oj = v({}, Il, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), cj = Nn(oj), uj = v({}, Ar, {
    newState: 0,
    oldState: 0
  }), dj = Nn(uj), fj = [9, 13, 27, 32], mu = ja && "CompositionEvent" in window, hi = null;
  ja && "documentMode" in document && (hi = document.documentMode);
  var hj = ja && "TextEvent" in window && !hi, Im = ja && (!mu || hi && 8 < hi && 11 >= hi), Vm = " ", qm = !1;
  function Hm(e, n) {
    switch (e) {
      case "keyup":
        return fj.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Fm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var us = !1;
  function mj(e, n) {
    switch (e) {
      case "compositionend":
        return Fm(n);
      case "keypress":
        return n.which !== 32 ? null : (qm = !0, Vm);
      case "textInput":
        return e = n.data, e === Vm && qm ? null : e;
      default:
        return null;
    }
  }
  function pj(e, n) {
    if (us)
      return e === "compositionend" || !mu && Hm(e, n) ? (e = Om(), Ll = cu = Pa = null, us = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
          if (n.char && 1 < n.char.length)
            return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return Im && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var gj = {
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
  function Pm(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!gj[e.type] : n === "textarea";
  }
  function Gm(e, n, r, l) {
    os ? cs ? cs.push(l) : cs = [l] : os = l, n = Mo(n, "onChange"), 0 < n.length && (r = new Bl(
      "onChange",
      "change",
      null,
      r,
      l
    ), e.push({ event: r, listeners: n }));
  }
  var mi = null, pi = null;
  function vj(e) {
    Rv(e, 0);
  }
  function Vl(e) {
    var n = rt(e);
    if (Dl(n)) return e;
  }
  function Ym(e, n) {
    if (e === "change") return n;
  }
  var Km = !1;
  if (ja) {
    var pu;
    if (ja) {
      var gu = "oninput" in document;
      if (!gu) {
        var Xm = document.createElement("div");
        Xm.setAttribute("oninput", "return;"), gu = typeof Xm.oninput == "function";
      }
      pu = gu;
    } else pu = !1;
    Km = pu && (!document.documentMode || 9 < document.documentMode);
  }
  function Qm() {
    mi && (mi.detachEvent("onpropertychange", Zm), pi = mi = null);
  }
  function Zm(e) {
    if (e.propertyName === "value" && Vl(pi)) {
      var n = [];
      Gm(
        n,
        pi,
        e,
        iu(e)
      ), zm(vj, n);
    }
  }
  function yj(e, n, r) {
    e === "focusin" ? (Qm(), mi = n, pi = r, mi.attachEvent("onpropertychange", Zm)) : e === "focusout" && Qm();
  }
  function bj(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Vl(pi);
  }
  function xj(e, n) {
    if (e === "click") return Vl(n);
  }
  function Sj(e, n) {
    if (e === "input" || e === "change")
      return Vl(n);
  }
  function wj(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var On = typeof Object.is == "function" ? Object.is : wj;
  function gi(e, n) {
    if (On(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var r = Object.keys(e), l = Object.keys(n);
    if (r.length !== l.length) return !1;
    for (l = 0; l < r.length; l++) {
      var d = r[l];
      if (!He.call(n, d) || !On(e[d], n[d]))
        return !1;
    }
    return !0;
  }
  function Jm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Wm(e, n) {
    var r = Jm(e);
    e = 0;
    for (var l; r; ) {
      if (r.nodeType === 3) {
        if (l = e + r.textContent.length, e <= n && l >= n)
          return { node: r, offset: n - e };
        e = l;
      }
      e: {
        for (; r; ) {
          if (r.nextSibling) {
            r = r.nextSibling;
            break e;
          }
          r = r.parentNode;
        }
        r = void 0;
      }
      r = Jm(r);
    }
  }
  function ep(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? ep(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function tp(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var n = zl(e.document); n instanceof e.HTMLIFrameElement; ) {
      try {
        var r = typeof n.contentWindow.location.href == "string";
      } catch {
        r = !1;
      }
      if (r) e = n.contentWindow;
      else break;
      n = zl(e.document);
    }
    return n;
  }
  function vu(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var jj = ja && "documentMode" in document && 11 >= document.documentMode, ds = null, yu = null, vi = null, bu = !1;
  function np(e, n, r) {
    var l = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    bu || ds == null || ds !== zl(l) || (l = ds, "selectionStart" in l && vu(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), vi && gi(vi, l) || (vi = l, l = Mo(yu, "onSelect"), 0 < l.length && (n = new Bl(
      "onSelect",
      "select",
      null,
      n,
      r
    ), e.push({ event: n, listeners: l }), n.target = ds)));
  }
  function kr(e, n) {
    var r = {};
    return r[e.toLowerCase()] = n.toLowerCase(), r["Webkit" + e] = "webkit" + n, r["Moz" + e] = "moz" + n, r;
  }
  var fs = {
    animationend: kr("Animation", "AnimationEnd"),
    animationiteration: kr("Animation", "AnimationIteration"),
    animationstart: kr("Animation", "AnimationStart"),
    transitionrun: kr("Transition", "TransitionRun"),
    transitionstart: kr("Transition", "TransitionStart"),
    transitioncancel: kr("Transition", "TransitionCancel"),
    transitionend: kr("Transition", "TransitionEnd")
  }, xu = {}, ap = {};
  ja && (ap = document.createElement("div").style, "AnimationEvent" in window || (delete fs.animationend.animation, delete fs.animationiteration.animation, delete fs.animationstart.animation), "TransitionEvent" in window || delete fs.transitionend.transition);
  function Dr(e) {
    if (xu[e]) return xu[e];
    if (!fs[e]) return e;
    var n = fs[e], r;
    for (r in n)
      if (n.hasOwnProperty(r) && r in ap)
        return xu[e] = n[r];
    return e;
  }
  var rp = Dr("animationend"), sp = Dr("animationiteration"), ip = Dr("animationstart"), Ej = Dr("transitionrun"), Nj = Dr("transitionstart"), Cj = Dr("transitioncancel"), lp = Dr("transitionend"), op = /* @__PURE__ */ new Map(), Su = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Su.push("scrollEnd");
  function la(e, n) {
    op.set(e, n), ln(n, [e]);
  }
  var ql = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var n = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(n)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, Pn = [], hs = 0, wu = 0;
  function Hl() {
    for (var e = hs, n = wu = hs = 0; n < e; ) {
      var r = Pn[n];
      Pn[n++] = null;
      var l = Pn[n];
      Pn[n++] = null;
      var d = Pn[n];
      Pn[n++] = null;
      var h = Pn[n];
      if (Pn[n++] = null, l !== null && d !== null) {
        var x = l.pending;
        x === null ? d.next = d : (d.next = x.next, x.next = d), l.pending = d;
      }
      h !== 0 && cp(r, d, h);
    }
  }
  function Fl(e, n, r, l) {
    Pn[hs++] = e, Pn[hs++] = n, Pn[hs++] = r, Pn[hs++] = l, wu |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function ju(e, n, r, l) {
    return Fl(e, n, r, l), Pl(e);
  }
  function zr(e, n) {
    return Fl(e, null, null, n), Pl(e);
  }
  function cp(e, n, r) {
    e.lanes |= r;
    var l = e.alternate;
    l !== null && (l.lanes |= r);
    for (var d = !1, h = e.return; h !== null; )
      h.childLanes |= r, l = h.alternate, l !== null && (l.childLanes |= r), h.tag === 22 && (e = h.stateNode, e === null || e._visibility & 1 || (d = !0)), e = h, h = h.return;
    return e.tag === 3 ? (h = e.stateNode, d && n !== null && (d = 31 - Bt(r), e = h.hiddenUpdates, l = e[d], l === null ? e[d] = [n] : l.push(n), n.lane = r | 536870912), h) : null;
  }
  function Pl(e) {
    if (50 < Bi)
      throw Bi = 0, kd = null, Error(i(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var ms = {};
  function Tj(e, n, r, l) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ln(e, n, r, l) {
    return new Tj(e, n, r, l);
  }
  function Eu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Ea(e, n) {
    var r = e.alternate;
    return r === null ? (r = Ln(
      e.tag,
      n,
      e.key,
      e.mode
    ), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = n, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 65011712, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, n = e.dependencies, r.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r.refCleanup = e.refCleanup, r;
  }
  function up(e, n) {
    e.flags &= 65011714;
    var r = e.alternate;
    return r === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = r.childLanes, e.lanes = r.lanes, e.child = r.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = r.memoizedProps, e.memoizedState = r.memoizedState, e.updateQueue = r.updateQueue, e.type = r.type, n = r.dependencies, e.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), e;
  }
  function Gl(e, n, r, l, d, h) {
    var x = 0;
    if (l = e, typeof e == "function") Eu(e) && (x = 1);
    else if (typeof e == "string")
      x = kE(
        e,
        r,
        K.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case q:
          return e = Ln(31, r, n, d), e.elementType = q, e.lanes = h, e;
        case C:
          return Or(r.children, d, h, n);
        case _:
          x = 8, d |= 24;
          break;
        case T:
          return e = Ln(12, r, n, d | 2), e.elementType = T, e.lanes = h, e;
        case B:
          return e = Ln(13, r, n, d), e.elementType = B, e.lanes = h, e;
        case G:
          return e = Ln(19, r, n, d), e.elementType = G, e.lanes = h, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case R:
                x = 10;
                break e;
              case O:
                x = 9;
                break e;
              case N:
                x = 11;
                break e;
              case te:
                x = 14;
                break e;
              case M:
                x = 16, l = null;
                break e;
            }
          x = 29, r = Error(
            i(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return n = Ln(x, r, n, d), n.elementType = e, n.type = l, n.lanes = h, n;
  }
  function Or(e, n, r, l) {
    return e = Ln(7, e, l, n), e.lanes = r, e;
  }
  function Nu(e, n, r) {
    return e = Ln(6, e, null, n), e.lanes = r, e;
  }
  function dp(e) {
    var n = Ln(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function Cu(e, n, r) {
    return n = Ln(
      4,
      e.children !== null ? e.children : [],
      e.key,
      n
    ), n.lanes = r, n.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, n;
  }
  var fp = /* @__PURE__ */ new WeakMap();
  function Gn(e, n) {
    if (typeof e == "object" && e !== null) {
      var r = fp.get(e);
      return r !== void 0 ? r : (n = {
        value: e,
        source: n,
        stack: Te(n)
      }, fp.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: Te(n)
    };
  }
  var ps = [], gs = 0, Yl = null, yi = 0, Yn = [], Kn = 0, Ga = null, ga = 1, va = "";
  function Na(e, n) {
    ps[gs++] = yi, ps[gs++] = Yl, Yl = e, yi = n;
  }
  function hp(e, n, r) {
    Yn[Kn++] = ga, Yn[Kn++] = va, Yn[Kn++] = Ga, Ga = e;
    var l = ga;
    e = va;
    var d = 32 - Bt(l) - 1;
    l &= ~(1 << d), r += 1;
    var h = 32 - Bt(n) + d;
    if (30 < h) {
      var x = d - d % 5;
      h = (l & (1 << x) - 1).toString(32), l >>= x, d -= x, ga = 1 << 32 - Bt(n) + d | r << d | l, va = h + e;
    } else
      ga = 1 << h | r << d | l, va = e;
  }
  function Tu(e) {
    e.return !== null && (Na(e, 1), hp(e, 1, 0));
  }
  function Ru(e) {
    for (; e === Yl; )
      Yl = ps[--gs], ps[gs] = null, yi = ps[--gs], ps[gs] = null;
    for (; e === Ga; )
      Ga = Yn[--Kn], Yn[Kn] = null, va = Yn[--Kn], Yn[Kn] = null, ga = Yn[--Kn], Yn[Kn] = null;
  }
  function mp(e, n) {
    Yn[Kn++] = ga, Yn[Kn++] = va, Yn[Kn++] = Ga, ga = n.id, va = n.overflow, Ga = e;
  }
  var un = null, Ot = null, dt = !1, Ya = null, Xn = !1, _u = Error(i(519));
  function Ka(e) {
    var n = Error(
      i(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw bi(Gn(n, e)), _u;
  }
  function pp(e) {
    var n = e.stateNode, r = e.type, l = e.memoizedProps;
    switch (n[Se] = e, n[Ee] = l, r) {
      case "dialog":
        it("cancel", n), it("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        it("load", n);
        break;
      case "video":
      case "audio":
        for (r = 0; r < Vi.length; r++)
          it(Vi[r], n);
        break;
      case "source":
        it("error", n);
        break;
      case "img":
      case "image":
      case "link":
        it("error", n), it("load", n);
        break;
      case "details":
        it("toggle", n);
        break;
      case "input":
        it("invalid", n), Rm(
          n,
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
        it("invalid", n);
        break;
      case "textarea":
        it("invalid", n), Mm(n, l.value, l.defaultValue, l.children);
    }
    r = l.children, typeof r != "string" && typeof r != "number" && typeof r != "bigint" || n.textContent === "" + r || l.suppressHydrationWarning === !0 || kv(n.textContent, r) ? (l.popover != null && (it("beforetoggle", n), it("toggle", n)), l.onScroll != null && it("scroll", n), l.onScrollEnd != null && it("scrollend", n), l.onClick != null && (n.onclick = wa), n = !0) : n = !1, n || Ka(e, !0);
  }
  function gp(e) {
    for (un = e.return; un; )
      switch (un.tag) {
        case 5:
        case 31:
        case 13:
          Xn = !1;
          return;
        case 27:
        case 3:
          Xn = !0;
          return;
        default:
          un = un.return;
      }
  }
  function vs(e) {
    if (e !== un) return !1;
    if (!dt) return gp(e), dt = !0, !1;
    var n = e.tag, r;
    if ((r = n !== 3 && n !== 27) && ((r = n === 5) && (r = e.type, r = !(r !== "form" && r !== "button") || Yd(e.type, e.memoizedProps)), r = !r), r && Ot && Ka(e), gp(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      Ot = Vv(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      Ot = Vv(e);
    } else
      n === 27 ? (n = Ot, or(e.type) ? (e = Jd, Jd = null, Ot = e) : Ot = n) : Ot = un ? Zn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Lr() {
    Ot = un = null, dt = !1;
  }
  function Mu() {
    var e = Ya;
    return e !== null && (_n === null ? _n = e : _n.push.apply(
      _n,
      e
    ), Ya = null), e;
  }
  function bi(e) {
    Ya === null ? Ya = [e] : Ya.push(e);
  }
  var Au = k(null), $r = null, Ca = null;
  function Xa(e, n, r) {
    ae(Au, n._currentValue), n._currentValue = r;
  }
  function Ta(e) {
    e._currentValue = Au.current, ne(Au);
  }
  function ku(e, n, r) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, l !== null && (l.childLanes |= n)) : l !== null && (l.childLanes & n) !== n && (l.childLanes |= n), e === r) break;
      e = e.return;
    }
  }
  function Du(e, n, r, l) {
    var d = e.child;
    for (d !== null && (d.return = e); d !== null; ) {
      var h = d.dependencies;
      if (h !== null) {
        var x = d.child;
        h = h.firstContext;
        e: for (; h !== null; ) {
          var E = h;
          h = d;
          for (var L = 0; L < n.length; L++)
            if (E.context === n[L]) {
              h.lanes |= r, E = h.alternate, E !== null && (E.lanes |= r), ku(
                h.return,
                r,
                e
              ), l || (x = null);
              break e;
            }
          h = E.next;
        }
      } else if (d.tag === 18) {
        if (x = d.return, x === null) throw Error(i(341));
        x.lanes |= r, h = x.alternate, h !== null && (h.lanes |= r), ku(x, r, e), x = null;
      } else x = d.child;
      if (x !== null) x.return = d;
      else
        for (x = d; x !== null; ) {
          if (x === e) {
            x = null;
            break;
          }
          if (d = x.sibling, d !== null) {
            d.return = x.return, x = d;
            break;
          }
          x = x.return;
        }
      d = x;
    }
  }
  function ys(e, n, r, l) {
    e = null;
    for (var d = n, h = !1; d !== null; ) {
      if (!h) {
        if ((d.flags & 524288) !== 0) h = !0;
        else if ((d.flags & 262144) !== 0) break;
      }
      if (d.tag === 10) {
        var x = d.alternate;
        if (x === null) throw Error(i(387));
        if (x = x.memoizedProps, x !== null) {
          var E = d.type;
          On(d.pendingProps.value, x.value) || (e !== null ? e.push(E) : e = [E]);
        }
      } else if (d === ue.current) {
        if (x = d.alternate, x === null) throw Error(i(387));
        x.memoizedState.memoizedState !== d.memoizedState.memoizedState && (e !== null ? e.push(Gi) : e = [Gi]);
      }
      d = d.return;
    }
    e !== null && Du(
      n,
      e,
      r,
      l
    ), n.flags |= 262144;
  }
  function Kl(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!On(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Ur(e) {
    $r = e, Ca = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function dn(e) {
    return vp($r, e);
  }
  function Xl(e, n) {
    return $r === null && Ur(e), vp(e, n);
  }
  function vp(e, n) {
    var r = n._currentValue;
    if (n = { context: n, memoizedValue: r, next: null }, Ca === null) {
      if (e === null) throw Error(i(308));
      Ca = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else Ca = Ca.next = n;
    return r;
  }
  var Rj = typeof AbortController < "u" ? AbortController : function() {
    var e = [], n = this.signal = {
      aborted: !1,
      addEventListener: function(r, l) {
        e.push(l);
      }
    };
    this.abort = function() {
      n.aborted = !0, e.forEach(function(r) {
        return r();
      });
    };
  }, _j = t.unstable_scheduleCallback, Mj = t.unstable_NormalPriority, Jt = {
    $$typeof: R,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function zu() {
    return {
      controller: new Rj(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function xi(e) {
    e.refCount--, e.refCount === 0 && _j(Mj, function() {
      e.controller.abort();
    });
  }
  var Si = null, Ou = 0, bs = 0, xs = null;
  function Aj(e, n) {
    if (Si === null) {
      var r = Si = [];
      Ou = 0, bs = Ud(), xs = {
        status: "pending",
        value: void 0,
        then: function(l) {
          r.push(l);
        }
      };
    }
    return Ou++, n.then(yp, yp), n;
  }
  function yp() {
    if (--Ou === 0 && Si !== null) {
      xs !== null && (xs.status = "fulfilled");
      var e = Si;
      Si = null, bs = 0, xs = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function kj(e, n) {
    var r = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(d) {
        r.push(d);
      }
    };
    return e.then(
      function() {
        l.status = "fulfilled", l.value = n;
        for (var d = 0; d < r.length; d++) (0, r[d])(n);
      },
      function(d) {
        for (l.status = "rejected", l.reason = d, d = 0; d < r.length; d++)
          (0, r[d])(void 0);
      }
    ), l;
  }
  var bp = A.S;
  A.S = function(e, n) {
    nv = gt(), typeof n == "object" && n !== null && typeof n.then == "function" && Aj(e, n), bp !== null && bp(e, n);
  };
  var Br = k(null);
  function Lu() {
    var e = Br.current;
    return e !== null ? e : _t.pooledCache;
  }
  function Ql(e, n) {
    n === null ? ae(Br, Br.current) : ae(Br, n.pool);
  }
  function xp() {
    var e = Lu();
    return e === null ? null : { parent: Jt._currentValue, pool: e };
  }
  var Ss = Error(i(460)), $u = Error(i(474)), Zl = Error(i(542)), Jl = { then: function() {
  } };
  function Sp(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function wp(e, n, r) {
    switch (r = e[r], r === void 0 ? e.push(n) : r !== n && (n.then(wa, wa), n = r), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, Ep(e), e;
      default:
        if (typeof n.status == "string") n.then(wa, wa);
        else {
          if (e = _t, e !== null && 100 < e.shellSuspendCounter)
            throw Error(i(482));
          e = n, e.status = "pending", e.then(
            function(l) {
              if (n.status === "pending") {
                var d = n;
                d.status = "fulfilled", d.value = l;
              }
            },
            function(l) {
              if (n.status === "pending") {
                var d = n;
                d.status = "rejected", d.reason = l;
              }
            }
          );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw e = n.reason, Ep(e), e;
        }
        throw Vr = n, Ss;
    }
  }
  function Ir(e) {
    try {
      var n = e._init;
      return n(e._payload);
    } catch (r) {
      throw r !== null && typeof r == "object" && typeof r.then == "function" ? (Vr = r, Ss) : r;
    }
  }
  var Vr = null;
  function jp() {
    if (Vr === null) throw Error(i(459));
    var e = Vr;
    return Vr = null, e;
  }
  function Ep(e) {
    if (e === Ss || e === Zl)
      throw Error(i(483));
  }
  var ws = null, wi = 0;
  function Wl(e) {
    var n = wi;
    return wi += 1, ws === null && (ws = []), wp(ws, e, n);
  }
  function ji(e, n) {
    n = n.props.ref, e.ref = n !== void 0 ? n : null;
  }
  function eo(e, n) {
    throw n.$$typeof === S ? Error(i(525)) : (e = Object.prototype.toString.call(n), Error(
      i(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e
      )
    ));
  }
  function Np(e) {
    function n(X, I) {
      if (e) {
        var ee = X.deletions;
        ee === null ? (X.deletions = [I], X.flags |= 16) : ee.push(I);
      }
    }
    function r(X, I) {
      if (!e) return null;
      for (; I !== null; )
        n(X, I), I = I.sibling;
      return null;
    }
    function l(X) {
      for (var I = /* @__PURE__ */ new Map(); X !== null; )
        X.key !== null ? I.set(X.key, X) : I.set(X.index, X), X = X.sibling;
      return I;
    }
    function d(X, I) {
      return X = Ea(X, I), X.index = 0, X.sibling = null, X;
    }
    function h(X, I, ee) {
      return X.index = ee, e ? (ee = X.alternate, ee !== null ? (ee = ee.index, ee < I ? (X.flags |= 67108866, I) : ee) : (X.flags |= 67108866, I)) : (X.flags |= 1048576, I);
    }
    function x(X) {
      return e && X.alternate === null && (X.flags |= 67108866), X;
    }
    function E(X, I, ee, me) {
      return I === null || I.tag !== 6 ? (I = Nu(ee, X.mode, me), I.return = X, I) : (I = d(I, ee), I.return = X, I);
    }
    function L(X, I, ee, me) {
      var Ie = ee.type;
      return Ie === C ? de(
        X,
        I,
        ee.props.children,
        me,
        ee.key
      ) : I !== null && (I.elementType === Ie || typeof Ie == "object" && Ie !== null && Ie.$$typeof === M && Ir(Ie) === I.type) ? (I = d(I, ee.props), ji(I, ee), I.return = X, I) : (I = Gl(
        ee.type,
        ee.key,
        ee.props,
        null,
        X.mode,
        me
      ), ji(I, ee), I.return = X, I);
    }
    function re(X, I, ee, me) {
      return I === null || I.tag !== 4 || I.stateNode.containerInfo !== ee.containerInfo || I.stateNode.implementation !== ee.implementation ? (I = Cu(ee, X.mode, me), I.return = X, I) : (I = d(I, ee.children || []), I.return = X, I);
    }
    function de(X, I, ee, me, Ie) {
      return I === null || I.tag !== 7 ? (I = Or(
        ee,
        X.mode,
        me,
        Ie
      ), I.return = X, I) : (I = d(I, ee), I.return = X, I);
    }
    function pe(X, I, ee) {
      if (typeof I == "string" && I !== "" || typeof I == "number" || typeof I == "bigint")
        return I = Nu(
          "" + I,
          X.mode,
          ee
        ), I.return = X, I;
      if (typeof I == "object" && I !== null) {
        switch (I.$$typeof) {
          case w:
            return ee = Gl(
              I.type,
              I.key,
              I.props,
              null,
              X.mode,
              ee
            ), ji(ee, I), ee.return = X, ee;
          case j:
            return I = Cu(
              I,
              X.mode,
              ee
            ), I.return = X, I;
          case M:
            return I = Ir(I), pe(X, I, ee);
        }
        if (ie(I) || Z(I))
          return I = Or(
            I,
            X.mode,
            ee,
            null
          ), I.return = X, I;
        if (typeof I.then == "function")
          return pe(X, Wl(I), ee);
        if (I.$$typeof === R)
          return pe(
            X,
            Xl(X, I),
            ee
          );
        eo(X, I);
      }
      return null;
    }
    function le(X, I, ee, me) {
      var Ie = I !== null ? I.key : null;
      if (typeof ee == "string" && ee !== "" || typeof ee == "number" || typeof ee == "bigint")
        return Ie !== null ? null : E(X, I, "" + ee, me);
      if (typeof ee == "object" && ee !== null) {
        switch (ee.$$typeof) {
          case w:
            return ee.key === Ie ? L(X, I, ee, me) : null;
          case j:
            return ee.key === Ie ? re(X, I, ee, me) : null;
          case M:
            return ee = Ir(ee), le(X, I, ee, me);
        }
        if (ie(ee) || Z(ee))
          return Ie !== null ? null : de(X, I, ee, me, null);
        if (typeof ee.then == "function")
          return le(
            X,
            I,
            Wl(ee),
            me
          );
        if (ee.$$typeof === R)
          return le(
            X,
            I,
            Xl(X, ee),
            me
          );
        eo(X, ee);
      }
      return null;
    }
    function oe(X, I, ee, me, Ie) {
      if (typeof me == "string" && me !== "" || typeof me == "number" || typeof me == "bigint")
        return X = X.get(ee) || null, E(I, X, "" + me, Ie);
      if (typeof me == "object" && me !== null) {
        switch (me.$$typeof) {
          case w:
            return X = X.get(
              me.key === null ? ee : me.key
            ) || null, L(I, X, me, Ie);
          case j:
            return X = X.get(
              me.key === null ? ee : me.key
            ) || null, re(I, X, me, Ie);
          case M:
            return me = Ir(me), oe(
              X,
              I,
              ee,
              me,
              Ie
            );
        }
        if (ie(me) || Z(me))
          return X = X.get(ee) || null, de(I, X, me, Ie, null);
        if (typeof me.then == "function")
          return oe(
            X,
            I,
            ee,
            Wl(me),
            Ie
          );
        if (me.$$typeof === R)
          return oe(
            X,
            I,
            ee,
            Xl(I, me),
            Ie
          );
        eo(I, me);
      }
      return null;
    }
    function ze(X, I, ee, me) {
      for (var Ie = null, mt = null, $e = I, Je = I = 0, ut = null; $e !== null && Je < ee.length; Je++) {
        $e.index > Je ? (ut = $e, $e = null) : ut = $e.sibling;
        var pt = le(
          X,
          $e,
          ee[Je],
          me
        );
        if (pt === null) {
          $e === null && ($e = ut);
          break;
        }
        e && $e && pt.alternate === null && n(X, $e), I = h(pt, I, Je), mt === null ? Ie = pt : mt.sibling = pt, mt = pt, $e = ut;
      }
      if (Je === ee.length)
        return r(X, $e), dt && Na(X, Je), Ie;
      if ($e === null) {
        for (; Je < ee.length; Je++)
          $e = pe(X, ee[Je], me), $e !== null && (I = h(
            $e,
            I,
            Je
          ), mt === null ? Ie = $e : mt.sibling = $e, mt = $e);
        return dt && Na(X, Je), Ie;
      }
      for ($e = l($e); Je < ee.length; Je++)
        ut = oe(
          $e,
          X,
          Je,
          ee[Je],
          me
        ), ut !== null && (e && ut.alternate !== null && $e.delete(
          ut.key === null ? Je : ut.key
        ), I = h(
          ut,
          I,
          Je
        ), mt === null ? Ie = ut : mt.sibling = ut, mt = ut);
      return e && $e.forEach(function(hr) {
        return n(X, hr);
      }), dt && Na(X, Je), Ie;
    }
    function qe(X, I, ee, me) {
      if (ee == null) throw Error(i(151));
      for (var Ie = null, mt = null, $e = I, Je = I = 0, ut = null, pt = ee.next(); $e !== null && !pt.done; Je++, pt = ee.next()) {
        $e.index > Je ? (ut = $e, $e = null) : ut = $e.sibling;
        var hr = le(X, $e, pt.value, me);
        if (hr === null) {
          $e === null && ($e = ut);
          break;
        }
        e && $e && hr.alternate === null && n(X, $e), I = h(hr, I, Je), mt === null ? Ie = hr : mt.sibling = hr, mt = hr, $e = ut;
      }
      if (pt.done)
        return r(X, $e), dt && Na(X, Je), Ie;
      if ($e === null) {
        for (; !pt.done; Je++, pt = ee.next())
          pt = pe(X, pt.value, me), pt !== null && (I = h(pt, I, Je), mt === null ? Ie = pt : mt.sibling = pt, mt = pt);
        return dt && Na(X, Je), Ie;
      }
      for ($e = l($e); !pt.done; Je++, pt = ee.next())
        pt = oe($e, X, Je, pt.value, me), pt !== null && (e && pt.alternate !== null && $e.delete(pt.key === null ? Je : pt.key), I = h(pt, I, Je), mt === null ? Ie = pt : mt.sibling = pt, mt = pt);
      return e && $e.forEach(function(HE) {
        return n(X, HE);
      }), dt && Na(X, Je), Ie;
    }
    function Ct(X, I, ee, me) {
      if (typeof ee == "object" && ee !== null && ee.type === C && ee.key === null && (ee = ee.props.children), typeof ee == "object" && ee !== null) {
        switch (ee.$$typeof) {
          case w:
            e: {
              for (var Ie = ee.key; I !== null; ) {
                if (I.key === Ie) {
                  if (Ie = ee.type, Ie === C) {
                    if (I.tag === 7) {
                      r(
                        X,
                        I.sibling
                      ), me = d(
                        I,
                        ee.props.children
                      ), me.return = X, X = me;
                      break e;
                    }
                  } else if (I.elementType === Ie || typeof Ie == "object" && Ie !== null && Ie.$$typeof === M && Ir(Ie) === I.type) {
                    r(
                      X,
                      I.sibling
                    ), me = d(I, ee.props), ji(me, ee), me.return = X, X = me;
                    break e;
                  }
                  r(X, I);
                  break;
                } else n(X, I);
                I = I.sibling;
              }
              ee.type === C ? (me = Or(
                ee.props.children,
                X.mode,
                me,
                ee.key
              ), me.return = X, X = me) : (me = Gl(
                ee.type,
                ee.key,
                ee.props,
                null,
                X.mode,
                me
              ), ji(me, ee), me.return = X, X = me);
            }
            return x(X);
          case j:
            e: {
              for (Ie = ee.key; I !== null; ) {
                if (I.key === Ie)
                  if (I.tag === 4 && I.stateNode.containerInfo === ee.containerInfo && I.stateNode.implementation === ee.implementation) {
                    r(
                      X,
                      I.sibling
                    ), me = d(I, ee.children || []), me.return = X, X = me;
                    break e;
                  } else {
                    r(X, I);
                    break;
                  }
                else n(X, I);
                I = I.sibling;
              }
              me = Cu(ee, X.mode, me), me.return = X, X = me;
            }
            return x(X);
          case M:
            return ee = Ir(ee), Ct(
              X,
              I,
              ee,
              me
            );
        }
        if (ie(ee))
          return ze(
            X,
            I,
            ee,
            me
          );
        if (Z(ee)) {
          if (Ie = Z(ee), typeof Ie != "function") throw Error(i(150));
          return ee = Ie.call(ee), qe(
            X,
            I,
            ee,
            me
          );
        }
        if (typeof ee.then == "function")
          return Ct(
            X,
            I,
            Wl(ee),
            me
          );
        if (ee.$$typeof === R)
          return Ct(
            X,
            I,
            Xl(X, ee),
            me
          );
        eo(X, ee);
      }
      return typeof ee == "string" && ee !== "" || typeof ee == "number" || typeof ee == "bigint" ? (ee = "" + ee, I !== null && I.tag === 6 ? (r(X, I.sibling), me = d(I, ee), me.return = X, X = me) : (r(X, I), me = Nu(ee, X.mode, me), me.return = X, X = me), x(X)) : r(X, I);
    }
    return function(X, I, ee, me) {
      try {
        wi = 0;
        var Ie = Ct(
          X,
          I,
          ee,
          me
        );
        return ws = null, Ie;
      } catch ($e) {
        if ($e === Ss || $e === Zl) throw $e;
        var mt = Ln(29, $e, null, X.mode);
        return mt.lanes = me, mt.return = X, mt;
      } finally {
      }
    };
  }
  var qr = Np(!0), Cp = Np(!1), Qa = !1;
  function Uu(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Bu(e, n) {
    e = e.updateQueue, n.updateQueue === e && (n.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Za(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Ja(e, n, r) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (vt & 2) !== 0) {
      var d = l.pending;
      return d === null ? n.next = n : (n.next = d.next, d.next = n), l.pending = n, n = Pl(e), cp(e, null, r), n;
    }
    return Fl(e, l, n, r), Pl(e);
  }
  function Ei(e, n, r) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (r & 4194048) !== 0)) {
      var l = n.lanes;
      l &= e.pendingLanes, r |= l, n.lanes = r, ft(e, r);
    }
  }
  function Iu(e, n) {
    var r = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, r === l)) {
      var d = null, h = null;
      if (r = r.firstBaseUpdate, r !== null) {
        do {
          var x = {
            lane: r.lane,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null
          };
          h === null ? d = h = x : h = h.next = x, r = r.next;
        } while (r !== null);
        h === null ? d = h = n : h = h.next = n;
      } else d = h = n;
      r = {
        baseState: l.baseState,
        firstBaseUpdate: d,
        lastBaseUpdate: h,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = r;
      return;
    }
    e = r.lastBaseUpdate, e === null ? r.firstBaseUpdate = n : e.next = n, r.lastBaseUpdate = n;
  }
  var Vu = !1;
  function Ni() {
    if (Vu) {
      var e = xs;
      if (e !== null) throw e;
    }
  }
  function Ci(e, n, r, l) {
    Vu = !1;
    var d = e.updateQueue;
    Qa = !1;
    var h = d.firstBaseUpdate, x = d.lastBaseUpdate, E = d.shared.pending;
    if (E !== null) {
      d.shared.pending = null;
      var L = E, re = L.next;
      L.next = null, x === null ? h = re : x.next = re, x = L;
      var de = e.alternate;
      de !== null && (de = de.updateQueue, E = de.lastBaseUpdate, E !== x && (E === null ? de.firstBaseUpdate = re : E.next = re, de.lastBaseUpdate = L));
    }
    if (h !== null) {
      var pe = d.baseState;
      x = 0, de = re = L = null, E = h;
      do {
        var le = E.lane & -536870913, oe = le !== E.lane;
        if (oe ? (ct & le) === le : (l & le) === le) {
          le !== 0 && le === bs && (Vu = !0), de !== null && (de = de.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var ze = e, qe = E;
            le = n;
            var Ct = r;
            switch (qe.tag) {
              case 1:
                if (ze = qe.payload, typeof ze == "function") {
                  pe = ze.call(Ct, pe, le);
                  break e;
                }
                pe = ze;
                break e;
              case 3:
                ze.flags = ze.flags & -65537 | 128;
              case 0:
                if (ze = qe.payload, le = typeof ze == "function" ? ze.call(Ct, pe, le) : ze, le == null) break e;
                pe = v({}, pe, le);
                break e;
              case 2:
                Qa = !0;
            }
          }
          le = E.callback, le !== null && (e.flags |= 64, oe && (e.flags |= 8192), oe = d.callbacks, oe === null ? d.callbacks = [le] : oe.push(le));
        } else
          oe = {
            lane: le,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          }, de === null ? (re = de = oe, L = pe) : de = de.next = oe, x |= le;
        if (E = E.next, E === null) {
          if (E = d.shared.pending, E === null)
            break;
          oe = E, E = oe.next, oe.next = null, d.lastBaseUpdate = oe, d.shared.pending = null;
        }
      } while (!0);
      de === null && (L = pe), d.baseState = L, d.firstBaseUpdate = re, d.lastBaseUpdate = de, h === null && (d.shared.lanes = 0), ar |= x, e.lanes = x, e.memoizedState = pe;
    }
  }
  function Tp(e, n) {
    if (typeof e != "function")
      throw Error(i(191, e));
    e.call(n);
  }
  function Rp(e, n) {
    var r = e.callbacks;
    if (r !== null)
      for (e.callbacks = null, e = 0; e < r.length; e++)
        Tp(r[e], n);
  }
  var js = k(null), to = k(0);
  function _p(e, n) {
    e = La, ae(to, e), ae(js, n), La = e | n.baseLanes;
  }
  function qu() {
    ae(to, La), ae(js, js.current);
  }
  function Hu() {
    La = to.current, ne(js), ne(to);
  }
  var $n = k(null), Qn = null;
  function Wa(e) {
    var n = e.alternate;
    ae(Yt, Yt.current & 1), ae($n, e), Qn === null && (n === null || js.current !== null || n.memoizedState !== null) && (Qn = e);
  }
  function Fu(e) {
    ae(Yt, Yt.current), ae($n, e), Qn === null && (Qn = e);
  }
  function Mp(e) {
    e.tag === 22 ? (ae(Yt, Yt.current), ae($n, e), Qn === null && (Qn = e)) : er();
  }
  function er() {
    ae(Yt, Yt.current), ae($n, $n.current);
  }
  function Un(e) {
    ne($n), Qn === e && (Qn = null), ne(Yt);
  }
  var Yt = k(0);
  function no(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var r = n.memoizedState;
        if (r !== null && (r = r.dehydrated, r === null || Qd(r) || Zd(r)))
          return n;
      } else if (n.tag === 19 && (n.memoizedProps.revealOrder === "forwards" || n.memoizedProps.revealOrder === "backwards" || n.memoizedProps.revealOrder === "unstable_legacy-backwards" || n.memoizedProps.revealOrder === "together")) {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === e) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === e) return null;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
    return null;
  }
  var Ra = 0, Qe = null, Et = null, Wt = null, ao = !1, Es = !1, Hr = !1, ro = 0, Ti = 0, Ns = null, Dj = 0;
  function Ht() {
    throw Error(i(321));
  }
  function Pu(e, n) {
    if (n === null) return !1;
    for (var r = 0; r < n.length && r < e.length; r++)
      if (!On(e[r], n[r])) return !1;
    return !0;
  }
  function Gu(e, n, r, l, d, h) {
    return Ra = h, Qe = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, A.H = e === null || e.memoizedState === null ? hg : ld, Hr = !1, h = r(l, d), Hr = !1, Es && (h = kp(
      n,
      r,
      l,
      d
    )), Ap(e), h;
  }
  function Ap(e) {
    A.H = Mi;
    var n = Et !== null && Et.next !== null;
    if (Ra = 0, Wt = Et = Qe = null, ao = !1, Ti = 0, Ns = null, n) throw Error(i(300));
    e === null || en || (e = e.dependencies, e !== null && Kl(e) && (en = !0));
  }
  function kp(e, n, r, l) {
    Qe = e;
    var d = 0;
    do {
      if (Es && (Ns = null), Ti = 0, Es = !1, 25 <= d) throw Error(i(301));
      if (d += 1, Wt = Et = null, e.updateQueue != null) {
        var h = e.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      A.H = mg, h = n(r, l);
    } while (Es);
    return h;
  }
  function zj() {
    var e = A.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? Ri(n) : n, e = e.useState()[0], (Et !== null ? Et.memoizedState : null) !== e && (Qe.flags |= 1024), n;
  }
  function Yu() {
    var e = ro !== 0;
    return ro = 0, e;
  }
  function Ku(e, n, r) {
    n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~r;
  }
  function Xu(e) {
    if (ao) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        n !== null && (n.pending = null), e = e.next;
      }
      ao = !1;
    }
    Ra = 0, Wt = Et = Qe = null, Es = !1, Ti = ro = 0, Ns = null;
  }
  function jn() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Wt === null ? Qe.memoizedState = Wt = e : Wt = Wt.next = e, Wt;
  }
  function Kt() {
    if (Et === null) {
      var e = Qe.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Et.next;
    var n = Wt === null ? Qe.memoizedState : Wt.next;
    if (n !== null)
      Wt = n, Et = e;
    else {
      if (e === null)
        throw Qe.alternate === null ? Error(i(467)) : Error(i(310));
      Et = e, e = {
        memoizedState: Et.memoizedState,
        baseState: Et.baseState,
        baseQueue: Et.baseQueue,
        queue: Et.queue,
        next: null
      }, Wt === null ? Qe.memoizedState = Wt = e : Wt = Wt.next = e;
    }
    return Wt;
  }
  function so() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ri(e) {
    var n = Ti;
    return Ti += 1, Ns === null && (Ns = []), e = wp(Ns, e, n), n = Qe, (Wt === null ? n.memoizedState : Wt.next) === null && (n = n.alternate, A.H = n === null || n.memoizedState === null ? hg : ld), e;
  }
  function io(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Ri(e);
      if (e.$$typeof === R) return dn(e);
    }
    throw Error(i(438, String(e)));
  }
  function Qu(e) {
    var n = null, r = Qe.updateQueue;
    if (r !== null && (n = r.memoCache), n == null) {
      var l = Qe.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (n = {
        data: l.data.map(function(d) {
          return d.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), r === null && (r = so(), Qe.updateQueue = r), r.memoCache = n, r = n.data[n.index], r === void 0)
      for (r = n.data[n.index] = Array(e), l = 0; l < e; l++)
        r[l] = D;
    return n.index++, r;
  }
  function _a(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function lo(e) {
    var n = Kt();
    return Zu(n, Et, e);
  }
  function Zu(e, n, r) {
    var l = e.queue;
    if (l === null) throw Error(i(311));
    l.lastRenderedReducer = r;
    var d = e.baseQueue, h = l.pending;
    if (h !== null) {
      if (d !== null) {
        var x = d.next;
        d.next = h.next, h.next = x;
      }
      n.baseQueue = d = h, l.pending = null;
    }
    if (h = e.baseState, d === null) e.memoizedState = h;
    else {
      n = d.next;
      var E = x = null, L = null, re = n, de = !1;
      do {
        var pe = re.lane & -536870913;
        if (pe !== re.lane ? (ct & pe) === pe : (Ra & pe) === pe) {
          var le = re.revertLane;
          if (le === 0)
            L !== null && (L = L.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: re.action,
              hasEagerState: re.hasEagerState,
              eagerState: re.eagerState,
              next: null
            }), pe === bs && (de = !0);
          else if ((Ra & le) === le) {
            re = re.next, le === bs && (de = !0);
            continue;
          } else
            pe = {
              lane: 0,
              revertLane: re.revertLane,
              gesture: null,
              action: re.action,
              hasEagerState: re.hasEagerState,
              eagerState: re.eagerState,
              next: null
            }, L === null ? (E = L = pe, x = h) : L = L.next = pe, Qe.lanes |= le, ar |= le;
          pe = re.action, Hr && r(h, pe), h = re.hasEagerState ? re.eagerState : r(h, pe);
        } else
          le = {
            lane: pe,
            revertLane: re.revertLane,
            gesture: re.gesture,
            action: re.action,
            hasEagerState: re.hasEagerState,
            eagerState: re.eagerState,
            next: null
          }, L === null ? (E = L = le, x = h) : L = L.next = le, Qe.lanes |= pe, ar |= pe;
        re = re.next;
      } while (re !== null && re !== n);
      if (L === null ? x = h : L.next = E, !On(h, e.memoizedState) && (en = !0, de && (r = xs, r !== null)))
        throw r;
      e.memoizedState = h, e.baseState = x, e.baseQueue = L, l.lastRenderedState = h;
    }
    return d === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Ju(e) {
    var n = Kt(), r = n.queue;
    if (r === null) throw Error(i(311));
    r.lastRenderedReducer = e;
    var l = r.dispatch, d = r.pending, h = n.memoizedState;
    if (d !== null) {
      r.pending = null;
      var x = d = d.next;
      do
        h = e(h, x.action), x = x.next;
      while (x !== d);
      On(h, n.memoizedState) || (en = !0), n.memoizedState = h, n.baseQueue === null && (n.baseState = h), r.lastRenderedState = h;
    }
    return [h, l];
  }
  function Dp(e, n, r) {
    var l = Qe, d = Kt(), h = dt;
    if (h) {
      if (r === void 0) throw Error(i(407));
      r = r();
    } else r = n();
    var x = !On(
      (Et || d).memoizedState,
      r
    );
    if (x && (d.memoizedState = r, en = !0), d = d.queue, td(Lp.bind(null, l, d, e), [
      e
    ]), d.getSnapshot !== n || x || Wt !== null && Wt.memoizedState.tag & 1) {
      if (l.flags |= 2048, Cs(
        9,
        { destroy: void 0 },
        Op.bind(
          null,
          l,
          d,
          r,
          n
        ),
        null
      ), _t === null) throw Error(i(349));
      h || (Ra & 127) !== 0 || zp(l, n, r);
    }
    return r;
  }
  function zp(e, n, r) {
    e.flags |= 16384, e = { getSnapshot: n, value: r }, n = Qe.updateQueue, n === null ? (n = so(), Qe.updateQueue = n, n.stores = [e]) : (r = n.stores, r === null ? n.stores = [e] : r.push(e));
  }
  function Op(e, n, r, l) {
    n.value = r, n.getSnapshot = l, $p(n) && Up(e);
  }
  function Lp(e, n, r) {
    return r(function() {
      $p(n) && Up(e);
    });
  }
  function $p(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var r = n();
      return !On(e, r);
    } catch {
      return !0;
    }
  }
  function Up(e) {
    var n = zr(e, 2);
    n !== null && Mn(n, e, 2);
  }
  function Wu(e) {
    var n = jn();
    if (typeof e == "function") {
      var r = e;
      if (e = r(), Hr) {
        Dt(!0);
        try {
          r();
        } finally {
          Dt(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = e, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: _a,
      lastRenderedState: e
    }, n;
  }
  function Bp(e, n, r, l) {
    return e.baseState = r, Zu(
      e,
      Et,
      typeof l == "function" ? l : _a
    );
  }
  function Oj(e, n, r, l, d) {
    if (uo(e)) throw Error(i(485));
    if (e = n.action, e !== null) {
      var h = {
        payload: d,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(x) {
          h.listeners.push(x);
        }
      };
      A.T !== null ? r(!0) : h.isTransition = !1, l(h), r = n.pending, r === null ? (h.next = n.pending = h, Ip(n, h)) : (h.next = r.next, n.pending = r.next = h);
    }
  }
  function Ip(e, n) {
    var r = n.action, l = n.payload, d = e.state;
    if (n.isTransition) {
      var h = A.T, x = {};
      A.T = x;
      try {
        var E = r(d, l), L = A.S;
        L !== null && L(x, E), Vp(e, n, E);
      } catch (re) {
        ed(e, n, re);
      } finally {
        h !== null && x.types !== null && (h.types = x.types), A.T = h;
      }
    } else
      try {
        h = r(d, l), Vp(e, n, h);
      } catch (re) {
        ed(e, n, re);
      }
  }
  function Vp(e, n, r) {
    r !== null && typeof r == "object" && typeof r.then == "function" ? r.then(
      function(l) {
        qp(e, n, l);
      },
      function(l) {
        return ed(e, n, l);
      }
    ) : qp(e, n, r);
  }
  function qp(e, n, r) {
    n.status = "fulfilled", n.value = r, Hp(n), e.state = r, n = e.pending, n !== null && (r = n.next, r === n ? e.pending = null : (r = r.next, n.next = r, Ip(e, r)));
  }
  function ed(e, n, r) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        n.status = "rejected", n.reason = r, Hp(n), n = n.next;
      while (n !== l);
    }
    e.action = null;
  }
  function Hp(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function Fp(e, n) {
    return n;
  }
  function Pp(e, n) {
    if (dt) {
      var r = _t.formState;
      if (r !== null) {
        e: {
          var l = Qe;
          if (dt) {
            if (Ot) {
              t: {
                for (var d = Ot, h = Xn; d.nodeType !== 8; ) {
                  if (!h) {
                    d = null;
                    break t;
                  }
                  if (d = Zn(
                    d.nextSibling
                  ), d === null) {
                    d = null;
                    break t;
                  }
                }
                h = d.data, d = h === "F!" || h === "F" ? d : null;
              }
              if (d) {
                Ot = Zn(
                  d.nextSibling
                ), l = d.data === "F!";
                break e;
              }
            }
            Ka(l);
          }
          l = !1;
        }
        l && (n = r[0]);
      }
    }
    return r = jn(), r.memoizedState = r.baseState = n, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Fp,
      lastRenderedState: n
    }, r.queue = l, r = ug.bind(
      null,
      Qe,
      l
    ), l.dispatch = r, l = Wu(!1), h = id.bind(
      null,
      Qe,
      !1,
      l.queue
    ), l = jn(), d = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = d, r = Oj.bind(
      null,
      Qe,
      d,
      h,
      r
    ), d.dispatch = r, l.memoizedState = e, [n, r, !1];
  }
  function Gp(e) {
    var n = Kt();
    return Yp(n, Et, e);
  }
  function Yp(e, n, r) {
    if (n = Zu(
      e,
      n,
      Fp
    )[0], e = lo(_a)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var l = Ri(n);
      } catch (x) {
        throw x === Ss ? Zl : x;
      }
    else l = n;
    n = Kt();
    var d = n.queue, h = d.dispatch;
    return r !== n.memoizedState && (Qe.flags |= 2048, Cs(
      9,
      { destroy: void 0 },
      Lj.bind(null, d, r),
      null
    )), [l, h, e];
  }
  function Lj(e, n) {
    e.action = n;
  }
  function Kp(e) {
    var n = Kt(), r = Et;
    if (r !== null)
      return Yp(n, r, e);
    Kt(), n = n.memoizedState, r = Kt();
    var l = r.queue.dispatch;
    return r.memoizedState = e, [n, l, !1];
  }
  function Cs(e, n, r, l) {
    return e = { tag: e, create: r, deps: l, inst: n, next: null }, n = Qe.updateQueue, n === null && (n = so(), Qe.updateQueue = n), r = n.lastEffect, r === null ? n.lastEffect = e.next = e : (l = r.next, r.next = e, e.next = l, n.lastEffect = e), e;
  }
  function Xp() {
    return Kt().memoizedState;
  }
  function oo(e, n, r, l) {
    var d = jn();
    Qe.flags |= e, d.memoizedState = Cs(
      1 | n,
      { destroy: void 0 },
      r,
      l === void 0 ? null : l
    );
  }
  function co(e, n, r, l) {
    var d = Kt();
    l = l === void 0 ? null : l;
    var h = d.memoizedState.inst;
    Et !== null && l !== null && Pu(l, Et.memoizedState.deps) ? d.memoizedState = Cs(n, h, r, l) : (Qe.flags |= e, d.memoizedState = Cs(
      1 | n,
      h,
      r,
      l
    ));
  }
  function Qp(e, n) {
    oo(8390656, 8, e, n);
  }
  function td(e, n) {
    co(2048, 8, e, n);
  }
  function $j(e) {
    Qe.flags |= 4;
    var n = Qe.updateQueue;
    if (n === null)
      n = so(), Qe.updateQueue = n, n.events = [e];
    else {
      var r = n.events;
      r === null ? n.events = [e] : r.push(e);
    }
  }
  function Zp(e) {
    var n = Kt().memoizedState;
    return $j({ ref: n, nextImpl: e }), function() {
      if ((vt & 2) !== 0) throw Error(i(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Jp(e, n) {
    return co(4, 2, e, n);
  }
  function Wp(e, n) {
    return co(4, 4, e, n);
  }
  function eg(e, n) {
    if (typeof n == "function") {
      e = e();
      var r = n(e);
      return function() {
        typeof r == "function" ? r() : n(null);
      };
    }
    if (n != null)
      return e = e(), n.current = e, function() {
        n.current = null;
      };
  }
  function tg(e, n, r) {
    r = r != null ? r.concat([e]) : null, co(4, 4, eg.bind(null, n, e), r);
  }
  function nd() {
  }
  function ng(e, n) {
    var r = Kt();
    n = n === void 0 ? null : n;
    var l = r.memoizedState;
    return n !== null && Pu(n, l[1]) ? l[0] : (r.memoizedState = [e, n], e);
  }
  function ag(e, n) {
    var r = Kt();
    n = n === void 0 ? null : n;
    var l = r.memoizedState;
    if (n !== null && Pu(n, l[1]))
      return l[0];
    if (l = e(), Hr) {
      Dt(!0);
      try {
        e();
      } finally {
        Dt(!1);
      }
    }
    return r.memoizedState = [l, n], l;
  }
  function ad(e, n, r) {
    return r === void 0 || (Ra & 1073741824) !== 0 && (ct & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = r, e = rv(), Qe.lanes |= e, ar |= e, r);
  }
  function rg(e, n, r, l) {
    return On(r, n) ? r : js.current !== null ? (e = ad(e, r, l), On(e, n) || (en = !0), e) : (Ra & 42) === 0 || (Ra & 1073741824) !== 0 && (ct & 261930) === 0 ? (en = !0, e.memoizedState = r) : (e = rv(), Qe.lanes |= e, ar |= e, n);
  }
  function sg(e, n, r, l, d) {
    var h = V.p;
    V.p = h !== 0 && 8 > h ? h : 8;
    var x = A.T, E = {};
    A.T = E, id(e, !1, n, r);
    try {
      var L = d(), re = A.S;
      if (re !== null && re(E, L), L !== null && typeof L == "object" && typeof L.then == "function") {
        var de = kj(
          L,
          l
        );
        _i(
          e,
          n,
          de,
          Vn(e)
        );
      } else
        _i(
          e,
          n,
          l,
          Vn(e)
        );
    } catch (pe) {
      _i(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: pe },
        Vn()
      );
    } finally {
      V.p = h, x !== null && E.types !== null && (x.types = E.types), A.T = x;
    }
  }
  function Uj() {
  }
  function rd(e, n, r, l) {
    if (e.tag !== 5) throw Error(i(476));
    var d = ig(e).queue;
    sg(
      e,
      d,
      n,
      $,
      r === null ? Uj : function() {
        return lg(e), r(l);
      }
    );
  }
  function ig(e) {
    var n = e.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: $,
      baseState: $,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: _a,
        lastRenderedState: $
      },
      next: null
    };
    var r = {};
    return n.next = {
      memoizedState: r,
      baseState: r,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: _a,
        lastRenderedState: r
      },
      next: null
    }, e.memoizedState = n, e = e.alternate, e !== null && (e.memoizedState = n), n;
  }
  function lg(e) {
    var n = ig(e);
    n.next === null && (n = e.alternate.memoizedState), _i(
      e,
      n.next.queue,
      {},
      Vn()
    );
  }
  function sd() {
    return dn(Gi);
  }
  function og() {
    return Kt().memoizedState;
  }
  function cg() {
    return Kt().memoizedState;
  }
  function Bj(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var r = Vn();
          e = Za(r);
          var l = Ja(n, e, r);
          l !== null && (Mn(l, n, r), Ei(l, n, r)), n = { cache: zu() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function Ij(e, n, r) {
    var l = Vn();
    r = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, uo(e) ? dg(n, r) : (r = ju(e, n, r, l), r !== null && (Mn(r, e, l), fg(r, n, l)));
  }
  function ug(e, n, r) {
    var l = Vn();
    _i(e, n, r, l);
  }
  function _i(e, n, r, l) {
    var d = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (uo(e)) dg(n, d);
    else {
      var h = e.alternate;
      if (e.lanes === 0 && (h === null || h.lanes === 0) && (h = n.lastRenderedReducer, h !== null))
        try {
          var x = n.lastRenderedState, E = h(x, r);
          if (d.hasEagerState = !0, d.eagerState = E, On(E, x))
            return Fl(e, n, d, 0), _t === null && Hl(), !1;
        } catch {
        } finally {
        }
      if (r = ju(e, n, d, l), r !== null)
        return Mn(r, e, l), fg(r, n, l), !0;
    }
    return !1;
  }
  function id(e, n, r, l) {
    if (l = {
      lane: 2,
      revertLane: Ud(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, uo(e)) {
      if (n) throw Error(i(479));
    } else
      n = ju(
        e,
        r,
        l,
        2
      ), n !== null && Mn(n, e, 2);
  }
  function uo(e) {
    var n = e.alternate;
    return e === Qe || n !== null && n === Qe;
  }
  function dg(e, n) {
    Es = ao = !0;
    var r = e.pending;
    r === null ? n.next = n : (n.next = r.next, r.next = n), e.pending = n;
  }
  function fg(e, n, r) {
    if ((r & 4194048) !== 0) {
      var l = n.lanes;
      l &= e.pendingLanes, r |= l, n.lanes = r, ft(e, r);
    }
  }
  var Mi = {
    readContext: dn,
    use: io,
    useCallback: Ht,
    useContext: Ht,
    useEffect: Ht,
    useImperativeHandle: Ht,
    useLayoutEffect: Ht,
    useInsertionEffect: Ht,
    useMemo: Ht,
    useReducer: Ht,
    useRef: Ht,
    useState: Ht,
    useDebugValue: Ht,
    useDeferredValue: Ht,
    useTransition: Ht,
    useSyncExternalStore: Ht,
    useId: Ht,
    useHostTransitionStatus: Ht,
    useFormState: Ht,
    useActionState: Ht,
    useOptimistic: Ht,
    useMemoCache: Ht,
    useCacheRefresh: Ht
  };
  Mi.useEffectEvent = Ht;
  var hg = {
    readContext: dn,
    use: io,
    useCallback: function(e, n) {
      return jn().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: dn,
    useEffect: Qp,
    useImperativeHandle: function(e, n, r) {
      r = r != null ? r.concat([e]) : null, oo(
        4194308,
        4,
        eg.bind(null, n, e),
        r
      );
    },
    useLayoutEffect: function(e, n) {
      return oo(4194308, 4, e, n);
    },
    useInsertionEffect: function(e, n) {
      oo(4, 2, e, n);
    },
    useMemo: function(e, n) {
      var r = jn();
      n = n === void 0 ? null : n;
      var l = e();
      if (Hr) {
        Dt(!0);
        try {
          e();
        } finally {
          Dt(!1);
        }
      }
      return r.memoizedState = [l, n], l;
    },
    useReducer: function(e, n, r) {
      var l = jn();
      if (r !== void 0) {
        var d = r(n);
        if (Hr) {
          Dt(!0);
          try {
            r(n);
          } finally {
            Dt(!1);
          }
        }
      } else d = n;
      return l.memoizedState = l.baseState = d, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: d
      }, l.queue = e, e = e.dispatch = Ij.bind(
        null,
        Qe,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var n = jn();
      return e = { current: e }, n.memoizedState = e;
    },
    useState: function(e) {
      e = Wu(e);
      var n = e.queue, r = ug.bind(null, Qe, n);
      return n.dispatch = r, [e.memoizedState, r];
    },
    useDebugValue: nd,
    useDeferredValue: function(e, n) {
      var r = jn();
      return ad(r, e, n);
    },
    useTransition: function() {
      var e = Wu(!1);
      return e = sg.bind(
        null,
        Qe,
        e.queue,
        !0,
        !1
      ), jn().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, r) {
      var l = Qe, d = jn();
      if (dt) {
        if (r === void 0)
          throw Error(i(407));
        r = r();
      } else {
        if (r = n(), _t === null)
          throw Error(i(349));
        (ct & 127) !== 0 || zp(l, n, r);
      }
      d.memoizedState = r;
      var h = { value: r, getSnapshot: n };
      return d.queue = h, Qp(Lp.bind(null, l, h, e), [
        e
      ]), l.flags |= 2048, Cs(
        9,
        { destroy: void 0 },
        Op.bind(
          null,
          l,
          h,
          r,
          n
        ),
        null
      ), r;
    },
    useId: function() {
      var e = jn(), n = _t.identifierPrefix;
      if (dt) {
        var r = va, l = ga;
        r = (l & ~(1 << 32 - Bt(l) - 1)).toString(32) + r, n = "_" + n + "R_" + r, r = ro++, 0 < r && (n += "H" + r.toString(32)), n += "_";
      } else
        r = Dj++, n = "_" + n + "r_" + r.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: sd,
    useFormState: Pp,
    useActionState: Pp,
    useOptimistic: function(e) {
      var n = jn();
      n.memoizedState = n.baseState = e;
      var r = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = r, n = id.bind(
        null,
        Qe,
        !0,
        r
      ), r.dispatch = n, [e, n];
    },
    useMemoCache: Qu,
    useCacheRefresh: function() {
      return jn().memoizedState = Bj.bind(
        null,
        Qe
      );
    },
    useEffectEvent: function(e) {
      var n = jn(), r = { impl: e };
      return n.memoizedState = r, function() {
        if ((vt & 2) !== 0)
          throw Error(i(440));
        return r.impl.apply(void 0, arguments);
      };
    }
  }, ld = {
    readContext: dn,
    use: io,
    useCallback: ng,
    useContext: dn,
    useEffect: td,
    useImperativeHandle: tg,
    useInsertionEffect: Jp,
    useLayoutEffect: Wp,
    useMemo: ag,
    useReducer: lo,
    useRef: Xp,
    useState: function() {
      return lo(_a);
    },
    useDebugValue: nd,
    useDeferredValue: function(e, n) {
      var r = Kt();
      return rg(
        r,
        Et.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = lo(_a)[0], n = Kt().memoizedState;
      return [
        typeof e == "boolean" ? e : Ri(e),
        n
      ];
    },
    useSyncExternalStore: Dp,
    useId: og,
    useHostTransitionStatus: sd,
    useFormState: Gp,
    useActionState: Gp,
    useOptimistic: function(e, n) {
      var r = Kt();
      return Bp(r, Et, e, n);
    },
    useMemoCache: Qu,
    useCacheRefresh: cg
  };
  ld.useEffectEvent = Zp;
  var mg = {
    readContext: dn,
    use: io,
    useCallback: ng,
    useContext: dn,
    useEffect: td,
    useImperativeHandle: tg,
    useInsertionEffect: Jp,
    useLayoutEffect: Wp,
    useMemo: ag,
    useReducer: Ju,
    useRef: Xp,
    useState: function() {
      return Ju(_a);
    },
    useDebugValue: nd,
    useDeferredValue: function(e, n) {
      var r = Kt();
      return Et === null ? ad(r, e, n) : rg(
        r,
        Et.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = Ju(_a)[0], n = Kt().memoizedState;
      return [
        typeof e == "boolean" ? e : Ri(e),
        n
      ];
    },
    useSyncExternalStore: Dp,
    useId: og,
    useHostTransitionStatus: sd,
    useFormState: Kp,
    useActionState: Kp,
    useOptimistic: function(e, n) {
      var r = Kt();
      return Et !== null ? Bp(r, Et, e, n) : (r.baseState = e, [e, r.queue.dispatch]);
    },
    useMemoCache: Qu,
    useCacheRefresh: cg
  };
  mg.useEffectEvent = Zp;
  function od(e, n, r, l) {
    n = e.memoizedState, r = r(l, n), r = r == null ? n : v({}, n, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
  }
  var cd = {
    enqueueSetState: function(e, n, r) {
      e = e._reactInternals;
      var l = Vn(), d = Za(l);
      d.payload = n, r != null && (d.callback = r), n = Ja(e, d, l), n !== null && (Mn(n, e, l), Ei(n, e, l));
    },
    enqueueReplaceState: function(e, n, r) {
      e = e._reactInternals;
      var l = Vn(), d = Za(l);
      d.tag = 1, d.payload = n, r != null && (d.callback = r), n = Ja(e, d, l), n !== null && (Mn(n, e, l), Ei(n, e, l));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var r = Vn(), l = Za(r);
      l.tag = 2, n != null && (l.callback = n), n = Ja(e, l, r), n !== null && (Mn(n, e, r), Ei(n, e, r));
    }
  };
  function pg(e, n, r, l, d, h, x) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, h, x) : n.prototype && n.prototype.isPureReactComponent ? !gi(r, l) || !gi(d, h) : !0;
  }
  function gg(e, n, r, l) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(r, l), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(r, l), n.state !== e && cd.enqueueReplaceState(n, n.state, null);
  }
  function Fr(e, n) {
    var r = n;
    if ("ref" in n) {
      r = {};
      for (var l in n)
        l !== "ref" && (r[l] = n[l]);
    }
    if (e = e.defaultProps) {
      r === n && (r = v({}, r));
      for (var d in e)
        r[d] === void 0 && (r[d] = e[d]);
    }
    return r;
  }
  function vg(e) {
    ql(e);
  }
  function yg(e) {
    console.error(e);
  }
  function bg(e) {
    ql(e);
  }
  function fo(e, n) {
    try {
      var r = e.onUncaughtError;
      r(n.value, { componentStack: n.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function xg(e, n, r) {
    try {
      var l = e.onCaughtError;
      l(r.value, {
        componentStack: r.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (d) {
      setTimeout(function() {
        throw d;
      });
    }
  }
  function ud(e, n, r) {
    return r = Za(r), r.tag = 3, r.payload = { element: null }, r.callback = function() {
      fo(e, n);
    }, r;
  }
  function Sg(e) {
    return e = Za(e), e.tag = 3, e;
  }
  function wg(e, n, r, l) {
    var d = r.type.getDerivedStateFromError;
    if (typeof d == "function") {
      var h = l.value;
      e.payload = function() {
        return d(h);
      }, e.callback = function() {
        xg(n, r, l);
      };
    }
    var x = r.stateNode;
    x !== null && typeof x.componentDidCatch == "function" && (e.callback = function() {
      xg(n, r, l), typeof d != "function" && (rr === null ? rr = /* @__PURE__ */ new Set([this]) : rr.add(this));
      var E = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function Vj(e, n, r, l, d) {
    if (r.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (n = r.alternate, n !== null && ys(
        n,
        r,
        d,
        !0
      ), r = $n.current, r !== null) {
        switch (r.tag) {
          case 31:
          case 13:
            return Qn === null ? Eo() : r.alternate === null && Ft === 0 && (Ft = 3), r.flags &= -257, r.flags |= 65536, r.lanes = d, l === Jl ? r.flags |= 16384 : (n = r.updateQueue, n === null ? r.updateQueue = /* @__PURE__ */ new Set([l]) : n.add(l), Od(e, l, d)), !1;
          case 22:
            return r.flags |= 65536, l === Jl ? r.flags |= 16384 : (n = r.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, r.updateQueue = n) : (r = n.retryQueue, r === null ? n.retryQueue = /* @__PURE__ */ new Set([l]) : r.add(l)), Od(e, l, d)), !1;
        }
        throw Error(i(435, r.tag));
      }
      return Od(e, l, d), Eo(), !1;
    }
    if (dt)
      return n = $n.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = d, l !== _u && (e = Error(i(422), { cause: l }), bi(Gn(e, r)))) : (l !== _u && (n = Error(i(423), {
        cause: l
      }), bi(
        Gn(n, r)
      )), e = e.current.alternate, e.flags |= 65536, d &= -d, e.lanes |= d, l = Gn(l, r), d = ud(
        e.stateNode,
        l,
        d
      ), Iu(e, d), Ft !== 4 && (Ft = 2)), !1;
    var h = Error(i(520), { cause: l });
    if (h = Gn(h, r), Ui === null ? Ui = [h] : Ui.push(h), Ft !== 4 && (Ft = 2), n === null) return !0;
    l = Gn(l, r), r = n;
    do {
      switch (r.tag) {
        case 3:
          return r.flags |= 65536, e = d & -d, r.lanes |= e, e = ud(r.stateNode, l, e), Iu(r, e), !1;
        case 1:
          if (n = r.type, h = r.stateNode, (r.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (rr === null || !rr.has(h))))
            return r.flags |= 65536, d &= -d, r.lanes |= d, d = Sg(d), wg(
              d,
              e,
              r,
              l
            ), Iu(r, d), !1;
      }
      r = r.return;
    } while (r !== null);
    return !1;
  }
  var dd = Error(i(461)), en = !1;
  function fn(e, n, r, l) {
    n.child = e === null ? Cp(n, null, r, l) : qr(
      n,
      e.child,
      r,
      l
    );
  }
  function jg(e, n, r, l, d) {
    r = r.render;
    var h = n.ref;
    if ("ref" in l) {
      var x = {};
      for (var E in l)
        E !== "ref" && (x[E] = l[E]);
    } else x = l;
    return Ur(n), l = Gu(
      e,
      n,
      r,
      x,
      h,
      d
    ), E = Yu(), e !== null && !en ? (Ku(e, n, d), Ma(e, n, d)) : (dt && E && Tu(n), n.flags |= 1, fn(e, n, l, d), n.child);
  }
  function Eg(e, n, r, l, d) {
    if (e === null) {
      var h = r.type;
      return typeof h == "function" && !Eu(h) && h.defaultProps === void 0 && r.compare === null ? (n.tag = 15, n.type = h, Ng(
        e,
        n,
        h,
        l,
        d
      )) : (e = Gl(
        r.type,
        null,
        l,
        n,
        n.mode,
        d
      ), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (h = e.child, !bd(e, d)) {
      var x = h.memoizedProps;
      if (r = r.compare, r = r !== null ? r : gi, r(x, l) && e.ref === n.ref)
        return Ma(e, n, d);
    }
    return n.flags |= 1, e = Ea(h, l), e.ref = n.ref, e.return = n, n.child = e;
  }
  function Ng(e, n, r, l, d) {
    if (e !== null) {
      var h = e.memoizedProps;
      if (gi(h, l) && e.ref === n.ref)
        if (en = !1, n.pendingProps = l = h, bd(e, d))
          (e.flags & 131072) !== 0 && (en = !0);
        else
          return n.lanes = e.lanes, Ma(e, n, d);
    }
    return fd(
      e,
      n,
      r,
      l,
      d
    );
  }
  function Cg(e, n, r, l) {
    var d = l.children, h = e !== null ? e.memoizedState : null;
    if (e === null && n.stateNode === null && (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (h = h !== null ? h.baseLanes | r : r, e !== null) {
          for (l = n.child = e.child, d = 0; l !== null; )
            d = d | l.lanes | l.childLanes, l = l.sibling;
          l = d & ~h;
        } else l = 0, n.child = null;
        return Tg(
          e,
          n,
          h,
          r,
          l
        );
      }
      if ((r & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Ql(
          n,
          h !== null ? h.cachePool : null
        ), h !== null ? _p(n, h) : qu(), Mp(n);
      else
        return l = n.lanes = 536870912, Tg(
          e,
          n,
          h !== null ? h.baseLanes | r : r,
          r,
          l
        );
    } else
      h !== null ? (Ql(n, h.cachePool), _p(n, h), er(), n.memoizedState = null) : (e !== null && Ql(n, null), qu(), er());
    return fn(e, n, d, r), n.child;
  }
  function Ai(e, n) {
    return e !== null && e.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function Tg(e, n, r, l, d) {
    var h = Lu();
    return h = h === null ? null : { parent: Jt._currentValue, pool: h }, n.memoizedState = {
      baseLanes: r,
      cachePool: h
    }, e !== null && Ql(n, null), qu(), Mp(n), e !== null && ys(e, n, l, !0), n.childLanes = d, null;
  }
  function ho(e, n) {
    return n = po(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function Rg(e, n, r) {
    return qr(n, e.child, null, r), e = ho(n, n.pendingProps), e.flags |= 2, Un(n), n.memoizedState = null, e;
  }
  function qj(e, n, r) {
    var l = n.pendingProps, d = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (dt) {
        if (l.mode === "hidden")
          return e = ho(n, l), n.lanes = 536870912, Ai(null, e);
        if (Fu(n), (e = Ot) ? (e = Iv(
          e,
          Xn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Ga !== null ? { id: ga, overflow: va } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = dp(e), r.return = n, n.child = r, un = n, Ot = null)) : e = null, e === null) throw Ka(n);
        return n.lanes = 536870912, null;
      }
      return ho(n, l);
    }
    var h = e.memoizedState;
    if (h !== null) {
      var x = h.dehydrated;
      if (Fu(n), d)
        if (n.flags & 256)
          n.flags &= -257, n = Rg(
            e,
            n,
            r
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(i(558));
      else if (en || ys(e, n, r, !1), d = (r & e.childLanes) !== 0, en || d) {
        if (l = _t, l !== null && (x = z(l, r), x !== 0 && x !== h.retryLane))
          throw h.retryLane = x, zr(e, x), Mn(l, e, x), dd;
        Eo(), n = Rg(
          e,
          n,
          r
        );
      } else
        e = h.treeContext, Ot = Zn(x.nextSibling), un = n, dt = !0, Ya = null, Xn = !1, e !== null && mp(n, e), n = ho(n, l), n.flags |= 4096;
      return n;
    }
    return e = Ea(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = n.ref, n.child = e, e.return = n, e;
  }
  function mo(e, n) {
    var r = n.ref;
    if (r === null)
      e !== null && e.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof r != "function" && typeof r != "object")
        throw Error(i(284));
      (e === null || e.ref !== r) && (n.flags |= 4194816);
    }
  }
  function fd(e, n, r, l, d) {
    return Ur(n), r = Gu(
      e,
      n,
      r,
      l,
      void 0,
      d
    ), l = Yu(), e !== null && !en ? (Ku(e, n, d), Ma(e, n, d)) : (dt && l && Tu(n), n.flags |= 1, fn(e, n, r, d), n.child);
  }
  function _g(e, n, r, l, d, h) {
    return Ur(n), n.updateQueue = null, r = kp(
      n,
      l,
      r,
      d
    ), Ap(e), l = Yu(), e !== null && !en ? (Ku(e, n, h), Ma(e, n, h)) : (dt && l && Tu(n), n.flags |= 1, fn(e, n, r, h), n.child);
  }
  function Mg(e, n, r, l, d) {
    if (Ur(n), n.stateNode === null) {
      var h = ms, x = r.contextType;
      typeof x == "object" && x !== null && (h = dn(x)), h = new r(l, h), n.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, h.updater = cd, n.stateNode = h, h._reactInternals = n, h = n.stateNode, h.props = l, h.state = n.memoizedState, h.refs = {}, Uu(n), x = r.contextType, h.context = typeof x == "object" && x !== null ? dn(x) : ms, h.state = n.memoizedState, x = r.getDerivedStateFromProps, typeof x == "function" && (od(
        n,
        r,
        x,
        l
      ), h.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (x = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), x !== h.state && cd.enqueueReplaceState(h, h.state, null), Ci(n, l, h, d), Ni(), h.state = n.memoizedState), typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !0;
    } else if (e === null) {
      h = n.stateNode;
      var E = n.memoizedProps, L = Fr(r, E);
      h.props = L;
      var re = h.context, de = r.contextType;
      x = ms, typeof de == "object" && de !== null && (x = dn(de));
      var pe = r.getDerivedStateFromProps;
      de = typeof pe == "function" || typeof h.getSnapshotBeforeUpdate == "function", E = n.pendingProps !== E, de || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (E || re !== x) && gg(
        n,
        h,
        l,
        x
      ), Qa = !1;
      var le = n.memoizedState;
      h.state = le, Ci(n, l, h, d), Ni(), re = n.memoizedState, E || le !== re || Qa ? (typeof pe == "function" && (od(
        n,
        r,
        pe,
        l
      ), re = n.memoizedState), (L = Qa || pg(
        n,
        r,
        L,
        l,
        le,
        re,
        x
      )) ? (de || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = l, n.memoizedState = re), h.props = l, h.state = re, h.context = x, l = L) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !1);
    } else {
      h = n.stateNode, Bu(e, n), x = n.memoizedProps, de = Fr(r, x), h.props = de, pe = n.pendingProps, le = h.context, re = r.contextType, L = ms, typeof re == "object" && re !== null && (L = dn(re)), E = r.getDerivedStateFromProps, (re = typeof E == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (x !== pe || le !== L) && gg(
        n,
        h,
        l,
        L
      ), Qa = !1, le = n.memoizedState, h.state = le, Ci(n, l, h, d), Ni();
      var oe = n.memoizedState;
      x !== pe || le !== oe || Qa || e !== null && e.dependencies !== null && Kl(e.dependencies) ? (typeof E == "function" && (od(
        n,
        r,
        E,
        l
      ), oe = n.memoizedState), (de = Qa || pg(
        n,
        r,
        de,
        l,
        le,
        oe,
        L
      ) || e !== null && e.dependencies !== null && Kl(e.dependencies)) ? (re || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(l, oe, L), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(
        l,
        oe,
        L
      )), typeof h.componentDidUpdate == "function" && (n.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || x === e.memoizedProps && le === e.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && le === e.memoizedState || (n.flags |= 1024), n.memoizedProps = l, n.memoizedState = oe), h.props = l, h.state = oe, h.context = L, l = de) : (typeof h.componentDidUpdate != "function" || x === e.memoizedProps && le === e.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && le === e.memoizedState || (n.flags |= 1024), l = !1);
    }
    return h = l, mo(e, n), l = (n.flags & 128) !== 0, h || l ? (h = n.stateNode, r = l && typeof r.getDerivedStateFromError != "function" ? null : h.render(), n.flags |= 1, e !== null && l ? (n.child = qr(
      n,
      e.child,
      null,
      d
    ), n.child = qr(
      n,
      null,
      r,
      d
    )) : fn(e, n, r, d), n.memoizedState = h.state, e = n.child) : e = Ma(
      e,
      n,
      d
    ), e;
  }
  function Ag(e, n, r, l) {
    return Lr(), n.flags |= 256, fn(e, n, r, l), n.child;
  }
  var hd = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function md(e) {
    return { baseLanes: e, cachePool: xp() };
  }
  function pd(e, n, r) {
    return e = e !== null ? e.childLanes & ~r : 0, n && (e |= In), e;
  }
  function kg(e, n, r) {
    var l = n.pendingProps, d = !1, h = (n.flags & 128) !== 0, x;
    if ((x = h) || (x = e !== null && e.memoizedState === null ? !1 : (Yt.current & 2) !== 0), x && (d = !0, n.flags &= -129), x = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (dt) {
        if (d ? Wa(n) : er(), (e = Ot) ? (e = Iv(
          e,
          Xn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Ga !== null ? { id: ga, overflow: va } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = dp(e), r.return = n, n.child = r, un = n, Ot = null)) : e = null, e === null) throw Ka(n);
        return Zd(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var E = l.children;
      return l = l.fallback, d ? (er(), d = n.mode, E = po(
        { mode: "hidden", children: E },
        d
      ), l = Or(
        l,
        d,
        r,
        null
      ), E.return = n, l.return = n, E.sibling = l, n.child = E, l = n.child, l.memoizedState = md(r), l.childLanes = pd(
        e,
        x,
        r
      ), n.memoizedState = hd, Ai(null, l)) : (Wa(n), gd(n, E));
    }
    var L = e.memoizedState;
    if (L !== null && (E = L.dehydrated, E !== null)) {
      if (h)
        n.flags & 256 ? (Wa(n), n.flags &= -257, n = vd(
          e,
          n,
          r
        )) : n.memoizedState !== null ? (er(), n.child = e.child, n.flags |= 128, n = null) : (er(), E = l.fallback, d = n.mode, l = po(
          { mode: "visible", children: l.children },
          d
        ), E = Or(
          E,
          d,
          r,
          null
        ), E.flags |= 2, l.return = n, E.return = n, l.sibling = E, n.child = l, qr(
          n,
          e.child,
          null,
          r
        ), l = n.child, l.memoizedState = md(r), l.childLanes = pd(
          e,
          x,
          r
        ), n.memoizedState = hd, n = Ai(null, l));
      else if (Wa(n), Zd(E)) {
        if (x = E.nextSibling && E.nextSibling.dataset, x) var re = x.dgst;
        x = re, l = Error(i(419)), l.stack = "", l.digest = x, bi({ value: l, source: null, stack: null }), n = vd(
          e,
          n,
          r
        );
      } else if (en || ys(e, n, r, !1), x = (r & e.childLanes) !== 0, en || x) {
        if (x = _t, x !== null && (l = z(x, r), l !== 0 && l !== L.retryLane))
          throw L.retryLane = l, zr(e, l), Mn(x, e, l), dd;
        Qd(E) || Eo(), n = vd(
          e,
          n,
          r
        );
      } else
        Qd(E) ? (n.flags |= 192, n.child = e.child, n = null) : (e = L.treeContext, Ot = Zn(
          E.nextSibling
        ), un = n, dt = !0, Ya = null, Xn = !1, e !== null && mp(n, e), n = gd(
          n,
          l.children
        ), n.flags |= 4096);
      return n;
    }
    return d ? (er(), E = l.fallback, d = n.mode, L = e.child, re = L.sibling, l = Ea(L, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = L.subtreeFlags & 65011712, re !== null ? E = Ea(
      re,
      E
    ) : (E = Or(
      E,
      d,
      r,
      null
    ), E.flags |= 2), E.return = n, l.return = n, l.sibling = E, n.child = l, Ai(null, l), l = n.child, E = e.child.memoizedState, E === null ? E = md(r) : (d = E.cachePool, d !== null ? (L = Jt._currentValue, d = d.parent !== L ? { parent: L, pool: L } : d) : d = xp(), E = {
      baseLanes: E.baseLanes | r,
      cachePool: d
    }), l.memoizedState = E, l.childLanes = pd(
      e,
      x,
      r
    ), n.memoizedState = hd, Ai(e.child, l)) : (Wa(n), r = e.child, e = r.sibling, r = Ea(r, {
      mode: "visible",
      children: l.children
    }), r.return = n, r.sibling = null, e !== null && (x = n.deletions, x === null ? (n.deletions = [e], n.flags |= 16) : x.push(e)), n.child = r, n.memoizedState = null, r);
  }
  function gd(e, n) {
    return n = po(
      { mode: "visible", children: n },
      e.mode
    ), n.return = e, e.child = n;
  }
  function po(e, n) {
    return e = Ln(22, e, null, n), e.lanes = 0, e;
  }
  function vd(e, n, r) {
    return qr(n, e.child, null, r), e = gd(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function Dg(e, n, r) {
    e.lanes |= n;
    var l = e.alternate;
    l !== null && (l.lanes |= n), ku(e.return, n, r);
  }
  function yd(e, n, r, l, d, h) {
    var x = e.memoizedState;
    x === null ? e.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: r,
      tailMode: d,
      treeForkCount: h
    } : (x.isBackwards = n, x.rendering = null, x.renderingStartTime = 0, x.last = l, x.tail = r, x.tailMode = d, x.treeForkCount = h);
  }
  function zg(e, n, r) {
    var l = n.pendingProps, d = l.revealOrder, h = l.tail;
    l = l.children;
    var x = Yt.current, E = (x & 2) !== 0;
    if (E ? (x = x & 1 | 2, n.flags |= 128) : x &= 1, ae(Yt, x), fn(e, n, l, r), l = dt ? yi : 0, !E && e !== null && (e.flags & 128) !== 0)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Dg(e, r, n);
        else if (e.tag === 19)
          Dg(e, r, n);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === n) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === n)
            break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    switch (d) {
      case "forwards":
        for (r = n.child, d = null; r !== null; )
          e = r.alternate, e !== null && no(e) === null && (d = r), r = r.sibling;
        r = d, r === null ? (d = n.child, n.child = null) : (d = r.sibling, r.sibling = null), yd(
          n,
          !1,
          d,
          r,
          h,
          l
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (r = null, d = n.child, n.child = null; d !== null; ) {
          if (e = d.alternate, e !== null && no(e) === null) {
            n.child = d;
            break;
          }
          e = d.sibling, d.sibling = r, r = d, d = e;
        }
        yd(
          n,
          !0,
          r,
          null,
          h,
          l
        );
        break;
      case "together":
        yd(
          n,
          !1,
          null,
          null,
          void 0,
          l
        );
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function Ma(e, n, r) {
    if (e !== null && (n.dependencies = e.dependencies), ar |= n.lanes, (r & n.childLanes) === 0)
      if (e !== null) {
        if (ys(
          e,
          n,
          r,
          !1
        ), (r & n.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && n.child !== e.child)
      throw Error(i(153));
    if (n.child !== null) {
      for (e = n.child, r = Ea(e, e.pendingProps), n.child = r, r.return = n; e.sibling !== null; )
        e = e.sibling, r = r.sibling = Ea(e, e.pendingProps), r.return = n;
      r.sibling = null;
    }
    return n.child;
  }
  function bd(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Kl(e)));
  }
  function Hj(e, n, r) {
    switch (n.tag) {
      case 3:
        be(n, n.stateNode.containerInfo), Xa(n, Jt, e.memoizedState.cache), Lr();
        break;
      case 27:
      case 5:
        lt(n);
        break;
      case 4:
        be(n, n.stateNode.containerInfo);
        break;
      case 10:
        Xa(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, Fu(n), null;
        break;
      case 13:
        var l = n.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (Wa(n), n.flags |= 128, null) : (r & n.child.childLanes) !== 0 ? kg(e, n, r) : (Wa(n), e = Ma(
            e,
            n,
            r
          ), e !== null ? e.sibling : null);
        Wa(n);
        break;
      case 19:
        var d = (e.flags & 128) !== 0;
        if (l = (r & n.childLanes) !== 0, l || (ys(
          e,
          n,
          r,
          !1
        ), l = (r & n.childLanes) !== 0), d) {
          if (l)
            return zg(
              e,
              n,
              r
            );
          n.flags |= 128;
        }
        if (d = n.memoizedState, d !== null && (d.rendering = null, d.tail = null, d.lastEffect = null), ae(Yt, Yt.current), l) break;
        return null;
      case 22:
        return n.lanes = 0, Cg(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        Xa(n, Jt, e.memoizedState.cache);
    }
    return Ma(e, n, r);
  }
  function Og(e, n, r) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        en = !0;
      else {
        if (!bd(e, r) && (n.flags & 128) === 0)
          return en = !1, Hj(
            e,
            n,
            r
          );
        en = (e.flags & 131072) !== 0;
      }
    else
      en = !1, dt && (n.flags & 1048576) !== 0 && hp(n, yi, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var l = n.pendingProps;
          if (e = Ir(n.elementType), n.type = e, typeof e == "function")
            Eu(e) ? (l = Fr(e, l), n.tag = 1, n = Mg(
              null,
              n,
              e,
              l,
              r
            )) : (n.tag = 0, n = fd(
              null,
              n,
              e,
              l,
              r
            ));
          else {
            if (e != null) {
              var d = e.$$typeof;
              if (d === N) {
                n.tag = 11, n = jg(
                  null,
                  n,
                  e,
                  l,
                  r
                );
                break e;
              } else if (d === te) {
                n.tag = 14, n = Eg(
                  null,
                  n,
                  e,
                  l,
                  r
                );
                break e;
              }
            }
            throw n = P(e) || e, Error(i(306, n, ""));
          }
        }
        return n;
      case 0:
        return fd(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 1:
        return l = n.type, d = Fr(
          l,
          n.pendingProps
        ), Mg(
          e,
          n,
          l,
          d,
          r
        );
      case 3:
        e: {
          if (be(
            n,
            n.stateNode.containerInfo
          ), e === null) throw Error(i(387));
          l = n.pendingProps;
          var h = n.memoizedState;
          d = h.element, Bu(e, n), Ci(n, l, null, r);
          var x = n.memoizedState;
          if (l = x.cache, Xa(n, Jt, l), l !== h.cache && Du(
            n,
            [Jt],
            r,
            !0
          ), Ni(), l = x.element, h.isDehydrated)
            if (h = {
              element: l,
              isDehydrated: !1,
              cache: x.cache
            }, n.updateQueue.baseState = h, n.memoizedState = h, n.flags & 256) {
              n = Ag(
                e,
                n,
                l,
                r
              );
              break e;
            } else if (l !== d) {
              d = Gn(
                Error(i(424)),
                n
              ), bi(d), n = Ag(
                e,
                n,
                l,
                r
              );
              break e;
            } else {
              switch (e = n.stateNode.containerInfo, e.nodeType) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (Ot = Zn(e.firstChild), un = n, dt = !0, Ya = null, Xn = !0, r = Cp(
                n,
                null,
                l,
                r
              ), n.child = r; r; )
                r.flags = r.flags & -3 | 4096, r = r.sibling;
            }
          else {
            if (Lr(), l === d) {
              n = Ma(
                e,
                n,
                r
              );
              break e;
            }
            fn(e, n, l, r);
          }
          n = n.child;
        }
        return n;
      case 26:
        return mo(e, n), e === null ? (r = Gv(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = r : dt || (r = n.type, e = n.pendingProps, l = Ao(
          W.current
        ).createElement(r), l[Se] = n, l[Ee] = e, hn(l, r, e), kt(l), n.stateNode = l) : n.memoizedState = Gv(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return lt(n), e === null && dt && (l = n.stateNode = Hv(
          n.type,
          n.pendingProps,
          W.current
        ), un = n, Xn = !0, d = Ot, or(n.type) ? (Jd = d, Ot = Zn(l.firstChild)) : Ot = d), fn(
          e,
          n,
          n.pendingProps.children,
          r
        ), mo(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && dt && ((d = l = Ot) && (l = bE(
          l,
          n.type,
          n.pendingProps,
          Xn
        ), l !== null ? (n.stateNode = l, un = n, Ot = Zn(l.firstChild), Xn = !1, d = !0) : d = !1), d || Ka(n)), lt(n), d = n.type, h = n.pendingProps, x = e !== null ? e.memoizedProps : null, l = h.children, Yd(d, h) ? l = null : x !== null && Yd(d, x) && (n.flags |= 32), n.memoizedState !== null && (d = Gu(
          e,
          n,
          zj,
          null,
          null,
          r
        ), Gi._currentValue = d), mo(e, n), fn(e, n, l, r), n.child;
      case 6:
        return e === null && dt && ((e = r = Ot) && (r = xE(
          r,
          n.pendingProps,
          Xn
        ), r !== null ? (n.stateNode = r, un = n, Ot = null, e = !0) : e = !1), e || Ka(n)), null;
      case 13:
        return kg(e, n, r);
      case 4:
        return be(
          n,
          n.stateNode.containerInfo
        ), l = n.pendingProps, e === null ? n.child = qr(
          n,
          null,
          l,
          r
        ) : fn(e, n, l, r), n.child;
      case 11:
        return jg(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 7:
        return fn(
          e,
          n,
          n.pendingProps,
          r
        ), n.child;
      case 8:
        return fn(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 12:
        return fn(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 10:
        return l = n.pendingProps, Xa(n, n.type, l.value), fn(e, n, l.children, r), n.child;
      case 9:
        return d = n.type._context, l = n.pendingProps.children, Ur(n), d = dn(d), l = l(d), n.flags |= 1, fn(e, n, l, r), n.child;
      case 14:
        return Eg(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 15:
        return Ng(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 19:
        return zg(e, n, r);
      case 31:
        return qj(e, n, r);
      case 22:
        return Cg(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        return Ur(n), l = dn(Jt), e === null ? (d = Lu(), d === null && (d = _t, h = zu(), d.pooledCache = h, h.refCount++, h !== null && (d.pooledCacheLanes |= r), d = h), n.memoizedState = { parent: l, cache: d }, Uu(n), Xa(n, Jt, d)) : ((e.lanes & r) !== 0 && (Bu(e, n), Ci(n, null, null, r), Ni()), d = e.memoizedState, h = n.memoizedState, d.parent !== l ? (d = { parent: l, cache: l }, n.memoizedState = d, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = d), Xa(n, Jt, l)) : (l = h.cache, Xa(n, Jt, l), l !== d.cache && Du(
          n,
          [Jt],
          r,
          !0
        ))), fn(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(i(156, n.tag));
  }
  function Aa(e) {
    e.flags |= 4;
  }
  function xd(e, n, r, l, d) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (d & 335544128) === d)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (ov()) e.flags |= 8192;
        else
          throw Vr = Jl, $u;
    } else e.flags &= -16777217;
  }
  function Lg(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Zv(n))
      if (ov()) e.flags |= 8192;
      else
        throw Vr = Jl, $u;
  }
  function go(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? ce() : 536870912, e.lanes |= n, Ms |= n);
  }
  function ki(e, n) {
    if (!dt)
      switch (e.tailMode) {
        case "hidden":
          n = e.tail;
          for (var r = null; n !== null; )
            n.alternate !== null && (r = n), n = n.sibling;
          r === null ? e.tail = null : r.sibling = null;
          break;
        case "collapsed":
          r = e.tail;
          for (var l = null; r !== null; )
            r.alternate !== null && (l = r), r = r.sibling;
          l === null ? n || e.tail === null ? e.tail = null : e.tail.sibling = null : l.sibling = null;
      }
  }
  function Lt(e) {
    var n = e.alternate !== null && e.alternate.child === e.child, r = 0, l = 0;
    if (n)
      for (var d = e.child; d !== null; )
        r |= d.lanes | d.childLanes, l |= d.subtreeFlags & 65011712, l |= d.flags & 65011712, d.return = e, d = d.sibling;
    else
      for (d = e.child; d !== null; )
        r |= d.lanes | d.childLanes, l |= d.subtreeFlags, l |= d.flags, d.return = e, d = d.sibling;
    return e.subtreeFlags |= l, e.childLanes = r, n;
  }
  function Fj(e, n, r) {
    var l = n.pendingProps;
    switch (Ru(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Lt(n), null;
      case 1:
        return Lt(n), null;
      case 3:
        return r = n.stateNode, l = null, e !== null && (l = e.memoizedState.cache), n.memoizedState.cache !== l && (n.flags |= 2048), Ta(Jt), Ae(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (vs(n) ? Aa(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Mu())), Lt(n), null;
      case 26:
        var d = n.type, h = n.memoizedState;
        return e === null ? (Aa(n), h !== null ? (Lt(n), Lg(n, h)) : (Lt(n), xd(
          n,
          d,
          null,
          l,
          r
        ))) : h ? h !== e.memoizedState ? (Aa(n), Lt(n), Lg(n, h)) : (Lt(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== l && Aa(n), Lt(n), xd(
          n,
          d,
          e,
          l,
          r
        )), null;
      case 27:
        if (Ne(n), r = W.current, d = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== l && Aa(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(i(166));
            return Lt(n), null;
          }
          e = K.current, vs(n) ? pp(n) : (e = Hv(d, l, r), n.stateNode = e, Aa(n));
        }
        return Lt(n), null;
      case 5:
        if (Ne(n), d = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== l && Aa(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(i(166));
            return Lt(n), null;
          }
          if (h = K.current, vs(n))
            pp(n);
          else {
            var x = Ao(
              W.current
            );
            switch (h) {
              case 1:
                h = x.createElementNS(
                  "http://www.w3.org/2000/svg",
                  d
                );
                break;
              case 2:
                h = x.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  d
                );
                break;
              default:
                switch (d) {
                  case "svg":
                    h = x.createElementNS(
                      "http://www.w3.org/2000/svg",
                      d
                    );
                    break;
                  case "math":
                    h = x.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      d
                    );
                    break;
                  case "script":
                    h = x.createElement("div"), h.innerHTML = "<script><\/script>", h = h.removeChild(
                      h.firstChild
                    );
                    break;
                  case "select":
                    h = typeof l.is == "string" ? x.createElement("select", {
                      is: l.is
                    }) : x.createElement("select"), l.multiple ? h.multiple = !0 : l.size && (h.size = l.size);
                    break;
                  default:
                    h = typeof l.is == "string" ? x.createElement(d, { is: l.is }) : x.createElement(d);
                }
            }
            h[Se] = n, h[Ee] = l;
            e: for (x = n.child; x !== null; ) {
              if (x.tag === 5 || x.tag === 6)
                h.appendChild(x.stateNode);
              else if (x.tag !== 4 && x.tag !== 27 && x.child !== null) {
                x.child.return = x, x = x.child;
                continue;
              }
              if (x === n) break e;
              for (; x.sibling === null; ) {
                if (x.return === null || x.return === n)
                  break e;
                x = x.return;
              }
              x.sibling.return = x.return, x = x.sibling;
            }
            n.stateNode = h;
            e: switch (hn(h, d, l), d) {
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
            l && Aa(n);
          }
        }
        return Lt(n), xd(
          n,
          n.type,
          e === null ? null : e.memoizedProps,
          n.pendingProps,
          r
        ), null;
      case 6:
        if (e && n.stateNode != null)
          e.memoizedProps !== l && Aa(n);
        else {
          if (typeof l != "string" && n.stateNode === null)
            throw Error(i(166));
          if (e = W.current, vs(n)) {
            if (e = n.stateNode, r = n.memoizedProps, l = null, d = un, d !== null)
              switch (d.tag) {
                case 27:
                case 5:
                  l = d.memoizedProps;
              }
            e[Se] = n, e = !!(e.nodeValue === r || l !== null && l.suppressHydrationWarning === !0 || kv(e.nodeValue, r)), e || Ka(n, !0);
          } else
            e = Ao(e).createTextNode(
              l
            ), e[Se] = n, n.stateNode = e;
        }
        return Lt(n), null;
      case 31:
        if (r = n.memoizedState, e === null || e.memoizedState !== null) {
          if (l = vs(n), r !== null) {
            if (e === null) {
              if (!l) throw Error(i(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(557));
              e[Se] = n;
            } else
              Lr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Lt(n), e = !1;
          } else
            r = Mu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = r), e = !0;
          if (!e)
            return n.flags & 256 ? (Un(n), n) : (Un(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(i(558));
        }
        return Lt(n), null;
      case 13:
        if (l = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (d = vs(n), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!d) throw Error(i(318));
              if (d = n.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(i(317));
              d[Se] = n;
            } else
              Lr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Lt(n), d = !1;
          } else
            d = Mu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = d), d = !0;
          if (!d)
            return n.flags & 256 ? (Un(n), n) : (Un(n), null);
        }
        return Un(n), (n.flags & 128) !== 0 ? (n.lanes = r, n) : (r = l !== null, e = e !== null && e.memoizedState !== null, r && (l = n.child, d = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (d = l.alternate.memoizedState.cachePool.pool), h = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (h = l.memoizedState.cachePool.pool), h !== d && (l.flags |= 2048)), r !== e && r && (n.child.flags |= 8192), go(n, n.updateQueue), Lt(n), null);
      case 4:
        return Ae(), e === null && qd(n.stateNode.containerInfo), Lt(n), null;
      case 10:
        return Ta(n.type), Lt(n), null;
      case 19:
        if (ne(Yt), l = n.memoizedState, l === null) return Lt(n), null;
        if (d = (n.flags & 128) !== 0, h = l.rendering, h === null)
          if (d) ki(l, !1);
          else {
            if (Ft !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (h = no(e), h !== null) {
                  for (n.flags |= 128, ki(l, !1), e = h.updateQueue, n.updateQueue = e, go(n, e), n.subtreeFlags = 0, e = r, r = n.child; r !== null; )
                    up(r, e), r = r.sibling;
                  return ae(
                    Yt,
                    Yt.current & 1 | 2
                  ), dt && Na(n, l.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            l.tail !== null && gt() > So && (n.flags |= 128, d = !0, ki(l, !1), n.lanes = 4194304);
          }
        else {
          if (!d)
            if (e = no(h), e !== null) {
              if (n.flags |= 128, d = !0, e = e.updateQueue, n.updateQueue = e, go(n, e), ki(l, !0), l.tail === null && l.tailMode === "hidden" && !h.alternate && !dt)
                return Lt(n), null;
            } else
              2 * gt() - l.renderingStartTime > So && r !== 536870912 && (n.flags |= 128, d = !0, ki(l, !1), n.lanes = 4194304);
          l.isBackwards ? (h.sibling = n.child, n.child = h) : (e = l.last, e !== null ? e.sibling = h : n.child = h, l.last = h);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = gt(), e.sibling = null, r = Yt.current, ae(
          Yt,
          d ? r & 1 | 2 : r & 1
        ), dt && Na(n, l.treeForkCount), e) : (Lt(n), null);
      case 22:
      case 23:
        return Un(n), Hu(), l = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (n.flags |= 8192) : l && (n.flags |= 8192), l ? (r & 536870912) !== 0 && (n.flags & 128) === 0 && (Lt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Lt(n), r = n.updateQueue, r !== null && go(n, r.retryQueue), r = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== r && (n.flags |= 2048), e !== null && ne(Br), null;
      case 24:
        return r = null, e !== null && (r = e.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), Ta(Jt), Lt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(i(156, n.tag));
  }
  function Pj(e, n) {
    switch (Ru(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return Ta(Jt), Ae(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Ne(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (Un(n), n.alternate === null)
            throw Error(i(340));
          Lr();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 13:
        if (Un(n), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(i(340));
          Lr();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return ne(Yt), null;
      case 4:
        return Ae(), null;
      case 10:
        return Ta(n.type), null;
      case 22:
      case 23:
        return Un(n), Hu(), e !== null && ne(Br), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return Ta(Jt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function $g(e, n) {
    switch (Ru(n), n.tag) {
      case 3:
        Ta(Jt), Ae();
        break;
      case 26:
      case 27:
      case 5:
        Ne(n);
        break;
      case 4:
        Ae();
        break;
      case 31:
        n.memoizedState !== null && Un(n);
        break;
      case 13:
        Un(n);
        break;
      case 19:
        ne(Yt);
        break;
      case 10:
        Ta(n.type);
        break;
      case 22:
      case 23:
        Un(n), Hu(), e !== null && ne(Br);
        break;
      case 24:
        Ta(Jt);
    }
  }
  function Di(e, n) {
    try {
      var r = n.updateQueue, l = r !== null ? r.lastEffect : null;
      if (l !== null) {
        var d = l.next;
        r = d;
        do {
          if ((r.tag & e) === e) {
            l = void 0;
            var h = r.create, x = r.inst;
            l = h(), x.destroy = l;
          }
          r = r.next;
        } while (r !== d);
      }
    } catch (E) {
      xt(n, n.return, E);
    }
  }
  function tr(e, n, r) {
    try {
      var l = n.updateQueue, d = l !== null ? l.lastEffect : null;
      if (d !== null) {
        var h = d.next;
        l = h;
        do {
          if ((l.tag & e) === e) {
            var x = l.inst, E = x.destroy;
            if (E !== void 0) {
              x.destroy = void 0, d = n;
              var L = r, re = E;
              try {
                re();
              } catch (de) {
                xt(
                  d,
                  L,
                  de
                );
              }
            }
          }
          l = l.next;
        } while (l !== h);
      }
    } catch (de) {
      xt(n, n.return, de);
    }
  }
  function Ug(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var r = e.stateNode;
      try {
        Rp(n, r);
      } catch (l) {
        xt(e, e.return, l);
      }
    }
  }
  function Bg(e, n, r) {
    r.props = Fr(
      e.type,
      e.memoizedProps
    ), r.state = e.memoizedState;
    try {
      r.componentWillUnmount();
    } catch (l) {
      xt(e, n, l);
    }
  }
  function zi(e, n) {
    try {
      var r = e.ref;
      if (r !== null) {
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
        typeof r == "function" ? e.refCleanup = r(l) : r.current = l;
      }
    } catch (d) {
      xt(e, n, d);
    }
  }
  function ya(e, n) {
    var r = e.ref, l = e.refCleanup;
    if (r !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (d) {
          xt(e, n, d);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof r == "function")
        try {
          r(null);
        } catch (d) {
          xt(e, n, d);
        }
      else r.current = null;
  }
  function Ig(e) {
    var n = e.type, r = e.memoizedProps, l = e.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          r.autoFocus && l.focus();
          break e;
        case "img":
          r.src ? l.src = r.src : r.srcSet && (l.srcset = r.srcSet);
      }
    } catch (d) {
      xt(e, e.return, d);
    }
  }
  function Sd(e, n, r) {
    try {
      var l = e.stateNode;
      hE(l, e.type, r, n), l[Ee] = n;
    } catch (d) {
      xt(e, e.return, d);
    }
  }
  function Vg(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && or(e.type) || e.tag === 4;
  }
  function wd(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Vg(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && or(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function jd(e, n, r) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, n ? (r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r).insertBefore(e, n) : (n = r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r, n.appendChild(e), r = r._reactRootContainer, r != null || n.onclick !== null || (n.onclick = wa));
    else if (l !== 4 && (l === 27 && or(e.type) && (r = e.stateNode, n = null), e = e.child, e !== null))
      for (jd(e, n, r), e = e.sibling; e !== null; )
        jd(e, n, r), e = e.sibling;
  }
  function vo(e, n, r) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, n ? r.insertBefore(e, n) : r.appendChild(e);
    else if (l !== 4 && (l === 27 && or(e.type) && (r = e.stateNode), e = e.child, e !== null))
      for (vo(e, n, r), e = e.sibling; e !== null; )
        vo(e, n, r), e = e.sibling;
  }
  function qg(e) {
    var n = e.stateNode, r = e.memoizedProps;
    try {
      for (var l = e.type, d = n.attributes; d.length; )
        n.removeAttributeNode(d[0]);
      hn(n, l, r), n[Se] = e, n[Ee] = r;
    } catch (h) {
      xt(e, e.return, h);
    }
  }
  var ka = !1, tn = !1, Ed = !1, Hg = typeof WeakSet == "function" ? WeakSet : Set, on = null;
  function Gj(e, n) {
    if (e = e.containerInfo, Pd = Uo, e = tp(e), vu(e)) {
      if ("selectionStart" in e)
        var r = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          r = (r = e.ownerDocument) && r.defaultView || window;
          var l = r.getSelection && r.getSelection();
          if (l && l.rangeCount !== 0) {
            r = l.anchorNode;
            var d = l.anchorOffset, h = l.focusNode;
            l = l.focusOffset;
            try {
              r.nodeType, h.nodeType;
            } catch {
              r = null;
              break e;
            }
            var x = 0, E = -1, L = -1, re = 0, de = 0, pe = e, le = null;
            t: for (; ; ) {
              for (var oe; pe !== r || d !== 0 && pe.nodeType !== 3 || (E = x + d), pe !== h || l !== 0 && pe.nodeType !== 3 || (L = x + l), pe.nodeType === 3 && (x += pe.nodeValue.length), (oe = pe.firstChild) !== null; )
                le = pe, pe = oe;
              for (; ; ) {
                if (pe === e) break t;
                if (le === r && ++re === d && (E = x), le === h && ++de === l && (L = x), (oe = pe.nextSibling) !== null) break;
                pe = le, le = pe.parentNode;
              }
              pe = oe;
            }
            r = E === -1 || L === -1 ? null : { start: E, end: L };
          } else r = null;
        }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (Gd = { focusedElem: e, selectionRange: r }, Uo = !1, on = n; on !== null; )
      if (n = on, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = n, on = e;
      else
        for (; on !== null; ) {
          switch (n = on, h = n.alternate, e = n.flags, n.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = n.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (r = 0; r < e.length; r++)
                  d = e[r], d.ref.impl = d.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && h !== null) {
                e = void 0, r = n, d = h.memoizedProps, h = h.memoizedState, l = r.stateNode;
                try {
                  var ze = Fr(
                    r.type,
                    d
                  );
                  e = l.getSnapshotBeforeUpdate(
                    ze,
                    h
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (qe) {
                  xt(
                    r,
                    r.return,
                    qe
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = n.stateNode.containerInfo, r = e.nodeType, r === 9)
                  Xd(e);
                else if (r === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Xd(e);
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
              if ((e & 1024) !== 0) throw Error(i(163));
          }
          if (e = n.sibling, e !== null) {
            e.return = n.return, on = e;
            break;
          }
          on = n.return;
        }
  }
  function Fg(e, n, r) {
    var l = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 15:
        za(e, r), l & 4 && Di(5, r);
        break;
      case 1:
        if (za(e, r), l & 4)
          if (e = r.stateNode, n === null)
            try {
              e.componentDidMount();
            } catch (x) {
              xt(r, r.return, x);
            }
          else {
            var d = Fr(
              r.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              e.componentDidUpdate(
                d,
                n,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (x) {
              xt(
                r,
                r.return,
                x
              );
            }
          }
        l & 64 && Ug(r), l & 512 && zi(r, r.return);
        break;
      case 3:
        if (za(e, r), l & 64 && (e = r.updateQueue, e !== null)) {
          if (n = null, r.child !== null)
            switch (r.child.tag) {
              case 27:
              case 5:
                n = r.child.stateNode;
                break;
              case 1:
                n = r.child.stateNode;
            }
          try {
            Rp(e, n);
          } catch (x) {
            xt(r, r.return, x);
          }
        }
        break;
      case 27:
        n === null && l & 4 && qg(r);
      case 26:
      case 5:
        za(e, r), n === null && l & 4 && Ig(r), l & 512 && zi(r, r.return);
        break;
      case 12:
        za(e, r);
        break;
      case 31:
        za(e, r), l & 4 && Yg(e, r);
        break;
      case 13:
        za(e, r), l & 4 && Kg(e, r), l & 64 && (e = r.memoizedState, e !== null && (e = e.dehydrated, e !== null && (r = tE.bind(
          null,
          r
        ), SE(e, r))));
        break;
      case 22:
        if (l = r.memoizedState !== null || ka, !l) {
          n = n !== null && n.memoizedState !== null || tn, d = ka;
          var h = tn;
          ka = l, (tn = n) && !h ? Oa(
            e,
            r,
            (r.subtreeFlags & 8772) !== 0
          ) : za(e, r), ka = d, tn = h;
        }
        break;
      case 30:
        break;
      default:
        za(e, r);
    }
  }
  function Pg(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, Pg(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && Rt(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Ut = null, Cn = !1;
  function Da(e, n, r) {
    for (r = r.child; r !== null; )
      Gg(e, n, r), r = r.sibling;
  }
  function Gg(e, n, r) {
    if (Pt && typeof Pt.onCommitFiberUnmount == "function")
      try {
        Pt.onCommitFiberUnmount(pn, r);
      } catch {
      }
    switch (r.tag) {
      case 26:
        tn || ya(r, n), Da(
          e,
          n,
          r
        ), r.memoizedState ? r.memoizedState.count-- : r.stateNode && (r = r.stateNode, r.parentNode.removeChild(r));
        break;
      case 27:
        tn || ya(r, n);
        var l = Ut, d = Cn;
        or(r.type) && (Ut = r.stateNode, Cn = !1), Da(
          e,
          n,
          r
        ), Hi(r.stateNode), Ut = l, Cn = d;
        break;
      case 5:
        tn || ya(r, n);
      case 6:
        if (l = Ut, d = Cn, Ut = null, Da(
          e,
          n,
          r
        ), Ut = l, Cn = d, Ut !== null)
          if (Cn)
            try {
              (Ut.nodeType === 9 ? Ut.body : Ut.nodeName === "HTML" ? Ut.ownerDocument.body : Ut).removeChild(r.stateNode);
            } catch (h) {
              xt(
                r,
                n,
                h
              );
            }
          else
            try {
              Ut.removeChild(r.stateNode);
            } catch (h) {
              xt(
                r,
                n,
                h
              );
            }
        break;
      case 18:
        Ut !== null && (Cn ? (e = Ut, Uv(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          r.stateNode
        ), Us(e)) : Uv(Ut, r.stateNode));
        break;
      case 4:
        l = Ut, d = Cn, Ut = r.stateNode.containerInfo, Cn = !0, Da(
          e,
          n,
          r
        ), Ut = l, Cn = d;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        tr(2, r, n), tn || tr(4, r, n), Da(
          e,
          n,
          r
        );
        break;
      case 1:
        tn || (ya(r, n), l = r.stateNode, typeof l.componentWillUnmount == "function" && Bg(
          r,
          n,
          l
        )), Da(
          e,
          n,
          r
        );
        break;
      case 21:
        Da(
          e,
          n,
          r
        );
        break;
      case 22:
        tn = (l = tn) || r.memoizedState !== null, Da(
          e,
          n,
          r
        ), tn = l;
        break;
      default:
        Da(
          e,
          n,
          r
        );
    }
  }
  function Yg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Us(e);
      } catch (r) {
        xt(n, n.return, r);
      }
    }
  }
  function Kg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Us(e);
      } catch (r) {
        xt(n, n.return, r);
      }
  }
  function Yj(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new Hg()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new Hg()), n;
      default:
        throw Error(i(435, e.tag));
    }
  }
  function yo(e, n) {
    var r = Yj(e);
    n.forEach(function(l) {
      if (!r.has(l)) {
        r.add(l);
        var d = nE.bind(null, e, l);
        l.then(d, d);
      }
    });
  }
  function Tn(e, n) {
    var r = n.deletions;
    if (r !== null)
      for (var l = 0; l < r.length; l++) {
        var d = r[l], h = e, x = n, E = x;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (or(E.type)) {
                Ut = E.stateNode, Cn = !1;
                break e;
              }
              break;
            case 5:
              Ut = E.stateNode, Cn = !1;
              break e;
            case 3:
            case 4:
              Ut = E.stateNode.containerInfo, Cn = !0;
              break e;
          }
          E = E.return;
        }
        if (Ut === null) throw Error(i(160));
        Gg(h, x, d), Ut = null, Cn = !1, h = d.alternate, h !== null && (h.return = null), d.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        Xg(n, e), n = n.sibling;
  }
  var oa = null;
  function Xg(e, n) {
    var r = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Tn(n, e), Rn(e), l & 4 && (tr(3, e, e.return), Di(3, e), tr(5, e, e.return));
        break;
      case 1:
        Tn(n, e), Rn(e), l & 512 && (tn || r === null || ya(r, r.return)), l & 64 && ka && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (r = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = r === null ? l : r.concat(l))));
        break;
      case 26:
        var d = oa;
        if (Tn(n, e), Rn(e), l & 512 && (tn || r === null || ya(r, r.return)), l & 4) {
          var h = r !== null ? r.memoizedState : null;
          if (l = e.memoizedState, r === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, r = e.memoizedProps, d = d.ownerDocument || d;
                  t: switch (l) {
                    case "title":
                      h = d.getElementsByTagName("title")[0], (!h || h[et] || h[Se] || h.namespaceURI === "http://www.w3.org/2000/svg" || h.hasAttribute("itemprop")) && (h = d.createElement(l), d.head.insertBefore(
                        h,
                        d.querySelector("head > title")
                      )), hn(h, l, r), h[Se] = e, kt(h), l = h;
                      break e;
                    case "link":
                      var x = Xv(
                        "link",
                        "href",
                        d
                      ).get(l + (r.href || ""));
                      if (x) {
                        for (var E = 0; E < x.length; E++)
                          if (h = x[E], h.getAttribute("href") === (r.href == null || r.href === "" ? null : r.href) && h.getAttribute("rel") === (r.rel == null ? null : r.rel) && h.getAttribute("title") === (r.title == null ? null : r.title) && h.getAttribute("crossorigin") === (r.crossOrigin == null ? null : r.crossOrigin)) {
                            x.splice(E, 1);
                            break t;
                          }
                      }
                      h = d.createElement(l), hn(h, l, r), d.head.appendChild(h);
                      break;
                    case "meta":
                      if (x = Xv(
                        "meta",
                        "content",
                        d
                      ).get(l + (r.content || ""))) {
                        for (E = 0; E < x.length; E++)
                          if (h = x[E], h.getAttribute("content") === (r.content == null ? null : "" + r.content) && h.getAttribute("name") === (r.name == null ? null : r.name) && h.getAttribute("property") === (r.property == null ? null : r.property) && h.getAttribute("http-equiv") === (r.httpEquiv == null ? null : r.httpEquiv) && h.getAttribute("charset") === (r.charSet == null ? null : r.charSet)) {
                            x.splice(E, 1);
                            break t;
                          }
                      }
                      h = d.createElement(l), hn(h, l, r), d.head.appendChild(h);
                      break;
                    default:
                      throw Error(i(468, l));
                  }
                  h[Se] = e, kt(h), l = h;
                }
                e.stateNode = l;
              } else
                Qv(
                  d,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Kv(
                d,
                l,
                e.memoizedProps
              );
          else
            h !== l ? (h === null ? r.stateNode !== null && (r = r.stateNode, r.parentNode.removeChild(r)) : h.count--, l === null ? Qv(
              d,
              e.type,
              e.stateNode
            ) : Kv(
              d,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && Sd(
              e,
              e.memoizedProps,
              r.memoizedProps
            );
        }
        break;
      case 27:
        Tn(n, e), Rn(e), l & 512 && (tn || r === null || ya(r, r.return)), r !== null && l & 4 && Sd(
          e,
          e.memoizedProps,
          r.memoizedProps
        );
        break;
      case 5:
        if (Tn(n, e), Rn(e), l & 512 && (tn || r === null || ya(r, r.return)), e.flags & 32) {
          d = e.stateNode;
          try {
            ls(d, "");
          } catch (ze) {
            xt(e, e.return, ze);
          }
        }
        l & 4 && e.stateNode != null && (d = e.memoizedProps, Sd(
          e,
          d,
          r !== null ? r.memoizedProps : d
        )), l & 1024 && (Ed = !0);
        break;
      case 6:
        if (Tn(n, e), Rn(e), l & 4) {
          if (e.stateNode === null)
            throw Error(i(162));
          l = e.memoizedProps, r = e.stateNode;
          try {
            r.nodeValue = l;
          } catch (ze) {
            xt(e, e.return, ze);
          }
        }
        break;
      case 3:
        if (zo = null, d = oa, oa = ko(n.containerInfo), Tn(n, e), oa = d, Rn(e), l & 4 && r !== null && r.memoizedState.isDehydrated)
          try {
            Us(n.containerInfo);
          } catch (ze) {
            xt(e, e.return, ze);
          }
        Ed && (Ed = !1, Qg(e));
        break;
      case 4:
        l = oa, oa = ko(
          e.stateNode.containerInfo
        ), Tn(n, e), Rn(e), oa = l;
        break;
      case 12:
        Tn(n, e), Rn(e);
        break;
      case 31:
        Tn(n, e), Rn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, yo(e, l)));
        break;
      case 13:
        Tn(n, e), Rn(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (xo = gt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, yo(e, l)));
        break;
      case 22:
        d = e.memoizedState !== null;
        var L = r !== null && r.memoizedState !== null, re = ka, de = tn;
        if (ka = re || d, tn = de || L, Tn(n, e), tn = de, ka = re, Rn(e), l & 8192)
          e: for (n = e.stateNode, n._visibility = d ? n._visibility & -2 : n._visibility | 1, d && (r === null || L || ka || tn || Pr(e)), r = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (r === null) {
                L = r = n;
                try {
                  if (h = L.stateNode, d)
                    x = h.style, typeof x.setProperty == "function" ? x.setProperty("display", "none", "important") : x.display = "none";
                  else {
                    E = L.stateNode;
                    var pe = L.memoizedProps.style, le = pe != null && pe.hasOwnProperty("display") ? pe.display : null;
                    E.style.display = le == null || typeof le == "boolean" ? "" : ("" + le).trim();
                  }
                } catch (ze) {
                  xt(L, L.return, ze);
                }
              }
            } else if (n.tag === 6) {
              if (r === null) {
                L = n;
                try {
                  L.stateNode.nodeValue = d ? "" : L.memoizedProps;
                } catch (ze) {
                  xt(L, L.return, ze);
                }
              }
            } else if (n.tag === 18) {
              if (r === null) {
                L = n;
                try {
                  var oe = L.stateNode;
                  d ? Bv(oe, !0) : Bv(L.stateNode, !1);
                } catch (ze) {
                  xt(L, L.return, ze);
                }
              }
            } else if ((n.tag !== 22 && n.tag !== 23 || n.memoizedState === null || n === e) && n.child !== null) {
              n.child.return = n, n = n.child;
              continue;
            }
            if (n === e) break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === e) break e;
              r === n && (r = null), n = n.return;
            }
            r === n && (r = null), n.sibling.return = n.return, n = n.sibling;
          }
        l & 4 && (l = e.updateQueue, l !== null && (r = l.retryQueue, r !== null && (l.retryQueue = null, yo(e, r))));
        break;
      case 19:
        Tn(n, e), Rn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, yo(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Tn(n, e), Rn(e);
    }
  }
  function Rn(e) {
    var n = e.flags;
    if (n & 2) {
      try {
        for (var r, l = e.return; l !== null; ) {
          if (Vg(l)) {
            r = l;
            break;
          }
          l = l.return;
        }
        if (r == null) throw Error(i(160));
        switch (r.tag) {
          case 27:
            var d = r.stateNode, h = wd(e);
            vo(e, h, d);
            break;
          case 5:
            var x = r.stateNode;
            r.flags & 32 && (ls(x, ""), r.flags &= -33);
            var E = wd(e);
            vo(e, E, x);
            break;
          case 3:
          case 4:
            var L = r.stateNode.containerInfo, re = wd(e);
            jd(
              e,
              re,
              L
            );
            break;
          default:
            throw Error(i(161));
        }
      } catch (de) {
        xt(e, e.return, de);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function Qg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        Qg(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function za(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Fg(e, n.alternate, n), n = n.sibling;
  }
  function Pr(e) {
    for (e = e.child; e !== null; ) {
      var n = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          tr(4, n, n.return), Pr(n);
          break;
        case 1:
          ya(n, n.return);
          var r = n.stateNode;
          typeof r.componentWillUnmount == "function" && Bg(
            n,
            n.return,
            r
          ), Pr(n);
          break;
        case 27:
          Hi(n.stateNode);
        case 26:
        case 5:
          ya(n, n.return), Pr(n);
          break;
        case 22:
          n.memoizedState === null && Pr(n);
          break;
        case 30:
          Pr(n);
          break;
        default:
          Pr(n);
      }
      e = e.sibling;
    }
  }
  function Oa(e, n, r) {
    for (r = r && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var l = n.alternate, d = e, h = n, x = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          Oa(
            d,
            h,
            r
          ), Di(4, h);
          break;
        case 1:
          if (Oa(
            d,
            h,
            r
          ), l = h, d = l.stateNode, typeof d.componentDidMount == "function")
            try {
              d.componentDidMount();
            } catch (re) {
              xt(l, l.return, re);
            }
          if (l = h, d = l.updateQueue, d !== null) {
            var E = l.stateNode;
            try {
              var L = d.shared.hiddenCallbacks;
              if (L !== null)
                for (d.shared.hiddenCallbacks = null, d = 0; d < L.length; d++)
                  Tp(L[d], E);
            } catch (re) {
              xt(l, l.return, re);
            }
          }
          r && x & 64 && Ug(h), zi(h, h.return);
          break;
        case 27:
          qg(h);
        case 26:
        case 5:
          Oa(
            d,
            h,
            r
          ), r && l === null && x & 4 && Ig(h), zi(h, h.return);
          break;
        case 12:
          Oa(
            d,
            h,
            r
          );
          break;
        case 31:
          Oa(
            d,
            h,
            r
          ), r && x & 4 && Yg(d, h);
          break;
        case 13:
          Oa(
            d,
            h,
            r
          ), r && x & 4 && Kg(d, h);
          break;
        case 22:
          h.memoizedState === null && Oa(
            d,
            h,
            r
          ), zi(h, h.return);
          break;
        case 30:
          break;
        default:
          Oa(
            d,
            h,
            r
          );
      }
      n = n.sibling;
    }
  }
  function Nd(e, n) {
    var r = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== r && (e != null && e.refCount++, r != null && xi(r));
  }
  function Cd(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && xi(e));
  }
  function ca(e, n, r, l) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        Zg(
          e,
          n,
          r,
          l
        ), n = n.sibling;
  }
  function Zg(e, n, r, l) {
    var d = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        ca(
          e,
          n,
          r,
          l
        ), d & 2048 && Di(9, n);
        break;
      case 1:
        ca(
          e,
          n,
          r,
          l
        );
        break;
      case 3:
        ca(
          e,
          n,
          r,
          l
        ), d & 2048 && (e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && xi(e)));
        break;
      case 12:
        if (d & 2048) {
          ca(
            e,
            n,
            r,
            l
          ), e = n.stateNode;
          try {
            var h = n.memoizedProps, x = h.id, E = h.onPostCommit;
            typeof E == "function" && E(
              x,
              n.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (L) {
            xt(n, n.return, L);
          }
        } else
          ca(
            e,
            n,
            r,
            l
          );
        break;
      case 31:
        ca(
          e,
          n,
          r,
          l
        );
        break;
      case 13:
        ca(
          e,
          n,
          r,
          l
        );
        break;
      case 23:
        break;
      case 22:
        h = n.stateNode, x = n.alternate, n.memoizedState !== null ? h._visibility & 2 ? ca(
          e,
          n,
          r,
          l
        ) : Oi(e, n) : h._visibility & 2 ? ca(
          e,
          n,
          r,
          l
        ) : (h._visibility |= 2, Ts(
          e,
          n,
          r,
          l,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), d & 2048 && Nd(x, n);
        break;
      case 24:
        ca(
          e,
          n,
          r,
          l
        ), d & 2048 && Cd(n.alternate, n);
        break;
      default:
        ca(
          e,
          n,
          r,
          l
        );
    }
  }
  function Ts(e, n, r, l, d) {
    for (d = d && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var h = e, x = n, E = r, L = l, re = x.flags;
      switch (x.tag) {
        case 0:
        case 11:
        case 15:
          Ts(
            h,
            x,
            E,
            L,
            d
          ), Di(8, x);
          break;
        case 23:
          break;
        case 22:
          var de = x.stateNode;
          x.memoizedState !== null ? de._visibility & 2 ? Ts(
            h,
            x,
            E,
            L,
            d
          ) : Oi(
            h,
            x
          ) : (de._visibility |= 2, Ts(
            h,
            x,
            E,
            L,
            d
          )), d && re & 2048 && Nd(
            x.alternate,
            x
          );
          break;
        case 24:
          Ts(
            h,
            x,
            E,
            L,
            d
          ), d && re & 2048 && Cd(x.alternate, x);
          break;
        default:
          Ts(
            h,
            x,
            E,
            L,
            d
          );
      }
      n = n.sibling;
    }
  }
  function Oi(e, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var r = e, l = n, d = l.flags;
        switch (l.tag) {
          case 22:
            Oi(r, l), d & 2048 && Nd(
              l.alternate,
              l
            );
            break;
          case 24:
            Oi(r, l), d & 2048 && Cd(l.alternate, l);
            break;
          default:
            Oi(r, l);
        }
        n = n.sibling;
      }
  }
  var Li = 8192;
  function Rs(e, n, r) {
    if (e.subtreeFlags & Li)
      for (e = e.child; e !== null; )
        Jg(
          e,
          n,
          r
        ), e = e.sibling;
  }
  function Jg(e, n, r) {
    switch (e.tag) {
      case 26:
        Rs(
          e,
          n,
          r
        ), e.flags & Li && e.memoizedState !== null && DE(
          r,
          oa,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Rs(
          e,
          n,
          r
        );
        break;
      case 3:
      case 4:
        var l = oa;
        oa = ko(e.stateNode.containerInfo), Rs(
          e,
          n,
          r
        ), oa = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = Li, Li = 16777216, Rs(
          e,
          n,
          r
        ), Li = l) : Rs(
          e,
          n,
          r
        ));
        break;
      default:
        Rs(
          e,
          n,
          r
        );
    }
  }
  function Wg(e) {
    var n = e.alternate;
    if (n !== null && (e = n.child, e !== null)) {
      n.child = null;
      do
        n = e.sibling, e.sibling = null, e = n;
      while (e !== null);
    }
  }
  function $i(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var l = n[r];
          on = l, tv(
            l,
            e
          );
        }
      Wg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        ev(e), e = e.sibling;
  }
  function ev(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        $i(e), e.flags & 2048 && tr(9, e, e.return);
        break;
      case 3:
        $i(e);
        break;
      case 12:
        $i(e);
        break;
      case 22:
        var n = e.stateNode;
        e.memoizedState !== null && n._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (n._visibility &= -3, bo(e)) : $i(e);
        break;
      default:
        $i(e);
    }
  }
  function bo(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var l = n[r];
          on = l, tv(
            l,
            e
          );
        }
      Wg(e);
    }
    for (e = e.child; e !== null; ) {
      switch (n = e, n.tag) {
        case 0:
        case 11:
        case 15:
          tr(8, n, n.return), bo(n);
          break;
        case 22:
          r = n.stateNode, r._visibility & 2 && (r._visibility &= -3, bo(n));
          break;
        default:
          bo(n);
      }
      e = e.sibling;
    }
  }
  function tv(e, n) {
    for (; on !== null; ) {
      var r = on;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          tr(8, r, n);
          break;
        case 23:
        case 22:
          if (r.memoizedState !== null && r.memoizedState.cachePool !== null) {
            var l = r.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          xi(r.memoizedState.cache);
      }
      if (l = r.child, l !== null) l.return = r, on = l;
      else
        e: for (r = e; on !== null; ) {
          l = on;
          var d = l.sibling, h = l.return;
          if (Pg(l), l === r) {
            on = null;
            break e;
          }
          if (d !== null) {
            d.return = h, on = d;
            break e;
          }
          on = h;
        }
    }
  }
  var Kj = {
    getCacheForType: function(e) {
      var n = dn(Jt), r = n.data.get(e);
      return r === void 0 && (r = e(), n.data.set(e, r)), r;
    },
    cacheSignal: function() {
      return dn(Jt).controller.signal;
    }
  }, Xj = typeof WeakMap == "function" ? WeakMap : Map, vt = 0, _t = null, st = null, ct = 0, bt = 0, Bn = null, nr = !1, _s = !1, Td = !1, La = 0, Ft = 0, ar = 0, Gr = 0, Rd = 0, In = 0, Ms = 0, Ui = null, _n = null, _d = !1, xo = 0, nv = 0, So = 1 / 0, wo = null, rr = null, sn = 0, sr = null, As = null, $a = 0, Md = 0, Ad = null, av = null, Bi = 0, kd = null;
  function Vn() {
    return (vt & 2) !== 0 && ct !== 0 ? ct & -ct : A.T !== null ? Ud() : ge();
  }
  function rv() {
    if (In === 0)
      if ((ct & 536870912) === 0 || dt) {
        var e = It;
        It <<= 1, (It & 3932160) === 0 && (It = 262144), In = e;
      } else In = 536870912;
    return e = $n.current, e !== null && (e.flags |= 32), In;
  }
  function Mn(e, n, r) {
    (e === _t && (bt === 2 || bt === 9) || e.cancelPendingCommit !== null) && (ks(e, 0), ir(
      e,
      ct,
      In,
      !1
    )), _e(e, r), ((vt & 2) === 0 || e !== _t) && (e === _t && ((vt & 2) === 0 && (Gr |= r), Ft === 4 && ir(
      e,
      ct,
      In,
      !1
    )), ba(e));
  }
  function sv(e, n, r) {
    if ((vt & 6) !== 0) throw Error(i(327));
    var l = !r && (n & 127) === 0 && (n & e.expiredLanes) === 0 || xe(e, n), d = l ? Jj(e, n) : zd(e, n, !0), h = l;
    do {
      if (d === 0) {
        _s && !l && ir(e, n, 0, !1);
        break;
      } else {
        if (r = e.current.alternate, h && !Qj(r)) {
          d = zd(e, n, !1), h = !1;
          continue;
        }
        if (d === 2) {
          if (h = n, e.errorRecoveryDisabledLanes & h)
            var x = 0;
          else
            x = e.pendingLanes & -536870913, x = x !== 0 ? x : x & 536870912 ? 536870912 : 0;
          if (x !== 0) {
            n = x;
            e: {
              var E = e;
              d = Ui;
              var L = E.current.memoizedState.isDehydrated;
              if (L && (ks(E, x).flags |= 256), x = zd(
                E,
                x,
                !1
              ), x !== 2) {
                if (Td && !L) {
                  E.errorRecoveryDisabledLanes |= h, Gr |= h, d = 4;
                  break e;
                }
                h = _n, _n = d, h !== null && (_n === null ? _n = h : _n.push.apply(
                  _n,
                  h
                ));
              }
              d = x;
            }
            if (h = !1, d !== 2) continue;
          }
        }
        if (d === 1) {
          ks(e, 0), ir(e, n, 0, !0);
          break;
        }
        e: {
          switch (l = e, h = d, h) {
            case 0:
            case 1:
              throw Error(i(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              ir(
                l,
                n,
                In,
                !nr
              );
              break e;
            case 2:
              _n = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(i(329));
          }
          if ((n & 62914560) === n && (d = xo + 300 - gt(), 10 < d)) {
            if (ir(
              l,
              n,
              In,
              !nr
            ), ve(l, 0, !0) !== 0) break e;
            $a = n, l.timeoutHandle = Lv(
              iv.bind(
                null,
                l,
                r,
                _n,
                wo,
                _d,
                n,
                In,
                Gr,
                Ms,
                nr,
                h,
                "Throttled",
                -0,
                0
              ),
              d
            );
            break e;
          }
          iv(
            l,
            r,
            _n,
            wo,
            _d,
            n,
            In,
            Gr,
            Ms,
            nr,
            h,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    ba(e);
  }
  function iv(e, n, r, l, d, h, x, E, L, re, de, pe, le, oe) {
    if (e.timeoutHandle = -1, pe = n.subtreeFlags, pe & 8192 || (pe & 16785408) === 16785408) {
      pe = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: wa
      }, Jg(
        n,
        h,
        pe
      );
      var ze = (h & 62914560) === h ? xo - gt() : (h & 4194048) === h ? nv - gt() : 0;
      if (ze = zE(
        pe,
        ze
      ), ze !== null) {
        $a = h, e.cancelPendingCommit = ze(
          mv.bind(
            null,
            e,
            n,
            h,
            r,
            l,
            d,
            x,
            E,
            L,
            de,
            pe,
            null,
            le,
            oe
          )
        ), ir(e, h, x, !re);
        return;
      }
    }
    mv(
      e,
      n,
      h,
      r,
      l,
      d,
      x,
      E,
      L
    );
  }
  function Qj(e) {
    for (var n = e; ; ) {
      var r = n.tag;
      if ((r === 0 || r === 11 || r === 15) && n.flags & 16384 && (r = n.updateQueue, r !== null && (r = r.stores, r !== null)))
        for (var l = 0; l < r.length; l++) {
          var d = r[l], h = d.getSnapshot;
          d = d.value;
          try {
            if (!On(h(), d)) return !1;
          } catch {
            return !1;
          }
        }
      if (r = n.child, n.subtreeFlags & 16384 && r !== null)
        r.return = n, n = r;
      else {
        if (n === e) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === e) return !0;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
    }
    return !0;
  }
  function ir(e, n, r, l) {
    n &= ~Rd, n &= ~Gr, e.suspendedLanes |= n, e.pingedLanes &= ~n, l && (e.warmLanes |= n), l = e.expirationTimes;
    for (var d = n; 0 < d; ) {
      var h = 31 - Bt(d), x = 1 << h;
      l[h] = -1, d &= ~x;
    }
    r !== 0 && wt(e, r, n);
  }
  function jo() {
    return (vt & 6) === 0 ? (Ii(0), !1) : !0;
  }
  function Dd() {
    if (st !== null) {
      if (bt === 0)
        var e = st.return;
      else
        e = st, Ca = $r = null, Xu(e), ws = null, wi = 0, e = st;
      for (; e !== null; )
        $g(e.alternate, e), e = e.return;
      st = null;
    }
  }
  function ks(e, n) {
    var r = e.timeoutHandle;
    r !== -1 && (e.timeoutHandle = -1, gE(r)), r = e.cancelPendingCommit, r !== null && (e.cancelPendingCommit = null, r()), $a = 0, Dd(), _t = e, st = r = Ea(e.current, null), ct = n, bt = 0, Bn = null, nr = !1, _s = xe(e, n), Td = !1, Ms = In = Rd = Gr = ar = Ft = 0, _n = Ui = null, _d = !1, (n & 8) !== 0 && (n |= n & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= n; 0 < l; ) {
        var d = 31 - Bt(l), h = 1 << d;
        n |= e[d], l &= ~h;
      }
    return La = n, Hl(), r;
  }
  function lv(e, n) {
    Qe = null, A.H = Mi, n === Ss || n === Zl ? (n = jp(), bt = 3) : n === $u ? (n = jp(), bt = 4) : bt = n === dd ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Bn = n, st === null && (Ft = 1, fo(
      e,
      Gn(n, e.current)
    ));
  }
  function ov() {
    var e = $n.current;
    return e === null ? !0 : (ct & 4194048) === ct ? Qn === null : (ct & 62914560) === ct || (ct & 536870912) !== 0 ? e === Qn : !1;
  }
  function cv() {
    var e = A.H;
    return A.H = Mi, e === null ? Mi : e;
  }
  function uv() {
    var e = A.A;
    return A.A = Kj, e;
  }
  function Eo() {
    Ft = 4, nr || (ct & 4194048) !== ct && $n.current !== null || (_s = !0), (ar & 134217727) === 0 && (Gr & 134217727) === 0 || _t === null || ir(
      _t,
      ct,
      In,
      !1
    );
  }
  function zd(e, n, r) {
    var l = vt;
    vt |= 2;
    var d = cv(), h = uv();
    (_t !== e || ct !== n) && (wo = null, ks(e, n)), n = !1;
    var x = Ft;
    e: do
      try {
        if (bt !== 0 && st !== null) {
          var E = st, L = Bn;
          switch (bt) {
            case 8:
              Dd(), x = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              $n.current === null && (n = !0);
              var re = bt;
              if (bt = 0, Bn = null, Ds(e, E, L, re), r && _s) {
                x = 0;
                break e;
              }
              break;
            default:
              re = bt, bt = 0, Bn = null, Ds(e, E, L, re);
          }
        }
        Zj(), x = Ft;
        break;
      } catch (de) {
        lv(e, de);
      }
    while (!0);
    return n && e.shellSuspendCounter++, Ca = $r = null, vt = l, A.H = d, A.A = h, st === null && (_t = null, ct = 0, Hl()), x;
  }
  function Zj() {
    for (; st !== null; ) dv(st);
  }
  function Jj(e, n) {
    var r = vt;
    vt |= 2;
    var l = cv(), d = uv();
    _t !== e || ct !== n ? (wo = null, So = gt() + 500, ks(e, n)) : _s = xe(
      e,
      n
    );
    e: do
      try {
        if (bt !== 0 && st !== null) {
          n = st;
          var h = Bn;
          t: switch (bt) {
            case 1:
              bt = 0, Bn = null, Ds(e, n, h, 1);
              break;
            case 2:
            case 9:
              if (Sp(h)) {
                bt = 0, Bn = null, fv(n);
                break;
              }
              n = function() {
                bt !== 2 && bt !== 9 || _t !== e || (bt = 7), ba(e);
              }, h.then(n, n);
              break e;
            case 3:
              bt = 7;
              break e;
            case 4:
              bt = 5;
              break e;
            case 7:
              Sp(h) ? (bt = 0, Bn = null, fv(n)) : (bt = 0, Bn = null, Ds(e, n, h, 7));
              break;
            case 5:
              var x = null;
              switch (st.tag) {
                case 26:
                  x = st.memoizedState;
                case 5:
                case 27:
                  var E = st;
                  if (x ? Zv(x) : E.stateNode.complete) {
                    bt = 0, Bn = null;
                    var L = E.sibling;
                    if (L !== null) st = L;
                    else {
                      var re = E.return;
                      re !== null ? (st = re, No(re)) : st = null;
                    }
                    break t;
                  }
              }
              bt = 0, Bn = null, Ds(e, n, h, 5);
              break;
            case 6:
              bt = 0, Bn = null, Ds(e, n, h, 6);
              break;
            case 8:
              Dd(), Ft = 6;
              break e;
            default:
              throw Error(i(462));
          }
        }
        Wj();
        break;
      } catch (de) {
        lv(e, de);
      }
    while (!0);
    return Ca = $r = null, A.H = l, A.A = d, vt = r, st !== null ? 0 : (_t = null, ct = 0, Hl(), Ft);
  }
  function Wj() {
    for (; st !== null && !ot(); )
      dv(st);
  }
  function dv(e) {
    var n = Og(e.alternate, e, La);
    e.memoizedProps = e.pendingProps, n === null ? No(e) : st = n;
  }
  function fv(e) {
    var n = e, r = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = _g(
          r,
          n,
          n.pendingProps,
          n.type,
          void 0,
          ct
        );
        break;
      case 11:
        n = _g(
          r,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          ct
        );
        break;
      case 5:
        Xu(n);
      default:
        $g(r, n), n = st = up(n, La), n = Og(r, n, La);
    }
    e.memoizedProps = e.pendingProps, n === null ? No(e) : st = n;
  }
  function Ds(e, n, r, l) {
    Ca = $r = null, Xu(n), ws = null, wi = 0;
    var d = n.return;
    try {
      if (Vj(
        e,
        d,
        n,
        r,
        ct
      )) {
        Ft = 1, fo(
          e,
          Gn(r, e.current)
        ), st = null;
        return;
      }
    } catch (h) {
      if (d !== null) throw st = d, h;
      Ft = 1, fo(
        e,
        Gn(r, e.current)
      ), st = null;
      return;
    }
    n.flags & 32768 ? (dt || l === 1 ? e = !0 : _s || (ct & 536870912) !== 0 ? e = !1 : (nr = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = $n.current, l !== null && l.tag === 13 && (l.flags |= 16384))), hv(n, e)) : No(n);
  }
  function No(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        hv(
          n,
          nr
        );
        return;
      }
      e = n.return;
      var r = Fj(
        n.alternate,
        n,
        La
      );
      if (r !== null) {
        st = r;
        return;
      }
      if (n = n.sibling, n !== null) {
        st = n;
        return;
      }
      st = n = e;
    } while (n !== null);
    Ft === 0 && (Ft = 5);
  }
  function hv(e, n) {
    do {
      var r = Pj(e.alternate, e);
      if (r !== null) {
        r.flags &= 32767, st = r;
        return;
      }
      if (r = e.return, r !== null && (r.flags |= 32768, r.subtreeFlags = 0, r.deletions = null), !n && (e = e.sibling, e !== null)) {
        st = e;
        return;
      }
      st = e = r;
    } while (e !== null);
    Ft = 6, st = null;
  }
  function mv(e, n, r, l, d, h, x, E, L) {
    e.cancelPendingCommit = null;
    do
      Co();
    while (sn !== 0);
    if ((vt & 6) !== 0) throw Error(i(327));
    if (n !== null) {
      if (n === e.current) throw Error(i(177));
      if (h = n.lanes | n.childLanes, h |= wu, Ge(
        e,
        r,
        h,
        x,
        E,
        L
      ), e === _t && (st = _t = null, ct = 0), As = n, sr = e, $a = r, Md = h, Ad = d, av = l, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, aE(Xe, function() {
        return bv(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || l) {
        l = A.T, A.T = null, d = V.p, V.p = 2, x = vt, vt |= 4;
        try {
          Gj(e, n, r);
        } finally {
          vt = x, V.p = d, A.T = l;
        }
      }
      sn = 1, pv(), gv(), vv();
    }
  }
  function pv() {
    if (sn === 1) {
      sn = 0;
      var e = sr, n = As, r = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || r) {
        r = A.T, A.T = null;
        var l = V.p;
        V.p = 2;
        var d = vt;
        vt |= 4;
        try {
          Xg(n, e);
          var h = Gd, x = tp(e.containerInfo), E = h.focusedElem, L = h.selectionRange;
          if (x !== E && E && E.ownerDocument && ep(
            E.ownerDocument.documentElement,
            E
          )) {
            if (L !== null && vu(E)) {
              var re = L.start, de = L.end;
              if (de === void 0 && (de = re), "selectionStart" in E)
                E.selectionStart = re, E.selectionEnd = Math.min(
                  de,
                  E.value.length
                );
              else {
                var pe = E.ownerDocument || document, le = pe && pe.defaultView || window;
                if (le.getSelection) {
                  var oe = le.getSelection(), ze = E.textContent.length, qe = Math.min(L.start, ze), Ct = L.end === void 0 ? qe : Math.min(L.end, ze);
                  !oe.extend && qe > Ct && (x = Ct, Ct = qe, qe = x);
                  var X = Wm(
                    E,
                    qe
                  ), I = Wm(
                    E,
                    Ct
                  );
                  if (X && I && (oe.rangeCount !== 1 || oe.anchorNode !== X.node || oe.anchorOffset !== X.offset || oe.focusNode !== I.node || oe.focusOffset !== I.offset)) {
                    var ee = pe.createRange();
                    ee.setStart(X.node, X.offset), oe.removeAllRanges(), qe > Ct ? (oe.addRange(ee), oe.extend(I.node, I.offset)) : (ee.setEnd(I.node, I.offset), oe.addRange(ee));
                  }
                }
              }
            }
            for (pe = [], oe = E; oe = oe.parentNode; )
              oe.nodeType === 1 && pe.push({
                element: oe,
                left: oe.scrollLeft,
                top: oe.scrollTop
              });
            for (typeof E.focus == "function" && E.focus(), E = 0; E < pe.length; E++) {
              var me = pe[E];
              me.element.scrollLeft = me.left, me.element.scrollTop = me.top;
            }
          }
          Uo = !!Pd, Gd = Pd = null;
        } finally {
          vt = d, V.p = l, A.T = r;
        }
      }
      e.current = n, sn = 2;
    }
  }
  function gv() {
    if (sn === 2) {
      sn = 0;
      var e = sr, n = As, r = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || r) {
        r = A.T, A.T = null;
        var l = V.p;
        V.p = 2;
        var d = vt;
        vt |= 4;
        try {
          Fg(e, n.alternate, n);
        } finally {
          vt = d, V.p = l, A.T = r;
        }
      }
      sn = 3;
    }
  }
  function vv() {
    if (sn === 4 || sn === 3) {
      sn = 0, Ke();
      var e = sr, n = As, r = $a, l = av;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? sn = 5 : (sn = 0, As = sr = null, yv(e, e.pendingLanes));
      var d = e.pendingLanes;
      if (d === 0 && (rr = null), Q(r), n = n.stateNode, Pt && typeof Pt.onCommitFiberRoot == "function")
        try {
          Pt.onCommitFiberRoot(
            pn,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        n = A.T, d = V.p, V.p = 2, A.T = null;
        try {
          for (var h = e.onRecoverableError, x = 0; x < l.length; x++) {
            var E = l[x];
            h(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          A.T = n, V.p = d;
        }
      }
      ($a & 3) !== 0 && Co(), ba(e), d = e.pendingLanes, (r & 261930) !== 0 && (d & 42) !== 0 ? e === kd ? Bi++ : (Bi = 0, kd = e) : Bi = 0, Ii(0);
    }
  }
  function yv(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, xi(n)));
  }
  function Co() {
    return pv(), gv(), vv(), bv();
  }
  function bv() {
    if (sn !== 5) return !1;
    var e = sr, n = Md;
    Md = 0;
    var r = Q($a), l = A.T, d = V.p;
    try {
      V.p = 32 > r ? 32 : r, A.T = null, r = Ad, Ad = null;
      var h = sr, x = $a;
      if (sn = 0, As = sr = null, $a = 0, (vt & 6) !== 0) throw Error(i(331));
      var E = vt;
      if (vt |= 4, ev(h.current), Zg(
        h,
        h.current,
        x,
        r
      ), vt = E, Ii(0, !1), Pt && typeof Pt.onPostCommitFiberRoot == "function")
        try {
          Pt.onPostCommitFiberRoot(pn, h);
        } catch {
        }
      return !0;
    } finally {
      V.p = d, A.T = l, yv(e, n);
    }
  }
  function xv(e, n, r) {
    n = Gn(r, n), n = ud(e.stateNode, n, 2), e = Ja(e, n, 2), e !== null && (_e(e, 2), ba(e));
  }
  function xt(e, n, r) {
    if (e.tag === 3)
      xv(e, e, r);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          xv(
            n,
            e,
            r
          );
          break;
        } else if (n.tag === 1) {
          var l = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (rr === null || !rr.has(l))) {
            e = Gn(r, e), r = Sg(2), l = Ja(n, r, 2), l !== null && (wg(
              r,
              l,
              n,
              e
            ), _e(l, 2), ba(l));
            break;
          }
        }
        n = n.return;
      }
  }
  function Od(e, n, r) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new Xj();
      var d = /* @__PURE__ */ new Set();
      l.set(n, d);
    } else
      d = l.get(n), d === void 0 && (d = /* @__PURE__ */ new Set(), l.set(n, d));
    d.has(r) || (Td = !0, d.add(r), e = eE.bind(null, e, n, r), n.then(e, e));
  }
  function eE(e, n, r) {
    var l = e.pingCache;
    l !== null && l.delete(n), e.pingedLanes |= e.suspendedLanes & r, e.warmLanes &= ~r, _t === e && (ct & r) === r && (Ft === 4 || Ft === 3 && (ct & 62914560) === ct && 300 > gt() - xo ? (vt & 2) === 0 && ks(e, 0) : Rd |= r, Ms === ct && (Ms = 0)), ba(e);
  }
  function Sv(e, n) {
    n === 0 && (n = ce()), e = zr(e, n), e !== null && (_e(e, n), ba(e));
  }
  function tE(e) {
    var n = e.memoizedState, r = 0;
    n !== null && (r = n.retryLane), Sv(e, r);
  }
  function nE(e, n) {
    var r = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var l = e.stateNode, d = e.memoizedState;
        d !== null && (r = d.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      case 22:
        l = e.stateNode._retryCache;
        break;
      default:
        throw Error(i(314));
    }
    l !== null && l.delete(n), Sv(e, r);
  }
  function aE(e, n) {
    return at(e, n);
  }
  var To = null, zs = null, Ld = !1, Ro = !1, $d = !1, lr = 0;
  function ba(e) {
    e !== zs && e.next === null && (zs === null ? To = zs = e : zs = zs.next = e), Ro = !0, Ld || (Ld = !0, sE());
  }
  function Ii(e, n) {
    if (!$d && Ro) {
      $d = !0;
      do
        for (var r = !1, l = To; l !== null; ) {
          if (e !== 0) {
            var d = l.pendingLanes;
            if (d === 0) var h = 0;
            else {
              var x = l.suspendedLanes, E = l.pingedLanes;
              h = (1 << 31 - Bt(42 | e) + 1) - 1, h &= d & ~(x & ~E), h = h & 201326741 ? h & 201326741 | 1 : h ? h | 2 : 0;
            }
            h !== 0 && (r = !0, Nv(l, h));
          } else
            h = ct, h = ve(
              l,
              l === _t ? h : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (h & 3) === 0 || xe(l, h) || (r = !0, Nv(l, h));
          l = l.next;
        }
      while (r);
      $d = !1;
    }
  }
  function rE() {
    wv();
  }
  function wv() {
    Ro = Ld = !1;
    var e = 0;
    lr !== 0 && pE() && (e = lr);
    for (var n = gt(), r = null, l = To; l !== null; ) {
      var d = l.next, h = jv(l, n);
      h === 0 ? (l.next = null, r === null ? To = d : r.next = d, d === null && (zs = r)) : (r = l, (e !== 0 || (h & 3) !== 0) && (Ro = !0)), l = d;
    }
    sn !== 0 && sn !== 5 || Ii(e), lr !== 0 && (lr = 0);
  }
  function jv(e, n) {
    for (var r = e.suspendedLanes, l = e.pingedLanes, d = e.expirationTimes, h = e.pendingLanes & -62914561; 0 < h; ) {
      var x = 31 - Bt(h), E = 1 << x, L = d[x];
      L === -1 ? ((E & r) === 0 || (E & l) !== 0) && (d[x] = Y(E, n)) : L <= n && (e.expiredLanes |= E), h &= ~E;
    }
    if (n = _t, r = ct, r = ve(
      e,
      e === n ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, r === 0 || e === n && (bt === 2 || bt === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && St(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((r & 3) === 0 || xe(e, r)) {
      if (n = r & -r, n === e.callbackPriority) return n;
      switch (l !== null && St(l), Q(r)) {
        case 2:
        case 8:
          r = Pe;
          break;
        case 32:
          r = Xe;
          break;
        case 268435456:
          r = Tt;
          break;
        default:
          r = Xe;
      }
      return l = Ev.bind(null, e), r = at(r, l), e.callbackPriority = n, e.callbackNode = r, n;
    }
    return l !== null && l !== null && St(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Ev(e, n) {
    if (sn !== 0 && sn !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var r = e.callbackNode;
    if (Co() && e.callbackNode !== r)
      return null;
    var l = ct;
    return l = ve(
      e,
      e === _t ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (sv(e, l, n), jv(e, gt()), e.callbackNode != null && e.callbackNode === r ? Ev.bind(null, e) : null);
  }
  function Nv(e, n) {
    if (Co()) return null;
    sv(e, n, !0);
  }
  function sE() {
    vE(function() {
      (vt & 6) !== 0 ? at(
        ke,
        rE
      ) : wv();
    });
  }
  function Ud() {
    if (lr === 0) {
      var e = bs;
      e === 0 && (e = En, En <<= 1, (En & 261888) === 0 && (En = 256)), lr = e;
    }
    return lr;
  }
  function Cv(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Ol("" + e);
  }
  function Tv(e, n) {
    var r = n.ownerDocument.createElement("input");
    return r.name = n.name, r.value = n.value, e.id && r.setAttribute("form", e.id), n.parentNode.insertBefore(r, n), e = new FormData(e), r.parentNode.removeChild(r), e;
  }
  function iE(e, n, r, l, d) {
    if (n === "submit" && r && r.stateNode === d) {
      var h = Cv(
        (d[Ee] || null).action
      ), x = l.submitter;
      x && (n = (n = x[Ee] || null) ? Cv(n.formAction) : x.getAttribute("formAction"), n !== null && (h = n, x = null));
      var E = new Bl(
        "action",
        "action",
        null,
        l,
        d
      );
      e.push({
        event: E,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (lr !== 0) {
                  var L = x ? Tv(d, x) : new FormData(d);
                  rd(
                    r,
                    {
                      pending: !0,
                      data: L,
                      method: d.method,
                      action: h
                    },
                    null,
                    L
                  );
                }
              } else
                typeof h == "function" && (E.preventDefault(), L = x ? Tv(d, x) : new FormData(d), rd(
                  r,
                  {
                    pending: !0,
                    data: L,
                    method: d.method,
                    action: h
                  },
                  h,
                  L
                ));
            },
            currentTarget: d
          }
        ]
      });
    }
  }
  for (var Bd = 0; Bd < Su.length; Bd++) {
    var Id = Su[Bd], lE = Id.toLowerCase(), oE = Id[0].toUpperCase() + Id.slice(1);
    la(
      lE,
      "on" + oE
    );
  }
  la(rp, "onAnimationEnd"), la(sp, "onAnimationIteration"), la(ip, "onAnimationStart"), la("dblclick", "onDoubleClick"), la("focusin", "onFocus"), la("focusout", "onBlur"), la(Ej, "onTransitionRun"), la(Nj, "onTransitionStart"), la(Cj, "onTransitionCancel"), la(lp, "onTransitionEnd"), ma("onMouseEnter", ["mouseout", "mouseover"]), ma("onMouseLeave", ["mouseout", "mouseover"]), ma("onPointerEnter", ["pointerout", "pointerover"]), ma("onPointerLeave", ["pointerout", "pointerover"]), ln(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), ln(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), ln("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), ln(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), ln(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), ln(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Vi = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), cE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Vi)
  );
  function Rv(e, n) {
    n = (n & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var l = e[r], d = l.event;
      l = l.listeners;
      e: {
        var h = void 0;
        if (n)
          for (var x = l.length - 1; 0 <= x; x--) {
            var E = l[x], L = E.instance, re = E.currentTarget;
            if (E = E.listener, L !== h && d.isPropagationStopped())
              break e;
            h = E, d.currentTarget = re;
            try {
              h(d);
            } catch (de) {
              ql(de);
            }
            d.currentTarget = null, h = L;
          }
        else
          for (x = 0; x < l.length; x++) {
            if (E = l[x], L = E.instance, re = E.currentTarget, E = E.listener, L !== h && d.isPropagationStopped())
              break e;
            h = E, d.currentTarget = re;
            try {
              h(d);
            } catch (de) {
              ql(de);
            }
            d.currentTarget = null, h = L;
          }
      }
    }
  }
  function it(e, n) {
    var r = n[Me];
    r === void 0 && (r = n[Me] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    r.has(l) || (_v(n, e, 2, !1), r.add(l));
  }
  function Vd(e, n, r) {
    var l = 0;
    n && (l |= 4), _v(
      r,
      e,
      l,
      n
    );
  }
  var _o = "_reactListening" + Math.random().toString(36).slice(2);
  function qd(e) {
    if (!e[_o]) {
      e[_o] = !0, Fa.forEach(function(r) {
        r !== "selectionchange" && (cE.has(r) || Vd(r, !1, e), Vd(r, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[_o] || (n[_o] = !0, Vd("selectionchange", !1, n));
    }
  }
  function _v(e, n, r, l) {
    switch (ry(n)) {
      case 2:
        var d = $E;
        break;
      case 8:
        d = UE;
        break;
      default:
        d = af;
    }
    r = d.bind(
      null,
      n,
      r,
      e
    ), d = void 0, !ou || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (d = !0), l ? d !== void 0 ? e.addEventListener(n, r, {
      capture: !0,
      passive: d
    }) : e.addEventListener(n, r, !0) : d !== void 0 ? e.addEventListener(n, r, {
      passive: d
    }) : e.addEventListener(n, r, !1);
  }
  function Hd(e, n, r, l, d) {
    var h = l;
    if ((n & 1) === 0 && (n & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var x = l.tag;
        if (x === 3 || x === 4) {
          var E = l.stateNode.containerInfo;
          if (E === d) break;
          if (x === 4)
            for (x = l.return; x !== null; ) {
              var L = x.tag;
              if ((L === 3 || L === 4) && x.stateNode.containerInfo === d)
                return;
              x = x.return;
            }
          for (; E !== null; ) {
            if (x = jt(E), x === null) return;
            if (L = x.tag, L === 5 || L === 6 || L === 26 || L === 27) {
              l = h = x;
              continue e;
            }
            E = E.parentNode;
          }
        }
        l = l.return;
      }
    zm(function() {
      var re = h, de = iu(r), pe = [];
      e: {
        var le = op.get(e);
        if (le !== void 0) {
          var oe = Bl, ze = e;
          switch (e) {
            case "keypress":
              if ($l(r) === 0) break e;
            case "keydown":
            case "keyup":
              oe = nj;
              break;
            case "focusin":
              ze = "focus", oe = fu;
              break;
            case "focusout":
              ze = "blur", oe = fu;
              break;
            case "beforeblur":
            case "afterblur":
              oe = fu;
              break;
            case "click":
              if (r.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              oe = $m;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              oe = Fw;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              oe = sj;
              break;
            case rp:
            case sp:
            case ip:
              oe = Yw;
              break;
            case lp:
              oe = lj;
              break;
            case "scroll":
            case "scrollend":
              oe = qw;
              break;
            case "wheel":
              oe = cj;
              break;
            case "copy":
            case "cut":
            case "paste":
              oe = Xw;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              oe = Bm;
              break;
            case "toggle":
            case "beforetoggle":
              oe = dj;
          }
          var qe = (n & 4) !== 0, Ct = !qe && (e === "scroll" || e === "scrollend"), X = qe ? le !== null ? le + "Capture" : null : le;
          qe = [];
          for (var I = re, ee; I !== null; ) {
            var me = I;
            if (ee = me.stateNode, me = me.tag, me !== 5 && me !== 26 && me !== 27 || ee === null || X === null || (me = ci(I, X), me != null && qe.push(
              qi(I, me, ee)
            )), Ct) break;
            I = I.return;
          }
          0 < qe.length && (le = new oe(
            le,
            ze,
            null,
            r,
            de
          ), pe.push({ event: le, listeners: qe }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (le = e === "mouseover" || e === "pointerover", oe = e === "mouseout" || e === "pointerout", le && r !== su && (ze = r.relatedTarget || r.fromElement) && (jt(ze) || ze[Le]))
            break e;
          if ((oe || le) && (le = de.window === de ? de : (le = de.ownerDocument) ? le.defaultView || le.parentWindow : window, oe ? (ze = r.relatedTarget || r.toElement, oe = re, ze = ze ? jt(ze) : null, ze !== null && (Ct = u(ze), qe = ze.tag, ze !== Ct || qe !== 5 && qe !== 27 && qe !== 6) && (ze = null)) : (oe = null, ze = re), oe !== ze)) {
            if (qe = $m, me = "onMouseLeave", X = "onMouseEnter", I = "mouse", (e === "pointerout" || e === "pointerover") && (qe = Bm, me = "onPointerLeave", X = "onPointerEnter", I = "pointer"), Ct = oe == null ? le : rt(oe), ee = ze == null ? le : rt(ze), le = new qe(
              me,
              I + "leave",
              oe,
              r,
              de
            ), le.target = Ct, le.relatedTarget = ee, me = null, jt(de) === re && (qe = new qe(
              X,
              I + "enter",
              ze,
              r,
              de
            ), qe.target = ee, qe.relatedTarget = Ct, me = qe), Ct = me, oe && ze)
              t: {
                for (qe = uE, X = oe, I = ze, ee = 0, me = X; me; me = qe(me))
                  ee++;
                me = 0;
                for (var Ie = I; Ie; Ie = qe(Ie))
                  me++;
                for (; 0 < ee - me; )
                  X = qe(X), ee--;
                for (; 0 < me - ee; )
                  I = qe(I), me--;
                for (; ee--; ) {
                  if (X === I || I !== null && X === I.alternate) {
                    qe = X;
                    break t;
                  }
                  X = qe(X), I = qe(I);
                }
                qe = null;
              }
            else qe = null;
            oe !== null && Mv(
              pe,
              le,
              oe,
              qe,
              !1
            ), ze !== null && Ct !== null && Mv(
              pe,
              Ct,
              ze,
              qe,
              !0
            );
          }
        }
        e: {
          if (le = re ? rt(re) : window, oe = le.nodeName && le.nodeName.toLowerCase(), oe === "select" || oe === "input" && le.type === "file")
            var mt = Ym;
          else if (Pm(le))
            if (Km)
              mt = Sj;
            else {
              mt = bj;
              var $e = yj;
            }
          else
            oe = le.nodeName, !oe || oe.toLowerCase() !== "input" || le.type !== "checkbox" && le.type !== "radio" ? re && ru(re.elementType) && (mt = Ym) : mt = xj;
          if (mt && (mt = mt(e, re))) {
            Gm(
              pe,
              mt,
              r,
              de
            );
            break e;
          }
          $e && $e(e, le, re), e === "focusout" && re && le.type === "number" && re.memoizedProps.value != null && au(le, "number", le.value);
        }
        switch ($e = re ? rt(re) : window, e) {
          case "focusin":
            (Pm($e) || $e.contentEditable === "true") && (ds = $e, yu = re, vi = null);
            break;
          case "focusout":
            vi = yu = ds = null;
            break;
          case "mousedown":
            bu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            bu = !1, np(pe, r, de);
            break;
          case "selectionchange":
            if (jj) break;
          case "keydown":
          case "keyup":
            np(pe, r, de);
        }
        var Je;
        if (mu)
          e: {
            switch (e) {
              case "compositionstart":
                var ut = "onCompositionStart";
                break e;
              case "compositionend":
                ut = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ut = "onCompositionUpdate";
                break e;
            }
            ut = void 0;
          }
        else
          us ? Hm(e, r) && (ut = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (ut = "onCompositionStart");
        ut && (Im && r.locale !== "ko" && (us || ut !== "onCompositionStart" ? ut === "onCompositionEnd" && us && (Je = Om()) : (Pa = de, cu = "value" in Pa ? Pa.value : Pa.textContent, us = !0)), $e = Mo(re, ut), 0 < $e.length && (ut = new Um(
          ut,
          e,
          null,
          r,
          de
        ), pe.push({ event: ut, listeners: $e }), Je ? ut.data = Je : (Je = Fm(r), Je !== null && (ut.data = Je)))), (Je = hj ? mj(e, r) : pj(e, r)) && (ut = Mo(re, "onBeforeInput"), 0 < ut.length && ($e = new Um(
          "onBeforeInput",
          "beforeinput",
          null,
          r,
          de
        ), pe.push({
          event: $e,
          listeners: ut
        }), $e.data = Je)), iE(
          pe,
          e,
          re,
          r,
          de
        );
      }
      Rv(pe, n);
    });
  }
  function qi(e, n, r) {
    return {
      instance: e,
      listener: n,
      currentTarget: r
    };
  }
  function Mo(e, n) {
    for (var r = n + "Capture", l = []; e !== null; ) {
      var d = e, h = d.stateNode;
      if (d = d.tag, d !== 5 && d !== 26 && d !== 27 || h === null || (d = ci(e, r), d != null && l.unshift(
        qi(e, d, h)
      ), d = ci(e, n), d != null && l.push(
        qi(e, d, h)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function uE(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Mv(e, n, r, l, d) {
    for (var h = n._reactName, x = []; r !== null && r !== l; ) {
      var E = r, L = E.alternate, re = E.stateNode;
      if (E = E.tag, L !== null && L === l) break;
      E !== 5 && E !== 26 && E !== 27 || re === null || (L = re, d ? (re = ci(r, h), re != null && x.unshift(
        qi(r, re, L)
      )) : d || (re = ci(r, h), re != null && x.push(
        qi(r, re, L)
      ))), r = r.return;
    }
    x.length !== 0 && e.push({ event: n, listeners: x });
  }
  var dE = /\r\n?/g, fE = /\u0000|\uFFFD/g;
  function Av(e) {
    return (typeof e == "string" ? e : "" + e).replace(dE, `
`).replace(fE, "");
  }
  function kv(e, n) {
    return n = Av(n), Av(e) === n;
  }
  function Nt(e, n, r, l, d, h) {
    switch (r) {
      case "children":
        typeof l == "string" ? n === "body" || n === "textarea" && l === "" || ls(e, l) : (typeof l == "number" || typeof l == "bigint") && n !== "body" && ls(e, "" + l);
        break;
      case "className":
        Gt(e, "class", l);
        break;
      case "tabIndex":
        Gt(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Gt(e, r, l);
        break;
      case "style":
        km(e, l, h);
        break;
      case "data":
        if (n !== "object") {
          Gt(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (n !== "a" || r !== "href")) {
          e.removeAttribute(r);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(r);
          break;
        }
        l = Ol("" + l), e.setAttribute(r, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          e.setAttribute(
            r,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof h == "function" && (r === "formAction" ? (n !== "input" && Nt(e, n, "name", d.name, d, null), Nt(
            e,
            n,
            "formEncType",
            d.formEncType,
            d,
            null
          ), Nt(
            e,
            n,
            "formMethod",
            d.formMethod,
            d,
            null
          ), Nt(
            e,
            n,
            "formTarget",
            d.formTarget,
            d,
            null
          )) : (Nt(e, n, "encType", d.encType, d, null), Nt(e, n, "method", d.method, d, null), Nt(e, n, "target", d.target, d, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(r);
          break;
        }
        l = Ol("" + l), e.setAttribute(r, l);
        break;
      case "onClick":
        l != null && (e.onclick = wa);
        break;
      case "onScroll":
        l != null && it("scroll", e);
        break;
      case "onScrollEnd":
        l != null && it("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(i(61));
          if (r = l.__html, r != null) {
            if (d.children != null) throw Error(i(60));
            e.innerHTML = r;
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
        r = Ol("" + l), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          r
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
        l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(r, "" + l) : e.removeAttribute(r);
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
        l && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(r, "") : e.removeAttribute(r);
        break;
      case "capture":
      case "download":
        l === !0 ? e.setAttribute(r, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(r, l) : e.removeAttribute(r);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? e.setAttribute(r, l) : e.removeAttribute(r);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? e.removeAttribute(r) : e.setAttribute(r, l);
        break;
      case "popover":
        it("beforetoggle", e), it("toggle", e), tt(e, "popover", l);
        break;
      case "xlinkActuate":
        gn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        gn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        gn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        gn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        gn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        gn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        gn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        gn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        gn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        tt(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (r = Iw.get(r) || r, tt(e, r, l));
    }
  }
  function Fd(e, n, r, l, d, h) {
    switch (r) {
      case "style":
        km(e, l, h);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(i(61));
          if (r = l.__html, r != null) {
            if (d.children != null) throw Error(i(60));
            e.innerHTML = r;
          }
        }
        break;
      case "children":
        typeof l == "string" ? ls(e, l) : (typeof l == "number" || typeof l == "bigint") && ls(e, "" + l);
        break;
      case "onScroll":
        l != null && it("scroll", e);
        break;
      case "onScrollEnd":
        l != null && it("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = wa);
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
        if (!ia.hasOwnProperty(r))
          e: {
            if (r[0] === "o" && r[1] === "n" && (d = r.endsWith("Capture"), n = r.slice(2, d ? r.length - 7 : void 0), h = e[Ee] || null, h = h != null ? h[r] : null, typeof h == "function" && e.removeEventListener(n, h, d), typeof l == "function")) {
              typeof h != "function" && h !== null && (r in e ? e[r] = null : e.hasAttribute(r) && e.removeAttribute(r)), e.addEventListener(n, l, d);
              break e;
            }
            r in e ? e[r] = l : l === !0 ? e.setAttribute(r, "") : tt(e, r, l);
          }
    }
  }
  function hn(e, n, r) {
    switch (n) {
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
        it("error", e), it("load", e);
        var l = !1, d = !1, h;
        for (h in r)
          if (r.hasOwnProperty(h)) {
            var x = r[h];
            if (x != null)
              switch (h) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  d = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(i(137, n));
                default:
                  Nt(e, n, h, x, r, null);
              }
          }
        d && Nt(e, n, "srcSet", r.srcSet, r, null), l && Nt(e, n, "src", r.src, r, null);
        return;
      case "input":
        it("invalid", e);
        var E = h = x = d = null, L = null, re = null;
        for (l in r)
          if (r.hasOwnProperty(l)) {
            var de = r[l];
            if (de != null)
              switch (l) {
                case "name":
                  d = de;
                  break;
                case "type":
                  x = de;
                  break;
                case "checked":
                  L = de;
                  break;
                case "defaultChecked":
                  re = de;
                  break;
                case "value":
                  h = de;
                  break;
                case "defaultValue":
                  E = de;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (de != null)
                    throw Error(i(137, n));
                  break;
                default:
                  Nt(e, n, l, de, r, null);
              }
          }
        Rm(
          e,
          h,
          E,
          L,
          re,
          x,
          d,
          !1
        );
        return;
      case "select":
        it("invalid", e), l = x = h = null;
        for (d in r)
          if (r.hasOwnProperty(d) && (E = r[d], E != null))
            switch (d) {
              case "value":
                h = E;
                break;
              case "defaultValue":
                x = E;
                break;
              case "multiple":
                l = E;
              default:
                Nt(e, n, d, E, r, null);
            }
        n = h, r = x, e.multiple = !!l, n != null ? is(e, !!l, n, !1) : r != null && is(e, !!l, r, !0);
        return;
      case "textarea":
        it("invalid", e), h = d = l = null;
        for (x in r)
          if (r.hasOwnProperty(x) && (E = r[x], E != null))
            switch (x) {
              case "value":
                l = E;
                break;
              case "defaultValue":
                d = E;
                break;
              case "children":
                h = E;
                break;
              case "dangerouslySetInnerHTML":
                if (E != null) throw Error(i(91));
                break;
              default:
                Nt(e, n, x, E, r, null);
            }
        Mm(e, l, d, h);
        return;
      case "option":
        for (L in r)
          if (r.hasOwnProperty(L) && (l = r[L], l != null))
            switch (L) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                Nt(e, n, L, l, r, null);
            }
        return;
      case "dialog":
        it("beforetoggle", e), it("toggle", e), it("cancel", e), it("close", e);
        break;
      case "iframe":
      case "object":
        it("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Vi.length; l++)
          it(Vi[l], e);
        break;
      case "image":
        it("error", e), it("load", e);
        break;
      case "details":
        it("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        it("error", e), it("load", e);
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
        for (re in r)
          if (r.hasOwnProperty(re) && (l = r[re], l != null))
            switch (re) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(i(137, n));
              default:
                Nt(e, n, re, l, r, null);
            }
        return;
      default:
        if (ru(n)) {
          for (de in r)
            r.hasOwnProperty(de) && (l = r[de], l !== void 0 && Fd(
              e,
              n,
              de,
              l,
              r,
              void 0
            ));
          return;
        }
    }
    for (E in r)
      r.hasOwnProperty(E) && (l = r[E], l != null && Nt(e, n, E, l, r, null));
  }
  function hE(e, n, r, l) {
    switch (n) {
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
        var d = null, h = null, x = null, E = null, L = null, re = null, de = null;
        for (oe in r) {
          var pe = r[oe];
          if (r.hasOwnProperty(oe) && pe != null)
            switch (oe) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                L = pe;
              default:
                l.hasOwnProperty(oe) || Nt(e, n, oe, null, l, pe);
            }
        }
        for (var le in l) {
          var oe = l[le];
          if (pe = r[le], l.hasOwnProperty(le) && (oe != null || pe != null))
            switch (le) {
              case "type":
                h = oe;
                break;
              case "name":
                d = oe;
                break;
              case "checked":
                re = oe;
                break;
              case "defaultChecked":
                de = oe;
                break;
              case "value":
                x = oe;
                break;
              case "defaultValue":
                E = oe;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (oe != null)
                  throw Error(i(137, n));
                break;
              default:
                oe !== pe && Nt(
                  e,
                  n,
                  le,
                  oe,
                  l,
                  pe
                );
            }
        }
        nu(
          e,
          x,
          E,
          L,
          re,
          de,
          h,
          d
        );
        return;
      case "select":
        oe = x = E = le = null;
        for (h in r)
          if (L = r[h], r.hasOwnProperty(h) && L != null)
            switch (h) {
              case "value":
                break;
              case "multiple":
                oe = L;
              default:
                l.hasOwnProperty(h) || Nt(
                  e,
                  n,
                  h,
                  null,
                  l,
                  L
                );
            }
        for (d in l)
          if (h = l[d], L = r[d], l.hasOwnProperty(d) && (h != null || L != null))
            switch (d) {
              case "value":
                le = h;
                break;
              case "defaultValue":
                E = h;
                break;
              case "multiple":
                x = h;
              default:
                h !== L && Nt(
                  e,
                  n,
                  d,
                  h,
                  l,
                  L
                );
            }
        n = E, r = x, l = oe, le != null ? is(e, !!r, le, !1) : !!l != !!r && (n != null ? is(e, !!r, n, !0) : is(e, !!r, r ? [] : "", !1));
        return;
      case "textarea":
        oe = le = null;
        for (E in r)
          if (d = r[E], r.hasOwnProperty(E) && d != null && !l.hasOwnProperty(E))
            switch (E) {
              case "value":
                break;
              case "children":
                break;
              default:
                Nt(e, n, E, null, l, d);
            }
        for (x in l)
          if (d = l[x], h = r[x], l.hasOwnProperty(x) && (d != null || h != null))
            switch (x) {
              case "value":
                le = d;
                break;
              case "defaultValue":
                oe = d;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (d != null) throw Error(i(91));
                break;
              default:
                d !== h && Nt(e, n, x, d, l, h);
            }
        _m(e, le, oe);
        return;
      case "option":
        for (var ze in r)
          if (le = r[ze], r.hasOwnProperty(ze) && le != null && !l.hasOwnProperty(ze))
            switch (ze) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Nt(
                  e,
                  n,
                  ze,
                  null,
                  l,
                  le
                );
            }
        for (L in l)
          if (le = l[L], oe = r[L], l.hasOwnProperty(L) && le !== oe && (le != null || oe != null))
            switch (L) {
              case "selected":
                e.selected = le && typeof le != "function" && typeof le != "symbol";
                break;
              default:
                Nt(
                  e,
                  n,
                  L,
                  le,
                  l,
                  oe
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
        for (var qe in r)
          le = r[qe], r.hasOwnProperty(qe) && le != null && !l.hasOwnProperty(qe) && Nt(e, n, qe, null, l, le);
        for (re in l)
          if (le = l[re], oe = r[re], l.hasOwnProperty(re) && le !== oe && (le != null || oe != null))
            switch (re) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (le != null)
                  throw Error(i(137, n));
                break;
              default:
                Nt(
                  e,
                  n,
                  re,
                  le,
                  l,
                  oe
                );
            }
        return;
      default:
        if (ru(n)) {
          for (var Ct in r)
            le = r[Ct], r.hasOwnProperty(Ct) && le !== void 0 && !l.hasOwnProperty(Ct) && Fd(
              e,
              n,
              Ct,
              void 0,
              l,
              le
            );
          for (de in l)
            le = l[de], oe = r[de], !l.hasOwnProperty(de) || le === oe || le === void 0 && oe === void 0 || Fd(
              e,
              n,
              de,
              le,
              l,
              oe
            );
          return;
        }
    }
    for (var X in r)
      le = r[X], r.hasOwnProperty(X) && le != null && !l.hasOwnProperty(X) && Nt(e, n, X, null, l, le);
    for (pe in l)
      le = l[pe], oe = r[pe], !l.hasOwnProperty(pe) || le === oe || le == null && oe == null || Nt(e, n, pe, le, l, oe);
  }
  function Dv(e) {
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
  function mE() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, r = performance.getEntriesByType("resource"), l = 0; l < r.length; l++) {
        var d = r[l], h = d.transferSize, x = d.initiatorType, E = d.duration;
        if (h && E && Dv(x)) {
          for (x = 0, E = d.responseEnd, l += 1; l < r.length; l++) {
            var L = r[l], re = L.startTime;
            if (re > E) break;
            var de = L.transferSize, pe = L.initiatorType;
            de && Dv(pe) && (L = L.responseEnd, x += de * (L < E ? 1 : (E - re) / (L - re)));
          }
          if (--l, n += 8 * (h + x) / (d.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Pd = null, Gd = null;
  function Ao(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function zv(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Ov(e, n) {
    if (e === 0)
      switch (n) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && n === "foreignObject" ? 0 : e;
  }
  function Yd(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Kd = null;
  function pE() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Kd ? !1 : (Kd = e, !0) : (Kd = null, !1);
  }
  var Lv = typeof setTimeout == "function" ? setTimeout : void 0, gE = typeof clearTimeout == "function" ? clearTimeout : void 0, $v = typeof Promise == "function" ? Promise : void 0, vE = typeof queueMicrotask == "function" ? queueMicrotask : typeof $v < "u" ? function(e) {
    return $v.resolve(null).then(e).catch(yE);
  } : Lv;
  function yE(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function or(e) {
    return e === "head";
  }
  function Uv(e, n) {
    var r = n, l = 0;
    do {
      var d = r.nextSibling;
      if (e.removeChild(r), d && d.nodeType === 8)
        if (r = d.data, r === "/$" || r === "/&") {
          if (l === 0) {
            e.removeChild(d), Us(n);
            return;
          }
          l--;
        } else if (r === "$" || r === "$?" || r === "$~" || r === "$!" || r === "&")
          l++;
        else if (r === "html")
          Hi(e.ownerDocument.documentElement);
        else if (r === "head") {
          r = e.ownerDocument.head, Hi(r);
          for (var h = r.firstChild; h; ) {
            var x = h.nextSibling, E = h.nodeName;
            h[et] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && h.rel.toLowerCase() === "stylesheet" || r.removeChild(h), h = x;
          }
        } else
          r === "body" && Hi(e.ownerDocument.body);
      r = d;
    } while (r);
    Us(n);
  }
  function Bv(e, n) {
    var r = e;
    e = 0;
    do {
      var l = r.nextSibling;
      if (r.nodeType === 1 ? n ? (r._stashedDisplay = r.style.display, r.style.display = "none") : (r.style.display = r._stashedDisplay || "", r.getAttribute("style") === "" && r.removeAttribute("style")) : r.nodeType === 3 && (n ? (r._stashedText = r.nodeValue, r.nodeValue = "") : r.nodeValue = r._stashedText || ""), l && l.nodeType === 8)
        if (r = l.data, r === "/$") {
          if (e === 0) break;
          e--;
        } else
          r !== "$" && r !== "$?" && r !== "$~" && r !== "$!" || e++;
      r = l;
    } while (r);
  }
  function Xd(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var r = n;
      switch (n = n.nextSibling, r.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Xd(r), Rt(r);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (r.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(r);
    }
  }
  function bE(e, n, r, l) {
    for (; e.nodeType === 1; ) {
      var d = r;
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[et])
          switch (n) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (h = e.getAttribute("rel"), h === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (h !== d.rel || e.getAttribute("href") !== (d.href == null || d.href === "" ? null : d.href) || e.getAttribute("crossorigin") !== (d.crossOrigin == null ? null : d.crossOrigin) || e.getAttribute("title") !== (d.title == null ? null : d.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (h = e.getAttribute("src"), (h !== (d.src == null ? null : d.src) || e.getAttribute("type") !== (d.type == null ? null : d.type) || e.getAttribute("crossorigin") !== (d.crossOrigin == null ? null : d.crossOrigin)) && h && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (n === "input" && e.type === "hidden") {
        var h = d.name == null ? null : "" + d.name;
        if (d.type === "hidden" && e.getAttribute("name") === h)
          return e;
      } else return e;
      if (e = Zn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function xE(e, n, r) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !r || (e = Zn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Iv(e, n) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Zn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Qd(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Zd(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function SE(e, n) {
    var r = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = n;
    else if (e.data !== "$?" || r.readyState !== "loading")
      n();
    else {
      var l = function() {
        n(), r.removeEventListener("DOMContentLoaded", l);
      };
      r.addEventListener("DOMContentLoaded", l), e._reactRetry = l;
    }
  }
  function Zn(e) {
    for (; e != null; e = e.nextSibling) {
      var n = e.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (n = e.data, n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&" || n === "F!" || n === "F")
          break;
        if (n === "/$" || n === "/&") return null;
      }
    }
    return e;
  }
  var Jd = null;
  function Vv(e) {
    e = e.nextSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var r = e.data;
        if (r === "/$" || r === "/&") {
          if (n === 0)
            return Zn(e.nextSibling);
          n--;
        } else
          r !== "$" && r !== "$!" && r !== "$?" && r !== "$~" && r !== "&" || n++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function qv(e) {
    e = e.previousSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var r = e.data;
        if (r === "$" || r === "$!" || r === "$?" || r === "$~" || r === "&") {
          if (n === 0) return e;
          n--;
        } else r !== "/$" && r !== "/&" || n++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Hv(e, n, r) {
    switch (n = Ao(r), e) {
      case "html":
        if (e = n.documentElement, !e) throw Error(i(452));
        return e;
      case "head":
        if (e = n.head, !e) throw Error(i(453));
        return e;
      case "body":
        if (e = n.body, !e) throw Error(i(454));
        return e;
      default:
        throw Error(i(451));
    }
  }
  function Hi(e) {
    for (var n = e.attributes; n.length; )
      e.removeAttributeNode(n[0]);
    Rt(e);
  }
  var Jn = /* @__PURE__ */ new Map(), Fv = /* @__PURE__ */ new Set();
  function ko(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Ua = V.d;
  V.d = {
    f: wE,
    r: jE,
    D: EE,
    C: NE,
    L: CE,
    m: TE,
    X: _E,
    S: RE,
    M: ME
  };
  function wE() {
    var e = Ua.f(), n = jo();
    return e || n;
  }
  function jE(e) {
    var n = $t(e);
    n !== null && n.tag === 5 && n.type === "form" ? lg(n) : Ua.r(e);
  }
  var Os = typeof document > "u" ? null : document;
  function Pv(e, n, r) {
    var l = Os;
    if (l && typeof n == "string" && n) {
      var d = Fn(n);
      d = 'link[rel="' + e + '"][href="' + d + '"]', typeof r == "string" && (d += '[crossorigin="' + r + '"]'), Fv.has(d) || (Fv.add(d), e = { rel: e, crossOrigin: r, href: n }, l.querySelector(d) === null && (n = l.createElement("link"), hn(n, "link", e), kt(n), l.head.appendChild(n)));
    }
  }
  function EE(e) {
    Ua.D(e), Pv("dns-prefetch", e, null);
  }
  function NE(e, n) {
    Ua.C(e, n), Pv("preconnect", e, n);
  }
  function CE(e, n, r) {
    Ua.L(e, n, r);
    var l = Os;
    if (l && e && n) {
      var d = 'link[rel="preload"][as="' + Fn(n) + '"]';
      n === "image" && r && r.imageSrcSet ? (d += '[imagesrcset="' + Fn(
        r.imageSrcSet
      ) + '"]', typeof r.imageSizes == "string" && (d += '[imagesizes="' + Fn(
        r.imageSizes
      ) + '"]')) : d += '[href="' + Fn(e) + '"]';
      var h = d;
      switch (n) {
        case "style":
          h = Ls(e);
          break;
        case "script":
          h = $s(e);
      }
      Jn.has(h) || (e = v(
        {
          rel: "preload",
          href: n === "image" && r && r.imageSrcSet ? void 0 : e,
          as: n
        },
        r
      ), Jn.set(h, e), l.querySelector(d) !== null || n === "style" && l.querySelector(Fi(h)) || n === "script" && l.querySelector(Pi(h)) || (n = l.createElement("link"), hn(n, "link", e), kt(n), l.head.appendChild(n)));
    }
  }
  function TE(e, n) {
    Ua.m(e, n);
    var r = Os;
    if (r && e) {
      var l = n && typeof n.as == "string" ? n.as : "script", d = 'link[rel="modulepreload"][as="' + Fn(l) + '"][href="' + Fn(e) + '"]', h = d;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          h = $s(e);
      }
      if (!Jn.has(h) && (e = v({ rel: "modulepreload", href: e }, n), Jn.set(h, e), r.querySelector(d) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (r.querySelector(Pi(h)))
              return;
        }
        l = r.createElement("link"), hn(l, "link", e), kt(l), r.head.appendChild(l);
      }
    }
  }
  function RE(e, n, r) {
    Ua.S(e, n, r);
    var l = Os;
    if (l && e) {
      var d = Qt(l).hoistableStyles, h = Ls(e);
      n = n || "default";
      var x = d.get(h);
      if (!x) {
        var E = { loading: 0, preload: null };
        if (x = l.querySelector(
          Fi(h)
        ))
          E.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": n },
            r
          ), (r = Jn.get(h)) && Wd(e, r);
          var L = x = l.createElement("link");
          kt(L), hn(L, "link", e), L._p = new Promise(function(re, de) {
            L.onload = re, L.onerror = de;
          }), L.addEventListener("load", function() {
            E.loading |= 1;
          }), L.addEventListener("error", function() {
            E.loading |= 2;
          }), E.loading |= 4, Do(x, n, l);
        }
        x = {
          type: "stylesheet",
          instance: x,
          count: 1,
          state: E
        }, d.set(h, x);
      }
    }
  }
  function _E(e, n) {
    Ua.X(e, n);
    var r = Os;
    if (r && e) {
      var l = Qt(r).hoistableScripts, d = $s(e), h = l.get(d);
      h || (h = r.querySelector(Pi(d)), h || (e = v({ src: e, async: !0 }, n), (n = Jn.get(d)) && ef(e, n), h = r.createElement("script"), kt(h), hn(h, "link", e), r.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(d, h));
    }
  }
  function ME(e, n) {
    Ua.M(e, n);
    var r = Os;
    if (r && e) {
      var l = Qt(r).hoistableScripts, d = $s(e), h = l.get(d);
      h || (h = r.querySelector(Pi(d)), h || (e = v({ src: e, async: !0, type: "module" }, n), (n = Jn.get(d)) && ef(e, n), h = r.createElement("script"), kt(h), hn(h, "link", e), r.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(d, h));
    }
  }
  function Gv(e, n, r, l) {
    var d = (d = W.current) ? ko(d) : null;
    if (!d) throw Error(i(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof r.precedence == "string" && typeof r.href == "string" ? (n = Ls(r.href), r = Qt(
          d
        ).hoistableStyles, l = r.get(n), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, r.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (r.rel === "stylesheet" && typeof r.href == "string" && typeof r.precedence == "string") {
          e = Ls(r.href);
          var h = Qt(
            d
          ).hoistableStyles, x = h.get(e);
          if (x || (d = d.ownerDocument || d, x = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, h.set(e, x), (h = d.querySelector(
            Fi(e)
          )) && !h._p && (x.instance = h, x.state.loading = 5), Jn.has(e) || (r = {
            rel: "preload",
            as: "style",
            href: r.href,
            crossOrigin: r.crossOrigin,
            integrity: r.integrity,
            media: r.media,
            hrefLang: r.hrefLang,
            referrerPolicy: r.referrerPolicy
          }, Jn.set(e, r), h || AE(
            d,
            e,
            r,
            x.state
          ))), n && l === null)
            throw Error(i(528, ""));
          return x;
        }
        if (n && l !== null)
          throw Error(i(529, ""));
        return null;
      case "script":
        return n = r.async, r = r.src, typeof r == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = $s(r), r = Qt(
          d
        ).hoistableScripts, l = r.get(n), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, r.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(i(444, e));
    }
  }
  function Ls(e) {
    return 'href="' + Fn(e) + '"';
  }
  function Fi(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Yv(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function AE(e, n, r, l) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? l.loading = 1 : (n = e.createElement("link"), l.preload = n, n.addEventListener("load", function() {
      return l.loading |= 1;
    }), n.addEventListener("error", function() {
      return l.loading |= 2;
    }), hn(n, "link", r), kt(n), e.head.appendChild(n));
  }
  function $s(e) {
    return '[src="' + Fn(e) + '"]';
  }
  function Pi(e) {
    return "script[async]" + e;
  }
  function Kv(e, n, r) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + Fn(r.href) + '"]'
          );
          if (l)
            return n.instance = l, kt(l), l;
          var d = v({}, r, {
            "data-href": r.href,
            "data-precedence": r.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), kt(l), hn(l, "style", d), Do(l, r.precedence, e), n.instance = l;
        case "stylesheet":
          d = Ls(r.href);
          var h = e.querySelector(
            Fi(d)
          );
          if (h)
            return n.state.loading |= 4, n.instance = h, kt(h), h;
          l = Yv(r), (d = Jn.get(d)) && Wd(l, d), h = (e.ownerDocument || e).createElement("link"), kt(h);
          var x = h;
          return x._p = new Promise(function(E, L) {
            x.onload = E, x.onerror = L;
          }), hn(h, "link", l), n.state.loading |= 4, Do(h, r.precedence, e), n.instance = h;
        case "script":
          return h = $s(r.src), (d = e.querySelector(
            Pi(h)
          )) ? (n.instance = d, kt(d), d) : (l = r, (d = Jn.get(h)) && (l = v({}, r), ef(l, d)), e = e.ownerDocument || e, d = e.createElement("script"), kt(d), hn(d, "link", l), e.head.appendChild(d), n.instance = d);
        case "void":
          return null;
        default:
          throw Error(i(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (l = n.instance, n.state.loading |= 4, Do(l, r.precedence, e));
    return n.instance;
  }
  function Do(e, n, r) {
    for (var l = r.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), d = l.length ? l[l.length - 1] : null, h = d, x = 0; x < l.length; x++) {
      var E = l[x];
      if (E.dataset.precedence === n) h = E;
      else if (h !== d) break;
    }
    h ? h.parentNode.insertBefore(e, h.nextSibling) : (n = r.nodeType === 9 ? r.head : r, n.insertBefore(e, n.firstChild));
  }
  function Wd(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function ef(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var zo = null;
  function Xv(e, n, r) {
    if (zo === null) {
      var l = /* @__PURE__ */ new Map(), d = zo = /* @__PURE__ */ new Map();
      d.set(r, l);
    } else
      d = zo, l = d.get(r), l || (l = /* @__PURE__ */ new Map(), d.set(r, l));
    if (l.has(e)) return l;
    for (l.set(e, null), r = r.getElementsByTagName(e), d = 0; d < r.length; d++) {
      var h = r[d];
      if (!(h[et] || h[Se] || e === "link" && h.getAttribute("rel") === "stylesheet") && h.namespaceURI !== "http://www.w3.org/2000/svg") {
        var x = h.getAttribute(n) || "";
        x = e + x;
        var E = l.get(x);
        E ? E.push(h) : l.set(x, [h]);
      }
    }
    return l;
  }
  function Qv(e, n, r) {
    e = e.ownerDocument || e, e.head.insertBefore(
      r,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function kE(e, n, r) {
    if (r === 1 || n.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof n.precedence != "string" || typeof n.href != "string" || n.href === "")
          break;
        return !0;
      case "link":
        if (typeof n.rel != "string" || typeof n.href != "string" || n.href === "" || n.onLoad || n.onError)
          break;
        switch (n.rel) {
          case "stylesheet":
            return e = n.disabled, typeof n.precedence == "string" && e == null;
          default:
            return !0;
        }
      case "script":
        if (n.async && typeof n.async != "function" && typeof n.async != "symbol" && !n.onLoad && !n.onError && n.src && typeof n.src == "string")
          return !0;
    }
    return !1;
  }
  function Zv(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function DE(e, n, r, l) {
    if (r.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (r.state.loading & 4) === 0) {
      if (r.instance === null) {
        var d = Ls(l.href), h = n.querySelector(
          Fi(d)
        );
        if (h) {
          n = h._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = Oo.bind(e), n.then(e, e)), r.state.loading |= 4, r.instance = h, kt(h);
          return;
        }
        h = n.ownerDocument || n, l = Yv(l), (d = Jn.get(d)) && Wd(l, d), h = h.createElement("link"), kt(h);
        var x = h;
        x._p = new Promise(function(E, L) {
          x.onload = E, x.onerror = L;
        }), hn(h, "link", l), r.instance = h;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(r, n), (n = r.state.preload) && (r.state.loading & 3) === 0 && (e.count++, r = Oo.bind(e), n.addEventListener("load", r), n.addEventListener("error", r));
    }
  }
  var tf = 0;
  function zE(e, n) {
    return e.stylesheets && e.count === 0 && $o(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(r) {
      var l = setTimeout(function() {
        if (e.stylesheets && $o(e, e.stylesheets), e.unsuspend) {
          var h = e.unsuspend;
          e.unsuspend = null, h();
        }
      }, 6e4 + n);
      0 < e.imgBytes && tf === 0 && (tf = 62500 * mE());
      var d = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && $o(e, e.stylesheets), e.unsuspend)) {
            var h = e.unsuspend;
            e.unsuspend = null, h();
          }
        },
        (e.imgBytes > tf ? 50 : 800) + n
      );
      return e.unsuspend = r, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(d);
      };
    } : null;
  }
  function Oo() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) $o(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Lo = null;
  function $o(e, n) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Lo = /* @__PURE__ */ new Map(), n.forEach(OE, e), Lo = null, Oo.call(e));
  }
  function OE(e, n) {
    if (!(n.state.loading & 4)) {
      var r = Lo.get(e);
      if (r) var l = r.get(null);
      else {
        r = /* @__PURE__ */ new Map(), Lo.set(e, r);
        for (var d = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), h = 0; h < d.length; h++) {
          var x = d[h];
          (x.nodeName === "LINK" || x.getAttribute("media") !== "not all") && (r.set(x.dataset.precedence, x), l = x);
        }
        l && r.set(null, l);
      }
      d = n.instance, x = d.getAttribute("data-precedence"), h = r.get(x) || l, h === l && r.set(null, d), r.set(x, d), this.count++, l = Oo.bind(this), d.addEventListener("load", l), d.addEventListener("error", l), h ? h.parentNode.insertBefore(d, h.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(d, e.firstChild)), n.state.loading |= 4;
    }
  }
  var Gi = {
    $$typeof: R,
    Provider: null,
    Consumer: null,
    _currentValue: $,
    _currentValue2: $,
    _threadCount: 0
  };
  function LE(e, n, r, l, d, h, x, E, L) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ce(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ce(0), this.hiddenUpdates = Ce(null), this.identifierPrefix = l, this.onUncaughtError = d, this.onCaughtError = h, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = L, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Jv(e, n, r, l, d, h, x, E, L, re, de, pe) {
    return e = new LE(
      e,
      n,
      r,
      x,
      L,
      re,
      de,
      pe,
      E
    ), n = 1, h === !0 && (n |= 24), h = Ln(3, null, null, n), e.current = h, h.stateNode = e, n = zu(), n.refCount++, e.pooledCache = n, n.refCount++, h.memoizedState = {
      element: l,
      isDehydrated: r,
      cache: n
    }, Uu(h), e;
  }
  function Wv(e) {
    return e ? (e = ms, e) : ms;
  }
  function ey(e, n, r, l, d, h) {
    d = Wv(d), l.context === null ? l.context = d : l.pendingContext = d, l = Za(n), l.payload = { element: r }, h = h === void 0 ? null : h, h !== null && (l.callback = h), r = Ja(e, l, n), r !== null && (Mn(r, e, n), Ei(r, e, n));
  }
  function ty(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < n ? r : n;
    }
  }
  function nf(e, n) {
    ty(e, n), (e = e.alternate) && ty(e, n);
  }
  function ny(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = zr(e, 67108864);
      n !== null && Mn(n, e, 67108864), nf(e, 67108864);
    }
  }
  function ay(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Vn();
      n = H(n);
      var r = zr(e, n);
      r !== null && Mn(r, e, n), nf(e, n);
    }
  }
  var Uo = !0;
  function $E(e, n, r, l) {
    var d = A.T;
    A.T = null;
    var h = V.p;
    try {
      V.p = 2, af(e, n, r, l);
    } finally {
      V.p = h, A.T = d;
    }
  }
  function UE(e, n, r, l) {
    var d = A.T;
    A.T = null;
    var h = V.p;
    try {
      V.p = 8, af(e, n, r, l);
    } finally {
      V.p = h, A.T = d;
    }
  }
  function af(e, n, r, l) {
    if (Uo) {
      var d = rf(l);
      if (d === null)
        Hd(
          e,
          n,
          l,
          Bo,
          r
        ), sy(e, l);
      else if (IE(
        d,
        e,
        n,
        r,
        l
      ))
        l.stopPropagation();
      else if (sy(e, l), n & 4 && -1 < BE.indexOf(e)) {
        for (; d !== null; ) {
          var h = $t(d);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (h = h.stateNode, h.current.memoizedState.isDehydrated) {
                  var x = Re(h.pendingLanes);
                  if (x !== 0) {
                    var E = h;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; x; ) {
                      var L = 1 << 31 - Bt(x);
                      E.entanglements[1] |= L, x &= ~L;
                    }
                    ba(h), (vt & 6) === 0 && (So = gt() + 500, Ii(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = zr(h, 2), E !== null && Mn(E, h, 2), jo(), nf(h, 2);
            }
          if (h = rf(l), h === null && Hd(
            e,
            n,
            l,
            Bo,
            r
          ), h === d) break;
          d = h;
        }
        d !== null && l.stopPropagation();
      } else
        Hd(
          e,
          n,
          l,
          null,
          r
        );
    }
  }
  function rf(e) {
    return e = iu(e), sf(e);
  }
  var Bo = null;
  function sf(e) {
    if (Bo = null, e = jt(e), e !== null) {
      var n = u(e);
      if (n === null) e = null;
      else {
        var r = n.tag;
        if (r === 13) {
          if (e = f(n), e !== null) return e;
          e = null;
        } else if (r === 31) {
          if (e = m(n), e !== null) return e;
          e = null;
        } else if (r === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          e = null;
        } else n !== e && (e = null);
      }
    }
    return Bo = e, null;
  }
  function ry(e) {
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
        switch (je()) {
          case ke:
            return 2;
          case Pe:
            return 8;
          case Xe:
          case yt:
            return 32;
          case Tt:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var lf = !1, cr = null, ur = null, dr = null, Yi = /* @__PURE__ */ new Map(), Ki = /* @__PURE__ */ new Map(), fr = [], BE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function sy(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        cr = null;
        break;
      case "dragenter":
      case "dragleave":
        ur = null;
        break;
      case "mouseover":
      case "mouseout":
        dr = null;
        break;
      case "pointerover":
      case "pointerout":
        Yi.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ki.delete(n.pointerId);
    }
  }
  function Xi(e, n, r, l, d, h) {
    return e === null || e.nativeEvent !== h ? (e = {
      blockedOn: n,
      domEventName: r,
      eventSystemFlags: l,
      nativeEvent: h,
      targetContainers: [d]
    }, n !== null && (n = $t(n), n !== null && ny(n)), e) : (e.eventSystemFlags |= l, n = e.targetContainers, d !== null && n.indexOf(d) === -1 && n.push(d), e);
  }
  function IE(e, n, r, l, d) {
    switch (n) {
      case "focusin":
        return cr = Xi(
          cr,
          e,
          n,
          r,
          l,
          d
        ), !0;
      case "dragenter":
        return ur = Xi(
          ur,
          e,
          n,
          r,
          l,
          d
        ), !0;
      case "mouseover":
        return dr = Xi(
          dr,
          e,
          n,
          r,
          l,
          d
        ), !0;
      case "pointerover":
        var h = d.pointerId;
        return Yi.set(
          h,
          Xi(
            Yi.get(h) || null,
            e,
            n,
            r,
            l,
            d
          )
        ), !0;
      case "gotpointercapture":
        return h = d.pointerId, Ki.set(
          h,
          Xi(
            Ki.get(h) || null,
            e,
            n,
            r,
            l,
            d
          )
        ), !0;
    }
    return !1;
  }
  function iy(e) {
    var n = jt(e.target);
    if (n !== null) {
      var r = u(n);
      if (r !== null) {
        if (n = r.tag, n === 13) {
          if (n = f(r), n !== null) {
            e.blockedOn = n, ye(e.priority, function() {
              ay(r);
            });
            return;
          }
        } else if (n === 31) {
          if (n = m(r), n !== null) {
            e.blockedOn = n, ye(e.priority, function() {
              ay(r);
            });
            return;
          }
        } else if (n === 3 && r.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Io(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length; ) {
      var r = rf(e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var l = new r.constructor(
          r.type,
          r
        );
        su = l, r.target.dispatchEvent(l), su = null;
      } else
        return n = $t(r), n !== null && ny(n), e.blockedOn = r, !1;
      n.shift();
    }
    return !0;
  }
  function ly(e, n, r) {
    Io(e) && r.delete(n);
  }
  function VE() {
    lf = !1, cr !== null && Io(cr) && (cr = null), ur !== null && Io(ur) && (ur = null), dr !== null && Io(dr) && (dr = null), Yi.forEach(ly), Ki.forEach(ly);
  }
  function Vo(e, n) {
    e.blockedOn === n && (e.blockedOn = null, lf || (lf = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      VE
    )));
  }
  var qo = null;
  function oy(e) {
    qo !== e && (qo = e, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      function() {
        qo === e && (qo = null);
        for (var n = 0; n < e.length; n += 3) {
          var r = e[n], l = e[n + 1], d = e[n + 2];
          if (typeof l != "function") {
            if (sf(l || r) === null)
              continue;
            break;
          }
          var h = $t(r);
          h !== null && (e.splice(n, 3), n -= 3, rd(
            h,
            {
              pending: !0,
              data: d,
              method: r.method,
              action: l
            },
            l,
            d
          ));
        }
      }
    ));
  }
  function Us(e) {
    function n(L) {
      return Vo(L, e);
    }
    cr !== null && Vo(cr, e), ur !== null && Vo(ur, e), dr !== null && Vo(dr, e), Yi.forEach(n), Ki.forEach(n);
    for (var r = 0; r < fr.length; r++) {
      var l = fr[r];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < fr.length && (r = fr[0], r.blockedOn === null); )
      iy(r), r.blockedOn === null && fr.shift();
    if (r = (e.ownerDocument || e).$$reactFormReplay, r != null)
      for (l = 0; l < r.length; l += 3) {
        var d = r[l], h = r[l + 1], x = d[Ee] || null;
        if (typeof h == "function")
          x || oy(r);
        else if (x) {
          var E = null;
          if (h && h.hasAttribute("formAction")) {
            if (d = h, x = h[Ee] || null)
              E = x.formAction;
            else if (sf(d) !== null) continue;
          } else E = x.action;
          typeof E == "function" ? r[l + 1] = E : (r.splice(l, 3), l -= 3), oy(r);
        }
      }
  }
  function cy() {
    function e(h) {
      h.canIntercept && h.info === "react-transition" && h.intercept({
        handler: function() {
          return new Promise(function(x) {
            return d = x;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function n() {
      d !== null && (d(), d = null), l || setTimeout(r, 20);
    }
    function r() {
      if (!l && !navigation.transition) {
        var h = navigation.currentEntry;
        h && h.url != null && navigation.navigate(h.url, {
          state: h.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var l = !1, d = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(r, 100), function() {
        l = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), d !== null && (d(), d = null);
      };
    }
  }
  function of(e) {
    this._internalRoot = e;
  }
  Ho.prototype.render = of.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(i(409));
    var r = n.current, l = Vn();
    ey(r, l, e, n, null, null);
  }, Ho.prototype.unmount = of.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      ey(e.current, 2, null, e, null, null), jo(), n[Le] = null;
    }
  };
  function Ho(e) {
    this._internalRoot = e;
  }
  Ho.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = ge();
      e = { blockedOn: null, target: e, priority: n };
      for (var r = 0; r < fr.length && n !== 0 && n < fr[r].priority; r++) ;
      fr.splice(r, 0, e), r === 0 && iy(e);
    }
  };
  var uy = a.version;
  if (uy !== "19.2.5")
    throw Error(
      i(
        527,
        uy,
        "19.2.5"
      )
    );
  V.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
    return e = p(n), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var qE = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: A,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Fo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Fo.isDisabled && Fo.supportsFiber)
      try {
        pn = Fo.inject(
          qE
        ), Pt = Fo;
      } catch {
      }
  }
  return Zi.createRoot = function(e, n) {
    if (!o(e)) throw Error(i(299));
    var r = !1, l = "", d = vg, h = yg, x = bg;
    return n != null && (n.unstable_strictMode === !0 && (r = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onUncaughtError !== void 0 && (d = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (x = n.onRecoverableError)), n = Jv(
      e,
      1,
      !1,
      null,
      null,
      r,
      l,
      null,
      d,
      h,
      x,
      cy
    ), e[Le] = n.current, qd(e), new of(n);
  }, Zi.hydrateRoot = function(e, n, r) {
    if (!o(e)) throw Error(i(299));
    var l = !1, d = "", h = vg, x = yg, E = bg, L = null;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (d = r.identifierPrefix), r.onUncaughtError !== void 0 && (h = r.onUncaughtError), r.onCaughtError !== void 0 && (x = r.onCaughtError), r.onRecoverableError !== void 0 && (E = r.onRecoverableError), r.formState !== void 0 && (L = r.formState)), n = Jv(
      e,
      1,
      !0,
      n,
      r ?? null,
      l,
      d,
      L,
      h,
      x,
      E,
      cy
    ), n.context = Wv(null), r = n.current, l = Vn(), l = H(l), d = Za(l), d.callback = null, Ja(r, d, l), r = l, n.current.lanes = r, _e(n, r), ba(n), e[Le] = n.current, qd(e), new Ho(n);
  }, Zi.version = "19.2.5", Zi;
}
var xy;
function WE() {
  if (xy) return df.exports;
  xy = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), df.exports = JE(), df.exports;
}
var eN = WE();
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
var Xx = (t) => {
  throw TypeError(t);
}, tN = (t, a, s) => a.has(t) || Xx("Cannot " + s), pf = (t, a, s) => (tN(t, a, "read from private field"), s ? s.call(t) : a.get(t)), nN = (t, a, s) => a.has(t) ? Xx("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, s);
function Sy(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function aN(t = {}) {
  let { initialEntries: a = ["/"], initialIndex: s, v5Compat: i = !1 } = t, o;
  o = a.map(
    (w, j) => b(
      w,
      typeof w == "string" ? null : w.state,
      j === 0 ? "default" : void 0,
      typeof w == "string" ? void 0 : w.unstable_mask
    )
  );
  let u = y(
    s ?? o.length - 1
  ), f = "POP", m = null;
  function y(w) {
    return Math.min(Math.max(w, 0), o.length - 1);
  }
  function p() {
    return o[u];
  }
  function b(w, j = null, C, _) {
    let T = nh(
      o ? p().pathname : "/",
      w,
      j,
      C,
      _
    );
    return Xt(
      T.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        w
      )}`
    ), T;
  }
  function v(w) {
    return typeof w == "string" ? w : Sa(w);
  }
  return {
    get index() {
      return u;
    },
    get action() {
      return f;
    },
    get location() {
      return p();
    },
    createHref: v,
    createURL(w) {
      return new URL(v(w), "http://localhost");
    },
    encodeLocation(w) {
      let j = typeof w == "string" ? fa(w) : w;
      return {
        pathname: j.pathname || "",
        search: j.search || "",
        hash: j.hash || ""
      };
    },
    push(w, j) {
      f = "PUSH";
      let C = Sy(w) ? w : b(w, j);
      u += 1, o.splice(u, o.length, C), i && m && m({ action: f, location: C, delta: 1 });
    },
    replace(w, j) {
      f = "REPLACE";
      let C = Sy(w) ? w : b(w, j);
      o[u] = C, i && m && m({ action: f, location: C, delta: 0 });
    },
    go(w) {
      f = "POP";
      let j = y(u + w), C = o[j];
      u = j, m && m({ action: f, location: C, delta: w });
    },
    listen(w) {
      return m = w, () => {
        m = null;
      };
    }
  };
}
function nt(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function Xt(t, a) {
  if (!t) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function rN() {
  return Math.random().toString(36).substring(2, 10);
}
function nh(t, a, s = null, i, o) {
  return {
    pathname: typeof t == "string" ? t : t.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? fa(a) : a,
    state: s,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || i || rN(),
    unstable_mask: o
  };
}
function Sa({
  pathname: t = "/",
  search: a = "",
  hash: s = ""
}) {
  return a && a !== "?" && (t += a.charAt(0) === "?" ? a : "?" + a), s && s !== "#" && (t += s.charAt(0) === "#" ? s : "#" + s), t;
}
function fa(t) {
  let a = {};
  if (t) {
    let s = t.indexOf("#");
    s >= 0 && (a.hash = t.substring(s), t = t.substring(0, s));
    let i = t.indexOf("?");
    i >= 0 && (a.search = t.substring(i), t = t.substring(0, i)), t && (a.pathname = t);
  }
  return a;
}
function sN(t, a = !1) {
  let s = "http://localhost";
  typeof window < "u" && (s = window.location.origin !== "null" ? window.location.origin : window.location.href), nt(s, "No window.location.(origin|href) available to create URL");
  let i = typeof t == "string" ? t : Sa(t);
  return i = i.replace(/ $/, "%20"), !a && i.startsWith("//") && (i = s + i), new URL(i, s);
}
var cl, wy = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(t) {
    if (nN(this, cl, /* @__PURE__ */ new Map()), t)
      for (let [a, s] of t)
        this.set(a, s);
  }
  /**
   * Access a value from the context. If no value has been set for the context,
   * it will return the context's `defaultValue` if provided, or throw an error
   * if no `defaultValue` was set.
   * @param context The context to get the value for
   * @returns The value for the context, or the context's `defaultValue` if no
   * value was set
   */
  get(t) {
    if (pf(this, cl).has(t))
      return pf(this, cl).get(t);
    if (t.defaultValue !== void 0)
      return t.defaultValue;
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
  set(t, a) {
    pf(this, cl).set(t, a);
  }
};
cl = /* @__PURE__ */ new WeakMap();
var iN = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function lN(t) {
  return iN.has(
    t
  );
}
var oN = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function cN(t) {
  return oN.has(
    t
  );
}
function uN(t) {
  return t.index === !0;
}
function gl(t, a, s = [], i = {}, o = !1) {
  return t.map((u, f) => {
    let m = [...s, String(f)], y = typeof u.id == "string" ? u.id : m.join("-");
    if (nt(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), nt(
      o || !i[y],
      `Found a route id collision on id "${y}".  Route id's must be globally unique within Data Router usages`
    ), uN(u)) {
      let p = {
        ...u,
        id: y
      };
      return i[y] = jy(
        p,
        a(p)
      ), p;
    } else {
      let p = {
        ...u,
        id: y,
        children: void 0
      };
      return i[y] = jy(
        p,
        a(p)
      ), u.children && (p.children = gl(
        u.children,
        a,
        m,
        i,
        o
      )), p;
    }
  });
}
function jy(t, a) {
  return Object.assign(t, {
    ...a,
    ...typeof a.lazy == "object" && a.lazy != null ? {
      lazy: {
        ...t.lazy,
        ...a.lazy
      }
    } : {}
  });
}
function xr(t, a, s = "/") {
  return ul(t, a, s, !1);
}
function ul(t, a, s, i) {
  let o = typeof a == "string" ? fa(a) : a, u = aa(o.pathname || "/", s);
  if (u == null)
    return null;
  let f = Qx(t);
  fN(f);
  let m = null;
  for (let y = 0; m == null && y < f.length; ++y) {
    let p = jN(u);
    m = SN(
      f[y],
      p,
      i
    );
  }
  return m;
}
function dN(t, a) {
  let { route: s, pathname: i, params: o } = t;
  return {
    id: s.id,
    pathname: i,
    params: o,
    data: a[s.id],
    loaderData: a[s.id],
    handle: s.handle
  };
}
function Qx(t, a = [], s = [], i = "", o = !1) {
  let u = (f, m, y = o, p) => {
    let b = {
      relativePath: p === void 0 ? f.path || "" : p,
      caseSensitive: f.caseSensitive === !0,
      childrenIndex: m,
      route: f
    };
    if (b.relativePath.startsWith("/")) {
      if (!b.relativePath.startsWith(i) && y)
        return;
      nt(
        b.relativePath.startsWith(i),
        `Absolute route path "${b.relativePath}" nested under path "${i}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), b.relativePath = b.relativePath.slice(i.length);
    }
    let v = ea([i, b.relativePath]), S = s.concat(b);
    f.children && f.children.length > 0 && (nt(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      f.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${v}".`
    ), Qx(
      f.children,
      a,
      S,
      v,
      y
    )), !(f.path == null && !f.index) && a.push({
      path: v,
      score: bN(v, f.index),
      routesMeta: S
    });
  };
  return t.forEach((f, m) => {
    if (f.path === "" || !f.path?.includes("?"))
      u(f, m);
    else
      for (let y of Zx(f.path))
        u(f, m, !0, y);
  }), a;
}
function Zx(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [s, ...i] = a, o = s.endsWith("?"), u = s.replace(/\?$/, "");
  if (i.length === 0)
    return o ? [u, ""] : [u];
  let f = Zx(i.join("/")), m = [];
  return m.push(
    ...f.map(
      (y) => y === "" ? u : [u, y].join("/")
    )
  ), o && m.push(...f), m.map(
    (y) => t.startsWith("/") && y === "" ? "/" : y
  );
}
function fN(t) {
  t.sort(
    (a, s) => a.score !== s.score ? s.score - a.score : xN(
      a.routesMeta.map((i) => i.childrenIndex),
      s.routesMeta.map((i) => i.childrenIndex)
    )
  );
}
var hN = /^:[\w-]+$/, mN = 3, pN = 2, gN = 1, vN = 10, yN = -2, Ey = (t) => t === "*";
function bN(t, a) {
  let s = t.split("/"), i = s.length;
  return s.some(Ey) && (i += yN), a && (i += pN), s.filter((o) => !Ey(o)).reduce(
    (o, u) => o + (hN.test(u) ? mN : u === "" ? gN : vN),
    i
  );
}
function xN(t, a) {
  return t.length === a.length && t.slice(0, -1).every((i, o) => i === a[o]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    t[t.length - 1] - a[a.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function SN(t, a, s = !1) {
  let { routesMeta: i } = t, o = {}, u = "/", f = [];
  for (let m = 0; m < i.length; ++m) {
    let y = i[m], p = m === i.length - 1, b = u === "/" ? a : a.slice(u.length) || "/", v = Nc(
      { path: y.relativePath, caseSensitive: y.caseSensitive, end: p },
      b
    ), S = y.route;
    if (!v && p && s && !i[i.length - 1].route.index && (v = Nc(
      {
        path: y.relativePath,
        caseSensitive: y.caseSensitive,
        end: !1
      },
      b
    )), !v)
      return null;
    Object.assign(o, v.params), f.push({
      // TODO: Can this as be avoided?
      params: o,
      pathname: ea([u, v.pathname]),
      pathnameBase: CN(
        ea([u, v.pathnameBase])
      ),
      route: S
    }), v.pathnameBase !== "/" && (u = ea([u, v.pathnameBase]));
  }
  return f;
}
function Nc(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [s, i] = wN(
    t.path,
    t.caseSensitive,
    t.end
  ), o = a.match(s);
  if (!o) return null;
  let u = o[0], f = u.replace(/(.)\/+$/, "$1"), m = o.slice(1);
  return {
    params: i.reduce(
      (p, { paramName: b, isOptional: v }, S) => {
        if (b === "*") {
          let j = m[S] || "";
          f = u.slice(0, u.length - j.length).replace(/(.)\/+$/, "$1");
        }
        const w = m[S];
        return v && !w ? p[b] = void 0 : p[b] = (w || "").replace(/%2F/g, "/"), p;
      },
      {}
    ),
    pathname: u,
    pathnameBase: f,
    pattern: t
  };
}
function wN(t, a = !1, s = !0) {
  Xt(
    t === "*" || !t.endsWith("*") || t.endsWith("/*"),
    `Route path "${t}" will be treated as if it were "${t.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/, "/*")}".`
  );
  let i = [], o = "^" + t.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (f, m, y, p, b) => {
      if (i.push({ paramName: m, isOptional: y != null }), y) {
        let v = b.charAt(p + f.length);
        return v && v !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return t.endsWith("*") ? (i.push({ paramName: "*" }), o += t === "*" || t === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : s ? o += "\\/*$" : t !== "" && t !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, a ? void 0 : "i"), i];
}
function jN(t) {
  try {
    return t.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return Xt(
      !1,
      `The URL path "${t}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), t;
  }
}
function aa(t, a) {
  if (a === "/") return t;
  if (!t.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let s = a.endsWith("/") ? a.length - 1 : a.length, i = t.charAt(s);
  return i && i !== "/" ? null : t.slice(s) || "/";
}
function EN({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : ea([t, a]);
}
var Jx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, $h = (t) => Jx.test(t);
function NN(t, a = "/") {
  let {
    pathname: s,
    search: i = "",
    hash: o = ""
  } = typeof t == "string" ? fa(t) : t, u;
  return s ? (s = Bh(s), s.startsWith("/") ? u = Ny(s.substring(1), "/") : u = Ny(s, a)) : u = a, {
    pathname: u,
    search: TN(i),
    hash: RN(o)
  };
}
function Ny(t, a) {
  let s = Cc(a).split("/");
  return t.split("/").forEach((o) => {
    o === ".." ? s.length > 1 && s.pop() : o !== "." && s.push(o);
  }), s.length > 1 ? s.join("/") : "/";
}
function gf(t, a, s, i) {
  return `Cannot include a '${t}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    i
  )}].  Please separate it out to the \`to.${s}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Wx(t) {
  return t.filter(
    (a, s) => s === 0 || a.route.path && a.route.path.length > 0
  );
}
function Uh(t) {
  let a = Wx(t);
  return a.map(
    (s, i) => i === a.length - 1 ? s.pathname : s.pathnameBase
  );
}
function Vc(t, a, s, i = !1) {
  let o;
  typeof t == "string" ? o = fa(t) : (o = { ...t }, nt(
    !o.pathname || !o.pathname.includes("?"),
    gf("?", "pathname", "search", o)
  ), nt(
    !o.pathname || !o.pathname.includes("#"),
    gf("#", "pathname", "hash", o)
  ), nt(
    !o.search || !o.search.includes("#"),
    gf("#", "search", "hash", o)
  ));
  let u = t === "" || o.pathname === "", f = u ? "/" : o.pathname, m;
  if (f == null)
    m = s;
  else {
    let v = a.length - 1;
    if (!i && f.startsWith("..")) {
      let S = f.split("/");
      for (; S[0] === ".."; )
        S.shift(), v -= 1;
      o.pathname = S.join("/");
    }
    m = v >= 0 ? a[v] : "/";
  }
  let y = NN(o, m), p = f && f !== "/" && f.endsWith("/"), b = (u || f === ".") && s.endsWith("/");
  return !y.pathname.endsWith("/") && (p || b) && (y.pathname += "/"), y;
}
var Bh = (t) => t.replace(/\/\/+/g, "/"), ea = (t) => Bh(t.join("/")), Cc = (t) => t.replace(/\/+$/, ""), CN = (t) => Cc(t).replace(/^\/*/, "/"), TN = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, RN = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, _N = (t, a = 302) => {
  let s = a;
  typeof s == "number" ? s = { status: s } : typeof s.status > "u" && (s.status = 302);
  let i = new Headers(s.headers);
  return i.set("Location", t), new Response(null, { ...s, headers: i });
}, qc = class {
  constructor(t, a, s, i = !1) {
    this.status = t, this.statusText = a || "", this.internal = i, s instanceof Error ? (this.data = s.toString(), this.error = s) : this.data = s;
  }
};
function vl(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.internal == "boolean" && "data" in t;
}
function El(t) {
  let a = t.map((s) => s.route.path).filter(Boolean);
  return ea(a) || "/";
}
var e1 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function t1(t, a) {
  let s = t;
  if (typeof s != "string" || !Jx.test(s))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: s
    };
  let i = s, o = !1;
  if (e1)
    try {
      let u = new URL(window.location.href), f = s.startsWith("//") ? new URL(u.protocol + s) : new URL(s), m = aa(f.pathname, a);
      f.origin === u.origin && m != null ? s = m + f.search + f.hash : o = !0;
    } catch {
      Xt(
        !1,
        `<Link to="${s}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return {
    absoluteURL: i,
    isExternal: o,
    to: s
  };
}
var wr = Symbol("Uninstrumented");
function MN(t, a) {
  let s = {
    lazy: [],
    "lazy.loader": [],
    "lazy.action": [],
    "lazy.middleware": [],
    middleware: [],
    loader: [],
    action: []
  };
  t.forEach(
    (o) => o({
      id: a.id,
      index: a.index,
      path: a.path,
      instrument(u) {
        let f = Object.keys(s);
        for (let m of f)
          u[m] && s[m].push(u[m]);
      }
    })
  );
  let i = {};
  if (typeof a.lazy == "function" && s.lazy.length > 0) {
    let o = Gs(s.lazy, a.lazy, () => {
    });
    o && (i.lazy = o);
  }
  if (typeof a.lazy == "object") {
    let o = a.lazy;
    ["middleware", "loader", "action"].forEach((u) => {
      let f = o[u], m = s[`lazy.${u}`];
      if (typeof f == "function" && m.length > 0) {
        let y = Gs(m, f, () => {
        });
        y && (i.lazy = Object.assign(i.lazy || {}, {
          [u]: y
        }));
      }
    });
  }
  return ["loader", "action"].forEach((o) => {
    let u = a[o];
    if (typeof u == "function" && s[o].length > 0) {
      let f = u[wr] ?? u, m = Gs(
        s[o],
        f,
        (...y) => Cy(y[0])
      );
      m && (o === "loader" && f.hydrate === !0 && (m.hydrate = !0), m[wr] = f, i[o] = m);
    }
  }), a.middleware && a.middleware.length > 0 && s.middleware.length > 0 && (i.middleware = a.middleware.map((o) => {
    let u = o[wr] ?? o, f = Gs(
      s.middleware,
      u,
      (...m) => Cy(m[0])
    );
    return f ? (f[wr] = u, f) : o;
  })), i;
}
function AN(t, a) {
  let s = {
    navigate: [],
    fetch: []
  };
  if (a.forEach(
    (i) => i({
      instrument(o) {
        let u = Object.keys(o);
        for (let f of u)
          o[f] && s[f].push(o[f]);
      }
    })
  ), s.navigate.length > 0) {
    let i = t.navigate[wr] ?? t.navigate, o = Gs(
      s.navigate,
      i,
      (...u) => {
        let [f, m] = u;
        return {
          to: typeof f == "number" || typeof f == "string" ? f : f ? Sa(f) : ".",
          ...Ty(t, m ?? {})
        };
      }
    );
    o && (o[wr] = i, t.navigate = o);
  }
  if (s.fetch.length > 0) {
    let i = t.fetch[wr] ?? t.fetch, o = Gs(s.fetch, i, (...u) => {
      let [f, , m, y] = u;
      return {
        href: m ?? ".",
        fetcherKey: f,
        ...Ty(t, y ?? {})
      };
    });
    o && (o[wr] = i, t.fetch = o);
  }
  return t;
}
function Gs(t, a, s) {
  return t.length === 0 ? null : async (...i) => {
    let o = await n1(
      t,
      s(...i),
      () => a(...i),
      t.length - 1
    );
    if (o.type === "error")
      throw o.value;
    return o.value;
  };
}
async function n1(t, a, s, i) {
  let o = t[i], u;
  if (o) {
    let f, m = async () => (f ? console.error("You cannot call instrumented handlers more than once") : f = n1(t, a, s, i - 1), u = await f, nt(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
    try {
      await o(m, a);
    } catch (y) {
      console.error("An instrumentation function threw an error:", y);
    }
    f || await m(), await f;
  } else
    try {
      u = { type: "success", value: await s() };
    } catch (f) {
      u = { type: "error", value: f };
    }
  return u || {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function Cy(t) {
  let { request: a, context: s, params: i, unstable_pattern: o } = t;
  return {
    request: kN(a),
    params: { ...i },
    unstable_pattern: o,
    context: DN(s)
  };
}
function Ty(t, a) {
  return {
    currentUrl: Sa(t.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function kN(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function DN(t) {
  if (ON(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var zN = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function ON(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === zN;
}
var a1 = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], LN = new Set(
  a1
), $N = [
  "GET",
  ...a1
], UN = new Set($N), r1 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), BN = /* @__PURE__ */ new Set([307, 308]), vf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, IN = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Ji = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, VN = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), s1 = "remix-router-transitions", i1 = Symbol("ResetLoaderData");
function qN(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, s = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  nt(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let i = t.hydrationRouteProperties || [], o = t.mapRouteProperties || VN, u = o;
  if (t.unstable_instrumentations) {
    let z = t.unstable_instrumentations;
    u = (H) => ({
      ...o(H),
      ...MN(
        z.map((Q) => Q.route).filter(Boolean),
        H
      )
    });
  }
  let f = {}, m = gl(
    t.routes,
    u,
    void 0,
    f
  ), y, p = t.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let b = t.dataStrategy || YN, v = {
    unstable_passThroughRequests: !1,
    ...t.future
  }, S = null, w = /* @__PURE__ */ new Set(), j = null, C = null, _ = null, T = t.hydrationData != null, O = xr(m, t.history.location, p), R = !1, N = null, B, G;
  if (O == null && !t.patchRoutesOnNavigation) {
    let z = Wn(404, {
      pathname: t.history.location.pathname
    }), { matches: H, route: Q } = Po(m);
    B = !0, G = !B, O = H, N = { [Q.id]: z };
  } else if (O && !t.hydrationData && Ce(
    O,
    m,
    t.history.location.pathname
  ).active && (O = null), O)
    if (O.some((z) => z.route.lazy))
      B = !1, G = !B;
    else if (!O.some((z) => Ih(z.route)))
      B = !0, G = !B;
    else {
      let z = t.hydrationData ? t.hydrationData.loaderData : null, H = t.hydrationData ? t.hydrationData.errors : null, Q = O;
      if (H) {
        let ge = O.findIndex(
          (ye) => H[ye.route.id] !== void 0
        );
        Q = Q.slice(0, ge + 1);
      }
      G = !1, B = !0, Q.forEach((ge) => {
        let ye = l1(ge.route, z, H);
        G = G || ye.renderFallback, B = B && !ye.shouldLoad;
      });
    }
  else {
    B = !1, G = !B, O = [];
    let z = Ce(
      null,
      m,
      t.history.location.pathname
    );
    z.active && z.matches && (R = !0, O = z.matches);
  }
  let te, M = {
    historyAction: t.history.action,
    location: t.history.location,
    matches: O,
    initialized: B,
    renderFallback: G,
    navigation: vf,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: t.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: t.hydrationData && t.hydrationData.loaderData || {},
    actionData: t.hydrationData && t.hydrationData.actionData || null,
    errors: t.hydrationData && t.hydrationData.errors || N,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, q = "POP", D = null, F = !1, Z, J = !1, P = /* @__PURE__ */ new Map(), ie = null, A = !1, V = !1, $ = /* @__PURE__ */ new Set(), se = /* @__PURE__ */ new Map(), fe = 0, k = -1, ne = /* @__PURE__ */ new Map(), ae = /* @__PURE__ */ new Set(), K = /* @__PURE__ */ new Map(), U = /* @__PURE__ */ new Map(), W = /* @__PURE__ */ new Set(), ue = /* @__PURE__ */ new Map(), be, Ae = null;
  function lt() {
    if (S = t.history.listen(
      ({ action: z, location: H, delta: Q }) => {
        if (be) {
          be(), be = void 0;
          return;
        }
        Xt(
          ue.size === 0 || Q != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ge = he({
          currentLocation: M.location,
          nextLocation: H,
          historyAction: z
        });
        if (ge && Q != null) {
          let ye = new Promise((De) => {
            be = De;
          });
          t.history.go(Q * -1), It(ge, {
            state: "blocked",
            location: H,
            proceed() {
              It(ge, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: H
              }), ye.then(() => t.history.go(Q));
            },
            reset() {
              let De = new Map(M.blockers);
              De.set(ge, Ji), Be({ blockers: De });
            }
          }), D?.resolve(), D = null;
          return;
        }
        return At(z, H);
      }
    ), s) {
      dC(a, P);
      let z = () => fC(a, P);
      a.addEventListener("pagehide", z), ie = () => a.removeEventListener("pagehide", z);
    }
    return M.initialized || At("POP", M.location, {
      initialHydration: !0
    }), te;
  }
  function Ne() {
    S && S(), ie && ie(), w.clear(), Z && Z.abort(), M.fetchers.forEach((z, H) => pn(H)), M.blockers.forEach((z, H) => En(H));
  }
  function We(z) {
    return w.add(z), () => w.delete(z);
  }
  function Be(z, H = {}) {
    z.matches && (z.matches = z.matches.map((ye) => {
      let De = f[ye.route.id], Se = ye.route;
      return Se.element !== De.element || Se.errorElement !== De.errorElement || Se.hydrateFallbackElement !== De.hydrateFallbackElement ? {
        ...ye,
        route: De
      } : ye;
    })), M = {
      ...M,
      ...z
    };
    let Q = [], ge = [];
    M.fetchers.forEach((ye, De) => {
      ye.state === "idle" && (W.has(De) ? Q.push(De) : ge.push(De));
    }), W.forEach((ye) => {
      !M.fetchers.has(ye) && !se.has(ye) && Q.push(ye);
    }), [...w].forEach(
      (ye) => ye(M, {
        deletedFetchers: Q,
        newErrors: z.errors ?? null,
        viewTransitionOpts: H.viewTransitionOpts,
        flushSync: H.flushSync === !0
      })
    ), Q.forEach((ye) => pn(ye)), ge.forEach((ye) => M.fetchers.delete(ye));
  }
  function Fe(z, H, { flushSync: Q } = {}) {
    let ge = M.actionData != null && M.navigation.formMethod != null && bn(M.navigation.formMethod) && M.navigation.state === "loading" && z.state?._isRedirect !== !0, ye;
    H.actionData ? Object.keys(H.actionData).length > 0 ? ye = H.actionData : ye = null : ge ? ye = M.actionData : ye = null;
    let De = H.loaderData ? Uy(
      M.loaderData,
      H.loaderData,
      H.matches || [],
      H.errors
    ) : M.loaderData, Se = M.blockers;
    Se.size > 0 && (Se = new Map(Se), Se.forEach((Ve, Ue) => Se.set(Ue, Ji)));
    let Ee = A ? !1 : ce(z, H.matches || M.matches), Le = F === !0 || M.navigation.formMethod != null && bn(M.navigation.formMethod) && z.state?._isRedirect !== !0;
    y && (m = y, y = void 0), A || q === "POP" || (q === "PUSH" ? t.history.push(z, z.state) : q === "REPLACE" && t.history.replace(z, z.state));
    let Me;
    if (q === "POP") {
      let Ve = P.get(M.location.pathname);
      Ve && Ve.has(z.pathname) ? Me = {
        currentLocation: M.location,
        nextLocation: z
      } : P.has(z.pathname) && (Me = {
        currentLocation: z,
        nextLocation: M.location
      });
    } else if (J) {
      let Ve = P.get(M.location.pathname);
      Ve ? Ve.add(z.pathname) : (Ve = /* @__PURE__ */ new Set([z.pathname]), P.set(M.location.pathname, Ve)), Me = {
        currentLocation: M.location,
        nextLocation: z
      };
    }
    Be(
      {
        ...H,
        // matches, errors, fetchers go through as-is
        actionData: ye,
        loaderData: De,
        historyAction: q,
        location: z,
        initialized: !0,
        renderFallback: !1,
        navigation: vf,
        revalidation: "idle",
        restoreScrollPosition: Ee,
        preventScrollReset: Le,
        blockers: Se
      },
      {
        viewTransitionOpts: Me,
        flushSync: Q === !0
      }
    ), q = "POP", F = !1, J = !1, A = !1, V = !1, D?.resolve(), D = null, Ae?.resolve(), Ae = null;
  }
  async function rn(z, H) {
    if (D?.resolve(), D = null, typeof z == "number") {
      D || (D = qy());
      let Rt = D.promise;
      return t.history.go(z), Rt;
    }
    let Q = ah(
      M.location,
      M.matches,
      p,
      z,
      H?.fromRouteId,
      H?.relative
    ), { path: ge, submission: ye, error: De } = Ry(
      !1,
      Q,
      H
    ), Se;
    H?.unstable_mask && (Se = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof H.unstable_mask == "string" ? fa(H.unstable_mask) : {
        ...M.location.unstable_mask,
        ...H.unstable_mask
      }
    });
    let Ee = M.location, Le = nh(
      Ee,
      ge,
      H && H.state,
      void 0,
      Se
    );
    Le = {
      ...Le,
      ...t.history.encodeLocation(Le)
    };
    let Me = H && H.replace != null ? H.replace : void 0, Ve = "PUSH";
    Me === !0 ? Ve = "REPLACE" : Me === !1 || ye != null && bn(ye.formMethod) && ye.formAction === M.location.pathname + M.location.search && (Ve = "REPLACE");
    let Ue = H && "preventScrollReset" in H ? H.preventScrollReset === !0 : void 0, ht = (H && H.flushSync) === !0, et = he({
      currentLocation: Ee,
      nextLocation: Le,
      historyAction: Ve
    });
    if (et) {
      It(et, {
        state: "blocked",
        location: Le,
        proceed() {
          It(et, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: Le
          }), rn(z, H);
        },
        reset() {
          let Rt = new Map(M.blockers);
          Rt.set(et, Ji), Be({ blockers: Rt });
        }
      });
      return;
    }
    await At(Ve, Le, {
      submission: ye,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: De,
      preventScrollReset: Ue,
      replace: H && H.replace,
      enableViewTransition: H && H.viewTransition,
      flushSync: ht,
      callSiteDefaultShouldRevalidate: H && H.unstable_defaultShouldRevalidate
    });
  }
  function qt() {
    Ae || (Ae = qy()), Xe(), Be({ revalidation: "loading" });
    let z = Ae.promise;
    return M.navigation.state === "submitting" ? z : M.navigation.state === "idle" ? (At(M.historyAction, M.location, {
      startUninterruptedRevalidation: !0
    }), z) : (At(
      q || M.historyAction,
      M.navigation.location,
      {
        overrideNavigation: M.navigation,
        // Proxy through any rending view transition
        enableViewTransition: J === !0
      }
    ), z);
  }
  async function At(z, H, Q) {
    Z && Z.abort(), Z = null, q = z, A = (Q && Q.startUninterruptedRevalidation) === !0, Y(M.location, M.matches), F = (Q && Q.preventScrollReset) === !0, J = (Q && Q.enableViewTransition) === !0;
    let ge = y || m, ye = Q && Q.overrideNavigation, De = Q?.initialHydration && M.matches && M.matches.length > 0 && !R ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      M.matches
    ) : xr(ge, H, p), Se = (Q && Q.flushSync) === !0;
    if (De && M.initialized && !V && tC(M.location, H) && !(Q && Q.submission && bn(Q.submission.formMethod))) {
      Fe(H, { matches: De }, { flushSync: Se });
      return;
    }
    let Ee = Ce(De, ge, H.pathname);
    if (Ee.active && Ee.matches && (De = Ee.matches), !De) {
      let { error: jt, notFoundMatches: $t, route: rt } = Re(
        H.pathname
      );
      Fe(
        H,
        {
          matches: $t,
          loaderData: {},
          errors: {
            [rt.id]: jt
          }
        },
        { flushSync: Se }
      );
      return;
    }
    Z = new AbortController();
    let Le = Hs(
      t.history,
      H,
      Z.signal,
      Q && Q.submission
    ), Me = t.getContext ? await t.getContext() : new wy(), Ve;
    if (Q && Q.pendingError)
      Ve = [
        Sr(De).route.id,
        { type: "error", error: Q.pendingError }
      ];
    else if (Q && Q.submission && bn(Q.submission.formMethod)) {
      let jt = await Te(
        Le,
        H,
        Q.submission,
        De,
        Me,
        Ee.active,
        Q && Q.initialHydration === !0,
        { replace: Q.replace, flushSync: Se }
      );
      if (jt.shortCircuited)
        return;
      if (jt.pendingActionResult) {
        let [$t, rt] = jt.pendingActionResult;
        if (qn(rt) && vl(rt.error) && rt.error.status === 404) {
          Z = null, Fe(H, {
            matches: jt.matches,
            loaderData: {},
            errors: {
              [$t]: rt.error
            }
          });
          return;
        }
      }
      De = jt.matches || De, Ve = jt.pendingActionResult, ye = yf(H, Q.submission), Se = !1, Ee.active = !1, Le = Hs(
        t.history,
        Le.url,
        Le.signal
      );
    }
    let {
      shortCircuited: Ue,
      matches: ht,
      loaderData: et,
      errors: Rt
    } = await He(
      Le,
      H,
      De,
      Me,
      Ee.active,
      ye,
      Q && Q.submission,
      Q && Q.fetcherSubmission,
      Q && Q.replace,
      Q && Q.initialHydration === !0,
      Se,
      Ve,
      Q && Q.callSiteDefaultShouldRevalidate
    );
    Ue || (Z = null, Fe(H, {
      matches: ht || De,
      ...By(Ve),
      loaderData: et,
      errors: Rt
    }));
  }
  async function Te(z, H, Q, ge, ye, De, Se, Ee = {}) {
    Xe();
    let Le = cC(H, Q);
    if (Be({ navigation: Le }, { flushSync: Ee.flushSync === !0 }), De) {
      let Ue = await _e(
        ge,
        H.pathname,
        z.signal
      );
      if (Ue.type === "aborted")
        return { shortCircuited: !0 };
      if (Ue.type === "error") {
        if (Ue.partialMatches.length === 0) {
          let { matches: et, route: Rt } = Po(m);
          return {
            matches: et,
            pendingActionResult: [
              Rt.id,
              {
                type: "error",
                error: Ue.error
              }
            ]
          };
        }
        let ht = Sr(Ue.partialMatches).route.id;
        return {
          matches: Ue.partialMatches,
          pendingActionResult: [
            ht,
            {
              type: "error",
              error: Ue.error
            }
          ]
        };
      } else if (Ue.matches)
        ge = Ue.matches;
      else {
        let { notFoundMatches: ht, error: et, route: Rt } = Re(
          H.pathname
        );
        return {
          matches: ht,
          pendingActionResult: [
            Rt.id,
            {
              type: "error",
              error: et
            }
          ]
        };
      }
    }
    let Me, Ve = gc(ge, H);
    if (!Ve.route.action && !Ve.route.lazy)
      Me = {
        type: "error",
        error: Wn(405, {
          method: z.method,
          pathname: H.pathname,
          routeId: Ve.route.id
        })
      };
    else {
      let Ue = Xs(
        u,
        f,
        z,
        H,
        ge,
        Ve,
        Se ? [] : i,
        ye
      ), ht = await ke(
        z,
        H,
        Ue,
        ye,
        null
      );
      if (Me = ht[Ve.route.id], !Me) {
        for (let et of ge)
          if (ht[et.route.id]) {
            Me = ht[et.route.id];
            break;
          }
      }
      if (z.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Xr(Me)) {
      let Ue;
      return Ee && Ee.replace != null ? Ue = Ee.replace : Ue = Oy(
        Me.response.headers.get("Location"),
        new URL(z.url),
        p,
        t.history
      ) === M.location.pathname + M.location.search, await je(z, Me, !0, {
        submission: Q,
        replace: Ue
      }), { shortCircuited: !0 };
    }
    if (qn(Me)) {
      let Ue = Sr(ge, Ve.route.id);
      return (Ee && Ee.replace) !== !0 && (q = "PUSH"), {
        matches: ge,
        pendingActionResult: [
          Ue.route.id,
          Me,
          Ve.route.id
        ]
      };
    }
    return {
      matches: ge,
      pendingActionResult: [Ve.route.id, Me]
    };
  }
  async function He(z, H, Q, ge, ye, De, Se, Ee, Le, Me, Ve, Ue, ht) {
    let et = De || yf(H, Se), Rt = Se || Ee || Vy(et), jt = !A && !Me;
    if (ye) {
      if (jt) {
        let Gt = at(Ue);
        Be(
          {
            navigation: et,
            ...Gt !== void 0 ? { actionData: Gt } : {}
          },
          {
            flushSync: Ve
          }
        );
      }
      let tt = await _e(
        Q,
        H.pathname,
        z.signal
      );
      if (tt.type === "aborted")
        return { shortCircuited: !0 };
      if (tt.type === "error") {
        if (tt.partialMatches.length === 0) {
          let { matches: gn, route: Zt } = Po(m);
          return {
            matches: gn,
            loaderData: {},
            errors: {
              [Zt.id]: tt.error
            }
          };
        }
        let Gt = Sr(tt.partialMatches).route.id;
        return {
          matches: tt.partialMatches,
          loaderData: {},
          errors: {
            [Gt]: tt.error
          }
        };
      } else if (tt.matches)
        Q = tt.matches;
      else {
        let { error: Gt, notFoundMatches: gn, route: Zt } = Re(
          H.pathname
        );
        return {
          matches: gn,
          loaderData: {},
          errors: {
            [Zt.id]: Gt
          }
        };
      }
    }
    let $t = y || m, { dsMatches: rt, revalidatingFetchers: Qt } = _y(
      z,
      ge,
      u,
      f,
      t.history,
      M,
      Q,
      Rt,
      H,
      Me ? [] : i,
      Me === !0,
      V,
      $,
      W,
      K,
      ae,
      $t,
      p,
      t.patchRoutesOnNavigation != null,
      Ue,
      ht
    );
    if (k = ++fe, !t.dataStrategy && !rt.some((tt) => tt.shouldLoad) && !rt.some(
      (tt) => tt.route.middleware && tt.route.middleware.length > 0
    ) && Qt.length === 0) {
      let tt = sa();
      return Fe(
        H,
        {
          matches: Q,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Ue && qn(Ue[1]) ? { [Ue[0]]: Ue[1].error } : null,
          ...By(Ue),
          ...tt ? { fetchers: new Map(M.fetchers) } : {}
        },
        { flushSync: Ve }
      ), { shortCircuited: !0 };
    }
    if (jt) {
      let tt = {};
      if (!ye) {
        tt.navigation = et;
        let Gt = at(Ue);
        Gt !== void 0 && (tt.actionData = Gt);
      }
      Qt.length > 0 && (tt.fetchers = St(Qt)), Be(tt, { flushSync: Ve });
    }
    Qt.forEach((tt) => {
      Dt(tt.key), tt.controller && se.set(tt.key, tt.controller);
    });
    let kt = () => Qt.forEach((tt) => Dt(tt.key));
    Z && Z.signal.addEventListener(
      "abort",
      kt
    );
    let { loaderResults: Fa, fetcherResults: ia } = await Pe(
      rt,
      Qt,
      z,
      H,
      ge
    );
    if (z.signal.aborted)
      return { shortCircuited: !0 };
    Z && Z.signal.removeEventListener(
      "abort",
      kt
    ), Qt.forEach((tt) => se.delete(tt.key));
    let ln = Go(Fa);
    if (ln)
      return await je(z, ln.result, !0, {
        replace: Le
      }), { shortCircuited: !0 };
    if (ln = Go(ia), ln)
      return ae.add(ln.key), await je(z, ln.result, !0, {
        replace: Le
      }), { shortCircuited: !0 };
    let { loaderData: ma, errors: _r } = $y(
      M,
      Q,
      Fa,
      Ue,
      Qt,
      ia
    );
    Me && M.errors && (_r = { ...M.errors, ..._r });
    let pa = sa(), Mr = wn(k), as = pa || Mr || Qt.length > 0;
    return {
      matches: Q,
      loaderData: ma,
      errors: _r,
      ...as ? { fetchers: new Map(M.fetchers) } : {}
    };
  }
  function at(z) {
    if (z && !qn(z[1]))
      return {
        [z[0]]: z[1].data
      };
    if (M.actionData)
      return Object.keys(M.actionData).length === 0 ? null : M.actionData;
  }
  function St(z) {
    return z.forEach((H) => {
      let Q = M.fetchers.get(H.key), ge = Wi(
        void 0,
        Q ? Q.data : void 0
      );
      M.fetchers.set(H.key, ge);
    }), new Map(M.fetchers);
  }
  async function ot(z, H, Q, ge) {
    Dt(z);
    let ye = (ge && ge.flushSync) === !0, De = y || m, Se = ah(
      M.location,
      M.matches,
      p,
      Q,
      H,
      ge?.relative
    ), Ee = xr(De, Se, p), Le = Ce(Ee, De, Se);
    if (Le.active && Le.matches && (Ee = Le.matches), !Ee) {
      Tt(
        z,
        H,
        Wn(404, { pathname: Se }),
        { flushSync: ye }
      );
      return;
    }
    let { path: Me, submission: Ve, error: Ue } = Ry(
      !0,
      Se,
      ge
    );
    if (Ue) {
      Tt(z, H, Ue, { flushSync: ye });
      return;
    }
    let ht = t.getContext ? await t.getContext() : new wy(), et = (ge && ge.preventScrollReset) === !0;
    if (Ve && bn(Ve.formMethod)) {
      await Ke(
        z,
        H,
        Me,
        Ee,
        ht,
        Le.active,
        ye,
        et,
        Ve,
        ge && ge.unstable_defaultShouldRevalidate
      );
      return;
    }
    K.set(z, { routeId: H, path: Me }), await gt(
      z,
      H,
      Me,
      Ee,
      ht,
      Le.active,
      ye,
      et,
      Ve
    );
  }
  async function Ke(z, H, Q, ge, ye, De, Se, Ee, Le, Me) {
    Xe(), K.delete(z);
    let Ve = M.fetchers.get(z);
    yt(z, uC(Le, Ve), {
      flushSync: Se
    });
    let Ue = new AbortController(), ht = Hs(
      t.history,
      Q,
      Ue.signal,
      Le
    );
    if (De) {
      let zt = await _e(
        ge,
        new URL(ht.url).pathname,
        ht.signal,
        z
      );
      if (zt.type === "aborted")
        return;
      if (zt.type === "error") {
        Tt(z, H, zt.error, { flushSync: Se });
        return;
      } else if (zt.matches)
        ge = zt.matches;
      else {
        Tt(
          z,
          H,
          Wn(404, { pathname: Q }),
          { flushSync: Se }
        );
        return;
      }
    }
    let et = gc(ge, Q);
    if (!et.route.action && !et.route.lazy) {
      let zt = Wn(405, {
        method: Le.formMethod,
        pathname: Q,
        routeId: H
      });
      Tt(z, H, zt, { flushSync: Se });
      return;
    }
    se.set(z, Ue);
    let Rt = fe, jt = Xs(
      u,
      f,
      ht,
      Q,
      ge,
      et,
      i,
      ye
    ), $t = await ke(
      ht,
      Q,
      jt,
      ye,
      z
    ), rt = $t[et.route.id];
    if (!rt) {
      for (let zt of jt)
        if ($t[zt.route.id]) {
          rt = $t[zt.route.id];
          break;
        }
    }
    if (ht.signal.aborted) {
      se.get(z) === Ue && se.delete(z);
      return;
    }
    if (W.has(z)) {
      if (Xr(rt) || qn(rt)) {
        yt(z, Ba(void 0));
        return;
      }
    } else {
      if (Xr(rt))
        if (se.delete(z), k > Rt) {
          yt(z, Ba(void 0));
          return;
        } else
          return ae.add(z), yt(z, Wi(Le)), je(ht, rt, !1, {
            fetcherSubmission: Le,
            preventScrollReset: Ee
          });
      if (qn(rt)) {
        Tt(z, H, rt.error);
        return;
      }
    }
    let Qt = M.navigation.location || M.location, kt = Hs(
      t.history,
      Qt,
      Ue.signal
    ), Fa = y || m, ia = M.navigation.state !== "idle" ? xr(Fa, M.navigation.location, p) : M.matches;
    nt(ia, "Didn't find any matches after fetcher action");
    let ln = ++fe;
    ne.set(z, ln);
    let ma = Wi(Le, rt.data);
    M.fetchers.set(z, ma);
    let { dsMatches: _r, revalidatingFetchers: pa } = _y(
      kt,
      ye,
      u,
      f,
      t.history,
      M,
      ia,
      Le,
      Qt,
      i,
      !1,
      V,
      $,
      W,
      K,
      ae,
      Fa,
      p,
      t.patchRoutesOnNavigation != null,
      [et.route.id, rt],
      Me
    );
    pa.filter((zt) => zt.key !== z).forEach((zt) => {
      let rs = zt.key, ss = M.fetchers.get(rs), Dl = Wi(
        void 0,
        ss ? ss.data : void 0
      );
      M.fetchers.set(rs, Dl), Dt(rs), zt.controller && se.set(rs, zt.controller);
    }), Be({ fetchers: new Map(M.fetchers) });
    let Mr = () => pa.forEach((zt) => Dt(zt.key));
    Ue.signal.addEventListener(
      "abort",
      Mr
    );
    let { loaderResults: as, fetcherResults: tt } = await Pe(
      _r,
      pa,
      kt,
      Qt,
      ye
    );
    if (Ue.signal.aborted)
      return;
    if (Ue.signal.removeEventListener(
      "abort",
      Mr
    ), ne.delete(z), se.delete(z), pa.forEach((zt) => se.delete(zt.key)), M.fetchers.has(z)) {
      let zt = Ba(rt.data);
      M.fetchers.set(z, zt);
    }
    let Gt = Go(as);
    if (Gt)
      return je(
        kt,
        Gt.result,
        !1,
        { preventScrollReset: Ee }
      );
    if (Gt = Go(tt), Gt)
      return ae.add(Gt.key), je(
        kt,
        Gt.result,
        !1,
        { preventScrollReset: Ee }
      );
    let { loaderData: gn, errors: Zt } = $y(
      M,
      ia,
      as,
      void 0,
      pa,
      tt
    );
    wn(ln), M.navigation.state === "loading" && ln > k ? (nt(q, "Expected pending action"), Z && Z.abort(), Fe(M.navigation.location, {
      matches: ia,
      loaderData: gn,
      errors: Zt,
      fetchers: new Map(M.fetchers)
    })) : (Be({
      errors: Zt,
      loaderData: Uy(
        M.loaderData,
        gn,
        ia,
        Zt
      ),
      fetchers: new Map(M.fetchers)
    }), V = !1);
  }
  async function gt(z, H, Q, ge, ye, De, Se, Ee, Le) {
    let Me = M.fetchers.get(z);
    yt(
      z,
      Wi(
        Le,
        Me ? Me.data : void 0
      ),
      { flushSync: Se }
    );
    let Ve = new AbortController(), Ue = Hs(
      t.history,
      Q,
      Ve.signal
    );
    if (De) {
      let rt = await _e(
        ge,
        new URL(Ue.url).pathname,
        Ue.signal,
        z
      );
      if (rt.type === "aborted")
        return;
      if (rt.type === "error") {
        Tt(z, H, rt.error, { flushSync: Se });
        return;
      } else if (rt.matches)
        ge = rt.matches;
      else {
        Tt(
          z,
          H,
          Wn(404, { pathname: Q }),
          { flushSync: Se }
        );
        return;
      }
    }
    let ht = gc(ge, Q);
    se.set(z, Ve);
    let et = fe, Rt = Xs(
      u,
      f,
      Ue,
      Q,
      ge,
      ht,
      i,
      ye
    ), jt = await ke(
      Ue,
      Q,
      Rt,
      ye,
      z
    ), $t = jt[ht.route.id];
    if (!$t) {
      for (let rt of ge)
        if (jt[rt.route.id]) {
          $t = jt[rt.route.id];
          break;
        }
    }
    if (se.get(z) === Ve && se.delete(z), !Ue.signal.aborted) {
      if (W.has(z)) {
        yt(z, Ba(void 0));
        return;
      }
      if (Xr($t))
        if (k > et) {
          yt(z, Ba(void 0));
          return;
        } else {
          ae.add(z), await je(Ue, $t, !1, {
            preventScrollReset: Ee
          });
          return;
        }
      if (qn($t)) {
        Tt(z, H, $t.error);
        return;
      }
      yt(z, Ba($t.data));
    }
  }
  async function je(z, H, Q, {
    submission: ge,
    fetcherSubmission: ye,
    preventScrollReset: De,
    replace: Se
  } = {}) {
    Q || (D?.resolve(), D = null), H.response.headers.has("X-Remix-Revalidate") && (V = !0);
    let Ee = H.response.headers.get("Location");
    nt(Ee, "Expected a Location header on the redirect Response"), Ee = Oy(
      Ee,
      new URL(z.url),
      p,
      t.history
    );
    let Le = nh(M.location, Ee, {
      _isRedirect: !0
    });
    if (s) {
      let Rt = !1;
      if (H.response.headers.has("X-Remix-Reload-Document"))
        Rt = !0;
      else if ($h(Ee)) {
        const jt = sN(Ee, !0);
        Rt = // Hard reload if it's an absolute URL to a new origin
        jt.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        aa(jt.pathname, p) == null;
      }
      if (Rt) {
        Se ? a.location.replace(Ee) : a.location.assign(Ee);
        return;
      }
    }
    Z = null;
    let Me = Se === !0 || H.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Ve, formAction: Ue, formEncType: ht } = M.navigation;
    !ge && !ye && Ve && Ue && ht && (ge = Vy(M.navigation));
    let et = ge || ye;
    if (BN.has(H.response.status) && et && bn(et.formMethod))
      await At(Me, Le, {
        submission: {
          ...et,
          formAction: Ee
        },
        // Preserve these flags across redirects
        preventScrollReset: De || F,
        enableViewTransition: Q ? J : void 0
      });
    else {
      let Rt = yf(
        Le,
        ge
      );
      await At(Me, Le, {
        overrideNavigation: Rt,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: ye,
        // Preserve these flags across redirects
        preventScrollReset: De || F,
        enableViewTransition: Q ? J : void 0
      });
    }
  }
  async function ke(z, H, Q, ge, ye) {
    let De, Se = {};
    try {
      De = await XN(
        b,
        z,
        H,
        Q,
        ye,
        ge,
        !1
      );
    } catch (Ee) {
      return Q.filter((Le) => Le.shouldLoad).forEach((Le) => {
        Se[Le.route.id] = {
          type: "error",
          error: Ee
        };
      }), Se;
    }
    if (z.signal.aborted)
      return Se;
    if (!bn(z.method))
      for (let Ee of Q) {
        if (De[Ee.route.id]?.type === "error")
          break;
        !De.hasOwnProperty(Ee.route.id) && !M.loaderData.hasOwnProperty(Ee.route.id) && (!M.errors || !M.errors.hasOwnProperty(Ee.route.id)) && Ee.shouldCallHandler() && (De[Ee.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${Ee.route.id}`
          )
        });
      }
    for (let [Ee, Le] of Object.entries(De))
      if (sC(Le)) {
        let Me = Le.result;
        Se[Ee] = {
          type: "redirect",
          response: WN(
            Me,
            z,
            Ee,
            Q,
            p
          )
        };
      } else
        Se[Ee] = await JN(Le);
    return Se;
  }
  async function Pe(z, H, Q, ge, ye) {
    let De = ke(
      Q,
      ge,
      z,
      ye,
      null
    ), Se = Promise.all(
      H.map(async (Me) => {
        if (Me.matches && Me.match && Me.request && Me.controller) {
          let Ue = (await ke(
            Me.request,
            Me.path,
            Me.matches,
            ye,
            Me.key
          ))[Me.match.route.id];
          return { [Me.key]: Ue };
        } else
          return Promise.resolve({
            [Me.key]: {
              type: "error",
              error: Wn(404, {
                pathname: Me.path
              })
            }
          });
      })
    ), Ee = await De, Le = (await Se).reduce(
      (Me, Ve) => Object.assign(Me, Ve),
      {}
    );
    return {
      loaderResults: Ee,
      fetcherResults: Le
    };
  }
  function Xe() {
    V = !0, K.forEach((z, H) => {
      se.has(H) && $.add(H), Dt(H);
    });
  }
  function yt(z, H, Q = {}) {
    M.fetchers.set(z, H), Be(
      { fetchers: new Map(M.fetchers) },
      { flushSync: (Q && Q.flushSync) === !0 }
    );
  }
  function Tt(z, H, Q, ge = {}) {
    let ye = Sr(M.matches, H);
    pn(z), Be(
      {
        errors: {
          [ye.route.id]: Q
        },
        fetchers: new Map(M.fetchers)
      },
      { flushSync: (ge && ge.flushSync) === !0 }
    );
  }
  function zn(z) {
    return U.set(z, (U.get(z) || 0) + 1), W.has(z) && W.delete(z), M.fetchers.get(z) || IN;
  }
  function Sn(z, H) {
    Dt(z, H?.reason), yt(z, Ba(null));
  }
  function pn(z) {
    let H = M.fetchers.get(z);
    se.has(z) && !(H && H.state === "loading" && ne.has(z)) && Dt(z), K.delete(z), ne.delete(z), ae.delete(z), W.delete(z), $.delete(z), M.fetchers.delete(z);
  }
  function Pt(z) {
    let H = (U.get(z) || 0) - 1;
    H <= 0 ? (U.delete(z), W.add(z)) : U.set(z, H), Be({ fetchers: new Map(M.fetchers) });
  }
  function Dt(z, H) {
    let Q = se.get(z);
    Q && (Q.abort(H), se.delete(z));
  }
  function Bt(z) {
    for (let H of z) {
      let Q = zn(H), ge = Ba(Q.data);
      M.fetchers.set(H, ge);
    }
  }
  function sa() {
    let z = [], H = !1;
    for (let Q of ae) {
      let ge = M.fetchers.get(Q);
      nt(ge, `Expected fetcher: ${Q}`), ge.state === "loading" && (ae.delete(Q), z.push(Q), H = !0);
    }
    return Bt(z), H;
  }
  function wn(z) {
    let H = [];
    for (let [Q, ge] of ne)
      if (ge < z) {
        let ye = M.fetchers.get(Q);
        nt(ye, `Expected fetcher: ${Q}`), ye.state === "loading" && (Dt(Q), ne.delete(Q), H.push(Q));
      }
    return Bt(H), H.length > 0;
  }
  function cn(z, H) {
    let Q = M.blockers.get(z) || Ji;
    return ue.get(z) !== H && ue.set(z, H), Q;
  }
  function En(z) {
    M.blockers.delete(z), ue.delete(z);
  }
  function It(z, H) {
    let Q = M.blockers.get(z) || Ji;
    nt(
      Q.state === "unblocked" && H.state === "blocked" || Q.state === "blocked" && H.state === "blocked" || Q.state === "blocked" && H.state === "proceeding" || Q.state === "blocked" && H.state === "unblocked" || Q.state === "proceeding" && H.state === "unblocked",
      `Invalid blocker state transition: ${Q.state} -> ${H.state}`
    );
    let ge = new Map(M.blockers);
    ge.set(z, H), Be({ blockers: ge });
  }
  function he({
    currentLocation: z,
    nextLocation: H,
    historyAction: Q
  }) {
    if (ue.size === 0)
      return;
    ue.size > 1 && Xt(!1, "A router only supports one blocker at a time");
    let ge = Array.from(ue.entries()), [ye, De] = ge[ge.length - 1], Se = M.blockers.get(ye);
    if (!(Se && Se.state === "proceeding") && De({ currentLocation: z, nextLocation: H, historyAction: Q }))
      return ye;
  }
  function Re(z) {
    let H = Wn(404, { pathname: z }), Q = y || m, { matches: ge, route: ye } = Po(Q);
    return { notFoundMatches: ge, route: ye, error: H };
  }
  function ve(z, H, Q) {
    if (j = z, _ = H, C = Q || null, !T && M.navigation === vf) {
      T = !0;
      let ge = ce(M.location, M.matches);
      ge != null && Be({ restoreScrollPosition: ge });
    }
    return () => {
      j = null, _ = null, C = null;
    };
  }
  function xe(z, H) {
    return C && C(
      z,
      H.map((ge) => dN(ge, M.loaderData))
    ) || z.key;
  }
  function Y(z, H) {
    if (j && _) {
      let Q = xe(z, H);
      j[Q] = _();
    }
  }
  function ce(z, H) {
    if (j) {
      let Q = xe(z, H), ge = j[Q];
      if (typeof ge == "number")
        return ge;
    }
    return null;
  }
  function Ce(z, H, Q) {
    if (t.patchRoutesOnNavigation)
      if (z) {
        if (Object.keys(z[0].params).length > 0)
          return { active: !0, matches: ul(
            H,
            Q,
            p,
            !0
          ) };
      } else
        return { active: !0, matches: ul(
          H,
          Q,
          p,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function _e(z, H, Q, ge) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: z };
    let ye = z;
    for (; ; ) {
      let De = y == null, Se = y || m, Ee = f;
      try {
        await t.patchRoutesOnNavigation({
          signal: Q,
          path: H,
          matches: ye,
          fetcherKey: ge,
          patch: (Ve, Ue) => {
            Q.aborted || My(
              Ve,
              Ue,
              Se,
              Ee,
              u,
              !1
            );
          }
        });
      } catch (Ve) {
        return { type: "error", error: Ve, partialMatches: ye };
      } finally {
        De && !Q.aborted && (m = [...m]);
      }
      if (Q.aborted)
        return { type: "aborted" };
      let Le = xr(Se, H, p), Me = null;
      if (Le) {
        if (Object.keys(Le[0].params).length === 0)
          return { type: "success", matches: Le };
        if (Me = ul(
          Se,
          H,
          p,
          !0
        ), !(Me && ye.length < Me.length && Ge(
          ye,
          Me.slice(0, ye.length)
        )))
          return { type: "success", matches: Le };
      }
      if (Me || (Me = ul(
        Se,
        H,
        p,
        !0
      )), !Me || Ge(ye, Me))
        return { type: "success", matches: null };
      ye = Me;
    }
  }
  function Ge(z, H) {
    return z.length === H.length && z.every((Q, ge) => Q.route.id === H[ge].route.id);
  }
  function wt(z) {
    f = {}, y = gl(
      z,
      u,
      void 0,
      f
    );
  }
  function ft(z, H, Q = !1) {
    let ge = y == null;
    My(
      z,
      H,
      y || m,
      f,
      u,
      Q
    ), ge && (m = [...m], Be({}));
  }
  return te = {
    get basename() {
      return p;
    },
    get future() {
      return v;
    },
    get state() {
      return M;
    },
    get routes() {
      return m;
    },
    get window() {
      return a;
    },
    initialize: lt,
    subscribe: We,
    enableScrollRestoration: ve,
    navigate: rn,
    fetch: ot,
    revalidate: qt,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (z) => t.history.createHref(z),
    encodeLocation: (z) => t.history.encodeLocation(z),
    getFetcher: zn,
    resetFetcher: Sn,
    deleteFetcher: Pt,
    dispose: Ne,
    getBlocker: cn,
    deleteBlocker: En,
    patchRoutes: ft,
    _internalFetchControllers: se,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: wt,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(z) {
      Be(z);
    }
  }, t.unstable_instrumentations && (te = AN(
    te,
    t.unstable_instrumentations.map((z) => z.router).filter(Boolean)
  )), te;
}
function HN(t) {
  return t != null && ("formData" in t && t.formData != null || "body" in t && t.body !== void 0);
}
function ah(t, a, s, i, o, u) {
  let f, m;
  if (o) {
    f = [];
    for (let p of a)
      if (f.push(p), p.route.id === o) {
        m = p;
        break;
      }
  } else
    f = a, m = a[a.length - 1];
  let y = Vc(
    i || ".",
    Uh(f),
    aa(t.pathname, s) || t.pathname,
    u === "path"
  );
  if (i == null && (y.search = t.search, y.hash = t.hash), (i == null || i === "" || i === ".") && m) {
    let p = qh(y.search);
    if (m.route.index && !p)
      y.search = y.search ? y.search.replace(/^\?/, "?index&") : "?index";
    else if (!m.route.index && p) {
      let b = new URLSearchParams(y.search), v = b.getAll("index");
      b.delete("index"), v.filter((w) => w).forEach((w) => b.append("index", w));
      let S = b.toString();
      y.search = S ? `?${S}` : "";
    }
  }
  return s !== "/" && (y.pathname = EN({ basename: s, pathname: y.pathname })), Sa(y);
}
function Ry(t, a, s) {
  if (!s || !HN(s))
    return { path: a };
  if (s.formMethod && !oC(s.formMethod))
    return {
      path: a,
      error: Wn(405, { method: s.formMethod })
    };
  let i = () => ({
    path: a,
    error: Wn(400, { type: "invalid-body" })
  }), u = (s.formMethod || "get").toUpperCase(), f = m1(a);
  if (s.body !== void 0) {
    if (s.formEncType === "text/plain") {
      if (!bn(u))
        return i();
      let v = typeof s.body == "string" ? s.body : s.body instanceof FormData || s.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(s.body.entries()).reduce(
          (S, [w, j]) => `${S}${w}=${j}
`,
          ""
        )
      ) : String(s.body);
      return {
        path: a,
        submission: {
          formMethod: u,
          formAction: f,
          formEncType: s.formEncType,
          formData: void 0,
          json: void 0,
          text: v
        }
      };
    } else if (s.formEncType === "application/json") {
      if (!bn(u))
        return i();
      try {
        let v = typeof s.body == "string" ? JSON.parse(s.body) : s.body;
        return {
          path: a,
          submission: {
            formMethod: u,
            formAction: f,
            formEncType: s.formEncType,
            formData: void 0,
            json: v,
            text: void 0
          }
        };
      } catch {
        return i();
      }
    }
  }
  nt(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let m, y;
  if (s.formData)
    m = sh(s.formData), y = s.formData;
  else if (s.body instanceof FormData)
    m = sh(s.body), y = s.body;
  else if (s.body instanceof URLSearchParams)
    m = s.body, y = Ly(m);
  else if (s.body == null)
    m = new URLSearchParams(), y = new FormData();
  else
    try {
      m = new URLSearchParams(s.body), y = Ly(m);
    } catch {
      return i();
    }
  let p = {
    formMethod: u,
    formAction: f,
    formEncType: s && s.formEncType || "application/x-www-form-urlencoded",
    formData: y,
    json: void 0,
    text: void 0
  };
  if (bn(p.formMethod))
    return { path: a, submission: p };
  let b = fa(a);
  return t && b.search && qh(b.search) && m.append("index", ""), b.search = `?${m}`, { path: Sa(b), submission: p };
}
function _y(t, a, s, i, o, u, f, m, y, p, b, v, S, w, j, C, _, T, O, R, N) {
  let B = R ? qn(R[1]) ? R[1].error : R[1].data : void 0, G = o.createURL(u.location), te = o.createURL(y), M;
  if (b && u.errors) {
    let ie = Object.keys(u.errors)[0];
    M = f.findIndex((A) => A.route.id === ie);
  } else if (R && qn(R[1])) {
    let ie = R[0];
    M = f.findIndex((A) => A.route.id === ie) - 1;
  }
  let q = R ? R[1].statusCode : void 0, D = q && q >= 400, F = {
    currentUrl: G,
    currentParams: u.matches[0]?.params || {},
    nextUrl: te,
    nextParams: f[0].params,
    ...m,
    actionResult: B,
    actionStatus: q
  }, Z = El(f), J = f.map((ie, A) => {
    let { route: V } = ie, $ = null;
    if (M != null && A > M)
      $ = !1;
    else if (V.lazy)
      $ = !0;
    else if (!Ih(V))
      $ = !1;
    else if (b) {
      let { shouldLoad: ne } = l1(
        V,
        u.loaderData,
        u.errors
      );
      $ = ne;
    } else FN(u.loaderData, u.matches[A], ie) && ($ = !0);
    if ($ !== null)
      return rh(
        s,
        i,
        t,
        y,
        Z,
        ie,
        p,
        a,
        $
      );
    let se = !1;
    typeof N == "boolean" ? se = N : D ? se = !1 : (v || G.pathname + G.search === te.pathname + te.search || G.search !== te.search || PN(u.matches[A], ie)) && (se = !0);
    let fe = {
      ...F,
      defaultShouldRevalidate: se
    }, k = hl(ie, fe);
    return rh(
      s,
      i,
      t,
      y,
      Z,
      ie,
      p,
      a,
      k,
      fe,
      N
    );
  }), P = [];
  return j.forEach((ie, A) => {
    if (b || !f.some((K) => K.route.id === ie.routeId) || w.has(A))
      return;
    let V = u.fetchers.get(A), $ = V && V.state !== "idle" && V.data === void 0, se = xr(_, ie.path, T);
    if (!se) {
      if (O && $)
        return;
      P.push({
        key: A,
        routeId: ie.routeId,
        path: ie.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (C.has(A))
      return;
    let fe = gc(se, ie.path), k = new AbortController(), ne = Hs(
      o,
      ie.path,
      k.signal
    ), ae = null;
    if (S.has(A))
      S.delete(A), ae = Xs(
        s,
        i,
        ne,
        ie.path,
        se,
        fe,
        p,
        a
      );
    else if ($)
      v && (ae = Xs(
        s,
        i,
        ne,
        ie.path,
        se,
        fe,
        p,
        a
      ));
    else {
      let K;
      typeof N == "boolean" ? K = N : D ? K = !1 : K = v;
      let U = {
        ...F,
        defaultShouldRevalidate: K
      };
      hl(fe, U) && (ae = Xs(
        s,
        i,
        ne,
        ie.path,
        se,
        fe,
        p,
        a,
        U
      ));
    }
    ae && P.push({
      key: A,
      routeId: ie.routeId,
      path: ie.path,
      matches: ae,
      match: fe,
      request: ne,
      controller: k
    });
  }), { dsMatches: J, revalidatingFetchers: P };
}
function Ih(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function l1(t, a, s) {
  if (t.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!Ih(t))
    return { shouldLoad: !1, renderFallback: !1 };
  let i = a != null && t.id in a, o = s != null && s[t.id] !== void 0;
  if (!i && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof t.loader == "function" && t.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !i };
  let u = !i && !o;
  return { shouldLoad: u, renderFallback: u };
}
function FN(t, a, s) {
  let i = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    s.route.id !== a.route.id
  ), o = !t.hasOwnProperty(s.route.id);
  return i || o;
}
function PN(t, a) {
  let s = t.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    t.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    s != null && s.endsWith("*") && t.params["*"] !== a.params["*"]
  );
}
function hl(t, a) {
  if (t.route.shouldRevalidate) {
    let s = t.route.shouldRevalidate(a);
    if (typeof s == "boolean")
      return s;
  }
  return a.defaultShouldRevalidate;
}
function My(t, a, s, i, o, u) {
  let f;
  if (t) {
    let p = i[t];
    nt(
      p,
      `No route found to patch children into: routeId = ${t}`
    ), p.children || (p.children = []), f = p.children;
  } else
    f = s;
  let m = [], y = [];
  if (a.forEach((p) => {
    let b = f.find(
      (v) => o1(p, v)
    );
    b ? y.push({ existingRoute: b, newRoute: p }) : m.push(p);
  }), m.length > 0) {
    let p = gl(
      m,
      o,
      [t || "_", "patch", String(f?.length || "0")],
      i
    );
    f.push(...p);
  }
  if (u && y.length > 0)
    for (let p = 0; p < y.length; p++) {
      let { existingRoute: b, newRoute: v } = y[p], S = b, [w] = gl(
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
function o1(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (s, i) => a.children?.some((o) => o1(s, o))
  ) ?? !1 : !1;
}
var Ay = /* @__PURE__ */ new WeakMap(), c1 = ({
  key: t,
  route: a,
  manifest: s,
  mapRouteProperties: i
}) => {
  let o = s[a.id];
  if (nt(o, "No route found in manifest"), !o.lazy || typeof o.lazy != "object")
    return;
  let u = o.lazy[t];
  if (!u)
    return;
  let f = Ay.get(o);
  f || (f = {}, Ay.set(o, f));
  let m = f[t];
  if (m)
    return m;
  let y = (async () => {
    let p = lN(t), v = o[t] !== void 0 && t !== "hasErrorBoundary";
    if (p)
      Xt(
        !p,
        "Route property " + t + " is not a supported lazy route property. This property will be ignored."
      ), f[t] = Promise.resolve();
    else if (v)
      Xt(
        !1,
        `Route "${o.id}" has a static property "${t}" defined. The lazy property will be ignored.`
      );
    else {
      let S = await u();
      S != null && (Object.assign(o, { [t]: S }), Object.assign(o, i(o)));
    }
    typeof o.lazy == "object" && (o.lazy[t] = void 0, Object.values(o.lazy).every((S) => S === void 0) && (o.lazy = void 0));
  })();
  return f[t] = y, y;
}, ky = /* @__PURE__ */ new WeakMap();
function GN(t, a, s, i, o) {
  let u = s[t.id];
  if (nt(u, "No route found in manifest"), !t.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof t.lazy == "function") {
    let b = ky.get(u);
    if (b)
      return {
        lazyRoutePromise: b,
        lazyHandlerPromise: b
      };
    let v = (async () => {
      nt(
        typeof t.lazy == "function",
        "No lazy route function found"
      );
      let S = await t.lazy(), w = {};
      for (let j in S) {
        let C = S[j];
        if (C === void 0)
          continue;
        let _ = cN(j), O = u[j] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        j !== "hasErrorBoundary";
        _ ? Xt(
          !_,
          "Route property " + j + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : O ? Xt(
          !O,
          `Route "${u.id}" has a static property "${j}" defined but its lazy function is also returning a value for this property. The lazy route property "${j}" will be ignored.`
        ) : w[j] = C;
      }
      Object.assign(u, w), Object.assign(u, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...i(u),
        lazy: void 0
      });
    })();
    return ky.set(u, v), v.catch(() => {
    }), {
      lazyRoutePromise: v,
      lazyHandlerPromise: v
    };
  }
  let f = Object.keys(t.lazy), m = [], y;
  for (let b of f) {
    if (o && o.includes(b))
      continue;
    let v = c1({
      key: b,
      route: t,
      manifest: s,
      mapRouteProperties: i
    });
    v && (m.push(v), b === a && (y = v));
  }
  let p = m.length > 0 ? Promise.all(m).then(() => {
  }) : void 0;
  return p?.catch(() => {
  }), y?.catch(() => {
  }), {
    lazyRoutePromise: p,
    lazyHandlerPromise: y
  };
}
async function Dy(t) {
  let a = t.matches.filter((o) => o.shouldLoad), s = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, u) => {
    s[a[u].route.id] = o;
  }), s;
}
async function YN(t) {
  return t.matches.some((a) => a.route.middleware) ? u1(t, () => Dy(t)) : Dy(t);
}
function u1(t, a) {
  return KN(
    t,
    a,
    (i) => {
      if (lC(i))
        throw i;
      return i;
    },
    aC,
    s
  );
  function s(i, o, u) {
    if (u)
      return Promise.resolve(
        Object.assign(u.value, {
          [o]: { type: "error", result: i }
        })
      );
    {
      let { matches: f } = t, m = Math.min(
        // Throwing route
        Math.max(
          f.findIndex((p) => p.route.id === o),
          0
        ),
        // or the shallowest route that needs to load data
        Math.max(
          f.findIndex((p) => p.shouldCallHandler()),
          0
        )
      ), y = Sr(
        f,
        f[m].route.id
      ).route.id;
      return Promise.resolve({
        [y]: { type: "error", result: i }
      });
    }
  }
}
async function KN(t, a, s, i, o) {
  let { matches: u, ...f } = t, m = u.flatMap(
    (p) => p.route.middleware ? p.route.middleware.map((b) => [p.route.id, b]) : []
  );
  return await d1(
    f,
    m,
    a,
    s,
    i,
    o
  );
}
async function d1(t, a, s, i, o, u, f = 0) {
  let { request: m } = t;
  if (m.signal.aborted)
    throw m.signal.reason ?? new Error(`Request aborted: ${m.method} ${m.url}`);
  let y = a[f];
  if (!y)
    return await s();
  let [p, b] = y, v, S = async () => {
    if (v)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return v = { value: await d1(
        t,
        a,
        s,
        i,
        o,
        u,
        f + 1
      ) }, v.value;
    } catch (w) {
      return v = { value: await u(w, p, v) }, v.value;
    }
  };
  try {
    let w = await b(t, S), j = w != null ? i(w) : void 0;
    return o(j) ? j : v ? j ?? v.value : (v = { value: await S() }, v.value);
  } catch (w) {
    return await u(w, p, v);
  }
}
function f1(t, a, s, i, o) {
  let u = c1({
    key: "middleware",
    route: i.route,
    manifest: a,
    mapRouteProperties: t
  }), f = GN(
    i.route,
    bn(s.method) ? "action" : "loader",
    a,
    t,
    o
  );
  return {
    middleware: u,
    route: f.lazyRoutePromise,
    handler: f.lazyHandlerPromise
  };
}
function rh(t, a, s, i, o, u, f, m, y, p = null, b) {
  let v = !1, S = f1(
    t,
    a,
    s,
    u,
    f
  );
  return {
    ...u,
    _lazyPromises: S,
    shouldLoad: y,
    shouldRevalidateArgs: p,
    shouldCallHandler(w) {
      return v = !0, p ? typeof b == "boolean" ? hl(u, {
        ...p,
        defaultShouldRevalidate: b
      }) : typeof w == "boolean" ? hl(u, {
        ...p,
        defaultShouldRevalidate: w
      }) : hl(u, p) : y;
    },
    resolve(w) {
      let { lazy: j, loader: C, middleware: _ } = u.route, T = v || y || w && !bn(s.method) && (j || C), O = _ && _.length > 0 && !C && !j;
      return T && (bn(s.method) || !O) ? QN({
        request: s,
        path: i,
        unstable_pattern: o,
        match: u,
        lazyHandlerPromise: S?.handler,
        lazyRoutePromise: S?.route,
        handlerOverride: w,
        scopedContext: m
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function Xs(t, a, s, i, o, u, f, m, y = null) {
  return o.map((p) => p.route.id !== u.route.id ? {
    ...p,
    shouldLoad: !1,
    shouldRevalidateArgs: y,
    shouldCallHandler: () => !1,
    _lazyPromises: f1(
      t,
      a,
      s,
      p,
      f
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : rh(
    t,
    a,
    s,
    i,
    El(o),
    p,
    f,
    m,
    !0,
    y
  ));
}
async function XN(t, a, s, i, o, u, f) {
  i.some((b) => b._lazyPromises?.middleware) && await Promise.all(i.map((b) => b._lazyPromises?.middleware));
  let m = {
    request: a,
    unstable_url: h1(a, s),
    unstable_pattern: El(i),
    params: i[0].params,
    context: u,
    matches: i
  }, p = await t({
    ...m,
    fetcherKey: o,
    runClientMiddleware: (b) => {
      let v = m;
      return u1(v, () => b({
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
      i.flatMap((b) => [
        b._lazyPromises?.handler,
        b._lazyPromises?.route
      ])
    );
  } catch {
  }
  return p;
}
async function QN({
  request: t,
  path: a,
  unstable_pattern: s,
  match: i,
  lazyHandlerPromise: o,
  lazyRoutePromise: u,
  handlerOverride: f,
  scopedContext: m
}) {
  let y, p, b = bn(t.method), v = b ? "action" : "loader", S = (w) => {
    let j, C = new Promise((O, R) => j = R);
    p = () => j(), t.signal.addEventListener("abort", p);
    let _ = (O) => typeof w != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${v}" [routeId: ${i.route.id}]`
      )
    ) : w(
      {
        request: t,
        unstable_url: h1(t, a),
        unstable_pattern: s,
        params: i.params,
        context: m
      },
      ...O !== void 0 ? [O] : []
    ), T = (async () => {
      try {
        return { type: "data", result: await (f ? f((R) => _(R)) : _()) };
      } catch (O) {
        return { type: "error", result: O };
      }
    })();
    return Promise.race([T, C]);
  };
  try {
    let w = b ? i.route.action : i.route.loader;
    if (o || u)
      if (w) {
        let j, [C] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          S(w).catch((_) => {
            j = _;
          }),
          // Ensure all lazy route promises are resolved before continuing
          o,
          u
        ]);
        if (j !== void 0)
          throw j;
        y = C;
      } else {
        await o;
        let j = b ? i.route.action : i.route.loader;
        if (j)
          [y] = await Promise.all([S(j), u]);
        else if (v === "action") {
          let C = new URL(t.url), _ = C.pathname + C.search;
          throw Wn(405, {
            method: t.method,
            pathname: _,
            routeId: i.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (w)
      y = await S(w);
    else {
      let j = new URL(t.url), C = j.pathname + j.search;
      throw Wn(404, {
        pathname: C
      });
    }
  } catch (w) {
    return { type: "error", result: w };
  } finally {
    p && t.signal.removeEventListener("abort", p);
  }
  return y;
}
async function ZN(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function JN(t) {
  let { result: a, type: s } = t;
  if (Vh(a)) {
    let i;
    try {
      i = await ZN(a);
    } catch (o) {
      return { type: "error", error: o };
    }
    return s === "error" ? {
      type: "error",
      error: new qc(a.status, a.statusText, i),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: i,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return s === "error" ? Iy(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: nC(a),
    statusCode: vl(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: vl(a) ? a.status : void 0
  } : Iy(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function WN(t, a, s, i, o) {
  let u = t.headers.get("Location");
  if (nt(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !$h(u)) {
    let f = i.slice(
      0,
      i.findIndex((m) => m.route.id === s) + 1
    );
    u = ah(
      new URL(a.url),
      f,
      o,
      u
    ), t.headers.set("Location", u);
  }
  return t;
}
var zy = [
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
function Oy(t, a, s, i) {
  if ($h(t)) {
    let o = t, u = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (zy.includes(u.protocol))
      throw new Error("Invalid redirect location");
    let f = aa(u.pathname, s) != null;
    if (u.origin === a.origin && f)
      return Bh(u.pathname) + u.search + u.hash;
  }
  try {
    let o = i.createURL(t);
    if (zy.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return t;
}
function Hs(t, a, s, i) {
  let o = t.createURL(m1(a)).toString(), u = { signal: s };
  if (i && bn(i.formMethod)) {
    let { formMethod: f, formEncType: m } = i;
    u.method = f.toUpperCase(), m === "application/json" ? (u.headers = new Headers({ "Content-Type": m }), u.body = JSON.stringify(i.json)) : m === "text/plain" ? u.body = i.text : m === "application/x-www-form-urlencoded" && i.formData ? u.body = sh(i.formData) : u.body = i.formData;
  }
  return new Request(o, u);
}
function h1(t, a) {
  let s = new URL(t.url), i = typeof a == "string" ? fa(a) : a;
  if (s.pathname = i.pathname || "/", i.search) {
    let o = new URLSearchParams(i.search), u = o.getAll("index");
    o.delete("index");
    for (let f of u.filter(Boolean))
      o.append("index", f);
    s.search = o.size ? `?${o.toString()}` : "";
  } else
    s.search = "";
  return s.hash = i.hash || "", s;
}
function sh(t) {
  let a = new URLSearchParams();
  for (let [s, i] of t.entries())
    a.append(s, typeof i == "string" ? i : i.name);
  return a;
}
function Ly(t) {
  let a = new FormData();
  for (let [s, i] of t.entries())
    a.append(s, i);
  return a;
}
function eC(t, a, s, i = !1, o = !1) {
  let u = {}, f = null, m, y = !1, p = {}, b = s && qn(s[1]) ? s[1].error : void 0;
  return t.forEach((v) => {
    if (!(v.route.id in a))
      return;
    let S = v.route.id, w = a[S];
    if (nt(
      !Xr(w),
      "Cannot handle redirect results in processLoaderData"
    ), qn(w)) {
      let j = w.error;
      if (b !== void 0 && (j = b, b = void 0), f = f || {}, o)
        f[S] = j;
      else {
        let C = Sr(t, S);
        f[C.route.id] == null && (f[C.route.id] = j);
      }
      i || (u[S] = i1), y || (y = !0, m = vl(w.error) ? w.error.status : 500), w.headers && (p[S] = w.headers);
    } else
      u[S] = w.data, w.statusCode && w.statusCode !== 200 && !y && (m = w.statusCode), w.headers && (p[S] = w.headers);
  }), b !== void 0 && s && (f = { [s[0]]: b }, s[2] && (u[s[2]] = void 0)), {
    loaderData: u,
    errors: f,
    statusCode: m || 200,
    loaderHeaders: p
  };
}
function $y(t, a, s, i, o, u) {
  let { loaderData: f, errors: m } = eC(
    a,
    s,
    i
  );
  return o.filter((y) => !y.matches || y.matches.some((p) => p.shouldLoad)).forEach((y) => {
    let { key: p, match: b, controller: v } = y;
    if (v && v.signal.aborted)
      return;
    let S = u[p];
    if (nt(S, "Did not find corresponding fetcher result"), qn(S)) {
      let w = Sr(t.matches, b?.route.id);
      m && m[w.route.id] || (m = {
        ...m,
        [w.route.id]: S.error
      }), t.fetchers.delete(p);
    } else if (Xr(S))
      nt(!1, "Unhandled fetcher revalidation redirect");
    else {
      let w = Ba(S.data);
      t.fetchers.set(p, w);
    }
  }), { loaderData: f, errors: m };
}
function Uy(t, a, s, i) {
  let o = Object.entries(a).filter(([, u]) => u !== i1).reduce((u, [f, m]) => (u[f] = m, u), {});
  for (let u of s) {
    let f = u.route.id;
    if (!a.hasOwnProperty(f) && t.hasOwnProperty(f) && u.route.loader && (o[f] = t[f]), i && i.hasOwnProperty(f))
      break;
  }
  return o;
}
function By(t) {
  return t ? qn(t[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [t[0]]: t[1].data
    }
  } : {};
}
function Sr(t, a) {
  return (a ? t.slice(0, t.findIndex((i) => i.route.id === a) + 1) : [...t]).reverse().find((i) => i.route.hasErrorBoundary === !0) || t[0];
}
function Po(t) {
  let a = t.length === 1 ? t[0] : t.find((s) => s.index || !s.path || s.path === "/") || {
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
function Wn(t, {
  pathname: a,
  routeId: s,
  method: i,
  type: o,
  message: u
} = {}) {
  let f = "Unknown Server Error", m = "Unknown @remix-run/router error";
  return t === 400 ? (f = "Bad Request", i && a && s ? m = `You made a ${i} request to "${a}" but did not provide a \`loader\` for route "${s}", so there is no way to handle the request.` : o === "invalid-body" && (m = "Unable to encode submission body")) : t === 403 ? (f = "Forbidden", m = `Route "${s}" does not match URL "${a}"`) : t === 404 ? (f = "Not Found", m = `No route matches URL "${a}"`) : t === 405 && (f = "Method Not Allowed", i && a && s ? m = `You made a ${i.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${s}", so there is no way to handle the request.` : i && (m = `Invalid request method "${i.toUpperCase()}"`)), new qc(
    t || 500,
    f,
    new Error(m),
    !0
  );
}
function Go(t) {
  let a = Object.entries(t);
  for (let s = a.length - 1; s >= 0; s--) {
    let [i, o] = a[s];
    if (Xr(o))
      return { key: i, result: o };
  }
}
function m1(t) {
  let a = typeof t == "string" ? fa(t) : t;
  return Sa({ ...a, hash: "" });
}
function tC(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function nC(t) {
  return new qc(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function aC(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, s]) => typeof a == "string" && rC(s)
  );
}
function rC(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function sC(t) {
  return Vh(t.result) && r1.has(t.result.status);
}
function qn(t) {
  return t.type === "error";
}
function Xr(t) {
  return (t && t.type) === "redirect";
}
function Iy(t) {
  return typeof t == "object" && t != null && "type" in t && "data" in t && "init" in t && t.type === "DataWithResponseInit";
}
function Vh(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.headers == "object" && typeof t.body < "u";
}
function iC(t) {
  return r1.has(t);
}
function lC(t) {
  return Vh(t) && iC(t.status) && t.headers.has("Location");
}
function oC(t) {
  return UN.has(t.toUpperCase());
}
function bn(t) {
  return LN.has(t.toUpperCase());
}
function qh(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function gc(t, a) {
  let s = typeof a == "string" ? fa(a).search : a.search;
  if (t[t.length - 1].route.index && qh(s || ""))
    return t[t.length - 1];
  let i = Wx(t);
  return i[i.length - 1];
}
function Vy(t) {
  let { formMethod: a, formAction: s, formEncType: i, text: o, formData: u, json: f } = t;
  if (!(!a || !s || !i)) {
    if (o != null)
      return {
        formMethod: a,
        formAction: s,
        formEncType: i,
        formData: void 0,
        json: void 0,
        text: o
      };
    if (u != null)
      return {
        formMethod: a,
        formAction: s,
        formEncType: i,
        formData: u,
        json: void 0,
        text: void 0
      };
    if (f !== void 0)
      return {
        formMethod: a,
        formAction: s,
        formEncType: i,
        formData: void 0,
        json: f,
        text: void 0
      };
  }
}
function yf(t, a) {
  return a ? {
    state: "loading",
    location: t,
    formMethod: a.formMethod,
    formAction: a.formAction,
    formEncType: a.formEncType,
    formData: a.formData,
    json: a.json,
    text: a.text
  } : {
    state: "loading",
    location: t,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  };
}
function cC(t, a) {
  return {
    state: "submitting",
    location: t,
    formMethod: a.formMethod,
    formAction: a.formAction,
    formEncType: a.formEncType,
    formData: a.formData,
    json: a.json,
    text: a.text
  };
}
function Wi(t, a) {
  return t ? {
    state: "loading",
    formMethod: t.formMethod,
    formAction: t.formAction,
    formEncType: t.formEncType,
    formData: t.formData,
    json: t.json,
    text: t.text,
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
function uC(t, a) {
  return {
    state: "submitting",
    formMethod: t.formMethod,
    formAction: t.formAction,
    formEncType: t.formEncType,
    formData: t.formData,
    json: t.json,
    text: t.text,
    data: a ? a.data : void 0
  };
}
function Ba(t) {
  return {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: t
  };
}
function dC(t, a) {
  try {
    let s = t.sessionStorage.getItem(
      s1
    );
    if (s) {
      let i = JSON.parse(s);
      for (let [o, u] of Object.entries(i || {}))
        u && Array.isArray(u) && a.set(o, new Set(u || []));
    }
  } catch {
  }
}
function fC(t, a) {
  if (a.size > 0) {
    let s = {};
    for (let [i, o] of a)
      s[i] = [...o];
    try {
      t.sessionStorage.setItem(
        s1,
        JSON.stringify(s)
      );
    } catch (i) {
      Xt(
        !1,
        `Failed to save applied view transitions in sessionStorage (${i}).`
      );
    }
  }
}
function qy() {
  let t, a, s = new Promise((i, o) => {
    t = async (u) => {
      i(u);
      try {
        await s;
      } catch {
      }
    }, a = async (u) => {
      o(u);
      try {
        await s;
      } catch {
      }
    };
  });
  return {
    promise: s,
    //@ts-ignore
    resolve: t,
    //@ts-ignore
    reject: a
  };
}
var ns = g.createContext(null);
ns.displayName = "DataRouter";
var Nl = g.createContext(null);
Nl.displayName = "DataRouterState";
var p1 = g.createContext(!1);
function g1() {
  return g.useContext(p1);
}
var Hh = g.createContext({
  isTransitioning: !1
});
Hh.displayName = "ViewTransition";
var v1 = g.createContext(
  /* @__PURE__ */ new Map()
);
v1.displayName = "Fetchers";
var hC = g.createContext(null);
hC.displayName = "Await";
var ra = g.createContext(
  null
);
ra.displayName = "Navigation";
var Hc = g.createContext(
  null
);
Hc.displayName = "Location";
var qa = g.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
qa.displayName = "Route";
var Fh = g.createContext(null);
Fh.displayName = "RouteError";
var y1 = "REACT_ROUTER_ERROR", mC = "REDIRECT", pC = "ROUTE_ERROR_RESPONSE";
function gC(t) {
  if (t.startsWith(`${y1}:${mC}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function vC(t) {
  if (t.startsWith(
    `${y1}:${pC}:{`
  ))
    try {
      let a = JSON.parse(t.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new qc(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function yC(t, { relative: a } = {}) {
  nt(
    Cl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: s, navigator: i } = g.useContext(ra), { hash: o, pathname: u, search: f } = Tl(t, { relative: a }), m = u;
  return s !== "/" && (m = u === "/" ? s : ea([s, u])), i.createHref({ pathname: m, search: f, hash: o });
}
function Cl() {
  return g.useContext(Hc) != null;
}
function Ha() {
  return nt(
    Cl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), g.useContext(Hc).location;
}
var b1 = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function x1(t) {
  g.useContext(ra).static || g.useLayoutEffect(t);
}
function ni() {
  let { isDataRoute: t } = g.useContext(qa);
  return t ? MC() : bC();
}
function bC() {
  nt(
    Cl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = g.useContext(ns), { basename: a, navigator: s } = g.useContext(ra), { matches: i } = g.useContext(qa), { pathname: o } = Ha(), u = JSON.stringify(Uh(i)), f = g.useRef(!1);
  return x1(() => {
    f.current = !0;
  }), g.useCallback(
    (y, p = {}) => {
      if (Xt(f.current, b1), !f.current) return;
      if (typeof y == "number") {
        s.go(y);
        return;
      }
      let b = Vc(
        y,
        JSON.parse(u),
        o,
        p.relative === "path"
      );
      t == null && a !== "/" && (b.pathname = b.pathname === "/" ? a : ea([a, b.pathname])), (p.replace ? s.replace : s.push)(
        b,
        p.state,
        p
      );
    },
    [
      a,
      s,
      u,
      o,
      t
    ]
  );
}
g.createContext(null);
function Tl(t, { relative: a } = {}) {
  let { matches: s } = g.useContext(qa), { pathname: i } = Ha(), o = JSON.stringify(Uh(s));
  return g.useMemo(
    () => Vc(
      t,
      JSON.parse(o),
      i,
      a === "path"
    ),
    [t, o, i, a]
  );
}
function xC(t, a, s) {
  nt(
    Cl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: i } = g.useContext(ra), { matches: o } = g.useContext(qa), u = o[o.length - 1], f = u ? u.params : {}, m = u ? u.pathname : "/", y = u ? u.pathnameBase : "/", p = u && u.route;
  {
    let _ = p && p.path || "";
    j1(
      m,
      !p || _.endsWith("*") || _.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${_}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${_}"> to <Route path="${_ === "/" ? "*" : `${_}/*`}">.`
    );
  }
  let b = Ha(), v;
  v = b;
  let S = v.pathname || "/", w = S;
  if (y !== "/") {
    let _ = y.replace(/^\//, "").split("/");
    w = "/" + S.replace(/^\//, "").split("/").slice(_.length).join("/");
  }
  let j = xr(t, { pathname: w });
  return Xt(
    p || j != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `
  ), Xt(
    j == null || j[j.length - 1].route.element !== void 0 || j[j.length - 1].route.Component !== void 0 || j[j.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), NC(
    j && j.map(
      (_) => Object.assign({}, _, {
        params: Object.assign({}, f, _.params),
        pathname: ea([
          y,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          i.encodeLocation ? i.encodeLocation(
            _.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : _.pathname
        ]),
        pathnameBase: _.pathnameBase === "/" ? y : ea([
          y,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          i.encodeLocation ? i.encodeLocation(
            _.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : _.pathnameBase
        ])
      })
    ),
    o,
    s
  );
}
function SC() {
  let t = _C(), a = vl(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), s = t instanceof Error ? t.stack : null, i = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: i }, u = { padding: "2px 4px", backgroundColor: i }, f = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), f = /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ g.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ g.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ g.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ g.createElement("h3", { style: { fontStyle: "italic" } }, a), s ? /* @__PURE__ */ g.createElement("pre", { style: o }, s) : null, f);
}
var wC = /* @__PURE__ */ g.createElement(SC, null), S1 = class extends g.Component {
  constructor(t) {
    super(t), this.state = {
      location: t.location,
      revalidation: t.revalidation,
      error: t.error
    };
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, a) {
    return a.location !== t.location || a.revalidation !== "idle" && t.revalidation === "idle" ? {
      error: t.error,
      location: t.location,
      revalidation: t.revalidation
    } : {
      error: t.error !== void 0 ? t.error : a.error,
      location: a.location,
      revalidation: t.revalidation || a.revalidation
    };
  }
  componentDidCatch(t, a) {
    this.props.onError ? this.props.onError(t, a) : console.error(
      "React Router caught the following error during render",
      t
    );
  }
  render() {
    let t = this.state.error;
    if (this.context && typeof t == "object" && t && "digest" in t && typeof t.digest == "string") {
      const s = vC(t.digest);
      s && (t = s);
    }
    let a = t !== void 0 ? /* @__PURE__ */ g.createElement(qa.Provider, { value: this.props.routeContext }, /* @__PURE__ */ g.createElement(
      Fh.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ g.createElement(jC, { error: t }, a) : a;
  }
};
S1.contextType = p1;
var bf = /* @__PURE__ */ new WeakMap();
function jC({
  children: t,
  error: a
}) {
  let { basename: s } = g.useContext(ra);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let i = gC(a.digest);
    if (i) {
      let o = bf.get(a);
      if (o) throw o;
      let u = t1(i.location, s);
      if (e1 && !bf.get(a))
        if (u.isExternal || i.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const f = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(u.to, {
              replace: i.replace
            })
          );
          throw bf.set(a, f), f;
        }
      return /* @__PURE__ */ g.createElement(
        "meta",
        {
          httpEquiv: "refresh",
          content: `0;url=${u.absoluteURL || u.to}`
        }
      );
    }
  }
  return t;
}
function EC({ routeContext: t, match: a, children: s }) {
  let i = g.useContext(ns);
  return i && i.static && i.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (i.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ g.createElement(qa.Provider, { value: t }, s);
}
function NC(t, a = [], s) {
  let i = s?.state;
  if (t == null) {
    if (!i)
      return null;
    if (i.errors)
      t = i.matches;
    else if (a.length === 0 && !i.initialized && i.matches.length > 0)
      t = i.matches;
    else
      return null;
  }
  let o = t, u = i?.errors;
  if (u != null) {
    let b = o.findIndex(
      (v) => v.route.id && u?.[v.route.id] !== void 0
    );
    nt(
      b >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        u
      ).join(",")}`
    ), o = o.slice(
      0,
      Math.min(o.length, b + 1)
    );
  }
  let f = !1, m = -1;
  if (s && i) {
    f = i.renderFallback;
    for (let b = 0; b < o.length; b++) {
      let v = o[b];
      if ((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (m = b), v.route.id) {
        let { loaderData: S, errors: w } = i, j = v.route.loader && !S.hasOwnProperty(v.route.id) && (!w || w[v.route.id] === void 0);
        if (v.route.lazy || j) {
          s.isStatic && (f = !0), m >= 0 ? o = o.slice(0, m + 1) : o = [o[0]];
          break;
        }
      }
    }
  }
  let y = s?.onError, p = i && y ? (b, v) => {
    y(b, {
      location: i.location,
      params: i.matches?.[0]?.params ?? {},
      unstable_pattern: El(i.matches),
      errorInfo: v
    });
  } : void 0;
  return o.reduceRight(
    (b, v, S) => {
      let w, j = !1, C = null, _ = null;
      i && (w = u && v.route.id ? u[v.route.id] : void 0, C = v.route.errorElement || wC, f && (m < 0 && S === 0 ? (j1(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), j = !0, _ = null) : m === S && (j = !0, _ = v.route.hydrateFallbackElement || null)));
      let T = a.concat(o.slice(0, S + 1)), O = () => {
        let R;
        return w ? R = C : j ? R = _ : v.route.Component ? R = /* @__PURE__ */ g.createElement(v.route.Component, null) : v.route.element ? R = v.route.element : R = b, /* @__PURE__ */ g.createElement(
          EC,
          {
            match: v,
            routeContext: {
              outlet: b,
              matches: T,
              isDataRoute: i != null
            },
            children: R
          }
        );
      };
      return i && (v.route.ErrorBoundary || v.route.errorElement || S === 0) ? /* @__PURE__ */ g.createElement(
        S1,
        {
          location: i.location,
          revalidation: i.revalidation,
          component: C,
          error: w,
          children: O(),
          routeContext: { outlet: null, matches: T, isDataRoute: !0 },
          onError: p
        }
      ) : O();
    },
    null
  );
}
function Ph(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function CC(t) {
  let a = g.useContext(ns);
  return nt(a, Ph(t)), a;
}
function w1(t) {
  let a = g.useContext(Nl);
  return nt(a, Ph(t)), a;
}
function TC(t) {
  let a = g.useContext(qa);
  return nt(a, Ph(t)), a;
}
function Fc(t) {
  let a = TC(t), s = a.matches[a.matches.length - 1];
  return nt(
    s.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), s.route.id;
}
function RC() {
  return Fc(
    "useRouteId"
    /* UseRouteId */
  );
}
function Rl() {
  let t = w1(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Fc(
    "useLoaderData"
    /* UseLoaderData */
  );
  return t.loaderData[a];
}
function _C() {
  let t = g.useContext(Fh), a = w1(
    "useRouteError"
    /* UseRouteError */
  ), s = Fc(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[s];
}
function MC() {
  let { router: t } = CC(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Fc(
    "useNavigate"
    /* UseNavigateStable */
  ), s = g.useRef(!1);
  return x1(() => {
    s.current = !0;
  }), g.useCallback(
    async (o, u = {}) => {
      Xt(s.current, b1), s.current && (typeof o == "number" ? await t.navigate(o) : await t.navigate(o, { fromRouteId: a, ...u }));
    },
    [t, a]
  );
}
var Hy = {};
function j1(t, a, s) {
  !a && !Hy[t] && (Hy[t] = !0, Xt(!1, s));
}
var Fy = {};
function Py(t, a) {
  !t && !Fy[a] && (Fy[a] = !0, console.warn(a));
}
var AC = "useOptimistic", Gy = KE[AC], kC = () => {
};
function DC(t) {
  return Gy ? Gy(t) : [t, kC];
}
function zC(t) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: t.hasErrorBoundary || t.ErrorBoundary != null || t.errorElement != null
  };
  return t.Component && (t.element && Xt(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: g.createElement(t.Component),
    Component: void 0
  })), t.HydrateFallback && (t.hydrateFallbackElement && Xt(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: g.createElement(t.HydrateFallback),
    HydrateFallback: void 0
  })), t.ErrorBoundary && (t.errorElement && Xt(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: g.createElement(t.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var OC = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function LC(t, a) {
  return qN({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: aN({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: t,
    hydrationRouteProperties: OC,
    mapRouteProperties: zC,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var $C = class {
  constructor() {
    this.status = "pending", this.promise = new Promise((t, a) => {
      this.resolve = (s) => {
        this.status === "pending" && (this.status = "resolved", t(s));
      }, this.reject = (s) => {
        this.status === "pending" && (this.status = "rejected", a(s));
      };
    });
  }
};
function UC({
  router: t,
  flushSync: a,
  onError: s,
  unstable_useTransitions: i
}) {
  i = g1() || i;
  let [u, f] = g.useState(t.state), [m, y] = DC(u), [p, b] = g.useState(), [v, S] = g.useState({
    isTransitioning: !1
  }), [w, j] = g.useState(), [C, _] = g.useState(), [T, O] = g.useState(), R = g.useRef(/* @__PURE__ */ new Map()), N = g.useCallback(
    (q, { deletedFetchers: D, newErrors: F, flushSync: Z, viewTransitionOpts: J }) => {
      F && s && Object.values(F).forEach(
        (ie) => s(ie, {
          location: q.location,
          params: q.matches[0]?.params ?? {},
          unstable_pattern: El(q.matches)
        })
      ), q.fetchers.forEach((ie, A) => {
        ie.data !== void 0 && R.current.set(A, ie.data);
      }), D.forEach((ie) => R.current.delete(ie)), Py(
        Z === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let P = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (Py(
        J == null || P,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !J || !P) {
        a && Z ? a(() => f(q)) : i === !1 ? f(q) : g.startTransition(() => {
          i === !0 && y((ie) => Yy(ie, q)), f(q);
        });
        return;
      }
      if (a && Z) {
        a(() => {
          C && (w?.resolve(), C.skipTransition()), S({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: J.currentLocation,
            nextLocation: J.nextLocation
          });
        });
        let ie = t.window.document.startViewTransition(() => {
          a(() => f(q));
        });
        ie.finished.finally(() => {
          a(() => {
            j(void 0), _(void 0), b(void 0), S({ isTransitioning: !1 });
          });
        }), a(() => _(ie));
        return;
      }
      C ? (w?.resolve(), C.skipTransition(), O({
        state: q,
        currentLocation: J.currentLocation,
        nextLocation: J.nextLocation
      })) : (b(q), S({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: J.currentLocation,
        nextLocation: J.nextLocation
      }));
    },
    [
      t.window,
      a,
      C,
      w,
      i,
      y,
      s
    ]
  );
  g.useLayoutEffect(() => t.subscribe(N), [t, N]);
  let B = m.initialized;
  g.useLayoutEffect(() => {
    !B && t.state.initialized && N(t.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [B, N, t.state]), g.useEffect(() => {
    v.isTransitioning && !v.flushSync && j(new $C());
  }, [v]), g.useEffect(() => {
    if (w && p && t.window) {
      let q = p, D = w.promise, F = t.window.document.startViewTransition(async () => {
        i === !1 ? f(q) : g.startTransition(() => {
          i === !0 && y((Z) => Yy(Z, q)), f(q);
        }), await D;
      });
      F.finished.finally(() => {
        j(void 0), _(void 0), b(void 0), S({ isTransitioning: !1 });
      }), _(F);
    }
  }, [
    p,
    w,
    t.window,
    i,
    y
  ]), g.useEffect(() => {
    w && p && m.location.key === p.location.key && w.resolve();
  }, [w, C, m.location, p]), g.useEffect(() => {
    !v.isTransitioning && T && (b(T.state), S({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: T.currentLocation,
      nextLocation: T.nextLocation
    }), O(void 0));
  }, [v.isTransitioning, T]);
  let G = g.useMemo(() => ({
    createHref: t.createHref,
    encodeLocation: t.encodeLocation,
    go: (q) => t.navigate(q),
    push: (q, D, F) => t.navigate(q, {
      state: D,
      preventScrollReset: F?.preventScrollReset
    }),
    replace: (q, D, F) => t.navigate(q, {
      replace: !0,
      state: D,
      preventScrollReset: F?.preventScrollReset
    })
  }), [t]), te = t.basename || "/", M = g.useMemo(
    () => ({
      router: t,
      navigator: G,
      static: !1,
      basename: te,
      onError: s
    }),
    [t, G, te, s]
  );
  return /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement(ns.Provider, { value: M }, /* @__PURE__ */ g.createElement(Nl.Provider, { value: m }, /* @__PURE__ */ g.createElement(v1.Provider, { value: R.current }, /* @__PURE__ */ g.createElement(Hh.Provider, { value: v }, /* @__PURE__ */ g.createElement(
    VC,
    {
      basename: te,
      location: m.location,
      navigationType: m.historyAction,
      navigator: G,
      unstable_useTransitions: i
    },
    /* @__PURE__ */ g.createElement(
      BC,
      {
        routes: t.routes,
        future: t.future,
        state: m,
        isStatic: !1,
        onError: s
      }
    )
  ))))), null);
}
function Yy(t, a) {
  return {
    // Don't surface "current location specific" stuff mid-navigation
    // (historyAction, location, matches, loaderData, errors, initialized,
    // restoreScroll, preventScrollReset, blockers, etc.)
    ...t,
    // Only surface "pending/in-flight stuff"
    // (navigation, revalidation, actionData, fetchers, )
    navigation: a.navigation.state !== "idle" ? a.navigation : t.navigation,
    revalidation: a.revalidation !== "idle" ? a.revalidation : t.revalidation,
    actionData: a.navigation.state !== "submitting" ? a.actionData : t.actionData,
    fetchers: a.fetchers
  };
}
var BC = g.memo(IC);
function IC({
  routes: t,
  future: a,
  state: s,
  isStatic: i,
  onError: o
}) {
  return xC(t, void 0, { state: s, isStatic: i, onError: o });
}
function VC({
  basename: t = "/",
  children: a = null,
  location: s,
  navigationType: i = "POP",
  navigator: o,
  static: u = !1,
  unstable_useTransitions: f
}) {
  nt(
    !Cl(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let m = t.replace(/^\/*/, "/"), y = g.useMemo(
    () => ({
      basename: m,
      navigator: o,
      static: u,
      unstable_useTransitions: f,
      future: {}
    }),
    [m, o, u, f]
  );
  typeof s == "string" && (s = fa(s));
  let {
    pathname: p = "/",
    search: b = "",
    hash: v = "",
    state: S = null,
    key: w = "default",
    unstable_mask: j
  } = s, C = g.useMemo(() => {
    let _ = aa(p, m);
    return _ == null ? null : {
      location: {
        pathname: _,
        search: b,
        hash: v,
        state: S,
        key: w,
        unstable_mask: j
      },
      navigationType: i
    };
  }, [
    m,
    p,
    b,
    v,
    S,
    w,
    i,
    j
  ]);
  return Xt(
    C != null,
    `<Router basename="${m}"> is not able to match the URL "${p}${b}${v}" because it does not start with the basename, so the <Router> won't render anything.`
  ), C == null ? null : /* @__PURE__ */ g.createElement(ra.Provider, { value: y }, /* @__PURE__ */ g.createElement(Hc.Provider, { children: a, value: C }));
}
var vc = "get", yc = "application/x-www-form-urlencoded";
function Pc(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function qC(t) {
  return Pc(t) && t.tagName.toLowerCase() === "button";
}
function HC(t) {
  return Pc(t) && t.tagName.toLowerCase() === "form";
}
function FC(t) {
  return Pc(t) && t.tagName.toLowerCase() === "input";
}
function PC(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function GC(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !PC(t);
}
var Yo = null;
function YC() {
  if (Yo === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Yo = !1;
    } catch {
      Yo = !0;
    }
  return Yo;
}
var KC = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function xf(t) {
  return t != null && !KC.has(t) ? (Xt(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${yc}"`
  ), null) : t;
}
function XC(t, a) {
  let s, i, o, u, f;
  if (HC(t)) {
    let m = t.getAttribute("action");
    i = m ? aa(m, a) : null, s = t.getAttribute("method") || vc, o = xf(t.getAttribute("enctype")) || yc, u = new FormData(t);
  } else if (qC(t) || FC(t) && (t.type === "submit" || t.type === "image")) {
    let m = t.form;
    if (m == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let y = t.getAttribute("formaction") || m.getAttribute("action");
    if (i = y ? aa(y, a) : null, s = t.getAttribute("formmethod") || m.getAttribute("method") || vc, o = xf(t.getAttribute("formenctype")) || xf(m.getAttribute("enctype")) || yc, u = new FormData(m, t), !YC()) {
      let { name: p, type: b, value: v } = t;
      if (b === "image") {
        let S = p ? `${p}.` : "";
        u.append(`${S}x`, "0"), u.append(`${S}y`, "0");
      } else p && u.append(p, v);
    }
  } else {
    if (Pc(t))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    s = vc, i = null, o = yc, f = t;
  }
  return u && o === "text/plain" && (f = u, u = void 0), { action: i, method: s.toLowerCase(), encType: o, formData: u, body: f };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Gh(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function E1(t, a, s, i) {
  let o = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return s ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${i}` : o.pathname = `${o.pathname}.${i}` : o.pathname === "/" ? o.pathname = `_root.${i}` : a && aa(o.pathname, a) === "/" ? o.pathname = `${Cc(a)}/_root.${i}` : o.pathname = `${Cc(o.pathname)}.${i}`, o;
}
async function QC(t, a) {
  if (t.id in a)
    return a[t.id];
  try {
    let s = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      t.module
    );
    return a[t.id] = s, s;
  } catch (s) {
    return console.error(
      `Error loading route module \`${t.module}\`, reloading page...`
    ), console.error(s), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function ZC(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function JC(t, a, s) {
  let i = await Promise.all(
    t.map(async (o) => {
      let u = a.routes[o.route.id];
      if (u) {
        let f = await QC(u, s);
        return f.links ? f.links() : [];
      }
      return [];
    })
  );
  return nT(
    i.flat(1).filter(ZC).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function Ky(t, a, s, i, o, u) {
  let f = (y, p) => s[p] ? y.route.id !== s[p].route.id : !0, m = (y, p) => (
    // param change, /users/123 -> /users/456
    s[p].pathname !== y.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    s[p].route.path?.endsWith("*") && s[p].params["*"] !== y.params["*"]
  );
  return u === "assets" ? a.filter(
    (y, p) => f(y, p) || m(y, p)
  ) : u === "data" ? a.filter((y, p) => {
    let b = i.routes[y.route.id];
    if (!b || !b.hasLoader)
      return !1;
    if (f(y, p) || m(y, p))
      return !0;
    if (y.route.shouldRevalidate) {
      let v = y.route.shouldRevalidate({
        currentUrl: new URL(
          o.pathname + o.search + o.hash,
          window.origin
        ),
        currentParams: s[0]?.params || {},
        nextUrl: new URL(t, window.origin),
        nextParams: y.params,
        defaultShouldRevalidate: !0
      });
      if (typeof v == "boolean")
        return v;
    }
    return !0;
  }) : [];
}
function WC(t, a, { includeHydrateFallback: s } = {}) {
  return eT(
    t.map((i) => {
      let o = a.routes[i.route.id];
      if (!o) return [];
      let u = [o.module];
      return o.clientActionModule && (u = u.concat(o.clientActionModule)), o.clientLoaderModule && (u = u.concat(o.clientLoaderModule)), s && o.hydrateFallbackModule && (u = u.concat(o.hydrateFallbackModule)), o.imports && (u = u.concat(o.imports)), u;
    }).flat(1)
  );
}
function eT(t) {
  return [...new Set(t)];
}
function tT(t) {
  let a = {}, s = Object.keys(t).sort();
  for (let i of s)
    a[i] = t[i];
  return a;
}
function nT(t, a) {
  let s = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((i, o) => {
    let u = JSON.stringify(tT(o));
    return s.has(u) || (s.add(u), i.push({ key: u, link: o })), i;
  }, []);
}
function Yh() {
  let t = g.useContext(ns);
  return Gh(
    t,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), t;
}
function aT() {
  let t = g.useContext(Nl);
  return Gh(
    t,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), t;
}
var Kh = g.createContext(void 0);
Kh.displayName = "FrameworkContext";
function Xh() {
  let t = g.useContext(Kh);
  return Gh(
    t,
    "You must render this element inside a <HydratedRouter> element"
  ), t;
}
function rT(t, a) {
  let s = g.useContext(Kh), [i, o] = g.useState(!1), [u, f] = g.useState(!1), { onFocus: m, onBlur: y, onMouseEnter: p, onMouseLeave: b, onTouchStart: v } = a, S = g.useRef(null);
  g.useEffect(() => {
    if (t === "render" && f(!0), t === "viewport") {
      let C = (T) => {
        T.forEach((O) => {
          f(O.isIntersecting);
        });
      }, _ = new IntersectionObserver(C, { threshold: 0.5 });
      return S.current && _.observe(S.current), () => {
        _.disconnect();
      };
    }
  }, [t]), g.useEffect(() => {
    if (i) {
      let C = setTimeout(() => {
        f(!0);
      }, 100);
      return () => {
        clearTimeout(C);
      };
    }
  }, [i]);
  let w = () => {
    o(!0);
  }, j = () => {
    o(!1), f(!1);
  };
  return s ? t !== "intent" ? [u, S, {}] : [
    u,
    S,
    {
      onFocus: el(m, w),
      onBlur: el(y, j),
      onMouseEnter: el(p, w),
      onMouseLeave: el(b, j),
      onTouchStart: el(v, w)
    }
  ] : [!1, S, {}];
}
function el(t, a) {
  return (s) => {
    t && t(s), s.defaultPrevented || a(s);
  };
}
function sT({ page: t, ...a }) {
  let s = g1(), { router: i } = Yh(), o = g.useMemo(
    () => xr(i.routes, t, i.basename),
    [i.routes, t, i.basename]
  );
  return o ? s ? /* @__PURE__ */ g.createElement(lT, { page: t, matches: o, ...a }) : /* @__PURE__ */ g.createElement(oT, { page: t, matches: o, ...a }) : null;
}
function iT(t) {
  let { manifest: a, routeModules: s } = Xh(), [i, o] = g.useState([]);
  return g.useEffect(() => {
    let u = !1;
    return JC(t, a, s).then(
      (f) => {
        u || o(f);
      }
    ), () => {
      u = !0;
    };
  }, [t, a, s]), i;
}
function lT({
  page: t,
  matches: a,
  ...s
}) {
  let i = Ha(), { future: o } = Xh(), { basename: u } = Yh(), f = g.useMemo(() => {
    if (t === i.pathname + i.search + i.hash)
      return [];
    let m = E1(
      t,
      u,
      o.unstable_trailingSlashAwareDataRequests,
      "rsc"
    ), y = !1, p = [];
    for (let b of a)
      typeof b.route.shouldRevalidate == "function" ? y = !0 : p.push(b.route.id);
    return y && p.length > 0 && m.searchParams.set("_routes", p.join(",")), [m.pathname + m.search];
  }, [
    u,
    o.unstable_trailingSlashAwareDataRequests,
    t,
    i,
    a
  ]);
  return /* @__PURE__ */ g.createElement(g.Fragment, null, f.map((m) => /* @__PURE__ */ g.createElement("link", { key: m, rel: "prefetch", as: "fetch", href: m, ...s })));
}
function oT({
  page: t,
  matches: a,
  ...s
}) {
  let i = Ha(), { future: o, manifest: u, routeModules: f } = Xh(), { basename: m } = Yh(), { loaderData: y, matches: p } = aT(), b = g.useMemo(
    () => Ky(
      t,
      a,
      p,
      u,
      i,
      "data"
    ),
    [t, a, p, u, i]
  ), v = g.useMemo(
    () => Ky(
      t,
      a,
      p,
      u,
      i,
      "assets"
    ),
    [t, a, p, u, i]
  ), S = g.useMemo(() => {
    if (t === i.pathname + i.search + i.hash)
      return [];
    let C = /* @__PURE__ */ new Set(), _ = !1;
    if (a.forEach((O) => {
      let R = u.routes[O.route.id];
      !R || !R.hasLoader || (!b.some((N) => N.route.id === O.route.id) && O.route.id in y && f[O.route.id]?.shouldRevalidate || R.hasClientLoader ? _ = !0 : C.add(O.route.id));
    }), C.size === 0)
      return [];
    let T = E1(
      t,
      m,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return _ && C.size > 0 && T.searchParams.set(
      "_routes",
      a.filter((O) => C.has(O.route.id)).map((O) => O.route.id).join(",")
    ), [T.pathname + T.search];
  }, [
    m,
    o.unstable_trailingSlashAwareDataRequests,
    y,
    i,
    u,
    b,
    a,
    t,
    f
  ]), w = g.useMemo(
    () => WC(v, u),
    [v, u]
  ), j = iT(v);
  return /* @__PURE__ */ g.createElement(g.Fragment, null, S.map((C) => /* @__PURE__ */ g.createElement("link", { key: C, rel: "prefetch", as: "fetch", href: C, ...s })), w.map((C) => /* @__PURE__ */ g.createElement("link", { key: C, rel: "modulepreload", href: C, ...s })), j.map(({ key: C, link: _ }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ g.createElement(
      "link",
      {
        key: C,
        nonce: s.nonce,
        ..._,
        crossOrigin: _.crossOrigin ?? s.crossOrigin
      }
    )
  )));
}
function cT(...t) {
  return (a) => {
    t.forEach((s) => {
      typeof s == "function" ? s(a) : s != null && (s.current = a);
    });
  };
}
var uT = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  uT && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var N1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Qh = g.forwardRef(
  function({
    onClick: a,
    discover: s = "render",
    prefetch: i = "none",
    relative: o,
    reloadDocument: u,
    replace: f,
    unstable_mask: m,
    state: y,
    target: p,
    to: b,
    preventScrollReset: v,
    viewTransition: S,
    unstable_defaultShouldRevalidate: w,
    ...j
  }, C) {
    let { basename: _, navigator: T, unstable_useTransitions: O } = g.useContext(ra), R = typeof b == "string" && N1.test(b), N = t1(b, _);
    b = N.to;
    let B = yC(b, { relative: o }), G = Ha(), te = null;
    if (m) {
      let ie = Vc(
        m,
        [],
        G.unstable_mask ? G.unstable_mask.pathname : "/",
        !0
      );
      _ !== "/" && (ie.pathname = ie.pathname === "/" ? _ : ea([_, ie.pathname])), te = T.createHref(ie);
    }
    let [M, q, D] = rT(
      i,
      j
    ), F = mT(b, {
      replace: f,
      unstable_mask: m,
      state: y,
      target: p,
      preventScrollReset: v,
      relative: o,
      viewTransition: S,
      unstable_defaultShouldRevalidate: w,
      unstable_useTransitions: O
    });
    function Z(ie) {
      a && a(ie), ie.defaultPrevented || F(ie);
    }
    let J = !(N.isExternal || u), P = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ g.createElement(
        "a",
        {
          ...j,
          ...D,
          href: (J ? te : void 0) || N.absoluteURL || B,
          onClick: J ? Z : a,
          ref: cT(C, q),
          target: p,
          "data-discover": !R && s === "render" ? "true" : void 0
        }
      )
    );
    return M && !R ? /* @__PURE__ */ g.createElement(g.Fragment, null, P, /* @__PURE__ */ g.createElement(sT, { page: B })) : P;
  }
);
Qh.displayName = "Link";
var dT = g.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: s = !1,
    className: i = "",
    end: o = !1,
    style: u,
    to: f,
    viewTransition: m,
    children: y,
    ...p
  }, b) {
    let v = Tl(f, { relative: p.relative }), S = Ha(), w = g.useContext(Nl), { navigator: j, basename: C } = g.useContext(ra), _ = w != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    bT(v) && m === !0, T = j.encodeLocation ? j.encodeLocation(v).pathname : v.pathname, O = S.pathname, R = w && w.navigation && w.navigation.location ? w.navigation.location.pathname : null;
    s || (O = O.toLowerCase(), R = R ? R.toLowerCase() : null, T = T.toLowerCase()), R && C && (R = aa(R, C) || R);
    const N = T !== "/" && T.endsWith("/") ? T.length - 1 : T.length;
    let B = O === T || !o && O.startsWith(T) && O.charAt(N) === "/", G = R != null && (R === T || !o && R.startsWith(T) && R.charAt(T.length) === "/"), te = {
      isActive: B,
      isPending: G,
      isTransitioning: _
    }, M = B ? a : void 0, q;
    typeof i == "function" ? q = i(te) : q = [
      i,
      B ? "active" : null,
      G ? "pending" : null,
      _ ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let D = typeof u == "function" ? u(te) : u;
    return /* @__PURE__ */ g.createElement(
      Qh,
      {
        ...p,
        "aria-current": M,
        className: q,
        ref: b,
        style: D,
        to: f,
        viewTransition: m
      },
      typeof y == "function" ? y(te) : y
    );
  }
);
dT.displayName = "NavLink";
var fT = g.forwardRef(
  ({
    discover: t = "render",
    fetcherKey: a,
    navigate: s,
    reloadDocument: i,
    replace: o,
    state: u,
    method: f = vc,
    action: m,
    onSubmit: y,
    relative: p,
    preventScrollReset: b,
    viewTransition: v,
    unstable_defaultShouldRevalidate: S,
    ...w
  }, j) => {
    let { unstable_useTransitions: C } = g.useContext(ra), _ = vT(), T = yT(m, { relative: p }), O = f.toLowerCase() === "get" ? "get" : "post", R = typeof m == "string" && N1.test(m), N = (B) => {
      if (y && y(B), B.defaultPrevented) return;
      B.preventDefault();
      let G = B.nativeEvent.submitter, te = G?.getAttribute("formmethod") || f, M = () => _(G || B.currentTarget, {
        fetcherKey: a,
        method: te,
        navigate: s,
        replace: o,
        state: u,
        relative: p,
        preventScrollReset: b,
        viewTransition: v,
        unstable_defaultShouldRevalidate: S
      });
      C && s !== !1 ? g.startTransition(() => M()) : M();
    };
    return /* @__PURE__ */ g.createElement(
      "form",
      {
        ref: j,
        method: O,
        action: T,
        onSubmit: i ? y : N,
        ...w,
        "data-discover": !R && t === "render" ? "true" : void 0
      }
    );
  }
);
fT.displayName = "Form";
function hT(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function C1(t) {
  let a = g.useContext(ns);
  return nt(a, hT(t)), a;
}
function mT(t, {
  target: a,
  replace: s,
  unstable_mask: i,
  state: o,
  preventScrollReset: u,
  relative: f,
  viewTransition: m,
  unstable_defaultShouldRevalidate: y,
  unstable_useTransitions: p
} = {}) {
  let b = ni(), v = Ha(), S = Tl(t, { relative: f });
  return g.useCallback(
    (w) => {
      if (GC(w, a)) {
        w.preventDefault();
        let j = s !== void 0 ? s : Sa(v) === Sa(S), C = () => b(t, {
          replace: j,
          unstable_mask: i,
          state: o,
          preventScrollReset: u,
          relative: f,
          viewTransition: m,
          unstable_defaultShouldRevalidate: y
        });
        p ? g.startTransition(() => C()) : C();
      }
    },
    [
      v,
      b,
      S,
      s,
      i,
      o,
      a,
      t,
      u,
      f,
      m,
      y,
      p
    ]
  );
}
var pT = 0, gT = () => `__${String(++pT)}__`;
function vT() {
  let { router: t } = C1(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = g.useContext(ra), s = RC(), i = t.fetch, o = t.navigate;
  return g.useCallback(
    async (u, f = {}) => {
      let { action: m, method: y, encType: p, formData: b, body: v } = XC(
        u,
        a
      );
      if (f.navigate === !1) {
        let S = f.fetcherKey || gT();
        await i(S, s, f.action || m, {
          unstable_defaultShouldRevalidate: f.unstable_defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: b,
          body: v,
          formMethod: f.method || y,
          formEncType: f.encType || p,
          flushSync: f.flushSync
        });
      } else
        await o(f.action || m, {
          unstable_defaultShouldRevalidate: f.unstable_defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: b,
          body: v,
          formMethod: f.method || y,
          formEncType: f.encType || p,
          replace: f.replace,
          state: f.state,
          fromRouteId: s,
          flushSync: f.flushSync,
          viewTransition: f.viewTransition
        });
    },
    [i, o, a, s]
  );
}
function yT(t, { relative: a } = {}) {
  let { basename: s } = g.useContext(ra), i = g.useContext(qa);
  nt(i, "useFormAction must be used inside a RouteContext");
  let [o] = i.matches.slice(-1), u = { ...Tl(t || ".", { relative: a }) }, f = Ha();
  if (t == null) {
    u.search = f.search;
    let m = new URLSearchParams(u.search), y = m.getAll("index");
    if (y.some((b) => b === "")) {
      m.delete("index"), y.filter((v) => v).forEach((v) => m.append("index", v));
      let b = m.toString();
      u.search = b ? `?${b}` : "";
    }
  }
  return (!t || t === ".") && o.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), s !== "/" && (u.pathname = u.pathname === "/" ? s : ea([s, u.pathname])), Sa(u);
}
function bT(t, { relative: a } = {}) {
  let s = g.useContext(Hh);
  nt(
    s != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: i } = C1(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = Tl(t, { relative: a });
  if (!s.isTransitioning)
    return !1;
  let u = aa(s.currentLocation.pathname, i) || s.currentLocation.pathname, f = aa(s.nextLocation.pathname, i) || s.nextLocation.pathname;
  return Nc(o.pathname, f) != null || Nc(o.pathname, u) != null;
}
class ai extends Error {
  constructor(a, s, i, o) {
    super(i), this.status = a, this.category = s, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const ha = "/api/v1/extensions/nexus.audio.emotiontts";
async function Mt(t, a) {
  const s = t.startsWith("http") ? t : `${ha}${t}`, i = await fetch(s, {
    ...a,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      ...a?.headers ?? {}
    }
  });
  if (!i.ok) {
    let o = null;
    try {
      o = await i.json();
    } catch {
      o = null;
    }
    throw new ai(
      i.status,
      o?.category ?? "unknown",
      o?.message ?? i.statusText,
      o?.requestId
    );
  }
  if (i.status !== 204)
    return await i.json();
}
const xT = [
  "segment_started",
  "segment_completed",
  "segment_failed",
  "run_terminal"
];
function ST(t, a, s, i = xT, o = (u) => u) {
  const u = t.startsWith("http") ? t : `${ha}${t}`, f = new EventSource(u), m = (y) => {
    if (y.data)
      try {
        const p = o(JSON.parse(y.data));
        p !== null && a(p);
      } catch {
      }
  };
  f.onmessage = m;
  for (const y of i)
    f.addEventListener(y, m);
  return f.onerror = (y) => {
    s?.(y);
  }, () => f.close();
}
async function wT() {
  return Mt("/deployments");
}
async function Xy(t) {
  return Mt(`/deployments/${t}`);
}
async function jT(t, a) {
  return Mt(`/deployments/${t}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function Qy(t) {
  return Mt(`/mappings?deploymentId=${encodeURIComponent(t)}`);
}
async function Zh(t, a) {
  return Mt("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: t })
  });
}
async function Ys(t, a, s) {
  return Mt(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify(s)
    }
  );
}
async function T1(t, a) {
  await Mt(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function ET(t) {
  return Mt(`/mappings/export?deploymentId=${encodeURIComponent(t)}`);
}
async function NT(t, a, s = "error") {
  return Mt("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: t, mappings: a, conflictStrategy: s })
  });
}
function CT(t) {
  return typeof t == "object" && t !== null ? t : null;
}
function mr(t, ...a) {
  for (const s of a) {
    const i = t[s];
    if (typeof i == "string") return i;
  }
}
function Zy(t, ...a) {
  for (const s of a) {
    const i = t[s];
    if (typeof i == "number") return i;
  }
}
function TT(t, ...a) {
  for (const s of a) {
    const i = t[s];
    if (typeof i == "boolean") return i;
  }
}
function RT(t) {
  const a = CT(t);
  if (!a) return null;
  const s = mr(a, "type");
  if (!s) return null;
  const i = mr(a, "runId", "run_id"), o = Zy(a, "globalIndex", "global_index"), u = mr(a, "utteranceId", "utterance_id");
  switch (s) {
    case "segment_started":
      return i === void 0 || o === void 0 ? null : { type: s, runId: i, globalIndex: o, utteranceId: u };
    case "segment_completed":
      return i === void 0 || o === void 0 ? null : {
        type: s,
        runId: i,
        globalIndex: o,
        utteranceId: u,
        durationMs: Zy(a, "durationMs", "duration_ms") ?? 0,
        cacheHit: TT(a, "cacheHit", "cache_hit") ?? !1,
        audioArtifactRef: mr(a, "audioArtifactRef", "audio_artifact_ref")
      };
    case "segment_failed":
      return i === void 0 || o === void 0 ? null : {
        type: s,
        runId: i,
        globalIndex: o,
        utteranceId: u,
        failureCategory: mr(a, "failureCategory", "failure_category") ?? "error",
        failureDetail: mr(a, "failureDetail", "failure_detail") ?? ""
      };
    case "run_terminal": {
      if (i === void 0) return null;
      const f = mr(a, "status") ?? "completed", m = mr(a, "exportArtifactRef", "export_artifact_ref") ?? null;
      return { type: s, runId: i, status: f, exportArtifactRef: m };
    }
    default:
      return null;
  }
}
async function _T(t, a = {}) {
  const s = new URLSearchParams();
  a.limit && s.set("limit", String(a.limit)), a.status && s.set("status", a.status);
  const i = s.toString(), o = i ? `?${i}` : "";
  return Mt(`/deployments/${t}/runs${o}`);
}
async function R1(t, a) {
  return Mt(`/deployments/${t}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function MT(t, a) {
  return Promise.all(a.map((s) => R1(t, s)));
}
function AT(t, a) {
  if (t.length === 0) return [];
  const s = Math.min(Math.max(Math.floor(a), 1), t.length), i = Math.floor(t.length / s), o = t.length % s, u = [];
  let f = 0;
  for (let m = 0; m < s; m += 1) {
    const y = i + (m < o ? 1 : 0);
    u.push(t.slice(f, f + y)), f += y;
  }
  return u;
}
async function Jh(t, a) {
  return Mt(`/deployments/${t}/runs/${a}`);
}
async function Jy(t, a) {
  return Mt(`/deployments/${t}/runs/${a}/cancel`, { method: "POST" });
}
async function _1(t, a) {
  return Mt(`/deployments/${t}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function kT(t, a) {
  return Mt(`/deployments/${t}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function Sf(t, a, s, i) {
  return ST(
    `/deployments/${t}/runs/${a}/progress`,
    s,
    i,
    void 0,
    RT
  );
}
async function Zs(t) {
  return Mt(`/voice-assets?deploymentId=${encodeURIComponent(t)}`);
}
async function Tc(t, a, s, i, o) {
  const u = new FormData();
  u.append("deploymentId", t), u.append("displayName", s), u.append("kind", i), u.append("audio", a);
  const f = await fetch(`${ha}/voice-assets`, {
    method: "POST",
    body: u
  });
  if (!f.ok)
    throw new Error(`upload failed: ${f.status}`);
  return await f.json();
}
async function DT(t, a) {
  await Mt(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function zT(t, a, s) {
  return Mt(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ displayName: s })
    }
  );
}
function OT(t) {
  if (!t.audioArtifactRef) return null;
  const a = new URLSearchParams({ deploymentId: t.deploymentId });
  return `${ha}/voice-assets/${encodeURIComponent(t.voiceAssetId)}/audio?${a.toString()}`;
}
async function LT(t) {
  return Mt(`/workflow?deploymentId=${encodeURIComponent(t)}`);
}
var $T = "mux0i60", UT = "mux0i61", BT = "mux0i62", IT = "mux0i63";
function Gc({ count: t = "0", title: a, hint: s }) {
  return /* @__PURE__ */ c.jsxs("div", { className: $T, children: [
    /* @__PURE__ */ c.jsx("span", { className: UT, "aria-hidden": "true", children: t }),
    /* @__PURE__ */ c.jsx("h3", { className: BT, children: a }),
    s ? /* @__PURE__ */ c.jsx("p", { className: IT, children: s }) : null
  ] });
}
var VT = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, qT = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, HT = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, FT = "zwn3019";
function Ia({
  tone: t = "raised",
  density: a = "comfortable",
  elevation: s = "subtle",
  as: i = "section",
  children: o,
  className: u,
  style: f,
  ...m
}) {
  const y = [VT[t], HT[a], qT[s], u].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(i, { className: y, style: f, "data-elevation": s, ...m, children: o });
}
function PT({ children: t, className: a }) {
  const s = [FT, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: s, children: t });
}
var Jr = "vrkn5p0", GT = "_93p6291", YT = "_93p6292", KT = "_93p6293", XT = "_93p6294", QT = "_93p6295", ZT = "_93p6296", JT = "_93p6297", WT = "_93p6298", eR = "_93p6299", tR = "_93p629a", nR = "_93p629b", aR = "_93p629c", rR = "_93p629d", sR = "_93p629e";
const iR = "nexus-host-navigate";
function lR(t) {
  return `#/deployments/${encodeURIComponent(t)}`;
}
function oR(t, a) {
  if (t.defaultPrevented || t.button !== 0 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey)
    return;
  t.preventDefault();
  const s = {
    kind: "deployment-detail",
    deploymentId: a
  };
  window.dispatchEvent(
    new CustomEvent(iR, {
      detail: s
    })
  );
}
function cR() {
  const { deployments: t } = Rl(), a = t.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ c.jsxs("main", { className: GT, children: [
    /* @__PURE__ */ c.jsxs("header", { className: YT, children: [
      /* @__PURE__ */ c.jsx("p", { className: KT, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ c.jsxs("h1", { className: XT, children: [
        "Direct your characters.",
        /* @__PURE__ */ c.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: QT, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ c.jsxs("p", { className: ZT, children: [
        /* @__PURE__ */ c.jsx("span", { className: JT, children: t.length }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          a,
          " ready"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs(
      Ia,
      {
        density: "airy",
        elevation: "raised",
        className: WT,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ c.jsx("h2", { id: "deployments-section-list", className: Jr, children: "01 / Deployments" }),
          t.length === 0 ? /* @__PURE__ */ c.jsx(
            Gc,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ c.jsx("ul", { className: eR, children: t.map((s) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
            "a",
            {
              href: lR(s.deploymentId),
              onClick: (i) => oR(i, s.deploymentId),
              className: tR,
              children: [
                /* @__PURE__ */ c.jsx("span", { className: nR, "aria-hidden": "true", children: uR(s.displayName) }),
                /* @__PURE__ */ c.jsxs("span", { children: [
                  /* @__PURE__ */ c.jsx("span", { className: aR, children: s.displayName }),
                  /* @__PURE__ */ c.jsx("span", { className: rR, children: s.deploymentId })
                ] }),
                /* @__PURE__ */ c.jsx("span", { className: sR, "aria-hidden": "true", children: "→" })
              ]
            }
          ) }, s.deploymentId)) })
        ]
      }
    )
  ] });
}
function uR(t) {
  const a = t.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
var Wh = Kx();
const dR = /* @__PURE__ */ Yx(Wh);
function fR(t) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], s = document.createElement("style");
  s.type = "text/css", a.appendChild(s), s.styleSheet ? s.styleSheet.cssText = t : s.appendChild(document.createTextNode(t));
}
const hR = (t) => {
  switch (t) {
    case "success":
      return gR;
    case "info":
      return yR;
    case "warning":
      return vR;
    case "error":
      return bR;
    default:
      return null;
  }
}, mR = Array(12).fill(0), pR = ({ visible: t, className: a }) => /* @__PURE__ */ we.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": t
}, /* @__PURE__ */ we.createElement("div", {
  className: "sonner-spinner"
}, mR.map((s, i) => /* @__PURE__ */ we.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${i}`
})))), gR = /* @__PURE__ */ we.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ we.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), vR = /* @__PURE__ */ we.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ we.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), yR = /* @__PURE__ */ we.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ we.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), bR = /* @__PURE__ */ we.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ we.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), xR = /* @__PURE__ */ we.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ we.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ we.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})), SR = () => {
  const [t, a] = we.useState(document.hidden);
  return we.useEffect(() => {
    const s = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", s), () => window.removeEventListener("visibilitychange", s);
  }, []), t;
};
let ih = 1;
class wR {
  constructor() {
    this.subscribe = (a) => (this.subscribers.push(a), () => {
      const s = this.subscribers.indexOf(a);
      this.subscribers.splice(s, 1);
    }), this.publish = (a) => {
      this.subscribers.forEach((s) => s(a));
    }, this.addToast = (a) => {
      this.publish(a), this.toasts = [
        ...this.toasts,
        a
      ];
    }, this.create = (a) => {
      var s;
      const { message: i, ...o } = a, u = typeof a?.id == "number" || ((s = a.id) == null ? void 0 : s.length) > 0 ? a.id : ih++, f = this.toasts.find((y) => y.id === u), m = a.dismissible === void 0 ? !0 : a.dismissible;
      return this.dismissedToasts.has(u) && this.dismissedToasts.delete(u), f ? this.toasts = this.toasts.map((y) => y.id === u ? (this.publish({
        ...y,
        ...a,
        id: u,
        title: i
      }), {
        ...y,
        ...a,
        id: u,
        dismissible: m,
        title: i
      }) : y) : this.addToast({
        title: i,
        ...o,
        dismissible: m,
        id: u
      }), u;
    }, this.dismiss = (a) => (a ? (this.dismissedToasts.add(a), requestAnimationFrame(() => this.subscribers.forEach((s) => s({
      id: a,
      dismiss: !0
    })))) : this.toasts.forEach((s) => {
      this.subscribers.forEach((i) => i({
        id: s.id,
        dismiss: !0
      }));
    }), a), this.message = (a, s) => this.create({
      ...s,
      message: a
    }), this.error = (a, s) => this.create({
      ...s,
      message: a,
      type: "error"
    }), this.success = (a, s) => this.create({
      ...s,
      type: "success",
      message: a
    }), this.info = (a, s) => this.create({
      ...s,
      type: "info",
      message: a
    }), this.warning = (a, s) => this.create({
      ...s,
      type: "warning",
      message: a
    }), this.loading = (a, s) => this.create({
      ...s,
      type: "loading",
      message: a
    }), this.promise = (a, s) => {
      if (!s)
        return;
      let i;
      s.loading !== void 0 && (i = this.create({
        ...s,
        promise: a,
        type: "loading",
        message: s.loading,
        description: typeof s.description != "function" ? s.description : void 0
      }));
      const o = Promise.resolve(a instanceof Function ? a() : a);
      let u = i !== void 0, f;
      const m = o.then(async (p) => {
        if (f = [
          "resolve",
          p
        ], we.isValidElement(p))
          u = !1, this.create({
            id: i,
            type: "default",
            message: p
          });
        else if (ER(p) && !p.ok) {
          u = !1;
          const v = typeof s.error == "function" ? await s.error(`HTTP error! status: ${p.status}`) : s.error, S = typeof s.description == "function" ? await s.description(`HTTP error! status: ${p.status}`) : s.description, j = typeof v == "object" && !we.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: i,
            type: "error",
            description: S,
            ...j
          });
        } else if (p instanceof Error) {
          u = !1;
          const v = typeof s.error == "function" ? await s.error(p) : s.error, S = typeof s.description == "function" ? await s.description(p) : s.description, j = typeof v == "object" && !we.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: i,
            type: "error",
            description: S,
            ...j
          });
        } else if (s.success !== void 0) {
          u = !1;
          const v = typeof s.success == "function" ? await s.success(p) : s.success, S = typeof s.description == "function" ? await s.description(p) : s.description, j = typeof v == "object" && !we.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: i,
            type: "success",
            description: S,
            ...j
          });
        }
      }).catch(async (p) => {
        if (f = [
          "reject",
          p
        ], s.error !== void 0) {
          u = !1;
          const b = typeof s.error == "function" ? await s.error(p) : s.error, v = typeof s.description == "function" ? await s.description(p) : s.description, w = typeof b == "object" && !we.isValidElement(b) ? b : {
            message: b
          };
          this.create({
            id: i,
            type: "error",
            description: v,
            ...w
          });
        }
      }).finally(() => {
        u && (this.dismiss(i), i = void 0), s.finally == null || s.finally.call(s);
      }), y = () => new Promise((p, b) => m.then(() => f[0] === "reject" ? b(f[1]) : p(f[1])).catch(b));
      return typeof i != "string" && typeof i != "number" ? {
        unwrap: y
      } : Object.assign(i, {
        unwrap: y
      });
    }, this.custom = (a, s) => {
      const i = s?.id || ih++;
      return this.create({
        jsx: a(i),
        id: i,
        ...s
      }), i;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const An = new wR(), jR = (t, a) => {
  const s = a?.id || ih++;
  return An.addToast({
    title: t,
    ...a,
    id: s
  }), s;
}, ER = (t) => t && typeof t == "object" && "ok" in t && typeof t.ok == "boolean" && "status" in t && typeof t.status == "number", NR = jR, CR = () => An.toasts, TR = () => An.getActiveToasts(), mn = Object.assign(NR, {
  success: An.success,
  info: An.info,
  warning: An.warning,
  error: An.error,
  custom: An.custom,
  message: An.message,
  promise: An.promise,
  dismiss: An.dismiss,
  loading: An.loading
}, {
  getHistory: CR,
  getToasts: TR
});
fR("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Ko(t) {
  return t.label !== void 0;
}
const RR = 3, _R = "24px", MR = "16px", Wy = 4e3, AR = 356, kR = 14, DR = 45, zR = 200;
function xa(...t) {
  return t.filter(Boolean).join(" ");
}
function OR(t) {
  const [a, s] = t.split("-"), i = [];
  return a && i.push(a), s && i.push(s), i;
}
const LR = (t) => {
  var a, s, i, o, u, f, m, y, p;
  const { invert: b, toast: v, unstyled: S, interacting: w, setHeights: j, visibleToasts: C, heights: _, index: T, toasts: O, expanded: R, removeToast: N, defaultRichColors: B, closeButton: G, style: te, cancelButtonStyle: M, actionButtonStyle: q, className: D = "", descriptionClassName: F = "", duration: Z, position: J, gap: P, expandByDefault: ie, classNames: A, icons: V, closeButtonAriaLabel: $ = "Close toast" } = t, [se, fe] = we.useState(null), [k, ne] = we.useState(null), [ae, K] = we.useState(!1), [U, W] = we.useState(!1), [ue, be] = we.useState(!1), [Ae, lt] = we.useState(!1), [Ne, We] = we.useState(!1), [Be, Fe] = we.useState(0), [rn, qt] = we.useState(0), At = we.useRef(v.duration || Z || Wy), Te = we.useRef(null), He = we.useRef(null), at = T === 0, St = T + 1 <= C, ot = v.type, Ke = v.dismissible !== !1, gt = v.className || "", je = v.descriptionClassName || "", ke = we.useMemo(() => _.findIndex((ve) => ve.toastId === v.id) || 0, [
    _,
    v.id
  ]), Pe = we.useMemo(() => {
    var ve;
    return (ve = v.closeButton) != null ? ve : G;
  }, [
    v.closeButton,
    G
  ]), Xe = we.useMemo(() => v.duration || Z || Wy, [
    v.duration,
    Z
  ]), yt = we.useRef(0), Tt = we.useRef(0), zn = we.useRef(0), Sn = we.useRef(null), [pn, Pt] = J.split("-"), Dt = we.useMemo(() => _.reduce((ve, xe, Y) => Y >= ke ? ve : ve + xe.height, 0), [
    _,
    ke
  ]), Bt = SR(), sa = v.invert || b, wn = ot === "loading";
  Tt.current = we.useMemo(() => ke * P + Dt, [
    ke,
    Dt
  ]), we.useEffect(() => {
    At.current = Xe;
  }, [
    Xe
  ]), we.useEffect(() => {
    K(!0);
  }, []), we.useEffect(() => {
    const ve = He.current;
    if (ve) {
      const xe = ve.getBoundingClientRect().height;
      return qt(xe), j((Y) => [
        {
          toastId: v.id,
          height: xe,
          position: v.position
        },
        ...Y
      ]), () => j((Y) => Y.filter((ce) => ce.toastId !== v.id));
    }
  }, [
    j,
    v.id
  ]), we.useLayoutEffect(() => {
    if (!ae) return;
    const ve = He.current, xe = ve.style.height;
    ve.style.height = "auto";
    const Y = ve.getBoundingClientRect().height;
    ve.style.height = xe, qt(Y), j((ce) => ce.find((_e) => _e.toastId === v.id) ? ce.map((_e) => _e.toastId === v.id ? {
      ..._e,
      height: Y
    } : _e) : [
      {
        toastId: v.id,
        height: Y,
        position: v.position
      },
      ...ce
    ]);
  }, [
    ae,
    v.title,
    v.description,
    j,
    v.id,
    v.jsx,
    v.action,
    v.cancel
  ]);
  const cn = we.useCallback(() => {
    W(!0), Fe(Tt.current), j((ve) => ve.filter((xe) => xe.toastId !== v.id)), setTimeout(() => {
      N(v);
    }, zR);
  }, [
    v,
    N,
    j,
    Tt
  ]);
  we.useEffect(() => {
    if (v.promise && ot === "loading" || v.duration === 1 / 0 || v.type === "loading") return;
    let ve;
    return R || w || Bt ? (() => {
      if (zn.current < yt.current) {
        const ce = (/* @__PURE__ */ new Date()).getTime() - yt.current;
        At.current = At.current - ce;
      }
      zn.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      At.current !== 1 / 0 && (yt.current = (/* @__PURE__ */ new Date()).getTime(), ve = setTimeout(() => {
        v.onAutoClose == null || v.onAutoClose.call(v, v), cn();
      }, At.current));
    })(), () => clearTimeout(ve);
  }, [
    R,
    w,
    v,
    ot,
    Bt,
    cn
  ]), we.useEffect(() => {
    v.delete && (cn(), v.onDismiss == null || v.onDismiss.call(v, v));
  }, [
    cn,
    v.delete
  ]);
  function En() {
    var ve;
    if (V?.loading) {
      var xe;
      return /* @__PURE__ */ we.createElement("div", {
        className: xa(A?.loader, v == null || (xe = v.classNames) == null ? void 0 : xe.loader, "sonner-loader"),
        "data-visible": ot === "loading"
      }, V.loading);
    }
    return /* @__PURE__ */ we.createElement(pR, {
      className: xa(A?.loader, v == null || (ve = v.classNames) == null ? void 0 : ve.loader),
      visible: ot === "loading"
    });
  }
  const It = v.icon || V?.[ot] || hR(ot);
  var he, Re;
  return /* @__PURE__ */ we.createElement("li", {
    tabIndex: 0,
    ref: He,
    className: xa(D, gt, A?.toast, v == null || (a = v.classNames) == null ? void 0 : a.toast, A?.default, A?.[ot], v == null || (s = v.classNames) == null ? void 0 : s[ot]),
    "data-sonner-toast": "",
    "data-rich-colors": (he = v.richColors) != null ? he : B,
    "data-styled": !(v.jsx || v.unstyled || S),
    "data-mounted": ae,
    "data-promise": !!v.promise,
    "data-swiped": Ne,
    "data-removed": U,
    "data-visible": St,
    "data-y-position": pn,
    "data-x-position": Pt,
    "data-index": T,
    "data-front": at,
    "data-swiping": ue,
    "data-dismissible": Ke,
    "data-type": ot,
    "data-invert": sa,
    "data-swipe-out": Ae,
    "data-swipe-direction": k,
    "data-expanded": !!(R || ie && ae),
    "data-testid": v.testId,
    style: {
      "--index": T,
      "--toasts-before": T,
      "--z-index": O.length - T,
      "--offset": `${U ? Be : Tt.current}px`,
      "--initial-height": ie ? "auto" : `${rn}px`,
      ...te,
      ...v.style
    },
    onDragEnd: () => {
      be(!1), fe(null), Sn.current = null;
    },
    onPointerDown: (ve) => {
      ve.button !== 2 && (wn || !Ke || (Te.current = /* @__PURE__ */ new Date(), Fe(Tt.current), ve.target.setPointerCapture(ve.pointerId), ve.target.tagName !== "BUTTON" && (be(!0), Sn.current = {
        x: ve.clientX,
        y: ve.clientY
      })));
    },
    onPointerUp: () => {
      var ve, xe, Y;
      if (Ae || !Ke) return;
      Sn.current = null;
      const ce = Number(((ve = He.current) == null ? void 0 : ve.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), Ce = Number(((xe = He.current) == null ? void 0 : xe.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), _e = (/* @__PURE__ */ new Date()).getTime() - ((Y = Te.current) == null ? void 0 : Y.getTime()), Ge = se === "x" ? ce : Ce, wt = Math.abs(Ge) / _e;
      if (Math.abs(Ge) >= DR || wt > 0.11) {
        Fe(Tt.current), v.onDismiss == null || v.onDismiss.call(v, v), ne(se === "x" ? ce > 0 ? "right" : "left" : Ce > 0 ? "down" : "up"), cn(), lt(!0);
        return;
      } else {
        var ft, z;
        (ft = He.current) == null || ft.style.setProperty("--swipe-amount-x", "0px"), (z = He.current) == null || z.style.setProperty("--swipe-amount-y", "0px");
      }
      We(!1), be(!1), fe(null);
    },
    onPointerMove: (ve) => {
      var xe, Y, ce;
      if (!Sn.current || !Ke || ((xe = window.getSelection()) == null ? void 0 : xe.toString().length) > 0) return;
      const _e = ve.clientY - Sn.current.y, Ge = ve.clientX - Sn.current.x;
      var wt;
      const ft = (wt = t.swipeDirections) != null ? wt : OR(J);
      !se && (Math.abs(Ge) > 1 || Math.abs(_e) > 1) && fe(Math.abs(Ge) > Math.abs(_e) ? "x" : "y");
      let z = {
        x: 0,
        y: 0
      };
      const H = (Q) => 1 / (1.5 + Math.abs(Q) / 20);
      if (se === "y") {
        if (ft.includes("top") || ft.includes("bottom"))
          if (ft.includes("top") && _e < 0 || ft.includes("bottom") && _e > 0)
            z.y = _e;
          else {
            const Q = _e * H(_e);
            z.y = Math.abs(Q) < Math.abs(_e) ? Q : _e;
          }
      } else if (se === "x" && (ft.includes("left") || ft.includes("right")))
        if (ft.includes("left") && Ge < 0 || ft.includes("right") && Ge > 0)
          z.x = Ge;
        else {
          const Q = Ge * H(Ge);
          z.x = Math.abs(Q) < Math.abs(Ge) ? Q : Ge;
        }
      (Math.abs(z.x) > 0 || Math.abs(z.y) > 0) && We(!0), (Y = He.current) == null || Y.style.setProperty("--swipe-amount-x", `${z.x}px`), (ce = He.current) == null || ce.style.setProperty("--swipe-amount-y", `${z.y}px`);
    }
  }, Pe && !v.jsx && ot !== "loading" ? /* @__PURE__ */ we.createElement("button", {
    "aria-label": $,
    "data-disabled": wn,
    "data-close-button": !0,
    onClick: wn || !Ke ? () => {
    } : () => {
      cn(), v.onDismiss == null || v.onDismiss.call(v, v);
    },
    className: xa(A?.closeButton, v == null || (i = v.classNames) == null ? void 0 : i.closeButton)
  }, (Re = V?.close) != null ? Re : xR) : null, (ot || v.icon || v.promise) && v.icon !== null && (V?.[ot] !== null || v.icon) ? /* @__PURE__ */ we.createElement("div", {
    "data-icon": "",
    className: xa(A?.icon, v == null || (o = v.classNames) == null ? void 0 : o.icon)
  }, v.promise || v.type === "loading" && !v.icon ? v.icon || En() : null, v.type !== "loading" ? It : null) : null, /* @__PURE__ */ we.createElement("div", {
    "data-content": "",
    className: xa(A?.content, v == null || (u = v.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ we.createElement("div", {
    "data-title": "",
    className: xa(A?.title, v == null || (f = v.classNames) == null ? void 0 : f.title)
  }, v.jsx ? v.jsx : typeof v.title == "function" ? v.title() : v.title), v.description ? /* @__PURE__ */ we.createElement("div", {
    "data-description": "",
    className: xa(F, je, A?.description, v == null || (m = v.classNames) == null ? void 0 : m.description)
  }, typeof v.description == "function" ? v.description() : v.description) : null), /* @__PURE__ */ we.isValidElement(v.cancel) ? v.cancel : v.cancel && Ko(v.cancel) ? /* @__PURE__ */ we.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: v.cancelButtonStyle || M,
    onClick: (ve) => {
      Ko(v.cancel) && Ke && (v.cancel.onClick == null || v.cancel.onClick.call(v.cancel, ve), cn());
    },
    className: xa(A?.cancelButton, v == null || (y = v.classNames) == null ? void 0 : y.cancelButton)
  }, v.cancel.label) : null, /* @__PURE__ */ we.isValidElement(v.action) ? v.action : v.action && Ko(v.action) ? /* @__PURE__ */ we.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: v.actionButtonStyle || q,
    onClick: (ve) => {
      Ko(v.action) && (v.action.onClick == null || v.action.onClick.call(v.action, ve), !ve.defaultPrevented && cn());
    },
    className: xa(A?.actionButton, v == null || (p = v.classNames) == null ? void 0 : p.actionButton)
  }, v.action.label) : null);
};
function e0() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const t = document.documentElement.getAttribute("dir");
  return t === "auto" || !t ? window.getComputedStyle(document.documentElement).direction : t;
}
function $R(t, a) {
  const s = {};
  return [
    t,
    a
  ].forEach((i, o) => {
    const u = o === 1, f = u ? "--mobile-offset" : "--offset", m = u ? MR : _R;
    function y(p) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((b) => {
        s[`${f}-${b}`] = typeof p == "number" ? `${p}px` : p;
      });
    }
    typeof i == "number" || typeof i == "string" ? y(i) : typeof i == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((p) => {
      i[p] === void 0 ? s[`${f}-${p}`] = m : s[`${f}-${p}`] = typeof i[p] == "number" ? `${i[p]}px` : i[p];
    }) : y(m);
  }), s;
}
const UR = /* @__PURE__ */ we.forwardRef(function(a, s) {
  const { id: i, invert: o, position: u = "bottom-right", hotkey: f = [
    "altKey",
    "KeyT"
  ], expand: m, closeButton: y, className: p, offset: b, mobileOffset: v, theme: S = "light", richColors: w, duration: j, style: C, visibleToasts: _ = RR, toastOptions: T, dir: O = e0(), gap: R = kR, icons: N, containerAriaLabel: B = "Notifications" } = a, [G, te] = we.useState([]), M = we.useMemo(() => i ? G.filter((ae) => ae.toasterId === i) : G.filter((ae) => !ae.toasterId), [
    G,
    i
  ]), q = we.useMemo(() => Array.from(new Set([
    u
  ].concat(M.filter((ae) => ae.position).map((ae) => ae.position)))), [
    M,
    u
  ]), [D, F] = we.useState([]), [Z, J] = we.useState(!1), [P, ie] = we.useState(!1), [A, V] = we.useState(S !== "system" ? S : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), $ = we.useRef(null), se = f.join("+").replace(/Key/g, "").replace(/Digit/g, ""), fe = we.useRef(null), k = we.useRef(!1), ne = we.useCallback((ae) => {
    te((K) => {
      var U;
      return (U = K.find((W) => W.id === ae.id)) != null && U.delete || An.dismiss(ae.id), K.filter(({ id: W }) => W !== ae.id);
    });
  }, []);
  return we.useEffect(() => An.subscribe((ae) => {
    if (ae.dismiss) {
      requestAnimationFrame(() => {
        te((K) => K.map((U) => U.id === ae.id ? {
          ...U,
          delete: !0
        } : U));
      });
      return;
    }
    setTimeout(() => {
      dR.flushSync(() => {
        te((K) => {
          const U = K.findIndex((W) => W.id === ae.id);
          return U !== -1 ? [
            ...K.slice(0, U),
            {
              ...K[U],
              ...ae
            },
            ...K.slice(U + 1)
          ] : [
            ae,
            ...K
          ];
        });
      });
    });
  }), [
    G
  ]), we.useEffect(() => {
    if (S !== "system") {
      V(S);
      return;
    }
    if (S === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? V("dark") : V("light")), typeof window > "u") return;
    const ae = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      ae.addEventListener("change", ({ matches: K }) => {
        V(K ? "dark" : "light");
      });
    } catch {
      ae.addListener(({ matches: U }) => {
        try {
          V(U ? "dark" : "light");
        } catch (W) {
          console.error(W);
        }
      });
    }
  }, [
    S
  ]), we.useEffect(() => {
    G.length <= 1 && J(!1);
  }, [
    G
  ]), we.useEffect(() => {
    const ae = (K) => {
      var U;
      if (f.every((be) => K[be] || K.code === be)) {
        var ue;
        J(!0), (ue = $.current) == null || ue.focus();
      }
      K.code === "Escape" && (document.activeElement === $.current || (U = $.current) != null && U.contains(document.activeElement)) && J(!1);
    };
    return document.addEventListener("keydown", ae), () => document.removeEventListener("keydown", ae);
  }, [
    f
  ]), we.useEffect(() => {
    if ($.current)
      return () => {
        fe.current && (fe.current.focus({
          preventScroll: !0
        }), fe.current = null, k.current = !1);
      };
  }, [
    $.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ we.createElement("section", {
    ref: s,
    "aria-label": `${B} ${se}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, q.map((ae, K) => {
    var U;
    const [W, ue] = ae.split("-");
    return M.length ? /* @__PURE__ */ we.createElement("ol", {
      key: ae,
      dir: O === "auto" ? e0() : O,
      tabIndex: -1,
      ref: $,
      className: p,
      "data-sonner-toaster": !0,
      "data-sonner-theme": A,
      "data-y-position": W,
      "data-x-position": ue,
      style: {
        "--front-toast-height": `${((U = D[0]) == null ? void 0 : U.height) || 0}px`,
        "--width": `${AR}px`,
        "--gap": `${R}px`,
        ...C,
        ...$R(b, v)
      },
      onBlur: (be) => {
        k.current && !be.currentTarget.contains(be.relatedTarget) && (k.current = !1, fe.current && (fe.current.focus({
          preventScroll: !0
        }), fe.current = null));
      },
      onFocus: (be) => {
        be.target instanceof HTMLElement && be.target.dataset.dismissible === "false" || k.current || (k.current = !0, fe.current = be.relatedTarget);
      },
      onMouseEnter: () => J(!0),
      onMouseMove: () => J(!0),
      onMouseLeave: () => {
        P || J(!1);
      },
      onDragEnd: () => J(!1),
      onPointerDown: (be) => {
        be.target instanceof HTMLElement && be.target.dataset.dismissible === "false" || ie(!0);
      },
      onPointerUp: () => ie(!1)
    }, M.filter((be) => !be.position && K === 0 || be.position === ae).map((be, Ae) => {
      var lt, Ne;
      return /* @__PURE__ */ we.createElement(LR, {
        key: be.id,
        icons: N,
        index: Ae,
        toast: be,
        defaultRichColors: w,
        duration: (lt = T?.duration) != null ? lt : j,
        className: T?.className,
        descriptionClassName: T?.descriptionClassName,
        invert: o,
        visibleToasts: _,
        closeButton: (Ne = T?.closeButton) != null ? Ne : y,
        interacting: P,
        position: ae,
        style: T?.style,
        unstyled: T?.unstyled,
        classNames: T?.classNames,
        cancelButtonStyle: T?.cancelButtonStyle,
        actionButtonStyle: T?.actionButtonStyle,
        closeButtonAriaLabel: T?.closeButtonAriaLabel,
        removeToast: ne,
        toasts: M.filter((We) => We.position == be.position),
        heights: D.filter((We) => We.position == be.position),
        setHeights: F,
        expandByDefault: m,
        gap: R,
        expanded: Z,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), t0 = 32, n0 = -30, a0 = -6, r0 = 0.5, s0 = 2, i0 = -24, l0 = 24, o0 = -12, c0 = 12, u0 = -12, d0 = 12, f0 = -60, h0 = -20;
class Js extends Error {
  constructor(a, s) {
    super(s), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function M1(t, a, s, i = {}) {
  const o = `/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, u = `${ha}${o}`, f = await fetch(u, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(s),
    ...i.signal ? { signal: i.signal } : {}
  });
  if (f.status === 409) {
    const m = await f.json().catch(() => null), y = m?.error?.current_digest ?? "", p = m?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Js(y, p);
  }
  if (!f.ok)
    throw new Error(await Yc(f, "apply"));
  return await f.json();
}
async function BR(t, a, s, i, o = {}) {
  const u = `/deployments/${encodeURIComponent(t)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(s)}/edit`, f = `${ha}${u}`, m = await fetch(f, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(i),
    ...o.signal ? { signal: o.signal } : {}
  });
  if (m.status === 409) {
    const y = await m.json().catch(() => null), p = y?.error?.current_digest ?? "", b = y?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Js(p, b);
  }
  if (!m.ok)
    throw new Error(await Yc(m, "apply"));
  return await m.json();
}
async function IR(t, a, s = {}) {
  const i = `${ha}/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, o = await fetch(i, {
    method: "DELETE",
    ...s.signal ? { signal: s.signal } : {}
  });
  if (!o.ok && o.status !== 204)
    throw new Error(`clear edit failed: ${o.status}`);
}
async function VR(t, a, s, i = {}) {
  const o = `${ha}/voice-assets/${encodeURIComponent(t)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, u = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain: s }),
    ...i.signal ? { signal: i.signal } : {}
  });
  if (!u.ok)
    throw new Error(await Yc(u, "preview"));
  return u.blob();
}
async function bc(t, a, s, i = 50, o = {}) {
  const u = `${ha}/audit/${encodeURIComponent(a)}/${encodeURIComponent(s)}?deploymentId=${encodeURIComponent(t)}&limit=${encodeURIComponent(String(i))}`, f = await fetch(u, {
    method: "GET",
    headers: { accept: "application/json" },
    ...o.signal ? { signal: o.signal } : {}
  });
  if (!f.ok)
    throw new Error(await Yc(f, "audit fetch"));
  return await f.json();
}
function Dn() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function A1(t, a) {
  if (t.version !== 1)
    return { message: "Unsupported chain version." };
  if (t.ops.length > t0)
    return {
      message: `Chain exceeds the maximum of ${t0} operations.`
    };
  for (const s of t.ops) {
    const i = qR(s, a);
    if (i) return i;
  }
  return null;
}
function qR(t, a) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return HR(t.id, t.start_ms, t.end_ms, a);
    case "normalize":
      return t.target_lufs < n0 || t.target_lufs > a0 ? {
        opId: t.id,
        message: `Normalize target must be between ${n0} and ${a0} LUFS.`
      } : null;
    case "speed":
      return t.factor < r0 || t.factor > s0 ? {
        opId: t.id,
        message: `Speed factor must be between ${r0}× and ${s0}×.`
      } : null;
    case "fade_in":
    case "fade_out":
      return t.duration_ms < 1 ? { opId: t.id, message: "Fade duration must be at least 1 ms." } : null;
    case "gain":
      return t.gain_db < i0 || t.gain_db > l0 ? {
        opId: t.id,
        message: `Volume must be between ${i0} and ${l0} dB.`
      } : null;
    case "eq3":
      for (const [s, i] of [
        ["low_db", t.low_db],
        ["mid_db", t.mid_db],
        ["high_db", t.high_db]
      ])
        if (i < o0 || i > c0)
          return {
            opId: t.id,
            message: `EQ ${s} must be between ${o0} and ${c0} dB.`
          };
      return null;
    case "pitch_shift":
      return t.semitones < u0 || t.semitones > d0 ? {
        opId: t.id,
        message: `Pitch must be between ${u0} and ${d0} semitones.`
      } : null;
    case "silence_strip":
      return t.threshold_db < f0 || t.threshold_db > h0 ? {
        opId: t.id,
        message: `Silence threshold must be between ${f0} and ${h0} dB.`
      } : null;
    default:
      return {
        message: "Unknown edit op mode in chain — refusing to apply."
      };
  }
}
function HR(t, a, s, i) {
  return a < 0 ? { opId: t, message: "Start must be ≥ 0 ms." } : s <= a ? { opId: t, message: "End must be greater than start." } : i > 0 && s > i ? { opId: t, message: "End extends past source duration." } : null;
}
async function Yc(t, a) {
  const s = await t.json().catch(() => null);
  return s?.error?.message ?? s?.message ?? `${a} failed: ${t.status}`;
}
var FR = "g5r6d10", PR = "g5r6d11", GR = "g5r6d12", YR = "g5r6d13", KR = "g5r6d14", XR = "g5r6d15", QR = "g5r6d1a", ZR = "g5r6d1b", JR = "g5r6d1c", WR = "g5r6d1d", e_ = "g5r6d1e", t_ = "g5r6d1g", n_ = "g5r6d1h", a_ = "g5r6d1i", r_ = "g5r6d1j", s_ = "g5r6d1k", i_ = "g5r6d1l", l_ = "g5r6d1m", o_ = "g5r6d1n", c_ = "g5r6d1o", m0 = "g5r6d1p", u_ = "g5r6d1q", d_ = "g5r6d1r", f_ = "g5r6d1s", h_ = "g5r6d1t", m_ = "g5r6d1u", p0 = "g5r6d1v", g0 = "g5r6d1w", p_ = "g5r6d1x", g_ = "g5r6d1y", br = "g5r6d1z", v_ = "g5r6d110", v0 = "g5r6d111", y_ = "g5r6d112", b_ = "g5r6d113", pr = "g5r6d114", x_ = "g5r6d119", S_ = "a6ki8u0", w_ = "a6ki8u1", j_ = "a6ki8u2", E_ = "a6ki8u3", N_ = "a6ki8u4", C_ = "a6ki8u5", T_ = "a6ki8u6", wf = "a6ki8u7", R_ = "a6ki8u8", __ = "a6ki8u9", M_ = "a6ki8ua", A_ = "a6ki8ub", k_ = "a6ki8uc", D_ = "a6ki8ud", z_ = "a6ki8ue", O_ = "a6ki8uf", L_ = "a6ki8ug", $_ = "a6ki8uh", U_ = "_1lguv7x0", B_ = "_1lguv7x1", I_ = "_1lguv7x2", V_ = "_1lguv7x3", q_ = "_1lguv7x4", y0 = "_1lguv7x5", H_ = "_1lguv7x6", F_ = "_1lguv7x7", P_ = "_1lguv7x8", G_ = "_1lguv7x9", Y_ = "_1lguv7xa", K_ = "_1lguv7xb", X_ = "_1lguv7xc", b0 = "_1lguv7xd", Q_ = "_1lguv7xe", Z_ = "_1lguv7xf", J_ = "_1lguv7xg", W_ = "_1lguv7xh", k1 = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, D1 = { xs: "_4ydn546", sm: "_4ydn547", md: "_4ydn548", lg: "_4ydn549" }, eM = { xs: "_4ydn54a", sm: "_4ydn54b", md: "_4ydn54c", lg: "_4ydn54d" }, tM = "_4ydn54f";
function Ze({
  variant: t = "primary",
  size: a = "md",
  type: s = "button",
  loading: i = !1,
  iconOnly: o = !1,
  disabled: u,
  children: f,
  className: m,
  style: y,
  ...p
}) {
  const b = [
    k1[t],
    D1[a],
    o ? eM[a] : null,
    m
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsxs(
    "button",
    {
      type: s,
      className: b,
      style: y,
      disabled: i || u,
      "aria-busy": i || void 0,
      ...p,
      children: [
        i ? /* @__PURE__ */ c.jsx("span", { className: tM, "aria-hidden": "true" }) : null,
        f
      ]
    }
  );
}
const nM = 28;
function aM(t) {
  if (!t) return 1;
  let a = 0;
  for (let s = 0; s < Math.min(t.length, 12); s++)
    a = a * 33 + t.charCodeAt(s) >>> 0;
  return a || 1;
}
function rM(t, a) {
  const s = new Array(a);
  let i = t;
  for (let o = 0; o < a; o++) {
    i = (i * 9301 + 49297) % 233280;
    const u = i / 233280, f = Math.min(1, o / 6, (a - o) / 6);
    s[o] = Math.max(0.18, f * (0.32 + u * 0.68));
  }
  return s;
}
function sM(t) {
  if (t == null) return "—";
  const a = Math.max(0, Math.round(t / 1e3)), s = Math.floor(a / 60), i = a % 60;
  return `${s}:${i.toString().padStart(2, "0")}`;
}
function iM(t) {
  return t ? `${(t / 1e3).toFixed(t % 1e3 === 0 ? 0 : 1)} kHz` : "—";
}
function lM({
  asset: t,
  presentation: a,
  usedBy: s,
  isPlaying: i,
  onTogglePlay: o,
  onRename: u,
  onCopyName: f,
  onDelete: m,
  onCreateCharacter: y,
  onPlaybackEnded: p
}) {
  const [b, v] = g.useState(!1), [S, w] = g.useState(t.displayName), [j, C] = g.useState(!1), [_, T] = g.useState(t.displayName), O = g.useRef(null), R = g.useRef(null), N = g.useMemo(() => aM(t.contentSha256), [t.contentSha256]), B = g.useMemo(() => rM(N, nM), [N]), G = g.useMemo(() => OT(t), [t]);
  g.useEffect(() => {
    w(t.displayName);
  }, [t.displayName]), g.useEffect(() => {
    const J = O.current;
    J && (i && G ? J.play().catch(() => {
    }) : (J.pause(), J.currentTime = 0));
  }, [i, G]);
  const te = async () => {
    const J = S.trim();
    if (!J || J === t.displayName) {
      v(!1), w(t.displayName);
      return;
    }
    try {
      await u(J);
    } finally {
      v(!1);
    }
  }, M = () => {
    T(t.displayName), C(!0);
  }, q = () => {
    const J = _.trim();
    if (!J) {
      R.current?.focus();
      return;
    }
    C(!1), y?.(J);
  }, D = () => {
    C(!1);
  }, F = () => {
    _.trim() ? q() : D();
  }, Z = `${sM(t.durationMs)} · ${iM(t.sampleRate)}`;
  return /* @__PURE__ */ c.jsxs("article", { className: U_, "data-playing": i ? "true" : "false", children: [
    /* @__PURE__ */ c.jsxs("header", { className: B_, children: [
      /* @__PURE__ */ c.jsx("span", { className: I_, "data-kind": a, "aria-hidden": "true", children: a === "upload" ? "▣" : "★" }),
      /* @__PURE__ */ c.jsxs("div", { className: V_, children: [
        b ? /* @__PURE__ */ c.jsx(
          "input",
          {
            className: y0,
            value: S,
            autoFocus: !0,
            onChange: (J) => w(J.target.value),
            onBlur: () => {
              te();
            },
            onKeyDown: (J) => {
              J.key === "Enter" ? (J.preventDefault(), J.currentTarget.blur()) : J.key === "Escape" && (v(!1), w(t.displayName));
            },
            "aria-label": `Rename ${t.displayName}`
          }
        ) : /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: q_,
            onDoubleClick: () => v(!0),
            title: "Double-click to rename",
            children: t.displayName
          }
        ),
        /* @__PURE__ */ c.jsx("span", { className: H_, children: Z })
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: F_, "data-kind": a, children: a === "upload" ? "UPLOADED" : "PRESET" })
    ] }),
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: P_,
        "data-playing": i ? "true" : "false",
        disabled: G == null,
        title: G ? "Preview" : "Preview unavailable",
        onClick: o,
        "aria-label": i ? "Pause preview" : "Play preview",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: G_, "aria-hidden": "true", children: i ? "❚❚" : "▶" }),
          /* @__PURE__ */ c.jsx("span", { className: Y_, "aria-hidden": "true", children: B.map((J, P) => /* @__PURE__ */ c.jsx("span", { className: K_, style: { height: `${Math.round(J * 100)}%` } }, P)) })
        ]
      }
    ),
    /* @__PURE__ */ c.jsx("footer", { className: X_, children: j ? /* @__PURE__ */ c.jsxs("span", { style: { display: "flex", alignItems: "center", gap: 6, width: "100%" }, children: [
      /* @__PURE__ */ c.jsx(
        "input",
        {
          ref: R,
          className: y0,
          style: { flex: 1, minWidth: 0 },
          value: _,
          autoFocus: !0,
          placeholder: "Character name",
          onChange: (J) => T(J.target.value),
          onFocus: (J) => J.currentTarget.select(),
          onBlur: F,
          onKeyDown: (J) => {
            J.key === "Enter" ? (J.preventDefault(), q()) : J.key === "Escape" && D();
          },
          "aria-label": "New character name"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Ze,
        {
          variant: "ghost",
          size: "xs",
          iconOnly: !0,
          title: "Add character",
          "aria-label": "Confirm add character",
          onMouseDown: (J) => J.preventDefault(),
          onClick: q,
          children: "✓"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Ze,
        {
          variant: "ghost",
          size: "xs",
          iconOnly: !0,
          title: "Cancel",
          "aria-label": "Cancel add character",
          onMouseDown: (J) => J.preventDefault(),
          onClick: D,
          children: "✕"
        }
      )
    ] }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      s.length > 0 ? /* @__PURE__ */ c.jsxs("span", { className: b0, children: [
        /* @__PURE__ */ c.jsx("span", { children: "used by" }),
        s.map((J) => /* @__PURE__ */ c.jsx(
          "span",
          {
            className: Q_,
            style: { color: J.color, borderColor: J.color },
            children: J.characterName
          },
          J.characterName
        ))
      ] }) : /* @__PURE__ */ c.jsx("span", { className: b0, children: "unassigned" }),
      /* @__PURE__ */ c.jsxs("span", { className: Z_, children: [
        y && /* @__PURE__ */ c.jsx(
          Ze,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            title: "Create character from this voice",
            "aria-label": "Create character from this voice",
            onClick: M,
            children: "＋"
          }
        ),
        /* @__PURE__ */ c.jsx(
          Ze,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            title: "Rename",
            "aria-label": "Rename voice",
            onClick: () => v(!0),
            children: "✎"
          }
        ),
        /* @__PURE__ */ c.jsx(
          Ze,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            title: "Copy name",
            "aria-label": "Copy voice name",
            onClick: f,
            children: "⧉"
          }
        ),
        m && /* @__PURE__ */ c.jsx(
          Ze,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            className: J_,
            title: "Delete",
            "aria-label": "Delete voice",
            onClick: m,
            children: "✕"
          }
        )
      ] })
    ] }) }),
    G && /* @__PURE__ */ c.jsx(
      "audio",
      {
        ref: O,
        src: G,
        preload: "none",
        className: W_,
        onEnded: p
      }
    )
  ] });
}
var oM = "_17eol302", cM = "_17eol303", uM = "_17eol304", dM = "_17eol305", fM = "_17eol306", hM = "_17eol307", Xo = "_17eol308", mM = "_17eol309", pM = "_17eol30a", gM = "_17eol30b", vM = "_17eol30c", yM = "_17eol30d", x0 = "_17eol30e", bM = "_17eol30g";
function xM() {
  if (typeof MediaRecorder > "u")
    return { mime: "audio/webm", ext: "webm" };
  const t = [
    { mime: "audio/webm;codecs=opus", ext: "webm" },
    { mime: "audio/webm", ext: "webm" },
    { mime: "audio/ogg;codecs=opus", ext: "ogg" },
    { mime: "audio/mp4", ext: "m4a" }
  ];
  for (const a of t)
    if (MediaRecorder.isTypeSupported(a.mime)) return a;
  return { mime: "", ext: "webm" };
}
function SM(t) {
  const a = Math.max(0, Math.floor(t / 1e3)), s = Math.floor(a / 60), i = a % 60;
  return `${s}:${i.toString().padStart(2, "0")}`;
}
function wM({
  open: t,
  defaultName: a,
  onClose: s,
  onSubmit: i
}) {
  const [o, u] = g.useState("idle"), [f, m] = g.useState(null), [y, p] = g.useState(0), [b, v] = g.useState(null), [S, w] = g.useState(a), [j, C] = g.useState(!1), _ = g.useRef(null), T = g.useRef(null), O = g.useRef([]), R = g.useRef(0), N = g.useRef(null), B = g.useRef(null), G = g.useRef({ mime: "audio/webm", ext: "webm" }), te = g.useRef(null), M = g.useRef(null), q = g.useRef(null);
  g.useEffect(() => {
    if (t)
      return q.current = document.activeElement ?? null, requestAnimationFrame(() => {
        te.current?.scrollIntoView({ behavior: "smooth", block: "center" }), M.current?.focus();
      }), () => {
        q.current?.focus?.();
      };
  }, [t]), g.useEffect(() => {
    if (!t) return;
    const V = ($) => {
      $.key === "Escape" && s();
    };
    return window.addEventListener("keydown", V), () => window.removeEventListener("keydown", V);
  }, [t, s]);
  const D = g.useCallback(
    (V) => {
      if (V.key !== "Tab") return;
      const $ = te.current;
      if (!$) return;
      const se = $.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (se.length === 0) return;
      const fe = se[0], k = se[se.length - 1], ne = document.activeElement;
      V.shiftKey ? (ne === fe || ne === $) && (V.preventDefault(), k.focus()) : ne === k && (V.preventDefault(), fe.focus());
    },
    []
  ), F = g.useCallback(() => {
    if (T.current) {
      for (const V of T.current.getTracks()) V.stop();
      T.current = null;
    }
    N.current != null && (window.clearInterval(N.current), N.current = null);
  }, []), Z = g.useCallback(() => {
    F(), b && URL.revokeObjectURL(b), v(null), O.current = [], B.current = null, p(0), m(null), u("idle");
  }, [b, F]);
  if (g.useEffect(() => {
    t || (Z(), w(a));
  }, [t, a, Z]), g.useEffect(() => () => {
    F(), b && URL.revokeObjectURL(b);
  }, [b, F]), !t) return null;
  const J = async () => {
    m(null), u("preparing");
    try {
      const V = await navigator.mediaDevices.getUserMedia({ audio: !0 });
      T.current = V;
      const $ = xM();
      G.current = $;
      const se = $.mime ? new MediaRecorder(V, { mimeType: $.mime }) : new MediaRecorder(V);
      _.current = se, O.current = [], se.ondataavailable = (fe) => {
        fe.data && fe.data.size > 0 && O.current.push(fe.data);
      }, se.onstop = () => {
        const fe = $.mime || "audio/webm", k = new Blob(O.current, { type: fe }), ne = new File([k], `${S || a || "recording"}.${$.ext}`, {
          type: fe
        });
        B.current = ne;
        const ae = URL.createObjectURL(k);
        v(ae), u("ready"), F();
      }, se.start(), R.current = Date.now(), p(0), N.current = window.setInterval(() => {
        p(Date.now() - R.current);
      }, 200), u("recording");
    } catch (V) {
      const $ = V instanceof Error ? V.message : "could not access microphone";
      m($), u($.toLowerCase().includes("denied") ? "denied" : "error"), F();
    }
  }, P = () => {
    const V = _.current;
    V && V.state !== "inactive" && V.stop(), N.current != null && (window.clearInterval(N.current), N.current = null);
  }, ie = async () => {
    const V = B.current;
    if (!V) return;
    const $ = (S || a).trim();
    if (!$) {
      m("Name cannot be empty");
      return;
    }
    C(!0);
    try {
      await i(V, $), s();
    } catch (se) {
      m(se instanceof Error ? se.message : "upload failed");
    } finally {
      C(!1);
    }
  }, A = o === "recording" ? "REC" : o === "ready" ? "OK" : o === "preparing" ? "..." : "MIC";
  return /* @__PURE__ */ c.jsx("div", { className: oM, role: "presentation", onClick: s, children: /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: te,
      className: cM,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "mic-recorder-heading",
      onClick: (V) => V.stopPropagation(),
      onKeyDown: D,
      tabIndex: -1,
      children: [
        /* @__PURE__ */ c.jsx("h2", { id: "mic-recorder-heading", className: uM, children: "Record reference audio" }),
        /* @__PURE__ */ c.jsx("p", { className: dM, children: "Speak the reference line into your microphone. 4–30 seconds is recommended for clean conditioning." }),
        /* @__PURE__ */ c.jsx(
          "span",
          {
            className: fM,
            "data-state": o === "recording" ? "recording" : o === "ready" ? "ready" : "idle",
            "aria-hidden": "true",
            children: A
          }
        ),
        /* @__PURE__ */ c.jsx("div", { className: vM, "aria-live": "polite", children: SM(y) }),
        /* @__PURE__ */ c.jsxs("div", { className: hM, children: [
          (o === "idle" || o === "denied" || o === "error") && /* @__PURE__ */ c.jsxs(
            "button",
            {
              ref: M,
              type: "button",
              className: Xo,
              "data-tone": "danger",
              onClick: () => {
                J();
              },
              children: [
                /* @__PURE__ */ c.jsx("span", { className: x0, "aria-hidden": "true" }),
                "Record"
              ]
            }
          ),
          o === "preparing" && /* @__PURE__ */ c.jsx("button", { type: "button", className: Xo, disabled: !0, children: "Starting…" }),
          o === "recording" && /* @__PURE__ */ c.jsxs(
            "button",
            {
              type: "button",
              className: Xo,
              "data-tone": "danger",
              "data-active": "true",
              onClick: P,
              children: [
                /* @__PURE__ */ c.jsx("span", { className: x0, "aria-hidden": "true" }),
                "Stop"
              ]
            }
          ),
          o === "ready" && /* @__PURE__ */ c.jsx(
            "button",
            {
              type: "button",
              className: Xo,
              onClick: () => {
                Z();
              },
              children: "↺ Re-record"
            }
          )
        ] }),
        b && /* @__PURE__ */ c.jsx("audio", { className: yM, src: b, controls: !0, preload: "auto" }),
        /* @__PURE__ */ c.jsxs("label", { className: mM, children: [
          /* @__PURE__ */ c.jsx("span", { children: "Voice name" }),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              className: pM,
              value: S,
              onChange: (V) => w(V.target.value),
              placeholder: a
            }
          )
        ] }),
        f && /* @__PURE__ */ c.jsx("div", { className: gM, children: f }),
        /* @__PURE__ */ c.jsxs("div", { className: bM, children: [
          /* @__PURE__ */ c.jsx(Ze, { variant: "ghost", size: "md", onClick: s, disabled: j, children: "Cancel" }),
          /* @__PURE__ */ c.jsx(
            Ze,
            {
              variant: "primary",
              size: "md",
              onClick: () => {
                ie();
              },
              disabled: o !== "ready" || j,
              loading: j,
              children: j ? "Saving…" : "Save voice"
            }
          )
        ] })
      ]
    }
  ) });
}
function jM({
  deploymentId: t,
  voiceAssets: a,
  mappings: s,
  characterColors: i,
  onVoiceAssetsChange: o,
  onCreateCharacterFromVoice: u
}) {
  const [f, m] = g.useState(""), [y, p] = g.useState("all"), [b, v] = g.useState(!1), [S, w] = g.useState(null), [j, C] = g.useState(!1), [_, T] = g.useState(!1), O = g.useRef(null), R = g.useCallback(
    (P) => "upload",
    []
  ), N = g.useMemo(() => {
    const P = f.trim().toLowerCase();
    return a.filter((ie) => {
      const A = R(ie);
      return !(y === "uploaded" && A !== "upload" || y === "preset" && A !== "preset" || P && !ie.displayName.toLowerCase().includes(P));
    });
  }, [a, f, y, R]), B = g.useMemo(
    () => a.filter((P) => R(P) === "upload").length,
    [a, R]
  ), G = g.useCallback(
    (P) => {
      const ie = [], A = /* @__PURE__ */ new Set();
      for (const V of s)
        V.speakerVoiceAssetId === P && (A.has(V.characterName) || (A.add(V.characterName), ie.push({
          characterName: V.characterName,
          // audit-allow: hex — neon decorative palette per design lang
          color: i[V.characterName] ?? "#ba9eff"
        })));
      return ie;
    },
    [s, i]
  ), te = g.useCallback(
    async (P) => {
      const ie = Array.from(P).slice(0, 8);
      if (ie.length !== 0) {
        T(!0);
        try {
          const A = [];
          for (const V of ie) {
            if (!V.type.startsWith("audio/") && !/\.(wav|mp3|flac|ogg|m4a|webm)$/i.test(V.name)) {
              mn.error(`${V.name}: not an audio file`);
              continue;
            }
            const $ = V.name.replace(/\.[^.]+$/, "");
            try {
              const se = await Tc(t, V, $, "speaker");
              A.push(se), mn.success(`Added ${se.displayName}`);
            } catch (se) {
              mn.error(se instanceof Error ? se.message : `${V.name}: upload failed`);
            }
          }
          A.length > 0 && o([...A, ...a]);
        } finally {
          T(!1);
        }
      }
    },
    [t, a, o]
  ), M = (P) => {
    P.preventDefault(), v(!1), P.dataTransfer?.files && te(P.dataTransfer.files);
  }, q = g.useCallback(async () => {
    const P = window.prompt("Paste an audio URL (https://…)");
    if (P)
      try {
        const ie = await fetch(P);
        if (!ie.ok) throw new Error(`fetch failed: ${ie.status}`);
        const A = await ie.blob(), V = P.split("/").pop()?.split("?")[0] ?? "voice.wav", $ = new File([A], V, { type: A.type || "audio/wav" });
        await te([$]);
      } catch (ie) {
        mn.error(ie instanceof Error ? ie.message : "could not fetch URL");
      }
  }, [te]), D = g.useCallback(
    async (P, ie) => {
      try {
        const A = await zT(t, P, ie);
        o(
          a.map((V) => V.voiceAssetId === P ? A : V)
        ), mn.success(`Renamed to ${A.displayName}`);
      } catch (A) {
        mn.error(A instanceof Error ? A.message : "rename failed");
      }
    },
    [t, a, o]
  ), F = g.useCallback((P) => {
    navigator.clipboard?.writeText ? (navigator.clipboard.writeText(P), mn.success("Copied name")) : mn.error("Clipboard unavailable");
  }, []), Z = g.useCallback(
    async (P) => {
      if (window.confirm(`Delete "${P.displayName}"? Mappings using it will reset.`))
        try {
          await DT(t, P.voiceAssetId), o(a.filter((A) => A.voiceAssetId !== P.voiceAssetId)), mn.success(`Deleted ${P.displayName}`);
        } catch (A) {
          mn.error(A instanceof Error ? A.message : "delete failed");
        }
    },
    [t, a, o]
  );
  return /* @__PURE__ */ c.jsxs("div", { className: S_, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: w_,
        "data-over": b ? "true" : "false",
        onDragOver: (P) => {
          P.preventDefault(), v(!0);
        },
        onDragLeave: () => v(!1),
        onDrop: M,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: j_, "aria-hidden": "true", children: "⇪" }),
          /* @__PURE__ */ c.jsxs("div", { className: E_, children: [
            /* @__PURE__ */ c.jsxs("div", { className: N_, children: [
              "Drop reference audio to add a voice",
              /* @__PURE__ */ c.jsx("span", { className: C_, children: ".wav · .mp3 · .flac · .ogg · 4–30s recommended" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: T_, children: [
              "or",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: wf,
                  onClick: () => O.current?.click(),
                  children: "browse files"
                }
              ),
              "·",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: wf,
                  onClick: () => {
                    q();
                  },
                  children: "paste URL"
                }
              ),
              "·",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: wf,
                  onClick: () => C(!0),
                  children: "record from mic"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ c.jsx(
            Ze,
            {
              variant: "primary",
              size: "md",
              disabled: _,
              onClick: () => O.current?.click(),
              children: "+ Upload"
            }
          ),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              ref: O,
              type: "file",
              accept: "audio/*,.wav,.mp3,.flac,.ogg,.m4a,.webm",
              multiple: !0,
              className: $_,
              onChange: (P) => {
                P.target.files && (te(P.target.files), P.target.value = "");
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: R_, children: [
      /* @__PURE__ */ c.jsxs("label", { className: __, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "⌕" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            className: M_,
            value: f,
            onChange: (P) => m(P.target.value),
            placeholder: "Search voices…",
            "aria-label": "Search voices"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: A_, role: "group", "aria-label": "Filter voices", children: [
        ["all", "All"],
        ["uploaded", "Uploaded"],
        ["preset", "Built-in"]
      ].map(([P, ie]) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: k_,
          "data-active": y === P ? "true" : "false",
          onClick: () => p(P),
          children: ie
        },
        P
      )) }),
      /* @__PURE__ */ c.jsxs("span", { className: O_, children: [
        /* @__PURE__ */ c.jsx("span", { className: L_, children: a.length }),
        " voices",
        /* @__PURE__ */ c.jsx("span", { children: "·" }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          B,
          " uploaded"
        ] })
      ] })
    ] }),
    N.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: z_, children: a.length === 0 ? "No voices yet. Drop audio above or record from your microphone." : "No voices match this filter." }) : /* @__PURE__ */ c.jsx("div", { className: D_, children: N.map((P) => {
      const ie = R(P);
      return /* @__PURE__ */ c.jsx(
        lM,
        {
          asset: P,
          presentation: ie,
          usedBy: G(P.voiceAssetId),
          isPlaying: S === P.voiceAssetId,
          onTogglePlay: () => w((A) => A === P.voiceAssetId ? null : P.voiceAssetId),
          onPlaybackEnded: () => w(null),
          onRename: (A) => D(P.voiceAssetId, A),
          onCopyName: () => F(P.displayName),
          onDelete: ie === "upload" ? () => void Z(P) : void 0,
          onCreateCharacter: u ? (A) => u(P, A) : void 0
        },
        P.voiceAssetId
      );
    }) }),
    /* @__PURE__ */ c.jsx(
      wM,
      {
        open: j,
        defaultName: `Take ${a.length + 1}`,
        onClose: () => C(!1),
        onSubmit: async (P, ie) => {
          await J(P, ie);
        }
      }
    )
  ] });
  async function J(P, ie) {
    T(!0);
    try {
      const A = await Tc(t, P, ie, "speaker");
      o([A, ...a]), mn.success(`Recorded ${A.displayName}`);
    } catch (A) {
      throw mn.error(A instanceof Error ? A.message : "upload failed"), A;
    } finally {
      T(!1);
    }
  }
}
async function EM(t) {
  return Mt(`/presets?deploymentId=${encodeURIComponent(t)}`);
}
async function NM(t, a, s) {
  return Mt("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: t, presetName: a, vector: s })
  });
}
async function CM(t, a) {
  await Mt(
    `/presets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
var S0 = "_190jlds0", TM = "_190jlds1", RM = "_190jlds2", _M = "_190jlds3", MM = "_190jlds4", AM = "_190jlds5", kM = "_190jlds6", DM = "_190jlds7", zM = "_190jlds8", OM = "_190jlds9", w0 = "_190jldsa", LM = "_190jldsb", j0 = "_190jldsc", $M = "_190jldsd", UM = "_190jldse", BM = "_190jldsf";
function IM({
  deploymentId: t,
  targets: a,
  onRevertToIdentity: s,
  onRevertToChain: i,
  emptyHint: o
}) {
  const [u, f] = g.useState(() => Bs(a[0])), [m, y] = g.useState([]), [p, b] = g.useState(!1), [v, S] = g.useState(null), [w, j] = g.useState(!1), [C, _] = g.useState(null), T = g.useMemo(
    () => a.find((N) => Bs(N) === u) ?? a[0],
    [a, u]
  );
  g.useEffect(() => {
    a.length && (a.some((N) => Bs(N) === u) || f(Bs(a[0])));
  }, [a, u]), g.useEffect(() => {
    if (!T) {
      y([]);
      return;
    }
    let N = !1;
    return b(!0), S(null), bc(t, T.kind, T.id, 50).then((B) => {
      N || y(B.entries);
    }).catch((B) => {
      N || S(B instanceof Error ? B.message : "audit fetch failed");
    }).finally(() => {
      N || b(!1);
    }), () => {
      N = !0;
    };
  }, [t, T]);
  const O = g.useCallback(() => {
    if (!T) return;
    const N = {
      deploymentId: t,
      targetKind: T.kind,
      targetId: T.id,
      targetLabel: T.label,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      entries: m
    }, B = new Blob([JSON.stringify(N, null, 2)], {
      type: "application/json"
    }), G = URL.createObjectURL(B), te = document.createElement("a");
    te.href = G, te.download = `audit-${T.kind}-${T.id}-${Date.now()}.json`, document.body.appendChild(te), te.click(), document.body.removeChild(te), URL.revokeObjectURL(G);
  }, [t, m, T]), R = g.useCallback(async () => {
    if (!(!T || !s) && window.confirm(
      `Revert "${T.label}" to identity (no edits)? This will write a new audit entry.`
    )) {
      j(!0);
      try {
        await s(T);
        const N = await bc(t, T.kind, T.id, 50);
        y(N.entries);
      } catch (N) {
        S(N instanceof Error ? N.message : "revert failed");
      } finally {
        j(!1);
      }
    }
  }, [t, s, T]);
  return a.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: S0, children: /* @__PURE__ */ c.jsx("p", { className: j0, children: o ?? "Audit history surfaces here once a script is parsed and at least one cast member is mapped." }) }) : /* @__PURE__ */ c.jsxs("div", { className: S0, children: [
    /* @__PURE__ */ c.jsxs("header", { className: TM, children: [
      /* @__PURE__ */ c.jsxs("div", { className: RM, children: [
        /* @__PURE__ */ c.jsx("label", { htmlFor: "audit-target-select", className: w0, children: "Target" }),
        /* @__PURE__ */ c.jsx(
          "select",
          {
            id: "audit-target-select",
            className: _M,
            value: u,
            onChange: (N) => f(N.target.value),
            children: a.map((N) => /* @__PURE__ */ c.jsxs("option", { value: Bs(N), children: [
              N.kind === "voice_asset" ? "Voice asset" : "Utterance",
              " · ",
              N.label
            ] }, Bs(N)))
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: MM, children: [
        /* @__PURE__ */ c.jsx(
          Ze,
          {
            variant: "ghost",
            size: "sm",
            onClick: O,
            disabled: m.length === 0 || p,
            children: "Export JSON"
          }
        ),
        s && /* @__PURE__ */ c.jsx(
          Ze,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => void R(),
            disabled: w || !T,
            children: w ? "Reverting…" : "Revert to identity"
          }
        )
      ] })
    ] }),
    v && /* @__PURE__ */ c.jsx("div", { className: UM, children: v }),
    p && !v && /* @__PURE__ */ c.jsx("div", { className: BM, "aria-live": "polite", children: "Loading edit history…" }),
    !p && !v && m.length === 0 && /* @__PURE__ */ c.jsxs("p", { className: j0, children: [
      "No edits recorded for this target yet.",
      /* @__PURE__ */ c.jsx("br", {}),
      /* @__PURE__ */ c.jsx("span", { className: $M, children: "Apply a chain in the editor to populate the history." })
    ] }),
    !p && !v && m.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: AM, children: m.map((N) => {
      const B = i && T && !!N.chain_snapshot_json && N.operation_count > 0;
      return /* @__PURE__ */ c.jsxs("li", { className: kM, children: [
        /* @__PURE__ */ c.jsx("span", { className: DM, children: VM(N.recorded_at) }),
        /* @__PURE__ */ c.jsx("span", { className: zM, children: N.operation_count === 0 ? "cleared" : `${N.operation_count} ops` }),
        /* @__PURE__ */ c.jsxs("span", { className: OM, title: N.digest_after, children: [
          N.digest_after.slice(0, 12),
          "…"
        ] }),
        /* @__PURE__ */ c.jsx("span", { className: w0, children: N.actor || "—" }),
        /* @__PURE__ */ c.jsx(
          "span",
          {
            className: LM,
            style: {
              background: `color-mix(in oklab, ${N.operation_count === 0 ? "var(--error)" : "var(--accent)"} 14%, transparent)`,
              color: N.operation_count === 0 ? "var(--error)" : "var(--accent)"
            },
            children: N.digest_before === "" || !N.digest_before ? "create" : N.operation_count === 0 ? "clear" : "update"
          }
        ),
        B && /* @__PURE__ */ c.jsx(
          Ze,
          {
            variant: "ghost",
            size: "xs",
            disabled: w || C !== null,
            onClick: async () => {
              if (!(!T || !N.chain_snapshot_json) && !(C !== null || w) && window.confirm(
                `Replay this ${N.operation_count}-op chain on "${T.label}"? A new audit entry will be written.`
              )) {
                _(N.entry_id);
                try {
                  await i(T, N.chain_snapshot_json, N);
                  const G = await bc(
                    t,
                    T.kind,
                    T.id,
                    50
                  );
                  y(G.entries);
                } catch (G) {
                  S(G instanceof Error ? G.message : "revert failed");
                } finally {
                  _(null);
                }
              }
            },
            children: C === N.entry_id ? "Reverting…" : "Revert →"
          }
        )
      ] }, N.entry_id);
    }) })
  ] });
}
function Bs(t) {
  return t ? `${t.kind}:${t.id}` : "";
}
function VM(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var qM = "_1uzgubz0", HM = "_1uzgubz1", FM = "_1uzgubz2", PM = "_1uzgubz3", GM = "_1uzgubz4", YM = "_1uzgubz5", KM = "_1uzgubz6", XM = "_1uzgubz7", E0 = "_1uzgubz8", QM = "_1uzgubz9", z1 = "_1uzgubza", O1 = "_1uzgubzb", ZM = "_1uzgubzc", JM = "_1uzgubzd", Qo = "_1uzgubze", Zo = "_1uzgubzf", WM = "_1uzgubzg", e2 = "_1uzgubzh", N0 = "_1uzgubzi", C0 = "_1uzgubzj", T0 = "_1uzgubzk", R0 = "_1uzgubzl", _0 = "_1uzgubzm", t2 = "_1uzgubzn", n2 = "_1uzgubzo", a2 = "_1uzgubzp", r2 = "_1uzgubzq";
function s2({
  characterName: t,
  color: a,
  lineCount: s,
  mapping: i,
  voiceAssets: o,
  presets: u,
  active: f,
  onToggle: m,
  onAssignVoiceAsset: y,
  onAssignPreset: p,
  onUploadFile: b,
  onClearMapping: v,
  onRename: S
}) {
  const [w, j] = g.useState(!1), C = i ? o.find((R) => R.voiceAssetId === i.speakerVoiceAssetId) : null, _ = i?.defaultVectorPresetId ? u.find((R) => R.presetId === i.defaultVectorPresetId) ?? null : null, T = (t[0] ?? "?").toUpperCase(), O = i !== null;
  return /* @__PURE__ */ c.jsxs("div", { className: `${qM}${f ? ` ${HM}` : ""}`, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: FM,
        onClick: m,
        "aria-expanded": f,
        children: [
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: PM,
              style: {
                background: `color-mix(in oklab, ${a} 22%, transparent)`,
                color: a
              },
              children: T
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: GM, children: [
            /* @__PURE__ */ c.jsx("span", { className: YM, style: { color: a }, children: t }),
            /* @__PURE__ */ c.jsxs("span", { className: KM, children: [
              s,
              " lines"
            ] })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: XM, children: [
            C ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              /* @__PURE__ */ c.jsx("span", { className: E0, children: C.displayName }),
              C.durationMs != null && /* @__PURE__ */ c.jsxs("span", { children: [
                M0(C.durationMs),
                " ·",
                " ",
                C.sampleRate ? `${C.sampleRate} Hz` : "—"
              ] })
            ] }) : _ ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              /* @__PURE__ */ c.jsx("span", { className: E0, children: _.presetName }),
              /* @__PURE__ */ c.jsx("span", { children: "preset" })
            ] }) : /* @__PURE__ */ c.jsx("span", { children: "no voice assigned" }),
            i?.voiceAssetChainDigest && /* @__PURE__ */ c.jsxs("span", { className: ZM, children: [
              "chain · ",
              i.voiceAssetChainDigest.slice(0, 8)
            ] })
          ] }),
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: `${QM} ${O ? z1 : O1}`,
              children: O ? "Mapped" : "Unmapped"
            }
          )
        ]
      }
    ),
    f && /* @__PURE__ */ c.jsxs("div", { className: JM, children: [
      O && s === 0 && S && /* @__PURE__ */ c.jsxs("div", { className: Qo, children: [
        /* @__PURE__ */ c.jsx("span", { className: Zo, children: "Character name" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            defaultValue: t,
            placeholder: "Character name",
            "aria-label": "Rename character",
            style: {
              flex: 1,
              minWidth: 0,
              background: "var(--surface-floor, #0c0e10)",
              border: "1px solid rgba(70,72,74,0.4)",
              borderRadius: 8,
              color: "var(--on-surface)",
              padding: "6px 10px",
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              outline: "none"
            },
            onKeyDown: (R) => {
              R.key === "Enter" && (R.preventDefault(), R.currentTarget.blur());
            },
            onBlur: (R) => {
              const N = R.target.value.trim();
              N && N !== t && S(N);
            }
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: Qo, children: [
        /* @__PURE__ */ c.jsx("span", { className: Zo, children: "Drop new audio" }),
        /* @__PURE__ */ c.jsxs(
          "label",
          {
            className: `${WM}${w ? ` ${e2}` : ""}`,
            onDragEnter: (R) => {
              R.preventDefault(), j(!0);
            },
            onDragOver: (R) => R.preventDefault(),
            onDragLeave: () => j(!1),
            onDrop: (R) => {
              R.preventDefault(), j(!1);
              const N = R.dataTransfer.files?.[0];
              N && b && b(N);
            },
            children: [
              /* @__PURE__ */ c.jsx("span", { children: "Drop a WAV / MP3 / FLAC here, or click to browse" }),
              /* @__PURE__ */ c.jsx(
                "input",
                {
                  type: "file",
                  accept: "audio/*",
                  style: { display: "none" },
                  onChange: (R) => {
                    const N = R.target.files?.[0];
                    N && b && b(N);
                  }
                }
              )
            ]
          }
        )
      ] }),
      o.length > 0 && /* @__PURE__ */ c.jsxs("div", { className: Qo, children: [
        /* @__PURE__ */ c.jsx("span", { className: Zo, children: "Reference library" }),
        /* @__PURE__ */ c.jsx("div", { className: N0, children: o.map((R) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: `${C0}${i?.speakerVoiceAssetId === R.voiceAssetId ? ` ${T0}` : ""}`,
            onClick: () => y(R.voiceAssetId),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: R0, children: R.displayName }),
              /* @__PURE__ */ c.jsxs("span", { className: _0, children: [
                R.durationMs != null ? M0(R.durationMs) : "—",
                " ",
                "·",
                " ",
                R.sampleRate ? `${R.sampleRate} Hz` : "—"
              ] })
            ]
          },
          R.voiceAssetId
        )) })
      ] }),
      u.length > 0 && p && /* @__PURE__ */ c.jsxs("div", { className: Qo, children: [
        /* @__PURE__ */ c.jsx("span", { className: Zo, children: "Preset voices" }),
        /* @__PURE__ */ c.jsx("div", { className: N0, children: u.map((R) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: `${C0}${i?.defaultVectorPresetId === R.presetId ? ` ${T0}` : ""}`,
            onClick: () => p(R.presetId),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: R0, children: R.presetName }),
              /* @__PURE__ */ c.jsx("span", { className: _0, children: "preset · vector" })
            ]
          },
          R.presetId
        )) })
      ] }),
      O && v && /* @__PURE__ */ c.jsx(Ze, { variant: "ghost", size: "sm", onClick: v, children: "Clear mapping →" })
    ] })
  ] });
}
function M0(t) {
  if (!Number.isFinite(t) || t < 0) return "0:00";
  const a = Math.round(t / 1e3), s = Math.floor(a / 60), i = a % 60;
  return `${s}:${i.toString().padStart(2, "0")}`;
}
function i2({
  unmappedCount: t,
  totalCount: a,
  children: s,
  emptyHint: i
}) {
  if (a === 0)
    return /* @__PURE__ */ c.jsx("p", { className: r2, children: i ?? "Add at least one tagged dialogue line to populate the cast." });
  const o = t === 0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx("header", { className: t2, children: /* @__PURE__ */ c.jsx(
      "span",
      {
        className: `${n2} ${o ? z1 : O1}`,
        children: o ? `All ${a} mapped` : `${t} of ${a} unmapped`
      }
    ) }),
    /* @__PURE__ */ c.jsx("ul", { className: a2, children: s })
  ] });
}
async function yl() {
  return Mt("/runtime/health");
}
async function l2(t, a) {
  const s = {};
  t != null && (s.numWorkers = t), a != null && (s.warmup = a), await Mt("/runtime/start", {
    method: "POST",
    ...Object.keys(s).length > 0 ? { body: JSON.stringify(s) } : {}
  });
}
async function o2() {
  return Mt("/runtime/stop", { method: "POST" });
}
function L1(t) {
  switch (t) {
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
//! Desired concurrent-worker count for the next runtime start.
//!
let $1 = 1;
function c2() {
  return $1;
}
function A0(t) {
  $1 = Number.isFinite(t) ? Math.max(1, Math.floor(t)) : 1;
}
//! Whether the next runtime start should warm (preload models on) all active
//! workers. Default on; the header's "Preload models on start" toggle and the
let U1 = !0;
function B1() {
  return U1;
}
function u2(t) {
  U1 = t;
}
var d2 = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function kn({
  severity: t,
  children: a,
  role: s,
  ariaLive: i,
  className: o,
  style: u
}) {
  const f = [d2[t], o].filter(Boolean).join(" "), m = s ?? (t === "error" ? "alert" : "status"), y = i ?? (t === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ c.jsx("div", { className: f, role: m, "aria-live": y, style: u, children: a });
}
var I1 = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, V1 = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, f2 = "_13bb4njb";
function Er({
  tone: t,
  size: a = "sm",
  pulse: s = !1,
  children: i,
  className: o,
  style: u,
  title: f
}) {
  const m = s && t !== "faint", y = [I1[a], V1[t], m ? f2 : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("span", { className: y, style: u, title: f, children: i });
}
const h2 = 4e3;
function m2({ deployment: t }) {
  const [a, s] = g.useState(null), [i, o] = g.useState(null), [u, f] = g.useState(1), m = g.useState({ done: !1 })[0], [y, p] = g.useState(B1());
  g.useEffect(() => {
    let T = !1;
    const O = async () => {
      try {
        const N = await yl();
        T || (s(N), o(null));
      } catch (N) {
        T || o(w2(N));
      }
    };
    O();
    const R = setInterval(O, h2);
    return () => {
      T = !0, clearInterval(R);
    };
  }, []), g.useEffect(() => {
    const T = a?.workersActive;
    T != null && !m.done && (m.done = !0, f(T), A0(T));
  }, [a?.workersActive, m]);
  const b = a?.badge ?? "not_installed", v = i?.includes("model_missing") ?? !1, S = a?.workersCeiling ?? 1, w = a?.workersActive ?? 1, j = b === "ready" || b === "running" || b === "starting", C = a?.workersWarming ?? 0, _ = a?.workersWarm ?? 0;
  return /* @__PURE__ */ c.jsxs("output", { className: v_, "aria-live": "polite", children: [
    /* @__PURE__ */ c.jsx("span", { className: br, children: "Runtime" }),
    /* @__PURE__ */ c.jsx("span", { children: t.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ c.jsx("span", { className: br, children: "Badge" }),
    /* @__PURE__ */ c.jsx(Er, { tone: x2(b), pulse: b === "starting" || b === "installing", children: L1(b) }),
    C > 0 && /* @__PURE__ */ c.jsxs("span", { style: b2, children: [
      "Warming ",
      _,
      "/",
      w,
      "…"
    ] }),
    a && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("span", { className: br, children: "Uptime" }),
      /* @__PURE__ */ c.jsx("span", { children: S2(a.uptimeSeconds) }),
      /* @__PURE__ */ c.jsx("span", { className: br, children: "VRAM" }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        a.vramUsedMb,
        " / ",
        a.vramTotalMb,
        " MB"
      ] })
    ] }),
    S > 1 && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("span", { className: br, children: "Workers" }),
      /* @__PURE__ */ c.jsxs("span", { style: p2, children: [
        /* @__PURE__ */ c.jsx(
          "select",
          {
            value: u,
            "aria-label": "Concurrent workers for the next runtime start",
            onChange: (T) => {
              const O = Number(T.target.value);
              f(O), A0(O);
            },
            style: g2,
            children: Array.from({ length: S }, (T, O) => O + 1).map((T) => /* @__PURE__ */ c.jsx("option", { value: T, children: T }, T))
          }
        ),
        /* @__PURE__ */ c.jsx("span", { style: k0, children: j && u !== w ? `restart to apply · active ${w}` : `~${u}× model VRAM` })
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: br, children: "Preload" }),
      /* @__PURE__ */ c.jsxs("label", { style: v2, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: y,
            "aria-label": "Preload models on start",
            onChange: (T) => {
              const O = T.target.checked;
              p(O), u2(O);
            },
            style: y2
          }
        ),
        /* @__PURE__ */ c.jsx("span", { style: k0, children: "Preload models on start" })
      ] })
    ] }),
    v && /* @__PURE__ */ c.jsxs(kn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("strong", { children: "IndexTTS-2 model is not installed." }),
      " ",
      "Open ",
      /* @__PURE__ */ c.jsx("em", { children: "Settings → Dependencies → Install all" }),
      " to download the required artifacts, then retry."
    ] }),
    i && !v && /* @__PURE__ */ c.jsx(kn, { severity: "error", children: i })
  ] });
}
const p2 = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8
}, g2 = {
  height: 24,
  padding: "0 6px",
  background: "var(--surface-floor, #0c0e10)",
  border: "1px solid rgba(70,72,74,0.4)",
  borderRadius: 6,
  color: "var(--on-surface)",
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  outline: "none",
  cursor: "pointer"
}, k0 = {
  fontSize: 11,
  color: "var(--on-surface-variant, #c4c7c5)"
}, v2 = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  cursor: "pointer"
}, y2 = {
  width: 14,
  height: 14,
  margin: 0,
  cursor: "pointer",
  accentColor: "var(--accent, #ba9eff)"
}, b2 = {
  fontSize: 11,
  color: "var(--on-surface-variant, #c4c7c5)",
  fontFamily: "var(--font-mono)"
};
function x2(t) {
  switch (t) {
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
function S2(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${t % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function w2(t) {
  return t instanceof ai || t instanceof Error ? t.message : "unknown error";
}
const Rc = {
  flat: { low: 0, mid: 0, high: 0 },
  warm: { low: 3, mid: 0, high: -2 },
  bright: { low: -1, mid: 0, high: 4 },
  voice: { low: -2, mid: 3, high: 2 },
  telephone: { low: -8, mid: 6, high: -8 }
}, Kc = {
  volumeDb: 0,
  eq3: { low: 0, mid: 0, high: 0, preset: "flat" },
  speed: { mode: "audio", value: 1 },
  pitchSt: 0,
  normalize: { mode: "off", targetDbOrLufs: -16 },
  fade: { inS: 0, outS: 0, inCurve: "equal_power", outCurve: "equal_power" },
  silence: { enabled: !1, thresholdDb: -45 }
}, Va = 1e-3;
function j2(t, a, s) {
  for (const i of Object.keys(Rc)) {
    const o = Rc[i];
    if (Math.abs(o.low - t) < Va && Math.abs(o.mid - a) < Va && Math.abs(o.high - s) < Va)
      return i;
  }
  return "custom";
}
function E2(t) {
  let a = C2();
  for (const s of t.ops)
    a = N2(a, s);
  return a;
}
function N2(t, a) {
  switch (a.mode) {
    case "gain":
      return { ...t, volumeDb: a.gain_db };
    case "eq3":
      return {
        ...t,
        eq3: {
          low: a.low_db,
          mid: a.mid_db,
          high: a.high_db,
          preset: j2(a.low_db, a.mid_db, a.high_db)
        }
      };
    case "speed":
      return { ...t, speed: { mode: "audio", value: a.factor } };
    case "pitch_shift":
      return { ...t, pitchSt: a.semitones };
    case "normalize":
      return {
        ...t,
        normalize: { mode: "loudness", targetDbOrLufs: a.target_lufs }
      };
    case "fade_in":
      return {
        ...t,
        fade: { ...t.fade, inS: a.duration_ms / 1e3 }
      };
    case "fade_out":
      return {
        ...t,
        fade: { ...t.fade, outS: a.duration_ms / 1e3 }
      };
    case "silence_strip":
      return {
        ...t,
        silence: { enabled: !0, thresholdDb: a.threshold_db }
      };
    default:
      return t;
  }
}
function C2() {
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
function Tr(t, a) {
  return t.ops.filter((s) => s.mode !== a);
}
function Rr(t, a) {
  return [...t, a];
}
function T2(t, a) {
  const s = Tr(t, "gain");
  if (Math.abs(a) < Va) return { ...t, ops: s };
  const i = { id: Dn(), mode: "gain", gain_db: a };
  return { ...t, ops: Rr(s, i) };
}
function R2(t, a, s, i) {
  const o = Tr(t, "eq3");
  if (Math.abs(a) < Va && Math.abs(s) < Va && Math.abs(i) < Va)
    return { ...t, ops: o };
  const u = {
    id: Dn(),
    mode: "eq3",
    low_db: a,
    mid_db: s,
    high_db: i
  };
  return { ...t, ops: Rr(o, u) };
}
function _2(t, a) {
  const s = Tr(t, "speed");
  if (Math.abs(a - 1) < Va) return { ...t, ops: s };
  const i = { id: Dn(), mode: "speed", factor: a };
  return { ...t, ops: Rr(s, i) };
}
function M2(t, a) {
  const s = Tr(t, "pitch_shift");
  if (Math.abs(a) < Va) return { ...t, ops: s };
  const i = {
    id: Dn(),
    mode: "pitch_shift",
    semitones: a
  };
  return { ...t, ops: Rr(s, i) };
}
function A2(t, a, s) {
  const i = Tr(t, "normalize");
  if (a === "off") return { ...t, ops: i };
  const o = {
    id: Dn(),
    mode: "normalize",
    target_lufs: s
  };
  return { ...t, ops: Rr(i, o) };
}
function k2(t, a) {
  const s = Tr(t, "fade_in");
  if (a <= 0) return { ...t, ops: s };
  const i = {
    id: Dn(),
    mode: "fade_in",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Rr(s, i) };
}
function D2(t, a) {
  const s = Tr(t, "fade_out");
  if (a <= 0) return { ...t, ops: s };
  const i = {
    id: Dn(),
    mode: "fade_out",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Rr(s, i) };
}
function z2(t, a, s) {
  const i = Tr(t, "silence_strip");
  if (!a) return { ...t, ops: i };
  const o = {
    id: Dn(),
    mode: "silence_strip",
    threshold_db: s
  };
  return { ...t, ops: Rr(i, o) };
}
const q1 = /* @__PURE__ */ new Set([
  "gain",
  "eq3",
  "speed",
  "pitch_shift",
  "normalize",
  "fade_in",
  "fade_out",
  "silence_strip"
]);
function H1(t, a) {
  const s = {
    ...t,
    ops: t.ops.filter((u) => !q1.has(u.mode))
  };
  let o = T2({ version: 1, ops: [] }, a.volumeDb);
  return o = R2(
    o,
    a.eq3.low,
    a.eq3.mid,
    a.eq3.high
  ), a.speed.mode === "audio" && (o = _2(o, a.speed.value)), o = M2(o, a.pitchSt), o = A2(
    o,
    a.normalize.mode === "off" ? "off" : "loudness",
    a.normalize.targetDbOrLufs
  ), o = k2(o, a.fade.inS), o = D2(o, a.fade.outS), o = z2(
    o,
    a.silence.enabled,
    a.silence.thresholdDb
  ), { ...s, ops: [...s.ops, ...o.ops] };
}
function F1(t) {
  const a = {
    ...t,
    ops: t.ops.filter((s) => q1.has(s.mode))
  };
  return E2(a);
}
var O2 = "_1rsa80i0", L2 = "_1rsa80i1", $2 = "_1rsa80i2", U2 = "_1rsa80i3", B2 = "_1rsa80i4", I2 = "_1rsa80i5", V2 = "_1rsa80i6", q2 = "_1rsa80i7", H2 = "_1rsa80i8", F2 = "_1rsa80i9";
const P1 = ["flat", "warm", "bright", "voice", "telephone"], tl = -12, Jo = 12, P2 = 0.5;
function G2(t) {
  const { low: a, mid: s, high: i, preset: o, onChange: u, disabled: f } = t, m = (p) => {
    const b = Rc[p];
    u(b.low, b.mid, b.high, p);
  }, y = (p, b) => {
    const v = { low: a, mid: s, high: i, [p]: b }, S = K2(v.low, v.mid, v.high);
    u(v.low, v.mid, v.high, S);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: O2, children: [
    /* @__PURE__ */ c.jsxs("div", { className: L2, role: "group", "aria-label": "EQ presets", children: [
      P1.map((p) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: $2,
          "data-active": o === p,
          onClick: () => m(p),
          disabled: f,
          children: p
        },
        p
      )),
      o === "custom" ? /* @__PURE__ */ c.jsx("span", { className: U2, children: "custom" }) : null
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: B2, children: [
      /* @__PURE__ */ c.jsx(
        jf,
        {
          label: "Low",
          value: a,
          onChange: (p) => y("low", p),
          disabled: f
        }
      ),
      /* @__PURE__ */ c.jsx(
        jf,
        {
          label: "Mid",
          value: s,
          onChange: (p) => y("mid", p),
          disabled: f
        }
      ),
      /* @__PURE__ */ c.jsx(
        jf,
        {
          label: "High",
          value: i,
          onChange: (p) => y("high", p),
          disabled: f
        }
      )
    ] })
  ] });
}
function jf({ label: t, value: a, onChange: s, disabled: i }) {
  const o = (a - tl) / (Jo - tl) * 100, u = g.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: I2, children: [
    /* @__PURE__ */ c.jsx("label", { htmlFor: u, className: V2, children: t }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: u,
        type: "range",
        min: tl,
        max: Jo,
        step: P2,
        value: a,
        disabled: i,
        className: H2,
        style: { "--fill": `${o}%` },
        onChange: (f) => s(Number(f.target.value)),
        "aria-valuemin": tl,
        "aria-valuemax": Jo,
        "aria-valuenow": a
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: q2, children: Y2(a) }),
    /* @__PURE__ */ c.jsxs("span", { className: F2, "aria-hidden": "true", children: [
      /* @__PURE__ */ c.jsx("span", { children: tl }),
      /* @__PURE__ */ c.jsx("span", { children: "0" }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        "+",
        Jo
      ] })
    ] })
  ] });
}
function Y2(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
const Ef = 1e-3;
function K2(t, a, s) {
  for (const i of P1) {
    const o = Rc[i];
    if (Math.abs(o.low - t) < Ef && Math.abs(o.mid - a) < Ef && Math.abs(o.high - s) < Ef)
      return i;
  }
  return "custom";
}
var X2 = "_85bhwb0", Q2 = "_85bhwb1", D0 = "_85bhwb2", Z2 = "_85bhwb3", J2 = "_85bhwb4", W2 = "_85bhwb5", eA = "_85bhwb6", tA = "_85bhwb7";
const Wo = 0.5, Nf = 2, nA = 0.05;
function aA(t) {
  const { mode: a, value: s, supportsSynthSpeed: i, onChange: o, onReRenderAtSynthTime: u, disabled: f } = t, m = (s - Wo) / (Nf - Wo) * 100, y = g.useId(), p = (v) => o(v, s), b = (v) => o(a, v);
  return /* @__PURE__ */ c.jsxs("div", { className: X2, children: [
    i ? /* @__PURE__ */ c.jsxs("div", { className: Q2, role: "group", "aria-label": "Speed mode", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: D0,
          "data-active": a === "audio",
          onClick: () => p("audio"),
          disabled: f,
          children: "Audio"
        }
      ),
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: D0,
          "data-active": a === "synth",
          onClick: () => p("synth"),
          disabled: f,
          children: "Synth"
        }
      )
    ] }) : null,
    /* @__PURE__ */ c.jsxs("div", { className: Z2, children: [
      /* @__PURE__ */ c.jsx(
        "input",
        {
          id: y,
          type: "range",
          min: Wo,
          max: Nf,
          step: nA,
          value: s,
          disabled: f,
          className: J2,
          style: { "--fill": `${m}%` },
          onChange: (v) => b(Number(v.target.value)),
          "aria-valuemin": Wo,
          "aria-valuemax": Nf,
          "aria-valuenow": s,
          "aria-label": "Speed factor"
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: W2, children: `${s.toFixed(2)}×` })
    ] }),
    a === "synth" && i ? /* @__PURE__ */ c.jsxs("div", { className: eA, children: [
      /* @__PURE__ */ c.jsx(
        Ze,
        {
          variant: "primary",
          size: "sm",
          onClick: u,
          disabled: f || !u,
          children: "Re-render at synth-time"
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: tA, children: "Synth-time speed re-runs the worker for new utterances." })
    ] }) : null
  ] });
}
var rA = "kgszk50", sA = "kgszk51", z0 = "kgszk52", iA = "kgszk53", lA = "kgszk54", G1 = "kgszk55", oA = "kgszk56", cA = "kgszk58", em = "kgszk59", Y1 = "kgszk5a", tm = "kgszk5b", uA = "kgszk5c", dA = "kgszk5d", fA = "kgszk5e", O0 = "kgszk5f", L0 = "kgszk5g", $0 = "kgszk5h", hA = "kgszk5i", mA = "kgszk5j", pA = "kgszk5l", bl = "kgszk5m", xl = "kgszk5n";
const gA = -24, vA = 24, yA = 0.5, bA = -12, xA = 12, SA = 0.5, wA = -30, jA = -6, EA = -12, NA = 0, ec = -60, Cf = -20;
function nm(t) {
  const {
    state: a,
    onChange: s,
    supportsSynthSpeed: i,
    onReRenderAtSynthTime: o,
    onSliderFlush: u,
    pendingExecution: f = !1,
    disabled: m = !1,
    onApply: y,
    applyLabel: p = "Apply edit"
  } = t, b = (w) => {
    s({ ...a, ...w });
  }, v = _A(a), S = (w) => {
    const j = w.target;
    j && (j.tagName === "INPUT" || j.tagName === "BUTTON" || j.closest("input, button")) && u?.();
  };
  return /* @__PURE__ */ c.jsxs("div", { className: rA, onPointerDownCapture: S, children: [
    /* @__PURE__ */ c.jsxs("div", { className: sA, children: [
      v.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: iA, children: "No active edits" }) : /* @__PURE__ */ c.jsxs("span", { className: z0, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "Active:" }),
        /* @__PURE__ */ c.jsx("span", { children: v.join(" · ") })
      ] }),
      f ? /* @__PURE__ */ c.jsxs("span", { className: z0, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: lA, "aria-hidden": "true" }),
        "Re-rendering"
      ] }) : null
    ] }),
    /* @__PURE__ */ c.jsx(
      U0,
      {
        label: "Volume",
        sub: "Pre-mix gain in dB",
        min: gA,
        max: vA,
        step: yA,
        format: MA,
        value: a.volumeDb,
        onChange: (w) => b({ volumeDb: w }),
        disabled: m
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: bl, children: [
      /* @__PURE__ */ c.jsx("span", { className: xl, children: "3-band EQ" }),
      /* @__PURE__ */ c.jsx(
        G2,
        {
          low: a.eq3.low,
          mid: a.eq3.mid,
          high: a.eq3.high,
          preset: a.eq3.preset,
          disabled: m,
          onChange: (w, j, C, _) => b({ eq3: { low: w, mid: j, high: C, preset: _ } })
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: bl, children: [
      /* @__PURE__ */ c.jsx("span", { className: xl, children: "Speed" }),
      /* @__PURE__ */ c.jsx(
        aA,
        {
          mode: a.speed.mode,
          value: a.speed.value,
          supportsSynthSpeed: i,
          ...o ? { onReRenderAtSynthTime: o } : {},
          disabled: m,
          onChange: (w, j) => b({ speed: { mode: w, value: j } })
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx(
      U0,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: bA,
        max: xA,
        step: SA,
        format: AA,
        value: a.pitchSt,
        onChange: (w) => b({ pitchSt: w }),
        disabled: m
      }
    ),
    /* @__PURE__ */ c.jsx(
      CA,
      {
        normalize: a.normalize,
        disabled: m,
        onChange: (w) => b({ normalize: w })
      }
    ),
    /* @__PURE__ */ c.jsx(
      TA,
      {
        inS: a.fade.inS,
        outS: a.fade.outS,
        disabled: m,
        onChange: (w, j) => b({ fade: { ...a.fade, inS: w, outS: j } })
      }
    ),
    /* @__PURE__ */ c.jsx(
      RA,
      {
        enabled: a.silence.enabled,
        thresholdDb: a.silence.thresholdDb,
        disabled: m,
        onChange: (w, j) => b({ silence: { enabled: w, thresholdDb: j } })
      }
    ),
    y ? /* @__PURE__ */ c.jsxs("div", { className: pA, children: [
      /* @__PURE__ */ c.jsx(
        Ze,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => s(Kc),
          disabled: m,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ c.jsx(Ze, { variant: "primary", size: "md", onClick: y, disabled: m, children: p })
    ] }) : null
  ] });
}
function U0(t) {
  const { label: a, sub: s, min: i, max: o, step: u, format: f, value: m, onChange: y, disabled: p } = t, b = (m - i) / (o - i) * 100, v = g.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: G1, children: [
    /* @__PURE__ */ c.jsxs("div", { className: oA, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: v, className: cA, children: a }),
      /* @__PURE__ */ c.jsx("span", { className: Y1, children: s })
    ] }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: v,
        type: "range",
        min: i,
        max: o,
        step: u,
        value: m,
        disabled: p,
        className: tm,
        style: { "--fill": `${b}%` },
        onChange: (S) => y(Number(S.target.value)),
        "aria-valuemin": i,
        "aria-valuemax": o,
        "aria-valuenow": m
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: em, children: f(m) })
  ] });
}
function CA({ normalize: t, onChange: a, disabled: s }) {
  const o = t.mode === "loudness" ? { min: wA, max: jA, step: 0.5, suffix: "LUFS" } : { min: EA, max: NA, step: 0.5, suffix: "dB" }, u = kA(t.targetDbOrLufs, o.min, o.max), f = (u - o.min) / (o.max - o.min) * 100, m = (y) => {
    if (y === "off") {
      a({ mode: y, targetDbOrLufs: t.targetDbOrLufs });
      return;
    }
    if (y === "peak") {
      a({ mode: y, targetDbOrLufs: -1 });
      return;
    }
    a({ mode: y, targetDbOrLufs: -16 });
  };
  return /* @__PURE__ */ c.jsxs("div", { className: bl, children: [
    /* @__PURE__ */ c.jsx("span", { className: xl, children: "Normalize" }),
    /* @__PURE__ */ c.jsx("div", { className: uA, role: "group", "aria-label": "Normalize mode", children: ["off", "peak", "loudness"].map((y) => {
      const p = y === "peak";
      return /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: dA,
          "data-active": t.mode === y,
          disabled: s || p,
          onClick: () => m(y),
          title: p ? "Peak normalize is not yet supported by the worker. Use Loudness (LUFS) instead." : void 0,
          children: [
            y,
            p ? " (soon)" : ""
          ]
        },
        y
      );
    }) }),
    t.mode !== "off" ? /* @__PURE__ */ c.jsxs("div", { className: G1, children: [
      /* @__PURE__ */ c.jsx("span", { className: Y1, children: "Target" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: o.min,
          max: o.max,
          step: o.step,
          value: u,
          disabled: s,
          className: tm,
          style: { "--fill": `${f}%` },
          onChange: (y) => a({ mode: t.mode, targetDbOrLufs: Number(y.target.value) }),
          "aria-valuemin": o.min,
          "aria-valuemax": o.max,
          "aria-valuenow": u,
          "aria-label": `Normalize target ${o.suffix}`
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: em, children: [
        u.toFixed(1),
        " ",
        o.suffix
      ] })
    ] }) : null
  ] });
}
function TA({ inS: t, outS: a, onChange: s, disabled: i }) {
  const o = g.useId(), u = g.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: bl, children: [
    /* @__PURE__ */ c.jsx("span", { className: xl, children: "Fade" }),
    /* @__PURE__ */ c.jsxs("div", { className: fA, children: [
      /* @__PURE__ */ c.jsxs("div", { className: O0, children: [
        /* @__PURE__ */ c.jsx("label", { className: L0, htmlFor: o, children: "Fade in (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: o,
            type: "number",
            min: 0,
            step: 0.05,
            value: t,
            disabled: i,
            className: $0,
            onChange: (f) => s(Math.max(0, Number(f.target.value)), a)
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: O0, children: [
        /* @__PURE__ */ c.jsx("label", { className: L0, htmlFor: u, children: "Fade out (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: u,
            type: "number",
            min: 0,
            step: 0.05,
            value: a,
            disabled: i,
            className: $0,
            onChange: (f) => s(t, Math.max(0, Number(f.target.value)))
          }
        )
      ] })
    ] })
  ] });
}
function RA({ enabled: t, thresholdDb: a, onChange: s, disabled: i }) {
  const o = (a - ec) / (Cf - ec) * 100;
  return /* @__PURE__ */ c.jsxs("div", { className: bl, children: [
    /* @__PURE__ */ c.jsx("span", { className: xl, children: "Silence trim" }),
    /* @__PURE__ */ c.jsxs("div", { className: hA, children: [
      /* @__PURE__ */ c.jsxs("label", { className: mA, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: t,
            disabled: i,
            onChange: (u) => s(u.target.checked, a)
          }
        ),
        "Enabled"
      ] }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: ec,
          max: Cf,
          step: 1,
          value: a,
          disabled: i || !t,
          className: tm,
          style: { "--fill": `${o}%`, flex: 1 },
          onChange: (u) => s(t, Number(u.target.value)),
          "aria-valuemin": ec,
          "aria-valuemax": Cf,
          "aria-valuenow": a,
          "aria-label": "Silence threshold dB"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: em, children: [
        a.toFixed(0),
        " dB"
      ] })
    ] })
  ] });
}
const Is = 1e-3;
function _A(t) {
  const a = [];
  return Math.abs(t.volumeDb) >= Is && a.push("gain"), (Math.abs(t.eq3.low) >= Is || Math.abs(t.eq3.mid) >= Is || Math.abs(t.eq3.high) >= Is) && a.push("eq3"), t.speed.mode === "audio" && Math.abs(t.speed.value - 1) >= Is && a.push("speed"), Math.abs(t.pitchSt) >= Is && a.push("pitch"), t.normalize.mode !== "off" && a.push("normalize"), t.fade.inS > 0 && a.push("fade-in"), t.fade.outS > 0 && a.push("fade-out"), t.silence.enabled && a.push("silence"), a;
}
function MA(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
function AA(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} st`;
}
function kA(t, a, s) {
  return Number.isFinite(t) ? Math.max(a, Math.min(s, t)) : a;
}
var DA = "skdk4g0", zA = "skdk4g1", B0 = "skdk4g2", OA = "skdk4g3", LA = "skdk4g4", $A = "skdk4g5", UA = "skdk4g6", BA = "skdk4g7", IA = "skdk4g8", VA = "skdk4g9", qA = "skdk4ga", HA = "skdk4gb", FA = "skdk4gc", PA = "skdk4gd", I0 = "skdk4ge", V0 = "skdk4gf", GA = "skdk4gg", q0 = "skdk4gh", H0 = "skdk4gi", YA = "skdk4gj", KA = "skdk4gk", XA = "skdk4gl", F0 = "skdk4gm", QA = "skdk4gn", ZA = "skdk4gp", JA = "skdk4gq", WA = "skdk4gr", e3 = "skdk4gs", t3 = "skdk4gt", n3 = "skdk4gu", a3 = "skdk4gv", P0 = "skdk4gw", r3 = "skdk4gx", s3 = "skdk4gy", i3 = "skdk4gz", l3 = "skdk4g10", o3 = "cgsfgh1", c3 = "cgsfgh2", u3 = "cgsfgh3", d3 = "cgsfgh4", f3 = "cgsfgh5", h3 = "cgsfgh6", m3 = "cgsfgh7", p3 = "cgsfgh8", g3 = "cgsfgh9", v3 = "cgsfgha", y3 = "cgsfghb", b3 = "cgsfghc", x3 = "cgsfghd", S3 = "cgsfghe", w3 = "cgsfghm", j3 = "cgsfghn", E3 = "cgsfgho", N3 = "cgsfghp";
const an = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], Sl = {
  happy: "Happy",
  angry: "Angry",
  sad: "Sad",
  afraid: "Afraid",
  disgusted: "Disgusted",
  melancholic: "Melancholic",
  surprised: "Surprised",
  calm: "Calm"
}, Ws = {
  happy: 0,
  angry: 0,
  sad: 0,
  afraid: 0,
  disgusted: 0,
  melancholic: 0,
  surprised: 0,
  calm: 0
}, K1 = 0.05;
function C3(t) {
  let a = null, s = -1 / 0;
  for (const i of an) {
    const o = t[i];
    o > s && (s = o, a = i);
  }
  return !a || s <= K1 ? null : a;
}
function X1(t, a = 3) {
  return an.map((s) => ({ key: s, label: Sl[s], value: t[s] })).filter((s) => s.value > K1).sort((s, i) => i.value - s.value).slice(0, a);
}
function T3(t) {
  let a = 0;
  for (const s of an) a += t[s] * t[s];
  return Math.sqrt(a);
}
function G0(t) {
  const a = X1(t, 2), s = a[0];
  if (!s) return "";
  const i = a[1];
  return !i || s.value - i.value > 0.25 ? Tf(s.label) : `${Tf(s.label)} + ${i.label.toLowerCase()}`;
}
function Tf(t) {
  if (!t) return t;
  const a = t[0];
  return a ? a.toUpperCase() + t.slice(1) : t;
}
function ts(t) {
  const a = { ...Ws };
  for (const s of an) {
    const i = t[s];
    a[s] = Number.isFinite(i) ? Math.max(0, Math.min(1, i)) : 0;
  }
  return a;
}
const Y0 = 0.05, K0 = 0.2, R3 = 22, _3 = 320, Rf = 0.78;
function _f(t, a, s, i) {
  const o = Math.cos(s), u = Math.sin(s), f = t * o + a * u;
  return Math.max(0, Math.min(1, f / i));
}
function M3(t) {
  const { vec: a, onChange: s, size: i, reduceMotion: o = !1 } = t, [u, f] = g.useState(a), [m, y] = g.useState(null), [p, b] = g.useState(null), v = g.useRef(null), S = g.useRef(a), w = g.useRef(o), j = g.useRef(null), C = g.useRef(0);
  w.current = o, g.useEffect(() => {
    f(a), S.current = a;
  }, [a]);
  const _ = g.useCallback(
    (q) => {
      const D = ts(q);
      f(D), S.current = D, s(D);
    },
    [s]
  ), T = g.useCallback((q) => {
    const D = ts(q);
    f(D), S.current = D;
  }, []), O = g.useCallback(
    (q) => {
      const D = v.current;
      if (!D || w.current) return;
      const F = q.clientX - D.centerX, Z = q.clientY - D.centerY, J = i / 2 * Rf, P = _f(F, Z, D.angle, J), ie = { ...S.current, [D.axis]: P };
      T(ie);
    },
    [i, T]
  ), R = g.useCallback(
    (q) => {
      const D = v.current;
      if (D) {
        if (window.removeEventListener("pointermove", O), window.removeEventListener("pointerup", R), window.removeEventListener("pointercancel", R), w.current) {
          const F = q.clientX - D.centerX, Z = q.clientY - D.centerY, J = i / 2 * Rf, P = _f(F, Z, D.angle, J), ie = { ...S.current, [D.axis]: P };
          v.current = null, _(ie);
          return;
        }
        v.current = null, _(S.current);
      }
    },
    [_, O, i]
  );
  g.useEffect(() => () => {
    window.removeEventListener("pointermove", O), window.removeEventListener("pointerup", R), window.removeEventListener("pointercancel", R), v.current = null, j.current !== null && (window.clearTimeout(j.current), j.current = null);
  }, [O, R]);
  const N = g.useCallback((q, D) => {
    w.current || (C.current += 1, b({ x: q, y: D, key: C.current }), j.current !== null && window.clearTimeout(j.current), j.current = window.setTimeout(() => {
      b(null), j.current = null;
    }, _3));
  }, []), B = g.useCallback(
    (q, D, F, Z, J) => {
      const P = F.getBoundingClientRect(), ie = P.left + P.width / 2, A = P.top + P.height / 2, $ = an.indexOf(q) / an.length * Math.PI * 2 - Math.PI / 2;
      if (v.current = {
        axis: q,
        pointerId: D,
        centerX: ie,
        centerY: A,
        angle: $
      }, y(q), Z !== void 0 && J !== void 0) {
        const se = Z - ie, fe = J - A, k = i / 2 * Rf, ne = _f(se, fe, $, k), ae = { ...S.current, [q]: ne };
        w.current ? _(ae) : T(ae);
      }
      window.addEventListener("pointermove", O), window.addEventListener("pointerup", R), window.addEventListener("pointercancel", R);
    },
    [_, O, R, i, T]
  ), G = g.useCallback(
    (q, D) => {
      D.preventDefault();
      const F = D.currentTarget, Z = F.ownerSVGElement ?? F;
      B(q, D.pointerId, Z);
    },
    [B]
  ), te = g.useCallback(
    (q) => {
      const D = q.currentTarget, F = D instanceof SVGSVGElement ? D : D.ownerSVGElement ?? D, Z = F.getBoundingClientRect(), J = Z.left + Z.width / 2, P = Z.top + Z.height / 2, ie = q.clientX - J, A = q.clientY - P;
      if (Math.sqrt(ie * ie + A * A) < 8) return;
      let $ = Math.atan2(A, ie) * 180 / Math.PI;
      $ = (($ + 90) % 360 + 360) % 360;
      let se = null, fe = 999;
      for (let ae = 0; ae < an.length; ae++) {
        const K = an[ae];
        if (!K) continue;
        const U = ae / an.length * 360, W = Math.abs((U - $ + 540) % 360 - 180);
        W < fe && (fe = W, se = K);
      }
      if (!se || fe > R3) return;
      q.preventDefault();
      const k = (q.clientX - Z.left) / Z.width * i, ne = (q.clientY - Z.top) / Z.height * i;
      N(k, ne), B(se, q.pointerId, F, q.clientX, q.clientY);
    },
    [B, i, N]
  ), M = g.useCallback(
    (q, D) => {
      const F = S.current[q];
      let Z = F;
      switch (D.key) {
        case "ArrowUp":
        case "ArrowRight":
          Z = F + Y0;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          Z = F - Y0;
          break;
        case "PageUp":
          Z = F + K0;
          break;
        case "PageDown":
          Z = F - K0;
          break;
        case "Home":
          Z = 0;
          break;
        case "End":
          Z = 1;
          break;
        default:
          return;
      }
      D.preventDefault(), y(q), _({ ...S.current, [q]: Z });
    },
    [_]
  );
  return {
    liveVec: u,
    activeAxis: m,
    setActiveAxis: y,
    onPointerDown: G,
    onKeyDown: M,
    onSurfacePointerDown: te,
    surfacePing: p
  };
}
const A3 = [0.25, 0.5, 0.75, 1];
function k3({
  vec: t,
  onChange: a,
  size: s = 360,
  readOnly: i = !1,
  reduceMotion: o = !1
}) {
  const u = M3({ vec: t, onChange: a, size: s, reduceMotion: o }), f = s / 2, m = s / 2, y = s / 2 * 0.78, p = g.useMemo(() => D3(f, m, y), [f, m, y]), b = g.useMemo(() => an.map((v, S) => {
    const w = xc(u.liveVec[v]), j = p[S];
    return j ? `${f + j.dx * w},${m + j.dy * w}` : "0,0";
  }).join(" "), [p, f, m, u.liveVec]);
  return /* @__PURE__ */ c.jsx("div", { className: o3, children: /* @__PURE__ */ c.jsx("div", { className: c3, style: { width: s, height: s }, children: /* @__PURE__ */ c.jsxs(
    "svg",
    {
      className: u3,
      viewBox: `0 0 ${s} ${s}`,
      role: "img",
      "aria-label": "8-axis emotion radar",
      onPointerDown: i ? void 0 : u.onSurfacePointerDown,
      style: i ? void 0 : { cursor: "crosshair", touchAction: "none" },
      children: [
        A3.map((v) => /* @__PURE__ */ c.jsx(
          "circle",
          {
            className: d3,
            cx: f,
            cy: m,
            r: y * v
          },
          v
        )),
        an.map((v, S) => {
          const w = p[S];
          if (!w) return null;
          const j = f + w.dx * 1.18, C = m + w.dy * 1.18, _ = u.activeAxis === v;
          return /* @__PURE__ */ c.jsxs("g", { children: [
            /* @__PURE__ */ c.jsx(
              "line",
              {
                className: f3,
                x1: f,
                y1: m,
                x2: f + w.dx,
                y2: m + w.dy
              }
            ),
            /* @__PURE__ */ c.jsx(
              "text",
              {
                className: `${x3}${_ ? ` ${S3}` : ""}`,
                x: j,
                y: C,
                textAnchor: "middle",
                dominantBaseline: "middle",
                children: Sl[v]
              }
            )
          ] }, v);
        }),
        an.map((v, S) => {
          const w = xc(u.liveVec[v]);
          if (w <= 0.01) return null;
          const j = p[S];
          if (!j) return null;
          const C = u.activeAxis === v;
          return /* @__PURE__ */ c.jsx(
            "line",
            {
              className: `${m3}${C ? ` ${p3}` : ""}`,
              x1: f,
              y1: m,
              x2: f + j.dx * w,
              y2: m + j.dy * w
            },
            `petal-${v}`
          );
        }),
        /* @__PURE__ */ c.jsx("polygon", { className: h3, points: b }),
        u.surfacePing && /* @__PURE__ */ c.jsx(
          "circle",
          {
            className: b3,
            cx: u.surfacePing.x,
            cy: u.surfacePing.y,
            r: 10
          },
          u.surfacePing.key
        ),
        !i && an.map((v, S) => {
          const w = xc(u.liveVec[v]), j = p[S];
          if (!j) return null;
          const C = f + j.dx * w, _ = m + j.dy * w, T = u.activeAxis === v;
          return /* @__PURE__ */ c.jsxs("g", { children: [
            /* @__PURE__ */ c.jsx(
              "circle",
              {
                className: g3,
                cx: C,
                cy: _,
                r: 14,
                tabIndex: 0,
                role: "slider",
                "aria-label": `${Sl[v]} axis`,
                "aria-valuemin": 0,
                "aria-valuemax": 1,
                "aria-valuenow": w,
                onPointerDown: (O) => u.onPointerDown(v, O),
                onKeyDown: (O) => u.onKeyDown(v, O),
                onFocus: () => u.setActiveAxis(v),
                onBlur: () => u.setActiveAxis(null)
              }
            ),
            /* @__PURE__ */ c.jsx(
              "circle",
              {
                className: `${v3}${T ? ` ${y3}` : ""}`,
                cx: C,
                cy: _,
                r: 6
              }
            )
          ] }, v);
        })
      ]
    }
  ) }) });
}
function D3(t, a, s) {
  return an.map((i, o) => {
    const u = o / an.length * Math.PI * 2 - Math.PI / 2;
    return {
      dx: Math.cos(u) * s,
      dy: Math.sin(u) * s
    };
  });
}
function xc(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
function z3({ vec: t, size: a = 36 }) {
  const s = a / 2, i = a / 2, o = a / 2 * 0.86, u = g.useMemo(() => an.map((f, m) => {
    const y = xc(t[f]), p = m / an.length * Math.PI * 2 - Math.PI / 2, b = s + Math.cos(p) * o * y, v = i + Math.sin(p) * o * y;
    return `${b},${v}`;
  }).join(" "), [s, i, o, t]);
  return /* @__PURE__ */ c.jsx("span", { className: w3, "aria-hidden": "true", children: /* @__PURE__ */ c.jsxs(
    "svg",
    {
      className: j3,
      width: a,
      height: a,
      viewBox: `0 0 ${a} ${a}`,
      children: [
        /* @__PURE__ */ c.jsx("circle", { className: E3, cx: s, cy: i, r: o }),
        /* @__PURE__ */ c.jsx("polygon", { className: N3, points: u })
      ]
    }
  ) });
}
var O3 = "_1jqr3aj0", L3 = "_1jqr3aj1", $3 = "_1jqr3aj2", U3 = "_1jqr3aj3", B3 = "_1jqr3aj4", I3 = "_1jqr3aj5", V3 = "_1jqr3aj6", q3 = "_1jqr3aj7";
const X0 = 0.05, Q0 = 0.2;
function H3({
  vec: t,
  onChange: a,
  readOnly: s = !1,
  reduceMotion: i = !1
}) {
  const [o, u] = g.useState(null), f = g.useRef(null), m = g.useRef(/* @__PURE__ */ new Map()), y = g.useCallback(
    (j, C) => {
      const _ = Math.max(0, Math.min(1, C));
      a(ts({ ...t, [j]: _ }));
    },
    [a, t]
  ), p = g.useCallback((j, C) => {
    const _ = m.current.get(j);
    return !_ || _.width <= 0 ? 0 : (C - _.left) / _.width;
  }, []), b = g.useCallback(
    (j, C) => {
      if (s) return;
      C.preventDefault();
      const _ = C.currentTarget.querySelector("[data-track]");
      _ instanceof HTMLElement && m.current.set(j, _.getBoundingClientRect()), C.currentTarget.setPointerCapture(C.pointerId), f.current = j, u(j), y(j, p(j, C.clientX));
    },
    [s, y, p]
  ), v = g.useCallback(
    (j, C) => {
      s || i || f.current === j && y(j, p(j, C.clientX));
    },
    [s, i, y, p]
  ), S = g.useCallback(
    (j, C) => {
      if (f.current === j) {
        try {
          C.currentTarget.releasePointerCapture(C.pointerId);
        } catch {
        }
        f.current = null, m.current.delete(j);
      }
    },
    []
  ), w = g.useCallback(
    (j, C) => {
      if (s) return;
      const _ = t[j] ?? 0;
      let T = _;
      switch (C.key) {
        case "ArrowRight":
        case "ArrowUp":
          T = _ + X0;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          T = _ - X0;
          break;
        case "PageUp":
          T = _ + Q0;
          break;
        case "PageDown":
          T = _ - Q0;
          break;
        case "Home":
          T = 0;
          break;
        case "End":
          T = 1;
          break;
        default:
          return;
      }
      C.preventDefault(), u(j), y(j, T);
    },
    [s, y, t]
  );
  return /* @__PURE__ */ c.jsx("div", { className: O3, role: "group", "aria-label": "Emotion axis sliders", children: an.map((j) => {
    const C = F3(t[j] ?? 0), _ = C > 0.05, T = o === j, O = Sl[j];
    return /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: `${L3}${_ ? ` ${$3}` : ""}${T ? ` ${U3}` : ""}`,
        role: "slider",
        "aria-label": `${O} intensity`,
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": Number(C.toFixed(2)),
        "aria-readonly": s,
        disabled: s,
        onPointerDown: (R) => b(j, R),
        onPointerMove: (R) => v(j, R),
        onPointerUp: (R) => S(j, R),
        onPointerCancel: (R) => S(j, R),
        onKeyDown: (R) => w(j, R),
        onFocus: () => u(j),
        onBlur: () => u(null),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: B3, children: O }),
          /* @__PURE__ */ c.jsx("span", { className: I3, "data-track": "true", children: /* @__PURE__ */ c.jsx(
            "span",
            {
              className: V3,
              style: { width: `${C * 100}%` },
              "aria-hidden": "true"
            }
          ) }),
          /* @__PURE__ */ c.jsx("span", { className: q3, children: C.toFixed(2) })
        ]
      },
      j
    );
  }) });
}
function F3(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
var Z0 = "gvwvwg0", P3 = "gvwvwg2", G3 = "gvwvwg3", Y3 = "gvwvwg8", K3 = "gvwvwg9", X3 = "gvwvwga", Q3 = "gvwvwgb", Z3 = "gvwvwgc", J3 = "gvwvwgd", W3 = "gvwvwge";
function ek({
  presets: t,
  activePresetId: a,
  onSelect: s,
  onDelete: i
}) {
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: Z0, children: [
    /* @__PURE__ */ c.jsx("span", { className: P3, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("span", { className: G3, children: "No presets yet. Save your current vector to build the library." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: Z0, children: [
    /* @__PURE__ */ c.jsx("span", { className: W3, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("div", { className: Y3, children: t.map((o) => {
      const u = tk(o), f = o.presetId === a;
      return /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${K3}${f ? ` ${Q3}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: X3,
                onClick: () => s(o),
                "aria-pressed": f,
                children: [
                  /* @__PURE__ */ c.jsx(z3, { vec: u, size: 28 }),
                  /* @__PURE__ */ c.jsx("span", { className: Z3, children: o.presetName })
                ]
              }
            ),
            i && /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: J3,
                onClick: () => {
                  window.confirm(`Delete preset "${o.presetName}"? This cannot be undone.`) && i(o.presetId);
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
const lh = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function tk(t) {
  const a = lh.reduce(
    (i, o) => ({ ...i, [o]: 0 }),
    {}
  );
  if (!Array.isArray(t.vector)) return a;
  const s = lh.reduce(
    (i, o, u) => ({ ...i, [o]: t.vector[u] ?? 0 }),
    a
  );
  return ts(s);
}
function Mf(t) {
  return lh.map((a) => t[a] ?? 0);
}
const nk = [
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
], ak = [
  "very",
  "extremely",
  "deeply",
  "intensely",
  "absolutely",
  "totally",
  "really",
  "so"
], rk = [
  "slightly",
  "a bit",
  "a little",
  "kinda",
  "kind of",
  "somewhat",
  "barely"
], sk = ["not", "no", "never", "without", "lack", "lacking", "free of"];
function ik(t) {
  const a = t.toLowerCase().trim();
  if (!a) return { ...Ws };
  const i = a.split(/\s+/).some((f) => ak.includes(f)) ? 1.2 : 1, o = rk.some((f) => a.includes(f)) ? 0.55 : 1, u = { ...Ws };
  for (const f of nk) {
    let m = 0;
    for (const y of f.keywords) {
      const p = y.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"), v = new RegExp(`\\b${p}\\b`).exec(a);
      if (!v) continue;
      const S = v.index, w = a.slice(0, S), j = Math.max(
        w.lastIndexOf(","),
        w.lastIndexOf(";"),
        w.lastIndexOf(" but "),
        w.lastIndexOf(" yet ")
      ), _ = w.slice(j >= 0 ? j : 0).slice(-30);
      sk.some((T) => new RegExp(`\\b${T}\\b`).test(_)) || (m += 1);
    }
    if (m > 0) {
      const y = f.weight * Math.min(1, 0.55 + 0.2 * (m - 1)) * i * o;
      u[f.axis] = Math.min(1, y);
    }
  }
  return an.every((f) => u[f] === 0) && (u.calm = 0.4), ts(u);
}
const lk = [
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
];
function ok({
  value: t,
  onChange: a,
  deploymentId: s,
  presets: i,
  onPresetsChange: o
}) {
  const u = t.mode ?? "emotion_vector", f = u === "none" || u === "audio_ref" ? "emotion_vector" : u, m = g.useMemo(() => ck(t.vector), [t.vector]), y = t.emotionAlpha ?? 1, [p, b] = g.useState(null), [v, S] = g.useState(!1), [w, j] = g.useState(null), [C, _] = g.useState(""), [T, O] = g.useState(!1), R = g.useRef(!0);
  g.useEffect(() => (R.current = !0, () => {
    R.current = !1;
  }), []), g.useEffect(() => {
    T || _(G0(m));
  }, [m, T]);
  const N = ($) => {
    a({ ...t, mode: $ });
  }, B = ($) => {
    a({
      ...t,
      mode: "emotion_vector",
      vector: Mf($)
    }), w && j(null);
  }, G = () => {
    B(ts(Ws));
  }, te = ($) => {
    const se = Math.max(0, Math.min(10, Number.isFinite($) ? $ : 1));
    a({ ...t, emotionAlpha: se });
  }, M = async () => {
    const $ = C.trim();
    if ($) {
      S(!0), b(null);
      try {
        const se = await NM(s, $, Mf(m));
        if (!R.current) return;
        o(
          uk([se, ...i.filter((fe) => fe.presetId !== se.presetId)])
        ), j(se.presetId), O(!1);
      } catch (se) {
        R.current && b(J0(se));
      } finally {
        R.current && S(!1);
      }
    }
  }, q = async ($) => {
    const se = [...i];
    o(i.filter((fe) => fe.presetId !== $)), w === $ && j(null);
    try {
      await CM(s, $);
    } catch (fe) {
      R.current && (o(se), b(J0(fe)));
    }
  }, D = ($) => {
    j($.presetId), a({
      ...t,
      mode: "emotion_vector",
      vector: $.vector
    });
  }, F = ($) => {
    a({ ...t, mode: "qwen_template", qwenTemplate: $ });
  }, Z = C3(m), J = T3(m), P = X1(m, 3), ie = P.length > 0 && C.trim().length > 0 && !v, A = G0(m) || "name your preset…", V = f !== "emotion_vector";
  return /* @__PURE__ */ c.jsxs("div", { className: DA, children: [
    /* @__PURE__ */ c.jsxs("div", { className: zA, children: [
      /* @__PURE__ */ c.jsx("span", { className: B0, children: "Emotion mode" }),
      /* @__PURE__ */ c.jsx("div", { className: OA, role: "radiogroup", "aria-label": "Emotion mode", children: lk.map(($) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": f === $.id,
          className: `${LA}${f === $.id ? ` ${$A}` : ""}`,
          onClick: () => N($.id),
          children: $.label
        },
        $.id
      )) })
    ] }),
    f === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: YA, children: [
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: KA,
          placeholder: 'e.g. "Friendly teen, slightly skeptical"',
          value: t.qwenTemplate ?? "",
          onChange: ($) => F($.target.value)
        }
      ),
      /* @__PURE__ */ c.jsxs("div", { className: XA, children: [
        /* @__PURE__ */ c.jsx(
          Ze,
          {
            variant: "secondary",
            onClick: () => {
              const $ = (t.qwenTemplate ?? "").trim();
              if (!$) return;
              const se = ik($);
              a({
                ...t,
                mode: "emotion_vector",
                vector: Mf(se)
              });
            },
            disabled: !(t.qwenTemplate ?? "").trim(),
            children: "Map to vector →"
          }
        ),
        /* @__PURE__ */ c.jsx("span", { className: F0, children: "Heuristic v1: keyword-based mapping. Switches to vector mode on success." })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: F0, children: [
        "The Qwen prompt is mapped to a vector at synth time. Per-line",
        " ",
        /* @__PURE__ */ c.jsx("code", { children: "[Char|qwen:…]" }),
        " overrides take precedence."
      ] })
    ] }),
    f === "emotion_vector" && /* @__PURE__ */ c.jsxs("div", { className: PA, children: [
      /* @__PURE__ */ c.jsx("div", { className: `${m0} ${UA}`, children: /* @__PURE__ */ c.jsx(
        k3,
        {
          vec: m,
          onChange: B,
          readOnly: V
        }
      ) }),
      /* @__PURE__ */ c.jsxs("div", { className: `${m0} ${BA}`, children: [
        /* @__PURE__ */ c.jsxs("div", { className: IA, children: [
          /* @__PURE__ */ c.jsx("span", { className: B0, children: "Dominant" }),
          /* @__PURE__ */ c.jsx("span", { className: VA, children: Z ? Sl[Z].toLowerCase() : "neutral" }),
          /* @__PURE__ */ c.jsxs("span", { className: qA, children: [
            "‖v‖ = ",
            J.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(H3, { vec: m, onChange: B, readOnly: V }),
        /* @__PURE__ */ c.jsx("div", { className: HA, children: /* @__PURE__ */ c.jsxs(
          Ze,
          {
            variant: "ghost",
            size: "sm",
            onClick: G,
            disabled: V || J < 1e-3,
            "aria-label": "Reset emotion vector",
            children: [
              /* @__PURE__ */ c.jsxs(
                "svg",
                {
                  className: FA,
                  viewBox: "0 0 24 24",
                  width: "14",
                  height: "14",
                  "aria-hidden": "true",
                  children: [
                    /* @__PURE__ */ c.jsx(
                      "path",
                      {
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M3 12a9 9 0 1 0 3-6.7L3 8"
                      }
                    ),
                    /* @__PURE__ */ c.jsx(
                      "polyline",
                      {
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        points: "3 3 3 8 8 8"
                      }
                    )
                  ]
                }
              ),
              "Reset"
            ]
          }
        ) })
      ] })
    ] }),
    f === "emotion_vector" && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsxs("div", { className: I0, children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("span", { className: V0, children: "Alpha" }),
          /* @__PURE__ */ c.jsx("br", {}),
          /* @__PURE__ */ c.jsx("span", { className: GA, children: "Global mix · per-line overrides bypass it" })
        ] }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 10,
            step: 0.01,
            value: y,
            className: q0,
            style: { "--fill": `${y * 10}%` },
            onChange: ($) => te(Number($.target.value)),
            "aria-label": "Emotion alpha"
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: H0, children: [
          (y * 100).toFixed(0),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${ZA}${P.length === 0 ? ` ${JA}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs("div", { className: WA, children: [
              /* @__PURE__ */ c.jsx("span", { className: e3, children: "Save current as preset" }),
              P.length === 0 && /* @__PURE__ */ c.jsx("span", { className: t3, children: "adjust the radar to enable" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: n3, children: [
              /* @__PURE__ */ c.jsx("div", { className: a3, children: P.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: `${P0} ${s3}`, children: "no axes set" }) : P.map(($) => /* @__PURE__ */ c.jsxs("span", { className: P0, children: [
                $.label.toLowerCase(),
                /* @__PURE__ */ c.jsx("b", { className: r3, children: $.value.toFixed(2) })
              ] }, $.key)) }),
              /* @__PURE__ */ c.jsxs("div", { className: i3, children: [
                /* @__PURE__ */ c.jsx(
                  "input",
                  {
                    type: "text",
                    className: l3,
                    placeholder: A,
                    value: C,
                    disabled: P.length === 0 || v,
                    onChange: ($) => {
                      _($.target.value), O(!0);
                    },
                    onKeyDown: ($) => {
                      $.key === "Enter" && ie && M();
                    },
                    "aria-label": "Preset name"
                  }
                ),
                /* @__PURE__ */ c.jsx(
                  Ze,
                  {
                    variant: "primary",
                    disabled: !ie,
                    onClick: M,
                    children: v ? "Saving…" : "+ Save"
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ c.jsx(
        ek,
        {
          presets: i,
          activePresetId: w,
          onSelect: D,
          onDelete: q
        }
      )
    ] }),
    f === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: I0, children: [
      /* @__PURE__ */ c.jsx("span", { className: V0, children: "Alpha" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 10,
          step: 0.01,
          value: y,
          className: q0,
          style: { "--fill": `${y * 10}%` },
          onChange: ($) => te(Number($.target.value)),
          "aria-label": "Emotion alpha"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: H0, children: [
        (y * 100).toFixed(0),
        "%"
      ] })
    ] }),
    p && /* @__PURE__ */ c.jsx("div", { className: QA, children: p })
  ] });
}
function ck(t) {
  if (!t || !Array.isArray(t)) return ts(Ws);
  const a = { ...Ws };
  return an.forEach((s, i) => {
    const o = t[i];
    a[s] = Number.isFinite(o) ? Math.max(0, Math.min(1, o)) : 0;
  }), a;
}
function uk(t) {
  return [...t].sort((a, s) => s.updatedAt - a.updatedAt);
}
function J0(t) {
  return t instanceof ai || t instanceof Error ? t.message : "Unknown error";
}
var dk = "_5u1uau0", nl = "_5u1uau1", fk = "_5u1uau2", Vs = "_5u1uau3", al = "_5u1uau4", hk = "_5u1uau5", Af = "_5u1uau6", mk = "_5u1uau7", pk = "_5u1uau8", gk = "_5u1uau9", vk = "_5u1uaua", yk = "_5u1uaub", bk = "_5u1uauc", xk = "_5u1uaud", Sk = "_5u1uaue", W0 = "_5u1uauf", eb = "_5u1uaug", wk = "_5u1uauh";
const kf = [
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
], jk = ["mp3", "wav", "flac"], tc = 0.5, Df = 2, Ek = 0.05, Nk = 0.8, Ck = 0.8, tb = 42;
function nc(t, a, s) {
  const i = t[a];
  if (typeof i == "number" && Number.isFinite(i)) return i;
  if (typeof i == "string") {
    const o = Number(i);
    if (Number.isFinite(o)) return o;
  }
  return s;
}
function Tk({
  outputFormat: t,
  onOutputFormatChange: a,
  speedFactor: s,
  onSpeedFactorChange: i,
  cachePolicy: o,
  onCachePolicyChange: u,
  generation: f,
  onGenerationChange: m
}) {
  const y = g.useId(), p = g.useId(), b = g.useId(), v = g.useId(), S = g.useId(), w = (B, G) => {
    m({ ...f, [B]: G });
  }, j = f.seed === void 0 || f.seed === null ? "random" : "fixed", C = (B) => {
    if (B !== j)
      if (B === "random") {
        const G = { ...f };
        delete G.seed, m(G);
      } else {
        const G = nc(f, "seed", tb);
        m({ ...f, seed: G });
      }
  }, _ = kf.find((B) => B.id === o) ?? kf[0], T = (s - tc) / (Df - tc) * 100, O = nc(f, "temperature", Nk), R = nc(f, "top_p", Ck), N = nc(f, "seed", tb);
  return /* @__PURE__ */ c.jsxs("div", { className: dk, children: [
    /* @__PURE__ */ c.jsxs("div", { className: nl, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: y, className: Vs, children: "Format" }),
      /* @__PURE__ */ c.jsx("div", { className: al, children: /* @__PURE__ */ c.jsx(
        "select",
        {
          id: y,
          className: hk,
          value: t,
          onChange: (B) => a(B.currentTarget.value),
          children: jk.map((B) => /* @__PURE__ */ c.jsx("option", { value: B, children: B }, B))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: nl, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: p, className: Vs, children: "Speed" }),
      /* @__PURE__ */ c.jsxs("div", { className: `${al} ${mk}`, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: p,
            type: "range",
            className: pk,
            min: tc,
            max: Df,
            step: Ek,
            value: s,
            style: { "--range-pct": `${T}%` },
            onChange: (B) => i(Number(B.currentTarget.value)),
            "aria-valuemin": tc,
            "aria-valuemax": Df,
            "aria-valuenow": s
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: gk, children: [
          s.toFixed(2),
          "×"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: fk, role: "radiogroup", "aria-label": "Cache policy", children: [
      /* @__PURE__ */ c.jsx("span", { className: Vs, children: "Cache" }),
      /* @__PURE__ */ c.jsx("div", { className: vk, children: kf.map((B) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": o === B.id,
          className: yk,
          onClick: () => u(B.id),
          title: B.help,
          children: B.label
        },
        B.id
      )) }),
      /* @__PURE__ */ c.jsx("p", { className: bk, "aria-live": "polite", children: _.help })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: xk, "aria-hidden": "true" }),
    /* @__PURE__ */ c.jsxs("div", { className: nl, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: b, className: Vs, children: "Temperature" }),
      /* @__PURE__ */ c.jsx("div", { className: al, children: /* @__PURE__ */ c.jsx(
        "input",
        {
          id: b,
          type: "number",
          className: Af,
          min: 0,
          max: 2,
          step: 0.05,
          value: O,
          onChange: (B) => w("temperature", Number(B.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: nl, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: v, className: Vs, children: "Top-p" }),
      /* @__PURE__ */ c.jsx("div", { className: al, children: /* @__PURE__ */ c.jsx(
        "input",
        {
          id: v,
          type: "number",
          className: Af,
          min: 0,
          max: 1,
          step: 0.05,
          value: R,
          onChange: (B) => w("top_p", Number(B.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: nl, children: [
      /* @__PURE__ */ c.jsx("span", { className: Vs, id: `${S}-label`, children: "Seed" }),
      /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${al} ${Sk}`,
          role: "radiogroup",
          "aria-labelledby": `${S}-label`,
          children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                role: "radio",
                "aria-checked": j === "fixed",
                className: `${W0} ${j === "fixed" ? eb : ""}`,
                onClick: () => C("fixed"),
                children: "Fixed"
              }
            ),
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                role: "radio",
                "aria-checked": j === "random",
                className: `${W0} ${j === "random" ? eb : ""}`,
                onClick: () => C("random"),
                title: "A fresh seed is rolled for every run — output varies",
                children: "Random"
              }
            ),
            j === "fixed" ? /* @__PURE__ */ c.jsx(
              "input",
              {
                id: S,
                type: "number",
                className: Af,
                step: 1,
                value: N,
                onChange: (B) => w("seed", Math.trunc(Number(B.currentTarget.value))),
                "aria-label": "Fixed seed value"
              }
            ) : /* @__PURE__ */ c.jsx("span", { className: wk, "aria-live": "polite", children: "auto · rolls each run" })
          ]
        }
      )
    ] })
  ] });
}
var Rk = "iv43qk0", nb = "iv43qk1", _k = "iv43qk2", ab = "iv43qk3", Mk = "iv43qk4", Ak = "iv43qk5", kk = "iv43qk6", Dk = "iv43qk7", zk = { vector: "iv43qk8", qwen: "iv43qk9", preset: "iv43qka", audio: "iv43qkb", raw: "iv43qkc" }, Ok = "iv43qkd", Lk = "iv43qke", zf = "iv43qkf", Of = "iv43qkg";
function $k({
  lines: t,
  characterColors: a,
  onLineClick: s
}) {
  if (t.length === 0)
    return /* @__PURE__ */ c.jsx("p", { className: Ok, children: "Paste dialogue above to see character-tagged lines, override badges, and per-line previews here." });
  const i = t.length, o = t.filter((f) => f.character !== null).length, u = i - o;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: Lk, children: [
      /* @__PURE__ */ c.jsxs("span", { className: zf, children: [
        /* @__PURE__ */ c.jsx("span", { className: Of, children: i }),
        "lines"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: zf, children: [
        /* @__PURE__ */ c.jsx("span", { className: Of, children: o }),
        "spoken"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: zf, children: [
        /* @__PURE__ */ c.jsx("span", { className: Of, children: u }),
        "narration"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("ol", { className: Rk, children: t.map((f) => /* @__PURE__ */ c.jsx(
      Uk,
      {
        line: f,
        ...f.character && a[f.character] ? { color: a[f.character] } : {},
        ...s ? { onClick: () => s(f.idx) } : {}
      },
      f.idx
    )) })
  ] });
}
function Uk({ line: t, color: a, onClick: s }) {
  return t.character === null ? /* @__PURE__ */ c.jsxs("li", { className: `${nb} ${_k}`, children: [
    /* @__PURE__ */ c.jsx("span", { className: ab, children: String(t.idx + 1).padStart(2, "0") }),
    /* @__PURE__ */ c.jsx("span", { className: kk, children: t.text })
  ] }) : /* @__PURE__ */ c.jsxs(
    "li",
    {
      className: nb,
      onClick: s,
      style: s ? { cursor: "pointer" } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: ab, children: String(t.idx + 1).padStart(2, "0") }),
        /* @__PURE__ */ c.jsx("span", { className: Mk, style: a ? { color: a } : void 0, children: t.character }),
        /* @__PURE__ */ c.jsxs("span", { className: Ak, children: [
          t.text,
          t.override && /* @__PURE__ */ c.jsxs("span", { className: `${Dk} ${zk[t.override.kind]}`, children: [
            t.override.kind,
            t.override.label ? ` · ${t.override.label}` : ""
          ] })
        ] })
      ]
    }
  );
}
var Bk = "_46z95i0", Ik = "_46z95i1", Vk = "_46z95i2", qk = "_46z95i3", Hk = "_46z95i4", Fk = "_46z95i5", Pk = "_46z95i6";
const Gk = {
  intensity: 0.6,
  pace: 1,
  pitchSt: 0
};
function Yk({ value: t, onChange: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: Bk, children: [
    /* @__PURE__ */ c.jsx(
      Lf,
      {
        label: "Intensity",
        sub: "How emotionally amplified each line reads",
        min: 0,
        max: 1,
        step: 0.01,
        format: (s) => `${Math.round(s * 100)}%`,
        value: t.intensity,
        onChange: (s) => a({ ...t, intensity: s })
      }
    ),
    /* @__PURE__ */ c.jsx(
      Lf,
      {
        label: "Pace",
        sub: "Time-stretched playback per line",
        min: 0.5,
        max: 2,
        step: 0.01,
        format: (s) => `${s.toFixed(2)}×`,
        value: t.pace,
        onChange: (s) => a({ ...t, pace: s })
      }
    ),
    /* @__PURE__ */ c.jsx(
      Lf,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: -12,
        max: 12,
        step: 0.5,
        format: (s) => `${s >= 0 ? "+" : ""}${s.toFixed(1)} st`,
        value: t.pitchSt,
        onChange: (s) => a({ ...t, pitchSt: s })
      }
    )
  ] });
}
function Lf({ label: t, sub: a, min: s, max: i, step: o, format: u, value: f, onChange: m }) {
  const y = (f - s) / (i - s) * 100, p = `perf-${t.toLowerCase()}`;
  return /* @__PURE__ */ c.jsxs("div", { className: Ik, children: [
    /* @__PURE__ */ c.jsxs("div", { className: Vk, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: p, className: qk, children: t }),
      /* @__PURE__ */ c.jsx("span", { className: Hk, children: a })
    ] }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: p,
        type: "range",
        min: s,
        max: i,
        step: o,
        value: f,
        className: Fk,
        style: { "--fill": `${y}%` },
        onChange: (b) => m(Number(b.target.value))
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: Pk, children: u(f) })
  ] });
}
var Kk = "qe93dj0", Xk = "qe93dj1", Qk = "qe93dj2", Zk = "qe93dj3", Jk = "qe93dj4", Wk = "qe93dj5", e5 = "qe93dj6", t5 = { ok: "qe93dj7", warn: "qe93dj8", info: "qe93dj9" }, n5 = "qe93dja", a5 = "qe93djb";
function r5({ checks: t }) {
  const a = t.filter((s) => s.status === "ok").length;
  return /* @__PURE__ */ c.jsxs("div", { className: Kk, children: [
    /* @__PURE__ */ c.jsxs("header", { className: Xk, children: [
      /* @__PURE__ */ c.jsx("span", { className: Qk, children: "Pre-flight" }),
      /* @__PURE__ */ c.jsxs("span", { className: Zk, children: [
        a,
        "/",
        t.length,
        " OK"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: Jk, children: t.map((s) => /* @__PURE__ */ c.jsxs("li", { className: Wk, children: [
      /* @__PURE__ */ c.jsx(
        "span",
        {
          "aria-hidden": "true",
          className: `${e5} ${t5[s.status]}`
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: n5, children: s.label }),
      s.detail && /* @__PURE__ */ c.jsx("span", { className: a5, children: s.detail })
    ] }, s.id)) })
  ] });
}
var rb = "_17fbpt30", sb = "_17fbpt31", ib = "_17fbpt32", s5 = "_17fbpt33", i5 = "_17fbpt34", l5 = "_17fbpt35", lb = "_17fbpt36", o5 = "_17fbpt37", c5 = "_17fbpt38";
const u5 = {
  completed: "success",
  running: "accent",
  queued: "neutral",
  failed: "danger",
  cancelled: "faint",
  partial: "warning"
};
function d5({
  runs: t,
  deploymentId: a,
  onOpenQueue: s,
  onOpenRun: i,
  emptyHint: o
}) {
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: rb, children: [
    /* @__PURE__ */ c.jsx("header", { className: sb, children: /* @__PURE__ */ c.jsx(
      "a",
      {
        className: ib,
        href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
        onClick: s ? (u) => {
          u.preventDefault(), s();
        } : void 0,
        children: "Open queue →"
      }
    ) }),
    /* @__PURE__ */ c.jsx("p", { className: o5, children: "No runs yet." }),
    /* @__PURE__ */ c.jsx("p", { className: c5, children: o ?? "Hit Generate to enqueue a batch." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: rb, children: [
    /* @__PURE__ */ c.jsxs("header", { className: sb, children: [
      /* @__PURE__ */ c.jsx("span", {}),
      /* @__PURE__ */ c.jsx(
        "a",
        {
          className: ib,
          href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
          onClick: s ? (u) => {
            u.preventDefault(), s();
          } : void 0,
          children: "Open queue →"
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: s5, children: t.slice(0, 5).map((u) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: i5,
        onClick: i ? () => i(u.runId) : void 0,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: l5, children: u.runId }),
          /* @__PURE__ */ c.jsx("span", { className: `${I1.sm} ${V1[u5[u.status] ?? "neutral"]}`, children: u.status }),
          /* @__PURE__ */ c.jsx("span", { className: lb, children: f5(u.startedAt ?? u.queuedAt) }),
          /* @__PURE__ */ c.jsx("span", { className: lb, children: u.kind })
        ]
      }
    ) }, u.runId)) })
  ] });
}
function f5(t) {
  if (!t) return "—";
  const a = t > 1e12 ? Math.floor(t / 1e3) : t, s = new Date(a * 1e3);
  if (Number.isNaN(s.getTime())) return "—";
  const o = Date.now() - s.getTime();
  return o < 6e4 ? "just now" : o < 36e5 ? `${Math.floor(o / 6e4)}m ago` : o < 864e5 ? `${Math.floor(o / 36e5)}h ago` : s.toISOString().slice(0, 16).replace("T", " ");
}
const Q1 = g.createContext({});
function am(t) {
  const a = g.useRef(null);
  return a.current === null && (a.current = t()), a.current;
}
const h5 = typeof window < "u", Z1 = h5 ? g.useLayoutEffect : g.useEffect, Xc = /* @__PURE__ */ g.createContext(null);
function m5(t, a) {
  t.indexOf(a) === -1 && t.push(a);
}
function p5(t, a) {
  const s = t.indexOf(a);
  s > -1 && t.splice(s, 1);
}
const Nr = (t, a, s) => s > a ? a : s < t ? t : s;
function ob(t, a) {
  return a ? `${t}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : t;
}
let _l = () => {
}, ei = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (_l = (t, a, s) => {
  !t && typeof console < "u" && console.warn(ob(a, s));
}, ei = (t, a, s) => {
  if (!t)
    throw new Error(ob(a, s));
});
const Cr = {}, J1 = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function g5(t) {
  return typeof t == "object" && t !== null;
}
const W1 = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function eS(t) {
  let a;
  return () => (a === void 0 && (a = t()), a);
}
const ri = /* @__NO_SIDE_EFFECTS__ */ (t) => t, v5 = (t, a) => (s) => a(t(s)), Qc = (...t) => t.reduce(v5), tS = /* @__NO_SIDE_EFFECTS__ */ (t, a, s) => {
  const i = a - t;
  return i === 0 ? 1 : (s - t) / i;
};
class nS {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return m5(this.subscriptions, a), () => p5(this.subscriptions, a);
  }
  notify(a, s, i) {
    const o = this.subscriptions.length;
    if (o)
      if (o === 1)
        this.subscriptions[0](a, s, i);
      else
        for (let u = 0; u < o; u++) {
          const f = this.subscriptions[u];
          f && f(a, s, i);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const ta = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, ua = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3;
function aS(t, a) {
  return a ? t * (1e3 / a) : 0;
}
const rS = (t, a, s) => (((1 - 3 * s + 3 * a) * t + (3 * s - 6 * a)) * t + 3 * a) * t, y5 = 1e-7, b5 = 12;
function x5(t, a, s, i, o) {
  let u, f, m = 0;
  do
    f = a + (s - a) / 2, u = rS(f, i, o) - t, u > 0 ? s = f : a = f;
  while (Math.abs(u) > y5 && ++m < b5);
  return f;
}
function Ml(t, a, s, i) {
  if (t === a && s === i)
    return ri;
  const o = (u) => x5(u, 0, 1, t, s);
  return (u) => u === 0 || u === 1 ? u : rS(o(u), a, i);
}
const sS = (t) => (a) => a <= 0.5 ? t(2 * a) / 2 : (2 - t(2 * (1 - a))) / 2, iS = (t) => (a) => 1 - t(1 - a), lS = /* @__PURE__ */ Ml(0.33, 1.53, 0.69, 0.99), rm = /* @__PURE__ */ iS(lS), oS = /* @__PURE__ */ sS(rm), cS = (t) => t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * rm(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), sm = (t) => 1 - Math.sin(Math.acos(t)), S5 = iS(sm), uS = sS(sm), w5 = /* @__PURE__ */ Ml(0.42, 0, 1, 1), j5 = /* @__PURE__ */ Ml(0, 0, 0.58, 1), dS = /* @__PURE__ */ Ml(0.42, 0, 0.58, 1), E5 = (t) => Array.isArray(t) && typeof t[0] != "number", fS = (t) => Array.isArray(t) && typeof t[0] == "number", cb = {
  linear: ri,
  easeIn: w5,
  easeInOut: dS,
  easeOut: j5,
  circIn: sm,
  circInOut: uS,
  circOut: S5,
  backIn: rm,
  backInOut: oS,
  backOut: lS,
  anticipate: cS
}, N5 = (t) => typeof t == "string", ub = (t) => {
  if (fS(t)) {
    ei(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, s, i, o] = t;
    return Ml(a, s, i, o);
  } else if (N5(t))
    return ei(cb[t] !== void 0, `Invalid easing type '${t}'`, "invalid-easing-type"), cb[t];
  return t;
}, ac = [
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
function C5(t, a) {
  let s = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), o = !1, u = !1;
  const f = /* @__PURE__ */ new WeakSet();
  let m = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function y(b) {
    f.has(b) && (p.schedule(b), t()), b(m);
  }
  const p = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (b, v = !1, S = !1) => {
      const j = S && o ? s : i;
      return v && f.add(b), j.add(b), b;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (b) => {
      i.delete(b), f.delete(b);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (b) => {
      if (m = b, o) {
        u = !0;
        return;
      }
      o = !0;
      const v = s;
      s = i, i = v, s.forEach(y), s.clear(), o = !1, u && (u = !1, p.process(b));
    }
  };
  return p;
}
const T5 = 40;
function hS(t, a) {
  let s = !1, i = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, u = () => s = !0, f = ac.reduce((R, N) => (R[N] = C5(u), R), {}), { setup: m, read: y, resolveKeyframes: p, preUpdate: b, update: v, preRender: S, render: w, postRender: j } = f, C = () => {
    const R = Cr.useManualTiming, N = R ? o.timestamp : performance.now();
    s = !1, R || (o.delta = i ? 1e3 / 60 : Math.max(Math.min(N - o.timestamp, T5), 1)), o.timestamp = N, o.isProcessing = !0, m.process(o), y.process(o), p.process(o), b.process(o), v.process(o), S.process(o), w.process(o), j.process(o), o.isProcessing = !1, s && a && (i = !1, t(C));
  }, _ = () => {
    s = !0, i = !0, o.isProcessing || t(C);
  };
  return { schedule: ac.reduce((R, N) => {
    const B = f[N];
    return R[N] = (G, te = !1, M = !1) => (s || _(), B.schedule(G, te, M)), R;
  }, {}), cancel: (R) => {
    for (let N = 0; N < ac.length; N++)
      f[ac[N]].cancel(R);
  }, state: o, steps: f };
}
const { schedule: na, cancel: oh, state: _c } = /* @__PURE__ */ hS(typeof requestAnimationFrame < "u" ? requestAnimationFrame : ri, !0);
let Sc;
function R5() {
  Sc = void 0;
}
const Hn = {
  now: () => (Sc === void 0 && Hn.set(_c.isProcessing || Cr.useManualTiming ? _c.timestamp : performance.now()), Sc),
  set: (t) => {
    Sc = t, queueMicrotask(R5);
  }
}, mS = (t) => (a) => typeof a == "string" && a.startsWith(t), pS = /* @__PURE__ */ mS("--"), _5 = /* @__PURE__ */ mS("var(--"), im = (t) => _5(t) ? M5.test(t.split("/*")[0].trim()) : !1, M5 = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function db(t) {
  return typeof t != "string" ? !1 : t.split("/*")[0].includes("var(--");
}
const si = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, wl = {
  ...si,
  transform: (t) => Nr(0, 1, t)
}, rc = {
  ...si,
  default: 1
}, ml = (t) => Math.round(t * 1e5) / 1e5, lm = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function A5(t) {
  return t == null;
}
const k5 = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, om = (t, a) => (s) => !!(typeof s == "string" && k5.test(s) && s.startsWith(t) || a && !A5(s) && Object.prototype.hasOwnProperty.call(s, a)), gS = (t, a, s) => (i) => {
  if (typeof i != "string")
    return i;
  const [o, u, f, m] = i.match(lm);
  return {
    [t]: parseFloat(o),
    [a]: parseFloat(u),
    [s]: parseFloat(f),
    alpha: m !== void 0 ? parseFloat(m) : 1
  };
}, D5 = (t) => Nr(0, 255, t), $f = {
  ...si,
  transform: (t) => Math.round(D5(t))
}, Qr = {
  test: /* @__PURE__ */ om("rgb", "red"),
  parse: /* @__PURE__ */ gS("red", "green", "blue"),
  transform: ({ red: t, green: a, blue: s, alpha: i = 1 }) => "rgba(" + $f.transform(t) + ", " + $f.transform(a) + ", " + $f.transform(s) + ", " + ml(wl.transform(i)) + ")"
};
function z5(t) {
  let a = "", s = "", i = "", o = "";
  return t.length > 5 ? (a = t.substring(1, 3), s = t.substring(3, 5), i = t.substring(5, 7), o = t.substring(7, 9)) : (a = t.substring(1, 2), s = t.substring(2, 3), i = t.substring(3, 4), o = t.substring(4, 5), a += a, s += s, i += i, o += o), {
    red: parseInt(a, 16),
    green: parseInt(s, 16),
    blue: parseInt(i, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const ch = {
  test: /* @__PURE__ */ om("#"),
  parse: z5,
  transform: Qr.transform
}, Al = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (a) => typeof a == "string" && a.endsWith(t) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${t}`
}), yr = /* @__PURE__ */ Al("deg"), Qs = /* @__PURE__ */ Al("%"), Oe = /* @__PURE__ */ Al("px"), O5 = /* @__PURE__ */ Al("vh"), L5 = /* @__PURE__ */ Al("vw"), fb = {
  ...Qs,
  parse: (t) => Qs.parse(t) / 100,
  transform: (t) => Qs.transform(t * 100)
}, Ks = {
  test: /* @__PURE__ */ om("hsl", "hue"),
  parse: /* @__PURE__ */ gS("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: a, lightness: s, alpha: i = 1 }) => "hsla(" + Math.round(t) + ", " + Qs.transform(ml(a)) + ", " + Qs.transform(ml(s)) + ", " + ml(wl.transform(i)) + ")"
}, nn = {
  test: (t) => Qr.test(t) || ch.test(t) || Ks.test(t),
  parse: (t) => Qr.test(t) ? Qr.parse(t) : Ks.test(t) ? Ks.parse(t) : ch.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? Qr.transform(t) : Ks.transform(t),
  getAnimatableNone: (t) => {
    const a = nn.parse(t);
    return a.alpha = 0, nn.transform(a);
  }
}, $5 = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function U5(t) {
  return isNaN(t) && typeof t == "string" && (t.match(lm)?.length || 0) + (t.match($5)?.length || 0) > 0;
}
const vS = "number", yS = "color", B5 = "var", I5 = "var(", hb = "${}", V5 = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function ti(t) {
  const a = t.toString(), s = [], i = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let u = 0;
  const m = a.replace(V5, (y) => (nn.test(y) ? (i.color.push(u), o.push(yS), s.push(nn.parse(y))) : y.startsWith(I5) ? (i.var.push(u), o.push(B5), s.push(y)) : (i.number.push(u), o.push(vS), s.push(parseFloat(y))), ++u, hb)).split(hb);
  return { values: s, split: m, indexes: i, types: o };
}
function q5(t) {
  return ti(t).values;
}
function bS({ split: t, types: a }) {
  const s = t.length;
  return (i) => {
    let o = "";
    for (let u = 0; u < s; u++)
      if (o += t[u], i[u] !== void 0) {
        const f = a[u];
        f === vS ? o += ml(i[u]) : f === yS ? o += nn.transform(i[u]) : o += i[u];
      }
    return o;
  };
}
function H5(t) {
  return bS(ti(t));
}
const F5 = (t) => typeof t == "number" ? 0 : nn.test(t) ? nn.getAnimatableNone(t) : t, P5 = (t, a) => typeof t == "number" ? a?.trim().endsWith("/") ? t : 0 : F5(t);
function G5(t) {
  const a = ti(t);
  return bS(a)(a.values.map((i, o) => P5(i, a.split[o])));
}
const da = {
  test: U5,
  parse: q5,
  createTransformer: H5,
  getAnimatableNone: G5
};
function Uf(t, a, s) {
  return s < 0 && (s += 1), s > 1 && (s -= 1), s < 1 / 6 ? t + (a - t) * 6 * s : s < 1 / 2 ? a : s < 2 / 3 ? t + (a - t) * (2 / 3 - s) * 6 : t;
}
function Y5({ hue: t, saturation: a, lightness: s, alpha: i }) {
  t /= 360, a /= 100, s /= 100;
  let o = 0, u = 0, f = 0;
  if (!a)
    o = u = f = s;
  else {
    const m = s < 0.5 ? s * (1 + a) : s + a - s * a, y = 2 * s - m;
    o = Uf(y, m, t + 1 / 3), u = Uf(y, m, t), f = Uf(y, m, t - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(u * 255),
    blue: Math.round(f * 255),
    alpha: i
  };
}
function Mc(t, a) {
  return (s) => s > 0 ? a : t;
}
const kl = (t, a, s) => t + (a - t) * s, Bf = (t, a, s) => {
  const i = t * t, o = s * (a * a - i) + i;
  return o < 0 ? 0 : Math.sqrt(o);
}, K5 = [ch, Qr, Ks], X5 = (t) => K5.find((a) => a.test(t));
function mb(t) {
  const a = X5(t);
  if (_l(!!a, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let s = a.parse(t);
  return a === Ks && (s = Y5(s)), s;
}
const pb = (t, a) => {
  const s = mb(t), i = mb(a);
  if (!s || !i)
    return Mc(t, a);
  const o = { ...s };
  return (u) => (o.red = Bf(s.red, i.red, u), o.green = Bf(s.green, i.green, u), o.blue = Bf(s.blue, i.blue, u), o.alpha = kl(s.alpha, i.alpha, u), Qr.transform(o));
}, uh = /* @__PURE__ */ new Set(["none", "hidden"]);
function Q5(t, a) {
  return uh.has(t) ? (s) => s <= 0 ? t : a : (s) => s >= 1 ? a : t;
}
function Z5(t, a) {
  return (s) => kl(t, a, s);
}
function cm(t) {
  return typeof t == "number" ? Z5 : typeof t == "string" ? im(t) ? Mc : nn.test(t) ? pb : eD : Array.isArray(t) ? xS : typeof t == "object" ? nn.test(t) ? pb : J5 : Mc;
}
function xS(t, a) {
  const s = [...t], i = s.length, o = t.map((u, f) => cm(u)(u, a[f]));
  return (u) => {
    for (let f = 0; f < i; f++)
      s[f] = o[f](u);
    return s;
  };
}
function J5(t, a) {
  const s = { ...t, ...a }, i = {};
  for (const o in s)
    t[o] !== void 0 && a[o] !== void 0 && (i[o] = cm(t[o])(t[o], a[o]));
  return (o) => {
    for (const u in i)
      s[u] = i[u](o);
    return s;
  };
}
function W5(t, a) {
  const s = [], i = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const u = a.types[o], f = t.indexes[u][i[u]], m = t.values[f] ?? 0;
    s[o] = m, i[u]++;
  }
  return s;
}
const eD = (t, a) => {
  const s = da.createTransformer(a), i = ti(t), o = ti(a);
  return i.indexes.var.length === o.indexes.var.length && i.indexes.color.length === o.indexes.color.length && i.indexes.number.length >= o.indexes.number.length ? uh.has(t) && !o.values.length || uh.has(a) && !i.values.length ? Q5(t, a) : Qc(xS(W5(i, o), o.values), s) : (_l(!0, `Complex values '${t}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Mc(t, a));
};
function SS(t, a, s) {
  return typeof t == "number" && typeof a == "number" && typeof s == "number" ? kl(t, a, s) : cm(t)(t, a);
}
const tD = (t) => {
  const a = ({ timestamp: s }) => t(s);
  return {
    start: (s = !0) => na.update(a, s),
    stop: () => oh(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => _c.isProcessing ? _c.timestamp : Hn.now()
  };
}, wS = (t, a, s = 10) => {
  let i = "";
  const o = Math.max(Math.round(a / s), 2);
  for (let u = 0; u < o; u++)
    i += Math.round(t(u / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${i.substring(0, i.length - 2)})`;
}, Ac = 2e4;
function um(t) {
  let a = 0;
  const s = 50;
  let i = t.next(a);
  for (; !i.done && a < Ac; )
    a += s, i = t.next(a);
  return a >= Ac ? 1 / 0 : a;
}
function nD(t, a = 100, s) {
  const i = s({ ...t, keyframes: [0, a] }), o = Math.min(um(i), Ac);
  return {
    type: "keyframes",
    ease: (u) => i.next(o * u).value / a,
    duration: /* @__PURE__ */ ua(o)
  };
}
const Vt = {
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
function dh(t, a) {
  return t * Math.sqrt(1 - a * a);
}
const aD = 12;
function rD(t, a, s) {
  let i = s;
  for (let o = 1; o < aD; o++)
    i = i - t(i) / a(i);
  return i;
}
const If = 1e-3;
function sD({ duration: t = Vt.duration, bounce: a = Vt.bounce, velocity: s = Vt.velocity, mass: i = Vt.mass }) {
  let o, u;
  _l(t <= /* @__PURE__ */ ta(Vt.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let f = 1 - a;
  f = Nr(Vt.minDamping, Vt.maxDamping, f), t = Nr(Vt.minDuration, Vt.maxDuration, /* @__PURE__ */ ua(t)), f < 1 ? (o = (p) => {
    const b = p * f, v = b * t, S = b - s, w = dh(p, f), j = Math.exp(-v);
    return If - S / w * j;
  }, u = (p) => {
    const v = p * f * t, S = v * s + s, w = Math.pow(f, 2) * Math.pow(p, 2) * t, j = Math.exp(-v), C = dh(Math.pow(p, 2), f);
    return (-o(p) + If > 0 ? -1 : 1) * ((S - w) * j) / C;
  }) : (o = (p) => {
    const b = Math.exp(-p * t), v = (p - s) * t + 1;
    return -If + b * v;
  }, u = (p) => {
    const b = Math.exp(-p * t), v = (s - p) * (t * t);
    return b * v;
  });
  const m = 5 / t, y = rD(o, u, m);
  if (t = /* @__PURE__ */ ta(t), isNaN(y))
    return {
      stiffness: Vt.stiffness,
      damping: Vt.damping,
      duration: t
    };
  {
    const p = Math.pow(y, 2) * i;
    return {
      stiffness: p,
      damping: f * 2 * Math.sqrt(i * p),
      duration: t
    };
  }
}
const iD = ["duration", "bounce"], lD = ["stiffness", "damping", "mass"];
function gb(t, a) {
  return a.some((s) => t[s] !== void 0);
}
function oD(t) {
  let a = {
    velocity: Vt.velocity,
    stiffness: Vt.stiffness,
    damping: Vt.damping,
    mass: Vt.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!gb(t, lD) && gb(t, iD))
    if (a.velocity = 0, t.visualDuration) {
      const s = t.visualDuration, i = 2 * Math.PI / (s * 1.2), o = i * i, u = 2 * Nr(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: Vt.mass,
        stiffness: o,
        damping: u
      };
    } else {
      const s = sD({ ...t, velocity: 0 });
      a = {
        ...a,
        ...s,
        mass: Vt.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function kc(t = Vt.visualDuration, a = Vt.bounce) {
  const s = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: a
  } : t;
  let { restSpeed: i, restDelta: o } = s;
  const u = s.keyframes[0], f = s.keyframes[s.keyframes.length - 1], m = { done: !1, value: u }, { stiffness: y, damping: p, mass: b, duration: v, velocity: S, isResolvedFromDuration: w } = oD({
    ...s,
    velocity: -/* @__PURE__ */ ua(s.velocity || 0)
  }), j = S || 0, C = p / (2 * Math.sqrt(y * b)), _ = f - u, T = /* @__PURE__ */ ua(Math.sqrt(y / b)), O = Math.abs(_) < 5;
  i || (i = O ? Vt.restSpeed.granular : Vt.restSpeed.default), o || (o = O ? Vt.restDelta.granular : Vt.restDelta.default);
  let R, N, B, G, te, M;
  if (C < 1)
    B = dh(T, C), G = (j + C * T * _) / B, R = (D) => {
      const F = Math.exp(-C * T * D);
      return f - F * (G * Math.sin(B * D) + _ * Math.cos(B * D));
    }, te = C * T * G + _ * B, M = C * T * _ - G * B, N = (D) => Math.exp(-C * T * D) * (te * Math.sin(B * D) + M * Math.cos(B * D));
  else if (C === 1) {
    R = (F) => f - Math.exp(-T * F) * (_ + (j + T * _) * F);
    const D = j + T * _;
    N = (F) => Math.exp(-T * F) * (T * D * F - j);
  } else {
    const D = T * Math.sqrt(C * C - 1);
    R = (P) => {
      const ie = Math.exp(-C * T * P), A = Math.min(D * P, 300);
      return f - ie * ((j + C * T * _) * Math.sinh(A) + D * _ * Math.cosh(A)) / D;
    };
    const F = (j + C * T * _) / D, Z = C * T * F - _ * D, J = C * T * _ - F * D;
    N = (P) => {
      const ie = Math.exp(-C * T * P), A = Math.min(D * P, 300);
      return ie * (Z * Math.sinh(A) + J * Math.cosh(A));
    };
  }
  const q = {
    calculatedDuration: w && v || null,
    velocity: (D) => /* @__PURE__ */ ta(N(D)),
    next: (D) => {
      if (!w && C < 1) {
        const Z = Math.exp(-C * T * D), J = Math.sin(B * D), P = Math.cos(B * D), ie = f - Z * (G * J + _ * P), A = /* @__PURE__ */ ta(Z * (te * J + M * P));
        return m.done = Math.abs(A) <= i && Math.abs(f - ie) <= o, m.value = m.done ? f : ie, m;
      }
      const F = R(D);
      if (w)
        m.done = D >= v;
      else {
        const Z = /* @__PURE__ */ ta(N(D));
        m.done = Math.abs(Z) <= i && Math.abs(f - F) <= o;
      }
      return m.value = m.done ? f : F, m;
    },
    toString: () => {
      const D = Math.min(um(q), Ac), F = wS((Z) => q.next(D * Z).value, D, 30);
      return D + "ms " + F;
    },
    toTransition: () => {
    }
  };
  return q;
}
kc.applyToOptions = (t) => {
  const a = nD(t, 100, kc);
  return t.ease = a.ease, t.duration = /* @__PURE__ */ ta(a.duration), t.type = "keyframes", t;
};
const cD = 5;
function jS(t, a, s) {
  const i = Math.max(a - cD, 0);
  return aS(s - t(i), a - i);
}
function fh({ keyframes: t, velocity: a = 0, power: s = 0.8, timeConstant: i = 325, bounceDamping: o = 10, bounceStiffness: u = 500, modifyTarget: f, min: m, max: y, restDelta: p = 0.5, restSpeed: b }) {
  const v = t[0], S = {
    done: !1,
    value: v
  }, w = (M) => m !== void 0 && M < m || y !== void 0 && M > y, j = (M) => m === void 0 ? y : y === void 0 || Math.abs(m - M) < Math.abs(y - M) ? m : y;
  let C = s * a;
  const _ = v + C, T = f === void 0 ? _ : f(_);
  T !== _ && (C = T - v);
  const O = (M) => -C * Math.exp(-M / i), R = (M) => T + O(M), N = (M) => {
    const q = O(M), D = R(M);
    S.done = Math.abs(q) <= p, S.value = S.done ? T : D;
  };
  let B, G;
  const te = (M) => {
    w(S.value) && (B = M, G = kc({
      keyframes: [S.value, j(S.value)],
      velocity: jS(R, M, S.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: u,
      restDelta: p,
      restSpeed: b
    }));
  };
  return te(0), {
    calculatedDuration: null,
    next: (M) => {
      let q = !1;
      return !G && B === void 0 && (q = !0, N(M), te(M)), B !== void 0 && M >= B ? G.next(M - B) : (!q && N(M), S);
    }
  };
}
function uD(t, a, s) {
  const i = [], o = s || Cr.mix || SS, u = t.length - 1;
  for (let f = 0; f < u; f++) {
    let m = o(t[f], t[f + 1]);
    if (a) {
      const y = Array.isArray(a) ? a[f] || ri : a;
      m = Qc(y, m);
    }
    i.push(m);
  }
  return i;
}
function dD(t, a, { clamp: s = !0, ease: i, mixer: o } = {}) {
  const u = t.length;
  if (ei(u === a.length, "Both input and output ranges must be the same length", "range-length"), u === 1)
    return () => a[0];
  if (u === 2 && a[0] === a[1])
    return () => a[1];
  const f = t[0] === t[1];
  t[0] > t[u - 1] && (t = [...t].reverse(), a = [...a].reverse());
  const m = uD(a, i, o), y = m.length, p = (b) => {
    if (f && b < t[0])
      return a[0];
    let v = 0;
    if (y > 1)
      for (; v < t.length - 2 && !(b < t[v + 1]); v++)
        ;
    const S = /* @__PURE__ */ tS(t[v], t[v + 1], b);
    return m[v](S);
  };
  return s ? (b) => p(Nr(t[0], t[u - 1], b)) : p;
}
function fD(t, a) {
  const s = t[t.length - 1];
  for (let i = 1; i <= a; i++) {
    const o = /* @__PURE__ */ tS(0, a, i);
    t.push(kl(s, 1, o));
  }
}
function hD(t) {
  const a = [0];
  return fD(a, t.length - 1), a;
}
function mD(t, a) {
  return t.map((s) => s * a);
}
function pD(t, a) {
  return t.map(() => a || dS).splice(0, t.length - 1);
}
function pl({ duration: t = 300, keyframes: a, times: s, ease: i = "easeInOut" }) {
  const o = E5(i) ? i.map(ub) : ub(i), u = {
    done: !1,
    value: a[0]
  }, f = mD(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    s && s.length === a.length ? s : hD(a),
    t
  ), m = dD(f, a, {
    ease: Array.isArray(o) ? o : pD(a, o)
  });
  return {
    calculatedDuration: t,
    next: (y) => (u.value = m(y), u.done = y >= t, u)
  };
}
const gD = (t) => t !== null;
function Zc(t, { repeat: a, repeatType: s = "loop" }, i, o = 1) {
  const u = t.filter(gD), m = o < 0 || a && s !== "loop" && a % 2 === 1 ? 0 : u.length - 1;
  return !m || i === void 0 ? u[m] : i;
}
const vD = {
  decay: fh,
  inertia: fh,
  tween: pl,
  keyframes: pl,
  spring: kc
};
function ES(t) {
  typeof t.type == "string" && (t.type = vD[t.type]);
}
class dm {
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
  then(a, s) {
    return this.finished.then(a, s);
  }
}
const yD = (t) => t / 100;
class Dc extends dm {
  constructor(a) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: s } = this.options;
      s && s.updatedAt !== Hn.now() && this.tick(Hn.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = a, this.initAnimation(), this.play(), a.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: a } = this;
    ES(a);
    const { type: s = pl, repeat: i = 0, repeatDelay: o = 0, repeatType: u, velocity: f = 0 } = a;
    let { keyframes: m } = a;
    const y = s || pl;
    y !== pl && typeof m[0] != "number" && (this.mixKeyframes = Qc(yD, SS(m[0], m[1])), m = [0, 100]);
    const p = y({ ...a, keyframes: m });
    u === "mirror" && (this.mirroredGenerator = y({
      ...a,
      keyframes: [...m].reverse(),
      velocity: -f
    })), p.calculatedDuration === null && (p.calculatedDuration = um(p));
    const { calculatedDuration: b } = p;
    this.calculatedDuration = b, this.resolvedDuration = b + o, this.totalDuration = this.resolvedDuration * (i + 1) - o, this.generator = p;
  }
  updateTime(a) {
    const s = Math.round(a - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = s;
  }
  tick(a, s = !1) {
    const { generator: i, totalDuration: o, mixKeyframes: u, mirroredGenerator: f, resolvedDuration: m, calculatedDuration: y } = this;
    if (this.startTime === null)
      return i.next(0);
    const { delay: p = 0, keyframes: b, repeat: v, repeatType: S, repeatDelay: w, type: j, onUpdate: C, finalKeyframe: _ } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), s ? this.currentTime = a : this.updateTime(a);
    const T = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1), O = this.playbackSpeed >= 0 ? T < 0 : T > o;
    this.currentTime = Math.max(T, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let R = this.currentTime, N = i;
    if (v) {
      const M = Math.min(this.currentTime, o) / m;
      let q = Math.floor(M), D = M % 1;
      !D && M >= 1 && (D = 1), D === 1 && q--, q = Math.min(q, v + 1), !!(q % 2) && (S === "reverse" ? (D = 1 - D, w && (D -= w / m)) : S === "mirror" && (N = f)), R = Nr(0, 1, D) * m;
    }
    let B;
    O ? (this.delayState.value = b[0], B = this.delayState) : B = N.next(R), u && !O && (B.value = u(B.value));
    let { done: G } = B;
    !O && y !== null && (G = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const te = this.holdTime === null && (this.state === "finished" || this.state === "running" && G);
    return te && j !== fh && (B.value = Zc(b, this.options, _, this.speed)), C && C(B.value), te && this.finish(), B;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(a, s) {
    return this.finished.then(a, s);
  }
  get duration() {
    return /* @__PURE__ */ ua(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ ua(a);
  }
  get time() {
    return /* @__PURE__ */ ua(this.currentTime);
  }
  set time(a) {
    a = /* @__PURE__ */ ta(a), this.currentTime = a, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = a : this.driver && (this.startTime = this.driver.now() - a / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = a, this.tick(a));
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
    const s = this.generator.next(a).value;
    return jS((i) => this.generator.next(i).value, a, s);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(a) {
    const s = this.playbackSpeed !== a;
    s && this.driver && this.updateTime(Hn.now()), this.playbackSpeed = a, s && this.driver && (this.time = /* @__PURE__ */ ua(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: a = tD, startTime: s } = this.options;
    this.driver || (this.driver = a((o) => this.tick(o))), this.options.onPlay?.();
    const i = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = i) : this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime || (this.startTime = s ?? i), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(Hn.now()), this.holdTime = this.currentTime;
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
function bD(t) {
  for (let a = 1; a < t.length; a++)
    t[a] ?? (t[a] = t[a - 1]);
}
const Zr = (t) => t * 180 / Math.PI, hh = (t) => {
  const a = Zr(Math.atan2(t[1], t[0]));
  return mh(a);
}, xD = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: hh,
  rotateZ: hh,
  skewX: (t) => Zr(Math.atan(t[1])),
  skewY: (t) => Zr(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, mh = (t) => (t = t % 360, t < 0 && (t += 360), t), vb = hh, yb = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), bb = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), SD = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: yb,
  scaleY: bb,
  scale: (t) => (yb(t) + bb(t)) / 2,
  rotateX: (t) => mh(Zr(Math.atan2(t[6], t[5]))),
  rotateY: (t) => mh(Zr(Math.atan2(-t[2], t[0]))),
  rotateZ: vb,
  rotate: vb,
  skewX: (t) => Zr(Math.atan(t[4])),
  skewY: (t) => Zr(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function ph(t) {
  return t.includes("scale") ? 1 : 0;
}
function gh(t, a) {
  if (!t || t === "none")
    return ph(a);
  const s = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let i, o;
  if (s)
    i = SD, o = s;
  else {
    const m = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = xD, o = m;
  }
  if (!o)
    return ph(a);
  const u = i[a], f = o[1].split(",").map(jD);
  return typeof u == "function" ? u(f) : f[u];
}
const wD = (t, a) => {
  const { transform: s = "none" } = getComputedStyle(t);
  return gh(s, a);
};
function jD(t) {
  return parseFloat(t.trim());
}
const ii = [
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
], li = new Set(ii), xb = (t) => t === si || t === Oe, ED = /* @__PURE__ */ new Set(["x", "y", "z"]), ND = ii.filter((t) => !ED.has(t));
function CD(t) {
  const a = [];
  return ND.forEach((s) => {
    const i = t.getValue(s);
    i !== void 0 && (a.push([s, i.get()]), i.set(s.startsWith("scale") ? 1 : 0));
  }), a;
}
const jr = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: a = "0", paddingRight: s = "0", boxSizing: i }) => {
    const o = t.max - t.min;
    return i === "border-box" ? o : o - parseFloat(a) - parseFloat(s);
  },
  height: ({ y: t }, { paddingTop: a = "0", paddingBottom: s = "0", boxSizing: i }) => {
    const o = t.max - t.min;
    return i === "border-box" ? o : o - parseFloat(a) - parseFloat(s);
  },
  top: (t, { top: a }) => parseFloat(a),
  left: (t, { left: a }) => parseFloat(a),
  bottom: ({ y: t }, { top: a }) => parseFloat(a) + (t.max - t.min),
  right: ({ x: t }, { left: a }) => parseFloat(a) + (t.max - t.min),
  // Transform
  x: (t, { transform: a }) => gh(a, "x"),
  y: (t, { transform: a }) => gh(a, "y")
};
jr.translateX = jr.x;
jr.translateY = jr.y;
const Wr = /* @__PURE__ */ new Set();
let vh = !1, yh = !1, bh = !1;
function NS() {
  if (yh) {
    const t = Array.from(Wr).filter((i) => i.needsMeasurement), a = new Set(t.map((i) => i.element)), s = /* @__PURE__ */ new Map();
    a.forEach((i) => {
      const o = CD(i);
      o.length && (s.set(i, o), i.render());
    }), t.forEach((i) => i.measureInitialState()), a.forEach((i) => {
      i.render();
      const o = s.get(i);
      o && o.forEach(([u, f]) => {
        i.getValue(u)?.set(f);
      });
    }), t.forEach((i) => i.measureEndState()), t.forEach((i) => {
      i.suspendedScrollY !== void 0 && window.scrollTo(0, i.suspendedScrollY);
    });
  }
  yh = !1, vh = !1, Wr.forEach((t) => t.complete(bh)), Wr.clear();
}
function CS() {
  Wr.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (yh = !0);
  });
}
function TD() {
  bh = !0, CS(), NS(), bh = !1;
}
class fm {
  constructor(a, s, i, o, u, f = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = s, this.name = i, this.motionValue = o, this.element = u, this.isAsync = f;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Wr.add(this), vh || (vh = !0, na.read(CS), na.resolveKeyframes(NS))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, name: s, element: i, motionValue: o } = this;
    if (a[0] === null) {
      const u = o?.get(), f = a[a.length - 1];
      if (u !== void 0)
        a[0] = u;
      else if (i && s) {
        const m = i.readValue(s, f);
        m != null && (a[0] = m);
      }
      a[0] === void 0 && (a[0] = f), o && u === void 0 && o.set(a[0]);
    }
    bD(a);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, a), Wr.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Wr.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const RD = (t) => t.startsWith("--");
function TS(t, a, s) {
  RD(a) ? t.style.setProperty(a, s) : t.style[a] = s;
}
const _D = {};
function RS(t, a) {
  const s = /* @__PURE__ */ eS(t);
  return () => _D[a] ?? s();
}
const MD = /* @__PURE__ */ RS(() => window.ScrollTimeline !== void 0, "scrollTimeline"), _S = /* @__PURE__ */ RS(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), dl = ([t, a, s, i]) => `cubic-bezier(${t}, ${a}, ${s}, ${i})`, Sb = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ dl([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ dl([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ dl([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ dl([0.33, 1.53, 0.69, 0.99])
};
function MS(t, a) {
  if (t)
    return typeof t == "function" ? _S() ? wS(t, a) : "ease-out" : fS(t) ? dl(t) : Array.isArray(t) ? t.map((s) => MS(s, a) || Sb.easeOut) : Sb[t];
}
function AD(t, a, s, { delay: i = 0, duration: o = 300, repeat: u = 0, repeatType: f = "loop", ease: m = "easeOut", times: y } = {}, p = void 0) {
  const b = {
    [a]: s
  };
  y && (b.offset = y);
  const v = MS(m, o);
  Array.isArray(v) && (b.easing = v);
  const S = {
    delay: i,
    duration: o,
    easing: Array.isArray(v) ? "linear" : v,
    fill: "both",
    iterations: u + 1,
    direction: f === "reverse" ? "alternate" : "normal"
  };
  return p && (S.pseudoElement = p), t.animate(b, S);
}
function AS(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function kD({ type: t, ...a }) {
  return AS(t) && _S() ? t.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class kS extends dm {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: s, name: i, keyframes: o, pseudoElement: u, allowFlatten: f = !1, finalKeyframe: m, onComplete: y } = a;
    this.isPseudoElement = !!u, this.allowFlatten = f, this.options = a, ei(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const p = kD(a);
    this.animation = AD(s, i, o, p, u), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !u) {
        const b = Zc(o, this.options, m, this.speed);
        this.updateMotionValue && this.updateMotionValue(b), TS(s, i, b), this.animation.cancel();
      }
      y?.(), this.notifyFinished();
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
    return /* @__PURE__ */ ua(Number(a));
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ ua(a);
  }
  get time() {
    return /* @__PURE__ */ ua(Number(this.animation.currentTime) || 0);
  }
  set time(a) {
    const s = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ ta(a), s && this.animation.pause();
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
  attachTimeline({ timeline: a, rangeStart: s, rangeEnd: i, observe: o }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && MD() ? (this.animation.timeline = a, s && (this.animation.rangeStart = s), i && (this.animation.rangeEnd = i), ri) : o(this);
  }
}
const DS = {
  anticipate: cS,
  backInOut: oS,
  circInOut: uS
};
function DD(t) {
  return t in DS;
}
function zD(t) {
  typeof t.ease == "string" && DD(t.ease) && (t.ease = DS[t.ease]);
}
const Vf = 10;
class OD extends kS {
  constructor(a) {
    zD(a), ES(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const { motionValue: s, onUpdate: i, onComplete: o, element: u, ...f } = this.options;
    if (!s)
      return;
    if (a !== void 0) {
      s.set(a);
      return;
    }
    const m = new Dc({
      ...f,
      autoplay: !1
    }), y = Math.max(Vf, Hn.now() - this.startTime), p = Nr(0, Vf, y - Vf), b = m.sample(y).value, { name: v } = this.options;
    u && v && TS(u, v, b), s.setWithVelocity(m.sample(Math.max(0, y - p)).value, b, p), m.stop();
  }
}
const wb = (t, a) => a === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(da.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function LD(t) {
  const a = t[0];
  if (t.length === 1)
    return !0;
  for (let s = 0; s < t.length; s++)
    if (t[s] !== a)
      return !0;
}
function $D(t, a, s, i) {
  const o = t[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const u = t[t.length - 1], f = wb(o, a), m = wb(u, a);
  return _l(f === m, `You are trying to animate ${a} from "${o}" to "${u}". "${f ? u : o}" is not an animatable value.`, "value-not-animatable"), !f || !m ? !1 : LD(t) || (s === "spring" || AS(s)) && i;
}
function xh(t) {
  t.duration = 0, t.type = "keyframes";
}
const zS = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), UD = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function BD(t) {
  for (let a = 0; a < t.length; a++)
    if (typeof t[a] == "string" && UD.test(t[a]))
      return !0;
  return !1;
}
const ID = /* @__PURE__ */ new Set([
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
]), VD = /* @__PURE__ */ eS(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function qD(t) {
  const { motionValue: a, name: s, repeatDelay: i, repeatType: o, damping: u, type: f, keyframes: m } = t;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: p, transformTemplate: b } = a.owner.getProps();
  return VD() && s && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (zS.has(s) || ID.has(s) && BD(m)) && (s !== "transform" || !b) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !p && !i && o !== "mirror" && u !== 0 && f !== "inertia";
}
const HD = 40;
class FD extends dm {
  constructor({ autoplay: a = !0, delay: s = 0, type: i = "keyframes", repeat: o = 0, repeatDelay: u = 0, repeatType: f = "loop", keyframes: m, name: y, motionValue: p, element: b, ...v }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = Hn.now();
    const S = {
      autoplay: a,
      delay: s,
      type: i,
      repeat: o,
      repeatDelay: u,
      repeatType: f,
      name: y,
      motionValue: p,
      element: b,
      ...v
    }, w = b?.KeyframeResolver || fm;
    this.keyframeResolver = new w(m, (j, C, _) => this.onKeyframesResolved(j, C, S, !_), y, p, b), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, s, i, o) {
    this.keyframeResolver = void 0;
    const { name: u, type: f, velocity: m, delay: y, isHandoff: p, onUpdate: b } = i;
    this.resolvedAt = Hn.now();
    let v = !0;
    $D(a, u, f, m) || (v = !1, (Cr.instantAnimations || !y) && b?.(Zc(a, i, s)), a[0] = a[a.length - 1], xh(i), i.repeat = 0);
    const w = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > HD ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: s,
      ...i,
      keyframes: a
    }, j = v && !p && qD(w), C = w.motionValue?.owner?.current;
    let _;
    if (j)
      try {
        _ = new OD({
          ...w,
          element: C
        });
      } catch {
        _ = new Dc(w);
      }
    else
      _ = new Dc(w);
    _.finished.then(() => {
      this.notifyFinished();
    }).catch(ri), this.pendingTimeline && (this.stopTimeline = _.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = _;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(a, s) {
    return this.finished.finally(a).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), TD()), this._animation;
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
function OS(t, a, s, i = 0, o = 1) {
  const u = Array.from(t).sort((p, b) => p.sortNodePosition(b)).indexOf(a), f = t.size, m = (f - 1) * i;
  return typeof s == "function" ? s(u, f) : o === 1 ? u * i : m - u * i;
}
const PD = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function GD(t) {
  const a = PD.exec(t);
  if (!a)
    return [,];
  const [, s, i, o] = a;
  return [`--${s ?? i}`, o];
}
const YD = 4;
function LS(t, a, s = 1) {
  ei(s <= YD, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [i, o] = GD(t);
  if (!i)
    return;
  const u = window.getComputedStyle(a).getPropertyValue(i);
  if (u) {
    const f = u.trim();
    return J1(f) ? parseFloat(f) : f;
  }
  return im(o) ? LS(o, a, s + 1) : o;
}
const KD = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, XD = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), QD = {
  type: "keyframes",
  duration: 0.8
}, ZD = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, JD = (t, { keyframes: a }) => a.length > 2 ? QD : li.has(t) ? t.startsWith("scale") ? XD(a[1]) : KD : ZD;
function $S(t, a) {
  if (t?.inherit && a) {
    const { inherit: s, ...i } = t;
    return { ...a, ...i };
  }
  return t;
}
function US(t, a) {
  const s = t?.[a] ?? t?.default ?? t;
  return s !== t ? $S(s, t) : s;
}
const WD = /* @__PURE__ */ new Set([
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
function ez(t) {
  for (const a in t)
    if (!WD.has(a))
      return !0;
  return !1;
}
const tz = (t, a, s, i = {}, o, u) => (f) => {
  const m = US(i, t) || {}, y = m.delay || i.delay || 0;
  let { elapsed: p = 0 } = i;
  p = p - /* @__PURE__ */ ta(y);
  const b = {
    keyframes: Array.isArray(s) ? s : [null, s],
    ease: "easeOut",
    velocity: a.getVelocity(),
    ...m,
    delay: -p,
    onUpdate: (S) => {
      a.set(S), m.onUpdate && m.onUpdate(S);
    },
    onComplete: () => {
      f(), m.onComplete && m.onComplete();
    },
    name: t,
    motionValue: a,
    element: u ? void 0 : o
  };
  ez(m) || Object.assign(b, JD(t, b)), b.duration && (b.duration = /* @__PURE__ */ ta(b.duration)), b.repeatDelay && (b.repeatDelay = /* @__PURE__ */ ta(b.repeatDelay)), b.from !== void 0 && (b.keyframes[0] = b.from);
  let v = !1;
  if ((b.type === !1 || b.duration === 0 && !b.repeatDelay) && (xh(b), b.delay === 0 && (v = !0)), (Cr.instantAnimations || Cr.skipAnimations || o?.shouldSkipAnimations) && (v = !0, xh(b), b.delay = 0), b.allowFlatten = !m.type && !m.ease, v && !u && a.get() !== void 0) {
    const S = Zc(b.keyframes, m);
    if (S !== void 0) {
      na.update(() => {
        b.onUpdate(S), b.onComplete();
      });
      return;
    }
  }
  return m.isSync ? new Dc(b) : new FD(b);
};
function jb(t) {
  const a = [{}, {}];
  return t?.values.forEach((s, i) => {
    a[0][i] = s.get(), a[1][i] = s.getVelocity();
  }), a;
}
function hm(t, a, s, i) {
  if (typeof a == "function") {
    const [o, u] = jb(i);
    a = a(s !== void 0 ? s : t.custom, o, u);
  }
  if (typeof a == "string" && (a = t.variants && t.variants[a]), typeof a == "function") {
    const [o, u] = jb(i);
    a = a(s !== void 0 ? s : t.custom, o, u);
  }
  return a;
}
function es(t, a, s) {
  const i = t.getProps();
  return hm(i, a, s !== void 0 ? s : i.custom, t);
}
const BS = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...ii
]), Eb = 30, nz = (t) => !isNaN(parseFloat(t));
class az {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(a, s = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (i) => {
      const o = Hn.now();
      if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(i), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const u of this.dependents)
          u.dirty();
    }, this.hasAnimated = !1, this.setCurrent(a), this.owner = s.owner;
  }
  setCurrent(a) {
    this.current = a, this.updatedAt = Hn.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = nz(this.current));
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
  on(a, s) {
    this.events[a] || (this.events[a] = new nS());
    const i = this.events[a].add(s);
    return a === "change" ? () => {
      i(), na.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : i;
  }
  clearListeners() {
    for (const a in this.events)
      this.events[a].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(a, s) {
    this.passiveEffect = a, this.stopPassiveEffect = s;
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
  setWithVelocity(a, s, i) {
    this.set(s), this.prev = void 0, this.prevFrameValue = a, this.prevUpdatedAt = this.updatedAt - i;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(a, s = !0) {
    this.updateAndNotify(a), this.prev = a, this.prevUpdatedAt = this.prevFrameValue = void 0, s && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
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
    const a = Hn.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > Eb)
      return 0;
    const s = Math.min(this.updatedAt - this.prevUpdatedAt, Eb);
    return aS(parseFloat(this.current) - parseFloat(this.prevFrameValue), s);
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
    return this.stop(), new Promise((s) => {
      this.hasAnimated = !0, this.animation = a(s), this.events.animationStart && this.events.animationStart.notify();
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
function zc(t, a) {
  return new az(t, a);
}
const Sh = (t) => Array.isArray(t);
function rz(t, a, s) {
  t.hasValue(a) ? t.getValue(a).set(s) : t.addValue(a, zc(s));
}
function sz(t) {
  return Sh(t) ? t[t.length - 1] || 0 : t;
}
function iz(t, a) {
  const s = es(t, a);
  let { transitionEnd: i = {}, transition: o = {}, ...u } = s || {};
  u = { ...u, ...i };
  for (const f in u) {
    const m = sz(u[f]);
    rz(t, f, m);
  }
}
const xn = (t) => !!(t && t.getVelocity);
function lz(t) {
  return !!(xn(t) && t.add);
}
function oz(t, a) {
  const s = t.getValue("willChange");
  if (lz(s))
    return s.add(a);
  if (!s && Cr.WillChange) {
    const i = new Cr.WillChange("auto");
    t.addValue("willChange", i), i.add(a);
  }
}
function mm(t) {
  return t.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const cz = "framerAppearId", IS = "data-" + mm(cz);
function uz(t) {
  return t.props[IS];
}
function dz({ protectedKeys: t, needsAnimating: a }, s) {
  const i = t.hasOwnProperty(s) && a[s] !== !0;
  return a[s] = !1, i;
}
function VS(t, a, { delay: s = 0, transitionOverride: i, type: o } = {}) {
  let { transition: u, transitionEnd: f, ...m } = a;
  const y = t.getDefaultTransition();
  u = u ? $S(u, y) : y;
  const p = u?.reduceMotion;
  i && (u = i);
  const b = [], v = o && t.animationState && t.animationState.getState()[o];
  for (const S in m) {
    const w = t.getValue(S, t.latestValues[S] ?? null), j = m[S];
    if (j === void 0 || v && dz(v, S))
      continue;
    const C = {
      delay: s,
      ...US(u || {}, S)
    }, _ = w.get();
    if (_ !== void 0 && !w.isAnimating() && !Array.isArray(j) && j === _ && !C.velocity) {
      na.update(() => w.set(j));
      continue;
    }
    let T = !1;
    if (window.MotionHandoffAnimation) {
      const N = uz(t);
      if (N) {
        const B = window.MotionHandoffAnimation(N, S, na);
        B !== null && (C.startTime = B, T = !0);
      }
    }
    oz(t, S);
    const O = p ?? t.shouldReduceMotion;
    w.start(tz(S, w, j, O && BS.has(S) ? { type: !1 } : C, t, T));
    const R = w.animation;
    R && b.push(R);
  }
  if (f) {
    const S = () => na.update(() => {
      f && iz(t, f);
    });
    b.length ? Promise.all(b).then(S) : S();
  }
  return b;
}
function wh(t, a, s = {}) {
  const i = es(t, a, s.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: o = t.getDefaultTransition() || {} } = i || {};
  s.transitionOverride && (o = s.transitionOverride);
  const u = i ? () => Promise.all(VS(t, i, s)) : () => Promise.resolve(), f = t.variantChildren && t.variantChildren.size ? (y = 0) => {
    const { delayChildren: p = 0, staggerChildren: b, staggerDirection: v } = o;
    return fz(t, a, y, p, b, v, s);
  } : () => Promise.resolve(), { when: m } = o;
  if (m) {
    const [y, p] = m === "beforeChildren" ? [u, f] : [f, u];
    return y().then(() => p());
  } else
    return Promise.all([u(), f(s.delay)]);
}
function fz(t, a, s = 0, i = 0, o = 0, u = 1, f) {
  const m = [];
  for (const y of t.variantChildren)
    y.notify("AnimationStart", a), m.push(wh(y, a, {
      ...f,
      delay: s + (typeof i == "function" ? 0 : i) + OS(t.variantChildren, y, i, o, u)
    }).then(() => y.notify("AnimationComplete", a)));
  return Promise.all(m);
}
function hz(t, a, s = {}) {
  t.notify("AnimationStart", a);
  let i;
  if (Array.isArray(a)) {
    const o = a.map((u) => wh(t, u, s));
    i = Promise.all(o);
  } else if (typeof a == "string")
    i = wh(t, a, s);
  else {
    const o = typeof a == "function" ? es(t, a, s.custom) : a;
    i = Promise.all(VS(t, o, s));
  }
  return i.then(() => {
    t.notify("AnimationComplete", a);
  });
}
const mz = {
  test: (t) => t === "auto",
  parse: (t) => t
}, qS = (t) => (a) => a.test(t), HS = [si, Oe, Qs, yr, L5, O5, mz], Nb = (t) => HS.find(qS(t));
function pz(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || W1(t) : !0;
}
const gz = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function vz(t) {
  const [a, s] = t.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return t;
  const [i] = s.match(lm) || [];
  if (!i)
    return t;
  const o = s.replace(i, "");
  let u = gz.has(a) ? 1 : 0;
  return i !== s && (u *= 100), a + "(" + u + o + ")";
}
const yz = /\b([a-z-]*)\(.*?\)/gu, jh = {
  ...da,
  getAnimatableNone: (t) => {
    const a = t.match(yz);
    return a ? a.map(vz).join(" ") : t;
  }
}, Eh = {
  ...da,
  getAnimatableNone: (t) => {
    const a = da.parse(t);
    return da.createTransformer(t)(a.map((i) => typeof i == "number" ? 0 : typeof i == "object" ? { ...i, alpha: 1 } : i));
  }
}, Cb = {
  ...si,
  transform: Math.round
}, bz = {
  rotate: yr,
  rotateX: yr,
  rotateY: yr,
  rotateZ: yr,
  scale: rc,
  scaleX: rc,
  scaleY: rc,
  scaleZ: rc,
  skew: yr,
  skewX: yr,
  skewY: yr,
  distance: Oe,
  translateX: Oe,
  translateY: Oe,
  translateZ: Oe,
  x: Oe,
  y: Oe,
  z: Oe,
  perspective: Oe,
  transformPerspective: Oe,
  opacity: wl,
  originX: fb,
  originY: fb,
  originZ: Oe
}, pm = {
  // Border props
  borderWidth: Oe,
  borderTopWidth: Oe,
  borderRightWidth: Oe,
  borderBottomWidth: Oe,
  borderLeftWidth: Oe,
  borderRadius: Oe,
  borderTopLeftRadius: Oe,
  borderTopRightRadius: Oe,
  borderBottomRightRadius: Oe,
  borderBottomLeftRadius: Oe,
  // Positioning props
  width: Oe,
  maxWidth: Oe,
  height: Oe,
  maxHeight: Oe,
  top: Oe,
  right: Oe,
  bottom: Oe,
  left: Oe,
  inset: Oe,
  insetBlock: Oe,
  insetBlockStart: Oe,
  insetBlockEnd: Oe,
  insetInline: Oe,
  insetInlineStart: Oe,
  insetInlineEnd: Oe,
  // Spacing props
  padding: Oe,
  paddingTop: Oe,
  paddingRight: Oe,
  paddingBottom: Oe,
  paddingLeft: Oe,
  paddingBlock: Oe,
  paddingBlockStart: Oe,
  paddingBlockEnd: Oe,
  paddingInline: Oe,
  paddingInlineStart: Oe,
  paddingInlineEnd: Oe,
  margin: Oe,
  marginTop: Oe,
  marginRight: Oe,
  marginBottom: Oe,
  marginLeft: Oe,
  marginBlock: Oe,
  marginBlockStart: Oe,
  marginBlockEnd: Oe,
  marginInline: Oe,
  marginInlineStart: Oe,
  marginInlineEnd: Oe,
  // Typography
  fontSize: Oe,
  // Misc
  backgroundPositionX: Oe,
  backgroundPositionY: Oe,
  ...bz,
  zIndex: Cb,
  // SVG
  fillOpacity: wl,
  strokeOpacity: wl,
  numOctaves: Cb
}, xz = {
  ...pm,
  // Color props
  color: nn,
  backgroundColor: nn,
  outlineColor: nn,
  fill: nn,
  stroke: nn,
  // Border props
  borderColor: nn,
  borderTopColor: nn,
  borderRightColor: nn,
  borderBottomColor: nn,
  borderLeftColor: nn,
  filter: jh,
  WebkitFilter: jh,
  mask: Eh,
  WebkitMask: Eh
}, FS = (t) => xz[t], Sz = /* @__PURE__ */ new Set([jh, Eh]);
function PS(t, a) {
  let s = FS(t);
  return Sz.has(s) || (s = da), s.getAnimatableNone ? s.getAnimatableNone(a) : void 0;
}
const wz = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function jz(t, a, s) {
  let i = 0, o;
  for (; i < t.length && !o; ) {
    const u = t[i];
    typeof u == "string" && !wz.has(u) && ti(u).values.length && (o = t[i]), i++;
  }
  if (o && s)
    for (const u of a)
      t[u] = PS(s, o);
}
class Ez extends fm {
  constructor(a, s, i, o, u) {
    super(a, s, i, o, u, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, element: s, name: i } = this;
    if (!s || !s.current)
      return;
    super.readKeyframes();
    for (let b = 0; b < a.length; b++) {
      let v = a[b];
      if (typeof v == "string" && (v = v.trim(), im(v))) {
        const S = LS(v, s.current);
        S !== void 0 && (a[b] = S), b === a.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !BS.has(i) || a.length !== 2)
      return;
    const [o, u] = a, f = Nb(o), m = Nb(u), y = db(o), p = db(u);
    if (y !== p && jr[i]) {
      this.needsMeasurement = !0;
      return;
    }
    if (f !== m)
      if (xb(f) && xb(m))
        for (let b = 0; b < a.length; b++) {
          const v = a[b];
          typeof v == "string" && (a[b] = parseFloat(v));
        }
      else jr[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: s } = this, i = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || pz(a[o])) && i.push(o);
    i.length && jz(a, i, s);
  }
  measureInitialState() {
    const { element: a, unresolvedKeyframes: s, name: i } = this;
    if (!a || !a.current)
      return;
    i === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = jr[i](a.measureViewportBox(), window.getComputedStyle(a.current)), s[0] = this.measuredOrigin;
    const o = s[s.length - 1];
    o !== void 0 && a.getValue(i, o).jump(o, !1);
  }
  measureEndState() {
    const { element: a, name: s, unresolvedKeyframes: i } = this;
    if (!a || !a.current)
      return;
    const o = a.getValue(s);
    o && o.jump(this.measuredOrigin, !1);
    const u = i.length - 1, f = i[u];
    i[u] = jr[s](a.measureViewportBox(), window.getComputedStyle(a.current)), f !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = f), this.removedTransforms?.length && this.removedTransforms.forEach(([m, y]) => {
      a.getValue(m).set(y);
    }), this.resolveNoneKeyframes();
  }
}
function Nz(t, a, s) {
  if (t == null)
    return [];
  if (t instanceof EventTarget)
    return [t];
  if (typeof t == "string") {
    let i = document;
    const o = s?.[t] ?? i.querySelectorAll(t);
    return o ? Array.from(o) : [];
  }
  return Array.from(t).filter((i) => i != null);
}
const GS = (t, a) => a && typeof t == "number" ? a.transform(t) : t;
function wc(t) {
  return g5(t) && "offsetHeight" in t && !("ownerSVGElement" in t);
}
const { schedule: Cz } = /* @__PURE__ */ hS(queueMicrotask, !1), Tz = {
  y: !1
};
function Rz() {
  return Tz.y;
}
function YS(t, a) {
  const s = Nz(t), i = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: i.signal
  };
  return [s, o, () => i.abort()];
}
function _z(t) {
  return !(t.pointerType === "touch" || Rz());
}
function Mz(t, a, s = {}) {
  const [i, o, u] = YS(t, s);
  return i.forEach((f) => {
    let m = !1, y = !1, p;
    const b = () => {
      f.removeEventListener("pointerleave", j);
    }, v = (_) => {
      p && (p(_), p = void 0), b();
    }, S = (_) => {
      m = !1, window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), y && (y = !1, v(_));
    }, w = () => {
      m = !0, window.addEventListener("pointerup", S, o), window.addEventListener("pointercancel", S, o);
    }, j = (_) => {
      if (_.pointerType !== "touch") {
        if (m) {
          y = !0;
          return;
        }
        v(_);
      }
    }, C = (_) => {
      if (!_z(_))
        return;
      y = !1;
      const T = a(f, _);
      typeof T == "function" && (p = T, f.addEventListener("pointerleave", j, o));
    };
    f.addEventListener("pointerenter", C, o), f.addEventListener("pointerdown", w, o);
  }), u;
}
const KS = (t, a) => a ? t === a ? !0 : KS(t, a.parentElement) : !1, Az = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, kz = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function Dz(t) {
  return kz.has(t.tagName) || t.isContentEditable === !0;
}
const jc = /* @__PURE__ */ new WeakSet();
function Tb(t) {
  return (a) => {
    a.key === "Enter" && t(a);
  };
}
function qf(t, a) {
  t.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const zz = (t, a) => {
  const s = t.currentTarget;
  if (!s)
    return;
  const i = Tb(() => {
    if (jc.has(s))
      return;
    qf(s, "down");
    const o = Tb(() => {
      qf(s, "up");
    }), u = () => qf(s, "cancel");
    s.addEventListener("keyup", o, a), s.addEventListener("blur", u, a);
  });
  s.addEventListener("keydown", i, a), s.addEventListener("blur", () => s.removeEventListener("keydown", i), a);
};
function Rb(t) {
  return Az(t) && !0;
}
const _b = /* @__PURE__ */ new WeakSet();
function Oz(t, a, s = {}) {
  const [i, o, u] = YS(t, s), f = (m) => {
    const y = m.currentTarget;
    if (!Rb(m) || _b.has(m))
      return;
    jc.add(y), s.stopPropagation && _b.add(m);
    const p = a(y, m), b = (w, j) => {
      window.removeEventListener("pointerup", v), window.removeEventListener("pointercancel", S), jc.has(y) && jc.delete(y), Rb(w) && typeof p == "function" && p(w, { success: j });
    }, v = (w) => {
      b(w, y === window || y === document || s.useGlobalTarget || KS(y, w.target));
    }, S = (w) => {
      b(w, !1);
    };
    window.addEventListener("pointerup", v, o), window.addEventListener("pointercancel", S, o);
  };
  return i.forEach((m) => {
    (s.useGlobalTarget ? window : m).addEventListener("pointerdown", f, o), wc(m) && (m.addEventListener("focus", (p) => zz(p, o)), !Dz(m) && !m.hasAttribute("tabindex") && (m.tabIndex = 0));
  }), u;
}
const Lz = [...HS, nn, da], $z = (t) => Lz.find(qS(t)), Mb = () => ({ min: 0, max: 0 }), XS = () => ({
  x: Mb(),
  y: Mb()
}), Uz = /* @__PURE__ */ new WeakMap();
function Jc(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function jl(t) {
  return typeof t == "string" || Array.isArray(t);
}
const gm = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], vm = ["initial", ...gm];
function Wc(t) {
  return Jc(t.animate) || vm.some((a) => jl(t[a]));
}
function QS(t) {
  return !!(Wc(t) || t.variants);
}
function Bz(t, a, s) {
  for (const i in a) {
    const o = a[i], u = s[i];
    if (xn(o))
      t.addValue(i, o);
    else if (xn(u))
      t.addValue(i, zc(o, { owner: t }));
    else if (u !== o)
      if (t.hasValue(i)) {
        const f = t.getValue(i);
        f.liveStyle === !0 ? f.jump(o) : f.hasAnimated || f.set(o);
      } else {
        const f = t.getStaticValue(i);
        t.addValue(i, zc(f !== void 0 ? f : o, { owner: t }));
      }
  }
  for (const i in s)
    a[i] === void 0 && t.removeValue(i);
  return a;
}
const Oc = { current: null }, ym = { current: !1 }, Iz = typeof window < "u";
function ZS() {
  if (ym.current = !0, !!Iz)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), a = () => Oc.current = t.matches;
      t.addEventListener("change", a), a();
    } else
      Oc.current = !1;
}
const Ab = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let Lc = {};
function JS(t) {
  Lc = t;
}
function Vz() {
  return Lc;
}
class qz {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(a, s, i) {
    return {};
  }
  constructor({ parent: a, props: s, presenceContext: i, reducedMotionConfig: o, skipAnimations: u, blockInitialAnimation: f, visualState: m }, y = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = fm, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const w = Hn.now();
      this.renderScheduledAt < w && (this.renderScheduledAt = w, na.render(this.render, !1, !0));
    };
    const { latestValues: p, renderState: b } = m;
    this.latestValues = p, this.baseTarget = { ...p }, this.initialValues = s.initial ? { ...p } : {}, this.renderState = b, this.parent = a, this.props = s, this.presenceContext = i, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = u, this.options = y, this.blockInitialAnimation = !!f, this.isControllingVariants = Wc(s), this.isVariantNode = QS(s), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: v, ...S } = this.scrapeMotionValuesFromProps(s, {}, this);
    for (const w in S) {
      const j = S[w];
      p[w] !== void 0 && xn(j) && j.set(p[w]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const s in this.initialValues)
        this.values.get(s)?.jump(this.initialValues[s]), this.latestValues[s] = this.initialValues[s];
    this.current = a, Uz.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((s, i) => this.bindToMotionValue(i, s)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (ym.current || ZS(), this.shouldReduceMotion = Oc.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), oh(this.notifyUpdate), oh(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const a in this.events)
      this.events[a].clear();
    for (const a in this.features) {
      const s = this.features[a];
      s && (s.unmount(), s.isMounted = !1);
    }
    this.current = null;
  }
  addChild(a) {
    this.children.add(a), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(a);
  }
  removeChild(a) {
    this.children.delete(a), this.enteringChildren && this.enteringChildren.delete(a);
  }
  bindToMotionValue(a, s) {
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), s.accelerate && zS.has(a) && this.current instanceof HTMLElement) {
      const { factory: f, keyframes: m, times: y, ease: p, duration: b } = s.accelerate, v = new kS({
        element: this.current,
        name: a,
        keyframes: m,
        times: y,
        ease: p,
        duration: /* @__PURE__ */ ta(b)
      }), S = f(v);
      this.valueSubscriptions.set(a, () => {
        S(), v.cancel();
      });
      return;
    }
    const i = li.has(a);
    i && this.onBindTransform && this.onBindTransform();
    const o = s.on("change", (f) => {
      this.latestValues[a] = f, this.props.onUpdate && na.preRender(this.notifyUpdate), i && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let u;
    typeof window < "u" && window.MotionCheckAppearSync && (u = window.MotionCheckAppearSync(this, a, s)), this.valueSubscriptions.set(a, () => {
      o(), u && u(), s.owner && s.stop();
    });
  }
  sortNodePosition(a) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== a.type ? 0 : this.sortInstanceNodePosition(this.current, a.current);
  }
  updateFeatures() {
    let a = "animation";
    for (a in Lc) {
      const s = Lc[a];
      if (!s)
        continue;
      const { isEnabled: i, Feature: o } = s;
      if (!this.features[a] && o && i(this.props) && (this.features[a] = new o(this)), this.features[a]) {
        const u = this.features[a];
        u.isMounted ? u.update() : (u.mount(), u.isMounted = !0);
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : XS();
  }
  getStaticValue(a) {
    return this.latestValues[a];
  }
  setStaticValue(a, s) {
    this.latestValues[a] = s;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(a, s) {
    (a.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = a, this.prevPresenceContext = this.presenceContext, this.presenceContext = s;
    for (let i = 0; i < Ab.length; i++) {
      const o = Ab[i];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const u = "on" + o, f = a[u];
      f && (this.propEventSubscriptions[o] = this.on(o, f));
    }
    this.prevMotionValues = Bz(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    const s = this.getClosestVariantNode();
    if (s)
      return s.variantChildren && s.variantChildren.add(a), () => s.variantChildren.delete(a);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(a, s) {
    const i = this.values.get(a);
    s !== i && (i && this.removeValue(a), this.bindToMotionValue(a, s), this.values.set(a, s), this.latestValues[a] = s.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(a) {
    this.values.delete(a);
    const s = this.valueSubscriptions.get(a);
    s && (s(), this.valueSubscriptions.delete(a)), delete this.latestValues[a], this.removeValueFromRenderState(a, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(a) {
    return this.values.has(a);
  }
  getValue(a, s) {
    if (this.props.values && this.props.values[a])
      return this.props.values[a];
    let i = this.values.get(a);
    return i === void 0 && s !== void 0 && (i = zc(s === null ? void 0 : s, { owner: this }), this.addValue(a, i)), i;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, s) {
    let i = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return i != null && (typeof i == "string" && (J1(i) || W1(i)) ? i = parseFloat(i) : !$z(i) && da.test(s) && (i = PS(a, s)), this.setBaseTarget(a, xn(i) ? i.get() : i)), xn(i) ? i.get() : i;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(a, s) {
    this.baseTarget[a] = s;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(a) {
    const { initial: s } = this.props;
    let i;
    if (typeof s == "string" || typeof s == "object") {
      const u = hm(this.props, s, this.presenceContext?.custom);
      u && (i = u[a]);
    }
    if (s && i !== void 0)
      return i;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !xn(o) ? o : this.initialValues[a] !== void 0 && i === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, s) {
    return this.events[a] || (this.events[a] = new nS()), this.events[a].add(s);
  }
  notify(a, ...s) {
    this.events[a] && this.events[a].notify(...s);
  }
  scheduleRenderMicrotask() {
    Cz.render(this.render);
  }
}
class WS extends qz {
  constructor() {
    super(...arguments), this.KeyframeResolver = Ez;
  }
  sortInstanceNodePosition(a, s) {
    return a.compareDocumentPosition(s) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(a, s) {
    const i = a.style;
    return i ? i[s] : void 0;
  }
  removeValueFromRenderState(a, { vars: s, style: i }) {
    delete s[a], delete i[a];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: a } = this.props;
    xn(a) && (this.childSubscription = a.on("change", (s) => {
      this.current && (this.current.textContent = `${s}`);
    }));
  }
}
class oi {
  constructor(a) {
    this.isMounted = !1, this.node = a;
  }
  update() {
  }
}
function Hz({ top: t, left: a, right: s, bottom: i }) {
  return {
    x: { min: a, max: s },
    y: { min: t, max: i }
  };
}
function Fz(t, a) {
  if (!a)
    return t;
  const s = a({ x: t.left, y: t.top }), i = a({ x: t.right, y: t.bottom });
  return {
    top: s.y,
    left: s.x,
    bottom: i.y,
    right: i.x
  };
}
function Pz(t, a) {
  return Hz(Fz(t.getBoundingClientRect(), a));
}
const Gz = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Yz = ii.length;
function Kz(t, a, s) {
  let i = "", o = !0;
  for (let u = 0; u < Yz; u++) {
    const f = ii[u], m = t[f];
    if (m === void 0)
      continue;
    let y = !0;
    if (typeof m == "number")
      y = m === (f.startsWith("scale") ? 1 : 0);
    else {
      const p = parseFloat(m);
      y = f.startsWith("scale") ? p === 1 : p === 0;
    }
    if (!y || s) {
      const p = GS(m, pm[f]);
      if (!y) {
        o = !1;
        const b = Gz[f] || f;
        i += `${b}(${p}) `;
      }
      s && (a[f] = p);
    }
  }
  return i = i.trim(), s ? i = s(a, o ? "" : i) : o && (i = "none"), i;
}
function bm(t, a, s) {
  const { style: i, vars: o, transformOrigin: u } = t;
  let f = !1, m = !1;
  for (const y in a) {
    const p = a[y];
    if (li.has(y)) {
      f = !0;
      continue;
    } else if (pS(y)) {
      o[y] = p;
      continue;
    } else {
      const b = GS(p, pm[y]);
      y.startsWith("origin") ? (m = !0, u[y] = b) : i[y] = b;
    }
  }
  if (a.transform || (f || s ? i.transform = Kz(a, t.transform, s) : i.transform && (i.transform = "none")), m) {
    const { originX: y = "50%", originY: p = "50%", originZ: b = 0 } = u;
    i.transformOrigin = `${y} ${p} ${b}`;
  }
}
function ew(t, { style: a, vars: s }, i, o) {
  const u = t.style;
  let f;
  for (f in a)
    u[f] = a[f];
  o?.applyProjectionStyles(u, i);
  for (f in s)
    u.setProperty(f, s[f]);
}
function kb(t, a) {
  return a.max === a.min ? 0 : t / (a.max - a.min) * 100;
}
const rl = {
  correct: (t, a) => {
    if (!a.target)
      return t;
    if (typeof t == "string")
      if (Oe.test(t))
        t = parseFloat(t);
      else
        return t;
    const s = kb(t, a.target.x), i = kb(t, a.target.y);
    return `${s}% ${i}%`;
  }
}, Xz = {
  correct: (t, { treeScale: a, projectionDelta: s }) => {
    const i = t, o = da.parse(t);
    if (o.length > 5)
      return i;
    const u = da.createTransformer(t), f = typeof o[0] != "number" ? 1 : 0, m = s.x.scale * a.x, y = s.y.scale * a.y;
    o[0 + f] /= m, o[1 + f] /= y;
    const p = kl(m, y, 0.5);
    return typeof o[2 + f] == "number" && (o[2 + f] /= p), typeof o[3 + f] == "number" && (o[3 + f] /= p), u(o);
  }
}, Qz = {
  borderRadius: {
    ...rl,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: rl,
  borderTopRightRadius: rl,
  borderBottomLeftRadius: rl,
  borderBottomRightRadius: rl,
  boxShadow: Xz
};
function tw(t, { layout: a, layoutId: s }) {
  return li.has(t) || t.startsWith("origin") || (a || s !== void 0) && (!!Qz[t] || t === "opacity");
}
function xm(t, a, s) {
  const i = t.style, o = a?.style, u = {};
  if (!i)
    return u;
  for (const f in i)
    (xn(i[f]) || o && xn(o[f]) || tw(f, t) || s?.getValue(f)?.liveStyle !== void 0) && (u[f] = i[f]);
  return u;
}
function Zz(t) {
  return window.getComputedStyle(t);
}
class Jz extends WS {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = ew;
  }
  readValueFromInstance(a, s) {
    if (li.has(s))
      return this.projection?.isProjecting ? ph(s) : wD(a, s);
    {
      const i = Zz(a), o = (pS(s) ? i.getPropertyValue(s) : i[s]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: s }) {
    return Pz(a, s);
  }
  build(a, s, i) {
    bm(a, s, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, s, i) {
    return xm(a, s, i);
  }
}
const Wz = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, e4 = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function t4(t, a, s = 1, i = 0, o = !0) {
  t.pathLength = 1;
  const u = o ? Wz : e4;
  t[u.offset] = `${-i}`, t[u.array] = `${a} ${s}`;
}
const n4 = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function nw(t, {
  attrX: a,
  attrY: s,
  attrScale: i,
  pathLength: o,
  pathSpacing: u = 1,
  pathOffset: f = 0,
  // This is object creation, which we try to avoid per-frame.
  ...m
}, y, p, b) {
  if (bm(t, m, p), y) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: v, style: S } = t;
  v.transform && (S.transform = v.transform, delete v.transform), (S.transform || v.transformOrigin) && (S.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), S.transform && (S.transformBox = b?.transformBox ?? "fill-box", delete v.transformBox);
  for (const w of n4)
    v[w] !== void 0 && (S[w] = v[w], delete v[w]);
  a !== void 0 && (v.x = a), s !== void 0 && (v.y = s), i !== void 0 && (v.scale = i), o !== void 0 && t4(v, o, u, f, !1);
}
const aw = /* @__PURE__ */ new Set([
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
]), rw = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function a4(t, a, s, i) {
  ew(t, a, void 0, i);
  for (const o in a.attrs)
    t.setAttribute(aw.has(o) ? o : mm(o), a.attrs[o]);
}
function sw(t, a, s) {
  const i = xm(t, a, s);
  for (const o in t)
    if (xn(t[o]) || xn(a[o])) {
      const u = ii.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      i[u] = t[o];
    }
  return i;
}
class r4 extends WS {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = XS;
  }
  getBaseTargetFromProps(a, s) {
    return a[s];
  }
  readValueFromInstance(a, s) {
    if (li.has(s)) {
      const i = FS(s);
      return i && i.default || 0;
    }
    return s = aw.has(s) ? s : mm(s), a.getAttribute(s);
  }
  scrapeMotionValuesFromProps(a, s, i) {
    return sw(a, s, i);
  }
  build(a, s, i) {
    nw(a, s, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(a, s, i, o) {
    a4(a, s, i, o);
  }
  mount(a) {
    this.isSVGTag = rw(a.tagName), super.mount(a);
  }
}
const s4 = vm.length;
function iw(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const s = t.parent ? iw(t.parent) || {} : {};
    return t.props.initial !== void 0 && (s.initial = t.props.initial), s;
  }
  const a = {};
  for (let s = 0; s < s4; s++) {
    const i = vm[s], o = t.props[i];
    (jl(o) || o === !1) && (a[i] = o);
  }
  return a;
}
function lw(t, a) {
  if (!Array.isArray(a))
    return !1;
  const s = a.length;
  if (s !== t.length)
    return !1;
  for (let i = 0; i < s; i++)
    if (a[i] !== t[i])
      return !1;
  return !0;
}
const i4 = [...gm].reverse(), l4 = gm.length;
function o4(t) {
  return (a) => Promise.all(a.map(({ animation: s, options: i }) => hz(t, s, i)));
}
function c4(t) {
  let a = o4(t), s = Db(), i = !0, o = !1;
  const u = (p) => (b, v) => {
    const S = es(t, v, p === "exit" ? t.presenceContext?.custom : void 0);
    if (S) {
      const { transition: w, transitionEnd: j, ...C } = S;
      b = { ...b, ...C, ...j };
    }
    return b;
  };
  function f(p) {
    a = p(t);
  }
  function m(p) {
    const { props: b } = t, v = iw(t.parent) || {}, S = [], w = /* @__PURE__ */ new Set();
    let j = {}, C = 1 / 0;
    for (let T = 0; T < l4; T++) {
      const O = i4[T], R = s[O], N = b[O] !== void 0 ? b[O] : v[O], B = jl(N), G = O === p ? R.isActive : null;
      G === !1 && (C = T);
      let te = N === v[O] && N !== b[O] && B;
      if (te && (i || o) && t.manuallyAnimateOnMount && (te = !1), R.protectedKeys = { ...j }, // If it isn't active and hasn't *just* been set as inactive
      !R.isActive && G === null || // If we didn't and don't have any defined prop for this animation type
      !N && !R.prevProp || // Or if the prop doesn't define an animation
      Jc(N) || typeof N == "boolean")
        continue;
      if (O === "exit" && R.isActive && G !== !0) {
        R.prevResolvedValues && (j = {
          ...j,
          ...R.prevResolvedValues
        });
        continue;
      }
      const M = u4(R.prevProp, N);
      let q = M || // If we're making this variant active, we want to always make it active
      O === p && R.isActive && !te && B || // If we removed a higher-priority variant (i is in reverse order)
      T > C && B, D = !1;
      const F = Array.isArray(N) ? N : [N];
      let Z = F.reduce(u(O), {});
      G === !1 && (Z = {});
      const { prevResolvedValues: J = {} } = R, P = {
        ...J,
        ...Z
      }, ie = ($) => {
        q = !0, w.has($) && (D = !0, w.delete($)), R.needsAnimating[$] = !0;
        const se = t.getValue($);
        se && (se.liveStyle = !1);
      };
      for (const $ in P) {
        const se = Z[$], fe = J[$];
        if (j.hasOwnProperty($))
          continue;
        let k = !1;
        Sh(se) && Sh(fe) ? k = !lw(se, fe) : k = se !== fe, k ? se != null ? ie($) : w.add($) : se !== void 0 && w.has($) ? ie($) : R.protectedKeys[$] = !0;
      }
      R.prevProp = N, R.prevResolvedValues = Z, R.isActive && (j = { ...j, ...Z }), (i || o) && t.blockInitialAnimation && (q = !1);
      const A = te && M;
      q && (!A || D) && S.push(...F.map(($) => {
        const se = { type: O };
        if (typeof $ == "string" && (i || o) && !A && t.manuallyAnimateOnMount && t.parent) {
          const { parent: fe } = t, k = es(fe, $);
          if (fe.enteringChildren && k) {
            const { delayChildren: ne } = k.transition || {};
            se.delay = OS(fe.enteringChildren, t, ne);
          }
        }
        return {
          animation: $,
          options: se
        };
      }));
    }
    if (w.size) {
      const T = {};
      if (typeof b.initial != "boolean") {
        const O = es(t, Array.isArray(b.initial) ? b.initial[0] : b.initial);
        O && O.transition && (T.transition = O.transition);
      }
      w.forEach((O) => {
        const R = t.getBaseTarget(O), N = t.getValue(O);
        N && (N.liveStyle = !0), T[O] = R ?? null;
      }), S.push({ animation: T });
    }
    let _ = !!S.length;
    return i && (b.initial === !1 || b.initial === b.animate) && !t.manuallyAnimateOnMount && (_ = !1), i = !1, o = !1, _ ? a(S) : Promise.resolve();
  }
  function y(p, b) {
    if (s[p].isActive === b)
      return Promise.resolve();
    t.variantChildren?.forEach((S) => S.animationState?.setActive(p, b)), s[p].isActive = b;
    const v = m(p);
    for (const S in s)
      s[S].protectedKeys = {};
    return v;
  }
  return {
    animateChanges: m,
    setActive: y,
    setAnimateFunction: f,
    getState: () => s,
    reset: () => {
      s = Db(), o = !0;
    }
  };
}
function u4(t, a) {
  return typeof a == "string" ? a !== t : Array.isArray(a) ? !lw(a, t) : !1;
}
function Yr(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Db() {
  return {
    animate: Yr(!0),
    whileInView: Yr(),
    whileHover: Yr(),
    whileTap: Yr(),
    whileDrag: Yr(),
    whileFocus: Yr(),
    exit: Yr()
  };
}
function zb(t, a, s, i = { passive: !0 }) {
  return t.addEventListener(a, s, i), () => t.removeEventListener(a, s);
}
function d4(t) {
  return xn(t) ? t.get() : t;
}
const Sm = g.createContext({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function Ob(t, a) {
  if (typeof t == "function")
    return t(a);
  t != null && (t.current = a);
}
function f4(...t) {
  return (a) => {
    let s = !1;
    const i = t.map((o) => {
      const u = Ob(o, a);
      return !s && typeof u == "function" && (s = !0), u;
    });
    if (s)
      return () => {
        for (let o = 0; o < i.length; o++) {
          const u = i[o];
          typeof u == "function" ? u() : Ob(t[o], null);
        }
      };
  };
}
function h4(...t) {
  return g.useCallback(f4(...t), t);
}
class m4 extends g.Component {
  getSnapshotBeforeUpdate(a) {
    const s = this.props.childRef.current;
    if (wc(s) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const i = s.offsetParent, o = wc(i) && i.offsetWidth || 0, u = wc(i) && i.offsetHeight || 0, f = getComputedStyle(s), m = this.props.sizeRef.current;
      m.height = parseFloat(f.height), m.width = parseFloat(f.width), m.top = s.offsetTop, m.left = s.offsetLeft, m.right = o - m.width - m.left, m.bottom = u - m.height - m.top;
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
function p4({ children: t, isPresent: a, anchorX: s, anchorY: i, root: o, pop: u }) {
  const f = g.useId(), m = g.useRef(null), y = g.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: p } = g.useContext(Sm), b = t.props?.ref ?? t?.ref, v = h4(m, b);
  return g.useInsertionEffect(() => {
    const { width: S, height: w, top: j, left: C, right: _, bottom: T } = y.current;
    if (a || u === !1 || !m.current || !S || !w)
      return;
    const O = s === "left" ? `left: ${C}` : `right: ${_}`, R = i === "bottom" ? `bottom: ${T}` : `top: ${j}`;
    m.current.dataset.motionPopId = f;
    const N = document.createElement("style");
    p && (N.nonce = p);
    const B = o ?? document.head;
    return B.appendChild(N), N.sheet && N.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${S}px !important;
            height: ${w}px !important;
            ${O}px !important;
            ${R}px !important;
          }
        `), () => {
      m.current?.removeAttribute("data-motion-pop-id"), B.contains(N) && B.removeChild(N);
    };
  }, [a]), c.jsx(m4, { isPresent: a, childRef: m, sizeRef: y, pop: u, children: u === !1 ? t : g.cloneElement(t, { ref: v }) });
}
const g4 = ({ children: t, initial: a, isPresent: s, onExitComplete: i, custom: o, presenceAffectsLayout: u, mode: f, anchorX: m, anchorY: y, root: p }) => {
  const b = am(v4), v = g.useId();
  let S = !0, w = g.useMemo(() => (S = !1, {
    id: v,
    initial: a,
    isPresent: s,
    custom: o,
    onExitComplete: (j) => {
      b.set(j, !0);
      for (const C of b.values())
        if (!C)
          return;
      i && i();
    },
    register: (j) => (b.set(j, !1), () => b.delete(j))
  }), [s, b, i]);
  return u && S && (w = { ...w }), g.useMemo(() => {
    b.forEach((j, C) => b.set(C, !1));
  }, [s]), g.useEffect(() => {
    !s && !b.size && i && i();
  }, [s]), t = c.jsx(p4, { pop: f === "popLayout", isPresent: s, anchorX: m, anchorY: y, root: p, children: t }), c.jsx(Xc.Provider, { value: w, children: t });
};
function v4() {
  return /* @__PURE__ */ new Map();
}
function y4(t = !0) {
  const a = g.useContext(Xc);
  if (a === null)
    return [!0, null];
  const { isPresent: s, onExitComplete: i, register: o } = a, u = g.useId();
  g.useEffect(() => {
    if (t)
      return o(u);
  }, [t]);
  const f = g.useCallback(() => t && i && i(u), [u, i, t]);
  return !s && i ? [!1, f] : [!0];
}
const sc = (t) => t.key || "";
function Lb(t) {
  const a = [];
  return g.Children.forEach(t, (s) => {
    g.isValidElement(s) && a.push(s);
  }), a;
}
const ow = ({ children: t, custom: a, initial: s = !0, onExitComplete: i, presenceAffectsLayout: o = !0, mode: u = "sync", propagate: f = !1, anchorX: m = "left", anchorY: y = "top", root: p }) => {
  const [b, v] = y4(f), S = g.useMemo(() => Lb(t), [t]), w = f && !b ? [] : S.map(sc), j = g.useRef(!0), C = g.useRef(S), _ = am(() => /* @__PURE__ */ new Map()), T = g.useRef(/* @__PURE__ */ new Set()), [O, R] = g.useState(S), [N, B] = g.useState(S);
  Z1(() => {
    j.current = !1, C.current = S;
    for (let M = 0; M < N.length; M++) {
      const q = sc(N[M]);
      w.includes(q) ? (_.delete(q), T.current.delete(q)) : _.get(q) !== !0 && _.set(q, !1);
    }
  }, [N, w.length, w.join("-")]);
  const G = [];
  if (S !== O) {
    let M = [...S];
    for (let q = 0; q < N.length; q++) {
      const D = N[q], F = sc(D);
      w.includes(F) || (M.splice(q, 0, D), G.push(D));
    }
    return u === "wait" && G.length && (M = G), B(Lb(M)), R(S), null;
  }
  const { forceRender: te } = g.useContext(Q1);
  return c.jsx(c.Fragment, { children: N.map((M) => {
    const q = sc(M), D = f && !b ? !1 : S === N || w.includes(q), F = () => {
      if (T.current.has(q))
        return;
      if (_.has(q))
        T.current.add(q), _.set(q, !0);
      else
        return;
      let Z = !0;
      _.forEach((J) => {
        J || (Z = !1);
      }), Z && (te?.(), B(C.current), f && v?.(), i && i());
    };
    return c.jsx(g4, { isPresent: D, initial: !j.current || s ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: u, root: p, onExitComplete: D ? void 0 : F, anchorX: m, anchorY: y, children: M }, q);
  }) });
}, wm = g.createContext({ strict: !1 }), $b = {
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
let Ub = !1;
function b4() {
  if (Ub)
    return;
  const t = {};
  for (const a in $b)
    t[a] = {
      isEnabled: (s) => $b[a].some((i) => !!s[i])
    };
  JS(t), Ub = !0;
}
function cw() {
  return b4(), Vz();
}
function Nh(t) {
  const a = cw();
  for (const s in t)
    a[s] = {
      ...a[s],
      ...t[s]
    };
  JS(a);
}
function jm({ children: t, features: a, strict: s = !1 }) {
  const [, i] = g.useState(!Hf(a)), o = g.useRef(void 0);
  if (!Hf(a)) {
    const { renderer: u, ...f } = a;
    o.current = u, Nh(f);
  }
  return g.useEffect(() => {
    Hf(a) && a().then(({ renderer: u, ...f }) => {
      Nh(f), o.current = u, i(!0);
    });
  }, []), c.jsx(wm.Provider, { value: { renderer: o.current, strict: s }, children: t });
}
function Hf(t) {
  return typeof t == "function";
}
const x4 = /* @__PURE__ */ new Set([
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
function $c(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || x4.has(t);
}
let uw = (t) => !$c(t);
function S4(t) {
  typeof t == "function" && (uw = (a) => a.startsWith("on") ? !$c(a) : t(a));
}
try {
  S4(require("@emotion/is-prop-valid").default);
} catch {
}
function w4(t, a, s) {
  const i = {};
  for (const o in t)
    o === "values" && typeof t.values == "object" || xn(t[o]) || (uw(o) || s === !0 && $c(o) || !a && !$c(o) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && o.startsWith("onDrag")) && (i[o] = t[o]);
  return i;
}
const eu = /* @__PURE__ */ g.createContext({});
function j4(t, a) {
  if (Wc(t)) {
    const { initial: s, animate: i } = t;
    return {
      initial: s === !1 || jl(s) ? s : void 0,
      animate: jl(i) ? i : void 0
    };
  }
  return t.inherit !== !1 ? a : {};
}
function E4(t) {
  const { initial: a, animate: s } = j4(t, g.useContext(eu));
  return g.useMemo(() => ({ initial: a, animate: s }), [Bb(a), Bb(s)]);
}
function Bb(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const Em = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function dw(t, a, s) {
  for (const i in a)
    !xn(a[i]) && !tw(i, s) && (t[i] = a[i]);
}
function N4({ transformTemplate: t }, a) {
  return g.useMemo(() => {
    const s = Em();
    return bm(s, a, t), Object.assign({}, s.vars, s.style);
  }, [a]);
}
function C4(t, a) {
  const s = t.style || {}, i = {};
  return dw(i, s, t), Object.assign(i, N4(t, a)), i;
}
function T4(t, a) {
  const s = {}, i = C4(t, a);
  return t.drag && t.dragListener !== !1 && (s.draggable = !1, i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none", i.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (s.tabIndex = 0), s.style = i, s;
}
const fw = () => ({
  ...Em(),
  attrs: {}
});
function R4(t, a, s, i) {
  const o = g.useMemo(() => {
    const u = fw();
    return nw(u, a, rw(i), t.transformTemplate, t.style), {
      ...u.attrs,
      style: { ...u.style }
    };
  }, [a]);
  if (t.style) {
    const u = {};
    dw(u, t.style, t), o.style = { ...u, ...o.style };
  }
  return o;
}
const _4 = [
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
function Nm(t) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof t != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    t.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(_4.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function M4(t, a, s, { latestValues: i }, o, u = !1, f) {
  const y = (f ?? Nm(t) ? R4 : T4)(a, i, o, t), p = w4(a, typeof t == "string", u), b = t !== g.Fragment ? { ...p, ...y, ref: s } : {}, { children: v } = a, S = g.useMemo(() => xn(v) ? v.get() : v, [v]);
  return g.createElement(t, {
    ...b,
    children: S
  });
}
function A4({ scrapeMotionValuesFromProps: t, createRenderState: a }, s, i, o) {
  return {
    latestValues: k4(s, i, o, t),
    renderState: a()
  };
}
function k4(t, a, s, i) {
  const o = {}, u = i(t, {});
  for (const S in u)
    o[S] = d4(u[S]);
  let { initial: f, animate: m } = t;
  const y = Wc(t), p = QS(t);
  a && p && !y && t.inherit !== !1 && (f === void 0 && (f = a.initial), m === void 0 && (m = a.animate));
  let b = s ? s.initial === !1 : !1;
  b = b || f === !1;
  const v = b ? m : f;
  if (v && typeof v != "boolean" && !Jc(v)) {
    const S = Array.isArray(v) ? v : [v];
    for (let w = 0; w < S.length; w++) {
      const j = hm(t, S[w]);
      if (j) {
        const { transitionEnd: C, transition: _, ...T } = j;
        for (const O in T) {
          let R = T[O];
          if (Array.isArray(R)) {
            const N = b ? R.length - 1 : 0;
            R = R[N];
          }
          R !== null && (o[O] = R);
        }
        for (const O in C)
          o[O] = C[O];
      }
    }
  }
  return o;
}
const hw = (t) => (a, s) => {
  const i = g.useContext(eu), o = g.useContext(Xc), u = () => A4(t, a, i, o);
  return s ? u() : am(u);
}, D4 = /* @__PURE__ */ hw({
  scrapeMotionValuesFromProps: xm,
  createRenderState: Em
}), z4 = /* @__PURE__ */ hw({
  scrapeMotionValuesFromProps: sw,
  createRenderState: fw
}), O4 = Symbol.for("motionComponentSymbol");
function L4(t, a, s) {
  const i = g.useRef(s);
  g.useInsertionEffect(() => {
    i.current = s;
  });
  const o = g.useRef(null);
  return g.useCallback((u) => {
    u && t.onMount?.(u);
    const f = i.current;
    if (typeof f == "function")
      if (u) {
        const m = f(u);
        typeof m == "function" && (o.current = m);
      } else o.current ? (o.current(), o.current = null) : f(u);
    else f && (f.current = u);
    a && (u ? a.mount(u) : a.unmount());
  }, [a]);
}
const $4 = g.createContext({});
function U4(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function B4(t, a, s, i, o, u) {
  const { visualElement: f } = g.useContext(eu), m = g.useContext(wm), y = g.useContext(Xc), p = g.useContext(Sm), b = p.reducedMotion, v = p.skipAnimations, S = g.useRef(null), w = g.useRef(!1);
  i = i || m.renderer, !S.current && i && (S.current = i(t, {
    visualState: a,
    parent: f,
    props: s,
    presenceContext: y,
    blockInitialAnimation: y ? y.initial === !1 : !1,
    reducedMotionConfig: b,
    skipAnimations: v,
    isSVG: u
  }), w.current && S.current && (S.current.manuallyAnimateOnMount = !0));
  const j = S.current, C = g.useContext($4);
  j && !j.projection && o && (j.type === "html" || j.type === "svg") && I4(S.current, s, o, C);
  const _ = g.useRef(!1);
  g.useInsertionEffect(() => {
    j && _.current && j.update(s, y);
  });
  const T = s[IS], O = g.useRef(!!T && typeof window < "u" && !window.MotionHandoffIsComplete?.(T) && window.MotionHasOptimisedAnimation?.(T));
  return Z1(() => {
    w.current = !0, j && (_.current = !0, window.MotionIsMounted = !0, j.updateFeatures(), j.scheduleRenderMicrotask(), O.current && j.animationState && j.animationState.animateChanges());
  }), g.useEffect(() => {
    j && (!O.current && j.animationState && j.animationState.animateChanges(), O.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(T);
    }), O.current = !1), j.enteringChildren = void 0);
  }), j;
}
function I4(t, a, s, i) {
  const { layoutId: o, layout: u, drag: f, dragConstraints: m, layoutScroll: y, layoutRoot: p, layoutAnchor: b, layoutCrossfade: v } = a;
  t.projection = new s(t.latestValues, a["data-framer-portal-id"] ? void 0 : mw(t.parent)), t.projection.setOptions({
    layoutId: o,
    layout: u,
    alwaysMeasureLayout: !!f || m && U4(m),
    visualElement: t,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof u == "string" ? u : "both",
    initialPromotionConfig: i,
    crossfade: v,
    layoutScroll: y,
    layoutRoot: p,
    layoutAnchor: b
  });
}
function mw(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : mw(t.parent);
}
function Ff(t, { forwardMotionProps: a = !1, type: s } = {}, i, o) {
  i && Nh(i);
  const u = s ? s === "svg" : Nm(t), f = u ? z4 : D4;
  function m(p, b) {
    let v;
    const S = {
      ...g.useContext(Sm),
      ...p,
      layoutId: V4(p)
    }, { isStatic: w } = S, j = E4(p), C = f(p, w);
    if (!w && typeof window < "u") {
      q4();
      const _ = H4(S);
      v = _.MeasureLayout, j.visualElement = B4(t, C, S, o, _.ProjectionNode, u);
    }
    return c.jsxs(eu.Provider, { value: j, children: [v && j.visualElement ? c.jsx(v, { visualElement: j.visualElement, ...S }) : null, M4(t, p, L4(C, j.visualElement, b), C, w, a, u)] });
  }
  m.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const y = g.forwardRef(m);
  return y[O4] = t, y;
}
function V4({ layoutId: t }) {
  const a = g.useContext(Q1).id;
  return a && t !== void 0 ? a + "-" + t : t;
}
function q4(t, a) {
  g.useContext(wm).strict;
}
function H4(t) {
  const a = cw(), { drag: s, layout: i } = a;
  if (!s && !i)
    return {};
  const o = { ...s, ...i };
  return {
    MeasureLayout: s?.isEnabled(t) || i?.isEnabled(t) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function F4(t, a) {
  if (typeof Proxy > "u")
    return Ff;
  const s = /* @__PURE__ */ new Map(), i = (u, f) => Ff(u, f, t, a), o = (u, f) => i(u, f);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (u, f) => f === "create" ? i : (s.has(f) || s.set(f, Ff(f, void 0, t, a)), s.get(f))
  });
}
const Cm = /* @__PURE__ */ F4(), P4 = (t, a) => a.isSVG ?? Nm(t) ? new r4(a) : new Jz(a, {
  allowProjection: t !== g.Fragment
});
class G4 extends oi {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = c4(a));
  }
  updateAnimationControlsSubscription() {
    const { animate: a } = this.node.getProps();
    Jc(a) && (this.unmountControls = a.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: a } = this.node.getProps(), { animate: s } = this.node.prevProps || {};
    a !== s && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let Y4 = 0;
class K4 extends oi {
  constructor() {
    super(...arguments), this.id = Y4++, this.isExitComplete = !1;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: a, onExitComplete: s } = this.node.presenceContext, { isPresent: i } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || a === i)
      return;
    if (a && i === !1) {
      if (this.isExitComplete) {
        const { initial: u, custom: f } = this.node.getProps();
        if (typeof u == "string") {
          const m = es(this.node, u, f);
          if (m) {
            const { transition: y, transitionEnd: p, ...b } = m;
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
    s && !a && o.then(() => {
      this.isExitComplete = !0, s(this.id);
    });
  }
  mount() {
    const { register: a, onExitComplete: s } = this.node.presenceContext || {};
    s && s(this.id), a && (this.unmount = a(this.id));
  }
  unmount() {
  }
}
const X4 = {
  animation: {
    Feature: G4
  },
  exit: {
    Feature: K4
  }
};
function pw(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
function Ib(t, a, s) {
  const { props: i } = t;
  t.animationState && i.whileHover && t.animationState.setActive("whileHover", s === "Start");
  const o = "onHover" + s, u = i[o];
  u && na.postRender(() => u(a, pw(a)));
}
class Q4 extends oi {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = Mz(a, (s, i) => (Ib(this.node, i, "Start"), (o) => Ib(this.node, o, "End"))));
  }
  unmount() {
  }
}
class Z4 extends oi {
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
    this.unmount = Qc(zb(this.node.current, "focus", () => this.onFocus()), zb(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Vb(t, a, s) {
  const { props: i } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && i.whileTap && t.animationState.setActive("whileTap", s === "Start");
  const o = "onTap" + (s === "End" ? "" : s), u = i[o];
  u && na.postRender(() => u(a, pw(a)));
}
class J4 extends oi {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: s, propagate: i } = this.node.props;
    this.unmount = Oz(a, (o, u) => (Vb(this.node, u, "Start"), (f, { success: m }) => Vb(this.node, f, m ? "End" : "Cancel")), {
      useGlobalTarget: s,
      stopPropagation: i?.tap === !1
    });
  }
  unmount() {
  }
}
const Ch = /* @__PURE__ */ new WeakMap(), Pf = /* @__PURE__ */ new WeakMap(), W4 = (t) => {
  const a = Ch.get(t.target);
  a && a(t);
}, eO = (t) => {
  t.forEach(W4);
};
function tO({ root: t, ...a }) {
  const s = t || document;
  Pf.has(s) || Pf.set(s, {});
  const i = Pf.get(s), o = JSON.stringify(a);
  return i[o] || (i[o] = new IntersectionObserver(eO, { root: t, ...a })), i[o];
}
function nO(t, a, s) {
  const i = tO(a);
  return Ch.set(t, s), i.observe(t), () => {
    Ch.delete(t), i.unobserve(t);
  };
}
const aO = {
  some: 0,
  all: 1
};
class rO extends oi {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: s, margin: i, amount: o = "some", once: u } = a, f = {
      root: s ? s.current : void 0,
      rootMargin: i,
      threshold: typeof o == "number" ? o : aO[o]
    }, m = (y) => {
      const { isIntersecting: p } = y;
      if (this.isInView === p || (this.isInView = p, u && !p && this.hasEnteredView))
        return;
      p && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", p);
      const { onViewportEnter: b, onViewportLeave: v } = this.node.getProps(), S = p ? b : v;
      S && S(y);
    };
    this.stopObserver = nO(this.node.current, f, m);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: s } = this.node;
    ["amount", "margin", "root"].some(sO(a, s)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function sO({ viewport: t = {} }, { viewport: a = {} } = {}) {
  return (s) => t[s] !== a[s];
}
const iO = {
  inView: {
    Feature: rO
  },
  tap: {
    Feature: J4
  },
  focus: {
    Feature: Z4
  },
  hover: {
    Feature: Q4
  }
}, Tm = {
  renderer: P4,
  ...X4,
  ...iO
};
function lO() {
  !ym.current && ZS();
  const [t] = g.useState(Oc.current);
  return t;
}
const Th = "emotion-tts:trigger-generate", Rh = "emotion-tts:run-state", _h = "emotion-tts:run-completed";
function oO() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Th));
}
function cO(t) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Rh, { detail: t }));
}
function uO(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(Th, t), () => window.removeEventListener(Th, t));
}
function gw(t) {
  if (typeof window > "u") return () => {
  };
  const a = (s) => {
    const i = s.detail;
    i && t(i);
  };
  return window.addEventListener(Rh, a), () => window.removeEventListener(Rh, a);
}
function qb() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(_h));
}
function dO(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(_h, t), () => window.removeEventListener(_h, t));
}
var fO = "wksjad0", hO = "wksjad1", mO = "wksjad2", pO = "wksjad3", gO = "wksjad4", vO = "wksjad5", Hb = "wksjad6", yO = "wksjad7", bO = "wksjad8", xO = "wksjad9", SO = "wksjada", wO = "wksjadb", jO = "wksjadc", EO = "wksjadd", NO = "wksjade", CO = "wksjadf", TO = "wksjadg", Gf = "wksjadh", RO = "wksjadi", _O = "wksjadj", MO = "wksjadk", AO = "wksjadl", kO = "wksjadm", DO = "wksjadn";
const Mh = 5, zO = 5e-3;
function tu(t, a = "") {
  return `${ha}/deployments/${t}/artifacts${a}`;
}
async function OO(t, a, s) {
  const i = await fetch(tu(t, `/${a}/download`), {
    headers: { accept: "application/octet-stream" }
  });
  if (!i.ok) throw new Error(`download failed: HTTP ${i.status}`);
  const o = await i.blob(), u = URL.createObjectURL(o);
  try {
    const f = document.createElement("a");
    f.href = u, f.download = s, document.body.appendChild(f), f.click(), document.body.removeChild(f);
  } finally {
    URL.revokeObjectURL(u);
  }
}
async function LO(t, a) {
  const s = a.map((o) => encodeURIComponent(o)).join(","), i = await fetch(tu(t, `?utteranceIds=${s}`), {
    method: "DELETE",
    headers: { accept: "application/json" }
  });
  if (!i.ok) throw new Error(`clear failed: HTTP ${i.status}`);
}
function $O(t) {
  const [a, s] = g.useState([]), [i, o] = g.useState(!1), [u, f] = g.useState(null), [m, y] = g.useState(0), p = g.useRef(null), b = g.useRef(!1), v = g.useCallback(() => y((S) => S + 1), []);
  return g.useEffect(() => {
    p.current?.abort();
    const S = new AbortController();
    return p.current = S, o(!0), f(null), fetch(`${tu(t)}?limit=${Mh}`, {
      headers: { accept: "application/json" },
      signal: S.signal
    }).then(async (w) => {
      if (!w.ok)
        throw new Error(`HTTP ${w.status}`);
      const j = await w.json();
      S.signal.aborted || s(j.artifacts.slice(0, Mh));
    }).catch((w) => {
      if (S.signal.aborted) return;
      const j = w instanceof Error ? w.message : "fetch failed";
      f(j);
    }).finally(() => {
      S.signal.aborted || o(!1);
    }), () => S.abort();
  }, [t, m]), g.useEffect(() => gw((S) => {
    const w = b.current;
    b.current = S.busy, w && !S.busy && v();
  }), [v]), { rows: a, loading: i, error: u, refetch: v, tick: m };
}
function UO(t, a) {
  const [s, i] = g.useState(() => /* @__PURE__ */ new Map());
  return g.useEffect(() => {
    let o = !1;
    return Zs(t).then(({ voiceAssets: u }) => {
      if (o) return;
      const f = /* @__PURE__ */ new Map();
      for (const m of u)
        f.set(m.voiceAssetId, m.displayName);
      i(f);
    }).catch(() => {
    }), () => {
      o = !0;
    };
  }, [t, a]), s;
}
function BO({
  deploymentId: t,
  speedFactor: a
}) {
  const { rows: s, loading: i, error: o, refetch: u, tick: f } = $O(t), m = UO(t, f), [y, p] = g.useState(null), [b, v] = g.useState(null), [S, w] = g.useState(!1), j = lO(), C = g.useCallback(() => {
    p(null), v(null), u();
  }, [u]), _ = g.useCallback(
    async (R, N) => {
      v(null);
      try {
        await OO(t, R, N);
      } catch (B) {
        v(B instanceof Error ? B.message : "download failed");
      }
    },
    [t]
  ), T = s, O = g.useCallback(async () => {
    const R = T.map((N) => N.utteranceId);
    if (R.length !== 0 && window.confirm(`Remove the ${R.length} shown generation${R.length === 1 ? "" : "s"} from this list?`)) {
      w(!0), v(null), p(null);
      try {
        await LO(t, R), u();
      } catch (N) {
        v(N instanceof Error ? N.message : "clear failed");
      } finally {
        w(!1);
      }
    }
  }, [T, t, u]);
  return !i && !o && T.length === 0 ? null : /* @__PURE__ */ c.jsxs("section", { className: fO, "aria-labelledby": "recent-gen-eyebrow", children: [
    /* @__PURE__ */ c.jsxs("header", { className: hO, children: [
      /* @__PURE__ */ c.jsx("span", { className: mO, id: "recent-gen-eyebrow", children: "Recent generations" }),
      /* @__PURE__ */ c.jsxs("span", { className: pO, children: [
        /* @__PURE__ */ c.jsx("span", { className: gO, children: T.length }),
        /* @__PURE__ */ c.jsxs("span", { className: vO, children: [
          "last ",
          Mh
        ] }),
        /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: Hb,
            onClick: C,
            "aria-label": "Refresh",
            title: "Refresh",
            children: "↻"
          }
        ),
        /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: Hb,
            onClick: () => void O(),
            disabled: S || T.length === 0,
            "aria-label": "Clear list",
            title: "Clear the shown generations",
            children: /* @__PURE__ */ c.jsxs(
              "svg",
              {
                width: "14",
                height: "14",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ c.jsx("path", { d: "M3 6h18" }),
                  /* @__PURE__ */ c.jsx("path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }),
                  /* @__PURE__ */ c.jsx("path", { d: "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" }),
                  /* @__PURE__ */ c.jsx("path", { d: "M10 11v6" }),
                  /* @__PURE__ */ c.jsx("path", { d: "M14 11v6" })
                ]
              }
            )
          }
        )
      ] })
    ] }),
    (o || b) && /* @__PURE__ */ c.jsx("div", { className: DO, role: "alert", children: o ?? b }),
    /* @__PURE__ */ c.jsx(jm, { features: Tm, strict: !0, children: /* @__PURE__ */ c.jsx("ul", { className: yO, children: /* @__PURE__ */ c.jsx(ow, { initial: !1, children: T.map((R) => {
      const N = y === R.utteranceId, B = tu(
        t,
        `/${R.utteranceId}/download`
      ), G = R.voiceAssetId ? m.get(R.voiceAssetId) ?? null : null;
      return /* @__PURE__ */ c.jsxs(
        Cm.li,
        {
          className: bO,
          initial: j ? { opacity: 1 } : { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: j ? { opacity: 0 } : { opacity: 0, y: 6 },
          transition: {
            duration: j ? 0 : 0.18,
            ease: [0.2, 0, 0, 1]
          },
          "data-playing": N || void 0,
          children: [
            /* @__PURE__ */ c.jsxs("div", { className: xO, children: [
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: SO,
                  onClick: () => p(
                    (te) => te === R.utteranceId ? null : R.utteranceId
                  ),
                  "aria-label": "Preview",
                  "aria-pressed": N,
                  children: N ? "■" : "▶"
                }
              ),
              /* @__PURE__ */ c.jsxs("div", { className: wO, children: [
                /* @__PURE__ */ c.jsxs("div", { className: jO, children: [
                  /* @__PURE__ */ c.jsx("span", { className: EO, children: R.characterDisplay }),
                  /* @__PURE__ */ c.jsx("span", { className: NO, title: R.text, children: R.text })
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: CO, children: [
                  /* @__PURE__ */ c.jsx("span", { className: TO, children: VO(R.finishedAt) }),
                  G && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    /* @__PURE__ */ c.jsx("span", { className: Gf, "aria-hidden": "true", children: "·" }),
                    /* @__PURE__ */ c.jsx("span", { className: RO, children: G })
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: Gf, "aria-hidden": "true", children: "·" }),
                  /* @__PURE__ */ c.jsx("span", { className: _O, children: IO(R.durationMs) }),
                  a !== void 0 && Math.abs(a - 1) > zO && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    /* @__PURE__ */ c.jsx("span", { className: Gf, "aria-hidden": "true", children: "·" }),
                    /* @__PURE__ */ c.jsxs("span", { className: MO, children: [
                      a.toFixed(2),
                      "×"
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: AO,
                  onClick: () => void _(R.utteranceId, R.filename),
                  "aria-label": `Download ${R.filename}`,
                  title: "Download",
                  children: "↓"
                }
              )
            ] }),
            N && /* @__PURE__ */ c.jsx(
              "audio",
              {
                className: kO,
                src: B,
                controls: !0,
                autoPlay: !0,
                preload: "auto",
                children: /* @__PURE__ */ c.jsx("track", { kind: "captions" })
              }
            )
          ]
        },
        R.utteranceId
      );
    }) }) }) })
  ] });
}
function IO(t) {
  if (t == null || t <= 0) return "—";
  const a = Math.round(t / 1e3), s = Math.floor(a / 60), i = a % 60;
  return s > 0 ? `${s}:${i.toString().padStart(2, "0")}` : `${i}s`;
}
function VO(t) {
  if (!t) return "—";
  const s = Math.floor(Date.now() / 1e3) - t;
  return s < 0 ? "just now" : s < 60 ? `${s}s ago` : s < 3600 ? `${Math.floor(s / 60)}m ago` : s < 86400 ? `${Math.floor(s / 3600)}h ago` : s < 604800 ? `${Math.floor(s / 86400)}d ago` : new Date(t * 1e3).toLocaleDateString(void 0, { month: "short", day: "numeric" });
}
const qO = 6e3;
function HO(t) {
  const a = /* @__PURE__ */ new Map();
  for (const s of t)
    a.set(s.jobId, { jobId: s.jobId, runId: null, label: s.label, status: "queued" });
  return a;
}
function FO(t, a, s) {
  const i = t.find((u) => u.runId === a);
  if (!i) return null;
  const o = s - 1;
  return o < 0 || o >= i.jobs.length ? null : i.jobs[o]?.jobId ?? null;
}
function PO(t, a, s) {
  if (s.type === "run_terminal") return t;
  const i = FO(a, s.runId, s.globalIndex);
  if (!i) return t;
  const o = t.get(i);
  if (!o) return t;
  const u = new Map(t);
  switch (s.type) {
    case "segment_started":
      if (o.status !== "queued") break;
      u.set(i, { ...o, runId: s.runId, status: "generating" });
      break;
    case "segment_completed":
      u.set(i, {
        ...o,
        runId: s.runId,
        status: "done",
        durationMs: s.durationMs,
        utteranceId: s.utteranceId,
        queuePosition: void 0,
        etaMs: void 0
      });
      break;
    case "segment_failed":
      u.set(i, {
        ...o,
        runId: s.runId,
        status: "failed",
        failureCategory: s.failureCategory,
        queuePosition: void 0,
        etaMs: void 0
      });
      break;
  }
  return u;
}
function GO(t) {
  return t === "done" || t === "failed" || t === "cancelled";
}
function YO(t) {
  if (t.size === 0) return !1;
  for (const a of t.values())
    if (!GO(a.status)) return !1;
  return !0;
}
function KO(t) {
  let a = 0, s = 0;
  for (const i of t.values())
    i.status === "done" && typeof i.durationMs == "number" && (a += i.durationMs, s += 1);
  return s > 0 ? a / s : qO;
}
function Fb(t, a) {
  const s = KO(t), i = new Map(t);
  for (const o of a) {
    const u = o.jobs.map((m) => i.get(m.jobId)).filter((m) => m != null && m.status === "queued"), f = u.length;
    u.forEach((m, y) => {
      i.set(m.jobId, {
        ...m,
        queuePosition: y + 1,
        queueTotal: f,
        etaMs: Math.max(0, Math.round(y * s))
      });
    });
  }
  return i;
}
function XO(t) {
  const a = /* @__PURE__ */ new Map();
  for (const s of t.values())
    a.set(s.jobId, {
      jobId: s.jobId,
      runId: s.runId,
      status: s.status,
      queuePosition: s.queuePosition,
      queueTotal: s.queueTotal,
      etaMs: s.etaMs,
      durationMs: s.durationMs,
      failureCategory: s.failureCategory,
      utteranceId: s.utteranceId
    });
  return a;
}
function QO(t) {
  const a = { queued: 0, generating: 0, done: 0, failed: 0, cancelled: 0 };
  for (const s of t.values())
    a[s.status] += 1;
  return a;
}
function ZO(t) {
  return t === window ? window.scrollY || document.documentElement.scrollTop || 0 : t.scrollTop;
}
function vw() {
  const t = [window];
  if (typeof document > "u") return t;
  let a = document.querySelector("emotion-tts-app");
  for (; a; ) {
    const s = window.getComputedStyle(a);
    (/(auto|scroll|overlay)/.test(s.overflowY) || /(auto|scroll|overlay)/.test(s.overflow)) && t.push(a), a = a.parentElement;
  }
  return t;
}
function JO() {
  if (typeof window > "u") return;
  const t = vw();
  for (const a of t)
    a === window ? window.scrollTo({ top: 0, behavior: "smooth" }) : a.scrollTo({ top: 0, behavior: "smooth" });
}
function yw(t) {
  const [a, s] = g.useState(!1);
  return g.useEffect(() => {
    if (typeof window > "u") return;
    const i = vw(), o = () => {
      const f = i.reduce((m, y) => {
        const p = ZO(y);
        return p > m ? p : m;
      }, 0);
      s(f > t);
    };
    o();
    const u = { passive: !0 };
    for (const f of i)
      f.addEventListener("scroll", o, u);
    return () => {
      for (const f of i)
        f.removeEventListener("scroll", o, u);
    };
  }, [t]), a;
}
const bw = 360;
var WO = "_1s59p180", eL = "_1s59p181", tL = "_1s59p182", nL = "_1s59p183", aL = "_1s59p184", rL = "_1s59p185", sL = "_1s59p186", iL = "_1s59p188", lL = "_1s59p189", Pb = "_1s59p18a", oL = "_1s59p18c", cL = "_1s59p18d", uL = "_1s59p18e", dL = "_1s59p18f", fL = "_1s59p18g", hL = "_1s59p18i", mL = "_1s59p18j", pL = "_1s59p18k", gL = "_1s59p18l", vL = "_1s59p18n", yL = "_1s59p18o", bL = "_1s59p18p", xL = "_1s59p18q", SL = "_1s59p18r", wL = "_1s59p18s", jL = "_1s59p18t", Gb = "_1s59p18u", EL = "_1s59p18v", NL = "_1s59p18x";
const CL = 4e3;
function TL(t) {
  const a = ni(), s = t.storyboardJobs, i = (s?.length ?? 0) > 0, [o, u] = g.useState("idle"), [f, m] = g.useState(null), [y, p] = g.useState(/* @__PURE__ */ new Map()), [b, v] = g.useState(/* @__PURE__ */ new Map()), [S, w] = g.useState([]), [j, C] = g.useState(null), [_, T] = g.useState(null), [O, R] = g.useState(null), N = g.useRef(null), B = g.useRef([]), G = g.useRef([]), te = g.useRef(!1);
  g.useEffect(() => {
    G.current = S;
  }, [S]);
  const M = g.useCallback(() => {
    N.current?.(), N.current = null;
    for (const Te of B.current) Te();
    B.current = [];
  }, []);
  g.useEffect(() => () => {
    M();
  }, [M]), g.useEffect(() => {
    let Te = !1;
    const He = async () => {
      try {
        const St = await yl();
        Te || R(St);
      } catch {
      }
    };
    He();
    const at = window.setInterval(He, CL);
    return () => {
      Te = !0, window.clearInterval(at);
    };
  }, []), g.useEffect(() => {
    cO({ busy: o === "starting" || o === "running" });
  }, [o]), g.useEffect(() => {
    t.onJobProgressChange && t.onJobProgressChange(XO(b));
  }, [b, t.onJobProgressChange]);
  const q = g.useCallback(
    (Te) => {
      const He = Te.status;
      (He === "completed" || He === "partial") && (qb(), mn.success(
        He === "completed" ? "Run complete — open the Artifacts tab to download" : "Partial run — open the Artifacts tab for what was produced",
        {
          action: {
            label: "Artifacts",
            onClick: () => {
              a(`/${t.deploymentId}?tab=artifacts`);
            }
          }
        }
      ));
    },
    [a, t.deploymentId]
  ), D = g.useCallback(async () => {
    const Te = s ?? [];
    u("starting"), C(null), p(/* @__PURE__ */ new Map()), T(null), m(null), te.current = !1, M();
    const He = Math.max(1, O?.workersActive ?? 1), at = AT([...Te], He), St = at.map((ot) => ({
      ...t.createPayload,
      prebuiltSegments: ot.map((Ke) => Ke.segment)
    }));
    try {
      const Ke = (await MT(t.deploymentId, St)).map((je, ke) => ({
        runId: je.runId,
        jobs: at[ke] ?? []
      }));
      G.current = Ke, w(Ke), v(Fb(HO(Te), Ke)), u("running");
      const gt = Ke.map(
        (je) => Sf(
          t.deploymentId,
          je.runId,
          (ke) => {
            v((Pe) => {
              const Xe = PO(Pe, G.current, ke), yt = Fb(Xe, G.current);
              return YO(yt) && !te.current && (te.current = !0, M(), u("terminal"), qb()), yt;
            });
          },
          () => u("error")
        )
      );
      B.current = gt;
    } catch (ot) {
      u("error"), C(ic(ot));
    }
  }, [
    s,
    O?.workersActive,
    t.deploymentId,
    t.createPayload,
    M
  ]), F = g.useCallback(async () => {
    u("starting"), C(null), p(/* @__PURE__ */ new Map()), T(null);
    try {
      const Te = await R1(t.deploymentId, t.createPayload);
      m(Te.runId), u("running"), M(), N.current = Sf(
        t.deploymentId,
        Te.runId,
        (He) => Kb(
          He,
          p,
          u,
          (at) => {
            T(at), q(at);
          },
          t.deploymentId,
          Te.runId
        ),
        () => u("error")
      );
    } catch (Te) {
      u("error"), C(ic(Te));
    }
  }, [t.deploymentId, t.createPayload, q, M]), Z = g.useCallback(async () => {
    i ? await D() : await F();
  }, [i, D, F]);
  g.useEffect(() => uO(() => {
    (o === "idle" || o === "terminal" || o === "error") && Z();
  }), [o, Z]);
  const J = g.useCallback(async () => {
    if (i) {
      const Te = G.current.map((He) => He.runId);
      await Promise.all(
        Te.map(
          (He) => Jy(t.deploymentId, He).catch(() => {
          })
        )
      ), te.current = !0, M(), v((He) => {
        const at = new Map(He);
        for (const [St, ot] of He)
          (ot.status === "queued" || ot.status === "generating") && at.set(St, {
            ...ot,
            status: "cancelled",
            queuePosition: void 0,
            etaMs: void 0
          });
        return at;
      }), u("terminal");
      return;
    }
    if (f)
      try {
        await Jy(t.deploymentId, f);
      } catch (Te) {
        C(ic(Te));
      }
  }, [i, t.deploymentId, f, M]), P = Array.from(y.values()).sort((Te, He) => Te.globalIndex - He.globalIndex), ie = g.useMemo(
    () => (s ?? []).map((Te) => b.get(Te.jobId)).filter((Te) => Te != null),
    [s, b]
  ), A = g.useMemo(() => QO(b), [b]), V = o === "starting" || o === "running", $ = _?.status === "partial", se = i ? A.generating : P.filter((Te) => Te.status === "running").length, fe = i ? A.done : P.filter((Te) => Te.status === "completed").length, k = i ? o === "starting" || o === "running" || ie.length > 0 : o === "starting" || o === "running" || P.length > 0, ne = P.filter((Te) => Te.status === "failed"), ae = g.useMemo(() => {
    if (o !== "terminal") return null;
    const Te = i ? ie.filter((Ke) => Ke.status === "failed").map((Ke) => Ke.failureCategory ?? "unknown") : ne.map((Ke) => Ke.failureCategory ?? "unknown");
    if (Te.length === 0) return null;
    const He = /* @__PURE__ */ new Map();
    for (const Ke of Te) He.set(Ke, (He.get(Ke) ?? 0) + 1);
    let at = "unknown", St = 0;
    for (const [Ke, gt] of He)
      gt > St && (at = Ke, St = gt);
    const ot = i ? ie.length : P.length;
    return { category: at, count: St, total: ot };
  }, [o, i, ie, ne, P]), K = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, U = "Check the run detail page for the per-segment error log.", W = j?.toLowerCase().includes("unmapped") ?? !1, ue = t.diagnostics ?? [], be = O?.badge ?? "not_installed", Ae = be === "ready" || be === "running", lt = s?.length ?? 0, Ne = Ae ? t.canGenerate ? null : "Nothing to generate yet" : "Start runtime to generate", We = o === "starting" ? "Starting…" : o === "running" ? i ? `Generating ${lt} segment${lt === 1 ? "" : "s"}…` : "Generating…" : Ne ?? "Generate", Be = !t.canGenerate || V || !Ae, Fe = o === "starting" || o === "running", rn = Fe ? "running" : Be ? "blocked" : "idle", At = !yw(bw) || Fe;
  return /* @__PURE__ */ c.jsxs("div", { className: WO, children: [
    /* @__PURE__ */ c.jsxs("div", { className: eL, children: [
      /* @__PURE__ */ c.jsxs("div", { className: nL, children: [
        /* @__PURE__ */ c.jsxs("span", { className: aL, children: [
          /* @__PURE__ */ c.jsx("span", { className: tL, "aria-hidden": "true", children: "01" }),
          "Pre-flight",
          k && /* @__PURE__ */ c.jsxs("span", { className: fL, children: [
            /* @__PURE__ */ c.jsx("span", { className: hL, "aria-hidden": "true" }),
            se > 0 ? `${se} generating` : `${fe} done`
          ] })
        ] }),
        ue.length > 0 ? /* @__PURE__ */ c.jsx("ul", { className: rL, "aria-label": "Pre-flight checks", children: ue.map((Te) => /* @__PURE__ */ c.jsxs("li", { className: sL, children: [
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: iL,
              "data-status": Te.status,
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ c.jsx("span", { className: lL, children: Te.label }),
          Te.detail && /* @__PURE__ */ c.jsx("span", { className: Pb, children: Te.detail })
        ] }, Te.label)) }) : /* @__PURE__ */ c.jsx("span", { className: Pb, children: "Ready when you are." })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: oL, "data-state": rn, children: [
        At ? /* @__PURE__ */ c.jsxs(
          Ze,
          {
            variant: "primary",
            size: "sm",
            onClick: Z,
            disabled: Be,
            loading: Fe,
            title: Ne ?? void 0,
            children: [
              !Fe && /* @__PURE__ */ c.jsx("span", { className: cL, "aria-hidden": "true", children: "▶" }),
              We
            ]
          }
        ) : /* @__PURE__ */ c.jsxs("span", { className: uL, "aria-hidden": "true", children: [
          "Generate available in toolbar",
          /* @__PURE__ */ c.jsx("span", { className: dL, children: "↑" })
        ] }),
        V && /* @__PURE__ */ c.jsx(
          Ze,
          {
            variant: "ghost",
            size: "xs",
            onClick: J,
            "aria-label": i ? "Cancel all running segments" : "Cancel current run",
            children: "Cancel"
          }
        )
      ] })
    ] }),
    j && /* @__PURE__ */ c.jsxs(
      kn,
      {
        severity: "error",
        style: {
          marginBottom: 12,
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 8
        },
        children: [
          /* @__PURE__ */ c.jsx("strong", { children: "Run failed to start" }),
          /* @__PURE__ */ c.jsx("span", { children: j }),
          W && /* @__PURE__ */ c.jsx(
            Ze,
            {
              variant: "secondary",
              onClick: () => a(`/${t.deploymentId}/mappings`),
              style: { alignSelf: "flex-start" },
              children: "Open Mappings →"
            }
          )
        ]
      }
    ),
    ae && /* @__PURE__ */ c.jsxs(kn, { severity: "error", style: { flexDirection: "column", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ c.jsxs("strong", { children: [
        "Run failed — ",
        ae.count,
        " of ",
        ae.total,
        " segments failed with ",
        /* @__PURE__ */ c.jsx("code", { children: ae.category })
      ] }),
      /* @__PURE__ */ c.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: K[ae.category] ?? U })
    ] }),
    _?.exportArtifactRef && // audit-allow: download anchor — Button primitive lacks <a> polymorphic
    /* @__PURE__ */ c.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${_.exportArtifactRef}/download`,
        download: !0,
        className: `${k1.secondary} ${D1.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    $ && _ && /* @__PURE__ */ c.jsxs(kn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ c.jsx(
        Ze,
        {
          variant: "secondary",
          disabled: !1,
          onClick: async () => {
            try {
              const Te = await _1(t.deploymentId, _.runId);
              m(Te.runId), p(/* @__PURE__ */ new Map()), T(null), u("running"), M(), N.current = Sf(
                t.deploymentId,
                Te.runId,
                (He) => Kb(He, p, u, T, t.deploymentId, Te.runId),
                () => u("error")
              );
            } catch (Te) {
              C(ic(Te)), u("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    i && ie.length > 0 && /* @__PURE__ */ c.jsx(AL, { items: ie, counts: A }),
    !i && P.length > 0 && /* @__PURE__ */ c.jsxs("table", { className: y_, children: [
      /* @__PURE__ */ c.jsx("thead", { children: /* @__PURE__ */ c.jsxs("tr", { children: [
        /* @__PURE__ */ c.jsx("th", { className: pr, children: "#" }),
        /* @__PURE__ */ c.jsx("th", { className: pr, children: "Status" }),
        /* @__PURE__ */ c.jsx("th", { className: pr, children: "Duration" }),
        /* @__PURE__ */ c.jsx("th", { className: pr, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ c.jsx("tbody", { children: P.map((Te) => /* @__PURE__ */ c.jsxs("tr", { className: b_, children: [
        /* @__PURE__ */ c.jsx("td", { className: pr, children: Te.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ c.jsx("td", { className: pr, children: /* @__PURE__ */ c.jsx(Er, { tone: kL(Te.status), children: Te.status }) }),
        /* @__PURE__ */ c.jsx("td", { className: pr, children: Te.durationMs ? `${Te.durationMs} ms` : "—" }),
        /* @__PURE__ */ c.jsx("td", { className: pr, children: Te.failureCategory ?? "" })
      ] }, Te.globalIndex)) })
    ] })
  ] });
}
function RL(t) {
  return `~${Math.max(1, Math.round(t / 1e3))}s`;
}
function _L(t) {
  switch (t) {
    case "done":
      return "success";
    case "generating":
      return "accent";
    case "failed":
      return "danger";
    default:
      return "neutral";
  }
}
function Yb(t) {
  switch (t) {
    case "done":
      return "Ready";
    case "generating":
      return "Generating";
    case "failed":
      return "Failed";
    case "cancelled":
      return "Cancelled";
    default:
      return "Queued";
  }
}
function ML(t) {
  if (t.generating > 0) return `${t.generating} generating`;
  const a = [`${t.done} done`];
  return t.failed > 0 && a.push(`${t.failed} failed`), t.cancelled > 0 && a.push(`${t.cancelled} cancelled`), a.join(" · ");
}
function AL({ items: t, counts: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: mL, role: "list", "aria-label": "Per-segment generation progress", children: [
    /* @__PURE__ */ c.jsxs("div", { className: pL, children: [
      /* @__PURE__ */ c.jsx("span", { className: gL, children: "Segments" }),
      /* @__PURE__ */ c.jsxs("span", { className: vL, "data-tone": a.generating > 0 ? "live" : "idle", children: [
        /* @__PURE__ */ c.jsx("span", { className: yL, "aria-hidden": "true" }),
        ML(a)
      ] })
    ] }),
    t.map((s) => /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: bL,
        role: "listitem",
        "data-status": s.status,
        "aria-label": `${s.label} — ${Yb(s.status)}`,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: xL, children: s.label }),
          /* @__PURE__ */ c.jsx("span", { className: SL, children: /* @__PURE__ */ c.jsx(Er, { tone: _L(s.status), pulse: s.status === "generating", children: Yb(s.status) }) }),
          /* @__PURE__ */ c.jsxs("span", { className: wL, children: [
            s.status === "generating" && /* @__PURE__ */ c.jsx("span", { className: NL, "aria-hidden": "true" }),
            s.status === "done" && typeof s.durationMs == "number" ? /* @__PURE__ */ c.jsxs("span", { className: jL, children: [
              (s.durationMs / 1e3).toFixed(1),
              "s"
            ] }) : s.status === "queued" && typeof s.etaMs == "number" ? /* @__PURE__ */ c.jsxs("span", { className: Gb, children: [
              s.queuePosition && s.queueTotal ? `#${s.queuePosition} · ` : "",
              RL(s.etaMs)
            ] }) : s.status === "generating" ? /* @__PURE__ */ c.jsx("span", { className: Gb, children: "working…" }) : null
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: EL, children: s.status === "failed" ? s.failureCategory ?? "error" : "" })
        ]
      },
      s.jobId
    ))
  ] });
}
async function Kb(t, a, s, i, o, u) {
  switch (t.type) {
    case "segment_started":
      a((f) => {
        const m = new Map(f);
        return m.set(t.globalIndex, { globalIndex: t.globalIndex, status: "running" }), m;
      });
      return;
    case "segment_completed":
      a((f) => {
        const m = new Map(f);
        return m.set(t.globalIndex, {
          globalIndex: t.globalIndex,
          status: "completed",
          durationMs: t.durationMs
        }), m;
      });
      return;
    case "segment_failed":
      a((f) => {
        const m = new Map(f);
        return m.set(t.globalIndex, {
          globalIndex: t.globalIndex,
          status: "failed",
          failureCategory: t.failureCategory
        }), m;
      });
      return;
    case "run_terminal":
      s("terminal");
      try {
        const f = await Jh(o, u);
        i(f);
      } catch {
      }
      return;
  }
}
function kL(t) {
  switch (t) {
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
function ic(t) {
  return t instanceof ai || t instanceof Error ? t.message : "unknown error";
}
function DL(t) {
  switch (t.status) {
    case "generating":
      return "rendering";
    case "done":
      return "ready";
    case "failed":
      return "failed";
    default:
      return "queued";
  }
}
const zL = {
  queued: { label: "Queued", color: "var(--outline, #747578)", glow: "rgba(116,117,120,0)", pulse: !1 },
  rendering: { label: "Rendering", color: "var(--primary, #ba9eff)", glow: "rgba(186,158,255,0.6)", pulse: !0 },
  ready: { label: "Ready", color: "var(--acid-green, #22c55e)", glow: "rgba(34,197,94,0.6)", pulse: !1 },
  failed: { label: "Failed", color: "var(--error, #ff6e84)", glow: "rgba(255,110,132,0.5)", pulse: !1 }
}, Xb = [
  { color: "#ba9eff", rgb: "186,158,255", onColor: "#2b006e" },
  { color: "#9093ff", rgb: "144,147,255", onColor: "#080079" },
  { color: "#ff8439", rgb: "255,132,57", onColor: "#471a00" },
  { color: "#21c7d9", rgb: "33,199,217", onColor: "#00363c" },
  { color: "#34d399", rgb: "52,211,153", onColor: "#003824" },
  { color: "#e879f9", rgb: "232,121,249", onColor: "#3b0a45" }
], Qb = [
  "record_voice_over",
  "graphic_eq",
  "mic_external_on",
  "interpreter_mode",
  "voice_chat",
  "spatial_audio"
];
function OL(t) {
  return t === 0 ? "Lead" : t === 1 ? "Support" : "Voice";
}
function LL(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function $L(t) {
  const a = t.filter((s) => s.isActive && (s.kind === "speaker" || s.kind === "mixed"));
  return a.length === 0 ? [] : a.map((s, i) => {
    const o = Xb[i % Xb.length], u = Qb[i % Qb.length];
    return {
      id: s.voiceAssetId,
      name: s.displayName || `Voice ${i + 1}`,
      role: OL(i),
      icon: u,
      color: o.color,
      rgb: o.rgb,
      onColor: o.onColor,
      initial: LL(s.displayName || "V"),
      lib: s.displayName || s.voiceAssetId
    };
  });
}
function xw(t) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
function UL(t) {
  const a = /* @__PURE__ */ new Set(), s = [];
  for (const i of t) {
    const o = xw(i.presetName);
    a.has(o) || (a.add(o), s.push({ id: o, label: i.presetName }));
  }
  return s;
}
function BL(t, a) {
  const s = t.find((o) => xw(o.presetName) === a);
  if (!s) return null;
  const i = s.vector;
  return Array.isArray(i) && i.length === 8 ? i : null;
}
function IL(t) {
  const a = t.split(/\n\s*\n/), s = [];
  let i = 0;
  for (const o of a) {
    if (!o.trim()) continue;
    const u = o.match(/\S+\s*/g) ?? [o];
    let f = !1;
    const m = u.map((y, p) => {
      const b = f || /[“”"]/.test(y) ? "dialogue" : "narration";
      for (const v of y)
        v === "“" ? f = !0 : v === "”" ? f = !1 : v === '"' && (f = !f);
      return { id: `p${i}s${p}`, text: y, kind: b };
    });
    s.push({ id: `p${i}`, segs: m }), i += 1;
  }
  return s;
}
function Ah(t) {
  const a = [];
  for (const s of t) for (const i of s.segs) a.push(i);
  return a;
}
function kh(t, a) {
  let s = 0;
  for (const i of t)
    for (const o of i.segs) {
      if (o.id === a) return s;
      s += 1;
    }
  return Number.MAX_SAFE_INTEGER;
}
function VL(t, a, s) {
  const i = [];
  let o = 0;
  for (const u of t)
    for (const f of u.segs)
      o >= a && o <= s && i.push(f.id), o += 1;
  return i;
}
function qL(t, a) {
  for (const s of t) for (const i of s.segs) if (i.id === a) return i.text;
  return "";
}
function sl(t, a) {
  return [...a].sort((s, i) => kh(t, s) - kh(t, i)).map((s) => qL(t, s)).join("").trim();
}
function Zb(t, a) {
  return Math.min(...a.segIds.map((s) => kh(t, s)));
}
function Sw(t, a) {
  return t.find((s) => s.segIds.includes(a));
}
function Jb(t, a) {
  return a.every((s) => !Sw(t, s));
}
function ww(t, a) {
  return [...a].sort((s, i) => Zb(t, s) - Zb(t, i));
}
function HL(t, a) {
  const s = {};
  return ww(t, a).forEach((i, o) => {
    s[i.id] = `SEG-${String(o + 1).padStart(3, "0")}`;
  }), s;
}
function FL(t) {
  return Ah(t).reduce(
    (a, s) => a + s.text.trim().split(/\s+/).filter(Boolean).length,
    0
  );
}
function PL(t) {
  const a = { queued: 0, rendering: 0, ready: 0, failed: 0 };
  for (const i of t) a[i.status] += 1;
  const s = [];
  return a.queued && s.push(`${a.queued} queued`), a.rendering && s.push(`${a.rendering} rendering`), a.ready && s.push(`${a.ready} ready`), a.failed && s.push(`${a.failed} failed`), s.join("  ·  ");
}
const fl = {
  id: "",
  name: "Unassigned",
  role: "",
  icon: "graphic_eq",
  color: "var(--on-surface-variant, #c4c7c5)",
  rgb: "120,124,128",
  onColor: "#15171a",
  initial: "—",
  lib: ""
};
function lc(t, a) {
  return t.find((s) => s.id === a) ?? t[0] ?? fl;
}
function Wb(t, a) {
  return t.find((s) => s.id === a)?.label ?? a;
}
var GL = "_171z55w1", YL = "_171z55w2", KL = "_171z55w3", ex = "_171z55w4", XL = "_171z55w5", QL = "_171z55w6", ZL = "_171z55w7", JL = "_171z55w8", WL = "_171z55w9", e6 = "_171z55wa", t6 = "_171z55wb", n6 = "_171z55wc", a6 = "_171z55wd", r6 = "_171z55we", s6 = "_171z55wh", i6 = "_171z55wi", tx = "_171z55wj", nx = "_171z55wk _171z55wj", l6 = "_171z55wl", o6 = "_171z55wm", c6 = "_171z55wn", u6 = "_171z55wo", ax = "_171z55wp", rx = "_171z55wq", d6 = "_171z55wr", f6 = "_171z55ws", h6 = "_171z55wt", m6 = "_171z55wu", p6 = "_171z55wv", g6 = "_171z55ww", v6 = "_171z55wx", y6 = "_171z55wy", b6 = "_171z55wz", x6 = "_171z55w10", S6 = "_171z55w11", w6 = "_171z55w12", j6 = "_171z55w13", E6 = "_171z55w14", sx = "_171z55w15", N6 = "_171z55w16", C6 = "_171z55w17", T6 = "_171z55w18", R6 = "_171z55w19", _6 = "_171z55w1a", M6 = "_171z55w1b", A6 = "_171z55w1c", k6 = "_171z55w1d", D6 = "_171z55w1e", z6 = "_171z55w1f", O6 = "_171z55w1g", L6 = "_171z55w1h", $6 = "_171z55w1i", U6 = "_171z55w1j", B6 = "_171z55w1k", I6 = "_171z55w1l";
function V6(t, a) {
  return !t || !a ? null : `${ha}/deployments/${t}/artifacts/${a}/download`;
}
function q6({
  voiceAssets: t,
  presets: a,
  storyText: s,
  onStoryTextChange: i,
  mappings: o,
  onQueueChange: u,
  onJobsChange: f,
  jobProgress: m,
  deploymentId: y
}) {
  const p = g.useMemo(() => $L(t), [t]), b = g.useMemo(() => UL(a), [a]), v = s, S = g.useMemo(() => IL(v), [v]), w = p[0]?.id ?? "", j = b[0]?.id ?? "", [C, _] = g.useState("voice"), [T, O] = g.useState(""), R = g.useMemo(
    () => K6(o, p),
    [o, p]
  ), [N, B] = g.useState([]), [G, te] = g.useState([]), [M, q] = g.useState(null), [D, F] = g.useState(null), [Z, J] = g.useState(w), [P, ie] = g.useState(j), [A, V] = g.useState(null), [$, se] = g.useState(null), [fe, k] = g.useState(null), [ne, ae] = g.useState(null), [K, U] = g.useState(!1), W = g.useRef(null), ue = g.useRef(null), be = g.useRef(/* @__PURE__ */ new Map()), Ae = g.useRef(null), lt = g.useRef(1e3), Ne = g.useCallback(() => (lt.current += 1, `job-${lt.current}`), []), We = g.useMemo(() => {
    const Y = /* @__PURE__ */ new Map();
    return Ah(S).forEach((ce, Ce) => Y.set(ce.id, Ce)), Y;
  }, [S]), Be = g.useCallback((Y) => We.get(Y) ?? Number.MAX_SAFE_INTEGER, [We]);
  g.useEffect(() => {
    const Y = new Set(Ah(S).map((ce) => ce.id));
    B((ce) => {
      const Ce = ce.filter((_e) => _e.segIds.every((Ge) => Y.has(Ge)));
      return Ce.length === ce.length ? ce : Ce;
    });
  }, [S]), g.useEffect(() => dO(() => B([])), []), g.useEffect(() => {
    if (p.length !== 0 && (J((Y) => p.some((ce) => ce.id === Y) ? Y : p[0].id), p.length === 1)) {
      const Y = p[0].id;
      B((ce) => {
        let Ce = !1;
        const _e = ce.map((Ge) => p.some((wt) => wt.id === Ge.voiceId) ? Ge : (Ce = !0, { ...Ge, voiceId: Y }));
        return Ce ? _e : ce;
      });
    }
  }, [p]);
  const Fe = g.useMemo(() => new Set(p.map((Y) => Y.id)), [p]), rn = g.useCallback(
    (Y) => !Fe.has(Y.voiceId),
    [Fe]
  ), qt = g.useCallback((Y) => {
    const ce = W.current;
    if (!ce || !Y) return { top: 60, left: 0 };
    const Ce = Y.getBoundingClientRect(), _e = ce.getBoundingClientRect();
    let Ge = Ce.left - _e.left + ce.scrollLeft;
    const wt = Ce.bottom - _e.top + ce.scrollTop + 10, ft = Math.max(0, ce.clientWidth - 318);
    return Ge = Math.max(0, Math.min(Ge, ft)), { top: wt, left: Ge };
  }, []), At = g.useCallback(() => {
    te([]), q(null), F(null), V(null);
  }, []), Te = g.useCallback(
    (Y, ce) => {
      const Ce = [...Y.segIds].sort((Ge, wt) => Be(Ge) - Be(wt))[0];
      if (!Ce) return;
      const _e = ce ?? be.current.get(Ce) ?? null;
      F(Y.id), te([...Y.segIds]), q(Ce), J(Y.voiceId), ie(Y.emotion), V(qt(_e)), k(Y.id);
    },
    [Be, qt]
  ), He = g.useCallback(
    (Y, ce, Ce) => {
      const _e = Sw(N, Y);
      if (_e) {
        Te(_e, ce);
        return;
      }
      const Ge = qt(ce);
      if (Ce && M != null && D == null) {
        const wt = Be(M), ft = Be(Y), z = VL(S, Math.min(wt, ft), Math.max(wt, ft));
        if (Jb(N, z)) {
          te(z), F(null), V(Ge);
          return;
        }
      }
      te([Y]), q(Y), F(null), V(Ge);
    },
    [N, S, M, D, qt, Te, Be]
  ), at = g.useCallback(() => {
    if (D) {
      B(
        (Ce) => Ce.map(
          (_e) => _e.id === D ? { ..._e, voiceId: Z, emotion: P, status: "queued" } : _e
        )
      ), k(D), te([]), q(null), F(null), V(null);
      return;
    }
    if (G.length === 0 || sl(S, G).trim() === "" || !Jb(N, G)) return;
    const Y = Ne(), ce = { id: Y, segIds: [...G], voiceId: Z, emotion: P, status: "queued" };
    B((Ce) => [...Ce, ce]), k(Y), te([]), q(null), V(null);
  }, [D, G, N, S, Z, P, Ne]), St = g.useCallback((Y) => {
    B((ce) => ce.filter((Ce) => Ce.id !== Y)), k((ce) => ce === Y ? null : ce), ae((ce) => ce === Y ? null : ce), te([]), q(null), F(null), V(null);
  }, []), ot = g.useCallback((Y) => {
    ae((ce) => ce === Y ? null : Y);
  }, []), Ke = g.useCallback((Y) => {
    ue.current?.scrollBy({ left: Y * 280, behavior: "smooth" });
  }, []), gt = g.useCallback(
    (Y) => {
      if (b.length === 0) return;
      const ce = b.findIndex((_e) => _e.id === P), Ce = b[(ce + Y + b.length) % b.length];
      ie(Ce.id), Ae.current?.querySelector(`[data-emotion="${Ce.id}"]`)?.focus();
    },
    [b, P]
  ), je = A ? D ?? G[0] ?? "new" : null;
  g.useEffect(() => {
    if (je == null) return;
    const Y = requestAnimationFrame(() => {
      Ae.current?.querySelector(`[data-voice="${Z}"]`)?.focus();
    });
    return () => cancelAnimationFrame(Y);
  }, [je]);
  const ke = g.useCallback(
    (Y) => {
      Y.key === "Escape" && (Y.preventDefault(), At());
    },
    [At]
  ), Pe = g.useMemo(() => {
    const Y = /* @__PURE__ */ new Map();
    for (const ce of N) for (const Ce of ce.segIds) Y.set(Ce, ce);
    return Y;
  }, [N]), Xe = g.useMemo(() => ww(S, N), [S, N]), yt = g.useMemo(() => HL(S, N), [S, N]), Tt = g.useMemo(
    () => Xe.filter((Y) => p.some((ce) => ce.id === Y.voiceId)).filter((Y) => sl(S, Y.segIds).trim() !== "").map((Y) => {
      const ce = BL(a, Y.emotion);
      return {
        jobId: Y.id,
        label: yt[Y.id] ?? Y.id,
        segment: {
          text: sl(S, Y.segIds),
          voice_asset_id: Y.voiceId,
          speaker_label: (lc(p, Y.voiceId) ?? fl).name,
          emotion: ce ? { mode: "emotion_vector", vector: ce } : null
        }
      };
    }),
    [Xe, S, p, a, yt]
  ), zn = g.useMemo(
    () => Tt.map((Y) => Y.segment),
    [Tt]
  ), Sn = g.useRef(null);
  g.useEffect(() => {
    const Y = JSON.stringify(zn);
    Y !== Sn.current && (Sn.current = Y, u?.(zn));
  }, [zn, u]);
  const pn = g.useRef(null);
  g.useEffect(() => {
    const Y = JSON.stringify(Tt);
    Y !== pn.current && (pn.current = Y, f?.(Tt));
  }, [Tt, f]);
  const Pt = g.useMemo(() => {
    const Y = /* @__PURE__ */ new Map();
    for (const ce of N) {
      const Ce = [...ce.segIds].sort((_e, Ge) => Be(_e) - Be(Ge))[0];
      Ce && Y.set(ce.id, Ce);
    }
    return Y;
  }, [N, Be]), Dt = g.useMemo(() => {
    const Y = /* @__PURE__ */ new Set();
    for (const ce of N) for (const Ce of ce.segIds) Y.add(Ce);
    return Y.size;
  }, [N]), Bt = g.useMemo(() => FL(S), [S]), sa = PL(N), wn = lc(p, Z) ?? fl, [cn, En] = g.useState(null), It = T.trim().toLowerCase(), he = g.useMemo(
    () => p.filter(
      (Y) => !It || Y.name.toLowerCase().includes(It) || Y.role.toLowerCase().includes(It)
    ),
    [p, It]
  ), Re = g.useMemo(
    () => R.filter(
      (Y) => !It || Y.name.toLowerCase().includes(It) || (Y.voice?.name.toLowerCase().includes(It) ?? !1)
    ),
    [R, It]
  ), ve = C === "character" ? `${Re.length} character${Re.length === 1 ? "" : "s"}` : `${he.length} voice${he.length === 1 ? "" : "s"}`, xe = (Y) => Y.stopPropagation();
  return /* @__PURE__ */ c.jsxs("div", { className: KL, children: [
    /* @__PURE__ */ c.jsxs("div", { style: H6, children: [
      /* @__PURE__ */ c.jsxs("span", { className: XL, children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("strong", { children: Dt }),
          " cast"
        ] }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("strong", { children: Bt }),
          " words"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: ZL,
          "aria-pressed": K,
          onClick: () => U((Y) => !Y),
          children: [
            /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: K ? "check" : "edit" }),
            K ? "Done" : "Edit text"
          ]
        }
      )
    ] }),
    K ? /* @__PURE__ */ c.jsx(
      "textarea",
      {
        value: s,
        onChange: (Y) => i(Y.target.value),
        placeholder: "Paste or write your script, then switch back to cast each phrase.",
        "aria-label": "Storyboard script text",
        style: P6
      }
    ) : /* @__PURE__ */ c.jsxs(
      "div",
      {
        ref: W,
        className: QL,
        role: "group",
        "aria-label": "Story script — select a phrase to cast a voice",
        onMouseDown: (Y) => {
          Y.shiftKey && Y.preventDefault();
        },
        onClick: () => {
          A && At();
        },
        children: [
          S.map((Y) => /* @__PURE__ */ c.jsx("p", { className: JL, children: Y.segs.map((ce, Ce) => {
            const _e = Pe.get(ce.id), Ge = G.includes(ce.id), wt = !!_e && ($ === _e.id || fe === _e.id), ft = !!_e && Pt.get(_e.id) === ce.id, z = _e ? lc(p, _e.voiceId) : null, H = Yf(ce.id, Pe, G), Q = Yf(Y.segs[Ce - 1]?.id, Pe, G), ge = Yf(Y.segs[Ce + 1]?.id, Pe, G), ye = H != null && Q !== H, De = H != null && ge !== H;
            return /* @__PURE__ */ c.jsxs("span", { children: [
              ft && z && /* @__PURE__ */ c.jsx("span", { className: e6, style: Y6(z), "aria-hidden": "true", children: z.initial }),
              /* @__PURE__ */ c.jsx(
                "span",
                {
                  ref: (Se) => {
                    Se && be.current.set(ce.id, Se);
                  },
                  role: "button",
                  tabIndex: 0,
                  "aria-pressed": Ge || !!_e,
                  "aria-label": _e ? `${z?.name ?? "voice"} · ${ce.text.trim()}` : ce.text.trim(),
                  className: WL,
                  style: G6(Ge, z, wt, ce.kind, ye, De),
                  onClick: (Se) => {
                    Se.stopPropagation(), He(ce.id, Se.currentTarget, Se.shiftKey);
                  },
                  onKeyDown: (Se) => {
                    (Se.key === "Enter" || Se.key === " ") && (Se.preventDefault(), He(ce.id, Se.currentTarget, Se.shiftKey));
                  },
                  onMouseEnter: _e ? () => se(_e.id) : void 0,
                  onMouseLeave: _e ? () => se(null) : void 0,
                  children: ce.text
                }
              )
            ] }, ce.id);
          }) }, Y.id)),
          A && /* @__PURE__ */ c.jsxs(
            "div",
            {
              ref: Ae,
              className: t6,
              role: "dialog",
              "aria-label": D ? "Edit casting" : "Cast voice",
              style: { top: A.top, left: A.left },
              onClick: xe,
              onMouseDown: xe,
              onKeyDown: ke,
              children: [
                /* @__PURE__ */ c.jsxs("div", { className: n6, children: [
                  /* @__PURE__ */ c.jsx("span", { className: a6, children: D ? "Edit casting" : "Cast voice" }),
                  /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: r6,
                      style: { width: 24, height: 24 },
                      "aria-label": "Cancel",
                      onClick: At,
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 17 }, "aria-hidden": "true", children: "close" })
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: s6, children: [
                  /* @__PURE__ */ c.jsxs("div", { className: i6, role: "radiogroup", "aria-label": "Cast source", children: [
                    /* @__PURE__ */ c.jsx(
                      "button",
                      {
                        type: "button",
                        role: "radio",
                        "aria-checked": C === "voice",
                        className: C === "voice" ? nx : tx,
                        onClick: () => {
                          _("voice"), O("");
                        },
                        children: "Voices"
                      }
                    ),
                    /* @__PURE__ */ c.jsx(
                      "button",
                      {
                        type: "button",
                        role: "radio",
                        "aria-checked": C === "character",
                        className: C === "character" ? nx : tx,
                        onClick: () => {
                          _("character"), O("");
                        },
                        children: "Characters"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: l6, children: ve })
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: o6, children: [
                  /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: X6, children: "search" }),
                  /* @__PURE__ */ c.jsx(
                    "input",
                    {
                      className: c6,
                      value: T,
                      onChange: (Y) => O(Y.target.value),
                      placeholder: C === "character" ? "Search characters…" : "Search voices…",
                      "aria-label": C === "character" ? "Search characters" : "Search voices"
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: u6, role: "radiogroup", "aria-label": C === "character" ? "Character" : "Voice", children: [
                  C === "voice" && he.map((Y) => {
                    const ce = cn == null && Z === Y.id;
                    return /* @__PURE__ */ c.jsxs(
                      "button",
                      {
                        type: "button",
                        role: "radio",
                        "aria-checked": ce,
                        className: ax,
                        style: lx(Y, ce),
                        onClick: () => {
                          J(Y.id), En(null);
                        },
                        children: [
                          /* @__PURE__ */ c.jsx("span", { style: ox(Y), children: Y.initial }),
                          /* @__PURE__ */ c.jsxs("span", { className: rx, children: [
                            /* @__PURE__ */ c.jsx("span", { style: cx(ce), children: Y.name }),
                            /* @__PURE__ */ c.jsx("span", { style: Q6, children: Y.role })
                          ] }),
                          ce && /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 18, color: Y.color, flexShrink: 0 }, children: "check" })
                        ]
                      },
                      Y.id
                    );
                  }),
                  C === "character" && Re.map((Y) => {
                    const ce = Y.voice ?? fl, Ce = cn === Y.id;
                    return /* @__PURE__ */ c.jsxs(
                      "button",
                      {
                        type: "button",
                        role: "radio",
                        "aria-checked": Ce,
                        className: ax,
                        style: lx(ce, Ce),
                        onClick: () => {
                          J(Y.voiceId), En(Y.id);
                        },
                        children: [
                          /* @__PURE__ */ c.jsx("span", { style: ox(ce), children: ce.initial }),
                          /* @__PURE__ */ c.jsxs("span", { className: rx, children: [
                            /* @__PURE__ */ c.jsx("span", { style: cx(Ce), children: Y.name }),
                            /* @__PURE__ */ c.jsx("span", { style: Z6, children: ce.name })
                          ] }),
                          Ce && /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 18, color: ce.color, flexShrink: 0 }, children: "check" })
                        ]
                      },
                      Y.id
                    );
                  }),
                  (C === "voice" && he.length === 0 || C === "character" && Re.length === 0) && /* @__PURE__ */ c.jsx("div", { className: d6, children: C === "character" ? R.length === 0 ? "No characters mapped yet." : `No matches for “${T}”` : p.length === 0 ? "No voices yet — add voice assets." : `No matches for “${T}”` })
                ] }),
                /* @__PURE__ */ c.jsx("div", { className: f6 }),
                /* @__PURE__ */ c.jsxs("div", { className: h6, children: [
                  /* @__PURE__ */ c.jsx("span", { className: ex, style: { fontSize: 9.5, marginBottom: 0 }, children: "Emotion" }),
                  /* @__PURE__ */ c.jsx(
                    "div",
                    {
                      className: m6,
                      role: "radiogroup",
                      "aria-label": "Emotion",
                      onKeyDown: (Y) => {
                        Y.key === "ArrowRight" || Y.key === "ArrowDown" ? (Y.preventDefault(), gt(1)) : (Y.key === "ArrowLeft" || Y.key === "ArrowUp") && (Y.preventDefault(), gt(-1));
                      },
                      children: b.map((Y) => {
                        const ce = P === Y.id;
                        return /* @__PURE__ */ c.jsx(
                          "button",
                          {
                            type: "button",
                            role: "radio",
                            "aria-checked": ce,
                            "data-emotion": Y.id,
                            tabIndex: ce ? 0 : -1,
                            className: p6,
                            style: J6(wn, ce),
                            onClick: () => ie(Y.id),
                            children: Y.label
                          },
                          Y.id
                        );
                      })
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsx("div", { className: g6, children: /* @__PURE__ */ c.jsx("span", { className: v6, children: sl(S, G) }) }),
                /* @__PURE__ */ c.jsxs("div", { className: y6, children: [
                  D && /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: b6,
                      "aria-label": "Remove casting",
                      onClick: () => D && St(D),
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: "delete" })
                    }
                  ),
                  /* @__PURE__ */ c.jsxs(
                    "button",
                    {
                      type: "button",
                      style: W6(wn),
                      onClick: at,
                      children: [
                        /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 17 }, "aria-hidden": "true", children: "check" }),
                        D ? "Update" : "Cast"
                      ]
                    }
                  )
                ] })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: x6, children: [
      /* @__PURE__ */ c.jsxs("div", { className: S6, children: [
        /* @__PURE__ */ c.jsxs("div", { className: w6, children: [
          /* @__PURE__ */ c.jsx("span", { className: ex, style: { marginBottom: 0 }, children: "Assigned segments" }),
          /* @__PURE__ */ c.jsx("span", { className: j6, children: N.length }),
          sa && /* @__PURE__ */ c.jsx("span", { className: E6, children: sa })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ c.jsx("button", { type: "button", className: sx, "aria-label": "Scroll segments left", onClick: () => Ke(-1), disabled: N.length === 0, children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 18 }, "aria-hidden": "true", children: "chevron_left" }) }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: sx, "aria-label": "Scroll segments right", onClick: () => Ke(1), disabled: N.length === 0, children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 18 }, "aria-hidden": "true", children: "chevron_right" }) })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { ref: ue, className: N6, children: [
        Xe.map((Y) => {
          const ce = lc(p, Y.voiceId) ?? fl, Ce = rn(Y), _e = m?.get(Y.id), Ge = _e ? DL(_e) : Y.status, wt = zL[Ge], ft = fe === Y.id || $ === Y.id, z = ne === Y.id, H = sl(S, Y.segIds), Q = Ge === "ready" ? V6(y, _e?.utteranceId) : null, ge = Q != null;
          return /* @__PURE__ */ c.jsxs(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `${ce.name} ${yt[Y.id]} — ${Wb(b, Y.emotion)} — ${Ce ? "voice removed — recast" : wt.label}`,
              className: C6,
              "data-broken": Ce ? "true" : "false",
              style: Ce ? t8(ft) : e8(ce, ft),
              onClick: () => Te(Y),
              onKeyDown: (ye) => {
                (ye.key === "Enter" || ye.key === " ") && (ye.preventDefault(), Te(Y));
              },
              onMouseEnter: () => se(Y.id),
              onMouseLeave: () => se(null),
              onFocus: () => k(Y.id),
              children: [
                /* @__PURE__ */ c.jsxs("div", { className: T6, children: [
                  /* @__PURE__ */ c.jsxs("div", { className: R6, children: [
                    /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 17, color: ce.color }, children: ce.icon }),
                    /* @__PURE__ */ c.jsx("span", { className: _6, children: ce.name })
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: M6, children: yt[Y.id] })
                ] }),
                /* @__PURE__ */ c.jsx("span", { className: A6, children: H }),
                /* @__PURE__ */ c.jsxs("div", { className: k6, children: [
                  /* @__PURE__ */ c.jsx("span", { style: a8(ce), children: Wb(b, Y.emotion) }),
                  /* @__PURE__ */ c.jsxs("span", { className: D6, children: [
                    /* @__PURE__ */ c.jsx("span", { style: r8(wt) }),
                    /* @__PURE__ */ c.jsx("span", { style: s8(wt, Ge), children: wt.label })
                  ] })
                ] }),
                Ce && /* @__PURE__ */ c.jsxs("span", { style: n8, role: "status", children: [
                  /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 14 }, "aria-hidden": "true", children: "error" }),
                  "voice removed — recast"
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: z6, children: [
                  /* @__PURE__ */ c.jsxs(
                    "button",
                    {
                      type: "button",
                      className: O6,
                      "aria-label": z ? "Pause preview" : "Preview audio",
                      disabled: !ge && !z,
                      onClick: (ye) => {
                        ye.stopPropagation(), (ge || z) && ot(Y.id);
                      },
                      children: [
                        /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: z ? "pause_circle" : "play_circle" }),
                        z ? "Playing" : "Preview"
                      ]
                    }
                  ),
                  /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: L6,
                      "aria-label": `Remove ${yt[Y.id]}`,
                      onClick: (ye) => {
                        ye.stopPropagation(), St(Y.id);
                      },
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: "close" })
                    }
                  )
                ] }),
                z && Q && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                  /* @__PURE__ */ c.jsx(
                    "audio",
                    {
                      src: Q,
                      controls: !0,
                      autoPlay: !0,
                      preload: "auto",
                      style: F6,
                      onEnded: () => ae((ye) => ye === Y.id ? null : ye),
                      children: /* @__PURE__ */ c.jsx("track", { kind: "captions" })
                    }
                  ),
                  /* @__PURE__ */ c.jsx("div", { className: $6, children: /* @__PURE__ */ c.jsx("div", { style: i8(ce) }) })
                ] })
              ]
            },
            Y.id
          );
        }),
        N.length === 0 && /* @__PURE__ */ c.jsxs("div", { className: U6, children: [
          /* @__PURE__ */ c.jsx("span", { className: B6, children: "0" }),
          /* @__PURE__ */ c.jsx("span", { className: I6, children: "No segments cast yet. Select a phrase above to begin." })
        ] })
      ] })
    ] })
  ] });
}
const H6 = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }, F6 = { width: "100%", height: 32, marginTop: 8, display: "block" }, P6 = {
  width: "100%",
  minHeight: 220,
  padding: 14,
  background: "var(--surface-floor, #000)",
  border: "1px solid rgba(70,72,74,0.3)",
  borderRadius: 12,
  color: "var(--on-surface)",
  fontFamily: "var(--font-mono)",
  fontSize: 14,
  lineHeight: 1.7,
  resize: "vertical",
  outline: "none"
};
function Yf(t, a, s) {
  if (t == null) return null;
  const i = a.get(t);
  return i ? `job:${i.id}` : s.includes(t) ? "sel" : null;
}
function ix(t, a) {
  return {
    borderTopLeftRadius: t ? 4 : 0,
    borderBottomLeftRadius: t ? 4 : 0,
    borderTopRightRadius: a ? 4 : 0,
    borderBottomRightRadius: a ? 4 : 0
  };
}
function G6(t, a, s, i, o, u) {
  const f = { padding: "2px 0", cursor: "pointer", WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" }, m = "186,158,255";
  return t ? { ...f, ...ix(o, u), background: `rgba(${m},0.16)`, boxShadow: `inset 0 -2px 0 rgba(${m},0.7)`, color: "var(--on-surface)" } : a ? { ...f, ...ix(o, u), background: `rgba(${a.rgb},${s ? 0.2 : 0.11})`, boxShadow: `inset 0 -2px 0 ${a.color}`, color: "var(--on-surface)" } : { ...f, color: i === "dialogue" ? "var(--on-surface)" : "var(--on-surface-variant)" };
}
function Y6(t) {
  return { color: t.color, background: `rgba(${t.rgb},0.18)`, boxShadow: `inset 0 0 0 1px rgba(${t.rgb},0.45)` };
}
function K6(t, a) {
  return t ? [...t.values()].filter((s) => s.isActive).map((s) => ({
    id: s.mappingId,
    name: s.characterName,
    voiceId: s.speakerVoiceAssetId,
    voice: a.find((i) => i.id === s.speakerVoiceAssetId) ?? null
  })) : [];
}
function lx(t, a) {
  return a ? {
    border: `1px solid rgba(${t.rgb},0.5)`,
    background: `rgba(${t.rgb},0.12)`
  } : {};
}
function ox(t) {
  return {
    width: 28,
    height: 28,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    fontWeight: 700,
    color: t.color,
    background: `rgba(${t.rgb},0.16)`,
    boxShadow: `inset 0 0 0 1px rgba(${t.rgb},0.4)`
  };
}
function cx(t) {
  return {
    fontSize: 12,
    fontWeight: 600,
    color: t ? "var(--on-surface, #e3e3e3)" : "var(--on-surface-variant, #c4c7c5)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  };
}
const X6 = { position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "var(--on-surface-muted)", pointerEvents: "none" }, Q6 = { fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--on-surface-muted)" }, Z6 = { fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.02em", color: "var(--on-surface-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
function J6(t, a) {
  return {
    border: `1px solid ${a ? `rgba(${t.rgb},0.45)` : "rgba(120,124,128,0.35)"}`,
    background: a ? `rgba(${t.rgb},0.14)` : "var(--surface-raised, rgba(255,255,255,0.05))",
    color: a ? t.color : "var(--on-surface-variant, #c4c7c5)"
  };
}
function W6(t) {
  return {
    flex: 1,
    height: 38,
    borderRadius: 9,
    border: "none",
    cursor: "pointer",
    fontFamily: "var(--font-ui)",
    fontSize: 13,
    fontWeight: 600,
    color: t.onColor,
    background: t.color,
    boxShadow: `0 0 18px rgba(${t.rgb},0.45)`,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    transition: "filter .15s"
  };
}
function e8(t, a) {
  return {
    background: a ? "var(--surface-high, #1d2023)" : "var(--surface-low, #111416)",
    transform: a ? "translateY(-2px)" : "none",
    boxShadow: a ? `inset 3px 0 0 ${t.color}, 0 0 0 1px rgba(${t.rgb},0.4), 0 12px 28px rgba(0,0,0,0.5)` : `inset 3px 0 0 ${t.color}`
  };
}
function t8(t) {
  const a = "var(--error, #ff6e84)";
  return {
    background: t ? "var(--surface-high, #1d2023)" : "var(--surface-low, #111416)",
    transform: t ? "translateY(-2px)" : "none",
    boxShadow: t ? `inset 3px 0 0 ${a}, 0 0 0 1px rgba(255,110,132,0.45), 0 12px 28px rgba(0,0,0,0.5)` : `inset 3px 0 0 ${a}, 0 0 0 1px rgba(255,110,132,0.32)`
  };
}
const n8 = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  marginTop: 6,
  fontFamily: "var(--font-ui)",
  fontSize: 10.5,
  fontWeight: 500,
  color: "var(--error, #ff6e84)"
};
function a8(t) {
  return {
    fontFamily: "var(--font-mono)",
    fontSize: 9.5,
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    padding: "3px 8px",
    borderRadius: 6,
    color: t.color,
    background: `rgba(${t.rgb},0.12)`,
    border: `1px solid rgba(${t.rgb},0.22)`
  };
}
function r8(t) {
  return {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: t.color,
    boxShadow: `0 0 8px ${t.glow}`,
    animation: t.pulse ? `${YL} 1.5s ease-in-out infinite` : "none",
    flexShrink: 0
  };
}
function s8(t, a) {
  return { fontFamily: "var(--font-ui)", fontSize: 10.5, fontWeight: 500, color: a === "queued" ? "var(--on-surface-variant)" : t.color };
}
function i8(t) {
  return { position: "absolute", top: 0, bottom: 0, width: "30%", background: `linear-gradient(90deg, transparent, ${t.color}, transparent)`, animation: `${GL} 1.1s linear infinite` };
}
var l8 = "xq3iim0", o8 = "xq3iim1", c8 = "xq3iim2", u8 = "xq3iim3", d8 = "xq3iim4", f8 = "xq3iim5", h8 = "xq3iim6", m8 = "xq3iim7", p8 = "xq3iim8", g8 = "xq3iim9", v8 = "xq3iima", y8 = "xq3iimb", b8 = "xq3iimc", x8 = "xq3iimd", S8 = "xq3iime", w8 = "xq3iimf", j8 = "xq3iimg", E8 = "xq3iimh", N8 = "xq3iimi", C8 = "xq3iimj", T8 = "xq3iimk", ux = "xq3iiml";
function R8({
  deploymentId: t,
  initialVoiceAssetId: a,
  onChange: s
}) {
  const [i, o] = g.useState([]), [u, f] = g.useState(a), [m, y] = g.useState(!0), [p, b] = g.useState(!1), [v, S] = g.useState(null), [w, j] = g.useState(!1), C = g.useRef(null), _ = g.useRef(null);
  g.useEffect(() => {
    let N = !1;
    return y(!0), Zs(t).then(({ voiceAssets: B }) => {
      N || o(B);
    }).catch((B) => {
      N || S(B instanceof Error ? B.message : "Failed to load voices");
    }).finally(() => {
      N || y(!1);
    }), () => {
      N = !0;
    };
  }, [t]), g.useEffect(() => {
    if (!w) return;
    const N = (G) => {
      C.current && (G.target instanceof Node && C.current.contains(G.target) || j(!1));
    }, B = (G) => {
      G.key === "Escape" && (j(!1), _.current?.focus());
    };
    return document.addEventListener("mousedown", N), document.addEventListener("keydown", B), () => {
      document.removeEventListener("mousedown", N), document.removeEventListener("keydown", B);
    };
  }, [w]);
  const T = g.useCallback(
    async (N) => {
      b(!0), S(null);
      const B = u, G = N === u ? null : N;
      f(G), j(!1);
      try {
        await jT(t, G), s?.(G);
      } catch (te) {
        f(B), S(te instanceof Error ? te.message : "Failed to update default voice");
      } finally {
        b(!1);
      }
    },
    [t, s, u]
  ), O = g.useMemo(
    () => i.find((N) => N.voiceAssetId === u) ?? null,
    [i, u]
  ), R = g.useMemo(() => {
    const N = [], B = [];
    for (const G of i)
      G.kind === "speaker" || G.kind === "mixed" ? N.push(G) : B.push(G);
    return { uploaded: N, other: B };
  }, [i]);
  return m ? /* @__PURE__ */ c.jsx("span", { className: ux, children: "Loading voices…" }) : i.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: ux, children: "No voices yet. Upload a reference in Mappings to enable Quick mode." }) : /* @__PURE__ */ c.jsxs("div", { ref: C, className: l8, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: _,
        type: "button",
        className: `${o8} ${w ? c8 : ""}`,
        "aria-haspopup": "listbox",
        "aria-expanded": w,
        disabled: p,
        onClick: () => j((N) => !N),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: u8, "aria-hidden": "true", children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", children: "graphic_eq" }) }),
          /* @__PURE__ */ c.jsxs("span", { className: d8, children: [
            /* @__PURE__ */ c.jsx("span", { className: f8, children: O ? O.displayName : "Pick a voice" }),
            /* @__PURE__ */ c.jsx("span", { className: h8, children: O ? jw(O) : `${i.length} voice${i.length === 1 ? "" : "s"} in library` })
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: m8, "aria-hidden": "true", children: _8.map((N, B) => /* @__PURE__ */ c.jsx("i", { style: { height: `${N * 100}%` } }, B)) }),
          /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${p8}`, "aria-hidden": "true", children: w ? "expand_less" : "expand_more" })
        ]
      }
    ),
    w && /* @__PURE__ */ c.jsxs(
      "div",
      {
        role: "listbox",
        "aria-label": "Quick mode voice",
        className: g8,
        children: [
          /* @__PURE__ */ c.jsx("div", { className: v8, children: /* @__PURE__ */ c.jsx("span", { className: y8, children: "Select voice" }) }),
          v && /* @__PURE__ */ c.jsx("div", { className: b8, role: "alert", children: v }),
          R.uploaded.length > 0 && /* @__PURE__ */ c.jsx(dx, { label: "Uploaded", children: R.uploaded.map((N) => /* @__PURE__ */ c.jsx(
            fx,
            {
              voice: N,
              selected: u === N.voiceAssetId,
              onSelect: () => void T(N.voiceAssetId)
            },
            N.voiceAssetId
          )) }),
          R.other.length > 0 && /* @__PURE__ */ c.jsx(dx, { label: "Other", children: R.other.map((N) => /* @__PURE__ */ c.jsx(
            fx,
            {
              voice: N,
              selected: u === N.voiceAssetId,
              onSelect: () => void T(N.voiceAssetId)
            },
            N.voiceAssetId
          )) })
        ]
      }
    )
  ] });
}
function dx({ label: t, children: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: x8, children: [
    /* @__PURE__ */ c.jsx("div", { className: S8, children: t }),
    a
  ] });
}
function fx({ voice: t, selected: a, onSelect: s }) {
  return /* @__PURE__ */ c.jsxs(
    "button",
    {
      type: "button",
      role: "option",
      "aria-selected": a,
      className: `${w8} ${a ? j8 : ""}`,
      onClick: s,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: E8, "aria-hidden": "true" }),
        /* @__PURE__ */ c.jsx("span", { className: N8, children: t.displayName }),
        /* @__PURE__ */ c.jsx("span", { className: C8, children: jw(t) }),
        a && /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${T8}`, "aria-hidden": "true", children: "check" })
      ]
    }
  );
}
const _8 = [0.35, 0.7, 0.5, 0.85, 0.45, 0.6, 0.32, 0.78, 0.4, 0.55, 0.7, 0.36];
function jw(t) {
  const a = [];
  return t.durationMs != null && a.push(M8(t.durationMs)), t.sampleRate != null && a.push(`${(t.sampleRate / 1e3).toFixed(1)} kHz`), t.kind && t.kind !== "speaker" && a.push(t.kind), a.length > 0 ? a.join(" · ") : "—";
}
function M8(t) {
  const a = t / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const s = Math.floor(a / 60), i = Math.round(a - s * 60);
  return `${s}:${i.toString().padStart(2, "0")}`;
}
const hx = [
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
function A8(t) {
  const a = ni(), s = g.useRef(null), { tokens: i, attributions: o, unresolved: u, predictedFilenames: f, characterColor: m } = g.useMemo(
    () => D8(t.value, t.outputFormat, t.mappings),
    [t.value, t.outputFormat, t.mappings]
  ), y = (b) => {
    const v = s.current;
    v && (v.scrollTop = b.currentTarget.scrollTop, v.scrollLeft = b.currentTarget.scrollLeft);
  }, p = t.quickMode === !0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: p ? h_ : u_, children: [
      !p && /* @__PURE__ */ c.jsx("div", { ref: s, className: d_, "aria-hidden": "true", children: i.map((b, v) => k8(b, v, m)) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: p ? m_ : f_,
          value: t.value,
          onChange: (b) => t.onChange(b.currentTarget.value),
          onScroll: p ? void 0 : y,
          placeholder: p ? "Type or paste plain text. The selected voice will read every word." : `[Bob] Hey there
[Alice] Hello
...`,
          "aria-label": "Dialogue script",
          spellCheck: !1
        }
      )
    ] }),
    u.length > 0 && /* @__PURE__ */ c.jsxs(kn, { severity: "error", children: [
      /* @__PURE__ */ c.jsx("strong", { children: "Unresolved characters:" }),
      " ",
      u.map((b) => /* @__PURE__ */ c.jsxs(
        Ze,
        {
          variant: "secondary",
          size: "sm",
          onClick: () => a(
            `/${t.deploymentId}/mappings/new?character=${encodeURIComponent(b)}`
          ),
          children: [
            "Create mapping for ",
            b
          ]
        },
        b
      ))
    ] }),
    o.length > 0 && /* @__PURE__ */ c.jsxs("div", { children: [
      /* @__PURE__ */ c.jsx("span", { className: br, children: "Parsed lines" }),
      /* @__PURE__ */ c.jsx("ul", { className: v0, children: o.map((b) => /* @__PURE__ */ c.jsxs("li", { children: [
        "#",
        b.lineNumber.toString().padStart(3, "0"),
        " [",
        b.character,
        "] ",
        b.text,
        !b.hasMapping && b.character !== "Narrator" && " — unresolved"
      ] }, b.lineNumber)) })
    ] }),
    f.length > 0 && /* @__PURE__ */ c.jsxs("div", { children: [
      /* @__PURE__ */ c.jsx("span", { className: br, children: "Predicted filenames" }),
      /* @__PURE__ */ c.jsx("ul", { className: v0, children: f.map((b) => /* @__PURE__ */ c.jsx("li", { children: b }, b)) })
    ] })
  ] });
}
function k8(t, a, s) {
  if (t.kind === "blank")
    return /* @__PURE__ */ c.jsxs("span", { children: [
      t.raw,
      `
`
    ] }, a);
  if (t.kind === "narrator")
    return /* @__PURE__ */ c.jsxs("span", { children: [
      /* @__PURE__ */ c.jsx("span", { className: g0, children: t.raw }),
      `
`
    ] }, a);
  const i = s.get(t.character?.toLowerCase() ?? "") ?? "currentColor", o = t.hasMapping ? p0 : `${p0} ${p_}`;
  return /* @__PURE__ */ c.jsxs("span", { children: [
    /* @__PURE__ */ c.jsxs("span", { className: o, style: { color: i }, children: [
      "[",
      t.character,
      t.override && /* @__PURE__ */ c.jsxs("span", { className: g_, children: [
        "|",
        t.override
      ] }),
      "]"
    ] }),
    /* @__PURE__ */ c.jsxs("span", { className: g0, children: [
      " ",
      t.text ?? ""
    ] }),
    `
`
  ] }, a);
}
function D8(t, a, s) {
  const i = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], u = [], f = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map(), y = [], p = /* @__PURE__ */ new Map();
  let b = 0;
  const v = t.split(/\r?\n/);
  let S = 0;
  return v.forEach((w, j) => {
    const C = w.trim();
    if (!C) {
      o.push({ kind: "blank", raw: w });
      return;
    }
    const _ = j + 1, T = C.match(i);
    let O = "Narrator", R = C, N, B = !1;
    if (T?.groups) {
      B = !0;
      const q = (T.groups.body ?? "").trim(), D = (T.groups.rest ?? "").trim();
      O = ((q.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", N = (q.includes("|") ? q.slice(q.indexOf("|") + 1) : "").trim() || void 0, R = D;
    }
    S += 1;
    const G = O.toLowerCase(), te = (m.get(G) ?? 0) + 1;
    m.set(G, te);
    const M = O === "Narrator" || s.has(G);
    if (M || f.add(O), O !== "Narrator" && !p.has(G) && (p.set(G, hx[b % hx.length] ?? "currentColor"), b += 1), B) {
      const q = { kind: "character", raw: w, character: O, text: R, hasMapping: M };
      N !== void 0 && (q.override = N), o.push(q);
    } else
      o.push({ kind: "narrator", raw: w });
    u.push({ lineNumber: _, character: O, text: R, hasMapping: M }), y.push(
      `${S.toString().padStart(3, "0")}_${z8(O)}_${te.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: u,
    unresolved: Array.from(f),
    predictedFilenames: y,
    characterColor: p
  };
}
function z8(t) {
  const a = t.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
const mx = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], Ew = 1e-3;
function O8(t) {
  return t.replace(/[\[\]|\r\n]/g, "").trim();
}
function L8() {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `row_${crypto.randomUUID()}` : `row_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}
function $8(t) {
  return t.replace(/[\r\n]/g, " ").trim();
}
function Nw(t) {
  return Number.isNaN(t) ? 1 : t < 0 ? 0 : t > 1 ? 1 : t;
}
function Cw(t) {
  const a = Math.round(t * 1e3) / 1e3;
  return Number.isInteger(a) ? a.toFixed(1) : String(a);
}
function U8(t) {
  const a = [];
  for (let s = 0; s < mx.length; s += 1) {
    const i = t[s];
    typeof i == "number" && (Math.abs(i) < Ew || a.push(`${mx[s]}=${Cw(Nw(i))}`));
  }
  return a.length === 0 ? null : a.join(",");
}
function B8(t, a) {
  const s = O8(t.character) || "Narrator", i = $8(t.text);
  if (!i) return null;
  const o = [];
  if (t.presetId) {
    const m = a.get(t.presetId);
    if (m) {
      const y = U8(m.vector);
      y && o.push(`emotion_vector:${y}`);
    }
  }
  const u = Nw(t.alpha);
  return Math.abs(u - 1) >= Ew && o.push(`emotion_alpha:${Cw(u)}`), `${o.length > 0 ? `[${s}|${o.join("|")}]` : `[${s}]`} ${i}`;
}
function Tw(t, a) {
  const s = /* @__PURE__ */ new Map();
  for (const o of a) s.set(o.presetId, o);
  const i = [];
  for (const o of t) {
    const u = B8(o, s);
    u && i.push(u);
  }
  return i.join(`
`);
}
function Kr() {
  return {
    id: L8(),
    character: "",
    presetId: null,
    alpha: 1,
    text: ""
  };
}
var I8 = "_1827s3t2", V8 = "_1827s3t3", q8 = "_1827s3t4", H8 = "_1827s3t5", F8 = "_1827s3t6", P8 = "_1827s3t7", G8 = "_1827s3t8", Y8 = "_1827s3t9", K8 = "_1827s3ta", X8 = "_1827s3tb", Q8 = "_1827s3td _1827s3tc", Z8 = "_1827s3te _1827s3tc", J8 = "_1827s3tf", W8 = "_1827s3tg", e$ = "_1827s3th", t$ = "_1827s3ti _1827s3tc", n$ = "_1827s3tj", a$ = "_1827s3tk", r$ = "_1827s3tl", s$ = "_1827s3tm", i$ = "_1827s3tn", l$ = "_1827s3to", o$ = "_1827s3tp", c$ = "_1827s3tq", u$ = "_1827s3tr", d$ = "_1827s3ts", f$ = "_1827s3tt", h$ = "_1827s3tu";
function m$({
  rows: t,
  onRowsChange: a,
  presets: s,
  mappingsByLower: i
}) {
  const o = g.useId(), u = g.useId(), f = g.useId(), m = g.useRef(null), y = g.useRef(/* @__PURE__ */ new Map()), p = g.useRef(/* @__PURE__ */ new Map()), b = g.useRef(/* @__PURE__ */ new Map()), [v, S] = g.useState(null), [w, j] = g.useState(!1), C = g.useRef(null), _ = g.useRef(null), [T, O] = g.useState(null), [R, N] = g.useState(null), [B, G] = g.useState("");
  g.useEffect(() => {
    v && (v.kind === "addBtn" ? m.current?.focus() : v.kind === "text" && v.rowId ? y.current.get(v.rowId)?.focus() : v.kind === "remove" && v.rowId ? p.current.get(v.rowId)?.focus() : v.kind === "character" && v.rowId ? b.current.get(v.rowId)?.focus() : v.kind === "unmappedFirstItem" && _.current?.querySelector("button")?.focus(), S(null));
  }, [v]);
  const te = t.filter((U) => U.text.trim().length > 0).length, M = g.useMemo(() => {
    const U = /* @__PURE__ */ new Map();
    for (const W of t) {
      const ue = W.character.trim(), be = ue.toLowerCase();
      !be || be === "narrator" || i.has(be) || U.has(be) || U.set(be, ue);
    }
    return Array.from(U.values()).sort((W, ue) => W.localeCompare(ue));
  }, [t, i]), q = M.length, D = g.useRef(q), [F, Z] = g.useState(0);
  g.useEffect(() => {
    q > D.current && Z((U) => U + 1), D.current = q;
  }, [q]), g.useEffect(() => {
    if (!w) return;
    S({ kind: "unmappedFirstItem" });
    const U = (ue) => {
      if (!_.current || !C.current) return;
      const be = ue.target;
      _.current.contains(be) || C.current.contains(be) || j(!1);
    }, W = (ue) => {
      ue.key === "Escape" && (j(!1), C.current?.focus());
    };
    return document.addEventListener("mousedown", U), document.addEventListener("keydown", W), () => {
      document.removeEventListener("mousedown", U), document.removeEventListener("keydown", W);
    };
  }, [w]);
  const J = g.useMemo(() => {
    const U = /* @__PURE__ */ new Set();
    return i.forEach((W) => U.add(W.characterName)), Array.from(U).sort((W, ue) => W.localeCompare(ue));
  }, [i]), P = g.useCallback(
    (U, W) => {
      a(t.map((ue) => ue.id === U ? { ...ue, ...W } : ue));
    },
    [t, a]
  ), ie = g.useRef(t);
  g.useEffect(() => {
    ie.current = t;
  }, [t]);
  const A = g.useCallback(
    (U) => {
      const W = t.findIndex((We) => We.id === U);
      if (W < 0) return;
      const ue = t[W];
      if (!ue) return;
      const be = W > 0 ? t[W - 1]?.id ?? null : null, Ae = t.filter((We) => We.id !== U);
      a(Ae);
      const lt = ue.character.trim() || `Line ${W + 1}`;
      mn(`Removed ${lt}`, {
        action: {
          label: "Undo",
          onClick: () => {
            const We = ie.current;
            if (We.some((qt) => qt.id === ue.id)) return;
            const Be = [...We], Fe = be ? We.findIndex((qt) => qt.id === be) : -1, rn = Fe >= 0 ? Fe + 1 : 0;
            Be.splice(rn, 0, ue), a(Be);
          }
        },
        duration: 5e3
      });
      const Ne = `Removed line ${W + 1}, now ${Ae.length} ${Ae.length === 1 ? "line" : "lines"}`;
      if (G((We) => We === Ne ? `${Ne}​` : Ne), Ae.length === 0)
        S({ kind: "addBtn" });
      else {
        const We = W < Ae.length ? W : Ae.length - 1, Be = Ae[We];
        S(Be ? { kind: "remove", rowId: Be.id } : { kind: "addBtn" });
      }
    },
    [t, a]
  ), V = g.useCallback(
    (U) => {
      const W = Kr();
      let ue;
      if (U === null)
        ue = [...t, W];
      else {
        const be = t.findIndex((Ae) => Ae.id === U);
        ue = be < 0 ? [...t, W] : [...t.slice(0, be + 1), W, ...t.slice(be + 1)];
      }
      a(ue), S({ kind: "text", rowId: W.id });
    },
    [t, a]
  ), $ = g.useCallback(
    (U, W) => {
      const ue = t.findIndex((Fe) => Fe.id === U);
      if (ue < 0) return;
      const be = ue + W;
      if (be < 0 || be >= t.length) return;
      const Ae = [...t], lt = Ae[ue], Ne = Ae[be];
      if (!lt || !Ne) return;
      Ae[ue] = Ne, Ae[be] = lt, a(Ae);
      const Be = `Moved ${lt.character.trim() || `Line ${ue + 1}`} to position ${be + 1} of ${Ae.length}`;
      G((Fe) => Fe === Be ? `${Be}​` : Be);
    },
    [t, a]
  ), se = g.useCallback(
    (U, W) => {
      U.key === "Enter" && !U.shiftKey ? (U.preventDefault(), V(W)) : U.altKey && U.key === "ArrowUp" ? (U.preventDefault(), $(W, -1)) : U.altKey && U.key === "ArrowDown" && (U.preventDefault(), $(W, 1));
    },
    [V, $]
  ), fe = g.useCallback((U, W) => {
    O(W), U.dataTransfer.effectAllowed = "move", U.dataTransfer.setData("text/plain", W);
  }, []), k = g.useCallback((U, W) => {
    T && (U.preventDefault(), U.dataTransfer.dropEffect = "move", R !== W && N(W));
  }, [T, R]), ne = g.useCallback(
    (U, W) => {
      U.preventDefault();
      const ue = T ?? U.dataTransfer.getData("text/plain");
      if (O(null), N(null), !ue || ue === W) return;
      const be = t.findIndex((Fe) => Fe.id === ue), Ae = t.findIndex((Fe) => Fe.id === W);
      if (be < 0 || Ae < 0) return;
      const lt = [...t], [Ne] = lt.splice(be, 1);
      if (!Ne) return;
      lt.splice(Ae, 0, Ne), a(lt);
      const Be = `Moved ${Ne.character.trim() || `Line ${be + 1}`} to position ${Ae + 1} of ${lt.length}`;
      G((Fe) => Fe === Be ? `${Be}​` : Be);
    },
    [t, a, T]
  ), ae = g.useCallback(() => {
    O(null), N(null);
  }, []), K = g.useCallback(
    (U) => {
      const W = t.find((ue) => ue.character.trim().toLowerCase() === U.toLowerCase());
      W && S({ kind: "character", rowId: W.id }), j(!1);
    },
    [t]
  );
  return /* @__PURE__ */ c.jsxs("section", { className: I8, "aria-labelledby": u, children: [
    /* @__PURE__ */ c.jsxs("header", { className: V8, children: [
      /* @__PURE__ */ c.jsxs("span", { className: q8, id: u, children: [
        "02 / Per-character lines",
        t.length > 1 && /* @__PURE__ */ c.jsx("span", { className: f$, children: "· Alt+↑↓ to reorder" })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: H8, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: F8, children: te.toString().padStart(2, "0") }),
        " lines",
        q > 0 && /* @__PURE__ */ c.jsxs("span", { className: a$, children: [
          /* @__PURE__ */ c.jsxs(
            "button",
            {
              ref: C,
              type: "button",
              className: h$,
              "aria-haspopup": "dialog",
              "aria-expanded": w,
              "aria-controls": f,
              title: "Click to see unmapped characters",
              onClick: () => j((U) => !U),
              children: [
                "⚠ ",
                q,
                " unmapped"
              ]
            },
            F
          ),
          w && /* @__PURE__ */ c.jsxs(
            "div",
            {
              ref: _,
              id: f,
              role: "dialog",
              "aria-label": "Unmapped characters",
              className: r$,
              children: [
                /* @__PURE__ */ c.jsx("p", { className: s$, children: "These characters have no voice mapping. Click a name to jump to its row." }),
                /* @__PURE__ */ c.jsx("ul", { className: i$, children: M.map((U) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsx(
                  "button",
                  {
                    type: "button",
                    className: l$,
                    onClick: () => K(U),
                    children: U
                  }
                ) }, U)) })
              ]
            }
          )
        ] })
      ] })
    ] }),
    t.length === 0 ? /* @__PURE__ */ c.jsx("p", { className: u$, children: "No lines yet — add a character line to start. Each row produces one utterance." }) : /* @__PURE__ */ c.jsx("ul", { className: P8, children: t.map((U, W) => {
      const ue = U.character.trim() || `line ${W + 1}`, be = i.has(U.character.trim().toLowerCase()), Ae = T === U.id, lt = R === U.id && T !== U.id;
      return /* @__PURE__ */ c.jsxs(
        "li",
        {
          className: G8,
          "data-mapped": be || void 0,
          "data-dragging": Ae || void 0,
          "data-drag-over": lt || void 0,
          onDragOver: (Ne) => k(Ne, U.id),
          onDrop: (Ne) => ne(Ne, U.id),
          onDragEnd: ae,
          children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: Y8,
                draggable: !0,
                "aria-label": `Drag to reorder ${ue}. Use Alt+ArrowUp / Alt+ArrowDown for keyboard reorder.`,
                title: "Drag to reorder · Alt+↑ / Alt+↓",
                onDragStart: (Ne) => fe(Ne, U.id),
                onKeyDown: (Ne) => {
                  Ne.altKey && Ne.key === "ArrowUp" ? (Ne.preventDefault(), $(U.id, -1)) : Ne.altKey && Ne.key === "ArrowDown" && (Ne.preventDefault(), $(U.id, 1));
                },
                children: "⋮⋮"
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: X8, "aria-hidden": "true", children: (W + 1).toString().padStart(2, "0") }),
            /* @__PURE__ */ c.jsx(
              "input",
              {
                ref: (Ne) => {
                  Ne ? b.current.set(U.id, Ne) : b.current.delete(U.id);
                },
                type: "text",
                value: U.character,
                onChange: (Ne) => P(U.id, { character: Ne.target.value }),
                placeholder: "Character",
                className: Q8,
                "aria-label": `Character name for ${ue}`,
                list: J.length > 0 ? o : void 0,
                autoComplete: "off",
                spellCheck: !1
              }
            ),
            /* @__PURE__ */ c.jsxs(
              "select",
              {
                value: U.presetId ?? "",
                onChange: (Ne) => P(U.id, { presetId: Ne.target.value === "" ? null : Ne.target.value }),
                className: Z8,
                "aria-label": `Emotion preset for ${ue}`,
                children: [
                  /* @__PURE__ */ c.jsx("option", { value: "", children: "No emotion" }),
                  s.map((Ne) => /* @__PURE__ */ c.jsx("option", { value: Ne.presetId, children: Ne.presetName }, Ne.presetId))
                ]
              }
            ),
            /* @__PURE__ */ c.jsxs("span", { className: J8, children: [
              /* @__PURE__ */ c.jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 1,
                  step: 0.05,
                  value: U.alpha,
                  onChange: (Ne) => P(U.id, { alpha: Number.parseFloat(Ne.target.value) }),
                  className: W8,
                  "aria-label": `Emotion intensity for ${ue}`,
                  "aria-valuetext": `${Math.round(U.alpha * 100)} percent`
                }
              ),
              /* @__PURE__ */ c.jsx(
                "span",
                {
                  className: e$,
                  "aria-hidden": "true",
                  "data-hot": U.alpha >= 0.85 || void 0,
                  children: (Math.round(U.alpha * 100) / 100).toFixed(2)
                }
              )
            ] }),
            /* @__PURE__ */ c.jsx(
              "input",
              {
                ref: (Ne) => {
                  Ne ? y.current.set(U.id, Ne) : y.current.delete(U.id);
                },
                type: "text",
                value: U.text,
                onChange: (Ne) => P(U.id, { text: Ne.target.value }),
                onKeyDown: (Ne) => se(Ne, U.id),
                placeholder: "Line text…",
                className: t$,
                "aria-label": `Line text for ${ue}`
              }
            ),
            /* @__PURE__ */ c.jsx(
              "button",
              {
                ref: (Ne) => {
                  Ne ? p.current.set(U.id, Ne) : p.current.delete(U.id);
                },
                type: "button",
                className: n$,
                "aria-label": `Remove ${ue}`,
                title: "Remove this line",
                onClick: () => A(U.id),
                children: "✕"
              }
            ),
            W < t.length - 1 && /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: K8,
                "aria-label": `Insert line after ${ue}`,
                title: "Insert line below",
                onClick: () => V(U.id),
                tabIndex: -1,
                children: /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "＋" })
              }
            )
          ]
        },
        U.id
      );
    }) }),
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: m,
        type: "button",
        className: o$,
        onClick: () => V(null),
        "aria-label": "Add character line",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: c$, "aria-hidden": "true", children: "＋" }),
          "Add line"
        ]
      }
    ),
    J.length > 0 && /* @__PURE__ */ c.jsx("datalist", { id: o, children: J.map((U) => /* @__PURE__ */ c.jsx("option", { value: U }, U)) }),
    /* @__PURE__ */ c.jsx("div", { className: d$, role: "status", "aria-live": "polite", "aria-atomic": "true", children: B })
  ] });
}
var p$ = "fmg0gf0", g$ = "fmg0gf1", px = { idle: "fmg0gf3 fmg0gf2", active: "fmg0gf4 fmg0gf2" };
const Fs = [
  { id: "quick", label: "Quick", glyph: "01", description: "Single voice · plain prose" },
  { id: "rows", label: "Per-character", glyph: "02", description: "One row per line · multi-voice" },
  { id: "story", label: "Story", glyph: "03", description: "Free-form text with @character and /emotion commands" },
  { id: "storyboard", label: "Storyboard", glyph: "04", description: "Click words to cast voice + emotion in bulk · shift-click to extend a range" }
], v$ = Fs;
function y$({
  value: t,
  onChange: a,
  storyDisabled: s = !1
}) {
  const i = g.useRef([]), o = g.useCallback(
    (f, m) => {
      const y = Fs.length;
      let p = f;
      for (let v = 1; v <= y; v += 1) {
        const S = (f + m * v + y) % y, w = Fs[S];
        if (!w) continue;
        if (!(w.id === "story" && s)) {
          p = S;
          break;
        }
      }
      const b = Fs[p];
      b && (a(b.id), i.current[p]?.focus());
    },
    [a, s]
  ), u = g.useCallback(
    (f, m) => {
      f.key === "ArrowRight" || f.key === "ArrowDown" ? (f.preventDefault(), o(m, 1)) : f.key === "ArrowLeft" || f.key === "ArrowUp" ? (f.preventDefault(), o(m, -1)) : f.key === "Home" ? (f.preventDefault(), o(-1, 1)) : f.key === "End" && (f.preventDefault(), o(Fs.length, -1));
    },
    [o]
  );
  return /* @__PURE__ */ c.jsx("div", { className: p$, role: "radiogroup", "aria-label": "Editor mode", children: Fs.map((f, m) => {
    const y = f.id === t, p = f.id === "story" && s, b = p ? `${f.label} (coming soon)` : f.label;
    return /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: (v) => {
          i.current[m] = v;
        },
        type: "button",
        role: "radio",
        "aria-checked": y,
        "aria-disabled": p || void 0,
        tabIndex: y ? 0 : -1,
        title: p ? `${f.description} — coming soon` : f.description,
        className: y ? px.active : px.idle,
        onClick: () => {
          p || a(f.id);
        },
        onKeyDown: (v) => u(v, m),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: g$, "aria-hidden": "true", children: f.glyph }),
          /* @__PURE__ */ c.jsx("span", { children: b })
        ]
      },
      f.id
    );
  }) });
}
const b$ = [
  "boxSizing",
  "width",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "fontStyle",
  "letterSpacing",
  "textTransform",
  "lineHeight",
  "tabSize",
  "wordSpacing",
  "textIndent",
  "whiteSpace",
  "wordBreak",
  "overflowWrap",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "borderTopWidth",
  "borderRightWidth",
  "borderBottomWidth",
  "borderLeftWidth"
];
function x$(t, a) {
  const s = t.ownerDocument;
  if (!s) return { top: 0, left: 0, height: 0 };
  const i = s.createElement("div"), o = s.defaultView?.getComputedStyle(t);
  if (!o) return { top: 0, left: 0, height: 0 };
  const u = i.style, f = o;
  for (const C of b$) {
    const _ = f[C];
    typeof _ == "string" && (u[C] = _);
  }
  i.style.position = "absolute", i.style.visibility = "hidden", i.style.overflow = "hidden", i.style.top = "0", i.style.left = "-9999px", i.style.whiteSpace = "pre-wrap", i.style.wordWrap = "break-word";
  const m = t.value.slice(0, a), y = s.createTextNode(m.replace(/ /g, " ")), p = s.createElement("span");
  p.textContent = t.value.slice(a, a + 1) || ".", i.appendChild(y), i.appendChild(p), s.body.appendChild(i);
  const b = p.getBoundingClientRect(), v = i.getBoundingClientRect(), S = b.top - v.top - t.scrollTop, w = b.left - v.left - t.scrollLeft, j = b.height || parseFloat(o.lineHeight) || 16;
  return s.body.removeChild(i), { top: S, left: w, height: j };
}
const Rw = {
  character: "@",
  emotion: "/"
}, _w = /* @__PURE__ */ new Set([" ", "	", `
`, "\r"]), S$ = /[\p{L}\p{N}_-]/u, w$ = /[^\p{L}\p{N}_-]+/gu;
function Mw(t) {
  return t ? S$.test(t) : !1;
}
function j$(t) {
  return t.replace(w$, "_").replace(/_+/g, "_").replace(/^[_-]+|[_-]+$/g, "");
}
function E$(t, a) {
  if (a >= t.length) return 0;
  const s = t.charCodeAt(a);
  if (s >= 55296 && s <= 56319 && a + 1 < t.length) {
    const i = t.charCodeAt(a + 1);
    if (i >= 56320 && i <= 57343) return 2;
  }
  return 1;
}
function Uc(t, a) {
  const s = E$(t, a);
  return s === 0 ? "" : t.slice(a, a + s);
}
function Bc(t) {
  const a = [];
  let s = 0, i = 0;
  const o = t.length, u = (f) => {
    f > s && a.push({
      kind: "text",
      start: s,
      end: f,
      value: t.slice(s, f)
    });
  };
  for (; i < o; ) {
    const f = t[i], m = f === "@" || f === "/", y = i === 0 ? "" : Uc(t, Ec(t, i)), p = i === 0 || y !== "" && _w.has(y);
    if (m && p) {
      let b = i + 1, v = "";
      for (; b < o; ) {
        const S = Uc(t, b);
        if (S && Mw(S))
          v += S, b += S.length;
        else
          break;
      }
      if (v) {
        u(i), a.push({
          kind: f === "@" ? "character" : "emotion",
          start: i,
          end: b,
          value: v
        }), s = b, i = b;
        continue;
      }
    }
    i += 1;
  }
  return u(o), a;
}
function Ec(t, a) {
  if (a <= 0) return -1;
  const s = t.charCodeAt(a - 1);
  if (s >= 56320 && s <= 57343 && a >= 2) {
    const i = t.charCodeAt(a - 2);
    if (i >= 55296 && i <= 56319) return a - 2;
  }
  return a - 1;
}
function N$(t, a) {
  if (a <= 0 || a > t.length) return null;
  let s = Ec(t, a), i = "";
  for (; s >= 0; ) {
    const o = Uc(t, s);
    if (!o) break;
    if (o === "@" || o === "/") {
      const f = s === 0 ? "" : Uc(t, Ec(t, s));
      return s === 0 || f !== "" && _w.has(f) ? {
        kind: o === "@" ? "character" : "emotion",
        start: s,
        query: i
      } : null;
    }
    if (!Mw(o)) return null;
    i = o + i;
    const u = Ec(t, s);
    if (u < 0) break;
    s = u;
  }
  return null;
}
var C$ = "_1d2ofoy5", T$ = "_1d2ofoy6", R$ = "_1d2ofoy8 _1d2ofoy7", _$ = "_1d2ofoy9 _1d2ofoy7", M$ = "_1d2ofoya", A$ = "_1d2ofoyb", k$ = "_1d2ofoyc", D$ = "_1d2ofoye", z$ = "_1d2ofoyf", O$ = "_1d2ofoyg", L$ = "_1d2ofoyh", $$ = "_1d2ofoyi", U$ = "_1d2ofoyj", oc = "_1d2ofoyk", B$ = "_1d2ofoyl";
const I$ = `Type @character to set the speaker, /emotion to set the emotion preset.

@bob /happy I love mornings!
@alice /melancholic I prefer evenings.`;
function V$({
  value: t,
  onChange: a,
  characters: s,
  presets: i,
  mappingsByLower: o
}) {
  const u = g.useRef(null), f = g.useRef(null), m = g.useId(), y = `${m}-opt`, [p, b] = g.useState(null), v = g.useMemo(() => Bc(t), [t]), S = g.useMemo(() => {
    const D = /* @__PURE__ */ new Map();
    o.forEach((F) => D.set(F.characterName.toLowerCase(), F.characterName));
    for (const F of s) {
      const Z = F.toLowerCase();
      D.has(Z) || D.set(Z, F);
    }
    return Array.from(D.values()).sort((F, Z) => F.localeCompare(Z));
  }, [s, o]), w = g.useMemo(() => {
    if (!p) return [];
    const D = p.query.toLowerCase();
    if (p.kind === "character")
      return S.filter((J) => J.toLowerCase().includes(D)).slice(0, 8).map((J) => {
        const P = o.get(J.toLowerCase());
        return { value: J, hint: P ? "mapped" : "unmapped" };
      });
    const F = /* @__PURE__ */ new Set(), Z = [];
    for (const J of i) {
      const P = J.presetName.toLowerCase();
      if (P.includes(D) && !F.has(P) && (F.add(P), Z.push({ value: J.presetName, hint: "vector" }), Z.length >= 8))
        break;
    }
    return Z;
  }, [p, S, o, i]), j = g.useCallback((D, F, Z) => {
    if (F < 0) return null;
    const J = N$(D, F);
    if (!J) return null;
    const P = u.current, ie = P ? x$(P, F) : { top: 0, left: 0, height: 0 };
    return {
      triggerStart: J.start,
      query: J.query,
      kind: J.kind,
      selected: Z && Z.kind === J.kind ? Z.selected : 0,
      caretTop: ie.top,
      caretLeft: ie.left,
      caretHeight: ie.height
    };
  }, []), C = g.useCallback(() => {
    const D = u.current;
    if (!D) {
      b(null);
      return;
    }
    const F = D.selectionStart;
    if (F !== D.selectionEnd) {
      b(null);
      return;
    }
    b((Z) => j(t, F, Z));
  }, [t, j]);
  g.useEffect(() => {
    if (!p) return;
    const D = w.length, F = D === 0 ? 0 : Math.min(p.selected, D - 1);
    p.selected !== F && b({ ...p, selected: F });
  }, [p, w]), g.useLayoutEffect(() => {
    const D = f.current, F = u.current;
    !D || !F || (D.scrollTop = F.scrollTop, D.scrollLeft = F.scrollLeft);
  }), g.useEffect(() => {
    const D = u.current, F = f.current;
    if (!D || !F) return;
    const Z = () => {
      F.scrollTop = D.scrollTop, F.scrollLeft = D.scrollLeft;
    };
    return D.addEventListener("scroll", Z, { passive: !0 }), () => D.removeEventListener("scroll", Z);
  }, []);
  const _ = g.useCallback(
    (D) => {
      const F = D.target.value;
      a(F);
      const Z = D.target;
      requestAnimationFrame(() => {
        const J = Z.selectionStart;
        if (J !== Z.selectionEnd) {
          b(null);
          return;
        }
        b((P) => j(F, J, P));
      });
    },
    [a, j]
  ), T = g.useCallback(() => {
    C();
  }, [C]), O = g.useCallback(
    (D, F) => {
      if (!p) return;
      const Z = Rw[p.kind], J = p.triggerStart + 1 + p.query.length, P = t.slice(0, p.triggerStart), ie = t.slice(J), A = j$(D);
      if (!A) return;
      const V = `${Z}${A} `, $ = `${P}${V}${ie}`;
      a($);
      const se = P.length + V.length;
      b(null), F.advanceFocus || requestAnimationFrame(() => {
        u.current && (u.current.focus(), u.current.setSelectionRange(se, se));
      });
    },
    [p, t, a]
  ), R = g.useCallback(
    (D) => {
      if (p) {
        if (D.key === "Escape") {
          D.preventDefault(), b(null);
          return;
        }
        if (w.length !== 0) {
          if (D.key === "ArrowDown")
            D.preventDefault(), b((F) => F && { ...F, selected: (F.selected + 1) % w.length });
          else if (D.key === "ArrowUp")
            D.preventDefault(), b(
              (F) => F && { ...F, selected: (F.selected - 1 + w.length) % w.length }
            );
          else if (D.key === "Enter") {
            const F = w[p.selected];
            F && (D.preventDefault(), O(F.value, { advanceFocus: !1 }));
          } else if (D.key === "Tab") {
            const F = w[p.selected];
            F && O(F.value, { advanceFocus: !0 });
          }
        }
      }
    },
    [p, w, O]
  ), N = g.useRef(null), [B, G] = g.useState(null);
  g.useLayoutEffect(() => {
    if (!p) {
      G(null);
      return;
    }
    const D = N.current, F = u.current;
    if (!D || !F) return;
    const Z = D.offsetWidth, J = F.clientWidth, P = Math.max(0, J - Z - 8), ie = Math.max(0, p.caretLeft);
    G(Math.min(ie, P));
  }, [p]);
  const te = p?.kind === "character" ? "Character" : "Emotion preset", M = p && w.length > 0 ? `${y}-${p.selected}` : void 0, q = !p || w.length > 0 ? null : p.kind === "emotion" ? i.length === 0 ? "No emotion presets yet — create one in Mappings." : `No preset matches "${p.query}". Type a different name or pick from Mappings.` : p.query.length === 0 ? "Type a name — we'll create a new character on the fly." : `No character "${p.query}" yet — keep typing to define a new one.`;
  return /* @__PURE__ */ c.jsxs("div", { className: C$, children: [
    /* @__PURE__ */ c.jsxs("div", { className: T$, children: [
      /* @__PURE__ */ c.jsx("div", { ref: f, className: R$, "aria-hidden": "true", children: q$(v, p?.triggerStart ?? null) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          ref: u,
          className: _$,
          value: t,
          onChange: _,
          onSelect: T,
          onKeyDown: R,
          placeholder: I$,
          rows: 10,
          spellCheck: !0,
          "aria-label": "Story script",
          "aria-controls": p && w.length > 0 ? m : void 0,
          "aria-autocomplete": "list",
          "aria-activedescendant": M
        }
      ),
      p && (w.length > 0 || q) && /* @__PURE__ */ c.jsxs(
        "div",
        {
          ref: N,
          className: D$,
          style: {
            top: `${p.caretTop + p.caretHeight + 6}px`,
            left: `${B ?? Math.max(0, p.caretLeft)}px`
          },
          children: [
            /* @__PURE__ */ c.jsx("div", { className: z$, "aria-hidden": "true", children: te }),
            w.length > 0 ? /* @__PURE__ */ c.jsx(
              "ul",
              {
                id: m,
                role: "listbox",
                "aria-label": te,
                className: O$,
                children: w.map((D, F) => {
                  const Z = `${y}-${F}`, J = F === p.selected;
                  return /* @__PURE__ */ c.jsxs(
                    "li",
                    {
                      id: Z,
                      role: "option",
                      "aria-selected": J,
                      "data-active": J || void 0,
                      className: L$,
                      onMouseDown: (P) => {
                        P.preventDefault(), O(D.value, { advanceFocus: !1 });
                      },
                      children: [
                        /* @__PURE__ */ c.jsx("span", { children: D.value }),
                        D.hint && /* @__PURE__ */ c.jsx("span", { className: $$, children: D.hint })
                      ]
                    },
                    `${D.value}-${F}`
                  );
                })
              }
            ) : /* @__PURE__ */ c.jsx("div", { id: m, role: "status", className: B$, children: q })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: U$, children: [
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: oc, children: "@" }),
        " character"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: oc, children: "/" }),
        " emotion"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: oc, children: "⏎" }),
        " commits"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: oc, children: "⇥" }),
        " commits + advance"
      ] })
    ] })
  ] });
}
function q$(t, a) {
  return t.map((s, i) => {
    if (s.kind === "text")
      return /* @__PURE__ */ c.jsx("span", { className: M$, children: s.value }, `${s.start}-${i}`);
    const o = s.kind, u = a !== null && s.start === a, f = s.value.replace(/_/g, " ");
    return /* @__PURE__ */ c.jsxs(
      "span",
      {
        className: k$,
        "data-kind": o,
        "data-active": u ? "true" : void 0,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: A$, children: Rw[o] }),
          f
        ]
      },
      `${s.start}-${i}`
    );
  });
}
var H$ = "_5o8xvy0", F$ = "_5o8xvy1", P$ = "_5o8xvy2", G$ = "_5o8xvy3", Kf = "_5o8xvy4", Y$ = "_5o8xvy5", K$ = "_3f2ar0", X$ = "_3f2ar1", Q$ = "_3f2ar2", Z$ = "_3f2ar3", J$ = "_3f2ar4", W$ = "_3f2ar6", il = "_3f2ar7", ll = "_3f2ar8", ol = "_3f2ar9", gx = "_3f2ara", vx = "_3f2arb";
function eU({ label: t, glyph: a = "?", children: s }) {
  const [i, o] = g.useState(!1), u = g.useRef(null), f = g.useId(), m = `${f}-content`, y = g.useCallback(() => o(!1), []);
  return g.useEffect(() => {
    if (!i) return;
    const p = (v) => {
      u.current && (v.target instanceof Node && u.current.contains(v.target) || y());
    }, b = (v) => {
      v.key === "Escape" && y();
    };
    return document.addEventListener("mousedown", p), document.addEventListener("keydown", b), () => {
      document.removeEventListener("mousedown", p), document.removeEventListener("keydown", b);
    };
  }, [i, y]), /* @__PURE__ */ c.jsxs("span", { ref: u, className: K$, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        id: f,
        className: X$,
        "aria-expanded": i,
        "aria-controls": m,
        onClick: () => o((p) => !p),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: Q$, "aria-hidden": "true", children: a }),
          t
        ]
      }
    ),
    i && /* @__PURE__ */ c.jsx(
      "div",
      {
        id: m,
        role: "dialog",
        "aria-labelledby": f,
        className: Z$,
        children: s
      }
    )
  ] });
}
var tU = "_1dxb1dg0", yx = "_1dxb1dg1", nU = "_1dxb1dg2", aU = "_1dxb1dg3", rU = "_1dxb1dg4";
function sU() {
  return /* @__PURE__ */ c.jsxs(eU, { label: "Syntax", glyph: "?", children: [
    /* @__PURE__ */ c.jsx("h3", { className: J$, children: "Script syntax" }),
    /* @__PURE__ */ c.jsxs("ul", { className: W$, children: [
      /* @__PURE__ */ c.jsxs("li", { className: il, children: [
        /* @__PURE__ */ c.jsx("code", { className: ll, children: "[Char] line text" }),
        /* @__PURE__ */ c.jsx("span", { className: ol, children: "Plain line — uses the speaker's mapped voice." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: il, children: [
        /* @__PURE__ */ c.jsx("code", { className: ll, children: "[Char|emotion_vector:happy=0.7]" }),
        /* @__PURE__ */ c.jsx("span", { className: ol, children: "Per-line 8-axis emotion override. Combine axes with commas." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: il, children: [
        /* @__PURE__ */ c.jsx("code", { className: ll, children: "[Char|qwen:Friendly teen]" }),
        /* @__PURE__ */ c.jsx("span", { className: ol, children: "Send a free-text mood prompt — the Qwen helper turns it into an emotion vector." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: il, children: [
        /* @__PURE__ */ c.jsx("code", { className: ll, children: "[Char|preset:Bittersweet]" }),
        /* @__PURE__ */ c.jsx("span", { className: ol, children: "Apply a saved preset by name." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: il, children: [
        /* @__PURE__ */ c.jsx("code", { className: ll, children: "[Char|audio:slow_breath.wav]" }),
        /* @__PURE__ */ c.jsx("span", { className: ol, children: "Use a reference audio clip as the emotion source." })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: gx, children: [
      /* @__PURE__ */ c.jsx("span", { className: vx, children: "Quick mode" }),
      ": when enabled no [Char] tags are required — every line uses the deployment's default voice. Toggle it above the editor."
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: gx, children: [
      /* @__PURE__ */ c.jsx("span", { className: vx, children: "Mappings" }),
      ": assign characters to voices in the Cast section below. Unmapped characters in non-quick mode trigger a pre-flight warning."
    ] })
  ] });
}
function iU() {
  return /* @__PURE__ */ c.jsxs("ul", { className: tU, children: [
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: yx, children: "[Char]" }),
      " plain line"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: yx, children: "[Char|emotion_vector:happy=0.7]" }),
      " per-line vector"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: nU, children: "[Char|qwen:warm]" }),
      " AI prompt mapping"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: aU, children: "[Char|preset:Bittersweet]" }),
      " saved preset"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: rU, children: "[Char|audio:slow_breath.wav]" }),
      " audio reference"
    ] })
  ] });
}
function lU({
  editorMode: t,
  onEditorModeChange: a,
  deployment: s,
  script: i,
  onScriptChange: o,
  rows: u,
  onRowsChange: f,
  storyText: m,
  onStoryTextChange: y,
  storyCharacters: p,
  outputFormat: b,
  mappingsByLower: v,
  defaultVoiceAssetId: S,
  onDefaultVoiceAssetIdChange: w,
  presets: j,
  voiceAssets: C,
  onQueueChange: _,
  onStoryboardJobsChange: T,
  jobProgress: O
}) {
  const R = t === "quick", N = t === "rows", B = t === "story", G = t === "storyboard", te = B || G, M = v$.find((J) => J.id === t)?.description ?? "", q = N ? u.reduce((J, P) => J + P.text.length, 0) : te ? m.length : i.length, D = N ? u.map((J) => J.text).join(" ") : te ? m : i, F = D.trim() ? D.trim().split(/\s+/).length : 0, Z = N ? u.filter((J) => J.text.trim().length > 0).length : (te ? m : i).trim() ? (te ? m : i).trim().split(/\r?\n/).filter((J) => J.trim()).length : 0;
  return /* @__PURE__ */ c.jsxs("div", { className: H$, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: `${F$} ${R ? P$ : ""}`,
        "data-quick-on": R || void 0,
        children: [
          /* @__PURE__ */ c.jsx(y$, { value: t, onChange: a }),
          R && /* @__PURE__ */ c.jsx(
            R8,
            {
              deploymentId: s.deploymentId,
              initialVoiceAssetId: S,
              onChange: w
            }
          ),
          /* @__PURE__ */ c.jsxs("div", { className: G$, "aria-live": "polite", children: [
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Kf, children: q.toString().padStart(3, "0") }),
              " ",
              "chars"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Kf, children: Z.toString().padStart(2, "0") }),
              " ",
              "lines"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Kf, children: F.toString().padStart(3, "0") }),
              " ",
              "words"
            ] }),
            !N && /* @__PURE__ */ c.jsx(sU, {})
          ] })
        ]
      }
    ),
    /* @__PURE__ */ c.jsx("p", { className: Y$, "aria-live": "polite", children: M }),
    G ? /* @__PURE__ */ c.jsx(
      q6,
      {
        voiceAssets: C,
        presets: j,
        storyText: m,
        onStoryTextChange: y,
        mappings: v,
        onQueueChange: _,
        onJobsChange: T,
        jobProgress: O,
        deploymentId: s.deploymentId
      }
    ) : N ? /* @__PURE__ */ c.jsx(
      m$,
      {
        rows: u,
        onRowsChange: f,
        presets: j,
        mappingsByLower: v
      }
    ) : B ? /* @__PURE__ */ c.jsx(
      V$,
      {
        value: m,
        onChange: y,
        characters: p,
        presets: j,
        mappingsByLower: v
      }
    ) : /* @__PURE__ */ c.jsx(
      A8,
      {
        value: i,
        onChange: o,
        outputFormat: b,
        mappings: v,
        deploymentId: s.deploymentId,
        quickMode: R
      }
    ),
    !R && !N && !B && !G && /* @__PURE__ */ c.jsx(iU, {})
  ] });
}
function oU({
  script: t,
  quickMode: a,
  defaultVoiceAssetId: s,
  characters: i,
  unmappedCount: o,
  globalEmotion: u,
  performance: f
}) {
  const m = [], y = t.trim();
  if (!y)
    m.push({ id: "script", status: "warn", label: "Script", detail: "empty" });
  else {
    const p = y.split(/\r?\n/).filter((b) => b.trim()).length;
    m.push({
      id: "script",
      status: "ok",
      label: "Script",
      detail: `${p} lines · ${y.length} chars`
    });
  }
  if (a ? m.push({
    id: "voice",
    status: s ? "ok" : "warn",
    label: "Quick voice",
    detail: s ? "default voice set" : "no default voice"
  }) : i.length === 0 ? m.push({ id: "cast", status: "info", label: "Cast", detail: "no characters detected" }) : o === 0 ? m.push({ id: "cast", status: "ok", label: "Cast", detail: `${i.length} mapped` }) : m.push({
    id: "cast",
    status: "warn",
    label: "Cast",
    detail: `${o} unmapped`
  }), u.mode === "qwen_template" && !u.qwenTemplate?.trim())
    m.push({ id: "emotion", status: "warn", label: "Emotion", detail: "Qwen template empty" });
  else if (u.mode === "emotion_vector") {
    const p = u.vector, b = Array.isArray(p) && p.some((v) => Math.abs(v) > 0.01);
    m.push({
      id: "emotion",
      status: b ? "ok" : "info",
      label: "Emotion",
      detail: b ? "8-axis vector" : "neutral vector"
    });
  } else u.mode === "audio_ref" ? m.push({ id: "emotion", status: "ok", label: "Emotion", detail: "audio reference" }) : m.push({ id: "emotion", status: "info", label: "Emotion", detail: "neutral" });
  return m.push({
    id: "performance",
    status: "info",
    label: "Performance",
    detail: `intensity ${Math.round(f.intensity * 100)}% · pace ${f.pace.toFixed(2)}× · pitch ${f.pitchSt >= 0 ? "+" : ""}${f.pitchSt.toFixed(1)}st`
  }), m;
}
function bx(t, a) {
  return t === "quick" ? a.script.trim().length > 0 : t === "rows" ? a.rows.some((s) => s.text.trim().length > 0 || s.character.trim().length > 0) : a.storyText.trim().length > 0;
}
function cU(t, a, s, i) {
  if (t === a) return null;
  if (t === "quick" && a === "rows") {
    const u = s.script.split(/\r?\n/).filter((f) => f.trim().length > 0).map((f) => ({
      ...Kr(),
      text: f.trim()
    }));
    return { rows: u.length > 0 ? u : [Kr()] };
  }
  if (t === "quick" && a === "story")
    return { storyText: s.script };
  if (t === "rows" && a === "quick")
    return { script: Tw(s.rows, i) };
  if (t === "rows" && a === "story") {
    const o = /* @__PURE__ */ new Map();
    for (const f of i) o.set(f.presetId, f);
    const u = [];
    for (const f of s.rows) {
      const m = f.text.trim();
      if (!m) continue;
      const y = f.character.trim(), p = f.presetId ? o.get(f.presetId) : null, b = [];
      y && b.push(`@${xx(y)}`), p && b.push(`/${xx(p.presetName)}`), b.push(m), u.push(b.join(" "));
    }
    return { storyText: u.join(`
`) };
  }
  if (t === "story" && a === "quick") {
    const o = Bc(s.storyText), u = [];
    for (const m of o)
      m.kind === "text" && u.push(m.value);
    return { script: u.join("").split(/\r?\n/).map((m) => m.replace(/[ \t]+/g, " ").trim()).filter((m) => m.length > 0).join(`
`) };
  }
  if (t === "story" && a === "rows") {
    const o = Bc(s.storyText), u = /* @__PURE__ */ new Map();
    for (const S of i) u.set(S.presetName.toLowerCase(), S);
    const f = [];
    let m = "", y = null, p = "", b = !1;
    const v = () => {
      const S = p.split(/\r?\n/).map((j) => j.replace(/[ \t]+/g, " ").trim()).filter((j) => j.length > 0);
      if (p = "", S.length === 0) return;
      const w = S[0];
      if (w !== void 0) {
        f.push({
          ...Kr(),
          character: m,
          presetId: y,
          alpha: 1,
          text: w
        });
        for (let j = 1; j < S.length; j += 1) {
          const C = S[j];
          C !== void 0 && f.push({
            ...Kr(),
            character: "",
            presetId: null,
            alpha: 1,
            text: C
          });
        }
      }
    };
    for (const S of o)
      if (S.kind === "character")
        b && v(), m = S.value, y = null, b = !0;
      else if (S.kind === "emotion") {
        b && v();
        const w = u.get(S.value.toLowerCase());
        y = w ? w.presetId : null, b = !0;
      } else
        p += S.value, b = !0;
    return v(), { rows: f.length > 0 ? f : [Kr()] };
  }
  return null;
}
function xx(t) {
  return t.replace(/[^\p{L}\p{N}_-]/gu, "_");
}
const Xf = [
  "#ba9eff",
  "#9093ff",
  "#ff8439",
  "#22c55e",
  "#ffd34a",
  "#ff7aa8"
], uU = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;
function dU(t) {
  const a = [];
  if (!t) return a;
  const s = t.split(/\r?\n/);
  for (let i = 0; i < s.length; i += 1) {
    const u = (s[i] ?? "").trim();
    if (u.length === 0) continue;
    const f = u.match(uU);
    if (!f || !f.groups) {
      a.push({ idx: i, character: null, text: u, override: null });
      continue;
    }
    const m = f.groups.body ?? "", y = (f.groups.rest ?? "").trim(), [p = "", ...b] = m.split("|"), v = p.trim();
    if (!v) {
      a.push({ idx: i, character: null, text: y || u, override: null });
      continue;
    }
    const S = v.split(":")[0]?.trim() || null, w = b.join("|").trim(), j = w ? fU(w) : null;
    a.push({
      idx: i,
      character: S,
      text: y,
      override: j
    });
  }
  return a;
}
function fU(t) {
  const a = t.trim();
  if (!a) return { kind: "raw", label: "" };
  const s = a.indexOf(":"), i = s >= 0 ? a.slice(0, s).trim().toLowerCase() : a.toLowerCase(), o = s >= 0 ? a.slice(s + 1).trim() : "";
  switch (i) {
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
function hU(t) {
  const a = /* @__PURE__ */ new Set(), s = [];
  for (const i of t) {
    if (!i.character) continue;
    const o = i.character.toLowerCase();
    a.has(o) || (a.add(o), s.push(i.character));
  }
  return s;
}
function mU(t) {
  const a = {};
  for (let s = 0; s < t.length; s += 1) {
    const i = t[s];
    i && (a[i] = Xf[s % Xf.length] ?? Xf[0]);
  }
  return a;
}
function pU(t) {
  const a = {};
  for (const s of t)
    s.character && (a[s.character] = (a[s.character] ?? 0) + 1);
  return a;
}
var gU = "_1snzz30", vU = "_1snzz31", yU = "_1snzz33", bU = "_1snzz34", xU = "_1snzz36", Sx = "_1snzz3b", wx = "_1snzz3c", jx = "_1snzz3d";
const SU = "ext-action-invoke", wU = "emotion-tts.run";
function jU() {
  if (typeof document > "u") return !1;
  const t = document.querySelector("emotion-tts-app");
  return t ? (t.dispatchEvent(
    new CustomEvent(SU, {
      detail: { id: wU },
      bubbles: !1
    })
  ), !0) : !1;
}
const EU = 4e3;
function NU({ visible: t, canGenerate: a }) {
  const [s, i] = g.useState(null), [o, u] = g.useState(!1), [f, m] = g.useState(!1), y = g.useRef(null);
  g.useEffect(() => {
    let V = !1;
    const $ = async () => {
      try {
        const fe = await yl();
        V || (y.current = fe, i(fe));
      } catch {
      }
    };
    $();
    const se = window.setInterval($, EU);
    return () => {
      V = !0, window.clearInterval(se);
    };
  }, []), g.useEffect(() => gw((V) => {
    m(!!V.busy);
  }), []);
  const p = g.useCallback(() => {
    oO();
  }, []), b = s?.badge ?? "not_installed", v = b === "ready" || b === "running", S = b === "starting" || b === "installing" || b === "stopping", w = v;
  g.useEffect(() => {
    o && (S || v) && u(!1);
  }, [o, S, v]);
  const j = g.useCallback(() => {
    u(!0), jU();
  }, []), C = v ? "Stop runtime" : S ? "Runtime starting…" : "Start runtime", _ = o || S, T = o || S, O = T ? "transitioning" : v ? "running" : "stopped", R = !a || f || !w, N = w ? a ? f ? "Generating…" : "Generate" : "Add a script to generate" : "Start runtime to generate", B = w && a && !f, G = v ? "ready" : S || o ? "busy" : "off", te = v ? "Runtime ready" : S ? "Starting…" : o ? "Working…" : "Runtime off", M = G === "busy";
  if (typeof document > "u") return /* @__PURE__ */ c.jsx(c.Fragment, {});
  const q = "rgba(28, 30, 34, 0.94)", D = "#ba9eff", F = "#8455ef", Z = "#1a0a3a", J = "#f0f0f3", P = "#aaabae", ie = "#22c55e", A = v ? "◼" : "⏻";
  return Wh.createPortal(
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: gU,
        "data-visible": t ? "true" : "false",
        role: "toolbar",
        "aria-label": "Quick actions",
        "aria-hidden": !t,
        style: {
          position: "fixed",
          bottom: "24px",
          left: "50%",
          right: "auto",
          top: "auto",
          transform: t ? "translate(-50%, 0)" : "translate(-50%, 12px)",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          paddingInline: "8px",
          paddingBlock: "8px",
          background: q,
          boxShadow: "0 18px 44px -12px rgba(0, 0, 0, 0.7), 0 6px 18px -6px rgba(0, 0, 0, 0.55), inset 0 0 0 1px rgba(186, 158, 255, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(20px) saturate(1.7)",
          WebkitBackdropFilter: "blur(20px) saturate(1.7)",
          borderRadius: "999px",
          zIndex: 60
        },
        children: [
          /* @__PURE__ */ c.jsxs(
            "span",
            {
              className: vU,
              "data-tone": G,
              "aria-live": "polite",
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                paddingInline: "14px",
                height: "36px",
                borderRadius: "999px",
                fontFamily: 'var(--font-mono, "JetBrains Mono", ui-monospace, monospace)',
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: G === "ready" ? ie : G === "busy" ? D : P,
                background: "rgba(255, 255, 255, 0.04)",
                boxShadow: `inset 0 0 0 1px ${G === "ready" ? "rgba(34, 197, 94, 0.4)" : G === "busy" ? "rgba(186, 158, 255, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                whiteSpace: "nowrap"
              },
              children: [
                /* @__PURE__ */ c.jsx(
                  "span",
                  {
                    className: yU,
                    "data-pulse": M ? "true" : "false",
                    "aria-hidden": "true",
                    style: {
                      width: "6px",
                      height: "6px",
                      borderRadius: "999px",
                      background: "currentColor",
                      boxShadow: G === "ready" ? `0 0 8px ${ie}` : G === "busy" ? `0 0 8px ${D}` : "none",
                      flexShrink: 0
                    }
                  }
                ),
                te
              ]
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: wx, children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: bU,
                "data-state": O,
                onClick: j,
                disabled: _,
                "aria-label": C,
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  border: "none",
                  borderRadius: "999px",
                  background: O === "running" ? "rgba(34, 197, 94, 0.18)" : "rgba(255, 255, 255, 0.05)",
                  color: O === "running" ? ie : J,
                  fontSize: "16px",
                  cursor: _ ? "not-allowed" : "pointer",
                  opacity: _ ? 0.6 : 1,
                  boxShadow: `inset 0 0 0 1px ${O === "running" ? "rgba(34, 197, 94, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                  transition: "background 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease"
                },
                children: T ? /* @__PURE__ */ c.jsx("span", { className: Sx, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: A })
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: jx, role: "tooltip", children: C })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: wx, children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: xU,
                "data-ready": B ? "true" : "false",
                onClick: p,
                disabled: R,
                "aria-label": N,
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  paddingInline: "18px",
                  height: "36px",
                  border: "none",
                  borderRadius: "999px",
                  background: R ? "rgba(186, 158, 255, 0.18)" : `linear-gradient(180deg, ${D} 0%, ${F} 100%)`,
                  color: R ? P : Z,
                  fontFamily: 'var(--font-ui, "Inter", system-ui, -apple-system, sans-serif)',
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  cursor: R ? "not-allowed" : "pointer",
                  boxShadow: R ? "none" : "0 6px 20px -6px rgba(132, 85, 239, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
                  transition: "transform 160ms ease, box-shadow 160ms ease, color 160ms ease",
                  whiteSpace: "nowrap"
                },
                children: [
                  f ? /* @__PURE__ */ c.jsx("span", { className: Sx, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { style: { fontSize: "11px" }, "aria-hidden": "true", children: "▶" }),
                  /* @__PURE__ */ c.jsx("span", { children: f ? "Running" : "Generate" })
                ]
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: jx, role: "tooltip", children: N })
          ] })
        ]
      }
    ),
    document.body
  );
}
function CU(t) {
  const a = t.workflowCustomised ?? !1, s = t.unmappableFields ?? [], i = TU(t.deployment.displayName, t.deployment.deploymentId), o = yw(bw), u = t.canGenerate ?? !1;
  return /* @__PURE__ */ c.jsxs("div", { className: FR, children: [
    /* @__PURE__ */ c.jsxs("header", { className: PR, children: [
      /* @__PURE__ */ c.jsx("div", { className: YR, children: "EmotionTTS · Recipe Studio" }),
      /* @__PURE__ */ c.jsx("div", { className: GR, children: /* @__PURE__ */ c.jsx("h1", { className: KR, children: i }) }),
      /* @__PURE__ */ c.jsx("p", { className: XR, children: "Author the script, cast the voices, sculpt the emotion, and modulate every utterance — all from a single screen, with cache-bound previews and a non-destructive edit chain." }),
      t.hero
    ] }),
    a && /* @__PURE__ */ c.jsxs(kn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("strong", { children: "Workflow customised." }),
      " ",
      s.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${s.join(", ")}.`,
      " ",
      /* @__PURE__ */ c.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    t.quickActions && /* @__PURE__ */ c.jsx("div", { className: i_, "aria-label": "Quick actions", children: t.quickActions }),
    t.recentGenerations,
    /* @__PURE__ */ c.jsxs("div", { className: QR, children: [
      /* @__PURE__ */ c.jsx(
        gr,
        {
          number: "01",
          title: "Script",
          id: "recipe-section-script",
          variant: "default",
          children: t.scriptSection
        }
      ),
      /* @__PURE__ */ c.jsx(
        gr,
        {
          number: "02",
          title: "Parsed dialogue",
          id: "recipe-section-parsed",
          variant: "default",
          children: t.parsedDialogueSection
        }
      ),
      t.voiceLibrarySection && /* @__PURE__ */ c.jsx(
        gr,
        {
          number: "03",
          title: "Voice library",
          id: "recipe-section-voice-library",
          variant: "default",
          children: t.voiceLibrarySection
        }
      ),
      /* @__PURE__ */ c.jsx(
        gr,
        {
          number: t.voiceLibrarySection ? "04" : "03",
          title: "Cast",
          id: "recipe-section-cast",
          variant: "default",
          children: t.castSection
        }
      ),
      /* @__PURE__ */ c.jsx(
        gr,
        {
          number: t.voiceLibrarySection ? "05" : "04",
          title: "Emotion",
          id: "recipe-section-emotion",
          variant: "split",
          children: t.emotionSection
        }
      ),
      /* @__PURE__ */ c.jsx(
        gr,
        {
          number: t.voiceLibrarySection ? "06" : "05",
          title: "Performance",
          id: "recipe-section-performance",
          variant: "default",
          children: t.performanceSection
        }
      ),
      /* @__PURE__ */ c.jsx(
        gr,
        {
          number: t.voiceLibrarySection ? "07" : "06",
          title: "Recent runs",
          id: "recipe-section-runs",
          variant: "default",
          children: t.recentRunsSection
        }
      ),
      t.auditSection && /* @__PURE__ */ c.jsx(
        gr,
        {
          number: t.voiceLibrarySection ? "08" : "07",
          title: "Edit history",
          id: "recipe-section-audit",
          variant: "default",
          defaultCollapsed: !0,
          children: t.auditSection
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx(NU, { visible: o, canGenerate: u }),
    typeof document < "u" && Wh.createPortal(
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: l_,
          "data-visible": o ? "true" : "false",
          "aria-label": "Scroll to top",
          title: "Scroll to top",
          onClick: JO,
          children: "↑"
        }
      ),
      document.body
    )
  ] });
}
function TU(t, a) {
  const s = (t ?? "").trim();
  return !s || s === a ? "Recipe Studio" : s;
}
function gr({
  number: t,
  title: a,
  id: s,
  variant: i,
  defaultCollapsed: o = !1,
  children: u
}) {
  const [f, m] = g.useState(o), y = `${s}-body`;
  return /* @__PURE__ */ c.jsxs("section", { className: ZR, "aria-labelledby": s, children: [
    /* @__PURE__ */ c.jsx("header", { className: JR, children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: t_,
        "aria-expanded": !f,
        "aria-controls": y,
        onClick: () => m((p) => !p),
        children: [
          /* @__PURE__ */ c.jsxs("span", { className: WR, children: [
            /* @__PURE__ */ c.jsx("span", { className: n_, children: t }),
            /* @__PURE__ */ c.jsx("span", { className: a_, "aria-hidden": "true", children: "/" }),
            /* @__PURE__ */ c.jsx("span", { className: r_, children: a })
          ] }),
          /* @__PURE__ */ c.jsx("h2", { id: s, className: e_, children: a }),
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: s_,
              "data-collapsed": f ? "true" : "false",
              "aria-hidden": "true",
              children: "▾"
            }
          )
        ]
      }
    ) }),
    !f && /* @__PURE__ */ c.jsx(
      "div",
      {
        id: y,
        className: i === "split" ? c_ : o_,
        children: u
      }
    )
  ] });
}
const yn = {
  success(t) {
    mn.success(t);
  },
  error(t) {
    mn.error(t);
  }
}, Dh = "__recipe";
function RU(t) {
  try {
    const a = JSON.parse(t);
    return typeof a == "object" && a !== null ? a : {};
  } catch {
    return {};
  }
}
function _U(t) {
  const a = {};
  for (const s of Object.keys(t))
    s !== Dh && (a[s] = t[s]);
  return a;
}
function MU() {
  const { deployment: t, mappings: a, runs: s, workflow: i } = Rl(), [o, u] = g.useState(a), [f, m] = g.useState([]), [y, p] = g.useState([]), [b, v] = g.useState(null), [S, w] = g.useState(Kc), j = g.useMemo(
    () => t.defaultGenerationOverridesJson ? RU(t.defaultGenerationOverridesJson) : {},
    [t.defaultGenerationOverridesJson]
  ), C = g.useMemo(() => {
    const he = j[Dh];
    return typeof he == "object" && he !== null ? he : {};
  }, [j]), [_, T] = g.useState(""), [O, R] = g.useState(
    t.defaultOutputFormat ?? "mp3"
  ), [N, B] = g.useState(t.defaultSpeedFactor ?? 1), [G, te] = g.useState({
    mode: "none",
    emotionAlpha: 1
  }), [M, q] = g.useState(() => ({
    temperature: 0.8,
    top_p: 0.8,
    seed: 42,
    ..._U(j)
  })), [D, F] = g.useState(() => {
    const he = C.cachePolicy;
    return he === "use_cache" || he === "force_regenerate" || he === "read_only_cache" ? he : "use_cache";
  }), [Z, J] = g.useState(
    t.defaultVoiceAssetId ?? null
  ), [P, ie] = g.useState(() => {
    const he = C.editorMode;
    return he === "quick" || he === "rows" || he === "story" || he === "storyboard" ? he : typeof C.quickMode == "boolean" || t.defaultVoiceAssetId != null ? "quick" : "rows";
  }), A = P === "quick", [V, $] = g.useState(() => [Kr()]), se = 1e5, [fe, k] = g.useState(() => {
    const he = C.storyText;
    return typeof he == "string" ? he : "";
  }), ne = g.useRef(!1), ae = g.useCallback((he) => {
    he.length > se && !ne.current && (ne.current = !0, yn.error(
      `Story text is over ${Math.round(se / 1e3)} KB — large scripts may slow down save and rendering.`
    )), he.length <= se && (ne.current = !1), k(he);
  }, []), [K, U] = g.useState(Gk), [W, ue] = g.useState([]), [be, Ae] = g.useState([]), [lt, Ne] = g.useState(
    () => /* @__PURE__ */ new Map()
  ), We = g.useRef(_), Be = g.useRef(V), Fe = g.useRef(fe), rn = g.useRef(y);
  g.useEffect(() => {
    We.current = _;
  }, [_]), g.useEffect(() => {
    Be.current = V;
  }, [V]), g.useEffect(() => {
    Fe.current = fe;
  }, [fe]), g.useEffect(() => {
    rn.current = y;
  }, [y]);
  const [qt, At] = g.useState(""), Te = g.useCallback(
    (he) => {
      ie((Re) => {
        if (he === Re) return Re;
        const ve = {
          script: We.current,
          rows: Be.current,
          storyText: Fe.current
        }, xe = bx(he, ve), Y = bx(Re, ve);
        if (!xe && Y) {
          const ce = cU(Re, he, ve, rn.current);
          if (ce) {
            const Ce = { ...ve }, _e = document.activeElement;
            ce.script !== void 0 && T(ce.script), ce.rows !== void 0 && $(ce.rows), ce.storyText !== void 0 && ae(ce.storyText);
            const Ge = {
              quick: "Quick",
              rows: "Per-character",
              story: "Story",
              storyboard: "Storyboard"
            }, wt = (ge) => ge.split(/\r?\n/).filter((ye) => ye.trim().length > 0).length, ft = ce.rows !== void 0 ? ce.rows.length : ce.script !== void 0 ? wt(ce.script) : ce.storyText !== void 0 ? wt(ce.storyText) : 0, z = ft === 1 ? "line" : "lines", H = ft > 0 ? ` (${ft} ${z})` : "", Q = `Switched to ${Ge[he]} mode${ft > 0 ? `, ${ft} ${z}` : ""}.`;
            At((ge) => ge === Q ? `${Q}​` : Q), mn(`Switched to ${Ge[he]}${H} — content kept`, {
              action: {
                label: "Undo",
                onClick: () => {
                  T(Ce.script), $([...Ce.rows]), ae(Ce.storyText), ie(Re), _e && typeof _e.focus == "function" && requestAnimationFrame(() => _e.focus());
                }
              },
              duration: 5e3
            });
          }
        }
        return he;
      });
    },
    [ae]
  );
  g.useEffect(() => {
    let he = !1;
    return Zs(t.deploymentId).then((Re) => {
      he || m(Re.voiceAssets);
    }).catch(() => {
    }), EM(t.deploymentId).then((Re) => {
      he || p(
        [...Re.presets].sort((ve, xe) => xe.updatedAt - ve.updatedAt)
      );
    }).catch(() => {
    }), () => {
      he = !0;
    };
  }, [t.deploymentId]);
  const He = g.useRef(!0);
  g.useEffect(() => {
    if (He.current) {
      He.current = !1;
      return;
    }
    const he = window.setTimeout(() => {
      const Re = {
        ...M,
        [Dh]: {
          editorMode: P,
          quickMode: A,
          cachePolicy: D,
          storyText: fe
        }
      };
      Mt(`/deployments/${t.deploymentId}`, {
        method: "PATCH",
        body: JSON.stringify({
          defaultOutputFormat: O,
          defaultSpeedFactor: N,
          defaultGenerationOverrides: Re
        })
      }).catch(() => {
      });
    }, 600);
    return () => window.clearTimeout(he);
  }, [
    t.deploymentId,
    O,
    N,
    D,
    P,
    A,
    fe,
    M
  ]);
  const at = g.useMemo(() => P === "rows" ? Tw(V, y) : P === "story" ? fe : _, [P, V, y, _, fe]), St = g.useMemo(() => dU(at), [at]), ot = g.useMemo(() => {
    if (P !== "story") return hU(St);
    const he = /* @__PURE__ */ new Set(), Re = [];
    for (const ve of Bc(fe))
      ve.kind === "character" && (he.has(ve.value) || (he.add(ve.value), Re.push(ve.value)));
    return Re;
  }, [P, St, fe]), Ke = g.useMemo(() => {
    const he = new Set(ot.map((ve) => ve.toLowerCase())), Re = [...ot];
    for (const ve of o) {
      if (!ve.isActive) continue;
      const xe = ve.characterName.toLowerCase();
      he.has(xe) || (he.add(xe), Re.push(ve.characterName));
    }
    return Re;
  }, [ot, o]), gt = g.useMemo(() => mU(Ke), [Ke]), je = g.useMemo(() => pU(St), [St]), ke = g.useMemo(() => {
    const he = /* @__PURE__ */ new Map();
    for (const Re of o)
      he.set(Re.characterName.toLowerCase(), Re);
    return he;
  }, [o]), Pe = g.useMemo(() => A && Z ? 0 : Ke.filter((he) => !ke.has(he.toLowerCase())).length, [Ke, ke, A, Z]), Xe = g.useCallback(
    async (he, Re) => {
      const ve = ke.get(he.toLowerCase());
      try {
        if (ve) {
          const xe = await Ys(t.deploymentId, ve.mappingId, Re);
          u(
            (Y) => Y.map((ce) => ce.mappingId === xe.mappingId ? xe : ce)
          ), yn.success(`Updated mapping for ${ve.characterName}`);
        } else if (Re.speakerVoiceAssetId) {
          const xe = await Zh(t.deploymentId, {
            ...Re,
            characterName: he,
            speakerVoiceAssetId: Re.speakerVoiceAssetId
          });
          u((Y) => [...Y, xe]), yn.success(`Mapped ${he} to voice`);
        }
      } catch (xe) {
        yn.error(xe instanceof Error ? xe.message : "mapping failed");
      }
    },
    [ke, t.deploymentId]
  ), yt = g.useCallback(
    async (he, Re) => {
      const ve = Re.trim(), xe = ke.get(he.toLowerCase());
      if (!(!xe || !ve || ve === xe.characterName))
        try {
          const Y = await Ys(t.deploymentId, xe.mappingId, {
            characterName: ve
          });
          u(
            (ce) => ce.map((Ce) => Ce.mappingId === Y.mappingId ? Y : Ce)
          ), yn.success(`Renamed character to ${ve}`);
        } catch (Y) {
          yn.error(Y instanceof Error ? Y.message : "rename failed");
        }
    },
    [ke, t.deploymentId]
  ), Tt = g.useCallback(
    async (he) => {
      const Re = ke.get(he.toLowerCase());
      if (Re)
        try {
          await T1(t.deploymentId, Re.mappingId), u((ve) => ve.filter((xe) => xe.mappingId !== Re.mappingId)), yn.success(`Cleared mapping for ${he}`);
        } catch (ve) {
          yn.error(ve instanceof Error ? ve.message : "clear failed");
        }
    },
    [ke, t.deploymentId]
  ), zn = g.useCallback(
    async (he, Re) => {
      try {
        const ve = await Tc(
          t.deploymentId,
          Re,
          Re.name.replace(/\.[^.]+$/, ""),
          "speaker"
        );
        m((xe) => [ve, ...xe]), await Xe(he, { speakerVoiceAssetId: ve.voiceAssetId });
      } catch (ve) {
        yn.error(ve instanceof Error ? ve.message : "upload failed");
      }
    },
    [t.deploymentId, Xe]
  ), Sn = g.useCallback(
    (he, Re) => {
      Xe(Re, { speakerVoiceAssetId: he.voiceAssetId });
    },
    [Xe]
  ), pn = g.useCallback((he) => {
    w(he);
  }, []), Pt = g.useMemo(() => {
    const he = [], Re = /* @__PURE__ */ new Set();
    for (const ve of o) {
      const xe = ve.speakerVoiceAssetId;
      if (!xe || Re.has(xe)) continue;
      Re.add(xe);
      const ce = f.find((Ce) => Ce.voiceAssetId === xe)?.displayName ?? `${ve.characterName} · ${xe.slice(0, 8)}`;
      he.push({ kind: "voice_asset", id: xe, label: ce });
    }
    for (const ve of f)
      Re.has(ve.voiceAssetId) || (Re.add(ve.voiceAssetId), he.push({ kind: "voice_asset", id: ve.voiceAssetId, label: ve.displayName }));
    return he;
  }, [o, f]), Dt = g.useCallback(
    async (he, Re) => {
      if (he.kind !== "voice_asset") {
        yn.error("Targeted revert is only supported for voice assets in v1.");
        return;
      }
      let ve;
      try {
        const xe = JSON.parse(Re);
        if (typeof xe != "object" || xe === null || xe.version !== 1 || !Array.isArray(xe.ops))
          throw new Error("snapshot is not a valid EditChain");
        ve = xe;
      } catch (xe) {
        yn.error(
          xe instanceof Error ? `Audit snapshot is malformed: ${xe.message}` : "Audit snapshot is malformed; cannot revert."
        );
        return;
      }
      try {
        const xe = await M1(he.id, t.deploymentId, {
          chain: ve
        }), Y = o.filter((ce) => ce.speakerVoiceAssetId === he.id);
        await Promise.all(
          Y.map(
            (ce) => Ys(t.deploymentId, ce.mappingId, {
              voiceAssetChainDigest: xe.chain_digest
            }).catch(() => null)
          )
        ), u(
          (ce) => ce.map(
            (Ce) => Ce.speakerVoiceAssetId === he.id ? { ...Ce, voiceAssetChainDigest: xe.chain_digest } : Ce
          )
        ), yn.success(`Reverted ${he.label} to a prior chain`);
      } catch (xe) {
        yn.error(xe instanceof Error ? xe.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), Bt = g.useCallback(
    async (he) => {
      if (he.kind !== "voice_asset") {
        yn.error("Revert is only supported for voice assets in v1.");
        return;
      }
      try {
        await IR(he.id, t.deploymentId);
        const Re = o.filter((ve) => ve.speakerVoiceAssetId === he.id);
        await Promise.all(
          Re.map(
            (ve) => Ys(t.deploymentId, ve.mappingId, {
              voiceAssetChainDigest: null
            }).catch(() => null)
          )
        ), u(
          (ve) => ve.map(
            (xe) => xe.speakerVoiceAssetId === he.id ? { ...xe, voiceAssetChainDigest: null } : xe
          )
        ), yn.success(`Cleared edit chain on ${he.label}`);
      } catch (Re) {
        yn.error(Re instanceof Error ? Re.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), sa = g.useMemo(
    () => ({
      script: at,
      parserMode: P === "quick" ? "raw_text" : P === "story" ? "story" : "dialogue",
      outputFormat: O,
      speedFactor: N,
      globalEmotion: { ...G, emotionAlpha: K.intensity },
      generation: M,
      cachePolicy: D,
      ...P === "storyboard" && W.length > 0 ? {
        prebuiltSegments: W.map(
          (he) => he.emotion ? { ...he, emotion: { ...he.emotion, emotionAlpha: K.intensity } } : he
        )
      } : {}
    }),
    [at, P, O, N, K.intensity, G, M, D, W]
  ), wn = g.useMemo(
    () => oU({
      script: at,
      quickMode: A,
      defaultVoiceAssetId: Z,
      characters: Ke,
      unmappedCount: Pe,
      globalEmotion: G,
      performance: K
    }),
    [at, A, Z, Ke, Pe, G, K]
  ), cn = g.useMemo(
    () => wn.filter((he) => he.id !== "performance").map((he) => ({
      label: he.label,
      status: he.status === "ok" ? "ok" : he.status === "warn" ? "warn" : "ok",
      detail: he.detail
    })),
    [wn]
  ), En = P === "storyboard" && W.length > 0, It = at.trim().length > 0 || En;
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsx(UR, { position: "bottom-right", richColors: !0, theme: "dark" }),
    /* @__PURE__ */ c.jsx(
      "div",
      {
        role: "status",
        "aria-live": "polite",
        "aria-atomic": "true",
        style: {
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clipPath: "inset(50%)",
          whiteSpace: "nowrap",
          border: 0
        },
        children: qt
      }
    ),
    /* @__PURE__ */ c.jsx(
      CU,
      {
        deployment: t,
        canGenerate: It,
        workflowCustomised: i.workflow.customised,
        unmappableFields: i.unmappableFields,
        hero: /* @__PURE__ */ c.jsx(m2, { deployment: t }),
        quickActions: /* @__PURE__ */ c.jsx(
          TL,
          {
            deploymentId: t.deploymentId,
            createPayload: sa,
            canGenerate: It,
            diagnostics: cn,
            storyboardJobs: P === "storyboard" ? be : void 0,
            onJobProgressChange: Ne
          }
        ),
        recentGenerations: /* @__PURE__ */ c.jsx(
          BO,
          {
            deploymentId: t.deploymentId,
            speedFactor: N
          }
        ),
        scriptSection: /* @__PURE__ */ c.jsx(
          lU,
          {
            editorMode: P,
            onEditorModeChange: Te,
            deployment: t,
            script: _,
            onScriptChange: T,
            rows: V,
            onRowsChange: $,
            storyText: fe,
            onStoryTextChange: ae,
            storyCharacters: Ke,
            outputFormat: O,
            mappingsByLower: ke,
            defaultVoiceAssetId: Z,
            onDefaultVoiceAssetIdChange: J,
            presets: y,
            voiceAssets: f,
            onQueueChange: ue,
            onStoryboardJobsChange: Ae,
            jobProgress: P === "storyboard" ? lt : void 0
          }
        ),
        parsedDialogueSection: /* @__PURE__ */ c.jsx($k, { lines: St, characterColors: gt }),
        voiceLibrarySection: /* @__PURE__ */ c.jsx(
          jM,
          {
            deploymentId: t.deploymentId,
            voiceAssets: f,
            mappings: o,
            characterColors: gt,
            onVoiceAssetsChange: m,
            onCreateCharacterFromVoice: Sn
          }
        ),
        castSection: /* @__PURE__ */ c.jsx(i2, { unmappedCount: Pe, totalCount: Ke.length, children: Ke.map((he) => {
          const Re = ke.get(he.toLowerCase()) ?? null, ve = gt[he] ?? "#ba9eff";
          return /* @__PURE__ */ c.jsx("li", { className: x_, children: /* @__PURE__ */ c.jsx(
            s2,
            {
              characterName: he,
              color: ve,
              lineCount: je[he] ?? 0,
              mapping: Re,
              voiceAssets: f,
              presets: y,
              active: b === he,
              onToggle: () => v((xe) => xe === he ? null : he),
              onAssignVoiceAsset: (xe) => Xe(he, { speakerVoiceAssetId: xe }),
              onAssignPreset: (xe) => Xe(he, { defaultVectorPresetId: xe }),
              onUploadFile: (xe) => zn(he, xe),
              onClearMapping: () => Tt(he),
              onRename: (xe) => yt(he, xe)
            }
          ) }, he);
        }) }),
        emotionSection: /* @__PURE__ */ c.jsx(
          ok,
          {
            value: G,
            onChange: te,
            deploymentId: t.deploymentId,
            presets: y,
            onPresetsChange: p
          }
        ),
        performanceSection: /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
          /* @__PURE__ */ c.jsx(
            Yk,
            {
              value: { ...K, pace: N },
              onChange: (he) => {
                U(he), he.pace !== N && B(he.pace);
              }
            }
          ),
          /* @__PURE__ */ c.jsx(
            nm,
            {
              state: S,
              onChange: pn,
              supportsSynthSpeed: !1
            }
          ),
          /* @__PURE__ */ c.jsx(r5, { checks: wn }),
          /* @__PURE__ */ c.jsx(
            Tk,
            {
              outputFormat: O,
              onOutputFormatChange: R,
              speedFactor: N,
              onSpeedFactorChange: B,
              cachePolicy: D,
              onCachePolicyChange: F,
              generation: M,
              onGenerationChange: q
            }
          )
        ] }),
        recentRunsSection: /* @__PURE__ */ c.jsx(d5, { runs: s, deploymentId: t.deploymentId }),
        auditSection: /* @__PURE__ */ c.jsx(
          IM,
          {
            deploymentId: t.deploymentId,
            targets: Pt,
            onRevertToIdentity: Bt,
            onRevertToChain: Dt
          }
        )
      }
    )
  ] });
}
const Ex = /* @__PURE__ */ new Map();
function AU(t, a) {
  const [s, i] = g.useState({
    peaks: null,
    isLoading: !0,
    error: null
  });
  return g.useEffect(() => {
    if (!t || a <= 0) {
      i({ peaks: null, isLoading: !1, error: null });
      return;
    }
    const o = `${t}::${a}`, u = Ex.get(o);
    if (u) {
      i({ peaks: u, isLoading: !1, error: null });
      return;
    }
    const f = new AbortController();
    return i({ peaks: null, isLoading: !0, error: null }), kU(t, a, f.signal).then((m) => {
      f.signal.aborted || (Ex.set(o, m), i({ peaks: m, isLoading: !1, error: null }));
    }).catch((m) => {
      if (f.signal.aborted) return;
      const y = m instanceof Error ? m.message : "decode failed";
      i({ peaks: null, isLoading: !1, error: y });
    }), () => f.abort();
  }, [t, a]), s;
}
async function kU(t, a, s) {
  const i = await fetch(t, { signal: s });
  if (!i.ok) throw new Error(`failed to load audio (${i.status})`);
  const o = await i.arrayBuffer();
  if (s.aborted) throw new DOMException("aborted", "AbortError");
  const f = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return DU(f, a);
}
function DU(t, a) {
  const s = t.numberOfChannels, i = t.length, o = Math.max(1, Math.floor(i / a)), u = new Float32Array(a), f = [];
  for (let m = 0; m < s; m += 1) f.push(t.getChannelData(m));
  for (let m = 0; m < a; m += 1) {
    const y = m * o, p = Math.min(i, y + o);
    let b = 0;
    for (let v = y; v < p; v += 1) {
      let S = 0;
      for (let j = 0; j < s; j += 1) {
        const C = f[j];
        C && (S += Math.abs(C[v] ?? 0));
      }
      const w = S / s;
      w > b && (b = w);
    }
    u[m] = b;
  }
  return u;
}
const Nx = "(prefers-reduced-motion: reduce)";
function zU() {
  const [t, a] = g.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(Nx).matches);
  return g.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const s = window.matchMedia(Nx), i = (o) => a(o.matches);
    return s.addEventListener("change", i), () => s.removeEventListener("change", i);
  }, []), t;
}
var OU = "mquzal0", LU = "mquzal1", Cx = "mquzal2", Tx = "mquzal3", Rx = "mquzal4", $U = "mquzal5", _x = "mquzal6", Mx = "mquzal7";
const UU = 120, BU = 720;
function Aw(t) {
  const {
    audioUrl: a,
    durationMs: s,
    startMs: i,
    endMs: o,
    onChangeStart: u,
    onChangeEnd: f,
    isPlaying: m = !1,
    playbackPositionMs: y = 0,
    onSeek: p,
    width: b = BU,
    height: v = UU
  } = t, S = g.useRef(null), w = g.useRef(null), j = g.useRef(null), C = AU(a, b), _ = zU();
  g.useEffect(() => {
    IU(S.current, C.peaks, b, v);
  }, [C.peaks, b, v]);
  const T = g.useCallback(
    (M) => {
      const q = w.current?.getBoundingClientRect();
      if (!q || q.width <= 0) return 0;
      const D = Math.max(0, Math.min(1, (M - q.left) / q.width));
      return Math.round(D * s);
    },
    [s]
  );
  g.useEffect(() => {
    const M = (D) => {
      if (!j.current) return;
      const F = T(D.clientX);
      j.current === "start" ? u(cc(F, 0, o - 1)) : f(cc(F, i + 1, s));
    }, q = () => {
      j.current = null;
    };
    return window.addEventListener("pointermove", M), window.addEventListener("pointerup", q), () => {
      window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", q);
    };
  }, [T, s, o, i, u, f]);
  const O = (M) => (q) => {
    q.preventDefault(), q.stopPropagation(), j.current = M;
  }, R = (M) => {
    !p || M.target.closest("[data-handle]") || p(T(M.clientX));
  }, N = (M) => (q) => {
    const D = q.shiftKey ? 100 : q.ctrlKey ? 1 : 10;
    let F = 0;
    if (q.key === "ArrowLeft") F = -D;
    else if (q.key === "ArrowRight") F = D;
    else return;
    q.preventDefault(), M === "start" ? u(cc(i + F, 0, o - 1)) : f(cc(o + F, i + 1, s));
  }, B = Qf(i, s), G = Qf(o, s), te = Qf(y, s);
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: w,
      className: OU,
      style: { height: v },
      onPointerDown: R,
      children: [
        /* @__PURE__ */ c.jsx(
          "canvas",
          {
            ref: S,
            width: b,
            height: v,
            className: LU,
            "aria-label": "Audio waveform"
          }
        ),
        C.isLoading && /* @__PURE__ */ c.jsx("div", { className: Mx, children: "Decoding waveform…" }),
        C.error && /* @__PURE__ */ c.jsx("div", { className: Mx, role: "alert", children: C.error }),
        /* @__PURE__ */ c.jsx("div", { className: _x, style: { left: 0, width: `${B}%` } }),
        /* @__PURE__ */ c.jsx(
          "div",
          {
            className: _x,
            style: { left: `${G}%`, right: 0, width: `${100 - G}%` }
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: Cx,
            style: { left: `${B}%` },
            role: "slider",
            "aria-label": "Region start",
            "aria-valuemin": 0,
            "aria-valuemax": s,
            "aria-valuenow": i,
            tabIndex: 0,
            onPointerDown: O("start"),
            onKeyDown: N("start"),
            "data-handle": "start",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: Tx, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: Rx, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: Cx,
            style: { left: `${G}%` },
            role: "slider",
            "aria-label": "Region end",
            "aria-valuemin": 0,
            "aria-valuemax": s,
            "aria-valuenow": o,
            tabIndex: 0,
            onPointerDown: O("end"),
            onKeyDown: N("end"),
            "data-handle": "end",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: Tx, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: Rx, "aria-hidden": "true" })
            ]
          }
        ),
        m && /* @__PURE__ */ c.jsx(
          "div",
          {
            className: $U,
            style: {
              left: `${te}%`,
              transition: _ ? "none" : void 0
            },
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function Qf(t, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(100, t / a * 100));
}
function cc(t, a, s) {
  return Math.max(a, Math.min(s, t));
}
function IU(t, a, s, i) {
  if (!t) return;
  const o = t.getContext("2d");
  if (!o || (o.clearRect(0, 0, s, i), !a || a.length === 0)) return;
  const u = i / 2;
  o.fillStyle = VU(t, "--color-primary", "#ba9eff");
  const f = Math.min(a.length, s);
  for (let m = 0; m < f; m += 1) {
    const y = a[m] ?? 0, p = Math.max(1, y * (i - 4));
    o.fillRect(m, u - p / 2, 1, p);
  }
}
function VU(t, a, s) {
  return getComputedStyle(t).getPropertyValue(a).trim() || s;
}
var qU = "r8lfsm0", HU = "r8lfsm1", FU = "r8lfsm2", PU = "r8lfsm3", GU = "r8lfsm4", YU = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, KU = "_1b1zchy3", XU = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, QU = "_1b1zchy6", ZU = "_1b1zchy7";
const kw = g.createContext("standalone");
function Dw({
  variant: t = "standalone",
  children: a,
  className: s,
  style: i,
  ...o
}) {
  const u = [YU[t], s].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(kw.Provider, { value: t, children: /* @__PURE__ */ c.jsx("div", { className: u, style: i, ...o, children: a }) });
}
function zw({
  title: t,
  meta: a,
  children: s,
  className: i,
  titleId: o
}) {
  const u = g.useContext(kw), f = [KU, i].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsxs("div", { className: f, children: [
    /* @__PURE__ */ c.jsx("h3", { id: o, className: XU[u], children: t }),
    a ? /* @__PURE__ */ c.jsx("span", { className: QU, children: a }) : null,
    s
  ] });
}
function Ow({
  children: t,
  className: a,
  role: s = "group"
}) {
  const i = [ZU, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: i, role: s, children: t });
}
const Ax = -16, JU = 80, WU = 720;
function eB(t) {
  const { deploymentId: a, runId: s, utterance: i, audioUrl: o, onApplied: u, onError: f, onCancel: m } = t, y = i.durationMs ?? 0, [p, b] = g.useState(() => kx(y)), [v, S] = g.useState(Kc), [w, j] = g.useState(!1), [C, _] = g.useState(!1), [T, O] = g.useState(null), [R, N] = g.useState(!1), B = g.useRef(null), G = g.useRef(null), te = g.useRef(null);
  g.useEffect(() => {
    const $ = kx(y);
    b($), S(F1($)), _(!1), O(null), te.current = null;
  }, [i.utteranceId, y]);
  const M = g.useCallback(($) => {
    S($), b((se) => H1(se, $));
  }, []);
  g.useEffect(() => () => G.current?.abort(), []), g.useEffect(() => {
    B.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [i.utteranceId]);
  const q = g.useCallback(
    ($) => {
      $.key === "Escape" && ($.stopPropagation(), m());
    },
    [m]
  ), D = g.useMemo(
    () => p.ops.find(($) => $.mode === "trim"),
    [p.ops]
  ), F = D?.start_ms ?? 0, Z = D?.end_ms ?? Math.max(1, y), J = g.useCallback(($, se) => {
    b((fe) => tB(fe, "trim", (k) => ({
      ...k,
      mode: "trim",
      start_ms: Math.max(0, Math.floor($)),
      end_ms: Math.max(Math.floor($) + 1, Math.floor(se))
    })));
  }, []), P = g.useCallback(($) => J($, Z), [Z, J]), ie = g.useCallback(($) => J(F, $), [F, J]), A = g.useCallback(($) => {
    _($), b((se) => {
      const fe = se.ops.filter((k) => k.mode !== "normalize");
      if ($) {
        const k = {
          id: Dn(),
          mode: "normalize",
          target_lufs: Ax
        };
        return { ...se, ops: [...fe, k] };
      }
      return { ...se, ops: fe };
    });
  }, []), V = g.useCallback(async () => {
    const $ = A1(p, y);
    if ($) {
      O($.message);
      return;
    }
    if (O(null), R) return;
    G.current?.abort();
    const se = new AbortController();
    G.current = se, N(!0);
    try {
      const fe = te.current ?? void 0, k = await BR(
        a,
        s,
        i.utteranceId,
        fe ? { chain: p, digest_before: fe } : { chain: p },
        { signal: se.signal }
      );
      if (se.signal.aborted) return;
      te.current = k.chain_digest, u(k);
    } catch (fe) {
      if (se.signal.aborted) return;
      fe instanceof Js && (te.current = fe.currentDigest || null);
      const k = fe instanceof Js ? "Edit chain has changed in another tab. Reload to continue." : fe instanceof Error ? fe.message : "apply failed";
      O(k), f(k);
    } finally {
      se.signal.aborted || N(!1);
    }
  }, [p, y, R, a, s, i.utteranceId, u, f]);
  return /* @__PURE__ */ c.jsx(Dw, { variant: "nested", children: /* @__PURE__ */ c.jsxs("div", { ref: B, onKeyDown: q, children: [
    /* @__PURE__ */ c.jsx(zw, { title: "Edit segment", meta: `Source · ${uc(y)}` }),
    /* @__PURE__ */ c.jsx(
      Aw,
      {
        audioUrl: o,
        durationMs: Math.max(1, y),
        startMs: F,
        endMs: Z,
        onChangeStart: P,
        onChangeEnd: ie,
        height: JU,
        width: WU
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: qU, children: [
      /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ c.jsxs("span", { className: HU, children: [
        uc(F),
        " → ",
        uc(Z),
        " · ",
        uc(Z - F)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: FU, children: [
      /* @__PURE__ */ c.jsxs("label", { className: PU, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: C,
            onChange: ($) => A($.currentTarget.checked),
            "aria-label": "Toggle loudness normalization"
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { children: [
          "Normalize to ",
          Ax.toFixed(0),
          " LUFS (broadcast-friendly)"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: GU,
          onClick: () => j(($) => !$),
          "aria-expanded": w,
          children: [
            w ? "▾" : "▸",
            " Advanced effects · gain · eq · pitch · fade · silence trim"
          ]
        }
      )
    ] }),
    w && /* @__PURE__ */ c.jsx(
      nm,
      {
        state: v,
        onChange: M,
        supportsSynthSpeed: !1
      }
    ),
    /* @__PURE__ */ c.jsxs(Ow, { children: [
      /* @__PURE__ */ c.jsx(Ze, { size: "sm", onClick: () => void V(), disabled: R, children: R ? "Applying…" : "Apply" }),
      /* @__PURE__ */ c.jsx(Ze, { variant: "ghost", size: "sm", onClick: m, disabled: R, children: "Cancel" })
    ] }),
    T && /* @__PURE__ */ c.jsx(kn, { severity: "error", children: T })
  ] }) });
}
function kx(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Dn(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function tB(t, a, s) {
  const i = t.ops.findIndex((u) => u.mode === a);
  if (i === -1) {
    const u = { id: Dn(), mode: a };
    return { ...t, ops: [...t.ops, s(u)] };
  }
  const o = [...t.ops];
  return o[i] = s(o[i]), { ...t, ops: o };
}
function uc(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
var nB = "jq2zyb2", aB = "jq2zyb3", rB = "jq2zyb4", sB = "jq2zyb5", iB = "jq2zyb6", lB = "jq2zyb7", oB = "jq2zyb8", cB = "jq2zyb9", uB = "jq2zyba", dB = "jq2zybb", fB = "jq2zybc", hB = "jq2zybd", mB = "jq2zybe", pB = "jq2zybf jq2zybe", gB = "jq2zybg", vB = "jq2zybh", yB = "jq2zybi", bB = "jq2zybj", xB = "jq2zybk", SB = "jq2zybl", wB = "jq2zybm", jB = "jq2zybn", EB = "jq2zybo", NB = "jq2zybp", CB = "jq2zybq", TB = "jq2zybr", RB = "jq2zybs", _B = "jq2zybt", MB = "jq2zybu", AB = "jq2zybv", kB = "jq2zybw", DB = "jq2zybx", zB = "jq2zyby", Dx = "jq2zybz", OB = "jq2zyb10", LB = "jq2zyb11", $B = "jq2zyb12";
const UB = ["cancelled", "failed", "partial"], BB = 2600;
function IB() {
  const { run: t } = Rl(), a = ni(), [s, i] = g.useState(t), [o, u] = g.useState(!1), [f, m] = g.useState(null), [y, p] = g.useState(null), [b, v] = g.useState(
    null
  );
  g.useEffect(() => {
    i(t);
  }, [t]), g.useEffect(() => {
    if (!b) return;
    const N = setTimeout(() => v(null), BB);
    return () => clearTimeout(N);
  }, [b]);
  const S = g.useMemo(() => HB(s), [s]), w = UB.includes(s.status) && s.kind === "batch", j = (s.exportZipStaleAt ?? null) !== null, C = async () => {
    if (s.deploymentId) {
      u(!0), m(null);
      try {
        const { runId: N } = await _1(s.deploymentId, s.runId);
        a(`/${s.deploymentId}/runs/${N}`);
      } catch (N) {
        m(GB(N));
      } finally {
        u(!1);
      }
    }
  }, _ = g.useCallback((N) => {
    p((B) => B === N ? null : N);
  }, []), T = g.useCallback(() => {
    p(null);
  }, []), O = (N, B) => {
    i((G) => qB(G, N, B)), p(null), v({ message: "Segment edited", severity: "success" });
  }, R = g.useCallback((N) => {
    v({ message: N, severity: "error" });
  }, []);
  return /* @__PURE__ */ c.jsxs("main", { className: nB, children: [
    /* @__PURE__ */ c.jsxs("div", { className: aB, children: [
      /* @__PURE__ */ c.jsxs("header", { className: rB, children: [
        /* @__PURE__ */ c.jsxs("p", { className: sB, children: [
          s.deploymentId ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            /* @__PURE__ */ c.jsx(Qh, { to: `/${s.deploymentId}/recipe`, className: iB, children: "← Back to recipe" }),
            /* @__PURE__ */ c.jsx("span", { className: lB, children: "·" })
          ] }) : null,
          /* @__PURE__ */ c.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: oB, children: [
          /* @__PURE__ */ c.jsxs("h1", { className: cB, children: [
            FB(s.kind),
            /* @__PURE__ */ c.jsx("span", { className: uB, children: s.runId })
          ] }),
          /* @__PURE__ */ c.jsx(Er, { size: "md", tone: YB(s.status), pulse: s.status === "running", children: s.status })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("section", { className: dB, "aria-label": "Run statistics", children: [
        /* @__PURE__ */ c.jsx(dc, { label: "Format", value: s.outputFormat.toUpperCase(), mono: !0 }),
        /* @__PURE__ */ c.jsx(dc, { label: "Speed", value: `${s.speedFactor.toFixed(2)}×`, mono: !0 }),
        /* @__PURE__ */ c.jsx(
          dc,
          {
            label: "Completed",
            value: `${S.completed} / ${S.total}`,
            progress: S.total > 0 ? S.completed / S.total : 0
          }
        ),
        /* @__PURE__ */ c.jsx(
          dc,
          {
            label: "Cache hit",
            value: `${S.cacheRatio}%`,
            progress: S.cacheRatio / 100
          }
        )
      ] }),
      w && /* @__PURE__ */ c.jsxs("section", { className: vB, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ c.jsxs("div", { className: yB, children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-resume-title", className: bB, children: S.failed > 0 ? `${S.failed} line${S.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ c.jsx("p", { className: xB, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ c.jsx(Ze, { size: "lg", disabled: o, onClick: () => void C(), children: o ? "Resuming…" : S.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        f && /* @__PURE__ */ c.jsx("p", { className: SB, role: "alert", children: f })
      ] }),
      /* @__PURE__ */ c.jsxs(Ia, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ c.jsxs(PT, { children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-utterances", className: Jr, children: "01 / Utterances" }),
          S.completed > 0 && /* @__PURE__ */ c.jsxs("span", { className: wB, children: [
            /* @__PURE__ */ c.jsx("span", { className: jB, children: S.cached }),
            "/",
            S.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("ul", { className: EB, children: s.utterances.map((N) => {
          const B = y === N.utteranceId, G = N.status === "completed" && N.audioArtifactRef !== null && N.audioArtifactRef !== void 0, te = N.derivedArtifactRef ?? N.audioArtifactRef ?? null, M = te ? `/api/v1/artifacts/${encodeURIComponent(te)}/download` : "", q = (N.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ c.jsxs("li", { className: CB, children: [
            /* @__PURE__ */ c.jsxs("div", { className: NB, children: [
              /* @__PURE__ */ c.jsxs("span", { className: RB, children: [
                "#",
                N.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: _B, title: N.characterDisplay, children: N.characterDisplay }),
              /* @__PURE__ */ c.jsx("span", { className: MB, title: N.text, children: N.text }),
              /* @__PURE__ */ c.jsxs("span", { className: AB, children: [
                N.cacheHit && /* @__PURE__ */ c.jsx("span", { className: kB, children: "cached" }),
                q && /* @__PURE__ */ c.jsx("span", { className: TB, children: "edited" }),
                N.durationMs ? /* @__PURE__ */ c.jsx("span", { children: PB(N.durationMs) }) : null,
                /* @__PURE__ */ c.jsx(Er, { tone: KB(N.status), children: N.status }),
                G && /* @__PURE__ */ c.jsx(
                  Ze,
                  {
                    variant: "ghost",
                    size: "xs",
                    onClick: () => _(N.utteranceId),
                    "aria-expanded": B,
                    "aria-label": B ? "Close segment editor" : "Edit segment",
                    children: B ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            B && M && s.deploymentId && /* @__PURE__ */ c.jsx(
              eB,
              {
                deploymentId: s.deploymentId,
                runId: s.runId,
                utterance: N,
                audioUrl: M,
                onApplied: (D) => O(N.utteranceId, D),
                onError: R,
                onCancel: T
              }
            )
          ] }, N.utteranceId);
        }) })
      ] }),
      VB(s, j)
    ] }),
    b && /* @__PURE__ */ c.jsx(
      "div",
      {
        className: $B,
        role: b.severity === "error" ? "alert" : "status",
        "aria-live": b.severity === "error" ? "assertive" : "polite",
        children: b.message
      }
    )
  ] });
}
function VB(t, a) {
  if (!t.exportArtifactRef && !a) return null;
  const i = !!t.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ c.jsx("div", { className: DB, children: a ? /* @__PURE__ */ c.jsxs("div", { className: OB, children: [
    /* @__PURE__ */ c.jsx("p", { className: LB, children: i }),
    /* @__PURE__ */ c.jsxs(
      Ze,
      {
        variant: "secondary",
        size: "md",
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ c.jsx("span", { className: Dx, children: "↻" })
        ]
      }
    )
  ] }) : t.exportArtifactRef ? /* @__PURE__ */ c.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${t.exportArtifactRef}/download`,
      download: !0,
      className: zB,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ c.jsx("span", { className: Dx, children: "↓" })
      ]
    }
  ) : null });
}
function qB(t, a, s) {
  const i = t.utterances.map((o) => o.utteranceId !== a ? o : {
    ...o,
    derivedArtifactRef: s.derived_artifact_ref,
    durationMs: s.derived_duration_ms
  });
  return {
    ...t,
    utterances: i,
    exportZipStaleAt: t.exportZipStaleAt ?? Math.floor(Date.now() / 1e3)
  };
}
function dc({ label: t, value: a, mono: s, progress: i }) {
  const o = i !== void 0 ? Math.min(1, Math.max(0, i)) : void 0;
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      className: fB,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: hB, children: t }),
        /* @__PURE__ */ c.jsx("span", { className: s ? pB : mB, children: a }),
        o !== void 0 && /* @__PURE__ */ c.jsx("span", { className: gB, "aria-hidden": "true" })
      ]
    }
  );
}
function HB(t) {
  const a = t.utterances.length, s = t.utterances.filter((f) => f.status === "completed").length, i = t.utterances.filter(
    (f) => f.status === "failed" || f.status === "cancelled"
  ).length, o = t.utterances.filter((f) => f.cacheHit).length, u = s > 0 ? Math.round(o / s * 100) : 0;
  return { total: a, completed: s, failed: i, cached: o, cacheRatio: u };
}
function FB(t) {
  switch (t) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function PB(t) {
  return t < 1e3 ? `${t} ms` : `${(t / 1e3).toFixed(t < 1e4 ? 2 : 1)} s`;
}
function GB(t) {
  return t instanceof ai ? `${t.category}: ${t.message}` : t instanceof Error ? t.message : "Unexpected error";
}
function YB(t) {
  switch (t) {
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
function KB(t) {
  switch (t) {
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
var XB = "pcphqj2", QB = "pcphqj3", ZB = "pcphqj4", JB = "pcphqj5", WB = "pcphqj6", e9 = "pcphqj7", t9 = "pcphqj8", n9 = "pcphqj9", a9 = "pcphqja", zx = "pcphqjb", r9 = "pcphqjc", s9 = "pcphqjd", i9 = "pcphqje pcphqjd", l9 = "pcphqjf", o9 = "pcphqjg", c9 = "pcphqjh", u9 = "pcphqji", d9 = "pcphqjj pcphqji", f9 = "pcphqjk pcphqji", h9 = "pcphqjl pcphqji", m9 = "pcphqjm", Zf = "pcphqjn", Jf = "pcphqjo";
function p9() {
  const [t, a] = g.useState(null), [s, i] = g.useState(null);
  return g.useEffect(() => {
    let o = !1;
    const u = async () => {
      try {
        const m = await Mt("/runtime/queue");
        o || (a(m.entries), i(null));
      } catch (m) {
        o || i(m instanceof Error ? m.message : "Unknown error");
      }
    };
    u();
    const f = setInterval(() => void u(), 3e3);
    return () => {
      o = !0, clearInterval(f);
    };
  }, []), /* @__PURE__ */ c.jsx("main", { className: XB, children: /* @__PURE__ */ c.jsxs("div", { className: QB, children: [
    /* @__PURE__ */ c.jsxs("header", { className: ZB, children: [
      /* @__PURE__ */ c.jsx("p", { className: JB, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ c.jsxs("div", { className: WB, children: [
        /* @__PURE__ */ c.jsx("h1", { className: e9, children: "Queue" }),
        /* @__PURE__ */ c.jsx("span", { className: t9, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: n9, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    s ? /* @__PURE__ */ c.jsx(kn, { severity: "error", children: s }) : t === null ? null : t.length === 0 ? /* @__PURE__ */ c.jsx(Ia, { density: "compact", children: /* @__PURE__ */ c.jsx(Gc, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ c.jsxs(Ia, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ c.jsx("h2", { id: "runtime-queue-section", className: Jr, children: "01 / In flight" }),
      /* @__PURE__ */ c.jsx("ul", { className: a9, children: t.map((o) => {
        const u = o.position === 1;
        return /* @__PURE__ */ c.jsxs(
          "li",
          {
            className: u ? `${zx} ${r9}` : zx,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: u ? i9 : s9, children: o.position }),
              /* @__PURE__ */ c.jsxs("span", { className: l9, children: [
                /* @__PURE__ */ c.jsx("span", { className: o9, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ c.jsx("span", { className: c9, children: o.runId })
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: g9(o.kind), children: v9(o.kind) }),
              /* @__PURE__ */ c.jsx("span", { className: m9, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Zf, children: y9(o.etaSeconds) }),
                /* @__PURE__ */ c.jsx("span", { className: Jf, children: "eta" })
              ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Zf, children: o.utteranceTotal }),
                /* @__PURE__ */ c.jsx("span", { className: Jf, children: "lines" })
              ] }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Zf, children: "—" }),
                /* @__PURE__ */ c.jsx("span", { className: Jf, children: "pending" })
              ] }) })
            ]
          },
          o.runId
        );
      }) })
    ] })
  ] }) });
}
function g9(t) {
  switch (t) {
    case "batch":
      return d9;
    case "test_line":
      return f9;
    case "resume":
      return h9;
    default:
      return u9;
  }
}
function v9(t) {
  switch (t) {
    case "test_line":
      return "test line";
    default:
      return t;
  }
}
function y9(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60), s = t % 60;
  return s === 0 ? `${a}m` : `${a}m ${s}s`;
}
function b9() {
  const { deploymentId: t, prefillCharacterName: a } = Rl(), s = ni(), [i, o] = g.useState(a), [u, f] = g.useState(""), [m, y] = g.useState("none"), [p, b] = g.useState(!1), [v, S] = g.useState(null), w = g.useRef(null);
  g.useEffect(() => {
    w.current?.scrollIntoView({ behavior: "smooth", block: "center" }), w.current?.focus();
  }, []);
  const j = async (C) => {
    C.preventDefault(), b(!0), S(null);
    try {
      await Zh(t, {
        characterName: i,
        speakerVoiceAssetId: u,
        defaultEmotionMode: m
      }), s(`/${t}/recipe`);
    } catch (_) {
      S(_ instanceof Error ? _.message : "failed");
    } finally {
      b(!1);
    }
  };
  return /* @__PURE__ */ c.jsxs("main", { children: [
    /* @__PURE__ */ c.jsx("h1", { children: "New character mapping" }),
    /* @__PURE__ */ c.jsxs("form", { onSubmit: j, children: [
      /* @__PURE__ */ c.jsxs("label", { children: [
        "Character name",
        /* @__PURE__ */ c.jsx(
          "input",
          {
            ref: w,
            value: i,
            onChange: (C) => o(C.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("label", { children: [
        "Speaker voice asset id",
        /* @__PURE__ */ c.jsx(
          "input",
          {
            value: u,
            onChange: (C) => f(C.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("label", { children: [
        "Emotion mode",
        /* @__PURE__ */ c.jsxs("select", { value: m, onChange: (C) => y(C.currentTarget.value), children: [
          /* @__PURE__ */ c.jsx("option", { value: "none", children: "None" }),
          /* @__PURE__ */ c.jsx("option", { value: "audio_ref", children: "Audio ref" }),
          /* @__PURE__ */ c.jsx("option", { value: "vector_preset", children: "Vector preset" }),
          /* @__PURE__ */ c.jsx("option", { value: "qwen_template", children: "Qwen template" })
        ] })
      ] }),
      /* @__PURE__ */ c.jsx(Ze, { type: "submit", variant: "primary", disabled: p, children: "Save mapping" }),
      v && /* @__PURE__ */ c.jsx(kn, { severity: "error", children: v })
    ] })
  ] });
}
var x9 = "_1oor31e0", S9 = "_1oor31e1", w9 = "_1oor31e2", j9 = "_1oor31e3", E9 = "_1oor31e4", N9 = "_1oor31e5", C9 = "_1oor31e6", T9 = "_1oor31e7", R9 = "_1oor31e8";
const _9 = 8;
function M9(t) {
  const { entries: a, loading: s, error: i } = t;
  return /* @__PURE__ */ c.jsxs("div", { className: x9, "aria-busy": !!s, children: [
    i && /* @__PURE__ */ c.jsx(kn, { severity: "error", children: i }),
    s && !i && /* @__PURE__ */ c.jsx("div", { className: R9, "aria-live": "polite", children: "Loading edit history…" }),
    !s && !i && a.length === 0 && /* @__PURE__ */ c.jsx("div", { className: T9, children: "No edits yet" }),
    !s && !i && a.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: S9, children: a.map((o) => /* @__PURE__ */ c.jsxs("li", { className: w9, children: [
      /* @__PURE__ */ c.jsx("span", { className: j9, children: k9(o.recorded_at) }),
      /* @__PURE__ */ c.jsx("span", { className: E9, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ c.jsx("span", { className: N9, title: o.digest_after, children: A9(o.digest_after) }),
      /* @__PURE__ */ c.jsx("span", { className: C9, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function A9(t) {
  return t ? `${t.slice(0, _9)}…` : "—";
}
function k9(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var Ox = "_1c63kaw0", D9 = "_1c63kaw1", z9 = "_1c63kaw2", O9 = "_1c63kaw3", L9 = "_1c63kaw4", $9 = "_1c63kaw5", U9 = "_1c63kaw6";
function B9({ chain: t, onRemoveOp: a }) {
  return t.ops.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: Ox, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ c.jsx("span", { className: D9, children: "No edits yet" }) }) : /* @__PURE__ */ c.jsx("ol", { className: Ox, "data-testid": "edit-chain-list", children: t.ops.map((s, i) => /* @__PURE__ */ c.jsxs("li", { className: z9, children: [
    /* @__PURE__ */ c.jsxs("span", { className: O9, "aria-hidden": "true", children: [
      i + 1,
      "."
    ] }),
    /* @__PURE__ */ c.jsxs("span", { className: L9, children: [
      /* @__PURE__ */ c.jsx("span", { className: $9, children: Lx(s) }),
      /* @__PURE__ */ c.jsx("span", { className: U9, children: I9(s) })
    ] }),
    /* @__PURE__ */ c.jsx(
      Ze,
      {
        variant: "ghost",
        size: "xs",
        iconOnly: !0,
        onClick: () => a(s.id),
        "aria-label": `Remove ${Lx(s)} (position ${i + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, s.id)) });
}
function Lx(t) {
  switch (t.mode) {
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
function I9(t) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${$x(t.start_ms)} → ${$x(t.end_ms)}`;
    case "normalize":
      return `${t.target_lufs.toFixed(1)} LUFS`;
    case "speed":
      return `${t.factor.toFixed(2)}×`;
    case "fade_in":
      return `${t.duration_ms} ms in`;
    case "fade_out":
      return `${t.duration_ms} ms out`;
    case "gain":
      return `${t.gain_db >= 0 ? "+" : ""}${t.gain_db.toFixed(1)} dB`;
    case "eq3":
      return `${Wf(t.low_db)} / ${Wf(t.mid_db)} / ${Wf(t.high_db)}`;
    case "pitch_shift":
      return `${t.semitones >= 0 ? "+" : ""}${t.semitones.toFixed(1)} st`;
    case "silence_strip":
      return `${t.threshold_db.toFixed(0)} dB`;
    default:
      return "—";
  }
}
function Wf(t) {
  return `${t >= 0 ? "+" : ""}${t.toFixed(0)}`;
}
function $x(t) {
  return !Number.isFinite(t) || t < 0 ? "0.00s" : `${(t / 1e3).toFixed(2)}s`;
}
var fc = "_1o3ytop0", eh = "_1o3ytop1", Ux = "_1o3ytop2", V9 = "_1o3ytop3", q9 = "_1o3ytop4", H9 = "_1o3ytop5", F9 = "_1o3ytop6", P9 = "_1o3ytop7", hc = "_1o3ytop8", G9 = "_1o3ytop9", Y9 = "_1o3ytopf", K9 = "_1o3ytopg", X9 = "_1o3ytoph", Q9 = "_1o3ytopi", Z9 = "_1o3ytopj", J9 = "_1o3ytopk", W9 = "_1t0zy2f0", e7 = "_1t0zy2f1", t7 = "_1t0zy2f2";
function n7({ content: t, children: a, delayMs: s = 350 }) {
  const [i, o] = g.useState(!1), u = g.useId(), f = g.useRef(null), m = g.useCallback(() => {
    f.current != null && (window.clearTimeout(f.current), f.current = null);
  }, []), y = g.useCallback(() => {
    m(), f.current = window.setTimeout(() => o(!0), s);
  }, [m, s]), p = g.useCallback(() => {
    m(), o(!1);
  }, [m]);
  if (g.useEffect(() => () => m(), [m]), g.useEffect(() => {
    if (!i) return;
    const v = (S) => {
      S.key === "Escape" && o(!1);
    };
    return window.addEventListener("keydown", v), () => window.removeEventListener("keydown", v);
  }, [i]), !g.isValidElement(a))
    return /* @__PURE__ */ c.jsx(c.Fragment, { children: a });
  const b = {
    onMouseEnter: y,
    onMouseLeave: p,
    onFocus: y,
    onBlur: p,
    "aria-describedby": i ? u : void 0
  };
  return /* @__PURE__ */ c.jsxs("span", { className: W9, children: [
    g.cloneElement(a, b),
    i && /* @__PURE__ */ c.jsx("span", { role: "tooltip", id: u, className: t7, children: t })
  ] });
}
function mc({ label: t, content: a }) {
  return /* @__PURE__ */ c.jsx(n7, { content: a, children: /* @__PURE__ */ c.jsx("button", { type: "button", "aria-label": `What is ${t}?`, className: e7, children: "?" }) });
}
const Bx = -16;
function a7(t) {
  const {
    voiceAsset: a,
    deploymentId: s,
    affectedCharacterNames: i = [],
    onChainPersisted: o,
    onError: u
  } = t, f = a.durationMs ?? 0, m = g.useMemo(
    () => r7(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [y, p] = g.useState(() => th(f)), [b, v] = g.useState(Kc), [S, w] = g.useState(!1), [j, C] = g.useState(null), [_, T] = g.useState(null), [O, R] = g.useState(!1), [N, B] = g.useState(!1), [G, te] = g.useState(!1), [M, q] = g.useState(null), [D, F] = g.useState([]), [Z, J] = g.useState(null), [P, ie] = g.useState([]), [A, V] = g.useState(!1), [$, se] = g.useState(null), [fe, k] = g.useState(0), ne = g.useRef(null), ae = g.useRef(null), K = g.useRef(null), U = g.useRef(null), W = g.useRef(null), ue = g.useRef(0), be = g.useMemo(
    () => y.ops.some((je) => je.mode === "normalize"),
    [y.ops]
  );
  g.useEffect(() => {
    const je = th(f);
    p(je), v(F1(je)), C(null), te(!1), F([]), J(null), W.current = null;
  }, [a.voiceAssetId, f]);
  const Ae = g.useCallback((je) => {
    v(je), p((ke) => H1(ke, je));
  }, []);
  g.useEffect(() => {
    U.current?.abort();
    const je = new AbortController();
    return U.current = je, V(!0), se(null), bc(s, "voice_asset", a.voiceAssetId, 50, {
      signal: je.signal
    }).then((ke) => {
      je.signal.aborted || ie(ke.entries);
    }).catch((ke) => {
      if (je.signal.aborted) return;
      const Pe = ke instanceof Error ? ke.message : "audit fetch failed";
      se(Pe);
    }).finally(() => {
      je.signal.aborted || V(!1);
    }), () => je.abort();
  }, [s, a.voiceAssetId, fe]), g.useEffect(() => () => {
    _ && URL.revokeObjectURL(_);
  }, [_]), g.useEffect(() => () => {
    ae.current?.abort(), K.current?.abort(), U.current?.abort();
  }, []);
  const lt = y.ops.find((je) => je.mode === "trim"), Ne = y.ops.find((je) => je.mode === "normalize"), We = lt?.start_ms ?? 0, Be = lt?.end_ms ?? Math.max(1, f), Fe = g.useCallback((je, ke) => {
    p(
      (Pe) => Ix(
        Pe,
        "trim",
        (Xe) => ({
          ...Xe,
          mode: "trim",
          start_ms: Math.max(0, Math.floor(je)),
          end_ms: Math.max(Math.floor(je) + 1, Math.floor(ke))
        })
      )
    );
  }, []), rn = g.useCallback(
    (je) => Fe(je, Be),
    [Be, Fe]
  ), qt = g.useCallback(
    (je) => Fe(We, je),
    [We, Fe]
  ), At = g.useCallback((je) => {
    p((ke) => {
      const Pe = ke.ops.filter((Xe) => Xe.mode !== "normalize");
      if (je) {
        const Xe = {
          id: Dn(),
          mode: "normalize",
          target_lufs: Bx
        };
        return { ...ke, ops: [...Pe, Xe] };
      }
      return { ...ke, ops: Pe };
    });
  }, []), Te = g.useCallback(
    (je) => {
      const ke = y.ops.findIndex((yt) => yt.id === je);
      if (ke === -1) return;
      const Pe = y.ops[ke];
      if (!Pe) return;
      const Xe = [...y.ops.slice(0, ke), ...y.ops.slice(ke + 1)];
      p({ ...y, ops: Xe }), F((yt) => [...yt, { op: Pe, index: ke }]);
    },
    [y]
  ), He = g.useCallback(() => {
    const je = D[D.length - 1];
    if (!je) return;
    const ke = Math.min(je.index, y.ops.length), Pe = [...y.ops.slice(0, ke), je.op, ...y.ops.slice(ke)];
    p({ ...y, ops: Pe }), F(D.slice(0, -1));
  }, [y, D]), at = g.useCallback(() => {
    const je = A1(y, f);
    return je ? (C(je.message), !1) : (C(null), !0);
  }, [y, f]), St = g.useCallback(async () => {
    if (!at() || O) return;
    ae.current?.abort();
    const je = new AbortController();
    ae.current = je;
    const ke = ++ue.current;
    B(!0);
    try {
      const Pe = await VR(a.voiceAssetId, s, y, {
        signal: je.signal
      });
      if (je.signal.aborted || ke !== ue.current) return;
      _ && URL.revokeObjectURL(_);
      const Xe = URL.createObjectURL(Pe);
      T(Xe), te(!0), requestAnimationFrame(() => ne.current?.play().catch(() => {
      }));
    } catch (Pe) {
      if (je.signal.aborted) return;
      const Xe = Pe instanceof Error ? Pe.message : "preview failed";
      C(Xe), u(Xe);
    } finally {
      je.signal.aborted || B(!1);
    }
  }, [at, O, a.voiceAssetId, s, y, _, u]), ot = g.useCallback(async () => {
    if (!at() || N || O) return;
    if (i.length > 1) {
      const ke = i.join(", ");
      if (!window.confirm(
        `This voice asset is referenced by ${i.length} characters: ${ke}.

Applying this edit chain will affect every line they speak in the next batch.

Continue?`
      )) return;
    }
    ae.current?.abort(), K.current?.abort();
    const je = new AbortController();
    K.current = je, R(!0);
    try {
      const ke = W.current ?? void 0, Pe = await M1(
        a.voiceAssetId,
        s,
        ke ? { chain: y, digest_before: ke } : { chain: y },
        { signal: je.signal }
      );
      if (je.signal.aborted) return;
      W.current = Pe.chain_digest, J(Pe.chain_digest), C(null), q(Pe.measured_lufs ?? null), F([]), o(Pe), k((Xe) => Xe + 1);
    } catch (ke) {
      if (je.signal.aborted) return;
      const Pe = ke instanceof Js;
      ke instanceof Js && (W.current = ke.currentDigest || null);
      const Xe = Pe ? "Edit chain has changed in another tab. Reload to continue." : ke instanceof Error ? ke.message : "apply failed";
      C(Xe), u(Xe);
    } finally {
      je.signal.aborted || R(!1);
    }
  }, [
    at,
    N,
    O,
    i,
    a.voiceAssetId,
    s,
    y,
    o,
    u
  ]), Ke = g.useCallback(() => {
    ae.current?.abort(), p(th(f)), C(null), q(null), te(!1), F([]), k((je) => je + 1), _ && (URL.revokeObjectURL(_), T(null));
  }, [f, _]), gt = g.useCallback((je) => {
    p(
      (ke) => Ix(
        ke,
        "normalize",
        (Pe) => ({
          ...Pe,
          mode: "normalize",
          target_lufs: je
        })
      )
    );
  }, []);
  return /* @__PURE__ */ c.jsxs(Dw, { variant: "standalone", children: [
    /* @__PURE__ */ c.jsx(
      zw,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${pc(f)}`
      }
    ),
    /* @__PURE__ */ c.jsx(
      Aw,
      {
        audioUrl: m,
        durationMs: Math.max(1, f),
        startMs: We,
        endMs: Be,
        onChangeStart: rn,
        onChangeEnd: qt
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: fc, children: [
      /* @__PURE__ */ c.jsxs("span", { className: eh, children: [
        /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
        /* @__PURE__ */ c.jsx(
          mc,
          {
            label: "trim",
            content: "Cuts the start and end of the clip so only the middle plays. Non-destructive — drag the handles on the waveform to change it later, or remove the trim op entirely."
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: Ux, children: [
        pc(We),
        " → ",
        pc(Be),
        " · ",
        pc(Be - We)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: P9, children: [
      /* @__PURE__ */ c.jsxs("div", { className: hc, children: [
        /* @__PURE__ */ c.jsxs("span", { className: fc, children: [
          /* @__PURE__ */ c.jsxs("span", { className: eh, children: [
            /* @__PURE__ */ c.jsx("span", { children: "Normalize loudness" }),
            /* @__PURE__ */ c.jsx(
              mc,
              {
                label: "loudness normalization",
                content: "Rescales the whole clip so it lands on a target perceived loudness (LUFS — the broadcast / streaming standard). −16 LUFS is a comfortable spoken-word level; lower numbers are louder."
              }
            )
          ] }),
          be && Ne && /* @__PURE__ */ c.jsxs("span", { className: Y9, children: [
            "target ",
            Ne.target_lufs.toFixed(1),
            " LUFS",
            M !== null && ` · measured ${M.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: G9, children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "checkbox",
              checked: be,
              onChange: (je) => At(je.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { children: [
            "Target ",
            Bx.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        be && Ne && /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "range",
            className: X9,
            min: -30,
            max: -6,
            step: 0.5,
            value: Ne.target_lufs,
            onChange: (je) => gt(Number(je.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: hc, children: [
        /* @__PURE__ */ c.jsxs("span", { className: fc, children: [
          /* @__PURE__ */ c.jsxs("span", { className: eh, children: [
            /* @__PURE__ */ c.jsx("span", { children: "Operations" }),
            /* @__PURE__ */ c.jsx(
              mc,
              {
                label: "operations",
                content: "The ordered list of edits applied to this voice asset. They run top-to-bottom each time the clip is rendered. Click × on any row to remove it."
              }
            )
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: Ux, children: y.ops.length })
        ] }),
        /* @__PURE__ */ c.jsx(B9, { chain: y, onRemoveOp: Te })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: hc, children: [
        /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: V9,
            onClick: () => w((je) => !je),
            "aria-expanded": S,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: q9, "aria-hidden": "true", children: S ? "▾" : "▸" }),
              /* @__PURE__ */ c.jsx("span", { children: "Advanced effects" }),
              /* @__PURE__ */ c.jsx("span", { className: H9, children: "gain · EQ · pitch · fade · silence trim" }),
              /* @__PURE__ */ c.jsx(
                mc,
                {
                  label: "advanced effects",
                  content: /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    "Fine-tune the voice without re-recording.",
                    /* @__PURE__ */ c.jsx("br", {}),
                    /* @__PURE__ */ c.jsx("strong", { children: "Gain" }),
                    ": makes the whole clip louder/quieter.",
                    /* @__PURE__ */ c.jsx("br", {}),
                    /* @__PURE__ */ c.jsx("strong", { children: "EQ" }),
                    ": boosts low (bass), mid (vowels), or high (consonants) bands.",
                    /* @__PURE__ */ c.jsx("br", {}),
                    /* @__PURE__ */ c.jsx("strong", { children: "Pitch" }),
                    ": shifts the perceived voice up/down in semitones.",
                    /* @__PURE__ */ c.jsx("br", {}),
                    /* @__PURE__ */ c.jsx("strong", { children: "Fade" }),
                    ": smooth volume ramp at the start/end (no clicks).",
                    /* @__PURE__ */ c.jsx("br", {}),
                    /* @__PURE__ */ c.jsx("strong", { children: "Silence trim" }),
                    ": removes quiet gaps below a dB threshold."
                  ] })
                }
              )
            ]
          }
        ),
        S && /* @__PURE__ */ c.jsx(
          nm,
          {
            state: b,
            onChange: Ae,
            supportsSynthSpeed: !1
          }
        )
      ] }),
      Z && /* @__PURE__ */ c.jsx("div", { className: hc, children: /* @__PURE__ */ c.jsxs("span", { className: fc, children: [
        /* @__PURE__ */ c.jsx("span", { children: "Chain digest" }),
        /* @__PURE__ */ c.jsxs("span", { className: F9, title: Z, children: [
          Z.slice(0, 12),
          "…"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ c.jsxs(Ow, { children: [
      /* @__PURE__ */ c.jsx(
        Ze,
        {
          variant: "secondary",
          onClick: () => void St(),
          disabled: N || O,
          children: N ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Ze,
        {
          onClick: () => void ot(),
          disabled: O || N,
          children: O ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Ze,
        {
          variant: "ghost",
          onClick: Ke,
          disabled: O || N,
          children: "Reset"
        }
      ),
      D.length > 0 && /* @__PURE__ */ c.jsxs(
        Ze,
        {
          variant: "ghost",
          size: "sm",
          onClick: He,
          disabled: O || N,
          "data-testid": "undo-last-removal",
          "aria-label": "Undo last removal",
          children: [
            "Undo last removal (",
            D.length,
            ")"
          ]
        }
      ),
      G && /* @__PURE__ */ c.jsx(
        "span",
        {
          className: J9,
          "data-testid": "preview-consumed-hint",
          role: "note",
          "aria-live": "polite",
          children: "Preview again after edits to verify before applying"
        }
      )
    ] }),
    _ && // biome-ignore lint/a11y/useMediaCaption: synthesised speech preview, no captions track
    /* @__PURE__ */ c.jsx(
      "audio",
      {
        ref: ne,
        src: _,
        controls: !0,
        className: K9,
        "aria-label": "Edit preview"
      }
    ),
    j && /* @__PURE__ */ c.jsx(kn, { severity: "error", children: j }),
    /* @__PURE__ */ c.jsxs("details", { className: Q9, children: [
      /* @__PURE__ */ c.jsxs("summary", { className: Z9, children: [
        "Edit history",
        P.length > 0 ? ` · ${P.length}` : ""
      ] }),
      /* @__PURE__ */ c.jsx(
        M9,
        {
          entries: P,
          loading: A,
          error: $
        }
      )
    ] })
  ] });
}
function th(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Dn(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function Ix(t, a, s) {
  const i = t.ops.findIndex((u) => u.mode === a);
  if (i === -1) {
    const u = { id: Dn(), mode: a };
    return { ...t, ops: [...t.ops, s(u)] };
  }
  const o = [...t.ops];
  return o[i] = s(o[i]), { ...t, ops: o };
}
function pc(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
function r7(t) {
  return t.startsWith("http://") || t.startsWith("https://") || t.startsWith("/") ? t : `/api/v1/artifacts/${encodeURIComponent(t)}`;
}
var s7 = "go9vi12", i7 = "go9vi13", l7 = "go9vi14", o7 = "go9vi15", c7 = "go9vi16", u7 = "go9vi17", d7 = "go9vi18", f7 = "go9vi19", h7 = "go9vi1a", m7 = "go9vi1b go9vi1a", p7 = "go9vi1c", g7 = "go9vi1d", v7 = "go9vi1e", y7 = "go9vi1f", b7 = "go9vi1g", x7 = "go9vi1h", S7 = "go9vi1i", w7 = "go9vi1j", Vx = "go9vi1k", j7 = "go9vi1l", E7 = "go9vi1m", N7 = "go9vi1n", Ic = "go9vi1o", C7 = "go9vi1q", T7 = "go9vi1r go9vi1q", R7 = "go9vi1s go9vi1q", _7 = "go9vi1t", M7 = "go9vi1u", A7 = "go9vi1v", k7 = "go9vi1w", Lw = "go9vi1x", D7 = "go9vi1y", z7 = "go9vi1z", O7 = "go9vi110 go9vi1o", L7 = "go9vi111", $7 = "go9vi112", U7 = "go9vi113", B7 = "go9vi114", I7 = "go9vi115", V7 = "go9vi116";
function q7() {
  const { deployment: t, mappings: a, voiceAssets: s } = Rl(), i = ni(), [o, u] = g.useState(a), [f, m] = g.useState(s), [y, p] = g.useState(
    a[0]?.mappingId ?? null
  ), [b, v] = g.useState(""), [S, w] = g.useState(null), [j, C] = g.useState(null), [_, T] = g.useState(null), [O, R] = g.useState(null), [N, B] = g.useState(0), G = g.useCallback(() => {
    i(`/${t.deploymentId}/recipe`);
  }, [i, t.deploymentId]), te = g.useCallback((K) => {
    R(K), window.setTimeout(() => {
      R((U) => U === K ? null : U);
    }, 1600);
  }, []), M = g.useMemo(() => {
    const K = /* @__PURE__ */ new Map();
    for (const U of f) K.set(U.voiceAssetId, U);
    return K;
  }, [f]), q = g.useMemo(() => {
    const K = b.trim().toLowerCase();
    return K ? o.filter((U) => U.characterName.toLowerCase().includes(K)) : o;
  }, [o, b]), D = g.useMemo(
    () => o.find((K) => K.mappingId === y) ?? null,
    [o, y]
  );
  g.useEffect(() => {
    u(a), m(s), p(a[0]?.mappingId ?? null);
  }, [a, s]), g.useEffect(() => {
    if (!j) return;
    const K = setTimeout(() => C(null), 2600);
    return () => clearTimeout(K);
  }, [j]);
  const F = g.useCallback(async () => {
    const K = await Zs(t.deploymentId);
    m(K.voiceAssets);
  }, [t.deploymentId]), Z = g.useCallback(
    (K) => {
      u(
        (U) => U.map((W) => W.mappingId === y ? { ...W, ...K } : W)
      );
    },
    [y]
  ), J = g.useCallback(
    async (K) => {
      if (!D) return;
      const U = D;
      try {
        const W = await Ys(t.deploymentId, D.mappingId, K);
        u((ue) => ue.map((be) => be.mappingId === W.mappingId ? W : be)), Object.prototype.hasOwnProperty.call(K, "characterName") && te(W.mappingId);
      } catch (W) {
        u(
          (ue) => ue.map((be) => be.mappingId === U.mappingId ? U : be)
        ), w(vr(W));
      }
    },
    [D, t.deploymentId, te]
  ), P = g.useCallback(async () => {
    const K = f[0];
    if (!K) {
      w("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const U = X7(o), W = await Zh(t.deploymentId, {
        characterName: U,
        speakerVoiceAssetId: K.voiceAssetId
      });
      u((ue) => [...ue, W]), p(W.mappingId), B((ue) => ue + 1);
    } catch (U) {
      w(vr(U));
    }
  }, [t.deploymentId, f, o]), ie = g.useCallback(() => {
    D && T({ id: D.mappingId, name: D.characterName });
  }, [D]), A = g.useCallback(async () => {
    if (!_) return;
    const { id: K, name: U } = _;
    T(null);
    try {
      await T1(t.deploymentId, K), u((W) => W.filter((ue) => ue.mappingId !== K)), p(null), C(`Mapping for ${U} deactivated.`);
    } catch (W) {
      w(vr(W));
    }
  }, [t.deploymentId, _]), V = g.useCallback(
    async (K, U, W) => {
      try {
        const ue = await Tc(t.deploymentId, K, U, W);
        return m((be) => [ue, ...be]), C(`${ue.displayName} uploaded.`), ue;
      } catch (ue) {
        return w(vr(ue)), null;
      }
    },
    [t.deploymentId]
  ), $ = g.useCallback(async () => {
    try {
      const K = await ET(t.deploymentId);
      eI(K, `${t.deploymentId}-mappings.json`), C("Mappings exported to JSON.");
    } catch (K) {
      w(vr(K));
    }
  }, [t.deploymentId]), se = g.useCallback(
    async (K, U) => {
      try {
        const W = await NT(
          t.deploymentId,
          K.mappings,
          U
        );
        C(
          `Imported ${W.created.length} • skipped ${W.skipped.length} • replaced ${W.replaced.length}.`
        );
        const ue = await Zs(t.deploymentId);
        m(ue.voiceAssets);
      } catch (W) {
        w(vr(W));
      }
    },
    [t.deploymentId]
  ), fe = g.useCallback(
    async (K) => {
      if (await F(), D && K.chain_digest)
        try {
          const U = await Ys(t.deploymentId, D.mappingId, {
            voiceAssetChainDigest: K.chain_digest
          });
          u(
            (W) => W.map((ue) => ue.mappingId === U.mappingId ? U : ue)
          );
        } catch (U) {
          w(vr(U));
        }
      C("Edit applied.");
    },
    [F, D, t.deploymentId]
  ), k = g.useCallback((K) => {
    w(K);
  }, []), ne = g.useCallback(
    async (K, U) => {
      if (!D) return null;
      const W = K.trim() || `[${D.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await kT(t.deploymentId, {
          line: W,
          outputFormat: U
        })).runId };
      } catch (ue) {
        return w(vr(ue)), null;
      }
    },
    [t.deploymentId, D]
  ), ae = f.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ c.jsxs("div", { className: s7, children: [
    /* @__PURE__ */ c.jsxs("aside", { className: i7, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: l7,
          onClick: G,
          children: "← Back to recipe"
        }
      ),
      /* @__PURE__ */ c.jsxs("header", { className: o7, children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("h1", { id: "mapping-sidebar-heading", className: c7, children: "Cast" }),
          /* @__PURE__ */ c.jsxs("span", { className: u7, children: [
            o.length,
            " active · ",
            f.length,
            " ",
            ae
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(Ze, { variant: "primary", size: "sm", onClick: P, children: "+ Add" })
      ] }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "search",
          className: d7,
          placeholder: "Search characters",
          value: b,
          onChange: (K) => v(K.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ c.jsx(K7, { onExport: $, onImport: se, onParseError: w }),
      /* @__PURE__ */ c.jsx("div", { className: f7, children: q.length === 0 ? /* @__PURE__ */ c.jsx(
        Gc,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : q.map((K) => {
        const U = M.get(K.speakerVoiceAssetId), W = K.mappingId === y;
        return /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: W ? m7 : h7,
            onClick: () => p(K.mappingId),
            "aria-pressed": W,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: p7, "aria-hidden": "true", children: Q7(K.characterName) }),
              /* @__PURE__ */ c.jsxs("span", { className: g7, children: [
                /* @__PURE__ */ c.jsx("span", { className: v7, children: K.characterName }),
                /* @__PURE__ */ c.jsx("span", { className: y7, children: U?.displayName ?? "no voice" })
              ] })
            ]
          },
          K.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ c.jsxs("section", { className: b7, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ c.jsx(jm, { features: Tm, children: /* @__PURE__ */ c.jsx(ow, { children: j && /* @__PURE__ */ c.jsx(
        Cm.div,
        {
          className: D7,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: j
        },
        j
      ) }) }),
      S && /* @__PURE__ */ c.jsx(kn, { severity: "error", children: S }),
      _ && /* @__PURE__ */ c.jsxs(kn, { severity: "warning", children: [
        /* @__PURE__ */ c.jsxs("span", { style: { flex: 1 }, children: [
          "Deactivate mapping for ",
          _.name,
          "?"
        ] }),
        /* @__PURE__ */ c.jsx(Ze, { variant: "danger", size: "sm", onClick: () => void A(), children: "Delete" }),
        /* @__PURE__ */ c.jsx(Ze, { variant: "ghost", size: "sm", onClick: () => T(null), children: "Cancel" })
      ] }),
      D ? /* @__PURE__ */ c.jsx(
        F7,
        {
          deploymentId: t.deploymentId,
          mapping: D,
          voiceAssets: f,
          allMappings: o,
          onNameChange: (K) => {
            Z({ characterName: K });
          },
          onNameSave: (K) => {
            const U = K.trim();
            U && J({ characterName: U });
          },
          savedHint: O === D.mappingId,
          autoFocusNonce: N,
          onSpeakerChange: (K) => {
            Z({ speakerVoiceAssetId: K }), J({ speakerVoiceAssetId: K });
          },
          onDelete: ie,
          onUploadVoice: async (K, U, W) => {
            const ue = await V(K, U, W);
            return ue && W === "speaker" && (Z({ speakerVoiceAssetId: ue.voiceAssetId }), J({ speakerVoiceAssetId: ue.voiceAssetId })), await F(), ue;
          },
          onTestLine: ne,
          onEditChainPersisted: fe,
          onEditError: k
        },
        D.mappingId
      ) : /* @__PURE__ */ c.jsx(
        H7,
        {
          voiceCount: f.length,
          onUploadVoice: async (K) => {
            await V(K, K.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function H7({ voiceCount: t, onUploadVoice: a }) {
  return t === 0 ? /* @__PURE__ */ c.jsxs(Ia, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ c.jsxs("div", { className: U7, children: [
      /* @__PURE__ */ c.jsx("p", { className: Jr, children: "01 / Onboarding" }),
      /* @__PURE__ */ c.jsx("h2", { id: "onboarding-heading", className: B7, children: "Upload your first voice" }),
      /* @__PURE__ */ c.jsxs("p", { className: I7, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ c.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ c.jsx(
      $w,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (s) => (await a(s), null)
      }
    )
  ] }) : /* @__PURE__ */ c.jsx(Ia, { density: "airy", children: /* @__PURE__ */ c.jsx(
    Gc,
    {
      title: "No character selected.",
      hint: "Pick one on the left or + Add"
    }
  ) });
}
function F7(t) {
  const { mapping: a, voiceAssets: s, allMappings: i } = t, o = s.find((T) => T.voiceAssetId === a.speakerVoiceAssetId) ?? null, u = g.useMemo(
    () => i.filter(
      (T) => T.isActive && T.speakerVoiceAssetId === a.speakerVoiceAssetId
    ).map((T) => T.characterName),
    [i, a.speakerVoiceAssetId]
  ), [f, m] = g.useState(""), [y, p] = g.useState("mp3"), [b, v] = g.useState("idle"), [S, w] = g.useState(null), j = g.useRef(!1), C = g.useRef(null);
  g.useEffect(() => (j.current = !1, () => {
    j.current = !0;
  }), []), g.useEffect(() => {
    if (t.autoFocusNonce === 0) return;
    const T = C.current;
    T && (T.focus(), T.select());
  }, [t.autoFocusNonce]);
  const _ = g.useCallback(async () => {
    j.current = !1, v("running"), w(null);
    const T = await t.onTestLine(f, y);
    if (j.current) return;
    if (!T) {
      v("error"), w("Failed to enqueue test-line run.");
      return;
    }
    const { runId: O } = T;
    for (let R = 0; R < 60; R += 1) {
      if (await new Promise((N) => setTimeout(N, 500)), j.current) return;
      try {
        const N = await Jh(t.deploymentId, O);
        if (j.current) return;
        if (N.status === "completed") {
          v("done");
          return;
        }
        if (N.status === "failed" || N.status === "cancelled") {
          v("error"), w(`Run ${N.status}.`);
          return;
        }
      } catch (N) {
        if (j.current) return;
        v("error"), w(N instanceof Error ? N.message : "unknown error");
        return;
      }
    }
    j.current || (v("error"), w("test-line timed out after 30s"));
  }, [t.onTestLine, t.deploymentId, f, y]);
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsxs("header", { className: x7, children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("p", { className: Jr, children: "Character" }),
        /* @__PURE__ */ c.jsx("h2", { className: S7, children: a.characterName })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: Lw, children: /* @__PURE__ */ c.jsx(Ze, { variant: "danger", size: "sm", onClick: t.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ c.jsxs(
      Ia,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: z7,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "text",
              className: O7,
              placeholder: `[${a.characterName}] This is a test of the voice.`,
              value: f,
              onChange: (T) => m(T.currentTarget.value),
              "aria-label": "Test-line text",
              disabled: b === "running"
            }
          ),
          /* @__PURE__ */ c.jsxs(
            "select",
            {
              className: Ic,
              value: y,
              onChange: (T) => p(T.currentTarget.value),
              "aria-label": "Test-line output format",
              disabled: b === "running",
              children: [
                /* @__PURE__ */ c.jsx("option", { value: "mp3", children: "mp3" }),
                /* @__PURE__ */ c.jsx("option", { value: "wav", children: "wav" }),
                /* @__PURE__ */ c.jsx("option", { value: "flac", children: "flac" })
              ]
            }
          ),
          /* @__PURE__ */ c.jsx(
            Ze,
            {
              variant: "primary",
              size: "sm",
              onClick: () => void _(),
              disabled: b === "running",
              children: b === "running" ? "Synthesising…" : "Test this line"
            }
          ),
          b === "done" && /* @__PURE__ */ c.jsx(Er, { tone: "success", children: "Synthesised — see host logs for output path." }),
          b === "error" && S && /* @__PURE__ */ c.jsx(Er, { tone: "danger", children: S })
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: w7, children: [
      /* @__PURE__ */ c.jsxs(Ia, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ c.jsx("h3", { id: "identity-heading", className: Jr, children: "01 / Identity" }),
        /* @__PURE__ */ c.jsxs("label", { className: N7, children: [
          /* @__PURE__ */ c.jsxs("span", { className: j7, children: [
            /* @__PURE__ */ c.jsx("span", { className: Vx, children: "Character name" }),
            t.savedHint && /* @__PURE__ */ c.jsx(
              "span",
              {
                className: E7,
                role: "status",
                "aria-live": "polite",
                children: "✓ Saved"
              }
            )
          ] }),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              ref: C,
              className: Ic,
              value: a.characterName,
              onChange: (T) => t.onNameChange(T.currentTarget.value),
              onBlur: (T) => t.onNameSave(T.currentTarget.value),
              onKeyDown: (T) => {
                T.key === "Enter" && (T.preventDefault(), T.currentTarget.blur());
              },
              placeholder: "Type a name and press Enter"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(Ia, { density: "comfortable", "aria-labelledby": "voice-heading", children: [
        /* @__PURE__ */ c.jsx("h3", { id: "voice-heading", className: Jr, children: "02 / Voice Reference" }),
        /* @__PURE__ */ c.jsx("span", { className: Vx, children: "Speaker reference" }),
        /* @__PURE__ */ c.jsx(
          P7,
          {
            value: a.speakerVoiceAssetId,
            voices: s,
            onChange: t.onSpeakerChange
          }
        ),
        o && /* @__PURE__ */ c.jsx(G7, { voice: o }),
        /* @__PURE__ */ c.jsx(
          $w,
          {
            label: o ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (T) => t.onUploadVoice(T, T.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ c.jsx(
          a7,
          {
            voiceAsset: o,
            deploymentId: t.deploymentId,
            affectedCharacterNames: u,
            onChainPersisted: t.onEditChainPersisted,
            onError: t.onEditError
          }
        )
      ] })
    ] })
  ] });
}
function P7({
  value: t,
  voices: a,
  onChange: s
}) {
  return /* @__PURE__ */ c.jsxs(
    "select",
    {
      className: Ic,
      value: t,
      onChange: (i) => s(i.currentTarget.value),
      "aria-label": "Speaker reference voice",
      children: [
        a.length === 0 && /* @__PURE__ */ c.jsx("option", { value: "", children: "— upload a voice first —" }),
        a.map((i) => /* @__PURE__ */ c.jsx("option", { value: i.voiceAssetId, children: i.displayName }, i.voiceAssetId))
      ]
    }
  );
}
function G7({ voice: t }) {
  const a = Z7(t.durationMs ?? null);
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: _7, children: [
      /* @__PURE__ */ c.jsx("span", { children: t.displayName }),
      /* @__PURE__ */ c.jsx("span", { children: t.kind }),
      t.durationMs != null && /* @__PURE__ */ c.jsx("span", { children: J7(t.durationMs) }),
      t.sampleRate && /* @__PURE__ */ c.jsxs("span", { children: [
        t.sampleRate,
        " Hz"
      ] })
    ] }),
    t.durationMs != null && /* @__PURE__ */ c.jsxs("div", { className: M7, children: [
      /* @__PURE__ */ c.jsx("div", { className: A7, children: /* @__PURE__ */ c.jsx(jm, { features: Tm, children: /* @__PURE__ */ c.jsx(
        Cm.div,
        {
          className: k7,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, t.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ c.jsx(Er, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ c.jsx(Y7, { seed: t.contentSha256 })
  ] });
}
function Y7({ seed: t }) {
  const a = g.useMemo(() => W7(t, 48), [t]);
  return /* @__PURE__ */ c.jsx("div", { className: L7, "aria-hidden": "true", children: a.map((s, i) => /* @__PURE__ */ c.jsx(
    "span",
    {
      className: $7,
      style: { height: `${Math.max(6, s * 100)}%` }
    },
    `${t}-${i}`
  )) });
}
function $w({
  label: t,
  onFile: a
}) {
  const [s, i] = g.useState(!1), [o, u] = g.useState(!1), f = g.useRef(null), m = g.useCallback(
    async (y) => {
      u(!0);
      try {
        await a(y);
      } finally {
        u(!1);
      }
    },
    [a]
  );
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      className: o ? R7 : s ? T7 : C7,
      onDragOver: (y) => {
        y.preventDefault(), i(!0);
      },
      onDragLeave: () => i(!1),
      onDrop: (y) => {
        y.preventDefault(), i(!1);
        const p = y.dataTransfer.files?.[0];
        p && m(p);
      },
      onClick: () => f.current?.click(),
      role: "button",
      tabIndex: 0,
      onKeyDown: (y) => {
        (y.key === "Enter" || y.key === " ") && (y.preventDefault(), f.current?.click());
      },
      "aria-busy": o,
      children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            ref: f,
            type: "file",
            accept: "audio/*",
            onChange: (y) => {
              const p = y.currentTarget.files?.[0];
              p && m(p), y.currentTarget.value = "";
            }
          }
        ),
        o ? "Uploading…" : t
      ]
    }
  );
}
function K7({
  onExport: t,
  onImport: a,
  onParseError: s
}) {
  const [i, o] = g.useState("error"), u = g.useRef(null);
  return /* @__PURE__ */ c.jsxs("div", { className: Lw, children: [
    /* @__PURE__ */ c.jsx(Ze, { variant: "secondary", size: "sm", onClick: t, children: "Export JSON" }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        ref: u,
        type: "file",
        accept: "application/json,.json",
        className: V7,
        "aria-hidden": "true",
        tabIndex: -1,
        onChange: async (f) => {
          const m = f.currentTarget.files?.[0];
          if (f.currentTarget.value = "", !!m)
            try {
              const y = await m.text(), p = JSON.parse(y);
              a(p, i);
            } catch {
              s("Import failed: file is not a valid JSON mapping bundle.");
            }
        }
      }
    ),
    /* @__PURE__ */ c.jsx(Ze, { variant: "secondary", size: "sm", onClick: () => u.current?.click(), children: "Import JSON" }),
    /* @__PURE__ */ c.jsxs(
      "select",
      {
        className: Ic,
        value: i,
        onChange: (f) => o(f.currentTarget.value),
        "aria-label": "Import conflict strategy",
        children: [
          /* @__PURE__ */ c.jsx("option", { value: "error", children: "Error on conflict" }),
          /* @__PURE__ */ c.jsx("option", { value: "skip", children: "Skip existing" }),
          /* @__PURE__ */ c.jsx("option", { value: "replace", children: "Replace existing" })
        ]
      }
    )
  ] });
}
function X7(t) {
  const a = new Set(t.map((i) => i.characterName.toLowerCase()));
  let s = 1;
  for (; a.has(`character ${s}`); ) s += 1;
  return `Character ${s}`;
}
function Q7(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function Z7(t) {
  return t == null ? null : t < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : t > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : t > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function J7(t) {
  return t < 1e3 ? `${t} ms` : `${Math.round(t / 100) / 10}s`;
}
function W7(t, a) {
  const s = [];
  for (let i = 0; i < a; i += 1) {
    const o = t.charCodeAt(i % t.length);
    s.push((o * 31 + i * 7) % 100 / 100);
  }
  return s;
}
function eI(t, a) {
  const s = new Blob([JSON.stringify(t, null, 2)], { type: "application/json" }), i = URL.createObjectURL(s), o = document.createElement("a");
  o.href = i, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(i);
}
function vr(t) {
  return t instanceof ai || t instanceof Error ? t.message : "unknown error";
}
function tI() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: t } = await wT();
        return { deployments: t };
      },
      Component: cR
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: t }) => {
        const a = qs(t, "deploymentId");
        return _N(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: t }) => {
        const a = qs(t, "deploymentId"), [s, { mappings: i }, { runs: o }, u] = await Promise.all([
          Xy(a),
          Qy(a),
          _T(a, { limit: 10 }),
          LT(a)
        ]);
        return { deployment: s, mappings: i, runs: o, workflow: u };
      },
      Component: MU
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: t }) => {
        const a = qs(t, "deploymentId"), s = qs(t, "runId");
        return { run: await Jh(a, s) };
      },
      Component: IB
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: t }) => {
        const a = qs(t, "deploymentId"), [s, { mappings: i }, { voiceAssets: o }] = await Promise.all([
          Xy(a),
          Qy(a),
          Zs(a)
        ]);
        return { deployment: s, mappings: i, voiceAssets: o };
      },
      Component: q7
    },
    {
      path: "/:deploymentId/mappings/new",
      loader: ({ params: t, request: a }) => {
        const s = qs(t, "deploymentId"), i = new URL(a.url);
        return {
          deploymentId: s,
          prefillCharacterName: i.searchParams.get("character") ?? ""
        };
      },
      Component: b9
    },
    {
      path: "/runtime/queue",
      Component: p9
    }
  ];
}
function qs(t, a) {
  const s = t[a];
  if (!s)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return s;
}
const qx = "ext-actions-request", nI = "ext-actions-declare", aI = "ext-action-state", Hx = "ext-action-invoke", zh = "emotion-tts:navigate", Ps = "emotion-tts.run", Fx = "emotion-tts.mappings", rI = 4e3;
function sI(t, a) {
  let s = null, i = !1;
  const o = () => {
    const j = s?.badge ?? "not_installed";
    return iI(j, i);
  }, u = () => ({
    primary: o(),
    secondary: {
      id: Fx,
      label: "Mappings",
      icon: "tune",
      tone: "secondary",
      tooltip: "Manage character → voice mappings"
    }
  }), f = () => {
    t.dispatchEvent(
      new CustomEvent(nI, {
        detail: { actions: u() },
        bubbles: !1
      })
    );
  }, m = () => {
    t.dispatchEvent(
      new CustomEvent(aI, {
        detail: { action: o() },
        bubbles: !1
      })
    );
  }, y = () => f(), p = (j) => {
    const C = j.detail?.id;
    C === Ps ? b() : C === Fx && t.dispatchEvent(
      new CustomEvent(zh, {
        detail: { path: `/${a}/mappings` },
        bubbles: !1
      })
    );
  }, b = async () => {
    const j = s?.badge ?? "not_installed", C = j === "ready" || j === "running" || j === "starting";
    i = !0, m();
    try {
      C ? await o2() : await l2(c2(), B1());
      try {
        s = await yl();
      } catch {
      }
    } catch {
    } finally {
      i = !1, m();
    }
  };
  t.addEventListener(qx, y), t.addEventListener(Hx, p);
  let v = !1;
  const S = async () => {
    try {
      const j = await yl();
      if (v) return;
      s = j, m();
    } catch {
    }
  };
  S();
  const w = window.setInterval(() => void S(), rI);
  return f(), {
    dispose: () => {
      v = !0, window.clearInterval(w), t.removeEventListener(qx, y), t.removeEventListener(Hx, p);
    }
  };
}
function iI(t, a) {
  const s = t === "ready" || t === "running" || t === "starting", i = t === "stopped" || t === "not_installed" || t === "failed";
  return a ? {
    id: Ps,
    label: s ? "Stopping…" : "Starting…",
    icon: s ? "stop" : "play_arrow",
    tone: "primary",
    state: "loading"
  } : t === "starting" || t === "installing" || t === "stopping" ? {
    id: Ps,
    label: L1(t),
    icon: "hourglass_top",
    tone: "primary",
    state: "loading"
  } : s ? {
    id: Ps,
    label: "Stop runtime",
    icon: "stop",
    tone: "primary",
    state: "idle",
    tooltip: "Stop the EmotionTTS worker"
  } : i ? {
    id: Ps,
    label: t === "not_installed" ? "Install / Start runtime" : "Start runtime",
    icon: "play_arrow",
    tone: "primary",
    state: "idle",
    tooltip: "Start the EmotionTTS worker for this deployment"
  } : {
    id: Ps,
    label: "Start runtime",
    icon: "play_arrow",
    tone: "primary",
    state: "idle"
  };
}
const Oh = "emotion-tts-app", lI = "ext-event", Px = "emotion-tts-stylesheet", Gx = ["accent", "density", "card"];
function oI(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function cI() {
  if (typeof document > "u" || document.getElementById(Px)) return;
  const t = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = Px, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
cI();
class uI extends HTMLElement {
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
    this.root = eN.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(zh, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = sI(this, a), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (s) => {
      const i = s.detail?.path;
      i && this.router && this.router.navigate(i);
    };
    this.navigateListener = a, this.addEventListener(zh, a);
  }
  syncTweaksFromBody() {
    for (const a of Gx) {
      const s = oI(a);
      s === void 0 ? delete this.dataset[a] : this.dataset[a] !== s && (this.dataset[a] = s);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: Gx.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), s = LC(tI(), { initialEntries: [a] });
    this.router = s, this.root.render(
      /* @__PURE__ */ c.jsx(g.StrictMode, { children: /* @__PURE__ */ c.jsx(UC, { router: s }) })
    );
  }
  resolveInitialEntry() {
    const a = this.getAttribute("route");
    if (a && a.length > 0) return a;
    const s = this.getAttribute("deployment-id");
    return s && s.length > 0 ? `/${s}/recipe` : "/";
  }
  emitHostEvent(a, s) {
    this.dispatchEvent(
      new CustomEvent(lI, {
        detail: { topic: a, payload: s },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function dI() {
  typeof customElements > "u" || customElements.get(Oh) || customElements.define(Oh, uI);
}
typeof customElements < "u" && !customElements.get(Oh) && dI();
export {
  dI as register
};
//# sourceMappingURL=emotion-tts.js.map
