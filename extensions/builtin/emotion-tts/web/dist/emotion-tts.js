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
var c = GE(), uf = { exports: {} }, Ke = {};
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
  if (hy) return Ke;
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
  function T(k, te, ne) {
    this.props = k, this.context = te, this.refs = _, this.updater = ne || j;
  }
  T.prototype.isReactComponent = {}, T.prototype.setState = function(k, te) {
    if (typeof k != "object" && typeof k != "function" && k != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, k, te, "setState");
  }, T.prototype.forceUpdate = function(k) {
    this.updater.enqueueForceUpdate(this, k, "forceUpdate");
  };
  function O() {
  }
  O.prototype = T.prototype;
  function R(k, te, ne) {
    this.props = k, this.context = te, this.refs = _, this.updater = ne || j;
  }
  var N = R.prototype = new O();
  N.constructor = R, C(N, T.prototype), N.isPureReactComponent = !0;
  var $ = Array.isArray;
  function Y() {
  }
  var ee = { H: null, A: null, T: null, S: null }, M = Object.prototype.hasOwnProperty;
  function I(k, te, ne) {
    var K = ne.ref;
    return {
      $$typeof: t,
      type: k,
      key: te,
      ref: K !== void 0 ? K : null,
      props: ne
    };
  }
  function z(k, te) {
    return I(k.type, te, k.props);
  }
  function F(k) {
    return typeof k == "object" && k !== null && k.$$typeof === t;
  }
  function W(k) {
    var te = { "=": "=0", ":": "=2" };
    return "$" + k.replace(/[=:]/g, function(ne) {
      return te[ne];
    });
  }
  var G = /\/+/g;
  function Q(k, te) {
    return typeof k == "object" && k !== null && k.key != null ? W("" + k.key) : te.toString(36);
  }
  function ie(k) {
    switch (k.status) {
      case "fulfilled":
        return k.value;
      case "rejected":
        throw k.reason;
      default:
        switch (typeof k.status == "string" ? k.then(Y, Y) : (k.status = "pending", k.then(
          function(te) {
            k.status === "pending" && (k.status = "fulfilled", k.value = te);
          },
          function(te) {
            k.status === "pending" && (k.status = "rejected", k.reason = te);
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
  function A(k, te, ne, K, B) {
    var ae = typeof k;
    (ae === "undefined" || ae === "boolean") && (k = null);
    var ce = !1;
    if (k === null) ce = !0;
    else
      switch (ae) {
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
                te,
                ne,
                K,
                B
              );
          }
      }
    if (ce)
      return B = B(k), ce = K === "" ? "." + Q(k, 0) : K, $(B) ? (ne = "", ce != null && (ne = ce.replace(G, "$&/") + "/"), A(B, te, ne, "", function(ot) {
        return ot;
      })) : B != null && (F(B) && (B = z(
        B,
        ne + (B.key == null || k && k.key === B.key ? "" : ("" + B.key).replace(
          G,
          "$&/"
        ) + "/") + ce
      )), te.push(B)), 1;
    ce = 0;
    var be = K === "" ? "." : K + ":";
    if ($(k))
      for (var Re = 0; Re < k.length; Re++)
        K = k[Re], ae = be + Q(K, Re), ce += A(
          K,
          te,
          ne,
          ae,
          B
        );
    else if (Re = w(k), typeof Re == "function")
      for (k = Re.call(k), Re = 0; !(K = k.next()).done; )
        K = K.value, ae = be + Q(K, Re++), ce += A(
          K,
          te,
          ne,
          ae,
          B
        );
    else if (ae === "object") {
      if (typeof k.then == "function")
        return A(
          ie(k),
          te,
          ne,
          K,
          B
        );
      throw te = String(k), Error(
        "Objects are not valid as a React child (found: " + (te === "[object Object]" ? "object with keys {" + Object.keys(k).join(", ") + "}" : te) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ce;
  }
  function H(k, te, ne) {
    if (k == null) return k;
    var K = [], B = 0;
    return A(k, K, "", "", function(ae) {
      return te.call(ne, ae, B++);
    }), K;
  }
  function U(k) {
    if (k._status === -1) {
      var te = k._result;
      te = te(), te.then(
        function(ne) {
          (k._status === 0 || k._status === -1) && (k._status = 1, k._result = ne);
        },
        function(ne) {
          (k._status === 0 || k._status === -1) && (k._status = 2, k._result = ne);
        }
      ), k._status === -1 && (k._status = 0, k._result = te);
    }
    if (k._status === 1) return k._result.default;
    throw k._result;
  }
  var J = typeof reportError == "function" ? reportError : function(k) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var te = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof k == "object" && k !== null && typeof k.message == "string" ? String(k.message) : String(k),
        error: k
      });
      if (!window.dispatchEvent(te)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", k);
      return;
    }
    console.error(k);
  }, pe = {
    map: H,
    forEach: function(k, te, ne) {
      H(
        k,
        function() {
          te.apply(this, arguments);
        },
        ne
      );
    },
    count: function(k) {
      var te = 0;
      return H(k, function() {
        te++;
      }), te;
    },
    toArray: function(k) {
      return H(k, function(te) {
        return te;
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
  return Ke.Activity = v, Ke.Children = pe, Ke.Component = T, Ke.Fragment = s, Ke.Profiler = o, Ke.PureComponent = R, Ke.StrictMode = i, Ke.Suspense = y, Ke.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ee, Ke.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(k) {
      return ee.H.useMemoCache(k);
    }
  }, Ke.cache = function(k) {
    return function() {
      return k.apply(null, arguments);
    };
  }, Ke.cacheSignal = function() {
    return null;
  }, Ke.cloneElement = function(k, te, ne) {
    if (k == null)
      throw Error(
        "The argument must be a React element, but you passed " + k + "."
      );
    var K = C({}, k.props), B = k.key;
    if (te != null)
      for (ae in te.key !== void 0 && (B = "" + te.key), te)
        !M.call(te, ae) || ae === "key" || ae === "__self" || ae === "__source" || ae === "ref" && te.ref === void 0 || (K[ae] = te[ae]);
    var ae = arguments.length - 2;
    if (ae === 1) K.children = ne;
    else if (1 < ae) {
      for (var ce = Array(ae), be = 0; be < ae; be++)
        ce[be] = arguments[be + 2];
      K.children = ce;
    }
    return I(k.type, B, K);
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
  }, Ke.createElement = function(k, te, ne) {
    var K, B = {}, ae = null;
    if (te != null)
      for (K in te.key !== void 0 && (ae = "" + te.key), te)
        M.call(te, K) && K !== "key" && K !== "__self" && K !== "__source" && (B[K] = te[K]);
    var ce = arguments.length - 2;
    if (ce === 1) B.children = ne;
    else if (1 < ce) {
      for (var be = Array(ce), Re = 0; Re < ce; Re++)
        be[Re] = arguments[Re + 2];
      B.children = be;
    }
    if (k && k.defaultProps)
      for (K in ce = k.defaultProps, ce)
        B[K] === void 0 && (B[K] = ce[K]);
    return I(k, ae, B);
  }, Ke.createRef = function() {
    return { current: null };
  }, Ke.forwardRef = function(k) {
    return { $$typeof: m, render: k };
  }, Ke.isValidElement = F, Ke.lazy = function(k) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: k },
      _init: U
    };
  }, Ke.memo = function(k, te) {
    return {
      $$typeof: p,
      type: k,
      compare: te === void 0 ? null : te
    };
  }, Ke.startTransition = function(k) {
    var te = ee.T, ne = {};
    ee.T = ne;
    try {
      var K = k(), B = ee.S;
      B !== null && B(ne, K), typeof K == "object" && K !== null && typeof K.then == "function" && K.then(Y, J);
    } catch (ae) {
      J(ae);
    } finally {
      te !== null && ne.types !== null && (te.types = ne.types), ee.T = te;
    }
  }, Ke.unstable_useCacheRefresh = function() {
    return ee.H.useCacheRefresh();
  }, Ke.use = function(k) {
    return ee.H.use(k);
  }, Ke.useActionState = function(k, te, ne) {
    return ee.H.useActionState(k, te, ne);
  }, Ke.useCallback = function(k, te) {
    return ee.H.useCallback(k, te);
  }, Ke.useContext = function(k) {
    return ee.H.useContext(k);
  }, Ke.useDebugValue = function() {
  }, Ke.useDeferredValue = function(k, te) {
    return ee.H.useDeferredValue(k, te);
  }, Ke.useEffect = function(k, te) {
    return ee.H.useEffect(k, te);
  }, Ke.useEffectEvent = function(k) {
    return ee.H.useEffectEvent(k);
  }, Ke.useId = function() {
    return ee.H.useId();
  }, Ke.useImperativeHandle = function(k, te, ne) {
    return ee.H.useImperativeHandle(k, te, ne);
  }, Ke.useInsertionEffect = function(k, te) {
    return ee.H.useInsertionEffect(k, te);
  }, Ke.useLayoutEffect = function(k, te) {
    return ee.H.useLayoutEffect(k, te);
  }, Ke.useMemo = function(k, te) {
    return ee.H.useMemo(k, te);
  }, Ke.useOptimistic = function(k, te) {
    return ee.H.useOptimistic(k, te);
  }, Ke.useReducer = function(k, te, ne) {
    return ee.H.useReducer(k, te, ne);
  }, Ke.useRef = function(k) {
    return ee.H.useRef(k);
  }, Ke.useState = function(k) {
    return ee.H.useState(k);
  }, Ke.useSyncExternalStore = function(k, te, ne) {
    return ee.H.useSyncExternalStore(
      k,
      te,
      ne
    );
  }, Ke.useTransition = function() {
    return ee.H.useTransition();
  }, Ke.version = "19.2.5", Ke;
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
    function a(A, H) {
      var U = A.length;
      A.push(H);
      e: for (; 0 < U; ) {
        var J = U - 1 >>> 1, pe = A[J];
        if (0 < o(pe, H))
          A[J] = H, A[U] = pe, U = J;
        else break e;
      }
    }
    function s(A) {
      return A.length === 0 ? null : A[0];
    }
    function i(A) {
      if (A.length === 0) return null;
      var H = A[0], U = A.pop();
      if (U !== H) {
        A[0] = U;
        e: for (var J = 0, pe = A.length, k = pe >>> 1; J < k; ) {
          var te = 2 * (J + 1) - 1, ne = A[te], K = te + 1, B = A[K];
          if (0 > o(ne, U))
            K < pe && 0 > o(B, ne) ? (A[J] = B, A[K] = U, J = K) : (A[J] = ne, A[te] = U, J = te);
          else if (K < pe && 0 > o(B, U))
            A[J] = B, A[K] = U, J = K;
          else break e;
        }
      }
      return H;
    }
    function o(A, H) {
      var U = A.sortIndex - H.sortIndex;
      return U !== 0 ? U : A.id - H.id;
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
      for (var H = s(p); H !== null; ) {
        if (H.callback === null) i(p);
        else if (H.startTime <= A)
          i(p), H.sortIndex = H.expirationTime, a(y, H);
        else break;
        H = s(p);
      }
    }
    function $(A) {
      if (C = !1, N(A), !j)
        if (s(y) !== null)
          j = !0, Y || (Y = !0, W());
        else {
          var H = s(p);
          H !== null && ie($, H.startTime - A);
        }
    }
    var Y = !1, ee = -1, M = 5, I = -1;
    function z() {
      return _ ? !0 : !(t.unstable_now() - I < M);
    }
    function F() {
      if (_ = !1, Y) {
        var A = t.unstable_now();
        I = A;
        var H = !0;
        try {
          e: {
            j = !1, C && (C = !1, O(ee), ee = -1), w = !0;
            var U = S;
            try {
              t: {
                for (N(A), v = s(y); v !== null && !(v.expirationTime > A && z()); ) {
                  var J = v.callback;
                  if (typeof J == "function") {
                    v.callback = null, S = v.priorityLevel;
                    var pe = J(
                      v.expirationTime <= A
                    );
                    if (A = t.unstable_now(), typeof pe == "function") {
                      v.callback = pe, N(A), H = !0;
                      break t;
                    }
                    v === s(y) && i(y), N(A);
                  } else i(y);
                  v = s(y);
                }
                if (v !== null) H = !0;
                else {
                  var k = s(p);
                  k !== null && ie(
                    $,
                    k.startTime - A
                  ), H = !1;
                }
              }
              break e;
            } finally {
              v = null, S = U, w = !1;
            }
            H = void 0;
          }
        } finally {
          H ? W() : Y = !1;
        }
      }
    }
    var W;
    if (typeof R == "function")
      W = function() {
        R(F);
      };
    else if (typeof MessageChannel < "u") {
      var G = new MessageChannel(), Q = G.port2;
      G.port1.onmessage = F, W = function() {
        Q.postMessage(null);
      };
    } else
      W = function() {
        T(F, 0);
      };
    function ie(A, H) {
      ee = T(function() {
        A(t.unstable_now());
      }, H);
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
          var H = 3;
          break;
        default:
          H = S;
      }
      var U = S;
      S = H;
      try {
        return A();
      } finally {
        S = U;
      }
    }, t.unstable_requestPaint = function() {
      _ = !0;
    }, t.unstable_runWithPriority = function(A, H) {
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
      var U = S;
      S = A;
      try {
        return H();
      } finally {
        S = U;
      }
    }, t.unstable_scheduleCallback = function(A, H, U) {
      var J = t.unstable_now();
      switch (typeof U == "object" && U !== null ? (U = U.delay, U = typeof U == "number" && 0 < U ? J + U : J) : U = J, A) {
        case 1:
          var pe = -1;
          break;
        case 2:
          pe = 250;
          break;
        case 5:
          pe = 1073741823;
          break;
        case 4:
          pe = 1e4;
          break;
        default:
          pe = 5e3;
      }
      return pe = U + pe, A = {
        id: b++,
        callback: H,
        priorityLevel: A,
        startTime: U,
        expirationTime: pe,
        sortIndex: -1
      }, U > J ? (A.sortIndex = U, a(p, A), s(y) === null && A === s(p) && (C ? (O(ee), ee = -1) : C = !0, ie($, U - J))) : (A.sortIndex = pe, a(y, A), j || w || (j = !0, Y || (Y = !0, W()))), A;
    }, t.unstable_shouldYield = z, t.unstable_wrapCallback = function(A) {
      var H = S;
      return function() {
        var U = S;
        S = H;
        try {
          return A.apply(this, arguments);
        } finally {
          S = U;
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
  var v = Object.assign, S = Symbol.for("react.element"), w = Symbol.for("react.transitional.element"), j = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), _ = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), O = Symbol.for("react.consumer"), R = Symbol.for("react.context"), N = Symbol.for("react.forward_ref"), $ = Symbol.for("react.suspense"), Y = Symbol.for("react.suspense_list"), ee = Symbol.for("react.memo"), M = Symbol.for("react.lazy"), I = Symbol.for("react.activity"), z = Symbol.for("react.memo_cache_sentinel"), F = Symbol.iterator;
  function W(e) {
    return e === null || typeof e != "object" ? null : (e = F && e[F] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var G = Symbol.for("react.client.reference");
  function Q(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === G ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case C:
        return "Fragment";
      case T:
        return "Profiler";
      case _:
        return "StrictMode";
      case $:
        return "Suspense";
      case Y:
        return "SuspenseList";
      case I:
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
        case ee:
          return n = e.displayName || null, n !== null ? n : Q(e.type) || "Memo";
        case M:
          n = e._payload, e = e._init;
          try {
            return Q(e(n));
          } catch {
          }
      }
    return null;
  }
  var ie = Array.isArray, A = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, H = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, U = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, J = [], pe = -1;
  function k(e) {
    return { current: e };
  }
  function te(e) {
    0 > pe || (e.current = J[pe], J[pe] = null, pe--);
  }
  function ne(e, n) {
    pe++, J[pe] = e.current, e.current = n;
  }
  var K = k(null), B = k(null), ae = k(null), ce = k(null);
  function be(e, n) {
    switch (ne(ae, n), ne(B, e), ne(K, null), n.nodeType) {
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
    te(K), ne(K, e);
  }
  function Re() {
    te(K), te(B), te(ae);
  }
  function ot(e) {
    e.memoizedState !== null && ne(ce, e);
    var n = K.current, r = Ov(n, e.type);
    n !== r && (ne(B, e), ne(K, r));
  }
  function Ne(e) {
    B.current === e && (te(K), te(B)), ce.current === e && (te(ce), Gi._currentValue = U);
  }
  var We, Be;
  function Pe(e) {
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
  var sn = !1;
  function qt(e, n) {
    if (!e || sn) return "";
    sn = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var me = function() {
                throw Error();
              };
              if (Object.defineProperty(me.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(me, []);
                } catch (oe) {
                  var le = oe;
                }
                Reflect.construct(e, [], me);
              } else {
                try {
                  me.call();
                } catch (oe) {
                  le = oe;
                }
                e.call(me.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (oe) {
                le = oe;
              }
              (me = e()) && typeof me.catch == "function" && me.catch(function() {
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
      sn = !1, Error.prepareStackTrace = r;
    }
    return (r = e ? e.displayName || e.name : "") ? Pe(r) : "";
  }
  function Mt(e, n) {
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
        return qt(e.type, !1);
      case 11:
        return qt(e.type.render, !1);
      case 1:
        return qt(e.type, !0);
      case 31:
        return Pe("Activity");
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
  var Ve = Object.prototype.hasOwnProperty, dt = t.unstable_scheduleCallback, At = t.unstable_cancelCallback, Xe = t.unstable_shouldYield, at = t.unstable_requestPaint, bt = t.unstable_now, Se = t.unstable_getCurrentPriorityLevel, $e = t.unstable_ImmediatePriority, Fe = t.unstable_UserBlockingPriority, rt = t.unstable_NormalPriority, yt = t.unstable_LowPriority, Tt = t.unstable_IdlePriority, kn = t.log, Sn = t.unstable_setDisableYieldValue, pn = null, Pt = null;
  function zt(e) {
    if (typeof kn == "function" && Sn(e), Pt && typeof Pt.setStrictMode == "function")
      try {
        Pt.setStrictMode(pn, e);
      } catch {
      }
  }
  var It = Math.clz32 ? Math.clz32 : cn, Dn = Math.log, zn = Math.LN2;
  function cn(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Dn(e) / zn | 0) | 0;
  }
  var wn = 256, ue = 262144, Me = 4194304;
  function je(e) {
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
    return E !== 0 ? (l = E & ~h, l !== 0 ? d = je(l) : (x &= E, x !== 0 ? d = je(x) : r || (r = E & ~e, r !== 0 && (d = je(r))))) : (E = l & ~h, E !== 0 ? d = je(E) : x !== 0 ? d = je(x) : r || (r = l & ~e, r !== 0 && (d = je(r)))), d === 0 ? 0 : n !== 0 && n !== d && (n & h) === 0 && (h = d & -d, r = n & -n, h >= r || h === 32 && (r & 4194048) !== 0) ? n : d;
  }
  function Ge(e, n) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & n) === 0;
  }
  function q(e, n) {
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
  function fe() {
    var e = Me;
    return Me <<= 1, (Me & 62914560) === 0 && (Me = 4194304), e;
  }
  function De(e) {
    for (var n = [], r = 0; 31 > r; r++) n.push(e);
    return n;
  }
  function _e(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Ye(e, n, r, l, d, h) {
    var x = e.pendingLanes;
    e.pendingLanes = r, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= r, e.entangledLanes &= r, e.errorRecoveryDisabledLanes &= r, e.shellSuspendCounter = 0;
    var E = e.entanglements, L = e.expirationTimes, se = e.hiddenUpdates;
    for (r = x & ~r; 0 < r; ) {
      var de = 31 - It(r), me = 1 << de;
      E[de] = 0, L[de] = -1;
      var le = se[de];
      if (le !== null)
        for (se[de] = null, de = 0; de < le.length; de++) {
          var oe = le[de];
          oe !== null && (oe.lane &= -536870913);
        }
      r &= ~me;
    }
    l !== 0 && gt(e, l, 0), h !== 0 && d === 0 && e.tag !== 0 && (e.suspendedLanes |= h & ~(x & ~n));
  }
  function gt(e, n, r) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var l = 31 - It(n);
    e.entangledLanes |= n, e.entanglements[l] = e.entanglements[l] | 1073741824 | r & 261930;
  }
  function xt(e, n) {
    var r = e.entangledLanes |= n;
    for (e = e.entanglements; r; ) {
      var l = 31 - It(r), d = 1 << l;
      d & n | e[l] & n && (e[l] |= n), r &= ~d;
    }
  }
  function D(e, n) {
    var r = n & -n;
    return r = (r & 42) !== 0 ? 1 : P(r), (r & (e.suspendedLanes | n)) !== 0 ? 0 : r;
  }
  function P(e) {
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
    var e = H.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : ry(e.type));
  }
  function ye(e, n) {
    var r = H.p;
    try {
      return H.p = e, n();
    } finally {
      H.p = r;
    }
  }
  var Ae = Math.random().toString(36).slice(2), xe = "__reactFiber$" + Ae, Ee = "__reactProps$" + Ae, Oe = "__reactContainer$" + Ae, Te = "__reactEvents$" + Ae, qe = "__reactListeners$" + Ae, Ue = "__reactHandles$" + Ae, ht = "__reactResources$" + Ae, et = "__reactMarker$" + Ae;
  function Rt(e) {
    delete e[xe], delete e[Ee], delete e[Te], delete e[qe], delete e[Ue];
  }
  function jt(e) {
    var n = e[xe];
    if (n) return n;
    for (var r = e.parentNode; r; ) {
      if (n = r[Oe] || r[xe]) {
        if (r = n.alternate, n.child !== null || r !== null && r.child !== null)
          for (e = qv(e); e !== null; ) {
            if (r = e[xe]) return r;
            e = qv(e);
          }
        return n;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function Ut(e) {
    if (e = e[xe] || e[Oe]) {
      var n = e.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return e;
    }
    return null;
  }
  function st(e) {
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
    return Ve.call(Mr, e) ? !0 : Ve.call(pa, e) ? !1 : _r.test(e) ? Mr[e] = !0 : (pa[e] = !0, !1);
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
  function Ot(e) {
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
      var n = Ot(e) ? "checked" : "value";
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
    return e && (l = Ot(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== r ? (n.setValue(e), !0) : !1;
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
  function Pn(e) {
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
    var n = Ut(e);
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
              'input[name="' + Pn(
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
  function En(e) {
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
  }, Bl = En(Ar), di = v({}, Ar, { view: 0, detail: 0 }), qw = En(di), uu, du, fi, Il = v({}, di, {
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
  }), $m = En(Il), Hw = v({}, Il, { dataTransfer: 0 }), Fw = En(Hw), Pw = v({}, di, { relatedTarget: 0 }), fu = En(Pw), Gw = v({}, Ar, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Yw = En(Gw), Kw = v({}, Ar, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Xw = En(Kw), Qw = v({}, Ar, { data: 0 }), Um = En(Qw), Zw = {
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
  }), nj = En(tj), aj = v({}, Il, {
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
  }), Bm = En(aj), rj = v({}, di, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: hu
  }), sj = En(rj), ij = v({}, Ar, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), lj = En(ij), oj = v({}, Il, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), cj = En(oj), uj = v({}, Ar, {
    newState: 0,
    oldState: 0
  }), dj = En(uj), fj = [9, 13, 27, 32], mu = ja && "CompositionEvent" in window, hi = null;
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
    var n = st(e);
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
      if (!Ve.call(n, d) || !On(e[d], n[d]))
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
  }, Gn = [], hs = 0, wu = 0;
  function Hl() {
    for (var e = hs, n = wu = hs = 0; n < e; ) {
      var r = Gn[n];
      Gn[n++] = null;
      var l = Gn[n];
      Gn[n++] = null;
      var d = Gn[n];
      Gn[n++] = null;
      var h = Gn[n];
      if (Gn[n++] = null, l !== null && d !== null) {
        var x = l.pending;
        x === null ? d.next = d : (d.next = x.next, x.next = d), l.pending = d;
      }
      h !== 0 && cp(r, d, h);
    }
  }
  function Fl(e, n, r, l) {
    Gn[hs++] = e, Gn[hs++] = n, Gn[hs++] = r, Gn[hs++] = l, wu |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
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
    return e.tag === 3 ? (h = e.stateNode, d && n !== null && (d = 31 - It(r), e = h.hiddenUpdates, l = e[d], l === null ? e[d] = [n] : l.push(n), n.lane = r | 536870912), h) : null;
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
        case I:
          return e = Ln(31, r, n, d), e.elementType = I, e.lanes = h, e;
        case C:
          return Or(r.children, d, h, n);
        case _:
          x = 8, d |= 24;
          break;
        case T:
          return e = Ln(12, r, n, d | 2), e.elementType = T, e.lanes = h, e;
        case $:
          return e = Ln(13, r, n, d), e.elementType = $, e.lanes = h, e;
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
              case ee:
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
  function Yn(e, n) {
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
  var ps = [], gs = 0, Yl = null, yi = 0, Kn = [], Xn = 0, Ga = null, ga = 1, va = "";
  function Na(e, n) {
    ps[gs++] = yi, ps[gs++] = Yl, Yl = e, yi = n;
  }
  function hp(e, n, r) {
    Kn[Xn++] = ga, Kn[Xn++] = va, Kn[Xn++] = Ga, Ga = e;
    var l = ga;
    e = va;
    var d = 32 - It(l) - 1;
    l &= ~(1 << d), r += 1;
    var h = 32 - It(n) + d;
    if (30 < h) {
      var x = d - d % 5;
      h = (l & (1 << x) - 1).toString(32), l >>= x, d -= x, ga = 1 << 32 - It(n) + d | r << d | l, va = h + e;
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
      Ga = Kn[--Xn], Kn[Xn] = null, va = Kn[--Xn], Kn[Xn] = null, ga = Kn[--Xn], Kn[Xn] = null;
  }
  function mp(e, n) {
    Kn[Xn++] = ga, Kn[Xn++] = va, Kn[Xn++] = Ga, ga = n.id, va = n.overflow, Ga = e;
  }
  var un = null, Lt = null, ft = !1, Ya = null, Qn = !1, _u = Error(i(519));
  function Ka(e) {
    var n = Error(
      i(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw bi(Yn(n, e)), _u;
  }
  function pp(e) {
    var n = e.stateNode, r = e.type, l = e.memoizedProps;
    switch (n[xe] = e, n[Ee] = l, r) {
      case "dialog":
        lt("cancel", n), lt("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        lt("load", n);
        break;
      case "video":
      case "audio":
        for (r = 0; r < Vi.length; r++)
          lt(Vi[r], n);
        break;
      case "source":
        lt("error", n);
        break;
      case "img":
      case "image":
      case "link":
        lt("error", n), lt("load", n);
        break;
      case "details":
        lt("toggle", n);
        break;
      case "input":
        lt("invalid", n), Rm(
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
        lt("invalid", n);
        break;
      case "textarea":
        lt("invalid", n), Mm(n, l.value, l.defaultValue, l.children);
    }
    r = l.children, typeof r != "string" && typeof r != "number" && typeof r != "bigint" || n.textContent === "" + r || l.suppressHydrationWarning === !0 || kv(n.textContent, r) ? (l.popover != null && (lt("beforetoggle", n), lt("toggle", n)), l.onScroll != null && lt("scroll", n), l.onScrollEnd != null && lt("scrollend", n), l.onClick != null && (n.onclick = wa), n = !0) : n = !1, n || Ka(e, !0);
  }
  function gp(e) {
    for (un = e.return; un; )
      switch (un.tag) {
        case 5:
        case 31:
        case 13:
          Qn = !1;
          return;
        case 27:
        case 3:
          Qn = !0;
          return;
        default:
          un = un.return;
      }
  }
  function vs(e) {
    if (e !== un) return !1;
    if (!ft) return gp(e), ft = !0, !1;
    var n = e.tag, r;
    if ((r = n !== 3 && n !== 27) && ((r = n === 5) && (r = e.type, r = !(r !== "form" && r !== "button") || Yd(e.type, e.memoizedProps)), r = !r), r && Lt && Ka(e), gp(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      Lt = Vv(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      Lt = Vv(e);
    } else
      n === 27 ? (n = Lt, or(e.type) ? (e = Jd, Jd = null, Lt = e) : Lt = n) : Lt = un ? Jn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Lr() {
    Lt = un = null, ft = !1;
  }
  function Mu() {
    var e = Ya;
    return e !== null && (Rn === null ? Rn = e : Rn.push.apply(
      Rn,
      e
    ), Ya = null), e;
  }
  function bi(e) {
    Ya === null ? Ya = [e] : Ya.push(e);
  }
  var Au = k(null), $r = null, Ca = null;
  function Xa(e, n, r) {
    ne(Au, n._currentValue), n._currentValue = r;
  }
  function Ta(e) {
    e._currentValue = Au.current, te(Au);
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
    nv = bt(), typeof n == "object" && n !== null && typeof n.then == "function" && Aj(e, n), bp !== null && bp(e, n);
  };
  var Br = k(null);
  function Lu() {
    var e = Br.current;
    return e !== null ? e : _t.pooledCache;
  }
  function Ql(e, n) {
    n === null ? ne(Br, Br.current) : ne(Br, n.pool);
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
    function n(X, V) {
      if (e) {
        var re = X.deletions;
        re === null ? (X.deletions = [V], X.flags |= 16) : re.push(V);
      }
    }
    function r(X, V) {
      if (!e) return null;
      for (; V !== null; )
        n(X, V), V = V.sibling;
      return null;
    }
    function l(X) {
      for (var V = /* @__PURE__ */ new Map(); X !== null; )
        X.key !== null ? V.set(X.key, X) : V.set(X.index, X), X = X.sibling;
      return V;
    }
    function d(X, V) {
      return X = Ea(X, V), X.index = 0, X.sibling = null, X;
    }
    function h(X, V, re) {
      return X.index = re, e ? (re = X.alternate, re !== null ? (re = re.index, re < V ? (X.flags |= 67108866, V) : re) : (X.flags |= 67108866, V)) : (X.flags |= 1048576, V);
    }
    function x(X) {
      return e && X.alternate === null && (X.flags |= 67108866), X;
    }
    function E(X, V, re, he) {
      return V === null || V.tag !== 6 ? (V = Nu(re, X.mode, he), V.return = X, V) : (V = d(V, re), V.return = X, V);
    }
    function L(X, V, re, he) {
      var Ie = re.type;
      return Ie === C ? de(
        X,
        V,
        re.props.children,
        he,
        re.key
      ) : V !== null && (V.elementType === Ie || typeof Ie == "object" && Ie !== null && Ie.$$typeof === M && Ir(Ie) === V.type) ? (V = d(V, re.props), ji(V, re), V.return = X, V) : (V = Gl(
        re.type,
        re.key,
        re.props,
        null,
        X.mode,
        he
      ), ji(V, re), V.return = X, V);
    }
    function se(X, V, re, he) {
      return V === null || V.tag !== 4 || V.stateNode.containerInfo !== re.containerInfo || V.stateNode.implementation !== re.implementation ? (V = Cu(re, X.mode, he), V.return = X, V) : (V = d(V, re.children || []), V.return = X, V);
    }
    function de(X, V, re, he, Ie) {
      return V === null || V.tag !== 7 ? (V = Or(
        re,
        X.mode,
        he,
        Ie
      ), V.return = X, V) : (V = d(V, re), V.return = X, V);
    }
    function me(X, V, re) {
      if (typeof V == "string" && V !== "" || typeof V == "number" || typeof V == "bigint")
        return V = Nu(
          "" + V,
          X.mode,
          re
        ), V.return = X, V;
      if (typeof V == "object" && V !== null) {
        switch (V.$$typeof) {
          case w:
            return re = Gl(
              V.type,
              V.key,
              V.props,
              null,
              X.mode,
              re
            ), ji(re, V), re.return = X, re;
          case j:
            return V = Cu(
              V,
              X.mode,
              re
            ), V.return = X, V;
          case M:
            return V = Ir(V), me(X, V, re);
        }
        if (ie(V) || W(V))
          return V = Or(
            V,
            X.mode,
            re,
            null
          ), V.return = X, V;
        if (typeof V.then == "function")
          return me(X, Wl(V), re);
        if (V.$$typeof === R)
          return me(
            X,
            Xl(X, V),
            re
          );
        eo(X, V);
      }
      return null;
    }
    function le(X, V, re, he) {
      var Ie = V !== null ? V.key : null;
      if (typeof re == "string" && re !== "" || typeof re == "number" || typeof re == "bigint")
        return Ie !== null ? null : E(X, V, "" + re, he);
      if (typeof re == "object" && re !== null) {
        switch (re.$$typeof) {
          case w:
            return re.key === Ie ? L(X, V, re, he) : null;
          case j:
            return re.key === Ie ? se(X, V, re, he) : null;
          case M:
            return re = Ir(re), le(X, V, re, he);
        }
        if (ie(re) || W(re))
          return Ie !== null ? null : de(X, V, re, he, null);
        if (typeof re.then == "function")
          return le(
            X,
            V,
            Wl(re),
            he
          );
        if (re.$$typeof === R)
          return le(
            X,
            V,
            Xl(X, re),
            he
          );
        eo(X, re);
      }
      return null;
    }
    function oe(X, V, re, he, Ie) {
      if (typeof he == "string" && he !== "" || typeof he == "number" || typeof he == "bigint")
        return X = X.get(re) || null, E(V, X, "" + he, Ie);
      if (typeof he == "object" && he !== null) {
        switch (he.$$typeof) {
          case w:
            return X = X.get(
              he.key === null ? re : he.key
            ) || null, L(V, X, he, Ie);
          case j:
            return X = X.get(
              he.key === null ? re : he.key
            ) || null, se(V, X, he, Ie);
          case M:
            return he = Ir(he), oe(
              X,
              V,
              re,
              he,
              Ie
            );
        }
        if (ie(he) || W(he))
          return X = X.get(re) || null, de(V, X, he, Ie, null);
        if (typeof he.then == "function")
          return oe(
            X,
            V,
            re,
            Wl(he),
            Ie
          );
        if (he.$$typeof === R)
          return oe(
            X,
            V,
            re,
            Xl(V, he),
            Ie
          );
        eo(V, he);
      }
      return null;
    }
    function ke(X, V, re, he) {
      for (var Ie = null, mt = null, Le = V, Je = V = 0, ut = null; Le !== null && Je < re.length; Je++) {
        Le.index > Je ? (ut = Le, Le = null) : ut = Le.sibling;
        var pt = le(
          X,
          Le,
          re[Je],
          he
        );
        if (pt === null) {
          Le === null && (Le = ut);
          break;
        }
        e && Le && pt.alternate === null && n(X, Le), V = h(pt, V, Je), mt === null ? Ie = pt : mt.sibling = pt, mt = pt, Le = ut;
      }
      if (Je === re.length)
        return r(X, Le), ft && Na(X, Je), Ie;
      if (Le === null) {
        for (; Je < re.length; Je++)
          Le = me(X, re[Je], he), Le !== null && (V = h(
            Le,
            V,
            Je
          ), mt === null ? Ie = Le : mt.sibling = Le, mt = Le);
        return ft && Na(X, Je), Ie;
      }
      for (Le = l(Le); Je < re.length; Je++)
        ut = oe(
          Le,
          X,
          Je,
          re[Je],
          he
        ), ut !== null && (e && ut.alternate !== null && Le.delete(
          ut.key === null ? Je : ut.key
        ), V = h(
          ut,
          V,
          Je
        ), mt === null ? Ie = ut : mt.sibling = ut, mt = ut);
      return e && Le.forEach(function(hr) {
        return n(X, hr);
      }), ft && Na(X, Je), Ie;
    }
    function He(X, V, re, he) {
      if (re == null) throw Error(i(151));
      for (var Ie = null, mt = null, Le = V, Je = V = 0, ut = null, pt = re.next(); Le !== null && !pt.done; Je++, pt = re.next()) {
        Le.index > Je ? (ut = Le, Le = null) : ut = Le.sibling;
        var hr = le(X, Le, pt.value, he);
        if (hr === null) {
          Le === null && (Le = ut);
          break;
        }
        e && Le && hr.alternate === null && n(X, Le), V = h(hr, V, Je), mt === null ? Ie = hr : mt.sibling = hr, mt = hr, Le = ut;
      }
      if (pt.done)
        return r(X, Le), ft && Na(X, Je), Ie;
      if (Le === null) {
        for (; !pt.done; Je++, pt = re.next())
          pt = me(X, pt.value, he), pt !== null && (V = h(pt, V, Je), mt === null ? Ie = pt : mt.sibling = pt, mt = pt);
        return ft && Na(X, Je), Ie;
      }
      for (Le = l(Le); !pt.done; Je++, pt = re.next())
        pt = oe(Le, X, Je, pt.value, he), pt !== null && (e && pt.alternate !== null && Le.delete(pt.key === null ? Je : pt.key), V = h(pt, V, Je), mt === null ? Ie = pt : mt.sibling = pt, mt = pt);
      return e && Le.forEach(function(HE) {
        return n(X, HE);
      }), ft && Na(X, Je), Ie;
    }
    function Ct(X, V, re, he) {
      if (typeof re == "object" && re !== null && re.type === C && re.key === null && (re = re.props.children), typeof re == "object" && re !== null) {
        switch (re.$$typeof) {
          case w:
            e: {
              for (var Ie = re.key; V !== null; ) {
                if (V.key === Ie) {
                  if (Ie = re.type, Ie === C) {
                    if (V.tag === 7) {
                      r(
                        X,
                        V.sibling
                      ), he = d(
                        V,
                        re.props.children
                      ), he.return = X, X = he;
                      break e;
                    }
                  } else if (V.elementType === Ie || typeof Ie == "object" && Ie !== null && Ie.$$typeof === M && Ir(Ie) === V.type) {
                    r(
                      X,
                      V.sibling
                    ), he = d(V, re.props), ji(he, re), he.return = X, X = he;
                    break e;
                  }
                  r(X, V);
                  break;
                } else n(X, V);
                V = V.sibling;
              }
              re.type === C ? (he = Or(
                re.props.children,
                X.mode,
                he,
                re.key
              ), he.return = X, X = he) : (he = Gl(
                re.type,
                re.key,
                re.props,
                null,
                X.mode,
                he
              ), ji(he, re), he.return = X, X = he);
            }
            return x(X);
          case j:
            e: {
              for (Ie = re.key; V !== null; ) {
                if (V.key === Ie)
                  if (V.tag === 4 && V.stateNode.containerInfo === re.containerInfo && V.stateNode.implementation === re.implementation) {
                    r(
                      X,
                      V.sibling
                    ), he = d(V, re.children || []), he.return = X, X = he;
                    break e;
                  } else {
                    r(X, V);
                    break;
                  }
                else n(X, V);
                V = V.sibling;
              }
              he = Cu(re, X.mode, he), he.return = X, X = he;
            }
            return x(X);
          case M:
            return re = Ir(re), Ct(
              X,
              V,
              re,
              he
            );
        }
        if (ie(re))
          return ke(
            X,
            V,
            re,
            he
          );
        if (W(re)) {
          if (Ie = W(re), typeof Ie != "function") throw Error(i(150));
          return re = Ie.call(re), He(
            X,
            V,
            re,
            he
          );
        }
        if (typeof re.then == "function")
          return Ct(
            X,
            V,
            Wl(re),
            he
          );
        if (re.$$typeof === R)
          return Ct(
            X,
            V,
            Xl(X, re),
            he
          );
        eo(X, re);
      }
      return typeof re == "string" && re !== "" || typeof re == "number" || typeof re == "bigint" ? (re = "" + re, V !== null && V.tag === 6 ? (r(X, V.sibling), he = d(V, re), he.return = X, X = he) : (r(X, V), he = Nu(re, X.mode, he), he.return = X, X = he), x(X)) : r(X, V);
    }
    return function(X, V, re, he) {
      try {
        wi = 0;
        var Ie = Ct(
          X,
          V,
          re,
          he
        );
        return ws = null, Ie;
      } catch (Le) {
        if (Le === Ss || Le === Zl) throw Le;
        var mt = Ln(29, Le, null, X.mode);
        return mt.lanes = he, mt.return = X, mt;
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
      l &= e.pendingLanes, r |= l, n.lanes = r, xt(e, r);
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
      var me = d.baseState;
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
            var ke = e, He = E;
            le = n;
            var Ct = r;
            switch (He.tag) {
              case 1:
                if (ke = He.payload, typeof ke == "function") {
                  me = ke.call(Ct, me, le);
                  break e;
                }
                me = ke;
                break e;
              case 3:
                ke.flags = ke.flags & -65537 | 128;
              case 0:
                if (ke = He.payload, le = typeof ke == "function" ? ke.call(Ct, me, le) : ke, le == null) break e;
                me = v({}, me, le);
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
          }, de === null ? (se = de = oe, L = me) : de = de.next = oe, x |= le;
        if (E = E.next, E === null) {
          if (E = d.shared.pending, E === null)
            break;
          oe = E, E = oe.next, oe.next = null, d.lastBaseUpdate = oe, d.shared.pending = null;
        }
      } while (!0);
      de === null && (L = me), d.baseState = L, d.firstBaseUpdate = se, d.lastBaseUpdate = de, h === null && (d.shared.lanes = 0), ar |= x, e.lanes = x, e.memoizedState = me;
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
    e = La, ne(to, e), ne(js, n), La = e | n.baseLanes;
  }
  function qu() {
    ne(to, La), ne(js, js.current);
  }
  function Hu() {
    La = to.current, te(js), te(to);
  }
  var $n = k(null), Zn = null;
  function Wa(e) {
    var n = e.alternate;
    ne(Yt, Yt.current & 1), ne($n, e), Zn === null && (n === null || js.current !== null || n.memoizedState !== null) && (Zn = e);
  }
  function Fu(e) {
    ne(Yt, Yt.current), ne($n, e), Zn === null && (Zn = e);
  }
  function Mp(e) {
    e.tag === 22 ? (ne(Yt, Yt.current), ne($n, e), Zn === null && (Zn = e)) : er();
  }
  function er() {
    ne(Yt, Yt.current), ne($n, $n.current);
  }
  function Un(e) {
    te($n), Zn === e && (Zn = null), te(Yt);
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
        r[l] = z;
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
      var E = x = null, L = null, se = n, de = !1;
      do {
        var me = se.lane & -536870913;
        if (me !== se.lane ? (ct & me) === me : (Ra & me) === me) {
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
            }), me === bs && (de = !0);
          else if ((Ra & le) === le) {
            se = se.next, le === bs && (de = !0);
            continue;
          } else
            me = {
              lane: 0,
              revertLane: se.revertLane,
              gesture: null,
              action: se.action,
              hasEagerState: se.hasEagerState,
              eagerState: se.eagerState,
              next: null
            }, L === null ? (E = L = me, x = h) : L = L.next = me, Qe.lanes |= le, ar |= le;
          me = se.action, Hr && r(h, me), h = se.hasEagerState ? se.eagerState : r(h, me);
        } else
          le = {
            lane: me,
            revertLane: se.revertLane,
            gesture: se.gesture,
            action: se.action,
            hasEagerState: se.hasEagerState,
            eagerState: se.eagerState,
            next: null
          }, L === null ? (E = L = le, x = h) : L = L.next = le, Qe.lanes |= me, ar |= me;
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
    var l = Qe, d = Kt(), h = ft;
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
    n !== null && _n(n, e, 2);
  }
  function Wu(e) {
    var n = jn();
    if (typeof e == "function") {
      var r = e;
      if (e = r(), Hr) {
        zt(!0);
        try {
          r();
        } finally {
          zt(!1);
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
    if (ft) {
      var r = _t.formState;
      if (r !== null) {
        e: {
          var l = Qe;
          if (ft) {
            if (Lt) {
              t: {
                for (var d = Lt, h = Qn; d.nodeType !== 8; ) {
                  if (!h) {
                    d = null;
                    break t;
                  }
                  if (d = Jn(
                    d.nextSibling
                  ), d === null) {
                    d = null;
                    break t;
                  }
                }
                h = d.data, d = h === "F!" || h === "F" ? d : null;
              }
              if (d) {
                Lt = Jn(
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
      zt(!0);
      try {
        e();
      } finally {
        zt(!1);
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
    var h = H.p;
    H.p = h !== 0 && 8 > h ? h : 8;
    var x = A.T, E = {};
    A.T = E, id(e, !1, n, r);
    try {
      var L = d(), se = A.S;
      if (se !== null && se(E, L), L !== null && typeof L == "object" && typeof L.then == "function") {
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
    } catch (me) {
      _i(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: me },
        Vn()
      );
    } finally {
      H.p = h, x !== null && E.types !== null && (x.types = E.types), A.T = x;
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
      U,
      r === null ? Uj : function() {
        return lg(e), r(l);
      }
    );
  }
  function ig(e) {
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
          l !== null && (_n(l, n, r), Ei(l, n, r)), n = { cache: zu() }, e.payload = n;
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
    }, uo(e) ? dg(n, r) : (r = ju(e, n, r, l), r !== null && (_n(r, e, l), fg(r, n, l)));
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
        return _n(r, e, l), fg(r, n, l), !0;
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
      ), n !== null && _n(n, e, 2);
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
      l &= e.pendingLanes, r |= l, n.lanes = r, xt(e, r);
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
        zt(!0);
        try {
          e();
        } finally {
          zt(!1);
        }
      }
      return r.memoizedState = [l, n], l;
    },
    useReducer: function(e, n, r) {
      var l = jn();
      if (r !== void 0) {
        var d = r(n);
        if (Hr) {
          zt(!0);
          try {
            r(n);
          } finally {
            zt(!1);
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
      if (ft) {
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
      if (ft) {
        var r = va, l = ga;
        r = (l & ~(1 << 32 - It(l) - 1)).toString(32) + r, n = "_" + n + "R_" + r, r = ro++, 0 < r && (n += "H" + r.toString(32)), n += "_";
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
      d.payload = n, r != null && (d.callback = r), n = Ja(e, d, l), n !== null && (_n(n, e, l), Ei(n, e, l));
    },
    enqueueReplaceState: function(e, n, r) {
      e = e._reactInternals;
      var l = Vn(), d = Za(l);
      d.tag = 1, d.payload = n, r != null && (d.callback = r), n = Ja(e, d, l), n !== null && (_n(n, e, l), Ei(n, e, l));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var r = Vn(), l = Za(r);
      l.tag = 2, n != null && (l.callback = n), n = Ja(e, l, r), n !== null && (_n(n, e, r), Ei(n, e, r));
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
            return Zn === null ? Eo() : r.alternate === null && Ft === 0 && (Ft = 3), r.flags &= -257, r.flags |= 65536, r.lanes = d, l === Jl ? r.flags |= 16384 : (n = r.updateQueue, n === null ? r.updateQueue = /* @__PURE__ */ new Set([l]) : n.add(l), Od(e, l, d)), !1;
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
    if (ft)
      return n = $n.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = d, l !== _u && (e = Error(i(422), { cause: l }), bi(Yn(e, r)))) : (l !== _u && (n = Error(i(423), {
        cause: l
      }), bi(
        Yn(n, r)
      )), e = e.current.alternate, e.flags |= 65536, d &= -d, e.lanes |= d, l = Yn(l, r), d = ud(
        e.stateNode,
        l,
        d
      ), Iu(e, d), Ft !== 4 && (Ft = 2)), !1;
    var h = Error(i(520), { cause: l });
    if (h = Yn(h, r), Ui === null ? Ui = [h] : Ui.push(h), Ft !== 4 && (Ft = 2), n === null) return !0;
    l = Yn(l, r), r = n;
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
    ), E = Yu(), e !== null && !en ? (Ku(e, n, d), Ma(e, n, d)) : (ft && E && Tu(n), n.flags |= 1, fn(e, n, l, d), n.child);
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
      if (ft) {
        if (l.mode === "hidden")
          return e = ho(n, l), n.lanes = 536870912, Ai(null, e);
        if (Fu(n), (e = Lt) ? (e = Iv(
          e,
          Qn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Ga !== null ? { id: ga, overflow: va } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = dp(e), r.return = n, n.child = r, un = n, Lt = null)) : e = null, e === null) throw Ka(n);
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
        if (l = _t, l !== null && (x = D(l, r), x !== 0 && x !== h.retryLane))
          throw h.retryLane = x, zr(e, x), _n(l, e, x), dd;
        Eo(), n = Rg(
          e,
          n,
          r
        );
      } else
        e = h.treeContext, Lt = Jn(x.nextSibling), un = n, ft = !0, Ya = null, Qn = !1, e !== null && mp(n, e), n = ho(n, l), n.flags |= 4096;
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
    ), l = Yu(), e !== null && !en ? (Ku(e, n, d), Ma(e, n, d)) : (ft && l && Tu(n), n.flags |= 1, fn(e, n, r, d), n.child);
  }
  function _g(e, n, r, l, d, h) {
    return Ur(n), n.updateQueue = null, r = kp(
      n,
      l,
      r,
      d
    ), Ap(e), l = Yu(), e !== null && !en ? (Ku(e, n, h), Ma(e, n, h)) : (ft && l && Tu(n), n.flags |= 1, fn(e, n, r, h), n.child);
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
      var me = r.getDerivedStateFromProps;
      de = typeof me == "function" || typeof h.getSnapshotBeforeUpdate == "function", E = n.pendingProps !== E, de || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (E || se !== x) && gg(
        n,
        h,
        l,
        x
      ), Qa = !1;
      var le = n.memoizedState;
      h.state = le, Ci(n, l, h, d), Ni(), se = n.memoizedState, E || le !== se || Qa ? (typeof me == "function" && (od(
        n,
        r,
        me,
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
      h = n.stateNode, Bu(e, n), x = n.memoizedProps, de = Fr(r, x), h.props = de, me = n.pendingProps, le = h.context, se = r.contextType, L = ms, typeof se == "object" && se !== null && (L = dn(se)), E = r.getDerivedStateFromProps, (se = typeof E == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (x !== me || le !== L) && gg(
        n,
        h,
        l,
        L
      ), Qa = !1, le = n.memoizedState, h.state = le, Ci(n, l, h, d), Ni();
      var oe = n.memoizedState;
      x !== me || le !== oe || Qa || e !== null && e.dependencies !== null && Kl(e.dependencies) ? (typeof E == "function" && (od(
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
      if (ft) {
        if (d ? Wa(n) : er(), (e = Lt) ? (e = Iv(
          e,
          Qn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Ga !== null ? { id: ga, overflow: va } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = dp(e), r.return = n, n.child = r, un = n, Lt = null)) : e = null, e === null) throw Ka(n);
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
        if (x = _t, x !== null && (l = D(x, r), l !== 0 && l !== L.retryLane))
          throw L.retryLane = l, zr(e, l), _n(x, e, l), dd;
        Qd(E) || Eo(), n = vd(
          e,
          n,
          r
        );
      } else
        Qd(E) ? (n.flags |= 192, n.child = e.child, n = null) : (e = L.treeContext, Lt = Jn(
          E.nextSibling
        ), un = n, ft = !0, Ya = null, Qn = !1, e !== null && mp(n, e), n = gd(
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
    if (E ? (x = x & 1 | 2, n.flags |= 128) : x &= 1, ne(Yt, x), fn(e, n, l, r), l = ft ? yi : 0, !E && e !== null && (e.flags & 128) !== 0)
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
        ot(n);
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
        if (d = n.memoizedState, d !== null && (d.rendering = null, d.tail = null, d.lastEffect = null), ne(Yt, Yt.current), l) break;
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
      en = !1, ft && (n.flags & 1048576) !== 0 && hp(n, yi, n.index);
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
              } else if (d === ee) {
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
            throw n = Q(e) || e, Error(i(306, n, ""));
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
              d = Yn(
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
              for (Lt = Jn(e.firstChild), un = n, ft = !0, Ya = null, Qn = !0, r = Cp(
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
        )) ? n.memoizedState = r : ft || (r = n.type, e = n.pendingProps, l = Ao(
          ae.current
        ).createElement(r), l[xe] = n, l[Ee] = e, hn(l, r, e), kt(l), n.stateNode = l) : n.memoizedState = Gv(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return ot(n), e === null && ft && (l = n.stateNode = Hv(
          n.type,
          n.pendingProps,
          ae.current
        ), un = n, Qn = !0, d = Lt, or(n.type) ? (Jd = d, Lt = Jn(l.firstChild)) : Lt = d), fn(
          e,
          n,
          n.pendingProps.children,
          r
        ), mo(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && ft && ((d = l = Lt) && (l = bE(
          l,
          n.type,
          n.pendingProps,
          Qn
        ), l !== null ? (n.stateNode = l, un = n, Lt = Jn(l.firstChild), Qn = !1, d = !0) : d = !1), d || Ka(n)), ot(n), d = n.type, h = n.pendingProps, x = e !== null ? e.memoizedProps : null, l = h.children, Yd(d, h) ? l = null : x !== null && Yd(d, x) && (n.flags |= 32), n.memoizedState !== null && (d = Gu(
          e,
          n,
          zj,
          null,
          null,
          r
        ), Gi._currentValue = d), mo(e, n), fn(e, n, l, r), n.child;
      case 6:
        return e === null && ft && ((e = r = Lt) && (r = xE(
          r,
          n.pendingProps,
          Qn
        ), r !== null ? (n.stateNode = r, un = n, Lt = null, e = !0) : e = !1), e || Ka(n)), null;
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
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? fe() : 536870912, e.lanes |= n, Ms |= n);
  }
  function ki(e, n) {
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
  function $t(e) {
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
        return $t(n), null;
      case 1:
        return $t(n), null;
      case 3:
        return r = n.stateNode, l = null, e !== null && (l = e.memoizedState.cache), n.memoizedState.cache !== l && (n.flags |= 2048), Ta(Jt), Re(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (vs(n) ? Aa(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Mu())), $t(n), null;
      case 26:
        var d = n.type, h = n.memoizedState;
        return e === null ? (Aa(n), h !== null ? ($t(n), Lg(n, h)) : ($t(n), xd(
          n,
          d,
          null,
          l,
          r
        ))) : h ? h !== e.memoizedState ? (Aa(n), $t(n), Lg(n, h)) : ($t(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== l && Aa(n), $t(n), xd(
          n,
          d,
          e,
          l,
          r
        )), null;
      case 27:
        if (Ne(n), r = ae.current, d = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== l && Aa(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(i(166));
            return $t(n), null;
          }
          e = K.current, vs(n) ? pp(n) : (e = Hv(d, l, r), n.stateNode = e, Aa(n));
        }
        return $t(n), null;
      case 5:
        if (Ne(n), d = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== l && Aa(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(i(166));
            return $t(n), null;
          }
          if (h = K.current, vs(n))
            pp(n);
          else {
            var x = Ao(
              ae.current
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
            h[xe] = n, h[Ee] = l;
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
        return $t(n), xd(
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
          if (e = ae.current, vs(n)) {
            if (e = n.stateNode, r = n.memoizedProps, l = null, d = un, d !== null)
              switch (d.tag) {
                case 27:
                case 5:
                  l = d.memoizedProps;
              }
            e[xe] = n, e = !!(e.nodeValue === r || l !== null && l.suppressHydrationWarning === !0 || kv(e.nodeValue, r)), e || Ka(n, !0);
          } else
            e = Ao(e).createTextNode(
              l
            ), e[xe] = n, n.stateNode = e;
        }
        return $t(n), null;
      case 31:
        if (r = n.memoizedState, e === null || e.memoizedState !== null) {
          if (l = vs(n), r !== null) {
            if (e === null) {
              if (!l) throw Error(i(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(557));
              e[xe] = n;
            } else
              Lr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            $t(n), e = !1;
          } else
            r = Mu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = r), e = !0;
          if (!e)
            return n.flags & 256 ? (Un(n), n) : (Un(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(i(558));
        }
        return $t(n), null;
      case 13:
        if (l = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (d = vs(n), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!d) throw Error(i(318));
              if (d = n.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(i(317));
              d[xe] = n;
            } else
              Lr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            $t(n), d = !1;
          } else
            d = Mu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = d), d = !0;
          if (!d)
            return n.flags & 256 ? (Un(n), n) : (Un(n), null);
        }
        return Un(n), (n.flags & 128) !== 0 ? (n.lanes = r, n) : (r = l !== null, e = e !== null && e.memoizedState !== null, r && (l = n.child, d = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (d = l.alternate.memoizedState.cachePool.pool), h = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (h = l.memoizedState.cachePool.pool), h !== d && (l.flags |= 2048)), r !== e && r && (n.child.flags |= 8192), go(n, n.updateQueue), $t(n), null);
      case 4:
        return Re(), e === null && qd(n.stateNode.containerInfo), $t(n), null;
      case 10:
        return Ta(n.type), $t(n), null;
      case 19:
        if (te(Yt), l = n.memoizedState, l === null) return $t(n), null;
        if (d = (n.flags & 128) !== 0, h = l.rendering, h === null)
          if (d) ki(l, !1);
          else {
            if (Ft !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (h = no(e), h !== null) {
                  for (n.flags |= 128, ki(l, !1), e = h.updateQueue, n.updateQueue = e, go(n, e), n.subtreeFlags = 0, e = r, r = n.child; r !== null; )
                    up(r, e), r = r.sibling;
                  return ne(
                    Yt,
                    Yt.current & 1 | 2
                  ), ft && Na(n, l.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            l.tail !== null && bt() > So && (n.flags |= 128, d = !0, ki(l, !1), n.lanes = 4194304);
          }
        else {
          if (!d)
            if (e = no(h), e !== null) {
              if (n.flags |= 128, d = !0, e = e.updateQueue, n.updateQueue = e, go(n, e), ki(l, !0), l.tail === null && l.tailMode === "hidden" && !h.alternate && !ft)
                return $t(n), null;
            } else
              2 * bt() - l.renderingStartTime > So && r !== 536870912 && (n.flags |= 128, d = !0, ki(l, !1), n.lanes = 4194304);
          l.isBackwards ? (h.sibling = n.child, n.child = h) : (e = l.last, e !== null ? e.sibling = h : n.child = h, l.last = h);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = bt(), e.sibling = null, r = Yt.current, ne(
          Yt,
          d ? r & 1 | 2 : r & 1
        ), ft && Na(n, l.treeForkCount), e) : ($t(n), null);
      case 22:
      case 23:
        return Un(n), Hu(), l = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (n.flags |= 8192) : l && (n.flags |= 8192), l ? (r & 536870912) !== 0 && (n.flags & 128) === 0 && ($t(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : $t(n), r = n.updateQueue, r !== null && go(n, r.retryQueue), r = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== r && (n.flags |= 2048), e !== null && te(Br), null;
      case 24:
        return r = null, e !== null && (r = e.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), Ta(Jt), $t(n), null;
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
        return Ta(Jt), Re(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
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
        return te(Yt), null;
      case 4:
        return Re(), null;
      case 10:
        return Ta(n.type), null;
      case 22:
      case 23:
        return Un(n), Hu(), e !== null && te(Br), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
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
        Ta(Jt), Re();
        break;
      case 26:
      case 27:
      case 5:
        Ne(n);
        break;
      case 4:
        Re();
        break;
      case 31:
        n.memoizedState !== null && Un(n);
        break;
      case 13:
        Un(n);
        break;
      case 19:
        te(Yt);
        break;
      case 10:
        Ta(n.type);
        break;
      case 22:
      case 23:
        Un(n), Hu(), e !== null && te(Br);
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
      wt(n, n.return, E);
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
                wt(
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
      wt(n, n.return, de);
    }
  }
  function Ug(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var r = e.stateNode;
      try {
        Rp(n, r);
      } catch (l) {
        wt(e, e.return, l);
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
      wt(e, n, l);
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
      wt(e, n, d);
    }
  }
  function ya(e, n) {
    var r = e.ref, l = e.refCleanup;
    if (r !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (d) {
          wt(e, n, d);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof r == "function")
        try {
          r(null);
        } catch (d) {
          wt(e, n, d);
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
      wt(e, e.return, d);
    }
  }
  function Sd(e, n, r) {
    try {
      var l = e.stateNode;
      hE(l, e.type, r, n), l[Ee] = n;
    } catch (d) {
      wt(e, e.return, d);
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
      hn(n, l, r), n[xe] = e, n[Ee] = r;
    } catch (h) {
      wt(e, e.return, h);
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
            var x = 0, E = -1, L = -1, se = 0, de = 0, me = e, le = null;
            t: for (; ; ) {
              for (var oe; me !== r || d !== 0 && me.nodeType !== 3 || (E = x + d), me !== h || l !== 0 && me.nodeType !== 3 || (L = x + l), me.nodeType === 3 && (x += me.nodeValue.length), (oe = me.firstChild) !== null; )
                le = me, me = oe;
              for (; ; ) {
                if (me === e) break t;
                if (le === r && ++se === d && (E = x), le === h && ++de === l && (L = x), (oe = me.nextSibling) !== null) break;
                me = le, le = me.parentNode;
              }
              me = oe;
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
                  var ke = Fr(
                    r.type,
                    d
                  );
                  e = l.getSnapshotBeforeUpdate(
                    ke,
                    h
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (He) {
                  wt(
                    r,
                    r.return,
                    He
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
              wt(r, r.return, x);
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
              wt(
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
            wt(r, r.return, x);
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
  var Bt = null, Nn = !1;
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
        var l = Bt, d = Nn;
        or(r.type) && (Bt = r.stateNode, Nn = !1), Da(
          e,
          n,
          r
        ), Hi(r.stateNode), Bt = l, Nn = d;
        break;
      case 5:
        tn || ya(r, n);
      case 6:
        if (l = Bt, d = Nn, Bt = null, Da(
          e,
          n,
          r
        ), Bt = l, Nn = d, Bt !== null)
          if (Nn)
            try {
              (Bt.nodeType === 9 ? Bt.body : Bt.nodeName === "HTML" ? Bt.ownerDocument.body : Bt).removeChild(r.stateNode);
            } catch (h) {
              wt(
                r,
                n,
                h
              );
            }
          else
            try {
              Bt.removeChild(r.stateNode);
            } catch (h) {
              wt(
                r,
                n,
                h
              );
            }
        break;
      case 18:
        Bt !== null && (Nn ? (e = Bt, Uv(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          r.stateNode
        ), Us(e)) : Uv(Bt, r.stateNode));
        break;
      case 4:
        l = Bt, d = Nn, Bt = r.stateNode.containerInfo, Nn = !0, Da(
          e,
          n,
          r
        ), Bt = l, Nn = d;
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
        wt(n, n.return, r);
      }
    }
  }
  function Kg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Us(e);
      } catch (r) {
        wt(n, n.return, r);
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
  function Cn(e, n) {
    var r = n.deletions;
    if (r !== null)
      for (var l = 0; l < r.length; l++) {
        var d = r[l], h = e, x = n, E = x;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (or(E.type)) {
                Bt = E.stateNode, Nn = !1;
                break e;
              }
              break;
            case 5:
              Bt = E.stateNode, Nn = !1;
              break e;
            case 3:
            case 4:
              Bt = E.stateNode.containerInfo, Nn = !0;
              break e;
          }
          E = E.return;
        }
        if (Bt === null) throw Error(i(160));
        Gg(h, x, d), Bt = null, Nn = !1, h = d.alternate, h !== null && (h.return = null), d.return = null;
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
        Cn(n, e), Tn(e), l & 4 && (tr(3, e, e.return), Di(3, e), tr(5, e, e.return));
        break;
      case 1:
        Cn(n, e), Tn(e), l & 512 && (tn || r === null || ya(r, r.return)), l & 64 && ka && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (r = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = r === null ? l : r.concat(l))));
        break;
      case 26:
        var d = oa;
        if (Cn(n, e), Tn(e), l & 512 && (tn || r === null || ya(r, r.return)), l & 4) {
          var h = r !== null ? r.memoizedState : null;
          if (l = e.memoizedState, r === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, r = e.memoizedProps, d = d.ownerDocument || d;
                  t: switch (l) {
                    case "title":
                      h = d.getElementsByTagName("title")[0], (!h || h[et] || h[xe] || h.namespaceURI === "http://www.w3.org/2000/svg" || h.hasAttribute("itemprop")) && (h = d.createElement(l), d.head.insertBefore(
                        h,
                        d.querySelector("head > title")
                      )), hn(h, l, r), h[xe] = e, kt(h), l = h;
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
                  h[xe] = e, kt(h), l = h;
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
        Cn(n, e), Tn(e), l & 512 && (tn || r === null || ya(r, r.return)), r !== null && l & 4 && Sd(
          e,
          e.memoizedProps,
          r.memoizedProps
        );
        break;
      case 5:
        if (Cn(n, e), Tn(e), l & 512 && (tn || r === null || ya(r, r.return)), e.flags & 32) {
          d = e.stateNode;
          try {
            ls(d, "");
          } catch (ke) {
            wt(e, e.return, ke);
          }
        }
        l & 4 && e.stateNode != null && (d = e.memoizedProps, Sd(
          e,
          d,
          r !== null ? r.memoizedProps : d
        )), l & 1024 && (Ed = !0);
        break;
      case 6:
        if (Cn(n, e), Tn(e), l & 4) {
          if (e.stateNode === null)
            throw Error(i(162));
          l = e.memoizedProps, r = e.stateNode;
          try {
            r.nodeValue = l;
          } catch (ke) {
            wt(e, e.return, ke);
          }
        }
        break;
      case 3:
        if (zo = null, d = oa, oa = ko(n.containerInfo), Cn(n, e), oa = d, Tn(e), l & 4 && r !== null && r.memoizedState.isDehydrated)
          try {
            Us(n.containerInfo);
          } catch (ke) {
            wt(e, e.return, ke);
          }
        Ed && (Ed = !1, Qg(e));
        break;
      case 4:
        l = oa, oa = ko(
          e.stateNode.containerInfo
        ), Cn(n, e), Tn(e), oa = l;
        break;
      case 12:
        Cn(n, e), Tn(e);
        break;
      case 31:
        Cn(n, e), Tn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, yo(e, l)));
        break;
      case 13:
        Cn(n, e), Tn(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (xo = bt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, yo(e, l)));
        break;
      case 22:
        d = e.memoizedState !== null;
        var L = r !== null && r.memoizedState !== null, se = ka, de = tn;
        if (ka = se || d, tn = de || L, Cn(n, e), tn = de, ka = se, Tn(e), l & 8192)
          e: for (n = e.stateNode, n._visibility = d ? n._visibility & -2 : n._visibility | 1, d && (r === null || L || ka || tn || Pr(e)), r = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (r === null) {
                L = r = n;
                try {
                  if (h = L.stateNode, d)
                    x = h.style, typeof x.setProperty == "function" ? x.setProperty("display", "none", "important") : x.display = "none";
                  else {
                    E = L.stateNode;
                    var me = L.memoizedProps.style, le = me != null && me.hasOwnProperty("display") ? me.display : null;
                    E.style.display = le == null || typeof le == "boolean" ? "" : ("" + le).trim();
                  }
                } catch (ke) {
                  wt(L, L.return, ke);
                }
              }
            } else if (n.tag === 6) {
              if (r === null) {
                L = n;
                try {
                  L.stateNode.nodeValue = d ? "" : L.memoizedProps;
                } catch (ke) {
                  wt(L, L.return, ke);
                }
              }
            } else if (n.tag === 18) {
              if (r === null) {
                L = n;
                try {
                  var oe = L.stateNode;
                  d ? Bv(oe, !0) : Bv(L.stateNode, !1);
                } catch (ke) {
                  wt(L, L.return, ke);
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
        Cn(n, e), Tn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, yo(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Cn(n, e), Tn(e);
    }
  }
  function Tn(e) {
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
        wt(e, e.return, de);
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
              wt(l, l.return, se);
            }
          if (l = h, d = l.updateQueue, d !== null) {
            var E = l.stateNode;
            try {
              var L = d.shared.hiddenCallbacks;
              if (L !== null)
                for (d.shared.hiddenCallbacks = null, d = 0; d < L.length; d++)
                  Tp(L[d], E);
            } catch (se) {
              wt(l, l.return, se);
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
            wt(n, n.return, L);
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
  }, Xj = typeof WeakMap == "function" ? WeakMap : Map, vt = 0, _t = null, it = null, ct = 0, St = 0, Bn = null, nr = !1, _s = !1, Td = !1, La = 0, Ft = 0, ar = 0, Gr = 0, Rd = 0, In = 0, Ms = 0, Ui = null, Rn = null, _d = !1, xo = 0, nv = 0, So = 1 / 0, wo = null, rr = null, rn = 0, sr = null, As = null, $a = 0, Md = 0, Ad = null, av = null, Bi = 0, kd = null;
  function Vn() {
    return (vt & 2) !== 0 && ct !== 0 ? ct & -ct : A.T !== null ? Ud() : ve();
  }
  function rv() {
    if (In === 0)
      if ((ct & 536870912) === 0 || ft) {
        var e = ue;
        ue <<= 1, (ue & 3932160) === 0 && (ue = 262144), In = e;
      } else In = 536870912;
    return e = $n.current, e !== null && (e.flags |= 32), In;
  }
  function _n(e, n, r) {
    (e === _t && (St === 2 || St === 9) || e.cancelPendingCommit !== null) && (ks(e, 0), ir(
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
    var l = !r && (n & 127) === 0 && (n & e.expiredLanes) === 0 || Ge(e, n), d = l ? Jj(e, n) : zd(e, n, !0), h = l;
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
                h = Rn, Rn = d, h !== null && (Rn === null ? Rn = h : Rn.push.apply(
                  Rn,
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
              Rn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(i(329));
          }
          if ((n & 62914560) === n && (d = xo + 300 - bt(), 10 < d)) {
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
                Rn,
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
            Rn,
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
  function iv(e, n, r, l, d, h, x, E, L, se, de, me, le, oe) {
    if (e.timeoutHandle = -1, me = n.subtreeFlags, me & 8192 || (me & 16785408) === 16785408) {
      me = {
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
        me
      );
      var ke = (h & 62914560) === h ? xo - bt() : (h & 4194048) === h ? nv - bt() : 0;
      if (ke = zE(
        me,
        ke
      ), ke !== null) {
        $a = h, e.cancelPendingCommit = ke(
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
            me,
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
      var h = 31 - It(d), x = 1 << h;
      l[h] = -1, d &= ~x;
    }
    r !== 0 && gt(e, r, n);
  }
  function jo() {
    return (vt & 6) === 0 ? (Ii(0), !1) : !0;
  }
  function Dd() {
    if (it !== null) {
      if (St === 0)
        var e = it.return;
      else
        e = it, Ca = $r = null, Xu(e), ws = null, wi = 0, e = it;
      for (; e !== null; )
        $g(e.alternate, e), e = e.return;
      it = null;
    }
  }
  function ks(e, n) {
    var r = e.timeoutHandle;
    r !== -1 && (e.timeoutHandle = -1, gE(r)), r = e.cancelPendingCommit, r !== null && (e.cancelPendingCommit = null, r()), $a = 0, Dd(), _t = e, it = r = Ea(e.current, null), ct = n, St = 0, Bn = null, nr = !1, _s = Ge(e, n), Td = !1, Ms = In = Rd = Gr = ar = Ft = 0, Rn = Ui = null, _d = !1, (n & 8) !== 0 && (n |= n & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= n; 0 < l; ) {
        var d = 31 - It(l), h = 1 << d;
        n |= e[d], l &= ~h;
      }
    return La = n, Hl(), r;
  }
  function lv(e, n) {
    Qe = null, A.H = Mi, n === Ss || n === Zl ? (n = jp(), St = 3) : n === $u ? (n = jp(), St = 4) : St = n === dd ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Bn = n, it === null && (Ft = 1, fo(
      e,
      Yn(n, e.current)
    ));
  }
  function ov() {
    var e = $n.current;
    return e === null ? !0 : (ct & 4194048) === ct ? Zn === null : (ct & 62914560) === ct || (ct & 536870912) !== 0 ? e === Zn : !1;
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
        if (St !== 0 && it !== null) {
          var E = it, L = Bn;
          switch (St) {
            case 8:
              Dd(), x = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              $n.current === null && (n = !0);
              var se = St;
              if (St = 0, Bn = null, Ds(e, E, L, se), r && _s) {
                x = 0;
                break e;
              }
              break;
            default:
              se = St, St = 0, Bn = null, Ds(e, E, L, se);
          }
        }
        Zj(), x = Ft;
        break;
      } catch (de) {
        lv(e, de);
      }
    while (!0);
    return n && e.shellSuspendCounter++, Ca = $r = null, vt = l, A.H = d, A.A = h, it === null && (_t = null, ct = 0, Hl()), x;
  }
  function Zj() {
    for (; it !== null; ) dv(it);
  }
  function Jj(e, n) {
    var r = vt;
    vt |= 2;
    var l = cv(), d = uv();
    _t !== e || ct !== n ? (wo = null, So = bt() + 500, ks(e, n)) : _s = Ge(
      e,
      n
    );
    e: do
      try {
        if (St !== 0 && it !== null) {
          n = it;
          var h = Bn;
          t: switch (St) {
            case 1:
              St = 0, Bn = null, Ds(e, n, h, 1);
              break;
            case 2:
            case 9:
              if (Sp(h)) {
                St = 0, Bn = null, fv(n);
                break;
              }
              n = function() {
                St !== 2 && St !== 9 || _t !== e || (St = 7), ba(e);
              }, h.then(n, n);
              break e;
            case 3:
              St = 7;
              break e;
            case 4:
              St = 5;
              break e;
            case 7:
              Sp(h) ? (St = 0, Bn = null, fv(n)) : (St = 0, Bn = null, Ds(e, n, h, 7));
              break;
            case 5:
              var x = null;
              switch (it.tag) {
                case 26:
                  x = it.memoizedState;
                case 5:
                case 27:
                  var E = it;
                  if (x ? Zv(x) : E.stateNode.complete) {
                    St = 0, Bn = null;
                    var L = E.sibling;
                    if (L !== null) it = L;
                    else {
                      var se = E.return;
                      se !== null ? (it = se, No(se)) : it = null;
                    }
                    break t;
                  }
              }
              St = 0, Bn = null, Ds(e, n, h, 5);
              break;
            case 6:
              St = 0, Bn = null, Ds(e, n, h, 6);
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
    return Ca = $r = null, A.H = l, A.A = d, vt = r, it !== null ? 0 : (_t = null, ct = 0, Hl(), Ft);
  }
  function Wj() {
    for (; it !== null && !Xe(); )
      dv(it);
  }
  function dv(e) {
    var n = Og(e.alternate, e, La);
    e.memoizedProps = e.pendingProps, n === null ? No(e) : it = n;
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
        $g(r, n), n = it = up(n, La), n = Og(r, n, La);
    }
    e.memoizedProps = e.pendingProps, n === null ? No(e) : it = n;
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
          Yn(r, e.current)
        ), it = null;
        return;
      }
    } catch (h) {
      if (d !== null) throw it = d, h;
      Ft = 1, fo(
        e,
        Yn(r, e.current)
      ), it = null;
      return;
    }
    n.flags & 32768 ? (ft || l === 1 ? e = !0 : _s || (ct & 536870912) !== 0 ? e = !1 : (nr = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = $n.current, l !== null && l.tag === 13 && (l.flags |= 16384))), hv(n, e)) : No(n);
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
        it = r;
        return;
      }
      if (n = n.sibling, n !== null) {
        it = n;
        return;
      }
      it = n = e;
    } while (n !== null);
    Ft === 0 && (Ft = 5);
  }
  function hv(e, n) {
    do {
      var r = Pj(e.alternate, e);
      if (r !== null) {
        r.flags &= 32767, it = r;
        return;
      }
      if (r = e.return, r !== null && (r.flags |= 32768, r.subtreeFlags = 0, r.deletions = null), !n && (e = e.sibling, e !== null)) {
        it = e;
        return;
      }
      it = e = r;
    } while (e !== null);
    Ft = 6, it = null;
  }
  function mv(e, n, r, l, d, h, x, E, L) {
    e.cancelPendingCommit = null;
    do
      Co();
    while (rn !== 0);
    if ((vt & 6) !== 0) throw Error(i(327));
    if (n !== null) {
      if (n === e.current) throw Error(i(177));
      if (h = n.lanes | n.childLanes, h |= wu, Ye(
        e,
        r,
        h,
        x,
        E,
        L
      ), e === _t && (it = _t = null, ct = 0), As = n, sr = e, $a = r, Md = h, Ad = d, av = l, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, aE(rt, function() {
        return bv(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || l) {
        l = A.T, A.T = null, d = H.p, H.p = 2, x = vt, vt |= 4;
        try {
          Gj(e, n, r);
        } finally {
          vt = x, H.p = d, A.T = l;
        }
      }
      rn = 1, pv(), gv(), vv();
    }
  }
  function pv() {
    if (rn === 1) {
      rn = 0;
      var e = sr, n = As, r = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || r) {
        r = A.T, A.T = null;
        var l = H.p;
        H.p = 2;
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
                var me = E.ownerDocument || document, le = me && me.defaultView || window;
                if (le.getSelection) {
                  var oe = le.getSelection(), ke = E.textContent.length, He = Math.min(L.start, ke), Ct = L.end === void 0 ? He : Math.min(L.end, ke);
                  !oe.extend && He > Ct && (x = Ct, Ct = He, He = x);
                  var X = Wm(
                    E,
                    He
                  ), V = Wm(
                    E,
                    Ct
                  );
                  if (X && V && (oe.rangeCount !== 1 || oe.anchorNode !== X.node || oe.anchorOffset !== X.offset || oe.focusNode !== V.node || oe.focusOffset !== V.offset)) {
                    var re = me.createRange();
                    re.setStart(X.node, X.offset), oe.removeAllRanges(), He > Ct ? (oe.addRange(re), oe.extend(V.node, V.offset)) : (re.setEnd(V.node, V.offset), oe.addRange(re));
                  }
                }
              }
            }
            for (me = [], oe = E; oe = oe.parentNode; )
              oe.nodeType === 1 && me.push({
                element: oe,
                left: oe.scrollLeft,
                top: oe.scrollTop
              });
            for (typeof E.focus == "function" && E.focus(), E = 0; E < me.length; E++) {
              var he = me[E];
              he.element.scrollLeft = he.left, he.element.scrollTop = he.top;
            }
          }
          Uo = !!Pd, Gd = Pd = null;
        } finally {
          vt = d, H.p = l, A.T = r;
        }
      }
      e.current = n, rn = 2;
    }
  }
  function gv() {
    if (rn === 2) {
      rn = 0;
      var e = sr, n = As, r = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || r) {
        r = A.T, A.T = null;
        var l = H.p;
        H.p = 2;
        var d = vt;
        vt |= 4;
        try {
          Fg(e, n.alternate, n);
        } finally {
          vt = d, H.p = l, A.T = r;
        }
      }
      rn = 3;
    }
  }
  function vv() {
    if (rn === 4 || rn === 3) {
      rn = 0, at();
      var e = sr, n = As, r = $a, l = av;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? rn = 5 : (rn = 0, As = sr = null, yv(e, e.pendingLanes));
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
        n = A.T, d = H.p, H.p = 2, A.T = null;
        try {
          for (var h = e.onRecoverableError, x = 0; x < l.length; x++) {
            var E = l[x];
            h(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          A.T = n, H.p = d;
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
    if (rn !== 5) return !1;
    var e = sr, n = Md;
    Md = 0;
    var r = Z($a), l = A.T, d = H.p;
    try {
      H.p = 32 > r ? 32 : r, A.T = null, r = Ad, Ad = null;
      var h = sr, x = $a;
      if (rn = 0, As = sr = null, $a = 0, (vt & 6) !== 0) throw Error(i(331));
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
      H.p = d, A.T = l, yv(e, n);
    }
  }
  function xv(e, n, r) {
    n = Yn(r, n), n = ud(e.stateNode, n, 2), e = Ja(e, n, 2), e !== null && (_e(e, 2), ba(e));
  }
  function wt(e, n, r) {
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
            e = Yn(r, e), r = Sg(2), l = Ja(n, r, 2), l !== null && (wg(
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
    l !== null && l.delete(n), e.pingedLanes |= e.suspendedLanes & r, e.warmLanes &= ~r, _t === e && (ct & r) === r && (Ft === 4 || Ft === 3 && (ct & 62914560) === ct && 300 > bt() - xo ? (vt & 2) === 0 && ks(e, 0) : Rd |= r, Ms === ct && (Ms = 0)), ba(e);
  }
  function Sv(e, n) {
    n === 0 && (n = fe()), e = zr(e, n), e !== null && (_e(e, n), ba(e));
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
    return dt(e, n);
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
              h = (1 << 31 - It(42 | e) + 1) - 1, h &= d & ~(x & ~E), h = h & 201326741 ? h & 201326741 | 1 : h ? h | 2 : 0;
            }
            h !== 0 && (r = !0, Nv(l, h));
          } else
            h = ct, h = ge(
              l,
              l === _t ? h : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (h & 3) === 0 || Ge(l, h) || (r = !0, Nv(l, h));
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
    for (var n = bt(), r = null, l = To; l !== null; ) {
      var d = l.next, h = jv(l, n);
      h === 0 ? (l.next = null, r === null ? To = d : r.next = d, d === null && (zs = r)) : (r = l, (e !== 0 || (h & 3) !== 0) && (Ro = !0)), l = d;
    }
    rn !== 0 && rn !== 5 || Ii(e), lr !== 0 && (lr = 0);
  }
  function jv(e, n) {
    for (var r = e.suspendedLanes, l = e.pingedLanes, d = e.expirationTimes, h = e.pendingLanes & -62914561; 0 < h; ) {
      var x = 31 - It(h), E = 1 << x, L = d[x];
      L === -1 ? ((E & r) === 0 || (E & l) !== 0) && (d[x] = q(E, n)) : L <= n && (e.expiredLanes |= E), h &= ~E;
    }
    if (n = _t, r = ct, r = ge(
      e,
      e === n ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, r === 0 || e === n && (St === 2 || St === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && At(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((r & 3) === 0 || Ge(e, r)) {
      if (n = r & -r, n === e.callbackPriority) return n;
      switch (l !== null && At(l), Z(r)) {
        case 2:
        case 8:
          r = Fe;
          break;
        case 32:
          r = rt;
          break;
        case 268435456:
          r = Tt;
          break;
        default:
          r = rt;
      }
      return l = Ev.bind(null, e), r = dt(r, l), e.callbackPriority = n, e.callbackNode = r, n;
    }
    return l !== null && l !== null && At(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Ev(e, n) {
    if (rn !== 0 && rn !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var r = e.callbackNode;
    if (Co() && e.callbackNode !== r)
      return null;
    var l = ct;
    return l = ge(
      e,
      e === _t ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (sv(e, l, n), jv(e, bt()), e.callbackNode != null && e.callbackNode === r ? Ev.bind(null, e) : null);
  }
  function Nv(e, n) {
    if (Co()) return null;
    sv(e, n, !0);
  }
  function sE() {
    vE(function() {
      (vt & 6) !== 0 ? dt(
        $e,
        rE
      ) : wv();
    });
  }
  function Ud() {
    if (lr === 0) {
      var e = bs;
      e === 0 && (e = wn, wn <<= 1, (wn & 261888) === 0 && (wn = 256)), lr = e;
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
  function lt(e, n) {
    var r = n[Te];
    r === void 0 && (r = n[Te] = /* @__PURE__ */ new Set());
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
      var se = h, de = iu(r), me = [];
      e: {
        var le = op.get(e);
        if (le !== void 0) {
          var oe = Bl, ke = e;
          switch (e) {
            case "keypress":
              if ($l(r) === 0) break e;
            case "keydown":
            case "keyup":
              oe = nj;
              break;
            case "focusin":
              ke = "focus", oe = fu;
              break;
            case "focusout":
              ke = "blur", oe = fu;
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
          var He = (n & 4) !== 0, Ct = !He && (e === "scroll" || e === "scrollend"), X = He ? le !== null ? le + "Capture" : null : le;
          He = [];
          for (var V = se, re; V !== null; ) {
            var he = V;
            if (re = he.stateNode, he = he.tag, he !== 5 && he !== 26 && he !== 27 || re === null || X === null || (he = ci(V, X), he != null && He.push(
              qi(V, he, re)
            )), Ct) break;
            V = V.return;
          }
          0 < He.length && (le = new oe(
            le,
            ke,
            null,
            r,
            de
          ), me.push({ event: le, listeners: He }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (le = e === "mouseover" || e === "pointerover", oe = e === "mouseout" || e === "pointerout", le && r !== su && (ke = r.relatedTarget || r.fromElement) && (jt(ke) || ke[Oe]))
            break e;
          if ((oe || le) && (le = de.window === de ? de : (le = de.ownerDocument) ? le.defaultView || le.parentWindow : window, oe ? (ke = r.relatedTarget || r.toElement, oe = se, ke = ke ? jt(ke) : null, ke !== null && (Ct = u(ke), He = ke.tag, ke !== Ct || He !== 5 && He !== 27 && He !== 6) && (ke = null)) : (oe = null, ke = se), oe !== ke)) {
            if (He = $m, he = "onMouseLeave", X = "onMouseEnter", V = "mouse", (e === "pointerout" || e === "pointerover") && (He = Bm, he = "onPointerLeave", X = "onPointerEnter", V = "pointer"), Ct = oe == null ? le : st(oe), re = ke == null ? le : st(ke), le = new He(
              he,
              V + "leave",
              oe,
              r,
              de
            ), le.target = Ct, le.relatedTarget = re, he = null, jt(de) === se && (He = new He(
              X,
              V + "enter",
              ke,
              r,
              de
            ), He.target = re, He.relatedTarget = Ct, he = He), Ct = he, oe && ke)
              t: {
                for (He = uE, X = oe, V = ke, re = 0, he = X; he; he = He(he))
                  re++;
                he = 0;
                for (var Ie = V; Ie; Ie = He(Ie))
                  he++;
                for (; 0 < re - he; )
                  X = He(X), re--;
                for (; 0 < he - re; )
                  V = He(V), he--;
                for (; re--; ) {
                  if (X === V || V !== null && X === V.alternate) {
                    He = X;
                    break t;
                  }
                  X = He(X), V = He(V);
                }
                He = null;
              }
            else He = null;
            oe !== null && Mv(
              me,
              le,
              oe,
              He,
              !1
            ), ke !== null && Ct !== null && Mv(
              me,
              Ct,
              ke,
              He,
              !0
            );
          }
        }
        e: {
          if (le = se ? st(se) : window, oe = le.nodeName && le.nodeName.toLowerCase(), oe === "select" || oe === "input" && le.type === "file")
            var mt = Ym;
          else if (Pm(le))
            if (Km)
              mt = Sj;
            else {
              mt = bj;
              var Le = yj;
            }
          else
            oe = le.nodeName, !oe || oe.toLowerCase() !== "input" || le.type !== "checkbox" && le.type !== "radio" ? se && ru(se.elementType) && (mt = Ym) : mt = xj;
          if (mt && (mt = mt(e, se))) {
            Gm(
              me,
              mt,
              r,
              de
            );
            break e;
          }
          Le && Le(e, le, se), e === "focusout" && se && le.type === "number" && se.memoizedProps.value != null && au(le, "number", le.value);
        }
        switch (Le = se ? st(se) : window, e) {
          case "focusin":
            (Pm(Le) || Le.contentEditable === "true") && (ds = Le, yu = se, vi = null);
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
            bu = !1, np(me, r, de);
            break;
          case "selectionchange":
            if (jj) break;
          case "keydown":
          case "keyup":
            np(me, r, de);
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
        ut && (Im && r.locale !== "ko" && (us || ut !== "onCompositionStart" ? ut === "onCompositionEnd" && us && (Je = Om()) : (Pa = de, cu = "value" in Pa ? Pa.value : Pa.textContent, us = !0)), Le = Mo(se, ut), 0 < Le.length && (ut = new Um(
          ut,
          e,
          null,
          r,
          de
        ), me.push({ event: ut, listeners: Le }), Je ? ut.data = Je : (Je = Fm(r), Je !== null && (ut.data = Je)))), (Je = hj ? mj(e, r) : pj(e, r)) && (ut = Mo(se, "onBeforeInput"), 0 < ut.length && (Le = new Um(
          "onBeforeInput",
          "beforeinput",
          null,
          r,
          de
        ), me.push({
          event: Le,
          listeners: ut
        }), Le.data = Je)), iE(
          me,
          e,
          se,
          r,
          de
        );
      }
      Rv(me, n);
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
        l != null && lt("scroll", e);
        break;
      case "onScrollEnd":
        l != null && lt("scrollend", e);
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
        lt("beforetoggle", e), lt("toggle", e), tt(e, "popover", l);
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
        l != null && lt("scroll", e);
        break;
      case "onScrollEnd":
        l != null && lt("scrollend", e);
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
        lt("error", e), lt("load", e);
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
        lt("invalid", e);
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
                  Nt(e, n, l, de, r, null);
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
        lt("invalid", e), l = x = h = null;
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
        lt("invalid", e), h = d = l = null;
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
        lt("beforetoggle", e), lt("toggle", e), lt("cancel", e), lt("close", e);
        break;
      case "iframe":
      case "object":
        lt("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Vi.length; l++)
          lt(Vi[l], e);
        break;
      case "image":
        lt("error", e), lt("load", e);
        break;
      case "details":
        lt("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        lt("error", e), lt("load", e);
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
                Nt(e, n, se, l, r, null);
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
        var d = null, h = null, x = null, E = null, L = null, se = null, de = null;
        for (oe in r) {
          var me = r[oe];
          if (r.hasOwnProperty(oe) && me != null)
            switch (oe) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                L = me;
              default:
                l.hasOwnProperty(oe) || Nt(e, n, oe, null, l, me);
            }
        }
        for (var le in l) {
          var oe = l[le];
          if (me = r[le], l.hasOwnProperty(le) && (oe != null || me != null))
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
                oe !== me && Nt(
                  e,
                  n,
                  le,
                  oe,
                  l,
                  me
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
        for (var ke in r)
          if (le = r[ke], r.hasOwnProperty(ke) && le != null && !l.hasOwnProperty(ke))
            switch (ke) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Nt(
                  e,
                  n,
                  ke,
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
        for (var He in r)
          le = r[He], r.hasOwnProperty(He) && le != null && !l.hasOwnProperty(He) && Nt(e, n, He, null, l, le);
        for (se in l)
          if (le = l[se], oe = r[se], l.hasOwnProperty(se) && le !== oe && (le != null || oe != null))
            switch (se) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (le != null)
                  throw Error(i(137, n));
                break;
              default:
                Nt(
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
    for (me in l)
      le = l[me], oe = r[me], !l.hasOwnProperty(me) || le === oe || le == null && oe == null || Nt(e, n, me, le, l, oe);
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
            var L = r[l], se = L.startTime;
            if (se > E) break;
            var de = L.transferSize, me = L.initiatorType;
            de && Dv(me) && (L = L.responseEnd, x += de * (L < E ? 1 : (E - se) / (L - se)));
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
      if (e = Jn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function xE(e, n, r) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !r || (e = Jn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Iv(e, n) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Jn(e.nextSibling), e === null)) return null;
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
  function Jn(e) {
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
            return Jn(e.nextSibling);
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
  var Wn = /* @__PURE__ */ new Map(), Fv = /* @__PURE__ */ new Set();
  function ko(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Ua = H.d;
  H.d = {
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
    var n = Ut(e);
    n !== null && n.tag === 5 && n.type === "form" ? lg(n) : Ua.r(e);
  }
  var Os = typeof document > "u" ? null : document;
  function Pv(e, n, r) {
    var l = Os;
    if (l && typeof n == "string" && n) {
      var d = Pn(n);
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
      var d = 'link[rel="preload"][as="' + Pn(n) + '"]';
      n === "image" && r && r.imageSrcSet ? (d += '[imagesrcset="' + Pn(
        r.imageSrcSet
      ) + '"]', typeof r.imageSizes == "string" && (d += '[imagesizes="' + Pn(
        r.imageSizes
      ) + '"]')) : d += '[href="' + Pn(e) + '"]';
      var h = d;
      switch (n) {
        case "style":
          h = Ls(e);
          break;
        case "script":
          h = $s(e);
      }
      Wn.has(h) || (e = v(
        {
          rel: "preload",
          href: n === "image" && r && r.imageSrcSet ? void 0 : e,
          as: n
        },
        r
      ), Wn.set(h, e), l.querySelector(d) !== null || n === "style" && l.querySelector(Fi(h)) || n === "script" && l.querySelector(Pi(h)) || (n = l.createElement("link"), hn(n, "link", e), kt(n), l.head.appendChild(n)));
    }
  }
  function TE(e, n) {
    Ua.m(e, n);
    var r = Os;
    if (r && e) {
      var l = n && typeof n.as == "string" ? n.as : "script", d = 'link[rel="modulepreload"][as="' + Pn(l) + '"][href="' + Pn(e) + '"]', h = d;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          h = $s(e);
      }
      if (!Wn.has(h) && (e = v({ rel: "modulepreload", href: e }, n), Wn.set(h, e), r.querySelector(d) === null)) {
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
          ), (r = Wn.get(h)) && Wd(e, r);
          var L = x = l.createElement("link");
          kt(L), hn(L, "link", e), L._p = new Promise(function(se, de) {
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
  function _E(e, n) {
    Ua.X(e, n);
    var r = Os;
    if (r && e) {
      var l = Qt(r).hoistableScripts, d = $s(e), h = l.get(d);
      h || (h = r.querySelector(Pi(d)), h || (e = v({ src: e, async: !0 }, n), (n = Wn.get(d)) && ef(e, n), h = r.createElement("script"), kt(h), hn(h, "link", e), r.head.appendChild(h)), h = {
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
      h || (h = r.querySelector(Pi(d)), h || (e = v({ src: e, async: !0, type: "module" }, n), (n = Wn.get(d)) && ef(e, n), h = r.createElement("script"), kt(h), hn(h, "link", e), r.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(d, h));
    }
  }
  function Gv(e, n, r, l) {
    var d = (d = ae.current) ? ko(d) : null;
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
          )) && !h._p && (x.instance = h, x.state.loading = 5), Wn.has(e) || (r = {
            rel: "preload",
            as: "style",
            href: r.href,
            crossOrigin: r.crossOrigin,
            integrity: r.integrity,
            media: r.media,
            hrefLang: r.hrefLang,
            referrerPolicy: r.referrerPolicy
          }, Wn.set(e, r), h || AE(
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
    return 'href="' + Pn(e) + '"';
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
    return '[src="' + Pn(e) + '"]';
  }
  function Pi(e) {
    return "script[async]" + e;
  }
  function Kv(e, n, r) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + Pn(r.href) + '"]'
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
          l = Yv(r), (d = Wn.get(d)) && Wd(l, d), h = (e.ownerDocument || e).createElement("link"), kt(h);
          var x = h;
          return x._p = new Promise(function(E, L) {
            x.onload = E, x.onerror = L;
          }), hn(h, "link", l), n.state.loading |= 4, Do(h, r.precedence, e), n.instance = h;
        case "script":
          return h = $s(r.src), (d = e.querySelector(
            Pi(h)
          )) ? (n.instance = d, kt(d), d) : (l = r, (d = Wn.get(h)) && (l = v({}, r), ef(l, d)), e = e.ownerDocument || e, d = e.createElement("script"), kt(d), hn(d, "link", l), e.head.appendChild(d), n.instance = d);
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
      if (!(h[et] || h[xe] || e === "link" && h.getAttribute("rel") === "stylesheet") && h.namespaceURI !== "http://www.w3.org/2000/svg") {
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
        h = n.ownerDocument || n, l = Yv(l), (d = Wn.get(d)) && Wd(l, d), h = h.createElement("link"), kt(h);
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
    _currentValue: U,
    _currentValue2: U,
    _threadCount: 0
  };
  function LE(e, n, r, l, d, h, x, E, L) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = De(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = De(0), this.hiddenUpdates = De(null), this.identifierPrefix = l, this.onUncaughtError = d, this.onCaughtError = h, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = L, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Jv(e, n, r, l, d, h, x, E, L, se, de, me) {
    return e = new LE(
      e,
      n,
      r,
      x,
      L,
      se,
      de,
      me,
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
    d = Wv(d), l.context === null ? l.context = d : l.pendingContext = d, l = Za(n), l.payload = { element: r }, h = h === void 0 ? null : h, h !== null && (l.callback = h), r = Ja(e, l, n), r !== null && (_n(r, e, n), Ei(r, e, n));
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
      n !== null && _n(n, e, 67108864), nf(e, 67108864);
    }
  }
  function ay(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Vn();
      n = P(n);
      var r = zr(e, n);
      r !== null && _n(r, e, n), nf(e, n);
    }
  }
  var Uo = !0;
  function $E(e, n, r, l) {
    var d = A.T;
    A.T = null;
    var h = H.p;
    try {
      H.p = 2, af(e, n, r, l);
    } finally {
      H.p = h, A.T = d;
    }
  }
  function UE(e, n, r, l) {
    var d = A.T;
    A.T = null;
    var h = H.p;
    try {
      H.p = 8, af(e, n, r, l);
    } finally {
      H.p = h, A.T = d;
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
          var h = Ut(d);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (h = h.stateNode, h.current.memoizedState.isDehydrated) {
                  var x = je(h.pendingLanes);
                  if (x !== 0) {
                    var E = h;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; x; ) {
                      var L = 1 << 31 - It(x);
                      E.entanglements[1] |= L, x &= ~L;
                    }
                    ba(h), (vt & 6) === 0 && (So = bt() + 500, Ii(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = zr(h, 2), E !== null && _n(E, h, 2), jo(), nf(h, 2);
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
        switch (Se()) {
          case $e:
            return 2;
          case Fe:
            return 8;
          case rt:
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
    }, n !== null && (n = Ut(n), n !== null && ny(n)), e) : (e.eventSystemFlags |= l, n = e.targetContainers, d !== null && n.indexOf(d) === -1 && n.push(d), e);
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
        return n = Ut(r), n !== null && ny(n), e.blockedOn = r, !1;
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
          var h = Ut(r);
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
      ey(e.current, 2, null, e, null, null), jo(), n[Oe] = null;
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
  H.findDOMNode = function(e) {
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
    ), e[Oe] = n.current, qd(e), new of(n);
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
    ), n.context = Wv(null), r = n.current, l = Vn(), l = P(l), d = Za(l), d.callback = null, Ja(r, d, l), r = l, n.current.lanes = r, _e(n, r), ba(n), e[Oe] = n.current, qd(e), new Ho(n);
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
  let o = typeof a == "string" ? fa(a) : a, u = ra(o.pathname || "/", s);
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
    let v = ta([i, b.relativePath]), S = s.concat(b);
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
      pathname: ta([u, v.pathname]),
      pathnameBase: CN(
        ta([u, v.pathnameBase])
      ),
      route: S
    }), v.pathnameBase !== "/" && (u = ta([u, v.pathnameBase]));
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
function ra(t, a) {
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
  return a === "/" ? t : ta([t, a]);
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
var Bh = (t) => t.replace(/\/\/+/g, "/"), ta = (t) => Bh(t.join("/")), Cc = (t) => t.replace(/\/+$/, ""), CN = (t) => Cc(t).replace(/^\/*/, "/"), TN = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, RN = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, _N = (t, a = 302) => {
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
  return ta(a) || "/";
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
      let u = new URL(window.location.href), f = s.startsWith("//") ? new URL(u.protocol + s) : new URL(s), m = ra(f.pathname, a);
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
    let D = t.unstable_instrumentations;
    u = (P) => ({
      ...o(P),
      ...MN(
        D.map((Z) => Z.route).filter(Boolean),
        P
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
  }, S = null, w = /* @__PURE__ */ new Set(), j = null, C = null, _ = null, T = t.hydrationData != null, O = xr(m, t.history.location, p), R = !1, N = null, $, Y;
  if (O == null && !t.patchRoutesOnNavigation) {
    let D = ea(404, {
      pathname: t.history.location.pathname
    }), { matches: P, route: Z } = Po(m);
    $ = !0, Y = !$, O = P, N = { [Z.id]: D };
  } else if (O && !t.hydrationData && De(
    O,
    m,
    t.history.location.pathname
  ).active && (O = null), O)
    if (O.some((D) => D.route.lazy))
      $ = !1, Y = !$;
    else if (!O.some((D) => Ih(D.route)))
      $ = !0, Y = !$;
    else {
      let D = t.hydrationData ? t.hydrationData.loaderData : null, P = t.hydrationData ? t.hydrationData.errors : null, Z = O;
      if (P) {
        let ve = O.findIndex(
          (ye) => P[ye.route.id] !== void 0
        );
        Z = Z.slice(0, ve + 1);
      }
      Y = !1, $ = !0, Z.forEach((ve) => {
        let ye = l1(ve.route, D, P);
        Y = Y || ye.renderFallback, $ = $ && !ye.shouldLoad;
      });
    }
  else {
    $ = !1, Y = !$, O = [];
    let D = De(
      null,
      m,
      t.history.location.pathname
    );
    D.active && D.matches && (R = !0, O = D.matches);
  }
  let ee, M = {
    historyAction: t.history.action,
    location: t.history.location,
    matches: O,
    initialized: $,
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
  }, I = "POP", z = null, F = !1, W, G = !1, Q = /* @__PURE__ */ new Map(), ie = null, A = !1, H = !1, U = /* @__PURE__ */ new Set(), J = /* @__PURE__ */ new Map(), pe = 0, k = -1, te = /* @__PURE__ */ new Map(), ne = /* @__PURE__ */ new Set(), K = /* @__PURE__ */ new Map(), B = /* @__PURE__ */ new Map(), ae = /* @__PURE__ */ new Set(), ce = /* @__PURE__ */ new Map(), be, Re = null;
  function ot() {
    if (S = t.history.listen(
      ({ action: D, location: P, delta: Z }) => {
        if (be) {
          be(), be = void 0;
          return;
        }
        Xt(
          ce.size === 0 || Z != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ve = Me({
          currentLocation: M.location,
          nextLocation: P,
          historyAction: D
        });
        if (ve && Z != null) {
          let ye = new Promise((Ae) => {
            be = Ae;
          });
          t.history.go(Z * -1), ue(ve, {
            state: "blocked",
            location: P,
            proceed() {
              ue(ve, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: P
              }), ye.then(() => t.history.go(Z));
            },
            reset() {
              let Ae = new Map(M.blockers);
              Ae.set(ve, Ji), Be({ blockers: Ae });
            }
          }), z?.resolve(), z = null;
          return;
        }
        return Mt(D, P);
      }
    ), s) {
      dC(a, Q);
      let D = () => fC(a, Q);
      a.addEventListener("pagehide", D), ie = () => a.removeEventListener("pagehide", D);
    }
    return M.initialized || Mt("POP", M.location, {
      initialHydration: !0
    }), ee;
  }
  function Ne() {
    S && S(), ie && ie(), w.clear(), W && W.abort(), M.fetchers.forEach((D, P) => pn(P)), M.blockers.forEach((D, P) => wn(P));
  }
  function We(D) {
    return w.add(D), () => w.delete(D);
  }
  function Be(D, P = {}) {
    D.matches && (D.matches = D.matches.map((ye) => {
      let Ae = f[ye.route.id], xe = ye.route;
      return xe.element !== Ae.element || xe.errorElement !== Ae.errorElement || xe.hydrateFallbackElement !== Ae.hydrateFallbackElement ? {
        ...ye,
        route: Ae
      } : ye;
    })), M = {
      ...M,
      ...D
    };
    let Z = [], ve = [];
    M.fetchers.forEach((ye, Ae) => {
      ye.state === "idle" && (ae.has(Ae) ? Z.push(Ae) : ve.push(Ae));
    }), ae.forEach((ye) => {
      !M.fetchers.has(ye) && !J.has(ye) && Z.push(ye);
    }), [...w].forEach(
      (ye) => ye(M, {
        deletedFetchers: Z,
        newErrors: D.errors ?? null,
        viewTransitionOpts: P.viewTransitionOpts,
        flushSync: P.flushSync === !0
      })
    ), Z.forEach((ye) => pn(ye)), ve.forEach((ye) => M.fetchers.delete(ye));
  }
  function Pe(D, P, { flushSync: Z } = {}) {
    let ve = M.actionData != null && M.navigation.formMethod != null && bn(M.navigation.formMethod) && M.navigation.state === "loading" && D.state?._isRedirect !== !0, ye;
    P.actionData ? Object.keys(P.actionData).length > 0 ? ye = P.actionData : ye = null : ve ? ye = M.actionData : ye = null;
    let Ae = P.loaderData ? Uy(
      M.loaderData,
      P.loaderData,
      P.matches || [],
      P.errors
    ) : M.loaderData, xe = M.blockers;
    xe.size > 0 && (xe = new Map(xe), xe.forEach((qe, Ue) => xe.set(Ue, Ji)));
    let Ee = A ? !1 : fe(D, P.matches || M.matches), Oe = F === !0 || M.navigation.formMethod != null && bn(M.navigation.formMethod) && D.state?._isRedirect !== !0;
    y && (m = y, y = void 0), A || I === "POP" || (I === "PUSH" ? t.history.push(D, D.state) : I === "REPLACE" && t.history.replace(D, D.state));
    let Te;
    if (I === "POP") {
      let qe = Q.get(M.location.pathname);
      qe && qe.has(D.pathname) ? Te = {
        currentLocation: M.location,
        nextLocation: D
      } : Q.has(D.pathname) && (Te = {
        currentLocation: D,
        nextLocation: M.location
      });
    } else if (G) {
      let qe = Q.get(M.location.pathname);
      qe ? qe.add(D.pathname) : (qe = /* @__PURE__ */ new Set([D.pathname]), Q.set(M.location.pathname, qe)), Te = {
        currentLocation: M.location,
        nextLocation: D
      };
    }
    Be(
      {
        ...P,
        // matches, errors, fetchers go through as-is
        actionData: ye,
        loaderData: Ae,
        historyAction: I,
        location: D,
        initialized: !0,
        renderFallback: !1,
        navigation: vf,
        revalidation: "idle",
        restoreScrollPosition: Ee,
        preventScrollReset: Oe,
        blockers: xe
      },
      {
        viewTransitionOpts: Te,
        flushSync: Z === !0
      }
    ), I = "POP", F = !1, G = !1, A = !1, H = !1, z?.resolve(), z = null, Re?.resolve(), Re = null;
  }
  async function sn(D, P) {
    if (z?.resolve(), z = null, typeof D == "number") {
      z || (z = qy());
      let Rt = z.promise;
      return t.history.go(D), Rt;
    }
    let Z = ah(
      M.location,
      M.matches,
      p,
      D,
      P?.fromRouteId,
      P?.relative
    ), { path: ve, submission: ye, error: Ae } = Ry(
      !1,
      Z,
      P
    ), xe;
    P?.unstable_mask && (xe = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof P.unstable_mask == "string" ? fa(P.unstable_mask) : {
        ...M.location.unstable_mask,
        ...P.unstable_mask
      }
    });
    let Ee = M.location, Oe = nh(
      Ee,
      ve,
      P && P.state,
      void 0,
      xe
    );
    Oe = {
      ...Oe,
      ...t.history.encodeLocation(Oe)
    };
    let Te = P && P.replace != null ? P.replace : void 0, qe = "PUSH";
    Te === !0 ? qe = "REPLACE" : Te === !1 || ye != null && bn(ye.formMethod) && ye.formAction === M.location.pathname + M.location.search && (qe = "REPLACE");
    let Ue = P && "preventScrollReset" in P ? P.preventScrollReset === !0 : void 0, ht = (P && P.flushSync) === !0, et = Me({
      currentLocation: Ee,
      nextLocation: Oe,
      historyAction: qe
    });
    if (et) {
      ue(et, {
        state: "blocked",
        location: Oe,
        proceed() {
          ue(et, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: Oe
          }), sn(D, P);
        },
        reset() {
          let Rt = new Map(M.blockers);
          Rt.set(et, Ji), Be({ blockers: Rt });
        }
      });
      return;
    }
    await Mt(qe, Oe, {
      submission: ye,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Ae,
      preventScrollReset: Ue,
      replace: P && P.replace,
      enableViewTransition: P && P.viewTransition,
      flushSync: ht,
      callSiteDefaultShouldRevalidate: P && P.unstable_defaultShouldRevalidate
    });
  }
  function qt() {
    Re || (Re = qy()), rt(), Be({ revalidation: "loading" });
    let D = Re.promise;
    return M.navigation.state === "submitting" ? D : M.navigation.state === "idle" ? (Mt(M.historyAction, M.location, {
      startUninterruptedRevalidation: !0
    }), D) : (Mt(
      I || M.historyAction,
      M.navigation.location,
      {
        overrideNavigation: M.navigation,
        // Proxy through any rending view transition
        enableViewTransition: G === !0
      }
    ), D);
  }
  async function Mt(D, P, Z) {
    W && W.abort(), W = null, I = D, A = (Z && Z.startUninterruptedRevalidation) === !0, q(M.location, M.matches), F = (Z && Z.preventScrollReset) === !0, G = (Z && Z.enableViewTransition) === !0;
    let ve = y || m, ye = Z && Z.overrideNavigation, Ae = Z?.initialHydration && M.matches && M.matches.length > 0 && !R ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      M.matches
    ) : xr(ve, P, p), xe = (Z && Z.flushSync) === !0;
    if (Ae && M.initialized && !H && tC(M.location, P) && !(Z && Z.submission && bn(Z.submission.formMethod))) {
      Pe(P, { matches: Ae }, { flushSync: xe });
      return;
    }
    let Ee = De(Ae, ve, P.pathname);
    if (Ee.active && Ee.matches && (Ae = Ee.matches), !Ae) {
      let { error: jt, notFoundMatches: Ut, route: st } = je(
        P.pathname
      );
      Pe(
        P,
        {
          matches: Ut,
          loaderData: {},
          errors: {
            [st.id]: jt
          }
        },
        { flushSync: xe }
      );
      return;
    }
    W = new AbortController();
    let Oe = Hs(
      t.history,
      P,
      W.signal,
      Z && Z.submission
    ), Te = t.getContext ? await t.getContext() : new wy(), qe;
    if (Z && Z.pendingError)
      qe = [
        Sr(Ae).route.id,
        { type: "error", error: Z.pendingError }
      ];
    else if (Z && Z.submission && bn(Z.submission.formMethod)) {
      let jt = await Ce(
        Oe,
        P,
        Z.submission,
        Ae,
        Te,
        Ee.active,
        Z && Z.initialHydration === !0,
        { replace: Z.replace, flushSync: xe }
      );
      if (jt.shortCircuited)
        return;
      if (jt.pendingActionResult) {
        let [Ut, st] = jt.pendingActionResult;
        if (qn(st) && vl(st.error) && st.error.status === 404) {
          W = null, Pe(P, {
            matches: jt.matches,
            loaderData: {},
            errors: {
              [Ut]: st.error
            }
          });
          return;
        }
      }
      Ae = jt.matches || Ae, qe = jt.pendingActionResult, ye = yf(P, Z.submission), xe = !1, Ee.active = !1, Oe = Hs(
        t.history,
        Oe.url,
        Oe.signal
      );
    }
    let {
      shortCircuited: Ue,
      matches: ht,
      loaderData: et,
      errors: Rt
    } = await Ve(
      Oe,
      P,
      Ae,
      Te,
      Ee.active,
      ye,
      Z && Z.submission,
      Z && Z.fetcherSubmission,
      Z && Z.replace,
      Z && Z.initialHydration === !0,
      xe,
      qe,
      Z && Z.callSiteDefaultShouldRevalidate
    );
    Ue || (W = null, Pe(P, {
      matches: ht || Ae,
      ...By(qe),
      loaderData: et,
      errors: Rt
    }));
  }
  async function Ce(D, P, Z, ve, ye, Ae, xe, Ee = {}) {
    rt();
    let Oe = cC(P, Z);
    if (Be({ navigation: Oe }, { flushSync: Ee.flushSync === !0 }), Ae) {
      let Ue = await _e(
        ve,
        P.pathname,
        D.signal
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
        ve = Ue.matches;
      else {
        let { notFoundMatches: ht, error: et, route: Rt } = je(
          P.pathname
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
    let Te, qe = gc(ve, P);
    if (!qe.route.action && !qe.route.lazy)
      Te = {
        type: "error",
        error: ea(405, {
          method: D.method,
          pathname: P.pathname,
          routeId: qe.route.id
        })
      };
    else {
      let Ue = Xs(
        u,
        f,
        D,
        P,
        ve,
        qe,
        xe ? [] : i,
        ye
      ), ht = await $e(
        D,
        P,
        Ue,
        ye,
        null
      );
      if (Te = ht[qe.route.id], !Te) {
        for (let et of ve)
          if (ht[et.route.id]) {
            Te = ht[et.route.id];
            break;
          }
      }
      if (D.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Xr(Te)) {
      let Ue;
      return Ee && Ee.replace != null ? Ue = Ee.replace : Ue = Oy(
        Te.response.headers.get("Location"),
        new URL(D.url),
        p,
        t.history
      ) === M.location.pathname + M.location.search, await Se(D, Te, !0, {
        submission: Z,
        replace: Ue
      }), { shortCircuited: !0 };
    }
    if (qn(Te)) {
      let Ue = Sr(ve, qe.route.id);
      return (Ee && Ee.replace) !== !0 && (I = "PUSH"), {
        matches: ve,
        pendingActionResult: [
          Ue.route.id,
          Te,
          qe.route.id
        ]
      };
    }
    return {
      matches: ve,
      pendingActionResult: [qe.route.id, Te]
    };
  }
  async function Ve(D, P, Z, ve, ye, Ae, xe, Ee, Oe, Te, qe, Ue, ht) {
    let et = Ae || yf(P, xe), Rt = xe || Ee || Vy(et), jt = !A && !Te;
    if (ye) {
      if (jt) {
        let Gt = dt(Ue);
        Be(
          {
            navigation: et,
            ...Gt !== void 0 ? { actionData: Gt } : {}
          },
          {
            flushSync: qe
          }
        );
      }
      let tt = await _e(
        Z,
        P.pathname,
        D.signal
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
        Z = tt.matches;
      else {
        let { error: Gt, notFoundMatches: gn, route: Zt } = je(
          P.pathname
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
    let Ut = y || m, { dsMatches: st, revalidatingFetchers: Qt } = _y(
      D,
      ve,
      u,
      f,
      t.history,
      M,
      Z,
      Rt,
      P,
      Te ? [] : i,
      Te === !0,
      H,
      U,
      ae,
      K,
      ne,
      Ut,
      p,
      t.patchRoutesOnNavigation != null,
      Ue,
      ht
    );
    if (k = ++pe, !t.dataStrategy && !st.some((tt) => tt.shouldLoad) && !st.some(
      (tt) => tt.route.middleware && tt.route.middleware.length > 0
    ) && Qt.length === 0) {
      let tt = Dn();
      return Pe(
        P,
        {
          matches: Z,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Ue && qn(Ue[1]) ? { [Ue[0]]: Ue[1].error } : null,
          ...By(Ue),
          ...tt ? { fetchers: new Map(M.fetchers) } : {}
        },
        { flushSync: qe }
      ), { shortCircuited: !0 };
    }
    if (jt) {
      let tt = {};
      if (!ye) {
        tt.navigation = et;
        let Gt = dt(Ue);
        Gt !== void 0 && (tt.actionData = Gt);
      }
      Qt.length > 0 && (tt.fetchers = At(Qt)), Be(tt, { flushSync: qe });
    }
    Qt.forEach((tt) => {
      zt(tt.key), tt.controller && J.set(tt.key, tt.controller);
    });
    let kt = () => Qt.forEach((tt) => zt(tt.key));
    W && W.signal.addEventListener(
      "abort",
      kt
    );
    let { loaderResults: Fa, fetcherResults: ia } = await Fe(
      st,
      Qt,
      D,
      P,
      ve
    );
    if (D.signal.aborted)
      return { shortCircuited: !0 };
    W && W.signal.removeEventListener(
      "abort",
      kt
    ), Qt.forEach((tt) => J.delete(tt.key));
    let ln = Go(Fa);
    if (ln)
      return await Se(D, ln.result, !0, {
        replace: Oe
      }), { shortCircuited: !0 };
    if (ln = Go(ia), ln)
      return ne.add(ln.key), await Se(D, ln.result, !0, {
        replace: Oe
      }), { shortCircuited: !0 };
    let { loaderData: ma, errors: _r } = $y(
      M,
      Z,
      Fa,
      Ue,
      Qt,
      ia
    );
    Te && M.errors && (_r = { ...M.errors, ..._r });
    let pa = Dn(), Mr = zn(k), as = pa || Mr || Qt.length > 0;
    return {
      matches: Z,
      loaderData: ma,
      errors: _r,
      ...as ? { fetchers: new Map(M.fetchers) } : {}
    };
  }
  function dt(D) {
    if (D && !qn(D[1]))
      return {
        [D[0]]: D[1].data
      };
    if (M.actionData)
      return Object.keys(M.actionData).length === 0 ? null : M.actionData;
  }
  function At(D) {
    return D.forEach((P) => {
      let Z = M.fetchers.get(P.key), ve = Wi(
        void 0,
        Z ? Z.data : void 0
      );
      M.fetchers.set(P.key, ve);
    }), new Map(M.fetchers);
  }
  async function Xe(D, P, Z, ve) {
    zt(D);
    let ye = (ve && ve.flushSync) === !0, Ae = y || m, xe = ah(
      M.location,
      M.matches,
      p,
      Z,
      P,
      ve?.relative
    ), Ee = xr(Ae, xe, p), Oe = De(Ee, Ae, xe);
    if (Oe.active && Oe.matches && (Ee = Oe.matches), !Ee) {
      Tt(
        D,
        P,
        ea(404, { pathname: xe }),
        { flushSync: ye }
      );
      return;
    }
    let { path: Te, submission: qe, error: Ue } = Ry(
      !0,
      xe,
      ve
    );
    if (Ue) {
      Tt(D, P, Ue, { flushSync: ye });
      return;
    }
    let ht = t.getContext ? await t.getContext() : new wy(), et = (ve && ve.preventScrollReset) === !0;
    if (qe && bn(qe.formMethod)) {
      await at(
        D,
        P,
        Te,
        Ee,
        ht,
        Oe.active,
        ye,
        et,
        qe,
        ve && ve.unstable_defaultShouldRevalidate
      );
      return;
    }
    K.set(D, { routeId: P, path: Te }), await bt(
      D,
      P,
      Te,
      Ee,
      ht,
      Oe.active,
      ye,
      et,
      qe
    );
  }
  async function at(D, P, Z, ve, ye, Ae, xe, Ee, Oe, Te) {
    rt(), K.delete(D);
    let qe = M.fetchers.get(D);
    yt(D, uC(Oe, qe), {
      flushSync: xe
    });
    let Ue = new AbortController(), ht = Hs(
      t.history,
      Z,
      Ue.signal,
      Oe
    );
    if (Ae) {
      let Ot = await _e(
        ve,
        new URL(ht.url).pathname,
        ht.signal,
        D
      );
      if (Ot.type === "aborted")
        return;
      if (Ot.type === "error") {
        Tt(D, P, Ot.error, { flushSync: xe });
        return;
      } else if (Ot.matches)
        ve = Ot.matches;
      else {
        Tt(
          D,
          P,
          ea(404, { pathname: Z }),
          { flushSync: xe }
        );
        return;
      }
    }
    let et = gc(ve, Z);
    if (!et.route.action && !et.route.lazy) {
      let Ot = ea(405, {
        method: Oe.formMethod,
        pathname: Z,
        routeId: P
      });
      Tt(D, P, Ot, { flushSync: xe });
      return;
    }
    J.set(D, Ue);
    let Rt = pe, jt = Xs(
      u,
      f,
      ht,
      Z,
      ve,
      et,
      i,
      ye
    ), Ut = await $e(
      ht,
      Z,
      jt,
      ye,
      D
    ), st = Ut[et.route.id];
    if (!st) {
      for (let Ot of jt)
        if (Ut[Ot.route.id]) {
          st = Ut[Ot.route.id];
          break;
        }
    }
    if (ht.signal.aborted) {
      J.get(D) === Ue && J.delete(D);
      return;
    }
    if (ae.has(D)) {
      if (Xr(st) || qn(st)) {
        yt(D, Ba(void 0));
        return;
      }
    } else {
      if (Xr(st))
        if (J.delete(D), k > Rt) {
          yt(D, Ba(void 0));
          return;
        } else
          return ne.add(D), yt(D, Wi(Oe)), Se(ht, st, !1, {
            fetcherSubmission: Oe,
            preventScrollReset: Ee
          });
      if (qn(st)) {
        Tt(D, P, st.error);
        return;
      }
    }
    let Qt = M.navigation.location || M.location, kt = Hs(
      t.history,
      Qt,
      Ue.signal
    ), Fa = y || m, ia = M.navigation.state !== "idle" ? xr(Fa, M.navigation.location, p) : M.matches;
    nt(ia, "Didn't find any matches after fetcher action");
    let ln = ++pe;
    te.set(D, ln);
    let ma = Wi(Oe, st.data);
    M.fetchers.set(D, ma);
    let { dsMatches: _r, revalidatingFetchers: pa } = _y(
      kt,
      ye,
      u,
      f,
      t.history,
      M,
      ia,
      Oe,
      Qt,
      i,
      !1,
      H,
      U,
      ae,
      K,
      ne,
      Fa,
      p,
      t.patchRoutesOnNavigation != null,
      [et.route.id, st],
      Te
    );
    pa.filter((Ot) => Ot.key !== D).forEach((Ot) => {
      let rs = Ot.key, ss = M.fetchers.get(rs), Dl = Wi(
        void 0,
        ss ? ss.data : void 0
      );
      M.fetchers.set(rs, Dl), zt(rs), Ot.controller && J.set(rs, Ot.controller);
    }), Be({ fetchers: new Map(M.fetchers) });
    let Mr = () => pa.forEach((Ot) => zt(Ot.key));
    Ue.signal.addEventListener(
      "abort",
      Mr
    );
    let { loaderResults: as, fetcherResults: tt } = await Fe(
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
    ), te.delete(D), J.delete(D), pa.forEach((Ot) => J.delete(Ot.key)), M.fetchers.has(D)) {
      let Ot = Ba(st.data);
      M.fetchers.set(D, Ot);
    }
    let Gt = Go(as);
    if (Gt)
      return Se(
        kt,
        Gt.result,
        !1,
        { preventScrollReset: Ee }
      );
    if (Gt = Go(tt), Gt)
      return ne.add(Gt.key), Se(
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
    zn(ln), M.navigation.state === "loading" && ln > k ? (nt(I, "Expected pending action"), W && W.abort(), Pe(M.navigation.location, {
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
    }), H = !1);
  }
  async function bt(D, P, Z, ve, ye, Ae, xe, Ee, Oe) {
    let Te = M.fetchers.get(D);
    yt(
      D,
      Wi(
        Oe,
        Te ? Te.data : void 0
      ),
      { flushSync: xe }
    );
    let qe = new AbortController(), Ue = Hs(
      t.history,
      Z,
      qe.signal
    );
    if (Ae) {
      let st = await _e(
        ve,
        new URL(Ue.url).pathname,
        Ue.signal,
        D
      );
      if (st.type === "aborted")
        return;
      if (st.type === "error") {
        Tt(D, P, st.error, { flushSync: xe });
        return;
      } else if (st.matches)
        ve = st.matches;
      else {
        Tt(
          D,
          P,
          ea(404, { pathname: Z }),
          { flushSync: xe }
        );
        return;
      }
    }
    let ht = gc(ve, Z);
    J.set(D, qe);
    let et = pe, Rt = Xs(
      u,
      f,
      Ue,
      Z,
      ve,
      ht,
      i,
      ye
    ), jt = await $e(
      Ue,
      Z,
      Rt,
      ye,
      D
    ), Ut = jt[ht.route.id];
    if (!Ut) {
      for (let st of ve)
        if (jt[st.route.id]) {
          Ut = jt[st.route.id];
          break;
        }
    }
    if (J.get(D) === qe && J.delete(D), !Ue.signal.aborted) {
      if (ae.has(D)) {
        yt(D, Ba(void 0));
        return;
      }
      if (Xr(Ut))
        if (k > et) {
          yt(D, Ba(void 0));
          return;
        } else {
          ne.add(D), await Se(Ue, Ut, !1, {
            preventScrollReset: Ee
          });
          return;
        }
      if (qn(Ut)) {
        Tt(D, P, Ut.error);
        return;
      }
      yt(D, Ba(Ut.data));
    }
  }
  async function Se(D, P, Z, {
    submission: ve,
    fetcherSubmission: ye,
    preventScrollReset: Ae,
    replace: xe
  } = {}) {
    Z || (z?.resolve(), z = null), P.response.headers.has("X-Remix-Revalidate") && (H = !0);
    let Ee = P.response.headers.get("Location");
    nt(Ee, "Expected a Location header on the redirect Response"), Ee = Oy(
      Ee,
      new URL(D.url),
      p,
      t.history
    );
    let Oe = nh(M.location, Ee, {
      _isRedirect: !0
    });
    if (s) {
      let Rt = !1;
      if (P.response.headers.has("X-Remix-Reload-Document"))
        Rt = !0;
      else if ($h(Ee)) {
        const jt = sN(Ee, !0);
        Rt = // Hard reload if it's an absolute URL to a new origin
        jt.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        ra(jt.pathname, p) == null;
      }
      if (Rt) {
        xe ? a.location.replace(Ee) : a.location.assign(Ee);
        return;
      }
    }
    W = null;
    let Te = xe === !0 || P.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: qe, formAction: Ue, formEncType: ht } = M.navigation;
    !ve && !ye && qe && Ue && ht && (ve = Vy(M.navigation));
    let et = ve || ye;
    if (BN.has(P.response.status) && et && bn(et.formMethod))
      await Mt(Te, Oe, {
        submission: {
          ...et,
          formAction: Ee
        },
        // Preserve these flags across redirects
        preventScrollReset: Ae || F,
        enableViewTransition: Z ? G : void 0
      });
    else {
      let Rt = yf(
        Oe,
        ve
      );
      await Mt(Te, Oe, {
        overrideNavigation: Rt,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: ye,
        // Preserve these flags across redirects
        preventScrollReset: Ae || F,
        enableViewTransition: Z ? G : void 0
      });
    }
  }
  async function $e(D, P, Z, ve, ye) {
    let Ae, xe = {};
    try {
      Ae = await XN(
        b,
        D,
        P,
        Z,
        ye,
        ve,
        !1
      );
    } catch (Ee) {
      return Z.filter((Oe) => Oe.shouldLoad).forEach((Oe) => {
        xe[Oe.route.id] = {
          type: "error",
          error: Ee
        };
      }), xe;
    }
    if (D.signal.aborted)
      return xe;
    if (!bn(D.method))
      for (let Ee of Z) {
        if (Ae[Ee.route.id]?.type === "error")
          break;
        !Ae.hasOwnProperty(Ee.route.id) && !M.loaderData.hasOwnProperty(Ee.route.id) && (!M.errors || !M.errors.hasOwnProperty(Ee.route.id)) && Ee.shouldCallHandler() && (Ae[Ee.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${Ee.route.id}`
          )
        });
      }
    for (let [Ee, Oe] of Object.entries(Ae))
      if (sC(Oe)) {
        let Te = Oe.result;
        xe[Ee] = {
          type: "redirect",
          response: WN(
            Te,
            D,
            Ee,
            Z,
            p
          )
        };
      } else
        xe[Ee] = await JN(Oe);
    return xe;
  }
  async function Fe(D, P, Z, ve, ye) {
    let Ae = $e(
      Z,
      ve,
      D,
      ye,
      null
    ), xe = Promise.all(
      P.map(async (Te) => {
        if (Te.matches && Te.match && Te.request && Te.controller) {
          let Ue = (await $e(
            Te.request,
            Te.path,
            Te.matches,
            ye,
            Te.key
          ))[Te.match.route.id];
          return { [Te.key]: Ue };
        } else
          return Promise.resolve({
            [Te.key]: {
              type: "error",
              error: ea(404, {
                pathname: Te.path
              })
            }
          });
      })
    ), Ee = await Ae, Oe = (await xe).reduce(
      (Te, qe) => Object.assign(Te, qe),
      {}
    );
    return {
      loaderResults: Ee,
      fetcherResults: Oe
    };
  }
  function rt() {
    H = !0, K.forEach((D, P) => {
      J.has(P) && U.add(P), zt(P);
    });
  }
  function yt(D, P, Z = {}) {
    M.fetchers.set(D, P), Be(
      { fetchers: new Map(M.fetchers) },
      { flushSync: (Z && Z.flushSync) === !0 }
    );
  }
  function Tt(D, P, Z, ve = {}) {
    let ye = Sr(M.matches, P);
    pn(D), Be(
      {
        errors: {
          [ye.route.id]: Z
        },
        fetchers: new Map(M.fetchers)
      },
      { flushSync: (ve && ve.flushSync) === !0 }
    );
  }
  function kn(D) {
    return B.set(D, (B.get(D) || 0) + 1), ae.has(D) && ae.delete(D), M.fetchers.get(D) || IN;
  }
  function Sn(D, P) {
    zt(D, P?.reason), yt(D, Ba(null));
  }
  function pn(D) {
    let P = M.fetchers.get(D);
    J.has(D) && !(P && P.state === "loading" && te.has(D)) && zt(D), K.delete(D), te.delete(D), ne.delete(D), ae.delete(D), U.delete(D), M.fetchers.delete(D);
  }
  function Pt(D) {
    let P = (B.get(D) || 0) - 1;
    P <= 0 ? (B.delete(D), ae.add(D)) : B.set(D, P), Be({ fetchers: new Map(M.fetchers) });
  }
  function zt(D, P) {
    let Z = J.get(D);
    Z && (Z.abort(P), J.delete(D));
  }
  function It(D) {
    for (let P of D) {
      let Z = kn(P), ve = Ba(Z.data);
      M.fetchers.set(P, ve);
    }
  }
  function Dn() {
    let D = [], P = !1;
    for (let Z of ne) {
      let ve = M.fetchers.get(Z);
      nt(ve, `Expected fetcher: ${Z}`), ve.state === "loading" && (ne.delete(Z), D.push(Z), P = !0);
    }
    return It(D), P;
  }
  function zn(D) {
    let P = [];
    for (let [Z, ve] of te)
      if (ve < D) {
        let ye = M.fetchers.get(Z);
        nt(ye, `Expected fetcher: ${Z}`), ye.state === "loading" && (zt(Z), te.delete(Z), P.push(Z));
      }
    return It(P), P.length > 0;
  }
  function cn(D, P) {
    let Z = M.blockers.get(D) || Ji;
    return ce.get(D) !== P && ce.set(D, P), Z;
  }
  function wn(D) {
    M.blockers.delete(D), ce.delete(D);
  }
  function ue(D, P) {
    let Z = M.blockers.get(D) || Ji;
    nt(
      Z.state === "unblocked" && P.state === "blocked" || Z.state === "blocked" && P.state === "blocked" || Z.state === "blocked" && P.state === "proceeding" || Z.state === "blocked" && P.state === "unblocked" || Z.state === "proceeding" && P.state === "unblocked",
      `Invalid blocker state transition: ${Z.state} -> ${P.state}`
    );
    let ve = new Map(M.blockers);
    ve.set(D, P), Be({ blockers: ve });
  }
  function Me({
    currentLocation: D,
    nextLocation: P,
    historyAction: Z
  }) {
    if (ce.size === 0)
      return;
    ce.size > 1 && Xt(!1, "A router only supports one blocker at a time");
    let ve = Array.from(ce.entries()), [ye, Ae] = ve[ve.length - 1], xe = M.blockers.get(ye);
    if (!(xe && xe.state === "proceeding") && Ae({ currentLocation: D, nextLocation: P, historyAction: Z }))
      return ye;
  }
  function je(D) {
    let P = ea(404, { pathname: D }), Z = y || m, { matches: ve, route: ye } = Po(Z);
    return { notFoundMatches: ve, route: ye, error: P };
  }
  function ge(D, P, Z) {
    if (j = D, _ = P, C = Z || null, !T && M.navigation === vf) {
      T = !0;
      let ve = fe(M.location, M.matches);
      ve != null && Be({ restoreScrollPosition: ve });
    }
    return () => {
      j = null, _ = null, C = null;
    };
  }
  function Ge(D, P) {
    return C && C(
      D,
      P.map((ve) => dN(ve, M.loaderData))
    ) || D.key;
  }
  function q(D, P) {
    if (j && _) {
      let Z = Ge(D, P);
      j[Z] = _();
    }
  }
  function fe(D, P) {
    if (j) {
      let Z = Ge(D, P), ve = j[Z];
      if (typeof ve == "number")
        return ve;
    }
    return null;
  }
  function De(D, P, Z) {
    if (t.patchRoutesOnNavigation)
      if (D) {
        if (Object.keys(D[0].params).length > 0)
          return { active: !0, matches: ul(
            P,
            Z,
            p,
            !0
          ) };
      } else
        return { active: !0, matches: ul(
          P,
          Z,
          p,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function _e(D, P, Z, ve) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: D };
    let ye = D;
    for (; ; ) {
      let Ae = y == null, xe = y || m, Ee = f;
      try {
        await t.patchRoutesOnNavigation({
          signal: Z,
          path: P,
          matches: ye,
          fetcherKey: ve,
          patch: (qe, Ue) => {
            Z.aborted || My(
              qe,
              Ue,
              xe,
              Ee,
              u,
              !1
            );
          }
        });
      } catch (qe) {
        return { type: "error", error: qe, partialMatches: ye };
      } finally {
        Ae && !Z.aborted && (m = [...m]);
      }
      if (Z.aborted)
        return { type: "aborted" };
      let Oe = xr(xe, P, p), Te = null;
      if (Oe) {
        if (Object.keys(Oe[0].params).length === 0)
          return { type: "success", matches: Oe };
        if (Te = ul(
          xe,
          P,
          p,
          !0
        ), !(Te && ye.length < Te.length && Ye(
          ye,
          Te.slice(0, ye.length)
        )))
          return { type: "success", matches: Oe };
      }
      if (Te || (Te = ul(
        xe,
        P,
        p,
        !0
      )), !Te || Ye(ye, Te))
        return { type: "success", matches: null };
      ye = Te;
    }
  }
  function Ye(D, P) {
    return D.length === P.length && D.every((Z, ve) => Z.route.id === P[ve].route.id);
  }
  function gt(D) {
    f = {}, y = gl(
      D,
      u,
      void 0,
      f
    );
  }
  function xt(D, P, Z = !1) {
    let ve = y == null;
    My(
      D,
      P,
      y || m,
      f,
      u,
      Z
    ), ve && (m = [...m], Be({}));
  }
  return ee = {
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
    initialize: ot,
    subscribe: We,
    enableScrollRestoration: ge,
    navigate: sn,
    fetch: Xe,
    revalidate: qt,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (D) => t.history.createHref(D),
    encodeLocation: (D) => t.history.encodeLocation(D),
    getFetcher: kn,
    resetFetcher: Sn,
    deleteFetcher: Pt,
    dispose: Ne,
    getBlocker: cn,
    deleteBlocker: wn,
    patchRoutes: xt,
    _internalFetchControllers: J,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: gt,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(D) {
      Be(D);
    }
  }, t.unstable_instrumentations && (ee = AN(
    ee,
    t.unstable_instrumentations.map((D) => D.router).filter(Boolean)
  )), ee;
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
    ra(t.pathname, s) || t.pathname,
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
      error: ea(405, { method: s.formMethod })
    };
  let i = () => ({
    path: a,
    error: ea(400, { type: "invalid-body" })
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
  let $ = R ? qn(R[1]) ? R[1].error : R[1].data : void 0, Y = o.createURL(u.location), ee = o.createURL(y), M;
  if (b && u.errors) {
    let ie = Object.keys(u.errors)[0];
    M = f.findIndex((A) => A.route.id === ie);
  } else if (R && qn(R[1])) {
    let ie = R[0];
    M = f.findIndex((A) => A.route.id === ie) - 1;
  }
  let I = R ? R[1].statusCode : void 0, z = I && I >= 400, F = {
    currentUrl: Y,
    currentParams: u.matches[0]?.params || {},
    nextUrl: ee,
    nextParams: f[0].params,
    ...m,
    actionResult: $,
    actionStatus: I
  }, W = El(f), G = f.map((ie, A) => {
    let { route: H } = ie, U = null;
    if (M != null && A > M)
      U = !1;
    else if (H.lazy)
      U = !0;
    else if (!Ih(H))
      U = !1;
    else if (b) {
      let { shouldLoad: te } = l1(
        H,
        u.loaderData,
        u.errors
      );
      U = te;
    } else FN(u.loaderData, u.matches[A], ie) && (U = !0);
    if (U !== null)
      return rh(
        s,
        i,
        t,
        y,
        W,
        ie,
        p,
        a,
        U
      );
    let J = !1;
    typeof N == "boolean" ? J = N : z ? J = !1 : (v || Y.pathname + Y.search === ee.pathname + ee.search || Y.search !== ee.search || PN(u.matches[A], ie)) && (J = !0);
    let pe = {
      ...F,
      defaultShouldRevalidate: J
    }, k = hl(ie, pe);
    return rh(
      s,
      i,
      t,
      y,
      W,
      ie,
      p,
      a,
      k,
      pe,
      N
    );
  }), Q = [];
  return j.forEach((ie, A) => {
    if (b || !f.some((K) => K.route.id === ie.routeId) || w.has(A))
      return;
    let H = u.fetchers.get(A), U = H && H.state !== "idle" && H.data === void 0, J = xr(_, ie.path, T);
    if (!J) {
      if (O && U)
        return;
      Q.push({
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
    let pe = gc(J, ie.path), k = new AbortController(), te = Hs(
      o,
      ie.path,
      k.signal
    ), ne = null;
    if (S.has(A))
      S.delete(A), ne = Xs(
        s,
        i,
        te,
        ie.path,
        J,
        pe,
        p,
        a
      );
    else if (U)
      v && (ne = Xs(
        s,
        i,
        te,
        ie.path,
        J,
        pe,
        p,
        a
      ));
    else {
      let K;
      typeof N == "boolean" ? K = N : z ? K = !1 : K = v;
      let B = {
        ...F,
        defaultShouldRevalidate: K
      };
      hl(pe, B) && (ne = Xs(
        s,
        i,
        te,
        ie.path,
        J,
        pe,
        p,
        a,
        B
      ));
    }
    ne && Q.push({
      key: A,
      routeId: ie.routeId,
      path: ie.path,
      matches: ne,
      match: pe,
      request: te,
      controller: k
    });
  }), { dsMatches: G, revalidatingFetchers: Q };
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
          throw ea(405, {
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
      throw ea(404, {
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
    let f = ra(u.pathname, s) != null;
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
function ea(t, {
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
var sa = g.createContext(
  null
);
sa.displayName = "Navigation";
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
  let { basename: s, navigator: i } = g.useContext(sa), { hash: o, pathname: u, search: f } = Tl(t, { relative: a }), m = u;
  return s !== "/" && (m = u === "/" ? s : ta([s, u])), i.createHref({ pathname: m, search: f, hash: o });
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
  g.useContext(sa).static || g.useLayoutEffect(t);
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
  let t = g.useContext(ns), { basename: a, navigator: s } = g.useContext(sa), { matches: i } = g.useContext(qa), { pathname: o } = Ha(), u = JSON.stringify(Uh(i)), f = g.useRef(!1);
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
      t == null && a !== "/" && (b.pathname = b.pathname === "/" ? a : ta([a, b.pathname])), (p.replace ? s.replace : s.push)(
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
  let { navigator: i } = g.useContext(sa), { matches: o } = g.useContext(qa), u = o[o.length - 1], f = u ? u.params : {}, m = u ? u.pathname : "/", y = u ? u.pathnameBase : "/", p = u && u.route;
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
        pathname: ta([
          y,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          i.encodeLocation ? i.encodeLocation(
            _.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : _.pathname
        ]),
        pathnameBase: _.pathnameBase === "/" ? y : ta([
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
  let { basename: s } = g.useContext(sa);
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
    (I, { deletedFetchers: z, newErrors: F, flushSync: W, viewTransitionOpts: G }) => {
      F && s && Object.values(F).forEach(
        (ie) => s(ie, {
          location: I.location,
          params: I.matches[0]?.params ?? {},
          unstable_pattern: El(I.matches)
        })
      ), I.fetchers.forEach((ie, A) => {
        ie.data !== void 0 && R.current.set(A, ie.data);
      }), z.forEach((ie) => R.current.delete(ie)), Py(
        W === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let Q = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (Py(
        G == null || Q,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !G || !Q) {
        a && W ? a(() => f(I)) : i === !1 ? f(I) : g.startTransition(() => {
          i === !0 && y((ie) => Yy(ie, I)), f(I);
        });
        return;
      }
      if (a && W) {
        a(() => {
          C && (w?.resolve(), C.skipTransition()), S({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: G.currentLocation,
            nextLocation: G.nextLocation
          });
        });
        let ie = t.window.document.startViewTransition(() => {
          a(() => f(I));
        });
        ie.finished.finally(() => {
          a(() => {
            j(void 0), _(void 0), b(void 0), S({ isTransitioning: !1 });
          });
        }), a(() => _(ie));
        return;
      }
      C ? (w?.resolve(), C.skipTransition(), O({
        state: I,
        currentLocation: G.currentLocation,
        nextLocation: G.nextLocation
      })) : (b(I), S({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: G.currentLocation,
        nextLocation: G.nextLocation
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
  let $ = m.initialized;
  g.useLayoutEffect(() => {
    !$ && t.state.initialized && N(t.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [$, N, t.state]), g.useEffect(() => {
    v.isTransitioning && !v.flushSync && j(new $C());
  }, [v]), g.useEffect(() => {
    if (w && p && t.window) {
      let I = p, z = w.promise, F = t.window.document.startViewTransition(async () => {
        i === !1 ? f(I) : g.startTransition(() => {
          i === !0 && y((W) => Yy(W, I)), f(I);
        }), await z;
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
  let Y = g.useMemo(() => ({
    createHref: t.createHref,
    encodeLocation: t.encodeLocation,
    go: (I) => t.navigate(I),
    push: (I, z, F) => t.navigate(I, {
      state: z,
      preventScrollReset: F?.preventScrollReset
    }),
    replace: (I, z, F) => t.navigate(I, {
      replace: !0,
      state: z,
      preventScrollReset: F?.preventScrollReset
    })
  }), [t]), ee = t.basename || "/", M = g.useMemo(
    () => ({
      router: t,
      navigator: Y,
      static: !1,
      basename: ee,
      onError: s
    }),
    [t, Y, ee, s]
  );
  return /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement(ns.Provider, { value: M }, /* @__PURE__ */ g.createElement(Nl.Provider, { value: m }, /* @__PURE__ */ g.createElement(v1.Provider, { value: R.current }, /* @__PURE__ */ g.createElement(Hh.Provider, { value: v }, /* @__PURE__ */ g.createElement(
    VC,
    {
      basename: ee,
      location: m.location,
      navigationType: m.historyAction,
      navigator: Y,
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
    let _ = ra(p, m);
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
  ), C == null ? null : /* @__PURE__ */ g.createElement(sa.Provider, { value: y }, /* @__PURE__ */ g.createElement(Hc.Provider, { children: a, value: C }));
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
    i = m ? ra(m, a) : null, s = t.getAttribute("method") || vc, o = xf(t.getAttribute("enctype")) || yc, u = new FormData(t);
  } else if (qC(t) || FC(t) && (t.type === "submit" || t.type === "image")) {
    let m = t.form;
    if (m == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let y = t.getAttribute("formaction") || m.getAttribute("action");
    if (i = y ? ra(y, a) : null, s = t.getAttribute("formmethod") || m.getAttribute("method") || vc, o = xf(t.getAttribute("formenctype")) || xf(m.getAttribute("enctype")) || yc, u = new FormData(m, t), !YC()) {
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
  return s ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${i}` : o.pathname = `${o.pathname}.${i}` : o.pathname === "/" ? o.pathname = `_root.${i}` : a && ra(o.pathname, a) === "/" ? o.pathname = `${Cc(a)}/_root.${i}` : o.pathname = `${Cc(o.pathname)}.${i}`, o;
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
    let { basename: _, navigator: T, unstable_useTransitions: O } = g.useContext(sa), R = typeof b == "string" && N1.test(b), N = t1(b, _);
    b = N.to;
    let $ = yC(b, { relative: o }), Y = Ha(), ee = null;
    if (m) {
      let ie = Vc(
        m,
        [],
        Y.unstable_mask ? Y.unstable_mask.pathname : "/",
        !0
      );
      _ !== "/" && (ie.pathname = ie.pathname === "/" ? _ : ta([_, ie.pathname])), ee = T.createHref(ie);
    }
    let [M, I, z] = rT(
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
    function W(ie) {
      a && a(ie), ie.defaultPrevented || F(ie);
    }
    let G = !(N.isExternal || u), Q = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ g.createElement(
        "a",
        {
          ...j,
          ...z,
          href: (G ? ee : void 0) || N.absoluteURL || $,
          onClick: G ? W : a,
          ref: cT(C, I),
          target: p,
          "data-discover": !R && s === "render" ? "true" : void 0
        }
      )
    );
    return M && !R ? /* @__PURE__ */ g.createElement(g.Fragment, null, Q, /* @__PURE__ */ g.createElement(sT, { page: $ })) : Q;
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
    let v = Tl(f, { relative: p.relative }), S = Ha(), w = g.useContext(Nl), { navigator: j, basename: C } = g.useContext(sa), _ = w != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    bT(v) && m === !0, T = j.encodeLocation ? j.encodeLocation(v).pathname : v.pathname, O = S.pathname, R = w && w.navigation && w.navigation.location ? w.navigation.location.pathname : null;
    s || (O = O.toLowerCase(), R = R ? R.toLowerCase() : null, T = T.toLowerCase()), R && C && (R = ra(R, C) || R);
    const N = T !== "/" && T.endsWith("/") ? T.length - 1 : T.length;
    let $ = O === T || !o && O.startsWith(T) && O.charAt(N) === "/", Y = R != null && (R === T || !o && R.startsWith(T) && R.charAt(T.length) === "/"), ee = {
      isActive: $,
      isPending: Y,
      isTransitioning: _
    }, M = $ ? a : void 0, I;
    typeof i == "function" ? I = i(ee) : I = [
      i,
      $ ? "active" : null,
      Y ? "pending" : null,
      _ ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let z = typeof u == "function" ? u(ee) : u;
    return /* @__PURE__ */ g.createElement(
      Qh,
      {
        ...p,
        "aria-current": M,
        className: I,
        ref: b,
        style: z,
        to: f,
        viewTransition: m
      },
      typeof y == "function" ? y(ee) : y
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
    let { unstable_useTransitions: C } = g.useContext(sa), _ = vT(), T = yT(m, { relative: p }), O = f.toLowerCase() === "get" ? "get" : "post", R = typeof m == "string" && N1.test(m), N = ($) => {
      if (y && y($), $.defaultPrevented) return;
      $.preventDefault();
      let Y = $.nativeEvent.submitter, ee = Y?.getAttribute("formmethod") || f, M = () => _(Y || $.currentTarget, {
        fetcherKey: a,
        method: ee,
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
  ), { basename: a } = g.useContext(sa), s = RC(), i = t.fetch, o = t.navigate;
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
  let { basename: s } = g.useContext(sa), i = g.useContext(qa);
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
  return (!t || t === ".") && o.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), s !== "/" && (u.pathname = u.pathname === "/" ? s : ta([s, u.pathname])), Sa(u);
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
  let u = ra(s.currentLocation.pathname, i) || s.currentLocation.pathname, f = ra(s.nextLocation.pathname, i) || s.nextLocation.pathname;
  return Nc(o.pathname, f) != null || Nc(o.pathname, u) != null;
}
class ai extends Error {
  constructor(a, s, i, o) {
    super(i), this.status = a, this.category = s, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const ha = "/api/v1/extensions/nexus.audio.emotiontts";
async function Dt(t, a) {
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
  return Dt("/deployments");
}
async function Xy(t) {
  return Dt(`/deployments/${t}`);
}
async function jT(t, a) {
  return Dt(`/deployments/${t}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function Qy(t) {
  return Dt(`/mappings?deploymentId=${encodeURIComponent(t)}`);
}
async function Zh(t, a) {
  return Dt("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: t })
  });
}
async function Ys(t, a, s) {
  return Dt(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify(s)
    }
  );
}
async function T1(t, a) {
  await Dt(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function ET(t) {
  return Dt(`/mappings/export?deploymentId=${encodeURIComponent(t)}`);
}
async function NT(t, a, s = "error") {
  return Dt("/mappings/import", {
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
  return Dt(`/deployments/${t}/runs${o}`);
}
async function R1(t, a) {
  return Dt(`/deployments/${t}/runs`, {
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
  return Dt(`/deployments/${t}/runs/${a}`);
}
async function Jy(t, a) {
  return Dt(`/deployments/${t}/runs/${a}/cancel`, { method: "POST" });
}
async function _1(t, a) {
  return Dt(`/deployments/${t}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function kT(t, a) {
  return Dt(`/deployments/${t}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function Sf(t, a, s, i) {
  let o = () => {
  }, u = !1;
  return o = ST(
    `/deployments/${t}/runs/${a}/progress`,
    (f) => {
      s(f), f.type === "run_terminal" && !u && (u = !0, o());
    },
    i,
    void 0,
    RT
  ), o;
}
async function Zs(t) {
  return Dt(`/voice-assets?deploymentId=${encodeURIComponent(t)}`);
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
  await Dt(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function zT(t, a, s) {
  return Dt(
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
  ...m
}) {
  const y = [IT[t], qT[a], VT[s], u].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(i, { className: y, style: f, "data-elevation": s, ...m, children: o });
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
var Wh = Kx();
const uR = /* @__PURE__ */ Yx(Wh);
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
        else if (jR(p) && !p.ok) {
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
const Mn = new SR(), wR = (t, a) => {
  const s = a?.id || ih++;
  return Mn.addToast({
    title: t,
    ...a,
    id: s
  }), s;
}, jR = (t) => t && typeof t == "object" && "ok" in t && typeof t.ok == "boolean" && "status" in t && typeof t.status == "number", ER = wR, NR = () => Mn.toasts, CR = () => Mn.getActiveToasts(), mn = Object.assign(ER, {
  success: Mn.success,
  info: Mn.info,
  warning: Mn.warning,
  error: Mn.error,
  custom: Mn.custom,
  message: Mn.message,
  promise: Mn.promise,
  dismiss: Mn.dismiss,
  loading: Mn.loading
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
  var a, s, i, o, u, f, m, y, p;
  const { invert: b, toast: v, unstyled: S, interacting: w, setHeights: j, visibleToasts: C, heights: _, index: T, toasts: O, expanded: R, removeToast: N, defaultRichColors: $, closeButton: Y, style: ee, cancelButtonStyle: M, actionButtonStyle: I, className: z = "", descriptionClassName: F = "", duration: W, position: G, gap: Q, expandByDefault: ie, classNames: A, icons: H, closeButtonAriaLabel: U = "Close toast" } = t, [J, pe] = we.useState(null), [k, te] = we.useState(null), [ne, K] = we.useState(!1), [B, ae] = we.useState(!1), [ce, be] = we.useState(!1), [Re, ot] = we.useState(!1), [Ne, We] = we.useState(!1), [Be, Pe] = we.useState(0), [sn, qt] = we.useState(0), Mt = we.useRef(v.duration || W || Wy), Ce = we.useRef(null), Ve = we.useRef(null), dt = T === 0, At = T + 1 <= C, Xe = v.type, at = v.dismissible !== !1, bt = v.className || "", Se = v.descriptionClassName || "", $e = we.useMemo(() => _.findIndex((ge) => ge.toastId === v.id) || 0, [
    _,
    v.id
  ]), Fe = we.useMemo(() => {
    var ge;
    return (ge = v.closeButton) != null ? ge : Y;
  }, [
    v.closeButton,
    Y
  ]), rt = we.useMemo(() => v.duration || W || Wy, [
    v.duration,
    W
  ]), yt = we.useRef(0), Tt = we.useRef(0), kn = we.useRef(0), Sn = we.useRef(null), [pn, Pt] = G.split("-"), zt = we.useMemo(() => _.reduce((ge, Ge, q) => q >= $e ? ge : ge + Ge.height, 0), [
    _,
    $e
  ]), It = xR(), Dn = v.invert || b, zn = Xe === "loading";
  Tt.current = we.useMemo(() => $e * Q + zt, [
    $e,
    zt
  ]), we.useEffect(() => {
    Mt.current = rt;
  }, [
    rt
  ]), we.useEffect(() => {
    K(!0);
  }, []), we.useEffect(() => {
    const ge = Ve.current;
    if (ge) {
      const Ge = ge.getBoundingClientRect().height;
      return qt(Ge), j((q) => [
        {
          toastId: v.id,
          height: Ge,
          position: v.position
        },
        ...q
      ]), () => j((q) => q.filter((fe) => fe.toastId !== v.id));
    }
  }, [
    j,
    v.id
  ]), we.useLayoutEffect(() => {
    if (!ne) return;
    const ge = Ve.current, Ge = ge.style.height;
    ge.style.height = "auto";
    const q = ge.getBoundingClientRect().height;
    ge.style.height = Ge, qt(q), j((fe) => fe.find((_e) => _e.toastId === v.id) ? fe.map((_e) => _e.toastId === v.id ? {
      ..._e,
      height: q
    } : _e) : [
      {
        toastId: v.id,
        height: q,
        position: v.position
      },
      ...fe
    ]);
  }, [
    ne,
    v.title,
    v.description,
    j,
    v.id,
    v.jsx,
    v.action,
    v.cancel
  ]);
  const cn = we.useCallback(() => {
    ae(!0), Pe(Tt.current), j((ge) => ge.filter((Ge) => Ge.toastId !== v.id)), setTimeout(() => {
      N(v);
    }, DR);
  }, [
    v,
    N,
    j,
    Tt
  ]);
  we.useEffect(() => {
    if (v.promise && Xe === "loading" || v.duration === 1 / 0 || v.type === "loading") return;
    let ge;
    return R || w || It ? (() => {
      if (kn.current < yt.current) {
        const fe = (/* @__PURE__ */ new Date()).getTime() - yt.current;
        Mt.current = Mt.current - fe;
      }
      kn.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      Mt.current !== 1 / 0 && (yt.current = (/* @__PURE__ */ new Date()).getTime(), ge = setTimeout(() => {
        v.onAutoClose == null || v.onAutoClose.call(v, v), cn();
      }, Mt.current));
    })(), () => clearTimeout(ge);
  }, [
    R,
    w,
    v,
    Xe,
    It,
    cn
  ]), we.useEffect(() => {
    v.delete && (cn(), v.onDismiss == null || v.onDismiss.call(v, v));
  }, [
    cn,
    v.delete
  ]);
  function wn() {
    var ge;
    if (H?.loading) {
      var Ge;
      return /* @__PURE__ */ we.createElement("div", {
        className: xa(A?.loader, v == null || (Ge = v.classNames) == null ? void 0 : Ge.loader, "sonner-loader"),
        "data-visible": Xe === "loading"
      }, H.loading);
    }
    return /* @__PURE__ */ we.createElement(mR, {
      className: xa(A?.loader, v == null || (ge = v.classNames) == null ? void 0 : ge.loader),
      visible: Xe === "loading"
    });
  }
  const ue = v.icon || H?.[Xe] || fR(Xe);
  var Me, je;
  return /* @__PURE__ */ we.createElement("li", {
    tabIndex: 0,
    ref: Ve,
    className: xa(z, bt, A?.toast, v == null || (a = v.classNames) == null ? void 0 : a.toast, A?.default, A?.[Xe], v == null || (s = v.classNames) == null ? void 0 : s[Xe]),
    "data-sonner-toast": "",
    "data-rich-colors": (Me = v.richColors) != null ? Me : $,
    "data-styled": !(v.jsx || v.unstyled || S),
    "data-mounted": ne,
    "data-promise": !!v.promise,
    "data-swiped": Ne,
    "data-removed": B,
    "data-visible": At,
    "data-y-position": pn,
    "data-x-position": Pt,
    "data-index": T,
    "data-front": dt,
    "data-swiping": ce,
    "data-dismissible": at,
    "data-type": Xe,
    "data-invert": Dn,
    "data-swipe-out": Re,
    "data-swipe-direction": k,
    "data-expanded": !!(R || ie && ne),
    "data-testid": v.testId,
    style: {
      "--index": T,
      "--toasts-before": T,
      "--z-index": O.length - T,
      "--offset": `${B ? Be : Tt.current}px`,
      "--initial-height": ie ? "auto" : `${sn}px`,
      ...ee,
      ...v.style
    },
    onDragEnd: () => {
      be(!1), pe(null), Sn.current = null;
    },
    onPointerDown: (ge) => {
      ge.button !== 2 && (zn || !at || (Ce.current = /* @__PURE__ */ new Date(), Pe(Tt.current), ge.target.setPointerCapture(ge.pointerId), ge.target.tagName !== "BUTTON" && (be(!0), Sn.current = {
        x: ge.clientX,
        y: ge.clientY
      })));
    },
    onPointerUp: () => {
      var ge, Ge, q;
      if (Re || !at) return;
      Sn.current = null;
      const fe = Number(((ge = Ve.current) == null ? void 0 : ge.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), De = Number(((Ge = Ve.current) == null ? void 0 : Ge.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), _e = (/* @__PURE__ */ new Date()).getTime() - ((q = Ce.current) == null ? void 0 : q.getTime()), Ye = J === "x" ? fe : De, gt = Math.abs(Ye) / _e;
      if (Math.abs(Ye) >= kR || gt > 0.11) {
        Pe(Tt.current), v.onDismiss == null || v.onDismiss.call(v, v), te(J === "x" ? fe > 0 ? "right" : "left" : De > 0 ? "down" : "up"), cn(), ot(!0);
        return;
      } else {
        var xt, D;
        (xt = Ve.current) == null || xt.style.setProperty("--swipe-amount-x", "0px"), (D = Ve.current) == null || D.style.setProperty("--swipe-amount-y", "0px");
      }
      We(!1), be(!1), pe(null);
    },
    onPointerMove: (ge) => {
      var Ge, q, fe;
      if (!Sn.current || !at || ((Ge = window.getSelection()) == null ? void 0 : Ge.toString().length) > 0) return;
      const _e = ge.clientY - Sn.current.y, Ye = ge.clientX - Sn.current.x;
      var gt;
      const xt = (gt = t.swipeDirections) != null ? gt : zR(G);
      !J && (Math.abs(Ye) > 1 || Math.abs(_e) > 1) && pe(Math.abs(Ye) > Math.abs(_e) ? "x" : "y");
      let D = {
        x: 0,
        y: 0
      };
      const P = (Z) => 1 / (1.5 + Math.abs(Z) / 20);
      if (J === "y") {
        if (xt.includes("top") || xt.includes("bottom"))
          if (xt.includes("top") && _e < 0 || xt.includes("bottom") && _e > 0)
            D.y = _e;
          else {
            const Z = _e * P(_e);
            D.y = Math.abs(Z) < Math.abs(_e) ? Z : _e;
          }
      } else if (J === "x" && (xt.includes("left") || xt.includes("right")))
        if (xt.includes("left") && Ye < 0 || xt.includes("right") && Ye > 0)
          D.x = Ye;
        else {
          const Z = Ye * P(Ye);
          D.x = Math.abs(Z) < Math.abs(Ye) ? Z : Ye;
        }
      (Math.abs(D.x) > 0 || Math.abs(D.y) > 0) && We(!0), (q = Ve.current) == null || q.style.setProperty("--swipe-amount-x", `${D.x}px`), (fe = Ve.current) == null || fe.style.setProperty("--swipe-amount-y", `${D.y}px`);
    }
  }, Fe && !v.jsx && Xe !== "loading" ? /* @__PURE__ */ we.createElement("button", {
    "aria-label": U,
    "data-disabled": zn,
    "data-close-button": !0,
    onClick: zn || !at ? () => {
    } : () => {
      cn(), v.onDismiss == null || v.onDismiss.call(v, v);
    },
    className: xa(A?.closeButton, v == null || (i = v.classNames) == null ? void 0 : i.closeButton)
  }, (je = H?.close) != null ? je : bR) : null, (Xe || v.icon || v.promise) && v.icon !== null && (H?.[Xe] !== null || v.icon) ? /* @__PURE__ */ we.createElement("div", {
    "data-icon": "",
    className: xa(A?.icon, v == null || (o = v.classNames) == null ? void 0 : o.icon)
  }, v.promise || v.type === "loading" && !v.icon ? v.icon || wn() : null, v.type !== "loading" ? ue : null) : null, /* @__PURE__ */ we.createElement("div", {
    "data-content": "",
    className: xa(A?.content, v == null || (u = v.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ we.createElement("div", {
    "data-title": "",
    className: xa(A?.title, v == null || (f = v.classNames) == null ? void 0 : f.title)
  }, v.jsx ? v.jsx : typeof v.title == "function" ? v.title() : v.title), v.description ? /* @__PURE__ */ we.createElement("div", {
    "data-description": "",
    className: xa(F, Se, A?.description, v == null || (m = v.classNames) == null ? void 0 : m.description)
  }, typeof v.description == "function" ? v.description() : v.description) : null), /* @__PURE__ */ we.isValidElement(v.cancel) ? v.cancel : v.cancel && Ko(v.cancel) ? /* @__PURE__ */ we.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: v.cancelButtonStyle || M,
    onClick: (ge) => {
      Ko(v.cancel) && at && (v.cancel.onClick == null || v.cancel.onClick.call(v.cancel, ge), cn());
    },
    className: xa(A?.cancelButton, v == null || (y = v.classNames) == null ? void 0 : y.cancelButton)
  }, v.cancel.label) : null, /* @__PURE__ */ we.isValidElement(v.action) ? v.action : v.action && Ko(v.action) ? /* @__PURE__ */ we.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: v.actionButtonStyle || I,
    onClick: (ge) => {
      Ko(v.action) && (v.action.onClick == null || v.action.onClick.call(v.action, ge), !ge.defaultPrevented && cn());
    },
    className: xa(A?.actionButton, v == null || (p = v.classNames) == null ? void 0 : p.actionButton)
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
    const u = o === 1, f = u ? "--mobile-offset" : "--offset", m = u ? _R : RR;
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
const $R = /* @__PURE__ */ we.forwardRef(function(a, s) {
  const { id: i, invert: o, position: u = "bottom-right", hotkey: f = [
    "altKey",
    "KeyT"
  ], expand: m, closeButton: y, className: p, offset: b, mobileOffset: v, theme: S = "light", richColors: w, duration: j, style: C, visibleToasts: _ = TR, toastOptions: T, dir: O = e0(), gap: R = AR, icons: N, containerAriaLabel: $ = "Notifications" } = a, [Y, ee] = we.useState([]), M = we.useMemo(() => i ? Y.filter((ne) => ne.toasterId === i) : Y.filter((ne) => !ne.toasterId), [
    Y,
    i
  ]), I = we.useMemo(() => Array.from(new Set([
    u
  ].concat(M.filter((ne) => ne.position).map((ne) => ne.position)))), [
    M,
    u
  ]), [z, F] = we.useState([]), [W, G] = we.useState(!1), [Q, ie] = we.useState(!1), [A, H] = we.useState(S !== "system" ? S : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), U = we.useRef(null), J = f.join("+").replace(/Key/g, "").replace(/Digit/g, ""), pe = we.useRef(null), k = we.useRef(!1), te = we.useCallback((ne) => {
    ee((K) => {
      var B;
      return (B = K.find((ae) => ae.id === ne.id)) != null && B.delete || Mn.dismiss(ne.id), K.filter(({ id: ae }) => ae !== ne.id);
    });
  }, []);
  return we.useEffect(() => Mn.subscribe((ne) => {
    if (ne.dismiss) {
      requestAnimationFrame(() => {
        ee((K) => K.map((B) => B.id === ne.id ? {
          ...B,
          delete: !0
        } : B));
      });
      return;
    }
    setTimeout(() => {
      uR.flushSync(() => {
        ee((K) => {
          const B = K.findIndex((ae) => ae.id === ne.id);
          return B !== -1 ? [
            ...K.slice(0, B),
            {
              ...K[B],
              ...ne
            },
            ...K.slice(B + 1)
          ] : [
            ne,
            ...K
          ];
        });
      });
    });
  }), [
    Y
  ]), we.useEffect(() => {
    if (S !== "system") {
      H(S);
      return;
    }
    if (S === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? H("dark") : H("light")), typeof window > "u") return;
    const ne = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      ne.addEventListener("change", ({ matches: K }) => {
        H(K ? "dark" : "light");
      });
    } catch {
      ne.addListener(({ matches: B }) => {
        try {
          H(B ? "dark" : "light");
        } catch (ae) {
          console.error(ae);
        }
      });
    }
  }, [
    S
  ]), we.useEffect(() => {
    Y.length <= 1 && G(!1);
  }, [
    Y
  ]), we.useEffect(() => {
    const ne = (K) => {
      var B;
      if (f.every((be) => K[be] || K.code === be)) {
        var ce;
        G(!0), (ce = U.current) == null || ce.focus();
      }
      K.code === "Escape" && (document.activeElement === U.current || (B = U.current) != null && B.contains(document.activeElement)) && G(!1);
    };
    return document.addEventListener("keydown", ne), () => document.removeEventListener("keydown", ne);
  }, [
    f
  ]), we.useEffect(() => {
    if (U.current)
      return () => {
        pe.current && (pe.current.focus({
          preventScroll: !0
        }), pe.current = null, k.current = !1);
      };
  }, [
    U.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ we.createElement("section", {
    ref: s,
    "aria-label": `${$} ${J}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, I.map((ne, K) => {
    var B;
    const [ae, ce] = ne.split("-");
    return M.length ? /* @__PURE__ */ we.createElement("ol", {
      key: ne,
      dir: O === "auto" ? e0() : O,
      tabIndex: -1,
      ref: U,
      className: p,
      "data-sonner-toaster": !0,
      "data-sonner-theme": A,
      "data-y-position": ae,
      "data-x-position": ce,
      style: {
        "--front-toast-height": `${((B = z[0]) == null ? void 0 : B.height) || 0}px`,
        "--width": `${MR}px`,
        "--gap": `${R}px`,
        ...C,
        ...LR(b, v)
      },
      onBlur: (be) => {
        k.current && !be.currentTarget.contains(be.relatedTarget) && (k.current = !1, pe.current && (pe.current.focus({
          preventScroll: !0
        }), pe.current = null));
      },
      onFocus: (be) => {
        be.target instanceof HTMLElement && be.target.dataset.dismissible === "false" || k.current || (k.current = !0, pe.current = be.relatedTarget);
      },
      onMouseEnter: () => G(!0),
      onMouseMove: () => G(!0),
      onMouseLeave: () => {
        Q || G(!1);
      },
      onDragEnd: () => G(!1),
      onPointerDown: (be) => {
        be.target instanceof HTMLElement && be.target.dataset.dismissible === "false" || ie(!0);
      },
      onPointerUp: () => ie(!1)
    }, M.filter((be) => !be.position && K === 0 || be.position === ne).map((be, Re) => {
      var ot, Ne;
      return /* @__PURE__ */ we.createElement(OR, {
        key: be.id,
        icons: N,
        index: Re,
        toast: be,
        defaultRichColors: w,
        duration: (ot = T?.duration) != null ? ot : j,
        className: T?.className,
        descriptionClassName: T?.descriptionClassName,
        invert: o,
        visibleToasts: _,
        closeButton: (Ne = T?.closeButton) != null ? Ne : y,
        interacting: Q,
        position: ne,
        style: T?.style,
        unstyled: T?.unstyled,
        classNames: T?.classNames,
        cancelButtonStyle: T?.cancelButtonStyle,
        actionButtonStyle: T?.actionButtonStyle,
        closeButtonAriaLabel: T?.closeButtonAriaLabel,
        removeToast: te,
        toasts: M.filter((We) => We.position == be.position),
        heights: z.filter((We) => We.position == be.position),
        setHeights: F,
        expandByDefault: m,
        gap: R,
        expanded: W,
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
async function UR(t, a, s, i, o = {}) {
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
function An() {
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
var HR = "g5r6d10", FR = "g5r6d11", PR = "g5r6d12", GR = "g5r6d13", YR = "g5r6d14", KR = "g5r6d15", XR = "g5r6d1a", QR = "g5r6d1b", ZR = "g5r6d1c", JR = "g5r6d1d", WR = "g5r6d1e", e_ = "g5r6d1g", t_ = "g5r6d1h", n_ = "g5r6d1i", a_ = "g5r6d1j", r_ = "g5r6d1k", s_ = "g5r6d1l", i_ = "g5r6d1m", l_ = "g5r6d1n", o_ = "g5r6d1o", m0 = "g5r6d1p", c_ = "g5r6d1q", u_ = "g5r6d1r", d_ = "g5r6d1s", f_ = "g5r6d1t", h_ = "g5r6d1u", p0 = "g5r6d1v", g0 = "g5r6d1w", m_ = "g5r6d1x", p_ = "g5r6d1y", br = "g5r6d1z", g_ = "g5r6d110", v0 = "g5r6d111", v_ = "g5r6d112", y_ = "g5r6d113", pr = "g5r6d114", b_ = "g5r6d119", x_ = "a6ki8u0", S_ = "a6ki8u1", w_ = "a6ki8u2", j_ = "a6ki8u3", E_ = "a6ki8u4", N_ = "a6ki8u5", C_ = "a6ki8u6", wf = "a6ki8u7", T_ = "a6ki8u8", R_ = "a6ki8u9", __ = "a6ki8ua", M_ = "a6ki8ub", A_ = "a6ki8uc", k_ = "a6ki8ud", D_ = "a6ki8ue", z_ = "a6ki8uf", O_ = "a6ki8ug", L_ = "a6ki8uh", $_ = "_1lguv7x0", U_ = "_1lguv7x1", B_ = "_1lguv7x2", I_ = "_1lguv7x3", V_ = "_1lguv7x4", y0 = "_1lguv7x5", q_ = "_1lguv7x6", H_ = "_1lguv7x7", F_ = "_1lguv7x8", P_ = "_1lguv7x9", G_ = "_1lguv7xa", Y_ = "_1lguv7xb", K_ = "_1lguv7xc", b0 = "_1lguv7xd", X_ = "_1lguv7xe", Q_ = "_1lguv7xf", Z_ = "_1lguv7xg", J_ = "_1lguv7xh", k1 = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, D1 = { xs: "_4ydn546", sm: "_4ydn547", md: "_4ydn548", lg: "_4ydn549" }, W_ = { xs: "_4ydn54a", sm: "_4ydn54b", md: "_4ydn54c", lg: "_4ydn54d" }, eM = "_4ydn54f";
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
    o ? W_[a] : null,
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
  onDelete: m,
  onCreateCharacter: y,
  onPlaybackEnded: p
}) {
  const [b, v] = g.useState(!1), [S, w] = g.useState(t.displayName), [j, C] = g.useState(!1), [_, T] = g.useState(t.displayName), O = g.useRef(null), R = g.useRef(null), N = g.useMemo(() => nM(t.contentSha256), [t.contentSha256]), $ = g.useMemo(() => aM(N, tM), [N]), Y = g.useMemo(() => OT(t), [t]);
  g.useEffect(() => {
    w(t.displayName);
  }, [t.displayName]), g.useEffect(() => {
    const G = O.current;
    G && (i && Y ? G.play().catch(() => {
    }) : (G.pause(), G.currentTime = 0));
  }, [i, Y]);
  const ee = async () => {
    const G = S.trim();
    if (!G || G === t.displayName) {
      v(!1), w(t.displayName);
      return;
    }
    try {
      await u(G);
    } finally {
      v(!1);
    }
  }, M = () => {
    T(t.displayName), C(!0);
  }, I = () => {
    const G = _.trim();
    if (!G) {
      R.current?.focus();
      return;
    }
    C(!1), y?.(G);
  }, z = () => {
    C(!1);
  }, F = () => {
    _.trim() ? I() : z();
  }, W = `${rM(t.durationMs)} · ${sM(t.sampleRate)}`;
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
            onChange: (G) => w(G.target.value),
            onBlur: () => {
              ee();
            },
            onKeyDown: (G) => {
              G.key === "Enter" ? (G.preventDefault(), G.currentTarget.blur()) : G.key === "Escape" && (v(!1), w(t.displayName));
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
        /* @__PURE__ */ c.jsx("span", { className: q_, children: W })
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
          /* @__PURE__ */ c.jsx("span", { className: G_, "aria-hidden": "true", children: $.map((G, Q) => /* @__PURE__ */ c.jsx("span", { className: Y_, style: { height: `${Math.round(G * 100)}%` } }, Q)) })
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
          onChange: (G) => T(G.target.value),
          onFocus: (G) => G.currentTarget.select(),
          onBlur: F,
          onKeyDown: (G) => {
            G.key === "Enter" ? (G.preventDefault(), I()) : G.key === "Escape" && z();
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
          onMouseDown: (G) => G.preventDefault(),
          onClick: I,
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
          onMouseDown: (G) => G.preventDefault(),
          onClick: z,
          children: "✕"
        }
      )
    ] }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      s.length > 0 ? /* @__PURE__ */ c.jsxs("span", { className: b0, children: [
        /* @__PURE__ */ c.jsx("span", { children: "used by" }),
        s.map((G) => /* @__PURE__ */ c.jsx(
          "span",
          {
            className: X_,
            style: { color: G.color, borderColor: G.color },
            children: G.characterName
          },
          G.characterName
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
        m && /* @__PURE__ */ c.jsx(
          Ze,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            className: Z_,
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
        ref: O,
        src: Y,
        preload: "none",
        className: J_,
        onEnded: p
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
  const [o, u] = g.useState("idle"), [f, m] = g.useState(null), [y, p] = g.useState(0), [b, v] = g.useState(null), [S, w] = g.useState(a), [j, C] = g.useState(!1), _ = g.useRef(null), T = g.useRef(null), O = g.useRef([]), R = g.useRef(0), N = g.useRef(null), $ = g.useRef(null), Y = g.useRef({ mime: "audio/webm", ext: "webm" }), ee = g.useRef(null), M = g.useRef(null), I = g.useRef(null);
  g.useEffect(() => {
    if (t)
      return I.current = document.activeElement ?? null, requestAnimationFrame(() => {
        ee.current?.scrollIntoView({ behavior: "smooth", block: "center" }), M.current?.focus();
      }), () => {
        I.current?.focus?.();
      };
  }, [t]), g.useEffect(() => {
    if (!t) return;
    const H = (U) => {
      U.key === "Escape" && s();
    };
    return window.addEventListener("keydown", H), () => window.removeEventListener("keydown", H);
  }, [t, s]);
  const z = g.useCallback(
    (H) => {
      if (H.key !== "Tab") return;
      const U = ee.current;
      if (!U) return;
      const J = U.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (J.length === 0) return;
      const pe = J[0], k = J[J.length - 1], te = document.activeElement;
      H.shiftKey ? (te === pe || te === U) && (H.preventDefault(), k.focus()) : te === k && (H.preventDefault(), pe.focus());
    },
    []
  ), F = g.useCallback(() => {
    if (T.current) {
      for (const H of T.current.getTracks()) H.stop();
      T.current = null;
    }
    N.current != null && (window.clearInterval(N.current), N.current = null);
  }, []), W = g.useCallback(() => {
    F(), b && URL.revokeObjectURL(b), v(null), O.current = [], $.current = null, p(0), m(null), u("idle");
  }, [b, F]);
  if (g.useEffect(() => {
    t || (W(), w(a));
  }, [t, a, W]), g.useEffect(() => () => {
    F(), b && URL.revokeObjectURL(b);
  }, [b, F]), !t) return null;
  const G = async () => {
    m(null), u("preparing");
    try {
      const H = await navigator.mediaDevices.getUserMedia({ audio: !0 });
      T.current = H;
      const U = bM();
      Y.current = U;
      const J = U.mime ? new MediaRecorder(H, { mimeType: U.mime }) : new MediaRecorder(H);
      _.current = J, O.current = [], J.ondataavailable = (pe) => {
        pe.data && pe.data.size > 0 && O.current.push(pe.data);
      }, J.onstop = () => {
        const pe = U.mime || "audio/webm", k = new Blob(O.current, { type: pe }), te = new File([k], `${S || a || "recording"}.${U.ext}`, {
          type: pe
        });
        $.current = te;
        const ne = URL.createObjectURL(k);
        v(ne), u("ready"), F();
      }, J.start(), R.current = Date.now(), p(0), N.current = window.setInterval(() => {
        p(Date.now() - R.current);
      }, 200), u("recording");
    } catch (H) {
      const U = H instanceof Error ? H.message : "could not access microphone";
      m(U), u(U.toLowerCase().includes("denied") ? "denied" : "error"), F();
    }
  }, Q = () => {
    const H = _.current;
    H && H.state !== "inactive" && H.stop(), N.current != null && (window.clearInterval(N.current), N.current = null);
  }, ie = async () => {
    const H = $.current;
    if (!H) return;
    const U = (S || a).trim();
    if (!U) {
      m("Name cannot be empty");
      return;
    }
    C(!0);
    try {
      await i(H, U), s();
    } catch (J) {
      m(J instanceof Error ? J.message : "upload failed");
    } finally {
      C(!1);
    }
  }, A = o === "recording" ? "REC" : o === "ready" ? "OK" : o === "preparing" ? "..." : "MIC";
  return /* @__PURE__ */ c.jsx("div", { className: lM, role: "presentation", onClick: s, children: /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: ee,
      className: oM,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "mic-recorder-heading",
      onClick: (H) => H.stopPropagation(),
      onKeyDown: z,
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
                G();
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
              onClick: Q,
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
                W();
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
              onChange: (H) => w(H.target.value),
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
  const [f, m] = g.useState(""), [y, p] = g.useState("all"), [b, v] = g.useState(!1), [S, w] = g.useState(null), [j, C] = g.useState(!1), [_, T] = g.useState(!1), O = g.useRef(null), R = g.useCallback(
    (Q) => "upload",
    []
  ), N = g.useMemo(() => {
    const Q = f.trim().toLowerCase();
    return a.filter((ie) => {
      const A = R(ie);
      return !(y === "uploaded" && A !== "upload" || y === "preset" && A !== "preset" || Q && !ie.displayName.toLowerCase().includes(Q));
    });
  }, [a, f, y, R]), $ = g.useMemo(
    () => a.filter((Q) => R(Q) === "upload").length,
    [a, R]
  ), Y = g.useCallback(
    (Q) => {
      const ie = [], A = /* @__PURE__ */ new Set();
      for (const H of s)
        H.speakerVoiceAssetId === Q && (A.has(H.characterName) || (A.add(H.characterName), ie.push({
          characterName: H.characterName,
          // audit-allow: hex — neon decorative palette per design lang
          color: i[H.characterName] ?? "#ba9eff"
        })));
      return ie;
    },
    [s, i]
  ), ee = g.useCallback(
    async (Q) => {
      const ie = Array.from(Q).slice(0, 8);
      if (ie.length !== 0) {
        T(!0);
        try {
          const A = [];
          for (const H of ie) {
            if (!H.type.startsWith("audio/") && !/\.(wav|mp3|flac|ogg|m4a|webm)$/i.test(H.name)) {
              mn.error(`${H.name}: not an audio file`);
              continue;
            }
            const U = H.name.replace(/\.[^.]+$/, "");
            try {
              const J = await Tc(t, H, U, "speaker");
              A.push(J), mn.success(`Added ${J.displayName}`);
            } catch (J) {
              mn.error(J instanceof Error ? J.message : `${H.name}: upload failed`);
            }
          }
          A.length > 0 && o([...A, ...a]);
        } finally {
          T(!1);
        }
      }
    },
    [t, a, o]
  ), M = (Q) => {
    Q.preventDefault(), v(!1), Q.dataTransfer?.files && ee(Q.dataTransfer.files);
  }, I = g.useCallback(async () => {
    const Q = window.prompt("Paste an audio URL (https://…)");
    if (Q)
      try {
        const ie = await fetch(Q);
        if (!ie.ok) throw new Error(`fetch failed: ${ie.status}`);
        const A = await ie.blob(), H = Q.split("/").pop()?.split("?")[0] ?? "voice.wav", U = new File([A], H, { type: A.type || "audio/wav" });
        await ee([U]);
      } catch (ie) {
        mn.error(ie instanceof Error ? ie.message : "could not fetch URL");
      }
  }, [ee]), z = g.useCallback(
    async (Q, ie) => {
      try {
        const A = await zT(t, Q, ie);
        o(
          a.map((H) => H.voiceAssetId === Q ? A : H)
        ), mn.success(`Renamed to ${A.displayName}`);
      } catch (A) {
        mn.error(A instanceof Error ? A.message : "rename failed");
      }
    },
    [t, a, o]
  ), F = g.useCallback((Q) => {
    navigator.clipboard?.writeText ? (navigator.clipboard.writeText(Q), mn.success("Copied name")) : mn.error("Clipboard unavailable");
  }, []), W = g.useCallback(
    async (Q) => {
      if (window.confirm(`Delete "${Q.displayName}"? Mappings using it will reset.`))
        try {
          await DT(t, Q.voiceAssetId), o(a.filter((A) => A.voiceAssetId !== Q.voiceAssetId)), mn.success(`Deleted ${Q.displayName}`);
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
        onDragOver: (Q) => {
          Q.preventDefault(), v(!0);
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
                    I();
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
              className: L_,
              onChange: (Q) => {
                Q.target.files && (ee(Q.target.files), Q.target.value = "");
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
            onChange: (Q) => m(Q.target.value),
            placeholder: "Search voices…",
            "aria-label": "Search voices"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: M_, role: "group", "aria-label": "Filter voices", children: [
        ["all", "All"],
        ["uploaded", "Uploaded"],
        ["preset", "Built-in"]
      ].map(([Q, ie]) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: A_,
          "data-active": y === Q ? "true" : "false",
          onClick: () => p(Q),
          children: ie
        },
        Q
      )) }),
      /* @__PURE__ */ c.jsxs("span", { className: z_, children: [
        /* @__PURE__ */ c.jsx("span", { className: O_, children: a.length }),
        " voices",
        /* @__PURE__ */ c.jsx("span", { children: "·" }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          $,
          " uploaded"
        ] })
      ] })
    ] }),
    N.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: D_, children: a.length === 0 ? "No voices yet. Drop audio above or record from your microphone." : "No voices match this filter." }) : /* @__PURE__ */ c.jsx("div", { className: k_, children: N.map((Q) => {
      const ie = R(Q);
      return /* @__PURE__ */ c.jsx(
        iM,
        {
          asset: Q,
          presentation: ie,
          usedBy: Y(Q.voiceAssetId),
          isPlaying: S === Q.voiceAssetId,
          onTogglePlay: () => w((A) => A === Q.voiceAssetId ? null : Q.voiceAssetId),
          onPlaybackEnded: () => w(null),
          onRename: (A) => z(Q.voiceAssetId, A),
          onCopyName: () => F(Q.displayName),
          onDelete: ie === "upload" ? () => void W(Q) : void 0,
          onCreateCharacter: u ? (A) => u(Q, A) : void 0
        },
        Q.voiceAssetId
      );
    }) }),
    /* @__PURE__ */ c.jsx(
      SM,
      {
        open: j,
        defaultName: `Take ${a.length + 1}`,
        onClose: () => C(!1),
        onSubmit: async (Q, ie) => {
          await G(Q, ie);
        }
      }
    )
  ] });
  async function G(Q, ie) {
    T(!0);
    try {
      const A = await Tc(t, Q, ie, "speaker");
      o([A, ...a]), mn.success(`Recorded ${A.displayName}`);
    } catch (A) {
      throw mn.error(A instanceof Error ? A.message : "upload failed"), A;
    } finally {
      T(!1);
    }
  }
}
async function jM(t) {
  return Dt(`/presets?deploymentId=${encodeURIComponent(t)}`);
}
async function EM(t, a, s) {
  return Dt("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: t, presetName: a, vector: s })
  });
}
async function NM(t, a) {
  await Dt(
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
    return b(!0), S(null), bc(t, T.kind, T.id, 50).then(($) => {
      N || y($.entries);
    }).catch(($) => {
      N || S($ instanceof Error ? $.message : "audit fetch failed");
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
    }, $ = new Blob([JSON.stringify(N, null, 2)], {
      type: "application/json"
    }), Y = URL.createObjectURL($), ee = document.createElement("a");
    ee.href = Y, ee.download = `audit-${T.kind}-${T.id}-${Date.now()}.json`, document.body.appendChild(ee), ee.click(), document.body.removeChild(ee), URL.revokeObjectURL(Y);
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
    v && /* @__PURE__ */ c.jsx("div", { className: $M, children: v }),
    p && !v && /* @__PURE__ */ c.jsx("div", { className: UM, "aria-live": "polite", children: "Loading edit history…" }),
    !p && !v && m.length === 0 && /* @__PURE__ */ c.jsxs("p", { className: j0, children: [
      "No edits recorded for this target yet.",
      /* @__PURE__ */ c.jsx("br", {}),
      /* @__PURE__ */ c.jsx("span", { className: LM, children: "Apply a chain in the editor to populate the history." })
    ] }),
    !p && !v && m.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: MM, children: m.map((N) => {
      const $ = i && T && !!N.chain_snapshot_json && N.operation_count > 0;
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
        $ && /* @__PURE__ */ c.jsx(
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
var VM = "_1uzgubz0", qM = "_1uzgubz1", HM = "_1uzgubz2", FM = "_1uzgubz3", PM = "_1uzgubz4", GM = "_1uzgubz5", YM = "_1uzgubz6", KM = "_1uzgubz7", E0 = "_1uzgubz8", XM = "_1uzgubz9", z1 = "_1uzgubza", O1 = "_1uzgubzb", QM = "_1uzgubzc", ZM = "_1uzgubzd", Qo = "_1uzgubze", Zo = "_1uzgubzf", JM = "_1uzgubzg", WM = "_1uzgubzh", N0 = "_1uzgubzi", C0 = "_1uzgubzj", T0 = "_1uzgubzk", R0 = "_1uzgubzl", _0 = "_1uzgubzm", e2 = "_1uzgubzn", t2 = "_1uzgubzo", n2 = "_1uzgubzp", a2 = "_1uzgubzq";
function r2({
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
  return /* @__PURE__ */ c.jsxs("div", { className: `${VM}${f ? ` ${qM}` : ""}`, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: HM,
        onClick: m,
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
              className: `${XM} ${O ? z1 : O1}`,
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
        className: `${t2} ${o ? z1 : O1}`,
        children: o ? `All ${a} mapped` : `${t} of ${a} unmapped`
      }
    ) }),
    /* @__PURE__ */ c.jsx("ul", { className: n2, children: s })
  ] });
}
async function yl() {
  return Dt("/runtime/health");
}
async function i2(t, a) {
  const s = {};
  t != null && (s.numWorkers = t), a != null && (s.warmup = a), await Dt("/runtime/start", {
    method: "POST",
    ...Object.keys(s).length > 0 ? { body: JSON.stringify(s) } : {}
  });
}
async function l2() {
  return Dt("/runtime/stop", { method: "POST" });
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
function o2() {
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
function c2(t) {
  U1 = t;
}
var u2 = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function Fn({
  severity: t,
  children: a,
  role: s,
  ariaLive: i,
  className: o,
  style: u
}) {
  const f = [u2[t], o].filter(Boolean).join(" "), m = s ?? (t === "error" ? "alert" : "status"), y = i ?? (t === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ c.jsx("div", { className: f, role: m, "aria-live": y, style: u, children: a });
}
var I1 = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, V1 = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, d2 = "_13bb4njb";
function Er({
  tone: t,
  size: a = "sm",
  pulse: s = !1,
  children: i,
  className: o,
  style: u,
  title: f
}) {
  const m = s && t !== "faint", y = [I1[a], V1[t], m ? d2 : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("span", { className: y, style: u, title: f, children: i });
}
const f2 = 4e3;
function h2({ deployment: t }) {
  const [a, s] = g.useState(null), [i, o] = g.useState(null), [u, f] = g.useState(1), m = g.useState({ done: !1 })[0], [y, p] = g.useState(B1());
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
    T != null && !m.done && (m.done = !0, f(T), A0(T));
  }, [a?.workersActive, m]);
  const b = a?.badge ?? "not_installed", v = i?.includes("model_missing") ?? !1, S = a?.workersCeiling ?? 1, w = a?.workersActive ?? 1, j = b === "ready" || b === "running" || b === "starting", C = a?.workersWarming ?? 0, _ = a?.workersWarm ?? 0;
  return /* @__PURE__ */ c.jsxs("output", { className: g_, "aria-live": "polite", children: [
    /* @__PURE__ */ c.jsx("span", { className: br, children: "Runtime" }),
    /* @__PURE__ */ c.jsx("span", { children: t.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ c.jsx("span", { className: br, children: "Badge" }),
    /* @__PURE__ */ c.jsx(Er, { tone: b2(b), pulse: b === "starting" || b === "installing", children: L1(b) }),
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
              p(O), c2(O);
            },
            style: v2
          }
        ),
        /* @__PURE__ */ c.jsx("span", { style: k0, children: "Preload models on start" })
      ] })
    ] }),
    v && /* @__PURE__ */ c.jsxs(Fn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("strong", { children: "IndexTTS-2 model is not installed." }),
      " ",
      "Open ",
      /* @__PURE__ */ c.jsx("em", { children: "Settings → Dependencies → Install all" }),
      " to download the required artifacts, then retry."
    ] }),
    i && !v && /* @__PURE__ */ c.jsx(Fn, { severity: "error", children: i })
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
  const i = { id: An(), mode: "gain", gain_db: a };
  return { ...t, ops: Rr(s, i) };
}
function T2(t, a, s, i) {
  const o = Tr(t, "eq3");
  if (Math.abs(a) < Va && Math.abs(s) < Va && Math.abs(i) < Va)
    return { ...t, ops: o };
  const u = {
    id: An(),
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
  const i = { id: An(), mode: "speed", factor: a };
  return { ...t, ops: Rr(s, i) };
}
function _2(t, a) {
  const s = Tr(t, "pitch_shift");
  if (Math.abs(a) < Va) return { ...t, ops: s };
  const i = {
    id: An(),
    mode: "pitch_shift",
    semitones: a
  };
  return { ...t, ops: Rr(s, i) };
}
function M2(t, a, s) {
  const i = Tr(t, "normalize");
  if (a === "off") return { ...t, ops: i };
  const o = {
    id: An(),
    mode: "normalize",
    target_lufs: s
  };
  return { ...t, ops: Rr(i, o) };
}
function A2(t, a) {
  const s = Tr(t, "fade_in");
  if (a <= 0) return { ...t, ops: s };
  const i = {
    id: An(),
    mode: "fade_in",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Rr(s, i) };
}
function k2(t, a) {
  const s = Tr(t, "fade_out");
  if (a <= 0) return { ...t, ops: s };
  const i = {
    id: An(),
    mode: "fade_out",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Rr(s, i) };
}
function D2(t, a, s) {
  const i = Tr(t, "silence_strip");
  if (!a) return { ...t, ops: i };
  const o = {
    id: An(),
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
function F1(t) {
  const a = {
    ...t,
    ops: t.ops.filter((s) => q1.has(s.mode))
  };
  return j2(a);
}
var z2 = "_1rsa80i0", O2 = "_1rsa80i1", L2 = "_1rsa80i2", $2 = "_1rsa80i3", U2 = "_1rsa80i4", B2 = "_1rsa80i5", I2 = "_1rsa80i6", V2 = "_1rsa80i7", q2 = "_1rsa80i8", H2 = "_1rsa80i9";
const P1 = ["flat", "warm", "bright", "voice", "telephone"], tl = -12, Jo = 12, F2 = 0.5;
function P2(t) {
  const { low: a, mid: s, high: i, preset: o, onChange: u, disabled: f } = t, m = (p) => {
    const b = Rc[p];
    u(b.low, b.mid, b.high, p);
  }, y = (p, b) => {
    const v = { low: a, mid: s, high: i, [p]: b }, S = Y2(v.low, v.mid, v.high);
    u(v.low, v.mid, v.high, S);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: z2, children: [
    /* @__PURE__ */ c.jsxs("div", { className: O2, role: "group", "aria-label": "EQ presets", children: [
      P1.map((p) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: L2,
          "data-active": o === p,
          onClick: () => m(p),
          disabled: f,
          children: p
        },
        p
      )),
      o === "custom" ? /* @__PURE__ */ c.jsx("span", { className: $2, children: "custom" }) : null
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: U2, children: [
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
  for (const i of P1) {
    const o = Rc[i];
    if (Math.abs(o.low - t) < Ef && Math.abs(o.mid - a) < Ef && Math.abs(o.high - s) < Ef)
      return i;
  }
  return "custom";
}
var K2 = "_85bhwb0", X2 = "_85bhwb1", D0 = "_85bhwb2", Q2 = "_85bhwb3", Z2 = "_85bhwb4", J2 = "_85bhwb5", W2 = "_85bhwb6", eA = "_85bhwb7";
const Wo = 0.5, Nf = 2, tA = 0.05;
function nA(t) {
  const { mode: a, value: s, supportsSynthSpeed: i, onChange: o, onReRenderAtSynthTime: u, disabled: f } = t, m = (s - Wo) / (Nf - Wo) * 100, y = g.useId(), p = (v) => o(v, s), b = (v) => o(a, v);
  return /* @__PURE__ */ c.jsxs("div", { className: K2, children: [
    i ? /* @__PURE__ */ c.jsxs("div", { className: X2, role: "group", "aria-label": "Speed mode", children: [
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
          style: { "--fill": `${m}%` },
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
var aA = "kgszk50", rA = "kgszk51", z0 = "kgszk52", sA = "kgszk53", iA = "kgszk54", G1 = "kgszk55", lA = "kgszk56", oA = "kgszk58", em = "kgszk59", Y1 = "kgszk5a", tm = "kgszk5b", cA = "kgszk5c", uA = "kgszk5d", dA = "kgszk5e", O0 = "kgszk5f", L0 = "kgszk5g", $0 = "kgszk5h", fA = "kgszk5i", hA = "kgszk5j", mA = "kgszk5l", bl = "kgszk5m", xl = "kgszk5n";
const pA = -24, gA = 24, vA = 0.5, yA = -12, bA = 12, xA = 0.5, SA = -30, wA = -6, jA = -12, EA = 0, ec = -60, Cf = -20;
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
        disabled: m
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
          disabled: m,
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
        min: yA,
        max: bA,
        step: xA,
        format: MA,
        value: a.pitchSt,
        onChange: (w) => b({ pitchSt: w }),
        disabled: m
      }
    ),
    /* @__PURE__ */ c.jsx(
      NA,
      {
        normalize: a.normalize,
        disabled: m,
        onChange: (w) => b({ normalize: w })
      }
    ),
    /* @__PURE__ */ c.jsx(
      CA,
      {
        inS: a.fade.inS,
        outS: a.fade.outS,
        disabled: m,
        onChange: (w, j) => b({ fade: { ...a.fade, inS: w, outS: j } })
      }
    ),
    /* @__PURE__ */ c.jsx(
      TA,
      {
        enabled: a.silence.enabled,
        thresholdDb: a.silence.thresholdDb,
        disabled: m,
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
    /* @__PURE__ */ c.jsxs("div", { className: lA, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: v, className: oA, children: a }),
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
function NA({ normalize: t, onChange: a, disabled: s }) {
  const o = t.mode === "loudness" ? { min: SA, max: wA, step: 0.5, suffix: "LUFS" } : { min: jA, max: EA, step: 0.5, suffix: "dB" }, u = AA(t.targetDbOrLufs, o.min, o.max), f = (u - o.min) / (o.max - o.min) * 100, m = (y) => {
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
      const p = y === "peak";
      return /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: uA,
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
}, K1 = 0.05;
function N3(t) {
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
function C3(t) {
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
const Y0 = 0.05, K0 = 0.2, T3 = 22, R3 = 320, Rf = 0.78;
function _f(t, a, s, i) {
  const o = Math.cos(s), u = Math.sin(s), f = t * o + a * u;
  return Math.max(0, Math.min(1, f / i));
}
function _3(t) {
  const { vec: a, onChange: s, size: i, reduceMotion: o = !1 } = t, [u, f] = g.useState(a), [m, y] = g.useState(null), [p, b] = g.useState(null), v = g.useRef(null), S = g.useRef(a), w = g.useRef(o), j = g.useRef(null), C = g.useRef(0);
  w.current = o, g.useEffect(() => {
    f(a), S.current = a;
  }, [a]);
  const _ = g.useCallback(
    (I) => {
      const z = ts(I);
      f(z), S.current = z, s(z);
    },
    [s]
  ), T = g.useCallback((I) => {
    const z = ts(I);
    f(z), S.current = z;
  }, []), O = g.useCallback(
    (I) => {
      const z = v.current;
      if (!z || w.current) return;
      const F = I.clientX - z.centerX, W = I.clientY - z.centerY, G = i / 2 * Rf, Q = _f(F, W, z.angle, G), ie = { ...S.current, [z.axis]: Q };
      T(ie);
    },
    [i, T]
  ), R = g.useCallback(
    (I) => {
      const z = v.current;
      if (z) {
        if (window.removeEventListener("pointermove", O), window.removeEventListener("pointerup", R), window.removeEventListener("pointercancel", R), w.current) {
          const F = I.clientX - z.centerX, W = I.clientY - z.centerY, G = i / 2 * Rf, Q = _f(F, W, z.angle, G), ie = { ...S.current, [z.axis]: Q };
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
  const N = g.useCallback((I, z) => {
    w.current || (C.current += 1, b({ x: I, y: z, key: C.current }), j.current !== null && window.clearTimeout(j.current), j.current = window.setTimeout(() => {
      b(null), j.current = null;
    }, R3));
  }, []), $ = g.useCallback(
    (I, z, F, W, G) => {
      const Q = F.getBoundingClientRect(), ie = Q.left + Q.width / 2, A = Q.top + Q.height / 2, U = an.indexOf(I) / an.length * Math.PI * 2 - Math.PI / 2;
      if (v.current = {
        axis: I,
        pointerId: z,
        centerX: ie,
        centerY: A,
        angle: U
      }, y(I), W !== void 0 && G !== void 0) {
        const J = W - ie, pe = G - A, k = i / 2 * Rf, te = _f(J, pe, U, k), ne = { ...S.current, [I]: te };
        w.current ? _(ne) : T(ne);
      }
      window.addEventListener("pointermove", O), window.addEventListener("pointerup", R), window.addEventListener("pointercancel", R);
    },
    [_, O, R, i, T]
  ), Y = g.useCallback(
    (I, z) => {
      z.preventDefault();
      const F = z.currentTarget, W = F.ownerSVGElement ?? F;
      $(I, z.pointerId, W);
    },
    [$]
  ), ee = g.useCallback(
    (I) => {
      const z = I.currentTarget, F = z instanceof SVGSVGElement ? z : z.ownerSVGElement ?? z, W = F.getBoundingClientRect(), G = W.left + W.width / 2, Q = W.top + W.height / 2, ie = I.clientX - G, A = I.clientY - Q;
      if (Math.sqrt(ie * ie + A * A) < 8) return;
      let U = Math.atan2(A, ie) * 180 / Math.PI;
      U = ((U + 90) % 360 + 360) % 360;
      let J = null, pe = 999;
      for (let ne = 0; ne < an.length; ne++) {
        const K = an[ne];
        if (!K) continue;
        const B = ne / an.length * 360, ae = Math.abs((B - U + 540) % 360 - 180);
        ae < pe && (pe = ae, J = K);
      }
      if (!J || pe > T3) return;
      I.preventDefault();
      const k = (I.clientX - W.left) / W.width * i, te = (I.clientY - W.top) / W.height * i;
      N(k, te), $(J, I.pointerId, F, I.clientX, I.clientY);
    },
    [$, i, N]
  ), M = g.useCallback(
    (I, z) => {
      const F = S.current[I];
      let W = F;
      switch (z.key) {
        case "ArrowUp":
        case "ArrowRight":
          W = F + Y0;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          W = F - Y0;
          break;
        case "PageUp":
          W = F + K0;
          break;
        case "PageDown":
          W = F - K0;
          break;
        case "Home":
          W = 0;
          break;
        case "End":
          W = 1;
          break;
        default:
          return;
      }
      z.preventDefault(), y(I), _({ ...S.current, [I]: W });
    },
    [_]
  );
  return {
    liveVec: u,
    activeAxis: m,
    setActiveAxis: y,
    onPointerDown: Y,
    onKeyDown: M,
    onSurfacePointerDown: ee,
    surfacePing: p
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
  const u = _3({ vec: t, onChange: a, size: s, reduceMotion: o }), f = s / 2, m = s / 2, y = s / 2 * 0.78, p = g.useMemo(() => k3(f, m, y), [f, m, y]), b = g.useMemo(() => an.map((v, S) => {
    const w = xc(u.liveVec[v]), j = p[S];
    return j ? `${f + j.dx * w},${m + j.dy * w}` : "0,0";
  }).join(" "), [p, f, m, u.liveVec]);
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
                className: d3,
                x1: f,
                y1: m,
                x2: f + w.dx,
                y2: m + w.dy
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
          const j = p[S];
          if (!j) return null;
          const C = u.activeAxis === v;
          return /* @__PURE__ */ c.jsx(
            "line",
            {
              className: `${h3}${C ? ` ${m3}` : ""}`,
              x1: f,
              y1: m,
              x2: f + j.dx * w,
              y2: m + j.dy * w
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
          const w = xc(u.liveVec[v]), j = p[S];
          if (!j) return null;
          const C = f + j.dx * w, _ = m + j.dy * w, T = u.activeAxis === v;
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
  const s = a / 2, i = a / 2, o = a / 2 * 0.86, u = g.useMemo(() => an.map((f, m) => {
    const y = xc(t[f]), p = m / an.length * Math.PI * 2 - Math.PI / 2, b = s + Math.cos(p) * o * y, v = i + Math.sin(p) * o * y;
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
      rk.some((T) => new RegExp(`\\b${T}\\b`).test(_)) || (m += 1);
    }
    if (m > 0) {
      const y = f.weight * Math.min(1, 0.55 + 0.2 * (m - 1)) * i * o;
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
  const u = t.mode ?? "emotion_vector", f = u === "none" || u === "audio_ref" ? "emotion_vector" : u, m = g.useMemo(() => ok(t.vector), [t.vector]), y = t.emotionAlpha ?? 1, [p, b] = g.useState(null), [v, S] = g.useState(!1), [w, j] = g.useState(null), [C, _] = g.useState(""), [T, O] = g.useState(!1), R = g.useRef(!0);
  g.useEffect(() => (R.current = !0, () => {
    R.current = !1;
  }), []), g.useEffect(() => {
    T || _(G0(m));
  }, [m, T]);
  const N = (U) => {
    a({ ...t, mode: U });
  }, $ = (U) => {
    a({
      ...t,
      mode: "emotion_vector",
      vector: Mf(U)
    }), w && j(null);
  }, Y = () => {
    $(ts(Ws));
  }, ee = (U) => {
    const J = Math.max(0, Math.min(10, Number.isFinite(U) ? U : 1));
    a({ ...t, emotionAlpha: J });
  }, M = async () => {
    const U = C.trim();
    if (U) {
      S(!0), b(null);
      try {
        const J = await EM(s, U, Mf(m));
        if (!R.current) return;
        o(
          ck([J, ...i.filter((pe) => pe.presetId !== J.presetId)])
        ), j(J.presetId), O(!1);
      } catch (J) {
        R.current && b(J0(J));
      } finally {
        R.current && S(!1);
      }
    }
  }, I = async (U) => {
    const J = [...i];
    o(i.filter((pe) => pe.presetId !== U)), w === U && j(null);
    try {
      await NM(s, U);
    } catch (pe) {
      R.current && (o(J), b(J0(pe)));
    }
  }, z = (U) => {
    j(U.presetId), a({
      ...t,
      mode: "emotion_vector",
      vector: U.vector
    });
  }, F = (U) => {
    a({ ...t, mode: "qwen_template", qwenTemplate: U });
  }, W = N3(m), G = C3(m), Q = X1(m, 3), ie = Q.length > 0 && C.trim().length > 0 && !v, A = G0(m) || "name your preset…", H = f !== "emotion_vector";
  return /* @__PURE__ */ c.jsxs("div", { className: kA, children: [
    /* @__PURE__ */ c.jsxs("div", { className: DA, children: [
      /* @__PURE__ */ c.jsx("span", { className: B0, children: "Emotion mode" }),
      /* @__PURE__ */ c.jsx("div", { className: zA, role: "radiogroup", "aria-label": "Emotion mode", children: ik.map((U) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": f === U.id,
          className: `${OA}${f === U.id ? ` ${LA}` : ""}`,
          onClick: () => N(U.id),
          children: U.label
        },
        U.id
      )) })
    ] }),
    f === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: GA, children: [
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: YA,
          placeholder: 'e.g. "Friendly teen, slightly skeptical"',
          value: t.qwenTemplate ?? "",
          onChange: (U) => F(U.target.value)
        }
      ),
      /* @__PURE__ */ c.jsxs("div", { className: KA, children: [
        /* @__PURE__ */ c.jsx(
          Ze,
          {
            variant: "secondary",
            onClick: () => {
              const U = (t.qwenTemplate ?? "").trim();
              if (!U) return;
              const J = sk(U);
              a({
                ...t,
                mode: "emotion_vector",
                vector: Mf(J)
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
          vec: m,
          onChange: $,
          readOnly: H
        }
      ) }),
      /* @__PURE__ */ c.jsxs("div", { className: `${m0} ${UA}`, children: [
        /* @__PURE__ */ c.jsxs("div", { className: BA, children: [
          /* @__PURE__ */ c.jsx("span", { className: B0, children: "Dominant" }),
          /* @__PURE__ */ c.jsx("span", { className: IA, children: W ? Sl[W].toLowerCase() : "neutral" }),
          /* @__PURE__ */ c.jsxs("span", { className: VA, children: [
            "‖v‖ = ",
            G.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(q3, { vec: m, onChange: $, readOnly: H }),
        /* @__PURE__ */ c.jsx("div", { className: qA, children: /* @__PURE__ */ c.jsxs(
          Ze,
          {
            variant: "ghost",
            size: "sm",
            onClick: Y,
            disabled: H || G < 1e-3,
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
            onChange: (U) => ee(Number(U.target.value)),
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
          className: `${QA}${Q.length === 0 ? ` ${ZA}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs("div", { className: JA, children: [
              /* @__PURE__ */ c.jsx("span", { className: WA, children: "Save current as preset" }),
              Q.length === 0 && /* @__PURE__ */ c.jsx("span", { className: e3, children: "adjust the radar to enable" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: t3, children: [
              /* @__PURE__ */ c.jsx("div", { className: n3, children: Q.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: `${P0} ${r3}`, children: "no axes set" }) : Q.map((U) => /* @__PURE__ */ c.jsxs("span", { className: P0, children: [
                U.label.toLowerCase(),
                /* @__PURE__ */ c.jsx("b", { className: a3, children: U.value.toFixed(2) })
              ] }, U.key)) }),
              /* @__PURE__ */ c.jsxs("div", { className: s3, children: [
                /* @__PURE__ */ c.jsx(
                  "input",
                  {
                    type: "text",
                    className: i3,
                    placeholder: A,
                    value: C,
                    disabled: Q.length === 0 || v,
                    onChange: (U) => {
                      _(U.target.value), O(!0);
                    },
                    onKeyDown: (U) => {
                      U.key === "Enter" && ie && M();
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
          onSelect: z,
          onDelete: I
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
          onChange: (U) => ee(Number(U.target.value)),
          "aria-label": "Emotion alpha"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: H0, children: [
        (y * 100).toFixed(0),
        "%"
      ] })
    ] }),
    p && /* @__PURE__ */ c.jsx("div", { className: XA, children: p })
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
  onGenerationChange: m
}) {
  const y = g.useId(), p = g.useId(), b = g.useId(), v = g.useId(), S = g.useId(), w = ($, Y) => {
    m({ ...f, [$]: Y });
  }, j = f.seed === void 0 || f.seed === null ? "random" : "fixed", C = ($) => {
    if ($ !== j)
      if ($ === "random") {
        const Y = { ...f };
        delete Y.seed, m(Y);
      } else {
        const Y = nc(f, "seed", tb);
        m({ ...f, seed: Y });
      }
  }, _ = kf.find(($) => $.id === o) ?? kf[0], T = (s - tc) / (Df - tc) * 100, O = nc(f, "temperature", Ek), R = nc(f, "top_p", Nk), N = nc(f, "seed", tb);
  return /* @__PURE__ */ c.jsxs("div", { className: uk, children: [
    /* @__PURE__ */ c.jsxs("div", { className: nl, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: y, className: Vs, children: "Format" }),
      /* @__PURE__ */ c.jsx("div", { className: al, children: /* @__PURE__ */ c.jsx(
        "select",
        {
          id: y,
          className: fk,
          value: t,
          onChange: ($) => a($.currentTarget.value),
          children: wk.map(($) => /* @__PURE__ */ c.jsx("option", { value: $, children: $ }, $))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: nl, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: p, className: Vs, children: "Speed" }),
      /* @__PURE__ */ c.jsxs("div", { className: `${al} ${hk}`, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: p,
            type: "range",
            className: mk,
            min: tc,
            max: Df,
            step: jk,
            value: s,
            style: { "--range-pct": `${T}%` },
            onChange: ($) => i(Number($.currentTarget.value)),
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
      /* @__PURE__ */ c.jsx("div", { className: gk, children: kf.map(($) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": o === $.id,
          className: vk,
          onClick: () => u($.id),
          title: $.help,
          children: $.label
        },
        $.id
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
          onChange: ($) => w("temperature", Number($.currentTarget.value))
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
          onChange: ($) => w("top_p", Number($.currentTarget.value))
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
                onChange: ($) => w("seed", Math.trunc(Number($.currentTarget.value))),
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
function Lf({ label: t, sub: a, min: s, max: i, step: o, format: u, value: f, onChange: m }) {
  const y = (f - s) / (i - s) * 100, p = `perf-${t.toLowerCase()}`;
  return /* @__PURE__ */ c.jsxs("div", { className: Bk, children: [
    /* @__PURE__ */ c.jsxs("div", { className: Ik, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: p, className: Vk, children: t }),
      /* @__PURE__ */ c.jsx("span", { className: qk, children: a })
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
        className: Hk,
        style: { "--fill": `${y}%` },
        onChange: (b) => m(Number(b.target.value))
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
          /* @__PURE__ */ c.jsx("span", { className: `${I1.sm} ${V1[c5[u.status] ?? "neutral"]}`, children: u.status }),
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
const Q1 = g.createContext({});
function am(t) {
  const a = g.useRef(null);
  return a.current === null && (a.current = t()), a.current;
}
const f5 = typeof window < "u", Z1 = f5 ? g.useLayoutEffect : g.useEffect, Xc = /* @__PURE__ */ g.createContext(null);
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
const Cr = {}, J1 = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function p5(t) {
  return typeof t == "object" && t !== null;
}
const W1 = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function eS(t) {
  let a;
  return () => (a === void 0 && (a = t()), a);
}
const ri = /* @__NO_SIDE_EFFECTS__ */ (t) => t, g5 = (t, a) => (s) => a(t(s)), Qc = (...t) => t.reduce(g5), tS = /* @__NO_SIDE_EFFECTS__ */ (t, a, s) => {
  const i = a - t;
  return i === 0 ? 1 : (s - t) / i;
};
class nS {
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
const na = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, ua = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3;
function aS(t, a) {
  return a ? t * (1e3 / a) : 0;
}
const rS = (t, a, s) => (((1 - 3 * s + 3 * a) * t + (3 * s - 6 * a)) * t + 3 * a) * t, v5 = 1e-7, y5 = 12;
function b5(t, a, s, i, o) {
  let u, f, m = 0;
  do
    f = a + (s - a) / 2, u = rS(f, i, o) - t, u > 0 ? s = f : a = f;
  while (Math.abs(u) > v5 && ++m < y5);
  return f;
}
function Ml(t, a, s, i) {
  if (t === a && s === i)
    return ri;
  const o = (u) => b5(u, 0, 1, t, s);
  return (u) => u === 0 || u === 1 ? u : rS(o(u), a, i);
}
const sS = (t) => (a) => a <= 0.5 ? t(2 * a) / 2 : (2 - t(2 * (1 - a))) / 2, iS = (t) => (a) => 1 - t(1 - a), lS = /* @__PURE__ */ Ml(0.33, 1.53, 0.69, 0.99), rm = /* @__PURE__ */ iS(lS), oS = /* @__PURE__ */ sS(rm), cS = (t) => t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * rm(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), sm = (t) => 1 - Math.sin(Math.acos(t)), x5 = iS(sm), uS = sS(sm), S5 = /* @__PURE__ */ Ml(0.42, 0, 1, 1), w5 = /* @__PURE__ */ Ml(0, 0, 0.58, 1), dS = /* @__PURE__ */ Ml(0.42, 0, 0.58, 1), j5 = (t) => Array.isArray(t) && typeof t[0] != "number", fS = (t) => Array.isArray(t) && typeof t[0] == "number", cb = {
  linear: ri,
  easeIn: S5,
  easeInOut: dS,
  easeOut: w5,
  circIn: sm,
  circInOut: uS,
  circOut: x5,
  backIn: rm,
  backInOut: oS,
  backOut: lS,
  anticipate: cS
}, E5 = (t) => typeof t == "string", ub = (t) => {
  if (fS(t)) {
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
const C5 = 40;
function hS(t, a) {
  let s = !1, i = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, u = () => s = !0, f = ac.reduce((R, N) => (R[N] = N5(u), R), {}), { setup: m, read: y, resolveKeyframes: p, preUpdate: b, update: v, preRender: S, render: w, postRender: j } = f, C = () => {
    const R = Cr.useManualTiming, N = R ? o.timestamp : performance.now();
    s = !1, R || (o.delta = i ? 1e3 / 60 : Math.max(Math.min(N - o.timestamp, C5), 1)), o.timestamp = N, o.isProcessing = !0, m.process(o), y.process(o), p.process(o), b.process(o), v.process(o), S.process(o), w.process(o), j.process(o), o.isProcessing = !1, s && a && (i = !1, t(C));
  }, _ = () => {
    s = !0, i = !0, o.isProcessing || t(C);
  };
  return { schedule: ac.reduce((R, N) => {
    const $ = f[N];
    return R[N] = (Y, ee = !1, M = !1) => (s || _(), $.schedule(Y, ee, M)), R;
  }, {}), cancel: (R) => {
    for (let N = 0; N < ac.length; N++)
      f[ac[N]].cancel(R);
  }, state: o, steps: f };
}
const { schedule: aa, cancel: oh, state: _c } = /* @__PURE__ */ hS(typeof requestAnimationFrame < "u" ? requestAnimationFrame : ri, !0);
let Sc;
function T5() {
  Sc = void 0;
}
const Hn = {
  now: () => (Sc === void 0 && Hn.set(_c.isProcessing || Cr.useManualTiming ? _c.timestamp : performance.now()), Sc),
  set: (t) => {
    Sc = t, queueMicrotask(T5);
  }
}, mS = (t) => (a) => typeof a == "string" && a.startsWith(t), pS = /* @__PURE__ */ mS("--"), R5 = /* @__PURE__ */ mS("var(--"), im = (t) => R5(t) ? _5.test(t.split("/*")[0].trim()) : !1, _5 = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
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
const A5 = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, om = (t, a) => (s) => !!(typeof s == "string" && A5.test(s) && s.startsWith(t) || a && !M5(s) && Object.prototype.hasOwnProperty.call(s, a)), gS = (t, a, s) => (i) => {
  if (typeof i != "string")
    return i;
  const [o, u, f, m] = i.match(lm);
  return {
    [t]: parseFloat(o),
    [a]: parseFloat(u),
    [s]: parseFloat(f),
    alpha: m !== void 0 ? parseFloat(m) : 1
  };
}, k5 = (t) => Nr(0, 255, t), $f = {
  ...si,
  transform: (t) => Math.round(k5(t))
}, Qr = {
  test: /* @__PURE__ */ om("rgb", "red"),
  parse: /* @__PURE__ */ gS("red", "green", "blue"),
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
}), yr = /* @__PURE__ */ Al("deg"), Qs = /* @__PURE__ */ Al("%"), ze = /* @__PURE__ */ Al("px"), z5 = /* @__PURE__ */ Al("vh"), O5 = /* @__PURE__ */ Al("vw"), fb = {
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
}, L5 = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function $5(t) {
  return isNaN(t) && typeof t == "string" && (t.match(lm)?.length || 0) + (t.match(L5)?.length || 0) > 0;
}
const vS = "number", yS = "color", U5 = "var", B5 = "var(", hb = "${}", I5 = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function ti(t) {
  const a = t.toString(), s = [], i = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let u = 0;
  const m = a.replace(I5, (y) => (nn.test(y) ? (i.color.push(u), o.push(yS), s.push(nn.parse(y))) : y.startsWith(B5) ? (i.var.push(u), o.push(U5), s.push(y)) : (i.number.push(u), o.push(vS), s.push(parseFloat(y))), ++u, hb)).split(hb);
  return { values: s, split: m, indexes: i, types: o };
}
function V5(t) {
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
function q5(t) {
  return bS(ti(t));
}
const H5 = (t) => typeof t == "number" ? 0 : nn.test(t) ? nn.getAnimatableNone(t) : t, F5 = (t, a) => typeof t == "number" ? a?.trim().endsWith("/") ? t : 0 : H5(t);
function P5(t) {
  const a = ti(t);
  return bS(a)(a.values.map((i, o) => F5(i, a.split[o])));
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
  return typeof t == "number" ? Q5 : typeof t == "string" ? im(t) ? Mc : nn.test(t) ? pb : W5 : Array.isArray(t) ? xS : typeof t == "object" ? nn.test(t) ? pb : Z5 : Mc;
}
function xS(t, a) {
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
    const u = a.types[o], f = t.indexes[u][i[u]], m = t.values[f] ?? 0;
    s[o] = m, i[u]++;
  }
  return s;
}
const W5 = (t, a) => {
  const s = da.createTransformer(a), i = ti(t), o = ti(a);
  return i.indexes.var.length === o.indexes.var.length && i.indexes.color.length === o.indexes.color.length && i.indexes.number.length >= o.indexes.number.length ? uh.has(t) && !o.values.length || uh.has(a) && !i.values.length ? X5(t, a) : Qc(xS(J5(i, o), o.values), s) : (_l(!0, `Complex values '${t}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Mc(t, a));
};
function SS(t, a, s) {
  return typeof t == "number" && typeof a == "number" && typeof s == "number" ? kl(t, a, s) : cm(t)(t, a);
}
const eD = (t) => {
  const a = ({ timestamp: s }) => t(s);
  return {
    start: (s = !0) => aa.update(a, s),
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
  _l(t <= /* @__PURE__ */ na(Vt.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
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
  const m = 5 / t, y = aD(o, u, m);
  if (t = /* @__PURE__ */ na(t), isNaN(y))
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
  const u = s.keyframes[0], f = s.keyframes[s.keyframes.length - 1], m = { done: !1, value: u }, { stiffness: y, damping: p, mass: b, duration: v, velocity: S, isResolvedFromDuration: w } = lD({
    ...s,
    velocity: -/* @__PURE__ */ ua(s.velocity || 0)
  }), j = S || 0, C = p / (2 * Math.sqrt(y * b)), _ = f - u, T = /* @__PURE__ */ ua(Math.sqrt(y / b)), O = Math.abs(_) < 5;
  i || (i = O ? Vt.restSpeed.granular : Vt.restSpeed.default), o || (o = O ? Vt.restDelta.granular : Vt.restDelta.default);
  let R, N, $, Y, ee, M;
  if (C < 1)
    $ = dh(T, C), Y = (j + C * T * _) / $, R = (z) => {
      const F = Math.exp(-C * T * z);
      return f - F * (Y * Math.sin($ * z) + _ * Math.cos($ * z));
    }, ee = C * T * Y + _ * $, M = C * T * _ - Y * $, N = (z) => Math.exp(-C * T * z) * (ee * Math.sin($ * z) + M * Math.cos($ * z));
  else if (C === 1) {
    R = (F) => f - Math.exp(-T * F) * (_ + (j + T * _) * F);
    const z = j + T * _;
    N = (F) => Math.exp(-T * F) * (T * z * F - j);
  } else {
    const z = T * Math.sqrt(C * C - 1);
    R = (Q) => {
      const ie = Math.exp(-C * T * Q), A = Math.min(z * Q, 300);
      return f - ie * ((j + C * T * _) * Math.sinh(A) + z * _ * Math.cosh(A)) / z;
    };
    const F = (j + C * T * _) / z, W = C * T * F - _ * z, G = C * T * _ - F * z;
    N = (Q) => {
      const ie = Math.exp(-C * T * Q), A = Math.min(z * Q, 300);
      return ie * (W * Math.sinh(A) + G * Math.cosh(A));
    };
  }
  const I = {
    calculatedDuration: w && v || null,
    velocity: (z) => /* @__PURE__ */ na(N(z)),
    next: (z) => {
      if (!w && C < 1) {
        const W = Math.exp(-C * T * z), G = Math.sin($ * z), Q = Math.cos($ * z), ie = f - W * (Y * G + _ * Q), A = /* @__PURE__ */ na(W * (ee * G + M * Q));
        return m.done = Math.abs(A) <= i && Math.abs(f - ie) <= o, m.value = m.done ? f : ie, m;
      }
      const F = R(z);
      if (w)
        m.done = z >= v;
      else {
        const W = /* @__PURE__ */ na(N(z));
        m.done = Math.abs(W) <= i && Math.abs(f - F) <= o;
      }
      return m.value = m.done ? f : F, m;
    },
    toString: () => {
      const z = Math.min(um(I), Ac), F = wS((W) => I.next(z * W).value, z, 30);
      return z + "ms " + F;
    },
    toTransition: () => {
    }
  };
  return I;
}
kc.applyToOptions = (t) => {
  const a = tD(t, 100, kc);
  return t.ease = a.ease, t.duration = /* @__PURE__ */ na(a.duration), t.type = "keyframes", t;
};
const oD = 5;
function jS(t, a, s) {
  const i = Math.max(a - oD, 0);
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
    const I = O(M), z = R(M);
    S.done = Math.abs(I) <= p, S.value = S.done ? T : z;
  };
  let $, Y;
  const ee = (M) => {
    w(S.value) && ($ = M, Y = kc({
      keyframes: [S.value, j(S.value)],
      velocity: jS(R, M, S.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: u,
      restDelta: p,
      restSpeed: b
    }));
  };
  return ee(0), {
    calculatedDuration: null,
    next: (M) => {
      let I = !1;
      return !Y && $ === void 0 && (I = !0, N(M), ee(M)), $ !== void 0 && M >= $ ? Y.next(M - $) : (!I && N(M), S);
    }
  };
}
function cD(t, a, s) {
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
function uD(t, a, { clamp: s = !0, ease: i, mixer: o } = {}) {
  const u = t.length;
  if (ei(u === a.length, "Both input and output ranges must be the same length", "range-length"), u === 1)
    return () => a[0];
  if (u === 2 && a[0] === a[1])
    return () => a[1];
  const f = t[0] === t[1];
  t[0] > t[u - 1] && (t = [...t].reverse(), a = [...a].reverse());
  const m = cD(a, i, o), y = m.length, p = (b) => {
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
function dD(t, a) {
  const s = t[t.length - 1];
  for (let i = 1; i <= a; i++) {
    const o = /* @__PURE__ */ tS(0, a, i);
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
  return t.map(() => a || dS).splice(0, t.length - 1);
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
  ), m = uD(f, a, {
    ease: Array.isArray(o) ? o : mD(a, o)
  });
  return {
    calculatedDuration: t,
    next: (y) => (u.value = m(y), u.done = y >= t, u)
  };
}
const pD = (t) => t !== null;
function Zc(t, { repeat: a, repeatType: s = "loop" }, i, o = 1) {
  const u = t.filter(pD), m = o < 0 || a && s !== "loop" && a % 2 === 1 ? 0 : u.length - 1;
  return !m || i === void 0 ? u[m] : i;
}
const gD = {
  decay: fh,
  inertia: fh,
  tween: pl,
  keyframes: pl,
  spring: kc
};
function ES(t) {
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
    ES(a);
    const { type: s = pl, repeat: i = 0, repeatDelay: o = 0, repeatType: u, velocity: f = 0 } = a;
    let { keyframes: m } = a;
    const y = s || pl;
    y !== pl && typeof m[0] != "number" && (this.mixKeyframes = Qc(vD, SS(m[0], m[1])), m = [0, 100]);
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
      let I = Math.floor(M), z = M % 1;
      !z && M >= 1 && (z = 1), z === 1 && I--, I = Math.min(I, v + 1), !!(I % 2) && (S === "reverse" ? (z = 1 - z, w && (z -= w / m)) : S === "mirror" && (N = f)), R = Nr(0, 1, z) * m;
    }
    let $;
    O ? (this.delayState.value = b[0], $ = this.delayState) : $ = N.next(R), u && !O && ($.value = u($.value));
    let { done: Y } = $;
    !O && y !== null && (Y = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const ee = this.holdTime === null && (this.state === "finished" || this.state === "running" && Y);
    return ee && j !== fh && ($.value = Zc(b, this.options, _, this.speed)), C && C($.value), ee && this.finish(), $;
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
    a = /* @__PURE__ */ na(a), this.currentTime = a, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = a : this.driver && (this.startTime = this.driver.now() - a / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = a, this.tick(a));
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
    const m = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = bD, o = m;
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
], li = new Set(ii), xb = (t) => t === si || t === ze, jD = /* @__PURE__ */ new Set(["x", "y", "z"]), ED = ii.filter((t) => !jD.has(t));
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
function NS() {
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
function CS() {
  Wr.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (yh = !0);
  });
}
function CD() {
  bh = !0, CS(), NS(), bh = !1;
}
class fm {
  constructor(a, s, i, o, u, f = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = s, this.name = i, this.motionValue = o, this.element = u, this.isAsync = f;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Wr.add(this), vh || (vh = !0, aa.read(CS), aa.resolveKeyframes(NS))) : (this.readKeyframes(), this.complete());
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
function TS(t, a, s) {
  TD(a) ? t.style.setProperty(a, s) : t.style[a] = s;
}
const RD = {};
function RS(t, a) {
  const s = /* @__PURE__ */ eS(t);
  return () => RD[a] ?? s();
}
const _D = /* @__PURE__ */ RS(() => window.ScrollTimeline !== void 0, "scrollTimeline"), _S = /* @__PURE__ */ RS(() => {
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
function MD(t, a, s, { delay: i = 0, duration: o = 300, repeat: u = 0, repeatType: f = "loop", ease: m = "easeOut", times: y } = {}, p = void 0) {
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
function AD({ type: t, ...a }) {
  return AS(t) && _S() ? t.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class kS extends dm {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: s, name: i, keyframes: o, pseudoElement: u, allowFlatten: f = !1, finalKeyframe: m, onComplete: y } = a;
    this.isPseudoElement = !!u, this.allowFlatten = f, this.options = a, ei(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const p = AD(a);
    this.animation = MD(s, i, o, p, u), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
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
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ na(a), s && this.animation.pause();
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
const DS = {
  anticipate: cS,
  backInOut: oS,
  circInOut: uS
};
function kD(t) {
  return t in DS;
}
function DD(t) {
  typeof t.ease == "string" && kD(t.ease) && (t.ease = DS[t.ease]);
}
const Vf = 10;
class zD extends kS {
  constructor(a) {
    DD(a), ES(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
  const u = t[t.length - 1], f = wb(o, a), m = wb(u, a);
  return _l(f === m, `You are trying to animate ${a} from "${o}" to "${u}". "${f ? u : o}" is not an animatable value.`, "value-not-animatable"), !f || !m ? !1 : OD(t) || (s === "spring" || AS(s)) && i;
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
]), ID = /* @__PURE__ */ eS(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function VD(t) {
  const { motionValue: a, name: s, repeatDelay: i, repeatType: o, damping: u, type: f, keyframes: m } = t;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: p, transformTemplate: b } = a.owner.getProps();
  return ID() && s && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (zS.has(s) || BD.has(s) && UD(m)) && (s !== "transform" || !b) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !p && !i && o !== "mirror" && u !== 0 && f !== "inertia";
}
const qD = 40;
class HD extends dm {
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
    LD(a, u, f, m) || (v = !1, (Cr.instantAnimations || !y) && b?.(Zc(a, i, s)), a[0] = a[a.length - 1], xh(i), i.repeat = 0);
    const w = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > qD ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: s,
      ...i,
      keyframes: a
    }, j = v && !p && VD(w), C = w.motionValue?.owner?.current;
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
function OS(t, a, s, i = 0, o = 1) {
  const u = Array.from(t).sort((p, b) => p.sortNodePosition(b)).indexOf(a), f = t.size, m = (f - 1) * i;
  return typeof s == "function" ? s(u, f) : o === 1 ? u * i : m - u * i;
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
function LS(t, a, s = 1) {
  ei(s <= GD, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [i, o] = PD(t);
  if (!i)
    return;
  const u = window.getComputedStyle(a).getPropertyValue(i);
  if (u) {
    const f = u.trim();
    return J1(f) ? parseFloat(f) : f;
  }
  return im(o) ? LS(o, a, s + 1) : o;
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
  const m = US(i, t) || {}, y = m.delay || i.delay || 0;
  let { elapsed: p = 0 } = i;
  p = p - /* @__PURE__ */ na(y);
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
  WD(m) || Object.assign(b, ZD(t, b)), b.duration && (b.duration = /* @__PURE__ */ na(b.duration)), b.repeatDelay && (b.repeatDelay = /* @__PURE__ */ na(b.repeatDelay)), b.from !== void 0 && (b.keyframes[0] = b.from);
  let v = !1;
  if ((b.type === !1 || b.duration === 0 && !b.repeatDelay) && (xh(b), b.delay === 0 && (v = !0)), (Cr.instantAnimations || Cr.skipAnimations || o?.shouldSkipAnimations) && (v = !0, xh(b), b.delay = 0), b.allowFlatten = !m.type && !m.ease, v && !u && a.get() !== void 0) {
    const S = Zc(b.keyframes, m);
    if (S !== void 0) {
      aa.update(() => {
        b.onUpdate(S), b.onComplete();
      });
      return;
    }
  }
  return m.isSync ? new Dc(b) : new HD(b);
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
    this.events[a] || (this.events[a] = new nS());
    const i = this.events[a].add(s);
    return a === "change" ? () => {
      i(), aa.read(() => {
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
    const m = rz(u[f]);
    az(t, f, m);
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
const oz = "framerAppearId", IS = "data-" + mm(oz);
function cz(t) {
  return t.props[IS];
}
function uz({ protectedKeys: t, needsAnimating: a }, s) {
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
    if (j === void 0 || v && uz(v, S))
      continue;
    const C = {
      delay: s,
      ...US(u || {}, S)
    }, _ = w.get();
    if (_ !== void 0 && !w.isAnimating() && !Array.isArray(j) && j === _ && !C.velocity) {
      aa.update(() => w.set(j));
      continue;
    }
    let T = !1;
    if (window.MotionHandoffAnimation) {
      const N = cz(t);
      if (N) {
        const $ = window.MotionHandoffAnimation(N, S, aa);
        $ !== null && (C.startTime = $, T = !0);
      }
    }
    lz(t, S);
    const O = p ?? t.shouldReduceMotion;
    w.start(ez(S, w, j, O && BS.has(S) ? { type: !1 } : C, t, T));
    const R = w.animation;
    R && b.push(R);
  }
  if (f) {
    const S = () => aa.update(() => {
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
  const u = i ? () => Promise.all(VS(t, i, s)) : () => Promise.resolve(), f = t.variantChildren && t.variantChildren.size ? (y = 0) => {
    const { delayChildren: p = 0, staggerChildren: b, staggerDirection: v } = o;
    return dz(t, a, y, p, b, v, s);
  } : () => Promise.resolve(), { when: m } = o;
  if (m) {
    const [y, p] = m === "beforeChildren" ? [u, f] : [f, u];
    return y().then(() => p());
  } else
    return Promise.all([u(), f(s.delay)]);
}
function dz(t, a, s = 0, i = 0, o = 0, u = 1, f) {
  const m = [];
  for (const y of t.variantChildren)
    y.notify("AnimationStart", a), m.push(wh(y, a, {
      ...f,
      delay: s + (typeof i == "function" ? 0 : i) + OS(t.variantChildren, y, i, o, u)
    }).then(() => y.notify("AnimationComplete", a)));
  return Promise.all(m);
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
    i = Promise.all(VS(t, o, s));
  }
  return i.then(() => {
    t.notify("AnimationComplete", a);
  });
}
const hz = {
  test: (t) => t === "auto",
  parse: (t) => t
}, qS = (t) => (a) => a.test(t), HS = [si, ze, Qs, yr, O5, z5, hz], Nb = (t) => HS.find(qS(t));
function mz(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || W1(t) : !0;
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
  distance: ze,
  translateX: ze,
  translateY: ze,
  translateZ: ze,
  x: ze,
  y: ze,
  z: ze,
  perspective: ze,
  transformPerspective: ze,
  opacity: wl,
  originX: fb,
  originY: fb,
  originZ: ze
}, pm = {
  // Border props
  borderWidth: ze,
  borderTopWidth: ze,
  borderRightWidth: ze,
  borderBottomWidth: ze,
  borderLeftWidth: ze,
  borderRadius: ze,
  borderTopLeftRadius: ze,
  borderTopRightRadius: ze,
  borderBottomRightRadius: ze,
  borderBottomLeftRadius: ze,
  // Positioning props
  width: ze,
  maxWidth: ze,
  height: ze,
  maxHeight: ze,
  top: ze,
  right: ze,
  bottom: ze,
  left: ze,
  inset: ze,
  insetBlock: ze,
  insetBlockStart: ze,
  insetBlockEnd: ze,
  insetInline: ze,
  insetInlineStart: ze,
  insetInlineEnd: ze,
  // Spacing props
  padding: ze,
  paddingTop: ze,
  paddingRight: ze,
  paddingBottom: ze,
  paddingLeft: ze,
  paddingBlock: ze,
  paddingBlockStart: ze,
  paddingBlockEnd: ze,
  paddingInline: ze,
  paddingInlineStart: ze,
  paddingInlineEnd: ze,
  margin: ze,
  marginTop: ze,
  marginRight: ze,
  marginBottom: ze,
  marginLeft: ze,
  marginBlock: ze,
  marginBlockStart: ze,
  marginBlockEnd: ze,
  marginInline: ze,
  marginInlineStart: ze,
  marginInlineEnd: ze,
  // Typography
  fontSize: ze,
  // Misc
  backgroundPositionX: ze,
  backgroundPositionY: ze,
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
}, FS = (t) => bz[t], xz = /* @__PURE__ */ new Set([jh, Eh]);
function PS(t, a) {
  let s = FS(t);
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
      t[u] = PS(s, o);
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
    i[u] = jr[s](a.measureViewportBox(), window.getComputedStyle(a.current)), f !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = f), this.removedTransforms?.length && this.removedTransforms.forEach(([m, y]) => {
      a.getValue(m).set(y);
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
const GS = (t, a) => a && typeof t == "number" ? a.transform(t) : t;
function wc(t) {
  return p5(t) && "offsetHeight" in t && !("ownerSVGElement" in t);
}
const { schedule: Nz } = /* @__PURE__ */ hS(queueMicrotask, !1), Cz = {
  y: !1
};
function Tz() {
  return Cz.y;
}
function YS(t, a) {
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
      if (!Rz(_))
        return;
      y = !1;
      const T = a(f, _);
      typeof T == "function" && (p = T, f.addEventListener("pointerleave", j, o));
    };
    f.addEventListener("pointerenter", C, o), f.addEventListener("pointerdown", w, o);
  }), u;
}
const KS = (t, a) => a ? t === a ? !0 : KS(t, a.parentElement) : !1, Mz = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, Az = /* @__PURE__ */ new Set([
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
    (s.useGlobalTarget ? window : m).addEventListener("pointerdown", f, o), wc(m) && (m.addEventListener("focus", (p) => Dz(p, o)), !kz(m) && !m.hasAttribute("tabindex") && (m.tabIndex = 0));
  }), u;
}
const Oz = [...HS, nn, da], Lz = (t) => Oz.find(qS(t)), Mb = () => ({ min: 0, max: 0 }), XS = () => ({
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
function QS(t) {
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
function ZS() {
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
function JS(t) {
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
  constructor({ parent: a, props: s, presenceContext: i, reducedMotionConfig: o, skipAnimations: u, blockInitialAnimation: f, visualState: m }, y = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = fm, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const w = Hn.now();
      this.renderScheduledAt < w && (this.renderScheduledAt = w, aa.render(this.render, !1, !0));
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
    this.current = a, $z.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((s, i) => this.bindToMotionValue(i, s)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (ym.current || ZS(), this.shouldReduceMotion = Oc.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
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
        duration: /* @__PURE__ */ na(b)
      }), S = f(v);
      this.valueSubscriptions.set(a, () => {
        S(), v.cancel();
      });
      return;
    }
    const i = li.has(a);
    i && this.onBindTransform && this.onBindTransform();
    const o = s.on("change", (f) => {
      this.latestValues[a] = f, this.props.onUpdate && aa.preRender(this.notifyUpdate), i && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
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
    return i != null && (typeof i == "string" && (J1(i) || W1(i)) ? i = parseFloat(i) : !Lz(i) && da.test(s) && (i = PS(a, s)), this.setBaseTarget(a, xn(i) ? i.get() : i)), xn(i) ? i.get() : i;
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
    Nz.render(this.render);
  }
}
class WS extends Vz {
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
        const b = Pz[f] || f;
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
  if (a.transform || (f || s ? i.transform = Yz(a, t.transform, s) : i.transform && (i.transform = "none")), m) {
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
      if (ze.test(t))
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
    const u = da.createTransformer(t), f = typeof o[0] != "number" ? 1 : 0, m = s.x.scale * a.x, y = s.y.scale * a.y;
    o[0 + f] /= m, o[1 + f] /= y;
    const p = kl(m, y, 0.5);
    return typeof o[2 + f] == "number" && (o[2 + f] /= p), typeof o[3 + f] == "number" && (o[3 + f] /= p), u(o);
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
function tw(t, { layout: a, layoutId: s }) {
  return li.has(t) || t.startsWith("origin") || (a || s !== void 0) && (!!Xz[t] || t === "opacity");
}
function xm(t, a, s) {
  const i = t.style, o = a?.style, u = {};
  if (!i)
    return u;
  for (const f in i)
    (xn(i[f]) || o && xn(o[f]) || tw(f, t) || s?.getValue(f)?.liveStyle !== void 0) && (u[f] = i[f]);
  return u;
}
function Qz(t) {
  return window.getComputedStyle(t);
}
class Zz extends WS {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = ew;
  }
  readValueFromInstance(a, s) {
    if (li.has(s))
      return this.projection?.isProjecting ? ph(s) : SD(a, s);
    {
      const i = Qz(a), o = (pS(s) ? i.getPropertyValue(s) : i[s]) || 0;
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
  for (const w of t4)
    v[w] !== void 0 && (S[w] = v[w], delete v[w]);
  a !== void 0 && (v.x = a), s !== void 0 && (v.y = s), i !== void 0 && (v.scale = i), o !== void 0 && e4(v, o, u, f, !1);
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
function n4(t, a, s, i) {
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
class a4 extends WS {
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
    n4(a, s, i, o);
  }
  mount(a) {
    this.isSVGTag = rw(a.tagName), super.mount(a);
  }
}
const r4 = vm.length;
function iw(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const s = t.parent ? iw(t.parent) || {} : {};
    return t.props.initial !== void 0 && (s.initial = t.props.initial), s;
  }
  const a = {};
  for (let s = 0; s < r4; s++) {
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
const s4 = [...gm].reverse(), i4 = gm.length;
function l4(t) {
  return (a) => Promise.all(a.map(({ animation: s, options: i }) => fz(t, s, i)));
}
function o4(t) {
  let a = l4(t), s = Db(), i = !0, o = !1;
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
    for (let T = 0; T < i4; T++) {
      const O = s4[T], R = s[O], N = b[O] !== void 0 ? b[O] : v[O], $ = jl(N), Y = O === p ? R.isActive : null;
      Y === !1 && (C = T);
      let ee = N === v[O] && N !== b[O] && $;
      if (ee && (i || o) && t.manuallyAnimateOnMount && (ee = !1), R.protectedKeys = { ...j }, // If it isn't active and hasn't *just* been set as inactive
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
      let I = M || // If we're making this variant active, we want to always make it active
      O === p && R.isActive && !ee && $ || // If we removed a higher-priority variant (i is in reverse order)
      T > C && $, z = !1;
      const F = Array.isArray(N) ? N : [N];
      let W = F.reduce(u(O), {});
      Y === !1 && (W = {});
      const { prevResolvedValues: G = {} } = R, Q = {
        ...G,
        ...W
      }, ie = (U) => {
        I = !0, w.has(U) && (z = !0, w.delete(U)), R.needsAnimating[U] = !0;
        const J = t.getValue(U);
        J && (J.liveStyle = !1);
      };
      for (const U in Q) {
        const J = W[U], pe = G[U];
        if (j.hasOwnProperty(U))
          continue;
        let k = !1;
        Sh(J) && Sh(pe) ? k = !lw(J, pe) : k = J !== pe, k ? J != null ? ie(U) : w.add(U) : J !== void 0 && w.has(U) ? ie(U) : R.protectedKeys[U] = !0;
      }
      R.prevProp = N, R.prevResolvedValues = W, R.isActive && (j = { ...j, ...W }), (i || o) && t.blockInitialAnimation && (I = !1);
      const A = ee && M;
      I && (!A || z) && S.push(...F.map((U) => {
        const J = { type: O };
        if (typeof U == "string" && (i || o) && !A && t.manuallyAnimateOnMount && t.parent) {
          const { parent: pe } = t, k = es(pe, U);
          if (pe.enteringChildren && k) {
            const { delayChildren: te } = k.transition || {};
            J.delay = OS(pe.enteringChildren, t, te);
          }
        }
        return {
          animation: U,
          options: J
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
function c4(t, a) {
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
function m4({ children: t, isPresent: a, anchorX: s, anchorY: i, root: o, pop: u }) {
  const f = g.useId(), m = g.useRef(null), y = g.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: p } = g.useContext(Sm), b = t.props?.ref ?? t?.ref, v = f4(m, b);
  return g.useInsertionEffect(() => {
    const { width: S, height: w, top: j, left: C, right: _, bottom: T } = y.current;
    if (a || u === !1 || !m.current || !S || !w)
      return;
    const O = s === "left" ? `left: ${C}` : `right: ${_}`, R = i === "bottom" ? `bottom: ${T}` : `top: ${j}`;
    m.current.dataset.motionPopId = f;
    const N = document.createElement("style");
    p && (N.nonce = p);
    const $ = o ?? document.head;
    return $.appendChild(N), N.sheet && N.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${S}px !important;
            height: ${w}px !important;
            ${O}px !important;
            ${R}px !important;
          }
        `), () => {
      m.current?.removeAttribute("data-motion-pop-id"), $.contains(N) && $.removeChild(N);
    };
  }, [a]), c.jsx(h4, { isPresent: a, childRef: m, sizeRef: y, pop: u, children: u === !1 ? t : g.cloneElement(t, { ref: v }) });
}
const p4 = ({ children: t, initial: a, isPresent: s, onExitComplete: i, custom: o, presenceAffectsLayout: u, mode: f, anchorX: m, anchorY: y, root: p }) => {
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
  }, [s]), t = c.jsx(m4, { pop: f === "popLayout", isPresent: s, anchorX: m, anchorY: y, root: p, children: t }), c.jsx(Xc.Provider, { value: w, children: t });
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
const ow = ({ children: t, custom: a, initial: s = !0, onExitComplete: i, presenceAffectsLayout: o = !0, mode: u = "sync", propagate: f = !1, anchorX: m = "left", anchorY: y = "top", root: p }) => {
  const [b, v] = v4(f), S = g.useMemo(() => Lb(t), [t]), w = f && !b ? [] : S.map(sc), j = g.useRef(!0), C = g.useRef(S), _ = am(() => /* @__PURE__ */ new Map()), T = g.useRef(/* @__PURE__ */ new Set()), [O, R] = g.useState(S), [N, $] = g.useState(S);
  Z1(() => {
    j.current = !1, C.current = S;
    for (let M = 0; M < N.length; M++) {
      const I = sc(N[M]);
      w.includes(I) ? (_.delete(I), T.current.delete(I)) : _.get(I) !== !0 && _.set(I, !1);
    }
  }, [N, w.length, w.join("-")]);
  const Y = [];
  if (S !== O) {
    let M = [...S];
    for (let I = 0; I < N.length; I++) {
      const z = N[I], F = sc(z);
      w.includes(F) || (M.splice(I, 0, z), Y.push(z));
    }
    return u === "wait" && Y.length && (M = Y), $(Lb(M)), R(S), null;
  }
  const { forceRender: ee } = g.useContext(Q1);
  return c.jsx(c.Fragment, { children: N.map((M) => {
    const I = sc(M), z = f && !b ? !1 : S === N || w.includes(I), F = () => {
      if (T.current.has(I))
        return;
      if (_.has(I))
        T.current.add(I), _.set(I, !0);
      else
        return;
      let W = !0;
      _.forEach((G) => {
        G || (W = !1);
      }), W && (ee?.(), $(C.current), f && v?.(), i && i());
    };
    return c.jsx(p4, { isPresent: z, initial: !j.current || s ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: u, root: p, onExitComplete: z ? void 0 : F, anchorX: m, anchorY: y, children: M }, I);
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
  JS(t), Ub = !0;
}
function cw() {
  return y4(), Iz();
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
let uw = (t) => !$c(t);
function x4(t) {
  typeof t == "function" && (uw = (a) => a.startsWith("on") ? !$c(a) : t(a));
}
try {
  x4(require("@emotion/is-prop-valid").default);
} catch {
}
function S4(t, a, s) {
  const i = {};
  for (const o in t)
    o === "values" && typeof t.values == "object" || xn(t[o]) || (uw(o) || s === !0 && $c(o) || !a && !$c(o) || // If trying to use native HTML drag events, forward drag listeners
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
function dw(t, a, s) {
  for (const i in a)
    !xn(a[i]) && !tw(i, s) && (t[i] = a[i]);
}
function E4({ transformTemplate: t }, a) {
  return g.useMemo(() => {
    const s = Em();
    return bm(s, a, t), Object.assign({}, s.vars, s.style);
  }, [a]);
}
function N4(t, a) {
  const s = t.style || {}, i = {};
  return dw(i, s, t), Object.assign(i, E4(t, a)), i;
}
function C4(t, a) {
  const s = {}, i = N4(t, a);
  return t.drag && t.dragListener !== !1 && (s.draggable = !1, i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none", i.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (s.tabIndex = 0), s.style = i, s;
}
const fw = () => ({
  ...Em(),
  attrs: {}
});
function T4(t, a, s, i) {
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
  const y = (f ?? Nm(t) ? T4 : C4)(a, i, o, t), p = S4(a, typeof t == "string", u), b = t !== g.Fragment ? { ...p, ...y, ref: s } : {}, { children: v } = a, S = g.useMemo(() => xn(v) ? v.get() : v, [v]);
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
  const i = g.useContext(eu), o = g.useContext(Xc), u = () => M4(t, a, i, o);
  return s ? u() : am(u);
}, k4 = /* @__PURE__ */ hw({
  scrapeMotionValuesFromProps: xm,
  createRenderState: Em
}), D4 = /* @__PURE__ */ hw({
  scrapeMotionValuesFromProps: sw,
  createRenderState: fw
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
        const m = f(u);
        typeof m == "function" && (o.current = m);
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
  const j = S.current, C = g.useContext(L4);
  j && !j.projection && o && (j.type === "html" || j.type === "svg") && B4(S.current, s, o, C);
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
function B4(t, a, s, i) {
  const { layoutId: o, layout: u, drag: f, dragConstraints: m, layoutScroll: y, layoutRoot: p, layoutAnchor: b, layoutCrossfade: v } = a;
  t.projection = new s(t.latestValues, a["data-framer-portal-id"] ? void 0 : mw(t.parent)), t.projection.setOptions({
    layoutId: o,
    layout: u,
    alwaysMeasureLayout: !!f || m && $4(m),
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
  const u = s ? s === "svg" : Nm(t), f = u ? D4 : k4;
  function m(p, b) {
    let v;
    const S = {
      ...g.useContext(Sm),
      ...p,
      layoutId: I4(p)
    }, { isStatic: w } = S, j = j4(p), C = f(p, w);
    if (!w && typeof window < "u") {
      V4();
      const _ = q4(S);
      v = _.MeasureLayout, j.visualElement = U4(t, C, S, o, _.ProjectionNode, u);
    }
    return c.jsxs(eu.Provider, { value: j, children: [v && j.visualElement ? c.jsx(v, { visualElement: j.visualElement, ...S }) : null, _4(t, p, O4(C, j.visualElement, b), C, w, a, u)] });
  }
  m.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const y = g.forwardRef(m);
  return y[z4] = t, y;
}
function I4({ layoutId: t }) {
  const a = g.useContext(Q1).id;
  return a && t !== void 0 ? a + "-" + t : t;
}
function V4(t, a) {
  g.useContext(wm).strict;
}
function q4(t) {
  const a = cw(), { drag: s, layout: i } = a;
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
const K4 = {
  animation: {
    Feature: P4
  },
  exit: {
    Feature: Y4
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
  u && aa.postRender(() => u(a, pw(a)));
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
  u && aa.postRender(() => u(a, pw(a)));
}
class Z4 extends oi {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: s, propagate: i } = this.node.props;
    this.unmount = zz(a, (o, u) => (Vb(this.node, u, "Start"), (f, { success: m }) => Vb(this.node, f, m ? "End" : "Cancel")), {
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
    }, m = (y) => {
      const { isIntersecting: p } = y;
      if (this.isInView === p || (this.isInView = p, u && !p && this.hasEnteredView))
        return;
      p && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", p);
      const { onViewportEnter: b, onViewportLeave: v } = this.node.getProps(), S = p ? b : v;
      S && S(y);
    };
    this.stopObserver = tO(this.node.current, f, m);
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
  !ym.current && ZS();
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
function $O(t, a) {
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
function UO({
  deploymentId: t,
  speedFactor: a
}) {
  const { rows: s, loading: i, error: o, refetch: u, tick: f } = LO(t), m = $O(t, f), [y, p] = g.useState(null), [b, v] = g.useState(null), [S, w] = g.useState(!1), j = iO(), C = g.useCallback(() => {
    p(null), v(null), u();
  }, [u]), _ = g.useCallback(
    async (R, N) => {
      v(null);
      try {
        await zO(t, R, N);
      } catch ($) {
        v($ instanceof Error ? $.message : "download failed");
      }
    },
    [t]
  ), T = s, O = g.useCallback(async () => {
    const R = T.map((N) => N.utteranceId);
    if (R.length !== 0 && window.confirm(`Remove the ${R.length} shown generation${R.length === 1 ? "" : "s"} from this list?`)) {
      w(!0), v(null), p(null);
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
    /* @__PURE__ */ c.jsx(jm, { features: Tm, strict: !0, children: /* @__PURE__ */ c.jsx("ul", { className: vO, children: /* @__PURE__ */ c.jsx(ow, { initial: !1, children: T.map((R) => {
      const N = y === R.utteranceId, $ = tu(
        t,
        `/${R.utteranceId}/download`
      ), Y = R.voiceAssetId ? m.get(R.voiceAssetId) ?? null : null;
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
                  onClick: () => p(
                    (ee) => ee === R.utteranceId ? null : R.utteranceId
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
                src: $,
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
function ZO() {
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
        const p = QO(y);
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
var JO = "_1s59p180", WO = "_1s59p181", eL = "_1s59p182", tL = "_1s59p183", nL = "_1s59p184", aL = "_1s59p185", rL = "_1s59p186", sL = "_1s59p188", iL = "_1s59p189", Pb = "_1s59p18a", lL = "_1s59p18c", oL = "_1s59p18d", cL = "_1s59p18e", uL = "_1s59p18f", dL = "_1s59p18g", fL = "_1s59p18i", hL = "_1s59p18j", mL = "_1s59p18k", pL = "_1s59p18l", gL = "_1s59p18n", vL = "_1s59p18o", yL = "_1s59p18p", bL = "_1s59p18q", xL = "_1s59p18r", SL = "_1s59p18s", wL = "_1s59p18t", Gb = "_1s59p18u", jL = "_1s59p18v", EL = "_1s59p18x";
const NL = 4e3;
function CL(t) {
  const a = ni(), s = t.storyboardJobs, i = (s?.length ?? 0) > 0, [o, u] = g.useState("idle"), [f, m] = g.useState(null), [y, p] = g.useState(/* @__PURE__ */ new Map()), [b, v] = g.useState(/* @__PURE__ */ new Map()), [S, w] = g.useState([]), [j, C] = g.useState(null), [_, T] = g.useState(null), [O, R] = g.useState(null), N = g.useRef(null), $ = g.useRef([]), Y = g.useRef([]), ee = g.useRef(!1);
  g.useEffect(() => {
    Y.current = S;
  }, [S]);
  const M = g.useCallback(() => {
    N.current?.(), N.current = null;
    for (const Ce of $.current) Ce();
    $.current = [];
  }, []);
  g.useEffect(() => () => {
    M();
  }, [M]), g.useEffect(() => {
    let Ce = !1;
    const Ve = async () => {
      try {
        const At = await yl();
        Ce || R(At);
      } catch {
      }
    };
    Ve();
    const dt = window.setInterval(Ve, NL);
    return () => {
      Ce = !0, window.clearInterval(dt);
    };
  }, []), g.useEffect(() => {
    oO({ busy: o === "starting" || o === "running" });
  }, [o]), g.useEffect(() => {
    t.onJobProgressChange && t.onJobProgressChange(KO(b));
  }, [b, t.onJobProgressChange]);
  const I = g.useCallback(
    (Ce) => {
      const Ve = Ce.status;
      (Ve === "completed" || Ve === "partial") && (qb(), mn.success(
        Ve === "completed" ? "Run complete — open the Artifacts tab to download" : "Partial run — open the Artifacts tab for what was produced",
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
  ), z = g.useCallback(async () => {
    const Ce = s ?? [];
    u("starting"), C(null), p(/* @__PURE__ */ new Map()), T(null), m(null), ee.current = !1, M();
    const Ve = Math.max(1, O?.workersActive ?? 1), dt = AT([...Ce], Ve), At = dt.map((Xe) => ({
      ...t.createPayload,
      prebuiltSegments: Xe.map((at) => at.segment)
    }));
    try {
      const at = (await MT(t.deploymentId, At)).map((Se, $e) => ({
        runId: Se.runId,
        jobs: dt[$e] ?? []
      }));
      Y.current = at, w(at), v(Fb(qO(Ce), at)), u("running");
      const bt = at.map(
        (Se) => Sf(
          t.deploymentId,
          Se.runId,
          ($e) => {
            v((Fe) => {
              const rt = FO(Fe, Y.current, $e), yt = Fb(rt, Y.current);
              return GO(yt) && !ee.current && (ee.current = !0, M(), u("terminal"), qb()), yt;
            });
          },
          () => u("error")
        )
      );
      $.current = bt;
    } catch (Xe) {
      u("error"), C(ic(Xe));
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
      const Ce = await R1(t.deploymentId, t.createPayload);
      m(Ce.runId), u("running"), M(), N.current = Sf(
        t.deploymentId,
        Ce.runId,
        (Ve) => Kb(
          Ve,
          p,
          u,
          (dt) => {
            T(dt), I(dt);
          },
          t.deploymentId,
          Ce.runId
        ),
        () => u("error")
      );
    } catch (Ce) {
      u("error"), C(ic(Ce));
    }
  }, [t.deploymentId, t.createPayload, I, M]), W = g.useCallback(async () => {
    i ? await z() : await F();
  }, [i, z, F]);
  g.useEffect(() => cO(() => {
    (o === "idle" || o === "terminal" || o === "error") && W();
  }), [o, W]);
  const G = g.useCallback(async () => {
    if (i) {
      const Ce = Y.current.map((Ve) => Ve.runId);
      await Promise.all(
        Ce.map(
          (Ve) => Jy(t.deploymentId, Ve).catch(() => {
          })
        )
      ), ee.current = !0, M(), v((Ve) => {
        const dt = new Map(Ve);
        for (const [At, Xe] of Ve)
          (Xe.status === "queued" || Xe.status === "generating") && dt.set(At, {
            ...Xe,
            status: "cancelled",
            queuePosition: void 0,
            etaMs: void 0
          });
        return dt;
      }), u("terminal");
      return;
    }
    if (f)
      try {
        await Jy(t.deploymentId, f);
      } catch (Ce) {
        C(ic(Ce));
      }
  }, [i, t.deploymentId, f, M]), Q = Array.from(y.values()).sort((Ce, Ve) => Ce.globalIndex - Ve.globalIndex), ie = g.useMemo(
    () => (s ?? []).map((Ce) => b.get(Ce.jobId)).filter((Ce) => Ce != null),
    [s, b]
  ), A = g.useMemo(() => XO(b), [b]), H = o === "starting" || o === "running", U = _?.status === "partial", J = i ? A.generating : Q.filter((Ce) => Ce.status === "running").length, pe = i ? A.done : Q.filter((Ce) => Ce.status === "completed").length, k = i ? o === "starting" || o === "running" || ie.length > 0 : o === "starting" || o === "running" || Q.length > 0, te = Q.filter((Ce) => Ce.status === "failed"), ne = g.useMemo(() => {
    if (o !== "terminal") return null;
    const Ce = i ? ie.filter((at) => at.status === "failed").map((at) => at.failureCategory ?? "unknown") : te.map((at) => at.failureCategory ?? "unknown");
    if (Ce.length === 0) return null;
    const Ve = /* @__PURE__ */ new Map();
    for (const at of Ce) Ve.set(at, (Ve.get(at) ?? 0) + 1);
    let dt = "unknown", At = 0;
    for (const [at, bt] of Ve)
      bt > At && (dt = at, At = bt);
    const Xe = i ? ie.length : Q.length;
    return { category: dt, count: At, total: Xe };
  }, [o, i, ie, te, Q]), K = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, B = "Check the run detail page for the per-segment error log.", ae = j?.toLowerCase().includes("unmapped") ?? !1, ce = t.diagnostics ?? [], be = O?.badge ?? "not_installed", Re = be === "ready" || be === "running", ot = s?.length ?? 0, Ne = Re ? t.canGenerate ? null : "Nothing to generate yet" : "Start runtime to generate", We = o === "starting" ? "Starting…" : o === "running" ? i ? `Generating ${ot} segment${ot === 1 ? "" : "s"}…` : "Generating…" : Ne ?? "Generate", Be = !t.canGenerate || H || !Re, Pe = o === "starting" || o === "running", sn = Pe ? "running" : Be ? "blocked" : "idle", Mt = !yw(bw) || Pe;
  return /* @__PURE__ */ c.jsxs("div", { className: JO, children: [
    /* @__PURE__ */ c.jsxs("div", { className: WO, children: [
      /* @__PURE__ */ c.jsxs("div", { className: tL, children: [
        /* @__PURE__ */ c.jsxs("span", { className: nL, children: [
          /* @__PURE__ */ c.jsx("span", { className: eL, "aria-hidden": "true", children: "01" }),
          "Pre-flight",
          k && /* @__PURE__ */ c.jsxs("span", { className: dL, children: [
            /* @__PURE__ */ c.jsx("span", { className: fL, "aria-hidden": "true" }),
            J > 0 ? `${J} generating` : `${pe} done`
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
      /* @__PURE__ */ c.jsxs("div", { className: lL, "data-state": sn, children: [
        Mt ? /* @__PURE__ */ c.jsxs(
          Ze,
          {
            variant: "primary",
            size: "sm",
            onClick: W,
            disabled: Be,
            loading: Pe,
            title: Ne ?? void 0,
            children: [
              !Pe && /* @__PURE__ */ c.jsx("span", { className: oL, "aria-hidden": "true", children: "▶" }),
              We
            ]
          }
        ) : /* @__PURE__ */ c.jsxs("span", { className: cL, "aria-hidden": "true", children: [
          "Generate available in toolbar",
          /* @__PURE__ */ c.jsx("span", { className: uL, children: "↑" })
        ] }),
        H && /* @__PURE__ */ c.jsx(
          Ze,
          {
            variant: "ghost",
            size: "xs",
            onClick: G,
            "aria-label": i ? "Cancel all running segments" : "Cancel current run",
            children: "Cancel"
          }
        )
      ] })
    ] }),
    j && /* @__PURE__ */ c.jsxs(
      Fn,
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
          ae && /* @__PURE__ */ c.jsx(
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
    ne && /* @__PURE__ */ c.jsxs(Fn, { severity: "error", style: { flexDirection: "column", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ c.jsxs("strong", { children: [
        "Run failed — ",
        ne.count,
        " of ",
        ne.total,
        " segments failed with ",
        /* @__PURE__ */ c.jsx("code", { children: ne.category })
      ] }),
      /* @__PURE__ */ c.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: K[ne.category] ?? B })
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
    U && _ && /* @__PURE__ */ c.jsxs(Fn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ c.jsx(
        Ze,
        {
          variant: "secondary",
          disabled: !1,
          onClick: async () => {
            try {
              const Ce = await _1(t.deploymentId, _.runId);
              m(Ce.runId), p(/* @__PURE__ */ new Map()), T(null), u("running"), M(), N.current = Sf(
                t.deploymentId,
                Ce.runId,
                (Ve) => Kb(Ve, p, u, T, t.deploymentId, Ce.runId),
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
    !i && Q.length > 0 && /* @__PURE__ */ c.jsxs("table", { className: v_, children: [
      /* @__PURE__ */ c.jsx("thead", { children: /* @__PURE__ */ c.jsxs("tr", { children: [
        /* @__PURE__ */ c.jsx("th", { className: pr, children: "#" }),
        /* @__PURE__ */ c.jsx("th", { className: pr, children: "Status" }),
        /* @__PURE__ */ c.jsx("th", { className: pr, children: "Duration" }),
        /* @__PURE__ */ c.jsx("th", { className: pr, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ c.jsx("tbody", { children: Q.map((Ce) => /* @__PURE__ */ c.jsxs("tr", { className: y_, children: [
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
function xw(t) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
function $L(t) {
  const a = /* @__PURE__ */ new Set(), s = [];
  for (const i of t) {
    const o = xw(i.presetName);
    a.has(o) || (a.add(o), s.push({ id: o, label: i.presetName }));
  }
  return s;
}
function UL(t, a) {
  const s = t.find((o) => xw(o.presetName) === a);
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
function Sw(t, a) {
  return t.find((s) => s.segIds.includes(a));
}
function Jb(t, a) {
  return a.every((s) => !Sw(t, s));
}
function ww(t, a) {
  return [...a].sort((s, i) => Zb(t, s) - Zb(t, i));
}
function qL(t, a) {
  const s = {};
  return ww(t, a).forEach((i, o) => {
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
function Wb(t, a) {
  return t.find((s) => s.id === a)?.label ?? a;
}
var PL = "_171z55w1", GL = "_171z55w2", YL = "_171z55w3", ex = "_171z55w4", KL = "_171z55w5", XL = "_171z55w6", QL = "_171z55w7", ZL = "_171z55w8", JL = "_171z55w9", WL = "_171z55wa", e6 = "_171z55wb", t6 = "_171z55wc", n6 = "_171z55wd", a6 = "_171z55we", r6 = "_171z55wh", s6 = "_171z55wi", tx = "_171z55wj", nx = "_171z55wk _171z55wj", i6 = "_171z55wl", l6 = "_171z55wm", o6 = "_171z55wn", c6 = "_171z55wo", ax = "_171z55wp", rx = "_171z55wq", u6 = "_171z55wr", d6 = "_171z55ws", f6 = "_171z55wt", h6 = "_171z55wu", m6 = "_171z55wv", p6 = "_171z55ww", g6 = "_171z55wx", v6 = "_171z55wy", y6 = "_171z55wz", b6 = "_171z55w10", x6 = "_171z55w11", S6 = "_171z55w12", w6 = "_171z55w13", j6 = "_171z55w14", sx = "_171z55w15", E6 = "_171z55w16", N6 = "_171z55w17", C6 = "_171z55w18", T6 = "_171z55w19", R6 = "_171z55w1a", _6 = "_171z55w1b", M6 = "_171z55w1c", A6 = "_171z55w1d", k6 = "_171z55w1e", D6 = "_171z55w1f", z6 = "_171z55w1g", O6 = "_171z55w1h", L6 = "_171z55w1i", $6 = "_171z55w1j", U6 = "_171z55w1k", B6 = "_171z55w1l";
function I6(t, a) {
  return !t || !a ? null : `${ha}/deployments/${t}/artifacts/${a}/download`;
}
function V6({
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
  const p = g.useMemo(() => LL(t), [t]), b = g.useMemo(() => $L(a), [a]), v = s, S = g.useMemo(() => BL(v), [v]), w = p[0]?.id ?? "", j = b[0]?.id ?? "", [C, _] = g.useState("voice"), [T, O] = g.useState(""), R = g.useMemo(
    () => Y6(o, p),
    [o, p]
  ), [N, $] = g.useState([]), [Y, ee] = g.useState([]), [M, I] = g.useState(null), [z, F] = g.useState(null), [W, G] = g.useState(w), [Q, ie] = g.useState(j), [A, H] = g.useState(null), [U, J] = g.useState(null), [pe, k] = g.useState(null), [te, ne] = g.useState(null), [K, B] = g.useState(!1), ae = g.useRef(null), ce = g.useRef(null), be = g.useRef(/* @__PURE__ */ new Map()), Re = g.useRef(null), ot = g.useRef(1e3), Ne = g.useCallback(() => (ot.current += 1, `job-${ot.current}`), []), We = g.useMemo(() => {
    const q = /* @__PURE__ */ new Map();
    return Ah(S).forEach((fe, De) => q.set(fe.id, De)), q;
  }, [S]), Be = g.useCallback((q) => We.get(q) ?? Number.MAX_SAFE_INTEGER, [We]);
  g.useEffect(() => {
    const q = new Set(Ah(S).map((fe) => fe.id));
    $((fe) => {
      const De = fe.filter((_e) => _e.segIds.every((Ye) => q.has(Ye)));
      return De.length === fe.length ? fe : De;
    });
  }, [S]), g.useEffect(() => uO(() => $([])), []), g.useEffect(() => {
    if (p.length !== 0 && (G((q) => p.some((fe) => fe.id === q) ? q : p[0].id), p.length === 1)) {
      const q = p[0].id;
      $((fe) => {
        let De = !1;
        const _e = fe.map((Ye) => p.some((gt) => gt.id === Ye.voiceId) ? Ye : (De = !0, { ...Ye, voiceId: q }));
        return De ? _e : fe;
      });
    }
  }, [p]);
  const Pe = g.useMemo(() => new Set(p.map((q) => q.id)), [p]), sn = g.useCallback(
    (q) => !Pe.has(q.voiceId),
    [Pe]
  ), qt = g.useCallback((q) => {
    const fe = ae.current;
    if (!fe || !q) return { top: 60, left: 0 };
    const De = q.getBoundingClientRect(), _e = fe.getBoundingClientRect();
    let Ye = De.left - _e.left + fe.scrollLeft;
    const gt = De.bottom - _e.top + fe.scrollTop + 10, xt = Math.max(0, fe.clientWidth - 318);
    return Ye = Math.max(0, Math.min(Ye, xt)), { top: gt, left: Ye };
  }, []), Mt = g.useCallback(() => {
    ee([]), I(null), F(null), H(null);
  }, []), Ce = g.useCallback(
    (q, fe) => {
      const De = [...q.segIds].sort((Ye, gt) => Be(Ye) - Be(gt))[0];
      if (!De) return;
      const _e = fe ?? be.current.get(De) ?? null;
      F(q.id), ee([...q.segIds]), I(De), G(q.voiceId), ie(q.emotion), H(qt(_e)), k(q.id);
    },
    [Be, qt]
  ), Ve = g.useCallback(
    (q, fe, De) => {
      const _e = Sw(N, q);
      if (_e) {
        Ce(_e, fe);
        return;
      }
      const Ye = qt(fe);
      if (De && M != null && z == null) {
        const gt = Be(M), xt = Be(q), D = IL(S, Math.min(gt, xt), Math.max(gt, xt));
        if (Jb(N, D)) {
          ee(D), F(null), H(Ye);
          return;
        }
      }
      ee([q]), I(q), F(null), H(Ye);
    },
    [N, S, M, z, qt, Ce, Be]
  ), dt = g.useCallback(() => {
    if (z) {
      $(
        (De) => De.map(
          (_e) => _e.id === z ? { ..._e, voiceId: W, emotion: Q, status: "queued" } : _e
        )
      ), k(z), ee([]), I(null), F(null), H(null);
      return;
    }
    if (Y.length === 0 || sl(S, Y).trim() === "" || !Jb(N, Y)) return;
    const q = Ne(), fe = { id: q, segIds: [...Y], voiceId: W, emotion: Q, status: "queued" };
    $((De) => [...De, fe]), k(q), ee([]), I(null), H(null);
  }, [z, Y, N, S, W, Q, Ne]), At = g.useCallback((q) => {
    $((fe) => fe.filter((De) => De.id !== q)), k((fe) => fe === q ? null : fe), ne((fe) => fe === q ? null : fe), ee([]), I(null), F(null), H(null);
  }, []), Xe = g.useCallback((q) => {
    ne((fe) => fe === q ? null : q);
  }, []), at = g.useCallback((q) => {
    ce.current?.scrollBy({ left: q * 280, behavior: "smooth" });
  }, []), bt = g.useCallback(
    (q) => {
      if (b.length === 0) return;
      const fe = b.findIndex((_e) => _e.id === Q), De = b[(fe + q + b.length) % b.length];
      ie(De.id), Re.current?.querySelector(`[data-emotion="${De.id}"]`)?.focus();
    },
    [b, Q]
  ), Se = A ? z ?? Y[0] ?? "new" : null;
  g.useEffect(() => {
    if (Se == null) return;
    const q = requestAnimationFrame(() => {
      Re.current?.querySelector(`[data-voice="${W}"]`)?.focus();
    });
    return () => cancelAnimationFrame(q);
  }, [Se]);
  const $e = g.useCallback(
    (q) => {
      q.key === "Escape" && (q.preventDefault(), Mt());
    },
    [Mt]
  ), Fe = g.useMemo(() => {
    const q = /* @__PURE__ */ new Map();
    for (const fe of N) for (const De of fe.segIds) q.set(De, fe);
    return q;
  }, [N]), rt = g.useMemo(() => ww(S, N), [S, N]), yt = g.useMemo(() => qL(S, N), [S, N]), Tt = g.useMemo(
    () => rt.filter((q) => p.some((fe) => fe.id === q.voiceId)).filter((q) => sl(S, q.segIds).trim() !== "").map((q) => {
      const fe = UL(a, q.emotion);
      return {
        jobId: q.id,
        label: yt[q.id] ?? q.id,
        segment: {
          text: sl(S, q.segIds),
          voice_asset_id: q.voiceId,
          speaker_label: (lc(p, q.voiceId) ?? fl).name,
          emotion: fe ? { mode: "emotion_vector", vector: fe } : null
        }
      };
    }),
    [rt, S, p, a, yt]
  ), kn = g.useMemo(
    () => Tt.map((q) => q.segment),
    [Tt]
  ), Sn = g.useRef(null);
  g.useEffect(() => {
    const q = JSON.stringify(kn);
    q !== Sn.current && (Sn.current = q, u?.(kn));
  }, [kn, u]);
  const pn = g.useRef(null);
  g.useEffect(() => {
    const q = JSON.stringify(Tt);
    q !== pn.current && (pn.current = q, f?.(Tt));
  }, [Tt, f]);
  const Pt = g.useMemo(() => {
    const q = /* @__PURE__ */ new Map();
    for (const fe of N) {
      const De = [...fe.segIds].sort((_e, Ye) => Be(_e) - Be(Ye))[0];
      De && q.set(fe.id, De);
    }
    return q;
  }, [N, Be]), zt = g.useMemo(() => {
    const q = /* @__PURE__ */ new Set();
    for (const fe of N) for (const De of fe.segIds) q.add(De);
    return q.size;
  }, [N]), It = g.useMemo(() => HL(S), [S]), Dn = FL(N), zn = lc(p, W) ?? fl, [cn, wn] = g.useState(null), ue = T.trim().toLowerCase(), Me = g.useMemo(
    () => p.filter(
      (q) => !ue || q.name.toLowerCase().includes(ue) || q.role.toLowerCase().includes(ue)
    ),
    [p, ue]
  ), je = g.useMemo(
    () => R.filter(
      (q) => !ue || q.name.toLowerCase().includes(ue) || (q.voice?.name.toLowerCase().includes(ue) ?? !1)
    ),
    [R, ue]
  ), ge = C === "character" ? `${je.length} character${je.length === 1 ? "" : "s"}` : `${Me.length} voice${Me.length === 1 ? "" : "s"}`, Ge = (q) => q.stopPropagation();
  return /* @__PURE__ */ c.jsxs("div", { className: YL, children: [
    /* @__PURE__ */ c.jsxs("div", { style: q6, children: [
      /* @__PURE__ */ c.jsxs("span", { className: KL, children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("strong", { children: zt }),
          " cast"
        ] }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("strong", { children: It }),
          " words"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: QL,
          "aria-pressed": K,
          onClick: () => B((q) => !q),
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
        onChange: (q) => i(q.target.value),
        placeholder: "Paste or write your script, then switch back to cast each phrase.",
        "aria-label": "Storyboard script text",
        style: F6
      }
    ) : /* @__PURE__ */ c.jsxs(
      "div",
      {
        ref: ae,
        className: XL,
        role: "group",
        "aria-label": "Story script — select a phrase to cast a voice",
        onMouseDown: (q) => {
          q.shiftKey && q.preventDefault();
        },
        onClick: () => {
          A && Mt();
        },
        children: [
          S.map((q) => /* @__PURE__ */ c.jsx("p", { className: ZL, children: q.segs.map((fe, De) => {
            const _e = Fe.get(fe.id), Ye = Y.includes(fe.id), gt = !!_e && (U === _e.id || pe === _e.id), xt = !!_e && Pt.get(_e.id) === fe.id, D = _e ? lc(p, _e.voiceId) : null, P = Yf(fe.id, Fe, Y), Z = Yf(q.segs[De - 1]?.id, Fe, Y), ve = Yf(q.segs[De + 1]?.id, Fe, Y), ye = P != null && Z !== P, Ae = P != null && ve !== P;
            return /* @__PURE__ */ c.jsxs("span", { children: [
              xt && D && /* @__PURE__ */ c.jsx("span", { className: WL, style: G6(D), "aria-hidden": "true", children: D.initial }),
              /* @__PURE__ */ c.jsx(
                "span",
                {
                  ref: (xe) => {
                    xe && be.current.set(fe.id, xe);
                  },
                  role: "button",
                  tabIndex: 0,
                  "aria-pressed": Ye || !!_e,
                  "aria-label": _e ? `${D?.name ?? "voice"} · ${fe.text.trim()}` : fe.text.trim(),
                  className: JL,
                  style: P6(Ye, D, gt, fe.kind, ye, Ae),
                  onClick: (xe) => {
                    xe.stopPropagation(), Ve(fe.id, xe.currentTarget, xe.shiftKey);
                  },
                  onKeyDown: (xe) => {
                    (xe.key === "Enter" || xe.key === " ") && (xe.preventDefault(), Ve(fe.id, xe.currentTarget, xe.shiftKey));
                  },
                  onMouseEnter: _e ? () => J(_e.id) : void 0,
                  onMouseLeave: _e ? () => J(null) : void 0,
                  children: fe.text
                }
              )
            ] }, fe.id);
          }) }, q.id)),
          A && /* @__PURE__ */ c.jsxs(
            "div",
            {
              ref: Re,
              className: e6,
              role: "dialog",
              "aria-label": z ? "Edit casting" : "Cast voice",
              style: { top: A.top, left: A.left },
              onClick: Ge,
              onMouseDown: Ge,
              onKeyDown: $e,
              children: [
                /* @__PURE__ */ c.jsxs("div", { className: t6, children: [
                  /* @__PURE__ */ c.jsx("span", { className: n6, children: z ? "Edit casting" : "Cast voice" }),
                  /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: a6,
                      style: { width: 24, height: 24 },
                      "aria-label": "Cancel",
                      onClick: Mt,
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 17 }, "aria-hidden": "true", children: "close" })
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: r6, children: [
                  /* @__PURE__ */ c.jsxs("div", { className: s6, role: "radiogroup", "aria-label": "Cast source", children: [
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
                  /* @__PURE__ */ c.jsx("span", { className: i6, children: ge })
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: l6, children: [
                  /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: K6, children: "search" }),
                  /* @__PURE__ */ c.jsx(
                    "input",
                    {
                      className: o6,
                      value: T,
                      onChange: (q) => O(q.target.value),
                      placeholder: C === "character" ? "Search characters…" : "Search voices…",
                      "aria-label": C === "character" ? "Search characters" : "Search voices"
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: c6, role: "radiogroup", "aria-label": C === "character" ? "Character" : "Voice", children: [
                  C === "voice" && Me.map((q) => {
                    const fe = cn == null && W === q.id;
                    return /* @__PURE__ */ c.jsxs(
                      "button",
                      {
                        type: "button",
                        role: "radio",
                        "aria-checked": fe,
                        className: ax,
                        style: lx(q, fe),
                        onClick: () => {
                          G(q.id), wn(null);
                        },
                        children: [
                          /* @__PURE__ */ c.jsx("span", { style: ox(q), children: q.initial }),
                          /* @__PURE__ */ c.jsxs("span", { className: rx, children: [
                            /* @__PURE__ */ c.jsx("span", { style: cx(fe), children: q.name }),
                            /* @__PURE__ */ c.jsx("span", { style: X6, children: q.role })
                          ] }),
                          fe && /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 18, color: q.color, flexShrink: 0 }, children: "check" })
                        ]
                      },
                      q.id
                    );
                  }),
                  C === "character" && je.map((q) => {
                    const fe = q.voice ?? fl, De = cn === q.id;
                    return /* @__PURE__ */ c.jsxs(
                      "button",
                      {
                        type: "button",
                        role: "radio",
                        "aria-checked": De,
                        className: ax,
                        style: lx(fe, De),
                        onClick: () => {
                          G(q.voiceId), wn(q.id);
                        },
                        children: [
                          /* @__PURE__ */ c.jsx("span", { style: ox(fe), children: fe.initial }),
                          /* @__PURE__ */ c.jsxs("span", { className: rx, children: [
                            /* @__PURE__ */ c.jsx("span", { style: cx(De), children: q.name }),
                            /* @__PURE__ */ c.jsx("span", { style: Q6, children: fe.name })
                          ] }),
                          De && /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 18, color: fe.color, flexShrink: 0 }, children: "check" })
                        ]
                      },
                      q.id
                    );
                  }),
                  (C === "voice" && Me.length === 0 || C === "character" && je.length === 0) && /* @__PURE__ */ c.jsx("div", { className: u6, children: C === "character" ? R.length === 0 ? "No characters mapped yet." : `No matches for “${T}”` : p.length === 0 ? "No voices yet — add voice assets." : `No matches for “${T}”` })
                ] }),
                /* @__PURE__ */ c.jsx("div", { className: d6 }),
                /* @__PURE__ */ c.jsxs("div", { className: f6, children: [
                  /* @__PURE__ */ c.jsx("span", { className: ex, style: { fontSize: 9.5, marginBottom: 0 }, children: "Emotion" }),
                  /* @__PURE__ */ c.jsx(
                    "div",
                    {
                      className: h6,
                      role: "radiogroup",
                      "aria-label": "Emotion",
                      onKeyDown: (q) => {
                        q.key === "ArrowRight" || q.key === "ArrowDown" ? (q.preventDefault(), bt(1)) : (q.key === "ArrowLeft" || q.key === "ArrowUp") && (q.preventDefault(), bt(-1));
                      },
                      children: b.map((q) => {
                        const fe = Q === q.id;
                        return /* @__PURE__ */ c.jsx(
                          "button",
                          {
                            type: "button",
                            role: "radio",
                            "aria-checked": fe,
                            "data-emotion": q.id,
                            tabIndex: fe ? 0 : -1,
                            className: m6,
                            style: Z6(zn, fe),
                            onClick: () => ie(q.id),
                            children: q.label
                          },
                          q.id
                        );
                      })
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsx("div", { className: p6, children: /* @__PURE__ */ c.jsx("span", { className: g6, children: sl(S, Y) }) }),
                /* @__PURE__ */ c.jsxs("div", { className: v6, children: [
                  z && /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: y6,
                      "aria-label": "Remove casting",
                      onClick: () => z && At(z),
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: "delete" })
                    }
                  ),
                  /* @__PURE__ */ c.jsxs(
                    "button",
                    {
                      type: "button",
                      style: J6(zn),
                      onClick: dt,
                      children: [
                        /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 17 }, "aria-hidden": "true", children: "check" }),
                        z ? "Update" : "Cast"
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
    /* @__PURE__ */ c.jsxs("div", { className: b6, children: [
      /* @__PURE__ */ c.jsxs("div", { className: x6, children: [
        /* @__PURE__ */ c.jsxs("div", { className: S6, children: [
          /* @__PURE__ */ c.jsx("span", { className: ex, style: { marginBottom: 0 }, children: "Assigned segments" }),
          /* @__PURE__ */ c.jsx("span", { className: w6, children: N.length }),
          Dn && /* @__PURE__ */ c.jsx("span", { className: j6, children: Dn })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ c.jsx("button", { type: "button", className: sx, "aria-label": "Scroll segments left", onClick: () => at(-1), disabled: N.length === 0, children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 18 }, "aria-hidden": "true", children: "chevron_left" }) }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: sx, "aria-label": "Scroll segments right", onClick: () => at(1), disabled: N.length === 0, children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 18 }, "aria-hidden": "true", children: "chevron_right" }) })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { ref: ce, className: E6, children: [
        rt.map((q) => {
          const fe = lc(p, q.voiceId) ?? fl, De = sn(q), _e = m?.get(q.id), Ye = _e ? kL(_e) : q.status, gt = DL[Ye], xt = pe === q.id || U === q.id, D = te === q.id, P = sl(S, q.segIds), Z = Ye === "ready" ? I6(y, _e?.utteranceId) : null, ve = Z != null;
          return /* @__PURE__ */ c.jsxs(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `${fe.name} ${yt[q.id]} — ${Wb(b, q.emotion)} — ${De ? "voice removed — recast" : gt.label}`,
              className: N6,
              "data-broken": De ? "true" : "false",
              style: De ? e8(xt) : W6(fe, xt),
              onClick: () => Ce(q),
              onKeyDown: (ye) => {
                (ye.key === "Enter" || ye.key === " ") && (ye.preventDefault(), Ce(q));
              },
              onMouseEnter: () => J(q.id),
              onMouseLeave: () => J(null),
              onFocus: () => k(q.id),
              children: [
                /* @__PURE__ */ c.jsxs("div", { className: C6, children: [
                  /* @__PURE__ */ c.jsxs("div", { className: T6, children: [
                    /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 17, color: fe.color }, children: fe.icon }),
                    /* @__PURE__ */ c.jsx("span", { className: R6, children: fe.name })
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: _6, children: yt[q.id] })
                ] }),
                /* @__PURE__ */ c.jsx("span", { className: M6, children: P }),
                /* @__PURE__ */ c.jsxs("div", { className: A6, children: [
                  /* @__PURE__ */ c.jsx("span", { style: n8(fe), children: Wb(b, q.emotion) }),
                  /* @__PURE__ */ c.jsxs("span", { className: k6, children: [
                    /* @__PURE__ */ c.jsx("span", { style: a8(gt) }),
                    /* @__PURE__ */ c.jsx("span", { style: r8(gt, Ye), children: gt.label })
                  ] })
                ] }),
                De && /* @__PURE__ */ c.jsxs("span", { style: t8, role: "status", children: [
                  /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 14 }, "aria-hidden": "true", children: "error" }),
                  "voice removed — recast"
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: D6, children: [
                  /* @__PURE__ */ c.jsxs(
                    "button",
                    {
                      type: "button",
                      className: z6,
                      "aria-label": D ? "Pause preview" : "Preview audio",
                      disabled: !ve && !D,
                      onClick: (ye) => {
                        ye.stopPropagation(), (ve || D) && Xe(q.id);
                      },
                      children: [
                        /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: D ? "pause_circle" : "play_circle" }),
                        D ? "Playing" : "Preview"
                      ]
                    }
                  ),
                  /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: O6,
                      "aria-label": `Remove ${yt[q.id]}`,
                      onClick: (ye) => {
                        ye.stopPropagation(), At(q.id);
                      },
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: "close" })
                    }
                  )
                ] }),
                D && Z && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                  /* @__PURE__ */ c.jsx(
                    "audio",
                    {
                      src: Z,
                      controls: !0,
                      autoPlay: !0,
                      preload: "auto",
                      style: H6,
                      onEnded: () => ne((ye) => ye === q.id ? null : ye),
                      children: /* @__PURE__ */ c.jsx("track", { kind: "captions" })
                    }
                  ),
                  /* @__PURE__ */ c.jsx("div", { className: L6, children: /* @__PURE__ */ c.jsx("div", { style: s8(fe) }) })
                ] })
              ]
            },
            q.id
          );
        }),
        N.length === 0 && /* @__PURE__ */ c.jsxs("div", { className: $6, children: [
          /* @__PURE__ */ c.jsx("span", { className: U6, children: "0" }),
          /* @__PURE__ */ c.jsx("span", { className: B6, children: "No segments cast yet. Select a phrase above to begin." })
        ] })
      ] })
    ] })
  ] });
}
const q6 = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }, H6 = { width: "100%", height: 32, marginTop: 8, display: "block" }, F6 = {
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
function P6(t, a, s, i, o, u) {
  const f = { padding: "2px 0", cursor: "pointer", WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" }, m = "186,158,255";
  return t ? { ...f, ...ix(o, u), background: `rgba(${m},0.16)`, boxShadow: `inset 0 -2px 0 rgba(${m},0.7)`, color: "var(--on-surface)" } : a ? { ...f, ...ix(o, u), background: `rgba(${a.rgb},${s ? 0.2 : 0.11})`, boxShadow: `inset 0 -2px 0 ${a.color}`, color: "var(--on-surface)" } : { ...f, color: i === "dialogue" ? "var(--on-surface)" : "var(--on-surface-variant)" };
}
function G6(t) {
  return { color: t.color, background: `rgba(${t.rgb},0.18)`, boxShadow: `inset 0 0 0 1px rgba(${t.rgb},0.45)` };
}
function Y6(t, a) {
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
const K6 = { position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "var(--on-surface-muted)", pointerEvents: "none" }, X6 = { fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--on-surface-muted)" }, Q6 = { fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.02em", color: "var(--on-surface-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
function Z6(t, a) {
  return {
    border: `1px solid ${a ? `rgba(${t.rgb},0.45)` : "rgba(120,124,128,0.35)"}`,
    background: a ? `rgba(${t.rgb},0.14)` : "var(--surface-raised, rgba(255,255,255,0.05))",
    color: a ? t.color : "var(--on-surface-variant, #c4c7c5)"
  };
}
function J6(t) {
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
function W6(t, a) {
  return {
    background: a ? "var(--surface-high, #1d2023)" : "var(--surface-low, #111416)",
    transform: a ? "translateY(-2px)" : "none",
    boxShadow: a ? `inset 3px 0 0 ${t.color}, 0 0 0 1px rgba(${t.rgb},0.4), 0 12px 28px rgba(0,0,0,0.5)` : `inset 3px 0 0 ${t.color}`
  };
}
function e8(t) {
  const a = "var(--error, #ff6e84)";
  return {
    background: t ? "var(--surface-high, #1d2023)" : "var(--surface-low, #111416)",
    transform: t ? "translateY(-2px)" : "none",
    boxShadow: t ? `inset 3px 0 0 ${a}, 0 0 0 1px rgba(255,110,132,0.45), 0 12px 28px rgba(0,0,0,0.5)` : `inset 3px 0 0 ${a}, 0 0 0 1px rgba(255,110,132,0.32)`
  };
}
const t8 = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  marginTop: 6,
  fontFamily: "var(--font-ui)",
  fontSize: 10.5,
  fontWeight: 500,
  color: "var(--error, #ff6e84)"
};
function n8(t) {
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
function a8(t) {
  return {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: t.color,
    boxShadow: `0 0 8px ${t.glow}`,
    animation: t.pulse ? `${GL} 1.5s ease-in-out infinite` : "none",
    flexShrink: 0
  };
}
function r8(t, a) {
  return { fontFamily: "var(--font-ui)", fontSize: 10.5, fontWeight: 500, color: a === "queued" ? "var(--on-surface-variant)" : t.color };
}
function s8(t) {
  return { position: "absolute", top: 0, bottom: 0, width: "30%", background: `linear-gradient(90deg, transparent, ${t.color}, transparent)`, animation: `${PL} 1.1s linear infinite` };
}
var i8 = "xq3iim0", l8 = "xq3iim1", o8 = "xq3iim2", c8 = "xq3iim3", u8 = "xq3iim4", d8 = "xq3iim5", f8 = "xq3iim6", h8 = "xq3iim7", m8 = "xq3iim8", p8 = "xq3iim9", g8 = "xq3iima", v8 = "xq3iimb", y8 = "xq3iimc", b8 = "xq3iimd", x8 = "xq3iime", S8 = "xq3iimf", w8 = "xq3iimg", j8 = "xq3iimh", E8 = "xq3iimi", N8 = "xq3iimj", C8 = "xq3iimk", ux = "xq3iiml";
function T8({
  deploymentId: t,
  initialVoiceAssetId: a,
  onChange: s
}) {
  const [i, o] = g.useState([]), [u, f] = g.useState(a), [m, y] = g.useState(!0), [p, b] = g.useState(!1), [v, S] = g.useState(null), [w, j] = g.useState(!1), C = g.useRef(null), _ = g.useRef(null);
  g.useEffect(() => {
    let N = !1;
    return y(!0), Zs(t).then(({ voiceAssets: $ }) => {
      N || o($);
    }).catch(($) => {
      N || S($ instanceof Error ? $.message : "Failed to load voices");
    }).finally(() => {
      N || y(!1);
    }), () => {
      N = !0;
    };
  }, [t]), g.useEffect(() => {
    if (!w) return;
    const N = (Y) => {
      C.current && (Y.target instanceof Node && C.current.contains(Y.target) || j(!1));
    }, $ = (Y) => {
      Y.key === "Escape" && (j(!1), _.current?.focus());
    };
    return document.addEventListener("mousedown", N), document.addEventListener("keydown", $), () => {
      document.removeEventListener("mousedown", N), document.removeEventListener("keydown", $);
    };
  }, [w]);
  const T = g.useCallback(
    async (N) => {
      b(!0), S(null);
      const $ = u, Y = N === u ? null : N;
      f(Y), j(!1);
      try {
        await jT(t, Y), s?.(Y);
      } catch (ee) {
        f($), S(ee instanceof Error ? ee.message : "Failed to update default voice");
      } finally {
        b(!1);
      }
    },
    [t, s, u]
  ), O = g.useMemo(
    () => i.find((N) => N.voiceAssetId === u) ?? null,
    [i, u]
  ), R = g.useMemo(() => {
    const N = [], $ = [];
    for (const Y of i)
      Y.kind === "speaker" || Y.kind === "mixed" ? N.push(Y) : $.push(Y);
    return { uploaded: N, other: $ };
  }, [i]);
  return m ? /* @__PURE__ */ c.jsx("span", { className: ux, children: "Loading voices…" }) : i.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: ux, children: "No voices yet. Upload a reference in Mappings to enable Quick mode." }) : /* @__PURE__ */ c.jsxs("div", { ref: C, className: i8, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: _,
        type: "button",
        className: `${l8} ${w ? o8 : ""}`,
        "aria-haspopup": "listbox",
        "aria-expanded": w,
        disabled: p,
        onClick: () => j((N) => !N),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: c8, "aria-hidden": "true", children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", children: "graphic_eq" }) }),
          /* @__PURE__ */ c.jsxs("span", { className: u8, children: [
            /* @__PURE__ */ c.jsx("span", { className: d8, children: O ? O.displayName : "Pick a voice" }),
            /* @__PURE__ */ c.jsx("span", { className: f8, children: O ? jw(O) : `${i.length} voice${i.length === 1 ? "" : "s"} in library` })
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: h8, "aria-hidden": "true", children: R8.map((N, $) => /* @__PURE__ */ c.jsx("i", { style: { height: `${N * 100}%` } }, $)) }),
          /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${m8}`, "aria-hidden": "true", children: w ? "expand_less" : "expand_more" })
        ]
      }
    ),
    w && /* @__PURE__ */ c.jsxs(
      "div",
      {
        role: "listbox",
        "aria-label": "Quick mode voice",
        className: p8,
        children: [
          /* @__PURE__ */ c.jsx("div", { className: g8, children: /* @__PURE__ */ c.jsx("span", { className: v8, children: "Select voice" }) }),
          v && /* @__PURE__ */ c.jsx("div", { className: y8, role: "alert", children: v }),
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
  return /* @__PURE__ */ c.jsxs("div", { className: b8, children: [
    /* @__PURE__ */ c.jsx("div", { className: x8, children: t }),
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
      className: `${S8} ${a ? w8 : ""}`,
      onClick: s,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: j8, "aria-hidden": "true" }),
        /* @__PURE__ */ c.jsx("span", { className: E8, children: t.displayName }),
        /* @__PURE__ */ c.jsx("span", { className: N8, children: jw(t) }),
        a && /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${C8}`, "aria-hidden": "true", children: "check" })
      ]
    }
  );
}
const R8 = [0.35, 0.7, 0.5, 0.85, 0.45, 0.6, 0.32, 0.78, 0.4, 0.55, 0.7, 0.36];
function jw(t) {
  const a = [];
  return t.durationMs != null && a.push(_8(t.durationMs)), t.sampleRate != null && a.push(`${(t.sampleRate / 1e3).toFixed(1)} kHz`), t.kind && t.kind !== "speaker" && a.push(t.kind), a.length > 0 ? a.join(" · ") : "—";
}
function _8(t) {
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
function M8(t) {
  const a = ni(), s = g.useRef(null), { tokens: i, attributions: o, unresolved: u, predictedFilenames: f, characterColor: m } = g.useMemo(
    () => k8(t.value, t.outputFormat, t.mappings),
    [t.value, t.outputFormat, t.mappings]
  ), y = (b) => {
    const v = s.current;
    v && (v.scrollTop = b.currentTarget.scrollTop, v.scrollLeft = b.currentTarget.scrollLeft);
  }, p = t.quickMode === !0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: p ? f_ : c_, children: [
      !p && /* @__PURE__ */ c.jsx("div", { ref: s, className: u_, "aria-hidden": "true", children: i.map((b, v) => A8(b, v, m)) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: p ? h_ : d_,
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
    u.length > 0 && /* @__PURE__ */ c.jsxs(Fn, { severity: "error", children: [
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
function A8(t, a, s) {
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
function k8(t, a, s) {
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
    let O = "Narrator", R = C, N, $ = !1;
    if (T?.groups) {
      $ = !0;
      const I = (T.groups.body ?? "").trim(), z = (T.groups.rest ?? "").trim();
      O = ((I.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", N = (I.includes("|") ? I.slice(I.indexOf("|") + 1) : "").trim() || void 0, R = z;
    }
    S += 1;
    const Y = O.toLowerCase(), ee = (m.get(Y) ?? 0) + 1;
    m.set(Y, ee);
    const M = O === "Narrator" || s.has(Y);
    if (M || f.add(O), O !== "Narrator" && !p.has(Y) && (p.set(Y, hx[b % hx.length] ?? "currentColor"), b += 1), $) {
      const I = { kind: "character", raw: w, character: O, text: R, hasMapping: M };
      N !== void 0 && (I.override = N), o.push(I);
    } else
      o.push({ kind: "narrator", raw: w });
    u.push({ lineNumber: _, character: O, text: R, hasMapping: M }), y.push(
      `${S.toString().padStart(3, "0")}_${D8(O)}_${ee.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: u,
    unresolved: Array.from(f),
    predictedFilenames: y,
    characterColor: p
  };
}
function D8(t) {
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
function z8(t) {
  return t.replace(/[\[\]|\r\n]/g, "").trim();
}
function O8() {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `row_${crypto.randomUUID()}` : `row_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}
function L8(t) {
  return t.replace(/[\r\n]/g, " ").trim();
}
function Nw(t) {
  return Number.isNaN(t) ? 1 : t < 0 ? 0 : t > 1 ? 1 : t;
}
function Cw(t) {
  const a = Math.round(t * 1e3) / 1e3;
  return Number.isInteger(a) ? a.toFixed(1) : String(a);
}
function $8(t) {
  const a = [];
  for (let s = 0; s < mx.length; s += 1) {
    const i = t[s];
    typeof i == "number" && (Math.abs(i) < Ew || a.push(`${mx[s]}=${Cw(Nw(i))}`));
  }
  return a.length === 0 ? null : a.join(",");
}
function U8(t, a) {
  const s = z8(t.character) || "Narrator", i = L8(t.text);
  if (!i) return null;
  const o = [];
  if (t.presetId) {
    const m = a.get(t.presetId);
    if (m) {
      const y = $8(m.vector);
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
    const u = U8(o, s);
    u && i.push(u);
  }
  return i.join(`
`);
}
function Kr() {
  return {
    id: O8(),
    character: "",
    presetId: null,
    alpha: 1,
    text: ""
  };
}
var B8 = "_1827s3t2", I8 = "_1827s3t3", V8 = "_1827s3t4", q8 = "_1827s3t5", H8 = "_1827s3t6", F8 = "_1827s3t7", P8 = "_1827s3t8", G8 = "_1827s3t9", Y8 = "_1827s3ta", K8 = "_1827s3tb", X8 = "_1827s3td _1827s3tc", Q8 = "_1827s3te _1827s3tc", Z8 = "_1827s3tf", J8 = "_1827s3tg", W8 = "_1827s3th", e$ = "_1827s3ti _1827s3tc", t$ = "_1827s3tj", n$ = "_1827s3tk", a$ = "_1827s3tl", r$ = "_1827s3tm", s$ = "_1827s3tn", i$ = "_1827s3to", l$ = "_1827s3tp", o$ = "_1827s3tq", c$ = "_1827s3tr", u$ = "_1827s3ts", d$ = "_1827s3tt", f$ = "_1827s3tu";
function h$({
  rows: t,
  onRowsChange: a,
  presets: s,
  mappingsByLower: i
}) {
  const o = g.useId(), u = g.useId(), f = g.useId(), m = g.useRef(null), y = g.useRef(/* @__PURE__ */ new Map()), p = g.useRef(/* @__PURE__ */ new Map()), b = g.useRef(/* @__PURE__ */ new Map()), [v, S] = g.useState(null), [w, j] = g.useState(!1), C = g.useRef(null), _ = g.useRef(null), [T, O] = g.useState(null), [R, N] = g.useState(null), [$, Y] = g.useState("");
  g.useEffect(() => {
    v && (v.kind === "addBtn" ? m.current?.focus() : v.kind === "text" && v.rowId ? y.current.get(v.rowId)?.focus() : v.kind === "remove" && v.rowId ? p.current.get(v.rowId)?.focus() : v.kind === "character" && v.rowId ? b.current.get(v.rowId)?.focus() : v.kind === "unmappedFirstItem" && _.current?.querySelector("button")?.focus(), S(null));
  }, [v]);
  const ee = t.filter((B) => B.text.trim().length > 0).length, M = g.useMemo(() => {
    const B = /* @__PURE__ */ new Map();
    for (const ae of t) {
      const ce = ae.character.trim(), be = ce.toLowerCase();
      !be || be === "narrator" || i.has(be) || B.has(be) || B.set(be, ce);
    }
    return Array.from(B.values()).sort((ae, ce) => ae.localeCompare(ce));
  }, [t, i]), I = M.length, z = g.useRef(I), [F, W] = g.useState(0);
  g.useEffect(() => {
    I > z.current && W((B) => B + 1), z.current = I;
  }, [I]), g.useEffect(() => {
    if (!w) return;
    S({ kind: "unmappedFirstItem" });
    const B = (ce) => {
      if (!_.current || !C.current) return;
      const be = ce.target;
      _.current.contains(be) || C.current.contains(be) || j(!1);
    }, ae = (ce) => {
      ce.key === "Escape" && (j(!1), C.current?.focus());
    };
    return document.addEventListener("mousedown", B), document.addEventListener("keydown", ae), () => {
      document.removeEventListener("mousedown", B), document.removeEventListener("keydown", ae);
    };
  }, [w]);
  const G = g.useMemo(() => {
    const B = /* @__PURE__ */ new Set();
    return i.forEach((ae) => B.add(ae.characterName)), Array.from(B).sort((ae, ce) => ae.localeCompare(ce));
  }, [i]), Q = g.useCallback(
    (B, ae) => {
      a(t.map((ce) => ce.id === B ? { ...ce, ...ae } : ce));
    },
    [t, a]
  ), ie = g.useRef(t);
  g.useEffect(() => {
    ie.current = t;
  }, [t]);
  const A = g.useCallback(
    (B) => {
      const ae = t.findIndex((We) => We.id === B);
      if (ae < 0) return;
      const ce = t[ae];
      if (!ce) return;
      const be = ae > 0 ? t[ae - 1]?.id ?? null : null, Re = t.filter((We) => We.id !== B);
      a(Re);
      const ot = ce.character.trim() || `Line ${ae + 1}`;
      mn(`Removed ${ot}`, {
        action: {
          label: "Undo",
          onClick: () => {
            const We = ie.current;
            if (We.some((qt) => qt.id === ce.id)) return;
            const Be = [...We], Pe = be ? We.findIndex((qt) => qt.id === be) : -1, sn = Pe >= 0 ? Pe + 1 : 0;
            Be.splice(sn, 0, ce), a(Be);
          }
        },
        duration: 5e3
      });
      const Ne = `Removed line ${ae + 1}, now ${Re.length} ${Re.length === 1 ? "line" : "lines"}`;
      if (Y((We) => We === Ne ? `${Ne}​` : Ne), Re.length === 0)
        S({ kind: "addBtn" });
      else {
        const We = ae < Re.length ? ae : Re.length - 1, Be = Re[We];
        S(Be ? { kind: "remove", rowId: Be.id } : { kind: "addBtn" });
      }
    },
    [t, a]
  ), H = g.useCallback(
    (B) => {
      const ae = Kr();
      let ce;
      if (B === null)
        ce = [...t, ae];
      else {
        const be = t.findIndex((Re) => Re.id === B);
        ce = be < 0 ? [...t, ae] : [...t.slice(0, be + 1), ae, ...t.slice(be + 1)];
      }
      a(ce), S({ kind: "text", rowId: ae.id });
    },
    [t, a]
  ), U = g.useCallback(
    (B, ae) => {
      const ce = t.findIndex((Pe) => Pe.id === B);
      if (ce < 0) return;
      const be = ce + ae;
      if (be < 0 || be >= t.length) return;
      const Re = [...t], ot = Re[ce], Ne = Re[be];
      if (!ot || !Ne) return;
      Re[ce] = Ne, Re[be] = ot, a(Re);
      const Be = `Moved ${ot.character.trim() || `Line ${ce + 1}`} to position ${be + 1} of ${Re.length}`;
      Y((Pe) => Pe === Be ? `${Be}​` : Be);
    },
    [t, a]
  ), J = g.useCallback(
    (B, ae) => {
      B.key === "Enter" && !B.shiftKey ? (B.preventDefault(), H(ae)) : B.altKey && B.key === "ArrowUp" ? (B.preventDefault(), U(ae, -1)) : B.altKey && B.key === "ArrowDown" && (B.preventDefault(), U(ae, 1));
    },
    [H, U]
  ), pe = g.useCallback((B, ae) => {
    O(ae), B.dataTransfer.effectAllowed = "move", B.dataTransfer.setData("text/plain", ae);
  }, []), k = g.useCallback((B, ae) => {
    T && (B.preventDefault(), B.dataTransfer.dropEffect = "move", R !== ae && N(ae));
  }, [T, R]), te = g.useCallback(
    (B, ae) => {
      B.preventDefault();
      const ce = T ?? B.dataTransfer.getData("text/plain");
      if (O(null), N(null), !ce || ce === ae) return;
      const be = t.findIndex((Pe) => Pe.id === ce), Re = t.findIndex((Pe) => Pe.id === ae);
      if (be < 0 || Re < 0) return;
      const ot = [...t], [Ne] = ot.splice(be, 1);
      if (!Ne) return;
      ot.splice(Re, 0, Ne), a(ot);
      const Be = `Moved ${Ne.character.trim() || `Line ${be + 1}`} to position ${Re + 1} of ${ot.length}`;
      Y((Pe) => Pe === Be ? `${Be}​` : Be);
    },
    [t, a, T]
  ), ne = g.useCallback(() => {
    O(null), N(null);
  }, []), K = g.useCallback(
    (B) => {
      const ae = t.find((ce) => ce.character.trim().toLowerCase() === B.toLowerCase());
      ae && S({ kind: "character", rowId: ae.id }), j(!1);
    },
    [t]
  );
  return /* @__PURE__ */ c.jsxs("section", { className: B8, "aria-labelledby": u, children: [
    /* @__PURE__ */ c.jsxs("header", { className: I8, children: [
      /* @__PURE__ */ c.jsxs("span", { className: V8, id: u, children: [
        "02 / Per-character lines",
        t.length > 1 && /* @__PURE__ */ c.jsx("span", { className: d$, children: "· Alt+↑↓ to reorder" })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: q8, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: H8, children: ee.toString().padStart(2, "0") }),
        " lines",
        I > 0 && /* @__PURE__ */ c.jsxs("span", { className: n$, children: [
          /* @__PURE__ */ c.jsxs(
            "button",
            {
              ref: C,
              type: "button",
              className: f$,
              "aria-haspopup": "dialog",
              "aria-expanded": w,
              "aria-controls": f,
              title: "Click to see unmapped characters",
              onClick: () => j((B) => !B),
              children: [
                "⚠ ",
                I,
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
              className: a$,
              children: [
                /* @__PURE__ */ c.jsx("p", { className: r$, children: "These characters have no voice mapping. Click a name to jump to its row." }),
                /* @__PURE__ */ c.jsx("ul", { className: s$, children: M.map((B) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsx(
                  "button",
                  {
                    type: "button",
                    className: i$,
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
    t.length === 0 ? /* @__PURE__ */ c.jsx("p", { className: c$, children: "No lines yet — add a character line to start. Each row produces one utterance." }) : /* @__PURE__ */ c.jsx("ul", { className: F8, children: t.map((B, ae) => {
      const ce = B.character.trim() || `line ${ae + 1}`, be = i.has(B.character.trim().toLowerCase()), Re = T === B.id, ot = R === B.id && T !== B.id;
      return /* @__PURE__ */ c.jsxs(
        "li",
        {
          className: P8,
          "data-mapped": be || void 0,
          "data-dragging": Re || void 0,
          "data-drag-over": ot || void 0,
          onDragOver: (Ne) => k(Ne, B.id),
          onDrop: (Ne) => te(Ne, B.id),
          onDragEnd: ne,
          children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: G8,
                draggable: !0,
                "aria-label": `Drag to reorder ${ce}. Use Alt+ArrowUp / Alt+ArrowDown for keyboard reorder.`,
                title: "Drag to reorder · Alt+↑ / Alt+↓",
                onDragStart: (Ne) => pe(Ne, B.id),
                onKeyDown: (Ne) => {
                  Ne.altKey && Ne.key === "ArrowUp" ? (Ne.preventDefault(), U(B.id, -1)) : Ne.altKey && Ne.key === "ArrowDown" && (Ne.preventDefault(), U(B.id, 1));
                },
                children: "⋮⋮"
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: K8, "aria-hidden": "true", children: (ae + 1).toString().padStart(2, "0") }),
            /* @__PURE__ */ c.jsx(
              "input",
              {
                ref: (Ne) => {
                  Ne ? b.current.set(B.id, Ne) : b.current.delete(B.id);
                },
                type: "text",
                value: B.character,
                onChange: (Ne) => Q(B.id, { character: Ne.target.value }),
                placeholder: "Character",
                className: X8,
                "aria-label": `Character name for ${ce}`,
                list: G.length > 0 ? o : void 0,
                autoComplete: "off",
                spellCheck: !1
              }
            ),
            /* @__PURE__ */ c.jsxs(
              "select",
              {
                value: B.presetId ?? "",
                onChange: (Ne) => Q(B.id, { presetId: Ne.target.value === "" ? null : Ne.target.value }),
                className: Q8,
                "aria-label": `Emotion preset for ${ce}`,
                children: [
                  /* @__PURE__ */ c.jsx("option", { value: "", children: "No emotion" }),
                  s.map((Ne) => /* @__PURE__ */ c.jsx("option", { value: Ne.presetId, children: Ne.presetName }, Ne.presetId))
                ]
              }
            ),
            /* @__PURE__ */ c.jsxs("span", { className: Z8, children: [
              /* @__PURE__ */ c.jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 1,
                  step: 0.05,
                  value: B.alpha,
                  onChange: (Ne) => Q(B.id, { alpha: Number.parseFloat(Ne.target.value) }),
                  className: J8,
                  "aria-label": `Emotion intensity for ${ce}`,
                  "aria-valuetext": `${Math.round(B.alpha * 100)} percent`
                }
              ),
              /* @__PURE__ */ c.jsx(
                "span",
                {
                  className: W8,
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
                onChange: (Ne) => Q(B.id, { text: Ne.target.value }),
                onKeyDown: (Ne) => J(Ne, B.id),
                placeholder: "Line text…",
                className: e$,
                "aria-label": `Line text for ${ce}`
              }
            ),
            /* @__PURE__ */ c.jsx(
              "button",
              {
                ref: (Ne) => {
                  Ne ? p.current.set(B.id, Ne) : p.current.delete(B.id);
                },
                type: "button",
                className: t$,
                "aria-label": `Remove ${ce}`,
                title: "Remove this line",
                onClick: () => A(B.id),
                children: "✕"
              }
            ),
            ae < t.length - 1 && /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: Y8,
                "aria-label": `Insert line after ${ce}`,
                title: "Insert line below",
                onClick: () => H(B.id),
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
        className: l$,
        onClick: () => H(null),
        "aria-label": "Add character line",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: o$, "aria-hidden": "true", children: "＋" }),
          "Add line"
        ]
      }
    ),
    G.length > 0 && /* @__PURE__ */ c.jsx("datalist", { id: o, children: G.map((B) => /* @__PURE__ */ c.jsx("option", { value: B }, B)) }),
    /* @__PURE__ */ c.jsx("div", { className: u$, role: "status", "aria-live": "polite", "aria-atomic": "true", children: $ })
  ] });
}
var m$ = "fmg0gf0", p$ = "fmg0gf1", px = { idle: "fmg0gf3 fmg0gf2", active: "fmg0gf4 fmg0gf2" };
const Fs = [
  { id: "quick", label: "Quick", glyph: "01", description: "Single voice · plain prose" },
  { id: "rows", label: "Per-character", glyph: "02", description: "One row per line · multi-voice" },
  { id: "story", label: "Story", glyph: "03", description: "Free-form text with @character and /emotion commands" },
  { id: "storyboard", label: "Storyboard", glyph: "04", description: "Click words to cast voice + emotion in bulk · shift-click to extend a range" }
], g$ = Fs;
function v$({
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
  return /* @__PURE__ */ c.jsx("div", { className: m$, role: "radiogroup", "aria-label": "Editor mode", children: Fs.map((f, m) => {
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
          /* @__PURE__ */ c.jsx("span", { className: p$, "aria-hidden": "true", children: f.glyph }),
          /* @__PURE__ */ c.jsx("span", { children: b })
        ]
      },
      f.id
    );
  }) });
}
const y$ = [
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
function b$(t, a) {
  const s = t.ownerDocument;
  if (!s) return { top: 0, left: 0, height: 0 };
  const i = s.createElement("div"), o = s.defaultView?.getComputedStyle(t);
  if (!o) return { top: 0, left: 0, height: 0 };
  const u = i.style, f = o;
  for (const C of y$) {
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
`, "\r"]), x$ = /[\p{L}\p{N}_-]/u, S$ = /[^\p{L}\p{N}_-]+/gu;
function Mw(t) {
  return t ? x$.test(t) : !1;
}
function w$(t) {
  return t.replace(S$, "_").replace(/_+/g, "_").replace(/^[_-]+|[_-]+$/g, "");
}
function j$(t, a) {
  if (a >= t.length) return 0;
  const s = t.charCodeAt(a);
  if (s >= 55296 && s <= 56319 && a + 1 < t.length) {
    const i = t.charCodeAt(a + 1);
    if (i >= 56320 && i <= 57343) return 2;
  }
  return 1;
}
function Uc(t, a) {
  const s = j$(t, a);
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
function E$(t, a) {
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
var N$ = "_1d2ofoy5", C$ = "_1d2ofoy6", T$ = "_1d2ofoy8 _1d2ofoy7", R$ = "_1d2ofoy9 _1d2ofoy7", _$ = "_1d2ofoya", M$ = "_1d2ofoyb", A$ = "_1d2ofoyc", k$ = "_1d2ofoye", D$ = "_1d2ofoyf", z$ = "_1d2ofoyg", O$ = "_1d2ofoyh", L$ = "_1d2ofoyi", $$ = "_1d2ofoyj", oc = "_1d2ofoyk", U$ = "_1d2ofoyl";
const B$ = `Type @character to set the speaker, /emotion to set the emotion preset.

@bob /happy I love mornings!
@alice /melancholic I prefer evenings.`;
function I$({
  value: t,
  onChange: a,
  characters: s,
  presets: i,
  mappingsByLower: o
}) {
  const u = g.useRef(null), f = g.useRef(null), m = g.useId(), y = `${m}-opt`, [p, b] = g.useState(null), v = g.useMemo(() => Bc(t), [t]), S = g.useMemo(() => {
    const z = /* @__PURE__ */ new Map();
    o.forEach((F) => z.set(F.characterName.toLowerCase(), F.characterName));
    for (const F of s) {
      const W = F.toLowerCase();
      z.has(W) || z.set(W, F);
    }
    return Array.from(z.values()).sort((F, W) => F.localeCompare(W));
  }, [s, o]), w = g.useMemo(() => {
    if (!p) return [];
    const z = p.query.toLowerCase();
    if (p.kind === "character")
      return S.filter((G) => G.toLowerCase().includes(z)).slice(0, 8).map((G) => {
        const Q = o.get(G.toLowerCase());
        return { value: G, hint: Q ? "mapped" : "unmapped" };
      });
    const F = /* @__PURE__ */ new Set(), W = [];
    for (const G of i) {
      const Q = G.presetName.toLowerCase();
      if (Q.includes(z) && !F.has(Q) && (F.add(Q), W.push({ value: G.presetName, hint: "vector" }), W.length >= 8))
        break;
    }
    return W;
  }, [p, S, o, i]), j = g.useCallback((z, F, W) => {
    if (F < 0) return null;
    const G = E$(z, F);
    if (!G) return null;
    const Q = u.current, ie = Q ? b$(Q, F) : { top: 0, left: 0, height: 0 };
    return {
      triggerStart: G.start,
      query: G.query,
      kind: G.kind,
      selected: W && W.kind === G.kind ? W.selected : 0,
      caretTop: ie.top,
      caretLeft: ie.left,
      caretHeight: ie.height
    };
  }, []), C = g.useCallback(() => {
    const z = u.current;
    if (!z) {
      b(null);
      return;
    }
    const F = z.selectionStart;
    if (F !== z.selectionEnd) {
      b(null);
      return;
    }
    b((W) => j(t, F, W));
  }, [t, j]);
  g.useEffect(() => {
    if (!p) return;
    const z = w.length, F = z === 0 ? 0 : Math.min(p.selected, z - 1);
    p.selected !== F && b({ ...p, selected: F });
  }, [p, w]), g.useLayoutEffect(() => {
    const z = f.current, F = u.current;
    !z || !F || (z.scrollTop = F.scrollTop, z.scrollLeft = F.scrollLeft);
  }), g.useEffect(() => {
    const z = u.current, F = f.current;
    if (!z || !F) return;
    const W = () => {
      F.scrollTop = z.scrollTop, F.scrollLeft = z.scrollLeft;
    };
    return z.addEventListener("scroll", W, { passive: !0 }), () => z.removeEventListener("scroll", W);
  }, []);
  const _ = g.useCallback(
    (z) => {
      const F = z.target.value;
      a(F);
      const W = z.target;
      requestAnimationFrame(() => {
        const G = W.selectionStart;
        if (G !== W.selectionEnd) {
          b(null);
          return;
        }
        b((Q) => j(F, G, Q));
      });
    },
    [a, j]
  ), T = g.useCallback(() => {
    C();
  }, [C]), O = g.useCallback(
    (z, F) => {
      if (!p) return;
      const W = Rw[p.kind], G = p.triggerStart + 1 + p.query.length, Q = t.slice(0, p.triggerStart), ie = t.slice(G), A = w$(z);
      if (!A) return;
      const H = `${W}${A} `, U = `${Q}${H}${ie}`;
      a(U);
      const J = Q.length + H.length;
      b(null), F.advanceFocus || requestAnimationFrame(() => {
        u.current && (u.current.focus(), u.current.setSelectionRange(J, J));
      });
    },
    [p, t, a]
  ), R = g.useCallback(
    (z) => {
      if (p) {
        if (z.key === "Escape") {
          z.preventDefault(), b(null);
          return;
        }
        if (w.length !== 0) {
          if (z.key === "ArrowDown")
            z.preventDefault(), b((F) => F && { ...F, selected: (F.selected + 1) % w.length });
          else if (z.key === "ArrowUp")
            z.preventDefault(), b(
              (F) => F && { ...F, selected: (F.selected - 1 + w.length) % w.length }
            );
          else if (z.key === "Enter") {
            const F = w[p.selected];
            F && (z.preventDefault(), O(F.value, { advanceFocus: !1 }));
          } else if (z.key === "Tab") {
            const F = w[p.selected];
            F && O(F.value, { advanceFocus: !0 });
          }
        }
      }
    },
    [p, w, O]
  ), N = g.useRef(null), [$, Y] = g.useState(null);
  g.useLayoutEffect(() => {
    if (!p) {
      Y(null);
      return;
    }
    const z = N.current, F = u.current;
    if (!z || !F) return;
    const W = z.offsetWidth, G = F.clientWidth, Q = Math.max(0, G - W - 8), ie = Math.max(0, p.caretLeft);
    Y(Math.min(ie, Q));
  }, [p]);
  const ee = p?.kind === "character" ? "Character" : "Emotion preset", M = p && w.length > 0 ? `${y}-${p.selected}` : void 0, I = !p || w.length > 0 ? null : p.kind === "emotion" ? i.length === 0 ? "No emotion presets yet — create one in Mappings." : `No preset matches "${p.query}". Type a different name or pick from Mappings.` : p.query.length === 0 ? "Type a name — we'll create a new character on the fly." : `No character "${p.query}" yet — keep typing to define a new one.`;
  return /* @__PURE__ */ c.jsxs("div", { className: N$, children: [
    /* @__PURE__ */ c.jsxs("div", { className: C$, children: [
      /* @__PURE__ */ c.jsx("div", { ref: f, className: T$, "aria-hidden": "true", children: V$(v, p?.triggerStart ?? null) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          ref: u,
          className: R$,
          value: t,
          onChange: _,
          onSelect: T,
          onKeyDown: R,
          placeholder: B$,
          rows: 10,
          spellCheck: !0,
          "aria-label": "Story script",
          "aria-controls": p && w.length > 0 ? m : void 0,
          "aria-autocomplete": "list",
          "aria-activedescendant": M
        }
      ),
      p && (w.length > 0 || I) && /* @__PURE__ */ c.jsxs(
        "div",
        {
          ref: N,
          className: k$,
          style: {
            top: `${p.caretTop + p.caretHeight + 6}px`,
            left: `${$ ?? Math.max(0, p.caretLeft)}px`
          },
          children: [
            /* @__PURE__ */ c.jsx("div", { className: D$, "aria-hidden": "true", children: ee }),
            w.length > 0 ? /* @__PURE__ */ c.jsx(
              "ul",
              {
                id: m,
                role: "listbox",
                "aria-label": ee,
                className: z$,
                children: w.map((z, F) => {
                  const W = `${y}-${F}`, G = F === p.selected;
                  return /* @__PURE__ */ c.jsxs(
                    "li",
                    {
                      id: W,
                      role: "option",
                      "aria-selected": G,
                      "data-active": G || void 0,
                      className: O$,
                      onMouseDown: (Q) => {
                        Q.preventDefault(), O(z.value, { advanceFocus: !1 });
                      },
                      children: [
                        /* @__PURE__ */ c.jsx("span", { children: z.value }),
                        z.hint && /* @__PURE__ */ c.jsx("span", { className: L$, children: z.hint })
                      ]
                    },
                    `${z.value}-${F}`
                  );
                })
              }
            ) : /* @__PURE__ */ c.jsx("div", { id: m, role: "status", className: U$, children: I })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: $$, children: [
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
function V$(t, a) {
  return t.map((s, i) => {
    if (s.kind === "text")
      return /* @__PURE__ */ c.jsx("span", { className: _$, children: s.value }, `${s.start}-${i}`);
    const o = s.kind, u = a !== null && s.start === a, f = s.value.replace(/_/g, " ");
    return /* @__PURE__ */ c.jsxs(
      "span",
      {
        className: A$,
        "data-kind": o,
        "data-active": u ? "true" : void 0,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: M$, children: Rw[o] }),
          f
        ]
      },
      `${s.start}-${i}`
    );
  });
}
var q$ = "_5o8xvy0", H$ = "_5o8xvy1", F$ = "_5o8xvy2", P$ = "_5o8xvy3", Kf = "_5o8xvy4", G$ = "_5o8xvy5", Y$ = "_3f2ar0", K$ = "_3f2ar1", X$ = "_3f2ar2", Q$ = "_3f2ar3", Z$ = "_3f2ar4", J$ = "_3f2ar6", il = "_3f2ar7", ll = "_3f2ar8", ol = "_3f2ar9", gx = "_3f2ara", vx = "_3f2arb";
function W$({ label: t, glyph: a = "?", children: s }) {
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
  }, [i, y]), /* @__PURE__ */ c.jsxs("span", { ref: u, className: Y$, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        id: f,
        className: K$,
        "aria-expanded": i,
        "aria-controls": m,
        onClick: () => o((p) => !p),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: X$, "aria-hidden": "true", children: a }),
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
        className: Q$,
        children: s
      }
    )
  ] });
}
var eU = "_1dxb1dg0", yx = "_1dxb1dg1", tU = "_1dxb1dg2", nU = "_1dxb1dg3", aU = "_1dxb1dg4";
function rU() {
  return /* @__PURE__ */ c.jsxs(W$, { label: "Syntax", glyph: "?", children: [
    /* @__PURE__ */ c.jsx("h3", { className: Z$, children: "Script syntax" }),
    /* @__PURE__ */ c.jsxs("ul", { className: J$, children: [
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
function sU() {
  return /* @__PURE__ */ c.jsxs("ul", { className: eU, children: [
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: yx, children: "[Char]" }),
      " plain line"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: yx, children: "[Char|emotion_vector:happy=0.7]" }),
      " per-line vector"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: tU, children: "[Char|qwen:warm]" }),
      " AI prompt mapping"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: nU, children: "[Char|preset:Bittersweet]" }),
      " saved preset"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: aU, children: "[Char|audio:slow_breath.wav]" }),
      " audio reference"
    ] })
  ] });
}
function iU({
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
  const R = t === "quick", N = t === "rows", $ = t === "story", Y = t === "storyboard", ee = $ || Y, M = g$.find((G) => G.id === t)?.description ?? "", I = N ? u.reduce((G, Q) => G + Q.text.length, 0) : ee ? m.length : i.length, z = N ? u.map((G) => G.text).join(" ") : ee ? m : i, F = z.trim() ? z.trim().split(/\s+/).length : 0, W = N ? u.filter((G) => G.text.trim().length > 0).length : (ee ? m : i).trim() ? (ee ? m : i).trim().split(/\r?\n/).filter((G) => G.trim()).length : 0;
  return /* @__PURE__ */ c.jsxs("div", { className: q$, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: `${H$} ${R ? F$ : ""}`,
        "data-quick-on": R || void 0,
        children: [
          /* @__PURE__ */ c.jsx(v$, { value: t, onChange: a }),
          R && /* @__PURE__ */ c.jsx(
            T8,
            {
              deploymentId: s.deploymentId,
              initialVoiceAssetId: S,
              onChange: w
            }
          ),
          /* @__PURE__ */ c.jsxs("div", { className: P$, "aria-live": "polite", children: [
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Kf, children: I.toString().padStart(3, "0") }),
              " ",
              "chars"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Kf, children: W.toString().padStart(2, "0") }),
              " ",
              "lines"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Kf, children: F.toString().padStart(3, "0") }),
              " ",
              "words"
            ] }),
            !N && /* @__PURE__ */ c.jsx(rU, {})
          ] })
        ]
      }
    ),
    /* @__PURE__ */ c.jsx("p", { className: G$, "aria-live": "polite", children: M }),
    Y ? /* @__PURE__ */ c.jsx(
      V6,
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
      h$,
      {
        rows: u,
        onRowsChange: f,
        presets: j,
        mappingsByLower: v
      }
    ) : $ ? /* @__PURE__ */ c.jsx(
      I$,
      {
        value: m,
        onChange: y,
        characters: p,
        presets: j,
        mappingsByLower: v
      }
    ) : /* @__PURE__ */ c.jsx(
      M8,
      {
        value: i,
        onChange: o,
        outputFormat: b,
        mappings: v,
        deploymentId: s.deploymentId,
        quickMode: R
      }
    ),
    !R && !N && !$ && !Y && /* @__PURE__ */ c.jsx(sU, {})
  ] });
}
function lU({
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
function oU(t, a, s, i) {
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
], cU = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;
function uU(t) {
  const a = [];
  if (!t) return a;
  const s = t.split(/\r?\n/);
  for (let i = 0; i < s.length; i += 1) {
    const u = (s[i] ?? "").trim();
    if (u.length === 0) continue;
    const f = u.match(cU);
    if (!f || !f.groups) {
      a.push({ idx: i, character: null, text: u, override: null });
      continue;
    }
    const m = f.groups.body ?? "", y = (f.groups.rest ?? "").trim(), [p = "", ...b] = m.split("|"), v = p.trim();
    if (!v) {
      a.push({ idx: i, character: null, text: y || u, override: null });
      continue;
    }
    const S = v.split(":")[0]?.trim() || null, w = b.join("|").trim(), j = w ? dU(w) : null;
    a.push({
      idx: i,
      character: S,
      text: y,
      override: j
    });
  }
  return a;
}
function dU(t) {
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
function fU(t) {
  const a = /* @__PURE__ */ new Set(), s = [];
  for (const i of t) {
    if (!i.character) continue;
    const o = i.character.toLowerCase();
    a.has(o) || (a.add(o), s.push(i.character));
  }
  return s;
}
function hU(t) {
  const a = {};
  for (let s = 0; s < t.length; s += 1) {
    const i = t[s];
    i && (a[i] = Xf[s % Xf.length] ?? Xf[0]);
  }
  return a;
}
function mU(t) {
  const a = {};
  for (const s of t)
    s.character && (a[s.character] = (a[s.character] ?? 0) + 1);
  return a;
}
var pU = "_1snzz30", gU = "_1snzz31", vU = "_1snzz33", yU = "_1snzz34", bU = "_1snzz36", Sx = "_1snzz3b", wx = "_1snzz3c", jx = "_1snzz3d";
const xU = "ext-action-invoke", SU = "emotion-tts.run";
function wU() {
  if (typeof document > "u") return !1;
  const t = document.querySelector("emotion-tts-app");
  return t ? (t.dispatchEvent(
    new CustomEvent(xU, {
      detail: { id: SU },
      bubbles: !1
    })
  ), !0) : !1;
}
const jU = 4e3;
function EU({ visible: t, canGenerate: a }) {
  const [s, i] = g.useState(null), [o, u] = g.useState(!1), [f, m] = g.useState(!1), y = g.useRef(null), p = g.useRef(null);
  g.useEffect(() => {
    let J = !1;
    const pe = async () => {
      try {
        const te = await yl();
        J || (y.current = te, i(te));
      } catch {
      }
    };
    pe();
    const k = window.setInterval(pe, jU);
    return () => {
      J = !0, window.clearInterval(k);
    };
  }, []), g.useEffect(() => gw((J) => {
    m(!!J.busy);
  }), []);
  const b = g.useCallback(() => {
    lO();
  }, []), v = s?.badge ?? "not_installed", S = v === "ready" || v === "running", w = v === "stopping", j = v === "starting" || v === "installing" || v === "stopping", C = S;
  g.useEffect(() => {
    o && p.current !== null && v !== p.current && (p.current = null, u(!1));
  }, [o, v]);
  const _ = g.useCallback(() => {
    p.current = y.current?.badge ?? "not_installed", u(!0), wU();
  }, []), T = w || o && S ? "Stopping…" : o ? "Starting…" : S ? "Stop runtime" : j ? "Runtime starting…" : "Start runtime", O = o || j, R = o || j, N = R ? "transitioning" : S ? "running" : "stopped", $ = !a || f || !C, Y = C ? a ? f ? "Generating…" : "Generate" : "Add a script to generate" : "Start runtime to generate", ee = C && a && !f, M = o || j ? "busy" : S ? "ready" : "off", I = w ? "Stopping…" : o ? "Working…" : S ? "Runtime ready" : j ? "Starting…" : "Runtime off", z = M === "busy";
  if (typeof document > "u") return /* @__PURE__ */ c.jsx(c.Fragment, {});
  const F = "rgba(28, 30, 34, 0.94)", W = "#ba9eff", G = "#8455ef", Q = "#1a0a3a", ie = "#f0f0f3", A = "#aaabae", H = "#22c55e", U = S ? "◼" : "⏻";
  return Wh.createPortal(
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: pU,
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
          background: F,
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
              className: gU,
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
                color: M === "ready" ? H : M === "busy" ? W : A,
                background: "rgba(255, 255, 255, 0.04)",
                boxShadow: `inset 0 0 0 1px ${M === "ready" ? "rgba(34, 197, 94, 0.4)" : M === "busy" ? "rgba(186, 158, 255, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                whiteSpace: "nowrap"
              },
              children: [
                /* @__PURE__ */ c.jsx(
                  "span",
                  {
                    className: vU,
                    "data-pulse": z ? "true" : "false",
                    "aria-hidden": "true",
                    style: {
                      width: "6px",
                      height: "6px",
                      borderRadius: "999px",
                      background: "currentColor",
                      boxShadow: M === "ready" ? `0 0 8px ${H}` : M === "busy" ? `0 0 8px ${W}` : "none",
                      flexShrink: 0
                    }
                  }
                ),
                I
              ]
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: wx, children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: yU,
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
                  color: N === "running" ? H : ie,
                  fontSize: "16px",
                  cursor: O ? "not-allowed" : "pointer",
                  opacity: O ? 0.6 : 1,
                  boxShadow: `inset 0 0 0 1px ${N === "running" ? "rgba(34, 197, 94, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                  transition: "background 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease"
                },
                children: R ? /* @__PURE__ */ c.jsx("span", { className: Sx, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: U })
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: jx, role: "tooltip", children: T })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: wx, children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: bU,
                "data-ready": ee ? "true" : "false",
                onClick: b,
                disabled: $,
                "aria-label": Y,
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  paddingInline: "18px",
                  height: "36px",
                  border: "none",
                  borderRadius: "999px",
                  background: $ ? "rgba(186, 158, 255, 0.18)" : `linear-gradient(180deg, ${W} 0%, ${G} 100%)`,
                  color: $ ? A : Q,
                  fontFamily: 'var(--font-ui, "Inter", system-ui, -apple-system, sans-serif)',
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  cursor: $ ? "not-allowed" : "pointer",
                  boxShadow: $ ? "none" : "0 6px 20px -6px rgba(132, 85, 239, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
                  transition: "transform 160ms ease, box-shadow 160ms ease, color 160ms ease",
                  whiteSpace: "nowrap"
                },
                children: [
                  f ? /* @__PURE__ */ c.jsx("span", { className: Sx, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { style: { fontSize: "11px" }, "aria-hidden": "true", children: "▶" }),
                  /* @__PURE__ */ c.jsx("span", { children: f ? "Running" : "Generate" })
                ]
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: jx, role: "tooltip", children: Y })
          ] })
        ]
      }
    ),
    document.body
  );
}
function NU(t) {
  const a = CU(t.deployment.displayName, t.deployment.deploymentId), s = yw(bw), i = t.canGenerate ?? !1;
  return /* @__PURE__ */ c.jsxs("div", { className: HR, children: [
    /* @__PURE__ */ c.jsxs("header", { className: FR, children: [
      /* @__PURE__ */ c.jsx("div", { className: GR, children: "EmotionTTS · Recipe Studio" }),
      /* @__PURE__ */ c.jsx("div", { className: PR, children: /* @__PURE__ */ c.jsx("h1", { className: YR, children: a }) }),
      /* @__PURE__ */ c.jsx("p", { className: KR, children: "Author the script, cast the voices, sculpt the emotion, and modulate every utterance — all from a single screen, with cache-bound previews and a non-destructive edit chain." }),
      t.hero
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
    /* @__PURE__ */ c.jsx(EU, { visible: s, canGenerate: i }),
    typeof document < "u" && Wh.createPortal(
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: i_,
          "data-visible": s ? "true" : "false",
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
function CU(t, a) {
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
  return /* @__PURE__ */ c.jsxs("section", { className: QR, "aria-labelledby": s, children: [
    /* @__PURE__ */ c.jsx("header", { className: ZR, children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: e_,
        "aria-expanded": !f,
        "aria-controls": y,
        onClick: () => m((p) => !p),
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
function TU(t) {
  try {
    const a = JSON.parse(t);
    return typeof a == "object" && a !== null ? a : {};
  } catch {
    return {};
  }
}
function RU(t) {
  const a = {};
  for (const s of Object.keys(t))
    s !== Dh && (a[s] = t[s]);
  return a;
}
function _U() {
  const { deployment: t, mappings: a, runs: s } = Rl(), [i, o] = g.useState(a), [u, f] = g.useState([]), [m, y] = g.useState([]), [p, b] = g.useState(null), [v, S] = g.useState(Kc), w = g.useMemo(
    () => t.defaultGenerationOverridesJson ? TU(t.defaultGenerationOverridesJson) : {},
    [t.defaultGenerationOverridesJson]
  ), j = g.useMemo(() => {
    const ue = w[Dh];
    return typeof ue == "object" && ue !== null ? ue : {};
  }, [w]), [C, _] = g.useState(""), [T, O] = g.useState(
    t.defaultOutputFormat ?? "mp3"
  ), [R, N] = g.useState(t.defaultSpeedFactor ?? 1), [$, Y] = g.useState({
    mode: "none",
    emotionAlpha: 1
  }), [ee, M] = g.useState(() => ({
    temperature: 0.8,
    top_p: 0.8,
    seed: 42,
    ...RU(w)
  })), [I, z] = g.useState(() => {
    const ue = j.cachePolicy;
    return ue === "use_cache" || ue === "force_regenerate" || ue === "read_only_cache" ? ue : "force_regenerate";
  }), [F, W] = g.useState(
    t.defaultVoiceAssetId ?? null
  ), [G, Q] = g.useState(() => {
    const ue = j.editorMode;
    return ue === "quick" || ue === "rows" || ue === "story" || ue === "storyboard" ? ue : typeof j.quickMode == "boolean" || t.defaultVoiceAssetId != null ? "quick" : "rows";
  }), ie = G === "quick", [A, H] = g.useState(() => [Kr()]), U = 1e5, [J, pe] = g.useState(() => {
    const ue = j.storyText;
    return typeof ue == "string" ? ue : "";
  }), k = g.useRef(!1), te = g.useCallback((ue) => {
    ue.length > U && !k.current && (k.current = !0, yn.error(
      `Story text is over ${Math.round(U / 1e3)} KB — large scripts may slow down save and rendering.`
    )), ue.length <= U && (k.current = !1), pe(ue);
  }, []), [ne, K] = g.useState(Pk), [B, ae] = g.useState([]), [ce, be] = g.useState([]), [Re, ot] = g.useState(
    () => /* @__PURE__ */ new Map()
  ), Ne = g.useRef(C), We = g.useRef(A), Be = g.useRef(J), Pe = g.useRef(m);
  g.useEffect(() => {
    Ne.current = C;
  }, [C]), g.useEffect(() => {
    We.current = A;
  }, [A]), g.useEffect(() => {
    Be.current = J;
  }, [J]), g.useEffect(() => {
    Pe.current = m;
  }, [m]);
  const [sn, qt] = g.useState(""), Mt = g.useCallback(
    (ue) => {
      Q((Me) => {
        if (ue === Me) return Me;
        const je = {
          script: Ne.current,
          rows: We.current,
          storyText: Be.current
        }, ge = bx(ue, je), Ge = bx(Me, je);
        if (!ge && Ge) {
          const q = oU(Me, ue, je, Pe.current);
          if (q) {
            const fe = { ...je }, De = document.activeElement;
            q.script !== void 0 && _(q.script), q.rows !== void 0 && H(q.rows), q.storyText !== void 0 && te(q.storyText);
            const _e = {
              quick: "Quick",
              rows: "Per-character",
              story: "Story",
              storyboard: "Storyboard"
            }, Ye = (Z) => Z.split(/\r?\n/).filter((ve) => ve.trim().length > 0).length, gt = q.rows !== void 0 ? q.rows.length : q.script !== void 0 ? Ye(q.script) : q.storyText !== void 0 ? Ye(q.storyText) : 0, xt = gt === 1 ? "line" : "lines", D = gt > 0 ? ` (${gt} ${xt})` : "", P = `Switched to ${_e[ue]} mode${gt > 0 ? `, ${gt} ${xt}` : ""}.`;
            qt((Z) => Z === P ? `${P}​` : P), mn(`Switched to ${_e[ue]}${D} — content kept`, {
              action: {
                label: "Undo",
                onClick: () => {
                  _(fe.script), H([...fe.rows]), te(fe.storyText), Q(Me), De && typeof De.focus == "function" && requestAnimationFrame(() => De.focus());
                }
              },
              duration: 5e3
            });
          }
        }
        return ue;
      });
    },
    [te]
  );
  g.useEffect(() => {
    let ue = !1;
    return Zs(t.deploymentId).then((Me) => {
      ue || f(Me.voiceAssets);
    }).catch(() => {
    }), jM(t.deploymentId).then((Me) => {
      ue || y(
        [...Me.presets].sort((je, ge) => ge.updatedAt - je.updatedAt)
      );
    }).catch(() => {
    }), () => {
      ue = !0;
    };
  }, [t.deploymentId]);
  const Ce = g.useRef(!0);
  g.useEffect(() => {
    if (Ce.current) {
      Ce.current = !1;
      return;
    }
    const ue = window.setTimeout(() => {
      const Me = {
        ...ee,
        [Dh]: {
          editorMode: G,
          quickMode: ie,
          cachePolicy: I,
          storyText: J
        }
      };
      Dt(`/deployments/${t.deploymentId}`, {
        method: "PATCH",
        body: JSON.stringify({
          defaultOutputFormat: T,
          defaultSpeedFactor: R,
          defaultGenerationOverrides: Me
        })
      }).catch(() => {
      });
    }, 600);
    return () => window.clearTimeout(ue);
  }, [
    t.deploymentId,
    T,
    R,
    I,
    G,
    ie,
    J,
    ee
  ]);
  const Ve = g.useMemo(() => G === "rows" ? Tw(A, m) : G === "story" ? J : C, [G, A, m, C, J]), dt = g.useMemo(() => uU(Ve), [Ve]), At = g.useMemo(() => {
    if (G !== "story") return fU(dt);
    const ue = /* @__PURE__ */ new Set(), Me = [];
    for (const je of Bc(J))
      je.kind === "character" && (ue.has(je.value) || (ue.add(je.value), Me.push(je.value)));
    return Me;
  }, [G, dt, J]), Xe = g.useMemo(() => {
    const ue = new Set(At.map((je) => je.toLowerCase())), Me = [...At];
    for (const je of i) {
      if (!je.isActive) continue;
      const ge = je.characterName.toLowerCase();
      ue.has(ge) || (ue.add(ge), Me.push(je.characterName));
    }
    return Me;
  }, [At, i]), at = g.useMemo(() => hU(Xe), [Xe]), bt = g.useMemo(() => mU(dt), [dt]), Se = g.useMemo(() => {
    const ue = /* @__PURE__ */ new Map();
    for (const Me of i)
      ue.set(Me.characterName.toLowerCase(), Me);
    return ue;
  }, [i]), $e = g.useMemo(() => ie && F ? 0 : Xe.filter((ue) => !Se.has(ue.toLowerCase())).length, [Xe, Se, ie, F]), Fe = g.useCallback(
    async (ue, Me) => {
      const je = Se.get(ue.toLowerCase());
      try {
        if (je) {
          const ge = await Ys(t.deploymentId, je.mappingId, Me);
          o(
            (Ge) => Ge.map((q) => q.mappingId === ge.mappingId ? ge : q)
          ), yn.success(`Updated mapping for ${je.characterName}`);
        } else if (Me.speakerVoiceAssetId) {
          const ge = await Zh(t.deploymentId, {
            ...Me,
            characterName: ue,
            speakerVoiceAssetId: Me.speakerVoiceAssetId
          });
          o((Ge) => [...Ge, ge]), yn.success(`Mapped ${ue} to voice`);
        }
      } catch (ge) {
        yn.error(ge instanceof Error ? ge.message : "mapping failed");
      }
    },
    [Se, t.deploymentId]
  ), rt = g.useCallback(
    async (ue, Me) => {
      const je = Me.trim(), ge = Se.get(ue.toLowerCase());
      if (!(!ge || !je || je === ge.characterName))
        try {
          const Ge = await Ys(t.deploymentId, ge.mappingId, {
            characterName: je
          });
          o(
            (q) => q.map((fe) => fe.mappingId === Ge.mappingId ? Ge : fe)
          ), yn.success(`Renamed character to ${je}`);
        } catch (Ge) {
          yn.error(Ge instanceof Error ? Ge.message : "rename failed");
        }
    },
    [Se, t.deploymentId]
  ), yt = g.useCallback(
    async (ue) => {
      const Me = Se.get(ue.toLowerCase());
      if (Me)
        try {
          await T1(t.deploymentId, Me.mappingId), o((je) => je.filter((ge) => ge.mappingId !== Me.mappingId)), yn.success(`Cleared mapping for ${ue}`);
        } catch (je) {
          yn.error(je instanceof Error ? je.message : "clear failed");
        }
    },
    [Se, t.deploymentId]
  ), Tt = g.useCallback(
    async (ue, Me) => {
      try {
        const je = await Tc(
          t.deploymentId,
          Me,
          Me.name.replace(/\.[^.]+$/, ""),
          "speaker"
        );
        f((ge) => [je, ...ge]), await Fe(ue, { speakerVoiceAssetId: je.voiceAssetId });
      } catch (je) {
        yn.error(je instanceof Error ? je.message : "upload failed");
      }
    },
    [t.deploymentId, Fe]
  ), kn = g.useCallback(
    (ue, Me) => {
      Fe(Me, { speakerVoiceAssetId: ue.voiceAssetId });
    },
    [Fe]
  ), Sn = g.useCallback((ue) => {
    S(ue);
  }, []), pn = g.useMemo(() => {
    const ue = [], Me = /* @__PURE__ */ new Set();
    for (const je of i) {
      const ge = je.speakerVoiceAssetId;
      if (!ge || Me.has(ge)) continue;
      Me.add(ge);
      const q = u.find((fe) => fe.voiceAssetId === ge)?.displayName ?? `${je.characterName} · ${ge.slice(0, 8)}`;
      ue.push({ kind: "voice_asset", id: ge, label: q });
    }
    for (const je of u)
      Me.has(je.voiceAssetId) || (Me.add(je.voiceAssetId), ue.push({ kind: "voice_asset", id: je.voiceAssetId, label: je.displayName }));
    return ue;
  }, [i, u]), Pt = g.useCallback(
    async (ue, Me) => {
      if (ue.kind !== "voice_asset") {
        yn.error("Targeted revert is only supported for voice assets in v1.");
        return;
      }
      let je;
      try {
        const ge = JSON.parse(Me);
        if (typeof ge != "object" || ge === null || ge.version !== 1 || !Array.isArray(ge.ops))
          throw new Error("snapshot is not a valid EditChain");
        je = ge;
      } catch (ge) {
        yn.error(
          ge instanceof Error ? `Audit snapshot is malformed: ${ge.message}` : "Audit snapshot is malformed; cannot revert."
        );
        return;
      }
      try {
        const ge = await M1(ue.id, t.deploymentId, {
          chain: je
        }), Ge = i.filter((q) => q.speakerVoiceAssetId === ue.id);
        await Promise.all(
          Ge.map(
            (q) => Ys(t.deploymentId, q.mappingId, {
              voiceAssetChainDigest: ge.chain_digest
            }).catch(() => null)
          )
        ), o(
          (q) => q.map(
            (fe) => fe.speakerVoiceAssetId === ue.id ? { ...fe, voiceAssetChainDigest: ge.chain_digest } : fe
          )
        ), yn.success(`Reverted ${ue.label} to a prior chain`);
      } catch (ge) {
        yn.error(ge instanceof Error ? ge.message : "revert failed");
      }
    },
    [t.deploymentId, i]
  ), zt = g.useCallback(
    async (ue) => {
      if (ue.kind !== "voice_asset") {
        yn.error("Revert is only supported for voice assets in v1.");
        return;
      }
      try {
        await BR(ue.id, t.deploymentId);
        const Me = i.filter((je) => je.speakerVoiceAssetId === ue.id);
        await Promise.all(
          Me.map(
            (je) => Ys(t.deploymentId, je.mappingId, {
              voiceAssetChainDigest: null
            }).catch(() => null)
          )
        ), o(
          (je) => je.map(
            (ge) => ge.speakerVoiceAssetId === ue.id ? { ...ge, voiceAssetChainDigest: null } : ge
          )
        ), yn.success(`Cleared edit chain on ${ue.label}`);
      } catch (Me) {
        yn.error(Me instanceof Error ? Me.message : "revert failed");
      }
    },
    [t.deploymentId, i]
  ), It = g.useMemo(
    () => ({
      script: Ve,
      parserMode: G === "quick" ? "raw_text" : G === "story" ? "story" : "dialogue",
      outputFormat: T,
      speedFactor: R,
      globalEmotion: { ...$, emotionAlpha: ne.intensity },
      generation: ee,
      cachePolicy: I,
      ...G === "storyboard" && B.length > 0 ? {
        prebuiltSegments: B.map(
          (ue) => ue.emotion ? { ...ue, emotion: { ...ue.emotion, emotionAlpha: ne.intensity } } : ue
        )
      } : {}
    }),
    [Ve, G, T, R, ne.intensity, $, ee, I, B]
  ), Dn = g.useMemo(
    () => lU({
      script: Ve,
      quickMode: ie,
      defaultVoiceAssetId: F,
      characters: Xe,
      unmappedCount: $e,
      globalEmotion: $,
      performance: ne
    }),
    [Ve, ie, F, Xe, $e, $, ne]
  ), zn = g.useMemo(
    () => Dn.filter((ue) => ue.id !== "performance").map((ue) => ({
      label: ue.label,
      status: ue.status === "ok" ? "ok" : ue.status === "warn" ? "warn" : "ok",
      detail: ue.detail
    })),
    [Dn]
  ), cn = G === "storyboard" && B.length > 0, wn = Ve.trim().length > 0 || cn;
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
        children: sn
      }
    ),
    /* @__PURE__ */ c.jsx(
      NU,
      {
        deployment: t,
        canGenerate: wn,
        hero: /* @__PURE__ */ c.jsx(h2, { deployment: t }),
        quickActions: /* @__PURE__ */ c.jsx(
          CL,
          {
            deploymentId: t.deploymentId,
            createPayload: It,
            canGenerate: wn,
            diagnostics: zn,
            storyboardJobs: G === "storyboard" ? ce : void 0,
            onJobProgressChange: ot
          }
        ),
        recentGenerations: /* @__PURE__ */ c.jsx(
          UO,
          {
            deploymentId: t.deploymentId,
            speedFactor: R
          }
        ),
        scriptSection: /* @__PURE__ */ c.jsx(
          iU,
          {
            editorMode: G,
            onEditorModeChange: Mt,
            deployment: t,
            script: C,
            onScriptChange: _,
            rows: A,
            onRowsChange: H,
            storyText: J,
            onStoryTextChange: te,
            storyCharacters: Xe,
            outputFormat: T,
            mappingsByLower: Se,
            defaultVoiceAssetId: F,
            onDefaultVoiceAssetIdChange: W,
            presets: m,
            voiceAssets: u,
            onQueueChange: ae,
            onStoryboardJobsChange: be,
            jobProgress: G === "storyboard" ? Re : void 0
          }
        ),
        parsedDialogueSection: /* @__PURE__ */ c.jsx(Lk, { lines: dt, characterColors: at }),
        voiceLibrarySection: /* @__PURE__ */ c.jsx(
          wM,
          {
            deploymentId: t.deploymentId,
            voiceAssets: u,
            mappings: i,
            characterColors: at,
            onVoiceAssetsChange: f,
            onCreateCharacterFromVoice: kn
          }
        ),
        castSection: /* @__PURE__ */ c.jsx(s2, { unmappedCount: $e, totalCount: Xe.length, children: Xe.map((ue) => {
          const Me = Se.get(ue.toLowerCase()) ?? null, je = at[ue] ?? "#ba9eff";
          return /* @__PURE__ */ c.jsx("li", { className: b_, children: /* @__PURE__ */ c.jsx(
            r2,
            {
              characterName: ue,
              color: je,
              lineCount: bt[ue] ?? 0,
              mapping: Me,
              voiceAssets: u,
              presets: m,
              active: p === ue,
              onToggle: () => b((ge) => ge === ue ? null : ue),
              onAssignVoiceAsset: (ge) => Fe(ue, { speakerVoiceAssetId: ge }),
              onAssignPreset: (ge) => Fe(ue, { defaultVectorPresetId: ge }),
              onUploadFile: (ge) => Tt(ue, ge),
              onClearMapping: () => yt(ue),
              onRename: (ge) => rt(ue, ge)
            }
          ) }, ue);
        }) }),
        emotionSection: /* @__PURE__ */ c.jsx(
          lk,
          {
            value: $,
            onChange: Y,
            deploymentId: t.deploymentId,
            presets: m,
            onPresetsChange: y
          }
        ),
        performanceSection: /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
          /* @__PURE__ */ c.jsx(
            Gk,
            {
              value: { ...ne, pace: R },
              onChange: (ue) => {
                K(ue), ue.pace !== R && N(ue.pace);
              }
            }
          ),
          /* @__PURE__ */ c.jsx(
            nm,
            {
              state: v,
              onChange: Sn,
              supportsSynthSpeed: !1
            }
          ),
          /* @__PURE__ */ c.jsx(a5, { checks: Dn }),
          /* @__PURE__ */ c.jsx(
            Ck,
            {
              outputFormat: T,
              onOutputFormatChange: O,
              speedFactor: R,
              onSpeedFactorChange: N,
              cachePolicy: I,
              onCachePolicyChange: z,
              generation: ee,
              onGenerationChange: M
            }
          )
        ] }),
        recentRunsSection: /* @__PURE__ */ c.jsx(u5, { runs: s, deploymentId: t.deploymentId }),
        auditSection: /* @__PURE__ */ c.jsx(
          BM,
          {
            deploymentId: t.deploymentId,
            targets: pn,
            onRevertToIdentity: zt,
            onRevertToChain: Pt
          }
        )
      }
    )
  ] });
}
const Ex = /* @__PURE__ */ new Map();
function MU(t, a) {
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
    return i({ peaks: null, isLoading: !0, error: null }), AU(t, a, f.signal).then((m) => {
      f.signal.aborted || (Ex.set(o, m), i({ peaks: m, isLoading: !1, error: null }));
    }).catch((m) => {
      if (f.signal.aborted) return;
      const y = m instanceof Error ? m.message : "decode failed";
      i({ peaks: null, isLoading: !1, error: y });
    }), () => f.abort();
  }, [t, a]), s;
}
async function AU(t, a, s) {
  const i = await fetch(t, { signal: s });
  if (!i.ok) throw new Error(`failed to load audio (${i.status})`);
  const o = await i.arrayBuffer();
  if (s.aborted) throw new DOMException("aborted", "AbortError");
  const f = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return kU(f, a);
}
function kU(t, a) {
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
function DU() {
  const [t, a] = g.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(Nx).matches);
  return g.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const s = window.matchMedia(Nx), i = (o) => a(o.matches);
    return s.addEventListener("change", i), () => s.removeEventListener("change", i);
  }, []), t;
}
var zU = "mquzal0", OU = "mquzal1", Cx = "mquzal2", Tx = "mquzal3", Rx = "mquzal4", LU = "mquzal5", _x = "mquzal6", Mx = "mquzal7";
const $U = 120, UU = 720;
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
    width: b = UU,
    height: v = $U
  } = t, S = g.useRef(null), w = g.useRef(null), j = g.useRef(null), C = MU(a, b), _ = DU();
  g.useEffect(() => {
    BU(S.current, C.peaks, b, v);
  }, [C.peaks, b, v]);
  const T = g.useCallback(
    (M) => {
      const I = w.current?.getBoundingClientRect();
      if (!I || I.width <= 0) return 0;
      const z = Math.max(0, Math.min(1, (M - I.left) / I.width));
      return Math.round(z * s);
    },
    [s]
  );
  g.useEffect(() => {
    const M = (z) => {
      if (!j.current) return;
      const F = T(z.clientX);
      j.current === "start" ? u(cc(F, 0, o - 1)) : f(cc(F, i + 1, s));
    }, I = () => {
      j.current = null;
    };
    return window.addEventListener("pointermove", M), window.addEventListener("pointerup", I), () => {
      window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", I);
    };
  }, [T, s, o, i, u, f]);
  const O = (M) => (I) => {
    I.preventDefault(), I.stopPropagation(), j.current = M;
  }, R = (M) => {
    !p || M.target.closest("[data-handle]") || p(T(M.clientX));
  }, N = (M) => (I) => {
    const z = I.shiftKey ? 100 : I.ctrlKey ? 1 : 10;
    let F = 0;
    if (I.key === "ArrowLeft") F = -z;
    else if (I.key === "ArrowRight") F = z;
    else return;
    I.preventDefault(), M === "start" ? u(cc(i + F, 0, o - 1)) : f(cc(o + F, i + 1, s));
  }, $ = Qf(i, s), Y = Qf(o, s), ee = Qf(y, s);
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: w,
      className: zU,
      style: { height: v },
      onPointerDown: R,
      children: [
        /* @__PURE__ */ c.jsx(
          "canvas",
          {
            ref: S,
            width: b,
            height: v,
            className: OU,
            "aria-label": "Audio waveform"
          }
        ),
        C.isLoading && /* @__PURE__ */ c.jsx("div", { className: Mx, children: "Decoding waveform…" }),
        C.error && /* @__PURE__ */ c.jsx("div", { className: Mx, role: "alert", children: C.error }),
        /* @__PURE__ */ c.jsx("div", { className: _x, style: { left: 0, width: `${$}%` } }),
        /* @__PURE__ */ c.jsx(
          "div",
          {
            className: _x,
            style: { left: `${Y}%`, right: 0, width: `${100 - Y}%` }
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: Cx,
            style: { left: `${$}%` },
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
              /* @__PURE__ */ c.jsx("span", { className: Tx, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: Rx, "aria-hidden": "true" })
            ]
          }
        ),
        m && /* @__PURE__ */ c.jsx(
          "div",
          {
            className: LU,
            style: {
              left: `${ee}%`,
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
function BU(t, a, s, i) {
  if (!t) return;
  const o = t.getContext("2d");
  if (!o || (o.clearRect(0, 0, s, i), !a || a.length === 0)) return;
  const u = i / 2;
  o.fillStyle = IU(t, "--color-primary", "#ba9eff");
  const f = Math.min(a.length, s);
  for (let m = 0; m < f; m += 1) {
    const y = a[m] ?? 0, p = Math.max(1, y * (i - 4));
    o.fillRect(m, u - p / 2, 1, p);
  }
}
function IU(t, a, s) {
  return getComputedStyle(t).getPropertyValue(a).trim() || s;
}
var VU = "r8lfsm0", qU = "r8lfsm1", HU = "r8lfsm2", FU = "r8lfsm3", PU = "r8lfsm4", GU = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, YU = "_1b1zchy3", KU = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, XU = "_1b1zchy6", QU = "_1b1zchy7";
const kw = g.createContext("standalone");
function Dw({
  variant: t = "standalone",
  children: a,
  className: s,
  style: i,
  ...o
}) {
  const u = [GU[t], s].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(kw.Provider, { value: t, children: /* @__PURE__ */ c.jsx("div", { className: u, style: i, ...o, children: a }) });
}
function zw({
  title: t,
  meta: a,
  children: s,
  className: i,
  titleId: o
}) {
  const u = g.useContext(kw), f = [YU, i].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsxs("div", { className: f, children: [
    /* @__PURE__ */ c.jsx("h3", { id: o, className: KU[u], children: t }),
    a ? /* @__PURE__ */ c.jsx("span", { className: XU, children: a }) : null,
    s
  ] });
}
function Ow({
  children: t,
  className: a,
  role: s = "group"
}) {
  const i = [QU, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: i, role: s, children: t });
}
const Ax = -16, ZU = 80, JU = 720;
function WU(t) {
  const { deploymentId: a, runId: s, utterance: i, audioUrl: o, onApplied: u, onError: f, onCancel: m } = t, y = i.durationMs ?? 0, [p, b] = g.useState(() => kx(y)), [v, S] = g.useState(Kc), [w, j] = g.useState(!1), [C, _] = g.useState(!1), [T, O] = g.useState(null), [R, N] = g.useState(!1), $ = g.useRef(null), Y = g.useRef(null), ee = g.useRef(null);
  g.useEffect(() => {
    const U = kx(y);
    b(U), S(F1(U)), _(!1), O(null), ee.current = null;
  }, [i.utteranceId, y]);
  const M = g.useCallback((U) => {
    S(U), b((J) => H1(J, U));
  }, []);
  g.useEffect(() => () => Y.current?.abort(), []), g.useEffect(() => {
    $.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [i.utteranceId]);
  const I = g.useCallback(
    (U) => {
      U.key === "Escape" && (U.stopPropagation(), m());
    },
    [m]
  ), z = g.useMemo(
    () => p.ops.find((U) => U.mode === "trim"),
    [p.ops]
  ), F = z?.start_ms ?? 0, W = z?.end_ms ?? Math.max(1, y), G = g.useCallback((U, J) => {
    b((pe) => eB(pe, "trim", (k) => ({
      ...k,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(U)),
      end_ms: Math.max(Math.floor(U) + 1, Math.floor(J))
    })));
  }, []), Q = g.useCallback((U) => G(U, W), [W, G]), ie = g.useCallback((U) => G(F, U), [F, G]), A = g.useCallback((U) => {
    _(U), b((J) => {
      const pe = J.ops.filter((k) => k.mode !== "normalize");
      if (U) {
        const k = {
          id: An(),
          mode: "normalize",
          target_lufs: Ax
        };
        return { ...J, ops: [...pe, k] };
      }
      return { ...J, ops: pe };
    });
  }, []), H = g.useCallback(async () => {
    const U = A1(p, y);
    if (U) {
      O(U.message);
      return;
    }
    if (O(null), R) return;
    Y.current?.abort();
    const J = new AbortController();
    Y.current = J, N(!0);
    try {
      const pe = ee.current ?? void 0, k = await UR(
        a,
        s,
        i.utteranceId,
        pe ? { chain: p, digest_before: pe } : { chain: p },
        { signal: J.signal }
      );
      if (J.signal.aborted) return;
      ee.current = k.chain_digest, u(k);
    } catch (pe) {
      if (J.signal.aborted) return;
      pe instanceof Js && (ee.current = pe.currentDigest || null);
      const k = pe instanceof Js ? "Edit chain has changed in another tab. Reload to continue." : pe instanceof Error ? pe.message : "apply failed";
      O(k), f(k);
    } finally {
      J.signal.aborted || N(!1);
    }
  }, [p, y, R, a, s, i.utteranceId, u, f]);
  return /* @__PURE__ */ c.jsx(Dw, { variant: "nested", children: /* @__PURE__ */ c.jsxs("div", { ref: $, onKeyDown: I, children: [
    /* @__PURE__ */ c.jsx(zw, { title: "Edit segment", meta: `Source · ${uc(y)}` }),
    /* @__PURE__ */ c.jsx(
      Aw,
      {
        audioUrl: o,
        durationMs: Math.max(1, y),
        startMs: F,
        endMs: W,
        onChangeStart: Q,
        onChangeEnd: ie,
        height: ZU,
        width: JU
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: VU, children: [
      /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ c.jsxs("span", { className: qU, children: [
        uc(F),
        " → ",
        uc(W),
        " · ",
        uc(W - F)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: HU, children: [
      /* @__PURE__ */ c.jsxs("label", { className: FU, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: C,
            onChange: (U) => A(U.currentTarget.checked),
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
          className: PU,
          onClick: () => j((U) => !U),
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
      /* @__PURE__ */ c.jsx(Ze, { size: "sm", onClick: () => void H(), disabled: R, children: R ? "Applying…" : "Apply" }),
      /* @__PURE__ */ c.jsx(Ze, { variant: "ghost", size: "sm", onClick: m, disabled: R, children: "Cancel" })
    ] }),
    T && /* @__PURE__ */ c.jsx(Fn, { severity: "error", children: T })
  ] }) });
}
function kx(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: An(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function eB(t, a, s) {
  const i = t.ops.findIndex((u) => u.mode === a);
  if (i === -1) {
    const u = { id: An(), mode: a };
    return { ...t, ops: [...t.ops, s(u)] };
  }
  const o = [...t.ops];
  return o[i] = s(o[i]), { ...t, ops: o };
}
function uc(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
var tB = "jq2zyb2", nB = "jq2zyb3", aB = "jq2zyb4", rB = "jq2zyb5", sB = "jq2zyb6", iB = "jq2zyb7", lB = "jq2zyb8", oB = "jq2zyb9", cB = "jq2zyba", uB = "jq2zybb", dB = "jq2zybc", fB = "jq2zybd", hB = "jq2zybe", mB = "jq2zybf jq2zybe", pB = "jq2zybg", gB = "jq2zybh", vB = "jq2zybi", yB = "jq2zybj", bB = "jq2zybk", xB = "jq2zybl", SB = "jq2zybm", wB = "jq2zybn", jB = "jq2zybo", EB = "jq2zybp", NB = "jq2zybq", CB = "jq2zybr", TB = "jq2zybs", RB = "jq2zybt", _B = "jq2zybu", MB = "jq2zybv", AB = "jq2zybw", kB = "jq2zybx", DB = "jq2zyby", Dx = "jq2zybz", zB = "jq2zyb10", OB = "jq2zyb11", LB = "jq2zyb12";
const $B = ["cancelled", "failed", "partial"], UB = 2600;
function BB() {
  const { run: t } = Rl(), a = ni(), [s, i] = g.useState(t), [o, u] = g.useState(!1), [f, m] = g.useState(null), [y, p] = g.useState(null), [b, v] = g.useState(
    null
  );
  g.useEffect(() => {
    i(t);
  }, [t]), g.useEffect(() => {
    if (!b) return;
    const N = setTimeout(() => v(null), UB);
    return () => clearTimeout(N);
  }, [b]);
  const S = g.useMemo(() => qB(s), [s]), w = $B.includes(s.status) && s.kind === "batch", j = (s.exportZipStaleAt ?? null) !== null, C = async () => {
    if (s.deploymentId) {
      u(!0), m(null);
      try {
        const { runId: N } = await _1(s.deploymentId, s.runId);
        a(`/${s.deploymentId}/runs/${N}`);
      } catch (N) {
        m(PB(N));
      } finally {
        u(!1);
      }
    }
  }, _ = g.useCallback((N) => {
    p(($) => $ === N ? null : N);
  }, []), T = g.useCallback(() => {
    p(null);
  }, []), O = (N, $) => {
    i((Y) => VB(Y, N, $)), p(null), v({ message: "Segment edited", severity: "success" });
  }, R = g.useCallback((N) => {
    v({ message: N, severity: "error" });
  }, []);
  return /* @__PURE__ */ c.jsxs("main", { className: tB, children: [
    /* @__PURE__ */ c.jsxs("div", { className: nB, children: [
      /* @__PURE__ */ c.jsxs("header", { className: aB, children: [
        /* @__PURE__ */ c.jsxs("p", { className: rB, children: [
          s.deploymentId ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            /* @__PURE__ */ c.jsx(Qh, { to: `/${s.deploymentId}/recipe`, className: sB, children: "← Back to recipe" }),
            /* @__PURE__ */ c.jsx("span", { className: iB, children: "·" })
          ] }) : null,
          /* @__PURE__ */ c.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: lB, children: [
          /* @__PURE__ */ c.jsxs("h1", { className: oB, children: [
            HB(s.kind),
            /* @__PURE__ */ c.jsx("span", { className: cB, children: s.runId })
          ] }),
          /* @__PURE__ */ c.jsx(Er, { size: "md", tone: GB(s.status), pulse: s.status === "running", children: s.status })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("section", { className: uB, "aria-label": "Run statistics", children: [
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
      w && /* @__PURE__ */ c.jsxs("section", { className: gB, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ c.jsxs("div", { className: vB, children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-resume-title", className: yB, children: S.failed > 0 ? `${S.failed} line${S.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ c.jsx("p", { className: bB, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ c.jsx(Ze, { size: "lg", disabled: o, onClick: () => void C(), children: o ? "Resuming…" : S.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        f && /* @__PURE__ */ c.jsx("p", { className: xB, role: "alert", children: f })
      ] }),
      /* @__PURE__ */ c.jsxs(Ia, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ c.jsxs(FT, { children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-utterances", className: Jr, children: "01 / Utterances" }),
          S.completed > 0 && /* @__PURE__ */ c.jsxs("span", { className: SB, children: [
            /* @__PURE__ */ c.jsx("span", { className: wB, children: S.cached }),
            "/",
            S.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("ul", { className: jB, children: s.utterances.map((N) => {
          const $ = y === N.utteranceId, Y = N.status === "completed" && N.audioArtifactRef !== null && N.audioArtifactRef !== void 0, ee = N.derivedArtifactRef ?? N.audioArtifactRef ?? null, M = ee ? `/api/v1/artifacts/${encodeURIComponent(ee)}/download` : "", I = (N.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ c.jsxs("li", { className: NB, children: [
            /* @__PURE__ */ c.jsxs("div", { className: EB, children: [
              /* @__PURE__ */ c.jsxs("span", { className: TB, children: [
                "#",
                N.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: RB, title: N.characterDisplay, children: N.characterDisplay }),
              /* @__PURE__ */ c.jsx("span", { className: _B, title: N.text, children: N.text }),
              /* @__PURE__ */ c.jsxs("span", { className: MB, children: [
                N.cacheHit && /* @__PURE__ */ c.jsx("span", { className: AB, children: "cached" }),
                I && /* @__PURE__ */ c.jsx("span", { className: CB, children: "edited" }),
                N.durationMs ? /* @__PURE__ */ c.jsx("span", { children: FB(N.durationMs) }) : null,
                /* @__PURE__ */ c.jsx(Er, { tone: YB(N.status), children: N.status }),
                Y && /* @__PURE__ */ c.jsx(
                  Ze,
                  {
                    variant: "ghost",
                    size: "xs",
                    onClick: () => _(N.utteranceId),
                    "aria-expanded": $,
                    "aria-label": $ ? "Close segment editor" : "Edit segment",
                    children: $ ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            $ && M && s.deploymentId && /* @__PURE__ */ c.jsx(
              WU,
              {
                deploymentId: s.deploymentId,
                runId: s.runId,
                utterance: N,
                audioUrl: M,
                onApplied: (z) => O(N.utteranceId, z),
                onError: R,
                onCancel: T
              }
            )
          ] }, N.utteranceId);
        }) })
      ] }),
      IB(s, j)
    ] }),
    b && /* @__PURE__ */ c.jsx(
      "div",
      {
        className: LB,
        role: b.severity === "error" ? "alert" : "status",
        "aria-live": b.severity === "error" ? "assertive" : "polite",
        children: b.message
      }
    )
  ] });
}
function IB(t, a) {
  if (!t.exportArtifactRef && !a) return null;
  const i = !!t.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ c.jsx("div", { className: kB, children: a ? /* @__PURE__ */ c.jsxs("div", { className: zB, children: [
    /* @__PURE__ */ c.jsx("p", { className: OB, children: i }),
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
      className: DB,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ c.jsx("span", { className: Dx, children: "↓" })
      ]
    }
  ) : null });
}
function VB(t, a, s) {
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
      className: dB,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: fB, children: t }),
        /* @__PURE__ */ c.jsx("span", { className: s ? mB : hB, children: a }),
        o !== void 0 && /* @__PURE__ */ c.jsx("span", { className: pB, "aria-hidden": "true" })
      ]
    }
  );
}
function qB(t) {
  const a = t.utterances.length, s = t.utterances.filter((f) => f.status === "completed").length, i = t.utterances.filter(
    (f) => f.status === "failed" || f.status === "cancelled"
  ).length, o = t.utterances.filter((f) => f.cacheHit).length, u = s > 0 ? Math.round(o / s * 100) : 0;
  return { total: a, completed: s, failed: i, cached: o, cacheRatio: u };
}
function HB(t) {
  switch (t) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function FB(t) {
  return t < 1e3 ? `${t} ms` : `${(t / 1e3).toFixed(t < 1e4 ? 2 : 1)} s`;
}
function PB(t) {
  return t instanceof ai ? `${t.category}: ${t.message}` : t instanceof Error ? t.message : "Unexpected error";
}
function GB(t) {
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
function YB(t) {
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
var KB = "pcphqj2", XB = "pcphqj3", QB = "pcphqj4", ZB = "pcphqj5", JB = "pcphqj6", WB = "pcphqj7", e9 = "pcphqj8", t9 = "pcphqj9", n9 = "pcphqja", zx = "pcphqjb", a9 = "pcphqjc", r9 = "pcphqjd", s9 = "pcphqje pcphqjd", i9 = "pcphqjf", l9 = "pcphqjg", o9 = "pcphqjh", c9 = "pcphqji", u9 = "pcphqjj pcphqji", d9 = "pcphqjk pcphqji", f9 = "pcphqjl pcphqji", h9 = "pcphqjm", Zf = "pcphqjn", Jf = "pcphqjo";
function m9() {
  const [t, a] = g.useState(null), [s, i] = g.useState(null);
  return g.useEffect(() => {
    let o = !1;
    const u = async () => {
      try {
        const m = await Dt("/runtime/queue");
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
  }, []), /* @__PURE__ */ c.jsx("main", { className: KB, children: /* @__PURE__ */ c.jsxs("div", { className: XB, children: [
    /* @__PURE__ */ c.jsxs("header", { className: QB, children: [
      /* @__PURE__ */ c.jsx("p", { className: ZB, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ c.jsxs("div", { className: JB, children: [
        /* @__PURE__ */ c.jsx("h1", { className: WB, children: "Queue" }),
        /* @__PURE__ */ c.jsx("span", { className: e9, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: t9, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    s ? /* @__PURE__ */ c.jsx(Fn, { severity: "error", children: s }) : t === null ? null : t.length === 0 ? /* @__PURE__ */ c.jsx(Ia, { density: "compact", children: /* @__PURE__ */ c.jsx(Gc, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ c.jsxs(Ia, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ c.jsx("h2", { id: "runtime-queue-section", className: Jr, children: "01 / In flight" }),
      /* @__PURE__ */ c.jsx("ul", { className: n9, children: t.map((o) => {
        const u = o.position === 1;
        return /* @__PURE__ */ c.jsxs(
          "li",
          {
            className: u ? `${zx} ${a9}` : zx,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: u ? s9 : r9, children: o.position }),
              /* @__PURE__ */ c.jsxs("span", { className: i9, children: [
                /* @__PURE__ */ c.jsx("span", { className: l9, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ c.jsx("span", { className: o9, children: o.runId })
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: p9(o.kind), children: g9(o.kind) }),
              /* @__PURE__ */ c.jsx("span", { className: h9, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Zf, children: v9(o.etaSeconds) }),
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
function p9(t) {
  switch (t) {
    case "batch":
      return u9;
    case "test_line":
      return d9;
    case "resume":
      return f9;
    default:
      return c9;
  }
}
function g9(t) {
  switch (t) {
    case "test_line":
      return "test line";
    default:
      return t;
  }
}
function v9(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60), s = t % 60;
  return s === 0 ? `${a}m` : `${a}m ${s}s`;
}
function y9() {
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
      v && /* @__PURE__ */ c.jsx(Fn, { severity: "error", children: v })
    ] })
  ] });
}
var b9 = "_1oor31e0", x9 = "_1oor31e1", S9 = "_1oor31e2", w9 = "_1oor31e3", j9 = "_1oor31e4", E9 = "_1oor31e5", N9 = "_1oor31e6", C9 = "_1oor31e7", T9 = "_1oor31e8";
const R9 = 8;
function _9(t) {
  const { entries: a, loading: s, error: i } = t;
  return /* @__PURE__ */ c.jsxs("div", { className: b9, "aria-busy": !!s, children: [
    i && /* @__PURE__ */ c.jsx(Fn, { severity: "error", children: i }),
    s && !i && /* @__PURE__ */ c.jsx("div", { className: T9, "aria-live": "polite", children: "Loading edit history…" }),
    !s && !i && a.length === 0 && /* @__PURE__ */ c.jsx("div", { className: C9, children: "No edits yet" }),
    !s && !i && a.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: x9, children: a.map((o) => /* @__PURE__ */ c.jsxs("li", { className: S9, children: [
      /* @__PURE__ */ c.jsx("span", { className: w9, children: A9(o.recorded_at) }),
      /* @__PURE__ */ c.jsx("span", { className: j9, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ c.jsx("span", { className: E9, title: o.digest_after, children: M9(o.digest_after) }),
      /* @__PURE__ */ c.jsx("span", { className: N9, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function M9(t) {
  return t ? `${t.slice(0, R9)}…` : "—";
}
function A9(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var Ox = "_1c63kaw0", k9 = "_1c63kaw1", D9 = "_1c63kaw2", z9 = "_1c63kaw3", O9 = "_1c63kaw4", L9 = "_1c63kaw5", $9 = "_1c63kaw6";
function U9({ chain: t, onRemoveOp: a }) {
  return t.ops.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: Ox, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ c.jsx("span", { className: k9, children: "No edits yet" }) }) : /* @__PURE__ */ c.jsx("ol", { className: Ox, "data-testid": "edit-chain-list", children: t.ops.map((s, i) => /* @__PURE__ */ c.jsxs("li", { className: D9, children: [
    /* @__PURE__ */ c.jsxs("span", { className: z9, "aria-hidden": "true", children: [
      i + 1,
      "."
    ] }),
    /* @__PURE__ */ c.jsxs("span", { className: O9, children: [
      /* @__PURE__ */ c.jsx("span", { className: L9, children: Lx(s) }),
      /* @__PURE__ */ c.jsx("span", { className: $9, children: B9(s) })
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
function B9(t) {
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
var fc = "_1o3ytop0", eh = "_1o3ytop1", Ux = "_1o3ytop2", I9 = "_1o3ytop3", V9 = "_1o3ytop4", q9 = "_1o3ytop5", H9 = "_1o3ytop6", F9 = "_1o3ytop7", hc = "_1o3ytop8", P9 = "_1o3ytop9", G9 = "_1o3ytopf", Y9 = "_1o3ytopg", K9 = "_1o3ytoph", X9 = "_1o3ytopi", Q9 = "_1o3ytopj", Z9 = "_1o3ytopk", J9 = "_1t0zy2f0", W9 = "_1t0zy2f1", e7 = "_1t0zy2f2";
function t7({ content: t, children: a, delayMs: s = 350 }) {
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
  return /* @__PURE__ */ c.jsxs("span", { className: J9, children: [
    g.cloneElement(a, b),
    i && /* @__PURE__ */ c.jsx("span", { role: "tooltip", id: u, className: e7, children: t })
  ] });
}
function mc({ label: t, content: a }) {
  return /* @__PURE__ */ c.jsx(t7, { content: a, children: /* @__PURE__ */ c.jsx("button", { type: "button", "aria-label": `What is ${t}?`, className: W9, children: "?" }) });
}
const Bx = -16;
function n7(t) {
  const {
    voiceAsset: a,
    deploymentId: s,
    affectedCharacterNames: i = [],
    onChainPersisted: o,
    onError: u
  } = t, f = a.durationMs ?? 0, m = g.useMemo(
    () => a7(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [y, p] = g.useState(() => th(f)), [b, v] = g.useState(Kc), [S, w] = g.useState(!1), [j, C] = g.useState(null), [_, T] = g.useState(null), [O, R] = g.useState(!1), [N, $] = g.useState(!1), [Y, ee] = g.useState(!1), [M, I] = g.useState(null), [z, F] = g.useState([]), [W, G] = g.useState(null), [Q, ie] = g.useState([]), [A, H] = g.useState(!1), [U, J] = g.useState(null), [pe, k] = g.useState(0), te = g.useRef(null), ne = g.useRef(null), K = g.useRef(null), B = g.useRef(null), ae = g.useRef(null), ce = g.useRef(0), be = g.useMemo(
    () => y.ops.some((Se) => Se.mode === "normalize"),
    [y.ops]
  );
  g.useEffect(() => {
    const Se = th(f);
    p(Se), v(F1(Se)), C(null), ee(!1), F([]), G(null), ae.current = null;
  }, [a.voiceAssetId, f]);
  const Re = g.useCallback((Se) => {
    v(Se), p(($e) => H1($e, Se));
  }, []);
  g.useEffect(() => {
    B.current?.abort();
    const Se = new AbortController();
    return B.current = Se, H(!0), J(null), bc(s, "voice_asset", a.voiceAssetId, 50, {
      signal: Se.signal
    }).then(($e) => {
      Se.signal.aborted || ie($e.entries);
    }).catch(($e) => {
      if (Se.signal.aborted) return;
      const Fe = $e instanceof Error ? $e.message : "audit fetch failed";
      J(Fe);
    }).finally(() => {
      Se.signal.aborted || H(!1);
    }), () => Se.abort();
  }, [s, a.voiceAssetId, pe]), g.useEffect(() => () => {
    _ && URL.revokeObjectURL(_);
  }, [_]), g.useEffect(() => () => {
    ne.current?.abort(), K.current?.abort(), B.current?.abort();
  }, []);
  const ot = y.ops.find((Se) => Se.mode === "trim"), Ne = y.ops.find((Se) => Se.mode === "normalize"), We = ot?.start_ms ?? 0, Be = ot?.end_ms ?? Math.max(1, f), Pe = g.useCallback((Se, $e) => {
    p(
      (Fe) => Ix(
        Fe,
        "trim",
        (rt) => ({
          ...rt,
          mode: "trim",
          start_ms: Math.max(0, Math.floor(Se)),
          end_ms: Math.max(Math.floor(Se) + 1, Math.floor($e))
        })
      )
    );
  }, []), sn = g.useCallback(
    (Se) => Pe(Se, Be),
    [Be, Pe]
  ), qt = g.useCallback(
    (Se) => Pe(We, Se),
    [We, Pe]
  ), Mt = g.useCallback((Se) => {
    p(($e) => {
      const Fe = $e.ops.filter((rt) => rt.mode !== "normalize");
      if (Se) {
        const rt = {
          id: An(),
          mode: "normalize",
          target_lufs: Bx
        };
        return { ...$e, ops: [...Fe, rt] };
      }
      return { ...$e, ops: Fe };
    });
  }, []), Ce = g.useCallback(
    (Se) => {
      const $e = y.ops.findIndex((yt) => yt.id === Se);
      if ($e === -1) return;
      const Fe = y.ops[$e];
      if (!Fe) return;
      const rt = [...y.ops.slice(0, $e), ...y.ops.slice($e + 1)];
      p({ ...y, ops: rt }), F((yt) => [...yt, { op: Fe, index: $e }]);
    },
    [y]
  ), Ve = g.useCallback(() => {
    const Se = z[z.length - 1];
    if (!Se) return;
    const $e = Math.min(Se.index, y.ops.length), Fe = [...y.ops.slice(0, $e), Se.op, ...y.ops.slice($e)];
    p({ ...y, ops: Fe }), F(z.slice(0, -1));
  }, [y, z]), dt = g.useCallback(() => {
    const Se = A1(y, f);
    return Se ? (C(Se.message), !1) : (C(null), !0);
  }, [y, f]), At = g.useCallback(async () => {
    if (!dt() || O) return;
    ne.current?.abort();
    const Se = new AbortController();
    ne.current = Se;
    const $e = ++ce.current;
    $(!0);
    try {
      const Fe = await IR(a.voiceAssetId, s, y, {
        signal: Se.signal
      });
      if (Se.signal.aborted || $e !== ce.current) return;
      _ && URL.revokeObjectURL(_);
      const rt = URL.createObjectURL(Fe);
      T(rt), ee(!0), requestAnimationFrame(() => te.current?.play().catch(() => {
      }));
    } catch (Fe) {
      if (Se.signal.aborted) return;
      const rt = Fe instanceof Error ? Fe.message : "preview failed";
      C(rt), u(rt);
    } finally {
      Se.signal.aborted || $(!1);
    }
  }, [dt, O, a.voiceAssetId, s, y, _, u]), Xe = g.useCallback(async () => {
    if (!dt() || N || O) return;
    if (i.length > 1) {
      const $e = i.join(", ");
      if (!window.confirm(
        `This voice asset is referenced by ${i.length} characters: ${$e}.

Applying this edit chain will affect every line they speak in the next batch.

Continue?`
      )) return;
    }
    ne.current?.abort(), K.current?.abort();
    const Se = new AbortController();
    K.current = Se, R(!0);
    try {
      const $e = ae.current ?? void 0, Fe = await M1(
        a.voiceAssetId,
        s,
        $e ? { chain: y, digest_before: $e } : { chain: y },
        { signal: Se.signal }
      );
      if (Se.signal.aborted) return;
      ae.current = Fe.chain_digest, G(Fe.chain_digest), C(null), I(Fe.measured_lufs ?? null), F([]), o(Fe), k((rt) => rt + 1);
    } catch ($e) {
      if (Se.signal.aborted) return;
      const Fe = $e instanceof Js;
      $e instanceof Js && (ae.current = $e.currentDigest || null);
      const rt = Fe ? "Edit chain has changed in another tab. Reload to continue." : $e instanceof Error ? $e.message : "apply failed";
      C(rt), u(rt);
    } finally {
      Se.signal.aborted || R(!1);
    }
  }, [
    dt,
    N,
    O,
    i,
    a.voiceAssetId,
    s,
    y,
    o,
    u
  ]), at = g.useCallback(() => {
    ne.current?.abort(), p(th(f)), C(null), I(null), ee(!1), F([]), k((Se) => Se + 1), _ && (URL.revokeObjectURL(_), T(null));
  }, [f, _]), bt = g.useCallback((Se) => {
    p(
      ($e) => Ix(
        $e,
        "normalize",
        (Fe) => ({
          ...Fe,
          mode: "normalize",
          target_lufs: Se
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
        onChangeStart: sn,
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
    /* @__PURE__ */ c.jsxs("div", { className: F9, children: [
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
          be && Ne && /* @__PURE__ */ c.jsxs("span", { className: G9, children: [
            "target ",
            Ne.target_lufs.toFixed(1),
            " LUFS",
            M !== null && ` · measured ${M.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: P9, children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "checkbox",
              checked: be,
              onChange: (Se) => Mt(Se.currentTarget.checked),
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
            className: K9,
            min: -30,
            max: -6,
            step: 0.5,
            value: Ne.target_lufs,
            onChange: (Se) => bt(Number(Se.currentTarget.value)),
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
        /* @__PURE__ */ c.jsx(U9, { chain: y, onRemoveOp: Ce })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: hc, children: [
        /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: I9,
            onClick: () => w((Se) => !Se),
            "aria-expanded": S,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: V9, "aria-hidden": "true", children: S ? "▾" : "▸" }),
              /* @__PURE__ */ c.jsx("span", { children: "Advanced effects" }),
              /* @__PURE__ */ c.jsx("span", { className: q9, children: "gain · EQ · pitch · fade · silence trim" }),
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
            onChange: Re,
            supportsSynthSpeed: !1
          }
        )
      ] }),
      W && /* @__PURE__ */ c.jsx("div", { className: hc, children: /* @__PURE__ */ c.jsxs("span", { className: fc, children: [
        /* @__PURE__ */ c.jsx("span", { children: "Chain digest" }),
        /* @__PURE__ */ c.jsxs("span", { className: H9, title: W, children: [
          W.slice(0, 12),
          "…"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ c.jsxs(Ow, { children: [
      /* @__PURE__ */ c.jsx(
        Ze,
        {
          variant: "secondary",
          onClick: () => void At(),
          disabled: N || O,
          children: N ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Ze,
        {
          onClick: () => void Xe(),
          disabled: O || N,
          children: O ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Ze,
        {
          variant: "ghost",
          onClick: at,
          disabled: O || N,
          children: "Reset"
        }
      ),
      z.length > 0 && /* @__PURE__ */ c.jsxs(
        Ze,
        {
          variant: "ghost",
          size: "sm",
          onClick: Ve,
          disabled: O || N,
          "data-testid": "undo-last-removal",
          "aria-label": "Undo last removal",
          children: [
            "Undo last removal (",
            z.length,
            ")"
          ]
        }
      ),
      Y && /* @__PURE__ */ c.jsx(
        "span",
        {
          className: Z9,
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
        ref: te,
        src: _,
        controls: !0,
        className: Y9,
        "aria-label": "Edit preview"
      }
    ),
    j && /* @__PURE__ */ c.jsx(Fn, { severity: "error", children: j }),
    /* @__PURE__ */ c.jsxs("details", { className: X9, children: [
      /* @__PURE__ */ c.jsxs("summary", { className: Q9, children: [
        "Edit history",
        Q.length > 0 ? ` · ${Q.length}` : ""
      ] }),
      /* @__PURE__ */ c.jsx(
        _9,
        {
          entries: Q,
          loading: A,
          error: U
        }
      )
    ] })
  ] });
}
function th(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: An(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function Ix(t, a, s) {
  const i = t.ops.findIndex((u) => u.mode === a);
  if (i === -1) {
    const u = { id: An(), mode: a };
    return { ...t, ops: [...t.ops, s(u)] };
  }
  const o = [...t.ops];
  return o[i] = s(o[i]), { ...t, ops: o };
}
function pc(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
function a7(t) {
  return t.startsWith("http://") || t.startsWith("https://") || t.startsWith("/") ? t : `/api/v1/artifacts/${encodeURIComponent(t)}`;
}
var r7 = "go9vi12", s7 = "go9vi13", i7 = "go9vi14", l7 = "go9vi15", o7 = "go9vi16", c7 = "go9vi17", u7 = "go9vi18", d7 = "go9vi19", f7 = "go9vi1a", h7 = "go9vi1b go9vi1a", m7 = "go9vi1c", p7 = "go9vi1d", g7 = "go9vi1e", v7 = "go9vi1f", y7 = "go9vi1g", b7 = "go9vi1h", x7 = "go9vi1i", S7 = "go9vi1j", Vx = "go9vi1k", w7 = "go9vi1l", j7 = "go9vi1m", E7 = "go9vi1n", Ic = "go9vi1o", N7 = "go9vi1q", C7 = "go9vi1r go9vi1q", T7 = "go9vi1s go9vi1q", R7 = "go9vi1t", _7 = "go9vi1u", M7 = "go9vi1v", A7 = "go9vi1w", Lw = "go9vi1x", k7 = "go9vi1y", D7 = "go9vi1z", z7 = "go9vi110 go9vi1o", O7 = "go9vi111", L7 = "go9vi112", $7 = "go9vi113", U7 = "go9vi114", B7 = "go9vi115", I7 = "go9vi116";
function V7() {
  const { deployment: t, mappings: a, voiceAssets: s } = Rl(), i = ni(), [o, u] = g.useState(a), [f, m] = g.useState(s), [y, p] = g.useState(
    a[0]?.mappingId ?? null
  ), [b, v] = g.useState(""), [S, w] = g.useState(null), [j, C] = g.useState(null), [_, T] = g.useState(null), [O, R] = g.useState(null), [N, $] = g.useState(0), Y = g.useCallback(() => {
    i(`/${t.deploymentId}/recipe`);
  }, [i, t.deploymentId]), ee = g.useCallback((K) => {
    R(K), window.setTimeout(() => {
      R((B) => B === K ? null : B);
    }, 1600);
  }, []), M = g.useMemo(() => {
    const K = /* @__PURE__ */ new Map();
    for (const B of f) K.set(B.voiceAssetId, B);
    return K;
  }, [f]), I = g.useMemo(() => {
    const K = b.trim().toLowerCase();
    return K ? o.filter((B) => B.characterName.toLowerCase().includes(K)) : o;
  }, [o, b]), z = g.useMemo(
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
  }, [t.deploymentId]), W = g.useCallback(
    (K) => {
      u(
        (B) => B.map((ae) => ae.mappingId === y ? { ...ae, ...K } : ae)
      );
    },
    [y]
  ), G = g.useCallback(
    async (K) => {
      if (!z) return;
      const B = z;
      try {
        const ae = await Ys(t.deploymentId, z.mappingId, K);
        u((ce) => ce.map((be) => be.mappingId === ae.mappingId ? ae : be)), Object.prototype.hasOwnProperty.call(K, "characterName") && ee(ae.mappingId);
      } catch (ae) {
        u(
          (ce) => ce.map((be) => be.mappingId === B.mappingId ? B : be)
        ), w(vr(ae));
      }
    },
    [z, t.deploymentId, ee]
  ), Q = g.useCallback(async () => {
    const K = f[0];
    if (!K) {
      w("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const B = K7(o), ae = await Zh(t.deploymentId, {
        characterName: B,
        speakerVoiceAssetId: K.voiceAssetId
      });
      u((ce) => [...ce, ae]), p(ae.mappingId), $((ce) => ce + 1);
    } catch (B) {
      w(vr(B));
    }
  }, [t.deploymentId, f, o]), ie = g.useCallback(() => {
    z && T({ id: z.mappingId, name: z.characterName });
  }, [z]), A = g.useCallback(async () => {
    if (!_) return;
    const { id: K, name: B } = _;
    T(null);
    try {
      await T1(t.deploymentId, K), u((ae) => ae.filter((ce) => ce.mappingId !== K)), p(null), C(`Mapping for ${B} deactivated.`);
    } catch (ae) {
      w(vr(ae));
    }
  }, [t.deploymentId, _]), H = g.useCallback(
    async (K, B, ae) => {
      try {
        const ce = await Tc(t.deploymentId, K, B, ae);
        return m((be) => [ce, ...be]), C(`${ce.displayName} uploaded.`), ce;
      } catch (ce) {
        return w(vr(ce)), null;
      }
    },
    [t.deploymentId]
  ), U = g.useCallback(async () => {
    try {
      const K = await ET(t.deploymentId);
      W7(K, `${t.deploymentId}-mappings.json`), C("Mappings exported to JSON.");
    } catch (K) {
      w(vr(K));
    }
  }, [t.deploymentId]), J = g.useCallback(
    async (K, B) => {
      try {
        const ae = await NT(
          t.deploymentId,
          K.mappings,
          B
        );
        C(
          `Imported ${ae.created.length} • skipped ${ae.skipped.length} • replaced ${ae.replaced.length}.`
        );
        const ce = await Zs(t.deploymentId);
        m(ce.voiceAssets);
      } catch (ae) {
        w(vr(ae));
      }
    },
    [t.deploymentId]
  ), pe = g.useCallback(
    async (K) => {
      if (await F(), z && K.chain_digest)
        try {
          const B = await Ys(t.deploymentId, z.mappingId, {
            voiceAssetChainDigest: K.chain_digest
          });
          u(
            (ae) => ae.map((ce) => ce.mappingId === B.mappingId ? B : ce)
          );
        } catch (B) {
          w(vr(B));
        }
      C("Edit applied.");
    },
    [F, z, t.deploymentId]
  ), k = g.useCallback((K) => {
    w(K);
  }, []), te = g.useCallback(
    async (K, B) => {
      if (!z) return null;
      const ae = K.trim() || `[${z.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await kT(t.deploymentId, {
          line: ae,
          outputFormat: B
        })).runId };
      } catch (ce) {
        return w(vr(ce)), null;
      }
    },
    [t.deploymentId, z]
  ), ne = f.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ c.jsxs("div", { className: r7, children: [
    /* @__PURE__ */ c.jsxs("aside", { className: s7, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: i7,
          onClick: Y,
          children: "← Back to recipe"
        }
      ),
      /* @__PURE__ */ c.jsxs("header", { className: l7, children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("h1", { id: "mapping-sidebar-heading", className: o7, children: "Cast" }),
          /* @__PURE__ */ c.jsxs("span", { className: c7, children: [
            o.length,
            " active · ",
            f.length,
            " ",
            ne
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(Ze, { variant: "primary", size: "sm", onClick: Q, children: "+ Add" })
      ] }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "search",
          className: u7,
          placeholder: "Search characters",
          value: b,
          onChange: (K) => v(K.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ c.jsx(Y7, { onExport: U, onImport: J, onParseError: w }),
      /* @__PURE__ */ c.jsx("div", { className: d7, children: I.length === 0 ? /* @__PURE__ */ c.jsx(
        Gc,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : I.map((K) => {
        const B = M.get(K.speakerVoiceAssetId), ae = K.mappingId === y;
        return /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: ae ? h7 : f7,
            onClick: () => p(K.mappingId),
            "aria-pressed": ae,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: m7, "aria-hidden": "true", children: X7(K.characterName) }),
              /* @__PURE__ */ c.jsxs("span", { className: p7, children: [
                /* @__PURE__ */ c.jsx("span", { className: g7, children: K.characterName }),
                /* @__PURE__ */ c.jsx("span", { className: v7, children: B?.displayName ?? "no voice" })
              ] })
            ]
          },
          K.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ c.jsxs("section", { className: y7, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ c.jsx(jm, { features: Tm, children: /* @__PURE__ */ c.jsx(ow, { children: j && /* @__PURE__ */ c.jsx(
        Cm.div,
        {
          className: k7,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: j
        },
        j
      ) }) }),
      S && /* @__PURE__ */ c.jsx(Fn, { severity: "error", children: S }),
      _ && /* @__PURE__ */ c.jsxs(Fn, { severity: "warning", children: [
        /* @__PURE__ */ c.jsxs("span", { style: { flex: 1 }, children: [
          "Deactivate mapping for ",
          _.name,
          "?"
        ] }),
        /* @__PURE__ */ c.jsx(Ze, { variant: "danger", size: "sm", onClick: () => void A(), children: "Delete" }),
        /* @__PURE__ */ c.jsx(Ze, { variant: "ghost", size: "sm", onClick: () => T(null), children: "Cancel" })
      ] }),
      z ? /* @__PURE__ */ c.jsx(
        H7,
        {
          deploymentId: t.deploymentId,
          mapping: z,
          voiceAssets: f,
          allMappings: o,
          onNameChange: (K) => {
            W({ characterName: K });
          },
          onNameSave: (K) => {
            const B = K.trim();
            B && G({ characterName: B });
          },
          savedHint: O === z.mappingId,
          autoFocusNonce: N,
          onSpeakerChange: (K) => {
            W({ speakerVoiceAssetId: K }), G({ speakerVoiceAssetId: K });
          },
          onDelete: ie,
          onUploadVoice: async (K, B, ae) => {
            const ce = await H(K, B, ae);
            return ce && ae === "speaker" && (W({ speakerVoiceAssetId: ce.voiceAssetId }), G({ speakerVoiceAssetId: ce.voiceAssetId })), await F(), ce;
          },
          onTestLine: te,
          onEditChainPersisted: pe,
          onEditError: k
        },
        z.mappingId
      ) : /* @__PURE__ */ c.jsx(
        q7,
        {
          voiceCount: f.length,
          onUploadVoice: async (K) => {
            await H(K, K.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function q7({ voiceCount: t, onUploadVoice: a }) {
  return t === 0 ? /* @__PURE__ */ c.jsxs(Ia, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ c.jsxs("div", { className: $7, children: [
      /* @__PURE__ */ c.jsx("p", { className: Jr, children: "01 / Onboarding" }),
      /* @__PURE__ */ c.jsx("h2", { id: "onboarding-heading", className: U7, children: "Upload your first voice" }),
      /* @__PURE__ */ c.jsxs("p", { className: B7, children: [
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
function H7(t) {
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
    /* @__PURE__ */ c.jsxs("header", { className: b7, children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("p", { className: Jr, children: "Character" }),
        /* @__PURE__ */ c.jsx("h2", { className: x7, children: a.characterName })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: Lw, children: /* @__PURE__ */ c.jsx(Ze, { variant: "danger", size: "sm", onClick: t.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ c.jsxs(
      Ia,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: D7,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "text",
              className: z7,
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
    /* @__PURE__ */ c.jsxs("div", { className: S7, children: [
      /* @__PURE__ */ c.jsxs(Ia, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ c.jsx("h3", { id: "identity-heading", className: Jr, children: "01 / Identity" }),
        /* @__PURE__ */ c.jsxs("label", { className: E7, children: [
          /* @__PURE__ */ c.jsxs("span", { className: w7, children: [
            /* @__PURE__ */ c.jsx("span", { className: Vx, children: "Character name" }),
            t.savedHint && /* @__PURE__ */ c.jsx(
              "span",
              {
                className: j7,
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
          F7,
          {
            value: a.speakerVoiceAssetId,
            voices: s,
            onChange: t.onSpeakerChange
          }
        ),
        o && /* @__PURE__ */ c.jsx(P7, { voice: o }),
        /* @__PURE__ */ c.jsx(
          $w,
          {
            label: o ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (T) => t.onUploadVoice(T, T.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ c.jsx(
          n7,
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
function F7({
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
function P7({ voice: t }) {
  const a = Q7(t.durationMs ?? null);
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: R7, children: [
      /* @__PURE__ */ c.jsx("span", { children: t.displayName }),
      /* @__PURE__ */ c.jsx("span", { children: t.kind }),
      t.durationMs != null && /* @__PURE__ */ c.jsx("span", { children: Z7(t.durationMs) }),
      t.sampleRate && /* @__PURE__ */ c.jsxs("span", { children: [
        t.sampleRate,
        " Hz"
      ] })
    ] }),
    t.durationMs != null && /* @__PURE__ */ c.jsxs("div", { className: _7, children: [
      /* @__PURE__ */ c.jsx("div", { className: M7, children: /* @__PURE__ */ c.jsx(jm, { features: Tm, children: /* @__PURE__ */ c.jsx(
        Cm.div,
        {
          className: A7,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, t.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ c.jsx(Er, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ c.jsx(G7, { seed: t.contentSha256 })
  ] });
}
function G7({ seed: t }) {
  const a = g.useMemo(() => J7(t, 48), [t]);
  return /* @__PURE__ */ c.jsx("div", { className: O7, "aria-hidden": "true", children: a.map((s, i) => /* @__PURE__ */ c.jsx(
    "span",
    {
      className: L7,
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
      className: o ? T7 : s ? C7 : N7,
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
function Y7({
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
        className: I7,
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
function K7(t) {
  const a = new Set(t.map((i) => i.characterName.toLowerCase()));
  let s = 1;
  for (; a.has(`character ${s}`); ) s += 1;
  return `Character ${s}`;
}
function X7(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function Q7(t) {
  return t == null ? null : t < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : t > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : t > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function Z7(t) {
  return t < 1e3 ? `${t} ms` : `${Math.round(t / 100) / 10}s`;
}
function J7(t, a) {
  const s = [];
  for (let i = 0; i < a; i += 1) {
    const o = t.charCodeAt(i % t.length);
    s.push((o * 31 + i * 7) % 100 / 100);
  }
  return s;
}
function W7(t, a) {
  const s = new Blob([JSON.stringify(t, null, 2)], { type: "application/json" }), i = URL.createObjectURL(s), o = document.createElement("a");
  o.href = i, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(i);
}
function vr(t) {
  return t instanceof ai || t instanceof Error ? t.message : "unknown error";
}
function eI() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: t } = await wT();
        return { deployments: t };
      },
      Component: oR
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
        const a = qs(t, "deploymentId"), [s, { mappings: i }, { runs: o }] = await Promise.all([
          Xy(a),
          Qy(a),
          _T(a, { limit: 10 })
        ]);
        return { deployment: s, mappings: i, runs: o };
      },
      Component: _U
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: t }) => {
        const a = qs(t, "deploymentId"), s = qs(t, "runId");
        return { run: await Jh(a, s) };
      },
      Component: BB
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
      Component: V7
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
      Component: y9
    },
    {
      path: "/runtime/queue",
      Component: m9
    }
  ];
}
function qs(t, a) {
  const s = t[a];
  if (!s)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return s;
}
const qx = "ext-actions-request", tI = "ext-actions-declare", nI = "ext-action-state", Hx = "ext-action-invoke", zh = "emotion-tts:navigate", Ps = "emotion-tts.run", Fx = "emotion-tts.mappings", aI = 4e3;
function rI(t, a) {
  let s = null, i = !1;
  const o = () => {
    const j = s?.badge ?? "not_installed";
    return sI(j, i);
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
      new CustomEvent(tI, {
        detail: { actions: u() },
        bubbles: !1
      })
    );
  }, m = () => {
    t.dispatchEvent(
      new CustomEvent(nI, {
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
      C ? await l2() : await i2(o2(), B1());
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
  const w = window.setInterval(() => void S(), aI);
  return f(), {
    dispose: () => {
      v = !0, window.clearInterval(w), t.removeEventListener(qx, y), t.removeEventListener(Hx, p);
    }
  };
}
function sI(t, a) {
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
const Oh = "emotion-tts-app", iI = "ext-event", Px = "emotion-tts-stylesheet", Gx = ["accent", "density", "card"];
function lI(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function oI() {
  if (typeof document > "u" || document.getElementById(Px)) return;
  const t = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = Px, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
oI();
class cI extends HTMLElement {
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
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = rI(this, a), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
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
      const s = lI(a);
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
    const a = this.resolveInitialEntry(), s = LC(eI(), { initialEntries: [a] });
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
      new CustomEvent(iI, {
        detail: { topic: a, payload: s },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function uI() {
  typeof customElements > "u" || customElements.get(Oh) || customElements.define(Oh, cI);
}
typeof customElements < "u" && !customElements.get(Oh) && uI();
export {
  uI as register
};
//# sourceMappingURL=emotion-tts.js.map
