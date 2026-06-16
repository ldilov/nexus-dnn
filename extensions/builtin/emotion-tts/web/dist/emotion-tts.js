function $E(t, a) {
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
function Vx(t) {
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
function UE() {
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
function BE() {
  return uy || (uy = 1, lf.exports = UE()), lf.exports;
}
var c = BE(), of = { exports: {} }, Ye = {};
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
function IE() {
  if (dy) return Ye;
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
  function T(k, ee, re) {
    this.props = k, this.context = ee, this.refs = R, this.updater = re || j;
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
  function $() {
  }
  $.prototype = T.prototype;
  function _(k, ee, re) {
    this.props = k, this.context = ee, this.refs = R, this.updater = re || j;
  }
  var C = _.prototype = new $();
  C.constructor = _, N(C, T.prototype), C.isPureReactComponent = !0;
  var I = Array.isArray;
  function Y() {
  }
  var ae = { H: null, A: null, T: null, S: null }, A = Object.prototype.hasOwnProperty;
  function V(k, ee, re) {
    var K = re.ref;
    return {
      $$typeof: t,
      type: k,
      key: ee,
      ref: K !== void 0 ? K : null,
      props: re
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
    return "$" + k.replace(/[=:]/g, function(re) {
      return ee[re];
    });
  }
  var Q = /\/+/g;
  function G(k, ee) {
    return typeof k == "object" && k !== null && k.key != null ? J("" + k.key) : ee.toString(36);
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
  function M(k, ee, re, K, B) {
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
              return ce = k._init, M(
                ce(k._payload),
                ee,
                re,
                K,
                B
              );
          }
      }
    if (ce)
      return B = B(k), ce = K === "" ? "." + G(k, 0) : K, I(B) ? (re = "", ce != null && (re = ce.replace(Q, "$&/") + "/"), M(B, ee, re, "", function(st) {
        return st;
      })) : B != null && (P(B) && (B = D(
        B,
        re + (B.key == null || k && k.key === B.key ? "" : ("" + B.key).replace(
          Q,
          "$&/"
        ) + "/") + ce
      )), ee.push(B)), 1;
    ce = 0;
    var ye = K === "" ? "." : K + ":";
    if (I(k))
      for (var Me = 0; Me < k.length; Me++)
        K = k[Me], W = ye + G(K, Me), ce += M(
          K,
          ee,
          re,
          W,
          B
        );
    else if (Me = S(k), typeof Me == "function")
      for (k = Me.call(k), Me = 0; !(K = k.next()).done; )
        K = K.value, W = ye + G(K, Me++), ce += M(
          K,
          ee,
          re,
          W,
          B
        );
    else if (W === "object") {
      if (typeof k.then == "function")
        return M(
          ie(k),
          ee,
          re,
          K,
          B
        );
      throw ee = String(k), Error(
        "Objects are not valid as a React child (found: " + (ee === "[object Object]" ? "object with keys {" + Object.keys(k).join(", ") + "}" : ee) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ce;
  }
  function F(k, ee, re) {
    if (k == null) return k;
    var K = [], B = 0;
    return M(k, K, "", "", function(W) {
      return ee.call(re, W, B++);
    }), K;
  }
  function U(k) {
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
    forEach: function(k, ee, re) {
      F(
        k,
        function() {
          ee.apply(this, arguments);
        },
        re
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
  return Ye.Activity = v, Ye.Children = de, Ye.Component = T, Ye.Fragment = s, Ye.Profiler = o, Ye.PureComponent = _, Ye.StrictMode = i, Ye.Suspense = y, Ye.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ae, Ye.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(k) {
      return ae.H.useMemoCache(k);
    }
  }, Ye.cache = function(k) {
    return function() {
      return k.apply(null, arguments);
    };
  }, Ye.cacheSignal = function() {
    return null;
  }, Ye.cloneElement = function(k, ee, re) {
    if (k == null)
      throw Error(
        "The argument must be a React element, but you passed " + k + "."
      );
    var K = N({}, k.props), B = k.key;
    if (ee != null)
      for (W in ee.key !== void 0 && (B = "" + ee.key), ee)
        !A.call(ee, W) || W === "key" || W === "__self" || W === "__source" || W === "ref" && ee.ref === void 0 || (K[W] = ee[W]);
    var W = arguments.length - 2;
    if (W === 1) K.children = re;
    else if (1 < W) {
      for (var ce = Array(W), ye = 0; ye < W; ye++)
        ce[ye] = arguments[ye + 2];
      K.children = ce;
    }
    return V(k.type, B, K);
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
  }, Ye.createElement = function(k, ee, re) {
    var K, B = {}, W = null;
    if (ee != null)
      for (K in ee.key !== void 0 && (W = "" + ee.key), ee)
        A.call(ee, K) && K !== "key" && K !== "__self" && K !== "__source" && (B[K] = ee[K]);
    var ce = arguments.length - 2;
    if (ce === 1) B.children = re;
    else if (1 < ce) {
      for (var ye = Array(ce), Me = 0; Me < ce; Me++)
        ye[Me] = arguments[Me + 2];
      B.children = ye;
    }
    if (k && k.defaultProps)
      for (K in ce = k.defaultProps, ce)
        B[K] === void 0 && (B[K] = ce[K]);
    return V(k, W, B);
  }, Ye.createRef = function() {
    return { current: null };
  }, Ye.forwardRef = function(k) {
    return { $$typeof: m, render: k };
  }, Ye.isValidElement = P, Ye.lazy = function(k) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: k },
      _init: U
    };
  }, Ye.memo = function(k, ee) {
    return {
      $$typeof: p,
      type: k,
      compare: ee === void 0 ? null : ee
    };
  }, Ye.startTransition = function(k) {
    var ee = ae.T, re = {};
    ae.T = re;
    try {
      var K = k(), B = ae.S;
      B !== null && B(re, K), typeof K == "object" && K !== null && typeof K.then == "function" && K.then(Y, se);
    } catch (W) {
      se(W);
    } finally {
      ee !== null && re.types !== null && (ee.types = re.types), ae.T = ee;
    }
  }, Ye.unstable_useCacheRefresh = function() {
    return ae.H.useCacheRefresh();
  }, Ye.use = function(k) {
    return ae.H.use(k);
  }, Ye.useActionState = function(k, ee, re) {
    return ae.H.useActionState(k, ee, re);
  }, Ye.useCallback = function(k, ee) {
    return ae.H.useCallback(k, ee);
  }, Ye.useContext = function(k) {
    return ae.H.useContext(k);
  }, Ye.useDebugValue = function() {
  }, Ye.useDeferredValue = function(k, ee) {
    return ae.H.useDeferredValue(k, ee);
  }, Ye.useEffect = function(k, ee) {
    return ae.H.useEffect(k, ee);
  }, Ye.useEffectEvent = function(k) {
    return ae.H.useEffectEvent(k);
  }, Ye.useId = function() {
    return ae.H.useId();
  }, Ye.useImperativeHandle = function(k, ee, re) {
    return ae.H.useImperativeHandle(k, ee, re);
  }, Ye.useInsertionEffect = function(k, ee) {
    return ae.H.useInsertionEffect(k, ee);
  }, Ye.useLayoutEffect = function(k, ee) {
    return ae.H.useLayoutEffect(k, ee);
  }, Ye.useMemo = function(k, ee) {
    return ae.H.useMemo(k, ee);
  }, Ye.useOptimistic = function(k, ee) {
    return ae.H.useOptimistic(k, ee);
  }, Ye.useReducer = function(k, ee, re) {
    return ae.H.useReducer(k, ee, re);
  }, Ye.useRef = function(k) {
    return ae.H.useRef(k);
  }, Ye.useState = function(k) {
    return ae.H.useState(k);
  }, Ye.useSyncExternalStore = function(k, ee, re) {
    return ae.H.useSyncExternalStore(
      k,
      ee,
      re
    );
  }, Ye.useTransition = function() {
    return ae.H.useTransition();
  }, Ye.version = "19.2.5", Ye;
}
var fy;
function zh() {
  return fy || (fy = 1, of.exports = IE()), of.exports;
}
var g = zh();
const Se = /* @__PURE__ */ Vx(g), VE = /* @__PURE__ */ $E({
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
function qE() {
  return hy || (hy = 1, (function(t) {
    function a(M, F) {
      var U = M.length;
      M.push(F);
      e: for (; 0 < U; ) {
        var se = U - 1 >>> 1, de = M[se];
        if (0 < o(de, F))
          M[se] = F, M[U] = de, U = se;
        else break e;
      }
    }
    function s(M) {
      return M.length === 0 ? null : M[0];
    }
    function i(M) {
      if (M.length === 0) return null;
      var F = M[0], U = M.pop();
      if (U !== F) {
        M[0] = U;
        e: for (var se = 0, de = M.length, k = de >>> 1; se < k; ) {
          var ee = 2 * (se + 1) - 1, re = M[ee], K = ee + 1, B = M[K];
          if (0 > o(re, U))
            K < de && 0 > o(B, re) ? (M[se] = B, M[K] = U, se = K) : (M[se] = re, M[ee] = U, se = ee);
          else if (K < de && 0 > o(B, U))
            M[se] = B, M[K] = U, se = K;
          else break e;
        }
      }
      return F;
    }
    function o(M, F) {
      var U = M.sortIndex - F.sortIndex;
      return U !== 0 ? U : M.id - F.id;
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
    var y = [], p = [], b = 1, v = null, w = 3, S = !1, j = !1, N = !1, R = !1, T = typeof setTimeout == "function" ? setTimeout : null, $ = typeof clearTimeout == "function" ? clearTimeout : null, _ = typeof setImmediate < "u" ? setImmediate : null;
    function C(M) {
      for (var F = s(p); F !== null; ) {
        if (F.callback === null) i(p);
        else if (F.startTime <= M)
          i(p), F.sortIndex = F.expirationTime, a(y, F);
        else break;
        F = s(p);
      }
    }
    function I(M) {
      if (N = !1, C(M), !j)
        if (s(y) !== null)
          j = !0, Y || (Y = !0, J());
        else {
          var F = s(p);
          F !== null && ie(I, F.startTime - M);
        }
    }
    var Y = !1, ae = -1, A = 5, V = -1;
    function D() {
      return R ? !0 : !(t.unstable_now() - V < A);
    }
    function P() {
      if (R = !1, Y) {
        var M = t.unstable_now();
        V = M;
        var F = !0;
        try {
          e: {
            j = !1, N && (N = !1, $(ae), ae = -1), S = !0;
            var U = w;
            try {
              t: {
                for (C(M), v = s(y); v !== null && !(v.expirationTime > M && D()); ) {
                  var se = v.callback;
                  if (typeof se == "function") {
                    v.callback = null, w = v.priorityLevel;
                    var de = se(
                      v.expirationTime <= M
                    );
                    if (M = t.unstable_now(), typeof de == "function") {
                      v.callback = de, C(M), F = !0;
                      break t;
                    }
                    v === s(y) && i(y), C(M);
                  } else i(y);
                  v = s(y);
                }
                if (v !== null) F = !0;
                else {
                  var k = s(p);
                  k !== null && ie(
                    I,
                    k.startTime - M
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
      var Q = new MessageChannel(), G = Q.port2;
      Q.port1.onmessage = P, J = function() {
        G.postMessage(null);
      };
    } else
      J = function() {
        T(P, 0);
      };
    function ie(M, F) {
      ae = T(function() {
        M(t.unstable_now());
      }, F);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(M) {
      M.callback = null;
    }, t.unstable_forceFrameRate = function(M) {
      0 > M || 125 < M ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : A = 0 < M ? Math.floor(1e3 / M) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return w;
    }, t.unstable_next = function(M) {
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
        return M();
      } finally {
        w = U;
      }
    }, t.unstable_requestPaint = function() {
      R = !0;
    }, t.unstable_runWithPriority = function(M, F) {
      switch (M) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          M = 3;
      }
      var U = w;
      w = M;
      try {
        return F();
      } finally {
        w = U;
      }
    }, t.unstable_scheduleCallback = function(M, F, U) {
      var se = t.unstable_now();
      switch (typeof U == "object" && U !== null ? (U = U.delay, U = typeof U == "number" && 0 < U ? se + U : se) : U = se, M) {
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
      return de = U + de, M = {
        id: b++,
        callback: F,
        priorityLevel: M,
        startTime: U,
        expirationTime: de,
        sortIndex: -1
      }, U > se ? (M.sortIndex = U, a(p, M), s(y) === null && M === s(p) && (N ? ($(ae), ae = -1) : N = !0, ie(I, U - se))) : (M.sortIndex = de, a(y, M), j || S || (j = !0, Y || (Y = !0, J()))), M;
    }, t.unstable_shouldYield = D, t.unstable_wrapCallback = function(M) {
      var F = w;
      return function() {
        var U = w;
        w = F;
        try {
          return M.apply(this, arguments);
        } finally {
          w = U;
        }
      };
    };
  })(df)), df;
}
var my;
function HE() {
  return my || (my = 1, uf.exports = qE()), uf.exports;
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
function FE() {
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
function qx() {
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
  return t(), ff.exports = FE(), ff.exports;
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
function PE() {
  if (vy) return Qi;
  vy = 1;
  var t = HE(), a = zh(), s = qx();
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
  var v = Object.assign, w = Symbol.for("react.element"), S = Symbol.for("react.transitional.element"), j = Symbol.for("react.portal"), N = Symbol.for("react.fragment"), R = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), $ = Symbol.for("react.consumer"), _ = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), I = Symbol.for("react.suspense"), Y = Symbol.for("react.suspense_list"), ae = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), V = Symbol.for("react.activity"), D = Symbol.for("react.memo_cache_sentinel"), P = Symbol.iterator;
  function J(e) {
    return e === null || typeof e != "object" ? null : (e = P && e[P] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Q = Symbol.for("react.client.reference");
  function G(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Q ? null : e.displayName || e.name || null;
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
        case $:
          return (e._context.displayName || "Context") + ".Consumer";
        case C:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ae:
          return n = e.displayName || null, n !== null ? n : G(e.type) || "Memo";
        case A:
          n = e._payload, e = e._init;
          try {
            return G(e(n));
          } catch {
          }
      }
    return null;
  }
  var ie = Array.isArray, M = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, U = {
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
  function re(e, n) {
    de++, se[de] = e.current, e.current = n;
  }
  var K = k(null), B = k(null), W = k(null), ce = k(null);
  function ye(e, n) {
    switch (re(W, n), re(B, e), re(K, null), n.nodeType) {
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
    ee(K), re(K, e);
  }
  function Me() {
    ee(K), ee(B), ee(W);
  }
  function st(e) {
    e.memoizedState !== null && re(ce, e);
    var n = K.current, r = Dv(n, e.type);
    n !== r && (re(B, e), re(K, r));
  }
  function Te(e) {
    B.current === e && (ee(K), ee(B)), ce.current === e && (ee(ce), Pi._currentValue = U);
  }
  var He, Ve;
  function Ke(e) {
    if (He === void 0)
      try {
        throw Error();
      } catch (r) {
        var n = r.stack.trim().match(/\n( *(at )?)/);
        He = n && n[1] || "", Ve = -1 < r.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < r.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + He + e + Ve;
  }
  var Ft = !1;
  function Bt(e, n) {
    if (!e || Ft) return "";
    Ft = !0;
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
`), ne = E.split(`
`);
        for (d = l = 0; l < L.length && !L[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; d < ne.length && !ne[d].includes(
          "DetermineComponentFrameRoot"
        ); )
          d++;
        if (l === L.length || d === ne.length)
          for (l = L.length - 1, d = ne.length - 1; 1 <= l && 0 <= d && L[l] !== ne[d]; )
            d--;
        for (; 1 <= l && 0 <= d; l--, d--)
          if (L[l] !== ne[d]) {
            if (l !== 1 || d !== 1)
              do
                if (l--, d--, 0 > d || L[l] !== ne[d]) {
                  var ue = `
` + L[l].replace(" at new ", " at ");
                  return e.displayName && ue.includes("<anonymous>") && (ue = ue.replace("<anonymous>", e.displayName)), ue;
                }
              while (1 <= l && 0 <= d);
            break;
          }
      }
    } finally {
      Ft = !1, Error.prepareStackTrace = r;
    }
    return (r = e ? e.displayName || e.name : "") ? Ke(r) : "";
  }
  function we(e, n) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ke(e.type);
      case 16:
        return Ke("Lazy");
      case 13:
        return e.child !== n && n !== null ? Ke("Suspense Fallback") : Ke("Suspense");
      case 19:
        return Ke("SuspenseList");
      case 0:
      case 15:
        return Bt(e.type, !1);
      case 11:
        return Bt(e.type.render, !1);
      case 1:
        return Bt(e.type, !0);
      case 31:
        return Ke("Activity");
      default:
        return "";
    }
  }
  function tt(e) {
    try {
      var n = "", r = null;
      do
        n += we(e, r), r = e, e = e.return;
      while (e);
      return n;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var dt = Object.prototype.hasOwnProperty, ft = t.unstable_scheduleCallback, Ot = t.unstable_cancelCallback, Pe = t.unstable_shouldYield, vt = t.unstable_requestPaint, yt = t.unstable_now, je = t.unstable_getCurrentPriorityLevel, _e = t.unstable_ImmediatePriority, Ge = t.unstable_UserBlockingPriority, Fe = t.unstable_NormalPriority, Nt = t.unstable_LowPriority, Mt = t.unstable_IdlePriority, Hn = t.log, Sn = t.unstable_setDisableYieldValue, wn = null, Pt = null;
  function At(e) {
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
  function it(e, n, r, l, d, h) {
    var x = e.pendingLanes;
    e.pendingLanes = r, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= r, e.entangledLanes &= r, e.errorRecoveryDisabledLanes &= r, e.shellSuspendCounter = 0;
    var E = e.entanglements, L = e.expirationTimes, ne = e.hiddenUpdates;
    for (r = x & ~r; 0 < r; ) {
      var ue = 31 - Lt(r), pe = 1 << ue;
      E[ue] = 0, L[ue] = -1;
      var le = ne[ue];
      if (le !== null)
        for (ne[ue] = null, ue = 0; ue < le.length; ue++) {
          var oe = le[ue];
          oe !== null && (oe.lane &= -536870913);
        }
      r &= ~pe;
    }
    l !== 0 && Vt(e, l, 0), h !== 0 && d === 0 && e.tag !== 0 && (e.suspendedLanes |= h & ~(x & ~n));
  }
  function Vt(e, n, r) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var l = 31 - Lt(n);
    e.entangledLanes |= n, e.entanglements[l] = e.entanglements[l] | 1073741824 | r & 261930;
  }
  function lt(e, n) {
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
  function Z(e) {
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
  var Ee = Math.random().toString(36).slice(2), Ne = "__reactFiber$" + Ee, Ce = "__reactProps$" + Ee, Oe = "__reactContainer$" + Ee, Re = "__reactEvents$" + Ee, Ie = "__reactListeners$" + Ee, $e = "__reactHandles$" + Ee, ht = "__reactResources$" + Ee, Je = "__reactMarker$" + Ee;
  function Ct(e) {
    delete e[Ne], delete e[Ce], delete e[Re], delete e[Ie], delete e[$e];
  }
  function St(e) {
    var n = e[Ne];
    if (n) return n;
    for (var r = e.parentNode; r; ) {
      if (n = r[Oe] || r[Ne]) {
        if (r = n.alternate, n.child !== null || r !== null && r.child !== null)
          for (e = Iv(e); e !== null; ) {
            if (r = e[Ne]) return r;
            e = Iv(e);
          }
        return n;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function $t(e) {
    if (e = e[Ne] || e[Oe]) {
      var n = e.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return e;
    }
    return null;
  }
  function nt(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e.stateNode;
    throw Error(i(33));
  }
  function Zt(e) {
    var n = e[ht];
    return n || (n = e[ht] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function _t(e) {
    e[Je] = !0;
  }
  var Fa = /* @__PURE__ */ new Set(), ia = {};
  function on(e, n) {
    ha(e, n), ha(e + "Capture", n);
  }
  function ha(e, n) {
    for (ia[e] = n, e = 0; e < n.length; e++)
      Fa.add(n[e]);
  }
  var Tr = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), ma = {}, Rr = {};
  function ns(e) {
    return dt.call(Rr, e) ? !0 : dt.call(ma, e) ? !1 : Tr.test(e) ? Rr[e] = !0 : (ma[e] = !0, !1);
  }
  function We(e, n, r) {
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
  function kt(e) {
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
      var n = kt(e) ? "checked" : "value";
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
    return e && (l = kt(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== r ? (n.setValue(e), !0) : !1;
  }
  function Dl(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Aw = /[\n"\\]/g;
  function Fn(e) {
    return e.replace(
      Aw,
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
        if (ie(l)) {
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
  var kw = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function _m(e, n, r) {
    var l = n.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === "" ? l ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : l ? e.setProperty(n, r) : typeof r != "number" || r === 0 || kw.has(n) ? n === "float" ? e.cssFloat = r : e[n] = ("" + r).trim() : e[n] = r + "px";
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
  var Dw = /* @__PURE__ */ new Map([
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
  ]), zw = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function zl(e) {
    return zw.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
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
      var r = e[Ce] || null;
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
                var d = l[Ce] || null;
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
    var l = r[Ce] || null;
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
  var _r = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Ul = Nn(_r), ui = v({}, _r, { view: 0, detail: 0 }), Ow = Nn(ui), ou, cu, di, Bl = v({}, ui, {
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
  }), Om = Nn(Bl), Lw = v({}, Bl, { dataTransfer: 0 }), $w = Nn(Lw), Uw = v({}, ui, { relatedTarget: 0 }), uu = Nn(Uw), Bw = v({}, _r, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Iw = Nn(Bw), Vw = v({}, _r, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), qw = Nn(Vw), Hw = v({}, _r, { data: 0 }), Lm = Nn(Hw), Fw = {
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
  }, Pw = {
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
  }, Gw = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Yw(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = Gw[e]) ? !!n[e] : !1;
  }
  function du() {
    return Yw;
  }
  var Kw = v({}, ui, {
    key: function(e) {
      if (e.key) {
        var n = Fw[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = Ll(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Pw[e.keyCode] || "Unidentified" : "";
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
  }), Xw = Nn(Kw), Qw = v({}, Bl, {
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
  }), $m = Nn(Qw), Zw = v({}, ui, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: du
  }), Jw = Nn(Zw), Ww = v({}, _r, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), ej = Nn(Ww), tj = v({}, Bl, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), nj = Nn(tj), aj = v({}, _r, {
    newState: 0,
    oldState: 0
  }), rj = Nn(aj), sj = [9, 13, 27, 32], fu = ja && "CompositionEvent" in window, fi = null;
  ja && "documentMode" in document && (fi = document.documentMode);
  var ij = ja && "TextEvent" in window && !fi, Um = ja && (!fu || fi && 8 < fi && 11 >= fi), Bm = " ", Im = !1;
  function Vm(e, n) {
    switch (e) {
      case "keyup":
        return sj.indexOf(n.keyCode) !== -1;
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
  function lj(e, n) {
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
  function oj(e, n) {
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
  var cj = {
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
    return n === "input" ? !!cj[e.type] : n === "textarea";
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
  function uj(e) {
    Cv(e, 0);
  }
  function Il(e) {
    var n = nt(e);
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
      ), km(uj, n);
    }
  }
  function dj(e, n, r) {
    e === "focusin" ? (Km(), hi = n, mi = r, hi.attachEvent("onpropertychange", Xm)) : e === "focusout" && Km();
  }
  function fj(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Il(mi);
  }
  function hj(e, n) {
    if (e === "click") return Il(n);
  }
  function mj(e, n) {
    if (e === "input" || e === "change")
      return Il(n);
  }
  function pj(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var zn = typeof Object.is == "function" ? Object.is : pj;
  function pi(e, n) {
    if (zn(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var r = Object.keys(e), l = Object.keys(n);
    if (r.length !== l.length) return !1;
    for (l = 0; l < r.length; l++) {
      var d = r[l];
      if (!dt.call(n, d) || !zn(e[d], n[d]))
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
  var gj = ja && "documentMode" in document && 11 >= document.documentMode, us = null, gu = null, gi = null, vu = !1;
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
  function Mr(e, n) {
    var r = {};
    return r[e.toLowerCase()] = n.toLowerCase(), r["Webkit" + e] = "webkit" + n, r["Moz" + e] = "moz" + n, r;
  }
  var ds = {
    animationend: Mr("Animation", "AnimationEnd"),
    animationiteration: Mr("Animation", "AnimationIteration"),
    animationstart: Mr("Animation", "AnimationStart"),
    transitionrun: Mr("Transition", "TransitionRun"),
    transitionstart: Mr("Transition", "TransitionStart"),
    transitioncancel: Mr("Transition", "TransitionCancel"),
    transitionend: Mr("Transition", "TransitionEnd")
  }, yu = {}, tp = {};
  ja && (tp = document.createElement("div").style, "AnimationEvent" in window || (delete ds.animationend.animation, delete ds.animationiteration.animation, delete ds.animationstart.animation), "TransitionEvent" in window || delete ds.transitionend.transition);
  function Ar(e) {
    if (yu[e]) return yu[e];
    if (!ds[e]) return e;
    var n = ds[e], r;
    for (r in n)
      if (n.hasOwnProperty(r) && r in tp)
        return yu[e] = n[r];
    return e;
  }
  var np = Ar("animationend"), ap = Ar("animationiteration"), rp = Ar("animationstart"), vj = Ar("transitionrun"), yj = Ar("transitionstart"), bj = Ar("transitioncancel"), sp = Ar("transitionend"), ip = /* @__PURE__ */ new Map(), bu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
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
  function kr(e, n) {
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
  function xj(e, n, r, l) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function On(e, n, r, l) {
    return new xj(e, n, r, l);
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
      x = NE(
        e,
        r,
        K.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case V:
          return e = On(31, r, n, d), e.elementType = V, e.lanes = h, e;
        case N:
          return Dr(r.children, d, h, n);
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
              case $:
                x = 9;
                break e;
              case C:
                x = 11;
                break e;
              case ae:
                x = 14;
                break e;
              case A:
                x = 16, l = null;
                break e;
            }
          x = 29, r = Error(
            i(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return n = On(x, r, n, d), n.elementType = e, n.type = l, n.lanes = h, n;
  }
  function Dr(e, n, r, l) {
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
        stack: tt(n)
      }, up.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: tt(n)
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
  var dn = null, Dt = null, ut = !1, Ya = null, Xn = !1, Tu = Error(i(519));
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
    switch (n[Ne] = e, n[Ce] = l, r) {
      case "dialog":
        rt("cancel", n), rt("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        rt("load", n);
        break;
      case "video":
      case "audio":
        for (r = 0; r < Ii.length; r++)
          rt(Ii[r], n);
        break;
      case "source":
        rt("error", n);
        break;
      case "img":
      case "image":
      case "link":
        rt("error", n), rt("load", n);
        break;
      case "details":
        rt("toggle", n);
        break;
      case "input":
        rt("invalid", n), Cm(
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
        rt("invalid", n);
        break;
      case "textarea":
        rt("invalid", n), Rm(n, l.value, l.defaultValue, l.children);
    }
    r = l.children, typeof r != "string" && typeof r != "number" && typeof r != "bigint" || n.textContent === "" + r || l.suppressHydrationWarning === !0 || Mv(n.textContent, r) ? (l.popover != null && (rt("beforetoggle", n), rt("toggle", n)), l.onScroll != null && rt("scroll", n), l.onScrollEnd != null && rt("scrollend", n), l.onClick != null && (n.onclick = wa), n = !0) : n = !1, n || Ka(e, !0);
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
    if (!ut) return mp(e), ut = !0, !1;
    var n = e.tag, r;
    if ((r = n !== 3 && n !== 27) && ((r = n === 5) && (r = e.type, r = !(r !== "form" && r !== "button") || Pd(e.type, e.memoizedProps)), r = !r), r && Dt && Ka(e), mp(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      Dt = Bv(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      Dt = Bv(e);
    } else
      n === 27 ? (n = Dt, or(e.type) ? (e = Qd, Qd = null, Dt = e) : Dt = n) : Dt = dn ? Zn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function zr() {
    Dt = dn = null, ut = !1;
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
  var _u = k(null), Or = null, Ca = null;
  function Xa(e, n, r) {
    re(_u, n._currentValue), n._currentValue = r;
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
          for (var L = 0; L < n.length; L++)
            if (E.context === n[L]) {
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
  function Lr(e) {
    Or = e, Ca = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function fn(e) {
    return pp(Or, e);
  }
  function Kl(e, n) {
    return Or === null && Lr(e), pp(e, n);
  }
  function pp(e, n) {
    var r = n._currentValue;
    if (n = { context: n, memoizedValue: r, next: null }, Ca === null) {
      if (e === null) throw Error(i(308));
      Ca = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else Ca = Ca.next = n;
    return r;
  }
  var Sj = typeof AbortController < "u" ? AbortController : function() {
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
  }, wj = t.unstable_scheduleCallback, jj = t.unstable_NormalPriority, Wt = {
    $$typeof: _,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function ku() {
    return {
      controller: new Sj(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function bi(e) {
    e.refCount--, e.refCount === 0 && wj(jj, function() {
      e.controller.abort();
    });
  }
  var xi = null, Du = 0, ys = 0, bs = null;
  function Ej(e, n) {
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
  function Nj(e, n) {
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
  var vp = M.S;
  M.S = function(e, n) {
    ev = yt(), typeof n == "object" && n !== null && typeof n.then == "function" && Ej(e, n), vp !== null && vp(e, n);
  };
  var $r = k(null);
  function zu() {
    var e = $r.current;
    return e !== null ? e : Tt.pooledCache;
  }
  function Xl(e, n) {
    n === null ? re($r, $r.current) : re($r, n.pool);
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
        throw Br = n, xs;
    }
  }
  function Ur(e) {
    try {
      var n = e._init;
      return n(e._payload);
    } catch (r) {
      throw r !== null && typeof r == "object" && typeof r.then == "function" ? (Br = r, xs) : r;
    }
  }
  var Br = null;
  function Sp() {
    if (Br === null) throw Error(i(459));
    var e = Br;
    return Br = null, e;
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
        var te = X.deletions;
        te === null ? (X.deletions = [q], X.flags |= 16) : te.push(q);
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
    function h(X, q, te) {
      return X.index = te, e ? (te = X.alternate, te !== null ? (te = te.index, te < q ? (X.flags |= 67108866, q) : te) : (X.flags |= 67108866, q)) : (X.flags |= 1048576, q);
    }
    function x(X) {
      return e && X.alternate === null && (X.flags |= 67108866), X;
    }
    function E(X, q, te, me) {
      return q === null || q.tag !== 6 ? (q = ju(te, X.mode, me), q.return = X, q) : (q = d(q, te), q.return = X, q);
    }
    function L(X, q, te, me) {
      var Be = te.type;
      return Be === N ? ue(
        X,
        q,
        te.props.children,
        me,
        te.key
      ) : q !== null && (q.elementType === Be || typeof Be == "object" && Be !== null && Be.$$typeof === A && Ur(Be) === q.type) ? (q = d(q, te.props), wi(q, te), q.return = X, q) : (q = Pl(
        te.type,
        te.key,
        te.props,
        null,
        X.mode,
        me
      ), wi(q, te), q.return = X, q);
    }
    function ne(X, q, te, me) {
      return q === null || q.tag !== 4 || q.stateNode.containerInfo !== te.containerInfo || q.stateNode.implementation !== te.implementation ? (q = Eu(te, X.mode, me), q.return = X, q) : (q = d(q, te.children || []), q.return = X, q);
    }
    function ue(X, q, te, me, Be) {
      return q === null || q.tag !== 7 ? (q = Dr(
        te,
        X.mode,
        me,
        Be
      ), q.return = X, q) : (q = d(q, te), q.return = X, q);
    }
    function pe(X, q, te) {
      if (typeof q == "string" && q !== "" || typeof q == "number" || typeof q == "bigint")
        return q = ju(
          "" + q,
          X.mode,
          te
        ), q.return = X, q;
      if (typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case S:
            return te = Pl(
              q.type,
              q.key,
              q.props,
              null,
              X.mode,
              te
            ), wi(te, q), te.return = X, te;
          case j:
            return q = Eu(
              q,
              X.mode,
              te
            ), q.return = X, q;
          case A:
            return q = Ur(q), pe(X, q, te);
        }
        if (ie(q) || J(q))
          return q = Dr(
            q,
            X.mode,
            te,
            null
          ), q.return = X, q;
        if (typeof q.then == "function")
          return pe(X, Jl(q), te);
        if (q.$$typeof === _)
          return pe(
            X,
            Kl(X, q),
            te
          );
        Wl(X, q);
      }
      return null;
    }
    function le(X, q, te, me) {
      var Be = q !== null ? q.key : null;
      if (typeof te == "string" && te !== "" || typeof te == "number" || typeof te == "bigint")
        return Be !== null ? null : E(X, q, "" + te, me);
      if (typeof te == "object" && te !== null) {
        switch (te.$$typeof) {
          case S:
            return te.key === Be ? L(X, q, te, me) : null;
          case j:
            return te.key === Be ? ne(X, q, te, me) : null;
          case A:
            return te = Ur(te), le(X, q, te, me);
        }
        if (ie(te) || J(te))
          return Be !== null ? null : ue(X, q, te, me, null);
        if (typeof te.then == "function")
          return le(
            X,
            q,
            Jl(te),
            me
          );
        if (te.$$typeof === _)
          return le(
            X,
            q,
            Kl(X, te),
            me
          );
        Wl(X, te);
      }
      return null;
    }
    function oe(X, q, te, me, Be) {
      if (typeof me == "string" && me !== "" || typeof me == "number" || typeof me == "bigint")
        return X = X.get(te) || null, E(q, X, "" + me, Be);
      if (typeof me == "object" && me !== null) {
        switch (me.$$typeof) {
          case S:
            return X = X.get(
              me.key === null ? te : me.key
            ) || null, L(q, X, me, Be);
          case j:
            return X = X.get(
              me.key === null ? te : me.key
            ) || null, ne(q, X, me, Be);
          case A:
            return me = Ur(me), oe(
              X,
              q,
              te,
              me,
              Be
            );
        }
        if (ie(me) || J(me))
          return X = X.get(te) || null, ue(q, X, me, Be, null);
        if (typeof me.then == "function")
          return oe(
            X,
            q,
            te,
            Jl(me),
            Be
          );
        if (me.$$typeof === _)
          return oe(
            X,
            q,
            te,
            Kl(q, me),
            Be
          );
        Wl(q, me);
      }
      return null;
    }
    function ke(X, q, te, me) {
      for (var Be = null, mt = null, Le = q, Ze = q = 0, ct = null; Le !== null && Ze < te.length; Ze++) {
        Le.index > Ze ? (ct = Le, Le = null) : ct = Le.sibling;
        var pt = le(
          X,
          Le,
          te[Ze],
          me
        );
        if (pt === null) {
          Le === null && (Le = ct);
          break;
        }
        e && Le && pt.alternate === null && n(X, Le), q = h(pt, q, Ze), mt === null ? Be = pt : mt.sibling = pt, mt = pt, Le = ct;
      }
      if (Ze === te.length)
        return r(X, Le), ut && Na(X, Ze), Be;
      if (Le === null) {
        for (; Ze < te.length; Ze++)
          Le = pe(X, te[Ze], me), Le !== null && (q = h(
            Le,
            q,
            Ze
          ), mt === null ? Be = Le : mt.sibling = Le, mt = Le);
        return ut && Na(X, Ze), Be;
      }
      for (Le = l(Le); Ze < te.length; Ze++)
        ct = oe(
          Le,
          X,
          Ze,
          te[Ze],
          me
        ), ct !== null && (e && ct.alternate !== null && Le.delete(
          ct.key === null ? Ze : ct.key
        ), q = h(
          ct,
          q,
          Ze
        ), mt === null ? Be = ct : mt.sibling = ct, mt = ct);
      return e && Le.forEach(function(hr) {
        return n(X, hr);
      }), ut && Na(X, Ze), Be;
    }
    function qe(X, q, te, me) {
      if (te == null) throw Error(i(151));
      for (var Be = null, mt = null, Le = q, Ze = q = 0, ct = null, pt = te.next(); Le !== null && !pt.done; Ze++, pt = te.next()) {
        Le.index > Ze ? (ct = Le, Le = null) : ct = Le.sibling;
        var hr = le(X, Le, pt.value, me);
        if (hr === null) {
          Le === null && (Le = ct);
          break;
        }
        e && Le && hr.alternate === null && n(X, Le), q = h(hr, q, Ze), mt === null ? Be = hr : mt.sibling = hr, mt = hr, Le = ct;
      }
      if (pt.done)
        return r(X, Le), ut && Na(X, Ze), Be;
      if (Le === null) {
        for (; !pt.done; Ze++, pt = te.next())
          pt = pe(X, pt.value, me), pt !== null && (q = h(pt, q, Ze), mt === null ? Be = pt : mt.sibling = pt, mt = pt);
        return ut && Na(X, Ze), Be;
      }
      for (Le = l(Le); !pt.done; Ze++, pt = te.next())
        pt = oe(Le, X, Ze, pt.value, me), pt !== null && (e && pt.alternate !== null && Le.delete(pt.key === null ? Ze : pt.key), q = h(pt, q, Ze), mt === null ? Be = pt : mt.sibling = pt, mt = pt);
      return e && Le.forEach(function(LE) {
        return n(X, LE);
      }), ut && Na(X, Ze), Be;
    }
    function Et(X, q, te, me) {
      if (typeof te == "object" && te !== null && te.type === N && te.key === null && (te = te.props.children), typeof te == "object" && te !== null) {
        switch (te.$$typeof) {
          case S:
            e: {
              for (var Be = te.key; q !== null; ) {
                if (q.key === Be) {
                  if (Be = te.type, Be === N) {
                    if (q.tag === 7) {
                      r(
                        X,
                        q.sibling
                      ), me = d(
                        q,
                        te.props.children
                      ), me.return = X, X = me;
                      break e;
                    }
                  } else if (q.elementType === Be || typeof Be == "object" && Be !== null && Be.$$typeof === A && Ur(Be) === q.type) {
                    r(
                      X,
                      q.sibling
                    ), me = d(q, te.props), wi(me, te), me.return = X, X = me;
                    break e;
                  }
                  r(X, q);
                  break;
                } else n(X, q);
                q = q.sibling;
              }
              te.type === N ? (me = Dr(
                te.props.children,
                X.mode,
                me,
                te.key
              ), me.return = X, X = me) : (me = Pl(
                te.type,
                te.key,
                te.props,
                null,
                X.mode,
                me
              ), wi(me, te), me.return = X, X = me);
            }
            return x(X);
          case j:
            e: {
              for (Be = te.key; q !== null; ) {
                if (q.key === Be)
                  if (q.tag === 4 && q.stateNode.containerInfo === te.containerInfo && q.stateNode.implementation === te.implementation) {
                    r(
                      X,
                      q.sibling
                    ), me = d(q, te.children || []), me.return = X, X = me;
                    break e;
                  } else {
                    r(X, q);
                    break;
                  }
                else n(X, q);
                q = q.sibling;
              }
              me = Eu(te, X.mode, me), me.return = X, X = me;
            }
            return x(X);
          case A:
            return te = Ur(te), Et(
              X,
              q,
              te,
              me
            );
        }
        if (ie(te))
          return ke(
            X,
            q,
            te,
            me
          );
        if (J(te)) {
          if (Be = J(te), typeof Be != "function") throw Error(i(150));
          return te = Be.call(te), qe(
            X,
            q,
            te,
            me
          );
        }
        if (typeof te.then == "function")
          return Et(
            X,
            q,
            Jl(te),
            me
          );
        if (te.$$typeof === _)
          return Et(
            X,
            q,
            Kl(X, te),
            me
          );
        Wl(X, te);
      }
      return typeof te == "string" && te !== "" || typeof te == "number" || typeof te == "bigint" ? (te = "" + te, q !== null && q.tag === 6 ? (r(X, q.sibling), me = d(q, te), me.return = X, X = me) : (r(X, q), me = ju(te, X.mode, me), me.return = X, X = me), x(X)) : r(X, q);
    }
    return function(X, q, te, me) {
      try {
        Si = 0;
        var Be = Et(
          X,
          q,
          te,
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
  var Ir = jp(!0), Ep = jp(!1), Qa = !1;
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
    if (l = l.shared, (gt & 2) !== 0) {
      var d = l.pending;
      return d === null ? n.next = n : (n.next = d.next, d.next = n), l.pending = n, n = Fl(e), lp(e, null, r), n;
    }
    return Hl(e, l, n, r), Fl(e);
  }
  function ji(e, n, r) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (r & 4194048) !== 0)) {
      var l = n.lanes;
      l &= e.pendingLanes, r |= l, n.lanes = r, lt(e, r);
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
      var L = E, ne = L.next;
      L.next = null, x === null ? h = ne : x.next = ne, x = L;
      var ue = e.alternate;
      ue !== null && (ue = ue.updateQueue, E = ue.lastBaseUpdate, E !== x && (E === null ? ue.firstBaseUpdate = ne : E.next = ne, ue.lastBaseUpdate = L));
    }
    if (h !== null) {
      var pe = d.baseState;
      x = 0, ue = ne = L = null, E = h;
      do {
        var le = E.lane & -536870913, oe = le !== E.lane;
        if (oe ? (ot & le) === le : (l & le) === le) {
          le !== 0 && le === ys && (Bu = !0), ue !== null && (ue = ue.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var ke = e, qe = E;
            le = n;
            var Et = r;
            switch (qe.tag) {
              case 1:
                if (ke = qe.payload, typeof ke == "function") {
                  pe = ke.call(Et, pe, le);
                  break e;
                }
                pe = ke;
                break e;
              case 3:
                ke.flags = ke.flags & -65537 | 128;
              case 0:
                if (ke = qe.payload, le = typeof ke == "function" ? ke.call(Et, pe, le) : ke, le == null) break e;
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
          }, ue === null ? (ne = ue = oe, L = pe) : ue = ue.next = oe, x |= le;
        if (E = E.next, E === null) {
          if (E = d.shared.pending, E === null)
            break;
          oe = E, E = oe.next, oe.next = null, d.lastBaseUpdate = oe, d.shared.pending = null;
        }
      } while (!0);
      ue === null && (L = pe), d.baseState = L, d.firstBaseUpdate = ne, d.lastBaseUpdate = ue, h === null && (d.shared.lanes = 0), ar |= x, e.lanes = x, e.memoizedState = pe;
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
    e = La, re(eo, e), re(ws, n), La = e | n.baseLanes;
  }
  function Iu() {
    re(eo, La), re(ws, ws.current);
  }
  function Vu() {
    La = eo.current, ee(ws), ee(eo);
  }
  var Ln = k(null), Qn = null;
  function Wa(e) {
    var n = e.alternate;
    re(Yt, Yt.current & 1), re(Ln, e), Qn === null && (n === null || ws.current !== null || n.memoizedState !== null) && (Qn = e);
  }
  function qu(e) {
    re(Yt, Yt.current), re(Ln, e), Qn === null && (Qn = e);
  }
  function Rp(e) {
    e.tag === 22 ? (re(Yt, Yt.current), re(Ln, e), Qn === null && (Qn = e)) : er();
  }
  function er() {
    re(Yt, Yt.current), re(Ln, Ln.current);
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
  var Ra = 0, Xe = null, wt = null, en = null, no = !1, js = !1, Vr = !1, ao = 0, Ci = 0, Es = null, Cj = 0;
  function qt() {
    throw Error(i(321));
  }
  function Hu(e, n) {
    if (n === null) return !1;
    for (var r = 0; r < n.length && r < e.length; r++)
      if (!zn(e[r], n[r])) return !1;
    return !0;
  }
  function Fu(e, n, r, l, d, h) {
    return Ra = h, Xe = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, M.H = e === null || e.memoizedState === null ? dg : sd, Vr = !1, h = r(l, d), Vr = !1, js && (h = Mp(
      n,
      r,
      l,
      d
    )), _p(e), h;
  }
  function _p(e) {
    M.H = _i;
    var n = wt !== null && wt.next !== null;
    if (Ra = 0, en = wt = Xe = null, no = !1, Ci = 0, Es = null, n) throw Error(i(300));
    e === null || tn || (e = e.dependencies, e !== null && Yl(e) && (tn = !0));
  }
  function Mp(e, n, r, l) {
    Xe = e;
    var d = 0;
    do {
      if (js && (Es = null), Ci = 0, js = !1, 25 <= d) throw Error(i(301));
      if (d += 1, en = wt = null, e.updateQueue != null) {
        var h = e.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      M.H = fg, h = n(r, l);
    } while (js);
    return h;
  }
  function Tj() {
    var e = M.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? Ti(n) : n, e = e.useState()[0], (wt !== null ? wt.memoizedState : null) !== e && (Xe.flags |= 1024), n;
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
    Ra = 0, en = wt = Xe = null, js = !1, Ci = ao = 0, Es = null;
  }
  function En() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return en === null ? Xe.memoizedState = en = e : en = en.next = e, en;
  }
  function Kt() {
    if (wt === null) {
      var e = Xe.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = wt.next;
    var n = en === null ? Xe.memoizedState : en.next;
    if (n !== null)
      en = n, wt = e;
    else {
      if (e === null)
        throw Xe.alternate === null ? Error(i(467)) : Error(i(310));
      wt = e, e = {
        memoizedState: wt.memoizedState,
        baseState: wt.baseState,
        baseQueue: wt.baseQueue,
        queue: wt.queue,
        next: null
      }, en === null ? Xe.memoizedState = en = e : en = en.next = e;
    }
    return en;
  }
  function ro() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ti(e) {
    var n = Ci;
    return Ci += 1, Es === null && (Es = []), e = xp(Es, e, n), n = Xe, (en === null ? n.memoizedState : en.next) === null && (n = n.alternate, M.H = n === null || n.memoizedState === null ? dg : sd), e;
  }
  function so(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Ti(e);
      if (e.$$typeof === _) return fn(e);
    }
    throw Error(i(438, String(e)));
  }
  function Ku(e) {
    var n = null, r = Xe.updateQueue;
    if (r !== null && (n = r.memoCache), n == null) {
      var l = Xe.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (n = {
        data: l.data.map(function(d) {
          return d.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), r === null && (r = ro(), Xe.updateQueue = r), r.memoCache = n, r = n.data[n.index], r === void 0)
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
      var E = x = null, L = null, ne = n, ue = !1;
      do {
        var pe = ne.lane & -536870913;
        if (pe !== ne.lane ? (ot & pe) === pe : (Ra & pe) === pe) {
          var le = ne.revertLane;
          if (le === 0)
            L !== null && (L = L.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: ne.action,
              hasEagerState: ne.hasEagerState,
              eagerState: ne.eagerState,
              next: null
            }), pe === ys && (ue = !0);
          else if ((Ra & le) === le) {
            ne = ne.next, le === ys && (ue = !0);
            continue;
          } else
            pe = {
              lane: 0,
              revertLane: ne.revertLane,
              gesture: null,
              action: ne.action,
              hasEagerState: ne.hasEagerState,
              eagerState: ne.eagerState,
              next: null
            }, L === null ? (E = L = pe, x = h) : L = L.next = pe, Xe.lanes |= le, ar |= le;
          pe = ne.action, Vr && r(h, pe), h = ne.hasEagerState ? ne.eagerState : r(h, pe);
        } else
          le = {
            lane: pe,
            revertLane: ne.revertLane,
            gesture: ne.gesture,
            action: ne.action,
            hasEagerState: ne.hasEagerState,
            eagerState: ne.eagerState,
            next: null
          }, L === null ? (E = L = le, x = h) : L = L.next = le, Xe.lanes |= pe, ar |= pe;
        ne = ne.next;
      } while (ne !== null && ne !== n);
      if (L === null ? x = h : L.next = E, !zn(h, e.memoizedState) && (tn = !0, ue && (r = bs, r !== null)))
        throw r;
      e.memoizedState = h, e.baseState = x, e.baseQueue = L, l.lastRenderedState = h;
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
    var l = Xe, d = Kt(), h = ut;
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
    e.flags |= 16384, e = { getSnapshot: n, value: r }, n = Xe.updateQueue, n === null ? (n = ro(), Xe.updateQueue = n, n.stores = [e]) : (r = n.stores, r === null ? n.stores = [e] : r.push(e));
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
    var n = kr(e, 2);
    n !== null && Mn(n, e, 2);
  }
  function Zu(e) {
    var n = En();
    if (typeof e == "function") {
      var r = e;
      if (e = r(), Vr) {
        At(!0);
        try {
          r();
        } finally {
          At(!1);
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
  function Rj(e, n, r, l, d) {
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
      M.T !== null ? r(!0) : h.isTransition = !1, l(h), r = n.pending, r === null ? (h.next = n.pending = h, Up(n, h)) : (h.next = r.next, n.pending = r.next = h);
    }
  }
  function Up(e, n) {
    var r = n.action, l = n.payload, d = e.state;
    if (n.isTransition) {
      var h = M.T, x = {};
      M.T = x;
      try {
        var E = r(d, l), L = M.S;
        L !== null && L(x, E), Bp(e, n, E);
      } catch (ne) {
        Ju(e, n, ne);
      } finally {
        h !== null && x.types !== null && (h.types = x.types), M.T = h;
      }
    } else
      try {
        h = r(d, l), Bp(e, n, h);
      } catch (ne) {
        Ju(e, n, ne);
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
    if (ut) {
      var r = Tt.formState;
      if (r !== null) {
        e: {
          var l = Xe;
          if (ut) {
            if (Dt) {
              t: {
                for (var d = Dt, h = Xn; d.nodeType !== 8; ) {
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
                Dt = Zn(
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
      Xe,
      l
    ), l.dispatch = r, l = Zu(!1), h = rd.bind(
      null,
      Xe,
      !1,
      l.queue
    ), l = En(), d = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = d, r = Rj.bind(
      null,
      Xe,
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
    return r !== n.memoizedState && (Xe.flags |= 2048, Ns(
      9,
      { destroy: void 0 },
      _j.bind(null, d, r),
      null
    )), [l, h, e];
  }
  function _j(e, n) {
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
    return e = { tag: e, create: r, deps: l, inst: n, next: null }, n = Xe.updateQueue, n === null && (n = ro(), Xe.updateQueue = n), r = n.lastEffect, r === null ? n.lastEffect = e.next = e : (l = r.next, r.next = e, e.next = l, n.lastEffect = e), e;
  }
  function Yp() {
    return Kt().memoizedState;
  }
  function lo(e, n, r, l) {
    var d = En();
    Xe.flags |= e, d.memoizedState = Ns(
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
    wt !== null && l !== null && Hu(l, wt.memoizedState.deps) ? d.memoizedState = Ns(n, h, r, l) : (Xe.flags |= e, d.memoizedState = Ns(
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
  function Mj(e) {
    Xe.flags |= 4;
    var n = Xe.updateQueue;
    if (n === null)
      n = ro(), Xe.updateQueue = n, n.events = [e];
    else {
      var r = n.events;
      r === null ? n.events = [e] : r.push(e);
    }
  }
  function Xp(e) {
    var n = Kt().memoizedState;
    return Mj({ ref: n, nextImpl: e }), function() {
      if ((gt & 2) !== 0) throw Error(i(440));
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
    if (l = e(), Vr) {
      At(!0);
      try {
        e();
      } finally {
        At(!1);
      }
    }
    return r.memoizedState = [l, n], l;
  }
  function td(e, n, r) {
    return r === void 0 || (Ra & 1073741824) !== 0 && (ot & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = r, e = nv(), Xe.lanes |= e, ar |= e, r);
  }
  function ng(e, n, r, l) {
    return zn(r, n) ? r : ws.current !== null ? (e = td(e, r, l), zn(e, n) || (tn = !0), e) : (Ra & 42) === 0 || (Ra & 1073741824) !== 0 && (ot & 261930) === 0 ? (tn = !0, e.memoizedState = r) : (e = nv(), Xe.lanes |= e, ar |= e, n);
  }
  function ag(e, n, r, l, d) {
    var h = F.p;
    F.p = h !== 0 && 8 > h ? h : 8;
    var x = M.T, E = {};
    M.T = E, rd(e, !1, n, r);
    try {
      var L = d(), ne = M.S;
      if (ne !== null && ne(E, L), L !== null && typeof L == "object" && typeof L.then == "function") {
        var ue = Nj(
          L,
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
      F.p = h, x !== null && E.types !== null && (x.types = E.types), M.T = x;
    }
  }
  function Aj() {
  }
  function nd(e, n, r, l) {
    if (e.tag !== 5) throw Error(i(476));
    var d = rg(e).queue;
    ag(
      e,
      d,
      n,
      U,
      r === null ? Aj : function() {
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
  function kj(e) {
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
  function Dj(e, n, r) {
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
    return e === Xe || n !== null && n === Xe;
  }
  function cg(e, n) {
    js = no = !0;
    var r = e.pending;
    r === null ? n.next = n : (n.next = r.next, r.next = n), e.pending = n;
  }
  function ug(e, n, r) {
    if ((r & 4194048) !== 0) {
      var l = n.lanes;
      l &= e.pendingLanes, r |= l, n.lanes = r, lt(e, r);
    }
  }
  var _i = {
    readContext: fn,
    use: so,
    useCallback: qt,
    useContext: qt,
    useEffect: qt,
    useImperativeHandle: qt,
    useLayoutEffect: qt,
    useInsertionEffect: qt,
    useMemo: qt,
    useReducer: qt,
    useRef: qt,
    useState: qt,
    useDebugValue: qt,
    useDeferredValue: qt,
    useTransition: qt,
    useSyncExternalStore: qt,
    useId: qt,
    useHostTransitionStatus: qt,
    useFormState: qt,
    useActionState: qt,
    useOptimistic: qt,
    useMemoCache: qt,
    useCacheRefresh: qt
  };
  _i.useEffectEvent = qt;
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
      if (Vr) {
        At(!0);
        try {
          e();
        } finally {
          At(!1);
        }
      }
      return r.memoizedState = [l, n], l;
    },
    useReducer: function(e, n, r) {
      var l = En();
      if (r !== void 0) {
        var d = r(n);
        if (Vr) {
          At(!0);
          try {
            r(n);
          } finally {
            At(!1);
          }
        }
      } else d = n;
      return l.memoizedState = l.baseState = d, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: d
      }, l.queue = e, e = e.dispatch = Dj.bind(
        null,
        Xe,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var n = En();
      return e = { current: e }, n.memoizedState = e;
    },
    useState: function(e) {
      e = Zu(e);
      var n = e.queue, r = og.bind(null, Xe, n);
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
        Xe,
        e.queue,
        !0,
        !1
      ), En().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, r) {
      var l = Xe, d = En();
      if (ut) {
        if (r === void 0)
          throw Error(i(407));
        r = r();
      } else {
        if (r = n(), Tt === null)
          throw Error(i(349));
        (ot & 127) !== 0 || kp(l, n, r);
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
      if (ut) {
        var r = ga, l = pa;
        r = (l & ~(1 << 32 - Lt(l) - 1)).toString(32) + r, n = "_" + n + "R_" + r, r = ao++, 0 < r && (n += "H" + r.toString(32)), n += "_";
      } else
        r = Cj++, n = "_" + n + "r_" + r.toString(32) + "_";
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
        Xe,
        !0,
        r
      ), r.dispatch = n, [e, n];
    },
    useMemoCache: Ku,
    useCacheRefresh: function() {
      return En().memoizedState = kj.bind(
        null,
        Xe
      );
    },
    useEffectEvent: function(e) {
      var n = En(), r = { impl: e };
      return n.memoizedState = r, function() {
        if ((gt & 2) !== 0)
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
  function qr(e, n) {
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
  function zj(e, n, r, l, d) {
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
            return Qn === null ? jo() : r.alternate === null && Ht === 0 && (Ht = 3), r.flags &= -257, r.flags |= 65536, r.lanes = d, l === Zl ? r.flags |= 16384 : (n = r.updateQueue, n === null ? r.updateQueue = /* @__PURE__ */ new Set([l]) : n.add(l), Dd(e, l, d)), !1;
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
    if (ut)
      return n = Ln.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = d, l !== Tu && (e = Error(i(422), { cause: l }), yi(Gn(e, r)))) : (l !== Tu && (n = Error(i(423), {
        cause: l
      }), yi(
        Gn(n, r)
      )), e = e.current.alternate, e.flags |= 65536, d &= -d, e.lanes |= d, l = Gn(l, r), d = od(
        e.stateNode,
        l,
        d
      ), Uu(e, d), Ht !== 4 && (Ht = 2)), !1;
    var h = Error(i(520), { cause: l });
    if (h = Gn(h, r), $i === null ? $i = [h] : $i.push(h), Ht !== 4 && (Ht = 2), n === null) return !0;
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
    n.child = e === null ? Ep(n, null, r, l) : Ir(
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
    return Lr(n), l = Fu(
      e,
      n,
      r,
      x,
      h,
      d
    ), E = Pu(), e !== null && !tn ? (Gu(e, n, d), Ma(e, n, d)) : (ut && E && Nu(n), n.flags |= 1, hn(e, n, l, d), n.child);
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
    return Ir(n, e.child, null, r), e = fo(n, n.pendingProps), e.flags |= 2, $n(n), n.memoizedState = null, e;
  }
  function Oj(e, n, r) {
    var l = n.pendingProps, d = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (ut) {
        if (l.mode === "hidden")
          return e = fo(n, l), n.lanes = 536870912, Mi(null, e);
        if (qu(n), (e = Dt) ? (e = Uv(
          e,
          Xn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Ga !== null ? { id: pa, overflow: ga } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = cp(e), r.return = n, n.child = r, dn = n, Dt = null)) : e = null, e === null) throw Ka(n);
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
          throw h.retryLane = x, kr(e, x), Mn(l, e, x), cd;
        jo(), n = Cg(
          e,
          n,
          r
        );
      } else
        e = h.treeContext, Dt = Zn(x.nextSibling), dn = n, ut = !0, Ya = null, Xn = !1, e !== null && fp(n, e), n = fo(n, l), n.flags |= 4096;
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
    return Lr(n), r = Fu(
      e,
      n,
      r,
      l,
      void 0,
      d
    ), l = Pu(), e !== null && !tn ? (Gu(e, n, d), Ma(e, n, d)) : (ut && l && Nu(n), n.flags |= 1, hn(e, n, r, d), n.child);
  }
  function Tg(e, n, r, l, d, h) {
    return Lr(n), n.updateQueue = null, r = Mp(
      n,
      l,
      r,
      d
    ), _p(e), l = Pu(), e !== null && !tn ? (Gu(e, n, h), Ma(e, n, h)) : (ut && l && Nu(n), n.flags |= 1, hn(e, n, r, h), n.child);
  }
  function Rg(e, n, r, l, d) {
    if (Lr(n), n.stateNode === null) {
      var h = hs, x = r.contextType;
      typeof x == "object" && x !== null && (h = fn(x)), h = new r(l, h), n.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, h.updater = ld, n.stateNode = h, h._reactInternals = n, h = n.stateNode, h.props = l, h.state = n.memoizedState, h.refs = {}, Lu(n), x = r.contextType, h.context = typeof x == "object" && x !== null ? fn(x) : hs, h.state = n.memoizedState, x = r.getDerivedStateFromProps, typeof x == "function" && (id(
        n,
        r,
        x,
        l
      ), h.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (x = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), x !== h.state && ld.enqueueReplaceState(h, h.state, null), Ni(n, l, h, d), Ei(), h.state = n.memoizedState), typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !0;
    } else if (e === null) {
      h = n.stateNode;
      var E = n.memoizedProps, L = qr(r, E);
      h.props = L;
      var ne = h.context, ue = r.contextType;
      x = hs, typeof ue == "object" && ue !== null && (x = fn(ue));
      var pe = r.getDerivedStateFromProps;
      ue = typeof pe == "function" || typeof h.getSnapshotBeforeUpdate == "function", E = n.pendingProps !== E, ue || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (E || ne !== x) && mg(
        n,
        h,
        l,
        x
      ), Qa = !1;
      var le = n.memoizedState;
      h.state = le, Ni(n, l, h, d), Ei(), ne = n.memoizedState, E || le !== ne || Qa ? (typeof pe == "function" && (id(
        n,
        r,
        pe,
        l
      ), ne = n.memoizedState), (L = Qa || hg(
        n,
        r,
        L,
        l,
        le,
        ne,
        x
      )) ? (ue || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = l, n.memoizedState = ne), h.props = l, h.state = ne, h.context = x, l = L) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !1);
    } else {
      h = n.stateNode, $u(e, n), x = n.memoizedProps, ue = qr(r, x), h.props = ue, pe = n.pendingProps, le = h.context, ne = r.contextType, L = hs, typeof ne == "object" && ne !== null && (L = fn(ne)), E = r.getDerivedStateFromProps, (ne = typeof E == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (x !== pe || le !== L) && mg(
        n,
        h,
        l,
        L
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
        L
      ) || e !== null && e.dependencies !== null && Yl(e.dependencies)) ? (ne || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(l, oe, L), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(
        l,
        oe,
        L
      )), typeof h.componentDidUpdate == "function" && (n.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || x === e.memoizedProps && le === e.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && le === e.memoizedState || (n.flags |= 1024), n.memoizedProps = l, n.memoizedState = oe), h.props = l, h.state = oe, h.context = L, l = ue) : (typeof h.componentDidUpdate != "function" || x === e.memoizedProps && le === e.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && le === e.memoizedState || (n.flags |= 1024), l = !1);
    }
    return h = l, ho(e, n), l = (n.flags & 128) !== 0, h || l ? (h = n.stateNode, r = l && typeof r.getDerivedStateFromError != "function" ? null : h.render(), n.flags |= 1, e !== null && l ? (n.child = Ir(
      n,
      e.child,
      null,
      d
    ), n.child = Ir(
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
    return zr(), n.flags |= 256, hn(e, n, r, l), n.child;
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
      if (ut) {
        if (d ? Wa(n) : er(), (e = Dt) ? (e = Uv(
          e,
          Xn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Ga !== null ? { id: pa, overflow: ga } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = cp(e), r.return = n, n.child = r, dn = n, Dt = null)) : e = null, e === null) throw Ka(n);
        return Xd(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var E = l.children;
      return l = l.fallback, d ? (er(), d = n.mode, E = mo(
        { mode: "hidden", children: E },
        d
      ), l = Dr(
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
    var L = e.memoizedState;
    if (L !== null && (E = L.dehydrated, E !== null)) {
      if (h)
        n.flags & 256 ? (Wa(n), n.flags &= -257, n = pd(
          e,
          n,
          r
        )) : n.memoizedState !== null ? (er(), n.child = e.child, n.flags |= 128, n = null) : (er(), E = l.fallback, d = n.mode, l = mo(
          { mode: "visible", children: l.children },
          d
        ), E = Dr(
          E,
          d,
          r,
          null
        ), E.flags |= 2, l.return = n, E.return = n, l.sibling = E, n.child = l, Ir(
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
        if (x = E.nextSibling && E.nextSibling.dataset, x) var ne = x.dgst;
        x = ne, l = Error(i(419)), l.stack = "", l.digest = x, yi({ value: l, source: null, stack: null }), n = pd(
          e,
          n,
          r
        );
      } else if (tn || vs(e, n, r, !1), x = (r & e.childLanes) !== 0, tn || x) {
        if (x = Tt, x !== null && (l = z(x, r), l !== 0 && l !== L.retryLane))
          throw L.retryLane = l, kr(e, l), Mn(x, e, l), cd;
        Kd(E) || jo(), n = pd(
          e,
          n,
          r
        );
      } else
        Kd(E) ? (n.flags |= 192, n.child = e.child, n = null) : (e = L.treeContext, Dt = Zn(
          E.nextSibling
        ), dn = n, ut = !0, Ya = null, Xn = !1, e !== null && fp(n, e), n = md(
          n,
          l.children
        ), n.flags |= 4096);
      return n;
    }
    return d ? (er(), E = l.fallback, d = n.mode, L = e.child, ne = L.sibling, l = Ea(L, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = L.subtreeFlags & 65011712, ne !== null ? E = Ea(
      ne,
      E
    ) : (E = Dr(
      E,
      d,
      r,
      null
    ), E.flags |= 2), E.return = n, l.return = n, l.sibling = E, n.child = l, Mi(null, l), l = n.child, E = e.child.memoizedState, E === null ? E = fd(r) : (d = E.cachePool, d !== null ? (L = Wt._currentValue, d = d.parent !== L ? { parent: L, pool: L } : d) : d = yp(), E = {
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
    return Ir(n, e.child, null, r), e = md(
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
    if (E ? (x = x & 1 | 2, n.flags |= 128) : x &= 1, re(Yt, x), hn(e, n, l, r), l = ut ? vi : 0, !E && e !== null && (e.flags & 128) !== 0)
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
  function Lj(e, n, r) {
    switch (n.tag) {
      case 3:
        ye(n, n.stateNode.containerInfo), Xa(n, Wt, e.memoizedState.cache), zr();
        break;
      case 27:
      case 5:
        st(n);
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
        if (d = n.memoizedState, d !== null && (d.rendering = null, d.tail = null, d.lastEffect = null), re(Yt, Yt.current), l) break;
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
          return tn = !1, Lj(
            e,
            n,
            r
          );
        tn = (e.flags & 131072) !== 0;
      }
    else
      tn = !1, ut && (n.flags & 1048576) !== 0 && dp(n, vi, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var l = n.pendingProps;
          if (e = Ur(n.elementType), n.type = e, typeof e == "function")
            wu(e) ? (l = qr(e, l), n.tag = 1, n = Rg(
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
              } else if (d === ae) {
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
        return l = n.type, d = qr(
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
              for (Dt = Zn(e.firstChild), dn = n, ut = !0, Ya = null, Xn = !0, r = Ep(
                n,
                null,
                l,
                r
              ), n.child = r; r; )
                r.flags = r.flags & -3 | 4096, r = r.sibling;
            }
          else {
            if (zr(), l === d) {
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
        )) ? n.memoizedState = r : ut || (r = n.type, e = n.pendingProps, l = Mo(
          W.current
        ).createElement(r), l[Ne] = n, l[Ce] = e, mn(l, r, e), _t(l), n.stateNode = l) : n.memoizedState = Fv(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return st(n), e === null && ut && (l = n.stateNode = Vv(
          n.type,
          n.pendingProps,
          W.current
        ), dn = n, Xn = !0, d = Dt, or(n.type) ? (Qd = d, Dt = Zn(l.firstChild)) : Dt = d), hn(
          e,
          n,
          n.pendingProps.children,
          r
        ), ho(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && ut && ((d = l = Dt) && (l = fE(
          l,
          n.type,
          n.pendingProps,
          Xn
        ), l !== null ? (n.stateNode = l, dn = n, Dt = Zn(l.firstChild), Xn = !1, d = !0) : d = !1), d || Ka(n)), st(n), d = n.type, h = n.pendingProps, x = e !== null ? e.memoizedProps : null, l = h.children, Pd(d, h) ? l = null : x !== null && Pd(d, x) && (n.flags |= 32), n.memoizedState !== null && (d = Fu(
          e,
          n,
          Tj,
          null,
          null,
          r
        ), Pi._currentValue = d), ho(e, n), hn(e, n, l, r), n.child;
      case 6:
        return e === null && ut && ((e = r = Dt) && (r = hE(
          r,
          n.pendingProps,
          Xn
        ), r !== null ? (n.stateNode = r, dn = n, Dt = null, e = !0) : e = !1), e || Ka(n)), null;
      case 13:
        return Mg(e, n, r);
      case 4:
        return ye(
          n,
          n.stateNode.containerInfo
        ), l = n.pendingProps, e === null ? n.child = Ir(
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
        return d = n.type._context, l = n.pendingProps.children, Lr(n), d = fn(d), l = l(d), n.flags |= 1, hn(e, n, l, r), n.child;
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
        return Oj(e, n, r);
      case 22:
        return Eg(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        return Lr(n), l = fn(Wt), e === null ? (d = zu(), d === null && (d = Tt, h = ku(), d.pooledCache = h, h.refCount++, h !== null && (d.pooledCacheLanes |= r), d = h), n.memoizedState = { parent: l, cache: d }, Lu(n), Xa(n, Wt, d)) : ((e.lanes & r) !== 0 && ($u(e, n), Ni(n, null, null, r), Ei()), d = e.memoizedState, h = n.memoizedState, d.parent !== l ? (d = { parent: l, cache: l }, n.memoizedState = d, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = d), Xa(n, Wt, l)) : (l = h.cache, Xa(n, Wt, l), l !== d.cache && Au(
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
          throw Br = Zl, Ou;
    } else e.flags &= -16777217;
  }
  function zg(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Xv(n))
      if (iv()) e.flags |= 8192;
      else
        throw Br = Zl, Ou;
  }
  function po(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? be() : 536870912, e.lanes |= n, _s |= n);
  }
  function Ai(e, n) {
    if (!ut)
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
  function zt(e) {
    var n = e.alternate !== null && e.alternate.child === e.child, r = 0, l = 0;
    if (n)
      for (var d = e.child; d !== null; )
        r |= d.lanes | d.childLanes, l |= d.subtreeFlags & 65011712, l |= d.flags & 65011712, d.return = e, d = d.sibling;
    else
      for (d = e.child; d !== null; )
        r |= d.lanes | d.childLanes, l |= d.subtreeFlags, l |= d.flags, d.return = e, d = d.sibling;
    return e.subtreeFlags |= l, e.childLanes = r, n;
  }
  function $j(e, n, r) {
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
        return zt(n), null;
      case 1:
        return zt(n), null;
      case 3:
        return r = n.stateNode, l = null, e !== null && (l = e.memoizedState.cache), n.memoizedState.cache !== l && (n.flags |= 2048), Ta(Wt), Me(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (gs(n) ? Aa(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Ru())), zt(n), null;
      case 26:
        var d = n.type, h = n.memoizedState;
        return e === null ? (Aa(n), h !== null ? (zt(n), zg(n, h)) : (zt(n), yd(
          n,
          d,
          null,
          l,
          r
        ))) : h ? h !== e.memoizedState ? (Aa(n), zt(n), zg(n, h)) : (zt(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== l && Aa(n), zt(n), yd(
          n,
          d,
          e,
          l,
          r
        )), null;
      case 27:
        if (Te(n), r = W.current, d = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== l && Aa(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(i(166));
            return zt(n), null;
          }
          e = K.current, gs(n) ? hp(n) : (e = Vv(d, l, r), n.stateNode = e, Aa(n));
        }
        return zt(n), null;
      case 5:
        if (Te(n), d = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== l && Aa(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(i(166));
            return zt(n), null;
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
            h[Ne] = n, h[Ce] = l;
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
        return zt(n), yd(
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
            e[Ne] = n, e = !!(e.nodeValue === r || l !== null && l.suppressHydrationWarning === !0 || Mv(e.nodeValue, r)), e || Ka(n, !0);
          } else
            e = Mo(e).createTextNode(
              l
            ), e[Ne] = n, n.stateNode = e;
        }
        return zt(n), null;
      case 31:
        if (r = n.memoizedState, e === null || e.memoizedState !== null) {
          if (l = gs(n), r !== null) {
            if (e === null) {
              if (!l) throw Error(i(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(557));
              e[Ne] = n;
            } else
              zr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            zt(n), e = !1;
          } else
            r = Ru(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = r), e = !0;
          if (!e)
            return n.flags & 256 ? ($n(n), n) : ($n(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(i(558));
        }
        return zt(n), null;
      case 13:
        if (l = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (d = gs(n), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!d) throw Error(i(318));
              if (d = n.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(i(317));
              d[Ne] = n;
            } else
              zr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            zt(n), d = !1;
          } else
            d = Ru(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = d), d = !0;
          if (!d)
            return n.flags & 256 ? ($n(n), n) : ($n(n), null);
        }
        return $n(n), (n.flags & 128) !== 0 ? (n.lanes = r, n) : (r = l !== null, e = e !== null && e.memoizedState !== null, r && (l = n.child, d = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (d = l.alternate.memoizedState.cachePool.pool), h = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (h = l.memoizedState.cachePool.pool), h !== d && (l.flags |= 2048)), r !== e && r && (n.child.flags |= 8192), po(n, n.updateQueue), zt(n), null);
      case 4:
        return Me(), e === null && Id(n.stateNode.containerInfo), zt(n), null;
      case 10:
        return Ta(n.type), zt(n), null;
      case 19:
        if (ee(Yt), l = n.memoizedState, l === null) return zt(n), null;
        if (d = (n.flags & 128) !== 0, h = l.rendering, h === null)
          if (d) Ai(l, !1);
          else {
            if (Ht !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (h = to(e), h !== null) {
                  for (n.flags |= 128, Ai(l, !1), e = h.updateQueue, n.updateQueue = e, po(n, e), n.subtreeFlags = 0, e = r, r = n.child; r !== null; )
                    op(r, e), r = r.sibling;
                  return re(
                    Yt,
                    Yt.current & 1 | 2
                  ), ut && Na(n, l.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            l.tail !== null && yt() > xo && (n.flags |= 128, d = !0, Ai(l, !1), n.lanes = 4194304);
          }
        else {
          if (!d)
            if (e = to(h), e !== null) {
              if (n.flags |= 128, d = !0, e = e.updateQueue, n.updateQueue = e, po(n, e), Ai(l, !0), l.tail === null && l.tailMode === "hidden" && !h.alternate && !ut)
                return zt(n), null;
            } else
              2 * yt() - l.renderingStartTime > xo && r !== 536870912 && (n.flags |= 128, d = !0, Ai(l, !1), n.lanes = 4194304);
          l.isBackwards ? (h.sibling = n.child, n.child = h) : (e = l.last, e !== null ? e.sibling = h : n.child = h, l.last = h);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = yt(), e.sibling = null, r = Yt.current, re(
          Yt,
          d ? r & 1 | 2 : r & 1
        ), ut && Na(n, l.treeForkCount), e) : (zt(n), null);
      case 22:
      case 23:
        return $n(n), Vu(), l = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (n.flags |= 8192) : l && (n.flags |= 8192), l ? (r & 536870912) !== 0 && (n.flags & 128) === 0 && (zt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : zt(n), r = n.updateQueue, r !== null && po(n, r.retryQueue), r = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== r && (n.flags |= 2048), e !== null && ee($r), null;
      case 24:
        return r = null, e !== null && (r = e.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), Ta(Wt), zt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(i(156, n.tag));
  }
  function Uj(e, n) {
    switch (Cu(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return Ta(Wt), Me(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Te(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if ($n(n), n.alternate === null)
            throw Error(i(340));
          zr();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 13:
        if ($n(n), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(i(340));
          zr();
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
        return $n(n), Vu(), e !== null && ee($r), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
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
        Te(n);
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
        $n(n), Vu(), e !== null && ee($r);
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
              var L = r, ne = E;
              try {
                ne();
              } catch (ue) {
                xt(
                  d,
                  L,
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
    r.props = qr(
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
      iE(l, e.type, r, n), l[Ce] = n;
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
      mn(n, l, r), n[Ne] = e, n[Ce] = r;
    } catch (h) {
      xt(e, e.return, h);
    }
  }
  var ka = !1, nn = !1, wd = !1, Vg = typeof WeakSet == "function" ? WeakSet : Set, cn = null;
  function Bj(e, n) {
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
            var x = 0, E = -1, L = -1, ne = 0, ue = 0, pe = e, le = null;
            t: for (; ; ) {
              for (var oe; pe !== r || d !== 0 && pe.nodeType !== 3 || (E = x + d), pe !== h || l !== 0 && pe.nodeType !== 3 || (L = x + l), pe.nodeType === 3 && (x += pe.nodeValue.length), (oe = pe.firstChild) !== null; )
                le = pe, pe = oe;
              for (; ; ) {
                if (pe === e) break t;
                if (le === r && ++ne === d && (E = x), le === h && ++ue === l && (L = x), (oe = pe.nextSibling) !== null) break;
                pe = le, le = pe.parentNode;
              }
              pe = oe;
            }
            r = E === -1 || L === -1 ? null : { start: E, end: L };
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
                  var ke = qr(
                    r.type,
                    d
                  );
                  e = l.getSnapshotBeforeUpdate(
                    ke,
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
            var d = qr(
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
        za(e, r), l & 4 && Gg(e, r), l & 64 && (e = r.memoizedState, e !== null && (e = e.dehydrated, e !== null && (r = Kj.bind(
          null,
          r
        ), mE(e, r))));
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
  function Ij(e) {
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
    var r = Ij(e);
    n.forEach(function(l) {
      if (!r.has(l)) {
        r.add(l);
        var d = Xj.bind(null, e, l);
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
                      h = d.getElementsByTagName("title")[0], (!h || h[Je] || h[Ne] || h.namespaceURI === "http://www.w3.org/2000/svg" || h.hasAttribute("itemprop")) && (h = d.createElement(l), d.head.insertBefore(
                        h,
                        d.querySelector("head > title")
                      )), mn(h, l, r), h[Ne] = e, _t(h), l = h;
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
                  h[Ne] = e, _t(h), l = h;
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
        Tn(n, e), Rn(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (bo = yt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, vo(e, l)));
        break;
      case 22:
        d = e.memoizedState !== null;
        var L = r !== null && r.memoizedState !== null, ne = ka, ue = nn;
        if (ka = ne || d, nn = ue || L, Tn(n, e), nn = ue, ka = ne, Rn(e), l & 8192)
          e: for (n = e.stateNode, n._visibility = d ? n._visibility & -2 : n._visibility | 1, d && (r === null || L || ka || nn || Hr(e)), r = null, n = e; ; ) {
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
                } catch (ke) {
                  xt(L, L.return, ke);
                }
              }
            } else if (n.tag === 6) {
              if (r === null) {
                L = n;
                try {
                  L.stateNode.nodeValue = d ? "" : L.memoizedProps;
                } catch (ke) {
                  xt(L, L.return, ke);
                }
              }
            } else if (n.tag === 18) {
              if (r === null) {
                L = n;
                try {
                  var oe = L.stateNode;
                  d ? $v(oe, !0) : $v(L.stateNode, !1);
                } catch (ke) {
                  xt(L, L.return, ke);
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
            var L = r.stateNode.containerInfo, ne = xd(e);
            Sd(
              e,
              ne,
              L
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
  function Hr(e) {
    for (e = e.child; e !== null; ) {
      var n = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          tr(4, n, n.return), Hr(n);
          break;
        case 1:
          va(n, n.return);
          var r = n.stateNode;
          typeof r.componentWillUnmount == "function" && $g(
            n,
            n.return,
            r
          ), Hr(n);
          break;
        case 27:
          qi(n.stateNode);
        case 26:
        case 5:
          va(n, n.return), Hr(n);
          break;
        case 22:
          n.memoizedState === null && Hr(n);
          break;
        case 30:
          Hr(n);
          break;
        default:
          Hr(n);
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
            } catch (ne) {
              xt(l, l.return, ne);
            }
          if (l = h, d = l.updateQueue, d !== null) {
            var E = l.stateNode;
            try {
              var L = d.shared.hiddenCallbacks;
              if (L !== null)
                for (d.shared.hiddenCallbacks = null, d = 0; d < L.length; d++)
                  Np(L[d], E);
            } catch (ne) {
              xt(l, l.return, ne);
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
      var h = e, x = n, E = r, L = l, ne = x.flags;
      switch (x.tag) {
        case 0:
        case 11:
        case 15:
          Cs(
            h,
            x,
            E,
            L,
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
            L,
            d
          ) : zi(
            h,
            x
          ) : (ue._visibility |= 2, Cs(
            h,
            x,
            E,
            L,
            d
          )), d && ne & 2048 && jd(
            x.alternate,
            x
          );
          break;
        case 24:
          Cs(
            h,
            x,
            E,
            L,
            d
          ), d && ne & 2048 && Ed(x.alternate, x);
          break;
        default:
          Cs(
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
        ), e.flags & Oi && e.memoizedState !== null && CE(
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
  var Vj = {
    getCacheForType: function(e) {
      var n = fn(Wt), r = n.data.get(e);
      return r === void 0 && (r = e(), n.data.set(e, r)), r;
    },
    cacheSignal: function() {
      return fn(Wt).controller.signal;
    }
  }, qj = typeof WeakMap == "function" ? WeakMap : Map, gt = 0, Tt = null, at = null, ot = 0, bt = 0, Un = null, nr = !1, Rs = !1, Nd = !1, La = 0, Ht = 0, ar = 0, Fr = 0, Cd = 0, Bn = 0, _s = 0, $i = null, _n = null, Td = !1, bo = 0, ev = 0, xo = 1 / 0, So = null, rr = null, ln = 0, sr = null, Ms = null, $a = 0, Rd = 0, _d = null, tv = null, Ui = 0, Md = null;
  function In() {
    return (gt & 2) !== 0 && ot !== 0 ? ot & -ot : M.T !== null ? Ld() : ve();
  }
  function nv() {
    if (Bn === 0)
      if ((ot & 536870912) === 0 || ut) {
        var e = sn;
        sn <<= 1, (sn & 3932160) === 0 && (sn = 262144), Bn = e;
      } else Bn = 536870912;
    return e = Ln.current, e !== null && (e.flags |= 32), Bn;
  }
  function Mn(e, n, r) {
    (e === Tt && (bt === 2 || bt === 9) || e.cancelPendingCommit !== null) && (As(e, 0), ir(
      e,
      ot,
      Bn,
      !1
    )), Ue(e, r), ((gt & 2) === 0 || e !== Tt) && (e === Tt && ((gt & 2) === 0 && (Fr |= r), Ht === 4 && ir(
      e,
      ot,
      Bn,
      !1
    )), ya(e));
  }
  function av(e, n, r) {
    if ((gt & 6) !== 0) throw Error(i(327));
    var l = !r && (n & 127) === 0 && (n & e.expiredLanes) === 0 || O(e, n), d = l ? Pj(e, n) : kd(e, n, !0), h = l;
    do {
      if (d === 0) {
        Rs && !l && ir(e, n, 0, !1);
        break;
      } else {
        if (r = e.current.alternate, h && !Hj(r)) {
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
              var L = E.current.memoizedState.isDehydrated;
              if (L && (As(E, x).flags |= 256), x = kd(
                E,
                x,
                !1
              ), x !== 2) {
                if (Nd && !L) {
                  E.errorRecoveryDisabledLanes |= h, Fr |= h, d = 4;
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
          if ((n & 62914560) === n && (d = bo + 300 - yt(), 10 < d)) {
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
                Fr,
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
            Fr,
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
  function rv(e, n, r, l, d, h, x, E, L, ne, ue, pe, le, oe) {
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
      var ke = (h & 62914560) === h ? bo - yt() : (h & 4194048) === h ? ev - yt() : 0;
      if (ke = TE(
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
            L,
            ue,
            pe,
            null,
            le,
            oe
          )
        ), ir(e, h, x, !ne);
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
      L
    );
  }
  function Hj(e) {
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
    n &= ~Cd, n &= ~Fr, e.suspendedLanes |= n, e.pingedLanes &= ~n, l && (e.warmLanes |= n), l = e.expirationTimes;
    for (var d = n; 0 < d; ) {
      var h = 31 - Lt(d), x = 1 << h;
      l[h] = -1, d &= ~x;
    }
    r !== 0 && Vt(e, r, n);
  }
  function wo() {
    return (gt & 6) === 0 ? (Bi(0), !1) : !0;
  }
  function Ad() {
    if (at !== null) {
      if (bt === 0)
        var e = at.return;
      else
        e = at, Ca = Or = null, Yu(e), Ss = null, Si = 0, e = at;
      for (; e !== null; )
        Og(e.alternate, e), e = e.return;
      at = null;
    }
  }
  function As(e, n) {
    var r = e.timeoutHandle;
    r !== -1 && (e.timeoutHandle = -1, cE(r)), r = e.cancelPendingCommit, r !== null && (e.cancelPendingCommit = null, r()), $a = 0, Ad(), Tt = e, at = r = Ea(e.current, null), ot = n, bt = 0, Un = null, nr = !1, Rs = O(e, n), Nd = !1, _s = Bn = Cd = Fr = ar = Ht = 0, _n = $i = null, Td = !1, (n & 8) !== 0 && (n |= n & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= n; 0 < l; ) {
        var d = 31 - Lt(l), h = 1 << d;
        n |= e[d], l &= ~h;
      }
    return La = n, ql(), r;
  }
  function sv(e, n) {
    Xe = null, M.H = _i, n === xs || n === Ql ? (n = Sp(), bt = 3) : n === Ou ? (n = Sp(), bt = 4) : bt = n === cd ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Un = n, at === null && (Ht = 1, uo(
      e,
      Gn(n, e.current)
    ));
  }
  function iv() {
    var e = Ln.current;
    return e === null ? !0 : (ot & 4194048) === ot ? Qn === null : (ot & 62914560) === ot || (ot & 536870912) !== 0 ? e === Qn : !1;
  }
  function lv() {
    var e = M.H;
    return M.H = _i, e === null ? _i : e;
  }
  function ov() {
    var e = M.A;
    return M.A = Vj, e;
  }
  function jo() {
    Ht = 4, nr || (ot & 4194048) !== ot && Ln.current !== null || (Rs = !0), (ar & 134217727) === 0 && (Fr & 134217727) === 0 || Tt === null || ir(
      Tt,
      ot,
      Bn,
      !1
    );
  }
  function kd(e, n, r) {
    var l = gt;
    gt |= 2;
    var d = lv(), h = ov();
    (Tt !== e || ot !== n) && (So = null, As(e, n)), n = !1;
    var x = Ht;
    e: do
      try {
        if (bt !== 0 && at !== null) {
          var E = at, L = Un;
          switch (bt) {
            case 8:
              Ad(), x = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Ln.current === null && (n = !0);
              var ne = bt;
              if (bt = 0, Un = null, ks(e, E, L, ne), r && Rs) {
                x = 0;
                break e;
              }
              break;
            default:
              ne = bt, bt = 0, Un = null, ks(e, E, L, ne);
          }
        }
        Fj(), x = Ht;
        break;
      } catch (ue) {
        sv(e, ue);
      }
    while (!0);
    return n && e.shellSuspendCounter++, Ca = Or = null, gt = l, M.H = d, M.A = h, at === null && (Tt = null, ot = 0, ql()), x;
  }
  function Fj() {
    for (; at !== null; ) cv(at);
  }
  function Pj(e, n) {
    var r = gt;
    gt |= 2;
    var l = lv(), d = ov();
    Tt !== e || ot !== n ? (So = null, xo = yt() + 500, As(e, n)) : Rs = O(
      e,
      n
    );
    e: do
      try {
        if (bt !== 0 && at !== null) {
          n = at;
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
              switch (at.tag) {
                case 26:
                  x = at.memoizedState;
                case 5:
                case 27:
                  var E = at;
                  if (x ? Xv(x) : E.stateNode.complete) {
                    bt = 0, Un = null;
                    var L = E.sibling;
                    if (L !== null) at = L;
                    else {
                      var ne = E.return;
                      ne !== null ? (at = ne, Eo(ne)) : at = null;
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
              Ad(), Ht = 6;
              break e;
            default:
              throw Error(i(462));
          }
        }
        Gj();
        break;
      } catch (ue) {
        sv(e, ue);
      }
    while (!0);
    return Ca = Or = null, M.H = l, M.A = d, gt = r, at !== null ? 0 : (Tt = null, ot = 0, ql(), Ht);
  }
  function Gj() {
    for (; at !== null && !Pe(); )
      cv(at);
  }
  function cv(e) {
    var n = Dg(e.alternate, e, La);
    e.memoizedProps = e.pendingProps, n === null ? Eo(e) : at = n;
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
          ot
        );
        break;
      case 11:
        n = Tg(
          r,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          ot
        );
        break;
      case 5:
        Yu(n);
      default:
        Og(r, n), n = at = op(n, La), n = Dg(r, n, La);
    }
    e.memoizedProps = e.pendingProps, n === null ? Eo(e) : at = n;
  }
  function ks(e, n, r, l) {
    Ca = Or = null, Yu(n), Ss = null, Si = 0;
    var d = n.return;
    try {
      if (zj(
        e,
        d,
        n,
        r,
        ot
      )) {
        Ht = 1, uo(
          e,
          Gn(r, e.current)
        ), at = null;
        return;
      }
    } catch (h) {
      if (d !== null) throw at = d, h;
      Ht = 1, uo(
        e,
        Gn(r, e.current)
      ), at = null;
      return;
    }
    n.flags & 32768 ? (ut || l === 1 ? e = !0 : Rs || (ot & 536870912) !== 0 ? e = !1 : (nr = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = Ln.current, l !== null && l.tag === 13 && (l.flags |= 16384))), dv(n, e)) : Eo(n);
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
      var r = $j(
        n.alternate,
        n,
        La
      );
      if (r !== null) {
        at = r;
        return;
      }
      if (n = n.sibling, n !== null) {
        at = n;
        return;
      }
      at = n = e;
    } while (n !== null);
    Ht === 0 && (Ht = 5);
  }
  function dv(e, n) {
    do {
      var r = Uj(e.alternate, e);
      if (r !== null) {
        r.flags &= 32767, at = r;
        return;
      }
      if (r = e.return, r !== null && (r.flags |= 32768, r.subtreeFlags = 0, r.deletions = null), !n && (e = e.sibling, e !== null)) {
        at = e;
        return;
      }
      at = e = r;
    } while (e !== null);
    Ht = 6, at = null;
  }
  function fv(e, n, r, l, d, h, x, E, L) {
    e.cancelPendingCommit = null;
    do
      No();
    while (ln !== 0);
    if ((gt & 6) !== 0) throw Error(i(327));
    if (n !== null) {
      if (n === e.current) throw Error(i(177));
      if (h = n.lanes | n.childLanes, h |= xu, it(
        e,
        r,
        h,
        x,
        E,
        L
      ), e === Tt && (at = Tt = null, ot = 0), Ms = n, sr = e, $a = r, Rd = h, _d = d, tv = l, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Qj(Fe, function() {
        return vv(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || l) {
        l = M.T, M.T = null, d = F.p, F.p = 2, x = gt, gt |= 4;
        try {
          Bj(e, n, r);
        } finally {
          gt = x, F.p = d, M.T = l;
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
        r = M.T, M.T = null;
        var l = F.p;
        F.p = 2;
        var d = gt;
        gt |= 4;
        try {
          Yg(n, e);
          var h = Fd, x = Wm(e.containerInfo), E = h.focusedElem, L = h.selectionRange;
          if (x !== E && E && E.ownerDocument && Jm(
            E.ownerDocument.documentElement,
            E
          )) {
            if (L !== null && pu(E)) {
              var ne = L.start, ue = L.end;
              if (ue === void 0 && (ue = ne), "selectionStart" in E)
                E.selectionStart = ne, E.selectionEnd = Math.min(
                  ue,
                  E.value.length
                );
              else {
                var pe = E.ownerDocument || document, le = pe && pe.defaultView || window;
                if (le.getSelection) {
                  var oe = le.getSelection(), ke = E.textContent.length, qe = Math.min(L.start, ke), Et = L.end === void 0 ? qe : Math.min(L.end, ke);
                  !oe.extend && qe > Et && (x = Et, Et = qe, qe = x);
                  var X = Zm(
                    E,
                    qe
                  ), q = Zm(
                    E,
                    Et
                  );
                  if (X && q && (oe.rangeCount !== 1 || oe.anchorNode !== X.node || oe.anchorOffset !== X.offset || oe.focusNode !== q.node || oe.focusOffset !== q.offset)) {
                    var te = pe.createRange();
                    te.setStart(X.node, X.offset), oe.removeAllRanges(), qe > Et ? (oe.addRange(te), oe.extend(q.node, q.offset)) : (te.setEnd(q.node, q.offset), oe.addRange(te));
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
          gt = d, F.p = l, M.T = r;
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
        r = M.T, M.T = null;
        var l = F.p;
        F.p = 2;
        var d = gt;
        gt |= 4;
        try {
          qg(e, n.alternate, n);
        } finally {
          gt = d, F.p = l, M.T = r;
        }
      }
      ln = 3;
    }
  }
  function pv() {
    if (ln === 4 || ln === 3) {
      ln = 0, vt();
      var e = sr, n = Ms, r = $a, l = tv;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? ln = 5 : (ln = 0, Ms = sr = null, gv(e, e.pendingLanes));
      var d = e.pendingLanes;
      if (d === 0 && (rr = null), Z(r), n = n.stateNode, Pt && typeof Pt.onCommitFiberRoot == "function")
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
        n = M.T, d = F.p, F.p = 2, M.T = null;
        try {
          for (var h = e.onRecoverableError, x = 0; x < l.length; x++) {
            var E = l[x];
            h(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          M.T = n, F.p = d;
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
    var r = Z($a), l = M.T, d = F.p;
    try {
      F.p = 32 > r ? 32 : r, M.T = null, r = _d, _d = null;
      var h = sr, x = $a;
      if (ln = 0, Ms = sr = null, $a = 0, (gt & 6) !== 0) throw Error(i(331));
      var E = gt;
      if (gt |= 4, Jg(h.current), Xg(
        h,
        h.current,
        x,
        r
      ), gt = E, Bi(0, !1), Pt && typeof Pt.onPostCommitFiberRoot == "function")
        try {
          Pt.onPostCommitFiberRoot(wn, h);
        } catch {
        }
      return !0;
    } finally {
      F.p = d, M.T = l, gv(e, n);
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
      l = e.pingCache = new qj();
      var d = /* @__PURE__ */ new Set();
      l.set(n, d);
    } else
      d = l.get(n), d === void 0 && (d = /* @__PURE__ */ new Set(), l.set(n, d));
    d.has(r) || (Nd = !0, d.add(r), e = Yj.bind(null, e, n, r), n.then(e, e));
  }
  function Yj(e, n, r) {
    var l = e.pingCache;
    l !== null && l.delete(n), e.pingedLanes |= e.suspendedLanes & r, e.warmLanes &= ~r, Tt === e && (ot & r) === r && (Ht === 4 || Ht === 3 && (ot & 62914560) === ot && 300 > yt() - bo ? (gt & 2) === 0 && As(e, 0) : Cd |= r, _s === ot && (_s = 0)), ya(e);
  }
  function bv(e, n) {
    n === 0 && (n = be()), e = kr(e, n), e !== null && (Ue(e, n), ya(e));
  }
  function Kj(e) {
    var n = e.memoizedState, r = 0;
    n !== null && (r = n.retryLane), bv(e, r);
  }
  function Xj(e, n) {
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
  function Qj(e, n) {
    return ft(e, n);
  }
  var Co = null, Ds = null, zd = !1, To = !1, Od = !1, lr = 0;
  function ya(e) {
    e !== Ds && e.next === null && (Ds === null ? Co = Ds = e : Ds = Ds.next = e), To = !0, zd || (zd = !0, Jj());
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
            h = ot, h = ge(
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
  function Zj() {
    xv();
  }
  function xv() {
    To = zd = !1;
    var e = 0;
    lr !== 0 && oE() && (e = lr);
    for (var n = yt(), r = null, l = Co; l !== null; ) {
      var d = l.next, h = Sv(l, n);
      h === 0 ? (l.next = null, r === null ? Co = d : r.next = d, d === null && (Ds = r)) : (r = l, (e !== 0 || (h & 3) !== 0) && (To = !0)), l = d;
    }
    ln !== 0 && ln !== 5 || Bi(e), lr !== 0 && (lr = 0);
  }
  function Sv(e, n) {
    for (var r = e.suspendedLanes, l = e.pingedLanes, d = e.expirationTimes, h = e.pendingLanes & -62914561; 0 < h; ) {
      var x = 31 - Lt(h), E = 1 << x, L = d[x];
      L === -1 ? ((E & r) === 0 || (E & l) !== 0) && (d[x] = he(E, n)) : L <= n && (e.expiredLanes |= E), h &= ~E;
    }
    if (n = Tt, r = ot, r = ge(
      e,
      e === n ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, r === 0 || e === n && (bt === 2 || bt === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && Ot(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((r & 3) === 0 || O(e, r)) {
      if (n = r & -r, n === e.callbackPriority) return n;
      switch (l !== null && Ot(l), Z(r)) {
        case 2:
        case 8:
          r = Ge;
          break;
        case 32:
          r = Fe;
          break;
        case 268435456:
          r = Mt;
          break;
        default:
          r = Fe;
      }
      return l = wv.bind(null, e), r = ft(r, l), e.callbackPriority = n, e.callbackNode = r, n;
    }
    return l !== null && l !== null && Ot(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function wv(e, n) {
    if (ln !== 0 && ln !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var r = e.callbackNode;
    if (No() && e.callbackNode !== r)
      return null;
    var l = ot;
    return l = ge(
      e,
      e === Tt ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (av(e, l, n), Sv(e, yt()), e.callbackNode != null && e.callbackNode === r ? wv.bind(null, e) : null);
  }
  function jv(e, n) {
    if (No()) return null;
    av(e, n, !0);
  }
  function Jj() {
    uE(function() {
      (gt & 6) !== 0 ? ft(
        _e,
        Zj
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
  function Wj(e, n, r, l, d) {
    if (n === "submit" && r && r.stateNode === d) {
      var h = Ev(
        (d[Ce] || null).action
      ), x = l.submitter;
      x && (n = (n = x[Ce] || null) ? Ev(n.formAction) : x.getAttribute("formAction"), n !== null && (h = n, x = null));
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
                  var L = x ? Nv(d, x) : new FormData(d);
                  nd(
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
                typeof h == "function" && (E.preventDefault(), L = x ? Nv(d, x) : new FormData(d), nd(
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
  for (var $d = 0; $d < bu.length; $d++) {
    var Ud = bu[$d], eE = Ud.toLowerCase(), tE = Ud[0].toUpperCase() + Ud.slice(1);
    la(
      eE,
      "on" + tE
    );
  }
  la(np, "onAnimationEnd"), la(ap, "onAnimationIteration"), la(rp, "onAnimationStart"), la("dblclick", "onDoubleClick"), la("focusin", "onFocus"), la("focusout", "onBlur"), la(vj, "onTransitionRun"), la(yj, "onTransitionStart"), la(bj, "onTransitionCancel"), la(sp, "onTransitionEnd"), ha("onMouseEnter", ["mouseout", "mouseover"]), ha("onMouseLeave", ["mouseout", "mouseover"]), ha("onPointerEnter", ["pointerout", "pointerover"]), ha("onPointerLeave", ["pointerout", "pointerover"]), on(
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
  ), nE = new Set(
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
            var E = l[x], L = E.instance, ne = E.currentTarget;
            if (E = E.listener, L !== h && d.isPropagationStopped())
              break e;
            h = E, d.currentTarget = ne;
            try {
              h(d);
            } catch (ue) {
              Vl(ue);
            }
            d.currentTarget = null, h = L;
          }
        else
          for (x = 0; x < l.length; x++) {
            if (E = l[x], L = E.instance, ne = E.currentTarget, E = E.listener, L !== h && d.isPropagationStopped())
              break e;
            h = E, d.currentTarget = ne;
            try {
              h(d);
            } catch (ue) {
              Vl(ue);
            }
            d.currentTarget = null, h = L;
          }
      }
    }
  }
  function rt(e, n) {
    var r = n[Re];
    r === void 0 && (r = n[Re] = /* @__PURE__ */ new Set());
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
        r !== "selectionchange" && (nE.has(r) || Bd(r, !1, e), Bd(r, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[Ro] || (n[Ro] = !0, Bd("selectionchange", !1, n));
    }
  }
  function Tv(e, n, r, l) {
    switch (ny(n)) {
      case 2:
        var d = ME;
        break;
      case 8:
        d = AE;
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
              var L = x.tag;
              if ((L === 3 || L === 4) && x.stateNode.containerInfo === d)
                return;
              x = x.return;
            }
          for (; E !== null; ) {
            if (x = St(E), x === null) return;
            if (L = x.tag, L === 5 || L === 6 || L === 26 || L === 27) {
              l = h = x;
              continue e;
            }
            E = E.parentNode;
          }
        }
        l = l.return;
      }
    km(function() {
      var ne = h, ue = ru(r), pe = [];
      e: {
        var le = ip.get(e);
        if (le !== void 0) {
          var oe = Ul, ke = e;
          switch (e) {
            case "keypress":
              if (Ll(r) === 0) break e;
            case "keydown":
            case "keyup":
              oe = Xw;
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
              oe = $w;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              oe = Jw;
              break;
            case np:
            case ap:
            case rp:
              oe = Iw;
              break;
            case sp:
              oe = ej;
              break;
            case "scroll":
            case "scrollend":
              oe = Ow;
              break;
            case "wheel":
              oe = nj;
              break;
            case "copy":
            case "cut":
            case "paste":
              oe = qw;
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
              oe = rj;
          }
          var qe = (n & 4) !== 0, Et = !qe && (e === "scroll" || e === "scrollend"), X = qe ? le !== null ? le + "Capture" : null : le;
          qe = [];
          for (var q = ne, te; q !== null; ) {
            var me = q;
            if (te = me.stateNode, me = me.tag, me !== 5 && me !== 26 && me !== 27 || te === null || X === null || (me = oi(q, X), me != null && qe.push(
              Vi(q, me, te)
            )), Et) break;
            q = q.return;
          }
          0 < qe.length && (le = new oe(
            le,
            ke,
            null,
            r,
            ue
          ), pe.push({ event: le, listeners: qe }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (le = e === "mouseover" || e === "pointerover", oe = e === "mouseout" || e === "pointerout", le && r !== au && (ke = r.relatedTarget || r.fromElement) && (St(ke) || ke[Oe]))
            break e;
          if ((oe || le) && (le = ue.window === ue ? ue : (le = ue.ownerDocument) ? le.defaultView || le.parentWindow : window, oe ? (ke = r.relatedTarget || r.toElement, oe = ne, ke = ke ? St(ke) : null, ke !== null && (Et = u(ke), qe = ke.tag, ke !== Et || qe !== 5 && qe !== 27 && qe !== 6) && (ke = null)) : (oe = null, ke = ne), oe !== ke)) {
            if (qe = Om, me = "onMouseLeave", X = "onMouseEnter", q = "mouse", (e === "pointerout" || e === "pointerover") && (qe = $m, me = "onPointerLeave", X = "onPointerEnter", q = "pointer"), Et = oe == null ? le : nt(oe), te = ke == null ? le : nt(ke), le = new qe(
              me,
              q + "leave",
              oe,
              r,
              ue
            ), le.target = Et, le.relatedTarget = te, me = null, St(ue) === ne && (qe = new qe(
              X,
              q + "enter",
              ke,
              r,
              ue
            ), qe.target = te, qe.relatedTarget = Et, me = qe), Et = me, oe && ke)
              t: {
                for (qe = aE, X = oe, q = ke, te = 0, me = X; me; me = qe(me))
                  te++;
                me = 0;
                for (var Be = q; Be; Be = qe(Be))
                  me++;
                for (; 0 < te - me; )
                  X = qe(X), te--;
                for (; 0 < me - te; )
                  q = qe(q), me--;
                for (; te--; ) {
                  if (X === q || q !== null && X === q.alternate) {
                    qe = X;
                    break t;
                  }
                  X = qe(X), q = qe(q);
                }
                qe = null;
              }
            else qe = null;
            oe !== null && Rv(
              pe,
              le,
              oe,
              qe,
              !1
            ), ke !== null && Et !== null && Rv(
              pe,
              Et,
              ke,
              qe,
              !0
            );
          }
        }
        e: {
          if (le = ne ? nt(ne) : window, oe = le.nodeName && le.nodeName.toLowerCase(), oe === "select" || oe === "input" && le.type === "file")
            var mt = Pm;
          else if (Hm(le))
            if (Gm)
              mt = mj;
            else {
              mt = fj;
              var Le = dj;
            }
          else
            oe = le.nodeName, !oe || oe.toLowerCase() !== "input" || le.type !== "checkbox" && le.type !== "radio" ? ne && nu(ne.elementType) && (mt = Pm) : mt = hj;
          if (mt && (mt = mt(e, ne))) {
            Fm(
              pe,
              mt,
              r,
              ue
            );
            break e;
          }
          Le && Le(e, le, ne), e === "focusout" && ne && le.type === "number" && ne.memoizedProps.value != null && tu(le, "number", le.value);
        }
        switch (Le = ne ? nt(ne) : window, e) {
          case "focusin":
            (Hm(Le) || Le.contentEditable === "true") && (us = Le, gu = ne, gi = null);
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
            if (gj) break;
          case "keydown":
          case "keyup":
            ep(pe, r, ue);
        }
        var Ze;
        if (fu)
          e: {
            switch (e) {
              case "compositionstart":
                var ct = "onCompositionStart";
                break e;
              case "compositionend":
                ct = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ct = "onCompositionUpdate";
                break e;
            }
            ct = void 0;
          }
        else
          cs ? Vm(e, r) && (ct = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (ct = "onCompositionStart");
        ct && (Um && r.locale !== "ko" && (cs || ct !== "onCompositionStart" ? ct === "onCompositionEnd" && cs && (Ze = Dm()) : (Pa = ue, lu = "value" in Pa ? Pa.value : Pa.textContent, cs = !0)), Le = _o(ne, ct), 0 < Le.length && (ct = new Lm(
          ct,
          e,
          null,
          r,
          ue
        ), pe.push({ event: ct, listeners: Le }), Ze ? ct.data = Ze : (Ze = qm(r), Ze !== null && (ct.data = Ze)))), (Ze = ij ? lj(e, r) : oj(e, r)) && (ct = _o(ne, "onBeforeInput"), 0 < ct.length && (Le = new Lm(
          "onBeforeInput",
          "beforeinput",
          null,
          r,
          ue
        ), pe.push({
          event: Le,
          listeners: ct
        }), Le.data = Ze)), Wj(
          pe,
          e,
          ne,
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
  function aE(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Rv(e, n, r, l, d) {
    for (var h = n._reactName, x = []; r !== null && r !== l; ) {
      var E = r, L = E.alternate, ne = E.stateNode;
      if (E = E.tag, L !== null && L === l) break;
      E !== 5 && E !== 26 && E !== 27 || ne === null || (L = ne, d ? (ne = oi(r, h), ne != null && x.unshift(
        Vi(r, ne, L)
      )) : d || (ne = oi(r, h), ne != null && x.push(
        Vi(r, ne, L)
      ))), r = r.return;
    }
    x.length !== 0 && e.push({ event: n, listeners: x });
  }
  var rE = /\r\n?/g, sE = /\u0000|\uFFFD/g;
  function _v(e) {
    return (typeof e == "string" ? e : "" + e).replace(rE, `
`).replace(sE, "");
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
        l != null && rt("scroll", e);
        break;
      case "onScrollEnd":
        l != null && rt("scrollend", e);
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
        rt("beforetoggle", e), rt("toggle", e), We(e, "popover", l);
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
        We(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (r = Dw.get(r) || r, We(e, r, l));
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
        l != null && rt("scroll", e);
        break;
      case "onScrollEnd":
        l != null && rt("scrollend", e);
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
            if (r[0] === "o" && r[1] === "n" && (d = r.endsWith("Capture"), n = r.slice(2, d ? r.length - 7 : void 0), h = e[Ce] || null, h = h != null ? h[r] : null, typeof h == "function" && e.removeEventListener(n, h, d), typeof l == "function")) {
              typeof h != "function" && h !== null && (r in e ? e[r] = null : e.hasAttribute(r) && e.removeAttribute(r)), e.addEventListener(n, l, d);
              break e;
            }
            r in e ? e[r] = l : l === !0 ? e.setAttribute(r, "") : We(e, r, l);
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
        rt("error", e), rt("load", e);
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
        rt("invalid", e);
        var E = h = x = d = null, L = null, ne = null;
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
                  L = ue;
                  break;
                case "defaultChecked":
                  ne = ue;
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
          L,
          ne,
          x,
          d,
          !1
        );
        return;
      case "select":
        rt("invalid", e), l = x = h = null;
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
        rt("invalid", e), h = d = l = null;
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
        for (L in r)
          if (r.hasOwnProperty(L) && (l = r[L], l != null))
            switch (L) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                jt(e, n, L, l, r, null);
            }
        return;
      case "dialog":
        rt("beforetoggle", e), rt("toggle", e), rt("cancel", e), rt("close", e);
        break;
      case "iframe":
      case "object":
        rt("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Ii.length; l++)
          rt(Ii[l], e);
        break;
      case "image":
        rt("error", e), rt("load", e);
        break;
      case "details":
        rt("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        rt("error", e), rt("load", e);
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
        for (ne in r)
          if (r.hasOwnProperty(ne) && (l = r[ne], l != null))
            switch (ne) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(i(137, n));
              default:
                jt(e, n, ne, l, r, null);
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
  function iE(e, n, r, l) {
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
        var d = null, h = null, x = null, E = null, L = null, ne = null, ue = null;
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
                ne = oe;
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
          L,
          ne,
          ue,
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
                l.hasOwnProperty(h) || jt(
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
                h !== L && jt(
                  e,
                  n,
                  d,
                  h,
                  l,
                  L
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
        for (L in l)
          if (le = l[L], oe = r[L], l.hasOwnProperty(L) && le !== oe && (le != null || oe != null))
            switch (L) {
              case "selected":
                e.selected = le && typeof le != "function" && typeof le != "symbol";
                break;
              default:
                jt(
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
          le = r[qe], r.hasOwnProperty(qe) && le != null && !l.hasOwnProperty(qe) && jt(e, n, qe, null, l, le);
        for (ne in l)
          if (le = l[ne], oe = r[ne], l.hasOwnProperty(ne) && le !== oe && (le != null || oe != null))
            switch (ne) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (le != null)
                  throw Error(i(137, n));
                break;
              default:
                jt(
                  e,
                  n,
                  ne,
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
  function lE() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, r = performance.getEntriesByType("resource"), l = 0; l < r.length; l++) {
        var d = r[l], h = d.transferSize, x = d.initiatorType, E = d.duration;
        if (h && E && Av(x)) {
          for (x = 0, E = d.responseEnd, l += 1; l < r.length; l++) {
            var L = r[l], ne = L.startTime;
            if (ne > E) break;
            var ue = L.transferSize, pe = L.initiatorType;
            ue && Av(pe) && (L = L.responseEnd, x += ue * (L < E ? 1 : (E - ne) / (L - ne)));
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
  function oE() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Gd ? !1 : (Gd = e, !0) : (Gd = null, !1);
  }
  var zv = typeof setTimeout == "function" ? setTimeout : void 0, cE = typeof clearTimeout == "function" ? clearTimeout : void 0, Ov = typeof Promise == "function" ? Promise : void 0, uE = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ov < "u" ? function(e) {
    return Ov.resolve(null).then(e).catch(dE);
  } : zv;
  function dE(e) {
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
            h[Je] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && h.rel.toLowerCase() === "stylesheet" || r.removeChild(h), h = x;
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
  function fE(e, n, r, l) {
    for (; e.nodeType === 1; ) {
      var d = r;
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[Je])
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
  function hE(e, n, r) {
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
  function mE(e, n) {
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
    f: pE,
    r: gE,
    D: vE,
    C: yE,
    L: bE,
    m: xE,
    X: wE,
    S: SE,
    M: jE
  };
  function pE() {
    var e = Ua.f(), n = wo();
    return e || n;
  }
  function gE(e) {
    var n = $t(e);
    n !== null && n.tag === 5 && n.type === "form" ? sg(n) : Ua.r(e);
  }
  var zs = typeof document > "u" ? null : document;
  function Hv(e, n, r) {
    var l = zs;
    if (l && typeof n == "string" && n) {
      var d = Fn(n);
      d = 'link[rel="' + e + '"][href="' + d + '"]', typeof r == "string" && (d += '[crossorigin="' + r + '"]'), qv.has(d) || (qv.add(d), e = { rel: e, crossOrigin: r, href: n }, l.querySelector(d) === null && (n = l.createElement("link"), mn(n, "link", e), _t(n), l.head.appendChild(n)));
    }
  }
  function vE(e) {
    Ua.D(e), Hv("dns-prefetch", e, null);
  }
  function yE(e, n) {
    Ua.C(e, n), Hv("preconnect", e, n);
  }
  function bE(e, n, r) {
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
      ), Jn.set(h, e), l.querySelector(d) !== null || n === "style" && l.querySelector(Hi(h)) || n === "script" && l.querySelector(Fi(h)) || (n = l.createElement("link"), mn(n, "link", e), _t(n), l.head.appendChild(n)));
    }
  }
  function xE(e, n) {
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
        l = r.createElement("link"), mn(l, "link", e), _t(l), r.head.appendChild(l);
      }
    }
  }
  function SE(e, n, r) {
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
          var L = x = l.createElement("link");
          _t(L), mn(L, "link", e), L._p = new Promise(function(ne, ue) {
            L.onload = ne, L.onerror = ue;
          }), L.addEventListener("load", function() {
            E.loading |= 1;
          }), L.addEventListener("error", function() {
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
  function wE(e, n) {
    Ua.X(e, n);
    var r = zs;
    if (r && e) {
      var l = Zt(r).hoistableScripts, d = Ls(e), h = l.get(d);
      h || (h = r.querySelector(Fi(d)), h || (e = v({ src: e, async: !0 }, n), (n = Jn.get(d)) && Jd(e, n), h = r.createElement("script"), _t(h), mn(h, "link", e), r.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(d, h));
    }
  }
  function jE(e, n) {
    Ua.M(e, n);
    var r = zs;
    if (r && e) {
      var l = Zt(r).hoistableScripts, d = Ls(e), h = l.get(d);
      h || (h = r.querySelector(Fi(d)), h || (e = v({ src: e, async: !0, type: "module" }, n), (n = Jn.get(d)) && Jd(e, n), h = r.createElement("script"), _t(h), mn(h, "link", e), r.head.appendChild(h)), h = {
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
          }, Jn.set(e, r), h || EE(
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
  function EE(e, n, r, l) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? l.loading = 1 : (n = e.createElement("link"), l.preload = n, n.addEventListener("load", function() {
      return l.loading |= 1;
    }), n.addEventListener("error", function() {
      return l.loading |= 2;
    }), mn(n, "link", r), _t(n), e.head.appendChild(n));
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
            return n.instance = l, _t(l), l;
          var d = v({}, r, {
            "data-href": r.href,
            "data-precedence": r.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), _t(l), mn(l, "style", d), ko(l, r.precedence, e), n.instance = l;
        case "stylesheet":
          d = Os(r.href);
          var h = e.querySelector(
            Hi(d)
          );
          if (h)
            return n.state.loading |= 4, n.instance = h, _t(h), h;
          l = Pv(r), (d = Jn.get(d)) && Zd(l, d), h = (e.ownerDocument || e).createElement("link"), _t(h);
          var x = h;
          return x._p = new Promise(function(E, L) {
            x.onload = E, x.onerror = L;
          }), mn(h, "link", l), n.state.loading |= 4, ko(h, r.precedence, e), n.instance = h;
        case "script":
          return h = Ls(r.src), (d = e.querySelector(
            Fi(h)
          )) ? (n.instance = d, _t(d), d) : (l = r, (d = Jn.get(h)) && (l = v({}, r), Jd(l, d)), e = e.ownerDocument || e, d = e.createElement("script"), _t(d), mn(d, "link", l), e.head.appendChild(d), n.instance = d);
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
      if (!(h[Je] || h[Ne] || e === "link" && h.getAttribute("rel") === "stylesheet") && h.namespaceURI !== "http://www.w3.org/2000/svg") {
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
  function NE(e, n, r) {
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
  function CE(e, n, r, l) {
    if (r.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (r.state.loading & 4) === 0) {
      if (r.instance === null) {
        var d = Os(l.href), h = n.querySelector(
          Hi(d)
        );
        if (h) {
          n = h._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = zo.bind(e), n.then(e, e)), r.state.loading |= 4, r.instance = h, _t(h);
          return;
        }
        h = n.ownerDocument || n, l = Pv(l), (d = Jn.get(d)) && Zd(l, d), h = h.createElement("link"), _t(h);
        var x = h;
        x._p = new Promise(function(E, L) {
          x.onload = E, x.onerror = L;
        }), mn(h, "link", l), r.instance = h;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(r, n), (n = r.state.preload) && (r.state.loading & 3) === 0 && (e.count++, r = zo.bind(e), n.addEventListener("load", r), n.addEventListener("error", r));
    }
  }
  var Wd = 0;
  function TE(e, n) {
    return e.stylesheets && e.count === 0 && Lo(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(r) {
      var l = setTimeout(function() {
        if (e.stylesheets && Lo(e, e.stylesheets), e.unsuspend) {
          var h = e.unsuspend;
          e.unsuspend = null, h();
        }
      }, 6e4 + n);
      0 < e.imgBytes && Wd === 0 && (Wd = 62500 * lE());
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
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Oo = /* @__PURE__ */ new Map(), n.forEach(RE, e), Oo = null, zo.call(e));
  }
  function RE(e, n) {
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
  function _E(e, n, r, l, d, h, x, E, L) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ze(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ze(0), this.hiddenUpdates = ze(null), this.identifierPrefix = l, this.onUncaughtError = d, this.onCaughtError = h, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = L, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Qv(e, n, r, l, d, h, x, E, L, ne, ue, pe) {
    return e = new _E(
      e,
      n,
      r,
      x,
      L,
      ne,
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
      var n = kr(e, 67108864);
      n !== null && Mn(n, e, 67108864), ef(e, 67108864);
    }
  }
  function ty(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = In();
      n = H(n);
      var r = kr(e, n);
      r !== null && Mn(r, e, n), ef(e, n);
    }
  }
  var $o = !0;
  function ME(e, n, r, l) {
    var d = M.T;
    M.T = null;
    var h = F.p;
    try {
      F.p = 2, tf(e, n, r, l);
    } finally {
      F.p = h, M.T = d;
    }
  }
  function AE(e, n, r, l) {
    var d = M.T;
    M.T = null;
    var h = F.p;
    try {
      F.p = 8, tf(e, n, r, l);
    } finally {
      F.p = h, M.T = d;
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
      else if (DE(
        d,
        e,
        n,
        r,
        l
      ))
        l.stopPropagation();
      else if (ay(e, l), n & 4 && -1 < kE.indexOf(e)) {
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
                      var L = 1 << 31 - Lt(x);
                      E.entanglements[1] |= L, x &= ~L;
                    }
                    ya(h), (gt & 6) === 0 && (xo = yt() + 500, Bi(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = kr(h, 2), E !== null && Mn(E, h, 2), wo(), ef(h, 2);
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
        switch (je()) {
          case _e:
            return 2;
          case Ge:
            return 8;
          case Fe:
          case Nt:
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
  var rf = !1, cr = null, ur = null, dr = null, Gi = /* @__PURE__ */ new Map(), Yi = /* @__PURE__ */ new Map(), fr = [], kE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
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
  function DE(e, n, r, l, d) {
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
  function zE() {
    rf = !1, cr !== null && Bo(cr) && (cr = null), ur !== null && Bo(ur) && (ur = null), dr !== null && Bo(dr) && (dr = null), Gi.forEach(sy), Yi.forEach(sy);
  }
  function Io(e, n) {
    e.blockedOn === n && (e.blockedOn = null, rf || (rf = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      zE
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
    function n(L) {
      return Io(L, e);
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
        var d = r[l], h = r[l + 1], x = d[Ce] || null;
        if (typeof h == "function")
          x || iy(r);
        else if (x) {
          var E = null;
          if (h && h.hasAttribute("formAction")) {
            if (d = h, x = h[Ce] || null)
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
  var OE = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: M,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ho = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ho.isDisabled && Ho.supportsFiber)
      try {
        wn = Ho.inject(
          OE
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
    var l = !1, d = "", h = pg, x = gg, E = vg, L = null;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (d = r.identifierPrefix), r.onUncaughtError !== void 0 && (h = r.onUncaughtError), r.onCaughtError !== void 0 && (x = r.onCaughtError), r.onRecoverableError !== void 0 && (E = r.onRecoverableError), r.formState !== void 0 && (L = r.formState)), n = Qv(
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
      ly
    ), n.context = Zv(null), r = n.current, l = In(), l = H(l), d = Za(l), d.callback = null, Ja(r, d, l), r = l, n.current.lanes = r, Ue(n, r), ya(n), e[Oe] = n.current, Id(e), new qo(n);
  }, Qi.version = "19.2.5", Qi;
}
var yy;
function GE() {
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
  return t(), cf.exports = PE(), cf.exports;
}
var YE = GE();
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
var Hx = (t) => {
  throw TypeError(t);
}, KE = (t, a, s) => a.has(t) || Hx("Cannot " + s), hf = (t, a, s) => (KE(t, a, "read from private field"), s ? s.call(t) : a.get(t)), XE = (t, a, s) => a.has(t) ? Hx("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, s);
function by(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function QE(t = {}) {
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
function et(t, a) {
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
function ZE() {
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
    key: a && a.key || i || ZE(),
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
function JE(t, a = !1) {
  let s = "http://localhost";
  typeof window < "u" && (s = window.location.origin !== "null" ? window.location.origin : window.location.href), et(s, "No window.location.(origin|href) available to create URL");
  let i = typeof t == "string" ? t : xa(t);
  return i = i.replace(/ $/, "%20"), !a && i.startsWith("//") && (i = s + i), new URL(i, s);
}
var ol, xy = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(t) {
    if (XE(this, ol, /* @__PURE__ */ new Map()), t)
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
var WE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function eN(t) {
  return WE.has(
    t
  );
}
var tN = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function nN(t) {
  return tN.has(
    t
  );
}
function aN(t) {
  return t.index === !0;
}
function pl(t, a, s = [], i = {}, o = !1) {
  return t.map((u, f) => {
    let m = [...s, String(f)], y = typeof u.id == "string" ? u.id : m.join("-");
    if (et(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), et(
      o || !i[y],
      `Found a route id collision on id "${y}".  Route id's must be globally unique within Data Router usages`
    ), aN(u)) {
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
function yr(t, a, s = "/") {
  return cl(t, a, s, !1);
}
function cl(t, a, s, i) {
  let o = typeof a == "string" ? fa(a) : a, u = aa(o.pathname || "/", s);
  if (u == null)
    return null;
  let f = Fx(t);
  sN(f);
  let m = null;
  for (let y = 0; m == null && y < f.length; ++y) {
    let p = gN(u);
    m = mN(
      f[y],
      p,
      i
    );
  }
  return m;
}
function rN(t, a) {
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
function Fx(t, a = [], s = [], i = "", o = !1) {
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
      et(
        b.relativePath.startsWith(i),
        `Absolute route path "${b.relativePath}" nested under path "${i}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), b.relativePath = b.relativePath.slice(i.length);
    }
    let v = ea([i, b.relativePath]), w = s.concat(b);
    f.children && f.children.length > 0 && (et(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      f.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${v}".`
    ), Fx(
      f.children,
      a,
      w,
      v,
      y
    )), !(f.path == null && !f.index) && a.push({
      path: v,
      score: fN(v, f.index),
      routesMeta: w
    });
  };
  return t.forEach((f, m) => {
    if (f.path === "" || !f.path?.includes("?"))
      u(f, m);
    else
      for (let y of Px(f.path))
        u(f, m, !0, y);
  }), a;
}
function Px(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [s, ...i] = a, o = s.endsWith("?"), u = s.replace(/\?$/, "");
  if (i.length === 0)
    return o ? [u, ""] : [u];
  let f = Px(i.join("/")), m = [];
  return m.push(
    ...f.map(
      (y) => y === "" ? u : [u, y].join("/")
    )
  ), o && m.push(...f), m.map(
    (y) => t.startsWith("/") && y === "" ? "/" : y
  );
}
function sN(t) {
  t.sort(
    (a, s) => a.score !== s.score ? s.score - a.score : hN(
      a.routesMeta.map((i) => i.childrenIndex),
      s.routesMeta.map((i) => i.childrenIndex)
    )
  );
}
var iN = /^:[\w-]+$/, lN = 3, oN = 2, cN = 1, uN = 10, dN = -2, wy = (t) => t === "*";
function fN(t, a) {
  let s = t.split("/"), i = s.length;
  return s.some(wy) && (i += dN), a && (i += oN), s.filter((o) => !wy(o)).reduce(
    (o, u) => o + (iN.test(u) ? lN : u === "" ? cN : uN),
    i
  );
}
function hN(t, a) {
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
function mN(t, a, s = !1) {
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
      pathnameBase: bN(
        ea([u, v.pathnameBase])
      ),
      route: w
    }), v.pathnameBase !== "/" && (u = ea([u, v.pathnameBase]));
  }
  return f;
}
function Ec(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [s, i] = pN(
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
function pN(t, a = !1, s = !0) {
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
function gN(t) {
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
function vN({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : ea([t, a]);
}
var Gx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Oh = (t) => Gx.test(t);
function yN(t, a = "/") {
  let {
    pathname: s,
    search: i = "",
    hash: o = ""
  } = typeof t == "string" ? fa(t) : t, u;
  return s ? (s = $h(s), s.startsWith("/") ? u = jy(s.substring(1), "/") : u = jy(s, a)) : u = a, {
    pathname: u,
    search: xN(i),
    hash: SN(o)
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
function Yx(t) {
  return t.filter(
    (a, s) => s === 0 || a.route.path && a.route.path.length > 0
  );
}
function Lh(t) {
  let a = Yx(t);
  return a.map(
    (s, i) => i === a.length - 1 ? s.pathname : s.pathnameBase
  );
}
function Ic(t, a, s, i = !1) {
  let o;
  typeof t == "string" ? o = fa(t) : (o = { ...t }, et(
    !o.pathname || !o.pathname.includes("?"),
    mf("?", "pathname", "search", o)
  ), et(
    !o.pathname || !o.pathname.includes("#"),
    mf("#", "pathname", "hash", o)
  ), et(
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
  let y = yN(o, m), p = f && f !== "/" && f.endsWith("/"), b = (u || f === ".") && s.endsWith("/");
  return !y.pathname.endsWith("/") && (p || b) && (y.pathname += "/"), y;
}
var $h = (t) => t.replace(/\/\/+/g, "/"), ea = (t) => $h(t.join("/")), Nc = (t) => t.replace(/\/+$/, ""), bN = (t) => Nc(t).replace(/^\/*/, "/"), xN = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, SN = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, wN = (t, a = 302) => {
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
var Kx = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Xx(t, a) {
  let s = t;
  if (typeof s != "string" || !Gx.test(s))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: s
    };
  let i = s, o = !1;
  if (Kx)
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
var xr = Symbol("Uninstrumented");
function jN(t, a) {
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
      let f = u[xr] ?? u, m = Ps(
        s[o],
        f,
        (...y) => Ey(y[0])
      );
      m && (o === "loader" && f.hydrate === !0 && (m.hydrate = !0), m[xr] = f, i[o] = m);
    }
  }), a.middleware && a.middleware.length > 0 && s.middleware.length > 0 && (i.middleware = a.middleware.map((o) => {
    let u = o[xr] ?? o, f = Ps(
      s.middleware,
      u,
      (...m) => Ey(m[0])
    );
    return f ? (f[xr] = u, f) : o;
  })), i;
}
function EN(t, a) {
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
    let i = t.navigate[xr] ?? t.navigate, o = Ps(
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
    o && (o[xr] = i, t.navigate = o);
  }
  if (s.fetch.length > 0) {
    let i = t.fetch[xr] ?? t.fetch, o = Ps(s.fetch, i, (...u) => {
      let [f, , m, y] = u;
      return {
        href: m ?? ".",
        fetcherKey: f,
        ...Ny(t, y ?? {})
      };
    });
    o && (o[xr] = i, t.fetch = o);
  }
  return t;
}
function Ps(t, a, s) {
  return t.length === 0 ? null : async (...i) => {
    let o = await Qx(
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
async function Qx(t, a, s, i) {
  let o = t[i], u;
  if (o) {
    let f, m = async () => (f ? console.error("You cannot call instrumented handlers more than once") : f = Qx(t, a, s, i - 1), u = await f, et(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
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
    request: NN(a),
    params: { ...i },
    unstable_pattern: o,
    context: CN(s)
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
function NN(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function CN(t) {
  if (RN(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var TN = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function RN(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === TN;
}
var Zx = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], _N = new Set(
  Zx
), MN = [
  "GET",
  ...Zx
], AN = new Set(MN), Jx = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), kN = /* @__PURE__ */ new Set([307, 308]), pf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, DN = {
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
}, zN = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), Wx = "remix-router-transitions", e1 = Symbol("ResetLoaderData");
function ON(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, s = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  et(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let i = t.hydrationRouteProperties || [], o = t.mapRouteProperties || zN, u = o;
  if (t.unstable_instrumentations) {
    let z = t.unstable_instrumentations;
    u = (H) => ({
      ...o(H),
      ...jN(
        z.map((Z) => Z.route).filter(Boolean),
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
  let b = t.dataStrategy || IN, v = {
    unstable_passThroughRequests: !1,
    ...t.future
  }, w = null, S = /* @__PURE__ */ new Set(), j = null, N = null, R = null, T = t.hydrationData != null, $ = yr(m, t.history.location, p), _ = !1, C = null, I, Y;
  if ($ == null && !t.patchRoutesOnNavigation) {
    let z = Wn(404, {
      pathname: t.history.location.pathname
    }), { matches: H, route: Z } = Fo(m);
    I = !0, Y = !I, $ = H, C = { [Z.id]: z };
  } else if ($ && !t.hydrationData && ze(
    $,
    m,
    t.history.location.pathname
  ).active && ($ = null), $)
    if ($.some((z) => z.route.lazy))
      I = !1, Y = !I;
    else if (!$.some((z) => Uh(z.route)))
      I = !0, Y = !I;
    else {
      let z = t.hydrationData ? t.hydrationData.loaderData : null, H = t.hydrationData ? t.hydrationData.errors : null, Z = $;
      if (H) {
        let ve = $.findIndex(
          (xe) => H[xe.route.id] !== void 0
        );
        Z = Z.slice(0, ve + 1);
      }
      Y = !1, I = !0, Z.forEach((ve) => {
        let xe = t1(ve.route, z, H);
        Y = Y || xe.renderFallback, I = I && !xe.shouldLoad;
      });
    }
  else {
    I = !1, Y = !I, $ = [];
    let z = ze(
      null,
      m,
      t.history.location.pathname
    );
    z.active && z.matches && (_ = !0, $ = z.matches);
  }
  let ae, A = {
    historyAction: t.history.action,
    location: t.history.location,
    matches: $,
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
  }, V = "POP", D = null, P = !1, J, Q = !1, G = /* @__PURE__ */ new Map(), ie = null, M = !1, F = !1, U = /* @__PURE__ */ new Set(), se = /* @__PURE__ */ new Map(), de = 0, k = -1, ee = /* @__PURE__ */ new Map(), re = /* @__PURE__ */ new Set(), K = /* @__PURE__ */ new Map(), B = /* @__PURE__ */ new Map(), W = /* @__PURE__ */ new Set(), ce = /* @__PURE__ */ new Map(), ye, Me = null;
  function st() {
    if (w = t.history.listen(
      ({ action: z, location: H, delta: Z }) => {
        if (ye) {
          ye(), ye = void 0;
          return;
        }
        Xt(
          ce.size === 0 || Z != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ve = fe({
          currentLocation: A.location,
          nextLocation: H,
          historyAction: z
        });
        if (ve && Z != null) {
          let xe = new Promise((Ee) => {
            ye = Ee;
          });
          t.history.go(Z * -1), sn(ve, {
            state: "blocked",
            location: H,
            proceed() {
              sn(ve, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: H
              }), xe.then(() => t.history.go(Z));
            },
            reset() {
              let Ee = new Map(A.blockers);
              Ee.set(ve, Zi), Ve({ blockers: Ee });
            }
          }), D?.resolve(), D = null;
          return;
        }
        return we(z, H);
      }
    ), s) {
      rC(a, G);
      let z = () => sC(a, G);
      a.addEventListener("pagehide", z), ie = () => a.removeEventListener("pagehide", z);
    }
    return A.initialized || we("POP", A.location, {
      initialHydration: !0
    }), ae;
  }
  function Te() {
    w && w(), ie && ie(), S.clear(), J && J.abort(), A.fetchers.forEach((z, H) => wn(H)), A.blockers.forEach((z, H) => Qt(H));
  }
  function He(z) {
    return S.add(z), () => S.delete(z);
  }
  function Ve(z, H = {}) {
    z.matches && (z.matches = z.matches.map((xe) => {
      let Ee = f[xe.route.id], Ne = xe.route;
      return Ne.element !== Ee.element || Ne.errorElement !== Ee.errorElement || Ne.hydrateFallbackElement !== Ee.hydrateFallbackElement ? {
        ...xe,
        route: Ee
      } : xe;
    })), A = {
      ...A,
      ...z
    };
    let Z = [], ve = [];
    A.fetchers.forEach((xe, Ee) => {
      xe.state === "idle" && (W.has(Ee) ? Z.push(Ee) : ve.push(Ee));
    }), W.forEach((xe) => {
      !A.fetchers.has(xe) && !se.has(xe) && Z.push(xe);
    }), [...S].forEach(
      (xe) => xe(A, {
        deletedFetchers: Z,
        newErrors: z.errors ?? null,
        viewTransitionOpts: H.viewTransitionOpts,
        flushSync: H.flushSync === !0
      })
    ), Z.forEach((xe) => wn(xe)), ve.forEach((xe) => A.fetchers.delete(xe));
  }
  function Ke(z, H, { flushSync: Z } = {}) {
    let ve = A.actionData != null && A.navigation.formMethod != null && bn(A.navigation.formMethod) && A.navigation.state === "loading" && z.state?._isRedirect !== !0, xe;
    H.actionData ? Object.keys(H.actionData).length > 0 ? xe = H.actionData : xe = null : ve ? xe = A.actionData : xe = null;
    let Ee = H.loaderData ? Ly(
      A.loaderData,
      H.loaderData,
      H.matches || [],
      H.errors
    ) : A.loaderData, Ne = A.blockers;
    Ne.size > 0 && (Ne = new Map(Ne), Ne.forEach((Ie, $e) => Ne.set($e, Zi)));
    let Ce = M ? !1 : be(z, H.matches || A.matches), Oe = P === !0 || A.navigation.formMethod != null && bn(A.navigation.formMethod) && z.state?._isRedirect !== !0;
    y && (m = y, y = void 0), M || V === "POP" || (V === "PUSH" ? t.history.push(z, z.state) : V === "REPLACE" && t.history.replace(z, z.state));
    let Re;
    if (V === "POP") {
      let Ie = G.get(A.location.pathname);
      Ie && Ie.has(z.pathname) ? Re = {
        currentLocation: A.location,
        nextLocation: z
      } : G.has(z.pathname) && (Re = {
        currentLocation: z,
        nextLocation: A.location
      });
    } else if (Q) {
      let Ie = G.get(A.location.pathname);
      Ie ? Ie.add(z.pathname) : (Ie = /* @__PURE__ */ new Set([z.pathname]), G.set(A.location.pathname, Ie)), Re = {
        currentLocation: A.location,
        nextLocation: z
      };
    }
    Ve(
      {
        ...H,
        // matches, errors, fetchers go through as-is
        actionData: xe,
        loaderData: Ee,
        historyAction: V,
        location: z,
        initialized: !0,
        renderFallback: !1,
        navigation: pf,
        revalidation: "idle",
        restoreScrollPosition: Ce,
        preventScrollReset: Oe,
        blockers: Ne
      },
      {
        viewTransitionOpts: Re,
        flushSync: Z === !0
      }
    ), V = "POP", P = !1, Q = !1, M = !1, F = !1, D?.resolve(), D = null, Me?.resolve(), Me = null;
  }
  async function Ft(z, H) {
    if (D?.resolve(), D = null, typeof z == "number") {
      D || (D = Iy());
      let Ct = D.promise;
      return t.history.go(z), Ct;
    }
    let Z = th(
      A.location,
      A.matches,
      p,
      z,
      H?.fromRouteId,
      H?.relative
    ), { path: ve, submission: xe, error: Ee } = Cy(
      !1,
      Z,
      H
    ), Ne;
    H?.unstable_mask && (Ne = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof H.unstable_mask == "string" ? fa(H.unstable_mask) : {
        ...A.location.unstable_mask,
        ...H.unstable_mask
      }
    });
    let Ce = A.location, Oe = eh(
      Ce,
      ve,
      H && H.state,
      void 0,
      Ne
    );
    Oe = {
      ...Oe,
      ...t.history.encodeLocation(Oe)
    };
    let Re = H && H.replace != null ? H.replace : void 0, Ie = "PUSH";
    Re === !0 ? Ie = "REPLACE" : Re === !1 || xe != null && bn(xe.formMethod) && xe.formAction === A.location.pathname + A.location.search && (Ie = "REPLACE");
    let $e = H && "preventScrollReset" in H ? H.preventScrollReset === !0 : void 0, ht = (H && H.flushSync) === !0, Je = fe({
      currentLocation: Ce,
      nextLocation: Oe,
      historyAction: Ie
    });
    if (Je) {
      sn(Je, {
        state: "blocked",
        location: Oe,
        proceed() {
          sn(Je, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: Oe
          }), Ft(z, H);
        },
        reset() {
          let Ct = new Map(A.blockers);
          Ct.set(Je, Zi), Ve({ blockers: Ct });
        }
      });
      return;
    }
    await we(Ie, Oe, {
      submission: xe,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Ee,
      preventScrollReset: $e,
      replace: H && H.replace,
      enableViewTransition: H && H.viewTransition,
      flushSync: ht,
      callSiteDefaultShouldRevalidate: H && H.unstable_defaultShouldRevalidate
    });
  }
  function Bt() {
    Me || (Me = Iy()), Fe(), Ve({ revalidation: "loading" });
    let z = Me.promise;
    return A.navigation.state === "submitting" ? z : A.navigation.state === "idle" ? (we(A.historyAction, A.location, {
      startUninterruptedRevalidation: !0
    }), z) : (we(
      V || A.historyAction,
      A.navigation.location,
      {
        overrideNavigation: A.navigation,
        // Proxy through any rending view transition
        enableViewTransition: Q === !0
      }
    ), z);
  }
  async function we(z, H, Z) {
    J && J.abort(), J = null, V = z, M = (Z && Z.startUninterruptedRevalidation) === !0, he(A.location, A.matches), P = (Z && Z.preventScrollReset) === !0, Q = (Z && Z.enableViewTransition) === !0;
    let ve = y || m, xe = Z && Z.overrideNavigation, Ee = Z?.initialHydration && A.matches && A.matches.length > 0 && !_ ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      A.matches
    ) : yr(ve, H, p), Ne = (Z && Z.flushSync) === !0;
    if (Ee && A.initialized && !F && KN(A.location, H) && !(Z && Z.submission && bn(Z.submission.formMethod))) {
      Ke(H, { matches: Ee }, { flushSync: Ne });
      return;
    }
    let Ce = ze(Ee, ve, H.pathname);
    if (Ce.active && Ce.matches && (Ee = Ce.matches), !Ee) {
      let { error: St, notFoundMatches: $t, route: nt } = Ae(
        H.pathname
      );
      Ke(
        H,
        {
          matches: $t,
          loaderData: {},
          errors: {
            [nt.id]: St
          }
        },
        { flushSync: Ne }
      );
      return;
    }
    J = new AbortController();
    let Oe = qs(
      t.history,
      H,
      J.signal,
      Z && Z.submission
    ), Re = t.getContext ? await t.getContext() : new xy(), Ie;
    if (Z && Z.pendingError)
      Ie = [
        br(Ee).route.id,
        { type: "error", error: Z.pendingError }
      ];
    else if (Z && Z.submission && bn(Z.submission.formMethod)) {
      let St = await tt(
        Oe,
        H,
        Z.submission,
        Ee,
        Re,
        Ce.active,
        Z && Z.initialHydration === !0,
        { replace: Z.replace, flushSync: Ne }
      );
      if (St.shortCircuited)
        return;
      if (St.pendingActionResult) {
        let [$t, nt] = St.pendingActionResult;
        if (Vn(nt) && gl(nt.error) && nt.error.status === 404) {
          J = null, Ke(H, {
            matches: St.matches,
            loaderData: {},
            errors: {
              [$t]: nt.error
            }
          });
          return;
        }
      }
      Ee = St.matches || Ee, Ie = St.pendingActionResult, xe = gf(H, Z.submission), Ne = !1, Ce.active = !1, Oe = qs(
        t.history,
        Oe.url,
        Oe.signal
      );
    }
    let {
      shortCircuited: $e,
      matches: ht,
      loaderData: Je,
      errors: Ct
    } = await dt(
      Oe,
      H,
      Ee,
      Re,
      Ce.active,
      xe,
      Z && Z.submission,
      Z && Z.fetcherSubmission,
      Z && Z.replace,
      Z && Z.initialHydration === !0,
      Ne,
      Ie,
      Z && Z.callSiteDefaultShouldRevalidate
    );
    $e || (J = null, Ke(H, {
      matches: ht || Ee,
      ...$y(Ie),
      loaderData: Je,
      errors: Ct
    }));
  }
  async function tt(z, H, Z, ve, xe, Ee, Ne, Ce = {}) {
    Fe();
    let Oe = nC(H, Z);
    if (Ve({ navigation: Oe }, { flushSync: Ce.flushSync === !0 }), Ee) {
      let $e = await Ue(
        ve,
        H.pathname,
        z.signal
      );
      if ($e.type === "aborted")
        return { shortCircuited: !0 };
      if ($e.type === "error") {
        if ($e.partialMatches.length === 0) {
          let { matches: Je, route: Ct } = Fo(m);
          return {
            matches: Je,
            pendingActionResult: [
              Ct.id,
              {
                type: "error",
                error: $e.error
              }
            ]
          };
        }
        let ht = br($e.partialMatches).route.id;
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
        let { notFoundMatches: ht, error: Je, route: Ct } = Ae(
          H.pathname
        );
        return {
          matches: ht,
          pendingActionResult: [
            Ct.id,
            {
              type: "error",
              error: Je
            }
          ]
        };
      }
    }
    let Re, Ie = pc(ve, H);
    if (!Ie.route.action && !Ie.route.lazy)
      Re = {
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
        Ne ? [] : i,
        xe
      ), ht = await _e(
        z,
        H,
        $e,
        xe,
        null
      );
      if (Re = ht[Ie.route.id], !Re) {
        for (let Je of ve)
          if (ht[Je.route.id]) {
            Re = ht[Je.route.id];
            break;
          }
      }
      if (z.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Kr(Re)) {
      let $e;
      return Ce && Ce.replace != null ? $e = Ce.replace : $e = Dy(
        Re.response.headers.get("Location"),
        new URL(z.url),
        p,
        t.history
      ) === A.location.pathname + A.location.search, await je(z, Re, !0, {
        submission: Z,
        replace: $e
      }), { shortCircuited: !0 };
    }
    if (Vn(Re)) {
      let $e = br(ve, Ie.route.id);
      return (Ce && Ce.replace) !== !0 && (V = "PUSH"), {
        matches: ve,
        pendingActionResult: [
          $e.route.id,
          Re,
          Ie.route.id
        ]
      };
    }
    return {
      matches: ve,
      pendingActionResult: [Ie.route.id, Re]
    };
  }
  async function dt(z, H, Z, ve, xe, Ee, Ne, Ce, Oe, Re, Ie, $e, ht) {
    let Je = Ee || gf(H, Ne), Ct = Ne || Ce || By(Je), St = !M && !Re;
    if (xe) {
      if (St) {
        let Gt = ft($e);
        Ve(
          {
            navigation: Je,
            ...Gt !== void 0 ? { actionData: Gt } : {}
          },
          {
            flushSync: Ie
          }
        );
      }
      let We = await Ue(
        Z,
        H.pathname,
        z.signal
      );
      if (We.type === "aborted")
        return { shortCircuited: !0 };
      if (We.type === "error") {
        if (We.partialMatches.length === 0) {
          let { matches: gn, route: Jt } = Fo(m);
          return {
            matches: gn,
            loaderData: {},
            errors: {
              [Jt.id]: We.error
            }
          };
        }
        let Gt = br(We.partialMatches).route.id;
        return {
          matches: We.partialMatches,
          loaderData: {},
          errors: {
            [Gt]: We.error
          }
        };
      } else if (We.matches)
        Z = We.matches;
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
    let $t = y || m, { dsMatches: nt, revalidatingFetchers: Zt } = Ty(
      z,
      ve,
      u,
      f,
      t.history,
      A,
      Z,
      Ct,
      H,
      Re ? [] : i,
      Re === !0,
      F,
      U,
      W,
      K,
      re,
      $t,
      p,
      t.patchRoutesOnNavigation != null,
      $e,
      ht
    );
    if (k = ++de, !t.dataStrategy && !nt.some((We) => We.shouldLoad) && !nt.some(
      (We) => We.route.middleware && We.route.middleware.length > 0
    ) && Zt.length === 0) {
      let We = sa();
      return Ke(
        H,
        {
          matches: Z,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: $e && Vn($e[1]) ? { [$e[0]]: $e[1].error } : null,
          ...$y($e),
          ...We ? { fetchers: new Map(A.fetchers) } : {}
        },
        { flushSync: Ie }
      ), { shortCircuited: !0 };
    }
    if (St) {
      let We = {};
      if (!xe) {
        We.navigation = Je;
        let Gt = ft($e);
        Gt !== void 0 && (We.actionData = Gt);
      }
      Zt.length > 0 && (We.fetchers = Ot(Zt)), Ve(We, { flushSync: Ie });
    }
    Zt.forEach((We) => {
      At(We.key), We.controller && se.set(We.key, We.controller);
    });
    let _t = () => Zt.forEach((We) => At(We.key));
    J && J.signal.addEventListener(
      "abort",
      _t
    );
    let { loaderResults: Fa, fetcherResults: ia } = await Ge(
      nt,
      Zt,
      z,
      H,
      ve
    );
    if (z.signal.aborted)
      return { shortCircuited: !0 };
    J && J.signal.removeEventListener(
      "abort",
      _t
    ), Zt.forEach((We) => se.delete(We.key));
    let on = Po(Fa);
    if (on)
      return await je(z, on.result, !0, {
        replace: Oe
      }), { shortCircuited: !0 };
    if (on = Po(ia), on)
      return re.add(on.key), await je(z, on.result, !0, {
        replace: Oe
      }), { shortCircuited: !0 };
    let { loaderData: ha, errors: Tr } = Oy(
      A,
      Z,
      Fa,
      $e,
      Zt,
      ia
    );
    Re && A.errors && (Tr = { ...A.errors, ...Tr });
    let ma = sa(), Rr = jn(k), ns = ma || Rr || Zt.length > 0;
    return {
      matches: Z,
      loaderData: ha,
      errors: Tr,
      ...ns ? { fetchers: new Map(A.fetchers) } : {}
    };
  }
  function ft(z) {
    if (z && !Vn(z[1]))
      return {
        [z[0]]: z[1].data
      };
    if (A.actionData)
      return Object.keys(A.actionData).length === 0 ? null : A.actionData;
  }
  function Ot(z) {
    return z.forEach((H) => {
      let Z = A.fetchers.get(H.key), ve = Ji(
        void 0,
        Z ? Z.data : void 0
      );
      A.fetchers.set(H.key, ve);
    }), new Map(A.fetchers);
  }
  async function Pe(z, H, Z, ve) {
    At(z);
    let xe = (ve && ve.flushSync) === !0, Ee = y || m, Ne = th(
      A.location,
      A.matches,
      p,
      Z,
      H,
      ve?.relative
    ), Ce = yr(Ee, Ne, p), Oe = ze(Ce, Ee, Ne);
    if (Oe.active && Oe.matches && (Ce = Oe.matches), !Ce) {
      Mt(
        z,
        H,
        Wn(404, { pathname: Ne }),
        { flushSync: xe }
      );
      return;
    }
    let { path: Re, submission: Ie, error: $e } = Cy(
      !0,
      Ne,
      ve
    );
    if ($e) {
      Mt(z, H, $e, { flushSync: xe });
      return;
    }
    let ht = t.getContext ? await t.getContext() : new xy(), Je = (ve && ve.preventScrollReset) === !0;
    if (Ie && bn(Ie.formMethod)) {
      await vt(
        z,
        H,
        Re,
        Ce,
        ht,
        Oe.active,
        xe,
        Je,
        Ie,
        ve && ve.unstable_defaultShouldRevalidate
      );
      return;
    }
    K.set(z, { routeId: H, path: Re }), await yt(
      z,
      H,
      Re,
      Ce,
      ht,
      Oe.active,
      xe,
      Je,
      Ie
    );
  }
  async function vt(z, H, Z, ve, xe, Ee, Ne, Ce, Oe, Re) {
    Fe(), K.delete(z);
    let Ie = A.fetchers.get(z);
    Nt(z, aC(Oe, Ie), {
      flushSync: Ne
    });
    let $e = new AbortController(), ht = qs(
      t.history,
      Z,
      $e.signal,
      Oe
    );
    if (Ee) {
      let kt = await Ue(
        ve,
        new URL(ht.url).pathname,
        ht.signal,
        z
      );
      if (kt.type === "aborted")
        return;
      if (kt.type === "error") {
        Mt(z, H, kt.error, { flushSync: Ne });
        return;
      } else if (kt.matches)
        ve = kt.matches;
      else {
        Mt(
          z,
          H,
          Wn(404, { pathname: Z }),
          { flushSync: Ne }
        );
        return;
      }
    }
    let Je = pc(ve, Z);
    if (!Je.route.action && !Je.route.lazy) {
      let kt = Wn(405, {
        method: Oe.formMethod,
        pathname: Z,
        routeId: H
      });
      Mt(z, H, kt, { flushSync: Ne });
      return;
    }
    se.set(z, $e);
    let Ct = de, St = Ks(
      u,
      f,
      ht,
      Z,
      ve,
      Je,
      i,
      xe
    ), $t = await _e(
      ht,
      Z,
      St,
      xe,
      z
    ), nt = $t[Je.route.id];
    if (!nt) {
      for (let kt of St)
        if ($t[kt.route.id]) {
          nt = $t[kt.route.id];
          break;
        }
    }
    if (ht.signal.aborted) {
      se.get(z) === $e && se.delete(z);
      return;
    }
    if (W.has(z)) {
      if (Kr(nt) || Vn(nt)) {
        Nt(z, Ba(void 0));
        return;
      }
    } else {
      if (Kr(nt))
        if (se.delete(z), k > Ct) {
          Nt(z, Ba(void 0));
          return;
        } else
          return re.add(z), Nt(z, Ji(Oe)), je(ht, nt, !1, {
            fetcherSubmission: Oe,
            preventScrollReset: Ce
          });
      if (Vn(nt)) {
        Mt(z, H, nt.error);
        return;
      }
    }
    let Zt = A.navigation.location || A.location, _t = qs(
      t.history,
      Zt,
      $e.signal
    ), Fa = y || m, ia = A.navigation.state !== "idle" ? yr(Fa, A.navigation.location, p) : A.matches;
    et(ia, "Didn't find any matches after fetcher action");
    let on = ++de;
    ee.set(z, on);
    let ha = Ji(Oe, nt.data);
    A.fetchers.set(z, ha);
    let { dsMatches: Tr, revalidatingFetchers: ma } = Ty(
      _t,
      xe,
      u,
      f,
      t.history,
      A,
      ia,
      Oe,
      Zt,
      i,
      !1,
      F,
      U,
      W,
      K,
      re,
      Fa,
      p,
      t.patchRoutesOnNavigation != null,
      [Je.route.id, nt],
      Re
    );
    ma.filter((kt) => kt.key !== z).forEach((kt) => {
      let as = kt.key, rs = A.fetchers.get(as), kl = Ji(
        void 0,
        rs ? rs.data : void 0
      );
      A.fetchers.set(as, kl), At(as), kt.controller && se.set(as, kt.controller);
    }), Ve({ fetchers: new Map(A.fetchers) });
    let Rr = () => ma.forEach((kt) => At(kt.key));
    $e.signal.addEventListener(
      "abort",
      Rr
    );
    let { loaderResults: ns, fetcherResults: We } = await Ge(
      Tr,
      ma,
      _t,
      Zt,
      xe
    );
    if ($e.signal.aborted)
      return;
    if ($e.signal.removeEventListener(
      "abort",
      Rr
    ), ee.delete(z), se.delete(z), ma.forEach((kt) => se.delete(kt.key)), A.fetchers.has(z)) {
      let kt = Ba(nt.data);
      A.fetchers.set(z, kt);
    }
    let Gt = Po(ns);
    if (Gt)
      return je(
        _t,
        Gt.result,
        !1,
        { preventScrollReset: Ce }
      );
    if (Gt = Po(We), Gt)
      return re.add(Gt.key), je(
        _t,
        Gt.result,
        !1,
        { preventScrollReset: Ce }
      );
    let { loaderData: gn, errors: Jt } = Oy(
      A,
      ia,
      ns,
      void 0,
      ma,
      We
    );
    jn(on), A.navigation.state === "loading" && on > k ? (et(V, "Expected pending action"), J && J.abort(), Ke(A.navigation.location, {
      matches: ia,
      loaderData: gn,
      errors: Jt,
      fetchers: new Map(A.fetchers)
    })) : (Ve({
      errors: Jt,
      loaderData: Ly(
        A.loaderData,
        gn,
        ia,
        Jt
      ),
      fetchers: new Map(A.fetchers)
    }), F = !1);
  }
  async function yt(z, H, Z, ve, xe, Ee, Ne, Ce, Oe) {
    let Re = A.fetchers.get(z);
    Nt(
      z,
      Ji(
        Oe,
        Re ? Re.data : void 0
      ),
      { flushSync: Ne }
    );
    let Ie = new AbortController(), $e = qs(
      t.history,
      Z,
      Ie.signal
    );
    if (Ee) {
      let nt = await Ue(
        ve,
        new URL($e.url).pathname,
        $e.signal,
        z
      );
      if (nt.type === "aborted")
        return;
      if (nt.type === "error") {
        Mt(z, H, nt.error, { flushSync: Ne });
        return;
      } else if (nt.matches)
        ve = nt.matches;
      else {
        Mt(
          z,
          H,
          Wn(404, { pathname: Z }),
          { flushSync: Ne }
        );
        return;
      }
    }
    let ht = pc(ve, Z);
    se.set(z, Ie);
    let Je = de, Ct = Ks(
      u,
      f,
      $e,
      Z,
      ve,
      ht,
      i,
      xe
    ), St = await _e(
      $e,
      Z,
      Ct,
      xe,
      z
    ), $t = St[ht.route.id];
    if (!$t) {
      for (let nt of ve)
        if (St[nt.route.id]) {
          $t = St[nt.route.id];
          break;
        }
    }
    if (se.get(z) === Ie && se.delete(z), !$e.signal.aborted) {
      if (W.has(z)) {
        Nt(z, Ba(void 0));
        return;
      }
      if (Kr($t))
        if (k > Je) {
          Nt(z, Ba(void 0));
          return;
        } else {
          re.add(z), await je($e, $t, !1, {
            preventScrollReset: Ce
          });
          return;
        }
      if (Vn($t)) {
        Mt(z, H, $t.error);
        return;
      }
      Nt(z, Ba($t.data));
    }
  }
  async function je(z, H, Z, {
    submission: ve,
    fetcherSubmission: xe,
    preventScrollReset: Ee,
    replace: Ne
  } = {}) {
    Z || (D?.resolve(), D = null), H.response.headers.has("X-Remix-Revalidate") && (F = !0);
    let Ce = H.response.headers.get("Location");
    et(Ce, "Expected a Location header on the redirect Response"), Ce = Dy(
      Ce,
      new URL(z.url),
      p,
      t.history
    );
    let Oe = eh(A.location, Ce, {
      _isRedirect: !0
    });
    if (s) {
      let Ct = !1;
      if (H.response.headers.has("X-Remix-Reload-Document"))
        Ct = !0;
      else if (Oh(Ce)) {
        const St = JE(Ce, !0);
        Ct = // Hard reload if it's an absolute URL to a new origin
        St.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        aa(St.pathname, p) == null;
      }
      if (Ct) {
        Ne ? a.location.replace(Ce) : a.location.assign(Ce);
        return;
      }
    }
    J = null;
    let Re = Ne === !0 || H.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Ie, formAction: $e, formEncType: ht } = A.navigation;
    !ve && !xe && Ie && $e && ht && (ve = By(A.navigation));
    let Je = ve || xe;
    if (kN.has(H.response.status) && Je && bn(Je.formMethod))
      await we(Re, Oe, {
        submission: {
          ...Je,
          formAction: Ce
        },
        // Preserve these flags across redirects
        preventScrollReset: Ee || P,
        enableViewTransition: Z ? Q : void 0
      });
    else {
      let Ct = gf(
        Oe,
        ve
      );
      await we(Re, Oe, {
        overrideNavigation: Ct,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: xe,
        // Preserve these flags across redirects
        preventScrollReset: Ee || P,
        enableViewTransition: Z ? Q : void 0
      });
    }
  }
  async function _e(z, H, Z, ve, xe) {
    let Ee, Ne = {};
    try {
      Ee = await qN(
        b,
        z,
        H,
        Z,
        xe,
        ve,
        !1
      );
    } catch (Ce) {
      return Z.filter((Oe) => Oe.shouldLoad).forEach((Oe) => {
        Ne[Oe.route.id] = {
          type: "error",
          error: Ce
        };
      }), Ne;
    }
    if (z.signal.aborted)
      return Ne;
    if (!bn(z.method))
      for (let Ce of Z) {
        if (Ee[Ce.route.id]?.type === "error")
          break;
        !Ee.hasOwnProperty(Ce.route.id) && !A.loaderData.hasOwnProperty(Ce.route.id) && (!A.errors || !A.errors.hasOwnProperty(Ce.route.id)) && Ce.shouldCallHandler() && (Ee[Ce.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${Ce.route.id}`
          )
        });
      }
    for (let [Ce, Oe] of Object.entries(Ee))
      if (JN(Oe)) {
        let Re = Oe.result;
        Ne[Ce] = {
          type: "redirect",
          response: GN(
            Re,
            z,
            Ce,
            Z,
            p
          )
        };
      } else
        Ne[Ce] = await PN(Oe);
    return Ne;
  }
  async function Ge(z, H, Z, ve, xe) {
    let Ee = _e(
      Z,
      ve,
      z,
      xe,
      null
    ), Ne = Promise.all(
      H.map(async (Re) => {
        if (Re.matches && Re.match && Re.request && Re.controller) {
          let $e = (await _e(
            Re.request,
            Re.path,
            Re.matches,
            xe,
            Re.key
          ))[Re.match.route.id];
          return { [Re.key]: $e };
        } else
          return Promise.resolve({
            [Re.key]: {
              type: "error",
              error: Wn(404, {
                pathname: Re.path
              })
            }
          });
      })
    ), Ce = await Ee, Oe = (await Ne).reduce(
      (Re, Ie) => Object.assign(Re, Ie),
      {}
    );
    return {
      loaderResults: Ce,
      fetcherResults: Oe
    };
  }
  function Fe() {
    F = !0, K.forEach((z, H) => {
      se.has(H) && U.add(H), At(H);
    });
  }
  function Nt(z, H, Z = {}) {
    A.fetchers.set(z, H), Ve(
      { fetchers: new Map(A.fetchers) },
      { flushSync: (Z && Z.flushSync) === !0 }
    );
  }
  function Mt(z, H, Z, ve = {}) {
    let xe = br(A.matches, H);
    wn(z), Ve(
      {
        errors: {
          [xe.route.id]: Z
        },
        fetchers: new Map(A.fetchers)
      },
      { flushSync: (ve && ve.flushSync) === !0 }
    );
  }
  function Hn(z) {
    return B.set(z, (B.get(z) || 0) + 1), W.has(z) && W.delete(z), A.fetchers.get(z) || DN;
  }
  function Sn(z, H) {
    At(z, H?.reason), Nt(z, Ba(null));
  }
  function wn(z) {
    let H = A.fetchers.get(z);
    se.has(z) && !(H && H.state === "loading" && ee.has(z)) && At(z), K.delete(z), ee.delete(z), re.delete(z), W.delete(z), U.delete(z), A.fetchers.delete(z);
  }
  function Pt(z) {
    let H = (B.get(z) || 0) - 1;
    H <= 0 ? (B.delete(z), W.add(z)) : B.set(z, H), Ve({ fetchers: new Map(A.fetchers) });
  }
  function At(z, H) {
    let Z = se.get(z);
    Z && (Z.abort(H), se.delete(z));
  }
  function Lt(z) {
    for (let H of z) {
      let Z = Hn(H), ve = Ba(Z.data);
      A.fetchers.set(H, ve);
    }
  }
  function sa() {
    let z = [], H = !1;
    for (let Z of re) {
      let ve = A.fetchers.get(Z);
      et(ve, `Expected fetcher: ${Z}`), ve.state === "loading" && (re.delete(Z), z.push(Z), H = !0);
    }
    return Lt(z), H;
  }
  function jn(z) {
    let H = [];
    for (let [Z, ve] of ee)
      if (ve < z) {
        let xe = A.fetchers.get(Z);
        et(xe, `Expected fetcher: ${Z}`), xe.state === "loading" && (At(Z), ee.delete(Z), H.push(Z));
      }
    return Lt(H), H.length > 0;
  }
  function un(z, H) {
    let Z = A.blockers.get(z) || Zi;
    return ce.get(z) !== H && ce.set(z, H), Z;
  }
  function Qt(z) {
    A.blockers.delete(z), ce.delete(z);
  }
  function sn(z, H) {
    let Z = A.blockers.get(z) || Zi;
    et(
      Z.state === "unblocked" && H.state === "blocked" || Z.state === "blocked" && H.state === "blocked" || Z.state === "blocked" && H.state === "proceeding" || Z.state === "blocked" && H.state === "unblocked" || Z.state === "proceeding" && H.state === "unblocked",
      `Invalid blocker state transition: ${Z.state} -> ${H.state}`
    );
    let ve = new Map(A.blockers);
    ve.set(z, H), Ve({ blockers: ve });
  }
  function fe({
    currentLocation: z,
    nextLocation: H,
    historyAction: Z
  }) {
    if (ce.size === 0)
      return;
    ce.size > 1 && Xt(!1, "A router only supports one blocker at a time");
    let ve = Array.from(ce.entries()), [xe, Ee] = ve[ve.length - 1], Ne = A.blockers.get(xe);
    if (!(Ne && Ne.state === "proceeding") && Ee({ currentLocation: z, nextLocation: H, historyAction: Z }))
      return xe;
  }
  function Ae(z) {
    let H = Wn(404, { pathname: z }), Z = y || m, { matches: ve, route: xe } = Fo(Z);
    return { notFoundMatches: ve, route: xe, error: H };
  }
  function ge(z, H, Z) {
    if (j = z, R = H, N = Z || null, !T && A.navigation === pf) {
      T = !0;
      let ve = be(A.location, A.matches);
      ve != null && Ve({ restoreScrollPosition: ve });
    }
    return () => {
      j = null, R = null, N = null;
    };
  }
  function O(z, H) {
    return N && N(
      z,
      H.map((ve) => rN(ve, A.loaderData))
    ) || z.key;
  }
  function he(z, H) {
    if (j && R) {
      let Z = O(z, H);
      j[Z] = R();
    }
  }
  function be(z, H) {
    if (j) {
      let Z = O(z, H), ve = j[Z];
      if (typeof ve == "number")
        return ve;
    }
    return null;
  }
  function ze(z, H, Z) {
    if (t.patchRoutesOnNavigation)
      if (z) {
        if (Object.keys(z[0].params).length > 0)
          return { active: !0, matches: cl(
            H,
            Z,
            p,
            !0
          ) };
      } else
        return { active: !0, matches: cl(
          H,
          Z,
          p,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function Ue(z, H, Z, ve) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: z };
    let xe = z;
    for (; ; ) {
      let Ee = y == null, Ne = y || m, Ce = f;
      try {
        await t.patchRoutesOnNavigation({
          signal: Z,
          path: H,
          matches: xe,
          fetcherKey: ve,
          patch: (Ie, $e) => {
            Z.aborted || Ry(
              Ie,
              $e,
              Ne,
              Ce,
              u,
              !1
            );
          }
        });
      } catch (Ie) {
        return { type: "error", error: Ie, partialMatches: xe };
      } finally {
        Ee && !Z.aborted && (m = [...m]);
      }
      if (Z.aborted)
        return { type: "aborted" };
      let Oe = yr(Ne, H, p), Re = null;
      if (Oe) {
        if (Object.keys(Oe[0].params).length === 0)
          return { type: "success", matches: Oe };
        if (Re = cl(
          Ne,
          H,
          p,
          !0
        ), !(Re && xe.length < Re.length && it(
          xe,
          Re.slice(0, xe.length)
        )))
          return { type: "success", matches: Oe };
      }
      if (Re || (Re = cl(
        Ne,
        H,
        p,
        !0
      )), !Re || it(xe, Re))
        return { type: "success", matches: null };
      xe = Re;
    }
  }
  function it(z, H) {
    return z.length === H.length && z.every((Z, ve) => Z.route.id === H[ve].route.id);
  }
  function Vt(z) {
    f = {}, y = pl(
      z,
      u,
      void 0,
      f
    );
  }
  function lt(z, H, Z = !1) {
    let ve = y == null;
    Ry(
      z,
      H,
      y || m,
      f,
      u,
      Z
    ), ve && (m = [...m], Ve({}));
  }
  return ae = {
    get basename() {
      return p;
    },
    get future() {
      return v;
    },
    get state() {
      return A;
    },
    get routes() {
      return m;
    },
    get window() {
      return a;
    },
    initialize: st,
    subscribe: He,
    enableScrollRestoration: ge,
    navigate: Ft,
    fetch: Pe,
    revalidate: Bt,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (z) => t.history.createHref(z),
    encodeLocation: (z) => t.history.encodeLocation(z),
    getFetcher: Hn,
    resetFetcher: Sn,
    deleteFetcher: Pt,
    dispose: Te,
    getBlocker: un,
    deleteBlocker: Qt,
    patchRoutes: lt,
    _internalFetchControllers: se,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: Vt,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(z) {
      Ve(z);
    }
  }, t.unstable_instrumentations && (ae = EN(
    ae,
    t.unstable_instrumentations.map((z) => z.router).filter(Boolean)
  )), ae;
}
function LN(t) {
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
  return s !== "/" && (y.pathname = vN({ basename: s, pathname: y.pathname })), xa(y);
}
function Cy(t, a, s) {
  if (!s || !LN(s))
    return { path: a };
  if (s.formMethod && !tC(s.formMethod))
    return {
      path: a,
      error: Wn(405, { method: s.formMethod })
    };
  let i = () => ({
    path: a,
    error: Wn(400, { type: "invalid-body" })
  }), u = (s.formMethod || "get").toUpperCase(), f = o1(a);
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
  et(
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
function Ty(t, a, s, i, o, u, f, m, y, p, b, v, w, S, j, N, R, T, $, _, C) {
  let I = _ ? Vn(_[1]) ? _[1].error : _[1].data : void 0, Y = o.createURL(u.location), ae = o.createURL(y), A;
  if (b && u.errors) {
    let ie = Object.keys(u.errors)[0];
    A = f.findIndex((M) => M.route.id === ie);
  } else if (_ && Vn(_[1])) {
    let ie = _[0];
    A = f.findIndex((M) => M.route.id === ie) - 1;
  }
  let V = _ ? _[1].statusCode : void 0, D = V && V >= 400, P = {
    currentUrl: Y,
    currentParams: u.matches[0]?.params || {},
    nextUrl: ae,
    nextParams: f[0].params,
    ...m,
    actionResult: I,
    actionStatus: V
  }, J = jl(f), Q = f.map((ie, M) => {
    let { route: F } = ie, U = null;
    if (A != null && M > A)
      U = !1;
    else if (F.lazy)
      U = !0;
    else if (!Uh(F))
      U = !1;
    else if (b) {
      let { shouldLoad: ee } = t1(
        F,
        u.loaderData,
        u.errors
      );
      U = ee;
    } else $N(u.loaderData, u.matches[M], ie) && (U = !0);
    if (U !== null)
      return nh(
        s,
        i,
        t,
        y,
        J,
        ie,
        p,
        a,
        U
      );
    let se = !1;
    typeof C == "boolean" ? se = C : D ? se = !1 : (v || Y.pathname + Y.search === ae.pathname + ae.search || Y.search !== ae.search || UN(u.matches[M], ie)) && (se = !0);
    let de = {
      ...P,
      defaultShouldRevalidate: se
    }, k = fl(ie, de);
    return nh(
      s,
      i,
      t,
      y,
      J,
      ie,
      p,
      a,
      k,
      de,
      C
    );
  }), G = [];
  return j.forEach((ie, M) => {
    if (b || !f.some((K) => K.route.id === ie.routeId) || S.has(M))
      return;
    let F = u.fetchers.get(M), U = F && F.state !== "idle" && F.data === void 0, se = yr(R, ie.path, T);
    if (!se) {
      if ($ && U)
        return;
      G.push({
        key: M,
        routeId: ie.routeId,
        path: ie.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (N.has(M))
      return;
    let de = pc(se, ie.path), k = new AbortController(), ee = qs(
      o,
      ie.path,
      k.signal
    ), re = null;
    if (w.has(M))
      w.delete(M), re = Ks(
        s,
        i,
        ee,
        ie.path,
        se,
        de,
        p,
        a
      );
    else if (U)
      v && (re = Ks(
        s,
        i,
        ee,
        ie.path,
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
      fl(de, B) && (re = Ks(
        s,
        i,
        ee,
        ie.path,
        se,
        de,
        p,
        a,
        B
      ));
    }
    re && G.push({
      key: M,
      routeId: ie.routeId,
      path: ie.path,
      matches: re,
      match: de,
      request: ee,
      controller: k
    });
  }), { dsMatches: Q, revalidatingFetchers: G };
}
function Uh(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function t1(t, a, s) {
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
function $N(t, a, s) {
  let i = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    s.route.id !== a.route.id
  ), o = !t.hasOwnProperty(s.route.id);
  return i || o;
}
function UN(t, a) {
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
    et(
      p,
      `No route found to patch children into: routeId = ${t}`
    ), p.children || (p.children = []), f = p.children;
  } else
    f = s;
  let m = [], y = [];
  if (a.forEach((p) => {
    let b = f.find(
      (v) => n1(p, v)
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
function n1(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (s, i) => a.children?.some((o) => n1(s, o))
  ) ?? !1 : !1;
}
var _y = /* @__PURE__ */ new WeakMap(), a1 = ({
  key: t,
  route: a,
  manifest: s,
  mapRouteProperties: i
}) => {
  let o = s[a.id];
  if (et(o, "No route found in manifest"), !o.lazy || typeof o.lazy != "object")
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
    let p = eN(t), v = o[t] !== void 0 && t !== "hasErrorBoundary";
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
function BN(t, a, s, i, o) {
  let u = s[t.id];
  if (et(u, "No route found in manifest"), !t.lazy)
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
      et(
        typeof t.lazy == "function",
        "No lazy route function found"
      );
      let w = await t.lazy(), S = {};
      for (let j in w) {
        let N = w[j];
        if (N === void 0)
          continue;
        let R = nN(j), $ = u[j] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        j !== "hasErrorBoundary";
        R ? Xt(
          !R,
          "Route property " + j + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : $ ? Xt(
          !$,
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
    let v = a1({
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
async function IN(t) {
  return t.matches.some((a) => a.route.middleware) ? r1(t, () => Ay(t)) : Ay(t);
}
function r1(t, a) {
  return VN(
    t,
    a,
    (i) => {
      if (eC(i))
        throw i;
      return i;
    },
    QN,
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
      ), y = br(
        f,
        f[m].route.id
      ).route.id;
      return Promise.resolve({
        [y]: { type: "error", result: i }
      });
    }
  }
}
async function VN(t, a, s, i, o) {
  let { matches: u, ...f } = t, m = u.flatMap(
    (p) => p.route.middleware ? p.route.middleware.map((b) => [p.route.id, b]) : []
  );
  return await s1(
    f,
    m,
    a,
    s,
    i,
    o
  );
}
async function s1(t, a, s, i, o, u, f = 0) {
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
      return v = { value: await s1(
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
function i1(t, a, s, i, o) {
  let u = a1({
    key: "middleware",
    route: i.route,
    manifest: a,
    mapRouteProperties: t
  }), f = BN(
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
  let v = !1, w = i1(
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
      let { lazy: j, loader: N, middleware: R } = u.route, T = v || y || S && !bn(s.method) && (j || N), $ = R && R.length > 0 && !N && !j;
      return T && (bn(s.method) || !$) ? HN({
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
    _lazyPromises: i1(
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
async function qN(t, a, s, i, o, u, f) {
  i.some((b) => b._lazyPromises?.middleware) && await Promise.all(i.map((b) => b._lazyPromises?.middleware));
  let m = {
    request: a,
    unstable_url: l1(a, s),
    unstable_pattern: jl(i),
    params: i[0].params,
    context: u,
    matches: i
  }, p = await t({
    ...m,
    fetcherKey: o,
    runClientMiddleware: (b) => {
      let v = m;
      return r1(v, () => b({
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
async function HN({
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
    let j, N = new Promise(($, _) => j = _);
    p = () => j(), t.signal.addEventListener("abort", p);
    let R = ($) => typeof S != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${v}" [routeId: ${i.route.id}]`
      )
    ) : S(
      {
        request: t,
        unstable_url: l1(t, a),
        unstable_pattern: s,
        params: i.params,
        context: m
      },
      ...$ !== void 0 ? [$] : []
    ), T = (async () => {
      try {
        return { type: "data", result: await (f ? f((_) => R(_)) : R()) };
      } catch ($) {
        return { type: "error", result: $ };
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
async function FN(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function PN(t) {
  let { result: a, type: s } = t;
  if (Bh(a)) {
    let i;
    try {
      i = await FN(a);
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
    error: XN(a),
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
function GN(t, a, s, i, o) {
  let u = t.headers.get("Location");
  if (et(
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
  let o = t.createURL(o1(a)).toString(), u = { signal: s };
  if (i && bn(i.formMethod)) {
    let { formMethod: f, formEncType: m } = i;
    u.method = f.toUpperCase(), m === "application/json" ? (u.headers = new Headers({ "Content-Type": m }), u.body = JSON.stringify(i.json)) : m === "text/plain" ? u.body = i.text : m === "application/x-www-form-urlencoded" && i.formData ? u.body = ah(i.formData) : u.body = i.formData;
  }
  return new Request(o, u);
}
function l1(t, a) {
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
function YN(t, a, s, i = !1, o = !1) {
  let u = {}, f = null, m, y = !1, p = {}, b = s && Vn(s[1]) ? s[1].error : void 0;
  return t.forEach((v) => {
    if (!(v.route.id in a))
      return;
    let w = v.route.id, S = a[w];
    if (et(
      !Kr(S),
      "Cannot handle redirect results in processLoaderData"
    ), Vn(S)) {
      let j = S.error;
      if (b !== void 0 && (j = b, b = void 0), f = f || {}, o)
        f[w] = j;
      else {
        let N = br(t, w);
        f[N.route.id] == null && (f[N.route.id] = j);
      }
      i || (u[w] = e1), y || (y = !0, m = gl(S.error) ? S.error.status : 500), S.headers && (p[w] = S.headers);
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
  let { loaderData: f, errors: m } = YN(
    a,
    s,
    i
  );
  return o.filter((y) => !y.matches || y.matches.some((p) => p.shouldLoad)).forEach((y) => {
    let { key: p, match: b, controller: v } = y;
    if (v && v.signal.aborted)
      return;
    let w = u[p];
    if (et(w, "Did not find corresponding fetcher result"), Vn(w)) {
      let S = br(t.matches, b?.route.id);
      m && m[S.route.id] || (m = {
        ...m,
        [S.route.id]: w.error
      }), t.fetchers.delete(p);
    } else if (Kr(w))
      et(!1, "Unhandled fetcher revalidation redirect");
    else {
      let S = Ba(w.data);
      t.fetchers.set(p, S);
    }
  }), { loaderData: f, errors: m };
}
function Ly(t, a, s, i) {
  let o = Object.entries(a).filter(([, u]) => u !== e1).reduce((u, [f, m]) => (u[f] = m, u), {});
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
function br(t, a) {
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
function o1(t) {
  let a = typeof t == "string" ? fa(t) : t;
  return xa({ ...a, hash: "" });
}
function KN(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function XN(t) {
  return new Vc(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function QN(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, s]) => typeof a == "string" && ZN(s)
  );
}
function ZN(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function JN(t) {
  return Bh(t.result) && Jx.has(t.result.status);
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
function WN(t) {
  return Jx.has(t);
}
function eC(t) {
  return Bh(t) && WN(t.status) && t.headers.has("Location");
}
function tC(t) {
  return AN.has(t.toUpperCase());
}
function bn(t) {
  return _N.has(t.toUpperCase());
}
function Ih(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function pc(t, a) {
  let s = typeof a == "string" ? fa(a).search : a.search;
  if (t[t.length - 1].route.index && Ih(s || ""))
    return t[t.length - 1];
  let i = Yx(t);
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
function nC(t, a) {
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
function aC(t, a) {
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
function rC(t, a) {
  try {
    let s = t.sessionStorage.getItem(
      Wx
    );
    if (s) {
      let i = JSON.parse(s);
      for (let [o, u] of Object.entries(i || {}))
        u && Array.isArray(u) && a.set(o, new Set(u || []));
    }
  } catch {
  }
}
function sC(t, a) {
  if (a.size > 0) {
    let s = {};
    for (let [i, o] of a)
      s[i] = [...o];
    try {
      t.sessionStorage.setItem(
        Wx,
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
var c1 = g.createContext(!1);
function u1() {
  return g.useContext(c1);
}
var Vh = g.createContext({
  isTransitioning: !1
});
Vh.displayName = "ViewTransition";
var d1 = g.createContext(
  /* @__PURE__ */ new Map()
);
d1.displayName = "Fetchers";
var iC = g.createContext(null);
iC.displayName = "Await";
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
var f1 = "REACT_ROUTER_ERROR", lC = "REDIRECT", oC = "ROUTE_ERROR_RESPONSE";
function cC(t) {
  if (t.startsWith(`${f1}:${lC}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function uC(t) {
  if (t.startsWith(
    `${f1}:${oC}:{`
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
function dC(t, { relative: a } = {}) {
  et(
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
  return et(
    Nl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), g.useContext(qc).location;
}
var h1 = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function m1(t) {
  g.useContext(ra).static || g.useLayoutEffect(t);
}
function ti() {
  let { isDataRoute: t } = g.useContext(qa);
  return t ? jC() : fC();
}
function fC() {
  et(
    Nl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = g.useContext(ts), { basename: a, navigator: s } = g.useContext(ra), { matches: i } = g.useContext(qa), { pathname: o } = Ha(), u = JSON.stringify(Lh(i)), f = g.useRef(!1);
  return m1(() => {
    f.current = !0;
  }), g.useCallback(
    (y, p = {}) => {
      if (Xt(f.current, h1), !f.current) return;
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
function hC(t, a, s) {
  et(
    Nl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: i } = g.useContext(ra), { matches: o } = g.useContext(qa), u = o[o.length - 1], f = u ? u.params : {}, m = u ? u.pathname : "/", y = u ? u.pathnameBase : "/", p = u && u.route;
  {
    let R = p && p.path || "";
    v1(
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
  let j = yr(t, { pathname: S });
  return Xt(
    p || j != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `
  ), Xt(
    j == null || j[j.length - 1].route.element !== void 0 || j[j.length - 1].route.Component !== void 0 || j[j.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), yC(
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
function mC() {
  let t = wC(), a = gl(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), s = t instanceof Error ? t.stack : null, i = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: i }, u = { padding: "2px 4px", backgroundColor: i }, f = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), f = /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ g.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ g.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ g.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ g.createElement("h3", { style: { fontStyle: "italic" } }, a), s ? /* @__PURE__ */ g.createElement("pre", { style: o }, s) : null, f);
}
var pC = /* @__PURE__ */ g.createElement(mC, null), p1 = class extends g.Component {
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
      const s = uC(t.digest);
      s && (t = s);
    }
    let a = t !== void 0 ? /* @__PURE__ */ g.createElement(qa.Provider, { value: this.props.routeContext }, /* @__PURE__ */ g.createElement(
      qh.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ g.createElement(gC, { error: t }, a) : a;
  }
};
p1.contextType = c1;
var vf = /* @__PURE__ */ new WeakMap();
function gC({
  children: t,
  error: a
}) {
  let { basename: s } = g.useContext(ra);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let i = cC(a.digest);
    if (i) {
      let o = vf.get(a);
      if (o) throw o;
      let u = Xx(i.location, s);
      if (Kx && !vf.get(a))
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
function vC({ routeContext: t, match: a, children: s }) {
  let i = g.useContext(ts);
  return i && i.static && i.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (i.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ g.createElement(qa.Provider, { value: t }, s);
}
function yC(t, a = [], s) {
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
    et(
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
      i && (S = u && v.route.id ? u[v.route.id] : void 0, N = v.route.errorElement || pC, f && (m < 0 && w === 0 ? (v1(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), j = !0, R = null) : m === w && (j = !0, R = v.route.hydrateFallbackElement || null)));
      let T = a.concat(o.slice(0, w + 1)), $ = () => {
        let _;
        return S ? _ = N : j ? _ = R : v.route.Component ? _ = /* @__PURE__ */ g.createElement(v.route.Component, null) : v.route.element ? _ = v.route.element : _ = b, /* @__PURE__ */ g.createElement(
          vC,
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
        p1,
        {
          location: i.location,
          revalidation: i.revalidation,
          component: N,
          error: S,
          children: $(),
          routeContext: { outlet: null, matches: T, isDataRoute: !0 },
          onError: p
        }
      ) : $();
    },
    null
  );
}
function Hh(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function bC(t) {
  let a = g.useContext(ts);
  return et(a, Hh(t)), a;
}
function g1(t) {
  let a = g.useContext(El);
  return et(a, Hh(t)), a;
}
function xC(t) {
  let a = g.useContext(qa);
  return et(a, Hh(t)), a;
}
function Hc(t) {
  let a = xC(t), s = a.matches[a.matches.length - 1];
  return et(
    s.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), s.route.id;
}
function SC() {
  return Hc(
    "useRouteId"
    /* UseRouteId */
  );
}
function Tl() {
  let t = g1(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Hc(
    "useLoaderData"
    /* UseLoaderData */
  );
  return t.loaderData[a];
}
function wC() {
  let t = g.useContext(qh), a = g1(
    "useRouteError"
    /* UseRouteError */
  ), s = Hc(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[s];
}
function jC() {
  let { router: t } = bC(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Hc(
    "useNavigate"
    /* UseNavigateStable */
  ), s = g.useRef(!1);
  return m1(() => {
    s.current = !0;
  }), g.useCallback(
    async (o, u = {}) => {
      Xt(s.current, h1), s.current && (typeof o == "number" ? await t.navigate(o) : await t.navigate(o, { fromRouteId: a, ...u }));
    },
    [t, a]
  );
}
var Vy = {};
function v1(t, a, s) {
  !a && !Vy[t] && (Vy[t] = !0, Xt(!1, s));
}
var qy = {};
function Hy(t, a) {
  !t && !qy[a] && (qy[a] = !0, console.warn(a));
}
var EC = "useOptimistic", Fy = VE[EC], NC = () => {
};
function CC(t) {
  return Fy ? Fy(t) : [t, NC];
}
function TC(t) {
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
var RC = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function _C(t, a) {
  return ON({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: QE({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: t,
    hydrationRouteProperties: RC,
    mapRouteProperties: TC,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var MC = class {
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
function AC({
  router: t,
  flushSync: a,
  onError: s,
  unstable_useTransitions: i
}) {
  i = u1() || i;
  let [u, f] = g.useState(t.state), [m, y] = CC(u), [p, b] = g.useState(), [v, w] = g.useState({
    isTransitioning: !1
  }), [S, j] = g.useState(), [N, R] = g.useState(), [T, $] = g.useState(), _ = g.useRef(/* @__PURE__ */ new Map()), C = g.useCallback(
    (V, { deletedFetchers: D, newErrors: P, flushSync: J, viewTransitionOpts: Q }) => {
      P && s && Object.values(P).forEach(
        (ie) => s(ie, {
          location: V.location,
          params: V.matches[0]?.params ?? {},
          unstable_pattern: jl(V.matches)
        })
      ), V.fetchers.forEach((ie, M) => {
        ie.data !== void 0 && _.current.set(M, ie.data);
      }), D.forEach((ie) => _.current.delete(ie)), Hy(
        J === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let G = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (Hy(
        Q == null || G,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !Q || !G) {
        a && J ? a(() => f(V)) : i === !1 ? f(V) : g.startTransition(() => {
          i === !0 && y((ie) => Py(ie, V)), f(V);
        });
        return;
      }
      if (a && J) {
        a(() => {
          N && (S?.resolve(), N.skipTransition()), w({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: Q.currentLocation,
            nextLocation: Q.nextLocation
          });
        });
        let ie = t.window.document.startViewTransition(() => {
          a(() => f(V));
        });
        ie.finished.finally(() => {
          a(() => {
            j(void 0), R(void 0), b(void 0), w({ isTransitioning: !1 });
          });
        }), a(() => R(ie));
        return;
      }
      N ? (S?.resolve(), N.skipTransition(), $({
        state: V,
        currentLocation: Q.currentLocation,
        nextLocation: Q.nextLocation
      })) : (b(V), w({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: Q.currentLocation,
        nextLocation: Q.nextLocation
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
    v.isTransitioning && !v.flushSync && j(new MC());
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
    }), $(void 0));
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
  }), [t]), ae = t.basename || "/", A = g.useMemo(
    () => ({
      router: t,
      navigator: Y,
      static: !1,
      basename: ae,
      onError: s
    }),
    [t, Y, ae, s]
  );
  return /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement(ts.Provider, { value: A }, /* @__PURE__ */ g.createElement(El.Provider, { value: m }, /* @__PURE__ */ g.createElement(d1.Provider, { value: _.current }, /* @__PURE__ */ g.createElement(Vh.Provider, { value: v }, /* @__PURE__ */ g.createElement(
    zC,
    {
      basename: ae,
      location: m.location,
      navigationType: m.historyAction,
      navigator: Y,
      unstable_useTransitions: i
    },
    /* @__PURE__ */ g.createElement(
      kC,
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
var kC = g.memo(DC);
function DC({
  routes: t,
  future: a,
  state: s,
  isStatic: i,
  onError: o
}) {
  return hC(t, void 0, { state: s, isStatic: i, onError: o });
}
function zC({
  basename: t = "/",
  children: a = null,
  location: s,
  navigationType: i = "POP",
  navigator: o,
  static: u = !1,
  unstable_useTransitions: f
}) {
  et(
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
function OC(t) {
  return Fc(t) && t.tagName.toLowerCase() === "button";
}
function LC(t) {
  return Fc(t) && t.tagName.toLowerCase() === "form";
}
function $C(t) {
  return Fc(t) && t.tagName.toLowerCase() === "input";
}
function UC(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function BC(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !UC(t);
}
var Go = null;
function IC() {
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
var VC = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function yf(t) {
  return t != null && !VC.has(t) ? (Xt(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${vc}"`
  ), null) : t;
}
function qC(t, a) {
  let s, i, o, u, f;
  if (LC(t)) {
    let m = t.getAttribute("action");
    i = m ? aa(m, a) : null, s = t.getAttribute("method") || gc, o = yf(t.getAttribute("enctype")) || vc, u = new FormData(t);
  } else if (OC(t) || $C(t) && (t.type === "submit" || t.type === "image")) {
    let m = t.form;
    if (m == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let y = t.getAttribute("formaction") || m.getAttribute("action");
    if (i = y ? aa(y, a) : null, s = t.getAttribute("formmethod") || m.getAttribute("method") || gc, o = yf(t.getAttribute("formenctype")) || yf(m.getAttribute("enctype")) || vc, u = new FormData(m, t), !IC()) {
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
function y1(t, a, s, i) {
  let o = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return s ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${i}` : o.pathname = `${o.pathname}.${i}` : o.pathname === "/" ? o.pathname = `_root.${i}` : a && aa(o.pathname, a) === "/" ? o.pathname = `${Nc(a)}/_root.${i}` : o.pathname = `${Nc(o.pathname)}.${i}`, o;
}
async function HC(t, a) {
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
function FC(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function PC(t, a, s) {
  let i = await Promise.all(
    t.map(async (o) => {
      let u = a.routes[o.route.id];
      if (u) {
        let f = await HC(u, s);
        return f.links ? f.links() : [];
      }
      return [];
    })
  );
  return XC(
    i.flat(1).filter(FC).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
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
function GC(t, a, { includeHydrateFallback: s } = {}) {
  return YC(
    t.map((i) => {
      let o = a.routes[i.route.id];
      if (!o) return [];
      let u = [o.module];
      return o.clientActionModule && (u = u.concat(o.clientActionModule)), o.clientLoaderModule && (u = u.concat(o.clientLoaderModule)), s && o.hydrateFallbackModule && (u = u.concat(o.hydrateFallbackModule)), o.imports && (u = u.concat(o.imports)), u;
    }).flat(1)
  );
}
function YC(t) {
  return [...new Set(t)];
}
function KC(t) {
  let a = {}, s = Object.keys(t).sort();
  for (let i of s)
    a[i] = t[i];
  return a;
}
function XC(t, a) {
  let s = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((i, o) => {
    let u = JSON.stringify(KC(o));
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
function QC() {
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
function ZC(t, a) {
  let s = g.useContext(Gh), [i, o] = g.useState(!1), [u, f] = g.useState(!1), { onFocus: m, onBlur: y, onMouseEnter: p, onMouseLeave: b, onTouchStart: v } = a, w = g.useRef(null);
  g.useEffect(() => {
    if (t === "render" && f(!0), t === "viewport") {
      let N = (T) => {
        T.forEach(($) => {
          f($.isIntersecting);
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
function JC({ page: t, ...a }) {
  let s = u1(), { router: i } = Ph(), o = g.useMemo(
    () => yr(i.routes, t, i.basename),
    [i.routes, t, i.basename]
  );
  return o ? s ? /* @__PURE__ */ g.createElement(eT, { page: t, matches: o, ...a }) : /* @__PURE__ */ g.createElement(tT, { page: t, matches: o, ...a }) : null;
}
function WC(t) {
  let { manifest: a, routeModules: s } = Yh(), [i, o] = g.useState([]);
  return g.useEffect(() => {
    let u = !1;
    return PC(t, a, s).then(
      (f) => {
        u || o(f);
      }
    ), () => {
      u = !0;
    };
  }, [t, a, s]), i;
}
function eT({
  page: t,
  matches: a,
  ...s
}) {
  let i = Ha(), { future: o } = Yh(), { basename: u } = Ph(), f = g.useMemo(() => {
    if (t === i.pathname + i.search + i.hash)
      return [];
    let m = y1(
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
function tT({
  page: t,
  matches: a,
  ...s
}) {
  let i = Ha(), { future: o, manifest: u, routeModules: f } = Yh(), { basename: m } = Ph(), { loaderData: y, matches: p } = QC(), b = g.useMemo(
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
    if (a.forEach(($) => {
      let _ = u.routes[$.route.id];
      !_ || !_.hasLoader || (!b.some((C) => C.route.id === $.route.id) && $.route.id in y && f[$.route.id]?.shouldRevalidate || _.hasClientLoader ? R = !0 : N.add($.route.id));
    }), N.size === 0)
      return [];
    let T = y1(
      t,
      m,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return R && N.size > 0 && T.searchParams.set(
      "_routes",
      a.filter(($) => N.has($.route.id)).map(($) => $.route.id).join(",")
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
    () => GC(v, u),
    [v, u]
  ), j = WC(v);
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
function nT(...t) {
  return (a) => {
    t.forEach((s) => {
      typeof s == "function" ? s(a) : s != null && (s.current = a);
    });
  };
}
var aT = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  aT && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var b1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Kh = g.forwardRef(
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
    let { basename: R, navigator: T, unstable_useTransitions: $ } = g.useContext(ra), _ = typeof b == "string" && b1.test(b), C = Xx(b, R);
    b = C.to;
    let I = dC(b, { relative: o }), Y = Ha(), ae = null;
    if (m) {
      let ie = Ic(
        m,
        [],
        Y.unstable_mask ? Y.unstable_mask.pathname : "/",
        !0
      );
      R !== "/" && (ie.pathname = ie.pathname === "/" ? R : ea([R, ie.pathname])), ae = T.createHref(ie);
    }
    let [A, V, D] = ZC(
      i,
      j
    ), P = lT(b, {
      replace: f,
      unstable_mask: m,
      state: y,
      target: p,
      preventScrollReset: v,
      relative: o,
      viewTransition: w,
      unstable_defaultShouldRevalidate: S,
      unstable_useTransitions: $
    });
    function J(ie) {
      a && a(ie), ie.defaultPrevented || P(ie);
    }
    let Q = !(C.isExternal || u), G = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ g.createElement(
        "a",
        {
          ...j,
          ...D,
          href: (Q ? ae : void 0) || C.absoluteURL || I,
          onClick: Q ? J : a,
          ref: nT(N, V),
          target: p,
          "data-discover": !_ && s === "render" ? "true" : void 0
        }
      )
    );
    return A && !_ ? /* @__PURE__ */ g.createElement(g.Fragment, null, G, /* @__PURE__ */ g.createElement(JC, { page: I })) : G;
  }
);
Kh.displayName = "Link";
var rT = g.forwardRef(
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
    fT(v) && m === !0, T = j.encodeLocation ? j.encodeLocation(v).pathname : v.pathname, $ = w.pathname, _ = S && S.navigation && S.navigation.location ? S.navigation.location.pathname : null;
    s || ($ = $.toLowerCase(), _ = _ ? _.toLowerCase() : null, T = T.toLowerCase()), _ && N && (_ = aa(_, N) || _);
    const C = T !== "/" && T.endsWith("/") ? T.length - 1 : T.length;
    let I = $ === T || !o && $.startsWith(T) && $.charAt(C) === "/", Y = _ != null && (_ === T || !o && _.startsWith(T) && _.charAt(T.length) === "/"), ae = {
      isActive: I,
      isPending: Y,
      isTransitioning: R
    }, A = I ? a : void 0, V;
    typeof i == "function" ? V = i(ae) : V = [
      i,
      I ? "active" : null,
      Y ? "pending" : null,
      R ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let D = typeof u == "function" ? u(ae) : u;
    return /* @__PURE__ */ g.createElement(
      Kh,
      {
        ...p,
        "aria-current": A,
        className: V,
        ref: b,
        style: D,
        to: f,
        viewTransition: m
      },
      typeof y == "function" ? y(ae) : y
    );
  }
);
rT.displayName = "NavLink";
var sT = g.forwardRef(
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
    let { unstable_useTransitions: N } = g.useContext(ra), R = uT(), T = dT(m, { relative: p }), $ = f.toLowerCase() === "get" ? "get" : "post", _ = typeof m == "string" && b1.test(m), C = (I) => {
      if (y && y(I), I.defaultPrevented) return;
      I.preventDefault();
      let Y = I.nativeEvent.submitter, ae = Y?.getAttribute("formmethod") || f, A = () => R(Y || I.currentTarget, {
        fetcherKey: a,
        method: ae,
        navigate: s,
        replace: o,
        state: u,
        relative: p,
        preventScrollReset: b,
        viewTransition: v,
        unstable_defaultShouldRevalidate: w
      });
      N && s !== !1 ? g.startTransition(() => A()) : A();
    };
    return /* @__PURE__ */ g.createElement(
      "form",
      {
        ref: j,
        method: $,
        action: T,
        onSubmit: i ? y : C,
        ...S,
        "data-discover": !_ && t === "render" ? "true" : void 0
      }
    );
  }
);
sT.displayName = "Form";
function iT(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function x1(t) {
  let a = g.useContext(ts);
  return et(a, iT(t)), a;
}
function lT(t, {
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
      if (BC(S, a)) {
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
var oT = 0, cT = () => `__${String(++oT)}__`;
function uT() {
  let { router: t } = x1(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = g.useContext(ra), s = SC(), i = t.fetch, o = t.navigate;
  return g.useCallback(
    async (u, f = {}) => {
      let { action: m, method: y, encType: p, formData: b, body: v } = qC(
        u,
        a
      );
      if (f.navigate === !1) {
        let w = f.fetcherKey || cT();
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
function dT(t, { relative: a } = {}) {
  let { basename: s } = g.useContext(ra), i = g.useContext(qa);
  et(i, "useFormAction must be used inside a RouteContext");
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
function fT(t, { relative: a } = {}) {
  let s = g.useContext(Vh);
  et(
    s != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: i } = x1(
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
function hT(t, a, s) {
  const i = t.startsWith("http") ? t : `${Sa}${t}`, o = new EventSource(i);
  return o.onmessage = (u) => {
    if (u.data)
      try {
        a(JSON.parse(u.data));
      } catch {
      }
  }, o.onerror = (u) => {
    s?.(u);
  }, () => o.close();
}
async function mT() {
  return Rt("/deployments");
}
async function Yy(t) {
  return Rt(`/deployments/${t}`);
}
async function pT(t, a) {
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
async function S1(t, a) {
  await Rt(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function gT(t) {
  return Rt(`/mappings/export?deploymentId=${encodeURIComponent(t)}`);
}
async function vT(t, a, s = "error") {
  return Rt("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: t, mappings: a, conflictStrategy: s })
  });
}
async function yT(t, a = {}) {
  const s = new URLSearchParams();
  a.limit && s.set("limit", String(a.limit)), a.status && s.set("status", a.status);
  const i = s.toString(), o = i ? `?${i}` : "";
  return Rt(`/deployments/${t}/runs${o}`);
}
async function w1(t, a) {
  return Rt(`/deployments/${t}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function bT(t, a) {
  return Promise.all(a.map((s) => w1(t, s)));
}
function xT(t, a) {
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
async function j1(t, a) {
  return Rt(`/deployments/${t}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function ST(t, a) {
  return Rt(`/deployments/${t}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function bf(t, a, s, i) {
  return hT(
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
async function wT(t, a) {
  await Rt(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function jT(t, a, s) {
  return Rt(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ displayName: s })
    }
  );
}
function ET(t) {
  if (!t.audioArtifactRef) return null;
  const a = new URLSearchParams({ deploymentId: t.deploymentId });
  return `${Sa}/voice-assets/${encodeURIComponent(t.voiceAssetId)}/audio?${a.toString()}`;
}
async function NT(t) {
  return Rt(`/workflow?deploymentId=${encodeURIComponent(t)}`);
}
var CT = "mux0i60", TT = "mux0i61", RT = "mux0i62", _T = "mux0i63";
function Pc({ count: t = "0", title: a, hint: s }) {
  return /* @__PURE__ */ c.jsxs("div", { className: CT, children: [
    /* @__PURE__ */ c.jsx("span", { className: TT, "aria-hidden": "true", children: t }),
    /* @__PURE__ */ c.jsx("h3", { className: RT, children: a }),
    s ? /* @__PURE__ */ c.jsx("p", { className: _T, children: s }) : null
  ] });
}
var MT = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, AT = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, kT = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, DT = "zwn3019";
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
  const y = [MT[t], kT[a], AT[s], u].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(i, { className: y, style: f, "data-elevation": s, ...m, children: o });
}
function zT({ children: t, className: a }) {
  const s = [DT, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: s, children: t });
}
var Zr = "vrkn5p0", OT = "_93p6291", LT = "_93p6292", $T = "_93p6293", UT = "_93p6294", BT = "_93p6295", IT = "_93p6296", VT = "_93p6297", qT = "_93p6298", HT = "_93p6299", FT = "_93p629a", PT = "_93p629b", GT = "_93p629c", YT = "_93p629d", KT = "_93p629e";
const XT = "nexus-host-navigate";
function QT(t) {
  return `#/deployments/${encodeURIComponent(t)}`;
}
function ZT(t, a) {
  if (t.defaultPrevented || t.button !== 0 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey)
    return;
  t.preventDefault();
  const s = {
    kind: "deployment-detail",
    deploymentId: a
  };
  window.dispatchEvent(
    new CustomEvent(XT, {
      detail: s
    })
  );
}
function JT() {
  const { deployments: t } = Tl(), a = t.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ c.jsxs("main", { className: OT, children: [
    /* @__PURE__ */ c.jsxs("header", { className: LT, children: [
      /* @__PURE__ */ c.jsx("p", { className: $T, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ c.jsxs("h1", { className: UT, children: [
        "Direct your characters.",
        /* @__PURE__ */ c.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: BT, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ c.jsxs("p", { className: IT, children: [
        /* @__PURE__ */ c.jsx("span", { className: VT, children: t.length }),
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
        className: qT,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ c.jsx("h2", { id: "deployments-section-list", className: Zr, children: "01 / Deployments" }),
          t.length === 0 ? /* @__PURE__ */ c.jsx(
            Pc,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ c.jsx("ul", { className: HT, children: t.map((s) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
            "a",
            {
              href: QT(s.deploymentId),
              onClick: (i) => ZT(i, s.deploymentId),
              className: FT,
              children: [
                /* @__PURE__ */ c.jsx("span", { className: PT, "aria-hidden": "true", children: WT(s.displayName) }),
                /* @__PURE__ */ c.jsxs("span", { children: [
                  /* @__PURE__ */ c.jsx("span", { className: GT, children: s.displayName }),
                  /* @__PURE__ */ c.jsx("span", { className: YT, children: s.deploymentId })
                ] }),
                /* @__PURE__ */ c.jsx("span", { className: KT, "aria-hidden": "true", children: "→" })
              ]
            }
          ) }, s.deploymentId)) })
        ]
      }
    )
  ] });
}
function WT(t) {
  const a = t.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
var Zh = qx();
const eR = /* @__PURE__ */ Vx(Zh);
function tR(t) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], s = document.createElement("style");
  s.type = "text/css", a.appendChild(s), s.styleSheet ? s.styleSheet.cssText = t : s.appendChild(document.createTextNode(t));
}
const nR = (t) => {
  switch (t) {
    case "success":
      return sR;
    case "info":
      return lR;
    case "warning":
      return iR;
    case "error":
      return oR;
    default:
      return null;
  }
}, aR = Array(12).fill(0), rR = ({ visible: t, className: a }) => /* @__PURE__ */ Se.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": t
}, /* @__PURE__ */ Se.createElement("div", {
  className: "sonner-spinner"
}, aR.map((s, i) => /* @__PURE__ */ Se.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${i}`
})))), sR = /* @__PURE__ */ Se.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ Se.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), iR = /* @__PURE__ */ Se.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ Se.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), lR = /* @__PURE__ */ Se.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ Se.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), oR = /* @__PURE__ */ Se.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ Se.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), cR = /* @__PURE__ */ Se.createElement("svg", {
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
})), uR = () => {
  const [t, a] = Se.useState(document.hidden);
  return Se.useEffect(() => {
    const s = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", s), () => window.removeEventListener("visibilitychange", s);
  }, []), t;
};
let rh = 1;
class dR {
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
        else if (hR(p) && !p.ok) {
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
const An = new dR(), fR = (t, a) => {
  const s = a?.id || rh++;
  return An.addToast({
    title: t,
    ...a,
    id: s
  }), s;
}, hR = (t) => t && typeof t == "object" && "ok" in t && typeof t.ok == "boolean" && "status" in t && typeof t.status == "number", mR = fR, pR = () => An.toasts, gR = () => An.getActiveToasts(), pn = Object.assign(mR, {
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
  getHistory: pR,
  getToasts: gR
});
tR("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Yo(t) {
  return t.label !== void 0;
}
const vR = 3, yR = "24px", bR = "16px", Qy = 4e3, xR = 356, SR = 14, wR = 45, jR = 200;
function ba(...t) {
  return t.filter(Boolean).join(" ");
}
function ER(t) {
  const [a, s] = t.split("-"), i = [];
  return a && i.push(a), s && i.push(s), i;
}
const NR = (t) => {
  var a, s, i, o, u, f, m, y, p;
  const { invert: b, toast: v, unstyled: w, interacting: S, setHeights: j, visibleToasts: N, heights: R, index: T, toasts: $, expanded: _, removeToast: C, defaultRichColors: I, closeButton: Y, style: ae, cancelButtonStyle: A, actionButtonStyle: V, className: D = "", descriptionClassName: P = "", duration: J, position: Q, gap: G, expandByDefault: ie, classNames: M, icons: F, closeButtonAriaLabel: U = "Close toast" } = t, [se, de] = Se.useState(null), [k, ee] = Se.useState(null), [re, K] = Se.useState(!1), [B, W] = Se.useState(!1), [ce, ye] = Se.useState(!1), [Me, st] = Se.useState(!1), [Te, He] = Se.useState(!1), [Ve, Ke] = Se.useState(0), [Ft, Bt] = Se.useState(0), we = Se.useRef(v.duration || J || Qy), tt = Se.useRef(null), dt = Se.useRef(null), ft = T === 0, Ot = T + 1 <= N, Pe = v.type, vt = v.dismissible !== !1, yt = v.className || "", je = v.descriptionClassName || "", _e = Se.useMemo(() => R.findIndex((ge) => ge.toastId === v.id) || 0, [
    R,
    v.id
  ]), Ge = Se.useMemo(() => {
    var ge;
    return (ge = v.closeButton) != null ? ge : Y;
  }, [
    v.closeButton,
    Y
  ]), Fe = Se.useMemo(() => v.duration || J || Qy, [
    v.duration,
    J
  ]), Nt = Se.useRef(0), Mt = Se.useRef(0), Hn = Se.useRef(0), Sn = Se.useRef(null), [wn, Pt] = Q.split("-"), At = Se.useMemo(() => R.reduce((ge, O, he) => he >= _e ? ge : ge + O.height, 0), [
    R,
    _e
  ]), Lt = uR(), sa = v.invert || b, jn = Pe === "loading";
  Mt.current = Se.useMemo(() => _e * G + At, [
    _e,
    At
  ]), Se.useEffect(() => {
    we.current = Fe;
  }, [
    Fe
  ]), Se.useEffect(() => {
    K(!0);
  }, []), Se.useEffect(() => {
    const ge = dt.current;
    if (ge) {
      const O = ge.getBoundingClientRect().height;
      return Bt(O), j((he) => [
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
    if (!re) return;
    const ge = dt.current, O = ge.style.height;
    ge.style.height = "auto";
    const he = ge.getBoundingClientRect().height;
    ge.style.height = O, Bt(he), j((be) => be.find((Ue) => Ue.toastId === v.id) ? be.map((Ue) => Ue.toastId === v.id ? {
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
    re,
    v.title,
    v.description,
    j,
    v.id,
    v.jsx,
    v.action,
    v.cancel
  ]);
  const un = Se.useCallback(() => {
    W(!0), Ke(Mt.current), j((ge) => ge.filter((O) => O.toastId !== v.id)), setTimeout(() => {
      C(v);
    }, jR);
  }, [
    v,
    C,
    j,
    Mt
  ]);
  Se.useEffect(() => {
    if (v.promise && Pe === "loading" || v.duration === 1 / 0 || v.type === "loading") return;
    let ge;
    return _ || S || Lt ? (() => {
      if (Hn.current < Nt.current) {
        const be = (/* @__PURE__ */ new Date()).getTime() - Nt.current;
        we.current = we.current - be;
      }
      Hn.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      we.current !== 1 / 0 && (Nt.current = (/* @__PURE__ */ new Date()).getTime(), ge = setTimeout(() => {
        v.onAutoClose == null || v.onAutoClose.call(v, v), un();
      }, we.current));
    })(), () => clearTimeout(ge);
  }, [
    _,
    S,
    v,
    Pe,
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
        className: ba(M?.loader, v == null || (O = v.classNames) == null ? void 0 : O.loader, "sonner-loader"),
        "data-visible": Pe === "loading"
      }, F.loading);
    }
    return /* @__PURE__ */ Se.createElement(rR, {
      className: ba(M?.loader, v == null || (ge = v.classNames) == null ? void 0 : ge.loader),
      visible: Pe === "loading"
    });
  }
  const sn = v.icon || F?.[Pe] || nR(Pe);
  var fe, Ae;
  return /* @__PURE__ */ Se.createElement("li", {
    tabIndex: 0,
    ref: dt,
    className: ba(D, yt, M?.toast, v == null || (a = v.classNames) == null ? void 0 : a.toast, M?.default, M?.[Pe], v == null || (s = v.classNames) == null ? void 0 : s[Pe]),
    "data-sonner-toast": "",
    "data-rich-colors": (fe = v.richColors) != null ? fe : I,
    "data-styled": !(v.jsx || v.unstyled || w),
    "data-mounted": re,
    "data-promise": !!v.promise,
    "data-swiped": Te,
    "data-removed": B,
    "data-visible": Ot,
    "data-y-position": wn,
    "data-x-position": Pt,
    "data-index": T,
    "data-front": ft,
    "data-swiping": ce,
    "data-dismissible": vt,
    "data-type": Pe,
    "data-invert": sa,
    "data-swipe-out": Me,
    "data-swipe-direction": k,
    "data-expanded": !!(_ || ie && re),
    "data-testid": v.testId,
    style: {
      "--index": T,
      "--toasts-before": T,
      "--z-index": $.length - T,
      "--offset": `${B ? Ve : Mt.current}px`,
      "--initial-height": ie ? "auto" : `${Ft}px`,
      ...ae,
      ...v.style
    },
    onDragEnd: () => {
      ye(!1), de(null), Sn.current = null;
    },
    onPointerDown: (ge) => {
      ge.button !== 2 && (jn || !vt || (tt.current = /* @__PURE__ */ new Date(), Ke(Mt.current), ge.target.setPointerCapture(ge.pointerId), ge.target.tagName !== "BUTTON" && (ye(!0), Sn.current = {
        x: ge.clientX,
        y: ge.clientY
      })));
    },
    onPointerUp: () => {
      var ge, O, he;
      if (Me || !vt) return;
      Sn.current = null;
      const be = Number(((ge = dt.current) == null ? void 0 : ge.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), ze = Number(((O = dt.current) == null ? void 0 : O.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), Ue = (/* @__PURE__ */ new Date()).getTime() - ((he = tt.current) == null ? void 0 : he.getTime()), it = se === "x" ? be : ze, Vt = Math.abs(it) / Ue;
      if (Math.abs(it) >= wR || Vt > 0.11) {
        Ke(Mt.current), v.onDismiss == null || v.onDismiss.call(v, v), ee(se === "x" ? be > 0 ? "right" : "left" : ze > 0 ? "down" : "up"), un(), st(!0);
        return;
      } else {
        var lt, z;
        (lt = dt.current) == null || lt.style.setProperty("--swipe-amount-x", "0px"), (z = dt.current) == null || z.style.setProperty("--swipe-amount-y", "0px");
      }
      He(!1), ye(!1), de(null);
    },
    onPointerMove: (ge) => {
      var O, he, be;
      if (!Sn.current || !vt || ((O = window.getSelection()) == null ? void 0 : O.toString().length) > 0) return;
      const Ue = ge.clientY - Sn.current.y, it = ge.clientX - Sn.current.x;
      var Vt;
      const lt = (Vt = t.swipeDirections) != null ? Vt : ER(Q);
      !se && (Math.abs(it) > 1 || Math.abs(Ue) > 1) && de(Math.abs(it) > Math.abs(Ue) ? "x" : "y");
      let z = {
        x: 0,
        y: 0
      };
      const H = (Z) => 1 / (1.5 + Math.abs(Z) / 20);
      if (se === "y") {
        if (lt.includes("top") || lt.includes("bottom"))
          if (lt.includes("top") && Ue < 0 || lt.includes("bottom") && Ue > 0)
            z.y = Ue;
          else {
            const Z = Ue * H(Ue);
            z.y = Math.abs(Z) < Math.abs(Ue) ? Z : Ue;
          }
      } else if (se === "x" && (lt.includes("left") || lt.includes("right")))
        if (lt.includes("left") && it < 0 || lt.includes("right") && it > 0)
          z.x = it;
        else {
          const Z = it * H(it);
          z.x = Math.abs(Z) < Math.abs(it) ? Z : it;
        }
      (Math.abs(z.x) > 0 || Math.abs(z.y) > 0) && He(!0), (he = dt.current) == null || he.style.setProperty("--swipe-amount-x", `${z.x}px`), (be = dt.current) == null || be.style.setProperty("--swipe-amount-y", `${z.y}px`);
    }
  }, Ge && !v.jsx && Pe !== "loading" ? /* @__PURE__ */ Se.createElement("button", {
    "aria-label": U,
    "data-disabled": jn,
    "data-close-button": !0,
    onClick: jn || !vt ? () => {
    } : () => {
      un(), v.onDismiss == null || v.onDismiss.call(v, v);
    },
    className: ba(M?.closeButton, v == null || (i = v.classNames) == null ? void 0 : i.closeButton)
  }, (Ae = F?.close) != null ? Ae : cR) : null, (Pe || v.icon || v.promise) && v.icon !== null && (F?.[Pe] !== null || v.icon) ? /* @__PURE__ */ Se.createElement("div", {
    "data-icon": "",
    className: ba(M?.icon, v == null || (o = v.classNames) == null ? void 0 : o.icon)
  }, v.promise || v.type === "loading" && !v.icon ? v.icon || Qt() : null, v.type !== "loading" ? sn : null) : null, /* @__PURE__ */ Se.createElement("div", {
    "data-content": "",
    className: ba(M?.content, v == null || (u = v.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ Se.createElement("div", {
    "data-title": "",
    className: ba(M?.title, v == null || (f = v.classNames) == null ? void 0 : f.title)
  }, v.jsx ? v.jsx : typeof v.title == "function" ? v.title() : v.title), v.description ? /* @__PURE__ */ Se.createElement("div", {
    "data-description": "",
    className: ba(P, je, M?.description, v == null || (m = v.classNames) == null ? void 0 : m.description)
  }, typeof v.description == "function" ? v.description() : v.description) : null), /* @__PURE__ */ Se.isValidElement(v.cancel) ? v.cancel : v.cancel && Yo(v.cancel) ? /* @__PURE__ */ Se.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: v.cancelButtonStyle || A,
    onClick: (ge) => {
      Yo(v.cancel) && vt && (v.cancel.onClick == null || v.cancel.onClick.call(v.cancel, ge), un());
    },
    className: ba(M?.cancelButton, v == null || (y = v.classNames) == null ? void 0 : y.cancelButton)
  }, v.cancel.label) : null, /* @__PURE__ */ Se.isValidElement(v.action) ? v.action : v.action && Yo(v.action) ? /* @__PURE__ */ Se.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: v.actionButtonStyle || V,
    onClick: (ge) => {
      Yo(v.action) && (v.action.onClick == null || v.action.onClick.call(v.action, ge), !ge.defaultPrevented && un());
    },
    className: ba(M?.actionButton, v == null || (p = v.classNames) == null ? void 0 : p.actionButton)
  }, v.action.label) : null);
};
function Zy() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const t = document.documentElement.getAttribute("dir");
  return t === "auto" || !t ? window.getComputedStyle(document.documentElement).direction : t;
}
function CR(t, a) {
  const s = {};
  return [
    t,
    a
  ].forEach((i, o) => {
    const u = o === 1, f = u ? "--mobile-offset" : "--offset", m = u ? bR : yR;
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
const TR = /* @__PURE__ */ Se.forwardRef(function(a, s) {
  const { id: i, invert: o, position: u = "bottom-right", hotkey: f = [
    "altKey",
    "KeyT"
  ], expand: m, closeButton: y, className: p, offset: b, mobileOffset: v, theme: w = "light", richColors: S, duration: j, style: N, visibleToasts: R = vR, toastOptions: T, dir: $ = Zy(), gap: _ = SR, icons: C, containerAriaLabel: I = "Notifications" } = a, [Y, ae] = Se.useState([]), A = Se.useMemo(() => i ? Y.filter((re) => re.toasterId === i) : Y.filter((re) => !re.toasterId), [
    Y,
    i
  ]), V = Se.useMemo(() => Array.from(new Set([
    u
  ].concat(A.filter((re) => re.position).map((re) => re.position)))), [
    A,
    u
  ]), [D, P] = Se.useState([]), [J, Q] = Se.useState(!1), [G, ie] = Se.useState(!1), [M, F] = Se.useState(w !== "system" ? w : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), U = Se.useRef(null), se = f.join("+").replace(/Key/g, "").replace(/Digit/g, ""), de = Se.useRef(null), k = Se.useRef(!1), ee = Se.useCallback((re) => {
    ae((K) => {
      var B;
      return (B = K.find((W) => W.id === re.id)) != null && B.delete || An.dismiss(re.id), K.filter(({ id: W }) => W !== re.id);
    });
  }, []);
  return Se.useEffect(() => An.subscribe((re) => {
    if (re.dismiss) {
      requestAnimationFrame(() => {
        ae((K) => K.map((B) => B.id === re.id ? {
          ...B,
          delete: !0
        } : B));
      });
      return;
    }
    setTimeout(() => {
      eR.flushSync(() => {
        ae((K) => {
          const B = K.findIndex((W) => W.id === re.id);
          return B !== -1 ? [
            ...K.slice(0, B),
            {
              ...K[B],
              ...re
            },
            ...K.slice(B + 1)
          ] : [
            re,
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
    const re = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      re.addEventListener("change", ({ matches: K }) => {
        F(K ? "dark" : "light");
      });
    } catch {
      re.addListener(({ matches: B }) => {
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
    Y.length <= 1 && Q(!1);
  }, [
    Y
  ]), Se.useEffect(() => {
    const re = (K) => {
      var B;
      if (f.every((ye) => K[ye] || K.code === ye)) {
        var ce;
        Q(!0), (ce = U.current) == null || ce.focus();
      }
      K.code === "Escape" && (document.activeElement === U.current || (B = U.current) != null && B.contains(document.activeElement)) && Q(!1);
    };
    return document.addEventListener("keydown", re), () => document.removeEventListener("keydown", re);
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
  }, V.map((re, K) => {
    var B;
    const [W, ce] = re.split("-");
    return A.length ? /* @__PURE__ */ Se.createElement("ol", {
      key: re,
      dir: $ === "auto" ? Zy() : $,
      tabIndex: -1,
      ref: U,
      className: p,
      "data-sonner-toaster": !0,
      "data-sonner-theme": M,
      "data-y-position": W,
      "data-x-position": ce,
      style: {
        "--front-toast-height": `${((B = D[0]) == null ? void 0 : B.height) || 0}px`,
        "--width": `${xR}px`,
        "--gap": `${_}px`,
        ...N,
        ...CR(b, v)
      },
      onBlur: (ye) => {
        k.current && !ye.currentTarget.contains(ye.relatedTarget) && (k.current = !1, de.current && (de.current.focus({
          preventScroll: !0
        }), de.current = null));
      },
      onFocus: (ye) => {
        ye.target instanceof HTMLElement && ye.target.dataset.dismissible === "false" || k.current || (k.current = !0, de.current = ye.relatedTarget);
      },
      onMouseEnter: () => Q(!0),
      onMouseMove: () => Q(!0),
      onMouseLeave: () => {
        G || Q(!1);
      },
      onDragEnd: () => Q(!1),
      onPointerDown: (ye) => {
        ye.target instanceof HTMLElement && ye.target.dataset.dismissible === "false" || ie(!0);
      },
      onPointerUp: () => ie(!1)
    }, A.filter((ye) => !ye.position && K === 0 || ye.position === re).map((ye, Me) => {
      var st, Te;
      return /* @__PURE__ */ Se.createElement(NR, {
        key: ye.id,
        icons: C,
        index: Me,
        toast: ye,
        defaultRichColors: S,
        duration: (st = T?.duration) != null ? st : j,
        className: T?.className,
        descriptionClassName: T?.descriptionClassName,
        invert: o,
        visibleToasts: R,
        closeButton: (Te = T?.closeButton) != null ? Te : y,
        interacting: G,
        position: re,
        style: T?.style,
        unstyled: T?.unstyled,
        classNames: T?.classNames,
        cancelButtonStyle: T?.cancelButtonStyle,
        actionButtonStyle: T?.actionButtonStyle,
        closeButtonAriaLabel: T?.closeButtonAriaLabel,
        removeToast: ee,
        toasts: A.filter((He) => He.position == ye.position),
        heights: D.filter((He) => He.position == ye.position),
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
async function E1(t, a, s, i = {}) {
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
async function RR(t, a, s, i, o = {}) {
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
async function _R(t, a, s = {}) {
  const i = `${Sa}/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, o = await fetch(i, {
    method: "DELETE",
    ...s.signal ? { signal: s.signal } : {}
  });
  if (!o.ok && o.status !== 204)
    throw new Error(`clear edit failed: ${o.status}`);
}
async function MR(t, a, s, i = {}) {
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
function N1(t, a) {
  if (t.version !== 1)
    return { message: "Unsupported chain version." };
  if (t.ops.length > Jy)
    return {
      message: `Chain exceeds the maximum of ${Jy} operations.`
    };
  for (const s of t.ops) {
    const i = AR(s, a);
    if (i) return i;
  }
  return null;
}
function AR(t, a) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return kR(t.id, t.start_ms, t.end_ms, a);
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
function kR(t, a, s, i) {
  return a < 0 ? { opId: t, message: "Start must be ≥ 0 ms." } : s <= a ? { opId: t, message: "End must be greater than start." } : i > 0 && s > i ? { opId: t, message: "End extends past source duration." } : null;
}
async function Gc(t, a) {
  const s = await t.json().catch(() => null);
  return s?.error?.message ?? s?.message ?? `${a} failed: ${t.status}`;
}
var DR = "g5r6d10", zR = "g5r6d11", OR = "g5r6d12", LR = "g5r6d13", $R = "g5r6d14", UR = "g5r6d15", BR = "g5r6d1a", IR = "g5r6d1b", VR = "g5r6d1c", qR = "g5r6d1d", HR = "g5r6d1e", FR = "g5r6d1g", PR = "g5r6d1h", GR = "g5r6d1i", YR = "g5r6d1j", KR = "g5r6d1k", XR = "g5r6d1l", QR = "g5r6d1m", ZR = "g5r6d1n", JR = "g5r6d1o", d0 = "g5r6d1p", WR = "g5r6d1q", e_ = "g5r6d1r", t_ = "g5r6d1s", n_ = "g5r6d1t", a_ = "g5r6d1u", f0 = "g5r6d1v", h0 = "g5r6d1w", r_ = "g5r6d1x", s_ = "g5r6d1y", Gr = "g5r6d1z", i_ = "g5r6d110", m0 = "g5r6d111", l_ = "g5r6d112", o_ = "g5r6d113", mr = "g5r6d114", c_ = "g5r6d119", u_ = "a6ki8u0", d_ = "a6ki8u1", f_ = "a6ki8u2", h_ = "a6ki8u3", m_ = "a6ki8u4", p_ = "a6ki8u5", g_ = "a6ki8u6", xf = "a6ki8u7", v_ = "a6ki8u8", y_ = "a6ki8u9", b_ = "a6ki8ua", x_ = "a6ki8ub", S_ = "a6ki8uc", w_ = "a6ki8ud", j_ = "a6ki8ue", E_ = "a6ki8uf", N_ = "a6ki8ug", C_ = "a6ki8uh", T_ = "_1lguv7x0", R_ = "_1lguv7x1", __ = "_1lguv7x2", M_ = "_1lguv7x3", A_ = "_1lguv7x4", p0 = "_1lguv7x5", k_ = "_1lguv7x6", D_ = "_1lguv7x7", z_ = "_1lguv7x8", O_ = "_1lguv7x9", L_ = "_1lguv7xa", $_ = "_1lguv7xb", U_ = "_1lguv7xc", g0 = "_1lguv7xd", B_ = "_1lguv7xe", I_ = "_1lguv7xf", V_ = "_1lguv7xg", q_ = "_1lguv7xh", C1 = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, T1 = { xs: "_4ydn546", sm: "_4ydn547", md: "_4ydn548", lg: "_4ydn549" }, H_ = { xs: "_4ydn54a", sm: "_4ydn54b", md: "_4ydn54c", lg: "_4ydn54d" }, F_ = "_4ydn54f";
function Qe({
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
    C1[t],
    T1[a],
    o ? H_[a] : null,
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
        i ? /* @__PURE__ */ c.jsx("span", { className: F_, "aria-hidden": "true" }) : null,
        f
      ]
    }
  );
}
const P_ = 28;
function G_(t) {
  if (!t) return 1;
  let a = 0;
  for (let s = 0; s < Math.min(t.length, 12); s++)
    a = a * 33 + t.charCodeAt(s) >>> 0;
  return a || 1;
}
function Y_(t, a) {
  const s = new Array(a);
  let i = t;
  for (let o = 0; o < a; o++) {
    i = (i * 9301 + 49297) % 233280;
    const u = i / 233280, f = Math.min(1, o / 6, (a - o) / 6);
    s[o] = Math.max(0.18, f * (0.32 + u * 0.68));
  }
  return s;
}
function K_(t) {
  if (t == null) return "—";
  const a = Math.max(0, Math.round(t / 1e3)), s = Math.floor(a / 60), i = a % 60;
  return `${s}:${i.toString().padStart(2, "0")}`;
}
function X_(t) {
  return t ? `${(t / 1e3).toFixed(t % 1e3 === 0 ? 0 : 1)} kHz` : "—";
}
function Q_({
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
  const [b, v] = g.useState(!1), [w, S] = g.useState(t.displayName), [j, N] = g.useState(!1), [R, T] = g.useState(t.displayName), $ = g.useRef(null), _ = g.useRef(null), C = g.useMemo(() => G_(t.contentSha256), [t.contentSha256]), I = g.useMemo(() => Y_(C, P_), [C]), Y = g.useMemo(() => ET(t), [t]);
  g.useEffect(() => {
    S(t.displayName);
  }, [t.displayName]), g.useEffect(() => {
    const Q = $.current;
    Q && (i && Y ? Q.play().catch(() => {
    }) : (Q.pause(), Q.currentTime = 0));
  }, [i, Y]);
  const ae = async () => {
    const Q = w.trim();
    if (!Q || Q === t.displayName) {
      v(!1), S(t.displayName);
      return;
    }
    try {
      await u(Q);
    } finally {
      v(!1);
    }
  }, A = () => {
    T(t.displayName), N(!0);
  }, V = () => {
    const Q = R.trim();
    if (!Q) {
      _.current?.focus();
      return;
    }
    N(!1), y?.(Q);
  }, D = () => {
    N(!1);
  }, P = () => {
    R.trim() ? V() : D();
  }, J = `${K_(t.durationMs)} · ${X_(t.sampleRate)}`;
  return /* @__PURE__ */ c.jsxs("article", { className: T_, "data-playing": i ? "true" : "false", children: [
    /* @__PURE__ */ c.jsxs("header", { className: R_, children: [
      /* @__PURE__ */ c.jsx("span", { className: __, "data-kind": a, "aria-hidden": "true", children: a === "upload" ? "▣" : "★" }),
      /* @__PURE__ */ c.jsxs("div", { className: M_, children: [
        b ? /* @__PURE__ */ c.jsx(
          "input",
          {
            className: p0,
            value: w,
            autoFocus: !0,
            onChange: (Q) => S(Q.target.value),
            onBlur: () => {
              ae();
            },
            onKeyDown: (Q) => {
              Q.key === "Enter" ? (Q.preventDefault(), Q.currentTarget.blur()) : Q.key === "Escape" && (v(!1), S(t.displayName));
            },
            "aria-label": `Rename ${t.displayName}`
          }
        ) : /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: A_,
            onDoubleClick: () => v(!0),
            title: "Double-click to rename",
            children: t.displayName
          }
        ),
        /* @__PURE__ */ c.jsx("span", { className: k_, children: J })
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: D_, "data-kind": a, children: a === "upload" ? "UPLOADED" : "PRESET" })
    ] }),
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: z_,
        "data-playing": i ? "true" : "false",
        disabled: Y == null,
        title: Y ? "Preview" : "Preview unavailable",
        onClick: o,
        "aria-label": i ? "Pause preview" : "Play preview",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: O_, "aria-hidden": "true", children: i ? "❚❚" : "▶" }),
          /* @__PURE__ */ c.jsx("span", { className: L_, "aria-hidden": "true", children: I.map((Q, G) => /* @__PURE__ */ c.jsx("span", { className: $_, style: { height: `${Math.round(Q * 100)}%` } }, G)) })
        ]
      }
    ),
    /* @__PURE__ */ c.jsx("footer", { className: U_, children: j ? /* @__PURE__ */ c.jsxs("span", { style: { display: "flex", alignItems: "center", gap: 6, width: "100%" }, children: [
      /* @__PURE__ */ c.jsx(
        "input",
        {
          ref: _,
          className: p0,
          style: { flex: 1, minWidth: 0 },
          value: R,
          autoFocus: !0,
          placeholder: "Character name",
          onChange: (Q) => T(Q.target.value),
          onFocus: (Q) => Q.currentTarget.select(),
          onBlur: P,
          onKeyDown: (Q) => {
            Q.key === "Enter" ? (Q.preventDefault(), V()) : Q.key === "Escape" && D();
          },
          "aria-label": "New character name"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Qe,
        {
          variant: "ghost",
          size: "xs",
          iconOnly: !0,
          title: "Add character",
          "aria-label": "Confirm add character",
          onMouseDown: (Q) => Q.preventDefault(),
          onClick: V,
          children: "✓"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Qe,
        {
          variant: "ghost",
          size: "xs",
          iconOnly: !0,
          title: "Cancel",
          "aria-label": "Cancel add character",
          onMouseDown: (Q) => Q.preventDefault(),
          onClick: D,
          children: "✕"
        }
      )
    ] }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      s.length > 0 ? /* @__PURE__ */ c.jsxs("span", { className: g0, children: [
        /* @__PURE__ */ c.jsx("span", { children: "used by" }),
        s.map((Q) => /* @__PURE__ */ c.jsx(
          "span",
          {
            className: B_,
            style: { color: Q.color, borderColor: Q.color },
            children: Q.characterName
          },
          Q.characterName
        ))
      ] }) : /* @__PURE__ */ c.jsx("span", { className: g0, children: "unassigned" }),
      /* @__PURE__ */ c.jsxs("span", { className: I_, children: [
        y && /* @__PURE__ */ c.jsx(
          Qe,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            title: "Create character from this voice",
            "aria-label": "Create character from this voice",
            onClick: A,
            children: "＋"
          }
        ),
        /* @__PURE__ */ c.jsx(
          Qe,
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
          Qe,
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
          Qe,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            className: V_,
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
        ref: $,
        src: Y,
        preload: "none",
        className: q_,
        onEnded: p
      }
    )
  ] });
}
var Z_ = "_17eol302", J_ = "_17eol303", W_ = "_17eol304", eM = "_17eol305", tM = "_17eol306", nM = "_17eol307", Ko = "_17eol308", aM = "_17eol309", rM = "_17eol30a", sM = "_17eol30b", iM = "_17eol30c", lM = "_17eol30d", v0 = "_17eol30e", oM = "_17eol30g";
function cM() {
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
function uM(t) {
  const a = Math.max(0, Math.floor(t / 1e3)), s = Math.floor(a / 60), i = a % 60;
  return `${s}:${i.toString().padStart(2, "0")}`;
}
function dM({
  open: t,
  defaultName: a,
  onClose: s,
  onSubmit: i
}) {
  const [o, u] = g.useState("idle"), [f, m] = g.useState(null), [y, p] = g.useState(0), [b, v] = g.useState(null), [w, S] = g.useState(a), [j, N] = g.useState(!1), R = g.useRef(null), T = g.useRef(null), $ = g.useRef([]), _ = g.useRef(0), C = g.useRef(null), I = g.useRef(null), Y = g.useRef({ mime: "audio/webm", ext: "webm" }), ae = g.useRef(null), A = g.useRef(null), V = g.useRef(null);
  g.useEffect(() => {
    if (t)
      return V.current = document.activeElement ?? null, requestAnimationFrame(() => {
        ae.current?.scrollIntoView({ behavior: "smooth", block: "center" }), A.current?.focus();
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
      const U = ae.current;
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
    P(), b && URL.revokeObjectURL(b), v(null), $.current = [], I.current = null, p(0), m(null), u("idle");
  }, [b, P]);
  if (g.useEffect(() => {
    t || (J(), S(a));
  }, [t, a, J]), g.useEffect(() => () => {
    P(), b && URL.revokeObjectURL(b);
  }, [b, P]), !t) return null;
  const Q = async () => {
    m(null), u("preparing");
    try {
      const F = await navigator.mediaDevices.getUserMedia({ audio: !0 });
      T.current = F;
      const U = cM();
      Y.current = U;
      const se = U.mime ? new MediaRecorder(F, { mimeType: U.mime }) : new MediaRecorder(F);
      R.current = se, $.current = [], se.ondataavailable = (de) => {
        de.data && de.data.size > 0 && $.current.push(de.data);
      }, se.onstop = () => {
        const de = U.mime || "audio/webm", k = new Blob($.current, { type: de }), ee = new File([k], `${w || a || "recording"}.${U.ext}`, {
          type: de
        });
        I.current = ee;
        const re = URL.createObjectURL(k);
        v(re), u("ready"), P();
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
  }, ie = async () => {
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
  }, M = o === "recording" ? "REC" : o === "ready" ? "OK" : o === "preparing" ? "..." : "MIC";
  return /* @__PURE__ */ c.jsx("div", { className: Z_, role: "presentation", onClick: s, children: /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: ae,
      className: J_,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "mic-recorder-heading",
      onClick: (F) => F.stopPropagation(),
      onKeyDown: D,
      tabIndex: -1,
      children: [
        /* @__PURE__ */ c.jsx("h2", { id: "mic-recorder-heading", className: W_, children: "Record reference audio" }),
        /* @__PURE__ */ c.jsx("p", { className: eM, children: "Speak the reference line into your microphone. 4–30 seconds is recommended for clean conditioning." }),
        /* @__PURE__ */ c.jsx(
          "span",
          {
            className: tM,
            "data-state": o === "recording" ? "recording" : o === "ready" ? "ready" : "idle",
            "aria-hidden": "true",
            children: M
          }
        ),
        /* @__PURE__ */ c.jsx("div", { className: iM, "aria-live": "polite", children: uM(y) }),
        /* @__PURE__ */ c.jsxs("div", { className: nM, children: [
          (o === "idle" || o === "denied" || o === "error") && /* @__PURE__ */ c.jsxs(
            "button",
            {
              ref: A,
              type: "button",
              className: Ko,
              "data-tone": "danger",
              onClick: () => {
                Q();
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
        b && /* @__PURE__ */ c.jsx("audio", { className: lM, src: b, controls: !0, preload: "auto" }),
        /* @__PURE__ */ c.jsxs("label", { className: aM, children: [
          /* @__PURE__ */ c.jsx("span", { children: "Voice name" }),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              className: rM,
              value: w,
              onChange: (F) => S(F.target.value),
              placeholder: a
            }
          )
        ] }),
        f && /* @__PURE__ */ c.jsx("div", { className: sM, children: f }),
        /* @__PURE__ */ c.jsxs("div", { className: oM, children: [
          /* @__PURE__ */ c.jsx(Qe, { variant: "ghost", size: "md", onClick: s, disabled: j, children: "Cancel" }),
          /* @__PURE__ */ c.jsx(
            Qe,
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
function fM({
  deploymentId: t,
  voiceAssets: a,
  mappings: s,
  characterColors: i,
  onVoiceAssetsChange: o,
  onCreateCharacterFromVoice: u
}) {
  const [f, m] = g.useState(""), [y, p] = g.useState("all"), [b, v] = g.useState(!1), [w, S] = g.useState(null), [j, N] = g.useState(!1), [R, T] = g.useState(!1), $ = g.useRef(null), _ = g.useCallback(
    (G) => "upload",
    []
  ), C = g.useMemo(() => {
    const G = f.trim().toLowerCase();
    return a.filter((ie) => {
      const M = _(ie);
      return !(y === "uploaded" && M !== "upload" || y === "preset" && M !== "preset" || G && !ie.displayName.toLowerCase().includes(G));
    });
  }, [a, f, y, _]), I = g.useMemo(
    () => a.filter((G) => _(G) === "upload").length,
    [a, _]
  ), Y = g.useCallback(
    (G) => {
      const ie = [], M = /* @__PURE__ */ new Set();
      for (const F of s)
        F.speakerVoiceAssetId === G && (M.has(F.characterName) || (M.add(F.characterName), ie.push({
          characterName: F.characterName,
          // audit-allow: hex — neon decorative palette per design lang
          color: i[F.characterName] ?? "#ba9eff"
        })));
      return ie;
    },
    [s, i]
  ), ae = g.useCallback(
    async (G) => {
      const ie = Array.from(G).slice(0, 8);
      if (ie.length !== 0) {
        T(!0);
        try {
          const M = [];
          for (const F of ie) {
            if (!F.type.startsWith("audio/") && !/\.(wav|mp3|flac|ogg|m4a|webm)$/i.test(F.name)) {
              pn.error(`${F.name}: not an audio file`);
              continue;
            }
            const U = F.name.replace(/\.[^.]+$/, "");
            try {
              const se = await Cc(t, F, U, "speaker");
              M.push(se), pn.success(`Added ${se.displayName}`);
            } catch (se) {
              pn.error(se instanceof Error ? se.message : `${F.name}: upload failed`);
            }
          }
          M.length > 0 && o([...M, ...a]);
        } finally {
          T(!1);
        }
      }
    },
    [t, a, o]
  ), A = (G) => {
    G.preventDefault(), v(!1), G.dataTransfer?.files && ae(G.dataTransfer.files);
  }, V = g.useCallback(async () => {
    const G = window.prompt("Paste an audio URL (https://…)");
    if (G)
      try {
        const ie = await fetch(G);
        if (!ie.ok) throw new Error(`fetch failed: ${ie.status}`);
        const M = await ie.blob(), F = G.split("/").pop()?.split("?")[0] ?? "voice.wav", U = new File([M], F, { type: M.type || "audio/wav" });
        await ae([U]);
      } catch (ie) {
        pn.error(ie instanceof Error ? ie.message : "could not fetch URL");
      }
  }, [ae]), D = g.useCallback(
    async (G, ie) => {
      try {
        const M = await jT(t, G, ie);
        o(
          a.map((F) => F.voiceAssetId === G ? M : F)
        ), pn.success(`Renamed to ${M.displayName}`);
      } catch (M) {
        pn.error(M instanceof Error ? M.message : "rename failed");
      }
    },
    [t, a, o]
  ), P = g.useCallback((G) => {
    navigator.clipboard?.writeText ? (navigator.clipboard.writeText(G), pn.success("Copied name")) : pn.error("Clipboard unavailable");
  }, []), J = g.useCallback(
    async (G) => {
      if (window.confirm(`Delete "${G.displayName}"? Mappings using it will reset.`))
        try {
          await wT(t, G.voiceAssetId), o(a.filter((M) => M.voiceAssetId !== G.voiceAssetId)), pn.success(`Deleted ${G.displayName}`);
        } catch (M) {
          pn.error(M instanceof Error ? M.message : "delete failed");
        }
    },
    [t, a, o]
  );
  return /* @__PURE__ */ c.jsxs("div", { className: u_, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: d_,
        "data-over": b ? "true" : "false",
        onDragOver: (G) => {
          G.preventDefault(), v(!0);
        },
        onDragLeave: () => v(!1),
        onDrop: A,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: f_, "aria-hidden": "true", children: "⇪" }),
          /* @__PURE__ */ c.jsxs("div", { className: h_, children: [
            /* @__PURE__ */ c.jsxs("div", { className: m_, children: [
              "Drop reference audio to add a voice",
              /* @__PURE__ */ c.jsx("span", { className: p_, children: ".wav · .mp3 · .flac · .ogg · 4–30s recommended" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: g_, children: [
              "or",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: xf,
                  onClick: () => $.current?.click(),
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
            Qe,
            {
              variant: "primary",
              size: "md",
              disabled: R,
              onClick: () => $.current?.click(),
              children: "+ Upload"
            }
          ),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              ref: $,
              type: "file",
              accept: "audio/*,.wav,.mp3,.flac,.ogg,.m4a,.webm",
              multiple: !0,
              className: C_,
              onChange: (G) => {
                G.target.files && (ae(G.target.files), G.target.value = "");
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: v_, children: [
      /* @__PURE__ */ c.jsxs("label", { className: y_, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "⌕" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            className: b_,
            value: f,
            onChange: (G) => m(G.target.value),
            placeholder: "Search voices…",
            "aria-label": "Search voices"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: x_, role: "group", "aria-label": "Filter voices", children: [
        ["all", "All"],
        ["uploaded", "Uploaded"],
        ["preset", "Built-in"]
      ].map(([G, ie]) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: S_,
          "data-active": y === G ? "true" : "false",
          onClick: () => p(G),
          children: ie
        },
        G
      )) }),
      /* @__PURE__ */ c.jsxs("span", { className: E_, children: [
        /* @__PURE__ */ c.jsx("span", { className: N_, children: a.length }),
        " voices",
        /* @__PURE__ */ c.jsx("span", { children: "·" }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          I,
          " uploaded"
        ] })
      ] })
    ] }),
    C.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: j_, children: a.length === 0 ? "No voices yet. Drop audio above or record from your microphone." : "No voices match this filter." }) : /* @__PURE__ */ c.jsx("div", { className: w_, children: C.map((G) => {
      const ie = _(G);
      return /* @__PURE__ */ c.jsx(
        Q_,
        {
          asset: G,
          presentation: ie,
          usedBy: Y(G.voiceAssetId),
          isPlaying: w === G.voiceAssetId,
          onTogglePlay: () => S((M) => M === G.voiceAssetId ? null : G.voiceAssetId),
          onPlaybackEnded: () => S(null),
          onRename: (M) => D(G.voiceAssetId, M),
          onCopyName: () => P(G.displayName),
          onDelete: ie === "upload" ? () => void J(G) : void 0,
          onCreateCharacter: u ? (M) => u(G, M) : void 0
        },
        G.voiceAssetId
      );
    }) }),
    /* @__PURE__ */ c.jsx(
      dM,
      {
        open: j,
        defaultName: `Take ${a.length + 1}`,
        onClose: () => N(!1),
        onSubmit: async (G, ie) => {
          await Q(G, ie);
        }
      }
    )
  ] });
  async function Q(G, ie) {
    T(!0);
    try {
      const M = await Cc(t, G, ie, "speaker");
      o([M, ...a]), pn.success(`Recorded ${M.displayName}`);
    } catch (M) {
      throw pn.error(M instanceof Error ? M.message : "upload failed"), M;
    } finally {
      T(!1);
    }
  }
}
async function hM(t) {
  return Rt(`/presets?deploymentId=${encodeURIComponent(t)}`);
}
async function mM(t, a, s) {
  return Rt("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: t, presetName: a, vector: s })
  });
}
async function pM(t, a) {
  await Rt(
    `/presets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
var y0 = "_190jlds0", gM = "_190jlds1", vM = "_190jlds2", yM = "_190jlds3", bM = "_190jlds4", xM = "_190jlds5", SM = "_190jlds6", wM = "_190jlds7", jM = "_190jlds8", EM = "_190jlds9", b0 = "_190jldsa", NM = "_190jldsb", x0 = "_190jldsc", CM = "_190jldsd", TM = "_190jldse", RM = "_190jldsf";
function _M({
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
  const $ = g.useCallback(() => {
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
    }), Y = URL.createObjectURL(I), ae = document.createElement("a");
    ae.href = Y, ae.download = `audit-${T.kind}-${T.id}-${Date.now()}.json`, document.body.appendChild(ae), ae.click(), document.body.removeChild(ae), URL.revokeObjectURL(Y);
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
    /* @__PURE__ */ c.jsxs("header", { className: gM, children: [
      /* @__PURE__ */ c.jsxs("div", { className: vM, children: [
        /* @__PURE__ */ c.jsx("label", { htmlFor: "audit-target-select", className: b0, children: "Target" }),
        /* @__PURE__ */ c.jsx(
          "select",
          {
            id: "audit-target-select",
            className: yM,
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
      /* @__PURE__ */ c.jsxs("div", { className: bM, children: [
        /* @__PURE__ */ c.jsx(
          Qe,
          {
            variant: "ghost",
            size: "sm",
            onClick: $,
            disabled: m.length === 0 || p,
            children: "Export JSON"
          }
        ),
        s && /* @__PURE__ */ c.jsx(
          Qe,
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
    v && /* @__PURE__ */ c.jsx("div", { className: TM, children: v }),
    p && !v && /* @__PURE__ */ c.jsx("div", { className: RM, "aria-live": "polite", children: "Loading edit history…" }),
    !p && !v && m.length === 0 && /* @__PURE__ */ c.jsxs("p", { className: x0, children: [
      "No edits recorded for this target yet.",
      /* @__PURE__ */ c.jsx("br", {}),
      /* @__PURE__ */ c.jsx("span", { className: CM, children: "Apply a chain in the editor to populate the history." })
    ] }),
    !p && !v && m.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: xM, children: m.map((C) => {
      const I = i && T && !!C.chain_snapshot_json && C.operation_count > 0;
      return /* @__PURE__ */ c.jsxs("li", { className: SM, children: [
        /* @__PURE__ */ c.jsx("span", { className: wM, children: MM(C.recorded_at) }),
        /* @__PURE__ */ c.jsx("span", { className: jM, children: C.operation_count === 0 ? "cleared" : `${C.operation_count} ops` }),
        /* @__PURE__ */ c.jsxs("span", { className: EM, title: C.digest_after, children: [
          C.digest_after.slice(0, 12),
          "…"
        ] }),
        /* @__PURE__ */ c.jsx("span", { className: b0, children: C.actor || "—" }),
        /* @__PURE__ */ c.jsx(
          "span",
          {
            className: NM,
            style: {
              background: `color-mix(in oklab, ${C.operation_count === 0 ? "var(--error)" : "var(--accent)"} 14%, transparent)`,
              color: C.operation_count === 0 ? "var(--error)" : "var(--accent)"
            },
            children: C.digest_before === "" || !C.digest_before ? "create" : C.operation_count === 0 ? "clear" : "update"
          }
        ),
        I && /* @__PURE__ */ c.jsx(
          Qe,
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
function MM(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var AM = "_1uzgubz0", kM = "_1uzgubz1", DM = "_1uzgubz2", zM = "_1uzgubz3", OM = "_1uzgubz4", LM = "_1uzgubz5", $M = "_1uzgubz6", UM = "_1uzgubz7", S0 = "_1uzgubz8", BM = "_1uzgubz9", R1 = "_1uzgubza", _1 = "_1uzgubzb", IM = "_1uzgubzc", VM = "_1uzgubzd", Xo = "_1uzgubze", Qo = "_1uzgubzf", qM = "_1uzgubzg", HM = "_1uzgubzh", w0 = "_1uzgubzi", j0 = "_1uzgubzj", E0 = "_1uzgubzk", N0 = "_1uzgubzl", C0 = "_1uzgubzm", FM = "_1uzgubzn", PM = "_1uzgubzo", GM = "_1uzgubzp", YM = "_1uzgubzq";
function KM({
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
  const [S, j] = g.useState(!1), N = i ? o.find((_) => _.voiceAssetId === i.speakerVoiceAssetId) : null, R = i?.defaultVectorPresetId ? u.find((_) => _.presetId === i.defaultVectorPresetId) ?? null : null, T = (t[0] ?? "?").toUpperCase(), $ = i !== null;
  return /* @__PURE__ */ c.jsxs("div", { className: `${AM}${f ? ` ${kM}` : ""}`, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: DM,
        onClick: m,
        "aria-expanded": f,
        children: [
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: zM,
              style: {
                background: `color-mix(in oklab, ${a} 22%, transparent)`,
                color: a
              },
              children: T
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: OM, children: [
            /* @__PURE__ */ c.jsx("span", { className: LM, style: { color: a }, children: t }),
            /* @__PURE__ */ c.jsxs("span", { className: $M, children: [
              s,
              " lines"
            ] })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: UM, children: [
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
            i?.voiceAssetChainDigest && /* @__PURE__ */ c.jsxs("span", { className: IM, children: [
              "chain · ",
              i.voiceAssetChainDigest.slice(0, 8)
            ] })
          ] }),
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: `${BM} ${$ ? R1 : _1}`,
              children: $ ? "Mapped" : "Unmapped"
            }
          )
        ]
      }
    ),
    f && /* @__PURE__ */ c.jsxs("div", { className: VM, children: [
      $ && s === 0 && w && /* @__PURE__ */ c.jsxs("div", { className: Xo, children: [
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
            className: `${qM}${S ? ` ${HM}` : ""}`,
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
      $ && v && /* @__PURE__ */ c.jsx(Qe, { variant: "ghost", size: "sm", onClick: v, children: "Clear mapping →" })
    ] })
  ] });
}
function T0(t) {
  if (!Number.isFinite(t) || t < 0) return "0:00";
  const a = Math.round(t / 1e3), s = Math.floor(a / 60), i = a % 60;
  return `${s}:${i.toString().padStart(2, "0")}`;
}
function XM({
  unmappedCount: t,
  totalCount: a,
  children: s,
  emptyHint: i
}) {
  if (a === 0)
    return /* @__PURE__ */ c.jsx("p", { className: YM, children: i ?? "Add at least one tagged dialogue line to populate the cast." });
  const o = t === 0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx("header", { className: FM, children: /* @__PURE__ */ c.jsx(
      "span",
      {
        className: `${PM} ${o ? R1 : _1}`,
        children: o ? `All ${a} mapped` : `${t} of ${a} unmapped`
      }
    ) }),
    /* @__PURE__ */ c.jsx("ul", { className: GM, children: s })
  ] });
}
async function vl() {
  return Rt("/runtime/health");
}
async function QM(t) {
  await Rt("/runtime/start", {
    method: "POST",
    ...t != null ? { body: JSON.stringify({ numWorkers: t }) } : {}
  });
}
async function ZM() {
  return Rt("/runtime/stop", { method: "POST" });
}
function M1(t) {
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
let A1 = 1;
function JM() {
  return A1;
}
function R0(t) {
  A1 = Number.isFinite(t) ? Math.max(1, Math.floor(t)) : 1;
}
var WM = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function kn({
  severity: t,
  children: a,
  role: s,
  ariaLive: i,
  className: o,
  style: u
}) {
  const f = [WM[t], o].filter(Boolean).join(" "), m = s ?? (t === "error" ? "alert" : "status"), y = i ?? (t === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ c.jsx("div", { className: f, role: m, "aria-live": y, style: u, children: a });
}
var k1 = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, D1 = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, e2 = "_13bb4njb";
function wr({
  tone: t,
  size: a = "sm",
  pulse: s = !1,
  children: i,
  className: o,
  style: u,
  title: f
}) {
  const m = s && t !== "faint", y = [k1[a], D1[t], m ? e2 : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("span", { className: y, style: u, title: f, children: i });
}
const t2 = 4e3;
function n2({ deployment: t }) {
  const [a, s] = g.useState(null), [i, o] = g.useState(null), [u, f] = g.useState(1), m = g.useState({ done: !1 })[0];
  g.useEffect(() => {
    let S = !1;
    const j = async () => {
      try {
        const R = await vl();
        S || (s(R), o(null));
      } catch (R) {
        S || o(o2(R));
      }
    };
    j();
    const N = setInterval(j, t2);
    return () => {
      S = !0, clearInterval(N);
    };
  }, []), g.useEffect(() => {
    const S = a?.workersActive;
    S != null && !m.done && (m.done = !0, f(S), R0(S));
  }, [a?.workersActive, m]);
  const y = a?.badge ?? "not_installed", p = i?.includes("model_missing") ?? !1, b = a?.workersCeiling ?? 1, v = a?.workersActive ?? 1, w = y === "ready" || y === "running" || y === "starting";
  return /* @__PURE__ */ c.jsxs("output", { className: i_, "aria-live": "polite", children: [
    /* @__PURE__ */ c.jsx("span", { className: Gr, children: "Runtime" }),
    /* @__PURE__ */ c.jsx("span", { children: t.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ c.jsx("span", { className: Gr, children: "Badge" }),
    /* @__PURE__ */ c.jsx(wr, { tone: i2(y), pulse: y === "starting" || y === "installing", children: M1(y) }),
    a && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("span", { className: Gr, children: "Uptime" }),
      /* @__PURE__ */ c.jsx("span", { children: l2(a.uptimeSeconds) }),
      /* @__PURE__ */ c.jsx("span", { className: Gr, children: "VRAM" }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        a.vramUsedMb,
        " / ",
        a.vramTotalMb,
        " MB"
      ] })
    ] }),
    b > 1 && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("span", { className: Gr, children: "Workers" }),
      /* @__PURE__ */ c.jsxs("span", { style: a2, children: [
        /* @__PURE__ */ c.jsx(
          "select",
          {
            value: u,
            "aria-label": "Concurrent workers for the next runtime start",
            onChange: (S) => {
              const j = Number(S.target.value);
              f(j), R0(j);
            },
            style: r2,
            children: Array.from({ length: b }, (S, j) => j + 1).map((S) => /* @__PURE__ */ c.jsx("option", { value: S, children: S }, S))
          }
        ),
        /* @__PURE__ */ c.jsx("span", { style: s2, children: w && u !== v ? `restart to apply · active ${v}` : `~${u}× model VRAM` })
      ] })
    ] }),
    p && /* @__PURE__ */ c.jsxs(kn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("strong", { children: "IndexTTS-2 model is not installed." }),
      " ",
      "Open ",
      /* @__PURE__ */ c.jsx("em", { children: "Settings → Dependencies → Install all" }),
      " to download the required artifacts, then retry."
    ] }),
    i && !p && /* @__PURE__ */ c.jsx(kn, { severity: "error", children: i })
  ] });
}
const a2 = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8
}, r2 = {
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
}, s2 = {
  fontSize: 11,
  color: "var(--on-surface-variant, #c4c7c5)"
};
function i2(t) {
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
function l2(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${t % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function o2(t) {
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
function c2(t, a, s) {
  for (const i of Object.keys(Tc)) {
    const o = Tc[i];
    if (Math.abs(o.low - t) < Va && Math.abs(o.mid - a) < Va && Math.abs(o.high - s) < Va)
      return i;
  }
  return "custom";
}
function u2(t) {
  let a = f2();
  for (const s of t.ops)
    a = d2(a, s);
  return a;
}
function d2(t, a) {
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
          preset: c2(a.low_db, a.mid_db, a.high_db)
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
function f2() {
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
function Nr(t, a) {
  return t.ops.filter((s) => s.mode !== a);
}
function Cr(t, a) {
  return [...t, a];
}
function h2(t, a) {
  const s = Nr(t, "gain");
  if (Math.abs(a) < Va) return { ...t, ops: s };
  const i = { id: Dn(), mode: "gain", gain_db: a };
  return { ...t, ops: Cr(s, i) };
}
function m2(t, a, s, i) {
  const o = Nr(t, "eq3");
  if (Math.abs(a) < Va && Math.abs(s) < Va && Math.abs(i) < Va)
    return { ...t, ops: o };
  const u = {
    id: Dn(),
    mode: "eq3",
    low_db: a,
    mid_db: s,
    high_db: i
  };
  return { ...t, ops: Cr(o, u) };
}
function p2(t, a) {
  const s = Nr(t, "speed");
  if (Math.abs(a - 1) < Va) return { ...t, ops: s };
  const i = { id: Dn(), mode: "speed", factor: a };
  return { ...t, ops: Cr(s, i) };
}
function g2(t, a) {
  const s = Nr(t, "pitch_shift");
  if (Math.abs(a) < Va) return { ...t, ops: s };
  const i = {
    id: Dn(),
    mode: "pitch_shift",
    semitones: a
  };
  return { ...t, ops: Cr(s, i) };
}
function v2(t, a, s) {
  const i = Nr(t, "normalize");
  if (a === "off") return { ...t, ops: i };
  const o = {
    id: Dn(),
    mode: "normalize",
    target_lufs: s
  };
  return { ...t, ops: Cr(i, o) };
}
function y2(t, a) {
  const s = Nr(t, "fade_in");
  if (a <= 0) return { ...t, ops: s };
  const i = {
    id: Dn(),
    mode: "fade_in",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Cr(s, i) };
}
function b2(t, a) {
  const s = Nr(t, "fade_out");
  if (a <= 0) return { ...t, ops: s };
  const i = {
    id: Dn(),
    mode: "fade_out",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Cr(s, i) };
}
function x2(t, a, s) {
  const i = Nr(t, "silence_strip");
  if (!a) return { ...t, ops: i };
  const o = {
    id: Dn(),
    mode: "silence_strip",
    threshold_db: s
  };
  return { ...t, ops: Cr(i, o) };
}
const z1 = /* @__PURE__ */ new Set([
  "gain",
  "eq3",
  "speed",
  "pitch_shift",
  "normalize",
  "fade_in",
  "fade_out",
  "silence_strip"
]);
function O1(t, a) {
  const s = {
    ...t,
    ops: t.ops.filter((u) => !z1.has(u.mode))
  };
  let o = h2({ version: 1, ops: [] }, a.volumeDb);
  return o = m2(
    o,
    a.eq3.low,
    a.eq3.mid,
    a.eq3.high
  ), a.speed.mode === "audio" && (o = p2(o, a.speed.value)), o = g2(o, a.pitchSt), o = v2(
    o,
    a.normalize.mode === "off" ? "off" : "loudness",
    a.normalize.targetDbOrLufs
  ), o = y2(o, a.fade.inS), o = b2(o, a.fade.outS), o = x2(
    o,
    a.silence.enabled,
    a.silence.thresholdDb
  ), { ...s, ops: [...s.ops, ...o.ops] };
}
function L1(t) {
  const a = {
    ...t,
    ops: t.ops.filter((s) => z1.has(s.mode))
  };
  return u2(a);
}
var S2 = "_1rsa80i0", w2 = "_1rsa80i1", j2 = "_1rsa80i2", E2 = "_1rsa80i3", N2 = "_1rsa80i4", C2 = "_1rsa80i5", T2 = "_1rsa80i6", R2 = "_1rsa80i7", _2 = "_1rsa80i8", M2 = "_1rsa80i9";
const $1 = ["flat", "warm", "bright", "voice", "telephone"], el = -12, Zo = 12, A2 = 0.5;
function k2(t) {
  const { low: a, mid: s, high: i, preset: o, onChange: u, disabled: f } = t, m = (p) => {
    const b = Tc[p];
    u(b.low, b.mid, b.high, p);
  }, y = (p, b) => {
    const v = { low: a, mid: s, high: i, [p]: b }, w = z2(v.low, v.mid, v.high);
    u(v.low, v.mid, v.high, w);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: S2, children: [
    /* @__PURE__ */ c.jsxs("div", { className: w2, role: "group", "aria-label": "EQ presets", children: [
      $1.map((p) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: j2,
          "data-active": o === p,
          onClick: () => m(p),
          disabled: f,
          children: p
        },
        p
      )),
      o === "custom" ? /* @__PURE__ */ c.jsx("span", { className: E2, children: "custom" }) : null
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: N2, children: [
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
  return /* @__PURE__ */ c.jsxs("div", { className: C2, children: [
    /* @__PURE__ */ c.jsx("label", { htmlFor: u, className: T2, children: t }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: u,
        type: "range",
        min: el,
        max: Zo,
        step: A2,
        value: a,
        disabled: i,
        className: _2,
        style: { "--fill": `${o}%` },
        onChange: (f) => s(Number(f.target.value)),
        "aria-valuemin": el,
        "aria-valuemax": Zo,
        "aria-valuenow": a
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: R2, children: D2(a) }),
    /* @__PURE__ */ c.jsxs("span", { className: M2, "aria-hidden": "true", children: [
      /* @__PURE__ */ c.jsx("span", { children: el }),
      /* @__PURE__ */ c.jsx("span", { children: "0" }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        "+",
        Zo
      ] })
    ] })
  ] });
}
function D2(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
const wf = 1e-3;
function z2(t, a, s) {
  for (const i of $1) {
    const o = Tc[i];
    if (Math.abs(o.low - t) < wf && Math.abs(o.mid - a) < wf && Math.abs(o.high - s) < wf)
      return i;
  }
  return "custom";
}
var O2 = "_85bhwb0", L2 = "_85bhwb1", _0 = "_85bhwb2", $2 = "_85bhwb3", U2 = "_85bhwb4", B2 = "_85bhwb5", I2 = "_85bhwb6", V2 = "_85bhwb7";
const Jo = 0.5, jf = 2, q2 = 0.05;
function H2(t) {
  const { mode: a, value: s, supportsSynthSpeed: i, onChange: o, onReRenderAtSynthTime: u, disabled: f } = t, m = (s - Jo) / (jf - Jo) * 100, y = g.useId(), p = (v) => o(v, s), b = (v) => o(a, v);
  return /* @__PURE__ */ c.jsxs("div", { className: O2, children: [
    i ? /* @__PURE__ */ c.jsxs("div", { className: L2, role: "group", "aria-label": "Speed mode", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: _0,
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
          className: _0,
          "data-active": a === "synth",
          onClick: () => p("synth"),
          disabled: f,
          children: "Synth"
        }
      )
    ] }) : null,
    /* @__PURE__ */ c.jsxs("div", { className: $2, children: [
      /* @__PURE__ */ c.jsx(
        "input",
        {
          id: y,
          type: "range",
          min: Jo,
          max: jf,
          step: q2,
          value: s,
          disabled: f,
          className: U2,
          style: { "--fill": `${m}%` },
          onChange: (v) => b(Number(v.target.value)),
          "aria-valuemin": Jo,
          "aria-valuemax": jf,
          "aria-valuenow": s,
          "aria-label": "Speed factor"
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: B2, children: `${s.toFixed(2)}×` })
    ] }),
    a === "synth" && i ? /* @__PURE__ */ c.jsxs("div", { className: I2, children: [
      /* @__PURE__ */ c.jsx(
        Qe,
        {
          variant: "primary",
          size: "sm",
          onClick: u,
          disabled: f || !u,
          children: "Re-render at synth-time"
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: V2, children: "Synth-time speed re-runs the worker for new utterances." })
    ] }) : null
  ] });
}
var F2 = "kgszk50", P2 = "kgszk51", M0 = "kgszk52", G2 = "kgszk53", Y2 = "kgszk54", U1 = "kgszk55", K2 = "kgszk56", X2 = "kgszk58", Jh = "kgszk59", B1 = "kgszk5a", Wh = "kgszk5b", Q2 = "kgszk5c", Z2 = "kgszk5d", J2 = "kgszk5e", A0 = "kgszk5f", k0 = "kgszk5g", D0 = "kgszk5h", W2 = "kgszk5i", eA = "kgszk5j", tA = "kgszk5l", yl = "kgszk5m", bl = "kgszk5n";
const nA = -24, aA = 24, rA = 0.5, sA = -12, iA = 12, lA = 0.5, oA = -30, cA = -6, uA = -12, dA = 0, Wo = -60, Ef = -20;
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
  }, v = pA(a), w = (S) => {
    const j = S.target;
    j && (j.tagName === "INPUT" || j.tagName === "BUTTON" || j.closest("input, button")) && u?.();
  };
  return /* @__PURE__ */ c.jsxs("div", { className: F2, onPointerDownCapture: w, children: [
    /* @__PURE__ */ c.jsxs("div", { className: P2, children: [
      v.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: G2, children: "No active edits" }) : /* @__PURE__ */ c.jsxs("span", { className: M0, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "Active:" }),
        /* @__PURE__ */ c.jsx("span", { children: v.join(" · ") })
      ] }),
      f ? /* @__PURE__ */ c.jsxs("span", { className: M0, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: Y2, "aria-hidden": "true" }),
        "Re-rendering"
      ] }) : null
    ] }),
    /* @__PURE__ */ c.jsx(
      z0,
      {
        label: "Volume",
        sub: "Pre-mix gain in dB",
        min: nA,
        max: aA,
        step: rA,
        format: gA,
        value: a.volumeDb,
        onChange: (S) => b({ volumeDb: S }),
        disabled: m
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: yl, children: [
      /* @__PURE__ */ c.jsx("span", { className: bl, children: "3-band EQ" }),
      /* @__PURE__ */ c.jsx(
        k2,
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
        H2,
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
      z0,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: sA,
        max: iA,
        step: lA,
        format: vA,
        value: a.pitchSt,
        onChange: (S) => b({ pitchSt: S }),
        disabled: m
      }
    ),
    /* @__PURE__ */ c.jsx(
      fA,
      {
        normalize: a.normalize,
        disabled: m,
        onChange: (S) => b({ normalize: S })
      }
    ),
    /* @__PURE__ */ c.jsx(
      hA,
      {
        inS: a.fade.inS,
        outS: a.fade.outS,
        disabled: m,
        onChange: (S, j) => b({ fade: { ...a.fade, inS: S, outS: j } })
      }
    ),
    /* @__PURE__ */ c.jsx(
      mA,
      {
        enabled: a.silence.enabled,
        thresholdDb: a.silence.thresholdDb,
        disabled: m,
        onChange: (S, j) => b({ silence: { enabled: S, thresholdDb: j } })
      }
    ),
    y ? /* @__PURE__ */ c.jsxs("div", { className: tA, children: [
      /* @__PURE__ */ c.jsx(
        Qe,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => s(Yc),
          disabled: m,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ c.jsx(Qe, { variant: "primary", size: "md", onClick: y, disabled: m, children: p })
    ] }) : null
  ] });
}
function z0(t) {
  const { label: a, sub: s, min: i, max: o, step: u, format: f, value: m, onChange: y, disabled: p } = t, b = (m - i) / (o - i) * 100, v = g.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: U1, children: [
    /* @__PURE__ */ c.jsxs("div", { className: K2, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: v, className: X2, children: a }),
      /* @__PURE__ */ c.jsx("span", { className: B1, children: s })
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
function fA({ normalize: t, onChange: a, disabled: s }) {
  const o = t.mode === "loudness" ? { min: oA, max: cA, step: 0.5, suffix: "LUFS" } : { min: uA, max: dA, step: 0.5, suffix: "dB" }, u = yA(t.targetDbOrLufs, o.min, o.max), f = (u - o.min) / (o.max - o.min) * 100, m = (y) => {
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
    /* @__PURE__ */ c.jsx("div", { className: Q2, role: "group", "aria-label": "Normalize mode", children: ["off", "peak", "loudness"].map((y) => {
      const p = y === "peak";
      return /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: Z2,
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
    t.mode !== "off" ? /* @__PURE__ */ c.jsxs("div", { className: U1, children: [
      /* @__PURE__ */ c.jsx("span", { className: B1, children: "Target" }),
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
function hA({ inS: t, outS: a, onChange: s, disabled: i }) {
  const o = g.useId(), u = g.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: yl, children: [
    /* @__PURE__ */ c.jsx("span", { className: bl, children: "Fade" }),
    /* @__PURE__ */ c.jsxs("div", { className: J2, children: [
      /* @__PURE__ */ c.jsxs("div", { className: A0, children: [
        /* @__PURE__ */ c.jsx("label", { className: k0, htmlFor: o, children: "Fade in (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: o,
            type: "number",
            min: 0,
            step: 0.05,
            value: t,
            disabled: i,
            className: D0,
            onChange: (f) => s(Math.max(0, Number(f.target.value)), a)
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: A0, children: [
        /* @__PURE__ */ c.jsx("label", { className: k0, htmlFor: u, children: "Fade out (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: u,
            type: "number",
            min: 0,
            step: 0.05,
            value: a,
            disabled: i,
            className: D0,
            onChange: (f) => s(t, Math.max(0, Number(f.target.value)))
          }
        )
      ] })
    ] })
  ] });
}
function mA({ enabled: t, thresholdDb: a, onChange: s, disabled: i }) {
  const o = (a - Wo) / (Ef - Wo) * 100;
  return /* @__PURE__ */ c.jsxs("div", { className: yl, children: [
    /* @__PURE__ */ c.jsx("span", { className: bl, children: "Silence trim" }),
    /* @__PURE__ */ c.jsxs("div", { className: W2, children: [
      /* @__PURE__ */ c.jsxs("label", { className: eA, children: [
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
function pA(t) {
  const a = [];
  return Math.abs(t.volumeDb) >= Bs && a.push("gain"), (Math.abs(t.eq3.low) >= Bs || Math.abs(t.eq3.mid) >= Bs || Math.abs(t.eq3.high) >= Bs) && a.push("eq3"), t.speed.mode === "audio" && Math.abs(t.speed.value - 1) >= Bs && a.push("speed"), Math.abs(t.pitchSt) >= Bs && a.push("pitch"), t.normalize.mode !== "off" && a.push("normalize"), t.fade.inS > 0 && a.push("fade-in"), t.fade.outS > 0 && a.push("fade-out"), t.silence.enabled && a.push("silence"), a;
}
function gA(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
function vA(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} st`;
}
function yA(t, a, s) {
  return Number.isFinite(t) ? Math.max(a, Math.min(s, t)) : a;
}
var bA = "skdk4g0", xA = "skdk4g1", O0 = "skdk4g2", SA = "skdk4g3", wA = "skdk4g4", jA = "skdk4g5", EA = "skdk4g6", NA = "skdk4g7", CA = "skdk4g8", TA = "skdk4g9", RA = "skdk4ga", _A = "skdk4gb", MA = "skdk4gc", AA = "skdk4gd", L0 = "skdk4ge", $0 = "skdk4gf", kA = "skdk4gg", U0 = "skdk4gh", B0 = "skdk4gi", DA = "skdk4gj", zA = "skdk4gk", OA = "skdk4gl", I0 = "skdk4gm", LA = "skdk4gn", $A = "skdk4gp", UA = "skdk4gq", BA = "skdk4gr", IA = "skdk4gs", VA = "skdk4gt", qA = "skdk4gu", HA = "skdk4gv", V0 = "skdk4gw", FA = "skdk4gx", PA = "skdk4gy", GA = "skdk4gz", YA = "skdk4g10", KA = "cgsfgh1", XA = "cgsfgh2", QA = "cgsfgh3", ZA = "cgsfgh4", JA = "cgsfgh5", WA = "cgsfgh6", e3 = "cgsfgh7", t3 = "cgsfgh8", n3 = "cgsfgh9", a3 = "cgsfgha", r3 = "cgsfghb", s3 = "cgsfghc", i3 = "cgsfghd", l3 = "cgsfghe", o3 = "cgsfghm", c3 = "cgsfghn", u3 = "cgsfgho", d3 = "cgsfghp";
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
}, I1 = 0.05;
function f3(t) {
  let a = null, s = -1 / 0;
  for (const i of rn) {
    const o = t[i];
    o > s && (s = o, a = i);
  }
  return !a || s <= I1 ? null : a;
}
function V1(t, a = 3) {
  return rn.map((s) => ({ key: s, label: xl[s], value: t[s] })).filter((s) => s.value > I1).sort((s, i) => i.value - s.value).slice(0, a);
}
function h3(t) {
  let a = 0;
  for (const s of rn) a += t[s] * t[s];
  return Math.sqrt(a);
}
function q0(t) {
  const a = V1(t, 2), s = a[0];
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
const H0 = 0.05, F0 = 0.2, m3 = 22, p3 = 320, Cf = 0.78;
function Tf(t, a, s, i) {
  const o = Math.cos(s), u = Math.sin(s), f = t * o + a * u;
  return Math.max(0, Math.min(1, f / i));
}
function g3(t) {
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
  }, []), $ = g.useCallback(
    (V) => {
      const D = v.current;
      if (!D || S.current) return;
      const P = V.clientX - D.centerX, J = V.clientY - D.centerY, Q = i / 2 * Cf, G = Tf(P, J, D.angle, Q), ie = { ...w.current, [D.axis]: G };
      T(ie);
    },
    [i, T]
  ), _ = g.useCallback(
    (V) => {
      const D = v.current;
      if (D) {
        if (window.removeEventListener("pointermove", $), window.removeEventListener("pointerup", _), window.removeEventListener("pointercancel", _), S.current) {
          const P = V.clientX - D.centerX, J = V.clientY - D.centerY, Q = i / 2 * Cf, G = Tf(P, J, D.angle, Q), ie = { ...w.current, [D.axis]: G };
          v.current = null, R(ie);
          return;
        }
        v.current = null, R(w.current);
      }
    },
    [R, $, i]
  );
  g.useEffect(() => () => {
    window.removeEventListener("pointermove", $), window.removeEventListener("pointerup", _), window.removeEventListener("pointercancel", _), v.current = null, j.current !== null && (window.clearTimeout(j.current), j.current = null);
  }, [$, _]);
  const C = g.useCallback((V, D) => {
    S.current || (N.current += 1, b({ x: V, y: D, key: N.current }), j.current !== null && window.clearTimeout(j.current), j.current = window.setTimeout(() => {
      b(null), j.current = null;
    }, p3));
  }, []), I = g.useCallback(
    (V, D, P, J, Q) => {
      const G = P.getBoundingClientRect(), ie = G.left + G.width / 2, M = G.top + G.height / 2, U = rn.indexOf(V) / rn.length * Math.PI * 2 - Math.PI / 2;
      if (v.current = {
        axis: V,
        pointerId: D,
        centerX: ie,
        centerY: M,
        angle: U
      }, y(V), J !== void 0 && Q !== void 0) {
        const se = J - ie, de = Q - M, k = i / 2 * Cf, ee = Tf(se, de, U, k), re = { ...w.current, [V]: ee };
        S.current ? R(re) : T(re);
      }
      window.addEventListener("pointermove", $), window.addEventListener("pointerup", _), window.addEventListener("pointercancel", _);
    },
    [R, $, _, i, T]
  ), Y = g.useCallback(
    (V, D) => {
      D.preventDefault();
      const P = D.currentTarget, J = P.ownerSVGElement ?? P;
      I(V, D.pointerId, J);
    },
    [I]
  ), ae = g.useCallback(
    (V) => {
      const D = V.currentTarget, P = D instanceof SVGSVGElement ? D : D.ownerSVGElement ?? D, J = P.getBoundingClientRect(), Q = J.left + J.width / 2, G = J.top + J.height / 2, ie = V.clientX - Q, M = V.clientY - G;
      if (Math.sqrt(ie * ie + M * M) < 8) return;
      let U = Math.atan2(M, ie) * 180 / Math.PI;
      U = ((U + 90) % 360 + 360) % 360;
      let se = null, de = 999;
      for (let re = 0; re < rn.length; re++) {
        const K = rn[re];
        if (!K) continue;
        const B = re / rn.length * 360, W = Math.abs((B - U + 540) % 360 - 180);
        W < de && (de = W, se = K);
      }
      if (!se || de > m3) return;
      V.preventDefault();
      const k = (V.clientX - J.left) / J.width * i, ee = (V.clientY - J.top) / J.height * i;
      C(k, ee), I(se, V.pointerId, P, V.clientX, V.clientY);
    },
    [I, i, C]
  ), A = g.useCallback(
    (V, D) => {
      const P = w.current[V];
      let J = P;
      switch (D.key) {
        case "ArrowUp":
        case "ArrowRight":
          J = P + H0;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          J = P - H0;
          break;
        case "PageUp":
          J = P + F0;
          break;
        case "PageDown":
          J = P - F0;
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
    onKeyDown: A,
    onSurfacePointerDown: ae,
    surfacePing: p
  };
}
const v3 = [0.25, 0.5, 0.75, 1];
function y3({
  vec: t,
  onChange: a,
  size: s = 360,
  readOnly: i = !1,
  reduceMotion: o = !1
}) {
  const u = g3({ vec: t, onChange: a, size: s, reduceMotion: o }), f = s / 2, m = s / 2, y = s / 2 * 0.78, p = g.useMemo(() => b3(f, m, y), [f, m, y]), b = g.useMemo(() => rn.map((v, w) => {
    const S = bc(u.liveVec[v]), j = p[w];
    return j ? `${f + j.dx * S},${m + j.dy * S}` : "0,0";
  }).join(" "), [p, f, m, u.liveVec]);
  return /* @__PURE__ */ c.jsx("div", { className: KA, children: /* @__PURE__ */ c.jsx("div", { className: XA, style: { width: s, height: s }, children: /* @__PURE__ */ c.jsxs(
    "svg",
    {
      className: QA,
      viewBox: `0 0 ${s} ${s}`,
      role: "img",
      "aria-label": "8-axis emotion radar",
      onPointerDown: i ? void 0 : u.onSurfacePointerDown,
      style: i ? void 0 : { cursor: "crosshair", touchAction: "none" },
      children: [
        v3.map((v) => /* @__PURE__ */ c.jsx(
          "circle",
          {
            className: ZA,
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
                className: JA,
                x1: f,
                y1: m,
                x2: f + S.dx,
                y2: m + S.dy
              }
            ),
            /* @__PURE__ */ c.jsx(
              "text",
              {
                className: `${i3}${R ? ` ${l3}` : ""}`,
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
              className: `${e3}${N ? ` ${t3}` : ""}`,
              x1: f,
              y1: m,
              x2: f + j.dx * S,
              y2: m + j.dy * S
            },
            `petal-${v}`
          );
        }),
        /* @__PURE__ */ c.jsx("polygon", { className: WA, points: b }),
        u.surfacePing && /* @__PURE__ */ c.jsx(
          "circle",
          {
            className: s3,
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
                className: n3,
                cx: N,
                cy: R,
                r: 14,
                tabIndex: 0,
                role: "slider",
                "aria-label": `${xl[v]} axis`,
                "aria-valuemin": 0,
                "aria-valuemax": 1,
                "aria-valuenow": S,
                onPointerDown: ($) => u.onPointerDown(v, $),
                onKeyDown: ($) => u.onKeyDown(v, $),
                onFocus: () => u.setActiveAxis(v),
                onBlur: () => u.setActiveAxis(null)
              }
            ),
            /* @__PURE__ */ c.jsx(
              "circle",
              {
                className: `${a3}${T ? ` ${r3}` : ""}`,
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
function b3(t, a, s) {
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
function x3({ vec: t, size: a = 36 }) {
  const s = a / 2, i = a / 2, o = a / 2 * 0.86, u = g.useMemo(() => rn.map((f, m) => {
    const y = bc(t[f]), p = m / rn.length * Math.PI * 2 - Math.PI / 2, b = s + Math.cos(p) * o * y, v = i + Math.sin(p) * o * y;
    return `${b},${v}`;
  }).join(" "), [s, i, o, t]);
  return /* @__PURE__ */ c.jsx("span", { className: o3, "aria-hidden": "true", children: /* @__PURE__ */ c.jsxs(
    "svg",
    {
      className: c3,
      width: a,
      height: a,
      viewBox: `0 0 ${a} ${a}`,
      children: [
        /* @__PURE__ */ c.jsx("circle", { className: u3, cx: s, cy: i, r: o }),
        /* @__PURE__ */ c.jsx("polygon", { className: d3, points: u })
      ]
    }
  ) });
}
var S3 = "_1jqr3aj0", w3 = "_1jqr3aj1", j3 = "_1jqr3aj2", E3 = "_1jqr3aj3", N3 = "_1jqr3aj4", C3 = "_1jqr3aj5", T3 = "_1jqr3aj6", R3 = "_1jqr3aj7";
const P0 = 0.05, G0 = 0.2;
function _3({
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
          T = R + P0;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          T = R - P0;
          break;
        case "PageUp":
          T = R + G0;
          break;
        case "PageDown":
          T = R - G0;
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
  return /* @__PURE__ */ c.jsx("div", { className: S3, role: "group", "aria-label": "Emotion axis sliders", children: rn.map((j) => {
    const N = M3(t[j] ?? 0), R = N > 0.05, T = o === j, $ = xl[j];
    return /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: `${w3}${R ? ` ${j3}` : ""}${T ? ` ${E3}` : ""}`,
        role: "slider",
        "aria-label": `${$} intensity`,
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
          /* @__PURE__ */ c.jsx("span", { className: N3, children: $ }),
          /* @__PURE__ */ c.jsx("span", { className: C3, "data-track": "true", children: /* @__PURE__ */ c.jsx(
            "span",
            {
              className: T3,
              style: { width: `${N * 100}%` },
              "aria-hidden": "true"
            }
          ) }),
          /* @__PURE__ */ c.jsx("span", { className: R3, children: N.toFixed(2) })
        ]
      },
      j
    );
  }) });
}
function M3(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
var Y0 = "gvwvwg0", A3 = "gvwvwg2", k3 = "gvwvwg3", D3 = "gvwvwg8", z3 = "gvwvwg9", O3 = "gvwvwga", L3 = "gvwvwgb", $3 = "gvwvwgc", U3 = "gvwvwgd", B3 = "gvwvwge";
function I3({
  presets: t,
  activePresetId: a,
  onSelect: s,
  onDelete: i
}) {
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: Y0, children: [
    /* @__PURE__ */ c.jsx("span", { className: A3, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("span", { className: k3, children: "No presets yet. Save your current vector to build the library." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: Y0, children: [
    /* @__PURE__ */ c.jsx("span", { className: B3, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("div", { className: D3, children: t.map((o) => {
      const u = V3(o), f = o.presetId === a;
      return /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${z3}${f ? ` ${L3}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: O3,
                onClick: () => s(o),
                "aria-pressed": f,
                children: [
                  /* @__PURE__ */ c.jsx(x3, { vec: u, size: 28 }),
                  /* @__PURE__ */ c.jsx("span", { className: $3, children: o.presetName })
                ]
              }
            ),
            i && /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: U3,
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
function V3(t) {
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
const q3 = [
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
], H3 = [
  "very",
  "extremely",
  "deeply",
  "intensely",
  "absolutely",
  "totally",
  "really",
  "so"
], F3 = [
  "slightly",
  "a bit",
  "a little",
  "kinda",
  "kind of",
  "somewhat",
  "barely"
], P3 = ["not", "no", "never", "without", "lack", "lacking", "free of"];
function G3(t) {
  const a = t.toLowerCase().trim();
  if (!a) return { ...Js };
  const i = a.split(/\s+/).some((f) => H3.includes(f)) ? 1.2 : 1, o = F3.some((f) => a.includes(f)) ? 0.55 : 1, u = { ...Js };
  for (const f of q3) {
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
      P3.some((T) => new RegExp(`\\b${T}\\b`).test(R)) || (m += 1);
    }
    if (m > 0) {
      const y = f.weight * Math.min(1, 0.55 + 0.2 * (m - 1)) * i * o;
      u[f.axis] = Math.min(1, y);
    }
  }
  return rn.every((f) => u[f] === 0) && (u.calm = 0.4), es(u);
}
const Y3 = [
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
];
function K3({
  value: t,
  onChange: a,
  deploymentId: s,
  presets: i,
  onPresetsChange: o
}) {
  const u = t.mode ?? "emotion_vector", f = u === "none" || u === "audio_ref" ? "emotion_vector" : u, m = g.useMemo(() => X3(t.vector), [t.vector]), y = t.emotionAlpha ?? 1, [p, b] = g.useState(null), [v, w] = g.useState(!1), [S, j] = g.useState(null), [N, R] = g.useState(""), [T, $] = g.useState(!1), _ = g.useRef(!0);
  g.useEffect(() => (_.current = !0, () => {
    _.current = !1;
  }), []), g.useEffect(() => {
    T || R(q0(m));
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
  }, ae = (U) => {
    const se = Math.max(0, Math.min(10, Number.isFinite(U) ? U : 1));
    a({ ...t, emotionAlpha: se });
  }, A = async () => {
    const U = N.trim();
    if (U) {
      w(!0), b(null);
      try {
        const se = await mM(s, U, Rf(m));
        if (!_.current) return;
        o(
          Q3([se, ...i.filter((de) => de.presetId !== se.presetId)])
        ), j(se.presetId), $(!1);
      } catch (se) {
        _.current && b(K0(se));
      } finally {
        _.current && w(!1);
      }
    }
  }, V = async (U) => {
    const se = [...i];
    o(i.filter((de) => de.presetId !== U)), S === U && j(null);
    try {
      await pM(s, U);
    } catch (de) {
      _.current && (o(se), b(K0(de)));
    }
  }, D = (U) => {
    j(U.presetId), a({
      ...t,
      mode: "emotion_vector",
      vector: U.vector
    });
  }, P = (U) => {
    a({ ...t, mode: "qwen_template", qwenTemplate: U });
  }, J = f3(m), Q = h3(m), G = V1(m, 3), ie = G.length > 0 && N.trim().length > 0 && !v, M = q0(m) || "name your preset…", F = f !== "emotion_vector";
  return /* @__PURE__ */ c.jsxs("div", { className: bA, children: [
    /* @__PURE__ */ c.jsxs("div", { className: xA, children: [
      /* @__PURE__ */ c.jsx("span", { className: O0, children: "Emotion mode" }),
      /* @__PURE__ */ c.jsx("div", { className: SA, role: "radiogroup", "aria-label": "Emotion mode", children: Y3.map((U) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": f === U.id,
          className: `${wA}${f === U.id ? ` ${jA}` : ""}`,
          onClick: () => C(U.id),
          children: U.label
        },
        U.id
      )) })
    ] }),
    f === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: DA, children: [
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: zA,
          placeholder: 'e.g. "Friendly teen, slightly skeptical"',
          value: t.qwenTemplate ?? "",
          onChange: (U) => P(U.target.value)
        }
      ),
      /* @__PURE__ */ c.jsxs("div", { className: OA, children: [
        /* @__PURE__ */ c.jsx(
          Qe,
          {
            variant: "secondary",
            onClick: () => {
              const U = (t.qwenTemplate ?? "").trim();
              if (!U) return;
              const se = G3(U);
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
        /* @__PURE__ */ c.jsx("span", { className: I0, children: "Heuristic v1: keyword-based mapping. Switches to vector mode on success." })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: I0, children: [
        "The Qwen prompt is mapped to a vector at synth time. Per-line",
        " ",
        /* @__PURE__ */ c.jsx("code", { children: "[Char|qwen:…]" }),
        " overrides take precedence."
      ] })
    ] }),
    f === "emotion_vector" && /* @__PURE__ */ c.jsxs("div", { className: AA, children: [
      /* @__PURE__ */ c.jsx("div", { className: `${d0} ${EA}`, children: /* @__PURE__ */ c.jsx(
        y3,
        {
          vec: m,
          onChange: I,
          readOnly: F
        }
      ) }),
      /* @__PURE__ */ c.jsxs("div", { className: `${d0} ${NA}`, children: [
        /* @__PURE__ */ c.jsxs("div", { className: CA, children: [
          /* @__PURE__ */ c.jsx("span", { className: O0, children: "Dominant" }),
          /* @__PURE__ */ c.jsx("span", { className: TA, children: J ? xl[J].toLowerCase() : "neutral" }),
          /* @__PURE__ */ c.jsxs("span", { className: RA, children: [
            "‖v‖ = ",
            Q.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(_3, { vec: m, onChange: I, readOnly: F }),
        /* @__PURE__ */ c.jsx("div", { className: _A, children: /* @__PURE__ */ c.jsxs(
          Qe,
          {
            variant: "ghost",
            size: "sm",
            onClick: Y,
            disabled: F || Q < 1e-3,
            "aria-label": "Reset emotion vector",
            children: [
              /* @__PURE__ */ c.jsxs(
                "svg",
                {
                  className: MA,
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
      /* @__PURE__ */ c.jsxs("div", { className: L0, children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("span", { className: $0, children: "Alpha" }),
          /* @__PURE__ */ c.jsx("br", {}),
          /* @__PURE__ */ c.jsx("span", { className: kA, children: "Global mix · per-line overrides bypass it" })
        ] }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 10,
            step: 0.01,
            value: y,
            className: U0,
            style: { "--fill": `${y * 10}%` },
            onChange: (U) => ae(Number(U.target.value)),
            "aria-label": "Emotion alpha"
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: B0, children: [
          (y * 100).toFixed(0),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${$A}${G.length === 0 ? ` ${UA}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs("div", { className: BA, children: [
              /* @__PURE__ */ c.jsx("span", { className: IA, children: "Save current as preset" }),
              G.length === 0 && /* @__PURE__ */ c.jsx("span", { className: VA, children: "adjust the radar to enable" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: qA, children: [
              /* @__PURE__ */ c.jsx("div", { className: HA, children: G.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: `${V0} ${PA}`, children: "no axes set" }) : G.map((U) => /* @__PURE__ */ c.jsxs("span", { className: V0, children: [
                U.label.toLowerCase(),
                /* @__PURE__ */ c.jsx("b", { className: FA, children: U.value.toFixed(2) })
              ] }, U.key)) }),
              /* @__PURE__ */ c.jsxs("div", { className: GA, children: [
                /* @__PURE__ */ c.jsx(
                  "input",
                  {
                    type: "text",
                    className: YA,
                    placeholder: M,
                    value: N,
                    disabled: G.length === 0 || v,
                    onChange: (U) => {
                      R(U.target.value), $(!0);
                    },
                    onKeyDown: (U) => {
                      U.key === "Enter" && ie && A();
                    },
                    "aria-label": "Preset name"
                  }
                ),
                /* @__PURE__ */ c.jsx(
                  Qe,
                  {
                    variant: "primary",
                    disabled: !ie,
                    onClick: A,
                    children: v ? "Saving…" : "+ Save"
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ c.jsx(
        I3,
        {
          presets: i,
          activePresetId: S,
          onSelect: D,
          onDelete: V
        }
      )
    ] }),
    f === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: L0, children: [
      /* @__PURE__ */ c.jsx("span", { className: $0, children: "Alpha" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 10,
          step: 0.01,
          value: y,
          className: U0,
          style: { "--fill": `${y * 10}%` },
          onChange: (U) => ae(Number(U.target.value)),
          "aria-label": "Emotion alpha"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: B0, children: [
        (y * 100).toFixed(0),
        "%"
      ] })
    ] }),
    p && /* @__PURE__ */ c.jsx("div", { className: LA, children: p })
  ] });
}
function X3(t) {
  if (!t || !Array.isArray(t)) return es(Js);
  const a = { ...Js };
  return rn.forEach((s, i) => {
    const o = t[i];
    a[s] = Number.isFinite(o) ? Math.max(0, Math.min(1, o)) : 0;
  }), a;
}
function Q3(t) {
  return [...t].sort((a, s) => s.updatedAt - a.updatedAt);
}
function K0(t) {
  return t instanceof ni || t instanceof Error ? t.message : "Unknown error";
}
var Z3 = "_5u1uau0", tl = "_5u1uau1", J3 = "_5u1uau2", Is = "_5u1uau3", nl = "_5u1uau4", W3 = "_5u1uau5", _f = "_5u1uau6", e5 = "_5u1uau7", t5 = "_5u1uau8", n5 = "_5u1uau9", a5 = "_5u1uaua", r5 = "_5u1uaub", s5 = "_5u1uauc", i5 = "_5u1uaud", l5 = "_5u1uaue", X0 = "_5u1uauf", Q0 = "_5u1uaug", o5 = "_5u1uauh";
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
], c5 = ["mp3", "wav", "flac"], ec = 0.5, Af = 2, u5 = 0.05, d5 = 0.8, f5 = 0.8, Z0 = 42;
function tc(t, a, s) {
  const i = t[a];
  if (typeof i == "number" && Number.isFinite(i)) return i;
  if (typeof i == "string") {
    const o = Number(i);
    if (Number.isFinite(o)) return o;
  }
  return s;
}
function h5({
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
        const Y = tc(f, "seed", Z0);
        m({ ...f, seed: Y });
      }
  }, R = Mf.find((I) => I.id === o) ?? Mf[0], T = (s - ec) / (Af - ec) * 100, $ = tc(f, "temperature", d5), _ = tc(f, "top_p", f5), C = tc(f, "seed", Z0);
  return /* @__PURE__ */ c.jsxs("div", { className: Z3, children: [
    /* @__PURE__ */ c.jsxs("div", { className: tl, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: y, className: Is, children: "Format" }),
      /* @__PURE__ */ c.jsx("div", { className: nl, children: /* @__PURE__ */ c.jsx(
        "select",
        {
          id: y,
          className: W3,
          value: t,
          onChange: (I) => a(I.currentTarget.value),
          children: c5.map((I) => /* @__PURE__ */ c.jsx("option", { value: I, children: I }, I))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: tl, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: p, className: Is, children: "Speed" }),
      /* @__PURE__ */ c.jsxs("div", { className: `${nl} ${e5}`, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: p,
            type: "range",
            className: t5,
            min: ec,
            max: Af,
            step: u5,
            value: s,
            style: { "--range-pct": `${T}%` },
            onChange: (I) => i(Number(I.currentTarget.value)),
            "aria-valuemin": ec,
            "aria-valuemax": Af,
            "aria-valuenow": s
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: n5, children: [
          s.toFixed(2),
          "×"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: J3, role: "radiogroup", "aria-label": "Cache policy", children: [
      /* @__PURE__ */ c.jsx("span", { className: Is, children: "Cache" }),
      /* @__PURE__ */ c.jsx("div", { className: a5, children: Mf.map((I) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": o === I.id,
          className: r5,
          onClick: () => u(I.id),
          title: I.help,
          children: I.label
        },
        I.id
      )) }),
      /* @__PURE__ */ c.jsx("p", { className: s5, "aria-live": "polite", children: R.help })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: i5, "aria-hidden": "true" }),
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
          value: $,
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
          className: `${nl} ${l5}`,
          role: "radiogroup",
          "aria-labelledby": `${w}-label`,
          children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                role: "radio",
                "aria-checked": j === "fixed",
                className: `${X0} ${j === "fixed" ? Q0 : ""}`,
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
                className: `${X0} ${j === "random" ? Q0 : ""}`,
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
            ) : /* @__PURE__ */ c.jsx("span", { className: o5, "aria-live": "polite", children: "auto · rolls each run" })
          ]
        }
      )
    ] })
  ] });
}
var m5 = "iv43qk0", J0 = "iv43qk1", p5 = "iv43qk2", W0 = "iv43qk3", g5 = "iv43qk4", v5 = "iv43qk5", y5 = "iv43qk6", b5 = "iv43qk7", x5 = { vector: "iv43qk8", qwen: "iv43qk9", preset: "iv43qka", audio: "iv43qkb", raw: "iv43qkc" }, S5 = "iv43qkd", w5 = "iv43qke", kf = "iv43qkf", Df = "iv43qkg";
function j5({
  lines: t,
  characterColors: a,
  onLineClick: s
}) {
  if (t.length === 0)
    return /* @__PURE__ */ c.jsx("p", { className: S5, children: "Paste dialogue above to see character-tagged lines, override badges, and per-line previews here." });
  const i = t.length, o = t.filter((f) => f.character !== null).length, u = i - o;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: w5, children: [
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
    /* @__PURE__ */ c.jsx("ol", { className: m5, children: t.map((f) => /* @__PURE__ */ c.jsx(
      E5,
      {
        line: f,
        ...f.character && a[f.character] ? { color: a[f.character] } : {},
        ...s ? { onClick: () => s(f.idx) } : {}
      },
      f.idx
    )) })
  ] });
}
function E5({ line: t, color: a, onClick: s }) {
  return t.character === null ? /* @__PURE__ */ c.jsxs("li", { className: `${J0} ${p5}`, children: [
    /* @__PURE__ */ c.jsx("span", { className: W0, children: String(t.idx + 1).padStart(2, "0") }),
    /* @__PURE__ */ c.jsx("span", { className: y5, children: t.text })
  ] }) : /* @__PURE__ */ c.jsxs(
    "li",
    {
      className: J0,
      onClick: s,
      style: s ? { cursor: "pointer" } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: W0, children: String(t.idx + 1).padStart(2, "0") }),
        /* @__PURE__ */ c.jsx("span", { className: g5, style: a ? { color: a } : void 0, children: t.character }),
        /* @__PURE__ */ c.jsxs("span", { className: v5, children: [
          t.text,
          t.override && /* @__PURE__ */ c.jsxs("span", { className: `${b5} ${x5[t.override.kind]}`, children: [
            t.override.kind,
            t.override.label ? ` · ${t.override.label}` : ""
          ] })
        ] })
      ]
    }
  );
}
var N5 = "_46z95i0", C5 = "_46z95i1", T5 = "_46z95i2", R5 = "_46z95i3", _5 = "_46z95i4", M5 = "_46z95i5", A5 = "_46z95i6";
const k5 = {
  intensity: 0.6,
  pace: 1,
  pitchSt: 0
};
function D5({ value: t, onChange: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: N5, children: [
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
  return /* @__PURE__ */ c.jsxs("div", { className: C5, children: [
    /* @__PURE__ */ c.jsxs("div", { className: T5, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: p, className: R5, children: t }),
      /* @__PURE__ */ c.jsx("span", { className: _5, children: a })
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
        className: M5,
        style: { "--fill": `${y}%` },
        onChange: (b) => m(Number(b.target.value))
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: A5, children: u(f) })
  ] });
}
var z5 = "qe93dj0", O5 = "qe93dj1", L5 = "qe93dj2", $5 = "qe93dj3", U5 = "qe93dj4", B5 = "qe93dj5", I5 = "qe93dj6", V5 = { ok: "qe93dj7", warn: "qe93dj8", info: "qe93dj9" }, q5 = "qe93dja", H5 = "qe93djb";
function F5({ checks: t }) {
  const a = t.filter((s) => s.status === "ok").length;
  return /* @__PURE__ */ c.jsxs("div", { className: z5, children: [
    /* @__PURE__ */ c.jsxs("header", { className: O5, children: [
      /* @__PURE__ */ c.jsx("span", { className: L5, children: "Pre-flight" }),
      /* @__PURE__ */ c.jsxs("span", { className: $5, children: [
        a,
        "/",
        t.length,
        " OK"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: U5, children: t.map((s) => /* @__PURE__ */ c.jsxs("li", { className: B5, children: [
      /* @__PURE__ */ c.jsx(
        "span",
        {
          "aria-hidden": "true",
          className: `${I5} ${V5[s.status]}`
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: q5, children: s.label }),
      s.detail && /* @__PURE__ */ c.jsx("span", { className: H5, children: s.detail })
    ] }, s.id)) })
  ] });
}
var eb = "_17fbpt30", tb = "_17fbpt31", nb = "_17fbpt32", P5 = "_17fbpt33", G5 = "_17fbpt34", Y5 = "_17fbpt35", ab = "_17fbpt36", K5 = "_17fbpt37", X5 = "_17fbpt38";
const Q5 = {
  completed: "success",
  running: "accent",
  queued: "neutral",
  failed: "danger",
  cancelled: "faint",
  partial: "warning"
};
function Z5({
  runs: t,
  deploymentId: a,
  onOpenQueue: s,
  onOpenRun: i,
  emptyHint: o
}) {
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: eb, children: [
    /* @__PURE__ */ c.jsx("header", { className: tb, children: /* @__PURE__ */ c.jsx(
      "a",
      {
        className: nb,
        href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
        onClick: s ? (u) => {
          u.preventDefault(), s();
        } : void 0,
        children: "Open queue →"
      }
    ) }),
    /* @__PURE__ */ c.jsx("p", { className: K5, children: "No runs yet." }),
    /* @__PURE__ */ c.jsx("p", { className: X5, children: o ?? "Hit Generate to enqueue a batch." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: eb, children: [
    /* @__PURE__ */ c.jsxs("header", { className: tb, children: [
      /* @__PURE__ */ c.jsx("span", {}),
      /* @__PURE__ */ c.jsx(
        "a",
        {
          className: nb,
          href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
          onClick: s ? (u) => {
            u.preventDefault(), s();
          } : void 0,
          children: "Open queue →"
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: P5, children: t.slice(0, 5).map((u) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: G5,
        onClick: i ? () => i(u.runId) : void 0,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: Y5, children: u.runId }),
          /* @__PURE__ */ c.jsx("span", { className: `${k1.sm} ${D1[Q5[u.status] ?? "neutral"]}`, children: u.status }),
          /* @__PURE__ */ c.jsx("span", { className: ab, children: J5(u.startedAt ?? u.queuedAt) }),
          /* @__PURE__ */ c.jsx("span", { className: ab, children: u.kind })
        ]
      }
    ) }, u.runId)) })
  ] });
}
function J5(t) {
  if (!t) return "—";
  const a = t > 1e12 ? Math.floor(t / 1e3) : t, s = new Date(a * 1e3);
  if (Number.isNaN(s.getTime())) return "—";
  const o = Date.now() - s.getTime();
  return o < 6e4 ? "just now" : o < 36e5 ? `${Math.floor(o / 6e4)}m ago` : o < 864e5 ? `${Math.floor(o / 36e5)}h ago` : s.toISOString().slice(0, 16).replace("T", " ");
}
const q1 = g.createContext({});
function tm(t) {
  const a = g.useRef(null);
  return a.current === null && (a.current = t()), a.current;
}
const W5 = typeof window < "u", H1 = W5 ? g.useLayoutEffect : g.useEffect, Kc = /* @__PURE__ */ g.createContext(null);
function ek(t, a) {
  t.indexOf(a) === -1 && t.push(a);
}
function tk(t, a) {
  const s = t.indexOf(a);
  s > -1 && t.splice(s, 1);
}
const jr = (t, a, s) => s > a ? a : s < t ? t : s;
function rb(t, a) {
  return a ? `${t}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : t;
}
let Rl = () => {
}, Ws = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (Rl = (t, a, s) => {
  !t && typeof console < "u" && console.warn(rb(a, s));
}, Ws = (t, a, s) => {
  if (!t)
    throw new Error(rb(a, s));
});
const Er = {}, F1 = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function nk(t) {
  return typeof t == "object" && t !== null;
}
const P1 = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function G1(t) {
  let a;
  return () => (a === void 0 && (a = t()), a);
}
const ai = /* @__NO_SIDE_EFFECTS__ */ (t) => t, ak = (t, a) => (s) => a(t(s)), Xc = (...t) => t.reduce(ak), Y1 = /* @__NO_SIDE_EFFECTS__ */ (t, a, s) => {
  const i = a - t;
  return i === 0 ? 1 : (s - t) / i;
};
class K1 {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return ek(this.subscriptions, a), () => tk(this.subscriptions, a);
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
function X1(t, a) {
  return a ? t * (1e3 / a) : 0;
}
const Q1 = (t, a, s) => (((1 - 3 * s + 3 * a) * t + (3 * s - 6 * a)) * t + 3 * a) * t, rk = 1e-7, sk = 12;
function ik(t, a, s, i, o) {
  let u, f, m = 0;
  do
    f = a + (s - a) / 2, u = Q1(f, i, o) - t, u > 0 ? s = f : a = f;
  while (Math.abs(u) > rk && ++m < sk);
  return f;
}
function _l(t, a, s, i) {
  if (t === a && s === i)
    return ai;
  const o = (u) => ik(u, 0, 1, t, s);
  return (u) => u === 0 || u === 1 ? u : Q1(o(u), a, i);
}
const Z1 = (t) => (a) => a <= 0.5 ? t(2 * a) / 2 : (2 - t(2 * (1 - a))) / 2, J1 = (t) => (a) => 1 - t(1 - a), W1 = /* @__PURE__ */ _l(0.33, 1.53, 0.69, 0.99), nm = /* @__PURE__ */ J1(W1), eS = /* @__PURE__ */ Z1(nm), tS = (t) => t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * nm(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), am = (t) => 1 - Math.sin(Math.acos(t)), lk = J1(am), nS = Z1(am), ok = /* @__PURE__ */ _l(0.42, 0, 1, 1), ck = /* @__PURE__ */ _l(0, 0, 0.58, 1), aS = /* @__PURE__ */ _l(0.42, 0, 0.58, 1), uk = (t) => Array.isArray(t) && typeof t[0] != "number", rS = (t) => Array.isArray(t) && typeof t[0] == "number", sb = {
  linear: ai,
  easeIn: ok,
  easeInOut: aS,
  easeOut: ck,
  circIn: am,
  circInOut: nS,
  circOut: lk,
  backIn: nm,
  backInOut: eS,
  backOut: W1,
  anticipate: tS
}, dk = (t) => typeof t == "string", ib = (t) => {
  if (rS(t)) {
    Ws(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, s, i, o] = t;
    return _l(a, s, i, o);
  } else if (dk(t))
    return Ws(sb[t] !== void 0, `Invalid easing type '${t}'`, "invalid-easing-type"), sb[t];
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
function fk(t, a) {
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
const hk = 40;
function sS(t, a) {
  let s = !1, i = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, u = () => s = !0, f = nc.reduce((_, C) => (_[C] = fk(u), _), {}), { setup: m, read: y, resolveKeyframes: p, preUpdate: b, update: v, preRender: w, render: S, postRender: j } = f, N = () => {
    const _ = Er.useManualTiming, C = _ ? o.timestamp : performance.now();
    s = !1, _ || (o.delta = i ? 1e3 / 60 : Math.max(Math.min(C - o.timestamp, hk), 1)), o.timestamp = C, o.isProcessing = !0, m.process(o), y.process(o), p.process(o), b.process(o), v.process(o), w.process(o), S.process(o), j.process(o), o.isProcessing = !1, s && a && (i = !1, t(N));
  }, R = () => {
    s = !0, i = !0, o.isProcessing || t(N);
  };
  return { schedule: nc.reduce((_, C) => {
    const I = f[C];
    return _[C] = (Y, ae = !1, A = !1) => (s || R(), I.schedule(Y, ae, A)), _;
  }, {}), cancel: (_) => {
    for (let C = 0; C < nc.length; C++)
      f[nc[C]].cancel(_);
  }, state: o, steps: f };
}
const { schedule: na, cancel: ih, state: Rc } = /* @__PURE__ */ sS(typeof requestAnimationFrame < "u" ? requestAnimationFrame : ai, !0);
let xc;
function mk() {
  xc = void 0;
}
const qn = {
  now: () => (xc === void 0 && qn.set(Rc.isProcessing || Er.useManualTiming ? Rc.timestamp : performance.now()), xc),
  set: (t) => {
    xc = t, queueMicrotask(mk);
  }
}, iS = (t) => (a) => typeof a == "string" && a.startsWith(t), lS = /* @__PURE__ */ iS("--"), pk = /* @__PURE__ */ iS("var(--"), rm = (t) => pk(t) ? gk.test(t.split("/*")[0].trim()) : !1, gk = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function lb(t) {
  return typeof t != "string" ? !1 : t.split("/*")[0].includes("var(--");
}
const ri = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, Sl = {
  ...ri,
  transform: (t) => jr(0, 1, t)
}, ac = {
  ...ri,
  default: 1
}, hl = (t) => Math.round(t * 1e5) / 1e5, sm = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function vk(t) {
  return t == null;
}
const yk = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, im = (t, a) => (s) => !!(typeof s == "string" && yk.test(s) && s.startsWith(t) || a && !vk(s) && Object.prototype.hasOwnProperty.call(s, a)), oS = (t, a, s) => (i) => {
  if (typeof i != "string")
    return i;
  const [o, u, f, m] = i.match(sm);
  return {
    [t]: parseFloat(o),
    [a]: parseFloat(u),
    [s]: parseFloat(f),
    alpha: m !== void 0 ? parseFloat(m) : 1
  };
}, bk = (t) => jr(0, 255, t), Of = {
  ...ri,
  transform: (t) => Math.round(bk(t))
}, Xr = {
  test: /* @__PURE__ */ im("rgb", "red"),
  parse: /* @__PURE__ */ oS("red", "green", "blue"),
  transform: ({ red: t, green: a, blue: s, alpha: i = 1 }) => "rgba(" + Of.transform(t) + ", " + Of.transform(a) + ", " + Of.transform(s) + ", " + hl(Sl.transform(i)) + ")"
};
function xk(t) {
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
  parse: xk,
  transform: Xr.transform
}, Ml = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (a) => typeof a == "string" && a.endsWith(t) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${t}`
}), vr = /* @__PURE__ */ Ml("deg"), Xs = /* @__PURE__ */ Ml("%"), De = /* @__PURE__ */ Ml("px"), Sk = /* @__PURE__ */ Ml("vh"), wk = /* @__PURE__ */ Ml("vw"), ob = {
  ...Xs,
  parse: (t) => Xs.parse(t) / 100,
  transform: (t) => Xs.transform(t * 100)
}, Ys = {
  test: /* @__PURE__ */ im("hsl", "hue"),
  parse: /* @__PURE__ */ oS("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: a, lightness: s, alpha: i = 1 }) => "hsla(" + Math.round(t) + ", " + Xs.transform(hl(a)) + ", " + Xs.transform(hl(s)) + ", " + hl(Sl.transform(i)) + ")"
}, an = {
  test: (t) => Xr.test(t) || lh.test(t) || Ys.test(t),
  parse: (t) => Xr.test(t) ? Xr.parse(t) : Ys.test(t) ? Ys.parse(t) : lh.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? Xr.transform(t) : Ys.transform(t),
  getAnimatableNone: (t) => {
    const a = an.parse(t);
    return a.alpha = 0, an.transform(a);
  }
}, jk = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Ek(t) {
  return isNaN(t) && typeof t == "string" && (t.match(sm)?.length || 0) + (t.match(jk)?.length || 0) > 0;
}
const cS = "number", uS = "color", Nk = "var", Ck = "var(", cb = "${}", Tk = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function ei(t) {
  const a = t.toString(), s = [], i = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let u = 0;
  const m = a.replace(Tk, (y) => (an.test(y) ? (i.color.push(u), o.push(uS), s.push(an.parse(y))) : y.startsWith(Ck) ? (i.var.push(u), o.push(Nk), s.push(y)) : (i.number.push(u), o.push(cS), s.push(parseFloat(y))), ++u, cb)).split(cb);
  return { values: s, split: m, indexes: i, types: o };
}
function Rk(t) {
  return ei(t).values;
}
function dS({ split: t, types: a }) {
  const s = t.length;
  return (i) => {
    let o = "";
    for (let u = 0; u < s; u++)
      if (o += t[u], i[u] !== void 0) {
        const f = a[u];
        f === cS ? o += hl(i[u]) : f === uS ? o += an.transform(i[u]) : o += i[u];
      }
    return o;
  };
}
function _k(t) {
  return dS(ei(t));
}
const Mk = (t) => typeof t == "number" ? 0 : an.test(t) ? an.getAnimatableNone(t) : t, Ak = (t, a) => typeof t == "number" ? a?.trim().endsWith("/") ? t : 0 : Mk(t);
function kk(t) {
  const a = ei(t);
  return dS(a)(a.values.map((i, o) => Ak(i, a.split[o])));
}
const da = {
  test: Ek,
  parse: Rk,
  createTransformer: _k,
  getAnimatableNone: kk
};
function Lf(t, a, s) {
  return s < 0 && (s += 1), s > 1 && (s -= 1), s < 1 / 6 ? t + (a - t) * 6 * s : s < 1 / 2 ? a : s < 2 / 3 ? t + (a - t) * (2 / 3 - s) * 6 : t;
}
function Dk({ hue: t, saturation: a, lightness: s, alpha: i }) {
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
}, zk = [lh, Xr, Ys], Ok = (t) => zk.find((a) => a.test(t));
function ub(t) {
  const a = Ok(t);
  if (Rl(!!a, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let s = a.parse(t);
  return a === Ys && (s = Dk(s)), s;
}
const db = (t, a) => {
  const s = ub(t), i = ub(a);
  if (!s || !i)
    return _c(t, a);
  const o = { ...s };
  return (u) => (o.red = $f(s.red, i.red, u), o.green = $f(s.green, i.green, u), o.blue = $f(s.blue, i.blue, u), o.alpha = Al(s.alpha, i.alpha, u), Xr.transform(o));
}, oh = /* @__PURE__ */ new Set(["none", "hidden"]);
function Lk(t, a) {
  return oh.has(t) ? (s) => s <= 0 ? t : a : (s) => s >= 1 ? a : t;
}
function $k(t, a) {
  return (s) => Al(t, a, s);
}
function lm(t) {
  return typeof t == "number" ? $k : typeof t == "string" ? rm(t) ? _c : an.test(t) ? db : Ik : Array.isArray(t) ? fS : typeof t == "object" ? an.test(t) ? db : Uk : _c;
}
function fS(t, a) {
  const s = [...t], i = s.length, o = t.map((u, f) => lm(u)(u, a[f]));
  return (u) => {
    for (let f = 0; f < i; f++)
      s[f] = o[f](u);
    return s;
  };
}
function Uk(t, a) {
  const s = { ...t, ...a }, i = {};
  for (const o in s)
    t[o] !== void 0 && a[o] !== void 0 && (i[o] = lm(t[o])(t[o], a[o]));
  return (o) => {
    for (const u in i)
      s[u] = i[u](o);
    return s;
  };
}
function Bk(t, a) {
  const s = [], i = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const u = a.types[o], f = t.indexes[u][i[u]], m = t.values[f] ?? 0;
    s[o] = m, i[u]++;
  }
  return s;
}
const Ik = (t, a) => {
  const s = da.createTransformer(a), i = ei(t), o = ei(a);
  return i.indexes.var.length === o.indexes.var.length && i.indexes.color.length === o.indexes.color.length && i.indexes.number.length >= o.indexes.number.length ? oh.has(t) && !o.values.length || oh.has(a) && !i.values.length ? Lk(t, a) : Xc(fS(Bk(i, o), o.values), s) : (Rl(!0, `Complex values '${t}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), _c(t, a));
};
function hS(t, a, s) {
  return typeof t == "number" && typeof a == "number" && typeof s == "number" ? Al(t, a, s) : lm(t)(t, a);
}
const Vk = (t) => {
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
}, mS = (t, a, s = 10) => {
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
function qk(t, a = 100, s) {
  const i = s({ ...t, keyframes: [0, a] }), o = Math.min(om(i), Mc);
  return {
    type: "keyframes",
    ease: (u) => i.next(o * u).value / a,
    duration: /* @__PURE__ */ ua(o)
  };
}
const It = {
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
const Hk = 12;
function Fk(t, a, s) {
  let i = s;
  for (let o = 1; o < Hk; o++)
    i = i - t(i) / a(i);
  return i;
}
const Uf = 1e-3;
function Pk({ duration: t = It.duration, bounce: a = It.bounce, velocity: s = It.velocity, mass: i = It.mass }) {
  let o, u;
  Rl(t <= /* @__PURE__ */ ta(It.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let f = 1 - a;
  f = jr(It.minDamping, It.maxDamping, f), t = jr(It.minDuration, It.maxDuration, /* @__PURE__ */ ua(t)), f < 1 ? (o = (p) => {
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
  const m = 5 / t, y = Fk(o, u, m);
  if (t = /* @__PURE__ */ ta(t), isNaN(y))
    return {
      stiffness: It.stiffness,
      damping: It.damping,
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
const Gk = ["duration", "bounce"], Yk = ["stiffness", "damping", "mass"];
function fb(t, a) {
  return a.some((s) => t[s] !== void 0);
}
function Kk(t) {
  let a = {
    velocity: It.velocity,
    stiffness: It.stiffness,
    damping: It.damping,
    mass: It.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!fb(t, Yk) && fb(t, Gk))
    if (a.velocity = 0, t.visualDuration) {
      const s = t.visualDuration, i = 2 * Math.PI / (s * 1.2), o = i * i, u = 2 * jr(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: It.mass,
        stiffness: o,
        damping: u
      };
    } else {
      const s = Pk({ ...t, velocity: 0 });
      a = {
        ...a,
        ...s,
        mass: It.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function Ac(t = It.visualDuration, a = It.bounce) {
  const s = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: a
  } : t;
  let { restSpeed: i, restDelta: o } = s;
  const u = s.keyframes[0], f = s.keyframes[s.keyframes.length - 1], m = { done: !1, value: u }, { stiffness: y, damping: p, mass: b, duration: v, velocity: w, isResolvedFromDuration: S } = Kk({
    ...s,
    velocity: -/* @__PURE__ */ ua(s.velocity || 0)
  }), j = w || 0, N = p / (2 * Math.sqrt(y * b)), R = f - u, T = /* @__PURE__ */ ua(Math.sqrt(y / b)), $ = Math.abs(R) < 5;
  i || (i = $ ? It.restSpeed.granular : It.restSpeed.default), o || (o = $ ? It.restDelta.granular : It.restDelta.default);
  let _, C, I, Y, ae, A;
  if (N < 1)
    I = ch(T, N), Y = (j + N * T * R) / I, _ = (D) => {
      const P = Math.exp(-N * T * D);
      return f - P * (Y * Math.sin(I * D) + R * Math.cos(I * D));
    }, ae = N * T * Y + R * I, A = N * T * R - Y * I, C = (D) => Math.exp(-N * T * D) * (ae * Math.sin(I * D) + A * Math.cos(I * D));
  else if (N === 1) {
    _ = (P) => f - Math.exp(-T * P) * (R + (j + T * R) * P);
    const D = j + T * R;
    C = (P) => Math.exp(-T * P) * (T * D * P - j);
  } else {
    const D = T * Math.sqrt(N * N - 1);
    _ = (G) => {
      const ie = Math.exp(-N * T * G), M = Math.min(D * G, 300);
      return f - ie * ((j + N * T * R) * Math.sinh(M) + D * R * Math.cosh(M)) / D;
    };
    const P = (j + N * T * R) / D, J = N * T * P - R * D, Q = N * T * R - P * D;
    C = (G) => {
      const ie = Math.exp(-N * T * G), M = Math.min(D * G, 300);
      return ie * (J * Math.sinh(M) + Q * Math.cosh(M));
    };
  }
  const V = {
    calculatedDuration: S && v || null,
    velocity: (D) => /* @__PURE__ */ ta(C(D)),
    next: (D) => {
      if (!S && N < 1) {
        const J = Math.exp(-N * T * D), Q = Math.sin(I * D), G = Math.cos(I * D), ie = f - J * (Y * Q + R * G), M = /* @__PURE__ */ ta(J * (ae * Q + A * G));
        return m.done = Math.abs(M) <= i && Math.abs(f - ie) <= o, m.value = m.done ? f : ie, m;
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
      const D = Math.min(om(V), Mc), P = mS((J) => V.next(D * J).value, D, 30);
      return D + "ms " + P;
    },
    toTransition: () => {
    }
  };
  return V;
}
Ac.applyToOptions = (t) => {
  const a = qk(t, 100, Ac);
  return t.ease = a.ease, t.duration = /* @__PURE__ */ ta(a.duration), t.type = "keyframes", t;
};
const Xk = 5;
function pS(t, a, s) {
  const i = Math.max(a - Xk, 0);
  return X1(s - t(i), a - i);
}
function uh({ keyframes: t, velocity: a = 0, power: s = 0.8, timeConstant: i = 325, bounceDamping: o = 10, bounceStiffness: u = 500, modifyTarget: f, min: m, max: y, restDelta: p = 0.5, restSpeed: b }) {
  const v = t[0], w = {
    done: !1,
    value: v
  }, S = (A) => m !== void 0 && A < m || y !== void 0 && A > y, j = (A) => m === void 0 ? y : y === void 0 || Math.abs(m - A) < Math.abs(y - A) ? m : y;
  let N = s * a;
  const R = v + N, T = f === void 0 ? R : f(R);
  T !== R && (N = T - v);
  const $ = (A) => -N * Math.exp(-A / i), _ = (A) => T + $(A), C = (A) => {
    const V = $(A), D = _(A);
    w.done = Math.abs(V) <= p, w.value = w.done ? T : D;
  };
  let I, Y;
  const ae = (A) => {
    S(w.value) && (I = A, Y = Ac({
      keyframes: [w.value, j(w.value)],
      velocity: pS(_, A, w.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: u,
      restDelta: p,
      restSpeed: b
    }));
  };
  return ae(0), {
    calculatedDuration: null,
    next: (A) => {
      let V = !1;
      return !Y && I === void 0 && (V = !0, C(A), ae(A)), I !== void 0 && A >= I ? Y.next(A - I) : (!V && C(A), w);
    }
  };
}
function Qk(t, a, s) {
  const i = [], o = s || Er.mix || hS, u = t.length - 1;
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
function Zk(t, a, { clamp: s = !0, ease: i, mixer: o } = {}) {
  const u = t.length;
  if (Ws(u === a.length, "Both input and output ranges must be the same length", "range-length"), u === 1)
    return () => a[0];
  if (u === 2 && a[0] === a[1])
    return () => a[1];
  const f = t[0] === t[1];
  t[0] > t[u - 1] && (t = [...t].reverse(), a = [...a].reverse());
  const m = Qk(a, i, o), y = m.length, p = (b) => {
    if (f && b < t[0])
      return a[0];
    let v = 0;
    if (y > 1)
      for (; v < t.length - 2 && !(b < t[v + 1]); v++)
        ;
    const w = /* @__PURE__ */ Y1(t[v], t[v + 1], b);
    return m[v](w);
  };
  return s ? (b) => p(jr(t[0], t[u - 1], b)) : p;
}
function Jk(t, a) {
  const s = t[t.length - 1];
  for (let i = 1; i <= a; i++) {
    const o = /* @__PURE__ */ Y1(0, a, i);
    t.push(Al(s, 1, o));
  }
}
function Wk(t) {
  const a = [0];
  return Jk(a, t.length - 1), a;
}
function eD(t, a) {
  return t.map((s) => s * a);
}
function tD(t, a) {
  return t.map(() => a || aS).splice(0, t.length - 1);
}
function ml({ duration: t = 300, keyframes: a, times: s, ease: i = "easeInOut" }) {
  const o = uk(i) ? i.map(ib) : ib(i), u = {
    done: !1,
    value: a[0]
  }, f = eD(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    s && s.length === a.length ? s : Wk(a),
    t
  ), m = Zk(f, a, {
    ease: Array.isArray(o) ? o : tD(a, o)
  });
  return {
    calculatedDuration: t,
    next: (y) => (u.value = m(y), u.done = y >= t, u)
  };
}
const nD = (t) => t !== null;
function Qc(t, { repeat: a, repeatType: s = "loop" }, i, o = 1) {
  const u = t.filter(nD), m = o < 0 || a && s !== "loop" && a % 2 === 1 ? 0 : u.length - 1;
  return !m || i === void 0 ? u[m] : i;
}
const aD = {
  decay: uh,
  inertia: uh,
  tween: ml,
  keyframes: ml,
  spring: Ac
};
function gS(t) {
  typeof t.type == "string" && (t.type = aD[t.type]);
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
const rD = (t) => t / 100;
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
    gS(a);
    const { type: s = ml, repeat: i = 0, repeatDelay: o = 0, repeatType: u, velocity: f = 0 } = a;
    let { keyframes: m } = a;
    const y = s || ml;
    y !== ml && typeof m[0] != "number" && (this.mixKeyframes = Xc(rD, hS(m[0], m[1])), m = [0, 100]);
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
    const T = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1), $ = this.playbackSpeed >= 0 ? T < 0 : T > o;
    this.currentTime = Math.max(T, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let _ = this.currentTime, C = i;
    if (v) {
      const A = Math.min(this.currentTime, o) / m;
      let V = Math.floor(A), D = A % 1;
      !D && A >= 1 && (D = 1), D === 1 && V--, V = Math.min(V, v + 1), !!(V % 2) && (w === "reverse" ? (D = 1 - D, S && (D -= S / m)) : w === "mirror" && (C = f)), _ = jr(0, 1, D) * m;
    }
    let I;
    $ ? (this.delayState.value = b[0], I = this.delayState) : I = C.next(_), u && !$ && (I.value = u(I.value));
    let { done: Y } = I;
    !$ && y !== null && (Y = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const ae = this.holdTime === null && (this.state === "finished" || this.state === "running" && Y);
    return ae && j !== uh && (I.value = Qc(b, this.options, R, this.speed)), N && N(I.value), ae && this.finish(), I;
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
    return pS((i) => this.generator.next(i).value, a, s);
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
    const { driver: a = Vk, startTime: s } = this.options;
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
function sD(t) {
  for (let a = 1; a < t.length; a++)
    t[a] ?? (t[a] = t[a - 1]);
}
const Qr = (t) => t * 180 / Math.PI, dh = (t) => {
  const a = Qr(Math.atan2(t[1], t[0]));
  return fh(a);
}, iD = {
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
}, fh = (t) => (t = t % 360, t < 0 && (t += 360), t), hb = dh, mb = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), pb = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), lD = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: mb,
  scaleY: pb,
  scale: (t) => (mb(t) + pb(t)) / 2,
  rotateX: (t) => fh(Qr(Math.atan2(t[6], t[5]))),
  rotateY: (t) => fh(Qr(Math.atan2(-t[2], t[0]))),
  rotateZ: hb,
  rotate: hb,
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
    i = lD, o = s;
  else {
    const m = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = iD, o = m;
  }
  if (!o)
    return hh(a);
  const u = i[a], f = o[1].split(",").map(cD);
  return typeof u == "function" ? u(f) : f[u];
}
const oD = (t, a) => {
  const { transform: s = "none" } = getComputedStyle(t);
  return mh(s, a);
};
function cD(t) {
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
], ii = new Set(si), gb = (t) => t === ri || t === De, uD = /* @__PURE__ */ new Set(["x", "y", "z"]), dD = si.filter((t) => !uD.has(t));
function fD(t) {
  const a = [];
  return dD.forEach((s) => {
    const i = t.getValue(s);
    i !== void 0 && (a.push([s, i.get()]), i.set(s.startsWith("scale") ? 1 : 0));
  }), a;
}
const Sr = {
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
Sr.translateX = Sr.x;
Sr.translateY = Sr.y;
const Jr = /* @__PURE__ */ new Set();
let ph = !1, gh = !1, vh = !1;
function vS() {
  if (gh) {
    const t = Array.from(Jr).filter((i) => i.needsMeasurement), a = new Set(t.map((i) => i.element)), s = /* @__PURE__ */ new Map();
    a.forEach((i) => {
      const o = fD(i);
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
function yS() {
  Jr.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (gh = !0);
  });
}
function hD() {
  vh = !0, yS(), vS(), vh = !1;
}
class um {
  constructor(a, s, i, o, u, f = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = s, this.name = i, this.motionValue = o, this.element = u, this.isAsync = f;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Jr.add(this), ph || (ph = !0, na.read(yS), na.resolveKeyframes(vS))) : (this.readKeyframes(), this.complete());
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
    sD(a);
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
const mD = (t) => t.startsWith("--");
function bS(t, a, s) {
  mD(a) ? t.style.setProperty(a, s) : t.style[a] = s;
}
const pD = {};
function xS(t, a) {
  const s = /* @__PURE__ */ G1(t);
  return () => pD[a] ?? s();
}
const gD = /* @__PURE__ */ xS(() => window.ScrollTimeline !== void 0, "scrollTimeline"), SS = /* @__PURE__ */ xS(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), ul = ([t, a, s, i]) => `cubic-bezier(${t}, ${a}, ${s}, ${i})`, vb = {
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
function wS(t, a) {
  if (t)
    return typeof t == "function" ? SS() ? mS(t, a) : "ease-out" : rS(t) ? ul(t) : Array.isArray(t) ? t.map((s) => wS(s, a) || vb.easeOut) : vb[t];
}
function vD(t, a, s, { delay: i = 0, duration: o = 300, repeat: u = 0, repeatType: f = "loop", ease: m = "easeOut", times: y } = {}, p = void 0) {
  const b = {
    [a]: s
  };
  y && (b.offset = y);
  const v = wS(m, o);
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
function jS(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function yD({ type: t, ...a }) {
  return jS(t) && SS() ? t.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class ES extends cm {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: s, name: i, keyframes: o, pseudoElement: u, allowFlatten: f = !1, finalKeyframe: m, onComplete: y } = a;
    this.isPseudoElement = !!u, this.allowFlatten = f, this.options = a, Ws(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const p = yD(a);
    this.animation = vD(s, i, o, p, u), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !u) {
        const b = Qc(o, this.options, m, this.speed);
        this.updateMotionValue && this.updateMotionValue(b), bS(s, i, b), this.animation.cancel();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && gD() ? (this.animation.timeline = a, s && (this.animation.rangeStart = s), i && (this.animation.rangeEnd = i), ai) : o(this);
  }
}
const NS = {
  anticipate: tS,
  backInOut: eS,
  circInOut: nS
};
function bD(t) {
  return t in NS;
}
function xD(t) {
  typeof t.ease == "string" && bD(t.ease) && (t.ease = NS[t.ease]);
}
const Bf = 10;
class SD extends ES {
  constructor(a) {
    xD(a), gS(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    }), y = Math.max(Bf, qn.now() - this.startTime), p = jr(0, Bf, y - Bf), b = m.sample(y).value, { name: v } = this.options;
    u && v && bS(u, v, b), s.setWithVelocity(m.sample(Math.max(0, y - p)).value, b, p), m.stop();
  }
}
const yb = (t, a) => a === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(da.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function wD(t) {
  const a = t[0];
  if (t.length === 1)
    return !0;
  for (let s = 0; s < t.length; s++)
    if (t[s] !== a)
      return !0;
}
function jD(t, a, s, i) {
  const o = t[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const u = t[t.length - 1], f = yb(o, a), m = yb(u, a);
  return Rl(f === m, `You are trying to animate ${a} from "${o}" to "${u}". "${f ? u : o}" is not an animatable value.`, "value-not-animatable"), !f || !m ? !1 : wD(t) || (s === "spring" || jS(s)) && i;
}
function yh(t) {
  t.duration = 0, t.type = "keyframes";
}
const CS = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), ED = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function ND(t) {
  for (let a = 0; a < t.length; a++)
    if (typeof t[a] == "string" && ED.test(t[a]))
      return !0;
  return !1;
}
const CD = /* @__PURE__ */ new Set([
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
]), TD = /* @__PURE__ */ G1(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function RD(t) {
  const { motionValue: a, name: s, repeatDelay: i, repeatType: o, damping: u, type: f, keyframes: m } = t;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: p, transformTemplate: b } = a.owner.getProps();
  return TD() && s && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (CS.has(s) || CD.has(s) && ND(m)) && (s !== "transform" || !b) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !p && !i && o !== "mirror" && u !== 0 && f !== "inertia";
}
const _D = 40;
class MD extends cm {
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
    jD(a, u, f, m) || (v = !1, (Er.instantAnimations || !y) && b?.(Qc(a, i, s)), a[0] = a[a.length - 1], yh(i), i.repeat = 0);
    const S = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > _D ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: s,
      ...i,
      keyframes: a
    }, j = v && !p && RD(S), N = S.motionValue?.owner?.current;
    let R;
    if (j)
      try {
        R = new SD({
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
    return this._animation || (this.keyframeResolver?.resume(), hD()), this._animation;
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
function TS(t, a, s, i = 0, o = 1) {
  const u = Array.from(t).sort((p, b) => p.sortNodePosition(b)).indexOf(a), f = t.size, m = (f - 1) * i;
  return typeof s == "function" ? s(u, f) : o === 1 ? u * i : m - u * i;
}
const AD = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function kD(t) {
  const a = AD.exec(t);
  if (!a)
    return [,];
  const [, s, i, o] = a;
  return [`--${s ?? i}`, o];
}
const DD = 4;
function RS(t, a, s = 1) {
  Ws(s <= DD, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [i, o] = kD(t);
  if (!i)
    return;
  const u = window.getComputedStyle(a).getPropertyValue(i);
  if (u) {
    const f = u.trim();
    return F1(f) ? parseFloat(f) : f;
  }
  return rm(o) ? RS(o, a, s + 1) : o;
}
const zD = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, OD = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), LD = {
  type: "keyframes",
  duration: 0.8
}, $D = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, UD = (t, { keyframes: a }) => a.length > 2 ? LD : ii.has(t) ? t.startsWith("scale") ? OD(a[1]) : zD : $D;
function _S(t, a) {
  if (t?.inherit && a) {
    const { inherit: s, ...i } = t;
    return { ...a, ...i };
  }
  return t;
}
function MS(t, a) {
  const s = t?.[a] ?? t?.default ?? t;
  return s !== t ? _S(s, t) : s;
}
const BD = /* @__PURE__ */ new Set([
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
function ID(t) {
  for (const a in t)
    if (!BD.has(a))
      return !0;
  return !1;
}
const VD = (t, a, s, i = {}, o, u) => (f) => {
  const m = MS(i, t) || {}, y = m.delay || i.delay || 0;
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
  ID(m) || Object.assign(b, UD(t, b)), b.duration && (b.duration = /* @__PURE__ */ ta(b.duration)), b.repeatDelay && (b.repeatDelay = /* @__PURE__ */ ta(b.repeatDelay)), b.from !== void 0 && (b.keyframes[0] = b.from);
  let v = !1;
  if ((b.type === !1 || b.duration === 0 && !b.repeatDelay) && (yh(b), b.delay === 0 && (v = !0)), (Er.instantAnimations || Er.skipAnimations || o?.shouldSkipAnimations) && (v = !0, yh(b), b.delay = 0), b.allowFlatten = !m.type && !m.ease, v && !u && a.get() !== void 0) {
    const w = Qc(b.keyframes, m);
    if (w !== void 0) {
      na.update(() => {
        b.onUpdate(w), b.onComplete();
      });
      return;
    }
  }
  return m.isSync ? new kc(b) : new MD(b);
};
function bb(t) {
  const a = [{}, {}];
  return t?.values.forEach((s, i) => {
    a[0][i] = s.get(), a[1][i] = s.getVelocity();
  }), a;
}
function dm(t, a, s, i) {
  if (typeof a == "function") {
    const [o, u] = bb(i);
    a = a(s !== void 0 ? s : t.custom, o, u);
  }
  if (typeof a == "string" && (a = t.variants && t.variants[a]), typeof a == "function") {
    const [o, u] = bb(i);
    a = a(s !== void 0 ? s : t.custom, o, u);
  }
  return a;
}
function Wr(t, a, s) {
  const i = t.getProps();
  return dm(i, a, s !== void 0 ? s : i.custom, t);
}
const AS = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...si
]), xb = 30, qD = (t) => !isNaN(parseFloat(t));
class HD {
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
    this.current = a, this.updatedAt = qn.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = qD(this.current));
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
    this.events[a] || (this.events[a] = new K1());
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
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > xb)
      return 0;
    const s = Math.min(this.updatedAt - this.prevUpdatedAt, xb);
    return X1(parseFloat(this.current) - parseFloat(this.prevFrameValue), s);
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
  return new HD(t, a);
}
const bh = (t) => Array.isArray(t);
function FD(t, a, s) {
  t.hasValue(a) ? t.getValue(a).set(s) : t.addValue(a, Dc(s));
}
function PD(t) {
  return bh(t) ? t[t.length - 1] || 0 : t;
}
function GD(t, a) {
  const s = Wr(t, a);
  let { transitionEnd: i = {}, transition: o = {}, ...u } = s || {};
  u = { ...u, ...i };
  for (const f in u) {
    const m = PD(u[f]);
    FD(t, f, m);
  }
}
const xn = (t) => !!(t && t.getVelocity);
function YD(t) {
  return !!(xn(t) && t.add);
}
function KD(t, a) {
  const s = t.getValue("willChange");
  if (YD(s))
    return s.add(a);
  if (!s && Er.WillChange) {
    const i = new Er.WillChange("auto");
    t.addValue("willChange", i), i.add(a);
  }
}
function fm(t) {
  return t.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const XD = "framerAppearId", kS = "data-" + fm(XD);
function QD(t) {
  return t.props[kS];
}
function ZD({ protectedKeys: t, needsAnimating: a }, s) {
  const i = t.hasOwnProperty(s) && a[s] !== !0;
  return a[s] = !1, i;
}
function DS(t, a, { delay: s = 0, transitionOverride: i, type: o } = {}) {
  let { transition: u, transitionEnd: f, ...m } = a;
  const y = t.getDefaultTransition();
  u = u ? _S(u, y) : y;
  const p = u?.reduceMotion;
  i && (u = i);
  const b = [], v = o && t.animationState && t.animationState.getState()[o];
  for (const w in m) {
    const S = t.getValue(w, t.latestValues[w] ?? null), j = m[w];
    if (j === void 0 || v && ZD(v, w))
      continue;
    const N = {
      delay: s,
      ...MS(u || {}, w)
    }, R = S.get();
    if (R !== void 0 && !S.isAnimating() && !Array.isArray(j) && j === R && !N.velocity) {
      na.update(() => S.set(j));
      continue;
    }
    let T = !1;
    if (window.MotionHandoffAnimation) {
      const C = QD(t);
      if (C) {
        const I = window.MotionHandoffAnimation(C, w, na);
        I !== null && (N.startTime = I, T = !0);
      }
    }
    KD(t, w);
    const $ = p ?? t.shouldReduceMotion;
    S.start(VD(w, S, j, $ && AS.has(w) ? { type: !1 } : N, t, T));
    const _ = S.animation;
    _ && b.push(_);
  }
  if (f) {
    const w = () => na.update(() => {
      f && GD(t, f);
    });
    b.length ? Promise.all(b).then(w) : w();
  }
  return b;
}
function xh(t, a, s = {}) {
  const i = Wr(t, a, s.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: o = t.getDefaultTransition() || {} } = i || {};
  s.transitionOverride && (o = s.transitionOverride);
  const u = i ? () => Promise.all(DS(t, i, s)) : () => Promise.resolve(), f = t.variantChildren && t.variantChildren.size ? (y = 0) => {
    const { delayChildren: p = 0, staggerChildren: b, staggerDirection: v } = o;
    return JD(t, a, y, p, b, v, s);
  } : () => Promise.resolve(), { when: m } = o;
  if (m) {
    const [y, p] = m === "beforeChildren" ? [u, f] : [f, u];
    return y().then(() => p());
  } else
    return Promise.all([u(), f(s.delay)]);
}
function JD(t, a, s = 0, i = 0, o = 0, u = 1, f) {
  const m = [];
  for (const y of t.variantChildren)
    y.notify("AnimationStart", a), m.push(xh(y, a, {
      ...f,
      delay: s + (typeof i == "function" ? 0 : i) + TS(t.variantChildren, y, i, o, u)
    }).then(() => y.notify("AnimationComplete", a)));
  return Promise.all(m);
}
function WD(t, a, s = {}) {
  t.notify("AnimationStart", a);
  let i;
  if (Array.isArray(a)) {
    const o = a.map((u) => xh(t, u, s));
    i = Promise.all(o);
  } else if (typeof a == "string")
    i = xh(t, a, s);
  else {
    const o = typeof a == "function" ? Wr(t, a, s.custom) : a;
    i = Promise.all(DS(t, o, s));
  }
  return i.then(() => {
    t.notify("AnimationComplete", a);
  });
}
const ez = {
  test: (t) => t === "auto",
  parse: (t) => t
}, zS = (t) => (a) => a.test(t), OS = [ri, De, Xs, vr, wk, Sk, ez], Sb = (t) => OS.find(zS(t));
function tz(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || P1(t) : !0;
}
const nz = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function az(t) {
  const [a, s] = t.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return t;
  const [i] = s.match(sm) || [];
  if (!i)
    return t;
  const o = s.replace(i, "");
  let u = nz.has(a) ? 1 : 0;
  return i !== s && (u *= 100), a + "(" + u + o + ")";
}
const rz = /\b([a-z-]*)\(.*?\)/gu, Sh = {
  ...da,
  getAnimatableNone: (t) => {
    const a = t.match(rz);
    return a ? a.map(az).join(" ") : t;
  }
}, wh = {
  ...da,
  getAnimatableNone: (t) => {
    const a = da.parse(t);
    return da.createTransformer(t)(a.map((i) => typeof i == "number" ? 0 : typeof i == "object" ? { ...i, alpha: 1 } : i));
  }
}, wb = {
  ...ri,
  transform: Math.round
}, sz = {
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
  originX: ob,
  originY: ob,
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
  ...sz,
  zIndex: wb,
  // SVG
  fillOpacity: Sl,
  strokeOpacity: Sl,
  numOctaves: wb
}, iz = {
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
}, LS = (t) => iz[t], lz = /* @__PURE__ */ new Set([Sh, wh]);
function $S(t, a) {
  let s = LS(t);
  return lz.has(s) || (s = da), s.getAnimatableNone ? s.getAnimatableNone(a) : void 0;
}
const oz = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function cz(t, a, s) {
  let i = 0, o;
  for (; i < t.length && !o; ) {
    const u = t[i];
    typeof u == "string" && !oz.has(u) && ei(u).values.length && (o = t[i]), i++;
  }
  if (o && s)
    for (const u of a)
      t[u] = $S(s, o);
}
class uz extends um {
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
        const w = RS(v, s.current);
        w !== void 0 && (a[b] = w), b === a.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !AS.has(i) || a.length !== 2)
      return;
    const [o, u] = a, f = Sb(o), m = Sb(u), y = lb(o), p = lb(u);
    if (y !== p && Sr[i]) {
      this.needsMeasurement = !0;
      return;
    }
    if (f !== m)
      if (gb(f) && gb(m))
        for (let b = 0; b < a.length; b++) {
          const v = a[b];
          typeof v == "string" && (a[b] = parseFloat(v));
        }
      else Sr[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: s } = this, i = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || tz(a[o])) && i.push(o);
    i.length && cz(a, i, s);
  }
  measureInitialState() {
    const { element: a, unresolvedKeyframes: s, name: i } = this;
    if (!a || !a.current)
      return;
    i === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Sr[i](a.measureViewportBox(), window.getComputedStyle(a.current)), s[0] = this.measuredOrigin;
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
    i[u] = Sr[s](a.measureViewportBox(), window.getComputedStyle(a.current)), f !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = f), this.removedTransforms?.length && this.removedTransforms.forEach(([m, y]) => {
      a.getValue(m).set(y);
    }), this.resolveNoneKeyframes();
  }
}
function dz(t, a, s) {
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
const US = (t, a) => a && typeof t == "number" ? a.transform(t) : t;
function Sc(t) {
  return nk(t) && "offsetHeight" in t && !("ownerSVGElement" in t);
}
const { schedule: fz } = /* @__PURE__ */ sS(queueMicrotask, !1), hz = {
  y: !1
};
function mz() {
  return hz.y;
}
function BS(t, a) {
  const s = dz(t), i = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: i.signal
  };
  return [s, o, () => i.abort()];
}
function pz(t) {
  return !(t.pointerType === "touch" || mz());
}
function gz(t, a, s = {}) {
  const [i, o, u] = BS(t, s);
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
      if (!pz(R))
        return;
      y = !1;
      const T = a(f, R);
      typeof T == "function" && (p = T, f.addEventListener("pointerleave", j, o));
    };
    f.addEventListener("pointerenter", N, o), f.addEventListener("pointerdown", S, o);
  }), u;
}
const IS = (t, a) => a ? t === a ? !0 : IS(t, a.parentElement) : !1, vz = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, yz = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function bz(t) {
  return yz.has(t.tagName) || t.isContentEditable === !0;
}
const wc = /* @__PURE__ */ new WeakSet();
function jb(t) {
  return (a) => {
    a.key === "Enter" && t(a);
  };
}
function If(t, a) {
  t.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const xz = (t, a) => {
  const s = t.currentTarget;
  if (!s)
    return;
  const i = jb(() => {
    if (wc.has(s))
      return;
    If(s, "down");
    const o = jb(() => {
      If(s, "up");
    }), u = () => If(s, "cancel");
    s.addEventListener("keyup", o, a), s.addEventListener("blur", u, a);
  });
  s.addEventListener("keydown", i, a), s.addEventListener("blur", () => s.removeEventListener("keydown", i), a);
};
function Eb(t) {
  return vz(t) && !0;
}
const Nb = /* @__PURE__ */ new WeakSet();
function Sz(t, a, s = {}) {
  const [i, o, u] = BS(t, s), f = (m) => {
    const y = m.currentTarget;
    if (!Eb(m) || Nb.has(m))
      return;
    wc.add(y), s.stopPropagation && Nb.add(m);
    const p = a(y, m), b = (S, j) => {
      window.removeEventListener("pointerup", v), window.removeEventListener("pointercancel", w), wc.has(y) && wc.delete(y), Eb(S) && typeof p == "function" && p(S, { success: j });
    }, v = (S) => {
      b(S, y === window || y === document || s.useGlobalTarget || IS(y, S.target));
    }, w = (S) => {
      b(S, !1);
    };
    window.addEventListener("pointerup", v, o), window.addEventListener("pointercancel", w, o);
  };
  return i.forEach((m) => {
    (s.useGlobalTarget ? window : m).addEventListener("pointerdown", f, o), Sc(m) && (m.addEventListener("focus", (p) => xz(p, o)), !bz(m) && !m.hasAttribute("tabindex") && (m.tabIndex = 0));
  }), u;
}
const wz = [...OS, an, da], jz = (t) => wz.find(zS(t)), Cb = () => ({ min: 0, max: 0 }), VS = () => ({
  x: Cb(),
  y: Cb()
}), Ez = /* @__PURE__ */ new WeakMap();
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
function qS(t) {
  return !!(Jc(t) || t.variants);
}
function Nz(t, a, s) {
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
const zc = { current: null }, gm = { current: !1 }, Cz = typeof window < "u";
function HS() {
  if (gm.current = !0, !!Cz)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), a = () => zc.current = t.matches;
      t.addEventListener("change", a), a();
    } else
      zc.current = !1;
}
const Tb = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let Oc = {};
function FS(t) {
  Oc = t;
}
function Tz() {
  return Oc;
}
class Rz {
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
    this.latestValues = p, this.baseTarget = { ...p }, this.initialValues = s.initial ? { ...p } : {}, this.renderState = b, this.parent = a, this.props = s, this.presenceContext = i, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = u, this.options = y, this.blockInitialAnimation = !!f, this.isControllingVariants = Jc(s), this.isVariantNode = qS(s), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
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
    this.current = a, Ez.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((s, i) => this.bindToMotionValue(i, s)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (gm.current || HS(), this.shouldReduceMotion = zc.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
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
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), s.accelerate && CS.has(a) && this.current instanceof HTMLElement) {
      const { factory: f, keyframes: m, times: y, ease: p, duration: b } = s.accelerate, v = new ES({
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : VS();
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
    for (let i = 0; i < Tb.length; i++) {
      const o = Tb[i];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const u = "on" + o, f = a[u];
      f && (this.propEventSubscriptions[o] = this.on(o, f));
    }
    this.prevMotionValues = Nz(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return i != null && (typeof i == "string" && (F1(i) || P1(i)) ? i = parseFloat(i) : !jz(i) && da.test(s) && (i = $S(a, s)), this.setBaseTarget(a, xn(i) ? i.get() : i)), xn(i) ? i.get() : i;
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
    return this.events[a] || (this.events[a] = new K1()), this.events[a].add(s);
  }
  notify(a, ...s) {
    this.events[a] && this.events[a].notify(...s);
  }
  scheduleRenderMicrotask() {
    fz.render(this.render);
  }
}
class PS extends Rz {
  constructor() {
    super(...arguments), this.KeyframeResolver = uz;
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
function _z({ top: t, left: a, right: s, bottom: i }) {
  return {
    x: { min: a, max: s },
    y: { min: t, max: i }
  };
}
function Mz(t, a) {
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
function Az(t, a) {
  return _z(Mz(t.getBoundingClientRect(), a));
}
const kz = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Dz = si.length;
function zz(t, a, s) {
  let i = "", o = !0;
  for (let u = 0; u < Dz; u++) {
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
      const p = US(m, hm[f]);
      if (!y) {
        o = !1;
        const b = kz[f] || f;
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
    } else if (lS(y)) {
      o[y] = p;
      continue;
    } else {
      const b = US(p, hm[y]);
      y.startsWith("origin") ? (m = !0, u[y] = b) : i[y] = b;
    }
  }
  if (a.transform || (f || s ? i.transform = zz(a, t.transform, s) : i.transform && (i.transform = "none")), m) {
    const { originX: y = "50%", originY: p = "50%", originZ: b = 0 } = u;
    i.transformOrigin = `${y} ${p} ${b}`;
  }
}
function GS(t, { style: a, vars: s }, i, o) {
  const u = t.style;
  let f;
  for (f in a)
    u[f] = a[f];
  o?.applyProjectionStyles(u, i);
  for (f in s)
    u.setProperty(f, s[f]);
}
function Rb(t, a) {
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
    const s = Rb(t, a.target.x), i = Rb(t, a.target.y);
    return `${s}% ${i}%`;
  }
}, Oz = {
  correct: (t, { treeScale: a, projectionDelta: s }) => {
    const i = t, o = da.parse(t);
    if (o.length > 5)
      return i;
    const u = da.createTransformer(t), f = typeof o[0] != "number" ? 1 : 0, m = s.x.scale * a.x, y = s.y.scale * a.y;
    o[0 + f] /= m, o[1 + f] /= y;
    const p = Al(m, y, 0.5);
    return typeof o[2 + f] == "number" && (o[2 + f] /= p), typeof o[3 + f] == "number" && (o[3 + f] /= p), u(o);
  }
}, Lz = {
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
  boxShadow: Oz
};
function YS(t, { layout: a, layoutId: s }) {
  return ii.has(t) || t.startsWith("origin") || (a || s !== void 0) && (!!Lz[t] || t === "opacity");
}
function ym(t, a, s) {
  const i = t.style, o = a?.style, u = {};
  if (!i)
    return u;
  for (const f in i)
    (xn(i[f]) || o && xn(o[f]) || YS(f, t) || s?.getValue(f)?.liveStyle !== void 0) && (u[f] = i[f]);
  return u;
}
function $z(t) {
  return window.getComputedStyle(t);
}
class Uz extends PS {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = GS;
  }
  readValueFromInstance(a, s) {
    if (ii.has(s))
      return this.projection?.isProjecting ? hh(s) : oD(a, s);
    {
      const i = $z(a), o = (lS(s) ? i.getPropertyValue(s) : i[s]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: s }) {
    return Az(a, s);
  }
  build(a, s, i) {
    vm(a, s, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, s, i) {
    return ym(a, s, i);
  }
}
const Bz = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Iz = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Vz(t, a, s = 1, i = 0, o = !0) {
  t.pathLength = 1;
  const u = o ? Bz : Iz;
  t[u.offset] = `${-i}`, t[u.array] = `${a} ${s}`;
}
const qz = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function KS(t, {
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
  for (const S of qz)
    v[S] !== void 0 && (w[S] = v[S], delete v[S]);
  a !== void 0 && (v.x = a), s !== void 0 && (v.y = s), i !== void 0 && (v.scale = i), o !== void 0 && Vz(v, o, u, f, !1);
}
const XS = /* @__PURE__ */ new Set([
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
]), QS = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function Hz(t, a, s, i) {
  GS(t, a, void 0, i);
  for (const o in a.attrs)
    t.setAttribute(XS.has(o) ? o : fm(o), a.attrs[o]);
}
function ZS(t, a, s) {
  const i = ym(t, a, s);
  for (const o in t)
    if (xn(t[o]) || xn(a[o])) {
      const u = si.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      i[u] = t[o];
    }
  return i;
}
class Fz extends PS {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = VS;
  }
  getBaseTargetFromProps(a, s) {
    return a[s];
  }
  readValueFromInstance(a, s) {
    if (ii.has(s)) {
      const i = LS(s);
      return i && i.default || 0;
    }
    return s = XS.has(s) ? s : fm(s), a.getAttribute(s);
  }
  scrapeMotionValuesFromProps(a, s, i) {
    return ZS(a, s, i);
  }
  build(a, s, i) {
    KS(a, s, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(a, s, i, o) {
    Hz(a, s, i, o);
  }
  mount(a) {
    this.isSVGTag = QS(a.tagName), super.mount(a);
  }
}
const Pz = pm.length;
function JS(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const s = t.parent ? JS(t.parent) || {} : {};
    return t.props.initial !== void 0 && (s.initial = t.props.initial), s;
  }
  const a = {};
  for (let s = 0; s < Pz; s++) {
    const i = pm[s], o = t.props[i];
    (wl(o) || o === !1) && (a[i] = o);
  }
  return a;
}
function WS(t, a) {
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
const Gz = [...mm].reverse(), Yz = mm.length;
function Kz(t) {
  return (a) => Promise.all(a.map(({ animation: s, options: i }) => WD(t, s, i)));
}
function Xz(t) {
  let a = Kz(t), s = _b(), i = !0, o = !1;
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
    const { props: b } = t, v = JS(t.parent) || {}, w = [], S = /* @__PURE__ */ new Set();
    let j = {}, N = 1 / 0;
    for (let T = 0; T < Yz; T++) {
      const $ = Gz[T], _ = s[$], C = b[$] !== void 0 ? b[$] : v[$], I = wl(C), Y = $ === p ? _.isActive : null;
      Y === !1 && (N = T);
      let ae = C === v[$] && C !== b[$] && I;
      if (ae && (i || o) && t.manuallyAnimateOnMount && (ae = !1), _.protectedKeys = { ...j }, // If it isn't active and hasn't *just* been set as inactive
      !_.isActive && Y === null || // If we didn't and don't have any defined prop for this animation type
      !C && !_.prevProp || // Or if the prop doesn't define an animation
      Zc(C) || typeof C == "boolean")
        continue;
      if ($ === "exit" && _.isActive && Y !== !0) {
        _.prevResolvedValues && (j = {
          ...j,
          ..._.prevResolvedValues
        });
        continue;
      }
      const A = Qz(_.prevProp, C);
      let V = A || // If we're making this variant active, we want to always make it active
      $ === p && _.isActive && !ae && I || // If we removed a higher-priority variant (i is in reverse order)
      T > N && I, D = !1;
      const P = Array.isArray(C) ? C : [C];
      let J = P.reduce(u($), {});
      Y === !1 && (J = {});
      const { prevResolvedValues: Q = {} } = _, G = {
        ...Q,
        ...J
      }, ie = (U) => {
        V = !0, S.has(U) && (D = !0, S.delete(U)), _.needsAnimating[U] = !0;
        const se = t.getValue(U);
        se && (se.liveStyle = !1);
      };
      for (const U in G) {
        const se = J[U], de = Q[U];
        if (j.hasOwnProperty(U))
          continue;
        let k = !1;
        bh(se) && bh(de) ? k = !WS(se, de) : k = se !== de, k ? se != null ? ie(U) : S.add(U) : se !== void 0 && S.has(U) ? ie(U) : _.protectedKeys[U] = !0;
      }
      _.prevProp = C, _.prevResolvedValues = J, _.isActive && (j = { ...j, ...J }), (i || o) && t.blockInitialAnimation && (V = !1);
      const M = ae && A;
      V && (!M || D) && w.push(...P.map((U) => {
        const se = { type: $ };
        if (typeof U == "string" && (i || o) && !M && t.manuallyAnimateOnMount && t.parent) {
          const { parent: de } = t, k = Wr(de, U);
          if (de.enteringChildren && k) {
            const { delayChildren: ee } = k.transition || {};
            se.delay = TS(de.enteringChildren, t, ee);
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
        const $ = Wr(t, Array.isArray(b.initial) ? b.initial[0] : b.initial);
        $ && $.transition && (T.transition = $.transition);
      }
      S.forEach(($) => {
        const _ = t.getBaseTarget($), C = t.getValue($);
        C && (C.liveStyle = !0), T[$] = _ ?? null;
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
      s = _b(), o = !0;
    }
  };
}
function Qz(t, a) {
  return typeof a == "string" ? a !== t : Array.isArray(a) ? !WS(a, t) : !1;
}
function Pr(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function _b() {
  return {
    animate: Pr(!0),
    whileInView: Pr(),
    whileHover: Pr(),
    whileTap: Pr(),
    whileDrag: Pr(),
    whileFocus: Pr(),
    exit: Pr()
  };
}
function Mb(t, a, s, i = { passive: !0 }) {
  return t.addEventListener(a, s, i), () => t.removeEventListener(a, s);
}
function Zz(t) {
  return xn(t) ? t.get() : t;
}
const bm = g.createContext({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function Ab(t, a) {
  if (typeof t == "function")
    return t(a);
  t != null && (t.current = a);
}
function Jz(...t) {
  return (a) => {
    let s = !1;
    const i = t.map((o) => {
      const u = Ab(o, a);
      return !s && typeof u == "function" && (s = !0), u;
    });
    if (s)
      return () => {
        for (let o = 0; o < i.length; o++) {
          const u = i[o];
          typeof u == "function" ? u() : Ab(t[o], null);
        }
      };
  };
}
function Wz(...t) {
  return g.useCallback(Jz(...t), t);
}
class e4 extends g.Component {
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
function t4({ children: t, isPresent: a, anchorX: s, anchorY: i, root: o, pop: u }) {
  const f = g.useId(), m = g.useRef(null), y = g.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: p } = g.useContext(bm), b = t.props?.ref ?? t?.ref, v = Wz(m, b);
  return g.useInsertionEffect(() => {
    const { width: w, height: S, top: j, left: N, right: R, bottom: T } = y.current;
    if (a || u === !1 || !m.current || !w || !S)
      return;
    const $ = s === "left" ? `left: ${N}` : `right: ${R}`, _ = i === "bottom" ? `bottom: ${T}` : `top: ${j}`;
    m.current.dataset.motionPopId = f;
    const C = document.createElement("style");
    p && (C.nonce = p);
    const I = o ?? document.head;
    return I.appendChild(C), C.sheet && C.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${w}px !important;
            height: ${S}px !important;
            ${$}px !important;
            ${_}px !important;
          }
        `), () => {
      m.current?.removeAttribute("data-motion-pop-id"), I.contains(C) && I.removeChild(C);
    };
  }, [a]), c.jsx(e4, { isPresent: a, childRef: m, sizeRef: y, pop: u, children: u === !1 ? t : g.cloneElement(t, { ref: v }) });
}
const n4 = ({ children: t, initial: a, isPresent: s, onExitComplete: i, custom: o, presenceAffectsLayout: u, mode: f, anchorX: m, anchorY: y, root: p }) => {
  const b = tm(a4), v = g.useId();
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
  }, [s]), t = c.jsx(t4, { pop: f === "popLayout", isPresent: s, anchorX: m, anchorY: y, root: p, children: t }), c.jsx(Kc.Provider, { value: S, children: t });
};
function a4() {
  return /* @__PURE__ */ new Map();
}
function r4(t = !0) {
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
function kb(t) {
  const a = [];
  return g.Children.forEach(t, (s) => {
    g.isValidElement(s) && a.push(s);
  }), a;
}
const ew = ({ children: t, custom: a, initial: s = !0, onExitComplete: i, presenceAffectsLayout: o = !0, mode: u = "sync", propagate: f = !1, anchorX: m = "left", anchorY: y = "top", root: p }) => {
  const [b, v] = r4(f), w = g.useMemo(() => kb(t), [t]), S = f && !b ? [] : w.map(rc), j = g.useRef(!0), N = g.useRef(w), R = tm(() => /* @__PURE__ */ new Map()), T = g.useRef(/* @__PURE__ */ new Set()), [$, _] = g.useState(w), [C, I] = g.useState(w);
  H1(() => {
    j.current = !1, N.current = w;
    for (let A = 0; A < C.length; A++) {
      const V = rc(C[A]);
      S.includes(V) ? (R.delete(V), T.current.delete(V)) : R.get(V) !== !0 && R.set(V, !1);
    }
  }, [C, S.length, S.join("-")]);
  const Y = [];
  if (w !== $) {
    let A = [...w];
    for (let V = 0; V < C.length; V++) {
      const D = C[V], P = rc(D);
      S.includes(P) || (A.splice(V, 0, D), Y.push(D));
    }
    return u === "wait" && Y.length && (A = Y), I(kb(A)), _(w), null;
  }
  const { forceRender: ae } = g.useContext(q1);
  return c.jsx(c.Fragment, { children: C.map((A) => {
    const V = rc(A), D = f && !b ? !1 : w === C || S.includes(V), P = () => {
      if (T.current.has(V))
        return;
      if (R.has(V))
        T.current.add(V), R.set(V, !0);
      else
        return;
      let J = !0;
      R.forEach((Q) => {
        Q || (J = !1);
      }), J && (ae?.(), I(N.current), f && v?.(), i && i());
    };
    return c.jsx(n4, { isPresent: D, initial: !j.current || s ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: u, root: p, onExitComplete: D ? void 0 : P, anchorX: m, anchorY: y, children: A }, V);
  }) });
}, xm = g.createContext({ strict: !1 }), Db = {
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
let zb = !1;
function s4() {
  if (zb)
    return;
  const t = {};
  for (const a in Db)
    t[a] = {
      isEnabled: (s) => Db[a].some((i) => !!s[i])
    };
  FS(t), zb = !0;
}
function tw() {
  return s4(), Tz();
}
function jh(t) {
  const a = tw();
  for (const s in t)
    a[s] = {
      ...a[s],
      ...t[s]
    };
  FS(a);
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
const i4 = /* @__PURE__ */ new Set([
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
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || i4.has(t);
}
let nw = (t) => !Lc(t);
function l4(t) {
  typeof t == "function" && (nw = (a) => a.startsWith("on") ? !Lc(a) : t(a));
}
try {
  l4(require("@emotion/is-prop-valid").default);
} catch {
}
function o4(t, a, s) {
  const i = {};
  for (const o in t)
    o === "values" && typeof t.values == "object" || xn(t[o]) || (nw(o) || s === !0 && Lc(o) || !a && !Lc(o) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && o.startsWith("onDrag")) && (i[o] = t[o]);
  return i;
}
const Wc = /* @__PURE__ */ g.createContext({});
function c4(t, a) {
  if (Jc(t)) {
    const { initial: s, animate: i } = t;
    return {
      initial: s === !1 || wl(s) ? s : void 0,
      animate: wl(i) ? i : void 0
    };
  }
  return t.inherit !== !1 ? a : {};
}
function u4(t) {
  const { initial: a, animate: s } = c4(t, g.useContext(Wc));
  return g.useMemo(() => ({ initial: a, animate: s }), [Ob(a), Ob(s)]);
}
function Ob(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const wm = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function aw(t, a, s) {
  for (const i in a)
    !xn(a[i]) && !YS(i, s) && (t[i] = a[i]);
}
function d4({ transformTemplate: t }, a) {
  return g.useMemo(() => {
    const s = wm();
    return vm(s, a, t), Object.assign({}, s.vars, s.style);
  }, [a]);
}
function f4(t, a) {
  const s = t.style || {}, i = {};
  return aw(i, s, t), Object.assign(i, d4(t, a)), i;
}
function h4(t, a) {
  const s = {}, i = f4(t, a);
  return t.drag && t.dragListener !== !1 && (s.draggable = !1, i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none", i.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (s.tabIndex = 0), s.style = i, s;
}
const rw = () => ({
  ...wm(),
  attrs: {}
});
function m4(t, a, s, i) {
  const o = g.useMemo(() => {
    const u = rw();
    return KS(u, a, QS(i), t.transformTemplate, t.style), {
      ...u.attrs,
      style: { ...u.style }
    };
  }, [a]);
  if (t.style) {
    const u = {};
    aw(u, t.style, t), o.style = { ...u, ...o.style };
  }
  return o;
}
const p4 = [
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
      !!(p4.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function g4(t, a, s, { latestValues: i }, o, u = !1, f) {
  const y = (f ?? jm(t) ? m4 : h4)(a, i, o, t), p = o4(a, typeof t == "string", u), b = t !== g.Fragment ? { ...p, ...y, ref: s } : {}, { children: v } = a, w = g.useMemo(() => xn(v) ? v.get() : v, [v]);
  return g.createElement(t, {
    ...b,
    children: w
  });
}
function v4({ scrapeMotionValuesFromProps: t, createRenderState: a }, s, i, o) {
  return {
    latestValues: y4(s, i, o, t),
    renderState: a()
  };
}
function y4(t, a, s, i) {
  const o = {}, u = i(t, {});
  for (const w in u)
    o[w] = Zz(u[w]);
  let { initial: f, animate: m } = t;
  const y = Jc(t), p = qS(t);
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
        for (const $ in T) {
          let _ = T[$];
          if (Array.isArray(_)) {
            const C = b ? _.length - 1 : 0;
            _ = _[C];
          }
          _ !== null && (o[$] = _);
        }
        for (const $ in N)
          o[$] = N[$];
      }
    }
  }
  return o;
}
const sw = (t) => (a, s) => {
  const i = g.useContext(Wc), o = g.useContext(Kc), u = () => v4(t, a, i, o);
  return s ? u() : tm(u);
}, b4 = /* @__PURE__ */ sw({
  scrapeMotionValuesFromProps: ym,
  createRenderState: wm
}), x4 = /* @__PURE__ */ sw({
  scrapeMotionValuesFromProps: ZS,
  createRenderState: rw
}), S4 = Symbol.for("motionComponentSymbol");
function w4(t, a, s) {
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
const j4 = g.createContext({});
function E4(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function N4(t, a, s, i, o, u) {
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
  const j = w.current, N = g.useContext(j4);
  j && !j.projection && o && (j.type === "html" || j.type === "svg") && C4(w.current, s, o, N);
  const R = g.useRef(!1);
  g.useInsertionEffect(() => {
    j && R.current && j.update(s, y);
  });
  const T = s[kS], $ = g.useRef(!!T && typeof window < "u" && !window.MotionHandoffIsComplete?.(T) && window.MotionHasOptimisedAnimation?.(T));
  return H1(() => {
    S.current = !0, j && (R.current = !0, window.MotionIsMounted = !0, j.updateFeatures(), j.scheduleRenderMicrotask(), $.current && j.animationState && j.animationState.animateChanges());
  }), g.useEffect(() => {
    j && (!$.current && j.animationState && j.animationState.animateChanges(), $.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(T);
    }), $.current = !1), j.enteringChildren = void 0);
  }), j;
}
function C4(t, a, s, i) {
  const { layoutId: o, layout: u, drag: f, dragConstraints: m, layoutScroll: y, layoutRoot: p, layoutAnchor: b, layoutCrossfade: v } = a;
  t.projection = new s(t.latestValues, a["data-framer-portal-id"] ? void 0 : iw(t.parent)), t.projection.setOptions({
    layoutId: o,
    layout: u,
    alwaysMeasureLayout: !!f || m && E4(m),
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
function iw(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : iw(t.parent);
}
function qf(t, { forwardMotionProps: a = !1, type: s } = {}, i, o) {
  i && jh(i);
  const u = s ? s === "svg" : jm(t), f = u ? x4 : b4;
  function m(p, b) {
    let v;
    const w = {
      ...g.useContext(bm),
      ...p,
      layoutId: T4(p)
    }, { isStatic: S } = w, j = u4(p), N = f(p, S);
    if (!S && typeof window < "u") {
      R4();
      const R = _4(w);
      v = R.MeasureLayout, j.visualElement = N4(t, N, w, o, R.ProjectionNode, u);
    }
    return c.jsxs(Wc.Provider, { value: j, children: [v && j.visualElement ? c.jsx(v, { visualElement: j.visualElement, ...w }) : null, g4(t, p, w4(N, j.visualElement, b), N, S, a, u)] });
  }
  m.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const y = g.forwardRef(m);
  return y[S4] = t, y;
}
function T4({ layoutId: t }) {
  const a = g.useContext(q1).id;
  return a && t !== void 0 ? a + "-" + t : t;
}
function R4(t, a) {
  g.useContext(xm).strict;
}
function _4(t) {
  const a = tw(), { drag: s, layout: i } = a;
  if (!s && !i)
    return {};
  const o = { ...s, ...i };
  return {
    MeasureLayout: s?.isEnabled(t) || i?.isEnabled(t) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function M4(t, a) {
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
const Em = /* @__PURE__ */ M4(), A4 = (t, a) => a.isSVG ?? jm(t) ? new Fz(a) : new Uz(a, {
  allowProjection: t !== g.Fragment
});
class k4 extends li {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = Xz(a));
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
let D4 = 0;
class z4 extends li {
  constructor() {
    super(...arguments), this.id = D4++, this.isExitComplete = !1;
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
const O4 = {
  animation: {
    Feature: k4
  },
  exit: {
    Feature: z4
  }
};
function lw(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
function Lb(t, a, s) {
  const { props: i } = t;
  t.animationState && i.whileHover && t.animationState.setActive("whileHover", s === "Start");
  const o = "onHover" + s, u = i[o];
  u && na.postRender(() => u(a, lw(a)));
}
class L4 extends li {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = gz(a, (s, i) => (Lb(this.node, i, "Start"), (o) => Lb(this.node, o, "End"))));
  }
  unmount() {
  }
}
class $4 extends li {
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
    this.unmount = Xc(Mb(this.node.current, "focus", () => this.onFocus()), Mb(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function $b(t, a, s) {
  const { props: i } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && i.whileTap && t.animationState.setActive("whileTap", s === "Start");
  const o = "onTap" + (s === "End" ? "" : s), u = i[o];
  u && na.postRender(() => u(a, lw(a)));
}
class U4 extends li {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: s, propagate: i } = this.node.props;
    this.unmount = Sz(a, (o, u) => ($b(this.node, u, "Start"), (f, { success: m }) => $b(this.node, f, m ? "End" : "Cancel")), {
      useGlobalTarget: s,
      stopPropagation: i?.tap === !1
    });
  }
  unmount() {
  }
}
const Eh = /* @__PURE__ */ new WeakMap(), Hf = /* @__PURE__ */ new WeakMap(), B4 = (t) => {
  const a = Eh.get(t.target);
  a && a(t);
}, I4 = (t) => {
  t.forEach(B4);
};
function V4({ root: t, ...a }) {
  const s = t || document;
  Hf.has(s) || Hf.set(s, {});
  const i = Hf.get(s), o = JSON.stringify(a);
  return i[o] || (i[o] = new IntersectionObserver(I4, { root: t, ...a })), i[o];
}
function q4(t, a, s) {
  const i = V4(a);
  return Eh.set(t, s), i.observe(t), () => {
    Eh.delete(t), i.unobserve(t);
  };
}
const H4 = {
  some: 0,
  all: 1
};
class F4 extends li {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: s, margin: i, amount: o = "some", once: u } = a, f = {
      root: s ? s.current : void 0,
      rootMargin: i,
      threshold: typeof o == "number" ? o : H4[o]
    }, m = (y) => {
      const { isIntersecting: p } = y;
      if (this.isInView === p || (this.isInView = p, u && !p && this.hasEnteredView))
        return;
      p && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", p);
      const { onViewportEnter: b, onViewportLeave: v } = this.node.getProps(), w = p ? b : v;
      w && w(y);
    };
    this.stopObserver = q4(this.node.current, f, m);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: s } = this.node;
    ["amount", "margin", "root"].some(P4(a, s)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function P4({ viewport: t = {} }, { viewport: a = {} } = {}) {
  return (s) => t[s] !== a[s];
}
const G4 = {
  inView: {
    Feature: F4
  },
  tap: {
    Feature: U4
  },
  focus: {
    Feature: $4
  },
  hover: {
    Feature: L4
  }
}, Nm = {
  renderer: A4,
  ...O4,
  ...G4
};
function Y4() {
  !gm.current && HS();
  const [t] = g.useState(zc.current);
  return t;
}
const Nh = "emotion-tts:trigger-generate", Ch = "emotion-tts:run-state", Th = "emotion-tts:run-completed";
function K4() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Nh));
}
function X4(t) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Ch, { detail: t }));
}
function Q4(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(Nh, t), () => window.removeEventListener(Nh, t));
}
function ow(t) {
  if (typeof window > "u") return () => {
  };
  const a = (s) => {
    const i = s.detail;
    i && t(i);
  };
  return window.addEventListener(Ch, a), () => window.removeEventListener(Ch, a);
}
function Ub() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Th));
}
function Z4(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(Th, t), () => window.removeEventListener(Th, t));
}
var J4 = "wksjad0", W4 = "wksjad1", eO = "wksjad2", tO = "wksjad3", nO = "wksjad4", aO = "wksjad5", rO = "wksjad6", sO = "wksjad7", iO = "wksjad8", lO = "wksjad9", oO = "wksjada", cO = "wksjadb", uO = "wksjadc", dO = "wksjadd", fO = "wksjade", hO = "wksjadf", mO = "wksjadg", Ff = "wksjadh", pO = "wksjadi", gO = "wksjadj", vO = "wksjadk", yO = "wksjadl", bO = "wksjadm", xO = "wksjadn";
const Rh = 5, SO = 5e-3;
function cw(t, a = "") {
  return `${Sa}/deployments/${t}/artifacts${a}`;
}
function wO(t) {
  const [a, s] = g.useState([]), [i, o] = g.useState(!1), [u, f] = g.useState(null), [m, y] = g.useState(0), p = g.useRef(null), b = g.useRef(!1), v = g.useCallback(() => y((w) => w + 1), []);
  return g.useEffect(() => {
    p.current?.abort();
    const w = new AbortController();
    return p.current = w, o(!0), f(null), fetch(`${cw(t)}?limit=${Rh}`, {
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
  }, [t, m]), g.useEffect(() => ow((w) => {
    const S = b.current;
    b.current = w.busy, S && !w.busy && v();
  }), [v]), { rows: a, loading: i, error: u, refetch: v, tick: m };
}
function jO(t, a) {
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
function EO({
  deploymentId: t,
  speedFactor: a
}) {
  const { rows: s, loading: i, error: o, refetch: u, tick: f } = wO(t), m = jO(t, f), [y, p] = g.useState(null), b = Y4(), v = g.useCallback(() => {
    p(null), u();
  }, [u]), w = s;
  return !i && !o && w.length === 0 ? null : /* @__PURE__ */ c.jsxs("section", { className: J4, "aria-labelledby": "recent-gen-eyebrow", children: [
    /* @__PURE__ */ c.jsxs("header", { className: W4, children: [
      /* @__PURE__ */ c.jsx("span", { className: eO, id: "recent-gen-eyebrow", children: "Recent generations" }),
      /* @__PURE__ */ c.jsxs("span", { className: tO, children: [
        /* @__PURE__ */ c.jsx("span", { className: nO, children: w.length }),
        /* @__PURE__ */ c.jsxs("span", { className: aO, children: [
          "last ",
          Rh
        ] }),
        /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: rO,
            onClick: v,
            "aria-label": "Refresh",
            title: "Refresh",
            children: "↻"
          }
        )
      ] })
    ] }),
    o && /* @__PURE__ */ c.jsx("div", { className: xO, role: "alert", children: o }),
    /* @__PURE__ */ c.jsx(Sm, { features: Nm, strict: !0, children: /* @__PURE__ */ c.jsx("ul", { className: sO, children: /* @__PURE__ */ c.jsx(ew, { initial: !1, children: w.map((S) => {
      const j = y === S.utteranceId, N = cw(
        t,
        `/${S.utteranceId}/download`
      ), R = S.voiceAssetId ? m.get(S.voiceAssetId) ?? null : null;
      return /* @__PURE__ */ c.jsxs(
        Em.li,
        {
          className: iO,
          initial: b ? { opacity: 1 } : { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: b ? { opacity: 0 } : { opacity: 0, y: 6 },
          transition: {
            duration: b ? 0 : 0.18,
            ease: [0.2, 0, 0, 1]
          },
          "data-playing": j || void 0,
          children: [
            /* @__PURE__ */ c.jsxs("div", { className: lO, children: [
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: oO,
                  onClick: () => p(
                    (T) => T === S.utteranceId ? null : S.utteranceId
                  ),
                  "aria-label": "Preview",
                  "aria-pressed": j,
                  children: j ? "■" : "▶"
                }
              ),
              /* @__PURE__ */ c.jsxs("div", { className: cO, children: [
                /* @__PURE__ */ c.jsxs("div", { className: uO, children: [
                  /* @__PURE__ */ c.jsx("span", { className: dO, children: S.characterDisplay }),
                  /* @__PURE__ */ c.jsx("span", { className: fO, title: S.text, children: S.text })
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: hO, children: [
                  /* @__PURE__ */ c.jsx("span", { className: mO, children: CO(S.finishedAt) }),
                  R && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    /* @__PURE__ */ c.jsx("span", { className: Ff, "aria-hidden": "true", children: "·" }),
                    /* @__PURE__ */ c.jsx("span", { className: pO, children: R })
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: Ff, "aria-hidden": "true", children: "·" }),
                  /* @__PURE__ */ c.jsx("span", { className: gO, children: NO(S.durationMs) }),
                  a !== void 0 && Math.abs(a - 1) > SO && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    /* @__PURE__ */ c.jsx("span", { className: Ff, "aria-hidden": "true", children: "·" }),
                    /* @__PURE__ */ c.jsxs("span", { className: vO, children: [
                      a.toFixed(2),
                      "×"
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ c.jsx(
                "a",
                {
                  className: yO,
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
                className: bO,
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
function NO(t) {
  if (t == null || t <= 0) return "—";
  const a = Math.round(t / 1e3), s = Math.floor(a / 60), i = a % 60;
  return s > 0 ? `${s}:${i.toString().padStart(2, "0")}` : `${i}s`;
}
function CO(t) {
  if (!t) return "—";
  const s = Math.floor(Date.now() / 1e3) - t;
  return s < 0 ? "just now" : s < 60 ? `${s}s ago` : s < 3600 ? `${Math.floor(s / 60)}m ago` : s < 86400 ? `${Math.floor(s / 3600)}h ago` : s < 604800 ? `${Math.floor(s / 86400)}d ago` : new Date(t * 1e3).toLocaleDateString(void 0, { month: "short", day: "numeric" });
}
const TO = 6e3;
function RO(t) {
  const a = /* @__PURE__ */ new Map();
  for (const s of t)
    a.set(s.jobId, { jobId: s.jobId, runId: null, label: s.label, status: "queued" });
  return a;
}
function _O(t, a, s) {
  const i = t.find((o) => o.runId === a);
  return i ? i.jobs[s]?.jobId ?? null : null;
}
function MO(t, a, s) {
  if (s.type === "run_terminal") return t;
  const i = _O(a, s.runId, s.globalIndex);
  if (!i) return t;
  const o = t.get(i);
  if (!o) return t;
  const u = new Map(t);
  switch (s.type) {
    case "segment_started":
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
function AO(t) {
  return t === "done" || t === "failed" || t === "cancelled";
}
function kO(t) {
  if (t.size === 0) return !1;
  for (const a of t.values())
    if (!AO(a.status)) return !1;
  return !0;
}
function DO(t) {
  let a = 0, s = 0;
  for (const i of t.values())
    i.status === "done" && typeof i.durationMs == "number" && (a += i.durationMs, s += 1);
  return s > 0 ? a / s : TO;
}
function Bb(t, a) {
  const s = DO(t), i = new Map(t);
  for (const o of a) {
    const u = o.jobs.map((m) => i.get(m.jobId)).filter((m) => m != null && m.status === "queued"), f = u.length;
    u.forEach((m, y) => {
      i.set(m.jobId, {
        ...m,
        queuePosition: y + 1,
        queueTotal: f,
        etaMs: Math.round((y + 1) * s)
      });
    });
  }
  return i;
}
function zO(t) {
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
function OO(t) {
  let a = 0, s = 0, i = 0, o = 0;
  for (const u of t.values())
    u.status === "generating" ? s += 1 : u.status === "done" ? i += 1 : u.status === "failed" ? o += 1 : a += 1;
  return { queued: a, generating: s, done: i, failed: o };
}
function LO(t) {
  return t === window ? window.scrollY || document.documentElement.scrollTop || 0 : t.scrollTop;
}
function uw() {
  const t = [window];
  if (typeof document > "u") return t;
  let a = document.querySelector("emotion-tts-app");
  for (; a; ) {
    const s = window.getComputedStyle(a);
    (/(auto|scroll|overlay)/.test(s.overflowY) || /(auto|scroll|overlay)/.test(s.overflow)) && t.push(a), a = a.parentElement;
  }
  return t;
}
function $O() {
  if (typeof window > "u") return;
  const t = uw();
  for (const a of t)
    a === window ? window.scrollTo({ top: 0, behavior: "smooth" }) : a.scrollTo({ top: 0, behavior: "smooth" });
}
function dw(t) {
  const [a, s] = g.useState(!1);
  return g.useEffect(() => {
    if (typeof window > "u") return;
    const i = uw(), o = () => {
      const f = i.reduce((m, y) => {
        const p = LO(y);
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
const fw = 360;
var UO = "_1s59p180", BO = "_1s59p181", IO = "_1s59p182", VO = "_1s59p183", qO = "_1s59p184", HO = "_1s59p185", FO = "_1s59p186", PO = "_1s59p188", GO = "_1s59p189", Ib = "_1s59p18a", YO = "_1s59p18c", KO = "_1s59p18d", XO = "_1s59p18e", QO = "_1s59p18f", ZO = "_1s59p18g", JO = "_1s59p18i", WO = "_1s59p18j", eL = "_1s59p18k", tL = "_1s59p18l", nL = "_1s59p18n", aL = "_1s59p18o", rL = "_1s59p18p", sL = "_1s59p18q", iL = "_1s59p18r", lL = "_1s59p18s", oL = "_1s59p18t", Vb = "_1s59p18u", cL = "_1s59p18v", uL = "_1s59p18x";
const dL = 4e3;
function fL(t) {
  const a = ti(), s = t.storyboardJobs, i = (s?.length ?? 0) > 0, [o, u] = g.useState("idle"), [f, m] = g.useState(null), [y, p] = g.useState(/* @__PURE__ */ new Map()), [b, v] = g.useState(/* @__PURE__ */ new Map()), [w, S] = g.useState([]), [j, N] = g.useState(null), [R, T] = g.useState(null), [$, _] = g.useState(null), C = g.useRef(null), I = g.useRef([]), Y = g.useRef([]);
  g.useEffect(() => {
    Y.current = w;
  }, [w]);
  const ae = g.useCallback(() => {
    C.current?.(), C.current = null;
    for (const we of I.current) we();
    I.current = [];
  }, []);
  g.useEffect(() => () => {
    ae();
  }, [ae]), g.useEffect(() => {
    let we = !1;
    const tt = async () => {
      try {
        const ft = await vl();
        we || _(ft);
      } catch {
      }
    };
    tt();
    const dt = window.setInterval(tt, dL);
    return () => {
      we = !0, window.clearInterval(dt);
    };
  }, []), g.useEffect(() => {
    X4({ busy: o === "starting" || o === "running" });
  }, [o]), g.useEffect(() => {
    t.onJobProgressChange && t.onJobProgressChange(zO(b));
  }, [b, t.onJobProgressChange]);
  const A = g.useCallback(
    (we) => {
      const tt = we.status;
      (tt === "completed" || tt === "partial") && (Ub(), pn.success(
        tt === "completed" ? "Run complete — open the Artifacts tab to download" : "Partial run — open the Artifacts tab for what was produced",
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
  ), V = g.useCallback(async () => {
    const we = s ?? [];
    u("starting"), N(null), p(/* @__PURE__ */ new Map()), T(null), m(null), ae();
    const tt = Math.max(1, $?.workersActive ?? 1), dt = xT([...we], tt), ft = dt.map((Ot) => ({
      ...t.createPayload,
      prebuiltSegments: Ot.map((Pe) => Pe.segment)
    }));
    try {
      const Pe = (await bT(t.deploymentId, ft)).map((yt, je) => ({
        runId: yt.runId,
        jobs: dt[je] ?? []
      }));
      Y.current = Pe, S(Pe), v(Bb(RO(we), Pe)), u("running");
      const vt = Pe.map(
        (yt) => bf(
          t.deploymentId,
          yt.runId,
          (je) => {
            v((_e) => {
              const Ge = MO(_e, Y.current, je), Fe = Bb(Ge, Y.current);
              return kO(Fe) && (u("terminal"), Ub()), Fe;
            });
          },
          () => u("error")
        )
      );
      I.current = vt;
    } catch (Ot) {
      u("error"), N(sc(Ot));
    }
  }, [
    s,
    $?.workersActive,
    t.deploymentId,
    t.createPayload,
    ae
  ]), D = g.useCallback(async () => {
    u("starting"), N(null), p(/* @__PURE__ */ new Map()), T(null);
    try {
      const we = await w1(t.deploymentId, t.createPayload);
      m(we.runId), u("running"), ae(), C.current = bf(
        t.deploymentId,
        we.runId,
        (tt) => qb(
          tt,
          p,
          u,
          (dt) => {
            T(dt), A(dt);
          },
          t.deploymentId,
          we.runId
        ),
        () => u("error")
      );
    } catch (we) {
      u("error"), N(sc(we));
    }
  }, [t.deploymentId, t.createPayload, A, ae]), P = g.useCallback(async () => {
    i ? await V() : await D();
  }, [i, V, D]);
  g.useEffect(() => Q4(() => {
    (o === "idle" || o === "terminal" || o === "error") && P();
  }), [o, P]);
  const J = g.useCallback(async () => {
    if (i) {
      const we = Y.current.map((tt) => tt.runId);
      await Promise.all(
        we.map(
          (tt) => Xy(t.deploymentId, tt).catch(() => {
          })
        )
      );
      return;
    }
    if (f)
      try {
        await Xy(t.deploymentId, f);
      } catch (we) {
        N(sc(we));
      }
  }, [i, t.deploymentId, f]), Q = Array.from(y.values()).sort((we, tt) => we.globalIndex - tt.globalIndex), G = g.useMemo(
    () => (s ?? []).map((we) => b.get(we.jobId)).filter((we) => we != null),
    [s, b]
  ), ie = g.useMemo(() => OO(b), [b]), M = o === "starting" || o === "running", F = R?.status === "partial", U = i ? ie.generating : Q.filter((we) => we.status === "running").length, se = i ? ie.done : Q.filter((we) => we.status === "completed").length, de = i ? o === "starting" || o === "running" || G.length > 0 : o === "starting" || o === "running" || Q.length > 0, k = Q.filter((we) => we.status === "failed"), ee = (() => {
    if (o !== "terminal") return null;
    const we = i ? G.filter((Pe) => Pe.status === "failed").map((Pe) => Pe.failureCategory ?? "unknown") : k.map((Pe) => Pe.failureCategory ?? "unknown");
    if (we.length === 0) return null;
    const tt = /* @__PURE__ */ new Map();
    for (const Pe of we) tt.set(Pe, (tt.get(Pe) ?? 0) + 1);
    let dt = "unknown", ft = 0;
    for (const [Pe, vt] of tt)
      vt > ft && (dt = Pe, ft = vt);
    const Ot = i ? G.length : Q.length;
    return { category: dt, count: ft, total: Ot };
  })(), re = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, K = "Check the run detail page for the per-segment error log.", B = j?.toLowerCase().includes("unmapped") ?? !1, W = t.diagnostics ?? [], ce = $?.badge ?? "not_installed", ye = ce === "ready" || ce === "running", Me = s?.length ?? 0, st = ye ? t.canGenerate ? null : "Nothing to generate yet" : "Start runtime to generate", Te = o === "starting" ? "Starting…" : o === "running" ? i ? `Generating ${Me} segment${Me === 1 ? "" : "s"}…` : "Generating…" : st ?? "Generate", He = !t.canGenerate || M || !ye, Ve = o === "starting" || o === "running", Ke = Ve ? "running" : He ? "blocked" : "idle", Bt = !dw(fw) || Ve;
  return /* @__PURE__ */ c.jsxs("div", { className: UO, children: [
    /* @__PURE__ */ c.jsxs("div", { className: BO, children: [
      /* @__PURE__ */ c.jsxs("div", { className: VO, children: [
        /* @__PURE__ */ c.jsxs("span", { className: qO, children: [
          /* @__PURE__ */ c.jsx("span", { className: IO, "aria-hidden": "true", children: "01" }),
          "Pre-flight",
          de && /* @__PURE__ */ c.jsxs("span", { className: ZO, children: [
            /* @__PURE__ */ c.jsx("span", { className: JO, "aria-hidden": "true" }),
            U > 0 ? `${U} generating` : `${se} done`
          ] })
        ] }),
        W.length > 0 ? /* @__PURE__ */ c.jsx("ul", { className: HO, "aria-label": "Pre-flight checks", children: W.map((we) => /* @__PURE__ */ c.jsxs("li", { className: FO, children: [
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: PO,
              "data-status": we.status,
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ c.jsx("span", { className: GO, children: we.label }),
          we.detail && /* @__PURE__ */ c.jsx("span", { className: Ib, children: we.detail })
        ] }, we.label)) }) : /* @__PURE__ */ c.jsx("span", { className: Ib, children: "Ready when you are." })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: YO, "data-state": Ke, children: [
        Bt ? /* @__PURE__ */ c.jsxs(
          Qe,
          {
            variant: "primary",
            size: "sm",
            onClick: P,
            disabled: He,
            loading: Ve,
            title: st ?? void 0,
            children: [
              !Ve && /* @__PURE__ */ c.jsx("span", { className: KO, "aria-hidden": "true", children: "▶" }),
              Te
            ]
          }
        ) : /* @__PURE__ */ c.jsxs("span", { className: XO, "aria-hidden": "true", children: [
          "Generate available in toolbar",
          /* @__PURE__ */ c.jsx("span", { className: QO, children: "↑" })
        ] }),
        M && /* @__PURE__ */ c.jsx(
          Qe,
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
          B && /* @__PURE__ */ c.jsx(
            Qe,
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
    ee && /* @__PURE__ */ c.jsxs(kn, { severity: "error", style: { flexDirection: "column", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ c.jsxs("strong", { children: [
        "Run failed — ",
        ee.count,
        " of ",
        ee.total,
        " segments failed with ",
        /* @__PURE__ */ c.jsx("code", { children: ee.category })
      ] }),
      /* @__PURE__ */ c.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: re[ee.category] ?? K })
    ] }),
    R?.exportArtifactRef && // audit-allow: download anchor — Button primitive lacks <a> polymorphic
    /* @__PURE__ */ c.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${R.exportArtifactRef}/download`,
        download: !0,
        className: `${C1.secondary} ${T1.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    F && R && /* @__PURE__ */ c.jsxs(kn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ c.jsx(
        Qe,
        {
          variant: "secondary",
          disabled: !1,
          onClick: async () => {
            try {
              const we = await j1(t.deploymentId, R.runId);
              m(we.runId), p(/* @__PURE__ */ new Map()), T(null), u("running"), ae(), C.current = bf(
                t.deploymentId,
                we.runId,
                (tt) => qb(tt, p, u, T, t.deploymentId, we.runId),
                () => u("error")
              );
            } catch (we) {
              N(sc(we)), u("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    i && G.length > 0 && /* @__PURE__ */ c.jsx(gL, { items: G, counts: ie }),
    !i && Q.length > 0 && /* @__PURE__ */ c.jsxs("table", { className: l_, children: [
      /* @__PURE__ */ c.jsx("thead", { children: /* @__PURE__ */ c.jsxs("tr", { children: [
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "#" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Status" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Duration" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ c.jsx("tbody", { children: Q.map((we) => /* @__PURE__ */ c.jsxs("tr", { className: o_, children: [
        /* @__PURE__ */ c.jsx("td", { className: mr, children: we.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: /* @__PURE__ */ c.jsx(wr, { tone: vL(we.status), children: we.status }) }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: we.durationMs ? `${we.durationMs} ms` : "—" }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: we.failureCategory ?? "" })
      ] }, we.globalIndex)) })
    ] })
  ] });
}
function hL(t) {
  return `~${Math.max(1, Math.round(t / 1e3))}s`;
}
function mL(t) {
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
function pL(t) {
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
function gL({ items: t, counts: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: WO, role: "table", "aria-label": "Per-segment generation progress", children: [
    /* @__PURE__ */ c.jsxs("div", { className: eL, children: [
      /* @__PURE__ */ c.jsx("span", { className: tL, children: "Segments" }),
      /* @__PURE__ */ c.jsxs("span", { className: nL, "data-tone": a.generating > 0 ? "live" : "idle", children: [
        /* @__PURE__ */ c.jsx("span", { className: aL, "aria-hidden": "true" }),
        a.generating > 0 ? `${a.generating} generating` : a.failed > 0 ? `${a.done} done · ${a.failed} failed` : `${a.done} done`
      ] })
    ] }),
    t.map((s) => /* @__PURE__ */ c.jsxs("div", { className: rL, role: "row", "data-status": s.status, children: [
      /* @__PURE__ */ c.jsx("span", { className: sL, role: "cell", children: s.label }),
      /* @__PURE__ */ c.jsx("span", { className: iL, role: "cell", children: /* @__PURE__ */ c.jsx(wr, { tone: mL(s.status), pulse: s.status === "generating", children: pL(s.status) }) }),
      /* @__PURE__ */ c.jsxs("span", { className: lL, role: "cell", children: [
        s.status === "generating" && /* @__PURE__ */ c.jsx("span", { className: uL, "aria-hidden": "true" }),
        s.status === "done" && typeof s.durationMs == "number" ? /* @__PURE__ */ c.jsxs("span", { className: oL, children: [
          (s.durationMs / 1e3).toFixed(1),
          "s"
        ] }) : s.status === "queued" && typeof s.etaMs == "number" ? /* @__PURE__ */ c.jsxs("span", { className: Vb, children: [
          s.queuePosition && s.queueTotal ? `#${s.queuePosition} · ` : "",
          hL(s.etaMs)
        ] }) : s.status === "generating" ? /* @__PURE__ */ c.jsx("span", { className: Vb, children: "working…" }) : null
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: cL, role: "cell", children: s.status === "failed" ? s.failureCategory ?? "error" : "" })
    ] }, s.jobId))
  ] });
}
async function qb(t, a, s, i, o, u) {
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
function vL(t) {
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
function yL(t) {
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
const bL = {
  queued: { label: "Queued", color: "var(--outline, #747578)", glow: "rgba(116,117,120,0)", pulse: !1 },
  rendering: { label: "Rendering", color: "var(--primary, #ba9eff)", glow: "rgba(186,158,255,0.6)", pulse: !0 },
  ready: { label: "Ready", color: "var(--acid-green, #22c55e)", glow: "rgba(34,197,94,0.6)", pulse: !1 },
  failed: { label: "Failed", color: "var(--error, #ff6e84)", glow: "rgba(255,110,132,0.5)", pulse: !1 }
}, Hb = [
  { color: "#ba9eff", rgb: "186,158,255", onColor: "#2b006e" },
  { color: "#9093ff", rgb: "144,147,255", onColor: "#080079" },
  { color: "#ff8439", rgb: "255,132,57", onColor: "#471a00" },
  { color: "#21c7d9", rgb: "33,199,217", onColor: "#00363c" },
  { color: "#34d399", rgb: "52,211,153", onColor: "#003824" },
  { color: "#e879f9", rgb: "232,121,249", onColor: "#3b0a45" }
], Fb = [
  "record_voice_over",
  "graphic_eq",
  "mic_external_on",
  "interpreter_mode",
  "voice_chat",
  "spatial_audio"
];
function xL(t) {
  return t === 0 ? "Lead" : t === 1 ? "Support" : "Voice";
}
function SL(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function wL(t) {
  const a = t.filter((s) => s.isActive && (s.kind === "speaker" || s.kind === "mixed"));
  return a.length === 0 ? [] : a.map((s, i) => {
    const o = Hb[i % Hb.length], u = Fb[i % Fb.length];
    return {
      id: s.voiceAssetId,
      name: s.displayName || `Voice ${i + 1}`,
      role: xL(i),
      icon: u,
      color: o.color,
      rgb: o.rgb,
      onColor: o.onColor,
      initial: SL(s.displayName || "V"),
      lib: s.displayName || s.voiceAssetId
    };
  });
}
function hw(t) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
function jL(t) {
  const a = /* @__PURE__ */ new Set(), s = [];
  for (const i of t) {
    const o = hw(i.presetName);
    a.has(o) || (a.add(o), s.push({ id: o, label: i.presetName }));
  }
  return s;
}
function EL(t, a) {
  const s = t.find((o) => hw(o.presetName) === a);
  if (!s) return null;
  const i = s.vector;
  return Array.isArray(i) && i.length === 8 ? i : null;
}
function NL(t) {
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
function CL(t, a, s) {
  const i = [];
  let o = 0;
  for (const u of t)
    for (const f of u.segs)
      o >= a && o <= s && i.push(f.id), o += 1;
  return i;
}
function TL(t, a) {
  for (const s of t) for (const i of s.segs) if (i.id === a) return i.text;
  return "";
}
function rl(t, a) {
  return [...a].sort((s, i) => Mh(t, s) - Mh(t, i)).map((s) => TL(t, s)).join("").trim();
}
function Pb(t, a) {
  return Math.min(...a.segIds.map((s) => Mh(t, s)));
}
function mw(t, a) {
  return t.find((s) => s.segIds.includes(a));
}
function Gb(t, a) {
  return a.every((s) => !mw(t, s));
}
function pw(t, a) {
  return [...a].sort((s, i) => Pb(t, s) - Pb(t, i));
}
function RL(t, a) {
  const s = {};
  return pw(t, a).forEach((i, o) => {
    s[i.id] = `SEG-${String(o + 1).padStart(3, "0")}`;
  }), s;
}
function _L(t) {
  return _h(t).reduce(
    (a, s) => a + s.text.trim().split(/\s+/).filter(Boolean).length,
    0
  );
}
function ML(t) {
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
function Yb(t, a) {
  return t.find((s) => s.id === a)?.label ?? a;
}
var AL = "_171z55w1", kL = "_171z55w2", DL = "_171z55w3", Kb = "_171z55w4", zL = "_171z55w5", OL = "_171z55w6", LL = "_171z55w7", $L = "_171z55w8", UL = "_171z55w9", BL = "_171z55wa", IL = "_171z55wb", VL = "_171z55wc", qL = "_171z55wd", HL = "_171z55we", FL = "_171z55wh", PL = "_171z55wi", Xb = "_171z55wj", Qb = "_171z55wk _171z55wj", GL = "_171z55wl", YL = "_171z55wm", KL = "_171z55wn", XL = "_171z55wo", Zb = "_171z55wp", Jb = "_171z55wq", QL = "_171z55wr", ZL = "_171z55ws", JL = "_171z55wt", WL = "_171z55wu", e6 = "_171z55wv", t6 = "_171z55ww", n6 = "_171z55wx", a6 = "_171z55wy", r6 = "_171z55wz", s6 = "_171z55w10", i6 = "_171z55w11", l6 = "_171z55w12", o6 = "_171z55w13", c6 = "_171z55w14", Wb = "_171z55w15", u6 = "_171z55w16", d6 = "_171z55w17", f6 = "_171z55w18", h6 = "_171z55w19", m6 = "_171z55w1a", p6 = "_171z55w1b", g6 = "_171z55w1c", v6 = "_171z55w1d", y6 = "_171z55w1e", b6 = "_171z55w1f", x6 = "_171z55w1g", S6 = "_171z55w1h", w6 = "_171z55w1i", j6 = "_171z55w1j", E6 = "_171z55w1k", N6 = "_171z55w1l";
function C6({
  voiceAssets: t,
  presets: a,
  storyText: s,
  onStoryTextChange: i,
  mappings: o,
  onQueueChange: u,
  onJobsChange: f,
  jobProgress: m
}) {
  const y = g.useMemo(() => wL(t), [t]), p = g.useMemo(() => jL(a), [a]), b = s, v = g.useMemo(() => NL(b), [b]), w = y[0]?.id ?? "", S = p[0]?.id ?? "", [j, N] = g.useState("voice"), [R, T] = g.useState(""), $ = g.useMemo(
    () => A6(o, y),
    [o, y]
  ), [_, C] = g.useState([]), [I, Y] = g.useState([]), [ae, A] = g.useState(null), [V, D] = g.useState(null), [P, J] = g.useState(w), [Q, G] = g.useState(S), [ie, M] = g.useState(null), [F, U] = g.useState(null), [se, de] = g.useState(null), [k, ee] = g.useState(null), [re, K] = g.useState(!1), B = g.useRef(null), W = g.useRef(null), ce = g.useRef(/* @__PURE__ */ new Map()), ye = g.useRef(null), Me = g.useRef(1e3), st = g.useCallback(() => (Me.current += 1, `job-${Me.current}`), []), Te = g.useMemo(() => {
    const O = /* @__PURE__ */ new Map();
    return _h(v).forEach((he, be) => O.set(he.id, be)), O;
  }, [v]), He = g.useCallback((O) => Te.get(O) ?? Number.MAX_SAFE_INTEGER, [Te]);
  g.useEffect(() => {
    const O = new Set(_h(v).map((he) => he.id));
    C((he) => {
      const be = he.filter((ze) => ze.segIds.every((Ue) => O.has(Ue)));
      return be.length === he.length ? he : be;
    });
  }, [v]), g.useEffect(() => Z4(() => C([])), []), g.useEffect(() => {
    if (y.length !== 0 && (J((O) => y.some((he) => he.id === O) ? O : y[0].id), y.length === 1)) {
      const O = y[0].id;
      C((he) => {
        let be = !1;
        const ze = he.map((Ue) => y.some((it) => it.id === Ue.voiceId) ? Ue : (be = !0, { ...Ue, voiceId: O }));
        return be ? ze : he;
      });
    }
  }, [y]);
  const Ve = g.useMemo(() => new Set(y.map((O) => O.id)), [y]), Ke = g.useCallback(
    (O) => !Ve.has(O.voiceId),
    [Ve]
  ), Ft = g.useCallback((O) => {
    const he = B.current;
    if (!he || !O) return { top: 60, left: 0 };
    const be = O.getBoundingClientRect(), ze = he.getBoundingClientRect();
    let Ue = be.left - ze.left + he.scrollLeft;
    const it = be.bottom - ze.top + he.scrollTop + 10, Vt = Math.max(0, he.clientWidth - 318);
    return Ue = Math.max(0, Math.min(Ue, Vt)), { top: it, left: Ue };
  }, []), Bt = g.useCallback(() => {
    Y([]), A(null), D(null), M(null);
  }, []), we = g.useCallback(
    (O, he) => {
      const be = [...O.segIds].sort((Ue, it) => He(Ue) - He(it))[0];
      if (!be) return;
      const ze = he ?? ce.current.get(be) ?? null;
      D(O.id), Y([...O.segIds]), A(be), J(O.voiceId), G(O.emotion), M(Ft(ze)), de(O.id);
    },
    [He, Ft]
  ), tt = g.useCallback(
    (O, he, be) => {
      const ze = mw(_, O);
      if (ze) {
        we(ze, he);
        return;
      }
      const Ue = Ft(he);
      if (be && ae != null && V == null) {
        const it = He(ae), Vt = He(O), lt = CL(v, Math.min(it, Vt), Math.max(it, Vt));
        if (Gb(_, lt)) {
          Y(lt), D(null), M(Ue);
          return;
        }
      }
      Y([O]), A(O), D(null), M(Ue);
    },
    [_, v, ae, V, Ft, we, He]
  ), dt = g.useCallback(() => {
    if (V) {
      C(
        (be) => be.map(
          (ze) => ze.id === V ? { ...ze, voiceId: P, emotion: Q, status: "queued" } : ze
        )
      ), de(V), Y([]), A(null), D(null), M(null);
      return;
    }
    if (I.length === 0 || rl(v, I).trim() === "" || !Gb(_, I)) return;
    const O = st(), he = { id: O, segIds: [...I], voiceId: P, emotion: Q, status: "queued" };
    C((be) => [...be, he]), de(O), Y([]), A(null), M(null);
  }, [V, I, _, v, P, Q, st]), ft = g.useCallback((O) => {
    C((he) => he.filter((be) => be.id !== O)), de((he) => he === O ? null : he), ee((he) => he === O ? null : he), Y([]), A(null), D(null), M(null);
  }, []), Ot = g.useCallback((O) => {
    ee((he) => he === O ? null : O);
  }, []), Pe = g.useCallback((O) => {
    W.current?.scrollBy({ left: O * 280, behavior: "smooth" });
  }, []), vt = g.useCallback(
    (O) => {
      if (p.length === 0) return;
      const he = p.findIndex((ze) => ze.id === Q), be = p[(he + O + p.length) % p.length];
      G(be.id), ye.current?.querySelector(`[data-emotion="${be.id}"]`)?.focus();
    },
    [p, Q]
  ), yt = ie ? V ?? I[0] ?? "new" : null;
  g.useEffect(() => {
    if (yt == null) return;
    const O = requestAnimationFrame(() => {
      ye.current?.querySelector(`[data-voice="${P}"]`)?.focus();
    });
    return () => cancelAnimationFrame(O);
  }, [yt]);
  const je = g.useCallback(
    (O) => {
      O.key === "Escape" && (O.preventDefault(), Bt());
    },
    [Bt]
  ), _e = g.useMemo(() => {
    const O = /* @__PURE__ */ new Map();
    for (const he of _) for (const be of he.segIds) O.set(be, he);
    return O;
  }, [_]), Ge = g.useMemo(() => pw(v, _), [v, _]), Fe = g.useMemo(() => RL(v, _), [v, _]), Nt = g.useMemo(
    () => Ge.filter((O) => y.some((he) => he.id === O.voiceId)).filter((O) => rl(v, O.segIds).trim() !== "").map((O) => {
      const he = EL(a, O.emotion);
      return {
        jobId: O.id,
        label: Fe[O.id] ?? O.id,
        segment: {
          text: rl(v, O.segIds),
          voice_asset_id: O.voiceId,
          speaker_label: (ic(y, O.voiceId) ?? dl).name,
          emotion: he ? { mode: "emotion_vector", vector: he } : null
        }
      };
    }),
    [Ge, v, y, a, Fe]
  ), Mt = g.useMemo(
    () => Nt.map((O) => O.segment),
    [Nt]
  ), Hn = g.useRef(null);
  g.useEffect(() => {
    const O = JSON.stringify(Mt);
    O !== Hn.current && (Hn.current = O, u?.(Mt));
  }, [Mt, u]);
  const Sn = g.useRef(null);
  g.useEffect(() => {
    const O = JSON.stringify(Nt);
    O !== Sn.current && (Sn.current = O, f?.(Nt));
  }, [Nt, f]);
  const wn = g.useMemo(() => {
    const O = /* @__PURE__ */ new Map();
    for (const he of _) {
      const be = [...he.segIds].sort((ze, Ue) => He(ze) - He(Ue))[0];
      be && O.set(he.id, be);
    }
    return O;
  }, [_, He]), Pt = g.useMemo(() => {
    const O = /* @__PURE__ */ new Set();
    for (const he of _) for (const be of he.segIds) O.add(be);
    return O.size;
  }, [_]), At = g.useMemo(() => _L(v), [v]), Lt = ML(_), sa = ic(y, P) ?? dl, [jn, un] = g.useState(null), Qt = R.trim().toLowerCase(), sn = g.useMemo(
    () => y.filter(
      (O) => !Qt || O.name.toLowerCase().includes(Qt) || O.role.toLowerCase().includes(Qt)
    ),
    [y, Qt]
  ), fe = g.useMemo(
    () => $.filter(
      (O) => !Qt || O.name.toLowerCase().includes(Qt) || (O.voice?.name.toLowerCase().includes(Qt) ?? !1)
    ),
    [$, Qt]
  ), Ae = j === "character" ? `${fe.length} character${fe.length === 1 ? "" : "s"}` : `${sn.length} voice${sn.length === 1 ? "" : "s"}`, ge = (O) => O.stopPropagation();
  return /* @__PURE__ */ c.jsxs("div", { className: DL, children: [
    /* @__PURE__ */ c.jsxs("div", { style: T6, children: [
      /* @__PURE__ */ c.jsxs("span", { className: zL, children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("strong", { children: Pt }),
          " cast"
        ] }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("strong", { children: At }),
          " words"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: LL,
          "aria-pressed": re,
          onClick: () => K((O) => !O),
          children: [
            /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: re ? "check" : "edit" }),
            re ? "Done" : "Edit text"
          ]
        }
      )
    ] }),
    re ? /* @__PURE__ */ c.jsx(
      "textarea",
      {
        value: s,
        onChange: (O) => i(O.target.value),
        placeholder: "Paste or write your script, then switch back to cast each phrase.",
        "aria-label": "Storyboard script text",
        style: R6
      }
    ) : /* @__PURE__ */ c.jsxs(
      "div",
      {
        ref: B,
        className: OL,
        role: "group",
        "aria-label": "Story script — select a phrase to cast a voice",
        onMouseDown: (O) => {
          O.shiftKey && O.preventDefault();
        },
        onClick: () => {
          ie && Bt();
        },
        children: [
          v.map((O) => /* @__PURE__ */ c.jsx("p", { className: $L, children: O.segs.map((he, be) => {
            const ze = _e.get(he.id), Ue = I.includes(he.id), it = !!ze && (F === ze.id || se === ze.id), Vt = !!ze && wn.get(ze.id) === he.id, lt = ze ? ic(y, ze.voiceId) : null, z = Pf(he.id, _e, I), H = Pf(O.segs[be - 1]?.id, _e, I), Z = Pf(O.segs[be + 1]?.id, _e, I), ve = z != null && H !== z, xe = z != null && Z !== z;
            return /* @__PURE__ */ c.jsxs("span", { children: [
              Vt && lt && /* @__PURE__ */ c.jsx("span", { className: BL, style: M6(lt), "aria-hidden": "true", children: lt.initial }),
              /* @__PURE__ */ c.jsx(
                "span",
                {
                  ref: (Ee) => {
                    Ee && ce.current.set(he.id, Ee);
                  },
                  role: "button",
                  tabIndex: 0,
                  "aria-pressed": Ue || !!ze,
                  "aria-label": ze ? `${lt?.name ?? "voice"} · ${he.text.trim()}` : he.text.trim(),
                  className: UL,
                  style: _6(Ue, lt, it, he.kind, ve, xe),
                  onClick: (Ee) => {
                    Ee.stopPropagation(), tt(he.id, Ee.currentTarget, Ee.shiftKey);
                  },
                  onKeyDown: (Ee) => {
                    (Ee.key === "Enter" || Ee.key === " ") && (Ee.preventDefault(), tt(he.id, Ee.currentTarget, Ee.shiftKey));
                  },
                  onMouseEnter: ze ? () => U(ze.id) : void 0,
                  onMouseLeave: ze ? () => U(null) : void 0,
                  children: he.text
                }
              )
            ] }, he.id);
          }) }, O.id)),
          ie && /* @__PURE__ */ c.jsxs(
            "div",
            {
              ref: ye,
              className: IL,
              role: "dialog",
              "aria-label": V ? "Edit casting" : "Cast voice",
              style: { top: ie.top, left: ie.left },
              onClick: ge,
              onMouseDown: ge,
              onKeyDown: je,
              children: [
                /* @__PURE__ */ c.jsxs("div", { className: VL, children: [
                  /* @__PURE__ */ c.jsx("span", { className: qL, children: V ? "Edit casting" : "Cast voice" }),
                  /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: HL,
                      style: { width: 24, height: 24 },
                      "aria-label": "Cancel",
                      onClick: Bt,
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 17 }, "aria-hidden": "true", children: "close" })
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: FL, children: [
                  /* @__PURE__ */ c.jsxs("div", { className: PL, role: "radiogroup", "aria-label": "Cast source", children: [
                    /* @__PURE__ */ c.jsx(
                      "button",
                      {
                        type: "button",
                        role: "radio",
                        "aria-checked": j === "voice",
                        className: j === "voice" ? Qb : Xb,
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
                        className: j === "character" ? Qb : Xb,
                        onClick: () => {
                          N("character"), T("");
                        },
                        children: "Characters"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: GL, children: Ae })
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: YL, children: [
                  /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: k6, children: "search" }),
                  /* @__PURE__ */ c.jsx(
                    "input",
                    {
                      className: KL,
                      value: R,
                      onChange: (O) => T(O.target.value),
                      placeholder: j === "character" ? "Search characters…" : "Search voices…",
                      "aria-label": j === "character" ? "Search characters" : "Search voices"
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: XL, role: "radiogroup", "aria-label": j === "character" ? "Character" : "Voice", children: [
                  j === "voice" && sn.map((O) => {
                    const he = jn == null && P === O.id;
                    return /* @__PURE__ */ c.jsxs(
                      "button",
                      {
                        type: "button",
                        role: "radio",
                        "aria-checked": he,
                        className: Zb,
                        style: tx(O, he),
                        onClick: () => {
                          J(O.id), un(null);
                        },
                        children: [
                          /* @__PURE__ */ c.jsx("span", { style: nx(O), children: O.initial }),
                          /* @__PURE__ */ c.jsxs("span", { className: Jb, children: [
                            /* @__PURE__ */ c.jsx("span", { style: ax(he), children: O.name }),
                            /* @__PURE__ */ c.jsx("span", { style: D6, children: O.role })
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
                        className: Zb,
                        style: tx(he, be),
                        onClick: () => {
                          J(O.voiceId), un(O.id);
                        },
                        children: [
                          /* @__PURE__ */ c.jsx("span", { style: nx(he), children: he.initial }),
                          /* @__PURE__ */ c.jsxs("span", { className: Jb, children: [
                            /* @__PURE__ */ c.jsx("span", { style: ax(be), children: O.name }),
                            /* @__PURE__ */ c.jsx("span", { style: z6, children: he.name })
                          ] }),
                          be && /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 18, color: he.color, flexShrink: 0 }, children: "check" })
                        ]
                      },
                      O.id
                    );
                  }),
                  (j === "voice" && sn.length === 0 || j === "character" && fe.length === 0) && /* @__PURE__ */ c.jsx("div", { className: QL, children: j === "character" ? $.length === 0 ? "No characters mapped yet." : `No matches for “${R}”` : y.length === 0 ? "No voices yet — add voice assets." : `No matches for “${R}”` })
                ] }),
                /* @__PURE__ */ c.jsx("div", { className: ZL }),
                /* @__PURE__ */ c.jsxs("div", { className: JL, children: [
                  /* @__PURE__ */ c.jsx("span", { className: Kb, style: { fontSize: 9.5, marginBottom: 0 }, children: "Emotion" }),
                  /* @__PURE__ */ c.jsx(
                    "div",
                    {
                      className: WL,
                      role: "radiogroup",
                      "aria-label": "Emotion",
                      onKeyDown: (O) => {
                        O.key === "ArrowRight" || O.key === "ArrowDown" ? (O.preventDefault(), vt(1)) : (O.key === "ArrowLeft" || O.key === "ArrowUp") && (O.preventDefault(), vt(-1));
                      },
                      children: p.map((O) => {
                        const he = Q === O.id;
                        return /* @__PURE__ */ c.jsx(
                          "button",
                          {
                            type: "button",
                            role: "radio",
                            "aria-checked": he,
                            "data-emotion": O.id,
                            tabIndex: he ? 0 : -1,
                            className: e6,
                            style: O6(sa, he),
                            onClick: () => G(O.id),
                            children: O.label
                          },
                          O.id
                        );
                      })
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsx("div", { className: t6, children: /* @__PURE__ */ c.jsx("span", { className: n6, children: rl(v, I) }) }),
                /* @__PURE__ */ c.jsxs("div", { className: a6, children: [
                  V && /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: r6,
                      "aria-label": "Remove casting",
                      onClick: () => V && ft(V),
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: "delete" })
                    }
                  ),
                  /* @__PURE__ */ c.jsxs(
                    "button",
                    {
                      type: "button",
                      style: L6(sa),
                      onClick: dt,
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
    /* @__PURE__ */ c.jsxs("div", { className: s6, children: [
      /* @__PURE__ */ c.jsxs("div", { className: i6, children: [
        /* @__PURE__ */ c.jsxs("div", { className: l6, children: [
          /* @__PURE__ */ c.jsx("span", { className: Kb, style: { marginBottom: 0 }, children: "Assigned segments" }),
          /* @__PURE__ */ c.jsx("span", { className: o6, children: _.length }),
          Lt && /* @__PURE__ */ c.jsx("span", { className: c6, children: Lt })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ c.jsx("button", { type: "button", className: Wb, "aria-label": "Scroll segments left", onClick: () => Pe(-1), disabled: _.length === 0, children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 18 }, "aria-hidden": "true", children: "chevron_left" }) }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: Wb, "aria-label": "Scroll segments right", onClick: () => Pe(1), disabled: _.length === 0, children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 18 }, "aria-hidden": "true", children: "chevron_right" }) })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { ref: W, className: u6, children: [
        Ge.map((O) => {
          const he = ic(y, O.voiceId) ?? dl, be = Ke(O), ze = m?.get(O.id), Ue = ze ? yL(ze) : O.status, it = bL[Ue], Vt = se === O.id || F === O.id, lt = k === O.id, z = rl(v, O.segIds);
          return /* @__PURE__ */ c.jsxs(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `${he.name} ${Fe[O.id]} — ${Yb(p, O.emotion)} — ${be ? "voice removed — recast" : it.label}`,
              className: d6,
              "data-broken": be ? "true" : "false",
              style: be ? U6(Vt) : $6(he, Vt),
              onClick: () => we(O),
              onKeyDown: (H) => {
                (H.key === "Enter" || H.key === " ") && (H.preventDefault(), we(O));
              },
              onMouseEnter: () => U(O.id),
              onMouseLeave: () => U(null),
              onFocus: () => de(O.id),
              children: [
                /* @__PURE__ */ c.jsxs("div", { className: f6, children: [
                  /* @__PURE__ */ c.jsxs("div", { className: h6, children: [
                    /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 17, color: he.color }, children: he.icon }),
                    /* @__PURE__ */ c.jsx("span", { className: m6, children: he.name })
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: p6, children: Fe[O.id] })
                ] }),
                /* @__PURE__ */ c.jsx("span", { className: g6, children: z }),
                /* @__PURE__ */ c.jsxs("div", { className: v6, children: [
                  /* @__PURE__ */ c.jsx("span", { style: I6(he), children: Yb(p, O.emotion) }),
                  /* @__PURE__ */ c.jsxs("span", { className: y6, children: [
                    /* @__PURE__ */ c.jsx("span", { style: V6(it) }),
                    /* @__PURE__ */ c.jsx("span", { style: q6(it, Ue), children: it.label })
                  ] })
                ] }),
                be && /* @__PURE__ */ c.jsxs("span", { style: B6, role: "status", children: [
                  /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 14 }, "aria-hidden": "true", children: "error" }),
                  "voice removed — recast"
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: b6, children: [
                  /* @__PURE__ */ c.jsxs(
                    "button",
                    {
                      type: "button",
                      className: x6,
                      "aria-label": lt ? "Pause preview" : "Preview audio",
                      onClick: (H) => {
                        H.stopPropagation(), Ot(O.id);
                      },
                      children: [
                        /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: lt ? "pause_circle" : "play_circle" }),
                        lt ? "Playing" : "Preview"
                      ]
                    }
                  ),
                  /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: S6,
                      "aria-label": `Remove ${Fe[O.id]}`,
                      onClick: (H) => {
                        H.stopPropagation(), ft(O.id);
                      },
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: "close" })
                    }
                  )
                ] }),
                lt && /* @__PURE__ */ c.jsx("div", { className: w6, children: /* @__PURE__ */ c.jsx("div", { style: H6(he) }) })
              ]
            },
            O.id
          );
        }),
        _.length === 0 && /* @__PURE__ */ c.jsxs("div", { className: j6, children: [
          /* @__PURE__ */ c.jsx("span", { className: E6, children: "0" }),
          /* @__PURE__ */ c.jsx("span", { className: N6, children: "No segments cast yet. Select a phrase above to begin." })
        ] })
      ] })
    ] })
  ] });
}
const T6 = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }, R6 = {
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
function ex(t, a) {
  return {
    borderTopLeftRadius: t ? 4 : 0,
    borderBottomLeftRadius: t ? 4 : 0,
    borderTopRightRadius: a ? 4 : 0,
    borderBottomRightRadius: a ? 4 : 0
  };
}
function _6(t, a, s, i, o, u) {
  const f = { padding: "2px 0", cursor: "pointer", WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" }, m = "186,158,255";
  return t ? { ...f, ...ex(o, u), background: `rgba(${m},0.16)`, boxShadow: `inset 0 -2px 0 rgba(${m},0.7)`, color: "var(--on-surface)" } : a ? { ...f, ...ex(o, u), background: `rgba(${a.rgb},${s ? 0.2 : 0.11})`, boxShadow: `inset 0 -2px 0 ${a.color}`, color: "var(--on-surface)" } : { ...f, color: i === "dialogue" ? "var(--on-surface)" : "var(--on-surface-variant)" };
}
function M6(t) {
  return { color: t.color, background: `rgba(${t.rgb},0.18)`, boxShadow: `inset 0 0 0 1px rgba(${t.rgb},0.45)` };
}
function A6(t, a) {
  return t ? [...t.values()].filter((s) => s.isActive).map((s) => ({
    id: s.mappingId,
    name: s.characterName,
    voiceId: s.speakerVoiceAssetId,
    voice: a.find((i) => i.id === s.speakerVoiceAssetId) ?? null
  })) : [];
}
function tx(t, a) {
  return a ? {
    border: `1px solid rgba(${t.rgb},0.5)`,
    background: `rgba(${t.rgb},0.12)`
  } : {};
}
function nx(t) {
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
function ax(t) {
  return {
    fontSize: 12,
    fontWeight: 600,
    color: t ? "var(--on-surface, #e3e3e3)" : "var(--on-surface-variant, #c4c7c5)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  };
}
const k6 = { position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "var(--on-surface-muted)", pointerEvents: "none" }, D6 = { fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--on-surface-muted)" }, z6 = { fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.02em", color: "var(--on-surface-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
function O6(t, a) {
  return {
    border: `1px solid ${a ? `rgba(${t.rgb},0.45)` : "rgba(120,124,128,0.35)"}`,
    background: a ? `rgba(${t.rgb},0.14)` : "var(--surface-raised, rgba(255,255,255,0.05))",
    color: a ? t.color : "var(--on-surface-variant, #c4c7c5)"
  };
}
function L6(t) {
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
function $6(t, a) {
  return {
    background: a ? "var(--surface-high, #1d2023)" : "var(--surface-low, #111416)",
    transform: a ? "translateY(-2px)" : "none",
    boxShadow: a ? `inset 3px 0 0 ${t.color}, 0 0 0 1px rgba(${t.rgb},0.4), 0 12px 28px rgba(0,0,0,0.5)` : `inset 3px 0 0 ${t.color}`
  };
}
function U6(t) {
  const a = "var(--error, #ff6e84)";
  return {
    background: t ? "var(--surface-high, #1d2023)" : "var(--surface-low, #111416)",
    transform: t ? "translateY(-2px)" : "none",
    boxShadow: t ? `inset 3px 0 0 ${a}, 0 0 0 1px rgba(255,110,132,0.45), 0 12px 28px rgba(0,0,0,0.5)` : `inset 3px 0 0 ${a}, 0 0 0 1px rgba(255,110,132,0.32)`
  };
}
const B6 = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  marginTop: 6,
  fontFamily: "var(--font-ui)",
  fontSize: 10.5,
  fontWeight: 500,
  color: "var(--error, #ff6e84)"
};
function I6(t) {
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
function V6(t) {
  return {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: t.color,
    boxShadow: `0 0 8px ${t.glow}`,
    animation: t.pulse ? `${kL} 1.5s ease-in-out infinite` : "none",
    flexShrink: 0
  };
}
function q6(t, a) {
  return { fontFamily: "var(--font-ui)", fontSize: 10.5, fontWeight: 500, color: a === "queued" ? "var(--on-surface-variant)" : t.color };
}
function H6(t) {
  return { position: "absolute", top: 0, bottom: 0, width: "30%", background: `linear-gradient(90deg, transparent, ${t.color}, transparent)`, animation: `${AL} 1.1s linear infinite` };
}
var F6 = "xq3iim0", P6 = "xq3iim1", G6 = "xq3iim2", Y6 = "xq3iim3", K6 = "xq3iim4", X6 = "xq3iim5", Q6 = "xq3iim6", Z6 = "xq3iim7", J6 = "xq3iim8", W6 = "xq3iim9", e8 = "xq3iima", t8 = "xq3iimb", n8 = "xq3iimc", a8 = "xq3iimd", r8 = "xq3iime", s8 = "xq3iimf", i8 = "xq3iimg", l8 = "xq3iimh", o8 = "xq3iimi", c8 = "xq3iimj", u8 = "xq3iimk", rx = "xq3iiml";
function d8({
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
        await pT(t, Y), s?.(Y);
      } catch (ae) {
        f(I), w(ae instanceof Error ? ae.message : "Failed to update default voice");
      } finally {
        b(!1);
      }
    },
    [t, s, u]
  ), $ = g.useMemo(
    () => i.find((C) => C.voiceAssetId === u) ?? null,
    [i, u]
  ), _ = g.useMemo(() => {
    const C = [], I = [];
    for (const Y of i)
      Y.kind === "speaker" || Y.kind === "mixed" ? C.push(Y) : I.push(Y);
    return { uploaded: C, other: I };
  }, [i]);
  return m ? /* @__PURE__ */ c.jsx("span", { className: rx, children: "Loading voices…" }) : i.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: rx, children: "No voices yet. Upload a reference in Mappings to enable Quick mode." }) : /* @__PURE__ */ c.jsxs("div", { ref: N, className: F6, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: R,
        type: "button",
        className: `${P6} ${S ? G6 : ""}`,
        "aria-haspopup": "listbox",
        "aria-expanded": S,
        disabled: p,
        onClick: () => j((C) => !C),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: Y6, "aria-hidden": "true", children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", children: "graphic_eq" }) }),
          /* @__PURE__ */ c.jsxs("span", { className: K6, children: [
            /* @__PURE__ */ c.jsx("span", { className: X6, children: $ ? $.displayName : "Pick a voice" }),
            /* @__PURE__ */ c.jsx("span", { className: Q6, children: $ ? gw($) : `${i.length} voice${i.length === 1 ? "" : "s"} in library` })
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: Z6, "aria-hidden": "true", children: f8.map((C, I) => /* @__PURE__ */ c.jsx("i", { style: { height: `${C * 100}%` } }, I)) }),
          /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${J6}`, "aria-hidden": "true", children: S ? "expand_less" : "expand_more" })
        ]
      }
    ),
    S && /* @__PURE__ */ c.jsxs(
      "div",
      {
        role: "listbox",
        "aria-label": "Quick mode voice",
        className: W6,
        children: [
          /* @__PURE__ */ c.jsx("div", { className: e8, children: /* @__PURE__ */ c.jsx("span", { className: t8, children: "Select voice" }) }),
          v && /* @__PURE__ */ c.jsx("div", { className: n8, role: "alert", children: v }),
          _.uploaded.length > 0 && /* @__PURE__ */ c.jsx(sx, { label: "Uploaded", children: _.uploaded.map((C) => /* @__PURE__ */ c.jsx(
            ix,
            {
              voice: C,
              selected: u === C.voiceAssetId,
              onSelect: () => void T(C.voiceAssetId)
            },
            C.voiceAssetId
          )) }),
          _.other.length > 0 && /* @__PURE__ */ c.jsx(sx, { label: "Other", children: _.other.map((C) => /* @__PURE__ */ c.jsx(
            ix,
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
function sx({ label: t, children: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: a8, children: [
    /* @__PURE__ */ c.jsx("div", { className: r8, children: t }),
    a
  ] });
}
function ix({ voice: t, selected: a, onSelect: s }) {
  return /* @__PURE__ */ c.jsxs(
    "button",
    {
      type: "button",
      role: "option",
      "aria-selected": a,
      className: `${s8} ${a ? i8 : ""}`,
      onClick: s,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: l8, "aria-hidden": "true" }),
        /* @__PURE__ */ c.jsx("span", { className: o8, children: t.displayName }),
        /* @__PURE__ */ c.jsx("span", { className: c8, children: gw(t) }),
        a && /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${u8}`, "aria-hidden": "true", children: "check" })
      ]
    }
  );
}
const f8 = [0.35, 0.7, 0.5, 0.85, 0.45, 0.6, 0.32, 0.78, 0.4, 0.55, 0.7, 0.36];
function gw(t) {
  const a = [];
  return t.durationMs != null && a.push(h8(t.durationMs)), t.sampleRate != null && a.push(`${(t.sampleRate / 1e3).toFixed(1)} kHz`), t.kind && t.kind !== "speaker" && a.push(t.kind), a.length > 0 ? a.join(" · ") : "—";
}
function h8(t) {
  const a = t / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const s = Math.floor(a / 60), i = Math.round(a - s * 60);
  return `${s}:${i.toString().padStart(2, "0")}`;
}
const lx = [
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
function m8(t) {
  const a = ti(), s = g.useRef(null), { tokens: i, attributions: o, unresolved: u, predictedFilenames: f, characterColor: m } = g.useMemo(
    () => g8(t.value, t.outputFormat, t.mappings),
    [t.value, t.outputFormat, t.mappings]
  ), y = (b) => {
    const v = s.current;
    v && (v.scrollTop = b.currentTarget.scrollTop, v.scrollLeft = b.currentTarget.scrollLeft);
  }, p = t.quickMode === !0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: p ? n_ : WR, children: [
      !p && /* @__PURE__ */ c.jsx("div", { ref: s, className: e_, "aria-hidden": "true", children: i.map((b, v) => p8(b, v, m)) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: p ? a_ : t_,
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
        Qe,
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
      /* @__PURE__ */ c.jsx("span", { className: Gr, children: "Parsed lines" }),
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
      /* @__PURE__ */ c.jsx("span", { className: Gr, children: "Predicted filenames" }),
      /* @__PURE__ */ c.jsx("ul", { className: m0, children: f.map((b) => /* @__PURE__ */ c.jsx("li", { children: b }, b)) })
    ] })
  ] });
}
function p8(t, a, s) {
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
  const i = s.get(t.character?.toLowerCase() ?? "") ?? "currentColor", o = t.hasMapping ? f0 : `${f0} ${r_}`;
  return /* @__PURE__ */ c.jsxs("span", { children: [
    /* @__PURE__ */ c.jsxs("span", { className: o, style: { color: i }, children: [
      "[",
      t.character,
      t.override && /* @__PURE__ */ c.jsxs("span", { className: s_, children: [
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
function g8(t, a, s) {
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
    let $ = "Narrator", _ = N, C, I = !1;
    if (T?.groups) {
      I = !0;
      const V = (T.groups.body ?? "").trim(), D = (T.groups.rest ?? "").trim();
      $ = ((V.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", C = (V.includes("|") ? V.slice(V.indexOf("|") + 1) : "").trim() || void 0, _ = D;
    }
    w += 1;
    const Y = $.toLowerCase(), ae = (m.get(Y) ?? 0) + 1;
    m.set(Y, ae);
    const A = $ === "Narrator" || s.has(Y);
    if (A || f.add($), $ !== "Narrator" && !p.has(Y) && (p.set(Y, lx[b % lx.length] ?? "currentColor"), b += 1), I) {
      const V = { kind: "character", raw: S, character: $, text: _, hasMapping: A };
      C !== void 0 && (V.override = C), o.push(V);
    } else
      o.push({ kind: "narrator", raw: S });
    u.push({ lineNumber: R, character: $, text: _, hasMapping: A }), y.push(
      `${w.toString().padStart(3, "0")}_${v8($)}_${ae.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: u,
    unresolved: Array.from(f),
    predictedFilenames: y,
    characterColor: p
  };
}
function v8(t) {
  const a = t.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
const ox = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], vw = 1e-3;
function y8(t) {
  return t.replace(/[\[\]|\r\n]/g, "").trim();
}
function b8() {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `row_${crypto.randomUUID()}` : `row_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}
function x8(t) {
  return t.replace(/[\r\n]/g, " ").trim();
}
function yw(t) {
  return Number.isNaN(t) ? 1 : t < 0 ? 0 : t > 1 ? 1 : t;
}
function bw(t) {
  const a = Math.round(t * 1e3) / 1e3;
  return Number.isInteger(a) ? a.toFixed(1) : String(a);
}
function S8(t) {
  const a = [];
  for (let s = 0; s < ox.length; s += 1) {
    const i = t[s];
    typeof i == "number" && (Math.abs(i) < vw || a.push(`${ox[s]}=${bw(yw(i))}`));
  }
  return a.length === 0 ? null : a.join(",");
}
function w8(t, a) {
  const s = y8(t.character) || "Narrator", i = x8(t.text);
  if (!i) return null;
  const o = [];
  if (t.presetId) {
    const m = a.get(t.presetId);
    if (m) {
      const y = S8(m.vector);
      y && o.push(`emotion_vector:${y}`);
    }
  }
  const u = yw(t.alpha);
  return Math.abs(u - 1) >= vw && o.push(`emotion_alpha:${bw(u)}`), `${o.length > 0 ? `[${s}|${o.join("|")}]` : `[${s}]`} ${i}`;
}
function xw(t, a) {
  const s = /* @__PURE__ */ new Map();
  for (const o of a) s.set(o.presetId, o);
  const i = [];
  for (const o of t) {
    const u = w8(o, s);
    u && i.push(u);
  }
  return i.join(`
`);
}
function Yr() {
  return {
    id: b8(),
    character: "",
    presetId: null,
    alpha: 1,
    text: ""
  };
}
var j8 = "_1827s3t2", E8 = "_1827s3t3", N8 = "_1827s3t4", C8 = "_1827s3t5", T8 = "_1827s3t6", R8 = "_1827s3t7", _8 = "_1827s3t8", M8 = "_1827s3t9", A8 = "_1827s3ta", k8 = "_1827s3tb", D8 = "_1827s3td _1827s3tc", z8 = "_1827s3te _1827s3tc", O8 = "_1827s3tf", L8 = "_1827s3tg", $8 = "_1827s3th", U8 = "_1827s3ti _1827s3tc", B8 = "_1827s3tj", I8 = "_1827s3tk", V8 = "_1827s3tl", q8 = "_1827s3tm", H8 = "_1827s3tn", F8 = "_1827s3to", P8 = "_1827s3tp", G8 = "_1827s3tq", Y8 = "_1827s3tr", K8 = "_1827s3ts", X8 = "_1827s3tt", Q8 = "_1827s3tu";
function Z8({
  rows: t,
  onRowsChange: a,
  presets: s,
  mappingsByLower: i
}) {
  const o = g.useId(), u = g.useId(), f = g.useId(), m = g.useRef(null), y = g.useRef(/* @__PURE__ */ new Map()), p = g.useRef(/* @__PURE__ */ new Map()), b = g.useRef(/* @__PURE__ */ new Map()), [v, w] = g.useState(null), [S, j] = g.useState(!1), N = g.useRef(null), R = g.useRef(null), [T, $] = g.useState(null), [_, C] = g.useState(null), [I, Y] = g.useState("");
  g.useEffect(() => {
    v && (v.kind === "addBtn" ? m.current?.focus() : v.kind === "text" && v.rowId ? y.current.get(v.rowId)?.focus() : v.kind === "remove" && v.rowId ? p.current.get(v.rowId)?.focus() : v.kind === "character" && v.rowId ? b.current.get(v.rowId)?.focus() : v.kind === "unmappedFirstItem" && R.current?.querySelector("button")?.focus(), w(null));
  }, [v]);
  const ae = t.filter((B) => B.text.trim().length > 0).length, A = g.useMemo(() => {
    const B = /* @__PURE__ */ new Map();
    for (const W of t) {
      const ce = W.character.trim(), ye = ce.toLowerCase();
      !ye || ye === "narrator" || i.has(ye) || B.has(ye) || B.set(ye, ce);
    }
    return Array.from(B.values()).sort((W, ce) => W.localeCompare(ce));
  }, [t, i]), V = A.length, D = g.useRef(V), [P, J] = g.useState(0);
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
  const Q = g.useMemo(() => {
    const B = /* @__PURE__ */ new Set();
    return i.forEach((W) => B.add(W.characterName)), Array.from(B).sort((W, ce) => W.localeCompare(ce));
  }, [i]), G = g.useCallback(
    (B, W) => {
      a(t.map((ce) => ce.id === B ? { ...ce, ...W } : ce));
    },
    [t, a]
  ), ie = g.useRef(t);
  g.useEffect(() => {
    ie.current = t;
  }, [t]);
  const M = g.useCallback(
    (B) => {
      const W = t.findIndex((He) => He.id === B);
      if (W < 0) return;
      const ce = t[W];
      if (!ce) return;
      const ye = W > 0 ? t[W - 1]?.id ?? null : null, Me = t.filter((He) => He.id !== B);
      a(Me);
      const st = ce.character.trim() || `Line ${W + 1}`;
      pn(`Removed ${st}`, {
        action: {
          label: "Undo",
          onClick: () => {
            const He = ie.current;
            if (He.some((Bt) => Bt.id === ce.id)) return;
            const Ve = [...He], Ke = ye ? He.findIndex((Bt) => Bt.id === ye) : -1, Ft = Ke >= 0 ? Ke + 1 : 0;
            Ve.splice(Ft, 0, ce), a(Ve);
          }
        },
        duration: 5e3
      });
      const Te = `Removed line ${W + 1}, now ${Me.length} ${Me.length === 1 ? "line" : "lines"}`;
      if (Y((He) => He === Te ? `${Te}​` : Te), Me.length === 0)
        w({ kind: "addBtn" });
      else {
        const He = W < Me.length ? W : Me.length - 1, Ve = Me[He];
        w(Ve ? { kind: "remove", rowId: Ve.id } : { kind: "addBtn" });
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
      const ce = t.findIndex((Ke) => Ke.id === B);
      if (ce < 0) return;
      const ye = ce + W;
      if (ye < 0 || ye >= t.length) return;
      const Me = [...t], st = Me[ce], Te = Me[ye];
      if (!st || !Te) return;
      Me[ce] = Te, Me[ye] = st, a(Me);
      const Ve = `Moved ${st.character.trim() || `Line ${ce + 1}`} to position ${ye + 1} of ${Me.length}`;
      Y((Ke) => Ke === Ve ? `${Ve}​` : Ve);
    },
    [t, a]
  ), se = g.useCallback(
    (B, W) => {
      B.key === "Enter" && !B.shiftKey ? (B.preventDefault(), F(W)) : B.altKey && B.key === "ArrowUp" ? (B.preventDefault(), U(W, -1)) : B.altKey && B.key === "ArrowDown" && (B.preventDefault(), U(W, 1));
    },
    [F, U]
  ), de = g.useCallback((B, W) => {
    $(W), B.dataTransfer.effectAllowed = "move", B.dataTransfer.setData("text/plain", W);
  }, []), k = g.useCallback((B, W) => {
    T && (B.preventDefault(), B.dataTransfer.dropEffect = "move", _ !== W && C(W));
  }, [T, _]), ee = g.useCallback(
    (B, W) => {
      B.preventDefault();
      const ce = T ?? B.dataTransfer.getData("text/plain");
      if ($(null), C(null), !ce || ce === W) return;
      const ye = t.findIndex((Ke) => Ke.id === ce), Me = t.findIndex((Ke) => Ke.id === W);
      if (ye < 0 || Me < 0) return;
      const st = [...t], [Te] = st.splice(ye, 1);
      if (!Te) return;
      st.splice(Me, 0, Te), a(st);
      const Ve = `Moved ${Te.character.trim() || `Line ${ye + 1}`} to position ${Me + 1} of ${st.length}`;
      Y((Ke) => Ke === Ve ? `${Ve}​` : Ve);
    },
    [t, a, T]
  ), re = g.useCallback(() => {
    $(null), C(null);
  }, []), K = g.useCallback(
    (B) => {
      const W = t.find((ce) => ce.character.trim().toLowerCase() === B.toLowerCase());
      W && w({ kind: "character", rowId: W.id }), j(!1);
    },
    [t]
  );
  return /* @__PURE__ */ c.jsxs("section", { className: j8, "aria-labelledby": u, children: [
    /* @__PURE__ */ c.jsxs("header", { className: E8, children: [
      /* @__PURE__ */ c.jsxs("span", { className: N8, id: u, children: [
        "02 / Per-character lines",
        t.length > 1 && /* @__PURE__ */ c.jsx("span", { className: X8, children: "· Alt+↑↓ to reorder" })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: C8, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: T8, children: ae.toString().padStart(2, "0") }),
        " lines",
        V > 0 && /* @__PURE__ */ c.jsxs("span", { className: I8, children: [
          /* @__PURE__ */ c.jsxs(
            "button",
            {
              ref: N,
              type: "button",
              className: Q8,
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
              className: V8,
              children: [
                /* @__PURE__ */ c.jsx("p", { className: q8, children: "These characters have no voice mapping. Click a name to jump to its row." }),
                /* @__PURE__ */ c.jsx("ul", { className: H8, children: A.map((B) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsx(
                  "button",
                  {
                    type: "button",
                    className: F8,
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
    t.length === 0 ? /* @__PURE__ */ c.jsx("p", { className: Y8, children: "No lines yet — add a character line to start. Each row produces one utterance." }) : /* @__PURE__ */ c.jsx("ul", { className: R8, children: t.map((B, W) => {
      const ce = B.character.trim() || `line ${W + 1}`, ye = i.has(B.character.trim().toLowerCase()), Me = T === B.id, st = _ === B.id && T !== B.id;
      return /* @__PURE__ */ c.jsxs(
        "li",
        {
          className: _8,
          "data-mapped": ye || void 0,
          "data-dragging": Me || void 0,
          "data-drag-over": st || void 0,
          onDragOver: (Te) => k(Te, B.id),
          onDrop: (Te) => ee(Te, B.id),
          onDragEnd: re,
          children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: M8,
                draggable: !0,
                "aria-label": `Drag to reorder ${ce}. Use Alt+ArrowUp / Alt+ArrowDown for keyboard reorder.`,
                title: "Drag to reorder · Alt+↑ / Alt+↓",
                onDragStart: (Te) => de(Te, B.id),
                onKeyDown: (Te) => {
                  Te.altKey && Te.key === "ArrowUp" ? (Te.preventDefault(), U(B.id, -1)) : Te.altKey && Te.key === "ArrowDown" && (Te.preventDefault(), U(B.id, 1));
                },
                children: "⋮⋮"
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: k8, "aria-hidden": "true", children: (W + 1).toString().padStart(2, "0") }),
            /* @__PURE__ */ c.jsx(
              "input",
              {
                ref: (Te) => {
                  Te ? b.current.set(B.id, Te) : b.current.delete(B.id);
                },
                type: "text",
                value: B.character,
                onChange: (Te) => G(B.id, { character: Te.target.value }),
                placeholder: "Character",
                className: D8,
                "aria-label": `Character name for ${ce}`,
                list: Q.length > 0 ? o : void 0,
                autoComplete: "off",
                spellCheck: !1
              }
            ),
            /* @__PURE__ */ c.jsxs(
              "select",
              {
                value: B.presetId ?? "",
                onChange: (Te) => G(B.id, { presetId: Te.target.value === "" ? null : Te.target.value }),
                className: z8,
                "aria-label": `Emotion preset for ${ce}`,
                children: [
                  /* @__PURE__ */ c.jsx("option", { value: "", children: "No emotion" }),
                  s.map((Te) => /* @__PURE__ */ c.jsx("option", { value: Te.presetId, children: Te.presetName }, Te.presetId))
                ]
              }
            ),
            /* @__PURE__ */ c.jsxs("span", { className: O8, children: [
              /* @__PURE__ */ c.jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 1,
                  step: 0.05,
                  value: B.alpha,
                  onChange: (Te) => G(B.id, { alpha: Number.parseFloat(Te.target.value) }),
                  className: L8,
                  "aria-label": `Emotion intensity for ${ce}`,
                  "aria-valuetext": `${Math.round(B.alpha * 100)} percent`
                }
              ),
              /* @__PURE__ */ c.jsx(
                "span",
                {
                  className: $8,
                  "aria-hidden": "true",
                  "data-hot": B.alpha >= 0.85 || void 0,
                  children: (Math.round(B.alpha * 100) / 100).toFixed(2)
                }
              )
            ] }),
            /* @__PURE__ */ c.jsx(
              "input",
              {
                ref: (Te) => {
                  Te ? y.current.set(B.id, Te) : y.current.delete(B.id);
                },
                type: "text",
                value: B.text,
                onChange: (Te) => G(B.id, { text: Te.target.value }),
                onKeyDown: (Te) => se(Te, B.id),
                placeholder: "Line text…",
                className: U8,
                "aria-label": `Line text for ${ce}`
              }
            ),
            /* @__PURE__ */ c.jsx(
              "button",
              {
                ref: (Te) => {
                  Te ? p.current.set(B.id, Te) : p.current.delete(B.id);
                },
                type: "button",
                className: B8,
                "aria-label": `Remove ${ce}`,
                title: "Remove this line",
                onClick: () => M(B.id),
                children: "✕"
              }
            ),
            W < t.length - 1 && /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: A8,
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
        className: P8,
        onClick: () => F(null),
        "aria-label": "Add character line",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: G8, "aria-hidden": "true", children: "＋" }),
          "Add line"
        ]
      }
    ),
    Q.length > 0 && /* @__PURE__ */ c.jsx("datalist", { id: o, children: Q.map((B) => /* @__PURE__ */ c.jsx("option", { value: B }, B)) }),
    /* @__PURE__ */ c.jsx("div", { className: K8, role: "status", "aria-live": "polite", "aria-atomic": "true", children: I })
  ] });
}
var J8 = "fmg0gf0", W8 = "fmg0gf1", cx = { idle: "fmg0gf3 fmg0gf2", active: "fmg0gf4 fmg0gf2" };
const Hs = [
  { id: "quick", label: "Quick", glyph: "01", description: "Single voice · plain prose" },
  { id: "rows", label: "Per-character", glyph: "02", description: "One row per line · multi-voice" },
  { id: "story", label: "Story", glyph: "03", description: "Free-form text with @character and /emotion commands" },
  { id: "storyboard", label: "Storyboard", glyph: "04", description: "Click words to cast voice + emotion in bulk · shift-click to extend a range" }
], e$ = Hs;
function t$({
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
  return /* @__PURE__ */ c.jsx("div", { className: J8, role: "radiogroup", "aria-label": "Editor mode", children: Hs.map((f, m) => {
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
        className: y ? cx.active : cx.idle,
        onClick: () => {
          p || a(f.id);
        },
        onKeyDown: (v) => u(v, m),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: W8, "aria-hidden": "true", children: f.glyph }),
          /* @__PURE__ */ c.jsx("span", { children: b })
        ]
      },
      f.id
    );
  }) });
}
const n$ = [
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
function a$(t, a) {
  const s = t.ownerDocument;
  if (!s) return { top: 0, left: 0, height: 0 };
  const i = s.createElement("div"), o = s.defaultView?.getComputedStyle(t);
  if (!o) return { top: 0, left: 0, height: 0 };
  const u = i.style, f = o;
  for (const N of n$) {
    const R = f[N];
    typeof R == "string" && (u[N] = R);
  }
  i.style.position = "absolute", i.style.visibility = "hidden", i.style.overflow = "hidden", i.style.top = "0", i.style.left = "-9999px", i.style.whiteSpace = "pre-wrap", i.style.wordWrap = "break-word";
  const m = t.value.slice(0, a), y = s.createTextNode(m.replace(/ /g, " ")), p = s.createElement("span");
  p.textContent = t.value.slice(a, a + 1) || ".", i.appendChild(y), i.appendChild(p), s.body.appendChild(i);
  const b = p.getBoundingClientRect(), v = i.getBoundingClientRect(), w = b.top - v.top - t.scrollTop, S = b.left - v.left - t.scrollLeft, j = b.height || parseFloat(o.lineHeight) || 16;
  return s.body.removeChild(i), { top: w, left: S, height: j };
}
const Sw = {
  character: "@",
  emotion: "/"
}, ww = /* @__PURE__ */ new Set([" ", "	", `
`, "\r"]), r$ = /[\p{L}\p{N}_-]/u, s$ = /[^\p{L}\p{N}_-]+/gu;
function jw(t) {
  return t ? r$.test(t) : !1;
}
function i$(t) {
  return t.replace(s$, "_").replace(/_+/g, "_").replace(/^[_-]+|[_-]+$/g, "");
}
function l$(t, a) {
  if (a >= t.length) return 0;
  const s = t.charCodeAt(a);
  if (s >= 55296 && s <= 56319 && a + 1 < t.length) {
    const i = t.charCodeAt(a + 1);
    if (i >= 56320 && i <= 57343) return 2;
  }
  return 1;
}
function $c(t, a) {
  const s = l$(t, a);
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
    const f = t[i], m = f === "@" || f === "/", y = i === 0 ? "" : $c(t, jc(t, i)), p = i === 0 || y !== "" && ww.has(y);
    if (m && p) {
      let b = i + 1, v = "";
      for (; b < o; ) {
        const w = $c(t, b);
        if (w && jw(w))
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
function o$(t, a) {
  if (a <= 0 || a > t.length) return null;
  let s = jc(t, a), i = "";
  for (; s >= 0; ) {
    const o = $c(t, s);
    if (!o) break;
    if (o === "@" || o === "/") {
      const f = s === 0 ? "" : $c(t, jc(t, s));
      return s === 0 || f !== "" && ww.has(f) ? {
        kind: o === "@" ? "character" : "emotion",
        start: s,
        query: i
      } : null;
    }
    if (!jw(o)) return null;
    i = o + i;
    const u = jc(t, s);
    if (u < 0) break;
    s = u;
  }
  return null;
}
var c$ = "_1d2ofoy5", u$ = "_1d2ofoy6", d$ = "_1d2ofoy8 _1d2ofoy7", f$ = "_1d2ofoy9 _1d2ofoy7", h$ = "_1d2ofoya", m$ = "_1d2ofoyb", p$ = "_1d2ofoyc", g$ = "_1d2ofoye", v$ = "_1d2ofoyf", y$ = "_1d2ofoyg", b$ = "_1d2ofoyh", x$ = "_1d2ofoyi", S$ = "_1d2ofoyj", lc = "_1d2ofoyk", w$ = "_1d2ofoyl";
const j$ = `Type @character to set the speaker, /emotion to set the emotion preset.

@bob /happy I love mornings!
@alice /melancholic I prefer evenings.`;
function E$({
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
      return w.filter((Q) => Q.toLowerCase().includes(D)).slice(0, 8).map((Q) => {
        const G = o.get(Q.toLowerCase());
        return { value: Q, hint: G ? "mapped" : "unmapped" };
      });
    const P = /* @__PURE__ */ new Set(), J = [];
    for (const Q of i) {
      const G = Q.presetName.toLowerCase();
      if (G.includes(D) && !P.has(G) && (P.add(G), J.push({ value: Q.presetName, hint: "vector" }), J.length >= 8))
        break;
    }
    return J;
  }, [p, w, o, i]), j = g.useCallback((D, P, J) => {
    if (P < 0) return null;
    const Q = o$(D, P);
    if (!Q) return null;
    const G = u.current, ie = G ? a$(G, P) : { top: 0, left: 0, height: 0 };
    return {
      triggerStart: Q.start,
      query: Q.query,
      kind: Q.kind,
      selected: J && J.kind === Q.kind ? J.selected : 0,
      caretTop: ie.top,
      caretLeft: ie.left,
      caretHeight: ie.height
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
        const Q = J.selectionStart;
        if (Q !== J.selectionEnd) {
          b(null);
          return;
        }
        b((G) => j(P, Q, G));
      });
    },
    [a, j]
  ), T = g.useCallback(() => {
    N();
  }, [N]), $ = g.useCallback(
    (D, P) => {
      if (!p) return;
      const J = Sw[p.kind], Q = p.triggerStart + 1 + p.query.length, G = t.slice(0, p.triggerStart), ie = t.slice(Q), M = i$(D);
      if (!M) return;
      const F = `${J}${M} `, U = `${G}${F}${ie}`;
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
            P && (D.preventDefault(), $(P.value, { advanceFocus: !1 }));
          } else if (D.key === "Tab") {
            const P = S[p.selected];
            P && $(P.value, { advanceFocus: !0 });
          }
        }
      }
    },
    [p, S, $]
  ), C = g.useRef(null), [I, Y] = g.useState(null);
  g.useLayoutEffect(() => {
    if (!p) {
      Y(null);
      return;
    }
    const D = C.current, P = u.current;
    if (!D || !P) return;
    const J = D.offsetWidth, Q = P.clientWidth, G = Math.max(0, Q - J - 8), ie = Math.max(0, p.caretLeft);
    Y(Math.min(ie, G));
  }, [p]);
  const ae = p?.kind === "character" ? "Character" : "Emotion preset", A = p && S.length > 0 ? `${y}-${p.selected}` : void 0, V = !p || S.length > 0 ? null : p.kind === "emotion" ? i.length === 0 ? "No emotion presets yet — create one in Mappings." : `No preset matches "${p.query}". Type a different name or pick from Mappings.` : p.query.length === 0 ? "Type a name — we'll create a new character on the fly." : `No character "${p.query}" yet — keep typing to define a new one.`;
  return /* @__PURE__ */ c.jsxs("div", { className: c$, children: [
    /* @__PURE__ */ c.jsxs("div", { className: u$, children: [
      /* @__PURE__ */ c.jsx("div", { ref: f, className: d$, "aria-hidden": "true", children: N$(v, p?.triggerStart ?? null) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          ref: u,
          className: f$,
          value: t,
          onChange: R,
          onSelect: T,
          onKeyDown: _,
          placeholder: j$,
          rows: 10,
          spellCheck: !0,
          "aria-label": "Story script",
          "aria-controls": p && S.length > 0 ? m : void 0,
          "aria-autocomplete": "list",
          "aria-activedescendant": A
        }
      ),
      p && (S.length > 0 || V) && /* @__PURE__ */ c.jsxs(
        "div",
        {
          ref: C,
          className: g$,
          style: {
            top: `${p.caretTop + p.caretHeight + 6}px`,
            left: `${I ?? Math.max(0, p.caretLeft)}px`
          },
          children: [
            /* @__PURE__ */ c.jsx("div", { className: v$, "aria-hidden": "true", children: ae }),
            S.length > 0 ? /* @__PURE__ */ c.jsx(
              "ul",
              {
                id: m,
                role: "listbox",
                "aria-label": ae,
                className: y$,
                children: S.map((D, P) => {
                  const J = `${y}-${P}`, Q = P === p.selected;
                  return /* @__PURE__ */ c.jsxs(
                    "li",
                    {
                      id: J,
                      role: "option",
                      "aria-selected": Q,
                      "data-active": Q || void 0,
                      className: b$,
                      onMouseDown: (G) => {
                        G.preventDefault(), $(D.value, { advanceFocus: !1 });
                      },
                      children: [
                        /* @__PURE__ */ c.jsx("span", { children: D.value }),
                        D.hint && /* @__PURE__ */ c.jsx("span", { className: x$, children: D.hint })
                      ]
                    },
                    `${D.value}-${P}`
                  );
                })
              }
            ) : /* @__PURE__ */ c.jsx("div", { id: m, role: "status", className: w$, children: V })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: S$, children: [
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
function N$(t, a) {
  return t.map((s, i) => {
    if (s.kind === "text")
      return /* @__PURE__ */ c.jsx("span", { className: h$, children: s.value }, `${s.start}-${i}`);
    const o = s.kind, u = a !== null && s.start === a, f = s.value.replace(/_/g, " ");
    return /* @__PURE__ */ c.jsxs(
      "span",
      {
        className: p$,
        "data-kind": o,
        "data-active": u ? "true" : void 0,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: m$, children: Sw[o] }),
          f
        ]
      },
      `${s.start}-${i}`
    );
  });
}
var C$ = "_5o8xvy0", T$ = "_5o8xvy1", R$ = "_5o8xvy2", _$ = "_5o8xvy3", Gf = "_5o8xvy4", M$ = "_5o8xvy5", A$ = "_3f2ar0", k$ = "_3f2ar1", D$ = "_3f2ar2", z$ = "_3f2ar3", O$ = "_3f2ar4", L$ = "_3f2ar6", sl = "_3f2ar7", il = "_3f2ar8", ll = "_3f2ar9", ux = "_3f2ara", dx = "_3f2arb";
function $$({ label: t, glyph: a = "?", children: s }) {
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
  }, [i, y]), /* @__PURE__ */ c.jsxs("span", { ref: u, className: A$, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        id: f,
        className: k$,
        "aria-expanded": i,
        "aria-controls": m,
        onClick: () => o((p) => !p),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: D$, "aria-hidden": "true", children: a }),
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
        className: z$,
        children: s
      }
    )
  ] });
}
var U$ = "_1dxb1dg0", fx = "_1dxb1dg1", B$ = "_1dxb1dg2", I$ = "_1dxb1dg3", V$ = "_1dxb1dg4";
function q$() {
  return /* @__PURE__ */ c.jsxs($$, { label: "Syntax", glyph: "?", children: [
    /* @__PURE__ */ c.jsx("h3", { className: O$, children: "Script syntax" }),
    /* @__PURE__ */ c.jsxs("ul", { className: L$, children: [
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
    /* @__PURE__ */ c.jsxs("p", { className: ux, children: [
      /* @__PURE__ */ c.jsx("span", { className: dx, children: "Quick mode" }),
      ": when enabled no [Char] tags are required — every line uses the deployment's default voice. Toggle it above the editor."
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: ux, children: [
      /* @__PURE__ */ c.jsx("span", { className: dx, children: "Mappings" }),
      ": assign characters to voices in the Cast section below. Unmapped characters in non-quick mode trigger a pre-flight warning."
    ] })
  ] });
}
function H$() {
  return /* @__PURE__ */ c.jsxs("ul", { className: U$, children: [
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: fx, children: "[Char]" }),
      " plain line"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: fx, children: "[Char|emotion_vector:happy=0.7]" }),
      " per-line vector"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: B$, children: "[Char|qwen:warm]" }),
      " AI prompt mapping"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: I$, children: "[Char|preset:Bittersweet]" }),
      " saved preset"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: V$, children: "[Char|audio:slow_breath.wav]" }),
      " audio reference"
    ] })
  ] });
}
function F$({
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
  jobProgress: $
}) {
  const _ = t === "quick", C = t === "rows", I = t === "story", Y = t === "storyboard", ae = I || Y, A = e$.find((Q) => Q.id === t)?.description ?? "", V = C ? u.reduce((Q, G) => Q + G.text.length, 0) : ae ? m.length : i.length, D = C ? u.map((Q) => Q.text).join(" ") : ae ? m : i, P = D.trim() ? D.trim().split(/\s+/).length : 0, J = C ? u.filter((Q) => Q.text.trim().length > 0).length : (ae ? m : i).trim() ? (ae ? m : i).trim().split(/\r?\n/).filter((Q) => Q.trim()).length : 0;
  return /* @__PURE__ */ c.jsxs("div", { className: C$, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: `${T$} ${_ ? R$ : ""}`,
        "data-quick-on": _ || void 0,
        children: [
          /* @__PURE__ */ c.jsx(t$, { value: t, onChange: a }),
          _ && /* @__PURE__ */ c.jsx(
            d8,
            {
              deploymentId: s.deploymentId,
              initialVoiceAssetId: w,
              onChange: S
            }
          ),
          /* @__PURE__ */ c.jsxs("div", { className: _$, "aria-live": "polite", children: [
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
            !C && /* @__PURE__ */ c.jsx(q$, {})
          ] })
        ]
      }
    ),
    /* @__PURE__ */ c.jsx("p", { className: M$, "aria-live": "polite", children: A }),
    Y ? /* @__PURE__ */ c.jsx(
      C6,
      {
        voiceAssets: N,
        presets: j,
        storyText: m,
        onStoryTextChange: y,
        mappings: v,
        onQueueChange: R,
        onJobsChange: T,
        jobProgress: $
      }
    ) : C ? /* @__PURE__ */ c.jsx(
      Z8,
      {
        rows: u,
        onRowsChange: f,
        presets: j,
        mappingsByLower: v
      }
    ) : I ? /* @__PURE__ */ c.jsx(
      E$,
      {
        value: m,
        onChange: y,
        characters: p,
        presets: j,
        mappingsByLower: v
      }
    ) : /* @__PURE__ */ c.jsx(
      m8,
      {
        value: i,
        onChange: o,
        outputFormat: b,
        mappings: v,
        deploymentId: s.deploymentId,
        quickMode: _
      }
    ),
    !_ && !C && !I && !Y && /* @__PURE__ */ c.jsx(H$, {})
  ] });
}
function P$({
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
function hx(t, a) {
  return t === "quick" ? a.script.trim().length > 0 : t === "rows" ? a.rows.some((s) => s.text.trim().length > 0 || s.character.trim().length > 0) : a.storyText.trim().length > 0;
}
function G$(t, a, s, i) {
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
    return { script: xw(s.rows, i) };
  if (t === "rows" && a === "story") {
    const o = /* @__PURE__ */ new Map();
    for (const f of i) o.set(f.presetId, f);
    const u = [];
    for (const f of s.rows) {
      const m = f.text.trim();
      if (!m) continue;
      const y = f.character.trim(), p = f.presetId ? o.get(f.presetId) : null, b = [];
      y && b.push(`@${mx(y)}`), p && b.push(`/${mx(p.presetName)}`), b.push(m), u.push(b.join(" "));
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
function mx(t) {
  return t.replace(/[^\p{L}\p{N}_-]/gu, "_");
}
const Yf = [
  "#ba9eff",
  "#9093ff",
  "#ff8439",
  "#22c55e",
  "#ffd34a",
  "#ff7aa8"
], Y$ = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;
function K$(t) {
  const a = [];
  if (!t) return a;
  const s = t.split(/\r?\n/);
  for (let i = 0; i < s.length; i += 1) {
    const u = (s[i] ?? "").trim();
    if (u.length === 0) continue;
    const f = u.match(Y$);
    if (!f || !f.groups) {
      a.push({ idx: i, character: null, text: u, override: null });
      continue;
    }
    const m = f.groups.body ?? "", y = (f.groups.rest ?? "").trim(), [p = "", ...b] = m.split("|"), v = p.trim();
    if (!v) {
      a.push({ idx: i, character: null, text: y || u, override: null });
      continue;
    }
    const w = v.split(":")[0]?.trim() || null, S = b.join("|").trim(), j = S ? X$(S) : null;
    a.push({
      idx: i,
      character: w,
      text: y,
      override: j
    });
  }
  return a;
}
function X$(t) {
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
function Q$(t) {
  const a = /* @__PURE__ */ new Set(), s = [];
  for (const i of t) {
    if (!i.character) continue;
    const o = i.character.toLowerCase();
    a.has(o) || (a.add(o), s.push(i.character));
  }
  return s;
}
function Z$(t) {
  const a = {};
  for (let s = 0; s < t.length; s += 1) {
    const i = t[s];
    i && (a[i] = Yf[s % Yf.length] ?? Yf[0]);
  }
  return a;
}
function J$(t) {
  const a = {};
  for (const s of t)
    s.character && (a[s.character] = (a[s.character] ?? 0) + 1);
  return a;
}
var W$ = "_1snzz30", eU = "_1snzz31", tU = "_1snzz33", nU = "_1snzz34", aU = "_1snzz36", px = "_1snzz3b", gx = "_1snzz3c", vx = "_1snzz3d";
const rU = "ext-action-invoke", sU = "emotion-tts.run";
function iU() {
  if (typeof document > "u") return !1;
  const t = document.querySelector("emotion-tts-app");
  return t ? (t.dispatchEvent(
    new CustomEvent(rU, {
      detail: { id: sU },
      bubbles: !1
    })
  ), !0) : !1;
}
const lU = 4e3;
function oU({ visible: t, canGenerate: a }) {
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
    const se = window.setInterval(U, lU);
    return () => {
      F = !0, window.clearInterval(se);
    };
  }, []), g.useEffect(() => ow((F) => {
    m(!!F.busy);
  }), []);
  const p = g.useCallback(() => {
    K4();
  }, []), b = s?.badge ?? "not_installed", v = b === "ready" || b === "running", w = b === "starting" || b === "installing" || b === "stopping", S = v;
  g.useEffect(() => {
    o && (w || v) && u(!1);
  }, [o, w, v]);
  const j = g.useCallback(() => {
    u(!0), iU();
  }, []), N = v ? "Stop runtime" : w ? "Runtime starting…" : "Start runtime", R = o || w, T = o || w, $ = T ? "transitioning" : v ? "running" : "stopped", _ = !a || f || !S, C = S ? a ? f ? "Generating…" : "Generate" : "Add a script to generate" : "Start runtime to generate", I = S && a && !f, Y = v ? "ready" : w || o ? "busy" : "off", ae = v ? "Runtime ready" : w ? "Starting…" : o ? "Working…" : "Runtime off", A = Y === "busy";
  if (typeof document > "u") return /* @__PURE__ */ c.jsx(c.Fragment, {});
  const V = "rgba(28, 30, 34, 0.94)", D = "#ba9eff", P = "#8455ef", J = "#1a0a3a", Q = "#f0f0f3", G = "#aaabae", ie = "#22c55e", M = v ? "◼" : "⏻";
  return Zh.createPortal(
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: W$,
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
              className: eU,
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
                color: Y === "ready" ? ie : Y === "busy" ? D : G,
                background: "rgba(255, 255, 255, 0.04)",
                boxShadow: `inset 0 0 0 1px ${Y === "ready" ? "rgba(34, 197, 94, 0.4)" : Y === "busy" ? "rgba(186, 158, 255, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                whiteSpace: "nowrap"
              },
              children: [
                /* @__PURE__ */ c.jsx(
                  "span",
                  {
                    className: tU,
                    "data-pulse": A ? "true" : "false",
                    "aria-hidden": "true",
                    style: {
                      width: "6px",
                      height: "6px",
                      borderRadius: "999px",
                      background: "currentColor",
                      boxShadow: Y === "ready" ? `0 0 8px ${ie}` : Y === "busy" ? `0 0 8px ${D}` : "none",
                      flexShrink: 0
                    }
                  }
                ),
                ae
              ]
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: gx, children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: nU,
                "data-state": $,
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
                  background: $ === "running" ? "rgba(34, 197, 94, 0.18)" : "rgba(255, 255, 255, 0.05)",
                  color: $ === "running" ? ie : Q,
                  fontSize: "16px",
                  cursor: R ? "not-allowed" : "pointer",
                  opacity: R ? 0.6 : 1,
                  boxShadow: `inset 0 0 0 1px ${$ === "running" ? "rgba(34, 197, 94, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                  transition: "background 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease"
                },
                children: T ? /* @__PURE__ */ c.jsx("span", { className: px, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: M })
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: vx, role: "tooltip", children: N })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: gx, children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: aU,
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
                  f ? /* @__PURE__ */ c.jsx("span", { className: px, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { style: { fontSize: "11px" }, "aria-hidden": "true", children: "▶" }),
                  /* @__PURE__ */ c.jsx("span", { children: f ? "Running" : "Generate" })
                ]
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: vx, role: "tooltip", children: C })
          ] })
        ]
      }
    ),
    document.body
  );
}
function cU(t) {
  const a = t.workflowCustomised ?? !1, s = t.unmappableFields ?? [], i = uU(t.deployment.displayName, t.deployment.deploymentId), o = dw(fw), u = t.canGenerate ?? !1;
  return /* @__PURE__ */ c.jsxs("div", { className: DR, children: [
    /* @__PURE__ */ c.jsxs("header", { className: zR, children: [
      /* @__PURE__ */ c.jsx("div", { className: LR, children: "EmotionTTS · Recipe Studio" }),
      /* @__PURE__ */ c.jsx("div", { className: OR, children: /* @__PURE__ */ c.jsx("h1", { className: $R, children: i }) }),
      /* @__PURE__ */ c.jsx("p", { className: UR, children: "Author the script, cast the voices, sculpt the emotion, and modulate every utterance — all from a single screen, with cache-bound previews and a non-destructive edit chain." }),
      t.hero
    ] }),
    a && /* @__PURE__ */ c.jsxs(kn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("strong", { children: "Workflow customised." }),
      " ",
      s.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${s.join(", ")}.`,
      " ",
      /* @__PURE__ */ c.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    t.quickActions && /* @__PURE__ */ c.jsx("div", { className: XR, "aria-label": "Quick actions", children: t.quickActions }),
    t.recentGenerations,
    /* @__PURE__ */ c.jsxs("div", { className: BR, children: [
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
    /* @__PURE__ */ c.jsx(oU, { visible: o, canGenerate: u }),
    typeof document < "u" && Zh.createPortal(
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: QR,
          "data-visible": o ? "true" : "false",
          "aria-label": "Scroll to top",
          title: "Scroll to top",
          onClick: $O,
          children: "↑"
        }
      ),
      document.body
    )
  ] });
}
function uU(t, a) {
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
  return /* @__PURE__ */ c.jsxs("section", { className: IR, "aria-labelledby": s, children: [
    /* @__PURE__ */ c.jsx("header", { className: VR, children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: FR,
        "aria-expanded": !f,
        "aria-controls": y,
        onClick: () => m((p) => !p),
        children: [
          /* @__PURE__ */ c.jsxs("span", { className: qR, children: [
            /* @__PURE__ */ c.jsx("span", { className: PR, children: t }),
            /* @__PURE__ */ c.jsx("span", { className: GR, "aria-hidden": "true", children: "/" }),
            /* @__PURE__ */ c.jsx("span", { className: YR, children: a })
          ] }),
          /* @__PURE__ */ c.jsx("h2", { id: s, className: HR, children: a }),
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: KR,
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
        className: i === "split" ? JR : ZR,
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
function dU(t) {
  try {
    const a = JSON.parse(t);
    return typeof a == "object" && a !== null ? a : {};
  } catch {
    return {};
  }
}
function fU(t) {
  const a = {};
  for (const s of Object.keys(t))
    s !== Ah && (a[s] = t[s]);
  return a;
}
function hU() {
  const { deployment: t, mappings: a, runs: s, workflow: i } = Tl(), [o, u] = g.useState(a), [f, m] = g.useState([]), [y, p] = g.useState([]), [b, v] = g.useState(null), [w, S] = g.useState(Yc), j = g.useMemo(
    () => t.defaultGenerationOverridesJson ? dU(t.defaultGenerationOverridesJson) : {},
    [t.defaultGenerationOverridesJson]
  ), N = g.useMemo(() => {
    const fe = j[Ah];
    return typeof fe == "object" && fe !== null ? fe : {};
  }, [j]), [R, T] = g.useState(""), [$, _] = g.useState(
    t.defaultOutputFormat ?? "mp3"
  ), [C, I] = g.useState(t.defaultSpeedFactor ?? 1), [Y, ae] = g.useState({
    mode: "none",
    emotionAlpha: 1
  }), [A, V] = g.useState(() => ({
    temperature: 0.8,
    top_p: 0.8,
    seed: 42,
    ...fU(j)
  })), [D, P] = g.useState(() => {
    const fe = N.cachePolicy;
    return fe === "use_cache" || fe === "force_regenerate" || fe === "read_only_cache" ? fe : "use_cache";
  }), [J, Q] = g.useState(
    t.defaultVoiceAssetId ?? null
  ), [G, ie] = g.useState(() => {
    const fe = N.editorMode;
    return fe === "quick" || fe === "rows" || fe === "story" || fe === "storyboard" ? fe : typeof N.quickMode == "boolean" || t.defaultVoiceAssetId != null ? "quick" : "rows";
  }), M = G === "quick", [F, U] = g.useState(() => [Yr()]), se = 1e5, [de, k] = g.useState(() => {
    const fe = N.storyText;
    return typeof fe == "string" ? fe : "";
  }), ee = g.useRef(!1), re = g.useCallback((fe) => {
    fe.length > se && !ee.current && (ee.current = !0, yn.error(
      `Story text is over ${Math.round(se / 1e3)} KB — large scripts may slow down save and rendering.`
    )), fe.length <= se && (ee.current = !1), k(fe);
  }, []), [K, B] = g.useState(k5), [W, ce] = g.useState([]), [ye, Me] = g.useState([]), [st, Te] = g.useState(
    () => /* @__PURE__ */ new Map()
  ), He = g.useRef(R), Ve = g.useRef(F), Ke = g.useRef(de), Ft = g.useRef(y);
  g.useEffect(() => {
    He.current = R;
  }, [R]), g.useEffect(() => {
    Ve.current = F;
  }, [F]), g.useEffect(() => {
    Ke.current = de;
  }, [de]), g.useEffect(() => {
    Ft.current = y;
  }, [y]);
  const [Bt, we] = g.useState(""), tt = g.useCallback(
    (fe) => {
      ie((Ae) => {
        if (fe === Ae) return Ae;
        const ge = {
          script: He.current,
          rows: Ve.current,
          storyText: Ke.current
        }, O = hx(fe, ge), he = hx(Ae, ge);
        if (!O && he) {
          const be = G$(Ae, fe, ge, Ft.current);
          if (be) {
            const ze = { ...ge }, Ue = document.activeElement;
            be.script !== void 0 && T(be.script), be.rows !== void 0 && U(be.rows), be.storyText !== void 0 && re(be.storyText);
            const it = {
              quick: "Quick",
              rows: "Per-character",
              story: "Story",
              storyboard: "Storyboard"
            }, Vt = (ve) => ve.split(/\r?\n/).filter((xe) => xe.trim().length > 0).length, lt = be.rows !== void 0 ? be.rows.length : be.script !== void 0 ? Vt(be.script) : be.storyText !== void 0 ? Vt(be.storyText) : 0, z = lt === 1 ? "line" : "lines", H = lt > 0 ? ` (${lt} ${z})` : "", Z = `Switched to ${it[fe]} mode${lt > 0 ? `, ${lt} ${z}` : ""}.`;
            we((ve) => ve === Z ? `${Z}​` : Z), pn(`Switched to ${it[fe]}${H} — content kept`, {
              action: {
                label: "Undo",
                onClick: () => {
                  T(ze.script), U([...ze.rows]), re(ze.storyText), ie(Ae), Ue && typeof Ue.focus == "function" && requestAnimationFrame(() => Ue.focus());
                }
              },
              duration: 5e3
            });
          }
        }
        return fe;
      });
    },
    [re]
  );
  g.useEffect(() => {
    let fe = !1;
    return Qs(t.deploymentId).then((Ae) => {
      fe || m(Ae.voiceAssets);
    }).catch(() => {
    }), hM(t.deploymentId).then((Ae) => {
      fe || p(
        [...Ae.presets].sort((ge, O) => O.updatedAt - ge.updatedAt)
      );
    }).catch(() => {
    }), () => {
      fe = !0;
    };
  }, [t.deploymentId]);
  const dt = g.useRef(!0);
  g.useEffect(() => {
    if (dt.current) {
      dt.current = !1;
      return;
    }
    const fe = window.setTimeout(() => {
      const Ae = {
        ...A,
        [Ah]: {
          editorMode: G,
          quickMode: M,
          cachePolicy: D,
          storyText: de
        }
      };
      Rt(`/deployments/${t.deploymentId}`, {
        method: "PATCH",
        body: JSON.stringify({
          defaultOutputFormat: $,
          defaultSpeedFactor: C,
          defaultGenerationOverrides: Ae
        })
      }).catch(() => {
      });
    }, 600);
    return () => window.clearTimeout(fe);
  }, [
    t.deploymentId,
    $,
    C,
    D,
    G,
    M,
    de,
    A
  ]);
  const ft = g.useMemo(() => G === "rows" ? xw(F, y) : G === "story" ? de : R, [G, F, y, R, de]), Ot = g.useMemo(() => K$(ft), [ft]), Pe = g.useMemo(() => {
    if (G !== "story") return Q$(Ot);
    const fe = /* @__PURE__ */ new Set(), Ae = [];
    for (const ge of Uc(de))
      ge.kind === "character" && (fe.has(ge.value) || (fe.add(ge.value), Ae.push(ge.value)));
    return Ae;
  }, [G, Ot, de]), vt = g.useMemo(() => {
    const fe = new Set(Pe.map((ge) => ge.toLowerCase())), Ae = [...Pe];
    for (const ge of o) {
      if (!ge.isActive) continue;
      const O = ge.characterName.toLowerCase();
      fe.has(O) || (fe.add(O), Ae.push(ge.characterName));
    }
    return Ae;
  }, [Pe, o]), yt = g.useMemo(() => Z$(vt), [vt]), je = g.useMemo(() => J$(Ot), [Ot]), _e = g.useMemo(() => {
    const fe = /* @__PURE__ */ new Map();
    for (const Ae of o)
      fe.set(Ae.characterName.toLowerCase(), Ae);
    return fe;
  }, [o]), Ge = g.useMemo(() => M && J ? 0 : vt.filter((fe) => !_e.has(fe.toLowerCase())).length, [vt, _e, M, J]), Fe = g.useCallback(
    async (fe, Ae) => {
      const ge = _e.get(fe.toLowerCase());
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
    [_e, t.deploymentId]
  ), Nt = g.useCallback(
    async (fe, Ae) => {
      const ge = Ae.trim(), O = _e.get(fe.toLowerCase());
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
    [_e, t.deploymentId]
  ), Mt = g.useCallback(
    async (fe) => {
      const Ae = _e.get(fe.toLowerCase());
      if (Ae)
        try {
          await S1(t.deploymentId, Ae.mappingId), u((ge) => ge.filter((O) => O.mappingId !== Ae.mappingId)), yn.success(`Cleared mapping for ${fe}`);
        } catch (ge) {
          yn.error(ge instanceof Error ? ge.message : "clear failed");
        }
    },
    [_e, t.deploymentId]
  ), Hn = g.useCallback(
    async (fe, Ae) => {
      try {
        const ge = await Cc(
          t.deploymentId,
          Ae,
          Ae.name.replace(/\.[^.]+$/, ""),
          "speaker"
        );
        m((O) => [ge, ...O]), await Fe(fe, { speakerVoiceAssetId: ge.voiceAssetId });
      } catch (ge) {
        yn.error(ge instanceof Error ? ge.message : "upload failed");
      }
    },
    [t.deploymentId, Fe]
  ), Sn = g.useCallback(
    (fe, Ae) => {
      Fe(Ae, { speakerVoiceAssetId: fe.voiceAssetId });
    },
    [Fe]
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
  }, [o, f]), At = g.useCallback(
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
        const O = await E1(fe.id, t.deploymentId, {
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
        await _R(fe.id, t.deploymentId);
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
      script: ft,
      parserMode: G === "quick" ? "raw_text" : G === "story" ? "story" : "dialogue",
      outputFormat: $,
      speedFactor: C,
      globalEmotion: { ...Y, emotionAlpha: K.intensity },
      generation: A,
      cachePolicy: D,
      ...G === "storyboard" && W.length > 0 ? {
        prebuiltSegments: W.map(
          (fe) => fe.emotion ? { ...fe, emotion: { ...fe.emotion, emotionAlpha: K.intensity } } : fe
        )
      } : {}
    }),
    [ft, G, $, C, K.intensity, Y, A, D, W]
  ), jn = g.useMemo(
    () => P$({
      script: ft,
      quickMode: M,
      defaultVoiceAssetId: J,
      characters: vt,
      unmappedCount: Ge,
      globalEmotion: Y,
      performance: K
    }),
    [ft, M, J, vt, Ge, Y, K]
  ), un = g.useMemo(
    () => jn.filter((fe) => fe.id !== "performance").map((fe) => ({
      label: fe.label,
      status: fe.status === "ok" ? "ok" : fe.status === "warn" ? "warn" : "ok",
      detail: fe.detail
    })),
    [jn]
  ), Qt = G === "storyboard" && W.length > 0, sn = ft.trim().length > 0 || Qt;
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsx(TR, { position: "bottom-right", richColors: !0, theme: "dark" }),
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
        children: Bt
      }
    ),
    /* @__PURE__ */ c.jsx(
      cU,
      {
        deployment: t,
        canGenerate: sn,
        workflowCustomised: i.workflow.customised,
        unmappableFields: i.unmappableFields,
        hero: /* @__PURE__ */ c.jsx(n2, { deployment: t }),
        quickActions: /* @__PURE__ */ c.jsx(
          fL,
          {
            deploymentId: t.deploymentId,
            createPayload: sa,
            canGenerate: sn,
            diagnostics: un,
            storyboardJobs: G === "storyboard" ? ye : void 0,
            onJobProgressChange: Te
          }
        ),
        recentGenerations: /* @__PURE__ */ c.jsx(
          EO,
          {
            deploymentId: t.deploymentId,
            speedFactor: C
          }
        ),
        scriptSection: /* @__PURE__ */ c.jsx(
          F$,
          {
            editorMode: G,
            onEditorModeChange: tt,
            deployment: t,
            script: R,
            onScriptChange: T,
            rows: F,
            onRowsChange: U,
            storyText: de,
            onStoryTextChange: re,
            storyCharacters: vt,
            outputFormat: $,
            mappingsByLower: _e,
            defaultVoiceAssetId: J,
            onDefaultVoiceAssetIdChange: Q,
            presets: y,
            voiceAssets: f,
            onQueueChange: ce,
            onStoryboardJobsChange: Me,
            jobProgress: G === "storyboard" ? st : void 0
          }
        ),
        parsedDialogueSection: /* @__PURE__ */ c.jsx(j5, { lines: Ot, characterColors: yt }),
        voiceLibrarySection: /* @__PURE__ */ c.jsx(
          fM,
          {
            deploymentId: t.deploymentId,
            voiceAssets: f,
            mappings: o,
            characterColors: yt,
            onVoiceAssetsChange: m,
            onCreateCharacterFromVoice: Sn
          }
        ),
        castSection: /* @__PURE__ */ c.jsx(XM, { unmappedCount: Ge, totalCount: vt.length, children: vt.map((fe) => {
          const Ae = _e.get(fe.toLowerCase()) ?? null, ge = yt[fe] ?? "#ba9eff";
          return /* @__PURE__ */ c.jsx("li", { className: c_, children: /* @__PURE__ */ c.jsx(
            KM,
            {
              characterName: fe,
              color: ge,
              lineCount: je[fe] ?? 0,
              mapping: Ae,
              voiceAssets: f,
              presets: y,
              active: b === fe,
              onToggle: () => v((O) => O === fe ? null : fe),
              onAssignVoiceAsset: (O) => Fe(fe, { speakerVoiceAssetId: O }),
              onAssignPreset: (O) => Fe(fe, { defaultVectorPresetId: O }),
              onUploadFile: (O) => Hn(fe, O),
              onClearMapping: () => Mt(fe),
              onRename: (O) => Nt(fe, O)
            }
          ) }, fe);
        }) }),
        emotionSection: /* @__PURE__ */ c.jsx(
          K3,
          {
            value: Y,
            onChange: ae,
            deploymentId: t.deploymentId,
            presets: y,
            onPresetsChange: p
          }
        ),
        performanceSection: /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
          /* @__PURE__ */ c.jsx(
            D5,
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
          /* @__PURE__ */ c.jsx(F5, { checks: jn }),
          /* @__PURE__ */ c.jsx(
            h5,
            {
              outputFormat: $,
              onOutputFormatChange: _,
              speedFactor: C,
              onSpeedFactorChange: I,
              cachePolicy: D,
              onCachePolicyChange: P,
              generation: A,
              onGenerationChange: V
            }
          )
        ] }),
        recentRunsSection: /* @__PURE__ */ c.jsx(Z5, { runs: s, deploymentId: t.deploymentId }),
        auditSection: /* @__PURE__ */ c.jsx(
          _M,
          {
            deploymentId: t.deploymentId,
            targets: Pt,
            onRevertToIdentity: Lt,
            onRevertToChain: At
          }
        )
      }
    )
  ] });
}
const yx = /* @__PURE__ */ new Map();
function mU(t, a) {
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
    const o = `${t}::${a}`, u = yx.get(o);
    if (u) {
      i({ peaks: u, isLoading: !1, error: null });
      return;
    }
    const f = new AbortController();
    return i({ peaks: null, isLoading: !0, error: null }), pU(t, a, f.signal).then((m) => {
      f.signal.aborted || (yx.set(o, m), i({ peaks: m, isLoading: !1, error: null }));
    }).catch((m) => {
      if (f.signal.aborted) return;
      const y = m instanceof Error ? m.message : "decode failed";
      i({ peaks: null, isLoading: !1, error: y });
    }), () => f.abort();
  }, [t, a]), s;
}
async function pU(t, a, s) {
  const i = await fetch(t, { signal: s });
  if (!i.ok) throw new Error(`failed to load audio (${i.status})`);
  const o = await i.arrayBuffer();
  if (s.aborted) throw new DOMException("aborted", "AbortError");
  const f = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return gU(f, a);
}
function gU(t, a) {
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
const bx = "(prefers-reduced-motion: reduce)";
function vU() {
  const [t, a] = g.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(bx).matches);
  return g.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const s = window.matchMedia(bx), i = (o) => a(o.matches);
    return s.addEventListener("change", i), () => s.removeEventListener("change", i);
  }, []), t;
}
var yU = "mquzal0", bU = "mquzal1", xx = "mquzal2", Sx = "mquzal3", wx = "mquzal4", xU = "mquzal5", jx = "mquzal6", Ex = "mquzal7";
const SU = 120, wU = 720;
function Ew(t) {
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
    width: b = wU,
    height: v = SU
  } = t, w = g.useRef(null), S = g.useRef(null), j = g.useRef(null), N = mU(a, b), R = vU();
  g.useEffect(() => {
    jU(w.current, N.peaks, b, v);
  }, [N.peaks, b, v]);
  const T = g.useCallback(
    (A) => {
      const V = S.current?.getBoundingClientRect();
      if (!V || V.width <= 0) return 0;
      const D = Math.max(0, Math.min(1, (A - V.left) / V.width));
      return Math.round(D * s);
    },
    [s]
  );
  g.useEffect(() => {
    const A = (D) => {
      if (!j.current) return;
      const P = T(D.clientX);
      j.current === "start" ? u(oc(P, 0, o - 1)) : f(oc(P, i + 1, s));
    }, V = () => {
      j.current = null;
    };
    return window.addEventListener("pointermove", A), window.addEventListener("pointerup", V), () => {
      window.removeEventListener("pointermove", A), window.removeEventListener("pointerup", V);
    };
  }, [T, s, o, i, u, f]);
  const $ = (A) => (V) => {
    V.preventDefault(), V.stopPropagation(), j.current = A;
  }, _ = (A) => {
    !p || A.target.closest("[data-handle]") || p(T(A.clientX));
  }, C = (A) => (V) => {
    const D = V.shiftKey ? 100 : V.ctrlKey ? 1 : 10;
    let P = 0;
    if (V.key === "ArrowLeft") P = -D;
    else if (V.key === "ArrowRight") P = D;
    else return;
    V.preventDefault(), A === "start" ? u(oc(i + P, 0, o - 1)) : f(oc(o + P, i + 1, s));
  }, I = Kf(i, s), Y = Kf(o, s), ae = Kf(y, s);
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: S,
      className: yU,
      style: { height: v },
      onPointerDown: _,
      children: [
        /* @__PURE__ */ c.jsx(
          "canvas",
          {
            ref: w,
            width: b,
            height: v,
            className: bU,
            "aria-label": "Audio waveform"
          }
        ),
        N.isLoading && /* @__PURE__ */ c.jsx("div", { className: Ex, children: "Decoding waveform…" }),
        N.error && /* @__PURE__ */ c.jsx("div", { className: Ex, role: "alert", children: N.error }),
        /* @__PURE__ */ c.jsx("div", { className: jx, style: { left: 0, width: `${I}%` } }),
        /* @__PURE__ */ c.jsx(
          "div",
          {
            className: jx,
            style: { left: `${Y}%`, right: 0, width: `${100 - Y}%` }
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: xx,
            style: { left: `${I}%` },
            role: "slider",
            "aria-label": "Region start",
            "aria-valuemin": 0,
            "aria-valuemax": s,
            "aria-valuenow": i,
            tabIndex: 0,
            onPointerDown: $("start"),
            onKeyDown: C("start"),
            "data-handle": "start",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: Sx, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: wx, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: xx,
            style: { left: `${Y}%` },
            role: "slider",
            "aria-label": "Region end",
            "aria-valuemin": 0,
            "aria-valuemax": s,
            "aria-valuenow": o,
            tabIndex: 0,
            onPointerDown: $("end"),
            onKeyDown: C("end"),
            "data-handle": "end",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: Sx, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: wx, "aria-hidden": "true" })
            ]
          }
        ),
        m && /* @__PURE__ */ c.jsx(
          "div",
          {
            className: xU,
            style: {
              left: `${ae}%`,
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
function jU(t, a, s, i) {
  if (!t) return;
  const o = t.getContext("2d");
  if (!o || (o.clearRect(0, 0, s, i), !a || a.length === 0)) return;
  const u = i / 2;
  o.fillStyle = EU(t, "--color-primary", "#ba9eff");
  const f = Math.min(a.length, s);
  for (let m = 0; m < f; m += 1) {
    const y = a[m] ?? 0, p = Math.max(1, y * (i - 4));
    o.fillRect(m, u - p / 2, 1, p);
  }
}
function EU(t, a, s) {
  return getComputedStyle(t).getPropertyValue(a).trim() || s;
}
var NU = "r8lfsm0", CU = "r8lfsm1", TU = "r8lfsm2", RU = "r8lfsm3", _U = "r8lfsm4", MU = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, AU = "_1b1zchy3", kU = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, DU = "_1b1zchy6", zU = "_1b1zchy7";
const Nw = g.createContext("standalone");
function Cw({
  variant: t = "standalone",
  children: a,
  className: s,
  style: i,
  ...o
}) {
  const u = [MU[t], s].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(Nw.Provider, { value: t, children: /* @__PURE__ */ c.jsx("div", { className: u, style: i, ...o, children: a }) });
}
function Tw({
  title: t,
  meta: a,
  children: s,
  className: i,
  titleId: o
}) {
  const u = g.useContext(Nw), f = [AU, i].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsxs("div", { className: f, children: [
    /* @__PURE__ */ c.jsx("h3", { id: o, className: kU[u], children: t }),
    a ? /* @__PURE__ */ c.jsx("span", { className: DU, children: a }) : null,
    s
  ] });
}
function Rw({
  children: t,
  className: a,
  role: s = "group"
}) {
  const i = [zU, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: i, role: s, children: t });
}
const Nx = -16, OU = 80, LU = 720;
function $U(t) {
  const { deploymentId: a, runId: s, utterance: i, audioUrl: o, onApplied: u, onError: f, onCancel: m } = t, y = i.durationMs ?? 0, [p, b] = g.useState(() => Cx(y)), [v, w] = g.useState(Yc), [S, j] = g.useState(!1), [N, R] = g.useState(!1), [T, $] = g.useState(null), [_, C] = g.useState(!1), I = g.useRef(null), Y = g.useRef(null), ae = g.useRef(null);
  g.useEffect(() => {
    const U = Cx(y);
    b(U), w(L1(U)), R(!1), $(null), ae.current = null;
  }, [i.utteranceId, y]);
  const A = g.useCallback((U) => {
    w(U), b((se) => O1(se, U));
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
  ), P = D?.start_ms ?? 0, J = D?.end_ms ?? Math.max(1, y), Q = g.useCallback((U, se) => {
    b((de) => UU(de, "trim", (k) => ({
      ...k,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(U)),
      end_ms: Math.max(Math.floor(U) + 1, Math.floor(se))
    })));
  }, []), G = g.useCallback((U) => Q(U, J), [J, Q]), ie = g.useCallback((U) => Q(P, U), [P, Q]), M = g.useCallback((U) => {
    R(U), b((se) => {
      const de = se.ops.filter((k) => k.mode !== "normalize");
      if (U) {
        const k = {
          id: Dn(),
          mode: "normalize",
          target_lufs: Nx
        };
        return { ...se, ops: [...de, k] };
      }
      return { ...se, ops: de };
    });
  }, []), F = g.useCallback(async () => {
    const U = N1(p, y);
    if (U) {
      $(U.message);
      return;
    }
    if ($(null), _) return;
    Y.current?.abort();
    const se = new AbortController();
    Y.current = se, C(!0);
    try {
      const de = ae.current ?? void 0, k = await RR(
        a,
        s,
        i.utteranceId,
        de ? { chain: p, digest_before: de } : { chain: p },
        { signal: se.signal }
      );
      if (se.signal.aborted) return;
      ae.current = k.chain_digest, u(k);
    } catch (de) {
      if (se.signal.aborted) return;
      de instanceof Zs && (ae.current = de.currentDigest || null);
      const k = de instanceof Zs ? "Edit chain has changed in another tab. Reload to continue." : de instanceof Error ? de.message : "apply failed";
      $(k), f(k);
    } finally {
      se.signal.aborted || C(!1);
    }
  }, [p, y, _, a, s, i.utteranceId, u, f]);
  return /* @__PURE__ */ c.jsx(Cw, { variant: "nested", children: /* @__PURE__ */ c.jsxs("div", { ref: I, onKeyDown: V, children: [
    /* @__PURE__ */ c.jsx(Tw, { title: "Edit segment", meta: `Source · ${cc(y)}` }),
    /* @__PURE__ */ c.jsx(
      Ew,
      {
        audioUrl: o,
        durationMs: Math.max(1, y),
        startMs: P,
        endMs: J,
        onChangeStart: G,
        onChangeEnd: ie,
        height: OU,
        width: LU
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: NU, children: [
      /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ c.jsxs("span", { className: CU, children: [
        cc(P),
        " → ",
        cc(J),
        " · ",
        cc(J - P)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: TU, children: [
      /* @__PURE__ */ c.jsxs("label", { className: RU, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: N,
            onChange: (U) => M(U.currentTarget.checked),
            "aria-label": "Toggle loudness normalization"
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { children: [
          "Normalize to ",
          Nx.toFixed(0),
          " LUFS (broadcast-friendly)"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: _U,
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
        onChange: A,
        supportsSynthSpeed: !1
      }
    ),
    /* @__PURE__ */ c.jsxs(Rw, { children: [
      /* @__PURE__ */ c.jsx(Qe, { size: "sm", onClick: () => void F(), disabled: _, children: _ ? "Applying…" : "Apply" }),
      /* @__PURE__ */ c.jsx(Qe, { variant: "ghost", size: "sm", onClick: m, disabled: _, children: "Cancel" })
    ] }),
    T && /* @__PURE__ */ c.jsx(kn, { severity: "error", children: T })
  ] }) });
}
function Cx(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Dn(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function UU(t, a, s) {
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
var BU = "jq2zyb2", IU = "jq2zyb3", VU = "jq2zyb4", qU = "jq2zyb5", HU = "jq2zyb6", FU = "jq2zyb7", PU = "jq2zyb8", GU = "jq2zyb9", YU = "jq2zyba", KU = "jq2zybb", XU = "jq2zybc", QU = "jq2zybd", ZU = "jq2zybe", JU = "jq2zybf jq2zybe", WU = "jq2zybg", e9 = "jq2zybh", t9 = "jq2zybi", n9 = "jq2zybj", a9 = "jq2zybk", r9 = "jq2zybl", s9 = "jq2zybm", i9 = "jq2zybn", l9 = "jq2zybo", o9 = "jq2zybp", c9 = "jq2zybq", u9 = "jq2zybr", d9 = "jq2zybs", f9 = "jq2zybt", h9 = "jq2zybu", m9 = "jq2zybv", p9 = "jq2zybw", g9 = "jq2zybx", v9 = "jq2zyby", Tx = "jq2zybz", y9 = "jq2zyb10", b9 = "jq2zyb11", x9 = "jq2zyb12";
const S9 = ["cancelled", "failed", "partial"], w9 = 2600;
function j9() {
  const { run: t } = Tl(), a = ti(), [s, i] = g.useState(t), [o, u] = g.useState(!1), [f, m] = g.useState(null), [y, p] = g.useState(null), [b, v] = g.useState(
    null
  );
  g.useEffect(() => {
    i(t);
  }, [t]), g.useEffect(() => {
    if (!b) return;
    const C = setTimeout(() => v(null), w9);
    return () => clearTimeout(C);
  }, [b]);
  const w = g.useMemo(() => C9(s), [s]), S = S9.includes(s.status) && s.kind === "batch", j = (s.exportZipStaleAt ?? null) !== null, N = async () => {
    if (s.deploymentId) {
      u(!0), m(null);
      try {
        const { runId: C } = await j1(s.deploymentId, s.runId);
        a(`/${s.deploymentId}/runs/${C}`);
      } catch (C) {
        m(_9(C));
      } finally {
        u(!1);
      }
    }
  }, R = g.useCallback((C) => {
    p((I) => I === C ? null : C);
  }, []), T = g.useCallback(() => {
    p(null);
  }, []), $ = (C, I) => {
    i((Y) => N9(Y, C, I)), p(null), v({ message: "Segment edited", severity: "success" });
  }, _ = g.useCallback((C) => {
    v({ message: C, severity: "error" });
  }, []);
  return /* @__PURE__ */ c.jsxs("main", { className: BU, children: [
    /* @__PURE__ */ c.jsxs("div", { className: IU, children: [
      /* @__PURE__ */ c.jsxs("header", { className: VU, children: [
        /* @__PURE__ */ c.jsxs("p", { className: qU, children: [
          s.deploymentId ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            /* @__PURE__ */ c.jsx(Kh, { to: `/${s.deploymentId}/recipe`, className: HU, children: "← Back to recipe" }),
            /* @__PURE__ */ c.jsx("span", { className: FU, children: "·" })
          ] }) : null,
          /* @__PURE__ */ c.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: PU, children: [
          /* @__PURE__ */ c.jsxs("h1", { className: GU, children: [
            T9(s.kind),
            /* @__PURE__ */ c.jsx("span", { className: YU, children: s.runId })
          ] }),
          /* @__PURE__ */ c.jsx(wr, { size: "md", tone: M9(s.status), pulse: s.status === "running", children: s.status })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("section", { className: KU, "aria-label": "Run statistics", children: [
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
      S && /* @__PURE__ */ c.jsxs("section", { className: e9, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ c.jsxs("div", { className: t9, children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-resume-title", className: n9, children: w.failed > 0 ? `${w.failed} line${w.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ c.jsx("p", { className: a9, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ c.jsx(Qe, { size: "lg", disabled: o, onClick: () => void N(), children: o ? "Resuming…" : w.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        f && /* @__PURE__ */ c.jsx("p", { className: r9, role: "alert", children: f })
      ] }),
      /* @__PURE__ */ c.jsxs(Ia, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ c.jsxs(zT, { children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-utterances", className: Zr, children: "01 / Utterances" }),
          w.completed > 0 && /* @__PURE__ */ c.jsxs("span", { className: s9, children: [
            /* @__PURE__ */ c.jsx("span", { className: i9, children: w.cached }),
            "/",
            w.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("ul", { className: l9, children: s.utterances.map((C) => {
          const I = y === C.utteranceId, Y = C.status === "completed" && C.audioArtifactRef !== null && C.audioArtifactRef !== void 0, ae = C.derivedArtifactRef ?? C.audioArtifactRef ?? null, A = ae ? `/api/v1/artifacts/${encodeURIComponent(ae)}/download` : "", V = (C.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ c.jsxs("li", { className: c9, children: [
            /* @__PURE__ */ c.jsxs("div", { className: o9, children: [
              /* @__PURE__ */ c.jsxs("span", { className: d9, children: [
                "#",
                C.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: f9, title: C.characterDisplay, children: C.characterDisplay }),
              /* @__PURE__ */ c.jsx("span", { className: h9, title: C.text, children: C.text }),
              /* @__PURE__ */ c.jsxs("span", { className: m9, children: [
                C.cacheHit && /* @__PURE__ */ c.jsx("span", { className: p9, children: "cached" }),
                V && /* @__PURE__ */ c.jsx("span", { className: u9, children: "edited" }),
                C.durationMs ? /* @__PURE__ */ c.jsx("span", { children: R9(C.durationMs) }) : null,
                /* @__PURE__ */ c.jsx(wr, { tone: A9(C.status), children: C.status }),
                Y && /* @__PURE__ */ c.jsx(
                  Qe,
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
            I && A && s.deploymentId && /* @__PURE__ */ c.jsx(
              $U,
              {
                deploymentId: s.deploymentId,
                runId: s.runId,
                utterance: C,
                audioUrl: A,
                onApplied: (D) => $(C.utteranceId, D),
                onError: _,
                onCancel: T
              }
            )
          ] }, C.utteranceId);
        }) })
      ] }),
      E9(s, j)
    ] }),
    b && /* @__PURE__ */ c.jsx(
      "div",
      {
        className: x9,
        role: b.severity === "error" ? "alert" : "status",
        "aria-live": b.severity === "error" ? "assertive" : "polite",
        children: b.message
      }
    )
  ] });
}
function E9(t, a) {
  if (!t.exportArtifactRef && !a) return null;
  const i = !!t.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ c.jsx("div", { className: g9, children: a ? /* @__PURE__ */ c.jsxs("div", { className: y9, children: [
    /* @__PURE__ */ c.jsx("p", { className: b9, children: i }),
    /* @__PURE__ */ c.jsxs(
      Qe,
      {
        variant: "secondary",
        size: "md",
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ c.jsx("span", { className: Tx, children: "↻" })
        ]
      }
    )
  ] }) : t.exportArtifactRef ? /* @__PURE__ */ c.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${t.exportArtifactRef}/download`,
      download: !0,
      className: v9,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ c.jsx("span", { className: Tx, children: "↓" })
      ]
    }
  ) : null });
}
function N9(t, a, s) {
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
      className: XU,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: QU, children: t }),
        /* @__PURE__ */ c.jsx("span", { className: s ? JU : ZU, children: a }),
        o !== void 0 && /* @__PURE__ */ c.jsx("span", { className: WU, "aria-hidden": "true" })
      ]
    }
  );
}
function C9(t) {
  const a = t.utterances.length, s = t.utterances.filter((f) => f.status === "completed").length, i = t.utterances.filter(
    (f) => f.status === "failed" || f.status === "cancelled"
  ).length, o = t.utterances.filter((f) => f.cacheHit).length, u = s > 0 ? Math.round(o / s * 100) : 0;
  return { total: a, completed: s, failed: i, cached: o, cacheRatio: u };
}
function T9(t) {
  switch (t) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function R9(t) {
  return t < 1e3 ? `${t} ms` : `${(t / 1e3).toFixed(t < 1e4 ? 2 : 1)} s`;
}
function _9(t) {
  return t instanceof ni ? `${t.category}: ${t.message}` : t instanceof Error ? t.message : "Unexpected error";
}
function M9(t) {
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
function A9(t) {
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
var k9 = "pcphqj2", D9 = "pcphqj3", z9 = "pcphqj4", O9 = "pcphqj5", L9 = "pcphqj6", $9 = "pcphqj7", U9 = "pcphqj8", B9 = "pcphqj9", I9 = "pcphqja", Rx = "pcphqjb", V9 = "pcphqjc", q9 = "pcphqjd", H9 = "pcphqje pcphqjd", F9 = "pcphqjf", P9 = "pcphqjg", G9 = "pcphqjh", Y9 = "pcphqji", K9 = "pcphqjj pcphqji", X9 = "pcphqjk pcphqji", Q9 = "pcphqjl pcphqji", Z9 = "pcphqjm", Xf = "pcphqjn", Qf = "pcphqjo";
function J9() {
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
  }, []), /* @__PURE__ */ c.jsx("main", { className: k9, children: /* @__PURE__ */ c.jsxs("div", { className: D9, children: [
    /* @__PURE__ */ c.jsxs("header", { className: z9, children: [
      /* @__PURE__ */ c.jsx("p", { className: O9, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ c.jsxs("div", { className: L9, children: [
        /* @__PURE__ */ c.jsx("h1", { className: $9, children: "Queue" }),
        /* @__PURE__ */ c.jsx("span", { className: U9, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: B9, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    s ? /* @__PURE__ */ c.jsx(kn, { severity: "error", children: s }) : t === null ? null : t.length === 0 ? /* @__PURE__ */ c.jsx(Ia, { density: "compact", children: /* @__PURE__ */ c.jsx(Pc, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ c.jsxs(Ia, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ c.jsx("h2", { id: "runtime-queue-section", className: Zr, children: "01 / In flight" }),
      /* @__PURE__ */ c.jsx("ul", { className: I9, children: t.map((o) => {
        const u = o.position === 1;
        return /* @__PURE__ */ c.jsxs(
          "li",
          {
            className: u ? `${Rx} ${V9}` : Rx,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: u ? H9 : q9, children: o.position }),
              /* @__PURE__ */ c.jsxs("span", { className: F9, children: [
                /* @__PURE__ */ c.jsx("span", { className: P9, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ c.jsx("span", { className: G9, children: o.runId })
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: W9(o.kind), children: eB(o.kind) }),
              /* @__PURE__ */ c.jsx("span", { className: Z9, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Xf, children: tB(o.etaSeconds) }),
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
function W9(t) {
  switch (t) {
    case "batch":
      return K9;
    case "test_line":
      return X9;
    case "resume":
      return Q9;
    default:
      return Y9;
  }
}
function eB(t) {
  switch (t) {
    case "test_line":
      return "test line";
    default:
      return t;
  }
}
function tB(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60), s = t % 60;
  return s === 0 ? `${a}m` : `${a}m ${s}s`;
}
function nB() {
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
      /* @__PURE__ */ c.jsx(Qe, { type: "submit", variant: "primary", disabled: p, children: "Save mapping" }),
      v && /* @__PURE__ */ c.jsx(kn, { severity: "error", children: v })
    ] })
  ] });
}
var aB = "_1oor31e0", rB = "_1oor31e1", sB = "_1oor31e2", iB = "_1oor31e3", lB = "_1oor31e4", oB = "_1oor31e5", cB = "_1oor31e6", uB = "_1oor31e7", dB = "_1oor31e8";
const fB = 8;
function hB(t) {
  const { entries: a, loading: s, error: i } = t;
  return /* @__PURE__ */ c.jsxs("div", { className: aB, "aria-busy": !!s, children: [
    i && /* @__PURE__ */ c.jsx(kn, { severity: "error", children: i }),
    s && !i && /* @__PURE__ */ c.jsx("div", { className: dB, "aria-live": "polite", children: "Loading edit history…" }),
    !s && !i && a.length === 0 && /* @__PURE__ */ c.jsx("div", { className: uB, children: "No edits yet" }),
    !s && !i && a.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: rB, children: a.map((o) => /* @__PURE__ */ c.jsxs("li", { className: sB, children: [
      /* @__PURE__ */ c.jsx("span", { className: iB, children: pB(o.recorded_at) }),
      /* @__PURE__ */ c.jsx("span", { className: lB, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ c.jsx("span", { className: oB, title: o.digest_after, children: mB(o.digest_after) }),
      /* @__PURE__ */ c.jsx("span", { className: cB, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function mB(t) {
  return t ? `${t.slice(0, fB)}…` : "—";
}
function pB(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var _x = "_1c63kaw0", gB = "_1c63kaw1", vB = "_1c63kaw2", yB = "_1c63kaw3", bB = "_1c63kaw4", xB = "_1c63kaw5", SB = "_1c63kaw6";
function wB({ chain: t, onRemoveOp: a }) {
  return t.ops.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: _x, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ c.jsx("span", { className: gB, children: "No edits yet" }) }) : /* @__PURE__ */ c.jsx("ol", { className: _x, "data-testid": "edit-chain-list", children: t.ops.map((s, i) => /* @__PURE__ */ c.jsxs("li", { className: vB, children: [
    /* @__PURE__ */ c.jsxs("span", { className: yB, "aria-hidden": "true", children: [
      i + 1,
      "."
    ] }),
    /* @__PURE__ */ c.jsxs("span", { className: bB, children: [
      /* @__PURE__ */ c.jsx("span", { className: xB, children: Mx(s) }),
      /* @__PURE__ */ c.jsx("span", { className: SB, children: jB(s) })
    ] }),
    /* @__PURE__ */ c.jsx(
      Qe,
      {
        variant: "ghost",
        size: "xs",
        iconOnly: !0,
        onClick: () => a(s.id),
        "aria-label": `Remove ${Mx(s)} (position ${i + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, s.id)) });
}
function Mx(t) {
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
function jB(t) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${Ax(t.start_ms)} → ${Ax(t.end_ms)}`;
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
function Ax(t) {
  return !Number.isFinite(t) || t < 0 ? "0.00s" : `${(t / 1e3).toFixed(2)}s`;
}
var dc = "_1o3ytop0", Jf = "_1o3ytop1", kx = "_1o3ytop2", EB = "_1o3ytop3", NB = "_1o3ytop4", CB = "_1o3ytop5", TB = "_1o3ytop6", RB = "_1o3ytop7", fc = "_1o3ytop8", _B = "_1o3ytop9", MB = "_1o3ytopf", AB = "_1o3ytopg", kB = "_1o3ytoph", DB = "_1o3ytopi", zB = "_1o3ytopj", OB = "_1o3ytopk", LB = "_1t0zy2f0", $B = "_1t0zy2f1", UB = "_1t0zy2f2";
function BB({ content: t, children: a, delayMs: s = 350 }) {
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
  return /* @__PURE__ */ c.jsxs("span", { className: LB, children: [
    g.cloneElement(a, b),
    i && /* @__PURE__ */ c.jsx("span", { role: "tooltip", id: u, className: UB, children: t })
  ] });
}
function hc({ label: t, content: a }) {
  return /* @__PURE__ */ c.jsx(BB, { content: a, children: /* @__PURE__ */ c.jsx("button", { type: "button", "aria-label": `What is ${t}?`, className: $B, children: "?" }) });
}
const Dx = -16;
function IB(t) {
  const {
    voiceAsset: a,
    deploymentId: s,
    affectedCharacterNames: i = [],
    onChainPersisted: o,
    onError: u
  } = t, f = a.durationMs ?? 0, m = g.useMemo(
    () => VB(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [y, p] = g.useState(() => Wf(f)), [b, v] = g.useState(Yc), [w, S] = g.useState(!1), [j, N] = g.useState(null), [R, T] = g.useState(null), [$, _] = g.useState(!1), [C, I] = g.useState(!1), [Y, ae] = g.useState(!1), [A, V] = g.useState(null), [D, P] = g.useState([]), [J, Q] = g.useState(null), [G, ie] = g.useState([]), [M, F] = g.useState(!1), [U, se] = g.useState(null), [de, k] = g.useState(0), ee = g.useRef(null), re = g.useRef(null), K = g.useRef(null), B = g.useRef(null), W = g.useRef(null), ce = g.useRef(0), ye = g.useMemo(
    () => y.ops.some((je) => je.mode === "normalize"),
    [y.ops]
  );
  g.useEffect(() => {
    const je = Wf(f);
    p(je), v(L1(je)), N(null), ae(!1), P([]), Q(null), W.current = null;
  }, [a.voiceAssetId, f]);
  const Me = g.useCallback((je) => {
    v(je), p((_e) => O1(_e, je));
  }, []);
  g.useEffect(() => {
    B.current?.abort();
    const je = new AbortController();
    return B.current = je, F(!0), se(null), yc(s, "voice_asset", a.voiceAssetId, 50, {
      signal: je.signal
    }).then((_e) => {
      je.signal.aborted || ie(_e.entries);
    }).catch((_e) => {
      if (je.signal.aborted) return;
      const Ge = _e instanceof Error ? _e.message : "audit fetch failed";
      se(Ge);
    }).finally(() => {
      je.signal.aborted || F(!1);
    }), () => je.abort();
  }, [s, a.voiceAssetId, de]), g.useEffect(() => () => {
    R && URL.revokeObjectURL(R);
  }, [R]), g.useEffect(() => () => {
    re.current?.abort(), K.current?.abort(), B.current?.abort();
  }, []);
  const st = y.ops.find((je) => je.mode === "trim"), Te = y.ops.find((je) => je.mode === "normalize"), He = st?.start_ms ?? 0, Ve = st?.end_ms ?? Math.max(1, f), Ke = g.useCallback((je, _e) => {
    p(
      (Ge) => zx(
        Ge,
        "trim",
        (Fe) => ({
          ...Fe,
          mode: "trim",
          start_ms: Math.max(0, Math.floor(je)),
          end_ms: Math.max(Math.floor(je) + 1, Math.floor(_e))
        })
      )
    );
  }, []), Ft = g.useCallback(
    (je) => Ke(je, Ve),
    [Ve, Ke]
  ), Bt = g.useCallback(
    (je) => Ke(He, je),
    [He, Ke]
  ), we = g.useCallback((je) => {
    p((_e) => {
      const Ge = _e.ops.filter((Fe) => Fe.mode !== "normalize");
      if (je) {
        const Fe = {
          id: Dn(),
          mode: "normalize",
          target_lufs: Dx
        };
        return { ..._e, ops: [...Ge, Fe] };
      }
      return { ..._e, ops: Ge };
    });
  }, []), tt = g.useCallback(
    (je) => {
      const _e = y.ops.findIndex((Nt) => Nt.id === je);
      if (_e === -1) return;
      const Ge = y.ops[_e];
      if (!Ge) return;
      const Fe = [...y.ops.slice(0, _e), ...y.ops.slice(_e + 1)];
      p({ ...y, ops: Fe }), P((Nt) => [...Nt, { op: Ge, index: _e }]);
    },
    [y]
  ), dt = g.useCallback(() => {
    const je = D[D.length - 1];
    if (!je) return;
    const _e = Math.min(je.index, y.ops.length), Ge = [...y.ops.slice(0, _e), je.op, ...y.ops.slice(_e)];
    p({ ...y, ops: Ge }), P(D.slice(0, -1));
  }, [y, D]), ft = g.useCallback(() => {
    const je = N1(y, f);
    return je ? (N(je.message), !1) : (N(null), !0);
  }, [y, f]), Ot = g.useCallback(async () => {
    if (!ft() || $) return;
    re.current?.abort();
    const je = new AbortController();
    re.current = je;
    const _e = ++ce.current;
    I(!0);
    try {
      const Ge = await MR(a.voiceAssetId, s, y, {
        signal: je.signal
      });
      if (je.signal.aborted || _e !== ce.current) return;
      R && URL.revokeObjectURL(R);
      const Fe = URL.createObjectURL(Ge);
      T(Fe), ae(!0), requestAnimationFrame(() => ee.current?.play().catch(() => {
      }));
    } catch (Ge) {
      if (je.signal.aborted) return;
      const Fe = Ge instanceof Error ? Ge.message : "preview failed";
      N(Fe), u(Fe);
    } finally {
      je.signal.aborted || I(!1);
    }
  }, [ft, $, a.voiceAssetId, s, y, R, u]), Pe = g.useCallback(async () => {
    if (!ft() || C || $) return;
    if (i.length > 1) {
      const _e = i.join(", ");
      if (!window.confirm(
        `This voice asset is referenced by ${i.length} characters: ${_e}.

Applying this edit chain will affect every line they speak in the next batch.

Continue?`
      )) return;
    }
    re.current?.abort(), K.current?.abort();
    const je = new AbortController();
    K.current = je, _(!0);
    try {
      const _e = W.current ?? void 0, Ge = await E1(
        a.voiceAssetId,
        s,
        _e ? { chain: y, digest_before: _e } : { chain: y },
        { signal: je.signal }
      );
      if (je.signal.aborted) return;
      W.current = Ge.chain_digest, Q(Ge.chain_digest), N(null), V(Ge.measured_lufs ?? null), P([]), o(Ge), k((Fe) => Fe + 1);
    } catch (_e) {
      if (je.signal.aborted) return;
      const Ge = _e instanceof Zs;
      _e instanceof Zs && (W.current = _e.currentDigest || null);
      const Fe = Ge ? "Edit chain has changed in another tab. Reload to continue." : _e instanceof Error ? _e.message : "apply failed";
      N(Fe), u(Fe);
    } finally {
      je.signal.aborted || _(!1);
    }
  }, [
    ft,
    C,
    $,
    i,
    a.voiceAssetId,
    s,
    y,
    o,
    u
  ]), vt = g.useCallback(() => {
    re.current?.abort(), p(Wf(f)), N(null), V(null), ae(!1), P([]), k((je) => je + 1), R && (URL.revokeObjectURL(R), T(null));
  }, [f, R]), yt = g.useCallback((je) => {
    p(
      (_e) => zx(
        _e,
        "normalize",
        (Ge) => ({
          ...Ge,
          mode: "normalize",
          target_lufs: je
        })
      )
    );
  }, []);
  return /* @__PURE__ */ c.jsxs(Cw, { variant: "standalone", children: [
    /* @__PURE__ */ c.jsx(
      Tw,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${mc(f)}`
      }
    ),
    /* @__PURE__ */ c.jsx(
      Ew,
      {
        audioUrl: m,
        durationMs: Math.max(1, f),
        startMs: He,
        endMs: Ve,
        onChangeStart: Ft,
        onChangeEnd: Bt
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
      /* @__PURE__ */ c.jsxs("span", { className: kx, children: [
        mc(He),
        " → ",
        mc(Ve),
        " · ",
        mc(Ve - He)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: RB, children: [
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
          ye && Te && /* @__PURE__ */ c.jsxs("span", { className: MB, children: [
            "target ",
            Te.target_lufs.toFixed(1),
            " LUFS",
            A !== null && ` · measured ${A.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: _B, children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "checkbox",
              checked: ye,
              onChange: (je) => we(je.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { children: [
            "Target ",
            Dx.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        ye && Te && /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "range",
            className: kB,
            min: -30,
            max: -6,
            step: 0.5,
            value: Te.target_lufs,
            onChange: (je) => yt(Number(je.currentTarget.value)),
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
          /* @__PURE__ */ c.jsx("span", { className: kx, children: y.ops.length })
        ] }),
        /* @__PURE__ */ c.jsx(wB, { chain: y, onRemoveOp: tt })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: fc, children: [
        /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: EB,
            onClick: () => S((je) => !je),
            "aria-expanded": w,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: NB, "aria-hidden": "true", children: w ? "▾" : "▸" }),
              /* @__PURE__ */ c.jsx("span", { children: "Advanced effects" }),
              /* @__PURE__ */ c.jsx("span", { className: CB, children: "gain · EQ · pitch · fade · silence trim" }),
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
        /* @__PURE__ */ c.jsxs("span", { className: TB, title: J, children: [
          J.slice(0, 12),
          "…"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ c.jsxs(Rw, { children: [
      /* @__PURE__ */ c.jsx(
        Qe,
        {
          variant: "secondary",
          onClick: () => void Ot(),
          disabled: C || $,
          children: C ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Qe,
        {
          onClick: () => void Pe(),
          disabled: $ || C,
          children: $ ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Qe,
        {
          variant: "ghost",
          onClick: vt,
          disabled: $ || C,
          children: "Reset"
        }
      ),
      D.length > 0 && /* @__PURE__ */ c.jsxs(
        Qe,
        {
          variant: "ghost",
          size: "sm",
          onClick: dt,
          disabled: $ || C,
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
          className: OB,
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
        className: AB,
        "aria-label": "Edit preview"
      }
    ),
    j && /* @__PURE__ */ c.jsx(kn, { severity: "error", children: j }),
    /* @__PURE__ */ c.jsxs("details", { className: DB, children: [
      /* @__PURE__ */ c.jsxs("summary", { className: zB, children: [
        "Edit history",
        G.length > 0 ? ` · ${G.length}` : ""
      ] }),
      /* @__PURE__ */ c.jsx(
        hB,
        {
          entries: G,
          loading: M,
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
function zx(t, a, s) {
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
function VB(t) {
  return t.startsWith("http://") || t.startsWith("https://") || t.startsWith("/") ? t : `/api/v1/artifacts/${encodeURIComponent(t)}`;
}
var qB = "go9vi12", HB = "go9vi13", FB = "go9vi14", PB = "go9vi15", GB = "go9vi16", YB = "go9vi17", KB = "go9vi18", XB = "go9vi19", QB = "go9vi1a", ZB = "go9vi1b go9vi1a", JB = "go9vi1c", WB = "go9vi1d", e7 = "go9vi1e", t7 = "go9vi1f", n7 = "go9vi1g", a7 = "go9vi1h", r7 = "go9vi1i", s7 = "go9vi1j", Ox = "go9vi1k", i7 = "go9vi1l", l7 = "go9vi1m", o7 = "go9vi1n", Bc = "go9vi1o", c7 = "go9vi1q", u7 = "go9vi1r go9vi1q", d7 = "go9vi1s go9vi1q", f7 = "go9vi1t", h7 = "go9vi1u", m7 = "go9vi1v", p7 = "go9vi1w", _w = "go9vi1x", g7 = "go9vi1y", v7 = "go9vi1z", y7 = "go9vi110 go9vi1o", b7 = "go9vi111", x7 = "go9vi112", S7 = "go9vi113", w7 = "go9vi114", j7 = "go9vi115", E7 = "go9vi116";
function N7() {
  const { deployment: t, mappings: a, voiceAssets: s } = Tl(), i = ti(), [o, u] = g.useState(a), [f, m] = g.useState(s), [y, p] = g.useState(
    a[0]?.mappingId ?? null
  ), [b, v] = g.useState(""), [w, S] = g.useState(null), [j, N] = g.useState(null), [R, T] = g.useState(null), [$, _] = g.useState(null), [C, I] = g.useState(0), Y = g.useCallback(() => {
    i(`/${t.deploymentId}/recipe`);
  }, [i, t.deploymentId]), ae = g.useCallback((K) => {
    _(K), window.setTimeout(() => {
      _((B) => B === K ? null : B);
    }, 1600);
  }, []), A = g.useMemo(() => {
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
  ), Q = g.useCallback(
    async (K) => {
      if (!D) return;
      const B = D;
      try {
        const W = await Gs(t.deploymentId, D.mappingId, K);
        u((ce) => ce.map((ye) => ye.mappingId === W.mappingId ? W : ye)), Object.prototype.hasOwnProperty.call(K, "characterName") && ae(W.mappingId);
      } catch (W) {
        u(
          (ce) => ce.map((ye) => ye.mappingId === B.mappingId ? B : ye)
        ), S(gr(W));
      }
    },
    [D, t.deploymentId, ae]
  ), G = g.useCallback(async () => {
    const K = f[0];
    if (!K) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const B = k7(o), W = await Xh(t.deploymentId, {
        characterName: B,
        speakerVoiceAssetId: K.voiceAssetId
      });
      u((ce) => [...ce, W]), p(W.mappingId), I((ce) => ce + 1);
    } catch (B) {
      S(gr(B));
    }
  }, [t.deploymentId, f, o]), ie = g.useCallback(() => {
    D && T({ id: D.mappingId, name: D.characterName });
  }, [D]), M = g.useCallback(async () => {
    if (!R) return;
    const { id: K, name: B } = R;
    T(null);
    try {
      await S1(t.deploymentId, K), u((W) => W.filter((ce) => ce.mappingId !== K)), p(null), N(`Mapping for ${B} deactivated.`);
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
      const K = await gT(t.deploymentId);
      $7(K, `${t.deploymentId}-mappings.json`), N("Mappings exported to JSON.");
    } catch (K) {
      S(gr(K));
    }
  }, [t.deploymentId]), se = g.useCallback(
    async (K, B) => {
      try {
        const W = await vT(
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
        return { runId: (await ST(t.deploymentId, {
          line: W,
          outputFormat: B
        })).runId };
      } catch (ce) {
        return S(gr(ce)), null;
      }
    },
    [t.deploymentId, D]
  ), re = f.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ c.jsxs("div", { className: qB, children: [
    /* @__PURE__ */ c.jsxs("aside", { className: HB, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: FB,
          onClick: Y,
          children: "← Back to recipe"
        }
      ),
      /* @__PURE__ */ c.jsxs("header", { className: PB, children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("h1", { id: "mapping-sidebar-heading", className: GB, children: "Cast" }),
          /* @__PURE__ */ c.jsxs("span", { className: YB, children: [
            o.length,
            " active · ",
            f.length,
            " ",
            re
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(Qe, { variant: "primary", size: "sm", onClick: G, children: "+ Add" })
      ] }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "search",
          className: KB,
          placeholder: "Search characters",
          value: b,
          onChange: (K) => v(K.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ c.jsx(A7, { onExport: U, onImport: se, onParseError: S }),
      /* @__PURE__ */ c.jsx("div", { className: XB, children: V.length === 0 ? /* @__PURE__ */ c.jsx(
        Pc,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : V.map((K) => {
        const B = A.get(K.speakerVoiceAssetId), W = K.mappingId === y;
        return /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: W ? ZB : QB,
            onClick: () => p(K.mappingId),
            "aria-pressed": W,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: JB, "aria-hidden": "true", children: D7(K.characterName) }),
              /* @__PURE__ */ c.jsxs("span", { className: WB, children: [
                /* @__PURE__ */ c.jsx("span", { className: e7, children: K.characterName }),
                /* @__PURE__ */ c.jsx("span", { className: t7, children: B?.displayName ?? "no voice" })
              ] })
            ]
          },
          K.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ c.jsxs("section", { className: n7, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ c.jsx(Sm, { features: Nm, children: /* @__PURE__ */ c.jsx(ew, { children: j && /* @__PURE__ */ c.jsx(
        Em.div,
        {
          className: g7,
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
        /* @__PURE__ */ c.jsx(Qe, { variant: "danger", size: "sm", onClick: () => void M(), children: "Delete" }),
        /* @__PURE__ */ c.jsx(Qe, { variant: "ghost", size: "sm", onClick: () => T(null), children: "Cancel" })
      ] }),
      D ? /* @__PURE__ */ c.jsx(
        T7,
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
            B && Q({ characterName: B });
          },
          savedHint: $ === D.mappingId,
          autoFocusNonce: C,
          onSpeakerChange: (K) => {
            J({ speakerVoiceAssetId: K }), Q({ speakerVoiceAssetId: K });
          },
          onDelete: ie,
          onUploadVoice: async (K, B, W) => {
            const ce = await F(K, B, W);
            return ce && W === "speaker" && (J({ speakerVoiceAssetId: ce.voiceAssetId }), Q({ speakerVoiceAssetId: ce.voiceAssetId })), await P(), ce;
          },
          onTestLine: ee,
          onEditChainPersisted: de,
          onEditError: k
        },
        D.mappingId
      ) : /* @__PURE__ */ c.jsx(
        C7,
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
function C7({ voiceCount: t, onUploadVoice: a }) {
  return t === 0 ? /* @__PURE__ */ c.jsxs(Ia, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ c.jsxs("div", { className: S7, children: [
      /* @__PURE__ */ c.jsx("p", { className: Zr, children: "01 / Onboarding" }),
      /* @__PURE__ */ c.jsx("h2", { id: "onboarding-heading", className: w7, children: "Upload your first voice" }),
      /* @__PURE__ */ c.jsxs("p", { className: j7, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ c.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ c.jsx(
      Mw,
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
function T7(t) {
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
    const { runId: $ } = T;
    for (let _ = 0; _ < 60; _ += 1) {
      if (await new Promise((C) => setTimeout(C, 500)), j.current) return;
      try {
        const C = await Qh(t.deploymentId, $);
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
    /* @__PURE__ */ c.jsxs("header", { className: a7, children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("p", { className: Zr, children: "Character" }),
        /* @__PURE__ */ c.jsx("h2", { className: r7, children: a.characterName })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: _w, children: /* @__PURE__ */ c.jsx(Qe, { variant: "danger", size: "sm", onClick: t.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ c.jsxs(
      Ia,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: v7,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "text",
              className: y7,
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
            Qe,
            {
              variant: "primary",
              size: "sm",
              onClick: () => void R(),
              disabled: b === "running",
              children: b === "running" ? "Synthesising…" : "Test this line"
            }
          ),
          b === "done" && /* @__PURE__ */ c.jsx(wr, { tone: "success", children: "Synthesised — see host logs for output path." }),
          b === "error" && w && /* @__PURE__ */ c.jsx(wr, { tone: "danger", children: w })
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: s7, children: [
      /* @__PURE__ */ c.jsxs(Ia, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ c.jsx("h3", { id: "identity-heading", className: Zr, children: "01 / Identity" }),
        /* @__PURE__ */ c.jsxs("label", { className: o7, children: [
          /* @__PURE__ */ c.jsxs("span", { className: i7, children: [
            /* @__PURE__ */ c.jsx("span", { className: Ox, children: "Character name" }),
            t.savedHint && /* @__PURE__ */ c.jsx(
              "span",
              {
                className: l7,
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
        /* @__PURE__ */ c.jsx("span", { className: Ox, children: "Speaker reference" }),
        /* @__PURE__ */ c.jsx(
          R7,
          {
            value: a.speakerVoiceAssetId,
            voices: s,
            onChange: t.onSpeakerChange
          }
        ),
        o && /* @__PURE__ */ c.jsx(_7, { voice: o }),
        /* @__PURE__ */ c.jsx(
          Mw,
          {
            label: o ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (T) => t.onUploadVoice(T, T.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ c.jsx(
          IB,
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
function R7({
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
function _7({ voice: t }) {
  const a = z7(t.durationMs ?? null);
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: f7, children: [
      /* @__PURE__ */ c.jsx("span", { children: t.displayName }),
      /* @__PURE__ */ c.jsx("span", { children: t.kind }),
      t.durationMs != null && /* @__PURE__ */ c.jsx("span", { children: O7(t.durationMs) }),
      t.sampleRate && /* @__PURE__ */ c.jsxs("span", { children: [
        t.sampleRate,
        " Hz"
      ] })
    ] }),
    t.durationMs != null && /* @__PURE__ */ c.jsxs("div", { className: h7, children: [
      /* @__PURE__ */ c.jsx("div", { className: m7, children: /* @__PURE__ */ c.jsx(Sm, { features: Nm, children: /* @__PURE__ */ c.jsx(
        Em.div,
        {
          className: p7,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, t.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ c.jsx(wr, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ c.jsx(M7, { seed: t.contentSha256 })
  ] });
}
function M7({ seed: t }) {
  const a = g.useMemo(() => L7(t, 48), [t]);
  return /* @__PURE__ */ c.jsx("div", { className: b7, "aria-hidden": "true", children: a.map((s, i) => /* @__PURE__ */ c.jsx(
    "span",
    {
      className: x7,
      style: { height: `${Math.max(6, s * 100)}%` }
    },
    `${t}-${i}`
  )) });
}
function Mw({
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
      className: o ? d7 : s ? u7 : c7,
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
function A7({
  onExport: t,
  onImport: a,
  onParseError: s
}) {
  const [i, o] = g.useState("error"), u = g.useRef(null);
  return /* @__PURE__ */ c.jsxs("div", { className: _w, children: [
    /* @__PURE__ */ c.jsx(Qe, { variant: "secondary", size: "sm", onClick: t, children: "Export JSON" }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        ref: u,
        type: "file",
        accept: "application/json,.json",
        className: E7,
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
    /* @__PURE__ */ c.jsx(Qe, { variant: "secondary", size: "sm", onClick: () => u.current?.click(), children: "Import JSON" }),
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
function k7(t) {
  const a = new Set(t.map((i) => i.characterName.toLowerCase()));
  let s = 1;
  for (; a.has(`character ${s}`); ) s += 1;
  return `Character ${s}`;
}
function D7(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function z7(t) {
  return t == null ? null : t < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : t > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : t > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function O7(t) {
  return t < 1e3 ? `${t} ms` : `${Math.round(t / 100) / 10}s`;
}
function L7(t, a) {
  const s = [];
  for (let i = 0; i < a; i += 1) {
    const o = t.charCodeAt(i % t.length);
    s.push((o * 31 + i * 7) % 100 / 100);
  }
  return s;
}
function $7(t, a) {
  const s = new Blob([JSON.stringify(t, null, 2)], { type: "application/json" }), i = URL.createObjectURL(s), o = document.createElement("a");
  o.href = i, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(i);
}
function gr(t) {
  return t instanceof ni || t instanceof Error ? t.message : "unknown error";
}
function U7() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: t } = await mT();
        return { deployments: t };
      },
      Component: JT
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: t }) => {
        const a = Vs(t, "deploymentId");
        return wN(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: t }) => {
        const a = Vs(t, "deploymentId"), [s, { mappings: i }, { runs: o }, u] = await Promise.all([
          Yy(a),
          Ky(a),
          yT(a, { limit: 10 }),
          NT(a)
        ]);
        return { deployment: s, mappings: i, runs: o, workflow: u };
      },
      Component: hU
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: t }) => {
        const a = Vs(t, "deploymentId"), s = Vs(t, "runId");
        return { run: await Qh(a, s) };
      },
      Component: j9
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
      Component: N7
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
      Component: nB
    },
    {
      path: "/runtime/queue",
      Component: J9
    }
  ];
}
function Vs(t, a) {
  const s = t[a];
  if (!s)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return s;
}
const Lx = "ext-actions-request", B7 = "ext-actions-declare", I7 = "ext-action-state", $x = "ext-action-invoke", kh = "emotion-tts:navigate", Fs = "emotion-tts.run", Ux = "emotion-tts.mappings", V7 = 4e3;
function q7(t, a) {
  let s = null, i = !1;
  const o = () => {
    const j = s?.badge ?? "not_installed";
    return H7(j, i);
  }, u = () => ({
    primary: o(),
    secondary: {
      id: Ux,
      label: "Mappings",
      icon: "tune",
      tone: "secondary",
      tooltip: "Manage character → voice mappings"
    }
  }), f = () => {
    t.dispatchEvent(
      new CustomEvent(B7, {
        detail: { actions: u() },
        bubbles: !1
      })
    );
  }, m = () => {
    t.dispatchEvent(
      new CustomEvent(I7, {
        detail: { action: o() },
        bubbles: !1
      })
    );
  }, y = () => f(), p = (j) => {
    const N = j.detail?.id;
    N === Fs ? b() : N === Ux && t.dispatchEvent(
      new CustomEvent(kh, {
        detail: { path: `/${a}/mappings` },
        bubbles: !1
      })
    );
  }, b = async () => {
    const j = s?.badge ?? "not_installed", N = j === "ready" || j === "running" || j === "starting";
    i = !0, m();
    try {
      N ? await ZM() : await QM(JM());
      try {
        s = await vl();
      } catch {
      }
    } catch {
    } finally {
      i = !1, m();
    }
  };
  t.addEventListener(Lx, y), t.addEventListener($x, p);
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
  const S = window.setInterval(() => void w(), V7);
  return f(), {
    dispose: () => {
      v = !0, window.clearInterval(S), t.removeEventListener(Lx, y), t.removeEventListener($x, p);
    }
  };
}
function H7(t, a) {
  const s = t === "ready" || t === "running" || t === "starting", i = t === "stopped" || t === "not_installed" || t === "failed";
  return a ? {
    id: Fs,
    label: s ? "Stopping…" : "Starting…",
    icon: s ? "stop" : "play_arrow",
    tone: "primary",
    state: "loading"
  } : t === "starting" || t === "installing" || t === "stopping" ? {
    id: Fs,
    label: M1(t),
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
const Dh = "emotion-tts-app", F7 = "ext-event", Bx = "emotion-tts-stylesheet", Ix = ["accent", "density", "card"];
function P7(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function G7() {
  if (typeof document > "u" || document.getElementById(Bx)) return;
  const t = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = Bx, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
G7();
class Y7 extends HTMLElement {
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
    this.root = YE.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(kh, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = q7(this, a), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
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
    for (const a of Ix) {
      const s = P7(a);
      s === void 0 ? delete this.dataset[a] : this.dataset[a] !== s && (this.dataset[a] = s);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: Ix.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), s = _C(U7(), { initialEntries: [a] });
    this.router = s, this.root.render(
      /* @__PURE__ */ c.jsx(g.StrictMode, { children: /* @__PURE__ */ c.jsx(AC, { router: s }) })
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
      new CustomEvent(F7, {
        detail: { topic: a, payload: s },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function K7() {
  typeof customElements > "u" || customElements.get(Dh) || customElements.define(Dh, Y7);
}
typeof customElements < "u" && !customElements.get(Dh) && K7();
export {
  K7 as register
};
//# sourceMappingURL=emotion-tts.js.map
