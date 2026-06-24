function HE(t, a) {
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
function Gx(t) {
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
function FE() {
  if (dy) return Qi;
  dy = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function s(i, o, u) {
    var f = null;
    if (u !== void 0 && (f = "" + u), o.key !== void 0 && (f = "" + o.key), "key" in o) {
      u = {};
      for (var p in o)
        p !== "key" && (u[p] = o[p]);
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
function PE() {
  return fy || (fy = 1, cf.exports = FE()), cf.exports;
}
var c = PE(), uf = { exports: {} }, Ge = {};
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
function GE() {
  if (hy) return Ge;
  hy = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), f = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), S = Symbol.iterator;
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
  function T(k, ee, re) {
    this.props = k, this.context = ee, this.refs = _, this.updater = re || j;
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
  function O() {
  }
  O.prototype = T.prototype;
  function R(k, ee, re) {
    this.props = k, this.context = ee, this.refs = _, this.updater = re || j;
  }
  var N = R.prototype = new O();
  N.constructor = R, C(N, T.prototype), N.isPureReactComponent = !0;
  var U = Array.isArray;
  function Y() {
  }
  var ae = { H: null, A: null, T: null, S: null }, M = Object.prototype.hasOwnProperty;
  function V(k, ee, re) {
    var G = re.ref;
    return {
      $$typeof: t,
      type: k,
      key: ee,
      ref: G !== void 0 ? G : null,
      props: re
    };
  }
  function D(k, ee) {
    return V(k.type, ee, k.props);
  }
  function H(k) {
    return typeof k == "object" && k !== null && k.$$typeof === t;
  }
  function Q(k) {
    var ee = { "=": "=0", ":": "=2" };
    return "$" + k.replace(/[=:]/g, function(re) {
      return ee[re];
    });
  }
  var J = /\/+/g;
  function P(k, ee) {
    return typeof k == "object" && k !== null && k.key != null ? Q("" + k.key) : ee.toString(36);
  }
  function ie(k) {
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
  function A(k, ee, re, G, B) {
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
                re,
                G,
                B
              );
          }
      }
    if (ce)
      return B = B(k), ce = G === "" ? "." + P(k, 0) : G, U(B) ? (re = "", ce != null && (re = ce.replace(J, "$&/") + "/"), A(B, ee, re, "", function(lt) {
        return lt;
      })) : B != null && (H(B) && (B = D(
        B,
        re + (B.key == null || k && k.key === B.key ? "" : ("" + B.key).replace(
          J,
          "$&/"
        ) + "/") + ce
      )), ee.push(B)), 1;
    ce = 0;
    var ye = G === "" ? "." : G + ":";
    if (U(k))
      for (var Ae = 0; Ae < k.length; Ae++)
        G = k[Ae], W = ye + P(G, Ae), ce += A(
          G,
          ee,
          re,
          W,
          B
        );
    else if (Ae = w(k), typeof Ae == "function")
      for (k = Ae.call(k), Ae = 0; !(G = k.next()).done; )
        G = G.value, W = ye + P(G, Ae++), ce += A(
          G,
          ee,
          re,
          W,
          B
        );
    else if (W === "object") {
      if (typeof k.then == "function")
        return A(
          ie(k),
          ee,
          re,
          G,
          B
        );
      throw ee = String(k), Error(
        "Objects are not valid as a React child (found: " + (ee === "[object Object]" ? "object with keys {" + Object.keys(k).join(", ") + "}" : ee) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ce;
  }
  function q(k, ee, re) {
    if (k == null) return k;
    var G = [], B = 0;
    return A(k, G, "", "", function(W) {
      return ee.call(re, W, B++);
    }), G;
  }
  function $(k) {
    if (k._status === -1) {
      var ee = k._result;
      ee = ee(), ee.then(
        function(re) {
          (k._status === 0 || k._status === -1) && (k._status = 1, k._result = re);
        },
        function(re) {
          (k._status === 0 || k._status === -1) && (k._status = 2, k._result = re);
        }
      ), k._status === -1 && (k._status = 0, k._result = ee);
    }
    if (k._status === 1) return k._result.default;
    throw k._result;
  }
  var te = typeof reportError == "function" ? reportError : function(k) {
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
  }, fe = {
    map: q,
    forEach: function(k, ee, re) {
      q(
        k,
        function() {
          ee.apply(this, arguments);
        },
        re
      );
    },
    count: function(k) {
      var ee = 0;
      return q(k, function() {
        ee++;
      }), ee;
    },
    toArray: function(k) {
      return q(k, function(ee) {
        return ee;
      }) || [];
    },
    only: function(k) {
      if (!H(k))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return k;
    }
  };
  return Ge.Activity = v, Ge.Children = fe, Ge.Component = T, Ge.Fragment = s, Ge.Profiler = o, Ge.PureComponent = R, Ge.StrictMode = i, Ge.Suspense = y, Ge.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ae, Ge.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(k) {
      return ae.H.useMemoCache(k);
    }
  }, Ge.cache = function(k) {
    return function() {
      return k.apply(null, arguments);
    };
  }, Ge.cacheSignal = function() {
    return null;
  }, Ge.cloneElement = function(k, ee, re) {
    if (k == null)
      throw Error(
        "The argument must be a React element, but you passed " + k + "."
      );
    var G = C({}, k.props), B = k.key;
    if (ee != null)
      for (W in ee.key !== void 0 && (B = "" + ee.key), ee)
        !M.call(ee, W) || W === "key" || W === "__self" || W === "__source" || W === "ref" && ee.ref === void 0 || (G[W] = ee[W]);
    var W = arguments.length - 2;
    if (W === 1) G.children = re;
    else if (1 < W) {
      for (var ce = Array(W), ye = 0; ye < W; ye++)
        ce[ye] = arguments[ye + 2];
      G.children = ce;
    }
    return V(k.type, B, G);
  }, Ge.createContext = function(k) {
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
  }, Ge.createElement = function(k, ee, re) {
    var G, B = {}, W = null;
    if (ee != null)
      for (G in ee.key !== void 0 && (W = "" + ee.key), ee)
        M.call(ee, G) && G !== "key" && G !== "__self" && G !== "__source" && (B[G] = ee[G]);
    var ce = arguments.length - 2;
    if (ce === 1) B.children = re;
    else if (1 < ce) {
      for (var ye = Array(ce), Ae = 0; Ae < ce; Ae++)
        ye[Ae] = arguments[Ae + 2];
      B.children = ye;
    }
    if (k && k.defaultProps)
      for (G in ce = k.defaultProps, ce)
        B[G] === void 0 && (B[G] = ce[G]);
    return V(k, W, B);
  }, Ge.createRef = function() {
    return { current: null };
  }, Ge.forwardRef = function(k) {
    return { $$typeof: p, render: k };
  }, Ge.isValidElement = H, Ge.lazy = function(k) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: k },
      _init: $
    };
  }, Ge.memo = function(k, ee) {
    return {
      $$typeof: m,
      type: k,
      compare: ee === void 0 ? null : ee
    };
  }, Ge.startTransition = function(k) {
    var ee = ae.T, re = {};
    ae.T = re;
    try {
      var G = k(), B = ae.S;
      B !== null && B(re, G), typeof G == "object" && G !== null && typeof G.then == "function" && G.then(Y, te);
    } catch (W) {
      te(W);
    } finally {
      ee !== null && re.types !== null && (ee.types = re.types), ae.T = ee;
    }
  }, Ge.unstable_useCacheRefresh = function() {
    return ae.H.useCacheRefresh();
  }, Ge.use = function(k) {
    return ae.H.use(k);
  }, Ge.useActionState = function(k, ee, re) {
    return ae.H.useActionState(k, ee, re);
  }, Ge.useCallback = function(k, ee) {
    return ae.H.useCallback(k, ee);
  }, Ge.useContext = function(k) {
    return ae.H.useContext(k);
  }, Ge.useDebugValue = function() {
  }, Ge.useDeferredValue = function(k, ee) {
    return ae.H.useDeferredValue(k, ee);
  }, Ge.useEffect = function(k, ee) {
    return ae.H.useEffect(k, ee);
  }, Ge.useEffectEvent = function(k) {
    return ae.H.useEffectEvent(k);
  }, Ge.useId = function() {
    return ae.H.useId();
  }, Ge.useImperativeHandle = function(k, ee, re) {
    return ae.H.useImperativeHandle(k, ee, re);
  }, Ge.useInsertionEffect = function(k, ee) {
    return ae.H.useInsertionEffect(k, ee);
  }, Ge.useLayoutEffect = function(k, ee) {
    return ae.H.useLayoutEffect(k, ee);
  }, Ge.useMemo = function(k, ee) {
    return ae.H.useMemo(k, ee);
  }, Ge.useOptimistic = function(k, ee) {
    return ae.H.useOptimistic(k, ee);
  }, Ge.useReducer = function(k, ee, re) {
    return ae.H.useReducer(k, ee, re);
  }, Ge.useRef = function(k) {
    return ae.H.useRef(k);
  }, Ge.useState = function(k) {
    return ae.H.useState(k);
  }, Ge.useSyncExternalStore = function(k, ee, re) {
    return ae.H.useSyncExternalStore(
      k,
      ee,
      re
    );
  }, Ge.useTransition = function() {
    return ae.H.useTransition();
  }, Ge.version = "19.2.5", Ge;
}
var my;
function Lh() {
  return my || (my = 1, uf.exports = GE()), uf.exports;
}
var g = Lh();
const we = /* @__PURE__ */ Gx(g), YE = /* @__PURE__ */ HE({
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
function KE() {
  return py || (py = 1, (function(t) {
    function a(A, q) {
      var $ = A.length;
      A.push(q);
      e: for (; 0 < $; ) {
        var te = $ - 1 >>> 1, fe = A[te];
        if (0 < o(fe, q))
          A[te] = q, A[$] = fe, $ = te;
        else break e;
      }
    }
    function s(A) {
      return A.length === 0 ? null : A[0];
    }
    function i(A) {
      if (A.length === 0) return null;
      var q = A[0], $ = A.pop();
      if ($ !== q) {
        A[0] = $;
        e: for (var te = 0, fe = A.length, k = fe >>> 1; te < k; ) {
          var ee = 2 * (te + 1) - 1, re = A[ee], G = ee + 1, B = A[G];
          if (0 > o(re, $))
            G < fe && 0 > o(B, re) ? (A[te] = B, A[G] = $, te = G) : (A[te] = re, A[ee] = $, te = ee);
          else if (G < fe && 0 > o(B, $))
            A[te] = B, A[G] = $, te = G;
          else break e;
        }
      }
      return q;
    }
    function o(A, q) {
      var $ = A.sortIndex - q.sortIndex;
      return $ !== 0 ? $ : A.id - q.id;
    }
    if (t.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var u = performance;
      t.unstable_now = function() {
        return u.now();
      };
    } else {
      var f = Date, p = f.now();
      t.unstable_now = function() {
        return f.now() - p;
      };
    }
    var y = [], m = [], b = 1, v = null, S = 3, w = !1, j = !1, C = !1, _ = !1, T = typeof setTimeout == "function" ? setTimeout : null, O = typeof clearTimeout == "function" ? clearTimeout : null, R = typeof setImmediate < "u" ? setImmediate : null;
    function N(A) {
      for (var q = s(m); q !== null; ) {
        if (q.callback === null) i(m);
        else if (q.startTime <= A)
          i(m), q.sortIndex = q.expirationTime, a(y, q);
        else break;
        q = s(m);
      }
    }
    function U(A) {
      if (C = !1, N(A), !j)
        if (s(y) !== null)
          j = !0, Y || (Y = !0, Q());
        else {
          var q = s(m);
          q !== null && ie(U, q.startTime - A);
        }
    }
    var Y = !1, ae = -1, M = 5, V = -1;
    function D() {
      return _ ? !0 : !(t.unstable_now() - V < M);
    }
    function H() {
      if (_ = !1, Y) {
        var A = t.unstable_now();
        V = A;
        var q = !0;
        try {
          e: {
            j = !1, C && (C = !1, O(ae), ae = -1), w = !0;
            var $ = S;
            try {
              t: {
                for (N(A), v = s(y); v !== null && !(v.expirationTime > A && D()); ) {
                  var te = v.callback;
                  if (typeof te == "function") {
                    v.callback = null, S = v.priorityLevel;
                    var fe = te(
                      v.expirationTime <= A
                    );
                    if (A = t.unstable_now(), typeof fe == "function") {
                      v.callback = fe, N(A), q = !0;
                      break t;
                    }
                    v === s(y) && i(y), N(A);
                  } else i(y);
                  v = s(y);
                }
                if (v !== null) q = !0;
                else {
                  var k = s(m);
                  k !== null && ie(
                    U,
                    k.startTime - A
                  ), q = !1;
                }
              }
              break e;
            } finally {
              v = null, S = $, w = !1;
            }
            q = void 0;
          }
        } finally {
          q ? Q() : Y = !1;
        }
      }
    }
    var Q;
    if (typeof R == "function")
      Q = function() {
        R(H);
      };
    else if (typeof MessageChannel < "u") {
      var J = new MessageChannel(), P = J.port2;
      J.port1.onmessage = H, Q = function() {
        P.postMessage(null);
      };
    } else
      Q = function() {
        T(H, 0);
      };
    function ie(A, q) {
      ae = T(function() {
        A(t.unstable_now());
      }, q);
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
          var q = 3;
          break;
        default:
          q = S;
      }
      var $ = S;
      S = q;
      try {
        return A();
      } finally {
        S = $;
      }
    }, t.unstable_requestPaint = function() {
      _ = !0;
    }, t.unstable_runWithPriority = function(A, q) {
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
        return q();
      } finally {
        S = $;
      }
    }, t.unstable_scheduleCallback = function(A, q, $) {
      var te = t.unstable_now();
      switch (typeof $ == "object" && $ !== null ? ($ = $.delay, $ = typeof $ == "number" && 0 < $ ? te + $ : te) : $ = te, A) {
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
        callback: q,
        priorityLevel: A,
        startTime: $,
        expirationTime: fe,
        sortIndex: -1
      }, $ > te ? (A.sortIndex = $, a(m, A), s(y) === null && A === s(m) && (C ? (O(ae), ae = -1) : C = !0, ie(U, $ - te))) : (A.sortIndex = fe, a(y, A), j || w || (j = !0, Y || (Y = !0, Q()))), A;
    }, t.unstable_shouldYield = D, t.unstable_wrapCallback = function(A) {
      var q = S;
      return function() {
        var $ = S;
        S = q;
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
function XE() {
  return gy || (gy = 1, ff.exports = KE()), ff.exports;
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
function QE() {
  if (vy) return vn;
  vy = 1;
  var t = Lh();
  function a(y) {
    var m = "https://react.dev/errors/" + y;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        m += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + y + "; visit " + m + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function u(y, m, b) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: v == null ? null : "" + v,
      children: y,
      containerInfo: m,
      implementation: b
    };
  }
  var f = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(y, m) {
    if (y === "font") return "";
    if (typeof m == "string")
      return m === "use-credentials" ? m : "";
  }
  return vn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, vn.createPortal = function(y, m) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(a(299));
    return u(y, m, null, b);
  }, vn.flushSync = function(y) {
    var m = f.T, b = i.p;
    try {
      if (f.T = null, i.p = 2, y) return y();
    } finally {
      f.T = m, i.p = b, i.d.f();
    }
  }, vn.preconnect = function(y, m) {
    typeof y == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, i.d.C(y, m));
  }, vn.prefetchDNS = function(y) {
    typeof y == "string" && i.d.D(y);
  }, vn.preinit = function(y, m) {
    if (typeof y == "string" && m && typeof m.as == "string") {
      var b = m.as, v = p(b, m.crossOrigin), S = typeof m.integrity == "string" ? m.integrity : void 0, w = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
      b === "style" ? i.d.S(
        y,
        typeof m.precedence == "string" ? m.precedence : void 0,
        {
          crossOrigin: v,
          integrity: S,
          fetchPriority: w
        }
      ) : b === "script" && i.d.X(y, {
        crossOrigin: v,
        integrity: S,
        fetchPriority: w,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0
      });
    }
  }, vn.preinitModule = function(y, m) {
    if (typeof y == "string")
      if (typeof m == "object" && m !== null) {
        if (m.as == null || m.as === "script") {
          var b = p(
            m.as,
            m.crossOrigin
          );
          i.d.M(y, {
            crossOrigin: b,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
            nonce: typeof m.nonce == "string" ? m.nonce : void 0
          });
        }
      } else m == null && i.d.M(y);
  }, vn.preload = function(y, m) {
    if (typeof y == "string" && typeof m == "object" && m !== null && typeof m.as == "string") {
      var b = m.as, v = p(b, m.crossOrigin);
      i.d.L(y, b, {
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
  }, vn.preloadModule = function(y, m) {
    if (typeof y == "string")
      if (m) {
        var b = p(m.as, m.crossOrigin);
        i.d.m(y, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: b,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0
        });
      } else i.d.m(y);
  }, vn.requestFormReset = function(y) {
    i.d.r(y);
  }, vn.unstable_batchedUpdates = function(y, m) {
    return y(m);
  }, vn.useFormState = function(y, m, b) {
    return f.H.useFormState(y, m, b);
  }, vn.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, vn.version = "19.2.5", vn;
}
var yy;
function Yx() {
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
  return t(), mf.exports = QE(), mf.exports;
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
function ZE() {
  if (by) return Zi;
  by = 1;
  var t = XE(), a = Lh(), s = Yx();
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
  function p(e) {
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
  function m(e) {
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
  var v = Object.assign, S = Symbol.for("react.element"), w = Symbol.for("react.transitional.element"), j = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), _ = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), O = Symbol.for("react.consumer"), R = Symbol.for("react.context"), N = Symbol.for("react.forward_ref"), U = Symbol.for("react.suspense"), Y = Symbol.for("react.suspense_list"), ae = Symbol.for("react.memo"), M = Symbol.for("react.lazy"), V = Symbol.for("react.activity"), D = Symbol.for("react.memo_cache_sentinel"), H = Symbol.iterator;
  function Q(e) {
    return e === null || typeof e != "object" ? null : (e = H && e[H] || e["@@iterator"], typeof e == "function" ? e : null);
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
      case U:
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
        case R:
          return e.displayName || "Context";
        case O:
          return (e._context.displayName || "Context") + ".Consumer";
        case N:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ae:
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
  var ie = Array.isArray, A = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, q = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, $ = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, te = [], fe = -1;
  function k(e) {
    return { current: e };
  }
  function ee(e) {
    0 > fe || (e.current = te[fe], te[fe] = null, fe--);
  }
  function re(e, n) {
    fe++, te[fe] = e.current, e.current = n;
  }
  var G = k(null), B = k(null), W = k(null), ce = k(null);
  function ye(e, n) {
    switch (re(W, n), re(B, e), re(G, null), n.nodeType) {
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
    ee(G), re(G, e);
  }
  function Ae() {
    ee(G), ee(B), ee(W);
  }
  function lt(e) {
    e.memoizedState !== null && re(ce, e);
    var n = G.current, r = Ov(n, e.type);
    n !== r && (re(B, e), re(G, r));
  }
  function Ne(e) {
    B.current === e && (ee(G), ee(B)), ce.current === e && (ee(ce), Gi._currentValue = $);
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
`), se = E.split(`
`);
        for (d = l = 0; l < L.length && !L[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; d < se.length && !se[d].includes(
          "DetermineComponentFrameRoot"
        ); )
          d++;
        if (l === L.length || d === se.length)
          for (l = L.length - 1, d = se.length - 1; 1 <= l && 0 <= d && L[l] !== se[d]; )
            d--;
        for (; 1 <= l && 0 <= d; l--, d--)
          if (L[l] !== se[d]) {
            if (l !== 1 || d !== 1)
              do
                if (l--, d--, 0 > d || L[l] !== se[d]) {
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
  function Mt(e, n) {
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
  function Ce(e) {
    try {
      var n = "", r = null;
      do
        n += Mt(e, r), r = e, e = e.return;
      while (e);
      return n;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var He = Object.prototype.hasOwnProperty, at = t.unstable_scheduleCallback, xt = t.unstable_cancelCallback, ot = t.unstable_shouldYield, Ye = t.unstable_requestPaint, pt = t.unstable_now, je = t.unstable_getCurrentPriorityLevel, ke = t.unstable_ImmediatePriority, Pe = t.unstable_UserBlockingPriority, Xe = t.unstable_NormalPriority, St = t.unstable_LowPriority, Ct = t.unstable_IdlePriority, zn = t.log, Sn = t.unstable_setDisableYieldValue, pn = null, Pt = null;
  function kt(e) {
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
  function Te(e) {
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
    return E !== 0 ? (l = E & ~h, l !== 0 ? d = Te(l) : (x &= E, x !== 0 ? d = Te(x) : r || (r = E & ~e, r !== 0 && (d = Te(r))))) : (E = l & ~h, E !== 0 ? d = Te(E) : x !== 0 ? d = Te(x) : r || (r = l & ~e, r !== 0 && (d = Te(r)))), d === 0 ? 0 : n !== 0 && n !== d && (n & h) === 0 && (h = d & -d, r = n & -n, h >= r || h === 32 && (r & 4194048) !== 0) ? n : d;
  }
  function xe(e, n) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & n) === 0;
  }
  function K(e, n) {
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
  function ue() {
    var e = he;
    return he <<= 1, (he & 62914560) === 0 && (he = 4194304), e;
  }
  function Re(e) {
    for (var n = [], r = 0; 31 > r; r++) n.push(e);
    return n;
  }
  function _e(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Ke(e, n, r, l, d, h) {
    var x = e.pendingLanes;
    e.pendingLanes = r, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= r, e.entangledLanes &= r, e.errorRecoveryDisabledLanes &= r, e.shellSuspendCounter = 0;
    var E = e.entanglements, L = e.expirationTimes, se = e.hiddenUpdates;
    for (r = x & ~r; 0 < r; ) {
      var de = 31 - Bt(r), pe = 1 << de;
      E[de] = 0, L[de] = -1;
      var le = se[de];
      if (le !== null)
        for (se[de] = null, de = 0; de < le.length; de++) {
          var oe = le[de];
          oe !== null && (oe.lane &= -536870913);
        }
      r &= ~pe;
    }
    l !== 0 && Dt(e, l, 0), h !== 0 && d === 0 && e.tag !== 0 && (e.suspendedLanes |= h & ~(x & ~n));
  }
  function Dt(e, n, r) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var l = 31 - Bt(n);
    e.entangledLanes |= n, e.entanglements[l] = e.entanglements[l] | 1073741824 | r & 261930;
  }
  function gt(e, n) {
    var r = e.entangledLanes |= n;
    for (e = e.entanglements; r; ) {
      var l = 31 - Bt(r), d = 1 << l;
      d & n | e[l] & n && (e[l] |= n), r &= ~d;
    }
  }
  function z(e, n) {
    var r = n & -n;
    return r = (r & 42) !== 0 ? 1 : F(r), (r & (e.suspendedLanes | n)) !== 0 ? 0 : r;
  }
  function F(e) {
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
  function Z(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ve() {
    var e = q.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : ry(e.type));
  }
  function be(e, n) {
    var r = q.p;
    try {
      return q.p = e, n();
    } finally {
      q.p = r;
    }
  }
  var De = Math.random().toString(36).slice(2), Se = "__reactFiber$" + De, Ee = "__reactProps$" + De, Le = "__reactContainer$" + De, Me = "__reactEvents$" + De, Ve = "__reactListeners$" + De, Ue = "__reactHandles$" + De, ft = "__reactResources$" + De, et = "__reactMarker$" + De;
  function Tt(e) {
    delete e[Se], delete e[Ee], delete e[Me], delete e[Ve], delete e[Ue];
  }
  function wt(e) {
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
    var n = e[ft];
    return n || (n = e[ft] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function At(e) {
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
  var $w = /[\n"\\]/g;
  function Fn(e) {
    return e.replace(
      $w,
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
  var Uw = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Am(e, n, r) {
    var l = n.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === "" ? l ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : l ? e.setProperty(n, r) : typeof r != "number" || r === 0 || Uw.has(n) ? n === "float" ? e.cssFloat = r : e[n] = ("" + r).trim() : e[n] = r + "px";
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
  var Bw = /* @__PURE__ */ new Map([
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
  ]), Iw = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ol(e) {
    return Iw.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
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
  }, Bl = Nn(Ar), di = v({}, Ar, { view: 0, detail: 0 }), Vw = Nn(di), uu, du, fi, Il = v({}, di, {
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
  }), $m = Nn(Il), qw = v({}, Il, { dataTransfer: 0 }), Hw = Nn(qw), Fw = v({}, di, { relatedTarget: 0 }), fu = Nn(Fw), Pw = v({}, Ar, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Gw = Nn(Pw), Yw = v({}, Ar, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Kw = Nn(Yw), Xw = v({}, Ar, { data: 0 }), Um = Nn(Xw), Qw = {
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
  }, Zw = {
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
  }, Jw = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Ww(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = Jw[e]) ? !!n[e] : !1;
  }
  function hu() {
    return Ww;
  }
  var ej = v({}, di, {
    key: function(e) {
      if (e.key) {
        var n = Qw[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = $l(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Zw[e.keyCode] || "Unidentified" : "";
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
  }), tj = Nn(ej), nj = v({}, Il, {
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
  }), Bm = Nn(nj), aj = v({}, di, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: hu
  }), rj = Nn(aj), sj = v({}, Ar, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), ij = Nn(sj), lj = v({}, Il, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), oj = Nn(lj), cj = v({}, Ar, {
    newState: 0,
    oldState: 0
  }), uj = Nn(cj), dj = [9, 13, 27, 32], mu = ja && "CompositionEvent" in window, hi = null;
  ja && "documentMode" in document && (hi = document.documentMode);
  var fj = ja && "TextEvent" in window && !hi, Im = ja && (!mu || hi && 8 < hi && 11 >= hi), Vm = " ", qm = !1;
  function Hm(e, n) {
    switch (e) {
      case "keyup":
        return dj.indexOf(n.keyCode) !== -1;
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
  function hj(e, n) {
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
  function mj(e, n) {
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
  var pj = {
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
    return n === "input" ? !!pj[e.type] : n === "textarea";
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
  function gj(e) {
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
      ), zm(gj, n);
    }
  }
  function vj(e, n, r) {
    e === "focusin" ? (Qm(), mi = n, pi = r, mi.attachEvent("onpropertychange", Zm)) : e === "focusout" && Qm();
  }
  function yj(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Vl(pi);
  }
  function bj(e, n) {
    if (e === "click") return Vl(n);
  }
  function xj(e, n) {
    if (e === "input" || e === "change")
      return Vl(n);
  }
  function Sj(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var On = typeof Object.is == "function" ? Object.is : Sj;
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
  var wj = ja && "documentMode" in document && 11 >= document.documentMode, ds = null, yu = null, vi = null, bu = !1;
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
  var rp = Dr("animationend"), sp = Dr("animationiteration"), ip = Dr("animationstart"), jj = Dr("transitionrun"), Ej = Dr("transitionstart"), Nj = Dr("transitioncancel"), lp = Dr("transitionend"), op = /* @__PURE__ */ new Map(), Su = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
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
  function Cj(e, n, r, l) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ln(e, n, r, l) {
    return new Cj(e, n, r, l);
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
      x = AE(
        e,
        r,
        G.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case V:
          return e = Ln(31, r, n, d), e.elementType = V, e.lanes = h, e;
        case C:
          return Or(r.children, d, h, n);
        case _:
          x = 8, d |= 24;
          break;
        case T:
          return e = Ln(12, r, n, d | 2), e.elementType = T, e.lanes = h, e;
        case U:
          return e = Ln(13, r, n, d), e.elementType = U, e.lanes = h, e;
        case Y:
          return e = Ln(19, r, n, d), e.elementType = Y, e.lanes = h, e;
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
              case ae:
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
        stack: Ce(n)
      }, fp.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: Ce(n)
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
    re(Au, n._currentValue), n._currentValue = r;
  }
  function Ta(e) {
    e._currentValue = Au.current, ee(Au);
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
      } else if (d === ce.current) {
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
  var Tj = typeof AbortController < "u" ? AbortController : function() {
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
  }, Rj = t.unstable_scheduleCallback, _j = t.unstable_NormalPriority, Jt = {
    $$typeof: R,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function zu() {
    return {
      controller: new Tj(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function xi(e) {
    e.refCount--, e.refCount === 0 && Rj(_j, function() {
      e.controller.abort();
    });
  }
  var Si = null, Ou = 0, bs = 0, xs = null;
  function Mj(e, n) {
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
  function Aj(e, n) {
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
    nv = pt(), typeof n == "object" && n !== null && typeof n.then == "function" && Mj(e, n), bp !== null && bp(e, n);
  };
  var Br = k(null);
  function Lu() {
    var e = Br.current;
    return e !== null ? e : Rt.pooledCache;
  }
  function Ql(e, n) {
    n === null ? re(Br, Br.current) : re(Br, n.pool);
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
          if (e = Rt, e !== null && 100 < e.shellSuspendCounter)
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
        var ne = X.deletions;
        ne === null ? (X.deletions = [I], X.flags |= 16) : ne.push(I);
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
    function h(X, I, ne) {
      return X.index = ne, e ? (ne = X.alternate, ne !== null ? (ne = ne.index, ne < I ? (X.flags |= 67108866, I) : ne) : (X.flags |= 67108866, I)) : (X.flags |= 1048576, I);
    }
    function x(X) {
      return e && X.alternate === null && (X.flags |= 67108866), X;
    }
    function E(X, I, ne, me) {
      return I === null || I.tag !== 6 ? (I = Nu(ne, X.mode, me), I.return = X, I) : (I = d(I, ne), I.return = X, I);
    }
    function L(X, I, ne, me) {
      var Ie = ne.type;
      return Ie === C ? de(
        X,
        I,
        ne.props.children,
        me,
        ne.key
      ) : I !== null && (I.elementType === Ie || typeof Ie == "object" && Ie !== null && Ie.$$typeof === M && Ir(Ie) === I.type) ? (I = d(I, ne.props), ji(I, ne), I.return = X, I) : (I = Gl(
        ne.type,
        ne.key,
        ne.props,
        null,
        X.mode,
        me
      ), ji(I, ne), I.return = X, I);
    }
    function se(X, I, ne, me) {
      return I === null || I.tag !== 4 || I.stateNode.containerInfo !== ne.containerInfo || I.stateNode.implementation !== ne.implementation ? (I = Cu(ne, X.mode, me), I.return = X, I) : (I = d(I, ne.children || []), I.return = X, I);
    }
    function de(X, I, ne, me, Ie) {
      return I === null || I.tag !== 7 ? (I = Or(
        ne,
        X.mode,
        me,
        Ie
      ), I.return = X, I) : (I = d(I, ne), I.return = X, I);
    }
    function pe(X, I, ne) {
      if (typeof I == "string" && I !== "" || typeof I == "number" || typeof I == "bigint")
        return I = Nu(
          "" + I,
          X.mode,
          ne
        ), I.return = X, I;
      if (typeof I == "object" && I !== null) {
        switch (I.$$typeof) {
          case w:
            return ne = Gl(
              I.type,
              I.key,
              I.props,
              null,
              X.mode,
              ne
            ), ji(ne, I), ne.return = X, ne;
          case j:
            return I = Cu(
              I,
              X.mode,
              ne
            ), I.return = X, I;
          case M:
            return I = Ir(I), pe(X, I, ne);
        }
        if (ie(I) || Q(I))
          return I = Or(
            I,
            X.mode,
            ne,
            null
          ), I.return = X, I;
        if (typeof I.then == "function")
          return pe(X, Wl(I), ne);
        if (I.$$typeof === R)
          return pe(
            X,
            Xl(X, I),
            ne
          );
        eo(X, I);
      }
      return null;
    }
    function le(X, I, ne, me) {
      var Ie = I !== null ? I.key : null;
      if (typeof ne == "string" && ne !== "" || typeof ne == "number" || typeof ne == "bigint")
        return Ie !== null ? null : E(X, I, "" + ne, me);
      if (typeof ne == "object" && ne !== null) {
        switch (ne.$$typeof) {
          case w:
            return ne.key === Ie ? L(X, I, ne, me) : null;
          case j:
            return ne.key === Ie ? se(X, I, ne, me) : null;
          case M:
            return ne = Ir(ne), le(X, I, ne, me);
        }
        if (ie(ne) || Q(ne))
          return Ie !== null ? null : de(X, I, ne, me, null);
        if (typeof ne.then == "function")
          return le(
            X,
            I,
            Wl(ne),
            me
          );
        if (ne.$$typeof === R)
          return le(
            X,
            I,
            Xl(X, ne),
            me
          );
        eo(X, ne);
      }
      return null;
    }
    function oe(X, I, ne, me, Ie) {
      if (typeof me == "string" && me !== "" || typeof me == "number" || typeof me == "bigint")
        return X = X.get(ne) || null, E(I, X, "" + me, Ie);
      if (typeof me == "object" && me !== null) {
        switch (me.$$typeof) {
          case w:
            return X = X.get(
              me.key === null ? ne : me.key
            ) || null, L(I, X, me, Ie);
          case j:
            return X = X.get(
              me.key === null ? ne : me.key
            ) || null, se(I, X, me, Ie);
          case M:
            return me = Ir(me), oe(
              X,
              I,
              ne,
              me,
              Ie
            );
        }
        if (ie(me) || Q(me))
          return X = X.get(ne) || null, de(I, X, me, Ie, null);
        if (typeof me.then == "function")
          return oe(
            X,
            I,
            ne,
            Wl(me),
            Ie
          );
        if (me.$$typeof === R)
          return oe(
            X,
            I,
            ne,
            Xl(I, me),
            Ie
          );
        eo(I, me);
      }
      return null;
    }
    function ze(X, I, ne, me) {
      for (var Ie = null, ht = null, $e = I, Je = I = 0, ut = null; $e !== null && Je < ne.length; Je++) {
        $e.index > Je ? (ut = $e, $e = null) : ut = $e.sibling;
        var mt = le(
          X,
          $e,
          ne[Je],
          me
        );
        if (mt === null) {
          $e === null && ($e = ut);
          break;
        }
        e && $e && mt.alternate === null && n(X, $e), I = h(mt, I, Je), ht === null ? Ie = mt : ht.sibling = mt, ht = mt, $e = ut;
      }
      if (Je === ne.length)
        return r(X, $e), dt && Na(X, Je), Ie;
      if ($e === null) {
        for (; Je < ne.length; Je++)
          $e = pe(X, ne[Je], me), $e !== null && (I = h(
            $e,
            I,
            Je
          ), ht === null ? Ie = $e : ht.sibling = $e, ht = $e);
        return dt && Na(X, Je), Ie;
      }
      for ($e = l($e); Je < ne.length; Je++)
        ut = oe(
          $e,
          X,
          Je,
          ne[Je],
          me
        ), ut !== null && (e && ut.alternate !== null && $e.delete(
          ut.key === null ? Je : ut.key
        ), I = h(
          ut,
          I,
          Je
        ), ht === null ? Ie = ut : ht.sibling = ut, ht = ut);
      return e && $e.forEach(function(hr) {
        return n(X, hr);
      }), dt && Na(X, Je), Ie;
    }
    function qe(X, I, ne, me) {
      if (ne == null) throw Error(i(151));
      for (var Ie = null, ht = null, $e = I, Je = I = 0, ut = null, mt = ne.next(); $e !== null && !mt.done; Je++, mt = ne.next()) {
        $e.index > Je ? (ut = $e, $e = null) : ut = $e.sibling;
        var hr = le(X, $e, mt.value, me);
        if (hr === null) {
          $e === null && ($e = ut);
          break;
        }
        e && $e && hr.alternate === null && n(X, $e), I = h(hr, I, Je), ht === null ? Ie = hr : ht.sibling = hr, ht = hr, $e = ut;
      }
      if (mt.done)
        return r(X, $e), dt && Na(X, Je), Ie;
      if ($e === null) {
        for (; !mt.done; Je++, mt = ne.next())
          mt = pe(X, mt.value, me), mt !== null && (I = h(mt, I, Je), ht === null ? Ie = mt : ht.sibling = mt, ht = mt);
        return dt && Na(X, Je), Ie;
      }
      for ($e = l($e); !mt.done; Je++, mt = ne.next())
        mt = oe($e, X, Je, mt.value, me), mt !== null && (e && mt.alternate !== null && $e.delete(mt.key === null ? Je : mt.key), I = h(mt, I, Je), ht === null ? Ie = mt : ht.sibling = mt, ht = mt);
      return e && $e.forEach(function(qE) {
        return n(X, qE);
      }), dt && Na(X, Je), Ie;
    }
    function Nt(X, I, ne, me) {
      if (typeof ne == "object" && ne !== null && ne.type === C && ne.key === null && (ne = ne.props.children), typeof ne == "object" && ne !== null) {
        switch (ne.$$typeof) {
          case w:
            e: {
              for (var Ie = ne.key; I !== null; ) {
                if (I.key === Ie) {
                  if (Ie = ne.type, Ie === C) {
                    if (I.tag === 7) {
                      r(
                        X,
                        I.sibling
                      ), me = d(
                        I,
                        ne.props.children
                      ), me.return = X, X = me;
                      break e;
                    }
                  } else if (I.elementType === Ie || typeof Ie == "object" && Ie !== null && Ie.$$typeof === M && Ir(Ie) === I.type) {
                    r(
                      X,
                      I.sibling
                    ), me = d(I, ne.props), ji(me, ne), me.return = X, X = me;
                    break e;
                  }
                  r(X, I);
                  break;
                } else n(X, I);
                I = I.sibling;
              }
              ne.type === C ? (me = Or(
                ne.props.children,
                X.mode,
                me,
                ne.key
              ), me.return = X, X = me) : (me = Gl(
                ne.type,
                ne.key,
                ne.props,
                null,
                X.mode,
                me
              ), ji(me, ne), me.return = X, X = me);
            }
            return x(X);
          case j:
            e: {
              for (Ie = ne.key; I !== null; ) {
                if (I.key === Ie)
                  if (I.tag === 4 && I.stateNode.containerInfo === ne.containerInfo && I.stateNode.implementation === ne.implementation) {
                    r(
                      X,
                      I.sibling
                    ), me = d(I, ne.children || []), me.return = X, X = me;
                    break e;
                  } else {
                    r(X, I);
                    break;
                  }
                else n(X, I);
                I = I.sibling;
              }
              me = Cu(ne, X.mode, me), me.return = X, X = me;
            }
            return x(X);
          case M:
            return ne = Ir(ne), Nt(
              X,
              I,
              ne,
              me
            );
        }
        if (ie(ne))
          return ze(
            X,
            I,
            ne,
            me
          );
        if (Q(ne)) {
          if (Ie = Q(ne), typeof Ie != "function") throw Error(i(150));
          return ne = Ie.call(ne), qe(
            X,
            I,
            ne,
            me
          );
        }
        if (typeof ne.then == "function")
          return Nt(
            X,
            I,
            Wl(ne),
            me
          );
        if (ne.$$typeof === R)
          return Nt(
            X,
            I,
            Xl(X, ne),
            me
          );
        eo(X, ne);
      }
      return typeof ne == "string" && ne !== "" || typeof ne == "number" || typeof ne == "bigint" ? (ne = "" + ne, I !== null && I.tag === 6 ? (r(X, I.sibling), me = d(I, ne), me.return = X, X = me) : (r(X, I), me = Nu(ne, X.mode, me), me.return = X, X = me), x(X)) : r(X, I);
    }
    return function(X, I, ne, me) {
      try {
        wi = 0;
        var Ie = Nt(
          X,
          I,
          ne,
          me
        );
        return ws = null, Ie;
      } catch ($e) {
        if ($e === Ss || $e === Zl) throw $e;
        var ht = Ln(29, $e, null, X.mode);
        return ht.lanes = me, ht.return = X, ht;
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
      l &= e.pendingLanes, r |= l, n.lanes = r, gt(e, r);
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
      var L = E, se = L.next;
      L.next = null, x === null ? h = se : x.next = se, x = L;
      var de = e.alternate;
      de !== null && (de = de.updateQueue, E = de.lastBaseUpdate, E !== x && (E === null ? de.firstBaseUpdate = se : E.next = se, de.lastBaseUpdate = L));
    }
    if (h !== null) {
      var pe = d.baseState;
      x = 0, de = se = L = null, E = h;
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
            var Nt = r;
            switch (qe.tag) {
              case 1:
                if (ze = qe.payload, typeof ze == "function") {
                  pe = ze.call(Nt, pe, le);
                  break e;
                }
                pe = ze;
                break e;
              case 3:
                ze.flags = ze.flags & -65537 | 128;
              case 0:
                if (ze = qe.payload, le = typeof ze == "function" ? ze.call(Nt, pe, le) : ze, le == null) break e;
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
          }, de === null ? (se = de = oe, L = pe) : de = de.next = oe, x |= le;
        if (E = E.next, E === null) {
          if (E = d.shared.pending, E === null)
            break;
          oe = E, E = oe.next, oe.next = null, d.lastBaseUpdate = oe, d.shared.pending = null;
        }
      } while (!0);
      de === null && (L = pe), d.baseState = L, d.firstBaseUpdate = se, d.lastBaseUpdate = de, h === null && (d.shared.lanes = 0), ar |= x, e.lanes = x, e.memoizedState = pe;
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
    e = La, re(to, e), re(js, n), La = e | n.baseLanes;
  }
  function qu() {
    re(to, La), re(js, js.current);
  }
  function Hu() {
    La = to.current, ee(js), ee(to);
  }
  var $n = k(null), Qn = null;
  function Wa(e) {
    var n = e.alternate;
    re(Yt, Yt.current & 1), re($n, e), Qn === null && (n === null || js.current !== null || n.memoizedState !== null) && (Qn = e);
  }
  function Fu(e) {
    re(Yt, Yt.current), re($n, e), Qn === null && (Qn = e);
  }
  function Mp(e) {
    e.tag === 22 ? (re(Yt, Yt.current), re($n, e), Qn === null && (Qn = e)) : er();
  }
  function er() {
    re(Yt, Yt.current), re($n, $n.current);
  }
  function Un(e) {
    ee($n), Qn === e && (Qn = null), ee(Yt);
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
  var Ra = 0, Qe = null, jt = null, Wt = null, ao = !1, Es = !1, Hr = !1, ro = 0, Ti = 0, Ns = null, kj = 0;
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
    var n = jt !== null && jt.next !== null;
    if (Ra = 0, Wt = jt = Qe = null, ao = !1, Ti = 0, Ns = null, n) throw Error(i(300));
    e === null || en || (e = e.dependencies, e !== null && Kl(e) && (en = !0));
  }
  function kp(e, n, r, l) {
    Qe = e;
    var d = 0;
    do {
      if (Es && (Ns = null), Ti = 0, Es = !1, 25 <= d) throw Error(i(301));
      if (d += 1, Wt = jt = null, e.updateQueue != null) {
        var h = e.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      A.H = mg, h = n(r, l);
    } while (Es);
    return h;
  }
  function Dj() {
    var e = A.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? Ri(n) : n, e = e.useState()[0], (jt !== null ? jt.memoizedState : null) !== e && (Qe.flags |= 1024), n;
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
    Ra = 0, Wt = jt = Qe = null, Es = !1, Ti = ro = 0, Ns = null;
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
    if (jt === null) {
      var e = Qe.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = jt.next;
    var n = Wt === null ? Qe.memoizedState : Wt.next;
    if (n !== null)
      Wt = n, jt = e;
    else {
      if (e === null)
        throw Qe.alternate === null ? Error(i(467)) : Error(i(310));
      jt = e, e = {
        memoizedState: jt.memoizedState,
        baseState: jt.baseState,
        baseQueue: jt.baseQueue,
        queue: jt.queue,
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
    return Zu(n, jt, e);
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
      var E = x = null, L = null, se = n, de = !1;
      do {
        var pe = se.lane & -536870913;
        if (pe !== se.lane ? (ct & pe) === pe : (Ra & pe) === pe) {
          var le = se.revertLane;
          if (le === 0)
            L !== null && (L = L.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: se.action,
              hasEagerState: se.hasEagerState,
              eagerState: se.eagerState,
              next: null
            }), pe === bs && (de = !0);
          else if ((Ra & le) === le) {
            se = se.next, le === bs && (de = !0);
            continue;
          } else
            pe = {
              lane: 0,
              revertLane: se.revertLane,
              gesture: null,
              action: se.action,
              hasEagerState: se.hasEagerState,
              eagerState: se.eagerState,
              next: null
            }, L === null ? (E = L = pe, x = h) : L = L.next = pe, Qe.lanes |= le, ar |= le;
          pe = se.action, Hr && r(h, pe), h = se.hasEagerState ? se.eagerState : r(h, pe);
        } else
          le = {
            lane: pe,
            revertLane: se.revertLane,
            gesture: se.gesture,
            action: se.action,
            hasEagerState: se.hasEagerState,
            eagerState: se.eagerState,
            next: null
          }, L === null ? (E = L = le, x = h) : L = L.next = le, Qe.lanes |= pe, ar |= pe;
        se = se.next;
      } while (se !== null && se !== n);
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
      (jt || d).memoizedState,
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
      ), Rt === null) throw Error(i(349));
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
  function Bp(e, n, r, l) {
    return e.baseState = r, Zu(
      e,
      jt,
      typeof l == "function" ? l : _a
    );
  }
  function zj(e, n, r, l, d) {
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
      } catch (se) {
        ed(e, n, se);
      } finally {
        h !== null && x.types !== null && (h.types = x.types), A.T = h;
      }
    } else
      try {
        h = r(d, l), Vp(e, n, h);
      } catch (se) {
        ed(e, n, se);
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
      var r = Rt.formState;
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
    }, l.queue = d, r = zj.bind(
      null,
      Qe,
      d,
      h,
      r
    ), d.dispatch = r, l.memoizedState = e, [n, r, !1];
  }
  function Gp(e) {
    var n = Kt();
    return Yp(n, jt, e);
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
      Oj.bind(null, d, r),
      null
    )), [l, h, e];
  }
  function Oj(e, n) {
    e.action = n;
  }
  function Kp(e) {
    var n = Kt(), r = jt;
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
    jt !== null && l !== null && Pu(l, jt.memoizedState.deps) ? d.memoizedState = Cs(n, h, r, l) : (Qe.flags |= e, d.memoizedState = Cs(
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
  function Lj(e) {
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
    return Lj({ ref: n, nextImpl: e }), function() {
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
      kt(!0);
      try {
        e();
      } finally {
        kt(!1);
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
    var h = q.p;
    q.p = h !== 0 && 8 > h ? h : 8;
    var x = A.T, E = {};
    A.T = E, id(e, !1, n, r);
    try {
      var L = d(), se = A.S;
      if (se !== null && se(E, L), L !== null && typeof L == "object" && typeof L.then == "function") {
        var de = Aj(
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
      q.p = h, x !== null && E.types !== null && (x.types = E.types), A.T = x;
    }
  }
  function $j() {
  }
  function rd(e, n, r, l) {
    if (e.tag !== 5) throw Error(i(476));
    var d = ig(e).queue;
    sg(
      e,
      d,
      n,
      $,
      r === null ? $j : function() {
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
  function Uj(e) {
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
  function Bj(e, n, r) {
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
            return Fl(e, n, d, 0), Rt === null && Hl(), !1;
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
      l &= e.pendingLanes, r |= l, n.lanes = r, gt(e, r);
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
      var l = jn();
      if (r !== void 0) {
        var d = r(n);
        if (Hr) {
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
      }, l.queue = e, e = e.dispatch = Bj.bind(
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
        if (r = n(), Rt === null)
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
      var e = jn(), n = Rt.identifierPrefix;
      if (dt) {
        var r = va, l = ga;
        r = (l & ~(1 << 32 - Bt(l) - 1)).toString(32) + r, n = "_" + n + "R_" + r, r = ro++, 0 < r && (n += "H" + r.toString(32)), n += "_";
      } else
        r = kj++, n = "_" + n + "r_" + r.toString(32) + "_";
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
      return jn().memoizedState = Uj.bind(
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
        jt.memoizedState,
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
      return Bp(r, jt, e, n);
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
      return jt === null ? ad(r, e, n) : rg(
        r,
        jt.memoizedState,
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
      return jt !== null ? Bp(r, jt, e, n) : (r.baseState = e, [e, r.queue.dispatch]);
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
  function Ij(e, n, r, l, d) {
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
  function Vj(e, n, r) {
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
        if (l = Rt, l !== null && (x = z(l, r), x !== 0 && x !== h.retryLane))
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
      var se = h.context, de = r.contextType;
      x = ms, typeof de == "object" && de !== null && (x = dn(de));
      var pe = r.getDerivedStateFromProps;
      de = typeof pe == "function" || typeof h.getSnapshotBeforeUpdate == "function", E = n.pendingProps !== E, de || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (E || se !== x) && gg(
        n,
        h,
        l,
        x
      ), Qa = !1;
      var le = n.memoizedState;
      h.state = le, Ci(n, l, h, d), Ni(), se = n.memoizedState, E || le !== se || Qa ? (typeof pe == "function" && (od(
        n,
        r,
        pe,
        l
      ), se = n.memoizedState), (L = Qa || pg(
        n,
        r,
        L,
        l,
        le,
        se,
        x
      )) ? (de || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = l, n.memoizedState = se), h.props = l, h.state = se, h.context = x, l = L) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !1);
    } else {
      h = n.stateNode, Bu(e, n), x = n.memoizedProps, de = Fr(r, x), h.props = de, pe = n.pendingProps, le = h.context, se = r.contextType, L = ms, typeof se == "object" && se !== null && (L = dn(se)), E = r.getDerivedStateFromProps, (se = typeof E == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (x !== pe || le !== L) && gg(
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
      ) || e !== null && e.dependencies !== null && Kl(e.dependencies)) ? (se || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(l, oe, L), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(
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
        if (x = E.nextSibling && E.nextSibling.dataset, x) var se = x.dgst;
        x = se, l = Error(i(419)), l.stack = "", l.digest = x, bi({ value: l, source: null, stack: null }), n = vd(
          e,
          n,
          r
        );
      } else if (en || ys(e, n, r, !1), x = (r & e.childLanes) !== 0, en || x) {
        if (x = Rt, x !== null && (l = z(x, r), l !== 0 && l !== L.retryLane))
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
    return d ? (er(), E = l.fallback, d = n.mode, L = e.child, se = L.sibling, l = Ea(L, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = L.subtreeFlags & 65011712, se !== null ? E = Ea(
      se,
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
    if (E ? (x = x & 1 | 2, n.flags |= 128) : x &= 1, re(Yt, x), fn(e, n, l, r), l = dt ? yi : 0, !E && e !== null && (e.flags & 128) !== 0)
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
  function qj(e, n, r) {
    switch (n.tag) {
      case 3:
        ye(n, n.stateNode.containerInfo), Xa(n, Jt, e.memoizedState.cache), Lr();
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
        if (d = n.memoizedState, d !== null && (d.rendering = null, d.tail = null, d.lastEffect = null), re(Yt, Yt.current), l) break;
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
          return en = !1, qj(
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
              } else if (d === ae) {
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
          if (ye(
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
        ).createElement(r), l[Se] = n, l[Ee] = e, hn(l, r, e), At(l), n.stateNode = l) : n.memoizedState = Gv(
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
        return e === null && dt && ((d = l = Ot) && (l = yE(
          l,
          n.type,
          n.pendingProps,
          Xn
        ), l !== null ? (n.stateNode = l, un = n, Ot = Zn(l.firstChild), Xn = !1, d = !0) : d = !1), d || Ka(n)), lt(n), d = n.type, h = n.pendingProps, x = e !== null ? e.memoizedProps : null, l = h.children, Yd(d, h) ? l = null : x !== null && Yd(d, x) && (n.flags |= 32), n.memoizedState !== null && (d = Gu(
          e,
          n,
          Dj,
          null,
          null,
          r
        ), Gi._currentValue = d), mo(e, n), fn(e, n, l, r), n.child;
      case 6:
        return e === null && dt && ((e = r = Ot) && (r = bE(
          r,
          n.pendingProps,
          Xn
        ), r !== null ? (n.stateNode = r, un = n, Ot = null, e = !0) : e = !1), e || Ka(n)), null;
      case 13:
        return kg(e, n, r);
      case 4:
        return ye(
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
        return Vj(e, n, r);
      case 22:
        return Cg(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        return Ur(n), l = dn(Jt), e === null ? (d = Lu(), d === null && (d = Rt, h = zu(), d.pooledCache = h, h.refCount++, h !== null && (d.pooledCacheLanes |= r), d = h), n.memoizedState = { parent: l, cache: d }, Uu(n), Xa(n, Jt, d)) : ((e.lanes & r) !== 0 && (Bu(e, n), Ci(n, null, null, r), Ni()), d = e.memoizedState, h = n.memoizedState, d.parent !== l ? (d = { parent: l, cache: l }, n.memoizedState = d, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = d), Xa(n, Jt, l)) : (l = h.cache, Xa(n, Jt, l), l !== d.cache && Du(
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
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? ue() : 536870912, e.lanes |= n, Ms |= n);
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
  function Hj(e, n, r) {
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
          e = G.current, vs(n) ? pp(n) : (e = Hv(d, l, r), n.stateNode = e, Aa(n));
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
          if (h = G.current, vs(n))
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
        if (ee(Yt), l = n.memoizedState, l === null) return Lt(n), null;
        if (d = (n.flags & 128) !== 0, h = l.rendering, h === null)
          if (d) ki(l, !1);
          else {
            if (Ft !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (h = no(e), h !== null) {
                  for (n.flags |= 128, ki(l, !1), e = h.updateQueue, n.updateQueue = e, go(n, e), n.subtreeFlags = 0, e = r, r = n.child; r !== null; )
                    up(r, e), r = r.sibling;
                  return re(
                    Yt,
                    Yt.current & 1 | 2
                  ), dt && Na(n, l.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            l.tail !== null && pt() > So && (n.flags |= 128, d = !0, ki(l, !1), n.lanes = 4194304);
          }
        else {
          if (!d)
            if (e = no(h), e !== null) {
              if (n.flags |= 128, d = !0, e = e.updateQueue, n.updateQueue = e, go(n, e), ki(l, !0), l.tail === null && l.tailMode === "hidden" && !h.alternate && !dt)
                return Lt(n), null;
            } else
              2 * pt() - l.renderingStartTime > So && r !== 536870912 && (n.flags |= 128, d = !0, ki(l, !1), n.lanes = 4194304);
          l.isBackwards ? (h.sibling = n.child, n.child = h) : (e = l.last, e !== null ? e.sibling = h : n.child = h, l.last = h);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = pt(), e.sibling = null, r = Yt.current, re(
          Yt,
          d ? r & 1 | 2 : r & 1
        ), dt && Na(n, l.treeForkCount), e) : (Lt(n), null);
      case 22:
      case 23:
        return Un(n), Hu(), l = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (n.flags |= 8192) : l && (n.flags |= 8192), l ? (r & 536870912) !== 0 && (n.flags & 128) === 0 && (Lt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Lt(n), r = n.updateQueue, r !== null && go(n, r.retryQueue), r = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== r && (n.flags |= 2048), e !== null && ee(Br), null;
      case 24:
        return r = null, e !== null && (r = e.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), Ta(Jt), Lt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(i(156, n.tag));
  }
  function Fj(e, n) {
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
        return ee(Yt), null;
      case 4:
        return Ae(), null;
      case 10:
        return Ta(n.type), null;
      case 22:
      case 23:
        return Un(n), Hu(), e !== null && ee(Br), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
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
        ee(Yt);
        break;
      case 10:
        Ta(n.type);
        break;
      case 22:
      case 23:
        Un(n), Hu(), e !== null && ee(Br);
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
      bt(n, n.return, E);
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
              var L = r, se = E;
              try {
                se();
              } catch (de) {
                bt(
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
      bt(n, n.return, de);
    }
  }
  function Ug(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var r = e.stateNode;
      try {
        Rp(n, r);
      } catch (l) {
        bt(e, e.return, l);
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
      bt(e, n, l);
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
      bt(e, n, d);
    }
  }
  function ya(e, n) {
    var r = e.ref, l = e.refCleanup;
    if (r !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (d) {
          bt(e, n, d);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof r == "function")
        try {
          r(null);
        } catch (d) {
          bt(e, n, d);
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
      bt(e, e.return, d);
    }
  }
  function Sd(e, n, r) {
    try {
      var l = e.stateNode;
      fE(l, e.type, r, n), l[Ee] = n;
    } catch (d) {
      bt(e, e.return, d);
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
      bt(e, e.return, h);
    }
  }
  var ka = !1, tn = !1, Ed = !1, Hg = typeof WeakSet == "function" ? WeakSet : Set, on = null;
  function Pj(e, n) {
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
            var x = 0, E = -1, L = -1, se = 0, de = 0, pe = e, le = null;
            t: for (; ; ) {
              for (var oe; pe !== r || d !== 0 && pe.nodeType !== 3 || (E = x + d), pe !== h || l !== 0 && pe.nodeType !== 3 || (L = x + l), pe.nodeType === 3 && (x += pe.nodeValue.length), (oe = pe.firstChild) !== null; )
                le = pe, pe = oe;
              for (; ; ) {
                if (pe === e) break t;
                if (le === r && ++se === d && (E = x), le === h && ++de === l && (L = x), (oe = pe.nextSibling) !== null) break;
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
                  bt(
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
              bt(r, r.return, x);
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
              bt(
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
            bt(r, r.return, x);
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
        za(e, r), l & 4 && Kg(e, r), l & 64 && (e = r.memoizedState, e !== null && (e = e.dehydrated, e !== null && (r = eE.bind(
          null,
          r
        ), xE(e, r))));
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
    n !== null && (e.alternate = null, Pg(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && Tt(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
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
              bt(
                r,
                n,
                h
              );
            }
          else
            try {
              Ut.removeChild(r.stateNode);
            } catch (h) {
              bt(
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
        bt(n, n.return, r);
      }
    }
  }
  function Kg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Us(e);
      } catch (r) {
        bt(n, n.return, r);
      }
  }
  function Gj(e) {
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
    var r = Gj(e);
    n.forEach(function(l) {
      if (!r.has(l)) {
        r.add(l);
        var d = tE.bind(null, e, l);
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
                      )), hn(h, l, r), h[Se] = e, At(h), l = h;
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
                  h[Se] = e, At(h), l = h;
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
            bt(e, e.return, ze);
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
            bt(e, e.return, ze);
          }
        }
        break;
      case 3:
        if (zo = null, d = oa, oa = ko(n.containerInfo), Tn(n, e), oa = d, Rn(e), l & 4 && r !== null && r.memoizedState.isDehydrated)
          try {
            Us(n.containerInfo);
          } catch (ze) {
            bt(e, e.return, ze);
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
        Tn(n, e), Rn(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (xo = pt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, yo(e, l)));
        break;
      case 22:
        d = e.memoizedState !== null;
        var L = r !== null && r.memoizedState !== null, se = ka, de = tn;
        if (ka = se || d, tn = de || L, Tn(n, e), tn = de, ka = se, Rn(e), l & 8192)
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
                  bt(L, L.return, ze);
                }
              }
            } else if (n.tag === 6) {
              if (r === null) {
                L = n;
                try {
                  L.stateNode.nodeValue = d ? "" : L.memoizedProps;
                } catch (ze) {
                  bt(L, L.return, ze);
                }
              }
            } else if (n.tag === 18) {
              if (r === null) {
                L = n;
                try {
                  var oe = L.stateNode;
                  d ? Bv(oe, !0) : Bv(L.stateNode, !1);
                } catch (ze) {
                  bt(L, L.return, ze);
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
            var L = r.stateNode.containerInfo, se = wd(e);
            jd(
              e,
              se,
              L
            );
            break;
          default:
            throw Error(i(161));
        }
      } catch (de) {
        bt(e, e.return, de);
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
            } catch (se) {
              bt(l, l.return, se);
            }
          if (l = h, d = l.updateQueue, d !== null) {
            var E = l.stateNode;
            try {
              var L = d.shared.hiddenCallbacks;
              if (L !== null)
                for (d.shared.hiddenCallbacks = null, d = 0; d < L.length; d++)
                  Tp(L[d], E);
            } catch (se) {
              bt(l, l.return, se);
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
            bt(n, n.return, L);
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
      var h = e, x = n, E = r, L = l, se = x.flags;
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
          )), d && se & 2048 && Nd(
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
          ), d && se & 2048 && Cd(x.alternate, x);
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
        ), e.flags & Li && e.memoizedState !== null && kE(
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
  var Yj = {
    getCacheForType: function(e) {
      var n = dn(Jt), r = n.data.get(e);
      return r === void 0 && (r = e(), n.data.set(e, r)), r;
    },
    cacheSignal: function() {
      return dn(Jt).controller.signal;
    }
  }, Kj = typeof WeakMap == "function" ? WeakMap : Map, vt = 0, Rt = null, st = null, ct = 0, yt = 0, Bn = null, nr = !1, _s = !1, Td = !1, La = 0, Ft = 0, ar = 0, Gr = 0, Rd = 0, In = 0, Ms = 0, Ui = null, _n = null, _d = !1, xo = 0, nv = 0, So = 1 / 0, wo = null, rr = null, sn = 0, sr = null, As = null, $a = 0, Md = 0, Ad = null, av = null, Bi = 0, kd = null;
  function Vn() {
    return (vt & 2) !== 0 && ct !== 0 ? ct & -ct : A.T !== null ? Ud() : ve();
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
    (e === Rt && (yt === 2 || yt === 9) || e.cancelPendingCommit !== null) && (ks(e, 0), ir(
      e,
      ct,
      In,
      !1
    )), _e(e, r), ((vt & 2) === 0 || e !== Rt) && (e === Rt && ((vt & 2) === 0 && (Gr |= r), Ft === 4 && ir(
      e,
      ct,
      In,
      !1
    )), ba(e));
  }
  function sv(e, n, r) {
    if ((vt & 6) !== 0) throw Error(i(327));
    var l = !r && (n & 127) === 0 && (n & e.expiredLanes) === 0 || xe(e, n), d = l ? Zj(e, n) : zd(e, n, !0), h = l;
    do {
      if (d === 0) {
        _s && !l && ir(e, n, 0, !1);
        break;
      } else {
        if (r = e.current.alternate, h && !Xj(r)) {
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
          if ((n & 62914560) === n && (d = xo + 300 - pt(), 10 < d)) {
            if (ir(
              l,
              n,
              In,
              !nr
            ), ge(l, 0, !0) !== 0) break e;
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
  function iv(e, n, r, l, d, h, x, E, L, se, de, pe, le, oe) {
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
      var ze = (h & 62914560) === h ? xo - pt() : (h & 4194048) === h ? nv - pt() : 0;
      if (ze = DE(
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
        ), ir(e, h, x, !se);
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
  function Xj(e) {
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
    r !== 0 && Dt(e, r, n);
  }
  function jo() {
    return (vt & 6) === 0 ? (Ii(0), !1) : !0;
  }
  function Dd() {
    if (st !== null) {
      if (yt === 0)
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
    r !== -1 && (e.timeoutHandle = -1, pE(r)), r = e.cancelPendingCommit, r !== null && (e.cancelPendingCommit = null, r()), $a = 0, Dd(), Rt = e, st = r = Ea(e.current, null), ct = n, yt = 0, Bn = null, nr = !1, _s = xe(e, n), Td = !1, Ms = In = Rd = Gr = ar = Ft = 0, _n = Ui = null, _d = !1, (n & 8) !== 0 && (n |= n & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= n; 0 < l; ) {
        var d = 31 - Bt(l), h = 1 << d;
        n |= e[d], l &= ~h;
      }
    return La = n, Hl(), r;
  }
  function lv(e, n) {
    Qe = null, A.H = Mi, n === Ss || n === Zl ? (n = jp(), yt = 3) : n === $u ? (n = jp(), yt = 4) : yt = n === dd ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Bn = n, st === null && (Ft = 1, fo(
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
    return A.A = Yj, e;
  }
  function Eo() {
    Ft = 4, nr || (ct & 4194048) !== ct && $n.current !== null || (_s = !0), (ar & 134217727) === 0 && (Gr & 134217727) === 0 || Rt === null || ir(
      Rt,
      ct,
      In,
      !1
    );
  }
  function zd(e, n, r) {
    var l = vt;
    vt |= 2;
    var d = cv(), h = uv();
    (Rt !== e || ct !== n) && (wo = null, ks(e, n)), n = !1;
    var x = Ft;
    e: do
      try {
        if (yt !== 0 && st !== null) {
          var E = st, L = Bn;
          switch (yt) {
            case 8:
              Dd(), x = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              $n.current === null && (n = !0);
              var se = yt;
              if (yt = 0, Bn = null, Ds(e, E, L, se), r && _s) {
                x = 0;
                break e;
              }
              break;
            default:
              se = yt, yt = 0, Bn = null, Ds(e, E, L, se);
          }
        }
        Qj(), x = Ft;
        break;
      } catch (de) {
        lv(e, de);
      }
    while (!0);
    return n && e.shellSuspendCounter++, Ca = $r = null, vt = l, A.H = d, A.A = h, st === null && (Rt = null, ct = 0, Hl()), x;
  }
  function Qj() {
    for (; st !== null; ) dv(st);
  }
  function Zj(e, n) {
    var r = vt;
    vt |= 2;
    var l = cv(), d = uv();
    Rt !== e || ct !== n ? (wo = null, So = pt() + 500, ks(e, n)) : _s = xe(
      e,
      n
    );
    e: do
      try {
        if (yt !== 0 && st !== null) {
          n = st;
          var h = Bn;
          t: switch (yt) {
            case 1:
              yt = 0, Bn = null, Ds(e, n, h, 1);
              break;
            case 2:
            case 9:
              if (Sp(h)) {
                yt = 0, Bn = null, fv(n);
                break;
              }
              n = function() {
                yt !== 2 && yt !== 9 || Rt !== e || (yt = 7), ba(e);
              }, h.then(n, n);
              break e;
            case 3:
              yt = 7;
              break e;
            case 4:
              yt = 5;
              break e;
            case 7:
              Sp(h) ? (yt = 0, Bn = null, fv(n)) : (yt = 0, Bn = null, Ds(e, n, h, 7));
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
                    yt = 0, Bn = null;
                    var L = E.sibling;
                    if (L !== null) st = L;
                    else {
                      var se = E.return;
                      se !== null ? (st = se, No(se)) : st = null;
                    }
                    break t;
                  }
              }
              yt = 0, Bn = null, Ds(e, n, h, 5);
              break;
            case 6:
              yt = 0, Bn = null, Ds(e, n, h, 6);
              break;
            case 8:
              Dd(), Ft = 6;
              break e;
            default:
              throw Error(i(462));
          }
        }
        Jj();
        break;
      } catch (de) {
        lv(e, de);
      }
    while (!0);
    return Ca = $r = null, A.H = l, A.A = d, vt = r, st !== null ? 0 : (Rt = null, ct = 0, Hl(), Ft);
  }
  function Jj() {
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
      if (Ij(
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
      var r = Hj(
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
      var r = Fj(e.alternate, e);
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
      if (h = n.lanes | n.childLanes, h |= wu, Ke(
        e,
        r,
        h,
        x,
        E,
        L
      ), e === Rt && (st = Rt = null, ct = 0), As = n, sr = e, $a = r, Md = h, Ad = d, av = l, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, nE(Xe, function() {
        return bv(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || l) {
        l = A.T, A.T = null, d = q.p, q.p = 2, x = vt, vt |= 4;
        try {
          Pj(e, n, r);
        } finally {
          vt = x, q.p = d, A.T = l;
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
        var l = q.p;
        q.p = 2;
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
              var se = L.start, de = L.end;
              if (de === void 0 && (de = se), "selectionStart" in E)
                E.selectionStart = se, E.selectionEnd = Math.min(
                  de,
                  E.value.length
                );
              else {
                var pe = E.ownerDocument || document, le = pe && pe.defaultView || window;
                if (le.getSelection) {
                  var oe = le.getSelection(), ze = E.textContent.length, qe = Math.min(L.start, ze), Nt = L.end === void 0 ? qe : Math.min(L.end, ze);
                  !oe.extend && qe > Nt && (x = Nt, Nt = qe, qe = x);
                  var X = Wm(
                    E,
                    qe
                  ), I = Wm(
                    E,
                    Nt
                  );
                  if (X && I && (oe.rangeCount !== 1 || oe.anchorNode !== X.node || oe.anchorOffset !== X.offset || oe.focusNode !== I.node || oe.focusOffset !== I.offset)) {
                    var ne = pe.createRange();
                    ne.setStart(X.node, X.offset), oe.removeAllRanges(), qe > Nt ? (oe.addRange(ne), oe.extend(I.node, I.offset)) : (ne.setEnd(I.node, I.offset), oe.addRange(ne));
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
          vt = d, q.p = l, A.T = r;
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
        var l = q.p;
        q.p = 2;
        var d = vt;
        vt |= 4;
        try {
          Fg(e, n.alternate, n);
        } finally {
          vt = d, q.p = l, A.T = r;
        }
      }
      sn = 3;
    }
  }
  function vv() {
    if (sn === 4 || sn === 3) {
      sn = 0, Ye();
      var e = sr, n = As, r = $a, l = av;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? sn = 5 : (sn = 0, As = sr = null, yv(e, e.pendingLanes));
      var d = e.pendingLanes;
      if (d === 0 && (rr = null), Z(r), n = n.stateNode, Pt && typeof Pt.onCommitFiberRoot == "function")
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
        n = A.T, d = q.p, q.p = 2, A.T = null;
        try {
          for (var h = e.onRecoverableError, x = 0; x < l.length; x++) {
            var E = l[x];
            h(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          A.T = n, q.p = d;
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
    var r = Z($a), l = A.T, d = q.p;
    try {
      q.p = 32 > r ? 32 : r, A.T = null, r = Ad, Ad = null;
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
      q.p = d, A.T = l, yv(e, n);
    }
  }
  function xv(e, n, r) {
    n = Gn(r, n), n = ud(e.stateNode, n, 2), e = Ja(e, n, 2), e !== null && (_e(e, 2), ba(e));
  }
  function bt(e, n, r) {
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
      l = e.pingCache = new Kj();
      var d = /* @__PURE__ */ new Set();
      l.set(n, d);
    } else
      d = l.get(n), d === void 0 && (d = /* @__PURE__ */ new Set(), l.set(n, d));
    d.has(r) || (Td = !0, d.add(r), e = Wj.bind(null, e, n, r), n.then(e, e));
  }
  function Wj(e, n, r) {
    var l = e.pingCache;
    l !== null && l.delete(n), e.pingedLanes |= e.suspendedLanes & r, e.warmLanes &= ~r, Rt === e && (ct & r) === r && (Ft === 4 || Ft === 3 && (ct & 62914560) === ct && 300 > pt() - xo ? (vt & 2) === 0 && ks(e, 0) : Rd |= r, Ms === ct && (Ms = 0)), ba(e);
  }
  function Sv(e, n) {
    n === 0 && (n = ue()), e = zr(e, n), e !== null && (_e(e, n), ba(e));
  }
  function eE(e) {
    var n = e.memoizedState, r = 0;
    n !== null && (r = n.retryLane), Sv(e, r);
  }
  function tE(e, n) {
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
  function nE(e, n) {
    return at(e, n);
  }
  var To = null, zs = null, Ld = !1, Ro = !1, $d = !1, lr = 0;
  function ba(e) {
    e !== zs && e.next === null && (zs === null ? To = zs = e : zs = zs.next = e), Ro = !0, Ld || (Ld = !0, rE());
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
            h = ct, h = ge(
              l,
              l === Rt ? h : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (h & 3) === 0 || xe(l, h) || (r = !0, Nv(l, h));
          l = l.next;
        }
      while (r);
      $d = !1;
    }
  }
  function aE() {
    wv();
  }
  function wv() {
    Ro = Ld = !1;
    var e = 0;
    lr !== 0 && mE() && (e = lr);
    for (var n = pt(), r = null, l = To; l !== null; ) {
      var d = l.next, h = jv(l, n);
      h === 0 ? (l.next = null, r === null ? To = d : r.next = d, d === null && (zs = r)) : (r = l, (e !== 0 || (h & 3) !== 0) && (Ro = !0)), l = d;
    }
    sn !== 0 && sn !== 5 || Ii(e), lr !== 0 && (lr = 0);
  }
  function jv(e, n) {
    for (var r = e.suspendedLanes, l = e.pingedLanes, d = e.expirationTimes, h = e.pendingLanes & -62914561; 0 < h; ) {
      var x = 31 - Bt(h), E = 1 << x, L = d[x];
      L === -1 ? ((E & r) === 0 || (E & l) !== 0) && (d[x] = K(E, n)) : L <= n && (e.expiredLanes |= E), h &= ~E;
    }
    if (n = Rt, r = ct, r = ge(
      e,
      e === n ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, r === 0 || e === n && (yt === 2 || yt === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && xt(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((r & 3) === 0 || xe(e, r)) {
      if (n = r & -r, n === e.callbackPriority) return n;
      switch (l !== null && xt(l), Z(r)) {
        case 2:
        case 8:
          r = Pe;
          break;
        case 32:
          r = Xe;
          break;
        case 268435456:
          r = Ct;
          break;
        default:
          r = Xe;
      }
      return l = Ev.bind(null, e), r = at(r, l), e.callbackPriority = n, e.callbackNode = r, n;
    }
    return l !== null && l !== null && xt(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Ev(e, n) {
    if (sn !== 0 && sn !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var r = e.callbackNode;
    if (Co() && e.callbackNode !== r)
      return null;
    var l = ct;
    return l = ge(
      e,
      e === Rt ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (sv(e, l, n), jv(e, pt()), e.callbackNode != null && e.callbackNode === r ? Ev.bind(null, e) : null);
  }
  function Nv(e, n) {
    if (Co()) return null;
    sv(e, n, !0);
  }
  function rE() {
    gE(function() {
      (vt & 6) !== 0 ? at(
        ke,
        aE
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
  function sE(e, n, r, l, d) {
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
    var Id = Su[Bd], iE = Id.toLowerCase(), lE = Id[0].toUpperCase() + Id.slice(1);
    la(
      iE,
      "on" + lE
    );
  }
  la(rp, "onAnimationEnd"), la(sp, "onAnimationIteration"), la(ip, "onAnimationStart"), la("dblclick", "onDoubleClick"), la("focusin", "onFocus"), la("focusout", "onBlur"), la(jj, "onTransitionRun"), la(Ej, "onTransitionStart"), la(Nj, "onTransitionCancel"), la(lp, "onTransitionEnd"), ma("onMouseEnter", ["mouseout", "mouseover"]), ma("onMouseLeave", ["mouseout", "mouseover"]), ma("onPointerEnter", ["pointerout", "pointerover"]), ma("onPointerLeave", ["pointerout", "pointerover"]), ln(
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
  ), oE = new Set(
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
            var E = l[x], L = E.instance, se = E.currentTarget;
            if (E = E.listener, L !== h && d.isPropagationStopped())
              break e;
            h = E, d.currentTarget = se;
            try {
              h(d);
            } catch (de) {
              ql(de);
            }
            d.currentTarget = null, h = L;
          }
        else
          for (x = 0; x < l.length; x++) {
            if (E = l[x], L = E.instance, se = E.currentTarget, E = E.listener, L !== h && d.isPropagationStopped())
              break e;
            h = E, d.currentTarget = se;
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
        r !== "selectionchange" && (oE.has(r) || Vd(r, !1, e), Vd(r, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[_o] || (n[_o] = !0, Vd("selectionchange", !1, n));
    }
  }
  function _v(e, n, r, l) {
    switch (ry(n)) {
      case 2:
        var d = LE;
        break;
      case 8:
        d = $E;
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
            if (x = wt(E), x === null) return;
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
      var se = h, de = iu(r), pe = [];
      e: {
        var le = op.get(e);
        if (le !== void 0) {
          var oe = Bl, ze = e;
          switch (e) {
            case "keypress":
              if ($l(r) === 0) break e;
            case "keydown":
            case "keyup":
              oe = tj;
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
              oe = Hw;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              oe = rj;
              break;
            case rp:
            case sp:
            case ip:
              oe = Gw;
              break;
            case lp:
              oe = ij;
              break;
            case "scroll":
            case "scrollend":
              oe = Vw;
              break;
            case "wheel":
              oe = oj;
              break;
            case "copy":
            case "cut":
            case "paste":
              oe = Kw;
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
              oe = uj;
          }
          var qe = (n & 4) !== 0, Nt = !qe && (e === "scroll" || e === "scrollend"), X = qe ? le !== null ? le + "Capture" : null : le;
          qe = [];
          for (var I = se, ne; I !== null; ) {
            var me = I;
            if (ne = me.stateNode, me = me.tag, me !== 5 && me !== 26 && me !== 27 || ne === null || X === null || (me = ci(I, X), me != null && qe.push(
              qi(I, me, ne)
            )), Nt) break;
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
          if (le = e === "mouseover" || e === "pointerover", oe = e === "mouseout" || e === "pointerout", le && r !== su && (ze = r.relatedTarget || r.fromElement) && (wt(ze) || ze[Le]))
            break e;
          if ((oe || le) && (le = de.window === de ? de : (le = de.ownerDocument) ? le.defaultView || le.parentWindow : window, oe ? (ze = r.relatedTarget || r.toElement, oe = se, ze = ze ? wt(ze) : null, ze !== null && (Nt = u(ze), qe = ze.tag, ze !== Nt || qe !== 5 && qe !== 27 && qe !== 6) && (ze = null)) : (oe = null, ze = se), oe !== ze)) {
            if (qe = $m, me = "onMouseLeave", X = "onMouseEnter", I = "mouse", (e === "pointerout" || e === "pointerover") && (qe = Bm, me = "onPointerLeave", X = "onPointerEnter", I = "pointer"), Nt = oe == null ? le : rt(oe), ne = ze == null ? le : rt(ze), le = new qe(
              me,
              I + "leave",
              oe,
              r,
              de
            ), le.target = Nt, le.relatedTarget = ne, me = null, wt(de) === se && (qe = new qe(
              X,
              I + "enter",
              ze,
              r,
              de
            ), qe.target = ne, qe.relatedTarget = Nt, me = qe), Nt = me, oe && ze)
              t: {
                for (qe = cE, X = oe, I = ze, ne = 0, me = X; me; me = qe(me))
                  ne++;
                me = 0;
                for (var Ie = I; Ie; Ie = qe(Ie))
                  me++;
                for (; 0 < ne - me; )
                  X = qe(X), ne--;
                for (; 0 < me - ne; )
                  I = qe(I), me--;
                for (; ne--; ) {
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
            ), ze !== null && Nt !== null && Mv(
              pe,
              Nt,
              ze,
              qe,
              !0
            );
          }
        }
        e: {
          if (le = se ? rt(se) : window, oe = le.nodeName && le.nodeName.toLowerCase(), oe === "select" || oe === "input" && le.type === "file")
            var ht = Ym;
          else if (Pm(le))
            if (Km)
              ht = xj;
            else {
              ht = yj;
              var $e = vj;
            }
          else
            oe = le.nodeName, !oe || oe.toLowerCase() !== "input" || le.type !== "checkbox" && le.type !== "radio" ? se && ru(se.elementType) && (ht = Ym) : ht = bj;
          if (ht && (ht = ht(e, se))) {
            Gm(
              pe,
              ht,
              r,
              de
            );
            break e;
          }
          $e && $e(e, le, se), e === "focusout" && se && le.type === "number" && se.memoizedProps.value != null && au(le, "number", le.value);
        }
        switch ($e = se ? rt(se) : window, e) {
          case "focusin":
            (Pm($e) || $e.contentEditable === "true") && (ds = $e, yu = se, vi = null);
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
            if (wj) break;
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
        ut && (Im && r.locale !== "ko" && (us || ut !== "onCompositionStart" ? ut === "onCompositionEnd" && us && (Je = Om()) : (Pa = de, cu = "value" in Pa ? Pa.value : Pa.textContent, us = !0)), $e = Mo(se, ut), 0 < $e.length && (ut = new Um(
          ut,
          e,
          null,
          r,
          de
        ), pe.push({ event: ut, listeners: $e }), Je ? ut.data = Je : (Je = Fm(r), Je !== null && (ut.data = Je)))), (Je = fj ? hj(e, r) : mj(e, r)) && (ut = Mo(se, "onBeforeInput"), 0 < ut.length && ($e = new Um(
          "onBeforeInput",
          "beforeinput",
          null,
          r,
          de
        ), pe.push({
          event: $e,
          listeners: ut
        }), $e.data = Je)), sE(
          pe,
          e,
          se,
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
  function cE(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Mv(e, n, r, l, d) {
    for (var h = n._reactName, x = []; r !== null && r !== l; ) {
      var E = r, L = E.alternate, se = E.stateNode;
      if (E = E.tag, L !== null && L === l) break;
      E !== 5 && E !== 26 && E !== 27 || se === null || (L = se, d ? (se = ci(r, h), se != null && x.unshift(
        qi(r, se, L)
      )) : d || (se = ci(r, h), se != null && x.push(
        qi(r, se, L)
      ))), r = r.return;
    }
    x.length !== 0 && e.push({ event: n, listeners: x });
  }
  var uE = /\r\n?/g, dE = /\u0000|\uFFFD/g;
  function Av(e) {
    return (typeof e == "string" ? e : "" + e).replace(uE, `
`).replace(dE, "");
  }
  function kv(e, n) {
    return n = Av(n), Av(e) === n;
  }
  function Et(e, n, r, l, d, h) {
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
          typeof h == "function" && (r === "formAction" ? (n !== "input" && Et(e, n, "name", d.name, d, null), Et(
            e,
            n,
            "formEncType",
            d.formEncType,
            d,
            null
          ), Et(
            e,
            n,
            "formMethod",
            d.formMethod,
            d,
            null
          ), Et(
            e,
            n,
            "formTarget",
            d.formTarget,
            d,
            null
          )) : (Et(e, n, "encType", d.encType, d, null), Et(e, n, "method", d.method, d, null), Et(e, n, "target", d.target, d, null)));
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
        (!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (r = Bw.get(r) || r, tt(e, r, l));
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
                  Et(e, n, h, x, r, null);
              }
          }
        d && Et(e, n, "srcSet", r.srcSet, r, null), l && Et(e, n, "src", r.src, r, null);
        return;
      case "input":
        it("invalid", e);
        var E = h = x = d = null, L = null, se = null;
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
                  se = de;
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
                  Et(e, n, l, de, r, null);
              }
          }
        Rm(
          e,
          h,
          E,
          L,
          se,
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
                Et(e, n, d, E, r, null);
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
                Et(e, n, x, E, r, null);
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
                Et(e, n, L, l, r, null);
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
        for (se in r)
          if (r.hasOwnProperty(se) && (l = r[se], l != null))
            switch (se) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(i(137, n));
              default:
                Et(e, n, se, l, r, null);
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
      r.hasOwnProperty(E) && (l = r[E], l != null && Et(e, n, E, l, r, null));
  }
  function fE(e, n, r, l) {
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
        var d = null, h = null, x = null, E = null, L = null, se = null, de = null;
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
                l.hasOwnProperty(oe) || Et(e, n, oe, null, l, pe);
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
                se = oe;
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
                oe !== pe && Et(
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
          se,
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
                l.hasOwnProperty(h) || Et(
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
                h !== L && Et(
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
                Et(e, n, E, null, l, d);
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
                d !== h && Et(e, n, x, d, l, h);
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
                Et(
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
                Et(
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
          le = r[qe], r.hasOwnProperty(qe) && le != null && !l.hasOwnProperty(qe) && Et(e, n, qe, null, l, le);
        for (se in l)
          if (le = l[se], oe = r[se], l.hasOwnProperty(se) && le !== oe && (le != null || oe != null))
            switch (se) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (le != null)
                  throw Error(i(137, n));
                break;
              default:
                Et(
                  e,
                  n,
                  se,
                  le,
                  l,
                  oe
                );
            }
        return;
      default:
        if (ru(n)) {
          for (var Nt in r)
            le = r[Nt], r.hasOwnProperty(Nt) && le !== void 0 && !l.hasOwnProperty(Nt) && Fd(
              e,
              n,
              Nt,
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
      le = r[X], r.hasOwnProperty(X) && le != null && !l.hasOwnProperty(X) && Et(e, n, X, null, l, le);
    for (pe in l)
      le = l[pe], oe = r[pe], !l.hasOwnProperty(pe) || le === oe || le == null && oe == null || Et(e, n, pe, le, l, oe);
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
  function hE() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, r = performance.getEntriesByType("resource"), l = 0; l < r.length; l++) {
        var d = r[l], h = d.transferSize, x = d.initiatorType, E = d.duration;
        if (h && E && Dv(x)) {
          for (x = 0, E = d.responseEnd, l += 1; l < r.length; l++) {
            var L = r[l], se = L.startTime;
            if (se > E) break;
            var de = L.transferSize, pe = L.initiatorType;
            de && Dv(pe) && (L = L.responseEnd, x += de * (L < E ? 1 : (E - se) / (L - se)));
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
  function mE() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Kd ? !1 : (Kd = e, !0) : (Kd = null, !1);
  }
  var Lv = typeof setTimeout == "function" ? setTimeout : void 0, pE = typeof clearTimeout == "function" ? clearTimeout : void 0, $v = typeof Promise == "function" ? Promise : void 0, gE = typeof queueMicrotask == "function" ? queueMicrotask : typeof $v < "u" ? function(e) {
    return $v.resolve(null).then(e).catch(vE);
  } : Lv;
  function vE(e) {
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
          Xd(r), Tt(r);
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
  function yE(e, n, r, l) {
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
  function bE(e, n, r) {
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
  function xE(e, n) {
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
    Tt(e);
  }
  var Jn = /* @__PURE__ */ new Map(), Fv = /* @__PURE__ */ new Set();
  function ko(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Ua = q.d;
  q.d = {
    f: SE,
    r: wE,
    D: jE,
    C: EE,
    L: NE,
    m: CE,
    X: RE,
    S: TE,
    M: _E
  };
  function SE() {
    var e = Ua.f(), n = jo();
    return e || n;
  }
  function wE(e) {
    var n = $t(e);
    n !== null && n.tag === 5 && n.type === "form" ? lg(n) : Ua.r(e);
  }
  var Os = typeof document > "u" ? null : document;
  function Pv(e, n, r) {
    var l = Os;
    if (l && typeof n == "string" && n) {
      var d = Fn(n);
      d = 'link[rel="' + e + '"][href="' + d + '"]', typeof r == "string" && (d += '[crossorigin="' + r + '"]'), Fv.has(d) || (Fv.add(d), e = { rel: e, crossOrigin: r, href: n }, l.querySelector(d) === null && (n = l.createElement("link"), hn(n, "link", e), At(n), l.head.appendChild(n)));
    }
  }
  function jE(e) {
    Ua.D(e), Pv("dns-prefetch", e, null);
  }
  function EE(e, n) {
    Ua.C(e, n), Pv("preconnect", e, n);
  }
  function NE(e, n, r) {
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
      ), Jn.set(h, e), l.querySelector(d) !== null || n === "style" && l.querySelector(Fi(h)) || n === "script" && l.querySelector(Pi(h)) || (n = l.createElement("link"), hn(n, "link", e), At(n), l.head.appendChild(n)));
    }
  }
  function CE(e, n) {
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
        l = r.createElement("link"), hn(l, "link", e), At(l), r.head.appendChild(l);
      }
    }
  }
  function TE(e, n, r) {
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
          At(L), hn(L, "link", e), L._p = new Promise(function(se, de) {
            L.onload = se, L.onerror = de;
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
  function RE(e, n) {
    Ua.X(e, n);
    var r = Os;
    if (r && e) {
      var l = Qt(r).hoistableScripts, d = $s(e), h = l.get(d);
      h || (h = r.querySelector(Pi(d)), h || (e = v({ src: e, async: !0 }, n), (n = Jn.get(d)) && ef(e, n), h = r.createElement("script"), At(h), hn(h, "link", e), r.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(d, h));
    }
  }
  function _E(e, n) {
    Ua.M(e, n);
    var r = Os;
    if (r && e) {
      var l = Qt(r).hoistableScripts, d = $s(e), h = l.get(d);
      h || (h = r.querySelector(Pi(d)), h || (e = v({ src: e, async: !0, type: "module" }, n), (n = Jn.get(d)) && ef(e, n), h = r.createElement("script"), At(h), hn(h, "link", e), r.head.appendChild(h)), h = {
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
          }, Jn.set(e, r), h || ME(
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
  function ME(e, n, r, l) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? l.loading = 1 : (n = e.createElement("link"), l.preload = n, n.addEventListener("load", function() {
      return l.loading |= 1;
    }), n.addEventListener("error", function() {
      return l.loading |= 2;
    }), hn(n, "link", r), At(n), e.head.appendChild(n));
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
            return n.instance = l, At(l), l;
          var d = v({}, r, {
            "data-href": r.href,
            "data-precedence": r.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), At(l), hn(l, "style", d), Do(l, r.precedence, e), n.instance = l;
        case "stylesheet":
          d = Ls(r.href);
          var h = e.querySelector(
            Fi(d)
          );
          if (h)
            return n.state.loading |= 4, n.instance = h, At(h), h;
          l = Yv(r), (d = Jn.get(d)) && Wd(l, d), h = (e.ownerDocument || e).createElement("link"), At(h);
          var x = h;
          return x._p = new Promise(function(E, L) {
            x.onload = E, x.onerror = L;
          }), hn(h, "link", l), n.state.loading |= 4, Do(h, r.precedence, e), n.instance = h;
        case "script":
          return h = $s(r.src), (d = e.querySelector(
            Pi(h)
          )) ? (n.instance = d, At(d), d) : (l = r, (d = Jn.get(h)) && (l = v({}, r), ef(l, d)), e = e.ownerDocument || e, d = e.createElement("script"), At(d), hn(d, "link", l), e.head.appendChild(d), n.instance = d);
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
  function AE(e, n, r) {
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
  function kE(e, n, r, l) {
    if (r.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (r.state.loading & 4) === 0) {
      if (r.instance === null) {
        var d = Ls(l.href), h = n.querySelector(
          Fi(d)
        );
        if (h) {
          n = h._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = Oo.bind(e), n.then(e, e)), r.state.loading |= 4, r.instance = h, At(h);
          return;
        }
        h = n.ownerDocument || n, l = Yv(l), (d = Jn.get(d)) && Wd(l, d), h = h.createElement("link"), At(h);
        var x = h;
        x._p = new Promise(function(E, L) {
          x.onload = E, x.onerror = L;
        }), hn(h, "link", l), r.instance = h;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(r, n), (n = r.state.preload) && (r.state.loading & 3) === 0 && (e.count++, r = Oo.bind(e), n.addEventListener("load", r), n.addEventListener("error", r));
    }
  }
  var tf = 0;
  function DE(e, n) {
    return e.stylesheets && e.count === 0 && $o(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(r) {
      var l = setTimeout(function() {
        if (e.stylesheets && $o(e, e.stylesheets), e.unsuspend) {
          var h = e.unsuspend;
          e.unsuspend = null, h();
        }
      }, 6e4 + n);
      0 < e.imgBytes && tf === 0 && (tf = 62500 * hE());
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
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Lo = /* @__PURE__ */ new Map(), n.forEach(zE, e), Lo = null, Oo.call(e));
  }
  function zE(e, n) {
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
  function OE(e, n, r, l, d, h, x, E, L) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Re(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Re(0), this.hiddenUpdates = Re(null), this.identifierPrefix = l, this.onUncaughtError = d, this.onCaughtError = h, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = L, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Jv(e, n, r, l, d, h, x, E, L, se, de, pe) {
    return e = new OE(
      e,
      n,
      r,
      x,
      L,
      se,
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
      n = F(n);
      var r = zr(e, n);
      r !== null && Mn(r, e, n), nf(e, n);
    }
  }
  var Uo = !0;
  function LE(e, n, r, l) {
    var d = A.T;
    A.T = null;
    var h = q.p;
    try {
      q.p = 2, af(e, n, r, l);
    } finally {
      q.p = h, A.T = d;
    }
  }
  function $E(e, n, r, l) {
    var d = A.T;
    A.T = null;
    var h = q.p;
    try {
      q.p = 8, af(e, n, r, l);
    } finally {
      q.p = h, A.T = d;
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
      else if (BE(
        d,
        e,
        n,
        r,
        l
      ))
        l.stopPropagation();
      else if (sy(e, l), n & 4 && -1 < UE.indexOf(e)) {
        for (; d !== null; ) {
          var h = $t(d);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (h = h.stateNode, h.current.memoizedState.isDehydrated) {
                  var x = Te(h.pendingLanes);
                  if (x !== 0) {
                    var E = h;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; x; ) {
                      var L = 1 << 31 - Bt(x);
                      E.entanglements[1] |= L, x &= ~L;
                    }
                    ba(h), (vt & 6) === 0 && (So = pt() + 500, Ii(0));
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
    if (Bo = null, e = wt(e), e !== null) {
      var n = u(e);
      if (n === null) e = null;
      else {
        var r = n.tag;
        if (r === 13) {
          if (e = f(n), e !== null) return e;
          e = null;
        } else if (r === 31) {
          if (e = p(n), e !== null) return e;
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
          case St:
            return 32;
          case Ct:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var lf = !1, cr = null, ur = null, dr = null, Yi = /* @__PURE__ */ new Map(), Ki = /* @__PURE__ */ new Map(), fr = [], UE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
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
  function BE(e, n, r, l, d) {
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
    var n = wt(e.target);
    if (n !== null) {
      var r = u(n);
      if (r !== null) {
        if (n = r.tag, n === 13) {
          if (n = f(r), n !== null) {
            e.blockedOn = n, be(e.priority, function() {
              ay(r);
            });
            return;
          }
        } else if (n === 31) {
          if (n = p(r), n !== null) {
            e.blockedOn = n, be(e.priority, function() {
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
  function IE() {
    lf = !1, cr !== null && Io(cr) && (cr = null), ur !== null && Io(ur) && (ur = null), dr !== null && Io(dr) && (dr = null), Yi.forEach(ly), Ki.forEach(ly);
  }
  function Vo(e, n) {
    e.blockedOn === n && (e.blockedOn = null, lf || (lf = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      IE
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
      var n = ve();
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
  q.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
    return e = m(n), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var VE = {
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
          VE
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
    ), n.context = Wv(null), r = n.current, l = Vn(), l = F(l), d = Za(l), d.callback = null, Ja(r, d, l), r = l, n.current.lanes = r, _e(n, r), ba(n), e[Le] = n.current, qd(e), new Ho(n);
  }, Zi.version = "19.2.5", Zi;
}
var xy;
function JE() {
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
  return t(), df.exports = ZE(), df.exports;
}
var WE = JE();
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
var Kx = (t) => {
  throw TypeError(t);
}, eN = (t, a, s) => a.has(t) || Kx("Cannot " + s), pf = (t, a, s) => (eN(t, a, "read from private field"), s ? s.call(t) : a.get(t)), tN = (t, a, s) => a.has(t) ? Kx("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, s);
function Sy(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function nN(t = {}) {
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
  ), f = "POP", p = null;
  function y(w) {
    return Math.min(Math.max(w, 0), o.length - 1);
  }
  function m() {
    return o[u];
  }
  function b(w, j = null, C, _) {
    let T = nh(
      o ? m().pathname : "/",
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
      return m();
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
      u += 1, o.splice(u, o.length, C), i && p && p({ action: f, location: C, delta: 1 });
    },
    replace(w, j) {
      f = "REPLACE";
      let C = Sy(w) ? w : b(w, j);
      o[u] = C, i && p && p({ action: f, location: C, delta: 0 });
    },
    go(w) {
      f = "POP";
      let j = y(u + w), C = o[j];
      u = j, p && p({ action: f, location: C, delta: w });
    },
    listen(w) {
      return p = w, () => {
        p = null;
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
function aN() {
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
    key: a && a.key || i || aN(),
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
function rN(t, a = !1) {
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
    if (tN(this, cl, /* @__PURE__ */ new Map()), t)
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
var sN = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function iN(t) {
  return sN.has(
    t
  );
}
var lN = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function oN(t) {
  return lN.has(
    t
  );
}
function cN(t) {
  return t.index === !0;
}
function gl(t, a, s = [], i = {}, o = !1) {
  return t.map((u, f) => {
    let p = [...s, String(f)], y = typeof u.id == "string" ? u.id : p.join("-");
    if (nt(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), nt(
      o || !i[y],
      `Found a route id collision on id "${y}".  Route id's must be globally unique within Data Router usages`
    ), cN(u)) {
      let m = {
        ...u,
        id: y
      };
      return i[y] = jy(
        m,
        a(m)
      ), m;
    } else {
      let m = {
        ...u,
        id: y,
        children: void 0
      };
      return i[y] = jy(
        m,
        a(m)
      ), u.children && (m.children = gl(
        u.children,
        a,
        p,
        i,
        o
      )), m;
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
  let f = Xx(t);
  dN(f);
  let p = null;
  for (let y = 0; p == null && y < f.length; ++y) {
    let m = wN(u);
    p = xN(
      f[y],
      m,
      i
    );
  }
  return p;
}
function uN(t, a) {
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
function Xx(t, a = [], s = [], i = "", o = !1) {
  let u = (f, p, y = o, m) => {
    let b = {
      relativePath: m === void 0 ? f.path || "" : m,
      caseSensitive: f.caseSensitive === !0,
      childrenIndex: p,
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
    ), Xx(
      f.children,
      a,
      S,
      v,
      y
    )), !(f.path == null && !f.index) && a.push({
      path: v,
      score: yN(v, f.index),
      routesMeta: S
    });
  };
  return t.forEach((f, p) => {
    if (f.path === "" || !f.path?.includes("?"))
      u(f, p);
    else
      for (let y of Qx(f.path))
        u(f, p, !0, y);
  }), a;
}
function Qx(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [s, ...i] = a, o = s.endsWith("?"), u = s.replace(/\?$/, "");
  if (i.length === 0)
    return o ? [u, ""] : [u];
  let f = Qx(i.join("/")), p = [];
  return p.push(
    ...f.map(
      (y) => y === "" ? u : [u, y].join("/")
    )
  ), o && p.push(...f), p.map(
    (y) => t.startsWith("/") && y === "" ? "/" : y
  );
}
function dN(t) {
  t.sort(
    (a, s) => a.score !== s.score ? s.score - a.score : bN(
      a.routesMeta.map((i) => i.childrenIndex),
      s.routesMeta.map((i) => i.childrenIndex)
    )
  );
}
var fN = /^:[\w-]+$/, hN = 3, mN = 2, pN = 1, gN = 10, vN = -2, Ey = (t) => t === "*";
function yN(t, a) {
  let s = t.split("/"), i = s.length;
  return s.some(Ey) && (i += vN), a && (i += mN), s.filter((o) => !Ey(o)).reduce(
    (o, u) => o + (fN.test(u) ? hN : u === "" ? pN : gN),
    i
  );
}
function bN(t, a) {
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
function xN(t, a, s = !1) {
  let { routesMeta: i } = t, o = {}, u = "/", f = [];
  for (let p = 0; p < i.length; ++p) {
    let y = i[p], m = p === i.length - 1, b = u === "/" ? a : a.slice(u.length) || "/", v = Nc(
      { path: y.relativePath, caseSensitive: y.caseSensitive, end: m },
      b
    ), S = y.route;
    if (!v && m && s && !i[i.length - 1].route.index && (v = Nc(
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
      pathnameBase: NN(
        ea([u, v.pathnameBase])
      ),
      route: S
    }), v.pathnameBase !== "/" && (u = ea([u, v.pathnameBase]));
  }
  return f;
}
function Nc(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [s, i] = SN(
    t.path,
    t.caseSensitive,
    t.end
  ), o = a.match(s);
  if (!o) return null;
  let u = o[0], f = u.replace(/(.)\/+$/, "$1"), p = o.slice(1);
  return {
    params: i.reduce(
      (m, { paramName: b, isOptional: v }, S) => {
        if (b === "*") {
          let j = p[S] || "";
          f = u.slice(0, u.length - j.length).replace(/(.)\/+$/, "$1");
        }
        const w = p[S];
        return v && !w ? m[b] = void 0 : m[b] = (w || "").replace(/%2F/g, "/"), m;
      },
      {}
    ),
    pathname: u,
    pathnameBase: f,
    pattern: t
  };
}
function SN(t, a = !1, s = !0) {
  Xt(
    t === "*" || !t.endsWith("*") || t.endsWith("/*"),
    `Route path "${t}" will be treated as if it were "${t.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/, "/*")}".`
  );
  let i = [], o = "^" + t.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (f, p, y, m, b) => {
      if (i.push({ paramName: p, isOptional: y != null }), y) {
        let v = b.charAt(m + f.length);
        return v && v !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return t.endsWith("*") ? (i.push({ paramName: "*" }), o += t === "*" || t === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : s ? o += "\\/*$" : t !== "" && t !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, a ? void 0 : "i"), i];
}
function wN(t) {
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
function jN({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : ea([t, a]);
}
var Zx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, $h = (t) => Zx.test(t);
function EN(t, a = "/") {
  let {
    pathname: s,
    search: i = "",
    hash: o = ""
  } = typeof t == "string" ? fa(t) : t, u;
  return s ? (s = Bh(s), s.startsWith("/") ? u = Ny(s.substring(1), "/") : u = Ny(s, a)) : u = a, {
    pathname: u,
    search: CN(i),
    hash: TN(o)
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
function Jx(t) {
  return t.filter(
    (a, s) => s === 0 || a.route.path && a.route.path.length > 0
  );
}
function Uh(t) {
  let a = Jx(t);
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
  let u = t === "" || o.pathname === "", f = u ? "/" : o.pathname, p;
  if (f == null)
    p = s;
  else {
    let v = a.length - 1;
    if (!i && f.startsWith("..")) {
      let S = f.split("/");
      for (; S[0] === ".."; )
        S.shift(), v -= 1;
      o.pathname = S.join("/");
    }
    p = v >= 0 ? a[v] : "/";
  }
  let y = EN(o, p), m = f && f !== "/" && f.endsWith("/"), b = (u || f === ".") && s.endsWith("/");
  return !y.pathname.endsWith("/") && (m || b) && (y.pathname += "/"), y;
}
var Bh = (t) => t.replace(/\/\/+/g, "/"), ea = (t) => Bh(t.join("/")), Cc = (t) => t.replace(/\/+$/, ""), NN = (t) => Cc(t).replace(/^\/*/, "/"), CN = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, TN = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, RN = (t, a = 302) => {
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
var Wx = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function e1(t, a) {
  let s = t;
  if (typeof s != "string" || !Zx.test(s))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: s
    };
  let i = s, o = !1;
  if (Wx)
    try {
      let u = new URL(window.location.href), f = s.startsWith("//") ? new URL(u.protocol + s) : new URL(s), p = aa(f.pathname, a);
      f.origin === u.origin && p != null ? s = p + f.search + f.hash : o = !0;
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
function _N(t, a) {
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
        for (let p of f)
          u[p] && s[p].push(u[p]);
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
      let f = o[u], p = s[`lazy.${u}`];
      if (typeof f == "function" && p.length > 0) {
        let y = Gs(p, f, () => {
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
      let f = u[wr] ?? u, p = Gs(
        s[o],
        f,
        (...y) => Cy(y[0])
      );
      p && (o === "loader" && f.hydrate === !0 && (p.hydrate = !0), p[wr] = f, i[o] = p);
    }
  }), a.middleware && a.middleware.length > 0 && s.middleware.length > 0 && (i.middleware = a.middleware.map((o) => {
    let u = o[wr] ?? o, f = Gs(
      s.middleware,
      u,
      (...p) => Cy(p[0])
    );
    return f ? (f[wr] = u, f) : o;
  })), i;
}
function MN(t, a) {
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
        let [f, p] = u;
        return {
          to: typeof f == "number" || typeof f == "string" ? f : f ? Sa(f) : ".",
          ...Ty(t, p ?? {})
        };
      }
    );
    o && (o[wr] = i, t.navigate = o);
  }
  if (s.fetch.length > 0) {
    let i = t.fetch[wr] ?? t.fetch, o = Gs(s.fetch, i, (...u) => {
      let [f, , p, y] = u;
      return {
        href: p ?? ".",
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
    let o = await t1(
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
async function t1(t, a, s, i) {
  let o = t[i], u;
  if (o) {
    let f, p = async () => (f ? console.error("You cannot call instrumented handlers more than once") : f = t1(t, a, s, i - 1), u = await f, nt(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
    try {
      await o(p, a);
    } catch (y) {
      console.error("An instrumentation function threw an error:", y);
    }
    f || await p(), await f;
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
    request: AN(a),
    params: { ...i },
    unstable_pattern: o,
    context: kN(s)
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
function AN(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function kN(t) {
  if (zN(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var DN = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function zN(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === DN;
}
var n1 = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], ON = new Set(
  n1
), LN = [
  "GET",
  ...n1
], $N = new Set(LN), a1 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), UN = /* @__PURE__ */ new Set([307, 308]), vf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, BN = {
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
}, IN = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), r1 = "remix-router-transitions", s1 = Symbol("ResetLoaderData");
function VN(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, s = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  nt(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let i = t.hydrationRouteProperties || [], o = t.mapRouteProperties || IN, u = o;
  if (t.unstable_instrumentations) {
    let z = t.unstable_instrumentations;
    u = (F) => ({
      ...o(F),
      ..._N(
        z.map((Z) => Z.route).filter(Boolean),
        F
      )
    });
  }
  let f = {}, p = gl(
    t.routes,
    u,
    void 0,
    f
  ), y, m = t.basename || "/";
  m.startsWith("/") || (m = `/${m}`);
  let b = t.dataStrategy || GN, v = {
    unstable_passThroughRequests: !1,
    ...t.future
  }, S = null, w = /* @__PURE__ */ new Set(), j = null, C = null, _ = null, T = t.hydrationData != null, O = xr(p, t.history.location, m), R = !1, N = null, U, Y;
  if (O == null && !t.patchRoutesOnNavigation) {
    let z = Wn(404, {
      pathname: t.history.location.pathname
    }), { matches: F, route: Z } = Po(p);
    U = !0, Y = !U, O = F, N = { [Z.id]: z };
  } else if (O && !t.hydrationData && Re(
    O,
    p,
    t.history.location.pathname
  ).active && (O = null), O)
    if (O.some((z) => z.route.lazy))
      U = !1, Y = !U;
    else if (!O.some((z) => Ih(z.route)))
      U = !0, Y = !U;
    else {
      let z = t.hydrationData ? t.hydrationData.loaderData : null, F = t.hydrationData ? t.hydrationData.errors : null, Z = O;
      if (F) {
        let ve = O.findIndex(
          (be) => F[be.route.id] !== void 0
        );
        Z = Z.slice(0, ve + 1);
      }
      Y = !1, U = !0, Z.forEach((ve) => {
        let be = i1(ve.route, z, F);
        Y = Y || be.renderFallback, U = U && !be.shouldLoad;
      });
    }
  else {
    U = !1, Y = !U, O = [];
    let z = Re(
      null,
      p,
      t.history.location.pathname
    );
    z.active && z.matches && (R = !0, O = z.matches);
  }
  let ae, M = {
    historyAction: t.history.action,
    location: t.history.location,
    matches: O,
    initialized: U,
    renderFallback: Y,
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
  }, V = "POP", D = null, H = !1, Q, J = !1, P = /* @__PURE__ */ new Map(), ie = null, A = !1, q = !1, $ = /* @__PURE__ */ new Set(), te = /* @__PURE__ */ new Map(), fe = 0, k = -1, ee = /* @__PURE__ */ new Map(), re = /* @__PURE__ */ new Set(), G = /* @__PURE__ */ new Map(), B = /* @__PURE__ */ new Map(), W = /* @__PURE__ */ new Set(), ce = /* @__PURE__ */ new Map(), ye, Ae = null;
  function lt() {
    if (S = t.history.listen(
      ({ action: z, location: F, delta: Z }) => {
        if (ye) {
          ye(), ye = void 0;
          return;
        }
        Xt(
          ce.size === 0 || Z != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ve = he({
          currentLocation: M.location,
          nextLocation: F,
          historyAction: z
        });
        if (ve && Z != null) {
          let be = new Promise((De) => {
            ye = De;
          });
          t.history.go(Z * -1), It(ve, {
            state: "blocked",
            location: F,
            proceed() {
              It(ve, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: F
              }), be.then(() => t.history.go(Z));
            },
            reset() {
              let De = new Map(M.blockers);
              De.set(ve, Ji), Be({ blockers: De });
            }
          }), D?.resolve(), D = null;
          return;
        }
        return Mt(z, F);
      }
    ), s) {
      uC(a, P);
      let z = () => dC(a, P);
      a.addEventListener("pagehide", z), ie = () => a.removeEventListener("pagehide", z);
    }
    return M.initialized || Mt("POP", M.location, {
      initialHydration: !0
    }), ae;
  }
  function Ne() {
    S && S(), ie && ie(), w.clear(), Q && Q.abort(), M.fetchers.forEach((z, F) => pn(F)), M.blockers.forEach((z, F) => En(F));
  }
  function We(z) {
    return w.add(z), () => w.delete(z);
  }
  function Be(z, F = {}) {
    z.matches && (z.matches = z.matches.map((be) => {
      let De = f[be.route.id], Se = be.route;
      return Se.element !== De.element || Se.errorElement !== De.errorElement || Se.hydrateFallbackElement !== De.hydrateFallbackElement ? {
        ...be,
        route: De
      } : be;
    })), M = {
      ...M,
      ...z
    };
    let Z = [], ve = [];
    M.fetchers.forEach((be, De) => {
      be.state === "idle" && (W.has(De) ? Z.push(De) : ve.push(De));
    }), W.forEach((be) => {
      !M.fetchers.has(be) && !te.has(be) && Z.push(be);
    }), [...w].forEach(
      (be) => be(M, {
        deletedFetchers: Z,
        newErrors: z.errors ?? null,
        viewTransitionOpts: F.viewTransitionOpts,
        flushSync: F.flushSync === !0
      })
    ), Z.forEach((be) => pn(be)), ve.forEach((be) => M.fetchers.delete(be));
  }
  function Fe(z, F, { flushSync: Z } = {}) {
    let ve = M.actionData != null && M.navigation.formMethod != null && bn(M.navigation.formMethod) && M.navigation.state === "loading" && z.state?._isRedirect !== !0, be;
    F.actionData ? Object.keys(F.actionData).length > 0 ? be = F.actionData : be = null : ve ? be = M.actionData : be = null;
    let De = F.loaderData ? Uy(
      M.loaderData,
      F.loaderData,
      F.matches || [],
      F.errors
    ) : M.loaderData, Se = M.blockers;
    Se.size > 0 && (Se = new Map(Se), Se.forEach((Ve, Ue) => Se.set(Ue, Ji)));
    let Ee = A ? !1 : ue(z, F.matches || M.matches), Le = H === !0 || M.navigation.formMethod != null && bn(M.navigation.formMethod) && z.state?._isRedirect !== !0;
    y && (p = y, y = void 0), A || V === "POP" || (V === "PUSH" ? t.history.push(z, z.state) : V === "REPLACE" && t.history.replace(z, z.state));
    let Me;
    if (V === "POP") {
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
        ...F,
        // matches, errors, fetchers go through as-is
        actionData: be,
        loaderData: De,
        historyAction: V,
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
        flushSync: Z === !0
      }
    ), V = "POP", H = !1, J = !1, A = !1, q = !1, D?.resolve(), D = null, Ae?.resolve(), Ae = null;
  }
  async function rn(z, F) {
    if (D?.resolve(), D = null, typeof z == "number") {
      D || (D = qy());
      let Tt = D.promise;
      return t.history.go(z), Tt;
    }
    let Z = ah(
      M.location,
      M.matches,
      m,
      z,
      F?.fromRouteId,
      F?.relative
    ), { path: ve, submission: be, error: De } = Ry(
      !1,
      Z,
      F
    ), Se;
    F?.unstable_mask && (Se = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof F.unstable_mask == "string" ? fa(F.unstable_mask) : {
        ...M.location.unstable_mask,
        ...F.unstable_mask
      }
    });
    let Ee = M.location, Le = nh(
      Ee,
      ve,
      F && F.state,
      void 0,
      Se
    );
    Le = {
      ...Le,
      ...t.history.encodeLocation(Le)
    };
    let Me = F && F.replace != null ? F.replace : void 0, Ve = "PUSH";
    Me === !0 ? Ve = "REPLACE" : Me === !1 || be != null && bn(be.formMethod) && be.formAction === M.location.pathname + M.location.search && (Ve = "REPLACE");
    let Ue = F && "preventScrollReset" in F ? F.preventScrollReset === !0 : void 0, ft = (F && F.flushSync) === !0, et = he({
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
          }), rn(z, F);
        },
        reset() {
          let Tt = new Map(M.blockers);
          Tt.set(et, Ji), Be({ blockers: Tt });
        }
      });
      return;
    }
    await Mt(Ve, Le, {
      submission: be,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: De,
      preventScrollReset: Ue,
      replace: F && F.replace,
      enableViewTransition: F && F.viewTransition,
      flushSync: ft,
      callSiteDefaultShouldRevalidate: F && F.unstable_defaultShouldRevalidate
    });
  }
  function qt() {
    Ae || (Ae = qy()), Xe(), Be({ revalidation: "loading" });
    let z = Ae.promise;
    return M.navigation.state === "submitting" ? z : M.navigation.state === "idle" ? (Mt(M.historyAction, M.location, {
      startUninterruptedRevalidation: !0
    }), z) : (Mt(
      V || M.historyAction,
      M.navigation.location,
      {
        overrideNavigation: M.navigation,
        // Proxy through any rending view transition
        enableViewTransition: J === !0
      }
    ), z);
  }
  async function Mt(z, F, Z) {
    Q && Q.abort(), Q = null, V = z, A = (Z && Z.startUninterruptedRevalidation) === !0, K(M.location, M.matches), H = (Z && Z.preventScrollReset) === !0, J = (Z && Z.enableViewTransition) === !0;
    let ve = y || p, be = Z && Z.overrideNavigation, De = Z?.initialHydration && M.matches && M.matches.length > 0 && !R ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      M.matches
    ) : xr(ve, F, m), Se = (Z && Z.flushSync) === !0;
    if (De && M.initialized && !q && eC(M.location, F) && !(Z && Z.submission && bn(Z.submission.formMethod))) {
      Fe(F, { matches: De }, { flushSync: Se });
      return;
    }
    let Ee = Re(De, ve, F.pathname);
    if (Ee.active && Ee.matches && (De = Ee.matches), !De) {
      let { error: wt, notFoundMatches: $t, route: rt } = Te(
        F.pathname
      );
      Fe(
        F,
        {
          matches: $t,
          loaderData: {},
          errors: {
            [rt.id]: wt
          }
        },
        { flushSync: Se }
      );
      return;
    }
    Q = new AbortController();
    let Le = Hs(
      t.history,
      F,
      Q.signal,
      Z && Z.submission
    ), Me = t.getContext ? await t.getContext() : new wy(), Ve;
    if (Z && Z.pendingError)
      Ve = [
        Sr(De).route.id,
        { type: "error", error: Z.pendingError }
      ];
    else if (Z && Z.submission && bn(Z.submission.formMethod)) {
      let wt = await Ce(
        Le,
        F,
        Z.submission,
        De,
        Me,
        Ee.active,
        Z && Z.initialHydration === !0,
        { replace: Z.replace, flushSync: Se }
      );
      if (wt.shortCircuited)
        return;
      if (wt.pendingActionResult) {
        let [$t, rt] = wt.pendingActionResult;
        if (qn(rt) && vl(rt.error) && rt.error.status === 404) {
          Q = null, Fe(F, {
            matches: wt.matches,
            loaderData: {},
            errors: {
              [$t]: rt.error
            }
          });
          return;
        }
      }
      De = wt.matches || De, Ve = wt.pendingActionResult, be = yf(F, Z.submission), Se = !1, Ee.active = !1, Le = Hs(
        t.history,
        Le.url,
        Le.signal
      );
    }
    let {
      shortCircuited: Ue,
      matches: ft,
      loaderData: et,
      errors: Tt
    } = await He(
      Le,
      F,
      De,
      Me,
      Ee.active,
      be,
      Z && Z.submission,
      Z && Z.fetcherSubmission,
      Z && Z.replace,
      Z && Z.initialHydration === !0,
      Se,
      Ve,
      Z && Z.callSiteDefaultShouldRevalidate
    );
    Ue || (Q = null, Fe(F, {
      matches: ft || De,
      ...By(Ve),
      loaderData: et,
      errors: Tt
    }));
  }
  async function Ce(z, F, Z, ve, be, De, Se, Ee = {}) {
    Xe();
    let Le = oC(F, Z);
    if (Be({ navigation: Le }, { flushSync: Ee.flushSync === !0 }), De) {
      let Ue = await _e(
        ve,
        F.pathname,
        z.signal
      );
      if (Ue.type === "aborted")
        return { shortCircuited: !0 };
      if (Ue.type === "error") {
        if (Ue.partialMatches.length === 0) {
          let { matches: et, route: Tt } = Po(p);
          return {
            matches: et,
            pendingActionResult: [
              Tt.id,
              {
                type: "error",
                error: Ue.error
              }
            ]
          };
        }
        let ft = Sr(Ue.partialMatches).route.id;
        return {
          matches: Ue.partialMatches,
          pendingActionResult: [
            ft,
            {
              type: "error",
              error: Ue.error
            }
          ]
        };
      } else if (Ue.matches)
        ve = Ue.matches;
      else {
        let { notFoundMatches: ft, error: et, route: Tt } = Te(
          F.pathname
        );
        return {
          matches: ft,
          pendingActionResult: [
            Tt.id,
            {
              type: "error",
              error: et
            }
          ]
        };
      }
    }
    let Me, Ve = gc(ve, F);
    if (!Ve.route.action && !Ve.route.lazy)
      Me = {
        type: "error",
        error: Wn(405, {
          method: z.method,
          pathname: F.pathname,
          routeId: Ve.route.id
        })
      };
    else {
      let Ue = Xs(
        u,
        f,
        z,
        F,
        ve,
        Ve,
        Se ? [] : i,
        be
      ), ft = await ke(
        z,
        F,
        Ue,
        be,
        null
      );
      if (Me = ft[Ve.route.id], !Me) {
        for (let et of ve)
          if (ft[et.route.id]) {
            Me = ft[et.route.id];
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
        m,
        t.history
      ) === M.location.pathname + M.location.search, await je(z, Me, !0, {
        submission: Z,
        replace: Ue
      }), { shortCircuited: !0 };
    }
    if (qn(Me)) {
      let Ue = Sr(ve, Ve.route.id);
      return (Ee && Ee.replace) !== !0 && (V = "PUSH"), {
        matches: ve,
        pendingActionResult: [
          Ue.route.id,
          Me,
          Ve.route.id
        ]
      };
    }
    return {
      matches: ve,
      pendingActionResult: [Ve.route.id, Me]
    };
  }
  async function He(z, F, Z, ve, be, De, Se, Ee, Le, Me, Ve, Ue, ft) {
    let et = De || yf(F, Se), Tt = Se || Ee || Vy(et), wt = !A && !Me;
    if (be) {
      if (wt) {
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
        Z,
        F.pathname,
        z.signal
      );
      if (tt.type === "aborted")
        return { shortCircuited: !0 };
      if (tt.type === "error") {
        if (tt.partialMatches.length === 0) {
          let { matches: gn, route: Zt } = Po(p);
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
        Z = tt.matches;
      else {
        let { error: Gt, notFoundMatches: gn, route: Zt } = Te(
          F.pathname
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
    let $t = y || p, { dsMatches: rt, revalidatingFetchers: Qt } = _y(
      z,
      ve,
      u,
      f,
      t.history,
      M,
      Z,
      Tt,
      F,
      Me ? [] : i,
      Me === !0,
      q,
      $,
      W,
      G,
      re,
      $t,
      m,
      t.patchRoutesOnNavigation != null,
      Ue,
      ft
    );
    if (k = ++fe, !t.dataStrategy && !rt.some((tt) => tt.shouldLoad) && !rt.some(
      (tt) => tt.route.middleware && tt.route.middleware.length > 0
    ) && Qt.length === 0) {
      let tt = sa();
      return Fe(
        F,
        {
          matches: Z,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Ue && qn(Ue[1]) ? { [Ue[0]]: Ue[1].error } : null,
          ...By(Ue),
          ...tt ? { fetchers: new Map(M.fetchers) } : {}
        },
        { flushSync: Ve }
      ), { shortCircuited: !0 };
    }
    if (wt) {
      let tt = {};
      if (!be) {
        tt.navigation = et;
        let Gt = at(Ue);
        Gt !== void 0 && (tt.actionData = Gt);
      }
      Qt.length > 0 && (tt.fetchers = xt(Qt)), Be(tt, { flushSync: Ve });
    }
    Qt.forEach((tt) => {
      kt(tt.key), tt.controller && te.set(tt.key, tt.controller);
    });
    let At = () => Qt.forEach((tt) => kt(tt.key));
    Q && Q.signal.addEventListener(
      "abort",
      At
    );
    let { loaderResults: Fa, fetcherResults: ia } = await Pe(
      rt,
      Qt,
      z,
      F,
      ve
    );
    if (z.signal.aborted)
      return { shortCircuited: !0 };
    Q && Q.signal.removeEventListener(
      "abort",
      At
    ), Qt.forEach((tt) => te.delete(tt.key));
    let ln = Go(Fa);
    if (ln)
      return await je(z, ln.result, !0, {
        replace: Le
      }), { shortCircuited: !0 };
    if (ln = Go(ia), ln)
      return re.add(ln.key), await je(z, ln.result, !0, {
        replace: Le
      }), { shortCircuited: !0 };
    let { loaderData: ma, errors: _r } = $y(
      M,
      Z,
      Fa,
      Ue,
      Qt,
      ia
    );
    Me && M.errors && (_r = { ...M.errors, ..._r });
    let pa = sa(), Mr = wn(k), as = pa || Mr || Qt.length > 0;
    return {
      matches: Z,
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
  function xt(z) {
    return z.forEach((F) => {
      let Z = M.fetchers.get(F.key), ve = Wi(
        void 0,
        Z ? Z.data : void 0
      );
      M.fetchers.set(F.key, ve);
    }), new Map(M.fetchers);
  }
  async function ot(z, F, Z, ve) {
    kt(z);
    let be = (ve && ve.flushSync) === !0, De = y || p, Se = ah(
      M.location,
      M.matches,
      m,
      Z,
      F,
      ve?.relative
    ), Ee = xr(De, Se, m), Le = Re(Ee, De, Se);
    if (Le.active && Le.matches && (Ee = Le.matches), !Ee) {
      Ct(
        z,
        F,
        Wn(404, { pathname: Se }),
        { flushSync: be }
      );
      return;
    }
    let { path: Me, submission: Ve, error: Ue } = Ry(
      !0,
      Se,
      ve
    );
    if (Ue) {
      Ct(z, F, Ue, { flushSync: be });
      return;
    }
    let ft = t.getContext ? await t.getContext() : new wy(), et = (ve && ve.preventScrollReset) === !0;
    if (Ve && bn(Ve.formMethod)) {
      await Ye(
        z,
        F,
        Me,
        Ee,
        ft,
        Le.active,
        be,
        et,
        Ve,
        ve && ve.unstable_defaultShouldRevalidate
      );
      return;
    }
    G.set(z, { routeId: F, path: Me }), await pt(
      z,
      F,
      Me,
      Ee,
      ft,
      Le.active,
      be,
      et,
      Ve
    );
  }
  async function Ye(z, F, Z, ve, be, De, Se, Ee, Le, Me) {
    Xe(), G.delete(z);
    let Ve = M.fetchers.get(z);
    St(z, cC(Le, Ve), {
      flushSync: Se
    });
    let Ue = new AbortController(), ft = Hs(
      t.history,
      Z,
      Ue.signal,
      Le
    );
    if (De) {
      let zt = await _e(
        ve,
        new URL(ft.url).pathname,
        ft.signal,
        z
      );
      if (zt.type === "aborted")
        return;
      if (zt.type === "error") {
        Ct(z, F, zt.error, { flushSync: Se });
        return;
      } else if (zt.matches)
        ve = zt.matches;
      else {
        Ct(
          z,
          F,
          Wn(404, { pathname: Z }),
          { flushSync: Se }
        );
        return;
      }
    }
    let et = gc(ve, Z);
    if (!et.route.action && !et.route.lazy) {
      let zt = Wn(405, {
        method: Le.formMethod,
        pathname: Z,
        routeId: F
      });
      Ct(z, F, zt, { flushSync: Se });
      return;
    }
    te.set(z, Ue);
    let Tt = fe, wt = Xs(
      u,
      f,
      ft,
      Z,
      ve,
      et,
      i,
      be
    ), $t = await ke(
      ft,
      Z,
      wt,
      be,
      z
    ), rt = $t[et.route.id];
    if (!rt) {
      for (let zt of wt)
        if ($t[zt.route.id]) {
          rt = $t[zt.route.id];
          break;
        }
    }
    if (ft.signal.aborted) {
      te.get(z) === Ue && te.delete(z);
      return;
    }
    if (W.has(z)) {
      if (Xr(rt) || qn(rt)) {
        St(z, Ba(void 0));
        return;
      }
    } else {
      if (Xr(rt))
        if (te.delete(z), k > Tt) {
          St(z, Ba(void 0));
          return;
        } else
          return re.add(z), St(z, Wi(Le)), je(ft, rt, !1, {
            fetcherSubmission: Le,
            preventScrollReset: Ee
          });
      if (qn(rt)) {
        Ct(z, F, rt.error);
        return;
      }
    }
    let Qt = M.navigation.location || M.location, At = Hs(
      t.history,
      Qt,
      Ue.signal
    ), Fa = y || p, ia = M.navigation.state !== "idle" ? xr(Fa, M.navigation.location, m) : M.matches;
    nt(ia, "Didn't find any matches after fetcher action");
    let ln = ++fe;
    ee.set(z, ln);
    let ma = Wi(Le, rt.data);
    M.fetchers.set(z, ma);
    let { dsMatches: _r, revalidatingFetchers: pa } = _y(
      At,
      be,
      u,
      f,
      t.history,
      M,
      ia,
      Le,
      Qt,
      i,
      !1,
      q,
      $,
      W,
      G,
      re,
      Fa,
      m,
      t.patchRoutesOnNavigation != null,
      [et.route.id, rt],
      Me
    );
    pa.filter((zt) => zt.key !== z).forEach((zt) => {
      let rs = zt.key, ss = M.fetchers.get(rs), Dl = Wi(
        void 0,
        ss ? ss.data : void 0
      );
      M.fetchers.set(rs, Dl), kt(rs), zt.controller && te.set(rs, zt.controller);
    }), Be({ fetchers: new Map(M.fetchers) });
    let Mr = () => pa.forEach((zt) => kt(zt.key));
    Ue.signal.addEventListener(
      "abort",
      Mr
    );
    let { loaderResults: as, fetcherResults: tt } = await Pe(
      _r,
      pa,
      At,
      Qt,
      be
    );
    if (Ue.signal.aborted)
      return;
    if (Ue.signal.removeEventListener(
      "abort",
      Mr
    ), ee.delete(z), te.delete(z), pa.forEach((zt) => te.delete(zt.key)), M.fetchers.has(z)) {
      let zt = Ba(rt.data);
      M.fetchers.set(z, zt);
    }
    let Gt = Go(as);
    if (Gt)
      return je(
        At,
        Gt.result,
        !1,
        { preventScrollReset: Ee }
      );
    if (Gt = Go(tt), Gt)
      return re.add(Gt.key), je(
        At,
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
    wn(ln), M.navigation.state === "loading" && ln > k ? (nt(V, "Expected pending action"), Q && Q.abort(), Fe(M.navigation.location, {
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
    }), q = !1);
  }
  async function pt(z, F, Z, ve, be, De, Se, Ee, Le) {
    let Me = M.fetchers.get(z);
    St(
      z,
      Wi(
        Le,
        Me ? Me.data : void 0
      ),
      { flushSync: Se }
    );
    let Ve = new AbortController(), Ue = Hs(
      t.history,
      Z,
      Ve.signal
    );
    if (De) {
      let rt = await _e(
        ve,
        new URL(Ue.url).pathname,
        Ue.signal,
        z
      );
      if (rt.type === "aborted")
        return;
      if (rt.type === "error") {
        Ct(z, F, rt.error, { flushSync: Se });
        return;
      } else if (rt.matches)
        ve = rt.matches;
      else {
        Ct(
          z,
          F,
          Wn(404, { pathname: Z }),
          { flushSync: Se }
        );
        return;
      }
    }
    let ft = gc(ve, Z);
    te.set(z, Ve);
    let et = fe, Tt = Xs(
      u,
      f,
      Ue,
      Z,
      ve,
      ft,
      i,
      be
    ), wt = await ke(
      Ue,
      Z,
      Tt,
      be,
      z
    ), $t = wt[ft.route.id];
    if (!$t) {
      for (let rt of ve)
        if (wt[rt.route.id]) {
          $t = wt[rt.route.id];
          break;
        }
    }
    if (te.get(z) === Ve && te.delete(z), !Ue.signal.aborted) {
      if (W.has(z)) {
        St(z, Ba(void 0));
        return;
      }
      if (Xr($t))
        if (k > et) {
          St(z, Ba(void 0));
          return;
        } else {
          re.add(z), await je(Ue, $t, !1, {
            preventScrollReset: Ee
          });
          return;
        }
      if (qn($t)) {
        Ct(z, F, $t.error);
        return;
      }
      St(z, Ba($t.data));
    }
  }
  async function je(z, F, Z, {
    submission: ve,
    fetcherSubmission: be,
    preventScrollReset: De,
    replace: Se
  } = {}) {
    Z || (D?.resolve(), D = null), F.response.headers.has("X-Remix-Revalidate") && (q = !0);
    let Ee = F.response.headers.get("Location");
    nt(Ee, "Expected a Location header on the redirect Response"), Ee = Oy(
      Ee,
      new URL(z.url),
      m,
      t.history
    );
    let Le = nh(M.location, Ee, {
      _isRedirect: !0
    });
    if (s) {
      let Tt = !1;
      if (F.response.headers.has("X-Remix-Reload-Document"))
        Tt = !0;
      else if ($h(Ee)) {
        const wt = rN(Ee, !0);
        Tt = // Hard reload if it's an absolute URL to a new origin
        wt.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        aa(wt.pathname, m) == null;
      }
      if (Tt) {
        Se ? a.location.replace(Ee) : a.location.assign(Ee);
        return;
      }
    }
    Q = null;
    let Me = Se === !0 || F.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Ve, formAction: Ue, formEncType: ft } = M.navigation;
    !ve && !be && Ve && Ue && ft && (ve = Vy(M.navigation));
    let et = ve || be;
    if (UN.has(F.response.status) && et && bn(et.formMethod))
      await Mt(Me, Le, {
        submission: {
          ...et,
          formAction: Ee
        },
        // Preserve these flags across redirects
        preventScrollReset: De || H,
        enableViewTransition: Z ? J : void 0
      });
    else {
      let Tt = yf(
        Le,
        ve
      );
      await Mt(Me, Le, {
        overrideNavigation: Tt,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: be,
        // Preserve these flags across redirects
        preventScrollReset: De || H,
        enableViewTransition: Z ? J : void 0
      });
    }
  }
  async function ke(z, F, Z, ve, be) {
    let De, Se = {};
    try {
      De = await KN(
        b,
        z,
        F,
        Z,
        be,
        ve,
        !1
      );
    } catch (Ee) {
      return Z.filter((Le) => Le.shouldLoad).forEach((Le) => {
        Se[Le.route.id] = {
          type: "error",
          error: Ee
        };
      }), Se;
    }
    if (z.signal.aborted)
      return Se;
    if (!bn(z.method))
      for (let Ee of Z) {
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
      if (rC(Le)) {
        let Me = Le.result;
        Se[Ee] = {
          type: "redirect",
          response: JN(
            Me,
            z,
            Ee,
            Z,
            m
          )
        };
      } else
        Se[Ee] = await ZN(Le);
    return Se;
  }
  async function Pe(z, F, Z, ve, be) {
    let De = ke(
      Z,
      ve,
      z,
      be,
      null
    ), Se = Promise.all(
      F.map(async (Me) => {
        if (Me.matches && Me.match && Me.request && Me.controller) {
          let Ue = (await ke(
            Me.request,
            Me.path,
            Me.matches,
            be,
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
    q = !0, G.forEach((z, F) => {
      te.has(F) && $.add(F), kt(F);
    });
  }
  function St(z, F, Z = {}) {
    M.fetchers.set(z, F), Be(
      { fetchers: new Map(M.fetchers) },
      { flushSync: (Z && Z.flushSync) === !0 }
    );
  }
  function Ct(z, F, Z, ve = {}) {
    let be = Sr(M.matches, F);
    pn(z), Be(
      {
        errors: {
          [be.route.id]: Z
        },
        fetchers: new Map(M.fetchers)
      },
      { flushSync: (ve && ve.flushSync) === !0 }
    );
  }
  function zn(z) {
    return B.set(z, (B.get(z) || 0) + 1), W.has(z) && W.delete(z), M.fetchers.get(z) || BN;
  }
  function Sn(z, F) {
    kt(z, F?.reason), St(z, Ba(null));
  }
  function pn(z) {
    let F = M.fetchers.get(z);
    te.has(z) && !(F && F.state === "loading" && ee.has(z)) && kt(z), G.delete(z), ee.delete(z), re.delete(z), W.delete(z), $.delete(z), M.fetchers.delete(z);
  }
  function Pt(z) {
    let F = (B.get(z) || 0) - 1;
    F <= 0 ? (B.delete(z), W.add(z)) : B.set(z, F), Be({ fetchers: new Map(M.fetchers) });
  }
  function kt(z, F) {
    let Z = te.get(z);
    Z && (Z.abort(F), te.delete(z));
  }
  function Bt(z) {
    for (let F of z) {
      let Z = zn(F), ve = Ba(Z.data);
      M.fetchers.set(F, ve);
    }
  }
  function sa() {
    let z = [], F = !1;
    for (let Z of re) {
      let ve = M.fetchers.get(Z);
      nt(ve, `Expected fetcher: ${Z}`), ve.state === "loading" && (re.delete(Z), z.push(Z), F = !0);
    }
    return Bt(z), F;
  }
  function wn(z) {
    let F = [];
    for (let [Z, ve] of ee)
      if (ve < z) {
        let be = M.fetchers.get(Z);
        nt(be, `Expected fetcher: ${Z}`), be.state === "loading" && (kt(Z), ee.delete(Z), F.push(Z));
      }
    return Bt(F), F.length > 0;
  }
  function cn(z, F) {
    let Z = M.blockers.get(z) || Ji;
    return ce.get(z) !== F && ce.set(z, F), Z;
  }
  function En(z) {
    M.blockers.delete(z), ce.delete(z);
  }
  function It(z, F) {
    let Z = M.blockers.get(z) || Ji;
    nt(
      Z.state === "unblocked" && F.state === "blocked" || Z.state === "blocked" && F.state === "blocked" || Z.state === "blocked" && F.state === "proceeding" || Z.state === "blocked" && F.state === "unblocked" || Z.state === "proceeding" && F.state === "unblocked",
      `Invalid blocker state transition: ${Z.state} -> ${F.state}`
    );
    let ve = new Map(M.blockers);
    ve.set(z, F), Be({ blockers: ve });
  }
  function he({
    currentLocation: z,
    nextLocation: F,
    historyAction: Z
  }) {
    if (ce.size === 0)
      return;
    ce.size > 1 && Xt(!1, "A router only supports one blocker at a time");
    let ve = Array.from(ce.entries()), [be, De] = ve[ve.length - 1], Se = M.blockers.get(be);
    if (!(Se && Se.state === "proceeding") && De({ currentLocation: z, nextLocation: F, historyAction: Z }))
      return be;
  }
  function Te(z) {
    let F = Wn(404, { pathname: z }), Z = y || p, { matches: ve, route: be } = Po(Z);
    return { notFoundMatches: ve, route: be, error: F };
  }
  function ge(z, F, Z) {
    if (j = z, _ = F, C = Z || null, !T && M.navigation === vf) {
      T = !0;
      let ve = ue(M.location, M.matches);
      ve != null && Be({ restoreScrollPosition: ve });
    }
    return () => {
      j = null, _ = null, C = null;
    };
  }
  function xe(z, F) {
    return C && C(
      z,
      F.map((ve) => uN(ve, M.loaderData))
    ) || z.key;
  }
  function K(z, F) {
    if (j && _) {
      let Z = xe(z, F);
      j[Z] = _();
    }
  }
  function ue(z, F) {
    if (j) {
      let Z = xe(z, F), ve = j[Z];
      if (typeof ve == "number")
        return ve;
    }
    return null;
  }
  function Re(z, F, Z) {
    if (t.patchRoutesOnNavigation)
      if (z) {
        if (Object.keys(z[0].params).length > 0)
          return { active: !0, matches: ul(
            F,
            Z,
            m,
            !0
          ) };
      } else
        return { active: !0, matches: ul(
          F,
          Z,
          m,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function _e(z, F, Z, ve) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: z };
    let be = z;
    for (; ; ) {
      let De = y == null, Se = y || p, Ee = f;
      try {
        await t.patchRoutesOnNavigation({
          signal: Z,
          path: F,
          matches: be,
          fetcherKey: ve,
          patch: (Ve, Ue) => {
            Z.aborted || My(
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
        return { type: "error", error: Ve, partialMatches: be };
      } finally {
        De && !Z.aborted && (p = [...p]);
      }
      if (Z.aborted)
        return { type: "aborted" };
      let Le = xr(Se, F, m), Me = null;
      if (Le) {
        if (Object.keys(Le[0].params).length === 0)
          return { type: "success", matches: Le };
        if (Me = ul(
          Se,
          F,
          m,
          !0
        ), !(Me && be.length < Me.length && Ke(
          be,
          Me.slice(0, be.length)
        )))
          return { type: "success", matches: Le };
      }
      if (Me || (Me = ul(
        Se,
        F,
        m,
        !0
      )), !Me || Ke(be, Me))
        return { type: "success", matches: null };
      be = Me;
    }
  }
  function Ke(z, F) {
    return z.length === F.length && z.every((Z, ve) => Z.route.id === F[ve].route.id);
  }
  function Dt(z) {
    f = {}, y = gl(
      z,
      u,
      void 0,
      f
    );
  }
  function gt(z, F, Z = !1) {
    let ve = y == null;
    My(
      z,
      F,
      y || p,
      f,
      u,
      Z
    ), ve && (p = [...p], Be({}));
  }
  return ae = {
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
    initialize: lt,
    subscribe: We,
    enableScrollRestoration: ge,
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
    patchRoutes: gt,
    _internalFetchControllers: te,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: Dt,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(z) {
      Be(z);
    }
  }, t.unstable_instrumentations && (ae = MN(
    ae,
    t.unstable_instrumentations.map((z) => z.router).filter(Boolean)
  )), ae;
}
function qN(t) {
  return t != null && ("formData" in t && t.formData != null || "body" in t && t.body !== void 0);
}
function ah(t, a, s, i, o, u) {
  let f, p;
  if (o) {
    f = [];
    for (let m of a)
      if (f.push(m), m.route.id === o) {
        p = m;
        break;
      }
  } else
    f = a, p = a[a.length - 1];
  let y = Vc(
    i || ".",
    Uh(f),
    aa(t.pathname, s) || t.pathname,
    u === "path"
  );
  if (i == null && (y.search = t.search, y.hash = t.hash), (i == null || i === "" || i === ".") && p) {
    let m = qh(y.search);
    if (p.route.index && !m)
      y.search = y.search ? y.search.replace(/^\?/, "?index&") : "?index";
    else if (!p.route.index && m) {
      let b = new URLSearchParams(y.search), v = b.getAll("index");
      b.delete("index"), v.filter((w) => w).forEach((w) => b.append("index", w));
      let S = b.toString();
      y.search = S ? `?${S}` : "";
    }
  }
  return s !== "/" && (y.pathname = jN({ basename: s, pathname: y.pathname })), Sa(y);
}
function Ry(t, a, s) {
  if (!s || !qN(s))
    return { path: a };
  if (s.formMethod && !lC(s.formMethod))
    return {
      path: a,
      error: Wn(405, { method: s.formMethod })
    };
  let i = () => ({
    path: a,
    error: Wn(400, { type: "invalid-body" })
  }), u = (s.formMethod || "get").toUpperCase(), f = h1(a);
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
  let p, y;
  if (s.formData)
    p = sh(s.formData), y = s.formData;
  else if (s.body instanceof FormData)
    p = sh(s.body), y = s.body;
  else if (s.body instanceof URLSearchParams)
    p = s.body, y = Ly(p);
  else if (s.body == null)
    p = new URLSearchParams(), y = new FormData();
  else
    try {
      p = new URLSearchParams(s.body), y = Ly(p);
    } catch {
      return i();
    }
  let m = {
    formMethod: u,
    formAction: f,
    formEncType: s && s.formEncType || "application/x-www-form-urlencoded",
    formData: y,
    json: void 0,
    text: void 0
  };
  if (bn(m.formMethod))
    return { path: a, submission: m };
  let b = fa(a);
  return t && b.search && qh(b.search) && p.append("index", ""), b.search = `?${p}`, { path: Sa(b), submission: m };
}
function _y(t, a, s, i, o, u, f, p, y, m, b, v, S, w, j, C, _, T, O, R, N) {
  let U = R ? qn(R[1]) ? R[1].error : R[1].data : void 0, Y = o.createURL(u.location), ae = o.createURL(y), M;
  if (b && u.errors) {
    let ie = Object.keys(u.errors)[0];
    M = f.findIndex((A) => A.route.id === ie);
  } else if (R && qn(R[1])) {
    let ie = R[0];
    M = f.findIndex((A) => A.route.id === ie) - 1;
  }
  let V = R ? R[1].statusCode : void 0, D = V && V >= 400, H = {
    currentUrl: Y,
    currentParams: u.matches[0]?.params || {},
    nextUrl: ae,
    nextParams: f[0].params,
    ...p,
    actionResult: U,
    actionStatus: V
  }, Q = El(f), J = f.map((ie, A) => {
    let { route: q } = ie, $ = null;
    if (M != null && A > M)
      $ = !1;
    else if (q.lazy)
      $ = !0;
    else if (!Ih(q))
      $ = !1;
    else if (b) {
      let { shouldLoad: ee } = i1(
        q,
        u.loaderData,
        u.errors
      );
      $ = ee;
    } else HN(u.loaderData, u.matches[A], ie) && ($ = !0);
    if ($ !== null)
      return rh(
        s,
        i,
        t,
        y,
        Q,
        ie,
        m,
        a,
        $
      );
    let te = !1;
    typeof N == "boolean" ? te = N : D ? te = !1 : (v || Y.pathname + Y.search === ae.pathname + ae.search || Y.search !== ae.search || FN(u.matches[A], ie)) && (te = !0);
    let fe = {
      ...H,
      defaultShouldRevalidate: te
    }, k = hl(ie, fe);
    return rh(
      s,
      i,
      t,
      y,
      Q,
      ie,
      m,
      a,
      k,
      fe,
      N
    );
  }), P = [];
  return j.forEach((ie, A) => {
    if (b || !f.some((G) => G.route.id === ie.routeId) || w.has(A))
      return;
    let q = u.fetchers.get(A), $ = q && q.state !== "idle" && q.data === void 0, te = xr(_, ie.path, T);
    if (!te) {
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
    let fe = gc(te, ie.path), k = new AbortController(), ee = Hs(
      o,
      ie.path,
      k.signal
    ), re = null;
    if (S.has(A))
      S.delete(A), re = Xs(
        s,
        i,
        ee,
        ie.path,
        te,
        fe,
        m,
        a
      );
    else if ($)
      v && (re = Xs(
        s,
        i,
        ee,
        ie.path,
        te,
        fe,
        m,
        a
      ));
    else {
      let G;
      typeof N == "boolean" ? G = N : D ? G = !1 : G = v;
      let B = {
        ...H,
        defaultShouldRevalidate: G
      };
      hl(fe, B) && (re = Xs(
        s,
        i,
        ee,
        ie.path,
        te,
        fe,
        m,
        a,
        B
      ));
    }
    re && P.push({
      key: A,
      routeId: ie.routeId,
      path: ie.path,
      matches: re,
      match: fe,
      request: ee,
      controller: k
    });
  }), { dsMatches: J, revalidatingFetchers: P };
}
function Ih(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function i1(t, a, s) {
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
function HN(t, a, s) {
  let i = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    s.route.id !== a.route.id
  ), o = !t.hasOwnProperty(s.route.id);
  return i || o;
}
function FN(t, a) {
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
    let m = i[t];
    nt(
      m,
      `No route found to patch children into: routeId = ${t}`
    ), m.children || (m.children = []), f = m.children;
  } else
    f = s;
  let p = [], y = [];
  if (a.forEach((m) => {
    let b = f.find(
      (v) => l1(m, v)
    );
    b ? y.push({ existingRoute: b, newRoute: m }) : p.push(m);
  }), p.length > 0) {
    let m = gl(
      p,
      o,
      [t || "_", "patch", String(f?.length || "0")],
      i
    );
    f.push(...m);
  }
  if (u && y.length > 0)
    for (let m = 0; m < y.length; m++) {
      let { existingRoute: b, newRoute: v } = y[m], S = b, [w] = gl(
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
function l1(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (s, i) => a.children?.some((o) => l1(s, o))
  ) ?? !1 : !1;
}
var Ay = /* @__PURE__ */ new WeakMap(), o1 = ({
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
  let p = f[t];
  if (p)
    return p;
  let y = (async () => {
    let m = iN(t), v = o[t] !== void 0 && t !== "hasErrorBoundary";
    if (m)
      Xt(
        !m,
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
function PN(t, a, s, i, o) {
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
        let _ = oN(j), O = u[j] !== void 0 && // This property isn't static since it should always be updated based
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
  let f = Object.keys(t.lazy), p = [], y;
  for (let b of f) {
    if (o && o.includes(b))
      continue;
    let v = o1({
      key: b,
      route: t,
      manifest: s,
      mapRouteProperties: i
    });
    v && (p.push(v), b === a && (y = v));
  }
  let m = p.length > 0 ? Promise.all(p).then(() => {
  }) : void 0;
  return m?.catch(() => {
  }), y?.catch(() => {
  }), {
    lazyRoutePromise: m,
    lazyHandlerPromise: y
  };
}
async function Dy(t) {
  let a = t.matches.filter((o) => o.shouldLoad), s = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, u) => {
    s[a[u].route.id] = o;
  }), s;
}
async function GN(t) {
  return t.matches.some((a) => a.route.middleware) ? c1(t, () => Dy(t)) : Dy(t);
}
function c1(t, a) {
  return YN(
    t,
    a,
    (i) => {
      if (iC(i))
        throw i;
      return i;
    },
    nC,
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
      let { matches: f } = t, p = Math.min(
        // Throwing route
        Math.max(
          f.findIndex((m) => m.route.id === o),
          0
        ),
        // or the shallowest route that needs to load data
        Math.max(
          f.findIndex((m) => m.shouldCallHandler()),
          0
        )
      ), y = Sr(
        f,
        f[p].route.id
      ).route.id;
      return Promise.resolve({
        [y]: { type: "error", result: i }
      });
    }
  }
}
async function YN(t, a, s, i, o) {
  let { matches: u, ...f } = t, p = u.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((b) => [m.route.id, b]) : []
  );
  return await u1(
    f,
    p,
    a,
    s,
    i,
    o
  );
}
async function u1(t, a, s, i, o, u, f = 0) {
  let { request: p } = t;
  if (p.signal.aborted)
    throw p.signal.reason ?? new Error(`Request aborted: ${p.method} ${p.url}`);
  let y = a[f];
  if (!y)
    return await s();
  let [m, b] = y, v, S = async () => {
    if (v)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return v = { value: await u1(
        t,
        a,
        s,
        i,
        o,
        u,
        f + 1
      ) }, v.value;
    } catch (w) {
      return v = { value: await u(w, m, v) }, v.value;
    }
  };
  try {
    let w = await b(t, S), j = w != null ? i(w) : void 0;
    return o(j) ? j : v ? j ?? v.value : (v = { value: await S() }, v.value);
  } catch (w) {
    return await u(w, m, v);
  }
}
function d1(t, a, s, i, o) {
  let u = o1({
    key: "middleware",
    route: i.route,
    manifest: a,
    mapRouteProperties: t
  }), f = PN(
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
function rh(t, a, s, i, o, u, f, p, y, m = null, b) {
  let v = !1, S = d1(
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
    shouldRevalidateArgs: m,
    shouldCallHandler(w) {
      return v = !0, m ? typeof b == "boolean" ? hl(u, {
        ...m,
        defaultShouldRevalidate: b
      }) : typeof w == "boolean" ? hl(u, {
        ...m,
        defaultShouldRevalidate: w
      }) : hl(u, m) : y;
    },
    resolve(w) {
      let { lazy: j, loader: C, middleware: _ } = u.route, T = v || y || w && !bn(s.method) && (j || C), O = _ && _.length > 0 && !C && !j;
      return T && (bn(s.method) || !O) ? XN({
        request: s,
        path: i,
        unstable_pattern: o,
        match: u,
        lazyHandlerPromise: S?.handler,
        lazyRoutePromise: S?.route,
        handlerOverride: w,
        scopedContext: p
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function Xs(t, a, s, i, o, u, f, p, y = null) {
  return o.map((m) => m.route.id !== u.route.id ? {
    ...m,
    shouldLoad: !1,
    shouldRevalidateArgs: y,
    shouldCallHandler: () => !1,
    _lazyPromises: d1(
      t,
      a,
      s,
      m,
      f
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : rh(
    t,
    a,
    s,
    i,
    El(o),
    m,
    f,
    p,
    !0,
    y
  ));
}
async function KN(t, a, s, i, o, u, f) {
  i.some((b) => b._lazyPromises?.middleware) && await Promise.all(i.map((b) => b._lazyPromises?.middleware));
  let p = {
    request: a,
    unstable_url: f1(a, s),
    unstable_pattern: El(i),
    params: i[0].params,
    context: u,
    matches: i
  }, m = await t({
    ...p,
    fetcherKey: o,
    runClientMiddleware: (b) => {
      let v = p;
      return c1(v, () => b({
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
  return m;
}
async function XN({
  request: t,
  path: a,
  unstable_pattern: s,
  match: i,
  lazyHandlerPromise: o,
  lazyRoutePromise: u,
  handlerOverride: f,
  scopedContext: p
}) {
  let y, m, b = bn(t.method), v = b ? "action" : "loader", S = (w) => {
    let j, C = new Promise((O, R) => j = R);
    m = () => j(), t.signal.addEventListener("abort", m);
    let _ = (O) => typeof w != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${v}" [routeId: ${i.route.id}]`
      )
    ) : w(
      {
        request: t,
        unstable_url: f1(t, a),
        unstable_pattern: s,
        params: i.params,
        context: p
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
    m && t.signal.removeEventListener("abort", m);
  }
  return y;
}
async function QN(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function ZN(t) {
  let { result: a, type: s } = t;
  if (Vh(a)) {
    let i;
    try {
      i = await QN(a);
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
    error: tC(a),
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
function JN(t, a, s, i, o) {
  let u = t.headers.get("Location");
  if (nt(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !$h(u)) {
    let f = i.slice(
      0,
      i.findIndex((p) => p.route.id === s) + 1
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
  let o = t.createURL(h1(a)).toString(), u = { signal: s };
  if (i && bn(i.formMethod)) {
    let { formMethod: f, formEncType: p } = i;
    u.method = f.toUpperCase(), p === "application/json" ? (u.headers = new Headers({ "Content-Type": p }), u.body = JSON.stringify(i.json)) : p === "text/plain" ? u.body = i.text : p === "application/x-www-form-urlencoded" && i.formData ? u.body = sh(i.formData) : u.body = i.formData;
  }
  return new Request(o, u);
}
function f1(t, a) {
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
function WN(t, a, s, i = !1, o = !1) {
  let u = {}, f = null, p, y = !1, m = {}, b = s && qn(s[1]) ? s[1].error : void 0;
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
      i || (u[S] = s1), y || (y = !0, p = vl(w.error) ? w.error.status : 500), w.headers && (m[S] = w.headers);
    } else
      u[S] = w.data, w.statusCode && w.statusCode !== 200 && !y && (p = w.statusCode), w.headers && (m[S] = w.headers);
  }), b !== void 0 && s && (f = { [s[0]]: b }, s[2] && (u[s[2]] = void 0)), {
    loaderData: u,
    errors: f,
    statusCode: p || 200,
    loaderHeaders: m
  };
}
function $y(t, a, s, i, o, u) {
  let { loaderData: f, errors: p } = WN(
    a,
    s,
    i
  );
  return o.filter((y) => !y.matches || y.matches.some((m) => m.shouldLoad)).forEach((y) => {
    let { key: m, match: b, controller: v } = y;
    if (v && v.signal.aborted)
      return;
    let S = u[m];
    if (nt(S, "Did not find corresponding fetcher result"), qn(S)) {
      let w = Sr(t.matches, b?.route.id);
      p && p[w.route.id] || (p = {
        ...p,
        [w.route.id]: S.error
      }), t.fetchers.delete(m);
    } else if (Xr(S))
      nt(!1, "Unhandled fetcher revalidation redirect");
    else {
      let w = Ba(S.data);
      t.fetchers.set(m, w);
    }
  }), { loaderData: f, errors: p };
}
function Uy(t, a, s, i) {
  let o = Object.entries(a).filter(([, u]) => u !== s1).reduce((u, [f, p]) => (u[f] = p, u), {});
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
  let f = "Unknown Server Error", p = "Unknown @remix-run/router error";
  return t === 400 ? (f = "Bad Request", i && a && s ? p = `You made a ${i} request to "${a}" but did not provide a \`loader\` for route "${s}", so there is no way to handle the request.` : o === "invalid-body" && (p = "Unable to encode submission body")) : t === 403 ? (f = "Forbidden", p = `Route "${s}" does not match URL "${a}"`) : t === 404 ? (f = "Not Found", p = `No route matches URL "${a}"`) : t === 405 && (f = "Method Not Allowed", i && a && s ? p = `You made a ${i.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${s}", so there is no way to handle the request.` : i && (p = `Invalid request method "${i.toUpperCase()}"`)), new qc(
    t || 500,
    f,
    new Error(p),
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
function h1(t) {
  let a = typeof t == "string" ? fa(t) : t;
  return Sa({ ...a, hash: "" });
}
function eC(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function tC(t) {
  return new qc(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function nC(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, s]) => typeof a == "string" && aC(s)
  );
}
function aC(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function rC(t) {
  return Vh(t.result) && a1.has(t.result.status);
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
function sC(t) {
  return a1.has(t);
}
function iC(t) {
  return Vh(t) && sC(t.status) && t.headers.has("Location");
}
function lC(t) {
  return $N.has(t.toUpperCase());
}
function bn(t) {
  return ON.has(t.toUpperCase());
}
function qh(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function gc(t, a) {
  let s = typeof a == "string" ? fa(a).search : a.search;
  if (t[t.length - 1].route.index && qh(s || ""))
    return t[t.length - 1];
  let i = Jx(t);
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
function oC(t, a) {
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
function cC(t, a) {
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
function uC(t, a) {
  try {
    let s = t.sessionStorage.getItem(
      r1
    );
    if (s) {
      let i = JSON.parse(s);
      for (let [o, u] of Object.entries(i || {}))
        u && Array.isArray(u) && a.set(o, new Set(u || []));
    }
  } catch {
  }
}
function dC(t, a) {
  if (a.size > 0) {
    let s = {};
    for (let [i, o] of a)
      s[i] = [...o];
    try {
      t.sessionStorage.setItem(
        r1,
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
var m1 = g.createContext(!1);
function p1() {
  return g.useContext(m1);
}
var Hh = g.createContext({
  isTransitioning: !1
});
Hh.displayName = "ViewTransition";
var g1 = g.createContext(
  /* @__PURE__ */ new Map()
);
g1.displayName = "Fetchers";
var fC = g.createContext(null);
fC.displayName = "Await";
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
var v1 = "REACT_ROUTER_ERROR", hC = "REDIRECT", mC = "ROUTE_ERROR_RESPONSE";
function pC(t) {
  if (t.startsWith(`${v1}:${hC}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function gC(t) {
  if (t.startsWith(
    `${v1}:${mC}:{`
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
function vC(t, { relative: a } = {}) {
  nt(
    Cl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: s, navigator: i } = g.useContext(ra), { hash: o, pathname: u, search: f } = Tl(t, { relative: a }), p = u;
  return s !== "/" && (p = u === "/" ? s : ea([s, u])), i.createHref({ pathname: p, search: f, hash: o });
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
var y1 = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function b1(t) {
  g.useContext(ra).static || g.useLayoutEffect(t);
}
function ni() {
  let { isDataRoute: t } = g.useContext(qa);
  return t ? _C() : yC();
}
function yC() {
  nt(
    Cl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = g.useContext(ns), { basename: a, navigator: s } = g.useContext(ra), { matches: i } = g.useContext(qa), { pathname: o } = Ha(), u = JSON.stringify(Uh(i)), f = g.useRef(!1);
  return b1(() => {
    f.current = !0;
  }), g.useCallback(
    (y, m = {}) => {
      if (Xt(f.current, y1), !f.current) return;
      if (typeof y == "number") {
        s.go(y);
        return;
      }
      let b = Vc(
        y,
        JSON.parse(u),
        o,
        m.relative === "path"
      );
      t == null && a !== "/" && (b.pathname = b.pathname === "/" ? a : ea([a, b.pathname])), (m.replace ? s.replace : s.push)(
        b,
        m.state,
        m
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
function bC(t, a, s) {
  nt(
    Cl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: i } = g.useContext(ra), { matches: o } = g.useContext(qa), u = o[o.length - 1], f = u ? u.params : {}, p = u ? u.pathname : "/", y = u ? u.pathnameBase : "/", m = u && u.route;
  {
    let _ = m && m.path || "";
    w1(
      p,
      !m || _.endsWith("*") || _.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${p}" (under <Route path="${_}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

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
    m || j != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `
  ), Xt(
    j == null || j[j.length - 1].route.element !== void 0 || j[j.length - 1].route.Component !== void 0 || j[j.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), EC(
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
function xC() {
  let t = RC(), a = vl(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), s = t instanceof Error ? t.stack : null, i = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: i }, u = { padding: "2px 4px", backgroundColor: i }, f = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), f = /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ g.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ g.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ g.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ g.createElement("h3", { style: { fontStyle: "italic" } }, a), s ? /* @__PURE__ */ g.createElement("pre", { style: o }, s) : null, f);
}
var SC = /* @__PURE__ */ g.createElement(xC, null), x1 = class extends g.Component {
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
      const s = gC(t.digest);
      s && (t = s);
    }
    let a = t !== void 0 ? /* @__PURE__ */ g.createElement(qa.Provider, { value: this.props.routeContext }, /* @__PURE__ */ g.createElement(
      Fh.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ g.createElement(wC, { error: t }, a) : a;
  }
};
x1.contextType = m1;
var bf = /* @__PURE__ */ new WeakMap();
function wC({
  children: t,
  error: a
}) {
  let { basename: s } = g.useContext(ra);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let i = pC(a.digest);
    if (i) {
      let o = bf.get(a);
      if (o) throw o;
      let u = e1(i.location, s);
      if (Wx && !bf.get(a))
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
function jC({ routeContext: t, match: a, children: s }) {
  let i = g.useContext(ns);
  return i && i.static && i.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (i.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ g.createElement(qa.Provider, { value: t }, s);
}
function EC(t, a = [], s) {
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
  let f = !1, p = -1;
  if (s && i) {
    f = i.renderFallback;
    for (let b = 0; b < o.length; b++) {
      let v = o[b];
      if ((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (p = b), v.route.id) {
        let { loaderData: S, errors: w } = i, j = v.route.loader && !S.hasOwnProperty(v.route.id) && (!w || w[v.route.id] === void 0);
        if (v.route.lazy || j) {
          s.isStatic && (f = !0), p >= 0 ? o = o.slice(0, p + 1) : o = [o[0]];
          break;
        }
      }
    }
  }
  let y = s?.onError, m = i && y ? (b, v) => {
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
      i && (w = u && v.route.id ? u[v.route.id] : void 0, C = v.route.errorElement || SC, f && (p < 0 && S === 0 ? (w1(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), j = !0, _ = null) : p === S && (j = !0, _ = v.route.hydrateFallbackElement || null)));
      let T = a.concat(o.slice(0, S + 1)), O = () => {
        let R;
        return w ? R = C : j ? R = _ : v.route.Component ? R = /* @__PURE__ */ g.createElement(v.route.Component, null) : v.route.element ? R = v.route.element : R = b, /* @__PURE__ */ g.createElement(
          jC,
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
        x1,
        {
          location: i.location,
          revalidation: i.revalidation,
          component: C,
          error: w,
          children: O(),
          routeContext: { outlet: null, matches: T, isDataRoute: !0 },
          onError: m
        }
      ) : O();
    },
    null
  );
}
function Ph(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function NC(t) {
  let a = g.useContext(ns);
  return nt(a, Ph(t)), a;
}
function S1(t) {
  let a = g.useContext(Nl);
  return nt(a, Ph(t)), a;
}
function CC(t) {
  let a = g.useContext(qa);
  return nt(a, Ph(t)), a;
}
function Fc(t) {
  let a = CC(t), s = a.matches[a.matches.length - 1];
  return nt(
    s.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), s.route.id;
}
function TC() {
  return Fc(
    "useRouteId"
    /* UseRouteId */
  );
}
function Rl() {
  let t = S1(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Fc(
    "useLoaderData"
    /* UseLoaderData */
  );
  return t.loaderData[a];
}
function RC() {
  let t = g.useContext(Fh), a = S1(
    "useRouteError"
    /* UseRouteError */
  ), s = Fc(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[s];
}
function _C() {
  let { router: t } = NC(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Fc(
    "useNavigate"
    /* UseNavigateStable */
  ), s = g.useRef(!1);
  return b1(() => {
    s.current = !0;
  }), g.useCallback(
    async (o, u = {}) => {
      Xt(s.current, y1), s.current && (typeof o == "number" ? await t.navigate(o) : await t.navigate(o, { fromRouteId: a, ...u }));
    },
    [t, a]
  );
}
var Hy = {};
function w1(t, a, s) {
  !a && !Hy[t] && (Hy[t] = !0, Xt(!1, s));
}
var Fy = {};
function Py(t, a) {
  !t && !Fy[a] && (Fy[a] = !0, console.warn(a));
}
var MC = "useOptimistic", Gy = YE[MC], AC = () => {
};
function kC(t) {
  return Gy ? Gy(t) : [t, AC];
}
function DC(t) {
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
var zC = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function OC(t, a) {
  return VN({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: nN({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: t,
    hydrationRouteProperties: zC,
    mapRouteProperties: DC,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var LC = class {
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
function $C({
  router: t,
  flushSync: a,
  onError: s,
  unstable_useTransitions: i
}) {
  i = p1() || i;
  let [u, f] = g.useState(t.state), [p, y] = kC(u), [m, b] = g.useState(), [v, S] = g.useState({
    isTransitioning: !1
  }), [w, j] = g.useState(), [C, _] = g.useState(), [T, O] = g.useState(), R = g.useRef(/* @__PURE__ */ new Map()), N = g.useCallback(
    (V, { deletedFetchers: D, newErrors: H, flushSync: Q, viewTransitionOpts: J }) => {
      H && s && Object.values(H).forEach(
        (ie) => s(ie, {
          location: V.location,
          params: V.matches[0]?.params ?? {},
          unstable_pattern: El(V.matches)
        })
      ), V.fetchers.forEach((ie, A) => {
        ie.data !== void 0 && R.current.set(A, ie.data);
      }), D.forEach((ie) => R.current.delete(ie)), Py(
        Q === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let P = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (Py(
        J == null || P,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !J || !P) {
        a && Q ? a(() => f(V)) : i === !1 ? f(V) : g.startTransition(() => {
          i === !0 && y((ie) => Yy(ie, V)), f(V);
        });
        return;
      }
      if (a && Q) {
        a(() => {
          C && (w?.resolve(), C.skipTransition()), S({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: J.currentLocation,
            nextLocation: J.nextLocation
          });
        });
        let ie = t.window.document.startViewTransition(() => {
          a(() => f(V));
        });
        ie.finished.finally(() => {
          a(() => {
            j(void 0), _(void 0), b(void 0), S({ isTransitioning: !1 });
          });
        }), a(() => _(ie));
        return;
      }
      C ? (w?.resolve(), C.skipTransition(), O({
        state: V,
        currentLocation: J.currentLocation,
        nextLocation: J.nextLocation
      })) : (b(V), S({
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
  let U = p.initialized;
  g.useLayoutEffect(() => {
    !U && t.state.initialized && N(t.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [U, N, t.state]), g.useEffect(() => {
    v.isTransitioning && !v.flushSync && j(new LC());
  }, [v]), g.useEffect(() => {
    if (w && m && t.window) {
      let V = m, D = w.promise, H = t.window.document.startViewTransition(async () => {
        i === !1 ? f(V) : g.startTransition(() => {
          i === !0 && y((Q) => Yy(Q, V)), f(V);
        }), await D;
      });
      H.finished.finally(() => {
        j(void 0), _(void 0), b(void 0), S({ isTransitioning: !1 });
      }), _(H);
    }
  }, [
    m,
    w,
    t.window,
    i,
    y
  ]), g.useEffect(() => {
    w && m && p.location.key === m.location.key && w.resolve();
  }, [w, C, p.location, m]), g.useEffect(() => {
    !v.isTransitioning && T && (b(T.state), S({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: T.currentLocation,
      nextLocation: T.nextLocation
    }), O(void 0));
  }, [v.isTransitioning, T]);
  let Y = g.useMemo(() => ({
    createHref: t.createHref,
    encodeLocation: t.encodeLocation,
    go: (V) => t.navigate(V),
    push: (V, D, H) => t.navigate(V, {
      state: D,
      preventScrollReset: H?.preventScrollReset
    }),
    replace: (V, D, H) => t.navigate(V, {
      replace: !0,
      state: D,
      preventScrollReset: H?.preventScrollReset
    })
  }), [t]), ae = t.basename || "/", M = g.useMemo(
    () => ({
      router: t,
      navigator: Y,
      static: !1,
      basename: ae,
      onError: s
    }),
    [t, Y, ae, s]
  );
  return /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement(ns.Provider, { value: M }, /* @__PURE__ */ g.createElement(Nl.Provider, { value: p }, /* @__PURE__ */ g.createElement(g1.Provider, { value: R.current }, /* @__PURE__ */ g.createElement(Hh.Provider, { value: v }, /* @__PURE__ */ g.createElement(
    IC,
    {
      basename: ae,
      location: p.location,
      navigationType: p.historyAction,
      navigator: Y,
      unstable_useTransitions: i
    },
    /* @__PURE__ */ g.createElement(
      UC,
      {
        routes: t.routes,
        future: t.future,
        state: p,
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
var UC = g.memo(BC);
function BC({
  routes: t,
  future: a,
  state: s,
  isStatic: i,
  onError: o
}) {
  return bC(t, void 0, { state: s, isStatic: i, onError: o });
}
function IC({
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
  let p = t.replace(/^\/*/, "/"), y = g.useMemo(
    () => ({
      basename: p,
      navigator: o,
      static: u,
      unstable_useTransitions: f,
      future: {}
    }),
    [p, o, u, f]
  );
  typeof s == "string" && (s = fa(s));
  let {
    pathname: m = "/",
    search: b = "",
    hash: v = "",
    state: S = null,
    key: w = "default",
    unstable_mask: j
  } = s, C = g.useMemo(() => {
    let _ = aa(m, p);
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
    p,
    m,
    b,
    v,
    S,
    w,
    i,
    j
  ]);
  return Xt(
    C != null,
    `<Router basename="${p}"> is not able to match the URL "${m}${b}${v}" because it does not start with the basename, so the <Router> won't render anything.`
  ), C == null ? null : /* @__PURE__ */ g.createElement(ra.Provider, { value: y }, /* @__PURE__ */ g.createElement(Hc.Provider, { children: a, value: C }));
}
var vc = "get", yc = "application/x-www-form-urlencoded";
function Pc(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function VC(t) {
  return Pc(t) && t.tagName.toLowerCase() === "button";
}
function qC(t) {
  return Pc(t) && t.tagName.toLowerCase() === "form";
}
function HC(t) {
  return Pc(t) && t.tagName.toLowerCase() === "input";
}
function FC(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function PC(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !FC(t);
}
var Yo = null;
function GC() {
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
var YC = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function xf(t) {
  return t != null && !YC.has(t) ? (Xt(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${yc}"`
  ), null) : t;
}
function KC(t, a) {
  let s, i, o, u, f;
  if (qC(t)) {
    let p = t.getAttribute("action");
    i = p ? aa(p, a) : null, s = t.getAttribute("method") || vc, o = xf(t.getAttribute("enctype")) || yc, u = new FormData(t);
  } else if (VC(t) || HC(t) && (t.type === "submit" || t.type === "image")) {
    let p = t.form;
    if (p == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let y = t.getAttribute("formaction") || p.getAttribute("action");
    if (i = y ? aa(y, a) : null, s = t.getAttribute("formmethod") || p.getAttribute("method") || vc, o = xf(t.getAttribute("formenctype")) || xf(p.getAttribute("enctype")) || yc, u = new FormData(p, t), !GC()) {
      let { name: m, type: b, value: v } = t;
      if (b === "image") {
        let S = m ? `${m}.` : "";
        u.append(`${S}x`, "0"), u.append(`${S}y`, "0");
      } else m && u.append(m, v);
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
function j1(t, a, s, i) {
  let o = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return s ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${i}` : o.pathname = `${o.pathname}.${i}` : o.pathname === "/" ? o.pathname = `_root.${i}` : a && aa(o.pathname, a) === "/" ? o.pathname = `${Cc(a)}/_root.${i}` : o.pathname = `${Cc(o.pathname)}.${i}`, o;
}
async function XC(t, a) {
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
function QC(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function ZC(t, a, s) {
  let i = await Promise.all(
    t.map(async (o) => {
      let u = a.routes[o.route.id];
      if (u) {
        let f = await XC(u, s);
        return f.links ? f.links() : [];
      }
      return [];
    })
  );
  return tT(
    i.flat(1).filter(QC).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function Ky(t, a, s, i, o, u) {
  let f = (y, m) => s[m] ? y.route.id !== s[m].route.id : !0, p = (y, m) => (
    // param change, /users/123 -> /users/456
    s[m].pathname !== y.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    s[m].route.path?.endsWith("*") && s[m].params["*"] !== y.params["*"]
  );
  return u === "assets" ? a.filter(
    (y, m) => f(y, m) || p(y, m)
  ) : u === "data" ? a.filter((y, m) => {
    let b = i.routes[y.route.id];
    if (!b || !b.hasLoader)
      return !1;
    if (f(y, m) || p(y, m))
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
function JC(t, a, { includeHydrateFallback: s } = {}) {
  return WC(
    t.map((i) => {
      let o = a.routes[i.route.id];
      if (!o) return [];
      let u = [o.module];
      return o.clientActionModule && (u = u.concat(o.clientActionModule)), o.clientLoaderModule && (u = u.concat(o.clientLoaderModule)), s && o.hydrateFallbackModule && (u = u.concat(o.hydrateFallbackModule)), o.imports && (u = u.concat(o.imports)), u;
    }).flat(1)
  );
}
function WC(t) {
  return [...new Set(t)];
}
function eT(t) {
  let a = {}, s = Object.keys(t).sort();
  for (let i of s)
    a[i] = t[i];
  return a;
}
function tT(t, a) {
  let s = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((i, o) => {
    let u = JSON.stringify(eT(o));
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
function nT() {
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
function aT(t, a) {
  let s = g.useContext(Kh), [i, o] = g.useState(!1), [u, f] = g.useState(!1), { onFocus: p, onBlur: y, onMouseEnter: m, onMouseLeave: b, onTouchStart: v } = a, S = g.useRef(null);
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
      onFocus: el(p, w),
      onBlur: el(y, j),
      onMouseEnter: el(m, w),
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
function rT({ page: t, ...a }) {
  let s = p1(), { router: i } = Yh(), o = g.useMemo(
    () => xr(i.routes, t, i.basename),
    [i.routes, t, i.basename]
  );
  return o ? s ? /* @__PURE__ */ g.createElement(iT, { page: t, matches: o, ...a }) : /* @__PURE__ */ g.createElement(lT, { page: t, matches: o, ...a }) : null;
}
function sT(t) {
  let { manifest: a, routeModules: s } = Xh(), [i, o] = g.useState([]);
  return g.useEffect(() => {
    let u = !1;
    return ZC(t, a, s).then(
      (f) => {
        u || o(f);
      }
    ), () => {
      u = !0;
    };
  }, [t, a, s]), i;
}
function iT({
  page: t,
  matches: a,
  ...s
}) {
  let i = Ha(), { future: o } = Xh(), { basename: u } = Yh(), f = g.useMemo(() => {
    if (t === i.pathname + i.search + i.hash)
      return [];
    let p = j1(
      t,
      u,
      o.unstable_trailingSlashAwareDataRequests,
      "rsc"
    ), y = !1, m = [];
    for (let b of a)
      typeof b.route.shouldRevalidate == "function" ? y = !0 : m.push(b.route.id);
    return y && m.length > 0 && p.searchParams.set("_routes", m.join(",")), [p.pathname + p.search];
  }, [
    u,
    o.unstable_trailingSlashAwareDataRequests,
    t,
    i,
    a
  ]);
  return /* @__PURE__ */ g.createElement(g.Fragment, null, f.map((p) => /* @__PURE__ */ g.createElement("link", { key: p, rel: "prefetch", as: "fetch", href: p, ...s })));
}
function lT({
  page: t,
  matches: a,
  ...s
}) {
  let i = Ha(), { future: o, manifest: u, routeModules: f } = Xh(), { basename: p } = Yh(), { loaderData: y, matches: m } = nT(), b = g.useMemo(
    () => Ky(
      t,
      a,
      m,
      u,
      i,
      "data"
    ),
    [t, a, m, u, i]
  ), v = g.useMemo(
    () => Ky(
      t,
      a,
      m,
      u,
      i,
      "assets"
    ),
    [t, a, m, u, i]
  ), S = g.useMemo(() => {
    if (t === i.pathname + i.search + i.hash)
      return [];
    let C = /* @__PURE__ */ new Set(), _ = !1;
    if (a.forEach((O) => {
      let R = u.routes[O.route.id];
      !R || !R.hasLoader || (!b.some((N) => N.route.id === O.route.id) && O.route.id in y && f[O.route.id]?.shouldRevalidate || R.hasClientLoader ? _ = !0 : C.add(O.route.id));
    }), C.size === 0)
      return [];
    let T = j1(
      t,
      p,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return _ && C.size > 0 && T.searchParams.set(
      "_routes",
      a.filter((O) => C.has(O.route.id)).map((O) => O.route.id).join(",")
    ), [T.pathname + T.search];
  }, [
    p,
    o.unstable_trailingSlashAwareDataRequests,
    y,
    i,
    u,
    b,
    a,
    t,
    f
  ]), w = g.useMemo(
    () => JC(v, u),
    [v, u]
  ), j = sT(v);
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
function oT(...t) {
  return (a) => {
    t.forEach((s) => {
      typeof s == "function" ? s(a) : s != null && (s.current = a);
    });
  };
}
var cT = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  cT && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var E1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Qh = g.forwardRef(
  function({
    onClick: a,
    discover: s = "render",
    prefetch: i = "none",
    relative: o,
    reloadDocument: u,
    replace: f,
    unstable_mask: p,
    state: y,
    target: m,
    to: b,
    preventScrollReset: v,
    viewTransition: S,
    unstable_defaultShouldRevalidate: w,
    ...j
  }, C) {
    let { basename: _, navigator: T, unstable_useTransitions: O } = g.useContext(ra), R = typeof b == "string" && E1.test(b), N = e1(b, _);
    b = N.to;
    let U = vC(b, { relative: o }), Y = Ha(), ae = null;
    if (p) {
      let ie = Vc(
        p,
        [],
        Y.unstable_mask ? Y.unstable_mask.pathname : "/",
        !0
      );
      _ !== "/" && (ie.pathname = ie.pathname === "/" ? _ : ea([_, ie.pathname])), ae = T.createHref(ie);
    }
    let [M, V, D] = aT(
      i,
      j
    ), H = hT(b, {
      replace: f,
      unstable_mask: p,
      state: y,
      target: m,
      preventScrollReset: v,
      relative: o,
      viewTransition: S,
      unstable_defaultShouldRevalidate: w,
      unstable_useTransitions: O
    });
    function Q(ie) {
      a && a(ie), ie.defaultPrevented || H(ie);
    }
    let J = !(N.isExternal || u), P = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ g.createElement(
        "a",
        {
          ...j,
          ...D,
          href: (J ? ae : void 0) || N.absoluteURL || U,
          onClick: J ? Q : a,
          ref: oT(C, V),
          target: m,
          "data-discover": !R && s === "render" ? "true" : void 0
        }
      )
    );
    return M && !R ? /* @__PURE__ */ g.createElement(g.Fragment, null, P, /* @__PURE__ */ g.createElement(rT, { page: U })) : P;
  }
);
Qh.displayName = "Link";
var uT = g.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: s = !1,
    className: i = "",
    end: o = !1,
    style: u,
    to: f,
    viewTransition: p,
    children: y,
    ...m
  }, b) {
    let v = Tl(f, { relative: m.relative }), S = Ha(), w = g.useContext(Nl), { navigator: j, basename: C } = g.useContext(ra), _ = w != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    yT(v) && p === !0, T = j.encodeLocation ? j.encodeLocation(v).pathname : v.pathname, O = S.pathname, R = w && w.navigation && w.navigation.location ? w.navigation.location.pathname : null;
    s || (O = O.toLowerCase(), R = R ? R.toLowerCase() : null, T = T.toLowerCase()), R && C && (R = aa(R, C) || R);
    const N = T !== "/" && T.endsWith("/") ? T.length - 1 : T.length;
    let U = O === T || !o && O.startsWith(T) && O.charAt(N) === "/", Y = R != null && (R === T || !o && R.startsWith(T) && R.charAt(T.length) === "/"), ae = {
      isActive: U,
      isPending: Y,
      isTransitioning: _
    }, M = U ? a : void 0, V;
    typeof i == "function" ? V = i(ae) : V = [
      i,
      U ? "active" : null,
      Y ? "pending" : null,
      _ ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let D = typeof u == "function" ? u(ae) : u;
    return /* @__PURE__ */ g.createElement(
      Qh,
      {
        ...m,
        "aria-current": M,
        className: V,
        ref: b,
        style: D,
        to: f,
        viewTransition: p
      },
      typeof y == "function" ? y(ae) : y
    );
  }
);
uT.displayName = "NavLink";
var dT = g.forwardRef(
  ({
    discover: t = "render",
    fetcherKey: a,
    navigate: s,
    reloadDocument: i,
    replace: o,
    state: u,
    method: f = vc,
    action: p,
    onSubmit: y,
    relative: m,
    preventScrollReset: b,
    viewTransition: v,
    unstable_defaultShouldRevalidate: S,
    ...w
  }, j) => {
    let { unstable_useTransitions: C } = g.useContext(ra), _ = gT(), T = vT(p, { relative: m }), O = f.toLowerCase() === "get" ? "get" : "post", R = typeof p == "string" && E1.test(p), N = (U) => {
      if (y && y(U), U.defaultPrevented) return;
      U.preventDefault();
      let Y = U.nativeEvent.submitter, ae = Y?.getAttribute("formmethod") || f, M = () => _(Y || U.currentTarget, {
        fetcherKey: a,
        method: ae,
        navigate: s,
        replace: o,
        state: u,
        relative: m,
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
dT.displayName = "Form";
function fT(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function N1(t) {
  let a = g.useContext(ns);
  return nt(a, fT(t)), a;
}
function hT(t, {
  target: a,
  replace: s,
  unstable_mask: i,
  state: o,
  preventScrollReset: u,
  relative: f,
  viewTransition: p,
  unstable_defaultShouldRevalidate: y,
  unstable_useTransitions: m
} = {}) {
  let b = ni(), v = Ha(), S = Tl(t, { relative: f });
  return g.useCallback(
    (w) => {
      if (PC(w, a)) {
        w.preventDefault();
        let j = s !== void 0 ? s : Sa(v) === Sa(S), C = () => b(t, {
          replace: j,
          unstable_mask: i,
          state: o,
          preventScrollReset: u,
          relative: f,
          viewTransition: p,
          unstable_defaultShouldRevalidate: y
        });
        m ? g.startTransition(() => C()) : C();
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
      p,
      y,
      m
    ]
  );
}
var mT = 0, pT = () => `__${String(++mT)}__`;
function gT() {
  let { router: t } = N1(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = g.useContext(ra), s = TC(), i = t.fetch, o = t.navigate;
  return g.useCallback(
    async (u, f = {}) => {
      let { action: p, method: y, encType: m, formData: b, body: v } = KC(
        u,
        a
      );
      if (f.navigate === !1) {
        let S = f.fetcherKey || pT();
        await i(S, s, f.action || p, {
          unstable_defaultShouldRevalidate: f.unstable_defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: b,
          body: v,
          formMethod: f.method || y,
          formEncType: f.encType || m,
          flushSync: f.flushSync
        });
      } else
        await o(f.action || p, {
          unstable_defaultShouldRevalidate: f.unstable_defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: b,
          body: v,
          formMethod: f.method || y,
          formEncType: f.encType || m,
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
function vT(t, { relative: a } = {}) {
  let { basename: s } = g.useContext(ra), i = g.useContext(qa);
  nt(i, "useFormAction must be used inside a RouteContext");
  let [o] = i.matches.slice(-1), u = { ...Tl(t || ".", { relative: a }) }, f = Ha();
  if (t == null) {
    u.search = f.search;
    let p = new URLSearchParams(u.search), y = p.getAll("index");
    if (y.some((b) => b === "")) {
      p.delete("index"), y.filter((v) => v).forEach((v) => p.append("index", v));
      let b = p.toString();
      u.search = b ? `?${b}` : "";
    }
  }
  return (!t || t === ".") && o.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), s !== "/" && (u.pathname = u.pathname === "/" ? s : ea([s, u.pathname])), Sa(u);
}
function yT(t, { relative: a } = {}) {
  let s = g.useContext(Hh);
  nt(
    s != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: i } = N1(
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
async function _t(t, a) {
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
const bT = [
  "segment_started",
  "segment_completed",
  "segment_failed",
  "run_terminal"
];
function xT(t, a, s, i = bT, o = (u) => u) {
  const u = t.startsWith("http") ? t : `${ha}${t}`, f = new EventSource(u), p = (y) => {
    if (y.data)
      try {
        const m = o(JSON.parse(y.data));
        m !== null && a(m);
      } catch {
      }
  };
  f.onmessage = p;
  for (const y of i)
    f.addEventListener(y, p);
  return f.onerror = (y) => {
    s?.(y);
  }, () => f.close();
}
async function ST() {
  return _t("/deployments");
}
async function Xy(t) {
  return _t(`/deployments/${t}`);
}
async function wT(t, a) {
  return _t(`/deployments/${t}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function Qy(t) {
  return _t(`/mappings?deploymentId=${encodeURIComponent(t)}`);
}
async function Zh(t, a) {
  return _t("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: t })
  });
}
async function Ys(t, a, s) {
  return _t(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify(s)
    }
  );
}
async function C1(t, a) {
  await _t(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function jT(t) {
  return _t(`/mappings/export?deploymentId=${encodeURIComponent(t)}`);
}
async function ET(t, a, s = "error") {
  return _t("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: t, mappings: a, conflictStrategy: s })
  });
}
function NT(t) {
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
function CT(t, ...a) {
  for (const s of a) {
    const i = t[s];
    if (typeof i == "boolean") return i;
  }
}
function TT(t) {
  const a = NT(t);
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
        cacheHit: CT(a, "cacheHit", "cache_hit") ?? !1,
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
      const f = mr(a, "status") ?? "completed", p = mr(a, "exportArtifactRef", "export_artifact_ref") ?? null;
      return { type: s, runId: i, status: f, exportArtifactRef: p };
    }
    default:
      return null;
  }
}
async function RT(t, a = {}) {
  const s = new URLSearchParams();
  a.limit && s.set("limit", String(a.limit)), a.status && s.set("status", a.status);
  const i = s.toString(), o = i ? `?${i}` : "";
  return _t(`/deployments/${t}/runs${o}`);
}
async function T1(t, a) {
  return _t(`/deployments/${t}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function _T(t, a) {
  return Promise.all(a.map((s) => T1(t, s)));
}
function MT(t, a) {
  if (t.length === 0) return [];
  const s = Math.min(Math.max(Math.floor(a), 1), t.length), i = Math.floor(t.length / s), o = t.length % s, u = [];
  let f = 0;
  for (let p = 0; p < s; p += 1) {
    const y = i + (p < o ? 1 : 0);
    u.push(t.slice(f, f + y)), f += y;
  }
  return u;
}
async function Jh(t, a) {
  return _t(`/deployments/${t}/runs/${a}`);
}
async function Jy(t, a) {
  return _t(`/deployments/${t}/runs/${a}/cancel`, { method: "POST" });
}
async function R1(t, a) {
  return _t(`/deployments/${t}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function AT(t, a) {
  return _t(`/deployments/${t}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function Sf(t, a, s, i) {
  let o = () => {
  }, u = !1;
  return o = xT(
    `/deployments/${t}/runs/${a}/progress`,
    (f) => {
      s(f), f.type === "run_terminal" && !u && (u = !0, o());
    },
    i,
    void 0,
    TT
  ), o;
}
async function Zs(t) {
  return _t(`/voice-assets?deploymentId=${encodeURIComponent(t)}`);
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
async function kT(t, a) {
  await _t(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function DT(t, a, s) {
  return _t(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ displayName: s })
    }
  );
}
function zT(t) {
  if (!t.audioArtifactRef) return null;
  const a = new URLSearchParams({ deploymentId: t.deploymentId });
  return `${ha}/voice-assets/${encodeURIComponent(t.voiceAssetId)}/audio?${a.toString()}`;
}
async function OT(t) {
  return _t(`/workflow?deploymentId=${encodeURIComponent(t)}`);
}
var LT = "mux0i60", $T = "mux0i61", UT = "mux0i62", BT = "mux0i63";
function Gc({ count: t = "0", title: a, hint: s }) {
  return /* @__PURE__ */ c.jsxs("div", { className: LT, children: [
    /* @__PURE__ */ c.jsx("span", { className: $T, "aria-hidden": "true", children: t }),
    /* @__PURE__ */ c.jsx("h3", { className: UT, children: a }),
    s ? /* @__PURE__ */ c.jsx("p", { className: BT, children: s }) : null
  ] });
}
var IT = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, VT = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, qT = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, HT = "zwn3019";
function Ia({
  tone: t = "raised",
  density: a = "comfortable",
  elevation: s = "subtle",
  as: i = "section",
  children: o,
  className: u,
  style: f,
  ...p
}) {
  const y = [IT[t], qT[a], VT[s], u].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(i, { className: y, style: f, "data-elevation": s, ...p, children: o });
}
function FT({ children: t, className: a }) {
  const s = [HT, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: s, children: t });
}
var Jr = "vrkn5p0", PT = "_93p6291", GT = "_93p6292", YT = "_93p6293", KT = "_93p6294", XT = "_93p6295", QT = "_93p6296", ZT = "_93p6297", JT = "_93p6298", WT = "_93p6299", eR = "_93p629a", tR = "_93p629b", nR = "_93p629c", aR = "_93p629d", rR = "_93p629e";
const sR = "nexus-host-navigate";
function iR(t) {
  return `#/deployments/${encodeURIComponent(t)}`;
}
function lR(t, a) {
  if (t.defaultPrevented || t.button !== 0 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey)
    return;
  t.preventDefault();
  const s = {
    kind: "deployment-detail",
    deploymentId: a
  };
  window.dispatchEvent(
    new CustomEvent(sR, {
      detail: s
    })
  );
}
function oR() {
  const { deployments: t } = Rl(), a = t.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ c.jsxs("main", { className: PT, children: [
    /* @__PURE__ */ c.jsxs("header", { className: GT, children: [
      /* @__PURE__ */ c.jsx("p", { className: YT, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ c.jsxs("h1", { className: KT, children: [
        "Direct your characters.",
        /* @__PURE__ */ c.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: XT, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ c.jsxs("p", { className: QT, children: [
        /* @__PURE__ */ c.jsx("span", { className: ZT, children: t.length }),
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
        className: JT,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ c.jsx("h2", { id: "deployments-section-list", className: Jr, children: "01 / Deployments" }),
          t.length === 0 ? /* @__PURE__ */ c.jsx(
            Gc,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ c.jsx("ul", { className: WT, children: t.map((s) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
            "a",
            {
              href: iR(s.deploymentId),
              onClick: (i) => lR(i, s.deploymentId),
              className: eR,
              children: [
                /* @__PURE__ */ c.jsx("span", { className: tR, "aria-hidden": "true", children: cR(s.displayName) }),
                /* @__PURE__ */ c.jsxs("span", { children: [
                  /* @__PURE__ */ c.jsx("span", { className: nR, children: s.displayName }),
                  /* @__PURE__ */ c.jsx("span", { className: aR, children: s.deploymentId })
                ] }),
                /* @__PURE__ */ c.jsx("span", { className: rR, "aria-hidden": "true", children: "→" })
              ]
            }
          ) }, s.deploymentId)) })
        ]
      }
    )
  ] });
}
function cR(t) {
  const a = t.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
var Wh = Yx();
const uR = /* @__PURE__ */ Gx(Wh);
function dR(t) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], s = document.createElement("style");
  s.type = "text/css", a.appendChild(s), s.styleSheet ? s.styleSheet.cssText = t : s.appendChild(document.createTextNode(t));
}
const fR = (t) => {
  switch (t) {
    case "success":
      return pR;
    case "info":
      return vR;
    case "warning":
      return gR;
    case "error":
      return yR;
    default:
      return null;
  }
}, hR = Array(12).fill(0), mR = ({ visible: t, className: a }) => /* @__PURE__ */ we.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": t
}, /* @__PURE__ */ we.createElement("div", {
  className: "sonner-spinner"
}, hR.map((s, i) => /* @__PURE__ */ we.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${i}`
})))), pR = /* @__PURE__ */ we.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ we.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), gR = /* @__PURE__ */ we.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ we.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), vR = /* @__PURE__ */ we.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ we.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), yR = /* @__PURE__ */ we.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ we.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), bR = /* @__PURE__ */ we.createElement("svg", {
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
})), xR = () => {
  const [t, a] = we.useState(document.hidden);
  return we.useEffect(() => {
    const s = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", s), () => window.removeEventListener("visibilitychange", s);
  }, []), t;
};
let ih = 1;
class SR {
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
      const { message: i, ...o } = a, u = typeof a?.id == "number" || ((s = a.id) == null ? void 0 : s.length) > 0 ? a.id : ih++, f = this.toasts.find((y) => y.id === u), p = a.dismissible === void 0 ? !0 : a.dismissible;
      return this.dismissedToasts.has(u) && this.dismissedToasts.delete(u), f ? this.toasts = this.toasts.map((y) => y.id === u ? (this.publish({
        ...y,
        ...a,
        id: u,
        title: i
      }), {
        ...y,
        ...a,
        id: u,
        dismissible: p,
        title: i
      }) : y) : this.addToast({
        title: i,
        ...o,
        dismissible: p,
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
      const p = o.then(async (m) => {
        if (f = [
          "resolve",
          m
        ], we.isValidElement(m))
          u = !1, this.create({
            id: i,
            type: "default",
            message: m
          });
        else if (jR(m) && !m.ok) {
          u = !1;
          const v = typeof s.error == "function" ? await s.error(`HTTP error! status: ${m.status}`) : s.error, S = typeof s.description == "function" ? await s.description(`HTTP error! status: ${m.status}`) : s.description, j = typeof v == "object" && !we.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: i,
            type: "error",
            description: S,
            ...j
          });
        } else if (m instanceof Error) {
          u = !1;
          const v = typeof s.error == "function" ? await s.error(m) : s.error, S = typeof s.description == "function" ? await s.description(m) : s.description, j = typeof v == "object" && !we.isValidElement(v) ? v : {
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
          const v = typeof s.success == "function" ? await s.success(m) : s.success, S = typeof s.description == "function" ? await s.description(m) : s.description, j = typeof v == "object" && !we.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: i,
            type: "success",
            description: S,
            ...j
          });
        }
      }).catch(async (m) => {
        if (f = [
          "reject",
          m
        ], s.error !== void 0) {
          u = !1;
          const b = typeof s.error == "function" ? await s.error(m) : s.error, v = typeof s.description == "function" ? await s.description(m) : s.description, w = typeof b == "object" && !we.isValidElement(b) ? b : {
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
      }), y = () => new Promise((m, b) => p.then(() => f[0] === "reject" ? b(f[1]) : m(f[1])).catch(b));
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
const An = new SR(), wR = (t, a) => {
  const s = a?.id || ih++;
  return An.addToast({
    title: t,
    ...a,
    id: s
  }), s;
}, jR = (t) => t && typeof t == "object" && "ok" in t && typeof t.ok == "boolean" && "status" in t && typeof t.status == "number", ER = wR, NR = () => An.toasts, CR = () => An.getActiveToasts(), mn = Object.assign(ER, {
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
  getHistory: NR,
  getToasts: CR
});
dR("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Ko(t) {
  return t.label !== void 0;
}
const TR = 3, RR = "24px", _R = "16px", Wy = 4e3, MR = 356, AR = 14, kR = 45, DR = 200;
function xa(...t) {
  return t.filter(Boolean).join(" ");
}
function zR(t) {
  const [a, s] = t.split("-"), i = [];
  return a && i.push(a), s && i.push(s), i;
}
const OR = (t) => {
  var a, s, i, o, u, f, p, y, m;
  const { invert: b, toast: v, unstyled: S, interacting: w, setHeights: j, visibleToasts: C, heights: _, index: T, toasts: O, expanded: R, removeToast: N, defaultRichColors: U, closeButton: Y, style: ae, cancelButtonStyle: M, actionButtonStyle: V, className: D = "", descriptionClassName: H = "", duration: Q, position: J, gap: P, expandByDefault: ie, classNames: A, icons: q, closeButtonAriaLabel: $ = "Close toast" } = t, [te, fe] = we.useState(null), [k, ee] = we.useState(null), [re, G] = we.useState(!1), [B, W] = we.useState(!1), [ce, ye] = we.useState(!1), [Ae, lt] = we.useState(!1), [Ne, We] = we.useState(!1), [Be, Fe] = we.useState(0), [rn, qt] = we.useState(0), Mt = we.useRef(v.duration || Q || Wy), Ce = we.useRef(null), He = we.useRef(null), at = T === 0, xt = T + 1 <= C, ot = v.type, Ye = v.dismissible !== !1, pt = v.className || "", je = v.descriptionClassName || "", ke = we.useMemo(() => _.findIndex((ge) => ge.toastId === v.id) || 0, [
    _,
    v.id
  ]), Pe = we.useMemo(() => {
    var ge;
    return (ge = v.closeButton) != null ? ge : Y;
  }, [
    v.closeButton,
    Y
  ]), Xe = we.useMemo(() => v.duration || Q || Wy, [
    v.duration,
    Q
  ]), St = we.useRef(0), Ct = we.useRef(0), zn = we.useRef(0), Sn = we.useRef(null), [pn, Pt] = J.split("-"), kt = we.useMemo(() => _.reduce((ge, xe, K) => K >= ke ? ge : ge + xe.height, 0), [
    _,
    ke
  ]), Bt = xR(), sa = v.invert || b, wn = ot === "loading";
  Ct.current = we.useMemo(() => ke * P + kt, [
    ke,
    kt
  ]), we.useEffect(() => {
    Mt.current = Xe;
  }, [
    Xe
  ]), we.useEffect(() => {
    G(!0);
  }, []), we.useEffect(() => {
    const ge = He.current;
    if (ge) {
      const xe = ge.getBoundingClientRect().height;
      return qt(xe), j((K) => [
        {
          toastId: v.id,
          height: xe,
          position: v.position
        },
        ...K
      ]), () => j((K) => K.filter((ue) => ue.toastId !== v.id));
    }
  }, [
    j,
    v.id
  ]), we.useLayoutEffect(() => {
    if (!re) return;
    const ge = He.current, xe = ge.style.height;
    ge.style.height = "auto";
    const K = ge.getBoundingClientRect().height;
    ge.style.height = xe, qt(K), j((ue) => ue.find((_e) => _e.toastId === v.id) ? ue.map((_e) => _e.toastId === v.id ? {
      ..._e,
      height: K
    } : _e) : [
      {
        toastId: v.id,
        height: K,
        position: v.position
      },
      ...ue
    ]);
  }, [
    re,
    v.title,
    v.description,
    j,
    v.id,
    v.jsx,
    v.action,
    v.cancel
  ]);
  const cn = we.useCallback(() => {
    W(!0), Fe(Ct.current), j((ge) => ge.filter((xe) => xe.toastId !== v.id)), setTimeout(() => {
      N(v);
    }, DR);
  }, [
    v,
    N,
    j,
    Ct
  ]);
  we.useEffect(() => {
    if (v.promise && ot === "loading" || v.duration === 1 / 0 || v.type === "loading") return;
    let ge;
    return R || w || Bt ? (() => {
      if (zn.current < St.current) {
        const ue = (/* @__PURE__ */ new Date()).getTime() - St.current;
        Mt.current = Mt.current - ue;
      }
      zn.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      Mt.current !== 1 / 0 && (St.current = (/* @__PURE__ */ new Date()).getTime(), ge = setTimeout(() => {
        v.onAutoClose == null || v.onAutoClose.call(v, v), cn();
      }, Mt.current));
    })(), () => clearTimeout(ge);
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
    var ge;
    if (q?.loading) {
      var xe;
      return /* @__PURE__ */ we.createElement("div", {
        className: xa(A?.loader, v == null || (xe = v.classNames) == null ? void 0 : xe.loader, "sonner-loader"),
        "data-visible": ot === "loading"
      }, q.loading);
    }
    return /* @__PURE__ */ we.createElement(mR, {
      className: xa(A?.loader, v == null || (ge = v.classNames) == null ? void 0 : ge.loader),
      visible: ot === "loading"
    });
  }
  const It = v.icon || q?.[ot] || fR(ot);
  var he, Te;
  return /* @__PURE__ */ we.createElement("li", {
    tabIndex: 0,
    ref: He,
    className: xa(D, pt, A?.toast, v == null || (a = v.classNames) == null ? void 0 : a.toast, A?.default, A?.[ot], v == null || (s = v.classNames) == null ? void 0 : s[ot]),
    "data-sonner-toast": "",
    "data-rich-colors": (he = v.richColors) != null ? he : U,
    "data-styled": !(v.jsx || v.unstyled || S),
    "data-mounted": re,
    "data-promise": !!v.promise,
    "data-swiped": Ne,
    "data-removed": B,
    "data-visible": xt,
    "data-y-position": pn,
    "data-x-position": Pt,
    "data-index": T,
    "data-front": at,
    "data-swiping": ce,
    "data-dismissible": Ye,
    "data-type": ot,
    "data-invert": sa,
    "data-swipe-out": Ae,
    "data-swipe-direction": k,
    "data-expanded": !!(R || ie && re),
    "data-testid": v.testId,
    style: {
      "--index": T,
      "--toasts-before": T,
      "--z-index": O.length - T,
      "--offset": `${B ? Be : Ct.current}px`,
      "--initial-height": ie ? "auto" : `${rn}px`,
      ...ae,
      ...v.style
    },
    onDragEnd: () => {
      ye(!1), fe(null), Sn.current = null;
    },
    onPointerDown: (ge) => {
      ge.button !== 2 && (wn || !Ye || (Ce.current = /* @__PURE__ */ new Date(), Fe(Ct.current), ge.target.setPointerCapture(ge.pointerId), ge.target.tagName !== "BUTTON" && (ye(!0), Sn.current = {
        x: ge.clientX,
        y: ge.clientY
      })));
    },
    onPointerUp: () => {
      var ge, xe, K;
      if (Ae || !Ye) return;
      Sn.current = null;
      const ue = Number(((ge = He.current) == null ? void 0 : ge.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), Re = Number(((xe = He.current) == null ? void 0 : xe.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), _e = (/* @__PURE__ */ new Date()).getTime() - ((K = Ce.current) == null ? void 0 : K.getTime()), Ke = te === "x" ? ue : Re, Dt = Math.abs(Ke) / _e;
      if (Math.abs(Ke) >= kR || Dt > 0.11) {
        Fe(Ct.current), v.onDismiss == null || v.onDismiss.call(v, v), ee(te === "x" ? ue > 0 ? "right" : "left" : Re > 0 ? "down" : "up"), cn(), lt(!0);
        return;
      } else {
        var gt, z;
        (gt = He.current) == null || gt.style.setProperty("--swipe-amount-x", "0px"), (z = He.current) == null || z.style.setProperty("--swipe-amount-y", "0px");
      }
      We(!1), ye(!1), fe(null);
    },
    onPointerMove: (ge) => {
      var xe, K, ue;
      if (!Sn.current || !Ye || ((xe = window.getSelection()) == null ? void 0 : xe.toString().length) > 0) return;
      const _e = ge.clientY - Sn.current.y, Ke = ge.clientX - Sn.current.x;
      var Dt;
      const gt = (Dt = t.swipeDirections) != null ? Dt : zR(J);
      !te && (Math.abs(Ke) > 1 || Math.abs(_e) > 1) && fe(Math.abs(Ke) > Math.abs(_e) ? "x" : "y");
      let z = {
        x: 0,
        y: 0
      };
      const F = (Z) => 1 / (1.5 + Math.abs(Z) / 20);
      if (te === "y") {
        if (gt.includes("top") || gt.includes("bottom"))
          if (gt.includes("top") && _e < 0 || gt.includes("bottom") && _e > 0)
            z.y = _e;
          else {
            const Z = _e * F(_e);
            z.y = Math.abs(Z) < Math.abs(_e) ? Z : _e;
          }
      } else if (te === "x" && (gt.includes("left") || gt.includes("right")))
        if (gt.includes("left") && Ke < 0 || gt.includes("right") && Ke > 0)
          z.x = Ke;
        else {
          const Z = Ke * F(Ke);
          z.x = Math.abs(Z) < Math.abs(Ke) ? Z : Ke;
        }
      (Math.abs(z.x) > 0 || Math.abs(z.y) > 0) && We(!0), (K = He.current) == null || K.style.setProperty("--swipe-amount-x", `${z.x}px`), (ue = He.current) == null || ue.style.setProperty("--swipe-amount-y", `${z.y}px`);
    }
  }, Pe && !v.jsx && ot !== "loading" ? /* @__PURE__ */ we.createElement("button", {
    "aria-label": $,
    "data-disabled": wn,
    "data-close-button": !0,
    onClick: wn || !Ye ? () => {
    } : () => {
      cn(), v.onDismiss == null || v.onDismiss.call(v, v);
    },
    className: xa(A?.closeButton, v == null || (i = v.classNames) == null ? void 0 : i.closeButton)
  }, (Te = q?.close) != null ? Te : bR) : null, (ot || v.icon || v.promise) && v.icon !== null && (q?.[ot] !== null || v.icon) ? /* @__PURE__ */ we.createElement("div", {
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
    className: xa(H, je, A?.description, v == null || (p = v.classNames) == null ? void 0 : p.description)
  }, typeof v.description == "function" ? v.description() : v.description) : null), /* @__PURE__ */ we.isValidElement(v.cancel) ? v.cancel : v.cancel && Ko(v.cancel) ? /* @__PURE__ */ we.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: v.cancelButtonStyle || M,
    onClick: (ge) => {
      Ko(v.cancel) && Ye && (v.cancel.onClick == null || v.cancel.onClick.call(v.cancel, ge), cn());
    },
    className: xa(A?.cancelButton, v == null || (y = v.classNames) == null ? void 0 : y.cancelButton)
  }, v.cancel.label) : null, /* @__PURE__ */ we.isValidElement(v.action) ? v.action : v.action && Ko(v.action) ? /* @__PURE__ */ we.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: v.actionButtonStyle || V,
    onClick: (ge) => {
      Ko(v.action) && (v.action.onClick == null || v.action.onClick.call(v.action, ge), !ge.defaultPrevented && cn());
    },
    className: xa(A?.actionButton, v == null || (m = v.classNames) == null ? void 0 : m.actionButton)
  }, v.action.label) : null);
};
function e0() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const t = document.documentElement.getAttribute("dir");
  return t === "auto" || !t ? window.getComputedStyle(document.documentElement).direction : t;
}
function LR(t, a) {
  const s = {};
  return [
    t,
    a
  ].forEach((i, o) => {
    const u = o === 1, f = u ? "--mobile-offset" : "--offset", p = u ? _R : RR;
    function y(m) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((b) => {
        s[`${f}-${b}`] = typeof m == "number" ? `${m}px` : m;
      });
    }
    typeof i == "number" || typeof i == "string" ? y(i) : typeof i == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((m) => {
      i[m] === void 0 ? s[`${f}-${m}`] = p : s[`${f}-${m}`] = typeof i[m] == "number" ? `${i[m]}px` : i[m];
    }) : y(p);
  }), s;
}
const $R = /* @__PURE__ */ we.forwardRef(function(a, s) {
  const { id: i, invert: o, position: u = "bottom-right", hotkey: f = [
    "altKey",
    "KeyT"
  ], expand: p, closeButton: y, className: m, offset: b, mobileOffset: v, theme: S = "light", richColors: w, duration: j, style: C, visibleToasts: _ = TR, toastOptions: T, dir: O = e0(), gap: R = AR, icons: N, containerAriaLabel: U = "Notifications" } = a, [Y, ae] = we.useState([]), M = we.useMemo(() => i ? Y.filter((re) => re.toasterId === i) : Y.filter((re) => !re.toasterId), [
    Y,
    i
  ]), V = we.useMemo(() => Array.from(new Set([
    u
  ].concat(M.filter((re) => re.position).map((re) => re.position)))), [
    M,
    u
  ]), [D, H] = we.useState([]), [Q, J] = we.useState(!1), [P, ie] = we.useState(!1), [A, q] = we.useState(S !== "system" ? S : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), $ = we.useRef(null), te = f.join("+").replace(/Key/g, "").replace(/Digit/g, ""), fe = we.useRef(null), k = we.useRef(!1), ee = we.useCallback((re) => {
    ae((G) => {
      var B;
      return (B = G.find((W) => W.id === re.id)) != null && B.delete || An.dismiss(re.id), G.filter(({ id: W }) => W !== re.id);
    });
  }, []);
  return we.useEffect(() => An.subscribe((re) => {
    if (re.dismiss) {
      requestAnimationFrame(() => {
        ae((G) => G.map((B) => B.id === re.id ? {
          ...B,
          delete: !0
        } : B));
      });
      return;
    }
    setTimeout(() => {
      uR.flushSync(() => {
        ae((G) => {
          const B = G.findIndex((W) => W.id === re.id);
          return B !== -1 ? [
            ...G.slice(0, B),
            {
              ...G[B],
              ...re
            },
            ...G.slice(B + 1)
          ] : [
            re,
            ...G
          ];
        });
      });
    });
  }), [
    Y
  ]), we.useEffect(() => {
    if (S !== "system") {
      q(S);
      return;
    }
    if (S === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? q("dark") : q("light")), typeof window > "u") return;
    const re = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      re.addEventListener("change", ({ matches: G }) => {
        q(G ? "dark" : "light");
      });
    } catch {
      re.addListener(({ matches: B }) => {
        try {
          q(B ? "dark" : "light");
        } catch (W) {
          console.error(W);
        }
      });
    }
  }, [
    S
  ]), we.useEffect(() => {
    Y.length <= 1 && J(!1);
  }, [
    Y
  ]), we.useEffect(() => {
    const re = (G) => {
      var B;
      if (f.every((ye) => G[ye] || G.code === ye)) {
        var ce;
        J(!0), (ce = $.current) == null || ce.focus();
      }
      G.code === "Escape" && (document.activeElement === $.current || (B = $.current) != null && B.contains(document.activeElement)) && J(!1);
    };
    return document.addEventListener("keydown", re), () => document.removeEventListener("keydown", re);
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
    "aria-label": `${U} ${te}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, V.map((re, G) => {
    var B;
    const [W, ce] = re.split("-");
    return M.length ? /* @__PURE__ */ we.createElement("ol", {
      key: re,
      dir: O === "auto" ? e0() : O,
      tabIndex: -1,
      ref: $,
      className: m,
      "data-sonner-toaster": !0,
      "data-sonner-theme": A,
      "data-y-position": W,
      "data-x-position": ce,
      style: {
        "--front-toast-height": `${((B = D[0]) == null ? void 0 : B.height) || 0}px`,
        "--width": `${MR}px`,
        "--gap": `${R}px`,
        ...C,
        ...LR(b, v)
      },
      onBlur: (ye) => {
        k.current && !ye.currentTarget.contains(ye.relatedTarget) && (k.current = !1, fe.current && (fe.current.focus({
          preventScroll: !0
        }), fe.current = null));
      },
      onFocus: (ye) => {
        ye.target instanceof HTMLElement && ye.target.dataset.dismissible === "false" || k.current || (k.current = !0, fe.current = ye.relatedTarget);
      },
      onMouseEnter: () => J(!0),
      onMouseMove: () => J(!0),
      onMouseLeave: () => {
        P || J(!1);
      },
      onDragEnd: () => J(!1),
      onPointerDown: (ye) => {
        ye.target instanceof HTMLElement && ye.target.dataset.dismissible === "false" || ie(!0);
      },
      onPointerUp: () => ie(!1)
    }, M.filter((ye) => !ye.position && G === 0 || ye.position === re).map((ye, Ae) => {
      var lt, Ne;
      return /* @__PURE__ */ we.createElement(OR, {
        key: ye.id,
        icons: N,
        index: Ae,
        toast: ye,
        defaultRichColors: w,
        duration: (lt = T?.duration) != null ? lt : j,
        className: T?.className,
        descriptionClassName: T?.descriptionClassName,
        invert: o,
        visibleToasts: _,
        closeButton: (Ne = T?.closeButton) != null ? Ne : y,
        interacting: P,
        position: re,
        style: T?.style,
        unstyled: T?.unstyled,
        classNames: T?.classNames,
        cancelButtonStyle: T?.cancelButtonStyle,
        actionButtonStyle: T?.actionButtonStyle,
        closeButtonAriaLabel: T?.closeButtonAriaLabel,
        removeToast: ee,
        toasts: M.filter((We) => We.position == ye.position),
        heights: D.filter((We) => We.position == ye.position),
        setHeights: H,
        expandByDefault: p,
        gap: R,
        expanded: Q,
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
async function _1(t, a, s, i = {}) {
  const o = `/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, u = `${ha}${o}`, f = await fetch(u, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(s),
    ...i.signal ? { signal: i.signal } : {}
  });
  if (f.status === 409) {
    const p = await f.json().catch(() => null), y = p?.error?.current_digest ?? "", m = p?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Js(y, m);
  }
  if (!f.ok)
    throw new Error(await Yc(f, "apply"));
  return await f.json();
}
async function UR(t, a, s, i, o = {}) {
  const u = `/deployments/${encodeURIComponent(t)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(s)}/edit`, f = `${ha}${u}`, p = await fetch(f, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(i),
    ...o.signal ? { signal: o.signal } : {}
  });
  if (p.status === 409) {
    const y = await p.json().catch(() => null), m = y?.error?.current_digest ?? "", b = y?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Js(m, b);
  }
  if (!p.ok)
    throw new Error(await Yc(p, "apply"));
  return await p.json();
}
async function BR(t, a, s = {}) {
  const i = `${ha}/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, o = await fetch(i, {
    method: "DELETE",
    ...s.signal ? { signal: s.signal } : {}
  });
  if (!o.ok && o.status !== 204)
    throw new Error(`clear edit failed: ${o.status}`);
}
async function IR(t, a, s, i = {}) {
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
function M1(t, a) {
  if (t.version !== 1)
    return { message: "Unsupported chain version." };
  if (t.ops.length > t0)
    return {
      message: `Chain exceeds the maximum of ${t0} operations.`
    };
  for (const s of t.ops) {
    const i = VR(s, a);
    if (i) return i;
  }
  return null;
}
function VR(t, a) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return qR(t.id, t.start_ms, t.end_ms, a);
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
function qR(t, a, s, i) {
  return a < 0 ? { opId: t, message: "Start must be ≥ 0 ms." } : s <= a ? { opId: t, message: "End must be greater than start." } : i > 0 && s > i ? { opId: t, message: "End extends past source duration." } : null;
}
async function Yc(t, a) {
  const s = await t.json().catch(() => null);
  return s?.error?.message ?? s?.message ?? `${a} failed: ${t.status}`;
}
var HR = "g5r6d10", FR = "g5r6d11", PR = "g5r6d12", GR = "g5r6d13", YR = "g5r6d14", KR = "g5r6d15", XR = "g5r6d1a", QR = "g5r6d1b", ZR = "g5r6d1c", JR = "g5r6d1d", WR = "g5r6d1e", e_ = "g5r6d1g", t_ = "g5r6d1h", n_ = "g5r6d1i", a_ = "g5r6d1j", r_ = "g5r6d1k", s_ = "g5r6d1l", i_ = "g5r6d1m", l_ = "g5r6d1n", o_ = "g5r6d1o", m0 = "g5r6d1p", c_ = "g5r6d1q", u_ = "g5r6d1r", d_ = "g5r6d1s", f_ = "g5r6d1t", h_ = "g5r6d1u", p0 = "g5r6d1v", g0 = "g5r6d1w", m_ = "g5r6d1x", p_ = "g5r6d1y", br = "g5r6d1z", g_ = "g5r6d110", v0 = "g5r6d111", v_ = "g5r6d112", y_ = "g5r6d113", pr = "g5r6d114", b_ = "g5r6d119", x_ = "a6ki8u0", S_ = "a6ki8u1", w_ = "a6ki8u2", j_ = "a6ki8u3", E_ = "a6ki8u4", N_ = "a6ki8u5", C_ = "a6ki8u6", wf = "a6ki8u7", T_ = "a6ki8u8", R_ = "a6ki8u9", __ = "a6ki8ua", M_ = "a6ki8ub", A_ = "a6ki8uc", k_ = "a6ki8ud", D_ = "a6ki8ue", z_ = "a6ki8uf", O_ = "a6ki8ug", L_ = "a6ki8uh", $_ = "_1lguv7x0", U_ = "_1lguv7x1", B_ = "_1lguv7x2", I_ = "_1lguv7x3", V_ = "_1lguv7x4", y0 = "_1lguv7x5", q_ = "_1lguv7x6", H_ = "_1lguv7x7", F_ = "_1lguv7x8", P_ = "_1lguv7x9", G_ = "_1lguv7xa", Y_ = "_1lguv7xb", K_ = "_1lguv7xc", b0 = "_1lguv7xd", X_ = "_1lguv7xe", Q_ = "_1lguv7xf", Z_ = "_1lguv7xg", J_ = "_1lguv7xh", A1 = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, k1 = { xs: "_4ydn546", sm: "_4ydn547", md: "_4ydn548", lg: "_4ydn549" }, W_ = { xs: "_4ydn54a", sm: "_4ydn54b", md: "_4ydn54c", lg: "_4ydn54d" }, eM = "_4ydn54f";
function Ze({
  variant: t = "primary",
  size: a = "md",
  type: s = "button",
  loading: i = !1,
  iconOnly: o = !1,
  disabled: u,
  children: f,
  className: p,
  style: y,
  ...m
}) {
  const b = [
    A1[t],
    k1[a],
    o ? W_[a] : null,
    p
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsxs(
    "button",
    {
      type: s,
      className: b,
      style: y,
      disabled: i || u,
      "aria-busy": i || void 0,
      ...m,
      children: [
        i ? /* @__PURE__ */ c.jsx("span", { className: eM, "aria-hidden": "true" }) : null,
        f
      ]
    }
  );
}
const tM = 28;
function nM(t) {
  if (!t) return 1;
  let a = 0;
  for (let s = 0; s < Math.min(t.length, 12); s++)
    a = a * 33 + t.charCodeAt(s) >>> 0;
  return a || 1;
}
function aM(t, a) {
  const s = new Array(a);
  let i = t;
  for (let o = 0; o < a; o++) {
    i = (i * 9301 + 49297) % 233280;
    const u = i / 233280, f = Math.min(1, o / 6, (a - o) / 6);
    s[o] = Math.max(0.18, f * (0.32 + u * 0.68));
  }
  return s;
}
function rM(t) {
  if (t == null) return "—";
  const a = Math.max(0, Math.round(t / 1e3)), s = Math.floor(a / 60), i = a % 60;
  return `${s}:${i.toString().padStart(2, "0")}`;
}
function sM(t) {
  return t ? `${(t / 1e3).toFixed(t % 1e3 === 0 ? 0 : 1)} kHz` : "—";
}
function iM({
  asset: t,
  presentation: a,
  usedBy: s,
  isPlaying: i,
  onTogglePlay: o,
  onRename: u,
  onCopyName: f,
  onDelete: p,
  onCreateCharacter: y,
  onPlaybackEnded: m
}) {
  const [b, v] = g.useState(!1), [S, w] = g.useState(t.displayName), [j, C] = g.useState(!1), [_, T] = g.useState(t.displayName), O = g.useRef(null), R = g.useRef(null), N = g.useMemo(() => nM(t.contentSha256), [t.contentSha256]), U = g.useMemo(() => aM(N, tM), [N]), Y = g.useMemo(() => zT(t), [t]);
  g.useEffect(() => {
    w(t.displayName);
  }, [t.displayName]), g.useEffect(() => {
    const J = O.current;
    J && (i && Y ? J.play().catch(() => {
    }) : (J.pause(), J.currentTime = 0));
  }, [i, Y]);
  const ae = async () => {
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
  }, V = () => {
    const J = _.trim();
    if (!J) {
      R.current?.focus();
      return;
    }
    C(!1), y?.(J);
  }, D = () => {
    C(!1);
  }, H = () => {
    _.trim() ? V() : D();
  }, Q = `${rM(t.durationMs)} · ${sM(t.sampleRate)}`;
  return /* @__PURE__ */ c.jsxs("article", { className: $_, "data-playing": i ? "true" : "false", children: [
    /* @__PURE__ */ c.jsxs("header", { className: U_, children: [
      /* @__PURE__ */ c.jsx("span", { className: B_, "data-kind": a, "aria-hidden": "true", children: a === "upload" ? "▣" : "★" }),
      /* @__PURE__ */ c.jsxs("div", { className: I_, children: [
        b ? /* @__PURE__ */ c.jsx(
          "input",
          {
            className: y0,
            value: S,
            autoFocus: !0,
            onChange: (J) => w(J.target.value),
            onBlur: () => {
              ae();
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
            className: V_,
            onDoubleClick: () => v(!0),
            title: "Double-click to rename",
            children: t.displayName
          }
        ),
        /* @__PURE__ */ c.jsx("span", { className: q_, children: Q })
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: H_, "data-kind": a, children: a === "upload" ? "UPLOADED" : "PRESET" })
    ] }),
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: F_,
        "data-playing": i ? "true" : "false",
        disabled: Y == null,
        title: Y ? "Preview" : "Preview unavailable",
        onClick: o,
        "aria-label": i ? "Pause preview" : "Play preview",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: P_, "aria-hidden": "true", children: i ? "❚❚" : "▶" }),
          /* @__PURE__ */ c.jsx("span", { className: G_, "aria-hidden": "true", children: U.map((J, P) => /* @__PURE__ */ c.jsx("span", { className: Y_, style: { height: `${Math.round(J * 100)}%` } }, P)) })
        ]
      }
    ),
    /* @__PURE__ */ c.jsx("footer", { className: K_, children: j ? /* @__PURE__ */ c.jsxs("span", { style: { display: "flex", alignItems: "center", gap: 6, width: "100%" }, children: [
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
          onBlur: H,
          onKeyDown: (J) => {
            J.key === "Enter" ? (J.preventDefault(), V()) : J.key === "Escape" && D();
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
            className: X_,
            style: { color: J.color, borderColor: J.color },
            children: J.characterName
          },
          J.characterName
        ))
      ] }) : /* @__PURE__ */ c.jsx("span", { className: b0, children: "unassigned" }),
      /* @__PURE__ */ c.jsxs("span", { className: Q_, children: [
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
        p && /* @__PURE__ */ c.jsx(
          Ze,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            className: Z_,
            title: "Delete",
            "aria-label": "Delete voice",
            onClick: p,
            children: "✕"
          }
        )
      ] })
    ] }) }),
    Y && /* @__PURE__ */ c.jsx(
      "audio",
      {
        ref: O,
        src: Y,
        preload: "none",
        className: J_,
        onEnded: m
      }
    )
  ] });
}
var lM = "_17eol302", oM = "_17eol303", cM = "_17eol304", uM = "_17eol305", dM = "_17eol306", fM = "_17eol307", Xo = "_17eol308", hM = "_17eol309", mM = "_17eol30a", pM = "_17eol30b", gM = "_17eol30c", vM = "_17eol30d", x0 = "_17eol30e", yM = "_17eol30g";
function bM() {
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
function xM(t) {
  const a = Math.max(0, Math.floor(t / 1e3)), s = Math.floor(a / 60), i = a % 60;
  return `${s}:${i.toString().padStart(2, "0")}`;
}
function SM({
  open: t,
  defaultName: a,
  onClose: s,
  onSubmit: i
}) {
  const [o, u] = g.useState("idle"), [f, p] = g.useState(null), [y, m] = g.useState(0), [b, v] = g.useState(null), [S, w] = g.useState(a), [j, C] = g.useState(!1), _ = g.useRef(null), T = g.useRef(null), O = g.useRef([]), R = g.useRef(0), N = g.useRef(null), U = g.useRef(null), Y = g.useRef({ mime: "audio/webm", ext: "webm" }), ae = g.useRef(null), M = g.useRef(null), V = g.useRef(null);
  g.useEffect(() => {
    if (t)
      return V.current = document.activeElement ?? null, requestAnimationFrame(() => {
        ae.current?.scrollIntoView({ behavior: "smooth", block: "center" }), M.current?.focus();
      }), () => {
        V.current?.focus?.();
      };
  }, [t]), g.useEffect(() => {
    if (!t) return;
    const q = ($) => {
      $.key === "Escape" && s();
    };
    return window.addEventListener("keydown", q), () => window.removeEventListener("keydown", q);
  }, [t, s]);
  const D = g.useCallback(
    (q) => {
      if (q.key !== "Tab") return;
      const $ = ae.current;
      if (!$) return;
      const te = $.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (te.length === 0) return;
      const fe = te[0], k = te[te.length - 1], ee = document.activeElement;
      q.shiftKey ? (ee === fe || ee === $) && (q.preventDefault(), k.focus()) : ee === k && (q.preventDefault(), fe.focus());
    },
    []
  ), H = g.useCallback(() => {
    if (T.current) {
      for (const q of T.current.getTracks()) q.stop();
      T.current = null;
    }
    N.current != null && (window.clearInterval(N.current), N.current = null);
  }, []), Q = g.useCallback(() => {
    H(), b && URL.revokeObjectURL(b), v(null), O.current = [], U.current = null, m(0), p(null), u("idle");
  }, [b, H]);
  if (g.useEffect(() => {
    t || (Q(), w(a));
  }, [t, a, Q]), g.useEffect(() => () => {
    H(), b && URL.revokeObjectURL(b);
  }, [b, H]), !t) return null;
  const J = async () => {
    p(null), u("preparing");
    try {
      const q = await navigator.mediaDevices.getUserMedia({ audio: !0 });
      T.current = q;
      const $ = bM();
      Y.current = $;
      const te = $.mime ? new MediaRecorder(q, { mimeType: $.mime }) : new MediaRecorder(q);
      _.current = te, O.current = [], te.ondataavailable = (fe) => {
        fe.data && fe.data.size > 0 && O.current.push(fe.data);
      }, te.onstop = () => {
        const fe = $.mime || "audio/webm", k = new Blob(O.current, { type: fe }), ee = new File([k], `${S || a || "recording"}.${$.ext}`, {
          type: fe
        });
        U.current = ee;
        const re = URL.createObjectURL(k);
        v(re), u("ready"), H();
      }, te.start(), R.current = Date.now(), m(0), N.current = window.setInterval(() => {
        m(Date.now() - R.current);
      }, 200), u("recording");
    } catch (q) {
      const $ = q instanceof Error ? q.message : "could not access microphone";
      p($), u($.toLowerCase().includes("denied") ? "denied" : "error"), H();
    }
  }, P = () => {
    const q = _.current;
    q && q.state !== "inactive" && q.stop(), N.current != null && (window.clearInterval(N.current), N.current = null);
  }, ie = async () => {
    const q = U.current;
    if (!q) return;
    const $ = (S || a).trim();
    if (!$) {
      p("Name cannot be empty");
      return;
    }
    C(!0);
    try {
      await i(q, $), s();
    } catch (te) {
      p(te instanceof Error ? te.message : "upload failed");
    } finally {
      C(!1);
    }
  }, A = o === "recording" ? "REC" : o === "ready" ? "OK" : o === "preparing" ? "..." : "MIC";
  return /* @__PURE__ */ c.jsx("div", { className: lM, role: "presentation", onClick: s, children: /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: ae,
      className: oM,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "mic-recorder-heading",
      onClick: (q) => q.stopPropagation(),
      onKeyDown: D,
      tabIndex: -1,
      children: [
        /* @__PURE__ */ c.jsx("h2", { id: "mic-recorder-heading", className: cM, children: "Record reference audio" }),
        /* @__PURE__ */ c.jsx("p", { className: uM, children: "Speak the reference line into your microphone. 4–30 seconds is recommended for clean conditioning." }),
        /* @__PURE__ */ c.jsx(
          "span",
          {
            className: dM,
            "data-state": o === "recording" ? "recording" : o === "ready" ? "ready" : "idle",
            "aria-hidden": "true",
            children: A
          }
        ),
        /* @__PURE__ */ c.jsx("div", { className: gM, "aria-live": "polite", children: xM(y) }),
        /* @__PURE__ */ c.jsxs("div", { className: fM, children: [
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
                Q();
              },
              children: "↺ Re-record"
            }
          )
        ] }),
        b && /* @__PURE__ */ c.jsx("audio", { className: vM, src: b, controls: !0, preload: "auto" }),
        /* @__PURE__ */ c.jsxs("label", { className: hM, children: [
          /* @__PURE__ */ c.jsx("span", { children: "Voice name" }),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              className: mM,
              value: S,
              onChange: (q) => w(q.target.value),
              placeholder: a
            }
          )
        ] }),
        f && /* @__PURE__ */ c.jsx("div", { className: pM, children: f }),
        /* @__PURE__ */ c.jsxs("div", { className: yM, children: [
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
function wM({
  deploymentId: t,
  voiceAssets: a,
  mappings: s,
  characterColors: i,
  onVoiceAssetsChange: o,
  onCreateCharacterFromVoice: u
}) {
  const [f, p] = g.useState(""), [y, m] = g.useState("all"), [b, v] = g.useState(!1), [S, w] = g.useState(null), [j, C] = g.useState(!1), [_, T] = g.useState(!1), O = g.useRef(null), R = g.useCallback(
    (P) => "upload",
    []
  ), N = g.useMemo(() => {
    const P = f.trim().toLowerCase();
    return a.filter((ie) => {
      const A = R(ie);
      return !(y === "uploaded" && A !== "upload" || y === "preset" && A !== "preset" || P && !ie.displayName.toLowerCase().includes(P));
    });
  }, [a, f, y, R]), U = g.useMemo(
    () => a.filter((P) => R(P) === "upload").length,
    [a, R]
  ), Y = g.useCallback(
    (P) => {
      const ie = [], A = /* @__PURE__ */ new Set();
      for (const q of s)
        q.speakerVoiceAssetId === P && (A.has(q.characterName) || (A.add(q.characterName), ie.push({
          characterName: q.characterName,
          // audit-allow: hex — neon decorative palette per design lang
          color: i[q.characterName] ?? "#ba9eff"
        })));
      return ie;
    },
    [s, i]
  ), ae = g.useCallback(
    async (P) => {
      const ie = Array.from(P).slice(0, 8);
      if (ie.length !== 0) {
        T(!0);
        try {
          const A = [];
          for (const q of ie) {
            if (!q.type.startsWith("audio/") && !/\.(wav|mp3|flac|ogg|m4a|webm)$/i.test(q.name)) {
              mn.error(`${q.name}: not an audio file`);
              continue;
            }
            const $ = q.name.replace(/\.[^.]+$/, "");
            try {
              const te = await Tc(t, q, $, "speaker");
              A.push(te), mn.success(`Added ${te.displayName}`);
            } catch (te) {
              mn.error(te instanceof Error ? te.message : `${q.name}: upload failed`);
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
    P.preventDefault(), v(!1), P.dataTransfer?.files && ae(P.dataTransfer.files);
  }, V = g.useCallback(async () => {
    const P = window.prompt("Paste an audio URL (https://…)");
    if (P)
      try {
        const ie = await fetch(P);
        if (!ie.ok) throw new Error(`fetch failed: ${ie.status}`);
        const A = await ie.blob(), q = P.split("/").pop()?.split("?")[0] ?? "voice.wav", $ = new File([A], q, { type: A.type || "audio/wav" });
        await ae([$]);
      } catch (ie) {
        mn.error(ie instanceof Error ? ie.message : "could not fetch URL");
      }
  }, [ae]), D = g.useCallback(
    async (P, ie) => {
      try {
        const A = await DT(t, P, ie);
        o(
          a.map((q) => q.voiceAssetId === P ? A : q)
        ), mn.success(`Renamed to ${A.displayName}`);
      } catch (A) {
        mn.error(A instanceof Error ? A.message : "rename failed");
      }
    },
    [t, a, o]
  ), H = g.useCallback((P) => {
    navigator.clipboard?.writeText ? (navigator.clipboard.writeText(P), mn.success("Copied name")) : mn.error("Clipboard unavailable");
  }, []), Q = g.useCallback(
    async (P) => {
      if (window.confirm(`Delete "${P.displayName}"? Mappings using it will reset.`))
        try {
          await kT(t, P.voiceAssetId), o(a.filter((A) => A.voiceAssetId !== P.voiceAssetId)), mn.success(`Deleted ${P.displayName}`);
        } catch (A) {
          mn.error(A instanceof Error ? A.message : "delete failed");
        }
    },
    [t, a, o]
  );
  return /* @__PURE__ */ c.jsxs("div", { className: x_, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: S_,
        "data-over": b ? "true" : "false",
        onDragOver: (P) => {
          P.preventDefault(), v(!0);
        },
        onDragLeave: () => v(!1),
        onDrop: M,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: w_, "aria-hidden": "true", children: "⇪" }),
          /* @__PURE__ */ c.jsxs("div", { className: j_, children: [
            /* @__PURE__ */ c.jsxs("div", { className: E_, children: [
              "Drop reference audio to add a voice",
              /* @__PURE__ */ c.jsx("span", { className: N_, children: ".wav · .mp3 · .flac · .ogg · 4–30s recommended" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: C_, children: [
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
              loading: _,
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
              className: L_,
              onChange: (P) => {
                P.target.files && (ae(P.target.files), P.target.value = "");
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: T_, children: [
      /* @__PURE__ */ c.jsxs("label", { className: R_, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "⌕" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            className: __,
            value: f,
            onChange: (P) => p(P.target.value),
            placeholder: "Search voices…",
            "aria-label": "Search voices"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: M_, role: "group", "aria-label": "Filter voices", children: [
        ["all", "All"],
        ["uploaded", "Uploaded"],
        ["preset", "Built-in"]
      ].map(([P, ie]) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: A_,
          "data-active": y === P ? "true" : "false",
          onClick: () => m(P),
          children: ie
        },
        P
      )) }),
      /* @__PURE__ */ c.jsxs("span", { className: z_, children: [
        /* @__PURE__ */ c.jsx("span", { className: O_, children: a.length }),
        " voices",
        /* @__PURE__ */ c.jsx("span", { children: "·" }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          U,
          " uploaded"
        ] })
      ] })
    ] }),
    N.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: D_, children: a.length === 0 ? "No voices yet. Drop audio above or record from your microphone." : "No voices match this filter." }) : /* @__PURE__ */ c.jsx("div", { className: k_, children: N.map((P) => {
      const ie = R(P);
      return /* @__PURE__ */ c.jsx(
        iM,
        {
          asset: P,
          presentation: ie,
          usedBy: Y(P.voiceAssetId),
          isPlaying: S === P.voiceAssetId,
          onTogglePlay: () => w((A) => A === P.voiceAssetId ? null : P.voiceAssetId),
          onPlaybackEnded: () => w(null),
          onRename: (A) => D(P.voiceAssetId, A),
          onCopyName: () => H(P.displayName),
          onDelete: ie === "upload" ? () => void Q(P) : void 0,
          onCreateCharacter: u ? (A) => u(P, A) : void 0
        },
        P.voiceAssetId
      );
    }) }),
    /* @__PURE__ */ c.jsx(
      SM,
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
async function jM(t) {
  return _t(`/presets?deploymentId=${encodeURIComponent(t)}`);
}
async function EM(t, a, s) {
  return _t("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: t, presetName: a, vector: s })
  });
}
async function NM(t, a) {
  await _t(
    `/presets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
var S0 = "_190jlds0", CM = "_190jlds1", TM = "_190jlds2", RM = "_190jlds3", _M = "_190jlds4", MM = "_190jlds5", AM = "_190jlds6", kM = "_190jlds7", DM = "_190jlds8", zM = "_190jlds9", w0 = "_190jldsa", OM = "_190jldsb", j0 = "_190jldsc", LM = "_190jldsd", $M = "_190jldse", UM = "_190jldsf";
function BM({
  deploymentId: t,
  targets: a,
  onRevertToIdentity: s,
  onRevertToChain: i,
  emptyHint: o
}) {
  const [u, f] = g.useState(() => Bs(a[0])), [p, y] = g.useState([]), [m, b] = g.useState(!1), [v, S] = g.useState(null), [w, j] = g.useState(!1), [C, _] = g.useState(null), T = g.useMemo(
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
    return b(!0), S(null), bc(t, T.kind, T.id, 50).then((U) => {
      N || y(U.entries);
    }).catch((U) => {
      N || S(U instanceof Error ? U.message : "audit fetch failed");
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
      entries: p
    }, U = new Blob([JSON.stringify(N, null, 2)], {
      type: "application/json"
    }), Y = URL.createObjectURL(U), ae = document.createElement("a");
    ae.href = Y, ae.download = `audit-${T.kind}-${T.id}-${Date.now()}.json`, document.body.appendChild(ae), ae.click(), document.body.removeChild(ae), URL.revokeObjectURL(Y);
  }, [t, p, T]), R = g.useCallback(async () => {
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
    /* @__PURE__ */ c.jsxs("header", { className: CM, children: [
      /* @__PURE__ */ c.jsxs("div", { className: TM, children: [
        /* @__PURE__ */ c.jsx("label", { htmlFor: "audit-target-select", className: w0, children: "Target" }),
        /* @__PURE__ */ c.jsx(
          "select",
          {
            id: "audit-target-select",
            className: RM,
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
      /* @__PURE__ */ c.jsxs("div", { className: _M, children: [
        /* @__PURE__ */ c.jsx(
          Ze,
          {
            variant: "ghost",
            size: "sm",
            onClick: O,
            disabled: p.length === 0 || m,
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
    v && /* @__PURE__ */ c.jsx("div", { className: $M, children: v }),
    m && !v && /* @__PURE__ */ c.jsx("div", { className: UM, "aria-live": "polite", children: "Loading edit history…" }),
    !m && !v && p.length === 0 && /* @__PURE__ */ c.jsxs("p", { className: j0, children: [
      "No edits recorded for this target yet.",
      /* @__PURE__ */ c.jsx("br", {}),
      /* @__PURE__ */ c.jsx("span", { className: LM, children: "Apply a chain in the editor to populate the history." })
    ] }),
    !m && !v && p.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: MM, children: p.map((N) => {
      const U = i && T && !!N.chain_snapshot_json && N.operation_count > 0;
      return /* @__PURE__ */ c.jsxs("li", { className: AM, children: [
        /* @__PURE__ */ c.jsx("span", { className: kM, children: IM(N.recorded_at) }),
        /* @__PURE__ */ c.jsx("span", { className: DM, children: N.operation_count === 0 ? "cleared" : `${N.operation_count} ops` }),
        /* @__PURE__ */ c.jsxs("span", { className: zM, title: N.digest_after, children: [
          N.digest_after.slice(0, 12),
          "…"
        ] }),
        /* @__PURE__ */ c.jsx("span", { className: w0, children: N.actor || "—" }),
        /* @__PURE__ */ c.jsx(
          "span",
          {
            className: OM,
            style: {
              background: `color-mix(in oklab, ${N.operation_count === 0 ? "var(--error)" : "var(--accent)"} 14%, transparent)`,
              color: N.operation_count === 0 ? "var(--error)" : "var(--accent)"
            },
            children: N.digest_before === "" || !N.digest_before ? "create" : N.operation_count === 0 ? "clear" : "update"
          }
        ),
        U && /* @__PURE__ */ c.jsx(
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
                  const Y = await bc(
                    t,
                    T.kind,
                    T.id,
                    50
                  );
                  y(Y.entries);
                } catch (Y) {
                  S(Y instanceof Error ? Y.message : "revert failed");
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
function IM(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var VM = "_1uzgubz0", qM = "_1uzgubz1", HM = "_1uzgubz2", FM = "_1uzgubz3", PM = "_1uzgubz4", GM = "_1uzgubz5", YM = "_1uzgubz6", KM = "_1uzgubz7", E0 = "_1uzgubz8", XM = "_1uzgubz9", D1 = "_1uzgubza", z1 = "_1uzgubzb", QM = "_1uzgubzc", ZM = "_1uzgubzd", Qo = "_1uzgubze", Zo = "_1uzgubzf", JM = "_1uzgubzg", WM = "_1uzgubzh", N0 = "_1uzgubzi", C0 = "_1uzgubzj", T0 = "_1uzgubzk", R0 = "_1uzgubzl", _0 = "_1uzgubzm", e2 = "_1uzgubzn", t2 = "_1uzgubzo", n2 = "_1uzgubzp", a2 = "_1uzgubzq";
function r2({
  characterName: t,
  color: a,
  lineCount: s,
  mapping: i,
  voiceAssets: o,
  presets: u,
  active: f,
  onToggle: p,
  onAssignVoiceAsset: y,
  onAssignPreset: m,
  onUploadFile: b,
  onClearMapping: v,
  onRename: S
}) {
  const [w, j] = g.useState(!1), C = i ? o.find((R) => R.voiceAssetId === i.speakerVoiceAssetId) : null, _ = i?.defaultVectorPresetId ? u.find((R) => R.presetId === i.defaultVectorPresetId) ?? null : null, T = (t[0] ?? "?").toUpperCase(), O = i !== null;
  return /* @__PURE__ */ c.jsxs("div", { className: `${VM}${f ? ` ${qM}` : ""}`, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: HM,
        onClick: p,
        "aria-expanded": f,
        children: [
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: FM,
              style: {
                background: `color-mix(in oklab, ${a} 22%, transparent)`,
                color: a
              },
              children: T
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: PM, children: [
            /* @__PURE__ */ c.jsx("span", { className: GM, style: { color: a }, children: t }),
            /* @__PURE__ */ c.jsxs("span", { className: YM, children: [
              s,
              " lines"
            ] })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: KM, children: [
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
            i?.voiceAssetChainDigest && /* @__PURE__ */ c.jsxs("span", { className: QM, children: [
              "chain · ",
              i.voiceAssetChainDigest.slice(0, 8)
            ] })
          ] }),
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: `${XM} ${O ? D1 : z1}`,
              children: O ? "Mapped" : "Unmapped"
            }
          )
        ]
      }
    ),
    f && /* @__PURE__ */ c.jsxs("div", { className: ZM, children: [
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
            className: `${JM}${w ? ` ${WM}` : ""}`,
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
      u.length > 0 && m && /* @__PURE__ */ c.jsxs("div", { className: Qo, children: [
        /* @__PURE__ */ c.jsx("span", { className: Zo, children: "Preset voices" }),
        /* @__PURE__ */ c.jsx("div", { className: N0, children: u.map((R) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: `${C0}${i?.defaultVectorPresetId === R.presetId ? ` ${T0}` : ""}`,
            onClick: () => m(R.presetId),
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
function s2({
  unmappedCount: t,
  totalCount: a,
  children: s,
  emptyHint: i
}) {
  if (a === 0)
    return /* @__PURE__ */ c.jsx("p", { className: a2, children: i ?? "Add at least one tagged dialogue line to populate the cast." });
  const o = t === 0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx("header", { className: e2, children: /* @__PURE__ */ c.jsx(
      "span",
      {
        className: `${t2} ${o ? D1 : z1}`,
        children: o ? `All ${a} mapped` : `${t} of ${a} unmapped`
      }
    ) }),
    /* @__PURE__ */ c.jsx("ul", { className: n2, children: s })
  ] });
}
async function yl() {
  return _t("/runtime/health");
}
async function i2(t, a) {
  const s = {};
  t != null && (s.numWorkers = t), a != null && (s.warmup = a), await _t("/runtime/start", {
    method: "POST",
    ...Object.keys(s).length > 0 ? { body: JSON.stringify(s) } : {}
  });
}
async function l2() {
  return _t("/runtime/stop", { method: "POST" });
}
function O1(t) {
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
let L1 = 1;
function o2() {
  return L1;
}
function A0(t) {
  L1 = Number.isFinite(t) ? Math.max(1, Math.floor(t)) : 1;
}
//! Whether the next runtime start should warm (preload models on) all active
//! workers. Default on; the header's "Preload models on start" toggle and the
let $1 = !0;
function U1() {
  return $1;
}
function c2(t) {
  $1 = t;
}
var u2 = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function kn({
  severity: t,
  children: a,
  role: s,
  ariaLive: i,
  className: o,
  style: u
}) {
  const f = [u2[t], o].filter(Boolean).join(" "), p = s ?? (t === "error" ? "alert" : "status"), y = i ?? (t === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ c.jsx("div", { className: f, role: p, "aria-live": y, style: u, children: a });
}
var B1 = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, I1 = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, d2 = "_13bb4njb";
function Er({
  tone: t,
  size: a = "sm",
  pulse: s = !1,
  children: i,
  className: o,
  style: u,
  title: f
}) {
  const p = s && t !== "faint", y = [B1[a], I1[t], p ? d2 : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("span", { className: y, style: u, title: f, children: i });
}
const f2 = 4e3;
function h2({ deployment: t }) {
  const [a, s] = g.useState(null), [i, o] = g.useState(null), [u, f] = g.useState(1), p = g.useState({ done: !1 })[0], [y, m] = g.useState(U1());
  g.useEffect(() => {
    let T = !1;
    const O = async () => {
      try {
        const N = await yl();
        T || (s(N), o(null));
      } catch (N) {
        T || o(S2(N));
      }
    };
    O();
    const R = setInterval(O, f2);
    return () => {
      T = !0, clearInterval(R);
    };
  }, []), g.useEffect(() => {
    const T = a?.workersActive;
    T != null && !p.done && (p.done = !0, f(T), A0(T));
  }, [a?.workersActive, p]);
  const b = a?.badge ?? "not_installed", v = i?.includes("model_missing") ?? !1, S = a?.workersCeiling ?? 1, w = a?.workersActive ?? 1, j = b === "ready" || b === "running" || b === "starting", C = a?.workersWarming ?? 0, _ = a?.workersWarm ?? 0;
  return /* @__PURE__ */ c.jsxs("output", { className: g_, "aria-live": "polite", children: [
    /* @__PURE__ */ c.jsx("span", { className: br, children: "Runtime" }),
    /* @__PURE__ */ c.jsx("span", { children: t.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ c.jsx("span", { className: br, children: "Badge" }),
    /* @__PURE__ */ c.jsx(Er, { tone: b2(b), pulse: b === "starting" || b === "installing", children: O1(b) }),
    C > 0 && /* @__PURE__ */ c.jsxs("span", { style: y2, children: [
      "Warming ",
      _,
      "/",
      w,
      "…"
    ] }),
    a && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("span", { className: br, children: "Uptime" }),
      /* @__PURE__ */ c.jsx("span", { children: x2(a.uptimeSeconds) }),
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
      /* @__PURE__ */ c.jsxs("span", { style: m2, children: [
        /* @__PURE__ */ c.jsx(
          "select",
          {
            value: u,
            "aria-label": "Concurrent workers for the next runtime start",
            onChange: (T) => {
              const O = Number(T.target.value);
              f(O), A0(O);
            },
            style: p2,
            children: Array.from({ length: S }, (T, O) => O + 1).map((T) => /* @__PURE__ */ c.jsx("option", { value: T, children: T }, T))
          }
        ),
        /* @__PURE__ */ c.jsx("span", { style: k0, children: j && u !== w ? `restart to apply · active ${w}` : `~${u}× model VRAM` })
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: br, children: "Preload" }),
      /* @__PURE__ */ c.jsxs("label", { style: g2, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: y,
            "aria-label": "Preload models on start",
            onChange: (T) => {
              const O = T.target.checked;
              m(O), c2(O);
            },
            style: v2
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
const m2 = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8
}, p2 = {
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
}, g2 = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  cursor: "pointer"
}, v2 = {
  width: 14,
  height: 14,
  margin: 0,
  cursor: "pointer",
  accentColor: "var(--accent, #ba9eff)"
}, y2 = {
  fontSize: 11,
  color: "var(--on-surface-variant, #c4c7c5)",
  fontFamily: "var(--font-mono)"
};
function b2(t) {
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
function x2(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${t % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function S2(t) {
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
function w2(t, a, s) {
  for (const i of Object.keys(Rc)) {
    const o = Rc[i];
    if (Math.abs(o.low - t) < Va && Math.abs(o.mid - a) < Va && Math.abs(o.high - s) < Va)
      return i;
  }
  return "custom";
}
function j2(t) {
  let a = N2();
  for (const s of t.ops)
    a = E2(a, s);
  return a;
}
function E2(t, a) {
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
          preset: w2(a.low_db, a.mid_db, a.high_db)
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
function N2() {
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
function C2(t, a) {
  const s = Tr(t, "gain");
  if (Math.abs(a) < Va) return { ...t, ops: s };
  const i = { id: Dn(), mode: "gain", gain_db: a };
  return { ...t, ops: Rr(s, i) };
}
function T2(t, a, s, i) {
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
function R2(t, a) {
  const s = Tr(t, "speed");
  if (Math.abs(a - 1) < Va) return { ...t, ops: s };
  const i = { id: Dn(), mode: "speed", factor: a };
  return { ...t, ops: Rr(s, i) };
}
function _2(t, a) {
  const s = Tr(t, "pitch_shift");
  if (Math.abs(a) < Va) return { ...t, ops: s };
  const i = {
    id: Dn(),
    mode: "pitch_shift",
    semitones: a
  };
  return { ...t, ops: Rr(s, i) };
}
function M2(t, a, s) {
  const i = Tr(t, "normalize");
  if (a === "off") return { ...t, ops: i };
  const o = {
    id: Dn(),
    mode: "normalize",
    target_lufs: s
  };
  return { ...t, ops: Rr(i, o) };
}
function A2(t, a) {
  const s = Tr(t, "fade_in");
  if (a <= 0) return { ...t, ops: s };
  const i = {
    id: Dn(),
    mode: "fade_in",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Rr(s, i) };
}
function k2(t, a) {
  const s = Tr(t, "fade_out");
  if (a <= 0) return { ...t, ops: s };
  const i = {
    id: Dn(),
    mode: "fade_out",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Rr(s, i) };
}
function D2(t, a, s) {
  const i = Tr(t, "silence_strip");
  if (!a) return { ...t, ops: i };
  const o = {
    id: Dn(),
    mode: "silence_strip",
    threshold_db: s
  };
  return { ...t, ops: Rr(i, o) };
}
const V1 = /* @__PURE__ */ new Set([
  "gain",
  "eq3",
  "speed",
  "pitch_shift",
  "normalize",
  "fade_in",
  "fade_out",
  "silence_strip"
]);
function q1(t, a) {
  const s = {
    ...t,
    ops: t.ops.filter((u) => !V1.has(u.mode))
  };
  let o = C2({ version: 1, ops: [] }, a.volumeDb);
  return o = T2(
    o,
    a.eq3.low,
    a.eq3.mid,
    a.eq3.high
  ), a.speed.mode === "audio" && (o = R2(o, a.speed.value)), o = _2(o, a.pitchSt), o = M2(
    o,
    a.normalize.mode === "off" ? "off" : "loudness",
    a.normalize.targetDbOrLufs
  ), o = A2(o, a.fade.inS), o = k2(o, a.fade.outS), o = D2(
    o,
    a.silence.enabled,
    a.silence.thresholdDb
  ), { ...s, ops: [...s.ops, ...o.ops] };
}
function H1(t) {
  const a = {
    ...t,
    ops: t.ops.filter((s) => V1.has(s.mode))
  };
  return j2(a);
}
var z2 = "_1rsa80i0", O2 = "_1rsa80i1", L2 = "_1rsa80i2", $2 = "_1rsa80i3", U2 = "_1rsa80i4", B2 = "_1rsa80i5", I2 = "_1rsa80i6", V2 = "_1rsa80i7", q2 = "_1rsa80i8", H2 = "_1rsa80i9";
const F1 = ["flat", "warm", "bright", "voice", "telephone"], tl = -12, Jo = 12, F2 = 0.5;
function P2(t) {
  const { low: a, mid: s, high: i, preset: o, onChange: u, disabled: f } = t, p = (m) => {
    const b = Rc[m];
    u(b.low, b.mid, b.high, m);
  }, y = (m, b) => {
    const v = { low: a, mid: s, high: i, [m]: b }, S = Y2(v.low, v.mid, v.high);
    u(v.low, v.mid, v.high, S);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: z2, children: [
    /* @__PURE__ */ c.jsxs("div", { className: O2, role: "group", "aria-label": "EQ presets", children: [
      F1.map((m) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: L2,
          "data-active": o === m,
          onClick: () => p(m),
          disabled: f,
          children: m
        },
        m
      )),
      o === "custom" ? /* @__PURE__ */ c.jsx("span", { className: $2, children: "custom" }) : null
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: U2, children: [
      /* @__PURE__ */ c.jsx(
        jf,
        {
          label: "Low",
          value: a,
          onChange: (m) => y("low", m),
          disabled: f
        }
      ),
      /* @__PURE__ */ c.jsx(
        jf,
        {
          label: "Mid",
          value: s,
          onChange: (m) => y("mid", m),
          disabled: f
        }
      ),
      /* @__PURE__ */ c.jsx(
        jf,
        {
          label: "High",
          value: i,
          onChange: (m) => y("high", m),
          disabled: f
        }
      )
    ] })
  ] });
}
function jf({ label: t, value: a, onChange: s, disabled: i }) {
  const o = (a - tl) / (Jo - tl) * 100, u = g.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: B2, children: [
    /* @__PURE__ */ c.jsx("label", { htmlFor: u, className: I2, children: t }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: u,
        type: "range",
        min: tl,
        max: Jo,
        step: F2,
        value: a,
        disabled: i,
        className: q2,
        style: { "--fill": `${o}%` },
        onChange: (f) => s(Number(f.target.value)),
        "aria-valuemin": tl,
        "aria-valuemax": Jo,
        "aria-valuenow": a
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: V2, children: G2(a) }),
    /* @__PURE__ */ c.jsxs("span", { className: H2, "aria-hidden": "true", children: [
      /* @__PURE__ */ c.jsx("span", { children: tl }),
      /* @__PURE__ */ c.jsx("span", { children: "0" }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        "+",
        Jo
      ] })
    ] })
  ] });
}
function G2(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
const Ef = 1e-3;
function Y2(t, a, s) {
  for (const i of F1) {
    const o = Rc[i];
    if (Math.abs(o.low - t) < Ef && Math.abs(o.mid - a) < Ef && Math.abs(o.high - s) < Ef)
      return i;
  }
  return "custom";
}
var K2 = "_85bhwb0", X2 = "_85bhwb1", D0 = "_85bhwb2", Q2 = "_85bhwb3", Z2 = "_85bhwb4", J2 = "_85bhwb5", W2 = "_85bhwb6", eA = "_85bhwb7";
const Wo = 0.5, Nf = 2, tA = 0.05;
function nA(t) {
  const { mode: a, value: s, supportsSynthSpeed: i, onChange: o, onReRenderAtSynthTime: u, disabled: f } = t, p = (s - Wo) / (Nf - Wo) * 100, y = g.useId(), m = (v) => o(v, s), b = (v) => o(a, v);
  return /* @__PURE__ */ c.jsxs("div", { className: K2, children: [
    i ? /* @__PURE__ */ c.jsxs("div", { className: X2, role: "group", "aria-label": "Speed mode", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: D0,
          "data-active": a === "audio",
          onClick: () => m("audio"),
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
          onClick: () => m("synth"),
          disabled: f,
          children: "Synth"
        }
      )
    ] }) : null,
    /* @__PURE__ */ c.jsxs("div", { className: Q2, children: [
      /* @__PURE__ */ c.jsx(
        "input",
        {
          id: y,
          type: "range",
          min: Wo,
          max: Nf,
          step: tA,
          value: s,
          disabled: f,
          className: Z2,
          style: { "--fill": `${p}%` },
          onChange: (v) => b(Number(v.target.value)),
          "aria-valuemin": Wo,
          "aria-valuemax": Nf,
          "aria-valuenow": s,
          "aria-label": "Speed factor"
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: J2, children: `${s.toFixed(2)}×` })
    ] }),
    a === "synth" && i ? /* @__PURE__ */ c.jsxs("div", { className: W2, children: [
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
      /* @__PURE__ */ c.jsx("span", { className: eA, children: "Synth-time speed re-runs the worker for new utterances." })
    ] }) : null
  ] });
}
var aA = "kgszk50", rA = "kgszk51", z0 = "kgszk52", sA = "kgszk53", iA = "kgszk54", P1 = "kgszk55", lA = "kgszk56", oA = "kgszk58", em = "kgszk59", G1 = "kgszk5a", tm = "kgszk5b", cA = "kgszk5c", uA = "kgszk5d", dA = "kgszk5e", O0 = "kgszk5f", L0 = "kgszk5g", $0 = "kgszk5h", fA = "kgszk5i", hA = "kgszk5j", mA = "kgszk5l", bl = "kgszk5m", xl = "kgszk5n";
const pA = -24, gA = 24, vA = 0.5, yA = -12, bA = 12, xA = 0.5, SA = -30, wA = -6, jA = -12, EA = 0, ec = -60, Cf = -20;
function nm(t) {
  const {
    state: a,
    onChange: s,
    supportsSynthSpeed: i,
    onReRenderAtSynthTime: o,
    onSliderFlush: u,
    pendingExecution: f = !1,
    disabled: p = !1,
    onApply: y,
    applyLabel: m = "Apply edit"
  } = t, b = (w) => {
    s({ ...a, ...w });
  }, v = RA(a), S = (w) => {
    const j = w.target;
    j && (j.tagName === "INPUT" || j.tagName === "BUTTON" || j.closest("input, button")) && u?.();
  };
  return /* @__PURE__ */ c.jsxs("div", { className: aA, onPointerDownCapture: S, children: [
    /* @__PURE__ */ c.jsxs("div", { className: rA, children: [
      v.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: sA, children: "No active edits" }) : /* @__PURE__ */ c.jsxs("span", { className: z0, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "Active:" }),
        /* @__PURE__ */ c.jsx("span", { children: v.join(" · ") })
      ] }),
      f ? /* @__PURE__ */ c.jsxs("span", { className: z0, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: iA, "aria-hidden": "true" }),
        "Re-rendering"
      ] }) : null
    ] }),
    /* @__PURE__ */ c.jsx(
      U0,
      {
        label: "Volume",
        sub: "Pre-mix gain in dB",
        min: pA,
        max: gA,
        step: vA,
        format: _A,
        value: a.volumeDb,
        onChange: (w) => b({ volumeDb: w }),
        disabled: p
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: bl, children: [
      /* @__PURE__ */ c.jsx("span", { className: xl, children: "3-band EQ" }),
      /* @__PURE__ */ c.jsx(
        P2,
        {
          low: a.eq3.low,
          mid: a.eq3.mid,
          high: a.eq3.high,
          preset: a.eq3.preset,
          disabled: p,
          onChange: (w, j, C, _) => b({ eq3: { low: w, mid: j, high: C, preset: _ } })
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: bl, children: [
      /* @__PURE__ */ c.jsx("span", { className: xl, children: "Speed" }),
      /* @__PURE__ */ c.jsx(
        nA,
        {
          mode: a.speed.mode,
          value: a.speed.value,
          supportsSynthSpeed: i,
          ...o ? { onReRenderAtSynthTime: o } : {},
          disabled: p,
          onChange: (w, j) => b({ speed: { mode: w, value: j } })
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx(
      U0,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: yA,
        max: bA,
        step: xA,
        format: MA,
        value: a.pitchSt,
        onChange: (w) => b({ pitchSt: w }),
        disabled: p
      }
    ),
    /* @__PURE__ */ c.jsx(
      NA,
      {
        normalize: a.normalize,
        disabled: p,
        onChange: (w) => b({ normalize: w })
      }
    ),
    /* @__PURE__ */ c.jsx(
      CA,
      {
        inS: a.fade.inS,
        outS: a.fade.outS,
        disabled: p,
        onChange: (w, j) => b({ fade: { ...a.fade, inS: w, outS: j } })
      }
    ),
    /* @__PURE__ */ c.jsx(
      TA,
      {
        enabled: a.silence.enabled,
        thresholdDb: a.silence.thresholdDb,
        disabled: p,
        onChange: (w, j) => b({ silence: { enabled: w, thresholdDb: j } })
      }
    ),
    y ? /* @__PURE__ */ c.jsxs("div", { className: mA, children: [
      /* @__PURE__ */ c.jsx(
        Ze,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => s(Kc),
          disabled: p,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ c.jsx(Ze, { variant: "primary", size: "md", onClick: y, disabled: p, children: m })
    ] }) : null
  ] });
}
function U0(t) {
  const { label: a, sub: s, min: i, max: o, step: u, format: f, value: p, onChange: y, disabled: m } = t, b = (p - i) / (o - i) * 100, v = g.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: P1, children: [
    /* @__PURE__ */ c.jsxs("div", { className: lA, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: v, className: oA, children: a }),
      /* @__PURE__ */ c.jsx("span", { className: G1, children: s })
    ] }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: v,
        type: "range",
        min: i,
        max: o,
        step: u,
        value: p,
        disabled: m,
        className: tm,
        style: { "--fill": `${b}%` },
        onChange: (S) => y(Number(S.target.value)),
        "aria-valuemin": i,
        "aria-valuemax": o,
        "aria-valuenow": p
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: em, children: f(p) })
  ] });
}
function NA({ normalize: t, onChange: a, disabled: s }) {
  const o = t.mode === "loudness" ? { min: SA, max: wA, step: 0.5, suffix: "LUFS" } : { min: jA, max: EA, step: 0.5, suffix: "dB" }, u = AA(t.targetDbOrLufs, o.min, o.max), f = (u - o.min) / (o.max - o.min) * 100, p = (y) => {
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
    /* @__PURE__ */ c.jsx("div", { className: cA, role: "group", "aria-label": "Normalize mode", children: ["off", "peak", "loudness"].map((y) => {
      const m = y === "peak";
      return /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: uA,
          "data-active": t.mode === y,
          disabled: s || m,
          onClick: () => p(y),
          title: m ? "Peak normalize is not yet supported by the worker. Use Loudness (LUFS) instead." : void 0,
          children: [
            y,
            m ? " (soon)" : ""
          ]
        },
        y
      );
    }) }),
    t.mode !== "off" ? /* @__PURE__ */ c.jsxs("div", { className: P1, children: [
      /* @__PURE__ */ c.jsx("span", { className: G1, children: "Target" }),
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
function CA({ inS: t, outS: a, onChange: s, disabled: i }) {
  const o = g.useId(), u = g.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: bl, children: [
    /* @__PURE__ */ c.jsx("span", { className: xl, children: "Fade" }),
    /* @__PURE__ */ c.jsxs("div", { className: dA, children: [
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
function TA({ enabled: t, thresholdDb: a, onChange: s, disabled: i }) {
  const o = (a - ec) / (Cf - ec) * 100;
  return /* @__PURE__ */ c.jsxs("div", { className: bl, children: [
    /* @__PURE__ */ c.jsx("span", { className: xl, children: "Silence trim" }),
    /* @__PURE__ */ c.jsxs("div", { className: fA, children: [
      /* @__PURE__ */ c.jsxs("label", { className: hA, children: [
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
function RA(t) {
  const a = [];
  return Math.abs(t.volumeDb) >= Is && a.push("gain"), (Math.abs(t.eq3.low) >= Is || Math.abs(t.eq3.mid) >= Is || Math.abs(t.eq3.high) >= Is) && a.push("eq3"), t.speed.mode === "audio" && Math.abs(t.speed.value - 1) >= Is && a.push("speed"), Math.abs(t.pitchSt) >= Is && a.push("pitch"), t.normalize.mode !== "off" && a.push("normalize"), t.fade.inS > 0 && a.push("fade-in"), t.fade.outS > 0 && a.push("fade-out"), t.silence.enabled && a.push("silence"), a;
}
function _A(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
function MA(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} st`;
}
function AA(t, a, s) {
  return Number.isFinite(t) ? Math.max(a, Math.min(s, t)) : a;
}
var kA = "skdk4g0", DA = "skdk4g1", B0 = "skdk4g2", zA = "skdk4g3", OA = "skdk4g4", LA = "skdk4g5", $A = "skdk4g6", UA = "skdk4g7", BA = "skdk4g8", IA = "skdk4g9", VA = "skdk4ga", qA = "skdk4gb", HA = "skdk4gc", FA = "skdk4gd", I0 = "skdk4ge", V0 = "skdk4gf", PA = "skdk4gg", q0 = "skdk4gh", H0 = "skdk4gi", GA = "skdk4gj", YA = "skdk4gk", KA = "skdk4gl", F0 = "skdk4gm", XA = "skdk4gn", QA = "skdk4gp", ZA = "skdk4gq", JA = "skdk4gr", WA = "skdk4gs", e3 = "skdk4gt", t3 = "skdk4gu", n3 = "skdk4gv", P0 = "skdk4gw", a3 = "skdk4gx", r3 = "skdk4gy", s3 = "skdk4gz", i3 = "skdk4g10", l3 = "cgsfgh1", o3 = "cgsfgh2", c3 = "cgsfgh3", u3 = "cgsfgh4", d3 = "cgsfgh5", f3 = "cgsfgh6", h3 = "cgsfgh7", m3 = "cgsfgh8", p3 = "cgsfgh9", g3 = "cgsfgha", v3 = "cgsfghb", y3 = "cgsfghc", b3 = "cgsfghd", x3 = "cgsfghe", S3 = "cgsfghm", w3 = "cgsfghn", j3 = "cgsfgho", E3 = "cgsfghp";
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
}, Y1 = 0.05;
function N3(t) {
  let a = null, s = -1 / 0;
  for (const i of an) {
    const o = t[i];
    o > s && (s = o, a = i);
  }
  return !a || s <= Y1 ? null : a;
}
function K1(t, a = 3) {
  return an.map((s) => ({ key: s, label: Sl[s], value: t[s] })).filter((s) => s.value > Y1).sort((s, i) => i.value - s.value).slice(0, a);
}
function C3(t) {
  let a = 0;
  for (const s of an) a += t[s] * t[s];
  return Math.sqrt(a);
}
function G0(t) {
  const a = K1(t, 2), s = a[0];
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
const Y0 = 0.05, K0 = 0.2, T3 = 22, R3 = 320, Rf = 0.78;
function _f(t, a, s, i) {
  const o = Math.cos(s), u = Math.sin(s), f = t * o + a * u;
  return Math.max(0, Math.min(1, f / i));
}
function _3(t) {
  const { vec: a, onChange: s, size: i, reduceMotion: o = !1 } = t, [u, f] = g.useState(a), [p, y] = g.useState(null), [m, b] = g.useState(null), v = g.useRef(null), S = g.useRef(a), w = g.useRef(o), j = g.useRef(null), C = g.useRef(0);
  w.current = o, g.useEffect(() => {
    f(a), S.current = a;
  }, [a]);
  const _ = g.useCallback(
    (V) => {
      const D = ts(V);
      f(D), S.current = D, s(D);
    },
    [s]
  ), T = g.useCallback((V) => {
    const D = ts(V);
    f(D), S.current = D;
  }, []), O = g.useCallback(
    (V) => {
      const D = v.current;
      if (!D || w.current) return;
      const H = V.clientX - D.centerX, Q = V.clientY - D.centerY, J = i / 2 * Rf, P = _f(H, Q, D.angle, J), ie = { ...S.current, [D.axis]: P };
      T(ie);
    },
    [i, T]
  ), R = g.useCallback(
    (V) => {
      const D = v.current;
      if (D) {
        if (window.removeEventListener("pointermove", O), window.removeEventListener("pointerup", R), window.removeEventListener("pointercancel", R), w.current) {
          const H = V.clientX - D.centerX, Q = V.clientY - D.centerY, J = i / 2 * Rf, P = _f(H, Q, D.angle, J), ie = { ...S.current, [D.axis]: P };
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
  const N = g.useCallback((V, D) => {
    w.current || (C.current += 1, b({ x: V, y: D, key: C.current }), j.current !== null && window.clearTimeout(j.current), j.current = window.setTimeout(() => {
      b(null), j.current = null;
    }, R3));
  }, []), U = g.useCallback(
    (V, D, H, Q, J) => {
      const P = H.getBoundingClientRect(), ie = P.left + P.width / 2, A = P.top + P.height / 2, $ = an.indexOf(V) / an.length * Math.PI * 2 - Math.PI / 2;
      if (v.current = {
        axis: V,
        pointerId: D,
        centerX: ie,
        centerY: A,
        angle: $
      }, y(V), Q !== void 0 && J !== void 0) {
        const te = Q - ie, fe = J - A, k = i / 2 * Rf, ee = _f(te, fe, $, k), re = { ...S.current, [V]: ee };
        w.current ? _(re) : T(re);
      }
      window.addEventListener("pointermove", O), window.addEventListener("pointerup", R), window.addEventListener("pointercancel", R);
    },
    [_, O, R, i, T]
  ), Y = g.useCallback(
    (V, D) => {
      D.preventDefault();
      const H = D.currentTarget, Q = H.ownerSVGElement ?? H;
      U(V, D.pointerId, Q);
    },
    [U]
  ), ae = g.useCallback(
    (V) => {
      const D = V.currentTarget, H = D instanceof SVGSVGElement ? D : D.ownerSVGElement ?? D, Q = H.getBoundingClientRect(), J = Q.left + Q.width / 2, P = Q.top + Q.height / 2, ie = V.clientX - J, A = V.clientY - P;
      if (Math.sqrt(ie * ie + A * A) < 8) return;
      let $ = Math.atan2(A, ie) * 180 / Math.PI;
      $ = (($ + 90) % 360 + 360) % 360;
      let te = null, fe = 999;
      for (let re = 0; re < an.length; re++) {
        const G = an[re];
        if (!G) continue;
        const B = re / an.length * 360, W = Math.abs((B - $ + 540) % 360 - 180);
        W < fe && (fe = W, te = G);
      }
      if (!te || fe > T3) return;
      V.preventDefault();
      const k = (V.clientX - Q.left) / Q.width * i, ee = (V.clientY - Q.top) / Q.height * i;
      N(k, ee), U(te, V.pointerId, H, V.clientX, V.clientY);
    },
    [U, i, N]
  ), M = g.useCallback(
    (V, D) => {
      const H = S.current[V];
      let Q = H;
      switch (D.key) {
        case "ArrowUp":
        case "ArrowRight":
          Q = H + Y0;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          Q = H - Y0;
          break;
        case "PageUp":
          Q = H + K0;
          break;
        case "PageDown":
          Q = H - K0;
          break;
        case "Home":
          Q = 0;
          break;
        case "End":
          Q = 1;
          break;
        default:
          return;
      }
      D.preventDefault(), y(V), _({ ...S.current, [V]: Q });
    },
    [_]
  );
  return {
    liveVec: u,
    activeAxis: p,
    setActiveAxis: y,
    onPointerDown: Y,
    onKeyDown: M,
    onSurfacePointerDown: ae,
    surfacePing: m
  };
}
const M3 = [0.25, 0.5, 0.75, 1];
function A3({
  vec: t,
  onChange: a,
  size: s = 360,
  readOnly: i = !1,
  reduceMotion: o = !1
}) {
  const u = _3({ vec: t, onChange: a, size: s, reduceMotion: o }), f = s / 2, p = s / 2, y = s / 2 * 0.78, m = g.useMemo(() => k3(f, p, y), [f, p, y]), b = g.useMemo(() => an.map((v, S) => {
    const w = xc(u.liveVec[v]), j = m[S];
    return j ? `${f + j.dx * w},${p + j.dy * w}` : "0,0";
  }).join(" "), [m, f, p, u.liveVec]);
  return /* @__PURE__ */ c.jsx("div", { className: l3, children: /* @__PURE__ */ c.jsx("div", { className: o3, style: { width: s, height: s }, children: /* @__PURE__ */ c.jsxs(
    "svg",
    {
      className: c3,
      viewBox: `0 0 ${s} ${s}`,
      role: "img",
      "aria-label": "8-axis emotion radar",
      onPointerDown: i ? void 0 : u.onSurfacePointerDown,
      style: i ? void 0 : { cursor: "crosshair", touchAction: "none" },
      children: [
        M3.map((v) => /* @__PURE__ */ c.jsx(
          "circle",
          {
            className: u3,
            cx: f,
            cy: p,
            r: y * v
          },
          v
        )),
        an.map((v, S) => {
          const w = m[S];
          if (!w) return null;
          const j = f + w.dx * 1.18, C = p + w.dy * 1.18, _ = u.activeAxis === v;
          return /* @__PURE__ */ c.jsxs("g", { children: [
            /* @__PURE__ */ c.jsx(
              "line",
              {
                className: d3,
                x1: f,
                y1: p,
                x2: f + w.dx,
                y2: p + w.dy
              }
            ),
            /* @__PURE__ */ c.jsx(
              "text",
              {
                className: `${b3}${_ ? ` ${x3}` : ""}`,
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
          const j = m[S];
          if (!j) return null;
          const C = u.activeAxis === v;
          return /* @__PURE__ */ c.jsx(
            "line",
            {
              className: `${h3}${C ? ` ${m3}` : ""}`,
              x1: f,
              y1: p,
              x2: f + j.dx * w,
              y2: p + j.dy * w
            },
            `petal-${v}`
          );
        }),
        /* @__PURE__ */ c.jsx("polygon", { className: f3, points: b }),
        u.surfacePing && /* @__PURE__ */ c.jsx(
          "circle",
          {
            className: y3,
            cx: u.surfacePing.x,
            cy: u.surfacePing.y,
            r: 10
          },
          u.surfacePing.key
        ),
        !i && an.map((v, S) => {
          const w = xc(u.liveVec[v]), j = m[S];
          if (!j) return null;
          const C = f + j.dx * w, _ = p + j.dy * w, T = u.activeAxis === v;
          return /* @__PURE__ */ c.jsxs("g", { children: [
            /* @__PURE__ */ c.jsx(
              "circle",
              {
                className: p3,
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
                className: `${g3}${T ? ` ${v3}` : ""}`,
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
function k3(t, a, s) {
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
function D3({ vec: t, size: a = 36 }) {
  const s = a / 2, i = a / 2, o = a / 2 * 0.86, u = g.useMemo(() => an.map((f, p) => {
    const y = xc(t[f]), m = p / an.length * Math.PI * 2 - Math.PI / 2, b = s + Math.cos(m) * o * y, v = i + Math.sin(m) * o * y;
    return `${b},${v}`;
  }).join(" "), [s, i, o, t]);
  return /* @__PURE__ */ c.jsx("span", { className: S3, "aria-hidden": "true", children: /* @__PURE__ */ c.jsxs(
    "svg",
    {
      className: w3,
      width: a,
      height: a,
      viewBox: `0 0 ${a} ${a}`,
      children: [
        /* @__PURE__ */ c.jsx("circle", { className: j3, cx: s, cy: i, r: o }),
        /* @__PURE__ */ c.jsx("polygon", { className: E3, points: u })
      ]
    }
  ) });
}
var z3 = "_1jqr3aj0", O3 = "_1jqr3aj1", L3 = "_1jqr3aj2", $3 = "_1jqr3aj3", U3 = "_1jqr3aj4", B3 = "_1jqr3aj5", I3 = "_1jqr3aj6", V3 = "_1jqr3aj7";
const X0 = 0.05, Q0 = 0.2;
function q3({
  vec: t,
  onChange: a,
  readOnly: s = !1,
  reduceMotion: i = !1
}) {
  const [o, u] = g.useState(null), f = g.useRef(null), p = g.useRef(/* @__PURE__ */ new Map()), y = g.useCallback(
    (j, C) => {
      const _ = Math.max(0, Math.min(1, C));
      a(ts({ ...t, [j]: _ }));
    },
    [a, t]
  ), m = g.useCallback((j, C) => {
    const _ = p.current.get(j);
    return !_ || _.width <= 0 ? 0 : (C - _.left) / _.width;
  }, []), b = g.useCallback(
    (j, C) => {
      if (s) return;
      C.preventDefault();
      const _ = C.currentTarget.querySelector("[data-track]");
      _ instanceof HTMLElement && p.current.set(j, _.getBoundingClientRect()), C.currentTarget.setPointerCapture(C.pointerId), f.current = j, u(j), y(j, m(j, C.clientX));
    },
    [s, y, m]
  ), v = g.useCallback(
    (j, C) => {
      s || i || f.current === j && y(j, m(j, C.clientX));
    },
    [s, i, y, m]
  ), S = g.useCallback(
    (j, C) => {
      if (f.current === j) {
        try {
          C.currentTarget.releasePointerCapture(C.pointerId);
        } catch {
        }
        f.current = null, p.current.delete(j);
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
  return /* @__PURE__ */ c.jsx("div", { className: z3, role: "group", "aria-label": "Emotion axis sliders", children: an.map((j) => {
    const C = H3(t[j] ?? 0), _ = C > 0.05, T = o === j, O = Sl[j];
    return /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: `${O3}${_ ? ` ${L3}` : ""}${T ? ` ${$3}` : ""}`,
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
          /* @__PURE__ */ c.jsx("span", { className: U3, children: O }),
          /* @__PURE__ */ c.jsx("span", { className: B3, "data-track": "true", children: /* @__PURE__ */ c.jsx(
            "span",
            {
              className: I3,
              style: { width: `${C * 100}%` },
              "aria-hidden": "true"
            }
          ) }),
          /* @__PURE__ */ c.jsx("span", { className: V3, children: C.toFixed(2) })
        ]
      },
      j
    );
  }) });
}
function H3(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
var Z0 = "gvwvwg0", F3 = "gvwvwg2", P3 = "gvwvwg3", G3 = "gvwvwg8", Y3 = "gvwvwg9", K3 = "gvwvwga", X3 = "gvwvwgb", Q3 = "gvwvwgc", Z3 = "gvwvwgd", J3 = "gvwvwge";
function W3({
  presets: t,
  activePresetId: a,
  onSelect: s,
  onDelete: i
}) {
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: Z0, children: [
    /* @__PURE__ */ c.jsx("span", { className: F3, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("span", { className: P3, children: "No presets yet. Save your current vector to build the library." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: Z0, children: [
    /* @__PURE__ */ c.jsx("span", { className: J3, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("div", { className: G3, children: t.map((o) => {
      const u = ek(o), f = o.presetId === a;
      return /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${Y3}${f ? ` ${X3}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: K3,
                onClick: () => s(o),
                "aria-pressed": f,
                children: [
                  /* @__PURE__ */ c.jsx(D3, { vec: u, size: 28 }),
                  /* @__PURE__ */ c.jsx("span", { className: Q3, children: o.presetName })
                ]
              }
            ),
            i && /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: Z3,
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
function ek(t) {
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
const tk = [
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
], nk = [
  "very",
  "extremely",
  "deeply",
  "intensely",
  "absolutely",
  "totally",
  "really",
  "so"
], ak = [
  "slightly",
  "a bit",
  "a little",
  "kinda",
  "kind of",
  "somewhat",
  "barely"
], rk = ["not", "no", "never", "without", "lack", "lacking", "free of"];
function sk(t) {
  const a = t.toLowerCase().trim();
  if (!a) return { ...Ws };
  const i = a.split(/\s+/).some((f) => nk.includes(f)) ? 1.2 : 1, o = ak.some((f) => a.includes(f)) ? 0.55 : 1, u = { ...Ws };
  for (const f of tk) {
    let p = 0;
    for (const y of f.keywords) {
      const m = y.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"), v = new RegExp(`\\b${m}\\b`).exec(a);
      if (!v) continue;
      const S = v.index, w = a.slice(0, S), j = Math.max(
        w.lastIndexOf(","),
        w.lastIndexOf(";"),
        w.lastIndexOf(" but "),
        w.lastIndexOf(" yet ")
      ), _ = w.slice(j >= 0 ? j : 0).slice(-30);
      rk.some((T) => new RegExp(`\\b${T}\\b`).test(_)) || (p += 1);
    }
    if (p > 0) {
      const y = f.weight * Math.min(1, 0.55 + 0.2 * (p - 1)) * i * o;
      u[f.axis] = Math.min(1, y);
    }
  }
  return an.every((f) => u[f] === 0) && (u.calm = 0.4), ts(u);
}
const ik = [
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
];
function lk({
  value: t,
  onChange: a,
  deploymentId: s,
  presets: i,
  onPresetsChange: o
}) {
  const u = t.mode ?? "emotion_vector", f = u === "none" || u === "audio_ref" ? "emotion_vector" : u, p = g.useMemo(() => ok(t.vector), [t.vector]), y = t.emotionAlpha ?? 1, [m, b] = g.useState(null), [v, S] = g.useState(!1), [w, j] = g.useState(null), [C, _] = g.useState(""), [T, O] = g.useState(!1), R = g.useRef(!0);
  g.useEffect(() => (R.current = !0, () => {
    R.current = !1;
  }), []), g.useEffect(() => {
    T || _(G0(p));
  }, [p, T]);
  const N = ($) => {
    a({ ...t, mode: $ });
  }, U = ($) => {
    a({
      ...t,
      mode: "emotion_vector",
      vector: Mf($)
    }), w && j(null);
  }, Y = () => {
    U(ts(Ws));
  }, ae = ($) => {
    const te = Math.max(0, Math.min(10, Number.isFinite($) ? $ : 1));
    a({ ...t, emotionAlpha: te });
  }, M = async () => {
    const $ = C.trim();
    if ($) {
      S(!0), b(null);
      try {
        const te = await EM(s, $, Mf(p));
        if (!R.current) return;
        o(
          ck([te, ...i.filter((fe) => fe.presetId !== te.presetId)])
        ), j(te.presetId), O(!1);
      } catch (te) {
        R.current && b(J0(te));
      } finally {
        R.current && S(!1);
      }
    }
  }, V = async ($) => {
    const te = [...i];
    o(i.filter((fe) => fe.presetId !== $)), w === $ && j(null);
    try {
      await NM(s, $);
    } catch (fe) {
      R.current && (o(te), b(J0(fe)));
    }
  }, D = ($) => {
    j($.presetId), a({
      ...t,
      mode: "emotion_vector",
      vector: $.vector
    });
  }, H = ($) => {
    a({ ...t, mode: "qwen_template", qwenTemplate: $ });
  }, Q = N3(p), J = C3(p), P = K1(p, 3), ie = P.length > 0 && C.trim().length > 0 && !v, A = G0(p) || "name your preset…", q = f !== "emotion_vector";
  return /* @__PURE__ */ c.jsxs("div", { className: kA, children: [
    /* @__PURE__ */ c.jsxs("div", { className: DA, children: [
      /* @__PURE__ */ c.jsx("span", { className: B0, children: "Emotion mode" }),
      /* @__PURE__ */ c.jsx("div", { className: zA, role: "radiogroup", "aria-label": "Emotion mode", children: ik.map(($) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": f === $.id,
          className: `${OA}${f === $.id ? ` ${LA}` : ""}`,
          onClick: () => N($.id),
          children: $.label
        },
        $.id
      )) })
    ] }),
    f === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: GA, children: [
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: YA,
          placeholder: 'e.g. "Friendly teen, slightly skeptical"',
          value: t.qwenTemplate ?? "",
          onChange: ($) => H($.target.value)
        }
      ),
      /* @__PURE__ */ c.jsxs("div", { className: KA, children: [
        /* @__PURE__ */ c.jsx(
          Ze,
          {
            variant: "secondary",
            onClick: () => {
              const $ = (t.qwenTemplate ?? "").trim();
              if (!$) return;
              const te = sk($);
              a({
                ...t,
                mode: "emotion_vector",
                vector: Mf(te)
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
    f === "emotion_vector" && /* @__PURE__ */ c.jsxs("div", { className: FA, children: [
      /* @__PURE__ */ c.jsx("div", { className: `${m0} ${$A}`, children: /* @__PURE__ */ c.jsx(
        A3,
        {
          vec: p,
          onChange: U,
          readOnly: q
        }
      ) }),
      /* @__PURE__ */ c.jsxs("div", { className: `${m0} ${UA}`, children: [
        /* @__PURE__ */ c.jsxs("div", { className: BA, children: [
          /* @__PURE__ */ c.jsx("span", { className: B0, children: "Dominant" }),
          /* @__PURE__ */ c.jsx("span", { className: IA, children: Q ? Sl[Q].toLowerCase() : "neutral" }),
          /* @__PURE__ */ c.jsxs("span", { className: VA, children: [
            "‖v‖ = ",
            J.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(q3, { vec: p, onChange: U, readOnly: q }),
        /* @__PURE__ */ c.jsx("div", { className: qA, children: /* @__PURE__ */ c.jsxs(
          Ze,
          {
            variant: "ghost",
            size: "sm",
            onClick: Y,
            disabled: q || J < 1e-3,
            "aria-label": "Reset emotion vector",
            children: [
              /* @__PURE__ */ c.jsxs(
                "svg",
                {
                  className: HA,
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
          /* @__PURE__ */ c.jsx("span", { className: PA, children: "Global mix · per-line overrides bypass it" })
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
            onChange: ($) => ae(Number($.target.value)),
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
          className: `${QA}${P.length === 0 ? ` ${ZA}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs("div", { className: JA, children: [
              /* @__PURE__ */ c.jsx("span", { className: WA, children: "Save current as preset" }),
              P.length === 0 && /* @__PURE__ */ c.jsx("span", { className: e3, children: "adjust the radar to enable" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: t3, children: [
              /* @__PURE__ */ c.jsx("div", { className: n3, children: P.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: `${P0} ${r3}`, children: "no axes set" }) : P.map(($) => /* @__PURE__ */ c.jsxs("span", { className: P0, children: [
                $.label.toLowerCase(),
                /* @__PURE__ */ c.jsx("b", { className: a3, children: $.value.toFixed(2) })
              ] }, $.key)) }),
              /* @__PURE__ */ c.jsxs("div", { className: s3, children: [
                /* @__PURE__ */ c.jsx(
                  "input",
                  {
                    type: "text",
                    className: i3,
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
        W3,
        {
          presets: i,
          activePresetId: w,
          onSelect: D,
          onDelete: V
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
          onChange: ($) => ae(Number($.target.value)),
          "aria-label": "Emotion alpha"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: H0, children: [
        (y * 100).toFixed(0),
        "%"
      ] })
    ] }),
    m && /* @__PURE__ */ c.jsx("div", { className: XA, children: m })
  ] });
}
function ok(t) {
  if (!t || !Array.isArray(t)) return ts(Ws);
  const a = { ...Ws };
  return an.forEach((s, i) => {
    const o = t[i];
    a[s] = Number.isFinite(o) ? Math.max(0, Math.min(1, o)) : 0;
  }), a;
}
function ck(t) {
  return [...t].sort((a, s) => s.updatedAt - a.updatedAt);
}
function J0(t) {
  return t instanceof ai || t instanceof Error ? t.message : "Unknown error";
}
var uk = "_5u1uau0", nl = "_5u1uau1", dk = "_5u1uau2", Vs = "_5u1uau3", al = "_5u1uau4", fk = "_5u1uau5", Af = "_5u1uau6", hk = "_5u1uau7", mk = "_5u1uau8", pk = "_5u1uau9", gk = "_5u1uaua", vk = "_5u1uaub", yk = "_5u1uauc", bk = "_5u1uaud", xk = "_5u1uaue", W0 = "_5u1uauf", eb = "_5u1uaug", Sk = "_5u1uauh";
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
], wk = ["mp3", "wav", "flac"], tc = 0.5, Df = 2, jk = 0.05, Ek = 0.8, Nk = 0.8, tb = 42;
function nc(t, a, s) {
  const i = t[a];
  if (typeof i == "number" && Number.isFinite(i)) return i;
  if (typeof i == "string") {
    const o = Number(i);
    if (Number.isFinite(o)) return o;
  }
  return s;
}
function Ck({
  outputFormat: t,
  onOutputFormatChange: a,
  speedFactor: s,
  onSpeedFactorChange: i,
  cachePolicy: o,
  onCachePolicyChange: u,
  generation: f,
  onGenerationChange: p
}) {
  const y = g.useId(), m = g.useId(), b = g.useId(), v = g.useId(), S = g.useId(), w = (U, Y) => {
    p({ ...f, [U]: Y });
  }, j = f.seed === void 0 || f.seed === null ? "random" : "fixed", C = (U) => {
    if (U !== j)
      if (U === "random") {
        const Y = { ...f };
        delete Y.seed, p(Y);
      } else {
        const Y = nc(f, "seed", tb);
        p({ ...f, seed: Y });
      }
  }, _ = kf.find((U) => U.id === o) ?? kf[0], T = (s - tc) / (Df - tc) * 100, O = nc(f, "temperature", Ek), R = nc(f, "top_p", Nk), N = nc(f, "seed", tb);
  return /* @__PURE__ */ c.jsxs("div", { className: uk, children: [
    /* @__PURE__ */ c.jsxs("div", { className: nl, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: y, className: Vs, children: "Format" }),
      /* @__PURE__ */ c.jsx("div", { className: al, children: /* @__PURE__ */ c.jsx(
        "select",
        {
          id: y,
          className: fk,
          value: t,
          onChange: (U) => a(U.currentTarget.value),
          children: wk.map((U) => /* @__PURE__ */ c.jsx("option", { value: U, children: U }, U))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: nl, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: m, className: Vs, children: "Speed" }),
      /* @__PURE__ */ c.jsxs("div", { className: `${al} ${hk}`, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: m,
            type: "range",
            className: mk,
            min: tc,
            max: Df,
            step: jk,
            value: s,
            style: { "--range-pct": `${T}%` },
            onChange: (U) => i(Number(U.currentTarget.value)),
            "aria-valuemin": tc,
            "aria-valuemax": Df,
            "aria-valuenow": s
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: pk, children: [
          s.toFixed(2),
          "×"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: dk, role: "radiogroup", "aria-label": "Cache policy", children: [
      /* @__PURE__ */ c.jsx("span", { className: Vs, children: "Cache" }),
      /* @__PURE__ */ c.jsx("div", { className: gk, children: kf.map((U) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": o === U.id,
          className: vk,
          onClick: () => u(U.id),
          title: U.help,
          children: U.label
        },
        U.id
      )) }),
      /* @__PURE__ */ c.jsx("p", { className: yk, "aria-live": "polite", children: _.help })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: bk, "aria-hidden": "true" }),
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
          onChange: (U) => w("temperature", Number(U.currentTarget.value))
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
          onChange: (U) => w("top_p", Number(U.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: nl, children: [
      /* @__PURE__ */ c.jsx("span", { className: Vs, id: `${S}-label`, children: "Seed" }),
      /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${al} ${xk}`,
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
                onChange: (U) => w("seed", Math.trunc(Number(U.currentTarget.value))),
                "aria-label": "Fixed seed value"
              }
            ) : /* @__PURE__ */ c.jsx("span", { className: Sk, "aria-live": "polite", children: "auto · rolls each run" })
          ]
        }
      )
    ] })
  ] });
}
var Tk = "iv43qk0", nb = "iv43qk1", Rk = "iv43qk2", ab = "iv43qk3", _k = "iv43qk4", Mk = "iv43qk5", Ak = "iv43qk6", kk = "iv43qk7", Dk = { vector: "iv43qk8", qwen: "iv43qk9", preset: "iv43qka", audio: "iv43qkb", raw: "iv43qkc" }, zk = "iv43qkd", Ok = "iv43qke", zf = "iv43qkf", Of = "iv43qkg";
function Lk({
  lines: t,
  characterColors: a,
  onLineClick: s
}) {
  if (t.length === 0)
    return /* @__PURE__ */ c.jsx("p", { className: zk, children: "Paste dialogue above to see character-tagged lines, override badges, and per-line previews here." });
  const i = t.length, o = t.filter((f) => f.character !== null).length, u = i - o;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: Ok, children: [
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
    /* @__PURE__ */ c.jsx("ol", { className: Tk, children: t.map((f) => /* @__PURE__ */ c.jsx(
      $k,
      {
        line: f,
        ...f.character && a[f.character] ? { color: a[f.character] } : {},
        ...s ? { onClick: () => s(f.idx) } : {}
      },
      f.idx
    )) })
  ] });
}
function $k({ line: t, color: a, onClick: s }) {
  return t.character === null ? /* @__PURE__ */ c.jsxs("li", { className: `${nb} ${Rk}`, children: [
    /* @__PURE__ */ c.jsx("span", { className: ab, children: String(t.idx + 1).padStart(2, "0") }),
    /* @__PURE__ */ c.jsx("span", { className: Ak, children: t.text })
  ] }) : /* @__PURE__ */ c.jsxs(
    "li",
    {
      className: nb,
      onClick: s,
      style: s ? { cursor: "pointer" } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: ab, children: String(t.idx + 1).padStart(2, "0") }),
        /* @__PURE__ */ c.jsx("span", { className: _k, style: a ? { color: a } : void 0, children: t.character }),
        /* @__PURE__ */ c.jsxs("span", { className: Mk, children: [
          t.text,
          t.override && /* @__PURE__ */ c.jsxs("span", { className: `${kk} ${Dk[t.override.kind]}`, children: [
            t.override.kind,
            t.override.label ? ` · ${t.override.label}` : ""
          ] })
        ] })
      ]
    }
  );
}
var Uk = "_46z95i0", Bk = "_46z95i1", Ik = "_46z95i2", Vk = "_46z95i3", qk = "_46z95i4", Hk = "_46z95i5", Fk = "_46z95i6";
const Pk = {
  intensity: 0.6,
  pace: 1,
  pitchSt: 0
};
function Gk({ value: t, onChange: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: Uk, children: [
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
function Lf({ label: t, sub: a, min: s, max: i, step: o, format: u, value: f, onChange: p }) {
  const y = (f - s) / (i - s) * 100, m = `perf-${t.toLowerCase()}`;
  return /* @__PURE__ */ c.jsxs("div", { className: Bk, children: [
    /* @__PURE__ */ c.jsxs("div", { className: Ik, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: m, className: Vk, children: t }),
      /* @__PURE__ */ c.jsx("span", { className: qk, children: a })
    ] }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: m,
        type: "range",
        min: s,
        max: i,
        step: o,
        value: f,
        className: Hk,
        style: { "--fill": `${y}%` },
        onChange: (b) => p(Number(b.target.value))
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: Fk, children: u(f) })
  ] });
}
var Yk = "qe93dj0", Kk = "qe93dj1", Xk = "qe93dj2", Qk = "qe93dj3", Zk = "qe93dj4", Jk = "qe93dj5", Wk = "qe93dj6", e5 = { ok: "qe93dj7", warn: "qe93dj8", info: "qe93dj9" }, t5 = "qe93dja", n5 = "qe93djb";
function a5({ checks: t }) {
  const a = t.filter((s) => s.status === "ok").length;
  return /* @__PURE__ */ c.jsxs("div", { className: Yk, children: [
    /* @__PURE__ */ c.jsxs("header", { className: Kk, children: [
      /* @__PURE__ */ c.jsx("span", { className: Xk, children: "Pre-flight" }),
      /* @__PURE__ */ c.jsxs("span", { className: Qk, children: [
        a,
        "/",
        t.length,
        " OK"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: Zk, children: t.map((s) => /* @__PURE__ */ c.jsxs("li", { className: Jk, children: [
      /* @__PURE__ */ c.jsx(
        "span",
        {
          "aria-hidden": "true",
          className: `${Wk} ${e5[s.status]}`
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: t5, children: s.label }),
      s.detail && /* @__PURE__ */ c.jsx("span", { className: n5, children: s.detail })
    ] }, s.id)) })
  ] });
}
var rb = "_17fbpt30", sb = "_17fbpt31", ib = "_17fbpt32", r5 = "_17fbpt33", s5 = "_17fbpt34", i5 = "_17fbpt35", lb = "_17fbpt36", l5 = "_17fbpt37", o5 = "_17fbpt38";
const c5 = {
  completed: "success",
  running: "accent",
  queued: "neutral",
  failed: "danger",
  cancelled: "faint",
  partial: "warning"
};
function u5({
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
    /* @__PURE__ */ c.jsx("p", { className: l5, children: "No runs yet." }),
    /* @__PURE__ */ c.jsx("p", { className: o5, children: o ?? "Hit Generate to enqueue a batch." })
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
    /* @__PURE__ */ c.jsx("ul", { className: r5, children: t.slice(0, 5).map((u) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: s5,
        onClick: i ? () => i(u.runId) : void 0,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: i5, children: u.runId }),
          /* @__PURE__ */ c.jsx("span", { className: `${B1.sm} ${I1[c5[u.status] ?? "neutral"]}`, children: u.status }),
          /* @__PURE__ */ c.jsx("span", { className: lb, children: d5(u.startedAt ?? u.queuedAt) }),
          /* @__PURE__ */ c.jsx("span", { className: lb, children: u.kind })
        ]
      }
    ) }, u.runId)) })
  ] });
}
function d5(t) {
  if (!t) return "—";
  const a = t > 1e12 ? Math.floor(t / 1e3) : t, s = new Date(a * 1e3);
  if (Number.isNaN(s.getTime())) return "—";
  const o = Date.now() - s.getTime();
  return o < 6e4 ? "just now" : o < 36e5 ? `${Math.floor(o / 6e4)}m ago` : o < 864e5 ? `${Math.floor(o / 36e5)}h ago` : s.toISOString().slice(0, 16).replace("T", " ");
}
const X1 = g.createContext({});
function am(t) {
  const a = g.useRef(null);
  return a.current === null && (a.current = t()), a.current;
}
const f5 = typeof window < "u", Q1 = f5 ? g.useLayoutEffect : g.useEffect, Xc = /* @__PURE__ */ g.createContext(null);
function h5(t, a) {
  t.indexOf(a) === -1 && t.push(a);
}
function m5(t, a) {
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
const Cr = {}, Z1 = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function p5(t) {
  return typeof t == "object" && t !== null;
}
const J1 = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function W1(t) {
  let a;
  return () => (a === void 0 && (a = t()), a);
}
const ri = /* @__NO_SIDE_EFFECTS__ */ (t) => t, g5 = (t, a) => (s) => a(t(s)), Qc = (...t) => t.reduce(g5), eS = /* @__NO_SIDE_EFFECTS__ */ (t, a, s) => {
  const i = a - t;
  return i === 0 ? 1 : (s - t) / i;
};
class tS {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return h5(this.subscriptions, a), () => m5(this.subscriptions, a);
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
function nS(t, a) {
  return a ? t * (1e3 / a) : 0;
}
const aS = (t, a, s) => (((1 - 3 * s + 3 * a) * t + (3 * s - 6 * a)) * t + 3 * a) * t, v5 = 1e-7, y5 = 12;
function b5(t, a, s, i, o) {
  let u, f, p = 0;
  do
    f = a + (s - a) / 2, u = aS(f, i, o) - t, u > 0 ? s = f : a = f;
  while (Math.abs(u) > v5 && ++p < y5);
  return f;
}
function Ml(t, a, s, i) {
  if (t === a && s === i)
    return ri;
  const o = (u) => b5(u, 0, 1, t, s);
  return (u) => u === 0 || u === 1 ? u : aS(o(u), a, i);
}
const rS = (t) => (a) => a <= 0.5 ? t(2 * a) / 2 : (2 - t(2 * (1 - a))) / 2, sS = (t) => (a) => 1 - t(1 - a), iS = /* @__PURE__ */ Ml(0.33, 1.53, 0.69, 0.99), rm = /* @__PURE__ */ sS(iS), lS = /* @__PURE__ */ rS(rm), oS = (t) => t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * rm(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), sm = (t) => 1 - Math.sin(Math.acos(t)), x5 = sS(sm), cS = rS(sm), S5 = /* @__PURE__ */ Ml(0.42, 0, 1, 1), w5 = /* @__PURE__ */ Ml(0, 0, 0.58, 1), uS = /* @__PURE__ */ Ml(0.42, 0, 0.58, 1), j5 = (t) => Array.isArray(t) && typeof t[0] != "number", dS = (t) => Array.isArray(t) && typeof t[0] == "number", cb = {
  linear: ri,
  easeIn: S5,
  easeInOut: uS,
  easeOut: w5,
  circIn: sm,
  circInOut: cS,
  circOut: x5,
  backIn: rm,
  backInOut: lS,
  backOut: iS,
  anticipate: oS
}, E5 = (t) => typeof t == "string", ub = (t) => {
  if (dS(t)) {
    ei(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, s, i, o] = t;
    return Ml(a, s, i, o);
  } else if (E5(t))
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
function N5(t, a) {
  let s = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), o = !1, u = !1;
  const f = /* @__PURE__ */ new WeakSet();
  let p = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function y(b) {
    f.has(b) && (m.schedule(b), t()), b(p);
  }
  const m = {
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
      if (p = b, o) {
        u = !0;
        return;
      }
      o = !0;
      const v = s;
      s = i, i = v, s.forEach(y), s.clear(), o = !1, u && (u = !1, m.process(b));
    }
  };
  return m;
}
const C5 = 40;
function fS(t, a) {
  let s = !1, i = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, u = () => s = !0, f = ac.reduce((R, N) => (R[N] = N5(u), R), {}), { setup: p, read: y, resolveKeyframes: m, preUpdate: b, update: v, preRender: S, render: w, postRender: j } = f, C = () => {
    const R = Cr.useManualTiming, N = R ? o.timestamp : performance.now();
    s = !1, R || (o.delta = i ? 1e3 / 60 : Math.max(Math.min(N - o.timestamp, C5), 1)), o.timestamp = N, o.isProcessing = !0, p.process(o), y.process(o), m.process(o), b.process(o), v.process(o), S.process(o), w.process(o), j.process(o), o.isProcessing = !1, s && a && (i = !1, t(C));
  }, _ = () => {
    s = !0, i = !0, o.isProcessing || t(C);
  };
  return { schedule: ac.reduce((R, N) => {
    const U = f[N];
    return R[N] = (Y, ae = !1, M = !1) => (s || _(), U.schedule(Y, ae, M)), R;
  }, {}), cancel: (R) => {
    for (let N = 0; N < ac.length; N++)
      f[ac[N]].cancel(R);
  }, state: o, steps: f };
}
const { schedule: na, cancel: oh, state: _c } = /* @__PURE__ */ fS(typeof requestAnimationFrame < "u" ? requestAnimationFrame : ri, !0);
let Sc;
function T5() {
  Sc = void 0;
}
const Hn = {
  now: () => (Sc === void 0 && Hn.set(_c.isProcessing || Cr.useManualTiming ? _c.timestamp : performance.now()), Sc),
  set: (t) => {
    Sc = t, queueMicrotask(T5);
  }
}, hS = (t) => (a) => typeof a == "string" && a.startsWith(t), mS = /* @__PURE__ */ hS("--"), R5 = /* @__PURE__ */ hS("var(--"), im = (t) => R5(t) ? _5.test(t.split("/*")[0].trim()) : !1, _5 = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
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
function M5(t) {
  return t == null;
}
const A5 = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, om = (t, a) => (s) => !!(typeof s == "string" && A5.test(s) && s.startsWith(t) || a && !M5(s) && Object.prototype.hasOwnProperty.call(s, a)), pS = (t, a, s) => (i) => {
  if (typeof i != "string")
    return i;
  const [o, u, f, p] = i.match(lm);
  return {
    [t]: parseFloat(o),
    [a]: parseFloat(u),
    [s]: parseFloat(f),
    alpha: p !== void 0 ? parseFloat(p) : 1
  };
}, k5 = (t) => Nr(0, 255, t), $f = {
  ...si,
  transform: (t) => Math.round(k5(t))
}, Qr = {
  test: /* @__PURE__ */ om("rgb", "red"),
  parse: /* @__PURE__ */ pS("red", "green", "blue"),
  transform: ({ red: t, green: a, blue: s, alpha: i = 1 }) => "rgba(" + $f.transform(t) + ", " + $f.transform(a) + ", " + $f.transform(s) + ", " + ml(wl.transform(i)) + ")"
};
function D5(t) {
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
  parse: D5,
  transform: Qr.transform
}, Al = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (a) => typeof a == "string" && a.endsWith(t) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${t}`
}), yr = /* @__PURE__ */ Al("deg"), Qs = /* @__PURE__ */ Al("%"), Oe = /* @__PURE__ */ Al("px"), z5 = /* @__PURE__ */ Al("vh"), O5 = /* @__PURE__ */ Al("vw"), fb = {
  ...Qs,
  parse: (t) => Qs.parse(t) / 100,
  transform: (t) => Qs.transform(t * 100)
}, Ks = {
  test: /* @__PURE__ */ om("hsl", "hue"),
  parse: /* @__PURE__ */ pS("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: a, lightness: s, alpha: i = 1 }) => "hsla(" + Math.round(t) + ", " + Qs.transform(ml(a)) + ", " + Qs.transform(ml(s)) + ", " + ml(wl.transform(i)) + ")"
}, nn = {
  test: (t) => Qr.test(t) || ch.test(t) || Ks.test(t),
  parse: (t) => Qr.test(t) ? Qr.parse(t) : Ks.test(t) ? Ks.parse(t) : ch.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? Qr.transform(t) : Ks.transform(t),
  getAnimatableNone: (t) => {
    const a = nn.parse(t);
    return a.alpha = 0, nn.transform(a);
  }
}, L5 = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function $5(t) {
  return isNaN(t) && typeof t == "string" && (t.match(lm)?.length || 0) + (t.match(L5)?.length || 0) > 0;
}
const gS = "number", vS = "color", U5 = "var", B5 = "var(", hb = "${}", I5 = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function ti(t) {
  const a = t.toString(), s = [], i = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let u = 0;
  const p = a.replace(I5, (y) => (nn.test(y) ? (i.color.push(u), o.push(vS), s.push(nn.parse(y))) : y.startsWith(B5) ? (i.var.push(u), o.push(U5), s.push(y)) : (i.number.push(u), o.push(gS), s.push(parseFloat(y))), ++u, hb)).split(hb);
  return { values: s, split: p, indexes: i, types: o };
}
function V5(t) {
  return ti(t).values;
}
function yS({ split: t, types: a }) {
  const s = t.length;
  return (i) => {
    let o = "";
    for (let u = 0; u < s; u++)
      if (o += t[u], i[u] !== void 0) {
        const f = a[u];
        f === gS ? o += ml(i[u]) : f === vS ? o += nn.transform(i[u]) : o += i[u];
      }
    return o;
  };
}
function q5(t) {
  return yS(ti(t));
}
const H5 = (t) => typeof t == "number" ? 0 : nn.test(t) ? nn.getAnimatableNone(t) : t, F5 = (t, a) => typeof t == "number" ? a?.trim().endsWith("/") ? t : 0 : H5(t);
function P5(t) {
  const a = ti(t);
  return yS(a)(a.values.map((i, o) => F5(i, a.split[o])));
}
const da = {
  test: $5,
  parse: V5,
  createTransformer: q5,
  getAnimatableNone: P5
};
function Uf(t, a, s) {
  return s < 0 && (s += 1), s > 1 && (s -= 1), s < 1 / 6 ? t + (a - t) * 6 * s : s < 1 / 2 ? a : s < 2 / 3 ? t + (a - t) * (2 / 3 - s) * 6 : t;
}
function G5({ hue: t, saturation: a, lightness: s, alpha: i }) {
  t /= 360, a /= 100, s /= 100;
  let o = 0, u = 0, f = 0;
  if (!a)
    o = u = f = s;
  else {
    const p = s < 0.5 ? s * (1 + a) : s + a - s * a, y = 2 * s - p;
    o = Uf(y, p, t + 1 / 3), u = Uf(y, p, t), f = Uf(y, p, t - 1 / 3);
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
}, Y5 = [ch, Qr, Ks], K5 = (t) => Y5.find((a) => a.test(t));
function mb(t) {
  const a = K5(t);
  if (_l(!!a, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let s = a.parse(t);
  return a === Ks && (s = G5(s)), s;
}
const pb = (t, a) => {
  const s = mb(t), i = mb(a);
  if (!s || !i)
    return Mc(t, a);
  const o = { ...s };
  return (u) => (o.red = Bf(s.red, i.red, u), o.green = Bf(s.green, i.green, u), o.blue = Bf(s.blue, i.blue, u), o.alpha = kl(s.alpha, i.alpha, u), Qr.transform(o));
}, uh = /* @__PURE__ */ new Set(["none", "hidden"]);
function X5(t, a) {
  return uh.has(t) ? (s) => s <= 0 ? t : a : (s) => s >= 1 ? a : t;
}
function Q5(t, a) {
  return (s) => kl(t, a, s);
}
function cm(t) {
  return typeof t == "number" ? Q5 : typeof t == "string" ? im(t) ? Mc : nn.test(t) ? pb : W5 : Array.isArray(t) ? bS : typeof t == "object" ? nn.test(t) ? pb : Z5 : Mc;
}
function bS(t, a) {
  const s = [...t], i = s.length, o = t.map((u, f) => cm(u)(u, a[f]));
  return (u) => {
    for (let f = 0; f < i; f++)
      s[f] = o[f](u);
    return s;
  };
}
function Z5(t, a) {
  const s = { ...t, ...a }, i = {};
  for (const o in s)
    t[o] !== void 0 && a[o] !== void 0 && (i[o] = cm(t[o])(t[o], a[o]));
  return (o) => {
    for (const u in i)
      s[u] = i[u](o);
    return s;
  };
}
function J5(t, a) {
  const s = [], i = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const u = a.types[o], f = t.indexes[u][i[u]], p = t.values[f] ?? 0;
    s[o] = p, i[u]++;
  }
  return s;
}
const W5 = (t, a) => {
  const s = da.createTransformer(a), i = ti(t), o = ti(a);
  return i.indexes.var.length === o.indexes.var.length && i.indexes.color.length === o.indexes.color.length && i.indexes.number.length >= o.indexes.number.length ? uh.has(t) && !o.values.length || uh.has(a) && !i.values.length ? X5(t, a) : Qc(bS(J5(i, o), o.values), s) : (_l(!0, `Complex values '${t}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Mc(t, a));
};
function xS(t, a, s) {
  return typeof t == "number" && typeof a == "number" && typeof s == "number" ? kl(t, a, s) : cm(t)(t, a);
}
const eD = (t) => {
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
}, SS = (t, a, s = 10) => {
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
function tD(t, a = 100, s) {
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
const nD = 12;
function aD(t, a, s) {
  let i = s;
  for (let o = 1; o < nD; o++)
    i = i - t(i) / a(i);
  return i;
}
const If = 1e-3;
function rD({ duration: t = Vt.duration, bounce: a = Vt.bounce, velocity: s = Vt.velocity, mass: i = Vt.mass }) {
  let o, u;
  _l(t <= /* @__PURE__ */ ta(Vt.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let f = 1 - a;
  f = Nr(Vt.minDamping, Vt.maxDamping, f), t = Nr(Vt.minDuration, Vt.maxDuration, /* @__PURE__ */ ua(t)), f < 1 ? (o = (m) => {
    const b = m * f, v = b * t, S = b - s, w = dh(m, f), j = Math.exp(-v);
    return If - S / w * j;
  }, u = (m) => {
    const v = m * f * t, S = v * s + s, w = Math.pow(f, 2) * Math.pow(m, 2) * t, j = Math.exp(-v), C = dh(Math.pow(m, 2), f);
    return (-o(m) + If > 0 ? -1 : 1) * ((S - w) * j) / C;
  }) : (o = (m) => {
    const b = Math.exp(-m * t), v = (m - s) * t + 1;
    return -If + b * v;
  }, u = (m) => {
    const b = Math.exp(-m * t), v = (s - m) * (t * t);
    return b * v;
  });
  const p = 5 / t, y = aD(o, u, p);
  if (t = /* @__PURE__ */ ta(t), isNaN(y))
    return {
      stiffness: Vt.stiffness,
      damping: Vt.damping,
      duration: t
    };
  {
    const m = Math.pow(y, 2) * i;
    return {
      stiffness: m,
      damping: f * 2 * Math.sqrt(i * m),
      duration: t
    };
  }
}
const sD = ["duration", "bounce"], iD = ["stiffness", "damping", "mass"];
function gb(t, a) {
  return a.some((s) => t[s] !== void 0);
}
function lD(t) {
  let a = {
    velocity: Vt.velocity,
    stiffness: Vt.stiffness,
    damping: Vt.damping,
    mass: Vt.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!gb(t, iD) && gb(t, sD))
    if (a.velocity = 0, t.visualDuration) {
      const s = t.visualDuration, i = 2 * Math.PI / (s * 1.2), o = i * i, u = 2 * Nr(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: Vt.mass,
        stiffness: o,
        damping: u
      };
    } else {
      const s = rD({ ...t, velocity: 0 });
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
  const u = s.keyframes[0], f = s.keyframes[s.keyframes.length - 1], p = { done: !1, value: u }, { stiffness: y, damping: m, mass: b, duration: v, velocity: S, isResolvedFromDuration: w } = lD({
    ...s,
    velocity: -/* @__PURE__ */ ua(s.velocity || 0)
  }), j = S || 0, C = m / (2 * Math.sqrt(y * b)), _ = f - u, T = /* @__PURE__ */ ua(Math.sqrt(y / b)), O = Math.abs(_) < 5;
  i || (i = O ? Vt.restSpeed.granular : Vt.restSpeed.default), o || (o = O ? Vt.restDelta.granular : Vt.restDelta.default);
  let R, N, U, Y, ae, M;
  if (C < 1)
    U = dh(T, C), Y = (j + C * T * _) / U, R = (D) => {
      const H = Math.exp(-C * T * D);
      return f - H * (Y * Math.sin(U * D) + _ * Math.cos(U * D));
    }, ae = C * T * Y + _ * U, M = C * T * _ - Y * U, N = (D) => Math.exp(-C * T * D) * (ae * Math.sin(U * D) + M * Math.cos(U * D));
  else if (C === 1) {
    R = (H) => f - Math.exp(-T * H) * (_ + (j + T * _) * H);
    const D = j + T * _;
    N = (H) => Math.exp(-T * H) * (T * D * H - j);
  } else {
    const D = T * Math.sqrt(C * C - 1);
    R = (P) => {
      const ie = Math.exp(-C * T * P), A = Math.min(D * P, 300);
      return f - ie * ((j + C * T * _) * Math.sinh(A) + D * _ * Math.cosh(A)) / D;
    };
    const H = (j + C * T * _) / D, Q = C * T * H - _ * D, J = C * T * _ - H * D;
    N = (P) => {
      const ie = Math.exp(-C * T * P), A = Math.min(D * P, 300);
      return ie * (Q * Math.sinh(A) + J * Math.cosh(A));
    };
  }
  const V = {
    calculatedDuration: w && v || null,
    velocity: (D) => /* @__PURE__ */ ta(N(D)),
    next: (D) => {
      if (!w && C < 1) {
        const Q = Math.exp(-C * T * D), J = Math.sin(U * D), P = Math.cos(U * D), ie = f - Q * (Y * J + _ * P), A = /* @__PURE__ */ ta(Q * (ae * J + M * P));
        return p.done = Math.abs(A) <= i && Math.abs(f - ie) <= o, p.value = p.done ? f : ie, p;
      }
      const H = R(D);
      if (w)
        p.done = D >= v;
      else {
        const Q = /* @__PURE__ */ ta(N(D));
        p.done = Math.abs(Q) <= i && Math.abs(f - H) <= o;
      }
      return p.value = p.done ? f : H, p;
    },
    toString: () => {
      const D = Math.min(um(V), Ac), H = SS((Q) => V.next(D * Q).value, D, 30);
      return D + "ms " + H;
    },
    toTransition: () => {
    }
  };
  return V;
}
kc.applyToOptions = (t) => {
  const a = tD(t, 100, kc);
  return t.ease = a.ease, t.duration = /* @__PURE__ */ ta(a.duration), t.type = "keyframes", t;
};
const oD = 5;
function wS(t, a, s) {
  const i = Math.max(a - oD, 0);
  return nS(s - t(i), a - i);
}
function fh({ keyframes: t, velocity: a = 0, power: s = 0.8, timeConstant: i = 325, bounceDamping: o = 10, bounceStiffness: u = 500, modifyTarget: f, min: p, max: y, restDelta: m = 0.5, restSpeed: b }) {
  const v = t[0], S = {
    done: !1,
    value: v
  }, w = (M) => p !== void 0 && M < p || y !== void 0 && M > y, j = (M) => p === void 0 ? y : y === void 0 || Math.abs(p - M) < Math.abs(y - M) ? p : y;
  let C = s * a;
  const _ = v + C, T = f === void 0 ? _ : f(_);
  T !== _ && (C = T - v);
  const O = (M) => -C * Math.exp(-M / i), R = (M) => T + O(M), N = (M) => {
    const V = O(M), D = R(M);
    S.done = Math.abs(V) <= m, S.value = S.done ? T : D;
  };
  let U, Y;
  const ae = (M) => {
    w(S.value) && (U = M, Y = kc({
      keyframes: [S.value, j(S.value)],
      velocity: wS(R, M, S.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: u,
      restDelta: m,
      restSpeed: b
    }));
  };
  return ae(0), {
    calculatedDuration: null,
    next: (M) => {
      let V = !1;
      return !Y && U === void 0 && (V = !0, N(M), ae(M)), U !== void 0 && M >= U ? Y.next(M - U) : (!V && N(M), S);
    }
  };
}
function cD(t, a, s) {
  const i = [], o = s || Cr.mix || xS, u = t.length - 1;
  for (let f = 0; f < u; f++) {
    let p = o(t[f], t[f + 1]);
    if (a) {
      const y = Array.isArray(a) ? a[f] || ri : a;
      p = Qc(y, p);
    }
    i.push(p);
  }
  return i;
}
function uD(t, a, { clamp: s = !0, ease: i, mixer: o } = {}) {
  const u = t.length;
  if (ei(u === a.length, "Both input and output ranges must be the same length", "range-length"), u === 1)
    return () => a[0];
  if (u === 2 && a[0] === a[1])
    return () => a[1];
  const f = t[0] === t[1];
  t[0] > t[u - 1] && (t = [...t].reverse(), a = [...a].reverse());
  const p = cD(a, i, o), y = p.length, m = (b) => {
    if (f && b < t[0])
      return a[0];
    let v = 0;
    if (y > 1)
      for (; v < t.length - 2 && !(b < t[v + 1]); v++)
        ;
    const S = /* @__PURE__ */ eS(t[v], t[v + 1], b);
    return p[v](S);
  };
  return s ? (b) => m(Nr(t[0], t[u - 1], b)) : m;
}
function dD(t, a) {
  const s = t[t.length - 1];
  for (let i = 1; i <= a; i++) {
    const o = /* @__PURE__ */ eS(0, a, i);
    t.push(kl(s, 1, o));
  }
}
function fD(t) {
  const a = [0];
  return dD(a, t.length - 1), a;
}
function hD(t, a) {
  return t.map((s) => s * a);
}
function mD(t, a) {
  return t.map(() => a || uS).splice(0, t.length - 1);
}
function pl({ duration: t = 300, keyframes: a, times: s, ease: i = "easeInOut" }) {
  const o = j5(i) ? i.map(ub) : ub(i), u = {
    done: !1,
    value: a[0]
  }, f = hD(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    s && s.length === a.length ? s : fD(a),
    t
  ), p = uD(f, a, {
    ease: Array.isArray(o) ? o : mD(a, o)
  });
  return {
    calculatedDuration: t,
    next: (y) => (u.value = p(y), u.done = y >= t, u)
  };
}
const pD = (t) => t !== null;
function Zc(t, { repeat: a, repeatType: s = "loop" }, i, o = 1) {
  const u = t.filter(pD), p = o < 0 || a && s !== "loop" && a % 2 === 1 ? 0 : u.length - 1;
  return !p || i === void 0 ? u[p] : i;
}
const gD = {
  decay: fh,
  inertia: fh,
  tween: pl,
  keyframes: pl,
  spring: kc
};
function jS(t) {
  typeof t.type == "string" && (t.type = gD[t.type]);
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
const vD = (t) => t / 100;
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
    jS(a);
    const { type: s = pl, repeat: i = 0, repeatDelay: o = 0, repeatType: u, velocity: f = 0 } = a;
    let { keyframes: p } = a;
    const y = s || pl;
    y !== pl && typeof p[0] != "number" && (this.mixKeyframes = Qc(vD, xS(p[0], p[1])), p = [0, 100]);
    const m = y({ ...a, keyframes: p });
    u === "mirror" && (this.mirroredGenerator = y({
      ...a,
      keyframes: [...p].reverse(),
      velocity: -f
    })), m.calculatedDuration === null && (m.calculatedDuration = um(m));
    const { calculatedDuration: b } = m;
    this.calculatedDuration = b, this.resolvedDuration = b + o, this.totalDuration = this.resolvedDuration * (i + 1) - o, this.generator = m;
  }
  updateTime(a) {
    const s = Math.round(a - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = s;
  }
  tick(a, s = !1) {
    const { generator: i, totalDuration: o, mixKeyframes: u, mirroredGenerator: f, resolvedDuration: p, calculatedDuration: y } = this;
    if (this.startTime === null)
      return i.next(0);
    const { delay: m = 0, keyframes: b, repeat: v, repeatType: S, repeatDelay: w, type: j, onUpdate: C, finalKeyframe: _ } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), s ? this.currentTime = a : this.updateTime(a);
    const T = this.currentTime - m * (this.playbackSpeed >= 0 ? 1 : -1), O = this.playbackSpeed >= 0 ? T < 0 : T > o;
    this.currentTime = Math.max(T, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let R = this.currentTime, N = i;
    if (v) {
      const M = Math.min(this.currentTime, o) / p;
      let V = Math.floor(M), D = M % 1;
      !D && M >= 1 && (D = 1), D === 1 && V--, V = Math.min(V, v + 1), !!(V % 2) && (S === "reverse" ? (D = 1 - D, w && (D -= w / p)) : S === "mirror" && (N = f)), R = Nr(0, 1, D) * p;
    }
    let U;
    O ? (this.delayState.value = b[0], U = this.delayState) : U = N.next(R), u && !O && (U.value = u(U.value));
    let { done: Y } = U;
    !O && y !== null && (Y = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const ae = this.holdTime === null && (this.state === "finished" || this.state === "running" && Y);
    return ae && j !== fh && (U.value = Zc(b, this.options, _, this.speed)), C && C(U.value), ae && this.finish(), U;
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
    return wS((i) => this.generator.next(i).value, a, s);
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
    const { driver: a = eD, startTime: s } = this.options;
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
function yD(t) {
  for (let a = 1; a < t.length; a++)
    t[a] ?? (t[a] = t[a - 1]);
}
const Zr = (t) => t * 180 / Math.PI, hh = (t) => {
  const a = Zr(Math.atan2(t[1], t[0]));
  return mh(a);
}, bD = {
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
}, mh = (t) => (t = t % 360, t < 0 && (t += 360), t), vb = hh, yb = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), bb = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), xD = {
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
    i = xD, o = s;
  else {
    const p = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = bD, o = p;
  }
  if (!o)
    return ph(a);
  const u = i[a], f = o[1].split(",").map(wD);
  return typeof u == "function" ? u(f) : f[u];
}
const SD = (t, a) => {
  const { transform: s = "none" } = getComputedStyle(t);
  return gh(s, a);
};
function wD(t) {
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
], li = new Set(ii), xb = (t) => t === si || t === Oe, jD = /* @__PURE__ */ new Set(["x", "y", "z"]), ED = ii.filter((t) => !jD.has(t));
function ND(t) {
  const a = [];
  return ED.forEach((s) => {
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
function ES() {
  if (yh) {
    const t = Array.from(Wr).filter((i) => i.needsMeasurement), a = new Set(t.map((i) => i.element)), s = /* @__PURE__ */ new Map();
    a.forEach((i) => {
      const o = ND(i);
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
function NS() {
  Wr.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (yh = !0);
  });
}
function CD() {
  bh = !0, NS(), ES(), bh = !1;
}
class fm {
  constructor(a, s, i, o, u, f = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = s, this.name = i, this.motionValue = o, this.element = u, this.isAsync = f;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Wr.add(this), vh || (vh = !0, na.read(NS), na.resolveKeyframes(ES))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, name: s, element: i, motionValue: o } = this;
    if (a[0] === null) {
      const u = o?.get(), f = a[a.length - 1];
      if (u !== void 0)
        a[0] = u;
      else if (i && s) {
        const p = i.readValue(s, f);
        p != null && (a[0] = p);
      }
      a[0] === void 0 && (a[0] = f), o && u === void 0 && o.set(a[0]);
    }
    yD(a);
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
const TD = (t) => t.startsWith("--");
function CS(t, a, s) {
  TD(a) ? t.style.setProperty(a, s) : t.style[a] = s;
}
const RD = {};
function TS(t, a) {
  const s = /* @__PURE__ */ W1(t);
  return () => RD[a] ?? s();
}
const _D = /* @__PURE__ */ TS(() => window.ScrollTimeline !== void 0, "scrollTimeline"), RS = /* @__PURE__ */ TS(() => {
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
function _S(t, a) {
  if (t)
    return typeof t == "function" ? RS() ? SS(t, a) : "ease-out" : dS(t) ? dl(t) : Array.isArray(t) ? t.map((s) => _S(s, a) || Sb.easeOut) : Sb[t];
}
function MD(t, a, s, { delay: i = 0, duration: o = 300, repeat: u = 0, repeatType: f = "loop", ease: p = "easeOut", times: y } = {}, m = void 0) {
  const b = {
    [a]: s
  };
  y && (b.offset = y);
  const v = _S(p, o);
  Array.isArray(v) && (b.easing = v);
  const S = {
    delay: i,
    duration: o,
    easing: Array.isArray(v) ? "linear" : v,
    fill: "both",
    iterations: u + 1,
    direction: f === "reverse" ? "alternate" : "normal"
  };
  return m && (S.pseudoElement = m), t.animate(b, S);
}
function MS(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function AD({ type: t, ...a }) {
  return MS(t) && RS() ? t.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class AS extends dm {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: s, name: i, keyframes: o, pseudoElement: u, allowFlatten: f = !1, finalKeyframe: p, onComplete: y } = a;
    this.isPseudoElement = !!u, this.allowFlatten = f, this.options = a, ei(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const m = AD(a);
    this.animation = MD(s, i, o, m, u), m.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !u) {
        const b = Zc(o, this.options, p, this.speed);
        this.updateMotionValue && this.updateMotionValue(b), CS(s, i, b), this.animation.cancel();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && _D() ? (this.animation.timeline = a, s && (this.animation.rangeStart = s), i && (this.animation.rangeEnd = i), ri) : o(this);
  }
}
const kS = {
  anticipate: oS,
  backInOut: lS,
  circInOut: cS
};
function kD(t) {
  return t in kS;
}
function DD(t) {
  typeof t.ease == "string" && kD(t.ease) && (t.ease = kS[t.ease]);
}
const Vf = 10;
class zD extends AS {
  constructor(a) {
    DD(a), jS(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const p = new Dc({
      ...f,
      autoplay: !1
    }), y = Math.max(Vf, Hn.now() - this.startTime), m = Nr(0, Vf, y - Vf), b = p.sample(y).value, { name: v } = this.options;
    u && v && CS(u, v, b), s.setWithVelocity(p.sample(Math.max(0, y - m)).value, b, m), p.stop();
  }
}
const wb = (t, a) => a === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(da.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function OD(t) {
  const a = t[0];
  if (t.length === 1)
    return !0;
  for (let s = 0; s < t.length; s++)
    if (t[s] !== a)
      return !0;
}
function LD(t, a, s, i) {
  const o = t[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const u = t[t.length - 1], f = wb(o, a), p = wb(u, a);
  return _l(f === p, `You are trying to animate ${a} from "${o}" to "${u}". "${f ? u : o}" is not an animatable value.`, "value-not-animatable"), !f || !p ? !1 : OD(t) || (s === "spring" || MS(s)) && i;
}
function xh(t) {
  t.duration = 0, t.type = "keyframes";
}
const DS = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), $D = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function UD(t) {
  for (let a = 0; a < t.length; a++)
    if (typeof t[a] == "string" && $D.test(t[a]))
      return !0;
  return !1;
}
const BD = /* @__PURE__ */ new Set([
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
]), ID = /* @__PURE__ */ W1(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function VD(t) {
  const { motionValue: a, name: s, repeatDelay: i, repeatType: o, damping: u, type: f, keyframes: p } = t;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: m, transformTemplate: b } = a.owner.getProps();
  return ID() && s && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (DS.has(s) || BD.has(s) && UD(p)) && (s !== "transform" || !b) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !m && !i && o !== "mirror" && u !== 0 && f !== "inertia";
}
const qD = 40;
class HD extends dm {
  constructor({ autoplay: a = !0, delay: s = 0, type: i = "keyframes", repeat: o = 0, repeatDelay: u = 0, repeatType: f = "loop", keyframes: p, name: y, motionValue: m, element: b, ...v }) {
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
      motionValue: m,
      element: b,
      ...v
    }, w = b?.KeyframeResolver || fm;
    this.keyframeResolver = new w(p, (j, C, _) => this.onKeyframesResolved(j, C, S, !_), y, m, b), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, s, i, o) {
    this.keyframeResolver = void 0;
    const { name: u, type: f, velocity: p, delay: y, isHandoff: m, onUpdate: b } = i;
    this.resolvedAt = Hn.now();
    let v = !0;
    LD(a, u, f, p) || (v = !1, (Cr.instantAnimations || !y) && b?.(Zc(a, i, s)), a[0] = a[a.length - 1], xh(i), i.repeat = 0);
    const w = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > qD ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: s,
      ...i,
      keyframes: a
    }, j = v && !m && VD(w), C = w.motionValue?.owner?.current;
    let _;
    if (j)
      try {
        _ = new zD({
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
    return this._animation || (this.keyframeResolver?.resume(), CD()), this._animation;
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
function zS(t, a, s, i = 0, o = 1) {
  const u = Array.from(t).sort((m, b) => m.sortNodePosition(b)).indexOf(a), f = t.size, p = (f - 1) * i;
  return typeof s == "function" ? s(u, f) : o === 1 ? u * i : p - u * i;
}
const FD = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function PD(t) {
  const a = FD.exec(t);
  if (!a)
    return [,];
  const [, s, i, o] = a;
  return [`--${s ?? i}`, o];
}
const GD = 4;
function OS(t, a, s = 1) {
  ei(s <= GD, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [i, o] = PD(t);
  if (!i)
    return;
  const u = window.getComputedStyle(a).getPropertyValue(i);
  if (u) {
    const f = u.trim();
    return Z1(f) ? parseFloat(f) : f;
  }
  return im(o) ? OS(o, a, s + 1) : o;
}
const YD = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, KD = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), XD = {
  type: "keyframes",
  duration: 0.8
}, QD = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, ZD = (t, { keyframes: a }) => a.length > 2 ? XD : li.has(t) ? t.startsWith("scale") ? KD(a[1]) : YD : QD;
function LS(t, a) {
  if (t?.inherit && a) {
    const { inherit: s, ...i } = t;
    return { ...a, ...i };
  }
  return t;
}
function $S(t, a) {
  const s = t?.[a] ?? t?.default ?? t;
  return s !== t ? LS(s, t) : s;
}
const JD = /* @__PURE__ */ new Set([
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
function WD(t) {
  for (const a in t)
    if (!JD.has(a))
      return !0;
  return !1;
}
const ez = (t, a, s, i = {}, o, u) => (f) => {
  const p = $S(i, t) || {}, y = p.delay || i.delay || 0;
  let { elapsed: m = 0 } = i;
  m = m - /* @__PURE__ */ ta(y);
  const b = {
    keyframes: Array.isArray(s) ? s : [null, s],
    ease: "easeOut",
    velocity: a.getVelocity(),
    ...p,
    delay: -m,
    onUpdate: (S) => {
      a.set(S), p.onUpdate && p.onUpdate(S);
    },
    onComplete: () => {
      f(), p.onComplete && p.onComplete();
    },
    name: t,
    motionValue: a,
    element: u ? void 0 : o
  };
  WD(p) || Object.assign(b, ZD(t, b)), b.duration && (b.duration = /* @__PURE__ */ ta(b.duration)), b.repeatDelay && (b.repeatDelay = /* @__PURE__ */ ta(b.repeatDelay)), b.from !== void 0 && (b.keyframes[0] = b.from);
  let v = !1;
  if ((b.type === !1 || b.duration === 0 && !b.repeatDelay) && (xh(b), b.delay === 0 && (v = !0)), (Cr.instantAnimations || Cr.skipAnimations || o?.shouldSkipAnimations) && (v = !0, xh(b), b.delay = 0), b.allowFlatten = !p.type && !p.ease, v && !u && a.get() !== void 0) {
    const S = Zc(b.keyframes, p);
    if (S !== void 0) {
      na.update(() => {
        b.onUpdate(S), b.onComplete();
      });
      return;
    }
  }
  return p.isSync ? new Dc(b) : new HD(b);
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
const US = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...ii
]), Eb = 30, tz = (t) => !isNaN(parseFloat(t));
class nz {
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
    this.current = a, this.updatedAt = Hn.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = tz(this.current));
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
    this.events[a] || (this.events[a] = new tS());
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
    return nS(parseFloat(this.current) - parseFloat(this.prevFrameValue), s);
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
  return new nz(t, a);
}
const Sh = (t) => Array.isArray(t);
function az(t, a, s) {
  t.hasValue(a) ? t.getValue(a).set(s) : t.addValue(a, zc(s));
}
function rz(t) {
  return Sh(t) ? t[t.length - 1] || 0 : t;
}
function sz(t, a) {
  const s = es(t, a);
  let { transitionEnd: i = {}, transition: o = {}, ...u } = s || {};
  u = { ...u, ...i };
  for (const f in u) {
    const p = rz(u[f]);
    az(t, f, p);
  }
}
const xn = (t) => !!(t && t.getVelocity);
function iz(t) {
  return !!(xn(t) && t.add);
}
function lz(t, a) {
  const s = t.getValue("willChange");
  if (iz(s))
    return s.add(a);
  if (!s && Cr.WillChange) {
    const i = new Cr.WillChange("auto");
    t.addValue("willChange", i), i.add(a);
  }
}
function mm(t) {
  return t.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const oz = "framerAppearId", BS = "data-" + mm(oz);
function cz(t) {
  return t.props[BS];
}
function uz({ protectedKeys: t, needsAnimating: a }, s) {
  const i = t.hasOwnProperty(s) && a[s] !== !0;
  return a[s] = !1, i;
}
function IS(t, a, { delay: s = 0, transitionOverride: i, type: o } = {}) {
  let { transition: u, transitionEnd: f, ...p } = a;
  const y = t.getDefaultTransition();
  u = u ? LS(u, y) : y;
  const m = u?.reduceMotion;
  i && (u = i);
  const b = [], v = o && t.animationState && t.animationState.getState()[o];
  for (const S in p) {
    const w = t.getValue(S, t.latestValues[S] ?? null), j = p[S];
    if (j === void 0 || v && uz(v, S))
      continue;
    const C = {
      delay: s,
      ...$S(u || {}, S)
    }, _ = w.get();
    if (_ !== void 0 && !w.isAnimating() && !Array.isArray(j) && j === _ && !C.velocity) {
      na.update(() => w.set(j));
      continue;
    }
    let T = !1;
    if (window.MotionHandoffAnimation) {
      const N = cz(t);
      if (N) {
        const U = window.MotionHandoffAnimation(N, S, na);
        U !== null && (C.startTime = U, T = !0);
      }
    }
    lz(t, S);
    const O = m ?? t.shouldReduceMotion;
    w.start(ez(S, w, j, O && US.has(S) ? { type: !1 } : C, t, T));
    const R = w.animation;
    R && b.push(R);
  }
  if (f) {
    const S = () => na.update(() => {
      f && sz(t, f);
    });
    b.length ? Promise.all(b).then(S) : S();
  }
  return b;
}
function wh(t, a, s = {}) {
  const i = es(t, a, s.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: o = t.getDefaultTransition() || {} } = i || {};
  s.transitionOverride && (o = s.transitionOverride);
  const u = i ? () => Promise.all(IS(t, i, s)) : () => Promise.resolve(), f = t.variantChildren && t.variantChildren.size ? (y = 0) => {
    const { delayChildren: m = 0, staggerChildren: b, staggerDirection: v } = o;
    return dz(t, a, y, m, b, v, s);
  } : () => Promise.resolve(), { when: p } = o;
  if (p) {
    const [y, m] = p === "beforeChildren" ? [u, f] : [f, u];
    return y().then(() => m());
  } else
    return Promise.all([u(), f(s.delay)]);
}
function dz(t, a, s = 0, i = 0, o = 0, u = 1, f) {
  const p = [];
  for (const y of t.variantChildren)
    y.notify("AnimationStart", a), p.push(wh(y, a, {
      ...f,
      delay: s + (typeof i == "function" ? 0 : i) + zS(t.variantChildren, y, i, o, u)
    }).then(() => y.notify("AnimationComplete", a)));
  return Promise.all(p);
}
function fz(t, a, s = {}) {
  t.notify("AnimationStart", a);
  let i;
  if (Array.isArray(a)) {
    const o = a.map((u) => wh(t, u, s));
    i = Promise.all(o);
  } else if (typeof a == "string")
    i = wh(t, a, s);
  else {
    const o = typeof a == "function" ? es(t, a, s.custom) : a;
    i = Promise.all(IS(t, o, s));
  }
  return i.then(() => {
    t.notify("AnimationComplete", a);
  });
}
const hz = {
  test: (t) => t === "auto",
  parse: (t) => t
}, VS = (t) => (a) => a.test(t), qS = [si, Oe, Qs, yr, O5, z5, hz], Nb = (t) => qS.find(VS(t));
function mz(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || J1(t) : !0;
}
const pz = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function gz(t) {
  const [a, s] = t.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return t;
  const [i] = s.match(lm) || [];
  if (!i)
    return t;
  const o = s.replace(i, "");
  let u = pz.has(a) ? 1 : 0;
  return i !== s && (u *= 100), a + "(" + u + o + ")";
}
const vz = /\b([a-z-]*)\(.*?\)/gu, jh = {
  ...da,
  getAnimatableNone: (t) => {
    const a = t.match(vz);
    return a ? a.map(gz).join(" ") : t;
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
}, yz = {
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
  ...yz,
  zIndex: Cb,
  // SVG
  fillOpacity: wl,
  strokeOpacity: wl,
  numOctaves: Cb
}, bz = {
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
}, HS = (t) => bz[t], xz = /* @__PURE__ */ new Set([jh, Eh]);
function FS(t, a) {
  let s = HS(t);
  return xz.has(s) || (s = da), s.getAnimatableNone ? s.getAnimatableNone(a) : void 0;
}
const Sz = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function wz(t, a, s) {
  let i = 0, o;
  for (; i < t.length && !o; ) {
    const u = t[i];
    typeof u == "string" && !Sz.has(u) && ti(u).values.length && (o = t[i]), i++;
  }
  if (o && s)
    for (const u of a)
      t[u] = FS(s, o);
}
class jz extends fm {
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
        const S = OS(v, s.current);
        S !== void 0 && (a[b] = S), b === a.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !US.has(i) || a.length !== 2)
      return;
    const [o, u] = a, f = Nb(o), p = Nb(u), y = db(o), m = db(u);
    if (y !== m && jr[i]) {
      this.needsMeasurement = !0;
      return;
    }
    if (f !== p)
      if (xb(f) && xb(p))
        for (let b = 0; b < a.length; b++) {
          const v = a[b];
          typeof v == "string" && (a[b] = parseFloat(v));
        }
      else jr[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: s } = this, i = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || mz(a[o])) && i.push(o);
    i.length && wz(a, i, s);
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
    i[u] = jr[s](a.measureViewportBox(), window.getComputedStyle(a.current)), f !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = f), this.removedTransforms?.length && this.removedTransforms.forEach(([p, y]) => {
      a.getValue(p).set(y);
    }), this.resolveNoneKeyframes();
  }
}
function Ez(t, a, s) {
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
const PS = (t, a) => a && typeof t == "number" ? a.transform(t) : t;
function wc(t) {
  return p5(t) && "offsetHeight" in t && !("ownerSVGElement" in t);
}
const { schedule: Nz } = /* @__PURE__ */ fS(queueMicrotask, !1), Cz = {
  y: !1
};
function Tz() {
  return Cz.y;
}
function GS(t, a) {
  const s = Ez(t), i = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: i.signal
  };
  return [s, o, () => i.abort()];
}
function Rz(t) {
  return !(t.pointerType === "touch" || Tz());
}
function _z(t, a, s = {}) {
  const [i, o, u] = GS(t, s);
  return i.forEach((f) => {
    let p = !1, y = !1, m;
    const b = () => {
      f.removeEventListener("pointerleave", j);
    }, v = (_) => {
      m && (m(_), m = void 0), b();
    }, S = (_) => {
      p = !1, window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), y && (y = !1, v(_));
    }, w = () => {
      p = !0, window.addEventListener("pointerup", S, o), window.addEventListener("pointercancel", S, o);
    }, j = (_) => {
      if (_.pointerType !== "touch") {
        if (p) {
          y = !0;
          return;
        }
        v(_);
      }
    }, C = (_) => {
      if (!Rz(_))
        return;
      y = !1;
      const T = a(f, _);
      typeof T == "function" && (m = T, f.addEventListener("pointerleave", j, o));
    };
    f.addEventListener("pointerenter", C, o), f.addEventListener("pointerdown", w, o);
  }), u;
}
const YS = (t, a) => a ? t === a ? !0 : YS(t, a.parentElement) : !1, Mz = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, Az = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function kz(t) {
  return Az.has(t.tagName) || t.isContentEditable === !0;
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
const Dz = (t, a) => {
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
  return Mz(t) && !0;
}
const _b = /* @__PURE__ */ new WeakSet();
function zz(t, a, s = {}) {
  const [i, o, u] = GS(t, s), f = (p) => {
    const y = p.currentTarget;
    if (!Rb(p) || _b.has(p))
      return;
    jc.add(y), s.stopPropagation && _b.add(p);
    const m = a(y, p), b = (w, j) => {
      window.removeEventListener("pointerup", v), window.removeEventListener("pointercancel", S), jc.has(y) && jc.delete(y), Rb(w) && typeof m == "function" && m(w, { success: j });
    }, v = (w) => {
      b(w, y === window || y === document || s.useGlobalTarget || YS(y, w.target));
    }, S = (w) => {
      b(w, !1);
    };
    window.addEventListener("pointerup", v, o), window.addEventListener("pointercancel", S, o);
  };
  return i.forEach((p) => {
    (s.useGlobalTarget ? window : p).addEventListener("pointerdown", f, o), wc(p) && (p.addEventListener("focus", (m) => Dz(m, o)), !kz(p) && !p.hasAttribute("tabindex") && (p.tabIndex = 0));
  }), u;
}
const Oz = [...qS, nn, da], Lz = (t) => Oz.find(VS(t)), Mb = () => ({ min: 0, max: 0 }), KS = () => ({
  x: Mb(),
  y: Mb()
}), $z = /* @__PURE__ */ new WeakMap();
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
function XS(t) {
  return !!(Wc(t) || t.variants);
}
function Uz(t, a, s) {
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
const Oc = { current: null }, ym = { current: !1 }, Bz = typeof window < "u";
function QS() {
  if (ym.current = !0, !!Bz)
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
function ZS(t) {
  Lc = t;
}
function Iz() {
  return Lc;
}
class Vz {
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
  constructor({ parent: a, props: s, presenceContext: i, reducedMotionConfig: o, skipAnimations: u, blockInitialAnimation: f, visualState: p }, y = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = fm, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const w = Hn.now();
      this.renderScheduledAt < w && (this.renderScheduledAt = w, na.render(this.render, !1, !0));
    };
    const { latestValues: m, renderState: b } = p;
    this.latestValues = m, this.baseTarget = { ...m }, this.initialValues = s.initial ? { ...m } : {}, this.renderState = b, this.parent = a, this.props = s, this.presenceContext = i, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = u, this.options = y, this.blockInitialAnimation = !!f, this.isControllingVariants = Wc(s), this.isVariantNode = XS(s), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: v, ...S } = this.scrapeMotionValuesFromProps(s, {}, this);
    for (const w in S) {
      const j = S[w];
      m[w] !== void 0 && xn(j) && j.set(m[w]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const s in this.initialValues)
        this.values.get(s)?.jump(this.initialValues[s]), this.latestValues[s] = this.initialValues[s];
    this.current = a, $z.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((s, i) => this.bindToMotionValue(i, s)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (ym.current || QS(), this.shouldReduceMotion = Oc.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
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
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), s.accelerate && DS.has(a) && this.current instanceof HTMLElement) {
      const { factory: f, keyframes: p, times: y, ease: m, duration: b } = s.accelerate, v = new AS({
        element: this.current,
        name: a,
        keyframes: p,
        times: y,
        ease: m,
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : KS();
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
    this.prevMotionValues = Uz(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return i != null && (typeof i == "string" && (Z1(i) || J1(i)) ? i = parseFloat(i) : !Lz(i) && da.test(s) && (i = FS(a, s)), this.setBaseTarget(a, xn(i) ? i.get() : i)), xn(i) ? i.get() : i;
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
    return this.events[a] || (this.events[a] = new tS()), this.events[a].add(s);
  }
  notify(a, ...s) {
    this.events[a] && this.events[a].notify(...s);
  }
  scheduleRenderMicrotask() {
    Nz.render(this.render);
  }
}
class JS extends Vz {
  constructor() {
    super(...arguments), this.KeyframeResolver = jz;
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
function qz({ top: t, left: a, right: s, bottom: i }) {
  return {
    x: { min: a, max: s },
    y: { min: t, max: i }
  };
}
function Hz(t, a) {
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
function Fz(t, a) {
  return qz(Hz(t.getBoundingClientRect(), a));
}
const Pz = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Gz = ii.length;
function Yz(t, a, s) {
  let i = "", o = !0;
  for (let u = 0; u < Gz; u++) {
    const f = ii[u], p = t[f];
    if (p === void 0)
      continue;
    let y = !0;
    if (typeof p == "number")
      y = p === (f.startsWith("scale") ? 1 : 0);
    else {
      const m = parseFloat(p);
      y = f.startsWith("scale") ? m === 1 : m === 0;
    }
    if (!y || s) {
      const m = PS(p, pm[f]);
      if (!y) {
        o = !1;
        const b = Pz[f] || f;
        i += `${b}(${m}) `;
      }
      s && (a[f] = m);
    }
  }
  return i = i.trim(), s ? i = s(a, o ? "" : i) : o && (i = "none"), i;
}
function bm(t, a, s) {
  const { style: i, vars: o, transformOrigin: u } = t;
  let f = !1, p = !1;
  for (const y in a) {
    const m = a[y];
    if (li.has(y)) {
      f = !0;
      continue;
    } else if (mS(y)) {
      o[y] = m;
      continue;
    } else {
      const b = PS(m, pm[y]);
      y.startsWith("origin") ? (p = !0, u[y] = b) : i[y] = b;
    }
  }
  if (a.transform || (f || s ? i.transform = Yz(a, t.transform, s) : i.transform && (i.transform = "none")), p) {
    const { originX: y = "50%", originY: m = "50%", originZ: b = 0 } = u;
    i.transformOrigin = `${y} ${m} ${b}`;
  }
}
function WS(t, { style: a, vars: s }, i, o) {
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
}, Kz = {
  correct: (t, { treeScale: a, projectionDelta: s }) => {
    const i = t, o = da.parse(t);
    if (o.length > 5)
      return i;
    const u = da.createTransformer(t), f = typeof o[0] != "number" ? 1 : 0, p = s.x.scale * a.x, y = s.y.scale * a.y;
    o[0 + f] /= p, o[1 + f] /= y;
    const m = kl(p, y, 0.5);
    return typeof o[2 + f] == "number" && (o[2 + f] /= m), typeof o[3 + f] == "number" && (o[3 + f] /= m), u(o);
  }
}, Xz = {
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
  boxShadow: Kz
};
function ew(t, { layout: a, layoutId: s }) {
  return li.has(t) || t.startsWith("origin") || (a || s !== void 0) && (!!Xz[t] || t === "opacity");
}
function xm(t, a, s) {
  const i = t.style, o = a?.style, u = {};
  if (!i)
    return u;
  for (const f in i)
    (xn(i[f]) || o && xn(o[f]) || ew(f, t) || s?.getValue(f)?.liveStyle !== void 0) && (u[f] = i[f]);
  return u;
}
function Qz(t) {
  return window.getComputedStyle(t);
}
class Zz extends JS {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = WS;
  }
  readValueFromInstance(a, s) {
    if (li.has(s))
      return this.projection?.isProjecting ? ph(s) : SD(a, s);
    {
      const i = Qz(a), o = (mS(s) ? i.getPropertyValue(s) : i[s]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: s }) {
    return Fz(a, s);
  }
  build(a, s, i) {
    bm(a, s, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, s, i) {
    return xm(a, s, i);
  }
}
const Jz = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Wz = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function e4(t, a, s = 1, i = 0, o = !0) {
  t.pathLength = 1;
  const u = o ? Jz : Wz;
  t[u.offset] = `${-i}`, t[u.array] = `${a} ${s}`;
}
const t4 = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function tw(t, {
  attrX: a,
  attrY: s,
  attrScale: i,
  pathLength: o,
  pathSpacing: u = 1,
  pathOffset: f = 0,
  // This is object creation, which we try to avoid per-frame.
  ...p
}, y, m, b) {
  if (bm(t, p, m), y) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: v, style: S } = t;
  v.transform && (S.transform = v.transform, delete v.transform), (S.transform || v.transformOrigin) && (S.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), S.transform && (S.transformBox = b?.transformBox ?? "fill-box", delete v.transformBox);
  for (const w of t4)
    v[w] !== void 0 && (S[w] = v[w], delete v[w]);
  a !== void 0 && (v.x = a), s !== void 0 && (v.y = s), i !== void 0 && (v.scale = i), o !== void 0 && e4(v, o, u, f, !1);
}
const nw = /* @__PURE__ */ new Set([
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
]), aw = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function n4(t, a, s, i) {
  WS(t, a, void 0, i);
  for (const o in a.attrs)
    t.setAttribute(nw.has(o) ? o : mm(o), a.attrs[o]);
}
function rw(t, a, s) {
  const i = xm(t, a, s);
  for (const o in t)
    if (xn(t[o]) || xn(a[o])) {
      const u = ii.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      i[u] = t[o];
    }
  return i;
}
class a4 extends JS {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = KS;
  }
  getBaseTargetFromProps(a, s) {
    return a[s];
  }
  readValueFromInstance(a, s) {
    if (li.has(s)) {
      const i = HS(s);
      return i && i.default || 0;
    }
    return s = nw.has(s) ? s : mm(s), a.getAttribute(s);
  }
  scrapeMotionValuesFromProps(a, s, i) {
    return rw(a, s, i);
  }
  build(a, s, i) {
    tw(a, s, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(a, s, i, o) {
    n4(a, s, i, o);
  }
  mount(a) {
    this.isSVGTag = aw(a.tagName), super.mount(a);
  }
}
const r4 = vm.length;
function sw(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const s = t.parent ? sw(t.parent) || {} : {};
    return t.props.initial !== void 0 && (s.initial = t.props.initial), s;
  }
  const a = {};
  for (let s = 0; s < r4; s++) {
    const i = vm[s], o = t.props[i];
    (jl(o) || o === !1) && (a[i] = o);
  }
  return a;
}
function iw(t, a) {
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
const s4 = [...gm].reverse(), i4 = gm.length;
function l4(t) {
  return (a) => Promise.all(a.map(({ animation: s, options: i }) => fz(t, s, i)));
}
function o4(t) {
  let a = l4(t), s = Db(), i = !0, o = !1;
  const u = (m) => (b, v) => {
    const S = es(t, v, m === "exit" ? t.presenceContext?.custom : void 0);
    if (S) {
      const { transition: w, transitionEnd: j, ...C } = S;
      b = { ...b, ...C, ...j };
    }
    return b;
  };
  function f(m) {
    a = m(t);
  }
  function p(m) {
    const { props: b } = t, v = sw(t.parent) || {}, S = [], w = /* @__PURE__ */ new Set();
    let j = {}, C = 1 / 0;
    for (let T = 0; T < i4; T++) {
      const O = s4[T], R = s[O], N = b[O] !== void 0 ? b[O] : v[O], U = jl(N), Y = O === m ? R.isActive : null;
      Y === !1 && (C = T);
      let ae = N === v[O] && N !== b[O] && U;
      if (ae && (i || o) && t.manuallyAnimateOnMount && (ae = !1), R.protectedKeys = { ...j }, // If it isn't active and hasn't *just* been set as inactive
      !R.isActive && Y === null || // If we didn't and don't have any defined prop for this animation type
      !N && !R.prevProp || // Or if the prop doesn't define an animation
      Jc(N) || typeof N == "boolean")
        continue;
      if (O === "exit" && R.isActive && Y !== !0) {
        R.prevResolvedValues && (j = {
          ...j,
          ...R.prevResolvedValues
        });
        continue;
      }
      const M = c4(R.prevProp, N);
      let V = M || // If we're making this variant active, we want to always make it active
      O === m && R.isActive && !ae && U || // If we removed a higher-priority variant (i is in reverse order)
      T > C && U, D = !1;
      const H = Array.isArray(N) ? N : [N];
      let Q = H.reduce(u(O), {});
      Y === !1 && (Q = {});
      const { prevResolvedValues: J = {} } = R, P = {
        ...J,
        ...Q
      }, ie = ($) => {
        V = !0, w.has($) && (D = !0, w.delete($)), R.needsAnimating[$] = !0;
        const te = t.getValue($);
        te && (te.liveStyle = !1);
      };
      for (const $ in P) {
        const te = Q[$], fe = J[$];
        if (j.hasOwnProperty($))
          continue;
        let k = !1;
        Sh(te) && Sh(fe) ? k = !iw(te, fe) : k = te !== fe, k ? te != null ? ie($) : w.add($) : te !== void 0 && w.has($) ? ie($) : R.protectedKeys[$] = !0;
      }
      R.prevProp = N, R.prevResolvedValues = Q, R.isActive && (j = { ...j, ...Q }), (i || o) && t.blockInitialAnimation && (V = !1);
      const A = ae && M;
      V && (!A || D) && S.push(...H.map(($) => {
        const te = { type: O };
        if (typeof $ == "string" && (i || o) && !A && t.manuallyAnimateOnMount && t.parent) {
          const { parent: fe } = t, k = es(fe, $);
          if (fe.enteringChildren && k) {
            const { delayChildren: ee } = k.transition || {};
            te.delay = zS(fe.enteringChildren, t, ee);
          }
        }
        return {
          animation: $,
          options: te
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
  function y(m, b) {
    if (s[m].isActive === b)
      return Promise.resolve();
    t.variantChildren?.forEach((S) => S.animationState?.setActive(m, b)), s[m].isActive = b;
    const v = p(m);
    for (const S in s)
      s[S].protectedKeys = {};
    return v;
  }
  return {
    animateChanges: p,
    setActive: y,
    setAnimateFunction: f,
    getState: () => s,
    reset: () => {
      s = Db(), o = !0;
    }
  };
}
function c4(t, a) {
  return typeof a == "string" ? a !== t : Array.isArray(a) ? !iw(a, t) : !1;
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
function u4(t) {
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
function d4(...t) {
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
function f4(...t) {
  return g.useCallback(d4(...t), t);
}
class h4 extends g.Component {
  getSnapshotBeforeUpdate(a) {
    const s = this.props.childRef.current;
    if (wc(s) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const i = s.offsetParent, o = wc(i) && i.offsetWidth || 0, u = wc(i) && i.offsetHeight || 0, f = getComputedStyle(s), p = this.props.sizeRef.current;
      p.height = parseFloat(f.height), p.width = parseFloat(f.width), p.top = s.offsetTop, p.left = s.offsetLeft, p.right = o - p.width - p.left, p.bottom = u - p.height - p.top;
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
function m4({ children: t, isPresent: a, anchorX: s, anchorY: i, root: o, pop: u }) {
  const f = g.useId(), p = g.useRef(null), y = g.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: m } = g.useContext(Sm), b = t.props?.ref ?? t?.ref, v = f4(p, b);
  return g.useInsertionEffect(() => {
    const { width: S, height: w, top: j, left: C, right: _, bottom: T } = y.current;
    if (a || u === !1 || !p.current || !S || !w)
      return;
    const O = s === "left" ? `left: ${C}` : `right: ${_}`, R = i === "bottom" ? `bottom: ${T}` : `top: ${j}`;
    p.current.dataset.motionPopId = f;
    const N = document.createElement("style");
    m && (N.nonce = m);
    const U = o ?? document.head;
    return U.appendChild(N), N.sheet && N.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${S}px !important;
            height: ${w}px !important;
            ${O}px !important;
            ${R}px !important;
          }
        `), () => {
      p.current?.removeAttribute("data-motion-pop-id"), U.contains(N) && U.removeChild(N);
    };
  }, [a]), c.jsx(h4, { isPresent: a, childRef: p, sizeRef: y, pop: u, children: u === !1 ? t : g.cloneElement(t, { ref: v }) });
}
const p4 = ({ children: t, initial: a, isPresent: s, onExitComplete: i, custom: o, presenceAffectsLayout: u, mode: f, anchorX: p, anchorY: y, root: m }) => {
  const b = am(g4), v = g.useId();
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
  }, [s]), t = c.jsx(m4, { pop: f === "popLayout", isPresent: s, anchorX: p, anchorY: y, root: m, children: t }), c.jsx(Xc.Provider, { value: w, children: t });
};
function g4() {
  return /* @__PURE__ */ new Map();
}
function v4(t = !0) {
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
const lw = ({ children: t, custom: a, initial: s = !0, onExitComplete: i, presenceAffectsLayout: o = !0, mode: u = "sync", propagate: f = !1, anchorX: p = "left", anchorY: y = "top", root: m }) => {
  const [b, v] = v4(f), S = g.useMemo(() => Lb(t), [t]), w = f && !b ? [] : S.map(sc), j = g.useRef(!0), C = g.useRef(S), _ = am(() => /* @__PURE__ */ new Map()), T = g.useRef(/* @__PURE__ */ new Set()), [O, R] = g.useState(S), [N, U] = g.useState(S);
  Q1(() => {
    j.current = !1, C.current = S;
    for (let M = 0; M < N.length; M++) {
      const V = sc(N[M]);
      w.includes(V) ? (_.delete(V), T.current.delete(V)) : _.get(V) !== !0 && _.set(V, !1);
    }
  }, [N, w.length, w.join("-")]);
  const Y = [];
  if (S !== O) {
    let M = [...S];
    for (let V = 0; V < N.length; V++) {
      const D = N[V], H = sc(D);
      w.includes(H) || (M.splice(V, 0, D), Y.push(D));
    }
    return u === "wait" && Y.length && (M = Y), U(Lb(M)), R(S), null;
  }
  const { forceRender: ae } = g.useContext(X1);
  return c.jsx(c.Fragment, { children: N.map((M) => {
    const V = sc(M), D = f && !b ? !1 : S === N || w.includes(V), H = () => {
      if (T.current.has(V))
        return;
      if (_.has(V))
        T.current.add(V), _.set(V, !0);
      else
        return;
      let Q = !0;
      _.forEach((J) => {
        J || (Q = !1);
      }), Q && (ae?.(), U(C.current), f && v?.(), i && i());
    };
    return c.jsx(p4, { isPresent: D, initial: !j.current || s ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: u, root: m, onExitComplete: D ? void 0 : H, anchorX: p, anchorY: y, children: M }, V);
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
function y4() {
  if (Ub)
    return;
  const t = {};
  for (const a in $b)
    t[a] = {
      isEnabled: (s) => $b[a].some((i) => !!s[i])
    };
  ZS(t), Ub = !0;
}
function ow() {
  return y4(), Iz();
}
function Nh(t) {
  const a = ow();
  for (const s in t)
    a[s] = {
      ...a[s],
      ...t[s]
    };
  ZS(a);
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
const b4 = /* @__PURE__ */ new Set([
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
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || b4.has(t);
}
let cw = (t) => !$c(t);
function x4(t) {
  typeof t == "function" && (cw = (a) => a.startsWith("on") ? !$c(a) : t(a));
}
try {
  x4(require("@emotion/is-prop-valid").default);
} catch {
}
function S4(t, a, s) {
  const i = {};
  for (const o in t)
    o === "values" && typeof t.values == "object" || xn(t[o]) || (cw(o) || s === !0 && $c(o) || !a && !$c(o) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && o.startsWith("onDrag")) && (i[o] = t[o]);
  return i;
}
const eu = /* @__PURE__ */ g.createContext({});
function w4(t, a) {
  if (Wc(t)) {
    const { initial: s, animate: i } = t;
    return {
      initial: s === !1 || jl(s) ? s : void 0,
      animate: jl(i) ? i : void 0
    };
  }
  return t.inherit !== !1 ? a : {};
}
function j4(t) {
  const { initial: a, animate: s } = w4(t, g.useContext(eu));
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
function uw(t, a, s) {
  for (const i in a)
    !xn(a[i]) && !ew(i, s) && (t[i] = a[i]);
}
function E4({ transformTemplate: t }, a) {
  return g.useMemo(() => {
    const s = Em();
    return bm(s, a, t), Object.assign({}, s.vars, s.style);
  }, [a]);
}
function N4(t, a) {
  const s = t.style || {}, i = {};
  return uw(i, s, t), Object.assign(i, E4(t, a)), i;
}
function C4(t, a) {
  const s = {}, i = N4(t, a);
  return t.drag && t.dragListener !== !1 && (s.draggable = !1, i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none", i.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (s.tabIndex = 0), s.style = i, s;
}
const dw = () => ({
  ...Em(),
  attrs: {}
});
function T4(t, a, s, i) {
  const o = g.useMemo(() => {
    const u = dw();
    return tw(u, a, aw(i), t.transformTemplate, t.style), {
      ...u.attrs,
      style: { ...u.style }
    };
  }, [a]);
  if (t.style) {
    const u = {};
    uw(u, t.style, t), o.style = { ...u, ...o.style };
  }
  return o;
}
const R4 = [
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
      !!(R4.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function _4(t, a, s, { latestValues: i }, o, u = !1, f) {
  const y = (f ?? Nm(t) ? T4 : C4)(a, i, o, t), m = S4(a, typeof t == "string", u), b = t !== g.Fragment ? { ...m, ...y, ref: s } : {}, { children: v } = a, S = g.useMemo(() => xn(v) ? v.get() : v, [v]);
  return g.createElement(t, {
    ...b,
    children: S
  });
}
function M4({ scrapeMotionValuesFromProps: t, createRenderState: a }, s, i, o) {
  return {
    latestValues: A4(s, i, o, t),
    renderState: a()
  };
}
function A4(t, a, s, i) {
  const o = {}, u = i(t, {});
  for (const S in u)
    o[S] = u4(u[S]);
  let { initial: f, animate: p } = t;
  const y = Wc(t), m = XS(t);
  a && m && !y && t.inherit !== !1 && (f === void 0 && (f = a.initial), p === void 0 && (p = a.animate));
  let b = s ? s.initial === !1 : !1;
  b = b || f === !1;
  const v = b ? p : f;
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
const fw = (t) => (a, s) => {
  const i = g.useContext(eu), o = g.useContext(Xc), u = () => M4(t, a, i, o);
  return s ? u() : am(u);
}, k4 = /* @__PURE__ */ fw({
  scrapeMotionValuesFromProps: xm,
  createRenderState: Em
}), D4 = /* @__PURE__ */ fw({
  scrapeMotionValuesFromProps: rw,
  createRenderState: dw
}), z4 = Symbol.for("motionComponentSymbol");
function O4(t, a, s) {
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
        const p = f(u);
        typeof p == "function" && (o.current = p);
      } else o.current ? (o.current(), o.current = null) : f(u);
    else f && (f.current = u);
    a && (u ? a.mount(u) : a.unmount());
  }, [a]);
}
const L4 = g.createContext({});
function $4(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function U4(t, a, s, i, o, u) {
  const { visualElement: f } = g.useContext(eu), p = g.useContext(wm), y = g.useContext(Xc), m = g.useContext(Sm), b = m.reducedMotion, v = m.skipAnimations, S = g.useRef(null), w = g.useRef(!1);
  i = i || p.renderer, !S.current && i && (S.current = i(t, {
    visualState: a,
    parent: f,
    props: s,
    presenceContext: y,
    blockInitialAnimation: y ? y.initial === !1 : !1,
    reducedMotionConfig: b,
    skipAnimations: v,
    isSVG: u
  }), w.current && S.current && (S.current.manuallyAnimateOnMount = !0));
  const j = S.current, C = g.useContext(L4);
  j && !j.projection && o && (j.type === "html" || j.type === "svg") && B4(S.current, s, o, C);
  const _ = g.useRef(!1);
  g.useInsertionEffect(() => {
    j && _.current && j.update(s, y);
  });
  const T = s[BS], O = g.useRef(!!T && typeof window < "u" && !window.MotionHandoffIsComplete?.(T) && window.MotionHasOptimisedAnimation?.(T));
  return Q1(() => {
    w.current = !0, j && (_.current = !0, window.MotionIsMounted = !0, j.updateFeatures(), j.scheduleRenderMicrotask(), O.current && j.animationState && j.animationState.animateChanges());
  }), g.useEffect(() => {
    j && (!O.current && j.animationState && j.animationState.animateChanges(), O.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(T);
    }), O.current = !1), j.enteringChildren = void 0);
  }), j;
}
function B4(t, a, s, i) {
  const { layoutId: o, layout: u, drag: f, dragConstraints: p, layoutScroll: y, layoutRoot: m, layoutAnchor: b, layoutCrossfade: v } = a;
  t.projection = new s(t.latestValues, a["data-framer-portal-id"] ? void 0 : hw(t.parent)), t.projection.setOptions({
    layoutId: o,
    layout: u,
    alwaysMeasureLayout: !!f || p && $4(p),
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
    layoutRoot: m,
    layoutAnchor: b
  });
}
function hw(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : hw(t.parent);
}
function Ff(t, { forwardMotionProps: a = !1, type: s } = {}, i, o) {
  i && Nh(i);
  const u = s ? s === "svg" : Nm(t), f = u ? D4 : k4;
  function p(m, b) {
    let v;
    const S = {
      ...g.useContext(Sm),
      ...m,
      layoutId: I4(m)
    }, { isStatic: w } = S, j = j4(m), C = f(m, w);
    if (!w && typeof window < "u") {
      V4();
      const _ = q4(S);
      v = _.MeasureLayout, j.visualElement = U4(t, C, S, o, _.ProjectionNode, u);
    }
    return c.jsxs(eu.Provider, { value: j, children: [v && j.visualElement ? c.jsx(v, { visualElement: j.visualElement, ...S }) : null, _4(t, m, O4(C, j.visualElement, b), C, w, a, u)] });
  }
  p.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const y = g.forwardRef(p);
  return y[z4] = t, y;
}
function I4({ layoutId: t }) {
  const a = g.useContext(X1).id;
  return a && t !== void 0 ? a + "-" + t : t;
}
function V4(t, a) {
  g.useContext(wm).strict;
}
function q4(t) {
  const a = ow(), { drag: s, layout: i } = a;
  if (!s && !i)
    return {};
  const o = { ...s, ...i };
  return {
    MeasureLayout: s?.isEnabled(t) || i?.isEnabled(t) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function H4(t, a) {
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
const Cm = /* @__PURE__ */ H4(), F4 = (t, a) => a.isSVG ?? Nm(t) ? new a4(a) : new Zz(a, {
  allowProjection: t !== g.Fragment
});
class P4 extends oi {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = o4(a));
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
let G4 = 0;
class Y4 extends oi {
  constructor() {
    super(...arguments), this.id = G4++, this.isExitComplete = !1;
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
          const p = es(this.node, u, f);
          if (p) {
            const { transition: y, transitionEnd: m, ...b } = p;
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
const K4 = {
  animation: {
    Feature: P4
  },
  exit: {
    Feature: Y4
  }
};
function mw(t) {
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
  u && na.postRender(() => u(a, mw(a)));
}
class X4 extends oi {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = _z(a, (s, i) => (Ib(this.node, i, "Start"), (o) => Ib(this.node, o, "End"))));
  }
  unmount() {
  }
}
class Q4 extends oi {
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
  u && na.postRender(() => u(a, mw(a)));
}
class Z4 extends oi {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: s, propagate: i } = this.node.props;
    this.unmount = zz(a, (o, u) => (Vb(this.node, u, "Start"), (f, { success: p }) => Vb(this.node, f, p ? "End" : "Cancel")), {
      useGlobalTarget: s,
      stopPropagation: i?.tap === !1
    });
  }
  unmount() {
  }
}
const Ch = /* @__PURE__ */ new WeakMap(), Pf = /* @__PURE__ */ new WeakMap(), J4 = (t) => {
  const a = Ch.get(t.target);
  a && a(t);
}, W4 = (t) => {
  t.forEach(J4);
};
function eO({ root: t, ...a }) {
  const s = t || document;
  Pf.has(s) || Pf.set(s, {});
  const i = Pf.get(s), o = JSON.stringify(a);
  return i[o] || (i[o] = new IntersectionObserver(W4, { root: t, ...a })), i[o];
}
function tO(t, a, s) {
  const i = eO(a);
  return Ch.set(t, s), i.observe(t), () => {
    Ch.delete(t), i.unobserve(t);
  };
}
const nO = {
  some: 0,
  all: 1
};
class aO extends oi {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: s, margin: i, amount: o = "some", once: u } = a, f = {
      root: s ? s.current : void 0,
      rootMargin: i,
      threshold: typeof o == "number" ? o : nO[o]
    }, p = (y) => {
      const { isIntersecting: m } = y;
      if (this.isInView === m || (this.isInView = m, u && !m && this.hasEnteredView))
        return;
      m && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", m);
      const { onViewportEnter: b, onViewportLeave: v } = this.node.getProps(), S = m ? b : v;
      S && S(y);
    };
    this.stopObserver = tO(this.node.current, f, p);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: s } = this.node;
    ["amount", "margin", "root"].some(rO(a, s)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function rO({ viewport: t = {} }, { viewport: a = {} } = {}) {
  return (s) => t[s] !== a[s];
}
const sO = {
  inView: {
    Feature: aO
  },
  tap: {
    Feature: Z4
  },
  focus: {
    Feature: Q4
  },
  hover: {
    Feature: X4
  }
}, Tm = {
  renderer: F4,
  ...K4,
  ...sO
};
function iO() {
  !ym.current && QS();
  const [t] = g.useState(Oc.current);
  return t;
}
const Th = "emotion-tts:trigger-generate", Rh = "emotion-tts:run-state", _h = "emotion-tts:run-completed";
function lO() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Th));
}
function oO(t) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Rh, { detail: t }));
}
function cO(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(Th, t), () => window.removeEventListener(Th, t));
}
function pw(t) {
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
function uO(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(_h, t), () => window.removeEventListener(_h, t));
}
var dO = "wksjad0", fO = "wksjad1", hO = "wksjad2", mO = "wksjad3", pO = "wksjad4", gO = "wksjad5", Hb = "wksjad6", vO = "wksjad7", yO = "wksjad8", bO = "wksjad9", xO = "wksjada", SO = "wksjadb", wO = "wksjadc", jO = "wksjadd", EO = "wksjade", NO = "wksjadf", CO = "wksjadg", Gf = "wksjadh", TO = "wksjadi", RO = "wksjadj", _O = "wksjadk", MO = "wksjadl", AO = "wksjadm", kO = "wksjadn";
const Mh = 5, DO = 5e-3;
function tu(t, a = "") {
  return `${ha}/deployments/${t}/artifacts${a}`;
}
async function zO(t, a, s) {
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
async function OO(t, a) {
  const s = a.map((o) => encodeURIComponent(o)).join(","), i = await fetch(tu(t, `?utteranceIds=${s}`), {
    method: "DELETE",
    headers: { accept: "application/json" }
  });
  if (!i.ok) throw new Error(`clear failed: HTTP ${i.status}`);
}
function LO(t) {
  const [a, s] = g.useState([]), [i, o] = g.useState(!1), [u, f] = g.useState(null), [p, y] = g.useState(0), m = g.useRef(null), b = g.useRef(!1), v = g.useCallback(() => y((S) => S + 1), []);
  return g.useEffect(() => {
    m.current?.abort();
    const S = new AbortController();
    return m.current = S, o(!0), f(null), fetch(`${tu(t)}?limit=${Mh}`, {
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
  }, [t, p]), g.useEffect(() => pw((S) => {
    const w = b.current;
    b.current = S.busy, w && !S.busy && v();
  }), [v]), { rows: a, loading: i, error: u, refetch: v, tick: p };
}
function $O(t, a) {
  const [s, i] = g.useState(() => /* @__PURE__ */ new Map());
  return g.useEffect(() => {
    let o = !1;
    return Zs(t).then(({ voiceAssets: u }) => {
      if (o) return;
      const f = /* @__PURE__ */ new Map();
      for (const p of u)
        f.set(p.voiceAssetId, p.displayName);
      i(f);
    }).catch(() => {
    }), () => {
      o = !0;
    };
  }, [t, a]), s;
}
function UO({
  deploymentId: t,
  speedFactor: a
}) {
  const { rows: s, loading: i, error: o, refetch: u, tick: f } = LO(t), p = $O(t, f), [y, m] = g.useState(null), [b, v] = g.useState(null), [S, w] = g.useState(!1), j = iO(), C = g.useCallback(() => {
    m(null), v(null), u();
  }, [u]), _ = g.useCallback(
    async (R, N) => {
      v(null);
      try {
        await zO(t, R, N);
      } catch (U) {
        v(U instanceof Error ? U.message : "download failed");
      }
    },
    [t]
  ), T = s, O = g.useCallback(async () => {
    const R = T.map((N) => N.utteranceId);
    if (R.length !== 0 && window.confirm(`Remove the ${R.length} shown generation${R.length === 1 ? "" : "s"} from this list?`)) {
      w(!0), v(null), m(null);
      try {
        await OO(t, R), u();
      } catch (N) {
        v(N instanceof Error ? N.message : "clear failed");
      } finally {
        w(!1);
      }
    }
  }, [T, t, u]);
  return !i && !o && T.length === 0 ? null : /* @__PURE__ */ c.jsxs("section", { className: dO, "aria-labelledby": "recent-gen-eyebrow", children: [
    /* @__PURE__ */ c.jsxs("header", { className: fO, children: [
      /* @__PURE__ */ c.jsx("span", { className: hO, id: "recent-gen-eyebrow", children: "Recent generations" }),
      /* @__PURE__ */ c.jsxs("span", { className: mO, children: [
        /* @__PURE__ */ c.jsx("span", { className: pO, children: T.length }),
        /* @__PURE__ */ c.jsxs("span", { className: gO, children: [
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
    (o || b) && /* @__PURE__ */ c.jsx("div", { className: kO, role: "alert", children: o ?? b }),
    /* @__PURE__ */ c.jsx(jm, { features: Tm, strict: !0, children: /* @__PURE__ */ c.jsx("ul", { className: vO, children: /* @__PURE__ */ c.jsx(lw, { initial: !1, children: T.map((R) => {
      const N = y === R.utteranceId, U = tu(
        t,
        `/${R.utteranceId}/download`
      ), Y = R.voiceAssetId ? p.get(R.voiceAssetId) ?? null : null;
      return /* @__PURE__ */ c.jsxs(
        Cm.li,
        {
          className: yO,
          initial: j ? { opacity: 1 } : { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: j ? { opacity: 0 } : { opacity: 0, y: 6 },
          transition: {
            duration: j ? 0 : 0.18,
            ease: [0.2, 0, 0, 1]
          },
          "data-playing": N || void 0,
          children: [
            /* @__PURE__ */ c.jsxs("div", { className: bO, children: [
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: xO,
                  onClick: () => m(
                    (ae) => ae === R.utteranceId ? null : R.utteranceId
                  ),
                  "aria-label": "Preview",
                  "aria-pressed": N,
                  children: N ? "■" : "▶"
                }
              ),
              /* @__PURE__ */ c.jsxs("div", { className: SO, children: [
                /* @__PURE__ */ c.jsxs("div", { className: wO, children: [
                  /* @__PURE__ */ c.jsx("span", { className: jO, children: R.characterDisplay }),
                  /* @__PURE__ */ c.jsx("span", { className: EO, title: R.text, children: R.text })
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: NO, children: [
                  /* @__PURE__ */ c.jsx("span", { className: CO, children: IO(R.finishedAt) }),
                  Y && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    /* @__PURE__ */ c.jsx("span", { className: Gf, "aria-hidden": "true", children: "·" }),
                    /* @__PURE__ */ c.jsx("span", { className: TO, children: Y })
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: Gf, "aria-hidden": "true", children: "·" }),
                  /* @__PURE__ */ c.jsx("span", { className: RO, children: BO(R.durationMs) }),
                  a !== void 0 && Math.abs(a - 1) > DO && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    /* @__PURE__ */ c.jsx("span", { className: Gf, "aria-hidden": "true", children: "·" }),
                    /* @__PURE__ */ c.jsxs("span", { className: _O, children: [
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
                  className: MO,
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
                className: AO,
                src: U,
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
function BO(t) {
  if (t == null || t <= 0) return "—";
  const a = Math.round(t / 1e3), s = Math.floor(a / 60), i = a % 60;
  return s > 0 ? `${s}:${i.toString().padStart(2, "0")}` : `${i}s`;
}
function IO(t) {
  if (!t) return "—";
  const s = Math.floor(Date.now() / 1e3) - t;
  return s < 0 ? "just now" : s < 60 ? `${s}s ago` : s < 3600 ? `${Math.floor(s / 60)}m ago` : s < 86400 ? `${Math.floor(s / 3600)}h ago` : s < 604800 ? `${Math.floor(s / 86400)}d ago` : new Date(t * 1e3).toLocaleDateString(void 0, { month: "short", day: "numeric" });
}
const VO = 6e3;
function qO(t) {
  const a = /* @__PURE__ */ new Map();
  for (const s of t)
    a.set(s.jobId, { jobId: s.jobId, runId: null, label: s.label, status: "queued" });
  return a;
}
function HO(t, a, s) {
  const i = t.find((u) => u.runId === a);
  if (!i) return null;
  const o = s - 1;
  return o < 0 || o >= i.jobs.length ? null : i.jobs[o]?.jobId ?? null;
}
function FO(t, a, s) {
  if (s.type === "run_terminal") return t;
  const i = HO(a, s.runId, s.globalIndex);
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
function PO(t) {
  return t === "done" || t === "failed" || t === "cancelled";
}
function GO(t) {
  if (t.size === 0) return !1;
  for (const a of t.values())
    if (!PO(a.status)) return !1;
  return !0;
}
function YO(t) {
  let a = 0, s = 0;
  for (const i of t.values())
    i.status === "done" && typeof i.durationMs == "number" && (a += i.durationMs, s += 1);
  return s > 0 ? a / s : VO;
}
function Fb(t, a) {
  const s = YO(t), i = new Map(t);
  for (const o of a) {
    const u = o.jobs.map((p) => i.get(p.jobId)).filter((p) => p != null && p.status === "queued"), f = u.length;
    u.forEach((p, y) => {
      i.set(p.jobId, {
        ...p,
        queuePosition: y + 1,
        queueTotal: f,
        etaMs: Math.max(0, Math.round(y * s))
      });
    });
  }
  return i;
}
function KO(t) {
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
function XO(t) {
  const a = { queued: 0, generating: 0, done: 0, failed: 0, cancelled: 0 };
  for (const s of t.values())
    a[s.status] += 1;
  return a;
}
function QO(t) {
  return t === window ? window.scrollY || document.documentElement.scrollTop || 0 : t.scrollTop;
}
function gw() {
  const t = [window];
  if (typeof document > "u") return t;
  let a = document.querySelector("emotion-tts-app");
  for (; a; ) {
    const s = window.getComputedStyle(a);
    (/(auto|scroll|overlay)/.test(s.overflowY) || /(auto|scroll|overlay)/.test(s.overflow)) && t.push(a), a = a.parentElement;
  }
  return t;
}
function ZO() {
  if (typeof window > "u") return;
  const t = gw();
  for (const a of t)
    a === window ? window.scrollTo({ top: 0, behavior: "smooth" }) : a.scrollTo({ top: 0, behavior: "smooth" });
}
function vw(t) {
  const [a, s] = g.useState(!1);
  return g.useEffect(() => {
    if (typeof window > "u") return;
    const i = gw(), o = () => {
      const f = i.reduce((p, y) => {
        const m = QO(y);
        return m > p ? m : p;
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
const yw = 360;
var JO = "_1s59p180", WO = "_1s59p181", eL = "_1s59p182", tL = "_1s59p183", nL = "_1s59p184", aL = "_1s59p185", rL = "_1s59p186", sL = "_1s59p188", iL = "_1s59p189", Pb = "_1s59p18a", lL = "_1s59p18c", oL = "_1s59p18d", cL = "_1s59p18e", uL = "_1s59p18f", dL = "_1s59p18g", fL = "_1s59p18i", hL = "_1s59p18j", mL = "_1s59p18k", pL = "_1s59p18l", gL = "_1s59p18n", vL = "_1s59p18o", yL = "_1s59p18p", bL = "_1s59p18q", xL = "_1s59p18r", SL = "_1s59p18s", wL = "_1s59p18t", Gb = "_1s59p18u", jL = "_1s59p18v", EL = "_1s59p18x";
const NL = 4e3;
function CL(t) {
  const a = ni(), s = t.storyboardJobs, i = (s?.length ?? 0) > 0, [o, u] = g.useState("idle"), [f, p] = g.useState(null), [y, m] = g.useState(/* @__PURE__ */ new Map()), [b, v] = g.useState(/* @__PURE__ */ new Map()), [S, w] = g.useState([]), [j, C] = g.useState(null), [_, T] = g.useState(null), [O, R] = g.useState(null), N = g.useRef(null), U = g.useRef([]), Y = g.useRef([]), ae = g.useRef(!1);
  g.useEffect(() => {
    Y.current = S;
  }, [S]);
  const M = g.useCallback(() => {
    N.current?.(), N.current = null;
    for (const Ce of U.current) Ce();
    U.current = [];
  }, []);
  g.useEffect(() => () => {
    M();
  }, [M]), g.useEffect(() => {
    let Ce = !1;
    const He = async () => {
      try {
        const xt = await yl();
        Ce || R(xt);
      } catch {
      }
    };
    He();
    const at = window.setInterval(He, NL);
    return () => {
      Ce = !0, window.clearInterval(at);
    };
  }, []), g.useEffect(() => {
    oO({ busy: o === "starting" || o === "running" });
  }, [o]), g.useEffect(() => {
    t.onJobProgressChange && t.onJobProgressChange(KO(b));
  }, [b, t.onJobProgressChange]);
  const V = g.useCallback(
    (Ce) => {
      const He = Ce.status;
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
    const Ce = s ?? [];
    u("starting"), C(null), m(/* @__PURE__ */ new Map()), T(null), p(null), ae.current = !1, M();
    const He = Math.max(1, O?.workersActive ?? 1), at = MT([...Ce], He), xt = at.map((ot) => ({
      ...t.createPayload,
      prebuiltSegments: ot.map((Ye) => Ye.segment)
    }));
    try {
      const Ye = (await _T(t.deploymentId, xt)).map((je, ke) => ({
        runId: je.runId,
        jobs: at[ke] ?? []
      }));
      Y.current = Ye, w(Ye), v(Fb(qO(Ce), Ye)), u("running");
      const pt = Ye.map(
        (je) => Sf(
          t.deploymentId,
          je.runId,
          (ke) => {
            v((Pe) => {
              const Xe = FO(Pe, Y.current, ke), St = Fb(Xe, Y.current);
              return GO(St) && !ae.current && (ae.current = !0, M(), u("terminal"), qb()), St;
            });
          },
          () => u("error")
        )
      );
      U.current = pt;
    } catch (ot) {
      u("error"), C(ic(ot));
    }
  }, [
    s,
    O?.workersActive,
    t.deploymentId,
    t.createPayload,
    M
  ]), H = g.useCallback(async () => {
    u("starting"), C(null), m(/* @__PURE__ */ new Map()), T(null);
    try {
      const Ce = await T1(t.deploymentId, t.createPayload);
      p(Ce.runId), u("running"), M(), N.current = Sf(
        t.deploymentId,
        Ce.runId,
        (He) => Kb(
          He,
          m,
          u,
          (at) => {
            T(at), V(at);
          },
          t.deploymentId,
          Ce.runId
        ),
        () => u("error")
      );
    } catch (Ce) {
      u("error"), C(ic(Ce));
    }
  }, [t.deploymentId, t.createPayload, V, M]), Q = g.useCallback(async () => {
    i ? await D() : await H();
  }, [i, D, H]);
  g.useEffect(() => cO(() => {
    (o === "idle" || o === "terminal" || o === "error") && Q();
  }), [o, Q]);
  const J = g.useCallback(async () => {
    if (i) {
      const Ce = Y.current.map((He) => He.runId);
      await Promise.all(
        Ce.map(
          (He) => Jy(t.deploymentId, He).catch(() => {
          })
        )
      ), ae.current = !0, M(), v((He) => {
        const at = new Map(He);
        for (const [xt, ot] of He)
          (ot.status === "queued" || ot.status === "generating") && at.set(xt, {
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
      } catch (Ce) {
        C(ic(Ce));
      }
  }, [i, t.deploymentId, f, M]), P = Array.from(y.values()).sort((Ce, He) => Ce.globalIndex - He.globalIndex), ie = g.useMemo(
    () => (s ?? []).map((Ce) => b.get(Ce.jobId)).filter((Ce) => Ce != null),
    [s, b]
  ), A = g.useMemo(() => XO(b), [b]), q = o === "starting" || o === "running", $ = _?.status === "partial", te = i ? A.generating : P.filter((Ce) => Ce.status === "running").length, fe = i ? A.done : P.filter((Ce) => Ce.status === "completed").length, k = i ? o === "starting" || o === "running" || ie.length > 0 : o === "starting" || o === "running" || P.length > 0, ee = P.filter((Ce) => Ce.status === "failed"), re = g.useMemo(() => {
    if (o !== "terminal") return null;
    const Ce = i ? ie.filter((Ye) => Ye.status === "failed").map((Ye) => Ye.failureCategory ?? "unknown") : ee.map((Ye) => Ye.failureCategory ?? "unknown");
    if (Ce.length === 0) return null;
    const He = /* @__PURE__ */ new Map();
    for (const Ye of Ce) He.set(Ye, (He.get(Ye) ?? 0) + 1);
    let at = "unknown", xt = 0;
    for (const [Ye, pt] of He)
      pt > xt && (at = Ye, xt = pt);
    const ot = i ? ie.length : P.length;
    return { category: at, count: xt, total: ot };
  }, [o, i, ie, ee, P]), G = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, B = "Check the run detail page for the per-segment error log.", W = j?.toLowerCase().includes("unmapped") ?? !1, ce = t.diagnostics ?? [], ye = O?.badge ?? "not_installed", Ae = ye === "ready" || ye === "running", lt = s?.length ?? 0, Ne = Ae ? t.canGenerate ? null : "Nothing to generate yet" : "Start runtime to generate", We = o === "starting" ? "Starting…" : o === "running" ? i ? `Generating ${lt} segment${lt === 1 ? "" : "s"}…` : "Generating…" : Ne ?? "Generate", Be = !t.canGenerate || q || !Ae, Fe = o === "starting" || o === "running", rn = Fe ? "running" : Be ? "blocked" : "idle", Mt = !vw(yw) || Fe;
  return /* @__PURE__ */ c.jsxs("div", { className: JO, children: [
    /* @__PURE__ */ c.jsxs("div", { className: WO, children: [
      /* @__PURE__ */ c.jsxs("div", { className: tL, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsxs("span", { className: nL, children: [
          /* @__PURE__ */ c.jsx("span", { className: eL, "aria-hidden": "true", children: "01" }),
          "Pre-flight",
          k && /* @__PURE__ */ c.jsxs("span", { className: dL, children: [
            /* @__PURE__ */ c.jsx("span", { className: fL, "aria-hidden": "true" }),
            te > 0 ? `${te} generating` : `${fe} done`
          ] })
        ] }),
        ce.length > 0 ? /* @__PURE__ */ c.jsx("ul", { className: aL, "aria-label": "Pre-flight checks", children: ce.map((Ce) => /* @__PURE__ */ c.jsxs("li", { className: rL, children: [
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: sL,
              "data-status": Ce.status,
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ c.jsx("span", { className: iL, children: Ce.label }),
          Ce.detail && /* @__PURE__ */ c.jsx("span", { className: Pb, children: Ce.detail })
        ] }, Ce.label)) }) : /* @__PURE__ */ c.jsx("span", { className: Pb, children: "Ready when you are." })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: lL, "data-state": rn, children: [
        Mt ? /* @__PURE__ */ c.jsxs(
          Ze,
          {
            variant: "primary",
            size: "sm",
            onClick: Q,
            disabled: Be,
            loading: Fe,
            title: Ne ?? void 0,
            children: [
              !Fe && /* @__PURE__ */ c.jsx("span", { className: oL, "aria-hidden": "true", children: "▶" }),
              We
            ]
          }
        ) : /* @__PURE__ */ c.jsxs("span", { className: cL, "aria-hidden": "true", children: [
          "Generate available in toolbar",
          /* @__PURE__ */ c.jsx("span", { className: uL, children: "↑" })
        ] }),
        q && /* @__PURE__ */ c.jsx(
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
    re && /* @__PURE__ */ c.jsxs(kn, { severity: "error", style: { flexDirection: "column", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ c.jsxs("strong", { children: [
        "Run failed — ",
        re.count,
        " of ",
        re.total,
        " segments failed with ",
        /* @__PURE__ */ c.jsx("code", { children: re.category })
      ] }),
      /* @__PURE__ */ c.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: G[re.category] ?? B })
    ] }),
    _?.exportArtifactRef && // audit-allow: download anchor — Button primitive lacks <a> polymorphic
    /* @__PURE__ */ c.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${_.exportArtifactRef}/download`,
        download: !0,
        className: `${A1.secondary} ${k1.md}`,
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
              const Ce = await R1(t.deploymentId, _.runId);
              p(Ce.runId), m(/* @__PURE__ */ new Map()), T(null), u("running"), M(), N.current = Sf(
                t.deploymentId,
                Ce.runId,
                (He) => Kb(He, m, u, T, t.deploymentId, Ce.runId),
                () => u("error")
              );
            } catch (Ce) {
              C(ic(Ce)), u("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    i && ie.length > 0 && /* @__PURE__ */ c.jsx(ML, { items: ie, counts: A }),
    !i && P.length > 0 && /* @__PURE__ */ c.jsxs("table", { className: v_, children: [
      /* @__PURE__ */ c.jsx("thead", { children: /* @__PURE__ */ c.jsxs("tr", { children: [
        /* @__PURE__ */ c.jsx("th", { className: pr, children: "#" }),
        /* @__PURE__ */ c.jsx("th", { className: pr, children: "Status" }),
        /* @__PURE__ */ c.jsx("th", { className: pr, children: "Duration" }),
        /* @__PURE__ */ c.jsx("th", { className: pr, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ c.jsx("tbody", { children: P.map((Ce) => /* @__PURE__ */ c.jsxs("tr", { className: y_, children: [
        /* @__PURE__ */ c.jsx("td", { className: pr, children: Ce.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ c.jsx("td", { className: pr, children: /* @__PURE__ */ c.jsx(Er, { tone: AL(Ce.status), children: Ce.status }) }),
        /* @__PURE__ */ c.jsx("td", { className: pr, children: Ce.durationMs ? `${Ce.durationMs} ms` : "—" }),
        /* @__PURE__ */ c.jsx("td", { className: pr, children: Ce.failureCategory ?? "" })
      ] }, Ce.globalIndex)) })
    ] })
  ] });
}
function TL(t) {
  return `~${Math.max(1, Math.round(t / 1e3))}s`;
}
function RL(t) {
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
function _L(t) {
  if (t.generating > 0) return `${t.generating} generating`;
  const a = [`${t.done} done`];
  return t.failed > 0 && a.push(`${t.failed} failed`), t.cancelled > 0 && a.push(`${t.cancelled} cancelled`), a.join(" · ");
}
function ML({ items: t, counts: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: hL, role: "list", "aria-label": "Per-segment generation progress", children: [
    /* @__PURE__ */ c.jsxs("div", { className: mL, children: [
      /* @__PURE__ */ c.jsx("span", { className: pL, children: "Segments" }),
      /* @__PURE__ */ c.jsxs("span", { className: gL, "data-tone": a.generating > 0 ? "live" : "idle", children: [
        /* @__PURE__ */ c.jsx("span", { className: vL, "aria-hidden": "true" }),
        _L(a)
      ] })
    ] }),
    t.map((s) => /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: yL,
        role: "listitem",
        "data-status": s.status,
        "aria-label": `${s.label} — ${Yb(s.status)}`,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: bL, children: s.label }),
          /* @__PURE__ */ c.jsx("span", { className: xL, children: /* @__PURE__ */ c.jsx(Er, { tone: RL(s.status), pulse: s.status === "generating", children: Yb(s.status) }) }),
          /* @__PURE__ */ c.jsxs("span", { className: SL, children: [
            s.status === "generating" && /* @__PURE__ */ c.jsx("span", { className: EL, "aria-hidden": "true" }),
            s.status === "done" && typeof s.durationMs == "number" ? /* @__PURE__ */ c.jsxs("span", { className: wL, children: [
              (s.durationMs / 1e3).toFixed(1),
              "s"
            ] }) : s.status === "queued" && typeof s.etaMs == "number" ? /* @__PURE__ */ c.jsxs("span", { className: Gb, children: [
              s.queuePosition && s.queueTotal ? `#${s.queuePosition} · ` : "",
              TL(s.etaMs)
            ] }) : s.status === "generating" ? /* @__PURE__ */ c.jsx("span", { className: Gb, children: "working…" }) : null
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: jL, children: s.status === "failed" ? s.failureCategory ?? "error" : "" })
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
        const p = new Map(f);
        return p.set(t.globalIndex, { globalIndex: t.globalIndex, status: "running" }), p;
      });
      return;
    case "segment_completed":
      a((f) => {
        const p = new Map(f);
        return p.set(t.globalIndex, {
          globalIndex: t.globalIndex,
          status: "completed",
          durationMs: t.durationMs
        }), p;
      });
      return;
    case "segment_failed":
      a((f) => {
        const p = new Map(f);
        return p.set(t.globalIndex, {
          globalIndex: t.globalIndex,
          status: "failed",
          failureCategory: t.failureCategory
        }), p;
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
function AL(t) {
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
function kL(t) {
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
const DL = {
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
function zL(t) {
  return t === 0 ? "Lead" : t === 1 ? "Support" : "Voice";
}
function OL(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function LL(t) {
  const a = t.filter((s) => s.isActive && (s.kind === "speaker" || s.kind === "mixed"));
  return a.length === 0 ? [] : a.map((s, i) => {
    const o = Xb[i % Xb.length], u = Qb[i % Qb.length];
    return {
      id: s.voiceAssetId,
      name: s.displayName || `Voice ${i + 1}`,
      role: zL(i),
      icon: u,
      color: o.color,
      rgb: o.rgb,
      onColor: o.onColor,
      initial: OL(s.displayName || "V"),
      lib: s.displayName || s.voiceAssetId
    };
  });
}
function bw(t) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
function $L(t) {
  const a = /* @__PURE__ */ new Set(), s = [];
  for (const i of t) {
    const o = bw(i.presetName);
    a.has(o) || (a.add(o), s.push({ id: o, label: i.presetName }));
  }
  return s;
}
function UL(t, a) {
  const s = t.find((o) => bw(o.presetName) === a);
  if (!s) return null;
  const i = s.vector;
  return Array.isArray(i) && i.length === 8 ? i : null;
}
function BL(t) {
  const a = t.split(/\n\s*\n/), s = [];
  let i = 0;
  for (const o of a) {
    if (!o.trim()) continue;
    const u = o.match(/\S+\s*/g) ?? [o];
    let f = !1;
    const p = u.map((y, m) => {
      const b = f || /[“”"]/.test(y) ? "dialogue" : "narration";
      for (const v of y)
        v === "“" ? f = !0 : v === "”" ? f = !1 : v === '"' && (f = !f);
      return { id: `p${i}s${m}`, text: y, kind: b };
    });
    s.push({ id: `p${i}`, segs: p }), i += 1;
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
function IL(t, a, s) {
  const i = [];
  let o = 0;
  for (const u of t)
    for (const f of u.segs)
      o >= a && o <= s && i.push(f.id), o += 1;
  return i;
}
function VL(t, a) {
  for (const s of t) for (const i of s.segs) if (i.id === a) return i.text;
  return "";
}
function sl(t, a) {
  return [...a].sort((s, i) => kh(t, s) - kh(t, i)).map((s) => VL(t, s)).join("").trim();
}
function Zb(t, a) {
  return Math.min(...a.segIds.map((s) => kh(t, s)));
}
function xw(t, a) {
  return t.find((s) => s.segIds.includes(a));
}
function Jb(t, a) {
  return a.every((s) => !xw(t, s));
}
function Sw(t, a) {
  return [...a].sort((s, i) => Zb(t, s) - Zb(t, i));
}
function qL(t, a) {
  const s = {};
  return Sw(t, a).forEach((i, o) => {
    s[i.id] = `SEG-${String(o + 1).padStart(3, "0")}`;
  }), s;
}
function HL(t) {
  return Ah(t).reduce(
    (a, s) => a + s.text.trim().split(/\s+/).filter(Boolean).length,
    0
  );
}
function FL(t) {
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
function PL(t, a) {
  return t.find((s) => s.id === a)?.label ?? a;
}
var GL = "_171z55w1", YL = "_171z55w2", KL = "_171z55w3", Wb = "_171z55w4", XL = "_171z55w5", QL = "_171z55w6", ZL = "_171z55w7", JL = "_171z55w8", WL = "_171z55w9", e6 = "_171z55wa", t6 = "_171z55wb", n6 = "_171z55wc", a6 = "_171z55wd", r6 = "_171z55we", s6 = "_171z55wh", i6 = "_171z55wi", ex = "_171z55wj", tx = "_171z55wk _171z55wj", l6 = "_171z55wl", o6 = "_171z55wm", c6 = "_171z55wn", u6 = "_171z55wo", nx = "_171z55wp", ax = "_171z55wq", d6 = "_171z55wr", f6 = "_171z55ws", h6 = "_171z55wt", m6 = "_171z55wu", p6 = "_171z55wv", g6 = "_171z55ww", v6 = "_171z55wx", y6 = "_171z55wy", b6 = "_171z55wz", x6 = "_171z55w10", S6 = "_171z55w11", w6 = "_171z55w12", j6 = "_171z55w13", E6 = "_171z55w14", rx = "_171z55w15", N6 = "_171z55w16", C6 = "_171z55w17", T6 = "_171z55w18", R6 = "_171z55w19", _6 = "_171z55w1a", M6 = "_171z55w1b", A6 = "_171z55w1c", k6 = "_171z55w1d", D6 = "_171z55w1e", z6 = "_171z55w1f", O6 = "_171z55w1g", L6 = "_171z55w1h", $6 = "_171z55w1i", U6 = "_171z55w1j", B6 = "_171z55w1k", I6 = "_171z55w1l";
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
  jobProgress: p,
  deploymentId: y
}) {
  const m = g.useMemo(() => LL(t), [t]), b = g.useMemo(() => $L(a), [a]), v = s, S = g.useMemo(() => BL(v), [v]), w = m[0]?.id ?? "", j = b[0]?.id ?? "", [C, _] = g.useState("voice"), [T, O] = g.useState(""), R = g.useMemo(
    () => X6(o, m),
    [o, m]
  ), [N, U] = g.useState([]), [Y, ae] = g.useState([]), [M, V] = g.useState(null), [D, H] = g.useState(null), [Q, J] = g.useState(w), [P, ie] = g.useState(j), [A, q] = g.useState(null), [$, te] = g.useState(null), [fe, k] = g.useState(null), [ee, re] = g.useState(null), [G, B] = g.useState(!1), W = g.useRef(null), ce = g.useRef(null), ye = g.useRef(/* @__PURE__ */ new Map()), Ae = g.useRef(null), lt = g.useRef(1e3), Ne = g.useCallback(() => (lt.current += 1, `job-${lt.current}`), []), We = g.useMemo(() => {
    const K = /* @__PURE__ */ new Map();
    return Ah(S).forEach((ue, Re) => K.set(ue.id, Re)), K;
  }, [S]), Be = g.useCallback((K) => We.get(K) ?? Number.MAX_SAFE_INTEGER, [We]);
  g.useEffect(() => {
    const K = new Set(Ah(S).map((ue) => ue.id));
    U((ue) => {
      const Re = ue.filter((_e) => _e.segIds.every((Ke) => K.has(Ke)));
      return Re.length === ue.length ? ue : Re;
    });
  }, [S]), g.useEffect(() => uO(() => U([])), []), g.useEffect(() => {
    if (m.length !== 0 && (J((K) => m.some((ue) => ue.id === K) ? K : m[0].id), m.length === 1)) {
      const K = m[0].id;
      U((ue) => {
        let Re = !1;
        const _e = ue.map((Ke) => m.some((Dt) => Dt.id === Ke.voiceId) ? Ke : (Re = !0, { ...Ke, voiceId: K }));
        return Re ? _e : ue;
      });
    }
  }, [m]);
  const Fe = g.useMemo(() => new Set(m.map((K) => K.id)), [m]), rn = g.useCallback(
    (K) => !Fe.has(K.voiceId),
    [Fe]
  ), qt = g.useCallback((K) => {
    const ue = W.current;
    if (!ue || !K) return { top: 60, left: 0 };
    const Re = K.getBoundingClientRect(), _e = ue.getBoundingClientRect();
    let Ke = Re.left - _e.left + ue.scrollLeft;
    const Dt = Re.bottom - _e.top + ue.scrollTop + 10, gt = Math.max(0, ue.clientWidth - 318);
    return Ke = Math.max(0, Math.min(Ke, gt)), { top: Dt, left: Ke };
  }, []), Mt = g.useCallback(() => {
    ae([]), V(null), H(null), q(null);
  }, []), Ce = g.useCallback(
    (K, ue) => {
      const Re = [...K.segIds].sort((Ke, Dt) => Be(Ke) - Be(Dt))[0];
      if (!Re) return;
      const _e = ue ?? ye.current.get(Re) ?? null;
      H(K.id), ae([...K.segIds]), V(Re), J(K.voiceId), ie(K.emotion), q(qt(_e)), k(K.id);
    },
    [Be, qt]
  ), He = g.useCallback(
    (K, ue, Re) => {
      const _e = xw(N, K);
      if (_e) {
        Ce(_e, ue);
        return;
      }
      const Ke = qt(ue);
      if (Re && M != null && D == null) {
        const Dt = Be(M), gt = Be(K), z = IL(S, Math.min(Dt, gt), Math.max(Dt, gt));
        if (Jb(N, z)) {
          ae(z), H(null), q(Ke);
          return;
        }
      }
      ae([K]), V(K), H(null), q(Ke);
    },
    [N, S, M, D, qt, Ce, Be]
  ), at = g.useCallback(() => {
    if (D) {
      U(
        (Re) => Re.map(
          (_e) => _e.id === D ? { ..._e, voiceId: Q, emotion: P, status: "queued" } : _e
        )
      ), k(D), ae([]), V(null), H(null), q(null);
      return;
    }
    if (Y.length === 0 || sl(S, Y).trim() === "" || !Jb(N, Y)) return;
    const K = Ne(), ue = { id: K, segIds: [...Y], voiceId: Q, emotion: P, status: "queued" };
    U((Re) => [...Re, ue]), k(K), ae([]), V(null), q(null);
  }, [D, Y, N, S, Q, P, Ne]), xt = g.useCallback((K) => {
    U((ue) => ue.filter((Re) => Re.id !== K)), k((ue) => ue === K ? null : ue), re((ue) => ue === K ? null : ue), ae([]), V(null), H(null), q(null);
  }, []), ot = g.useCallback((K) => {
    re((ue) => ue === K ? null : K);
  }, []), Ye = g.useCallback((K) => {
    ce.current?.scrollBy({ left: K * 280, behavior: "smooth" });
  }, []), pt = g.useCallback(
    (K) => {
      if (b.length === 0) return;
      const ue = b.findIndex((_e) => _e.id === P), Re = b[(ue + K + b.length) % b.length];
      ie(Re.id), Ae.current?.querySelector(`[data-emotion="${Re.id}"]`)?.focus();
    },
    [b, P]
  ), je = A ? D ?? Y[0] ?? "new" : null;
  g.useEffect(() => {
    if (je == null) return;
    const K = requestAnimationFrame(() => {
      Ae.current?.querySelector(`[data-voice="${Q}"]`)?.focus();
    });
    return () => cancelAnimationFrame(K);
  }, [je]);
  const ke = g.useCallback(
    (K) => {
      K.key === "Escape" && (K.preventDefault(), Mt());
    },
    [Mt]
  ), Pe = g.useMemo(() => {
    const K = /* @__PURE__ */ new Map();
    for (const ue of N) for (const Re of ue.segIds) K.set(Re, ue);
    return K;
  }, [N]), Xe = g.useMemo(() => Sw(S, N), [S, N]), St = g.useMemo(() => qL(S, N), [S, N]), Ct = g.useMemo(
    () => Xe.filter((K) => m.some((ue) => ue.id === K.voiceId)).filter((K) => sl(S, K.segIds).trim() !== "").map((K) => {
      const ue = UL(a, K.emotion);
      return {
        jobId: K.id,
        label: St[K.id] ?? K.id,
        segment: {
          text: sl(S, K.segIds),
          voice_asset_id: K.voiceId,
          speaker_label: (lc(m, K.voiceId) ?? fl).name,
          emotion: ue ? { mode: "emotion_vector", vector: ue } : null
        }
      };
    }),
    [Xe, S, m, a, St]
  ), zn = g.useMemo(
    () => Ct.map((K) => K.segment),
    [Ct]
  ), Sn = g.useRef(null);
  g.useEffect(() => {
    const K = JSON.stringify(zn);
    K !== Sn.current && (Sn.current = K, u?.(zn));
  }, [zn, u]);
  const pn = g.useRef(null);
  g.useEffect(() => {
    const K = JSON.stringify(Ct);
    K !== pn.current && (pn.current = K, f?.(Ct));
  }, [Ct, f]);
  const Pt = g.useMemo(() => {
    const K = /* @__PURE__ */ new Map();
    for (const ue of N) {
      const Re = [...ue.segIds].sort((_e, Ke) => Be(_e) - Be(Ke))[0];
      Re && K.set(ue.id, Re);
    }
    return K;
  }, [N, Be]), kt = g.useMemo(() => {
    const K = /* @__PURE__ */ new Set();
    for (const ue of N) for (const Re of ue.segIds) K.add(Re);
    return K.size;
  }, [N]), Bt = g.useMemo(() => HL(S), [S]), sa = FL(N), wn = lc(m, Q) ?? fl, [cn, En] = g.useState(null), It = T.trim().toLowerCase(), he = g.useMemo(
    () => m.filter(
      (K) => !It || K.name.toLowerCase().includes(It) || K.role.toLowerCase().includes(It)
    ),
    [m, It]
  ), Te = g.useMemo(
    () => R.filter(
      (K) => !It || K.name.toLowerCase().includes(It) || (K.voice?.name.toLowerCase().includes(It) ?? !1)
    ),
    [R, It]
  ), ge = C === "character" ? `${Te.length} character${Te.length === 1 ? "" : "s"}` : `${he.length} voice${he.length === 1 ? "" : "s"}`, xe = (K) => K.stopPropagation();
  return /* @__PURE__ */ c.jsxs("div", { className: KL, children: [
    /* @__PURE__ */ c.jsxs("div", { style: F6, children: [
      /* @__PURE__ */ c.jsxs("span", { className: XL, children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("strong", { children: kt }),
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
          "aria-pressed": G,
          onClick: () => B((K) => !K),
          children: [
            /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: G ? "check" : "edit" }),
            G ? "Done" : "Edit text"
          ]
        }
      )
    ] }),
    G ? /* @__PURE__ */ c.jsx(
      "textarea",
      {
        value: s,
        onChange: (K) => i(K.target.value),
        placeholder: "Paste or write your script, then switch back to cast each phrase.",
        "aria-label": "Storyboard script text",
        style: G6
      }
    ) : /* @__PURE__ */ c.jsxs(
      "div",
      {
        ref: W,
        className: QL,
        role: "group",
        "aria-label": "Story script — select a phrase to cast a voice",
        onMouseDown: (K) => {
          K.shiftKey && K.preventDefault();
        },
        onClick: () => {
          A && Mt();
        },
        children: [
          S.map((K) => /* @__PURE__ */ c.jsx("p", { className: JL, children: K.segs.map((ue, Re) => {
            const _e = Pe.get(ue.id), Ke = Y.includes(ue.id), Dt = !!_e && ($ === _e.id || fe === _e.id), gt = !!_e && Pt.get(_e.id) === ue.id, z = _e ? lc(m, _e.voiceId) : null, F = Yf(ue.id, Pe, Y), Z = Yf(K.segs[Re - 1]?.id, Pe, Y), ve = Yf(K.segs[Re + 1]?.id, Pe, Y), be = F != null && Z !== F, De = F != null && ve !== F;
            return /* @__PURE__ */ c.jsxs("span", { children: [
              gt && z && /* @__PURE__ */ c.jsx("span", { className: e6, style: K6(z), "aria-hidden": "true", children: z.initial }),
              /* @__PURE__ */ c.jsx(
                "span",
                {
                  ref: (Se) => {
                    Se && ye.current.set(ue.id, Se);
                  },
                  role: "button",
                  tabIndex: 0,
                  "aria-pressed": Ke || !!_e,
                  "aria-label": _e ? `${z?.name ?? "voice"} · ${ue.text.trim()}` : ue.text.trim(),
                  className: WL,
                  style: Y6(Ke, z, Dt, ue.kind, be, De),
                  onClick: (Se) => {
                    Se.stopPropagation(), He(ue.id, Se.currentTarget, Se.shiftKey);
                  },
                  onKeyDown: (Se) => {
                    (Se.key === "Enter" || Se.key === " ") && (Se.preventDefault(), He(ue.id, Se.currentTarget, Se.shiftKey));
                  },
                  onMouseEnter: _e ? () => te(_e.id) : void 0,
                  onMouseLeave: _e ? () => te(null) : void 0,
                  children: ue.text
                }
              )
            ] }, ue.id);
          }) }, K.id)),
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
                      onClick: Mt,
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
                        className: C === "voice" ? tx : ex,
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
                        className: C === "character" ? tx : ex,
                        onClick: () => {
                          _("character"), O("");
                        },
                        children: "Characters"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: l6, children: ge })
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: o6, children: [
                  /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: Q6, children: "search" }),
                  /* @__PURE__ */ c.jsx(
                    "input",
                    {
                      className: c6,
                      value: T,
                      onChange: (K) => O(K.target.value),
                      placeholder: C === "character" ? "Search characters…" : "Search voices…",
                      "aria-label": C === "character" ? "Search characters" : "Search voices"
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: u6, role: "radiogroup", "aria-label": C === "character" ? "Character" : "Voice", children: [
                  C === "voice" && he.map((K) => {
                    const ue = cn == null && Q === K.id;
                    return /* @__PURE__ */ c.jsxs(
                      "button",
                      {
                        type: "button",
                        role: "radio",
                        "aria-checked": ue,
                        className: nx,
                        style: ix(K, ue),
                        onClick: () => {
                          J(K.id), En(null);
                        },
                        children: [
                          /* @__PURE__ */ c.jsx("span", { style: lx(K), children: K.initial }),
                          /* @__PURE__ */ c.jsxs("span", { className: ax, children: [
                            /* @__PURE__ */ c.jsx("span", { style: ox(ue), children: K.name }),
                            /* @__PURE__ */ c.jsx("span", { style: Z6, children: K.role })
                          ] }),
                          ue && /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 18, color: K.color, flexShrink: 0 }, children: "check" })
                        ]
                      },
                      K.id
                    );
                  }),
                  C === "character" && Te.map((K) => {
                    const ue = K.voice ?? fl, Re = cn === K.id;
                    return /* @__PURE__ */ c.jsxs(
                      "button",
                      {
                        type: "button",
                        role: "radio",
                        "aria-checked": Re,
                        className: nx,
                        style: ix(ue, Re),
                        onClick: () => {
                          J(K.voiceId), En(K.id);
                        },
                        children: [
                          /* @__PURE__ */ c.jsx("span", { style: lx(ue), children: ue.initial }),
                          /* @__PURE__ */ c.jsxs("span", { className: ax, children: [
                            /* @__PURE__ */ c.jsx("span", { style: ox(Re), children: K.name }),
                            /* @__PURE__ */ c.jsx("span", { style: J6, children: ue.name })
                          ] }),
                          Re && /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 18, color: ue.color, flexShrink: 0 }, children: "check" })
                        ]
                      },
                      K.id
                    );
                  }),
                  (C === "voice" && he.length === 0 || C === "character" && Te.length === 0) && /* @__PURE__ */ c.jsx("div", { className: d6, children: C === "character" ? R.length === 0 ? "No characters mapped yet." : `No matches for “${T}”` : m.length === 0 ? "No voices yet — add voice assets." : `No matches for “${T}”` })
                ] }),
                /* @__PURE__ */ c.jsx("div", { className: f6 }),
                /* @__PURE__ */ c.jsxs("div", { className: h6, children: [
                  /* @__PURE__ */ c.jsx("span", { className: Wb, style: { fontSize: 9.5, marginBottom: 0 }, children: "Emotion" }),
                  /* @__PURE__ */ c.jsx(
                    "div",
                    {
                      className: m6,
                      role: "radiogroup",
                      "aria-label": "Emotion",
                      onKeyDown: (K) => {
                        K.key === "ArrowRight" || K.key === "ArrowDown" ? (K.preventDefault(), pt(1)) : (K.key === "ArrowLeft" || K.key === "ArrowUp") && (K.preventDefault(), pt(-1));
                      },
                      children: b.map((K) => {
                        const ue = P === K.id;
                        return /* @__PURE__ */ c.jsx(
                          "button",
                          {
                            type: "button",
                            role: "radio",
                            "aria-checked": ue,
                            "data-emotion": K.id,
                            tabIndex: ue ? 0 : -1,
                            className: p6,
                            style: W6(wn, ue),
                            onClick: () => ie(K.id),
                            children: K.label
                          },
                          K.id
                        );
                      })
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsx("div", { className: g6, children: /* @__PURE__ */ c.jsx("span", { className: v6, children: sl(S, Y) }) }),
                /* @__PURE__ */ c.jsxs("div", { className: y6, children: [
                  D && /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: b6,
                      "aria-label": "Remove casting",
                      onClick: () => D && xt(D),
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: "delete" })
                    }
                  ),
                  /* @__PURE__ */ c.jsxs(
                    "button",
                    {
                      type: "button",
                      style: e8(wn),
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
          /* @__PURE__ */ c.jsx("span", { className: Wb, style: { marginBottom: 0 }, children: "Assigned segments" }),
          /* @__PURE__ */ c.jsx("span", { className: j6, children: N.length }),
          sa && /* @__PURE__ */ c.jsx("span", { className: E6, children: sa })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ c.jsx("button", { type: "button", className: rx, "aria-label": "Scroll segments left", onClick: () => Ye(-1), disabled: N.length === 0, children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 18 }, "aria-hidden": "true", children: "chevron_left" }) }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: rx, "aria-label": "Scroll segments right", onClick: () => Ye(1), disabled: N.length === 0, children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 18 }, "aria-hidden": "true", children: "chevron_right" }) })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { ref: ce, className: N6, children: [
        Xe.map((K) => {
          const ue = lc(m, K.voiceId) ?? fl, Re = rn(K), _e = p?.get(K.id), Ke = _e ? kL(_e) : K.status, Dt = fe === K.id || $ === K.id, gt = ee === K.id, z = Ke === "ready" ? V6(y, _e?.utteranceId) : null;
          return /* @__PURE__ */ c.jsx(
            H6,
            {
              job: K,
              voice: ue,
              voiceMissing: Re,
              visualStatus: Ke,
              active: Dt,
              playing: gt,
              label: St[K.id] ?? K.id,
              emotionText: PL(b, K.emotion),
              text: sl(S, K.segIds),
              previewUrl: z,
              onOpen: Ce,
              onRemove: xt,
              onTogglePlay: ot,
              onHover: te,
              onFocusJob: k,
              onPlaybackEnded: re
            },
            K.id
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
const H6 = g.memo(function({
  job: a,
  voice: s,
  voiceMissing: i,
  visualStatus: o,
  active: u,
  playing: f,
  label: p,
  emotionText: y,
  text: m,
  previewUrl: b,
  onOpen: v,
  onRemove: S,
  onTogglePlay: w,
  onHover: j,
  onFocusJob: C,
  onPlaybackEnded: _
}) {
  const T = DL[o], O = b != null;
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      role: "button",
      tabIndex: 0,
      "aria-label": `${s.name} ${p} — ${y} — ${i ? "voice removed — recast" : T.label}`,
      className: C6,
      "data-broken": i ? "true" : "false",
      style: i ? n8(u) : t8(s, u),
      onClick: () => v(a),
      onKeyDown: (R) => {
        (R.key === "Enter" || R.key === " ") && (R.preventDefault(), v(a));
      },
      onMouseEnter: () => j(a.id),
      onMouseLeave: () => j(null),
      onFocus: () => C(a.id),
      children: [
        /* @__PURE__ */ c.jsxs("div", { className: T6, children: [
          /* @__PURE__ */ c.jsxs("div", { className: R6, children: [
            /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 17, color: s.color }, children: s.icon }),
            /* @__PURE__ */ c.jsx("span", { className: _6, children: s.name })
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: M6, children: p })
        ] }),
        /* @__PURE__ */ c.jsx("span", { className: A6, children: m }),
        /* @__PURE__ */ c.jsxs("div", { className: k6, children: [
          /* @__PURE__ */ c.jsx("span", { style: r8(s), children: y }),
          /* @__PURE__ */ c.jsxs("span", { className: D6, children: [
            /* @__PURE__ */ c.jsx("span", { style: s8(T) }),
            /* @__PURE__ */ c.jsx("span", { style: i8(T, o), children: T.label })
          ] })
        ] }),
        i && /* @__PURE__ */ c.jsxs("span", { style: a8, role: "status", children: [
          /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 14 }, "aria-hidden": "true", children: "error" }),
          "voice removed — recast"
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: z6, children: [
          /* @__PURE__ */ c.jsxs(
            "button",
            {
              type: "button",
              className: O6,
              "aria-label": f ? "Pause preview" : "Preview audio",
              disabled: !O && !f,
              onClick: (R) => {
                R.stopPropagation(), (O || f) && w(a.id);
              },
              children: [
                /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: f ? "pause_circle" : "play_circle" }),
                f ? "Playing" : "Preview"
              ]
            }
          ),
          /* @__PURE__ */ c.jsx(
            "button",
            {
              type: "button",
              className: L6,
              "aria-label": `Remove ${p}`,
              onClick: (R) => {
                R.stopPropagation(), S(a.id);
              },
              children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: "close" })
            }
          )
        ] }),
        f && b && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
          /* @__PURE__ */ c.jsx(
            "audio",
            {
              src: b,
              controls: !0,
              autoPlay: !0,
              preload: "auto",
              style: P6,
              onEnded: () => _((R) => R === a.id ? null : R),
              children: /* @__PURE__ */ c.jsx("track", { kind: "captions" })
            }
          ),
          /* @__PURE__ */ c.jsx("div", { className: $6, children: /* @__PURE__ */ c.jsx("div", { style: l8(s) }) })
        ] })
      ]
    }
  );
}), F6 = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }, P6 = { width: "100%", height: 32, marginTop: 8, display: "block" }, G6 = {
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
function sx(t, a) {
  return {
    borderTopLeftRadius: t ? 4 : 0,
    borderBottomLeftRadius: t ? 4 : 0,
    borderTopRightRadius: a ? 4 : 0,
    borderBottomRightRadius: a ? 4 : 0
  };
}
function Y6(t, a, s, i, o, u) {
  const f = { padding: "2px 0", cursor: "pointer", WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" }, p = "186,158,255";
  return t ? { ...f, ...sx(o, u), background: `rgba(${p},0.16)`, boxShadow: `inset 0 -2px 0 rgba(${p},0.7)`, color: "var(--on-surface)" } : a ? { ...f, ...sx(o, u), background: `rgba(${a.rgb},${s ? 0.2 : 0.11})`, boxShadow: `inset 0 -2px 0 ${a.color}`, color: "var(--on-surface)" } : { ...f, color: i === "dialogue" ? "var(--on-surface)" : "var(--on-surface-variant)" };
}
function K6(t) {
  return { color: t.color, background: `rgba(${t.rgb},0.18)`, boxShadow: `inset 0 0 0 1px rgba(${t.rgb},0.45)` };
}
function X6(t, a) {
  return t ? [...t.values()].filter((s) => s.isActive).map((s) => ({
    id: s.mappingId,
    name: s.characterName,
    voiceId: s.speakerVoiceAssetId,
    voice: a.find((i) => i.id === s.speakerVoiceAssetId) ?? null
  })) : [];
}
function ix(t, a) {
  return a ? {
    border: `1px solid rgba(${t.rgb},0.5)`,
    background: `rgba(${t.rgb},0.12)`
  } : {};
}
function lx(t) {
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
function ox(t) {
  return {
    fontSize: 12,
    fontWeight: 600,
    color: t ? "var(--on-surface, #e3e3e3)" : "var(--on-surface-variant, #c4c7c5)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  };
}
const Q6 = { position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "var(--on-surface-muted)", pointerEvents: "none" }, Z6 = { fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--on-surface-muted)" }, J6 = { fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.02em", color: "var(--on-surface-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
function W6(t, a) {
  return {
    border: `1px solid ${a ? `rgba(${t.rgb},0.45)` : "rgba(120,124,128,0.35)"}`,
    background: a ? `rgba(${t.rgb},0.14)` : "var(--surface-raised, rgba(255,255,255,0.05))",
    color: a ? t.color : "var(--on-surface-variant, #c4c7c5)"
  };
}
function e8(t) {
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
function t8(t, a) {
  return {
    background: a ? "var(--surface-high, #1d2023)" : "var(--surface-low, #111416)",
    transform: a ? "translateY(-2px)" : "none",
    boxShadow: a ? `inset 3px 0 0 ${t.color}, 0 0 0 1px rgba(${t.rgb},0.4), 0 12px 28px rgba(0,0,0,0.5)` : `inset 3px 0 0 ${t.color}`
  };
}
function n8(t) {
  const a = "var(--error, #ff6e84)";
  return {
    background: t ? "var(--surface-high, #1d2023)" : "var(--surface-low, #111416)",
    transform: t ? "translateY(-2px)" : "none",
    boxShadow: t ? `inset 3px 0 0 ${a}, 0 0 0 1px rgba(255,110,132,0.45), 0 12px 28px rgba(0,0,0,0.5)` : `inset 3px 0 0 ${a}, 0 0 0 1px rgba(255,110,132,0.32)`
  };
}
const a8 = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  marginTop: 6,
  fontFamily: "var(--font-ui)",
  fontSize: 10.5,
  fontWeight: 500,
  color: "var(--error, #ff6e84)"
};
function r8(t) {
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
function s8(t) {
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
function i8(t, a) {
  return { fontFamily: "var(--font-ui)", fontSize: 10.5, fontWeight: 500, color: a === "queued" ? "var(--on-surface-variant)" : t.color };
}
function l8(t) {
  return { position: "absolute", top: 0, bottom: 0, width: "30%", background: `linear-gradient(90deg, transparent, ${t.color}, transparent)`, animation: `${GL} 1.1s linear infinite` };
}
var o8 = "xq3iim0", c8 = "xq3iim1", u8 = "xq3iim2", d8 = "xq3iim3", f8 = "xq3iim4", h8 = "xq3iim5", m8 = "xq3iim6", p8 = "xq3iim7", g8 = "xq3iim8", v8 = "xq3iim9", y8 = "xq3iima", b8 = "xq3iimb", x8 = "xq3iimc", S8 = "xq3iimd", w8 = "xq3iime", j8 = "xq3iimf", E8 = "xq3iimg", N8 = "xq3iimh", C8 = "xq3iimi", T8 = "xq3iimj", R8 = "xq3iimk", cx = "xq3iiml";
function _8({
  deploymentId: t,
  initialVoiceAssetId: a,
  onChange: s
}) {
  const [i, o] = g.useState([]), [u, f] = g.useState(a), [p, y] = g.useState(!0), [m, b] = g.useState(!1), [v, S] = g.useState(null), [w, j] = g.useState(!1), C = g.useRef(null), _ = g.useRef(null);
  g.useEffect(() => {
    let N = !1;
    return y(!0), Zs(t).then(({ voiceAssets: U }) => {
      N || o(U);
    }).catch((U) => {
      N || S(U instanceof Error ? U.message : "Failed to load voices");
    }).finally(() => {
      N || y(!1);
    }), () => {
      N = !0;
    };
  }, [t]), g.useEffect(() => {
    if (!w) return;
    const N = (Y) => {
      C.current && (Y.target instanceof Node && C.current.contains(Y.target) || j(!1));
    }, U = (Y) => {
      Y.key === "Escape" && (j(!1), _.current?.focus());
    };
    return document.addEventListener("mousedown", N), document.addEventListener("keydown", U), () => {
      document.removeEventListener("mousedown", N), document.removeEventListener("keydown", U);
    };
  }, [w]);
  const T = g.useCallback(
    async (N) => {
      b(!0), S(null);
      const U = u, Y = N === u ? null : N;
      f(Y), j(!1);
      try {
        await wT(t, Y), s?.(Y);
      } catch (ae) {
        f(U), S(ae instanceof Error ? ae.message : "Failed to update default voice");
      } finally {
        b(!1);
      }
    },
    [t, s, u]
  ), O = g.useMemo(
    () => i.find((N) => N.voiceAssetId === u) ?? null,
    [i, u]
  ), R = g.useMemo(() => {
    const N = [], U = [];
    for (const Y of i)
      Y.kind === "speaker" || Y.kind === "mixed" ? N.push(Y) : U.push(Y);
    return { uploaded: N, other: U };
  }, [i]);
  return p ? /* @__PURE__ */ c.jsx("span", { className: cx, children: "Loading voices…" }) : i.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: cx, children: "No voices yet. Upload a reference in Mappings to enable Quick mode." }) : /* @__PURE__ */ c.jsxs("div", { ref: C, className: o8, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: _,
        type: "button",
        className: `${c8} ${w ? u8 : ""}`,
        "aria-haspopup": "listbox",
        "aria-expanded": w,
        disabled: m,
        onClick: () => j((N) => !N),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: d8, "aria-hidden": "true", children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", children: "graphic_eq" }) }),
          /* @__PURE__ */ c.jsxs("span", { className: f8, children: [
            /* @__PURE__ */ c.jsx("span", { className: h8, children: O ? O.displayName : "Pick a voice" }),
            /* @__PURE__ */ c.jsx("span", { className: m8, children: O ? ww(O) : `${i.length} voice${i.length === 1 ? "" : "s"} in library` })
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: p8, "aria-hidden": "true", children: M8.map((N, U) => /* @__PURE__ */ c.jsx("i", { style: { height: `${N * 100}%` } }, U)) }),
          /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${g8}`, "aria-hidden": "true", children: w ? "expand_less" : "expand_more" })
        ]
      }
    ),
    w && /* @__PURE__ */ c.jsxs(
      "div",
      {
        role: "listbox",
        "aria-label": "Quick mode voice",
        className: v8,
        children: [
          /* @__PURE__ */ c.jsx("div", { className: y8, children: /* @__PURE__ */ c.jsx("span", { className: b8, children: "Select voice" }) }),
          v && /* @__PURE__ */ c.jsx("div", { className: x8, role: "alert", children: v }),
          R.uploaded.length > 0 && /* @__PURE__ */ c.jsx(ux, { label: "Uploaded", children: R.uploaded.map((N) => /* @__PURE__ */ c.jsx(
            dx,
            {
              voice: N,
              selected: u === N.voiceAssetId,
              onSelect: () => void T(N.voiceAssetId)
            },
            N.voiceAssetId
          )) }),
          R.other.length > 0 && /* @__PURE__ */ c.jsx(ux, { label: "Other", children: R.other.map((N) => /* @__PURE__ */ c.jsx(
            dx,
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
function ux({ label: t, children: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: S8, children: [
    /* @__PURE__ */ c.jsx("div", { className: w8, children: t }),
    a
  ] });
}
function dx({ voice: t, selected: a, onSelect: s }) {
  return /* @__PURE__ */ c.jsxs(
    "button",
    {
      type: "button",
      role: "option",
      "aria-selected": a,
      className: `${j8} ${a ? E8 : ""}`,
      onClick: s,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: N8, "aria-hidden": "true" }),
        /* @__PURE__ */ c.jsx("span", { className: C8, children: t.displayName }),
        /* @__PURE__ */ c.jsx("span", { className: T8, children: ww(t) }),
        a && /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${R8}`, "aria-hidden": "true", children: "check" })
      ]
    }
  );
}
const M8 = [0.35, 0.7, 0.5, 0.85, 0.45, 0.6, 0.32, 0.78, 0.4, 0.55, 0.7, 0.36];
function ww(t) {
  const a = [];
  return t.durationMs != null && a.push(A8(t.durationMs)), t.sampleRate != null && a.push(`${(t.sampleRate / 1e3).toFixed(1)} kHz`), t.kind && t.kind !== "speaker" && a.push(t.kind), a.length > 0 ? a.join(" · ") : "—";
}
function A8(t) {
  const a = t / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const s = Math.floor(a / 60), i = Math.round(a - s * 60);
  return `${s}:${i.toString().padStart(2, "0")}`;
}
const fx = [
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
function k8(t) {
  const a = ni(), s = g.useRef(null), { tokens: i, attributions: o, unresolved: u, predictedFilenames: f, characterColor: p } = g.useMemo(
    () => z8(t.value, t.outputFormat, t.mappings),
    [t.value, t.outputFormat, t.mappings]
  ), y = (b) => {
    const v = s.current;
    v && (v.scrollTop = b.currentTarget.scrollTop, v.scrollLeft = b.currentTarget.scrollLeft);
  }, m = t.quickMode === !0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: m ? f_ : c_, children: [
      !m && /* @__PURE__ */ c.jsx("div", { ref: s, className: u_, "aria-hidden": "true", children: i.map((b, v) => D8(b, v, p)) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: m ? h_ : d_,
          value: t.value,
          onChange: (b) => t.onChange(b.currentTarget.value),
          onScroll: m ? void 0 : y,
          placeholder: m ? "Type or paste plain text. The selected voice will read every word." : `[Bob] Hey there
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
function D8(t, a, s) {
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
  const i = s.get(t.character?.toLowerCase() ?? "") ?? "currentColor", o = t.hasMapping ? p0 : `${p0} ${m_}`;
  return /* @__PURE__ */ c.jsxs("span", { children: [
    /* @__PURE__ */ c.jsxs("span", { className: o, style: { color: i }, children: [
      "[",
      t.character,
      t.override && /* @__PURE__ */ c.jsxs("span", { className: p_, children: [
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
function z8(t, a, s) {
  const i = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], u = [], f = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Map(), y = [], m = /* @__PURE__ */ new Map();
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
    let O = "Narrator", R = C, N, U = !1;
    if (T?.groups) {
      U = !0;
      const V = (T.groups.body ?? "").trim(), D = (T.groups.rest ?? "").trim();
      O = ((V.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", N = (V.includes("|") ? V.slice(V.indexOf("|") + 1) : "").trim() || void 0, R = D;
    }
    S += 1;
    const Y = O.toLowerCase(), ae = (p.get(Y) ?? 0) + 1;
    p.set(Y, ae);
    const M = O === "Narrator" || s.has(Y);
    if (M || f.add(O), O !== "Narrator" && !m.has(Y) && (m.set(Y, fx[b % fx.length] ?? "currentColor"), b += 1), U) {
      const V = { kind: "character", raw: w, character: O, text: R, hasMapping: M };
      N !== void 0 && (V.override = N), o.push(V);
    } else
      o.push({ kind: "narrator", raw: w });
    u.push({ lineNumber: _, character: O, text: R, hasMapping: M }), y.push(
      `${S.toString().padStart(3, "0")}_${O8(O)}_${ae.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: u,
    unresolved: Array.from(f),
    predictedFilenames: y,
    characterColor: m
  };
}
function O8(t) {
  const a = t.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
const hx = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], jw = 1e-3;
function L8(t) {
  return t.replace(/[\[\]|\r\n]/g, "").trim();
}
function $8() {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `row_${crypto.randomUUID()}` : `row_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}
function U8(t) {
  return t.replace(/[\r\n]/g, " ").trim();
}
function Ew(t) {
  return Number.isNaN(t) ? 1 : t < 0 ? 0 : t > 1 ? 1 : t;
}
function Nw(t) {
  const a = Math.round(t * 1e3) / 1e3;
  return Number.isInteger(a) ? a.toFixed(1) : String(a);
}
function B8(t) {
  const a = [];
  for (let s = 0; s < hx.length; s += 1) {
    const i = t[s];
    typeof i == "number" && (Math.abs(i) < jw || a.push(`${hx[s]}=${Nw(Ew(i))}`));
  }
  return a.length === 0 ? null : a.join(",");
}
function I8(t, a) {
  const s = L8(t.character) || "Narrator", i = U8(t.text);
  if (!i) return null;
  const o = [];
  if (t.presetId) {
    const p = a.get(t.presetId);
    if (p) {
      const y = B8(p.vector);
      y && o.push(`emotion_vector:${y}`);
    }
  }
  const u = Ew(t.alpha);
  return Math.abs(u - 1) >= jw && o.push(`emotion_alpha:${Nw(u)}`), `${o.length > 0 ? `[${s}|${o.join("|")}]` : `[${s}]`} ${i}`;
}
function Cw(t, a) {
  const s = /* @__PURE__ */ new Map();
  for (const o of a) s.set(o.presetId, o);
  const i = [];
  for (const o of t) {
    const u = I8(o, s);
    u && i.push(u);
  }
  return i.join(`
`);
}
function Kr() {
  return {
    id: $8(),
    character: "",
    presetId: null,
    alpha: 1,
    text: ""
  };
}
var V8 = "_1827s3t2", q8 = "_1827s3t3", H8 = "_1827s3t4", F8 = "_1827s3t5", P8 = "_1827s3t6", G8 = "_1827s3t7", Y8 = "_1827s3t8", K8 = "_1827s3t9", X8 = "_1827s3ta", Q8 = "_1827s3tb", Z8 = "_1827s3td _1827s3tc", J8 = "_1827s3te _1827s3tc", W8 = "_1827s3tf", e$ = "_1827s3tg", t$ = "_1827s3th", n$ = "_1827s3ti _1827s3tc", a$ = "_1827s3tj", r$ = "_1827s3tk", s$ = "_1827s3tl", i$ = "_1827s3tm", l$ = "_1827s3tn", o$ = "_1827s3to", c$ = "_1827s3tp", u$ = "_1827s3tq", d$ = "_1827s3tr", f$ = "_1827s3ts", h$ = "_1827s3tt", m$ = "_1827s3tu";
function p$({
  rows: t,
  onRowsChange: a,
  presets: s,
  mappingsByLower: i
}) {
  const o = g.useId(), u = g.useId(), f = g.useId(), p = g.useRef(null), y = g.useRef(/* @__PURE__ */ new Map()), m = g.useRef(/* @__PURE__ */ new Map()), b = g.useRef(/* @__PURE__ */ new Map()), [v, S] = g.useState(null), [w, j] = g.useState(!1), C = g.useRef(null), _ = g.useRef(null), [T, O] = g.useState(null), [R, N] = g.useState(null), [U, Y] = g.useState("");
  g.useEffect(() => {
    v && (v.kind === "addBtn" ? p.current?.focus() : v.kind === "text" && v.rowId ? y.current.get(v.rowId)?.focus() : v.kind === "remove" && v.rowId ? m.current.get(v.rowId)?.focus() : v.kind === "character" && v.rowId ? b.current.get(v.rowId)?.focus() : v.kind === "unmappedFirstItem" && _.current?.querySelector("button")?.focus(), S(null));
  }, [v]);
  const ae = t.filter((B) => B.text.trim().length > 0).length, M = g.useMemo(() => {
    const B = /* @__PURE__ */ new Map();
    for (const W of t) {
      const ce = W.character.trim(), ye = ce.toLowerCase();
      !ye || ye === "narrator" || i.has(ye) || B.has(ye) || B.set(ye, ce);
    }
    return Array.from(B.values()).sort((W, ce) => W.localeCompare(ce));
  }, [t, i]), V = M.length, D = g.useRef(V), [H, Q] = g.useState(0);
  g.useEffect(() => {
    V > D.current && Q((B) => B + 1), D.current = V;
  }, [V]), g.useEffect(() => {
    if (!w) return;
    S({ kind: "unmappedFirstItem" });
    const B = (ce) => {
      if (!_.current || !C.current) return;
      const ye = ce.target;
      _.current.contains(ye) || C.current.contains(ye) || j(!1);
    }, W = (ce) => {
      ce.key === "Escape" && (j(!1), C.current?.focus());
    };
    return document.addEventListener("mousedown", B), document.addEventListener("keydown", W), () => {
      document.removeEventListener("mousedown", B), document.removeEventListener("keydown", W);
    };
  }, [w]);
  const J = g.useMemo(() => {
    const B = /* @__PURE__ */ new Set();
    return i.forEach((W) => B.add(W.characterName)), Array.from(B).sort((W, ce) => W.localeCompare(ce));
  }, [i]), P = g.useCallback(
    (B, W) => {
      a(t.map((ce) => ce.id === B ? { ...ce, ...W } : ce));
    },
    [t, a]
  ), ie = g.useRef(t);
  g.useEffect(() => {
    ie.current = t;
  }, [t]);
  const A = g.useCallback(
    (B) => {
      const W = t.findIndex((We) => We.id === B);
      if (W < 0) return;
      const ce = t[W];
      if (!ce) return;
      const ye = W > 0 ? t[W - 1]?.id ?? null : null, Ae = t.filter((We) => We.id !== B);
      a(Ae);
      const lt = ce.character.trim() || `Line ${W + 1}`;
      mn(`Removed ${lt}`, {
        action: {
          label: "Undo",
          onClick: () => {
            const We = ie.current;
            if (We.some((qt) => qt.id === ce.id)) return;
            const Be = [...We], Fe = ye ? We.findIndex((qt) => qt.id === ye) : -1, rn = Fe >= 0 ? Fe + 1 : 0;
            Be.splice(rn, 0, ce), a(Be);
          }
        },
        duration: 5e3
      });
      const Ne = `Removed line ${W + 1}, now ${Ae.length} ${Ae.length === 1 ? "line" : "lines"}`;
      if (Y((We) => We === Ne ? `${Ne}​` : Ne), Ae.length === 0)
        S({ kind: "addBtn" });
      else {
        const We = W < Ae.length ? W : Ae.length - 1, Be = Ae[We];
        S(Be ? { kind: "remove", rowId: Be.id } : { kind: "addBtn" });
      }
    },
    [t, a]
  ), q = g.useCallback(
    (B) => {
      const W = Kr();
      let ce;
      if (B === null)
        ce = [...t, W];
      else {
        const ye = t.findIndex((Ae) => Ae.id === B);
        ce = ye < 0 ? [...t, W] : [...t.slice(0, ye + 1), W, ...t.slice(ye + 1)];
      }
      a(ce), S({ kind: "text", rowId: W.id });
    },
    [t, a]
  ), $ = g.useCallback(
    (B, W) => {
      const ce = t.findIndex((Fe) => Fe.id === B);
      if (ce < 0) return;
      const ye = ce + W;
      if (ye < 0 || ye >= t.length) return;
      const Ae = [...t], lt = Ae[ce], Ne = Ae[ye];
      if (!lt || !Ne) return;
      Ae[ce] = Ne, Ae[ye] = lt, a(Ae);
      const Be = `Moved ${lt.character.trim() || `Line ${ce + 1}`} to position ${ye + 1} of ${Ae.length}`;
      Y((Fe) => Fe === Be ? `${Be}​` : Be);
    },
    [t, a]
  ), te = g.useCallback(
    (B, W) => {
      B.key === "Enter" && !B.shiftKey ? (B.preventDefault(), q(W)) : B.altKey && B.key === "ArrowUp" ? (B.preventDefault(), $(W, -1)) : B.altKey && B.key === "ArrowDown" && (B.preventDefault(), $(W, 1));
    },
    [q, $]
  ), fe = g.useCallback((B, W) => {
    O(W), B.dataTransfer.effectAllowed = "move", B.dataTransfer.setData("text/plain", W);
  }, []), k = g.useCallback((B, W) => {
    T && (B.preventDefault(), B.dataTransfer.dropEffect = "move", R !== W && N(W));
  }, [T, R]), ee = g.useCallback(
    (B, W) => {
      B.preventDefault();
      const ce = T ?? B.dataTransfer.getData("text/plain");
      if (O(null), N(null), !ce || ce === W) return;
      const ye = t.findIndex((Fe) => Fe.id === ce), Ae = t.findIndex((Fe) => Fe.id === W);
      if (ye < 0 || Ae < 0) return;
      const lt = [...t], [Ne] = lt.splice(ye, 1);
      if (!Ne) return;
      lt.splice(Ae, 0, Ne), a(lt);
      const Be = `Moved ${Ne.character.trim() || `Line ${ye + 1}`} to position ${Ae + 1} of ${lt.length}`;
      Y((Fe) => Fe === Be ? `${Be}​` : Be);
    },
    [t, a, T]
  ), re = g.useCallback(() => {
    O(null), N(null);
  }, []), G = g.useCallback(
    (B) => {
      const W = t.find((ce) => ce.character.trim().toLowerCase() === B.toLowerCase());
      W && S({ kind: "character", rowId: W.id }), j(!1);
    },
    [t]
  );
  return /* @__PURE__ */ c.jsxs("section", { className: V8, "aria-labelledby": u, children: [
    /* @__PURE__ */ c.jsxs("header", { className: q8, children: [
      /* @__PURE__ */ c.jsxs("span", { className: H8, id: u, children: [
        "02 / Per-character lines",
        t.length > 1 && /* @__PURE__ */ c.jsx("span", { className: h$, children: "· Alt+↑↓ to reorder" })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: F8, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: P8, children: ae.toString().padStart(2, "0") }),
        " lines",
        V > 0 && /* @__PURE__ */ c.jsxs("span", { className: r$, children: [
          /* @__PURE__ */ c.jsxs(
            "button",
            {
              ref: C,
              type: "button",
              className: m$,
              "aria-haspopup": "dialog",
              "aria-expanded": w,
              "aria-controls": f,
              title: "Click to see unmapped characters",
              onClick: () => j((B) => !B),
              children: [
                "⚠ ",
                V,
                " unmapped"
              ]
            },
            H
          ),
          w && /* @__PURE__ */ c.jsxs(
            "div",
            {
              ref: _,
              id: f,
              role: "dialog",
              "aria-label": "Unmapped characters",
              className: s$,
              children: [
                /* @__PURE__ */ c.jsx("p", { className: i$, children: "These characters have no voice mapping. Click a name to jump to its row." }),
                /* @__PURE__ */ c.jsx("ul", { className: l$, children: M.map((B) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsx(
                  "button",
                  {
                    type: "button",
                    className: o$,
                    onClick: () => G(B),
                    children: B
                  }
                ) }, B)) })
              ]
            }
          )
        ] })
      ] })
    ] }),
    t.length === 0 ? /* @__PURE__ */ c.jsx("p", { className: d$, children: "No lines yet — add a character line to start. Each row produces one utterance." }) : /* @__PURE__ */ c.jsx("ul", { className: G8, children: t.map((B, W) => {
      const ce = B.character.trim() || `line ${W + 1}`, ye = i.has(B.character.trim().toLowerCase()), Ae = T === B.id, lt = R === B.id && T !== B.id;
      return /* @__PURE__ */ c.jsxs(
        "li",
        {
          className: Y8,
          "data-mapped": ye || void 0,
          "data-dragging": Ae || void 0,
          "data-drag-over": lt || void 0,
          onDragOver: (Ne) => k(Ne, B.id),
          onDrop: (Ne) => ee(Ne, B.id),
          onDragEnd: re,
          children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: K8,
                draggable: !0,
                "aria-label": `Drag to reorder ${ce}. Use Alt+ArrowUp / Alt+ArrowDown for keyboard reorder.`,
                title: "Drag to reorder · Alt+↑ / Alt+↓",
                onDragStart: (Ne) => fe(Ne, B.id),
                onKeyDown: (Ne) => {
                  Ne.altKey && Ne.key === "ArrowUp" ? (Ne.preventDefault(), $(B.id, -1)) : Ne.altKey && Ne.key === "ArrowDown" && (Ne.preventDefault(), $(B.id, 1));
                },
                children: "⋮⋮"
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: Q8, "aria-hidden": "true", children: (W + 1).toString().padStart(2, "0") }),
            /* @__PURE__ */ c.jsx(
              "input",
              {
                ref: (Ne) => {
                  Ne ? b.current.set(B.id, Ne) : b.current.delete(B.id);
                },
                type: "text",
                value: B.character,
                onChange: (Ne) => P(B.id, { character: Ne.target.value }),
                placeholder: "Character",
                className: Z8,
                "aria-label": `Character name for ${ce}`,
                list: J.length > 0 ? o : void 0,
                autoComplete: "off",
                spellCheck: !1
              }
            ),
            /* @__PURE__ */ c.jsxs(
              "select",
              {
                value: B.presetId ?? "",
                onChange: (Ne) => P(B.id, { presetId: Ne.target.value === "" ? null : Ne.target.value }),
                className: J8,
                "aria-label": `Emotion preset for ${ce}`,
                children: [
                  /* @__PURE__ */ c.jsx("option", { value: "", children: "No emotion" }),
                  s.map((Ne) => /* @__PURE__ */ c.jsx("option", { value: Ne.presetId, children: Ne.presetName }, Ne.presetId))
                ]
              }
            ),
            /* @__PURE__ */ c.jsxs("span", { className: W8, children: [
              /* @__PURE__ */ c.jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 1,
                  step: 0.05,
                  value: B.alpha,
                  onChange: (Ne) => P(B.id, { alpha: Number.parseFloat(Ne.target.value) }),
                  className: e$,
                  "aria-label": `Emotion intensity for ${ce}`,
                  "aria-valuetext": `${Math.round(B.alpha * 100)} percent`
                }
              ),
              /* @__PURE__ */ c.jsx(
                "span",
                {
                  className: t$,
                  "aria-hidden": "true",
                  "data-hot": B.alpha >= 0.85 || void 0,
                  children: (Math.round(B.alpha * 100) / 100).toFixed(2)
                }
              )
            ] }),
            /* @__PURE__ */ c.jsx(
              "input",
              {
                ref: (Ne) => {
                  Ne ? y.current.set(B.id, Ne) : y.current.delete(B.id);
                },
                type: "text",
                value: B.text,
                onChange: (Ne) => P(B.id, { text: Ne.target.value }),
                onKeyDown: (Ne) => te(Ne, B.id),
                placeholder: "Line text…",
                className: n$,
                "aria-label": `Line text for ${ce}`
              }
            ),
            /* @__PURE__ */ c.jsx(
              "button",
              {
                ref: (Ne) => {
                  Ne ? m.current.set(B.id, Ne) : m.current.delete(B.id);
                },
                type: "button",
                className: a$,
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
                className: X8,
                "aria-label": `Insert line after ${ce}`,
                title: "Insert line below",
                onClick: () => q(B.id),
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
        ref: p,
        type: "button",
        className: c$,
        onClick: () => q(null),
        "aria-label": "Add character line",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: u$, "aria-hidden": "true", children: "＋" }),
          "Add line"
        ]
      }
    ),
    J.length > 0 && /* @__PURE__ */ c.jsx("datalist", { id: o, children: J.map((B) => /* @__PURE__ */ c.jsx("option", { value: B }, B)) }),
    /* @__PURE__ */ c.jsx("div", { className: f$, role: "status", "aria-live": "polite", "aria-atomic": "true", children: U })
  ] });
}
var g$ = "fmg0gf0", v$ = "fmg0gf1", mx = { idle: "fmg0gf3 fmg0gf2", active: "fmg0gf4 fmg0gf2" };
const Fs = [
  { id: "quick", label: "Quick", glyph: "01", description: "Single voice · plain prose" },
  { id: "rows", label: "Per-character", glyph: "02", description: "One row per line · multi-voice" },
  { id: "story", label: "Story", glyph: "03", description: "Free-form text with @character and /emotion commands" },
  { id: "storyboard", label: "Storyboard", glyph: "04", description: "Click words to cast voice + emotion in bulk · shift-click to extend a range" }
], y$ = Fs;
function b$({
  value: t,
  onChange: a,
  storyDisabled: s = !1
}) {
  const i = g.useRef([]), o = g.useCallback(
    (f, p) => {
      const y = Fs.length;
      let m = f;
      for (let v = 1; v <= y; v += 1) {
        const S = (f + p * v + y) % y, w = Fs[S];
        if (!w) continue;
        if (!(w.id === "story" && s)) {
          m = S;
          break;
        }
      }
      const b = Fs[m];
      b && (a(b.id), i.current[m]?.focus());
    },
    [a, s]
  ), u = g.useCallback(
    (f, p) => {
      f.key === "ArrowRight" || f.key === "ArrowDown" ? (f.preventDefault(), o(p, 1)) : f.key === "ArrowLeft" || f.key === "ArrowUp" ? (f.preventDefault(), o(p, -1)) : f.key === "Home" ? (f.preventDefault(), o(-1, 1)) : f.key === "End" && (f.preventDefault(), o(Fs.length, -1));
    },
    [o]
  );
  return /* @__PURE__ */ c.jsx("div", { className: g$, role: "radiogroup", "aria-label": "Editor mode", children: Fs.map((f, p) => {
    const y = f.id === t, m = f.id === "story" && s, b = m ? `${f.label} (coming soon)` : f.label;
    return /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: (v) => {
          i.current[p] = v;
        },
        type: "button",
        role: "radio",
        "aria-checked": y,
        "aria-disabled": m || void 0,
        tabIndex: y ? 0 : -1,
        title: m ? `${f.description} — coming soon` : f.description,
        className: y ? mx.active : mx.idle,
        onClick: () => {
          m || a(f.id);
        },
        onKeyDown: (v) => u(v, p),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: v$, "aria-hidden": "true", children: f.glyph }),
          /* @__PURE__ */ c.jsx("span", { children: b })
        ]
      },
      f.id
    );
  }) });
}
const x$ = [
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
function S$(t, a) {
  const s = t.ownerDocument;
  if (!s) return { top: 0, left: 0, height: 0 };
  const i = s.createElement("div"), o = s.defaultView?.getComputedStyle(t);
  if (!o) return { top: 0, left: 0, height: 0 };
  const u = i.style, f = o;
  for (const C of x$) {
    const _ = f[C];
    typeof _ == "string" && (u[C] = _);
  }
  i.style.position = "absolute", i.style.visibility = "hidden", i.style.overflow = "hidden", i.style.top = "0", i.style.left = "-9999px", i.style.whiteSpace = "pre-wrap", i.style.wordWrap = "break-word";
  const p = t.value.slice(0, a), y = s.createTextNode(p.replace(/ /g, " ")), m = s.createElement("span");
  m.textContent = t.value.slice(a, a + 1) || ".", i.appendChild(y), i.appendChild(m), s.body.appendChild(i);
  const b = m.getBoundingClientRect(), v = i.getBoundingClientRect(), S = b.top - v.top - t.scrollTop, w = b.left - v.left - t.scrollLeft, j = b.height || parseFloat(o.lineHeight) || 16;
  return s.body.removeChild(i), { top: S, left: w, height: j };
}
const Tw = {
  character: "@",
  emotion: "/"
}, Rw = /* @__PURE__ */ new Set([" ", "	", `
`, "\r"]), w$ = /[\p{L}\p{N}_-]/u, j$ = /[^\p{L}\p{N}_-]+/gu;
function _w(t) {
  return t ? w$.test(t) : !1;
}
function E$(t) {
  return t.replace(j$, "_").replace(/_+/g, "_").replace(/^[_-]+|[_-]+$/g, "");
}
function N$(t, a) {
  if (a >= t.length) return 0;
  const s = t.charCodeAt(a);
  if (s >= 55296 && s <= 56319 && a + 1 < t.length) {
    const i = t.charCodeAt(a + 1);
    if (i >= 56320 && i <= 57343) return 2;
  }
  return 1;
}
function Uc(t, a) {
  const s = N$(t, a);
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
    const f = t[i], p = f === "@" || f === "/", y = i === 0 ? "" : Uc(t, Ec(t, i)), m = i === 0 || y !== "" && Rw.has(y);
    if (p && m) {
      let b = i + 1, v = "";
      for (; b < o; ) {
        const S = Uc(t, b);
        if (S && _w(S))
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
function C$(t, a) {
  if (a <= 0 || a > t.length) return null;
  let s = Ec(t, a), i = "";
  for (; s >= 0; ) {
    const o = Uc(t, s);
    if (!o) break;
    if (o === "@" || o === "/") {
      const f = s === 0 ? "" : Uc(t, Ec(t, s));
      return s === 0 || f !== "" && Rw.has(f) ? {
        kind: o === "@" ? "character" : "emotion",
        start: s,
        query: i
      } : null;
    }
    if (!_w(o)) return null;
    i = o + i;
    const u = Ec(t, s);
    if (u < 0) break;
    s = u;
  }
  return null;
}
var T$ = "_1d2ofoy5", R$ = "_1d2ofoy6", _$ = "_1d2ofoy8 _1d2ofoy7", M$ = "_1d2ofoy9 _1d2ofoy7", A$ = "_1d2ofoya", k$ = "_1d2ofoyb", D$ = "_1d2ofoyc", z$ = "_1d2ofoye", O$ = "_1d2ofoyf", L$ = "_1d2ofoyg", $$ = "_1d2ofoyh", U$ = "_1d2ofoyi", B$ = "_1d2ofoyj", oc = "_1d2ofoyk", I$ = "_1d2ofoyl";
const V$ = `Type @character to set the speaker, /emotion to set the emotion preset.

@bob /happy I love mornings!
@alice /melancholic I prefer evenings.`;
function q$({
  value: t,
  onChange: a,
  characters: s,
  presets: i,
  mappingsByLower: o
}) {
  const u = g.useRef(null), f = g.useRef(null), p = g.useId(), y = `${p}-opt`, [m, b] = g.useState(null), v = g.useMemo(() => Bc(t), [t]), S = g.useMemo(() => {
    const D = /* @__PURE__ */ new Map();
    o.forEach((H) => D.set(H.characterName.toLowerCase(), H.characterName));
    for (const H of s) {
      const Q = H.toLowerCase();
      D.has(Q) || D.set(Q, H);
    }
    return Array.from(D.values()).sort((H, Q) => H.localeCompare(Q));
  }, [s, o]), w = g.useMemo(() => {
    if (!m) return [];
    const D = m.query.toLowerCase();
    if (m.kind === "character")
      return S.filter((J) => J.toLowerCase().includes(D)).slice(0, 8).map((J) => {
        const P = o.get(J.toLowerCase());
        return { value: J, hint: P ? "mapped" : "unmapped" };
      });
    const H = /* @__PURE__ */ new Set(), Q = [];
    for (const J of i) {
      const P = J.presetName.toLowerCase();
      if (P.includes(D) && !H.has(P) && (H.add(P), Q.push({ value: J.presetName, hint: "vector" }), Q.length >= 8))
        break;
    }
    return Q;
  }, [m, S, o, i]), j = g.useCallback((D, H, Q) => {
    if (H < 0) return null;
    const J = C$(D, H);
    if (!J) return null;
    const P = u.current, ie = P ? S$(P, H) : { top: 0, left: 0, height: 0 };
    return {
      triggerStart: J.start,
      query: J.query,
      kind: J.kind,
      selected: Q && Q.kind === J.kind ? Q.selected : 0,
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
    const H = D.selectionStart;
    if (H !== D.selectionEnd) {
      b(null);
      return;
    }
    b((Q) => j(t, H, Q));
  }, [t, j]);
  g.useEffect(() => {
    if (!m) return;
    const D = w.length, H = D === 0 ? 0 : Math.min(m.selected, D - 1);
    m.selected !== H && b({ ...m, selected: H });
  }, [m, w]), g.useLayoutEffect(() => {
    const D = f.current, H = u.current;
    !D || !H || (D.scrollTop = H.scrollTop, D.scrollLeft = H.scrollLeft);
  }), g.useEffect(() => {
    const D = u.current, H = f.current;
    if (!D || !H) return;
    const Q = () => {
      H.scrollTop = D.scrollTop, H.scrollLeft = D.scrollLeft;
    };
    return D.addEventListener("scroll", Q, { passive: !0 }), () => D.removeEventListener("scroll", Q);
  }, []);
  const _ = g.useCallback(
    (D) => {
      const H = D.target.value;
      a(H);
      const Q = D.target;
      requestAnimationFrame(() => {
        const J = Q.selectionStart;
        if (J !== Q.selectionEnd) {
          b(null);
          return;
        }
        b((P) => j(H, J, P));
      });
    },
    [a, j]
  ), T = g.useCallback(() => {
    C();
  }, [C]), O = g.useCallback(
    (D, H) => {
      if (!m) return;
      const Q = Tw[m.kind], J = m.triggerStart + 1 + m.query.length, P = t.slice(0, m.triggerStart), ie = t.slice(J), A = E$(D);
      if (!A) return;
      const q = `${Q}${A} `, $ = `${P}${q}${ie}`;
      a($);
      const te = P.length + q.length;
      b(null), H.advanceFocus || requestAnimationFrame(() => {
        u.current && (u.current.focus(), u.current.setSelectionRange(te, te));
      });
    },
    [m, t, a]
  ), R = g.useCallback(
    (D) => {
      if (m) {
        if (D.key === "Escape") {
          D.preventDefault(), b(null);
          return;
        }
        if (w.length !== 0) {
          if (D.key === "ArrowDown")
            D.preventDefault(), b((H) => H && { ...H, selected: (H.selected + 1) % w.length });
          else if (D.key === "ArrowUp")
            D.preventDefault(), b(
              (H) => H && { ...H, selected: (H.selected - 1 + w.length) % w.length }
            );
          else if (D.key === "Enter") {
            const H = w[m.selected];
            H && (D.preventDefault(), O(H.value, { advanceFocus: !1 }));
          } else if (D.key === "Tab") {
            const H = w[m.selected];
            H && O(H.value, { advanceFocus: !0 });
          }
        }
      }
    },
    [m, w, O]
  ), N = g.useRef(null), [U, Y] = g.useState(null);
  g.useLayoutEffect(() => {
    if (!m) {
      Y(null);
      return;
    }
    const D = N.current, H = u.current;
    if (!D || !H) return;
    const Q = D.offsetWidth, J = H.clientWidth, P = Math.max(0, J - Q - 8), ie = Math.max(0, m.caretLeft);
    Y(Math.min(ie, P));
  }, [m]);
  const ae = m?.kind === "character" ? "Character" : "Emotion preset", M = m && w.length > 0 ? `${y}-${m.selected}` : void 0, V = !m || w.length > 0 ? null : m.kind === "emotion" ? i.length === 0 ? "No emotion presets yet — create one in Mappings." : `No preset matches "${m.query}". Type a different name or pick from Mappings.` : m.query.length === 0 ? "Type a name — we'll create a new character on the fly." : `No character "${m.query}" yet — keep typing to define a new one.`;
  return /* @__PURE__ */ c.jsxs("div", { className: T$, children: [
    /* @__PURE__ */ c.jsxs("div", { className: R$, children: [
      /* @__PURE__ */ c.jsx("div", { ref: f, className: _$, "aria-hidden": "true", children: H$(v, m?.triggerStart ?? null) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          ref: u,
          className: M$,
          value: t,
          onChange: _,
          onSelect: T,
          onKeyDown: R,
          placeholder: V$,
          rows: 10,
          spellCheck: !0,
          "aria-label": "Story script",
          "aria-controls": m && w.length > 0 ? p : void 0,
          "aria-autocomplete": "list",
          "aria-activedescendant": M
        }
      ),
      m && (w.length > 0 || V) && /* @__PURE__ */ c.jsxs(
        "div",
        {
          ref: N,
          className: z$,
          style: {
            top: `${m.caretTop + m.caretHeight + 6}px`,
            left: `${U ?? Math.max(0, m.caretLeft)}px`
          },
          children: [
            /* @__PURE__ */ c.jsx("div", { className: O$, "aria-hidden": "true", children: ae }),
            w.length > 0 ? /* @__PURE__ */ c.jsx(
              "ul",
              {
                id: p,
                role: "listbox",
                "aria-label": ae,
                className: L$,
                children: w.map((D, H) => {
                  const Q = `${y}-${H}`, J = H === m.selected;
                  return /* @__PURE__ */ c.jsxs(
                    "li",
                    {
                      id: Q,
                      role: "option",
                      "aria-selected": J,
                      "data-active": J || void 0,
                      className: $$,
                      onMouseDown: (P) => {
                        P.preventDefault(), O(D.value, { advanceFocus: !1 });
                      },
                      children: [
                        /* @__PURE__ */ c.jsx("span", { children: D.value }),
                        D.hint && /* @__PURE__ */ c.jsx("span", { className: U$, children: D.hint })
                      ]
                    },
                    `${D.value}-${H}`
                  );
                })
              }
            ) : /* @__PURE__ */ c.jsx("div", { id: p, role: "status", className: I$, children: V })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: B$, children: [
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
function H$(t, a) {
  return t.map((s, i) => {
    if (s.kind === "text")
      return /* @__PURE__ */ c.jsx("span", { className: A$, children: s.value }, `${s.start}-${i}`);
    const o = s.kind, u = a !== null && s.start === a, f = s.value.replace(/_/g, " ");
    return /* @__PURE__ */ c.jsxs(
      "span",
      {
        className: D$,
        "data-kind": o,
        "data-active": u ? "true" : void 0,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: k$, children: Tw[o] }),
          f
        ]
      },
      `${s.start}-${i}`
    );
  });
}
var F$ = "_5o8xvy0", P$ = "_5o8xvy1", G$ = "_5o8xvy2", Y$ = "_5o8xvy3", Kf = "_5o8xvy4", K$ = "_5o8xvy5", X$ = "_3f2ar0", Q$ = "_3f2ar1", Z$ = "_3f2ar2", J$ = "_3f2ar3", W$ = "_3f2ar4", eU = "_3f2ar6", il = "_3f2ar7", ll = "_3f2ar8", ol = "_3f2ar9", px = "_3f2ara", gx = "_3f2arb";
function tU({ label: t, glyph: a = "?", children: s }) {
  const [i, o] = g.useState(!1), u = g.useRef(null), f = g.useId(), p = `${f}-content`, y = g.useCallback(() => o(!1), []);
  return g.useEffect(() => {
    if (!i) return;
    const m = (v) => {
      u.current && (v.target instanceof Node && u.current.contains(v.target) || y());
    }, b = (v) => {
      v.key === "Escape" && y();
    };
    return document.addEventListener("mousedown", m), document.addEventListener("keydown", b), () => {
      document.removeEventListener("mousedown", m), document.removeEventListener("keydown", b);
    };
  }, [i, y]), /* @__PURE__ */ c.jsxs("span", { ref: u, className: X$, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        id: f,
        className: Q$,
        "aria-expanded": i,
        "aria-controls": p,
        onClick: () => o((m) => !m),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: Z$, "aria-hidden": "true", children: a }),
          t
        ]
      }
    ),
    i && /* @__PURE__ */ c.jsx(
      "div",
      {
        id: p,
        role: "dialog",
        "aria-labelledby": f,
        className: J$,
        children: s
      }
    )
  ] });
}
var nU = "_1dxb1dg0", vx = "_1dxb1dg1", aU = "_1dxb1dg2", rU = "_1dxb1dg3", sU = "_1dxb1dg4";
function iU() {
  return /* @__PURE__ */ c.jsxs(tU, { label: "Syntax", glyph: "?", children: [
    /* @__PURE__ */ c.jsx("h3", { className: W$, children: "Script syntax" }),
    /* @__PURE__ */ c.jsxs("ul", { className: eU, children: [
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
    /* @__PURE__ */ c.jsxs("p", { className: px, children: [
      /* @__PURE__ */ c.jsx("span", { className: gx, children: "Quick mode" }),
      ": when enabled no [Char] tags are required — every line uses the deployment's default voice. Toggle it above the editor."
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: px, children: [
      /* @__PURE__ */ c.jsx("span", { className: gx, children: "Mappings" }),
      ": assign characters to voices in the Cast section below. Unmapped characters in non-quick mode trigger a pre-flight warning."
    ] })
  ] });
}
function lU() {
  return /* @__PURE__ */ c.jsxs("ul", { className: nU, children: [
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: vx, children: "[Char]" }),
      " plain line"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: vx, children: "[Char|emotion_vector:happy=0.7]" }),
      " per-line vector"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: aU, children: "[Char|qwen:warm]" }),
      " AI prompt mapping"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: rU, children: "[Char|preset:Bittersweet]" }),
      " saved preset"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: sU, children: "[Char|audio:slow_breath.wav]" }),
      " audio reference"
    ] })
  ] });
}
function oU({
  editorMode: t,
  onEditorModeChange: a,
  deployment: s,
  script: i,
  onScriptChange: o,
  rows: u,
  onRowsChange: f,
  storyText: p,
  onStoryTextChange: y,
  storyCharacters: m,
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
  const R = t === "quick", N = t === "rows", U = t === "story", Y = t === "storyboard", ae = U || Y, M = y$.find((J) => J.id === t)?.description ?? "", V = N ? u.reduce((J, P) => J + P.text.length, 0) : ae ? p.length : i.length, D = N ? u.map((J) => J.text).join(" ") : ae ? p : i, H = D.trim() ? D.trim().split(/\s+/).length : 0, Q = N ? u.filter((J) => J.text.trim().length > 0).length : (ae ? p : i).trim() ? (ae ? p : i).trim().split(/\r?\n/).filter((J) => J.trim()).length : 0;
  return /* @__PURE__ */ c.jsxs("div", { className: F$, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: `${P$} ${R ? G$ : ""}`,
        "data-quick-on": R || void 0,
        children: [
          /* @__PURE__ */ c.jsx(b$, { value: t, onChange: a }),
          R && /* @__PURE__ */ c.jsx(
            _8,
            {
              deploymentId: s.deploymentId,
              initialVoiceAssetId: S,
              onChange: w
            }
          ),
          /* @__PURE__ */ c.jsxs("div", { className: Y$, "aria-live": "polite", children: [
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Kf, children: V.toString().padStart(3, "0") }),
              " ",
              "chars"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Kf, children: Q.toString().padStart(2, "0") }),
              " ",
              "lines"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Kf, children: H.toString().padStart(3, "0") }),
              " ",
              "words"
            ] }),
            !N && /* @__PURE__ */ c.jsx(iU, {})
          ] })
        ]
      }
    ),
    /* @__PURE__ */ c.jsx("p", { className: K$, "aria-live": "polite", children: M }),
    Y ? /* @__PURE__ */ c.jsx(
      q6,
      {
        voiceAssets: C,
        presets: j,
        storyText: p,
        onStoryTextChange: y,
        mappings: v,
        onQueueChange: _,
        onJobsChange: T,
        jobProgress: O,
        deploymentId: s.deploymentId
      }
    ) : N ? /* @__PURE__ */ c.jsx(
      p$,
      {
        rows: u,
        onRowsChange: f,
        presets: j,
        mappingsByLower: v
      }
    ) : U ? /* @__PURE__ */ c.jsx(
      q$,
      {
        value: p,
        onChange: y,
        characters: m,
        presets: j,
        mappingsByLower: v
      }
    ) : /* @__PURE__ */ c.jsx(
      k8,
      {
        value: i,
        onChange: o,
        outputFormat: b,
        mappings: v,
        deploymentId: s.deploymentId,
        quickMode: R
      }
    ),
    !R && !N && !U && !Y && /* @__PURE__ */ c.jsx(lU, {})
  ] });
}
function cU({
  script: t,
  quickMode: a,
  defaultVoiceAssetId: s,
  characters: i,
  unmappedCount: o,
  globalEmotion: u,
  performance: f
}) {
  const p = [], y = t.trim();
  if (!y)
    p.push({ id: "script", status: "warn", label: "Script", detail: "empty" });
  else {
    const m = y.split(/\r?\n/).filter((b) => b.trim()).length;
    p.push({
      id: "script",
      status: "ok",
      label: "Script",
      detail: `${m} lines · ${y.length} chars`
    });
  }
  if (a ? p.push({
    id: "voice",
    status: s ? "ok" : "warn",
    label: "Quick voice",
    detail: s ? "default voice set" : "no default voice"
  }) : i.length === 0 ? p.push({ id: "cast", status: "info", label: "Cast", detail: "no characters detected" }) : o === 0 ? p.push({ id: "cast", status: "ok", label: "Cast", detail: `${i.length} mapped` }) : p.push({
    id: "cast",
    status: "warn",
    label: "Cast",
    detail: `${o} unmapped`
  }), u.mode === "qwen_template" && !u.qwenTemplate?.trim())
    p.push({ id: "emotion", status: "warn", label: "Emotion", detail: "Qwen template empty" });
  else if (u.mode === "emotion_vector") {
    const m = u.vector, b = Array.isArray(m) && m.some((v) => Math.abs(v) > 0.01);
    p.push({
      id: "emotion",
      status: b ? "ok" : "info",
      label: "Emotion",
      detail: b ? "8-axis vector" : "neutral vector"
    });
  } else u.mode === "audio_ref" ? p.push({ id: "emotion", status: "ok", label: "Emotion", detail: "audio reference" }) : p.push({ id: "emotion", status: "info", label: "Emotion", detail: "neutral" });
  return p.push({
    id: "performance",
    status: "info",
    label: "Performance",
    detail: `intensity ${Math.round(f.intensity * 100)}% · pace ${f.pace.toFixed(2)}× · pitch ${f.pitchSt >= 0 ? "+" : ""}${f.pitchSt.toFixed(1)}st`
  }), p;
}
function yx(t, a) {
  return t === "quick" ? a.script.trim().length > 0 : t === "rows" ? a.rows.some((s) => s.text.trim().length > 0 || s.character.trim().length > 0) : a.storyText.trim().length > 0;
}
function uU(t, a, s, i) {
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
    return { script: Cw(s.rows, i) };
  if (t === "rows" && a === "story") {
    const o = /* @__PURE__ */ new Map();
    for (const f of i) o.set(f.presetId, f);
    const u = [];
    for (const f of s.rows) {
      const p = f.text.trim();
      if (!p) continue;
      const y = f.character.trim(), m = f.presetId ? o.get(f.presetId) : null, b = [];
      y && b.push(`@${bx(y)}`), m && b.push(`/${bx(m.presetName)}`), b.push(p), u.push(b.join(" "));
    }
    return { storyText: u.join(`
`) };
  }
  if (t === "story" && a === "quick") {
    const o = Bc(s.storyText), u = [];
    for (const p of o)
      p.kind === "text" && u.push(p.value);
    return { script: u.join("").split(/\r?\n/).map((p) => p.replace(/[ \t]+/g, " ").trim()).filter((p) => p.length > 0).join(`
`) };
  }
  if (t === "story" && a === "rows") {
    const o = Bc(s.storyText), u = /* @__PURE__ */ new Map();
    for (const S of i) u.set(S.presetName.toLowerCase(), S);
    const f = [];
    let p = "", y = null, m = "", b = !1;
    const v = () => {
      const S = m.split(/\r?\n/).map((j) => j.replace(/[ \t]+/g, " ").trim()).filter((j) => j.length > 0);
      if (m = "", S.length === 0) return;
      const w = S[0];
      if (w !== void 0) {
        f.push({
          ...Kr(),
          character: p,
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
        b && v(), p = S.value, y = null, b = !0;
      else if (S.kind === "emotion") {
        b && v();
        const w = u.get(S.value.toLowerCase());
        y = w ? w.presetId : null, b = !0;
      } else
        m += S.value, b = !0;
    return v(), { rows: f.length > 0 ? f : [Kr()] };
  }
  return null;
}
function bx(t) {
  return t.replace(/[^\p{L}\p{N}_-]/gu, "_");
}
const Xf = [
  "#ba9eff",
  "#9093ff",
  "#ff8439",
  "#22c55e",
  "#ffd34a",
  "#ff7aa8"
], dU = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;
function fU(t) {
  const a = [];
  if (!t) return a;
  const s = t.split(/\r?\n/);
  for (let i = 0; i < s.length; i += 1) {
    const u = (s[i] ?? "").trim();
    if (u.length === 0) continue;
    const f = u.match(dU);
    if (!f || !f.groups) {
      a.push({ idx: i, character: null, text: u, override: null });
      continue;
    }
    const p = f.groups.body ?? "", y = (f.groups.rest ?? "").trim(), [m = "", ...b] = p.split("|"), v = m.trim();
    if (!v) {
      a.push({ idx: i, character: null, text: y || u, override: null });
      continue;
    }
    const S = v.split(":")[0]?.trim() || null, w = b.join("|").trim(), j = w ? hU(w) : null;
    a.push({
      idx: i,
      character: S,
      text: y,
      override: j
    });
  }
  return a;
}
function hU(t) {
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
function mU(t) {
  const a = /* @__PURE__ */ new Set(), s = [];
  for (const i of t) {
    if (!i.character) continue;
    const o = i.character.toLowerCase();
    a.has(o) || (a.add(o), s.push(i.character));
  }
  return s;
}
function pU(t) {
  const a = {};
  for (let s = 0; s < t.length; s += 1) {
    const i = t[s];
    i && (a[i] = Xf[s % Xf.length] ?? Xf[0]);
  }
  return a;
}
function gU(t) {
  const a = {};
  for (const s of t)
    s.character && (a[s.character] = (a[s.character] ?? 0) + 1);
  return a;
}
var vU = "_1snzz30", yU = "_1snzz31", bU = "_1snzz33", xU = "_1snzz34", SU = "_1snzz36", xx = "_1snzz3b", Sx = "_1snzz3c", wx = "_1snzz3d";
const wU = "ext-action-invoke", jU = "emotion-tts.run";
function EU() {
  if (typeof document > "u") return !1;
  const t = document.querySelector("emotion-tts-app");
  return t ? (t.dispatchEvent(
    new CustomEvent(wU, {
      detail: { id: jU },
      bubbles: !1
    })
  ), !0) : !1;
}
const NU = 4e3;
function CU({ visible: t, canGenerate: a }) {
  const [s, i] = g.useState(null), [o, u] = g.useState(!1), [f, p] = g.useState(!1), y = g.useRef(null), m = g.useRef(null);
  g.useEffect(() => {
    let te = !1;
    const fe = async () => {
      try {
        const ee = await yl();
        te || (y.current = ee, i(ee));
      } catch {
      }
    };
    fe();
    const k = window.setInterval(fe, NU);
    return () => {
      te = !0, window.clearInterval(k);
    };
  }, []), g.useEffect(() => pw((te) => {
    p(!!te.busy);
  }), []);
  const b = g.useCallback(() => {
    lO();
  }, []), v = s?.badge ?? "not_installed", S = v === "ready" || v === "running", w = v === "stopping", j = v === "starting" || v === "installing" || v === "stopping", C = S;
  g.useEffect(() => {
    o && m.current !== null && v !== m.current && (m.current = null, u(!1));
  }, [o, v]);
  const _ = g.useCallback(() => {
    m.current = y.current?.badge ?? "not_installed", u(!0), EU();
  }, []), T = w || o && S ? "Stopping…" : o ? "Starting…" : S ? "Stop runtime" : j ? "Runtime starting…" : "Start runtime", O = o || j, R = o || j, N = R ? "transitioning" : S ? "running" : "stopped", U = !a || f || !C, Y = C ? a ? f ? "Generating…" : "Generate" : "Add a script to generate" : "Start runtime to generate", ae = C && a && !f, M = o || j ? "busy" : S ? "ready" : "off", V = w ? "Stopping…" : o ? "Working…" : S ? "Runtime ready" : j ? "Starting…" : "Runtime off", D = M === "busy";
  if (typeof document > "u") return /* @__PURE__ */ c.jsx(c.Fragment, {});
  const H = "rgba(28, 30, 34, 0.94)", Q = "#ba9eff", J = "#8455ef", P = "#1a0a3a", ie = "#f0f0f3", A = "#aaabae", q = "#22c55e", $ = S ? "◼" : "⏻";
  return Wh.createPortal(
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: vU,
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
          background: H,
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
              className: yU,
              "data-tone": M,
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
                color: M === "ready" ? q : M === "busy" ? Q : A,
                background: "rgba(255, 255, 255, 0.04)",
                boxShadow: `inset 0 0 0 1px ${M === "ready" ? "rgba(34, 197, 94, 0.4)" : M === "busy" ? "rgba(186, 158, 255, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                whiteSpace: "nowrap"
              },
              children: [
                /* @__PURE__ */ c.jsx(
                  "span",
                  {
                    className: bU,
                    "data-pulse": D ? "true" : "false",
                    "aria-hidden": "true",
                    style: {
                      width: "6px",
                      height: "6px",
                      borderRadius: "999px",
                      background: "currentColor",
                      boxShadow: M === "ready" ? `0 0 8px ${q}` : M === "busy" ? `0 0 8px ${Q}` : "none",
                      flexShrink: 0
                    }
                  }
                ),
                V
              ]
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: Sx, children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: xU,
                "data-state": N,
                onClick: _,
                disabled: O,
                "aria-label": T,
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  border: "none",
                  borderRadius: "999px",
                  background: N === "running" ? "rgba(34, 197, 94, 0.18)" : "rgba(255, 255, 255, 0.05)",
                  color: N === "running" ? q : ie,
                  fontSize: "16px",
                  cursor: O ? "not-allowed" : "pointer",
                  opacity: O ? 0.6 : 1,
                  boxShadow: `inset 0 0 0 1px ${N === "running" ? "rgba(34, 197, 94, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                  transition: "background 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease"
                },
                children: R ? /* @__PURE__ */ c.jsx("span", { className: xx, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: $ })
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: wx, role: "tooltip", children: T })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: Sx, children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: SU,
                "data-ready": ae ? "true" : "false",
                onClick: b,
                disabled: U,
                "aria-label": Y,
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  paddingInline: "18px",
                  height: "36px",
                  border: "none",
                  borderRadius: "999px",
                  background: U ? "rgba(186, 158, 255, 0.18)" : `linear-gradient(180deg, ${Q} 0%, ${J} 100%)`,
                  color: U ? A : P,
                  fontFamily: 'var(--font-ui, "Inter", system-ui, -apple-system, sans-serif)',
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  cursor: U ? "not-allowed" : "pointer",
                  boxShadow: U ? "none" : "0 6px 20px -6px rgba(132, 85, 239, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
                  transition: "transform 160ms ease, box-shadow 160ms ease, color 160ms ease",
                  whiteSpace: "nowrap"
                },
                children: [
                  f ? /* @__PURE__ */ c.jsx("span", { className: xx, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { style: { fontSize: "11px" }, "aria-hidden": "true", children: "▶" }),
                  /* @__PURE__ */ c.jsx("span", { children: f ? "Running" : "Generate" })
                ]
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: wx, role: "tooltip", children: Y })
          ] })
        ]
      }
    ),
    document.body
  );
}
function TU(t) {
  const a = t.workflowCustomised ?? !1, s = t.unmappableFields ?? [], i = RU(t.deployment.displayName, t.deployment.deploymentId), o = vw(yw), u = t.canGenerate ?? !1;
  return /* @__PURE__ */ c.jsxs("div", { className: HR, children: [
    /* @__PURE__ */ c.jsxs("header", { className: FR, children: [
      /* @__PURE__ */ c.jsx("div", { className: GR, children: "EmotionTTS · Recipe Studio" }),
      /* @__PURE__ */ c.jsx("div", { className: PR, children: /* @__PURE__ */ c.jsx("h1", { className: YR, children: i }) }),
      /* @__PURE__ */ c.jsx("p", { className: KR, children: "Author the script, cast the voices, sculpt the emotion, and modulate every utterance — all from a single screen, with cache-bound previews and a non-destructive edit chain." }),
      t.hero
    ] }),
    a && /* @__PURE__ */ c.jsxs(kn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("strong", { children: "Workflow customised." }),
      " ",
      s.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${s.join(", ")}.`,
      " ",
      /* @__PURE__ */ c.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    t.quickActions && /* @__PURE__ */ c.jsx("div", { className: s_, "aria-label": "Quick actions", children: t.quickActions }),
    t.recentGenerations,
    /* @__PURE__ */ c.jsxs("div", { className: XR, children: [
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
    /* @__PURE__ */ c.jsx(CU, { visible: o, canGenerate: u }),
    typeof document < "u" && Wh.createPortal(
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: i_,
          "data-visible": o ? "true" : "false",
          "aria-label": "Scroll to top",
          title: "Scroll to top",
          onClick: ZO,
          children: "↑"
        }
      ),
      document.body
    )
  ] });
}
function RU(t, a) {
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
  const [f, p] = g.useState(o), y = `${s}-body`;
  return /* @__PURE__ */ c.jsxs("section", { className: QR, "aria-labelledby": s, children: [
    /* @__PURE__ */ c.jsx("header", { className: ZR, children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: e_,
        "aria-expanded": !f,
        "aria-controls": y,
        onClick: () => p((m) => !m),
        children: [
          /* @__PURE__ */ c.jsxs("span", { className: JR, children: [
            /* @__PURE__ */ c.jsx("span", { className: t_, children: t }),
            /* @__PURE__ */ c.jsx("span", { className: n_, "aria-hidden": "true", children: "/" }),
            /* @__PURE__ */ c.jsx("span", { className: a_, children: a })
          ] }),
          /* @__PURE__ */ c.jsx("h2", { id: s, className: WR, children: a }),
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: r_,
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
        className: i === "split" ? o_ : l_,
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
function _U(t) {
  try {
    const a = JSON.parse(t);
    return typeof a == "object" && a !== null ? a : {};
  } catch {
    return {};
  }
}
function MU(t) {
  const a = {};
  for (const s of Object.keys(t))
    s !== Dh && (a[s] = t[s]);
  return a;
}
function AU() {
  const { deployment: t, mappings: a, runs: s, workflow: i } = Rl(), [o, u] = g.useState(a), [f, p] = g.useState([]), [y, m] = g.useState([]), [b, v] = g.useState(null), [S, w] = g.useState(Kc), j = g.useMemo(
    () => t.defaultGenerationOverridesJson ? _U(t.defaultGenerationOverridesJson) : {},
    [t.defaultGenerationOverridesJson]
  ), C = g.useMemo(() => {
    const he = j[Dh];
    return typeof he == "object" && he !== null ? he : {};
  }, [j]), [_, T] = g.useState(""), [O, R] = g.useState(
    t.defaultOutputFormat ?? "mp3"
  ), [N, U] = g.useState(t.defaultSpeedFactor ?? 1), [Y, ae] = g.useState({
    mode: "none",
    emotionAlpha: 1
  }), [M, V] = g.useState(() => ({
    temperature: 0.8,
    top_p: 0.8,
    seed: 42,
    ...MU(j)
  })), [D, H] = g.useState(() => {
    const he = C.cachePolicy;
    return he === "use_cache" || he === "force_regenerate" || he === "read_only_cache" ? he : "force_regenerate";
  }), [Q, J] = g.useState(
    t.defaultVoiceAssetId ?? null
  ), [P, ie] = g.useState(() => {
    const he = C.editorMode;
    return he === "quick" || he === "rows" || he === "story" || he === "storyboard" ? he : typeof C.quickMode == "boolean" || t.defaultVoiceAssetId != null ? "quick" : "rows";
  }), A = P === "quick", [q, $] = g.useState(() => [Kr()]), te = 1e5, [fe, k] = g.useState(() => {
    const he = C.storyText;
    return typeof he == "string" ? he : "";
  }), ee = g.useRef(!1), re = g.useCallback((he) => {
    he.length > te && !ee.current && (ee.current = !0, yn.error(
      `Story text is over ${Math.round(te / 1e3)} KB — large scripts may slow down save and rendering.`
    )), he.length <= te && (ee.current = !1), k(he);
  }, []), [G, B] = g.useState(Pk), [W, ce] = g.useState([]), [ye, Ae] = g.useState([]), [lt, Ne] = g.useState(
    () => /* @__PURE__ */ new Map()
  ), We = g.useRef(_), Be = g.useRef(q), Fe = g.useRef(fe), rn = g.useRef(y);
  g.useEffect(() => {
    We.current = _;
  }, [_]), g.useEffect(() => {
    Be.current = q;
  }, [q]), g.useEffect(() => {
    Fe.current = fe;
  }, [fe]), g.useEffect(() => {
    rn.current = y;
  }, [y]);
  const [qt, Mt] = g.useState(""), Ce = g.useCallback(
    (he) => {
      ie((Te) => {
        if (he === Te) return Te;
        const ge = {
          script: We.current,
          rows: Be.current,
          storyText: Fe.current
        }, xe = yx(he, ge), K = yx(Te, ge);
        if (!xe && K) {
          const ue = uU(Te, he, ge, rn.current);
          if (ue) {
            const Re = { ...ge }, _e = document.activeElement;
            ue.script !== void 0 && T(ue.script), ue.rows !== void 0 && $(ue.rows), ue.storyText !== void 0 && re(ue.storyText);
            const Ke = {
              quick: "Quick",
              rows: "Per-character",
              story: "Story",
              storyboard: "Storyboard"
            }, Dt = (ve) => ve.split(/\r?\n/).filter((be) => be.trim().length > 0).length, gt = ue.rows !== void 0 ? ue.rows.length : ue.script !== void 0 ? Dt(ue.script) : ue.storyText !== void 0 ? Dt(ue.storyText) : 0, z = gt === 1 ? "line" : "lines", F = gt > 0 ? ` (${gt} ${z})` : "", Z = `Switched to ${Ke[he]} mode${gt > 0 ? `, ${gt} ${z}` : ""}.`;
            Mt((ve) => ve === Z ? `${Z}​` : Z), mn(`Switched to ${Ke[he]}${F} — content kept`, {
              action: {
                label: "Undo",
                onClick: () => {
                  T(Re.script), $([...Re.rows]), re(Re.storyText), ie(Te), _e && typeof _e.focus == "function" && requestAnimationFrame(() => _e.focus());
                }
              },
              duration: 5e3
            });
          }
        }
        return he;
      });
    },
    [re]
  );
  g.useEffect(() => {
    let he = !1;
    return Zs(t.deploymentId).then((Te) => {
      he || p(Te.voiceAssets);
    }).catch(() => {
    }), jM(t.deploymentId).then((Te) => {
      he || m(
        [...Te.presets].sort((ge, xe) => xe.updatedAt - ge.updatedAt)
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
      const Te = {
        ...M,
        [Dh]: {
          editorMode: P,
          quickMode: A,
          cachePolicy: D,
          storyText: fe
        }
      };
      _t(`/deployments/${t.deploymentId}`, {
        method: "PATCH",
        body: JSON.stringify({
          defaultOutputFormat: O,
          defaultSpeedFactor: N,
          defaultGenerationOverrides: Te
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
  const at = g.useMemo(() => P === "rows" ? Cw(q, y) : P === "story" ? fe : _, [P, q, y, _, fe]), xt = g.useMemo(() => fU(at), [at]), ot = g.useMemo(() => {
    if (P !== "story") return mU(xt);
    const he = /* @__PURE__ */ new Set(), Te = [];
    for (const ge of Bc(fe))
      ge.kind === "character" && (he.has(ge.value) || (he.add(ge.value), Te.push(ge.value)));
    return Te;
  }, [P, xt, fe]), Ye = g.useMemo(() => {
    const he = new Set(ot.map((ge) => ge.toLowerCase())), Te = [...ot];
    for (const ge of o) {
      if (!ge.isActive) continue;
      const xe = ge.characterName.toLowerCase();
      he.has(xe) || (he.add(xe), Te.push(ge.characterName));
    }
    return Te;
  }, [ot, o]), pt = g.useMemo(() => pU(Ye), [Ye]), je = g.useMemo(() => gU(xt), [xt]), ke = g.useMemo(() => {
    const he = /* @__PURE__ */ new Map();
    for (const Te of o)
      he.set(Te.characterName.toLowerCase(), Te);
    return he;
  }, [o]), Pe = g.useMemo(() => A && Q ? 0 : Ye.filter((he) => !ke.has(he.toLowerCase())).length, [Ye, ke, A, Q]), Xe = g.useCallback(
    async (he, Te) => {
      const ge = ke.get(he.toLowerCase());
      try {
        if (ge) {
          const xe = await Ys(t.deploymentId, ge.mappingId, Te);
          u(
            (K) => K.map((ue) => ue.mappingId === xe.mappingId ? xe : ue)
          ), yn.success(`Updated mapping for ${ge.characterName}`);
        } else if (Te.speakerVoiceAssetId) {
          const xe = await Zh(t.deploymentId, {
            ...Te,
            characterName: he,
            speakerVoiceAssetId: Te.speakerVoiceAssetId
          });
          u((K) => [...K, xe]), yn.success(`Mapped ${he} to voice`);
        }
      } catch (xe) {
        yn.error(xe instanceof Error ? xe.message : "mapping failed");
      }
    },
    [ke, t.deploymentId]
  ), St = g.useCallback(
    async (he, Te) => {
      const ge = Te.trim(), xe = ke.get(he.toLowerCase());
      if (!(!xe || !ge || ge === xe.characterName))
        try {
          const K = await Ys(t.deploymentId, xe.mappingId, {
            characterName: ge
          });
          u(
            (ue) => ue.map((Re) => Re.mappingId === K.mappingId ? K : Re)
          ), yn.success(`Renamed character to ${ge}`);
        } catch (K) {
          yn.error(K instanceof Error ? K.message : "rename failed");
        }
    },
    [ke, t.deploymentId]
  ), Ct = g.useCallback(
    async (he) => {
      const Te = ke.get(he.toLowerCase());
      if (Te)
        try {
          await C1(t.deploymentId, Te.mappingId), u((ge) => ge.filter((xe) => xe.mappingId !== Te.mappingId)), yn.success(`Cleared mapping for ${he}`);
        } catch (ge) {
          yn.error(ge instanceof Error ? ge.message : "clear failed");
        }
    },
    [ke, t.deploymentId]
  ), zn = g.useCallback(
    async (he, Te) => {
      try {
        const ge = await Tc(
          t.deploymentId,
          Te,
          Te.name.replace(/\.[^.]+$/, ""),
          "speaker"
        );
        p((xe) => [ge, ...xe]), await Xe(he, { speakerVoiceAssetId: ge.voiceAssetId });
      } catch (ge) {
        yn.error(ge instanceof Error ? ge.message : "upload failed");
      }
    },
    [t.deploymentId, Xe]
  ), Sn = g.useCallback(
    (he, Te) => {
      Xe(Te, { speakerVoiceAssetId: he.voiceAssetId });
    },
    [Xe]
  ), pn = g.useCallback((he) => {
    w(he);
  }, []), Pt = g.useMemo(() => {
    const he = [], Te = /* @__PURE__ */ new Set();
    for (const ge of o) {
      const xe = ge.speakerVoiceAssetId;
      if (!xe || Te.has(xe)) continue;
      Te.add(xe);
      const ue = f.find((Re) => Re.voiceAssetId === xe)?.displayName ?? `${ge.characterName} · ${xe.slice(0, 8)}`;
      he.push({ kind: "voice_asset", id: xe, label: ue });
    }
    for (const ge of f)
      Te.has(ge.voiceAssetId) || (Te.add(ge.voiceAssetId), he.push({ kind: "voice_asset", id: ge.voiceAssetId, label: ge.displayName }));
    return he;
  }, [o, f]), kt = g.useCallback(
    async (he, Te) => {
      if (he.kind !== "voice_asset") {
        yn.error("Targeted revert is only supported for voice assets in v1.");
        return;
      }
      let ge;
      try {
        const xe = JSON.parse(Te);
        if (typeof xe != "object" || xe === null || xe.version !== 1 || !Array.isArray(xe.ops))
          throw new Error("snapshot is not a valid EditChain");
        ge = xe;
      } catch (xe) {
        yn.error(
          xe instanceof Error ? `Audit snapshot is malformed: ${xe.message}` : "Audit snapshot is malformed; cannot revert."
        );
        return;
      }
      try {
        const xe = await _1(he.id, t.deploymentId, {
          chain: ge
        }), K = o.filter((ue) => ue.speakerVoiceAssetId === he.id);
        await Promise.all(
          K.map(
            (ue) => Ys(t.deploymentId, ue.mappingId, {
              voiceAssetChainDigest: xe.chain_digest
            }).catch(() => null)
          )
        ), u(
          (ue) => ue.map(
            (Re) => Re.speakerVoiceAssetId === he.id ? { ...Re, voiceAssetChainDigest: xe.chain_digest } : Re
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
        await BR(he.id, t.deploymentId);
        const Te = o.filter((ge) => ge.speakerVoiceAssetId === he.id);
        await Promise.all(
          Te.map(
            (ge) => Ys(t.deploymentId, ge.mappingId, {
              voiceAssetChainDigest: null
            }).catch(() => null)
          )
        ), u(
          (ge) => ge.map(
            (xe) => xe.speakerVoiceAssetId === he.id ? { ...xe, voiceAssetChainDigest: null } : xe
          )
        ), yn.success(`Cleared edit chain on ${he.label}`);
      } catch (Te) {
        yn.error(Te instanceof Error ? Te.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), sa = g.useMemo(
    () => ({
      script: at,
      parserMode: P === "quick" ? "raw_text" : P === "story" ? "story" : "dialogue",
      outputFormat: O,
      speedFactor: N,
      globalEmotion: { ...Y, emotionAlpha: G.intensity },
      generation: M,
      cachePolicy: D,
      ...P === "storyboard" && W.length > 0 ? {
        prebuiltSegments: W.map(
          (he) => he.emotion ? { ...he, emotion: { ...he.emotion, emotionAlpha: G.intensity } } : he
        )
      } : {}
    }),
    [at, P, O, N, G.intensity, Y, M, D, W]
  ), wn = g.useMemo(
    () => cU({
      script: at,
      quickMode: A,
      defaultVoiceAssetId: Q,
      characters: Ye,
      unmappedCount: Pe,
      globalEmotion: Y,
      performance: G
    }),
    [at, A, Q, Ye, Pe, Y, G]
  ), cn = g.useMemo(
    () => wn.filter((he) => he.id !== "performance").map((he) => ({
      label: he.label,
      status: he.status === "ok" ? "ok" : he.status === "warn" ? "warn" : "ok",
      detail: he.detail
    })),
    [wn]
  ), En = P === "storyboard" && W.length > 0, It = at.trim().length > 0 || En;
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsx($R, { position: "bottom-right", richColors: !0, theme: "dark" }),
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
      TU,
      {
        deployment: t,
        canGenerate: It,
        workflowCustomised: i.workflow.customised,
        unmappableFields: i.unmappableFields,
        hero: /* @__PURE__ */ c.jsx(h2, { deployment: t }),
        quickActions: /* @__PURE__ */ c.jsx(
          CL,
          {
            deploymentId: t.deploymentId,
            createPayload: sa,
            canGenerate: It,
            diagnostics: cn,
            storyboardJobs: P === "storyboard" ? ye : void 0,
            onJobProgressChange: Ne
          }
        ),
        recentGenerations: /* @__PURE__ */ c.jsx(
          UO,
          {
            deploymentId: t.deploymentId,
            speedFactor: N
          }
        ),
        scriptSection: /* @__PURE__ */ c.jsx(
          oU,
          {
            editorMode: P,
            onEditorModeChange: Ce,
            deployment: t,
            script: _,
            onScriptChange: T,
            rows: q,
            onRowsChange: $,
            storyText: fe,
            onStoryTextChange: re,
            storyCharacters: Ye,
            outputFormat: O,
            mappingsByLower: ke,
            defaultVoiceAssetId: Q,
            onDefaultVoiceAssetIdChange: J,
            presets: y,
            voiceAssets: f,
            onQueueChange: ce,
            onStoryboardJobsChange: Ae,
            jobProgress: P === "storyboard" ? lt : void 0
          }
        ),
        parsedDialogueSection: /* @__PURE__ */ c.jsx(Lk, { lines: xt, characterColors: pt }),
        voiceLibrarySection: /* @__PURE__ */ c.jsx(
          wM,
          {
            deploymentId: t.deploymentId,
            voiceAssets: f,
            mappings: o,
            characterColors: pt,
            onVoiceAssetsChange: p,
            onCreateCharacterFromVoice: Sn
          }
        ),
        castSection: /* @__PURE__ */ c.jsx(s2, { unmappedCount: Pe, totalCount: Ye.length, children: Ye.map((he) => {
          const Te = ke.get(he.toLowerCase()) ?? null, ge = pt[he] ?? "#ba9eff";
          return /* @__PURE__ */ c.jsx("li", { className: b_, children: /* @__PURE__ */ c.jsx(
            r2,
            {
              characterName: he,
              color: ge,
              lineCount: je[he] ?? 0,
              mapping: Te,
              voiceAssets: f,
              presets: y,
              active: b === he,
              onToggle: () => v((xe) => xe === he ? null : he),
              onAssignVoiceAsset: (xe) => Xe(he, { speakerVoiceAssetId: xe }),
              onAssignPreset: (xe) => Xe(he, { defaultVectorPresetId: xe }),
              onUploadFile: (xe) => zn(he, xe),
              onClearMapping: () => Ct(he),
              onRename: (xe) => St(he, xe)
            }
          ) }, he);
        }) }),
        emotionSection: /* @__PURE__ */ c.jsx(
          lk,
          {
            value: Y,
            onChange: ae,
            deploymentId: t.deploymentId,
            presets: y,
            onPresetsChange: m
          }
        ),
        performanceSection: /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
          /* @__PURE__ */ c.jsx(
            Gk,
            {
              value: { ...G, pace: N },
              onChange: (he) => {
                B(he), he.pace !== N && U(he.pace);
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
          /* @__PURE__ */ c.jsx(a5, { checks: wn }),
          /* @__PURE__ */ c.jsx(
            Ck,
            {
              outputFormat: O,
              onOutputFormatChange: R,
              speedFactor: N,
              onSpeedFactorChange: U,
              cachePolicy: D,
              onCachePolicyChange: H,
              generation: M,
              onGenerationChange: V
            }
          )
        ] }),
        recentRunsSection: /* @__PURE__ */ c.jsx(u5, { runs: s, deploymentId: t.deploymentId }),
        auditSection: /* @__PURE__ */ c.jsx(
          BM,
          {
            deploymentId: t.deploymentId,
            targets: Pt,
            onRevertToIdentity: Bt,
            onRevertToChain: kt
          }
        )
      }
    )
  ] });
}
const jx = /* @__PURE__ */ new Map();
function kU(t, a) {
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
    const o = `${t}::${a}`, u = jx.get(o);
    if (u) {
      i({ peaks: u, isLoading: !1, error: null });
      return;
    }
    const f = new AbortController();
    return i({ peaks: null, isLoading: !0, error: null }), DU(t, a, f.signal).then((p) => {
      f.signal.aborted || (jx.set(o, p), i({ peaks: p, isLoading: !1, error: null }));
    }).catch((p) => {
      if (f.signal.aborted) return;
      const y = p instanceof Error ? p.message : "decode failed";
      i({ peaks: null, isLoading: !1, error: y });
    }), () => f.abort();
  }, [t, a]), s;
}
async function DU(t, a, s) {
  const i = await fetch(t, { signal: s });
  if (!i.ok) throw new Error(`failed to load audio (${i.status})`);
  const o = await i.arrayBuffer();
  if (s.aborted) throw new DOMException("aborted", "AbortError");
  const f = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return zU(f, a);
}
function zU(t, a) {
  const s = t.numberOfChannels, i = t.length, o = Math.max(1, Math.floor(i / a)), u = new Float32Array(a), f = [];
  for (let p = 0; p < s; p += 1) f.push(t.getChannelData(p));
  for (let p = 0; p < a; p += 1) {
    const y = p * o, m = Math.min(i, y + o);
    let b = 0;
    for (let v = y; v < m; v += 1) {
      let S = 0;
      for (let j = 0; j < s; j += 1) {
        const C = f[j];
        C && (S += Math.abs(C[v] ?? 0));
      }
      const w = S / s;
      w > b && (b = w);
    }
    u[p] = b;
  }
  return u;
}
const Ex = "(prefers-reduced-motion: reduce)";
function OU() {
  const [t, a] = g.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(Ex).matches);
  return g.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const s = window.matchMedia(Ex), i = (o) => a(o.matches);
    return s.addEventListener("change", i), () => s.removeEventListener("change", i);
  }, []), t;
}
var LU = "mquzal0", $U = "mquzal1", Nx = "mquzal2", Cx = "mquzal3", Tx = "mquzal4", UU = "mquzal5", Rx = "mquzal6", _x = "mquzal7";
const BU = 120, IU = 720;
function Mw(t) {
  const {
    audioUrl: a,
    durationMs: s,
    startMs: i,
    endMs: o,
    onChangeStart: u,
    onChangeEnd: f,
    isPlaying: p = !1,
    playbackPositionMs: y = 0,
    onSeek: m,
    width: b = IU,
    height: v = BU
  } = t, S = g.useRef(null), w = g.useRef(null), j = g.useRef(null), C = kU(a, b), _ = OU();
  g.useEffect(() => {
    VU(S.current, C.peaks, b, v);
  }, [C.peaks, b, v]);
  const T = g.useCallback(
    (M) => {
      const V = w.current?.getBoundingClientRect();
      if (!V || V.width <= 0) return 0;
      const D = Math.max(0, Math.min(1, (M - V.left) / V.width));
      return Math.round(D * s);
    },
    [s]
  );
  g.useEffect(() => {
    const M = (D) => {
      if (!j.current) return;
      const H = T(D.clientX);
      j.current === "start" ? u(cc(H, 0, o - 1)) : f(cc(H, i + 1, s));
    }, V = () => {
      j.current = null;
    };
    return window.addEventListener("pointermove", M), window.addEventListener("pointerup", V), () => {
      window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", V);
    };
  }, [T, s, o, i, u, f]);
  const O = (M) => (V) => {
    V.preventDefault(), V.stopPropagation(), j.current = M;
  }, R = (M) => {
    !m || M.target.closest("[data-handle]") || m(T(M.clientX));
  }, N = (M) => (V) => {
    const D = V.shiftKey ? 100 : V.ctrlKey ? 1 : 10;
    let H = 0;
    if (V.key === "ArrowLeft") H = -D;
    else if (V.key === "ArrowRight") H = D;
    else return;
    V.preventDefault(), M === "start" ? u(cc(i + H, 0, o - 1)) : f(cc(o + H, i + 1, s));
  }, U = Qf(i, s), Y = Qf(o, s), ae = Qf(y, s);
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: w,
      className: LU,
      style: { height: v },
      onPointerDown: R,
      children: [
        /* @__PURE__ */ c.jsx(
          "canvas",
          {
            ref: S,
            width: b,
            height: v,
            className: $U,
            "aria-label": "Audio waveform"
          }
        ),
        C.isLoading && /* @__PURE__ */ c.jsx("div", { className: _x, children: "Decoding waveform…" }),
        C.error && /* @__PURE__ */ c.jsx("div", { className: _x, role: "alert", children: C.error }),
        /* @__PURE__ */ c.jsx("div", { className: Rx, style: { left: 0, width: `${U}%` } }),
        /* @__PURE__ */ c.jsx(
          "div",
          {
            className: Rx,
            style: { left: `${Y}%`, right: 0, width: `${100 - Y}%` }
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: Nx,
            style: { left: `${U}%` },
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
              /* @__PURE__ */ c.jsx("span", { className: Cx, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: Tx, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: Nx,
            style: { left: `${Y}%` },
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
              /* @__PURE__ */ c.jsx("span", { className: Cx, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: Tx, "aria-hidden": "true" })
            ]
          }
        ),
        p && /* @__PURE__ */ c.jsx(
          "div",
          {
            className: UU,
            style: {
              left: `${ae}%`,
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
function VU(t, a, s, i) {
  if (!t) return;
  const o = t.getContext("2d");
  if (!o || (o.clearRect(0, 0, s, i), !a || a.length === 0)) return;
  const u = i / 2;
  o.fillStyle = qU(t, "--color-primary", "#ba9eff");
  const f = Math.min(a.length, s);
  for (let p = 0; p < f; p += 1) {
    const y = a[p] ?? 0, m = Math.max(1, y * (i - 4));
    o.fillRect(p, u - m / 2, 1, m);
  }
}
function qU(t, a, s) {
  return getComputedStyle(t).getPropertyValue(a).trim() || s;
}
var HU = "r8lfsm0", FU = "r8lfsm1", PU = "r8lfsm2", GU = "r8lfsm3", YU = "r8lfsm4", KU = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, XU = "_1b1zchy3", QU = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, ZU = "_1b1zchy6", JU = "_1b1zchy7";
const Aw = g.createContext("standalone");
function kw({
  variant: t = "standalone",
  children: a,
  className: s,
  style: i,
  ...o
}) {
  const u = [KU[t], s].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(Aw.Provider, { value: t, children: /* @__PURE__ */ c.jsx("div", { className: u, style: i, ...o, children: a }) });
}
function Dw({
  title: t,
  meta: a,
  children: s,
  className: i,
  titleId: o
}) {
  const u = g.useContext(Aw), f = [XU, i].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsxs("div", { className: f, children: [
    /* @__PURE__ */ c.jsx("h3", { id: o, className: QU[u], children: t }),
    a ? /* @__PURE__ */ c.jsx("span", { className: ZU, children: a }) : null,
    s
  ] });
}
function zw({
  children: t,
  className: a,
  role: s = "group"
}) {
  const i = [JU, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: i, role: s, children: t });
}
const Mx = -16, WU = 80, eB = 720;
function tB(t) {
  const { deploymentId: a, runId: s, utterance: i, audioUrl: o, onApplied: u, onError: f, onCancel: p } = t, y = i.durationMs ?? 0, [m, b] = g.useState(() => Ax(y)), [v, S] = g.useState(Kc), [w, j] = g.useState(!1), [C, _] = g.useState(!1), [T, O] = g.useState(null), [R, N] = g.useState(!1), U = g.useRef(null), Y = g.useRef(null), ae = g.useRef(null);
  g.useEffect(() => {
    const $ = Ax(y);
    b($), S(H1($)), _(!1), O(null), ae.current = null;
  }, [i.utteranceId, y]);
  const M = g.useCallback(($) => {
    S($), b((te) => q1(te, $));
  }, []);
  g.useEffect(() => () => Y.current?.abort(), []), g.useEffect(() => {
    U.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [i.utteranceId]);
  const V = g.useCallback(
    ($) => {
      $.key === "Escape" && ($.stopPropagation(), p());
    },
    [p]
  ), D = g.useMemo(
    () => m.ops.find(($) => $.mode === "trim"),
    [m.ops]
  ), H = D?.start_ms ?? 0, Q = D?.end_ms ?? Math.max(1, y), J = g.useCallback(($, te) => {
    b((fe) => nB(fe, "trim", (k) => ({
      ...k,
      mode: "trim",
      start_ms: Math.max(0, Math.floor($)),
      end_ms: Math.max(Math.floor($) + 1, Math.floor(te))
    })));
  }, []), P = g.useCallback(($) => J($, Q), [Q, J]), ie = g.useCallback(($) => J(H, $), [H, J]), A = g.useCallback(($) => {
    _($), b((te) => {
      const fe = te.ops.filter((k) => k.mode !== "normalize");
      if ($) {
        const k = {
          id: Dn(),
          mode: "normalize",
          target_lufs: Mx
        };
        return { ...te, ops: [...fe, k] };
      }
      return { ...te, ops: fe };
    });
  }, []), q = g.useCallback(async () => {
    const $ = M1(m, y);
    if ($) {
      O($.message);
      return;
    }
    if (O(null), R) return;
    Y.current?.abort();
    const te = new AbortController();
    Y.current = te, N(!0);
    try {
      const fe = ae.current ?? void 0, k = await UR(
        a,
        s,
        i.utteranceId,
        fe ? { chain: m, digest_before: fe } : { chain: m },
        { signal: te.signal }
      );
      if (te.signal.aborted) return;
      ae.current = k.chain_digest, u(k);
    } catch (fe) {
      if (te.signal.aborted) return;
      fe instanceof Js && (ae.current = fe.currentDigest || null);
      const k = fe instanceof Js ? "Edit chain has changed in another tab. Reload to continue." : fe instanceof Error ? fe.message : "apply failed";
      O(k), f(k);
    } finally {
      te.signal.aborted || N(!1);
    }
  }, [m, y, R, a, s, i.utteranceId, u, f]);
  return /* @__PURE__ */ c.jsx(kw, { variant: "nested", children: /* @__PURE__ */ c.jsxs("div", { ref: U, onKeyDown: V, children: [
    /* @__PURE__ */ c.jsx(Dw, { title: "Edit segment", meta: `Source · ${uc(y)}` }),
    /* @__PURE__ */ c.jsx(
      Mw,
      {
        audioUrl: o,
        durationMs: Math.max(1, y),
        startMs: H,
        endMs: Q,
        onChangeStart: P,
        onChangeEnd: ie,
        height: WU,
        width: eB
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: HU, children: [
      /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ c.jsxs("span", { className: FU, children: [
        uc(H),
        " → ",
        uc(Q),
        " · ",
        uc(Q - H)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: PU, children: [
      /* @__PURE__ */ c.jsxs("label", { className: GU, children: [
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
          Mx.toFixed(0),
          " LUFS (broadcast-friendly)"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: YU,
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
    /* @__PURE__ */ c.jsxs(zw, { children: [
      /* @__PURE__ */ c.jsx(Ze, { size: "sm", onClick: () => void q(), disabled: R, children: R ? "Applying…" : "Apply" }),
      /* @__PURE__ */ c.jsx(Ze, { variant: "ghost", size: "sm", onClick: p, disabled: R, children: "Cancel" })
    ] }),
    T && /* @__PURE__ */ c.jsx(kn, { severity: "error", children: T })
  ] }) });
}
function Ax(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Dn(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function nB(t, a, s) {
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
var aB = "jq2zyb2", rB = "jq2zyb3", sB = "jq2zyb4", iB = "jq2zyb5", lB = "jq2zyb6", oB = "jq2zyb7", cB = "jq2zyb8", uB = "jq2zyb9", dB = "jq2zyba", fB = "jq2zybb", hB = "jq2zybc", mB = "jq2zybd", pB = "jq2zybe", gB = "jq2zybf jq2zybe", vB = "jq2zybg", yB = "jq2zybh", bB = "jq2zybi", xB = "jq2zybj", SB = "jq2zybk", wB = "jq2zybl", jB = "jq2zybm", EB = "jq2zybn", NB = "jq2zybo", CB = "jq2zybp", TB = "jq2zybq", RB = "jq2zybr", _B = "jq2zybs", MB = "jq2zybt", AB = "jq2zybu", kB = "jq2zybv", DB = "jq2zybw", zB = "jq2zybx", OB = "jq2zyby", kx = "jq2zybz", LB = "jq2zyb10", $B = "jq2zyb11", UB = "jq2zyb12";
const BB = ["cancelled", "failed", "partial"], IB = 2600;
function VB() {
  const { run: t } = Rl(), a = ni(), [s, i] = g.useState(t), [o, u] = g.useState(!1), [f, p] = g.useState(null), [y, m] = g.useState(null), [b, v] = g.useState(
    null
  );
  g.useEffect(() => {
    i(t);
  }, [t]), g.useEffect(() => {
    if (!b) return;
    const N = setTimeout(() => v(null), IB);
    return () => clearTimeout(N);
  }, [b]);
  const S = g.useMemo(() => FB(s), [s]), w = BB.includes(s.status) && s.kind === "batch", j = (s.exportZipStaleAt ?? null) !== null, C = async () => {
    if (s.deploymentId) {
      u(!0), p(null);
      try {
        const { runId: N } = await R1(s.deploymentId, s.runId);
        a(`/${s.deploymentId}/runs/${N}`);
      } catch (N) {
        p(YB(N));
      } finally {
        u(!1);
      }
    }
  }, _ = g.useCallback((N) => {
    m((U) => U === N ? null : N);
  }, []), T = g.useCallback(() => {
    m(null);
  }, []), O = (N, U) => {
    i((Y) => HB(Y, N, U)), m(null), v({ message: "Segment edited", severity: "success" });
  }, R = g.useCallback((N) => {
    v({ message: N, severity: "error" });
  }, []);
  return /* @__PURE__ */ c.jsxs("main", { className: aB, children: [
    /* @__PURE__ */ c.jsxs("div", { className: rB, children: [
      /* @__PURE__ */ c.jsxs("header", { className: sB, children: [
        /* @__PURE__ */ c.jsxs("p", { className: iB, children: [
          s.deploymentId ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            /* @__PURE__ */ c.jsx(Qh, { to: `/${s.deploymentId}/recipe`, className: lB, children: "← Back to recipe" }),
            /* @__PURE__ */ c.jsx("span", { className: oB, children: "·" })
          ] }) : null,
          /* @__PURE__ */ c.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: cB, children: [
          /* @__PURE__ */ c.jsxs("h1", { className: uB, children: [
            PB(s.kind),
            /* @__PURE__ */ c.jsx("span", { className: dB, children: s.runId })
          ] }),
          /* @__PURE__ */ c.jsx(Er, { size: "md", tone: KB(s.status), pulse: s.status === "running", children: s.status })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("section", { className: fB, "aria-label": "Run statistics", children: [
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
      w && /* @__PURE__ */ c.jsxs("section", { className: yB, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ c.jsxs("div", { className: bB, children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-resume-title", className: xB, children: S.failed > 0 ? `${S.failed} line${S.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ c.jsx("p", { className: SB, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ c.jsx(Ze, { size: "lg", disabled: o, onClick: () => void C(), children: o ? "Resuming…" : S.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        f && /* @__PURE__ */ c.jsx("p", { className: wB, role: "alert", children: f })
      ] }),
      /* @__PURE__ */ c.jsxs(Ia, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ c.jsxs(FT, { children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-utterances", className: Jr, children: "01 / Utterances" }),
          S.completed > 0 && /* @__PURE__ */ c.jsxs("span", { className: jB, children: [
            /* @__PURE__ */ c.jsx("span", { className: EB, children: S.cached }),
            "/",
            S.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("ul", { className: NB, children: s.utterances.map((N) => {
          const U = y === N.utteranceId, Y = N.status === "completed" && N.audioArtifactRef !== null && N.audioArtifactRef !== void 0, ae = N.derivedArtifactRef ?? N.audioArtifactRef ?? null, M = ae ? `/api/v1/artifacts/${encodeURIComponent(ae)}/download` : "", V = (N.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ c.jsxs("li", { className: TB, children: [
            /* @__PURE__ */ c.jsxs("div", { className: CB, children: [
              /* @__PURE__ */ c.jsxs("span", { className: _B, children: [
                "#",
                N.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: MB, title: N.characterDisplay, children: N.characterDisplay }),
              /* @__PURE__ */ c.jsx("span", { className: AB, title: N.text, children: N.text }),
              /* @__PURE__ */ c.jsxs("span", { className: kB, children: [
                N.cacheHit && /* @__PURE__ */ c.jsx("span", { className: DB, children: "cached" }),
                V && /* @__PURE__ */ c.jsx("span", { className: RB, children: "edited" }),
                N.durationMs ? /* @__PURE__ */ c.jsx("span", { children: GB(N.durationMs) }) : null,
                /* @__PURE__ */ c.jsx(Er, { tone: XB(N.status), children: N.status }),
                Y && /* @__PURE__ */ c.jsx(
                  Ze,
                  {
                    variant: "ghost",
                    size: "xs",
                    onClick: () => _(N.utteranceId),
                    "aria-expanded": U,
                    "aria-label": U ? "Close segment editor" : "Edit segment",
                    children: U ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            U && M && s.deploymentId && /* @__PURE__ */ c.jsx(
              tB,
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
      qB(s, j)
    ] }),
    b && /* @__PURE__ */ c.jsx(
      "div",
      {
        className: UB,
        role: b.severity === "error" ? "alert" : "status",
        "aria-live": b.severity === "error" ? "assertive" : "polite",
        children: b.message
      }
    )
  ] });
}
function qB(t, a) {
  if (!t.exportArtifactRef && !a) return null;
  const i = !!t.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ c.jsx("div", { className: zB, children: a ? /* @__PURE__ */ c.jsxs("div", { className: LB, children: [
    /* @__PURE__ */ c.jsx("p", { className: $B, children: i }),
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
          /* @__PURE__ */ c.jsx("span", { className: kx, children: "↻" })
        ]
      }
    )
  ] }) : t.exportArtifactRef ? /* @__PURE__ */ c.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${t.exportArtifactRef}/download`,
      download: !0,
      className: OB,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ c.jsx("span", { className: kx, children: "↓" })
      ]
    }
  ) : null });
}
function HB(t, a, s) {
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
      className: hB,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: mB, children: t }),
        /* @__PURE__ */ c.jsx("span", { className: s ? gB : pB, children: a }),
        o !== void 0 && /* @__PURE__ */ c.jsx("span", { className: vB, "aria-hidden": "true" })
      ]
    }
  );
}
function FB(t) {
  const a = t.utterances.length, s = t.utterances.filter((f) => f.status === "completed").length, i = t.utterances.filter(
    (f) => f.status === "failed" || f.status === "cancelled"
  ).length, o = t.utterances.filter((f) => f.cacheHit).length, u = s > 0 ? Math.round(o / s * 100) : 0;
  return { total: a, completed: s, failed: i, cached: o, cacheRatio: u };
}
function PB(t) {
  switch (t) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function GB(t) {
  return t < 1e3 ? `${t} ms` : `${(t / 1e3).toFixed(t < 1e4 ? 2 : 1)} s`;
}
function YB(t) {
  return t instanceof ai ? `${t.category}: ${t.message}` : t instanceof Error ? t.message : "Unexpected error";
}
function KB(t) {
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
function XB(t) {
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
var QB = "pcphqj2", ZB = "pcphqj3", JB = "pcphqj4", WB = "pcphqj5", e9 = "pcphqj6", t9 = "pcphqj7", n9 = "pcphqj8", a9 = "pcphqj9", r9 = "pcphqja", Dx = "pcphqjb", s9 = "pcphqjc", i9 = "pcphqjd", l9 = "pcphqje pcphqjd", o9 = "pcphqjf", c9 = "pcphqjg", u9 = "pcphqjh", d9 = "pcphqji", f9 = "pcphqjj pcphqji", h9 = "pcphqjk pcphqji", m9 = "pcphqjl pcphqji", p9 = "pcphqjm", Zf = "pcphqjn", Jf = "pcphqjo";
function g9() {
  const [t, a] = g.useState(null), [s, i] = g.useState(null);
  return g.useEffect(() => {
    let o = !1;
    const u = async () => {
      try {
        const p = await _t("/runtime/queue");
        o || (a(p.entries), i(null));
      } catch (p) {
        o || i(p instanceof Error ? p.message : "Unknown error");
      }
    };
    u();
    const f = setInterval(() => void u(), 3e3);
    return () => {
      o = !0, clearInterval(f);
    };
  }, []), /* @__PURE__ */ c.jsx("main", { className: QB, children: /* @__PURE__ */ c.jsxs("div", { className: ZB, children: [
    /* @__PURE__ */ c.jsxs("header", { className: JB, children: [
      /* @__PURE__ */ c.jsx("p", { className: WB, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ c.jsxs("div", { className: e9, children: [
        /* @__PURE__ */ c.jsx("h1", { className: t9, children: "Queue" }),
        /* @__PURE__ */ c.jsx("span", { className: n9, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: a9, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    s ? /* @__PURE__ */ c.jsx(kn, { severity: "error", children: s }) : t === null ? null : t.length === 0 ? /* @__PURE__ */ c.jsx(Ia, { density: "compact", children: /* @__PURE__ */ c.jsx(Gc, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ c.jsxs(Ia, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ c.jsx("h2", { id: "runtime-queue-section", className: Jr, children: "01 / In flight" }),
      /* @__PURE__ */ c.jsx("ul", { className: r9, children: t.map((o) => {
        const u = o.position === 1;
        return /* @__PURE__ */ c.jsxs(
          "li",
          {
            className: u ? `${Dx} ${s9}` : Dx,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: u ? l9 : i9, children: o.position }),
              /* @__PURE__ */ c.jsxs("span", { className: o9, children: [
                /* @__PURE__ */ c.jsx("span", { className: c9, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ c.jsx("span", { className: u9, children: o.runId })
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: v9(o.kind), children: y9(o.kind) }),
              /* @__PURE__ */ c.jsx("span", { className: p9, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Zf, children: b9(o.etaSeconds) }),
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
function v9(t) {
  switch (t) {
    case "batch":
      return f9;
    case "test_line":
      return h9;
    case "resume":
      return m9;
    default:
      return d9;
  }
}
function y9(t) {
  switch (t) {
    case "test_line":
      return "test line";
    default:
      return t;
  }
}
function b9(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60), s = t % 60;
  return s === 0 ? `${a}m` : `${a}m ${s}s`;
}
function x9() {
  const { deploymentId: t, prefillCharacterName: a } = Rl(), s = ni(), [i, o] = g.useState(a), [u, f] = g.useState(""), [p, y] = g.useState("none"), [m, b] = g.useState(!1), [v, S] = g.useState(null), w = g.useRef(null);
  g.useEffect(() => {
    w.current?.scrollIntoView({ behavior: "smooth", block: "center" }), w.current?.focus();
  }, []);
  const j = async (C) => {
    C.preventDefault(), b(!0), S(null);
    try {
      await Zh(t, {
        characterName: i,
        speakerVoiceAssetId: u,
        defaultEmotionMode: p
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
        /* @__PURE__ */ c.jsxs("select", { value: p, onChange: (C) => y(C.currentTarget.value), children: [
          /* @__PURE__ */ c.jsx("option", { value: "none", children: "None" }),
          /* @__PURE__ */ c.jsx("option", { value: "audio_ref", children: "Audio ref" }),
          /* @__PURE__ */ c.jsx("option", { value: "vector_preset", children: "Vector preset" }),
          /* @__PURE__ */ c.jsx("option", { value: "qwen_template", children: "Qwen template" })
        ] })
      ] }),
      /* @__PURE__ */ c.jsx(Ze, { type: "submit", variant: "primary", disabled: m, children: "Save mapping" }),
      v && /* @__PURE__ */ c.jsx(kn, { severity: "error", children: v })
    ] })
  ] });
}
var S9 = "_1oor31e0", w9 = "_1oor31e1", j9 = "_1oor31e2", E9 = "_1oor31e3", N9 = "_1oor31e4", C9 = "_1oor31e5", T9 = "_1oor31e6", R9 = "_1oor31e7", _9 = "_1oor31e8";
const M9 = 8;
function A9(t) {
  const { entries: a, loading: s, error: i } = t;
  return /* @__PURE__ */ c.jsxs("div", { className: S9, "aria-busy": !!s, children: [
    i && /* @__PURE__ */ c.jsx(kn, { severity: "error", children: i }),
    s && !i && /* @__PURE__ */ c.jsx("div", { className: _9, "aria-live": "polite", children: "Loading edit history…" }),
    !s && !i && a.length === 0 && /* @__PURE__ */ c.jsx("div", { className: R9, children: "No edits yet" }),
    !s && !i && a.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: w9, children: a.map((o) => /* @__PURE__ */ c.jsxs("li", { className: j9, children: [
      /* @__PURE__ */ c.jsx("span", { className: E9, children: D9(o.recorded_at) }),
      /* @__PURE__ */ c.jsx("span", { className: N9, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ c.jsx("span", { className: C9, title: o.digest_after, children: k9(o.digest_after) }),
      /* @__PURE__ */ c.jsx("span", { className: T9, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function k9(t) {
  return t ? `${t.slice(0, M9)}…` : "—";
}
function D9(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var zx = "_1c63kaw0", z9 = "_1c63kaw1", O9 = "_1c63kaw2", L9 = "_1c63kaw3", $9 = "_1c63kaw4", U9 = "_1c63kaw5", B9 = "_1c63kaw6";
function I9({ chain: t, onRemoveOp: a }) {
  return t.ops.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: zx, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ c.jsx("span", { className: z9, children: "No edits yet" }) }) : /* @__PURE__ */ c.jsx("ol", { className: zx, "data-testid": "edit-chain-list", children: t.ops.map((s, i) => /* @__PURE__ */ c.jsxs("li", { className: O9, children: [
    /* @__PURE__ */ c.jsxs("span", { className: L9, "aria-hidden": "true", children: [
      i + 1,
      "."
    ] }),
    /* @__PURE__ */ c.jsxs("span", { className: $9, children: [
      /* @__PURE__ */ c.jsx("span", { className: U9, children: Ox(s) }),
      /* @__PURE__ */ c.jsx("span", { className: B9, children: V9(s) })
    ] }),
    /* @__PURE__ */ c.jsx(
      Ze,
      {
        variant: "ghost",
        size: "xs",
        iconOnly: !0,
        onClick: () => a(s.id),
        "aria-label": `Remove ${Ox(s)} (position ${i + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, s.id)) });
}
function Ox(t) {
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
function V9(t) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${Lx(t.start_ms)} → ${Lx(t.end_ms)}`;
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
function Lx(t) {
  return !Number.isFinite(t) || t < 0 ? "0.00s" : `${(t / 1e3).toFixed(2)}s`;
}
var fc = "_1o3ytop0", eh = "_1o3ytop1", $x = "_1o3ytop2", q9 = "_1o3ytop3", H9 = "_1o3ytop4", F9 = "_1o3ytop5", P9 = "_1o3ytop6", G9 = "_1o3ytop7", hc = "_1o3ytop8", Y9 = "_1o3ytop9", K9 = "_1o3ytopf", X9 = "_1o3ytopg", Q9 = "_1o3ytoph", Z9 = "_1o3ytopi", J9 = "_1o3ytopj", W9 = "_1o3ytopk", e7 = "_1t0zy2f0", t7 = "_1t0zy2f1", n7 = "_1t0zy2f2";
function a7({ content: t, children: a, delayMs: s = 350 }) {
  const [i, o] = g.useState(!1), u = g.useId(), f = g.useRef(null), p = g.useCallback(() => {
    f.current != null && (window.clearTimeout(f.current), f.current = null);
  }, []), y = g.useCallback(() => {
    p(), f.current = window.setTimeout(() => o(!0), s);
  }, [p, s]), m = g.useCallback(() => {
    p(), o(!1);
  }, [p]);
  if (g.useEffect(() => () => p(), [p]), g.useEffect(() => {
    if (!i) return;
    const v = (S) => {
      S.key === "Escape" && o(!1);
    };
    return window.addEventListener("keydown", v), () => window.removeEventListener("keydown", v);
  }, [i]), !g.isValidElement(a))
    return /* @__PURE__ */ c.jsx(c.Fragment, { children: a });
  const b = {
    onMouseEnter: y,
    onMouseLeave: m,
    onFocus: y,
    onBlur: m,
    "aria-describedby": i ? u : void 0
  };
  return /* @__PURE__ */ c.jsxs("span", { className: e7, children: [
    g.cloneElement(a, b),
    i && /* @__PURE__ */ c.jsx("span", { role: "tooltip", id: u, className: n7, children: t })
  ] });
}
function mc({ label: t, content: a }) {
  return /* @__PURE__ */ c.jsx(a7, { content: a, children: /* @__PURE__ */ c.jsx("button", { type: "button", "aria-label": `What is ${t}?`, className: t7, children: "?" }) });
}
const Ux = -16;
function r7(t) {
  const {
    voiceAsset: a,
    deploymentId: s,
    affectedCharacterNames: i = [],
    onChainPersisted: o,
    onError: u
  } = t, f = a.durationMs ?? 0, p = g.useMemo(
    () => s7(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [y, m] = g.useState(() => th(f)), [b, v] = g.useState(Kc), [S, w] = g.useState(!1), [j, C] = g.useState(null), [_, T] = g.useState(null), [O, R] = g.useState(!1), [N, U] = g.useState(!1), [Y, ae] = g.useState(!1), [M, V] = g.useState(null), [D, H] = g.useState([]), [Q, J] = g.useState(null), [P, ie] = g.useState([]), [A, q] = g.useState(!1), [$, te] = g.useState(null), [fe, k] = g.useState(0), ee = g.useRef(null), re = g.useRef(null), G = g.useRef(null), B = g.useRef(null), W = g.useRef(null), ce = g.useRef(0), ye = g.useMemo(
    () => y.ops.some((je) => je.mode === "normalize"),
    [y.ops]
  );
  g.useEffect(() => {
    const je = th(f);
    m(je), v(H1(je)), C(null), ae(!1), H([]), J(null), W.current = null;
  }, [a.voiceAssetId, f]);
  const Ae = g.useCallback((je) => {
    v(je), m((ke) => q1(ke, je));
  }, []);
  g.useEffect(() => {
    B.current?.abort();
    const je = new AbortController();
    return B.current = je, q(!0), te(null), bc(s, "voice_asset", a.voiceAssetId, 50, {
      signal: je.signal
    }).then((ke) => {
      je.signal.aborted || ie(ke.entries);
    }).catch((ke) => {
      if (je.signal.aborted) return;
      const Pe = ke instanceof Error ? ke.message : "audit fetch failed";
      te(Pe);
    }).finally(() => {
      je.signal.aborted || q(!1);
    }), () => je.abort();
  }, [s, a.voiceAssetId, fe]), g.useEffect(() => () => {
    _ && URL.revokeObjectURL(_);
  }, [_]), g.useEffect(() => () => {
    re.current?.abort(), G.current?.abort(), B.current?.abort();
  }, []);
  const lt = y.ops.find((je) => je.mode === "trim"), Ne = y.ops.find((je) => je.mode === "normalize"), We = lt?.start_ms ?? 0, Be = lt?.end_ms ?? Math.max(1, f), Fe = g.useCallback((je, ke) => {
    m(
      (Pe) => Bx(
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
  ), Mt = g.useCallback((je) => {
    m((ke) => {
      const Pe = ke.ops.filter((Xe) => Xe.mode !== "normalize");
      if (je) {
        const Xe = {
          id: Dn(),
          mode: "normalize",
          target_lufs: Ux
        };
        return { ...ke, ops: [...Pe, Xe] };
      }
      return { ...ke, ops: Pe };
    });
  }, []), Ce = g.useCallback(
    (je) => {
      const ke = y.ops.findIndex((St) => St.id === je);
      if (ke === -1) return;
      const Pe = y.ops[ke];
      if (!Pe) return;
      const Xe = [...y.ops.slice(0, ke), ...y.ops.slice(ke + 1)];
      m({ ...y, ops: Xe }), H((St) => [...St, { op: Pe, index: ke }]);
    },
    [y]
  ), He = g.useCallback(() => {
    const je = D[D.length - 1];
    if (!je) return;
    const ke = Math.min(je.index, y.ops.length), Pe = [...y.ops.slice(0, ke), je.op, ...y.ops.slice(ke)];
    m({ ...y, ops: Pe }), H(D.slice(0, -1));
  }, [y, D]), at = g.useCallback(() => {
    const je = M1(y, f);
    return je ? (C(je.message), !1) : (C(null), !0);
  }, [y, f]), xt = g.useCallback(async () => {
    if (!at() || O) return;
    re.current?.abort();
    const je = new AbortController();
    re.current = je;
    const ke = ++ce.current;
    U(!0);
    try {
      const Pe = await IR(a.voiceAssetId, s, y, {
        signal: je.signal
      });
      if (je.signal.aborted || ke !== ce.current) return;
      _ && URL.revokeObjectURL(_);
      const Xe = URL.createObjectURL(Pe);
      T(Xe), ae(!0), requestAnimationFrame(() => ee.current?.play().catch(() => {
      }));
    } catch (Pe) {
      if (je.signal.aborted) return;
      const Xe = Pe instanceof Error ? Pe.message : "preview failed";
      C(Xe), u(Xe);
    } finally {
      je.signal.aborted || U(!1);
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
    re.current?.abort(), G.current?.abort();
    const je = new AbortController();
    G.current = je, R(!0);
    try {
      const ke = W.current ?? void 0, Pe = await _1(
        a.voiceAssetId,
        s,
        ke ? { chain: y, digest_before: ke } : { chain: y },
        { signal: je.signal }
      );
      if (je.signal.aborted) return;
      W.current = Pe.chain_digest, J(Pe.chain_digest), C(null), V(Pe.measured_lufs ?? null), H([]), o(Pe), k((Xe) => Xe + 1);
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
  ]), Ye = g.useCallback(() => {
    re.current?.abort(), m(th(f)), C(null), V(null), ae(!1), H([]), k((je) => je + 1), _ && (URL.revokeObjectURL(_), T(null));
  }, [f, _]), pt = g.useCallback((je) => {
    m(
      (ke) => Bx(
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
  return /* @__PURE__ */ c.jsxs(kw, { variant: "standalone", children: [
    /* @__PURE__ */ c.jsx(
      Dw,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${pc(f)}`
      }
    ),
    /* @__PURE__ */ c.jsx(
      Mw,
      {
        audioUrl: p,
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
      /* @__PURE__ */ c.jsxs("span", { className: $x, children: [
        pc(We),
        " → ",
        pc(Be),
        " · ",
        pc(Be - We)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: G9, children: [
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
          ye && Ne && /* @__PURE__ */ c.jsxs("span", { className: K9, children: [
            "target ",
            Ne.target_lufs.toFixed(1),
            " LUFS",
            M !== null && ` · measured ${M.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: Y9, children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "checkbox",
              checked: ye,
              onChange: (je) => Mt(je.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { children: [
            "Target ",
            Ux.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        ye && Ne && /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "range",
            className: Q9,
            min: -30,
            max: -6,
            step: 0.5,
            value: Ne.target_lufs,
            onChange: (je) => pt(Number(je.currentTarget.value)),
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
          /* @__PURE__ */ c.jsx("span", { className: $x, children: y.ops.length })
        ] }),
        /* @__PURE__ */ c.jsx(I9, { chain: y, onRemoveOp: Ce })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: hc, children: [
        /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: q9,
            onClick: () => w((je) => !je),
            "aria-expanded": S,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: H9, "aria-hidden": "true", children: S ? "▾" : "▸" }),
              /* @__PURE__ */ c.jsx("span", { children: "Advanced effects" }),
              /* @__PURE__ */ c.jsx("span", { className: F9, children: "gain · EQ · pitch · fade · silence trim" }),
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
      Q && /* @__PURE__ */ c.jsx("div", { className: hc, children: /* @__PURE__ */ c.jsxs("span", { className: fc, children: [
        /* @__PURE__ */ c.jsx("span", { children: "Chain digest" }),
        /* @__PURE__ */ c.jsxs("span", { className: P9, title: Q, children: [
          Q.slice(0, 12),
          "…"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ c.jsxs(zw, { children: [
      /* @__PURE__ */ c.jsx(
        Ze,
        {
          variant: "secondary",
          onClick: () => void xt(),
          disabled: N || O,
          loading: N,
          children: N ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Ze,
        {
          onClick: () => void ot(),
          disabled: O || N,
          loading: O,
          children: O ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Ze,
        {
          variant: "ghost",
          onClick: Ye,
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
      Y && /* @__PURE__ */ c.jsx(
        "span",
        {
          className: W9,
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
        ref: ee,
        src: _,
        controls: !0,
        className: X9,
        "aria-label": "Edit preview"
      }
    ),
    j && /* @__PURE__ */ c.jsx(kn, { severity: "error", children: j }),
    /* @__PURE__ */ c.jsxs("details", { className: Z9, children: [
      /* @__PURE__ */ c.jsxs("summary", { className: J9, children: [
        "Edit history",
        P.length > 0 ? ` · ${P.length}` : ""
      ] }),
      /* @__PURE__ */ c.jsx(
        A9,
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
function Bx(t, a, s) {
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
function s7(t) {
  return t.startsWith("http://") || t.startsWith("https://") || t.startsWith("/") ? t : `/api/v1/artifacts/${encodeURIComponent(t)}`;
}
var i7 = "go9vi12", l7 = "go9vi13", o7 = "go9vi14", c7 = "go9vi15", u7 = "go9vi16", d7 = "go9vi17", f7 = "go9vi18", h7 = "go9vi19", m7 = "go9vi1a", p7 = "go9vi1b go9vi1a", g7 = "go9vi1c", v7 = "go9vi1d", y7 = "go9vi1e", b7 = "go9vi1f", x7 = "go9vi1g", S7 = "go9vi1h", w7 = "go9vi1i", j7 = "go9vi1j", Ix = "go9vi1k", E7 = "go9vi1l", N7 = "go9vi1m", C7 = "go9vi1n", Ic = "go9vi1o", T7 = "go9vi1q", R7 = "go9vi1r go9vi1q", _7 = "go9vi1s go9vi1q", M7 = "go9vi1t", A7 = "go9vi1u", k7 = "go9vi1v", D7 = "go9vi1w", Ow = "go9vi1x", z7 = "go9vi1y", O7 = "go9vi1z", L7 = "go9vi110 go9vi1o", $7 = "go9vi111", U7 = "go9vi112", B7 = "go9vi113", I7 = "go9vi114", V7 = "go9vi115", q7 = "go9vi116";
function H7() {
  const { deployment: t, mappings: a, voiceAssets: s } = Rl(), i = ni(), [o, u] = g.useState(a), [f, p] = g.useState(s), [y, m] = g.useState(
    a[0]?.mappingId ?? null
  ), [b, v] = g.useState(""), [S, w] = g.useState(null), [j, C] = g.useState(null), [_, T] = g.useState(null), [O, R] = g.useState(null), [N, U] = g.useState(0), Y = g.useCallback(() => {
    i(`/${t.deploymentId}/recipe`);
  }, [i, t.deploymentId]), ae = g.useCallback((G) => {
    R(G), window.setTimeout(() => {
      R((B) => B === G ? null : B);
    }, 1600);
  }, []), M = g.useMemo(() => {
    const G = /* @__PURE__ */ new Map();
    for (const B of f) G.set(B.voiceAssetId, B);
    return G;
  }, [f]), V = g.useMemo(() => {
    const G = b.trim().toLowerCase();
    return G ? o.filter((B) => B.characterName.toLowerCase().includes(G)) : o;
  }, [o, b]), D = g.useMemo(
    () => o.find((G) => G.mappingId === y) ?? null,
    [o, y]
  );
  g.useEffect(() => {
    u(a), p(s), m(a[0]?.mappingId ?? null);
  }, [a, s]), g.useEffect(() => {
    if (!j) return;
    const G = setTimeout(() => C(null), 2600);
    return () => clearTimeout(G);
  }, [j]);
  const H = g.useCallback(async () => {
    const G = await Zs(t.deploymentId);
    p(G.voiceAssets);
  }, [t.deploymentId]), Q = g.useCallback(
    (G) => {
      u(
        (B) => B.map((W) => W.mappingId === y ? { ...W, ...G } : W)
      );
    },
    [y]
  ), J = g.useCallback(
    async (G) => {
      if (!D) return;
      const B = D;
      try {
        const W = await Ys(t.deploymentId, D.mappingId, G);
        u((ce) => ce.map((ye) => ye.mappingId === W.mappingId ? W : ye)), Object.prototype.hasOwnProperty.call(G, "characterName") && ae(W.mappingId);
      } catch (W) {
        u(
          (ce) => ce.map((ye) => ye.mappingId === B.mappingId ? B : ye)
        ), w(vr(W));
      }
    },
    [D, t.deploymentId, ae]
  ), P = g.useCallback(async () => {
    const G = f[0];
    if (!G) {
      w("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const B = Q7(o), W = await Zh(t.deploymentId, {
        characterName: B,
        speakerVoiceAssetId: G.voiceAssetId
      });
      u((ce) => [...ce, W]), m(W.mappingId), U((ce) => ce + 1);
    } catch (B) {
      w(vr(B));
    }
  }, [t.deploymentId, f, o]), ie = g.useCallback(() => {
    D && T({ id: D.mappingId, name: D.characterName });
  }, [D]), A = g.useCallback(async () => {
    if (!_) return;
    const { id: G, name: B } = _;
    T(null);
    try {
      await C1(t.deploymentId, G), u((W) => W.filter((ce) => ce.mappingId !== G)), m(null), C(`Mapping for ${B} deactivated.`);
    } catch (W) {
      w(vr(W));
    }
  }, [t.deploymentId, _]), q = g.useCallback(
    async (G, B, W) => {
      try {
        const ce = await Tc(t.deploymentId, G, B, W);
        return p((ye) => [ce, ...ye]), C(`${ce.displayName} uploaded.`), ce;
      } catch (ce) {
        return w(vr(ce)), null;
      }
    },
    [t.deploymentId]
  ), $ = g.useCallback(async () => {
    try {
      const G = await jT(t.deploymentId);
      tI(G, `${t.deploymentId}-mappings.json`), C("Mappings exported to JSON.");
    } catch (G) {
      w(vr(G));
    }
  }, [t.deploymentId]), te = g.useCallback(
    async (G, B) => {
      try {
        const W = await ET(
          t.deploymentId,
          G.mappings,
          B
        );
        C(
          `Imported ${W.created.length} • skipped ${W.skipped.length} • replaced ${W.replaced.length}.`
        );
        const ce = await Zs(t.deploymentId);
        p(ce.voiceAssets);
      } catch (W) {
        w(vr(W));
      }
    },
    [t.deploymentId]
  ), fe = g.useCallback(
    async (G) => {
      if (await H(), D && G.chain_digest)
        try {
          const B = await Ys(t.deploymentId, D.mappingId, {
            voiceAssetChainDigest: G.chain_digest
          });
          u(
            (W) => W.map((ce) => ce.mappingId === B.mappingId ? B : ce)
          );
        } catch (B) {
          w(vr(B));
        }
      C("Edit applied.");
    },
    [H, D, t.deploymentId]
  ), k = g.useCallback((G) => {
    w(G);
  }, []), ee = g.useCallback(
    async (G, B) => {
      if (!D) return null;
      const W = G.trim() || `[${D.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await AT(t.deploymentId, {
          line: W,
          outputFormat: B
        })).runId };
      } catch (ce) {
        return w(vr(ce)), null;
      }
    },
    [t.deploymentId, D]
  ), re = f.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ c.jsxs("div", { className: i7, children: [
    /* @__PURE__ */ c.jsxs("aside", { className: l7, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: o7,
          onClick: Y,
          children: "← Back to recipe"
        }
      ),
      /* @__PURE__ */ c.jsxs("header", { className: c7, children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("h1", { id: "mapping-sidebar-heading", className: u7, children: "Cast" }),
          /* @__PURE__ */ c.jsxs("span", { className: d7, children: [
            o.length,
            " active · ",
            f.length,
            " ",
            re
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(Ze, { variant: "primary", size: "sm", onClick: P, children: "+ Add" })
      ] }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "search",
          className: f7,
          placeholder: "Search characters",
          value: b,
          onChange: (G) => v(G.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ c.jsx(X7, { onExport: $, onImport: te, onParseError: w }),
      /* @__PURE__ */ c.jsx("div", { className: h7, children: V.length === 0 ? /* @__PURE__ */ c.jsx(
        Gc,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : V.map((G) => {
        const B = M.get(G.speakerVoiceAssetId), W = G.mappingId === y;
        return /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: W ? p7 : m7,
            onClick: () => m(G.mappingId),
            "aria-pressed": W,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: g7, "aria-hidden": "true", children: Z7(G.characterName) }),
              /* @__PURE__ */ c.jsxs("span", { className: v7, children: [
                /* @__PURE__ */ c.jsx("span", { className: y7, children: G.characterName }),
                /* @__PURE__ */ c.jsx("span", { className: b7, children: B?.displayName ?? "no voice" })
              ] })
            ]
          },
          G.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ c.jsxs("section", { className: x7, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ c.jsx(jm, { features: Tm, children: /* @__PURE__ */ c.jsx(lw, { children: j && /* @__PURE__ */ c.jsx(
        Cm.div,
        {
          className: z7,
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
        P7,
        {
          deploymentId: t.deploymentId,
          mapping: D,
          voiceAssets: f,
          allMappings: o,
          onNameChange: (G) => {
            Q({ characterName: G });
          },
          onNameSave: (G) => {
            const B = G.trim();
            B && J({ characterName: B });
          },
          savedHint: O === D.mappingId,
          autoFocusNonce: N,
          onSpeakerChange: (G) => {
            Q({ speakerVoiceAssetId: G }), J({ speakerVoiceAssetId: G });
          },
          onDelete: ie,
          onUploadVoice: async (G, B, W) => {
            const ce = await q(G, B, W);
            return ce && W === "speaker" && (Q({ speakerVoiceAssetId: ce.voiceAssetId }), J({ speakerVoiceAssetId: ce.voiceAssetId })), await H(), ce;
          },
          onTestLine: ee,
          onEditChainPersisted: fe,
          onEditError: k
        },
        D.mappingId
      ) : /* @__PURE__ */ c.jsx(
        F7,
        {
          voiceCount: f.length,
          onUploadVoice: async (G) => {
            await q(G, G.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function F7({ voiceCount: t, onUploadVoice: a }) {
  return t === 0 ? /* @__PURE__ */ c.jsxs(Ia, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ c.jsxs("div", { className: B7, children: [
      /* @__PURE__ */ c.jsx("p", { className: Jr, children: "01 / Onboarding" }),
      /* @__PURE__ */ c.jsx("h2", { id: "onboarding-heading", className: I7, children: "Upload your first voice" }),
      /* @__PURE__ */ c.jsxs("p", { className: V7, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ c.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ c.jsx(
      Lw,
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
function P7(t) {
  const { mapping: a, voiceAssets: s, allMappings: i } = t, o = s.find((T) => T.voiceAssetId === a.speakerVoiceAssetId) ?? null, u = g.useMemo(
    () => i.filter(
      (T) => T.isActive && T.speakerVoiceAssetId === a.speakerVoiceAssetId
    ).map((T) => T.characterName),
    [i, a.speakerVoiceAssetId]
  ), [f, p] = g.useState(""), [y, m] = g.useState("mp3"), [b, v] = g.useState("idle"), [S, w] = g.useState(null), j = g.useRef(!1), C = g.useRef(null);
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
    /* @__PURE__ */ c.jsxs("header", { className: S7, children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("p", { className: Jr, children: "Character" }),
        /* @__PURE__ */ c.jsx("h2", { className: w7, children: a.characterName })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: Ow, children: /* @__PURE__ */ c.jsx(Ze, { variant: "danger", size: "sm", onClick: t.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ c.jsxs(
      Ia,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: O7,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "text",
              className: L7,
              placeholder: `[${a.characterName}] This is a test of the voice.`,
              value: f,
              onChange: (T) => p(T.currentTarget.value),
              "aria-label": "Test-line text",
              disabled: b === "running"
            }
          ),
          /* @__PURE__ */ c.jsxs(
            "select",
            {
              className: Ic,
              value: y,
              onChange: (T) => m(T.currentTarget.value),
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
    /* @__PURE__ */ c.jsxs("div", { className: j7, children: [
      /* @__PURE__ */ c.jsxs(Ia, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ c.jsx("h3", { id: "identity-heading", className: Jr, children: "01 / Identity" }),
        /* @__PURE__ */ c.jsxs("label", { className: C7, children: [
          /* @__PURE__ */ c.jsxs("span", { className: E7, children: [
            /* @__PURE__ */ c.jsx("span", { className: Ix, children: "Character name" }),
            t.savedHint && /* @__PURE__ */ c.jsx(
              "span",
              {
                className: N7,
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
        /* @__PURE__ */ c.jsx("span", { className: Ix, children: "Speaker reference" }),
        /* @__PURE__ */ c.jsx(
          G7,
          {
            value: a.speakerVoiceAssetId,
            voices: s,
            onChange: t.onSpeakerChange
          }
        ),
        o && /* @__PURE__ */ c.jsx(Y7, { voice: o }),
        /* @__PURE__ */ c.jsx(
          Lw,
          {
            label: o ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (T) => t.onUploadVoice(T, T.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ c.jsx(
          r7,
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
function G7({
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
function Y7({ voice: t }) {
  const a = J7(t.durationMs ?? null);
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: M7, children: [
      /* @__PURE__ */ c.jsx("span", { children: t.displayName }),
      /* @__PURE__ */ c.jsx("span", { children: t.kind }),
      t.durationMs != null && /* @__PURE__ */ c.jsx("span", { children: W7(t.durationMs) }),
      t.sampleRate && /* @__PURE__ */ c.jsxs("span", { children: [
        t.sampleRate,
        " Hz"
      ] })
    ] }),
    t.durationMs != null && /* @__PURE__ */ c.jsxs("div", { className: A7, children: [
      /* @__PURE__ */ c.jsx("div", { className: k7, children: /* @__PURE__ */ c.jsx(jm, { features: Tm, children: /* @__PURE__ */ c.jsx(
        Cm.div,
        {
          className: D7,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, t.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ c.jsx(Er, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ c.jsx(K7, { seed: t.contentSha256 })
  ] });
}
function K7({ seed: t }) {
  const a = g.useMemo(() => eI(t, 48), [t]);
  return /* @__PURE__ */ c.jsx("div", { className: $7, "aria-hidden": "true", children: a.map((s, i) => /* @__PURE__ */ c.jsx(
    "span",
    {
      className: U7,
      style: { height: `${Math.max(6, s * 100)}%` }
    },
    `${t}-${i}`
  )) });
}
function Lw({
  label: t,
  onFile: a
}) {
  const [s, i] = g.useState(!1), [o, u] = g.useState(!1), f = g.useRef(null), p = g.useCallback(
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
      className: o ? _7 : s ? R7 : T7,
      onDragOver: (y) => {
        y.preventDefault(), i(!0);
      },
      onDragLeave: () => i(!1),
      onDrop: (y) => {
        y.preventDefault(), i(!1);
        const m = y.dataTransfer.files?.[0];
        m && p(m);
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
              const m = y.currentTarget.files?.[0];
              m && p(m), y.currentTarget.value = "";
            }
          }
        ),
        o ? "Uploading…" : t
      ]
    }
  );
}
function X7({
  onExport: t,
  onImport: a,
  onParseError: s
}) {
  const [i, o] = g.useState("error"), u = g.useRef(null);
  return /* @__PURE__ */ c.jsxs("div", { className: Ow, children: [
    /* @__PURE__ */ c.jsx(Ze, { variant: "secondary", size: "sm", onClick: t, children: "Export JSON" }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        ref: u,
        type: "file",
        accept: "application/json,.json",
        className: q7,
        "aria-hidden": "true",
        tabIndex: -1,
        onChange: async (f) => {
          const p = f.currentTarget.files?.[0];
          if (f.currentTarget.value = "", !!p)
            try {
              const y = await p.text(), m = JSON.parse(y);
              a(m, i);
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
function Q7(t) {
  const a = new Set(t.map((i) => i.characterName.toLowerCase()));
  let s = 1;
  for (; a.has(`character ${s}`); ) s += 1;
  return `Character ${s}`;
}
function Z7(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function J7(t) {
  return t == null ? null : t < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : t > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : t > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function W7(t) {
  return t < 1e3 ? `${t} ms` : `${Math.round(t / 100) / 10}s`;
}
function eI(t, a) {
  const s = [];
  for (let i = 0; i < a; i += 1) {
    const o = t.charCodeAt(i % t.length);
    s.push((o * 31 + i * 7) % 100 / 100);
  }
  return s;
}
function tI(t, a) {
  const s = new Blob([JSON.stringify(t, null, 2)], { type: "application/json" }), i = URL.createObjectURL(s), o = document.createElement("a");
  o.href = i, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(i);
}
function vr(t) {
  return t instanceof ai || t instanceof Error ? t.message : "unknown error";
}
function nI() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: t } = await ST();
        return { deployments: t };
      },
      Component: oR
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: t }) => {
        const a = qs(t, "deploymentId");
        return RN(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: t }) => {
        const a = qs(t, "deploymentId"), [s, { mappings: i }, { runs: o }, u] = await Promise.all([
          Xy(a),
          Qy(a),
          RT(a, { limit: 10 }),
          OT(a)
        ]);
        return { deployment: s, mappings: i, runs: o, workflow: u };
      },
      Component: AU
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: t }) => {
        const a = qs(t, "deploymentId"), s = qs(t, "runId");
        return { run: await Jh(a, s) };
      },
      Component: VB
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
      Component: H7
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
      Component: x9
    },
    {
      path: "/runtime/queue",
      Component: g9
    }
  ];
}
function qs(t, a) {
  const s = t[a];
  if (!s)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return s;
}
const Vx = "ext-actions-request", aI = "ext-actions-declare", rI = "ext-action-state", qx = "ext-action-invoke", zh = "emotion-tts:navigate", Ps = "emotion-tts.run", Hx = "emotion-tts.mappings", sI = 4e3;
function iI(t, a) {
  let s = null, i = !1;
  const o = () => {
    const j = s?.badge ?? "not_installed";
    return lI(j, i);
  }, u = () => ({
    primary: o(),
    secondary: {
      id: Hx,
      label: "Mappings",
      icon: "tune",
      tone: "secondary",
      tooltip: "Manage character → voice mappings"
    }
  }), f = () => {
    t.dispatchEvent(
      new CustomEvent(aI, {
        detail: { actions: u() },
        bubbles: !1
      })
    );
  }, p = () => {
    t.dispatchEvent(
      new CustomEvent(rI, {
        detail: { action: o() },
        bubbles: !1
      })
    );
  }, y = () => f(), m = (j) => {
    const C = j.detail?.id;
    C === Ps ? b() : C === Hx && t.dispatchEvent(
      new CustomEvent(zh, {
        detail: { path: `/${a}/mappings` },
        bubbles: !1
      })
    );
  }, b = async () => {
    const j = s?.badge ?? "not_installed", C = j === "ready" || j === "running" || j === "starting";
    i = !0, p();
    try {
      C ? await l2() : await i2(o2(), U1());
      try {
        s = await yl();
      } catch {
      }
    } catch {
    } finally {
      i = !1, p();
    }
  };
  t.addEventListener(Vx, y), t.addEventListener(qx, m);
  let v = !1;
  const S = async () => {
    try {
      const j = await yl();
      if (v) return;
      s = j, p();
    } catch {
    }
  };
  S();
  const w = window.setInterval(() => void S(), sI);
  return f(), {
    dispose: () => {
      v = !0, window.clearInterval(w), t.removeEventListener(Vx, y), t.removeEventListener(qx, m);
    }
  };
}
function lI(t, a) {
  const s = t === "ready" || t === "running" || t === "starting", i = t === "stopped" || t === "not_installed" || t === "failed";
  return a ? {
    id: Ps,
    label: s ? "Stopping…" : "Starting…",
    icon: s ? "stop" : "play_arrow",
    tone: "primary",
    state: "loading"
  } : t === "starting" || t === "installing" || t === "stopping" ? {
    id: Ps,
    label: O1(t),
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
const Oh = "emotion-tts-app", oI = "ext-event", Fx = "emotion-tts-stylesheet", Px = ["accent", "density", "card"];
function cI(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function uI() {
  if (typeof document > "u" || document.getElementById(Fx)) return;
  const t = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = Fx, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
uI();
class dI extends HTMLElement {
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
    this.root = WE.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(zh, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = iI(this, a), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
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
    for (const a of Px) {
      const s = cI(a);
      s === void 0 ? delete this.dataset[a] : this.dataset[a] !== s && (this.dataset[a] = s);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: Px.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), s = OC(nI(), { initialEntries: [a] });
    this.router = s, this.root.render(
      /* @__PURE__ */ c.jsx(g.StrictMode, { children: /* @__PURE__ */ c.jsx($C, { router: s }) })
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
      new CustomEvent(oI, {
        detail: { topic: a, payload: s },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function fI() {
  typeof customElements > "u" || customElements.get(Oh) || customElements.define(Oh, dI);
}
typeof customElements < "u" && !customElements.get(Oh) && fI();
export {
  fI as register
};
//# sourceMappingURL=emotion-tts.js.map
