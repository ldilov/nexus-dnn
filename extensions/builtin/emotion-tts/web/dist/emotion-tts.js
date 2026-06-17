function VE(t, a) {
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
function Hx(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var lf = { exports: {} }, Xi = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cy;
function qE() {
  if (cy) return Xi;
  cy = 1;
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
  return Xi.Fragment = a, Xi.jsx = s, Xi.jsxs = s, Xi;
}
var uy;
function HE() {
  return uy || (uy = 1, lf.exports = qE()), lf.exports;
}
var c = HE(), of = { exports: {} }, Ke = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dy;
function FE() {
  if (dy) return Ke;
  dy = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), f = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), w = Symbol.iterator;
  function S(k) {
    return k === null || typeof k != "object" ? null : (k = w && k[w] || k["@@iterator"], typeof k == "function" ? k : null);
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
  }, N = Object.assign, R = {};
  function T(k, ee, te) {
    this.props = k, this.context = ee, this.refs = R, this.updater = te || j;
  }
  T.prototype.isReactComponent = {}, T.prototype.setState = function(k, ee) {
    if (typeof k != "object" && typeof k != "function" && k != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, k, ee, "setState");
  }, T.prototype.forceUpdate = function(k) {
    this.updater.enqueueForceUpdate(this, k, "forceUpdate");
  };
  function L() {
  }
  L.prototype = T.prototype;
  function _(k, ee, te) {
    this.props = k, this.context = ee, this.refs = R, this.updater = te || j;
  }
  var C = _.prototype = new L();
  C.constructor = _, N(C, T.prototype), C.isPureReactComponent = !0;
  var I = Array.isArray;
  function Y() {
  }
  var ie = { H: null, A: null, T: null, S: null }, M = Object.prototype.hasOwnProperty;
  function V(k, ee, te) {
    var K = te.ref;
    return {
      $$typeof: t,
      type: k,
      key: ee,
      ref: K !== void 0 ? K : null,
      props: te
    };
  }
  function D(k, ee) {
    return V(k.type, ee, k.props);
  }
  function P(k) {
    return typeof k == "object" && k !== null && k.$$typeof === t;
  }
  function J(k) {
    var ee = { "=": "=0", ":": "=2" };
    return "$" + k.replace(/[=:]/g, function(te) {
      return ee[te];
    });
  }
  var Z = /\/+/g;
  function G(k, ee) {
    return typeof k == "object" && k !== null && k.key != null ? J("" + k.key) : ee.toString(36);
  }
  function re(k) {
    switch (k.status) {
      case "fulfilled":
        return k.value;
      case "rejected":
        throw k.reason;
      default:
        switch (typeof k.status == "string" ? k.then(Y, Y) : (k.status = "pending", k.then(
          function(ee) {
            k.status === "pending" && (k.status = "fulfilled", k.value = ee);
          },
          function(ee) {
            k.status === "pending" && (k.status = "rejected", k.reason = ee);
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
  function A(k, ee, te, K, B) {
    var W = typeof k;
    (W === "undefined" || W === "boolean") && (k = null);
    var ce = !1;
    if (k === null) ce = !0;
    else
      switch (W) {
        case "bigint":
        case "string":
        case "number":
          ce = !0;
          break;
        case "object":
          switch (k.$$typeof) {
            case t:
            case a:
              ce = !0;
              break;
            case b:
              return ce = k._init, A(
                ce(k._payload),
                ee,
                te,
                K,
                B
              );
          }
      }
    if (ce)
      return B = B(k), ce = K === "" ? "." + G(k, 0) : K, I(B) ? (te = "", ce != null && (te = ce.replace(Z, "$&/") + "/"), A(B, ee, te, "", function(lt) {
        return lt;
      })) : B != null && (P(B) && (B = D(
        B,
        te + (B.key == null || k && k.key === B.key ? "" : ("" + B.key).replace(
          Z,
          "$&/"
        ) + "/") + ce
      )), ee.push(B)), 1;
    ce = 0;
    var ye = K === "" ? "." : K + ":";
    if (I(k))
      for (var Me = 0; Me < k.length; Me++)
        K = k[Me], W = ye + G(K, Me), ce += A(
          K,
          ee,
          te,
          W,
          B
        );
    else if (Me = S(k), typeof Me == "function")
      for (k = Me.call(k), Me = 0; !(K = k.next()).done; )
        K = K.value, W = ye + G(K, Me++), ce += A(
          K,
          ee,
          te,
          W,
          B
        );
    else if (W === "object") {
      if (typeof k.then == "function")
        return A(
          re(k),
          ee,
          te,
          K,
          B
        );
      throw ee = String(k), Error(
        "Objects are not valid as a React child (found: " + (ee === "[object Object]" ? "object with keys {" + Object.keys(k).join(", ") + "}" : ee) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ce;
  }
  function F(k, ee, te) {
    if (k == null) return k;
    var K = [], B = 0;
    return A(k, K, "", "", function(W) {
      return ee.call(te, W, B++);
    }), K;
  }
  function U(k) {
    if (k._status === -1) {
      var ee = k._result;
      ee = ee(), ee.then(
        function(te) {
          (k._status === 0 || k._status === -1) && (k._status = 1, k._result = te);
        },
        function(te) {
          (k._status === 0 || k._status === -1) && (k._status = 2, k._result = te);
        }
      ), k._status === -1 && (k._status = 0, k._result = ee);
    }
    if (k._status === 1) return k._result.default;
    throw k._result;
  }
  var se = typeof reportError == "function" ? reportError : function(k) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var ee = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof k == "object" && k !== null && typeof k.message == "string" ? String(k.message) : String(k),
        error: k
      });
      if (!window.dispatchEvent(ee)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", k);
      return;
    }
    console.error(k);
  }, de = {
    map: F,
    forEach: function(k, ee, te) {
      F(
        k,
        function() {
          ee.apply(this, arguments);
        },
        te
      );
    },
    count: function(k) {
      var ee = 0;
      return F(k, function() {
        ee++;
      }), ee;
    },
    toArray: function(k) {
      return F(k, function(ee) {
        return ee;
      }) || [];
    },
    only: function(k) {
      if (!P(k))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return k;
    }
  };
  return Ke.Activity = v, Ke.Children = de, Ke.Component = T, Ke.Fragment = s, Ke.Profiler = o, Ke.PureComponent = _, Ke.StrictMode = i, Ke.Suspense = y, Ke.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ie, Ke.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(k) {
      return ie.H.useMemoCache(k);
    }
  }, Ke.cache = function(k) {
    return function() {
      return k.apply(null, arguments);
    };
  }, Ke.cacheSignal = function() {
    return null;
  }, Ke.cloneElement = function(k, ee, te) {
    if (k == null)
      throw Error(
        "The argument must be a React element, but you passed " + k + "."
      );
    var K = N({}, k.props), B = k.key;
    if (ee != null)
      for (W in ee.key !== void 0 && (B = "" + ee.key), ee)
        !M.call(ee, W) || W === "key" || W === "__self" || W === "__source" || W === "ref" && ee.ref === void 0 || (K[W] = ee[W]);
    var W = arguments.length - 2;
    if (W === 1) K.children = te;
    else if (1 < W) {
      for (var ce = Array(W), ye = 0; ye < W; ye++)
        ce[ye] = arguments[ye + 2];
      K.children = ce;
    }
    return V(k.type, B, K);
  }, Ke.createContext = function(k) {
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
  }, Ke.createElement = function(k, ee, te) {
    var K, B = {}, W = null;
    if (ee != null)
      for (K in ee.key !== void 0 && (W = "" + ee.key), ee)
        M.call(ee, K) && K !== "key" && K !== "__self" && K !== "__source" && (B[K] = ee[K]);
    var ce = arguments.length - 2;
    if (ce === 1) B.children = te;
    else if (1 < ce) {
      for (var ye = Array(ce), Me = 0; Me < ce; Me++)
        ye[Me] = arguments[Me + 2];
      B.children = ye;
    }
    if (k && k.defaultProps)
      for (K in ce = k.defaultProps, ce)
        B[K] === void 0 && (B[K] = ce[K]);
    return V(k, W, B);
  }, Ke.createRef = function() {
    return { current: null };
  }, Ke.forwardRef = function(k) {
    return { $$typeof: m, render: k };
  }, Ke.isValidElement = P, Ke.lazy = function(k) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: k },
      _init: U
    };
  }, Ke.memo = function(k, ee) {
    return {
      $$typeof: p,
      type: k,
      compare: ee === void 0 ? null : ee
    };
  }, Ke.startTransition = function(k) {
    var ee = ie.T, te = {};
    ie.T = te;
    try {
      var K = k(), B = ie.S;
      B !== null && B(te, K), typeof K == "object" && K !== null && typeof K.then == "function" && K.then(Y, se);
    } catch (W) {
      se(W);
    } finally {
      ee !== null && te.types !== null && (ee.types = te.types), ie.T = ee;
    }
  }, Ke.unstable_useCacheRefresh = function() {
    return ie.H.useCacheRefresh();
  }, Ke.use = function(k) {
    return ie.H.use(k);
  }, Ke.useActionState = function(k, ee, te) {
    return ie.H.useActionState(k, ee, te);
  }, Ke.useCallback = function(k, ee) {
    return ie.H.useCallback(k, ee);
  }, Ke.useContext = function(k) {
    return ie.H.useContext(k);
  }, Ke.useDebugValue = function() {
  }, Ke.useDeferredValue = function(k, ee) {
    return ie.H.useDeferredValue(k, ee);
  }, Ke.useEffect = function(k, ee) {
    return ie.H.useEffect(k, ee);
  }, Ke.useEffectEvent = function(k) {
    return ie.H.useEffectEvent(k);
  }, Ke.useId = function() {
    return ie.H.useId();
  }, Ke.useImperativeHandle = function(k, ee, te) {
    return ie.H.useImperativeHandle(k, ee, te);
  }, Ke.useInsertionEffect = function(k, ee) {
    return ie.H.useInsertionEffect(k, ee);
  }, Ke.useLayoutEffect = function(k, ee) {
    return ie.H.useLayoutEffect(k, ee);
  }, Ke.useMemo = function(k, ee) {
    return ie.H.useMemo(k, ee);
  }, Ke.useOptimistic = function(k, ee) {
    return ie.H.useOptimistic(k, ee);
  }, Ke.useReducer = function(k, ee, te) {
    return ie.H.useReducer(k, ee, te);
  }, Ke.useRef = function(k) {
    return ie.H.useRef(k);
  }, Ke.useState = function(k) {
    return ie.H.useState(k);
  }, Ke.useSyncExternalStore = function(k, ee, te) {
    return ie.H.useSyncExternalStore(
      k,
      ee,
      te
    );
  }, Ke.useTransition = function() {
    return ie.H.useTransition();
  }, Ke.version = "19.2.5", Ke;
}
var fy;
function zh() {
  return fy || (fy = 1, of.exports = FE()), of.exports;
}
var g = zh();
const Se = /* @__PURE__ */ Hx(g), PE = /* @__PURE__ */ VE({
  __proto__: null,
  default: Se
}, [g]);
var cf = { exports: {} }, Qi = {}, uf = { exports: {} }, df = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hy;
function GE() {
  return hy || (hy = 1, (function(t) {
    function a(A, F) {
      var U = A.length;
      A.push(F);
      e: for (; 0 < U; ) {
        var se = U - 1 >>> 1, de = A[se];
        if (0 < o(de, F))
          A[se] = F, A[U] = de, U = se;
        else break e;
      }
    }
    function s(A) {
      return A.length === 0 ? null : A[0];
    }
    function i(A) {
      if (A.length === 0) return null;
      var F = A[0], U = A.pop();
      if (U !== F) {
        A[0] = U;
        e: for (var se = 0, de = A.length, k = de >>> 1; se < k; ) {
          var ee = 2 * (se + 1) - 1, te = A[ee], K = ee + 1, B = A[K];
          if (0 > o(te, U))
            K < de && 0 > o(B, te) ? (A[se] = B, A[K] = U, se = K) : (A[se] = te, A[ee] = U, se = ee);
          else if (K < de && 0 > o(B, U))
            A[se] = B, A[K] = U, se = K;
          else break e;
        }
      }
      return F;
    }
    function o(A, F) {
      var U = A.sortIndex - F.sortIndex;
      return U !== 0 ? U : A.id - F.id;
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
    var y = [], p = [], b = 1, v = null, w = 3, S = !1, j = !1, N = !1, R = !1, T = typeof setTimeout == "function" ? setTimeout : null, L = typeof clearTimeout == "function" ? clearTimeout : null, _ = typeof setImmediate < "u" ? setImmediate : null;
    function C(A) {
      for (var F = s(p); F !== null; ) {
        if (F.callback === null) i(p);
        else if (F.startTime <= A)
          i(p), F.sortIndex = F.expirationTime, a(y, F);
        else break;
        F = s(p);
      }
    }
    function I(A) {
      if (N = !1, C(A), !j)
        if (s(y) !== null)
          j = !0, Y || (Y = !0, J());
        else {
          var F = s(p);
          F !== null && re(I, F.startTime - A);
        }
    }
    var Y = !1, ie = -1, M = 5, V = -1;
    function D() {
      return R ? !0 : !(t.unstable_now() - V < M);
    }
    function P() {
      if (R = !1, Y) {
        var A = t.unstable_now();
        V = A;
        var F = !0;
        try {
          e: {
            j = !1, N && (N = !1, L(ie), ie = -1), S = !0;
            var U = w;
            try {
              t: {
                for (C(A), v = s(y); v !== null && !(v.expirationTime > A && D()); ) {
                  var se = v.callback;
                  if (typeof se == "function") {
                    v.callback = null, w = v.priorityLevel;
                    var de = se(
                      v.expirationTime <= A
                    );
                    if (A = t.unstable_now(), typeof de == "function") {
                      v.callback = de, C(A), F = !0;
                      break t;
                    }
                    v === s(y) && i(y), C(A);
                  } else i(y);
                  v = s(y);
                }
                if (v !== null) F = !0;
                else {
                  var k = s(p);
                  k !== null && re(
                    I,
                    k.startTime - A
                  ), F = !1;
                }
              }
              break e;
            } finally {
              v = null, w = U, S = !1;
            }
            F = void 0;
          }
        } finally {
          F ? J() : Y = !1;
        }
      }
    }
    var J;
    if (typeof _ == "function")
      J = function() {
        _(P);
      };
    else if (typeof MessageChannel < "u") {
      var Z = new MessageChannel(), G = Z.port2;
      Z.port1.onmessage = P, J = function() {
        G.postMessage(null);
      };
    } else
      J = function() {
        T(P, 0);
      };
    function re(A, F) {
      ie = T(function() {
        A(t.unstable_now());
      }, F);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(A) {
      A.callback = null;
    }, t.unstable_forceFrameRate = function(A) {
      0 > A || 125 < A ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : M = 0 < A ? Math.floor(1e3 / A) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return w;
    }, t.unstable_next = function(A) {
      switch (w) {
        case 1:
        case 2:
        case 3:
          var F = 3;
          break;
        default:
          F = w;
      }
      var U = w;
      w = F;
      try {
        return A();
      } finally {
        w = U;
      }
    }, t.unstable_requestPaint = function() {
      R = !0;
    }, t.unstable_runWithPriority = function(A, F) {
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
      var U = w;
      w = A;
      try {
        return F();
      } finally {
        w = U;
      }
    }, t.unstable_scheduleCallback = function(A, F, U) {
      var se = t.unstable_now();
      switch (typeof U == "object" && U !== null ? (U = U.delay, U = typeof U == "number" && 0 < U ? se + U : se) : U = se, A) {
        case 1:
          var de = -1;
          break;
        case 2:
          de = 250;
          break;
        case 5:
          de = 1073741823;
          break;
        case 4:
          de = 1e4;
          break;
        default:
          de = 5e3;
      }
      return de = U + de, A = {
        id: b++,
        callback: F,
        priorityLevel: A,
        startTime: U,
        expirationTime: de,
        sortIndex: -1
      }, U > se ? (A.sortIndex = U, a(p, A), s(y) === null && A === s(p) && (N ? (L(ie), ie = -1) : N = !0, re(I, U - se))) : (A.sortIndex = de, a(y, A), j || S || (j = !0, Y || (Y = !0, J()))), A;
    }, t.unstable_shouldYield = D, t.unstable_wrapCallback = function(A) {
      var F = w;
      return function() {
        var U = w;
        w = F;
        try {
          return A.apply(this, arguments);
        } finally {
          w = U;
        }
      };
    };
  })(df)), df;
}
var my;
function YE() {
  return my || (my = 1, uf.exports = GE()), uf.exports;
}
var ff = { exports: {} }, vn = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var py;
function KE() {
  if (py) return vn;
  py = 1;
  var t = zh();
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
      var b = p.as, v = m(b, p.crossOrigin), w = typeof p.integrity == "string" ? p.integrity : void 0, S = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      b === "style" ? i.d.S(
        y,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: v,
          integrity: w,
          fetchPriority: S
        }
      ) : b === "script" && i.d.X(y, {
        crossOrigin: v,
        integrity: w,
        fetchPriority: S,
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
var gy;
function Fx() {
  if (gy) return ff.exports;
  gy = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), ff.exports = KE(), ff.exports;
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
var vy;
function XE() {
  if (vy) return Qi;
  vy = 1;
  var t = YE(), a = zh(), s = Fx();
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
  var v = Object.assign, w = Symbol.for("react.element"), S = Symbol.for("react.transitional.element"), j = Symbol.for("react.portal"), N = Symbol.for("react.fragment"), R = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), L = Symbol.for("react.consumer"), _ = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), I = Symbol.for("react.suspense"), Y = Symbol.for("react.suspense_list"), ie = Symbol.for("react.memo"), M = Symbol.for("react.lazy"), V = Symbol.for("react.activity"), D = Symbol.for("react.memo_cache_sentinel"), P = Symbol.iterator;
  function J(e) {
    return e === null || typeof e != "object" ? null : (e = P && e[P] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Z = Symbol.for("react.client.reference");
  function G(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Z ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case N:
        return "Fragment";
      case T:
        return "Profiler";
      case R:
        return "StrictMode";
      case I:
        return "Suspense";
      case Y:
        return "SuspenseList";
      case V:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case j:
          return "Portal";
        case _:
          return e.displayName || "Context";
        case L:
          return (e._context.displayName || "Context") + ".Consumer";
        case C:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ie:
          return n = e.displayName || null, n !== null ? n : G(e.type) || "Memo";
        case M:
          n = e._payload, e = e._init;
          try {
            return G(e(n));
          } catch {
          }
      }
    return null;
  }
  var re = Array.isArray, A = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, U = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, se = [], de = -1;
  function k(e) {
    return { current: e };
  }
  function ee(e) {
    0 > de || (e.current = se[de], se[de] = null, de--);
  }
  function te(e, n) {
    de++, se[de] = e.current, e.current = n;
  }
  var K = k(null), B = k(null), W = k(null), ce = k(null);
  function ye(e, n) {
    switch (te(W, n), te(B, e), te(K, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? kv(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = kv(n), e = Dv(n, e);
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
    ee(K), te(K, e);
  }
  function Me() {
    ee(K), ee(B), ee(W);
  }
  function lt(e) {
    e.memoizedState !== null && te(ce, e);
    var n = K.current, r = Dv(n, e.type);
    n !== r && (te(B, e), te(K, r));
  }
  function Ce(e) {
    B.current === e && (ee(K), ee(B)), ce.current === e && (ee(ce), Pi._currentValue = U);
  }
  var Fe, qe;
  function Pe(e) {
    if (Fe === void 0)
      try {
        throw Error();
      } catch (r) {
        var n = r.stack.trim().match(/\n( *(at )?)/);
        Fe = n && n[1] || "", qe = -1 < r.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < r.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Fe + e + qe;
  }
  var It = !1;
  function Vt(e, n) {
    if (!e || It) return "";
    It = !0;
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
        var $ = x.split(`
`), ae = E.split(`
`);
        for (d = l = 0; l < $.length && !$[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; d < ae.length && !ae[d].includes(
          "DetermineComponentFrameRoot"
        ); )
          d++;
        if (l === $.length || d === ae.length)
          for (l = $.length - 1, d = ae.length - 1; 1 <= l && 0 <= d && $[l] !== ae[d]; )
            d--;
        for (; 1 <= l && 0 <= d; l--, d--)
          if ($[l] !== ae[d]) {
            if (l !== 1 || d !== 1)
              do
                if (l--, d--, 0 > d || $[l] !== ae[d]) {
                  var ue = `
` + $[l].replace(" at new ", " at ");
                  return e.displayName && ue.includes("<anonymous>") && (ue = ue.replace("<anonymous>", e.displayName)), ue;
                }
              while (1 <= l && 0 <= d);
            break;
          }
      }
    } finally {
      It = !1, Error.prepareStackTrace = r;
    }
    return (r = e ? e.displayName || e.name : "") ? Pe(r) : "";
  }
  function _t(e, n) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Pe(e.type);
      case 16:
        return Pe("Lazy");
      case 13:
        return e.child !== n && n !== null ? Pe("Suspense Fallback") : Pe("Suspense");
      case 19:
        return Pe("SuspenseList");
      case 0:
      case 15:
        return Vt(e.type, !1);
      case 11:
        return Vt(e.type.render, !1);
      case 1:
        return Vt(e.type, !0);
      case 31:
        return Pe("Activity");
      default:
        return "";
    }
  }
  function Re(e) {
    try {
      var n = "", r = null;
      do
        n += _t(e, r), r = e, e = e.return;
      while (e);
      return n;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var He = Object.prototype.hasOwnProperty, We = t.unstable_scheduleCallback, Nt = t.unstable_cancelCallback, at = t.unstable_shouldYield, Xe = t.unstable_requestPaint, gt = t.unstable_now, we = t.unstable_getCurrentPriorityLevel, Te = t.unstable_ImmediatePriority, Ge = t.unstable_UserBlockingPriority, Ye = t.unstable_NormalPriority, yt = t.unstable_LowPriority, At = t.unstable_IdlePriority, Hn = t.log, Sn = t.unstable_setDisableYieldValue, wn = null, Pt = null;
  function kt(e) {
    if (typeof Hn == "function" && Sn(e), Pt && typeof Pt.setStrictMode == "function")
      try {
        Pt.setStrictMode(wn, e);
      } catch {
      }
  }
  var Lt = Math.clz32 ? Math.clz32 : un, sa = Math.log, jn = Math.LN2;
  function un(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (sa(e) / jn | 0) | 0;
  }
  var Qt = 256, sn = 262144, fe = 4194304;
  function Ae(e) {
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
  function ge(e, n, r) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var d = 0, h = e.suspendedLanes, x = e.pingedLanes;
    e = e.warmLanes;
    var E = l & 134217727;
    return E !== 0 ? (l = E & ~h, l !== 0 ? d = Ae(l) : (x &= E, x !== 0 ? d = Ae(x) : r || (r = E & ~e, r !== 0 && (d = Ae(r))))) : (E = l & ~h, E !== 0 ? d = Ae(E) : x !== 0 ? d = Ae(x) : r || (r = l & ~e, r !== 0 && (d = Ae(r)))), d === 0 ? 0 : n !== 0 && n !== d && (n & h) === 0 && (h = d & -d, r = n & -n, h >= r || h === 32 && (r & 4194048) !== 0) ? n : d;
  }
  function O(e, n) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & n) === 0;
  }
  function he(e, n) {
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
  function be() {
    var e = fe;
    return fe <<= 1, (fe & 62914560) === 0 && (fe = 4194304), e;
  }
  function ze(e) {
    for (var n = [], r = 0; 31 > r; r++) n.push(e);
    return n;
  }
  function Ue(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function ot(e, n, r, l, d, h) {
    var x = e.pendingLanes;
    e.pendingLanes = r, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= r, e.entangledLanes &= r, e.errorRecoveryDisabledLanes &= r, e.shellSuspendCounter = 0;
    var E = e.entanglements, $ = e.expirationTimes, ae = e.hiddenUpdates;
    for (r = x & ~r; 0 < r; ) {
      var ue = 31 - Lt(r), pe = 1 << ue;
      E[ue] = 0, $[ue] = -1;
      var le = ae[ue];
      if (le !== null)
        for (ae[ue] = null, ue = 0; ue < le.length; ue++) {
          var oe = le[ue];
          oe !== null && (oe.lane &= -536870913);
        }
      r &= ~pe;
    }
    l !== 0 && qt(e, l, 0), h !== 0 && d === 0 && e.tag !== 0 && (e.suspendedLanes |= h & ~(x & ~n));
  }
  function qt(e, n, r) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var l = 31 - Lt(n);
    e.entangledLanes |= n, e.entanglements[l] = e.entanglements[l] | 1073741824 | r & 261930;
  }
  function ct(e, n) {
    var r = e.entangledLanes |= n;
    for (e = e.entanglements; r; ) {
      var l = 31 - Lt(r), d = 1 << l;
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
  function ve() {
    var e = F.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : ny(e.type));
  }
  function xe(e, n) {
    var r = F.p;
    try {
      return F.p = e, n();
    } finally {
      F.p = r;
    }
  }
  var je = Math.random().toString(36).slice(2), Ee = "__reactFiber$" + je, Ne = "__reactProps$" + je, Oe = "__reactContainer$" + je, _e = "__reactEvents$" + je, Ie = "__reactListeners$" + je, $e = "__reactHandles$" + je, ht = "__reactResources$" + je, et = "__reactMarker$" + je;
  function Ct(e) {
    delete e[Ee], delete e[Ne], delete e[_e], delete e[Ie], delete e[$e];
  }
  function St(e) {
    var n = e[Ee];
    if (n) return n;
    for (var r = e.parentNode; r; ) {
      if (n = r[Oe] || r[Ee]) {
        if (r = n.alternate, n.child !== null || r !== null && r.child !== null)
          for (e = Iv(e); e !== null; ) {
            if (r = e[Ee]) return r;
            e = Iv(e);
          }
        return n;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function $t(e) {
    if (e = e[Ee] || e[Oe]) {
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
  function Zt(e) {
    var n = e[ht];
    return n || (n = e[ht] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function Mt(e) {
    e[et] = !0;
  }
  var Fa = /* @__PURE__ */ new Set(), ia = {};
  function on(e, n) {
    ha(e, n), ha(e + "Capture", n);
  }
  function ha(e, n) {
    for (ia[e] = n, e = 0; e < n.length; e++)
      Fa.add(n[e]);
  }
  var Rr = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), ma = {}, _r = {};
  function ns(e) {
    return He.call(_r, e) ? !0 : He.call(ma, e) ? !1 : Rr.test(e) ? _r[e] = !0 : (ma[e] = !0, !1);
  }
  function tt(e, n, r) {
    if (ns(n))
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
  function Jt(e) {
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
  function Dt(e) {
    var n = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function as(e, n, r) {
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
  function rs(e) {
    if (!e._valueTracker) {
      var n = Dt(e) ? "checked" : "value";
      e._valueTracker = as(
        e,
        n,
        "" + e[n]
      );
    }
  }
  function kl(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var r = n.getValue(), l = "";
    return e && (l = Dt(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== r ? (n.setValue(e), !0) : !1;
  }
  function Dl(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Ow = /[\n"\\]/g;
  function Fn(e) {
    return e.replace(
      Ow,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function eu(e, n, r, l, d, h, x, E) {
    e.name = "", x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.type = x : e.removeAttribute("type"), n != null ? x === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + Jt(n)) : e.value !== "" + Jt(n) && (e.value = "" + Jt(n)) : x !== "submit" && x !== "reset" || e.removeAttribute("value"), n != null ? tu(e, x, Jt(n)) : r != null ? tu(e, x, Jt(r)) : l != null && e.removeAttribute("value"), d == null && h != null && (e.defaultChecked = !!h), d != null && (e.checked = d && typeof d != "function" && typeof d != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + Jt(E) : e.removeAttribute("name");
  }
  function Cm(e, n, r, l, d, h, x, E) {
    if (h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (e.type = h), n != null || r != null) {
      if (!(h !== "submit" && h !== "reset" || n != null)) {
        rs(e);
        return;
      }
      r = r != null ? "" + Jt(r) : "", n = n != null ? "" + Jt(n) : r, E || n === e.value || (e.value = n), e.defaultValue = n;
    }
    l = l ?? d, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = E ? e.checked : !!l, e.defaultChecked = !!l, x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" && (e.name = x), rs(e);
  }
  function tu(e, n, r) {
    n === "number" && Dl(e.ownerDocument) === e || e.defaultValue === "" + r || (e.defaultValue = "" + r);
  }
  function ss(e, n, r, l) {
    if (e = e.options, n) {
      n = {};
      for (var d = 0; d < r.length; d++)
        n["$" + r[d]] = !0;
      for (r = 0; r < e.length; r++)
        d = n.hasOwnProperty("$" + e[r].value), e[r].selected !== d && (e[r].selected = d), d && l && (e[r].defaultSelected = !0);
    } else {
      for (r = "" + Jt(r), n = null, d = 0; d < e.length; d++) {
        if (e[d].value === r) {
          e[d].selected = !0, l && (e[d].defaultSelected = !0);
          return;
        }
        n !== null || e[d].disabled || (n = e[d]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function Tm(e, n, r) {
    if (n != null && (n = "" + Jt(n), n !== e.value && (e.value = n), r == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = r != null ? "" + Jt(r) : "";
  }
  function Rm(e, n, r, l) {
    if (n == null) {
      if (l != null) {
        if (r != null) throw Error(i(92));
        if (re(l)) {
          if (1 < l.length) throw Error(i(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), n = r;
    }
    r = Jt(n), e.defaultValue = r, l = e.textContent, l === r && l !== "" && l !== null && (e.value = l), rs(e);
  }
  function is(e, n) {
    if (n) {
      var r = e.firstChild;
      if (r && r === e.lastChild && r.nodeType === 3) {
        r.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var Lw = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function _m(e, n, r) {
    var l = n.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === "" ? l ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : l ? e.setProperty(n, r) : typeof r != "number" || r === 0 || Lw.has(n) ? n === "float" ? e.cssFloat = r : e[n] = ("" + r).trim() : e[n] = r + "px";
  }
  function Mm(e, n, r) {
    if (n != null && typeof n != "object")
      throw Error(i(62));
    if (e = e.style, r != null) {
      for (var l in r)
        !r.hasOwnProperty(l) || n != null && n.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var d in n)
        l = n[d], n.hasOwnProperty(d) && r[d] !== l && _m(e, d, l);
    } else
      for (var h in n)
        n.hasOwnProperty(h) && _m(e, h, n[h]);
  }
  function nu(e) {
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
  var $w = /* @__PURE__ */ new Map([
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
  ]), Uw = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function zl(e) {
    return Uw.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function wa() {
  }
  var au = null;
  function ru(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var ls = null, os = null;
  function Am(e) {
    var n = $t(e);
    if (n && (e = n.stateNode)) {
      var r = e[Ne] || null;
      e: switch (e = n.stateNode, n.type) {
        case "input":
          if (eu(
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
                var d = l[Ne] || null;
                if (!d) throw Error(i(90));
                eu(
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
              l = r[n], l.form === e.form && kl(l);
          }
          break e;
        case "textarea":
          Tm(e, r.value, r.defaultValue);
          break e;
        case "select":
          n = r.value, n != null && ss(e, !!r.multiple, n, !1);
      }
    }
  }
  var su = !1;
  function km(e, n, r) {
    if (su) return e(n, r);
    su = !0;
    try {
      var l = e(n);
      return l;
    } finally {
      if (su = !1, (ls !== null || os !== null) && (wo(), ls && (n = ls, e = os, os = ls = null, Am(n), e)))
        for (n = 0; n < e.length; n++) Am(e[n]);
    }
  }
  function oi(e, n) {
    var r = e.stateNode;
    if (r === null) return null;
    var l = r[Ne] || null;
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
  var ja = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), iu = !1;
  if (ja)
    try {
      var ci = {};
      Object.defineProperty(ci, "passive", {
        get: function() {
          iu = !0;
        }
      }), window.addEventListener("test", ci, ci), window.removeEventListener("test", ci, ci);
    } catch {
      iu = !1;
    }
  var Pa = null, lu = null, Ol = null;
  function Dm() {
    if (Ol) return Ol;
    var e, n = lu, r = n.length, l, d = "value" in Pa ? Pa.value : Pa.textContent, h = d.length;
    for (e = 0; e < r && n[e] === d[e]; e++) ;
    var x = r - e;
    for (l = 1; l <= x && n[r - l] === d[h - l]; l++) ;
    return Ol = d.slice(e, 1 < l ? 1 - l : void 0);
  }
  function Ll(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function $l() {
    return !0;
  }
  function zm() {
    return !1;
  }
  function Nn(e) {
    function n(r, l, d, h, x) {
      this._reactName = r, this._targetInst = d, this.type = l, this.nativeEvent = h, this.target = x, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (r = e[E], this[E] = r ? r(h) : h[E]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? $l : zm, this.isPropagationStopped = zm, this;
    }
    return v(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var r = this.nativeEvent;
        r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1), this.isDefaultPrevented = $l);
      },
      stopPropagation: function() {
        var r = this.nativeEvent;
        r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0), this.isPropagationStopped = $l);
      },
      persist: function() {
      },
      isPersistent: $l
    }), n;
  }
  var Mr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Ul = Nn(Mr), ui = v({}, Mr, { view: 0, detail: 0 }), Bw = Nn(ui), ou, cu, di, Bl = v({}, ui, {
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
    getModifierState: du,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== di && (di && e.type === "mousemove" ? (ou = e.screenX - di.screenX, cu = e.screenY - di.screenY) : cu = ou = 0, di = e), ou);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : cu;
    }
  }), Om = Nn(Bl), Iw = v({}, Bl, { dataTransfer: 0 }), Vw = Nn(Iw), qw = v({}, ui, { relatedTarget: 0 }), uu = Nn(qw), Hw = v({}, Mr, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Fw = Nn(Hw), Pw = v({}, Mr, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Gw = Nn(Pw), Yw = v({}, Mr, { data: 0 }), Lm = Nn(Yw), Kw = {
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
  }, Xw = {
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
  }, Qw = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Zw(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = Qw[e]) ? !!n[e] : !1;
  }
  function du() {
    return Zw;
  }
  var Jw = v({}, ui, {
    key: function(e) {
      if (e.key) {
        var n = Kw[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = Ll(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Xw[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: du,
    charCode: function(e) {
      return e.type === "keypress" ? Ll(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Ll(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), Ww = Nn(Jw), ej = v({}, Bl, {
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
  }), $m = Nn(ej), tj = v({}, ui, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: du
  }), nj = Nn(tj), aj = v({}, Mr, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), rj = Nn(aj), sj = v({}, Bl, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), ij = Nn(sj), lj = v({}, Mr, {
    newState: 0,
    oldState: 0
  }), oj = Nn(lj), cj = [9, 13, 27, 32], fu = ja && "CompositionEvent" in window, fi = null;
  ja && "documentMode" in document && (fi = document.documentMode);
  var uj = ja && "TextEvent" in window && !fi, Um = ja && (!fu || fi && 8 < fi && 11 >= fi), Bm = " ", Im = !1;
  function Vm(e, n) {
    switch (e) {
      case "keyup":
        return cj.indexOf(n.keyCode) !== -1;
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
  function qm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var cs = !1;
  function dj(e, n) {
    switch (e) {
      case "compositionend":
        return qm(n);
      case "keypress":
        return n.which !== 32 ? null : (Im = !0, Bm);
      case "textInput":
        return e = n.data, e === Bm && Im ? null : e;
      default:
        return null;
    }
  }
  function fj(e, n) {
    if (cs)
      return e === "compositionend" || !fu && Vm(e, n) ? (e = Dm(), Ol = lu = Pa = null, cs = !1, e) : null;
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
        return Um && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var hj = {
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
  function Hm(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!hj[e.type] : n === "textarea";
  }
  function Fm(e, n, r, l) {
    ls ? os ? os.push(l) : os = [l] : ls = l, n = _o(n, "onChange"), 0 < n.length && (r = new Ul(
      "onChange",
      "change",
      null,
      r,
      l
    ), e.push({ event: r, listeners: n }));
  }
  var hi = null, mi = null;
  function mj(e) {
    Cv(e, 0);
  }
  function Il(e) {
    var n = rt(e);
    if (kl(n)) return e;
  }
  function Pm(e, n) {
    if (e === "change") return n;
  }
  var Gm = !1;
  if (ja) {
    var hu;
    if (ja) {
      var mu = "oninput" in document;
      if (!mu) {
        var Ym = document.createElement("div");
        Ym.setAttribute("oninput", "return;"), mu = typeof Ym.oninput == "function";
      }
      hu = mu;
    } else hu = !1;
    Gm = hu && (!document.documentMode || 9 < document.documentMode);
  }
  function Km() {
    hi && (hi.detachEvent("onpropertychange", Xm), mi = hi = null);
  }
  function Xm(e) {
    if (e.propertyName === "value" && Il(mi)) {
      var n = [];
      Fm(
        n,
        mi,
        e,
        ru(e)
      ), km(mj, n);
    }
  }
  function pj(e, n, r) {
    e === "focusin" ? (Km(), hi = n, mi = r, hi.attachEvent("onpropertychange", Xm)) : e === "focusout" && Km();
  }
  function gj(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Il(mi);
  }
  function vj(e, n) {
    if (e === "click") return Il(n);
  }
  function yj(e, n) {
    if (e === "input" || e === "change")
      return Il(n);
  }
  function bj(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var zn = typeof Object.is == "function" ? Object.is : bj;
  function pi(e, n) {
    if (zn(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var r = Object.keys(e), l = Object.keys(n);
    if (r.length !== l.length) return !1;
    for (l = 0; l < r.length; l++) {
      var d = r[l];
      if (!He.call(n, d) || !zn(e[d], n[d]))
        return !1;
    }
    return !0;
  }
  function Qm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Zm(e, n) {
    var r = Qm(e);
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
      r = Qm(r);
    }
  }
  function Jm(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Jm(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Wm(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var n = Dl(e.document); n instanceof e.HTMLIFrameElement; ) {
      try {
        var r = typeof n.contentWindow.location.href == "string";
      } catch {
        r = !1;
      }
      if (r) e = n.contentWindow;
      else break;
      n = Dl(e.document);
    }
    return n;
  }
  function pu(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var xj = ja && "documentMode" in document && 11 >= document.documentMode, us = null, gu = null, gi = null, vu = !1;
  function ep(e, n, r) {
    var l = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    vu || us == null || us !== Dl(l) || (l = us, "selectionStart" in l && pu(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), gi && pi(gi, l) || (gi = l, l = _o(gu, "onSelect"), 0 < l.length && (n = new Ul(
      "onSelect",
      "select",
      null,
      n,
      r
    ), e.push({ event: n, listeners: l }), n.target = us)));
  }
  function Ar(e, n) {
    var r = {};
    return r[e.toLowerCase()] = n.toLowerCase(), r["Webkit" + e] = "webkit" + n, r["Moz" + e] = "moz" + n, r;
  }
  var ds = {
    animationend: Ar("Animation", "AnimationEnd"),
    animationiteration: Ar("Animation", "AnimationIteration"),
    animationstart: Ar("Animation", "AnimationStart"),
    transitionrun: Ar("Transition", "TransitionRun"),
    transitionstart: Ar("Transition", "TransitionStart"),
    transitioncancel: Ar("Transition", "TransitionCancel"),
    transitionend: Ar("Transition", "TransitionEnd")
  }, yu = {}, tp = {};
  ja && (tp = document.createElement("div").style, "AnimationEvent" in window || (delete ds.animationend.animation, delete ds.animationiteration.animation, delete ds.animationstart.animation), "TransitionEvent" in window || delete ds.transitionend.transition);
  function kr(e) {
    if (yu[e]) return yu[e];
    if (!ds[e]) return e;
    var n = ds[e], r;
    for (r in n)
      if (n.hasOwnProperty(r) && r in tp)
        return yu[e] = n[r];
    return e;
  }
  var np = kr("animationend"), ap = kr("animationiteration"), rp = kr("animationstart"), Sj = kr("transitionrun"), wj = kr("transitionstart"), jj = kr("transitioncancel"), sp = kr("transitionend"), ip = /* @__PURE__ */ new Map(), bu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  bu.push("scrollEnd");
  function la(e, n) {
    ip.set(e, n), on(n, [e]);
  }
  var Vl = typeof reportError == "function" ? reportError : function(e) {
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
  }, Pn = [], fs = 0, xu = 0;
  function ql() {
    for (var e = fs, n = xu = fs = 0; n < e; ) {
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
      h !== 0 && lp(r, d, h);
    }
  }
  function Hl(e, n, r, l) {
    Pn[fs++] = e, Pn[fs++] = n, Pn[fs++] = r, Pn[fs++] = l, xu |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function Su(e, n, r, l) {
    return Hl(e, n, r, l), Fl(e);
  }
  function Dr(e, n) {
    return Hl(e, null, null, n), Fl(e);
  }
  function lp(e, n, r) {
    e.lanes |= r;
    var l = e.alternate;
    l !== null && (l.lanes |= r);
    for (var d = !1, h = e.return; h !== null; )
      h.childLanes |= r, l = h.alternate, l !== null && (l.childLanes |= r), h.tag === 22 && (e = h.stateNode, e === null || e._visibility & 1 || (d = !0)), e = h, h = h.return;
    return e.tag === 3 ? (h = e.stateNode, d && n !== null && (d = 31 - Lt(r), e = h.hiddenUpdates, l = e[d], l === null ? e[d] = [n] : l.push(n), n.lane = r | 536870912), h) : null;
  }
  function Fl(e) {
    if (50 < Ui)
      throw Ui = 0, Md = null, Error(i(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var hs = {};
  function Ej(e, n, r, l) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function On(e, n, r, l) {
    return new Ej(e, n, r, l);
  }
  function wu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Ea(e, n) {
    var r = e.alternate;
    return r === null ? (r = On(
      e.tag,
      n,
      e.key,
      e.mode
    ), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = n, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 65011712, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, n = e.dependencies, r.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r.refCleanup = e.refCleanup, r;
  }
  function op(e, n) {
    e.flags &= 65011714;
    var r = e.alternate;
    return r === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = r.childLanes, e.lanes = r.lanes, e.child = r.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = r.memoizedProps, e.memoizedState = r.memoizedState, e.updateQueue = r.updateQueue, e.type = r.type, n = r.dependencies, e.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), e;
  }
  function Pl(e, n, r, l, d, h) {
    var x = 0;
    if (l = e, typeof e == "function") wu(e) && (x = 1);
    else if (typeof e == "string")
      x = _E(
        e,
        r,
        K.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case V:
          return e = On(31, r, n, d), e.elementType = V, e.lanes = h, e;
        case N:
          return zr(r.children, d, h, n);
        case R:
          x = 8, d |= 24;
          break;
        case T:
          return e = On(12, r, n, d | 2), e.elementType = T, e.lanes = h, e;
        case I:
          return e = On(13, r, n, d), e.elementType = I, e.lanes = h, e;
        case Y:
          return e = On(19, r, n, d), e.elementType = Y, e.lanes = h, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case _:
                x = 10;
                break e;
              case L:
                x = 9;
                break e;
              case C:
                x = 11;
                break e;
              case ie:
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
    return n = On(x, r, n, d), n.elementType = e, n.type = l, n.lanes = h, n;
  }
  function zr(e, n, r, l) {
    return e = On(7, e, l, n), e.lanes = r, e;
  }
  function ju(e, n, r) {
    return e = On(6, e, null, n), e.lanes = r, e;
  }
  function cp(e) {
    var n = On(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function Eu(e, n, r) {
    return n = On(
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
  var up = /* @__PURE__ */ new WeakMap();
  function Gn(e, n) {
    if (typeof e == "object" && e !== null) {
      var r = up.get(e);
      return r !== void 0 ? r : (n = {
        value: e,
        source: n,
        stack: Re(n)
      }, up.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: Re(n)
    };
  }
  var ms = [], ps = 0, Gl = null, vi = 0, Yn = [], Kn = 0, Ga = null, pa = 1, ga = "";
  function Na(e, n) {
    ms[ps++] = vi, ms[ps++] = Gl, Gl = e, vi = n;
  }
  function dp(e, n, r) {
    Yn[Kn++] = pa, Yn[Kn++] = ga, Yn[Kn++] = Ga, Ga = e;
    var l = pa;
    e = ga;
    var d = 32 - Lt(l) - 1;
    l &= ~(1 << d), r += 1;
    var h = 32 - Lt(n) + d;
    if (30 < h) {
      var x = d - d % 5;
      h = (l & (1 << x) - 1).toString(32), l >>= x, d -= x, pa = 1 << 32 - Lt(n) + d | r << d | l, ga = h + e;
    } else
      pa = 1 << h | r << d | l, ga = e;
  }
  function Nu(e) {
    e.return !== null && (Na(e, 1), dp(e, 1, 0));
  }
  function Cu(e) {
    for (; e === Gl; )
      Gl = ms[--ps], ms[ps] = null, vi = ms[--ps], ms[ps] = null;
    for (; e === Ga; )
      Ga = Yn[--Kn], Yn[Kn] = null, ga = Yn[--Kn], Yn[Kn] = null, pa = Yn[--Kn], Yn[Kn] = null;
  }
  function fp(e, n) {
    Yn[Kn++] = pa, Yn[Kn++] = ga, Yn[Kn++] = Ga, pa = n.id, ga = n.overflow, Ga = e;
  }
  var dn = null, zt = null, ft = !1, Ya = null, Xn = !1, Tu = Error(i(519));
  function Ka(e) {
    var n = Error(
      i(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw yi(Gn(n, e)), Tu;
  }
  function hp(e) {
    var n = e.stateNode, r = e.type, l = e.memoizedProps;
    switch (n[Ee] = e, n[Ne] = l, r) {
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
        for (r = 0; r < Ii.length; r++)
          it(Ii[r], n);
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
        it("invalid", n), Cm(
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
        it("invalid", n), Rm(n, l.value, l.defaultValue, l.children);
    }
    r = l.children, typeof r != "string" && typeof r != "number" && typeof r != "bigint" || n.textContent === "" + r || l.suppressHydrationWarning === !0 || Mv(n.textContent, r) ? (l.popover != null && (it("beforetoggle", n), it("toggle", n)), l.onScroll != null && it("scroll", n), l.onScrollEnd != null && it("scrollend", n), l.onClick != null && (n.onclick = wa), n = !0) : n = !1, n || Ka(e, !0);
  }
  function mp(e) {
    for (dn = e.return; dn; )
      switch (dn.tag) {
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
          dn = dn.return;
      }
  }
  function gs(e) {
    if (e !== dn) return !1;
    if (!ft) return mp(e), ft = !0, !1;
    var n = e.tag, r;
    if ((r = n !== 3 && n !== 27) && ((r = n === 5) && (r = e.type, r = !(r !== "form" && r !== "button") || Pd(e.type, e.memoizedProps)), r = !r), r && zt && Ka(e), mp(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      zt = Bv(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      zt = Bv(e);
    } else
      n === 27 ? (n = zt, or(e.type) ? (e = Qd, Qd = null, zt = e) : zt = n) : zt = dn ? Zn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Or() {
    zt = dn = null, ft = !1;
  }
  function Ru() {
    var e = Ya;
    return e !== null && (_n === null ? _n = e : _n.push.apply(
      _n,
      e
    ), Ya = null), e;
  }
  function yi(e) {
    Ya === null ? Ya = [e] : Ya.push(e);
  }
  var _u = k(null), Lr = null, Ca = null;
  function Xa(e, n, r) {
    te(_u, n._currentValue), n._currentValue = r;
  }
  function Ta(e) {
    e._currentValue = _u.current, ee(_u);
  }
  function Mu(e, n, r) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, l !== null && (l.childLanes |= n)) : l !== null && (l.childLanes & n) !== n && (l.childLanes |= n), e === r) break;
      e = e.return;
    }
  }
  function Au(e, n, r, l) {
    var d = e.child;
    for (d !== null && (d.return = e); d !== null; ) {
      var h = d.dependencies;
      if (h !== null) {
        var x = d.child;
        h = h.firstContext;
        e: for (; h !== null; ) {
          var E = h;
          h = d;
          for (var $ = 0; $ < n.length; $++)
            if (E.context === n[$]) {
              h.lanes |= r, E = h.alternate, E !== null && (E.lanes |= r), Mu(
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
        x.lanes |= r, h = x.alternate, h !== null && (h.lanes |= r), Mu(x, r, e), x = null;
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
  function vs(e, n, r, l) {
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
          zn(d.pendingProps.value, x.value) || (e !== null ? e.push(E) : e = [E]);
        }
      } else if (d === ce.current) {
        if (x = d.alternate, x === null) throw Error(i(387));
        x.memoizedState.memoizedState !== d.memoizedState.memoizedState && (e !== null ? e.push(Pi) : e = [Pi]);
      }
      d = d.return;
    }
    e !== null && Au(
      n,
      e,
      r,
      l
    ), n.flags |= 262144;
  }
  function Yl(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!zn(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function $r(e) {
    Lr = e, Ca = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function fn(e) {
    return pp(Lr, e);
  }
  function Kl(e, n) {
    return Lr === null && $r(e), pp(e, n);
  }
  function pp(e, n) {
    var r = n._currentValue;
    if (n = { context: n, memoizedValue: r, next: null }, Ca === null) {
      if (e === null) throw Error(i(308));
      Ca = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else Ca = Ca.next = n;
    return r;
  }
  var Nj = typeof AbortController < "u" ? AbortController : function() {
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
  }, Cj = t.unstable_scheduleCallback, Tj = t.unstable_NormalPriority, Wt = {
    $$typeof: _,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function ku() {
    return {
      controller: new Nj(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function bi(e) {
    e.refCount--, e.refCount === 0 && Cj(Tj, function() {
      e.controller.abort();
    });
  }
  var xi = null, Du = 0, ys = 0, bs = null;
  function Rj(e, n) {
    if (xi === null) {
      var r = xi = [];
      Du = 0, ys = Ld(), bs = {
        status: "pending",
        value: void 0,
        then: function(l) {
          r.push(l);
        }
      };
    }
    return Du++, n.then(gp, gp), n;
  }
  function gp() {
    if (--Du === 0 && xi !== null) {
      bs !== null && (bs.status = "fulfilled");
      var e = xi;
      xi = null, ys = 0, bs = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function _j(e, n) {
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
  var vp = A.S;
  A.S = function(e, n) {
    ev = gt(), typeof n == "object" && n !== null && typeof n.then == "function" && Rj(e, n), vp !== null && vp(e, n);
  };
  var Ur = k(null);
  function zu() {
    var e = Ur.current;
    return e !== null ? e : Tt.pooledCache;
  }
  function Xl(e, n) {
    n === null ? te(Ur, Ur.current) : te(Ur, n.pool);
  }
  function yp() {
    var e = zu();
    return e === null ? null : { parent: Wt._currentValue, pool: e };
  }
  var xs = Error(i(460)), Ou = Error(i(474)), Ql = Error(i(542)), Zl = { then: function() {
  } };
  function bp(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function xp(e, n, r) {
    switch (r = e[r], r === void 0 ? e.push(n) : r !== n && (n.then(wa, wa), n = r), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, wp(e), e;
      default:
        if (typeof n.status == "string") n.then(wa, wa);
        else {
          if (e = Tt, e !== null && 100 < e.shellSuspendCounter)
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
            throw e = n.reason, wp(e), e;
        }
        throw Ir = n, xs;
    }
  }
  function Br(e) {
    try {
      var n = e._init;
      return n(e._payload);
    } catch (r) {
      throw r !== null && typeof r == "object" && typeof r.then == "function" ? (Ir = r, xs) : r;
    }
  }
  var Ir = null;
  function Sp() {
    if (Ir === null) throw Error(i(459));
    var e = Ir;
    return Ir = null, e;
  }
  function wp(e) {
    if (e === xs || e === Ql)
      throw Error(i(483));
  }
  var Ss = null, Si = 0;
  function Jl(e) {
    var n = Si;
    return Si += 1, Ss === null && (Ss = []), xp(Ss, e, n);
  }
  function wi(e, n) {
    n = n.props.ref, e.ref = n !== void 0 ? n : null;
  }
  function Wl(e, n) {
    throw n.$$typeof === w ? Error(i(525)) : (e = Object.prototype.toString.call(n), Error(
      i(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e
      )
    ));
  }
  function jp(e) {
    function n(X, q) {
      if (e) {
        var ne = X.deletions;
        ne === null ? (X.deletions = [q], X.flags |= 16) : ne.push(q);
      }
    }
    function r(X, q) {
      if (!e) return null;
      for (; q !== null; )
        n(X, q), q = q.sibling;
      return null;
    }
    function l(X) {
      for (var q = /* @__PURE__ */ new Map(); X !== null; )
        X.key !== null ? q.set(X.key, X) : q.set(X.index, X), X = X.sibling;
      return q;
    }
    function d(X, q) {
      return X = Ea(X, q), X.index = 0, X.sibling = null, X;
    }
    function h(X, q, ne) {
      return X.index = ne, e ? (ne = X.alternate, ne !== null ? (ne = ne.index, ne < q ? (X.flags |= 67108866, q) : ne) : (X.flags |= 67108866, q)) : (X.flags |= 1048576, q);
    }
    function x(X) {
      return e && X.alternate === null && (X.flags |= 67108866), X;
    }
    function E(X, q, ne, me) {
      return q === null || q.tag !== 6 ? (q = ju(ne, X.mode, me), q.return = X, q) : (q = d(q, ne), q.return = X, q);
    }
    function $(X, q, ne, me) {
      var Be = ne.type;
      return Be === N ? ue(
        X,
        q,
        ne.props.children,
        me,
        ne.key
      ) : q !== null && (q.elementType === Be || typeof Be == "object" && Be !== null && Be.$$typeof === M && Br(Be) === q.type) ? (q = d(q, ne.props), wi(q, ne), q.return = X, q) : (q = Pl(
        ne.type,
        ne.key,
        ne.props,
        null,
        X.mode,
        me
      ), wi(q, ne), q.return = X, q);
    }
    function ae(X, q, ne, me) {
      return q === null || q.tag !== 4 || q.stateNode.containerInfo !== ne.containerInfo || q.stateNode.implementation !== ne.implementation ? (q = Eu(ne, X.mode, me), q.return = X, q) : (q = d(q, ne.children || []), q.return = X, q);
    }
    function ue(X, q, ne, me, Be) {
      return q === null || q.tag !== 7 ? (q = zr(
        ne,
        X.mode,
        me,
        Be
      ), q.return = X, q) : (q = d(q, ne), q.return = X, q);
    }
    function pe(X, q, ne) {
      if (typeof q == "string" && q !== "" || typeof q == "number" || typeof q == "bigint")
        return q = ju(
          "" + q,
          X.mode,
          ne
        ), q.return = X, q;
      if (typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case S:
            return ne = Pl(
              q.type,
              q.key,
              q.props,
              null,
              X.mode,
              ne
            ), wi(ne, q), ne.return = X, ne;
          case j:
            return q = Eu(
              q,
              X.mode,
              ne
            ), q.return = X, q;
          case M:
            return q = Br(q), pe(X, q, ne);
        }
        if (re(q) || J(q))
          return q = zr(
            q,
            X.mode,
            ne,
            null
          ), q.return = X, q;
        if (typeof q.then == "function")
          return pe(X, Jl(q), ne);
        if (q.$$typeof === _)
          return pe(
            X,
            Kl(X, q),
            ne
          );
        Wl(X, q);
      }
      return null;
    }
    function le(X, q, ne, me) {
      var Be = q !== null ? q.key : null;
      if (typeof ne == "string" && ne !== "" || typeof ne == "number" || typeof ne == "bigint")
        return Be !== null ? null : E(X, q, "" + ne, me);
      if (typeof ne == "object" && ne !== null) {
        switch (ne.$$typeof) {
          case S:
            return ne.key === Be ? $(X, q, ne, me) : null;
          case j:
            return ne.key === Be ? ae(X, q, ne, me) : null;
          case M:
            return ne = Br(ne), le(X, q, ne, me);
        }
        if (re(ne) || J(ne))
          return Be !== null ? null : ue(X, q, ne, me, null);
        if (typeof ne.then == "function")
          return le(
            X,
            q,
            Jl(ne),
            me
          );
        if (ne.$$typeof === _)
          return le(
            X,
            q,
            Kl(X, ne),
            me
          );
        Wl(X, ne);
      }
      return null;
    }
    function oe(X, q, ne, me, Be) {
      if (typeof me == "string" && me !== "" || typeof me == "number" || typeof me == "bigint")
        return X = X.get(ne) || null, E(q, X, "" + me, Be);
      if (typeof me == "object" && me !== null) {
        switch (me.$$typeof) {
          case S:
            return X = X.get(
              me.key === null ? ne : me.key
            ) || null, $(q, X, me, Be);
          case j:
            return X = X.get(
              me.key === null ? ne : me.key
            ) || null, ae(q, X, me, Be);
          case M:
            return me = Br(me), oe(
              X,
              q,
              ne,
              me,
              Be
            );
        }
        if (re(me) || J(me))
          return X = X.get(ne) || null, ue(q, X, me, Be, null);
        if (typeof me.then == "function")
          return oe(
            X,
            q,
            ne,
            Jl(me),
            Be
          );
        if (me.$$typeof === _)
          return oe(
            X,
            q,
            ne,
            Kl(q, me),
            Be
          );
        Wl(q, me);
      }
      return null;
    }
    function ke(X, q, ne, me) {
      for (var Be = null, mt = null, Le = q, Je = q = 0, dt = null; Le !== null && Je < ne.length; Je++) {
        Le.index > Je ? (dt = Le, Le = null) : dt = Le.sibling;
        var pt = le(
          X,
          Le,
          ne[Je],
          me
        );
        if (pt === null) {
          Le === null && (Le = dt);
          break;
        }
        e && Le && pt.alternate === null && n(X, Le), q = h(pt, q, Je), mt === null ? Be = pt : mt.sibling = pt, mt = pt, Le = dt;
      }
      if (Je === ne.length)
        return r(X, Le), ft && Na(X, Je), Be;
      if (Le === null) {
        for (; Je < ne.length; Je++)
          Le = pe(X, ne[Je], me), Le !== null && (q = h(
            Le,
            q,
            Je
          ), mt === null ? Be = Le : mt.sibling = Le, mt = Le);
        return ft && Na(X, Je), Be;
      }
      for (Le = l(Le); Je < ne.length; Je++)
        dt = oe(
          Le,
          X,
          Je,
          ne[Je],
          me
        ), dt !== null && (e && dt.alternate !== null && Le.delete(
          dt.key === null ? Je : dt.key
        ), q = h(
          dt,
          q,
          Je
        ), mt === null ? Be = dt : mt.sibling = dt, mt = dt);
      return e && Le.forEach(function(hr) {
        return n(X, hr);
      }), ft && Na(X, Je), Be;
    }
    function Ve(X, q, ne, me) {
      if (ne == null) throw Error(i(151));
      for (var Be = null, mt = null, Le = q, Je = q = 0, dt = null, pt = ne.next(); Le !== null && !pt.done; Je++, pt = ne.next()) {
        Le.index > Je ? (dt = Le, Le = null) : dt = Le.sibling;
        var hr = le(X, Le, pt.value, me);
        if (hr === null) {
          Le === null && (Le = dt);
          break;
        }
        e && Le && hr.alternate === null && n(X, Le), q = h(hr, q, Je), mt === null ? Be = hr : mt.sibling = hr, mt = hr, Le = dt;
      }
      if (pt.done)
        return r(X, Le), ft && Na(X, Je), Be;
      if (Le === null) {
        for (; !pt.done; Je++, pt = ne.next())
          pt = pe(X, pt.value, me), pt !== null && (q = h(pt, q, Je), mt === null ? Be = pt : mt.sibling = pt, mt = pt);
        return ft && Na(X, Je), Be;
      }
      for (Le = l(Le); !pt.done; Je++, pt = ne.next())
        pt = oe(Le, X, Je, pt.value, me), pt !== null && (e && pt.alternate !== null && Le.delete(pt.key === null ? Je : pt.key), q = h(pt, q, Je), mt === null ? Be = pt : mt.sibling = pt, mt = pt);
      return e && Le.forEach(function(IE) {
        return n(X, IE);
      }), ft && Na(X, Je), Be;
    }
    function Et(X, q, ne, me) {
      if (typeof ne == "object" && ne !== null && ne.type === N && ne.key === null && (ne = ne.props.children), typeof ne == "object" && ne !== null) {
        switch (ne.$$typeof) {
          case S:
            e: {
              for (var Be = ne.key; q !== null; ) {
                if (q.key === Be) {
                  if (Be = ne.type, Be === N) {
                    if (q.tag === 7) {
                      r(
                        X,
                        q.sibling
                      ), me = d(
                        q,
                        ne.props.children
                      ), me.return = X, X = me;
                      break e;
                    }
                  } else if (q.elementType === Be || typeof Be == "object" && Be !== null && Be.$$typeof === M && Br(Be) === q.type) {
                    r(
                      X,
                      q.sibling
                    ), me = d(q, ne.props), wi(me, ne), me.return = X, X = me;
                    break e;
                  }
                  r(X, q);
                  break;
                } else n(X, q);
                q = q.sibling;
              }
              ne.type === N ? (me = zr(
                ne.props.children,
                X.mode,
                me,
                ne.key
              ), me.return = X, X = me) : (me = Pl(
                ne.type,
                ne.key,
                ne.props,
                null,
                X.mode,
                me
              ), wi(me, ne), me.return = X, X = me);
            }
            return x(X);
          case j:
            e: {
              for (Be = ne.key; q !== null; ) {
                if (q.key === Be)
                  if (q.tag === 4 && q.stateNode.containerInfo === ne.containerInfo && q.stateNode.implementation === ne.implementation) {
                    r(
                      X,
                      q.sibling
                    ), me = d(q, ne.children || []), me.return = X, X = me;
                    break e;
                  } else {
                    r(X, q);
                    break;
                  }
                else n(X, q);
                q = q.sibling;
              }
              me = Eu(ne, X.mode, me), me.return = X, X = me;
            }
            return x(X);
          case M:
            return ne = Br(ne), Et(
              X,
              q,
              ne,
              me
            );
        }
        if (re(ne))
          return ke(
            X,
            q,
            ne,
            me
          );
        if (J(ne)) {
          if (Be = J(ne), typeof Be != "function") throw Error(i(150));
          return ne = Be.call(ne), Ve(
            X,
            q,
            ne,
            me
          );
        }
        if (typeof ne.then == "function")
          return Et(
            X,
            q,
            Jl(ne),
            me
          );
        if (ne.$$typeof === _)
          return Et(
            X,
            q,
            Kl(X, ne),
            me
          );
        Wl(X, ne);
      }
      return typeof ne == "string" && ne !== "" || typeof ne == "number" || typeof ne == "bigint" ? (ne = "" + ne, q !== null && q.tag === 6 ? (r(X, q.sibling), me = d(q, ne), me.return = X, X = me) : (r(X, q), me = ju(ne, X.mode, me), me.return = X, X = me), x(X)) : r(X, q);
    }
    return function(X, q, ne, me) {
      try {
        Si = 0;
        var Be = Et(
          X,
          q,
          ne,
          me
        );
        return Ss = null, Be;
      } catch (Le) {
        if (Le === xs || Le === Ql) throw Le;
        var mt = On(29, Le, null, X.mode);
        return mt.lanes = me, mt.return = X, mt;
      } finally {
      }
    };
  }
  var Vr = jp(!0), Ep = jp(!1), Qa = !1;
  function Lu(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function $u(e, n) {
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
      return d === null ? n.next = n : (n.next = d.next, d.next = n), l.pending = n, n = Fl(e), lp(e, null, r), n;
    }
    return Hl(e, l, n, r), Fl(e);
  }
  function ji(e, n, r) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (r & 4194048) !== 0)) {
      var l = n.lanes;
      l &= e.pendingLanes, r |= l, n.lanes = r, ct(e, r);
    }
  }
  function Uu(e, n) {
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
  var Bu = !1;
  function Ei() {
    if (Bu) {
      var e = bs;
      if (e !== null) throw e;
    }
  }
  function Ni(e, n, r, l) {
    Bu = !1;
    var d = e.updateQueue;
    Qa = !1;
    var h = d.firstBaseUpdate, x = d.lastBaseUpdate, E = d.shared.pending;
    if (E !== null) {
      d.shared.pending = null;
      var $ = E, ae = $.next;
      $.next = null, x === null ? h = ae : x.next = ae, x = $;
      var ue = e.alternate;
      ue !== null && (ue = ue.updateQueue, E = ue.lastBaseUpdate, E !== x && (E === null ? ue.firstBaseUpdate = ae : E.next = ae, ue.lastBaseUpdate = $));
    }
    if (h !== null) {
      var pe = d.baseState;
      x = 0, ue = ae = $ = null, E = h;
      do {
        var le = E.lane & -536870913, oe = le !== E.lane;
        if (oe ? (ut & le) === le : (l & le) === le) {
          le !== 0 && le === ys && (Bu = !0), ue !== null && (ue = ue.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var ke = e, Ve = E;
            le = n;
            var Et = r;
            switch (Ve.tag) {
              case 1:
                if (ke = Ve.payload, typeof ke == "function") {
                  pe = ke.call(Et, pe, le);
                  break e;
                }
                pe = ke;
                break e;
              case 3:
                ke.flags = ke.flags & -65537 | 128;
              case 0:
                if (ke = Ve.payload, le = typeof ke == "function" ? ke.call(Et, pe, le) : ke, le == null) break e;
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
          }, ue === null ? (ae = ue = oe, $ = pe) : ue = ue.next = oe, x |= le;
        if (E = E.next, E === null) {
          if (E = d.shared.pending, E === null)
            break;
          oe = E, E = oe.next, oe.next = null, d.lastBaseUpdate = oe, d.shared.pending = null;
        }
      } while (!0);
      ue === null && ($ = pe), d.baseState = $, d.firstBaseUpdate = ae, d.lastBaseUpdate = ue, h === null && (d.shared.lanes = 0), ar |= x, e.lanes = x, e.memoizedState = pe;
    }
  }
  function Np(e, n) {
    if (typeof e != "function")
      throw Error(i(191, e));
    e.call(n);
  }
  function Cp(e, n) {
    var r = e.callbacks;
    if (r !== null)
      for (e.callbacks = null, e = 0; e < r.length; e++)
        Np(r[e], n);
  }
  var ws = k(null), eo = k(0);
  function Tp(e, n) {
    e = La, te(eo, e), te(ws, n), La = e | n.baseLanes;
  }
  function Iu() {
    te(eo, La), te(ws, ws.current);
  }
  function Vu() {
    La = eo.current, ee(ws), ee(eo);
  }
  var Ln = k(null), Qn = null;
  function Wa(e) {
    var n = e.alternate;
    te(Yt, Yt.current & 1), te(Ln, e), Qn === null && (n === null || ws.current !== null || n.memoizedState !== null) && (Qn = e);
  }
  function qu(e) {
    te(Yt, Yt.current), te(Ln, e), Qn === null && (Qn = e);
  }
  function Rp(e) {
    e.tag === 22 ? (te(Yt, Yt.current), te(Ln, e), Qn === null && (Qn = e)) : er();
  }
  function er() {
    te(Yt, Yt.current), te(Ln, Ln.current);
  }
  function $n(e) {
    ee(Ln), Qn === e && (Qn = null), ee(Yt);
  }
  var Yt = k(0);
  function to(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var r = n.memoizedState;
        if (r !== null && (r = r.dehydrated, r === null || Kd(r) || Xd(r)))
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
  var Ra = 0, Qe = null, wt = null, en = null, no = !1, js = !1, qr = !1, ao = 0, Ci = 0, Es = null, Mj = 0;
  function Ht() {
    throw Error(i(321));
  }
  function Hu(e, n) {
    if (n === null) return !1;
    for (var r = 0; r < n.length && r < e.length; r++)
      if (!zn(e[r], n[r])) return !1;
    return !0;
  }
  function Fu(e, n, r, l, d, h) {
    return Ra = h, Qe = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, A.H = e === null || e.memoizedState === null ? dg : sd, qr = !1, h = r(l, d), qr = !1, js && (h = Mp(
      n,
      r,
      l,
      d
    )), _p(e), h;
  }
  function _p(e) {
    A.H = _i;
    var n = wt !== null && wt.next !== null;
    if (Ra = 0, en = wt = Qe = null, no = !1, Ci = 0, Es = null, n) throw Error(i(300));
    e === null || tn || (e = e.dependencies, e !== null && Yl(e) && (tn = !0));
  }
  function Mp(e, n, r, l) {
    Qe = e;
    var d = 0;
    do {
      if (js && (Es = null), Ci = 0, js = !1, 25 <= d) throw Error(i(301));
      if (d += 1, en = wt = null, e.updateQueue != null) {
        var h = e.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      A.H = fg, h = n(r, l);
    } while (js);
    return h;
  }
  function Aj() {
    var e = A.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? Ti(n) : n, e = e.useState()[0], (wt !== null ? wt.memoizedState : null) !== e && (Qe.flags |= 1024), n;
  }
  function Pu() {
    var e = ao !== 0;
    return ao = 0, e;
  }
  function Gu(e, n, r) {
    n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~r;
  }
  function Yu(e) {
    if (no) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        n !== null && (n.pending = null), e = e.next;
      }
      no = !1;
    }
    Ra = 0, en = wt = Qe = null, js = !1, Ci = ao = 0, Es = null;
  }
  function En() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return en === null ? Qe.memoizedState = en = e : en = en.next = e, en;
  }
  function Kt() {
    if (wt === null) {
      var e = Qe.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = wt.next;
    var n = en === null ? Qe.memoizedState : en.next;
    if (n !== null)
      en = n, wt = e;
    else {
      if (e === null)
        throw Qe.alternate === null ? Error(i(467)) : Error(i(310));
      wt = e, e = {
        memoizedState: wt.memoizedState,
        baseState: wt.baseState,
        baseQueue: wt.baseQueue,
        queue: wt.queue,
        next: null
      }, en === null ? Qe.memoizedState = en = e : en = en.next = e;
    }
    return en;
  }
  function ro() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ti(e) {
    var n = Ci;
    return Ci += 1, Es === null && (Es = []), e = xp(Es, e, n), n = Qe, (en === null ? n.memoizedState : en.next) === null && (n = n.alternate, A.H = n === null || n.memoizedState === null ? dg : sd), e;
  }
  function so(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Ti(e);
      if (e.$$typeof === _) return fn(e);
    }
    throw Error(i(438, String(e)));
  }
  function Ku(e) {
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
    if (n == null && (n = { data: [], index: 0 }), r === null && (r = ro(), Qe.updateQueue = r), r.memoCache = n, r = n.data[n.index], r === void 0)
      for (r = n.data[n.index] = Array(e), l = 0; l < e; l++)
        r[l] = D;
    return n.index++, r;
  }
  function _a(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function io(e) {
    var n = Kt();
    return Xu(n, wt, e);
  }
  function Xu(e, n, r) {
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
      var E = x = null, $ = null, ae = n, ue = !1;
      do {
        var pe = ae.lane & -536870913;
        if (pe !== ae.lane ? (ut & pe) === pe : (Ra & pe) === pe) {
          var le = ae.revertLane;
          if (le === 0)
            $ !== null && ($ = $.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: ae.action,
              hasEagerState: ae.hasEagerState,
              eagerState: ae.eagerState,
              next: null
            }), pe === ys && (ue = !0);
          else if ((Ra & le) === le) {
            ae = ae.next, le === ys && (ue = !0);
            continue;
          } else
            pe = {
              lane: 0,
              revertLane: ae.revertLane,
              gesture: null,
              action: ae.action,
              hasEagerState: ae.hasEagerState,
              eagerState: ae.eagerState,
              next: null
            }, $ === null ? (E = $ = pe, x = h) : $ = $.next = pe, Qe.lanes |= le, ar |= le;
          pe = ae.action, qr && r(h, pe), h = ae.hasEagerState ? ae.eagerState : r(h, pe);
        } else
          le = {
            lane: pe,
            revertLane: ae.revertLane,
            gesture: ae.gesture,
            action: ae.action,
            hasEagerState: ae.hasEagerState,
            eagerState: ae.eagerState,
            next: null
          }, $ === null ? (E = $ = le, x = h) : $ = $.next = le, Qe.lanes |= pe, ar |= pe;
        ae = ae.next;
      } while (ae !== null && ae !== n);
      if ($ === null ? x = h : $.next = E, !zn(h, e.memoizedState) && (tn = !0, ue && (r = bs, r !== null)))
        throw r;
      e.memoizedState = h, e.baseState = x, e.baseQueue = $, l.lastRenderedState = h;
    }
    return d === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Qu(e) {
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
      zn(h, n.memoizedState) || (tn = !0), n.memoizedState = h, n.baseQueue === null && (n.baseState = h), r.lastRenderedState = h;
    }
    return [h, l];
  }
  function Ap(e, n, r) {
    var l = Qe, d = Kt(), h = ft;
    if (h) {
      if (r === void 0) throw Error(i(407));
      r = r();
    } else r = n();
    var x = !zn(
      (wt || d).memoizedState,
      r
    );
    if (x && (d.memoizedState = r, tn = !0), d = d.queue, Wu(zp.bind(null, l, d, e), [
      e
    ]), d.getSnapshot !== n || x || en !== null && en.memoizedState.tag & 1) {
      if (l.flags |= 2048, Ns(
        9,
        { destroy: void 0 },
        Dp.bind(
          null,
          l,
          d,
          r,
          n
        ),
        null
      ), Tt === null) throw Error(i(349));
      h || (Ra & 127) !== 0 || kp(l, n, r);
    }
    return r;
  }
  function kp(e, n, r) {
    e.flags |= 16384, e = { getSnapshot: n, value: r }, n = Qe.updateQueue, n === null ? (n = ro(), Qe.updateQueue = n, n.stores = [e]) : (r = n.stores, r === null ? n.stores = [e] : r.push(e));
  }
  function Dp(e, n, r, l) {
    n.value = r, n.getSnapshot = l, Op(n) && Lp(e);
  }
  function zp(e, n, r) {
    return r(function() {
      Op(n) && Lp(e);
    });
  }
  function Op(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var r = n();
      return !zn(e, r);
    } catch {
      return !0;
    }
  }
  function Lp(e) {
    var n = Dr(e, 2);
    n !== null && Mn(n, e, 2);
  }
  function Zu(e) {
    var n = En();
    if (typeof e == "function") {
      var r = e;
      if (e = r(), qr) {
        kt(!0);
        try {
          r();
        } finally {
          kt(!1);
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
  function $p(e, n, r, l) {
    return e.baseState = r, Xu(
      e,
      wt,
      typeof l == "function" ? l : _a
    );
  }
  function kj(e, n, r, l, d) {
    if (co(e)) throw Error(i(485));
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
      A.T !== null ? r(!0) : h.isTransition = !1, l(h), r = n.pending, r === null ? (h.next = n.pending = h, Up(n, h)) : (h.next = r.next, n.pending = r.next = h);
    }
  }
  function Up(e, n) {
    var r = n.action, l = n.payload, d = e.state;
    if (n.isTransition) {
      var h = A.T, x = {};
      A.T = x;
      try {
        var E = r(d, l), $ = A.S;
        $ !== null && $(x, E), Bp(e, n, E);
      } catch (ae) {
        Ju(e, n, ae);
      } finally {
        h !== null && x.types !== null && (h.types = x.types), A.T = h;
      }
    } else
      try {
        h = r(d, l), Bp(e, n, h);
      } catch (ae) {
        Ju(e, n, ae);
      }
  }
  function Bp(e, n, r) {
    r !== null && typeof r == "object" && typeof r.then == "function" ? r.then(
      function(l) {
        Ip(e, n, l);
      },
      function(l) {
        return Ju(e, n, l);
      }
    ) : Ip(e, n, r);
  }
  function Ip(e, n, r) {
    n.status = "fulfilled", n.value = r, Vp(n), e.state = r, n = e.pending, n !== null && (r = n.next, r === n ? e.pending = null : (r = r.next, n.next = r, Up(e, r)));
  }
  function Ju(e, n, r) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        n.status = "rejected", n.reason = r, Vp(n), n = n.next;
      while (n !== l);
    }
    e.action = null;
  }
  function Vp(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function qp(e, n) {
    return n;
  }
  function Hp(e, n) {
    if (ft) {
      var r = Tt.formState;
      if (r !== null) {
        e: {
          var l = Qe;
          if (ft) {
            if (zt) {
              t: {
                for (var d = zt, h = Xn; d.nodeType !== 8; ) {
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
                zt = Zn(
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
    return r = En(), r.memoizedState = r.baseState = n, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: qp,
      lastRenderedState: n
    }, r.queue = l, r = og.bind(
      null,
      Qe,
      l
    ), l.dispatch = r, l = Zu(!1), h = rd.bind(
      null,
      Qe,
      !1,
      l.queue
    ), l = En(), d = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = d, r = kj.bind(
      null,
      Qe,
      d,
      h,
      r
    ), d.dispatch = r, l.memoizedState = e, [n, r, !1];
  }
  function Fp(e) {
    var n = Kt();
    return Pp(n, wt, e);
  }
  function Pp(e, n, r) {
    if (n = Xu(
      e,
      n,
      qp
    )[0], e = io(_a)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var l = Ti(n);
      } catch (x) {
        throw x === xs ? Ql : x;
      }
    else l = n;
    n = Kt();
    var d = n.queue, h = d.dispatch;
    return r !== n.memoizedState && (Qe.flags |= 2048, Ns(
      9,
      { destroy: void 0 },
      Dj.bind(null, d, r),
      null
    )), [l, h, e];
  }
  function Dj(e, n) {
    e.action = n;
  }
  function Gp(e) {
    var n = Kt(), r = wt;
    if (r !== null)
      return Pp(n, r, e);
    Kt(), n = n.memoizedState, r = Kt();
    var l = r.queue.dispatch;
    return r.memoizedState = e, [n, l, !1];
  }
  function Ns(e, n, r, l) {
    return e = { tag: e, create: r, deps: l, inst: n, next: null }, n = Qe.updateQueue, n === null && (n = ro(), Qe.updateQueue = n), r = n.lastEffect, r === null ? n.lastEffect = e.next = e : (l = r.next, r.next = e, e.next = l, n.lastEffect = e), e;
  }
  function Yp() {
    return Kt().memoizedState;
  }
  function lo(e, n, r, l) {
    var d = En();
    Qe.flags |= e, d.memoizedState = Ns(
      1 | n,
      { destroy: void 0 },
      r,
      l === void 0 ? null : l
    );
  }
  function oo(e, n, r, l) {
    var d = Kt();
    l = l === void 0 ? null : l;
    var h = d.memoizedState.inst;
    wt !== null && l !== null && Hu(l, wt.memoizedState.deps) ? d.memoizedState = Ns(n, h, r, l) : (Qe.flags |= e, d.memoizedState = Ns(
      1 | n,
      h,
      r,
      l
    ));
  }
  function Kp(e, n) {
    lo(8390656, 8, e, n);
  }
  function Wu(e, n) {
    oo(2048, 8, e, n);
  }
  function zj(e) {
    Qe.flags |= 4;
    var n = Qe.updateQueue;
    if (n === null)
      n = ro(), Qe.updateQueue = n, n.events = [e];
    else {
      var r = n.events;
      r === null ? n.events = [e] : r.push(e);
    }
  }
  function Xp(e) {
    var n = Kt().memoizedState;
    return zj({ ref: n, nextImpl: e }), function() {
      if ((vt & 2) !== 0) throw Error(i(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Qp(e, n) {
    return oo(4, 2, e, n);
  }
  function Zp(e, n) {
    return oo(4, 4, e, n);
  }
  function Jp(e, n) {
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
  function Wp(e, n, r) {
    r = r != null ? r.concat([e]) : null, oo(4, 4, Jp.bind(null, n, e), r);
  }
  function ed() {
  }
  function eg(e, n) {
    var r = Kt();
    n = n === void 0 ? null : n;
    var l = r.memoizedState;
    return n !== null && Hu(n, l[1]) ? l[0] : (r.memoizedState = [e, n], e);
  }
  function tg(e, n) {
    var r = Kt();
    n = n === void 0 ? null : n;
    var l = r.memoizedState;
    if (n !== null && Hu(n, l[1]))
      return l[0];
    if (l = e(), qr) {
      kt(!0);
      try {
        e();
      } finally {
        kt(!1);
      }
    }
    return r.memoizedState = [l, n], l;
  }
  function td(e, n, r) {
    return r === void 0 || (Ra & 1073741824) !== 0 && (ut & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = r, e = nv(), Qe.lanes |= e, ar |= e, r);
  }
  function ng(e, n, r, l) {
    return zn(r, n) ? r : ws.current !== null ? (e = td(e, r, l), zn(e, n) || (tn = !0), e) : (Ra & 42) === 0 || (Ra & 1073741824) !== 0 && (ut & 261930) === 0 ? (tn = !0, e.memoizedState = r) : (e = nv(), Qe.lanes |= e, ar |= e, n);
  }
  function ag(e, n, r, l, d) {
    var h = F.p;
    F.p = h !== 0 && 8 > h ? h : 8;
    var x = A.T, E = {};
    A.T = E, rd(e, !1, n, r);
    try {
      var $ = d(), ae = A.S;
      if (ae !== null && ae(E, $), $ !== null && typeof $ == "object" && typeof $.then == "function") {
        var ue = _j(
          $,
          l
        );
        Ri(
          e,
          n,
          ue,
          In(e)
        );
      } else
        Ri(
          e,
          n,
          l,
          In(e)
        );
    } catch (pe) {
      Ri(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: pe },
        In()
      );
    } finally {
      F.p = h, x !== null && E.types !== null && (x.types = E.types), A.T = x;
    }
  }
  function Oj() {
  }
  function nd(e, n, r, l) {
    if (e.tag !== 5) throw Error(i(476));
    var d = rg(e).queue;
    ag(
      e,
      d,
      n,
      U,
      r === null ? Oj : function() {
        return sg(e), r(l);
      }
    );
  }
  function rg(e) {
    var n = e.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: U,
      baseState: U,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: _a,
        lastRenderedState: U
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
  function sg(e) {
    var n = rg(e);
    n.next === null && (n = e.alternate.memoizedState), Ri(
      e,
      n.next.queue,
      {},
      In()
    );
  }
  function ad() {
    return fn(Pi);
  }
  function ig() {
    return Kt().memoizedState;
  }
  function lg() {
    return Kt().memoizedState;
  }
  function Lj(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var r = In();
          e = Za(r);
          var l = Ja(n, e, r);
          l !== null && (Mn(l, n, r), ji(l, n, r)), n = { cache: ku() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function $j(e, n, r) {
    var l = In();
    r = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, co(e) ? cg(n, r) : (r = Su(e, n, r, l), r !== null && (Mn(r, e, l), ug(r, n, l)));
  }
  function og(e, n, r) {
    var l = In();
    Ri(e, n, r, l);
  }
  function Ri(e, n, r, l) {
    var d = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (co(e)) cg(n, d);
    else {
      var h = e.alternate;
      if (e.lanes === 0 && (h === null || h.lanes === 0) && (h = n.lastRenderedReducer, h !== null))
        try {
          var x = n.lastRenderedState, E = h(x, r);
          if (d.hasEagerState = !0, d.eagerState = E, zn(E, x))
            return Hl(e, n, d, 0), Tt === null && ql(), !1;
        } catch {
        } finally {
        }
      if (r = Su(e, n, d, l), r !== null)
        return Mn(r, e, l), ug(r, n, l), !0;
    }
    return !1;
  }
  function rd(e, n, r, l) {
    if (l = {
      lane: 2,
      revertLane: Ld(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, co(e)) {
      if (n) throw Error(i(479));
    } else
      n = Su(
        e,
        r,
        l,
        2
      ), n !== null && Mn(n, e, 2);
  }
  function co(e) {
    var n = e.alternate;
    return e === Qe || n !== null && n === Qe;
  }
  function cg(e, n) {
    js = no = !0;
    var r = e.pending;
    r === null ? n.next = n : (n.next = r.next, r.next = n), e.pending = n;
  }
  function ug(e, n, r) {
    if ((r & 4194048) !== 0) {
      var l = n.lanes;
      l &= e.pendingLanes, r |= l, n.lanes = r, ct(e, r);
    }
  }
  var _i = {
    readContext: fn,
    use: so,
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
  _i.useEffectEvent = Ht;
  var dg = {
    readContext: fn,
    use: so,
    useCallback: function(e, n) {
      return En().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: fn,
    useEffect: Kp,
    useImperativeHandle: function(e, n, r) {
      r = r != null ? r.concat([e]) : null, lo(
        4194308,
        4,
        Jp.bind(null, n, e),
        r
      );
    },
    useLayoutEffect: function(e, n) {
      return lo(4194308, 4, e, n);
    },
    useInsertionEffect: function(e, n) {
      lo(4, 2, e, n);
    },
    useMemo: function(e, n) {
      var r = En();
      n = n === void 0 ? null : n;
      var l = e();
      if (qr) {
        kt(!0);
        try {
          e();
        } finally {
          kt(!1);
        }
      }
      return r.memoizedState = [l, n], l;
    },
    useReducer: function(e, n, r) {
      var l = En();
      if (r !== void 0) {
        var d = r(n);
        if (qr) {
          kt(!0);
          try {
            r(n);
          } finally {
            kt(!1);
          }
        }
      } else d = n;
      return l.memoizedState = l.baseState = d, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: d
      }, l.queue = e, e = e.dispatch = $j.bind(
        null,
        Qe,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var n = En();
      return e = { current: e }, n.memoizedState = e;
    },
    useState: function(e) {
      e = Zu(e);
      var n = e.queue, r = og.bind(null, Qe, n);
      return n.dispatch = r, [e.memoizedState, r];
    },
    useDebugValue: ed,
    useDeferredValue: function(e, n) {
      var r = En();
      return td(r, e, n);
    },
    useTransition: function() {
      var e = Zu(!1);
      return e = ag.bind(
        null,
        Qe,
        e.queue,
        !0,
        !1
      ), En().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, r) {
      var l = Qe, d = En();
      if (ft) {
        if (r === void 0)
          throw Error(i(407));
        r = r();
      } else {
        if (r = n(), Tt === null)
          throw Error(i(349));
        (ut & 127) !== 0 || kp(l, n, r);
      }
      d.memoizedState = r;
      var h = { value: r, getSnapshot: n };
      return d.queue = h, Kp(zp.bind(null, l, h, e), [
        e
      ]), l.flags |= 2048, Ns(
        9,
        { destroy: void 0 },
        Dp.bind(
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
      var e = En(), n = Tt.identifierPrefix;
      if (ft) {
        var r = ga, l = pa;
        r = (l & ~(1 << 32 - Lt(l) - 1)).toString(32) + r, n = "_" + n + "R_" + r, r = ao++, 0 < r && (n += "H" + r.toString(32)), n += "_";
      } else
        r = Mj++, n = "_" + n + "r_" + r.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: ad,
    useFormState: Hp,
    useActionState: Hp,
    useOptimistic: function(e) {
      var n = En();
      n.memoizedState = n.baseState = e;
      var r = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = r, n = rd.bind(
        null,
        Qe,
        !0,
        r
      ), r.dispatch = n, [e, n];
    },
    useMemoCache: Ku,
    useCacheRefresh: function() {
      return En().memoizedState = Lj.bind(
        null,
        Qe
      );
    },
    useEffectEvent: function(e) {
      var n = En(), r = { impl: e };
      return n.memoizedState = r, function() {
        if ((vt & 2) !== 0)
          throw Error(i(440));
        return r.impl.apply(void 0, arguments);
      };
    }
  }, sd = {
    readContext: fn,
    use: so,
    useCallback: eg,
    useContext: fn,
    useEffect: Wu,
    useImperativeHandle: Wp,
    useInsertionEffect: Qp,
    useLayoutEffect: Zp,
    useMemo: tg,
    useReducer: io,
    useRef: Yp,
    useState: function() {
      return io(_a);
    },
    useDebugValue: ed,
    useDeferredValue: function(e, n) {
      var r = Kt();
      return ng(
        r,
        wt.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = io(_a)[0], n = Kt().memoizedState;
      return [
        typeof e == "boolean" ? e : Ti(e),
        n
      ];
    },
    useSyncExternalStore: Ap,
    useId: ig,
    useHostTransitionStatus: ad,
    useFormState: Fp,
    useActionState: Fp,
    useOptimistic: function(e, n) {
      var r = Kt();
      return $p(r, wt, e, n);
    },
    useMemoCache: Ku,
    useCacheRefresh: lg
  };
  sd.useEffectEvent = Xp;
  var fg = {
    readContext: fn,
    use: so,
    useCallback: eg,
    useContext: fn,
    useEffect: Wu,
    useImperativeHandle: Wp,
    useInsertionEffect: Qp,
    useLayoutEffect: Zp,
    useMemo: tg,
    useReducer: Qu,
    useRef: Yp,
    useState: function() {
      return Qu(_a);
    },
    useDebugValue: ed,
    useDeferredValue: function(e, n) {
      var r = Kt();
      return wt === null ? td(r, e, n) : ng(
        r,
        wt.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = Qu(_a)[0], n = Kt().memoizedState;
      return [
        typeof e == "boolean" ? e : Ti(e),
        n
      ];
    },
    useSyncExternalStore: Ap,
    useId: ig,
    useHostTransitionStatus: ad,
    useFormState: Gp,
    useActionState: Gp,
    useOptimistic: function(e, n) {
      var r = Kt();
      return wt !== null ? $p(r, wt, e, n) : (r.baseState = e, [e, r.queue.dispatch]);
    },
    useMemoCache: Ku,
    useCacheRefresh: lg
  };
  fg.useEffectEvent = Xp;
  function id(e, n, r, l) {
    n = e.memoizedState, r = r(l, n), r = r == null ? n : v({}, n, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
  }
  var ld = {
    enqueueSetState: function(e, n, r) {
      e = e._reactInternals;
      var l = In(), d = Za(l);
      d.payload = n, r != null && (d.callback = r), n = Ja(e, d, l), n !== null && (Mn(n, e, l), ji(n, e, l));
    },
    enqueueReplaceState: function(e, n, r) {
      e = e._reactInternals;
      var l = In(), d = Za(l);
      d.tag = 1, d.payload = n, r != null && (d.callback = r), n = Ja(e, d, l), n !== null && (Mn(n, e, l), ji(n, e, l));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var r = In(), l = Za(r);
      l.tag = 2, n != null && (l.callback = n), n = Ja(e, l, r), n !== null && (Mn(n, e, r), ji(n, e, r));
    }
  };
  function hg(e, n, r, l, d, h, x) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, h, x) : n.prototype && n.prototype.isPureReactComponent ? !pi(r, l) || !pi(d, h) : !0;
  }
  function mg(e, n, r, l) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(r, l), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(r, l), n.state !== e && ld.enqueueReplaceState(n, n.state, null);
  }
  function Hr(e, n) {
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
  function pg(e) {
    Vl(e);
  }
  function gg(e) {
    console.error(e);
  }
  function vg(e) {
    Vl(e);
  }
  function uo(e, n) {
    try {
      var r = e.onUncaughtError;
      r(n.value, { componentStack: n.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function yg(e, n, r) {
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
  function od(e, n, r) {
    return r = Za(r), r.tag = 3, r.payload = { element: null }, r.callback = function() {
      uo(e, n);
    }, r;
  }
  function bg(e) {
    return e = Za(e), e.tag = 3, e;
  }
  function xg(e, n, r, l) {
    var d = r.type.getDerivedStateFromError;
    if (typeof d == "function") {
      var h = l.value;
      e.payload = function() {
        return d(h);
      }, e.callback = function() {
        yg(n, r, l);
      };
    }
    var x = r.stateNode;
    x !== null && typeof x.componentDidCatch == "function" && (e.callback = function() {
      yg(n, r, l), typeof d != "function" && (rr === null ? rr = /* @__PURE__ */ new Set([this]) : rr.add(this));
      var E = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function Uj(e, n, r, l, d) {
    if (r.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (n = r.alternate, n !== null && vs(
        n,
        r,
        d,
        !0
      ), r = Ln.current, r !== null) {
        switch (r.tag) {
          case 31:
          case 13:
            return Qn === null ? jo() : r.alternate === null && Ft === 0 && (Ft = 3), r.flags &= -257, r.flags |= 65536, r.lanes = d, l === Zl ? r.flags |= 16384 : (n = r.updateQueue, n === null ? r.updateQueue = /* @__PURE__ */ new Set([l]) : n.add(l), Dd(e, l, d)), !1;
          case 22:
            return r.flags |= 65536, l === Zl ? r.flags |= 16384 : (n = r.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, r.updateQueue = n) : (r = n.retryQueue, r === null ? n.retryQueue = /* @__PURE__ */ new Set([l]) : r.add(l)), Dd(e, l, d)), !1;
        }
        throw Error(i(435, r.tag));
      }
      return Dd(e, l, d), jo(), !1;
    }
    if (ft)
      return n = Ln.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = d, l !== Tu && (e = Error(i(422), { cause: l }), yi(Gn(e, r)))) : (l !== Tu && (n = Error(i(423), {
        cause: l
      }), yi(
        Gn(n, r)
      )), e = e.current.alternate, e.flags |= 65536, d &= -d, e.lanes |= d, l = Gn(l, r), d = od(
        e.stateNode,
        l,
        d
      ), Uu(e, d), Ft !== 4 && (Ft = 2)), !1;
    var h = Error(i(520), { cause: l });
    if (h = Gn(h, r), $i === null ? $i = [h] : $i.push(h), Ft !== 4 && (Ft = 2), n === null) return !0;
    l = Gn(l, r), r = n;
    do {
      switch (r.tag) {
        case 3:
          return r.flags |= 65536, e = d & -d, r.lanes |= e, e = od(r.stateNode, l, e), Uu(r, e), !1;
        case 1:
          if (n = r.type, h = r.stateNode, (r.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (rr === null || !rr.has(h))))
            return r.flags |= 65536, d &= -d, r.lanes |= d, d = bg(d), xg(
              d,
              e,
              r,
              l
            ), Uu(r, d), !1;
      }
      r = r.return;
    } while (r !== null);
    return !1;
  }
  var cd = Error(i(461)), tn = !1;
  function hn(e, n, r, l) {
    n.child = e === null ? Ep(n, null, r, l) : Vr(
      n,
      e.child,
      r,
      l
    );
  }
  function Sg(e, n, r, l, d) {
    r = r.render;
    var h = n.ref;
    if ("ref" in l) {
      var x = {};
      for (var E in l)
        E !== "ref" && (x[E] = l[E]);
    } else x = l;
    return $r(n), l = Fu(
      e,
      n,
      r,
      x,
      h,
      d
    ), E = Pu(), e !== null && !tn ? (Gu(e, n, d), Ma(e, n, d)) : (ft && E && Nu(n), n.flags |= 1, hn(e, n, l, d), n.child);
  }
  function wg(e, n, r, l, d) {
    if (e === null) {
      var h = r.type;
      return typeof h == "function" && !wu(h) && h.defaultProps === void 0 && r.compare === null ? (n.tag = 15, n.type = h, jg(
        e,
        n,
        h,
        l,
        d
      )) : (e = Pl(
        r.type,
        null,
        l,
        n,
        n.mode,
        d
      ), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (h = e.child, !vd(e, d)) {
      var x = h.memoizedProps;
      if (r = r.compare, r = r !== null ? r : pi, r(x, l) && e.ref === n.ref)
        return Ma(e, n, d);
    }
    return n.flags |= 1, e = Ea(h, l), e.ref = n.ref, e.return = n, n.child = e;
  }
  function jg(e, n, r, l, d) {
    if (e !== null) {
      var h = e.memoizedProps;
      if (pi(h, l) && e.ref === n.ref)
        if (tn = !1, n.pendingProps = l = h, vd(e, d))
          (e.flags & 131072) !== 0 && (tn = !0);
        else
          return n.lanes = e.lanes, Ma(e, n, d);
    }
    return ud(
      e,
      n,
      r,
      l,
      d
    );
  }
  function Eg(e, n, r, l) {
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
        return Ng(
          e,
          n,
          h,
          r,
          l
        );
      }
      if ((r & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Xl(
          n,
          h !== null ? h.cachePool : null
        ), h !== null ? Tp(n, h) : Iu(), Rp(n);
      else
        return l = n.lanes = 536870912, Ng(
          e,
          n,
          h !== null ? h.baseLanes | r : r,
          r,
          l
        );
    } else
      h !== null ? (Xl(n, h.cachePool), Tp(n, h), er(), n.memoizedState = null) : (e !== null && Xl(n, null), Iu(), er());
    return hn(e, n, d, r), n.child;
  }
  function Mi(e, n) {
    return e !== null && e.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function Ng(e, n, r, l, d) {
    var h = zu();
    return h = h === null ? null : { parent: Wt._currentValue, pool: h }, n.memoizedState = {
      baseLanes: r,
      cachePool: h
    }, e !== null && Xl(n, null), Iu(), Rp(n), e !== null && vs(e, n, l, !0), n.childLanes = d, null;
  }
  function fo(e, n) {
    return n = mo(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function Cg(e, n, r) {
    return Vr(n, e.child, null, r), e = fo(n, n.pendingProps), e.flags |= 2, $n(n), n.memoizedState = null, e;
  }
  function Bj(e, n, r) {
    var l = n.pendingProps, d = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (ft) {
        if (l.mode === "hidden")
          return e = fo(n, l), n.lanes = 536870912, Mi(null, e);
        if (qu(n), (e = zt) ? (e = Uv(
          e,
          Xn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Ga !== null ? { id: pa, overflow: ga } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = cp(e), r.return = n, n.child = r, dn = n, zt = null)) : e = null, e === null) throw Ka(n);
        return n.lanes = 536870912, null;
      }
      return fo(n, l);
    }
    var h = e.memoizedState;
    if (h !== null) {
      var x = h.dehydrated;
      if (qu(n), d)
        if (n.flags & 256)
          n.flags &= -257, n = Cg(
            e,
            n,
            r
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(i(558));
      else if (tn || vs(e, n, r, !1), d = (r & e.childLanes) !== 0, tn || d) {
        if (l = Tt, l !== null && (x = z(l, r), x !== 0 && x !== h.retryLane))
          throw h.retryLane = x, Dr(e, x), Mn(l, e, x), cd;
        jo(), n = Cg(
          e,
          n,
          r
        );
      } else
        e = h.treeContext, zt = Zn(x.nextSibling), dn = n, ft = !0, Ya = null, Xn = !1, e !== null && fp(n, e), n = fo(n, l), n.flags |= 4096;
      return n;
    }
    return e = Ea(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = n.ref, n.child = e, e.return = n, e;
  }
  function ho(e, n) {
    var r = n.ref;
    if (r === null)
      e !== null && e.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof r != "function" && typeof r != "object")
        throw Error(i(284));
      (e === null || e.ref !== r) && (n.flags |= 4194816);
    }
  }
  function ud(e, n, r, l, d) {
    return $r(n), r = Fu(
      e,
      n,
      r,
      l,
      void 0,
      d
    ), l = Pu(), e !== null && !tn ? (Gu(e, n, d), Ma(e, n, d)) : (ft && l && Nu(n), n.flags |= 1, hn(e, n, r, d), n.child);
  }
  function Tg(e, n, r, l, d, h) {
    return $r(n), n.updateQueue = null, r = Mp(
      n,
      l,
      r,
      d
    ), _p(e), l = Pu(), e !== null && !tn ? (Gu(e, n, h), Ma(e, n, h)) : (ft && l && Nu(n), n.flags |= 1, hn(e, n, r, h), n.child);
  }
  function Rg(e, n, r, l, d) {
    if ($r(n), n.stateNode === null) {
      var h = hs, x = r.contextType;
      typeof x == "object" && x !== null && (h = fn(x)), h = new r(l, h), n.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, h.updater = ld, n.stateNode = h, h._reactInternals = n, h = n.stateNode, h.props = l, h.state = n.memoizedState, h.refs = {}, Lu(n), x = r.contextType, h.context = typeof x == "object" && x !== null ? fn(x) : hs, h.state = n.memoizedState, x = r.getDerivedStateFromProps, typeof x == "function" && (id(
        n,
        r,
        x,
        l
      ), h.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (x = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), x !== h.state && ld.enqueueReplaceState(h, h.state, null), Ni(n, l, h, d), Ei(), h.state = n.memoizedState), typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !0;
    } else if (e === null) {
      h = n.stateNode;
      var E = n.memoizedProps, $ = Hr(r, E);
      h.props = $;
      var ae = h.context, ue = r.contextType;
      x = hs, typeof ue == "object" && ue !== null && (x = fn(ue));
      var pe = r.getDerivedStateFromProps;
      ue = typeof pe == "function" || typeof h.getSnapshotBeforeUpdate == "function", E = n.pendingProps !== E, ue || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (E || ae !== x) && mg(
        n,
        h,
        l,
        x
      ), Qa = !1;
      var le = n.memoizedState;
      h.state = le, Ni(n, l, h, d), Ei(), ae = n.memoizedState, E || le !== ae || Qa ? (typeof pe == "function" && (id(
        n,
        r,
        pe,
        l
      ), ae = n.memoizedState), ($ = Qa || hg(
        n,
        r,
        $,
        l,
        le,
        ae,
        x
      )) ? (ue || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = l, n.memoizedState = ae), h.props = l, h.state = ae, h.context = x, l = $) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !1);
    } else {
      h = n.stateNode, $u(e, n), x = n.memoizedProps, ue = Hr(r, x), h.props = ue, pe = n.pendingProps, le = h.context, ae = r.contextType, $ = hs, typeof ae == "object" && ae !== null && ($ = fn(ae)), E = r.getDerivedStateFromProps, (ae = typeof E == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (x !== pe || le !== $) && mg(
        n,
        h,
        l,
        $
      ), Qa = !1, le = n.memoizedState, h.state = le, Ni(n, l, h, d), Ei();
      var oe = n.memoizedState;
      x !== pe || le !== oe || Qa || e !== null && e.dependencies !== null && Yl(e.dependencies) ? (typeof E == "function" && (id(
        n,
        r,
        E,
        l
      ), oe = n.memoizedState), (ue = Qa || hg(
        n,
        r,
        ue,
        l,
        le,
        oe,
        $
      ) || e !== null && e.dependencies !== null && Yl(e.dependencies)) ? (ae || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(l, oe, $), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(
        l,
        oe,
        $
      )), typeof h.componentDidUpdate == "function" && (n.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || x === e.memoizedProps && le === e.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && le === e.memoizedState || (n.flags |= 1024), n.memoizedProps = l, n.memoizedState = oe), h.props = l, h.state = oe, h.context = $, l = ue) : (typeof h.componentDidUpdate != "function" || x === e.memoizedProps && le === e.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && le === e.memoizedState || (n.flags |= 1024), l = !1);
    }
    return h = l, ho(e, n), l = (n.flags & 128) !== 0, h || l ? (h = n.stateNode, r = l && typeof r.getDerivedStateFromError != "function" ? null : h.render(), n.flags |= 1, e !== null && l ? (n.child = Vr(
      n,
      e.child,
      null,
      d
    ), n.child = Vr(
      n,
      null,
      r,
      d
    )) : hn(e, n, r, d), n.memoizedState = h.state, e = n.child) : e = Ma(
      e,
      n,
      d
    ), e;
  }
  function _g(e, n, r, l) {
    return Or(), n.flags |= 256, hn(e, n, r, l), n.child;
  }
  var dd = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function fd(e) {
    return { baseLanes: e, cachePool: yp() };
  }
  function hd(e, n, r) {
    return e = e !== null ? e.childLanes & ~r : 0, n && (e |= Bn), e;
  }
  function Mg(e, n, r) {
    var l = n.pendingProps, d = !1, h = (n.flags & 128) !== 0, x;
    if ((x = h) || (x = e !== null && e.memoizedState === null ? !1 : (Yt.current & 2) !== 0), x && (d = !0, n.flags &= -129), x = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (ft) {
        if (d ? Wa(n) : er(), (e = zt) ? (e = Uv(
          e,
          Xn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Ga !== null ? { id: pa, overflow: ga } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = cp(e), r.return = n, n.child = r, dn = n, zt = null)) : e = null, e === null) throw Ka(n);
        return Xd(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var E = l.children;
      return l = l.fallback, d ? (er(), d = n.mode, E = mo(
        { mode: "hidden", children: E },
        d
      ), l = zr(
        l,
        d,
        r,
        null
      ), E.return = n, l.return = n, E.sibling = l, n.child = E, l = n.child, l.memoizedState = fd(r), l.childLanes = hd(
        e,
        x,
        r
      ), n.memoizedState = dd, Mi(null, l)) : (Wa(n), md(n, E));
    }
    var $ = e.memoizedState;
    if ($ !== null && (E = $.dehydrated, E !== null)) {
      if (h)
        n.flags & 256 ? (Wa(n), n.flags &= -257, n = pd(
          e,
          n,
          r
        )) : n.memoizedState !== null ? (er(), n.child = e.child, n.flags |= 128, n = null) : (er(), E = l.fallback, d = n.mode, l = mo(
          { mode: "visible", children: l.children },
          d
        ), E = zr(
          E,
          d,
          r,
          null
        ), E.flags |= 2, l.return = n, E.return = n, l.sibling = E, n.child = l, Vr(
          n,
          e.child,
          null,
          r
        ), l = n.child, l.memoizedState = fd(r), l.childLanes = hd(
          e,
          x,
          r
        ), n.memoizedState = dd, n = Mi(null, l));
      else if (Wa(n), Xd(E)) {
        if (x = E.nextSibling && E.nextSibling.dataset, x) var ae = x.dgst;
        x = ae, l = Error(i(419)), l.stack = "", l.digest = x, yi({ value: l, source: null, stack: null }), n = pd(
          e,
          n,
          r
        );
      } else if (tn || vs(e, n, r, !1), x = (r & e.childLanes) !== 0, tn || x) {
        if (x = Tt, x !== null && (l = z(x, r), l !== 0 && l !== $.retryLane))
          throw $.retryLane = l, Dr(e, l), Mn(x, e, l), cd;
        Kd(E) || jo(), n = pd(
          e,
          n,
          r
        );
      } else
        Kd(E) ? (n.flags |= 192, n.child = e.child, n = null) : (e = $.treeContext, zt = Zn(
          E.nextSibling
        ), dn = n, ft = !0, Ya = null, Xn = !1, e !== null && fp(n, e), n = md(
          n,
          l.children
        ), n.flags |= 4096);
      return n;
    }
    return d ? (er(), E = l.fallback, d = n.mode, $ = e.child, ae = $.sibling, l = Ea($, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = $.subtreeFlags & 65011712, ae !== null ? E = Ea(
      ae,
      E
    ) : (E = zr(
      E,
      d,
      r,
      null
    ), E.flags |= 2), E.return = n, l.return = n, l.sibling = E, n.child = l, Mi(null, l), l = n.child, E = e.child.memoizedState, E === null ? E = fd(r) : (d = E.cachePool, d !== null ? ($ = Wt._currentValue, d = d.parent !== $ ? { parent: $, pool: $ } : d) : d = yp(), E = {
      baseLanes: E.baseLanes | r,
      cachePool: d
    }), l.memoizedState = E, l.childLanes = hd(
      e,
      x,
      r
    ), n.memoizedState = dd, Mi(e.child, l)) : (Wa(n), r = e.child, e = r.sibling, r = Ea(r, {
      mode: "visible",
      children: l.children
    }), r.return = n, r.sibling = null, e !== null && (x = n.deletions, x === null ? (n.deletions = [e], n.flags |= 16) : x.push(e)), n.child = r, n.memoizedState = null, r);
  }
  function md(e, n) {
    return n = mo(
      { mode: "visible", children: n },
      e.mode
    ), n.return = e, e.child = n;
  }
  function mo(e, n) {
    return e = On(22, e, null, n), e.lanes = 0, e;
  }
  function pd(e, n, r) {
    return Vr(n, e.child, null, r), e = md(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function Ag(e, n, r) {
    e.lanes |= n;
    var l = e.alternate;
    l !== null && (l.lanes |= n), Mu(e.return, n, r);
  }
  function gd(e, n, r, l, d, h) {
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
  function kg(e, n, r) {
    var l = n.pendingProps, d = l.revealOrder, h = l.tail;
    l = l.children;
    var x = Yt.current, E = (x & 2) !== 0;
    if (E ? (x = x & 1 | 2, n.flags |= 128) : x &= 1, te(Yt, x), hn(e, n, l, r), l = ft ? vi : 0, !E && e !== null && (e.flags & 128) !== 0)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Ag(e, r, n);
        else if (e.tag === 19)
          Ag(e, r, n);
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
          e = r.alternate, e !== null && to(e) === null && (d = r), r = r.sibling;
        r = d, r === null ? (d = n.child, n.child = null) : (d = r.sibling, r.sibling = null), gd(
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
          if (e = d.alternate, e !== null && to(e) === null) {
            n.child = d;
            break;
          }
          e = d.sibling, d.sibling = r, r = d, d = e;
        }
        gd(
          n,
          !0,
          r,
          null,
          h,
          l
        );
        break;
      case "together":
        gd(
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
        if (vs(
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
  function vd(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Yl(e)));
  }
  function Ij(e, n, r) {
    switch (n.tag) {
      case 3:
        ye(n, n.stateNode.containerInfo), Xa(n, Wt, e.memoizedState.cache), Or();
        break;
      case 27:
      case 5:
        lt(n);
        break;
      case 4:
        ye(n, n.stateNode.containerInfo);
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
          return n.flags |= 128, qu(n), null;
        break;
      case 13:
        var l = n.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (Wa(n), n.flags |= 128, null) : (r & n.child.childLanes) !== 0 ? Mg(e, n, r) : (Wa(n), e = Ma(
            e,
            n,
            r
          ), e !== null ? e.sibling : null);
        Wa(n);
        break;
      case 19:
        var d = (e.flags & 128) !== 0;
        if (l = (r & n.childLanes) !== 0, l || (vs(
          e,
          n,
          r,
          !1
        ), l = (r & n.childLanes) !== 0), d) {
          if (l)
            return kg(
              e,
              n,
              r
            );
          n.flags |= 128;
        }
        if (d = n.memoizedState, d !== null && (d.rendering = null, d.tail = null, d.lastEffect = null), te(Yt, Yt.current), l) break;
        return null;
      case 22:
        return n.lanes = 0, Eg(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        Xa(n, Wt, e.memoizedState.cache);
    }
    return Ma(e, n, r);
  }
  function Dg(e, n, r) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        tn = !0;
      else {
        if (!vd(e, r) && (n.flags & 128) === 0)
          return tn = !1, Ij(
            e,
            n,
            r
          );
        tn = (e.flags & 131072) !== 0;
      }
    else
      tn = !1, ft && (n.flags & 1048576) !== 0 && dp(n, vi, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var l = n.pendingProps;
          if (e = Br(n.elementType), n.type = e, typeof e == "function")
            wu(e) ? (l = Hr(e, l), n.tag = 1, n = Rg(
              null,
              n,
              e,
              l,
              r
            )) : (n.tag = 0, n = ud(
              null,
              n,
              e,
              l,
              r
            ));
          else {
            if (e != null) {
              var d = e.$$typeof;
              if (d === C) {
                n.tag = 11, n = Sg(
                  null,
                  n,
                  e,
                  l,
                  r
                );
                break e;
              } else if (d === ie) {
                n.tag = 14, n = wg(
                  null,
                  n,
                  e,
                  l,
                  r
                );
                break e;
              }
            }
            throw n = G(e) || e, Error(i(306, n, ""));
          }
        }
        return n;
      case 0:
        return ud(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 1:
        return l = n.type, d = Hr(
          l,
          n.pendingProps
        ), Rg(
          e,
          n,
          l,
          d,
          r
        );
      case 3:
        e: {
          if (ye(
            n,
            n.stateNode.containerInfo
          ), e === null) throw Error(i(387));
          l = n.pendingProps;
          var h = n.memoizedState;
          d = h.element, $u(e, n), Ni(n, l, null, r);
          var x = n.memoizedState;
          if (l = x.cache, Xa(n, Wt, l), l !== h.cache && Au(
            n,
            [Wt],
            r,
            !0
          ), Ei(), l = x.element, h.isDehydrated)
            if (h = {
              element: l,
              isDehydrated: !1,
              cache: x.cache
            }, n.updateQueue.baseState = h, n.memoizedState = h, n.flags & 256) {
              n = _g(
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
              ), yi(d), n = _g(
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
              for (zt = Zn(e.firstChild), dn = n, ft = !0, Ya = null, Xn = !0, r = Ep(
                n,
                null,
                l,
                r
              ), n.child = r; r; )
                r.flags = r.flags & -3 | 4096, r = r.sibling;
            }
          else {
            if (Or(), l === d) {
              n = Ma(
                e,
                n,
                r
              );
              break e;
            }
            hn(e, n, l, r);
          }
          n = n.child;
        }
        return n;
      case 26:
        return ho(e, n), e === null ? (r = Fv(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = r : ft || (r = n.type, e = n.pendingProps, l = Mo(
          W.current
        ).createElement(r), l[Ee] = n, l[Ne] = e, mn(l, r, e), Mt(l), n.stateNode = l) : n.memoizedState = Fv(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return lt(n), e === null && ft && (l = n.stateNode = Vv(
          n.type,
          n.pendingProps,
          W.current
        ), dn = n, Xn = !0, d = zt, or(n.type) ? (Qd = d, zt = Zn(l.firstChild)) : zt = d), hn(
          e,
          n,
          n.pendingProps.children,
          r
        ), ho(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && ft && ((d = l = zt) && (l = gE(
          l,
          n.type,
          n.pendingProps,
          Xn
        ), l !== null ? (n.stateNode = l, dn = n, zt = Zn(l.firstChild), Xn = !1, d = !0) : d = !1), d || Ka(n)), lt(n), d = n.type, h = n.pendingProps, x = e !== null ? e.memoizedProps : null, l = h.children, Pd(d, h) ? l = null : x !== null && Pd(d, x) && (n.flags |= 32), n.memoizedState !== null && (d = Fu(
          e,
          n,
          Aj,
          null,
          null,
          r
        ), Pi._currentValue = d), ho(e, n), hn(e, n, l, r), n.child;
      case 6:
        return e === null && ft && ((e = r = zt) && (r = vE(
          r,
          n.pendingProps,
          Xn
        ), r !== null ? (n.stateNode = r, dn = n, zt = null, e = !0) : e = !1), e || Ka(n)), null;
      case 13:
        return Mg(e, n, r);
      case 4:
        return ye(
          n,
          n.stateNode.containerInfo
        ), l = n.pendingProps, e === null ? n.child = Vr(
          n,
          null,
          l,
          r
        ) : hn(e, n, l, r), n.child;
      case 11:
        return Sg(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 7:
        return hn(
          e,
          n,
          n.pendingProps,
          r
        ), n.child;
      case 8:
        return hn(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 12:
        return hn(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 10:
        return l = n.pendingProps, Xa(n, n.type, l.value), hn(e, n, l.children, r), n.child;
      case 9:
        return d = n.type._context, l = n.pendingProps.children, $r(n), d = fn(d), l = l(d), n.flags |= 1, hn(e, n, l, r), n.child;
      case 14:
        return wg(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 15:
        return jg(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 19:
        return kg(e, n, r);
      case 31:
        return Bj(e, n, r);
      case 22:
        return Eg(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        return $r(n), l = fn(Wt), e === null ? (d = zu(), d === null && (d = Tt, h = ku(), d.pooledCache = h, h.refCount++, h !== null && (d.pooledCacheLanes |= r), d = h), n.memoizedState = { parent: l, cache: d }, Lu(n), Xa(n, Wt, d)) : ((e.lanes & r) !== 0 && ($u(e, n), Ni(n, null, null, r), Ei()), d = e.memoizedState, h = n.memoizedState, d.parent !== l ? (d = { parent: l, cache: l }, n.memoizedState = d, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = d), Xa(n, Wt, l)) : (l = h.cache, Xa(n, Wt, l), l !== d.cache && Au(
          n,
          [Wt],
          r,
          !0
        ))), hn(
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
  function yd(e, n, r, l, d) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (d & 335544128) === d)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (iv()) e.flags |= 8192;
        else
          throw Ir = Zl, Ou;
    } else e.flags &= -16777217;
  }
  function zg(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Xv(n))
      if (iv()) e.flags |= 8192;
      else
        throw Ir = Zl, Ou;
  }
  function po(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? be() : 536870912, e.lanes |= n, _s |= n);
  }
  function Ai(e, n) {
    if (!ft)
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
  function Ot(e) {
    var n = e.alternate !== null && e.alternate.child === e.child, r = 0, l = 0;
    if (n)
      for (var d = e.child; d !== null; )
        r |= d.lanes | d.childLanes, l |= d.subtreeFlags & 65011712, l |= d.flags & 65011712, d.return = e, d = d.sibling;
    else
      for (d = e.child; d !== null; )
        r |= d.lanes | d.childLanes, l |= d.subtreeFlags, l |= d.flags, d.return = e, d = d.sibling;
    return e.subtreeFlags |= l, e.childLanes = r, n;
  }
  function Vj(e, n, r) {
    var l = n.pendingProps;
    switch (Cu(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ot(n), null;
      case 1:
        return Ot(n), null;
      case 3:
        return r = n.stateNode, l = null, e !== null && (l = e.memoizedState.cache), n.memoizedState.cache !== l && (n.flags |= 2048), Ta(Wt), Me(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (gs(n) ? Aa(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Ru())), Ot(n), null;
      case 26:
        var d = n.type, h = n.memoizedState;
        return e === null ? (Aa(n), h !== null ? (Ot(n), zg(n, h)) : (Ot(n), yd(
          n,
          d,
          null,
          l,
          r
        ))) : h ? h !== e.memoizedState ? (Aa(n), Ot(n), zg(n, h)) : (Ot(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== l && Aa(n), Ot(n), yd(
          n,
          d,
          e,
          l,
          r
        )), null;
      case 27:
        if (Ce(n), r = W.current, d = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== l && Aa(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(i(166));
            return Ot(n), null;
          }
          e = K.current, gs(n) ? hp(n) : (e = Vv(d, l, r), n.stateNode = e, Aa(n));
        }
        return Ot(n), null;
      case 5:
        if (Ce(n), d = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== l && Aa(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(i(166));
            return Ot(n), null;
          }
          if (h = K.current, gs(n))
            hp(n);
          else {
            var x = Mo(
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
            h[Ee] = n, h[Ne] = l;
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
            e: switch (mn(h, d, l), d) {
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
        return Ot(n), yd(
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
          if (e = W.current, gs(n)) {
            if (e = n.stateNode, r = n.memoizedProps, l = null, d = dn, d !== null)
              switch (d.tag) {
                case 27:
                case 5:
                  l = d.memoizedProps;
              }
            e[Ee] = n, e = !!(e.nodeValue === r || l !== null && l.suppressHydrationWarning === !0 || Mv(e.nodeValue, r)), e || Ka(n, !0);
          } else
            e = Mo(e).createTextNode(
              l
            ), e[Ee] = n, n.stateNode = e;
        }
        return Ot(n), null;
      case 31:
        if (r = n.memoizedState, e === null || e.memoizedState !== null) {
          if (l = gs(n), r !== null) {
            if (e === null) {
              if (!l) throw Error(i(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(557));
              e[Ee] = n;
            } else
              Or(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Ot(n), e = !1;
          } else
            r = Ru(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = r), e = !0;
          if (!e)
            return n.flags & 256 ? ($n(n), n) : ($n(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(i(558));
        }
        return Ot(n), null;
      case 13:
        if (l = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (d = gs(n), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!d) throw Error(i(318));
              if (d = n.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(i(317));
              d[Ee] = n;
            } else
              Or(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Ot(n), d = !1;
          } else
            d = Ru(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = d), d = !0;
          if (!d)
            return n.flags & 256 ? ($n(n), n) : ($n(n), null);
        }
        return $n(n), (n.flags & 128) !== 0 ? (n.lanes = r, n) : (r = l !== null, e = e !== null && e.memoizedState !== null, r && (l = n.child, d = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (d = l.alternate.memoizedState.cachePool.pool), h = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (h = l.memoizedState.cachePool.pool), h !== d && (l.flags |= 2048)), r !== e && r && (n.child.flags |= 8192), po(n, n.updateQueue), Ot(n), null);
      case 4:
        return Me(), e === null && Id(n.stateNode.containerInfo), Ot(n), null;
      case 10:
        return Ta(n.type), Ot(n), null;
      case 19:
        if (ee(Yt), l = n.memoizedState, l === null) return Ot(n), null;
        if (d = (n.flags & 128) !== 0, h = l.rendering, h === null)
          if (d) Ai(l, !1);
          else {
            if (Ft !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (h = to(e), h !== null) {
                  for (n.flags |= 128, Ai(l, !1), e = h.updateQueue, n.updateQueue = e, po(n, e), n.subtreeFlags = 0, e = r, r = n.child; r !== null; )
                    op(r, e), r = r.sibling;
                  return te(
                    Yt,
                    Yt.current & 1 | 2
                  ), ft && Na(n, l.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            l.tail !== null && gt() > xo && (n.flags |= 128, d = !0, Ai(l, !1), n.lanes = 4194304);
          }
        else {
          if (!d)
            if (e = to(h), e !== null) {
              if (n.flags |= 128, d = !0, e = e.updateQueue, n.updateQueue = e, po(n, e), Ai(l, !0), l.tail === null && l.tailMode === "hidden" && !h.alternate && !ft)
                return Ot(n), null;
            } else
              2 * gt() - l.renderingStartTime > xo && r !== 536870912 && (n.flags |= 128, d = !0, Ai(l, !1), n.lanes = 4194304);
          l.isBackwards ? (h.sibling = n.child, n.child = h) : (e = l.last, e !== null ? e.sibling = h : n.child = h, l.last = h);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = gt(), e.sibling = null, r = Yt.current, te(
          Yt,
          d ? r & 1 | 2 : r & 1
        ), ft && Na(n, l.treeForkCount), e) : (Ot(n), null);
      case 22:
      case 23:
        return $n(n), Vu(), l = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (n.flags |= 8192) : l && (n.flags |= 8192), l ? (r & 536870912) !== 0 && (n.flags & 128) === 0 && (Ot(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Ot(n), r = n.updateQueue, r !== null && po(n, r.retryQueue), r = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== r && (n.flags |= 2048), e !== null && ee(Ur), null;
      case 24:
        return r = null, e !== null && (r = e.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), Ta(Wt), Ot(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(i(156, n.tag));
  }
  function qj(e, n) {
    switch (Cu(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return Ta(Wt), Me(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Ce(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if ($n(n), n.alternate === null)
            throw Error(i(340));
          Or();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 13:
        if ($n(n), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(i(340));
          Or();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return ee(Yt), null;
      case 4:
        return Me(), null;
      case 10:
        return Ta(n.type), null;
      case 22:
      case 23:
        return $n(n), Vu(), e !== null && ee(Ur), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return Ta(Wt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Og(e, n) {
    switch (Cu(n), n.tag) {
      case 3:
        Ta(Wt), Me();
        break;
      case 26:
      case 27:
      case 5:
        Ce(n);
        break;
      case 4:
        Me();
        break;
      case 31:
        n.memoizedState !== null && $n(n);
        break;
      case 13:
        $n(n);
        break;
      case 19:
        ee(Yt);
        break;
      case 10:
        Ta(n.type);
        break;
      case 22:
      case 23:
        $n(n), Vu(), e !== null && ee(Ur);
        break;
      case 24:
        Ta(Wt);
    }
  }
  function ki(e, n) {
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
              var $ = r, ae = E;
              try {
                ae();
              } catch (ue) {
                xt(
                  d,
                  $,
                  ue
                );
              }
            }
          }
          l = l.next;
        } while (l !== h);
      }
    } catch (ue) {
      xt(n, n.return, ue);
    }
  }
  function Lg(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var r = e.stateNode;
      try {
        Cp(n, r);
      } catch (l) {
        xt(e, e.return, l);
      }
    }
  }
  function $g(e, n, r) {
    r.props = Hr(
      e.type,
      e.memoizedProps
    ), r.state = e.memoizedState;
    try {
      r.componentWillUnmount();
    } catch (l) {
      xt(e, n, l);
    }
  }
  function Di(e, n) {
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
  function va(e, n) {
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
  function Ug(e) {
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
  function bd(e, n, r) {
    try {
      var l = e.stateNode;
      uE(l, e.type, r, n), l[Ne] = n;
    } catch (d) {
      xt(e, e.return, d);
    }
  }
  function Bg(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && or(e.type) || e.tag === 4;
  }
  function xd(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Bg(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && or(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Sd(e, n, r) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, n ? (r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r).insertBefore(e, n) : (n = r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r, n.appendChild(e), r = r._reactRootContainer, r != null || n.onclick !== null || (n.onclick = wa));
    else if (l !== 4 && (l === 27 && or(e.type) && (r = e.stateNode, n = null), e = e.child, e !== null))
      for (Sd(e, n, r), e = e.sibling; e !== null; )
        Sd(e, n, r), e = e.sibling;
  }
  function go(e, n, r) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, n ? r.insertBefore(e, n) : r.appendChild(e);
    else if (l !== 4 && (l === 27 && or(e.type) && (r = e.stateNode), e = e.child, e !== null))
      for (go(e, n, r), e = e.sibling; e !== null; )
        go(e, n, r), e = e.sibling;
  }
  function Ig(e) {
    var n = e.stateNode, r = e.memoizedProps;
    try {
      for (var l = e.type, d = n.attributes; d.length; )
        n.removeAttributeNode(d[0]);
      mn(n, l, r), n[Ee] = e, n[Ne] = r;
    } catch (h) {
      xt(e, e.return, h);
    }
  }
  var ka = !1, nn = !1, wd = !1, Vg = typeof WeakSet == "function" ? WeakSet : Set, cn = null;
  function Hj(e, n) {
    if (e = e.containerInfo, Hd = $o, e = Wm(e), pu(e)) {
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
            var x = 0, E = -1, $ = -1, ae = 0, ue = 0, pe = e, le = null;
            t: for (; ; ) {
              for (var oe; pe !== r || d !== 0 && pe.nodeType !== 3 || (E = x + d), pe !== h || l !== 0 && pe.nodeType !== 3 || ($ = x + l), pe.nodeType === 3 && (x += pe.nodeValue.length), (oe = pe.firstChild) !== null; )
                le = pe, pe = oe;
              for (; ; ) {
                if (pe === e) break t;
                if (le === r && ++ae === d && (E = x), le === h && ++ue === l && ($ = x), (oe = pe.nextSibling) !== null) break;
                pe = le, le = pe.parentNode;
              }
              pe = oe;
            }
            r = E === -1 || $ === -1 ? null : { start: E, end: $ };
          } else r = null;
        }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (Fd = { focusedElem: e, selectionRange: r }, $o = !1, cn = n; cn !== null; )
      if (n = cn, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = n, cn = e;
      else
        for (; cn !== null; ) {
          switch (n = cn, h = n.alternate, e = n.flags, n.tag) {
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
                  var ke = Hr(
                    r.type,
                    d
                  );
                  e = l.getSnapshotBeforeUpdate(
                    ke,
                    h
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Ve) {
                  xt(
                    r,
                    r.return,
                    Ve
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = n.stateNode.containerInfo, r = e.nodeType, r === 9)
                  Yd(e);
                else if (r === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Yd(e);
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
            e.return = n.return, cn = e;
            break;
          }
          cn = n.return;
        }
  }
  function qg(e, n, r) {
    var l = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 15:
        za(e, r), l & 4 && ki(5, r);
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
            var d = Hr(
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
        l & 64 && Lg(r), l & 512 && Di(r, r.return);
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
            Cp(e, n);
          } catch (x) {
            xt(r, r.return, x);
          }
        }
        break;
      case 27:
        n === null && l & 4 && Ig(r);
      case 26:
      case 5:
        za(e, r), n === null && l & 4 && Ug(r), l & 512 && Di(r, r.return);
        break;
      case 12:
        za(e, r);
        break;
      case 31:
        za(e, r), l & 4 && Pg(e, r);
        break;
      case 13:
        za(e, r), l & 4 && Gg(e, r), l & 64 && (e = r.memoizedState, e !== null && (e = e.dehydrated, e !== null && (r = Jj.bind(
          null,
          r
        ), yE(e, r))));
        break;
      case 22:
        if (l = r.memoizedState !== null || ka, !l) {
          n = n !== null && n.memoizedState !== null || nn, d = ka;
          var h = nn;
          ka = l, (nn = n) && !h ? Oa(
            e,
            r,
            (r.subtreeFlags & 8772) !== 0
          ) : za(e, r), ka = d, nn = h;
        }
        break;
      case 30:
        break;
      default:
        za(e, r);
    }
  }
  function Hg(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, Hg(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && Ct(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Ut = null, Cn = !1;
  function Da(e, n, r) {
    for (r = r.child; r !== null; )
      Fg(e, n, r), r = r.sibling;
  }
  function Fg(e, n, r) {
    if (Pt && typeof Pt.onCommitFiberUnmount == "function")
      try {
        Pt.onCommitFiberUnmount(wn, r);
      } catch {
      }
    switch (r.tag) {
      case 26:
        nn || va(r, n), Da(
          e,
          n,
          r
        ), r.memoizedState ? r.memoizedState.count-- : r.stateNode && (r = r.stateNode, r.parentNode.removeChild(r));
        break;
      case 27:
        nn || va(r, n);
        var l = Ut, d = Cn;
        or(r.type) && (Ut = r.stateNode, Cn = !1), Da(
          e,
          n,
          r
        ), qi(r.stateNode), Ut = l, Cn = d;
        break;
      case 5:
        nn || va(r, n);
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
        Ut !== null && (Cn ? (e = Ut, Lv(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          r.stateNode
        ), $s(e)) : Lv(Ut, r.stateNode));
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
        tr(2, r, n), nn || tr(4, r, n), Da(
          e,
          n,
          r
        );
        break;
      case 1:
        nn || (va(r, n), l = r.stateNode, typeof l.componentWillUnmount == "function" && $g(
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
        nn = (l = nn) || r.memoizedState !== null, Da(
          e,
          n,
          r
        ), nn = l;
        break;
      default:
        Da(
          e,
          n,
          r
        );
    }
  }
  function Pg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        $s(e);
      } catch (r) {
        xt(n, n.return, r);
      }
    }
  }
  function Gg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        $s(e);
      } catch (r) {
        xt(n, n.return, r);
      }
  }
  function Fj(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new Vg()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new Vg()), n;
      default:
        throw Error(i(435, e.tag));
    }
  }
  function vo(e, n) {
    var r = Fj(e);
    n.forEach(function(l) {
      if (!r.has(l)) {
        r.add(l);
        var d = Wj.bind(null, e, l);
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
        Fg(h, x, d), Ut = null, Cn = !1, h = d.alternate, h !== null && (h.return = null), d.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        Yg(n, e), n = n.sibling;
  }
  var oa = null;
  function Yg(e, n) {
    var r = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Tn(n, e), Rn(e), l & 4 && (tr(3, e, e.return), ki(3, e), tr(5, e, e.return));
        break;
      case 1:
        Tn(n, e), Rn(e), l & 512 && (nn || r === null || va(r, r.return)), l & 64 && ka && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (r = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = r === null ? l : r.concat(l))));
        break;
      case 26:
        var d = oa;
        if (Tn(n, e), Rn(e), l & 512 && (nn || r === null || va(r, r.return)), l & 4) {
          var h = r !== null ? r.memoizedState : null;
          if (l = e.memoizedState, r === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, r = e.memoizedProps, d = d.ownerDocument || d;
                  t: switch (l) {
                    case "title":
                      h = d.getElementsByTagName("title")[0], (!h || h[et] || h[Ee] || h.namespaceURI === "http://www.w3.org/2000/svg" || h.hasAttribute("itemprop")) && (h = d.createElement(l), d.head.insertBefore(
                        h,
                        d.querySelector("head > title")
                      )), mn(h, l, r), h[Ee] = e, Mt(h), l = h;
                      break e;
                    case "link":
                      var x = Yv(
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
                      h = d.createElement(l), mn(h, l, r), d.head.appendChild(h);
                      break;
                    case "meta":
                      if (x = Yv(
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
                      h = d.createElement(l), mn(h, l, r), d.head.appendChild(h);
                      break;
                    default:
                      throw Error(i(468, l));
                  }
                  h[Ee] = e, Mt(h), l = h;
                }
                e.stateNode = l;
              } else
                Kv(
                  d,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Gv(
                d,
                l,
                e.memoizedProps
              );
          else
            h !== l ? (h === null ? r.stateNode !== null && (r = r.stateNode, r.parentNode.removeChild(r)) : h.count--, l === null ? Kv(
              d,
              e.type,
              e.stateNode
            ) : Gv(
              d,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && bd(
              e,
              e.memoizedProps,
              r.memoizedProps
            );
        }
        break;
      case 27:
        Tn(n, e), Rn(e), l & 512 && (nn || r === null || va(r, r.return)), r !== null && l & 4 && bd(
          e,
          e.memoizedProps,
          r.memoizedProps
        );
        break;
      case 5:
        if (Tn(n, e), Rn(e), l & 512 && (nn || r === null || va(r, r.return)), e.flags & 32) {
          d = e.stateNode;
          try {
            is(d, "");
          } catch (ke) {
            xt(e, e.return, ke);
          }
        }
        l & 4 && e.stateNode != null && (d = e.memoizedProps, bd(
          e,
          d,
          r !== null ? r.memoizedProps : d
        )), l & 1024 && (wd = !0);
        break;
      case 6:
        if (Tn(n, e), Rn(e), l & 4) {
          if (e.stateNode === null)
            throw Error(i(162));
          l = e.memoizedProps, r = e.stateNode;
          try {
            r.nodeValue = l;
          } catch (ke) {
            xt(e, e.return, ke);
          }
        }
        break;
      case 3:
        if (Do = null, d = oa, oa = Ao(n.containerInfo), Tn(n, e), oa = d, Rn(e), l & 4 && r !== null && r.memoizedState.isDehydrated)
          try {
            $s(n.containerInfo);
          } catch (ke) {
            xt(e, e.return, ke);
          }
        wd && (wd = !1, Kg(e));
        break;
      case 4:
        l = oa, oa = Ao(
          e.stateNode.containerInfo
        ), Tn(n, e), Rn(e), oa = l;
        break;
      case 12:
        Tn(n, e), Rn(e);
        break;
      case 31:
        Tn(n, e), Rn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, vo(e, l)));
        break;
      case 13:
        Tn(n, e), Rn(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (bo = gt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, vo(e, l)));
        break;
      case 22:
        d = e.memoizedState !== null;
        var $ = r !== null && r.memoizedState !== null, ae = ka, ue = nn;
        if (ka = ae || d, nn = ue || $, Tn(n, e), nn = ue, ka = ae, Rn(e), l & 8192)
          e: for (n = e.stateNode, n._visibility = d ? n._visibility & -2 : n._visibility | 1, d && (r === null || $ || ka || nn || Fr(e)), r = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (r === null) {
                $ = r = n;
                try {
                  if (h = $.stateNode, d)
                    x = h.style, typeof x.setProperty == "function" ? x.setProperty("display", "none", "important") : x.display = "none";
                  else {
                    E = $.stateNode;
                    var pe = $.memoizedProps.style, le = pe != null && pe.hasOwnProperty("display") ? pe.display : null;
                    E.style.display = le == null || typeof le == "boolean" ? "" : ("" + le).trim();
                  }
                } catch (ke) {
                  xt($, $.return, ke);
                }
              }
            } else if (n.tag === 6) {
              if (r === null) {
                $ = n;
                try {
                  $.stateNode.nodeValue = d ? "" : $.memoizedProps;
                } catch (ke) {
                  xt($, $.return, ke);
                }
              }
            } else if (n.tag === 18) {
              if (r === null) {
                $ = n;
                try {
                  var oe = $.stateNode;
                  d ? $v(oe, !0) : $v($.stateNode, !1);
                } catch (ke) {
                  xt($, $.return, ke);
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
        l & 4 && (l = e.updateQueue, l !== null && (r = l.retryQueue, r !== null && (l.retryQueue = null, vo(e, r))));
        break;
      case 19:
        Tn(n, e), Rn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, vo(e, l)));
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
          if (Bg(l)) {
            r = l;
            break;
          }
          l = l.return;
        }
        if (r == null) throw Error(i(160));
        switch (r.tag) {
          case 27:
            var d = r.stateNode, h = xd(e);
            go(e, h, d);
            break;
          case 5:
            var x = r.stateNode;
            r.flags & 32 && (is(x, ""), r.flags &= -33);
            var E = xd(e);
            go(e, E, x);
            break;
          case 3:
          case 4:
            var $ = r.stateNode.containerInfo, ae = xd(e);
            Sd(
              e,
              ae,
              $
            );
            break;
          default:
            throw Error(i(161));
        }
      } catch (ue) {
        xt(e, e.return, ue);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function Kg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        Kg(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function za(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        qg(e, n.alternate, n), n = n.sibling;
  }
  function Fr(e) {
    for (e = e.child; e !== null; ) {
      var n = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          tr(4, n, n.return), Fr(n);
          break;
        case 1:
          va(n, n.return);
          var r = n.stateNode;
          typeof r.componentWillUnmount == "function" && $g(
            n,
            n.return,
            r
          ), Fr(n);
          break;
        case 27:
          qi(n.stateNode);
        case 26:
        case 5:
          va(n, n.return), Fr(n);
          break;
        case 22:
          n.memoizedState === null && Fr(n);
          break;
        case 30:
          Fr(n);
          break;
        default:
          Fr(n);
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
          ), ki(4, h);
          break;
        case 1:
          if (Oa(
            d,
            h,
            r
          ), l = h, d = l.stateNode, typeof d.componentDidMount == "function")
            try {
              d.componentDidMount();
            } catch (ae) {
              xt(l, l.return, ae);
            }
          if (l = h, d = l.updateQueue, d !== null) {
            var E = l.stateNode;
            try {
              var $ = d.shared.hiddenCallbacks;
              if ($ !== null)
                for (d.shared.hiddenCallbacks = null, d = 0; d < $.length; d++)
                  Np($[d], E);
            } catch (ae) {
              xt(l, l.return, ae);
            }
          }
          r && x & 64 && Lg(h), Di(h, h.return);
          break;
        case 27:
          Ig(h);
        case 26:
        case 5:
          Oa(
            d,
            h,
            r
          ), r && l === null && x & 4 && Ug(h), Di(h, h.return);
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
          ), r && x & 4 && Pg(d, h);
          break;
        case 13:
          Oa(
            d,
            h,
            r
          ), r && x & 4 && Gg(d, h);
          break;
        case 22:
          h.memoizedState === null && Oa(
            d,
            h,
            r
          ), Di(h, h.return);
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
  function jd(e, n) {
    var r = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== r && (e != null && e.refCount++, r != null && bi(r));
  }
  function Ed(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && bi(e));
  }
  function ca(e, n, r, l) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        Xg(
          e,
          n,
          r,
          l
        ), n = n.sibling;
  }
  function Xg(e, n, r, l) {
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
        ), d & 2048 && ki(9, n);
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
        ), d & 2048 && (e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && bi(e)));
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
          } catch ($) {
            xt(n, n.return, $);
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
        ) : zi(e, n) : h._visibility & 2 ? ca(
          e,
          n,
          r,
          l
        ) : (h._visibility |= 2, Cs(
          e,
          n,
          r,
          l,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), d & 2048 && jd(x, n);
        break;
      case 24:
        ca(
          e,
          n,
          r,
          l
        ), d & 2048 && Ed(n.alternate, n);
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
  function Cs(e, n, r, l, d) {
    for (d = d && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var h = e, x = n, E = r, $ = l, ae = x.flags;
      switch (x.tag) {
        case 0:
        case 11:
        case 15:
          Cs(
            h,
            x,
            E,
            $,
            d
          ), ki(8, x);
          break;
        case 23:
          break;
        case 22:
          var ue = x.stateNode;
          x.memoizedState !== null ? ue._visibility & 2 ? Cs(
            h,
            x,
            E,
            $,
            d
          ) : zi(
            h,
            x
          ) : (ue._visibility |= 2, Cs(
            h,
            x,
            E,
            $,
            d
          )), d && ae & 2048 && jd(
            x.alternate,
            x
          );
          break;
        case 24:
          Cs(
            h,
            x,
            E,
            $,
            d
          ), d && ae & 2048 && Ed(x.alternate, x);
          break;
        default:
          Cs(
            h,
            x,
            E,
            $,
            d
          );
      }
      n = n.sibling;
    }
  }
  function zi(e, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var r = e, l = n, d = l.flags;
        switch (l.tag) {
          case 22:
            zi(r, l), d & 2048 && jd(
              l.alternate,
              l
            );
            break;
          case 24:
            zi(r, l), d & 2048 && Ed(l.alternate, l);
            break;
          default:
            zi(r, l);
        }
        n = n.sibling;
      }
  }
  var Oi = 8192;
  function Ts(e, n, r) {
    if (e.subtreeFlags & Oi)
      for (e = e.child; e !== null; )
        Qg(
          e,
          n,
          r
        ), e = e.sibling;
  }
  function Qg(e, n, r) {
    switch (e.tag) {
      case 26:
        Ts(
          e,
          n,
          r
        ), e.flags & Oi && e.memoizedState !== null && ME(
          r,
          oa,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Ts(
          e,
          n,
          r
        );
        break;
      case 3:
      case 4:
        var l = oa;
        oa = Ao(e.stateNode.containerInfo), Ts(
          e,
          n,
          r
        ), oa = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = Oi, Oi = 16777216, Ts(
          e,
          n,
          r
        ), Oi = l) : Ts(
          e,
          n,
          r
        ));
        break;
      default:
        Ts(
          e,
          n,
          r
        );
    }
  }
  function Zg(e) {
    var n = e.alternate;
    if (n !== null && (e = n.child, e !== null)) {
      n.child = null;
      do
        n = e.sibling, e.sibling = null, e = n;
      while (e !== null);
    }
  }
  function Li(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var l = n[r];
          cn = l, Wg(
            l,
            e
          );
        }
      Zg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Jg(e), e = e.sibling;
  }
  function Jg(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Li(e), e.flags & 2048 && tr(9, e, e.return);
        break;
      case 3:
        Li(e);
        break;
      case 12:
        Li(e);
        break;
      case 22:
        var n = e.stateNode;
        e.memoizedState !== null && n._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (n._visibility &= -3, yo(e)) : Li(e);
        break;
      default:
        Li(e);
    }
  }
  function yo(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var l = n[r];
          cn = l, Wg(
            l,
            e
          );
        }
      Zg(e);
    }
    for (e = e.child; e !== null; ) {
      switch (n = e, n.tag) {
        case 0:
        case 11:
        case 15:
          tr(8, n, n.return), yo(n);
          break;
        case 22:
          r = n.stateNode, r._visibility & 2 && (r._visibility &= -3, yo(n));
          break;
        default:
          yo(n);
      }
      e = e.sibling;
    }
  }
  function Wg(e, n) {
    for (; cn !== null; ) {
      var r = cn;
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
          bi(r.memoizedState.cache);
      }
      if (l = r.child, l !== null) l.return = r, cn = l;
      else
        e: for (r = e; cn !== null; ) {
          l = cn;
          var d = l.sibling, h = l.return;
          if (Hg(l), l === r) {
            cn = null;
            break e;
          }
          if (d !== null) {
            d.return = h, cn = d;
            break e;
          }
          cn = h;
        }
    }
  }
  var Pj = {
    getCacheForType: function(e) {
      var n = fn(Wt), r = n.data.get(e);
      return r === void 0 && (r = e(), n.data.set(e, r)), r;
    },
    cacheSignal: function() {
      return fn(Wt).controller.signal;
    }
  }, Gj = typeof WeakMap == "function" ? WeakMap : Map, vt = 0, Tt = null, st = null, ut = 0, bt = 0, Un = null, nr = !1, Rs = !1, Nd = !1, La = 0, Ft = 0, ar = 0, Pr = 0, Cd = 0, Bn = 0, _s = 0, $i = null, _n = null, Td = !1, bo = 0, ev = 0, xo = 1 / 0, So = null, rr = null, ln = 0, sr = null, Ms = null, $a = 0, Rd = 0, _d = null, tv = null, Ui = 0, Md = null;
  function In() {
    return (vt & 2) !== 0 && ut !== 0 ? ut & -ut : A.T !== null ? Ld() : ve();
  }
  function nv() {
    if (Bn === 0)
      if ((ut & 536870912) === 0 || ft) {
        var e = sn;
        sn <<= 1, (sn & 3932160) === 0 && (sn = 262144), Bn = e;
      } else Bn = 536870912;
    return e = Ln.current, e !== null && (e.flags |= 32), Bn;
  }
  function Mn(e, n, r) {
    (e === Tt && (bt === 2 || bt === 9) || e.cancelPendingCommit !== null) && (As(e, 0), ir(
      e,
      ut,
      Bn,
      !1
    )), Ue(e, r), ((vt & 2) === 0 || e !== Tt) && (e === Tt && ((vt & 2) === 0 && (Pr |= r), Ft === 4 && ir(
      e,
      ut,
      Bn,
      !1
    )), ya(e));
  }
  function av(e, n, r) {
    if ((vt & 6) !== 0) throw Error(i(327));
    var l = !r && (n & 127) === 0 && (n & e.expiredLanes) === 0 || O(e, n), d = l ? Xj(e, n) : kd(e, n, !0), h = l;
    do {
      if (d === 0) {
        Rs && !l && ir(e, n, 0, !1);
        break;
      } else {
        if (r = e.current.alternate, h && !Yj(r)) {
          d = kd(e, n, !1), h = !1;
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
              d = $i;
              var $ = E.current.memoizedState.isDehydrated;
              if ($ && (As(E, x).flags |= 256), x = kd(
                E,
                x,
                !1
              ), x !== 2) {
                if (Nd && !$) {
                  E.errorRecoveryDisabledLanes |= h, Pr |= h, d = 4;
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
          As(e, 0), ir(e, n, 0, !0);
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
                Bn,
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
          if ((n & 62914560) === n && (d = bo + 300 - gt(), 10 < d)) {
            if (ir(
              l,
              n,
              Bn,
              !nr
            ), ge(l, 0, !0) !== 0) break e;
            $a = n, l.timeoutHandle = zv(
              rv.bind(
                null,
                l,
                r,
                _n,
                So,
                Td,
                n,
                Bn,
                Pr,
                _s,
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
          rv(
            l,
            r,
            _n,
            So,
            Td,
            n,
            Bn,
            Pr,
            _s,
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
    ya(e);
  }
  function rv(e, n, r, l, d, h, x, E, $, ae, ue, pe, le, oe) {
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
      }, Qg(
        n,
        h,
        pe
      );
      var ke = (h & 62914560) === h ? bo - gt() : (h & 4194048) === h ? ev - gt() : 0;
      if (ke = AE(
        pe,
        ke
      ), ke !== null) {
        $a = h, e.cancelPendingCommit = ke(
          fv.bind(
            null,
            e,
            n,
            h,
            r,
            l,
            d,
            x,
            E,
            $,
            ue,
            pe,
            null,
            le,
            oe
          )
        ), ir(e, h, x, !ae);
        return;
      }
    }
    fv(
      e,
      n,
      h,
      r,
      l,
      d,
      x,
      E,
      $
    );
  }
  function Yj(e) {
    for (var n = e; ; ) {
      var r = n.tag;
      if ((r === 0 || r === 11 || r === 15) && n.flags & 16384 && (r = n.updateQueue, r !== null && (r = r.stores, r !== null)))
        for (var l = 0; l < r.length; l++) {
          var d = r[l], h = d.getSnapshot;
          d = d.value;
          try {
            if (!zn(h(), d)) return !1;
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
    n &= ~Cd, n &= ~Pr, e.suspendedLanes |= n, e.pingedLanes &= ~n, l && (e.warmLanes |= n), l = e.expirationTimes;
    for (var d = n; 0 < d; ) {
      var h = 31 - Lt(d), x = 1 << h;
      l[h] = -1, d &= ~x;
    }
    r !== 0 && qt(e, r, n);
  }
  function wo() {
    return (vt & 6) === 0 ? (Bi(0), !1) : !0;
  }
  function Ad() {
    if (st !== null) {
      if (bt === 0)
        var e = st.return;
      else
        e = st, Ca = Lr = null, Yu(e), Ss = null, Si = 0, e = st;
      for (; e !== null; )
        Og(e.alternate, e), e = e.return;
      st = null;
    }
  }
  function As(e, n) {
    var r = e.timeoutHandle;
    r !== -1 && (e.timeoutHandle = -1, hE(r)), r = e.cancelPendingCommit, r !== null && (e.cancelPendingCommit = null, r()), $a = 0, Ad(), Tt = e, st = r = Ea(e.current, null), ut = n, bt = 0, Un = null, nr = !1, Rs = O(e, n), Nd = !1, _s = Bn = Cd = Pr = ar = Ft = 0, _n = $i = null, Td = !1, (n & 8) !== 0 && (n |= n & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= n; 0 < l; ) {
        var d = 31 - Lt(l), h = 1 << d;
        n |= e[d], l &= ~h;
      }
    return La = n, ql(), r;
  }
  function sv(e, n) {
    Qe = null, A.H = _i, n === xs || n === Ql ? (n = Sp(), bt = 3) : n === Ou ? (n = Sp(), bt = 4) : bt = n === cd ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Un = n, st === null && (Ft = 1, uo(
      e,
      Gn(n, e.current)
    ));
  }
  function iv() {
    var e = Ln.current;
    return e === null ? !0 : (ut & 4194048) === ut ? Qn === null : (ut & 62914560) === ut || (ut & 536870912) !== 0 ? e === Qn : !1;
  }
  function lv() {
    var e = A.H;
    return A.H = _i, e === null ? _i : e;
  }
  function ov() {
    var e = A.A;
    return A.A = Pj, e;
  }
  function jo() {
    Ft = 4, nr || (ut & 4194048) !== ut && Ln.current !== null || (Rs = !0), (ar & 134217727) === 0 && (Pr & 134217727) === 0 || Tt === null || ir(
      Tt,
      ut,
      Bn,
      !1
    );
  }
  function kd(e, n, r) {
    var l = vt;
    vt |= 2;
    var d = lv(), h = ov();
    (Tt !== e || ut !== n) && (So = null, As(e, n)), n = !1;
    var x = Ft;
    e: do
      try {
        if (bt !== 0 && st !== null) {
          var E = st, $ = Un;
          switch (bt) {
            case 8:
              Ad(), x = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Ln.current === null && (n = !0);
              var ae = bt;
              if (bt = 0, Un = null, ks(e, E, $, ae), r && Rs) {
                x = 0;
                break e;
              }
              break;
            default:
              ae = bt, bt = 0, Un = null, ks(e, E, $, ae);
          }
        }
        Kj(), x = Ft;
        break;
      } catch (ue) {
        sv(e, ue);
      }
    while (!0);
    return n && e.shellSuspendCounter++, Ca = Lr = null, vt = l, A.H = d, A.A = h, st === null && (Tt = null, ut = 0, ql()), x;
  }
  function Kj() {
    for (; st !== null; ) cv(st);
  }
  function Xj(e, n) {
    var r = vt;
    vt |= 2;
    var l = lv(), d = ov();
    Tt !== e || ut !== n ? (So = null, xo = gt() + 500, As(e, n)) : Rs = O(
      e,
      n
    );
    e: do
      try {
        if (bt !== 0 && st !== null) {
          n = st;
          var h = Un;
          t: switch (bt) {
            case 1:
              bt = 0, Un = null, ks(e, n, h, 1);
              break;
            case 2:
            case 9:
              if (bp(h)) {
                bt = 0, Un = null, uv(n);
                break;
              }
              n = function() {
                bt !== 2 && bt !== 9 || Tt !== e || (bt = 7), ya(e);
              }, h.then(n, n);
              break e;
            case 3:
              bt = 7;
              break e;
            case 4:
              bt = 5;
              break e;
            case 7:
              bp(h) ? (bt = 0, Un = null, uv(n)) : (bt = 0, Un = null, ks(e, n, h, 7));
              break;
            case 5:
              var x = null;
              switch (st.tag) {
                case 26:
                  x = st.memoizedState;
                case 5:
                case 27:
                  var E = st;
                  if (x ? Xv(x) : E.stateNode.complete) {
                    bt = 0, Un = null;
                    var $ = E.sibling;
                    if ($ !== null) st = $;
                    else {
                      var ae = E.return;
                      ae !== null ? (st = ae, Eo(ae)) : st = null;
                    }
                    break t;
                  }
              }
              bt = 0, Un = null, ks(e, n, h, 5);
              break;
            case 6:
              bt = 0, Un = null, ks(e, n, h, 6);
              break;
            case 8:
              Ad(), Ft = 6;
              break e;
            default:
              throw Error(i(462));
          }
        }
        Qj();
        break;
      } catch (ue) {
        sv(e, ue);
      }
    while (!0);
    return Ca = Lr = null, A.H = l, A.A = d, vt = r, st !== null ? 0 : (Tt = null, ut = 0, ql(), Ft);
  }
  function Qj() {
    for (; st !== null && !at(); )
      cv(st);
  }
  function cv(e) {
    var n = Dg(e.alternate, e, La);
    e.memoizedProps = e.pendingProps, n === null ? Eo(e) : st = n;
  }
  function uv(e) {
    var n = e, r = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = Tg(
          r,
          n,
          n.pendingProps,
          n.type,
          void 0,
          ut
        );
        break;
      case 11:
        n = Tg(
          r,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          ut
        );
        break;
      case 5:
        Yu(n);
      default:
        Og(r, n), n = st = op(n, La), n = Dg(r, n, La);
    }
    e.memoizedProps = e.pendingProps, n === null ? Eo(e) : st = n;
  }
  function ks(e, n, r, l) {
    Ca = Lr = null, Yu(n), Ss = null, Si = 0;
    var d = n.return;
    try {
      if (Uj(
        e,
        d,
        n,
        r,
        ut
      )) {
        Ft = 1, uo(
          e,
          Gn(r, e.current)
        ), st = null;
        return;
      }
    } catch (h) {
      if (d !== null) throw st = d, h;
      Ft = 1, uo(
        e,
        Gn(r, e.current)
      ), st = null;
      return;
    }
    n.flags & 32768 ? (ft || l === 1 ? e = !0 : Rs || (ut & 536870912) !== 0 ? e = !1 : (nr = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = Ln.current, l !== null && l.tag === 13 && (l.flags |= 16384))), dv(n, e)) : Eo(n);
  }
  function Eo(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        dv(
          n,
          nr
        );
        return;
      }
      e = n.return;
      var r = Vj(
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
  function dv(e, n) {
    do {
      var r = qj(e.alternate, e);
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
  function fv(e, n, r, l, d, h, x, E, $) {
    e.cancelPendingCommit = null;
    do
      No();
    while (ln !== 0);
    if ((vt & 6) !== 0) throw Error(i(327));
    if (n !== null) {
      if (n === e.current) throw Error(i(177));
      if (h = n.lanes | n.childLanes, h |= xu, ot(
        e,
        r,
        h,
        x,
        E,
        $
      ), e === Tt && (st = Tt = null, ut = 0), Ms = n, sr = e, $a = r, Rd = h, _d = d, tv = l, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, eE(Ye, function() {
        return vv(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || l) {
        l = A.T, A.T = null, d = F.p, F.p = 2, x = vt, vt |= 4;
        try {
          Hj(e, n, r);
        } finally {
          vt = x, F.p = d, A.T = l;
        }
      }
      ln = 1, hv(), mv(), pv();
    }
  }
  function hv() {
    if (ln === 1) {
      ln = 0;
      var e = sr, n = Ms, r = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || r) {
        r = A.T, A.T = null;
        var l = F.p;
        F.p = 2;
        var d = vt;
        vt |= 4;
        try {
          Yg(n, e);
          var h = Fd, x = Wm(e.containerInfo), E = h.focusedElem, $ = h.selectionRange;
          if (x !== E && E && E.ownerDocument && Jm(
            E.ownerDocument.documentElement,
            E
          )) {
            if ($ !== null && pu(E)) {
              var ae = $.start, ue = $.end;
              if (ue === void 0 && (ue = ae), "selectionStart" in E)
                E.selectionStart = ae, E.selectionEnd = Math.min(
                  ue,
                  E.value.length
                );
              else {
                var pe = E.ownerDocument || document, le = pe && pe.defaultView || window;
                if (le.getSelection) {
                  var oe = le.getSelection(), ke = E.textContent.length, Ve = Math.min($.start, ke), Et = $.end === void 0 ? Ve : Math.min($.end, ke);
                  !oe.extend && Ve > Et && (x = Et, Et = Ve, Ve = x);
                  var X = Zm(
                    E,
                    Ve
                  ), q = Zm(
                    E,
                    Et
                  );
                  if (X && q && (oe.rangeCount !== 1 || oe.anchorNode !== X.node || oe.anchorOffset !== X.offset || oe.focusNode !== q.node || oe.focusOffset !== q.offset)) {
                    var ne = pe.createRange();
                    ne.setStart(X.node, X.offset), oe.removeAllRanges(), Ve > Et ? (oe.addRange(ne), oe.extend(q.node, q.offset)) : (ne.setEnd(q.node, q.offset), oe.addRange(ne));
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
          $o = !!Hd, Fd = Hd = null;
        } finally {
          vt = d, F.p = l, A.T = r;
        }
      }
      e.current = n, ln = 2;
    }
  }
  function mv() {
    if (ln === 2) {
      ln = 0;
      var e = sr, n = Ms, r = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || r) {
        r = A.T, A.T = null;
        var l = F.p;
        F.p = 2;
        var d = vt;
        vt |= 4;
        try {
          qg(e, n.alternate, n);
        } finally {
          vt = d, F.p = l, A.T = r;
        }
      }
      ln = 3;
    }
  }
  function pv() {
    if (ln === 4 || ln === 3) {
      ln = 0, Xe();
      var e = sr, n = Ms, r = $a, l = tv;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? ln = 5 : (ln = 0, Ms = sr = null, gv(e, e.pendingLanes));
      var d = e.pendingLanes;
      if (d === 0 && (rr = null), Q(r), n = n.stateNode, Pt && typeof Pt.onCommitFiberRoot == "function")
        try {
          Pt.onCommitFiberRoot(
            wn,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        n = A.T, d = F.p, F.p = 2, A.T = null;
        try {
          for (var h = e.onRecoverableError, x = 0; x < l.length; x++) {
            var E = l[x];
            h(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          A.T = n, F.p = d;
        }
      }
      ($a & 3) !== 0 && No(), ya(e), d = e.pendingLanes, (r & 261930) !== 0 && (d & 42) !== 0 ? e === Md ? Ui++ : (Ui = 0, Md = e) : Ui = 0, Bi(0);
    }
  }
  function gv(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, bi(n)));
  }
  function No() {
    return hv(), mv(), pv(), vv();
  }
  function vv() {
    if (ln !== 5) return !1;
    var e = sr, n = Rd;
    Rd = 0;
    var r = Q($a), l = A.T, d = F.p;
    try {
      F.p = 32 > r ? 32 : r, A.T = null, r = _d, _d = null;
      var h = sr, x = $a;
      if (ln = 0, Ms = sr = null, $a = 0, (vt & 6) !== 0) throw Error(i(331));
      var E = vt;
      if (vt |= 4, Jg(h.current), Xg(
        h,
        h.current,
        x,
        r
      ), vt = E, Bi(0, !1), Pt && typeof Pt.onPostCommitFiberRoot == "function")
        try {
          Pt.onPostCommitFiberRoot(wn, h);
        } catch {
        }
      return !0;
    } finally {
      F.p = d, A.T = l, gv(e, n);
    }
  }
  function yv(e, n, r) {
    n = Gn(r, n), n = od(e.stateNode, n, 2), e = Ja(e, n, 2), e !== null && (Ue(e, 2), ya(e));
  }
  function xt(e, n, r) {
    if (e.tag === 3)
      yv(e, e, r);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          yv(
            n,
            e,
            r
          );
          break;
        } else if (n.tag === 1) {
          var l = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (rr === null || !rr.has(l))) {
            e = Gn(r, e), r = bg(2), l = Ja(n, r, 2), l !== null && (xg(
              r,
              l,
              n,
              e
            ), Ue(l, 2), ya(l));
            break;
          }
        }
        n = n.return;
      }
  }
  function Dd(e, n, r) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new Gj();
      var d = /* @__PURE__ */ new Set();
      l.set(n, d);
    } else
      d = l.get(n), d === void 0 && (d = /* @__PURE__ */ new Set(), l.set(n, d));
    d.has(r) || (Nd = !0, d.add(r), e = Zj.bind(null, e, n, r), n.then(e, e));
  }
  function Zj(e, n, r) {
    var l = e.pingCache;
    l !== null && l.delete(n), e.pingedLanes |= e.suspendedLanes & r, e.warmLanes &= ~r, Tt === e && (ut & r) === r && (Ft === 4 || Ft === 3 && (ut & 62914560) === ut && 300 > gt() - bo ? (vt & 2) === 0 && As(e, 0) : Cd |= r, _s === ut && (_s = 0)), ya(e);
  }
  function bv(e, n) {
    n === 0 && (n = be()), e = Dr(e, n), e !== null && (Ue(e, n), ya(e));
  }
  function Jj(e) {
    var n = e.memoizedState, r = 0;
    n !== null && (r = n.retryLane), bv(e, r);
  }
  function Wj(e, n) {
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
    l !== null && l.delete(n), bv(e, r);
  }
  function eE(e, n) {
    return We(e, n);
  }
  var Co = null, Ds = null, zd = !1, To = !1, Od = !1, lr = 0;
  function ya(e) {
    e !== Ds && e.next === null && (Ds === null ? Co = Ds = e : Ds = Ds.next = e), To = !0, zd || (zd = !0, nE());
  }
  function Bi(e, n) {
    if (!Od && To) {
      Od = !0;
      do
        for (var r = !1, l = Co; l !== null; ) {
          if (e !== 0) {
            var d = l.pendingLanes;
            if (d === 0) var h = 0;
            else {
              var x = l.suspendedLanes, E = l.pingedLanes;
              h = (1 << 31 - Lt(42 | e) + 1) - 1, h &= d & ~(x & ~E), h = h & 201326741 ? h & 201326741 | 1 : h ? h | 2 : 0;
            }
            h !== 0 && (r = !0, jv(l, h));
          } else
            h = ut, h = ge(
              l,
              l === Tt ? h : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (h & 3) === 0 || O(l, h) || (r = !0, jv(l, h));
          l = l.next;
        }
      while (r);
      Od = !1;
    }
  }
  function tE() {
    xv();
  }
  function xv() {
    To = zd = !1;
    var e = 0;
    lr !== 0 && fE() && (e = lr);
    for (var n = gt(), r = null, l = Co; l !== null; ) {
      var d = l.next, h = Sv(l, n);
      h === 0 ? (l.next = null, r === null ? Co = d : r.next = d, d === null && (Ds = r)) : (r = l, (e !== 0 || (h & 3) !== 0) && (To = !0)), l = d;
    }
    ln !== 0 && ln !== 5 || Bi(e), lr !== 0 && (lr = 0);
  }
  function Sv(e, n) {
    for (var r = e.suspendedLanes, l = e.pingedLanes, d = e.expirationTimes, h = e.pendingLanes & -62914561; 0 < h; ) {
      var x = 31 - Lt(h), E = 1 << x, $ = d[x];
      $ === -1 ? ((E & r) === 0 || (E & l) !== 0) && (d[x] = he(E, n)) : $ <= n && (e.expiredLanes |= E), h &= ~E;
    }
    if (n = Tt, r = ut, r = ge(
      e,
      e === n ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, r === 0 || e === n && (bt === 2 || bt === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && Nt(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((r & 3) === 0 || O(e, r)) {
      if (n = r & -r, n === e.callbackPriority) return n;
      switch (l !== null && Nt(l), Q(r)) {
        case 2:
        case 8:
          r = Ge;
          break;
        case 32:
          r = Ye;
          break;
        case 268435456:
          r = At;
          break;
        default:
          r = Ye;
      }
      return l = wv.bind(null, e), r = We(r, l), e.callbackPriority = n, e.callbackNode = r, n;
    }
    return l !== null && l !== null && Nt(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function wv(e, n) {
    if (ln !== 0 && ln !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var r = e.callbackNode;
    if (No() && e.callbackNode !== r)
      return null;
    var l = ut;
    return l = ge(
      e,
      e === Tt ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (av(e, l, n), Sv(e, gt()), e.callbackNode != null && e.callbackNode === r ? wv.bind(null, e) : null);
  }
  function jv(e, n) {
    if (No()) return null;
    av(e, n, !0);
  }
  function nE() {
    mE(function() {
      (vt & 6) !== 0 ? We(
        Te,
        tE
      ) : xv();
    });
  }
  function Ld() {
    if (lr === 0) {
      var e = ys;
      e === 0 && (e = Qt, Qt <<= 1, (Qt & 261888) === 0 && (Qt = 256)), lr = e;
    }
    return lr;
  }
  function Ev(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : zl("" + e);
  }
  function Nv(e, n) {
    var r = n.ownerDocument.createElement("input");
    return r.name = n.name, r.value = n.value, e.id && r.setAttribute("form", e.id), n.parentNode.insertBefore(r, n), e = new FormData(e), r.parentNode.removeChild(r), e;
  }
  function aE(e, n, r, l, d) {
    if (n === "submit" && r && r.stateNode === d) {
      var h = Ev(
        (d[Ne] || null).action
      ), x = l.submitter;
      x && (n = (n = x[Ne] || null) ? Ev(n.formAction) : x.getAttribute("formAction"), n !== null && (h = n, x = null));
      var E = new Ul(
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
                  var $ = x ? Nv(d, x) : new FormData(d);
                  nd(
                    r,
                    {
                      pending: !0,
                      data: $,
                      method: d.method,
                      action: h
                    },
                    null,
                    $
                  );
                }
              } else
                typeof h == "function" && (E.preventDefault(), $ = x ? Nv(d, x) : new FormData(d), nd(
                  r,
                  {
                    pending: !0,
                    data: $,
                    method: d.method,
                    action: h
                  },
                  h,
                  $
                ));
            },
            currentTarget: d
          }
        ]
      });
    }
  }
  for (var $d = 0; $d < bu.length; $d++) {
    var Ud = bu[$d], rE = Ud.toLowerCase(), sE = Ud[0].toUpperCase() + Ud.slice(1);
    la(
      rE,
      "on" + sE
    );
  }
  la(np, "onAnimationEnd"), la(ap, "onAnimationIteration"), la(rp, "onAnimationStart"), la("dblclick", "onDoubleClick"), la("focusin", "onFocus"), la("focusout", "onBlur"), la(Sj, "onTransitionRun"), la(wj, "onTransitionStart"), la(jj, "onTransitionCancel"), la(sp, "onTransitionEnd"), ha("onMouseEnter", ["mouseout", "mouseover"]), ha("onMouseLeave", ["mouseout", "mouseover"]), ha("onPointerEnter", ["pointerout", "pointerover"]), ha("onPointerLeave", ["pointerout", "pointerover"]), on(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), on(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), on("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), on(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), on(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), on(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Ii = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), iE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ii)
  );
  function Cv(e, n) {
    n = (n & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var l = e[r], d = l.event;
      l = l.listeners;
      e: {
        var h = void 0;
        if (n)
          for (var x = l.length - 1; 0 <= x; x--) {
            var E = l[x], $ = E.instance, ae = E.currentTarget;
            if (E = E.listener, $ !== h && d.isPropagationStopped())
              break e;
            h = E, d.currentTarget = ae;
            try {
              h(d);
            } catch (ue) {
              Vl(ue);
            }
            d.currentTarget = null, h = $;
          }
        else
          for (x = 0; x < l.length; x++) {
            if (E = l[x], $ = E.instance, ae = E.currentTarget, E = E.listener, $ !== h && d.isPropagationStopped())
              break e;
            h = E, d.currentTarget = ae;
            try {
              h(d);
            } catch (ue) {
              Vl(ue);
            }
            d.currentTarget = null, h = $;
          }
      }
    }
  }
  function it(e, n) {
    var r = n[_e];
    r === void 0 && (r = n[_e] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    r.has(l) || (Tv(n, e, 2, !1), r.add(l));
  }
  function Bd(e, n, r) {
    var l = 0;
    n && (l |= 4), Tv(
      r,
      e,
      l,
      n
    );
  }
  var Ro = "_reactListening" + Math.random().toString(36).slice(2);
  function Id(e) {
    if (!e[Ro]) {
      e[Ro] = !0, Fa.forEach(function(r) {
        r !== "selectionchange" && (iE.has(r) || Bd(r, !1, e), Bd(r, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[Ro] || (n[Ro] = !0, Bd("selectionchange", !1, n));
    }
  }
  function Tv(e, n, r, l) {
    switch (ny(n)) {
      case 2:
        var d = zE;
        break;
      case 8:
        d = OE;
        break;
      default:
        d = tf;
    }
    r = d.bind(
      null,
      n,
      r,
      e
    ), d = void 0, !iu || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (d = !0), l ? d !== void 0 ? e.addEventListener(n, r, {
      capture: !0,
      passive: d
    }) : e.addEventListener(n, r, !0) : d !== void 0 ? e.addEventListener(n, r, {
      passive: d
    }) : e.addEventListener(n, r, !1);
  }
  function Vd(e, n, r, l, d) {
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
              var $ = x.tag;
              if (($ === 3 || $ === 4) && x.stateNode.containerInfo === d)
                return;
              x = x.return;
            }
          for (; E !== null; ) {
            if (x = St(E), x === null) return;
            if ($ = x.tag, $ === 5 || $ === 6 || $ === 26 || $ === 27) {
              l = h = x;
              continue e;
            }
            E = E.parentNode;
          }
        }
        l = l.return;
      }
    km(function() {
      var ae = h, ue = ru(r), pe = [];
      e: {
        var le = ip.get(e);
        if (le !== void 0) {
          var oe = Ul, ke = e;
          switch (e) {
            case "keypress":
              if (Ll(r) === 0) break e;
            case "keydown":
            case "keyup":
              oe = Ww;
              break;
            case "focusin":
              ke = "focus", oe = uu;
              break;
            case "focusout":
              ke = "blur", oe = uu;
              break;
            case "beforeblur":
            case "afterblur":
              oe = uu;
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
              oe = Om;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              oe = Vw;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              oe = nj;
              break;
            case np:
            case ap:
            case rp:
              oe = Fw;
              break;
            case sp:
              oe = rj;
              break;
            case "scroll":
            case "scrollend":
              oe = Bw;
              break;
            case "wheel":
              oe = ij;
              break;
            case "copy":
            case "cut":
            case "paste":
              oe = Gw;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              oe = $m;
              break;
            case "toggle":
            case "beforetoggle":
              oe = oj;
          }
          var Ve = (n & 4) !== 0, Et = !Ve && (e === "scroll" || e === "scrollend"), X = Ve ? le !== null ? le + "Capture" : null : le;
          Ve = [];
          for (var q = ae, ne; q !== null; ) {
            var me = q;
            if (ne = me.stateNode, me = me.tag, me !== 5 && me !== 26 && me !== 27 || ne === null || X === null || (me = oi(q, X), me != null && Ve.push(
              Vi(q, me, ne)
            )), Et) break;
            q = q.return;
          }
          0 < Ve.length && (le = new oe(
            le,
            ke,
            null,
            r,
            ue
          ), pe.push({ event: le, listeners: Ve }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (le = e === "mouseover" || e === "pointerover", oe = e === "mouseout" || e === "pointerout", le && r !== au && (ke = r.relatedTarget || r.fromElement) && (St(ke) || ke[Oe]))
            break e;
          if ((oe || le) && (le = ue.window === ue ? ue : (le = ue.ownerDocument) ? le.defaultView || le.parentWindow : window, oe ? (ke = r.relatedTarget || r.toElement, oe = ae, ke = ke ? St(ke) : null, ke !== null && (Et = u(ke), Ve = ke.tag, ke !== Et || Ve !== 5 && Ve !== 27 && Ve !== 6) && (ke = null)) : (oe = null, ke = ae), oe !== ke)) {
            if (Ve = Om, me = "onMouseLeave", X = "onMouseEnter", q = "mouse", (e === "pointerout" || e === "pointerover") && (Ve = $m, me = "onPointerLeave", X = "onPointerEnter", q = "pointer"), Et = oe == null ? le : rt(oe), ne = ke == null ? le : rt(ke), le = new Ve(
              me,
              q + "leave",
              oe,
              r,
              ue
            ), le.target = Et, le.relatedTarget = ne, me = null, St(ue) === ae && (Ve = new Ve(
              X,
              q + "enter",
              ke,
              r,
              ue
            ), Ve.target = ne, Ve.relatedTarget = Et, me = Ve), Et = me, oe && ke)
              t: {
                for (Ve = lE, X = oe, q = ke, ne = 0, me = X; me; me = Ve(me))
                  ne++;
                me = 0;
                for (var Be = q; Be; Be = Ve(Be))
                  me++;
                for (; 0 < ne - me; )
                  X = Ve(X), ne--;
                for (; 0 < me - ne; )
                  q = Ve(q), me--;
                for (; ne--; ) {
                  if (X === q || q !== null && X === q.alternate) {
                    Ve = X;
                    break t;
                  }
                  X = Ve(X), q = Ve(q);
                }
                Ve = null;
              }
            else Ve = null;
            oe !== null && Rv(
              pe,
              le,
              oe,
              Ve,
              !1
            ), ke !== null && Et !== null && Rv(
              pe,
              Et,
              ke,
              Ve,
              !0
            );
          }
        }
        e: {
          if (le = ae ? rt(ae) : window, oe = le.nodeName && le.nodeName.toLowerCase(), oe === "select" || oe === "input" && le.type === "file")
            var mt = Pm;
          else if (Hm(le))
            if (Gm)
              mt = yj;
            else {
              mt = gj;
              var Le = pj;
            }
          else
            oe = le.nodeName, !oe || oe.toLowerCase() !== "input" || le.type !== "checkbox" && le.type !== "radio" ? ae && nu(ae.elementType) && (mt = Pm) : mt = vj;
          if (mt && (mt = mt(e, ae))) {
            Fm(
              pe,
              mt,
              r,
              ue
            );
            break e;
          }
          Le && Le(e, le, ae), e === "focusout" && ae && le.type === "number" && ae.memoizedProps.value != null && tu(le, "number", le.value);
        }
        switch (Le = ae ? rt(ae) : window, e) {
          case "focusin":
            (Hm(Le) || Le.contentEditable === "true") && (us = Le, gu = ae, gi = null);
            break;
          case "focusout":
            gi = gu = us = null;
            break;
          case "mousedown":
            vu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            vu = !1, ep(pe, r, ue);
            break;
          case "selectionchange":
            if (xj) break;
          case "keydown":
          case "keyup":
            ep(pe, r, ue);
        }
        var Je;
        if (fu)
          e: {
            switch (e) {
              case "compositionstart":
                var dt = "onCompositionStart";
                break e;
              case "compositionend":
                dt = "onCompositionEnd";
                break e;
              case "compositionupdate":
                dt = "onCompositionUpdate";
                break e;
            }
            dt = void 0;
          }
        else
          cs ? Vm(e, r) && (dt = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (dt = "onCompositionStart");
        dt && (Um && r.locale !== "ko" && (cs || dt !== "onCompositionStart" ? dt === "onCompositionEnd" && cs && (Je = Dm()) : (Pa = ue, lu = "value" in Pa ? Pa.value : Pa.textContent, cs = !0)), Le = _o(ae, dt), 0 < Le.length && (dt = new Lm(
          dt,
          e,
          null,
          r,
          ue
        ), pe.push({ event: dt, listeners: Le }), Je ? dt.data = Je : (Je = qm(r), Je !== null && (dt.data = Je)))), (Je = uj ? dj(e, r) : fj(e, r)) && (dt = _o(ae, "onBeforeInput"), 0 < dt.length && (Le = new Lm(
          "onBeforeInput",
          "beforeinput",
          null,
          r,
          ue
        ), pe.push({
          event: Le,
          listeners: dt
        }), Le.data = Je)), aE(
          pe,
          e,
          ae,
          r,
          ue
        );
      }
      Cv(pe, n);
    });
  }
  function Vi(e, n, r) {
    return {
      instance: e,
      listener: n,
      currentTarget: r
    };
  }
  function _o(e, n) {
    for (var r = n + "Capture", l = []; e !== null; ) {
      var d = e, h = d.stateNode;
      if (d = d.tag, d !== 5 && d !== 26 && d !== 27 || h === null || (d = oi(e, r), d != null && l.unshift(
        Vi(e, d, h)
      ), d = oi(e, n), d != null && l.push(
        Vi(e, d, h)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function lE(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Rv(e, n, r, l, d) {
    for (var h = n._reactName, x = []; r !== null && r !== l; ) {
      var E = r, $ = E.alternate, ae = E.stateNode;
      if (E = E.tag, $ !== null && $ === l) break;
      E !== 5 && E !== 26 && E !== 27 || ae === null || ($ = ae, d ? (ae = oi(r, h), ae != null && x.unshift(
        Vi(r, ae, $)
      )) : d || (ae = oi(r, h), ae != null && x.push(
        Vi(r, ae, $)
      ))), r = r.return;
    }
    x.length !== 0 && e.push({ event: n, listeners: x });
  }
  var oE = /\r\n?/g, cE = /\u0000|\uFFFD/g;
  function _v(e) {
    return (typeof e == "string" ? e : "" + e).replace(oE, `
`).replace(cE, "");
  }
  function Mv(e, n) {
    return n = _v(n), _v(e) === n;
  }
  function jt(e, n, r, l, d, h) {
    switch (r) {
      case "children":
        typeof l == "string" ? n === "body" || n === "textarea" && l === "" || is(e, l) : (typeof l == "number" || typeof l == "bigint") && n !== "body" && is(e, "" + l);
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
        Mm(e, l, h);
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
        l = zl("" + l), e.setAttribute(r, l);
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
          typeof h == "function" && (r === "formAction" ? (n !== "input" && jt(e, n, "name", d.name, d, null), jt(
            e,
            n,
            "formEncType",
            d.formEncType,
            d,
            null
          ), jt(
            e,
            n,
            "formMethod",
            d.formMethod,
            d,
            null
          ), jt(
            e,
            n,
            "formTarget",
            d.formTarget,
            d,
            null
          )) : (jt(e, n, "encType", d.encType, d, null), jt(e, n, "method", d.method, d, null), jt(e, n, "target", d.target, d, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(r);
          break;
        }
        l = zl("" + l), e.setAttribute(r, l);
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
        r = zl("" + l), e.setAttributeNS(
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
        (!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (r = $w.get(r) || r, tt(e, r, l));
    }
  }
  function qd(e, n, r, l, d, h) {
    switch (r) {
      case "style":
        Mm(e, l, h);
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
        typeof l == "string" ? is(e, l) : (typeof l == "number" || typeof l == "bigint") && is(e, "" + l);
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
            if (r[0] === "o" && r[1] === "n" && (d = r.endsWith("Capture"), n = r.slice(2, d ? r.length - 7 : void 0), h = e[Ne] || null, h = h != null ? h[r] : null, typeof h == "function" && e.removeEventListener(n, h, d), typeof l == "function")) {
              typeof h != "function" && h !== null && (r in e ? e[r] = null : e.hasAttribute(r) && e.removeAttribute(r)), e.addEventListener(n, l, d);
              break e;
            }
            r in e ? e[r] = l : l === !0 ? e.setAttribute(r, "") : tt(e, r, l);
          }
    }
  }
  function mn(e, n, r) {
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
                  jt(e, n, h, x, r, null);
              }
          }
        d && jt(e, n, "srcSet", r.srcSet, r, null), l && jt(e, n, "src", r.src, r, null);
        return;
      case "input":
        it("invalid", e);
        var E = h = x = d = null, $ = null, ae = null;
        for (l in r)
          if (r.hasOwnProperty(l)) {
            var ue = r[l];
            if (ue != null)
              switch (l) {
                case "name":
                  d = ue;
                  break;
                case "type":
                  x = ue;
                  break;
                case "checked":
                  $ = ue;
                  break;
                case "defaultChecked":
                  ae = ue;
                  break;
                case "value":
                  h = ue;
                  break;
                case "defaultValue":
                  E = ue;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (ue != null)
                    throw Error(i(137, n));
                  break;
                default:
                  jt(e, n, l, ue, r, null);
              }
          }
        Cm(
          e,
          h,
          E,
          $,
          ae,
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
                jt(e, n, d, E, r, null);
            }
        n = h, r = x, e.multiple = !!l, n != null ? ss(e, !!l, n, !1) : r != null && ss(e, !!l, r, !0);
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
                jt(e, n, x, E, r, null);
            }
        Rm(e, l, d, h);
        return;
      case "option":
        for ($ in r)
          if (r.hasOwnProperty($) && (l = r[$], l != null))
            switch ($) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                jt(e, n, $, l, r, null);
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
        for (l = 0; l < Ii.length; l++)
          it(Ii[l], e);
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
        for (ae in r)
          if (r.hasOwnProperty(ae) && (l = r[ae], l != null))
            switch (ae) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(i(137, n));
              default:
                jt(e, n, ae, l, r, null);
            }
        return;
      default:
        if (nu(n)) {
          for (ue in r)
            r.hasOwnProperty(ue) && (l = r[ue], l !== void 0 && qd(
              e,
              n,
              ue,
              l,
              r,
              void 0
            ));
          return;
        }
    }
    for (E in r)
      r.hasOwnProperty(E) && (l = r[E], l != null && jt(e, n, E, l, r, null));
  }
  function uE(e, n, r, l) {
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
        var d = null, h = null, x = null, E = null, $ = null, ae = null, ue = null;
        for (oe in r) {
          var pe = r[oe];
          if (r.hasOwnProperty(oe) && pe != null)
            switch (oe) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                $ = pe;
              default:
                l.hasOwnProperty(oe) || jt(e, n, oe, null, l, pe);
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
                ae = oe;
                break;
              case "defaultChecked":
                ue = oe;
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
                oe !== pe && jt(
                  e,
                  n,
                  le,
                  oe,
                  l,
                  pe
                );
            }
        }
        eu(
          e,
          x,
          E,
          $,
          ae,
          ue,
          h,
          d
        );
        return;
      case "select":
        oe = x = E = le = null;
        for (h in r)
          if ($ = r[h], r.hasOwnProperty(h) && $ != null)
            switch (h) {
              case "value":
                break;
              case "multiple":
                oe = $;
              default:
                l.hasOwnProperty(h) || jt(
                  e,
                  n,
                  h,
                  null,
                  l,
                  $
                );
            }
        for (d in l)
          if (h = l[d], $ = r[d], l.hasOwnProperty(d) && (h != null || $ != null))
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
                h !== $ && jt(
                  e,
                  n,
                  d,
                  h,
                  l,
                  $
                );
            }
        n = E, r = x, l = oe, le != null ? ss(e, !!r, le, !1) : !!l != !!r && (n != null ? ss(e, !!r, n, !0) : ss(e, !!r, r ? [] : "", !1));
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
                jt(e, n, E, null, l, d);
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
                d !== h && jt(e, n, x, d, l, h);
            }
        Tm(e, le, oe);
        return;
      case "option":
        for (var ke in r)
          if (le = r[ke], r.hasOwnProperty(ke) && le != null && !l.hasOwnProperty(ke))
            switch (ke) {
              case "selected":
                e.selected = !1;
                break;
              default:
                jt(
                  e,
                  n,
                  ke,
                  null,
                  l,
                  le
                );
            }
        for ($ in l)
          if (le = l[$], oe = r[$], l.hasOwnProperty($) && le !== oe && (le != null || oe != null))
            switch ($) {
              case "selected":
                e.selected = le && typeof le != "function" && typeof le != "symbol";
                break;
              default:
                jt(
                  e,
                  n,
                  $,
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
        for (var Ve in r)
          le = r[Ve], r.hasOwnProperty(Ve) && le != null && !l.hasOwnProperty(Ve) && jt(e, n, Ve, null, l, le);
        for (ae in l)
          if (le = l[ae], oe = r[ae], l.hasOwnProperty(ae) && le !== oe && (le != null || oe != null))
            switch (ae) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (le != null)
                  throw Error(i(137, n));
                break;
              default:
                jt(
                  e,
                  n,
                  ae,
                  le,
                  l,
                  oe
                );
            }
        return;
      default:
        if (nu(n)) {
          for (var Et in r)
            le = r[Et], r.hasOwnProperty(Et) && le !== void 0 && !l.hasOwnProperty(Et) && qd(
              e,
              n,
              Et,
              void 0,
              l,
              le
            );
          for (ue in l)
            le = l[ue], oe = r[ue], !l.hasOwnProperty(ue) || le === oe || le === void 0 && oe === void 0 || qd(
              e,
              n,
              ue,
              le,
              l,
              oe
            );
          return;
        }
    }
    for (var X in r)
      le = r[X], r.hasOwnProperty(X) && le != null && !l.hasOwnProperty(X) && jt(e, n, X, null, l, le);
    for (pe in l)
      le = l[pe], oe = r[pe], !l.hasOwnProperty(pe) || le === oe || le == null && oe == null || jt(e, n, pe, le, l, oe);
  }
  function Av(e) {
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
  function dE() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, r = performance.getEntriesByType("resource"), l = 0; l < r.length; l++) {
        var d = r[l], h = d.transferSize, x = d.initiatorType, E = d.duration;
        if (h && E && Av(x)) {
          for (x = 0, E = d.responseEnd, l += 1; l < r.length; l++) {
            var $ = r[l], ae = $.startTime;
            if (ae > E) break;
            var ue = $.transferSize, pe = $.initiatorType;
            ue && Av(pe) && ($ = $.responseEnd, x += ue * ($ < E ? 1 : (E - ae) / ($ - ae)));
          }
          if (--l, n += 8 * (h + x) / (d.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Hd = null, Fd = null;
  function Mo(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function kv(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Dv(e, n) {
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
  function Pd(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Gd = null;
  function fE() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Gd ? !1 : (Gd = e, !0) : (Gd = null, !1);
  }
  var zv = typeof setTimeout == "function" ? setTimeout : void 0, hE = typeof clearTimeout == "function" ? clearTimeout : void 0, Ov = typeof Promise == "function" ? Promise : void 0, mE = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ov < "u" ? function(e) {
    return Ov.resolve(null).then(e).catch(pE);
  } : zv;
  function pE(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function or(e) {
    return e === "head";
  }
  function Lv(e, n) {
    var r = n, l = 0;
    do {
      var d = r.nextSibling;
      if (e.removeChild(r), d && d.nodeType === 8)
        if (r = d.data, r === "/$" || r === "/&") {
          if (l === 0) {
            e.removeChild(d), $s(n);
            return;
          }
          l--;
        } else if (r === "$" || r === "$?" || r === "$~" || r === "$!" || r === "&")
          l++;
        else if (r === "html")
          qi(e.ownerDocument.documentElement);
        else if (r === "head") {
          r = e.ownerDocument.head, qi(r);
          for (var h = r.firstChild; h; ) {
            var x = h.nextSibling, E = h.nodeName;
            h[et] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && h.rel.toLowerCase() === "stylesheet" || r.removeChild(h), h = x;
          }
        } else
          r === "body" && qi(e.ownerDocument.body);
      r = d;
    } while (r);
    $s(n);
  }
  function $v(e, n) {
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
  function Yd(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var r = n;
      switch (n = n.nextSibling, r.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Yd(r), Ct(r);
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
  function gE(e, n, r, l) {
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
  function vE(e, n, r) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !r || (e = Zn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Uv(e, n) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Zn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Kd(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Xd(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function yE(e, n) {
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
  var Qd = null;
  function Bv(e) {
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
  function Iv(e) {
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
  function Vv(e, n, r) {
    switch (n = Mo(r), e) {
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
  function qi(e) {
    for (var n = e.attributes; n.length; )
      e.removeAttributeNode(n[0]);
    Ct(e);
  }
  var Jn = /* @__PURE__ */ new Map(), qv = /* @__PURE__ */ new Set();
  function Ao(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Ua = F.d;
  F.d = {
    f: bE,
    r: xE,
    D: SE,
    C: wE,
    L: jE,
    m: EE,
    X: CE,
    S: NE,
    M: TE
  };
  function bE() {
    var e = Ua.f(), n = wo();
    return e || n;
  }
  function xE(e) {
    var n = $t(e);
    n !== null && n.tag === 5 && n.type === "form" ? sg(n) : Ua.r(e);
  }
  var zs = typeof document > "u" ? null : document;
  function Hv(e, n, r) {
    var l = zs;
    if (l && typeof n == "string" && n) {
      var d = Fn(n);
      d = 'link[rel="' + e + '"][href="' + d + '"]', typeof r == "string" && (d += '[crossorigin="' + r + '"]'), qv.has(d) || (qv.add(d), e = { rel: e, crossOrigin: r, href: n }, l.querySelector(d) === null && (n = l.createElement("link"), mn(n, "link", e), Mt(n), l.head.appendChild(n)));
    }
  }
  function SE(e) {
    Ua.D(e), Hv("dns-prefetch", e, null);
  }
  function wE(e, n) {
    Ua.C(e, n), Hv("preconnect", e, n);
  }
  function jE(e, n, r) {
    Ua.L(e, n, r);
    var l = zs;
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
          h = Os(e);
          break;
        case "script":
          h = Ls(e);
      }
      Jn.has(h) || (e = v(
        {
          rel: "preload",
          href: n === "image" && r && r.imageSrcSet ? void 0 : e,
          as: n
        },
        r
      ), Jn.set(h, e), l.querySelector(d) !== null || n === "style" && l.querySelector(Hi(h)) || n === "script" && l.querySelector(Fi(h)) || (n = l.createElement("link"), mn(n, "link", e), Mt(n), l.head.appendChild(n)));
    }
  }
  function EE(e, n) {
    Ua.m(e, n);
    var r = zs;
    if (r && e) {
      var l = n && typeof n.as == "string" ? n.as : "script", d = 'link[rel="modulepreload"][as="' + Fn(l) + '"][href="' + Fn(e) + '"]', h = d;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          h = Ls(e);
      }
      if (!Jn.has(h) && (e = v({ rel: "modulepreload", href: e }, n), Jn.set(h, e), r.querySelector(d) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (r.querySelector(Fi(h)))
              return;
        }
        l = r.createElement("link"), mn(l, "link", e), Mt(l), r.head.appendChild(l);
      }
    }
  }
  function NE(e, n, r) {
    Ua.S(e, n, r);
    var l = zs;
    if (l && e) {
      var d = Zt(l).hoistableStyles, h = Os(e);
      n = n || "default";
      var x = d.get(h);
      if (!x) {
        var E = { loading: 0, preload: null };
        if (x = l.querySelector(
          Hi(h)
        ))
          E.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": n },
            r
          ), (r = Jn.get(h)) && Zd(e, r);
          var $ = x = l.createElement("link");
          Mt($), mn($, "link", e), $._p = new Promise(function(ae, ue) {
            $.onload = ae, $.onerror = ue;
          }), $.addEventListener("load", function() {
            E.loading |= 1;
          }), $.addEventListener("error", function() {
            E.loading |= 2;
          }), E.loading |= 4, ko(x, n, l);
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
  function CE(e, n) {
    Ua.X(e, n);
    var r = zs;
    if (r && e) {
      var l = Zt(r).hoistableScripts, d = Ls(e), h = l.get(d);
      h || (h = r.querySelector(Fi(d)), h || (e = v({ src: e, async: !0 }, n), (n = Jn.get(d)) && Jd(e, n), h = r.createElement("script"), Mt(h), mn(h, "link", e), r.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(d, h));
    }
  }
  function TE(e, n) {
    Ua.M(e, n);
    var r = zs;
    if (r && e) {
      var l = Zt(r).hoistableScripts, d = Ls(e), h = l.get(d);
      h || (h = r.querySelector(Fi(d)), h || (e = v({ src: e, async: !0, type: "module" }, n), (n = Jn.get(d)) && Jd(e, n), h = r.createElement("script"), Mt(h), mn(h, "link", e), r.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(d, h));
    }
  }
  function Fv(e, n, r, l) {
    var d = (d = W.current) ? Ao(d) : null;
    if (!d) throw Error(i(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof r.precedence == "string" && typeof r.href == "string" ? (n = Os(r.href), r = Zt(
          d
        ).hoistableStyles, l = r.get(n), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, r.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (r.rel === "stylesheet" && typeof r.href == "string" && typeof r.precedence == "string") {
          e = Os(r.href);
          var h = Zt(
            d
          ).hoistableStyles, x = h.get(e);
          if (x || (d = d.ownerDocument || d, x = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, h.set(e, x), (h = d.querySelector(
            Hi(e)
          )) && !h._p && (x.instance = h, x.state.loading = 5), Jn.has(e) || (r = {
            rel: "preload",
            as: "style",
            href: r.href,
            crossOrigin: r.crossOrigin,
            integrity: r.integrity,
            media: r.media,
            hrefLang: r.hrefLang,
            referrerPolicy: r.referrerPolicy
          }, Jn.set(e, r), h || RE(
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
        return n = r.async, r = r.src, typeof r == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = Ls(r), r = Zt(
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
  function Os(e) {
    return 'href="' + Fn(e) + '"';
  }
  function Hi(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Pv(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function RE(e, n, r, l) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? l.loading = 1 : (n = e.createElement("link"), l.preload = n, n.addEventListener("load", function() {
      return l.loading |= 1;
    }), n.addEventListener("error", function() {
      return l.loading |= 2;
    }), mn(n, "link", r), Mt(n), e.head.appendChild(n));
  }
  function Ls(e) {
    return '[src="' + Fn(e) + '"]';
  }
  function Fi(e) {
    return "script[async]" + e;
  }
  function Gv(e, n, r) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + Fn(r.href) + '"]'
          );
          if (l)
            return n.instance = l, Mt(l), l;
          var d = v({}, r, {
            "data-href": r.href,
            "data-precedence": r.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), Mt(l), mn(l, "style", d), ko(l, r.precedence, e), n.instance = l;
        case "stylesheet":
          d = Os(r.href);
          var h = e.querySelector(
            Hi(d)
          );
          if (h)
            return n.state.loading |= 4, n.instance = h, Mt(h), h;
          l = Pv(r), (d = Jn.get(d)) && Zd(l, d), h = (e.ownerDocument || e).createElement("link"), Mt(h);
          var x = h;
          return x._p = new Promise(function(E, $) {
            x.onload = E, x.onerror = $;
          }), mn(h, "link", l), n.state.loading |= 4, ko(h, r.precedence, e), n.instance = h;
        case "script":
          return h = Ls(r.src), (d = e.querySelector(
            Fi(h)
          )) ? (n.instance = d, Mt(d), d) : (l = r, (d = Jn.get(h)) && (l = v({}, r), Jd(l, d)), e = e.ownerDocument || e, d = e.createElement("script"), Mt(d), mn(d, "link", l), e.head.appendChild(d), n.instance = d);
        case "void":
          return null;
        default:
          throw Error(i(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (l = n.instance, n.state.loading |= 4, ko(l, r.precedence, e));
    return n.instance;
  }
  function ko(e, n, r) {
    for (var l = r.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), d = l.length ? l[l.length - 1] : null, h = d, x = 0; x < l.length; x++) {
      var E = l[x];
      if (E.dataset.precedence === n) h = E;
      else if (h !== d) break;
    }
    h ? h.parentNode.insertBefore(e, h.nextSibling) : (n = r.nodeType === 9 ? r.head : r, n.insertBefore(e, n.firstChild));
  }
  function Zd(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function Jd(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var Do = null;
  function Yv(e, n, r) {
    if (Do === null) {
      var l = /* @__PURE__ */ new Map(), d = Do = /* @__PURE__ */ new Map();
      d.set(r, l);
    } else
      d = Do, l = d.get(r), l || (l = /* @__PURE__ */ new Map(), d.set(r, l));
    if (l.has(e)) return l;
    for (l.set(e, null), r = r.getElementsByTagName(e), d = 0; d < r.length; d++) {
      var h = r[d];
      if (!(h[et] || h[Ee] || e === "link" && h.getAttribute("rel") === "stylesheet") && h.namespaceURI !== "http://www.w3.org/2000/svg") {
        var x = h.getAttribute(n) || "";
        x = e + x;
        var E = l.get(x);
        E ? E.push(h) : l.set(x, [h]);
      }
    }
    return l;
  }
  function Kv(e, n, r) {
    e = e.ownerDocument || e, e.head.insertBefore(
      r,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function _E(e, n, r) {
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
  function Xv(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function ME(e, n, r, l) {
    if (r.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (r.state.loading & 4) === 0) {
      if (r.instance === null) {
        var d = Os(l.href), h = n.querySelector(
          Hi(d)
        );
        if (h) {
          n = h._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = zo.bind(e), n.then(e, e)), r.state.loading |= 4, r.instance = h, Mt(h);
          return;
        }
        h = n.ownerDocument || n, l = Pv(l), (d = Jn.get(d)) && Zd(l, d), h = h.createElement("link"), Mt(h);
        var x = h;
        x._p = new Promise(function(E, $) {
          x.onload = E, x.onerror = $;
        }), mn(h, "link", l), r.instance = h;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(r, n), (n = r.state.preload) && (r.state.loading & 3) === 0 && (e.count++, r = zo.bind(e), n.addEventListener("load", r), n.addEventListener("error", r));
    }
  }
  var Wd = 0;
  function AE(e, n) {
    return e.stylesheets && e.count === 0 && Lo(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(r) {
      var l = setTimeout(function() {
        if (e.stylesheets && Lo(e, e.stylesheets), e.unsuspend) {
          var h = e.unsuspend;
          e.unsuspend = null, h();
        }
      }, 6e4 + n);
      0 < e.imgBytes && Wd === 0 && (Wd = 62500 * dE());
      var d = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Lo(e, e.stylesheets), e.unsuspend)) {
            var h = e.unsuspend;
            e.unsuspend = null, h();
          }
        },
        (e.imgBytes > Wd ? 50 : 800) + n
      );
      return e.unsuspend = r, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(d);
      };
    } : null;
  }
  function zo() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Lo(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Oo = null;
  function Lo(e, n) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Oo = /* @__PURE__ */ new Map(), n.forEach(kE, e), Oo = null, zo.call(e));
  }
  function kE(e, n) {
    if (!(n.state.loading & 4)) {
      var r = Oo.get(e);
      if (r) var l = r.get(null);
      else {
        r = /* @__PURE__ */ new Map(), Oo.set(e, r);
        for (var d = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), h = 0; h < d.length; h++) {
          var x = d[h];
          (x.nodeName === "LINK" || x.getAttribute("media") !== "not all") && (r.set(x.dataset.precedence, x), l = x);
        }
        l && r.set(null, l);
      }
      d = n.instance, x = d.getAttribute("data-precedence"), h = r.get(x) || l, h === l && r.set(null, d), r.set(x, d), this.count++, l = zo.bind(this), d.addEventListener("load", l), d.addEventListener("error", l), h ? h.parentNode.insertBefore(d, h.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(d, e.firstChild)), n.state.loading |= 4;
    }
  }
  var Pi = {
    $$typeof: _,
    Provider: null,
    Consumer: null,
    _currentValue: U,
    _currentValue2: U,
    _threadCount: 0
  };
  function DE(e, n, r, l, d, h, x, E, $) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ze(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ze(0), this.hiddenUpdates = ze(null), this.identifierPrefix = l, this.onUncaughtError = d, this.onCaughtError = h, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = $, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Qv(e, n, r, l, d, h, x, E, $, ae, ue, pe) {
    return e = new DE(
      e,
      n,
      r,
      x,
      $,
      ae,
      ue,
      pe,
      E
    ), n = 1, h === !0 && (n |= 24), h = On(3, null, null, n), e.current = h, h.stateNode = e, n = ku(), n.refCount++, e.pooledCache = n, n.refCount++, h.memoizedState = {
      element: l,
      isDehydrated: r,
      cache: n
    }, Lu(h), e;
  }
  function Zv(e) {
    return e ? (e = hs, e) : hs;
  }
  function Jv(e, n, r, l, d, h) {
    d = Zv(d), l.context === null ? l.context = d : l.pendingContext = d, l = Za(n), l.payload = { element: r }, h = h === void 0 ? null : h, h !== null && (l.callback = h), r = Ja(e, l, n), r !== null && (Mn(r, e, n), ji(r, e, n));
  }
  function Wv(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < n ? r : n;
    }
  }
  function ef(e, n) {
    Wv(e, n), (e = e.alternate) && Wv(e, n);
  }
  function ey(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Dr(e, 67108864);
      n !== null && Mn(n, e, 67108864), ef(e, 67108864);
    }
  }
  function ty(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = In();
      n = H(n);
      var r = Dr(e, n);
      r !== null && Mn(r, e, n), ef(e, n);
    }
  }
  var $o = !0;
  function zE(e, n, r, l) {
    var d = A.T;
    A.T = null;
    var h = F.p;
    try {
      F.p = 2, tf(e, n, r, l);
    } finally {
      F.p = h, A.T = d;
    }
  }
  function OE(e, n, r, l) {
    var d = A.T;
    A.T = null;
    var h = F.p;
    try {
      F.p = 8, tf(e, n, r, l);
    } finally {
      F.p = h, A.T = d;
    }
  }
  function tf(e, n, r, l) {
    if ($o) {
      var d = nf(l);
      if (d === null)
        Vd(
          e,
          n,
          l,
          Uo,
          r
        ), ay(e, l);
      else if ($E(
        d,
        e,
        n,
        r,
        l
      ))
        l.stopPropagation();
      else if (ay(e, l), n & 4 && -1 < LE.indexOf(e)) {
        for (; d !== null; ) {
          var h = $t(d);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (h = h.stateNode, h.current.memoizedState.isDehydrated) {
                  var x = Ae(h.pendingLanes);
                  if (x !== 0) {
                    var E = h;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; x; ) {
                      var $ = 1 << 31 - Lt(x);
                      E.entanglements[1] |= $, x &= ~$;
                    }
                    ya(h), (vt & 6) === 0 && (xo = gt() + 500, Bi(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = Dr(h, 2), E !== null && Mn(E, h, 2), wo(), ef(h, 2);
            }
          if (h = nf(l), h === null && Vd(
            e,
            n,
            l,
            Uo,
            r
          ), h === d) break;
          d = h;
        }
        d !== null && l.stopPropagation();
      } else
        Vd(
          e,
          n,
          l,
          null,
          r
        );
    }
  }
  function nf(e) {
    return e = ru(e), af(e);
  }
  var Uo = null;
  function af(e) {
    if (Uo = null, e = St(e), e !== null) {
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
    return Uo = e, null;
  }
  function ny(e) {
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
        switch (we()) {
          case Te:
            return 2;
          case Ge:
            return 8;
          case Ye:
          case yt:
            return 32;
          case At:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var rf = !1, cr = null, ur = null, dr = null, Gi = /* @__PURE__ */ new Map(), Yi = /* @__PURE__ */ new Map(), fr = [], LE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function ay(e, n) {
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
        Gi.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Yi.delete(n.pointerId);
    }
  }
  function Ki(e, n, r, l, d, h) {
    return e === null || e.nativeEvent !== h ? (e = {
      blockedOn: n,
      domEventName: r,
      eventSystemFlags: l,
      nativeEvent: h,
      targetContainers: [d]
    }, n !== null && (n = $t(n), n !== null && ey(n)), e) : (e.eventSystemFlags |= l, n = e.targetContainers, d !== null && n.indexOf(d) === -1 && n.push(d), e);
  }
  function $E(e, n, r, l, d) {
    switch (n) {
      case "focusin":
        return cr = Ki(
          cr,
          e,
          n,
          r,
          l,
          d
        ), !0;
      case "dragenter":
        return ur = Ki(
          ur,
          e,
          n,
          r,
          l,
          d
        ), !0;
      case "mouseover":
        return dr = Ki(
          dr,
          e,
          n,
          r,
          l,
          d
        ), !0;
      case "pointerover":
        var h = d.pointerId;
        return Gi.set(
          h,
          Ki(
            Gi.get(h) || null,
            e,
            n,
            r,
            l,
            d
          )
        ), !0;
      case "gotpointercapture":
        return h = d.pointerId, Yi.set(
          h,
          Ki(
            Yi.get(h) || null,
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
  function ry(e) {
    var n = St(e.target);
    if (n !== null) {
      var r = u(n);
      if (r !== null) {
        if (n = r.tag, n === 13) {
          if (n = f(r), n !== null) {
            e.blockedOn = n, xe(e.priority, function() {
              ty(r);
            });
            return;
          }
        } else if (n === 31) {
          if (n = m(r), n !== null) {
            e.blockedOn = n, xe(e.priority, function() {
              ty(r);
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
  function Bo(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length; ) {
      var r = nf(e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var l = new r.constructor(
          r.type,
          r
        );
        au = l, r.target.dispatchEvent(l), au = null;
      } else
        return n = $t(r), n !== null && ey(n), e.blockedOn = r, !1;
      n.shift();
    }
    return !0;
  }
  function sy(e, n, r) {
    Bo(e) && r.delete(n);
  }
  function UE() {
    rf = !1, cr !== null && Bo(cr) && (cr = null), ur !== null && Bo(ur) && (ur = null), dr !== null && Bo(dr) && (dr = null), Gi.forEach(sy), Yi.forEach(sy);
  }
  function Io(e, n) {
    e.blockedOn === n && (e.blockedOn = null, rf || (rf = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      UE
    )));
  }
  var Vo = null;
  function iy(e) {
    Vo !== e && (Vo = e, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      function() {
        Vo === e && (Vo = null);
        for (var n = 0; n < e.length; n += 3) {
          var r = e[n], l = e[n + 1], d = e[n + 2];
          if (typeof l != "function") {
            if (af(l || r) === null)
              continue;
            break;
          }
          var h = $t(r);
          h !== null && (e.splice(n, 3), n -= 3, nd(
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
  function $s(e) {
    function n($) {
      return Io($, e);
    }
    cr !== null && Io(cr, e), ur !== null && Io(ur, e), dr !== null && Io(dr, e), Gi.forEach(n), Yi.forEach(n);
    for (var r = 0; r < fr.length; r++) {
      var l = fr[r];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < fr.length && (r = fr[0], r.blockedOn === null); )
      ry(r), r.blockedOn === null && fr.shift();
    if (r = (e.ownerDocument || e).$$reactFormReplay, r != null)
      for (l = 0; l < r.length; l += 3) {
        var d = r[l], h = r[l + 1], x = d[Ne] || null;
        if (typeof h == "function")
          x || iy(r);
        else if (x) {
          var E = null;
          if (h && h.hasAttribute("formAction")) {
            if (d = h, x = h[Ne] || null)
              E = x.formAction;
            else if (af(d) !== null) continue;
          } else E = x.action;
          typeof E == "function" ? r[l + 1] = E : (r.splice(l, 3), l -= 3), iy(r);
        }
      }
  }
  function ly() {
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
  function sf(e) {
    this._internalRoot = e;
  }
  qo.prototype.render = sf.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(i(409));
    var r = n.current, l = In();
    Jv(r, l, e, n, null, null);
  }, qo.prototype.unmount = sf.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      Jv(e.current, 2, null, e, null, null), wo(), n[Oe] = null;
    }
  };
  function qo(e) {
    this._internalRoot = e;
  }
  qo.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = ve();
      e = { blockedOn: null, target: e, priority: n };
      for (var r = 0; r < fr.length && n !== 0 && n < fr[r].priority; r++) ;
      fr.splice(r, 0, e), r === 0 && ry(e);
    }
  };
  var oy = a.version;
  if (oy !== "19.2.5")
    throw Error(
      i(
        527,
        oy,
        "19.2.5"
      )
    );
  F.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
    return e = p(n), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var BE = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: A,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ho = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ho.isDisabled && Ho.supportsFiber)
      try {
        wn = Ho.inject(
          BE
        ), Pt = Ho;
      } catch {
      }
  }
  return Qi.createRoot = function(e, n) {
    if (!o(e)) throw Error(i(299));
    var r = !1, l = "", d = pg, h = gg, x = vg;
    return n != null && (n.unstable_strictMode === !0 && (r = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onUncaughtError !== void 0 && (d = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (x = n.onRecoverableError)), n = Qv(
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
      ly
    ), e[Oe] = n.current, Id(e), new sf(n);
  }, Qi.hydrateRoot = function(e, n, r) {
    if (!o(e)) throw Error(i(299));
    var l = !1, d = "", h = pg, x = gg, E = vg, $ = null;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (d = r.identifierPrefix), r.onUncaughtError !== void 0 && (h = r.onUncaughtError), r.onCaughtError !== void 0 && (x = r.onCaughtError), r.onRecoverableError !== void 0 && (E = r.onRecoverableError), r.formState !== void 0 && ($ = r.formState)), n = Qv(
      e,
      1,
      !0,
      n,
      r ?? null,
      l,
      d,
      $,
      h,
      x,
      E,
      ly
    ), n.context = Zv(null), r = n.current, l = In(), l = H(l), d = Za(l), d.callback = null, Ja(r, d, l), r = l, n.current.lanes = r, Ue(n, r), ya(n), e[Oe] = n.current, Id(e), new qo(n);
  }, Qi.version = "19.2.5", Qi;
}
var yy;
function QE() {
  if (yy) return cf.exports;
  yy = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), cf.exports = XE(), cf.exports;
}
var ZE = QE();
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
var Px = (t) => {
  throw TypeError(t);
}, JE = (t, a, s) => a.has(t) || Px("Cannot " + s), hf = (t, a, s) => (JE(t, a, "read from private field"), s ? s.call(t) : a.get(t)), WE = (t, a, s) => a.has(t) ? Px("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, s);
function by(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function eN(t = {}) {
  let { initialEntries: a = ["/"], initialIndex: s, v5Compat: i = !1 } = t, o;
  o = a.map(
    (S, j) => b(
      S,
      typeof S == "string" ? null : S.state,
      j === 0 ? "default" : void 0,
      typeof S == "string" ? void 0 : S.unstable_mask
    )
  );
  let u = y(
    s ?? o.length - 1
  ), f = "POP", m = null;
  function y(S) {
    return Math.min(Math.max(S, 0), o.length - 1);
  }
  function p() {
    return o[u];
  }
  function b(S, j = null, N, R) {
    let T = eh(
      o ? p().pathname : "/",
      S,
      j,
      N,
      R
    );
    return Xt(
      T.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        S
      )}`
    ), T;
  }
  function v(S) {
    return typeof S == "string" ? S : xa(S);
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
    createURL(S) {
      return new URL(v(S), "http://localhost");
    },
    encodeLocation(S) {
      let j = typeof S == "string" ? fa(S) : S;
      return {
        pathname: j.pathname || "",
        search: j.search || "",
        hash: j.hash || ""
      };
    },
    push(S, j) {
      f = "PUSH";
      let N = by(S) ? S : b(S, j);
      u += 1, o.splice(u, o.length, N), i && m && m({ action: f, location: N, delta: 1 });
    },
    replace(S, j) {
      f = "REPLACE";
      let N = by(S) ? S : b(S, j);
      o[u] = N, i && m && m({ action: f, location: N, delta: 0 });
    },
    go(S) {
      f = "POP";
      let j = y(u + S), N = o[j];
      u = j, m && m({ action: f, location: N, delta: S });
    },
    listen(S) {
      return m = S, () => {
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
function tN() {
  return Math.random().toString(36).substring(2, 10);
}
function eh(t, a, s = null, i, o) {
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
    key: a && a.key || i || tN(),
    unstable_mask: o
  };
}
function xa({
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
function nN(t, a = !1) {
  let s = "http://localhost";
  typeof window < "u" && (s = window.location.origin !== "null" ? window.location.origin : window.location.href), nt(s, "No window.location.(origin|href) available to create URL");
  let i = typeof t == "string" ? t : xa(t);
  return i = i.replace(/ $/, "%20"), !a && i.startsWith("//") && (i = s + i), new URL(i, s);
}
var ol, xy = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(t) {
    if (WE(this, ol, /* @__PURE__ */ new Map()), t)
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
    if (hf(this, ol).has(t))
      return hf(this, ol).get(t);
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
    hf(this, ol).set(t, a);
  }
};
ol = /* @__PURE__ */ new WeakMap();
var aN = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function rN(t) {
  return aN.has(
    t
  );
}
var sN = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function iN(t) {
  return sN.has(
    t
  );
}
function lN(t) {
  return t.index === !0;
}
function pl(t, a, s = [], i = {}, o = !1) {
  return t.map((u, f) => {
    let m = [...s, String(f)], y = typeof u.id == "string" ? u.id : m.join("-");
    if (nt(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), nt(
      o || !i[y],
      `Found a route id collision on id "${y}".  Route id's must be globally unique within Data Router usages`
    ), lN(u)) {
      let p = {
        ...u,
        id: y
      };
      return i[y] = Sy(
        p,
        a(p)
      ), p;
    } else {
      let p = {
        ...u,
        id: y,
        children: void 0
      };
      return i[y] = Sy(
        p,
        a(p)
      ), u.children && (p.children = pl(
        u.children,
        a,
        m,
        i,
        o
      )), p;
    }
  });
}
function Sy(t, a) {
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
function br(t, a, s = "/") {
  return cl(t, a, s, !1);
}
function cl(t, a, s, i) {
  let o = typeof a == "string" ? fa(a) : a, u = aa(o.pathname || "/", s);
  if (u == null)
    return null;
  let f = Gx(t);
  cN(f);
  let m = null;
  for (let y = 0; m == null && y < f.length; ++y) {
    let p = xN(u);
    m = yN(
      f[y],
      p,
      i
    );
  }
  return m;
}
function oN(t, a) {
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
function Gx(t, a = [], s = [], i = "", o = !1) {
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
    let v = ea([i, b.relativePath]), w = s.concat(b);
    f.children && f.children.length > 0 && (nt(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      f.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${v}".`
    ), Gx(
      f.children,
      a,
      w,
      v,
      y
    )), !(f.path == null && !f.index) && a.push({
      path: v,
      score: gN(v, f.index),
      routesMeta: w
    });
  };
  return t.forEach((f, m) => {
    if (f.path === "" || !f.path?.includes("?"))
      u(f, m);
    else
      for (let y of Yx(f.path))
        u(f, m, !0, y);
  }), a;
}
function Yx(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [s, ...i] = a, o = s.endsWith("?"), u = s.replace(/\?$/, "");
  if (i.length === 0)
    return o ? [u, ""] : [u];
  let f = Yx(i.join("/")), m = [];
  return m.push(
    ...f.map(
      (y) => y === "" ? u : [u, y].join("/")
    )
  ), o && m.push(...f), m.map(
    (y) => t.startsWith("/") && y === "" ? "/" : y
  );
}
function cN(t) {
  t.sort(
    (a, s) => a.score !== s.score ? s.score - a.score : vN(
      a.routesMeta.map((i) => i.childrenIndex),
      s.routesMeta.map((i) => i.childrenIndex)
    )
  );
}
var uN = /^:[\w-]+$/, dN = 3, fN = 2, hN = 1, mN = 10, pN = -2, wy = (t) => t === "*";
function gN(t, a) {
  let s = t.split("/"), i = s.length;
  return s.some(wy) && (i += pN), a && (i += fN), s.filter((o) => !wy(o)).reduce(
    (o, u) => o + (uN.test(u) ? dN : u === "" ? hN : mN),
    i
  );
}
function vN(t, a) {
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
function yN(t, a, s = !1) {
  let { routesMeta: i } = t, o = {}, u = "/", f = [];
  for (let m = 0; m < i.length; ++m) {
    let y = i[m], p = m === i.length - 1, b = u === "/" ? a : a.slice(u.length) || "/", v = Ec(
      { path: y.relativePath, caseSensitive: y.caseSensitive, end: p },
      b
    ), w = y.route;
    if (!v && p && s && !i[i.length - 1].route.index && (v = Ec(
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
      pathnameBase: jN(
        ea([u, v.pathnameBase])
      ),
      route: w
    }), v.pathnameBase !== "/" && (u = ea([u, v.pathnameBase]));
  }
  return f;
}
function Ec(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [s, i] = bN(
    t.path,
    t.caseSensitive,
    t.end
  ), o = a.match(s);
  if (!o) return null;
  let u = o[0], f = u.replace(/(.)\/+$/, "$1"), m = o.slice(1);
  return {
    params: i.reduce(
      (p, { paramName: b, isOptional: v }, w) => {
        if (b === "*") {
          let j = m[w] || "";
          f = u.slice(0, u.length - j.length).replace(/(.)\/+$/, "$1");
        }
        const S = m[w];
        return v && !S ? p[b] = void 0 : p[b] = (S || "").replace(/%2F/g, "/"), p;
      },
      {}
    ),
    pathname: u,
    pathnameBase: f,
    pattern: t
  };
}
function bN(t, a = !1, s = !0) {
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
function xN(t) {
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
function SN({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : ea([t, a]);
}
var Kx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Oh = (t) => Kx.test(t);
function wN(t, a = "/") {
  let {
    pathname: s,
    search: i = "",
    hash: o = ""
  } = typeof t == "string" ? fa(t) : t, u;
  return s ? (s = $h(s), s.startsWith("/") ? u = jy(s.substring(1), "/") : u = jy(s, a)) : u = a, {
    pathname: u,
    search: EN(i),
    hash: NN(o)
  };
}
function jy(t, a) {
  let s = Nc(a).split("/");
  return t.split("/").forEach((o) => {
    o === ".." ? s.length > 1 && s.pop() : o !== "." && s.push(o);
  }), s.length > 1 ? s.join("/") : "/";
}
function mf(t, a, s, i) {
  return `Cannot include a '${t}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    i
  )}].  Please separate it out to the \`to.${s}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Xx(t) {
  return t.filter(
    (a, s) => s === 0 || a.route.path && a.route.path.length > 0
  );
}
function Lh(t) {
  let a = Xx(t);
  return a.map(
    (s, i) => i === a.length - 1 ? s.pathname : s.pathnameBase
  );
}
function Ic(t, a, s, i = !1) {
  let o;
  typeof t == "string" ? o = fa(t) : (o = { ...t }, nt(
    !o.pathname || !o.pathname.includes("?"),
    mf("?", "pathname", "search", o)
  ), nt(
    !o.pathname || !o.pathname.includes("#"),
    mf("#", "pathname", "hash", o)
  ), nt(
    !o.search || !o.search.includes("#"),
    mf("#", "search", "hash", o)
  ));
  let u = t === "" || o.pathname === "", f = u ? "/" : o.pathname, m;
  if (f == null)
    m = s;
  else {
    let v = a.length - 1;
    if (!i && f.startsWith("..")) {
      let w = f.split("/");
      for (; w[0] === ".."; )
        w.shift(), v -= 1;
      o.pathname = w.join("/");
    }
    m = v >= 0 ? a[v] : "/";
  }
  let y = wN(o, m), p = f && f !== "/" && f.endsWith("/"), b = (u || f === ".") && s.endsWith("/");
  return !y.pathname.endsWith("/") && (p || b) && (y.pathname += "/"), y;
}
var $h = (t) => t.replace(/\/\/+/g, "/"), ea = (t) => $h(t.join("/")), Nc = (t) => t.replace(/\/+$/, ""), jN = (t) => Nc(t).replace(/^\/*/, "/"), EN = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, NN = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, CN = (t, a = 302) => {
  let s = a;
  typeof s == "number" ? s = { status: s } : typeof s.status > "u" && (s.status = 302);
  let i = new Headers(s.headers);
  return i.set("Location", t), new Response(null, { ...s, headers: i });
}, Vc = class {
  constructor(t, a, s, i = !1) {
    this.status = t, this.statusText = a || "", this.internal = i, s instanceof Error ? (this.data = s.toString(), this.error = s) : this.data = s;
  }
};
function gl(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.internal == "boolean" && "data" in t;
}
function jl(t) {
  let a = t.map((s) => s.route.path).filter(Boolean);
  return ea(a) || "/";
}
var Qx = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Zx(t, a) {
  let s = t;
  if (typeof s != "string" || !Kx.test(s))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: s
    };
  let i = s, o = !1;
  if (Qx)
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
var Sr = Symbol("Uninstrumented");
function TN(t, a) {
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
    let o = Ps(s.lazy, a.lazy, () => {
    });
    o && (i.lazy = o);
  }
  if (typeof a.lazy == "object") {
    let o = a.lazy;
    ["middleware", "loader", "action"].forEach((u) => {
      let f = o[u], m = s[`lazy.${u}`];
      if (typeof f == "function" && m.length > 0) {
        let y = Ps(m, f, () => {
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
      let f = u[Sr] ?? u, m = Ps(
        s[o],
        f,
        (...y) => Ey(y[0])
      );
      m && (o === "loader" && f.hydrate === !0 && (m.hydrate = !0), m[Sr] = f, i[o] = m);
    }
  }), a.middleware && a.middleware.length > 0 && s.middleware.length > 0 && (i.middleware = a.middleware.map((o) => {
    let u = o[Sr] ?? o, f = Ps(
      s.middleware,
      u,
      (...m) => Ey(m[0])
    );
    return f ? (f[Sr] = u, f) : o;
  })), i;
}
function RN(t, a) {
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
    let i = t.navigate[Sr] ?? t.navigate, o = Ps(
      s.navigate,
      i,
      (...u) => {
        let [f, m] = u;
        return {
          to: typeof f == "number" || typeof f == "string" ? f : f ? xa(f) : ".",
          ...Ny(t, m ?? {})
        };
      }
    );
    o && (o[Sr] = i, t.navigate = o);
  }
  if (s.fetch.length > 0) {
    let i = t.fetch[Sr] ?? t.fetch, o = Ps(s.fetch, i, (...u) => {
      let [f, , m, y] = u;
      return {
        href: m ?? ".",
        fetcherKey: f,
        ...Ny(t, y ?? {})
      };
    });
    o && (o[Sr] = i, t.fetch = o);
  }
  return t;
}
function Ps(t, a, s) {
  return t.length === 0 ? null : async (...i) => {
    let o = await Jx(
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
async function Jx(t, a, s, i) {
  let o = t[i], u;
  if (o) {
    let f, m = async () => (f ? console.error("You cannot call instrumented handlers more than once") : f = Jx(t, a, s, i - 1), u = await f, nt(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
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
function Ey(t) {
  let { request: a, context: s, params: i, unstable_pattern: o } = t;
  return {
    request: _N(a),
    params: { ...i },
    unstable_pattern: o,
    context: MN(s)
  };
}
function Ny(t, a) {
  return {
    currentUrl: xa(t.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function _N(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function MN(t) {
  if (kN(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var AN = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function kN(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === AN;
}
var Wx = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], DN = new Set(
  Wx
), zN = [
  "GET",
  ...Wx
], ON = new Set(zN), e1 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), LN = /* @__PURE__ */ new Set([307, 308]), pf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, $N = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Zi = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, UN = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), t1 = "remix-router-transitions", n1 = Symbol("ResetLoaderData");
function BN(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, s = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  nt(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let i = t.hydrationRouteProperties || [], o = t.mapRouteProperties || UN, u = o;
  if (t.unstable_instrumentations) {
    let z = t.unstable_instrumentations;
    u = (H) => ({
      ...o(H),
      ...TN(
        z.map((Q) => Q.route).filter(Boolean),
        H
      )
    });
  }
  let f = {}, m = pl(
    t.routes,
    u,
    void 0,
    f
  ), y, p = t.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let b = t.dataStrategy || FN, v = {
    unstable_passThroughRequests: !1,
    ...t.future
  }, w = null, S = /* @__PURE__ */ new Set(), j = null, N = null, R = null, T = t.hydrationData != null, L = br(m, t.history.location, p), _ = !1, C = null, I, Y;
  if (L == null && !t.patchRoutesOnNavigation) {
    let z = Wn(404, {
      pathname: t.history.location.pathname
    }), { matches: H, route: Q } = Fo(m);
    I = !0, Y = !I, L = H, C = { [Q.id]: z };
  } else if (L && !t.hydrationData && ze(
    L,
    m,
    t.history.location.pathname
  ).active && (L = null), L)
    if (L.some((z) => z.route.lazy))
      I = !1, Y = !I;
    else if (!L.some((z) => Uh(z.route)))
      I = !0, Y = !I;
    else {
      let z = t.hydrationData ? t.hydrationData.loaderData : null, H = t.hydrationData ? t.hydrationData.errors : null, Q = L;
      if (H) {
        let ve = L.findIndex(
          (xe) => H[xe.route.id] !== void 0
        );
        Q = Q.slice(0, ve + 1);
      }
      Y = !1, I = !0, Q.forEach((ve) => {
        let xe = a1(ve.route, z, H);
        Y = Y || xe.renderFallback, I = I && !xe.shouldLoad;
      });
    }
  else {
    I = !1, Y = !I, L = [];
    let z = ze(
      null,
      m,
      t.history.location.pathname
    );
    z.active && z.matches && (_ = !0, L = z.matches);
  }
  let ie, M = {
    historyAction: t.history.action,
    location: t.history.location,
    matches: L,
    initialized: I,
    renderFallback: Y,
    navigation: pf,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: t.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: t.hydrationData && t.hydrationData.loaderData || {},
    actionData: t.hydrationData && t.hydrationData.actionData || null,
    errors: t.hydrationData && t.hydrationData.errors || C,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, V = "POP", D = null, P = !1, J, Z = !1, G = /* @__PURE__ */ new Map(), re = null, A = !1, F = !1, U = /* @__PURE__ */ new Set(), se = /* @__PURE__ */ new Map(), de = 0, k = -1, ee = /* @__PURE__ */ new Map(), te = /* @__PURE__ */ new Set(), K = /* @__PURE__ */ new Map(), B = /* @__PURE__ */ new Map(), W = /* @__PURE__ */ new Set(), ce = /* @__PURE__ */ new Map(), ye, Me = null;
  function lt() {
    if (w = t.history.listen(
      ({ action: z, location: H, delta: Q }) => {
        if (ye) {
          ye(), ye = void 0;
          return;
        }
        Xt(
          ce.size === 0 || Q != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ve = fe({
          currentLocation: M.location,
          nextLocation: H,
          historyAction: z
        });
        if (ve && Q != null) {
          let xe = new Promise((je) => {
            ye = je;
          });
          t.history.go(Q * -1), sn(ve, {
            state: "blocked",
            location: H,
            proceed() {
              sn(ve, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: H
              }), xe.then(() => t.history.go(Q));
            },
            reset() {
              let je = new Map(M.blockers);
              je.set(ve, Zi), qe({ blockers: je });
            }
          }), D?.resolve(), D = null;
          return;
        }
        return _t(z, H);
      }
    ), s) {
      oC(a, G);
      let z = () => cC(a, G);
      a.addEventListener("pagehide", z), re = () => a.removeEventListener("pagehide", z);
    }
    return M.initialized || _t("POP", M.location, {
      initialHydration: !0
    }), ie;
  }
  function Ce() {
    w && w(), re && re(), S.clear(), J && J.abort(), M.fetchers.forEach((z, H) => wn(H)), M.blockers.forEach((z, H) => Qt(H));
  }
  function Fe(z) {
    return S.add(z), () => S.delete(z);
  }
  function qe(z, H = {}) {
    z.matches && (z.matches = z.matches.map((xe) => {
      let je = f[xe.route.id], Ee = xe.route;
      return Ee.element !== je.element || Ee.errorElement !== je.errorElement || Ee.hydrateFallbackElement !== je.hydrateFallbackElement ? {
        ...xe,
        route: je
      } : xe;
    })), M = {
      ...M,
      ...z
    };
    let Q = [], ve = [];
    M.fetchers.forEach((xe, je) => {
      xe.state === "idle" && (W.has(je) ? Q.push(je) : ve.push(je));
    }), W.forEach((xe) => {
      !M.fetchers.has(xe) && !se.has(xe) && Q.push(xe);
    }), [...S].forEach(
      (xe) => xe(M, {
        deletedFetchers: Q,
        newErrors: z.errors ?? null,
        viewTransitionOpts: H.viewTransitionOpts,
        flushSync: H.flushSync === !0
      })
    ), Q.forEach((xe) => wn(xe)), ve.forEach((xe) => M.fetchers.delete(xe));
  }
  function Pe(z, H, { flushSync: Q } = {}) {
    let ve = M.actionData != null && M.navigation.formMethod != null && bn(M.navigation.formMethod) && M.navigation.state === "loading" && z.state?._isRedirect !== !0, xe;
    H.actionData ? Object.keys(H.actionData).length > 0 ? xe = H.actionData : xe = null : ve ? xe = M.actionData : xe = null;
    let je = H.loaderData ? Ly(
      M.loaderData,
      H.loaderData,
      H.matches || [],
      H.errors
    ) : M.loaderData, Ee = M.blockers;
    Ee.size > 0 && (Ee = new Map(Ee), Ee.forEach((Ie, $e) => Ee.set($e, Zi)));
    let Ne = A ? !1 : be(z, H.matches || M.matches), Oe = P === !0 || M.navigation.formMethod != null && bn(M.navigation.formMethod) && z.state?._isRedirect !== !0;
    y && (m = y, y = void 0), A || V === "POP" || (V === "PUSH" ? t.history.push(z, z.state) : V === "REPLACE" && t.history.replace(z, z.state));
    let _e;
    if (V === "POP") {
      let Ie = G.get(M.location.pathname);
      Ie && Ie.has(z.pathname) ? _e = {
        currentLocation: M.location,
        nextLocation: z
      } : G.has(z.pathname) && (_e = {
        currentLocation: z,
        nextLocation: M.location
      });
    } else if (Z) {
      let Ie = G.get(M.location.pathname);
      Ie ? Ie.add(z.pathname) : (Ie = /* @__PURE__ */ new Set([z.pathname]), G.set(M.location.pathname, Ie)), _e = {
        currentLocation: M.location,
        nextLocation: z
      };
    }
    qe(
      {
        ...H,
        // matches, errors, fetchers go through as-is
        actionData: xe,
        loaderData: je,
        historyAction: V,
        location: z,
        initialized: !0,
        renderFallback: !1,
        navigation: pf,
        revalidation: "idle",
        restoreScrollPosition: Ne,
        preventScrollReset: Oe,
        blockers: Ee
      },
      {
        viewTransitionOpts: _e,
        flushSync: Q === !0
      }
    ), V = "POP", P = !1, Z = !1, A = !1, F = !1, D?.resolve(), D = null, Me?.resolve(), Me = null;
  }
  async function It(z, H) {
    if (D?.resolve(), D = null, typeof z == "number") {
      D || (D = Iy());
      let Ct = D.promise;
      return t.history.go(z), Ct;
    }
    let Q = th(
      M.location,
      M.matches,
      p,
      z,
      H?.fromRouteId,
      H?.relative
    ), { path: ve, submission: xe, error: je } = Cy(
      !1,
      Q,
      H
    ), Ee;
    H?.unstable_mask && (Ee = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof H.unstable_mask == "string" ? fa(H.unstable_mask) : {
        ...M.location.unstable_mask,
        ...H.unstable_mask
      }
    });
    let Ne = M.location, Oe = eh(
      Ne,
      ve,
      H && H.state,
      void 0,
      Ee
    );
    Oe = {
      ...Oe,
      ...t.history.encodeLocation(Oe)
    };
    let _e = H && H.replace != null ? H.replace : void 0, Ie = "PUSH";
    _e === !0 ? Ie = "REPLACE" : _e === !1 || xe != null && bn(xe.formMethod) && xe.formAction === M.location.pathname + M.location.search && (Ie = "REPLACE");
    let $e = H && "preventScrollReset" in H ? H.preventScrollReset === !0 : void 0, ht = (H && H.flushSync) === !0, et = fe({
      currentLocation: Ne,
      nextLocation: Oe,
      historyAction: Ie
    });
    if (et) {
      sn(et, {
        state: "blocked",
        location: Oe,
        proceed() {
          sn(et, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: Oe
          }), It(z, H);
        },
        reset() {
          let Ct = new Map(M.blockers);
          Ct.set(et, Zi), qe({ blockers: Ct });
        }
      });
      return;
    }
    await _t(Ie, Oe, {
      submission: xe,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: je,
      preventScrollReset: $e,
      replace: H && H.replace,
      enableViewTransition: H && H.viewTransition,
      flushSync: ht,
      callSiteDefaultShouldRevalidate: H && H.unstable_defaultShouldRevalidate
    });
  }
  function Vt() {
    Me || (Me = Iy()), Ye(), qe({ revalidation: "loading" });
    let z = Me.promise;
    return M.navigation.state === "submitting" ? z : M.navigation.state === "idle" ? (_t(M.historyAction, M.location, {
      startUninterruptedRevalidation: !0
    }), z) : (_t(
      V || M.historyAction,
      M.navigation.location,
      {
        overrideNavigation: M.navigation,
        // Proxy through any rending view transition
        enableViewTransition: Z === !0
      }
    ), z);
  }
  async function _t(z, H, Q) {
    J && J.abort(), J = null, V = z, A = (Q && Q.startUninterruptedRevalidation) === !0, he(M.location, M.matches), P = (Q && Q.preventScrollReset) === !0, Z = (Q && Q.enableViewTransition) === !0;
    let ve = y || m, xe = Q && Q.overrideNavigation, je = Q?.initialHydration && M.matches && M.matches.length > 0 && !_ ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      M.matches
    ) : br(ve, H, p), Ee = (Q && Q.flushSync) === !0;
    if (je && M.initialized && !F && JN(M.location, H) && !(Q && Q.submission && bn(Q.submission.formMethod))) {
      Pe(H, { matches: je }, { flushSync: Ee });
      return;
    }
    let Ne = ze(je, ve, H.pathname);
    if (Ne.active && Ne.matches && (je = Ne.matches), !je) {
      let { error: St, notFoundMatches: $t, route: rt } = Ae(
        H.pathname
      );
      Pe(
        H,
        {
          matches: $t,
          loaderData: {},
          errors: {
            [rt.id]: St
          }
        },
        { flushSync: Ee }
      );
      return;
    }
    J = new AbortController();
    let Oe = qs(
      t.history,
      H,
      J.signal,
      Q && Q.submission
    ), _e = t.getContext ? await t.getContext() : new xy(), Ie;
    if (Q && Q.pendingError)
      Ie = [
        xr(je).route.id,
        { type: "error", error: Q.pendingError }
      ];
    else if (Q && Q.submission && bn(Q.submission.formMethod)) {
      let St = await Re(
        Oe,
        H,
        Q.submission,
        je,
        _e,
        Ne.active,
        Q && Q.initialHydration === !0,
        { replace: Q.replace, flushSync: Ee }
      );
      if (St.shortCircuited)
        return;
      if (St.pendingActionResult) {
        let [$t, rt] = St.pendingActionResult;
        if (Vn(rt) && gl(rt.error) && rt.error.status === 404) {
          J = null, Pe(H, {
            matches: St.matches,
            loaderData: {},
            errors: {
              [$t]: rt.error
            }
          });
          return;
        }
      }
      je = St.matches || je, Ie = St.pendingActionResult, xe = gf(H, Q.submission), Ee = !1, Ne.active = !1, Oe = qs(
        t.history,
        Oe.url,
        Oe.signal
      );
    }
    let {
      shortCircuited: $e,
      matches: ht,
      loaderData: et,
      errors: Ct
    } = await He(
      Oe,
      H,
      je,
      _e,
      Ne.active,
      xe,
      Q && Q.submission,
      Q && Q.fetcherSubmission,
      Q && Q.replace,
      Q && Q.initialHydration === !0,
      Ee,
      Ie,
      Q && Q.callSiteDefaultShouldRevalidate
    );
    $e || (J = null, Pe(H, {
      matches: ht || je,
      ...$y(Ie),
      loaderData: et,
      errors: Ct
    }));
  }
  async function Re(z, H, Q, ve, xe, je, Ee, Ne = {}) {
    Ye();
    let Oe = iC(H, Q);
    if (qe({ navigation: Oe }, { flushSync: Ne.flushSync === !0 }), je) {
      let $e = await Ue(
        ve,
        H.pathname,
        z.signal
      );
      if ($e.type === "aborted")
        return { shortCircuited: !0 };
      if ($e.type === "error") {
        if ($e.partialMatches.length === 0) {
          let { matches: et, route: Ct } = Fo(m);
          return {
            matches: et,
            pendingActionResult: [
              Ct.id,
              {
                type: "error",
                error: $e.error
              }
            ]
          };
        }
        let ht = xr($e.partialMatches).route.id;
        return {
          matches: $e.partialMatches,
          pendingActionResult: [
            ht,
            {
              type: "error",
              error: $e.error
            }
          ]
        };
      } else if ($e.matches)
        ve = $e.matches;
      else {
        let { notFoundMatches: ht, error: et, route: Ct } = Ae(
          H.pathname
        );
        return {
          matches: ht,
          pendingActionResult: [
            Ct.id,
            {
              type: "error",
              error: et
            }
          ]
        };
      }
    }
    let _e, Ie = pc(ve, H);
    if (!Ie.route.action && !Ie.route.lazy)
      _e = {
        type: "error",
        error: Wn(405, {
          method: z.method,
          pathname: H.pathname,
          routeId: Ie.route.id
        })
      };
    else {
      let $e = Ks(
        u,
        f,
        z,
        H,
        ve,
        Ie,
        Ee ? [] : i,
        xe
      ), ht = await Te(
        z,
        H,
        $e,
        xe,
        null
      );
      if (_e = ht[Ie.route.id], !_e) {
        for (let et of ve)
          if (ht[et.route.id]) {
            _e = ht[et.route.id];
            break;
          }
      }
      if (z.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Kr(_e)) {
      let $e;
      return Ne && Ne.replace != null ? $e = Ne.replace : $e = Dy(
        _e.response.headers.get("Location"),
        new URL(z.url),
        p,
        t.history
      ) === M.location.pathname + M.location.search, await we(z, _e, !0, {
        submission: Q,
        replace: $e
      }), { shortCircuited: !0 };
    }
    if (Vn(_e)) {
      let $e = xr(ve, Ie.route.id);
      return (Ne && Ne.replace) !== !0 && (V = "PUSH"), {
        matches: ve,
        pendingActionResult: [
          $e.route.id,
          _e,
          Ie.route.id
        ]
      };
    }
    return {
      matches: ve,
      pendingActionResult: [Ie.route.id, _e]
    };
  }
  async function He(z, H, Q, ve, xe, je, Ee, Ne, Oe, _e, Ie, $e, ht) {
    let et = je || gf(H, Ee), Ct = Ee || Ne || By(et), St = !A && !_e;
    if (xe) {
      if (St) {
        let Gt = We($e);
        qe(
          {
            navigation: et,
            ...Gt !== void 0 ? { actionData: Gt } : {}
          },
          {
            flushSync: Ie
          }
        );
      }
      let tt = await Ue(
        Q,
        H.pathname,
        z.signal
      );
      if (tt.type === "aborted")
        return { shortCircuited: !0 };
      if (tt.type === "error") {
        if (tt.partialMatches.length === 0) {
          let { matches: gn, route: Jt } = Fo(m);
          return {
            matches: gn,
            loaderData: {},
            errors: {
              [Jt.id]: tt.error
            }
          };
        }
        let Gt = xr(tt.partialMatches).route.id;
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
        let { error: Gt, notFoundMatches: gn, route: Jt } = Ae(
          H.pathname
        );
        return {
          matches: gn,
          loaderData: {},
          errors: {
            [Jt.id]: Gt
          }
        };
      }
    }
    let $t = y || m, { dsMatches: rt, revalidatingFetchers: Zt } = Ty(
      z,
      ve,
      u,
      f,
      t.history,
      M,
      Q,
      Ct,
      H,
      _e ? [] : i,
      _e === !0,
      F,
      U,
      W,
      K,
      te,
      $t,
      p,
      t.patchRoutesOnNavigation != null,
      $e,
      ht
    );
    if (k = ++de, !t.dataStrategy && !rt.some((tt) => tt.shouldLoad) && !rt.some(
      (tt) => tt.route.middleware && tt.route.middleware.length > 0
    ) && Zt.length === 0) {
      let tt = sa();
      return Pe(
        H,
        {
          matches: Q,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: $e && Vn($e[1]) ? { [$e[0]]: $e[1].error } : null,
          ...$y($e),
          ...tt ? { fetchers: new Map(M.fetchers) } : {}
        },
        { flushSync: Ie }
      ), { shortCircuited: !0 };
    }
    if (St) {
      let tt = {};
      if (!xe) {
        tt.navigation = et;
        let Gt = We($e);
        Gt !== void 0 && (tt.actionData = Gt);
      }
      Zt.length > 0 && (tt.fetchers = Nt(Zt)), qe(tt, { flushSync: Ie });
    }
    Zt.forEach((tt) => {
      kt(tt.key), tt.controller && se.set(tt.key, tt.controller);
    });
    let Mt = () => Zt.forEach((tt) => kt(tt.key));
    J && J.signal.addEventListener(
      "abort",
      Mt
    );
    let { loaderResults: Fa, fetcherResults: ia } = await Ge(
      rt,
      Zt,
      z,
      H,
      ve
    );
    if (z.signal.aborted)
      return { shortCircuited: !0 };
    J && J.signal.removeEventListener(
      "abort",
      Mt
    ), Zt.forEach((tt) => se.delete(tt.key));
    let on = Po(Fa);
    if (on)
      return await we(z, on.result, !0, {
        replace: Oe
      }), { shortCircuited: !0 };
    if (on = Po(ia), on)
      return te.add(on.key), await we(z, on.result, !0, {
        replace: Oe
      }), { shortCircuited: !0 };
    let { loaderData: ha, errors: Rr } = Oy(
      M,
      Q,
      Fa,
      $e,
      Zt,
      ia
    );
    _e && M.errors && (Rr = { ...M.errors, ...Rr });
    let ma = sa(), _r = jn(k), ns = ma || _r || Zt.length > 0;
    return {
      matches: Q,
      loaderData: ha,
      errors: Rr,
      ...ns ? { fetchers: new Map(M.fetchers) } : {}
    };
  }
  function We(z) {
    if (z && !Vn(z[1]))
      return {
        [z[0]]: z[1].data
      };
    if (M.actionData)
      return Object.keys(M.actionData).length === 0 ? null : M.actionData;
  }
  function Nt(z) {
    return z.forEach((H) => {
      let Q = M.fetchers.get(H.key), ve = Ji(
        void 0,
        Q ? Q.data : void 0
      );
      M.fetchers.set(H.key, ve);
    }), new Map(M.fetchers);
  }
  async function at(z, H, Q, ve) {
    kt(z);
    let xe = (ve && ve.flushSync) === !0, je = y || m, Ee = th(
      M.location,
      M.matches,
      p,
      Q,
      H,
      ve?.relative
    ), Ne = br(je, Ee, p), Oe = ze(Ne, je, Ee);
    if (Oe.active && Oe.matches && (Ne = Oe.matches), !Ne) {
      At(
        z,
        H,
        Wn(404, { pathname: Ee }),
        { flushSync: xe }
      );
      return;
    }
    let { path: _e, submission: Ie, error: $e } = Cy(
      !0,
      Ee,
      ve
    );
    if ($e) {
      At(z, H, $e, { flushSync: xe });
      return;
    }
    let ht = t.getContext ? await t.getContext() : new xy(), et = (ve && ve.preventScrollReset) === !0;
    if (Ie && bn(Ie.formMethod)) {
      await Xe(
        z,
        H,
        _e,
        Ne,
        ht,
        Oe.active,
        xe,
        et,
        Ie,
        ve && ve.unstable_defaultShouldRevalidate
      );
      return;
    }
    K.set(z, { routeId: H, path: _e }), await gt(
      z,
      H,
      _e,
      Ne,
      ht,
      Oe.active,
      xe,
      et,
      Ie
    );
  }
  async function Xe(z, H, Q, ve, xe, je, Ee, Ne, Oe, _e) {
    Ye(), K.delete(z);
    let Ie = M.fetchers.get(z);
    yt(z, lC(Oe, Ie), {
      flushSync: Ee
    });
    let $e = new AbortController(), ht = qs(
      t.history,
      Q,
      $e.signal,
      Oe
    );
    if (je) {
      let Dt = await Ue(
        ve,
        new URL(ht.url).pathname,
        ht.signal,
        z
      );
      if (Dt.type === "aborted")
        return;
      if (Dt.type === "error") {
        At(z, H, Dt.error, { flushSync: Ee });
        return;
      } else if (Dt.matches)
        ve = Dt.matches;
      else {
        At(
          z,
          H,
          Wn(404, { pathname: Q }),
          { flushSync: Ee }
        );
        return;
      }
    }
    let et = pc(ve, Q);
    if (!et.route.action && !et.route.lazy) {
      let Dt = Wn(405, {
        method: Oe.formMethod,
        pathname: Q,
        routeId: H
      });
      At(z, H, Dt, { flushSync: Ee });
      return;
    }
    se.set(z, $e);
    let Ct = de, St = Ks(
      u,
      f,
      ht,
      Q,
      ve,
      et,
      i,
      xe
    ), $t = await Te(
      ht,
      Q,
      St,
      xe,
      z
    ), rt = $t[et.route.id];
    if (!rt) {
      for (let Dt of St)
        if ($t[Dt.route.id]) {
          rt = $t[Dt.route.id];
          break;
        }
    }
    if (ht.signal.aborted) {
      se.get(z) === $e && se.delete(z);
      return;
    }
    if (W.has(z)) {
      if (Kr(rt) || Vn(rt)) {
        yt(z, Ba(void 0));
        return;
      }
    } else {
      if (Kr(rt))
        if (se.delete(z), k > Ct) {
          yt(z, Ba(void 0));
          return;
        } else
          return te.add(z), yt(z, Ji(Oe)), we(ht, rt, !1, {
            fetcherSubmission: Oe,
            preventScrollReset: Ne
          });
      if (Vn(rt)) {
        At(z, H, rt.error);
        return;
      }
    }
    let Zt = M.navigation.location || M.location, Mt = qs(
      t.history,
      Zt,
      $e.signal
    ), Fa = y || m, ia = M.navigation.state !== "idle" ? br(Fa, M.navigation.location, p) : M.matches;
    nt(ia, "Didn't find any matches after fetcher action");
    let on = ++de;
    ee.set(z, on);
    let ha = Ji(Oe, rt.data);
    M.fetchers.set(z, ha);
    let { dsMatches: Rr, revalidatingFetchers: ma } = Ty(
      Mt,
      xe,
      u,
      f,
      t.history,
      M,
      ia,
      Oe,
      Zt,
      i,
      !1,
      F,
      U,
      W,
      K,
      te,
      Fa,
      p,
      t.patchRoutesOnNavigation != null,
      [et.route.id, rt],
      _e
    );
    ma.filter((Dt) => Dt.key !== z).forEach((Dt) => {
      let as = Dt.key, rs = M.fetchers.get(as), kl = Ji(
        void 0,
        rs ? rs.data : void 0
      );
      M.fetchers.set(as, kl), kt(as), Dt.controller && se.set(as, Dt.controller);
    }), qe({ fetchers: new Map(M.fetchers) });
    let _r = () => ma.forEach((Dt) => kt(Dt.key));
    $e.signal.addEventListener(
      "abort",
      _r
    );
    let { loaderResults: ns, fetcherResults: tt } = await Ge(
      Rr,
      ma,
      Mt,
      Zt,
      xe
    );
    if ($e.signal.aborted)
      return;
    if ($e.signal.removeEventListener(
      "abort",
      _r
    ), ee.delete(z), se.delete(z), ma.forEach((Dt) => se.delete(Dt.key)), M.fetchers.has(z)) {
      let Dt = Ba(rt.data);
      M.fetchers.set(z, Dt);
    }
    let Gt = Po(ns);
    if (Gt)
      return we(
        Mt,
        Gt.result,
        !1,
        { preventScrollReset: Ne }
      );
    if (Gt = Po(tt), Gt)
      return te.add(Gt.key), we(
        Mt,
        Gt.result,
        !1,
        { preventScrollReset: Ne }
      );
    let { loaderData: gn, errors: Jt } = Oy(
      M,
      ia,
      ns,
      void 0,
      ma,
      tt
    );
    jn(on), M.navigation.state === "loading" && on > k ? (nt(V, "Expected pending action"), J && J.abort(), Pe(M.navigation.location, {
      matches: ia,
      loaderData: gn,
      errors: Jt,
      fetchers: new Map(M.fetchers)
    })) : (qe({
      errors: Jt,
      loaderData: Ly(
        M.loaderData,
        gn,
        ia,
        Jt
      ),
      fetchers: new Map(M.fetchers)
    }), F = !1);
  }
  async function gt(z, H, Q, ve, xe, je, Ee, Ne, Oe) {
    let _e = M.fetchers.get(z);
    yt(
      z,
      Ji(
        Oe,
        _e ? _e.data : void 0
      ),
      { flushSync: Ee }
    );
    let Ie = new AbortController(), $e = qs(
      t.history,
      Q,
      Ie.signal
    );
    if (je) {
      let rt = await Ue(
        ve,
        new URL($e.url).pathname,
        $e.signal,
        z
      );
      if (rt.type === "aborted")
        return;
      if (rt.type === "error") {
        At(z, H, rt.error, { flushSync: Ee });
        return;
      } else if (rt.matches)
        ve = rt.matches;
      else {
        At(
          z,
          H,
          Wn(404, { pathname: Q }),
          { flushSync: Ee }
        );
        return;
      }
    }
    let ht = pc(ve, Q);
    se.set(z, Ie);
    let et = de, Ct = Ks(
      u,
      f,
      $e,
      Q,
      ve,
      ht,
      i,
      xe
    ), St = await Te(
      $e,
      Q,
      Ct,
      xe,
      z
    ), $t = St[ht.route.id];
    if (!$t) {
      for (let rt of ve)
        if (St[rt.route.id]) {
          $t = St[rt.route.id];
          break;
        }
    }
    if (se.get(z) === Ie && se.delete(z), !$e.signal.aborted) {
      if (W.has(z)) {
        yt(z, Ba(void 0));
        return;
      }
      if (Kr($t))
        if (k > et) {
          yt(z, Ba(void 0));
          return;
        } else {
          te.add(z), await we($e, $t, !1, {
            preventScrollReset: Ne
          });
          return;
        }
      if (Vn($t)) {
        At(z, H, $t.error);
        return;
      }
      yt(z, Ba($t.data));
    }
  }
  async function we(z, H, Q, {
    submission: ve,
    fetcherSubmission: xe,
    preventScrollReset: je,
    replace: Ee
  } = {}) {
    Q || (D?.resolve(), D = null), H.response.headers.has("X-Remix-Revalidate") && (F = !0);
    let Ne = H.response.headers.get("Location");
    nt(Ne, "Expected a Location header on the redirect Response"), Ne = Dy(
      Ne,
      new URL(z.url),
      p,
      t.history
    );
    let Oe = eh(M.location, Ne, {
      _isRedirect: !0
    });
    if (s) {
      let Ct = !1;
      if (H.response.headers.has("X-Remix-Reload-Document"))
        Ct = !0;
      else if (Oh(Ne)) {
        const St = nN(Ne, !0);
        Ct = // Hard reload if it's an absolute URL to a new origin
        St.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        aa(St.pathname, p) == null;
      }
      if (Ct) {
        Ee ? a.location.replace(Ne) : a.location.assign(Ne);
        return;
      }
    }
    J = null;
    let _e = Ee === !0 || H.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Ie, formAction: $e, formEncType: ht } = M.navigation;
    !ve && !xe && Ie && $e && ht && (ve = By(M.navigation));
    let et = ve || xe;
    if (LN.has(H.response.status) && et && bn(et.formMethod))
      await _t(_e, Oe, {
        submission: {
          ...et,
          formAction: Ne
        },
        // Preserve these flags across redirects
        preventScrollReset: je || P,
        enableViewTransition: Q ? Z : void 0
      });
    else {
      let Ct = gf(
        Oe,
        ve
      );
      await _t(_e, Oe, {
        overrideNavigation: Ct,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: xe,
        // Preserve these flags across redirects
        preventScrollReset: je || P,
        enableViewTransition: Q ? Z : void 0
      });
    }
  }
  async function Te(z, H, Q, ve, xe) {
    let je, Ee = {};
    try {
      je = await GN(
        b,
        z,
        H,
        Q,
        xe,
        ve,
        !1
      );
    } catch (Ne) {
      return Q.filter((Oe) => Oe.shouldLoad).forEach((Oe) => {
        Ee[Oe.route.id] = {
          type: "error",
          error: Ne
        };
      }), Ee;
    }
    if (z.signal.aborted)
      return Ee;
    if (!bn(z.method))
      for (let Ne of Q) {
        if (je[Ne.route.id]?.type === "error")
          break;
        !je.hasOwnProperty(Ne.route.id) && !M.loaderData.hasOwnProperty(Ne.route.id) && (!M.errors || !M.errors.hasOwnProperty(Ne.route.id)) && Ne.shouldCallHandler() && (je[Ne.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${Ne.route.id}`
          )
        });
      }
    for (let [Ne, Oe] of Object.entries(je))
      if (nC(Oe)) {
        let _e = Oe.result;
        Ee[Ne] = {
          type: "redirect",
          response: QN(
            _e,
            z,
            Ne,
            Q,
            p
          )
        };
      } else
        Ee[Ne] = await XN(Oe);
    return Ee;
  }
  async function Ge(z, H, Q, ve, xe) {
    let je = Te(
      Q,
      ve,
      z,
      xe,
      null
    ), Ee = Promise.all(
      H.map(async (_e) => {
        if (_e.matches && _e.match && _e.request && _e.controller) {
          let $e = (await Te(
            _e.request,
            _e.path,
            _e.matches,
            xe,
            _e.key
          ))[_e.match.route.id];
          return { [_e.key]: $e };
        } else
          return Promise.resolve({
            [_e.key]: {
              type: "error",
              error: Wn(404, {
                pathname: _e.path
              })
            }
          });
      })
    ), Ne = await je, Oe = (await Ee).reduce(
      (_e, Ie) => Object.assign(_e, Ie),
      {}
    );
    return {
      loaderResults: Ne,
      fetcherResults: Oe
    };
  }
  function Ye() {
    F = !0, K.forEach((z, H) => {
      se.has(H) && U.add(H), kt(H);
    });
  }
  function yt(z, H, Q = {}) {
    M.fetchers.set(z, H), qe(
      { fetchers: new Map(M.fetchers) },
      { flushSync: (Q && Q.flushSync) === !0 }
    );
  }
  function At(z, H, Q, ve = {}) {
    let xe = xr(M.matches, H);
    wn(z), qe(
      {
        errors: {
          [xe.route.id]: Q
        },
        fetchers: new Map(M.fetchers)
      },
      { flushSync: (ve && ve.flushSync) === !0 }
    );
  }
  function Hn(z) {
    return B.set(z, (B.get(z) || 0) + 1), W.has(z) && W.delete(z), M.fetchers.get(z) || $N;
  }
  function Sn(z, H) {
    kt(z, H?.reason), yt(z, Ba(null));
  }
  function wn(z) {
    let H = M.fetchers.get(z);
    se.has(z) && !(H && H.state === "loading" && ee.has(z)) && kt(z), K.delete(z), ee.delete(z), te.delete(z), W.delete(z), U.delete(z), M.fetchers.delete(z);
  }
  function Pt(z) {
    let H = (B.get(z) || 0) - 1;
    H <= 0 ? (B.delete(z), W.add(z)) : B.set(z, H), qe({ fetchers: new Map(M.fetchers) });
  }
  function kt(z, H) {
    let Q = se.get(z);
    Q && (Q.abort(H), se.delete(z));
  }
  function Lt(z) {
    for (let H of z) {
      let Q = Hn(H), ve = Ba(Q.data);
      M.fetchers.set(H, ve);
    }
  }
  function sa() {
    let z = [], H = !1;
    for (let Q of te) {
      let ve = M.fetchers.get(Q);
      nt(ve, `Expected fetcher: ${Q}`), ve.state === "loading" && (te.delete(Q), z.push(Q), H = !0);
    }
    return Lt(z), H;
  }
  function jn(z) {
    let H = [];
    for (let [Q, ve] of ee)
      if (ve < z) {
        let xe = M.fetchers.get(Q);
        nt(xe, `Expected fetcher: ${Q}`), xe.state === "loading" && (kt(Q), ee.delete(Q), H.push(Q));
      }
    return Lt(H), H.length > 0;
  }
  function un(z, H) {
    let Q = M.blockers.get(z) || Zi;
    return ce.get(z) !== H && ce.set(z, H), Q;
  }
  function Qt(z) {
    M.blockers.delete(z), ce.delete(z);
  }
  function sn(z, H) {
    let Q = M.blockers.get(z) || Zi;
    nt(
      Q.state === "unblocked" && H.state === "blocked" || Q.state === "blocked" && H.state === "blocked" || Q.state === "blocked" && H.state === "proceeding" || Q.state === "blocked" && H.state === "unblocked" || Q.state === "proceeding" && H.state === "unblocked",
      `Invalid blocker state transition: ${Q.state} -> ${H.state}`
    );
    let ve = new Map(M.blockers);
    ve.set(z, H), qe({ blockers: ve });
  }
  function fe({
    currentLocation: z,
    nextLocation: H,
    historyAction: Q
  }) {
    if (ce.size === 0)
      return;
    ce.size > 1 && Xt(!1, "A router only supports one blocker at a time");
    let ve = Array.from(ce.entries()), [xe, je] = ve[ve.length - 1], Ee = M.blockers.get(xe);
    if (!(Ee && Ee.state === "proceeding") && je({ currentLocation: z, nextLocation: H, historyAction: Q }))
      return xe;
  }
  function Ae(z) {
    let H = Wn(404, { pathname: z }), Q = y || m, { matches: ve, route: xe } = Fo(Q);
    return { notFoundMatches: ve, route: xe, error: H };
  }
  function ge(z, H, Q) {
    if (j = z, R = H, N = Q || null, !T && M.navigation === pf) {
      T = !0;
      let ve = be(M.location, M.matches);
      ve != null && qe({ restoreScrollPosition: ve });
    }
    return () => {
      j = null, R = null, N = null;
    };
  }
  function O(z, H) {
    return N && N(
      z,
      H.map((ve) => oN(ve, M.loaderData))
    ) || z.key;
  }
  function he(z, H) {
    if (j && R) {
      let Q = O(z, H);
      j[Q] = R();
    }
  }
  function be(z, H) {
    if (j) {
      let Q = O(z, H), ve = j[Q];
      if (typeof ve == "number")
        return ve;
    }
    return null;
  }
  function ze(z, H, Q) {
    if (t.patchRoutesOnNavigation)
      if (z) {
        if (Object.keys(z[0].params).length > 0)
          return { active: !0, matches: cl(
            H,
            Q,
            p,
            !0
          ) };
      } else
        return { active: !0, matches: cl(
          H,
          Q,
          p,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function Ue(z, H, Q, ve) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: z };
    let xe = z;
    for (; ; ) {
      let je = y == null, Ee = y || m, Ne = f;
      try {
        await t.patchRoutesOnNavigation({
          signal: Q,
          path: H,
          matches: xe,
          fetcherKey: ve,
          patch: (Ie, $e) => {
            Q.aborted || Ry(
              Ie,
              $e,
              Ee,
              Ne,
              u,
              !1
            );
          }
        });
      } catch (Ie) {
        return { type: "error", error: Ie, partialMatches: xe };
      } finally {
        je && !Q.aborted && (m = [...m]);
      }
      if (Q.aborted)
        return { type: "aborted" };
      let Oe = br(Ee, H, p), _e = null;
      if (Oe) {
        if (Object.keys(Oe[0].params).length === 0)
          return { type: "success", matches: Oe };
        if (_e = cl(
          Ee,
          H,
          p,
          !0
        ), !(_e && xe.length < _e.length && ot(
          xe,
          _e.slice(0, xe.length)
        )))
          return { type: "success", matches: Oe };
      }
      if (_e || (_e = cl(
        Ee,
        H,
        p,
        !0
      )), !_e || ot(xe, _e))
        return { type: "success", matches: null };
      xe = _e;
    }
  }
  function ot(z, H) {
    return z.length === H.length && z.every((Q, ve) => Q.route.id === H[ve].route.id);
  }
  function qt(z) {
    f = {}, y = pl(
      z,
      u,
      void 0,
      f
    );
  }
  function ct(z, H, Q = !1) {
    let ve = y == null;
    Ry(
      z,
      H,
      y || m,
      f,
      u,
      Q
    ), ve && (m = [...m], qe({}));
  }
  return ie = {
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
    subscribe: Fe,
    enableScrollRestoration: ge,
    navigate: It,
    fetch: at,
    revalidate: Vt,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (z) => t.history.createHref(z),
    encodeLocation: (z) => t.history.encodeLocation(z),
    getFetcher: Hn,
    resetFetcher: Sn,
    deleteFetcher: Pt,
    dispose: Ce,
    getBlocker: un,
    deleteBlocker: Qt,
    patchRoutes: ct,
    _internalFetchControllers: se,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: qt,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(z) {
      qe(z);
    }
  }, t.unstable_instrumentations && (ie = RN(
    ie,
    t.unstable_instrumentations.map((z) => z.router).filter(Boolean)
  )), ie;
}
function IN(t) {
  return t != null && ("formData" in t && t.formData != null || "body" in t && t.body !== void 0);
}
function th(t, a, s, i, o, u) {
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
  let y = Ic(
    i || ".",
    Lh(f),
    aa(t.pathname, s) || t.pathname,
    u === "path"
  );
  if (i == null && (y.search = t.search, y.hash = t.hash), (i == null || i === "" || i === ".") && m) {
    let p = Ih(y.search);
    if (m.route.index && !p)
      y.search = y.search ? y.search.replace(/^\?/, "?index&") : "?index";
    else if (!m.route.index && p) {
      let b = new URLSearchParams(y.search), v = b.getAll("index");
      b.delete("index"), v.filter((S) => S).forEach((S) => b.append("index", S));
      let w = b.toString();
      y.search = w ? `?${w}` : "";
    }
  }
  return s !== "/" && (y.pathname = SN({ basename: s, pathname: y.pathname })), xa(y);
}
function Cy(t, a, s) {
  if (!s || !IN(s))
    return { path: a };
  if (s.formMethod && !sC(s.formMethod))
    return {
      path: a,
      error: Wn(405, { method: s.formMethod })
    };
  let i = () => ({
    path: a,
    error: Wn(400, { type: "invalid-body" })
  }), u = (s.formMethod || "get").toUpperCase(), f = u1(a);
  if (s.body !== void 0) {
    if (s.formEncType === "text/plain") {
      if (!bn(u))
        return i();
      let v = typeof s.body == "string" ? s.body : s.body instanceof FormData || s.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(s.body.entries()).reduce(
          (w, [S, j]) => `${w}${S}=${j}
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
    m = ah(s.formData), y = s.formData;
  else if (s.body instanceof FormData)
    m = ah(s.body), y = s.body;
  else if (s.body instanceof URLSearchParams)
    m = s.body, y = zy(m);
  else if (s.body == null)
    m = new URLSearchParams(), y = new FormData();
  else
    try {
      m = new URLSearchParams(s.body), y = zy(m);
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
  return t && b.search && Ih(b.search) && m.append("index", ""), b.search = `?${m}`, { path: xa(b), submission: p };
}
function Ty(t, a, s, i, o, u, f, m, y, p, b, v, w, S, j, N, R, T, L, _, C) {
  let I = _ ? Vn(_[1]) ? _[1].error : _[1].data : void 0, Y = o.createURL(u.location), ie = o.createURL(y), M;
  if (b && u.errors) {
    let re = Object.keys(u.errors)[0];
    M = f.findIndex((A) => A.route.id === re);
  } else if (_ && Vn(_[1])) {
    let re = _[0];
    M = f.findIndex((A) => A.route.id === re) - 1;
  }
  let V = _ ? _[1].statusCode : void 0, D = V && V >= 400, P = {
    currentUrl: Y,
    currentParams: u.matches[0]?.params || {},
    nextUrl: ie,
    nextParams: f[0].params,
    ...m,
    actionResult: I,
    actionStatus: V
  }, J = jl(f), Z = f.map((re, A) => {
    let { route: F } = re, U = null;
    if (M != null && A > M)
      U = !1;
    else if (F.lazy)
      U = !0;
    else if (!Uh(F))
      U = !1;
    else if (b) {
      let { shouldLoad: ee } = a1(
        F,
        u.loaderData,
        u.errors
      );
      U = ee;
    } else VN(u.loaderData, u.matches[A], re) && (U = !0);
    if (U !== null)
      return nh(
        s,
        i,
        t,
        y,
        J,
        re,
        p,
        a,
        U
      );
    let se = !1;
    typeof C == "boolean" ? se = C : D ? se = !1 : (v || Y.pathname + Y.search === ie.pathname + ie.search || Y.search !== ie.search || qN(u.matches[A], re)) && (se = !0);
    let de = {
      ...P,
      defaultShouldRevalidate: se
    }, k = fl(re, de);
    return nh(
      s,
      i,
      t,
      y,
      J,
      re,
      p,
      a,
      k,
      de,
      C
    );
  }), G = [];
  return j.forEach((re, A) => {
    if (b || !f.some((K) => K.route.id === re.routeId) || S.has(A))
      return;
    let F = u.fetchers.get(A), U = F && F.state !== "idle" && F.data === void 0, se = br(R, re.path, T);
    if (!se) {
      if (L && U)
        return;
      G.push({
        key: A,
        routeId: re.routeId,
        path: re.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (N.has(A))
      return;
    let de = pc(se, re.path), k = new AbortController(), ee = qs(
      o,
      re.path,
      k.signal
    ), te = null;
    if (w.has(A))
      w.delete(A), te = Ks(
        s,
        i,
        ee,
        re.path,
        se,
        de,
        p,
        a
      );
    else if (U)
      v && (te = Ks(
        s,
        i,
        ee,
        re.path,
        se,
        de,
        p,
        a
      ));
    else {
      let K;
      typeof C == "boolean" ? K = C : D ? K = !1 : K = v;
      let B = {
        ...P,
        defaultShouldRevalidate: K
      };
      fl(de, B) && (te = Ks(
        s,
        i,
        ee,
        re.path,
        se,
        de,
        p,
        a,
        B
      ));
    }
    te && G.push({
      key: A,
      routeId: re.routeId,
      path: re.path,
      matches: te,
      match: de,
      request: ee,
      controller: k
    });
  }), { dsMatches: Z, revalidatingFetchers: G };
}
function Uh(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function a1(t, a, s) {
  if (t.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!Uh(t))
    return { shouldLoad: !1, renderFallback: !1 };
  let i = a != null && t.id in a, o = s != null && s[t.id] !== void 0;
  if (!i && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof t.loader == "function" && t.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !i };
  let u = !i && !o;
  return { shouldLoad: u, renderFallback: u };
}
function VN(t, a, s) {
  let i = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    s.route.id !== a.route.id
  ), o = !t.hasOwnProperty(s.route.id);
  return i || o;
}
function qN(t, a) {
  let s = t.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    t.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    s != null && s.endsWith("*") && t.params["*"] !== a.params["*"]
  );
}
function fl(t, a) {
  if (t.route.shouldRevalidate) {
    let s = t.route.shouldRevalidate(a);
    if (typeof s == "boolean")
      return s;
  }
  return a.defaultShouldRevalidate;
}
function Ry(t, a, s, i, o, u) {
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
      (v) => r1(p, v)
    );
    b ? y.push({ existingRoute: b, newRoute: p }) : m.push(p);
  }), m.length > 0) {
    let p = pl(
      m,
      o,
      [t || "_", "patch", String(f?.length || "0")],
      i
    );
    f.push(...p);
  }
  if (u && y.length > 0)
    for (let p = 0; p < y.length; p++) {
      let { existingRoute: b, newRoute: v } = y[p], w = b, [S] = pl(
        [v],
        o,
        [],
        // Doesn't matter for mutated routes since they already have an id
        {},
        // Don't touch the manifest here since we're updating in place
        !0
      );
      Object.assign(w, {
        element: S.element ? S.element : w.element,
        errorElement: S.errorElement ? S.errorElement : w.errorElement,
        hydrateFallbackElement: S.hydrateFallbackElement ? S.hydrateFallbackElement : w.hydrateFallbackElement
      });
    }
}
function r1(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (s, i) => a.children?.some((o) => r1(s, o))
  ) ?? !1 : !1;
}
var _y = /* @__PURE__ */ new WeakMap(), s1 = ({
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
  let f = _y.get(o);
  f || (f = {}, _y.set(o, f));
  let m = f[t];
  if (m)
    return m;
  let y = (async () => {
    let p = rN(t), v = o[t] !== void 0 && t !== "hasErrorBoundary";
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
      let w = await u();
      w != null && (Object.assign(o, { [t]: w }), Object.assign(o, i(o)));
    }
    typeof o.lazy == "object" && (o.lazy[t] = void 0, Object.values(o.lazy).every((w) => w === void 0) && (o.lazy = void 0));
  })();
  return f[t] = y, y;
}, My = /* @__PURE__ */ new WeakMap();
function HN(t, a, s, i, o) {
  let u = s[t.id];
  if (nt(u, "No route found in manifest"), !t.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof t.lazy == "function") {
    let b = My.get(u);
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
      let w = await t.lazy(), S = {};
      for (let j in w) {
        let N = w[j];
        if (N === void 0)
          continue;
        let R = iN(j), L = u[j] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        j !== "hasErrorBoundary";
        R ? Xt(
          !R,
          "Route property " + j + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : L ? Xt(
          !L,
          `Route "${u.id}" has a static property "${j}" defined but its lazy function is also returning a value for this property. The lazy route property "${j}" will be ignored.`
        ) : S[j] = N;
      }
      Object.assign(u, S), Object.assign(u, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...i(u),
        lazy: void 0
      });
    })();
    return My.set(u, v), v.catch(() => {
    }), {
      lazyRoutePromise: v,
      lazyHandlerPromise: v
    };
  }
  let f = Object.keys(t.lazy), m = [], y;
  for (let b of f) {
    if (o && o.includes(b))
      continue;
    let v = s1({
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
async function Ay(t) {
  let a = t.matches.filter((o) => o.shouldLoad), s = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, u) => {
    s[a[u].route.id] = o;
  }), s;
}
async function FN(t) {
  return t.matches.some((a) => a.route.middleware) ? i1(t, () => Ay(t)) : Ay(t);
}
function i1(t, a) {
  return PN(
    t,
    a,
    (i) => {
      if (rC(i))
        throw i;
      return i;
    },
    eC,
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
      ), y = xr(
        f,
        f[m].route.id
      ).route.id;
      return Promise.resolve({
        [y]: { type: "error", result: i }
      });
    }
  }
}
async function PN(t, a, s, i, o) {
  let { matches: u, ...f } = t, m = u.flatMap(
    (p) => p.route.middleware ? p.route.middleware.map((b) => [p.route.id, b]) : []
  );
  return await l1(
    f,
    m,
    a,
    s,
    i,
    o
  );
}
async function l1(t, a, s, i, o, u, f = 0) {
  let { request: m } = t;
  if (m.signal.aborted)
    throw m.signal.reason ?? new Error(`Request aborted: ${m.method} ${m.url}`);
  let y = a[f];
  if (!y)
    return await s();
  let [p, b] = y, v, w = async () => {
    if (v)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return v = { value: await l1(
        t,
        a,
        s,
        i,
        o,
        u,
        f + 1
      ) }, v.value;
    } catch (S) {
      return v = { value: await u(S, p, v) }, v.value;
    }
  };
  try {
    let S = await b(t, w), j = S != null ? i(S) : void 0;
    return o(j) ? j : v ? j ?? v.value : (v = { value: await w() }, v.value);
  } catch (S) {
    return await u(S, p, v);
  }
}
function o1(t, a, s, i, o) {
  let u = s1({
    key: "middleware",
    route: i.route,
    manifest: a,
    mapRouteProperties: t
  }), f = HN(
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
function nh(t, a, s, i, o, u, f, m, y, p = null, b) {
  let v = !1, w = o1(
    t,
    a,
    s,
    u,
    f
  );
  return {
    ...u,
    _lazyPromises: w,
    shouldLoad: y,
    shouldRevalidateArgs: p,
    shouldCallHandler(S) {
      return v = !0, p ? typeof b == "boolean" ? fl(u, {
        ...p,
        defaultShouldRevalidate: b
      }) : typeof S == "boolean" ? fl(u, {
        ...p,
        defaultShouldRevalidate: S
      }) : fl(u, p) : y;
    },
    resolve(S) {
      let { lazy: j, loader: N, middleware: R } = u.route, T = v || y || S && !bn(s.method) && (j || N), L = R && R.length > 0 && !N && !j;
      return T && (bn(s.method) || !L) ? YN({
        request: s,
        path: i,
        unstable_pattern: o,
        match: u,
        lazyHandlerPromise: w?.handler,
        lazyRoutePromise: w?.route,
        handlerOverride: S,
        scopedContext: m
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function Ks(t, a, s, i, o, u, f, m, y = null) {
  return o.map((p) => p.route.id !== u.route.id ? {
    ...p,
    shouldLoad: !1,
    shouldRevalidateArgs: y,
    shouldCallHandler: () => !1,
    _lazyPromises: o1(
      t,
      a,
      s,
      p,
      f
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : nh(
    t,
    a,
    s,
    i,
    jl(o),
    p,
    f,
    m,
    !0,
    y
  ));
}
async function GN(t, a, s, i, o, u, f) {
  i.some((b) => b._lazyPromises?.middleware) && await Promise.all(i.map((b) => b._lazyPromises?.middleware));
  let m = {
    request: a,
    unstable_url: c1(a, s),
    unstable_pattern: jl(i),
    params: i[0].params,
    context: u,
    matches: i
  }, p = await t({
    ...m,
    fetcherKey: o,
    runClientMiddleware: (b) => {
      let v = m;
      return i1(v, () => b({
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
async function YN({
  request: t,
  path: a,
  unstable_pattern: s,
  match: i,
  lazyHandlerPromise: o,
  lazyRoutePromise: u,
  handlerOverride: f,
  scopedContext: m
}) {
  let y, p, b = bn(t.method), v = b ? "action" : "loader", w = (S) => {
    let j, N = new Promise((L, _) => j = _);
    p = () => j(), t.signal.addEventListener("abort", p);
    let R = (L) => typeof S != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${v}" [routeId: ${i.route.id}]`
      )
    ) : S(
      {
        request: t,
        unstable_url: c1(t, a),
        unstable_pattern: s,
        params: i.params,
        context: m
      },
      ...L !== void 0 ? [L] : []
    ), T = (async () => {
      try {
        return { type: "data", result: await (f ? f((_) => R(_)) : R()) };
      } catch (L) {
        return { type: "error", result: L };
      }
    })();
    return Promise.race([T, N]);
  };
  try {
    let S = b ? i.route.action : i.route.loader;
    if (o || u)
      if (S) {
        let j, [N] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          w(S).catch((R) => {
            j = R;
          }),
          // Ensure all lazy route promises are resolved before continuing
          o,
          u
        ]);
        if (j !== void 0)
          throw j;
        y = N;
      } else {
        await o;
        let j = b ? i.route.action : i.route.loader;
        if (j)
          [y] = await Promise.all([w(j), u]);
        else if (v === "action") {
          let N = new URL(t.url), R = N.pathname + N.search;
          throw Wn(405, {
            method: t.method,
            pathname: R,
            routeId: i.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (S)
      y = await w(S);
    else {
      let j = new URL(t.url), N = j.pathname + j.search;
      throw Wn(404, {
        pathname: N
      });
    }
  } catch (S) {
    return { type: "error", result: S };
  } finally {
    p && t.signal.removeEventListener("abort", p);
  }
  return y;
}
async function KN(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function XN(t) {
  let { result: a, type: s } = t;
  if (Bh(a)) {
    let i;
    try {
      i = await KN(a);
    } catch (o) {
      return { type: "error", error: o };
    }
    return s === "error" ? {
      type: "error",
      error: new Vc(a.status, a.statusText, i),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: i,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return s === "error" ? Uy(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: WN(a),
    statusCode: gl(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: gl(a) ? a.status : void 0
  } : Uy(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function QN(t, a, s, i, o) {
  let u = t.headers.get("Location");
  if (nt(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !Oh(u)) {
    let f = i.slice(
      0,
      i.findIndex((m) => m.route.id === s) + 1
    );
    u = th(
      new URL(a.url),
      f,
      o,
      u
    ), t.headers.set("Location", u);
  }
  return t;
}
var ky = [
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
function Dy(t, a, s, i) {
  if (Oh(t)) {
    let o = t, u = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (ky.includes(u.protocol))
      throw new Error("Invalid redirect location");
    let f = aa(u.pathname, s) != null;
    if (u.origin === a.origin && f)
      return $h(u.pathname) + u.search + u.hash;
  }
  try {
    let o = i.createURL(t);
    if (ky.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return t;
}
function qs(t, a, s, i) {
  let o = t.createURL(u1(a)).toString(), u = { signal: s };
  if (i && bn(i.formMethod)) {
    let { formMethod: f, formEncType: m } = i;
    u.method = f.toUpperCase(), m === "application/json" ? (u.headers = new Headers({ "Content-Type": m }), u.body = JSON.stringify(i.json)) : m === "text/plain" ? u.body = i.text : m === "application/x-www-form-urlencoded" && i.formData ? u.body = ah(i.formData) : u.body = i.formData;
  }
  return new Request(o, u);
}
function c1(t, a) {
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
function ah(t) {
  let a = new URLSearchParams();
  for (let [s, i] of t.entries())
    a.append(s, typeof i == "string" ? i : i.name);
  return a;
}
function zy(t) {
  let a = new FormData();
  for (let [s, i] of t.entries())
    a.append(s, i);
  return a;
}
function ZN(t, a, s, i = !1, o = !1) {
  let u = {}, f = null, m, y = !1, p = {}, b = s && Vn(s[1]) ? s[1].error : void 0;
  return t.forEach((v) => {
    if (!(v.route.id in a))
      return;
    let w = v.route.id, S = a[w];
    if (nt(
      !Kr(S),
      "Cannot handle redirect results in processLoaderData"
    ), Vn(S)) {
      let j = S.error;
      if (b !== void 0 && (j = b, b = void 0), f = f || {}, o)
        f[w] = j;
      else {
        let N = xr(t, w);
        f[N.route.id] == null && (f[N.route.id] = j);
      }
      i || (u[w] = n1), y || (y = !0, m = gl(S.error) ? S.error.status : 500), S.headers && (p[w] = S.headers);
    } else
      u[w] = S.data, S.statusCode && S.statusCode !== 200 && !y && (m = S.statusCode), S.headers && (p[w] = S.headers);
  }), b !== void 0 && s && (f = { [s[0]]: b }, s[2] && (u[s[2]] = void 0)), {
    loaderData: u,
    errors: f,
    statusCode: m || 200,
    loaderHeaders: p
  };
}
function Oy(t, a, s, i, o, u) {
  let { loaderData: f, errors: m } = ZN(
    a,
    s,
    i
  );
  return o.filter((y) => !y.matches || y.matches.some((p) => p.shouldLoad)).forEach((y) => {
    let { key: p, match: b, controller: v } = y;
    if (v && v.signal.aborted)
      return;
    let w = u[p];
    if (nt(w, "Did not find corresponding fetcher result"), Vn(w)) {
      let S = xr(t.matches, b?.route.id);
      m && m[S.route.id] || (m = {
        ...m,
        [S.route.id]: w.error
      }), t.fetchers.delete(p);
    } else if (Kr(w))
      nt(!1, "Unhandled fetcher revalidation redirect");
    else {
      let S = Ba(w.data);
      t.fetchers.set(p, S);
    }
  }), { loaderData: f, errors: m };
}
function Ly(t, a, s, i) {
  let o = Object.entries(a).filter(([, u]) => u !== n1).reduce((u, [f, m]) => (u[f] = m, u), {});
  for (let u of s) {
    let f = u.route.id;
    if (!a.hasOwnProperty(f) && t.hasOwnProperty(f) && u.route.loader && (o[f] = t[f]), i && i.hasOwnProperty(f))
      break;
  }
  return o;
}
function $y(t) {
  return t ? Vn(t[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [t[0]]: t[1].data
    }
  } : {};
}
function xr(t, a) {
  return (a ? t.slice(0, t.findIndex((i) => i.route.id === a) + 1) : [...t]).reverse().find((i) => i.route.hasErrorBoundary === !0) || t[0];
}
function Fo(t) {
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
  return t === 400 ? (f = "Bad Request", i && a && s ? m = `You made a ${i} request to "${a}" but did not provide a \`loader\` for route "${s}", so there is no way to handle the request.` : o === "invalid-body" && (m = "Unable to encode submission body")) : t === 403 ? (f = "Forbidden", m = `Route "${s}" does not match URL "${a}"`) : t === 404 ? (f = "Not Found", m = `No route matches URL "${a}"`) : t === 405 && (f = "Method Not Allowed", i && a && s ? m = `You made a ${i.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${s}", so there is no way to handle the request.` : i && (m = `Invalid request method "${i.toUpperCase()}"`)), new Vc(
    t || 500,
    f,
    new Error(m),
    !0
  );
}
function Po(t) {
  let a = Object.entries(t);
  for (let s = a.length - 1; s >= 0; s--) {
    let [i, o] = a[s];
    if (Kr(o))
      return { key: i, result: o };
  }
}
function u1(t) {
  let a = typeof t == "string" ? fa(t) : t;
  return xa({ ...a, hash: "" });
}
function JN(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function WN(t) {
  return new Vc(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function eC(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, s]) => typeof a == "string" && tC(s)
  );
}
function tC(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function nC(t) {
  return Bh(t.result) && e1.has(t.result.status);
}
function Vn(t) {
  return t.type === "error";
}
function Kr(t) {
  return (t && t.type) === "redirect";
}
function Uy(t) {
  return typeof t == "object" && t != null && "type" in t && "data" in t && "init" in t && t.type === "DataWithResponseInit";
}
function Bh(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.headers == "object" && typeof t.body < "u";
}
function aC(t) {
  return e1.has(t);
}
function rC(t) {
  return Bh(t) && aC(t.status) && t.headers.has("Location");
}
function sC(t) {
  return ON.has(t.toUpperCase());
}
function bn(t) {
  return DN.has(t.toUpperCase());
}
function Ih(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function pc(t, a) {
  let s = typeof a == "string" ? fa(a).search : a.search;
  if (t[t.length - 1].route.index && Ih(s || ""))
    return t[t.length - 1];
  let i = Xx(t);
  return i[i.length - 1];
}
function By(t) {
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
function gf(t, a) {
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
function iC(t, a) {
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
function Ji(t, a) {
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
function lC(t, a) {
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
function oC(t, a) {
  try {
    let s = t.sessionStorage.getItem(
      t1
    );
    if (s) {
      let i = JSON.parse(s);
      for (let [o, u] of Object.entries(i || {}))
        u && Array.isArray(u) && a.set(o, new Set(u || []));
    }
  } catch {
  }
}
function cC(t, a) {
  if (a.size > 0) {
    let s = {};
    for (let [i, o] of a)
      s[i] = [...o];
    try {
      t.sessionStorage.setItem(
        t1,
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
function Iy() {
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
var ts = g.createContext(null);
ts.displayName = "DataRouter";
var El = g.createContext(null);
El.displayName = "DataRouterState";
var d1 = g.createContext(!1);
function f1() {
  return g.useContext(d1);
}
var Vh = g.createContext({
  isTransitioning: !1
});
Vh.displayName = "ViewTransition";
var h1 = g.createContext(
  /* @__PURE__ */ new Map()
);
h1.displayName = "Fetchers";
var uC = g.createContext(null);
uC.displayName = "Await";
var ra = g.createContext(
  null
);
ra.displayName = "Navigation";
var qc = g.createContext(
  null
);
qc.displayName = "Location";
var qa = g.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
qa.displayName = "Route";
var qh = g.createContext(null);
qh.displayName = "RouteError";
var m1 = "REACT_ROUTER_ERROR", dC = "REDIRECT", fC = "ROUTE_ERROR_RESPONSE";
function hC(t) {
  if (t.startsWith(`${m1}:${dC}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function mC(t) {
  if (t.startsWith(
    `${m1}:${fC}:{`
  ))
    try {
      let a = JSON.parse(t.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new Vc(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function pC(t, { relative: a } = {}) {
  nt(
    Nl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: s, navigator: i } = g.useContext(ra), { hash: o, pathname: u, search: f } = Cl(t, { relative: a }), m = u;
  return s !== "/" && (m = u === "/" ? s : ea([s, u])), i.createHref({ pathname: m, search: f, hash: o });
}
function Nl() {
  return g.useContext(qc) != null;
}
function Ha() {
  return nt(
    Nl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), g.useContext(qc).location;
}
var p1 = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function g1(t) {
  g.useContext(ra).static || g.useLayoutEffect(t);
}
function ti() {
  let { isDataRoute: t } = g.useContext(qa);
  return t ? TC() : gC();
}
function gC() {
  nt(
    Nl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = g.useContext(ts), { basename: a, navigator: s } = g.useContext(ra), { matches: i } = g.useContext(qa), { pathname: o } = Ha(), u = JSON.stringify(Lh(i)), f = g.useRef(!1);
  return g1(() => {
    f.current = !0;
  }), g.useCallback(
    (y, p = {}) => {
      if (Xt(f.current, p1), !f.current) return;
      if (typeof y == "number") {
        s.go(y);
        return;
      }
      let b = Ic(
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
function Cl(t, { relative: a } = {}) {
  let { matches: s } = g.useContext(qa), { pathname: i } = Ha(), o = JSON.stringify(Lh(s));
  return g.useMemo(
    () => Ic(
      t,
      JSON.parse(o),
      i,
      a === "path"
    ),
    [t, o, i, a]
  );
}
function vC(t, a, s) {
  nt(
    Nl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: i } = g.useContext(ra), { matches: o } = g.useContext(qa), u = o[o.length - 1], f = u ? u.params : {}, m = u ? u.pathname : "/", y = u ? u.pathnameBase : "/", p = u && u.route;
  {
    let R = p && p.path || "";
    b1(
      m,
      !p || R.endsWith("*") || R.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${R}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${R}"> to <Route path="${R === "/" ? "*" : `${R}/*`}">.`
    );
  }
  let b = Ha(), v;
  v = b;
  let w = v.pathname || "/", S = w;
  if (y !== "/") {
    let R = y.replace(/^\//, "").split("/");
    S = "/" + w.replace(/^\//, "").split("/").slice(R.length).join("/");
  }
  let j = br(t, { pathname: S });
  return Xt(
    p || j != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `
  ), Xt(
    j == null || j[j.length - 1].route.element !== void 0 || j[j.length - 1].route.Component !== void 0 || j[j.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), wC(
    j && j.map(
      (R) => Object.assign({}, R, {
        params: Object.assign({}, f, R.params),
        pathname: ea([
          y,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          i.encodeLocation ? i.encodeLocation(
            R.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : R.pathname
        ]),
        pathnameBase: R.pathnameBase === "/" ? y : ea([
          y,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          i.encodeLocation ? i.encodeLocation(
            R.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : R.pathnameBase
        ])
      })
    ),
    o,
    s
  );
}
function yC() {
  let t = CC(), a = gl(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), s = t instanceof Error ? t.stack : null, i = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: i }, u = { padding: "2px 4px", backgroundColor: i }, f = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), f = /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ g.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ g.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ g.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ g.createElement("h3", { style: { fontStyle: "italic" } }, a), s ? /* @__PURE__ */ g.createElement("pre", { style: o }, s) : null, f);
}
var bC = /* @__PURE__ */ g.createElement(yC, null), v1 = class extends g.Component {
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
      const s = mC(t.digest);
      s && (t = s);
    }
    let a = t !== void 0 ? /* @__PURE__ */ g.createElement(qa.Provider, { value: this.props.routeContext }, /* @__PURE__ */ g.createElement(
      qh.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ g.createElement(xC, { error: t }, a) : a;
  }
};
v1.contextType = d1;
var vf = /* @__PURE__ */ new WeakMap();
function xC({
  children: t,
  error: a
}) {
  let { basename: s } = g.useContext(ra);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let i = hC(a.digest);
    if (i) {
      let o = vf.get(a);
      if (o) throw o;
      let u = Zx(i.location, s);
      if (Qx && !vf.get(a))
        if (u.isExternal || i.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const f = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(u.to, {
              replace: i.replace
            })
          );
          throw vf.set(a, f), f;
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
function SC({ routeContext: t, match: a, children: s }) {
  let i = g.useContext(ts);
  return i && i.static && i.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (i.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ g.createElement(qa.Provider, { value: t }, s);
}
function wC(t, a = [], s) {
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
        let { loaderData: w, errors: S } = i, j = v.route.loader && !w.hasOwnProperty(v.route.id) && (!S || S[v.route.id] === void 0);
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
      unstable_pattern: jl(i.matches),
      errorInfo: v
    });
  } : void 0;
  return o.reduceRight(
    (b, v, w) => {
      let S, j = !1, N = null, R = null;
      i && (S = u && v.route.id ? u[v.route.id] : void 0, N = v.route.errorElement || bC, f && (m < 0 && w === 0 ? (b1(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), j = !0, R = null) : m === w && (j = !0, R = v.route.hydrateFallbackElement || null)));
      let T = a.concat(o.slice(0, w + 1)), L = () => {
        let _;
        return S ? _ = N : j ? _ = R : v.route.Component ? _ = /* @__PURE__ */ g.createElement(v.route.Component, null) : v.route.element ? _ = v.route.element : _ = b, /* @__PURE__ */ g.createElement(
          SC,
          {
            match: v,
            routeContext: {
              outlet: b,
              matches: T,
              isDataRoute: i != null
            },
            children: _
          }
        );
      };
      return i && (v.route.ErrorBoundary || v.route.errorElement || w === 0) ? /* @__PURE__ */ g.createElement(
        v1,
        {
          location: i.location,
          revalidation: i.revalidation,
          component: N,
          error: S,
          children: L(),
          routeContext: { outlet: null, matches: T, isDataRoute: !0 },
          onError: p
        }
      ) : L();
    },
    null
  );
}
function Hh(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function jC(t) {
  let a = g.useContext(ts);
  return nt(a, Hh(t)), a;
}
function y1(t) {
  let a = g.useContext(El);
  return nt(a, Hh(t)), a;
}
function EC(t) {
  let a = g.useContext(qa);
  return nt(a, Hh(t)), a;
}
function Hc(t) {
  let a = EC(t), s = a.matches[a.matches.length - 1];
  return nt(
    s.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), s.route.id;
}
function NC() {
  return Hc(
    "useRouteId"
    /* UseRouteId */
  );
}
function Tl() {
  let t = y1(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Hc(
    "useLoaderData"
    /* UseLoaderData */
  );
  return t.loaderData[a];
}
function CC() {
  let t = g.useContext(qh), a = y1(
    "useRouteError"
    /* UseRouteError */
  ), s = Hc(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[s];
}
function TC() {
  let { router: t } = jC(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Hc(
    "useNavigate"
    /* UseNavigateStable */
  ), s = g.useRef(!1);
  return g1(() => {
    s.current = !0;
  }), g.useCallback(
    async (o, u = {}) => {
      Xt(s.current, p1), s.current && (typeof o == "number" ? await t.navigate(o) : await t.navigate(o, { fromRouteId: a, ...u }));
    },
    [t, a]
  );
}
var Vy = {};
function b1(t, a, s) {
  !a && !Vy[t] && (Vy[t] = !0, Xt(!1, s));
}
var qy = {};
function Hy(t, a) {
  !t && !qy[a] && (qy[a] = !0, console.warn(a));
}
var RC = "useOptimistic", Fy = PE[RC], _C = () => {
};
function MC(t) {
  return Fy ? Fy(t) : [t, _C];
}
function AC(t) {
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
var kC = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function DC(t, a) {
  return BN({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: eN({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: t,
    hydrationRouteProperties: kC,
    mapRouteProperties: AC,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var zC = class {
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
function OC({
  router: t,
  flushSync: a,
  onError: s,
  unstable_useTransitions: i
}) {
  i = f1() || i;
  let [u, f] = g.useState(t.state), [m, y] = MC(u), [p, b] = g.useState(), [v, w] = g.useState({
    isTransitioning: !1
  }), [S, j] = g.useState(), [N, R] = g.useState(), [T, L] = g.useState(), _ = g.useRef(/* @__PURE__ */ new Map()), C = g.useCallback(
    (V, { deletedFetchers: D, newErrors: P, flushSync: J, viewTransitionOpts: Z }) => {
      P && s && Object.values(P).forEach(
        (re) => s(re, {
          location: V.location,
          params: V.matches[0]?.params ?? {},
          unstable_pattern: jl(V.matches)
        })
      ), V.fetchers.forEach((re, A) => {
        re.data !== void 0 && _.current.set(A, re.data);
      }), D.forEach((re) => _.current.delete(re)), Hy(
        J === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let G = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (Hy(
        Z == null || G,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !Z || !G) {
        a && J ? a(() => f(V)) : i === !1 ? f(V) : g.startTransition(() => {
          i === !0 && y((re) => Py(re, V)), f(V);
        });
        return;
      }
      if (a && J) {
        a(() => {
          N && (S?.resolve(), N.skipTransition()), w({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: Z.currentLocation,
            nextLocation: Z.nextLocation
          });
        });
        let re = t.window.document.startViewTransition(() => {
          a(() => f(V));
        });
        re.finished.finally(() => {
          a(() => {
            j(void 0), R(void 0), b(void 0), w({ isTransitioning: !1 });
          });
        }), a(() => R(re));
        return;
      }
      N ? (S?.resolve(), N.skipTransition(), L({
        state: V,
        currentLocation: Z.currentLocation,
        nextLocation: Z.nextLocation
      })) : (b(V), w({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: Z.currentLocation,
        nextLocation: Z.nextLocation
      }));
    },
    [
      t.window,
      a,
      N,
      S,
      i,
      y,
      s
    ]
  );
  g.useLayoutEffect(() => t.subscribe(C), [t, C]);
  let I = m.initialized;
  g.useLayoutEffect(() => {
    !I && t.state.initialized && C(t.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [I, C, t.state]), g.useEffect(() => {
    v.isTransitioning && !v.flushSync && j(new zC());
  }, [v]), g.useEffect(() => {
    if (S && p && t.window) {
      let V = p, D = S.promise, P = t.window.document.startViewTransition(async () => {
        i === !1 ? f(V) : g.startTransition(() => {
          i === !0 && y((J) => Py(J, V)), f(V);
        }), await D;
      });
      P.finished.finally(() => {
        j(void 0), R(void 0), b(void 0), w({ isTransitioning: !1 });
      }), R(P);
    }
  }, [
    p,
    S,
    t.window,
    i,
    y
  ]), g.useEffect(() => {
    S && p && m.location.key === p.location.key && S.resolve();
  }, [S, N, m.location, p]), g.useEffect(() => {
    !v.isTransitioning && T && (b(T.state), w({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: T.currentLocation,
      nextLocation: T.nextLocation
    }), L(void 0));
  }, [v.isTransitioning, T]);
  let Y = g.useMemo(() => ({
    createHref: t.createHref,
    encodeLocation: t.encodeLocation,
    go: (V) => t.navigate(V),
    push: (V, D, P) => t.navigate(V, {
      state: D,
      preventScrollReset: P?.preventScrollReset
    }),
    replace: (V, D, P) => t.navigate(V, {
      replace: !0,
      state: D,
      preventScrollReset: P?.preventScrollReset
    })
  }), [t]), ie = t.basename || "/", M = g.useMemo(
    () => ({
      router: t,
      navigator: Y,
      static: !1,
      basename: ie,
      onError: s
    }),
    [t, Y, ie, s]
  );
  return /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement(ts.Provider, { value: M }, /* @__PURE__ */ g.createElement(El.Provider, { value: m }, /* @__PURE__ */ g.createElement(h1.Provider, { value: _.current }, /* @__PURE__ */ g.createElement(Vh.Provider, { value: v }, /* @__PURE__ */ g.createElement(
    UC,
    {
      basename: ie,
      location: m.location,
      navigationType: m.historyAction,
      navigator: Y,
      unstable_useTransitions: i
    },
    /* @__PURE__ */ g.createElement(
      LC,
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
function Py(t, a) {
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
var LC = g.memo($C);
function $C({
  routes: t,
  future: a,
  state: s,
  isStatic: i,
  onError: o
}) {
  return vC(t, void 0, { state: s, isStatic: i, onError: o });
}
function UC({
  basename: t = "/",
  children: a = null,
  location: s,
  navigationType: i = "POP",
  navigator: o,
  static: u = !1,
  unstable_useTransitions: f
}) {
  nt(
    !Nl(),
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
    state: w = null,
    key: S = "default",
    unstable_mask: j
  } = s, N = g.useMemo(() => {
    let R = aa(p, m);
    return R == null ? null : {
      location: {
        pathname: R,
        search: b,
        hash: v,
        state: w,
        key: S,
        unstable_mask: j
      },
      navigationType: i
    };
  }, [
    m,
    p,
    b,
    v,
    w,
    S,
    i,
    j
  ]);
  return Xt(
    N != null,
    `<Router basename="${m}"> is not able to match the URL "${p}${b}${v}" because it does not start with the basename, so the <Router> won't render anything.`
  ), N == null ? null : /* @__PURE__ */ g.createElement(ra.Provider, { value: y }, /* @__PURE__ */ g.createElement(qc.Provider, { children: a, value: N }));
}
var gc = "get", vc = "application/x-www-form-urlencoded";
function Fc(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function BC(t) {
  return Fc(t) && t.tagName.toLowerCase() === "button";
}
function IC(t) {
  return Fc(t) && t.tagName.toLowerCase() === "form";
}
function VC(t) {
  return Fc(t) && t.tagName.toLowerCase() === "input";
}
function qC(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function HC(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !qC(t);
}
var Go = null;
function FC() {
  if (Go === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Go = !1;
    } catch {
      Go = !0;
    }
  return Go;
}
var PC = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function yf(t) {
  return t != null && !PC.has(t) ? (Xt(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${vc}"`
  ), null) : t;
}
function GC(t, a) {
  let s, i, o, u, f;
  if (IC(t)) {
    let m = t.getAttribute("action");
    i = m ? aa(m, a) : null, s = t.getAttribute("method") || gc, o = yf(t.getAttribute("enctype")) || vc, u = new FormData(t);
  } else if (BC(t) || VC(t) && (t.type === "submit" || t.type === "image")) {
    let m = t.form;
    if (m == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let y = t.getAttribute("formaction") || m.getAttribute("action");
    if (i = y ? aa(y, a) : null, s = t.getAttribute("formmethod") || m.getAttribute("method") || gc, o = yf(t.getAttribute("formenctype")) || yf(m.getAttribute("enctype")) || vc, u = new FormData(m, t), !FC()) {
      let { name: p, type: b, value: v } = t;
      if (b === "image") {
        let w = p ? `${p}.` : "";
        u.append(`${w}x`, "0"), u.append(`${w}y`, "0");
      } else p && u.append(p, v);
    }
  } else {
    if (Fc(t))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    s = gc, i = null, o = vc, f = t;
  }
  return u && o === "text/plain" && (f = u, u = void 0), { action: i, method: s.toLowerCase(), encType: o, formData: u, body: f };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Fh(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function x1(t, a, s, i) {
  let o = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return s ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${i}` : o.pathname = `${o.pathname}.${i}` : o.pathname === "/" ? o.pathname = `_root.${i}` : a && aa(o.pathname, a) === "/" ? o.pathname = `${Nc(a)}/_root.${i}` : o.pathname = `${Nc(o.pathname)}.${i}`, o;
}
async function YC(t, a) {
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
function KC(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function XC(t, a, s) {
  let i = await Promise.all(
    t.map(async (o) => {
      let u = a.routes[o.route.id];
      if (u) {
        let f = await YC(u, s);
        return f.links ? f.links() : [];
      }
      return [];
    })
  );
  return WC(
    i.flat(1).filter(KC).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function Gy(t, a, s, i, o, u) {
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
function QC(t, a, { includeHydrateFallback: s } = {}) {
  return ZC(
    t.map((i) => {
      let o = a.routes[i.route.id];
      if (!o) return [];
      let u = [o.module];
      return o.clientActionModule && (u = u.concat(o.clientActionModule)), o.clientLoaderModule && (u = u.concat(o.clientLoaderModule)), s && o.hydrateFallbackModule && (u = u.concat(o.hydrateFallbackModule)), o.imports && (u = u.concat(o.imports)), u;
    }).flat(1)
  );
}
function ZC(t) {
  return [...new Set(t)];
}
function JC(t) {
  let a = {}, s = Object.keys(t).sort();
  for (let i of s)
    a[i] = t[i];
  return a;
}
function WC(t, a) {
  let s = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((i, o) => {
    let u = JSON.stringify(JC(o));
    return s.has(u) || (s.add(u), i.push({ key: u, link: o })), i;
  }, []);
}
function Ph() {
  let t = g.useContext(ts);
  return Fh(
    t,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), t;
}
function eT() {
  let t = g.useContext(El);
  return Fh(
    t,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), t;
}
var Gh = g.createContext(void 0);
Gh.displayName = "FrameworkContext";
function Yh() {
  let t = g.useContext(Gh);
  return Fh(
    t,
    "You must render this element inside a <HydratedRouter> element"
  ), t;
}
function tT(t, a) {
  let s = g.useContext(Gh), [i, o] = g.useState(!1), [u, f] = g.useState(!1), { onFocus: m, onBlur: y, onMouseEnter: p, onMouseLeave: b, onTouchStart: v } = a, w = g.useRef(null);
  g.useEffect(() => {
    if (t === "render" && f(!0), t === "viewport") {
      let N = (T) => {
        T.forEach((L) => {
          f(L.isIntersecting);
        });
      }, R = new IntersectionObserver(N, { threshold: 0.5 });
      return w.current && R.observe(w.current), () => {
        R.disconnect();
      };
    }
  }, [t]), g.useEffect(() => {
    if (i) {
      let N = setTimeout(() => {
        f(!0);
      }, 100);
      return () => {
        clearTimeout(N);
      };
    }
  }, [i]);
  let S = () => {
    o(!0);
  }, j = () => {
    o(!1), f(!1);
  };
  return s ? t !== "intent" ? [u, w, {}] : [
    u,
    w,
    {
      onFocus: Wi(m, S),
      onBlur: Wi(y, j),
      onMouseEnter: Wi(p, S),
      onMouseLeave: Wi(b, j),
      onTouchStart: Wi(v, S)
    }
  ] : [!1, w, {}];
}
function Wi(t, a) {
  return (s) => {
    t && t(s), s.defaultPrevented || a(s);
  };
}
function nT({ page: t, ...a }) {
  let s = f1(), { router: i } = Ph(), o = g.useMemo(
    () => br(i.routes, t, i.basename),
    [i.routes, t, i.basename]
  );
  return o ? s ? /* @__PURE__ */ g.createElement(rT, { page: t, matches: o, ...a }) : /* @__PURE__ */ g.createElement(sT, { page: t, matches: o, ...a }) : null;
}
function aT(t) {
  let { manifest: a, routeModules: s } = Yh(), [i, o] = g.useState([]);
  return g.useEffect(() => {
    let u = !1;
    return XC(t, a, s).then(
      (f) => {
        u || o(f);
      }
    ), () => {
      u = !0;
    };
  }, [t, a, s]), i;
}
function rT({
  page: t,
  matches: a,
  ...s
}) {
  let i = Ha(), { future: o } = Yh(), { basename: u } = Ph(), f = g.useMemo(() => {
    if (t === i.pathname + i.search + i.hash)
      return [];
    let m = x1(
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
function sT({
  page: t,
  matches: a,
  ...s
}) {
  let i = Ha(), { future: o, manifest: u, routeModules: f } = Yh(), { basename: m } = Ph(), { loaderData: y, matches: p } = eT(), b = g.useMemo(
    () => Gy(
      t,
      a,
      p,
      u,
      i,
      "data"
    ),
    [t, a, p, u, i]
  ), v = g.useMemo(
    () => Gy(
      t,
      a,
      p,
      u,
      i,
      "assets"
    ),
    [t, a, p, u, i]
  ), w = g.useMemo(() => {
    if (t === i.pathname + i.search + i.hash)
      return [];
    let N = /* @__PURE__ */ new Set(), R = !1;
    if (a.forEach((L) => {
      let _ = u.routes[L.route.id];
      !_ || !_.hasLoader || (!b.some((C) => C.route.id === L.route.id) && L.route.id in y && f[L.route.id]?.shouldRevalidate || _.hasClientLoader ? R = !0 : N.add(L.route.id));
    }), N.size === 0)
      return [];
    let T = x1(
      t,
      m,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return R && N.size > 0 && T.searchParams.set(
      "_routes",
      a.filter((L) => N.has(L.route.id)).map((L) => L.route.id).join(",")
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
  ]), S = g.useMemo(
    () => QC(v, u),
    [v, u]
  ), j = aT(v);
  return /* @__PURE__ */ g.createElement(g.Fragment, null, w.map((N) => /* @__PURE__ */ g.createElement("link", { key: N, rel: "prefetch", as: "fetch", href: N, ...s })), S.map((N) => /* @__PURE__ */ g.createElement("link", { key: N, rel: "modulepreload", href: N, ...s })), j.map(({ key: N, link: R }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ g.createElement(
      "link",
      {
        key: N,
        nonce: s.nonce,
        ...R,
        crossOrigin: R.crossOrigin ?? s.crossOrigin
      }
    )
  )));
}
function iT(...t) {
  return (a) => {
    t.forEach((s) => {
      typeof s == "function" ? s(a) : s != null && (s.current = a);
    });
  };
}
var lT = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  lT && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var S1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Kh = g.forwardRef(
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
    viewTransition: w,
    unstable_defaultShouldRevalidate: S,
    ...j
  }, N) {
    let { basename: R, navigator: T, unstable_useTransitions: L } = g.useContext(ra), _ = typeof b == "string" && S1.test(b), C = Zx(b, R);
    b = C.to;
    let I = pC(b, { relative: o }), Y = Ha(), ie = null;
    if (m) {
      let re = Ic(
        m,
        [],
        Y.unstable_mask ? Y.unstable_mask.pathname : "/",
        !0
      );
      R !== "/" && (re.pathname = re.pathname === "/" ? R : ea([R, re.pathname])), ie = T.createHref(re);
    }
    let [M, V, D] = tT(
      i,
      j
    ), P = dT(b, {
      replace: f,
      unstable_mask: m,
      state: y,
      target: p,
      preventScrollReset: v,
      relative: o,
      viewTransition: w,
      unstable_defaultShouldRevalidate: S,
      unstable_useTransitions: L
    });
    function J(re) {
      a && a(re), re.defaultPrevented || P(re);
    }
    let Z = !(C.isExternal || u), G = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ g.createElement(
        "a",
        {
          ...j,
          ...D,
          href: (Z ? ie : void 0) || C.absoluteURL || I,
          onClick: Z ? J : a,
          ref: iT(N, V),
          target: p,
          "data-discover": !_ && s === "render" ? "true" : void 0
        }
      )
    );
    return M && !_ ? /* @__PURE__ */ g.createElement(g.Fragment, null, G, /* @__PURE__ */ g.createElement(nT, { page: I })) : G;
  }
);
Kh.displayName = "Link";
var oT = g.forwardRef(
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
    let v = Cl(f, { relative: p.relative }), w = Ha(), S = g.useContext(El), { navigator: j, basename: N } = g.useContext(ra), R = S != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    gT(v) && m === !0, T = j.encodeLocation ? j.encodeLocation(v).pathname : v.pathname, L = w.pathname, _ = S && S.navigation && S.navigation.location ? S.navigation.location.pathname : null;
    s || (L = L.toLowerCase(), _ = _ ? _.toLowerCase() : null, T = T.toLowerCase()), _ && N && (_ = aa(_, N) || _);
    const C = T !== "/" && T.endsWith("/") ? T.length - 1 : T.length;
    let I = L === T || !o && L.startsWith(T) && L.charAt(C) === "/", Y = _ != null && (_ === T || !o && _.startsWith(T) && _.charAt(T.length) === "/"), ie = {
      isActive: I,
      isPending: Y,
      isTransitioning: R
    }, M = I ? a : void 0, V;
    typeof i == "function" ? V = i(ie) : V = [
      i,
      I ? "active" : null,
      Y ? "pending" : null,
      R ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let D = typeof u == "function" ? u(ie) : u;
    return /* @__PURE__ */ g.createElement(
      Kh,
      {
        ...p,
        "aria-current": M,
        className: V,
        ref: b,
        style: D,
        to: f,
        viewTransition: m
      },
      typeof y == "function" ? y(ie) : y
    );
  }
);
oT.displayName = "NavLink";
var cT = g.forwardRef(
  ({
    discover: t = "render",
    fetcherKey: a,
    navigate: s,
    reloadDocument: i,
    replace: o,
    state: u,
    method: f = gc,
    action: m,
    onSubmit: y,
    relative: p,
    preventScrollReset: b,
    viewTransition: v,
    unstable_defaultShouldRevalidate: w,
    ...S
  }, j) => {
    let { unstable_useTransitions: N } = g.useContext(ra), R = mT(), T = pT(m, { relative: p }), L = f.toLowerCase() === "get" ? "get" : "post", _ = typeof m == "string" && S1.test(m), C = (I) => {
      if (y && y(I), I.defaultPrevented) return;
      I.preventDefault();
      let Y = I.nativeEvent.submitter, ie = Y?.getAttribute("formmethod") || f, M = () => R(Y || I.currentTarget, {
        fetcherKey: a,
        method: ie,
        navigate: s,
        replace: o,
        state: u,
        relative: p,
        preventScrollReset: b,
        viewTransition: v,
        unstable_defaultShouldRevalidate: w
      });
      N && s !== !1 ? g.startTransition(() => M()) : M();
    };
    return /* @__PURE__ */ g.createElement(
      "form",
      {
        ref: j,
        method: L,
        action: T,
        onSubmit: i ? y : C,
        ...S,
        "data-discover": !_ && t === "render" ? "true" : void 0
      }
    );
  }
);
cT.displayName = "Form";
function uT(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function w1(t) {
  let a = g.useContext(ts);
  return nt(a, uT(t)), a;
}
function dT(t, {
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
  let b = ti(), v = Ha(), w = Cl(t, { relative: f });
  return g.useCallback(
    (S) => {
      if (HC(S, a)) {
        S.preventDefault();
        let j = s !== void 0 ? s : xa(v) === xa(w), N = () => b(t, {
          replace: j,
          unstable_mask: i,
          state: o,
          preventScrollReset: u,
          relative: f,
          viewTransition: m,
          unstable_defaultShouldRevalidate: y
        });
        p ? g.startTransition(() => N()) : N();
      }
    },
    [
      v,
      b,
      w,
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
var fT = 0, hT = () => `__${String(++fT)}__`;
function mT() {
  let { router: t } = w1(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = g.useContext(ra), s = NC(), i = t.fetch, o = t.navigate;
  return g.useCallback(
    async (u, f = {}) => {
      let { action: m, method: y, encType: p, formData: b, body: v } = GC(
        u,
        a
      );
      if (f.navigate === !1) {
        let w = f.fetcherKey || hT();
        await i(w, s, f.action || m, {
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
function pT(t, { relative: a } = {}) {
  let { basename: s } = g.useContext(ra), i = g.useContext(qa);
  nt(i, "useFormAction must be used inside a RouteContext");
  let [o] = i.matches.slice(-1), u = { ...Cl(t || ".", { relative: a }) }, f = Ha();
  if (t == null) {
    u.search = f.search;
    let m = new URLSearchParams(u.search), y = m.getAll("index");
    if (y.some((b) => b === "")) {
      m.delete("index"), y.filter((v) => v).forEach((v) => m.append("index", v));
      let b = m.toString();
      u.search = b ? `?${b}` : "";
    }
  }
  return (!t || t === ".") && o.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), s !== "/" && (u.pathname = u.pathname === "/" ? s : ea([s, u.pathname])), xa(u);
}
function gT(t, { relative: a } = {}) {
  let s = g.useContext(Vh);
  nt(
    s != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: i } = w1(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = Cl(t, { relative: a });
  if (!s.isTransitioning)
    return !1;
  let u = aa(s.currentLocation.pathname, i) || s.currentLocation.pathname, f = aa(s.nextLocation.pathname, i) || s.nextLocation.pathname;
  return Ec(o.pathname, f) != null || Ec(o.pathname, u) != null;
}
class ni extends Error {
  constructor(a, s, i, o) {
    super(i), this.status = a, this.category = s, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const Sa = "/api/v1/extensions/nexus.audio.emotiontts";
async function Rt(t, a) {
  const s = t.startsWith("http") ? t : `${Sa}${t}`, i = await fetch(s, {
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
    throw new ni(
      i.status,
      o?.category ?? "unknown",
      o?.message ?? i.statusText,
      o?.requestId
    );
  }
  if (i.status !== 204)
    return await i.json();
}
const vT = [
  "segment_started",
  "segment_completed",
  "segment_failed",
  "run_terminal"
];
function yT(t, a, s, i = vT) {
  const o = t.startsWith("http") ? t : `${Sa}${t}`, u = new EventSource(o), f = (m) => {
    if (m.data)
      try {
        a(JSON.parse(m.data));
      } catch {
      }
  };
  u.onmessage = f;
  for (const m of i)
    u.addEventListener(m, f);
  return u.onerror = (m) => {
    s?.(m);
  }, () => u.close();
}
async function bT() {
  return Rt("/deployments");
}
async function Yy(t) {
  return Rt(`/deployments/${t}`);
}
async function xT(t, a) {
  return Rt(`/deployments/${t}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function Ky(t) {
  return Rt(`/mappings?deploymentId=${encodeURIComponent(t)}`);
}
async function Xh(t, a) {
  return Rt("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: t })
  });
}
async function Gs(t, a, s) {
  return Rt(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify(s)
    }
  );
}
async function j1(t, a) {
  await Rt(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function ST(t) {
  return Rt(`/mappings/export?deploymentId=${encodeURIComponent(t)}`);
}
async function wT(t, a, s = "error") {
  return Rt("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: t, mappings: a, conflictStrategy: s })
  });
}
async function jT(t, a = {}) {
  const s = new URLSearchParams();
  a.limit && s.set("limit", String(a.limit)), a.status && s.set("status", a.status);
  const i = s.toString(), o = i ? `?${i}` : "";
  return Rt(`/deployments/${t}/runs${o}`);
}
async function E1(t, a) {
  return Rt(`/deployments/${t}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function ET(t, a) {
  return Promise.all(a.map((s) => E1(t, s)));
}
function NT(t, a) {
  if (t.length === 0) return [];
  const s = Math.min(Math.max(Math.floor(a), 1), t.length), i = Math.floor(t.length / s), o = t.length % s, u = [];
  let f = 0;
  for (let m = 0; m < s; m += 1) {
    const y = i + (m < o ? 1 : 0);
    u.push(t.slice(f, f + y)), f += y;
  }
  return u;
}
async function Qh(t, a) {
  return Rt(`/deployments/${t}/runs/${a}`);
}
async function Xy(t, a) {
  return Rt(`/deployments/${t}/runs/${a}/cancel`, { method: "POST" });
}
async function N1(t, a) {
  return Rt(`/deployments/${t}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function CT(t, a) {
  return Rt(`/deployments/${t}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function bf(t, a, s, i) {
  return yT(
    `/deployments/${t}/runs/${a}/progress`,
    s,
    i
  );
}
async function Qs(t) {
  return Rt(`/voice-assets?deploymentId=${encodeURIComponent(t)}`);
}
async function Cc(t, a, s, i, o) {
  const u = new FormData();
  u.append("deploymentId", t), u.append("displayName", s), u.append("kind", i), u.append("audio", a);
  const f = await fetch(`${Sa}/voice-assets`, {
    method: "POST",
    body: u
  });
  if (!f.ok)
    throw new Error(`upload failed: ${f.status}`);
  return await f.json();
}
async function TT(t, a) {
  await Rt(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function RT(t, a, s) {
  return Rt(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ displayName: s })
    }
  );
}
function _T(t) {
  if (!t.audioArtifactRef) return null;
  const a = new URLSearchParams({ deploymentId: t.deploymentId });
  return `${Sa}/voice-assets/${encodeURIComponent(t.voiceAssetId)}/audio?${a.toString()}`;
}
async function MT(t) {
  return Rt(`/workflow?deploymentId=${encodeURIComponent(t)}`);
}
var AT = "mux0i60", kT = "mux0i61", DT = "mux0i62", zT = "mux0i63";
function Pc({ count: t = "0", title: a, hint: s }) {
  return /* @__PURE__ */ c.jsxs("div", { className: AT, children: [
    /* @__PURE__ */ c.jsx("span", { className: kT, "aria-hidden": "true", children: t }),
    /* @__PURE__ */ c.jsx("h3", { className: DT, children: a }),
    s ? /* @__PURE__ */ c.jsx("p", { className: zT, children: s }) : null
  ] });
}
var OT = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, LT = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, $T = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, UT = "zwn3019";
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
  const y = [OT[t], $T[a], LT[s], u].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(i, { className: y, style: f, "data-elevation": s, ...m, children: o });
}
function BT({ children: t, className: a }) {
  const s = [UT, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: s, children: t });
}
var Zr = "vrkn5p0", IT = "_93p6291", VT = "_93p6292", qT = "_93p6293", HT = "_93p6294", FT = "_93p6295", PT = "_93p6296", GT = "_93p6297", YT = "_93p6298", KT = "_93p6299", XT = "_93p629a", QT = "_93p629b", ZT = "_93p629c", JT = "_93p629d", WT = "_93p629e";
const eR = "nexus-host-navigate";
function tR(t) {
  return `#/deployments/${encodeURIComponent(t)}`;
}
function nR(t, a) {
  if (t.defaultPrevented || t.button !== 0 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey)
    return;
  t.preventDefault();
  const s = {
    kind: "deployment-detail",
    deploymentId: a
  };
  window.dispatchEvent(
    new CustomEvent(eR, {
      detail: s
    })
  );
}
function aR() {
  const { deployments: t } = Tl(), a = t.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ c.jsxs("main", { className: IT, children: [
    /* @__PURE__ */ c.jsxs("header", { className: VT, children: [
      /* @__PURE__ */ c.jsx("p", { className: qT, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ c.jsxs("h1", { className: HT, children: [
        "Direct your characters.",
        /* @__PURE__ */ c.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: FT, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ c.jsxs("p", { className: PT, children: [
        /* @__PURE__ */ c.jsx("span", { className: GT, children: t.length }),
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
        className: YT,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ c.jsx("h2", { id: "deployments-section-list", className: Zr, children: "01 / Deployments" }),
          t.length === 0 ? /* @__PURE__ */ c.jsx(
            Pc,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ c.jsx("ul", { className: KT, children: t.map((s) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
            "a",
            {
              href: tR(s.deploymentId),
              onClick: (i) => nR(i, s.deploymentId),
              className: XT,
              children: [
                /* @__PURE__ */ c.jsx("span", { className: QT, "aria-hidden": "true", children: rR(s.displayName) }),
                /* @__PURE__ */ c.jsxs("span", { children: [
                  /* @__PURE__ */ c.jsx("span", { className: ZT, children: s.displayName }),
                  /* @__PURE__ */ c.jsx("span", { className: JT, children: s.deploymentId })
                ] }),
                /* @__PURE__ */ c.jsx("span", { className: WT, "aria-hidden": "true", children: "→" })
              ]
            }
          ) }, s.deploymentId)) })
        ]
      }
    )
  ] });
}
function rR(t) {
  const a = t.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
var Zh = Fx();
const sR = /* @__PURE__ */ Hx(Zh);
function iR(t) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], s = document.createElement("style");
  s.type = "text/css", a.appendChild(s), s.styleSheet ? s.styleSheet.cssText = t : s.appendChild(document.createTextNode(t));
}
const lR = (t) => {
  switch (t) {
    case "success":
      return uR;
    case "info":
      return fR;
    case "warning":
      return dR;
    case "error":
      return hR;
    default:
      return null;
  }
}, oR = Array(12).fill(0), cR = ({ visible: t, className: a }) => /* @__PURE__ */ Se.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": t
}, /* @__PURE__ */ Se.createElement("div", {
  className: "sonner-spinner"
}, oR.map((s, i) => /* @__PURE__ */ Se.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${i}`
})))), uR = /* @__PURE__ */ Se.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ Se.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), dR = /* @__PURE__ */ Se.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ Se.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), fR = /* @__PURE__ */ Se.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ Se.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), hR = /* @__PURE__ */ Se.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ Se.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), mR = /* @__PURE__ */ Se.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ Se.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ Se.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})), pR = () => {
  const [t, a] = Se.useState(document.hidden);
  return Se.useEffect(() => {
    const s = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", s), () => window.removeEventListener("visibilitychange", s);
  }, []), t;
};
let rh = 1;
class gR {
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
      const { message: i, ...o } = a, u = typeof a?.id == "number" || ((s = a.id) == null ? void 0 : s.length) > 0 ? a.id : rh++, f = this.toasts.find((y) => y.id === u), m = a.dismissible === void 0 ? !0 : a.dismissible;
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
        ], Se.isValidElement(p))
          u = !1, this.create({
            id: i,
            type: "default",
            message: p
          });
        else if (yR(p) && !p.ok) {
          u = !1;
          const v = typeof s.error == "function" ? await s.error(`HTTP error! status: ${p.status}`) : s.error, w = typeof s.description == "function" ? await s.description(`HTTP error! status: ${p.status}`) : s.description, j = typeof v == "object" && !Se.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: i,
            type: "error",
            description: w,
            ...j
          });
        } else if (p instanceof Error) {
          u = !1;
          const v = typeof s.error == "function" ? await s.error(p) : s.error, w = typeof s.description == "function" ? await s.description(p) : s.description, j = typeof v == "object" && !Se.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: i,
            type: "error",
            description: w,
            ...j
          });
        } else if (s.success !== void 0) {
          u = !1;
          const v = typeof s.success == "function" ? await s.success(p) : s.success, w = typeof s.description == "function" ? await s.description(p) : s.description, j = typeof v == "object" && !Se.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: i,
            type: "success",
            description: w,
            ...j
          });
        }
      }).catch(async (p) => {
        if (f = [
          "reject",
          p
        ], s.error !== void 0) {
          u = !1;
          const b = typeof s.error == "function" ? await s.error(p) : s.error, v = typeof s.description == "function" ? await s.description(p) : s.description, S = typeof b == "object" && !Se.isValidElement(b) ? b : {
            message: b
          };
          this.create({
            id: i,
            type: "error",
            description: v,
            ...S
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
      const i = s?.id || rh++;
      return this.create({
        jsx: a(i),
        id: i,
        ...s
      }), i;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const An = new gR(), vR = (t, a) => {
  const s = a?.id || rh++;
  return An.addToast({
    title: t,
    ...a,
    id: s
  }), s;
}, yR = (t) => t && typeof t == "object" && "ok" in t && typeof t.ok == "boolean" && "status" in t && typeof t.status == "number", bR = vR, xR = () => An.toasts, SR = () => An.getActiveToasts(), pn = Object.assign(bR, {
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
  getHistory: xR,
  getToasts: SR
});
iR("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Yo(t) {
  return t.label !== void 0;
}
const wR = 3, jR = "24px", ER = "16px", Qy = 4e3, NR = 356, CR = 14, TR = 45, RR = 200;
function ba(...t) {
  return t.filter(Boolean).join(" ");
}
function _R(t) {
  const [a, s] = t.split("-"), i = [];
  return a && i.push(a), s && i.push(s), i;
}
const MR = (t) => {
  var a, s, i, o, u, f, m, y, p;
  const { invert: b, toast: v, unstyled: w, interacting: S, setHeights: j, visibleToasts: N, heights: R, index: T, toasts: L, expanded: _, removeToast: C, defaultRichColors: I, closeButton: Y, style: ie, cancelButtonStyle: M, actionButtonStyle: V, className: D = "", descriptionClassName: P = "", duration: J, position: Z, gap: G, expandByDefault: re, classNames: A, icons: F, closeButtonAriaLabel: U = "Close toast" } = t, [se, de] = Se.useState(null), [k, ee] = Se.useState(null), [te, K] = Se.useState(!1), [B, W] = Se.useState(!1), [ce, ye] = Se.useState(!1), [Me, lt] = Se.useState(!1), [Ce, Fe] = Se.useState(!1), [qe, Pe] = Se.useState(0), [It, Vt] = Se.useState(0), _t = Se.useRef(v.duration || J || Qy), Re = Se.useRef(null), He = Se.useRef(null), We = T === 0, Nt = T + 1 <= N, at = v.type, Xe = v.dismissible !== !1, gt = v.className || "", we = v.descriptionClassName || "", Te = Se.useMemo(() => R.findIndex((ge) => ge.toastId === v.id) || 0, [
    R,
    v.id
  ]), Ge = Se.useMemo(() => {
    var ge;
    return (ge = v.closeButton) != null ? ge : Y;
  }, [
    v.closeButton,
    Y
  ]), Ye = Se.useMemo(() => v.duration || J || Qy, [
    v.duration,
    J
  ]), yt = Se.useRef(0), At = Se.useRef(0), Hn = Se.useRef(0), Sn = Se.useRef(null), [wn, Pt] = Z.split("-"), kt = Se.useMemo(() => R.reduce((ge, O, he) => he >= Te ? ge : ge + O.height, 0), [
    R,
    Te
  ]), Lt = pR(), sa = v.invert || b, jn = at === "loading";
  At.current = Se.useMemo(() => Te * G + kt, [
    Te,
    kt
  ]), Se.useEffect(() => {
    _t.current = Ye;
  }, [
    Ye
  ]), Se.useEffect(() => {
    K(!0);
  }, []), Se.useEffect(() => {
    const ge = He.current;
    if (ge) {
      const O = ge.getBoundingClientRect().height;
      return Vt(O), j((he) => [
        {
          toastId: v.id,
          height: O,
          position: v.position
        },
        ...he
      ]), () => j((he) => he.filter((be) => be.toastId !== v.id));
    }
  }, [
    j,
    v.id
  ]), Se.useLayoutEffect(() => {
    if (!te) return;
    const ge = He.current, O = ge.style.height;
    ge.style.height = "auto";
    const he = ge.getBoundingClientRect().height;
    ge.style.height = O, Vt(he), j((be) => be.find((Ue) => Ue.toastId === v.id) ? be.map((Ue) => Ue.toastId === v.id ? {
      ...Ue,
      height: he
    } : Ue) : [
      {
        toastId: v.id,
        height: he,
        position: v.position
      },
      ...be
    ]);
  }, [
    te,
    v.title,
    v.description,
    j,
    v.id,
    v.jsx,
    v.action,
    v.cancel
  ]);
  const un = Se.useCallback(() => {
    W(!0), Pe(At.current), j((ge) => ge.filter((O) => O.toastId !== v.id)), setTimeout(() => {
      C(v);
    }, RR);
  }, [
    v,
    C,
    j,
    At
  ]);
  Se.useEffect(() => {
    if (v.promise && at === "loading" || v.duration === 1 / 0 || v.type === "loading") return;
    let ge;
    return _ || S || Lt ? (() => {
      if (Hn.current < yt.current) {
        const be = (/* @__PURE__ */ new Date()).getTime() - yt.current;
        _t.current = _t.current - be;
      }
      Hn.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      _t.current !== 1 / 0 && (yt.current = (/* @__PURE__ */ new Date()).getTime(), ge = setTimeout(() => {
        v.onAutoClose == null || v.onAutoClose.call(v, v), un();
      }, _t.current));
    })(), () => clearTimeout(ge);
  }, [
    _,
    S,
    v,
    at,
    Lt,
    un
  ]), Se.useEffect(() => {
    v.delete && (un(), v.onDismiss == null || v.onDismiss.call(v, v));
  }, [
    un,
    v.delete
  ]);
  function Qt() {
    var ge;
    if (F?.loading) {
      var O;
      return /* @__PURE__ */ Se.createElement("div", {
        className: ba(A?.loader, v == null || (O = v.classNames) == null ? void 0 : O.loader, "sonner-loader"),
        "data-visible": at === "loading"
      }, F.loading);
    }
    return /* @__PURE__ */ Se.createElement(cR, {
      className: ba(A?.loader, v == null || (ge = v.classNames) == null ? void 0 : ge.loader),
      visible: at === "loading"
    });
  }
  const sn = v.icon || F?.[at] || lR(at);
  var fe, Ae;
  return /* @__PURE__ */ Se.createElement("li", {
    tabIndex: 0,
    ref: He,
    className: ba(D, gt, A?.toast, v == null || (a = v.classNames) == null ? void 0 : a.toast, A?.default, A?.[at], v == null || (s = v.classNames) == null ? void 0 : s[at]),
    "data-sonner-toast": "",
    "data-rich-colors": (fe = v.richColors) != null ? fe : I,
    "data-styled": !(v.jsx || v.unstyled || w),
    "data-mounted": te,
    "data-promise": !!v.promise,
    "data-swiped": Ce,
    "data-removed": B,
    "data-visible": Nt,
    "data-y-position": wn,
    "data-x-position": Pt,
    "data-index": T,
    "data-front": We,
    "data-swiping": ce,
    "data-dismissible": Xe,
    "data-type": at,
    "data-invert": sa,
    "data-swipe-out": Me,
    "data-swipe-direction": k,
    "data-expanded": !!(_ || re && te),
    "data-testid": v.testId,
    style: {
      "--index": T,
      "--toasts-before": T,
      "--z-index": L.length - T,
      "--offset": `${B ? qe : At.current}px`,
      "--initial-height": re ? "auto" : `${It}px`,
      ...ie,
      ...v.style
    },
    onDragEnd: () => {
      ye(!1), de(null), Sn.current = null;
    },
    onPointerDown: (ge) => {
      ge.button !== 2 && (jn || !Xe || (Re.current = /* @__PURE__ */ new Date(), Pe(At.current), ge.target.setPointerCapture(ge.pointerId), ge.target.tagName !== "BUTTON" && (ye(!0), Sn.current = {
        x: ge.clientX,
        y: ge.clientY
      })));
    },
    onPointerUp: () => {
      var ge, O, he;
      if (Me || !Xe) return;
      Sn.current = null;
      const be = Number(((ge = He.current) == null ? void 0 : ge.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), ze = Number(((O = He.current) == null ? void 0 : O.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), Ue = (/* @__PURE__ */ new Date()).getTime() - ((he = Re.current) == null ? void 0 : he.getTime()), ot = se === "x" ? be : ze, qt = Math.abs(ot) / Ue;
      if (Math.abs(ot) >= TR || qt > 0.11) {
        Pe(At.current), v.onDismiss == null || v.onDismiss.call(v, v), ee(se === "x" ? be > 0 ? "right" : "left" : ze > 0 ? "down" : "up"), un(), lt(!0);
        return;
      } else {
        var ct, z;
        (ct = He.current) == null || ct.style.setProperty("--swipe-amount-x", "0px"), (z = He.current) == null || z.style.setProperty("--swipe-amount-y", "0px");
      }
      Fe(!1), ye(!1), de(null);
    },
    onPointerMove: (ge) => {
      var O, he, be;
      if (!Sn.current || !Xe || ((O = window.getSelection()) == null ? void 0 : O.toString().length) > 0) return;
      const Ue = ge.clientY - Sn.current.y, ot = ge.clientX - Sn.current.x;
      var qt;
      const ct = (qt = t.swipeDirections) != null ? qt : _R(Z);
      !se && (Math.abs(ot) > 1 || Math.abs(Ue) > 1) && de(Math.abs(ot) > Math.abs(Ue) ? "x" : "y");
      let z = {
        x: 0,
        y: 0
      };
      const H = (Q) => 1 / (1.5 + Math.abs(Q) / 20);
      if (se === "y") {
        if (ct.includes("top") || ct.includes("bottom"))
          if (ct.includes("top") && Ue < 0 || ct.includes("bottom") && Ue > 0)
            z.y = Ue;
          else {
            const Q = Ue * H(Ue);
            z.y = Math.abs(Q) < Math.abs(Ue) ? Q : Ue;
          }
      } else if (se === "x" && (ct.includes("left") || ct.includes("right")))
        if (ct.includes("left") && ot < 0 || ct.includes("right") && ot > 0)
          z.x = ot;
        else {
          const Q = ot * H(ot);
          z.x = Math.abs(Q) < Math.abs(ot) ? Q : ot;
        }
      (Math.abs(z.x) > 0 || Math.abs(z.y) > 0) && Fe(!0), (he = He.current) == null || he.style.setProperty("--swipe-amount-x", `${z.x}px`), (be = He.current) == null || be.style.setProperty("--swipe-amount-y", `${z.y}px`);
    }
  }, Ge && !v.jsx && at !== "loading" ? /* @__PURE__ */ Se.createElement("button", {
    "aria-label": U,
    "data-disabled": jn,
    "data-close-button": !0,
    onClick: jn || !Xe ? () => {
    } : () => {
      un(), v.onDismiss == null || v.onDismiss.call(v, v);
    },
    className: ba(A?.closeButton, v == null || (i = v.classNames) == null ? void 0 : i.closeButton)
  }, (Ae = F?.close) != null ? Ae : mR) : null, (at || v.icon || v.promise) && v.icon !== null && (F?.[at] !== null || v.icon) ? /* @__PURE__ */ Se.createElement("div", {
    "data-icon": "",
    className: ba(A?.icon, v == null || (o = v.classNames) == null ? void 0 : o.icon)
  }, v.promise || v.type === "loading" && !v.icon ? v.icon || Qt() : null, v.type !== "loading" ? sn : null) : null, /* @__PURE__ */ Se.createElement("div", {
    "data-content": "",
    className: ba(A?.content, v == null || (u = v.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ Se.createElement("div", {
    "data-title": "",
    className: ba(A?.title, v == null || (f = v.classNames) == null ? void 0 : f.title)
  }, v.jsx ? v.jsx : typeof v.title == "function" ? v.title() : v.title), v.description ? /* @__PURE__ */ Se.createElement("div", {
    "data-description": "",
    className: ba(P, we, A?.description, v == null || (m = v.classNames) == null ? void 0 : m.description)
  }, typeof v.description == "function" ? v.description() : v.description) : null), /* @__PURE__ */ Se.isValidElement(v.cancel) ? v.cancel : v.cancel && Yo(v.cancel) ? /* @__PURE__ */ Se.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: v.cancelButtonStyle || M,
    onClick: (ge) => {
      Yo(v.cancel) && Xe && (v.cancel.onClick == null || v.cancel.onClick.call(v.cancel, ge), un());
    },
    className: ba(A?.cancelButton, v == null || (y = v.classNames) == null ? void 0 : y.cancelButton)
  }, v.cancel.label) : null, /* @__PURE__ */ Se.isValidElement(v.action) ? v.action : v.action && Yo(v.action) ? /* @__PURE__ */ Se.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: v.actionButtonStyle || V,
    onClick: (ge) => {
      Yo(v.action) && (v.action.onClick == null || v.action.onClick.call(v.action, ge), !ge.defaultPrevented && un());
    },
    className: ba(A?.actionButton, v == null || (p = v.classNames) == null ? void 0 : p.actionButton)
  }, v.action.label) : null);
};
function Zy() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const t = document.documentElement.getAttribute("dir");
  return t === "auto" || !t ? window.getComputedStyle(document.documentElement).direction : t;
}
function AR(t, a) {
  const s = {};
  return [
    t,
    a
  ].forEach((i, o) => {
    const u = o === 1, f = u ? "--mobile-offset" : "--offset", m = u ? ER : jR;
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
const kR = /* @__PURE__ */ Se.forwardRef(function(a, s) {
  const { id: i, invert: o, position: u = "bottom-right", hotkey: f = [
    "altKey",
    "KeyT"
  ], expand: m, closeButton: y, className: p, offset: b, mobileOffset: v, theme: w = "light", richColors: S, duration: j, style: N, visibleToasts: R = wR, toastOptions: T, dir: L = Zy(), gap: _ = CR, icons: C, containerAriaLabel: I = "Notifications" } = a, [Y, ie] = Se.useState([]), M = Se.useMemo(() => i ? Y.filter((te) => te.toasterId === i) : Y.filter((te) => !te.toasterId), [
    Y,
    i
  ]), V = Se.useMemo(() => Array.from(new Set([
    u
  ].concat(M.filter((te) => te.position).map((te) => te.position)))), [
    M,
    u
  ]), [D, P] = Se.useState([]), [J, Z] = Se.useState(!1), [G, re] = Se.useState(!1), [A, F] = Se.useState(w !== "system" ? w : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), U = Se.useRef(null), se = f.join("+").replace(/Key/g, "").replace(/Digit/g, ""), de = Se.useRef(null), k = Se.useRef(!1), ee = Se.useCallback((te) => {
    ie((K) => {
      var B;
      return (B = K.find((W) => W.id === te.id)) != null && B.delete || An.dismiss(te.id), K.filter(({ id: W }) => W !== te.id);
    });
  }, []);
  return Se.useEffect(() => An.subscribe((te) => {
    if (te.dismiss) {
      requestAnimationFrame(() => {
        ie((K) => K.map((B) => B.id === te.id ? {
          ...B,
          delete: !0
        } : B));
      });
      return;
    }
    setTimeout(() => {
      sR.flushSync(() => {
        ie((K) => {
          const B = K.findIndex((W) => W.id === te.id);
          return B !== -1 ? [
            ...K.slice(0, B),
            {
              ...K[B],
              ...te
            },
            ...K.slice(B + 1)
          ] : [
            te,
            ...K
          ];
        });
      });
    });
  }), [
    Y
  ]), Se.useEffect(() => {
    if (w !== "system") {
      F(w);
      return;
    }
    if (w === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? F("dark") : F("light")), typeof window > "u") return;
    const te = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      te.addEventListener("change", ({ matches: K }) => {
        F(K ? "dark" : "light");
      });
    } catch {
      te.addListener(({ matches: B }) => {
        try {
          F(B ? "dark" : "light");
        } catch (W) {
          console.error(W);
        }
      });
    }
  }, [
    w
  ]), Se.useEffect(() => {
    Y.length <= 1 && Z(!1);
  }, [
    Y
  ]), Se.useEffect(() => {
    const te = (K) => {
      var B;
      if (f.every((ye) => K[ye] || K.code === ye)) {
        var ce;
        Z(!0), (ce = U.current) == null || ce.focus();
      }
      K.code === "Escape" && (document.activeElement === U.current || (B = U.current) != null && B.contains(document.activeElement)) && Z(!1);
    };
    return document.addEventListener("keydown", te), () => document.removeEventListener("keydown", te);
  }, [
    f
  ]), Se.useEffect(() => {
    if (U.current)
      return () => {
        de.current && (de.current.focus({
          preventScroll: !0
        }), de.current = null, k.current = !1);
      };
  }, [
    U.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ Se.createElement("section", {
    ref: s,
    "aria-label": `${I} ${se}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, V.map((te, K) => {
    var B;
    const [W, ce] = te.split("-");
    return M.length ? /* @__PURE__ */ Se.createElement("ol", {
      key: te,
      dir: L === "auto" ? Zy() : L,
      tabIndex: -1,
      ref: U,
      className: p,
      "data-sonner-toaster": !0,
      "data-sonner-theme": A,
      "data-y-position": W,
      "data-x-position": ce,
      style: {
        "--front-toast-height": `${((B = D[0]) == null ? void 0 : B.height) || 0}px`,
        "--width": `${NR}px`,
        "--gap": `${_}px`,
        ...N,
        ...AR(b, v)
      },
      onBlur: (ye) => {
        k.current && !ye.currentTarget.contains(ye.relatedTarget) && (k.current = !1, de.current && (de.current.focus({
          preventScroll: !0
        }), de.current = null));
      },
      onFocus: (ye) => {
        ye.target instanceof HTMLElement && ye.target.dataset.dismissible === "false" || k.current || (k.current = !0, de.current = ye.relatedTarget);
      },
      onMouseEnter: () => Z(!0),
      onMouseMove: () => Z(!0),
      onMouseLeave: () => {
        G || Z(!1);
      },
      onDragEnd: () => Z(!1),
      onPointerDown: (ye) => {
        ye.target instanceof HTMLElement && ye.target.dataset.dismissible === "false" || re(!0);
      },
      onPointerUp: () => re(!1)
    }, M.filter((ye) => !ye.position && K === 0 || ye.position === te).map((ye, Me) => {
      var lt, Ce;
      return /* @__PURE__ */ Se.createElement(MR, {
        key: ye.id,
        icons: C,
        index: Me,
        toast: ye,
        defaultRichColors: S,
        duration: (lt = T?.duration) != null ? lt : j,
        className: T?.className,
        descriptionClassName: T?.descriptionClassName,
        invert: o,
        visibleToasts: R,
        closeButton: (Ce = T?.closeButton) != null ? Ce : y,
        interacting: G,
        position: te,
        style: T?.style,
        unstyled: T?.unstyled,
        classNames: T?.classNames,
        cancelButtonStyle: T?.cancelButtonStyle,
        actionButtonStyle: T?.actionButtonStyle,
        closeButtonAriaLabel: T?.closeButtonAriaLabel,
        removeToast: ee,
        toasts: M.filter((Fe) => Fe.position == ye.position),
        heights: D.filter((Fe) => Fe.position == ye.position),
        setHeights: P,
        expandByDefault: m,
        gap: _,
        expanded: J,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), Jy = 32, Wy = -30, e0 = -6, t0 = 0.5, n0 = 2, a0 = -24, r0 = 24, s0 = -12, i0 = 12, l0 = -12, o0 = 12, c0 = -60, u0 = -20;
class Zs extends Error {
  constructor(a, s) {
    super(s), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function C1(t, a, s, i = {}) {
  const o = `/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, u = `${Sa}${o}`, f = await fetch(u, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(s),
    ...i.signal ? { signal: i.signal } : {}
  });
  if (f.status === 409) {
    const m = await f.json().catch(() => null), y = m?.error?.current_digest ?? "", p = m?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Zs(y, p);
  }
  if (!f.ok)
    throw new Error(await Gc(f, "apply"));
  return await f.json();
}
async function DR(t, a, s, i, o = {}) {
  const u = `/deployments/${encodeURIComponent(t)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(s)}/edit`, f = `${Sa}${u}`, m = await fetch(f, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(i),
    ...o.signal ? { signal: o.signal } : {}
  });
  if (m.status === 409) {
    const y = await m.json().catch(() => null), p = y?.error?.current_digest ?? "", b = y?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Zs(p, b);
  }
  if (!m.ok)
    throw new Error(await Gc(m, "apply"));
  return await m.json();
}
async function zR(t, a, s = {}) {
  const i = `${Sa}/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, o = await fetch(i, {
    method: "DELETE",
    ...s.signal ? { signal: s.signal } : {}
  });
  if (!o.ok && o.status !== 204)
    throw new Error(`clear edit failed: ${o.status}`);
}
async function OR(t, a, s, i = {}) {
  const o = `${Sa}/voice-assets/${encodeURIComponent(t)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, u = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain: s }),
    ...i.signal ? { signal: i.signal } : {}
  });
  if (!u.ok)
    throw new Error(await Gc(u, "preview"));
  return u.blob();
}
async function yc(t, a, s, i = 50, o = {}) {
  const u = `${Sa}/audit/${encodeURIComponent(a)}/${encodeURIComponent(s)}?deploymentId=${encodeURIComponent(t)}&limit=${encodeURIComponent(String(i))}`, f = await fetch(u, {
    method: "GET",
    headers: { accept: "application/json" },
    ...o.signal ? { signal: o.signal } : {}
  });
  if (!f.ok)
    throw new Error(await Gc(f, "audit fetch"));
  return await f.json();
}
function Dn() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function T1(t, a) {
  if (t.version !== 1)
    return { message: "Unsupported chain version." };
  if (t.ops.length > Jy)
    return {
      message: `Chain exceeds the maximum of ${Jy} operations.`
    };
  for (const s of t.ops) {
    const i = LR(s, a);
    if (i) return i;
  }
  return null;
}
function LR(t, a) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return $R(t.id, t.start_ms, t.end_ms, a);
    case "normalize":
      return t.target_lufs < Wy || t.target_lufs > e0 ? {
        opId: t.id,
        message: `Normalize target must be between ${Wy} and ${e0} LUFS.`
      } : null;
    case "speed":
      return t.factor < t0 || t.factor > n0 ? {
        opId: t.id,
        message: `Speed factor must be between ${t0}× and ${n0}×.`
      } : null;
    case "fade_in":
    case "fade_out":
      return t.duration_ms < 1 ? { opId: t.id, message: "Fade duration must be at least 1 ms." } : null;
    case "gain":
      return t.gain_db < a0 || t.gain_db > r0 ? {
        opId: t.id,
        message: `Volume must be between ${a0} and ${r0} dB.`
      } : null;
    case "eq3":
      for (const [s, i] of [
        ["low_db", t.low_db],
        ["mid_db", t.mid_db],
        ["high_db", t.high_db]
      ])
        if (i < s0 || i > i0)
          return {
            opId: t.id,
            message: `EQ ${s} must be between ${s0} and ${i0} dB.`
          };
      return null;
    case "pitch_shift":
      return t.semitones < l0 || t.semitones > o0 ? {
        opId: t.id,
        message: `Pitch must be between ${l0} and ${o0} semitones.`
      } : null;
    case "silence_strip":
      return t.threshold_db < c0 || t.threshold_db > u0 ? {
        opId: t.id,
        message: `Silence threshold must be between ${c0} and ${u0} dB.`
      } : null;
    default:
      return {
        message: "Unknown edit op mode in chain — refusing to apply."
      };
  }
}
function $R(t, a, s, i) {
  return a < 0 ? { opId: t, message: "Start must be ≥ 0 ms." } : s <= a ? { opId: t, message: "End must be greater than start." } : i > 0 && s > i ? { opId: t, message: "End extends past source duration." } : null;
}
async function Gc(t, a) {
  const s = await t.json().catch(() => null);
  return s?.error?.message ?? s?.message ?? `${a} failed: ${t.status}`;
}
var UR = "g5r6d10", BR = "g5r6d11", IR = "g5r6d12", VR = "g5r6d13", qR = "g5r6d14", HR = "g5r6d15", FR = "g5r6d1a", PR = "g5r6d1b", GR = "g5r6d1c", YR = "g5r6d1d", KR = "g5r6d1e", XR = "g5r6d1g", QR = "g5r6d1h", ZR = "g5r6d1i", JR = "g5r6d1j", WR = "g5r6d1k", e_ = "g5r6d1l", t_ = "g5r6d1m", n_ = "g5r6d1n", a_ = "g5r6d1o", d0 = "g5r6d1p", r_ = "g5r6d1q", s_ = "g5r6d1r", i_ = "g5r6d1s", l_ = "g5r6d1t", o_ = "g5r6d1u", f0 = "g5r6d1v", h0 = "g5r6d1w", c_ = "g5r6d1x", u_ = "g5r6d1y", yr = "g5r6d1z", d_ = "g5r6d110", m0 = "g5r6d111", f_ = "g5r6d112", h_ = "g5r6d113", mr = "g5r6d114", m_ = "g5r6d119", p_ = "a6ki8u0", g_ = "a6ki8u1", v_ = "a6ki8u2", y_ = "a6ki8u3", b_ = "a6ki8u4", x_ = "a6ki8u5", S_ = "a6ki8u6", xf = "a6ki8u7", w_ = "a6ki8u8", j_ = "a6ki8u9", E_ = "a6ki8ua", N_ = "a6ki8ub", C_ = "a6ki8uc", T_ = "a6ki8ud", R_ = "a6ki8ue", __ = "a6ki8uf", M_ = "a6ki8ug", A_ = "a6ki8uh", k_ = "_1lguv7x0", D_ = "_1lguv7x1", z_ = "_1lguv7x2", O_ = "_1lguv7x3", L_ = "_1lguv7x4", p0 = "_1lguv7x5", $_ = "_1lguv7x6", U_ = "_1lguv7x7", B_ = "_1lguv7x8", I_ = "_1lguv7x9", V_ = "_1lguv7xa", q_ = "_1lguv7xb", H_ = "_1lguv7xc", g0 = "_1lguv7xd", F_ = "_1lguv7xe", P_ = "_1lguv7xf", G_ = "_1lguv7xg", Y_ = "_1lguv7xh", R1 = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, _1 = { xs: "_4ydn546", sm: "_4ydn547", md: "_4ydn548", lg: "_4ydn549" }, K_ = { xs: "_4ydn54a", sm: "_4ydn54b", md: "_4ydn54c", lg: "_4ydn54d" }, X_ = "_4ydn54f";
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
    R1[t],
    _1[a],
    o ? K_[a] : null,
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
        i ? /* @__PURE__ */ c.jsx("span", { className: X_, "aria-hidden": "true" }) : null,
        f
      ]
    }
  );
}
const Q_ = 28;
function Z_(t) {
  if (!t) return 1;
  let a = 0;
  for (let s = 0; s < Math.min(t.length, 12); s++)
    a = a * 33 + t.charCodeAt(s) >>> 0;
  return a || 1;
}
function J_(t, a) {
  const s = new Array(a);
  let i = t;
  for (let o = 0; o < a; o++) {
    i = (i * 9301 + 49297) % 233280;
    const u = i / 233280, f = Math.min(1, o / 6, (a - o) / 6);
    s[o] = Math.max(0.18, f * (0.32 + u * 0.68));
  }
  return s;
}
function W_(t) {
  if (t == null) return "—";
  const a = Math.max(0, Math.round(t / 1e3)), s = Math.floor(a / 60), i = a % 60;
  return `${s}:${i.toString().padStart(2, "0")}`;
}
function eM(t) {
  return t ? `${(t / 1e3).toFixed(t % 1e3 === 0 ? 0 : 1)} kHz` : "—";
}
function tM({
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
  const [b, v] = g.useState(!1), [w, S] = g.useState(t.displayName), [j, N] = g.useState(!1), [R, T] = g.useState(t.displayName), L = g.useRef(null), _ = g.useRef(null), C = g.useMemo(() => Z_(t.contentSha256), [t.contentSha256]), I = g.useMemo(() => J_(C, Q_), [C]), Y = g.useMemo(() => _T(t), [t]);
  g.useEffect(() => {
    S(t.displayName);
  }, [t.displayName]), g.useEffect(() => {
    const Z = L.current;
    Z && (i && Y ? Z.play().catch(() => {
    }) : (Z.pause(), Z.currentTime = 0));
  }, [i, Y]);
  const ie = async () => {
    const Z = w.trim();
    if (!Z || Z === t.displayName) {
      v(!1), S(t.displayName);
      return;
    }
    try {
      await u(Z);
    } finally {
      v(!1);
    }
  }, M = () => {
    T(t.displayName), N(!0);
  }, V = () => {
    const Z = R.trim();
    if (!Z) {
      _.current?.focus();
      return;
    }
    N(!1), y?.(Z);
  }, D = () => {
    N(!1);
  }, P = () => {
    R.trim() ? V() : D();
  }, J = `${W_(t.durationMs)} · ${eM(t.sampleRate)}`;
  return /* @__PURE__ */ c.jsxs("article", { className: k_, "data-playing": i ? "true" : "false", children: [
    /* @__PURE__ */ c.jsxs("header", { className: D_, children: [
      /* @__PURE__ */ c.jsx("span", { className: z_, "data-kind": a, "aria-hidden": "true", children: a === "upload" ? "▣" : "★" }),
      /* @__PURE__ */ c.jsxs("div", { className: O_, children: [
        b ? /* @__PURE__ */ c.jsx(
          "input",
          {
            className: p0,
            value: w,
            autoFocus: !0,
            onChange: (Z) => S(Z.target.value),
            onBlur: () => {
              ie();
            },
            onKeyDown: (Z) => {
              Z.key === "Enter" ? (Z.preventDefault(), Z.currentTarget.blur()) : Z.key === "Escape" && (v(!1), S(t.displayName));
            },
            "aria-label": `Rename ${t.displayName}`
          }
        ) : /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: L_,
            onDoubleClick: () => v(!0),
            title: "Double-click to rename",
            children: t.displayName
          }
        ),
        /* @__PURE__ */ c.jsx("span", { className: $_, children: J })
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: U_, "data-kind": a, children: a === "upload" ? "UPLOADED" : "PRESET" })
    ] }),
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: B_,
        "data-playing": i ? "true" : "false",
        disabled: Y == null,
        title: Y ? "Preview" : "Preview unavailable",
        onClick: o,
        "aria-label": i ? "Pause preview" : "Play preview",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: I_, "aria-hidden": "true", children: i ? "❚❚" : "▶" }),
          /* @__PURE__ */ c.jsx("span", { className: V_, "aria-hidden": "true", children: I.map((Z, G) => /* @__PURE__ */ c.jsx("span", { className: q_, style: { height: `${Math.round(Z * 100)}%` } }, G)) })
        ]
      }
    ),
    /* @__PURE__ */ c.jsx("footer", { className: H_, children: j ? /* @__PURE__ */ c.jsxs("span", { style: { display: "flex", alignItems: "center", gap: 6, width: "100%" }, children: [
      /* @__PURE__ */ c.jsx(
        "input",
        {
          ref: _,
          className: p0,
          style: { flex: 1, minWidth: 0 },
          value: R,
          autoFocus: !0,
          placeholder: "Character name",
          onChange: (Z) => T(Z.target.value),
          onFocus: (Z) => Z.currentTarget.select(),
          onBlur: P,
          onKeyDown: (Z) => {
            Z.key === "Enter" ? (Z.preventDefault(), V()) : Z.key === "Escape" && D();
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
          onMouseDown: (Z) => Z.preventDefault(),
          onClick: V,
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
          onMouseDown: (Z) => Z.preventDefault(),
          onClick: D,
          children: "✕"
        }
      )
    ] }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      s.length > 0 ? /* @__PURE__ */ c.jsxs("span", { className: g0, children: [
        /* @__PURE__ */ c.jsx("span", { children: "used by" }),
        s.map((Z) => /* @__PURE__ */ c.jsx(
          "span",
          {
            className: F_,
            style: { color: Z.color, borderColor: Z.color },
            children: Z.characterName
          },
          Z.characterName
        ))
      ] }) : /* @__PURE__ */ c.jsx("span", { className: g0, children: "unassigned" }),
      /* @__PURE__ */ c.jsxs("span", { className: P_, children: [
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
            className: G_,
            title: "Delete",
            "aria-label": "Delete voice",
            onClick: m,
            children: "✕"
          }
        )
      ] })
    ] }) }),
    Y && /* @__PURE__ */ c.jsx(
      "audio",
      {
        ref: L,
        src: Y,
        preload: "none",
        className: Y_,
        onEnded: p
      }
    )
  ] });
}
var nM = "_17eol302", aM = "_17eol303", rM = "_17eol304", sM = "_17eol305", iM = "_17eol306", lM = "_17eol307", Ko = "_17eol308", oM = "_17eol309", cM = "_17eol30a", uM = "_17eol30b", dM = "_17eol30c", fM = "_17eol30d", v0 = "_17eol30e", hM = "_17eol30g";
function mM() {
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
function pM(t) {
  const a = Math.max(0, Math.floor(t / 1e3)), s = Math.floor(a / 60), i = a % 60;
  return `${s}:${i.toString().padStart(2, "0")}`;
}
function gM({
  open: t,
  defaultName: a,
  onClose: s,
  onSubmit: i
}) {
  const [o, u] = g.useState("idle"), [f, m] = g.useState(null), [y, p] = g.useState(0), [b, v] = g.useState(null), [w, S] = g.useState(a), [j, N] = g.useState(!1), R = g.useRef(null), T = g.useRef(null), L = g.useRef([]), _ = g.useRef(0), C = g.useRef(null), I = g.useRef(null), Y = g.useRef({ mime: "audio/webm", ext: "webm" }), ie = g.useRef(null), M = g.useRef(null), V = g.useRef(null);
  g.useEffect(() => {
    if (t)
      return V.current = document.activeElement ?? null, requestAnimationFrame(() => {
        ie.current?.scrollIntoView({ behavior: "smooth", block: "center" }), M.current?.focus();
      }), () => {
        V.current?.focus?.();
      };
  }, [t]), g.useEffect(() => {
    if (!t) return;
    const F = (U) => {
      U.key === "Escape" && s();
    };
    return window.addEventListener("keydown", F), () => window.removeEventListener("keydown", F);
  }, [t, s]);
  const D = g.useCallback(
    (F) => {
      if (F.key !== "Tab") return;
      const U = ie.current;
      if (!U) return;
      const se = U.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (se.length === 0) return;
      const de = se[0], k = se[se.length - 1], ee = document.activeElement;
      F.shiftKey ? (ee === de || ee === U) && (F.preventDefault(), k.focus()) : ee === k && (F.preventDefault(), de.focus());
    },
    []
  ), P = g.useCallback(() => {
    if (T.current) {
      for (const F of T.current.getTracks()) F.stop();
      T.current = null;
    }
    C.current != null && (window.clearInterval(C.current), C.current = null);
  }, []), J = g.useCallback(() => {
    P(), b && URL.revokeObjectURL(b), v(null), L.current = [], I.current = null, p(0), m(null), u("idle");
  }, [b, P]);
  if (g.useEffect(() => {
    t || (J(), S(a));
  }, [t, a, J]), g.useEffect(() => () => {
    P(), b && URL.revokeObjectURL(b);
  }, [b, P]), !t) return null;
  const Z = async () => {
    m(null), u("preparing");
    try {
      const F = await navigator.mediaDevices.getUserMedia({ audio: !0 });
      T.current = F;
      const U = mM();
      Y.current = U;
      const se = U.mime ? new MediaRecorder(F, { mimeType: U.mime }) : new MediaRecorder(F);
      R.current = se, L.current = [], se.ondataavailable = (de) => {
        de.data && de.data.size > 0 && L.current.push(de.data);
      }, se.onstop = () => {
        const de = U.mime || "audio/webm", k = new Blob(L.current, { type: de }), ee = new File([k], `${w || a || "recording"}.${U.ext}`, {
          type: de
        });
        I.current = ee;
        const te = URL.createObjectURL(k);
        v(te), u("ready"), P();
      }, se.start(), _.current = Date.now(), p(0), C.current = window.setInterval(() => {
        p(Date.now() - _.current);
      }, 200), u("recording");
    } catch (F) {
      const U = F instanceof Error ? F.message : "could not access microphone";
      m(U), u(U.toLowerCase().includes("denied") ? "denied" : "error"), P();
    }
  }, G = () => {
    const F = R.current;
    F && F.state !== "inactive" && F.stop(), C.current != null && (window.clearInterval(C.current), C.current = null);
  }, re = async () => {
    const F = I.current;
    if (!F) return;
    const U = (w || a).trim();
    if (!U) {
      m("Name cannot be empty");
      return;
    }
    N(!0);
    try {
      await i(F, U), s();
    } catch (se) {
      m(se instanceof Error ? se.message : "upload failed");
    } finally {
      N(!1);
    }
  }, A = o === "recording" ? "REC" : o === "ready" ? "OK" : o === "preparing" ? "..." : "MIC";
  return /* @__PURE__ */ c.jsx("div", { className: nM, role: "presentation", onClick: s, children: /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: ie,
      className: aM,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "mic-recorder-heading",
      onClick: (F) => F.stopPropagation(),
      onKeyDown: D,
      tabIndex: -1,
      children: [
        /* @__PURE__ */ c.jsx("h2", { id: "mic-recorder-heading", className: rM, children: "Record reference audio" }),
        /* @__PURE__ */ c.jsx("p", { className: sM, children: "Speak the reference line into your microphone. 4–30 seconds is recommended for clean conditioning." }),
        /* @__PURE__ */ c.jsx(
          "span",
          {
            className: iM,
            "data-state": o === "recording" ? "recording" : o === "ready" ? "ready" : "idle",
            "aria-hidden": "true",
            children: A
          }
        ),
        /* @__PURE__ */ c.jsx("div", { className: dM, "aria-live": "polite", children: pM(y) }),
        /* @__PURE__ */ c.jsxs("div", { className: lM, children: [
          (o === "idle" || o === "denied" || o === "error") && /* @__PURE__ */ c.jsxs(
            "button",
            {
              ref: M,
              type: "button",
              className: Ko,
              "data-tone": "danger",
              onClick: () => {
                Z();
              },
              children: [
                /* @__PURE__ */ c.jsx("span", { className: v0, "aria-hidden": "true" }),
                "Record"
              ]
            }
          ),
          o === "preparing" && /* @__PURE__ */ c.jsx("button", { type: "button", className: Ko, disabled: !0, children: "Starting…" }),
          o === "recording" && /* @__PURE__ */ c.jsxs(
            "button",
            {
              type: "button",
              className: Ko,
              "data-tone": "danger",
              "data-active": "true",
              onClick: G,
              children: [
                /* @__PURE__ */ c.jsx("span", { className: v0, "aria-hidden": "true" }),
                "Stop"
              ]
            }
          ),
          o === "ready" && /* @__PURE__ */ c.jsx(
            "button",
            {
              type: "button",
              className: Ko,
              onClick: () => {
                J();
              },
              children: "↺ Re-record"
            }
          )
        ] }),
        b && /* @__PURE__ */ c.jsx("audio", { className: fM, src: b, controls: !0, preload: "auto" }),
        /* @__PURE__ */ c.jsxs("label", { className: oM, children: [
          /* @__PURE__ */ c.jsx("span", { children: "Voice name" }),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              className: cM,
              value: w,
              onChange: (F) => S(F.target.value),
              placeholder: a
            }
          )
        ] }),
        f && /* @__PURE__ */ c.jsx("div", { className: uM, children: f }),
        /* @__PURE__ */ c.jsxs("div", { className: hM, children: [
          /* @__PURE__ */ c.jsx(Ze, { variant: "ghost", size: "md", onClick: s, disabled: j, children: "Cancel" }),
          /* @__PURE__ */ c.jsx(
            Ze,
            {
              variant: "primary",
              size: "md",
              onClick: () => {
                re();
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
function vM({
  deploymentId: t,
  voiceAssets: a,
  mappings: s,
  characterColors: i,
  onVoiceAssetsChange: o,
  onCreateCharacterFromVoice: u
}) {
  const [f, m] = g.useState(""), [y, p] = g.useState("all"), [b, v] = g.useState(!1), [w, S] = g.useState(null), [j, N] = g.useState(!1), [R, T] = g.useState(!1), L = g.useRef(null), _ = g.useCallback(
    (G) => "upload",
    []
  ), C = g.useMemo(() => {
    const G = f.trim().toLowerCase();
    return a.filter((re) => {
      const A = _(re);
      return !(y === "uploaded" && A !== "upload" || y === "preset" && A !== "preset" || G && !re.displayName.toLowerCase().includes(G));
    });
  }, [a, f, y, _]), I = g.useMemo(
    () => a.filter((G) => _(G) === "upload").length,
    [a, _]
  ), Y = g.useCallback(
    (G) => {
      const re = [], A = /* @__PURE__ */ new Set();
      for (const F of s)
        F.speakerVoiceAssetId === G && (A.has(F.characterName) || (A.add(F.characterName), re.push({
          characterName: F.characterName,
          // audit-allow: hex — neon decorative palette per design lang
          color: i[F.characterName] ?? "#ba9eff"
        })));
      return re;
    },
    [s, i]
  ), ie = g.useCallback(
    async (G) => {
      const re = Array.from(G).slice(0, 8);
      if (re.length !== 0) {
        T(!0);
        try {
          const A = [];
          for (const F of re) {
            if (!F.type.startsWith("audio/") && !/\.(wav|mp3|flac|ogg|m4a|webm)$/i.test(F.name)) {
              pn.error(`${F.name}: not an audio file`);
              continue;
            }
            const U = F.name.replace(/\.[^.]+$/, "");
            try {
              const se = await Cc(t, F, U, "speaker");
              A.push(se), pn.success(`Added ${se.displayName}`);
            } catch (se) {
              pn.error(se instanceof Error ? se.message : `${F.name}: upload failed`);
            }
          }
          A.length > 0 && o([...A, ...a]);
        } finally {
          T(!1);
        }
      }
    },
    [t, a, o]
  ), M = (G) => {
    G.preventDefault(), v(!1), G.dataTransfer?.files && ie(G.dataTransfer.files);
  }, V = g.useCallback(async () => {
    const G = window.prompt("Paste an audio URL (https://…)");
    if (G)
      try {
        const re = await fetch(G);
        if (!re.ok) throw new Error(`fetch failed: ${re.status}`);
        const A = await re.blob(), F = G.split("/").pop()?.split("?")[0] ?? "voice.wav", U = new File([A], F, { type: A.type || "audio/wav" });
        await ie([U]);
      } catch (re) {
        pn.error(re instanceof Error ? re.message : "could not fetch URL");
      }
  }, [ie]), D = g.useCallback(
    async (G, re) => {
      try {
        const A = await RT(t, G, re);
        o(
          a.map((F) => F.voiceAssetId === G ? A : F)
        ), pn.success(`Renamed to ${A.displayName}`);
      } catch (A) {
        pn.error(A instanceof Error ? A.message : "rename failed");
      }
    },
    [t, a, o]
  ), P = g.useCallback((G) => {
    navigator.clipboard?.writeText ? (navigator.clipboard.writeText(G), pn.success("Copied name")) : pn.error("Clipboard unavailable");
  }, []), J = g.useCallback(
    async (G) => {
      if (window.confirm(`Delete "${G.displayName}"? Mappings using it will reset.`))
        try {
          await TT(t, G.voiceAssetId), o(a.filter((A) => A.voiceAssetId !== G.voiceAssetId)), pn.success(`Deleted ${G.displayName}`);
        } catch (A) {
          pn.error(A instanceof Error ? A.message : "delete failed");
        }
    },
    [t, a, o]
  );
  return /* @__PURE__ */ c.jsxs("div", { className: p_, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: g_,
        "data-over": b ? "true" : "false",
        onDragOver: (G) => {
          G.preventDefault(), v(!0);
        },
        onDragLeave: () => v(!1),
        onDrop: M,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: v_, "aria-hidden": "true", children: "⇪" }),
          /* @__PURE__ */ c.jsxs("div", { className: y_, children: [
            /* @__PURE__ */ c.jsxs("div", { className: b_, children: [
              "Drop reference audio to add a voice",
              /* @__PURE__ */ c.jsx("span", { className: x_, children: ".wav · .mp3 · .flac · .ogg · 4–30s recommended" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: S_, children: [
              "or",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: xf,
                  onClick: () => L.current?.click(),
                  children: "browse files"
                }
              ),
              "·",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: xf,
                  onClick: () => {
                    V();
                  },
                  children: "paste URL"
                }
              ),
              "·",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: xf,
                  onClick: () => N(!0),
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
              disabled: R,
              onClick: () => L.current?.click(),
              children: "+ Upload"
            }
          ),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              ref: L,
              type: "file",
              accept: "audio/*,.wav,.mp3,.flac,.ogg,.m4a,.webm",
              multiple: !0,
              className: A_,
              onChange: (G) => {
                G.target.files && (ie(G.target.files), G.target.value = "");
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: w_, children: [
      /* @__PURE__ */ c.jsxs("label", { className: j_, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "⌕" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            className: E_,
            value: f,
            onChange: (G) => m(G.target.value),
            placeholder: "Search voices…",
            "aria-label": "Search voices"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: N_, role: "group", "aria-label": "Filter voices", children: [
        ["all", "All"],
        ["uploaded", "Uploaded"],
        ["preset", "Built-in"]
      ].map(([G, re]) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: C_,
          "data-active": y === G ? "true" : "false",
          onClick: () => p(G),
          children: re
        },
        G
      )) }),
      /* @__PURE__ */ c.jsxs("span", { className: __, children: [
        /* @__PURE__ */ c.jsx("span", { className: M_, children: a.length }),
        " voices",
        /* @__PURE__ */ c.jsx("span", { children: "·" }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          I,
          " uploaded"
        ] })
      ] })
    ] }),
    C.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: R_, children: a.length === 0 ? "No voices yet. Drop audio above or record from your microphone." : "No voices match this filter." }) : /* @__PURE__ */ c.jsx("div", { className: T_, children: C.map((G) => {
      const re = _(G);
      return /* @__PURE__ */ c.jsx(
        tM,
        {
          asset: G,
          presentation: re,
          usedBy: Y(G.voiceAssetId),
          isPlaying: w === G.voiceAssetId,
          onTogglePlay: () => S((A) => A === G.voiceAssetId ? null : G.voiceAssetId),
          onPlaybackEnded: () => S(null),
          onRename: (A) => D(G.voiceAssetId, A),
          onCopyName: () => P(G.displayName),
          onDelete: re === "upload" ? () => void J(G) : void 0,
          onCreateCharacter: u ? (A) => u(G, A) : void 0
        },
        G.voiceAssetId
      );
    }) }),
    /* @__PURE__ */ c.jsx(
      gM,
      {
        open: j,
        defaultName: `Take ${a.length + 1}`,
        onClose: () => N(!1),
        onSubmit: async (G, re) => {
          await Z(G, re);
        }
      }
    )
  ] });
  async function Z(G, re) {
    T(!0);
    try {
      const A = await Cc(t, G, re, "speaker");
      o([A, ...a]), pn.success(`Recorded ${A.displayName}`);
    } catch (A) {
      throw pn.error(A instanceof Error ? A.message : "upload failed"), A;
    } finally {
      T(!1);
    }
  }
}
async function yM(t) {
  return Rt(`/presets?deploymentId=${encodeURIComponent(t)}`);
}
async function bM(t, a, s) {
  return Rt("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: t, presetName: a, vector: s })
  });
}
async function xM(t, a) {
  await Rt(
    `/presets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
var y0 = "_190jlds0", SM = "_190jlds1", wM = "_190jlds2", jM = "_190jlds3", EM = "_190jlds4", NM = "_190jlds5", CM = "_190jlds6", TM = "_190jlds7", RM = "_190jlds8", _M = "_190jlds9", b0 = "_190jldsa", MM = "_190jldsb", x0 = "_190jldsc", AM = "_190jldsd", kM = "_190jldse", DM = "_190jldsf";
function zM({
  deploymentId: t,
  targets: a,
  onRevertToIdentity: s,
  onRevertToChain: i,
  emptyHint: o
}) {
  const [u, f] = g.useState(() => Us(a[0])), [m, y] = g.useState([]), [p, b] = g.useState(!1), [v, w] = g.useState(null), [S, j] = g.useState(!1), [N, R] = g.useState(null), T = g.useMemo(
    () => a.find((C) => Us(C) === u) ?? a[0],
    [a, u]
  );
  g.useEffect(() => {
    a.length && (a.some((C) => Us(C) === u) || f(Us(a[0])));
  }, [a, u]), g.useEffect(() => {
    if (!T) {
      y([]);
      return;
    }
    let C = !1;
    return b(!0), w(null), yc(t, T.kind, T.id, 50).then((I) => {
      C || y(I.entries);
    }).catch((I) => {
      C || w(I instanceof Error ? I.message : "audit fetch failed");
    }).finally(() => {
      C || b(!1);
    }), () => {
      C = !0;
    };
  }, [t, T]);
  const L = g.useCallback(() => {
    if (!T) return;
    const C = {
      deploymentId: t,
      targetKind: T.kind,
      targetId: T.id,
      targetLabel: T.label,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      entries: m
    }, I = new Blob([JSON.stringify(C, null, 2)], {
      type: "application/json"
    }), Y = URL.createObjectURL(I), ie = document.createElement("a");
    ie.href = Y, ie.download = `audit-${T.kind}-${T.id}-${Date.now()}.json`, document.body.appendChild(ie), ie.click(), document.body.removeChild(ie), URL.revokeObjectURL(Y);
  }, [t, m, T]), _ = g.useCallback(async () => {
    if (!(!T || !s) && window.confirm(
      `Revert "${T.label}" to identity (no edits)? This will write a new audit entry.`
    )) {
      j(!0);
      try {
        await s(T);
        const C = await yc(t, T.kind, T.id, 50);
        y(C.entries);
      } catch (C) {
        w(C instanceof Error ? C.message : "revert failed");
      } finally {
        j(!1);
      }
    }
  }, [t, s, T]);
  return a.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: y0, children: /* @__PURE__ */ c.jsx("p", { className: x0, children: o ?? "Audit history surfaces here once a script is parsed and at least one cast member is mapped." }) }) : /* @__PURE__ */ c.jsxs("div", { className: y0, children: [
    /* @__PURE__ */ c.jsxs("header", { className: SM, children: [
      /* @__PURE__ */ c.jsxs("div", { className: wM, children: [
        /* @__PURE__ */ c.jsx("label", { htmlFor: "audit-target-select", className: b0, children: "Target" }),
        /* @__PURE__ */ c.jsx(
          "select",
          {
            id: "audit-target-select",
            className: jM,
            value: u,
            onChange: (C) => f(C.target.value),
            children: a.map((C) => /* @__PURE__ */ c.jsxs("option", { value: Us(C), children: [
              C.kind === "voice_asset" ? "Voice asset" : "Utterance",
              " · ",
              C.label
            ] }, Us(C)))
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: EM, children: [
        /* @__PURE__ */ c.jsx(
          Ze,
          {
            variant: "ghost",
            size: "sm",
            onClick: L,
            disabled: m.length === 0 || p,
            children: "Export JSON"
          }
        ),
        s && /* @__PURE__ */ c.jsx(
          Ze,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => void _(),
            disabled: S || !T,
            children: S ? "Reverting…" : "Revert to identity"
          }
        )
      ] })
    ] }),
    v && /* @__PURE__ */ c.jsx("div", { className: kM, children: v }),
    p && !v && /* @__PURE__ */ c.jsx("div", { className: DM, "aria-live": "polite", children: "Loading edit history…" }),
    !p && !v && m.length === 0 && /* @__PURE__ */ c.jsxs("p", { className: x0, children: [
      "No edits recorded for this target yet.",
      /* @__PURE__ */ c.jsx("br", {}),
      /* @__PURE__ */ c.jsx("span", { className: AM, children: "Apply a chain in the editor to populate the history." })
    ] }),
    !p && !v && m.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: NM, children: m.map((C) => {
      const I = i && T && !!C.chain_snapshot_json && C.operation_count > 0;
      return /* @__PURE__ */ c.jsxs("li", { className: CM, children: [
        /* @__PURE__ */ c.jsx("span", { className: TM, children: OM(C.recorded_at) }),
        /* @__PURE__ */ c.jsx("span", { className: RM, children: C.operation_count === 0 ? "cleared" : `${C.operation_count} ops` }),
        /* @__PURE__ */ c.jsxs("span", { className: _M, title: C.digest_after, children: [
          C.digest_after.slice(0, 12),
          "…"
        ] }),
        /* @__PURE__ */ c.jsx("span", { className: b0, children: C.actor || "—" }),
        /* @__PURE__ */ c.jsx(
          "span",
          {
            className: MM,
            style: {
              background: `color-mix(in oklab, ${C.operation_count === 0 ? "var(--error)" : "var(--accent)"} 14%, transparent)`,
              color: C.operation_count === 0 ? "var(--error)" : "var(--accent)"
            },
            children: C.digest_before === "" || !C.digest_before ? "create" : C.operation_count === 0 ? "clear" : "update"
          }
        ),
        I && /* @__PURE__ */ c.jsx(
          Ze,
          {
            variant: "ghost",
            size: "xs",
            disabled: S || N !== null,
            onClick: async () => {
              if (!(!T || !C.chain_snapshot_json) && !(N !== null || S) && window.confirm(
                `Replay this ${C.operation_count}-op chain on "${T.label}"? A new audit entry will be written.`
              )) {
                R(C.entry_id);
                try {
                  await i(T, C.chain_snapshot_json, C);
                  const Y = await yc(
                    t,
                    T.kind,
                    T.id,
                    50
                  );
                  y(Y.entries);
                } catch (Y) {
                  w(Y instanceof Error ? Y.message : "revert failed");
                } finally {
                  R(null);
                }
              }
            },
            children: N === C.entry_id ? "Reverting…" : "Revert →"
          }
        )
      ] }, C.entry_id);
    }) })
  ] });
}
function Us(t) {
  return t ? `${t.kind}:${t.id}` : "";
}
function OM(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var LM = "_1uzgubz0", $M = "_1uzgubz1", UM = "_1uzgubz2", BM = "_1uzgubz3", IM = "_1uzgubz4", VM = "_1uzgubz5", qM = "_1uzgubz6", HM = "_1uzgubz7", S0 = "_1uzgubz8", FM = "_1uzgubz9", M1 = "_1uzgubza", A1 = "_1uzgubzb", PM = "_1uzgubzc", GM = "_1uzgubzd", Xo = "_1uzgubze", Qo = "_1uzgubzf", YM = "_1uzgubzg", KM = "_1uzgubzh", w0 = "_1uzgubzi", j0 = "_1uzgubzj", E0 = "_1uzgubzk", N0 = "_1uzgubzl", C0 = "_1uzgubzm", XM = "_1uzgubzn", QM = "_1uzgubzo", ZM = "_1uzgubzp", JM = "_1uzgubzq";
function WM({
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
  onRename: w
}) {
  const [S, j] = g.useState(!1), N = i ? o.find((_) => _.voiceAssetId === i.speakerVoiceAssetId) : null, R = i?.defaultVectorPresetId ? u.find((_) => _.presetId === i.defaultVectorPresetId) ?? null : null, T = (t[0] ?? "?").toUpperCase(), L = i !== null;
  return /* @__PURE__ */ c.jsxs("div", { className: `${LM}${f ? ` ${$M}` : ""}`, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: UM,
        onClick: m,
        "aria-expanded": f,
        children: [
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: BM,
              style: {
                background: `color-mix(in oklab, ${a} 22%, transparent)`,
                color: a
              },
              children: T
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: IM, children: [
            /* @__PURE__ */ c.jsx("span", { className: VM, style: { color: a }, children: t }),
            /* @__PURE__ */ c.jsxs("span", { className: qM, children: [
              s,
              " lines"
            ] })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: HM, children: [
            N ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              /* @__PURE__ */ c.jsx("span", { className: S0, children: N.displayName }),
              N.durationMs != null && /* @__PURE__ */ c.jsxs("span", { children: [
                T0(N.durationMs),
                " ·",
                " ",
                N.sampleRate ? `${N.sampleRate} Hz` : "—"
              ] })
            ] }) : R ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              /* @__PURE__ */ c.jsx("span", { className: S0, children: R.presetName }),
              /* @__PURE__ */ c.jsx("span", { children: "preset" })
            ] }) : /* @__PURE__ */ c.jsx("span", { children: "no voice assigned" }),
            i?.voiceAssetChainDigest && /* @__PURE__ */ c.jsxs("span", { className: PM, children: [
              "chain · ",
              i.voiceAssetChainDigest.slice(0, 8)
            ] })
          ] }),
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: `${FM} ${L ? M1 : A1}`,
              children: L ? "Mapped" : "Unmapped"
            }
          )
        ]
      }
    ),
    f && /* @__PURE__ */ c.jsxs("div", { className: GM, children: [
      L && s === 0 && w && /* @__PURE__ */ c.jsxs("div", { className: Xo, children: [
        /* @__PURE__ */ c.jsx("span", { className: Qo, children: "Character name" }),
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
            onKeyDown: (_) => {
              _.key === "Enter" && (_.preventDefault(), _.currentTarget.blur());
            },
            onBlur: (_) => {
              const C = _.target.value.trim();
              C && C !== t && w(C);
            }
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: Xo, children: [
        /* @__PURE__ */ c.jsx("span", { className: Qo, children: "Drop new audio" }),
        /* @__PURE__ */ c.jsxs(
          "label",
          {
            className: `${YM}${S ? ` ${KM}` : ""}`,
            onDragEnter: (_) => {
              _.preventDefault(), j(!0);
            },
            onDragOver: (_) => _.preventDefault(),
            onDragLeave: () => j(!1),
            onDrop: (_) => {
              _.preventDefault(), j(!1);
              const C = _.dataTransfer.files?.[0];
              C && b && b(C);
            },
            children: [
              /* @__PURE__ */ c.jsx("span", { children: "Drop a WAV / MP3 / FLAC here, or click to browse" }),
              /* @__PURE__ */ c.jsx(
                "input",
                {
                  type: "file",
                  accept: "audio/*",
                  style: { display: "none" },
                  onChange: (_) => {
                    const C = _.target.files?.[0];
                    C && b && b(C);
                  }
                }
              )
            ]
          }
        )
      ] }),
      o.length > 0 && /* @__PURE__ */ c.jsxs("div", { className: Xo, children: [
        /* @__PURE__ */ c.jsx("span", { className: Qo, children: "Reference library" }),
        /* @__PURE__ */ c.jsx("div", { className: w0, children: o.map((_) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: `${j0}${i?.speakerVoiceAssetId === _.voiceAssetId ? ` ${E0}` : ""}`,
            onClick: () => y(_.voiceAssetId),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: N0, children: _.displayName }),
              /* @__PURE__ */ c.jsxs("span", { className: C0, children: [
                _.durationMs != null ? T0(_.durationMs) : "—",
                " ",
                "·",
                " ",
                _.sampleRate ? `${_.sampleRate} Hz` : "—"
              ] })
            ]
          },
          _.voiceAssetId
        )) })
      ] }),
      u.length > 0 && p && /* @__PURE__ */ c.jsxs("div", { className: Xo, children: [
        /* @__PURE__ */ c.jsx("span", { className: Qo, children: "Preset voices" }),
        /* @__PURE__ */ c.jsx("div", { className: w0, children: u.map((_) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: `${j0}${i?.defaultVectorPresetId === _.presetId ? ` ${E0}` : ""}`,
            onClick: () => p(_.presetId),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: N0, children: _.presetName }),
              /* @__PURE__ */ c.jsx("span", { className: C0, children: "preset · vector" })
            ]
          },
          _.presetId
        )) })
      ] }),
      L && v && /* @__PURE__ */ c.jsx(Ze, { variant: "ghost", size: "sm", onClick: v, children: "Clear mapping →" })
    ] })
  ] });
}
function T0(t) {
  if (!Number.isFinite(t) || t < 0) return "0:00";
  const a = Math.round(t / 1e3), s = Math.floor(a / 60), i = a % 60;
  return `${s}:${i.toString().padStart(2, "0")}`;
}
function e2({
  unmappedCount: t,
  totalCount: a,
  children: s,
  emptyHint: i
}) {
  if (a === 0)
    return /* @__PURE__ */ c.jsx("p", { className: JM, children: i ?? "Add at least one tagged dialogue line to populate the cast." });
  const o = t === 0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx("header", { className: XM, children: /* @__PURE__ */ c.jsx(
      "span",
      {
        className: `${QM} ${o ? M1 : A1}`,
        children: o ? `All ${a} mapped` : `${t} of ${a} unmapped`
      }
    ) }),
    /* @__PURE__ */ c.jsx("ul", { className: ZM, children: s })
  ] });
}
async function vl() {
  return Rt("/runtime/health");
}
async function t2(t, a) {
  const s = {};
  t != null && (s.numWorkers = t), a != null && (s.warmup = a), await Rt("/runtime/start", {
    method: "POST",
    ...Object.keys(s).length > 0 ? { body: JSON.stringify(s) } : {}
  });
}
async function n2() {
  return Rt("/runtime/stop", { method: "POST" });
}
function k1(t) {
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
//! Shared between the recipe header's worker selector and the host-action
//! bridge, which performs the actual `startRuntime`. The host re-clamps to
//! `[1, EMOTIONTTS_MAX_WORKERS]` regardless of what the UI sends, so this is
//! only a preference, never a trust boundary.
let D1 = 1;
function a2() {
  return D1;
}
function R0(t) {
  D1 = Number.isFinite(t) ? Math.max(1, Math.floor(t)) : 1;
}
//! Whether the next runtime start should warm (preload models on) all active
//! workers. Default on; the header's "Preload models on start" toggle and the
//! host-action bridge share this. The host treats it as a preference only.
let z1 = !0;
function O1() {
  return z1;
}
function r2(t) {
  z1 = t;
}
var s2 = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function kn({
  severity: t,
  children: a,
  role: s,
  ariaLive: i,
  className: o,
  style: u
}) {
  const f = [s2[t], o].filter(Boolean).join(" "), m = s ?? (t === "error" ? "alert" : "status"), y = i ?? (t === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ c.jsx("div", { className: f, role: m, "aria-live": y, style: u, children: a });
}
var L1 = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, $1 = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, i2 = "_13bb4njb";
function jr({
  tone: t,
  size: a = "sm",
  pulse: s = !1,
  children: i,
  className: o,
  style: u,
  title: f
}) {
  const m = s && t !== "faint", y = [L1[a], $1[t], m ? i2 : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("span", { className: y, style: u, title: f, children: i });
}
const l2 = 4e3;
function o2({ deployment: t }) {
  const [a, s] = g.useState(null), [i, o] = g.useState(null), [u, f] = g.useState(1), m = g.useState({ done: !1 })[0], [y, p] = g.useState(O1());
  g.useEffect(() => {
    let T = !1;
    const L = async () => {
      try {
        const C = await vl();
        T || (s(C), o(null));
      } catch (C) {
        T || o(g2(C));
      }
    };
    L();
    const _ = setInterval(L, l2);
    return () => {
      T = !0, clearInterval(_);
    };
  }, []), g.useEffect(() => {
    const T = a?.workersActive;
    T != null && !m.done && (m.done = !0, f(T), R0(T));
  }, [a?.workersActive, m]);
  const b = a?.badge ?? "not_installed", v = i?.includes("model_missing") ?? !1, w = a?.workersCeiling ?? 1, S = a?.workersActive ?? 1, j = b === "ready" || b === "running" || b === "starting", N = a?.workersWarming ?? 0, R = a?.workersWarm ?? 0;
  return /* @__PURE__ */ c.jsxs("output", { className: d_, "aria-live": "polite", children: [
    /* @__PURE__ */ c.jsx("span", { className: yr, children: "Runtime" }),
    /* @__PURE__ */ c.jsx("span", { children: t.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ c.jsx("span", { className: yr, children: "Badge" }),
    /* @__PURE__ */ c.jsx(jr, { tone: m2(b), pulse: b === "starting" || b === "installing", children: k1(b) }),
    N > 0 && /* @__PURE__ */ c.jsxs("span", { style: h2, "aria-live": "polite", children: [
      "Warming ",
      R,
      "/",
      S,
      "…"
    ] }),
    a && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("span", { className: yr, children: "Uptime" }),
      /* @__PURE__ */ c.jsx("span", { children: p2(a.uptimeSeconds) }),
      /* @__PURE__ */ c.jsx("span", { className: yr, children: "VRAM" }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        a.vramUsedMb,
        " / ",
        a.vramTotalMb,
        " MB"
      ] })
    ] }),
    w > 1 && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("span", { className: yr, children: "Workers" }),
      /* @__PURE__ */ c.jsxs("span", { style: c2, children: [
        /* @__PURE__ */ c.jsx(
          "select",
          {
            value: u,
            "aria-label": "Concurrent workers for the next runtime start",
            onChange: (T) => {
              const L = Number(T.target.value);
              f(L), R0(L);
            },
            style: u2,
            children: Array.from({ length: w }, (T, L) => L + 1).map((T) => /* @__PURE__ */ c.jsx("option", { value: T, children: T }, T))
          }
        ),
        /* @__PURE__ */ c.jsx("span", { style: _0, children: j && u !== S ? `restart to apply · active ${S}` : `~${u}× model VRAM` })
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: yr, children: "Preload" }),
      /* @__PURE__ */ c.jsxs("label", { style: d2, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: y,
            "aria-label": "Preload models on start",
            onChange: (T) => {
              const L = T.target.checked;
              p(L), r2(L);
            },
            style: f2
          }
        ),
        /* @__PURE__ */ c.jsx("span", { style: _0, children: "Preload models on start" })
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
const c2 = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8
}, u2 = {
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
}, _0 = {
  fontSize: 11,
  color: "var(--on-surface-variant, #c4c7c5)"
}, d2 = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  cursor: "pointer"
}, f2 = {
  width: 14,
  height: 14,
  margin: 0,
  cursor: "pointer",
  accentColor: "var(--accent, #7aa2f7)"
}, h2 = {
  fontSize: 11,
  color: "var(--on-surface-variant, #c4c7c5)",
  fontFamily: "var(--font-mono)"
};
function m2(t) {
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
function p2(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${t % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function g2(t) {
  return t instanceof ni || t instanceof Error ? t.message : "unknown error";
}
const Tc = {
  flat: { low: 0, mid: 0, high: 0 },
  warm: { low: 3, mid: 0, high: -2 },
  bright: { low: -1, mid: 0, high: 4 },
  voice: { low: -2, mid: 3, high: 2 },
  telephone: { low: -8, mid: 6, high: -8 }
}, Yc = {
  volumeDb: 0,
  eq3: { low: 0, mid: 0, high: 0, preset: "flat" },
  speed: { mode: "audio", value: 1 },
  pitchSt: 0,
  normalize: { mode: "off", targetDbOrLufs: -16 },
  fade: { inS: 0, outS: 0, inCurve: "equal_power", outCurve: "equal_power" },
  silence: { enabled: !1, thresholdDb: -45 }
}, Va = 1e-3;
function v2(t, a, s) {
  for (const i of Object.keys(Tc)) {
    const o = Tc[i];
    if (Math.abs(o.low - t) < Va && Math.abs(o.mid - a) < Va && Math.abs(o.high - s) < Va)
      return i;
  }
  return "custom";
}
function y2(t) {
  let a = x2();
  for (const s of t.ops)
    a = b2(a, s);
  return a;
}
function b2(t, a) {
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
          preset: v2(a.low_db, a.mid_db, a.high_db)
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
function x2() {
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
function Cr(t, a) {
  return t.ops.filter((s) => s.mode !== a);
}
function Tr(t, a) {
  return [...t, a];
}
function S2(t, a) {
  const s = Cr(t, "gain");
  if (Math.abs(a) < Va) return { ...t, ops: s };
  const i = { id: Dn(), mode: "gain", gain_db: a };
  return { ...t, ops: Tr(s, i) };
}
function w2(t, a, s, i) {
  const o = Cr(t, "eq3");
  if (Math.abs(a) < Va && Math.abs(s) < Va && Math.abs(i) < Va)
    return { ...t, ops: o };
  const u = {
    id: Dn(),
    mode: "eq3",
    low_db: a,
    mid_db: s,
    high_db: i
  };
  return { ...t, ops: Tr(o, u) };
}
function j2(t, a) {
  const s = Cr(t, "speed");
  if (Math.abs(a - 1) < Va) return { ...t, ops: s };
  const i = { id: Dn(), mode: "speed", factor: a };
  return { ...t, ops: Tr(s, i) };
}
function E2(t, a) {
  const s = Cr(t, "pitch_shift");
  if (Math.abs(a) < Va) return { ...t, ops: s };
  const i = {
    id: Dn(),
    mode: "pitch_shift",
    semitones: a
  };
  return { ...t, ops: Tr(s, i) };
}
function N2(t, a, s) {
  const i = Cr(t, "normalize");
  if (a === "off") return { ...t, ops: i };
  const o = {
    id: Dn(),
    mode: "normalize",
    target_lufs: s
  };
  return { ...t, ops: Tr(i, o) };
}
function C2(t, a) {
  const s = Cr(t, "fade_in");
  if (a <= 0) return { ...t, ops: s };
  const i = {
    id: Dn(),
    mode: "fade_in",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Tr(s, i) };
}
function T2(t, a) {
  const s = Cr(t, "fade_out");
  if (a <= 0) return { ...t, ops: s };
  const i = {
    id: Dn(),
    mode: "fade_out",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Tr(s, i) };
}
function R2(t, a, s) {
  const i = Cr(t, "silence_strip");
  if (!a) return { ...t, ops: i };
  const o = {
    id: Dn(),
    mode: "silence_strip",
    threshold_db: s
  };
  return { ...t, ops: Tr(i, o) };
}
const U1 = /* @__PURE__ */ new Set([
  "gain",
  "eq3",
  "speed",
  "pitch_shift",
  "normalize",
  "fade_in",
  "fade_out",
  "silence_strip"
]);
function B1(t, a) {
  const s = {
    ...t,
    ops: t.ops.filter((u) => !U1.has(u.mode))
  };
  let o = S2({ version: 1, ops: [] }, a.volumeDb);
  return o = w2(
    o,
    a.eq3.low,
    a.eq3.mid,
    a.eq3.high
  ), a.speed.mode === "audio" && (o = j2(o, a.speed.value)), o = E2(o, a.pitchSt), o = N2(
    o,
    a.normalize.mode === "off" ? "off" : "loudness",
    a.normalize.targetDbOrLufs
  ), o = C2(o, a.fade.inS), o = T2(o, a.fade.outS), o = R2(
    o,
    a.silence.enabled,
    a.silence.thresholdDb
  ), { ...s, ops: [...s.ops, ...o.ops] };
}
function I1(t) {
  const a = {
    ...t,
    ops: t.ops.filter((s) => U1.has(s.mode))
  };
  return y2(a);
}
var _2 = "_1rsa80i0", M2 = "_1rsa80i1", A2 = "_1rsa80i2", k2 = "_1rsa80i3", D2 = "_1rsa80i4", z2 = "_1rsa80i5", O2 = "_1rsa80i6", L2 = "_1rsa80i7", $2 = "_1rsa80i8", U2 = "_1rsa80i9";
const V1 = ["flat", "warm", "bright", "voice", "telephone"], el = -12, Zo = 12, B2 = 0.5;
function I2(t) {
  const { low: a, mid: s, high: i, preset: o, onChange: u, disabled: f } = t, m = (p) => {
    const b = Tc[p];
    u(b.low, b.mid, b.high, p);
  }, y = (p, b) => {
    const v = { low: a, mid: s, high: i, [p]: b }, w = q2(v.low, v.mid, v.high);
    u(v.low, v.mid, v.high, w);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: _2, children: [
    /* @__PURE__ */ c.jsxs("div", { className: M2, role: "group", "aria-label": "EQ presets", children: [
      V1.map((p) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: A2,
          "data-active": o === p,
          onClick: () => m(p),
          disabled: f,
          children: p
        },
        p
      )),
      o === "custom" ? /* @__PURE__ */ c.jsx("span", { className: k2, children: "custom" }) : null
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: D2, children: [
      /* @__PURE__ */ c.jsx(
        Sf,
        {
          label: "Low",
          value: a,
          onChange: (p) => y("low", p),
          disabled: f
        }
      ),
      /* @__PURE__ */ c.jsx(
        Sf,
        {
          label: "Mid",
          value: s,
          onChange: (p) => y("mid", p),
          disabled: f
        }
      ),
      /* @__PURE__ */ c.jsx(
        Sf,
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
function Sf({ label: t, value: a, onChange: s, disabled: i }) {
  const o = (a - el) / (Zo - el) * 100, u = g.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: z2, children: [
    /* @__PURE__ */ c.jsx("label", { htmlFor: u, className: O2, children: t }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: u,
        type: "range",
        min: el,
        max: Zo,
        step: B2,
        value: a,
        disabled: i,
        className: $2,
        style: { "--fill": `${o}%` },
        onChange: (f) => s(Number(f.target.value)),
        "aria-valuemin": el,
        "aria-valuemax": Zo,
        "aria-valuenow": a
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: L2, children: V2(a) }),
    /* @__PURE__ */ c.jsxs("span", { className: U2, "aria-hidden": "true", children: [
      /* @__PURE__ */ c.jsx("span", { children: el }),
      /* @__PURE__ */ c.jsx("span", { children: "0" }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        "+",
        Zo
      ] })
    ] })
  ] });
}
function V2(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
const wf = 1e-3;
function q2(t, a, s) {
  for (const i of V1) {
    const o = Tc[i];
    if (Math.abs(o.low - t) < wf && Math.abs(o.mid - a) < wf && Math.abs(o.high - s) < wf)
      return i;
  }
  return "custom";
}
var H2 = "_85bhwb0", F2 = "_85bhwb1", M0 = "_85bhwb2", P2 = "_85bhwb3", G2 = "_85bhwb4", Y2 = "_85bhwb5", K2 = "_85bhwb6", X2 = "_85bhwb7";
const Jo = 0.5, jf = 2, Q2 = 0.05;
function Z2(t) {
  const { mode: a, value: s, supportsSynthSpeed: i, onChange: o, onReRenderAtSynthTime: u, disabled: f } = t, m = (s - Jo) / (jf - Jo) * 100, y = g.useId(), p = (v) => o(v, s), b = (v) => o(a, v);
  return /* @__PURE__ */ c.jsxs("div", { className: H2, children: [
    i ? /* @__PURE__ */ c.jsxs("div", { className: F2, role: "group", "aria-label": "Speed mode", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: M0,
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
          className: M0,
          "data-active": a === "synth",
          onClick: () => p("synth"),
          disabled: f,
          children: "Synth"
        }
      )
    ] }) : null,
    /* @__PURE__ */ c.jsxs("div", { className: P2, children: [
      /* @__PURE__ */ c.jsx(
        "input",
        {
          id: y,
          type: "range",
          min: Jo,
          max: jf,
          step: Q2,
          value: s,
          disabled: f,
          className: G2,
          style: { "--fill": `${m}%` },
          onChange: (v) => b(Number(v.target.value)),
          "aria-valuemin": Jo,
          "aria-valuemax": jf,
          "aria-valuenow": s,
          "aria-label": "Speed factor"
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: Y2, children: `${s.toFixed(2)}×` })
    ] }),
    a === "synth" && i ? /* @__PURE__ */ c.jsxs("div", { className: K2, children: [
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
      /* @__PURE__ */ c.jsx("span", { className: X2, children: "Synth-time speed re-runs the worker for new utterances." })
    ] }) : null
  ] });
}
var J2 = "kgszk50", W2 = "kgszk51", A0 = "kgszk52", eA = "kgszk53", tA = "kgszk54", q1 = "kgszk55", nA = "kgszk56", aA = "kgszk58", Jh = "kgszk59", H1 = "kgszk5a", Wh = "kgszk5b", rA = "kgszk5c", sA = "kgszk5d", iA = "kgszk5e", k0 = "kgszk5f", D0 = "kgszk5g", z0 = "kgszk5h", lA = "kgszk5i", oA = "kgszk5j", cA = "kgszk5l", yl = "kgszk5m", bl = "kgszk5n";
const uA = -24, dA = 24, fA = 0.5, hA = -12, mA = 12, pA = 0.5, gA = -30, vA = -6, yA = -12, bA = 0, Wo = -60, Ef = -20;
function em(t) {
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
  } = t, b = (S) => {
    s({ ...a, ...S });
  }, v = jA(a), w = (S) => {
    const j = S.target;
    j && (j.tagName === "INPUT" || j.tagName === "BUTTON" || j.closest("input, button")) && u?.();
  };
  return /* @__PURE__ */ c.jsxs("div", { className: J2, onPointerDownCapture: w, children: [
    /* @__PURE__ */ c.jsxs("div", { className: W2, children: [
      v.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: eA, children: "No active edits" }) : /* @__PURE__ */ c.jsxs("span", { className: A0, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "Active:" }),
        /* @__PURE__ */ c.jsx("span", { children: v.join(" · ") })
      ] }),
      f ? /* @__PURE__ */ c.jsxs("span", { className: A0, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: tA, "aria-hidden": "true" }),
        "Re-rendering"
      ] }) : null
    ] }),
    /* @__PURE__ */ c.jsx(
      O0,
      {
        label: "Volume",
        sub: "Pre-mix gain in dB",
        min: uA,
        max: dA,
        step: fA,
        format: EA,
        value: a.volumeDb,
        onChange: (S) => b({ volumeDb: S }),
        disabled: m
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: yl, children: [
      /* @__PURE__ */ c.jsx("span", { className: bl, children: "3-band EQ" }),
      /* @__PURE__ */ c.jsx(
        I2,
        {
          low: a.eq3.low,
          mid: a.eq3.mid,
          high: a.eq3.high,
          preset: a.eq3.preset,
          disabled: m,
          onChange: (S, j, N, R) => b({ eq3: { low: S, mid: j, high: N, preset: R } })
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: yl, children: [
      /* @__PURE__ */ c.jsx("span", { className: bl, children: "Speed" }),
      /* @__PURE__ */ c.jsx(
        Z2,
        {
          mode: a.speed.mode,
          value: a.speed.value,
          supportsSynthSpeed: i,
          ...o ? { onReRenderAtSynthTime: o } : {},
          disabled: m,
          onChange: (S, j) => b({ speed: { mode: S, value: j } })
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx(
      O0,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: hA,
        max: mA,
        step: pA,
        format: NA,
        value: a.pitchSt,
        onChange: (S) => b({ pitchSt: S }),
        disabled: m
      }
    ),
    /* @__PURE__ */ c.jsx(
      xA,
      {
        normalize: a.normalize,
        disabled: m,
        onChange: (S) => b({ normalize: S })
      }
    ),
    /* @__PURE__ */ c.jsx(
      SA,
      {
        inS: a.fade.inS,
        outS: a.fade.outS,
        disabled: m,
        onChange: (S, j) => b({ fade: { ...a.fade, inS: S, outS: j } })
      }
    ),
    /* @__PURE__ */ c.jsx(
      wA,
      {
        enabled: a.silence.enabled,
        thresholdDb: a.silence.thresholdDb,
        disabled: m,
        onChange: (S, j) => b({ silence: { enabled: S, thresholdDb: j } })
      }
    ),
    y ? /* @__PURE__ */ c.jsxs("div", { className: cA, children: [
      /* @__PURE__ */ c.jsx(
        Ze,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => s(Yc),
          disabled: m,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ c.jsx(Ze, { variant: "primary", size: "md", onClick: y, disabled: m, children: p })
    ] }) : null
  ] });
}
function O0(t) {
  const { label: a, sub: s, min: i, max: o, step: u, format: f, value: m, onChange: y, disabled: p } = t, b = (m - i) / (o - i) * 100, v = g.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: q1, children: [
    /* @__PURE__ */ c.jsxs("div", { className: nA, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: v, className: aA, children: a }),
      /* @__PURE__ */ c.jsx("span", { className: H1, children: s })
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
        className: Wh,
        style: { "--fill": `${b}%` },
        onChange: (w) => y(Number(w.target.value)),
        "aria-valuemin": i,
        "aria-valuemax": o,
        "aria-valuenow": m
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: Jh, children: f(m) })
  ] });
}
function xA({ normalize: t, onChange: a, disabled: s }) {
  const o = t.mode === "loudness" ? { min: gA, max: vA, step: 0.5, suffix: "LUFS" } : { min: yA, max: bA, step: 0.5, suffix: "dB" }, u = CA(t.targetDbOrLufs, o.min, o.max), f = (u - o.min) / (o.max - o.min) * 100, m = (y) => {
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
  return /* @__PURE__ */ c.jsxs("div", { className: yl, children: [
    /* @__PURE__ */ c.jsx("span", { className: bl, children: "Normalize" }),
    /* @__PURE__ */ c.jsx("div", { className: rA, role: "group", "aria-label": "Normalize mode", children: ["off", "peak", "loudness"].map((y) => {
      const p = y === "peak";
      return /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: sA,
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
    t.mode !== "off" ? /* @__PURE__ */ c.jsxs("div", { className: q1, children: [
      /* @__PURE__ */ c.jsx("span", { className: H1, children: "Target" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: o.min,
          max: o.max,
          step: o.step,
          value: u,
          disabled: s,
          className: Wh,
          style: { "--fill": `${f}%` },
          onChange: (y) => a({ mode: t.mode, targetDbOrLufs: Number(y.target.value) }),
          "aria-valuemin": o.min,
          "aria-valuemax": o.max,
          "aria-valuenow": u,
          "aria-label": `Normalize target ${o.suffix}`
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: Jh, children: [
        u.toFixed(1),
        " ",
        o.suffix
      ] })
    ] }) : null
  ] });
}
function SA({ inS: t, outS: a, onChange: s, disabled: i }) {
  const o = g.useId(), u = g.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: yl, children: [
    /* @__PURE__ */ c.jsx("span", { className: bl, children: "Fade" }),
    /* @__PURE__ */ c.jsxs("div", { className: iA, children: [
      /* @__PURE__ */ c.jsxs("div", { className: k0, children: [
        /* @__PURE__ */ c.jsx("label", { className: D0, htmlFor: o, children: "Fade in (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: o,
            type: "number",
            min: 0,
            step: 0.05,
            value: t,
            disabled: i,
            className: z0,
            onChange: (f) => s(Math.max(0, Number(f.target.value)), a)
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: k0, children: [
        /* @__PURE__ */ c.jsx("label", { className: D0, htmlFor: u, children: "Fade out (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: u,
            type: "number",
            min: 0,
            step: 0.05,
            value: a,
            disabled: i,
            className: z0,
            onChange: (f) => s(t, Math.max(0, Number(f.target.value)))
          }
        )
      ] })
    ] })
  ] });
}
function wA({ enabled: t, thresholdDb: a, onChange: s, disabled: i }) {
  const o = (a - Wo) / (Ef - Wo) * 100;
  return /* @__PURE__ */ c.jsxs("div", { className: yl, children: [
    /* @__PURE__ */ c.jsx("span", { className: bl, children: "Silence trim" }),
    /* @__PURE__ */ c.jsxs("div", { className: lA, children: [
      /* @__PURE__ */ c.jsxs("label", { className: oA, children: [
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
          min: Wo,
          max: Ef,
          step: 1,
          value: a,
          disabled: i || !t,
          className: Wh,
          style: { "--fill": `${o}%`, flex: 1 },
          onChange: (u) => s(t, Number(u.target.value)),
          "aria-valuemin": Wo,
          "aria-valuemax": Ef,
          "aria-valuenow": a,
          "aria-label": "Silence threshold dB"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: Jh, children: [
        a.toFixed(0),
        " dB"
      ] })
    ] })
  ] });
}
const Bs = 1e-3;
function jA(t) {
  const a = [];
  return Math.abs(t.volumeDb) >= Bs && a.push("gain"), (Math.abs(t.eq3.low) >= Bs || Math.abs(t.eq3.mid) >= Bs || Math.abs(t.eq3.high) >= Bs) && a.push("eq3"), t.speed.mode === "audio" && Math.abs(t.speed.value - 1) >= Bs && a.push("speed"), Math.abs(t.pitchSt) >= Bs && a.push("pitch"), t.normalize.mode !== "off" && a.push("normalize"), t.fade.inS > 0 && a.push("fade-in"), t.fade.outS > 0 && a.push("fade-out"), t.silence.enabled && a.push("silence"), a;
}
function EA(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
function NA(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} st`;
}
function CA(t, a, s) {
  return Number.isFinite(t) ? Math.max(a, Math.min(s, t)) : a;
}
var TA = "skdk4g0", RA = "skdk4g1", L0 = "skdk4g2", _A = "skdk4g3", MA = "skdk4g4", AA = "skdk4g5", kA = "skdk4g6", DA = "skdk4g7", zA = "skdk4g8", OA = "skdk4g9", LA = "skdk4ga", $A = "skdk4gb", UA = "skdk4gc", BA = "skdk4gd", $0 = "skdk4ge", U0 = "skdk4gf", IA = "skdk4gg", B0 = "skdk4gh", I0 = "skdk4gi", VA = "skdk4gj", qA = "skdk4gk", HA = "skdk4gl", V0 = "skdk4gm", FA = "skdk4gn", PA = "skdk4gp", GA = "skdk4gq", YA = "skdk4gr", KA = "skdk4gs", XA = "skdk4gt", QA = "skdk4gu", ZA = "skdk4gv", q0 = "skdk4gw", JA = "skdk4gx", WA = "skdk4gy", e3 = "skdk4gz", t3 = "skdk4g10", n3 = "cgsfgh1", a3 = "cgsfgh2", r3 = "cgsfgh3", s3 = "cgsfgh4", i3 = "cgsfgh5", l3 = "cgsfgh6", o3 = "cgsfgh7", c3 = "cgsfgh8", u3 = "cgsfgh9", d3 = "cgsfgha", f3 = "cgsfghb", h3 = "cgsfghc", m3 = "cgsfghd", p3 = "cgsfghe", g3 = "cgsfghm", v3 = "cgsfghn", y3 = "cgsfgho", b3 = "cgsfghp";
const rn = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], xl = {
  happy: "Happy",
  angry: "Angry",
  sad: "Sad",
  afraid: "Afraid",
  disgusted: "Disgusted",
  melancholic: "Melancholic",
  surprised: "Surprised",
  calm: "Calm"
}, Js = {
  happy: 0,
  angry: 0,
  sad: 0,
  afraid: 0,
  disgusted: 0,
  melancholic: 0,
  surprised: 0,
  calm: 0
}, F1 = 0.05;
function x3(t) {
  let a = null, s = -1 / 0;
  for (const i of rn) {
    const o = t[i];
    o > s && (s = o, a = i);
  }
  return !a || s <= F1 ? null : a;
}
function P1(t, a = 3) {
  return rn.map((s) => ({ key: s, label: xl[s], value: t[s] })).filter((s) => s.value > F1).sort((s, i) => i.value - s.value).slice(0, a);
}
function S3(t) {
  let a = 0;
  for (const s of rn) a += t[s] * t[s];
  return Math.sqrt(a);
}
function H0(t) {
  const a = P1(t, 2), s = a[0];
  if (!s) return "";
  const i = a[1];
  return !i || s.value - i.value > 0.25 ? Nf(s.label) : `${Nf(s.label)} + ${i.label.toLowerCase()}`;
}
function Nf(t) {
  if (!t) return t;
  const a = t[0];
  return a ? a.toUpperCase() + t.slice(1) : t;
}
function es(t) {
  const a = { ...Js };
  for (const s of rn) {
    const i = t[s];
    a[s] = Number.isFinite(i) ? Math.max(0, Math.min(1, i)) : 0;
  }
  return a;
}
const F0 = 0.05, P0 = 0.2, w3 = 22, j3 = 320, Cf = 0.78;
function Tf(t, a, s, i) {
  const o = Math.cos(s), u = Math.sin(s), f = t * o + a * u;
  return Math.max(0, Math.min(1, f / i));
}
function E3(t) {
  const { vec: a, onChange: s, size: i, reduceMotion: o = !1 } = t, [u, f] = g.useState(a), [m, y] = g.useState(null), [p, b] = g.useState(null), v = g.useRef(null), w = g.useRef(a), S = g.useRef(o), j = g.useRef(null), N = g.useRef(0);
  S.current = o, g.useEffect(() => {
    f(a), w.current = a;
  }, [a]);
  const R = g.useCallback(
    (V) => {
      const D = es(V);
      f(D), w.current = D, s(D);
    },
    [s]
  ), T = g.useCallback((V) => {
    const D = es(V);
    f(D), w.current = D;
  }, []), L = g.useCallback(
    (V) => {
      const D = v.current;
      if (!D || S.current) return;
      const P = V.clientX - D.centerX, J = V.clientY - D.centerY, Z = i / 2 * Cf, G = Tf(P, J, D.angle, Z), re = { ...w.current, [D.axis]: G };
      T(re);
    },
    [i, T]
  ), _ = g.useCallback(
    (V) => {
      const D = v.current;
      if (D) {
        if (window.removeEventListener("pointermove", L), window.removeEventListener("pointerup", _), window.removeEventListener("pointercancel", _), S.current) {
          const P = V.clientX - D.centerX, J = V.clientY - D.centerY, Z = i / 2 * Cf, G = Tf(P, J, D.angle, Z), re = { ...w.current, [D.axis]: G };
          v.current = null, R(re);
          return;
        }
        v.current = null, R(w.current);
      }
    },
    [R, L, i]
  );
  g.useEffect(() => () => {
    window.removeEventListener("pointermove", L), window.removeEventListener("pointerup", _), window.removeEventListener("pointercancel", _), v.current = null, j.current !== null && (window.clearTimeout(j.current), j.current = null);
  }, [L, _]);
  const C = g.useCallback((V, D) => {
    S.current || (N.current += 1, b({ x: V, y: D, key: N.current }), j.current !== null && window.clearTimeout(j.current), j.current = window.setTimeout(() => {
      b(null), j.current = null;
    }, j3));
  }, []), I = g.useCallback(
    (V, D, P, J, Z) => {
      const G = P.getBoundingClientRect(), re = G.left + G.width / 2, A = G.top + G.height / 2, U = rn.indexOf(V) / rn.length * Math.PI * 2 - Math.PI / 2;
      if (v.current = {
        axis: V,
        pointerId: D,
        centerX: re,
        centerY: A,
        angle: U
      }, y(V), J !== void 0 && Z !== void 0) {
        const se = J - re, de = Z - A, k = i / 2 * Cf, ee = Tf(se, de, U, k), te = { ...w.current, [V]: ee };
        S.current ? R(te) : T(te);
      }
      window.addEventListener("pointermove", L), window.addEventListener("pointerup", _), window.addEventListener("pointercancel", _);
    },
    [R, L, _, i, T]
  ), Y = g.useCallback(
    (V, D) => {
      D.preventDefault();
      const P = D.currentTarget, J = P.ownerSVGElement ?? P;
      I(V, D.pointerId, J);
    },
    [I]
  ), ie = g.useCallback(
    (V) => {
      const D = V.currentTarget, P = D instanceof SVGSVGElement ? D : D.ownerSVGElement ?? D, J = P.getBoundingClientRect(), Z = J.left + J.width / 2, G = J.top + J.height / 2, re = V.clientX - Z, A = V.clientY - G;
      if (Math.sqrt(re * re + A * A) < 8) return;
      let U = Math.atan2(A, re) * 180 / Math.PI;
      U = ((U + 90) % 360 + 360) % 360;
      let se = null, de = 999;
      for (let te = 0; te < rn.length; te++) {
        const K = rn[te];
        if (!K) continue;
        const B = te / rn.length * 360, W = Math.abs((B - U + 540) % 360 - 180);
        W < de && (de = W, se = K);
      }
      if (!se || de > w3) return;
      V.preventDefault();
      const k = (V.clientX - J.left) / J.width * i, ee = (V.clientY - J.top) / J.height * i;
      C(k, ee), I(se, V.pointerId, P, V.clientX, V.clientY);
    },
    [I, i, C]
  ), M = g.useCallback(
    (V, D) => {
      const P = w.current[V];
      let J = P;
      switch (D.key) {
        case "ArrowUp":
        case "ArrowRight":
          J = P + F0;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          J = P - F0;
          break;
        case "PageUp":
          J = P + P0;
          break;
        case "PageDown":
          J = P - P0;
          break;
        case "Home":
          J = 0;
          break;
        case "End":
          J = 1;
          break;
        default:
          return;
      }
      D.preventDefault(), y(V), R({ ...w.current, [V]: J });
    },
    [R]
  );
  return {
    liveVec: u,
    activeAxis: m,
    setActiveAxis: y,
    onPointerDown: Y,
    onKeyDown: M,
    onSurfacePointerDown: ie,
    surfacePing: p
  };
}
const N3 = [0.25, 0.5, 0.75, 1];
function C3({
  vec: t,
  onChange: a,
  size: s = 360,
  readOnly: i = !1,
  reduceMotion: o = !1
}) {
  const u = E3({ vec: t, onChange: a, size: s, reduceMotion: o }), f = s / 2, m = s / 2, y = s / 2 * 0.78, p = g.useMemo(() => T3(f, m, y), [f, m, y]), b = g.useMemo(() => rn.map((v, w) => {
    const S = bc(u.liveVec[v]), j = p[w];
    return j ? `${f + j.dx * S},${m + j.dy * S}` : "0,0";
  }).join(" "), [p, f, m, u.liveVec]);
  return /* @__PURE__ */ c.jsx("div", { className: n3, children: /* @__PURE__ */ c.jsx("div", { className: a3, style: { width: s, height: s }, children: /* @__PURE__ */ c.jsxs(
    "svg",
    {
      className: r3,
      viewBox: `0 0 ${s} ${s}`,
      role: "img",
      "aria-label": "8-axis emotion radar",
      onPointerDown: i ? void 0 : u.onSurfacePointerDown,
      style: i ? void 0 : { cursor: "crosshair", touchAction: "none" },
      children: [
        N3.map((v) => /* @__PURE__ */ c.jsx(
          "circle",
          {
            className: s3,
            cx: f,
            cy: m,
            r: y * v
          },
          v
        )),
        rn.map((v, w) => {
          const S = p[w];
          if (!S) return null;
          const j = f + S.dx * 1.18, N = m + S.dy * 1.18, R = u.activeAxis === v;
          return /* @__PURE__ */ c.jsxs("g", { children: [
            /* @__PURE__ */ c.jsx(
              "line",
              {
                className: i3,
                x1: f,
                y1: m,
                x2: f + S.dx,
                y2: m + S.dy
              }
            ),
            /* @__PURE__ */ c.jsx(
              "text",
              {
                className: `${m3}${R ? ` ${p3}` : ""}`,
                x: j,
                y: N,
                textAnchor: "middle",
                dominantBaseline: "middle",
                children: xl[v]
              }
            )
          ] }, v);
        }),
        rn.map((v, w) => {
          const S = bc(u.liveVec[v]);
          if (S <= 0.01) return null;
          const j = p[w];
          if (!j) return null;
          const N = u.activeAxis === v;
          return /* @__PURE__ */ c.jsx(
            "line",
            {
              className: `${o3}${N ? ` ${c3}` : ""}`,
              x1: f,
              y1: m,
              x2: f + j.dx * S,
              y2: m + j.dy * S
            },
            `petal-${v}`
          );
        }),
        /* @__PURE__ */ c.jsx("polygon", { className: l3, points: b }),
        u.surfacePing && /* @__PURE__ */ c.jsx(
          "circle",
          {
            className: h3,
            cx: u.surfacePing.x,
            cy: u.surfacePing.y,
            r: 10
          },
          u.surfacePing.key
        ),
        !i && rn.map((v, w) => {
          const S = bc(u.liveVec[v]), j = p[w];
          if (!j) return null;
          const N = f + j.dx * S, R = m + j.dy * S, T = u.activeAxis === v;
          return /* @__PURE__ */ c.jsxs("g", { children: [
            /* @__PURE__ */ c.jsx(
              "circle",
              {
                className: u3,
                cx: N,
                cy: R,
                r: 14,
                tabIndex: 0,
                role: "slider",
                "aria-label": `${xl[v]} axis`,
                "aria-valuemin": 0,
                "aria-valuemax": 1,
                "aria-valuenow": S,
                onPointerDown: (L) => u.onPointerDown(v, L),
                onKeyDown: (L) => u.onKeyDown(v, L),
                onFocus: () => u.setActiveAxis(v),
                onBlur: () => u.setActiveAxis(null)
              }
            ),
            /* @__PURE__ */ c.jsx(
              "circle",
              {
                className: `${d3}${T ? ` ${f3}` : ""}`,
                cx: N,
                cy: R,
                r: 6
              }
            )
          ] }, v);
        })
      ]
    }
  ) }) });
}
function T3(t, a, s) {
  return rn.map((i, o) => {
    const u = o / rn.length * Math.PI * 2 - Math.PI / 2;
    return {
      dx: Math.cos(u) * s,
      dy: Math.sin(u) * s
    };
  });
}
function bc(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
function R3({ vec: t, size: a = 36 }) {
  const s = a / 2, i = a / 2, o = a / 2 * 0.86, u = g.useMemo(() => rn.map((f, m) => {
    const y = bc(t[f]), p = m / rn.length * Math.PI * 2 - Math.PI / 2, b = s + Math.cos(p) * o * y, v = i + Math.sin(p) * o * y;
    return `${b},${v}`;
  }).join(" "), [s, i, o, t]);
  return /* @__PURE__ */ c.jsx("span", { className: g3, "aria-hidden": "true", children: /* @__PURE__ */ c.jsxs(
    "svg",
    {
      className: v3,
      width: a,
      height: a,
      viewBox: `0 0 ${a} ${a}`,
      children: [
        /* @__PURE__ */ c.jsx("circle", { className: y3, cx: s, cy: i, r: o }),
        /* @__PURE__ */ c.jsx("polygon", { className: b3, points: u })
      ]
    }
  ) });
}
var _3 = "_1jqr3aj0", M3 = "_1jqr3aj1", A3 = "_1jqr3aj2", k3 = "_1jqr3aj3", D3 = "_1jqr3aj4", z3 = "_1jqr3aj5", O3 = "_1jqr3aj6", L3 = "_1jqr3aj7";
const G0 = 0.05, Y0 = 0.2;
function $3({
  vec: t,
  onChange: a,
  readOnly: s = !1,
  reduceMotion: i = !1
}) {
  const [o, u] = g.useState(null), f = g.useRef(null), m = g.useRef(/* @__PURE__ */ new Map()), y = g.useCallback(
    (j, N) => {
      const R = Math.max(0, Math.min(1, N));
      a(es({ ...t, [j]: R }));
    },
    [a, t]
  ), p = g.useCallback((j, N) => {
    const R = m.current.get(j);
    return !R || R.width <= 0 ? 0 : (N - R.left) / R.width;
  }, []), b = g.useCallback(
    (j, N) => {
      if (s) return;
      N.preventDefault();
      const R = N.currentTarget.querySelector("[data-track]");
      R instanceof HTMLElement && m.current.set(j, R.getBoundingClientRect()), N.currentTarget.setPointerCapture(N.pointerId), f.current = j, u(j), y(j, p(j, N.clientX));
    },
    [s, y, p]
  ), v = g.useCallback(
    (j, N) => {
      s || i || f.current === j && y(j, p(j, N.clientX));
    },
    [s, i, y, p]
  ), w = g.useCallback(
    (j, N) => {
      if (f.current === j) {
        try {
          N.currentTarget.releasePointerCapture(N.pointerId);
        } catch {
        }
        f.current = null, m.current.delete(j);
      }
    },
    []
  ), S = g.useCallback(
    (j, N) => {
      if (s) return;
      const R = t[j] ?? 0;
      let T = R;
      switch (N.key) {
        case "ArrowRight":
        case "ArrowUp":
          T = R + G0;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          T = R - G0;
          break;
        case "PageUp":
          T = R + Y0;
          break;
        case "PageDown":
          T = R - Y0;
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
      N.preventDefault(), u(j), y(j, T);
    },
    [s, y, t]
  );
  return /* @__PURE__ */ c.jsx("div", { className: _3, role: "group", "aria-label": "Emotion axis sliders", children: rn.map((j) => {
    const N = U3(t[j] ?? 0), R = N > 0.05, T = o === j, L = xl[j];
    return /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: `${M3}${R ? ` ${A3}` : ""}${T ? ` ${k3}` : ""}`,
        role: "slider",
        "aria-label": `${L} intensity`,
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": Number(N.toFixed(2)),
        "aria-readonly": s,
        disabled: s,
        onPointerDown: (_) => b(j, _),
        onPointerMove: (_) => v(j, _),
        onPointerUp: (_) => w(j, _),
        onPointerCancel: (_) => w(j, _),
        onKeyDown: (_) => S(j, _),
        onFocus: () => u(j),
        onBlur: () => u(null),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: D3, children: L }),
          /* @__PURE__ */ c.jsx("span", { className: z3, "data-track": "true", children: /* @__PURE__ */ c.jsx(
            "span",
            {
              className: O3,
              style: { width: `${N * 100}%` },
              "aria-hidden": "true"
            }
          ) }),
          /* @__PURE__ */ c.jsx("span", { className: L3, children: N.toFixed(2) })
        ]
      },
      j
    );
  }) });
}
function U3(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
var K0 = "gvwvwg0", B3 = "gvwvwg2", I3 = "gvwvwg3", V3 = "gvwvwg8", q3 = "gvwvwg9", H3 = "gvwvwga", F3 = "gvwvwgb", P3 = "gvwvwgc", G3 = "gvwvwgd", Y3 = "gvwvwge";
function K3({
  presets: t,
  activePresetId: a,
  onSelect: s,
  onDelete: i
}) {
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: K0, children: [
    /* @__PURE__ */ c.jsx("span", { className: B3, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("span", { className: I3, children: "No presets yet. Save your current vector to build the library." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: K0, children: [
    /* @__PURE__ */ c.jsx("span", { className: Y3, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("div", { className: V3, children: t.map((o) => {
      const u = X3(o), f = o.presetId === a;
      return /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${q3}${f ? ` ${F3}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: H3,
                onClick: () => s(o),
                "aria-pressed": f,
                children: [
                  /* @__PURE__ */ c.jsx(R3, { vec: u, size: 28 }),
                  /* @__PURE__ */ c.jsx("span", { className: P3, children: o.presetName })
                ]
              }
            ),
            i && /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: G3,
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
const sh = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function X3(t) {
  const a = sh.reduce(
    (i, o) => ({ ...i, [o]: 0 }),
    {}
  );
  if (!Array.isArray(t.vector)) return a;
  const s = sh.reduce(
    (i, o, u) => ({ ...i, [o]: t.vector[u] ?? 0 }),
    a
  );
  return es(s);
}
function Rf(t) {
  return sh.map((a) => t[a] ?? 0);
}
const Q3 = [
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
], Z3 = [
  "very",
  "extremely",
  "deeply",
  "intensely",
  "absolutely",
  "totally",
  "really",
  "so"
], J3 = [
  "slightly",
  "a bit",
  "a little",
  "kinda",
  "kind of",
  "somewhat",
  "barely"
], W3 = ["not", "no", "never", "without", "lack", "lacking", "free of"];
function e5(t) {
  const a = t.toLowerCase().trim();
  if (!a) return { ...Js };
  const i = a.split(/\s+/).some((f) => Z3.includes(f)) ? 1.2 : 1, o = J3.some((f) => a.includes(f)) ? 0.55 : 1, u = { ...Js };
  for (const f of Q3) {
    let m = 0;
    for (const y of f.keywords) {
      const p = y.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"), v = new RegExp(`\\b${p}\\b`).exec(a);
      if (!v) continue;
      const w = v.index, S = a.slice(0, w), j = Math.max(
        S.lastIndexOf(","),
        S.lastIndexOf(";"),
        S.lastIndexOf(" but "),
        S.lastIndexOf(" yet ")
      ), R = S.slice(j >= 0 ? j : 0).slice(-30);
      W3.some((T) => new RegExp(`\\b${T}\\b`).test(R)) || (m += 1);
    }
    if (m > 0) {
      const y = f.weight * Math.min(1, 0.55 + 0.2 * (m - 1)) * i * o;
      u[f.axis] = Math.min(1, y);
    }
  }
  return rn.every((f) => u[f] === 0) && (u.calm = 0.4), es(u);
}
const t5 = [
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
];
function n5({
  value: t,
  onChange: a,
  deploymentId: s,
  presets: i,
  onPresetsChange: o
}) {
  const u = t.mode ?? "emotion_vector", f = u === "none" || u === "audio_ref" ? "emotion_vector" : u, m = g.useMemo(() => a5(t.vector), [t.vector]), y = t.emotionAlpha ?? 1, [p, b] = g.useState(null), [v, w] = g.useState(!1), [S, j] = g.useState(null), [N, R] = g.useState(""), [T, L] = g.useState(!1), _ = g.useRef(!0);
  g.useEffect(() => (_.current = !0, () => {
    _.current = !1;
  }), []), g.useEffect(() => {
    T || R(H0(m));
  }, [m, T]);
  const C = (U) => {
    a({ ...t, mode: U });
  }, I = (U) => {
    a({
      ...t,
      mode: "emotion_vector",
      vector: Rf(U)
    }), S && j(null);
  }, Y = () => {
    I(es(Js));
  }, ie = (U) => {
    const se = Math.max(0, Math.min(10, Number.isFinite(U) ? U : 1));
    a({ ...t, emotionAlpha: se });
  }, M = async () => {
    const U = N.trim();
    if (U) {
      w(!0), b(null);
      try {
        const se = await bM(s, U, Rf(m));
        if (!_.current) return;
        o(
          r5([se, ...i.filter((de) => de.presetId !== se.presetId)])
        ), j(se.presetId), L(!1);
      } catch (se) {
        _.current && b(X0(se));
      } finally {
        _.current && w(!1);
      }
    }
  }, V = async (U) => {
    const se = [...i];
    o(i.filter((de) => de.presetId !== U)), S === U && j(null);
    try {
      await xM(s, U);
    } catch (de) {
      _.current && (o(se), b(X0(de)));
    }
  }, D = (U) => {
    j(U.presetId), a({
      ...t,
      mode: "emotion_vector",
      vector: U.vector
    });
  }, P = (U) => {
    a({ ...t, mode: "qwen_template", qwenTemplate: U });
  }, J = x3(m), Z = S3(m), G = P1(m, 3), re = G.length > 0 && N.trim().length > 0 && !v, A = H0(m) || "name your preset…", F = f !== "emotion_vector";
  return /* @__PURE__ */ c.jsxs("div", { className: TA, children: [
    /* @__PURE__ */ c.jsxs("div", { className: RA, children: [
      /* @__PURE__ */ c.jsx("span", { className: L0, children: "Emotion mode" }),
      /* @__PURE__ */ c.jsx("div", { className: _A, role: "radiogroup", "aria-label": "Emotion mode", children: t5.map((U) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": f === U.id,
          className: `${MA}${f === U.id ? ` ${AA}` : ""}`,
          onClick: () => C(U.id),
          children: U.label
        },
        U.id
      )) })
    ] }),
    f === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: VA, children: [
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: qA,
          placeholder: 'e.g. "Friendly teen, slightly skeptical"',
          value: t.qwenTemplate ?? "",
          onChange: (U) => P(U.target.value)
        }
      ),
      /* @__PURE__ */ c.jsxs("div", { className: HA, children: [
        /* @__PURE__ */ c.jsx(
          Ze,
          {
            variant: "secondary",
            onClick: () => {
              const U = (t.qwenTemplate ?? "").trim();
              if (!U) return;
              const se = e5(U);
              a({
                ...t,
                mode: "emotion_vector",
                vector: Rf(se)
              });
            },
            disabled: !(t.qwenTemplate ?? "").trim(),
            children: "Map to vector →"
          }
        ),
        /* @__PURE__ */ c.jsx("span", { className: V0, children: "Heuristic v1: keyword-based mapping. Switches to vector mode on success." })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: V0, children: [
        "The Qwen prompt is mapped to a vector at synth time. Per-line",
        " ",
        /* @__PURE__ */ c.jsx("code", { children: "[Char|qwen:…]" }),
        " overrides take precedence."
      ] })
    ] }),
    f === "emotion_vector" && /* @__PURE__ */ c.jsxs("div", { className: BA, children: [
      /* @__PURE__ */ c.jsx("div", { className: `${d0} ${kA}`, children: /* @__PURE__ */ c.jsx(
        C3,
        {
          vec: m,
          onChange: I,
          readOnly: F
        }
      ) }),
      /* @__PURE__ */ c.jsxs("div", { className: `${d0} ${DA}`, children: [
        /* @__PURE__ */ c.jsxs("div", { className: zA, children: [
          /* @__PURE__ */ c.jsx("span", { className: L0, children: "Dominant" }),
          /* @__PURE__ */ c.jsx("span", { className: OA, children: J ? xl[J].toLowerCase() : "neutral" }),
          /* @__PURE__ */ c.jsxs("span", { className: LA, children: [
            "‖v‖ = ",
            Z.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ c.jsx($3, { vec: m, onChange: I, readOnly: F }),
        /* @__PURE__ */ c.jsx("div", { className: $A, children: /* @__PURE__ */ c.jsxs(
          Ze,
          {
            variant: "ghost",
            size: "sm",
            onClick: Y,
            disabled: F || Z < 1e-3,
            "aria-label": "Reset emotion vector",
            children: [
              /* @__PURE__ */ c.jsxs(
                "svg",
                {
                  className: UA,
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
      /* @__PURE__ */ c.jsxs("div", { className: $0, children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("span", { className: U0, children: "Alpha" }),
          /* @__PURE__ */ c.jsx("br", {}),
          /* @__PURE__ */ c.jsx("span", { className: IA, children: "Global mix · per-line overrides bypass it" })
        ] }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 10,
            step: 0.01,
            value: y,
            className: B0,
            style: { "--fill": `${y * 10}%` },
            onChange: (U) => ie(Number(U.target.value)),
            "aria-label": "Emotion alpha"
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: I0, children: [
          (y * 100).toFixed(0),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${PA}${G.length === 0 ? ` ${GA}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs("div", { className: YA, children: [
              /* @__PURE__ */ c.jsx("span", { className: KA, children: "Save current as preset" }),
              G.length === 0 && /* @__PURE__ */ c.jsx("span", { className: XA, children: "adjust the radar to enable" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: QA, children: [
              /* @__PURE__ */ c.jsx("div", { className: ZA, children: G.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: `${q0} ${WA}`, children: "no axes set" }) : G.map((U) => /* @__PURE__ */ c.jsxs("span", { className: q0, children: [
                U.label.toLowerCase(),
                /* @__PURE__ */ c.jsx("b", { className: JA, children: U.value.toFixed(2) })
              ] }, U.key)) }),
              /* @__PURE__ */ c.jsxs("div", { className: e3, children: [
                /* @__PURE__ */ c.jsx(
                  "input",
                  {
                    type: "text",
                    className: t3,
                    placeholder: A,
                    value: N,
                    disabled: G.length === 0 || v,
                    onChange: (U) => {
                      R(U.target.value), L(!0);
                    },
                    onKeyDown: (U) => {
                      U.key === "Enter" && re && M();
                    },
                    "aria-label": "Preset name"
                  }
                ),
                /* @__PURE__ */ c.jsx(
                  Ze,
                  {
                    variant: "primary",
                    disabled: !re,
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
        K3,
        {
          presets: i,
          activePresetId: S,
          onSelect: D,
          onDelete: V
        }
      )
    ] }),
    f === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: $0, children: [
      /* @__PURE__ */ c.jsx("span", { className: U0, children: "Alpha" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 10,
          step: 0.01,
          value: y,
          className: B0,
          style: { "--fill": `${y * 10}%` },
          onChange: (U) => ie(Number(U.target.value)),
          "aria-label": "Emotion alpha"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: I0, children: [
        (y * 100).toFixed(0),
        "%"
      ] })
    ] }),
    p && /* @__PURE__ */ c.jsx("div", { className: FA, children: p })
  ] });
}
function a5(t) {
  if (!t || !Array.isArray(t)) return es(Js);
  const a = { ...Js };
  return rn.forEach((s, i) => {
    const o = t[i];
    a[s] = Number.isFinite(o) ? Math.max(0, Math.min(1, o)) : 0;
  }), a;
}
function r5(t) {
  return [...t].sort((a, s) => s.updatedAt - a.updatedAt);
}
function X0(t) {
  return t instanceof ni || t instanceof Error ? t.message : "Unknown error";
}
var s5 = "_5u1uau0", tl = "_5u1uau1", i5 = "_5u1uau2", Is = "_5u1uau3", nl = "_5u1uau4", l5 = "_5u1uau5", _f = "_5u1uau6", o5 = "_5u1uau7", c5 = "_5u1uau8", u5 = "_5u1uau9", d5 = "_5u1uaua", f5 = "_5u1uaub", h5 = "_5u1uauc", m5 = "_5u1uaud", p5 = "_5u1uaue", Q0 = "_5u1uauf", Z0 = "_5u1uaug", g5 = "_5u1uauh";
const Mf = [
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
], v5 = ["mp3", "wav", "flac"], ec = 0.5, Af = 2, y5 = 0.05, b5 = 0.8, x5 = 0.8, J0 = 42;
function tc(t, a, s) {
  const i = t[a];
  if (typeof i == "number" && Number.isFinite(i)) return i;
  if (typeof i == "string") {
    const o = Number(i);
    if (Number.isFinite(o)) return o;
  }
  return s;
}
function S5({
  outputFormat: t,
  onOutputFormatChange: a,
  speedFactor: s,
  onSpeedFactorChange: i,
  cachePolicy: o,
  onCachePolicyChange: u,
  generation: f,
  onGenerationChange: m
}) {
  const y = g.useId(), p = g.useId(), b = g.useId(), v = g.useId(), w = g.useId(), S = (I, Y) => {
    m({ ...f, [I]: Y });
  }, j = f.seed === void 0 || f.seed === null ? "random" : "fixed", N = (I) => {
    if (I !== j)
      if (I === "random") {
        const Y = { ...f };
        delete Y.seed, m(Y);
      } else {
        const Y = tc(f, "seed", J0);
        m({ ...f, seed: Y });
      }
  }, R = Mf.find((I) => I.id === o) ?? Mf[0], T = (s - ec) / (Af - ec) * 100, L = tc(f, "temperature", b5), _ = tc(f, "top_p", x5), C = tc(f, "seed", J0);
  return /* @__PURE__ */ c.jsxs("div", { className: s5, children: [
    /* @__PURE__ */ c.jsxs("div", { className: tl, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: y, className: Is, children: "Format" }),
      /* @__PURE__ */ c.jsx("div", { className: nl, children: /* @__PURE__ */ c.jsx(
        "select",
        {
          id: y,
          className: l5,
          value: t,
          onChange: (I) => a(I.currentTarget.value),
          children: v5.map((I) => /* @__PURE__ */ c.jsx("option", { value: I, children: I }, I))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: tl, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: p, className: Is, children: "Speed" }),
      /* @__PURE__ */ c.jsxs("div", { className: `${nl} ${o5}`, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: p,
            type: "range",
            className: c5,
            min: ec,
            max: Af,
            step: y5,
            value: s,
            style: { "--range-pct": `${T}%` },
            onChange: (I) => i(Number(I.currentTarget.value)),
            "aria-valuemin": ec,
            "aria-valuemax": Af,
            "aria-valuenow": s
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: u5, children: [
          s.toFixed(2),
          "×"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: i5, role: "radiogroup", "aria-label": "Cache policy", children: [
      /* @__PURE__ */ c.jsx("span", { className: Is, children: "Cache" }),
      /* @__PURE__ */ c.jsx("div", { className: d5, children: Mf.map((I) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": o === I.id,
          className: f5,
          onClick: () => u(I.id),
          title: I.help,
          children: I.label
        },
        I.id
      )) }),
      /* @__PURE__ */ c.jsx("p", { className: h5, "aria-live": "polite", children: R.help })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: m5, "aria-hidden": "true" }),
    /* @__PURE__ */ c.jsxs("div", { className: tl, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: b, className: Is, children: "Temperature" }),
      /* @__PURE__ */ c.jsx("div", { className: nl, children: /* @__PURE__ */ c.jsx(
        "input",
        {
          id: b,
          type: "number",
          className: _f,
          min: 0,
          max: 2,
          step: 0.05,
          value: L,
          onChange: (I) => S("temperature", Number(I.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: tl, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: v, className: Is, children: "Top-p" }),
      /* @__PURE__ */ c.jsx("div", { className: nl, children: /* @__PURE__ */ c.jsx(
        "input",
        {
          id: v,
          type: "number",
          className: _f,
          min: 0,
          max: 1,
          step: 0.05,
          value: _,
          onChange: (I) => S("top_p", Number(I.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: tl, children: [
      /* @__PURE__ */ c.jsx("span", { className: Is, id: `${w}-label`, children: "Seed" }),
      /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${nl} ${p5}`,
          role: "radiogroup",
          "aria-labelledby": `${w}-label`,
          children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                role: "radio",
                "aria-checked": j === "fixed",
                className: `${Q0} ${j === "fixed" ? Z0 : ""}`,
                onClick: () => N("fixed"),
                children: "Fixed"
              }
            ),
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                role: "radio",
                "aria-checked": j === "random",
                className: `${Q0} ${j === "random" ? Z0 : ""}`,
                onClick: () => N("random"),
                title: "A fresh seed is rolled for every run — output varies",
                children: "Random"
              }
            ),
            j === "fixed" ? /* @__PURE__ */ c.jsx(
              "input",
              {
                id: w,
                type: "number",
                className: _f,
                step: 1,
                value: C,
                onChange: (I) => S("seed", Math.trunc(Number(I.currentTarget.value))),
                "aria-label": "Fixed seed value"
              }
            ) : /* @__PURE__ */ c.jsx("span", { className: g5, "aria-live": "polite", children: "auto · rolls each run" })
          ]
        }
      )
    ] })
  ] });
}
var w5 = "iv43qk0", W0 = "iv43qk1", j5 = "iv43qk2", eb = "iv43qk3", E5 = "iv43qk4", N5 = "iv43qk5", C5 = "iv43qk6", T5 = "iv43qk7", R5 = { vector: "iv43qk8", qwen: "iv43qk9", preset: "iv43qka", audio: "iv43qkb", raw: "iv43qkc" }, _5 = "iv43qkd", M5 = "iv43qke", kf = "iv43qkf", Df = "iv43qkg";
function A5({
  lines: t,
  characterColors: a,
  onLineClick: s
}) {
  if (t.length === 0)
    return /* @__PURE__ */ c.jsx("p", { className: _5, children: "Paste dialogue above to see character-tagged lines, override badges, and per-line previews here." });
  const i = t.length, o = t.filter((f) => f.character !== null).length, u = i - o;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: M5, children: [
      /* @__PURE__ */ c.jsxs("span", { className: kf, children: [
        /* @__PURE__ */ c.jsx("span", { className: Df, children: i }),
        "lines"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: kf, children: [
        /* @__PURE__ */ c.jsx("span", { className: Df, children: o }),
        "spoken"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: kf, children: [
        /* @__PURE__ */ c.jsx("span", { className: Df, children: u }),
        "narration"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("ol", { className: w5, children: t.map((f) => /* @__PURE__ */ c.jsx(
      k5,
      {
        line: f,
        ...f.character && a[f.character] ? { color: a[f.character] } : {},
        ...s ? { onClick: () => s(f.idx) } : {}
      },
      f.idx
    )) })
  ] });
}
function k5({ line: t, color: a, onClick: s }) {
  return t.character === null ? /* @__PURE__ */ c.jsxs("li", { className: `${W0} ${j5}`, children: [
    /* @__PURE__ */ c.jsx("span", { className: eb, children: String(t.idx + 1).padStart(2, "0") }),
    /* @__PURE__ */ c.jsx("span", { className: C5, children: t.text })
  ] }) : /* @__PURE__ */ c.jsxs(
    "li",
    {
      className: W0,
      onClick: s,
      style: s ? { cursor: "pointer" } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: eb, children: String(t.idx + 1).padStart(2, "0") }),
        /* @__PURE__ */ c.jsx("span", { className: E5, style: a ? { color: a } : void 0, children: t.character }),
        /* @__PURE__ */ c.jsxs("span", { className: N5, children: [
          t.text,
          t.override && /* @__PURE__ */ c.jsxs("span", { className: `${T5} ${R5[t.override.kind]}`, children: [
            t.override.kind,
            t.override.label ? ` · ${t.override.label}` : ""
          ] })
        ] })
      ]
    }
  );
}
var D5 = "_46z95i0", z5 = "_46z95i1", O5 = "_46z95i2", L5 = "_46z95i3", $5 = "_46z95i4", U5 = "_46z95i5", B5 = "_46z95i6";
const I5 = {
  intensity: 0.6,
  pace: 1,
  pitchSt: 0
};
function V5({ value: t, onChange: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: D5, children: [
    /* @__PURE__ */ c.jsx(
      zf,
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
      zf,
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
      zf,
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
function zf({ label: t, sub: a, min: s, max: i, step: o, format: u, value: f, onChange: m }) {
  const y = (f - s) / (i - s) * 100, p = `perf-${t.toLowerCase()}`;
  return /* @__PURE__ */ c.jsxs("div", { className: z5, children: [
    /* @__PURE__ */ c.jsxs("div", { className: O5, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: p, className: L5, children: t }),
      /* @__PURE__ */ c.jsx("span", { className: $5, children: a })
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
        className: U5,
        style: { "--fill": `${y}%` },
        onChange: (b) => m(Number(b.target.value))
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: B5, children: u(f) })
  ] });
}
var q5 = "qe93dj0", H5 = "qe93dj1", F5 = "qe93dj2", P5 = "qe93dj3", G5 = "qe93dj4", Y5 = "qe93dj5", K5 = "qe93dj6", X5 = { ok: "qe93dj7", warn: "qe93dj8", info: "qe93dj9" }, Q5 = "qe93dja", Z5 = "qe93djb";
function J5({ checks: t }) {
  const a = t.filter((s) => s.status === "ok").length;
  return /* @__PURE__ */ c.jsxs("div", { className: q5, children: [
    /* @__PURE__ */ c.jsxs("header", { className: H5, children: [
      /* @__PURE__ */ c.jsx("span", { className: F5, children: "Pre-flight" }),
      /* @__PURE__ */ c.jsxs("span", { className: P5, children: [
        a,
        "/",
        t.length,
        " OK"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: G5, children: t.map((s) => /* @__PURE__ */ c.jsxs("li", { className: Y5, children: [
      /* @__PURE__ */ c.jsx(
        "span",
        {
          "aria-hidden": "true",
          className: `${K5} ${X5[s.status]}`
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: Q5, children: s.label }),
      s.detail && /* @__PURE__ */ c.jsx("span", { className: Z5, children: s.detail })
    ] }, s.id)) })
  ] });
}
var tb = "_17fbpt30", nb = "_17fbpt31", ab = "_17fbpt32", W5 = "_17fbpt33", ek = "_17fbpt34", tk = "_17fbpt35", rb = "_17fbpt36", nk = "_17fbpt37", ak = "_17fbpt38";
const rk = {
  completed: "success",
  running: "accent",
  queued: "neutral",
  failed: "danger",
  cancelled: "faint",
  partial: "warning"
};
function sk({
  runs: t,
  deploymentId: a,
  onOpenQueue: s,
  onOpenRun: i,
  emptyHint: o
}) {
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: tb, children: [
    /* @__PURE__ */ c.jsx("header", { className: nb, children: /* @__PURE__ */ c.jsx(
      "a",
      {
        className: ab,
        href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
        onClick: s ? (u) => {
          u.preventDefault(), s();
        } : void 0,
        children: "Open queue →"
      }
    ) }),
    /* @__PURE__ */ c.jsx("p", { className: nk, children: "No runs yet." }),
    /* @__PURE__ */ c.jsx("p", { className: ak, children: o ?? "Hit Generate to enqueue a batch." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: tb, children: [
    /* @__PURE__ */ c.jsxs("header", { className: nb, children: [
      /* @__PURE__ */ c.jsx("span", {}),
      /* @__PURE__ */ c.jsx(
        "a",
        {
          className: ab,
          href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
          onClick: s ? (u) => {
            u.preventDefault(), s();
          } : void 0,
          children: "Open queue →"
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: W5, children: t.slice(0, 5).map((u) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: ek,
        onClick: i ? () => i(u.runId) : void 0,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: tk, children: u.runId }),
          /* @__PURE__ */ c.jsx("span", { className: `${L1.sm} ${$1[rk[u.status] ?? "neutral"]}`, children: u.status }),
          /* @__PURE__ */ c.jsx("span", { className: rb, children: ik(u.startedAt ?? u.queuedAt) }),
          /* @__PURE__ */ c.jsx("span", { className: rb, children: u.kind })
        ]
      }
    ) }, u.runId)) })
  ] });
}
function ik(t) {
  if (!t) return "—";
  const a = t > 1e12 ? Math.floor(t / 1e3) : t, s = new Date(a * 1e3);
  if (Number.isNaN(s.getTime())) return "—";
  const o = Date.now() - s.getTime();
  return o < 6e4 ? "just now" : o < 36e5 ? `${Math.floor(o / 6e4)}m ago` : o < 864e5 ? `${Math.floor(o / 36e5)}h ago` : s.toISOString().slice(0, 16).replace("T", " ");
}
const G1 = g.createContext({});
function tm(t) {
  const a = g.useRef(null);
  return a.current === null && (a.current = t()), a.current;
}
const lk = typeof window < "u", Y1 = lk ? g.useLayoutEffect : g.useEffect, Kc = /* @__PURE__ */ g.createContext(null);
function ok(t, a) {
  t.indexOf(a) === -1 && t.push(a);
}
function ck(t, a) {
  const s = t.indexOf(a);
  s > -1 && t.splice(s, 1);
}
const Er = (t, a, s) => s > a ? a : s < t ? t : s;
function sb(t, a) {
  return a ? `${t}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : t;
}
let Rl = () => {
}, Ws = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (Rl = (t, a, s) => {
  !t && typeof console < "u" && console.warn(sb(a, s));
}, Ws = (t, a, s) => {
  if (!t)
    throw new Error(sb(a, s));
});
const Nr = {}, K1 = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function uk(t) {
  return typeof t == "object" && t !== null;
}
const X1 = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function Q1(t) {
  let a;
  return () => (a === void 0 && (a = t()), a);
}
const ai = /* @__NO_SIDE_EFFECTS__ */ (t) => t, dk = (t, a) => (s) => a(t(s)), Xc = (...t) => t.reduce(dk), Z1 = /* @__NO_SIDE_EFFECTS__ */ (t, a, s) => {
  const i = a - t;
  return i === 0 ? 1 : (s - t) / i;
};
class J1 {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return ok(this.subscriptions, a), () => ck(this.subscriptions, a);
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
function W1(t, a) {
  return a ? t * (1e3 / a) : 0;
}
const eS = (t, a, s) => (((1 - 3 * s + 3 * a) * t + (3 * s - 6 * a)) * t + 3 * a) * t, fk = 1e-7, hk = 12;
function mk(t, a, s, i, o) {
  let u, f, m = 0;
  do
    f = a + (s - a) / 2, u = eS(f, i, o) - t, u > 0 ? s = f : a = f;
  while (Math.abs(u) > fk && ++m < hk);
  return f;
}
function _l(t, a, s, i) {
  if (t === a && s === i)
    return ai;
  const o = (u) => mk(u, 0, 1, t, s);
  return (u) => u === 0 || u === 1 ? u : eS(o(u), a, i);
}
const tS = (t) => (a) => a <= 0.5 ? t(2 * a) / 2 : (2 - t(2 * (1 - a))) / 2, nS = (t) => (a) => 1 - t(1 - a), aS = /* @__PURE__ */ _l(0.33, 1.53, 0.69, 0.99), nm = /* @__PURE__ */ nS(aS), rS = /* @__PURE__ */ tS(nm), sS = (t) => t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * nm(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), am = (t) => 1 - Math.sin(Math.acos(t)), pk = nS(am), iS = tS(am), gk = /* @__PURE__ */ _l(0.42, 0, 1, 1), vk = /* @__PURE__ */ _l(0, 0, 0.58, 1), lS = /* @__PURE__ */ _l(0.42, 0, 0.58, 1), yk = (t) => Array.isArray(t) && typeof t[0] != "number", oS = (t) => Array.isArray(t) && typeof t[0] == "number", ib = {
  linear: ai,
  easeIn: gk,
  easeInOut: lS,
  easeOut: vk,
  circIn: am,
  circInOut: iS,
  circOut: pk,
  backIn: nm,
  backInOut: rS,
  backOut: aS,
  anticipate: sS
}, bk = (t) => typeof t == "string", lb = (t) => {
  if (oS(t)) {
    Ws(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, s, i, o] = t;
    return _l(a, s, i, o);
  } else if (bk(t))
    return Ws(ib[t] !== void 0, `Invalid easing type '${t}'`, "invalid-easing-type"), ib[t];
  return t;
}, nc = [
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
function xk(t, a) {
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
    schedule: (b, v = !1, w = !1) => {
      const j = w && o ? s : i;
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
const Sk = 40;
function cS(t, a) {
  let s = !1, i = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, u = () => s = !0, f = nc.reduce((_, C) => (_[C] = xk(u), _), {}), { setup: m, read: y, resolveKeyframes: p, preUpdate: b, update: v, preRender: w, render: S, postRender: j } = f, N = () => {
    const _ = Nr.useManualTiming, C = _ ? o.timestamp : performance.now();
    s = !1, _ || (o.delta = i ? 1e3 / 60 : Math.max(Math.min(C - o.timestamp, Sk), 1)), o.timestamp = C, o.isProcessing = !0, m.process(o), y.process(o), p.process(o), b.process(o), v.process(o), w.process(o), S.process(o), j.process(o), o.isProcessing = !1, s && a && (i = !1, t(N));
  }, R = () => {
    s = !0, i = !0, o.isProcessing || t(N);
  };
  return { schedule: nc.reduce((_, C) => {
    const I = f[C];
    return _[C] = (Y, ie = !1, M = !1) => (s || R(), I.schedule(Y, ie, M)), _;
  }, {}), cancel: (_) => {
    for (let C = 0; C < nc.length; C++)
      f[nc[C]].cancel(_);
  }, state: o, steps: f };
}
const { schedule: na, cancel: ih, state: Rc } = /* @__PURE__ */ cS(typeof requestAnimationFrame < "u" ? requestAnimationFrame : ai, !0);
let xc;
function wk() {
  xc = void 0;
}
const qn = {
  now: () => (xc === void 0 && qn.set(Rc.isProcessing || Nr.useManualTiming ? Rc.timestamp : performance.now()), xc),
  set: (t) => {
    xc = t, queueMicrotask(wk);
  }
}, uS = (t) => (a) => typeof a == "string" && a.startsWith(t), dS = /* @__PURE__ */ uS("--"), jk = /* @__PURE__ */ uS("var(--"), rm = (t) => jk(t) ? Ek.test(t.split("/*")[0].trim()) : !1, Ek = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function ob(t) {
  return typeof t != "string" ? !1 : t.split("/*")[0].includes("var(--");
}
const ri = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, Sl = {
  ...ri,
  transform: (t) => Er(0, 1, t)
}, ac = {
  ...ri,
  default: 1
}, hl = (t) => Math.round(t * 1e5) / 1e5, sm = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Nk(t) {
  return t == null;
}
const Ck = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, im = (t, a) => (s) => !!(typeof s == "string" && Ck.test(s) && s.startsWith(t) || a && !Nk(s) && Object.prototype.hasOwnProperty.call(s, a)), fS = (t, a, s) => (i) => {
  if (typeof i != "string")
    return i;
  const [o, u, f, m] = i.match(sm);
  return {
    [t]: parseFloat(o),
    [a]: parseFloat(u),
    [s]: parseFloat(f),
    alpha: m !== void 0 ? parseFloat(m) : 1
  };
}, Tk = (t) => Er(0, 255, t), Of = {
  ...ri,
  transform: (t) => Math.round(Tk(t))
}, Xr = {
  test: /* @__PURE__ */ im("rgb", "red"),
  parse: /* @__PURE__ */ fS("red", "green", "blue"),
  transform: ({ red: t, green: a, blue: s, alpha: i = 1 }) => "rgba(" + Of.transform(t) + ", " + Of.transform(a) + ", " + Of.transform(s) + ", " + hl(Sl.transform(i)) + ")"
};
function Rk(t) {
  let a = "", s = "", i = "", o = "";
  return t.length > 5 ? (a = t.substring(1, 3), s = t.substring(3, 5), i = t.substring(5, 7), o = t.substring(7, 9)) : (a = t.substring(1, 2), s = t.substring(2, 3), i = t.substring(3, 4), o = t.substring(4, 5), a += a, s += s, i += i, o += o), {
    red: parseInt(a, 16),
    green: parseInt(s, 16),
    blue: parseInt(i, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const lh = {
  test: /* @__PURE__ */ im("#"),
  parse: Rk,
  transform: Xr.transform
}, Ml = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (a) => typeof a == "string" && a.endsWith(t) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${t}`
}), vr = /* @__PURE__ */ Ml("deg"), Xs = /* @__PURE__ */ Ml("%"), De = /* @__PURE__ */ Ml("px"), _k = /* @__PURE__ */ Ml("vh"), Mk = /* @__PURE__ */ Ml("vw"), cb = {
  ...Xs,
  parse: (t) => Xs.parse(t) / 100,
  transform: (t) => Xs.transform(t * 100)
}, Ys = {
  test: /* @__PURE__ */ im("hsl", "hue"),
  parse: /* @__PURE__ */ fS("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: a, lightness: s, alpha: i = 1 }) => "hsla(" + Math.round(t) + ", " + Xs.transform(hl(a)) + ", " + Xs.transform(hl(s)) + ", " + hl(Sl.transform(i)) + ")"
}, an = {
  test: (t) => Xr.test(t) || lh.test(t) || Ys.test(t),
  parse: (t) => Xr.test(t) ? Xr.parse(t) : Ys.test(t) ? Ys.parse(t) : lh.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? Xr.transform(t) : Ys.transform(t),
  getAnimatableNone: (t) => {
    const a = an.parse(t);
    return a.alpha = 0, an.transform(a);
  }
}, Ak = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function kk(t) {
  return isNaN(t) && typeof t == "string" && (t.match(sm)?.length || 0) + (t.match(Ak)?.length || 0) > 0;
}
const hS = "number", mS = "color", Dk = "var", zk = "var(", ub = "${}", Ok = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function ei(t) {
  const a = t.toString(), s = [], i = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let u = 0;
  const m = a.replace(Ok, (y) => (an.test(y) ? (i.color.push(u), o.push(mS), s.push(an.parse(y))) : y.startsWith(zk) ? (i.var.push(u), o.push(Dk), s.push(y)) : (i.number.push(u), o.push(hS), s.push(parseFloat(y))), ++u, ub)).split(ub);
  return { values: s, split: m, indexes: i, types: o };
}
function Lk(t) {
  return ei(t).values;
}
function pS({ split: t, types: a }) {
  const s = t.length;
  return (i) => {
    let o = "";
    for (let u = 0; u < s; u++)
      if (o += t[u], i[u] !== void 0) {
        const f = a[u];
        f === hS ? o += hl(i[u]) : f === mS ? o += an.transform(i[u]) : o += i[u];
      }
    return o;
  };
}
function $k(t) {
  return pS(ei(t));
}
const Uk = (t) => typeof t == "number" ? 0 : an.test(t) ? an.getAnimatableNone(t) : t, Bk = (t, a) => typeof t == "number" ? a?.trim().endsWith("/") ? t : 0 : Uk(t);
function Ik(t) {
  const a = ei(t);
  return pS(a)(a.values.map((i, o) => Bk(i, a.split[o])));
}
const da = {
  test: kk,
  parse: Lk,
  createTransformer: $k,
  getAnimatableNone: Ik
};
function Lf(t, a, s) {
  return s < 0 && (s += 1), s > 1 && (s -= 1), s < 1 / 6 ? t + (a - t) * 6 * s : s < 1 / 2 ? a : s < 2 / 3 ? t + (a - t) * (2 / 3 - s) * 6 : t;
}
function Vk({ hue: t, saturation: a, lightness: s, alpha: i }) {
  t /= 360, a /= 100, s /= 100;
  let o = 0, u = 0, f = 0;
  if (!a)
    o = u = f = s;
  else {
    const m = s < 0.5 ? s * (1 + a) : s + a - s * a, y = 2 * s - m;
    o = Lf(y, m, t + 1 / 3), u = Lf(y, m, t), f = Lf(y, m, t - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(u * 255),
    blue: Math.round(f * 255),
    alpha: i
  };
}
function _c(t, a) {
  return (s) => s > 0 ? a : t;
}
const Al = (t, a, s) => t + (a - t) * s, $f = (t, a, s) => {
  const i = t * t, o = s * (a * a - i) + i;
  return o < 0 ? 0 : Math.sqrt(o);
}, qk = [lh, Xr, Ys], Hk = (t) => qk.find((a) => a.test(t));
function db(t) {
  const a = Hk(t);
  if (Rl(!!a, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let s = a.parse(t);
  return a === Ys && (s = Vk(s)), s;
}
const fb = (t, a) => {
  const s = db(t), i = db(a);
  if (!s || !i)
    return _c(t, a);
  const o = { ...s };
  return (u) => (o.red = $f(s.red, i.red, u), o.green = $f(s.green, i.green, u), o.blue = $f(s.blue, i.blue, u), o.alpha = Al(s.alpha, i.alpha, u), Xr.transform(o));
}, oh = /* @__PURE__ */ new Set(["none", "hidden"]);
function Fk(t, a) {
  return oh.has(t) ? (s) => s <= 0 ? t : a : (s) => s >= 1 ? a : t;
}
function Pk(t, a) {
  return (s) => Al(t, a, s);
}
function lm(t) {
  return typeof t == "number" ? Pk : typeof t == "string" ? rm(t) ? _c : an.test(t) ? fb : Kk : Array.isArray(t) ? gS : typeof t == "object" ? an.test(t) ? fb : Gk : _c;
}
function gS(t, a) {
  const s = [...t], i = s.length, o = t.map((u, f) => lm(u)(u, a[f]));
  return (u) => {
    for (let f = 0; f < i; f++)
      s[f] = o[f](u);
    return s;
  };
}
function Gk(t, a) {
  const s = { ...t, ...a }, i = {};
  for (const o in s)
    t[o] !== void 0 && a[o] !== void 0 && (i[o] = lm(t[o])(t[o], a[o]));
  return (o) => {
    for (const u in i)
      s[u] = i[u](o);
    return s;
  };
}
function Yk(t, a) {
  const s = [], i = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const u = a.types[o], f = t.indexes[u][i[u]], m = t.values[f] ?? 0;
    s[o] = m, i[u]++;
  }
  return s;
}
const Kk = (t, a) => {
  const s = da.createTransformer(a), i = ei(t), o = ei(a);
  return i.indexes.var.length === o.indexes.var.length && i.indexes.color.length === o.indexes.color.length && i.indexes.number.length >= o.indexes.number.length ? oh.has(t) && !o.values.length || oh.has(a) && !i.values.length ? Fk(t, a) : Xc(gS(Yk(i, o), o.values), s) : (Rl(!0, `Complex values '${t}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), _c(t, a));
};
function vS(t, a, s) {
  return typeof t == "number" && typeof a == "number" && typeof s == "number" ? Al(t, a, s) : lm(t)(t, a);
}
const Xk = (t) => {
  const a = ({ timestamp: s }) => t(s);
  return {
    start: (s = !0) => na.update(a, s),
    stop: () => ih(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Rc.isProcessing ? Rc.timestamp : qn.now()
  };
}, yS = (t, a, s = 10) => {
  let i = "";
  const o = Math.max(Math.round(a / s), 2);
  for (let u = 0; u < o; u++)
    i += Math.round(t(u / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${i.substring(0, i.length - 2)})`;
}, Mc = 2e4;
function om(t) {
  let a = 0;
  const s = 50;
  let i = t.next(a);
  for (; !i.done && a < Mc; )
    a += s, i = t.next(a);
  return a >= Mc ? 1 / 0 : a;
}
function Qk(t, a = 100, s) {
  const i = s({ ...t, keyframes: [0, a] }), o = Math.min(om(i), Mc);
  return {
    type: "keyframes",
    ease: (u) => i.next(o * u).value / a,
    duration: /* @__PURE__ */ ua(o)
  };
}
const Bt = {
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
function ch(t, a) {
  return t * Math.sqrt(1 - a * a);
}
const Zk = 12;
function Jk(t, a, s) {
  let i = s;
  for (let o = 1; o < Zk; o++)
    i = i - t(i) / a(i);
  return i;
}
const Uf = 1e-3;
function Wk({ duration: t = Bt.duration, bounce: a = Bt.bounce, velocity: s = Bt.velocity, mass: i = Bt.mass }) {
  let o, u;
  Rl(t <= /* @__PURE__ */ ta(Bt.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let f = 1 - a;
  f = Er(Bt.minDamping, Bt.maxDamping, f), t = Er(Bt.minDuration, Bt.maxDuration, /* @__PURE__ */ ua(t)), f < 1 ? (o = (p) => {
    const b = p * f, v = b * t, w = b - s, S = ch(p, f), j = Math.exp(-v);
    return Uf - w / S * j;
  }, u = (p) => {
    const v = p * f * t, w = v * s + s, S = Math.pow(f, 2) * Math.pow(p, 2) * t, j = Math.exp(-v), N = ch(Math.pow(p, 2), f);
    return (-o(p) + Uf > 0 ? -1 : 1) * ((w - S) * j) / N;
  }) : (o = (p) => {
    const b = Math.exp(-p * t), v = (p - s) * t + 1;
    return -Uf + b * v;
  }, u = (p) => {
    const b = Math.exp(-p * t), v = (s - p) * (t * t);
    return b * v;
  });
  const m = 5 / t, y = Jk(o, u, m);
  if (t = /* @__PURE__ */ ta(t), isNaN(y))
    return {
      stiffness: Bt.stiffness,
      damping: Bt.damping,
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
const eD = ["duration", "bounce"], tD = ["stiffness", "damping", "mass"];
function hb(t, a) {
  return a.some((s) => t[s] !== void 0);
}
function nD(t) {
  let a = {
    velocity: Bt.velocity,
    stiffness: Bt.stiffness,
    damping: Bt.damping,
    mass: Bt.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!hb(t, tD) && hb(t, eD))
    if (a.velocity = 0, t.visualDuration) {
      const s = t.visualDuration, i = 2 * Math.PI / (s * 1.2), o = i * i, u = 2 * Er(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: Bt.mass,
        stiffness: o,
        damping: u
      };
    } else {
      const s = Wk({ ...t, velocity: 0 });
      a = {
        ...a,
        ...s,
        mass: Bt.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function Ac(t = Bt.visualDuration, a = Bt.bounce) {
  const s = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: a
  } : t;
  let { restSpeed: i, restDelta: o } = s;
  const u = s.keyframes[0], f = s.keyframes[s.keyframes.length - 1], m = { done: !1, value: u }, { stiffness: y, damping: p, mass: b, duration: v, velocity: w, isResolvedFromDuration: S } = nD({
    ...s,
    velocity: -/* @__PURE__ */ ua(s.velocity || 0)
  }), j = w || 0, N = p / (2 * Math.sqrt(y * b)), R = f - u, T = /* @__PURE__ */ ua(Math.sqrt(y / b)), L = Math.abs(R) < 5;
  i || (i = L ? Bt.restSpeed.granular : Bt.restSpeed.default), o || (o = L ? Bt.restDelta.granular : Bt.restDelta.default);
  let _, C, I, Y, ie, M;
  if (N < 1)
    I = ch(T, N), Y = (j + N * T * R) / I, _ = (D) => {
      const P = Math.exp(-N * T * D);
      return f - P * (Y * Math.sin(I * D) + R * Math.cos(I * D));
    }, ie = N * T * Y + R * I, M = N * T * R - Y * I, C = (D) => Math.exp(-N * T * D) * (ie * Math.sin(I * D) + M * Math.cos(I * D));
  else if (N === 1) {
    _ = (P) => f - Math.exp(-T * P) * (R + (j + T * R) * P);
    const D = j + T * R;
    C = (P) => Math.exp(-T * P) * (T * D * P - j);
  } else {
    const D = T * Math.sqrt(N * N - 1);
    _ = (G) => {
      const re = Math.exp(-N * T * G), A = Math.min(D * G, 300);
      return f - re * ((j + N * T * R) * Math.sinh(A) + D * R * Math.cosh(A)) / D;
    };
    const P = (j + N * T * R) / D, J = N * T * P - R * D, Z = N * T * R - P * D;
    C = (G) => {
      const re = Math.exp(-N * T * G), A = Math.min(D * G, 300);
      return re * (J * Math.sinh(A) + Z * Math.cosh(A));
    };
  }
  const V = {
    calculatedDuration: S && v || null,
    velocity: (D) => /* @__PURE__ */ ta(C(D)),
    next: (D) => {
      if (!S && N < 1) {
        const J = Math.exp(-N * T * D), Z = Math.sin(I * D), G = Math.cos(I * D), re = f - J * (Y * Z + R * G), A = /* @__PURE__ */ ta(J * (ie * Z + M * G));
        return m.done = Math.abs(A) <= i && Math.abs(f - re) <= o, m.value = m.done ? f : re, m;
      }
      const P = _(D);
      if (S)
        m.done = D >= v;
      else {
        const J = /* @__PURE__ */ ta(C(D));
        m.done = Math.abs(J) <= i && Math.abs(f - P) <= o;
      }
      return m.value = m.done ? f : P, m;
    },
    toString: () => {
      const D = Math.min(om(V), Mc), P = yS((J) => V.next(D * J).value, D, 30);
      return D + "ms " + P;
    },
    toTransition: () => {
    }
  };
  return V;
}
Ac.applyToOptions = (t) => {
  const a = Qk(t, 100, Ac);
  return t.ease = a.ease, t.duration = /* @__PURE__ */ ta(a.duration), t.type = "keyframes", t;
};
const aD = 5;
function bS(t, a, s) {
  const i = Math.max(a - aD, 0);
  return W1(s - t(i), a - i);
}
function uh({ keyframes: t, velocity: a = 0, power: s = 0.8, timeConstant: i = 325, bounceDamping: o = 10, bounceStiffness: u = 500, modifyTarget: f, min: m, max: y, restDelta: p = 0.5, restSpeed: b }) {
  const v = t[0], w = {
    done: !1,
    value: v
  }, S = (M) => m !== void 0 && M < m || y !== void 0 && M > y, j = (M) => m === void 0 ? y : y === void 0 || Math.abs(m - M) < Math.abs(y - M) ? m : y;
  let N = s * a;
  const R = v + N, T = f === void 0 ? R : f(R);
  T !== R && (N = T - v);
  const L = (M) => -N * Math.exp(-M / i), _ = (M) => T + L(M), C = (M) => {
    const V = L(M), D = _(M);
    w.done = Math.abs(V) <= p, w.value = w.done ? T : D;
  };
  let I, Y;
  const ie = (M) => {
    S(w.value) && (I = M, Y = Ac({
      keyframes: [w.value, j(w.value)],
      velocity: bS(_, M, w.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: u,
      restDelta: p,
      restSpeed: b
    }));
  };
  return ie(0), {
    calculatedDuration: null,
    next: (M) => {
      let V = !1;
      return !Y && I === void 0 && (V = !0, C(M), ie(M)), I !== void 0 && M >= I ? Y.next(M - I) : (!V && C(M), w);
    }
  };
}
function rD(t, a, s) {
  const i = [], o = s || Nr.mix || vS, u = t.length - 1;
  for (let f = 0; f < u; f++) {
    let m = o(t[f], t[f + 1]);
    if (a) {
      const y = Array.isArray(a) ? a[f] || ai : a;
      m = Xc(y, m);
    }
    i.push(m);
  }
  return i;
}
function sD(t, a, { clamp: s = !0, ease: i, mixer: o } = {}) {
  const u = t.length;
  if (Ws(u === a.length, "Both input and output ranges must be the same length", "range-length"), u === 1)
    return () => a[0];
  if (u === 2 && a[0] === a[1])
    return () => a[1];
  const f = t[0] === t[1];
  t[0] > t[u - 1] && (t = [...t].reverse(), a = [...a].reverse());
  const m = rD(a, i, o), y = m.length, p = (b) => {
    if (f && b < t[0])
      return a[0];
    let v = 0;
    if (y > 1)
      for (; v < t.length - 2 && !(b < t[v + 1]); v++)
        ;
    const w = /* @__PURE__ */ Z1(t[v], t[v + 1], b);
    return m[v](w);
  };
  return s ? (b) => p(Er(t[0], t[u - 1], b)) : p;
}
function iD(t, a) {
  const s = t[t.length - 1];
  for (let i = 1; i <= a; i++) {
    const o = /* @__PURE__ */ Z1(0, a, i);
    t.push(Al(s, 1, o));
  }
}
function lD(t) {
  const a = [0];
  return iD(a, t.length - 1), a;
}
function oD(t, a) {
  return t.map((s) => s * a);
}
function cD(t, a) {
  return t.map(() => a || lS).splice(0, t.length - 1);
}
function ml({ duration: t = 300, keyframes: a, times: s, ease: i = "easeInOut" }) {
  const o = yk(i) ? i.map(lb) : lb(i), u = {
    done: !1,
    value: a[0]
  }, f = oD(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    s && s.length === a.length ? s : lD(a),
    t
  ), m = sD(f, a, {
    ease: Array.isArray(o) ? o : cD(a, o)
  });
  return {
    calculatedDuration: t,
    next: (y) => (u.value = m(y), u.done = y >= t, u)
  };
}
const uD = (t) => t !== null;
function Qc(t, { repeat: a, repeatType: s = "loop" }, i, o = 1) {
  const u = t.filter(uD), m = o < 0 || a && s !== "loop" && a % 2 === 1 ? 0 : u.length - 1;
  return !m || i === void 0 ? u[m] : i;
}
const dD = {
  decay: uh,
  inertia: uh,
  tween: ml,
  keyframes: ml,
  spring: Ac
};
function xS(t) {
  typeof t.type == "string" && (t.type = dD[t.type]);
}
class cm {
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
const fD = (t) => t / 100;
class kc extends cm {
  constructor(a) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: s } = this.options;
      s && s.updatedAt !== qn.now() && this.tick(qn.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = a, this.initAnimation(), this.play(), a.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: a } = this;
    xS(a);
    const { type: s = ml, repeat: i = 0, repeatDelay: o = 0, repeatType: u, velocity: f = 0 } = a;
    let { keyframes: m } = a;
    const y = s || ml;
    y !== ml && typeof m[0] != "number" && (this.mixKeyframes = Xc(fD, vS(m[0], m[1])), m = [0, 100]);
    const p = y({ ...a, keyframes: m });
    u === "mirror" && (this.mirroredGenerator = y({
      ...a,
      keyframes: [...m].reverse(),
      velocity: -f
    })), p.calculatedDuration === null && (p.calculatedDuration = om(p));
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
    const { delay: p = 0, keyframes: b, repeat: v, repeatType: w, repeatDelay: S, type: j, onUpdate: N, finalKeyframe: R } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), s ? this.currentTime = a : this.updateTime(a);
    const T = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1), L = this.playbackSpeed >= 0 ? T < 0 : T > o;
    this.currentTime = Math.max(T, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let _ = this.currentTime, C = i;
    if (v) {
      const M = Math.min(this.currentTime, o) / m;
      let V = Math.floor(M), D = M % 1;
      !D && M >= 1 && (D = 1), D === 1 && V--, V = Math.min(V, v + 1), !!(V % 2) && (w === "reverse" ? (D = 1 - D, S && (D -= S / m)) : w === "mirror" && (C = f)), _ = Er(0, 1, D) * m;
    }
    let I;
    L ? (this.delayState.value = b[0], I = this.delayState) : I = C.next(_), u && !L && (I.value = u(I.value));
    let { done: Y } = I;
    !L && y !== null && (Y = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const ie = this.holdTime === null && (this.state === "finished" || this.state === "running" && Y);
    return ie && j !== uh && (I.value = Qc(b, this.options, R, this.speed)), N && N(I.value), ie && this.finish(), I;
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
    return bS((i) => this.generator.next(i).value, a, s);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(a) {
    const s = this.playbackSpeed !== a;
    s && this.driver && this.updateTime(qn.now()), this.playbackSpeed = a, s && this.driver && (this.time = /* @__PURE__ */ ua(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: a = Xk, startTime: s } = this.options;
    this.driver || (this.driver = a((o) => this.tick(o))), this.options.onPlay?.();
    const i = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = i) : this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime || (this.startTime = s ?? i), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(qn.now()), this.holdTime = this.currentTime;
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
function hD(t) {
  for (let a = 1; a < t.length; a++)
    t[a] ?? (t[a] = t[a - 1]);
}
const Qr = (t) => t * 180 / Math.PI, dh = (t) => {
  const a = Qr(Math.atan2(t[1], t[0]));
  return fh(a);
}, mD = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: dh,
  rotateZ: dh,
  skewX: (t) => Qr(Math.atan(t[1])),
  skewY: (t) => Qr(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, fh = (t) => (t = t % 360, t < 0 && (t += 360), t), mb = dh, pb = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), gb = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), pD = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: pb,
  scaleY: gb,
  scale: (t) => (pb(t) + gb(t)) / 2,
  rotateX: (t) => fh(Qr(Math.atan2(t[6], t[5]))),
  rotateY: (t) => fh(Qr(Math.atan2(-t[2], t[0]))),
  rotateZ: mb,
  rotate: mb,
  skewX: (t) => Qr(Math.atan(t[4])),
  skewY: (t) => Qr(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function hh(t) {
  return t.includes("scale") ? 1 : 0;
}
function mh(t, a) {
  if (!t || t === "none")
    return hh(a);
  const s = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let i, o;
  if (s)
    i = pD, o = s;
  else {
    const m = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = mD, o = m;
  }
  if (!o)
    return hh(a);
  const u = i[a], f = o[1].split(",").map(vD);
  return typeof u == "function" ? u(f) : f[u];
}
const gD = (t, a) => {
  const { transform: s = "none" } = getComputedStyle(t);
  return mh(s, a);
};
function vD(t) {
  return parseFloat(t.trim());
}
const si = [
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
], ii = new Set(si), vb = (t) => t === ri || t === De, yD = /* @__PURE__ */ new Set(["x", "y", "z"]), bD = si.filter((t) => !yD.has(t));
function xD(t) {
  const a = [];
  return bD.forEach((s) => {
    const i = t.getValue(s);
    i !== void 0 && (a.push([s, i.get()]), i.set(s.startsWith("scale") ? 1 : 0));
  }), a;
}
const wr = {
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
  x: (t, { transform: a }) => mh(a, "x"),
  y: (t, { transform: a }) => mh(a, "y")
};
wr.translateX = wr.x;
wr.translateY = wr.y;
const Jr = /* @__PURE__ */ new Set();
let ph = !1, gh = !1, vh = !1;
function SS() {
  if (gh) {
    const t = Array.from(Jr).filter((i) => i.needsMeasurement), a = new Set(t.map((i) => i.element)), s = /* @__PURE__ */ new Map();
    a.forEach((i) => {
      const o = xD(i);
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
  gh = !1, ph = !1, Jr.forEach((t) => t.complete(vh)), Jr.clear();
}
function wS() {
  Jr.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (gh = !0);
  });
}
function SD() {
  vh = !0, wS(), SS(), vh = !1;
}
class um {
  constructor(a, s, i, o, u, f = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = s, this.name = i, this.motionValue = o, this.element = u, this.isAsync = f;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Jr.add(this), ph || (ph = !0, na.read(wS), na.resolveKeyframes(SS))) : (this.readKeyframes(), this.complete());
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
    hD(a);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, a), Jr.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Jr.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const wD = (t) => t.startsWith("--");
function jS(t, a, s) {
  wD(a) ? t.style.setProperty(a, s) : t.style[a] = s;
}
const jD = {};
function ES(t, a) {
  const s = /* @__PURE__ */ Q1(t);
  return () => jD[a] ?? s();
}
const ED = /* @__PURE__ */ ES(() => window.ScrollTimeline !== void 0, "scrollTimeline"), NS = /* @__PURE__ */ ES(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), ul = ([t, a, s, i]) => `cubic-bezier(${t}, ${a}, ${s}, ${i})`, yb = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ ul([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ ul([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ ul([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ ul([0.33, 1.53, 0.69, 0.99])
};
function CS(t, a) {
  if (t)
    return typeof t == "function" ? NS() ? yS(t, a) : "ease-out" : oS(t) ? ul(t) : Array.isArray(t) ? t.map((s) => CS(s, a) || yb.easeOut) : yb[t];
}
function ND(t, a, s, { delay: i = 0, duration: o = 300, repeat: u = 0, repeatType: f = "loop", ease: m = "easeOut", times: y } = {}, p = void 0) {
  const b = {
    [a]: s
  };
  y && (b.offset = y);
  const v = CS(m, o);
  Array.isArray(v) && (b.easing = v);
  const w = {
    delay: i,
    duration: o,
    easing: Array.isArray(v) ? "linear" : v,
    fill: "both",
    iterations: u + 1,
    direction: f === "reverse" ? "alternate" : "normal"
  };
  return p && (w.pseudoElement = p), t.animate(b, w);
}
function TS(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function CD({ type: t, ...a }) {
  return TS(t) && NS() ? t.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class RS extends cm {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: s, name: i, keyframes: o, pseudoElement: u, allowFlatten: f = !1, finalKeyframe: m, onComplete: y } = a;
    this.isPseudoElement = !!u, this.allowFlatten = f, this.options = a, Ws(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const p = CD(a);
    this.animation = ND(s, i, o, p, u), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !u) {
        const b = Qc(o, this.options, m, this.speed);
        this.updateMotionValue && this.updateMotionValue(b), jS(s, i, b), this.animation.cancel();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && ED() ? (this.animation.timeline = a, s && (this.animation.rangeStart = s), i && (this.animation.rangeEnd = i), ai) : o(this);
  }
}
const _S = {
  anticipate: sS,
  backInOut: rS,
  circInOut: iS
};
function TD(t) {
  return t in _S;
}
function RD(t) {
  typeof t.ease == "string" && TD(t.ease) && (t.ease = _S[t.ease]);
}
const Bf = 10;
class _D extends RS {
  constructor(a) {
    RD(a), xS(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const m = new kc({
      ...f,
      autoplay: !1
    }), y = Math.max(Bf, qn.now() - this.startTime), p = Er(0, Bf, y - Bf), b = m.sample(y).value, { name: v } = this.options;
    u && v && jS(u, v, b), s.setWithVelocity(m.sample(Math.max(0, y - p)).value, b, p), m.stop();
  }
}
const bb = (t, a) => a === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(da.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function MD(t) {
  const a = t[0];
  if (t.length === 1)
    return !0;
  for (let s = 0; s < t.length; s++)
    if (t[s] !== a)
      return !0;
}
function AD(t, a, s, i) {
  const o = t[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const u = t[t.length - 1], f = bb(o, a), m = bb(u, a);
  return Rl(f === m, `You are trying to animate ${a} from "${o}" to "${u}". "${f ? u : o}" is not an animatable value.`, "value-not-animatable"), !f || !m ? !1 : MD(t) || (s === "spring" || TS(s)) && i;
}
function yh(t) {
  t.duration = 0, t.type = "keyframes";
}
const MS = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), kD = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function DD(t) {
  for (let a = 0; a < t.length; a++)
    if (typeof t[a] == "string" && kD.test(t[a]))
      return !0;
  return !1;
}
const zD = /* @__PURE__ */ new Set([
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
]), OD = /* @__PURE__ */ Q1(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function LD(t) {
  const { motionValue: a, name: s, repeatDelay: i, repeatType: o, damping: u, type: f, keyframes: m } = t;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: p, transformTemplate: b } = a.owner.getProps();
  return OD() && s && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (MS.has(s) || zD.has(s) && DD(m)) && (s !== "transform" || !b) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !p && !i && o !== "mirror" && u !== 0 && f !== "inertia";
}
const $D = 40;
class UD extends cm {
  constructor({ autoplay: a = !0, delay: s = 0, type: i = "keyframes", repeat: o = 0, repeatDelay: u = 0, repeatType: f = "loop", keyframes: m, name: y, motionValue: p, element: b, ...v }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = qn.now();
    const w = {
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
    }, S = b?.KeyframeResolver || um;
    this.keyframeResolver = new S(m, (j, N, R) => this.onKeyframesResolved(j, N, w, !R), y, p, b), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, s, i, o) {
    this.keyframeResolver = void 0;
    const { name: u, type: f, velocity: m, delay: y, isHandoff: p, onUpdate: b } = i;
    this.resolvedAt = qn.now();
    let v = !0;
    AD(a, u, f, m) || (v = !1, (Nr.instantAnimations || !y) && b?.(Qc(a, i, s)), a[0] = a[a.length - 1], yh(i), i.repeat = 0);
    const S = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > $D ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: s,
      ...i,
      keyframes: a
    }, j = v && !p && LD(S), N = S.motionValue?.owner?.current;
    let R;
    if (j)
      try {
        R = new _D({
          ...S,
          element: N
        });
      } catch {
        R = new kc(S);
      }
    else
      R = new kc(S);
    R.finished.then(() => {
      this.notifyFinished();
    }).catch(ai), this.pendingTimeline && (this.stopTimeline = R.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = R;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(a, s) {
    return this.finished.finally(a).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), SD()), this._animation;
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
function AS(t, a, s, i = 0, o = 1) {
  const u = Array.from(t).sort((p, b) => p.sortNodePosition(b)).indexOf(a), f = t.size, m = (f - 1) * i;
  return typeof s == "function" ? s(u, f) : o === 1 ? u * i : m - u * i;
}
const BD = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function ID(t) {
  const a = BD.exec(t);
  if (!a)
    return [,];
  const [, s, i, o] = a;
  return [`--${s ?? i}`, o];
}
const VD = 4;
function kS(t, a, s = 1) {
  Ws(s <= VD, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [i, o] = ID(t);
  if (!i)
    return;
  const u = window.getComputedStyle(a).getPropertyValue(i);
  if (u) {
    const f = u.trim();
    return K1(f) ? parseFloat(f) : f;
  }
  return rm(o) ? kS(o, a, s + 1) : o;
}
const qD = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, HD = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), FD = {
  type: "keyframes",
  duration: 0.8
}, PD = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, GD = (t, { keyframes: a }) => a.length > 2 ? FD : ii.has(t) ? t.startsWith("scale") ? HD(a[1]) : qD : PD;
function DS(t, a) {
  if (t?.inherit && a) {
    const { inherit: s, ...i } = t;
    return { ...a, ...i };
  }
  return t;
}
function zS(t, a) {
  const s = t?.[a] ?? t?.default ?? t;
  return s !== t ? DS(s, t) : s;
}
const YD = /* @__PURE__ */ new Set([
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
function KD(t) {
  for (const a in t)
    if (!YD.has(a))
      return !0;
  return !1;
}
const XD = (t, a, s, i = {}, o, u) => (f) => {
  const m = zS(i, t) || {}, y = m.delay || i.delay || 0;
  let { elapsed: p = 0 } = i;
  p = p - /* @__PURE__ */ ta(y);
  const b = {
    keyframes: Array.isArray(s) ? s : [null, s],
    ease: "easeOut",
    velocity: a.getVelocity(),
    ...m,
    delay: -p,
    onUpdate: (w) => {
      a.set(w), m.onUpdate && m.onUpdate(w);
    },
    onComplete: () => {
      f(), m.onComplete && m.onComplete();
    },
    name: t,
    motionValue: a,
    element: u ? void 0 : o
  };
  KD(m) || Object.assign(b, GD(t, b)), b.duration && (b.duration = /* @__PURE__ */ ta(b.duration)), b.repeatDelay && (b.repeatDelay = /* @__PURE__ */ ta(b.repeatDelay)), b.from !== void 0 && (b.keyframes[0] = b.from);
  let v = !1;
  if ((b.type === !1 || b.duration === 0 && !b.repeatDelay) && (yh(b), b.delay === 0 && (v = !0)), (Nr.instantAnimations || Nr.skipAnimations || o?.shouldSkipAnimations) && (v = !0, yh(b), b.delay = 0), b.allowFlatten = !m.type && !m.ease, v && !u && a.get() !== void 0) {
    const w = Qc(b.keyframes, m);
    if (w !== void 0) {
      na.update(() => {
        b.onUpdate(w), b.onComplete();
      });
      return;
    }
  }
  return m.isSync ? new kc(b) : new UD(b);
};
function xb(t) {
  const a = [{}, {}];
  return t?.values.forEach((s, i) => {
    a[0][i] = s.get(), a[1][i] = s.getVelocity();
  }), a;
}
function dm(t, a, s, i) {
  if (typeof a == "function") {
    const [o, u] = xb(i);
    a = a(s !== void 0 ? s : t.custom, o, u);
  }
  if (typeof a == "string" && (a = t.variants && t.variants[a]), typeof a == "function") {
    const [o, u] = xb(i);
    a = a(s !== void 0 ? s : t.custom, o, u);
  }
  return a;
}
function Wr(t, a, s) {
  const i = t.getProps();
  return dm(i, a, s !== void 0 ? s : i.custom, t);
}
const OS = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...si
]), Sb = 30, QD = (t) => !isNaN(parseFloat(t));
class ZD {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(a, s = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (i) => {
      const o = qn.now();
      if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(i), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const u of this.dependents)
          u.dirty();
    }, this.hasAnimated = !1, this.setCurrent(a), this.owner = s.owner;
  }
  setCurrent(a) {
    this.current = a, this.updatedAt = qn.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = QD(this.current));
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
    this.events[a] || (this.events[a] = new J1());
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
    const a = qn.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > Sb)
      return 0;
    const s = Math.min(this.updatedAt - this.prevUpdatedAt, Sb);
    return W1(parseFloat(this.current) - parseFloat(this.prevFrameValue), s);
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
function Dc(t, a) {
  return new ZD(t, a);
}
const bh = (t) => Array.isArray(t);
function JD(t, a, s) {
  t.hasValue(a) ? t.getValue(a).set(s) : t.addValue(a, Dc(s));
}
function WD(t) {
  return bh(t) ? t[t.length - 1] || 0 : t;
}
function ez(t, a) {
  const s = Wr(t, a);
  let { transitionEnd: i = {}, transition: o = {}, ...u } = s || {};
  u = { ...u, ...i };
  for (const f in u) {
    const m = WD(u[f]);
    JD(t, f, m);
  }
}
const xn = (t) => !!(t && t.getVelocity);
function tz(t) {
  return !!(xn(t) && t.add);
}
function nz(t, a) {
  const s = t.getValue("willChange");
  if (tz(s))
    return s.add(a);
  if (!s && Nr.WillChange) {
    const i = new Nr.WillChange("auto");
    t.addValue("willChange", i), i.add(a);
  }
}
function fm(t) {
  return t.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const az = "framerAppearId", LS = "data-" + fm(az);
function rz(t) {
  return t.props[LS];
}
function sz({ protectedKeys: t, needsAnimating: a }, s) {
  const i = t.hasOwnProperty(s) && a[s] !== !0;
  return a[s] = !1, i;
}
function $S(t, a, { delay: s = 0, transitionOverride: i, type: o } = {}) {
  let { transition: u, transitionEnd: f, ...m } = a;
  const y = t.getDefaultTransition();
  u = u ? DS(u, y) : y;
  const p = u?.reduceMotion;
  i && (u = i);
  const b = [], v = o && t.animationState && t.animationState.getState()[o];
  for (const w in m) {
    const S = t.getValue(w, t.latestValues[w] ?? null), j = m[w];
    if (j === void 0 || v && sz(v, w))
      continue;
    const N = {
      delay: s,
      ...zS(u || {}, w)
    }, R = S.get();
    if (R !== void 0 && !S.isAnimating() && !Array.isArray(j) && j === R && !N.velocity) {
      na.update(() => S.set(j));
      continue;
    }
    let T = !1;
    if (window.MotionHandoffAnimation) {
      const C = rz(t);
      if (C) {
        const I = window.MotionHandoffAnimation(C, w, na);
        I !== null && (N.startTime = I, T = !0);
      }
    }
    nz(t, w);
    const L = p ?? t.shouldReduceMotion;
    S.start(XD(w, S, j, L && OS.has(w) ? { type: !1 } : N, t, T));
    const _ = S.animation;
    _ && b.push(_);
  }
  if (f) {
    const w = () => na.update(() => {
      f && ez(t, f);
    });
    b.length ? Promise.all(b).then(w) : w();
  }
  return b;
}
function xh(t, a, s = {}) {
  const i = Wr(t, a, s.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: o = t.getDefaultTransition() || {} } = i || {};
  s.transitionOverride && (o = s.transitionOverride);
  const u = i ? () => Promise.all($S(t, i, s)) : () => Promise.resolve(), f = t.variantChildren && t.variantChildren.size ? (y = 0) => {
    const { delayChildren: p = 0, staggerChildren: b, staggerDirection: v } = o;
    return iz(t, a, y, p, b, v, s);
  } : () => Promise.resolve(), { when: m } = o;
  if (m) {
    const [y, p] = m === "beforeChildren" ? [u, f] : [f, u];
    return y().then(() => p());
  } else
    return Promise.all([u(), f(s.delay)]);
}
function iz(t, a, s = 0, i = 0, o = 0, u = 1, f) {
  const m = [];
  for (const y of t.variantChildren)
    y.notify("AnimationStart", a), m.push(xh(y, a, {
      ...f,
      delay: s + (typeof i == "function" ? 0 : i) + AS(t.variantChildren, y, i, o, u)
    }).then(() => y.notify("AnimationComplete", a)));
  return Promise.all(m);
}
function lz(t, a, s = {}) {
  t.notify("AnimationStart", a);
  let i;
  if (Array.isArray(a)) {
    const o = a.map((u) => xh(t, u, s));
    i = Promise.all(o);
  } else if (typeof a == "string")
    i = xh(t, a, s);
  else {
    const o = typeof a == "function" ? Wr(t, a, s.custom) : a;
    i = Promise.all($S(t, o, s));
  }
  return i.then(() => {
    t.notify("AnimationComplete", a);
  });
}
const oz = {
  test: (t) => t === "auto",
  parse: (t) => t
}, US = (t) => (a) => a.test(t), BS = [ri, De, Xs, vr, Mk, _k, oz], wb = (t) => BS.find(US(t));
function cz(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || X1(t) : !0;
}
const uz = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function dz(t) {
  const [a, s] = t.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return t;
  const [i] = s.match(sm) || [];
  if (!i)
    return t;
  const o = s.replace(i, "");
  let u = uz.has(a) ? 1 : 0;
  return i !== s && (u *= 100), a + "(" + u + o + ")";
}
const fz = /\b([a-z-]*)\(.*?\)/gu, Sh = {
  ...da,
  getAnimatableNone: (t) => {
    const a = t.match(fz);
    return a ? a.map(dz).join(" ") : t;
  }
}, wh = {
  ...da,
  getAnimatableNone: (t) => {
    const a = da.parse(t);
    return da.createTransformer(t)(a.map((i) => typeof i == "number" ? 0 : typeof i == "object" ? { ...i, alpha: 1 } : i));
  }
}, jb = {
  ...ri,
  transform: Math.round
}, hz = {
  rotate: vr,
  rotateX: vr,
  rotateY: vr,
  rotateZ: vr,
  scale: ac,
  scaleX: ac,
  scaleY: ac,
  scaleZ: ac,
  skew: vr,
  skewX: vr,
  skewY: vr,
  distance: De,
  translateX: De,
  translateY: De,
  translateZ: De,
  x: De,
  y: De,
  z: De,
  perspective: De,
  transformPerspective: De,
  opacity: Sl,
  originX: cb,
  originY: cb,
  originZ: De
}, hm = {
  // Border props
  borderWidth: De,
  borderTopWidth: De,
  borderRightWidth: De,
  borderBottomWidth: De,
  borderLeftWidth: De,
  borderRadius: De,
  borderTopLeftRadius: De,
  borderTopRightRadius: De,
  borderBottomRightRadius: De,
  borderBottomLeftRadius: De,
  // Positioning props
  width: De,
  maxWidth: De,
  height: De,
  maxHeight: De,
  top: De,
  right: De,
  bottom: De,
  left: De,
  inset: De,
  insetBlock: De,
  insetBlockStart: De,
  insetBlockEnd: De,
  insetInline: De,
  insetInlineStart: De,
  insetInlineEnd: De,
  // Spacing props
  padding: De,
  paddingTop: De,
  paddingRight: De,
  paddingBottom: De,
  paddingLeft: De,
  paddingBlock: De,
  paddingBlockStart: De,
  paddingBlockEnd: De,
  paddingInline: De,
  paddingInlineStart: De,
  paddingInlineEnd: De,
  margin: De,
  marginTop: De,
  marginRight: De,
  marginBottom: De,
  marginLeft: De,
  marginBlock: De,
  marginBlockStart: De,
  marginBlockEnd: De,
  marginInline: De,
  marginInlineStart: De,
  marginInlineEnd: De,
  // Typography
  fontSize: De,
  // Misc
  backgroundPositionX: De,
  backgroundPositionY: De,
  ...hz,
  zIndex: jb,
  // SVG
  fillOpacity: Sl,
  strokeOpacity: Sl,
  numOctaves: jb
}, mz = {
  ...hm,
  // Color props
  color: an,
  backgroundColor: an,
  outlineColor: an,
  fill: an,
  stroke: an,
  // Border props
  borderColor: an,
  borderTopColor: an,
  borderRightColor: an,
  borderBottomColor: an,
  borderLeftColor: an,
  filter: Sh,
  WebkitFilter: Sh,
  mask: wh,
  WebkitMask: wh
}, IS = (t) => mz[t], pz = /* @__PURE__ */ new Set([Sh, wh]);
function VS(t, a) {
  let s = IS(t);
  return pz.has(s) || (s = da), s.getAnimatableNone ? s.getAnimatableNone(a) : void 0;
}
const gz = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function vz(t, a, s) {
  let i = 0, o;
  for (; i < t.length && !o; ) {
    const u = t[i];
    typeof u == "string" && !gz.has(u) && ei(u).values.length && (o = t[i]), i++;
  }
  if (o && s)
    for (const u of a)
      t[u] = VS(s, o);
}
class yz extends um {
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
      if (typeof v == "string" && (v = v.trim(), rm(v))) {
        const w = kS(v, s.current);
        w !== void 0 && (a[b] = w), b === a.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !OS.has(i) || a.length !== 2)
      return;
    const [o, u] = a, f = wb(o), m = wb(u), y = ob(o), p = ob(u);
    if (y !== p && wr[i]) {
      this.needsMeasurement = !0;
      return;
    }
    if (f !== m)
      if (vb(f) && vb(m))
        for (let b = 0; b < a.length; b++) {
          const v = a[b];
          typeof v == "string" && (a[b] = parseFloat(v));
        }
      else wr[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: s } = this, i = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || cz(a[o])) && i.push(o);
    i.length && vz(a, i, s);
  }
  measureInitialState() {
    const { element: a, unresolvedKeyframes: s, name: i } = this;
    if (!a || !a.current)
      return;
    i === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = wr[i](a.measureViewportBox(), window.getComputedStyle(a.current)), s[0] = this.measuredOrigin;
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
    i[u] = wr[s](a.measureViewportBox(), window.getComputedStyle(a.current)), f !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = f), this.removedTransforms?.length && this.removedTransforms.forEach(([m, y]) => {
      a.getValue(m).set(y);
    }), this.resolveNoneKeyframes();
  }
}
function bz(t, a, s) {
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
const qS = (t, a) => a && typeof t == "number" ? a.transform(t) : t;
function Sc(t) {
  return uk(t) && "offsetHeight" in t && !("ownerSVGElement" in t);
}
const { schedule: xz } = /* @__PURE__ */ cS(queueMicrotask, !1), Sz = {
  y: !1
};
function wz() {
  return Sz.y;
}
function HS(t, a) {
  const s = bz(t), i = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: i.signal
  };
  return [s, o, () => i.abort()];
}
function jz(t) {
  return !(t.pointerType === "touch" || wz());
}
function Ez(t, a, s = {}) {
  const [i, o, u] = HS(t, s);
  return i.forEach((f) => {
    let m = !1, y = !1, p;
    const b = () => {
      f.removeEventListener("pointerleave", j);
    }, v = (R) => {
      p && (p(R), p = void 0), b();
    }, w = (R) => {
      m = !1, window.removeEventListener("pointerup", w), window.removeEventListener("pointercancel", w), y && (y = !1, v(R));
    }, S = () => {
      m = !0, window.addEventListener("pointerup", w, o), window.addEventListener("pointercancel", w, o);
    }, j = (R) => {
      if (R.pointerType !== "touch") {
        if (m) {
          y = !0;
          return;
        }
        v(R);
      }
    }, N = (R) => {
      if (!jz(R))
        return;
      y = !1;
      const T = a(f, R);
      typeof T == "function" && (p = T, f.addEventListener("pointerleave", j, o));
    };
    f.addEventListener("pointerenter", N, o), f.addEventListener("pointerdown", S, o);
  }), u;
}
const FS = (t, a) => a ? t === a ? !0 : FS(t, a.parentElement) : !1, Nz = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, Cz = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function Tz(t) {
  return Cz.has(t.tagName) || t.isContentEditable === !0;
}
const wc = /* @__PURE__ */ new WeakSet();
function Eb(t) {
  return (a) => {
    a.key === "Enter" && t(a);
  };
}
function If(t, a) {
  t.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const Rz = (t, a) => {
  const s = t.currentTarget;
  if (!s)
    return;
  const i = Eb(() => {
    if (wc.has(s))
      return;
    If(s, "down");
    const o = Eb(() => {
      If(s, "up");
    }), u = () => If(s, "cancel");
    s.addEventListener("keyup", o, a), s.addEventListener("blur", u, a);
  });
  s.addEventListener("keydown", i, a), s.addEventListener("blur", () => s.removeEventListener("keydown", i), a);
};
function Nb(t) {
  return Nz(t) && !0;
}
const Cb = /* @__PURE__ */ new WeakSet();
function _z(t, a, s = {}) {
  const [i, o, u] = HS(t, s), f = (m) => {
    const y = m.currentTarget;
    if (!Nb(m) || Cb.has(m))
      return;
    wc.add(y), s.stopPropagation && Cb.add(m);
    const p = a(y, m), b = (S, j) => {
      window.removeEventListener("pointerup", v), window.removeEventListener("pointercancel", w), wc.has(y) && wc.delete(y), Nb(S) && typeof p == "function" && p(S, { success: j });
    }, v = (S) => {
      b(S, y === window || y === document || s.useGlobalTarget || FS(y, S.target));
    }, w = (S) => {
      b(S, !1);
    };
    window.addEventListener("pointerup", v, o), window.addEventListener("pointercancel", w, o);
  };
  return i.forEach((m) => {
    (s.useGlobalTarget ? window : m).addEventListener("pointerdown", f, o), Sc(m) && (m.addEventListener("focus", (p) => Rz(p, o)), !Tz(m) && !m.hasAttribute("tabindex") && (m.tabIndex = 0));
  }), u;
}
const Mz = [...BS, an, da], Az = (t) => Mz.find(US(t)), Tb = () => ({ min: 0, max: 0 }), PS = () => ({
  x: Tb(),
  y: Tb()
}), kz = /* @__PURE__ */ new WeakMap();
function Zc(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function wl(t) {
  return typeof t == "string" || Array.isArray(t);
}
const mm = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], pm = ["initial", ...mm];
function Jc(t) {
  return Zc(t.animate) || pm.some((a) => wl(t[a]));
}
function GS(t) {
  return !!(Jc(t) || t.variants);
}
function Dz(t, a, s) {
  for (const i in a) {
    const o = a[i], u = s[i];
    if (xn(o))
      t.addValue(i, o);
    else if (xn(u))
      t.addValue(i, Dc(o, { owner: t }));
    else if (u !== o)
      if (t.hasValue(i)) {
        const f = t.getValue(i);
        f.liveStyle === !0 ? f.jump(o) : f.hasAnimated || f.set(o);
      } else {
        const f = t.getStaticValue(i);
        t.addValue(i, Dc(f !== void 0 ? f : o, { owner: t }));
      }
  }
  for (const i in s)
    a[i] === void 0 && t.removeValue(i);
  return a;
}
const zc = { current: null }, gm = { current: !1 }, zz = typeof window < "u";
function YS() {
  if (gm.current = !0, !!zz)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), a = () => zc.current = t.matches;
      t.addEventListener("change", a), a();
    } else
      zc.current = !1;
}
const Rb = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let Oc = {};
function KS(t) {
  Oc = t;
}
function Oz() {
  return Oc;
}
class Lz {
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
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = um, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const S = qn.now();
      this.renderScheduledAt < S && (this.renderScheduledAt = S, na.render(this.render, !1, !0));
    };
    const { latestValues: p, renderState: b } = m;
    this.latestValues = p, this.baseTarget = { ...p }, this.initialValues = s.initial ? { ...p } : {}, this.renderState = b, this.parent = a, this.props = s, this.presenceContext = i, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = u, this.options = y, this.blockInitialAnimation = !!f, this.isControllingVariants = Jc(s), this.isVariantNode = GS(s), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: v, ...w } = this.scrapeMotionValuesFromProps(s, {}, this);
    for (const S in w) {
      const j = w[S];
      p[S] !== void 0 && xn(j) && j.set(p[S]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const s in this.initialValues)
        this.values.get(s)?.jump(this.initialValues[s]), this.latestValues[s] = this.initialValues[s];
    this.current = a, kz.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((s, i) => this.bindToMotionValue(i, s)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (gm.current || YS(), this.shouldReduceMotion = zc.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), ih(this.notifyUpdate), ih(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), s.accelerate && MS.has(a) && this.current instanceof HTMLElement) {
      const { factory: f, keyframes: m, times: y, ease: p, duration: b } = s.accelerate, v = new RS({
        element: this.current,
        name: a,
        keyframes: m,
        times: y,
        ease: p,
        duration: /* @__PURE__ */ ta(b)
      }), w = f(v);
      this.valueSubscriptions.set(a, () => {
        w(), v.cancel();
      });
      return;
    }
    const i = ii.has(a);
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
    for (a in Oc) {
      const s = Oc[a];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : PS();
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
    for (let i = 0; i < Rb.length; i++) {
      const o = Rb[i];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const u = "on" + o, f = a[u];
      f && (this.propEventSubscriptions[o] = this.on(o, f));
    }
    this.prevMotionValues = Dz(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return i === void 0 && s !== void 0 && (i = Dc(s === null ? void 0 : s, { owner: this }), this.addValue(a, i)), i;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, s) {
    let i = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return i != null && (typeof i == "string" && (K1(i) || X1(i)) ? i = parseFloat(i) : !Az(i) && da.test(s) && (i = VS(a, s)), this.setBaseTarget(a, xn(i) ? i.get() : i)), xn(i) ? i.get() : i;
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
      const u = dm(this.props, s, this.presenceContext?.custom);
      u && (i = u[a]);
    }
    if (s && i !== void 0)
      return i;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !xn(o) ? o : this.initialValues[a] !== void 0 && i === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, s) {
    return this.events[a] || (this.events[a] = new J1()), this.events[a].add(s);
  }
  notify(a, ...s) {
    this.events[a] && this.events[a].notify(...s);
  }
  scheduleRenderMicrotask() {
    xz.render(this.render);
  }
}
class XS extends Lz {
  constructor() {
    super(...arguments), this.KeyframeResolver = yz;
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
class li {
  constructor(a) {
    this.isMounted = !1, this.node = a;
  }
  update() {
  }
}
function $z({ top: t, left: a, right: s, bottom: i }) {
  return {
    x: { min: a, max: s },
    y: { min: t, max: i }
  };
}
function Uz(t, a) {
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
function Bz(t, a) {
  return $z(Uz(t.getBoundingClientRect(), a));
}
const Iz = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Vz = si.length;
function qz(t, a, s) {
  let i = "", o = !0;
  for (let u = 0; u < Vz; u++) {
    const f = si[u], m = t[f];
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
      const p = qS(m, hm[f]);
      if (!y) {
        o = !1;
        const b = Iz[f] || f;
        i += `${b}(${p}) `;
      }
      s && (a[f] = p);
    }
  }
  return i = i.trim(), s ? i = s(a, o ? "" : i) : o && (i = "none"), i;
}
function vm(t, a, s) {
  const { style: i, vars: o, transformOrigin: u } = t;
  let f = !1, m = !1;
  for (const y in a) {
    const p = a[y];
    if (ii.has(y)) {
      f = !0;
      continue;
    } else if (dS(y)) {
      o[y] = p;
      continue;
    } else {
      const b = qS(p, hm[y]);
      y.startsWith("origin") ? (m = !0, u[y] = b) : i[y] = b;
    }
  }
  if (a.transform || (f || s ? i.transform = qz(a, t.transform, s) : i.transform && (i.transform = "none")), m) {
    const { originX: y = "50%", originY: p = "50%", originZ: b = 0 } = u;
    i.transformOrigin = `${y} ${p} ${b}`;
  }
}
function QS(t, { style: a, vars: s }, i, o) {
  const u = t.style;
  let f;
  for (f in a)
    u[f] = a[f];
  o?.applyProjectionStyles(u, i);
  for (f in s)
    u.setProperty(f, s[f]);
}
function _b(t, a) {
  return a.max === a.min ? 0 : t / (a.max - a.min) * 100;
}
const al = {
  correct: (t, a) => {
    if (!a.target)
      return t;
    if (typeof t == "string")
      if (De.test(t))
        t = parseFloat(t);
      else
        return t;
    const s = _b(t, a.target.x), i = _b(t, a.target.y);
    return `${s}% ${i}%`;
  }
}, Hz = {
  correct: (t, { treeScale: a, projectionDelta: s }) => {
    const i = t, o = da.parse(t);
    if (o.length > 5)
      return i;
    const u = da.createTransformer(t), f = typeof o[0] != "number" ? 1 : 0, m = s.x.scale * a.x, y = s.y.scale * a.y;
    o[0 + f] /= m, o[1 + f] /= y;
    const p = Al(m, y, 0.5);
    return typeof o[2 + f] == "number" && (o[2 + f] /= p), typeof o[3 + f] == "number" && (o[3 + f] /= p), u(o);
  }
}, Fz = {
  borderRadius: {
    ...al,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: al,
  borderTopRightRadius: al,
  borderBottomLeftRadius: al,
  borderBottomRightRadius: al,
  boxShadow: Hz
};
function ZS(t, { layout: a, layoutId: s }) {
  return ii.has(t) || t.startsWith("origin") || (a || s !== void 0) && (!!Fz[t] || t === "opacity");
}
function ym(t, a, s) {
  const i = t.style, o = a?.style, u = {};
  if (!i)
    return u;
  for (const f in i)
    (xn(i[f]) || o && xn(o[f]) || ZS(f, t) || s?.getValue(f)?.liveStyle !== void 0) && (u[f] = i[f]);
  return u;
}
function Pz(t) {
  return window.getComputedStyle(t);
}
class Gz extends XS {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = QS;
  }
  readValueFromInstance(a, s) {
    if (ii.has(s))
      return this.projection?.isProjecting ? hh(s) : gD(a, s);
    {
      const i = Pz(a), o = (dS(s) ? i.getPropertyValue(s) : i[s]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: s }) {
    return Bz(a, s);
  }
  build(a, s, i) {
    vm(a, s, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, s, i) {
    return ym(a, s, i);
  }
}
const Yz = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Kz = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Xz(t, a, s = 1, i = 0, o = !0) {
  t.pathLength = 1;
  const u = o ? Yz : Kz;
  t[u.offset] = `${-i}`, t[u.array] = `${a} ${s}`;
}
const Qz = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function JS(t, {
  attrX: a,
  attrY: s,
  attrScale: i,
  pathLength: o,
  pathSpacing: u = 1,
  pathOffset: f = 0,
  // This is object creation, which we try to avoid per-frame.
  ...m
}, y, p, b) {
  if (vm(t, m, p), y) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: v, style: w } = t;
  v.transform && (w.transform = v.transform, delete v.transform), (w.transform || v.transformOrigin) && (w.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), w.transform && (w.transformBox = b?.transformBox ?? "fill-box", delete v.transformBox);
  for (const S of Qz)
    v[S] !== void 0 && (w[S] = v[S], delete v[S]);
  a !== void 0 && (v.x = a), s !== void 0 && (v.y = s), i !== void 0 && (v.scale = i), o !== void 0 && Xz(v, o, u, f, !1);
}
const WS = /* @__PURE__ */ new Set([
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
]), ew = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function Zz(t, a, s, i) {
  QS(t, a, void 0, i);
  for (const o in a.attrs)
    t.setAttribute(WS.has(o) ? o : fm(o), a.attrs[o]);
}
function tw(t, a, s) {
  const i = ym(t, a, s);
  for (const o in t)
    if (xn(t[o]) || xn(a[o])) {
      const u = si.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      i[u] = t[o];
    }
  return i;
}
class Jz extends XS {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = PS;
  }
  getBaseTargetFromProps(a, s) {
    return a[s];
  }
  readValueFromInstance(a, s) {
    if (ii.has(s)) {
      const i = IS(s);
      return i && i.default || 0;
    }
    return s = WS.has(s) ? s : fm(s), a.getAttribute(s);
  }
  scrapeMotionValuesFromProps(a, s, i) {
    return tw(a, s, i);
  }
  build(a, s, i) {
    JS(a, s, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(a, s, i, o) {
    Zz(a, s, i, o);
  }
  mount(a) {
    this.isSVGTag = ew(a.tagName), super.mount(a);
  }
}
const Wz = pm.length;
function nw(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const s = t.parent ? nw(t.parent) || {} : {};
    return t.props.initial !== void 0 && (s.initial = t.props.initial), s;
  }
  const a = {};
  for (let s = 0; s < Wz; s++) {
    const i = pm[s], o = t.props[i];
    (wl(o) || o === !1) && (a[i] = o);
  }
  return a;
}
function aw(t, a) {
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
const e4 = [...mm].reverse(), t4 = mm.length;
function n4(t) {
  return (a) => Promise.all(a.map(({ animation: s, options: i }) => lz(t, s, i)));
}
function a4(t) {
  let a = n4(t), s = Mb(), i = !0, o = !1;
  const u = (p) => (b, v) => {
    const w = Wr(t, v, p === "exit" ? t.presenceContext?.custom : void 0);
    if (w) {
      const { transition: S, transitionEnd: j, ...N } = w;
      b = { ...b, ...N, ...j };
    }
    return b;
  };
  function f(p) {
    a = p(t);
  }
  function m(p) {
    const { props: b } = t, v = nw(t.parent) || {}, w = [], S = /* @__PURE__ */ new Set();
    let j = {}, N = 1 / 0;
    for (let T = 0; T < t4; T++) {
      const L = e4[T], _ = s[L], C = b[L] !== void 0 ? b[L] : v[L], I = wl(C), Y = L === p ? _.isActive : null;
      Y === !1 && (N = T);
      let ie = C === v[L] && C !== b[L] && I;
      if (ie && (i || o) && t.manuallyAnimateOnMount && (ie = !1), _.protectedKeys = { ...j }, // If it isn't active and hasn't *just* been set as inactive
      !_.isActive && Y === null || // If we didn't and don't have any defined prop for this animation type
      !C && !_.prevProp || // Or if the prop doesn't define an animation
      Zc(C) || typeof C == "boolean")
        continue;
      if (L === "exit" && _.isActive && Y !== !0) {
        _.prevResolvedValues && (j = {
          ...j,
          ..._.prevResolvedValues
        });
        continue;
      }
      const M = r4(_.prevProp, C);
      let V = M || // If we're making this variant active, we want to always make it active
      L === p && _.isActive && !ie && I || // If we removed a higher-priority variant (i is in reverse order)
      T > N && I, D = !1;
      const P = Array.isArray(C) ? C : [C];
      let J = P.reduce(u(L), {});
      Y === !1 && (J = {});
      const { prevResolvedValues: Z = {} } = _, G = {
        ...Z,
        ...J
      }, re = (U) => {
        V = !0, S.has(U) && (D = !0, S.delete(U)), _.needsAnimating[U] = !0;
        const se = t.getValue(U);
        se && (se.liveStyle = !1);
      };
      for (const U in G) {
        const se = J[U], de = Z[U];
        if (j.hasOwnProperty(U))
          continue;
        let k = !1;
        bh(se) && bh(de) ? k = !aw(se, de) : k = se !== de, k ? se != null ? re(U) : S.add(U) : se !== void 0 && S.has(U) ? re(U) : _.protectedKeys[U] = !0;
      }
      _.prevProp = C, _.prevResolvedValues = J, _.isActive && (j = { ...j, ...J }), (i || o) && t.blockInitialAnimation && (V = !1);
      const A = ie && M;
      V && (!A || D) && w.push(...P.map((U) => {
        const se = { type: L };
        if (typeof U == "string" && (i || o) && !A && t.manuallyAnimateOnMount && t.parent) {
          const { parent: de } = t, k = Wr(de, U);
          if (de.enteringChildren && k) {
            const { delayChildren: ee } = k.transition || {};
            se.delay = AS(de.enteringChildren, t, ee);
          }
        }
        return {
          animation: U,
          options: se
        };
      }));
    }
    if (S.size) {
      const T = {};
      if (typeof b.initial != "boolean") {
        const L = Wr(t, Array.isArray(b.initial) ? b.initial[0] : b.initial);
        L && L.transition && (T.transition = L.transition);
      }
      S.forEach((L) => {
        const _ = t.getBaseTarget(L), C = t.getValue(L);
        C && (C.liveStyle = !0), T[L] = _ ?? null;
      }), w.push({ animation: T });
    }
    let R = !!w.length;
    return i && (b.initial === !1 || b.initial === b.animate) && !t.manuallyAnimateOnMount && (R = !1), i = !1, o = !1, R ? a(w) : Promise.resolve();
  }
  function y(p, b) {
    if (s[p].isActive === b)
      return Promise.resolve();
    t.variantChildren?.forEach((w) => w.animationState?.setActive(p, b)), s[p].isActive = b;
    const v = m(p);
    for (const w in s)
      s[w].protectedKeys = {};
    return v;
  }
  return {
    animateChanges: m,
    setActive: y,
    setAnimateFunction: f,
    getState: () => s,
    reset: () => {
      s = Mb(), o = !0;
    }
  };
}
function r4(t, a) {
  return typeof a == "string" ? a !== t : Array.isArray(a) ? !aw(a, t) : !1;
}
function Gr(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Mb() {
  return {
    animate: Gr(!0),
    whileInView: Gr(),
    whileHover: Gr(),
    whileTap: Gr(),
    whileDrag: Gr(),
    whileFocus: Gr(),
    exit: Gr()
  };
}
function Ab(t, a, s, i = { passive: !0 }) {
  return t.addEventListener(a, s, i), () => t.removeEventListener(a, s);
}
function s4(t) {
  return xn(t) ? t.get() : t;
}
const bm = g.createContext({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function kb(t, a) {
  if (typeof t == "function")
    return t(a);
  t != null && (t.current = a);
}
function i4(...t) {
  return (a) => {
    let s = !1;
    const i = t.map((o) => {
      const u = kb(o, a);
      return !s && typeof u == "function" && (s = !0), u;
    });
    if (s)
      return () => {
        for (let o = 0; o < i.length; o++) {
          const u = i[o];
          typeof u == "function" ? u() : kb(t[o], null);
        }
      };
  };
}
function l4(...t) {
  return g.useCallback(i4(...t), t);
}
class o4 extends g.Component {
  getSnapshotBeforeUpdate(a) {
    const s = this.props.childRef.current;
    if (Sc(s) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const i = s.offsetParent, o = Sc(i) && i.offsetWidth || 0, u = Sc(i) && i.offsetHeight || 0, f = getComputedStyle(s), m = this.props.sizeRef.current;
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
function c4({ children: t, isPresent: a, anchorX: s, anchorY: i, root: o, pop: u }) {
  const f = g.useId(), m = g.useRef(null), y = g.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: p } = g.useContext(bm), b = t.props?.ref ?? t?.ref, v = l4(m, b);
  return g.useInsertionEffect(() => {
    const { width: w, height: S, top: j, left: N, right: R, bottom: T } = y.current;
    if (a || u === !1 || !m.current || !w || !S)
      return;
    const L = s === "left" ? `left: ${N}` : `right: ${R}`, _ = i === "bottom" ? `bottom: ${T}` : `top: ${j}`;
    m.current.dataset.motionPopId = f;
    const C = document.createElement("style");
    p && (C.nonce = p);
    const I = o ?? document.head;
    return I.appendChild(C), C.sheet && C.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${w}px !important;
            height: ${S}px !important;
            ${L}px !important;
            ${_}px !important;
          }
        `), () => {
      m.current?.removeAttribute("data-motion-pop-id"), I.contains(C) && I.removeChild(C);
    };
  }, [a]), c.jsx(o4, { isPresent: a, childRef: m, sizeRef: y, pop: u, children: u === !1 ? t : g.cloneElement(t, { ref: v }) });
}
const u4 = ({ children: t, initial: a, isPresent: s, onExitComplete: i, custom: o, presenceAffectsLayout: u, mode: f, anchorX: m, anchorY: y, root: p }) => {
  const b = tm(d4), v = g.useId();
  let w = !0, S = g.useMemo(() => (w = !1, {
    id: v,
    initial: a,
    isPresent: s,
    custom: o,
    onExitComplete: (j) => {
      b.set(j, !0);
      for (const N of b.values())
        if (!N)
          return;
      i && i();
    },
    register: (j) => (b.set(j, !1), () => b.delete(j))
  }), [s, b, i]);
  return u && w && (S = { ...S }), g.useMemo(() => {
    b.forEach((j, N) => b.set(N, !1));
  }, [s]), g.useEffect(() => {
    !s && !b.size && i && i();
  }, [s]), t = c.jsx(c4, { pop: f === "popLayout", isPresent: s, anchorX: m, anchorY: y, root: p, children: t }), c.jsx(Kc.Provider, { value: S, children: t });
};
function d4() {
  return /* @__PURE__ */ new Map();
}
function f4(t = !0) {
  const a = g.useContext(Kc);
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
const rc = (t) => t.key || "";
function Db(t) {
  const a = [];
  return g.Children.forEach(t, (s) => {
    g.isValidElement(s) && a.push(s);
  }), a;
}
const rw = ({ children: t, custom: a, initial: s = !0, onExitComplete: i, presenceAffectsLayout: o = !0, mode: u = "sync", propagate: f = !1, anchorX: m = "left", anchorY: y = "top", root: p }) => {
  const [b, v] = f4(f), w = g.useMemo(() => Db(t), [t]), S = f && !b ? [] : w.map(rc), j = g.useRef(!0), N = g.useRef(w), R = tm(() => /* @__PURE__ */ new Map()), T = g.useRef(/* @__PURE__ */ new Set()), [L, _] = g.useState(w), [C, I] = g.useState(w);
  Y1(() => {
    j.current = !1, N.current = w;
    for (let M = 0; M < C.length; M++) {
      const V = rc(C[M]);
      S.includes(V) ? (R.delete(V), T.current.delete(V)) : R.get(V) !== !0 && R.set(V, !1);
    }
  }, [C, S.length, S.join("-")]);
  const Y = [];
  if (w !== L) {
    let M = [...w];
    for (let V = 0; V < C.length; V++) {
      const D = C[V], P = rc(D);
      S.includes(P) || (M.splice(V, 0, D), Y.push(D));
    }
    return u === "wait" && Y.length && (M = Y), I(Db(M)), _(w), null;
  }
  const { forceRender: ie } = g.useContext(G1);
  return c.jsx(c.Fragment, { children: C.map((M) => {
    const V = rc(M), D = f && !b ? !1 : w === C || S.includes(V), P = () => {
      if (T.current.has(V))
        return;
      if (R.has(V))
        T.current.add(V), R.set(V, !0);
      else
        return;
      let J = !0;
      R.forEach((Z) => {
        Z || (J = !1);
      }), J && (ie?.(), I(N.current), f && v?.(), i && i());
    };
    return c.jsx(u4, { isPresent: D, initial: !j.current || s ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: u, root: p, onExitComplete: D ? void 0 : P, anchorX: m, anchorY: y, children: M }, V);
  }) });
}, xm = g.createContext({ strict: !1 }), zb = {
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
let Ob = !1;
function h4() {
  if (Ob)
    return;
  const t = {};
  for (const a in zb)
    t[a] = {
      isEnabled: (s) => zb[a].some((i) => !!s[i])
    };
  KS(t), Ob = !0;
}
function sw() {
  return h4(), Oz();
}
function jh(t) {
  const a = sw();
  for (const s in t)
    a[s] = {
      ...a[s],
      ...t[s]
    };
  KS(a);
}
function Sm({ children: t, features: a, strict: s = !1 }) {
  const [, i] = g.useState(!Vf(a)), o = g.useRef(void 0);
  if (!Vf(a)) {
    const { renderer: u, ...f } = a;
    o.current = u, jh(f);
  }
  return g.useEffect(() => {
    Vf(a) && a().then(({ renderer: u, ...f }) => {
      jh(f), o.current = u, i(!0);
    });
  }, []), c.jsx(xm.Provider, { value: { renderer: o.current, strict: s }, children: t });
}
function Vf(t) {
  return typeof t == "function";
}
const m4 = /* @__PURE__ */ new Set([
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
function Lc(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || m4.has(t);
}
let iw = (t) => !Lc(t);
function p4(t) {
  typeof t == "function" && (iw = (a) => a.startsWith("on") ? !Lc(a) : t(a));
}
try {
  p4(require("@emotion/is-prop-valid").default);
} catch {
}
function g4(t, a, s) {
  const i = {};
  for (const o in t)
    o === "values" && typeof t.values == "object" || xn(t[o]) || (iw(o) || s === !0 && Lc(o) || !a && !Lc(o) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && o.startsWith("onDrag")) && (i[o] = t[o]);
  return i;
}
const Wc = /* @__PURE__ */ g.createContext({});
function v4(t, a) {
  if (Jc(t)) {
    const { initial: s, animate: i } = t;
    return {
      initial: s === !1 || wl(s) ? s : void 0,
      animate: wl(i) ? i : void 0
    };
  }
  return t.inherit !== !1 ? a : {};
}
function y4(t) {
  const { initial: a, animate: s } = v4(t, g.useContext(Wc));
  return g.useMemo(() => ({ initial: a, animate: s }), [Lb(a), Lb(s)]);
}
function Lb(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const wm = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function lw(t, a, s) {
  for (const i in a)
    !xn(a[i]) && !ZS(i, s) && (t[i] = a[i]);
}
function b4({ transformTemplate: t }, a) {
  return g.useMemo(() => {
    const s = wm();
    return vm(s, a, t), Object.assign({}, s.vars, s.style);
  }, [a]);
}
function x4(t, a) {
  const s = t.style || {}, i = {};
  return lw(i, s, t), Object.assign(i, b4(t, a)), i;
}
function S4(t, a) {
  const s = {}, i = x4(t, a);
  return t.drag && t.dragListener !== !1 && (s.draggable = !1, i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none", i.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (s.tabIndex = 0), s.style = i, s;
}
const ow = () => ({
  ...wm(),
  attrs: {}
});
function w4(t, a, s, i) {
  const o = g.useMemo(() => {
    const u = ow();
    return JS(u, a, ew(i), t.transformTemplate, t.style), {
      ...u.attrs,
      style: { ...u.style }
    };
  }, [a]);
  if (t.style) {
    const u = {};
    lw(u, t.style, t), o.style = { ...u, ...o.style };
  }
  return o;
}
const j4 = [
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
function jm(t) {
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
      !!(j4.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function E4(t, a, s, { latestValues: i }, o, u = !1, f) {
  const y = (f ?? jm(t) ? w4 : S4)(a, i, o, t), p = g4(a, typeof t == "string", u), b = t !== g.Fragment ? { ...p, ...y, ref: s } : {}, { children: v } = a, w = g.useMemo(() => xn(v) ? v.get() : v, [v]);
  return g.createElement(t, {
    ...b,
    children: w
  });
}
function N4({ scrapeMotionValuesFromProps: t, createRenderState: a }, s, i, o) {
  return {
    latestValues: C4(s, i, o, t),
    renderState: a()
  };
}
function C4(t, a, s, i) {
  const o = {}, u = i(t, {});
  for (const w in u)
    o[w] = s4(u[w]);
  let { initial: f, animate: m } = t;
  const y = Jc(t), p = GS(t);
  a && p && !y && t.inherit !== !1 && (f === void 0 && (f = a.initial), m === void 0 && (m = a.animate));
  let b = s ? s.initial === !1 : !1;
  b = b || f === !1;
  const v = b ? m : f;
  if (v && typeof v != "boolean" && !Zc(v)) {
    const w = Array.isArray(v) ? v : [v];
    for (let S = 0; S < w.length; S++) {
      const j = dm(t, w[S]);
      if (j) {
        const { transitionEnd: N, transition: R, ...T } = j;
        for (const L in T) {
          let _ = T[L];
          if (Array.isArray(_)) {
            const C = b ? _.length - 1 : 0;
            _ = _[C];
          }
          _ !== null && (o[L] = _);
        }
        for (const L in N)
          o[L] = N[L];
      }
    }
  }
  return o;
}
const cw = (t) => (a, s) => {
  const i = g.useContext(Wc), o = g.useContext(Kc), u = () => N4(t, a, i, o);
  return s ? u() : tm(u);
}, T4 = /* @__PURE__ */ cw({
  scrapeMotionValuesFromProps: ym,
  createRenderState: wm
}), R4 = /* @__PURE__ */ cw({
  scrapeMotionValuesFromProps: tw,
  createRenderState: ow
}), _4 = Symbol.for("motionComponentSymbol");
function M4(t, a, s) {
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
const A4 = g.createContext({});
function k4(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function D4(t, a, s, i, o, u) {
  const { visualElement: f } = g.useContext(Wc), m = g.useContext(xm), y = g.useContext(Kc), p = g.useContext(bm), b = p.reducedMotion, v = p.skipAnimations, w = g.useRef(null), S = g.useRef(!1);
  i = i || m.renderer, !w.current && i && (w.current = i(t, {
    visualState: a,
    parent: f,
    props: s,
    presenceContext: y,
    blockInitialAnimation: y ? y.initial === !1 : !1,
    reducedMotionConfig: b,
    skipAnimations: v,
    isSVG: u
  }), S.current && w.current && (w.current.manuallyAnimateOnMount = !0));
  const j = w.current, N = g.useContext(A4);
  j && !j.projection && o && (j.type === "html" || j.type === "svg") && z4(w.current, s, o, N);
  const R = g.useRef(!1);
  g.useInsertionEffect(() => {
    j && R.current && j.update(s, y);
  });
  const T = s[LS], L = g.useRef(!!T && typeof window < "u" && !window.MotionHandoffIsComplete?.(T) && window.MotionHasOptimisedAnimation?.(T));
  return Y1(() => {
    S.current = !0, j && (R.current = !0, window.MotionIsMounted = !0, j.updateFeatures(), j.scheduleRenderMicrotask(), L.current && j.animationState && j.animationState.animateChanges());
  }), g.useEffect(() => {
    j && (!L.current && j.animationState && j.animationState.animateChanges(), L.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(T);
    }), L.current = !1), j.enteringChildren = void 0);
  }), j;
}
function z4(t, a, s, i) {
  const { layoutId: o, layout: u, drag: f, dragConstraints: m, layoutScroll: y, layoutRoot: p, layoutAnchor: b, layoutCrossfade: v } = a;
  t.projection = new s(t.latestValues, a["data-framer-portal-id"] ? void 0 : uw(t.parent)), t.projection.setOptions({
    layoutId: o,
    layout: u,
    alwaysMeasureLayout: !!f || m && k4(m),
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
function uw(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : uw(t.parent);
}
function qf(t, { forwardMotionProps: a = !1, type: s } = {}, i, o) {
  i && jh(i);
  const u = s ? s === "svg" : jm(t), f = u ? R4 : T4;
  function m(p, b) {
    let v;
    const w = {
      ...g.useContext(bm),
      ...p,
      layoutId: O4(p)
    }, { isStatic: S } = w, j = y4(p), N = f(p, S);
    if (!S && typeof window < "u") {
      L4();
      const R = $4(w);
      v = R.MeasureLayout, j.visualElement = D4(t, N, w, o, R.ProjectionNode, u);
    }
    return c.jsxs(Wc.Provider, { value: j, children: [v && j.visualElement ? c.jsx(v, { visualElement: j.visualElement, ...w }) : null, E4(t, p, M4(N, j.visualElement, b), N, S, a, u)] });
  }
  m.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const y = g.forwardRef(m);
  return y[_4] = t, y;
}
function O4({ layoutId: t }) {
  const a = g.useContext(G1).id;
  return a && t !== void 0 ? a + "-" + t : t;
}
function L4(t, a) {
  g.useContext(xm).strict;
}
function $4(t) {
  const a = sw(), { drag: s, layout: i } = a;
  if (!s && !i)
    return {};
  const o = { ...s, ...i };
  return {
    MeasureLayout: s?.isEnabled(t) || i?.isEnabled(t) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function U4(t, a) {
  if (typeof Proxy > "u")
    return qf;
  const s = /* @__PURE__ */ new Map(), i = (u, f) => qf(u, f, t, a), o = (u, f) => i(u, f);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (u, f) => f === "create" ? i : (s.has(f) || s.set(f, qf(f, void 0, t, a)), s.get(f))
  });
}
const Em = /* @__PURE__ */ U4(), B4 = (t, a) => a.isSVG ?? jm(t) ? new Jz(a) : new Gz(a, {
  allowProjection: t !== g.Fragment
});
class I4 extends li {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = a4(a));
  }
  updateAnimationControlsSubscription() {
    const { animate: a } = this.node.getProps();
    Zc(a) && (this.unmountControls = a.subscribe(this.node));
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
let V4 = 0;
class q4 extends li {
  constructor() {
    super(...arguments), this.id = V4++, this.isExitComplete = !1;
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
          const m = Wr(this.node, u, f);
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
const H4 = {
  animation: {
    Feature: I4
  },
  exit: {
    Feature: q4
  }
};
function dw(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
function $b(t, a, s) {
  const { props: i } = t;
  t.animationState && i.whileHover && t.animationState.setActive("whileHover", s === "Start");
  const o = "onHover" + s, u = i[o];
  u && na.postRender(() => u(a, dw(a)));
}
class F4 extends li {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = Ez(a, (s, i) => ($b(this.node, i, "Start"), (o) => $b(this.node, o, "End"))));
  }
  unmount() {
  }
}
class P4 extends li {
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
    this.unmount = Xc(Ab(this.node.current, "focus", () => this.onFocus()), Ab(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Ub(t, a, s) {
  const { props: i } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && i.whileTap && t.animationState.setActive("whileTap", s === "Start");
  const o = "onTap" + (s === "End" ? "" : s), u = i[o];
  u && na.postRender(() => u(a, dw(a)));
}
class G4 extends li {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: s, propagate: i } = this.node.props;
    this.unmount = _z(a, (o, u) => (Ub(this.node, u, "Start"), (f, { success: m }) => Ub(this.node, f, m ? "End" : "Cancel")), {
      useGlobalTarget: s,
      stopPropagation: i?.tap === !1
    });
  }
  unmount() {
  }
}
const Eh = /* @__PURE__ */ new WeakMap(), Hf = /* @__PURE__ */ new WeakMap(), Y4 = (t) => {
  const a = Eh.get(t.target);
  a && a(t);
}, K4 = (t) => {
  t.forEach(Y4);
};
function X4({ root: t, ...a }) {
  const s = t || document;
  Hf.has(s) || Hf.set(s, {});
  const i = Hf.get(s), o = JSON.stringify(a);
  return i[o] || (i[o] = new IntersectionObserver(K4, { root: t, ...a })), i[o];
}
function Q4(t, a, s) {
  const i = X4(a);
  return Eh.set(t, s), i.observe(t), () => {
    Eh.delete(t), i.unobserve(t);
  };
}
const Z4 = {
  some: 0,
  all: 1
};
class J4 extends li {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: s, margin: i, amount: o = "some", once: u } = a, f = {
      root: s ? s.current : void 0,
      rootMargin: i,
      threshold: typeof o == "number" ? o : Z4[o]
    }, m = (y) => {
      const { isIntersecting: p } = y;
      if (this.isInView === p || (this.isInView = p, u && !p && this.hasEnteredView))
        return;
      p && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", p);
      const { onViewportEnter: b, onViewportLeave: v } = this.node.getProps(), w = p ? b : v;
      w && w(y);
    };
    this.stopObserver = Q4(this.node.current, f, m);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: s } = this.node;
    ["amount", "margin", "root"].some(W4(a, s)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function W4({ viewport: t = {} }, { viewport: a = {} } = {}) {
  return (s) => t[s] !== a[s];
}
const eO = {
  inView: {
    Feature: J4
  },
  tap: {
    Feature: G4
  },
  focus: {
    Feature: P4
  },
  hover: {
    Feature: F4
  }
}, Nm = {
  renderer: B4,
  ...H4,
  ...eO
};
function tO() {
  !gm.current && YS();
  const [t] = g.useState(zc.current);
  return t;
}
const Nh = "emotion-tts:trigger-generate", Ch = "emotion-tts:run-state", Th = "emotion-tts:run-completed";
function nO() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Nh));
}
function aO(t) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Ch, { detail: t }));
}
function rO(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(Nh, t), () => window.removeEventListener(Nh, t));
}
function fw(t) {
  if (typeof window > "u") return () => {
  };
  const a = (s) => {
    const i = s.detail;
    i && t(i);
  };
  return window.addEventListener(Ch, a), () => window.removeEventListener(Ch, a);
}
function Bb() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Th));
}
function sO(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(Th, t), () => window.removeEventListener(Th, t));
}
var iO = "wksjad0", lO = "wksjad1", oO = "wksjad2", cO = "wksjad3", uO = "wksjad4", dO = "wksjad5", fO = "wksjad6", hO = "wksjad7", mO = "wksjad8", pO = "wksjad9", gO = "wksjada", vO = "wksjadb", yO = "wksjadc", bO = "wksjadd", xO = "wksjade", SO = "wksjadf", wO = "wksjadg", Ff = "wksjadh", jO = "wksjadi", EO = "wksjadj", NO = "wksjadk", CO = "wksjadl", TO = "wksjadm", RO = "wksjadn";
const Rh = 5, _O = 5e-3;
function hw(t, a = "") {
  return `${Sa}/deployments/${t}/artifacts${a}`;
}
function MO(t) {
  const [a, s] = g.useState([]), [i, o] = g.useState(!1), [u, f] = g.useState(null), [m, y] = g.useState(0), p = g.useRef(null), b = g.useRef(!1), v = g.useCallback(() => y((w) => w + 1), []);
  return g.useEffect(() => {
    p.current?.abort();
    const w = new AbortController();
    return p.current = w, o(!0), f(null), fetch(`${hw(t)}?limit=${Rh}`, {
      headers: { accept: "application/json" },
      signal: w.signal
    }).then(async (S) => {
      if (!S.ok)
        throw new Error(`HTTP ${S.status}`);
      const j = await S.json();
      w.signal.aborted || s(j.artifacts.slice(0, Rh));
    }).catch((S) => {
      if (w.signal.aborted) return;
      const j = S instanceof Error ? S.message : "fetch failed";
      f(j);
    }).finally(() => {
      w.signal.aborted || o(!1);
    }), () => w.abort();
  }, [t, m]), g.useEffect(() => fw((w) => {
    const S = b.current;
    b.current = w.busy, S && !w.busy && v();
  }), [v]), { rows: a, loading: i, error: u, refetch: v, tick: m };
}
function AO(t, a) {
  const [s, i] = g.useState(() => /* @__PURE__ */ new Map());
  return g.useEffect(() => {
    let o = !1;
    return Qs(t).then(({ voiceAssets: u }) => {
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
function kO({
  deploymentId: t,
  speedFactor: a
}) {
  const { rows: s, loading: i, error: o, refetch: u, tick: f } = MO(t), m = AO(t, f), [y, p] = g.useState(null), b = tO(), v = g.useCallback(() => {
    p(null), u();
  }, [u]), w = s;
  return !i && !o && w.length === 0 ? null : /* @__PURE__ */ c.jsxs("section", { className: iO, "aria-labelledby": "recent-gen-eyebrow", children: [
    /* @__PURE__ */ c.jsxs("header", { className: lO, children: [
      /* @__PURE__ */ c.jsx("span", { className: oO, id: "recent-gen-eyebrow", children: "Recent generations" }),
      /* @__PURE__ */ c.jsxs("span", { className: cO, children: [
        /* @__PURE__ */ c.jsx("span", { className: uO, children: w.length }),
        /* @__PURE__ */ c.jsxs("span", { className: dO, children: [
          "last ",
          Rh
        ] }),
        /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: fO,
            onClick: v,
            "aria-label": "Refresh",
            title: "Refresh",
            children: "↻"
          }
        )
      ] })
    ] }),
    o && /* @__PURE__ */ c.jsx("div", { className: RO, role: "alert", children: o }),
    /* @__PURE__ */ c.jsx(Sm, { features: Nm, strict: !0, children: /* @__PURE__ */ c.jsx("ul", { className: hO, children: /* @__PURE__ */ c.jsx(rw, { initial: !1, children: w.map((S) => {
      const j = y === S.utteranceId, N = hw(
        t,
        `/${S.utteranceId}/download`
      ), R = S.voiceAssetId ? m.get(S.voiceAssetId) ?? null : null;
      return /* @__PURE__ */ c.jsxs(
        Em.li,
        {
          className: mO,
          initial: b ? { opacity: 1 } : { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: b ? { opacity: 0 } : { opacity: 0, y: 6 },
          transition: {
            duration: b ? 0 : 0.18,
            ease: [0.2, 0, 0, 1]
          },
          "data-playing": j || void 0,
          children: [
            /* @__PURE__ */ c.jsxs("div", { className: pO, children: [
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: gO,
                  onClick: () => p(
                    (T) => T === S.utteranceId ? null : S.utteranceId
                  ),
                  "aria-label": "Preview",
                  "aria-pressed": j,
                  children: j ? "■" : "▶"
                }
              ),
              /* @__PURE__ */ c.jsxs("div", { className: vO, children: [
                /* @__PURE__ */ c.jsxs("div", { className: yO, children: [
                  /* @__PURE__ */ c.jsx("span", { className: bO, children: S.characterDisplay }),
                  /* @__PURE__ */ c.jsx("span", { className: xO, title: S.text, children: S.text })
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: SO, children: [
                  /* @__PURE__ */ c.jsx("span", { className: wO, children: zO(S.finishedAt) }),
                  R && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    /* @__PURE__ */ c.jsx("span", { className: Ff, "aria-hidden": "true", children: "·" }),
                    /* @__PURE__ */ c.jsx("span", { className: jO, children: R })
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: Ff, "aria-hidden": "true", children: "·" }),
                  /* @__PURE__ */ c.jsx("span", { className: EO, children: DO(S.durationMs) }),
                  a !== void 0 && Math.abs(a - 1) > _O && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    /* @__PURE__ */ c.jsx("span", { className: Ff, "aria-hidden": "true", children: "·" }),
                    /* @__PURE__ */ c.jsxs("span", { className: NO, children: [
                      a.toFixed(2),
                      "×"
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ c.jsx(
                "a",
                {
                  className: CO,
                  href: N,
                  download: S.filename,
                  "aria-label": `Download ${S.filename}`,
                  title: "Download",
                  children: "↓"
                }
              )
            ] }),
            j && /* @__PURE__ */ c.jsx(
              "audio",
              {
                className: TO,
                src: N,
                controls: !0,
                autoPlay: !0,
                preload: "auto",
                children: /* @__PURE__ */ c.jsx("track", { kind: "captions" })
              }
            )
          ]
        },
        S.utteranceId
      );
    }) }) }) })
  ] });
}
function DO(t) {
  if (t == null || t <= 0) return "—";
  const a = Math.round(t / 1e3), s = Math.floor(a / 60), i = a % 60;
  return s > 0 ? `${s}:${i.toString().padStart(2, "0")}` : `${i}s`;
}
function zO(t) {
  if (!t) return "—";
  const s = Math.floor(Date.now() / 1e3) - t;
  return s < 0 ? "just now" : s < 60 ? `${s}s ago` : s < 3600 ? `${Math.floor(s / 60)}m ago` : s < 86400 ? `${Math.floor(s / 3600)}h ago` : s < 604800 ? `${Math.floor(s / 86400)}d ago` : new Date(t * 1e3).toLocaleDateString(void 0, { month: "short", day: "numeric" });
}
const OO = 6e3;
function LO(t) {
  const a = /* @__PURE__ */ new Map();
  for (const s of t)
    a.set(s.jobId, { jobId: s.jobId, runId: null, label: s.label, status: "queued" });
  return a;
}
function $O(t, a, s) {
  const i = t.find((u) => u.runId === a);
  if (!i) return null;
  const o = s - 1;
  return o < 0 || o >= i.jobs.length ? null : i.jobs[o]?.jobId ?? null;
}
function UO(t, a, s) {
  if (s.type === "run_terminal") return t;
  const i = $O(a, s.runId, s.globalIndex);
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
function BO(t) {
  return t === "done" || t === "failed" || t === "cancelled";
}
function IO(t) {
  if (t.size === 0) return !1;
  for (const a of t.values())
    if (!BO(a.status)) return !1;
  return !0;
}
function VO(t) {
  let a = 0, s = 0;
  for (const i of t.values())
    i.status === "done" && typeof i.durationMs == "number" && (a += i.durationMs, s += 1);
  return s > 0 ? a / s : OO;
}
function Ib(t, a) {
  const s = VO(t), i = new Map(t);
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
function qO(t) {
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
      failureCategory: s.failureCategory
    });
  return a;
}
function HO(t) {
  const a = { queued: 0, generating: 0, done: 0, failed: 0, cancelled: 0 };
  for (const s of t.values())
    a[s.status] += 1;
  return a;
}
function FO(t) {
  return t === window ? window.scrollY || document.documentElement.scrollTop || 0 : t.scrollTop;
}
function mw() {
  const t = [window];
  if (typeof document > "u") return t;
  let a = document.querySelector("emotion-tts-app");
  for (; a; ) {
    const s = window.getComputedStyle(a);
    (/(auto|scroll|overlay)/.test(s.overflowY) || /(auto|scroll|overlay)/.test(s.overflow)) && t.push(a), a = a.parentElement;
  }
  return t;
}
function PO() {
  if (typeof window > "u") return;
  const t = mw();
  for (const a of t)
    a === window ? window.scrollTo({ top: 0, behavior: "smooth" }) : a.scrollTo({ top: 0, behavior: "smooth" });
}
function pw(t) {
  const [a, s] = g.useState(!1);
  return g.useEffect(() => {
    if (typeof window > "u") return;
    const i = mw(), o = () => {
      const f = i.reduce((m, y) => {
        const p = FO(y);
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
const gw = 360;
var GO = "_1s59p180", YO = "_1s59p181", KO = "_1s59p182", XO = "_1s59p183", QO = "_1s59p184", ZO = "_1s59p185", JO = "_1s59p186", WO = "_1s59p188", eL = "_1s59p189", Vb = "_1s59p18a", tL = "_1s59p18c", nL = "_1s59p18d", aL = "_1s59p18e", rL = "_1s59p18f", sL = "_1s59p18g", iL = "_1s59p18i", lL = "_1s59p18j", oL = "_1s59p18k", cL = "_1s59p18l", uL = "_1s59p18n", dL = "_1s59p18o", fL = "_1s59p18p", hL = "_1s59p18q", mL = "_1s59p18r", pL = "_1s59p18s", gL = "_1s59p18t", qb = "_1s59p18u", vL = "_1s59p18v", yL = "_1s59p18x";
const bL = 4e3;
function xL(t) {
  const a = ti(), s = t.storyboardJobs, i = (s?.length ?? 0) > 0, [o, u] = g.useState("idle"), [f, m] = g.useState(null), [y, p] = g.useState(/* @__PURE__ */ new Map()), [b, v] = g.useState(/* @__PURE__ */ new Map()), [w, S] = g.useState([]), [j, N] = g.useState(null), [R, T] = g.useState(null), [L, _] = g.useState(null), C = g.useRef(null), I = g.useRef([]), Y = g.useRef([]), ie = g.useRef(!1);
  g.useEffect(() => {
    Y.current = w;
  }, [w]);
  const M = g.useCallback(() => {
    C.current?.(), C.current = null;
    for (const Re of I.current) Re();
    I.current = [];
  }, []);
  g.useEffect(() => () => {
    M();
  }, [M]), g.useEffect(() => {
    let Re = !1;
    const He = async () => {
      try {
        const Nt = await vl();
        Re || _(Nt);
      } catch {
      }
    };
    He();
    const We = window.setInterval(He, bL);
    return () => {
      Re = !0, window.clearInterval(We);
    };
  }, []), g.useEffect(() => {
    aO({ busy: o === "starting" || o === "running" });
  }, [o]), g.useEffect(() => {
    t.onJobProgressChange && t.onJobProgressChange(qO(b));
  }, [b, t.onJobProgressChange]);
  const V = g.useCallback(
    (Re) => {
      const He = Re.status;
      (He === "completed" || He === "partial") && (Bb(), pn.success(
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
    const Re = s ?? [];
    u("starting"), N(null), p(/* @__PURE__ */ new Map()), T(null), m(null), ie.current = !1, M();
    const He = Math.max(1, L?.workersActive ?? 1), We = NT([...Re], He), Nt = We.map((at) => ({
      ...t.createPayload,
      prebuiltSegments: at.map((Xe) => Xe.segment)
    }));
    try {
      const Xe = (await ET(t.deploymentId, Nt)).map((we, Te) => ({
        runId: we.runId,
        jobs: We[Te] ?? []
      }));
      Y.current = Xe, S(Xe), v(Ib(LO(Re), Xe)), u("running");
      const gt = Xe.map(
        (we) => bf(
          t.deploymentId,
          we.runId,
          (Te) => {
            v((Ge) => {
              const Ye = UO(Ge, Y.current, Te), yt = Ib(Ye, Y.current);
              return IO(yt) && !ie.current && (ie.current = !0, M(), u("terminal"), Bb()), yt;
            });
          },
          () => u("error")
        )
      );
      I.current = gt;
    } catch (at) {
      u("error"), N(sc(at));
    }
  }, [
    s,
    L?.workersActive,
    t.deploymentId,
    t.createPayload,
    M
  ]), P = g.useCallback(async () => {
    u("starting"), N(null), p(/* @__PURE__ */ new Map()), T(null);
    try {
      const Re = await E1(t.deploymentId, t.createPayload);
      m(Re.runId), u("running"), M(), C.current = bf(
        t.deploymentId,
        Re.runId,
        (He) => Fb(
          He,
          p,
          u,
          (We) => {
            T(We), V(We);
          },
          t.deploymentId,
          Re.runId
        ),
        () => u("error")
      );
    } catch (Re) {
      u("error"), N(sc(Re));
    }
  }, [t.deploymentId, t.createPayload, V, M]), J = g.useCallback(async () => {
    i ? await D() : await P();
  }, [i, D, P]);
  g.useEffect(() => rO(() => {
    (o === "idle" || o === "terminal" || o === "error") && J();
  }), [o, J]);
  const Z = g.useCallback(async () => {
    if (i) {
      const Re = Y.current.map((He) => He.runId);
      await Promise.all(
        Re.map(
          (He) => Xy(t.deploymentId, He).catch(() => {
          })
        )
      ), ie.current = !0, M(), v((He) => {
        const We = new Map(He);
        for (const [Nt, at] of He)
          (at.status === "queued" || at.status === "generating") && We.set(Nt, {
            ...at,
            status: "cancelled",
            queuePosition: void 0,
            etaMs: void 0
          });
        return We;
      }), u("terminal");
      return;
    }
    if (f)
      try {
        await Xy(t.deploymentId, f);
      } catch (Re) {
        N(sc(Re));
      }
  }, [i, t.deploymentId, f, M]), G = Array.from(y.values()).sort((Re, He) => Re.globalIndex - He.globalIndex), re = g.useMemo(
    () => (s ?? []).map((Re) => b.get(Re.jobId)).filter((Re) => Re != null),
    [s, b]
  ), A = g.useMemo(() => HO(b), [b]), F = o === "starting" || o === "running", U = R?.status === "partial", se = i ? A.generating : G.filter((Re) => Re.status === "running").length, de = i ? A.done : G.filter((Re) => Re.status === "completed").length, k = i ? o === "starting" || o === "running" || re.length > 0 : o === "starting" || o === "running" || G.length > 0, ee = G.filter((Re) => Re.status === "failed"), te = g.useMemo(() => {
    if (o !== "terminal") return null;
    const Re = i ? re.filter((Xe) => Xe.status === "failed").map((Xe) => Xe.failureCategory ?? "unknown") : ee.map((Xe) => Xe.failureCategory ?? "unknown");
    if (Re.length === 0) return null;
    const He = /* @__PURE__ */ new Map();
    for (const Xe of Re) He.set(Xe, (He.get(Xe) ?? 0) + 1);
    let We = "unknown", Nt = 0;
    for (const [Xe, gt] of He)
      gt > Nt && (We = Xe, Nt = gt);
    const at = i ? re.length : G.length;
    return { category: We, count: Nt, total: at };
  }, [o, i, re, ee, G]), K = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, B = "Check the run detail page for the per-segment error log.", W = j?.toLowerCase().includes("unmapped") ?? !1, ce = t.diagnostics ?? [], ye = L?.badge ?? "not_installed", Me = ye === "ready" || ye === "running", lt = s?.length ?? 0, Ce = Me ? t.canGenerate ? null : "Nothing to generate yet" : "Start runtime to generate", Fe = o === "starting" ? "Starting…" : o === "running" ? i ? `Generating ${lt} segment${lt === 1 ? "" : "s"}…` : "Generating…" : Ce ?? "Generate", qe = !t.canGenerate || F || !Me, Pe = o === "starting" || o === "running", It = Pe ? "running" : qe ? "blocked" : "idle", _t = !pw(gw) || Pe;
  return /* @__PURE__ */ c.jsxs("div", { className: GO, children: [
    /* @__PURE__ */ c.jsxs("div", { className: YO, children: [
      /* @__PURE__ */ c.jsxs("div", { className: XO, children: [
        /* @__PURE__ */ c.jsxs("span", { className: QO, children: [
          /* @__PURE__ */ c.jsx("span", { className: KO, "aria-hidden": "true", children: "01" }),
          "Pre-flight",
          k && /* @__PURE__ */ c.jsxs("span", { className: sL, children: [
            /* @__PURE__ */ c.jsx("span", { className: iL, "aria-hidden": "true" }),
            se > 0 ? `${se} generating` : `${de} done`
          ] })
        ] }),
        ce.length > 0 ? /* @__PURE__ */ c.jsx("ul", { className: ZO, "aria-label": "Pre-flight checks", children: ce.map((Re) => /* @__PURE__ */ c.jsxs("li", { className: JO, children: [
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: WO,
              "data-status": Re.status,
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ c.jsx("span", { className: eL, children: Re.label }),
          Re.detail && /* @__PURE__ */ c.jsx("span", { className: Vb, children: Re.detail })
        ] }, Re.label)) }) : /* @__PURE__ */ c.jsx("span", { className: Vb, children: "Ready when you are." })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: tL, "data-state": It, children: [
        _t ? /* @__PURE__ */ c.jsxs(
          Ze,
          {
            variant: "primary",
            size: "sm",
            onClick: J,
            disabled: qe,
            loading: Pe,
            title: Ce ?? void 0,
            children: [
              !Pe && /* @__PURE__ */ c.jsx("span", { className: nL, "aria-hidden": "true", children: "▶" }),
              Fe
            ]
          }
        ) : /* @__PURE__ */ c.jsxs("span", { className: aL, "aria-hidden": "true", children: [
          "Generate available in toolbar",
          /* @__PURE__ */ c.jsx("span", { className: rL, children: "↑" })
        ] }),
        F && /* @__PURE__ */ c.jsx(
          Ze,
          {
            variant: "ghost",
            size: "xs",
            onClick: Z,
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
    te && /* @__PURE__ */ c.jsxs(kn, { severity: "error", style: { flexDirection: "column", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ c.jsxs("strong", { children: [
        "Run failed — ",
        te.count,
        " of ",
        te.total,
        " segments failed with ",
        /* @__PURE__ */ c.jsx("code", { children: te.category })
      ] }),
      /* @__PURE__ */ c.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: K[te.category] ?? B })
    ] }),
    R?.exportArtifactRef && // audit-allow: download anchor — Button primitive lacks <a> polymorphic
    /* @__PURE__ */ c.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${R.exportArtifactRef}/download`,
        download: !0,
        className: `${R1.secondary} ${_1.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    U && R && /* @__PURE__ */ c.jsxs(kn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ c.jsx(
        Ze,
        {
          variant: "secondary",
          disabled: !1,
          onClick: async () => {
            try {
              const Re = await N1(t.deploymentId, R.runId);
              m(Re.runId), p(/* @__PURE__ */ new Map()), T(null), u("running"), M(), C.current = bf(
                t.deploymentId,
                Re.runId,
                (He) => Fb(He, p, u, T, t.deploymentId, Re.runId),
                () => u("error")
              );
            } catch (Re) {
              N(sc(Re)), u("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    i && re.length > 0 && /* @__PURE__ */ c.jsx(EL, { items: re, counts: A }),
    !i && G.length > 0 && /* @__PURE__ */ c.jsxs("table", { className: f_, children: [
      /* @__PURE__ */ c.jsx("thead", { children: /* @__PURE__ */ c.jsxs("tr", { children: [
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "#" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Status" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Duration" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ c.jsx("tbody", { children: G.map((Re) => /* @__PURE__ */ c.jsxs("tr", { className: h_, children: [
        /* @__PURE__ */ c.jsx("td", { className: mr, children: Re.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: /* @__PURE__ */ c.jsx(jr, { tone: NL(Re.status), children: Re.status }) }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: Re.durationMs ? `${Re.durationMs} ms` : "—" }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: Re.failureCategory ?? "" })
      ] }, Re.globalIndex)) })
    ] })
  ] });
}
function SL(t) {
  return `~${Math.max(1, Math.round(t / 1e3))}s`;
}
function wL(t) {
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
function Hb(t) {
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
function jL(t) {
  if (t.generating > 0) return `${t.generating} generating`;
  const a = [`${t.done} done`];
  return t.failed > 0 && a.push(`${t.failed} failed`), t.cancelled > 0 && a.push(`${t.cancelled} cancelled`), a.join(" · ");
}
function EL({ items: t, counts: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: lL, role: "list", "aria-label": "Per-segment generation progress", children: [
    /* @__PURE__ */ c.jsxs("div", { className: oL, children: [
      /* @__PURE__ */ c.jsx("span", { className: cL, children: "Segments" }),
      /* @__PURE__ */ c.jsxs("span", { className: uL, "data-tone": a.generating > 0 ? "live" : "idle", children: [
        /* @__PURE__ */ c.jsx("span", { className: dL, "aria-hidden": "true" }),
        jL(a)
      ] })
    ] }),
    t.map((s) => /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: fL,
        role: "listitem",
        "data-status": s.status,
        "aria-label": `${s.label} — ${Hb(s.status)}`,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: hL, children: s.label }),
          /* @__PURE__ */ c.jsx("span", { className: mL, children: /* @__PURE__ */ c.jsx(jr, { tone: wL(s.status), pulse: s.status === "generating", children: Hb(s.status) }) }),
          /* @__PURE__ */ c.jsxs("span", { className: pL, children: [
            s.status === "generating" && /* @__PURE__ */ c.jsx("span", { className: yL, "aria-hidden": "true" }),
            s.status === "done" && typeof s.durationMs == "number" ? /* @__PURE__ */ c.jsxs("span", { className: gL, children: [
              (s.durationMs / 1e3).toFixed(1),
              "s"
            ] }) : s.status === "queued" && typeof s.etaMs == "number" ? /* @__PURE__ */ c.jsxs("span", { className: qb, children: [
              s.queuePosition && s.queueTotal ? `#${s.queuePosition} · ` : "",
              SL(s.etaMs)
            ] }) : s.status === "generating" ? /* @__PURE__ */ c.jsx("span", { className: qb, children: "working…" }) : null
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: vL, children: s.status === "failed" ? s.failureCategory ?? "error" : "" })
        ]
      },
      s.jobId
    ))
  ] });
}
async function Fb(t, a, s, i, o, u) {
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
        const f = await Qh(o, u);
        i(f);
      } catch {
      }
      return;
  }
}
function NL(t) {
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
function sc(t) {
  return t instanceof ni || t instanceof Error ? t.message : "unknown error";
}
function CL(t) {
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
const TL = {
  queued: { label: "Queued", color: "var(--outline, #747578)", glow: "rgba(116,117,120,0)", pulse: !1 },
  rendering: { label: "Rendering", color: "var(--primary, #ba9eff)", glow: "rgba(186,158,255,0.6)", pulse: !0 },
  ready: { label: "Ready", color: "var(--acid-green, #22c55e)", glow: "rgba(34,197,94,0.6)", pulse: !1 },
  failed: { label: "Failed", color: "var(--error, #ff6e84)", glow: "rgba(255,110,132,0.5)", pulse: !1 }
}, Pb = [
  { color: "#ba9eff", rgb: "186,158,255", onColor: "#2b006e" },
  { color: "#9093ff", rgb: "144,147,255", onColor: "#080079" },
  { color: "#ff8439", rgb: "255,132,57", onColor: "#471a00" },
  { color: "#21c7d9", rgb: "33,199,217", onColor: "#00363c" },
  { color: "#34d399", rgb: "52,211,153", onColor: "#003824" },
  { color: "#e879f9", rgb: "232,121,249", onColor: "#3b0a45" }
], Gb = [
  "record_voice_over",
  "graphic_eq",
  "mic_external_on",
  "interpreter_mode",
  "voice_chat",
  "spatial_audio"
];
function RL(t) {
  return t === 0 ? "Lead" : t === 1 ? "Support" : "Voice";
}
function _L(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function ML(t) {
  const a = t.filter((s) => s.isActive && (s.kind === "speaker" || s.kind === "mixed"));
  return a.length === 0 ? [] : a.map((s, i) => {
    const o = Pb[i % Pb.length], u = Gb[i % Gb.length];
    return {
      id: s.voiceAssetId,
      name: s.displayName || `Voice ${i + 1}`,
      role: RL(i),
      icon: u,
      color: o.color,
      rgb: o.rgb,
      onColor: o.onColor,
      initial: _L(s.displayName || "V"),
      lib: s.displayName || s.voiceAssetId
    };
  });
}
function vw(t) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
function AL(t) {
  const a = /* @__PURE__ */ new Set(), s = [];
  for (const i of t) {
    const o = vw(i.presetName);
    a.has(o) || (a.add(o), s.push({ id: o, label: i.presetName }));
  }
  return s;
}
function kL(t, a) {
  const s = t.find((o) => vw(o.presetName) === a);
  if (!s) return null;
  const i = s.vector;
  return Array.isArray(i) && i.length === 8 ? i : null;
}
function DL(t) {
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
function _h(t) {
  const a = [];
  for (const s of t) for (const i of s.segs) a.push(i);
  return a;
}
function Mh(t, a) {
  let s = 0;
  for (const i of t)
    for (const o of i.segs) {
      if (o.id === a) return s;
      s += 1;
    }
  return Number.MAX_SAFE_INTEGER;
}
function zL(t, a, s) {
  const i = [];
  let o = 0;
  for (const u of t)
    for (const f of u.segs)
      o >= a && o <= s && i.push(f.id), o += 1;
  return i;
}
function OL(t, a) {
  for (const s of t) for (const i of s.segs) if (i.id === a) return i.text;
  return "";
}
function rl(t, a) {
  return [...a].sort((s, i) => Mh(t, s) - Mh(t, i)).map((s) => OL(t, s)).join("").trim();
}
function Yb(t, a) {
  return Math.min(...a.segIds.map((s) => Mh(t, s)));
}
function yw(t, a) {
  return t.find((s) => s.segIds.includes(a));
}
function Kb(t, a) {
  return a.every((s) => !yw(t, s));
}
function bw(t, a) {
  return [...a].sort((s, i) => Yb(t, s) - Yb(t, i));
}
function LL(t, a) {
  const s = {};
  return bw(t, a).forEach((i, o) => {
    s[i.id] = `SEG-${String(o + 1).padStart(3, "0")}`;
  }), s;
}
function $L(t) {
  return _h(t).reduce(
    (a, s) => a + s.text.trim().split(/\s+/).filter(Boolean).length,
    0
  );
}
function UL(t) {
  const a = { queued: 0, rendering: 0, ready: 0, failed: 0 };
  for (const i of t) a[i.status] += 1;
  const s = [];
  return a.queued && s.push(`${a.queued} queued`), a.rendering && s.push(`${a.rendering} rendering`), a.ready && s.push(`${a.ready} ready`), a.failed && s.push(`${a.failed} failed`), s.join("  ·  ");
}
const dl = {
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
function ic(t, a) {
  return t.find((s) => s.id === a) ?? t[0] ?? dl;
}
function Xb(t, a) {
  return t.find((s) => s.id === a)?.label ?? a;
}
var BL = "_171z55w1", IL = "_171z55w2", VL = "_171z55w3", Qb = "_171z55w4", qL = "_171z55w5", HL = "_171z55w6", FL = "_171z55w7", PL = "_171z55w8", GL = "_171z55w9", YL = "_171z55wa", KL = "_171z55wb", XL = "_171z55wc", QL = "_171z55wd", ZL = "_171z55we", JL = "_171z55wh", WL = "_171z55wi", Zb = "_171z55wj", Jb = "_171z55wk _171z55wj", e6 = "_171z55wl", t6 = "_171z55wm", n6 = "_171z55wn", a6 = "_171z55wo", Wb = "_171z55wp", ex = "_171z55wq", r6 = "_171z55wr", s6 = "_171z55ws", i6 = "_171z55wt", l6 = "_171z55wu", o6 = "_171z55wv", c6 = "_171z55ww", u6 = "_171z55wx", d6 = "_171z55wy", f6 = "_171z55wz", h6 = "_171z55w10", m6 = "_171z55w11", p6 = "_171z55w12", g6 = "_171z55w13", v6 = "_171z55w14", tx = "_171z55w15", y6 = "_171z55w16", b6 = "_171z55w17", x6 = "_171z55w18", S6 = "_171z55w19", w6 = "_171z55w1a", j6 = "_171z55w1b", E6 = "_171z55w1c", N6 = "_171z55w1d", C6 = "_171z55w1e", T6 = "_171z55w1f", R6 = "_171z55w1g", _6 = "_171z55w1h", M6 = "_171z55w1i", A6 = "_171z55w1j", k6 = "_171z55w1k", D6 = "_171z55w1l";
function z6({
  voiceAssets: t,
  presets: a,
  storyText: s,
  onStoryTextChange: i,
  mappings: o,
  onQueueChange: u,
  onJobsChange: f,
  jobProgress: m
}) {
  const y = g.useMemo(() => ML(t), [t]), p = g.useMemo(() => AL(a), [a]), b = s, v = g.useMemo(() => DL(b), [b]), w = y[0]?.id ?? "", S = p[0]?.id ?? "", [j, N] = g.useState("voice"), [R, T] = g.useState(""), L = g.useMemo(
    () => B6(o, y),
    [o, y]
  ), [_, C] = g.useState([]), [I, Y] = g.useState([]), [ie, M] = g.useState(null), [V, D] = g.useState(null), [P, J] = g.useState(w), [Z, G] = g.useState(S), [re, A] = g.useState(null), [F, U] = g.useState(null), [se, de] = g.useState(null), [k, ee] = g.useState(null), [te, K] = g.useState(!1), B = g.useRef(null), W = g.useRef(null), ce = g.useRef(/* @__PURE__ */ new Map()), ye = g.useRef(null), Me = g.useRef(1e3), lt = g.useCallback(() => (Me.current += 1, `job-${Me.current}`), []), Ce = g.useMemo(() => {
    const O = /* @__PURE__ */ new Map();
    return _h(v).forEach((he, be) => O.set(he.id, be)), O;
  }, [v]), Fe = g.useCallback((O) => Ce.get(O) ?? Number.MAX_SAFE_INTEGER, [Ce]);
  g.useEffect(() => {
    const O = new Set(_h(v).map((he) => he.id));
    C((he) => {
      const be = he.filter((ze) => ze.segIds.every((Ue) => O.has(Ue)));
      return be.length === he.length ? he : be;
    });
  }, [v]), g.useEffect(() => sO(() => C([])), []), g.useEffect(() => {
    if (y.length !== 0 && (J((O) => y.some((he) => he.id === O) ? O : y[0].id), y.length === 1)) {
      const O = y[0].id;
      C((he) => {
        let be = !1;
        const ze = he.map((Ue) => y.some((ot) => ot.id === Ue.voiceId) ? Ue : (be = !0, { ...Ue, voiceId: O }));
        return be ? ze : he;
      });
    }
  }, [y]);
  const qe = g.useMemo(() => new Set(y.map((O) => O.id)), [y]), Pe = g.useCallback(
    (O) => !qe.has(O.voiceId),
    [qe]
  ), It = g.useCallback((O) => {
    const he = B.current;
    if (!he || !O) return { top: 60, left: 0 };
    const be = O.getBoundingClientRect(), ze = he.getBoundingClientRect();
    let Ue = be.left - ze.left + he.scrollLeft;
    const ot = be.bottom - ze.top + he.scrollTop + 10, qt = Math.max(0, he.clientWidth - 318);
    return Ue = Math.max(0, Math.min(Ue, qt)), { top: ot, left: Ue };
  }, []), Vt = g.useCallback(() => {
    Y([]), M(null), D(null), A(null);
  }, []), _t = g.useCallback(
    (O, he) => {
      const be = [...O.segIds].sort((Ue, ot) => Fe(Ue) - Fe(ot))[0];
      if (!be) return;
      const ze = he ?? ce.current.get(be) ?? null;
      D(O.id), Y([...O.segIds]), M(be), J(O.voiceId), G(O.emotion), A(It(ze)), de(O.id);
    },
    [Fe, It]
  ), Re = g.useCallback(
    (O, he, be) => {
      const ze = yw(_, O);
      if (ze) {
        _t(ze, he);
        return;
      }
      const Ue = It(he);
      if (be && ie != null && V == null) {
        const ot = Fe(ie), qt = Fe(O), ct = zL(v, Math.min(ot, qt), Math.max(ot, qt));
        if (Kb(_, ct)) {
          Y(ct), D(null), A(Ue);
          return;
        }
      }
      Y([O]), M(O), D(null), A(Ue);
    },
    [_, v, ie, V, It, _t, Fe]
  ), He = g.useCallback(() => {
    if (V) {
      C(
        (be) => be.map(
          (ze) => ze.id === V ? { ...ze, voiceId: P, emotion: Z, status: "queued" } : ze
        )
      ), de(V), Y([]), M(null), D(null), A(null);
      return;
    }
    if (I.length === 0 || rl(v, I).trim() === "" || !Kb(_, I)) return;
    const O = lt(), he = { id: O, segIds: [...I], voiceId: P, emotion: Z, status: "queued" };
    C((be) => [...be, he]), de(O), Y([]), M(null), A(null);
  }, [V, I, _, v, P, Z, lt]), We = g.useCallback((O) => {
    C((he) => he.filter((be) => be.id !== O)), de((he) => he === O ? null : he), ee((he) => he === O ? null : he), Y([]), M(null), D(null), A(null);
  }, []), Nt = g.useCallback((O) => {
    ee((he) => he === O ? null : O);
  }, []), at = g.useCallback((O) => {
    W.current?.scrollBy({ left: O * 280, behavior: "smooth" });
  }, []), Xe = g.useCallback(
    (O) => {
      if (p.length === 0) return;
      const he = p.findIndex((ze) => ze.id === Z), be = p[(he + O + p.length) % p.length];
      G(be.id), ye.current?.querySelector(`[data-emotion="${be.id}"]`)?.focus();
    },
    [p, Z]
  ), gt = re ? V ?? I[0] ?? "new" : null;
  g.useEffect(() => {
    if (gt == null) return;
    const O = requestAnimationFrame(() => {
      ye.current?.querySelector(`[data-voice="${P}"]`)?.focus();
    });
    return () => cancelAnimationFrame(O);
  }, [gt]);
  const we = g.useCallback(
    (O) => {
      O.key === "Escape" && (O.preventDefault(), Vt());
    },
    [Vt]
  ), Te = g.useMemo(() => {
    const O = /* @__PURE__ */ new Map();
    for (const he of _) for (const be of he.segIds) O.set(be, he);
    return O;
  }, [_]), Ge = g.useMemo(() => bw(v, _), [v, _]), Ye = g.useMemo(() => LL(v, _), [v, _]), yt = g.useMemo(
    () => Ge.filter((O) => y.some((he) => he.id === O.voiceId)).filter((O) => rl(v, O.segIds).trim() !== "").map((O) => {
      const he = kL(a, O.emotion);
      return {
        jobId: O.id,
        label: Ye[O.id] ?? O.id,
        segment: {
          text: rl(v, O.segIds),
          voice_asset_id: O.voiceId,
          speaker_label: (ic(y, O.voiceId) ?? dl).name,
          emotion: he ? { mode: "emotion_vector", vector: he } : null
        }
      };
    }),
    [Ge, v, y, a, Ye]
  ), At = g.useMemo(
    () => yt.map((O) => O.segment),
    [yt]
  ), Hn = g.useRef(null);
  g.useEffect(() => {
    const O = JSON.stringify(At);
    O !== Hn.current && (Hn.current = O, u?.(At));
  }, [At, u]);
  const Sn = g.useRef(null);
  g.useEffect(() => {
    const O = JSON.stringify(yt);
    O !== Sn.current && (Sn.current = O, f?.(yt));
  }, [yt, f]);
  const wn = g.useMemo(() => {
    const O = /* @__PURE__ */ new Map();
    for (const he of _) {
      const be = [...he.segIds].sort((ze, Ue) => Fe(ze) - Fe(Ue))[0];
      be && O.set(he.id, be);
    }
    return O;
  }, [_, Fe]), Pt = g.useMemo(() => {
    const O = /* @__PURE__ */ new Set();
    for (const he of _) for (const be of he.segIds) O.add(be);
    return O.size;
  }, [_]), kt = g.useMemo(() => $L(v), [v]), Lt = UL(_), sa = ic(y, P) ?? dl, [jn, un] = g.useState(null), Qt = R.trim().toLowerCase(), sn = g.useMemo(
    () => y.filter(
      (O) => !Qt || O.name.toLowerCase().includes(Qt) || O.role.toLowerCase().includes(Qt)
    ),
    [y, Qt]
  ), fe = g.useMemo(
    () => L.filter(
      (O) => !Qt || O.name.toLowerCase().includes(Qt) || (O.voice?.name.toLowerCase().includes(Qt) ?? !1)
    ),
    [L, Qt]
  ), Ae = j === "character" ? `${fe.length} character${fe.length === 1 ? "" : "s"}` : `${sn.length} voice${sn.length === 1 ? "" : "s"}`, ge = (O) => O.stopPropagation();
  return /* @__PURE__ */ c.jsxs("div", { className: VL, children: [
    /* @__PURE__ */ c.jsxs("div", { style: O6, children: [
      /* @__PURE__ */ c.jsxs("span", { className: qL, children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("strong", { children: Pt }),
          " cast"
        ] }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("strong", { children: kt }),
          " words"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: FL,
          "aria-pressed": te,
          onClick: () => K((O) => !O),
          children: [
            /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: te ? "check" : "edit" }),
            te ? "Done" : "Edit text"
          ]
        }
      )
    ] }),
    te ? /* @__PURE__ */ c.jsx(
      "textarea",
      {
        value: s,
        onChange: (O) => i(O.target.value),
        placeholder: "Paste or write your script, then switch back to cast each phrase.",
        "aria-label": "Storyboard script text",
        style: L6
      }
    ) : /* @__PURE__ */ c.jsxs(
      "div",
      {
        ref: B,
        className: HL,
        role: "group",
        "aria-label": "Story script — select a phrase to cast a voice",
        onMouseDown: (O) => {
          O.shiftKey && O.preventDefault();
        },
        onClick: () => {
          re && Vt();
        },
        children: [
          v.map((O) => /* @__PURE__ */ c.jsx("p", { className: PL, children: O.segs.map((he, be) => {
            const ze = Te.get(he.id), Ue = I.includes(he.id), ot = !!ze && (F === ze.id || se === ze.id), qt = !!ze && wn.get(ze.id) === he.id, ct = ze ? ic(y, ze.voiceId) : null, z = Pf(he.id, Te, I), H = Pf(O.segs[be - 1]?.id, Te, I), Q = Pf(O.segs[be + 1]?.id, Te, I), ve = z != null && H !== z, xe = z != null && Q !== z;
            return /* @__PURE__ */ c.jsxs("span", { children: [
              qt && ct && /* @__PURE__ */ c.jsx("span", { className: YL, style: U6(ct), "aria-hidden": "true", children: ct.initial }),
              /* @__PURE__ */ c.jsx(
                "span",
                {
                  ref: (je) => {
                    je && ce.current.set(he.id, je);
                  },
                  role: "button",
                  tabIndex: 0,
                  "aria-pressed": Ue || !!ze,
                  "aria-label": ze ? `${ct?.name ?? "voice"} · ${he.text.trim()}` : he.text.trim(),
                  className: GL,
                  style: $6(Ue, ct, ot, he.kind, ve, xe),
                  onClick: (je) => {
                    je.stopPropagation(), Re(he.id, je.currentTarget, je.shiftKey);
                  },
                  onKeyDown: (je) => {
                    (je.key === "Enter" || je.key === " ") && (je.preventDefault(), Re(he.id, je.currentTarget, je.shiftKey));
                  },
                  onMouseEnter: ze ? () => U(ze.id) : void 0,
                  onMouseLeave: ze ? () => U(null) : void 0,
                  children: he.text
                }
              )
            ] }, he.id);
          }) }, O.id)),
          re && /* @__PURE__ */ c.jsxs(
            "div",
            {
              ref: ye,
              className: KL,
              role: "dialog",
              "aria-label": V ? "Edit casting" : "Cast voice",
              style: { top: re.top, left: re.left },
              onClick: ge,
              onMouseDown: ge,
              onKeyDown: we,
              children: [
                /* @__PURE__ */ c.jsxs("div", { className: XL, children: [
                  /* @__PURE__ */ c.jsx("span", { className: QL, children: V ? "Edit casting" : "Cast voice" }),
                  /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: ZL,
                      style: { width: 24, height: 24 },
                      "aria-label": "Cancel",
                      onClick: Vt,
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 17 }, "aria-hidden": "true", children: "close" })
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: JL, children: [
                  /* @__PURE__ */ c.jsxs("div", { className: WL, role: "radiogroup", "aria-label": "Cast source", children: [
                    /* @__PURE__ */ c.jsx(
                      "button",
                      {
                        type: "button",
                        role: "radio",
                        "aria-checked": j === "voice",
                        className: j === "voice" ? Jb : Zb,
                        onClick: () => {
                          N("voice"), T("");
                        },
                        children: "Voices"
                      }
                    ),
                    /* @__PURE__ */ c.jsx(
                      "button",
                      {
                        type: "button",
                        role: "radio",
                        "aria-checked": j === "character",
                        className: j === "character" ? Jb : Zb,
                        onClick: () => {
                          N("character"), T("");
                        },
                        children: "Characters"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: e6, children: Ae })
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: t6, children: [
                  /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: I6, children: "search" }),
                  /* @__PURE__ */ c.jsx(
                    "input",
                    {
                      className: n6,
                      value: R,
                      onChange: (O) => T(O.target.value),
                      placeholder: j === "character" ? "Search characters…" : "Search voices…",
                      "aria-label": j === "character" ? "Search characters" : "Search voices"
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: a6, role: "radiogroup", "aria-label": j === "character" ? "Character" : "Voice", children: [
                  j === "voice" && sn.map((O) => {
                    const he = jn == null && P === O.id;
                    return /* @__PURE__ */ c.jsxs(
                      "button",
                      {
                        type: "button",
                        role: "radio",
                        "aria-checked": he,
                        className: Wb,
                        style: ax(O, he),
                        onClick: () => {
                          J(O.id), un(null);
                        },
                        children: [
                          /* @__PURE__ */ c.jsx("span", { style: rx(O), children: O.initial }),
                          /* @__PURE__ */ c.jsxs("span", { className: ex, children: [
                            /* @__PURE__ */ c.jsx("span", { style: sx(he), children: O.name }),
                            /* @__PURE__ */ c.jsx("span", { style: V6, children: O.role })
                          ] }),
                          he && /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 18, color: O.color, flexShrink: 0 }, children: "check" })
                        ]
                      },
                      O.id
                    );
                  }),
                  j === "character" && fe.map((O) => {
                    const he = O.voice ?? dl, be = jn === O.id;
                    return /* @__PURE__ */ c.jsxs(
                      "button",
                      {
                        type: "button",
                        role: "radio",
                        "aria-checked": be,
                        className: Wb,
                        style: ax(he, be),
                        onClick: () => {
                          J(O.voiceId), un(O.id);
                        },
                        children: [
                          /* @__PURE__ */ c.jsx("span", { style: rx(he), children: he.initial }),
                          /* @__PURE__ */ c.jsxs("span", { className: ex, children: [
                            /* @__PURE__ */ c.jsx("span", { style: sx(be), children: O.name }),
                            /* @__PURE__ */ c.jsx("span", { style: q6, children: he.name })
                          ] }),
                          be && /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 18, color: he.color, flexShrink: 0 }, children: "check" })
                        ]
                      },
                      O.id
                    );
                  }),
                  (j === "voice" && sn.length === 0 || j === "character" && fe.length === 0) && /* @__PURE__ */ c.jsx("div", { className: r6, children: j === "character" ? L.length === 0 ? "No characters mapped yet." : `No matches for “${R}”` : y.length === 0 ? "No voices yet — add voice assets." : `No matches for “${R}”` })
                ] }),
                /* @__PURE__ */ c.jsx("div", { className: s6 }),
                /* @__PURE__ */ c.jsxs("div", { className: i6, children: [
                  /* @__PURE__ */ c.jsx("span", { className: Qb, style: { fontSize: 9.5, marginBottom: 0 }, children: "Emotion" }),
                  /* @__PURE__ */ c.jsx(
                    "div",
                    {
                      className: l6,
                      role: "radiogroup",
                      "aria-label": "Emotion",
                      onKeyDown: (O) => {
                        O.key === "ArrowRight" || O.key === "ArrowDown" ? (O.preventDefault(), Xe(1)) : (O.key === "ArrowLeft" || O.key === "ArrowUp") && (O.preventDefault(), Xe(-1));
                      },
                      children: p.map((O) => {
                        const he = Z === O.id;
                        return /* @__PURE__ */ c.jsx(
                          "button",
                          {
                            type: "button",
                            role: "radio",
                            "aria-checked": he,
                            "data-emotion": O.id,
                            tabIndex: he ? 0 : -1,
                            className: o6,
                            style: H6(sa, he),
                            onClick: () => G(O.id),
                            children: O.label
                          },
                          O.id
                        );
                      })
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsx("div", { className: c6, children: /* @__PURE__ */ c.jsx("span", { className: u6, children: rl(v, I) }) }),
                /* @__PURE__ */ c.jsxs("div", { className: d6, children: [
                  V && /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: f6,
                      "aria-label": "Remove casting",
                      onClick: () => V && We(V),
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: "delete" })
                    }
                  ),
                  /* @__PURE__ */ c.jsxs(
                    "button",
                    {
                      type: "button",
                      style: F6(sa),
                      onClick: He,
                      children: [
                        /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 17 }, "aria-hidden": "true", children: "check" }),
                        V ? "Update" : "Cast"
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
    /* @__PURE__ */ c.jsxs("div", { className: h6, children: [
      /* @__PURE__ */ c.jsxs("div", { className: m6, children: [
        /* @__PURE__ */ c.jsxs("div", { className: p6, children: [
          /* @__PURE__ */ c.jsx("span", { className: Qb, style: { marginBottom: 0 }, children: "Assigned segments" }),
          /* @__PURE__ */ c.jsx("span", { className: g6, children: _.length }),
          Lt && /* @__PURE__ */ c.jsx("span", { className: v6, children: Lt })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ c.jsx("button", { type: "button", className: tx, "aria-label": "Scroll segments left", onClick: () => at(-1), disabled: _.length === 0, children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 18 }, "aria-hidden": "true", children: "chevron_left" }) }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: tx, "aria-label": "Scroll segments right", onClick: () => at(1), disabled: _.length === 0, children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 18 }, "aria-hidden": "true", children: "chevron_right" }) })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { ref: W, className: y6, children: [
        Ge.map((O) => {
          const he = ic(y, O.voiceId) ?? dl, be = Pe(O), ze = m?.get(O.id), Ue = ze ? CL(ze) : O.status, ot = TL[Ue], qt = se === O.id || F === O.id, ct = k === O.id, z = rl(v, O.segIds);
          return /* @__PURE__ */ c.jsxs(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `${he.name} ${Ye[O.id]} — ${Xb(p, O.emotion)} — ${be ? "voice removed — recast" : ot.label}`,
              className: b6,
              "data-broken": be ? "true" : "false",
              style: be ? G6(qt) : P6(he, qt),
              onClick: () => _t(O),
              onKeyDown: (H) => {
                (H.key === "Enter" || H.key === " ") && (H.preventDefault(), _t(O));
              },
              onMouseEnter: () => U(O.id),
              onMouseLeave: () => U(null),
              onFocus: () => de(O.id),
              children: [
                /* @__PURE__ */ c.jsxs("div", { className: x6, children: [
                  /* @__PURE__ */ c.jsxs("div", { className: S6, children: [
                    /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 17, color: he.color }, children: he.icon }),
                    /* @__PURE__ */ c.jsx("span", { className: w6, children: he.name })
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: j6, children: Ye[O.id] })
                ] }),
                /* @__PURE__ */ c.jsx("span", { className: E6, children: z }),
                /* @__PURE__ */ c.jsxs("div", { className: N6, children: [
                  /* @__PURE__ */ c.jsx("span", { style: K6(he), children: Xb(p, O.emotion) }),
                  /* @__PURE__ */ c.jsxs("span", { className: C6, children: [
                    /* @__PURE__ */ c.jsx("span", { style: X6(ot) }),
                    /* @__PURE__ */ c.jsx("span", { style: Q6(ot, Ue), children: ot.label })
                  ] })
                ] }),
                be && /* @__PURE__ */ c.jsxs("span", { style: Y6, role: "status", children: [
                  /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 14 }, "aria-hidden": "true", children: "error" }),
                  "voice removed — recast"
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: T6, children: [
                  /* @__PURE__ */ c.jsxs(
                    "button",
                    {
                      type: "button",
                      className: R6,
                      "aria-label": ct ? "Pause preview" : "Preview audio",
                      onClick: (H) => {
                        H.stopPropagation(), Nt(O.id);
                      },
                      children: [
                        /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: ct ? "pause_circle" : "play_circle" }),
                        ct ? "Playing" : "Preview"
                      ]
                    }
                  ),
                  /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: _6,
                      "aria-label": `Remove ${Ye[O.id]}`,
                      onClick: (H) => {
                        H.stopPropagation(), We(O.id);
                      },
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: "close" })
                    }
                  )
                ] }),
                ct && /* @__PURE__ */ c.jsx("div", { className: M6, children: /* @__PURE__ */ c.jsx("div", { style: Z6(he) }) })
              ]
            },
            O.id
          );
        }),
        _.length === 0 && /* @__PURE__ */ c.jsxs("div", { className: A6, children: [
          /* @__PURE__ */ c.jsx("span", { className: k6, children: "0" }),
          /* @__PURE__ */ c.jsx("span", { className: D6, children: "No segments cast yet. Select a phrase above to begin." })
        ] })
      ] })
    ] })
  ] });
}
const O6 = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }, L6 = {
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
function Pf(t, a, s) {
  if (t == null) return null;
  const i = a.get(t);
  return i ? `job:${i.id}` : s.includes(t) ? "sel" : null;
}
function nx(t, a) {
  return {
    borderTopLeftRadius: t ? 4 : 0,
    borderBottomLeftRadius: t ? 4 : 0,
    borderTopRightRadius: a ? 4 : 0,
    borderBottomRightRadius: a ? 4 : 0
  };
}
function $6(t, a, s, i, o, u) {
  const f = { padding: "2px 0", cursor: "pointer", WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" }, m = "186,158,255";
  return t ? { ...f, ...nx(o, u), background: `rgba(${m},0.16)`, boxShadow: `inset 0 -2px 0 rgba(${m},0.7)`, color: "var(--on-surface)" } : a ? { ...f, ...nx(o, u), background: `rgba(${a.rgb},${s ? 0.2 : 0.11})`, boxShadow: `inset 0 -2px 0 ${a.color}`, color: "var(--on-surface)" } : { ...f, color: i === "dialogue" ? "var(--on-surface)" : "var(--on-surface-variant)" };
}
function U6(t) {
  return { color: t.color, background: `rgba(${t.rgb},0.18)`, boxShadow: `inset 0 0 0 1px rgba(${t.rgb},0.45)` };
}
function B6(t, a) {
  return t ? [...t.values()].filter((s) => s.isActive).map((s) => ({
    id: s.mappingId,
    name: s.characterName,
    voiceId: s.speakerVoiceAssetId,
    voice: a.find((i) => i.id === s.speakerVoiceAssetId) ?? null
  })) : [];
}
function ax(t, a) {
  return a ? {
    border: `1px solid rgba(${t.rgb},0.5)`,
    background: `rgba(${t.rgb},0.12)`
  } : {};
}
function rx(t) {
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
function sx(t) {
  return {
    fontSize: 12,
    fontWeight: 600,
    color: t ? "var(--on-surface, #e3e3e3)" : "var(--on-surface-variant, #c4c7c5)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  };
}
const I6 = { position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "var(--on-surface-muted)", pointerEvents: "none" }, V6 = { fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--on-surface-muted)" }, q6 = { fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.02em", color: "var(--on-surface-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
function H6(t, a) {
  return {
    border: `1px solid ${a ? `rgba(${t.rgb},0.45)` : "rgba(120,124,128,0.35)"}`,
    background: a ? `rgba(${t.rgb},0.14)` : "var(--surface-raised, rgba(255,255,255,0.05))",
    color: a ? t.color : "var(--on-surface-variant, #c4c7c5)"
  };
}
function F6(t) {
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
function P6(t, a) {
  return {
    background: a ? "var(--surface-high, #1d2023)" : "var(--surface-low, #111416)",
    transform: a ? "translateY(-2px)" : "none",
    boxShadow: a ? `inset 3px 0 0 ${t.color}, 0 0 0 1px rgba(${t.rgb},0.4), 0 12px 28px rgba(0,0,0,0.5)` : `inset 3px 0 0 ${t.color}`
  };
}
function G6(t) {
  const a = "var(--error, #ff6e84)";
  return {
    background: t ? "var(--surface-high, #1d2023)" : "var(--surface-low, #111416)",
    transform: t ? "translateY(-2px)" : "none",
    boxShadow: t ? `inset 3px 0 0 ${a}, 0 0 0 1px rgba(255,110,132,0.45), 0 12px 28px rgba(0,0,0,0.5)` : `inset 3px 0 0 ${a}, 0 0 0 1px rgba(255,110,132,0.32)`
  };
}
const Y6 = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  marginTop: 6,
  fontFamily: "var(--font-ui)",
  fontSize: 10.5,
  fontWeight: 500,
  color: "var(--error, #ff6e84)"
};
function K6(t) {
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
function X6(t) {
  return {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: t.color,
    boxShadow: `0 0 8px ${t.glow}`,
    animation: t.pulse ? `${IL} 1.5s ease-in-out infinite` : "none",
    flexShrink: 0
  };
}
function Q6(t, a) {
  return { fontFamily: "var(--font-ui)", fontSize: 10.5, fontWeight: 500, color: a === "queued" ? "var(--on-surface-variant)" : t.color };
}
function Z6(t) {
  return { position: "absolute", top: 0, bottom: 0, width: "30%", background: `linear-gradient(90deg, transparent, ${t.color}, transparent)`, animation: `${BL} 1.1s linear infinite` };
}
var J6 = "xq3iim0", W6 = "xq3iim1", e8 = "xq3iim2", t8 = "xq3iim3", n8 = "xq3iim4", a8 = "xq3iim5", r8 = "xq3iim6", s8 = "xq3iim7", i8 = "xq3iim8", l8 = "xq3iim9", o8 = "xq3iima", c8 = "xq3iimb", u8 = "xq3iimc", d8 = "xq3iimd", f8 = "xq3iime", h8 = "xq3iimf", m8 = "xq3iimg", p8 = "xq3iimh", g8 = "xq3iimi", v8 = "xq3iimj", y8 = "xq3iimk", ix = "xq3iiml";
function b8({
  deploymentId: t,
  initialVoiceAssetId: a,
  onChange: s
}) {
  const [i, o] = g.useState([]), [u, f] = g.useState(a), [m, y] = g.useState(!0), [p, b] = g.useState(!1), [v, w] = g.useState(null), [S, j] = g.useState(!1), N = g.useRef(null), R = g.useRef(null);
  g.useEffect(() => {
    let C = !1;
    return y(!0), Qs(t).then(({ voiceAssets: I }) => {
      C || o(I);
    }).catch((I) => {
      C || w(I instanceof Error ? I.message : "Failed to load voices");
    }).finally(() => {
      C || y(!1);
    }), () => {
      C = !0;
    };
  }, [t]), g.useEffect(() => {
    if (!S) return;
    const C = (Y) => {
      N.current && (Y.target instanceof Node && N.current.contains(Y.target) || j(!1));
    }, I = (Y) => {
      Y.key === "Escape" && (j(!1), R.current?.focus());
    };
    return document.addEventListener("mousedown", C), document.addEventListener("keydown", I), () => {
      document.removeEventListener("mousedown", C), document.removeEventListener("keydown", I);
    };
  }, [S]);
  const T = g.useCallback(
    async (C) => {
      b(!0), w(null);
      const I = u, Y = C === u ? null : C;
      f(Y), j(!1);
      try {
        await xT(t, Y), s?.(Y);
      } catch (ie) {
        f(I), w(ie instanceof Error ? ie.message : "Failed to update default voice");
      } finally {
        b(!1);
      }
    },
    [t, s, u]
  ), L = g.useMemo(
    () => i.find((C) => C.voiceAssetId === u) ?? null,
    [i, u]
  ), _ = g.useMemo(() => {
    const C = [], I = [];
    for (const Y of i)
      Y.kind === "speaker" || Y.kind === "mixed" ? C.push(Y) : I.push(Y);
    return { uploaded: C, other: I };
  }, [i]);
  return m ? /* @__PURE__ */ c.jsx("span", { className: ix, children: "Loading voices…" }) : i.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: ix, children: "No voices yet. Upload a reference in Mappings to enable Quick mode." }) : /* @__PURE__ */ c.jsxs("div", { ref: N, className: J6, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: R,
        type: "button",
        className: `${W6} ${S ? e8 : ""}`,
        "aria-haspopup": "listbox",
        "aria-expanded": S,
        disabled: p,
        onClick: () => j((C) => !C),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: t8, "aria-hidden": "true", children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", children: "graphic_eq" }) }),
          /* @__PURE__ */ c.jsxs("span", { className: n8, children: [
            /* @__PURE__ */ c.jsx("span", { className: a8, children: L ? L.displayName : "Pick a voice" }),
            /* @__PURE__ */ c.jsx("span", { className: r8, children: L ? xw(L) : `${i.length} voice${i.length === 1 ? "" : "s"} in library` })
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: s8, "aria-hidden": "true", children: x8.map((C, I) => /* @__PURE__ */ c.jsx("i", { style: { height: `${C * 100}%` } }, I)) }),
          /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${i8}`, "aria-hidden": "true", children: S ? "expand_less" : "expand_more" })
        ]
      }
    ),
    S && /* @__PURE__ */ c.jsxs(
      "div",
      {
        role: "listbox",
        "aria-label": "Quick mode voice",
        className: l8,
        children: [
          /* @__PURE__ */ c.jsx("div", { className: o8, children: /* @__PURE__ */ c.jsx("span", { className: c8, children: "Select voice" }) }),
          v && /* @__PURE__ */ c.jsx("div", { className: u8, role: "alert", children: v }),
          _.uploaded.length > 0 && /* @__PURE__ */ c.jsx(lx, { label: "Uploaded", children: _.uploaded.map((C) => /* @__PURE__ */ c.jsx(
            ox,
            {
              voice: C,
              selected: u === C.voiceAssetId,
              onSelect: () => void T(C.voiceAssetId)
            },
            C.voiceAssetId
          )) }),
          _.other.length > 0 && /* @__PURE__ */ c.jsx(lx, { label: "Other", children: _.other.map((C) => /* @__PURE__ */ c.jsx(
            ox,
            {
              voice: C,
              selected: u === C.voiceAssetId,
              onSelect: () => void T(C.voiceAssetId)
            },
            C.voiceAssetId
          )) })
        ]
      }
    )
  ] });
}
function lx({ label: t, children: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: d8, children: [
    /* @__PURE__ */ c.jsx("div", { className: f8, children: t }),
    a
  ] });
}
function ox({ voice: t, selected: a, onSelect: s }) {
  return /* @__PURE__ */ c.jsxs(
    "button",
    {
      type: "button",
      role: "option",
      "aria-selected": a,
      className: `${h8} ${a ? m8 : ""}`,
      onClick: s,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: p8, "aria-hidden": "true" }),
        /* @__PURE__ */ c.jsx("span", { className: g8, children: t.displayName }),
        /* @__PURE__ */ c.jsx("span", { className: v8, children: xw(t) }),
        a && /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${y8}`, "aria-hidden": "true", children: "check" })
      ]
    }
  );
}
const x8 = [0.35, 0.7, 0.5, 0.85, 0.45, 0.6, 0.32, 0.78, 0.4, 0.55, 0.7, 0.36];
function xw(t) {
  const a = [];
  return t.durationMs != null && a.push(S8(t.durationMs)), t.sampleRate != null && a.push(`${(t.sampleRate / 1e3).toFixed(1)} kHz`), t.kind && t.kind !== "speaker" && a.push(t.kind), a.length > 0 ? a.join(" · ") : "—";
}
function S8(t) {
  const a = t / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const s = Math.floor(a / 60), i = Math.round(a - s * 60);
  return `${s}:${i.toString().padStart(2, "0")}`;
}
const cx = [
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
function w8(t) {
  const a = ti(), s = g.useRef(null), { tokens: i, attributions: o, unresolved: u, predictedFilenames: f, characterColor: m } = g.useMemo(
    () => E8(t.value, t.outputFormat, t.mappings),
    [t.value, t.outputFormat, t.mappings]
  ), y = (b) => {
    const v = s.current;
    v && (v.scrollTop = b.currentTarget.scrollTop, v.scrollLeft = b.currentTarget.scrollLeft);
  }, p = t.quickMode === !0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: p ? l_ : r_, children: [
      !p && /* @__PURE__ */ c.jsx("div", { ref: s, className: s_, "aria-hidden": "true", children: i.map((b, v) => j8(b, v, m)) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: p ? o_ : i_,
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
      /* @__PURE__ */ c.jsx("span", { className: yr, children: "Parsed lines" }),
      /* @__PURE__ */ c.jsx("ul", { className: m0, children: o.map((b) => /* @__PURE__ */ c.jsxs("li", { children: [
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
      /* @__PURE__ */ c.jsx("span", { className: yr, children: "Predicted filenames" }),
      /* @__PURE__ */ c.jsx("ul", { className: m0, children: f.map((b) => /* @__PURE__ */ c.jsx("li", { children: b }, b)) })
    ] })
  ] });
}
function j8(t, a, s) {
  if (t.kind === "blank")
    return /* @__PURE__ */ c.jsxs("span", { children: [
      t.raw,
      `
`
    ] }, a);
  if (t.kind === "narrator")
    return /* @__PURE__ */ c.jsxs("span", { children: [
      /* @__PURE__ */ c.jsx("span", { className: h0, children: t.raw }),
      `
`
    ] }, a);
  const i = s.get(t.character?.toLowerCase() ?? "") ?? "currentColor", o = t.hasMapping ? f0 : `${f0} ${c_}`;
  return /* @__PURE__ */ c.jsxs("span", { children: [
    /* @__PURE__ */ c.jsxs("span", { className: o, style: { color: i }, children: [
      "[",
      t.character,
      t.override && /* @__PURE__ */ c.jsxs("span", { className: u_, children: [
        "|",
        t.override
      ] }),
      "]"
    ] }),
    /* @__PURE__ */ c.jsxs("span", { className: h0, children: [
      " ",
      t.text ?? ""
    ] }),
    `
`
  ] }, a);
}
function E8(t, a, s) {
  const i = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], u = [], f = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map(), y = [], p = /* @__PURE__ */ new Map();
  let b = 0;
  const v = t.split(/\r?\n/);
  let w = 0;
  return v.forEach((S, j) => {
    const N = S.trim();
    if (!N) {
      o.push({ kind: "blank", raw: S });
      return;
    }
    const R = j + 1, T = N.match(i);
    let L = "Narrator", _ = N, C, I = !1;
    if (T?.groups) {
      I = !0;
      const V = (T.groups.body ?? "").trim(), D = (T.groups.rest ?? "").trim();
      L = ((V.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", C = (V.includes("|") ? V.slice(V.indexOf("|") + 1) : "").trim() || void 0, _ = D;
    }
    w += 1;
    const Y = L.toLowerCase(), ie = (m.get(Y) ?? 0) + 1;
    m.set(Y, ie);
    const M = L === "Narrator" || s.has(Y);
    if (M || f.add(L), L !== "Narrator" && !p.has(Y) && (p.set(Y, cx[b % cx.length] ?? "currentColor"), b += 1), I) {
      const V = { kind: "character", raw: S, character: L, text: _, hasMapping: M };
      C !== void 0 && (V.override = C), o.push(V);
    } else
      o.push({ kind: "narrator", raw: S });
    u.push({ lineNumber: R, character: L, text: _, hasMapping: M }), y.push(
      `${w.toString().padStart(3, "0")}_${N8(L)}_${ie.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: u,
    unresolved: Array.from(f),
    predictedFilenames: y,
    characterColor: p
  };
}
function N8(t) {
  const a = t.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
const ux = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], Sw = 1e-3;
function C8(t) {
  return t.replace(/[\[\]|\r\n]/g, "").trim();
}
function T8() {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `row_${crypto.randomUUID()}` : `row_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}
function R8(t) {
  return t.replace(/[\r\n]/g, " ").trim();
}
function ww(t) {
  return Number.isNaN(t) ? 1 : t < 0 ? 0 : t > 1 ? 1 : t;
}
function jw(t) {
  const a = Math.round(t * 1e3) / 1e3;
  return Number.isInteger(a) ? a.toFixed(1) : String(a);
}
function _8(t) {
  const a = [];
  for (let s = 0; s < ux.length; s += 1) {
    const i = t[s];
    typeof i == "number" && (Math.abs(i) < Sw || a.push(`${ux[s]}=${jw(ww(i))}`));
  }
  return a.length === 0 ? null : a.join(",");
}
function M8(t, a) {
  const s = C8(t.character) || "Narrator", i = R8(t.text);
  if (!i) return null;
  const o = [];
  if (t.presetId) {
    const m = a.get(t.presetId);
    if (m) {
      const y = _8(m.vector);
      y && o.push(`emotion_vector:${y}`);
    }
  }
  const u = ww(t.alpha);
  return Math.abs(u - 1) >= Sw && o.push(`emotion_alpha:${jw(u)}`), `${o.length > 0 ? `[${s}|${o.join("|")}]` : `[${s}]`} ${i}`;
}
function Ew(t, a) {
  const s = /* @__PURE__ */ new Map();
  for (const o of a) s.set(o.presetId, o);
  const i = [];
  for (const o of t) {
    const u = M8(o, s);
    u && i.push(u);
  }
  return i.join(`
`);
}
function Yr() {
  return {
    id: T8(),
    character: "",
    presetId: null,
    alpha: 1,
    text: ""
  };
}
var A8 = "_1827s3t2", k8 = "_1827s3t3", D8 = "_1827s3t4", z8 = "_1827s3t5", O8 = "_1827s3t6", L8 = "_1827s3t7", $8 = "_1827s3t8", U8 = "_1827s3t9", B8 = "_1827s3ta", I8 = "_1827s3tb", V8 = "_1827s3td _1827s3tc", q8 = "_1827s3te _1827s3tc", H8 = "_1827s3tf", F8 = "_1827s3tg", P8 = "_1827s3th", G8 = "_1827s3ti _1827s3tc", Y8 = "_1827s3tj", K8 = "_1827s3tk", X8 = "_1827s3tl", Q8 = "_1827s3tm", Z8 = "_1827s3tn", J8 = "_1827s3to", W8 = "_1827s3tp", e$ = "_1827s3tq", t$ = "_1827s3tr", n$ = "_1827s3ts", a$ = "_1827s3tt", r$ = "_1827s3tu";
function s$({
  rows: t,
  onRowsChange: a,
  presets: s,
  mappingsByLower: i
}) {
  const o = g.useId(), u = g.useId(), f = g.useId(), m = g.useRef(null), y = g.useRef(/* @__PURE__ */ new Map()), p = g.useRef(/* @__PURE__ */ new Map()), b = g.useRef(/* @__PURE__ */ new Map()), [v, w] = g.useState(null), [S, j] = g.useState(!1), N = g.useRef(null), R = g.useRef(null), [T, L] = g.useState(null), [_, C] = g.useState(null), [I, Y] = g.useState("");
  g.useEffect(() => {
    v && (v.kind === "addBtn" ? m.current?.focus() : v.kind === "text" && v.rowId ? y.current.get(v.rowId)?.focus() : v.kind === "remove" && v.rowId ? p.current.get(v.rowId)?.focus() : v.kind === "character" && v.rowId ? b.current.get(v.rowId)?.focus() : v.kind === "unmappedFirstItem" && R.current?.querySelector("button")?.focus(), w(null));
  }, [v]);
  const ie = t.filter((B) => B.text.trim().length > 0).length, M = g.useMemo(() => {
    const B = /* @__PURE__ */ new Map();
    for (const W of t) {
      const ce = W.character.trim(), ye = ce.toLowerCase();
      !ye || ye === "narrator" || i.has(ye) || B.has(ye) || B.set(ye, ce);
    }
    return Array.from(B.values()).sort((W, ce) => W.localeCompare(ce));
  }, [t, i]), V = M.length, D = g.useRef(V), [P, J] = g.useState(0);
  g.useEffect(() => {
    V > D.current && J((B) => B + 1), D.current = V;
  }, [V]), g.useEffect(() => {
    if (!S) return;
    w({ kind: "unmappedFirstItem" });
    const B = (ce) => {
      if (!R.current || !N.current) return;
      const ye = ce.target;
      R.current.contains(ye) || N.current.contains(ye) || j(!1);
    }, W = (ce) => {
      ce.key === "Escape" && (j(!1), N.current?.focus());
    };
    return document.addEventListener("mousedown", B), document.addEventListener("keydown", W), () => {
      document.removeEventListener("mousedown", B), document.removeEventListener("keydown", W);
    };
  }, [S]);
  const Z = g.useMemo(() => {
    const B = /* @__PURE__ */ new Set();
    return i.forEach((W) => B.add(W.characterName)), Array.from(B).sort((W, ce) => W.localeCompare(ce));
  }, [i]), G = g.useCallback(
    (B, W) => {
      a(t.map((ce) => ce.id === B ? { ...ce, ...W } : ce));
    },
    [t, a]
  ), re = g.useRef(t);
  g.useEffect(() => {
    re.current = t;
  }, [t]);
  const A = g.useCallback(
    (B) => {
      const W = t.findIndex((Fe) => Fe.id === B);
      if (W < 0) return;
      const ce = t[W];
      if (!ce) return;
      const ye = W > 0 ? t[W - 1]?.id ?? null : null, Me = t.filter((Fe) => Fe.id !== B);
      a(Me);
      const lt = ce.character.trim() || `Line ${W + 1}`;
      pn(`Removed ${lt}`, {
        action: {
          label: "Undo",
          onClick: () => {
            const Fe = re.current;
            if (Fe.some((Vt) => Vt.id === ce.id)) return;
            const qe = [...Fe], Pe = ye ? Fe.findIndex((Vt) => Vt.id === ye) : -1, It = Pe >= 0 ? Pe + 1 : 0;
            qe.splice(It, 0, ce), a(qe);
          }
        },
        duration: 5e3
      });
      const Ce = `Removed line ${W + 1}, now ${Me.length} ${Me.length === 1 ? "line" : "lines"}`;
      if (Y((Fe) => Fe === Ce ? `${Ce}​` : Ce), Me.length === 0)
        w({ kind: "addBtn" });
      else {
        const Fe = W < Me.length ? W : Me.length - 1, qe = Me[Fe];
        w(qe ? { kind: "remove", rowId: qe.id } : { kind: "addBtn" });
      }
    },
    [t, a]
  ), F = g.useCallback(
    (B) => {
      const W = Yr();
      let ce;
      if (B === null)
        ce = [...t, W];
      else {
        const ye = t.findIndex((Me) => Me.id === B);
        ce = ye < 0 ? [...t, W] : [...t.slice(0, ye + 1), W, ...t.slice(ye + 1)];
      }
      a(ce), w({ kind: "text", rowId: W.id });
    },
    [t, a]
  ), U = g.useCallback(
    (B, W) => {
      const ce = t.findIndex((Pe) => Pe.id === B);
      if (ce < 0) return;
      const ye = ce + W;
      if (ye < 0 || ye >= t.length) return;
      const Me = [...t], lt = Me[ce], Ce = Me[ye];
      if (!lt || !Ce) return;
      Me[ce] = Ce, Me[ye] = lt, a(Me);
      const qe = `Moved ${lt.character.trim() || `Line ${ce + 1}`} to position ${ye + 1} of ${Me.length}`;
      Y((Pe) => Pe === qe ? `${qe}​` : qe);
    },
    [t, a]
  ), se = g.useCallback(
    (B, W) => {
      B.key === "Enter" && !B.shiftKey ? (B.preventDefault(), F(W)) : B.altKey && B.key === "ArrowUp" ? (B.preventDefault(), U(W, -1)) : B.altKey && B.key === "ArrowDown" && (B.preventDefault(), U(W, 1));
    },
    [F, U]
  ), de = g.useCallback((B, W) => {
    L(W), B.dataTransfer.effectAllowed = "move", B.dataTransfer.setData("text/plain", W);
  }, []), k = g.useCallback((B, W) => {
    T && (B.preventDefault(), B.dataTransfer.dropEffect = "move", _ !== W && C(W));
  }, [T, _]), ee = g.useCallback(
    (B, W) => {
      B.preventDefault();
      const ce = T ?? B.dataTransfer.getData("text/plain");
      if (L(null), C(null), !ce || ce === W) return;
      const ye = t.findIndex((Pe) => Pe.id === ce), Me = t.findIndex((Pe) => Pe.id === W);
      if (ye < 0 || Me < 0) return;
      const lt = [...t], [Ce] = lt.splice(ye, 1);
      if (!Ce) return;
      lt.splice(Me, 0, Ce), a(lt);
      const qe = `Moved ${Ce.character.trim() || `Line ${ye + 1}`} to position ${Me + 1} of ${lt.length}`;
      Y((Pe) => Pe === qe ? `${qe}​` : qe);
    },
    [t, a, T]
  ), te = g.useCallback(() => {
    L(null), C(null);
  }, []), K = g.useCallback(
    (B) => {
      const W = t.find((ce) => ce.character.trim().toLowerCase() === B.toLowerCase());
      W && w({ kind: "character", rowId: W.id }), j(!1);
    },
    [t]
  );
  return /* @__PURE__ */ c.jsxs("section", { className: A8, "aria-labelledby": u, children: [
    /* @__PURE__ */ c.jsxs("header", { className: k8, children: [
      /* @__PURE__ */ c.jsxs("span", { className: D8, id: u, children: [
        "02 / Per-character lines",
        t.length > 1 && /* @__PURE__ */ c.jsx("span", { className: a$, children: "· Alt+↑↓ to reorder" })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: z8, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: O8, children: ie.toString().padStart(2, "0") }),
        " lines",
        V > 0 && /* @__PURE__ */ c.jsxs("span", { className: K8, children: [
          /* @__PURE__ */ c.jsxs(
            "button",
            {
              ref: N,
              type: "button",
              className: r$,
              "aria-haspopup": "dialog",
              "aria-expanded": S,
              "aria-controls": f,
              title: "Click to see unmapped characters",
              onClick: () => j((B) => !B),
              children: [
                "⚠ ",
                V,
                " unmapped"
              ]
            },
            P
          ),
          S && /* @__PURE__ */ c.jsxs(
            "div",
            {
              ref: R,
              id: f,
              role: "dialog",
              "aria-label": "Unmapped characters",
              className: X8,
              children: [
                /* @__PURE__ */ c.jsx("p", { className: Q8, children: "These characters have no voice mapping. Click a name to jump to its row." }),
                /* @__PURE__ */ c.jsx("ul", { className: Z8, children: M.map((B) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsx(
                  "button",
                  {
                    type: "button",
                    className: J8,
                    onClick: () => K(B),
                    children: B
                  }
                ) }, B)) })
              ]
            }
          )
        ] })
      ] })
    ] }),
    t.length === 0 ? /* @__PURE__ */ c.jsx("p", { className: t$, children: "No lines yet — add a character line to start. Each row produces one utterance." }) : /* @__PURE__ */ c.jsx("ul", { className: L8, children: t.map((B, W) => {
      const ce = B.character.trim() || `line ${W + 1}`, ye = i.has(B.character.trim().toLowerCase()), Me = T === B.id, lt = _ === B.id && T !== B.id;
      return /* @__PURE__ */ c.jsxs(
        "li",
        {
          className: $8,
          "data-mapped": ye || void 0,
          "data-dragging": Me || void 0,
          "data-drag-over": lt || void 0,
          onDragOver: (Ce) => k(Ce, B.id),
          onDrop: (Ce) => ee(Ce, B.id),
          onDragEnd: te,
          children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: U8,
                draggable: !0,
                "aria-label": `Drag to reorder ${ce}. Use Alt+ArrowUp / Alt+ArrowDown for keyboard reorder.`,
                title: "Drag to reorder · Alt+↑ / Alt+↓",
                onDragStart: (Ce) => de(Ce, B.id),
                onKeyDown: (Ce) => {
                  Ce.altKey && Ce.key === "ArrowUp" ? (Ce.preventDefault(), U(B.id, -1)) : Ce.altKey && Ce.key === "ArrowDown" && (Ce.preventDefault(), U(B.id, 1));
                },
                children: "⋮⋮"
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: I8, "aria-hidden": "true", children: (W + 1).toString().padStart(2, "0") }),
            /* @__PURE__ */ c.jsx(
              "input",
              {
                ref: (Ce) => {
                  Ce ? b.current.set(B.id, Ce) : b.current.delete(B.id);
                },
                type: "text",
                value: B.character,
                onChange: (Ce) => G(B.id, { character: Ce.target.value }),
                placeholder: "Character",
                className: V8,
                "aria-label": `Character name for ${ce}`,
                list: Z.length > 0 ? o : void 0,
                autoComplete: "off",
                spellCheck: !1
              }
            ),
            /* @__PURE__ */ c.jsxs(
              "select",
              {
                value: B.presetId ?? "",
                onChange: (Ce) => G(B.id, { presetId: Ce.target.value === "" ? null : Ce.target.value }),
                className: q8,
                "aria-label": `Emotion preset for ${ce}`,
                children: [
                  /* @__PURE__ */ c.jsx("option", { value: "", children: "No emotion" }),
                  s.map((Ce) => /* @__PURE__ */ c.jsx("option", { value: Ce.presetId, children: Ce.presetName }, Ce.presetId))
                ]
              }
            ),
            /* @__PURE__ */ c.jsxs("span", { className: H8, children: [
              /* @__PURE__ */ c.jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 1,
                  step: 0.05,
                  value: B.alpha,
                  onChange: (Ce) => G(B.id, { alpha: Number.parseFloat(Ce.target.value) }),
                  className: F8,
                  "aria-label": `Emotion intensity for ${ce}`,
                  "aria-valuetext": `${Math.round(B.alpha * 100)} percent`
                }
              ),
              /* @__PURE__ */ c.jsx(
                "span",
                {
                  className: P8,
                  "aria-hidden": "true",
                  "data-hot": B.alpha >= 0.85 || void 0,
                  children: (Math.round(B.alpha * 100) / 100).toFixed(2)
                }
              )
            ] }),
            /* @__PURE__ */ c.jsx(
              "input",
              {
                ref: (Ce) => {
                  Ce ? y.current.set(B.id, Ce) : y.current.delete(B.id);
                },
                type: "text",
                value: B.text,
                onChange: (Ce) => G(B.id, { text: Ce.target.value }),
                onKeyDown: (Ce) => se(Ce, B.id),
                placeholder: "Line text…",
                className: G8,
                "aria-label": `Line text for ${ce}`
              }
            ),
            /* @__PURE__ */ c.jsx(
              "button",
              {
                ref: (Ce) => {
                  Ce ? p.current.set(B.id, Ce) : p.current.delete(B.id);
                },
                type: "button",
                className: Y8,
                "aria-label": `Remove ${ce}`,
                title: "Remove this line",
                onClick: () => A(B.id),
                children: "✕"
              }
            ),
            W < t.length - 1 && /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: B8,
                "aria-label": `Insert line after ${ce}`,
                title: "Insert line below",
                onClick: () => F(B.id),
                tabIndex: -1,
                children: /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "＋" })
              }
            )
          ]
        },
        B.id
      );
    }) }),
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: m,
        type: "button",
        className: W8,
        onClick: () => F(null),
        "aria-label": "Add character line",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: e$, "aria-hidden": "true", children: "＋" }),
          "Add line"
        ]
      }
    ),
    Z.length > 0 && /* @__PURE__ */ c.jsx("datalist", { id: o, children: Z.map((B) => /* @__PURE__ */ c.jsx("option", { value: B }, B)) }),
    /* @__PURE__ */ c.jsx("div", { className: n$, role: "status", "aria-live": "polite", "aria-atomic": "true", children: I })
  ] });
}
var i$ = "fmg0gf0", l$ = "fmg0gf1", dx = { idle: "fmg0gf3 fmg0gf2", active: "fmg0gf4 fmg0gf2" };
const Hs = [
  { id: "quick", label: "Quick", glyph: "01", description: "Single voice · plain prose" },
  { id: "rows", label: "Per-character", glyph: "02", description: "One row per line · multi-voice" },
  { id: "story", label: "Story", glyph: "03", description: "Free-form text with @character and /emotion commands" },
  { id: "storyboard", label: "Storyboard", glyph: "04", description: "Click words to cast voice + emotion in bulk · shift-click to extend a range" }
], o$ = Hs;
function c$({
  value: t,
  onChange: a,
  storyDisabled: s = !1
}) {
  const i = g.useRef([]), o = g.useCallback(
    (f, m) => {
      const y = Hs.length;
      let p = f;
      for (let v = 1; v <= y; v += 1) {
        const w = (f + m * v + y) % y, S = Hs[w];
        if (!S) continue;
        if (!(S.id === "story" && s)) {
          p = w;
          break;
        }
      }
      const b = Hs[p];
      b && (a(b.id), i.current[p]?.focus());
    },
    [a, s]
  ), u = g.useCallback(
    (f, m) => {
      f.key === "ArrowRight" || f.key === "ArrowDown" ? (f.preventDefault(), o(m, 1)) : f.key === "ArrowLeft" || f.key === "ArrowUp" ? (f.preventDefault(), o(m, -1)) : f.key === "Home" ? (f.preventDefault(), o(-1, 1)) : f.key === "End" && (f.preventDefault(), o(Hs.length, -1));
    },
    [o]
  );
  return /* @__PURE__ */ c.jsx("div", { className: i$, role: "radiogroup", "aria-label": "Editor mode", children: Hs.map((f, m) => {
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
        className: y ? dx.active : dx.idle,
        onClick: () => {
          p || a(f.id);
        },
        onKeyDown: (v) => u(v, m),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: l$, "aria-hidden": "true", children: f.glyph }),
          /* @__PURE__ */ c.jsx("span", { children: b })
        ]
      },
      f.id
    );
  }) });
}
const u$ = [
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
function d$(t, a) {
  const s = t.ownerDocument;
  if (!s) return { top: 0, left: 0, height: 0 };
  const i = s.createElement("div"), o = s.defaultView?.getComputedStyle(t);
  if (!o) return { top: 0, left: 0, height: 0 };
  const u = i.style, f = o;
  for (const N of u$) {
    const R = f[N];
    typeof R == "string" && (u[N] = R);
  }
  i.style.position = "absolute", i.style.visibility = "hidden", i.style.overflow = "hidden", i.style.top = "0", i.style.left = "-9999px", i.style.whiteSpace = "pre-wrap", i.style.wordWrap = "break-word";
  const m = t.value.slice(0, a), y = s.createTextNode(m.replace(/ /g, " ")), p = s.createElement("span");
  p.textContent = t.value.slice(a, a + 1) || ".", i.appendChild(y), i.appendChild(p), s.body.appendChild(i);
  const b = p.getBoundingClientRect(), v = i.getBoundingClientRect(), w = b.top - v.top - t.scrollTop, S = b.left - v.left - t.scrollLeft, j = b.height || parseFloat(o.lineHeight) || 16;
  return s.body.removeChild(i), { top: w, left: S, height: j };
}
const Nw = {
  character: "@",
  emotion: "/"
}, Cw = /* @__PURE__ */ new Set([" ", "	", `
`, "\r"]), f$ = /[\p{L}\p{N}_-]/u, h$ = /[^\p{L}\p{N}_-]+/gu;
function Tw(t) {
  return t ? f$.test(t) : !1;
}
function m$(t) {
  return t.replace(h$, "_").replace(/_+/g, "_").replace(/^[_-]+|[_-]+$/g, "");
}
function p$(t, a) {
  if (a >= t.length) return 0;
  const s = t.charCodeAt(a);
  if (s >= 55296 && s <= 56319 && a + 1 < t.length) {
    const i = t.charCodeAt(a + 1);
    if (i >= 56320 && i <= 57343) return 2;
  }
  return 1;
}
function $c(t, a) {
  const s = p$(t, a);
  return s === 0 ? "" : t.slice(a, a + s);
}
function Uc(t) {
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
    const f = t[i], m = f === "@" || f === "/", y = i === 0 ? "" : $c(t, jc(t, i)), p = i === 0 || y !== "" && Cw.has(y);
    if (m && p) {
      let b = i + 1, v = "";
      for (; b < o; ) {
        const w = $c(t, b);
        if (w && Tw(w))
          v += w, b += w.length;
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
function jc(t, a) {
  if (a <= 0) return -1;
  const s = t.charCodeAt(a - 1);
  if (s >= 56320 && s <= 57343 && a >= 2) {
    const i = t.charCodeAt(a - 2);
    if (i >= 55296 && i <= 56319) return a - 2;
  }
  return a - 1;
}
function g$(t, a) {
  if (a <= 0 || a > t.length) return null;
  let s = jc(t, a), i = "";
  for (; s >= 0; ) {
    const o = $c(t, s);
    if (!o) break;
    if (o === "@" || o === "/") {
      const f = s === 0 ? "" : $c(t, jc(t, s));
      return s === 0 || f !== "" && Cw.has(f) ? {
        kind: o === "@" ? "character" : "emotion",
        start: s,
        query: i
      } : null;
    }
    if (!Tw(o)) return null;
    i = o + i;
    const u = jc(t, s);
    if (u < 0) break;
    s = u;
  }
  return null;
}
var v$ = "_1d2ofoy5", y$ = "_1d2ofoy6", b$ = "_1d2ofoy8 _1d2ofoy7", x$ = "_1d2ofoy9 _1d2ofoy7", S$ = "_1d2ofoya", w$ = "_1d2ofoyb", j$ = "_1d2ofoyc", E$ = "_1d2ofoye", N$ = "_1d2ofoyf", C$ = "_1d2ofoyg", T$ = "_1d2ofoyh", R$ = "_1d2ofoyi", _$ = "_1d2ofoyj", lc = "_1d2ofoyk", M$ = "_1d2ofoyl";
const A$ = `Type @character to set the speaker, /emotion to set the emotion preset.

@bob /happy I love mornings!
@alice /melancholic I prefer evenings.`;
function k$({
  value: t,
  onChange: a,
  characters: s,
  presets: i,
  mappingsByLower: o
}) {
  const u = g.useRef(null), f = g.useRef(null), m = g.useId(), y = `${m}-opt`, [p, b] = g.useState(null), v = g.useMemo(() => Uc(t), [t]), w = g.useMemo(() => {
    const D = /* @__PURE__ */ new Map();
    o.forEach((P) => D.set(P.characterName.toLowerCase(), P.characterName));
    for (const P of s) {
      const J = P.toLowerCase();
      D.has(J) || D.set(J, P);
    }
    return Array.from(D.values()).sort((P, J) => P.localeCompare(J));
  }, [s, o]), S = g.useMemo(() => {
    if (!p) return [];
    const D = p.query.toLowerCase();
    if (p.kind === "character")
      return w.filter((Z) => Z.toLowerCase().includes(D)).slice(0, 8).map((Z) => {
        const G = o.get(Z.toLowerCase());
        return { value: Z, hint: G ? "mapped" : "unmapped" };
      });
    const P = /* @__PURE__ */ new Set(), J = [];
    for (const Z of i) {
      const G = Z.presetName.toLowerCase();
      if (G.includes(D) && !P.has(G) && (P.add(G), J.push({ value: Z.presetName, hint: "vector" }), J.length >= 8))
        break;
    }
    return J;
  }, [p, w, o, i]), j = g.useCallback((D, P, J) => {
    if (P < 0) return null;
    const Z = g$(D, P);
    if (!Z) return null;
    const G = u.current, re = G ? d$(G, P) : { top: 0, left: 0, height: 0 };
    return {
      triggerStart: Z.start,
      query: Z.query,
      kind: Z.kind,
      selected: J && J.kind === Z.kind ? J.selected : 0,
      caretTop: re.top,
      caretLeft: re.left,
      caretHeight: re.height
    };
  }, []), N = g.useCallback(() => {
    const D = u.current;
    if (!D) {
      b(null);
      return;
    }
    const P = D.selectionStart;
    if (P !== D.selectionEnd) {
      b(null);
      return;
    }
    b((J) => j(t, P, J));
  }, [t, j]);
  g.useEffect(() => {
    if (!p) return;
    const D = S.length, P = D === 0 ? 0 : Math.min(p.selected, D - 1);
    p.selected !== P && b({ ...p, selected: P });
  }, [p, S]), g.useLayoutEffect(() => {
    const D = f.current, P = u.current;
    !D || !P || (D.scrollTop = P.scrollTop, D.scrollLeft = P.scrollLeft);
  }), g.useEffect(() => {
    const D = u.current, P = f.current;
    if (!D || !P) return;
    const J = () => {
      P.scrollTop = D.scrollTop, P.scrollLeft = D.scrollLeft;
    };
    return D.addEventListener("scroll", J, { passive: !0 }), () => D.removeEventListener("scroll", J);
  }, []);
  const R = g.useCallback(
    (D) => {
      const P = D.target.value;
      a(P);
      const J = D.target;
      requestAnimationFrame(() => {
        const Z = J.selectionStart;
        if (Z !== J.selectionEnd) {
          b(null);
          return;
        }
        b((G) => j(P, Z, G));
      });
    },
    [a, j]
  ), T = g.useCallback(() => {
    N();
  }, [N]), L = g.useCallback(
    (D, P) => {
      if (!p) return;
      const J = Nw[p.kind], Z = p.triggerStart + 1 + p.query.length, G = t.slice(0, p.triggerStart), re = t.slice(Z), A = m$(D);
      if (!A) return;
      const F = `${J}${A} `, U = `${G}${F}${re}`;
      a(U);
      const se = G.length + F.length;
      b(null), P.advanceFocus || requestAnimationFrame(() => {
        u.current && (u.current.focus(), u.current.setSelectionRange(se, se));
      });
    },
    [p, t, a]
  ), _ = g.useCallback(
    (D) => {
      if (p) {
        if (D.key === "Escape") {
          D.preventDefault(), b(null);
          return;
        }
        if (S.length !== 0) {
          if (D.key === "ArrowDown")
            D.preventDefault(), b((P) => P && { ...P, selected: (P.selected + 1) % S.length });
          else if (D.key === "ArrowUp")
            D.preventDefault(), b(
              (P) => P && { ...P, selected: (P.selected - 1 + S.length) % S.length }
            );
          else if (D.key === "Enter") {
            const P = S[p.selected];
            P && (D.preventDefault(), L(P.value, { advanceFocus: !1 }));
          } else if (D.key === "Tab") {
            const P = S[p.selected];
            P && L(P.value, { advanceFocus: !0 });
          }
        }
      }
    },
    [p, S, L]
  ), C = g.useRef(null), [I, Y] = g.useState(null);
  g.useLayoutEffect(() => {
    if (!p) {
      Y(null);
      return;
    }
    const D = C.current, P = u.current;
    if (!D || !P) return;
    const J = D.offsetWidth, Z = P.clientWidth, G = Math.max(0, Z - J - 8), re = Math.max(0, p.caretLeft);
    Y(Math.min(re, G));
  }, [p]);
  const ie = p?.kind === "character" ? "Character" : "Emotion preset", M = p && S.length > 0 ? `${y}-${p.selected}` : void 0, V = !p || S.length > 0 ? null : p.kind === "emotion" ? i.length === 0 ? "No emotion presets yet — create one in Mappings." : `No preset matches "${p.query}". Type a different name or pick from Mappings.` : p.query.length === 0 ? "Type a name — we'll create a new character on the fly." : `No character "${p.query}" yet — keep typing to define a new one.`;
  return /* @__PURE__ */ c.jsxs("div", { className: v$, children: [
    /* @__PURE__ */ c.jsxs("div", { className: y$, children: [
      /* @__PURE__ */ c.jsx("div", { ref: f, className: b$, "aria-hidden": "true", children: D$(v, p?.triggerStart ?? null) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          ref: u,
          className: x$,
          value: t,
          onChange: R,
          onSelect: T,
          onKeyDown: _,
          placeholder: A$,
          rows: 10,
          spellCheck: !0,
          "aria-label": "Story script",
          "aria-controls": p && S.length > 0 ? m : void 0,
          "aria-autocomplete": "list",
          "aria-activedescendant": M
        }
      ),
      p && (S.length > 0 || V) && /* @__PURE__ */ c.jsxs(
        "div",
        {
          ref: C,
          className: E$,
          style: {
            top: `${p.caretTop + p.caretHeight + 6}px`,
            left: `${I ?? Math.max(0, p.caretLeft)}px`
          },
          children: [
            /* @__PURE__ */ c.jsx("div", { className: N$, "aria-hidden": "true", children: ie }),
            S.length > 0 ? /* @__PURE__ */ c.jsx(
              "ul",
              {
                id: m,
                role: "listbox",
                "aria-label": ie,
                className: C$,
                children: S.map((D, P) => {
                  const J = `${y}-${P}`, Z = P === p.selected;
                  return /* @__PURE__ */ c.jsxs(
                    "li",
                    {
                      id: J,
                      role: "option",
                      "aria-selected": Z,
                      "data-active": Z || void 0,
                      className: T$,
                      onMouseDown: (G) => {
                        G.preventDefault(), L(D.value, { advanceFocus: !1 });
                      },
                      children: [
                        /* @__PURE__ */ c.jsx("span", { children: D.value }),
                        D.hint && /* @__PURE__ */ c.jsx("span", { className: R$, children: D.hint })
                      ]
                    },
                    `${D.value}-${P}`
                  );
                })
              }
            ) : /* @__PURE__ */ c.jsx("div", { id: m, role: "status", className: M$, children: V })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: _$, children: [
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: lc, children: "@" }),
        " character"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: lc, children: "/" }),
        " emotion"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: lc, children: "⏎" }),
        " commits"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: lc, children: "⇥" }),
        " commits + advance"
      ] })
    ] })
  ] });
}
function D$(t, a) {
  return t.map((s, i) => {
    if (s.kind === "text")
      return /* @__PURE__ */ c.jsx("span", { className: S$, children: s.value }, `${s.start}-${i}`);
    const o = s.kind, u = a !== null && s.start === a, f = s.value.replace(/_/g, " ");
    return /* @__PURE__ */ c.jsxs(
      "span",
      {
        className: j$,
        "data-kind": o,
        "data-active": u ? "true" : void 0,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: w$, children: Nw[o] }),
          f
        ]
      },
      `${s.start}-${i}`
    );
  });
}
var z$ = "_5o8xvy0", O$ = "_5o8xvy1", L$ = "_5o8xvy2", $$ = "_5o8xvy3", Gf = "_5o8xvy4", U$ = "_5o8xvy5", B$ = "_3f2ar0", I$ = "_3f2ar1", V$ = "_3f2ar2", q$ = "_3f2ar3", H$ = "_3f2ar4", F$ = "_3f2ar6", sl = "_3f2ar7", il = "_3f2ar8", ll = "_3f2ar9", fx = "_3f2ara", hx = "_3f2arb";
function P$({ label: t, glyph: a = "?", children: s }) {
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
  }, [i, y]), /* @__PURE__ */ c.jsxs("span", { ref: u, className: B$, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        id: f,
        className: I$,
        "aria-expanded": i,
        "aria-controls": m,
        onClick: () => o((p) => !p),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: V$, "aria-hidden": "true", children: a }),
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
        className: q$,
        children: s
      }
    )
  ] });
}
var G$ = "_1dxb1dg0", mx = "_1dxb1dg1", Y$ = "_1dxb1dg2", K$ = "_1dxb1dg3", X$ = "_1dxb1dg4";
function Q$() {
  return /* @__PURE__ */ c.jsxs(P$, { label: "Syntax", glyph: "?", children: [
    /* @__PURE__ */ c.jsx("h3", { className: H$, children: "Script syntax" }),
    /* @__PURE__ */ c.jsxs("ul", { className: F$, children: [
      /* @__PURE__ */ c.jsxs("li", { className: sl, children: [
        /* @__PURE__ */ c.jsx("code", { className: il, children: "[Char] line text" }),
        /* @__PURE__ */ c.jsx("span", { className: ll, children: "Plain line — uses the speaker's mapped voice." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: sl, children: [
        /* @__PURE__ */ c.jsx("code", { className: il, children: "[Char|emotion_vector:happy=0.7]" }),
        /* @__PURE__ */ c.jsx("span", { className: ll, children: "Per-line 8-axis emotion override. Combine axes with commas." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: sl, children: [
        /* @__PURE__ */ c.jsx("code", { className: il, children: "[Char|qwen:Friendly teen]" }),
        /* @__PURE__ */ c.jsx("span", { className: ll, children: "Send a free-text mood prompt — the Qwen helper turns it into an emotion vector." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: sl, children: [
        /* @__PURE__ */ c.jsx("code", { className: il, children: "[Char|preset:Bittersweet]" }),
        /* @__PURE__ */ c.jsx("span", { className: ll, children: "Apply a saved preset by name." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: sl, children: [
        /* @__PURE__ */ c.jsx("code", { className: il, children: "[Char|audio:slow_breath.wav]" }),
        /* @__PURE__ */ c.jsx("span", { className: ll, children: "Use a reference audio clip as the emotion source." })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: fx, children: [
      /* @__PURE__ */ c.jsx("span", { className: hx, children: "Quick mode" }),
      ": when enabled no [Char] tags are required — every line uses the deployment's default voice. Toggle it above the editor."
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: fx, children: [
      /* @__PURE__ */ c.jsx("span", { className: hx, children: "Mappings" }),
      ": assign characters to voices in the Cast section below. Unmapped characters in non-quick mode trigger a pre-flight warning."
    ] })
  ] });
}
function Z$() {
  return /* @__PURE__ */ c.jsxs("ul", { className: G$, children: [
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: mx, children: "[Char]" }),
      " plain line"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: mx, children: "[Char|emotion_vector:happy=0.7]" }),
      " per-line vector"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: Y$, children: "[Char|qwen:warm]" }),
      " AI prompt mapping"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: K$, children: "[Char|preset:Bittersweet]" }),
      " saved preset"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: X$, children: "[Char|audio:slow_breath.wav]" }),
      " audio reference"
    ] })
  ] });
}
function J$({
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
  defaultVoiceAssetId: w,
  onDefaultVoiceAssetIdChange: S,
  presets: j,
  voiceAssets: N,
  onQueueChange: R,
  onStoryboardJobsChange: T,
  jobProgress: L
}) {
  const _ = t === "quick", C = t === "rows", I = t === "story", Y = t === "storyboard", ie = I || Y, M = o$.find((Z) => Z.id === t)?.description ?? "", V = C ? u.reduce((Z, G) => Z + G.text.length, 0) : ie ? m.length : i.length, D = C ? u.map((Z) => Z.text).join(" ") : ie ? m : i, P = D.trim() ? D.trim().split(/\s+/).length : 0, J = C ? u.filter((Z) => Z.text.trim().length > 0).length : (ie ? m : i).trim() ? (ie ? m : i).trim().split(/\r?\n/).filter((Z) => Z.trim()).length : 0;
  return /* @__PURE__ */ c.jsxs("div", { className: z$, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: `${O$} ${_ ? L$ : ""}`,
        "data-quick-on": _ || void 0,
        children: [
          /* @__PURE__ */ c.jsx(c$, { value: t, onChange: a }),
          _ && /* @__PURE__ */ c.jsx(
            b8,
            {
              deploymentId: s.deploymentId,
              initialVoiceAssetId: w,
              onChange: S
            }
          ),
          /* @__PURE__ */ c.jsxs("div", { className: $$, "aria-live": "polite", children: [
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Gf, children: V.toString().padStart(3, "0") }),
              " ",
              "chars"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Gf, children: J.toString().padStart(2, "0") }),
              " ",
              "lines"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Gf, children: P.toString().padStart(3, "0") }),
              " ",
              "words"
            ] }),
            !C && /* @__PURE__ */ c.jsx(Q$, {})
          ] })
        ]
      }
    ),
    /* @__PURE__ */ c.jsx("p", { className: U$, "aria-live": "polite", children: M }),
    Y ? /* @__PURE__ */ c.jsx(
      z6,
      {
        voiceAssets: N,
        presets: j,
        storyText: m,
        onStoryTextChange: y,
        mappings: v,
        onQueueChange: R,
        onJobsChange: T,
        jobProgress: L
      }
    ) : C ? /* @__PURE__ */ c.jsx(
      s$,
      {
        rows: u,
        onRowsChange: f,
        presets: j,
        mappingsByLower: v
      }
    ) : I ? /* @__PURE__ */ c.jsx(
      k$,
      {
        value: m,
        onChange: y,
        characters: p,
        presets: j,
        mappingsByLower: v
      }
    ) : /* @__PURE__ */ c.jsx(
      w8,
      {
        value: i,
        onChange: o,
        outputFormat: b,
        mappings: v,
        deploymentId: s.deploymentId,
        quickMode: _
      }
    ),
    !_ && !C && !I && !Y && /* @__PURE__ */ c.jsx(Z$, {})
  ] });
}
function W$({
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
function px(t, a) {
  return t === "quick" ? a.script.trim().length > 0 : t === "rows" ? a.rows.some((s) => s.text.trim().length > 0 || s.character.trim().length > 0) : a.storyText.trim().length > 0;
}
function eU(t, a, s, i) {
  if (t === a) return null;
  if (t === "quick" && a === "rows") {
    const u = s.script.split(/\r?\n/).filter((f) => f.trim().length > 0).map((f) => ({
      ...Yr(),
      text: f.trim()
    }));
    return { rows: u.length > 0 ? u : [Yr()] };
  }
  if (t === "quick" && a === "story")
    return { storyText: s.script };
  if (t === "rows" && a === "quick")
    return { script: Ew(s.rows, i) };
  if (t === "rows" && a === "story") {
    const o = /* @__PURE__ */ new Map();
    for (const f of i) o.set(f.presetId, f);
    const u = [];
    for (const f of s.rows) {
      const m = f.text.trim();
      if (!m) continue;
      const y = f.character.trim(), p = f.presetId ? o.get(f.presetId) : null, b = [];
      y && b.push(`@${gx(y)}`), p && b.push(`/${gx(p.presetName)}`), b.push(m), u.push(b.join(" "));
    }
    return { storyText: u.join(`
`) };
  }
  if (t === "story" && a === "quick") {
    const o = Uc(s.storyText), u = [];
    for (const m of o)
      m.kind === "text" && u.push(m.value);
    return { script: u.join("").split(/\r?\n/).map((m) => m.replace(/[ \t]+/g, " ").trim()).filter((m) => m.length > 0).join(`
`) };
  }
  if (t === "story" && a === "rows") {
    const o = Uc(s.storyText), u = /* @__PURE__ */ new Map();
    for (const w of i) u.set(w.presetName.toLowerCase(), w);
    const f = [];
    let m = "", y = null, p = "", b = !1;
    const v = () => {
      const w = p.split(/\r?\n/).map((j) => j.replace(/[ \t]+/g, " ").trim()).filter((j) => j.length > 0);
      if (p = "", w.length === 0) return;
      const S = w[0];
      if (S !== void 0) {
        f.push({
          ...Yr(),
          character: m,
          presetId: y,
          alpha: 1,
          text: S
        });
        for (let j = 1; j < w.length; j += 1) {
          const N = w[j];
          N !== void 0 && f.push({
            ...Yr(),
            character: "",
            presetId: null,
            alpha: 1,
            text: N
          });
        }
      }
    };
    for (const w of o)
      if (w.kind === "character")
        b && v(), m = w.value, y = null, b = !0;
      else if (w.kind === "emotion") {
        b && v();
        const S = u.get(w.value.toLowerCase());
        y = S ? S.presetId : null, b = !0;
      } else
        p += w.value, b = !0;
    return v(), { rows: f.length > 0 ? f : [Yr()] };
  }
  return null;
}
function gx(t) {
  return t.replace(/[^\p{L}\p{N}_-]/gu, "_");
}
const Yf = [
  "#ba9eff",
  "#9093ff",
  "#ff8439",
  "#22c55e",
  "#ffd34a",
  "#ff7aa8"
], tU = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;
function nU(t) {
  const a = [];
  if (!t) return a;
  const s = t.split(/\r?\n/);
  for (let i = 0; i < s.length; i += 1) {
    const u = (s[i] ?? "").trim();
    if (u.length === 0) continue;
    const f = u.match(tU);
    if (!f || !f.groups) {
      a.push({ idx: i, character: null, text: u, override: null });
      continue;
    }
    const m = f.groups.body ?? "", y = (f.groups.rest ?? "").trim(), [p = "", ...b] = m.split("|"), v = p.trim();
    if (!v) {
      a.push({ idx: i, character: null, text: y || u, override: null });
      continue;
    }
    const w = v.split(":")[0]?.trim() || null, S = b.join("|").trim(), j = S ? aU(S) : null;
    a.push({
      idx: i,
      character: w,
      text: y,
      override: j
    });
  }
  return a;
}
function aU(t) {
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
function rU(t) {
  const a = /* @__PURE__ */ new Set(), s = [];
  for (const i of t) {
    if (!i.character) continue;
    const o = i.character.toLowerCase();
    a.has(o) || (a.add(o), s.push(i.character));
  }
  return s;
}
function sU(t) {
  const a = {};
  for (let s = 0; s < t.length; s += 1) {
    const i = t[s];
    i && (a[i] = Yf[s % Yf.length] ?? Yf[0]);
  }
  return a;
}
function iU(t) {
  const a = {};
  for (const s of t)
    s.character && (a[s.character] = (a[s.character] ?? 0) + 1);
  return a;
}
var lU = "_1snzz30", oU = "_1snzz31", cU = "_1snzz33", uU = "_1snzz34", dU = "_1snzz36", vx = "_1snzz3b", yx = "_1snzz3c", bx = "_1snzz3d";
const fU = "ext-action-invoke", hU = "emotion-tts.run";
function mU() {
  if (typeof document > "u") return !1;
  const t = document.querySelector("emotion-tts-app");
  return t ? (t.dispatchEvent(
    new CustomEvent(fU, {
      detail: { id: hU },
      bubbles: !1
    })
  ), !0) : !1;
}
const pU = 4e3;
function gU({ visible: t, canGenerate: a }) {
  const [s, i] = g.useState(null), [o, u] = g.useState(!1), [f, m] = g.useState(!1), y = g.useRef(null);
  g.useEffect(() => {
    let F = !1;
    const U = async () => {
      try {
        const de = await vl();
        F || (y.current = de, i(de));
      } catch {
      }
    };
    U();
    const se = window.setInterval(U, pU);
    return () => {
      F = !0, window.clearInterval(se);
    };
  }, []), g.useEffect(() => fw((F) => {
    m(!!F.busy);
  }), []);
  const p = g.useCallback(() => {
    nO();
  }, []), b = s?.badge ?? "not_installed", v = b === "ready" || b === "running", w = b === "starting" || b === "installing" || b === "stopping", S = v;
  g.useEffect(() => {
    o && (w || v) && u(!1);
  }, [o, w, v]);
  const j = g.useCallback(() => {
    u(!0), mU();
  }, []), N = v ? "Stop runtime" : w ? "Runtime starting…" : "Start runtime", R = o || w, T = o || w, L = T ? "transitioning" : v ? "running" : "stopped", _ = !a || f || !S, C = S ? a ? f ? "Generating…" : "Generate" : "Add a script to generate" : "Start runtime to generate", I = S && a && !f, Y = v ? "ready" : w || o ? "busy" : "off", ie = v ? "Runtime ready" : w ? "Starting…" : o ? "Working…" : "Runtime off", M = Y === "busy";
  if (typeof document > "u") return /* @__PURE__ */ c.jsx(c.Fragment, {});
  const V = "rgba(28, 30, 34, 0.94)", D = "#ba9eff", P = "#8455ef", J = "#1a0a3a", Z = "#f0f0f3", G = "#aaabae", re = "#22c55e", A = v ? "◼" : "⏻";
  return Zh.createPortal(
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: lU,
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
          background: V,
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
              className: oU,
              "data-tone": Y,
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
                color: Y === "ready" ? re : Y === "busy" ? D : G,
                background: "rgba(255, 255, 255, 0.04)",
                boxShadow: `inset 0 0 0 1px ${Y === "ready" ? "rgba(34, 197, 94, 0.4)" : Y === "busy" ? "rgba(186, 158, 255, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                whiteSpace: "nowrap"
              },
              children: [
                /* @__PURE__ */ c.jsx(
                  "span",
                  {
                    className: cU,
                    "data-pulse": M ? "true" : "false",
                    "aria-hidden": "true",
                    style: {
                      width: "6px",
                      height: "6px",
                      borderRadius: "999px",
                      background: "currentColor",
                      boxShadow: Y === "ready" ? `0 0 8px ${re}` : Y === "busy" ? `0 0 8px ${D}` : "none",
                      flexShrink: 0
                    }
                  }
                ),
                ie
              ]
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: yx, children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: uU,
                "data-state": L,
                onClick: j,
                disabled: R,
                "aria-label": N,
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  border: "none",
                  borderRadius: "999px",
                  background: L === "running" ? "rgba(34, 197, 94, 0.18)" : "rgba(255, 255, 255, 0.05)",
                  color: L === "running" ? re : Z,
                  fontSize: "16px",
                  cursor: R ? "not-allowed" : "pointer",
                  opacity: R ? 0.6 : 1,
                  boxShadow: `inset 0 0 0 1px ${L === "running" ? "rgba(34, 197, 94, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                  transition: "background 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease"
                },
                children: T ? /* @__PURE__ */ c.jsx("span", { className: vx, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: A })
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: bx, role: "tooltip", children: N })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: yx, children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: dU,
                "data-ready": I ? "true" : "false",
                onClick: p,
                disabled: _,
                "aria-label": C,
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  paddingInline: "18px",
                  height: "36px",
                  border: "none",
                  borderRadius: "999px",
                  background: _ ? "rgba(186, 158, 255, 0.18)" : `linear-gradient(180deg, ${D} 0%, ${P} 100%)`,
                  color: _ ? G : J,
                  fontFamily: 'var(--font-ui, "Inter", system-ui, -apple-system, sans-serif)',
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  cursor: _ ? "not-allowed" : "pointer",
                  boxShadow: _ ? "none" : "0 6px 20px -6px rgba(132, 85, 239, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
                  transition: "transform 160ms ease, box-shadow 160ms ease, color 160ms ease",
                  whiteSpace: "nowrap"
                },
                children: [
                  f ? /* @__PURE__ */ c.jsx("span", { className: vx, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { style: { fontSize: "11px" }, "aria-hidden": "true", children: "▶" }),
                  /* @__PURE__ */ c.jsx("span", { children: f ? "Running" : "Generate" })
                ]
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: bx, role: "tooltip", children: C })
          ] })
        ]
      }
    ),
    document.body
  );
}
function vU(t) {
  const a = t.workflowCustomised ?? !1, s = t.unmappableFields ?? [], i = yU(t.deployment.displayName, t.deployment.deploymentId), o = pw(gw), u = t.canGenerate ?? !1;
  return /* @__PURE__ */ c.jsxs("div", { className: UR, children: [
    /* @__PURE__ */ c.jsxs("header", { className: BR, children: [
      /* @__PURE__ */ c.jsx("div", { className: VR, children: "EmotionTTS · Recipe Studio" }),
      /* @__PURE__ */ c.jsx("div", { className: IR, children: /* @__PURE__ */ c.jsx("h1", { className: qR, children: i }) }),
      /* @__PURE__ */ c.jsx("p", { className: HR, children: "Author the script, cast the voices, sculpt the emotion, and modulate every utterance — all from a single screen, with cache-bound previews and a non-destructive edit chain." }),
      t.hero
    ] }),
    a && /* @__PURE__ */ c.jsxs(kn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("strong", { children: "Workflow customised." }),
      " ",
      s.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${s.join(", ")}.`,
      " ",
      /* @__PURE__ */ c.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    t.quickActions && /* @__PURE__ */ c.jsx("div", { className: e_, "aria-label": "Quick actions", children: t.quickActions }),
    t.recentGenerations,
    /* @__PURE__ */ c.jsxs("div", { className: FR, children: [
      /* @__PURE__ */ c.jsx(
        pr,
        {
          number: "01",
          title: "Script",
          id: "recipe-section-script",
          variant: "default",
          children: t.scriptSection
        }
      ),
      /* @__PURE__ */ c.jsx(
        pr,
        {
          number: "02",
          title: "Parsed dialogue",
          id: "recipe-section-parsed",
          variant: "default",
          children: t.parsedDialogueSection
        }
      ),
      t.voiceLibrarySection && /* @__PURE__ */ c.jsx(
        pr,
        {
          number: "03",
          title: "Voice library",
          id: "recipe-section-voice-library",
          variant: "default",
          children: t.voiceLibrarySection
        }
      ),
      /* @__PURE__ */ c.jsx(
        pr,
        {
          number: t.voiceLibrarySection ? "04" : "03",
          title: "Cast",
          id: "recipe-section-cast",
          variant: "default",
          children: t.castSection
        }
      ),
      /* @__PURE__ */ c.jsx(
        pr,
        {
          number: t.voiceLibrarySection ? "05" : "04",
          title: "Emotion",
          id: "recipe-section-emotion",
          variant: "split",
          children: t.emotionSection
        }
      ),
      /* @__PURE__ */ c.jsx(
        pr,
        {
          number: t.voiceLibrarySection ? "06" : "05",
          title: "Performance",
          id: "recipe-section-performance",
          variant: "default",
          children: t.performanceSection
        }
      ),
      /* @__PURE__ */ c.jsx(
        pr,
        {
          number: t.voiceLibrarySection ? "07" : "06",
          title: "Recent runs",
          id: "recipe-section-runs",
          variant: "default",
          children: t.recentRunsSection
        }
      ),
      t.auditSection && /* @__PURE__ */ c.jsx(
        pr,
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
    /* @__PURE__ */ c.jsx(gU, { visible: o, canGenerate: u }),
    typeof document < "u" && Zh.createPortal(
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: t_,
          "data-visible": o ? "true" : "false",
          "aria-label": "Scroll to top",
          title: "Scroll to top",
          onClick: PO,
          children: "↑"
        }
      ),
      document.body
    )
  ] });
}
function yU(t, a) {
  const s = (t ?? "").trim();
  return !s || s === a ? "Recipe Studio" : s;
}
function pr({
  number: t,
  title: a,
  id: s,
  variant: i,
  defaultCollapsed: o = !1,
  children: u
}) {
  const [f, m] = g.useState(o), y = `${s}-body`;
  return /* @__PURE__ */ c.jsxs("section", { className: PR, "aria-labelledby": s, children: [
    /* @__PURE__ */ c.jsx("header", { className: GR, children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: XR,
        "aria-expanded": !f,
        "aria-controls": y,
        onClick: () => m((p) => !p),
        children: [
          /* @__PURE__ */ c.jsxs("span", { className: YR, children: [
            /* @__PURE__ */ c.jsx("span", { className: QR, children: t }),
            /* @__PURE__ */ c.jsx("span", { className: ZR, "aria-hidden": "true", children: "/" }),
            /* @__PURE__ */ c.jsx("span", { className: JR, children: a })
          ] }),
          /* @__PURE__ */ c.jsx("h2", { id: s, className: KR, children: a }),
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: WR,
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
        className: i === "split" ? a_ : n_,
        children: u
      }
    )
  ] });
}
const yn = {
  success(t) {
    pn.success(t);
  },
  error(t) {
    pn.error(t);
  }
}, Ah = "__recipe";
function bU(t) {
  try {
    const a = JSON.parse(t);
    return typeof a == "object" && a !== null ? a : {};
  } catch {
    return {};
  }
}
function xU(t) {
  const a = {};
  for (const s of Object.keys(t))
    s !== Ah && (a[s] = t[s]);
  return a;
}
function SU() {
  const { deployment: t, mappings: a, runs: s, workflow: i } = Tl(), [o, u] = g.useState(a), [f, m] = g.useState([]), [y, p] = g.useState([]), [b, v] = g.useState(null), [w, S] = g.useState(Yc), j = g.useMemo(
    () => t.defaultGenerationOverridesJson ? bU(t.defaultGenerationOverridesJson) : {},
    [t.defaultGenerationOverridesJson]
  ), N = g.useMemo(() => {
    const fe = j[Ah];
    return typeof fe == "object" && fe !== null ? fe : {};
  }, [j]), [R, T] = g.useState(""), [L, _] = g.useState(
    t.defaultOutputFormat ?? "mp3"
  ), [C, I] = g.useState(t.defaultSpeedFactor ?? 1), [Y, ie] = g.useState({
    mode: "none",
    emotionAlpha: 1
  }), [M, V] = g.useState(() => ({
    temperature: 0.8,
    top_p: 0.8,
    seed: 42,
    ...xU(j)
  })), [D, P] = g.useState(() => {
    const fe = N.cachePolicy;
    return fe === "use_cache" || fe === "force_regenerate" || fe === "read_only_cache" ? fe : "use_cache";
  }), [J, Z] = g.useState(
    t.defaultVoiceAssetId ?? null
  ), [G, re] = g.useState(() => {
    const fe = N.editorMode;
    return fe === "quick" || fe === "rows" || fe === "story" || fe === "storyboard" ? fe : typeof N.quickMode == "boolean" || t.defaultVoiceAssetId != null ? "quick" : "rows";
  }), A = G === "quick", [F, U] = g.useState(() => [Yr()]), se = 1e5, [de, k] = g.useState(() => {
    const fe = N.storyText;
    return typeof fe == "string" ? fe : "";
  }), ee = g.useRef(!1), te = g.useCallback((fe) => {
    fe.length > se && !ee.current && (ee.current = !0, yn.error(
      `Story text is over ${Math.round(se / 1e3)} KB — large scripts may slow down save and rendering.`
    )), fe.length <= se && (ee.current = !1), k(fe);
  }, []), [K, B] = g.useState(I5), [W, ce] = g.useState([]), [ye, Me] = g.useState([]), [lt, Ce] = g.useState(
    () => /* @__PURE__ */ new Map()
  ), Fe = g.useRef(R), qe = g.useRef(F), Pe = g.useRef(de), It = g.useRef(y);
  g.useEffect(() => {
    Fe.current = R;
  }, [R]), g.useEffect(() => {
    qe.current = F;
  }, [F]), g.useEffect(() => {
    Pe.current = de;
  }, [de]), g.useEffect(() => {
    It.current = y;
  }, [y]);
  const [Vt, _t] = g.useState(""), Re = g.useCallback(
    (fe) => {
      re((Ae) => {
        if (fe === Ae) return Ae;
        const ge = {
          script: Fe.current,
          rows: qe.current,
          storyText: Pe.current
        }, O = px(fe, ge), he = px(Ae, ge);
        if (!O && he) {
          const be = eU(Ae, fe, ge, It.current);
          if (be) {
            const ze = { ...ge }, Ue = document.activeElement;
            be.script !== void 0 && T(be.script), be.rows !== void 0 && U(be.rows), be.storyText !== void 0 && te(be.storyText);
            const ot = {
              quick: "Quick",
              rows: "Per-character",
              story: "Story",
              storyboard: "Storyboard"
            }, qt = (ve) => ve.split(/\r?\n/).filter((xe) => xe.trim().length > 0).length, ct = be.rows !== void 0 ? be.rows.length : be.script !== void 0 ? qt(be.script) : be.storyText !== void 0 ? qt(be.storyText) : 0, z = ct === 1 ? "line" : "lines", H = ct > 0 ? ` (${ct} ${z})` : "", Q = `Switched to ${ot[fe]} mode${ct > 0 ? `, ${ct} ${z}` : ""}.`;
            _t((ve) => ve === Q ? `${Q}​` : Q), pn(`Switched to ${ot[fe]}${H} — content kept`, {
              action: {
                label: "Undo",
                onClick: () => {
                  T(ze.script), U([...ze.rows]), te(ze.storyText), re(Ae), Ue && typeof Ue.focus == "function" && requestAnimationFrame(() => Ue.focus());
                }
              },
              duration: 5e3
            });
          }
        }
        return fe;
      });
    },
    [te]
  );
  g.useEffect(() => {
    let fe = !1;
    return Qs(t.deploymentId).then((Ae) => {
      fe || m(Ae.voiceAssets);
    }).catch(() => {
    }), yM(t.deploymentId).then((Ae) => {
      fe || p(
        [...Ae.presets].sort((ge, O) => O.updatedAt - ge.updatedAt)
      );
    }).catch(() => {
    }), () => {
      fe = !0;
    };
  }, [t.deploymentId]);
  const He = g.useRef(!0);
  g.useEffect(() => {
    if (He.current) {
      He.current = !1;
      return;
    }
    const fe = window.setTimeout(() => {
      const Ae = {
        ...M,
        [Ah]: {
          editorMode: G,
          quickMode: A,
          cachePolicy: D,
          storyText: de
        }
      };
      Rt(`/deployments/${t.deploymentId}`, {
        method: "PATCH",
        body: JSON.stringify({
          defaultOutputFormat: L,
          defaultSpeedFactor: C,
          defaultGenerationOverrides: Ae
        })
      }).catch(() => {
      });
    }, 600);
    return () => window.clearTimeout(fe);
  }, [
    t.deploymentId,
    L,
    C,
    D,
    G,
    A,
    de,
    M
  ]);
  const We = g.useMemo(() => G === "rows" ? Ew(F, y) : G === "story" ? de : R, [G, F, y, R, de]), Nt = g.useMemo(() => nU(We), [We]), at = g.useMemo(() => {
    if (G !== "story") return rU(Nt);
    const fe = /* @__PURE__ */ new Set(), Ae = [];
    for (const ge of Uc(de))
      ge.kind === "character" && (fe.has(ge.value) || (fe.add(ge.value), Ae.push(ge.value)));
    return Ae;
  }, [G, Nt, de]), Xe = g.useMemo(() => {
    const fe = new Set(at.map((ge) => ge.toLowerCase())), Ae = [...at];
    for (const ge of o) {
      if (!ge.isActive) continue;
      const O = ge.characterName.toLowerCase();
      fe.has(O) || (fe.add(O), Ae.push(ge.characterName));
    }
    return Ae;
  }, [at, o]), gt = g.useMemo(() => sU(Xe), [Xe]), we = g.useMemo(() => iU(Nt), [Nt]), Te = g.useMemo(() => {
    const fe = /* @__PURE__ */ new Map();
    for (const Ae of o)
      fe.set(Ae.characterName.toLowerCase(), Ae);
    return fe;
  }, [o]), Ge = g.useMemo(() => A && J ? 0 : Xe.filter((fe) => !Te.has(fe.toLowerCase())).length, [Xe, Te, A, J]), Ye = g.useCallback(
    async (fe, Ae) => {
      const ge = Te.get(fe.toLowerCase());
      try {
        if (ge) {
          const O = await Gs(t.deploymentId, ge.mappingId, Ae);
          u(
            (he) => he.map((be) => be.mappingId === O.mappingId ? O : be)
          ), yn.success(`Updated mapping for ${ge.characterName}`);
        } else if (Ae.speakerVoiceAssetId) {
          const O = await Xh(t.deploymentId, {
            ...Ae,
            characterName: fe,
            speakerVoiceAssetId: Ae.speakerVoiceAssetId
          });
          u((he) => [...he, O]), yn.success(`Mapped ${fe} to voice`);
        }
      } catch (O) {
        yn.error(O instanceof Error ? O.message : "mapping failed");
      }
    },
    [Te, t.deploymentId]
  ), yt = g.useCallback(
    async (fe, Ae) => {
      const ge = Ae.trim(), O = Te.get(fe.toLowerCase());
      if (!(!O || !ge || ge === O.characterName))
        try {
          const he = await Gs(t.deploymentId, O.mappingId, {
            characterName: ge
          });
          u(
            (be) => be.map((ze) => ze.mappingId === he.mappingId ? he : ze)
          ), yn.success(`Renamed character to ${ge}`);
        } catch (he) {
          yn.error(he instanceof Error ? he.message : "rename failed");
        }
    },
    [Te, t.deploymentId]
  ), At = g.useCallback(
    async (fe) => {
      const Ae = Te.get(fe.toLowerCase());
      if (Ae)
        try {
          await j1(t.deploymentId, Ae.mappingId), u((ge) => ge.filter((O) => O.mappingId !== Ae.mappingId)), yn.success(`Cleared mapping for ${fe}`);
        } catch (ge) {
          yn.error(ge instanceof Error ? ge.message : "clear failed");
        }
    },
    [Te, t.deploymentId]
  ), Hn = g.useCallback(
    async (fe, Ae) => {
      try {
        const ge = await Cc(
          t.deploymentId,
          Ae,
          Ae.name.replace(/\.[^.]+$/, ""),
          "speaker"
        );
        m((O) => [ge, ...O]), await Ye(fe, { speakerVoiceAssetId: ge.voiceAssetId });
      } catch (ge) {
        yn.error(ge instanceof Error ? ge.message : "upload failed");
      }
    },
    [t.deploymentId, Ye]
  ), Sn = g.useCallback(
    (fe, Ae) => {
      Ye(Ae, { speakerVoiceAssetId: fe.voiceAssetId });
    },
    [Ye]
  ), wn = g.useCallback((fe) => {
    S(fe);
  }, []), Pt = g.useMemo(() => {
    const fe = [], Ae = /* @__PURE__ */ new Set();
    for (const ge of o) {
      const O = ge.speakerVoiceAssetId;
      if (!O || Ae.has(O)) continue;
      Ae.add(O);
      const be = f.find((ze) => ze.voiceAssetId === O)?.displayName ?? `${ge.characterName} · ${O.slice(0, 8)}`;
      fe.push({ kind: "voice_asset", id: O, label: be });
    }
    for (const ge of f)
      Ae.has(ge.voiceAssetId) || (Ae.add(ge.voiceAssetId), fe.push({ kind: "voice_asset", id: ge.voiceAssetId, label: ge.displayName }));
    return fe;
  }, [o, f]), kt = g.useCallback(
    async (fe, Ae) => {
      if (fe.kind !== "voice_asset") {
        yn.error("Targeted revert is only supported for voice assets in v1.");
        return;
      }
      let ge;
      try {
        const O = JSON.parse(Ae);
        if (typeof O != "object" || O === null || O.version !== 1 || !Array.isArray(O.ops))
          throw new Error("snapshot is not a valid EditChain");
        ge = O;
      } catch (O) {
        yn.error(
          O instanceof Error ? `Audit snapshot is malformed: ${O.message}` : "Audit snapshot is malformed; cannot revert."
        );
        return;
      }
      try {
        const O = await C1(fe.id, t.deploymentId, {
          chain: ge
        }), he = o.filter((be) => be.speakerVoiceAssetId === fe.id);
        await Promise.all(
          he.map(
            (be) => Gs(t.deploymentId, be.mappingId, {
              voiceAssetChainDigest: O.chain_digest
            }).catch(() => null)
          )
        ), u(
          (be) => be.map(
            (ze) => ze.speakerVoiceAssetId === fe.id ? { ...ze, voiceAssetChainDigest: O.chain_digest } : ze
          )
        ), yn.success(`Reverted ${fe.label} to a prior chain`);
      } catch (O) {
        yn.error(O instanceof Error ? O.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), Lt = g.useCallback(
    async (fe) => {
      if (fe.kind !== "voice_asset") {
        yn.error("Revert is only supported for voice assets in v1.");
        return;
      }
      try {
        await zR(fe.id, t.deploymentId);
        const Ae = o.filter((ge) => ge.speakerVoiceAssetId === fe.id);
        await Promise.all(
          Ae.map(
            (ge) => Gs(t.deploymentId, ge.mappingId, {
              voiceAssetChainDigest: null
            }).catch(() => null)
          )
        ), u(
          (ge) => ge.map(
            (O) => O.speakerVoiceAssetId === fe.id ? { ...O, voiceAssetChainDigest: null } : O
          )
        ), yn.success(`Cleared edit chain on ${fe.label}`);
      } catch (Ae) {
        yn.error(Ae instanceof Error ? Ae.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), sa = g.useMemo(
    () => ({
      script: We,
      parserMode: G === "quick" ? "raw_text" : G === "story" ? "story" : "dialogue",
      outputFormat: L,
      speedFactor: C,
      globalEmotion: { ...Y, emotionAlpha: K.intensity },
      generation: M,
      cachePolicy: D,
      ...G === "storyboard" && W.length > 0 ? {
        prebuiltSegments: W.map(
          (fe) => fe.emotion ? { ...fe, emotion: { ...fe.emotion, emotionAlpha: K.intensity } } : fe
        )
      } : {}
    }),
    [We, G, L, C, K.intensity, Y, M, D, W]
  ), jn = g.useMemo(
    () => W$({
      script: We,
      quickMode: A,
      defaultVoiceAssetId: J,
      characters: Xe,
      unmappedCount: Ge,
      globalEmotion: Y,
      performance: K
    }),
    [We, A, J, Xe, Ge, Y, K]
  ), un = g.useMemo(
    () => jn.filter((fe) => fe.id !== "performance").map((fe) => ({
      label: fe.label,
      status: fe.status === "ok" ? "ok" : fe.status === "warn" ? "warn" : "ok",
      detail: fe.detail
    })),
    [jn]
  ), Qt = G === "storyboard" && W.length > 0, sn = We.trim().length > 0 || Qt;
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsx(kR, { position: "bottom-right", richColors: !0, theme: "dark" }),
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
        children: Vt
      }
    ),
    /* @__PURE__ */ c.jsx(
      vU,
      {
        deployment: t,
        canGenerate: sn,
        workflowCustomised: i.workflow.customised,
        unmappableFields: i.unmappableFields,
        hero: /* @__PURE__ */ c.jsx(o2, { deployment: t }),
        quickActions: /* @__PURE__ */ c.jsx(
          xL,
          {
            deploymentId: t.deploymentId,
            createPayload: sa,
            canGenerate: sn,
            diagnostics: un,
            storyboardJobs: G === "storyboard" ? ye : void 0,
            onJobProgressChange: Ce
          }
        ),
        recentGenerations: /* @__PURE__ */ c.jsx(
          kO,
          {
            deploymentId: t.deploymentId,
            speedFactor: C
          }
        ),
        scriptSection: /* @__PURE__ */ c.jsx(
          J$,
          {
            editorMode: G,
            onEditorModeChange: Re,
            deployment: t,
            script: R,
            onScriptChange: T,
            rows: F,
            onRowsChange: U,
            storyText: de,
            onStoryTextChange: te,
            storyCharacters: Xe,
            outputFormat: L,
            mappingsByLower: Te,
            defaultVoiceAssetId: J,
            onDefaultVoiceAssetIdChange: Z,
            presets: y,
            voiceAssets: f,
            onQueueChange: ce,
            onStoryboardJobsChange: Me,
            jobProgress: G === "storyboard" ? lt : void 0
          }
        ),
        parsedDialogueSection: /* @__PURE__ */ c.jsx(A5, { lines: Nt, characterColors: gt }),
        voiceLibrarySection: /* @__PURE__ */ c.jsx(
          vM,
          {
            deploymentId: t.deploymentId,
            voiceAssets: f,
            mappings: o,
            characterColors: gt,
            onVoiceAssetsChange: m,
            onCreateCharacterFromVoice: Sn
          }
        ),
        castSection: /* @__PURE__ */ c.jsx(e2, { unmappedCount: Ge, totalCount: Xe.length, children: Xe.map((fe) => {
          const Ae = Te.get(fe.toLowerCase()) ?? null, ge = gt[fe] ?? "#ba9eff";
          return /* @__PURE__ */ c.jsx("li", { className: m_, children: /* @__PURE__ */ c.jsx(
            WM,
            {
              characterName: fe,
              color: ge,
              lineCount: we[fe] ?? 0,
              mapping: Ae,
              voiceAssets: f,
              presets: y,
              active: b === fe,
              onToggle: () => v((O) => O === fe ? null : fe),
              onAssignVoiceAsset: (O) => Ye(fe, { speakerVoiceAssetId: O }),
              onAssignPreset: (O) => Ye(fe, { defaultVectorPresetId: O }),
              onUploadFile: (O) => Hn(fe, O),
              onClearMapping: () => At(fe),
              onRename: (O) => yt(fe, O)
            }
          ) }, fe);
        }) }),
        emotionSection: /* @__PURE__ */ c.jsx(
          n5,
          {
            value: Y,
            onChange: ie,
            deploymentId: t.deploymentId,
            presets: y,
            onPresetsChange: p
          }
        ),
        performanceSection: /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
          /* @__PURE__ */ c.jsx(
            V5,
            {
              value: { ...K, pace: C },
              onChange: (fe) => {
                B(fe), fe.pace !== C && I(fe.pace);
              }
            }
          ),
          /* @__PURE__ */ c.jsx(
            em,
            {
              state: w,
              onChange: wn,
              supportsSynthSpeed: !1
            }
          ),
          /* @__PURE__ */ c.jsx(J5, { checks: jn }),
          /* @__PURE__ */ c.jsx(
            S5,
            {
              outputFormat: L,
              onOutputFormatChange: _,
              speedFactor: C,
              onSpeedFactorChange: I,
              cachePolicy: D,
              onCachePolicyChange: P,
              generation: M,
              onGenerationChange: V
            }
          )
        ] }),
        recentRunsSection: /* @__PURE__ */ c.jsx(sk, { runs: s, deploymentId: t.deploymentId }),
        auditSection: /* @__PURE__ */ c.jsx(
          zM,
          {
            deploymentId: t.deploymentId,
            targets: Pt,
            onRevertToIdentity: Lt,
            onRevertToChain: kt
          }
        )
      }
    )
  ] });
}
const xx = /* @__PURE__ */ new Map();
function wU(t, a) {
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
    const o = `${t}::${a}`, u = xx.get(o);
    if (u) {
      i({ peaks: u, isLoading: !1, error: null });
      return;
    }
    const f = new AbortController();
    return i({ peaks: null, isLoading: !0, error: null }), jU(t, a, f.signal).then((m) => {
      f.signal.aborted || (xx.set(o, m), i({ peaks: m, isLoading: !1, error: null }));
    }).catch((m) => {
      if (f.signal.aborted) return;
      const y = m instanceof Error ? m.message : "decode failed";
      i({ peaks: null, isLoading: !1, error: y });
    }), () => f.abort();
  }, [t, a]), s;
}
async function jU(t, a, s) {
  const i = await fetch(t, { signal: s });
  if (!i.ok) throw new Error(`failed to load audio (${i.status})`);
  const o = await i.arrayBuffer();
  if (s.aborted) throw new DOMException("aborted", "AbortError");
  const f = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return EU(f, a);
}
function EU(t, a) {
  const s = t.numberOfChannels, i = t.length, o = Math.max(1, Math.floor(i / a)), u = new Float32Array(a), f = [];
  for (let m = 0; m < s; m += 1) f.push(t.getChannelData(m));
  for (let m = 0; m < a; m += 1) {
    const y = m * o, p = Math.min(i, y + o);
    let b = 0;
    for (let v = y; v < p; v += 1) {
      let w = 0;
      for (let j = 0; j < s; j += 1) {
        const N = f[j];
        N && (w += Math.abs(N[v] ?? 0));
      }
      const S = w / s;
      S > b && (b = S);
    }
    u[m] = b;
  }
  return u;
}
const Sx = "(prefers-reduced-motion: reduce)";
function NU() {
  const [t, a] = g.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(Sx).matches);
  return g.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const s = window.matchMedia(Sx), i = (o) => a(o.matches);
    return s.addEventListener("change", i), () => s.removeEventListener("change", i);
  }, []), t;
}
var CU = "mquzal0", TU = "mquzal1", wx = "mquzal2", jx = "mquzal3", Ex = "mquzal4", RU = "mquzal5", Nx = "mquzal6", Cx = "mquzal7";
const _U = 120, MU = 720;
function Rw(t) {
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
    width: b = MU,
    height: v = _U
  } = t, w = g.useRef(null), S = g.useRef(null), j = g.useRef(null), N = wU(a, b), R = NU();
  g.useEffect(() => {
    AU(w.current, N.peaks, b, v);
  }, [N.peaks, b, v]);
  const T = g.useCallback(
    (M) => {
      const V = S.current?.getBoundingClientRect();
      if (!V || V.width <= 0) return 0;
      const D = Math.max(0, Math.min(1, (M - V.left) / V.width));
      return Math.round(D * s);
    },
    [s]
  );
  g.useEffect(() => {
    const M = (D) => {
      if (!j.current) return;
      const P = T(D.clientX);
      j.current === "start" ? u(oc(P, 0, o - 1)) : f(oc(P, i + 1, s));
    }, V = () => {
      j.current = null;
    };
    return window.addEventListener("pointermove", M), window.addEventListener("pointerup", V), () => {
      window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", V);
    };
  }, [T, s, o, i, u, f]);
  const L = (M) => (V) => {
    V.preventDefault(), V.stopPropagation(), j.current = M;
  }, _ = (M) => {
    !p || M.target.closest("[data-handle]") || p(T(M.clientX));
  }, C = (M) => (V) => {
    const D = V.shiftKey ? 100 : V.ctrlKey ? 1 : 10;
    let P = 0;
    if (V.key === "ArrowLeft") P = -D;
    else if (V.key === "ArrowRight") P = D;
    else return;
    V.preventDefault(), M === "start" ? u(oc(i + P, 0, o - 1)) : f(oc(o + P, i + 1, s));
  }, I = Kf(i, s), Y = Kf(o, s), ie = Kf(y, s);
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: S,
      className: CU,
      style: { height: v },
      onPointerDown: _,
      children: [
        /* @__PURE__ */ c.jsx(
          "canvas",
          {
            ref: w,
            width: b,
            height: v,
            className: TU,
            "aria-label": "Audio waveform"
          }
        ),
        N.isLoading && /* @__PURE__ */ c.jsx("div", { className: Cx, children: "Decoding waveform…" }),
        N.error && /* @__PURE__ */ c.jsx("div", { className: Cx, role: "alert", children: N.error }),
        /* @__PURE__ */ c.jsx("div", { className: Nx, style: { left: 0, width: `${I}%` } }),
        /* @__PURE__ */ c.jsx(
          "div",
          {
            className: Nx,
            style: { left: `${Y}%`, right: 0, width: `${100 - Y}%` }
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: wx,
            style: { left: `${I}%` },
            role: "slider",
            "aria-label": "Region start",
            "aria-valuemin": 0,
            "aria-valuemax": s,
            "aria-valuenow": i,
            tabIndex: 0,
            onPointerDown: L("start"),
            onKeyDown: C("start"),
            "data-handle": "start",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: jx, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: Ex, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: wx,
            style: { left: `${Y}%` },
            role: "slider",
            "aria-label": "Region end",
            "aria-valuemin": 0,
            "aria-valuemax": s,
            "aria-valuenow": o,
            tabIndex: 0,
            onPointerDown: L("end"),
            onKeyDown: C("end"),
            "data-handle": "end",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: jx, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: Ex, "aria-hidden": "true" })
            ]
          }
        ),
        m && /* @__PURE__ */ c.jsx(
          "div",
          {
            className: RU,
            style: {
              left: `${ie}%`,
              transition: R ? "none" : void 0
            },
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function Kf(t, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(100, t / a * 100));
}
function oc(t, a, s) {
  return Math.max(a, Math.min(s, t));
}
function AU(t, a, s, i) {
  if (!t) return;
  const o = t.getContext("2d");
  if (!o || (o.clearRect(0, 0, s, i), !a || a.length === 0)) return;
  const u = i / 2;
  o.fillStyle = kU(t, "--color-primary", "#ba9eff");
  const f = Math.min(a.length, s);
  for (let m = 0; m < f; m += 1) {
    const y = a[m] ?? 0, p = Math.max(1, y * (i - 4));
    o.fillRect(m, u - p / 2, 1, p);
  }
}
function kU(t, a, s) {
  return getComputedStyle(t).getPropertyValue(a).trim() || s;
}
var DU = "r8lfsm0", zU = "r8lfsm1", OU = "r8lfsm2", LU = "r8lfsm3", $U = "r8lfsm4", UU = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, BU = "_1b1zchy3", IU = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, VU = "_1b1zchy6", qU = "_1b1zchy7";
const _w = g.createContext("standalone");
function Mw({
  variant: t = "standalone",
  children: a,
  className: s,
  style: i,
  ...o
}) {
  const u = [UU[t], s].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(_w.Provider, { value: t, children: /* @__PURE__ */ c.jsx("div", { className: u, style: i, ...o, children: a }) });
}
function Aw({
  title: t,
  meta: a,
  children: s,
  className: i,
  titleId: o
}) {
  const u = g.useContext(_w), f = [BU, i].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsxs("div", { className: f, children: [
    /* @__PURE__ */ c.jsx("h3", { id: o, className: IU[u], children: t }),
    a ? /* @__PURE__ */ c.jsx("span", { className: VU, children: a }) : null,
    s
  ] });
}
function kw({
  children: t,
  className: a,
  role: s = "group"
}) {
  const i = [qU, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: i, role: s, children: t });
}
const Tx = -16, HU = 80, FU = 720;
function PU(t) {
  const { deploymentId: a, runId: s, utterance: i, audioUrl: o, onApplied: u, onError: f, onCancel: m } = t, y = i.durationMs ?? 0, [p, b] = g.useState(() => Rx(y)), [v, w] = g.useState(Yc), [S, j] = g.useState(!1), [N, R] = g.useState(!1), [T, L] = g.useState(null), [_, C] = g.useState(!1), I = g.useRef(null), Y = g.useRef(null), ie = g.useRef(null);
  g.useEffect(() => {
    const U = Rx(y);
    b(U), w(I1(U)), R(!1), L(null), ie.current = null;
  }, [i.utteranceId, y]);
  const M = g.useCallback((U) => {
    w(U), b((se) => B1(se, U));
  }, []);
  g.useEffect(() => () => Y.current?.abort(), []), g.useEffect(() => {
    I.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [i.utteranceId]);
  const V = g.useCallback(
    (U) => {
      U.key === "Escape" && (U.stopPropagation(), m());
    },
    [m]
  ), D = g.useMemo(
    () => p.ops.find((U) => U.mode === "trim"),
    [p.ops]
  ), P = D?.start_ms ?? 0, J = D?.end_ms ?? Math.max(1, y), Z = g.useCallback((U, se) => {
    b((de) => GU(de, "trim", (k) => ({
      ...k,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(U)),
      end_ms: Math.max(Math.floor(U) + 1, Math.floor(se))
    })));
  }, []), G = g.useCallback((U) => Z(U, J), [J, Z]), re = g.useCallback((U) => Z(P, U), [P, Z]), A = g.useCallback((U) => {
    R(U), b((se) => {
      const de = se.ops.filter((k) => k.mode !== "normalize");
      if (U) {
        const k = {
          id: Dn(),
          mode: "normalize",
          target_lufs: Tx
        };
        return { ...se, ops: [...de, k] };
      }
      return { ...se, ops: de };
    });
  }, []), F = g.useCallback(async () => {
    const U = T1(p, y);
    if (U) {
      L(U.message);
      return;
    }
    if (L(null), _) return;
    Y.current?.abort();
    const se = new AbortController();
    Y.current = se, C(!0);
    try {
      const de = ie.current ?? void 0, k = await DR(
        a,
        s,
        i.utteranceId,
        de ? { chain: p, digest_before: de } : { chain: p },
        { signal: se.signal }
      );
      if (se.signal.aborted) return;
      ie.current = k.chain_digest, u(k);
    } catch (de) {
      if (se.signal.aborted) return;
      de instanceof Zs && (ie.current = de.currentDigest || null);
      const k = de instanceof Zs ? "Edit chain has changed in another tab. Reload to continue." : de instanceof Error ? de.message : "apply failed";
      L(k), f(k);
    } finally {
      se.signal.aborted || C(!1);
    }
  }, [p, y, _, a, s, i.utteranceId, u, f]);
  return /* @__PURE__ */ c.jsx(Mw, { variant: "nested", children: /* @__PURE__ */ c.jsxs("div", { ref: I, onKeyDown: V, children: [
    /* @__PURE__ */ c.jsx(Aw, { title: "Edit segment", meta: `Source · ${cc(y)}` }),
    /* @__PURE__ */ c.jsx(
      Rw,
      {
        audioUrl: o,
        durationMs: Math.max(1, y),
        startMs: P,
        endMs: J,
        onChangeStart: G,
        onChangeEnd: re,
        height: HU,
        width: FU
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: DU, children: [
      /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ c.jsxs("span", { className: zU, children: [
        cc(P),
        " → ",
        cc(J),
        " · ",
        cc(J - P)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: OU, children: [
      /* @__PURE__ */ c.jsxs("label", { className: LU, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: N,
            onChange: (U) => A(U.currentTarget.checked),
            "aria-label": "Toggle loudness normalization"
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { children: [
          "Normalize to ",
          Tx.toFixed(0),
          " LUFS (broadcast-friendly)"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: $U,
          onClick: () => j((U) => !U),
          "aria-expanded": S,
          children: [
            S ? "▾" : "▸",
            " Advanced effects · gain · eq · pitch · fade · silence trim"
          ]
        }
      )
    ] }),
    S && /* @__PURE__ */ c.jsx(
      em,
      {
        state: v,
        onChange: M,
        supportsSynthSpeed: !1
      }
    ),
    /* @__PURE__ */ c.jsxs(kw, { children: [
      /* @__PURE__ */ c.jsx(Ze, { size: "sm", onClick: () => void F(), disabled: _, children: _ ? "Applying…" : "Apply" }),
      /* @__PURE__ */ c.jsx(Ze, { variant: "ghost", size: "sm", onClick: m, disabled: _, children: "Cancel" })
    ] }),
    T && /* @__PURE__ */ c.jsx(kn, { severity: "error", children: T })
  ] }) });
}
function Rx(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Dn(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function GU(t, a, s) {
  const i = t.ops.findIndex((u) => u.mode === a);
  if (i === -1) {
    const u = { id: Dn(), mode: a };
    return { ...t, ops: [...t.ops, s(u)] };
  }
  const o = [...t.ops];
  return o[i] = s(o[i]), { ...t, ops: o };
}
function cc(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
var YU = "jq2zyb2", KU = "jq2zyb3", XU = "jq2zyb4", QU = "jq2zyb5", ZU = "jq2zyb6", JU = "jq2zyb7", WU = "jq2zyb8", e9 = "jq2zyb9", t9 = "jq2zyba", n9 = "jq2zybb", a9 = "jq2zybc", r9 = "jq2zybd", s9 = "jq2zybe", i9 = "jq2zybf jq2zybe", l9 = "jq2zybg", o9 = "jq2zybh", c9 = "jq2zybi", u9 = "jq2zybj", d9 = "jq2zybk", f9 = "jq2zybl", h9 = "jq2zybm", m9 = "jq2zybn", p9 = "jq2zybo", g9 = "jq2zybp", v9 = "jq2zybq", y9 = "jq2zybr", b9 = "jq2zybs", x9 = "jq2zybt", S9 = "jq2zybu", w9 = "jq2zybv", j9 = "jq2zybw", E9 = "jq2zybx", N9 = "jq2zyby", _x = "jq2zybz", C9 = "jq2zyb10", T9 = "jq2zyb11", R9 = "jq2zyb12";
const _9 = ["cancelled", "failed", "partial"], M9 = 2600;
function A9() {
  const { run: t } = Tl(), a = ti(), [s, i] = g.useState(t), [o, u] = g.useState(!1), [f, m] = g.useState(null), [y, p] = g.useState(null), [b, v] = g.useState(
    null
  );
  g.useEffect(() => {
    i(t);
  }, [t]), g.useEffect(() => {
    if (!b) return;
    const C = setTimeout(() => v(null), M9);
    return () => clearTimeout(C);
  }, [b]);
  const w = g.useMemo(() => z9(s), [s]), S = _9.includes(s.status) && s.kind === "batch", j = (s.exportZipStaleAt ?? null) !== null, N = async () => {
    if (s.deploymentId) {
      u(!0), m(null);
      try {
        const { runId: C } = await N1(s.deploymentId, s.runId);
        a(`/${s.deploymentId}/runs/${C}`);
      } catch (C) {
        m($9(C));
      } finally {
        u(!1);
      }
    }
  }, R = g.useCallback((C) => {
    p((I) => I === C ? null : C);
  }, []), T = g.useCallback(() => {
    p(null);
  }, []), L = (C, I) => {
    i((Y) => D9(Y, C, I)), p(null), v({ message: "Segment edited", severity: "success" });
  }, _ = g.useCallback((C) => {
    v({ message: C, severity: "error" });
  }, []);
  return /* @__PURE__ */ c.jsxs("main", { className: YU, children: [
    /* @__PURE__ */ c.jsxs("div", { className: KU, children: [
      /* @__PURE__ */ c.jsxs("header", { className: XU, children: [
        /* @__PURE__ */ c.jsxs("p", { className: QU, children: [
          s.deploymentId ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            /* @__PURE__ */ c.jsx(Kh, { to: `/${s.deploymentId}/recipe`, className: ZU, children: "← Back to recipe" }),
            /* @__PURE__ */ c.jsx("span", { className: JU, children: "·" })
          ] }) : null,
          /* @__PURE__ */ c.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: WU, children: [
          /* @__PURE__ */ c.jsxs("h1", { className: e9, children: [
            O9(s.kind),
            /* @__PURE__ */ c.jsx("span", { className: t9, children: s.runId })
          ] }),
          /* @__PURE__ */ c.jsx(jr, { size: "md", tone: U9(s.status), pulse: s.status === "running", children: s.status })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("section", { className: n9, "aria-label": "Run statistics", children: [
        /* @__PURE__ */ c.jsx(uc, { label: "Format", value: s.outputFormat.toUpperCase(), mono: !0 }),
        /* @__PURE__ */ c.jsx(uc, { label: "Speed", value: `${s.speedFactor.toFixed(2)}×`, mono: !0 }),
        /* @__PURE__ */ c.jsx(
          uc,
          {
            label: "Completed",
            value: `${w.completed} / ${w.total}`,
            progress: w.total > 0 ? w.completed / w.total : 0
          }
        ),
        /* @__PURE__ */ c.jsx(
          uc,
          {
            label: "Cache hit",
            value: `${w.cacheRatio}%`,
            progress: w.cacheRatio / 100
          }
        )
      ] }),
      S && /* @__PURE__ */ c.jsxs("section", { className: o9, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ c.jsxs("div", { className: c9, children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-resume-title", className: u9, children: w.failed > 0 ? `${w.failed} line${w.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ c.jsx("p", { className: d9, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ c.jsx(Ze, { size: "lg", disabled: o, onClick: () => void N(), children: o ? "Resuming…" : w.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        f && /* @__PURE__ */ c.jsx("p", { className: f9, role: "alert", children: f })
      ] }),
      /* @__PURE__ */ c.jsxs(Ia, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ c.jsxs(BT, { children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-utterances", className: Zr, children: "01 / Utterances" }),
          w.completed > 0 && /* @__PURE__ */ c.jsxs("span", { className: h9, children: [
            /* @__PURE__ */ c.jsx("span", { className: m9, children: w.cached }),
            "/",
            w.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("ul", { className: p9, children: s.utterances.map((C) => {
          const I = y === C.utteranceId, Y = C.status === "completed" && C.audioArtifactRef !== null && C.audioArtifactRef !== void 0, ie = C.derivedArtifactRef ?? C.audioArtifactRef ?? null, M = ie ? `/api/v1/artifacts/${encodeURIComponent(ie)}/download` : "", V = (C.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ c.jsxs("li", { className: v9, children: [
            /* @__PURE__ */ c.jsxs("div", { className: g9, children: [
              /* @__PURE__ */ c.jsxs("span", { className: b9, children: [
                "#",
                C.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: x9, title: C.characterDisplay, children: C.characterDisplay }),
              /* @__PURE__ */ c.jsx("span", { className: S9, title: C.text, children: C.text }),
              /* @__PURE__ */ c.jsxs("span", { className: w9, children: [
                C.cacheHit && /* @__PURE__ */ c.jsx("span", { className: j9, children: "cached" }),
                V && /* @__PURE__ */ c.jsx("span", { className: y9, children: "edited" }),
                C.durationMs ? /* @__PURE__ */ c.jsx("span", { children: L9(C.durationMs) }) : null,
                /* @__PURE__ */ c.jsx(jr, { tone: B9(C.status), children: C.status }),
                Y && /* @__PURE__ */ c.jsx(
                  Ze,
                  {
                    variant: "ghost",
                    size: "xs",
                    onClick: () => R(C.utteranceId),
                    "aria-expanded": I,
                    "aria-label": I ? "Close segment editor" : "Edit segment",
                    children: I ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            I && M && s.deploymentId && /* @__PURE__ */ c.jsx(
              PU,
              {
                deploymentId: s.deploymentId,
                runId: s.runId,
                utterance: C,
                audioUrl: M,
                onApplied: (D) => L(C.utteranceId, D),
                onError: _,
                onCancel: T
              }
            )
          ] }, C.utteranceId);
        }) })
      ] }),
      k9(s, j)
    ] }),
    b && /* @__PURE__ */ c.jsx(
      "div",
      {
        className: R9,
        role: b.severity === "error" ? "alert" : "status",
        "aria-live": b.severity === "error" ? "assertive" : "polite",
        children: b.message
      }
    )
  ] });
}
function k9(t, a) {
  if (!t.exportArtifactRef && !a) return null;
  const i = !!t.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ c.jsx("div", { className: E9, children: a ? /* @__PURE__ */ c.jsxs("div", { className: C9, children: [
    /* @__PURE__ */ c.jsx("p", { className: T9, children: i }),
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
          /* @__PURE__ */ c.jsx("span", { className: _x, children: "↻" })
        ]
      }
    )
  ] }) : t.exportArtifactRef ? /* @__PURE__ */ c.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${t.exportArtifactRef}/download`,
      download: !0,
      className: N9,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ c.jsx("span", { className: _x, children: "↓" })
      ]
    }
  ) : null });
}
function D9(t, a, s) {
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
function uc({ label: t, value: a, mono: s, progress: i }) {
  const o = i !== void 0 ? Math.min(1, Math.max(0, i)) : void 0;
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      className: a9,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: r9, children: t }),
        /* @__PURE__ */ c.jsx("span", { className: s ? i9 : s9, children: a }),
        o !== void 0 && /* @__PURE__ */ c.jsx("span", { className: l9, "aria-hidden": "true" })
      ]
    }
  );
}
function z9(t) {
  const a = t.utterances.length, s = t.utterances.filter((f) => f.status === "completed").length, i = t.utterances.filter(
    (f) => f.status === "failed" || f.status === "cancelled"
  ).length, o = t.utterances.filter((f) => f.cacheHit).length, u = s > 0 ? Math.round(o / s * 100) : 0;
  return { total: a, completed: s, failed: i, cached: o, cacheRatio: u };
}
function O9(t) {
  switch (t) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function L9(t) {
  return t < 1e3 ? `${t} ms` : `${(t / 1e3).toFixed(t < 1e4 ? 2 : 1)} s`;
}
function $9(t) {
  return t instanceof ni ? `${t.category}: ${t.message}` : t instanceof Error ? t.message : "Unexpected error";
}
function U9(t) {
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
function B9(t) {
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
var I9 = "pcphqj2", V9 = "pcphqj3", q9 = "pcphqj4", H9 = "pcphqj5", F9 = "pcphqj6", P9 = "pcphqj7", G9 = "pcphqj8", Y9 = "pcphqj9", K9 = "pcphqja", Mx = "pcphqjb", X9 = "pcphqjc", Q9 = "pcphqjd", Z9 = "pcphqje pcphqjd", J9 = "pcphqjf", W9 = "pcphqjg", eB = "pcphqjh", tB = "pcphqji", nB = "pcphqjj pcphqji", aB = "pcphqjk pcphqji", rB = "pcphqjl pcphqji", sB = "pcphqjm", Xf = "pcphqjn", Qf = "pcphqjo";
function iB() {
  const [t, a] = g.useState(null), [s, i] = g.useState(null);
  return g.useEffect(() => {
    let o = !1;
    const u = async () => {
      try {
        const m = await Rt("/runtime/queue");
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
  }, []), /* @__PURE__ */ c.jsx("main", { className: I9, children: /* @__PURE__ */ c.jsxs("div", { className: V9, children: [
    /* @__PURE__ */ c.jsxs("header", { className: q9, children: [
      /* @__PURE__ */ c.jsx("p", { className: H9, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ c.jsxs("div", { className: F9, children: [
        /* @__PURE__ */ c.jsx("h1", { className: P9, children: "Queue" }),
        /* @__PURE__ */ c.jsx("span", { className: G9, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: Y9, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    s ? /* @__PURE__ */ c.jsx(kn, { severity: "error", children: s }) : t === null ? null : t.length === 0 ? /* @__PURE__ */ c.jsx(Ia, { density: "compact", children: /* @__PURE__ */ c.jsx(Pc, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ c.jsxs(Ia, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ c.jsx("h2", { id: "runtime-queue-section", className: Zr, children: "01 / In flight" }),
      /* @__PURE__ */ c.jsx("ul", { className: K9, children: t.map((o) => {
        const u = o.position === 1;
        return /* @__PURE__ */ c.jsxs(
          "li",
          {
            className: u ? `${Mx} ${X9}` : Mx,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: u ? Z9 : Q9, children: o.position }),
              /* @__PURE__ */ c.jsxs("span", { className: J9, children: [
                /* @__PURE__ */ c.jsx("span", { className: W9, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ c.jsx("span", { className: eB, children: o.runId })
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: lB(o.kind), children: oB(o.kind) }),
              /* @__PURE__ */ c.jsx("span", { className: sB, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Xf, children: cB(o.etaSeconds) }),
                /* @__PURE__ */ c.jsx("span", { className: Qf, children: "eta" })
              ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Xf, children: o.utteranceTotal }),
                /* @__PURE__ */ c.jsx("span", { className: Qf, children: "lines" })
              ] }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Xf, children: "—" }),
                /* @__PURE__ */ c.jsx("span", { className: Qf, children: "pending" })
              ] }) })
            ]
          },
          o.runId
        );
      }) })
    ] })
  ] }) });
}
function lB(t) {
  switch (t) {
    case "batch":
      return nB;
    case "test_line":
      return aB;
    case "resume":
      return rB;
    default:
      return tB;
  }
}
function oB(t) {
  switch (t) {
    case "test_line":
      return "test line";
    default:
      return t;
  }
}
function cB(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60), s = t % 60;
  return s === 0 ? `${a}m` : `${a}m ${s}s`;
}
function uB() {
  const { deploymentId: t, prefillCharacterName: a } = Tl(), s = ti(), [i, o] = g.useState(a), [u, f] = g.useState(""), [m, y] = g.useState("none"), [p, b] = g.useState(!1), [v, w] = g.useState(null), S = g.useRef(null);
  g.useEffect(() => {
    S.current?.scrollIntoView({ behavior: "smooth", block: "center" }), S.current?.focus();
  }, []);
  const j = async (N) => {
    N.preventDefault(), b(!0), w(null);
    try {
      await Xh(t, {
        characterName: i,
        speakerVoiceAssetId: u,
        defaultEmotionMode: m
      }), s(`/${t}/recipe`);
    } catch (R) {
      w(R instanceof Error ? R.message : "failed");
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
            ref: S,
            value: i,
            onChange: (N) => o(N.currentTarget.value),
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
            onChange: (N) => f(N.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("label", { children: [
        "Emotion mode",
        /* @__PURE__ */ c.jsxs("select", { value: m, onChange: (N) => y(N.currentTarget.value), children: [
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
var dB = "_1oor31e0", fB = "_1oor31e1", hB = "_1oor31e2", mB = "_1oor31e3", pB = "_1oor31e4", gB = "_1oor31e5", vB = "_1oor31e6", yB = "_1oor31e7", bB = "_1oor31e8";
const xB = 8;
function SB(t) {
  const { entries: a, loading: s, error: i } = t;
  return /* @__PURE__ */ c.jsxs("div", { className: dB, "aria-busy": !!s, children: [
    i && /* @__PURE__ */ c.jsx(kn, { severity: "error", children: i }),
    s && !i && /* @__PURE__ */ c.jsx("div", { className: bB, "aria-live": "polite", children: "Loading edit history…" }),
    !s && !i && a.length === 0 && /* @__PURE__ */ c.jsx("div", { className: yB, children: "No edits yet" }),
    !s && !i && a.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: fB, children: a.map((o) => /* @__PURE__ */ c.jsxs("li", { className: hB, children: [
      /* @__PURE__ */ c.jsx("span", { className: mB, children: jB(o.recorded_at) }),
      /* @__PURE__ */ c.jsx("span", { className: pB, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ c.jsx("span", { className: gB, title: o.digest_after, children: wB(o.digest_after) }),
      /* @__PURE__ */ c.jsx("span", { className: vB, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function wB(t) {
  return t ? `${t.slice(0, xB)}…` : "—";
}
function jB(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var Ax = "_1c63kaw0", EB = "_1c63kaw1", NB = "_1c63kaw2", CB = "_1c63kaw3", TB = "_1c63kaw4", RB = "_1c63kaw5", _B = "_1c63kaw6";
function MB({ chain: t, onRemoveOp: a }) {
  return t.ops.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: Ax, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ c.jsx("span", { className: EB, children: "No edits yet" }) }) : /* @__PURE__ */ c.jsx("ol", { className: Ax, "data-testid": "edit-chain-list", children: t.ops.map((s, i) => /* @__PURE__ */ c.jsxs("li", { className: NB, children: [
    /* @__PURE__ */ c.jsxs("span", { className: CB, "aria-hidden": "true", children: [
      i + 1,
      "."
    ] }),
    /* @__PURE__ */ c.jsxs("span", { className: TB, children: [
      /* @__PURE__ */ c.jsx("span", { className: RB, children: kx(s) }),
      /* @__PURE__ */ c.jsx("span", { className: _B, children: AB(s) })
    ] }),
    /* @__PURE__ */ c.jsx(
      Ze,
      {
        variant: "ghost",
        size: "xs",
        iconOnly: !0,
        onClick: () => a(s.id),
        "aria-label": `Remove ${kx(s)} (position ${i + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, s.id)) });
}
function kx(t) {
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
function AB(t) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${Dx(t.start_ms)} → ${Dx(t.end_ms)}`;
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
      return `${Zf(t.low_db)} / ${Zf(t.mid_db)} / ${Zf(t.high_db)}`;
    case "pitch_shift":
      return `${t.semitones >= 0 ? "+" : ""}${t.semitones.toFixed(1)} st`;
    case "silence_strip":
      return `${t.threshold_db.toFixed(0)} dB`;
    default:
      return "—";
  }
}
function Zf(t) {
  return `${t >= 0 ? "+" : ""}${t.toFixed(0)}`;
}
function Dx(t) {
  return !Number.isFinite(t) || t < 0 ? "0.00s" : `${(t / 1e3).toFixed(2)}s`;
}
var dc = "_1o3ytop0", Jf = "_1o3ytop1", zx = "_1o3ytop2", kB = "_1o3ytop3", DB = "_1o3ytop4", zB = "_1o3ytop5", OB = "_1o3ytop6", LB = "_1o3ytop7", fc = "_1o3ytop8", $B = "_1o3ytop9", UB = "_1o3ytopf", BB = "_1o3ytopg", IB = "_1o3ytoph", VB = "_1o3ytopi", qB = "_1o3ytopj", HB = "_1o3ytopk", FB = "_1t0zy2f0", PB = "_1t0zy2f1", GB = "_1t0zy2f2";
function YB({ content: t, children: a, delayMs: s = 350 }) {
  const [i, o] = g.useState(!1), u = g.useId(), f = g.useRef(null), m = g.useCallback(() => {
    f.current != null && (window.clearTimeout(f.current), f.current = null);
  }, []), y = g.useCallback(() => {
    m(), f.current = window.setTimeout(() => o(!0), s);
  }, [m, s]), p = g.useCallback(() => {
    m(), o(!1);
  }, [m]);
  if (g.useEffect(() => () => m(), [m]), g.useEffect(() => {
    if (!i) return;
    const v = (w) => {
      w.key === "Escape" && o(!1);
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
  return /* @__PURE__ */ c.jsxs("span", { className: FB, children: [
    g.cloneElement(a, b),
    i && /* @__PURE__ */ c.jsx("span", { role: "tooltip", id: u, className: GB, children: t })
  ] });
}
function hc({ label: t, content: a }) {
  return /* @__PURE__ */ c.jsx(YB, { content: a, children: /* @__PURE__ */ c.jsx("button", { type: "button", "aria-label": `What is ${t}?`, className: PB, children: "?" }) });
}
const Ox = -16;
function KB(t) {
  const {
    voiceAsset: a,
    deploymentId: s,
    affectedCharacterNames: i = [],
    onChainPersisted: o,
    onError: u
  } = t, f = a.durationMs ?? 0, m = g.useMemo(
    () => XB(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [y, p] = g.useState(() => Wf(f)), [b, v] = g.useState(Yc), [w, S] = g.useState(!1), [j, N] = g.useState(null), [R, T] = g.useState(null), [L, _] = g.useState(!1), [C, I] = g.useState(!1), [Y, ie] = g.useState(!1), [M, V] = g.useState(null), [D, P] = g.useState([]), [J, Z] = g.useState(null), [G, re] = g.useState([]), [A, F] = g.useState(!1), [U, se] = g.useState(null), [de, k] = g.useState(0), ee = g.useRef(null), te = g.useRef(null), K = g.useRef(null), B = g.useRef(null), W = g.useRef(null), ce = g.useRef(0), ye = g.useMemo(
    () => y.ops.some((we) => we.mode === "normalize"),
    [y.ops]
  );
  g.useEffect(() => {
    const we = Wf(f);
    p(we), v(I1(we)), N(null), ie(!1), P([]), Z(null), W.current = null;
  }, [a.voiceAssetId, f]);
  const Me = g.useCallback((we) => {
    v(we), p((Te) => B1(Te, we));
  }, []);
  g.useEffect(() => {
    B.current?.abort();
    const we = new AbortController();
    return B.current = we, F(!0), se(null), yc(s, "voice_asset", a.voiceAssetId, 50, {
      signal: we.signal
    }).then((Te) => {
      we.signal.aborted || re(Te.entries);
    }).catch((Te) => {
      if (we.signal.aborted) return;
      const Ge = Te instanceof Error ? Te.message : "audit fetch failed";
      se(Ge);
    }).finally(() => {
      we.signal.aborted || F(!1);
    }), () => we.abort();
  }, [s, a.voiceAssetId, de]), g.useEffect(() => () => {
    R && URL.revokeObjectURL(R);
  }, [R]), g.useEffect(() => () => {
    te.current?.abort(), K.current?.abort(), B.current?.abort();
  }, []);
  const lt = y.ops.find((we) => we.mode === "trim"), Ce = y.ops.find((we) => we.mode === "normalize"), Fe = lt?.start_ms ?? 0, qe = lt?.end_ms ?? Math.max(1, f), Pe = g.useCallback((we, Te) => {
    p(
      (Ge) => Lx(
        Ge,
        "trim",
        (Ye) => ({
          ...Ye,
          mode: "trim",
          start_ms: Math.max(0, Math.floor(we)),
          end_ms: Math.max(Math.floor(we) + 1, Math.floor(Te))
        })
      )
    );
  }, []), It = g.useCallback(
    (we) => Pe(we, qe),
    [qe, Pe]
  ), Vt = g.useCallback(
    (we) => Pe(Fe, we),
    [Fe, Pe]
  ), _t = g.useCallback((we) => {
    p((Te) => {
      const Ge = Te.ops.filter((Ye) => Ye.mode !== "normalize");
      if (we) {
        const Ye = {
          id: Dn(),
          mode: "normalize",
          target_lufs: Ox
        };
        return { ...Te, ops: [...Ge, Ye] };
      }
      return { ...Te, ops: Ge };
    });
  }, []), Re = g.useCallback(
    (we) => {
      const Te = y.ops.findIndex((yt) => yt.id === we);
      if (Te === -1) return;
      const Ge = y.ops[Te];
      if (!Ge) return;
      const Ye = [...y.ops.slice(0, Te), ...y.ops.slice(Te + 1)];
      p({ ...y, ops: Ye }), P((yt) => [...yt, { op: Ge, index: Te }]);
    },
    [y]
  ), He = g.useCallback(() => {
    const we = D[D.length - 1];
    if (!we) return;
    const Te = Math.min(we.index, y.ops.length), Ge = [...y.ops.slice(0, Te), we.op, ...y.ops.slice(Te)];
    p({ ...y, ops: Ge }), P(D.slice(0, -1));
  }, [y, D]), We = g.useCallback(() => {
    const we = T1(y, f);
    return we ? (N(we.message), !1) : (N(null), !0);
  }, [y, f]), Nt = g.useCallback(async () => {
    if (!We() || L) return;
    te.current?.abort();
    const we = new AbortController();
    te.current = we;
    const Te = ++ce.current;
    I(!0);
    try {
      const Ge = await OR(a.voiceAssetId, s, y, {
        signal: we.signal
      });
      if (we.signal.aborted || Te !== ce.current) return;
      R && URL.revokeObjectURL(R);
      const Ye = URL.createObjectURL(Ge);
      T(Ye), ie(!0), requestAnimationFrame(() => ee.current?.play().catch(() => {
      }));
    } catch (Ge) {
      if (we.signal.aborted) return;
      const Ye = Ge instanceof Error ? Ge.message : "preview failed";
      N(Ye), u(Ye);
    } finally {
      we.signal.aborted || I(!1);
    }
  }, [We, L, a.voiceAssetId, s, y, R, u]), at = g.useCallback(async () => {
    if (!We() || C || L) return;
    if (i.length > 1) {
      const Te = i.join(", ");
      if (!window.confirm(
        `This voice asset is referenced by ${i.length} characters: ${Te}.

Applying this edit chain will affect every line they speak in the next batch.

Continue?`
      )) return;
    }
    te.current?.abort(), K.current?.abort();
    const we = new AbortController();
    K.current = we, _(!0);
    try {
      const Te = W.current ?? void 0, Ge = await C1(
        a.voiceAssetId,
        s,
        Te ? { chain: y, digest_before: Te } : { chain: y },
        { signal: we.signal }
      );
      if (we.signal.aborted) return;
      W.current = Ge.chain_digest, Z(Ge.chain_digest), N(null), V(Ge.measured_lufs ?? null), P([]), o(Ge), k((Ye) => Ye + 1);
    } catch (Te) {
      if (we.signal.aborted) return;
      const Ge = Te instanceof Zs;
      Te instanceof Zs && (W.current = Te.currentDigest || null);
      const Ye = Ge ? "Edit chain has changed in another tab. Reload to continue." : Te instanceof Error ? Te.message : "apply failed";
      N(Ye), u(Ye);
    } finally {
      we.signal.aborted || _(!1);
    }
  }, [
    We,
    C,
    L,
    i,
    a.voiceAssetId,
    s,
    y,
    o,
    u
  ]), Xe = g.useCallback(() => {
    te.current?.abort(), p(Wf(f)), N(null), V(null), ie(!1), P([]), k((we) => we + 1), R && (URL.revokeObjectURL(R), T(null));
  }, [f, R]), gt = g.useCallback((we) => {
    p(
      (Te) => Lx(
        Te,
        "normalize",
        (Ge) => ({
          ...Ge,
          mode: "normalize",
          target_lufs: we
        })
      )
    );
  }, []);
  return /* @__PURE__ */ c.jsxs(Mw, { variant: "standalone", children: [
    /* @__PURE__ */ c.jsx(
      Aw,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${mc(f)}`
      }
    ),
    /* @__PURE__ */ c.jsx(
      Rw,
      {
        audioUrl: m,
        durationMs: Math.max(1, f),
        startMs: Fe,
        endMs: qe,
        onChangeStart: It,
        onChangeEnd: Vt
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: dc, children: [
      /* @__PURE__ */ c.jsxs("span", { className: Jf, children: [
        /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
        /* @__PURE__ */ c.jsx(
          hc,
          {
            label: "trim",
            content: "Cuts the start and end of the clip so only the middle plays. Non-destructive — drag the handles on the waveform to change it later, or remove the trim op entirely."
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: zx, children: [
        mc(Fe),
        " → ",
        mc(qe),
        " · ",
        mc(qe - Fe)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: LB, children: [
      /* @__PURE__ */ c.jsxs("div", { className: fc, children: [
        /* @__PURE__ */ c.jsxs("span", { className: dc, children: [
          /* @__PURE__ */ c.jsxs("span", { className: Jf, children: [
            /* @__PURE__ */ c.jsx("span", { children: "Normalize loudness" }),
            /* @__PURE__ */ c.jsx(
              hc,
              {
                label: "loudness normalization",
                content: "Rescales the whole clip so it lands on a target perceived loudness (LUFS — the broadcast / streaming standard). −16 LUFS is a comfortable spoken-word level; lower numbers are louder."
              }
            )
          ] }),
          ye && Ce && /* @__PURE__ */ c.jsxs("span", { className: UB, children: [
            "target ",
            Ce.target_lufs.toFixed(1),
            " LUFS",
            M !== null && ` · measured ${M.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: $B, children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "checkbox",
              checked: ye,
              onChange: (we) => _t(we.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { children: [
            "Target ",
            Ox.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        ye && Ce && /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "range",
            className: IB,
            min: -30,
            max: -6,
            step: 0.5,
            value: Ce.target_lufs,
            onChange: (we) => gt(Number(we.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: fc, children: [
        /* @__PURE__ */ c.jsxs("span", { className: dc, children: [
          /* @__PURE__ */ c.jsxs("span", { className: Jf, children: [
            /* @__PURE__ */ c.jsx("span", { children: "Operations" }),
            /* @__PURE__ */ c.jsx(
              hc,
              {
                label: "operations",
                content: "The ordered list of edits applied to this voice asset. They run top-to-bottom each time the clip is rendered. Click × on any row to remove it."
              }
            )
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: zx, children: y.ops.length })
        ] }),
        /* @__PURE__ */ c.jsx(MB, { chain: y, onRemoveOp: Re })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: fc, children: [
        /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: kB,
            onClick: () => S((we) => !we),
            "aria-expanded": w,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: DB, "aria-hidden": "true", children: w ? "▾" : "▸" }),
              /* @__PURE__ */ c.jsx("span", { children: "Advanced effects" }),
              /* @__PURE__ */ c.jsx("span", { className: zB, children: "gain · EQ · pitch · fade · silence trim" }),
              /* @__PURE__ */ c.jsx(
                hc,
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
        w && /* @__PURE__ */ c.jsx(
          em,
          {
            state: b,
            onChange: Me,
            supportsSynthSpeed: !1
          }
        )
      ] }),
      J && /* @__PURE__ */ c.jsx("div", { className: fc, children: /* @__PURE__ */ c.jsxs("span", { className: dc, children: [
        /* @__PURE__ */ c.jsx("span", { children: "Chain digest" }),
        /* @__PURE__ */ c.jsxs("span", { className: OB, title: J, children: [
          J.slice(0, 12),
          "…"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ c.jsxs(kw, { children: [
      /* @__PURE__ */ c.jsx(
        Ze,
        {
          variant: "secondary",
          onClick: () => void Nt(),
          disabled: C || L,
          children: C ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Ze,
        {
          onClick: () => void at(),
          disabled: L || C,
          children: L ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Ze,
        {
          variant: "ghost",
          onClick: Xe,
          disabled: L || C,
          children: "Reset"
        }
      ),
      D.length > 0 && /* @__PURE__ */ c.jsxs(
        Ze,
        {
          variant: "ghost",
          size: "sm",
          onClick: He,
          disabled: L || C,
          "data-testid": "undo-last-removal",
          "aria-label": "Undo last removal",
          children: [
            "Undo last removal (",
            D.length,
            ")"
          ]
        }
      ),
      Y && /* @__PURE__ */ c.jsx(
        "span",
        {
          className: HB,
          "data-testid": "preview-consumed-hint",
          role: "note",
          "aria-live": "polite",
          children: "Preview again after edits to verify before applying"
        }
      )
    ] }),
    R && // biome-ignore lint/a11y/useMediaCaption: synthesised speech preview, no captions track
    /* @__PURE__ */ c.jsx(
      "audio",
      {
        ref: ee,
        src: R,
        controls: !0,
        className: BB,
        "aria-label": "Edit preview"
      }
    ),
    j && /* @__PURE__ */ c.jsx(kn, { severity: "error", children: j }),
    /* @__PURE__ */ c.jsxs("details", { className: VB, children: [
      /* @__PURE__ */ c.jsxs("summary", { className: qB, children: [
        "Edit history",
        G.length > 0 ? ` · ${G.length}` : ""
      ] }),
      /* @__PURE__ */ c.jsx(
        SB,
        {
          entries: G,
          loading: A,
          error: U
        }
      )
    ] })
  ] });
}
function Wf(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Dn(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function Lx(t, a, s) {
  const i = t.ops.findIndex((u) => u.mode === a);
  if (i === -1) {
    const u = { id: Dn(), mode: a };
    return { ...t, ops: [...t.ops, s(u)] };
  }
  const o = [...t.ops];
  return o[i] = s(o[i]), { ...t, ops: o };
}
function mc(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
function XB(t) {
  return t.startsWith("http://") || t.startsWith("https://") || t.startsWith("/") ? t : `/api/v1/artifacts/${encodeURIComponent(t)}`;
}
var QB = "go9vi12", ZB = "go9vi13", JB = "go9vi14", WB = "go9vi15", e7 = "go9vi16", t7 = "go9vi17", n7 = "go9vi18", a7 = "go9vi19", r7 = "go9vi1a", s7 = "go9vi1b go9vi1a", i7 = "go9vi1c", l7 = "go9vi1d", o7 = "go9vi1e", c7 = "go9vi1f", u7 = "go9vi1g", d7 = "go9vi1h", f7 = "go9vi1i", h7 = "go9vi1j", $x = "go9vi1k", m7 = "go9vi1l", p7 = "go9vi1m", g7 = "go9vi1n", Bc = "go9vi1o", v7 = "go9vi1q", y7 = "go9vi1r go9vi1q", b7 = "go9vi1s go9vi1q", x7 = "go9vi1t", S7 = "go9vi1u", w7 = "go9vi1v", j7 = "go9vi1w", Dw = "go9vi1x", E7 = "go9vi1y", N7 = "go9vi1z", C7 = "go9vi110 go9vi1o", T7 = "go9vi111", R7 = "go9vi112", _7 = "go9vi113", M7 = "go9vi114", A7 = "go9vi115", k7 = "go9vi116";
function D7() {
  const { deployment: t, mappings: a, voiceAssets: s } = Tl(), i = ti(), [o, u] = g.useState(a), [f, m] = g.useState(s), [y, p] = g.useState(
    a[0]?.mappingId ?? null
  ), [b, v] = g.useState(""), [w, S] = g.useState(null), [j, N] = g.useState(null), [R, T] = g.useState(null), [L, _] = g.useState(null), [C, I] = g.useState(0), Y = g.useCallback(() => {
    i(`/${t.deploymentId}/recipe`);
  }, [i, t.deploymentId]), ie = g.useCallback((K) => {
    _(K), window.setTimeout(() => {
      _((B) => B === K ? null : B);
    }, 1600);
  }, []), M = g.useMemo(() => {
    const K = /* @__PURE__ */ new Map();
    for (const B of f) K.set(B.voiceAssetId, B);
    return K;
  }, [f]), V = g.useMemo(() => {
    const K = b.trim().toLowerCase();
    return K ? o.filter((B) => B.characterName.toLowerCase().includes(K)) : o;
  }, [o, b]), D = g.useMemo(
    () => o.find((K) => K.mappingId === y) ?? null,
    [o, y]
  );
  g.useEffect(() => {
    u(a), m(s), p(a[0]?.mappingId ?? null);
  }, [a, s]), g.useEffect(() => {
    if (!j) return;
    const K = setTimeout(() => N(null), 2600);
    return () => clearTimeout(K);
  }, [j]);
  const P = g.useCallback(async () => {
    const K = await Qs(t.deploymentId);
    m(K.voiceAssets);
  }, [t.deploymentId]), J = g.useCallback(
    (K) => {
      u(
        (B) => B.map((W) => W.mappingId === y ? { ...W, ...K } : W)
      );
    },
    [y]
  ), Z = g.useCallback(
    async (K) => {
      if (!D) return;
      const B = D;
      try {
        const W = await Gs(t.deploymentId, D.mappingId, K);
        u((ce) => ce.map((ye) => ye.mappingId === W.mappingId ? W : ye)), Object.prototype.hasOwnProperty.call(K, "characterName") && ie(W.mappingId);
      } catch (W) {
        u(
          (ce) => ce.map((ye) => ye.mappingId === B.mappingId ? B : ye)
        ), S(gr(W));
      }
    },
    [D, t.deploymentId, ie]
  ), G = g.useCallback(async () => {
    const K = f[0];
    if (!K) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const B = I7(o), W = await Xh(t.deploymentId, {
        characterName: B,
        speakerVoiceAssetId: K.voiceAssetId
      });
      u((ce) => [...ce, W]), p(W.mappingId), I((ce) => ce + 1);
    } catch (B) {
      S(gr(B));
    }
  }, [t.deploymentId, f, o]), re = g.useCallback(() => {
    D && T({ id: D.mappingId, name: D.characterName });
  }, [D]), A = g.useCallback(async () => {
    if (!R) return;
    const { id: K, name: B } = R;
    T(null);
    try {
      await j1(t.deploymentId, K), u((W) => W.filter((ce) => ce.mappingId !== K)), p(null), N(`Mapping for ${B} deactivated.`);
    } catch (W) {
      S(gr(W));
    }
  }, [t.deploymentId, R]), F = g.useCallback(
    async (K, B, W) => {
      try {
        const ce = await Cc(t.deploymentId, K, B, W);
        return m((ye) => [ce, ...ye]), N(`${ce.displayName} uploaded.`), ce;
      } catch (ce) {
        return S(gr(ce)), null;
      }
    },
    [t.deploymentId]
  ), U = g.useCallback(async () => {
    try {
      const K = await ST(t.deploymentId);
      P7(K, `${t.deploymentId}-mappings.json`), N("Mappings exported to JSON.");
    } catch (K) {
      S(gr(K));
    }
  }, [t.deploymentId]), se = g.useCallback(
    async (K, B) => {
      try {
        const W = await wT(
          t.deploymentId,
          K.mappings,
          B
        );
        N(
          `Imported ${W.created.length} • skipped ${W.skipped.length} • replaced ${W.replaced.length}.`
        );
        const ce = await Qs(t.deploymentId);
        m(ce.voiceAssets);
      } catch (W) {
        S(gr(W));
      }
    },
    [t.deploymentId]
  ), de = g.useCallback(
    async (K) => {
      if (await P(), D && K.chain_digest)
        try {
          const B = await Gs(t.deploymentId, D.mappingId, {
            voiceAssetChainDigest: K.chain_digest
          });
          u(
            (W) => W.map((ce) => ce.mappingId === B.mappingId ? B : ce)
          );
        } catch (B) {
          S(gr(B));
        }
      N("Edit applied.");
    },
    [P, D, t.deploymentId]
  ), k = g.useCallback((K) => {
    S(K);
  }, []), ee = g.useCallback(
    async (K, B) => {
      if (!D) return null;
      const W = K.trim() || `[${D.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await CT(t.deploymentId, {
          line: W,
          outputFormat: B
        })).runId };
      } catch (ce) {
        return S(gr(ce)), null;
      }
    },
    [t.deploymentId, D]
  ), te = f.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ c.jsxs("div", { className: QB, children: [
    /* @__PURE__ */ c.jsxs("aside", { className: ZB, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: JB,
          onClick: Y,
          children: "← Back to recipe"
        }
      ),
      /* @__PURE__ */ c.jsxs("header", { className: WB, children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("h1", { id: "mapping-sidebar-heading", className: e7, children: "Cast" }),
          /* @__PURE__ */ c.jsxs("span", { className: t7, children: [
            o.length,
            " active · ",
            f.length,
            " ",
            te
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(Ze, { variant: "primary", size: "sm", onClick: G, children: "+ Add" })
      ] }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "search",
          className: n7,
          placeholder: "Search characters",
          value: b,
          onChange: (K) => v(K.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ c.jsx(B7, { onExport: U, onImport: se, onParseError: S }),
      /* @__PURE__ */ c.jsx("div", { className: a7, children: V.length === 0 ? /* @__PURE__ */ c.jsx(
        Pc,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : V.map((K) => {
        const B = M.get(K.speakerVoiceAssetId), W = K.mappingId === y;
        return /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: W ? s7 : r7,
            onClick: () => p(K.mappingId),
            "aria-pressed": W,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: i7, "aria-hidden": "true", children: V7(K.characterName) }),
              /* @__PURE__ */ c.jsxs("span", { className: l7, children: [
                /* @__PURE__ */ c.jsx("span", { className: o7, children: K.characterName }),
                /* @__PURE__ */ c.jsx("span", { className: c7, children: B?.displayName ?? "no voice" })
              ] })
            ]
          },
          K.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ c.jsxs("section", { className: u7, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ c.jsx(Sm, { features: Nm, children: /* @__PURE__ */ c.jsx(rw, { children: j && /* @__PURE__ */ c.jsx(
        Em.div,
        {
          className: E7,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: j
        },
        j
      ) }) }),
      w && /* @__PURE__ */ c.jsx(kn, { severity: "error", children: w }),
      R && /* @__PURE__ */ c.jsxs(kn, { severity: "warning", children: [
        /* @__PURE__ */ c.jsxs("span", { style: { flex: 1 }, children: [
          "Deactivate mapping for ",
          R.name,
          "?"
        ] }),
        /* @__PURE__ */ c.jsx(Ze, { variant: "danger", size: "sm", onClick: () => void A(), children: "Delete" }),
        /* @__PURE__ */ c.jsx(Ze, { variant: "ghost", size: "sm", onClick: () => T(null), children: "Cancel" })
      ] }),
      D ? /* @__PURE__ */ c.jsx(
        O7,
        {
          deploymentId: t.deploymentId,
          mapping: D,
          voiceAssets: f,
          allMappings: o,
          onNameChange: (K) => {
            J({ characterName: K });
          },
          onNameSave: (K) => {
            const B = K.trim();
            B && Z({ characterName: B });
          },
          savedHint: L === D.mappingId,
          autoFocusNonce: C,
          onSpeakerChange: (K) => {
            J({ speakerVoiceAssetId: K }), Z({ speakerVoiceAssetId: K });
          },
          onDelete: re,
          onUploadVoice: async (K, B, W) => {
            const ce = await F(K, B, W);
            return ce && W === "speaker" && (J({ speakerVoiceAssetId: ce.voiceAssetId }), Z({ speakerVoiceAssetId: ce.voiceAssetId })), await P(), ce;
          },
          onTestLine: ee,
          onEditChainPersisted: de,
          onEditError: k
        },
        D.mappingId
      ) : /* @__PURE__ */ c.jsx(
        z7,
        {
          voiceCount: f.length,
          onUploadVoice: async (K) => {
            await F(K, K.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function z7({ voiceCount: t, onUploadVoice: a }) {
  return t === 0 ? /* @__PURE__ */ c.jsxs(Ia, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ c.jsxs("div", { className: _7, children: [
      /* @__PURE__ */ c.jsx("p", { className: Zr, children: "01 / Onboarding" }),
      /* @__PURE__ */ c.jsx("h2", { id: "onboarding-heading", className: M7, children: "Upload your first voice" }),
      /* @__PURE__ */ c.jsxs("p", { className: A7, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ c.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ c.jsx(
      zw,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (s) => (await a(s), null)
      }
    )
  ] }) : /* @__PURE__ */ c.jsx(Ia, { density: "airy", children: /* @__PURE__ */ c.jsx(
    Pc,
    {
      title: "No character selected.",
      hint: "Pick one on the left or + Add"
    }
  ) });
}
function O7(t) {
  const { mapping: a, voiceAssets: s, allMappings: i } = t, o = s.find((T) => T.voiceAssetId === a.speakerVoiceAssetId) ?? null, u = g.useMemo(
    () => i.filter(
      (T) => T.isActive && T.speakerVoiceAssetId === a.speakerVoiceAssetId
    ).map((T) => T.characterName),
    [i, a.speakerVoiceAssetId]
  ), [f, m] = g.useState(""), [y, p] = g.useState("mp3"), [b, v] = g.useState("idle"), [w, S] = g.useState(null), j = g.useRef(!1), N = g.useRef(null);
  g.useEffect(() => (j.current = !1, () => {
    j.current = !0;
  }), []), g.useEffect(() => {
    if (t.autoFocusNonce === 0) return;
    const T = N.current;
    T && (T.focus(), T.select());
  }, [t.autoFocusNonce]);
  const R = g.useCallback(async () => {
    j.current = !1, v("running"), S(null);
    const T = await t.onTestLine(f, y);
    if (j.current) return;
    if (!T) {
      v("error"), S("Failed to enqueue test-line run.");
      return;
    }
    const { runId: L } = T;
    for (let _ = 0; _ < 60; _ += 1) {
      if (await new Promise((C) => setTimeout(C, 500)), j.current) return;
      try {
        const C = await Qh(t.deploymentId, L);
        if (j.current) return;
        if (C.status === "completed") {
          v("done");
          return;
        }
        if (C.status === "failed" || C.status === "cancelled") {
          v("error"), S(`Run ${C.status}.`);
          return;
        }
      } catch (C) {
        if (j.current) return;
        v("error"), S(C instanceof Error ? C.message : "unknown error");
        return;
      }
    }
    j.current || (v("error"), S("test-line timed out after 30s"));
  }, [t.onTestLine, t.deploymentId, f, y]);
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsxs("header", { className: d7, children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("p", { className: Zr, children: "Character" }),
        /* @__PURE__ */ c.jsx("h2", { className: f7, children: a.characterName })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: Dw, children: /* @__PURE__ */ c.jsx(Ze, { variant: "danger", size: "sm", onClick: t.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ c.jsxs(
      Ia,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: N7,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "text",
              className: C7,
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
              className: Bc,
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
              onClick: () => void R(),
              disabled: b === "running",
              children: b === "running" ? "Synthesising…" : "Test this line"
            }
          ),
          b === "done" && /* @__PURE__ */ c.jsx(jr, { tone: "success", children: "Synthesised — see host logs for output path." }),
          b === "error" && w && /* @__PURE__ */ c.jsx(jr, { tone: "danger", children: w })
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: h7, children: [
      /* @__PURE__ */ c.jsxs(Ia, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ c.jsx("h3", { id: "identity-heading", className: Zr, children: "01 / Identity" }),
        /* @__PURE__ */ c.jsxs("label", { className: g7, children: [
          /* @__PURE__ */ c.jsxs("span", { className: m7, children: [
            /* @__PURE__ */ c.jsx("span", { className: $x, children: "Character name" }),
            t.savedHint && /* @__PURE__ */ c.jsx(
              "span",
              {
                className: p7,
                role: "status",
                "aria-live": "polite",
                children: "✓ Saved"
              }
            )
          ] }),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              ref: N,
              className: Bc,
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
        /* @__PURE__ */ c.jsx("h3", { id: "voice-heading", className: Zr, children: "02 / Voice Reference" }),
        /* @__PURE__ */ c.jsx("span", { className: $x, children: "Speaker reference" }),
        /* @__PURE__ */ c.jsx(
          L7,
          {
            value: a.speakerVoiceAssetId,
            voices: s,
            onChange: t.onSpeakerChange
          }
        ),
        o && /* @__PURE__ */ c.jsx($7, { voice: o }),
        /* @__PURE__ */ c.jsx(
          zw,
          {
            label: o ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (T) => t.onUploadVoice(T, T.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ c.jsx(
          KB,
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
function L7({
  value: t,
  voices: a,
  onChange: s
}) {
  return /* @__PURE__ */ c.jsxs(
    "select",
    {
      className: Bc,
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
function $7({ voice: t }) {
  const a = q7(t.durationMs ?? null);
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: x7, children: [
      /* @__PURE__ */ c.jsx("span", { children: t.displayName }),
      /* @__PURE__ */ c.jsx("span", { children: t.kind }),
      t.durationMs != null && /* @__PURE__ */ c.jsx("span", { children: H7(t.durationMs) }),
      t.sampleRate && /* @__PURE__ */ c.jsxs("span", { children: [
        t.sampleRate,
        " Hz"
      ] })
    ] }),
    t.durationMs != null && /* @__PURE__ */ c.jsxs("div", { className: S7, children: [
      /* @__PURE__ */ c.jsx("div", { className: w7, children: /* @__PURE__ */ c.jsx(Sm, { features: Nm, children: /* @__PURE__ */ c.jsx(
        Em.div,
        {
          className: j7,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, t.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ c.jsx(jr, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ c.jsx(U7, { seed: t.contentSha256 })
  ] });
}
function U7({ seed: t }) {
  const a = g.useMemo(() => F7(t, 48), [t]);
  return /* @__PURE__ */ c.jsx("div", { className: T7, "aria-hidden": "true", children: a.map((s, i) => /* @__PURE__ */ c.jsx(
    "span",
    {
      className: R7,
      style: { height: `${Math.max(6, s * 100)}%` }
    },
    `${t}-${i}`
  )) });
}
function zw({
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
      className: o ? b7 : s ? y7 : v7,
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
function B7({
  onExport: t,
  onImport: a,
  onParseError: s
}) {
  const [i, o] = g.useState("error"), u = g.useRef(null);
  return /* @__PURE__ */ c.jsxs("div", { className: Dw, children: [
    /* @__PURE__ */ c.jsx(Ze, { variant: "secondary", size: "sm", onClick: t, children: "Export JSON" }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        ref: u,
        type: "file",
        accept: "application/json,.json",
        className: k7,
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
        className: Bc,
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
function I7(t) {
  const a = new Set(t.map((i) => i.characterName.toLowerCase()));
  let s = 1;
  for (; a.has(`character ${s}`); ) s += 1;
  return `Character ${s}`;
}
function V7(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function q7(t) {
  return t == null ? null : t < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : t > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : t > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function H7(t) {
  return t < 1e3 ? `${t} ms` : `${Math.round(t / 100) / 10}s`;
}
function F7(t, a) {
  const s = [];
  for (let i = 0; i < a; i += 1) {
    const o = t.charCodeAt(i % t.length);
    s.push((o * 31 + i * 7) % 100 / 100);
  }
  return s;
}
function P7(t, a) {
  const s = new Blob([JSON.stringify(t, null, 2)], { type: "application/json" }), i = URL.createObjectURL(s), o = document.createElement("a");
  o.href = i, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(i);
}
function gr(t) {
  return t instanceof ni || t instanceof Error ? t.message : "unknown error";
}
function G7() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: t } = await bT();
        return { deployments: t };
      },
      Component: aR
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: t }) => {
        const a = Vs(t, "deploymentId");
        return CN(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: t }) => {
        const a = Vs(t, "deploymentId"), [s, { mappings: i }, { runs: o }, u] = await Promise.all([
          Yy(a),
          Ky(a),
          jT(a, { limit: 10 }),
          MT(a)
        ]);
        return { deployment: s, mappings: i, runs: o, workflow: u };
      },
      Component: SU
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: t }) => {
        const a = Vs(t, "deploymentId"), s = Vs(t, "runId");
        return { run: await Qh(a, s) };
      },
      Component: A9
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: t }) => {
        const a = Vs(t, "deploymentId"), [s, { mappings: i }, { voiceAssets: o }] = await Promise.all([
          Yy(a),
          Ky(a),
          Qs(a)
        ]);
        return { deployment: s, mappings: i, voiceAssets: o };
      },
      Component: D7
    },
    {
      path: "/:deploymentId/mappings/new",
      loader: ({ params: t, request: a }) => {
        const s = Vs(t, "deploymentId"), i = new URL(a.url);
        return {
          deploymentId: s,
          prefillCharacterName: i.searchParams.get("character") ?? ""
        };
      },
      Component: uB
    },
    {
      path: "/runtime/queue",
      Component: iB
    }
  ];
}
function Vs(t, a) {
  const s = t[a];
  if (!s)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return s;
}
const Ux = "ext-actions-request", Y7 = "ext-actions-declare", K7 = "ext-action-state", Bx = "ext-action-invoke", kh = "emotion-tts:navigate", Fs = "emotion-tts.run", Ix = "emotion-tts.mappings", X7 = 4e3;
function Q7(t, a) {
  let s = null, i = !1;
  const o = () => {
    const j = s?.badge ?? "not_installed";
    return Z7(j, i);
  }, u = () => ({
    primary: o(),
    secondary: {
      id: Ix,
      label: "Mappings",
      icon: "tune",
      tone: "secondary",
      tooltip: "Manage character → voice mappings"
    }
  }), f = () => {
    t.dispatchEvent(
      new CustomEvent(Y7, {
        detail: { actions: u() },
        bubbles: !1
      })
    );
  }, m = () => {
    t.dispatchEvent(
      new CustomEvent(K7, {
        detail: { action: o() },
        bubbles: !1
      })
    );
  }, y = () => f(), p = (j) => {
    const N = j.detail?.id;
    N === Fs ? b() : N === Ix && t.dispatchEvent(
      new CustomEvent(kh, {
        detail: { path: `/${a}/mappings` },
        bubbles: !1
      })
    );
  }, b = async () => {
    const j = s?.badge ?? "not_installed", N = j === "ready" || j === "running" || j === "starting";
    i = !0, m();
    try {
      N ? await n2() : await t2(a2(), O1());
      try {
        s = await vl();
      } catch {
      }
    } catch {
    } finally {
      i = !1, m();
    }
  };
  t.addEventListener(Ux, y), t.addEventListener(Bx, p);
  let v = !1;
  const w = async () => {
    try {
      const j = await vl();
      if (v) return;
      s = j, m();
    } catch {
    }
  };
  w();
  const S = window.setInterval(() => void w(), X7);
  return f(), {
    dispose: () => {
      v = !0, window.clearInterval(S), t.removeEventListener(Ux, y), t.removeEventListener(Bx, p);
    }
  };
}
function Z7(t, a) {
  const s = t === "ready" || t === "running" || t === "starting", i = t === "stopped" || t === "not_installed" || t === "failed";
  return a ? {
    id: Fs,
    label: s ? "Stopping…" : "Starting…",
    icon: s ? "stop" : "play_arrow",
    tone: "primary",
    state: "loading"
  } : t === "starting" || t === "installing" || t === "stopping" ? {
    id: Fs,
    label: k1(t),
    icon: "hourglass_top",
    tone: "primary",
    state: "loading"
  } : s ? {
    id: Fs,
    label: "Stop runtime",
    icon: "stop",
    tone: "primary",
    state: "idle",
    tooltip: "Stop the EmotionTTS worker"
  } : i ? {
    id: Fs,
    label: t === "not_installed" ? "Install / Start runtime" : "Start runtime",
    icon: "play_arrow",
    tone: "primary",
    state: "idle",
    tooltip: "Start the EmotionTTS worker for this deployment"
  } : {
    id: Fs,
    label: "Start runtime",
    icon: "play_arrow",
    tone: "primary",
    state: "idle"
  };
}
const Dh = "emotion-tts-app", J7 = "ext-event", Vx = "emotion-tts-stylesheet", qx = ["accent", "density", "card"];
function W7(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function eI() {
  if (typeof document > "u" || document.getElementById(Vx)) return;
  const t = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = Vx, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
eI();
class tI extends HTMLElement {
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
    this.root = ZE.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(kh, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = Q7(this, a), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (s) => {
      const i = s.detail?.path;
      i && this.router && this.router.navigate(i);
    };
    this.navigateListener = a, this.addEventListener(kh, a);
  }
  syncTweaksFromBody() {
    for (const a of qx) {
      const s = W7(a);
      s === void 0 ? delete this.dataset[a] : this.dataset[a] !== s && (this.dataset[a] = s);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: qx.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), s = DC(G7(), { initialEntries: [a] });
    this.router = s, this.root.render(
      /* @__PURE__ */ c.jsx(g.StrictMode, { children: /* @__PURE__ */ c.jsx(OC, { router: s }) })
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
      new CustomEvent(J7, {
        detail: { topic: a, payload: s },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function nI() {
  typeof customElements > "u" || customElements.get(Dh) || customElements.define(Dh, tI);
}
typeof customElements < "u" && !customElements.get(Dh) && nI();
export {
  nI as register
};
//# sourceMappingURL=emotion-tts.js.map
