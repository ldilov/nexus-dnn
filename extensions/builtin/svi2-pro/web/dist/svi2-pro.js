function dE(t, a) {
  for (var r = 0; r < a.length; r++) {
    const l = a[r];
    if (typeof l != "string" && !Array.isArray(l)) {
      for (const s in l)
        if (s !== "default" && !(s in t)) {
          const u = Object.getOwnPropertyDescriptor(l, s);
          u && Object.defineProperty(t, s, u.get ? u : {
            enumerable: !0,
            get: () => l[s]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
function Mh(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var xd = { exports: {} }, po = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Q0;
function hE() {
  if (Q0) return po;
  Q0 = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function r(l, s, u) {
    var c = null;
    if (u !== void 0 && (c = "" + u), s.key !== void 0 && (c = "" + s.key), "key" in s) {
      u = {};
      for (var h in s)
        h !== "key" && (u[h] = s[h]);
    } else u = s;
    return s = u.ref, {
      $$typeof: t,
      type: l,
      key: c,
      ref: s !== void 0 ? s : null,
      props: u
    };
  }
  return po.Fragment = a, po.jsx = r, po.jsxs = r, po;
}
var F0;
function mE() {
  return F0 || (F0 = 1, xd.exports = hE()), xd.exports;
}
var S = mE(), wd = { exports: {} }, Ve = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var K0;
function pE() {
  if (K0) return Ve;
  K0 = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), c = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), p = Symbol.for("react.activity"), v = Symbol.iterator;
  function b(A) {
    return A === null || typeof A != "object" ? null : (A = v && A[v] || A["@@iterator"], typeof A == "function" ? A : null);
  }
  var w = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, R = Object.assign, T = {};
  function _(A, k, F) {
    this.props = A, this.context = k, this.refs = T, this.updater = F || w;
  }
  _.prototype.isReactComponent = {}, _.prototype.setState = function(A, k) {
    if (typeof A != "object" && typeof A != "function" && A != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, A, k, "setState");
  }, _.prototype.forceUpdate = function(A) {
    this.updater.enqueueForceUpdate(this, A, "forceUpdate");
  };
  function O() {
  }
  O.prototype = _.prototype;
  function E(A, k, F) {
    this.props = A, this.context = k, this.refs = T, this.updater = F || w;
  }
  var L = E.prototype = new O();
  L.constructor = E, R(L, _.prototype), L.isPureReactComponent = !0;
  var B = Array.isArray;
  function H() {
  }
  var V = { H: null, A: null, T: null, S: null }, D = Object.prototype.hasOwnProperty;
  function G(A, k, F) {
    var ee = F.ref;
    return {
      $$typeof: t,
      type: A,
      key: k,
      ref: ee !== void 0 ? ee : null,
      props: F
    };
  }
  function le(A, k) {
    return G(A.type, k, A.props);
  }
  function $(A) {
    return typeof A == "object" && A !== null && A.$$typeof === t;
  }
  function K(A) {
    var k = { "=": "=0", ":": "=2" };
    return "$" + A.replace(/[=:]/g, function(F) {
      return k[F];
    });
  }
  var re = /\/+/g;
  function j(A, k) {
    return typeof A == "object" && A !== null && A.key != null ? K("" + A.key) : k.toString(36);
  }
  function I(A) {
    switch (A.status) {
      case "fulfilled":
        return A.value;
      case "rejected":
        throw A.reason;
      default:
        switch (typeof A.status == "string" ? A.then(H, H) : (A.status = "pending", A.then(
          function(k) {
            A.status === "pending" && (A.status = "fulfilled", A.value = k);
          },
          function(k) {
            A.status === "pending" && (A.status = "rejected", A.reason = k);
          }
        )), A.status) {
          case "fulfilled":
            return A.value;
          case "rejected":
            throw A.reason;
        }
    }
    throw A;
  }
  function C(A, k, F, ee, se) {
    var he = typeof A;
    (he === "undefined" || he === "boolean") && (A = null);
    var me = !1;
    if (A === null) me = !0;
    else
      switch (he) {
        case "bigint":
        case "string":
        case "number":
          me = !0;
          break;
        case "object":
          switch (A.$$typeof) {
            case t:
            case a:
              me = !0;
              break;
            case y:
              return me = A._init, C(
                me(A._payload),
                k,
                F,
                ee,
                se
              );
          }
      }
    if (me)
      return se = se(A), me = ee === "" ? "." + j(A, 0) : ee, B(se) ? (F = "", me != null && (F = me.replace(re, "$&/") + "/"), C(se, k, F, "", function(ze) {
        return ze;
      })) : se != null && ($(se) && (se = le(
        se,
        F + (se.key == null || A && A.key === se.key ? "" : ("" + se.key).replace(
          re,
          "$&/"
        ) + "/") + me
      )), k.push(se)), 1;
    me = 0;
    var W = ee === "" ? "." : ee + ":";
    if (B(A))
      for (var ge = 0; ge < A.length; ge++)
        ee = A[ge], he = W + j(ee, ge), me += C(
          ee,
          k,
          F,
          he,
          se
        );
    else if (ge = b(A), typeof ge == "function")
      for (A = ge.call(A), ge = 0; !(ee = A.next()).done; )
        ee = ee.value, he = W + j(ee, ge++), me += C(
          ee,
          k,
          F,
          he,
          se
        );
    else if (he === "object") {
      if (typeof A.then == "function")
        return C(
          I(A),
          k,
          F,
          ee,
          se
        );
      throw k = String(A), Error(
        "Objects are not valid as a React child (found: " + (k === "[object Object]" ? "object with keys {" + Object.keys(A).join(", ") + "}" : k) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return me;
  }
  function z(A, k, F) {
    if (A == null) return A;
    var ee = [], se = 0;
    return C(A, ee, "", "", function(he) {
      return k.call(F, he, se++);
    }), ee;
  }
  function Y(A) {
    if (A._status === -1) {
      var k = A._result;
      k = k(), k.then(
        function(F) {
          (A._status === 0 || A._status === -1) && (A._status = 1, A._result = F);
        },
        function(F) {
          (A._status === 0 || A._status === -1) && (A._status = 2, A._result = F);
        }
      ), A._status === -1 && (A._status = 0, A._result = k);
    }
    if (A._status === 1) return A._result.default;
    throw A._result;
  }
  var X = typeof reportError == "function" ? reportError : function(A) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var k = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof A == "object" && A !== null && typeof A.message == "string" ? String(A.message) : String(A),
        error: A
      });
      if (!window.dispatchEvent(k)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", A);
      return;
    }
    console.error(A);
  }, te = {
    map: z,
    forEach: function(A, k, F) {
      z(
        A,
        function() {
          k.apply(this, arguments);
        },
        F
      );
    },
    count: function(A) {
      var k = 0;
      return z(A, function() {
        k++;
      }), k;
    },
    toArray: function(A) {
      return z(A, function(k) {
        return k;
      }) || [];
    },
    only: function(A) {
      if (!$(A))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return A;
    }
  };
  return Ve.Activity = p, Ve.Children = te, Ve.Component = _, Ve.Fragment = r, Ve.Profiler = s, Ve.PureComponent = E, Ve.StrictMode = l, Ve.Suspense = g, Ve.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = V, Ve.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(A) {
      return V.H.useMemoCache(A);
    }
  }, Ve.cache = function(A) {
    return function() {
      return A.apply(null, arguments);
    };
  }, Ve.cacheSignal = function() {
    return null;
  }, Ve.cloneElement = function(A, k, F) {
    if (A == null)
      throw Error(
        "The argument must be a React element, but you passed " + A + "."
      );
    var ee = R({}, A.props), se = A.key;
    if (k != null)
      for (he in k.key !== void 0 && (se = "" + k.key), k)
        !D.call(k, he) || he === "key" || he === "__self" || he === "__source" || he === "ref" && k.ref === void 0 || (ee[he] = k[he]);
    var he = arguments.length - 2;
    if (he === 1) ee.children = F;
    else if (1 < he) {
      for (var me = Array(he), W = 0; W < he; W++)
        me[W] = arguments[W + 2];
      ee.children = me;
    }
    return G(A.type, se, ee);
  }, Ve.createContext = function(A) {
    return A = {
      $$typeof: c,
      _currentValue: A,
      _currentValue2: A,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, A.Provider = A, A.Consumer = {
      $$typeof: u,
      _context: A
    }, A;
  }, Ve.createElement = function(A, k, F) {
    var ee, se = {}, he = null;
    if (k != null)
      for (ee in k.key !== void 0 && (he = "" + k.key), k)
        D.call(k, ee) && ee !== "key" && ee !== "__self" && ee !== "__source" && (se[ee] = k[ee]);
    var me = arguments.length - 2;
    if (me === 1) se.children = F;
    else if (1 < me) {
      for (var W = Array(me), ge = 0; ge < me; ge++)
        W[ge] = arguments[ge + 2];
      se.children = W;
    }
    if (A && A.defaultProps)
      for (ee in me = A.defaultProps, me)
        se[ee] === void 0 && (se[ee] = me[ee]);
    return G(A, he, se);
  }, Ve.createRef = function() {
    return { current: null };
  }, Ve.forwardRef = function(A) {
    return { $$typeof: h, render: A };
  }, Ve.isValidElement = $, Ve.lazy = function(A) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: A },
      _init: Y
    };
  }, Ve.memo = function(A, k) {
    return {
      $$typeof: m,
      type: A,
      compare: k === void 0 ? null : k
    };
  }, Ve.startTransition = function(A) {
    var k = V.T, F = {};
    V.T = F;
    try {
      var ee = A(), se = V.S;
      se !== null && se(F, ee), typeof ee == "object" && ee !== null && typeof ee.then == "function" && ee.then(H, X);
    } catch (he) {
      X(he);
    } finally {
      k !== null && F.types !== null && (k.types = F.types), V.T = k;
    }
  }, Ve.unstable_useCacheRefresh = function() {
    return V.H.useCacheRefresh();
  }, Ve.use = function(A) {
    return V.H.use(A);
  }, Ve.useActionState = function(A, k, F) {
    return V.H.useActionState(A, k, F);
  }, Ve.useCallback = function(A, k) {
    return V.H.useCallback(A, k);
  }, Ve.useContext = function(A) {
    return V.H.useContext(A);
  }, Ve.useDebugValue = function() {
  }, Ve.useDeferredValue = function(A, k) {
    return V.H.useDeferredValue(A, k);
  }, Ve.useEffect = function(A, k) {
    return V.H.useEffect(A, k);
  }, Ve.useEffectEvent = function(A) {
    return V.H.useEffectEvent(A);
  }, Ve.useId = function() {
    return V.H.useId();
  }, Ve.useImperativeHandle = function(A, k, F) {
    return V.H.useImperativeHandle(A, k, F);
  }, Ve.useInsertionEffect = function(A, k) {
    return V.H.useInsertionEffect(A, k);
  }, Ve.useLayoutEffect = function(A, k) {
    return V.H.useLayoutEffect(A, k);
  }, Ve.useMemo = function(A, k) {
    return V.H.useMemo(A, k);
  }, Ve.useOptimistic = function(A, k) {
    return V.H.useOptimistic(A, k);
  }, Ve.useReducer = function(A, k, F) {
    return V.H.useReducer(A, k, F);
  }, Ve.useRef = function(A) {
    return V.H.useRef(A);
  }, Ve.useState = function(A) {
    return V.H.useState(A);
  }, Ve.useSyncExternalStore = function(A, k, F) {
    return V.H.useSyncExternalStore(
      A,
      k,
      F
    );
  }, Ve.useTransition = function() {
    return V.H.useTransition();
  }, Ve.version = "19.2.7", Ve;
}
var P0;
function qo() {
  return P0 || (P0 = 1, wd.exports = pE()), wd.exports;
}
var N = qo();
const ye = /* @__PURE__ */ Mh(N), gE = /* @__PURE__ */ dE({
  __proto__: null,
  default: ye
}, [N]);
var Sd = { exports: {} }, go = {}, Ed = { exports: {} }, _d = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var J0;
function yE() {
  return J0 || (J0 = 1, (function(t) {
    function a(C, z) {
      var Y = C.length;
      C.push(z);
      e: for (; 0 < Y; ) {
        var X = Y - 1 >>> 1, te = C[X];
        if (0 < s(te, z))
          C[X] = z, C[Y] = te, Y = X;
        else break e;
      }
    }
    function r(C) {
      return C.length === 0 ? null : C[0];
    }
    function l(C) {
      if (C.length === 0) return null;
      var z = C[0], Y = C.pop();
      if (Y !== z) {
        C[0] = Y;
        e: for (var X = 0, te = C.length, A = te >>> 1; X < A; ) {
          var k = 2 * (X + 1) - 1, F = C[k], ee = k + 1, se = C[ee];
          if (0 > s(F, Y))
            ee < te && 0 > s(se, F) ? (C[X] = se, C[ee] = Y, X = ee) : (C[X] = F, C[k] = Y, X = k);
          else if (ee < te && 0 > s(se, Y))
            C[X] = se, C[ee] = Y, X = ee;
          else break e;
        }
      }
      return z;
    }
    function s(C, z) {
      var Y = C.sortIndex - z.sortIndex;
      return Y !== 0 ? Y : C.id - z.id;
    }
    if (t.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var u = performance;
      t.unstable_now = function() {
        return u.now();
      };
    } else {
      var c = Date, h = c.now();
      t.unstable_now = function() {
        return c.now() - h;
      };
    }
    var g = [], m = [], y = 1, p = null, v = 3, b = !1, w = !1, R = !1, T = !1, _ = typeof setTimeout == "function" ? setTimeout : null, O = typeof clearTimeout == "function" ? clearTimeout : null, E = typeof setImmediate < "u" ? setImmediate : null;
    function L(C) {
      for (var z = r(m); z !== null; ) {
        if (z.callback === null) l(m);
        else if (z.startTime <= C)
          l(m), z.sortIndex = z.expirationTime, a(g, z);
        else break;
        z = r(m);
      }
    }
    function B(C) {
      if (R = !1, L(C), !w)
        if (r(g) !== null)
          w = !0, H || (H = !0, K());
        else {
          var z = r(m);
          z !== null && I(B, z.startTime - C);
        }
    }
    var H = !1, V = -1, D = 5, G = -1;
    function le() {
      return T ? !0 : !(t.unstable_now() - G < D);
    }
    function $() {
      if (T = !1, H) {
        var C = t.unstable_now();
        G = C;
        var z = !0;
        try {
          e: {
            w = !1, R && (R = !1, O(V), V = -1), b = !0;
            var Y = v;
            try {
              t: {
                for (L(C), p = r(g); p !== null && !(p.expirationTime > C && le()); ) {
                  var X = p.callback;
                  if (typeof X == "function") {
                    p.callback = null, v = p.priorityLevel;
                    var te = X(
                      p.expirationTime <= C
                    );
                    if (C = t.unstable_now(), typeof te == "function") {
                      p.callback = te, L(C), z = !0;
                      break t;
                    }
                    p === r(g) && l(g), L(C);
                  } else l(g);
                  p = r(g);
                }
                if (p !== null) z = !0;
                else {
                  var A = r(m);
                  A !== null && I(
                    B,
                    A.startTime - C
                  ), z = !1;
                }
              }
              break e;
            } finally {
              p = null, v = Y, b = !1;
            }
            z = void 0;
          }
        } finally {
          z ? K() : H = !1;
        }
      }
    }
    var K;
    if (typeof E == "function")
      K = function() {
        E($);
      };
    else if (typeof MessageChannel < "u") {
      var re = new MessageChannel(), j = re.port2;
      re.port1.onmessage = $, K = function() {
        j.postMessage(null);
      };
    } else
      K = function() {
        _($, 0);
      };
    function I(C, z) {
      V = _(function() {
        C(t.unstable_now());
      }, z);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(C) {
      C.callback = null;
    }, t.unstable_forceFrameRate = function(C) {
      0 > C || 125 < C ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : D = 0 < C ? Math.floor(1e3 / C) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return v;
    }, t.unstable_next = function(C) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var z = 3;
          break;
        default:
          z = v;
      }
      var Y = v;
      v = z;
      try {
        return C();
      } finally {
        v = Y;
      }
    }, t.unstable_requestPaint = function() {
      T = !0;
    }, t.unstable_runWithPriority = function(C, z) {
      switch (C) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          C = 3;
      }
      var Y = v;
      v = C;
      try {
        return z();
      } finally {
        v = Y;
      }
    }, t.unstable_scheduleCallback = function(C, z, Y) {
      var X = t.unstable_now();
      switch (typeof Y == "object" && Y !== null ? (Y = Y.delay, Y = typeof Y == "number" && 0 < Y ? X + Y : X) : Y = X, C) {
        case 1:
          var te = -1;
          break;
        case 2:
          te = 250;
          break;
        case 5:
          te = 1073741823;
          break;
        case 4:
          te = 1e4;
          break;
        default:
          te = 5e3;
      }
      return te = Y + te, C = {
        id: y++,
        callback: z,
        priorityLevel: C,
        startTime: Y,
        expirationTime: te,
        sortIndex: -1
      }, Y > X ? (C.sortIndex = Y, a(m, C), r(g) === null && C === r(m) && (R ? (O(V), V = -1) : R = !0, I(B, Y - X))) : (C.sortIndex = te, a(g, C), w || b || (w = !0, H || (H = !0, K()))), C;
    }, t.unstable_shouldYield = le, t.unstable_wrapCallback = function(C) {
      var z = v;
      return function() {
        var Y = v;
        v = z;
        try {
          return C.apply(this, arguments);
        } finally {
          v = Y;
        }
      };
    };
  })(_d)), _d;
}
var W0;
function vE() {
  return W0 || (W0 = 1, Ed.exports = yE()), Ed.exports;
}
var Nd = { exports: {} }, fn = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ey;
function bE() {
  if (ey) return fn;
  ey = 1;
  var t = qo();
  function a(g) {
    var m = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        m += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return "Minified React error #" + g + "; visit " + m + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r() {
  }
  var l = {
    d: {
      f: r,
      r: function() {
        throw Error(a(522));
      },
      D: r,
      C: r,
      L: r,
      m: r,
      X: r,
      S: r,
      M: r
    },
    p: 0,
    findDOMNode: null
  }, s = Symbol.for("react.portal");
  function u(g, m, y) {
    var p = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: p == null ? null : "" + p,
      children: g,
      containerInfo: m,
      implementation: y
    };
  }
  var c = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(g, m) {
    if (g === "font") return "";
    if (typeof m == "string")
      return m === "use-credentials" ? m : "";
  }
  return fn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, fn.createPortal = function(g, m) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(a(299));
    return u(g, m, null, y);
  }, fn.flushSync = function(g) {
    var m = c.T, y = l.p;
    try {
      if (c.T = null, l.p = 2, g) return g();
    } finally {
      c.T = m, l.p = y, l.d.f();
    }
  }, fn.preconnect = function(g, m) {
    typeof g == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, l.d.C(g, m));
  }, fn.prefetchDNS = function(g) {
    typeof g == "string" && l.d.D(g);
  }, fn.preinit = function(g, m) {
    if (typeof g == "string" && m && typeof m.as == "string") {
      var y = m.as, p = h(y, m.crossOrigin), v = typeof m.integrity == "string" ? m.integrity : void 0, b = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
      y === "style" ? l.d.S(
        g,
        typeof m.precedence == "string" ? m.precedence : void 0,
        {
          crossOrigin: p,
          integrity: v,
          fetchPriority: b
        }
      ) : y === "script" && l.d.X(g, {
        crossOrigin: p,
        integrity: v,
        fetchPriority: b,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0
      });
    }
  }, fn.preinitModule = function(g, m) {
    if (typeof g == "string")
      if (typeof m == "object" && m !== null) {
        if (m.as == null || m.as === "script") {
          var y = h(
            m.as,
            m.crossOrigin
          );
          l.d.M(g, {
            crossOrigin: y,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
            nonce: typeof m.nonce == "string" ? m.nonce : void 0
          });
        }
      } else m == null && l.d.M(g);
  }, fn.preload = function(g, m) {
    if (typeof g == "string" && typeof m == "object" && m !== null && typeof m.as == "string") {
      var y = m.as, p = h(y, m.crossOrigin);
      l.d.L(g, y, {
        crossOrigin: p,
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
  }, fn.preloadModule = function(g, m) {
    if (typeof g == "string")
      if (m) {
        var y = h(m.as, m.crossOrigin);
        l.d.m(g, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: y,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0
        });
      } else l.d.m(g);
  }, fn.requestFormReset = function(g) {
    l.d.r(g);
  }, fn.unstable_batchedUpdates = function(g, m) {
    return g(m);
  }, fn.useFormState = function(g, m, y) {
    return c.H.useFormState(g, m, y);
  }, fn.useFormStatus = function() {
    return c.H.useHostTransitionStatus();
  }, fn.version = "19.2.7", fn;
}
var ty;
function wb() {
  if (ty) return Nd.exports;
  ty = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), Nd.exports = bE(), Nd.exports;
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
var ny;
function xE() {
  if (ny) return go;
  ny = 1;
  var t = vE(), a = qo(), r = wb();
  function l(e) {
    var n = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var i = 2; i < arguments.length; i++)
        n += "&args[]=" + encodeURIComponent(arguments[i]);
    }
    return "Minified React error #" + e + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function u(e) {
    var n = e, i = e;
    if (e.alternate) for (; n.return; ) n = n.return;
    else {
      e = n;
      do
        n = e, (n.flags & 4098) !== 0 && (i = n.return), e = n.return;
      while (e);
    }
    return n.tag === 3 ? i : null;
  }
  function c(e) {
    if (e.tag === 13) {
      var n = e.memoizedState;
      if (n === null && (e = e.alternate, e !== null && (n = e.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function h(e) {
    if (e.tag === 31) {
      var n = e.memoizedState;
      if (n === null && (e = e.alternate, e !== null && (n = e.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function g(e) {
    if (u(e) !== e)
      throw Error(l(188));
  }
  function m(e) {
    var n = e.alternate;
    if (!n) {
      if (n = u(e), n === null) throw Error(l(188));
      return n !== e ? null : e;
    }
    for (var i = e, o = n; ; ) {
      var f = i.return;
      if (f === null) break;
      var d = f.alternate;
      if (d === null) {
        if (o = f.return, o !== null) {
          i = o;
          continue;
        }
        break;
      }
      if (f.child === d.child) {
        for (d = f.child; d; ) {
          if (d === i) return g(f), e;
          if (d === o) return g(f), n;
          d = d.sibling;
        }
        throw Error(l(188));
      }
      if (i.return !== o.return) i = f, o = d;
      else {
        for (var x = !1, M = f.child; M; ) {
          if (M === i) {
            x = !0, i = f, o = d;
            break;
          }
          if (M === o) {
            x = !0, o = f, i = d;
            break;
          }
          M = M.sibling;
        }
        if (!x) {
          for (M = d.child; M; ) {
            if (M === i) {
              x = !0, i = d, o = f;
              break;
            }
            if (M === o) {
              x = !0, o = d, i = f;
              break;
            }
            M = M.sibling;
          }
          if (!x) throw Error(l(189));
        }
      }
      if (i.alternate !== o) throw Error(l(190));
    }
    if (i.tag !== 3) throw Error(l(188));
    return i.stateNode.current === i ? e : n;
  }
  function y(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e;
    for (e = e.child; e !== null; ) {
      if (n = y(e), n !== null) return n;
      e = e.sibling;
    }
    return null;
  }
  var p = Object.assign, v = Symbol.for("react.element"), b = Symbol.for("react.transitional.element"), w = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), T = Symbol.for("react.strict_mode"), _ = Symbol.for("react.profiler"), O = Symbol.for("react.consumer"), E = Symbol.for("react.context"), L = Symbol.for("react.forward_ref"), B = Symbol.for("react.suspense"), H = Symbol.for("react.suspense_list"), V = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), G = Symbol.for("react.activity"), le = Symbol.for("react.memo_cache_sentinel"), $ = Symbol.iterator;
  function K(e) {
    return e === null || typeof e != "object" ? null : (e = $ && e[$] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var re = Symbol.for("react.client.reference");
  function j(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === re ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case R:
        return "Fragment";
      case _:
        return "Profiler";
      case T:
        return "StrictMode";
      case B:
        return "Suspense";
      case H:
        return "SuspenseList";
      case G:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case w:
          return "Portal";
        case E:
          return e.displayName || "Context";
        case O:
          return (e._context.displayName || "Context") + ".Consumer";
        case L:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case V:
          return n = e.displayName || null, n !== null ? n : j(e.type) || "Memo";
        case D:
          n = e._payload, e = e._init;
          try {
            return j(e(n));
          } catch {
          }
      }
    return null;
  }
  var I = Array.isArray, C = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, z = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Y = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, X = [], te = -1;
  function A(e) {
    return { current: e };
  }
  function k(e) {
    0 > te || (e.current = X[te], X[te] = null, te--);
  }
  function F(e, n) {
    te++, X[te] = e.current, e.current = n;
  }
  var ee = A(null), se = A(null), he = A(null), me = A(null);
  function W(e, n) {
    switch (F(he, n), F(se, e), F(ee, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? y0(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = y0(n), e = v0(n, e);
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
    k(ee), F(ee, e);
  }
  function ge() {
    k(ee), k(se), k(he);
  }
  function ze(e) {
    e.memoizedState !== null && F(me, e);
    var n = ee.current, i = v0(n, e.type);
    n !== i && (F(se, e), F(ee, i));
  }
  function Ce(e) {
    se.current === e && (k(ee), k(se)), me.current === e && (k(me), co._currentValue = Y);
  }
  var Se, xe;
  function Re(e) {
    if (Se === void 0)
      try {
        throw Error();
      } catch (i) {
        var n = i.stack.trim().match(/\n( *(at )?)/);
        Se = n && n[1] || "", xe = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Se + e + xe;
  }
  var Ye = !1;
  function ft(e, n) {
    if (!e || Ye) return "";
    Ye = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var o = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var fe = function() {
                throw Error();
              };
              if (Object.defineProperty(fe.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(fe, []);
                } catch (oe) {
                  var ie = oe;
                }
                Reflect.construct(e, [], fe);
              } else {
                try {
                  fe.call();
                } catch (oe) {
                  ie = oe;
                }
                e.call(fe.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (oe) {
                ie = oe;
              }
              (fe = e()) && typeof fe.catch == "function" && fe.catch(function() {
              });
            }
          } catch (oe) {
            if (oe && ie && typeof oe.stack == "string")
              return [oe.stack, ie.stack];
          }
          return [null, null];
        }
      };
      o.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var f = Object.getOwnPropertyDescriptor(
        o.DetermineComponentFrameRoot,
        "name"
      );
      f && f.configurable && Object.defineProperty(
        o.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var d = o.DetermineComponentFrameRoot(), x = d[0], M = d[1];
      if (x && M) {
        var q = x.split(`
`), ae = M.split(`
`);
        for (f = o = 0; o < q.length && !q[o].includes("DetermineComponentFrameRoot"); )
          o++;
        for (; f < ae.length && !ae[f].includes(
          "DetermineComponentFrameRoot"
        ); )
          f++;
        if (o === q.length || f === ae.length)
          for (o = q.length - 1, f = ae.length - 1; 1 <= o && 0 <= f && q[o] !== ae[f]; )
            f--;
        for (; 1 <= o && 0 <= f; o--, f--)
          if (q[o] !== ae[f]) {
            if (o !== 1 || f !== 1)
              do
                if (o--, f--, 0 > f || q[o] !== ae[f]) {
                  var ue = `
` + q[o].replace(" at new ", " at ");
                  return e.displayName && ue.includes("<anonymous>") && (ue = ue.replace("<anonymous>", e.displayName)), ue;
                }
              while (1 <= o && 0 <= f);
            break;
          }
      }
    } finally {
      Ye = !1, Error.prepareStackTrace = i;
    }
    return (i = e ? e.displayName || e.name : "") ? Re(i) : "";
  }
  function Te(e, n) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Re(e.type);
      case 16:
        return Re("Lazy");
      case 13:
        return e.child !== n && n !== null ? Re("Suspense Fallback") : Re("Suspense");
      case 19:
        return Re("SuspenseList");
      case 0:
      case 15:
        return ft(e.type, !1);
      case 11:
        return ft(e.type.render, !1);
      case 1:
        return ft(e.type, !0);
      case 31:
        return Re("Activity");
      default:
        return "";
    }
  }
  function Ie(e) {
    try {
      var n = "", i = null;
      do
        n += Te(e, i), i = e, e = e.return;
      while (e);
      return n;
    } catch (o) {
      return `
Error generating stack: ` + o.message + `
` + o.stack;
    }
  }
  var Be = Object.prototype.hasOwnProperty, $e = t.unstable_scheduleCallback, St = t.unstable_cancelCallback, Je = t.unstable_shouldYield, Qe = t.unstable_requestPaint, Fe = t.unstable_now, gt = t.unstable_getCurrentPriorityLevel, yt = t.unstable_ImmediatePriority, Xt = t.unstable_UserBlockingPriority, jt = t.unstable_NormalPriority, mt = t.unstable_LowPriority, ot = t.unstable_IdlePriority, Yn = t.log, yn = t.unstable_setDisableYieldValue, tn = null, Kt = null;
  function Ot(e) {
    if (typeof Yn == "function" && yn(e), Kt && typeof Kt.setStrictMode == "function")
      try {
        Kt.setStrictMode(tn, e);
      } catch {
      }
  }
  var kt = Math.clz32 ? Math.clz32 : vn, ci = Math.log, wa = Math.LN2;
  function vn(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (ci(e) / wa | 0) | 0;
  }
  var ra = 256, Mn = 262144, $n = 4194304;
  function un(e) {
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
  function He(e, n, i) {
    var o = e.pendingLanes;
    if (o === 0) return 0;
    var f = 0, d = e.suspendedLanes, x = e.pingedLanes;
    e = e.warmLanes;
    var M = o & 134217727;
    return M !== 0 ? (o = M & ~d, o !== 0 ? f = un(o) : (x &= M, x !== 0 ? f = un(x) : i || (i = M & ~e, i !== 0 && (f = un(i))))) : (M = o & ~d, M !== 0 ? f = un(M) : x !== 0 ? f = un(x) : i || (i = o & ~e, i !== 0 && (f = un(i)))), f === 0 ? 0 : n !== 0 && n !== f && (n & d) === 0 && (d = f & -f, i = n & -n, d >= i || d === 32 && (i & 4194048) !== 0) ? n : f;
  }
  function vt(e, n) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & n) === 0;
  }
  function Ht(e, n) {
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
  function Vt() {
    var e = $n;
    return $n <<= 1, ($n & 62914560) === 0 && ($n = 4194304), e;
  }
  function mn(e) {
    for (var n = [], i = 0; 31 > i; i++) n.push(e);
    return n;
  }
  function pt(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Pt(e, n, i, o, f, d) {
    var x = e.pendingLanes;
    e.pendingLanes = i, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= i, e.entangledLanes &= i, e.errorRecoveryDisabledLanes &= i, e.shellSuspendCounter = 0;
    var M = e.entanglements, q = e.expirationTimes, ae = e.hiddenUpdates;
    for (i = x & ~i; 0 < i; ) {
      var ue = 31 - kt(i), fe = 1 << ue;
      M[ue] = 0, q[ue] = -1;
      var ie = ae[ue];
      if (ie !== null)
        for (ae[ue] = null, ue = 0; ue < ie.length; ue++) {
          var oe = ie[ue];
          oe !== null && (oe.lane &= -536870913);
        }
      i &= ~fe;
    }
    o !== 0 && la(e, o, 0), d !== 0 && f === 0 && e.tag !== 0 && (e.suspendedLanes |= d & ~(x & ~n));
  }
  function la(e, n, i) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var o = 31 - kt(n);
    e.entangledLanes |= n, e.entanglements[o] = e.entanglements[o] | 1073741824 | i & 261930;
  }
  function Wt(e, n) {
    var i = e.entangledLanes |= n;
    for (e = e.entanglements; i; ) {
      var o = 31 - kt(i), f = 1 << o;
      f & n | e[o] & n && (e[o] |= n), i &= ~f;
    }
  }
  function U(e, n) {
    var i = n & -n;
    return i = (i & 42) !== 0 ? 1 : Q(i), (i & (e.suspendedLanes | n)) !== 0 ? 0 : i;
  }
  function Q(e) {
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
  function J(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function de() {
    var e = z.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : q0(e.type));
  }
  function pe(e, n) {
    var i = z.p;
    try {
      return z.p = e, n();
    } finally {
      z.p = i;
    }
  }
  var Ee = Math.random().toString(36).slice(2), ve = "__reactFiber$" + Ee, we = "__reactProps$" + Ee, be = "__reactContainer$" + Ee, Me = "__reactEvents$" + Ee, De = "__reactListeners$" + Ee, ke = "__reactHandles$" + Ee, Le = "__reactResources$" + Ee, Ge = "__reactMarker$" + Ee;
  function rt(e) {
    delete e[ve], delete e[we], delete e[Me], delete e[De], delete e[ke];
  }
  function Rt(e) {
    var n = e[ve];
    if (n) return n;
    for (var i = e.parentNode; i; ) {
      if (n = i[be] || i[ve]) {
        if (i = n.alternate, n.child !== null || i !== null && i.child !== null)
          for (e = N0(e); e !== null; ) {
            if (i = e[ve]) return i;
            e = N0(e);
          }
        return n;
      }
      e = i, i = e.parentNode;
    }
    return null;
  }
  function st(e) {
    if (e = e[ve] || e[be]) {
      var n = e.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return e;
    }
    return null;
  }
  function We(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e.stateNode;
    throw Error(l(33));
  }
  function Lt(e) {
    var n = e[Le];
    return n || (n = e[Le] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function at(e) {
    e[Ge] = !0;
  }
  var Sa = /* @__PURE__ */ new Set(), Dn = {};
  function cn(e, n) {
    nn(e, n), nn(e + "Capture", n);
  }
  function nn(e, n) {
    for (Dn[e] = n, e = 0; e < n.length; e++)
      Sa.add(n[e]);
  }
  var bn = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), fi = {}, xn = {};
  function di(e) {
    return Be.call(xn, e) ? !0 : Be.call(fi, e) ? !1 : bn.test(e) ? xn[e] = !0 : (fi[e] = !0, !1);
  }
  function oa(e, n, i) {
    if (di(n))
      if (i === null) e.removeAttribute(n);
      else {
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(n);
            return;
          case "boolean":
            var o = n.toLowerCase().slice(0, 5);
            if (o !== "data-" && o !== "aria-") {
              e.removeAttribute(n);
              return;
            }
        }
        e.setAttribute(n, "" + i);
      }
  }
  function sa(e, n, i) {
    if (i === null) e.removeAttribute(n);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttribute(n, "" + i);
    }
  }
  function Ue(e, n, i, o) {
    if (o === null) e.removeAttribute(i);
    else {
      switch (typeof o) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(i);
          return;
      }
      e.setAttributeNS(n, i, "" + o);
    }
  }
  function bt(e) {
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
  function pn(e) {
    var n = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function An(e, n, i) {
    var o = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      n
    );
    if (!e.hasOwnProperty(n) && typeof o < "u" && typeof o.get == "function" && typeof o.set == "function") {
      var f = o.get, d = o.set;
      return Object.defineProperty(e, n, {
        configurable: !0,
        get: function() {
          return f.call(this);
        },
        set: function(x) {
          i = "" + x, d.call(this, x);
        }
      }), Object.defineProperty(e, n, {
        enumerable: o.enumerable
      }), {
        getValue: function() {
          return i;
        },
        setValue: function(x) {
          i = "" + x;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[n];
        }
      };
    }
  }
  function hi(e) {
    if (!e._valueTracker) {
      var n = pn(e) ? "checked" : "value";
      e._valueTracker = An(
        e,
        n,
        "" + e[n]
      );
    }
  }
  function Ha(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var i = n.getValue(), o = "";
    return e && (o = pn(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== i ? (n.setValue(e), !0) : !1;
  }
  function dt(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Xn = /[\n"\\]/g;
  function an(e) {
    return e.replace(
      Xn,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ii(e, n, i, o, f, d, x, M) {
    e.name = "", x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.type = x : e.removeAttribute("type"), n != null ? x === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + bt(n)) : e.value !== "" + bt(n) && (e.value = "" + bt(n)) : x !== "submit" && x !== "reset" || e.removeAttribute("value"), n != null ? Nl(e, x, bt(n)) : i != null ? Nl(e, x, bt(i)) : o != null && e.removeAttribute("value"), f == null && d != null && (e.defaultChecked = !!d), f != null && (e.checked = f && typeof f != "function" && typeof f != "symbol"), M != null && typeof M != "function" && typeof M != "symbol" && typeof M != "boolean" ? e.name = "" + bt(M) : e.removeAttribute("name");
  }
  function Rr(e, n, i, o, f, d, x, M) {
    if (d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.type = d), n != null || i != null) {
      if (!(d !== "submit" && d !== "reset" || n != null)) {
        hi(e);
        return;
      }
      i = i != null ? "" + bt(i) : "", n = n != null ? "" + bt(n) : i, M || n === e.value || (e.value = n), e.defaultValue = n;
    }
    o = o ?? f, o = typeof o != "function" && typeof o != "symbol" && !!o, e.checked = M ? e.checked : !!o, e.defaultChecked = !!o, x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" && (e.name = x), hi(e);
  }
  function Nl(e, n, i) {
    n === "number" && dt(e.ownerDocument) === e || e.defaultValue === "" + i || (e.defaultValue = "" + i);
  }
  function mi(e, n, i, o) {
    if (e = e.options, n) {
      n = {};
      for (var f = 0; f < i.length; f++)
        n["$" + i[f]] = !0;
      for (i = 0; i < e.length; i++)
        f = n.hasOwnProperty("$" + e[i].value), e[i].selected !== f && (e[i].selected = f), f && o && (e[i].defaultSelected = !0);
    } else {
      for (i = "" + bt(i), n = null, f = 0; f < e.length; f++) {
        if (e[f].value === i) {
          e[f].selected = !0, o && (e[f].defaultSelected = !0);
          return;
        }
        n !== null || e[f].disabled || (n = e[f]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function Rl(e, n, i) {
    if (n != null && (n = "" + bt(n), n !== e.value && (e.value = n), i == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = i != null ? "" + bt(i) : "";
  }
  function hm(e, n, i, o) {
    if (n == null) {
      if (o != null) {
        if (i != null) throw Error(l(92));
        if (I(o)) {
          if (1 < o.length) throw Error(l(93));
          o = o[0];
        }
        i = o;
      }
      i == null && (i = ""), n = i;
    }
    i = bt(n), e.defaultValue = i, o = e.textContent, o === i && o !== "" && o !== null && (e.value = o), hi(e);
  }
  function Cr(e, n) {
    if (n) {
      var i = e.firstChild;
      if (i && i === e.lastChild && i.nodeType === 3) {
        i.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var ow = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function mm(e, n, i) {
    var o = n.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? o ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : o ? e.setProperty(n, i) : typeof i != "number" || i === 0 || ow.has(n) ? n === "float" ? e.cssFloat = i : e[n] = ("" + i).trim() : e[n] = i + "px";
  }
  function pm(e, n, i) {
    if (n != null && typeof n != "object")
      throw Error(l(62));
    if (e = e.style, i != null) {
      for (var o in i)
        !i.hasOwnProperty(o) || n != null && n.hasOwnProperty(o) || (o.indexOf("--") === 0 ? e.setProperty(o, "") : o === "float" ? e.cssFloat = "" : e[o] = "");
      for (var f in n)
        o = n[f], n.hasOwnProperty(f) && i[f] !== o && mm(e, f, o);
    } else
      for (var d in n)
        n.hasOwnProperty(d) && mm(e, d, n[d]);
  }
  function pc(e) {
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
  var sw = /* @__PURE__ */ new Map([
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
  ]), uw = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Jo(e) {
    return uw.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Ba() {
  }
  var gc = null;
  function yc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Tr = null, Mr = null;
  function gm(e) {
    var n = st(e);
    if (n && (e = n.stateNode)) {
      var i = e[we] || null;
      e: switch (e = n.stateNode, n.type) {
        case "input":
          if (Ii(
            e,
            i.value,
            i.defaultValue,
            i.defaultValue,
            i.checked,
            i.defaultChecked,
            i.type,
            i.name
          ), n = i.name, i.type === "radio" && n != null) {
            for (i = e; i.parentNode; ) i = i.parentNode;
            for (i = i.querySelectorAll(
              'input[name="' + an(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < i.length; n++) {
              var o = i[n];
              if (o !== e && o.form === e.form) {
                var f = o[we] || null;
                if (!f) throw Error(l(90));
                Ii(
                  o,
                  f.value,
                  f.defaultValue,
                  f.defaultValue,
                  f.checked,
                  f.defaultChecked,
                  f.type,
                  f.name
                );
              }
            }
            for (n = 0; n < i.length; n++)
              o = i[n], o.form === e.form && Ha(o);
          }
          break e;
        case "textarea":
          Rl(e, i.value, i.defaultValue);
          break e;
        case "select":
          n = i.value, n != null && mi(e, !!i.multiple, n, !1);
      }
    }
  }
  var vc = !1;
  function ym(e, n, i) {
    if (vc) return e(n, i);
    vc = !0;
    try {
      var o = e(n);
      return o;
    } finally {
      if (vc = !1, (Tr !== null || Mr !== null) && (ks(), Tr && (n = Tr, e = Mr, Mr = Tr = null, gm(n), e)))
        for (n = 0; n < e.length; n++) gm(e[n]);
    }
  }
  function Cl(e, n) {
    var i = e.stateNode;
    if (i === null) return null;
    var o = i[we] || null;
    if (o === null) return null;
    i = o[n];
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
        (o = !o.disabled) || (e = e.type, o = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !o;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (i && typeof i != "function")
      throw Error(
        l(231, n, typeof i)
      );
    return i;
  }
  var Ua = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), bc = !1;
  if (Ua)
    try {
      var Tl = {};
      Object.defineProperty(Tl, "passive", {
        get: function() {
          bc = !0;
        }
      }), window.addEventListener("test", Tl, Tl), window.removeEventListener("test", Tl, Tl);
    } catch {
      bc = !1;
    }
  var pi = null, xc = null, Wo = null;
  function vm() {
    if (Wo) return Wo;
    var e, n = xc, i = n.length, o, f = "value" in pi ? pi.value : pi.textContent, d = f.length;
    for (e = 0; e < i && n[e] === f[e]; e++) ;
    var x = i - e;
    for (o = 1; o <= x && n[i - o] === f[d - o]; o++) ;
    return Wo = f.slice(e, 1 < o ? 1 - o : void 0);
  }
  function es(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function ts() {
    return !0;
  }
  function bm() {
    return !1;
  }
  function wn(e) {
    function n(i, o, f, d, x) {
      this._reactName = i, this._targetInst = f, this.type = o, this.nativeEvent = d, this.target = x, this.currentTarget = null;
      for (var M in e)
        e.hasOwnProperty(M) && (i = e[M], this[M] = i ? i(d) : d[M]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? ts : bm, this.isPropagationStopped = bm, this;
    }
    return p(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = ts);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = ts);
      },
      persist: function() {
      },
      isPersistent: ts
    }), n;
  }
  var Zi = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, ns = wn(Zi), Ml = p({}, Zi, { view: 0, detail: 0 }), cw = wn(Ml), wc, Sc, Dl, as = p({}, Ml, {
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
    getModifierState: _c,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Dl && (Dl && e.type === "mousemove" ? (wc = e.screenX - Dl.screenX, Sc = e.screenY - Dl.screenY) : Sc = wc = 0, Dl = e), wc);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Sc;
    }
  }), xm = wn(as), fw = p({}, as, { dataTransfer: 0 }), dw = wn(fw), hw = p({}, Ml, { relatedTarget: 0 }), Ec = wn(hw), mw = p({}, Zi, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), pw = wn(mw), gw = p({}, Zi, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), yw = wn(gw), vw = p({}, Zi, { data: 0 }), wm = wn(vw), bw = {
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
  }, xw = {
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
  }, ww = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Sw(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = ww[e]) ? !!n[e] : !1;
  }
  function _c() {
    return Sw;
  }
  var Ew = p({}, Ml, {
    key: function(e) {
      if (e.key) {
        var n = bw[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = es(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? xw[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: _c,
    charCode: function(e) {
      return e.type === "keypress" ? es(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? es(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), _w = wn(Ew), Nw = p({}, as, {
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
  }), Sm = wn(Nw), Rw = p({}, Ml, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: _c
  }), Cw = wn(Rw), Tw = p({}, Zi, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Mw = wn(Tw), Dw = p({}, as, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Aw = wn(Dw), zw = p({}, Zi, {
    newState: 0,
    oldState: 0
  }), Ow = wn(zw), Lw = [9, 13, 27, 32], Nc = Ua && "CompositionEvent" in window, Al = null;
  Ua && "documentMode" in document && (Al = document.documentMode);
  var jw = Ua && "TextEvent" in window && !Al, Em = Ua && (!Nc || Al && 8 < Al && 11 >= Al), _m = " ", Nm = !1;
  function Rm(e, n) {
    switch (e) {
      case "keyup":
        return Lw.indexOf(n.keyCode) !== -1;
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
  function Cm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Dr = !1;
  function Hw(e, n) {
    switch (e) {
      case "compositionend":
        return Cm(n);
      case "keypress":
        return n.which !== 32 ? null : (Nm = !0, _m);
      case "textInput":
        return e = n.data, e === _m && Nm ? null : e;
      default:
        return null;
    }
  }
  function Bw(e, n) {
    if (Dr)
      return e === "compositionend" || !Nc && Rm(e, n) ? (e = vm(), Wo = xc = pi = null, Dr = !1, e) : null;
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
        return Em && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var Uw = {
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
  function Tm(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!Uw[e.type] : n === "textarea";
  }
  function Mm(e, n, i, o) {
    Tr ? Mr ? Mr.push(o) : Mr = [o] : Tr = o, n = Is(n, "onChange"), 0 < n.length && (i = new ns(
      "onChange",
      "change",
      null,
      i,
      o
    ), e.push({ event: i, listeners: n }));
  }
  var zl = null, Ol = null;
  function kw(e) {
    f0(e, 0);
  }
  function is(e) {
    var n = We(e);
    if (Ha(n)) return e;
  }
  function Dm(e, n) {
    if (e === "change") return n;
  }
  var Am = !1;
  if (Ua) {
    var Rc;
    if (Ua) {
      var Cc = "oninput" in document;
      if (!Cc) {
        var zm = document.createElement("div");
        zm.setAttribute("oninput", "return;"), Cc = typeof zm.oninput == "function";
      }
      Rc = Cc;
    } else Rc = !1;
    Am = Rc && (!document.documentMode || 9 < document.documentMode);
  }
  function Om() {
    zl && (zl.detachEvent("onpropertychange", Lm), Ol = zl = null);
  }
  function Lm(e) {
    if (e.propertyName === "value" && is(Ol)) {
      var n = [];
      Mm(
        n,
        Ol,
        e,
        yc(e)
      ), ym(kw, n);
    }
  }
  function Vw(e, n, i) {
    e === "focusin" ? (Om(), zl = n, Ol = i, zl.attachEvent("onpropertychange", Lm)) : e === "focusout" && Om();
  }
  function qw(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return is(Ol);
  }
  function Yw(e, n) {
    if (e === "click") return is(n);
  }
  function $w(e, n) {
    if (e === "input" || e === "change")
      return is(n);
  }
  function Xw(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var zn = typeof Object.is == "function" ? Object.is : Xw;
  function Ll(e, n) {
    if (zn(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var i = Object.keys(e), o = Object.keys(n);
    if (i.length !== o.length) return !1;
    for (o = 0; o < i.length; o++) {
      var f = i[o];
      if (!Be.call(n, f) || !zn(e[f], n[f]))
        return !1;
    }
    return !0;
  }
  function jm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Hm(e, n) {
    var i = jm(e);
    e = 0;
    for (var o; i; ) {
      if (i.nodeType === 3) {
        if (o = e + i.textContent.length, e <= n && o >= n)
          return { node: i, offset: n - e };
        e = o;
      }
      e: {
        for (; i; ) {
          if (i.nextSibling) {
            i = i.nextSibling;
            break e;
          }
          i = i.parentNode;
        }
        i = void 0;
      }
      i = jm(i);
    }
  }
  function Bm(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Bm(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Um(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var n = dt(e.document); n instanceof e.HTMLIFrameElement; ) {
      try {
        var i = typeof n.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) e = n.contentWindow;
      else break;
      n = dt(e.document);
    }
    return n;
  }
  function Tc(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var Gw = Ua && "documentMode" in document && 11 >= document.documentMode, Ar = null, Mc = null, jl = null, Dc = !1;
  function km(e, n, i) {
    var o = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Dc || Ar == null || Ar !== dt(o) || (o = Ar, "selectionStart" in o && Tc(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
      anchorNode: o.anchorNode,
      anchorOffset: o.anchorOffset,
      focusNode: o.focusNode,
      focusOffset: o.focusOffset
    }), jl && Ll(jl, o) || (jl = o, o = Is(Mc, "onSelect"), 0 < o.length && (n = new ns(
      "onSelect",
      "select",
      null,
      n,
      i
    ), e.push({ event: n, listeners: o }), n.target = Ar)));
  }
  function Qi(e, n) {
    var i = {};
    return i[e.toLowerCase()] = n.toLowerCase(), i["Webkit" + e] = "webkit" + n, i["Moz" + e] = "moz" + n, i;
  }
  var zr = {
    animationend: Qi("Animation", "AnimationEnd"),
    animationiteration: Qi("Animation", "AnimationIteration"),
    animationstart: Qi("Animation", "AnimationStart"),
    transitionrun: Qi("Transition", "TransitionRun"),
    transitionstart: Qi("Transition", "TransitionStart"),
    transitioncancel: Qi("Transition", "TransitionCancel"),
    transitionend: Qi("Transition", "TransitionEnd")
  }, Ac = {}, Vm = {};
  Ua && (Vm = document.createElement("div").style, "AnimationEvent" in window || (delete zr.animationend.animation, delete zr.animationiteration.animation, delete zr.animationstart.animation), "TransitionEvent" in window || delete zr.transitionend.transition);
  function Fi(e) {
    if (Ac[e]) return Ac[e];
    if (!zr[e]) return e;
    var n = zr[e], i;
    for (i in n)
      if (n.hasOwnProperty(i) && i in Vm)
        return Ac[e] = n[i];
    return e;
  }
  var qm = Fi("animationend"), Ym = Fi("animationiteration"), $m = Fi("animationstart"), Iw = Fi("transitionrun"), Zw = Fi("transitionstart"), Qw = Fi("transitioncancel"), Xm = Fi("transitionend"), Gm = /* @__PURE__ */ new Map(), zc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  zc.push("scrollEnd");
  function ua(e, n) {
    Gm.set(e, n), cn(n, [e]);
  }
  var rs = typeof reportError == "function" ? reportError : function(e) {
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
  }, Gn = [], Or = 0, Oc = 0;
  function ls() {
    for (var e = Or, n = Oc = Or = 0; n < e; ) {
      var i = Gn[n];
      Gn[n++] = null;
      var o = Gn[n];
      Gn[n++] = null;
      var f = Gn[n];
      Gn[n++] = null;
      var d = Gn[n];
      if (Gn[n++] = null, o !== null && f !== null) {
        var x = o.pending;
        x === null ? f.next = f : (f.next = x.next, x.next = f), o.pending = f;
      }
      d !== 0 && Im(i, f, d);
    }
  }
  function os(e, n, i, o) {
    Gn[Or++] = e, Gn[Or++] = n, Gn[Or++] = i, Gn[Or++] = o, Oc |= o, e.lanes |= o, e = e.alternate, e !== null && (e.lanes |= o);
  }
  function Lc(e, n, i, o) {
    return os(e, n, i, o), ss(e);
  }
  function Ki(e, n) {
    return os(e, null, null, n), ss(e);
  }
  function Im(e, n, i) {
    e.lanes |= i;
    var o = e.alternate;
    o !== null && (o.lanes |= i);
    for (var f = !1, d = e.return; d !== null; )
      d.childLanes |= i, o = d.alternate, o !== null && (o.childLanes |= i), d.tag === 22 && (e = d.stateNode, e === null || e._visibility & 1 || (f = !0)), e = d, d = d.return;
    return e.tag === 3 ? (d = e.stateNode, f && n !== null && (f = 31 - kt(i), e = d.hiddenUpdates, o = e[f], o === null ? e[f] = [n] : o.push(n), n.lane = i | 536870912), d) : null;
  }
  function ss(e) {
    if (50 < ao)
      throw ao = 0, Xf = null, Error(l(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Lr = {};
  function Fw(e, n, i, o) {
    this.tag = e, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function On(e, n, i, o) {
    return new Fw(e, n, i, o);
  }
  function jc(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function ka(e, n) {
    var i = e.alternate;
    return i === null ? (i = On(
      e.tag,
      n,
      e.key,
      e.mode
    ), i.elementType = e.elementType, i.type = e.type, i.stateNode = e.stateNode, i.alternate = e, e.alternate = i) : (i.pendingProps = n, i.type = e.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = e.flags & 65011712, i.childLanes = e.childLanes, i.lanes = e.lanes, i.child = e.child, i.memoizedProps = e.memoizedProps, i.memoizedState = e.memoizedState, i.updateQueue = e.updateQueue, n = e.dependencies, i.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, i.sibling = e.sibling, i.index = e.index, i.ref = e.ref, i.refCleanup = e.refCleanup, i;
  }
  function Zm(e, n) {
    e.flags &= 65011714;
    var i = e.alternate;
    return i === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = i.childLanes, e.lanes = i.lanes, e.child = i.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = i.memoizedProps, e.memoizedState = i.memoizedState, e.updateQueue = i.updateQueue, e.type = i.type, n = i.dependencies, e.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), e;
  }
  function us(e, n, i, o, f, d) {
    var x = 0;
    if (o = e, typeof e == "function") jc(e) && (x = 1);
    else if (typeof e == "string")
      x = eE(
        e,
        i,
        ee.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case G:
          return e = On(31, i, n, f), e.elementType = G, e.lanes = d, e;
        case R:
          return Pi(i.children, f, d, n);
        case T:
          x = 8, f |= 24;
          break;
        case _:
          return e = On(12, i, n, f | 2), e.elementType = _, e.lanes = d, e;
        case B:
          return e = On(13, i, n, f), e.elementType = B, e.lanes = d, e;
        case H:
          return e = On(19, i, n, f), e.elementType = H, e.lanes = d, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case E:
                x = 10;
                break e;
              case O:
                x = 9;
                break e;
              case L:
                x = 11;
                break e;
              case V:
                x = 14;
                break e;
              case D:
                x = 16, o = null;
                break e;
            }
          x = 29, i = Error(
            l(130, e === null ? "null" : typeof e, "")
          ), o = null;
      }
    return n = On(x, i, n, f), n.elementType = e, n.type = o, n.lanes = d, n;
  }
  function Pi(e, n, i, o) {
    return e = On(7, e, o, n), e.lanes = i, e;
  }
  function Hc(e, n, i) {
    return e = On(6, e, null, n), e.lanes = i, e;
  }
  function Qm(e) {
    var n = On(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function Bc(e, n, i) {
    return n = On(
      4,
      e.children !== null ? e.children : [],
      e.key,
      n
    ), n.lanes = i, n.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, n;
  }
  var Fm = /* @__PURE__ */ new WeakMap();
  function In(e, n) {
    if (typeof e == "object" && e !== null) {
      var i = Fm.get(e);
      return i !== void 0 ? i : (n = {
        value: e,
        source: n,
        stack: Ie(n)
      }, Fm.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: Ie(n)
    };
  }
  var jr = [], Hr = 0, cs = null, Hl = 0, Zn = [], Qn = 0, gi = null, Ea = 1, _a = "";
  function Va(e, n) {
    jr[Hr++] = Hl, jr[Hr++] = cs, cs = e, Hl = n;
  }
  function Km(e, n, i) {
    Zn[Qn++] = Ea, Zn[Qn++] = _a, Zn[Qn++] = gi, gi = e;
    var o = Ea;
    e = _a;
    var f = 32 - kt(o) - 1;
    o &= ~(1 << f), i += 1;
    var d = 32 - kt(n) + f;
    if (30 < d) {
      var x = f - f % 5;
      d = (o & (1 << x) - 1).toString(32), o >>= x, f -= x, Ea = 1 << 32 - kt(n) + f | i << f | o, _a = d + e;
    } else
      Ea = 1 << d | i << f | o, _a = e;
  }
  function Uc(e) {
    e.return !== null && (Va(e, 1), Km(e, 1, 0));
  }
  function kc(e) {
    for (; e === cs; )
      cs = jr[--Hr], jr[Hr] = null, Hl = jr[--Hr], jr[Hr] = null;
    for (; e === gi; )
      gi = Zn[--Qn], Zn[Qn] = null, _a = Zn[--Qn], Zn[Qn] = null, Ea = Zn[--Qn], Zn[Qn] = null;
  }
  function Pm(e, n) {
    Zn[Qn++] = Ea, Zn[Qn++] = _a, Zn[Qn++] = gi, Ea = n.id, _a = n.overflow, gi = e;
  }
  var rn = null, Tt = null, it = !1, yi = null, Fn = !1, Vc = Error(l(519));
  function vi(e) {
    var n = Error(
      l(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Bl(In(n, e)), Vc;
  }
  function Jm(e) {
    var n = e.stateNode, i = e.type, o = e.memoizedProps;
    switch (n[ve] = e, n[we] = o, i) {
      case "dialog":
        Pe("cancel", n), Pe("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        Pe("load", n);
        break;
      case "video":
      case "audio":
        for (i = 0; i < ro.length; i++)
          Pe(ro[i], n);
        break;
      case "source":
        Pe("error", n);
        break;
      case "img":
      case "image":
      case "link":
        Pe("error", n), Pe("load", n);
        break;
      case "details":
        Pe("toggle", n);
        break;
      case "input":
        Pe("invalid", n), Rr(
          n,
          o.value,
          o.defaultValue,
          o.checked,
          o.defaultChecked,
          o.type,
          o.name,
          !0
        );
        break;
      case "select":
        Pe("invalid", n);
        break;
      case "textarea":
        Pe("invalid", n), hm(n, o.value, o.defaultValue, o.children);
    }
    i = o.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || n.textContent === "" + i || o.suppressHydrationWarning === !0 || p0(n.textContent, i) ? (o.popover != null && (Pe("beforetoggle", n), Pe("toggle", n)), o.onScroll != null && Pe("scroll", n), o.onScrollEnd != null && Pe("scrollend", n), o.onClick != null && (n.onclick = Ba), n = !0) : n = !1, n || vi(e, !0);
  }
  function Wm(e) {
    for (rn = e.return; rn; )
      switch (rn.tag) {
        case 5:
        case 31:
        case 13:
          Fn = !1;
          return;
        case 27:
        case 3:
          Fn = !0;
          return;
        default:
          rn = rn.return;
      }
  }
  function Br(e) {
    if (e !== rn) return !1;
    if (!it) return Wm(e), it = !0, !1;
    var n = e.tag, i;
    if ((i = n !== 3 && n !== 27) && ((i = n === 5) && (i = e.type, i = !(i !== "form" && i !== "button") || rd(e.type, e.memoizedProps)), i = !i), i && Tt && vi(e), Wm(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      Tt = _0(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      Tt = _0(e);
    } else
      n === 27 ? (n = Tt, zi(e.type) ? (e = cd, cd = null, Tt = e) : Tt = n) : Tt = rn ? Pn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ji() {
    Tt = rn = null, it = !1;
  }
  function qc() {
    var e = yi;
    return e !== null && (Nn === null ? Nn = e : Nn.push.apply(
      Nn,
      e
    ), yi = null), e;
  }
  function Bl(e) {
    yi === null ? yi = [e] : yi.push(e);
  }
  var Yc = A(null), Wi = null, qa = null;
  function bi(e, n, i) {
    F(Yc, n._currentValue), n._currentValue = i;
  }
  function Ya(e) {
    e._currentValue = Yc.current, k(Yc);
  }
  function $c(e, n, i) {
    for (; e !== null; ) {
      var o = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, o !== null && (o.childLanes |= n)) : o !== null && (o.childLanes & n) !== n && (o.childLanes |= n), e === i) break;
      e = e.return;
    }
  }
  function Xc(e, n, i, o) {
    var f = e.child;
    for (f !== null && (f.return = e); f !== null; ) {
      var d = f.dependencies;
      if (d !== null) {
        var x = f.child;
        d = d.firstContext;
        e: for (; d !== null; ) {
          var M = d;
          d = f;
          for (var q = 0; q < n.length; q++)
            if (M.context === n[q]) {
              d.lanes |= i, M = d.alternate, M !== null && (M.lanes |= i), $c(
                d.return,
                i,
                e
              ), o || (x = null);
              break e;
            }
          d = M.next;
        }
      } else if (f.tag === 18) {
        if (x = f.return, x === null) throw Error(l(341));
        x.lanes |= i, d = x.alternate, d !== null && (d.lanes |= i), $c(x, i, e), x = null;
      } else x = f.child;
      if (x !== null) x.return = f;
      else
        for (x = f; x !== null; ) {
          if (x === e) {
            x = null;
            break;
          }
          if (f = x.sibling, f !== null) {
            f.return = x.return, x = f;
            break;
          }
          x = x.return;
        }
      f = x;
    }
  }
  function Ur(e, n, i, o) {
    e = null;
    for (var f = n, d = !1; f !== null; ) {
      if (!d) {
        if ((f.flags & 524288) !== 0) d = !0;
        else if ((f.flags & 262144) !== 0) break;
      }
      if (f.tag === 10) {
        var x = f.alternate;
        if (x === null) throw Error(l(387));
        if (x = x.memoizedProps, x !== null) {
          var M = f.type;
          zn(f.pendingProps.value, x.value) || (e !== null ? e.push(M) : e = [M]);
        }
      } else if (f === me.current) {
        if (x = f.alternate, x === null) throw Error(l(387));
        x.memoizedState.memoizedState !== f.memoizedState.memoizedState && (e !== null ? e.push(co) : e = [co]);
      }
      f = f.return;
    }
    e !== null && Xc(
      n,
      e,
      i,
      o
    ), n.flags |= 262144;
  }
  function fs(e) {
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
  function er(e) {
    Wi = e, qa = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function ln(e) {
    return ep(Wi, e);
  }
  function ds(e, n) {
    return Wi === null && er(e), ep(e, n);
  }
  function ep(e, n) {
    var i = n._currentValue;
    if (n = { context: n, memoizedValue: i, next: null }, qa === null) {
      if (e === null) throw Error(l(308));
      qa = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else qa = qa.next = n;
    return i;
  }
  var Kw = typeof AbortController < "u" ? AbortController : function() {
    var e = [], n = this.signal = {
      aborted: !1,
      addEventListener: function(i, o) {
        e.push(o);
      }
    };
    this.abort = function() {
      n.aborted = !0, e.forEach(function(i) {
        return i();
      });
    };
  }, Pw = t.unstable_scheduleCallback, Jw = t.unstable_NormalPriority, Gt = {
    $$typeof: E,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Gc() {
    return {
      controller: new Kw(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ul(e) {
    e.refCount--, e.refCount === 0 && Pw(Jw, function() {
      e.controller.abort();
    });
  }
  var kl = null, Ic = 0, kr = 0, Vr = null;
  function Ww(e, n) {
    if (kl === null) {
      var i = kl = [];
      Ic = 0, kr = Kf(), Vr = {
        status: "pending",
        value: void 0,
        then: function(o) {
          i.push(o);
        }
      };
    }
    return Ic++, n.then(tp, tp), n;
  }
  function tp() {
    if (--Ic === 0 && kl !== null) {
      Vr !== null && (Vr.status = "fulfilled");
      var e = kl;
      kl = null, kr = 0, Vr = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function eS(e, n) {
    var i = [], o = {
      status: "pending",
      value: null,
      reason: null,
      then: function(f) {
        i.push(f);
      }
    };
    return e.then(
      function() {
        o.status = "fulfilled", o.value = n;
        for (var f = 0; f < i.length; f++) (0, i[f])(n);
      },
      function(f) {
        for (o.status = "rejected", o.reason = f, f = 0; f < i.length; f++)
          (0, i[f])(void 0);
      }
    ), o;
  }
  var np = C.S;
  C.S = function(e, n) {
    kg = Fe(), typeof n == "object" && n !== null && typeof n.then == "function" && Ww(e, n), np !== null && np(e, n);
  };
  var tr = A(null);
  function Zc() {
    var e = tr.current;
    return e !== null ? e : Ct.pooledCache;
  }
  function hs(e, n) {
    n === null ? F(tr, tr.current) : F(tr, n.pool);
  }
  function ap() {
    var e = Zc();
    return e === null ? null : { parent: Gt._currentValue, pool: e };
  }
  var qr = Error(l(460)), Qc = Error(l(474)), ms = Error(l(542)), ps = { then: function() {
  } };
  function ip(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function rp(e, n, i) {
    switch (i = e[i], i === void 0 ? e.push(n) : i !== n && (n.then(Ba, Ba), n = i), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, op(e), e;
      default:
        if (typeof n.status == "string") n.then(Ba, Ba);
        else {
          if (e = Ct, e !== null && 100 < e.shellSuspendCounter)
            throw Error(l(482));
          e = n, e.status = "pending", e.then(
            function(o) {
              if (n.status === "pending") {
                var f = n;
                f.status = "fulfilled", f.value = o;
              }
            },
            function(o) {
              if (n.status === "pending") {
                var f = n;
                f.status = "rejected", f.reason = o;
              }
            }
          );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw e = n.reason, op(e), e;
        }
        throw ar = n, qr;
    }
  }
  function nr(e) {
    try {
      var n = e._init;
      return n(e._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (ar = i, qr) : i;
    }
  }
  var ar = null;
  function lp() {
    if (ar === null) throw Error(l(459));
    var e = ar;
    return ar = null, e;
  }
  function op(e) {
    if (e === qr || e === ms)
      throw Error(l(483));
  }
  var Yr = null, Vl = 0;
  function gs(e) {
    var n = Vl;
    return Vl += 1, Yr === null && (Yr = []), rp(Yr, e, n);
  }
  function ql(e, n) {
    n = n.props.ref, e.ref = n !== void 0 ? n : null;
  }
  function ys(e, n) {
    throw n.$$typeof === v ? Error(l(525)) : (e = Object.prototype.toString.call(n), Error(
      l(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e
      )
    ));
  }
  function sp(e) {
    function n(P, Z) {
      if (e) {
        var ne = P.deletions;
        ne === null ? (P.deletions = [Z], P.flags |= 16) : ne.push(Z);
      }
    }
    function i(P, Z) {
      if (!e) return null;
      for (; Z !== null; )
        n(P, Z), Z = Z.sibling;
      return null;
    }
    function o(P) {
      for (var Z = /* @__PURE__ */ new Map(); P !== null; )
        P.key !== null ? Z.set(P.key, P) : Z.set(P.index, P), P = P.sibling;
      return Z;
    }
    function f(P, Z) {
      return P = ka(P, Z), P.index = 0, P.sibling = null, P;
    }
    function d(P, Z, ne) {
      return P.index = ne, e ? (ne = P.alternate, ne !== null ? (ne = ne.index, ne < Z ? (P.flags |= 67108866, Z) : ne) : (P.flags |= 67108866, Z)) : (P.flags |= 1048576, Z);
    }
    function x(P) {
      return e && P.alternate === null && (P.flags |= 67108866), P;
    }
    function M(P, Z, ne, ce) {
      return Z === null || Z.tag !== 6 ? (Z = Hc(ne, P.mode, ce), Z.return = P, Z) : (Z = f(Z, ne), Z.return = P, Z);
    }
    function q(P, Z, ne, ce) {
      var Oe = ne.type;
      return Oe === R ? ue(
        P,
        Z,
        ne.props.children,
        ce,
        ne.key
      ) : Z !== null && (Z.elementType === Oe || typeof Oe == "object" && Oe !== null && Oe.$$typeof === D && nr(Oe) === Z.type) ? (Z = f(Z, ne.props), ql(Z, ne), Z.return = P, Z) : (Z = us(
        ne.type,
        ne.key,
        ne.props,
        null,
        P.mode,
        ce
      ), ql(Z, ne), Z.return = P, Z);
    }
    function ae(P, Z, ne, ce) {
      return Z === null || Z.tag !== 4 || Z.stateNode.containerInfo !== ne.containerInfo || Z.stateNode.implementation !== ne.implementation ? (Z = Bc(ne, P.mode, ce), Z.return = P, Z) : (Z = f(Z, ne.children || []), Z.return = P, Z);
    }
    function ue(P, Z, ne, ce, Oe) {
      return Z === null || Z.tag !== 7 ? (Z = Pi(
        ne,
        P.mode,
        ce,
        Oe
      ), Z.return = P, Z) : (Z = f(Z, ne), Z.return = P, Z);
    }
    function fe(P, Z, ne) {
      if (typeof Z == "string" && Z !== "" || typeof Z == "number" || typeof Z == "bigint")
        return Z = Hc(
          "" + Z,
          P.mode,
          ne
        ), Z.return = P, Z;
      if (typeof Z == "object" && Z !== null) {
        switch (Z.$$typeof) {
          case b:
            return ne = us(
              Z.type,
              Z.key,
              Z.props,
              null,
              P.mode,
              ne
            ), ql(ne, Z), ne.return = P, ne;
          case w:
            return Z = Bc(
              Z,
              P.mode,
              ne
            ), Z.return = P, Z;
          case D:
            return Z = nr(Z), fe(P, Z, ne);
        }
        if (I(Z) || K(Z))
          return Z = Pi(
            Z,
            P.mode,
            ne,
            null
          ), Z.return = P, Z;
        if (typeof Z.then == "function")
          return fe(P, gs(Z), ne);
        if (Z.$$typeof === E)
          return fe(
            P,
            ds(P, Z),
            ne
          );
        ys(P, Z);
      }
      return null;
    }
    function ie(P, Z, ne, ce) {
      var Oe = Z !== null ? Z.key : null;
      if (typeof ne == "string" && ne !== "" || typeof ne == "number" || typeof ne == "bigint")
        return Oe !== null ? null : M(P, Z, "" + ne, ce);
      if (typeof ne == "object" && ne !== null) {
        switch (ne.$$typeof) {
          case b:
            return ne.key === Oe ? q(P, Z, ne, ce) : null;
          case w:
            return ne.key === Oe ? ae(P, Z, ne, ce) : null;
          case D:
            return ne = nr(ne), ie(P, Z, ne, ce);
        }
        if (I(ne) || K(ne))
          return Oe !== null ? null : ue(P, Z, ne, ce, null);
        if (typeof ne.then == "function")
          return ie(
            P,
            Z,
            gs(ne),
            ce
          );
        if (ne.$$typeof === E)
          return ie(
            P,
            Z,
            ds(P, ne),
            ce
          );
        ys(P, ne);
      }
      return null;
    }
    function oe(P, Z, ne, ce, Oe) {
      if (typeof ce == "string" && ce !== "" || typeof ce == "number" || typeof ce == "bigint")
        return P = P.get(ne) || null, M(Z, P, "" + ce, Oe);
      if (typeof ce == "object" && ce !== null) {
        switch (ce.$$typeof) {
          case b:
            return P = P.get(
              ce.key === null ? ne : ce.key
            ) || null, q(Z, P, ce, Oe);
          case w:
            return P = P.get(
              ce.key === null ? ne : ce.key
            ) || null, ae(Z, P, ce, Oe);
          case D:
            return ce = nr(ce), oe(
              P,
              Z,
              ne,
              ce,
              Oe
            );
        }
        if (I(ce) || K(ce))
          return P = P.get(ne) || null, ue(Z, P, ce, Oe, null);
        if (typeof ce.then == "function")
          return oe(
            P,
            Z,
            ne,
            gs(ce),
            Oe
          );
        if (ce.$$typeof === E)
          return oe(
            P,
            Z,
            ne,
            ds(Z, ce),
            Oe
          );
        ys(Z, ce);
      }
      return null;
    }
    function _e(P, Z, ne, ce) {
      for (var Oe = null, ut = null, Ne = Z, Xe = Z = 0, tt = null; Ne !== null && Xe < ne.length; Xe++) {
        Ne.index > Xe ? (tt = Ne, Ne = null) : tt = Ne.sibling;
        var ct = ie(
          P,
          Ne,
          ne[Xe],
          ce
        );
        if (ct === null) {
          Ne === null && (Ne = tt);
          break;
        }
        e && Ne && ct.alternate === null && n(P, Ne), Z = d(ct, Z, Xe), ut === null ? Oe = ct : ut.sibling = ct, ut = ct, Ne = tt;
      }
      if (Xe === ne.length)
        return i(P, Ne), it && Va(P, Xe), Oe;
      if (Ne === null) {
        for (; Xe < ne.length; Xe++)
          Ne = fe(P, ne[Xe], ce), Ne !== null && (Z = d(
            Ne,
            Z,
            Xe
          ), ut === null ? Oe = Ne : ut.sibling = Ne, ut = Ne);
        return it && Va(P, Xe), Oe;
      }
      for (Ne = o(Ne); Xe < ne.length; Xe++)
        tt = oe(
          Ne,
          P,
          Xe,
          ne[Xe],
          ce
        ), tt !== null && (e && tt.alternate !== null && Ne.delete(
          tt.key === null ? Xe : tt.key
        ), Z = d(
          tt,
          Z,
          Xe
        ), ut === null ? Oe = tt : ut.sibling = tt, ut = tt);
      return e && Ne.forEach(function(Bi) {
        return n(P, Bi);
      }), it && Va(P, Xe), Oe;
    }
    function je(P, Z, ne, ce) {
      if (ne == null) throw Error(l(151));
      for (var Oe = null, ut = null, Ne = Z, Xe = Z = 0, tt = null, ct = ne.next(); Ne !== null && !ct.done; Xe++, ct = ne.next()) {
        Ne.index > Xe ? (tt = Ne, Ne = null) : tt = Ne.sibling;
        var Bi = ie(P, Ne, ct.value, ce);
        if (Bi === null) {
          Ne === null && (Ne = tt);
          break;
        }
        e && Ne && Bi.alternate === null && n(P, Ne), Z = d(Bi, Z, Xe), ut === null ? Oe = Bi : ut.sibling = Bi, ut = Bi, Ne = tt;
      }
      if (ct.done)
        return i(P, Ne), it && Va(P, Xe), Oe;
      if (Ne === null) {
        for (; !ct.done; Xe++, ct = ne.next())
          ct = fe(P, ct.value, ce), ct !== null && (Z = d(ct, Z, Xe), ut === null ? Oe = ct : ut.sibling = ct, ut = ct);
        return it && Va(P, Xe), Oe;
      }
      for (Ne = o(Ne); !ct.done; Xe++, ct = ne.next())
        ct = oe(Ne, P, Xe, ct.value, ce), ct !== null && (e && ct.alternate !== null && Ne.delete(ct.key === null ? Xe : ct.key), Z = d(ct, Z, Xe), ut === null ? Oe = ct : ut.sibling = ct, ut = ct);
      return e && Ne.forEach(function(fE) {
        return n(P, fE);
      }), it && Va(P, Xe), Oe;
    }
    function Nt(P, Z, ne, ce) {
      if (typeof ne == "object" && ne !== null && ne.type === R && ne.key === null && (ne = ne.props.children), typeof ne == "object" && ne !== null) {
        switch (ne.$$typeof) {
          case b:
            e: {
              for (var Oe = ne.key; Z !== null; ) {
                if (Z.key === Oe) {
                  if (Oe = ne.type, Oe === R) {
                    if (Z.tag === 7) {
                      i(
                        P,
                        Z.sibling
                      ), ce = f(
                        Z,
                        ne.props.children
                      ), ce.return = P, P = ce;
                      break e;
                    }
                  } else if (Z.elementType === Oe || typeof Oe == "object" && Oe !== null && Oe.$$typeof === D && nr(Oe) === Z.type) {
                    i(
                      P,
                      Z.sibling
                    ), ce = f(Z, ne.props), ql(ce, ne), ce.return = P, P = ce;
                    break e;
                  }
                  i(P, Z);
                  break;
                } else n(P, Z);
                Z = Z.sibling;
              }
              ne.type === R ? (ce = Pi(
                ne.props.children,
                P.mode,
                ce,
                ne.key
              ), ce.return = P, P = ce) : (ce = us(
                ne.type,
                ne.key,
                ne.props,
                null,
                P.mode,
                ce
              ), ql(ce, ne), ce.return = P, P = ce);
            }
            return x(P);
          case w:
            e: {
              for (Oe = ne.key; Z !== null; ) {
                if (Z.key === Oe)
                  if (Z.tag === 4 && Z.stateNode.containerInfo === ne.containerInfo && Z.stateNode.implementation === ne.implementation) {
                    i(
                      P,
                      Z.sibling
                    ), ce = f(Z, ne.children || []), ce.return = P, P = ce;
                    break e;
                  } else {
                    i(P, Z);
                    break;
                  }
                else n(P, Z);
                Z = Z.sibling;
              }
              ce = Bc(ne, P.mode, ce), ce.return = P, P = ce;
            }
            return x(P);
          case D:
            return ne = nr(ne), Nt(
              P,
              Z,
              ne,
              ce
            );
        }
        if (I(ne))
          return _e(
            P,
            Z,
            ne,
            ce
          );
        if (K(ne)) {
          if (Oe = K(ne), typeof Oe != "function") throw Error(l(150));
          return ne = Oe.call(ne), je(
            P,
            Z,
            ne,
            ce
          );
        }
        if (typeof ne.then == "function")
          return Nt(
            P,
            Z,
            gs(ne),
            ce
          );
        if (ne.$$typeof === E)
          return Nt(
            P,
            Z,
            ds(P, ne),
            ce
          );
        ys(P, ne);
      }
      return typeof ne == "string" && ne !== "" || typeof ne == "number" || typeof ne == "bigint" ? (ne = "" + ne, Z !== null && Z.tag === 6 ? (i(P, Z.sibling), ce = f(Z, ne), ce.return = P, P = ce) : (i(P, Z), ce = Hc(ne, P.mode, ce), ce.return = P, P = ce), x(P)) : i(P, Z);
    }
    return function(P, Z, ne, ce) {
      try {
        Vl = 0;
        var Oe = Nt(
          P,
          Z,
          ne,
          ce
        );
        return Yr = null, Oe;
      } catch (Ne) {
        if (Ne === qr || Ne === ms) throw Ne;
        var ut = On(29, Ne, null, P.mode);
        return ut.lanes = ce, ut.return = P, ut;
      } finally {
      }
    };
  }
  var ir = sp(!0), up = sp(!1), xi = !1;
  function Fc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Kc(e, n) {
    e = e.updateQueue, n.updateQueue === e && (n.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function wi(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Si(e, n, i) {
    var o = e.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (ht & 2) !== 0) {
      var f = o.pending;
      return f === null ? n.next = n : (n.next = f.next, f.next = n), o.pending = n, n = ss(e), Im(e, null, i), n;
    }
    return os(e, o, n, i), ss(e);
  }
  function Yl(e, n, i) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (i & 4194048) !== 0)) {
      var o = n.lanes;
      o &= e.pendingLanes, i |= o, n.lanes = i, Wt(e, i);
    }
  }
  function Pc(e, n) {
    var i = e.updateQueue, o = e.alternate;
    if (o !== null && (o = o.updateQueue, i === o)) {
      var f = null, d = null;
      if (i = i.firstBaseUpdate, i !== null) {
        do {
          var x = {
            lane: i.lane,
            tag: i.tag,
            payload: i.payload,
            callback: null,
            next: null
          };
          d === null ? f = d = x : d = d.next = x, i = i.next;
        } while (i !== null);
        d === null ? f = d = n : d = d.next = n;
      } else f = d = n;
      i = {
        baseState: o.baseState,
        firstBaseUpdate: f,
        lastBaseUpdate: d,
        shared: o.shared,
        callbacks: o.callbacks
      }, e.updateQueue = i;
      return;
    }
    e = i.lastBaseUpdate, e === null ? i.firstBaseUpdate = n : e.next = n, i.lastBaseUpdate = n;
  }
  var Jc = !1;
  function $l() {
    if (Jc) {
      var e = Vr;
      if (e !== null) throw e;
    }
  }
  function Xl(e, n, i, o) {
    Jc = !1;
    var f = e.updateQueue;
    xi = !1;
    var d = f.firstBaseUpdate, x = f.lastBaseUpdate, M = f.shared.pending;
    if (M !== null) {
      f.shared.pending = null;
      var q = M, ae = q.next;
      q.next = null, x === null ? d = ae : x.next = ae, x = q;
      var ue = e.alternate;
      ue !== null && (ue = ue.updateQueue, M = ue.lastBaseUpdate, M !== x && (M === null ? ue.firstBaseUpdate = ae : M.next = ae, ue.lastBaseUpdate = q));
    }
    if (d !== null) {
      var fe = f.baseState;
      x = 0, ue = ae = q = null, M = d;
      do {
        var ie = M.lane & -536870913, oe = ie !== M.lane;
        if (oe ? (et & ie) === ie : (o & ie) === ie) {
          ie !== 0 && ie === kr && (Jc = !0), ue !== null && (ue = ue.next = {
            lane: 0,
            tag: M.tag,
            payload: M.payload,
            callback: null,
            next: null
          });
          e: {
            var _e = e, je = M;
            ie = n;
            var Nt = i;
            switch (je.tag) {
              case 1:
                if (_e = je.payload, typeof _e == "function") {
                  fe = _e.call(Nt, fe, ie);
                  break e;
                }
                fe = _e;
                break e;
              case 3:
                _e.flags = _e.flags & -65537 | 128;
              case 0:
                if (_e = je.payload, ie = typeof _e == "function" ? _e.call(Nt, fe, ie) : _e, ie == null) break e;
                fe = p({}, fe, ie);
                break e;
              case 2:
                xi = !0;
            }
          }
          ie = M.callback, ie !== null && (e.flags |= 64, oe && (e.flags |= 8192), oe = f.callbacks, oe === null ? f.callbacks = [ie] : oe.push(ie));
        } else
          oe = {
            lane: ie,
            tag: M.tag,
            payload: M.payload,
            callback: M.callback,
            next: null
          }, ue === null ? (ae = ue = oe, q = fe) : ue = ue.next = oe, x |= ie;
        if (M = M.next, M === null) {
          if (M = f.shared.pending, M === null)
            break;
          oe = M, M = oe.next, oe.next = null, f.lastBaseUpdate = oe, f.shared.pending = null;
        }
      } while (!0);
      ue === null && (q = fe), f.baseState = q, f.firstBaseUpdate = ae, f.lastBaseUpdate = ue, d === null && (f.shared.lanes = 0), Ci |= x, e.lanes = x, e.memoizedState = fe;
    }
  }
  function cp(e, n) {
    if (typeof e != "function")
      throw Error(l(191, e));
    e.call(n);
  }
  function fp(e, n) {
    var i = e.callbacks;
    if (i !== null)
      for (e.callbacks = null, e = 0; e < i.length; e++)
        cp(i[e], n);
  }
  var $r = A(null), vs = A(0);
  function dp(e, n) {
    e = Pa, F(vs, e), F($r, n), Pa = e | n.baseLanes;
  }
  function Wc() {
    F(vs, Pa), F($r, $r.current);
  }
  function ef() {
    Pa = vs.current, k($r), k(vs);
  }
  var Ln = A(null), Kn = null;
  function Ei(e) {
    var n = e.alternate;
    F(qt, qt.current & 1), F(Ln, e), Kn === null && (n === null || $r.current !== null || n.memoizedState !== null) && (Kn = e);
  }
  function tf(e) {
    F(qt, qt.current), F(Ln, e), Kn === null && (Kn = e);
  }
  function hp(e) {
    e.tag === 22 ? (F(qt, qt.current), F(Ln, e), Kn === null && (Kn = e)) : _i();
  }
  function _i() {
    F(qt, qt.current), F(Ln, Ln.current);
  }
  function jn(e) {
    k(Ln), Kn === e && (Kn = null), k(qt);
  }
  var qt = A(0);
  function bs(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var i = n.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || sd(i) || ud(i)))
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
  var $a = 0, qe = null, Et = null, It = null, xs = !1, Xr = !1, rr = !1, ws = 0, Gl = 0, Gr = null, tS = 0;
  function Bt() {
    throw Error(l(321));
  }
  function nf(e, n) {
    if (n === null) return !1;
    for (var i = 0; i < n.length && i < e.length; i++)
      if (!zn(e[i], n[i])) return !1;
    return !0;
  }
  function af(e, n, i, o, f, d) {
    return $a = d, qe = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, C.H = e === null || e.memoizedState === null ? Kp : bf, rr = !1, d = i(o, f), rr = !1, Xr && (d = pp(
      n,
      i,
      o,
      f
    )), mp(e), d;
  }
  function mp(e) {
    C.H = Ql;
    var n = Et !== null && Et.next !== null;
    if ($a = 0, It = Et = qe = null, xs = !1, Gl = 0, Gr = null, n) throw Error(l(300));
    e === null || Zt || (e = e.dependencies, e !== null && fs(e) && (Zt = !0));
  }
  function pp(e, n, i, o) {
    qe = e;
    var f = 0;
    do {
      if (Xr && (Gr = null), Gl = 0, Xr = !1, 25 <= f) throw Error(l(301));
      if (f += 1, It = Et = null, e.updateQueue != null) {
        var d = e.updateQueue;
        d.lastEffect = null, d.events = null, d.stores = null, d.memoCache != null && (d.memoCache.index = 0);
      }
      C.H = Pp, d = n(i, o);
    } while (Xr);
    return d;
  }
  function nS() {
    var e = C.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? Il(n) : n, e = e.useState()[0], (Et !== null ? Et.memoizedState : null) !== e && (qe.flags |= 1024), n;
  }
  function rf() {
    var e = ws !== 0;
    return ws = 0, e;
  }
  function lf(e, n, i) {
    n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~i;
  }
  function of(e) {
    if (xs) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        n !== null && (n.pending = null), e = e.next;
      }
      xs = !1;
    }
    $a = 0, It = Et = qe = null, Xr = !1, Gl = ws = 0, Gr = null;
  }
  function gn() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return It === null ? qe.memoizedState = It = e : It = It.next = e, It;
  }
  function Yt() {
    if (Et === null) {
      var e = qe.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Et.next;
    var n = It === null ? qe.memoizedState : It.next;
    if (n !== null)
      It = n, Et = e;
    else {
      if (e === null)
        throw qe.alternate === null ? Error(l(467)) : Error(l(310));
      Et = e, e = {
        memoizedState: Et.memoizedState,
        baseState: Et.baseState,
        baseQueue: Et.baseQueue,
        queue: Et.queue,
        next: null
      }, It === null ? qe.memoizedState = It = e : It = It.next = e;
    }
    return It;
  }
  function Ss() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Il(e) {
    var n = Gl;
    return Gl += 1, Gr === null && (Gr = []), e = rp(Gr, e, n), n = qe, (It === null ? n.memoizedState : It.next) === null && (n = n.alternate, C.H = n === null || n.memoizedState === null ? Kp : bf), e;
  }
  function Es(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Il(e);
      if (e.$$typeof === E) return ln(e);
    }
    throw Error(l(438, String(e)));
  }
  function sf(e) {
    var n = null, i = qe.updateQueue;
    if (i !== null && (n = i.memoCache), n == null) {
      var o = qe.alternate;
      o !== null && (o = o.updateQueue, o !== null && (o = o.memoCache, o != null && (n = {
        data: o.data.map(function(f) {
          return f.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), i === null && (i = Ss(), qe.updateQueue = i), i.memoCache = n, i = n.data[n.index], i === void 0)
      for (i = n.data[n.index] = Array(e), o = 0; o < e; o++)
        i[o] = le;
    return n.index++, i;
  }
  function Xa(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function _s(e) {
    var n = Yt();
    return uf(n, Et, e);
  }
  function uf(e, n, i) {
    var o = e.queue;
    if (o === null) throw Error(l(311));
    o.lastRenderedReducer = i;
    var f = e.baseQueue, d = o.pending;
    if (d !== null) {
      if (f !== null) {
        var x = f.next;
        f.next = d.next, d.next = x;
      }
      n.baseQueue = f = d, o.pending = null;
    }
    if (d = e.baseState, f === null) e.memoizedState = d;
    else {
      n = f.next;
      var M = x = null, q = null, ae = n, ue = !1;
      do {
        var fe = ae.lane & -536870913;
        if (fe !== ae.lane ? (et & fe) === fe : ($a & fe) === fe) {
          var ie = ae.revertLane;
          if (ie === 0)
            q !== null && (q = q.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: ae.action,
              hasEagerState: ae.hasEagerState,
              eagerState: ae.eagerState,
              next: null
            }), fe === kr && (ue = !0);
          else if (($a & ie) === ie) {
            ae = ae.next, ie === kr && (ue = !0);
            continue;
          } else
            fe = {
              lane: 0,
              revertLane: ae.revertLane,
              gesture: null,
              action: ae.action,
              hasEagerState: ae.hasEagerState,
              eagerState: ae.eagerState,
              next: null
            }, q === null ? (M = q = fe, x = d) : q = q.next = fe, qe.lanes |= ie, Ci |= ie;
          fe = ae.action, rr && i(d, fe), d = ae.hasEagerState ? ae.eagerState : i(d, fe);
        } else
          ie = {
            lane: fe,
            revertLane: ae.revertLane,
            gesture: ae.gesture,
            action: ae.action,
            hasEagerState: ae.hasEagerState,
            eagerState: ae.eagerState,
            next: null
          }, q === null ? (M = q = ie, x = d) : q = q.next = ie, qe.lanes |= fe, Ci |= fe;
        ae = ae.next;
      } while (ae !== null && ae !== n);
      if (q === null ? x = d : q.next = M, !zn(d, e.memoizedState) && (Zt = !0, ue && (i = Vr, i !== null)))
        throw i;
      e.memoizedState = d, e.baseState = x, e.baseQueue = q, o.lastRenderedState = d;
    }
    return f === null && (o.lanes = 0), [e.memoizedState, o.dispatch];
  }
  function cf(e) {
    var n = Yt(), i = n.queue;
    if (i === null) throw Error(l(311));
    i.lastRenderedReducer = e;
    var o = i.dispatch, f = i.pending, d = n.memoizedState;
    if (f !== null) {
      i.pending = null;
      var x = f = f.next;
      do
        d = e(d, x.action), x = x.next;
      while (x !== f);
      zn(d, n.memoizedState) || (Zt = !0), n.memoizedState = d, n.baseQueue === null && (n.baseState = d), i.lastRenderedState = d;
    }
    return [d, o];
  }
  function gp(e, n, i) {
    var o = qe, f = Yt(), d = it;
    if (d) {
      if (i === void 0) throw Error(l(407));
      i = i();
    } else i = n();
    var x = !zn(
      (Et || f).memoizedState,
      i
    );
    if (x && (f.memoizedState = i, Zt = !0), f = f.queue, hf(bp.bind(null, o, f, e), [
      e
    ]), f.getSnapshot !== n || x || It !== null && It.memoizedState.tag & 1) {
      if (o.flags |= 2048, Ir(
        9,
        { destroy: void 0 },
        vp.bind(
          null,
          o,
          f,
          i,
          n
        ),
        null
      ), Ct === null) throw Error(l(349));
      d || ($a & 127) !== 0 || yp(o, n, i);
    }
    return i;
  }
  function yp(e, n, i) {
    e.flags |= 16384, e = { getSnapshot: n, value: i }, n = qe.updateQueue, n === null ? (n = Ss(), qe.updateQueue = n, n.stores = [e]) : (i = n.stores, i === null ? n.stores = [e] : i.push(e));
  }
  function vp(e, n, i, o) {
    n.value = i, n.getSnapshot = o, xp(n) && wp(e);
  }
  function bp(e, n, i) {
    return i(function() {
      xp(n) && wp(e);
    });
  }
  function xp(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var i = n();
      return !zn(e, i);
    } catch {
      return !0;
    }
  }
  function wp(e) {
    var n = Ki(e, 2);
    n !== null && Rn(n, e, 2);
  }
  function ff(e) {
    var n = gn();
    if (typeof e == "function") {
      var i = e;
      if (e = i(), rr) {
        Ot(!0);
        try {
          i();
        } finally {
          Ot(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = e, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Xa,
      lastRenderedState: e
    }, n;
  }
  function Sp(e, n, i, o) {
    return e.baseState = i, uf(
      e,
      Et,
      typeof o == "function" ? o : Xa
    );
  }
  function aS(e, n, i, o, f) {
    if (Cs(e)) throw Error(l(485));
    if (e = n.action, e !== null) {
      var d = {
        payload: f,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(x) {
          d.listeners.push(x);
        }
      };
      C.T !== null ? i(!0) : d.isTransition = !1, o(d), i = n.pending, i === null ? (d.next = n.pending = d, Ep(n, d)) : (d.next = i.next, n.pending = i.next = d);
    }
  }
  function Ep(e, n) {
    var i = n.action, o = n.payload, f = e.state;
    if (n.isTransition) {
      var d = C.T, x = {};
      C.T = x;
      try {
        var M = i(f, o), q = C.S;
        q !== null && q(x, M), _p(e, n, M);
      } catch (ae) {
        df(e, n, ae);
      } finally {
        d !== null && x.types !== null && (d.types = x.types), C.T = d;
      }
    } else
      try {
        d = i(f, o), _p(e, n, d);
      } catch (ae) {
        df(e, n, ae);
      }
  }
  function _p(e, n, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(o) {
        Np(e, n, o);
      },
      function(o) {
        return df(e, n, o);
      }
    ) : Np(e, n, i);
  }
  function Np(e, n, i) {
    n.status = "fulfilled", n.value = i, Rp(n), e.state = i, n = e.pending, n !== null && (i = n.next, i === n ? e.pending = null : (i = i.next, n.next = i, Ep(e, i)));
  }
  function df(e, n, i) {
    var o = e.pending;
    if (e.pending = null, o !== null) {
      o = o.next;
      do
        n.status = "rejected", n.reason = i, Rp(n), n = n.next;
      while (n !== o);
    }
    e.action = null;
  }
  function Rp(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function Cp(e, n) {
    return n;
  }
  function Tp(e, n) {
    if (it) {
      var i = Ct.formState;
      if (i !== null) {
        e: {
          var o = qe;
          if (it) {
            if (Tt) {
              t: {
                for (var f = Tt, d = Fn; f.nodeType !== 8; ) {
                  if (!d) {
                    f = null;
                    break t;
                  }
                  if (f = Pn(
                    f.nextSibling
                  ), f === null) {
                    f = null;
                    break t;
                  }
                }
                d = f.data, f = d === "F!" || d === "F" ? f : null;
              }
              if (f) {
                Tt = Pn(
                  f.nextSibling
                ), o = f.data === "F!";
                break e;
              }
            }
            vi(o);
          }
          o = !1;
        }
        o && (n = i[0]);
      }
    }
    return i = gn(), i.memoizedState = i.baseState = n, o = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Cp,
      lastRenderedState: n
    }, i.queue = o, i = Zp.bind(
      null,
      qe,
      o
    ), o.dispatch = i, o = ff(!1), d = vf.bind(
      null,
      qe,
      !1,
      o.queue
    ), o = gn(), f = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, o.queue = f, i = aS.bind(
      null,
      qe,
      f,
      d,
      i
    ), f.dispatch = i, o.memoizedState = e, [n, i, !1];
  }
  function Mp(e) {
    var n = Yt();
    return Dp(n, Et, e);
  }
  function Dp(e, n, i) {
    if (n = uf(
      e,
      n,
      Cp
    )[0], e = _s(Xa)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var o = Il(n);
      } catch (x) {
        throw x === qr ? ms : x;
      }
    else o = n;
    n = Yt();
    var f = n.queue, d = f.dispatch;
    return i !== n.memoizedState && (qe.flags |= 2048, Ir(
      9,
      { destroy: void 0 },
      iS.bind(null, f, i),
      null
    )), [o, d, e];
  }
  function iS(e, n) {
    e.action = n;
  }
  function Ap(e) {
    var n = Yt(), i = Et;
    if (i !== null)
      return Dp(n, i, e);
    Yt(), n = n.memoizedState, i = Yt();
    var o = i.queue.dispatch;
    return i.memoizedState = e, [n, o, !1];
  }
  function Ir(e, n, i, o) {
    return e = { tag: e, create: i, deps: o, inst: n, next: null }, n = qe.updateQueue, n === null && (n = Ss(), qe.updateQueue = n), i = n.lastEffect, i === null ? n.lastEffect = e.next = e : (o = i.next, i.next = e, e.next = o, n.lastEffect = e), e;
  }
  function zp() {
    return Yt().memoizedState;
  }
  function Ns(e, n, i, o) {
    var f = gn();
    qe.flags |= e, f.memoizedState = Ir(
      1 | n,
      { destroy: void 0 },
      i,
      o === void 0 ? null : o
    );
  }
  function Rs(e, n, i, o) {
    var f = Yt();
    o = o === void 0 ? null : o;
    var d = f.memoizedState.inst;
    Et !== null && o !== null && nf(o, Et.memoizedState.deps) ? f.memoizedState = Ir(n, d, i, o) : (qe.flags |= e, f.memoizedState = Ir(
      1 | n,
      d,
      i,
      o
    ));
  }
  function Op(e, n) {
    Ns(8390656, 8, e, n);
  }
  function hf(e, n) {
    Rs(2048, 8, e, n);
  }
  function rS(e) {
    qe.flags |= 4;
    var n = qe.updateQueue;
    if (n === null)
      n = Ss(), qe.updateQueue = n, n.events = [e];
    else {
      var i = n.events;
      i === null ? n.events = [e] : i.push(e);
    }
  }
  function Lp(e) {
    var n = Yt().memoizedState;
    return rS({ ref: n, nextImpl: e }), function() {
      if ((ht & 2) !== 0) throw Error(l(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function jp(e, n) {
    return Rs(4, 2, e, n);
  }
  function Hp(e, n) {
    return Rs(4, 4, e, n);
  }
  function Bp(e, n) {
    if (typeof n == "function") {
      e = e();
      var i = n(e);
      return function() {
        typeof i == "function" ? i() : n(null);
      };
    }
    if (n != null)
      return e = e(), n.current = e, function() {
        n.current = null;
      };
  }
  function Up(e, n, i) {
    i = i != null ? i.concat([e]) : null, Rs(4, 4, Bp.bind(null, n, e), i);
  }
  function mf() {
  }
  function kp(e, n) {
    var i = Yt();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    return n !== null && nf(n, o[1]) ? o[0] : (i.memoizedState = [e, n], e);
  }
  function Vp(e, n) {
    var i = Yt();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    if (n !== null && nf(n, o[1]))
      return o[0];
    if (o = e(), rr) {
      Ot(!0);
      try {
        e();
      } finally {
        Ot(!1);
      }
    }
    return i.memoizedState = [o, n], o;
  }
  function pf(e, n, i) {
    return i === void 0 || ($a & 1073741824) !== 0 && (et & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = i, e = qg(), qe.lanes |= e, Ci |= e, i);
  }
  function qp(e, n, i, o) {
    return zn(i, n) ? i : $r.current !== null ? (e = pf(e, i, o), zn(e, n) || (Zt = !0), e) : ($a & 42) === 0 || ($a & 1073741824) !== 0 && (et & 261930) === 0 ? (Zt = !0, e.memoizedState = i) : (e = qg(), qe.lanes |= e, Ci |= e, n);
  }
  function Yp(e, n, i, o, f) {
    var d = z.p;
    z.p = d !== 0 && 8 > d ? d : 8;
    var x = C.T, M = {};
    C.T = M, vf(e, !1, n, i);
    try {
      var q = f(), ae = C.S;
      if (ae !== null && ae(M, q), q !== null && typeof q == "object" && typeof q.then == "function") {
        var ue = eS(
          q,
          o
        );
        Zl(
          e,
          n,
          ue,
          Un(e)
        );
      } else
        Zl(
          e,
          n,
          o,
          Un(e)
        );
    } catch (fe) {
      Zl(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: fe },
        Un()
      );
    } finally {
      z.p = d, x !== null && M.types !== null && (x.types = M.types), C.T = x;
    }
  }
  function lS() {
  }
  function gf(e, n, i, o) {
    if (e.tag !== 5) throw Error(l(476));
    var f = $p(e).queue;
    Yp(
      e,
      f,
      n,
      Y,
      i === null ? lS : function() {
        return Xp(e), i(o);
      }
    );
  }
  function $p(e) {
    var n = e.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: Y,
      baseState: Y,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Xa,
        lastRenderedState: Y
      },
      next: null
    };
    var i = {};
    return n.next = {
      memoizedState: i,
      baseState: i,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Xa,
        lastRenderedState: i
      },
      next: null
    }, e.memoizedState = n, e = e.alternate, e !== null && (e.memoizedState = n), n;
  }
  function Xp(e) {
    var n = $p(e);
    n.next === null && (n = e.alternate.memoizedState), Zl(
      e,
      n.next.queue,
      {},
      Un()
    );
  }
  function yf() {
    return ln(co);
  }
  function Gp() {
    return Yt().memoizedState;
  }
  function Ip() {
    return Yt().memoizedState;
  }
  function oS(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var i = Un();
          e = wi(i);
          var o = Si(n, e, i);
          o !== null && (Rn(o, n, i), Yl(o, n, i)), n = { cache: Gc() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function sS(e, n, i) {
    var o = Un();
    i = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Cs(e) ? Qp(n, i) : (i = Lc(e, n, i, o), i !== null && (Rn(i, e, o), Fp(i, n, o)));
  }
  function Zp(e, n, i) {
    var o = Un();
    Zl(e, n, i, o);
  }
  function Zl(e, n, i, o) {
    var f = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Cs(e)) Qp(n, f);
    else {
      var d = e.alternate;
      if (e.lanes === 0 && (d === null || d.lanes === 0) && (d = n.lastRenderedReducer, d !== null))
        try {
          var x = n.lastRenderedState, M = d(x, i);
          if (f.hasEagerState = !0, f.eagerState = M, zn(M, x))
            return os(e, n, f, 0), Ct === null && ls(), !1;
        } catch {
        } finally {
        }
      if (i = Lc(e, n, f, o), i !== null)
        return Rn(i, e, o), Fp(i, n, o), !0;
    }
    return !1;
  }
  function vf(e, n, i, o) {
    if (o = {
      lane: 2,
      revertLane: Kf(),
      gesture: null,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Cs(e)) {
      if (n) throw Error(l(479));
    } else
      n = Lc(
        e,
        i,
        o,
        2
      ), n !== null && Rn(n, e, 2);
  }
  function Cs(e) {
    var n = e.alternate;
    return e === qe || n !== null && n === qe;
  }
  function Qp(e, n) {
    Xr = xs = !0;
    var i = e.pending;
    i === null ? n.next = n : (n.next = i.next, i.next = n), e.pending = n;
  }
  function Fp(e, n, i) {
    if ((i & 4194048) !== 0) {
      var o = n.lanes;
      o &= e.pendingLanes, i |= o, n.lanes = i, Wt(e, i);
    }
  }
  var Ql = {
    readContext: ln,
    use: Es,
    useCallback: Bt,
    useContext: Bt,
    useEffect: Bt,
    useImperativeHandle: Bt,
    useLayoutEffect: Bt,
    useInsertionEffect: Bt,
    useMemo: Bt,
    useReducer: Bt,
    useRef: Bt,
    useState: Bt,
    useDebugValue: Bt,
    useDeferredValue: Bt,
    useTransition: Bt,
    useSyncExternalStore: Bt,
    useId: Bt,
    useHostTransitionStatus: Bt,
    useFormState: Bt,
    useActionState: Bt,
    useOptimistic: Bt,
    useMemoCache: Bt,
    useCacheRefresh: Bt
  };
  Ql.useEffectEvent = Bt;
  var Kp = {
    readContext: ln,
    use: Es,
    useCallback: function(e, n) {
      return gn().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: ln,
    useEffect: Op,
    useImperativeHandle: function(e, n, i) {
      i = i != null ? i.concat([e]) : null, Ns(
        4194308,
        4,
        Bp.bind(null, n, e),
        i
      );
    },
    useLayoutEffect: function(e, n) {
      return Ns(4194308, 4, e, n);
    },
    useInsertionEffect: function(e, n) {
      Ns(4, 2, e, n);
    },
    useMemo: function(e, n) {
      var i = gn();
      n = n === void 0 ? null : n;
      var o = e();
      if (rr) {
        Ot(!0);
        try {
          e();
        } finally {
          Ot(!1);
        }
      }
      return i.memoizedState = [o, n], o;
    },
    useReducer: function(e, n, i) {
      var o = gn();
      if (i !== void 0) {
        var f = i(n);
        if (rr) {
          Ot(!0);
          try {
            i(n);
          } finally {
            Ot(!1);
          }
        }
      } else f = n;
      return o.memoizedState = o.baseState = f, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: f
      }, o.queue = e, e = e.dispatch = sS.bind(
        null,
        qe,
        e
      ), [o.memoizedState, e];
    },
    useRef: function(e) {
      var n = gn();
      return e = { current: e }, n.memoizedState = e;
    },
    useState: function(e) {
      e = ff(e);
      var n = e.queue, i = Zp.bind(null, qe, n);
      return n.dispatch = i, [e.memoizedState, i];
    },
    useDebugValue: mf,
    useDeferredValue: function(e, n) {
      var i = gn();
      return pf(i, e, n);
    },
    useTransition: function() {
      var e = ff(!1);
      return e = Yp.bind(
        null,
        qe,
        e.queue,
        !0,
        !1
      ), gn().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, i) {
      var o = qe, f = gn();
      if (it) {
        if (i === void 0)
          throw Error(l(407));
        i = i();
      } else {
        if (i = n(), Ct === null)
          throw Error(l(349));
        (et & 127) !== 0 || yp(o, n, i);
      }
      f.memoizedState = i;
      var d = { value: i, getSnapshot: n };
      return f.queue = d, Op(bp.bind(null, o, d, e), [
        e
      ]), o.flags |= 2048, Ir(
        9,
        { destroy: void 0 },
        vp.bind(
          null,
          o,
          d,
          i,
          n
        ),
        null
      ), i;
    },
    useId: function() {
      var e = gn(), n = Ct.identifierPrefix;
      if (it) {
        var i = _a, o = Ea;
        i = (o & ~(1 << 32 - kt(o) - 1)).toString(32) + i, n = "_" + n + "R_" + i, i = ws++, 0 < i && (n += "H" + i.toString(32)), n += "_";
      } else
        i = tS++, n = "_" + n + "r_" + i.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: yf,
    useFormState: Tp,
    useActionState: Tp,
    useOptimistic: function(e) {
      var n = gn();
      n.memoizedState = n.baseState = e;
      var i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = i, n = vf.bind(
        null,
        qe,
        !0,
        i
      ), i.dispatch = n, [e, n];
    },
    useMemoCache: sf,
    useCacheRefresh: function() {
      return gn().memoizedState = oS.bind(
        null,
        qe
      );
    },
    useEffectEvent: function(e) {
      var n = gn(), i = { impl: e };
      return n.memoizedState = i, function() {
        if ((ht & 2) !== 0)
          throw Error(l(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, bf = {
    readContext: ln,
    use: Es,
    useCallback: kp,
    useContext: ln,
    useEffect: hf,
    useImperativeHandle: Up,
    useInsertionEffect: jp,
    useLayoutEffect: Hp,
    useMemo: Vp,
    useReducer: _s,
    useRef: zp,
    useState: function() {
      return _s(Xa);
    },
    useDebugValue: mf,
    useDeferredValue: function(e, n) {
      var i = Yt();
      return qp(
        i,
        Et.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = _s(Xa)[0], n = Yt().memoizedState;
      return [
        typeof e == "boolean" ? e : Il(e),
        n
      ];
    },
    useSyncExternalStore: gp,
    useId: Gp,
    useHostTransitionStatus: yf,
    useFormState: Mp,
    useActionState: Mp,
    useOptimistic: function(e, n) {
      var i = Yt();
      return Sp(i, Et, e, n);
    },
    useMemoCache: sf,
    useCacheRefresh: Ip
  };
  bf.useEffectEvent = Lp;
  var Pp = {
    readContext: ln,
    use: Es,
    useCallback: kp,
    useContext: ln,
    useEffect: hf,
    useImperativeHandle: Up,
    useInsertionEffect: jp,
    useLayoutEffect: Hp,
    useMemo: Vp,
    useReducer: cf,
    useRef: zp,
    useState: function() {
      return cf(Xa);
    },
    useDebugValue: mf,
    useDeferredValue: function(e, n) {
      var i = Yt();
      return Et === null ? pf(i, e, n) : qp(
        i,
        Et.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = cf(Xa)[0], n = Yt().memoizedState;
      return [
        typeof e == "boolean" ? e : Il(e),
        n
      ];
    },
    useSyncExternalStore: gp,
    useId: Gp,
    useHostTransitionStatus: yf,
    useFormState: Ap,
    useActionState: Ap,
    useOptimistic: function(e, n) {
      var i = Yt();
      return Et !== null ? Sp(i, Et, e, n) : (i.baseState = e, [e, i.queue.dispatch]);
    },
    useMemoCache: sf,
    useCacheRefresh: Ip
  };
  Pp.useEffectEvent = Lp;
  function xf(e, n, i, o) {
    n = e.memoizedState, i = i(o, n), i = i == null ? n : p({}, n, i), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
  }
  var wf = {
    enqueueSetState: function(e, n, i) {
      e = e._reactInternals;
      var o = Un(), f = wi(o);
      f.payload = n, i != null && (f.callback = i), n = Si(e, f, o), n !== null && (Rn(n, e, o), Yl(n, e, o));
    },
    enqueueReplaceState: function(e, n, i) {
      e = e._reactInternals;
      var o = Un(), f = wi(o);
      f.tag = 1, f.payload = n, i != null && (f.callback = i), n = Si(e, f, o), n !== null && (Rn(n, e, o), Yl(n, e, o));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var i = Un(), o = wi(i);
      o.tag = 2, n != null && (o.callback = n), n = Si(e, o, i), n !== null && (Rn(n, e, i), Yl(n, e, i));
    }
  };
  function Jp(e, n, i, o, f, d, x) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, d, x) : n.prototype && n.prototype.isPureReactComponent ? !Ll(i, o) || !Ll(f, d) : !0;
  }
  function Wp(e, n, i, o) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(i, o), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(i, o), n.state !== e && wf.enqueueReplaceState(n, n.state, null);
  }
  function lr(e, n) {
    var i = n;
    if ("ref" in n) {
      i = {};
      for (var o in n)
        o !== "ref" && (i[o] = n[o]);
    }
    if (e = e.defaultProps) {
      i === n && (i = p({}, i));
      for (var f in e)
        i[f] === void 0 && (i[f] = e[f]);
    }
    return i;
  }
  function eg(e) {
    rs(e);
  }
  function tg(e) {
    console.error(e);
  }
  function ng(e) {
    rs(e);
  }
  function Ts(e, n) {
    try {
      var i = e.onUncaughtError;
      i(n.value, { componentStack: n.stack });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function ag(e, n, i) {
    try {
      var o = e.onCaughtError;
      o(i.value, {
        componentStack: i.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (f) {
      setTimeout(function() {
        throw f;
      });
    }
  }
  function Sf(e, n, i) {
    return i = wi(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      Ts(e, n);
    }, i;
  }
  function ig(e) {
    return e = wi(e), e.tag = 3, e;
  }
  function rg(e, n, i, o) {
    var f = i.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var d = o.value;
      e.payload = function() {
        return f(d);
      }, e.callback = function() {
        ag(n, i, o);
      };
    }
    var x = i.stateNode;
    x !== null && typeof x.componentDidCatch == "function" && (e.callback = function() {
      ag(n, i, o), typeof f != "function" && (Ti === null ? Ti = /* @__PURE__ */ new Set([this]) : Ti.add(this));
      var M = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: M !== null ? M : ""
      });
    });
  }
  function uS(e, n, i, o, f) {
    if (i.flags |= 32768, o !== null && typeof o == "object" && typeof o.then == "function") {
      if (n = i.alternate, n !== null && Ur(
        n,
        i,
        f,
        !0
      ), i = Ln.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return Kn === null ? Vs() : i.alternate === null && Ut === 0 && (Ut = 3), i.flags &= -257, i.flags |= 65536, i.lanes = f, o === ps ? i.flags |= 16384 : (n = i.updateQueue, n === null ? i.updateQueue = /* @__PURE__ */ new Set([o]) : n.add(o), Zf(e, o, f)), !1;
          case 22:
            return i.flags |= 65536, o === ps ? i.flags |= 16384 : (n = i.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([o])
            }, i.updateQueue = n) : (i = n.retryQueue, i === null ? n.retryQueue = /* @__PURE__ */ new Set([o]) : i.add(o)), Zf(e, o, f)), !1;
        }
        throw Error(l(435, i.tag));
      }
      return Zf(e, o, f), Vs(), !1;
    }
    if (it)
      return n = Ln.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = f, o !== Vc && (e = Error(l(422), { cause: o }), Bl(In(e, i)))) : (o !== Vc && (n = Error(l(423), {
        cause: o
      }), Bl(
        In(n, i)
      )), e = e.current.alternate, e.flags |= 65536, f &= -f, e.lanes |= f, o = In(o, i), f = Sf(
        e.stateNode,
        o,
        f
      ), Pc(e, f), Ut !== 4 && (Ut = 2)), !1;
    var d = Error(l(520), { cause: o });
    if (d = In(d, i), no === null ? no = [d] : no.push(d), Ut !== 4 && (Ut = 2), n === null) return !0;
    o = In(o, i), i = n;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, e = f & -f, i.lanes |= e, e = Sf(i.stateNode, o, e), Pc(i, e), !1;
        case 1:
          if (n = i.type, d = i.stateNode, (i.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (Ti === null || !Ti.has(d))))
            return i.flags |= 65536, f &= -f, i.lanes |= f, f = ig(f), rg(
              f,
              e,
              i,
              o
            ), Pc(i, f), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var Ef = Error(l(461)), Zt = !1;
  function on(e, n, i, o) {
    n.child = e === null ? up(n, null, i, o) : ir(
      n,
      e.child,
      i,
      o
    );
  }
  function lg(e, n, i, o, f) {
    i = i.render;
    var d = n.ref;
    if ("ref" in o) {
      var x = {};
      for (var M in o)
        M !== "ref" && (x[M] = o[M]);
    } else x = o;
    return er(n), o = af(
      e,
      n,
      i,
      x,
      d,
      f
    ), M = rf(), e !== null && !Zt ? (lf(e, n, f), Ga(e, n, f)) : (it && M && Uc(n), n.flags |= 1, on(e, n, o, f), n.child);
  }
  function og(e, n, i, o, f) {
    if (e === null) {
      var d = i.type;
      return typeof d == "function" && !jc(d) && d.defaultProps === void 0 && i.compare === null ? (n.tag = 15, n.type = d, sg(
        e,
        n,
        d,
        o,
        f
      )) : (e = us(
        i.type,
        null,
        o,
        n,
        n.mode,
        f
      ), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (d = e.child, !Af(e, f)) {
      var x = d.memoizedProps;
      if (i = i.compare, i = i !== null ? i : Ll, i(x, o) && e.ref === n.ref)
        return Ga(e, n, f);
    }
    return n.flags |= 1, e = ka(d, o), e.ref = n.ref, e.return = n, n.child = e;
  }
  function sg(e, n, i, o, f) {
    if (e !== null) {
      var d = e.memoizedProps;
      if (Ll(d, o) && e.ref === n.ref)
        if (Zt = !1, n.pendingProps = o = d, Af(e, f))
          (e.flags & 131072) !== 0 && (Zt = !0);
        else
          return n.lanes = e.lanes, Ga(e, n, f);
    }
    return _f(
      e,
      n,
      i,
      o,
      f
    );
  }
  function ug(e, n, i, o) {
    var f = o.children, d = e !== null ? e.memoizedState : null;
    if (e === null && n.stateNode === null && (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), o.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (d = d !== null ? d.baseLanes | i : i, e !== null) {
          for (o = n.child = e.child, f = 0; o !== null; )
            f = f | o.lanes | o.childLanes, o = o.sibling;
          o = f & ~d;
        } else o = 0, n.child = null;
        return cg(
          e,
          n,
          d,
          i,
          o
        );
      }
      if ((i & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && hs(
          n,
          d !== null ? d.cachePool : null
        ), d !== null ? dp(n, d) : Wc(), hp(n);
      else
        return o = n.lanes = 536870912, cg(
          e,
          n,
          d !== null ? d.baseLanes | i : i,
          i,
          o
        );
    } else
      d !== null ? (hs(n, d.cachePool), dp(n, d), _i(), n.memoizedState = null) : (e !== null && hs(n, null), Wc(), _i());
    return on(e, n, f, i), n.child;
  }
  function Fl(e, n) {
    return e !== null && e.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function cg(e, n, i, o, f) {
    var d = Zc();
    return d = d === null ? null : { parent: Gt._currentValue, pool: d }, n.memoizedState = {
      baseLanes: i,
      cachePool: d
    }, e !== null && hs(n, null), Wc(), hp(n), e !== null && Ur(e, n, o, !0), n.childLanes = f, null;
  }
  function Ms(e, n) {
    return n = As(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function fg(e, n, i) {
    return ir(n, e.child, null, i), e = Ms(n, n.pendingProps), e.flags |= 2, jn(n), n.memoizedState = null, e;
  }
  function cS(e, n, i) {
    var o = n.pendingProps, f = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (it) {
        if (o.mode === "hidden")
          return e = Ms(n, o), n.lanes = 536870912, Fl(null, e);
        if (tf(n), (e = Tt) ? (e = E0(
          e,
          Fn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: gi !== null ? { id: Ea, overflow: _a } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Qm(e), i.return = n, n.child = i, rn = n, Tt = null)) : e = null, e === null) throw vi(n);
        return n.lanes = 536870912, null;
      }
      return Ms(n, o);
    }
    var d = e.memoizedState;
    if (d !== null) {
      var x = d.dehydrated;
      if (tf(n), f)
        if (n.flags & 256)
          n.flags &= -257, n = fg(
            e,
            n,
            i
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(l(558));
      else if (Zt || Ur(e, n, i, !1), f = (i & e.childLanes) !== 0, Zt || f) {
        if (o = Ct, o !== null && (x = U(o, i), x !== 0 && x !== d.retryLane))
          throw d.retryLane = x, Ki(e, x), Rn(o, e, x), Ef;
        Vs(), n = fg(
          e,
          n,
          i
        );
      } else
        e = d.treeContext, Tt = Pn(x.nextSibling), rn = n, it = !0, yi = null, Fn = !1, e !== null && Pm(n, e), n = Ms(n, o), n.flags |= 4096;
      return n;
    }
    return e = ka(e.child, {
      mode: o.mode,
      children: o.children
    }), e.ref = n.ref, n.child = e, e.return = n, e;
  }
  function Ds(e, n) {
    var i = n.ref;
    if (i === null)
      e !== null && e.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(l(284));
      (e === null || e.ref !== i) && (n.flags |= 4194816);
    }
  }
  function _f(e, n, i, o, f) {
    return er(n), i = af(
      e,
      n,
      i,
      o,
      void 0,
      f
    ), o = rf(), e !== null && !Zt ? (lf(e, n, f), Ga(e, n, f)) : (it && o && Uc(n), n.flags |= 1, on(e, n, i, f), n.child);
  }
  function dg(e, n, i, o, f, d) {
    return er(n), n.updateQueue = null, i = pp(
      n,
      o,
      i,
      f
    ), mp(e), o = rf(), e !== null && !Zt ? (lf(e, n, d), Ga(e, n, d)) : (it && o && Uc(n), n.flags |= 1, on(e, n, i, d), n.child);
  }
  function hg(e, n, i, o, f) {
    if (er(n), n.stateNode === null) {
      var d = Lr, x = i.contextType;
      typeof x == "object" && x !== null && (d = ln(x)), d = new i(o, d), n.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null, d.updater = wf, n.stateNode = d, d._reactInternals = n, d = n.stateNode, d.props = o, d.state = n.memoizedState, d.refs = {}, Fc(n), x = i.contextType, d.context = typeof x == "object" && x !== null ? ln(x) : Lr, d.state = n.memoizedState, x = i.getDerivedStateFromProps, typeof x == "function" && (xf(
        n,
        i,
        x,
        o
      ), d.state = n.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof d.getSnapshotBeforeUpdate == "function" || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (x = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), x !== d.state && wf.enqueueReplaceState(d, d.state, null), Xl(n, o, d, f), $l(), d.state = n.memoizedState), typeof d.componentDidMount == "function" && (n.flags |= 4194308), o = !0;
    } else if (e === null) {
      d = n.stateNode;
      var M = n.memoizedProps, q = lr(i, M);
      d.props = q;
      var ae = d.context, ue = i.contextType;
      x = Lr, typeof ue == "object" && ue !== null && (x = ln(ue));
      var fe = i.getDerivedStateFromProps;
      ue = typeof fe == "function" || typeof d.getSnapshotBeforeUpdate == "function", M = n.pendingProps !== M, ue || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (M || ae !== x) && Wp(
        n,
        d,
        o,
        x
      ), xi = !1;
      var ie = n.memoizedState;
      d.state = ie, Xl(n, o, d, f), $l(), ae = n.memoizedState, M || ie !== ae || xi ? (typeof fe == "function" && (xf(
        n,
        i,
        fe,
        o
      ), ae = n.memoizedState), (q = xi || Jp(
        n,
        i,
        q,
        o,
        ie,
        ae,
        x
      )) ? (ue || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = o, n.memoizedState = ae), d.props = o, d.state = ae, d.context = x, o = q) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), o = !1);
    } else {
      d = n.stateNode, Kc(e, n), x = n.memoizedProps, ue = lr(i, x), d.props = ue, fe = n.pendingProps, ie = d.context, ae = i.contextType, q = Lr, typeof ae == "object" && ae !== null && (q = ln(ae)), M = i.getDerivedStateFromProps, (ae = typeof M == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (x !== fe || ie !== q) && Wp(
        n,
        d,
        o,
        q
      ), xi = !1, ie = n.memoizedState, d.state = ie, Xl(n, o, d, f), $l();
      var oe = n.memoizedState;
      x !== fe || ie !== oe || xi || e !== null && e.dependencies !== null && fs(e.dependencies) ? (typeof M == "function" && (xf(
        n,
        i,
        M,
        o
      ), oe = n.memoizedState), (ue = xi || Jp(
        n,
        i,
        ue,
        o,
        ie,
        oe,
        q
      ) || e !== null && e.dependencies !== null && fs(e.dependencies)) ? (ae || typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function" || (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(o, oe, q), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(
        o,
        oe,
        q
      )), typeof d.componentDidUpdate == "function" && (n.flags |= 4), typeof d.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof d.componentDidUpdate != "function" || x === e.memoizedProps && ie === e.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && ie === e.memoizedState || (n.flags |= 1024), n.memoizedProps = o, n.memoizedState = oe), d.props = o, d.state = oe, d.context = q, o = ue) : (typeof d.componentDidUpdate != "function" || x === e.memoizedProps && ie === e.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && ie === e.memoizedState || (n.flags |= 1024), o = !1);
    }
    return d = o, Ds(e, n), o = (n.flags & 128) !== 0, d || o ? (d = n.stateNode, i = o && typeof i.getDerivedStateFromError != "function" ? null : d.render(), n.flags |= 1, e !== null && o ? (n.child = ir(
      n,
      e.child,
      null,
      f
    ), n.child = ir(
      n,
      null,
      i,
      f
    )) : on(e, n, i, f), n.memoizedState = d.state, e = n.child) : e = Ga(
      e,
      n,
      f
    ), e;
  }
  function mg(e, n, i, o) {
    return Ji(), n.flags |= 256, on(e, n, i, o), n.child;
  }
  var Nf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Rf(e) {
    return { baseLanes: e, cachePool: ap() };
  }
  function Cf(e, n, i) {
    return e = e !== null ? e.childLanes & ~i : 0, n && (e |= Bn), e;
  }
  function pg(e, n, i) {
    var o = n.pendingProps, f = !1, d = (n.flags & 128) !== 0, x;
    if ((x = d) || (x = e !== null && e.memoizedState === null ? !1 : (qt.current & 2) !== 0), x && (f = !0, n.flags &= -129), x = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (it) {
        if (f ? Ei(n) : _i(), (e = Tt) ? (e = E0(
          e,
          Fn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: gi !== null ? { id: Ea, overflow: _a } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Qm(e), i.return = n, n.child = i, rn = n, Tt = null)) : e = null, e === null) throw vi(n);
        return ud(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var M = o.children;
      return o = o.fallback, f ? (_i(), f = n.mode, M = As(
        { mode: "hidden", children: M },
        f
      ), o = Pi(
        o,
        f,
        i,
        null
      ), M.return = n, o.return = n, M.sibling = o, n.child = M, o = n.child, o.memoizedState = Rf(i), o.childLanes = Cf(
        e,
        x,
        i
      ), n.memoizedState = Nf, Fl(null, o)) : (Ei(n), Tf(n, M));
    }
    var q = e.memoizedState;
    if (q !== null && (M = q.dehydrated, M !== null)) {
      if (d)
        n.flags & 256 ? (Ei(n), n.flags &= -257, n = Mf(
          e,
          n,
          i
        )) : n.memoizedState !== null ? (_i(), n.child = e.child, n.flags |= 128, n = null) : (_i(), M = o.fallback, f = n.mode, o = As(
          { mode: "visible", children: o.children },
          f
        ), M = Pi(
          M,
          f,
          i,
          null
        ), M.flags |= 2, o.return = n, M.return = n, o.sibling = M, n.child = o, ir(
          n,
          e.child,
          null,
          i
        ), o = n.child, o.memoizedState = Rf(i), o.childLanes = Cf(
          e,
          x,
          i
        ), n.memoizedState = Nf, n = Fl(null, o));
      else if (Ei(n), ud(M)) {
        if (x = M.nextSibling && M.nextSibling.dataset, x) var ae = x.dgst;
        x = ae, o = Error(l(419)), o.stack = "", o.digest = x, Bl({ value: o, source: null, stack: null }), n = Mf(
          e,
          n,
          i
        );
      } else if (Zt || Ur(e, n, i, !1), x = (i & e.childLanes) !== 0, Zt || x) {
        if (x = Ct, x !== null && (o = U(x, i), o !== 0 && o !== q.retryLane))
          throw q.retryLane = o, Ki(e, o), Rn(x, e, o), Ef;
        sd(M) || Vs(), n = Mf(
          e,
          n,
          i
        );
      } else
        sd(M) ? (n.flags |= 192, n.child = e.child, n = null) : (e = q.treeContext, Tt = Pn(
          M.nextSibling
        ), rn = n, it = !0, yi = null, Fn = !1, e !== null && Pm(n, e), n = Tf(
          n,
          o.children
        ), n.flags |= 4096);
      return n;
    }
    return f ? (_i(), M = o.fallback, f = n.mode, q = e.child, ae = q.sibling, o = ka(q, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = q.subtreeFlags & 65011712, ae !== null ? M = ka(
      ae,
      M
    ) : (M = Pi(
      M,
      f,
      i,
      null
    ), M.flags |= 2), M.return = n, o.return = n, o.sibling = M, n.child = o, Fl(null, o), o = n.child, M = e.child.memoizedState, M === null ? M = Rf(i) : (f = M.cachePool, f !== null ? (q = Gt._currentValue, f = f.parent !== q ? { parent: q, pool: q } : f) : f = ap(), M = {
      baseLanes: M.baseLanes | i,
      cachePool: f
    }), o.memoizedState = M, o.childLanes = Cf(
      e,
      x,
      i
    ), n.memoizedState = Nf, Fl(e.child, o)) : (Ei(n), i = e.child, e = i.sibling, i = ka(i, {
      mode: "visible",
      children: o.children
    }), i.return = n, i.sibling = null, e !== null && (x = n.deletions, x === null ? (n.deletions = [e], n.flags |= 16) : x.push(e)), n.child = i, n.memoizedState = null, i);
  }
  function Tf(e, n) {
    return n = As(
      { mode: "visible", children: n },
      e.mode
    ), n.return = e, e.child = n;
  }
  function As(e, n) {
    return e = On(22, e, null, n), e.lanes = 0, e;
  }
  function Mf(e, n, i) {
    return ir(n, e.child, null, i), e = Tf(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function gg(e, n, i) {
    e.lanes |= n;
    var o = e.alternate;
    o !== null && (o.lanes |= n), $c(e.return, n, i);
  }
  function Df(e, n, i, o, f, d) {
    var x = e.memoizedState;
    x === null ? e.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: o,
      tail: i,
      tailMode: f,
      treeForkCount: d
    } : (x.isBackwards = n, x.rendering = null, x.renderingStartTime = 0, x.last = o, x.tail = i, x.tailMode = f, x.treeForkCount = d);
  }
  function yg(e, n, i) {
    var o = n.pendingProps, f = o.revealOrder, d = o.tail;
    o = o.children;
    var x = qt.current, M = (x & 2) !== 0;
    if (M ? (x = x & 1 | 2, n.flags |= 128) : x &= 1, F(qt, x), on(e, n, o, i), o = it ? Hl : 0, !M && e !== null && (e.flags & 128) !== 0)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && gg(e, i, n);
        else if (e.tag === 19)
          gg(e, i, n);
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
    switch (f) {
      case "forwards":
        for (i = n.child, f = null; i !== null; )
          e = i.alternate, e !== null && bs(e) === null && (f = i), i = i.sibling;
        i = f, i === null ? (f = n.child, n.child = null) : (f = i.sibling, i.sibling = null), Df(
          n,
          !1,
          f,
          i,
          d,
          o
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (i = null, f = n.child, n.child = null; f !== null; ) {
          if (e = f.alternate, e !== null && bs(e) === null) {
            n.child = f;
            break;
          }
          e = f.sibling, f.sibling = i, i = f, f = e;
        }
        Df(
          n,
          !0,
          i,
          null,
          d,
          o
        );
        break;
      case "together":
        Df(
          n,
          !1,
          null,
          null,
          void 0,
          o
        );
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function Ga(e, n, i) {
    if (e !== null && (n.dependencies = e.dependencies), Ci |= n.lanes, (i & n.childLanes) === 0)
      if (e !== null) {
        if (Ur(
          e,
          n,
          i,
          !1
        ), (i & n.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && n.child !== e.child)
      throw Error(l(153));
    if (n.child !== null) {
      for (e = n.child, i = ka(e, e.pendingProps), n.child = i, i.return = n; e.sibling !== null; )
        e = e.sibling, i = i.sibling = ka(e, e.pendingProps), i.return = n;
      i.sibling = null;
    }
    return n.child;
  }
  function Af(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && fs(e)));
  }
  function fS(e, n, i) {
    switch (n.tag) {
      case 3:
        W(n, n.stateNode.containerInfo), bi(n, Gt, e.memoizedState.cache), Ji();
        break;
      case 27:
      case 5:
        ze(n);
        break;
      case 4:
        W(n, n.stateNode.containerInfo);
        break;
      case 10:
        bi(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, tf(n), null;
        break;
      case 13:
        var o = n.memoizedState;
        if (o !== null)
          return o.dehydrated !== null ? (Ei(n), n.flags |= 128, null) : (i & n.child.childLanes) !== 0 ? pg(e, n, i) : (Ei(n), e = Ga(
            e,
            n,
            i
          ), e !== null ? e.sibling : null);
        Ei(n);
        break;
      case 19:
        var f = (e.flags & 128) !== 0;
        if (o = (i & n.childLanes) !== 0, o || (Ur(
          e,
          n,
          i,
          !1
        ), o = (i & n.childLanes) !== 0), f) {
          if (o)
            return yg(
              e,
              n,
              i
            );
          n.flags |= 128;
        }
        if (f = n.memoizedState, f !== null && (f.rendering = null, f.tail = null, f.lastEffect = null), F(qt, qt.current), o) break;
        return null;
      case 22:
        return n.lanes = 0, ug(
          e,
          n,
          i,
          n.pendingProps
        );
      case 24:
        bi(n, Gt, e.memoizedState.cache);
    }
    return Ga(e, n, i);
  }
  function vg(e, n, i) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        Zt = !0;
      else {
        if (!Af(e, i) && (n.flags & 128) === 0)
          return Zt = !1, fS(
            e,
            n,
            i
          );
        Zt = (e.flags & 131072) !== 0;
      }
    else
      Zt = !1, it && (n.flags & 1048576) !== 0 && Km(n, Hl, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var o = n.pendingProps;
          if (e = nr(n.elementType), n.type = e, typeof e == "function")
            jc(e) ? (o = lr(e, o), n.tag = 1, n = hg(
              null,
              n,
              e,
              o,
              i
            )) : (n.tag = 0, n = _f(
              null,
              n,
              e,
              o,
              i
            ));
          else {
            if (e != null) {
              var f = e.$$typeof;
              if (f === L) {
                n.tag = 11, n = lg(
                  null,
                  n,
                  e,
                  o,
                  i
                );
                break e;
              } else if (f === V) {
                n.tag = 14, n = og(
                  null,
                  n,
                  e,
                  o,
                  i
                );
                break e;
              }
            }
            throw n = j(e) || e, Error(l(306, n, ""));
          }
        }
        return n;
      case 0:
        return _f(
          e,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 1:
        return o = n.type, f = lr(
          o,
          n.pendingProps
        ), hg(
          e,
          n,
          o,
          f,
          i
        );
      case 3:
        e: {
          if (W(
            n,
            n.stateNode.containerInfo
          ), e === null) throw Error(l(387));
          o = n.pendingProps;
          var d = n.memoizedState;
          f = d.element, Kc(e, n), Xl(n, o, null, i);
          var x = n.memoizedState;
          if (o = x.cache, bi(n, Gt, o), o !== d.cache && Xc(
            n,
            [Gt],
            i,
            !0
          ), $l(), o = x.element, d.isDehydrated)
            if (d = {
              element: o,
              isDehydrated: !1,
              cache: x.cache
            }, n.updateQueue.baseState = d, n.memoizedState = d, n.flags & 256) {
              n = mg(
                e,
                n,
                o,
                i
              );
              break e;
            } else if (o !== f) {
              f = In(
                Error(l(424)),
                n
              ), Bl(f), n = mg(
                e,
                n,
                o,
                i
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
              for (Tt = Pn(e.firstChild), rn = n, it = !0, yi = null, Fn = !0, i = up(
                n,
                null,
                o,
                i
              ), n.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (Ji(), o === f) {
              n = Ga(
                e,
                n,
                i
              );
              break e;
            }
            on(e, n, o, i);
          }
          n = n.child;
        }
        return n;
      case 26:
        return Ds(e, n), e === null ? (i = M0(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = i : it || (i = n.type, e = n.pendingProps, o = Zs(
          he.current
        ).createElement(i), o[ve] = n, o[we] = e, sn(o, i, e), at(o), n.stateNode = o) : n.memoizedState = M0(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return ze(n), e === null && it && (o = n.stateNode = R0(
          n.type,
          n.pendingProps,
          he.current
        ), rn = n, Fn = !0, f = Tt, zi(n.type) ? (cd = f, Tt = Pn(o.firstChild)) : Tt = f), on(
          e,
          n,
          n.pendingProps.children,
          i
        ), Ds(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && it && ((f = o = Tt) && (o = qS(
          o,
          n.type,
          n.pendingProps,
          Fn
        ), o !== null ? (n.stateNode = o, rn = n, Tt = Pn(o.firstChild), Fn = !1, f = !0) : f = !1), f || vi(n)), ze(n), f = n.type, d = n.pendingProps, x = e !== null ? e.memoizedProps : null, o = d.children, rd(f, d) ? o = null : x !== null && rd(f, x) && (n.flags |= 32), n.memoizedState !== null && (f = af(
          e,
          n,
          nS,
          null,
          null,
          i
        ), co._currentValue = f), Ds(e, n), on(e, n, o, i), n.child;
      case 6:
        return e === null && it && ((e = i = Tt) && (i = YS(
          i,
          n.pendingProps,
          Fn
        ), i !== null ? (n.stateNode = i, rn = n, Tt = null, e = !0) : e = !1), e || vi(n)), null;
      case 13:
        return pg(e, n, i);
      case 4:
        return W(
          n,
          n.stateNode.containerInfo
        ), o = n.pendingProps, e === null ? n.child = ir(
          n,
          null,
          o,
          i
        ) : on(e, n, o, i), n.child;
      case 11:
        return lg(
          e,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 7:
        return on(
          e,
          n,
          n.pendingProps,
          i
        ), n.child;
      case 8:
        return on(
          e,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 12:
        return on(
          e,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 10:
        return o = n.pendingProps, bi(n, n.type, o.value), on(e, n, o.children, i), n.child;
      case 9:
        return f = n.type._context, o = n.pendingProps.children, er(n), f = ln(f), o = o(f), n.flags |= 1, on(e, n, o, i), n.child;
      case 14:
        return og(
          e,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 15:
        return sg(
          e,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 19:
        return yg(e, n, i);
      case 31:
        return cS(e, n, i);
      case 22:
        return ug(
          e,
          n,
          i,
          n.pendingProps
        );
      case 24:
        return er(n), o = ln(Gt), e === null ? (f = Zc(), f === null && (f = Ct, d = Gc(), f.pooledCache = d, d.refCount++, d !== null && (f.pooledCacheLanes |= i), f = d), n.memoizedState = { parent: o, cache: f }, Fc(n), bi(n, Gt, f)) : ((e.lanes & i) !== 0 && (Kc(e, n), Xl(n, null, null, i), $l()), f = e.memoizedState, d = n.memoizedState, f.parent !== o ? (f = { parent: o, cache: o }, n.memoizedState = f, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = f), bi(n, Gt, o)) : (o = d.cache, bi(n, Gt, o), o !== f.cache && Xc(
          n,
          [Gt],
          i,
          !0
        ))), on(
          e,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(l(156, n.tag));
  }
  function Ia(e) {
    e.flags |= 4;
  }
  function zf(e, n, i, o, f) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (f & 335544128) === f)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Gg()) e.flags |= 8192;
        else
          throw ar = ps, Qc;
    } else e.flags &= -16777217;
  }
  function bg(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !L0(n))
      if (Gg()) e.flags |= 8192;
      else
        throw ar = ps, Qc;
  }
  function zs(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? Vt() : 536870912, e.lanes |= n, Kr |= n);
  }
  function Kl(e, n) {
    if (!it)
      switch (e.tailMode) {
        case "hidden":
          n = e.tail;
          for (var i = null; n !== null; )
            n.alternate !== null && (i = n), n = n.sibling;
          i === null ? e.tail = null : i.sibling = null;
          break;
        case "collapsed":
          i = e.tail;
          for (var o = null; i !== null; )
            i.alternate !== null && (o = i), i = i.sibling;
          o === null ? n || e.tail === null ? e.tail = null : e.tail.sibling = null : o.sibling = null;
      }
  }
  function Mt(e) {
    var n = e.alternate !== null && e.alternate.child === e.child, i = 0, o = 0;
    if (n)
      for (var f = e.child; f !== null; )
        i |= f.lanes | f.childLanes, o |= f.subtreeFlags & 65011712, o |= f.flags & 65011712, f.return = e, f = f.sibling;
    else
      for (f = e.child; f !== null; )
        i |= f.lanes | f.childLanes, o |= f.subtreeFlags, o |= f.flags, f.return = e, f = f.sibling;
    return e.subtreeFlags |= o, e.childLanes = i, n;
  }
  function dS(e, n, i) {
    var o = n.pendingProps;
    switch (kc(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Mt(n), null;
      case 1:
        return Mt(n), null;
      case 3:
        return i = n.stateNode, o = null, e !== null && (o = e.memoizedState.cache), n.memoizedState.cache !== o && (n.flags |= 2048), Ya(Gt), ge(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (Br(n) ? Ia(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, qc())), Mt(n), null;
      case 26:
        var f = n.type, d = n.memoizedState;
        return e === null ? (Ia(n), d !== null ? (Mt(n), bg(n, d)) : (Mt(n), zf(
          n,
          f,
          null,
          o,
          i
        ))) : d ? d !== e.memoizedState ? (Ia(n), Mt(n), bg(n, d)) : (Mt(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== o && Ia(n), Mt(n), zf(
          n,
          f,
          e,
          o,
          i
        )), null;
      case 27:
        if (Ce(n), i = he.current, f = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== o && Ia(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(l(166));
            return Mt(n), null;
          }
          e = ee.current, Br(n) ? Jm(n) : (e = R0(f, o, i), n.stateNode = e, Ia(n));
        }
        return Mt(n), null;
      case 5:
        if (Ce(n), f = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== o && Ia(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(l(166));
            return Mt(n), null;
          }
          if (d = ee.current, Br(n))
            Jm(n);
          else {
            var x = Zs(
              he.current
            );
            switch (d) {
              case 1:
                d = x.createElementNS(
                  "http://www.w3.org/2000/svg",
                  f
                );
                break;
              case 2:
                d = x.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  f
                );
                break;
              default:
                switch (f) {
                  case "svg":
                    d = x.createElementNS(
                      "http://www.w3.org/2000/svg",
                      f
                    );
                    break;
                  case "math":
                    d = x.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      f
                    );
                    break;
                  case "script":
                    d = x.createElement("div"), d.innerHTML = "<script><\/script>", d = d.removeChild(
                      d.firstChild
                    );
                    break;
                  case "select":
                    d = typeof o.is == "string" ? x.createElement("select", {
                      is: o.is
                    }) : x.createElement("select"), o.multiple ? d.multiple = !0 : o.size && (d.size = o.size);
                    break;
                  default:
                    d = typeof o.is == "string" ? x.createElement(f, { is: o.is }) : x.createElement(f);
                }
            }
            d[ve] = n, d[we] = o;
            e: for (x = n.child; x !== null; ) {
              if (x.tag === 5 || x.tag === 6)
                d.appendChild(x.stateNode);
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
            n.stateNode = d;
            e: switch (sn(d, f, o), f) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                o = !!o.autoFocus;
                break e;
              case "img":
                o = !0;
                break e;
              default:
                o = !1;
            }
            o && Ia(n);
          }
        }
        return Mt(n), zf(
          n,
          n.type,
          e === null ? null : e.memoizedProps,
          n.pendingProps,
          i
        ), null;
      case 6:
        if (e && n.stateNode != null)
          e.memoizedProps !== o && Ia(n);
        else {
          if (typeof o != "string" && n.stateNode === null)
            throw Error(l(166));
          if (e = he.current, Br(n)) {
            if (e = n.stateNode, i = n.memoizedProps, o = null, f = rn, f !== null)
              switch (f.tag) {
                case 27:
                case 5:
                  o = f.memoizedProps;
              }
            e[ve] = n, e = !!(e.nodeValue === i || o !== null && o.suppressHydrationWarning === !0 || p0(e.nodeValue, i)), e || vi(n, !0);
          } else
            e = Zs(e).createTextNode(
              o
            ), e[ve] = n, n.stateNode = e;
        }
        return Mt(n), null;
      case 31:
        if (i = n.memoizedState, e === null || e.memoizedState !== null) {
          if (o = Br(n), i !== null) {
            if (e === null) {
              if (!o) throw Error(l(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(557));
              e[ve] = n;
            } else
              Ji(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Mt(n), e = !1;
          } else
            i = qc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), e = !0;
          if (!e)
            return n.flags & 256 ? (jn(n), n) : (jn(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(l(558));
        }
        return Mt(n), null;
      case 13:
        if (o = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (f = Br(n), o !== null && o.dehydrated !== null) {
            if (e === null) {
              if (!f) throw Error(l(318));
              if (f = n.memoizedState, f = f !== null ? f.dehydrated : null, !f) throw Error(l(317));
              f[ve] = n;
            } else
              Ji(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Mt(n), f = !1;
          } else
            f = qc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = f), f = !0;
          if (!f)
            return n.flags & 256 ? (jn(n), n) : (jn(n), null);
        }
        return jn(n), (n.flags & 128) !== 0 ? (n.lanes = i, n) : (i = o !== null, e = e !== null && e.memoizedState !== null, i && (o = n.child, f = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (f = o.alternate.memoizedState.cachePool.pool), d = null, o.memoizedState !== null && o.memoizedState.cachePool !== null && (d = o.memoizedState.cachePool.pool), d !== f && (o.flags |= 2048)), i !== e && i && (n.child.flags |= 8192), zs(n, n.updateQueue), Mt(n), null);
      case 4:
        return ge(), e === null && ed(n.stateNode.containerInfo), Mt(n), null;
      case 10:
        return Ya(n.type), Mt(n), null;
      case 19:
        if (k(qt), o = n.memoizedState, o === null) return Mt(n), null;
        if (f = (n.flags & 128) !== 0, d = o.rendering, d === null)
          if (f) Kl(o, !1);
          else {
            if (Ut !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (d = bs(e), d !== null) {
                  for (n.flags |= 128, Kl(o, !1), e = d.updateQueue, n.updateQueue = e, zs(n, e), n.subtreeFlags = 0, e = i, i = n.child; i !== null; )
                    Zm(i, e), i = i.sibling;
                  return F(
                    qt,
                    qt.current & 1 | 2
                  ), it && Va(n, o.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            o.tail !== null && Fe() > Bs && (n.flags |= 128, f = !0, Kl(o, !1), n.lanes = 4194304);
          }
        else {
          if (!f)
            if (e = bs(d), e !== null) {
              if (n.flags |= 128, f = !0, e = e.updateQueue, n.updateQueue = e, zs(n, e), Kl(o, !0), o.tail === null && o.tailMode === "hidden" && !d.alternate && !it)
                return Mt(n), null;
            } else
              2 * Fe() - o.renderingStartTime > Bs && i !== 536870912 && (n.flags |= 128, f = !0, Kl(o, !1), n.lanes = 4194304);
          o.isBackwards ? (d.sibling = n.child, n.child = d) : (e = o.last, e !== null ? e.sibling = d : n.child = d, o.last = d);
        }
        return o.tail !== null ? (e = o.tail, o.rendering = e, o.tail = e.sibling, o.renderingStartTime = Fe(), e.sibling = null, i = qt.current, F(
          qt,
          f ? i & 1 | 2 : i & 1
        ), it && Va(n, o.treeForkCount), e) : (Mt(n), null);
      case 22:
      case 23:
        return jn(n), ef(), o = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== o && (n.flags |= 8192) : o && (n.flags |= 8192), o ? (i & 536870912) !== 0 && (n.flags & 128) === 0 && (Mt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Mt(n), i = n.updateQueue, i !== null && zs(n, i.retryQueue), i = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), o = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (o = n.memoizedState.cachePool.pool), o !== i && (n.flags |= 2048), e !== null && k(tr), null;
      case 24:
        return i = null, e !== null && (i = e.memoizedState.cache), n.memoizedState.cache !== i && (n.flags |= 2048), Ya(Gt), Mt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(l(156, n.tag));
  }
  function hS(e, n) {
    switch (kc(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return Ya(Gt), ge(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Ce(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (jn(n), n.alternate === null)
            throw Error(l(340));
          Ji();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 13:
        if (jn(n), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(l(340));
          Ji();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return k(qt), null;
      case 4:
        return ge(), null;
      case 10:
        return Ya(n.type), null;
      case 22:
      case 23:
        return jn(n), ef(), e !== null && k(tr), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return Ya(Gt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function xg(e, n) {
    switch (kc(n), n.tag) {
      case 3:
        Ya(Gt), ge();
        break;
      case 26:
      case 27:
      case 5:
        Ce(n);
        break;
      case 4:
        ge();
        break;
      case 31:
        n.memoizedState !== null && jn(n);
        break;
      case 13:
        jn(n);
        break;
      case 19:
        k(qt);
        break;
      case 10:
        Ya(n.type);
        break;
      case 22:
      case 23:
        jn(n), ef(), e !== null && k(tr);
        break;
      case 24:
        Ya(Gt);
    }
  }
  function Pl(e, n) {
    try {
      var i = n.updateQueue, o = i !== null ? i.lastEffect : null;
      if (o !== null) {
        var f = o.next;
        i = f;
        do {
          if ((i.tag & e) === e) {
            o = void 0;
            var d = i.create, x = i.inst;
            o = d(), x.destroy = o;
          }
          i = i.next;
        } while (i !== f);
      }
    } catch (M) {
      wt(n, n.return, M);
    }
  }
  function Ni(e, n, i) {
    try {
      var o = n.updateQueue, f = o !== null ? o.lastEffect : null;
      if (f !== null) {
        var d = f.next;
        o = d;
        do {
          if ((o.tag & e) === e) {
            var x = o.inst, M = x.destroy;
            if (M !== void 0) {
              x.destroy = void 0, f = n;
              var q = i, ae = M;
              try {
                ae();
              } catch (ue) {
                wt(
                  f,
                  q,
                  ue
                );
              }
            }
          }
          o = o.next;
        } while (o !== d);
      }
    } catch (ue) {
      wt(n, n.return, ue);
    }
  }
  function wg(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var i = e.stateNode;
      try {
        fp(n, i);
      } catch (o) {
        wt(e, e.return, o);
      }
    }
  }
  function Sg(e, n, i) {
    i.props = lr(
      e.type,
      e.memoizedProps
    ), i.state = e.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (o) {
      wt(e, n, o);
    }
  }
  function Jl(e, n) {
    try {
      var i = e.ref;
      if (i !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var o = e.stateNode;
            break;
          case 30:
            o = e.stateNode;
            break;
          default:
            o = e.stateNode;
        }
        typeof i == "function" ? e.refCleanup = i(o) : i.current = o;
      }
    } catch (f) {
      wt(e, n, f);
    }
  }
  function Na(e, n) {
    var i = e.ref, o = e.refCleanup;
    if (i !== null)
      if (typeof o == "function")
        try {
          o();
        } catch (f) {
          wt(e, n, f);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (f) {
          wt(e, n, f);
        }
      else i.current = null;
  }
  function Eg(e) {
    var n = e.type, i = e.memoizedProps, o = e.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          i.autoFocus && o.focus();
          break e;
        case "img":
          i.src ? o.src = i.src : i.srcSet && (o.srcset = i.srcSet);
      }
    } catch (f) {
      wt(e, e.return, f);
    }
  }
  function Of(e, n, i) {
    try {
      var o = e.stateNode;
      jS(o, e.type, i, n), o[we] = n;
    } catch (f) {
      wt(e, e.return, f);
    }
  }
  function _g(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && zi(e.type) || e.tag === 4;
  }
  function Lf(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || _g(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && zi(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function jf(e, n, i) {
    var o = e.tag;
    if (o === 5 || o === 6)
      e = e.stateNode, n ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(e, n) : (n = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, n.appendChild(e), i = i._reactRootContainer, i != null || n.onclick !== null || (n.onclick = Ba));
    else if (o !== 4 && (o === 27 && zi(e.type) && (i = e.stateNode, n = null), e = e.child, e !== null))
      for (jf(e, n, i), e = e.sibling; e !== null; )
        jf(e, n, i), e = e.sibling;
  }
  function Os(e, n, i) {
    var o = e.tag;
    if (o === 5 || o === 6)
      e = e.stateNode, n ? i.insertBefore(e, n) : i.appendChild(e);
    else if (o !== 4 && (o === 27 && zi(e.type) && (i = e.stateNode), e = e.child, e !== null))
      for (Os(e, n, i), e = e.sibling; e !== null; )
        Os(e, n, i), e = e.sibling;
  }
  function Ng(e) {
    var n = e.stateNode, i = e.memoizedProps;
    try {
      for (var o = e.type, f = n.attributes; f.length; )
        n.removeAttributeNode(f[0]);
      sn(n, o, i), n[ve] = e, n[we] = i;
    } catch (d) {
      wt(e, e.return, d);
    }
  }
  var Za = !1, Qt = !1, Hf = !1, Rg = typeof WeakSet == "function" ? WeakSet : Set, en = null;
  function mS(e, n) {
    if (e = e.containerInfo, ad = eu, e = Um(e), Tc(e)) {
      if ("selectionStart" in e)
        var i = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          i = (i = e.ownerDocument) && i.defaultView || window;
          var o = i.getSelection && i.getSelection();
          if (o && o.rangeCount !== 0) {
            i = o.anchorNode;
            var f = o.anchorOffset, d = o.focusNode;
            o = o.focusOffset;
            try {
              i.nodeType, d.nodeType;
            } catch {
              i = null;
              break e;
            }
            var x = 0, M = -1, q = -1, ae = 0, ue = 0, fe = e, ie = null;
            t: for (; ; ) {
              for (var oe; fe !== i || f !== 0 && fe.nodeType !== 3 || (M = x + f), fe !== d || o !== 0 && fe.nodeType !== 3 || (q = x + o), fe.nodeType === 3 && (x += fe.nodeValue.length), (oe = fe.firstChild) !== null; )
                ie = fe, fe = oe;
              for (; ; ) {
                if (fe === e) break t;
                if (ie === i && ++ae === f && (M = x), ie === d && ++ue === o && (q = x), (oe = fe.nextSibling) !== null) break;
                fe = ie, ie = fe.parentNode;
              }
              fe = oe;
            }
            i = M === -1 || q === -1 ? null : { start: M, end: q };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (id = { focusedElem: e, selectionRange: i }, eu = !1, en = n; en !== null; )
      if (n = en, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = n, en = e;
      else
        for (; en !== null; ) {
          switch (n = en, d = n.alternate, e = n.flags, n.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = n.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (i = 0; i < e.length; i++)
                  f = e[i], f.ref.impl = f.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && d !== null) {
                e = void 0, i = n, f = d.memoizedProps, d = d.memoizedState, o = i.stateNode;
                try {
                  var _e = lr(
                    i.type,
                    f
                  );
                  e = o.getSnapshotBeforeUpdate(
                    _e,
                    d
                  ), o.__reactInternalSnapshotBeforeUpdate = e;
                } catch (je) {
                  wt(
                    i,
                    i.return,
                    je
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = n.stateNode.containerInfo, i = e.nodeType, i === 9)
                  od(e);
                else if (i === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      od(e);
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
              if ((e & 1024) !== 0) throw Error(l(163));
          }
          if (e = n.sibling, e !== null) {
            e.return = n.return, en = e;
            break;
          }
          en = n.return;
        }
  }
  function Cg(e, n, i) {
    var o = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        Fa(e, i), o & 4 && Pl(5, i);
        break;
      case 1:
        if (Fa(e, i), o & 4)
          if (e = i.stateNode, n === null)
            try {
              e.componentDidMount();
            } catch (x) {
              wt(i, i.return, x);
            }
          else {
            var f = lr(
              i.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              e.componentDidUpdate(
                f,
                n,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (x) {
              wt(
                i,
                i.return,
                x
              );
            }
          }
        o & 64 && wg(i), o & 512 && Jl(i, i.return);
        break;
      case 3:
        if (Fa(e, i), o & 64 && (e = i.updateQueue, e !== null)) {
          if (n = null, i.child !== null)
            switch (i.child.tag) {
              case 27:
              case 5:
                n = i.child.stateNode;
                break;
              case 1:
                n = i.child.stateNode;
            }
          try {
            fp(e, n);
          } catch (x) {
            wt(i, i.return, x);
          }
        }
        break;
      case 27:
        n === null && o & 4 && Ng(i);
      case 26:
      case 5:
        Fa(e, i), n === null && o & 4 && Eg(i), o & 512 && Jl(i, i.return);
        break;
      case 12:
        Fa(e, i);
        break;
      case 31:
        Fa(e, i), o & 4 && Dg(e, i);
        break;
      case 13:
        Fa(e, i), o & 4 && Ag(e, i), o & 64 && (e = i.memoizedState, e !== null && (e = e.dehydrated, e !== null && (i = ES.bind(
          null,
          i
        ), $S(e, i))));
        break;
      case 22:
        if (o = i.memoizedState !== null || Za, !o) {
          n = n !== null && n.memoizedState !== null || Qt, f = Za;
          var d = Qt;
          Za = o, (Qt = n) && !d ? Ka(
            e,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : Fa(e, i), Za = f, Qt = d;
        }
        break;
      case 30:
        break;
      default:
        Fa(e, i);
    }
  }
  function Tg(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, Tg(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && rt(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Dt = null, Sn = !1;
  function Qa(e, n, i) {
    for (i = i.child; i !== null; )
      Mg(e, n, i), i = i.sibling;
  }
  function Mg(e, n, i) {
    if (Kt && typeof Kt.onCommitFiberUnmount == "function")
      try {
        Kt.onCommitFiberUnmount(tn, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        Qt || Na(i, n), Qa(
          e,
          n,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        Qt || Na(i, n);
        var o = Dt, f = Sn;
        zi(i.type) && (Dt = i.stateNode, Sn = !1), Qa(
          e,
          n,
          i
        ), oo(i.stateNode), Dt = o, Sn = f;
        break;
      case 5:
        Qt || Na(i, n);
      case 6:
        if (o = Dt, f = Sn, Dt = null, Qa(
          e,
          n,
          i
        ), Dt = o, Sn = f, Dt !== null)
          if (Sn)
            try {
              (Dt.nodeType === 9 ? Dt.body : Dt.nodeName === "HTML" ? Dt.ownerDocument.body : Dt).removeChild(i.stateNode);
            } catch (d) {
              wt(
                i,
                n,
                d
              );
            }
          else
            try {
              Dt.removeChild(i.stateNode);
            } catch (d) {
              wt(
                i,
                n,
                d
              );
            }
        break;
      case 18:
        Dt !== null && (Sn ? (e = Dt, w0(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          i.stateNode
        ), il(e)) : w0(Dt, i.stateNode));
        break;
      case 4:
        o = Dt, f = Sn, Dt = i.stateNode.containerInfo, Sn = !0, Qa(
          e,
          n,
          i
        ), Dt = o, Sn = f;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ni(2, i, n), Qt || Ni(4, i, n), Qa(
          e,
          n,
          i
        );
        break;
      case 1:
        Qt || (Na(i, n), o = i.stateNode, typeof o.componentWillUnmount == "function" && Sg(
          i,
          n,
          o
        )), Qa(
          e,
          n,
          i
        );
        break;
      case 21:
        Qa(
          e,
          n,
          i
        );
        break;
      case 22:
        Qt = (o = Qt) || i.memoizedState !== null, Qa(
          e,
          n,
          i
        ), Qt = o;
        break;
      default:
        Qa(
          e,
          n,
          i
        );
    }
  }
  function Dg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        il(e);
      } catch (i) {
        wt(n, n.return, i);
      }
    }
  }
  function Ag(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        il(e);
      } catch (i) {
        wt(n, n.return, i);
      }
  }
  function pS(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new Rg()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new Rg()), n;
      default:
        throw Error(l(435, e.tag));
    }
  }
  function Ls(e, n) {
    var i = pS(e);
    n.forEach(function(o) {
      if (!i.has(o)) {
        i.add(o);
        var f = _S.bind(null, e, o);
        o.then(f, f);
      }
    });
  }
  function En(e, n) {
    var i = n.deletions;
    if (i !== null)
      for (var o = 0; o < i.length; o++) {
        var f = i[o], d = e, x = n, M = x;
        e: for (; M !== null; ) {
          switch (M.tag) {
            case 27:
              if (zi(M.type)) {
                Dt = M.stateNode, Sn = !1;
                break e;
              }
              break;
            case 5:
              Dt = M.stateNode, Sn = !1;
              break e;
            case 3:
            case 4:
              Dt = M.stateNode.containerInfo, Sn = !0;
              break e;
          }
          M = M.return;
        }
        if (Dt === null) throw Error(l(160));
        Mg(d, x, f), Dt = null, Sn = !1, d = f.alternate, d !== null && (d.return = null), f.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        zg(n, e), n = n.sibling;
  }
  var ca = null;
  function zg(e, n) {
    var i = e.alternate, o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        En(n, e), _n(e), o & 4 && (Ni(3, e, e.return), Pl(3, e), Ni(5, e, e.return));
        break;
      case 1:
        En(n, e), _n(e), o & 512 && (Qt || i === null || Na(i, i.return)), o & 64 && Za && (e = e.updateQueue, e !== null && (o = e.callbacks, o !== null && (i = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = i === null ? o : i.concat(o))));
        break;
      case 26:
        var f = ca;
        if (En(n, e), _n(e), o & 512 && (Qt || i === null || Na(i, i.return)), o & 4) {
          var d = i !== null ? i.memoizedState : null;
          if (o = e.memoizedState, i === null)
            if (o === null)
              if (e.stateNode === null) {
                e: {
                  o = e.type, i = e.memoizedProps, f = f.ownerDocument || f;
                  t: switch (o) {
                    case "title":
                      d = f.getElementsByTagName("title")[0], (!d || d[Ge] || d[ve] || d.namespaceURI === "http://www.w3.org/2000/svg" || d.hasAttribute("itemprop")) && (d = f.createElement(o), f.head.insertBefore(
                        d,
                        f.querySelector("head > title")
                      )), sn(d, o, i), d[ve] = e, at(d), o = d;
                      break e;
                    case "link":
                      var x = z0(
                        "link",
                        "href",
                        f
                      ).get(o + (i.href || ""));
                      if (x) {
                        for (var M = 0; M < x.length; M++)
                          if (d = x[M], d.getAttribute("href") === (i.href == null || i.href === "" ? null : i.href) && d.getAttribute("rel") === (i.rel == null ? null : i.rel) && d.getAttribute("title") === (i.title == null ? null : i.title) && d.getAttribute("crossorigin") === (i.crossOrigin == null ? null : i.crossOrigin)) {
                            x.splice(M, 1);
                            break t;
                          }
                      }
                      d = f.createElement(o), sn(d, o, i), f.head.appendChild(d);
                      break;
                    case "meta":
                      if (x = z0(
                        "meta",
                        "content",
                        f
                      ).get(o + (i.content || ""))) {
                        for (M = 0; M < x.length; M++)
                          if (d = x[M], d.getAttribute("content") === (i.content == null ? null : "" + i.content) && d.getAttribute("name") === (i.name == null ? null : i.name) && d.getAttribute("property") === (i.property == null ? null : i.property) && d.getAttribute("http-equiv") === (i.httpEquiv == null ? null : i.httpEquiv) && d.getAttribute("charset") === (i.charSet == null ? null : i.charSet)) {
                            x.splice(M, 1);
                            break t;
                          }
                      }
                      d = f.createElement(o), sn(d, o, i), f.head.appendChild(d);
                      break;
                    default:
                      throw Error(l(468, o));
                  }
                  d[ve] = e, at(d), o = d;
                }
                e.stateNode = o;
              } else
                O0(
                  f,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = A0(
                f,
                o,
                e.memoizedProps
              );
          else
            d !== o ? (d === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : d.count--, o === null ? O0(
              f,
              e.type,
              e.stateNode
            ) : A0(
              f,
              o,
              e.memoizedProps
            )) : o === null && e.stateNode !== null && Of(
              e,
              e.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        En(n, e), _n(e), o & 512 && (Qt || i === null || Na(i, i.return)), i !== null && o & 4 && Of(
          e,
          e.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (En(n, e), _n(e), o & 512 && (Qt || i === null || Na(i, i.return)), e.flags & 32) {
          f = e.stateNode;
          try {
            Cr(f, "");
          } catch (_e) {
            wt(e, e.return, _e);
          }
        }
        o & 4 && e.stateNode != null && (f = e.memoizedProps, Of(
          e,
          f,
          i !== null ? i.memoizedProps : f
        )), o & 1024 && (Hf = !0);
        break;
      case 6:
        if (En(n, e), _n(e), o & 4) {
          if (e.stateNode === null)
            throw Error(l(162));
          o = e.memoizedProps, i = e.stateNode;
          try {
            i.nodeValue = o;
          } catch (_e) {
            wt(e, e.return, _e);
          }
        }
        break;
      case 3:
        if (Ks = null, f = ca, ca = Qs(n.containerInfo), En(n, e), ca = f, _n(e), o & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            il(n.containerInfo);
          } catch (_e) {
            wt(e, e.return, _e);
          }
        Hf && (Hf = !1, Og(e));
        break;
      case 4:
        o = ca, ca = Qs(
          e.stateNode.containerInfo
        ), En(n, e), _n(e), ca = o;
        break;
      case 12:
        En(n, e), _n(e);
        break;
      case 31:
        En(n, e), _n(e), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, Ls(e, o)));
        break;
      case 13:
        En(n, e), _n(e), e.child.flags & 8192 && e.memoizedState !== null != (i !== null && i.memoizedState !== null) && (Hs = Fe()), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, Ls(e, o)));
        break;
      case 22:
        f = e.memoizedState !== null;
        var q = i !== null && i.memoizedState !== null, ae = Za, ue = Qt;
        if (Za = ae || f, Qt = ue || q, En(n, e), Qt = ue, Za = ae, _n(e), o & 8192)
          e: for (n = e.stateNode, n._visibility = f ? n._visibility & -2 : n._visibility | 1, f && (i === null || q || Za || Qt || or(e)), i = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (i === null) {
                q = i = n;
                try {
                  if (d = q.stateNode, f)
                    x = d.style, typeof x.setProperty == "function" ? x.setProperty("display", "none", "important") : x.display = "none";
                  else {
                    M = q.stateNode;
                    var fe = q.memoizedProps.style, ie = fe != null && fe.hasOwnProperty("display") ? fe.display : null;
                    M.style.display = ie == null || typeof ie == "boolean" ? "" : ("" + ie).trim();
                  }
                } catch (_e) {
                  wt(q, q.return, _e);
                }
              }
            } else if (n.tag === 6) {
              if (i === null) {
                q = n;
                try {
                  q.stateNode.nodeValue = f ? "" : q.memoizedProps;
                } catch (_e) {
                  wt(q, q.return, _e);
                }
              }
            } else if (n.tag === 18) {
              if (i === null) {
                q = n;
                try {
                  var oe = q.stateNode;
                  f ? S0(oe, !0) : S0(q.stateNode, !1);
                } catch (_e) {
                  wt(q, q.return, _e);
                }
              }
            } else if ((n.tag !== 22 && n.tag !== 23 || n.memoizedState === null || n === e) && n.child !== null) {
              n.child.return = n, n = n.child;
              continue;
            }
            if (n === e) break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === e) break e;
              i === n && (i = null), n = n.return;
            }
            i === n && (i = null), n.sibling.return = n.return, n = n.sibling;
          }
        o & 4 && (o = e.updateQueue, o !== null && (i = o.retryQueue, i !== null && (o.retryQueue = null, Ls(e, i))));
        break;
      case 19:
        En(n, e), _n(e), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, Ls(e, o)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        En(n, e), _n(e);
    }
  }
  function _n(e) {
    var n = e.flags;
    if (n & 2) {
      try {
        for (var i, o = e.return; o !== null; ) {
          if (_g(o)) {
            i = o;
            break;
          }
          o = o.return;
        }
        if (i == null) throw Error(l(160));
        switch (i.tag) {
          case 27:
            var f = i.stateNode, d = Lf(e);
            Os(e, d, f);
            break;
          case 5:
            var x = i.stateNode;
            i.flags & 32 && (Cr(x, ""), i.flags &= -33);
            var M = Lf(e);
            Os(e, M, x);
            break;
          case 3:
          case 4:
            var q = i.stateNode.containerInfo, ae = Lf(e);
            jf(
              e,
              ae,
              q
            );
            break;
          default:
            throw Error(l(161));
        }
      } catch (ue) {
        wt(e, e.return, ue);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function Og(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        Og(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function Fa(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Cg(e, n.alternate, n), n = n.sibling;
  }
  function or(e) {
    for (e = e.child; e !== null; ) {
      var n = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ni(4, n, n.return), or(n);
          break;
        case 1:
          Na(n, n.return);
          var i = n.stateNode;
          typeof i.componentWillUnmount == "function" && Sg(
            n,
            n.return,
            i
          ), or(n);
          break;
        case 27:
          oo(n.stateNode);
        case 26:
        case 5:
          Na(n, n.return), or(n);
          break;
        case 22:
          n.memoizedState === null && or(n);
          break;
        case 30:
          or(n);
          break;
        default:
          or(n);
      }
      e = e.sibling;
    }
  }
  function Ka(e, n, i) {
    for (i = i && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var o = n.alternate, f = e, d = n, x = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          Ka(
            f,
            d,
            i
          ), Pl(4, d);
          break;
        case 1:
          if (Ka(
            f,
            d,
            i
          ), o = d, f = o.stateNode, typeof f.componentDidMount == "function")
            try {
              f.componentDidMount();
            } catch (ae) {
              wt(o, o.return, ae);
            }
          if (o = d, f = o.updateQueue, f !== null) {
            var M = o.stateNode;
            try {
              var q = f.shared.hiddenCallbacks;
              if (q !== null)
                for (f.shared.hiddenCallbacks = null, f = 0; f < q.length; f++)
                  cp(q[f], M);
            } catch (ae) {
              wt(o, o.return, ae);
            }
          }
          i && x & 64 && wg(d), Jl(d, d.return);
          break;
        case 27:
          Ng(d);
        case 26:
        case 5:
          Ka(
            f,
            d,
            i
          ), i && o === null && x & 4 && Eg(d), Jl(d, d.return);
          break;
        case 12:
          Ka(
            f,
            d,
            i
          );
          break;
        case 31:
          Ka(
            f,
            d,
            i
          ), i && x & 4 && Dg(f, d);
          break;
        case 13:
          Ka(
            f,
            d,
            i
          ), i && x & 4 && Ag(f, d);
          break;
        case 22:
          d.memoizedState === null && Ka(
            f,
            d,
            i
          ), Jl(d, d.return);
          break;
        case 30:
          break;
        default:
          Ka(
            f,
            d,
            i
          );
      }
      n = n.sibling;
    }
  }
  function Bf(e, n) {
    var i = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== i && (e != null && e.refCount++, i != null && Ul(i));
  }
  function Uf(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && Ul(e));
  }
  function fa(e, n, i, o) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        Lg(
          e,
          n,
          i,
          o
        ), n = n.sibling;
  }
  function Lg(e, n, i, o) {
    var f = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        fa(
          e,
          n,
          i,
          o
        ), f & 2048 && Pl(9, n);
        break;
      case 1:
        fa(
          e,
          n,
          i,
          o
        );
        break;
      case 3:
        fa(
          e,
          n,
          i,
          o
        ), f & 2048 && (e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && Ul(e)));
        break;
      case 12:
        if (f & 2048) {
          fa(
            e,
            n,
            i,
            o
          ), e = n.stateNode;
          try {
            var d = n.memoizedProps, x = d.id, M = d.onPostCommit;
            typeof M == "function" && M(
              x,
              n.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (q) {
            wt(n, n.return, q);
          }
        } else
          fa(
            e,
            n,
            i,
            o
          );
        break;
      case 31:
        fa(
          e,
          n,
          i,
          o
        );
        break;
      case 13:
        fa(
          e,
          n,
          i,
          o
        );
        break;
      case 23:
        break;
      case 22:
        d = n.stateNode, x = n.alternate, n.memoizedState !== null ? d._visibility & 2 ? fa(
          e,
          n,
          i,
          o
        ) : Wl(e, n) : d._visibility & 2 ? fa(
          e,
          n,
          i,
          o
        ) : (d._visibility |= 2, Zr(
          e,
          n,
          i,
          o,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), f & 2048 && Bf(x, n);
        break;
      case 24:
        fa(
          e,
          n,
          i,
          o
        ), f & 2048 && Uf(n.alternate, n);
        break;
      default:
        fa(
          e,
          n,
          i,
          o
        );
    }
  }
  function Zr(e, n, i, o, f) {
    for (f = f && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var d = e, x = n, M = i, q = o, ae = x.flags;
      switch (x.tag) {
        case 0:
        case 11:
        case 15:
          Zr(
            d,
            x,
            M,
            q,
            f
          ), Pl(8, x);
          break;
        case 23:
          break;
        case 22:
          var ue = x.stateNode;
          x.memoizedState !== null ? ue._visibility & 2 ? Zr(
            d,
            x,
            M,
            q,
            f
          ) : Wl(
            d,
            x
          ) : (ue._visibility |= 2, Zr(
            d,
            x,
            M,
            q,
            f
          )), f && ae & 2048 && Bf(
            x.alternate,
            x
          );
          break;
        case 24:
          Zr(
            d,
            x,
            M,
            q,
            f
          ), f && ae & 2048 && Uf(x.alternate, x);
          break;
        default:
          Zr(
            d,
            x,
            M,
            q,
            f
          );
      }
      n = n.sibling;
    }
  }
  function Wl(e, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var i = e, o = n, f = o.flags;
        switch (o.tag) {
          case 22:
            Wl(i, o), f & 2048 && Bf(
              o.alternate,
              o
            );
            break;
          case 24:
            Wl(i, o), f & 2048 && Uf(o.alternate, o);
            break;
          default:
            Wl(i, o);
        }
        n = n.sibling;
      }
  }
  var eo = 8192;
  function Qr(e, n, i) {
    if (e.subtreeFlags & eo)
      for (e = e.child; e !== null; )
        jg(
          e,
          n,
          i
        ), e = e.sibling;
  }
  function jg(e, n, i) {
    switch (e.tag) {
      case 26:
        Qr(
          e,
          n,
          i
        ), e.flags & eo && e.memoizedState !== null && tE(
          i,
          ca,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Qr(
          e,
          n,
          i
        );
        break;
      case 3:
      case 4:
        var o = ca;
        ca = Qs(e.stateNode.containerInfo), Qr(
          e,
          n,
          i
        ), ca = o;
        break;
      case 22:
        e.memoizedState === null && (o = e.alternate, o !== null && o.memoizedState !== null ? (o = eo, eo = 16777216, Qr(
          e,
          n,
          i
        ), eo = o) : Qr(
          e,
          n,
          i
        ));
        break;
      default:
        Qr(
          e,
          n,
          i
        );
    }
  }
  function Hg(e) {
    var n = e.alternate;
    if (n !== null && (e = n.child, e !== null)) {
      n.child = null;
      do
        n = e.sibling, e.sibling = null, e = n;
      while (e !== null);
    }
  }
  function to(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          en = o, Ug(
            o,
            e
          );
        }
      Hg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Bg(e), e = e.sibling;
  }
  function Bg(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        to(e), e.flags & 2048 && Ni(9, e, e.return);
        break;
      case 3:
        to(e);
        break;
      case 12:
        to(e);
        break;
      case 22:
        var n = e.stateNode;
        e.memoizedState !== null && n._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (n._visibility &= -3, js(e)) : to(e);
        break;
      default:
        to(e);
    }
  }
  function js(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          en = o, Ug(
            o,
            e
          );
        }
      Hg(e);
    }
    for (e = e.child; e !== null; ) {
      switch (n = e, n.tag) {
        case 0:
        case 11:
        case 15:
          Ni(8, n, n.return), js(n);
          break;
        case 22:
          i = n.stateNode, i._visibility & 2 && (i._visibility &= -3, js(n));
          break;
        default:
          js(n);
      }
      e = e.sibling;
    }
  }
  function Ug(e, n) {
    for (; en !== null; ) {
      var i = en;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Ni(8, i, n);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var o = i.memoizedState.cachePool.pool;
            o != null && o.refCount++;
          }
          break;
        case 24:
          Ul(i.memoizedState.cache);
      }
      if (o = i.child, o !== null) o.return = i, en = o;
      else
        e: for (i = e; en !== null; ) {
          o = en;
          var f = o.sibling, d = o.return;
          if (Tg(o), o === i) {
            en = null;
            break e;
          }
          if (f !== null) {
            f.return = d, en = f;
            break e;
          }
          en = d;
        }
    }
  }
  var gS = {
    getCacheForType: function(e) {
      var n = ln(Gt), i = n.data.get(e);
      return i === void 0 && (i = e(), n.data.set(e, i)), i;
    },
    cacheSignal: function() {
      return ln(Gt).controller.signal;
    }
  }, yS = typeof WeakMap == "function" ? WeakMap : Map, ht = 0, Ct = null, Ke = null, et = 0, xt = 0, Hn = null, Ri = !1, Fr = !1, kf = !1, Pa = 0, Ut = 0, Ci = 0, sr = 0, Vf = 0, Bn = 0, Kr = 0, no = null, Nn = null, qf = !1, Hs = 0, kg = 0, Bs = 1 / 0, Us = null, Ti = null, Jt = 0, Mi = null, Pr = null, Ja = 0, Yf = 0, $f = null, Vg = null, ao = 0, Xf = null;
  function Un() {
    return (ht & 2) !== 0 && et !== 0 ? et & -et : C.T !== null ? Kf() : de();
  }
  function qg() {
    if (Bn === 0)
      if ((et & 536870912) === 0 || it) {
        var e = Mn;
        Mn <<= 1, (Mn & 3932160) === 0 && (Mn = 262144), Bn = e;
      } else Bn = 536870912;
    return e = Ln.current, e !== null && (e.flags |= 32), Bn;
  }
  function Rn(e, n, i) {
    (e === Ct && (xt === 2 || xt === 9) || e.cancelPendingCommit !== null) && (Jr(e, 0), Di(
      e,
      et,
      Bn,
      !1
    )), pt(e, i), ((ht & 2) === 0 || e !== Ct) && (e === Ct && ((ht & 2) === 0 && (sr |= i), Ut === 4 && Di(
      e,
      et,
      Bn,
      !1
    )), Ra(e));
  }
  function Yg(e, n, i) {
    if ((ht & 6) !== 0) throw Error(l(327));
    var o = !i && (n & 127) === 0 && (n & e.expiredLanes) === 0 || vt(e, n), f = o ? xS(e, n) : If(e, n, !0), d = o;
    do {
      if (f === 0) {
        Fr && !o && Di(e, n, 0, !1);
        break;
      } else {
        if (i = e.current.alternate, d && !vS(i)) {
          f = If(e, n, !1), d = !1;
          continue;
        }
        if (f === 2) {
          if (d = n, e.errorRecoveryDisabledLanes & d)
            var x = 0;
          else
            x = e.pendingLanes & -536870913, x = x !== 0 ? x : x & 536870912 ? 536870912 : 0;
          if (x !== 0) {
            n = x;
            e: {
              var M = e;
              f = no;
              var q = M.current.memoizedState.isDehydrated;
              if (q && (Jr(M, x).flags |= 256), x = If(
                M,
                x,
                !1
              ), x !== 2) {
                if (kf && !q) {
                  M.errorRecoveryDisabledLanes |= d, sr |= d, f = 4;
                  break e;
                }
                d = Nn, Nn = f, d !== null && (Nn === null ? Nn = d : Nn.push.apply(
                  Nn,
                  d
                ));
              }
              f = x;
            }
            if (d = !1, f !== 2) continue;
          }
        }
        if (f === 1) {
          Jr(e, 0), Di(e, n, 0, !0);
          break;
        }
        e: {
          switch (o = e, d = f, d) {
            case 0:
            case 1:
              throw Error(l(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              Di(
                o,
                n,
                Bn,
                !Ri
              );
              break e;
            case 2:
              Nn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(l(329));
          }
          if ((n & 62914560) === n && (f = Hs + 300 - Fe(), 10 < f)) {
            if (Di(
              o,
              n,
              Bn,
              !Ri
            ), He(o, 0, !0) !== 0) break e;
            Ja = n, o.timeoutHandle = b0(
              $g.bind(
                null,
                o,
                i,
                Nn,
                Us,
                qf,
                n,
                Bn,
                sr,
                Kr,
                Ri,
                d,
                "Throttled",
                -0,
                0
              ),
              f
            );
            break e;
          }
          $g(
            o,
            i,
            Nn,
            Us,
            qf,
            n,
            Bn,
            sr,
            Kr,
            Ri,
            d,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Ra(e);
  }
  function $g(e, n, i, o, f, d, x, M, q, ae, ue, fe, ie, oe) {
    if (e.timeoutHandle = -1, fe = n.subtreeFlags, fe & 8192 || (fe & 16785408) === 16785408) {
      fe = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ba
      }, jg(
        n,
        d,
        fe
      );
      var _e = (d & 62914560) === d ? Hs - Fe() : (d & 4194048) === d ? kg - Fe() : 0;
      if (_e = nE(
        fe,
        _e
      ), _e !== null) {
        Ja = d, e.cancelPendingCommit = _e(
          Pg.bind(
            null,
            e,
            n,
            d,
            i,
            o,
            f,
            x,
            M,
            q,
            ue,
            fe,
            null,
            ie,
            oe
          )
        ), Di(e, d, x, !ae);
        return;
      }
    }
    Pg(
      e,
      n,
      d,
      i,
      o,
      f,
      x,
      M,
      q
    );
  }
  function vS(e) {
    for (var n = e; ; ) {
      var i = n.tag;
      if ((i === 0 || i === 11 || i === 15) && n.flags & 16384 && (i = n.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var o = 0; o < i.length; o++) {
          var f = i[o], d = f.getSnapshot;
          f = f.value;
          try {
            if (!zn(d(), f)) return !1;
          } catch {
            return !1;
          }
        }
      if (i = n.child, n.subtreeFlags & 16384 && i !== null)
        i.return = n, n = i;
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
  function Di(e, n, i, o) {
    n &= ~Vf, n &= ~sr, e.suspendedLanes |= n, e.pingedLanes &= ~n, o && (e.warmLanes |= n), o = e.expirationTimes;
    for (var f = n; 0 < f; ) {
      var d = 31 - kt(f), x = 1 << d;
      o[d] = -1, f &= ~x;
    }
    i !== 0 && la(e, i, n);
  }
  function ks() {
    return (ht & 6) === 0 ? (io(0), !1) : !0;
  }
  function Gf() {
    if (Ke !== null) {
      if (xt === 0)
        var e = Ke.return;
      else
        e = Ke, qa = Wi = null, of(e), Yr = null, Vl = 0, e = Ke;
      for (; e !== null; )
        xg(e.alternate, e), e = e.return;
      Ke = null;
    }
  }
  function Jr(e, n) {
    var i = e.timeoutHandle;
    i !== -1 && (e.timeoutHandle = -1, US(i)), i = e.cancelPendingCommit, i !== null && (e.cancelPendingCommit = null, i()), Ja = 0, Gf(), Ct = e, Ke = i = ka(e.current, null), et = n, xt = 0, Hn = null, Ri = !1, Fr = vt(e, n), kf = !1, Kr = Bn = Vf = sr = Ci = Ut = 0, Nn = no = null, qf = !1, (n & 8) !== 0 && (n |= n & 32);
    var o = e.entangledLanes;
    if (o !== 0)
      for (e = e.entanglements, o &= n; 0 < o; ) {
        var f = 31 - kt(o), d = 1 << f;
        n |= e[f], o &= ~d;
      }
    return Pa = n, ls(), i;
  }
  function Xg(e, n) {
    qe = null, C.H = Ql, n === qr || n === ms ? (n = lp(), xt = 3) : n === Qc ? (n = lp(), xt = 4) : xt = n === Ef ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Hn = n, Ke === null && (Ut = 1, Ts(
      e,
      In(n, e.current)
    ));
  }
  function Gg() {
    var e = Ln.current;
    return e === null ? !0 : (et & 4194048) === et ? Kn === null : (et & 62914560) === et || (et & 536870912) !== 0 ? e === Kn : !1;
  }
  function Ig() {
    var e = C.H;
    return C.H = Ql, e === null ? Ql : e;
  }
  function Zg() {
    var e = C.A;
    return C.A = gS, e;
  }
  function Vs() {
    Ut = 4, Ri || (et & 4194048) !== et && Ln.current !== null || (Fr = !0), (Ci & 134217727) === 0 && (sr & 134217727) === 0 || Ct === null || Di(
      Ct,
      et,
      Bn,
      !1
    );
  }
  function If(e, n, i) {
    var o = ht;
    ht |= 2;
    var f = Ig(), d = Zg();
    (Ct !== e || et !== n) && (Us = null, Jr(e, n)), n = !1;
    var x = Ut;
    e: do
      try {
        if (xt !== 0 && Ke !== null) {
          var M = Ke, q = Hn;
          switch (xt) {
            case 8:
              Gf(), x = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Ln.current === null && (n = !0);
              var ae = xt;
              if (xt = 0, Hn = null, Wr(e, M, q, ae), i && Fr) {
                x = 0;
                break e;
              }
              break;
            default:
              ae = xt, xt = 0, Hn = null, Wr(e, M, q, ae);
          }
        }
        bS(), x = Ut;
        break;
      } catch (ue) {
        Xg(e, ue);
      }
    while (!0);
    return n && e.shellSuspendCounter++, qa = Wi = null, ht = o, C.H = f, C.A = d, Ke === null && (Ct = null, et = 0, ls()), x;
  }
  function bS() {
    for (; Ke !== null; ) Qg(Ke);
  }
  function xS(e, n) {
    var i = ht;
    ht |= 2;
    var o = Ig(), f = Zg();
    Ct !== e || et !== n ? (Us = null, Bs = Fe() + 500, Jr(e, n)) : Fr = vt(
      e,
      n
    );
    e: do
      try {
        if (xt !== 0 && Ke !== null) {
          n = Ke;
          var d = Hn;
          t: switch (xt) {
            case 1:
              xt = 0, Hn = null, Wr(e, n, d, 1);
              break;
            case 2:
            case 9:
              if (ip(d)) {
                xt = 0, Hn = null, Fg(n);
                break;
              }
              n = function() {
                xt !== 2 && xt !== 9 || Ct !== e || (xt = 7), Ra(e);
              }, d.then(n, n);
              break e;
            case 3:
              xt = 7;
              break e;
            case 4:
              xt = 5;
              break e;
            case 7:
              ip(d) ? (xt = 0, Hn = null, Fg(n)) : (xt = 0, Hn = null, Wr(e, n, d, 7));
              break;
            case 5:
              var x = null;
              switch (Ke.tag) {
                case 26:
                  x = Ke.memoizedState;
                case 5:
                case 27:
                  var M = Ke;
                  if (x ? L0(x) : M.stateNode.complete) {
                    xt = 0, Hn = null;
                    var q = M.sibling;
                    if (q !== null) Ke = q;
                    else {
                      var ae = M.return;
                      ae !== null ? (Ke = ae, qs(ae)) : Ke = null;
                    }
                    break t;
                  }
              }
              xt = 0, Hn = null, Wr(e, n, d, 5);
              break;
            case 6:
              xt = 0, Hn = null, Wr(e, n, d, 6);
              break;
            case 8:
              Gf(), Ut = 6;
              break e;
            default:
              throw Error(l(462));
          }
        }
        wS();
        break;
      } catch (ue) {
        Xg(e, ue);
      }
    while (!0);
    return qa = Wi = null, C.H = o, C.A = f, ht = i, Ke !== null ? 0 : (Ct = null, et = 0, ls(), Ut);
  }
  function wS() {
    for (; Ke !== null && !Je(); )
      Qg(Ke);
  }
  function Qg(e) {
    var n = vg(e.alternate, e, Pa);
    e.memoizedProps = e.pendingProps, n === null ? qs(e) : Ke = n;
  }
  function Fg(e) {
    var n = e, i = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = dg(
          i,
          n,
          n.pendingProps,
          n.type,
          void 0,
          et
        );
        break;
      case 11:
        n = dg(
          i,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          et
        );
        break;
      case 5:
        of(n);
      default:
        xg(i, n), n = Ke = Zm(n, Pa), n = vg(i, n, Pa);
    }
    e.memoizedProps = e.pendingProps, n === null ? qs(e) : Ke = n;
  }
  function Wr(e, n, i, o) {
    qa = Wi = null, of(n), Yr = null, Vl = 0;
    var f = n.return;
    try {
      if (uS(
        e,
        f,
        n,
        i,
        et
      )) {
        Ut = 1, Ts(
          e,
          In(i, e.current)
        ), Ke = null;
        return;
      }
    } catch (d) {
      if (f !== null) throw Ke = f, d;
      Ut = 1, Ts(
        e,
        In(i, e.current)
      ), Ke = null;
      return;
    }
    n.flags & 32768 ? (it || o === 1 ? e = !0 : Fr || (et & 536870912) !== 0 ? e = !1 : (Ri = e = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = Ln.current, o !== null && o.tag === 13 && (o.flags |= 16384))), Kg(n, e)) : qs(n);
  }
  function qs(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        Kg(
          n,
          Ri
        );
        return;
      }
      e = n.return;
      var i = dS(
        n.alternate,
        n,
        Pa
      );
      if (i !== null) {
        Ke = i;
        return;
      }
      if (n = n.sibling, n !== null) {
        Ke = n;
        return;
      }
      Ke = n = e;
    } while (n !== null);
    Ut === 0 && (Ut = 5);
  }
  function Kg(e, n) {
    do {
      var i = hS(e.alternate, e);
      if (i !== null) {
        i.flags &= 32767, Ke = i;
        return;
      }
      if (i = e.return, i !== null && (i.flags |= 32768, i.subtreeFlags = 0, i.deletions = null), !n && (e = e.sibling, e !== null)) {
        Ke = e;
        return;
      }
      Ke = e = i;
    } while (e !== null);
    Ut = 6, Ke = null;
  }
  function Pg(e, n, i, o, f, d, x, M, q) {
    e.cancelPendingCommit = null;
    do
      Ys();
    while (Jt !== 0);
    if ((ht & 6) !== 0) throw Error(l(327));
    if (n !== null) {
      if (n === e.current) throw Error(l(177));
      if (d = n.lanes | n.childLanes, d |= Oc, Pt(
        e,
        i,
        d,
        x,
        M,
        q
      ), e === Ct && (Ke = Ct = null, et = 0), Pr = n, Mi = e, Ja = i, Yf = d, $f = f, Vg = o, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, NS(jt, function() {
        return n0(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), o = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || o) {
        o = C.T, C.T = null, f = z.p, z.p = 2, x = ht, ht |= 4;
        try {
          mS(e, n, i);
        } finally {
          ht = x, z.p = f, C.T = o;
        }
      }
      Jt = 1, Jg(), Wg(), e0();
    }
  }
  function Jg() {
    if (Jt === 1) {
      Jt = 0;
      var e = Mi, n = Pr, i = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || i) {
        i = C.T, C.T = null;
        var o = z.p;
        z.p = 2;
        var f = ht;
        ht |= 4;
        try {
          zg(n, e);
          var d = id, x = Um(e.containerInfo), M = d.focusedElem, q = d.selectionRange;
          if (x !== M && M && M.ownerDocument && Bm(
            M.ownerDocument.documentElement,
            M
          )) {
            if (q !== null && Tc(M)) {
              var ae = q.start, ue = q.end;
              if (ue === void 0 && (ue = ae), "selectionStart" in M)
                M.selectionStart = ae, M.selectionEnd = Math.min(
                  ue,
                  M.value.length
                );
              else {
                var fe = M.ownerDocument || document, ie = fe && fe.defaultView || window;
                if (ie.getSelection) {
                  var oe = ie.getSelection(), _e = M.textContent.length, je = Math.min(q.start, _e), Nt = q.end === void 0 ? je : Math.min(q.end, _e);
                  !oe.extend && je > Nt && (x = Nt, Nt = je, je = x);
                  var P = Hm(
                    M,
                    je
                  ), Z = Hm(
                    M,
                    Nt
                  );
                  if (P && Z && (oe.rangeCount !== 1 || oe.anchorNode !== P.node || oe.anchorOffset !== P.offset || oe.focusNode !== Z.node || oe.focusOffset !== Z.offset)) {
                    var ne = fe.createRange();
                    ne.setStart(P.node, P.offset), oe.removeAllRanges(), je > Nt ? (oe.addRange(ne), oe.extend(Z.node, Z.offset)) : (ne.setEnd(Z.node, Z.offset), oe.addRange(ne));
                  }
                }
              }
            }
            for (fe = [], oe = M; oe = oe.parentNode; )
              oe.nodeType === 1 && fe.push({
                element: oe,
                left: oe.scrollLeft,
                top: oe.scrollTop
              });
            for (typeof M.focus == "function" && M.focus(), M = 0; M < fe.length; M++) {
              var ce = fe[M];
              ce.element.scrollLeft = ce.left, ce.element.scrollTop = ce.top;
            }
          }
          eu = !!ad, id = ad = null;
        } finally {
          ht = f, z.p = o, C.T = i;
        }
      }
      e.current = n, Jt = 2;
    }
  }
  function Wg() {
    if (Jt === 2) {
      Jt = 0;
      var e = Mi, n = Pr, i = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || i) {
        i = C.T, C.T = null;
        var o = z.p;
        z.p = 2;
        var f = ht;
        ht |= 4;
        try {
          Cg(e, n.alternate, n);
        } finally {
          ht = f, z.p = o, C.T = i;
        }
      }
      Jt = 3;
    }
  }
  function e0() {
    if (Jt === 4 || Jt === 3) {
      Jt = 0, Qe();
      var e = Mi, n = Pr, i = Ja, o = Vg;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Jt = 5 : (Jt = 0, Pr = Mi = null, t0(e, e.pendingLanes));
      var f = e.pendingLanes;
      if (f === 0 && (Ti = null), J(i), n = n.stateNode, Kt && typeof Kt.onCommitFiberRoot == "function")
        try {
          Kt.onCommitFiberRoot(
            tn,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (o !== null) {
        n = C.T, f = z.p, z.p = 2, C.T = null;
        try {
          for (var d = e.onRecoverableError, x = 0; x < o.length; x++) {
            var M = o[x];
            d(M.value, {
              componentStack: M.stack
            });
          }
        } finally {
          C.T = n, z.p = f;
        }
      }
      (Ja & 3) !== 0 && Ys(), Ra(e), f = e.pendingLanes, (i & 261930) !== 0 && (f & 42) !== 0 ? e === Xf ? ao++ : (ao = 0, Xf = e) : ao = 0, io(0);
    }
  }
  function t0(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, Ul(n)));
  }
  function Ys() {
    return Jg(), Wg(), e0(), n0();
  }
  function n0() {
    if (Jt !== 5) return !1;
    var e = Mi, n = Yf;
    Yf = 0;
    var i = J(Ja), o = C.T, f = z.p;
    try {
      z.p = 32 > i ? 32 : i, C.T = null, i = $f, $f = null;
      var d = Mi, x = Ja;
      if (Jt = 0, Pr = Mi = null, Ja = 0, (ht & 6) !== 0) throw Error(l(331));
      var M = ht;
      if (ht |= 4, Bg(d.current), Lg(
        d,
        d.current,
        x,
        i
      ), ht = M, io(0, !1), Kt && typeof Kt.onPostCommitFiberRoot == "function")
        try {
          Kt.onPostCommitFiberRoot(tn, d);
        } catch {
        }
      return !0;
    } finally {
      z.p = f, C.T = o, t0(e, n);
    }
  }
  function a0(e, n, i) {
    n = In(i, n), n = Sf(e.stateNode, n, 2), e = Si(e, n, 2), e !== null && (pt(e, 2), Ra(e));
  }
  function wt(e, n, i) {
    if (e.tag === 3)
      a0(e, e, i);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          a0(
            n,
            e,
            i
          );
          break;
        } else if (n.tag === 1) {
          var o = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (Ti === null || !Ti.has(o))) {
            e = In(i, e), i = ig(2), o = Si(n, i, 2), o !== null && (rg(
              i,
              o,
              n,
              e
            ), pt(o, 2), Ra(o));
            break;
          }
        }
        n = n.return;
      }
  }
  function Zf(e, n, i) {
    var o = e.pingCache;
    if (o === null) {
      o = e.pingCache = new yS();
      var f = /* @__PURE__ */ new Set();
      o.set(n, f);
    } else
      f = o.get(n), f === void 0 && (f = /* @__PURE__ */ new Set(), o.set(n, f));
    f.has(i) || (kf = !0, f.add(i), e = SS.bind(null, e, n, i), n.then(e, e));
  }
  function SS(e, n, i) {
    var o = e.pingCache;
    o !== null && o.delete(n), e.pingedLanes |= e.suspendedLanes & i, e.warmLanes &= ~i, Ct === e && (et & i) === i && (Ut === 4 || Ut === 3 && (et & 62914560) === et && 300 > Fe() - Hs ? (ht & 2) === 0 && Jr(e, 0) : Vf |= i, Kr === et && (Kr = 0)), Ra(e);
  }
  function i0(e, n) {
    n === 0 && (n = Vt()), e = Ki(e, n), e !== null && (pt(e, n), Ra(e));
  }
  function ES(e) {
    var n = e.memoizedState, i = 0;
    n !== null && (i = n.retryLane), i0(e, i);
  }
  function _S(e, n) {
    var i = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var o = e.stateNode, f = e.memoizedState;
        f !== null && (i = f.retryLane);
        break;
      case 19:
        o = e.stateNode;
        break;
      case 22:
        o = e.stateNode._retryCache;
        break;
      default:
        throw Error(l(314));
    }
    o !== null && o.delete(n), i0(e, i);
  }
  function NS(e, n) {
    return $e(e, n);
  }
  var $s = null, el = null, Qf = !1, Xs = !1, Ff = !1, Ai = 0;
  function Ra(e) {
    e !== el && e.next === null && (el === null ? $s = el = e : el = el.next = e), Xs = !0, Qf || (Qf = !0, CS());
  }
  function io(e, n) {
    if (!Ff && Xs) {
      Ff = !0;
      do
        for (var i = !1, o = $s; o !== null; ) {
          if (e !== 0) {
            var f = o.pendingLanes;
            if (f === 0) var d = 0;
            else {
              var x = o.suspendedLanes, M = o.pingedLanes;
              d = (1 << 31 - kt(42 | e) + 1) - 1, d &= f & ~(x & ~M), d = d & 201326741 ? d & 201326741 | 1 : d ? d | 2 : 0;
            }
            d !== 0 && (i = !0, s0(o, d));
          } else
            d = et, d = He(
              o,
              o === Ct ? d : 0,
              o.cancelPendingCommit !== null || o.timeoutHandle !== -1
            ), (d & 3) === 0 || vt(o, d) || (i = !0, s0(o, d));
          o = o.next;
        }
      while (i);
      Ff = !1;
    }
  }
  function RS() {
    r0();
  }
  function r0() {
    Xs = Qf = !1;
    var e = 0;
    Ai !== 0 && BS() && (e = Ai);
    for (var n = Fe(), i = null, o = $s; o !== null; ) {
      var f = o.next, d = l0(o, n);
      d === 0 ? (o.next = null, i === null ? $s = f : i.next = f, f === null && (el = i)) : (i = o, (e !== 0 || (d & 3) !== 0) && (Xs = !0)), o = f;
    }
    Jt !== 0 && Jt !== 5 || io(e), Ai !== 0 && (Ai = 0);
  }
  function l0(e, n) {
    for (var i = e.suspendedLanes, o = e.pingedLanes, f = e.expirationTimes, d = e.pendingLanes & -62914561; 0 < d; ) {
      var x = 31 - kt(d), M = 1 << x, q = f[x];
      q === -1 ? ((M & i) === 0 || (M & o) !== 0) && (f[x] = Ht(M, n)) : q <= n && (e.expiredLanes |= M), d &= ~M;
    }
    if (n = Ct, i = et, i = He(
      e,
      e === n ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), o = e.callbackNode, i === 0 || e === n && (xt === 2 || xt === 9) || e.cancelPendingCommit !== null)
      return o !== null && o !== null && St(o), e.callbackNode = null, e.callbackPriority = 0;
    if ((i & 3) === 0 || vt(e, i)) {
      if (n = i & -i, n === e.callbackPriority) return n;
      switch (o !== null && St(o), J(i)) {
        case 2:
        case 8:
          i = Xt;
          break;
        case 32:
          i = jt;
          break;
        case 268435456:
          i = ot;
          break;
        default:
          i = jt;
      }
      return o = o0.bind(null, e), i = $e(i, o), e.callbackPriority = n, e.callbackNode = i, n;
    }
    return o !== null && o !== null && St(o), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function o0(e, n) {
    if (Jt !== 0 && Jt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var i = e.callbackNode;
    if (Ys() && e.callbackNode !== i)
      return null;
    var o = et;
    return o = He(
      e,
      e === Ct ? o : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), o === 0 ? null : (Yg(e, o, n), l0(e, Fe()), e.callbackNode != null && e.callbackNode === i ? o0.bind(null, e) : null);
  }
  function s0(e, n) {
    if (Ys()) return null;
    Yg(e, n, !0);
  }
  function CS() {
    kS(function() {
      (ht & 6) !== 0 ? $e(
        yt,
        RS
      ) : r0();
    });
  }
  function Kf() {
    if (Ai === 0) {
      var e = kr;
      e === 0 && (e = ra, ra <<= 1, (ra & 261888) === 0 && (ra = 256)), Ai = e;
    }
    return Ai;
  }
  function u0(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Jo("" + e);
  }
  function c0(e, n) {
    var i = n.ownerDocument.createElement("input");
    return i.name = n.name, i.value = n.value, e.id && i.setAttribute("form", e.id), n.parentNode.insertBefore(i, n), e = new FormData(e), i.parentNode.removeChild(i), e;
  }
  function TS(e, n, i, o, f) {
    if (n === "submit" && i && i.stateNode === f) {
      var d = u0(
        (f[we] || null).action
      ), x = o.submitter;
      x && (n = (n = x[we] || null) ? u0(n.formAction) : x.getAttribute("formAction"), n !== null && (d = n, x = null));
      var M = new ns(
        "action",
        "action",
        null,
        o,
        f
      );
      e.push({
        event: M,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (o.defaultPrevented) {
                if (Ai !== 0) {
                  var q = x ? c0(f, x) : new FormData(f);
                  gf(
                    i,
                    {
                      pending: !0,
                      data: q,
                      method: f.method,
                      action: d
                    },
                    null,
                    q
                  );
                }
              } else
                typeof d == "function" && (M.preventDefault(), q = x ? c0(f, x) : new FormData(f), gf(
                  i,
                  {
                    pending: !0,
                    data: q,
                    method: f.method,
                    action: d
                  },
                  d,
                  q
                ));
            },
            currentTarget: f
          }
        ]
      });
    }
  }
  for (var Pf = 0; Pf < zc.length; Pf++) {
    var Jf = zc[Pf], MS = Jf.toLowerCase(), DS = Jf[0].toUpperCase() + Jf.slice(1);
    ua(
      MS,
      "on" + DS
    );
  }
  ua(qm, "onAnimationEnd"), ua(Ym, "onAnimationIteration"), ua($m, "onAnimationStart"), ua("dblclick", "onDoubleClick"), ua("focusin", "onFocus"), ua("focusout", "onBlur"), ua(Iw, "onTransitionRun"), ua(Zw, "onTransitionStart"), ua(Qw, "onTransitionCancel"), ua(Xm, "onTransitionEnd"), nn("onMouseEnter", ["mouseout", "mouseover"]), nn("onMouseLeave", ["mouseout", "mouseover"]), nn("onPointerEnter", ["pointerout", "pointerover"]), nn("onPointerLeave", ["pointerout", "pointerover"]), cn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), cn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), cn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), cn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), cn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), cn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var ro = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), AS = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ro)
  );
  function f0(e, n) {
    n = (n & 4) !== 0;
    for (var i = 0; i < e.length; i++) {
      var o = e[i], f = o.event;
      o = o.listeners;
      e: {
        var d = void 0;
        if (n)
          for (var x = o.length - 1; 0 <= x; x--) {
            var M = o[x], q = M.instance, ae = M.currentTarget;
            if (M = M.listener, q !== d && f.isPropagationStopped())
              break e;
            d = M, f.currentTarget = ae;
            try {
              d(f);
            } catch (ue) {
              rs(ue);
            }
            f.currentTarget = null, d = q;
          }
        else
          for (x = 0; x < o.length; x++) {
            if (M = o[x], q = M.instance, ae = M.currentTarget, M = M.listener, q !== d && f.isPropagationStopped())
              break e;
            d = M, f.currentTarget = ae;
            try {
              d(f);
            } catch (ue) {
              rs(ue);
            }
            f.currentTarget = null, d = q;
          }
      }
    }
  }
  function Pe(e, n) {
    var i = n[Me];
    i === void 0 && (i = n[Me] = /* @__PURE__ */ new Set());
    var o = e + "__bubble";
    i.has(o) || (d0(n, e, 2, !1), i.add(o));
  }
  function Wf(e, n, i) {
    var o = 0;
    n && (o |= 4), d0(
      i,
      e,
      o,
      n
    );
  }
  var Gs = "_reactListening" + Math.random().toString(36).slice(2);
  function ed(e) {
    if (!e[Gs]) {
      e[Gs] = !0, Sa.forEach(function(i) {
        i !== "selectionchange" && (AS.has(i) || Wf(i, !1, e), Wf(i, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[Gs] || (n[Gs] = !0, Wf("selectionchange", !1, n));
    }
  }
  function d0(e, n, i, o) {
    switch (q0(n)) {
      case 2:
        var f = rE;
        break;
      case 8:
        f = lE;
        break;
      default:
        f = pd;
    }
    i = f.bind(
      null,
      n,
      i,
      e
    ), f = void 0, !bc || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (f = !0), o ? f !== void 0 ? e.addEventListener(n, i, {
      capture: !0,
      passive: f
    }) : e.addEventListener(n, i, !0) : f !== void 0 ? e.addEventListener(n, i, {
      passive: f
    }) : e.addEventListener(n, i, !1);
  }
  function td(e, n, i, o, f) {
    var d = o;
    if ((n & 1) === 0 && (n & 2) === 0 && o !== null)
      e: for (; ; ) {
        if (o === null) return;
        var x = o.tag;
        if (x === 3 || x === 4) {
          var M = o.stateNode.containerInfo;
          if (M === f) break;
          if (x === 4)
            for (x = o.return; x !== null; ) {
              var q = x.tag;
              if ((q === 3 || q === 4) && x.stateNode.containerInfo === f)
                return;
              x = x.return;
            }
          for (; M !== null; ) {
            if (x = Rt(M), x === null) return;
            if (q = x.tag, q === 5 || q === 6 || q === 26 || q === 27) {
              o = d = x;
              continue e;
            }
            M = M.parentNode;
          }
        }
        o = o.return;
      }
    ym(function() {
      var ae = d, ue = yc(i), fe = [];
      e: {
        var ie = Gm.get(e);
        if (ie !== void 0) {
          var oe = ns, _e = e;
          switch (e) {
            case "keypress":
              if (es(i) === 0) break e;
            case "keydown":
            case "keyup":
              oe = _w;
              break;
            case "focusin":
              _e = "focus", oe = Ec;
              break;
            case "focusout":
              _e = "blur", oe = Ec;
              break;
            case "beforeblur":
            case "afterblur":
              oe = Ec;
              break;
            case "click":
              if (i.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              oe = xm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              oe = dw;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              oe = Cw;
              break;
            case qm:
            case Ym:
            case $m:
              oe = pw;
              break;
            case Xm:
              oe = Mw;
              break;
            case "scroll":
            case "scrollend":
              oe = cw;
              break;
            case "wheel":
              oe = Aw;
              break;
            case "copy":
            case "cut":
            case "paste":
              oe = yw;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              oe = Sm;
              break;
            case "toggle":
            case "beforetoggle":
              oe = Ow;
          }
          var je = (n & 4) !== 0, Nt = !je && (e === "scroll" || e === "scrollend"), P = je ? ie !== null ? ie + "Capture" : null : ie;
          je = [];
          for (var Z = ae, ne; Z !== null; ) {
            var ce = Z;
            if (ne = ce.stateNode, ce = ce.tag, ce !== 5 && ce !== 26 && ce !== 27 || ne === null || P === null || (ce = Cl(Z, P), ce != null && je.push(
              lo(Z, ce, ne)
            )), Nt) break;
            Z = Z.return;
          }
          0 < je.length && (ie = new oe(
            ie,
            _e,
            null,
            i,
            ue
          ), fe.push({ event: ie, listeners: je }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (ie = e === "mouseover" || e === "pointerover", oe = e === "mouseout" || e === "pointerout", ie && i !== gc && (_e = i.relatedTarget || i.fromElement) && (Rt(_e) || _e[be]))
            break e;
          if ((oe || ie) && (ie = ue.window === ue ? ue : (ie = ue.ownerDocument) ? ie.defaultView || ie.parentWindow : window, oe ? (_e = i.relatedTarget || i.toElement, oe = ae, _e = _e ? Rt(_e) : null, _e !== null && (Nt = u(_e), je = _e.tag, _e !== Nt || je !== 5 && je !== 27 && je !== 6) && (_e = null)) : (oe = null, _e = ae), oe !== _e)) {
            if (je = xm, ce = "onMouseLeave", P = "onMouseEnter", Z = "mouse", (e === "pointerout" || e === "pointerover") && (je = Sm, ce = "onPointerLeave", P = "onPointerEnter", Z = "pointer"), Nt = oe == null ? ie : We(oe), ne = _e == null ? ie : We(_e), ie = new je(
              ce,
              Z + "leave",
              oe,
              i,
              ue
            ), ie.target = Nt, ie.relatedTarget = ne, ce = null, Rt(ue) === ae && (je = new je(
              P,
              Z + "enter",
              _e,
              i,
              ue
            ), je.target = ne, je.relatedTarget = Nt, ce = je), Nt = ce, oe && _e)
              t: {
                for (je = zS, P = oe, Z = _e, ne = 0, ce = P; ce; ce = je(ce))
                  ne++;
                ce = 0;
                for (var Oe = Z; Oe; Oe = je(Oe))
                  ce++;
                for (; 0 < ne - ce; )
                  P = je(P), ne--;
                for (; 0 < ce - ne; )
                  Z = je(Z), ce--;
                for (; ne--; ) {
                  if (P === Z || Z !== null && P === Z.alternate) {
                    je = P;
                    break t;
                  }
                  P = je(P), Z = je(Z);
                }
                je = null;
              }
            else je = null;
            oe !== null && h0(
              fe,
              ie,
              oe,
              je,
              !1
            ), _e !== null && Nt !== null && h0(
              fe,
              Nt,
              _e,
              je,
              !0
            );
          }
        }
        e: {
          if (ie = ae ? We(ae) : window, oe = ie.nodeName && ie.nodeName.toLowerCase(), oe === "select" || oe === "input" && ie.type === "file")
            var ut = Dm;
          else if (Tm(ie))
            if (Am)
              ut = $w;
            else {
              ut = qw;
              var Ne = Vw;
            }
          else
            oe = ie.nodeName, !oe || oe.toLowerCase() !== "input" || ie.type !== "checkbox" && ie.type !== "radio" ? ae && pc(ae.elementType) && (ut = Dm) : ut = Yw;
          if (ut && (ut = ut(e, ae))) {
            Mm(
              fe,
              ut,
              i,
              ue
            );
            break e;
          }
          Ne && Ne(e, ie, ae), e === "focusout" && ae && ie.type === "number" && ae.memoizedProps.value != null && Nl(ie, "number", ie.value);
        }
        switch (Ne = ae ? We(ae) : window, e) {
          case "focusin":
            (Tm(Ne) || Ne.contentEditable === "true") && (Ar = Ne, Mc = ae, jl = null);
            break;
          case "focusout":
            jl = Mc = Ar = null;
            break;
          case "mousedown":
            Dc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Dc = !1, km(fe, i, ue);
            break;
          case "selectionchange":
            if (Gw) break;
          case "keydown":
          case "keyup":
            km(fe, i, ue);
        }
        var Xe;
        if (Nc)
          e: {
            switch (e) {
              case "compositionstart":
                var tt = "onCompositionStart";
                break e;
              case "compositionend":
                tt = "onCompositionEnd";
                break e;
              case "compositionupdate":
                tt = "onCompositionUpdate";
                break e;
            }
            tt = void 0;
          }
        else
          Dr ? Rm(e, i) && (tt = "onCompositionEnd") : e === "keydown" && i.keyCode === 229 && (tt = "onCompositionStart");
        tt && (Em && i.locale !== "ko" && (Dr || tt !== "onCompositionStart" ? tt === "onCompositionEnd" && Dr && (Xe = vm()) : (pi = ue, xc = "value" in pi ? pi.value : pi.textContent, Dr = !0)), Ne = Is(ae, tt), 0 < Ne.length && (tt = new wm(
          tt,
          e,
          null,
          i,
          ue
        ), fe.push({ event: tt, listeners: Ne }), Xe ? tt.data = Xe : (Xe = Cm(i), Xe !== null && (tt.data = Xe)))), (Xe = jw ? Hw(e, i) : Bw(e, i)) && (tt = Is(ae, "onBeforeInput"), 0 < tt.length && (Ne = new wm(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          ue
        ), fe.push({
          event: Ne,
          listeners: tt
        }), Ne.data = Xe)), TS(
          fe,
          e,
          ae,
          i,
          ue
        );
      }
      f0(fe, n);
    });
  }
  function lo(e, n, i) {
    return {
      instance: e,
      listener: n,
      currentTarget: i
    };
  }
  function Is(e, n) {
    for (var i = n + "Capture", o = []; e !== null; ) {
      var f = e, d = f.stateNode;
      if (f = f.tag, f !== 5 && f !== 26 && f !== 27 || d === null || (f = Cl(e, i), f != null && o.unshift(
        lo(e, f, d)
      ), f = Cl(e, n), f != null && o.push(
        lo(e, f, d)
      )), e.tag === 3) return o;
      e = e.return;
    }
    return [];
  }
  function zS(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function h0(e, n, i, o, f) {
    for (var d = n._reactName, x = []; i !== null && i !== o; ) {
      var M = i, q = M.alternate, ae = M.stateNode;
      if (M = M.tag, q !== null && q === o) break;
      M !== 5 && M !== 26 && M !== 27 || ae === null || (q = ae, f ? (ae = Cl(i, d), ae != null && x.unshift(
        lo(i, ae, q)
      )) : f || (ae = Cl(i, d), ae != null && x.push(
        lo(i, ae, q)
      ))), i = i.return;
    }
    x.length !== 0 && e.push({ event: n, listeners: x });
  }
  var OS = /\r\n?/g, LS = /\u0000|\uFFFD/g;
  function m0(e) {
    return (typeof e == "string" ? e : "" + e).replace(OS, `
`).replace(LS, "");
  }
  function p0(e, n) {
    return n = m0(n), m0(e) === n;
  }
  function _t(e, n, i, o, f, d) {
    switch (i) {
      case "children":
        typeof o == "string" ? n === "body" || n === "textarea" && o === "" || Cr(e, o) : (typeof o == "number" || typeof o == "bigint") && n !== "body" && Cr(e, "" + o);
        break;
      case "className":
        sa(e, "class", o);
        break;
      case "tabIndex":
        sa(e, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        sa(e, i, o);
        break;
      case "style":
        pm(e, o, d);
        break;
      case "data":
        if (n !== "object") {
          sa(e, "data", o);
          break;
        }
      case "src":
      case "href":
        if (o === "" && (n !== "a" || i !== "href")) {
          e.removeAttribute(i);
          break;
        }
        if (o == null || typeof o == "function" || typeof o == "symbol" || typeof o == "boolean") {
          e.removeAttribute(i);
          break;
        }
        o = Jo("" + o), e.setAttribute(i, o);
        break;
      case "action":
      case "formAction":
        if (typeof o == "function") {
          e.setAttribute(
            i,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof d == "function" && (i === "formAction" ? (n !== "input" && _t(e, n, "name", f.name, f, null), _t(
            e,
            n,
            "formEncType",
            f.formEncType,
            f,
            null
          ), _t(
            e,
            n,
            "formMethod",
            f.formMethod,
            f,
            null
          ), _t(
            e,
            n,
            "formTarget",
            f.formTarget,
            f,
            null
          )) : (_t(e, n, "encType", f.encType, f, null), _t(e, n, "method", f.method, f, null), _t(e, n, "target", f.target, f, null)));
        if (o == null || typeof o == "symbol" || typeof o == "boolean") {
          e.removeAttribute(i);
          break;
        }
        o = Jo("" + o), e.setAttribute(i, o);
        break;
      case "onClick":
        o != null && (e.onclick = Ba);
        break;
      case "onScroll":
        o != null && Pe("scroll", e);
        break;
      case "onScrollEnd":
        o != null && Pe("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(l(61));
          if (i = o.__html, i != null) {
            if (f.children != null) throw Error(l(60));
            e.innerHTML = i;
          }
        }
        break;
      case "multiple":
        e.multiple = o && typeof o != "function" && typeof o != "symbol";
        break;
      case "muted":
        e.muted = o && typeof o != "function" && typeof o != "symbol";
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
        if (o == null || typeof o == "function" || typeof o == "boolean" || typeof o == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        i = Jo("" + o), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          i
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
        o != null && typeof o != "function" && typeof o != "symbol" ? e.setAttribute(i, "" + o) : e.removeAttribute(i);
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
        o && typeof o != "function" && typeof o != "symbol" ? e.setAttribute(i, "") : e.removeAttribute(i);
        break;
      case "capture":
      case "download":
        o === !0 ? e.setAttribute(i, "") : o !== !1 && o != null && typeof o != "function" && typeof o != "symbol" ? e.setAttribute(i, o) : e.removeAttribute(i);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        o != null && typeof o != "function" && typeof o != "symbol" && !isNaN(o) && 1 <= o ? e.setAttribute(i, o) : e.removeAttribute(i);
        break;
      case "rowSpan":
      case "start":
        o == null || typeof o == "function" || typeof o == "symbol" || isNaN(o) ? e.removeAttribute(i) : e.setAttribute(i, o);
        break;
      case "popover":
        Pe("beforetoggle", e), Pe("toggle", e), oa(e, "popover", o);
        break;
      case "xlinkActuate":
        Ue(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          o
        );
        break;
      case "xlinkArcrole":
        Ue(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          o
        );
        break;
      case "xlinkRole":
        Ue(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          o
        );
        break;
      case "xlinkShow":
        Ue(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          o
        );
        break;
      case "xlinkTitle":
        Ue(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          o
        );
        break;
      case "xlinkType":
        Ue(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          o
        );
        break;
      case "xmlBase":
        Ue(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          o
        );
        break;
      case "xmlLang":
        Ue(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          o
        );
        break;
      case "xmlSpace":
        Ue(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          o
        );
        break;
      case "is":
        oa(e, "is", o);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = sw.get(i) || i, oa(e, i, o));
    }
  }
  function nd(e, n, i, o, f, d) {
    switch (i) {
      case "style":
        pm(e, o, d);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(l(61));
          if (i = o.__html, i != null) {
            if (f.children != null) throw Error(l(60));
            e.innerHTML = i;
          }
        }
        break;
      case "children":
        typeof o == "string" ? Cr(e, o) : (typeof o == "number" || typeof o == "bigint") && Cr(e, "" + o);
        break;
      case "onScroll":
        o != null && Pe("scroll", e);
        break;
      case "onScrollEnd":
        o != null && Pe("scrollend", e);
        break;
      case "onClick":
        o != null && (e.onclick = Ba);
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
        if (!Dn.hasOwnProperty(i))
          e: {
            if (i[0] === "o" && i[1] === "n" && (f = i.endsWith("Capture"), n = i.slice(2, f ? i.length - 7 : void 0), d = e[we] || null, d = d != null ? d[i] : null, typeof d == "function" && e.removeEventListener(n, d, f), typeof o == "function")) {
              typeof d != "function" && d !== null && (i in e ? e[i] = null : e.hasAttribute(i) && e.removeAttribute(i)), e.addEventListener(n, o, f);
              break e;
            }
            i in e ? e[i] = o : o === !0 ? e.setAttribute(i, "") : oa(e, i, o);
          }
    }
  }
  function sn(e, n, i) {
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
        Pe("error", e), Pe("load", e);
        var o = !1, f = !1, d;
        for (d in i)
          if (i.hasOwnProperty(d)) {
            var x = i[d];
            if (x != null)
              switch (d) {
                case "src":
                  o = !0;
                  break;
                case "srcSet":
                  f = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(l(137, n));
                default:
                  _t(e, n, d, x, i, null);
              }
          }
        f && _t(e, n, "srcSet", i.srcSet, i, null), o && _t(e, n, "src", i.src, i, null);
        return;
      case "input":
        Pe("invalid", e);
        var M = d = x = f = null, q = null, ae = null;
        for (o in i)
          if (i.hasOwnProperty(o)) {
            var ue = i[o];
            if (ue != null)
              switch (o) {
                case "name":
                  f = ue;
                  break;
                case "type":
                  x = ue;
                  break;
                case "checked":
                  q = ue;
                  break;
                case "defaultChecked":
                  ae = ue;
                  break;
                case "value":
                  d = ue;
                  break;
                case "defaultValue":
                  M = ue;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (ue != null)
                    throw Error(l(137, n));
                  break;
                default:
                  _t(e, n, o, ue, i, null);
              }
          }
        Rr(
          e,
          d,
          M,
          q,
          ae,
          x,
          f,
          !1
        );
        return;
      case "select":
        Pe("invalid", e), o = x = d = null;
        for (f in i)
          if (i.hasOwnProperty(f) && (M = i[f], M != null))
            switch (f) {
              case "value":
                d = M;
                break;
              case "defaultValue":
                x = M;
                break;
              case "multiple":
                o = M;
              default:
                _t(e, n, f, M, i, null);
            }
        n = d, i = x, e.multiple = !!o, n != null ? mi(e, !!o, n, !1) : i != null && mi(e, !!o, i, !0);
        return;
      case "textarea":
        Pe("invalid", e), d = f = o = null;
        for (x in i)
          if (i.hasOwnProperty(x) && (M = i[x], M != null))
            switch (x) {
              case "value":
                o = M;
                break;
              case "defaultValue":
                f = M;
                break;
              case "children":
                d = M;
                break;
              case "dangerouslySetInnerHTML":
                if (M != null) throw Error(l(91));
                break;
              default:
                _t(e, n, x, M, i, null);
            }
        hm(e, o, f, d);
        return;
      case "option":
        for (q in i)
          if (i.hasOwnProperty(q) && (o = i[q], o != null))
            switch (q) {
              case "selected":
                e.selected = o && typeof o != "function" && typeof o != "symbol";
                break;
              default:
                _t(e, n, q, o, i, null);
            }
        return;
      case "dialog":
        Pe("beforetoggle", e), Pe("toggle", e), Pe("cancel", e), Pe("close", e);
        break;
      case "iframe":
      case "object":
        Pe("load", e);
        break;
      case "video":
      case "audio":
        for (o = 0; o < ro.length; o++)
          Pe(ro[o], e);
        break;
      case "image":
        Pe("error", e), Pe("load", e);
        break;
      case "details":
        Pe("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Pe("error", e), Pe("load", e);
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
        for (ae in i)
          if (i.hasOwnProperty(ae) && (o = i[ae], o != null))
            switch (ae) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(l(137, n));
              default:
                _t(e, n, ae, o, i, null);
            }
        return;
      default:
        if (pc(n)) {
          for (ue in i)
            i.hasOwnProperty(ue) && (o = i[ue], o !== void 0 && nd(
              e,
              n,
              ue,
              o,
              i,
              void 0
            ));
          return;
        }
    }
    for (M in i)
      i.hasOwnProperty(M) && (o = i[M], o != null && _t(e, n, M, o, i, null));
  }
  function jS(e, n, i, o) {
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
        var f = null, d = null, x = null, M = null, q = null, ae = null, ue = null;
        for (oe in i) {
          var fe = i[oe];
          if (i.hasOwnProperty(oe) && fe != null)
            switch (oe) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                q = fe;
              default:
                o.hasOwnProperty(oe) || _t(e, n, oe, null, o, fe);
            }
        }
        for (var ie in o) {
          var oe = o[ie];
          if (fe = i[ie], o.hasOwnProperty(ie) && (oe != null || fe != null))
            switch (ie) {
              case "type":
                d = oe;
                break;
              case "name":
                f = oe;
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
                M = oe;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (oe != null)
                  throw Error(l(137, n));
                break;
              default:
                oe !== fe && _t(
                  e,
                  n,
                  ie,
                  oe,
                  o,
                  fe
                );
            }
        }
        Ii(
          e,
          x,
          M,
          q,
          ae,
          ue,
          d,
          f
        );
        return;
      case "select":
        oe = x = M = ie = null;
        for (d in i)
          if (q = i[d], i.hasOwnProperty(d) && q != null)
            switch (d) {
              case "value":
                break;
              case "multiple":
                oe = q;
              default:
                o.hasOwnProperty(d) || _t(
                  e,
                  n,
                  d,
                  null,
                  o,
                  q
                );
            }
        for (f in o)
          if (d = o[f], q = i[f], o.hasOwnProperty(f) && (d != null || q != null))
            switch (f) {
              case "value":
                ie = d;
                break;
              case "defaultValue":
                M = d;
                break;
              case "multiple":
                x = d;
              default:
                d !== q && _t(
                  e,
                  n,
                  f,
                  d,
                  o,
                  q
                );
            }
        n = M, i = x, o = oe, ie != null ? mi(e, !!i, ie, !1) : !!o != !!i && (n != null ? mi(e, !!i, n, !0) : mi(e, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        oe = ie = null;
        for (M in i)
          if (f = i[M], i.hasOwnProperty(M) && f != null && !o.hasOwnProperty(M))
            switch (M) {
              case "value":
                break;
              case "children":
                break;
              default:
                _t(e, n, M, null, o, f);
            }
        for (x in o)
          if (f = o[x], d = i[x], o.hasOwnProperty(x) && (f != null || d != null))
            switch (x) {
              case "value":
                ie = f;
                break;
              case "defaultValue":
                oe = f;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(l(91));
                break;
              default:
                f !== d && _t(e, n, x, f, o, d);
            }
        Rl(e, ie, oe);
        return;
      case "option":
        for (var _e in i)
          if (ie = i[_e], i.hasOwnProperty(_e) && ie != null && !o.hasOwnProperty(_e))
            switch (_e) {
              case "selected":
                e.selected = !1;
                break;
              default:
                _t(
                  e,
                  n,
                  _e,
                  null,
                  o,
                  ie
                );
            }
        for (q in o)
          if (ie = o[q], oe = i[q], o.hasOwnProperty(q) && ie !== oe && (ie != null || oe != null))
            switch (q) {
              case "selected":
                e.selected = ie && typeof ie != "function" && typeof ie != "symbol";
                break;
              default:
                _t(
                  e,
                  n,
                  q,
                  ie,
                  o,
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
        for (var je in i)
          ie = i[je], i.hasOwnProperty(je) && ie != null && !o.hasOwnProperty(je) && _t(e, n, je, null, o, ie);
        for (ae in o)
          if (ie = o[ae], oe = i[ae], o.hasOwnProperty(ae) && ie !== oe && (ie != null || oe != null))
            switch (ae) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (ie != null)
                  throw Error(l(137, n));
                break;
              default:
                _t(
                  e,
                  n,
                  ae,
                  ie,
                  o,
                  oe
                );
            }
        return;
      default:
        if (pc(n)) {
          for (var Nt in i)
            ie = i[Nt], i.hasOwnProperty(Nt) && ie !== void 0 && !o.hasOwnProperty(Nt) && nd(
              e,
              n,
              Nt,
              void 0,
              o,
              ie
            );
          for (ue in o)
            ie = o[ue], oe = i[ue], !o.hasOwnProperty(ue) || ie === oe || ie === void 0 && oe === void 0 || nd(
              e,
              n,
              ue,
              ie,
              o,
              oe
            );
          return;
        }
    }
    for (var P in i)
      ie = i[P], i.hasOwnProperty(P) && ie != null && !o.hasOwnProperty(P) && _t(e, n, P, null, o, ie);
    for (fe in o)
      ie = o[fe], oe = i[fe], !o.hasOwnProperty(fe) || ie === oe || ie == null && oe == null || _t(e, n, fe, ie, o, oe);
  }
  function g0(e) {
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
  function HS() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, i = performance.getEntriesByType("resource"), o = 0; o < i.length; o++) {
        var f = i[o], d = f.transferSize, x = f.initiatorType, M = f.duration;
        if (d && M && g0(x)) {
          for (x = 0, M = f.responseEnd, o += 1; o < i.length; o++) {
            var q = i[o], ae = q.startTime;
            if (ae > M) break;
            var ue = q.transferSize, fe = q.initiatorType;
            ue && g0(fe) && (q = q.responseEnd, x += ue * (q < M ? 1 : (M - ae) / (q - ae)));
          }
          if (--o, n += 8 * (d + x) / (f.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var ad = null, id = null;
  function Zs(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function y0(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function v0(e, n) {
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
  function rd(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var ld = null;
  function BS() {
    var e = window.event;
    return e && e.type === "popstate" ? e === ld ? !1 : (ld = e, !0) : (ld = null, !1);
  }
  var b0 = typeof setTimeout == "function" ? setTimeout : void 0, US = typeof clearTimeout == "function" ? clearTimeout : void 0, x0 = typeof Promise == "function" ? Promise : void 0, kS = typeof queueMicrotask == "function" ? queueMicrotask : typeof x0 < "u" ? function(e) {
    return x0.resolve(null).then(e).catch(VS);
  } : b0;
  function VS(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function zi(e) {
    return e === "head";
  }
  function w0(e, n) {
    var i = n, o = 0;
    do {
      var f = i.nextSibling;
      if (e.removeChild(i), f && f.nodeType === 8)
        if (i = f.data, i === "/$" || i === "/&") {
          if (o === 0) {
            e.removeChild(f), il(n);
            return;
          }
          o--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          o++;
        else if (i === "html")
          oo(e.ownerDocument.documentElement);
        else if (i === "head") {
          i = e.ownerDocument.head, oo(i);
          for (var d = i.firstChild; d; ) {
            var x = d.nextSibling, M = d.nodeName;
            d[Ge] || M === "SCRIPT" || M === "STYLE" || M === "LINK" && d.rel.toLowerCase() === "stylesheet" || i.removeChild(d), d = x;
          }
        } else
          i === "body" && oo(e.ownerDocument.body);
      i = f;
    } while (i);
    il(n);
  }
  function S0(e, n) {
    var i = e;
    e = 0;
    do {
      var o = i.nextSibling;
      if (i.nodeType === 1 ? n ? (i._stashedDisplay = i.style.display, i.style.display = "none") : (i.style.display = i._stashedDisplay || "", i.getAttribute("style") === "" && i.removeAttribute("style")) : i.nodeType === 3 && (n ? (i._stashedText = i.nodeValue, i.nodeValue = "") : i.nodeValue = i._stashedText || ""), o && o.nodeType === 8)
        if (i = o.data, i === "/$") {
          if (e === 0) break;
          e--;
        } else
          i !== "$" && i !== "$?" && i !== "$~" && i !== "$!" || e++;
      i = o;
    } while (i);
  }
  function od(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var i = n;
      switch (n = n.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          od(i), rt(i);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (i.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(i);
    }
  }
  function qS(e, n, i, o) {
    for (; e.nodeType === 1; ) {
      var f = i;
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!o && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (o) {
        if (!e[Ge])
          switch (n) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (d = e.getAttribute("rel"), d === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (d !== f.rel || e.getAttribute("href") !== (f.href == null || f.href === "" ? null : f.href) || e.getAttribute("crossorigin") !== (f.crossOrigin == null ? null : f.crossOrigin) || e.getAttribute("title") !== (f.title == null ? null : f.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (d = e.getAttribute("src"), (d !== (f.src == null ? null : f.src) || e.getAttribute("type") !== (f.type == null ? null : f.type) || e.getAttribute("crossorigin") !== (f.crossOrigin == null ? null : f.crossOrigin)) && d && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (n === "input" && e.type === "hidden") {
        var d = f.name == null ? null : "" + f.name;
        if (f.type === "hidden" && e.getAttribute("name") === d)
          return e;
      } else return e;
      if (e = Pn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function YS(e, n, i) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !i || (e = Pn(e.nextSibling), e === null)) return null;
    return e;
  }
  function E0(e, n) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Pn(e.nextSibling), e === null)) return null;
    return e;
  }
  function sd(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function ud(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function $S(e, n) {
    var i = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = n;
    else if (e.data !== "$?" || i.readyState !== "loading")
      n();
    else {
      var o = function() {
        n(), i.removeEventListener("DOMContentLoaded", o);
      };
      i.addEventListener("DOMContentLoaded", o), e._reactRetry = o;
    }
  }
  function Pn(e) {
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
  var cd = null;
  function _0(e) {
    e = e.nextSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data;
        if (i === "/$" || i === "/&") {
          if (n === 0)
            return Pn(e.nextSibling);
          n--;
        } else
          i !== "$" && i !== "$!" && i !== "$?" && i !== "$~" && i !== "&" || n++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function N0(e) {
    e = e.previousSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data;
        if (i === "$" || i === "$!" || i === "$?" || i === "$~" || i === "&") {
          if (n === 0) return e;
          n--;
        } else i !== "/$" && i !== "/&" || n++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function R0(e, n, i) {
    switch (n = Zs(i), e) {
      case "html":
        if (e = n.documentElement, !e) throw Error(l(452));
        return e;
      case "head":
        if (e = n.head, !e) throw Error(l(453));
        return e;
      case "body":
        if (e = n.body, !e) throw Error(l(454));
        return e;
      default:
        throw Error(l(451));
    }
  }
  function oo(e) {
    for (var n = e.attributes; n.length; )
      e.removeAttributeNode(n[0]);
    rt(e);
  }
  var Jn = /* @__PURE__ */ new Map(), C0 = /* @__PURE__ */ new Set();
  function Qs(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Wa = z.d;
  z.d = {
    f: XS,
    r: GS,
    D: IS,
    C: ZS,
    L: QS,
    m: FS,
    X: PS,
    S: KS,
    M: JS
  };
  function XS() {
    var e = Wa.f(), n = ks();
    return e || n;
  }
  function GS(e) {
    var n = st(e);
    n !== null && n.tag === 5 && n.type === "form" ? Xp(n) : Wa.r(e);
  }
  var tl = typeof document > "u" ? null : document;
  function T0(e, n, i) {
    var o = tl;
    if (o && typeof n == "string" && n) {
      var f = an(n);
      f = 'link[rel="' + e + '"][href="' + f + '"]', typeof i == "string" && (f += '[crossorigin="' + i + '"]'), C0.has(f) || (C0.add(f), e = { rel: e, crossOrigin: i, href: n }, o.querySelector(f) === null && (n = o.createElement("link"), sn(n, "link", e), at(n), o.head.appendChild(n)));
    }
  }
  function IS(e) {
    Wa.D(e), T0("dns-prefetch", e, null);
  }
  function ZS(e, n) {
    Wa.C(e, n), T0("preconnect", e, n);
  }
  function QS(e, n, i) {
    Wa.L(e, n, i);
    var o = tl;
    if (o && e && n) {
      var f = 'link[rel="preload"][as="' + an(n) + '"]';
      n === "image" && i && i.imageSrcSet ? (f += '[imagesrcset="' + an(
        i.imageSrcSet
      ) + '"]', typeof i.imageSizes == "string" && (f += '[imagesizes="' + an(
        i.imageSizes
      ) + '"]')) : f += '[href="' + an(e) + '"]';
      var d = f;
      switch (n) {
        case "style":
          d = nl(e);
          break;
        case "script":
          d = al(e);
      }
      Jn.has(d) || (e = p(
        {
          rel: "preload",
          href: n === "image" && i && i.imageSrcSet ? void 0 : e,
          as: n
        },
        i
      ), Jn.set(d, e), o.querySelector(f) !== null || n === "style" && o.querySelector(so(d)) || n === "script" && o.querySelector(uo(d)) || (n = o.createElement("link"), sn(n, "link", e), at(n), o.head.appendChild(n)));
    }
  }
  function FS(e, n) {
    Wa.m(e, n);
    var i = tl;
    if (i && e) {
      var o = n && typeof n.as == "string" ? n.as : "script", f = 'link[rel="modulepreload"][as="' + an(o) + '"][href="' + an(e) + '"]', d = f;
      switch (o) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          d = al(e);
      }
      if (!Jn.has(d) && (e = p({ rel: "modulepreload", href: e }, n), Jn.set(d, e), i.querySelector(f) === null)) {
        switch (o) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(uo(d)))
              return;
        }
        o = i.createElement("link"), sn(o, "link", e), at(o), i.head.appendChild(o);
      }
    }
  }
  function KS(e, n, i) {
    Wa.S(e, n, i);
    var o = tl;
    if (o && e) {
      var f = Lt(o).hoistableStyles, d = nl(e);
      n = n || "default";
      var x = f.get(d);
      if (!x) {
        var M = { loading: 0, preload: null };
        if (x = o.querySelector(
          so(d)
        ))
          M.loading = 5;
        else {
          e = p(
            { rel: "stylesheet", href: e, "data-precedence": n },
            i
          ), (i = Jn.get(d)) && fd(e, i);
          var q = x = o.createElement("link");
          at(q), sn(q, "link", e), q._p = new Promise(function(ae, ue) {
            q.onload = ae, q.onerror = ue;
          }), q.addEventListener("load", function() {
            M.loading |= 1;
          }), q.addEventListener("error", function() {
            M.loading |= 2;
          }), M.loading |= 4, Fs(x, n, o);
        }
        x = {
          type: "stylesheet",
          instance: x,
          count: 1,
          state: M
        }, f.set(d, x);
      }
    }
  }
  function PS(e, n) {
    Wa.X(e, n);
    var i = tl;
    if (i && e) {
      var o = Lt(i).hoistableScripts, f = al(e), d = o.get(f);
      d || (d = i.querySelector(uo(f)), d || (e = p({ src: e, async: !0 }, n), (n = Jn.get(f)) && dd(e, n), d = i.createElement("script"), at(d), sn(d, "link", e), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, o.set(f, d));
    }
  }
  function JS(e, n) {
    Wa.M(e, n);
    var i = tl;
    if (i && e) {
      var o = Lt(i).hoistableScripts, f = al(e), d = o.get(f);
      d || (d = i.querySelector(uo(f)), d || (e = p({ src: e, async: !0, type: "module" }, n), (n = Jn.get(f)) && dd(e, n), d = i.createElement("script"), at(d), sn(d, "link", e), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, o.set(f, d));
    }
  }
  function M0(e, n, i, o) {
    var f = (f = he.current) ? Qs(f) : null;
    if (!f) throw Error(l(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (n = nl(i.href), i = Lt(
          f
        ).hoistableStyles, o = i.get(n), o || (o = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          e = nl(i.href);
          var d = Lt(
            f
          ).hoistableStyles, x = d.get(e);
          if (x || (f = f.ownerDocument || f, x = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, d.set(e, x), (d = f.querySelector(
            so(e)
          )) && !d._p && (x.instance = d, x.state.loading = 5), Jn.has(e) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, Jn.set(e, i), d || WS(
            f,
            e,
            i,
            x.state
          ))), n && o === null)
            throw Error(l(528, ""));
          return x;
        }
        if (n && o !== null)
          throw Error(l(529, ""));
        return null;
      case "script":
        return n = i.async, i = i.src, typeof i == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = al(i), i = Lt(
          f
        ).hoistableScripts, o = i.get(n), o || (o = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, i.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(l(444, e));
    }
  }
  function nl(e) {
    return 'href="' + an(e) + '"';
  }
  function so(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function D0(e) {
    return p({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function WS(e, n, i, o) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? o.loading = 1 : (n = e.createElement("link"), o.preload = n, n.addEventListener("load", function() {
      return o.loading |= 1;
    }), n.addEventListener("error", function() {
      return o.loading |= 2;
    }), sn(n, "link", i), at(n), e.head.appendChild(n));
  }
  function al(e) {
    return '[src="' + an(e) + '"]';
  }
  function uo(e) {
    return "script[async]" + e;
  }
  function A0(e, n, i) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var o = e.querySelector(
            'style[data-href~="' + an(i.href) + '"]'
          );
          if (o)
            return n.instance = o, at(o), o;
          var f = p({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null
          });
          return o = (e.ownerDocument || e).createElement(
            "style"
          ), at(o), sn(o, "style", f), Fs(o, i.precedence, e), n.instance = o;
        case "stylesheet":
          f = nl(i.href);
          var d = e.querySelector(
            so(f)
          );
          if (d)
            return n.state.loading |= 4, n.instance = d, at(d), d;
          o = D0(i), (f = Jn.get(f)) && fd(o, f), d = (e.ownerDocument || e).createElement("link"), at(d);
          var x = d;
          return x._p = new Promise(function(M, q) {
            x.onload = M, x.onerror = q;
          }), sn(d, "link", o), n.state.loading |= 4, Fs(d, i.precedence, e), n.instance = d;
        case "script":
          return d = al(i.src), (f = e.querySelector(
            uo(d)
          )) ? (n.instance = f, at(f), f) : (o = i, (f = Jn.get(d)) && (o = p({}, i), dd(o, f)), e = e.ownerDocument || e, f = e.createElement("script"), at(f), sn(f, "link", o), e.head.appendChild(f), n.instance = f);
        case "void":
          return null;
        default:
          throw Error(l(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (o = n.instance, n.state.loading |= 4, Fs(o, i.precedence, e));
    return n.instance;
  }
  function Fs(e, n, i) {
    for (var o = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), f = o.length ? o[o.length - 1] : null, d = f, x = 0; x < o.length; x++) {
      var M = o[x];
      if (M.dataset.precedence === n) d = M;
      else if (d !== f) break;
    }
    d ? d.parentNode.insertBefore(e, d.nextSibling) : (n = i.nodeType === 9 ? i.head : i, n.insertBefore(e, n.firstChild));
  }
  function fd(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function dd(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var Ks = null;
  function z0(e, n, i) {
    if (Ks === null) {
      var o = /* @__PURE__ */ new Map(), f = Ks = /* @__PURE__ */ new Map();
      f.set(i, o);
    } else
      f = Ks, o = f.get(i), o || (o = /* @__PURE__ */ new Map(), f.set(i, o));
    if (o.has(e)) return o;
    for (o.set(e, null), i = i.getElementsByTagName(e), f = 0; f < i.length; f++) {
      var d = i[f];
      if (!(d[Ge] || d[ve] || e === "link" && d.getAttribute("rel") === "stylesheet") && d.namespaceURI !== "http://www.w3.org/2000/svg") {
        var x = d.getAttribute(n) || "";
        x = e + x;
        var M = o.get(x);
        M ? M.push(d) : o.set(x, [d]);
      }
    }
    return o;
  }
  function O0(e, n, i) {
    e = e.ownerDocument || e, e.head.insertBefore(
      i,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function eE(e, n, i) {
    if (i === 1 || n.itemProp != null) return !1;
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
  function L0(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function tE(e, n, i, o) {
    if (i.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var f = nl(o.href), d = n.querySelector(
          so(f)
        );
        if (d) {
          n = d._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = Ps.bind(e), n.then(e, e)), i.state.loading |= 4, i.instance = d, at(d);
          return;
        }
        d = n.ownerDocument || n, o = D0(o), (f = Jn.get(f)) && fd(o, f), d = d.createElement("link"), at(d);
        var x = d;
        x._p = new Promise(function(M, q) {
          x.onload = M, x.onerror = q;
        }), sn(d, "link", o), i.instance = d;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(i, n), (n = i.state.preload) && (i.state.loading & 3) === 0 && (e.count++, i = Ps.bind(e), n.addEventListener("load", i), n.addEventListener("error", i));
    }
  }
  var hd = 0;
  function nE(e, n) {
    return e.stylesheets && e.count === 0 && Ws(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(i) {
      var o = setTimeout(function() {
        if (e.stylesheets && Ws(e, e.stylesheets), e.unsuspend) {
          var d = e.unsuspend;
          e.unsuspend = null, d();
        }
      }, 6e4 + n);
      0 < e.imgBytes && hd === 0 && (hd = 62500 * HS());
      var f = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Ws(e, e.stylesheets), e.unsuspend)) {
            var d = e.unsuspend;
            e.unsuspend = null, d();
          }
        },
        (e.imgBytes > hd ? 50 : 800) + n
      );
      return e.unsuspend = i, function() {
        e.unsuspend = null, clearTimeout(o), clearTimeout(f);
      };
    } : null;
  }
  function Ps() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Ws(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Js = null;
  function Ws(e, n) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Js = /* @__PURE__ */ new Map(), n.forEach(aE, e), Js = null, Ps.call(e));
  }
  function aE(e, n) {
    if (!(n.state.loading & 4)) {
      var i = Js.get(e);
      if (i) var o = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), Js.set(e, i);
        for (var f = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), d = 0; d < f.length; d++) {
          var x = f[d];
          (x.nodeName === "LINK" || x.getAttribute("media") !== "not all") && (i.set(x.dataset.precedence, x), o = x);
        }
        o && i.set(null, o);
      }
      f = n.instance, x = f.getAttribute("data-precedence"), d = i.get(x) || o, d === o && i.set(null, f), i.set(x, f), this.count++, o = Ps.bind(this), f.addEventListener("load", o), f.addEventListener("error", o), d ? d.parentNode.insertBefore(f, d.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(f, e.firstChild)), n.state.loading |= 4;
    }
  }
  var co = {
    $$typeof: E,
    Provider: null,
    Consumer: null,
    _currentValue: Y,
    _currentValue2: Y,
    _threadCount: 0
  };
  function iE(e, n, i, o, f, d, x, M, q) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = mn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = mn(0), this.hiddenUpdates = mn(null), this.identifierPrefix = o, this.onUncaughtError = f, this.onCaughtError = d, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = q, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function j0(e, n, i, o, f, d, x, M, q, ae, ue, fe) {
    return e = new iE(
      e,
      n,
      i,
      x,
      q,
      ae,
      ue,
      fe,
      M
    ), n = 1, d === !0 && (n |= 24), d = On(3, null, null, n), e.current = d, d.stateNode = e, n = Gc(), n.refCount++, e.pooledCache = n, n.refCount++, d.memoizedState = {
      element: o,
      isDehydrated: i,
      cache: n
    }, Fc(d), e;
  }
  function H0(e) {
    return e ? (e = Lr, e) : Lr;
  }
  function B0(e, n, i, o, f, d) {
    f = H0(f), o.context === null ? o.context = f : o.pendingContext = f, o = wi(n), o.payload = { element: i }, d = d === void 0 ? null : d, d !== null && (o.callback = d), i = Si(e, o, n), i !== null && (Rn(i, e, n), Yl(i, e, n));
  }
  function U0(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var i = e.retryLane;
      e.retryLane = i !== 0 && i < n ? i : n;
    }
  }
  function md(e, n) {
    U0(e, n), (e = e.alternate) && U0(e, n);
  }
  function k0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Ki(e, 67108864);
      n !== null && Rn(n, e, 67108864), md(e, 67108864);
    }
  }
  function V0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Un();
      n = Q(n);
      var i = Ki(e, n);
      i !== null && Rn(i, e, n), md(e, n);
    }
  }
  var eu = !0;
  function rE(e, n, i, o) {
    var f = C.T;
    C.T = null;
    var d = z.p;
    try {
      z.p = 2, pd(e, n, i, o);
    } finally {
      z.p = d, C.T = f;
    }
  }
  function lE(e, n, i, o) {
    var f = C.T;
    C.T = null;
    var d = z.p;
    try {
      z.p = 8, pd(e, n, i, o);
    } finally {
      z.p = d, C.T = f;
    }
  }
  function pd(e, n, i, o) {
    if (eu) {
      var f = gd(o);
      if (f === null)
        td(
          e,
          n,
          o,
          tu,
          i
        ), Y0(e, o);
      else if (sE(
        f,
        e,
        n,
        i,
        o
      ))
        o.stopPropagation();
      else if (Y0(e, o), n & 4 && -1 < oE.indexOf(e)) {
        for (; f !== null; ) {
          var d = st(f);
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (d = d.stateNode, d.current.memoizedState.isDehydrated) {
                  var x = un(d.pendingLanes);
                  if (x !== 0) {
                    var M = d;
                    for (M.pendingLanes |= 2, M.entangledLanes |= 2; x; ) {
                      var q = 1 << 31 - kt(x);
                      M.entanglements[1] |= q, x &= ~q;
                    }
                    Ra(d), (ht & 6) === 0 && (Bs = Fe() + 500, io(0));
                  }
                }
                break;
              case 31:
              case 13:
                M = Ki(d, 2), M !== null && Rn(M, d, 2), ks(), md(d, 2);
            }
          if (d = gd(o), d === null && td(
            e,
            n,
            o,
            tu,
            i
          ), d === f) break;
          f = d;
        }
        f !== null && o.stopPropagation();
      } else
        td(
          e,
          n,
          o,
          null,
          i
        );
    }
  }
  function gd(e) {
    return e = yc(e), yd(e);
  }
  var tu = null;
  function yd(e) {
    if (tu = null, e = Rt(e), e !== null) {
      var n = u(e);
      if (n === null) e = null;
      else {
        var i = n.tag;
        if (i === 13) {
          if (e = c(n), e !== null) return e;
          e = null;
        } else if (i === 31) {
          if (e = h(n), e !== null) return e;
          e = null;
        } else if (i === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          e = null;
        } else n !== e && (e = null);
      }
    }
    return tu = e, null;
  }
  function q0(e) {
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
        switch (gt()) {
          case yt:
            return 2;
          case Xt:
            return 8;
          case jt:
          case mt:
            return 32;
          case ot:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var vd = !1, Oi = null, Li = null, ji = null, fo = /* @__PURE__ */ new Map(), ho = /* @__PURE__ */ new Map(), Hi = [], oE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Y0(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        Oi = null;
        break;
      case "dragenter":
      case "dragleave":
        Li = null;
        break;
      case "mouseover":
      case "mouseout":
        ji = null;
        break;
      case "pointerover":
      case "pointerout":
        fo.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        ho.delete(n.pointerId);
    }
  }
  function mo(e, n, i, o, f, d) {
    return e === null || e.nativeEvent !== d ? (e = {
      blockedOn: n,
      domEventName: i,
      eventSystemFlags: o,
      nativeEvent: d,
      targetContainers: [f]
    }, n !== null && (n = st(n), n !== null && k0(n)), e) : (e.eventSystemFlags |= o, n = e.targetContainers, f !== null && n.indexOf(f) === -1 && n.push(f), e);
  }
  function sE(e, n, i, o, f) {
    switch (n) {
      case "focusin":
        return Oi = mo(
          Oi,
          e,
          n,
          i,
          o,
          f
        ), !0;
      case "dragenter":
        return Li = mo(
          Li,
          e,
          n,
          i,
          o,
          f
        ), !0;
      case "mouseover":
        return ji = mo(
          ji,
          e,
          n,
          i,
          o,
          f
        ), !0;
      case "pointerover":
        var d = f.pointerId;
        return fo.set(
          d,
          mo(
            fo.get(d) || null,
            e,
            n,
            i,
            o,
            f
          )
        ), !0;
      case "gotpointercapture":
        return d = f.pointerId, ho.set(
          d,
          mo(
            ho.get(d) || null,
            e,
            n,
            i,
            o,
            f
          )
        ), !0;
    }
    return !1;
  }
  function $0(e) {
    var n = Rt(e.target);
    if (n !== null) {
      var i = u(n);
      if (i !== null) {
        if (n = i.tag, n === 13) {
          if (n = c(i), n !== null) {
            e.blockedOn = n, pe(e.priority, function() {
              V0(i);
            });
            return;
          }
        } else if (n === 31) {
          if (n = h(i), n !== null) {
            e.blockedOn = n, pe(e.priority, function() {
              V0(i);
            });
            return;
          }
        } else if (n === 3 && i.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = i.tag === 3 ? i.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function nu(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length; ) {
      var i = gd(e.nativeEvent);
      if (i === null) {
        i = e.nativeEvent;
        var o = new i.constructor(
          i.type,
          i
        );
        gc = o, i.target.dispatchEvent(o), gc = null;
      } else
        return n = st(i), n !== null && k0(n), e.blockedOn = i, !1;
      n.shift();
    }
    return !0;
  }
  function X0(e, n, i) {
    nu(e) && i.delete(n);
  }
  function uE() {
    vd = !1, Oi !== null && nu(Oi) && (Oi = null), Li !== null && nu(Li) && (Li = null), ji !== null && nu(ji) && (ji = null), fo.forEach(X0), ho.forEach(X0);
  }
  function au(e, n) {
    e.blockedOn === n && (e.blockedOn = null, vd || (vd = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      uE
    )));
  }
  var iu = null;
  function G0(e) {
    iu !== e && (iu = e, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      function() {
        iu === e && (iu = null);
        for (var n = 0; n < e.length; n += 3) {
          var i = e[n], o = e[n + 1], f = e[n + 2];
          if (typeof o != "function") {
            if (yd(o || i) === null)
              continue;
            break;
          }
          var d = st(i);
          d !== null && (e.splice(n, 3), n -= 3, gf(
            d,
            {
              pending: !0,
              data: f,
              method: i.method,
              action: o
            },
            o,
            f
          ));
        }
      }
    ));
  }
  function il(e) {
    function n(q) {
      return au(q, e);
    }
    Oi !== null && au(Oi, e), Li !== null && au(Li, e), ji !== null && au(ji, e), fo.forEach(n), ho.forEach(n);
    for (var i = 0; i < Hi.length; i++) {
      var o = Hi[i];
      o.blockedOn === e && (o.blockedOn = null);
    }
    for (; 0 < Hi.length && (i = Hi[0], i.blockedOn === null); )
      $0(i), i.blockedOn === null && Hi.shift();
    if (i = (e.ownerDocument || e).$$reactFormReplay, i != null)
      for (o = 0; o < i.length; o += 3) {
        var f = i[o], d = i[o + 1], x = f[we] || null;
        if (typeof d == "function")
          x || G0(i);
        else if (x) {
          var M = null;
          if (d && d.hasAttribute("formAction")) {
            if (f = d, x = d[we] || null)
              M = x.formAction;
            else if (yd(f) !== null) continue;
          } else M = x.action;
          typeof M == "function" ? i[o + 1] = M : (i.splice(o, 3), o -= 3), G0(i);
        }
      }
  }
  function I0() {
    function e(d) {
      d.canIntercept && d.info === "react-transition" && d.intercept({
        handler: function() {
          return new Promise(function(x) {
            return f = x;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function n() {
      f !== null && (f(), f = null), o || setTimeout(i, 20);
    }
    function i() {
      if (!o && !navigation.transition) {
        var d = navigation.currentEntry;
        d && d.url != null && navigation.navigate(d.url, {
          state: d.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var o = !1, f = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(i, 100), function() {
        o = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), f !== null && (f(), f = null);
      };
    }
  }
  function bd(e) {
    this._internalRoot = e;
  }
  ru.prototype.render = bd.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(l(409));
    var i = n.current, o = Un();
    B0(i, o, e, n, null, null);
  }, ru.prototype.unmount = bd.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      B0(e.current, 2, null, e, null, null), ks(), n[be] = null;
    }
  };
  function ru(e) {
    this._internalRoot = e;
  }
  ru.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = de();
      e = { blockedOn: null, target: e, priority: n };
      for (var i = 0; i < Hi.length && n !== 0 && n < Hi[i].priority; i++) ;
      Hi.splice(i, 0, e), i === 0 && $0(e);
    }
  };
  var Z0 = a.version;
  if (Z0 !== "19.2.7")
    throw Error(
      l(
        527,
        Z0,
        "19.2.7"
      )
    );
  z.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(l(188)) : (e = Object.keys(e).join(","), Error(l(268, e)));
    return e = m(n), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var cE = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: C,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var lu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!lu.isDisabled && lu.supportsFiber)
      try {
        tn = lu.inject(
          cE
        ), Kt = lu;
      } catch {
      }
  }
  return go.createRoot = function(e, n) {
    if (!s(e)) throw Error(l(299));
    var i = !1, o = "", f = eg, d = tg, x = ng;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (f = n.onUncaughtError), n.onCaughtError !== void 0 && (d = n.onCaughtError), n.onRecoverableError !== void 0 && (x = n.onRecoverableError)), n = j0(
      e,
      1,
      !1,
      null,
      null,
      i,
      o,
      null,
      f,
      d,
      x,
      I0
    ), e[be] = n.current, ed(e), new bd(n);
  }, go.hydrateRoot = function(e, n, i) {
    if (!s(e)) throw Error(l(299));
    var o = !1, f = "", d = eg, x = tg, M = ng, q = null;
    return i != null && (i.unstable_strictMode === !0 && (o = !0), i.identifierPrefix !== void 0 && (f = i.identifierPrefix), i.onUncaughtError !== void 0 && (d = i.onUncaughtError), i.onCaughtError !== void 0 && (x = i.onCaughtError), i.onRecoverableError !== void 0 && (M = i.onRecoverableError), i.formState !== void 0 && (q = i.formState)), n = j0(
      e,
      1,
      !0,
      n,
      i ?? null,
      o,
      f,
      q,
      d,
      x,
      M,
      I0
    ), n.context = H0(null), i = n.current, o = Un(), o = Q(o), f = wi(o), f.callback = null, Si(i, f, o), i = o, n.current.lanes = i, pt(n, i), Ra(n), e[be] = n.current, ed(e), new ru(n);
  }, go.version = "19.2.7", go;
}
var ay;
function wE() {
  if (ay) return Sd.exports;
  ay = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), Sd.exports = xE(), Sd.exports;
}
var SE = wE();
/**
 * react-router v7.17.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var Sb = (t) => {
  throw TypeError(t);
}, Eb = (t, a, r) => a.has(t) || Sb("Cannot " + r), Wn = (t, a, r) => (Eb(t, a, "read from private field"), r ? r.call(t) : a.get(t)), So = (t, a, r) => a.has(t) ? Sb("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, r), Ca = (t, a, r, l) => (Eb(t, a, "write to private field"), a.set(t, r), r);
function iy(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function EE(t = {}) {
  let { initialEntries: a = ["/"], initialIndex: r, v5Compat: l = !1 } = t, s;
  s = a.map(
    (b, w) => y(
      b,
      typeof b == "string" ? null : b.state,
      w === 0 ? "default" : void 0,
      typeof b == "string" ? void 0 : b.mask
    )
  );
  let u = g(
    r ?? s.length - 1
  ), c = "POP", h = null;
  function g(b) {
    return Math.min(Math.max(b, 0), s.length - 1);
  }
  function m() {
    return s[u];
  }
  function y(b, w = null, R, T) {
    let _ = Pd(
      s ? m().pathname : "/",
      b,
      w,
      R,
      T
    );
    return $t(
      _.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        b
      )}`
    ), _;
  }
  function p(b) {
    return typeof b == "string" ? b : La(b);
  }
  return {
    get index() {
      return u;
    },
    get action() {
      return c;
    },
    get location() {
      return m();
    },
    createHref: p,
    createURL(b) {
      return new URL(p(b), "http://localhost");
    },
    encodeLocation(b) {
      let w = typeof b == "string" ? va(b) : b;
      return {
        pathname: w.pathname || "",
        search: w.search || "",
        hash: w.hash || ""
      };
    },
    push(b, w) {
      c = "PUSH";
      let R = iy(b) ? b : y(b, w);
      u += 1, s.splice(u, s.length, R), l && h && h({ action: c, location: R, delta: 1 });
    },
    replace(b, w) {
      c = "REPLACE";
      let R = iy(b) ? b : y(b, w);
      s[u] = R, l && h && h({ action: c, location: R, delta: 0 });
    },
    go(b) {
      c = "POP";
      let w = g(u + b), R = s[w];
      u = w, h && h({ action: c, location: R, delta: b });
    },
    listen(b) {
      return h = b, () => {
        h = null;
      };
    }
  };
}
function Ze(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function $t(t, a) {
  if (!t) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function _E() {
  return Math.random().toString(36).substring(2, 10);
}
function Pd(t, a, r = null, l, s) {
  return {
    pathname: typeof t == "string" ? t : t.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? va(a) : a,
    state: r,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || l || _E(),
    mask: s
  };
}
function La({
  pathname: t = "/",
  search: a = "",
  hash: r = ""
}) {
  return a && a !== "?" && (t += a.charAt(0) === "?" ? a : "?" + a), r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r), t;
}
function va(t) {
  let a = {};
  if (t) {
    let r = t.indexOf("#");
    r >= 0 && (a.hash = t.substring(r), t = t.substring(0, r));
    let l = t.indexOf("?");
    l >= 0 && (a.search = t.substring(l), t = t.substring(0, l)), t && (a.pathname = t);
  }
  return a;
}
function NE(t, a, r = !1) {
  let l = "http://localhost";
  t && (l = t.location.origin !== "null" ? t.location.origin : t.location.href), Ze(l, "No window.location.(origin|href) available to create URL");
  let s = typeof a == "string" ? a : La(a);
  return s = s.replace(/ $/, "%20"), !r && s.startsWith("//") && (s = l + s), new URL(s, l);
}
var Eo, ry = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(t) {
    if (So(this, Eo, /* @__PURE__ */ new Map()), t)
      for (let [a, r] of t)
        this.set(a, r);
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
    if (Wn(this, Eo).has(t))
      return Wn(this, Eo).get(t);
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
    Wn(this, Eo).set(t, a);
  }
};
Eo = /* @__PURE__ */ new WeakMap();
var RE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function CE(t) {
  return RE.has(
    t
  );
}
var TE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function ME(t) {
  return TE.has(
    t
  );
}
function DE(t) {
  return t.index === !0;
}
function Mo(t, a, r = [], l = {}, s = !1) {
  return t.map((u, c) => {
    let h = [...r, String(c)], g = typeof u.id == "string" ? u.id : h.join("-");
    if (Ze(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), Ze(
      s || !l[g],
      `Found a route id collision on id "${g}".  Route id's must be globally unique within Data Router usages`
    ), DE(u)) {
      let m = {
        ...u,
        id: g
      };
      return l[g] = ly(
        m,
        a(m)
      ), m;
    } else {
      let m = {
        ...u,
        id: g,
        children: void 0
      };
      return l[g] = ly(
        m,
        a(m)
      ), u.children && (m.children = Mo(
        u.children,
        a,
        h,
        l,
        s
      )), m;
    }
  });
}
function ly(t, a) {
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
function _b(t, a, r = "/") {
  return da(t, a, r, !1);
}
function da(t, a, r, l, s) {
  let u = typeof a == "string" ? va(a) : a, c = aa(u.pathname || "/", r);
  if (c == null)
    return null;
  let h = s ?? Cu(t), g = null, m = $E(c);
  for (let y = 0; g == null && y < h.length; ++y)
    g = qE(
      h[y],
      m,
      l
    );
  return g;
}
function AE(t, a) {
  let { route: r, pathname: l, params: s } = t;
  return {
    id: r.id,
    pathname: l,
    params: s,
    data: a[r.id],
    loaderData: a[r.id],
    handle: r.handle
  };
}
function Cu(t) {
  let a = Nb(t);
  return zE(a), a;
}
function Nb(t, a = [], r = [], l = "", s = !1) {
  let u = (c, h, g = s, m) => {
    let y = {
      relativePath: m === void 0 ? c.path || "" : m,
      caseSensitive: c.caseSensitive === !0,
      childrenIndex: h,
      route: c
    };
    if (y.relativePath.startsWith("/")) {
      if (!y.relativePath.startsWith(l) && g)
        return;
      Ze(
        y.relativePath.startsWith(l),
        `Absolute route path "${y.relativePath}" nested under path "${l}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), y.relativePath = y.relativePath.slice(l.length);
    }
    let p = na([l, y.relativePath]), v = r.concat(y);
    c.children && c.children.length > 0 && (Ze(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      c.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${p}".`
    ), Nb(
      c.children,
      a,
      v,
      p,
      g
    )), !(c.path == null && !c.index) && a.push({
      path: p,
      score: kE(p, c.index),
      routesMeta: v
    });
  };
  return t.forEach((c, h) => {
    if (c.path === "" || !c.path?.includes("?"))
      u(c, h);
    else
      for (let g of Rb(c.path))
        u(c, h, !0, g);
  }), a;
}
function Rb(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [r, ...l] = a, s = r.endsWith("?"), u = r.replace(/\?$/, "");
  if (l.length === 0)
    return s ? [u, ""] : [u];
  let c = Rb(l.join("/")), h = [];
  return h.push(
    ...c.map(
      (g) => g === "" ? u : [u, g].join("/")
    )
  ), s && h.push(...c), h.map(
    (g) => t.startsWith("/") && g === "" ? "/" : g
  );
}
function zE(t) {
  t.sort(
    (a, r) => a.score !== r.score ? r.score - a.score : VE(
      a.routesMeta.map((l) => l.childrenIndex),
      r.routesMeta.map((l) => l.childrenIndex)
    )
  );
}
var OE = /^:[\w-]+$/, LE = 3, jE = 2, HE = 1, BE = 10, UE = -2, oy = (t) => t === "*";
function kE(t, a) {
  let r = t.split("/"), l = r.length;
  return r.some(oy) && (l += UE), a && (l += jE), r.filter((s) => !oy(s)).reduce(
    (s, u) => s + (OE.test(u) ? LE : u === "" ? HE : BE),
    l
  );
}
function VE(t, a) {
  return t.length === a.length && t.slice(0, -1).every((l, s) => l === a[s]) ? (
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
function qE(t, a, r = !1) {
  let { routesMeta: l } = t, s = {}, u = "/", c = [];
  for (let h = 0; h < l.length; ++h) {
    let g = l[h], m = h === l.length - 1, y = u === "/" ? a : a.slice(u.length) || "/", p = Hu(
      { path: g.relativePath, caseSensitive: g.caseSensitive, end: m },
      y
    ), v = g.route;
    if (!p && m && r && !l[l.length - 1].route.index && (p = Hu(
      {
        path: g.relativePath,
        caseSensitive: g.caseSensitive,
        end: !1
      },
      y
    )), !p)
      return null;
    Object.assign(s, p.params), c.push({
      // TODO: Can this as be avoided?
      params: s,
      pathname: na([u, p.pathname]),
      pathnameBase: IE(
        na([u, p.pathnameBase])
      ),
      route: v
    }), p.pathnameBase !== "/" && (u = na([u, p.pathnameBase]));
  }
  return c;
}
function Hu(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [r, l] = YE(
    t.path,
    t.caseSensitive,
    t.end
  ), s = a.match(r);
  if (!s) return null;
  let u = s[0], c = u.replace(/(.)\/+$/, "$1"), h = s.slice(1);
  return {
    params: l.reduce(
      (m, { paramName: y, isOptional: p }, v) => {
        if (y === "*") {
          let w = h[v] || "";
          c = u.slice(0, u.length - w.length).replace(/(.)\/+$/, "$1");
        }
        const b = h[v];
        return p && !b ? m[y] = void 0 : m[y] = (b || "").replace(/%2F/g, "/"), m;
      },
      {}
    ),
    pathname: u,
    pathnameBase: c,
    pattern: t
  };
}
function YE(t, a = !1, r = !0) {
  $t(
    t === "*" || !t.endsWith("*") || t.endsWith("/*"),
    `Route path "${t}" will be treated as if it were "${t.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/, "/*")}".`
  );
  let l = [], s = "^" + t.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (c, h, g, m, y) => {
      if (l.push({ paramName: h, isOptional: g != null }), g) {
        let p = y.charAt(m + c.length);
        return p && p !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return t.endsWith("*") ? (l.push({ paramName: "*" }), s += t === "*" || t === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? s += "\\/*$" : t !== "" && t !== "/" && (s += "(?:(?=\\/|$))"), [new RegExp(s, a ? void 0 : "i"), l];
}
function $E(t) {
  try {
    return t.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return $t(
      !1,
      `The URL path "${t}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), t;
  }
}
function aa(t, a) {
  if (a === "/") return t;
  if (!t.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let r = a.endsWith("/") ? a.length - 1 : a.length, l = t.charAt(r);
  return l && l !== "/" ? null : t.slice(r) || "/";
}
function XE({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : na([t, a]);
}
var Cb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Dh = (t) => Cb.test(t);
function GE(t, a = "/") {
  let {
    pathname: r,
    search: l = "",
    hash: s = ""
  } = typeof t == "string" ? va(t) : t, u;
  return r ? (r = zh(r), r.startsWith("/") ? u = sy(r.substring(1), "/") : u = sy(r, a)) : u = a, {
    pathname: u,
    search: ZE(l),
    hash: QE(s)
  };
}
function sy(t, a) {
  let r = Bu(a).split("/");
  return t.split("/").forEach((s) => {
    s === ".." ? r.length > 1 && r.pop() : s !== "." && r.push(s);
  }), r.length > 1 ? r.join("/") : "/";
}
function Rd(t, a, r, l) {
  return `Cannot include a '${t}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    l
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Tb(t) {
  return t.filter(
    (a, r) => r === 0 || a.route.path && a.route.path.length > 0
  );
}
function Ah(t) {
  let a = Tb(t);
  return a.map(
    (r, l) => l === a.length - 1 ? r.pathname : r.pathnameBase
  );
}
function Ku(t, a, r, l = !1) {
  let s;
  typeof t == "string" ? s = va(t) : (s = { ...t }, Ze(
    !s.pathname || !s.pathname.includes("?"),
    Rd("?", "pathname", "search", s)
  ), Ze(
    !s.pathname || !s.pathname.includes("#"),
    Rd("#", "pathname", "hash", s)
  ), Ze(
    !s.search || !s.search.includes("#"),
    Rd("#", "search", "hash", s)
  ));
  let u = t === "" || s.pathname === "", c = u ? "/" : s.pathname, h;
  if (c == null)
    h = r;
  else {
    let p = a.length - 1;
    if (!l && c.startsWith("..")) {
      let v = c.split("/");
      for (; v[0] === ".."; )
        v.shift(), p -= 1;
      s.pathname = v.join("/");
    }
    h = p >= 0 ? a[p] : "/";
  }
  let g = GE(s, h), m = c && c !== "/" && c.endsWith("/"), y = (u || c === ".") && r.endsWith("/");
  return !g.pathname.endsWith("/") && (m || y) && (g.pathname += "/"), g;
}
var zh = (t) => t.replace(/\/\/+/g, "/"), na = (t) => zh(t.join("/")), Bu = (t) => t.replace(/\/+$/, ""), IE = (t) => Bu(t).replace(/^\/*/, "/"), ZE = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, QE = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, uy = (t, a = 302) => {
  let r = a;
  typeof r == "number" ? r = { status: r } : typeof r.status > "u" && (r.status = 302);
  let l = new Headers(r.headers);
  return l.set("Location", t), new Response(null, { ...r, headers: l });
}, Pu = class {
  constructor(t, a, r, l = !1) {
    this.status = t, this.statusText = a || "", this.internal = l, r instanceof Error ? (this.data = r.toString(), this.error = r) : this.data = r;
  }
};
function Do(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.internal == "boolean" && "data" in t;
}
function Yo(t) {
  let a = t.map((r) => r.route.path).filter(Boolean);
  return na(a) || "/";
}
var Mb = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Db(t, a) {
  let r = t;
  if (typeof r != "string" || !Cb.test(r))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: r
    };
  let l = r, s = !1;
  if (Mb)
    try {
      let u = new URL(window.location.href), c = r.startsWith("//") ? new URL(u.protocol + r) : new URL(r), h = aa(c.pathname, a);
      c.origin === u.origin && h != null ? r = h + c.search + c.hash : s = !0;
    } catch {
      $t(
        !1,
        `<Link to="${r}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return {
    absoluteURL: l,
    isExternal: s,
    to: r
  };
}
var $i = Symbol("Uninstrumented");
function FE(t, a) {
  let r = {
    lazy: [],
    "lazy.loader": [],
    "lazy.action": [],
    "lazy.middleware": [],
    middleware: [],
    loader: [],
    action: []
  };
  t.forEach(
    (s) => s({
      id: a.id,
      index: a.index,
      path: a.path,
      instrument(u) {
        let c = Object.keys(r);
        for (let h of c)
          u[h] && r[h].push(u[h]);
      }
    })
  );
  let l = {};
  if (typeof a.lazy == "function" && r.lazy.length > 0) {
    let s = ul(r.lazy, a.lazy, () => {
    });
    s && (l.lazy = s);
  }
  if (typeof a.lazy == "object") {
    let s = a.lazy;
    ["middleware", "loader", "action"].forEach((u) => {
      let c = s[u], h = r[`lazy.${u}`];
      if (typeof c == "function" && h.length > 0) {
        let g = ul(h, c, () => {
        });
        g && (l.lazy = Object.assign(l.lazy || {}, {
          [u]: g
        }));
      }
    });
  }
  return ["loader", "action"].forEach((s) => {
    let u = a[s];
    if (typeof u == "function" && r[s].length > 0) {
      let c = u[$i] ?? u, h = ul(
        r[s],
        c,
        (...g) => cy(g[0])
      );
      h && (s === "loader" && c.hydrate === !0 && (h.hydrate = !0), h[$i] = c, l[s] = h);
    }
  }), a.middleware && a.middleware.length > 0 && r.middleware.length > 0 && (l.middleware = a.middleware.map((s) => {
    let u = s[$i] ?? s, c = ul(
      r.middleware,
      u,
      (...h) => cy(h[0])
    );
    return c ? (c[$i] = u, c) : s;
  })), l;
}
function KE(t, a) {
  let r = {
    navigate: [],
    fetch: []
  };
  if (a.forEach(
    (l) => l({
      instrument(s) {
        let u = Object.keys(s);
        for (let c of u)
          s[c] && r[c].push(s[c]);
      }
    })
  ), r.navigate.length > 0) {
    let l = t.navigate[$i] ?? t.navigate, s = ul(
      r.navigate,
      l,
      (...u) => {
        let [c, h] = u;
        return {
          to: typeof c == "number" || typeof c == "string" ? c : c ? La(c) : ".",
          ...fy(t, h ?? {})
        };
      }
    );
    s && (s[$i] = l, t.navigate = s);
  }
  if (r.fetch.length > 0) {
    let l = t.fetch[$i] ?? t.fetch, s = ul(r.fetch, l, (...u) => {
      let [c, , h, g] = u;
      return {
        href: h ?? ".",
        fetcherKey: c,
        ...fy(t, g ?? {})
      };
    });
    s && (s[$i] = l, t.fetch = s);
  }
  return t;
}
function ul(t, a, r) {
  return t.length === 0 ? null : async (...l) => {
    let s = await Ab(
      t,
      r(...l),
      () => a(...l),
      t.length - 1
    );
    if (s.type === "error")
      throw s.value;
    return s.value;
  };
}
async function Ab(t, a, r, l) {
  let s = t[l], u;
  if (s) {
    let c, h = async () => (c ? console.error("You cannot call instrumented handlers more than once") : c = Ab(t, a, r, l - 1), u = await c, Ze(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
    try {
      await s(h, a);
    } catch (g) {
      console.error("An instrumentation function threw an error:", g);
    }
    c || await h(), await c;
  } else
    try {
      u = { type: "success", value: await r() };
    } catch (c) {
      u = { type: "error", value: c };
    }
  return u || {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function cy(t) {
  let { request: a, context: r, params: l, pattern: s } = t;
  return {
    request: PE(a),
    params: { ...l },
    pattern: s,
    context: JE(r)
  };
}
function fy(t, a) {
  return {
    currentUrl: La(t.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function PE(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function JE(t) {
  if (e_(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var WE = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function e_(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === WE;
}
var zb = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], t_ = new Set(
  zb
), n_ = [
  "GET",
  ...zb
], a_ = new Set(n_), Ob = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), i_ = /* @__PURE__ */ new Set([307, 308]), Cd = {
  state: "idle",
  location: void 0,
  matches: void 0,
  historyAction: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, r_ = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, yo = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, l_ = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), Lb = "remix-router-transitions", jb = Symbol("ResetLoaderData"), dr, ll, Vi, ol, o_ = class {
  constructor(t) {
    So(this, dr), So(this, ll), So(this, Vi), So(this, ol), Ca(this, dr, t), Ca(this, ll, Cu(t));
  }
  /** The stable route tree */
  get stableRoutes() {
    return Wn(this, dr);
  }
  /** The in-flight route tree if one is active, otherwise the stable tree */
  get activeRoutes() {
    return Wn(this, Vi) ?? Wn(this, dr);
  }
  /** Pre-computed branches */
  get branches() {
    return Wn(this, ol) ?? Wn(this, ll);
  }
  get hasHMRRoutes() {
    return Wn(this, Vi) != null;
  }
  /** Replace the stable route tree and recompute its branches */
  setRoutes(t) {
    Ca(this, dr, t), Ca(this, ll, Cu(t));
  }
  /** Set a new in-flight route tree and recompute its branches */
  setHmrRoutes(t) {
    Ca(this, Vi, t), Ca(this, ol, Cu(t));
  }
  /** Commit in-flight routes/branches to the stable slot and clear in-flight */
  commitHmrRoutes() {
    Wn(this, Vi) && (Ca(this, dr, Wn(this, Vi)), Ca(this, ll, Wn(this, ol)), Ca(this, Vi, void 0), Ca(this, ol, void 0));
  }
};
dr = /* @__PURE__ */ new WeakMap();
ll = /* @__PURE__ */ new WeakMap();
Vi = /* @__PURE__ */ new WeakMap();
ol = /* @__PURE__ */ new WeakMap();
function s_(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, r = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Ze(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let l = t.hydrationRouteProperties || [], s = t.mapRouteProperties || l_, u = s;
  if (t.instrumentations) {
    let U = t.instrumentations;
    u = (Q) => ({
      ...s(Q),
      ...FE(
        U.map((J) => J.route).filter(Boolean),
        Q
      )
    });
  }
  let c = {}, h = new o_(
    Mo(
      t.routes,
      u,
      void 0,
      c
    )
  ), g = t.basename || "/";
  g.startsWith("/") || (g = `/${g}`);
  let m = t.dataStrategy || h_, y = {
    ...t.future
  }, p = null, v = /* @__PURE__ */ new Set(), b = null, w = null, R = null, T = null, _ = t.hydrationData != null, O = da(
    h.activeRoutes,
    t.history.location,
    g,
    !1,
    h.branches
  ), E = !1, L = null, B, H;
  if (O == null && !t.patchRoutesOnNavigation) {
    let U = ea(404, {
      pathname: t.history.location.pathname
    }), { matches: Q, route: J } = ou(h.activeRoutes);
    B = !0, H = !B, O = Q, L = { [J.id]: U };
  } else if (O && !t.hydrationData && mn(
    O,
    h.activeRoutes,
    t.history.location.pathname
  ).active && (O = null), O)
    if (O.some((U) => U.route.lazy))
      B = !1, H = !B;
    else if (!O.some((U) => Oh(U.route)))
      B = !0, H = !B;
    else {
      let U = t.hydrationData ? t.hydrationData.loaderData : null, Q = t.hydrationData ? t.hydrationData.errors : null, J = O;
      if (Q) {
        let de = O.findIndex(
          (pe) => Q[pe.route.id] !== void 0
        );
        J = J.slice(0, de + 1);
      }
      H = !1, B = !0, J.forEach((de) => {
        let pe = Hb(de.route, U, Q);
        H = H || pe.renderFallback, B = B && !pe.shouldLoad;
      });
    }
  else {
    B = !1, H = !B, O = [];
    let U = mn(
      null,
      h.activeRoutes,
      t.history.location.pathname
    );
    U.active && U.matches && (E = !0, O = U.matches);
  }
  let V, D = {
    historyAction: t.history.action,
    location: t.history.location,
    matches: O,
    initialized: B,
    renderFallback: H,
    navigation: Cd,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: t.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: t.hydrationData && t.hydrationData.loaderData || {},
    actionData: t.hydrationData && t.hydrationData.actionData || null,
    errors: t.hydrationData && t.hydrationData.errors || L,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, G = "POP", le = null, $ = !1, K, re = !1, j = /* @__PURE__ */ new Map(), I = null, C = !1, z = !1, Y = /* @__PURE__ */ new Set(), X = /* @__PURE__ */ new Map(), te = 0, A = -1, k = /* @__PURE__ */ new Map(), F = /* @__PURE__ */ new Set(), ee = /* @__PURE__ */ new Map(), se = /* @__PURE__ */ new Map(), he = /* @__PURE__ */ new Set(), me = /* @__PURE__ */ new Map(), W, ge = null;
  function ze() {
    if (p = t.history.listen(
      ({ action: U, location: Q, delta: J }) => {
        if (W) {
          W(), W = void 0;
          return;
        }
        $t(
          me.size === 0 || J != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let de = $n({
          currentLocation: D.location,
          nextLocation: Q,
          historyAction: U
        });
        if (de && J != null) {
          let pe = new Promise((Ee) => {
            W = Ee;
          });
          t.history.go(J * -1), Mn(de, {
            state: "blocked",
            location: Q,
            proceed() {
              Mn(de, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: Q
              }), pe.then(() => t.history.go(J));
            },
            reset() {
              let Ee = new Map(D.blockers);
              Ee.set(de, yo), xe({ blockers: Ee });
            }
          }), le?.resolve(), le = null;
          return;
        }
        return Te(U, Q);
      }
    ), r) {
      A_(a, j);
      let U = () => z_(a, j);
      a.addEventListener("pagehide", U), I = () => a.removeEventListener("pagehide", U);
    }
    return D.initialized || Te("POP", D.location, {
      initialHydration: !0
    }), V;
  }
  function Ce() {
    p && p(), I && I(), v.clear(), K && K.abort(), D.fetchers.forEach((U, Q) => tn(D.fetchers, Q)), D.blockers.forEach((U, Q) => ra(Q));
  }
  function Se(U) {
    if (v.add(U), b) {
      let { newErrors: Q } = b;
      b = null, U(D, {
        deletedFetchers: [],
        newErrors: Q,
        viewTransitionOpts: void 0,
        flushSync: !1
      });
    }
    return () => v.delete(U);
  }
  function xe(U, Q = {}) {
    U.matches && (U.matches = U.matches.map((pe) => {
      let Ee = c[pe.route.id], ve = pe.route;
      return ve.element !== Ee.element || ve.errorElement !== Ee.errorElement || ve.hydrateFallbackElement !== Ee.hydrateFallbackElement ? {
        ...pe,
        route: Ee
      } : pe;
    })), D = {
      ...D,
      ...U
    };
    let J = [], de = [];
    D.fetchers.forEach((pe, Ee) => {
      pe.state === "idle" && (he.has(Ee) ? J.push(Ee) : de.push(Ee));
    }), he.forEach((pe) => {
      !D.fetchers.has(pe) && !X.has(pe) && J.push(pe);
    }), v.size === 0 && (b = { newErrors: U.errors ?? null }), [...v].forEach(
      (pe) => pe(D, {
        deletedFetchers: J,
        newErrors: U.errors ?? null,
        viewTransitionOpts: Q.viewTransitionOpts,
        flushSync: Q.flushSync === !0
      })
    ), J.forEach((pe) => tn(D.fetchers, pe)), de.forEach((pe) => D.fetchers.delete(pe));
  }
  function Re(U, Q, { flushSync: J } = {}) {
    let de = D.actionData != null && D.navigation.formMethod != null && dn(D.navigation.formMethod) && D.navigation.state === "loading" && U.state?._isRedirect !== !0, pe;
    Q.actionData ? Object.keys(Q.actionData).length > 0 ? pe = Q.actionData : pe = null : de ? pe = D.actionData : pe = null;
    let Ee = Q.loaderData ? Sy(
      D.loaderData,
      Q.loaderData,
      Q.matches || [],
      Q.errors
    ) : D.loaderData, ve = D.blockers;
    ve.size > 0 && (ve = new Map(ve), ve.forEach((De, ke) => ve.set(ke, yo)));
    let we = C ? !1 : Vt(U, Q.matches || D.matches), be = $ === !0 || D.navigation.formMethod != null && dn(D.navigation.formMethod) && U.state?._isRedirect !== !0;
    h.commitHmrRoutes(), C || G === "POP" || (G === "PUSH" ? t.history.push(U, U.state) : G === "REPLACE" && t.history.replace(U, U.state));
    let Me;
    if (G === "POP") {
      let De = j.get(D.location.pathname);
      De && De.has(U.pathname) ? Me = {
        currentLocation: D.location,
        nextLocation: U
      } : j.has(U.pathname) && (Me = {
        currentLocation: U,
        nextLocation: D.location
      });
    } else if (re) {
      let De = j.get(D.location.pathname);
      De ? De.add(U.pathname) : (De = /* @__PURE__ */ new Set([U.pathname]), j.set(D.location.pathname, De)), Me = {
        currentLocation: D.location,
        nextLocation: U
      };
    }
    xe(
      {
        ...Q,
        // matches, errors, fetchers go through as-is
        actionData: pe,
        loaderData: Ee,
        historyAction: G,
        location: U,
        initialized: !0,
        renderFallback: !1,
        navigation: Cd,
        revalidation: "idle",
        restoreScrollPosition: we,
        preventScrollReset: be,
        blockers: ve
      },
      {
        viewTransitionOpts: Me,
        flushSync: J === !0
      }
    ), G = "POP", $ = !1, re = !1, C = !1, z = !1, le?.resolve(), le = null, ge?.resolve(), ge = null;
  }
  async function Ye(U, Q) {
    if (le?.resolve(), le = null, typeof U == "number") {
      le || (le = Ry());
      let rt = le.promise;
      return t.history.go(U), rt;
    }
    let J = Jd(
      D.location,
      D.matches,
      g,
      U,
      Q?.fromRouteId,
      Q?.relative
    ), { path: de, submission: pe, error: Ee } = dy(
      !1,
      J,
      Q
    ), ve;
    Q?.mask && (ve = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof Q.mask == "string" ? va(Q.mask) : {
        ...D.location.mask,
        ...Q.mask
      }
    });
    let we = D.location, be = Pd(
      we,
      de,
      Q && Q.state,
      void 0,
      ve
    );
    be = {
      ...be,
      ...t.history.encodeLocation(be)
    };
    let Me = Q && Q.replace != null ? Q.replace : void 0, De = "PUSH";
    Me === !0 ? De = "REPLACE" : Me === !1 || pe != null && dn(pe.formMethod) && pe.formAction === D.location.pathname + D.location.search && (De = "REPLACE");
    let ke = Q && "preventScrollReset" in Q ? Q.preventScrollReset === !0 : void 0, Le = (Q && Q.flushSync) === !0, Ge = $n({
      currentLocation: we,
      nextLocation: be,
      historyAction: De
    });
    if (Ge) {
      Mn(Ge, {
        state: "blocked",
        location: be,
        proceed() {
          Mn(Ge, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: be
          }), Ye(U, Q);
        },
        reset() {
          let rt = new Map(D.blockers);
          rt.set(Ge, yo), xe({ blockers: rt });
        }
      });
      return;
    }
    await Te(De, be, {
      submission: pe,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Ee,
      preventScrollReset: ke,
      replace: Q && Q.replace,
      enableViewTransition: Q && Q.viewTransition,
      flushSync: Le,
      callSiteDefaultShouldRevalidate: Q && Q.defaultShouldRevalidate
    });
  }
  function ft() {
    ge || (ge = Ry()), jt(), xe({ revalidation: "loading" });
    let U = ge.promise;
    return D.navigation.state === "submitting" ? U : D.navigation.state === "idle" ? (Te(D.historyAction, D.location, {
      startUninterruptedRevalidation: !0
    }), U) : (Te(
      G || D.historyAction,
      D.navigation.location,
      {
        overrideNavigation: D.navigation,
        // Proxy through any rending view transition
        enableViewTransition: re === !0
      }
    ), U);
  }
  async function Te(U, Q, J) {
    K && K.abort(), K = null, G = U, C = (J && J.startUninterruptedRevalidation) === !0, Ht(D.location, D.matches), $ = (J && J.preventScrollReset) === !0, re = (J && J.enableViewTransition) === !0;
    let de = h.activeRoutes, pe = J?.initialHydration && D.matches && D.matches.length > 0 && !E ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      D.matches
    ) : da(
      de,
      Q,
      g,
      !1,
      h.branches
    ), Ee = (J && J.flushSync) === !0;
    if (pe && D.initialized && !z && w_(D.location, Q) && !(J && J.submission && dn(J.submission.formMethod))) {
      Re(Q, { matches: pe }, { flushSync: Ee });
      return;
    }
    let ve = mn(pe, de, Q.pathname);
    if (ve.active && ve.matches && (pe = ve.matches), !pe) {
      let { error: st, notFoundMatches: We, route: Lt } = un(
        Q.pathname
      );
      Re(
        Q,
        {
          matches: We,
          loaderData: {},
          errors: {
            [Lt.id]: st
          }
        },
        { flushSync: Ee }
      );
      return;
    }
    let we = J && J.overrideNavigation ? {
      ...J.overrideNavigation,
      matches: pe,
      historyAction: U
    } : void 0;
    K = new AbortController();
    let be = sl(
      t.history,
      Q,
      K.signal,
      J && J.submission
    ), Me = t.getContext ? await t.getContext() : new ry(), De;
    if (J && J.pendingError)
      De = [
        qi(pe).route.id,
        { type: "error", error: J.pendingError }
      ];
    else if (J && J.submission && dn(J.submission.formMethod)) {
      let st = await Ie(
        be,
        Q,
        J.submission,
        pe,
        U,
        Me,
        ve.active,
        J && J.initialHydration === !0,
        { replace: J.replace, flushSync: Ee }
      );
      if (st.shortCircuited)
        return;
      if (st.pendingActionResult) {
        let [We, Lt] = st.pendingActionResult;
        if (kn(Lt) && Do(Lt.error) && Lt.error.status === 404) {
          K = null, Re(Q, {
            matches: st.matches,
            loaderData: {},
            errors: {
              [We]: Lt.error
            }
          });
          return;
        }
      }
      pe = st.matches || pe, De = st.pendingActionResult, we = Td(
        Q,
        pe,
        U,
        J.submission
      ), Ee = !1, ve.active = !1, be = sl(
        t.history,
        be.url,
        be.signal
      );
    }
    let {
      shortCircuited: ke,
      matches: Le,
      loaderData: Ge,
      errors: rt,
      workingFetchers: Rt
    } = await Be(
      be,
      Q,
      pe,
      U,
      Me,
      ve.active,
      we,
      J && J.submission,
      J && J.fetcherSubmission,
      J && J.replace,
      J && J.initialHydration === !0,
      Ee,
      De,
      J && J.callSiteDefaultShouldRevalidate
    );
    ke || (K = null, Re(Q, {
      matches: Le || pe,
      ...Ey(De),
      loaderData: Ge,
      errors: rt,
      ...Rt ? { fetchers: Rt } : {}
    }));
  }
  async function Ie(U, Q, J, de, pe, Ee, ve, we, be = {}) {
    jt();
    let Me = M_(
      Q,
      de,
      pe,
      J
    );
    if (xe({ navigation: Me }, { flushSync: be.flushSync === !0 }), ve) {
      let Le = await pt(
        de,
        Q.pathname,
        U.signal
      );
      if (Le.type === "aborted")
        return { shortCircuited: !0 };
      if (Le.type === "error") {
        if (Le.partialMatches.length === 0) {
          let { matches: rt, route: Rt } = ou(
            h.activeRoutes
          );
          return {
            matches: rt,
            pendingActionResult: [
              Rt.id,
              {
                type: "error",
                error: Le.error
              }
            ]
          };
        }
        let Ge = qi(Le.partialMatches).route.id;
        return {
          matches: Le.partialMatches,
          pendingActionResult: [
            Ge,
            {
              type: "error",
              error: Le.error
            }
          ]
        };
      } else if (Le.matches)
        de = Le.matches;
      else {
        let { notFoundMatches: Ge, error: rt, route: Rt } = un(
          Q.pathname
        );
        return {
          matches: Ge,
          pendingActionResult: [
            Rt.id,
            {
              type: "error",
              error: rt
            }
          ]
        };
      }
    }
    let De, ke = Tu(de, Q);
    if (!ke.route.action && !ke.route.lazy)
      De = {
        type: "error",
        error: ea(405, {
          method: U.method,
          pathname: Q.pathname,
          routeId: ke.route.id
        })
      };
    else {
      let Le = dl(
        u,
        c,
        U,
        Q,
        de,
        ke,
        we ? [] : l,
        Ee
      ), Ge = await yt(
        U,
        Q,
        Le,
        Ee,
        null
      );
      if (De = Ge[ke.route.id], !De) {
        for (let rt of de)
          if (Ge[rt.route.id]) {
            De = Ge[rt.route.id];
            break;
          }
      }
      if (U.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (mr(De)) {
      let Le;
      return be && be.replace != null ? Le = be.replace : Le = by(
        De.response.headers.get("Location"),
        new URL(U.url),
        g,
        t.history
      ) === D.location.pathname + D.location.search, await gt(U, De, !0, {
        submission: J,
        replace: Le
      }), { shortCircuited: !0 };
    }
    if (kn(De)) {
      let Le = qi(de, ke.route.id);
      return (be && be.replace) !== !0 && (G = "PUSH"), {
        matches: de,
        pendingActionResult: [
          Le.route.id,
          De,
          ke.route.id
        ]
      };
    }
    return {
      matches: de,
      pendingActionResult: [ke.route.id, De]
    };
  }
  async function Be(U, Q, J, de, pe, Ee, ve, we, be, Me, De, ke, Le, Ge) {
    let rt = ve || Td(Q, J, de, we), Rt = we || be || Ny(rt), st = !C && !De;
    if (Ee) {
      if (st) {
        let bt = $e(Le);
        xe(
          {
            navigation: rt,
            ...bt !== void 0 ? { actionData: bt } : {}
          },
          {
            flushSync: ke
          }
        );
      }
      let Ue = await pt(
        J,
        Q.pathname,
        U.signal
      );
      if (Ue.type === "aborted")
        return { shortCircuited: !0 };
      if (Ue.type === "error") {
        if (Ue.partialMatches.length === 0) {
          let { matches: pn, route: An } = ou(
            h.activeRoutes
          );
          return {
            matches: pn,
            loaderData: {},
            errors: {
              [An.id]: Ue.error
            }
          };
        }
        let bt = qi(Ue.partialMatches).route.id;
        return {
          matches: Ue.partialMatches,
          loaderData: {},
          errors: {
            [bt]: Ue.error
          }
        };
      } else if (Ue.matches)
        J = Ue.matches;
      else {
        let { error: bt, notFoundMatches: pn, route: An } = un(
          Q.pathname
        );
        return {
          matches: pn,
          loaderData: {},
          errors: {
            [An.id]: bt
          }
        };
      }
    }
    let We = h.activeRoutes, { dsMatches: Lt, revalidatingFetchers: at } = hy(
      U,
      pe,
      u,
      c,
      t.history,
      D,
      J,
      Rt,
      Q,
      De ? [] : l,
      De === !0,
      z,
      Y,
      he,
      ee,
      F,
      We,
      g,
      t.patchRoutesOnNavigation != null,
      h.branches,
      Le,
      Ge
    );
    if (A = ++te, !t.dataStrategy && !Lt.some((Ue) => Ue.shouldLoad) && !Lt.some(
      (Ue) => Ue.route.middleware && Ue.route.middleware.length > 0
    ) && at.length === 0) {
      let Ue = new Map(D.fetchers), bt = ci(Ue);
      return Re(
        Q,
        {
          matches: J,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Le && kn(Le[1]) ? { [Le[0]]: Le[1].error } : null,
          ...Ey(Le),
          ...bt ? { fetchers: Ue } : {}
        },
        { flushSync: ke }
      ), { shortCircuited: !0 };
    }
    if (st) {
      let Ue = {};
      if (!Ee) {
        Ue.navigation = rt;
        let bt = $e(Le);
        bt !== void 0 && (Ue.actionData = bt);
      }
      at.length > 0 && (Ue.fetchers = St(at)), xe(Ue, { flushSync: ke });
    }
    at.forEach((Ue) => {
      Ot(Ue.key), Ue.controller && X.set(Ue.key, Ue.controller);
    });
    let Sa = () => at.forEach((Ue) => Ot(Ue.key));
    K && K.signal.addEventListener(
      "abort",
      Sa
    );
    let { loaderResults: Dn, fetcherResults: cn } = await Xt(
      Lt,
      at,
      U,
      Q,
      pe
    );
    if (U.signal.aborted)
      return { shortCircuited: !0 };
    K && K.signal.removeEventListener(
      "abort",
      Sa
    ), at.forEach((Ue) => X.delete(Ue.key));
    let nn = su(Dn);
    if (nn)
      return await gt(U, nn.result, !0, {
        replace: Me
      }), { shortCircuited: !0 };
    if (nn = su(cn), nn)
      return F.add(nn.key), await gt(U, nn.result, !0, {
        replace: Me
      }), { shortCircuited: !0 };
    let bn = new Map(D.fetchers), { loaderData: fi, errors: xn } = wy(
      D,
      J,
      Dn,
      Le,
      at,
      cn,
      bn
    );
    De && D.errors && (xn = { ...D.errors, ...xn });
    let di = ci(bn), oa = wa(
      A,
      bn
    ), sa = di || oa || at.length > 0;
    return {
      matches: J,
      loaderData: fi,
      errors: xn,
      ...sa ? { workingFetchers: bn } : {}
    };
  }
  function $e(U) {
    if (U && !kn(U[1]))
      return {
        [U[0]]: U[1].data
      };
    if (D.actionData)
      return Object.keys(D.actionData).length === 0 ? null : D.actionData;
  }
  function St(U) {
    let Q = new Map(D.fetchers);
    return U.forEach((J) => {
      let de = Q.get(J.key), pe = vo(
        void 0,
        de ? de.data : void 0
      );
      Q.set(J.key, pe);
    }), Q;
  }
  async function Je(U, Q, J, de) {
    Ot(U);
    let pe = (de && de.flushSync) === !0, Ee = h.activeRoutes, ve = Jd(
      D.location,
      D.matches,
      g,
      J,
      Q,
      de?.relative
    ), we = da(
      Ee,
      ve,
      g,
      !1,
      h.branches
    ), be = mn(we, Ee, ve);
    if (be.active && be.matches && (we = be.matches), !we) {
      ot(
        U,
        Q,
        ea(404, { pathname: ve }),
        { flushSync: pe }
      );
      return;
    }
    let { path: Me, submission: De, error: ke } = dy(
      !0,
      ve,
      de
    );
    if (ke) {
      ot(U, Q, ke, { flushSync: pe });
      return;
    }
    let Le = t.getContext ? await t.getContext() : new ry(), Ge = (de && de.preventScrollReset) === !0;
    if (De && dn(De.formMethod)) {
      await Qe(
        U,
        Q,
        Me,
        we,
        Le,
        be.active,
        pe,
        Ge,
        De,
        de && de.defaultShouldRevalidate
      );
      return;
    }
    ee.set(U, { routeId: Q, path: Me }), await Fe(
      U,
      Q,
      Me,
      we,
      Le,
      be.active,
      pe,
      Ge,
      De
    );
  }
  async function Qe(U, Q, J, de, pe, Ee, ve, we, be, Me) {
    jt(), ee.delete(U);
    let De = D.fetchers.get(U);
    mt(U, D_(be, De), {
      flushSync: ve
    });
    let ke = new AbortController(), Le = sl(
      t.history,
      J,
      ke.signal,
      be
    );
    if (Ee) {
      let dt = await pt(
        de,
        new URL(Le.url).pathname,
        Le.signal,
        U
      );
      if (dt.type === "aborted")
        return;
      if (dt.type === "error") {
        ot(U, Q, dt.error, { flushSync: ve });
        return;
      } else if (dt.matches)
        de = dt.matches;
      else {
        ot(
          U,
          Q,
          ea(404, { pathname: J }),
          { flushSync: ve }
        );
        return;
      }
    }
    let Ge = Tu(de, J);
    if (!Ge.route.action && !Ge.route.lazy) {
      let dt = ea(405, {
        method: be.formMethod,
        pathname: J,
        routeId: Q
      });
      ot(U, Q, dt, { flushSync: ve });
      return;
    }
    X.set(U, ke);
    let rt = te, Rt = dl(
      u,
      c,
      Le,
      J,
      de,
      Ge,
      l,
      pe
    ), st = await yt(
      Le,
      J,
      Rt,
      pe,
      U
    ), We = st[Ge.route.id];
    if (!We) {
      for (let dt of Rt)
        if (st[dt.route.id]) {
          We = st[dt.route.id];
          break;
        }
    }
    if (Le.signal.aborted) {
      X.get(U) === ke && X.delete(U);
      return;
    }
    if (he.has(U)) {
      if (mr(We) || kn(We)) {
        mt(U, Ma(void 0));
        return;
      }
    } else {
      if (mr(We))
        if (X.delete(U), A > rt) {
          mt(U, Ma(void 0));
          return;
        } else
          return F.add(U), mt(U, vo(be)), gt(Le, We, !1, {
            fetcherSubmission: be,
            preventScrollReset: we
          });
      if (kn(We)) {
        ot(U, Q, We.error);
        return;
      }
    }
    let Lt = D.navigation.location || D.location, at = sl(
      t.history,
      Lt,
      ke.signal
    ), Sa = h.activeRoutes, Dn = D.navigation.state !== "idle" ? da(
      Sa,
      D.navigation.location,
      g,
      !1,
      h.branches
    ) : D.matches;
    Ze(Dn, "Didn't find any matches after fetcher action");
    let cn = ++te;
    k.set(U, cn);
    let { dsMatches: nn, revalidatingFetchers: bn } = hy(
      at,
      pe,
      u,
      c,
      t.history,
      D,
      Dn,
      be,
      Lt,
      l,
      !1,
      z,
      Y,
      he,
      ee,
      F,
      Sa,
      g,
      t.patchRoutesOnNavigation != null,
      h.branches,
      [Ge.route.id, We],
      Me
    ), fi = vo(be, We.data), xn = new Map(D.fetchers);
    xn.set(U, fi), bn.filter((dt) => dt.key !== U).forEach((dt) => {
      let Xn = dt.key, an = xn.get(Xn), Ii = vo(
        void 0,
        an ? an.data : void 0
      );
      xn.set(Xn, Ii), Ot(Xn), dt.controller && X.set(Xn, dt.controller);
    }), xe({ fetchers: xn });
    let di = () => bn.forEach((dt) => Ot(dt.key));
    ke.signal.addEventListener(
      "abort",
      di
    );
    let { loaderResults: oa, fetcherResults: sa } = await Xt(
      nn,
      bn,
      at,
      Lt,
      pe
    );
    if (ke.signal.aborted)
      return;
    ke.signal.removeEventListener(
      "abort",
      di
    ), k.delete(U), X.delete(U), bn.forEach((dt) => X.delete(dt.key));
    let Ue = D.fetchers.has(U), bt = (dt) => {
      if (!Ue) return dt;
      let Xn = new Map(dt.fetchers);
      return Xn.set(U, Ma(We.data)), { ...dt, fetchers: Xn };
    }, pn = su(oa);
    if (pn)
      return D = bt(D), gt(
        at,
        pn.result,
        !1,
        { preventScrollReset: we }
      );
    if (pn = su(sa), pn)
      return F.add(pn.key), D = bt(D), gt(
        at,
        pn.result,
        !1,
        { preventScrollReset: we }
      );
    let An = new Map(D.fetchers);
    Ue && An.set(U, Ma(We.data));
    let { loaderData: hi, errors: Ha } = wy(
      D,
      Dn,
      oa,
      void 0,
      bn,
      sa,
      An
    );
    wa(cn, An), D.navigation.state === "loading" && cn > A ? (Ze(G, "Expected pending action"), K && K.abort(), Re(D.navigation.location, {
      matches: Dn,
      loaderData: hi,
      errors: Ha,
      fetchers: An
    })) : (xe({
      errors: Ha,
      loaderData: Sy(
        D.loaderData,
        hi,
        Dn,
        Ha
      ),
      fetchers: An
    }), z = !1);
  }
  async function Fe(U, Q, J, de, pe, Ee, ve, we, be) {
    let Me = D.fetchers.get(U);
    mt(
      U,
      vo(
        be,
        Me ? Me.data : void 0
      ),
      { flushSync: ve }
    );
    let De = new AbortController(), ke = sl(
      t.history,
      J,
      De.signal
    );
    if (Ee) {
      let We = await pt(
        de,
        new URL(ke.url).pathname,
        ke.signal,
        U
      );
      if (We.type === "aborted")
        return;
      if (We.type === "error") {
        ot(U, Q, We.error, { flushSync: ve });
        return;
      } else if (We.matches)
        de = We.matches;
      else {
        ot(
          U,
          Q,
          ea(404, { pathname: J }),
          { flushSync: ve }
        );
        return;
      }
    }
    let Le = Tu(de, J);
    X.set(U, De);
    let Ge = te, rt = dl(
      u,
      c,
      ke,
      J,
      de,
      Le,
      l,
      pe
    ), Rt = await yt(
      ke,
      J,
      rt,
      pe,
      U
    ), st = Rt[Le.route.id];
    if (!st) {
      for (let We of de)
        if (Rt[We.route.id]) {
          st = Rt[We.route.id];
          break;
        }
    }
    if (X.get(U) === De && X.delete(U), !ke.signal.aborted) {
      if (he.has(U)) {
        mt(U, Ma(void 0));
        return;
      }
      if (mr(st))
        if (A > Ge) {
          mt(U, Ma(void 0));
          return;
        } else {
          F.add(U), await gt(ke, st, !1, {
            preventScrollReset: we
          });
          return;
        }
      if (kn(st)) {
        ot(U, Q, st.error);
        return;
      }
      mt(U, Ma(st.data));
    }
  }
  async function gt(U, Q, J, {
    submission: de,
    fetcherSubmission: pe,
    preventScrollReset: Ee,
    replace: ve
  } = {}) {
    J || (le?.resolve(), le = null), Q.response.headers.has("X-Remix-Revalidate") && (z = !0);
    let we = Q.response.headers.get("Location");
    Ze(we, "Expected a Location header on the redirect Response"), we = by(
      we,
      new URL(U.url),
      g,
      t.history
    );
    let be = Pd(D.location, we, {
      _isRedirect: !0
    });
    if (r) {
      let rt = !1;
      if (Q.response.headers.has("X-Remix-Reload-Document"))
        rt = !0;
      else if (Dh(we)) {
        const Rt = NE(a, we, !0);
        rt = // Hard reload if it's an absolute URL to a new origin
        Rt.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        aa(Rt.pathname, g) == null;
      }
      if (rt) {
        ve ? a.location.replace(we) : a.location.assign(we);
        return;
      }
    }
    K = null;
    let Me = ve === !0 || Q.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: De, formAction: ke, formEncType: Le } = D.navigation;
    !de && !pe && De && ke && Le && (de = Ny(D.navigation));
    let Ge = de || pe;
    if (i_.has(Q.response.status) && Ge && dn(Ge.formMethod))
      await Te(Me, be, {
        submission: {
          ...Ge,
          formAction: we
        },
        // Preserve these flags across redirects
        preventScrollReset: Ee || $,
        enableViewTransition: J ? re : void 0
      });
    else {
      let rt = Td(
        be,
        [],
        Me,
        de
      );
      await Te(Me, be, {
        overrideNavigation: rt,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: pe,
        // Preserve these flags across redirects
        preventScrollReset: Ee || $,
        enableViewTransition: J ? re : void 0
      });
    }
  }
  async function yt(U, Q, J, de, pe) {
    let Ee, ve = {};
    try {
      Ee = await p_(
        m,
        U,
        Q,
        J,
        pe,
        de,
        !1
      );
    } catch (we) {
      return J.filter((be) => be.shouldLoad).forEach((be) => {
        ve[be.route.id] = {
          type: "error",
          error: we
        };
      }), ve;
    }
    if (U.signal.aborted)
      return ve;
    if (!dn(U.method))
      for (let we of J) {
        if (Ee[we.route.id]?.type === "error")
          break;
        !Ee.hasOwnProperty(we.route.id) && !D.loaderData.hasOwnProperty(we.route.id) && (!D.errors || !D.errors.hasOwnProperty(we.route.id)) && we.shouldCallHandler() && (Ee[we.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${we.route.id}`
          )
        });
      }
    for (let [we, be] of Object.entries(Ee))
      if (N_(be)) {
        let Me = be.result;
        ve[we] = {
          type: "redirect",
          response: b_(
            Me,
            U,
            we,
            J,
            g
          )
        };
      } else
        ve[we] = await v_(be);
    return ve;
  }
  async function Xt(U, Q, J, de, pe) {
    let Ee = yt(
      J,
      de,
      U,
      pe,
      null
    ), ve = Promise.all(
      Q.map(async (Me) => {
        if (Me.matches && Me.match && Me.request && Me.controller) {
          let ke = (await yt(
            Me.request,
            Me.path,
            Me.matches,
            pe,
            Me.key
          ))[Me.match.route.id];
          return { [Me.key]: ke };
        } else
          return Promise.resolve({
            [Me.key]: {
              type: "error",
              error: ea(404, {
                pathname: Me.path
              })
            }
          });
      })
    ), we = await Ee, be = (await ve).reduce(
      (Me, De) => Object.assign(Me, De),
      {}
    );
    return {
      loaderResults: we,
      fetcherResults: be
    };
  }
  function jt() {
    z = !0, ee.forEach((U, Q) => {
      X.has(Q) && Y.add(Q), Ot(Q);
    });
  }
  function mt(U, Q, J = {}) {
    let de = new Map(D.fetchers);
    de.set(U, Q), xe(
      { fetchers: de },
      { flushSync: (J && J.flushSync) === !0 }
    );
  }
  function ot(U, Q, J, de = {}) {
    let pe = qi(D.matches, Q), Ee = new Map(D.fetchers);
    tn(Ee, U), xe(
      {
        errors: {
          [pe.route.id]: J
        },
        fetchers: Ee
      },
      { flushSync: (de && de.flushSync) === !0 }
    );
  }
  function Yn(U) {
    return se.set(U, (se.get(U) || 0) + 1), he.has(U) && he.delete(U), D.fetchers.get(U) || r_;
  }
  function yn(U, Q) {
    Ot(U, Q?.reason), mt(U, Ma(null));
  }
  function tn(U, Q) {
    let J = D.fetchers.get(Q);
    X.has(Q) && !(J && J.state === "loading" && k.has(Q)) && Ot(Q), ee.delete(Q), k.delete(Q), F.delete(Q), he.delete(Q), Y.delete(Q), U.delete(Q);
  }
  function Kt(U) {
    let Q = (se.get(U) || 0) - 1;
    Q <= 0 ? (se.delete(U), he.add(U)) : se.set(U, Q), xe({ fetchers: new Map(D.fetchers) });
  }
  function Ot(U, Q) {
    let J = X.get(U);
    J && (J.abort(Q), X.delete(U));
  }
  function kt(U, Q) {
    for (let J of U) {
      let de = Q.get(J);
      Ze(de, `Expected fetcher: ${J}`);
      let pe = Ma(de.data);
      Q.set(J, pe);
    }
  }
  function ci(U) {
    let Q = [], J = !1;
    for (let de of F) {
      let pe = U.get(de);
      Ze(pe, `Expected fetcher: ${de}`), pe.state === "loading" && (F.delete(de), Q.push(de), J = !0);
    }
    return kt(Q, U), J;
  }
  function wa(U, Q) {
    let J = [];
    for (let [de, pe] of k)
      if (pe < U) {
        let Ee = Q.get(de);
        Ze(Ee, `Expected fetcher: ${de}`), Ee.state === "loading" && (Ot(de), k.delete(de), J.push(de));
      }
    return kt(J, Q), J.length > 0;
  }
  function vn(U, Q) {
    let J = D.blockers.get(U) || yo;
    return me.get(U) !== Q && me.set(U, Q), J;
  }
  function ra(U) {
    D.blockers.delete(U), me.delete(U);
  }
  function Mn(U, Q) {
    let J = D.blockers.get(U) || yo;
    Ze(
      J.state === "unblocked" && Q.state === "blocked" || J.state === "blocked" && Q.state === "blocked" || J.state === "blocked" && Q.state === "proceeding" || J.state === "blocked" && Q.state === "unblocked" || J.state === "proceeding" && Q.state === "unblocked",
      `Invalid blocker state transition: ${J.state} -> ${Q.state}`
    );
    let de = new Map(D.blockers);
    de.set(U, Q), xe({ blockers: de });
  }
  function $n({
    currentLocation: U,
    nextLocation: Q,
    historyAction: J
  }) {
    if (me.size === 0)
      return;
    me.size > 1 && $t(!1, "A router only supports one blocker at a time");
    let de = Array.from(me.entries()), [pe, Ee] = de[de.length - 1], ve = D.blockers.get(pe);
    if (!(ve && ve.state === "proceeding") && Ee({ currentLocation: U, nextLocation: Q, historyAction: J }))
      return pe;
  }
  function un(U) {
    let Q = ea(404, { pathname: U }), J = h.activeRoutes, { matches: de, route: pe } = ou(J);
    return { notFoundMatches: de, route: pe, error: Q };
  }
  function He(U, Q, J) {
    if (w = U, T = Q, R = J || null, !_ && D.navigation === Cd) {
      _ = !0;
      let de = Vt(D.location, D.matches);
      de != null && xe({ restoreScrollPosition: de });
    }
    return () => {
      w = null, T = null, R = null;
    };
  }
  function vt(U, Q) {
    return R && R(
      U,
      Q.map((de) => AE(de, D.loaderData))
    ) || U.key;
  }
  function Ht(U, Q) {
    if (w && T) {
      let J = vt(U, Q);
      w[J] = T();
    }
  }
  function Vt(U, Q) {
    if (w) {
      let J = vt(U, Q), de = w[J];
      if (typeof de == "number")
        return de;
    }
    return null;
  }
  function mn(U, Q, J) {
    if (t.patchRoutesOnNavigation) {
      let de = h.branches;
      if (U) {
        if (Object.keys(U[0].params).length > 0)
          return { active: !0, matches: da(
            Q,
            J,
            g,
            !0,
            de
          ) };
      } else
        return { active: !0, matches: da(
          Q,
          J,
          g,
          !0,
          de
        ) || [] };
    }
    return { active: !1, matches: null };
  }
  async function pt(U, Q, J, de) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: U };
    let pe = U;
    for (; ; ) {
      let Ee = c;
      try {
        await t.patchRoutesOnNavigation({
          signal: J,
          path: Q,
          matches: pe,
          fetcherKey: de,
          patch: (Me, De) => {
            J.aborted || my(
              Me,
              De,
              h,
              Ee,
              u,
              !1
            );
          }
        });
      } catch (Me) {
        return { type: "error", error: Me, partialMatches: pe };
      }
      if (J.aborted)
        return { type: "aborted" };
      let ve = h.branches, we = da(
        h.activeRoutes,
        Q,
        g,
        !1,
        ve
      ), be = null;
      if (we) {
        if (Object.keys(we[0].params).length === 0)
          return { type: "success", matches: we };
        if (be = da(
          h.activeRoutes,
          Q,
          g,
          !0,
          ve
        ), !(be && pe.length < be.length && Pt(
          pe,
          be.slice(0, pe.length)
        )))
          return { type: "success", matches: we };
      }
      if (be || (be = da(
        h.activeRoutes,
        Q,
        g,
        !0,
        ve
      )), !be || Pt(pe, be))
        return { type: "success", matches: null };
      pe = be;
    }
  }
  function Pt(U, Q) {
    return U.length === Q.length && U.every((J, de) => J.route.id === Q[de].route.id);
  }
  function la(U) {
    c = {}, h.setHmrRoutes(
      Mo(
        U,
        u,
        void 0,
        c
      )
    );
  }
  function Wt(U, Q, J = !1) {
    my(
      U,
      Q,
      h,
      c,
      u,
      J
    ), h.hasHMRRoutes || xe({});
  }
  return V = {
    get basename() {
      return g;
    },
    get future() {
      return y;
    },
    get state() {
      return D;
    },
    get routes() {
      return h.stableRoutes;
    },
    get branches() {
      return h.branches;
    },
    get manifest() {
      return c;
    },
    get window() {
      return a;
    },
    initialize: ze,
    subscribe: Se,
    enableScrollRestoration: He,
    navigate: Ye,
    fetch: Je,
    revalidate: ft,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (U) => t.history.createHref(U),
    encodeLocation: (U) => t.history.encodeLocation(U),
    getFetcher: Yn,
    resetFetcher: yn,
    deleteFetcher: Kt,
    dispose: Ce,
    getBlocker: vn,
    deleteBlocker: ra,
    patchRoutes: Wt,
    _internalFetchControllers: X,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: la,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(U) {
      xe(U);
    }
  }, t.instrumentations && (V = KE(
    V,
    t.instrumentations.map((U) => U.router).filter(Boolean)
  )), V;
}
function u_(t) {
  return t != null && ("formData" in t && t.formData != null || "body" in t && t.body !== void 0);
}
function Jd(t, a, r, l, s, u) {
  let c, h;
  if (s) {
    c = [];
    for (let m of a)
      if (c.push(m), m.route.id === s) {
        h = m;
        break;
      }
  } else
    c = a, h = a[a.length - 1];
  let g = Ku(
    l || ".",
    Ah(c),
    aa(t.pathname, r) || t.pathname,
    u === "path"
  );
  if (l == null && (g.search = t.search, g.hash = t.hash), (l == null || l === "" || l === ".") && h) {
    let m = jh(g.search);
    if (h.route.index && !m)
      g.search = g.search ? g.search.replace(/^\?/, "?index&") : "?index";
    else if (!h.route.index && m) {
      let y = new URLSearchParams(g.search), p = y.getAll("index");
      y.delete("index"), p.filter((b) => b).forEach((b) => y.append("index", b));
      let v = y.toString();
      g.search = v ? `?${v}` : "";
    }
  }
  return r !== "/" && (g.pathname = XE({ basename: r, pathname: g.pathname })), La(g);
}
function dy(t, a, r) {
  if (!r || !u_(r))
    return { path: a };
  if (r.formMethod && !T_(r.formMethod))
    return {
      path: a,
      error: ea(405, { method: r.formMethod })
    };
  let l = () => ({
    path: a,
    error: ea(400, { type: "invalid-body" })
  }), u = (r.formMethod || "get").toUpperCase(), c = $b(a);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!dn(u))
        return l();
      let p = typeof r.body == "string" ? r.body : r.body instanceof FormData || r.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(r.body.entries()).reduce(
          (v, [b, w]) => `${v}${b}=${w}
`,
          ""
        )
      ) : String(r.body);
      return {
        path: a,
        submission: {
          formMethod: u,
          formAction: c,
          formEncType: r.formEncType,
          formData: void 0,
          json: void 0,
          text: p
        }
      };
    } else if (r.formEncType === "application/json") {
      if (!dn(u))
        return l();
      try {
        let p = typeof r.body == "string" ? JSON.parse(r.body) : r.body;
        return {
          path: a,
          submission: {
            formMethod: u,
            formAction: c,
            formEncType: r.formEncType,
            formData: void 0,
            json: p,
            text: void 0
          }
        };
      } catch {
        return l();
      }
    }
  }
  Ze(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let h, g;
  if (r.formData)
    h = eh(r.formData), g = r.formData;
  else if (r.body instanceof FormData)
    h = eh(r.body), g = r.body;
  else if (r.body instanceof URLSearchParams)
    h = r.body, g = xy(h);
  else if (r.body == null)
    h = new URLSearchParams(), g = new FormData();
  else
    try {
      h = new URLSearchParams(r.body), g = xy(h);
    } catch {
      return l();
    }
  let m = {
    formMethod: u,
    formAction: c,
    formEncType: r && r.formEncType || "application/x-www-form-urlencoded",
    formData: g,
    json: void 0,
    text: void 0
  };
  if (dn(m.formMethod))
    return { path: a, submission: m };
  let y = va(a);
  return t && y.search && jh(y.search) && h.append("index", ""), y.search = `?${h}`, { path: La(y), submission: m };
}
function hy(t, a, r, l, s, u, c, h, g, m, y, p, v, b, w, R, T, _, O, E, L, B) {
  let H = L ? kn(L[1]) ? L[1].error : L[1].data : void 0, V = s.createURL(u.location), D = s.createURL(g), G;
  if (y && u.errors) {
    let C = Object.keys(u.errors)[0];
    G = c.findIndex((z) => z.route.id === C);
  } else if (L && kn(L[1])) {
    let C = L[0];
    G = c.findIndex((z) => z.route.id === C) - 1;
  }
  let le = L ? L[1].statusCode : void 0, $ = le && le >= 400, K = {
    currentUrl: V,
    currentParams: u.matches[0]?.params || {},
    nextUrl: D,
    nextParams: c[0].params,
    ...h,
    actionResult: H,
    actionStatus: le
  }, re = Yo(c), j = c.map((C, z) => {
    let { route: Y } = C, X = null;
    if (G != null && z > G)
      X = !1;
    else if (Y.lazy)
      X = !0;
    else if (!Oh(Y))
      X = !1;
    else if (y) {
      let { shouldLoad: F } = Hb(
        Y,
        u.loaderData,
        u.errors
      );
      X = F;
    } else c_(u.loaderData, u.matches[z], C) && (X = !0);
    if (X !== null)
      return Wd(
        r,
        l,
        t,
        g,
        re,
        C,
        m,
        a,
        X
      );
    let te = !1;
    typeof B == "boolean" ? te = B : $ ? te = !1 : (p || V.pathname + V.search === D.pathname + D.search || V.search !== D.search || f_(u.matches[z], C)) && (te = !0);
    let A = {
      ...K,
      defaultShouldRevalidate: te
    }, k = Ro(C, A);
    return Wd(
      r,
      l,
      t,
      g,
      re,
      C,
      m,
      a,
      k,
      A,
      B
    );
  }), I = [];
  return w.forEach((C, z) => {
    if (y || !c.some((se) => se.route.id === C.routeId) || b.has(z))
      return;
    let Y = u.fetchers.get(z), X = Y && Y.state !== "idle" && Y.data === void 0, te = da(
      T,
      C.path,
      _ ?? "/",
      !1,
      E
    );
    if (!te) {
      if (O && X)
        return;
      I.push({
        key: z,
        routeId: C.routeId,
        path: C.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (R.has(z))
      return;
    let A = Tu(te, C.path), k = new AbortController(), F = sl(
      s,
      C.path,
      k.signal
    ), ee = null;
    if (v.has(z))
      v.delete(z), ee = dl(
        r,
        l,
        F,
        C.path,
        te,
        A,
        m,
        a
      );
    else if (X)
      p && (ee = dl(
        r,
        l,
        F,
        C.path,
        te,
        A,
        m,
        a
      ));
    else {
      let se;
      typeof B == "boolean" ? se = B : $ ? se = !1 : se = p;
      let he = {
        ...K,
        defaultShouldRevalidate: se
      };
      Ro(A, he) && (ee = dl(
        r,
        l,
        F,
        C.path,
        te,
        A,
        m,
        a,
        he
      ));
    }
    ee && I.push({
      key: z,
      routeId: C.routeId,
      path: C.path,
      matches: ee,
      match: A,
      request: F,
      controller: k
    });
  }), { dsMatches: j, revalidatingFetchers: I };
}
function Oh(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function Hb(t, a, r) {
  if (t.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!Oh(t))
    return { shouldLoad: !1, renderFallback: !1 };
  let l = a != null && t.id in a, s = r != null && r[t.id] !== void 0;
  if (!l && s)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof t.loader == "function" && t.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !l };
  let u = !l && !s;
  return { shouldLoad: u, renderFallback: u };
}
function c_(t, a, r) {
  let l = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    r.route.id !== a.route.id
  ), s = !t.hasOwnProperty(r.route.id);
  return l || s;
}
function f_(t, a) {
  let r = t.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    t.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r != null && r.endsWith("*") && t.params["*"] !== a.params["*"]
  );
}
function Ro(t, a) {
  if (t.route.shouldRevalidate) {
    let r = t.route.shouldRevalidate(a);
    if (typeof r == "boolean")
      return r;
  }
  return a.defaultShouldRevalidate;
}
function my(t, a, r, l, s, u) {
  let c;
  if (t) {
    let m = l[t];
    Ze(
      m,
      `No route found to patch children into: routeId = ${t}`
    ), m.children || (m.children = []), c = m.children;
  } else
    c = r.activeRoutes;
  let h = [], g = [];
  if (a.forEach((m) => {
    let y = c.find(
      (p) => Bb(m, p)
    );
    y ? g.push({ existingRoute: y, newRoute: m }) : h.push(m);
  }), h.length > 0) {
    let m = Mo(
      h,
      s,
      [t || "_", "patch", String(c?.length || "0")],
      l
    );
    c.push(...m);
  }
  if (u && g.length > 0)
    for (let m = 0; m < g.length; m++) {
      let { existingRoute: y, newRoute: p } = g[m], v = y, [b] = Mo(
        [p],
        s,
        [],
        // Doesn't matter for mutated routes since they already have an id
        {},
        // Don't touch the manifest here since we're updating in place
        !0
      );
      Object.assign(v, {
        element: b.element ? b.element : v.element,
        errorElement: b.errorElement ? b.errorElement : v.errorElement,
        hydrateFallbackElement: b.hydrateFallbackElement ? b.hydrateFallbackElement : v.hydrateFallbackElement
      });
    }
  r.hasHMRRoutes || r.setRoutes([...r.activeRoutes]);
}
function Bb(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (r, l) => a.children?.some((s) => Bb(r, s))
  ) ?? !1 : !1;
}
var py = /* @__PURE__ */ new WeakMap(), Ub = ({
  key: t,
  route: a,
  manifest: r,
  mapRouteProperties: l
}) => {
  let s = r[a.id];
  if (Ze(s, "No route found in manifest"), !s.lazy || typeof s.lazy != "object")
    return;
  let u = s.lazy[t];
  if (!u)
    return;
  let c = py.get(s);
  c || (c = {}, py.set(s, c));
  let h = c[t];
  if (h)
    return h;
  let g = (async () => {
    let m = CE(t), p = s[t] !== void 0 && t !== "hasErrorBoundary";
    if (m)
      $t(
        !m,
        "Route property " + t + " is not a supported lazy route property. This property will be ignored."
      ), c[t] = Promise.resolve();
    else if (p)
      $t(
        !1,
        `Route "${s.id}" has a static property "${t}" defined. The lazy property will be ignored.`
      );
    else {
      let v = await u();
      v != null && (Object.assign(s, { [t]: v }), Object.assign(s, l(s)));
    }
    typeof s.lazy == "object" && (s.lazy[t] = void 0, Object.values(s.lazy).every((v) => v === void 0) && (s.lazy = void 0));
  })();
  return c[t] = g, g;
}, gy = /* @__PURE__ */ new WeakMap();
function d_(t, a, r, l, s) {
  let u = r[t.id];
  if (Ze(u, "No route found in manifest"), !t.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof t.lazy == "function") {
    let y = gy.get(u);
    if (y)
      return {
        lazyRoutePromise: y,
        lazyHandlerPromise: y
      };
    let p = (async () => {
      Ze(
        typeof t.lazy == "function",
        "No lazy route function found"
      );
      let v = await t.lazy(), b = {};
      for (let w in v) {
        let R = v[w];
        if (R === void 0)
          continue;
        let T = ME(w), O = u[w] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        w !== "hasErrorBoundary";
        T ? $t(
          !T,
          "Route property " + w + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : O ? $t(
          !O,
          `Route "${u.id}" has a static property "${w}" defined but its lazy function is also returning a value for this property. The lazy route property "${w}" will be ignored.`
        ) : b[w] = R;
      }
      Object.assign(u, b), Object.assign(u, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...l(u),
        lazy: void 0
      });
    })();
    return gy.set(u, p), p.catch(() => {
    }), {
      lazyRoutePromise: p,
      lazyHandlerPromise: p
    };
  }
  let c = Object.keys(t.lazy), h = [], g;
  for (let y of c) {
    if (s && s.includes(y))
      continue;
    let p = Ub({
      key: y,
      route: t,
      manifest: r,
      mapRouteProperties: l
    });
    p && (h.push(p), y === a && (g = p));
  }
  let m = h.length > 0 ? Promise.all(h).then(() => {
  }) : void 0;
  return m?.catch(() => {
  }), g?.catch(() => {
  }), {
    lazyRoutePromise: m,
    lazyHandlerPromise: g
  };
}
async function yy(t) {
  let a = t.matches.filter((s) => s.shouldLoad), r = {};
  return (await Promise.all(a.map((s) => s.resolve()))).forEach((s, u) => {
    r[a[u].route.id] = s;
  }), r;
}
async function h_(t) {
  return t.matches.some((a) => a.route.middleware) ? kb(t, () => yy(t)) : yy(t);
}
function kb(t, a) {
  return m_(
    t,
    a,
    (l) => {
      if (C_(l))
        throw l;
      return l;
    },
    E_,
    r
  );
  function r(l, s, u) {
    if (u)
      return Promise.resolve(
        Object.assign(u.value, {
          [s]: { type: "error", result: l }
        })
      );
    {
      let { matches: c } = t, h = Math.min(
        // Throwing route
        Math.max(
          c.findIndex((m) => m.route.id === s),
          0
        ),
        // or the shallowest route that needs to load data
        Math.max(
          c.findIndex((m) => m.shouldCallHandler()),
          0
        )
      ), g = qi(
        c,
        c[h].route.id
      ).route.id;
      return Promise.resolve({
        [g]: { type: "error", result: l }
      });
    }
  }
}
async function m_(t, a, r, l, s) {
  let { matches: u, ...c } = t, h = u.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((y) => [m.route.id, y]) : []
  );
  return await Vb(
    c,
    h,
    a,
    r,
    l,
    s
  );
}
async function Vb(t, a, r, l, s, u, c = 0) {
  let { request: h } = t;
  if (h.signal.aborted)
    throw h.signal.reason ?? new Error(`Request aborted: ${h.method} ${h.url}`);
  let g = a[c];
  if (!g)
    return await r();
  let [m, y] = g, p, v = async () => {
    if (p)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return p = { value: await Vb(
        t,
        a,
        r,
        l,
        s,
        u,
        c + 1
      ) }, p.value;
    } catch (b) {
      return p = { value: await u(b, m, p) }, p.value;
    }
  };
  try {
    let b = await y(t, v), w = b != null ? l(b) : void 0;
    return s(w) ? w : p ? w ?? p.value : (p = { value: await v() }, p.value);
  } catch (b) {
    return await u(b, m, p);
  }
}
function qb(t, a, r, l, s) {
  let u = Ub({
    key: "middleware",
    route: l.route,
    manifest: a,
    mapRouteProperties: t
  }), c = d_(
    l.route,
    dn(r.method) ? "action" : "loader",
    a,
    t,
    s
  );
  return {
    middleware: u,
    route: c.lazyRoutePromise,
    handler: c.lazyHandlerPromise
  };
}
function Wd(t, a, r, l, s, u, c, h, g, m = null, y) {
  let p = !1, v = qb(
    t,
    a,
    r,
    u,
    c
  );
  return {
    ...u,
    _lazyPromises: v,
    shouldLoad: g,
    shouldRevalidateArgs: m,
    shouldCallHandler(b) {
      return p = !0, m ? typeof y == "boolean" ? Ro(u, {
        ...m,
        defaultShouldRevalidate: y
      }) : typeof b == "boolean" ? Ro(u, {
        ...m,
        defaultShouldRevalidate: b
      }) : Ro(u, m) : g;
    },
    resolve(b) {
      let { lazy: w, loader: R, middleware: T } = u.route, _ = p || g || b && !dn(r.method) && (w || R), O = T && T.length > 0 && !R && !w;
      return _ && (dn(r.method) || !O) ? g_({
        request: r,
        path: l,
        pattern: s,
        match: u,
        lazyHandlerPromise: v?.handler,
        lazyRoutePromise: v?.route,
        handlerOverride: b,
        scopedContext: h
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function dl(t, a, r, l, s, u, c, h, g = null) {
  return s.map((m) => m.route.id !== u.route.id ? {
    ...m,
    shouldLoad: !1,
    shouldRevalidateArgs: g,
    shouldCallHandler: () => !1,
    _lazyPromises: qb(
      t,
      a,
      r,
      m,
      c
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Wd(
    t,
    a,
    r,
    l,
    Yo(s),
    m,
    c,
    h,
    !0,
    g
  ));
}
async function p_(t, a, r, l, s, u, c) {
  l.some((y) => y._lazyPromises?.middleware) && await Promise.all(l.map((y) => y._lazyPromises?.middleware));
  let h = {
    request: a,
    url: Yb(a, r),
    pattern: Yo(l),
    params: l[0].params,
    context: u,
    matches: l
  }, m = await t({
    ...h,
    fetcherKey: s,
    runClientMiddleware: (y) => {
      let p = h;
      return kb(p, () => y({
        ...p,
        fetcherKey: s,
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
      l.flatMap((y) => [
        y._lazyPromises?.handler,
        y._lazyPromises?.route
      ])
    );
  } catch {
  }
  return m;
}
async function g_({
  request: t,
  path: a,
  pattern: r,
  match: l,
  lazyHandlerPromise: s,
  lazyRoutePromise: u,
  handlerOverride: c,
  scopedContext: h
}) {
  let g, m, y = dn(t.method), p = y ? "action" : "loader", v = (b) => {
    let w, R = new Promise((O, E) => w = E);
    m = () => w(), t.signal.addEventListener("abort", m);
    let T = (O) => typeof b != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${p}" [routeId: ${l.route.id}]`
      )
    ) : b(
      {
        request: t,
        url: Yb(t, a),
        pattern: r,
        params: l.params,
        context: h
      },
      ...O !== void 0 ? [O] : []
    ), _ = (async () => {
      try {
        return { type: "data", result: await (c ? c((E) => T(E)) : T()) };
      } catch (O) {
        return { type: "error", result: O };
      }
    })();
    return Promise.race([_, R]);
  };
  try {
    let b = y ? l.route.action : l.route.loader;
    if (s || u)
      if (b) {
        let w, [R] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          v(b).catch((T) => {
            w = T;
          }),
          // Ensure all lazy route promises are resolved before continuing
          s,
          u
        ]);
        if (w !== void 0)
          throw w;
        g = R;
      } else {
        await s;
        let w = y ? l.route.action : l.route.loader;
        if (w)
          [g] = await Promise.all([v(w), u]);
        else if (p === "action") {
          let R = new URL(t.url), T = R.pathname + R.search;
          throw ea(405, {
            method: t.method,
            pathname: T,
            routeId: l.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (b)
      g = await v(b);
    else {
      let w = new URL(t.url), R = w.pathname + w.search;
      throw ea(404, {
        pathname: R
      });
    }
  } catch (b) {
    return { type: "error", result: b };
  } finally {
    m && t.signal.removeEventListener("abort", m);
  }
  return g;
}
async function y_(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function v_(t) {
  let { result: a, type: r } = t;
  if (Lh(a)) {
    let l;
    try {
      l = await y_(a);
    } catch (s) {
      return { type: "error", error: s };
    }
    return r === "error" ? {
      type: "error",
      error: new Pu(a.status, a.statusText, l),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: l,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return r === "error" ? _y(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: S_(a),
    statusCode: Do(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: Do(a) ? a.status : void 0
  } : _y(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function b_(t, a, r, l, s) {
  let u = t.headers.get("Location");
  if (Ze(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !Dh(u)) {
    let c = l.slice(
      0,
      l.findIndex((h) => h.route.id === r) + 1
    );
    u = Jd(
      new URL(a.url),
      c,
      s,
      u
    ), t.headers.set("Location", u);
  }
  return t;
}
var vy = [
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
function by(t, a, r, l) {
  if (Dh(t)) {
    let s = t, u = s.startsWith("//") ? new URL(a.protocol + s) : new URL(s);
    if (vy.includes(u.protocol))
      throw new Error("Invalid redirect location");
    let c = aa(u.pathname, r) != null;
    if (u.origin === a.origin && c)
      return zh(u.pathname) + u.search + u.hash;
  }
  try {
    let s = l.createURL(t);
    if (vy.includes(s.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return t;
}
function sl(t, a, r, l) {
  let s = t.createURL($b(a)).toString(), u = { signal: r };
  if (l && dn(l.formMethod)) {
    let { formMethod: c, formEncType: h } = l;
    u.method = c.toUpperCase(), h === "application/json" ? (u.headers = new Headers({ "Content-Type": h }), u.body = JSON.stringify(l.json)) : h === "text/plain" ? u.body = l.text : h === "application/x-www-form-urlencoded" && l.formData ? u.body = eh(l.formData) : u.body = l.formData;
  }
  return new Request(s, u);
}
function Yb(t, a) {
  let r = new URL(t.url), l = typeof a == "string" ? va(a) : a;
  if (r.pathname = l.pathname || "/", l.search) {
    let s = new URLSearchParams(l.search), u = s.getAll("index");
    s.delete("index");
    for (let c of u.filter(Boolean))
      s.append("index", c);
    r.search = s.size ? `?${s.toString()}` : "";
  } else
    r.search = "";
  return r.hash = l.hash || "", r;
}
function eh(t) {
  let a = new URLSearchParams();
  for (let [r, l] of t.entries())
    a.append(r, typeof l == "string" ? l : l.name);
  return a;
}
function xy(t) {
  let a = new FormData();
  for (let [r, l] of t.entries())
    a.append(r, l);
  return a;
}
function x_(t, a, r, l = !1, s = !1) {
  let u = {}, c = null, h, g = !1, m = {}, y = r && kn(r[1]) ? r[1].error : void 0;
  return t.forEach((p) => {
    if (!(p.route.id in a))
      return;
    let v = p.route.id, b = a[v];
    if (Ze(
      !mr(b),
      "Cannot handle redirect results in processLoaderData"
    ), kn(b)) {
      let w = b.error;
      if (y !== void 0 && (w = y, y = void 0), c = c || {}, s)
        c[v] = w;
      else {
        let R = qi(t, v);
        c[R.route.id] == null && (c[R.route.id] = w);
      }
      l || (u[v] = jb), g || (g = !0, h = Do(b.error) ? b.error.status : 500), b.headers && (m[v] = b.headers);
    } else
      u[v] = b.data, b.statusCode && b.statusCode !== 200 && !g && (h = b.statusCode), b.headers && (m[v] = b.headers);
  }), y !== void 0 && r && (c = { [r[0]]: y }, r[2] && (u[r[2]] = void 0)), {
    loaderData: u,
    errors: c,
    statusCode: h || 200,
    loaderHeaders: m
  };
}
function wy(t, a, r, l, s, u, c) {
  let { loaderData: h, errors: g } = x_(
    a,
    r,
    l
  );
  return s.filter((m) => !m.matches || m.matches.some((y) => y.shouldLoad)).forEach((m) => {
    let { key: y, match: p, controller: v } = m;
    if (v && v.signal.aborted)
      return;
    let b = u[y];
    if (Ze(b, "Did not find corresponding fetcher result"), kn(b)) {
      let w = qi(t.matches, p?.route.id);
      g && g[w.route.id] || (g = {
        ...g,
        [w.route.id]: b.error
      }), c.delete(y);
    } else if (mr(b))
      Ze(!1, "Unhandled fetcher revalidation redirect");
    else {
      let w = Ma(b.data);
      c.set(y, w);
    }
  }), { loaderData: h, errors: g };
}
function Sy(t, a, r, l) {
  let s = Object.entries(a).filter(([, u]) => u !== jb).reduce((u, [c, h]) => (u[c] = h, u), {});
  for (let u of r) {
    let c = u.route.id;
    if (!a.hasOwnProperty(c) && t.hasOwnProperty(c) && u.route.loader && (s[c] = t[c]), l && l.hasOwnProperty(c))
      break;
  }
  return s;
}
function Ey(t) {
  return t ? kn(t[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [t[0]]: t[1].data
    }
  } : {};
}
function qi(t, a) {
  return (a ? t.slice(0, t.findIndex((l) => l.route.id === a) + 1) : [...t]).reverse().find((l) => l.route.hasErrorBoundary === !0) || t[0];
}
function ou(t) {
  let a = t.length === 1 ? t[0] : t.find((r) => r.index || !r.path || r.path === "/") || {
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
  routeId: r,
  method: l,
  type: s,
  message: u
} = {}) {
  let c = "Unknown Server Error", h = "Unknown @remix-run/router error";
  return t === 400 ? (c = "Bad Request", l && a && r ? h = `You made a ${l} request to "${a}" but did not provide a \`loader\` for route "${r}", so there is no way to handle the request.` : s === "invalid-body" && (h = "Unable to encode submission body")) : t === 403 ? (c = "Forbidden", h = `Route "${r}" does not match URL "${a}"`) : t === 404 ? (c = "Not Found", h = `No route matches URL "${a}"`) : t === 405 && (c = "Method Not Allowed", l && a && r ? h = `You made a ${l.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${r}", so there is no way to handle the request.` : l && (h = `Invalid request method "${l.toUpperCase()}"`)), new Pu(
    t || 500,
    c,
    new Error(h),
    !0
  );
}
function su(t) {
  let a = Object.entries(t);
  for (let r = a.length - 1; r >= 0; r--) {
    let [l, s] = a[r];
    if (mr(s))
      return { key: l, result: s };
  }
}
function $b(t) {
  let a = typeof t == "string" ? va(t) : t;
  return La({ ...a, hash: "" });
}
function w_(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function S_(t) {
  return new Pu(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function E_(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, r]) => typeof a == "string" && __(r)
  );
}
function __(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function N_(t) {
  return Lh(t.result) && Ob.has(t.result.status);
}
function kn(t) {
  return t.type === "error";
}
function mr(t) {
  return (t && t.type) === "redirect";
}
function _y(t) {
  return typeof t == "object" && t != null && "type" in t && "data" in t && "init" in t && t.type === "DataWithResponseInit";
}
function Lh(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.headers == "object" && typeof t.body < "u";
}
function R_(t) {
  return Ob.has(t);
}
function C_(t) {
  return Lh(t) && R_(t.status) && t.headers.has("Location");
}
function T_(t) {
  return a_.has(t.toUpperCase());
}
function dn(t) {
  return t_.has(t.toUpperCase());
}
function jh(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function Tu(t, a) {
  let r = typeof a == "string" ? va(a).search : a.search;
  if (t[t.length - 1].route.index && jh(r || ""))
    return t[t.length - 1];
  let l = Tb(t);
  return l[l.length - 1];
}
function Ny(t) {
  let { formMethod: a, formAction: r, formEncType: l, text: s, formData: u, json: c } = t;
  if (!(!a || !r || !l)) {
    if (s != null)
      return {
        formMethod: a,
        formAction: r,
        formEncType: l,
        formData: void 0,
        json: void 0,
        text: s
      };
    if (u != null)
      return {
        formMethod: a,
        formAction: r,
        formEncType: l,
        formData: u,
        json: void 0,
        text: void 0
      };
    if (c !== void 0)
      return {
        formMethod: a,
        formAction: r,
        formEncType: l,
        formData: void 0,
        json: c,
        text: void 0
      };
  }
}
function Td(t, a, r, l) {
  return l ? {
    state: "loading",
    location: t,
    matches: a,
    historyAction: r,
    formMethod: l.formMethod,
    formAction: l.formAction,
    formEncType: l.formEncType,
    formData: l.formData,
    json: l.json,
    text: l.text
  } : {
    state: "loading",
    location: t,
    matches: a,
    historyAction: r,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  };
}
function M_(t, a, r, l) {
  return {
    state: "submitting",
    location: t,
    matches: a,
    historyAction: r,
    formMethod: l.formMethod,
    formAction: l.formAction,
    formEncType: l.formEncType,
    formData: l.formData,
    json: l.json,
    text: l.text
  };
}
function vo(t, a) {
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
function D_(t, a) {
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
function Ma(t) {
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
function A_(t, a) {
  try {
    let r = t.sessionStorage.getItem(
      Lb
    );
    if (r) {
      let l = JSON.parse(r);
      for (let [s, u] of Object.entries(l || {}))
        u && Array.isArray(u) && a.set(s, new Set(u || []));
    }
  } catch {
  }
}
function z_(t, a) {
  if (a.size > 0) {
    let r = {};
    for (let [l, s] of a)
      r[l] = [...s];
    try {
      t.sessionStorage.setItem(
        Lb,
        JSON.stringify(r)
      );
    } catch (l) {
      $t(
        !1,
        `Failed to save applied view transitions in sessionStorage (${l}).`
      );
    }
  }
}
function Ry() {
  let t, a, r = new Promise((l, s) => {
    t = async (u) => {
      l(u);
      try {
        await r;
      } catch {
      }
    }, a = async (u) => {
      s(u);
      try {
        await r;
      } catch {
      }
    };
  });
  return {
    promise: r,
    //@ts-ignore
    resolve: t,
    //@ts-ignore
    reject: a
  };
}
var _r = N.createContext(null);
_r.displayName = "DataRouter";
var $o = N.createContext(null);
$o.displayName = "DataRouterState";
var Xb = N.createContext(!1);
function Gb() {
  return N.useContext(Xb);
}
var Hh = N.createContext({
  isTransitioning: !1
});
Hh.displayName = "ViewTransition";
var Ib = N.createContext(
  /* @__PURE__ */ new Map()
);
Ib.displayName = "Fetchers";
var O_ = N.createContext(null);
O_.displayName = "Await";
var ia = N.createContext(
  null
);
ia.displayName = "Navigation";
var Ju = N.createContext(
  null
);
Ju.displayName = "Location";
var ba = N.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
ba.displayName = "Route";
var Bh = N.createContext(null);
Bh.displayName = "RouteError";
var Zb = "REACT_ROUTER_ERROR", L_ = "REDIRECT", j_ = "ROUTE_ERROR_RESPONSE";
function H_(t) {
  if (t.startsWith(`${Zb}:${L_}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function B_(t) {
  if (t.startsWith(
    `${Zb}:${j_}:{`
  ))
    try {
      let a = JSON.parse(t.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new Pu(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function U_(t, { relative: a } = {}) {
  Ze(
    Xo(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: l } = N.useContext(ia), { hash: s, pathname: u, search: c } = Go(t, { relative: a }), h = u;
  return r !== "/" && (h = u === "/" ? r : na([r, u])), l.createHref({ pathname: h, search: c, hash: s });
}
function Xo() {
  return N.useContext(Ju) != null;
}
function si() {
  return Ze(
    Xo(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), N.useContext(Ju).location;
}
var Qb = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Fb(t) {
  N.useContext(ia).static || N.useLayoutEffect(t);
}
function k_() {
  let { isDataRoute: t } = N.useContext(ba);
  return t ? t2() : V_();
}
function V_() {
  Ze(
    Xo(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = N.useContext(_r), { basename: a, navigator: r } = N.useContext(ia), { matches: l } = N.useContext(ba), { pathname: s } = si(), u = JSON.stringify(Ah(l)), c = N.useRef(!1);
  return Fb(() => {
    c.current = !0;
  }), N.useCallback(
    (g, m = {}) => {
      if ($t(c.current, Qb), !c.current) return;
      if (typeof g == "number") {
        r.go(g);
        return;
      }
      let y = Ku(
        g,
        JSON.parse(u),
        s,
        m.relative === "path"
      );
      t == null && a !== "/" && (y.pathname = y.pathname === "/" ? a : na([a, y.pathname])), (m.replace ? r.replace : r.push)(
        y,
        m.state,
        m
      );
    },
    [
      a,
      r,
      u,
      s,
      t
    ]
  );
}
var q_ = N.createContext(null);
function Y_(t) {
  let a = N.useContext(ba).outlet;
  return N.useMemo(
    () => a && /* @__PURE__ */ N.createElement(q_.Provider, { value: t }, a),
    [a, t]
  );
}
function $_() {
  let { matches: t } = N.useContext(ba);
  return t[t.length - 1]?.params ?? {};
}
function Go(t, { relative: a } = {}) {
  let { matches: r } = N.useContext(ba), { pathname: l } = si(), s = JSON.stringify(Ah(r));
  return N.useMemo(
    () => Ku(
      t,
      JSON.parse(s),
      l,
      a === "path"
    ),
    [t, s, l, a]
  );
}
function X_(t, a, r) {
  Ze(
    Xo(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: l } = N.useContext(ia), { matches: s } = N.useContext(ba), u = s[s.length - 1], c = u ? u.params : {}, h = u ? u.pathname : "/", g = u ? u.pathnameBase : "/", m = u && u.route;
  {
    let T = m && m.path || "";
    Jb(
      h,
      !m || T.endsWith("*") || T.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${T}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${T}"> to <Route path="${T === "/" ? "*" : `${T}/*`}">.`
    );
  }
  let y = si(), p;
  p = y;
  let v = p.pathname || "/", b = v;
  if (g !== "/") {
    let T = g.replace(/^\//, "").split("/");
    b = "/" + v.replace(/^\//, "").split("/").slice(T.length).join("/");
  }
  let w = r && r.state.matches.length ? (
    // If we're in a data router, use the matches we've already identified but ensure
    // we have the latest route instances from the manifest in case elements have changed
    r.state.matches.map(
      (T) => Object.assign(T, {
        route: r.manifest[T.route.id] || T.route
      })
    )
  ) : _b(t, { pathname: b });
  return $t(
    m || w != null,
    `No routes matched location "${p.pathname}${p.search}${p.hash}" `
  ), $t(
    w == null || w[w.length - 1].route.element !== void 0 || w[w.length - 1].route.Component !== void 0 || w[w.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${p.pathname}${p.search}${p.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), F_(
    w && w.map(
      (T) => Object.assign({}, T, {
        params: Object.assign({}, c, T.params),
        pathname: na([
          g,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            T.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : T.pathname
        ]),
        pathnameBase: T.pathnameBase === "/" ? g : na([
          g,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            T.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : T.pathnameBase
        ])
      })
    ),
    s,
    r
  );
}
function G_() {
  let t = e2(), a = Do(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), r = t instanceof Error ? t.stack : null, l = "rgba(200,200,200, 0.5)", s = { padding: "0.5rem", backgroundColor: l }, u = { padding: "2px 4px", backgroundColor: l }, c = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), c = /* @__PURE__ */ N.createElement(N.Fragment, null, /* @__PURE__ */ N.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ N.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ N.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ N.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ N.createElement(N.Fragment, null, /* @__PURE__ */ N.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ N.createElement("h3", { style: { fontStyle: "italic" } }, a), r ? /* @__PURE__ */ N.createElement("pre", { style: s }, r) : null, c);
}
var I_ = /* @__PURE__ */ N.createElement(G_, null), Kb = class extends N.Component {
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
      const r = B_(t.digest);
      r && (t = r);
    }
    let a = t !== void 0 ? /* @__PURE__ */ N.createElement(ba.Provider, { value: this.props.routeContext }, /* @__PURE__ */ N.createElement(
      Bh.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ N.createElement(Z_, { error: t }, a) : a;
  }
};
Kb.contextType = Xb;
var Md = /* @__PURE__ */ new WeakMap();
function Z_({
  children: t,
  error: a
}) {
  let { basename: r } = N.useContext(ia);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let l = H_(a.digest);
    if (l) {
      let s = Md.get(a);
      if (s) throw s;
      let u = Db(l.location, r);
      if (Mb && !Md.get(a))
        if (u.isExternal || l.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const c = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(u.to, {
              replace: l.replace
            })
          );
          throw Md.set(a, c), c;
        }
      return /* @__PURE__ */ N.createElement(
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
function Q_({ routeContext: t, match: a, children: r }) {
  let l = N.useContext(_r);
  return l && l.static && l.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (l.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ N.createElement(ba.Provider, { value: t }, r);
}
function F_(t, a = [], r) {
  let l = r?.state;
  if (t == null) {
    if (!l)
      return null;
    if (l.errors)
      t = l.matches;
    else if (a.length === 0 && !l.initialized && l.matches.length > 0)
      t = l.matches;
    else
      return null;
  }
  let s = t, u = l?.errors;
  if (u != null) {
    let y = s.findIndex(
      (p) => p.route.id && u?.[p.route.id] !== void 0
    );
    Ze(
      y >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        u
      ).join(",")}`
    ), s = s.slice(
      0,
      Math.min(s.length, y + 1)
    );
  }
  let c = !1, h = -1;
  if (r && l) {
    c = l.renderFallback;
    for (let y = 0; y < s.length; y++) {
      let p = s[y];
      if ((p.route.HydrateFallback || p.route.hydrateFallbackElement) && (h = y), p.route.id) {
        let { loaderData: v, errors: b } = l, w = p.route.loader && !v.hasOwnProperty(p.route.id) && (!b || b[p.route.id] === void 0);
        if (p.route.lazy || w) {
          r.isStatic && (c = !0), h >= 0 ? s = s.slice(0, h + 1) : s = [s[0]];
          break;
        }
      }
    }
  }
  let g = r?.onError, m = l && g ? (y, p) => {
    g(y, {
      location: l.location,
      params: l.matches?.[0]?.params ?? {},
      pattern: Yo(l.matches),
      errorInfo: p
    });
  } : void 0;
  return s.reduceRight(
    (y, p, v) => {
      let b, w = !1, R = null, T = null;
      l && (b = u && p.route.id ? u[p.route.id] : void 0, R = p.route.errorElement || I_, c && (h < 0 && v === 0 ? (Jb(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), w = !0, T = null) : h === v && (w = !0, T = p.route.hydrateFallbackElement || null)));
      let _ = a.concat(s.slice(0, v + 1)), O = () => {
        let E;
        return b ? E = R : w ? E = T : p.route.Component ? E = /* @__PURE__ */ N.createElement(p.route.Component, null) : p.route.element ? E = p.route.element : E = y, /* @__PURE__ */ N.createElement(
          Q_,
          {
            match: p,
            routeContext: {
              outlet: y,
              matches: _,
              isDataRoute: l != null
            },
            children: E
          }
        );
      };
      return l && (p.route.ErrorBoundary || p.route.errorElement || v === 0) ? /* @__PURE__ */ N.createElement(
        Kb,
        {
          location: l.location,
          revalidation: l.revalidation,
          component: R,
          error: b,
          children: O(),
          routeContext: { outlet: null, matches: _, isDataRoute: !0 },
          onError: m
        }
      ) : O();
    },
    null
  );
}
function Uh(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function K_(t) {
  let a = N.useContext(_r);
  return Ze(a, Uh(t)), a;
}
function Pb(t) {
  let a = N.useContext($o);
  return Ze(a, Uh(t)), a;
}
function P_(t) {
  let a = N.useContext(ba);
  return Ze(a, Uh(t)), a;
}
function Wu(t) {
  let a = P_(t), r = a.matches[a.matches.length - 1];
  return Ze(
    r.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function J_() {
  return Wu(
    "useRouteId"
    /* UseRouteId */
  );
}
function W_() {
  let t = Pb(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Wu(
    "useLoaderData"
    /* UseLoaderData */
  );
  return t.loaderData[a];
}
function e2() {
  let t = N.useContext(Bh), a = Pb(
    "useRouteError"
    /* UseRouteError */
  ), r = Wu(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[r];
}
function t2() {
  let { router: t } = K_(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Wu(
    "useNavigate"
    /* UseNavigateStable */
  ), r = N.useRef(!1);
  return Fb(() => {
    r.current = !0;
  }), N.useCallback(
    async (s, u = {}) => {
      $t(r.current, Qb), r.current && (typeof s == "number" ? await t.navigate(s) : await t.navigate(s, { fromRouteId: a, ...u }));
    },
    [t, a]
  );
}
var Cy = {};
function Jb(t, a, r) {
  !a && !Cy[t] && (Cy[t] = !0, $t(!1, r));
}
var Ty = {};
function My(t, a) {
  !t && !Ty[a] && (Ty[a] = !0, console.warn(a));
}
var n2 = "useOptimistic", Dy = gE[n2], a2 = () => {
};
function i2(t) {
  return Dy ? Dy(t) : [t, a2];
}
function r2(t) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: t.hasErrorBoundary || t.ErrorBoundary != null || t.errorElement != null
  };
  return t.Component && (t.element && $t(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: N.createElement(t.Component),
    Component: void 0
  })), t.HydrateFallback && (t.hydrateFallbackElement && $t(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: N.createElement(t.HydrateFallback),
    HydrateFallback: void 0
  })), t.ErrorBoundary && (t.errorElement && $t(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: N.createElement(t.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var l2 = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function o2(t, a) {
  return s_({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: EE({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: t,
    hydrationRouteProperties: l2,
    mapRouteProperties: r2,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    instrumentations: a?.instrumentations
  }).initialize();
}
var s2 = class {
  constructor() {
    this.status = "pending", this.promise = new Promise((t, a) => {
      this.resolve = (r) => {
        this.status === "pending" && (this.status = "resolved", t(r));
      }, this.reject = (r) => {
        this.status === "pending" && (this.status = "rejected", a(r));
      };
    });
  }
};
function u2({
  router: t,
  flushSync: a,
  onError: r,
  useTransitions: l
}) {
  l = Gb() || l;
  let [u, c] = N.useState(t.state), [h, g] = i2(u), [m, y] = N.useState(), [p, v] = N.useState({
    isTransitioning: !1
  }), [b, w] = N.useState(), [R, T] = N.useState(), [_, O] = N.useState(), E = N.useRef(/* @__PURE__ */ new Map()), L = N.useCallback(
    (D, { deletedFetchers: G, newErrors: le, flushSync: $, viewTransitionOpts: K }) => {
      le && r && Object.values(le).forEach(
        (j) => r(j, {
          location: D.location,
          params: D.matches[0]?.params ?? {},
          pattern: Yo(D.matches)
        })
      ), D.fetchers.forEach((j, I) => {
        j.data !== void 0 && E.current.set(I, j.data);
      }), G.forEach((j) => E.current.delete(j)), My(
        $ === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let re = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (My(
        K == null || re,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !K || !re) {
        a && $ ? a(() => c(D)) : l === !1 ? c(D) : N.startTransition(() => {
          l === !0 && g((j) => Ay(j, D)), c(D);
        });
        return;
      }
      if (a && $) {
        a(() => {
          R && (b?.resolve(), R.skipTransition()), v({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: K.currentLocation,
            nextLocation: K.nextLocation
          });
        });
        let j = t.window.document.startViewTransition(() => {
          a(() => c(D));
        });
        j.finished.finally(() => {
          a(() => {
            w(void 0), T(void 0), y(void 0), v({ isTransitioning: !1 });
          });
        }), a(() => T(j));
        return;
      }
      R ? (b?.resolve(), R.skipTransition(), O({
        state: D,
        currentLocation: K.currentLocation,
        nextLocation: K.nextLocation
      })) : (y(D), v({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: K.currentLocation,
        nextLocation: K.nextLocation
      }));
    },
    [
      t.window,
      a,
      R,
      b,
      l,
      g,
      r
    ]
  );
  N.useLayoutEffect(() => t.subscribe(L), [t, L]), N.useEffect(() => {
    p.isTransitioning && !p.flushSync && w(new s2());
  }, [p]), N.useEffect(() => {
    if (b && m && t.window) {
      let D = m, G = b.promise, le = t.window.document.startViewTransition(async () => {
        l === !1 ? c(D) : N.startTransition(() => {
          l === !0 && g(($) => Ay($, D)), c(D);
        }), await G;
      });
      le.finished.finally(() => {
        w(void 0), T(void 0), y(void 0), v({ isTransitioning: !1 });
      }), T(le);
    }
  }, [
    m,
    b,
    t.window,
    l,
    g
  ]), N.useEffect(() => {
    b && m && h.location.key === m.location.key && b.resolve();
  }, [b, R, h.location, m]), N.useEffect(() => {
    !p.isTransitioning && _ && (y(_.state), v({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: _.currentLocation,
      nextLocation: _.nextLocation
    }), O(void 0));
  }, [p.isTransitioning, _]);
  let B = N.useMemo(() => ({
    createHref: t.createHref,
    encodeLocation: t.encodeLocation,
    go: (D) => t.navigate(D),
    push: (D, G, le) => t.navigate(D, {
      state: G,
      preventScrollReset: le?.preventScrollReset
    }),
    replace: (D, G, le) => t.navigate(D, {
      replace: !0,
      state: G,
      preventScrollReset: le?.preventScrollReset
    })
  }), [t]), H = t.basename || "/", V = N.useMemo(
    () => ({
      router: t,
      navigator: B,
      static: !1,
      basename: H,
      onError: r
    }),
    [t, B, H, r]
  );
  return /* @__PURE__ */ N.createElement(N.Fragment, null, /* @__PURE__ */ N.createElement(_r.Provider, { value: V }, /* @__PURE__ */ N.createElement($o.Provider, { value: h }, /* @__PURE__ */ N.createElement(Ib.Provider, { value: E.current }, /* @__PURE__ */ N.createElement(Hh.Provider, { value: p }, /* @__PURE__ */ N.createElement(
    h2,
    {
      basename: H,
      location: h.location,
      navigationType: h.historyAction,
      navigator: B,
      useTransitions: l
    },
    /* @__PURE__ */ N.createElement(
      c2,
      {
        routes: t.routes,
        manifest: t.manifest,
        future: t.future,
        state: h,
        isStatic: !1,
        onError: r
      }
    )
  ))))), null);
}
function Ay(t, a) {
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
var c2 = N.memo(f2);
function f2({
  routes: t,
  manifest: a,
  future: r,
  state: l,
  isStatic: s,
  onError: u
}) {
  return X_(t, void 0, {
    manifest: a,
    state: l,
    isStatic: s,
    onError: u
  });
}
function d2(t) {
  return Y_(t.context);
}
function h2({
  basename: t = "/",
  children: a = null,
  location: r,
  navigationType: l = "POP",
  navigator: s,
  static: u = !1,
  useTransitions: c
}) {
  Ze(
    !Xo(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let h = t.replace(/^\/*/, "/"), g = N.useMemo(
    () => ({
      basename: h,
      navigator: s,
      static: u,
      useTransitions: c,
      future: {}
    }),
    [h, s, u, c]
  );
  typeof r == "string" && (r = va(r));
  let {
    pathname: m = "/",
    search: y = "",
    hash: p = "",
    state: v = null,
    key: b = "default",
    mask: w
  } = r, R = N.useMemo(() => {
    let T = aa(m, h);
    return T == null ? null : {
      location: {
        pathname: T,
        search: y,
        hash: p,
        state: v,
        key: b,
        mask: w
      },
      navigationType: l
    };
  }, [h, m, y, p, v, b, l, w]);
  return $t(
    R != null,
    `<Router basename="${h}"> is not able to match the URL "${m}${y}${p}" because it does not start with the basename, so the <Router> won't render anything.`
  ), R == null ? null : /* @__PURE__ */ N.createElement(ia.Provider, { value: g }, /* @__PURE__ */ N.createElement(Ju.Provider, { children: a, value: R }));
}
var Mu = "get", Du = "application/x-www-form-urlencoded";
function ec(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function m2(t) {
  return ec(t) && t.tagName.toLowerCase() === "button";
}
function p2(t) {
  return ec(t) && t.tagName.toLowerCase() === "form";
}
function g2(t) {
  return ec(t) && t.tagName.toLowerCase() === "input";
}
function y2(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function v2(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !y2(t);
}
var uu = null;
function b2() {
  if (uu === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), uu = !1;
    } catch {
      uu = !0;
    }
  return uu;
}
var x2 = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function Dd(t) {
  return t != null && !x2.has(t) ? ($t(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Du}"`
  ), null) : t;
}
function w2(t, a) {
  let r, l, s, u, c;
  if (p2(t)) {
    let h = t.getAttribute("action");
    l = h ? aa(h, a) : null, r = t.getAttribute("method") || Mu, s = Dd(t.getAttribute("enctype")) || Du, u = new FormData(t);
  } else if (m2(t) || g2(t) && (t.type === "submit" || t.type === "image")) {
    let h = t.form;
    if (h == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let g = t.getAttribute("formaction") || h.getAttribute("action");
    if (l = g ? aa(g, a) : null, r = t.getAttribute("formmethod") || h.getAttribute("method") || Mu, s = Dd(t.getAttribute("formenctype")) || Dd(h.getAttribute("enctype")) || Du, u = new FormData(h, t), !b2()) {
      let { name: m, type: y, value: p } = t;
      if (y === "image") {
        let v = m ? `${m}.` : "";
        u.append(`${v}x`, "0"), u.append(`${v}y`, "0");
      } else m && u.append(m, p);
    }
  } else {
    if (ec(t))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = Mu, l = null, s = Du, c = t;
  }
  return u && s === "text/plain" && (c = u, u = void 0), { action: l, method: r.toLowerCase(), encType: s, formData: u, body: c };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function kh(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function Wb(t, a, r, l) {
  let s = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return r ? s.pathname.endsWith("/") ? s.pathname = `${s.pathname}_.${l}` : s.pathname = `${s.pathname}.${l}` : s.pathname === "/" ? s.pathname = `_root.${l}` : a && aa(s.pathname, a) === "/" ? s.pathname = `${Bu(a)}/_root.${l}` : s.pathname = `${Bu(s.pathname)}.${l}`, s;
}
async function S2(t, a) {
  if (t.id in a)
    return a[t.id];
  try {
    let r = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      t.module
    );
    return a[t.id] = r, r;
  } catch (r) {
    return console.error(
      `Error loading route module \`${t.module}\`, reloading page...`
    ), console.error(r), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function E2(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function _2(t, a, r) {
  let l = await Promise.all(
    t.map(async (s) => {
      let u = a.routes[s.route.id];
      if (u) {
        let c = await S2(u, r);
        return c.links ? c.links() : [];
      }
      return [];
    })
  );
  return T2(
    l.flat(1).filter(E2).filter((s) => s.rel === "stylesheet" || s.rel === "preload").map(
      (s) => s.rel === "stylesheet" ? { ...s, rel: "prefetch", as: "style" } : { ...s, rel: "prefetch" }
    )
  );
}
function zy(t, a, r, l, s, u) {
  let c = (g, m) => r[m] ? g.route.id !== r[m].route.id : !0, h = (g, m) => (
    // param change, /users/123 -> /users/456
    r[m].pathname !== g.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r[m].route.path?.endsWith("*") && r[m].params["*"] !== g.params["*"]
  );
  return u === "assets" ? a.filter(
    (g, m) => c(g, m) || h(g, m)
  ) : u === "data" ? a.filter((g, m) => {
    let y = l.routes[g.route.id];
    if (!y || !y.hasLoader)
      return !1;
    if (c(g, m) || h(g, m))
      return !0;
    if (g.route.shouldRevalidate) {
      let p = g.route.shouldRevalidate({
        currentUrl: new URL(
          s.pathname + s.search + s.hash,
          window.origin
        ),
        currentParams: r[0]?.params || {},
        nextUrl: new URL(t, window.origin),
        nextParams: g.params,
        defaultShouldRevalidate: !0
      });
      if (typeof p == "boolean")
        return p;
    }
    return !0;
  }) : [];
}
function N2(t, a, { includeHydrateFallback: r } = {}) {
  return R2(
    t.map((l) => {
      let s = a.routes[l.route.id];
      if (!s) return [];
      let u = [s.module];
      return s.clientActionModule && (u = u.concat(s.clientActionModule)), s.clientLoaderModule && (u = u.concat(s.clientLoaderModule)), r && s.hydrateFallbackModule && (u = u.concat(s.hydrateFallbackModule)), s.imports && (u = u.concat(s.imports)), u;
    }).flat(1)
  );
}
function R2(t) {
  return [...new Set(t)];
}
function C2(t) {
  let a = {}, r = Object.keys(t).sort();
  for (let l of r)
    a[l] = t[l];
  return a;
}
function T2(t, a) {
  let r = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((l, s) => {
    let u = JSON.stringify(C2(s));
    return r.has(u) || (r.add(u), l.push({ key: u, link: s })), l;
  }, []);
}
function Vh() {
  let t = N.useContext(_r);
  return kh(
    t,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), t;
}
function M2() {
  let t = N.useContext($o);
  return kh(
    t,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), t;
}
var qh = N.createContext(void 0);
qh.displayName = "FrameworkContext";
function Yh() {
  let t = N.useContext(qh);
  return kh(
    t,
    "You must render this element inside a <HydratedRouter> element"
  ), t;
}
function D2(t, a) {
  let r = N.useContext(qh), [l, s] = N.useState(!1), [u, c] = N.useState(!1), { onFocus: h, onBlur: g, onMouseEnter: m, onMouseLeave: y, onTouchStart: p } = a, v = N.useRef(null);
  N.useEffect(() => {
    if (t === "render" && c(!0), t === "viewport") {
      let R = (_) => {
        _.forEach((O) => {
          c(O.isIntersecting);
        });
      }, T = new IntersectionObserver(R, { threshold: 0.5 });
      return v.current && T.observe(v.current), () => {
        T.disconnect();
      };
    }
  }, [t]), N.useEffect(() => {
    if (l) {
      let R = setTimeout(() => {
        c(!0);
      }, 100);
      return () => {
        clearTimeout(R);
      };
    }
  }, [l]);
  let b = () => {
    s(!0);
  }, w = () => {
    s(!1), c(!1);
  };
  return r ? t !== "intent" ? [u, v, {}] : [
    u,
    v,
    {
      onFocus: bo(h, b),
      onBlur: bo(g, w),
      onMouseEnter: bo(m, b),
      onMouseLeave: bo(y, w),
      onTouchStart: bo(p, b)
    }
  ] : [!1, v, {}];
}
function bo(t, a) {
  return (r) => {
    t && t(r), r.defaultPrevented || a(r);
  };
}
function A2({ page: t, ...a }) {
  let r = Gb(), { router: l } = Vh(), s = N.useMemo(
    () => _b(l.routes, t, l.basename),
    [l.routes, t, l.basename]
  );
  return s ? r ? /* @__PURE__ */ N.createElement(O2, { page: t, matches: s, ...a }) : /* @__PURE__ */ N.createElement(L2, { page: t, matches: s, ...a }) : null;
}
function z2(t) {
  let { manifest: a, routeModules: r } = Yh(), [l, s] = N.useState([]);
  return N.useEffect(() => {
    let u = !1;
    return _2(t, a, r).then(
      (c) => {
        u || s(c);
      }
    ), () => {
      u = !0;
    };
  }, [t, a, r]), l;
}
function O2({
  page: t,
  matches: a,
  ...r
}) {
  let l = si(), { future: s } = Yh(), { basename: u } = Vh(), c = N.useMemo(() => {
    if (t === l.pathname + l.search + l.hash)
      return [];
    let h = Wb(
      t,
      u,
      s.v8_trailingSlashAwareDataRequests,
      "rsc"
    ), g = !1, m = [];
    for (let y of a)
      typeof y.route.shouldRevalidate == "function" ? g = !0 : m.push(y.route.id);
    return g && m.length > 0 && h.searchParams.set("_routes", m.join(",")), [h.pathname + h.search];
  }, [
    u,
    s.v8_trailingSlashAwareDataRequests,
    t,
    l,
    a
  ]);
  return /* @__PURE__ */ N.createElement(N.Fragment, null, c.map((h) => /* @__PURE__ */ N.createElement("link", { key: h, rel: "prefetch", as: "fetch", href: h, ...r })));
}
function L2({
  page: t,
  matches: a,
  ...r
}) {
  let l = si(), { future: s, manifest: u, routeModules: c } = Yh(), { basename: h } = Vh(), { loaderData: g, matches: m } = M2(), y = N.useMemo(
    () => zy(
      t,
      a,
      m,
      u,
      l,
      "data"
    ),
    [t, a, m, u, l]
  ), p = N.useMemo(
    () => zy(
      t,
      a,
      m,
      u,
      l,
      "assets"
    ),
    [t, a, m, u, l]
  ), v = N.useMemo(() => {
    if (t === l.pathname + l.search + l.hash)
      return [];
    let R = /* @__PURE__ */ new Set(), T = !1;
    if (a.forEach((O) => {
      let E = u.routes[O.route.id];
      !E || !E.hasLoader || (!y.some((L) => L.route.id === O.route.id) && O.route.id in g && c[O.route.id]?.shouldRevalidate || E.hasClientLoader ? T = !0 : R.add(O.route.id));
    }), R.size === 0)
      return [];
    let _ = Wb(
      t,
      h,
      s.v8_trailingSlashAwareDataRequests,
      "data"
    );
    return T && R.size > 0 && _.searchParams.set(
      "_routes",
      a.filter((O) => R.has(O.route.id)).map((O) => O.route.id).join(",")
    ), [_.pathname + _.search];
  }, [
    h,
    s.v8_trailingSlashAwareDataRequests,
    g,
    l,
    u,
    y,
    a,
    t,
    c
  ]), b = N.useMemo(
    () => N2(p, u),
    [p, u]
  ), w = z2(p);
  return /* @__PURE__ */ N.createElement(N.Fragment, null, v.map((R) => /* @__PURE__ */ N.createElement("link", { key: R, rel: "prefetch", as: "fetch", href: R, ...r })), b.map((R) => /* @__PURE__ */ N.createElement("link", { key: R, rel: "modulepreload", href: R, ...r })), w.map(({ key: R, link: T }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ N.createElement(
      "link",
      {
        key: R,
        nonce: r.nonce,
        ...T,
        crossOrigin: T.crossOrigin ?? r.crossOrigin
      }
    )
  )));
}
function j2(...t) {
  return (a) => {
    t.forEach((r) => {
      typeof r == "function" ? r(a) : r != null && (r.current = a);
    });
  };
}
var H2 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  H2 && (window.__reactRouterVersion = // @ts-expect-error
  "7.17.0");
} catch {
}
var e1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, t1 = N.forwardRef(
  function({
    onClick: a,
    discover: r = "render",
    prefetch: l = "none",
    relative: s,
    reloadDocument: u,
    replace: c,
    mask: h,
    state: g,
    target: m,
    to: y,
    preventScrollReset: p,
    viewTransition: v,
    defaultShouldRevalidate: b,
    ...w
  }, R) {
    let { basename: T, navigator: _, useTransitions: O } = N.useContext(ia), E = typeof y == "string" && e1.test(y), L = Db(y, T);
    y = L.to;
    let B = U_(y, { relative: s }), H = si(), V = null;
    if (h) {
      let I = Ku(
        h,
        [],
        H.mask ? H.mask.pathname : "/",
        !0
      );
      T !== "/" && (I.pathname = I.pathname === "/" ? T : na([T, I.pathname])), V = _.createHref(I);
    }
    let [D, G, le] = D2(
      l,
      w
    ), $ = k2(y, {
      replace: c,
      mask: h,
      state: g,
      target: m,
      preventScrollReset: p,
      relative: s,
      viewTransition: v,
      defaultShouldRevalidate: b,
      useTransitions: O
    });
    function K(I) {
      a && a(I), I.defaultPrevented || $(I);
    }
    let re = !(L.isExternal || u), j = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ N.createElement(
        "a",
        {
          ...w,
          ...le,
          href: (re ? V : void 0) || L.absoluteURL || B,
          onClick: re ? K : a,
          ref: j2(R, G),
          target: m,
          "data-discover": !E && r === "render" ? "true" : void 0
        }
      )
    );
    return D && !E ? /* @__PURE__ */ N.createElement(N.Fragment, null, j, /* @__PURE__ */ N.createElement(A2, { page: B })) : j;
  }
);
t1.displayName = "Link";
var n1 = N.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: r = !1,
    className: l = "",
    end: s = !1,
    style: u,
    to: c,
    viewTransition: h,
    children: g,
    ...m
  }, y) {
    let p = Go(c, { relative: m.relative }), v = si(), b = N.useContext($o), { navigator: w, basename: R } = N.useContext(ia), T = b != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    X2(p) && h === !0, _ = w.encodeLocation ? w.encodeLocation(p).pathname : p.pathname, O = v.pathname, E = b && b.navigation && b.navigation.location ? b.navigation.location.pathname : null;
    r || (O = O.toLowerCase(), E = E ? E.toLowerCase() : null, _ = _.toLowerCase()), E && R && (E = aa(E, R) || E);
    const L = _ !== "/" && _.endsWith("/") ? _.length - 1 : _.length;
    let B = O === _ || !s && O.startsWith(_) && O.charAt(L) === "/", H = E != null && (E === _ || !s && E.startsWith(_) && E.charAt(_.length) === "/"), V = {
      isActive: B,
      isPending: H,
      isTransitioning: T
    }, D = B ? a : void 0, G;
    typeof l == "function" ? G = l(V) : G = [
      l,
      B ? "active" : null,
      H ? "pending" : null,
      T ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let le = typeof u == "function" ? u(V) : u;
    return /* @__PURE__ */ N.createElement(
      t1,
      {
        ...m,
        "aria-current": D,
        className: G,
        ref: y,
        style: le,
        to: c,
        viewTransition: h
      },
      typeof g == "function" ? g(V) : g
    );
  }
);
n1.displayName = "NavLink";
var B2 = N.forwardRef(
  ({
    discover: t = "render",
    fetcherKey: a,
    navigate: r,
    reloadDocument: l,
    replace: s,
    state: u,
    method: c = Mu,
    action: h,
    onSubmit: g,
    relative: m,
    preventScrollReset: y,
    viewTransition: p,
    defaultShouldRevalidate: v,
    ...b
  }, w) => {
    let { useTransitions: R } = N.useContext(ia), T = Y2(), _ = $2(h, { relative: m }), O = c.toLowerCase() === "get" ? "get" : "post", E = typeof h == "string" && e1.test(h), L = (B) => {
      if (g && g(B), B.defaultPrevented) return;
      B.preventDefault();
      let H = B.nativeEvent.submitter, V = H?.getAttribute("formmethod") || c, D = () => T(H || B.currentTarget, {
        fetcherKey: a,
        method: V,
        navigate: r,
        replace: s,
        state: u,
        relative: m,
        preventScrollReset: y,
        viewTransition: p,
        defaultShouldRevalidate: v
      });
      R && r !== !1 ? N.startTransition(() => D()) : D();
    };
    return /* @__PURE__ */ N.createElement(
      "form",
      {
        ref: w,
        method: O,
        action: _,
        onSubmit: l ? g : L,
        ...b,
        "data-discover": !E && t === "render" ? "true" : void 0
      }
    );
  }
);
B2.displayName = "Form";
function U2(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function a1(t) {
  let a = N.useContext(_r);
  return Ze(a, U2(t)), a;
}
function k2(t, {
  target: a,
  replace: r,
  mask: l,
  state: s,
  preventScrollReset: u,
  relative: c,
  viewTransition: h,
  defaultShouldRevalidate: g,
  useTransitions: m
} = {}) {
  let y = k_(), p = si(), v = Go(t, { relative: c });
  return N.useCallback(
    (b) => {
      if (v2(b, a)) {
        b.preventDefault();
        let w = r !== void 0 ? r : La(p) === La(v), R = () => y(t, {
          replace: w,
          mask: l,
          state: s,
          preventScrollReset: u,
          relative: c,
          viewTransition: h,
          defaultShouldRevalidate: g
        });
        m ? N.startTransition(() => R()) : R();
      }
    },
    [
      p,
      y,
      v,
      r,
      l,
      s,
      a,
      t,
      u,
      c,
      h,
      g,
      m
    ]
  );
}
var V2 = 0, q2 = () => `__${String(++V2)}__`;
function Y2() {
  let { router: t } = a1(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = N.useContext(ia), r = J_(), l = t.fetch, s = t.navigate;
  return N.useCallback(
    async (u, c = {}) => {
      let { action: h, method: g, encType: m, formData: y, body: p } = w2(
        u,
        a
      );
      if (c.navigate === !1) {
        let v = c.fetcherKey || q2();
        await l(v, r, c.action || h, {
          defaultShouldRevalidate: c.defaultShouldRevalidate,
          preventScrollReset: c.preventScrollReset,
          formData: y,
          body: p,
          formMethod: c.method || g,
          formEncType: c.encType || m,
          flushSync: c.flushSync
        });
      } else
        await s(c.action || h, {
          defaultShouldRevalidate: c.defaultShouldRevalidate,
          preventScrollReset: c.preventScrollReset,
          formData: y,
          body: p,
          formMethod: c.method || g,
          formEncType: c.encType || m,
          replace: c.replace,
          state: c.state,
          fromRouteId: r,
          flushSync: c.flushSync,
          viewTransition: c.viewTransition
        });
    },
    [l, s, a, r]
  );
}
function $2(t, { relative: a } = {}) {
  let { basename: r } = N.useContext(ia), l = N.useContext(ba);
  Ze(l, "useFormAction must be used inside a RouteContext");
  let [s] = l.matches.slice(-1), u = { ...Go(t || ".", { relative: a }) }, c = si();
  if (t == null) {
    u.search = c.search;
    let h = new URLSearchParams(u.search), g = h.getAll("index");
    if (g.some((y) => y === "")) {
      h.delete("index"), g.filter((p) => p).forEach((p) => h.append("index", p));
      let y = h.toString();
      u.search = y ? `?${y}` : "";
    }
  }
  return (!t || t === ".") && s.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (u.pathname = u.pathname === "/" ? r : na([r, u.pathname])), La(u);
}
function X2(t, { relative: a } = {}) {
  let r = N.useContext(Hh);
  Ze(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: l } = a1(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), s = Go(t, { relative: a });
  if (!r.isTransitioning)
    return !1;
  let u = aa(r.currentLocation.pathname, l) || r.currentLocation.pathname, c = aa(r.nextLocation.pathname, l) || r.nextLocation.pathname;
  return Hu(s.pathname, c) != null || Hu(s.pathname, u) != null;
}
const G2 = [
  { value: "auto", label: "Auto (flash2 → sdpa)" },
  { value: "sdpa", label: "SDPA (always works)" },
  { value: "flash2", label: "Flash Attention 2 (recommended)" },
  { value: "sage2", label: "SageAttention 2" },
  { value: "sage3_fp4", label: "SageAttention 3 FP4" }
], I2 = [
  { value: "bf16", label: "bf16 (Blackwell colour fix, recommended)" },
  { value: "fp8", label: "fp8" }
], i1 = {
  modelsDir: "",
  attentionBackend: "flash2",
  fp8Compute: "bf16",
  blocksToSwap: 40,
  interpolateMethod: "rife",
  interpolateFps: 48,
  outputDir: ""
};
class tc extends Error {
  constructor(a, r, l, s) {
    super(l), this.status = a, this.category = r, this.requestId = s, this.name = "ExtensionApiError";
  }
}
const nc = "/api/v1/extensions/nexus.video.svi2-pro";
async function Nr(t, a) {
  const r = t.startsWith("http") ? t : `${nc}${t}`, l = await fetch(r, {
    ...a,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      ...a?.headers ?? {}
    }
  });
  if (!l.ok) {
    let s = null;
    try {
      s = await l.json();
    } catch {
      s = null;
    }
    throw new tc(
      l.status,
      s?.category ?? "unknown",
      s?.message ?? l.statusText,
      s?.requestId
    );
  }
  if (l.status !== 204)
    return await l.json();
}
function Z2(t, a, r) {
  const l = t.startsWith("http") ? t : `${nc}${t}`, s = new EventSource(l);
  return s.onmessage = (u) => {
    if (u.data)
      try {
        a(JSON.parse(u.data));
      } catch {
      }
  }, s.onerror = (u) => {
    r?.(u);
  }, () => s.close();
}
async function r1() {
  return Nr("/presets");
}
async function Q2() {
  return Nr("/settings");
}
async function F2(t) {
  return Nr("/settings", {
    method: "PUT",
    body: JSON.stringify(t)
  });
}
var K2 = { neutral: "xyw58f1 xyw58f0", accent: "xyw58f2 xyw58f0", warning: "xyw58f3 xyw58f0", success: "xyw58f4 xyw58f0" };
function ta({ tone: t = "neutral", children: a, className: r }) {
  const l = [K2[t], r].filter(Boolean).join(" ");
  return /* @__PURE__ */ S.jsx("span", { className: l, children: a });
}
var P2 = { primary: "_1h48t1v1 _1h48t1v0", secondary: "_1h48t1v2 _1h48t1v0", ghost: "_1h48t1v3 _1h48t1v0", danger: "_1h48t1v4 _1h48t1v0" }, J2 = { sm: "_1h48t1v5", md: "_1h48t1v6", lg: "_1h48t1v7" }, W2 = "_1h48t1v9";
function ii({
  variant: t = "primary",
  size: a = "md",
  type: r = "button",
  loading: l = !1,
  disabled: s,
  children: u,
  className: c,
  ...h
}) {
  const g = [P2[t], J2[a], c].filter(Boolean).join(" ");
  return /* @__PURE__ */ S.jsxs(
    "button",
    {
      type: r,
      className: g,
      disabled: l || s,
      "aria-busy": l || void 0,
      ...h,
      children: [
        l ? /* @__PURE__ */ S.jsx("span", { className: W2, "aria-hidden": "true" }) : null,
        u
      ]
    }
  );
}
function Ft(t) {
  if (typeof t == "string" || typeof t == "number") return "" + t;
  let a = "";
  if (Array.isArray(t))
    for (let r = 0, l; r < t.length; r++)
      (l = Ft(t[r])) !== "" && (a += (a && " ") + l);
  else
    for (let r in t)
      t[r] && (a += (a && " ") + r);
  return a;
}
var eN = { value: () => {
} };
function ac() {
  for (var t = 0, a = arguments.length, r = {}, l; t < a; ++t) {
    if (!(l = arguments[t] + "") || l in r || /[\s.]/.test(l)) throw new Error("illegal type: " + l);
    r[l] = [];
  }
  return new Au(r);
}
function Au(t) {
  this._ = t;
}
function tN(t, a) {
  return t.trim().split(/^|\s+/).map(function(r) {
    var l = "", s = r.indexOf(".");
    if (s >= 0 && (l = r.slice(s + 1), r = r.slice(0, s)), r && !a.hasOwnProperty(r)) throw new Error("unknown type: " + r);
    return { type: r, name: l };
  });
}
Au.prototype = ac.prototype = {
  constructor: Au,
  on: function(t, a) {
    var r = this._, l = tN(t + "", r), s, u = -1, c = l.length;
    if (arguments.length < 2) {
      for (; ++u < c; ) if ((s = (t = l[u]).type) && (s = nN(r[s], t.name))) return s;
      return;
    }
    if (a != null && typeof a != "function") throw new Error("invalid callback: " + a);
    for (; ++u < c; )
      if (s = (t = l[u]).type) r[s] = Oy(r[s], t.name, a);
      else if (a == null) for (s in r) r[s] = Oy(r[s], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, a = this._;
    for (var r in a) t[r] = a[r].slice();
    return new Au(t);
  },
  call: function(t, a) {
    if ((s = arguments.length - 2) > 0) for (var r = new Array(s), l = 0, s, u; l < s; ++l) r[l] = arguments[l + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (u = this._[t], l = 0, s = u.length; l < s; ++l) u[l].value.apply(a, r);
  },
  apply: function(t, a, r) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var l = this._[t], s = 0, u = l.length; s < u; ++s) l[s].value.apply(a, r);
  }
};
function nN(t, a) {
  for (var r = 0, l = t.length, s; r < l; ++r)
    if ((s = t[r]).name === a)
      return s.value;
}
function Oy(t, a, r) {
  for (var l = 0, s = t.length; l < s; ++l)
    if (t[l].name === a) {
      t[l] = eN, t = t.slice(0, l).concat(t.slice(l + 1));
      break;
    }
  return r != null && t.push({ name: a, value: r }), t;
}
var th = "http://www.w3.org/1999/xhtml";
const Ly = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: th,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ic(t) {
  var a = t += "", r = a.indexOf(":");
  return r >= 0 && (a = t.slice(0, r)) !== "xmlns" && (t = t.slice(r + 1)), Ly.hasOwnProperty(a) ? { space: Ly[a], local: t } : t;
}
function aN(t) {
  return function() {
    var a = this.ownerDocument, r = this.namespaceURI;
    return r === th && a.documentElement.namespaceURI === th ? a.createElement(t) : a.createElementNS(r, t);
  };
}
function iN(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function l1(t) {
  var a = ic(t);
  return (a.local ? iN : aN)(a);
}
function rN() {
}
function $h(t) {
  return t == null ? rN : function() {
    return this.querySelector(t);
  };
}
function lN(t) {
  typeof t != "function" && (t = $h(t));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, h = l[s] = new Array(c), g, m, y = 0; y < c; ++y)
      (g = u[y]) && (m = t.call(g, g.__data__, y, u)) && ("__data__" in g && (m.__data__ = g.__data__), h[y] = m);
  return new qn(l, this._parents);
}
function oN(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function sN() {
  return [];
}
function o1(t) {
  return t == null ? sN : function() {
    return this.querySelectorAll(t);
  };
}
function uN(t) {
  return function() {
    return oN(t.apply(this, arguments));
  };
}
function cN(t) {
  typeof t == "function" ? t = uN(t) : t = o1(t);
  for (var a = this._groups, r = a.length, l = [], s = [], u = 0; u < r; ++u)
    for (var c = a[u], h = c.length, g, m = 0; m < h; ++m)
      (g = c[m]) && (l.push(t.call(g, g.__data__, m, c)), s.push(g));
  return new qn(l, s);
}
function s1(t) {
  return function() {
    return this.matches(t);
  };
}
function u1(t) {
  return function(a) {
    return a.matches(t);
  };
}
var fN = Array.prototype.find;
function dN(t) {
  return function() {
    return fN.call(this.children, t);
  };
}
function hN() {
  return this.firstElementChild;
}
function mN(t) {
  return this.select(t == null ? hN : dN(typeof t == "function" ? t : u1(t)));
}
var pN = Array.prototype.filter;
function gN() {
  return Array.from(this.children);
}
function yN(t) {
  return function() {
    return pN.call(this.children, t);
  };
}
function vN(t) {
  return this.selectAll(t == null ? gN : yN(typeof t == "function" ? t : u1(t)));
}
function bN(t) {
  typeof t != "function" && (t = s1(t));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, h = l[s] = [], g, m = 0; m < c; ++m)
      (g = u[m]) && t.call(g, g.__data__, m, u) && h.push(g);
  return new qn(l, this._parents);
}
function c1(t) {
  return new Array(t.length);
}
function xN() {
  return new qn(this._enter || this._groups.map(c1), this._parents);
}
function Uu(t, a) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = a;
}
Uu.prototype = {
  constructor: Uu,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, a) {
    return this._parent.insertBefore(t, a);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function wN(t) {
  return function() {
    return t;
  };
}
function SN(t, a, r, l, s, u) {
  for (var c = 0, h, g = a.length, m = u.length; c < m; ++c)
    (h = a[c]) ? (h.__data__ = u[c], l[c] = h) : r[c] = new Uu(t, u[c]);
  for (; c < g; ++c)
    (h = a[c]) && (s[c] = h);
}
function EN(t, a, r, l, s, u, c) {
  var h, g, m = /* @__PURE__ */ new Map(), y = a.length, p = u.length, v = new Array(y), b;
  for (h = 0; h < y; ++h)
    (g = a[h]) && (v[h] = b = c.call(g, g.__data__, h, a) + "", m.has(b) ? s[h] = g : m.set(b, g));
  for (h = 0; h < p; ++h)
    b = c.call(t, u[h], h, u) + "", (g = m.get(b)) ? (l[h] = g, g.__data__ = u[h], m.delete(b)) : r[h] = new Uu(t, u[h]);
  for (h = 0; h < y; ++h)
    (g = a[h]) && m.get(v[h]) === g && (s[h] = g);
}
function _N(t) {
  return t.__data__;
}
function NN(t, a) {
  if (!arguments.length) return Array.from(this, _N);
  var r = a ? EN : SN, l = this._parents, s = this._groups;
  typeof t != "function" && (t = wN(t));
  for (var u = s.length, c = new Array(u), h = new Array(u), g = new Array(u), m = 0; m < u; ++m) {
    var y = l[m], p = s[m], v = p.length, b = RN(t.call(y, y && y.__data__, m, l)), w = b.length, R = h[m] = new Array(w), T = c[m] = new Array(w), _ = g[m] = new Array(v);
    r(y, p, R, T, _, b, a);
    for (var O = 0, E = 0, L, B; O < w; ++O)
      if (L = R[O]) {
        for (O >= E && (E = O + 1); !(B = T[E]) && ++E < w; ) ;
        L._next = B || null;
      }
  }
  return c = new qn(c, l), c._enter = h, c._exit = g, c;
}
function RN(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function CN() {
  return new qn(this._exit || this._groups.map(c1), this._parents);
}
function TN(t, a, r) {
  var l = this.enter(), s = this, u = this.exit();
  return typeof t == "function" ? (l = t(l), l && (l = l.selection())) : l = l.append(t + ""), a != null && (s = a(s), s && (s = s.selection())), r == null ? u.remove() : r(u), l && s ? l.merge(s).order() : s;
}
function MN(t) {
  for (var a = t.selection ? t.selection() : t, r = this._groups, l = a._groups, s = r.length, u = l.length, c = Math.min(s, u), h = new Array(s), g = 0; g < c; ++g)
    for (var m = r[g], y = l[g], p = m.length, v = h[g] = new Array(p), b, w = 0; w < p; ++w)
      (b = m[w] || y[w]) && (v[w] = b);
  for (; g < s; ++g)
    h[g] = r[g];
  return new qn(h, this._parents);
}
function DN() {
  for (var t = this._groups, a = -1, r = t.length; ++a < r; )
    for (var l = t[a], s = l.length - 1, u = l[s], c; --s >= 0; )
      (c = l[s]) && (u && c.compareDocumentPosition(u) ^ 4 && u.parentNode.insertBefore(c, u), u = c);
  return this;
}
function AN(t) {
  t || (t = zN);
  function a(p, v) {
    return p && v ? t(p.__data__, v.__data__) : !p - !v;
  }
  for (var r = this._groups, l = r.length, s = new Array(l), u = 0; u < l; ++u) {
    for (var c = r[u], h = c.length, g = s[u] = new Array(h), m, y = 0; y < h; ++y)
      (m = c[y]) && (g[y] = m);
    g.sort(a);
  }
  return new qn(s, this._parents).order();
}
function zN(t, a) {
  return t < a ? -1 : t > a ? 1 : t >= a ? 0 : NaN;
}
function ON() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function LN() {
  return Array.from(this);
}
function jN() {
  for (var t = this._groups, a = 0, r = t.length; a < r; ++a)
    for (var l = t[a], s = 0, u = l.length; s < u; ++s) {
      var c = l[s];
      if (c) return c;
    }
  return null;
}
function HN() {
  let t = 0;
  for (const a of this) ++t;
  return t;
}
function BN() {
  return !this.node();
}
function UN(t) {
  for (var a = this._groups, r = 0, l = a.length; r < l; ++r)
    for (var s = a[r], u = 0, c = s.length, h; u < c; ++u)
      (h = s[u]) && t.call(h, h.__data__, u, s);
  return this;
}
function kN(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function VN(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function qN(t, a) {
  return function() {
    this.setAttribute(t, a);
  };
}
function YN(t, a) {
  return function() {
    this.setAttributeNS(t.space, t.local, a);
  };
}
function $N(t, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? this.removeAttribute(t) : this.setAttribute(t, r);
  };
}
function XN(t, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, r);
  };
}
function GN(t, a) {
  var r = ic(t);
  if (arguments.length < 2) {
    var l = this.node();
    return r.local ? l.getAttributeNS(r.space, r.local) : l.getAttribute(r);
  }
  return this.each((a == null ? r.local ? VN : kN : typeof a == "function" ? r.local ? XN : $N : r.local ? YN : qN)(r, a));
}
function f1(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function IN(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function ZN(t, a, r) {
  return function() {
    this.style.setProperty(t, a, r);
  };
}
function QN(t, a, r) {
  return function() {
    var l = a.apply(this, arguments);
    l == null ? this.style.removeProperty(t) : this.style.setProperty(t, l, r);
  };
}
function FN(t, a, r) {
  return arguments.length > 1 ? this.each((a == null ? IN : typeof a == "function" ? QN : ZN)(t, a, r ?? "")) : gl(this.node(), t);
}
function gl(t, a) {
  return t.style.getPropertyValue(a) || f1(t).getComputedStyle(t, null).getPropertyValue(a);
}
function KN(t) {
  return function() {
    delete this[t];
  };
}
function PN(t, a) {
  return function() {
    this[t] = a;
  };
}
function JN(t, a) {
  return function() {
    var r = a.apply(this, arguments);
    r == null ? delete this[t] : this[t] = r;
  };
}
function WN(t, a) {
  return arguments.length > 1 ? this.each((a == null ? KN : typeof a == "function" ? JN : PN)(t, a)) : this.node()[t];
}
function d1(t) {
  return t.trim().split(/^|\s+/);
}
function Xh(t) {
  return t.classList || new h1(t);
}
function h1(t) {
  this._node = t, this._names = d1(t.getAttribute("class") || "");
}
h1.prototype = {
  add: function(t) {
    var a = this._names.indexOf(t);
    a < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var a = this._names.indexOf(t);
    a >= 0 && (this._names.splice(a, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function m1(t, a) {
  for (var r = Xh(t), l = -1, s = a.length; ++l < s; ) r.add(a[l]);
}
function p1(t, a) {
  for (var r = Xh(t), l = -1, s = a.length; ++l < s; ) r.remove(a[l]);
}
function eR(t) {
  return function() {
    m1(this, t);
  };
}
function tR(t) {
  return function() {
    p1(this, t);
  };
}
function nR(t, a) {
  return function() {
    (a.apply(this, arguments) ? m1 : p1)(this, t);
  };
}
function aR(t, a) {
  var r = d1(t + "");
  if (arguments.length < 2) {
    for (var l = Xh(this.node()), s = -1, u = r.length; ++s < u; ) if (!l.contains(r[s])) return !1;
    return !0;
  }
  return this.each((typeof a == "function" ? nR : a ? eR : tR)(r, a));
}
function iR() {
  this.textContent = "";
}
function rR(t) {
  return function() {
    this.textContent = t;
  };
}
function lR(t) {
  return function() {
    var a = t.apply(this, arguments);
    this.textContent = a ?? "";
  };
}
function oR(t) {
  return arguments.length ? this.each(t == null ? iR : (typeof t == "function" ? lR : rR)(t)) : this.node().textContent;
}
function sR() {
  this.innerHTML = "";
}
function uR(t) {
  return function() {
    this.innerHTML = t;
  };
}
function cR(t) {
  return function() {
    var a = t.apply(this, arguments);
    this.innerHTML = a ?? "";
  };
}
function fR(t) {
  return arguments.length ? this.each(t == null ? sR : (typeof t == "function" ? cR : uR)(t)) : this.node().innerHTML;
}
function dR() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function hR() {
  return this.each(dR);
}
function mR() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function pR() {
  return this.each(mR);
}
function gR(t) {
  var a = typeof t == "function" ? t : l1(t);
  return this.select(function() {
    return this.appendChild(a.apply(this, arguments));
  });
}
function yR() {
  return null;
}
function vR(t, a) {
  var r = typeof t == "function" ? t : l1(t), l = a == null ? yR : typeof a == "function" ? a : $h(a);
  return this.select(function() {
    return this.insertBefore(r.apply(this, arguments), l.apply(this, arguments) || null);
  });
}
function bR() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function xR() {
  return this.each(bR);
}
function wR() {
  var t = this.cloneNode(!1), a = this.parentNode;
  return a ? a.insertBefore(t, this.nextSibling) : t;
}
function SR() {
  var t = this.cloneNode(!0), a = this.parentNode;
  return a ? a.insertBefore(t, this.nextSibling) : t;
}
function ER(t) {
  return this.select(t ? SR : wR);
}
function _R(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function NR(t) {
  return function(a) {
    t.call(this, a, this.__data__);
  };
}
function RR(t) {
  return t.trim().split(/^|\s+/).map(function(a) {
    var r = "", l = a.indexOf(".");
    return l >= 0 && (r = a.slice(l + 1), a = a.slice(0, l)), { type: a, name: r };
  });
}
function CR(t) {
  return function() {
    var a = this.__on;
    if (a) {
      for (var r = 0, l = -1, s = a.length, u; r < s; ++r)
        u = a[r], (!t.type || u.type === t.type) && u.name === t.name ? this.removeEventListener(u.type, u.listener, u.options) : a[++l] = u;
      ++l ? a.length = l : delete this.__on;
    }
  };
}
function TR(t, a, r) {
  return function() {
    var l = this.__on, s, u = NR(a);
    if (l) {
      for (var c = 0, h = l.length; c < h; ++c)
        if ((s = l[c]).type === t.type && s.name === t.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = u, s.options = r), s.value = a;
          return;
        }
    }
    this.addEventListener(t.type, u, r), s = { type: t.type, name: t.name, value: a, listener: u, options: r }, l ? l.push(s) : this.__on = [s];
  };
}
function MR(t, a, r) {
  var l = RR(t + ""), s, u = l.length, c;
  if (arguments.length < 2) {
    var h = this.node().__on;
    if (h) {
      for (var g = 0, m = h.length, y; g < m; ++g)
        for (s = 0, y = h[g]; s < u; ++s)
          if ((c = l[s]).type === y.type && c.name === y.name)
            return y.value;
    }
    return;
  }
  for (h = a ? TR : CR, s = 0; s < u; ++s) this.each(h(l[s], a, r));
  return this;
}
function g1(t, a, r) {
  var l = f1(t), s = l.CustomEvent;
  typeof s == "function" ? s = new s(a, r) : (s = l.document.createEvent("Event"), r ? (s.initEvent(a, r.bubbles, r.cancelable), s.detail = r.detail) : s.initEvent(a, !1, !1)), t.dispatchEvent(s);
}
function DR(t, a) {
  return function() {
    return g1(this, t, a);
  };
}
function AR(t, a) {
  return function() {
    return g1(this, t, a.apply(this, arguments));
  };
}
function zR(t, a) {
  return this.each((typeof a == "function" ? AR : DR)(t, a));
}
function* OR() {
  for (var t = this._groups, a = 0, r = t.length; a < r; ++a)
    for (var l = t[a], s = 0, u = l.length, c; s < u; ++s)
      (c = l[s]) && (yield c);
}
var y1 = [null];
function qn(t, a) {
  this._groups = t, this._parents = a;
}
function Io() {
  return new qn([[document.documentElement]], y1);
}
function LR() {
  return this;
}
qn.prototype = Io.prototype = {
  constructor: qn,
  select: lN,
  selectAll: cN,
  selectChild: mN,
  selectChildren: vN,
  filter: bN,
  data: NN,
  enter: xN,
  exit: CN,
  join: TN,
  merge: MN,
  selection: LR,
  order: DN,
  sort: AN,
  call: ON,
  nodes: LN,
  node: jN,
  size: HN,
  empty: BN,
  each: UN,
  attr: GN,
  style: FN,
  property: WN,
  classed: aR,
  text: oR,
  html: fR,
  raise: hR,
  lower: pR,
  append: gR,
  insert: vR,
  remove: xR,
  clone: ER,
  datum: _R,
  on: MR,
  dispatch: zR,
  [Symbol.iterator]: OR
};
function Vn(t) {
  return typeof t == "string" ? new qn([[document.querySelector(t)]], [document.documentElement]) : new qn([[t]], y1);
}
function jR(t) {
  let a;
  for (; a = t.sourceEvent; ) t = a;
  return t;
}
function ha(t, a) {
  if (t = jR(t), a === void 0 && (a = t.currentTarget), a) {
    var r = a.ownerSVGElement || a;
    if (r.createSVGPoint) {
      var l = r.createSVGPoint();
      return l.x = t.clientX, l.y = t.clientY, l = l.matrixTransform(a.getScreenCTM().inverse()), [l.x, l.y];
    }
    if (a.getBoundingClientRect) {
      var s = a.getBoundingClientRect();
      return [t.clientX - s.left - a.clientLeft, t.clientY - s.top - a.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
const HR = { passive: !1 }, Ao = { capture: !0, passive: !1 };
function Ad(t) {
  t.stopImmediatePropagation();
}
function hl(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function v1(t) {
  var a = t.document.documentElement, r = Vn(t).on("dragstart.drag", hl, Ao);
  "onselectstart" in a ? r.on("selectstart.drag", hl, Ao) : (a.__noselect = a.style.MozUserSelect, a.style.MozUserSelect = "none");
}
function b1(t, a) {
  var r = t.document.documentElement, l = Vn(t).on("dragstart.drag", null);
  a && (l.on("click.drag", hl, Ao), setTimeout(function() {
    l.on("click.drag", null);
  }, 0)), "onselectstart" in r ? l.on("selectstart.drag", null) : (r.style.MozUserSelect = r.__noselect, delete r.__noselect);
}
const cu = (t) => () => t;
function nh(t, {
  sourceEvent: a,
  subject: r,
  target: l,
  identifier: s,
  active: u,
  x: c,
  y: h,
  dx: g,
  dy: m,
  dispatch: y
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: a, enumerable: !0, configurable: !0 },
    subject: { value: r, enumerable: !0, configurable: !0 },
    target: { value: l, enumerable: !0, configurable: !0 },
    identifier: { value: s, enumerable: !0, configurable: !0 },
    active: { value: u, enumerable: !0, configurable: !0 },
    x: { value: c, enumerable: !0, configurable: !0 },
    y: { value: h, enumerable: !0, configurable: !0 },
    dx: { value: g, enumerable: !0, configurable: !0 },
    dy: { value: m, enumerable: !0, configurable: !0 },
    _: { value: y }
  });
}
nh.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function BR(t) {
  return !t.ctrlKey && !t.button;
}
function UR() {
  return this.parentNode;
}
function kR(t, a) {
  return a ?? { x: t.x, y: t.y };
}
function VR() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function x1() {
  var t = BR, a = UR, r = kR, l = VR, s = {}, u = ac("start", "drag", "end"), c = 0, h, g, m, y, p = 0;
  function v(L) {
    L.on("mousedown.drag", b).filter(l).on("touchstart.drag", T).on("touchmove.drag", _, HR).on("touchend.drag touchcancel.drag", O).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function b(L, B) {
    if (!(y || !t.call(this, L, B))) {
      var H = E(this, a.call(this, L, B), L, B, "mouse");
      H && (Vn(L.view).on("mousemove.drag", w, Ao).on("mouseup.drag", R, Ao), v1(L.view), Ad(L), m = !1, h = L.clientX, g = L.clientY, H("start", L));
    }
  }
  function w(L) {
    if (hl(L), !m) {
      var B = L.clientX - h, H = L.clientY - g;
      m = B * B + H * H > p;
    }
    s.mouse("drag", L);
  }
  function R(L) {
    Vn(L.view).on("mousemove.drag mouseup.drag", null), b1(L.view, m), hl(L), s.mouse("end", L);
  }
  function T(L, B) {
    if (t.call(this, L, B)) {
      var H = L.changedTouches, V = a.call(this, L, B), D = H.length, G, le;
      for (G = 0; G < D; ++G)
        (le = E(this, V, L, B, H[G].identifier, H[G])) && (Ad(L), le("start", L, H[G]));
    }
  }
  function _(L) {
    var B = L.changedTouches, H = B.length, V, D;
    for (V = 0; V < H; ++V)
      (D = s[B[V].identifier]) && (hl(L), D("drag", L, B[V]));
  }
  function O(L) {
    var B = L.changedTouches, H = B.length, V, D;
    for (y && clearTimeout(y), y = setTimeout(function() {
      y = null;
    }, 500), V = 0; V < H; ++V)
      (D = s[B[V].identifier]) && (Ad(L), D("end", L, B[V]));
  }
  function E(L, B, H, V, D, G) {
    var le = u.copy(), $ = ha(G || H, B), K, re, j;
    if ((j = r.call(L, new nh("beforestart", {
      sourceEvent: H,
      target: v,
      identifier: D,
      active: c,
      x: $[0],
      y: $[1],
      dx: 0,
      dy: 0,
      dispatch: le
    }), V)) != null)
      return K = j.x - $[0] || 0, re = j.y - $[1] || 0, function I(C, z, Y) {
        var X = $, te;
        switch (C) {
          case "start":
            s[D] = I, te = c++;
            break;
          case "end":
            delete s[D], --c;
          // falls through
          case "drag":
            $ = ha(Y || z, B), te = c;
            break;
        }
        le.call(
          C,
          L,
          new nh(C, {
            sourceEvent: z,
            subject: j,
            target: v,
            identifier: D,
            active: te,
            x: $[0] + K,
            y: $[1] + re,
            dx: $[0] - X[0],
            dy: $[1] - X[1],
            dispatch: le
          }),
          V
        );
      };
  }
  return v.filter = function(L) {
    return arguments.length ? (t = typeof L == "function" ? L : cu(!!L), v) : t;
  }, v.container = function(L) {
    return arguments.length ? (a = typeof L == "function" ? L : cu(L), v) : a;
  }, v.subject = function(L) {
    return arguments.length ? (r = typeof L == "function" ? L : cu(L), v) : r;
  }, v.touchable = function(L) {
    return arguments.length ? (l = typeof L == "function" ? L : cu(!!L), v) : l;
  }, v.on = function() {
    var L = u.on.apply(u, arguments);
    return L === u ? v : L;
  }, v.clickDistance = function(L) {
    return arguments.length ? (p = (L = +L) * L, v) : Math.sqrt(p);
  }, v;
}
function Gh(t, a, r) {
  t.prototype = a.prototype = r, r.constructor = t;
}
function w1(t, a) {
  var r = Object.create(t.prototype);
  for (var l in a) r[l] = a[l];
  return r;
}
function Zo() {
}
var zo = 0.7, ku = 1 / zo, ml = "\\s*([+-]?\\d+)\\s*", Oo = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", za = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", qR = /^#([0-9a-f]{3,8})$/, YR = new RegExp(`^rgb\\(${ml},${ml},${ml}\\)$`), $R = new RegExp(`^rgb\\(${za},${za},${za}\\)$`), XR = new RegExp(`^rgba\\(${ml},${ml},${ml},${Oo}\\)$`), GR = new RegExp(`^rgba\\(${za},${za},${za},${Oo}\\)$`), IR = new RegExp(`^hsl\\(${Oo},${za},${za}\\)$`), ZR = new RegExp(`^hsla\\(${Oo},${za},${za},${Oo}\\)$`), jy = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Gh(Zo, br, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Hy,
  // Deprecated! Use color.formatHex.
  formatHex: Hy,
  formatHex8: QR,
  formatHsl: FR,
  formatRgb: By,
  toString: By
});
function Hy() {
  return this.rgb().formatHex();
}
function QR() {
  return this.rgb().formatHex8();
}
function FR() {
  return S1(this).formatHsl();
}
function By() {
  return this.rgb().formatRgb();
}
function br(t) {
  var a, r;
  return t = (t + "").trim().toLowerCase(), (a = qR.exec(t)) ? (r = a[1].length, a = parseInt(a[1], 16), r === 6 ? Uy(a) : r === 3 ? new Tn(a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, (a & 15) << 4 | a & 15, 1) : r === 8 ? fu(a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, (a & 255) / 255) : r === 4 ? fu(a >> 12 & 15 | a >> 8 & 240, a >> 8 & 15 | a >> 4 & 240, a >> 4 & 15 | a & 240, ((a & 15) << 4 | a & 15) / 255) : null) : (a = YR.exec(t)) ? new Tn(a[1], a[2], a[3], 1) : (a = $R.exec(t)) ? new Tn(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, 1) : (a = XR.exec(t)) ? fu(a[1], a[2], a[3], a[4]) : (a = GR.exec(t)) ? fu(a[1] * 255 / 100, a[2] * 255 / 100, a[3] * 255 / 100, a[4]) : (a = IR.exec(t)) ? qy(a[1], a[2] / 100, a[3] / 100, 1) : (a = ZR.exec(t)) ? qy(a[1], a[2] / 100, a[3] / 100, a[4]) : jy.hasOwnProperty(t) ? Uy(jy[t]) : t === "transparent" ? new Tn(NaN, NaN, NaN, 0) : null;
}
function Uy(t) {
  return new Tn(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function fu(t, a, r, l) {
  return l <= 0 && (t = a = r = NaN), new Tn(t, a, r, l);
}
function KR(t) {
  return t instanceof Zo || (t = br(t)), t ? (t = t.rgb(), new Tn(t.r, t.g, t.b, t.opacity)) : new Tn();
}
function ah(t, a, r, l) {
  return arguments.length === 1 ? KR(t) : new Tn(t, a, r, l ?? 1);
}
function Tn(t, a, r, l) {
  this.r = +t, this.g = +a, this.b = +r, this.opacity = +l;
}
Gh(Tn, ah, w1(Zo, {
  brighter(t) {
    return t = t == null ? ku : Math.pow(ku, t), new Tn(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? zo : Math.pow(zo, t), new Tn(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Tn(yr(this.r), yr(this.g), yr(this.b), Vu(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: ky,
  // Deprecated! Use color.formatHex.
  formatHex: ky,
  formatHex8: PR,
  formatRgb: Vy,
  toString: Vy
}));
function ky() {
  return `#${pr(this.r)}${pr(this.g)}${pr(this.b)}`;
}
function PR() {
  return `#${pr(this.r)}${pr(this.g)}${pr(this.b)}${pr((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Vy() {
  const t = Vu(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${yr(this.r)}, ${yr(this.g)}, ${yr(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Vu(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function yr(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function pr(t) {
  return t = yr(t), (t < 16 ? "0" : "") + t.toString(16);
}
function qy(t, a, r, l) {
  return l <= 0 ? t = a = r = NaN : r <= 0 || r >= 1 ? t = a = NaN : a <= 0 && (t = NaN), new ma(t, a, r, l);
}
function S1(t) {
  if (t instanceof ma) return new ma(t.h, t.s, t.l, t.opacity);
  if (t instanceof Zo || (t = br(t)), !t) return new ma();
  if (t instanceof ma) return t;
  t = t.rgb();
  var a = t.r / 255, r = t.g / 255, l = t.b / 255, s = Math.min(a, r, l), u = Math.max(a, r, l), c = NaN, h = u - s, g = (u + s) / 2;
  return h ? (a === u ? c = (r - l) / h + (r < l) * 6 : r === u ? c = (l - a) / h + 2 : c = (a - r) / h + 4, h /= g < 0.5 ? u + s : 2 - u - s, c *= 60) : h = g > 0 && g < 1 ? 0 : c, new ma(c, h, g, t.opacity);
}
function JR(t, a, r, l) {
  return arguments.length === 1 ? S1(t) : new ma(t, a, r, l ?? 1);
}
function ma(t, a, r, l) {
  this.h = +t, this.s = +a, this.l = +r, this.opacity = +l;
}
Gh(ma, JR, w1(Zo, {
  brighter(t) {
    return t = t == null ? ku : Math.pow(ku, t), new ma(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? zo : Math.pow(zo, t), new ma(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, a = isNaN(t) || isNaN(this.s) ? 0 : this.s, r = this.l, l = r + (r < 0.5 ? r : 1 - r) * a, s = 2 * r - l;
    return new Tn(
      zd(t >= 240 ? t - 240 : t + 120, s, l),
      zd(t, s, l),
      zd(t < 120 ? t + 240 : t - 120, s, l),
      this.opacity
    );
  },
  clamp() {
    return new ma(Yy(this.h), du(this.s), du(this.l), Vu(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Vu(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Yy(this.h)}, ${du(this.s) * 100}%, ${du(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Yy(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function du(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function zd(t, a, r) {
  return (t < 60 ? a + (r - a) * t / 60 : t < 180 ? r : t < 240 ? a + (r - a) * (240 - t) / 60 : a) * 255;
}
const Ih = (t) => () => t;
function WR(t, a) {
  return function(r) {
    return t + r * a;
  };
}
function eC(t, a, r) {
  return t = Math.pow(t, r), a = Math.pow(a, r) - t, r = 1 / r, function(l) {
    return Math.pow(t + l * a, r);
  };
}
function tC(t) {
  return (t = +t) == 1 ? E1 : function(a, r) {
    return r - a ? eC(a, r, t) : Ih(isNaN(a) ? r : a);
  };
}
function E1(t, a) {
  var r = a - t;
  return r ? WR(t, r) : Ih(isNaN(t) ? a : t);
}
const qu = (function t(a) {
  var r = tC(a);
  function l(s, u) {
    var c = r((s = ah(s)).r, (u = ah(u)).r), h = r(s.g, u.g), g = r(s.b, u.b), m = E1(s.opacity, u.opacity);
    return function(y) {
      return s.r = c(y), s.g = h(y), s.b = g(y), s.opacity = m(y), s + "";
    };
  }
  return l.gamma = t, l;
})(1);
function nC(t, a) {
  a || (a = []);
  var r = t ? Math.min(a.length, t.length) : 0, l = a.slice(), s;
  return function(u) {
    for (s = 0; s < r; ++s) l[s] = t[s] * (1 - u) + a[s] * u;
    return l;
  };
}
function aC(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function iC(t, a) {
  var r = a ? a.length : 0, l = t ? Math.min(r, t.length) : 0, s = new Array(l), u = new Array(r), c;
  for (c = 0; c < l; ++c) s[c] = Co(t[c], a[c]);
  for (; c < r; ++c) u[c] = a[c];
  return function(h) {
    for (c = 0; c < l; ++c) u[c] = s[c](h);
    return u;
  };
}
function rC(t, a) {
  var r = /* @__PURE__ */ new Date();
  return t = +t, a = +a, function(l) {
    return r.setTime(t * (1 - l) + a * l), r;
  };
}
function Da(t, a) {
  return t = +t, a = +a, function(r) {
    return t * (1 - r) + a * r;
  };
}
function lC(t, a) {
  var r = {}, l = {}, s;
  (t === null || typeof t != "object") && (t = {}), (a === null || typeof a != "object") && (a = {});
  for (s in a)
    s in t ? r[s] = Co(t[s], a[s]) : l[s] = a[s];
  return function(u) {
    for (s in r) l[s] = r[s](u);
    return l;
  };
}
var ih = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Od = new RegExp(ih.source, "g");
function oC(t) {
  return function() {
    return t;
  };
}
function sC(t) {
  return function(a) {
    return t(a) + "";
  };
}
function _1(t, a) {
  var r = ih.lastIndex = Od.lastIndex = 0, l, s, u, c = -1, h = [], g = [];
  for (t = t + "", a = a + ""; (l = ih.exec(t)) && (s = Od.exec(a)); )
    (u = s.index) > r && (u = a.slice(r, u), h[c] ? h[c] += u : h[++c] = u), (l = l[0]) === (s = s[0]) ? h[c] ? h[c] += s : h[++c] = s : (h[++c] = null, g.push({ i: c, x: Da(l, s) })), r = Od.lastIndex;
  return r < a.length && (u = a.slice(r), h[c] ? h[c] += u : h[++c] = u), h.length < 2 ? g[0] ? sC(g[0].x) : oC(a) : (a = g.length, function(m) {
    for (var y = 0, p; y < a; ++y) h[(p = g[y]).i] = p.x(m);
    return h.join("");
  });
}
function Co(t, a) {
  var r = typeof a, l;
  return a == null || r === "boolean" ? Ih(a) : (r === "number" ? Da : r === "string" ? (l = br(a)) ? (a = l, qu) : _1 : a instanceof br ? qu : a instanceof Date ? rC : aC(a) ? nC : Array.isArray(a) ? iC : typeof a.valueOf != "function" && typeof a.toString != "function" || isNaN(a) ? lC : Da)(t, a);
}
var $y = 180 / Math.PI, rh = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function N1(t, a, r, l, s, u) {
  var c, h, g;
  return (c = Math.sqrt(t * t + a * a)) && (t /= c, a /= c), (g = t * r + a * l) && (r -= t * g, l -= a * g), (h = Math.sqrt(r * r + l * l)) && (r /= h, l /= h, g /= h), t * l < a * r && (t = -t, a = -a, g = -g, c = -c), {
    translateX: s,
    translateY: u,
    rotate: Math.atan2(a, t) * $y,
    skewX: Math.atan(g) * $y,
    scaleX: c,
    scaleY: h
  };
}
var hu;
function uC(t) {
  const a = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return a.isIdentity ? rh : N1(a.a, a.b, a.c, a.d, a.e, a.f);
}
function cC(t) {
  return t == null || (hu || (hu = document.createElementNS("http://www.w3.org/2000/svg", "g")), hu.setAttribute("transform", t), !(t = hu.transform.baseVal.consolidate())) ? rh : (t = t.matrix, N1(t.a, t.b, t.c, t.d, t.e, t.f));
}
function R1(t, a, r, l) {
  function s(m) {
    return m.length ? m.pop() + " " : "";
  }
  function u(m, y, p, v, b, w) {
    if (m !== p || y !== v) {
      var R = b.push("translate(", null, a, null, r);
      w.push({ i: R - 4, x: Da(m, p) }, { i: R - 2, x: Da(y, v) });
    } else (p || v) && b.push("translate(" + p + a + v + r);
  }
  function c(m, y, p, v) {
    m !== y ? (m - y > 180 ? y += 360 : y - m > 180 && (m += 360), v.push({ i: p.push(s(p) + "rotate(", null, l) - 2, x: Da(m, y) })) : y && p.push(s(p) + "rotate(" + y + l);
  }
  function h(m, y, p, v) {
    m !== y ? v.push({ i: p.push(s(p) + "skewX(", null, l) - 2, x: Da(m, y) }) : y && p.push(s(p) + "skewX(" + y + l);
  }
  function g(m, y, p, v, b, w) {
    if (m !== p || y !== v) {
      var R = b.push(s(b) + "scale(", null, ",", null, ")");
      w.push({ i: R - 4, x: Da(m, p) }, { i: R - 2, x: Da(y, v) });
    } else (p !== 1 || v !== 1) && b.push(s(b) + "scale(" + p + "," + v + ")");
  }
  return function(m, y) {
    var p = [], v = [];
    return m = t(m), y = t(y), u(m.translateX, m.translateY, y.translateX, y.translateY, p, v), c(m.rotate, y.rotate, p, v), h(m.skewX, y.skewX, p, v), g(m.scaleX, m.scaleY, y.scaleX, y.scaleY, p, v), m = y = null, function(b) {
      for (var w = -1, R = v.length, T; ++w < R; ) p[(T = v[w]).i] = T.x(b);
      return p.join("");
    };
  };
}
var fC = R1(uC, "px, ", "px)", "deg)"), dC = R1(cC, ", ", ")", ")"), hC = 1e-12;
function Xy(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function mC(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function pC(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const zu = (function t(a, r, l) {
  function s(u, c) {
    var h = u[0], g = u[1], m = u[2], y = c[0], p = c[1], v = c[2], b = y - h, w = p - g, R = b * b + w * w, T, _;
    if (R < hC)
      _ = Math.log(v / m) / a, T = function(V) {
        return [
          h + V * b,
          g + V * w,
          m * Math.exp(a * V * _)
        ];
      };
    else {
      var O = Math.sqrt(R), E = (v * v - m * m + l * R) / (2 * m * r * O), L = (v * v - m * m - l * R) / (2 * v * r * O), B = Math.log(Math.sqrt(E * E + 1) - E), H = Math.log(Math.sqrt(L * L + 1) - L);
      _ = (H - B) / a, T = function(V) {
        var D = V * _, G = Xy(B), le = m / (r * O) * (G * pC(a * D + B) - mC(B));
        return [
          h + le * b,
          g + le * w,
          m * G / Xy(a * D + B)
        ];
      };
    }
    return T.duration = _ * 1e3 * a / Math.SQRT2, T;
  }
  return s.rho = function(u) {
    var c = Math.max(1e-3, +u), h = c * c, g = h * h;
    return t(c, h, g);
  }, s;
})(Math.SQRT2, 2, 4);
var yl = 0, _o = 0, xo = 0, C1 = 1e3, Yu, No, $u = 0, xr = 0, rc = 0, Lo = typeof performance == "object" && performance.now ? performance : Date, T1 = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Zh() {
  return xr || (T1(gC), xr = Lo.now() + rc);
}
function gC() {
  xr = 0;
}
function Xu() {
  this._call = this._time = this._next = null;
}
Xu.prototype = M1.prototype = {
  constructor: Xu,
  restart: function(t, a, r) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    r = (r == null ? Zh() : +r) + (a == null ? 0 : +a), !this._next && No !== this && (No ? No._next = this : Yu = this, No = this), this._call = t, this._time = r, lh();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, lh());
  }
};
function M1(t, a, r) {
  var l = new Xu();
  return l.restart(t, a, r), l;
}
function yC() {
  Zh(), ++yl;
  for (var t = Yu, a; t; )
    (a = xr - t._time) >= 0 && t._call.call(void 0, a), t = t._next;
  --yl;
}
function Gy() {
  xr = ($u = Lo.now()) + rc, yl = _o = 0;
  try {
    yC();
  } finally {
    yl = 0, bC(), xr = 0;
  }
}
function vC() {
  var t = Lo.now(), a = t - $u;
  a > C1 && (rc -= a, $u = t);
}
function bC() {
  for (var t, a = Yu, r, l = 1 / 0; a; )
    a._call ? (l > a._time && (l = a._time), t = a, a = a._next) : (r = a._next, a._next = null, a = t ? t._next = r : Yu = r);
  No = t, lh(l);
}
function lh(t) {
  if (!yl) {
    _o && (_o = clearTimeout(_o));
    var a = t - xr;
    a > 24 ? (t < 1 / 0 && (_o = setTimeout(Gy, t - Lo.now() - rc)), xo && (xo = clearInterval(xo))) : (xo || ($u = Lo.now(), xo = setInterval(vC, C1)), yl = 1, T1(Gy));
  }
}
function Iy(t, a, r) {
  var l = new Xu();
  return a = a == null ? 0 : +a, l.restart((s) => {
    l.stop(), t(s + a);
  }, a, r), l;
}
var xC = ac("start", "end", "cancel", "interrupt"), wC = [], D1 = 0, Zy = 1, oh = 2, Ou = 3, Qy = 4, sh = 5, Lu = 6;
function lc(t, a, r, l, s, u) {
  var c = t.__transition;
  if (!c) t.__transition = {};
  else if (r in c) return;
  SC(t, r, {
    name: a,
    index: l,
    // For context during callback.
    group: s,
    // For context during callback.
    on: xC,
    tween: wC,
    time: u.time,
    delay: u.delay,
    duration: u.duration,
    ease: u.ease,
    timer: null,
    state: D1
  });
}
function Qh(t, a) {
  var r = xa(t, a);
  if (r.state > D1) throw new Error("too late; already scheduled");
  return r;
}
function ja(t, a) {
  var r = xa(t, a);
  if (r.state > Ou) throw new Error("too late; already running");
  return r;
}
function xa(t, a) {
  var r = t.__transition;
  if (!r || !(r = r[a])) throw new Error("transition not found");
  return r;
}
function SC(t, a, r) {
  var l = t.__transition, s;
  l[a] = r, r.timer = M1(u, 0, r.time);
  function u(m) {
    r.state = Zy, r.timer.restart(c, r.delay, r.time), r.delay <= m && c(m - r.delay);
  }
  function c(m) {
    var y, p, v, b;
    if (r.state !== Zy) return g();
    for (y in l)
      if (b = l[y], b.name === r.name) {
        if (b.state === Ou) return Iy(c);
        b.state === Qy ? (b.state = Lu, b.timer.stop(), b.on.call("interrupt", t, t.__data__, b.index, b.group), delete l[y]) : +y < a && (b.state = Lu, b.timer.stop(), b.on.call("cancel", t, t.__data__, b.index, b.group), delete l[y]);
      }
    if (Iy(function() {
      r.state === Ou && (r.state = Qy, r.timer.restart(h, r.delay, r.time), h(m));
    }), r.state = oh, r.on.call("start", t, t.__data__, r.index, r.group), r.state === oh) {
      for (r.state = Ou, s = new Array(v = r.tween.length), y = 0, p = -1; y < v; ++y)
        (b = r.tween[y].value.call(t, t.__data__, r.index, r.group)) && (s[++p] = b);
      s.length = p + 1;
    }
  }
  function h(m) {
    for (var y = m < r.duration ? r.ease.call(null, m / r.duration) : (r.timer.restart(g), r.state = sh, 1), p = -1, v = s.length; ++p < v; )
      s[p].call(t, y);
    r.state === sh && (r.on.call("end", t, t.__data__, r.index, r.group), g());
  }
  function g() {
    r.state = Lu, r.timer.stop(), delete l[a];
    for (var m in l) return;
    delete t.__transition;
  }
}
function ju(t, a) {
  var r = t.__transition, l, s, u = !0, c;
  if (r) {
    a = a == null ? null : a + "";
    for (c in r) {
      if ((l = r[c]).name !== a) {
        u = !1;
        continue;
      }
      s = l.state > oh && l.state < sh, l.state = Lu, l.timer.stop(), l.on.call(s ? "interrupt" : "cancel", t, t.__data__, l.index, l.group), delete r[c];
    }
    u && delete t.__transition;
  }
}
function EC(t) {
  return this.each(function() {
    ju(this, t);
  });
}
function _C(t, a) {
  var r, l;
  return function() {
    var s = ja(this, t), u = s.tween;
    if (u !== r) {
      l = r = u;
      for (var c = 0, h = l.length; c < h; ++c)
        if (l[c].name === a) {
          l = l.slice(), l.splice(c, 1);
          break;
        }
    }
    s.tween = l;
  };
}
function NC(t, a, r) {
  var l, s;
  if (typeof r != "function") throw new Error();
  return function() {
    var u = ja(this, t), c = u.tween;
    if (c !== l) {
      s = (l = c).slice();
      for (var h = { name: a, value: r }, g = 0, m = s.length; g < m; ++g)
        if (s[g].name === a) {
          s[g] = h;
          break;
        }
      g === m && s.push(h);
    }
    u.tween = s;
  };
}
function RC(t, a) {
  var r = this._id;
  if (t += "", arguments.length < 2) {
    for (var l = xa(this.node(), r).tween, s = 0, u = l.length, c; s < u; ++s)
      if ((c = l[s]).name === t)
        return c.value;
    return null;
  }
  return this.each((a == null ? _C : NC)(r, t, a));
}
function Fh(t, a, r) {
  var l = t._id;
  return t.each(function() {
    var s = ja(this, l);
    (s.value || (s.value = {}))[a] = r.apply(this, arguments);
  }), function(s) {
    return xa(s, l).value[a];
  };
}
function A1(t, a) {
  var r;
  return (typeof a == "number" ? Da : a instanceof br ? qu : (r = br(a)) ? (a = r, qu) : _1)(t, a);
}
function CC(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function TC(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function MC(t, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = this.getAttribute(t);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function DC(t, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = this.getAttributeNS(t.space, t.local);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function AC(t, a, r) {
  var l, s, u;
  return function() {
    var c, h = r(this), g;
    return h == null ? void this.removeAttribute(t) : (c = this.getAttribute(t), g = h + "", c === g ? null : c === l && g === s ? u : (s = g, u = a(l = c, h)));
  };
}
function zC(t, a, r) {
  var l, s, u;
  return function() {
    var c, h = r(this), g;
    return h == null ? void this.removeAttributeNS(t.space, t.local) : (c = this.getAttributeNS(t.space, t.local), g = h + "", c === g ? null : c === l && g === s ? u : (s = g, u = a(l = c, h)));
  };
}
function OC(t, a) {
  var r = ic(t), l = r === "transform" ? dC : A1;
  return this.attrTween(t, typeof a == "function" ? (r.local ? zC : AC)(r, l, Fh(this, "attr." + t, a)) : a == null ? (r.local ? TC : CC)(r) : (r.local ? DC : MC)(r, l, a));
}
function LC(t, a) {
  return function(r) {
    this.setAttribute(t, a.call(this, r));
  };
}
function jC(t, a) {
  return function(r) {
    this.setAttributeNS(t.space, t.local, a.call(this, r));
  };
}
function HC(t, a) {
  var r, l;
  function s() {
    var u = a.apply(this, arguments);
    return u !== l && (r = (l = u) && jC(t, u)), r;
  }
  return s._value = a, s;
}
function BC(t, a) {
  var r, l;
  function s() {
    var u = a.apply(this, arguments);
    return u !== l && (r = (l = u) && LC(t, u)), r;
  }
  return s._value = a, s;
}
function UC(t, a) {
  var r = "attr." + t;
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (a == null) return this.tween(r, null);
  if (typeof a != "function") throw new Error();
  var l = ic(t);
  return this.tween(r, (l.local ? HC : BC)(l, a));
}
function kC(t, a) {
  return function() {
    Qh(this, t).delay = +a.apply(this, arguments);
  };
}
function VC(t, a) {
  return a = +a, function() {
    Qh(this, t).delay = a;
  };
}
function qC(t) {
  var a = this._id;
  return arguments.length ? this.each((typeof t == "function" ? kC : VC)(a, t)) : xa(this.node(), a).delay;
}
function YC(t, a) {
  return function() {
    ja(this, t).duration = +a.apply(this, arguments);
  };
}
function $C(t, a) {
  return a = +a, function() {
    ja(this, t).duration = a;
  };
}
function XC(t) {
  var a = this._id;
  return arguments.length ? this.each((typeof t == "function" ? YC : $C)(a, t)) : xa(this.node(), a).duration;
}
function GC(t, a) {
  if (typeof a != "function") throw new Error();
  return function() {
    ja(this, t).ease = a;
  };
}
function IC(t) {
  var a = this._id;
  return arguments.length ? this.each(GC(a, t)) : xa(this.node(), a).ease;
}
function ZC(t, a) {
  return function() {
    var r = a.apply(this, arguments);
    if (typeof r != "function") throw new Error();
    ja(this, t).ease = r;
  };
}
function QC(t) {
  if (typeof t != "function") throw new Error();
  return this.each(ZC(this._id, t));
}
function FC(t) {
  typeof t != "function" && (t = s1(t));
  for (var a = this._groups, r = a.length, l = new Array(r), s = 0; s < r; ++s)
    for (var u = a[s], c = u.length, h = l[s] = [], g, m = 0; m < c; ++m)
      (g = u[m]) && t.call(g, g.__data__, m, u) && h.push(g);
  return new oi(l, this._parents, this._name, this._id);
}
function KC(t) {
  if (t._id !== this._id) throw new Error();
  for (var a = this._groups, r = t._groups, l = a.length, s = r.length, u = Math.min(l, s), c = new Array(l), h = 0; h < u; ++h)
    for (var g = a[h], m = r[h], y = g.length, p = c[h] = new Array(y), v, b = 0; b < y; ++b)
      (v = g[b] || m[b]) && (p[b] = v);
  for (; h < l; ++h)
    c[h] = a[h];
  return new oi(c, this._parents, this._name, this._id);
}
function PC(t) {
  return (t + "").trim().split(/^|\s+/).every(function(a) {
    var r = a.indexOf(".");
    return r >= 0 && (a = a.slice(0, r)), !a || a === "start";
  });
}
function JC(t, a, r) {
  var l, s, u = PC(a) ? Qh : ja;
  return function() {
    var c = u(this, t), h = c.on;
    h !== l && (s = (l = h).copy()).on(a, r), c.on = s;
  };
}
function WC(t, a) {
  var r = this._id;
  return arguments.length < 2 ? xa(this.node(), r).on.on(t) : this.each(JC(r, t, a));
}
function eT(t) {
  return function() {
    var a = this.parentNode;
    for (var r in this.__transition) if (+r !== t) return;
    a && a.removeChild(this);
  };
}
function tT() {
  return this.on("end.remove", eT(this._id));
}
function nT(t) {
  var a = this._name, r = this._id;
  typeof t != "function" && (t = $h(t));
  for (var l = this._groups, s = l.length, u = new Array(s), c = 0; c < s; ++c)
    for (var h = l[c], g = h.length, m = u[c] = new Array(g), y, p, v = 0; v < g; ++v)
      (y = h[v]) && (p = t.call(y, y.__data__, v, h)) && ("__data__" in y && (p.__data__ = y.__data__), m[v] = p, lc(m[v], a, r, v, m, xa(y, r)));
  return new oi(u, this._parents, a, r);
}
function aT(t) {
  var a = this._name, r = this._id;
  typeof t != "function" && (t = o1(t));
  for (var l = this._groups, s = l.length, u = [], c = [], h = 0; h < s; ++h)
    for (var g = l[h], m = g.length, y, p = 0; p < m; ++p)
      if (y = g[p]) {
        for (var v = t.call(y, y.__data__, p, g), b, w = xa(y, r), R = 0, T = v.length; R < T; ++R)
          (b = v[R]) && lc(b, a, r, R, v, w);
        u.push(v), c.push(y);
      }
  return new oi(u, c, a, r);
}
var iT = Io.prototype.constructor;
function rT() {
  return new iT(this._groups, this._parents);
}
function lT(t, a) {
  var r, l, s;
  return function() {
    var u = gl(this, t), c = (this.style.removeProperty(t), gl(this, t));
    return u === c ? null : u === r && c === l ? s : s = a(r = u, l = c);
  };
}
function z1(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function oT(t, a, r) {
  var l, s = r + "", u;
  return function() {
    var c = gl(this, t);
    return c === s ? null : c === l ? u : u = a(l = c, r);
  };
}
function sT(t, a, r) {
  var l, s, u;
  return function() {
    var c = gl(this, t), h = r(this), g = h + "";
    return h == null && (g = h = (this.style.removeProperty(t), gl(this, t))), c === g ? null : c === l && g === s ? u : (s = g, u = a(l = c, h));
  };
}
function uT(t, a) {
  var r, l, s, u = "style." + a, c = "end." + u, h;
  return function() {
    var g = ja(this, t), m = g.on, y = g.value[u] == null ? h || (h = z1(a)) : void 0;
    (m !== r || s !== y) && (l = (r = m).copy()).on(c, s = y), g.on = l;
  };
}
function cT(t, a, r) {
  var l = (t += "") == "transform" ? fC : A1;
  return a == null ? this.styleTween(t, lT(t, l)).on("end.style." + t, z1(t)) : typeof a == "function" ? this.styleTween(t, sT(t, l, Fh(this, "style." + t, a))).each(uT(this._id, t)) : this.styleTween(t, oT(t, l, a), r).on("end.style." + t, null);
}
function fT(t, a, r) {
  return function(l) {
    this.style.setProperty(t, a.call(this, l), r);
  };
}
function dT(t, a, r) {
  var l, s;
  function u() {
    var c = a.apply(this, arguments);
    return c !== s && (l = (s = c) && fT(t, c, r)), l;
  }
  return u._value = a, u;
}
function hT(t, a, r) {
  var l = "style." + (t += "");
  if (arguments.length < 2) return (l = this.tween(l)) && l._value;
  if (a == null) return this.tween(l, null);
  if (typeof a != "function") throw new Error();
  return this.tween(l, dT(t, a, r ?? ""));
}
function mT(t) {
  return function() {
    this.textContent = t;
  };
}
function pT(t) {
  return function() {
    var a = t(this);
    this.textContent = a ?? "";
  };
}
function gT(t) {
  return this.tween("text", typeof t == "function" ? pT(Fh(this, "text", t)) : mT(t == null ? "" : t + ""));
}
function yT(t) {
  return function(a) {
    this.textContent = t.call(this, a);
  };
}
function vT(t) {
  var a, r;
  function l() {
    var s = t.apply(this, arguments);
    return s !== r && (a = (r = s) && yT(s)), a;
  }
  return l._value = t, l;
}
function bT(t) {
  var a = "text";
  if (arguments.length < 1) return (a = this.tween(a)) && a._value;
  if (t == null) return this.tween(a, null);
  if (typeof t != "function") throw new Error();
  return this.tween(a, vT(t));
}
function xT() {
  for (var t = this._name, a = this._id, r = O1(), l = this._groups, s = l.length, u = 0; u < s; ++u)
    for (var c = l[u], h = c.length, g, m = 0; m < h; ++m)
      if (g = c[m]) {
        var y = xa(g, a);
        lc(g, t, r, m, c, {
          time: y.time + y.delay + y.duration,
          delay: 0,
          duration: y.duration,
          ease: y.ease
        });
      }
  return new oi(l, this._parents, t, r);
}
function wT() {
  var t, a, r = this, l = r._id, s = r.size();
  return new Promise(function(u, c) {
    var h = { value: c }, g = { value: function() {
      --s === 0 && u();
    } };
    r.each(function() {
      var m = ja(this, l), y = m.on;
      y !== t && (a = (t = y).copy(), a._.cancel.push(h), a._.interrupt.push(h), a._.end.push(g)), m.on = a;
    }), s === 0 && u();
  });
}
var ST = 0;
function oi(t, a, r, l) {
  this._groups = t, this._parents = a, this._name = r, this._id = l;
}
function O1() {
  return ++ST;
}
var ei = Io.prototype;
oi.prototype = {
  constructor: oi,
  select: nT,
  selectAll: aT,
  selectChild: ei.selectChild,
  selectChildren: ei.selectChildren,
  filter: FC,
  merge: KC,
  selection: rT,
  transition: xT,
  call: ei.call,
  nodes: ei.nodes,
  node: ei.node,
  size: ei.size,
  empty: ei.empty,
  each: ei.each,
  on: WC,
  attr: OC,
  attrTween: UC,
  style: cT,
  styleTween: hT,
  text: gT,
  textTween: bT,
  remove: tT,
  tween: RC,
  delay: qC,
  duration: XC,
  ease: IC,
  easeVarying: QC,
  end: wT,
  [Symbol.iterator]: ei[Symbol.iterator]
};
function ET(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var _T = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: ET
};
function NT(t, a) {
  for (var r; !(r = t.__transition) || !(r = r[a]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${a} not found`);
  return r;
}
function RT(t) {
  var a, r;
  t instanceof oi ? (a = t._id, t = t._name) : (a = O1(), (r = _T).time = Zh(), t = t == null ? null : t + "");
  for (var l = this._groups, s = l.length, u = 0; u < s; ++u)
    for (var c = l[u], h = c.length, g, m = 0; m < h; ++m)
      (g = c[m]) && lc(g, t, a, m, c, r || NT(g, a));
  return new oi(l, this._parents, t, a);
}
Io.prototype.interrupt = EC;
Io.prototype.transition = RT;
const mu = (t) => () => t;
function CT(t, {
  sourceEvent: a,
  target: r,
  transform: l,
  dispatch: s
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: a, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    transform: { value: l, enumerable: !0, configurable: !0 },
    _: { value: s }
  });
}
function ri(t, a, r) {
  this.k = t, this.x = a, this.y = r;
}
ri.prototype = {
  constructor: ri,
  scale: function(t) {
    return t === 1 ? this : new ri(this.k * t, this.x, this.y);
  },
  translate: function(t, a) {
    return t === 0 & a === 0 ? this : new ri(this.k, this.x + this.k * t, this.y + this.k * a);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var oc = new ri(1, 0, 0);
L1.prototype = ri.prototype;
function L1(t) {
  for (; !t.__zoom; ) if (!(t = t.parentNode)) return oc;
  return t.__zoom;
}
function Ld(t) {
  t.stopImmediatePropagation();
}
function wo(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function TT(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function MT() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Fy() {
  return this.__zoom || oc;
}
function DT(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function AT() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function zT(t, a, r) {
  var l = t.invertX(a[0][0]) - r[0][0], s = t.invertX(a[1][0]) - r[1][0], u = t.invertY(a[0][1]) - r[0][1], c = t.invertY(a[1][1]) - r[1][1];
  return t.translate(
    s > l ? (l + s) / 2 : Math.min(0, l) || Math.max(0, s),
    c > u ? (u + c) / 2 : Math.min(0, u) || Math.max(0, c)
  );
}
function j1() {
  var t = TT, a = MT, r = zT, l = DT, s = AT, u = [0, 1 / 0], c = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], h = 250, g = zu, m = ac("start", "zoom", "end"), y, p, v, b = 500, w = 150, R = 0, T = 10;
  function _(j) {
    j.property("__zoom", Fy).on("wheel.zoom", D, { passive: !1 }).on("mousedown.zoom", G).on("dblclick.zoom", le).filter(s).on("touchstart.zoom", $).on("touchmove.zoom", K).on("touchend.zoom touchcancel.zoom", re).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  _.transform = function(j, I, C, z) {
    var Y = j.selection ? j.selection() : j;
    Y.property("__zoom", Fy), j !== Y ? B(j, I, C, z) : Y.interrupt().each(function() {
      H(this, arguments).event(z).start().zoom(null, typeof I == "function" ? I.apply(this, arguments) : I).end();
    });
  }, _.scaleBy = function(j, I, C, z) {
    _.scaleTo(j, function() {
      var Y = this.__zoom.k, X = typeof I == "function" ? I.apply(this, arguments) : I;
      return Y * X;
    }, C, z);
  }, _.scaleTo = function(j, I, C, z) {
    _.transform(j, function() {
      var Y = a.apply(this, arguments), X = this.__zoom, te = C == null ? L(Y) : typeof C == "function" ? C.apply(this, arguments) : C, A = X.invert(te), k = typeof I == "function" ? I.apply(this, arguments) : I;
      return r(E(O(X, k), te, A), Y, c);
    }, C, z);
  }, _.translateBy = function(j, I, C, z) {
    _.transform(j, function() {
      return r(this.__zoom.translate(
        typeof I == "function" ? I.apply(this, arguments) : I,
        typeof C == "function" ? C.apply(this, arguments) : C
      ), a.apply(this, arguments), c);
    }, null, z);
  }, _.translateTo = function(j, I, C, z, Y) {
    _.transform(j, function() {
      var X = a.apply(this, arguments), te = this.__zoom, A = z == null ? L(X) : typeof z == "function" ? z.apply(this, arguments) : z;
      return r(oc.translate(A[0], A[1]).scale(te.k).translate(
        typeof I == "function" ? -I.apply(this, arguments) : -I,
        typeof C == "function" ? -C.apply(this, arguments) : -C
      ), X, c);
    }, z, Y);
  };
  function O(j, I) {
    return I = Math.max(u[0], Math.min(u[1], I)), I === j.k ? j : new ri(I, j.x, j.y);
  }
  function E(j, I, C) {
    var z = I[0] - C[0] * j.k, Y = I[1] - C[1] * j.k;
    return z === j.x && Y === j.y ? j : new ri(j.k, z, Y);
  }
  function L(j) {
    return [(+j[0][0] + +j[1][0]) / 2, (+j[0][1] + +j[1][1]) / 2];
  }
  function B(j, I, C, z) {
    j.on("start.zoom", function() {
      H(this, arguments).event(z).start();
    }).on("interrupt.zoom end.zoom", function() {
      H(this, arguments).event(z).end();
    }).tween("zoom", function() {
      var Y = this, X = arguments, te = H(Y, X).event(z), A = a.apply(Y, X), k = C == null ? L(A) : typeof C == "function" ? C.apply(Y, X) : C, F = Math.max(A[1][0] - A[0][0], A[1][1] - A[0][1]), ee = Y.__zoom, se = typeof I == "function" ? I.apply(Y, X) : I, he = g(ee.invert(k).concat(F / ee.k), se.invert(k).concat(F / se.k));
      return function(me) {
        if (me === 1) me = se;
        else {
          var W = he(me), ge = F / W[2];
          me = new ri(ge, k[0] - W[0] * ge, k[1] - W[1] * ge);
        }
        te.zoom(null, me);
      };
    });
  }
  function H(j, I, C) {
    return !C && j.__zooming || new V(j, I);
  }
  function V(j, I) {
    this.that = j, this.args = I, this.active = 0, this.sourceEvent = null, this.extent = a.apply(j, I), this.taps = 0;
  }
  V.prototype = {
    event: function(j) {
      return j && (this.sourceEvent = j), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(j, I) {
      return this.mouse && j !== "mouse" && (this.mouse[1] = I.invert(this.mouse[0])), this.touch0 && j !== "touch" && (this.touch0[1] = I.invert(this.touch0[0])), this.touch1 && j !== "touch" && (this.touch1[1] = I.invert(this.touch1[0])), this.that.__zoom = I, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(j) {
      var I = Vn(this.that).datum();
      m.call(
        j,
        this.that,
        new CT(j, {
          sourceEvent: this.sourceEvent,
          target: _,
          transform: this.that.__zoom,
          dispatch: m
        }),
        I
      );
    }
  };
  function D(j, ...I) {
    if (!t.apply(this, arguments)) return;
    var C = H(this, I).event(j), z = this.__zoom, Y = Math.max(u[0], Math.min(u[1], z.k * Math.pow(2, l.apply(this, arguments)))), X = ha(j);
    if (C.wheel)
      (C.mouse[0][0] !== X[0] || C.mouse[0][1] !== X[1]) && (C.mouse[1] = z.invert(C.mouse[0] = X)), clearTimeout(C.wheel);
    else {
      if (z.k === Y) return;
      C.mouse = [X, z.invert(X)], ju(this), C.start();
    }
    wo(j), C.wheel = setTimeout(te, w), C.zoom("mouse", r(E(O(z, Y), C.mouse[0], C.mouse[1]), C.extent, c));
    function te() {
      C.wheel = null, C.end();
    }
  }
  function G(j, ...I) {
    if (v || !t.apply(this, arguments)) return;
    var C = j.currentTarget, z = H(this, I, !0).event(j), Y = Vn(j.view).on("mousemove.zoom", k, !0).on("mouseup.zoom", F, !0), X = ha(j, C), te = j.clientX, A = j.clientY;
    v1(j.view), Ld(j), z.mouse = [X, this.__zoom.invert(X)], ju(this), z.start();
    function k(ee) {
      if (wo(ee), !z.moved) {
        var se = ee.clientX - te, he = ee.clientY - A;
        z.moved = se * se + he * he > R;
      }
      z.event(ee).zoom("mouse", r(E(z.that.__zoom, z.mouse[0] = ha(ee, C), z.mouse[1]), z.extent, c));
    }
    function F(ee) {
      Y.on("mousemove.zoom mouseup.zoom", null), b1(ee.view, z.moved), wo(ee), z.event(ee).end();
    }
  }
  function le(j, ...I) {
    if (t.apply(this, arguments)) {
      var C = this.__zoom, z = ha(j.changedTouches ? j.changedTouches[0] : j, this), Y = C.invert(z), X = C.k * (j.shiftKey ? 0.5 : 2), te = r(E(O(C, X), z, Y), a.apply(this, I), c);
      wo(j), h > 0 ? Vn(this).transition().duration(h).call(B, te, z, j) : Vn(this).call(_.transform, te, z, j);
    }
  }
  function $(j, ...I) {
    if (t.apply(this, arguments)) {
      var C = j.touches, z = C.length, Y = H(this, I, j.changedTouches.length === z).event(j), X, te, A, k;
      for (Ld(j), te = 0; te < z; ++te)
        A = C[te], k = ha(A, this), k = [k, this.__zoom.invert(k), A.identifier], Y.touch0 ? !Y.touch1 && Y.touch0[2] !== k[2] && (Y.touch1 = k, Y.taps = 0) : (Y.touch0 = k, X = !0, Y.taps = 1 + !!y);
      y && (y = clearTimeout(y)), X && (Y.taps < 2 && (p = k[0], y = setTimeout(function() {
        y = null;
      }, b)), ju(this), Y.start());
    }
  }
  function K(j, ...I) {
    if (this.__zooming) {
      var C = H(this, I).event(j), z = j.changedTouches, Y = z.length, X, te, A, k;
      for (wo(j), X = 0; X < Y; ++X)
        te = z[X], A = ha(te, this), C.touch0 && C.touch0[2] === te.identifier ? C.touch0[0] = A : C.touch1 && C.touch1[2] === te.identifier && (C.touch1[0] = A);
      if (te = C.that.__zoom, C.touch1) {
        var F = C.touch0[0], ee = C.touch0[1], se = C.touch1[0], he = C.touch1[1], me = (me = se[0] - F[0]) * me + (me = se[1] - F[1]) * me, W = (W = he[0] - ee[0]) * W + (W = he[1] - ee[1]) * W;
        te = O(te, Math.sqrt(me / W)), A = [(F[0] + se[0]) / 2, (F[1] + se[1]) / 2], k = [(ee[0] + he[0]) / 2, (ee[1] + he[1]) / 2];
      } else if (C.touch0) A = C.touch0[0], k = C.touch0[1];
      else return;
      C.zoom("touch", r(E(te, A, k), C.extent, c));
    }
  }
  function re(j, ...I) {
    if (this.__zooming) {
      var C = H(this, I).event(j), z = j.changedTouches, Y = z.length, X, te;
      for (Ld(j), v && clearTimeout(v), v = setTimeout(function() {
        v = null;
      }, b), X = 0; X < Y; ++X)
        te = z[X], C.touch0 && C.touch0[2] === te.identifier ? delete C.touch0 : C.touch1 && C.touch1[2] === te.identifier && delete C.touch1;
      if (C.touch1 && !C.touch0 && (C.touch0 = C.touch1, delete C.touch1), C.touch0) C.touch0[1] = this.__zoom.invert(C.touch0[0]);
      else if (C.end(), C.taps === 2 && (te = ha(te, this), Math.hypot(p[0] - te[0], p[1] - te[1]) < T)) {
        var A = Vn(this).on("dblclick.zoom");
        A && A.apply(this, arguments);
      }
    }
  }
  return _.wheelDelta = function(j) {
    return arguments.length ? (l = typeof j == "function" ? j : mu(+j), _) : l;
  }, _.filter = function(j) {
    return arguments.length ? (t = typeof j == "function" ? j : mu(!!j), _) : t;
  }, _.touchable = function(j) {
    return arguments.length ? (s = typeof j == "function" ? j : mu(!!j), _) : s;
  }, _.extent = function(j) {
    return arguments.length ? (a = typeof j == "function" ? j : mu([[+j[0][0], +j[0][1]], [+j[1][0], +j[1][1]]]), _) : a;
  }, _.scaleExtent = function(j) {
    return arguments.length ? (u[0] = +j[0], u[1] = +j[1], _) : [u[0], u[1]];
  }, _.translateExtent = function(j) {
    return arguments.length ? (c[0][0] = +j[0][0], c[1][0] = +j[1][0], c[0][1] = +j[0][1], c[1][1] = +j[1][1], _) : [[c[0][0], c[0][1]], [c[1][0], c[1][1]]];
  }, _.constrain = function(j) {
    return arguments.length ? (r = j, _) : r;
  }, _.duration = function(j) {
    return arguments.length ? (h = +j, _) : h;
  }, _.interpolate = function(j) {
    return arguments.length ? (g = j, _) : g;
  }, _.on = function() {
    var j = m.on.apply(m, arguments);
    return j === m ? _ : j;
  }, _.clickDistance = function(j) {
    return arguments.length ? (R = (j = +j) * j, _) : Math.sqrt(R);
  }, _.tapDistance = function(j) {
    return arguments.length ? (T = +j, _) : T;
  }, _;
}
const ya = {
  error001: (t = "react") => `Seems like you have not used zustand provider as an ancestor. Help: https://${t}flow.dev/error#001`,
  error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
  error003: (t) => `Node type "${t}" not found. Using fallback type "default".`,
  error004: () => "The parent container needs a width and a height to render the graph.",
  error005: () => "Only child nodes can use a parent extent.",
  error006: () => "Can't create edge. An edge needs a source and a target.",
  error007: (t) => `The old edge with id=${t} does not exist.`,
  error009: (t) => `Marker type "${t}" doesn't exist.`,
  error008: (t, { id: a, sourceHandle: r, targetHandle: l }) => `Couldn't create edge for ${t} handle id: "${t === "source" ? r : l}", edge id: ${a}.`,
  error010: () => "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
  error011: (t) => `Edge type "${t}" not found. Using fallback type "default".`,
  error012: (t) => `Node with id "${t}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
  error013: (t = "react") => `It seems that you haven't loaded the styles. Please import '@xyflow/${t}/dist/style.css' or base.css to make sure everything is working properly.`,
  error014: () => "useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.",
  error015: () => "It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs.",
  error016: (t) => `Edge with id "${t}" does not exist, it may have been removed. This can happen when an edge is deleted before the "onEdgeClick" handler is called.`
}, jo = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], H1 = ["Enter", " ", "Escape"], B1 = {
  "node.a11yDescription.default": "Press enter or space to select a node. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.keyboardDisabled": "Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.ariaLiveMessage": ({ direction: t, x: a, y: r }) => `Moved selected node ${t}. New position, x: ${a}, y: ${r}`,
  "edge.a11yDescription.default": "Press enter or space to select an edge. You can then press delete to remove it or escape to cancel.",
  // Control elements
  "controls.ariaLabel": "Control Panel",
  "controls.zoomIn.ariaLabel": "Zoom In",
  "controls.zoomOut.ariaLabel": "Zoom Out",
  "controls.fitView.ariaLabel": "Fit View",
  "controls.interactive.ariaLabel": "Toggle Interactivity",
  // Mini map
  "minimap.ariaLabel": "Mini Map",
  // Handle
  "handle.ariaLabel": "Handle"
};
var vl;
(function(t) {
  t.Strict = "strict", t.Loose = "loose";
})(vl || (vl = {}));
var vr;
(function(t) {
  t.Free = "free", t.Vertical = "vertical", t.Horizontal = "horizontal";
})(vr || (vr = {}));
var Ho;
(function(t) {
  t.Partial = "partial", t.Full = "full";
})(Ho || (Ho = {}));
const U1 = {
  inProgress: !1,
  isValid: null,
  from: null,
  fromHandle: null,
  fromPosition: null,
  fromNode: null,
  to: null,
  toHandle: null,
  toPosition: null,
  toNode: null,
  pointer: null
};
var Yi;
(function(t) {
  t.Bezier = "default", t.Straight = "straight", t.Step = "step", t.SmoothStep = "smoothstep", t.SimpleBezier = "simplebezier";
})(Yi || (Yi = {}));
var Gu;
(function(t) {
  t.Arrow = "arrow", t.ArrowClosed = "arrowclosed";
})(Gu || (Gu = {}));
var Ae;
(function(t) {
  t.Left = "left", t.Top = "top", t.Right = "right", t.Bottom = "bottom";
})(Ae || (Ae = {}));
const Ky = {
  [Ae.Left]: Ae.Right,
  [Ae.Right]: Ae.Left,
  [Ae.Top]: Ae.Bottom,
  [Ae.Bottom]: Ae.Top
};
function k1(t) {
  return t === null ? null : t ? "valid" : "invalid";
}
const V1 = (t) => "id" in t && "source" in t && "target" in t, OT = (t) => "id" in t && "position" in t && !("source" in t) && !("target" in t), Kh = (t) => "id" in t && "internals" in t && !("source" in t) && !("target" in t), Qo = (t, a = [0, 0]) => {
  const { width: r, height: l } = ui(t), s = t.origin ?? a, u = r * s[0], c = l * s[1];
  return {
    x: t.position.x - u,
    y: t.position.y - c
  };
}, LT = (t, a = { nodeOrigin: [0, 0] }) => {
  if (t.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const r = t.reduce((l, s) => {
    const u = typeof s == "string";
    let c = !a.nodeLookup && !u ? s : void 0;
    a.nodeLookup && (c = u ? a.nodeLookup.get(s) : Kh(s) ? s : a.nodeLookup.get(s.id));
    const h = c ? Iu(c, a.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return sc(l, h);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return uc(r);
}, Fo = (t, a = {}) => {
  let r = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, l = !1;
  return t.forEach((s) => {
    (a.filter === void 0 || a.filter(s)) && (r = sc(r, Iu(s)), l = !0);
  }), l ? uc(r) : { x: 0, y: 0, width: 0, height: 0 };
}, Ph = (t, a, [r, l, s] = [0, 0, 1], u = !1, c = !1) => {
  const h = {
    ..._l(a, [r, l, s]),
    width: a.width / s,
    height: a.height / s
  }, g = [];
  for (const m of t.values()) {
    const { measured: y, selectable: p = !0, hidden: v = !1 } = m;
    if (c && !p || v)
      continue;
    const b = y.width ?? m.width ?? m.initialWidth ?? null, w = y.height ?? m.height ?? m.initialHeight ?? null, R = Bo(h, xl(m)), T = (b ?? 0) * (w ?? 0), _ = u && R > 0;
    (!m.internals.handleBounds || _ || R >= T || m.dragging) && g.push(m);
  }
  return g;
}, jT = (t, a) => {
  const r = /* @__PURE__ */ new Set();
  return t.forEach((l) => {
    r.add(l.id);
  }), a.filter((l) => r.has(l.source) || r.has(l.target));
};
function HT(t, a) {
  const r = /* @__PURE__ */ new Map(), l = a?.nodes ? new Set(a.nodes.map((s) => s.id)) : null;
  return t.forEach((s) => {
    s.measured.width && s.measured.height && (a?.includeHiddenNodes || !s.hidden) && (!l || l.has(s.id)) && r.set(s.id, s);
  }), r;
}
async function BT({ nodes: t, width: a, height: r, panZoom: l, minZoom: s, maxZoom: u }, c) {
  if (t.size === 0)
    return !0;
  const h = HT(t, c), g = Fo(h), m = Wh(g, a, r, c?.minZoom ?? s, c?.maxZoom ?? u, c?.padding ?? 0.1);
  return await l.setViewport(m, {
    duration: c?.duration,
    ease: c?.ease,
    interpolate: c?.interpolate
  }), !0;
}
function q1({ nodeId: t, nextPosition: a, nodeLookup: r, nodeOrigin: l = [0, 0], nodeExtent: s, onError: u }) {
  const c = r.get(t), h = c.parentId ? r.get(c.parentId) : void 0, { x: g, y: m } = h ? h.internals.positionAbsolute : { x: 0, y: 0 }, y = c.origin ?? l;
  let p = c.extent || s;
  if (c.extent === "parent" && !c.expandParent)
    if (!h)
      u?.("005", ya.error005());
    else {
      const b = h.measured.width, w = h.measured.height;
      b && w && (p = [
        [g, m],
        [g + b, m + w]
      ]);
    }
  else h && Sr(c.extent) && (p = [
    [c.extent[0][0] + g, c.extent[0][1] + m],
    [c.extent[1][0] + g, c.extent[1][1] + m]
  ]);
  const v = Sr(p) ? wr(a, p, c.measured) : a;
  return (c.measured.width === void 0 || c.measured.height === void 0) && u?.("015", ya.error015()), {
    position: {
      x: v.x - g + (c.measured.width ?? 0) * y[0],
      y: v.y - m + (c.measured.height ?? 0) * y[1]
    },
    positionAbsolute: v
  };
}
async function UT({ nodesToRemove: t = [], edgesToRemove: a = [], nodes: r, edges: l, onBeforeDelete: s }) {
  const u = new Set(t.map((v) => v.id)), c = [];
  for (const v of r) {
    if (v.deletable === !1)
      continue;
    const b = u.has(v.id), w = !b && v.parentId && c.find((R) => R.id === v.parentId);
    (b || w) && c.push(v);
  }
  const h = new Set(a.map((v) => v.id)), g = l.filter((v) => v.deletable !== !1), y = jT(c, g);
  for (const v of g)
    h.has(v.id) && !y.find((w) => w.id === v.id) && y.push(v);
  if (!s)
    return {
      edges: y,
      nodes: c
    };
  const p = await s({
    nodes: c,
    edges: y
  });
  return typeof p == "boolean" ? p ? { edges: y, nodes: c } : { edges: [], nodes: [] } : p;
}
const bl = (t, a = 0, r = 1) => Math.min(Math.max(t, a), r), wr = (t = { x: 0, y: 0 }, a, r) => ({
  x: bl(t.x, a[0][0], a[1][0] - (r?.width ?? 0)),
  y: bl(t.y, a[0][1], a[1][1] - (r?.height ?? 0))
});
function Y1(t, a, r) {
  const { width: l, height: s } = ui(r), { x: u, y: c } = r.internals.positionAbsolute;
  return wr(t, [
    [u, c],
    [u + l, c + s]
  ], a);
}
const Py = (t, a, r) => t < a ? bl(Math.abs(t - a), 1, a) / a : t > r ? -bl(Math.abs(t - r), 1, a) / a : 0, Jh = (t, a, r = 15, l = 40) => {
  const s = Py(t.x, l, a.width - l) * r, u = Py(t.y, l, a.height - l) * r;
  return [s, u];
}, sc = (t, a) => ({
  x: Math.min(t.x, a.x),
  y: Math.min(t.y, a.y),
  x2: Math.max(t.x2, a.x2),
  y2: Math.max(t.y2, a.y2)
}), uh = ({ x: t, y: a, width: r, height: l }) => ({
  x: t,
  y: a,
  x2: t + r,
  y2: a + l
}), uc = ({ x: t, y: a, x2: r, y2: l }) => ({
  x: t,
  y: a,
  width: r - t,
  height: l - a
}), xl = (t, a = [0, 0]) => {
  const { x: r, y: l } = Kh(t) ? t.internals.positionAbsolute : Qo(t, a);
  return {
    x: r,
    y: l,
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}, Iu = (t, a = [0, 0]) => {
  const { x: r, y: l } = Kh(t) ? t.internals.positionAbsolute : Qo(t, a);
  return {
    x: r,
    y: l,
    x2: r + (t.measured?.width ?? t.width ?? t.initialWidth ?? 0),
    y2: l + (t.measured?.height ?? t.height ?? t.initialHeight ?? 0)
  };
}, $1 = (t, a) => uc(sc(uh(t), uh(a))), Bo = (t, a) => {
  const r = Math.max(0, Math.min(t.x + t.width, a.x + a.width) - Math.max(t.x, a.x)), l = Math.max(0, Math.min(t.y + t.height, a.y + a.height) - Math.max(t.y, a.y));
  return Math.ceil(r * l);
}, Jy = (t) => pa(t.width) && pa(t.height) && pa(t.x) && pa(t.y), pa = (t) => !isNaN(t) && isFinite(t), X1 = (t, a) => (r, l) => {
}, Ko = (t, a = [1, 1]) => ({
  x: a[0] * Math.round(t.x / a[0]),
  y: a[1] * Math.round(t.y / a[1])
}), _l = ({ x: t, y: a }, [r, l, s], u = !1, c = [1, 1]) => {
  const h = {
    x: (t - r) / s,
    y: (a - l) / s
  };
  return u ? Ko(h, c) : h;
}, wl = ({ x: t, y: a }, [r, l, s]) => ({
  x: t * s + r,
  y: a * s + l
});
function rl(t, a) {
  if (typeof t == "number")
    return Math.floor((a - a / (1 + t)) * 0.5);
  if (typeof t == "string" && t.endsWith("px")) {
    const r = parseFloat(t);
    if (!Number.isNaN(r))
      return Math.floor(r);
  }
  if (typeof t == "string" && t.endsWith("%")) {
    const r = parseFloat(t);
    if (!Number.isNaN(r))
      return Math.floor(a * r * 0.01);
  }
  return console.error(`The padding value "${t}" is invalid. Please provide a number or a string with a valid unit (px or %).`), 0;
}
function kT(t, a, r) {
  if (typeof t == "string" || typeof t == "number") {
    const l = rl(t, r), s = rl(t, a);
    return {
      top: l,
      right: s,
      bottom: l,
      left: s,
      x: s * 2,
      y: l * 2
    };
  }
  if (typeof t == "object") {
    const l = rl(t.top ?? t.y ?? 0, r), s = rl(t.bottom ?? t.y ?? 0, r), u = rl(t.left ?? t.x ?? 0, a), c = rl(t.right ?? t.x ?? 0, a);
    return { top: l, right: c, bottom: s, left: u, x: u + c, y: l + s };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function VT(t, a, r, l, s, u) {
  const { x: c, y: h } = wl(t, [a, r, l]), { x: g, y: m } = wl({ x: t.x + t.width, y: t.y + t.height }, [a, r, l]), y = s - g, p = u - m;
  return {
    left: Math.floor(c),
    top: Math.floor(h),
    right: Math.floor(y),
    bottom: Math.floor(p)
  };
}
const Wh = (t, a, r, l, s, u) => {
  const c = kT(u, a, r), h = (a - c.x) / t.width, g = (r - c.y) / t.height, m = Math.min(h, g), y = bl(m, l, s), p = t.x + t.width / 2, v = t.y + t.height / 2, b = a / 2 - p * y, w = r / 2 - v * y, R = VT(t, b, w, y, a, r), T = {
    left: Math.min(R.left - c.left, 0),
    top: Math.min(R.top - c.top, 0),
    right: Math.min(R.right - c.right, 0),
    bottom: Math.min(R.bottom - c.bottom, 0)
  };
  return {
    x: b - T.left + T.right,
    y: w - T.top + T.bottom,
    zoom: y
  };
}, Uo = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function Sr(t) {
  return t != null && t !== "parent";
}
function ui(t) {
  return {
    width: t.measured?.width ?? t.width ?? t.initialWidth ?? 0,
    height: t.measured?.height ?? t.height ?? t.initialHeight ?? 0
  };
}
function G1(t) {
  return (t.measured?.width ?? t.width ?? t.initialWidth) !== void 0 && (t.measured?.height ?? t.height ?? t.initialHeight) !== void 0;
}
function I1(t, a = { width: 0, height: 0 }, r, l, s) {
  const u = { ...t }, c = l.get(r);
  if (c) {
    const h = c.origin || s;
    u.x += c.internals.positionAbsolute.x - (a.width ?? 0) * h[0], u.y += c.internals.positionAbsolute.y - (a.height ?? 0) * h[1];
  }
  return u;
}
function Wy(t, a) {
  if (t.size !== a.size)
    return !1;
  for (const r of t)
    if (!a.has(r))
      return !1;
  return !0;
}
function qT() {
  let t, a;
  return { promise: new Promise((l, s) => {
    t = l, a = s;
  }), resolve: t, reject: a };
}
function YT(t) {
  return { ...B1, ...t || {} };
}
function To(t, { snapGrid: a = [0, 0], snapToGrid: r = !1, transform: l, containerBounds: s }) {
  const { x: u, y: c } = ga(t), h = _l({ x: u - (s?.left ?? 0), y: c - (s?.top ?? 0) }, l), { x: g, y: m } = r ? Ko(h, a) : h;
  return {
    xSnapped: g,
    ySnapped: m,
    ...h
  };
}
const em = (t) => ({
  width: t.offsetWidth,
  height: t.offsetHeight
}), Z1 = (t) => t?.getRootNode?.() || window?.document, $T = ["INPUT", "SELECT", "TEXTAREA"];
function Q1(t) {
  const a = t.composedPath?.()?.[0] || t.target;
  return a?.nodeType !== 1 ? !1 : $T.includes(a.nodeName) || a.hasAttribute("contenteditable") || !!a.closest(".nokey");
}
const F1 = (t) => "clientX" in t, ga = (t, a) => {
  const r = F1(t), l = r ? t.clientX : t.touches?.[0].clientX, s = r ? t.clientY : t.touches?.[0].clientY;
  return {
    x: l - (a?.left ?? 0),
    y: s - (a?.top ?? 0)
  };
}, ev = (t, a, r, l, s) => {
  const u = a.querySelectorAll(`.${t}`);
  return !u || !u.length ? null : Array.from(u).map((c) => {
    const h = c.getBoundingClientRect();
    return {
      id: c.getAttribute("data-handleid"),
      type: t,
      nodeId: s,
      position: c.getAttribute("data-handlepos"),
      x: (h.left - r.left) / l,
      y: (h.top - r.top) / l,
      ...em(c)
    };
  });
};
function K1({ sourceX: t, sourceY: a, targetX: r, targetY: l, sourceControlX: s, sourceControlY: u, targetControlX: c, targetControlY: h }) {
  const g = t * 0.125 + s * 0.375 + c * 0.375 + r * 0.125, m = a * 0.125 + u * 0.375 + h * 0.375 + l * 0.125, y = Math.abs(g - t), p = Math.abs(m - a);
  return [g, m, y, p];
}
function pu(t, a) {
  return t >= 0 ? 0.5 * t : a * 25 * Math.sqrt(-t);
}
function tv({ pos: t, x1: a, y1: r, x2: l, y2: s, c: u }) {
  switch (t) {
    case Ae.Left:
      return [a - pu(a - l, u), r];
    case Ae.Right:
      return [a + pu(l - a, u), r];
    case Ae.Top:
      return [a, r - pu(r - s, u)];
    case Ae.Bottom:
      return [a, r + pu(s - r, u)];
  }
}
function P1({ sourceX: t, sourceY: a, sourcePosition: r = Ae.Bottom, targetX: l, targetY: s, targetPosition: u = Ae.Top, curvature: c = 0.25 }) {
  const [h, g] = tv({
    pos: r,
    x1: t,
    y1: a,
    x2: l,
    y2: s,
    c
  }), [m, y] = tv({
    pos: u,
    x1: l,
    y1: s,
    x2: t,
    y2: a,
    c
  }), [p, v, b, w] = K1({
    sourceX: t,
    sourceY: a,
    targetX: l,
    targetY: s,
    sourceControlX: h,
    sourceControlY: g,
    targetControlX: m,
    targetControlY: y
  });
  return [
    `M${t},${a} C${h},${g} ${m},${y} ${l},${s}`,
    p,
    v,
    b,
    w
  ];
}
function J1({ sourceX: t, sourceY: a, targetX: r, targetY: l }) {
  const s = Math.abs(r - t) / 2, u = r < t ? r + s : r - s, c = Math.abs(l - a) / 2, h = l < a ? l + c : l - c;
  return [u, h, s, c];
}
function XT({ sourceNode: t, targetNode: a, selected: r = !1, zIndex: l = 0, elevateOnSelect: s = !1, zIndexMode: u = "basic" }) {
  if (u === "manual")
    return l;
  const c = s && r ? l + 1e3 : l, h = Math.max(t.parentId || s && t.selected ? t.internals.z : 0, a.parentId || s && a.selected ? a.internals.z : 0);
  return c + h;
}
function GT({ sourceNode: t, targetNode: a, width: r, height: l, transform: s }) {
  const u = sc(Iu(t), Iu(a));
  u.x === u.x2 && (u.x2 += 1), u.y === u.y2 && (u.y2 += 1);
  const c = {
    x: -s[0] / s[2],
    y: -s[1] / s[2],
    width: r / s[2],
    height: l / s[2]
  };
  return Bo(c, uc(u)) > 0;
}
const IT = ({ source: t, sourceHandle: a, target: r, targetHandle: l }) => `xy-edge__${t}${a || ""}-${r}${l || ""}`, ZT = (t, a) => a.some((r) => r.source === t.source && r.target === t.target && (r.sourceHandle === t.sourceHandle || !r.sourceHandle && !t.sourceHandle) && (r.targetHandle === t.targetHandle || !r.targetHandle && !t.targetHandle)), QT = (t, a, r = {}) => {
  if (!t.source || !t.target)
    return r.onError?.("006", ya.error006()), a;
  const l = r.getEdgeId || IT;
  let s;
  return V1(t) ? s = { ...t } : s = {
    ...t,
    id: l(t)
  }, ZT(s, a) ? a : (s.sourceHandle === null && delete s.sourceHandle, s.targetHandle === null && delete s.targetHandle, a.concat(s));
};
function W1({ sourceX: t, sourceY: a, targetX: r, targetY: l }) {
  const [s, u, c, h] = J1({
    sourceX: t,
    sourceY: a,
    targetX: r,
    targetY: l
  });
  return [`M ${t},${a}L ${r},${l}`, s, u, c, h];
}
const nv = {
  [Ae.Left]: { x: -1, y: 0 },
  [Ae.Right]: { x: 1, y: 0 },
  [Ae.Top]: { x: 0, y: -1 },
  [Ae.Bottom]: { x: 0, y: 1 }
}, FT = ({ source: t, sourcePosition: a = Ae.Bottom, target: r }) => a === Ae.Left || a === Ae.Right ? t.x < r.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : t.y < r.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, av = (t, a) => Math.sqrt(Math.pow(a.x - t.x, 2) + Math.pow(a.y - t.y, 2));
function KT({ source: t, sourcePosition: a = Ae.Bottom, target: r, targetPosition: l = Ae.Top, center: s, offset: u, stepPosition: c }) {
  const h = nv[a], g = nv[l], m = { x: t.x + h.x * u, y: t.y + h.y * u }, y = { x: r.x + g.x * u, y: r.y + g.y * u }, p = FT({
    source: m,
    sourcePosition: a,
    target: y
  }), v = p.x !== 0 ? "x" : "y", b = p[v];
  let w = [], R, T;
  const _ = { x: 0, y: 0 }, O = { x: 0, y: 0 }, [, , E, L] = J1({
    sourceX: t.x,
    sourceY: t.y,
    targetX: r.x,
    targetY: r.y
  });
  if (h[v] * g[v] === -1) {
    v === "x" ? (R = s.x ?? m.x + (y.x - m.x) * c, T = s.y ?? (m.y + y.y) / 2) : (R = s.x ?? (m.x + y.x) / 2, T = s.y ?? m.y + (y.y - m.y) * c);
    const D = [
      { x: R, y: m.y },
      { x: R, y: y.y }
    ], G = [
      { x: m.x, y: T },
      { x: y.x, y: T }
    ];
    h[v] === b ? w = v === "x" ? D : G : w = v === "x" ? G : D;
  } else {
    const D = [{ x: m.x, y: y.y }], G = [{ x: y.x, y: m.y }];
    if (v === "x" ? w = h.x === b ? G : D : w = h.y === b ? D : G, a === l) {
      const j = Math.abs(t[v] - r[v]);
      if (j <= u) {
        const I = Math.min(u - 1, u - j);
        h[v] === b ? _[v] = (m[v] > t[v] ? -1 : 1) * I : O[v] = (y[v] > r[v] ? -1 : 1) * I;
      }
    }
    if (a !== l) {
      const j = v === "x" ? "y" : "x", I = h[v] === g[j], C = m[j] > y[j], z = m[j] < y[j];
      (h[v] === 1 && (!I && C || I && z) || h[v] !== 1 && (!I && z || I && C)) && (w = v === "x" ? D : G);
    }
    const le = { x: m.x + _.x, y: m.y + _.y }, $ = { x: y.x + O.x, y: y.y + O.y }, K = Math.max(Math.abs(le.x - w[0].x), Math.abs($.x - w[0].x)), re = Math.max(Math.abs(le.y - w[0].y), Math.abs($.y - w[0].y));
    K >= re ? (R = (le.x + $.x) / 2, T = w[0].y) : (R = w[0].x, T = (le.y + $.y) / 2);
  }
  const B = { x: m.x + _.x, y: m.y + _.y }, H = { x: y.x + O.x, y: y.y + O.y };
  return [[
    t,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...B.x !== w[0].x || B.y !== w[0].y ? [B] : [],
    ...w,
    ...H.x !== w[w.length - 1].x || H.y !== w[w.length - 1].y ? [H] : [],
    r
  ], R, T, E, L];
}
function PT(t, a, r, l) {
  const s = Math.min(av(t, a) / 2, av(a, r) / 2, l), { x: u, y: c } = a;
  if (t.x === u && u === r.x || t.y === c && c === r.y)
    return `L${u} ${c}`;
  if (t.y === c) {
    const m = t.x < r.x ? -1 : 1, y = t.y < r.y ? 1 : -1;
    return `L ${u + s * m},${c}Q ${u},${c} ${u},${c + s * y}`;
  }
  const h = t.x < r.x ? 1 : -1, g = t.y < r.y ? -1 : 1;
  return `L ${u},${c + s * g}Q ${u},${c} ${u + s * h},${c}`;
}
function ch({ sourceX: t, sourceY: a, sourcePosition: r = Ae.Bottom, targetX: l, targetY: s, targetPosition: u = Ae.Top, borderRadius: c = 5, centerX: h, centerY: g, offset: m = 20, stepPosition: y = 0.5 }) {
  const [p, v, b, w, R] = KT({
    source: { x: t, y: a },
    sourcePosition: r,
    target: { x: l, y: s },
    targetPosition: u,
    center: { x: h, y: g },
    offset: m,
    stepPosition: y
  });
  let T = `M${p[0].x} ${p[0].y}`;
  for (let _ = 1; _ < p.length - 1; _++)
    T += PT(p[_ - 1], p[_], p[_ + 1], c);
  return T += `L${p[p.length - 1].x} ${p[p.length - 1].y}`, [T, v, b, w, R];
}
function iv(t) {
  return t && !!(t.internals.handleBounds || t.handles?.length) && !!(t.measured.width || t.width || t.initialWidth);
}
function JT(t) {
  const { sourceNode: a, targetNode: r } = t;
  if (!iv(a) || !iv(r))
    return null;
  const l = a.internals.handleBounds || rv(a.handles), s = r.internals.handleBounds || rv(r.handles), u = lv(l?.source ?? [], t.sourceHandle), c = lv(
    // when connection type is loose we can define all handles as sources and connect source -> source
    t.connectionMode === vl.Strict ? s?.target ?? [] : (s?.target ?? []).concat(s?.source ?? []),
    t.targetHandle
  );
  if (!u || !c)
    return t.onError?.("008", ya.error008(u ? "target" : "source", {
      id: t.id,
      sourceHandle: t.sourceHandle,
      targetHandle: t.targetHandle
    })), null;
  const h = u?.position || Ae.Bottom, g = c?.position || Ae.Top, m = Er(a, u, h), y = Er(r, c, g);
  return {
    sourceX: m.x,
    sourceY: m.y,
    targetX: y.x,
    targetY: y.y,
    sourcePosition: h,
    targetPosition: g
  };
}
function rv(t) {
  if (!t)
    return null;
  const a = [], r = [];
  for (const l of t)
    l.width = l.width ?? 1, l.height = l.height ?? 1, l.type === "source" ? a.push(l) : l.type === "target" && r.push(l);
  return {
    source: a,
    target: r
  };
}
function Er(t, a, r = Ae.Left, l = !1) {
  const s = (a?.x ?? 0) + t.internals.positionAbsolute.x, u = (a?.y ?? 0) + t.internals.positionAbsolute.y, { width: c, height: h } = a ?? ui(t);
  if (l)
    return { x: s + c / 2, y: u + h / 2 };
  switch (a?.position ?? r) {
    case Ae.Top:
      return { x: s + c / 2, y: u };
    case Ae.Right:
      return { x: s + c, y: u + h / 2 };
    case Ae.Bottom:
      return { x: s + c / 2, y: u + h };
    case Ae.Left:
      return { x: s, y: u + h / 2 };
  }
}
function lv(t, a) {
  return t && (a ? t.find((r) => r.id === a) : t[0]) || null;
}
function fh(t, a) {
  return t ? typeof t == "string" ? t : `${a ? `${a}__` : ""}${Object.keys(t).sort().map((l) => `${l}=${t[l]}`).join("&")}` : "";
}
function WT(t, { id: a, defaultColor: r, defaultMarkerStart: l, defaultMarkerEnd: s }) {
  const u = /* @__PURE__ */ new Set();
  return t.reduce((c, h) => ([h.markerStart || l, h.markerEnd || s].forEach((g) => {
    if (g && typeof g == "object") {
      const m = fh(g, a);
      u.has(m) || (c.push({ id: m, color: g.color || r, ...g }), u.add(m));
    }
  }), c), []).sort((c, h) => c.id.localeCompare(h.id));
}
const ex = 1e3, eM = 10, tm = {
  nodeOrigin: [0, 0],
  nodeExtent: jo,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, tM = {
  ...tm,
  checkEquality: !0
};
function nm(t, a) {
  const r = { ...t };
  for (const l in a)
    a[l] !== void 0 && (r[l] = a[l]);
  return r;
}
function nM(t, a, r) {
  const l = nm(tm, r);
  for (const s of t.values())
    if (s.parentId)
      im(s, t, a, l);
    else {
      const u = Qo(s, l.nodeOrigin), c = Sr(s.extent) ? s.extent : l.nodeExtent, h = wr(u, c, ui(s));
      s.internals.positionAbsolute = h;
    }
}
function aM(t, a) {
  if (!t.handles)
    return t.measured ? a?.internals.handleBounds : void 0;
  const r = [], l = [];
  for (const s of t.handles) {
    const u = {
      id: s.id,
      width: s.width ?? 1,
      height: s.height ?? 1,
      nodeId: t.id,
      x: s.x,
      y: s.y,
      position: s.position,
      type: s.type
    };
    s.type === "source" ? r.push(u) : s.type === "target" && l.push(u);
  }
  return {
    source: r,
    target: l
  };
}
function am(t) {
  return t === "manual";
}
function dh(t, a, r, l = {}) {
  const s = nm(tM, l), u = { i: 0 }, c = new Map(a), h = s?.elevateNodesOnSelect && !am(s.zIndexMode) ? ex : 0;
  let g = t.length > 0, m = !1;
  a.clear(), r.clear();
  for (const y of t) {
    let p = c.get(y.id);
    if (s.checkEquality && y === p?.internals.userNode)
      a.set(y.id, p);
    else {
      const v = Qo(y, s.nodeOrigin), b = Sr(y.extent) ? y.extent : s.nodeExtent, w = wr(v, b, ui(y));
      p = {
        ...s.defaults,
        ...y,
        measured: {
          width: y.measured?.width,
          height: y.measured?.height
        },
        internals: {
          positionAbsolute: w,
          // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
          handleBounds: aM(y, p),
          z: tx(y, h, s.zIndexMode),
          userNode: y
        }
      }, a.set(y.id, p);
    }
    (p.measured === void 0 || p.measured.width === void 0 || p.measured.height === void 0) && !p.hidden && (g = !1), y.parentId && im(p, a, r, l, u), m ||= y.selected ?? !1;
  }
  return { nodesInitialized: g, hasSelectedNodes: m };
}
function iM(t, a) {
  if (!t.parentId)
    return;
  const r = a.get(t.parentId);
  r ? r.set(t.id, t) : a.set(t.parentId, /* @__PURE__ */ new Map([[t.id, t]]));
}
function im(t, a, r, l, s) {
  const { elevateNodesOnSelect: u, nodeOrigin: c, nodeExtent: h, zIndexMode: g } = nm(tm, l), m = t.parentId, y = a.get(m);
  if (!y) {
    console.warn(`Parent node ${m} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  iM(t, r), s && !y.parentId && y.internals.rootParentIndex === void 0 && g === "auto" && (y.internals.rootParentIndex = ++s.i, y.internals.z = y.internals.z + s.i * eM), s && y.internals.rootParentIndex !== void 0 && (s.i = y.internals.rootParentIndex);
  const p = u && !am(g) ? ex : 0, { x: v, y: b, z: w } = rM(t, y, c, h, p, g), { positionAbsolute: R } = t.internals, T = v !== R.x || b !== R.y;
  (T || w !== t.internals.z) && a.set(t.id, {
    ...t,
    internals: {
      ...t.internals,
      positionAbsolute: T ? { x: v, y: b } : R,
      z: w
    }
  });
}
function tx(t, a, r) {
  const l = pa(t.zIndex) ? t.zIndex : 0;
  return am(r) ? l : l + (t.selected ? a : 0);
}
function rM(t, a, r, l, s, u) {
  const { x: c, y: h } = a.internals.positionAbsolute, g = ui(t), m = Qo(t, r), y = Sr(t.extent) ? wr(m, t.extent, g) : m;
  let p = wr({ x: c + y.x, y: h + y.y }, l, g);
  t.extent === "parent" && (p = Y1(p, g, a));
  const v = tx(t, s, u), b = a.internals.z ?? 0;
  return {
    x: p.x,
    y: p.y,
    z: b >= v ? b + 1 : v
  };
}
function rm(t, a, r, l = [0, 0]) {
  const s = [], u = /* @__PURE__ */ new Map();
  for (const c of t) {
    const h = a.get(c.parentId);
    if (!h)
      continue;
    const g = u.get(c.parentId)?.expandedRect ?? xl(h), m = $1(g, c.rect);
    u.set(c.parentId, { expandedRect: m, parent: h });
  }
  return u.size > 0 && u.forEach(({ expandedRect: c, parent: h }, g) => {
    const m = h.internals.positionAbsolute, y = ui(h), p = h.origin ?? l, v = c.x < m.x ? Math.round(Math.abs(m.x - c.x)) : 0, b = c.y < m.y ? Math.round(Math.abs(m.y - c.y)) : 0, w = Math.max(y.width, Math.round(c.width)), R = Math.max(y.height, Math.round(c.height)), T = (w - y.width) * p[0], _ = (R - y.height) * p[1];
    (v > 0 || b > 0 || T || _) && (s.push({
      id: g,
      type: "position",
      position: {
        x: h.position.x - v + T,
        y: h.position.y - b + _
      }
    }), r.get(g)?.forEach((O) => {
      t.some((E) => E.id === O.id) || s.push({
        id: O.id,
        type: "position",
        position: {
          x: O.position.x + v,
          y: O.position.y + b
        }
      });
    })), (y.width < c.width || y.height < c.height || v || b) && s.push({
      id: g,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: w + (v ? p[0] * v - T : 0),
        height: R + (b ? p[1] * b - _ : 0)
      }
    });
  }), s;
}
function lM(t, a, r, l, s, u, c) {
  const h = l?.querySelector(".xyflow__viewport");
  let g = !1;
  if (!h)
    return { changes: [], updatedInternals: g };
  const m = [], y = window.getComputedStyle(h), { m22: p } = new window.DOMMatrixReadOnly(y.transform), v = [];
  for (const b of t.values()) {
    const w = a.get(b.id);
    if (!w)
      continue;
    if (w.hidden) {
      a.set(w.id, {
        ...w,
        internals: {
          ...w.internals,
          handleBounds: void 0
        }
      }), g = !0;
      continue;
    }
    const R = em(b.nodeElement), T = w.measured.width !== R.width || w.measured.height !== R.height;
    if (!!(R.width && R.height && (T || !w.internals.handleBounds || b.force))) {
      const O = b.nodeElement.getBoundingClientRect(), E = Sr(w.extent) ? w.extent : u;
      let { positionAbsolute: L } = w.internals;
      w.parentId && w.extent === "parent" ? L = Y1(L, R, a.get(w.parentId)) : E && (L = wr(L, E, R));
      const B = {
        ...w,
        measured: R,
        internals: {
          ...w.internals,
          positionAbsolute: L,
          handleBounds: {
            source: ev("source", b.nodeElement, O, p, w.id),
            target: ev("target", b.nodeElement, O, p, w.id)
          }
        }
      };
      a.set(w.id, B), w.parentId && im(B, a, r, { nodeOrigin: s, zIndexMode: c }), g = !0, T && (m.push({
        id: w.id,
        type: "dimensions",
        dimensions: R
      }), w.expandParent && w.parentId && v.push({
        id: w.id,
        parentId: w.parentId,
        rect: xl(B, s)
      }));
    }
  }
  if (v.length > 0) {
    const b = rm(v, a, r, s);
    m.push(...b);
  }
  return { changes: m, updatedInternals: g };
}
async function oM({ delta: t, panZoom: a, transform: r, translateExtent: l, width: s, height: u }) {
  if (!a || !t.x && !t.y)
    return !1;
  const c = await a.setViewportConstrained({
    x: r[0] + t.x,
    y: r[1] + t.y,
    zoom: r[2]
  }, [
    [0, 0],
    [s, u]
  ], l);
  return !!c && (c.x !== r[0] || c.y !== r[1] || c.k !== r[2]);
}
function ov(t, a, r, l, s, u) {
  let c = s;
  const h = l.get(c) || /* @__PURE__ */ new Map();
  l.set(c, h.set(r, a)), c = `${s}-${t}`;
  const g = l.get(c) || /* @__PURE__ */ new Map();
  if (l.set(c, g.set(r, a)), u) {
    c = `${s}-${t}-${u}`;
    const m = l.get(c) || /* @__PURE__ */ new Map();
    l.set(c, m.set(r, a));
  }
}
function nx(t, a, r) {
  t.clear(), a.clear();
  for (const l of r) {
    const { source: s, target: u, sourceHandle: c = null, targetHandle: h = null } = l, g = { edgeId: l.id, source: s, target: u, sourceHandle: c, targetHandle: h }, m = `${s}-${c}--${u}-${h}`, y = `${u}-${h}--${s}-${c}`;
    ov("source", g, y, t, s, c), ov("target", g, m, t, u, h), a.set(l.id, l);
  }
}
function ax(t, a) {
  if (!t.parentId)
    return !1;
  const r = a.get(t.parentId);
  return r ? r.selected ? !0 : ax(r, a) : !1;
}
function sv(t, a, r) {
  let l = t;
  do {
    if (l?.matches?.(a))
      return !0;
    if (l === r)
      return !1;
    l = l?.parentElement;
  } while (l);
  return !1;
}
function sM(t, a, r, l) {
  const s = /* @__PURE__ */ new Map();
  for (const [u, c] of t)
    if ((c.selected || c.id === l) && (!c.parentId || !ax(c, t)) && (c.draggable || a && typeof c.draggable > "u")) {
      const h = t.get(u);
      h && s.set(u, {
        id: u,
        position: h.position || { x: 0, y: 0 },
        distance: {
          x: r.x - h.internals.positionAbsolute.x,
          y: r.y - h.internals.positionAbsolute.y
        },
        extent: h.extent,
        parentId: h.parentId,
        origin: h.origin,
        expandParent: h.expandParent,
        internals: {
          positionAbsolute: h.internals.positionAbsolute || { x: 0, y: 0 }
        },
        measured: {
          width: h.measured.width ?? 0,
          height: h.measured.height ?? 0
        }
      });
    }
  return s;
}
function jd({ nodeId: t, dragItems: a, nodeLookup: r, dragging: l = !0 }) {
  const s = [];
  for (const [c, h] of a) {
    const g = r.get(c)?.internals.userNode;
    g && s.push({
      ...g,
      position: h.position,
      dragging: l
    });
  }
  if (!t)
    return [s[0], s];
  const u = r.get(t)?.internals.userNode;
  return [
    u ? {
      ...u,
      position: a.get(t)?.position || u.position,
      dragging: l
    } : s[0],
    s
  ];
}
function uM({ dragItems: t, snapGrid: a, x: r, y: l }) {
  const s = t.values().next().value;
  if (!s)
    return null;
  const u = {
    x: r - s.distance.x,
    y: l - s.distance.y
  }, c = Ko(u, a);
  return {
    x: c.x - u.x,
    y: c.y - u.y
  };
}
function cM({ onNodeMouseDown: t, getStoreItems: a, onDragStart: r, onDrag: l, onDragStop: s }) {
  let u = { x: null, y: null }, c = 0, h = /* @__PURE__ */ new Map(), g = !1, m = { x: 0, y: 0 }, y = null, p = !1, v = null, b = !1, w = !1, R = null;
  function T({ noDragClassName: O, handleSelector: E, domNode: L, isSelectable: B, nodeId: H, nodeClickDistance: V = 0 }) {
    v = Vn(L);
    function D({ x: K, y: re }) {
      const { nodeLookup: j, nodeExtent: I, snapGrid: C, snapToGrid: z, nodeOrigin: Y, onNodeDrag: X, onSelectionDrag: te, onError: A, updateNodePositions: k } = a();
      u = { x: K, y: re };
      let F = !1;
      const ee = h.size > 1, se = ee && I ? uh(Fo(h)) : null, he = ee && z ? uM({
        dragItems: h,
        snapGrid: C,
        x: K,
        y: re
      }) : null;
      for (const [me, W] of h) {
        if (!j.has(me))
          continue;
        let ge = { x: K - W.distance.x, y: re - W.distance.y };
        z && (ge = he ? {
          x: Math.round(ge.x + he.x),
          y: Math.round(ge.y + he.y)
        } : Ko(ge, C));
        let ze = null;
        if (ee && I && !W.extent && se) {
          const { positionAbsolute: xe } = W.internals, Re = xe.x - se.x + I[0][0], Ye = xe.x + W.measured.width - se.x2 + I[1][0], ft = xe.y - se.y + I[0][1], Te = xe.y + W.measured.height - se.y2 + I[1][1];
          ze = [
            [Re, ft],
            [Ye, Te]
          ];
        }
        const { position: Ce, positionAbsolute: Se } = q1({
          nodeId: me,
          nextPosition: ge,
          nodeLookup: j,
          nodeExtent: ze || I,
          nodeOrigin: Y,
          onError: A
        });
        F = F || W.position.x !== Ce.x || W.position.y !== Ce.y, W.position = Ce, W.internals.positionAbsolute = Se;
      }
      if (w = w || F, !!F && (k(h, !0), R && (l || X || !H && te))) {
        const [me, W] = jd({
          nodeId: H,
          dragItems: h,
          nodeLookup: j
        });
        l?.(R, h, me, W), X?.(R, me, W), H || te?.(R, W);
      }
    }
    async function G() {
      if (!y)
        return;
      const { transform: K, panBy: re, autoPanSpeed: j, autoPanOnNodeDrag: I } = a();
      if (!I) {
        g = !1, cancelAnimationFrame(c);
        return;
      }
      const [C, z] = Jh(m, y, j);
      (C !== 0 || z !== 0) && (u.x = (u.x ?? 0) - C / K[2], u.y = (u.y ?? 0) - z / K[2], await re({ x: C, y: z }) && D(u)), c = requestAnimationFrame(G);
    }
    function le(K) {
      const { nodeLookup: re, multiSelectionActive: j, nodesDraggable: I, transform: C, snapGrid: z, snapToGrid: Y, selectNodesOnDrag: X, onNodeDragStart: te, onSelectionDragStart: A, unselectNodesAndEdges: k } = a();
      p = !0, (!X || !B) && !j && H && (re.get(H)?.selected || k()), B && X && H && t?.(H);
      const F = To(K.sourceEvent, { transform: C, snapGrid: z, snapToGrid: Y, containerBounds: y });
      if (u = F, h = sM(re, I, F, H), h.size > 0 && (r || te || !H && A)) {
        const [ee, se] = jd({
          nodeId: H,
          dragItems: h,
          nodeLookup: re
        });
        r?.(K.sourceEvent, h, ee, se), te?.(K.sourceEvent, ee, se), H || A?.(K.sourceEvent, se);
      }
    }
    const $ = x1().clickDistance(V).on("start", (K) => {
      const { domNode: re, nodeDragThreshold: j, transform: I, snapGrid: C, snapToGrid: z } = a();
      y = re?.getBoundingClientRect() || null, b = !1, w = !1, R = K.sourceEvent, j === 0 && le(K), u = To(K.sourceEvent, { transform: I, snapGrid: C, snapToGrid: z, containerBounds: y }), m = ga(K.sourceEvent, y);
    }).on("drag", (K) => {
      const { autoPanOnNodeDrag: re, transform: j, snapGrid: I, snapToGrid: C, nodeDragThreshold: z, nodeLookup: Y } = a(), X = To(K.sourceEvent, { transform: j, snapGrid: I, snapToGrid: C, containerBounds: y });
      if (R = K.sourceEvent, (K.sourceEvent.type === "touchmove" && K.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      H && !Y.has(H)) && (b = !0), !b) {
        if (!g && re && p && (g = !0, G()), !p) {
          const te = ga(K.sourceEvent, y), A = te.x - m.x, k = te.y - m.y;
          Math.sqrt(A * A + k * k) > z && le(K);
        }
        (u.x !== X.xSnapped || u.y !== X.ySnapped) && h && p && (m = ga(K.sourceEvent, y), D(X));
      }
    }).on("end", (K) => {
      if (!p || b) {
        b && h.size > 0 && a().updateNodePositions(h, !1);
        return;
      }
      if (g = !1, p = !1, cancelAnimationFrame(c), h.size > 0) {
        const { nodeLookup: re, updateNodePositions: j, onNodeDragStop: I, onSelectionDragStop: C } = a();
        if (w && (j(h, !1), w = !1), s || I || !H && C) {
          const [z, Y] = jd({
            nodeId: H,
            dragItems: h,
            nodeLookup: re,
            dragging: !1
          });
          s?.(K.sourceEvent, h, z, Y), I?.(K.sourceEvent, z, Y), H || C?.(K.sourceEvent, Y);
        }
      }
    }).filter((K) => {
      const re = K.target;
      return !K.button && (!O || !sv(re, `.${O}`, L)) && (!E || sv(re, E, L));
    });
    v.call($);
  }
  function _() {
    v?.on(".drag", null);
  }
  return {
    update: T,
    destroy: _
  };
}
function fM(t, a, r) {
  const l = [], s = {
    x: t.x - r,
    y: t.y - r,
    width: r * 2,
    height: r * 2
  };
  for (const u of a.values())
    Bo(s, xl(u)) > 0 && l.push(u);
  return l;
}
const dM = 250;
function hM(t, a, r, l) {
  let s = [], u = 1 / 0;
  const c = fM(t, r, a + dM);
  for (const h of c) {
    const g = [...h.internals.handleBounds?.source ?? [], ...h.internals.handleBounds?.target ?? []];
    for (const m of g) {
      if (l.nodeId === m.nodeId && l.type === m.type && l.id === m.id)
        continue;
      const { x: y, y: p } = Er(h, m, m.position, !0), v = Math.sqrt(Math.pow(y - t.x, 2) + Math.pow(p - t.y, 2));
      v > a || (v < u ? (s = [{ ...m, x: y, y: p }], u = v) : v === u && s.push({ ...m, x: y, y: p }));
    }
  }
  if (!s.length)
    return null;
  if (s.length > 1) {
    const h = l.type === "source" ? "target" : "source";
    return s.find((g) => g.type === h) ?? s[0];
  }
  return s[0];
}
function ix(t, a, r, l, s, u = !1) {
  const c = l.get(t);
  if (!c)
    return null;
  const h = s === "strict" ? c.internals.handleBounds?.[a] : [...c.internals.handleBounds?.source ?? [], ...c.internals.handleBounds?.target ?? []], g = (r ? h?.find((m) => m.id === r) : h?.[0]) ?? null;
  return g && u ? { ...g, ...Er(c, g, g.position, !0) } : g;
}
function rx(t, a) {
  return t || (a?.classList.contains("target") ? "target" : a?.classList.contains("source") ? "source" : null);
}
function mM(t, a) {
  let r = null;
  return a ? r = !0 : t && !a && (r = !1), r;
}
const lx = () => !0;
function pM(t, { connectionMode: a, connectionRadius: r, handleId: l, nodeId: s, edgeUpdaterType: u, isTarget: c, domNode: h, nodeLookup: g, lib: m, autoPanOnConnect: y, flowId: p, panBy: v, cancelConnection: b, onConnectStart: w, onConnect: R, onConnectEnd: T, isValidConnection: _ = lx, onReconnectEnd: O, updateConnection: E, getTransform: L, getFromHandle: B, autoPanSpeed: H, dragThreshold: V = 1, handleDomNode: D }) {
  const G = Z1(t.target);
  let le = 0, $;
  const { x: K, y: re } = ga(t), j = rx(u, D), I = h?.getBoundingClientRect();
  let C = !1;
  if (!I || !j)
    return;
  const z = ix(s, j, l, g, a);
  if (!z)
    return;
  let Y = ga(t, I), X = !1, te = null, A = !1, k = null;
  function F() {
    if (!y || !I)
      return;
    const [Ce, Se] = Jh(Y, I, H);
    v({ x: Ce, y: Se }), le = requestAnimationFrame(F);
  }
  const ee = {
    ...z,
    nodeId: s,
    type: j,
    position: z.position
  }, se = g.get(s);
  let me = {
    inProgress: !0,
    isValid: null,
    from: Er(se, ee, Ae.Left, !0),
    fromHandle: ee,
    fromPosition: ee.position,
    fromNode: se,
    to: Y,
    toHandle: null,
    toPosition: Ky[ee.position],
    toNode: null,
    pointer: Y
  };
  function W() {
    C = !0, E(me), w?.(t, { nodeId: s, handleId: l, handleType: j });
  }
  V === 0 && W();
  function ge(Ce) {
    if (!C) {
      const { x: Te, y: Ie } = ga(Ce), Be = Te - K, $e = Ie - re;
      if (!(Be * Be + $e * $e > V * V))
        return;
      W();
    }
    if (!B() || !ee) {
      ze(Ce);
      return;
    }
    const Se = L();
    Y = ga(Ce, I), $ = hM(_l(Y, Se, !1, [1, 1]), r, g, ee), X || (F(), X = !0);
    const xe = ox(Ce, {
      handle: $,
      connectionMode: a,
      fromNodeId: s,
      fromHandleId: l,
      fromType: c ? "target" : "source",
      isValidConnection: _,
      doc: G,
      lib: m,
      flowId: p,
      nodeLookup: g
    });
    k = xe.handleDomNode, te = xe.connection, A = mM(!!$, xe.isValid);
    const Re = g.get(s), Ye = Re ? Er(Re, ee, Ae.Left, !0) : me.from, ft = {
      ...me,
      from: Ye,
      isValid: A,
      to: xe.toHandle && A ? wl({ x: xe.toHandle.x, y: xe.toHandle.y }, Se) : Y,
      toHandle: xe.toHandle,
      toPosition: A && xe.toHandle ? xe.toHandle.position : Ky[ee.position],
      toNode: xe.toHandle ? g.get(xe.toHandle.nodeId) : null,
      pointer: Y
    };
    E(ft), me = ft;
  }
  function ze(Ce) {
    if (!("touches" in Ce && Ce.touches.length > 0)) {
      if (C) {
        ($ || k) && te && A && R?.(te);
        const { inProgress: Se, ...xe } = me, Re = {
          ...xe,
          toPosition: me.toHandle ? me.toPosition : null
        };
        T?.(Ce, Re), u && O?.(Ce, Re);
      }
      b(), cancelAnimationFrame(le), X = !1, A = !1, te = null, k = null, G.removeEventListener("mousemove", ge), G.removeEventListener("mouseup", ze), G.removeEventListener("touchmove", ge), G.removeEventListener("touchend", ze);
    }
  }
  G.addEventListener("mousemove", ge), G.addEventListener("mouseup", ze), G.addEventListener("touchmove", ge), G.addEventListener("touchend", ze);
}
function ox(t, { handle: a, connectionMode: r, fromNodeId: l, fromHandleId: s, fromType: u, doc: c, lib: h, flowId: g, isValidConnection: m = lx, nodeLookup: y }) {
  const p = u === "target", v = a ? c.querySelector(`.${h}-flow__handle[data-id="${g}-${a?.nodeId}-${a?.id}-${a?.type}"]`) : null, { x: b, y: w } = ga(t), R = c.elementFromPoint(b, w), T = R?.classList.contains(`${h}-flow__handle`) ? R : v, _ = {
    handleDomNode: T,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (T) {
    const O = rx(void 0, T), E = T.getAttribute("data-nodeid"), L = T.getAttribute("data-handleid"), B = T.classList.contains("connectable"), H = T.classList.contains("connectableend");
    if (!E || !O)
      return _;
    const V = {
      source: p ? E : l,
      sourceHandle: p ? L : s,
      target: p ? l : E,
      targetHandle: p ? s : L
    };
    _.connection = V;
    const G = B && H && (r === vl.Strict ? p && O === "source" || !p && O === "target" : E !== l || L !== s);
    _.isValid = G && m(V), _.toHandle = ix(E, O, L, y, r, !0);
  }
  return _;
}
const hh = {
  onPointerDown: pM,
  isValid: ox
};
function gM({ domNode: t, panZoom: a, getTransform: r, getViewScale: l }) {
  const s = Vn(t);
  function u({ translateExtent: h, width: g, height: m, zoomStep: y = 1, pannable: p = !0, zoomable: v = !0, inversePan: b = !1 }) {
    const w = (E) => {
      if (E.sourceEvent.type !== "wheel" || !a)
        return;
      const L = r(), B = E.sourceEvent.ctrlKey && Uo() ? 10 : 1, H = -E.sourceEvent.deltaY * (E.sourceEvent.deltaMode === 1 ? 0.05 : E.sourceEvent.deltaMode ? 1 : 2e-3) * y, V = L[2] * Math.pow(2, H * B);
      a.scaleTo(V);
    };
    let R = [0, 0];
    const T = (E) => {
      (E.sourceEvent.type === "mousedown" || E.sourceEvent.type === "touchstart") && (R = [
        E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
        E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY
      ]);
    }, _ = (E) => {
      const L = r();
      if (E.sourceEvent.type !== "mousemove" && E.sourceEvent.type !== "touchmove" || !a)
        return;
      const B = [
        E.sourceEvent.clientX ?? E.sourceEvent.touches[0].clientX,
        E.sourceEvent.clientY ?? E.sourceEvent.touches[0].clientY
      ], H = [B[0] - R[0], B[1] - R[1]];
      R = B;
      const V = l() * Math.max(L[2], Math.log(L[2])) * (b ? -1 : 1), D = {
        x: L[0] - H[0] * V,
        y: L[1] - H[1] * V
      }, G = [
        [0, 0],
        [g, m]
      ];
      a.setViewportConstrained({
        x: D.x,
        y: D.y,
        zoom: L[2]
      }, G, h);
    }, O = j1().on("start", T).on("zoom", p ? _ : null).on("zoom.wheel", v ? w : null);
    s.call(O, {});
  }
  function c() {
    s.on("zoom", null);
  }
  return {
    update: u,
    destroy: c,
    pointer: ha
  };
}
const cc = (t) => ({
  x: t.x,
  y: t.y,
  zoom: t.k
}), Hd = ({ x: t, y: a, zoom: r }) => oc.translate(t, a).scale(r), cl = (t, a) => t.target.closest(`.${a}`), sx = (t, a) => a === 2 && Array.isArray(t) && t.includes(2), yM = (t) => ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2, Bd = (t, a = 0, r = yM, l = () => {
}) => {
  const s = typeof a == "number" && a > 0;
  return s || l(), s ? t.transition().duration(a).ease(r).on("end", l) : t;
}, ux = (t) => {
  const a = t.ctrlKey && Uo() ? 10 : 1;
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * a;
};
function vM({ zoomPanValues: t, noWheelClassName: a, d3Selection: r, d3Zoom: l, panOnScrollMode: s, panOnScrollSpeed: u, zoomOnPinch: c, onPanZoomStart: h, onPanZoom: g, onPanZoomEnd: m }) {
  return (y) => {
    if (cl(y, a))
      return y.ctrlKey && y.preventDefault(), !1;
    y.preventDefault(), y.stopImmediatePropagation();
    const p = r.property("__zoom").k || 1;
    if (y.ctrlKey && c) {
      const T = ha(y), _ = ux(y), O = p * Math.pow(2, _);
      l.scaleTo(r, O, T, y);
      return;
    }
    const v = y.deltaMode === 1 ? 20 : 1;
    let b = s === vr.Vertical ? 0 : y.deltaX * v, w = s === vr.Horizontal ? 0 : y.deltaY * v;
    !Uo() && y.shiftKey && s !== vr.Vertical && (b = y.deltaY * v, w = 0), l.translateBy(
      r,
      -(b / p) * u,
      -(w / p) * u,
      // @ts-ignore
      { internal: !0 }
    );
    const R = cc(r.property("__zoom"));
    clearTimeout(t.panScrollTimeout), t.isPanScrolling ? (g?.(y, R), t.panScrollTimeout = setTimeout(() => {
      m?.(y, R), t.isPanScrolling = !1;
    }, 150)) : (t.isPanScrolling = !0, h?.(y, R));
  };
}
function bM({ noWheelClassName: t, preventScrolling: a, d3ZoomHandler: r }) {
  return function(l, s) {
    const u = l.type === "wheel", c = !a && u && !l.ctrlKey, h = cl(l, t);
    if (l.ctrlKey && u && h && l.preventDefault(), c || h)
      return null;
    l.preventDefault(), r.call(this, l, s);
  };
}
function xM({ zoomPanValues: t, onDraggingChange: a, onPanZoomStart: r }) {
  return (l) => {
    if (l.sourceEvent?.internal)
      return;
    const s = cc(l.transform);
    t.mouseButton = l.sourceEvent?.button || 0, t.isZoomingOrPanning = !0, t.prevViewport = s, l.sourceEvent?.type === "mousedown" && a(!0), r && r?.(l.sourceEvent, s);
  };
}
function wM({ zoomPanValues: t, panOnDrag: a, onPaneContextMenu: r, onTransformChange: l, onPanZoom: s }) {
  return (u) => {
    t.usedRightMouseButton = !!(r && sx(a, t.mouseButton ?? 0)), u.sourceEvent?.sync || l([u.transform.x, u.transform.y, u.transform.k]), s && !u.sourceEvent?.internal && s?.(u.sourceEvent, cc(u.transform));
  };
}
function SM({ zoomPanValues: t, panOnDrag: a, panOnScroll: r, onDraggingChange: l, onPanZoomEnd: s, onPaneContextMenu: u }) {
  return (c) => {
    if (!c.sourceEvent?.internal && (t.isZoomingOrPanning = !1, u && sx(a, t.mouseButton ?? 0) && !t.usedRightMouseButton && c.sourceEvent && u(c.sourceEvent), t.usedRightMouseButton = !1, l(!1), s)) {
      const h = cc(c.transform);
      t.prevViewport = h, clearTimeout(t.timerId), t.timerId = setTimeout(
        () => {
          s?.(c.sourceEvent, h);
        },
        // we need a setTimeout for panOnScroll to suppress multiple end events fired during scroll
        r ? 150 : 0
      );
    }
  };
}
function EM({ zoomActivationKeyPressed: t, zoomOnScroll: a, zoomOnPinch: r, panOnDrag: l, panOnScroll: s, zoomOnDoubleClick: u, userSelectionActive: c, noWheelClassName: h, noPanClassName: g, lib: m, connectionInProgress: y }) {
  return (p) => {
    const v = t || a, b = r && p.ctrlKey, w = p.type === "wheel";
    if (p.button === 1 && p.type === "mousedown" && (cl(p, `${m}-flow__node`) || cl(p, `${m}-flow__edge`)))
      return !0;
    if (!l && !v && !s && !u && !r || c || y && !w || cl(p, h) && w || cl(p, g) && (!w || s && w && !t) || !r && p.ctrlKey && w)
      return !1;
    if (!r && p.type === "touchstart" && p.touches?.length > 1)
      return p.preventDefault(), !1;
    if (!v && !s && !b && w || !l && (p.type === "mousedown" || p.type === "touchstart") || Array.isArray(l) && !l.includes(p.button) && p.type === "mousedown")
      return !1;
    const R = Array.isArray(l) && l.includes(p.button) || !p.button || p.button <= 1;
    return (!p.ctrlKey || w) && R;
  };
}
function _M({ domNode: t, minZoom: a, maxZoom: r, translateExtent: l, viewport: s, onPanZoom: u, onPanZoomStart: c, onPanZoomEnd: h, onDraggingChange: g }) {
  const m = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, y = t.getBoundingClientRect(), p = j1().scaleExtent([a, r]).translateExtent(l), v = Vn(t).call(p);
  O({
    x: s.x,
    y: s.y,
    zoom: bl(s.zoom, a, r)
  }, [
    [0, 0],
    [y.width, y.height]
  ], l);
  const b = v.on("wheel.zoom"), w = v.on("dblclick.zoom");
  p.wheelDelta(ux);
  async function R($, K) {
    return v ? new Promise((re) => {
      p?.interpolate(K?.interpolate === "linear" ? Co : zu).transform(Bd(v, K?.duration, K?.ease, () => re(!0)), $);
    }) : !1;
  }
  function T({ noWheelClassName: $, noPanClassName: K, onPaneContextMenu: re, userSelectionActive: j, panOnScroll: I, panOnDrag: C, panOnScrollMode: z, panOnScrollSpeed: Y, preventScrolling: X, zoomOnPinch: te, zoomOnScroll: A, zoomOnDoubleClick: k, zoomActivationKeyPressed: F, lib: ee, onTransformChange: se, connectionInProgress: he, paneClickDistance: me, selectionOnDrag: W }) {
    j && !m.isZoomingOrPanning && _();
    const ge = I && !F && !j;
    p.clickDistance(W ? 1 / 0 : !pa(me) || me < 0 ? 0 : me);
    const ze = ge ? vM({
      zoomPanValues: m,
      noWheelClassName: $,
      d3Selection: v,
      d3Zoom: p,
      panOnScrollMode: z,
      panOnScrollSpeed: Y,
      zoomOnPinch: te,
      onPanZoomStart: c,
      onPanZoom: u,
      onPanZoomEnd: h
    }) : bM({
      noWheelClassName: $,
      preventScrolling: X,
      d3ZoomHandler: b
    });
    v.on("wheel.zoom", ze, { passive: !1 });
    const Ce = xM({
      zoomPanValues: m,
      onDraggingChange: g,
      onPanZoomStart: c
    });
    p.on("start", Ce);
    const Se = wM({
      zoomPanValues: m,
      panOnDrag: C,
      onPaneContextMenu: !!re,
      onPanZoom: u,
      onTransformChange: se
    });
    p.on("zoom", Se);
    const xe = SM({
      zoomPanValues: m,
      panOnDrag: C,
      panOnScroll: I,
      onPaneContextMenu: re,
      onPanZoomEnd: h,
      onDraggingChange: g
    });
    p.on("end", xe);
    const Re = EM({
      zoomActivationKeyPressed: F,
      panOnDrag: C,
      zoomOnScroll: A,
      panOnScroll: I,
      zoomOnDoubleClick: k,
      zoomOnPinch: te,
      userSelectionActive: j,
      noPanClassName: K,
      noWheelClassName: $,
      lib: ee,
      connectionInProgress: he
    });
    p.filter(Re), k ? v.on("dblclick.zoom", w) : v.on("dblclick.zoom", null);
  }
  function _() {
    p.on("zoom", null);
  }
  async function O($, K, re) {
    const j = Hd($), I = p?.constrain()(j, K, re);
    return I && await R(I), I;
  }
  async function E($, K) {
    const re = Hd($);
    return await R(re, K), re;
  }
  function L($) {
    if (v) {
      const K = Hd($), re = v.property("__zoom");
      (re.k !== $.zoom || re.x !== $.x || re.y !== $.y) && p?.transform(v, K, null, { sync: !0 });
    }
  }
  function B() {
    const $ = v ? L1(v.node()) : { x: 0, y: 0, k: 1 };
    return { x: $.x, y: $.y, zoom: $.k };
  }
  async function H($, K) {
    return v ? new Promise((re) => {
      p?.interpolate(K?.interpolate === "linear" ? Co : zu).scaleTo(Bd(v, K?.duration, K?.ease, () => re(!0)), $);
    }) : !1;
  }
  async function V($, K) {
    return v ? new Promise((re) => {
      p?.interpolate(K?.interpolate === "linear" ? Co : zu).scaleBy(Bd(v, K?.duration, K?.ease, () => re(!0)), $);
    }) : !1;
  }
  function D($) {
    p?.scaleExtent($);
  }
  function G($) {
    p?.translateExtent($);
  }
  function le($) {
    const K = !pa($) || $ < 0 ? 0 : $;
    p?.clickDistance(K);
  }
  return {
    update: T,
    destroy: _,
    setViewport: E,
    setViewportConstrained: O,
    getViewport: B,
    scaleTo: H,
    scaleBy: V,
    setScaleExtent: D,
    setTranslateExtent: G,
    syncViewport: L,
    setClickDistance: le
  };
}
var Sl;
(function(t) {
  t.Line = "line", t.Handle = "handle";
})(Sl || (Sl = {}));
function NM({ width: t, prevWidth: a, height: r, prevHeight: l, affectsX: s, affectsY: u }) {
  const c = t - a, h = r - l, g = [c > 0 ? 1 : c < 0 ? -1 : 0, h > 0 ? 1 : h < 0 ? -1 : 0];
  return c && s && (g[0] = g[0] * -1), h && u && (g[1] = g[1] * -1), g;
}
function uv(t) {
  const a = t.includes("right") || t.includes("left"), r = t.includes("bottom") || t.includes("top"), l = t.includes("left"), s = t.includes("top");
  return {
    isHorizontal: a,
    isVertical: r,
    affectsX: l,
    affectsY: s
  };
}
function Ui(t, a) {
  return Math.max(0, a - t);
}
function ki(t, a) {
  return Math.max(0, t - a);
}
function gu(t, a, r) {
  return Math.max(0, a - t, t - r);
}
function cv(t, a) {
  return t ? !a : a;
}
function RM(t, a, r, l, s, u, c, h) {
  let { affectsX: g, affectsY: m } = a;
  const { isHorizontal: y, isVertical: p } = a, v = y && p, { xSnapped: b, ySnapped: w } = r, { minWidth: R, maxWidth: T, minHeight: _, maxHeight: O } = l, { x: E, y: L, width: B, height: H, aspectRatio: V } = t;
  let D = Math.floor(y ? b - t.pointerX : 0), G = Math.floor(p ? w - t.pointerY : 0);
  const le = B + (g ? -D : D), $ = H + (m ? -G : G), K = -u[0] * B, re = -u[1] * H;
  let j = gu(le, R, T), I = gu($, _, O);
  if (c) {
    let Y = 0, X = 0;
    g && D < 0 ? Y = Ui(E + D + K, c[0][0]) : !g && D > 0 && (Y = ki(E + le + K, c[1][0])), m && G < 0 ? X = Ui(L + G + re, c[0][1]) : !m && G > 0 && (X = ki(L + $ + re, c[1][1])), j = Math.max(j, Y), I = Math.max(I, X);
  }
  if (h) {
    let Y = 0, X = 0;
    g && D > 0 ? Y = ki(E + D, h[0][0]) : !g && D < 0 && (Y = Ui(E + le, h[1][0])), m && G > 0 ? X = ki(L + G, h[0][1]) : !m && G < 0 && (X = Ui(L + $, h[1][1])), j = Math.max(j, Y), I = Math.max(I, X);
  }
  if (s) {
    if (y) {
      const Y = gu(le / V, _, O) * V;
      if (j = Math.max(j, Y), c) {
        let X = 0;
        !g && !m || g && !m && v ? X = ki(L + re + le / V, c[1][1]) * V : X = Ui(L + re + (g ? D : -D) / V, c[0][1]) * V, j = Math.max(j, X);
      }
      if (h) {
        let X = 0;
        !g && !m || g && !m && v ? X = Ui(L + le / V, h[1][1]) * V : X = ki(L + (g ? D : -D) / V, h[0][1]) * V, j = Math.max(j, X);
      }
    }
    if (p) {
      const Y = gu($ * V, R, T) / V;
      if (I = Math.max(I, Y), c) {
        let X = 0;
        !g && !m || m && !g && v ? X = ki(E + $ * V + K, c[1][0]) / V : X = Ui(E + (m ? G : -G) * V + K, c[0][0]) / V, I = Math.max(I, X);
      }
      if (h) {
        let X = 0;
        !g && !m || m && !g && v ? X = Ui(E + $ * V, h[1][0]) / V : X = ki(E + (m ? G : -G) * V, h[0][0]) / V, I = Math.max(I, X);
      }
    }
  }
  G = G + (G < 0 ? I : -I), D = D + (D < 0 ? j : -j), s && (v ? le > $ * V ? G = (cv(g, m) ? -D : D) / V : D = (cv(g, m) ? -G : G) * V : y ? (G = D / V, m = g) : (D = G * V, g = m));
  const C = g ? E + D : E, z = m ? L + G : L;
  return {
    width: B + (g ? -D : D),
    height: H + (m ? -G : G),
    x: u[0] * D * (g ? -1 : 1) + C,
    y: u[1] * G * (m ? -1 : 1) + z
  };
}
const cx = { width: 0, height: 0, x: 0, y: 0 }, CM = {
  ...cx,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function TM(t, a, r) {
  const l = a.position.x + t.position.x, s = a.position.y + t.position.y, u = t.measured.width ?? 0, c = t.measured.height ?? 0, h = r[0] * u, g = r[1] * c;
  return [
    [l - h, s - g],
    [l + u - h, s + c - g]
  ];
}
function MM({ domNode: t, nodeId: a, getStoreItems: r, onChange: l, onEnd: s }) {
  const u = Vn(t);
  let c = {
    controlDirection: uv("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function h({ controlPosition: m, boundaries: y, keepAspectRatio: p, resizeDirection: v, onResizeStart: b, onResize: w, onResizeEnd: R, shouldResize: T }) {
    let _ = { ...cx }, O = { ...CM };
    c = {
      boundaries: y,
      resizeDirection: v,
      keepAspectRatio: p,
      controlDirection: uv(m)
    };
    let E, L = null, B = [], H, V, D, G = !1;
    const le = x1().on("start", ($) => {
      const { nodeLookup: K, transform: re, snapGrid: j, snapToGrid: I, nodeOrigin: C, paneDomNode: z } = r();
      if (E = K.get(a), !E)
        return;
      L = z?.getBoundingClientRect() ?? null;
      const { xSnapped: Y, ySnapped: X } = To($.sourceEvent, {
        transform: re,
        snapGrid: j,
        snapToGrid: I,
        containerBounds: L
      });
      _ = {
        width: E.measured.width ?? 0,
        height: E.measured.height ?? 0,
        x: E.position.x ?? 0,
        y: E.position.y ?? 0
      }, O = {
        ..._,
        pointerX: Y,
        pointerY: X,
        aspectRatio: _.width / _.height
      }, H = void 0, V = Sr(E.extent) ? E.extent : void 0, E.parentId && (E.extent === "parent" || E.expandParent) && (H = K.get(E.parentId)), H && E.extent === "parent" && (V = [
        [0, 0],
        [H.measured.width, H.measured.height]
      ]), B = [], D = void 0;
      for (const [te, A] of K)
        if (A.parentId === a && (B.push({
          id: te,
          position: { ...A.position },
          extent: A.extent
        }), A.extent === "parent" || A.expandParent)) {
          const k = TM(A, E, A.origin ?? C);
          D ? D = [
            [Math.min(k[0][0], D[0][0]), Math.min(k[0][1], D[0][1])],
            [Math.max(k[1][0], D[1][0]), Math.max(k[1][1], D[1][1])]
          ] : D = k;
        }
      b?.($, { ..._ });
    }).on("drag", ($) => {
      const { transform: K, snapGrid: re, snapToGrid: j, nodeOrigin: I } = r(), C = To($.sourceEvent, {
        transform: K,
        snapGrid: re,
        snapToGrid: j,
        containerBounds: L
      }), z = [];
      if (!E)
        return;
      const { x: Y, y: X, width: te, height: A } = _, k = {}, F = E.origin ?? I, { width: ee, height: se, x: he, y: me } = RM(O, c.controlDirection, C, c.boundaries, c.keepAspectRatio, F, V, D), W = ee !== te, ge = se !== A, ze = he !== Y && W, Ce = me !== X && ge;
      if (!ze && !Ce && !W && !ge)
        return;
      if ((ze || Ce || F[0] === 1 || F[1] === 1) && (k.x = ze ? he : _.x, k.y = Ce ? me : _.y, _.x = k.x, _.y = k.y, B.length > 0)) {
        const Ye = he - Y, ft = me - X;
        for (const Te of B)
          Te.position = {
            x: Te.position.x - Ye + F[0] * (ee - te),
            y: Te.position.y - ft + F[1] * (se - A)
          }, z.push(Te);
      }
      if ((W || ge) && (k.width = W && (!c.resizeDirection || c.resizeDirection === "horizontal") ? ee : _.width, k.height = ge && (!c.resizeDirection || c.resizeDirection === "vertical") ? se : _.height, _.width = k.width, _.height = k.height), H && E.expandParent) {
        const Ye = F[0] * (k.width ?? 0);
        k.x && k.x < Ye && (_.x = Ye, O.x = O.x - (k.x - Ye));
        const ft = F[1] * (k.height ?? 0);
        k.y && k.y < ft && (_.y = ft, O.y = O.y - (k.y - ft));
      }
      const Se = NM({
        width: _.width,
        prevWidth: te,
        height: _.height,
        prevHeight: A,
        affectsX: c.controlDirection.affectsX,
        affectsY: c.controlDirection.affectsY
      }), xe = { ..._, direction: Se };
      T?.($, xe) !== !1 && (G = !0, w?.($, xe), l(k, z));
    }).on("end", ($) => {
      G && (R?.($, { ..._ }), s?.({ ..._ }), G = !1);
    });
    u.call(le);
  }
  function g() {
    u.on(".drag", null);
  }
  return {
    update: h,
    destroy: g
  };
}
var Ud = { exports: {} }, kd = {}, Vd = { exports: {} }, qd = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fv;
function DM() {
  if (fv) return qd;
  fv = 1;
  var t = qo();
  function a(p, v) {
    return p === v && (p !== 0 || 1 / p === 1 / v) || p !== p && v !== v;
  }
  var r = typeof Object.is == "function" ? Object.is : a, l = t.useState, s = t.useEffect, u = t.useLayoutEffect, c = t.useDebugValue;
  function h(p, v) {
    var b = v(), w = l({ inst: { value: b, getSnapshot: v } }), R = w[0].inst, T = w[1];
    return u(
      function() {
        R.value = b, R.getSnapshot = v, g(R) && T({ inst: R });
      },
      [p, b, v]
    ), s(
      function() {
        return g(R) && T({ inst: R }), p(function() {
          g(R) && T({ inst: R });
        });
      },
      [p]
    ), c(b), b;
  }
  function g(p) {
    var v = p.getSnapshot;
    p = p.value;
    try {
      var b = v();
      return !r(p, b);
    } catch {
      return !0;
    }
  }
  function m(p, v) {
    return v();
  }
  var y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? m : h;
  return qd.useSyncExternalStore = t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : y, qd;
}
var dv;
function fx() {
  return dv || (dv = 1, Vd.exports = DM()), Vd.exports;
}
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hv;
function AM() {
  if (hv) return kd;
  hv = 1;
  var t = qo(), a = fx();
  function r(m, y) {
    return m === y && (m !== 0 || 1 / m === 1 / y) || m !== m && y !== y;
  }
  var l = typeof Object.is == "function" ? Object.is : r, s = a.useSyncExternalStore, u = t.useRef, c = t.useEffect, h = t.useMemo, g = t.useDebugValue;
  return kd.useSyncExternalStoreWithSelector = function(m, y, p, v, b) {
    var w = u(null);
    if (w.current === null) {
      var R = { hasValue: !1, value: null };
      w.current = R;
    } else R = w.current;
    w = h(
      function() {
        function _(H) {
          if (!O) {
            if (O = !0, E = H, H = v(H), b !== void 0 && R.hasValue) {
              var V = R.value;
              if (b(V, H))
                return L = V;
            }
            return L = H;
          }
          if (V = L, l(E, H)) return V;
          var D = v(H);
          return b !== void 0 && b(V, D) ? (E = H, V) : (E = H, L = D);
        }
        var O = !1, E, L, B = p === void 0 ? null : p;
        return [
          function() {
            return _(y());
          },
          B === null ? void 0 : function() {
            return _(B());
          }
        ];
      },
      [y, p, v, b]
    );
    var T = s(m, w[0], w[1]);
    return c(
      function() {
        R.hasValue = !0, R.value = T;
      },
      [T]
    ), g(T), T;
  }, kd;
}
var mv;
function zM() {
  return mv || (mv = 1, Ud.exports = AM()), Ud.exports;
}
var OM = zM();
const LM = /* @__PURE__ */ Mh(OM), jM = {}, pv = (t) => {
  let a;
  const r = /* @__PURE__ */ new Set(), l = (y, p) => {
    const v = typeof y == "function" ? y(a) : y;
    if (!Object.is(v, a)) {
      const b = a;
      a = p ?? (typeof v != "object" || v === null) ? v : Object.assign({}, a, v), r.forEach((w) => w(a, b));
    }
  }, s = () => a, g = { setState: l, getState: s, getInitialState: () => m, subscribe: (y) => (r.add(y), () => r.delete(y)), destroy: () => {
    (jM ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), r.clear();
  } }, m = a = t(l, s, g);
  return g;
}, HM = (t) => t ? pv(t) : pv, { useDebugValue: BM } = ye, { useSyncExternalStoreWithSelector: UM } = LM, kM = (t) => t;
function dx(t, a = kM, r) {
  const l = UM(
    t.subscribe,
    t.getState,
    t.getServerState || t.getInitialState,
    a,
    r
  );
  return BM(l), l;
}
const gv = (t, a) => {
  const r = HM(t), l = (s, u = a) => dx(r, s, u);
  return Object.assign(l, r), l;
}, VM = (t, a) => t ? gv(t, a) : gv;
function At(t, a) {
  if (Object.is(t, a))
    return !0;
  if (typeof t != "object" || t === null || typeof a != "object" || a === null)
    return !1;
  if (t instanceof Map && a instanceof Map) {
    if (t.size !== a.size) return !1;
    for (const [l, s] of t)
      if (!Object.is(s, a.get(l)))
        return !1;
    return !0;
  }
  if (t instanceof Set && a instanceof Set) {
    if (t.size !== a.size) return !1;
    for (const l of t)
      if (!a.has(l))
        return !1;
    return !0;
  }
  const r = Object.keys(t);
  if (r.length !== Object.keys(a).length)
    return !1;
  for (const l of r)
    if (!Object.prototype.hasOwnProperty.call(a, l) || !Object.is(t[l], a[l]))
      return !1;
  return !0;
}
var qM = wb();
const YM = /* @__PURE__ */ Mh(qM), fc = N.createContext(null), $M = fc.Provider, hx = ya.error001("react");
function lt(t, a) {
  const r = N.useContext(fc);
  if (r === null)
    throw new Error(hx);
  return dx(r, t, a);
}
function zt() {
  const t = N.useContext(fc);
  if (t === null)
    throw new Error(hx);
  return N.useMemo(() => ({
    getState: t.getState,
    setState: t.setState,
    subscribe: t.subscribe
  }), [t]);
}
const yv = { display: "none" }, XM = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, mx = "react-flow__node-desc", px = "react-flow__edge-desc", GM = "react-flow__aria-live", IM = (t) => t.ariaLiveMessage, ZM = (t) => t.ariaLabelConfig;
function QM({ rfId: t }) {
  const a = lt(IM);
  return S.jsx("div", { id: `${GM}-${t}`, "aria-live": "assertive", "aria-atomic": "true", style: XM, children: a });
}
function FM({ rfId: t, disableKeyboardA11y: a }) {
  const r = lt(ZM);
  return S.jsxs(S.Fragment, { children: [S.jsx("div", { id: `${mx}-${t}`, style: yv, children: a ? r["node.a11yDescription.default"] : r["node.a11yDescription.keyboardDisabled"] }), S.jsx("div", { id: `${px}-${t}`, style: yv, children: r["edge.a11yDescription.default"] }), !a && S.jsx(QM, { rfId: t })] });
}
const dc = N.forwardRef(({ position: t = "top-left", children: a, className: r, style: l, ...s }, u) => {
  const c = `${t}`.split("-");
  return S.jsx("div", { className: Ft(["react-flow__panel", r, ...c]), style: l, ref: u, ...s, children: a });
});
dc.displayName = "Panel";
function KM({ proOptions: t, position: a = "bottom-right" }) {
  return t?.hideAttribution ? null : S.jsx(dc, { position: a, className: "react-flow__attribution", "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev", children: S.jsx("a", { href: "https://reactflow.dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const PM = (t) => {
  const a = [], r = [];
  for (const [, l] of t.nodeLookup)
    l.selected && a.push(l.internals.userNode);
  for (const [, l] of t.edgeLookup)
    l.selected && r.push(l);
  return { selectedNodes: a, selectedEdges: r };
}, yu = (t) => t.id;
function JM(t, a) {
  return At(t.selectedNodes.map(yu), a.selectedNodes.map(yu)) && At(t.selectedEdges.map(yu), a.selectedEdges.map(yu));
}
function WM({ onSelectionChange: t }) {
  const a = zt(), { selectedNodes: r, selectedEdges: l } = lt(PM, JM);
  return N.useEffect(() => {
    const s = { nodes: r, edges: l };
    t?.(s), a.getState().onSelectionChangeHandlers.forEach((u) => u(s));
  }, [r, l, t]), null;
}
const eD = (t) => !!t.onSelectionChangeHandlers;
function tD({ onSelectionChange: t }) {
  const a = lt(eD);
  return t || a ? S.jsx(WM, { onSelectionChange: t }) : null;
}
const gx = [0, 0], nD = { x: 0, y: 0, zoom: 1 }, aD = [
  "nodes",
  "edges",
  "defaultNodes",
  "defaultEdges",
  "onConnect",
  "onConnectStart",
  "onConnectEnd",
  "onClickConnectStart",
  "onClickConnectEnd",
  "nodesDraggable",
  "autoPanOnNodeFocus",
  "nodesConnectable",
  "nodesFocusable",
  "edgesFocusable",
  "edgesReconnectable",
  "elevateNodesOnSelect",
  "elevateEdgesOnSelect",
  "minZoom",
  "maxZoom",
  "nodeExtent",
  "onNodesChange",
  "onEdgesChange",
  "elementsSelectable",
  "connectionMode",
  "snapGrid",
  "snapToGrid",
  "translateExtent",
  "connectOnClick",
  "defaultEdgeOptions",
  "fitView",
  "fitViewOptions",
  "onNodesDelete",
  "onEdgesDelete",
  "onDelete",
  "onNodeDrag",
  "onNodeDragStart",
  "onNodeDragStop",
  "onSelectionDrag",
  "onSelectionDragStart",
  "onSelectionDragStop",
  "onMoveStart",
  "onMove",
  "onMoveEnd",
  "noPanClassName",
  "nodeOrigin",
  "autoPanOnConnect",
  "autoPanOnNodeDrag",
  "onError",
  "connectionRadius",
  "isValidConnection",
  "selectNodesOnDrag",
  "nodeDragThreshold",
  "connectionDragThreshold",
  "onBeforeDelete",
  "debug",
  "autoPanSpeed",
  "ariaLabelConfig",
  "zIndexMode"
], vv = [...aD, "rfId"], iD = (t) => ({
  setNodes: t.setNodes,
  setEdges: t.setEdges,
  setMinZoom: t.setMinZoom,
  setMaxZoom: t.setMaxZoom,
  setTranslateExtent: t.setTranslateExtent,
  setNodeExtent: t.setNodeExtent,
  reset: t.reset,
  setDefaultNodesAndEdges: t.setDefaultNodesAndEdges
}), bv = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: jo,
  nodeOrigin: gx,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function rD(t) {
  const { setNodes: a, setEdges: r, setMinZoom: l, setMaxZoom: s, setTranslateExtent: u, setNodeExtent: c, reset: h, setDefaultNodesAndEdges: g } = lt(iD, At), m = zt();
  N.useEffect(() => (g(t.defaultNodes, t.defaultEdges), () => {
    y.current = bv, h();
  }), []);
  const y = N.useRef(bv);
  return N.useEffect(
    () => {
      for (const p of vv) {
        const v = t[p], b = y.current[p];
        v !== b && (typeof t[p] > "u" || (p === "nodes" ? a(v) : p === "edges" ? r(v) : p === "minZoom" ? l(v) : p === "maxZoom" ? s(v) : p === "translateExtent" ? u(v) : p === "nodeExtent" ? c(v) : p === "ariaLabelConfig" ? m.setState({ ariaLabelConfig: YT(v) }) : p === "fitView" ? m.setState({ fitViewQueued: v }) : p === "fitViewOptions" ? m.setState({ fitViewOptions: v }) : m.setState({ [p]: v })));
      }
      y.current = t;
    },
    // Only re-run the effect if one of the fields we track changes
    vv.map((p) => t[p])
  ), null;
}
function xv() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function lD(t) {
  const [a, r] = N.useState(t === "system" ? null : t);
  return N.useEffect(() => {
    if (t !== "system") {
      r(t);
      return;
    }
    const l = xv(), s = () => r(l?.matches ? "dark" : "light");
    return s(), l?.addEventListener("change", s), () => {
      l?.removeEventListener("change", s);
    };
  }, [t]), a !== null ? a : xv()?.matches ? "dark" : "light";
}
const wv = typeof document < "u" ? document : null;
function ko(t = null, a = { target: wv, actInsideInputWithModifier: !0 }) {
  const [r, l] = N.useState(!1), s = N.useRef(!1), u = N.useRef(/* @__PURE__ */ new Set([])), [c, h] = N.useMemo(() => {
    if (t !== null) {
      const m = (Array.isArray(t) ? t : [t]).filter((p) => typeof p == "string").map((p) => p.replace("+", `
`).replace(`

`, `
+`).split(`
`)), y = m.reduce((p, v) => p.concat(...v), []);
      return [m, y];
    }
    return [[], []];
  }, [t]);
  return N.useEffect(() => {
    const g = a?.target ?? wv, m = a?.actInsideInputWithModifier ?? !0;
    if (t !== null) {
      const y = (b) => {
        if (s.current = b.ctrlKey || b.metaKey || b.shiftKey || b.altKey, (!s.current || s.current && !m) && Q1(b))
          return !1;
        const R = Ev(b.code, h);
        if (u.current.add(b[R]), Sv(c, u.current, !1)) {
          const T = b.composedPath?.()?.[0] || b.target, _ = T?.nodeName === "BUTTON" || T?.nodeName === "A";
          a.preventDefault !== !1 && (s.current || !_) && b.preventDefault(), l(!0);
        }
      }, p = (b) => {
        const w = Ev(b.code, h);
        Sv(c, u.current, !0) ? (l(!1), u.current.clear()) : u.current.delete(b[w]), b.key === "Meta" && u.current.clear(), s.current = !1;
      }, v = () => {
        u.current.clear(), l(!1);
      };
      return g?.addEventListener("keydown", y), g?.addEventListener("keyup", p), window.addEventListener("blur", v), window.addEventListener("contextmenu", v), () => {
        g?.removeEventListener("keydown", y), g?.removeEventListener("keyup", p), window.removeEventListener("blur", v), window.removeEventListener("contextmenu", v);
      };
    }
  }, [t, l]), r;
}
function Sv(t, a, r) {
  return t.filter((l) => r || l.length === a.size).some((l) => l.every((s) => a.has(s)));
}
function Ev(t, a) {
  return a.includes(t) ? "code" : "key";
}
const oD = () => {
  const t = zt();
  return N.useMemo(() => ({
    zoomIn: async (a) => {
      const { panZoom: r } = t.getState();
      return r ? r.scaleBy(1.2, a) : !1;
    },
    zoomOut: async (a) => {
      const { panZoom: r } = t.getState();
      return r ? r.scaleBy(1 / 1.2, a) : !1;
    },
    zoomTo: async (a, r) => {
      const { panZoom: l } = t.getState();
      return l ? l.scaleTo(a, r) : !1;
    },
    getZoom: () => t.getState().transform[2],
    setViewport: async (a, r) => {
      const { transform: [l, s, u], panZoom: c } = t.getState();
      return c ? (await c.setViewport({
        x: a.x ?? l,
        y: a.y ?? s,
        zoom: a.zoom ?? u
      }, r), !0) : !1;
    },
    getViewport: () => {
      const [a, r, l] = t.getState().transform;
      return { x: a, y: r, zoom: l };
    },
    setCenter: async (a, r, l) => t.getState().setCenter(a, r, l),
    fitBounds: async (a, r) => {
      const { width: l, height: s, minZoom: u, maxZoom: c, panZoom: h } = t.getState(), g = Wh(a, l, s, u, c, r?.padding ?? 0.1);
      return h ? (await h.setViewport(g, {
        duration: r?.duration,
        ease: r?.ease,
        interpolate: r?.interpolate
      }), !0) : !1;
    },
    screenToFlowPosition: (a, r = {}) => {
      const { transform: l, snapGrid: s, snapToGrid: u, domNode: c } = t.getState();
      if (!c)
        return a;
      const { x: h, y: g } = c.getBoundingClientRect(), m = {
        x: a.x - h,
        y: a.y - g
      }, y = r.snapGrid ?? s, p = r.snapToGrid ?? u;
      return _l(m, l, p, y);
    },
    flowToScreenPosition: (a) => {
      const { transform: r, domNode: l } = t.getState();
      if (!l)
        return a;
      const { x: s, y: u } = l.getBoundingClientRect(), c = wl(a, r);
      return {
        x: c.x + s,
        y: c.y + u
      };
    }
  }), []);
};
function yx(t, a) {
  const r = [], l = /* @__PURE__ */ new Map(), s = [];
  for (const u of t)
    if (u.type === "add") {
      s.push(u);
      continue;
    } else if (u.type === "remove" || u.type === "replace")
      l.set(u.id, [u]);
    else {
      const c = l.get(u.id);
      c ? c.push(u) : l.set(u.id, [u]);
    }
  for (const u of a) {
    const c = l.get(u.id);
    if (!c) {
      r.push(u);
      continue;
    }
    if (c[0].type === "remove")
      continue;
    if (c[0].type === "replace") {
      r.push({ ...c[0].item });
      continue;
    }
    const h = { ...u };
    for (const g of c)
      sD(g, h);
    r.push(h);
  }
  return s.length && s.forEach((u) => {
    u.index !== void 0 ? r.splice(u.index, 0, { ...u.item }) : r.push({ ...u.item });
  }), r;
}
function sD(t, a) {
  switch (t.type) {
    case "select": {
      a.selected = t.selected;
      break;
    }
    case "position": {
      typeof t.position < "u" && (a.position = t.position), typeof t.dragging < "u" && (a.dragging = t.dragging);
      break;
    }
    case "dimensions": {
      typeof t.dimensions < "u" && (a.measured = {
        ...t.dimensions
      }, t.setAttributes && ((t.setAttributes === !0 || t.setAttributes === "width") && (a.width = t.dimensions.width), (t.setAttributes === !0 || t.setAttributes === "height") && (a.height = t.dimensions.height))), typeof t.resizing == "boolean" && (a.resizing = t.resizing);
      break;
    }
  }
}
function uD(t, a) {
  return yx(t, a);
}
function cD(t, a) {
  return yx(t, a);
}
function hr(t, a) {
  return {
    id: t,
    type: "select",
    selected: a
  };
}
function fl(t, a = /* @__PURE__ */ new Set(), r = !1) {
  const l = [];
  for (const [s, u] of t) {
    const c = a.has(s);
    !(u.selected === void 0 && !c) && u.selected !== c && (r && (u.selected = c), l.push(hr(u.id, c)));
  }
  return l;
}
function _v({ items: t = [], lookup: a }) {
  const r = [], l = new Map(t.map((s) => [s.id, s]));
  for (const [s, u] of t.entries()) {
    const c = a.get(u.id), h = c?.internals?.userNode ?? c;
    h !== void 0 && h !== u && r.push({ id: u.id, item: u, type: "replace" }), h === void 0 && r.push({ item: u, type: "add", index: s });
  }
  for (const [s] of a)
    l.get(s) === void 0 && r.push({ id: s, type: "remove" });
  return r;
}
function Nv(t) {
  return {
    id: t.id,
    type: "remove"
  };
}
const fD = X1();
function dD(t, a, r = {}) {
  return QT(t, a, {
    ...r,
    onError: r.onError ?? fD
  });
}
const Rv = (t) => OT(t), hD = (t) => V1(t);
function vx(t) {
  return N.forwardRef(t);
}
const mD = typeof window < "u" ? N.useLayoutEffect : N.useEffect;
function Cv(t) {
  const [a, r] = N.useState(BigInt(0)), [l] = N.useState(() => pD(() => r((s) => s + BigInt(1))));
  return mD(() => {
    const s = l.get();
    s.length && (t(s), l.reset());
  }, [a]), l;
}
function pD(t) {
  let a = [];
  return {
    get: () => a,
    reset: () => {
      a = [];
    },
    push: (r) => {
      a.push(r), t();
    }
  };
}
const bx = N.createContext(null);
function gD({ children: t }) {
  const a = zt(), r = N.useCallback((h) => {
    const { nodes: g = [], setNodes: m, hasDefaultNodes: y, onNodesChange: p, nodeLookup: v, fitViewQueued: b, onNodesChangeMiddlewareMap: w } = a.getState();
    let R = g;
    for (const _ of h)
      R = typeof _ == "function" ? _(R) : _;
    let T = _v({
      items: R,
      lookup: v
    });
    for (const _ of w.values())
      T = _(T);
    y && m(R), T.length > 0 ? p?.(T) : b && window.requestAnimationFrame(() => {
      const { fitViewQueued: _, nodes: O, setNodes: E } = a.getState();
      _ && E(O);
    });
  }, []), l = Cv(r), s = N.useCallback((h) => {
    const { edges: g = [], setEdges: m, hasDefaultEdges: y, onEdgesChange: p, edgeLookup: v } = a.getState();
    let b = g;
    for (const w of h)
      b = typeof w == "function" ? w(b) : w;
    y ? m(b) : p && p(_v({
      items: b,
      lookup: v
    }));
  }, []), u = Cv(s), c = N.useMemo(() => ({ nodeQueue: l, edgeQueue: u }), []);
  return S.jsx(bx.Provider, { value: c, children: t });
}
function yD() {
  const t = N.useContext(bx);
  if (!t)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return t;
}
const vD = (t) => !!t.panZoom;
function lm() {
  const t = oD(), a = zt(), r = yD(), l = lt(vD), s = N.useMemo(() => {
    const u = (p) => a.getState().nodeLookup.get(p), c = (p) => {
      r.nodeQueue.push(p);
    }, h = (p) => {
      r.edgeQueue.push(p);
    }, g = (p) => {
      const { nodeLookup: v, nodeOrigin: b } = a.getState(), w = Rv(p) ? p : v.get(p.id), R = w.parentId ? I1(w.position, w.measured, w.parentId, v, b) : w.position, T = {
        ...w,
        position: R,
        width: w.measured?.width ?? w.width,
        height: w.measured?.height ?? w.height
      };
      return xl(T);
    }, m = (p, v, b = { replace: !1 }) => {
      c((w) => w.map((R) => {
        if (R.id === p) {
          const T = typeof v == "function" ? v(R) : v;
          return b.replace && Rv(T) ? T : { ...R, ...T };
        }
        return R;
      }));
    }, y = (p, v, b = { replace: !1 }) => {
      h((w) => w.map((R) => {
        if (R.id === p) {
          const T = typeof v == "function" ? v(R) : v;
          return b.replace && hD(T) ? T : { ...R, ...T };
        }
        return R;
      }));
    };
    return {
      getNodes: () => a.getState().nodes.map((p) => ({ ...p })),
      getNode: (p) => u(p)?.internals.userNode,
      getInternalNode: u,
      getEdges: () => {
        const { edges: p = [] } = a.getState();
        return p.map((v) => ({ ...v }));
      },
      getEdge: (p) => a.getState().edgeLookup.get(p),
      setNodes: c,
      setEdges: h,
      addNodes: (p) => {
        const v = Array.isArray(p) ? p : [p];
        r.nodeQueue.push((b) => [...b, ...v]);
      },
      addEdges: (p) => {
        const v = Array.isArray(p) ? p : [p];
        r.edgeQueue.push((b) => [...b, ...v]);
      },
      toObject: () => {
        const { nodes: p = [], edges: v = [], transform: b } = a.getState(), [w, R, T] = b;
        return {
          nodes: p.map((_) => ({ ..._ })),
          edges: v.map((_) => ({ ..._ })),
          viewport: {
            x: w,
            y: R,
            zoom: T
          }
        };
      },
      deleteElements: async ({ nodes: p = [], edges: v = [] }) => {
        const { nodes: b, edges: w, onNodesDelete: R, onEdgesDelete: T, triggerNodeChanges: _, triggerEdgeChanges: O, onDelete: E, onBeforeDelete: L } = a.getState(), { nodes: B, edges: H } = await UT({
          nodesToRemove: p,
          edgesToRemove: v,
          nodes: b,
          edges: w,
          onBeforeDelete: L
        }), V = H.length > 0, D = B.length > 0;
        if (V) {
          const G = H.map(Nv);
          T?.(H), O(G);
        }
        if (D) {
          const G = B.map(Nv);
          R?.(B), _(G);
        }
        return (D || V) && E?.({ nodes: B, edges: H }), { deletedNodes: B, deletedEdges: H };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (p, v = !0, b) => {
        const w = Jy(p), R = w ? p : g(p), T = b !== void 0;
        return R ? (b || a.getState().nodes).filter((_) => {
          const O = a.getState().nodeLookup.get(_.id);
          if (O && !w && (_.id === p.id || !O.internals.positionAbsolute))
            return !1;
          const E = xl(T ? _ : O), L = Bo(E, R);
          return v && L > 0 || L >= E.width * E.height || L >= R.width * R.height;
        }) : [];
      },
      isNodeIntersecting: (p, v, b = !0) => {
        const R = Jy(p) ? p : g(p);
        if (!R)
          return !1;
        const T = Bo(R, v);
        return b && T > 0 || T >= v.width * v.height || T >= R.width * R.height;
      },
      updateNode: m,
      updateNodeData: (p, v, b = { replace: !1 }) => {
        m(p, (w) => {
          const R = typeof v == "function" ? v(w) : v;
          return b.replace ? { ...w, data: R } : { ...w, data: { ...w.data, ...R } };
        }, b);
      },
      updateEdge: y,
      updateEdgeData: (p, v, b = { replace: !1 }) => {
        y(p, (w) => {
          const R = typeof v == "function" ? v(w) : v;
          return b.replace ? { ...w, data: R } : { ...w, data: { ...w.data, ...R } };
        }, b);
      },
      getNodesBounds: (p) => {
        const { nodeLookup: v, nodeOrigin: b } = a.getState();
        return LT(p, { nodeLookup: v, nodeOrigin: b });
      },
      getHandleConnections: ({ type: p, id: v, nodeId: b }) => Array.from(a.getState().connectionLookup.get(`${b}-${p}${v ? `-${v}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: p, handleId: v, nodeId: b }) => Array.from(a.getState().connectionLookup.get(`${b}${p ? v ? `-${p}-${v}` : `-${p}` : ""}`)?.values() ?? []),
      fitView: async (p) => {
        const v = a.getState().fitViewResolver ?? qT();
        return a.setState({ fitViewQueued: !0, fitViewOptions: p, fitViewResolver: v }), r.nodeQueue.push((b) => [...b]), v.promise;
      }
    };
  }, []);
  return N.useMemo(() => ({
    ...s,
    ...t,
    viewportInitialized: l
  }), [l]);
}
const Tv = (t) => t.selected, bD = typeof window < "u" ? window : void 0;
function xD({ deleteKeyCode: t, multiSelectionKeyCode: a }) {
  const r = zt(), { deleteElements: l } = lm(), s = ko(t, { actInsideInputWithModifier: !1 }), u = ko(a, { target: bD });
  N.useEffect(() => {
    if (s) {
      const { edges: c, nodes: h } = r.getState();
      l({ nodes: h.filter(Tv), edges: c.filter(Tv) }), r.setState({ nodesSelectionActive: !1 });
    }
  }, [s]), N.useEffect(() => {
    r.setState({ multiSelectionActive: u });
  }, [u]);
}
function wD(t) {
  const a = zt();
  N.useEffect(() => {
    const r = () => {
      if (!t.current || !(t.current.checkVisibility?.() ?? !0))
        return !1;
      const l = em(t.current);
      (l.height === 0 || l.width === 0) && a.getState().onError?.("004", ya.error004()), a.setState({ width: l.width || 500, height: l.height || 500 });
    };
    if (t.current) {
      r(), window.addEventListener("resize", r);
      const l = new ResizeObserver(() => r());
      return l.observe(t.current), () => {
        window.removeEventListener("resize", r), l && t.current && l.unobserve(t.current);
      };
    }
  }, []);
}
const hc = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, SD = (t) => ({
  userSelectionActive: t.userSelectionActive,
  lib: t.lib,
  connectionInProgress: t.connection.inProgress
});
function ED({ onPaneContextMenu: t, zoomOnScroll: a = !0, zoomOnPinch: r = !0, panOnScroll: l = !1, panOnScrollSpeed: s = 0.5, panOnScrollMode: u = vr.Free, zoomOnDoubleClick: c = !0, panOnDrag: h = !0, defaultViewport: g, translateExtent: m, minZoom: y, maxZoom: p, zoomActivationKeyCode: v, preventScrolling: b = !0, children: w, noWheelClassName: R, noPanClassName: T, onViewportChange: _, isControlledViewport: O, paneClickDistance: E, selectionOnDrag: L }) {
  const B = zt(), H = N.useRef(null), { userSelectionActive: V, lib: D, connectionInProgress: G } = lt(SD, At), le = ko(v), $ = N.useRef();
  wD(H);
  const K = N.useCallback((re) => {
    _?.({ x: re[0], y: re[1], zoom: re[2] }), O || B.setState({ transform: re });
  }, [_, O]);
  return N.useEffect(() => {
    if (H.current) {
      $.current = _M({
        domNode: H.current,
        minZoom: y,
        maxZoom: p,
        translateExtent: m,
        viewport: g,
        onDraggingChange: (C) => B.setState((z) => z.paneDragging === C ? z : { paneDragging: C }),
        onPanZoomStart: (C, z) => {
          const { onViewportChangeStart: Y, onMoveStart: X } = B.getState();
          X?.(C, z), Y?.(z);
        },
        onPanZoom: (C, z) => {
          const { onViewportChange: Y, onMove: X } = B.getState();
          X?.(C, z), Y?.(z);
        },
        onPanZoomEnd: (C, z) => {
          const { onViewportChangeEnd: Y, onMoveEnd: X } = B.getState();
          X?.(C, z), Y?.(z);
        }
      });
      const { x: re, y: j, zoom: I } = $.current.getViewport();
      return B.setState({
        panZoom: $.current,
        transform: [re, j, I],
        domNode: H.current.closest(".react-flow")
      }), () => {
        $.current?.destroy();
      };
    }
  }, []), N.useEffect(() => {
    $.current?.update({
      onPaneContextMenu: t,
      zoomOnScroll: a,
      zoomOnPinch: r,
      panOnScroll: l,
      panOnScrollSpeed: s,
      panOnScrollMode: u,
      zoomOnDoubleClick: c,
      panOnDrag: h,
      zoomActivationKeyPressed: le,
      preventScrolling: b,
      noPanClassName: T,
      userSelectionActive: V,
      noWheelClassName: R,
      lib: D,
      onTransformChange: K,
      connectionInProgress: G,
      selectionOnDrag: L,
      paneClickDistance: E
    });
  }, [
    t,
    a,
    r,
    l,
    s,
    u,
    c,
    h,
    le,
    b,
    T,
    V,
    R,
    D,
    K,
    G,
    L,
    E
  ]), S.jsx("div", { className: "react-flow__renderer", ref: H, style: hc, children: w });
}
const _D = (t) => ({
  userSelectionActive: t.userSelectionActive,
  userSelectionRect: t.userSelectionRect
});
function ND() {
  const { userSelectionActive: t, userSelectionRect: a } = lt(_D, At);
  return t && a ? S.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: a.width,
    height: a.height,
    transform: `translate(${a.x}px, ${a.y}px)`
  } }) : null;
}
const Yd = (t, a) => (r) => {
  r.target === a.current && t?.(r);
}, RD = (t) => ({
  userSelectionActive: t.userSelectionActive,
  elementsSelectable: t.elementsSelectable,
  connectionInProgress: t.connection.inProgress,
  dragging: t.paneDragging,
  panBy: t.panBy,
  autoPanSpeed: t.autoPanSpeed
});
function CD({ isSelecting: t, selectionKeyPressed: a, selectionMode: r = Ho.Full, panOnDrag: l, autoPanOnSelection: s, paneClickDistance: u, selectionOnDrag: c, onSelectionStart: h, onSelectionEnd: g, onPaneClick: m, onPaneContextMenu: y, onPaneScroll: p, onPaneMouseEnter: v, onPaneMouseMove: b, onPaneMouseLeave: w, children: R }) {
  const T = N.useRef(0), _ = zt(), { userSelectionActive: O, elementsSelectable: E, dragging: L, connectionInProgress: B, panBy: H, autoPanSpeed: V } = lt(RD, At), D = E && (t || O), G = N.useRef(null), le = N.useRef(), $ = N.useRef(/* @__PURE__ */ new Set()), K = N.useRef(/* @__PURE__ */ new Set()), re = N.useRef(!1), j = N.useRef({ x: 0, y: 0 }), I = N.useRef(!1), C = (W) => {
    if (re.current || B) {
      re.current = !1;
      return;
    }
    m?.(W), _.getState().resetSelectedElements(), _.setState({ nodesSelectionActive: !1 });
  }, z = (W) => {
    if (Array.isArray(l) && l?.includes(2)) {
      W.preventDefault();
      return;
    }
    y?.(W);
  }, Y = p ? (W) => p(W) : void 0, X = (W) => {
    re.current && (W.stopPropagation(), re.current = !1);
  }, te = (W) => {
    const { domNode: ge, transform: ze } = _.getState();
    if (le.current = ge?.getBoundingClientRect(), !le.current)
      return;
    const Ce = W.target === G.current;
    if (!Ce && !!W.target.closest(".nokey") || !t || !(c && Ce || a) || W.button !== 0 || !W.isPrimary)
      return;
    W.target?.setPointerCapture?.(W.pointerId), re.current = !1;
    const { x: Re, y: Ye } = ga(W.nativeEvent, le.current), ft = _l({ x: Re, y: Ye }, ze);
    _.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: ft.x,
        startY: ft.y,
        x: Re,
        y: Ye
      }
    }), Ce || (W.stopPropagation(), W.preventDefault());
  };
  function A(W, ge) {
    const { userSelectionRect: ze } = _.getState();
    if (!ze)
      return;
    const { transform: Ce, nodeLookup: Se, edgeLookup: xe, connectionLookup: Re, triggerNodeChanges: Ye, triggerEdgeChanges: ft, defaultEdgeOptions: Te } = _.getState(), Ie = { x: ze.startX, y: ze.startY }, { x: Be, y: $e } = wl(Ie, Ce), St = {
      startX: Ie.x,
      startY: Ie.y,
      x: W < Be ? W : Be,
      y: ge < $e ? ge : $e,
      width: Math.abs(W - Be),
      height: Math.abs(ge - $e)
    }, Je = $.current, Qe = K.current;
    $.current = new Set(Ph(Se, St, Ce, r === Ho.Partial, !0).map((gt) => gt.id)), K.current = /* @__PURE__ */ new Set();
    const Fe = Te?.selectable ?? !0;
    for (const gt of $.current) {
      const yt = Re.get(gt);
      if (yt)
        for (const { edgeId: Xt } of yt.values()) {
          const jt = xe.get(Xt);
          jt && (jt.selectable ?? Fe) && K.current.add(Xt);
        }
    }
    if (!Wy(Je, $.current)) {
      const gt = fl(Se, $.current, !0);
      Ye(gt);
    }
    if (!Wy(Qe, K.current)) {
      const gt = fl(xe, K.current);
      ft(gt);
    }
    _.setState({
      userSelectionRect: St,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }
  function k() {
    if (!s || !le.current)
      return;
    const [W, ge] = Jh(j.current, le.current, V);
    H({ x: W, y: ge }).then((ze) => {
      if (!re.current || !ze) {
        T.current = requestAnimationFrame(k);
        return;
      }
      const { x: Ce, y: Se } = j.current;
      A(Ce, Se), T.current = requestAnimationFrame(k);
    });
  }
  const F = () => {
    cancelAnimationFrame(T.current), T.current = 0, I.current = !1;
  };
  N.useEffect(() => () => F(), []);
  const ee = (W) => {
    const { userSelectionRect: ge, transform: ze, resetSelectedElements: Ce } = _.getState();
    if (!le.current || !ge)
      return;
    const { x: Se, y: xe } = ga(W.nativeEvent, le.current);
    j.current = { x: Se, y: xe };
    const Re = wl({ x: ge.startX, y: ge.startY }, ze);
    if (!re.current) {
      const Ye = a ? 0 : u;
      if (Math.hypot(Se - Re.x, xe - Re.y) <= Ye)
        return;
      Ce(), h?.(W);
    }
    re.current = !0, I.current || (k(), I.current = !0), A(Se, xe);
  }, se = (W) => {
    W.button === 0 && (W.target?.releasePointerCapture?.(W.pointerId), !O && W.target === G.current && _.getState().userSelectionRect && C?.(W), _.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), re.current && (g?.(W), _.setState({
      nodesSelectionActive: $.current.size > 0
    })), F());
  }, he = (W) => {
    W.target?.releasePointerCapture?.(W.pointerId), F();
  }, me = l === !0 || Array.isArray(l) && l.includes(0);
  return S.jsxs("div", { className: Ft(["react-flow__pane", { draggable: me, dragging: L, selection: t }]), onClick: D ? void 0 : Yd(C, G), onContextMenu: Yd(z, G), onWheel: Yd(Y, G), onPointerEnter: D ? void 0 : v, onPointerMove: D ? ee : b, onPointerUp: D ? se : void 0, onPointerCancel: D ? he : void 0, onPointerDownCapture: D ? te : void 0, onClickCapture: D ? X : void 0, onPointerLeave: w, ref: G, style: hc, children: [R, S.jsx(ND, {})] });
}
function mh({ id: t, store: a, unselect: r = !1, nodeRef: l }) {
  const { addSelectedNodes: s, unselectNodesAndEdges: u, multiSelectionActive: c, nodeLookup: h, onError: g } = a.getState(), m = h.get(t);
  if (!m) {
    g?.("012", ya.error012(t));
    return;
  }
  a.setState({ nodesSelectionActive: !1 }), m.selected ? (r || m.selected && c) && (u({ nodes: [m], edges: [] }), requestAnimationFrame(() => l?.current?.blur())) : s([t]);
}
function xx({ nodeRef: t, disabled: a = !1, noDragClassName: r, handleSelector: l, nodeId: s, isSelectable: u, nodeClickDistance: c }) {
  const h = zt(), [g, m] = N.useState(!1), y = N.useRef();
  return N.useEffect(() => {
    y.current = cM({
      getStoreItems: () => h.getState(),
      onNodeMouseDown: (p) => {
        mh({
          id: p,
          store: h,
          nodeRef: t
        });
      },
      onDragStart: () => {
        m(!0);
      },
      onDragStop: () => {
        m(!1);
      }
    });
  }, []), N.useEffect(() => {
    if (!(a || !t.current || !y.current))
      return y.current.update({
        noDragClassName: r,
        handleSelector: l,
        domNode: t.current,
        isSelectable: u,
        nodeId: s,
        nodeClickDistance: c
      }), () => {
        y.current?.destroy();
      };
  }, [r, l, a, u, t, s, c]), g;
}
const TD = (t) => (a) => a.selected && (a.draggable || t && typeof a.draggable > "u");
function wx() {
  const t = zt();
  return N.useCallback((r) => {
    const { nodeExtent: l, snapToGrid: s, snapGrid: u, nodesDraggable: c, onError: h, updateNodePositions: g, nodeLookup: m, nodeOrigin: y } = t.getState(), p = /* @__PURE__ */ new Map(), v = TD(c), b = s ? u[0] : 5, w = s ? u[1] : 5, R = r.direction.x * b * r.factor, T = r.direction.y * w * r.factor;
    for (const [, _] of m) {
      if (!v(_))
        continue;
      let O = {
        x: _.internals.positionAbsolute.x + R,
        y: _.internals.positionAbsolute.y + T
      };
      s && (O = Ko(O, u));
      const { position: E, positionAbsolute: L } = q1({
        nodeId: _.id,
        nextPosition: O,
        nodeLookup: m,
        nodeExtent: l,
        nodeOrigin: y,
        onError: h
      });
      _.position = E, _.internals.positionAbsolute = L, p.set(_.id, _);
    }
    g(p);
  }, []);
}
const om = N.createContext(null), MD = om.Provider;
om.Consumer;
const Sx = () => N.useContext(om), DD = (t) => ({
  connectOnClick: t.connectOnClick,
  noPanClassName: t.noPanClassName,
  rfId: t.rfId
}), AD = (t, a, r) => (l) => {
  const { connectionClickStartHandle: s, connectionMode: u, connection: c } = l, { fromHandle: h, toHandle: g, isValid: m } = c, y = g?.nodeId === t && g?.id === a && g?.type === r;
  return {
    connectingFrom: h?.nodeId === t && h?.id === a && h?.type === r,
    connectingTo: y,
    clickConnecting: s?.nodeId === t && s?.id === a && s?.type === r,
    isPossibleEndHandle: u === vl.Strict ? h?.type !== r : t !== h?.nodeId || a !== h?.id,
    connectionInProcess: !!h,
    clickConnectionInProcess: !!s,
    valid: y && m
  };
};
function zD({ type: t = "source", position: a = Ae.Top, isValidConnection: r, isConnectable: l = !0, isConnectableStart: s = !0, isConnectableEnd: u = !0, id: c, onConnect: h, children: g, className: m, onMouseDown: y, onTouchStart: p, ...v }, b) {
  const w = c || null, R = t === "target", T = zt(), _ = Sx(), { connectOnClick: O, noPanClassName: E, rfId: L } = lt(DD, At), { connectingFrom: B, connectingTo: H, clickConnecting: V, isPossibleEndHandle: D, connectionInProcess: G, clickConnectionInProcess: le, valid: $ } = lt(AD(_, w, t), At);
  _ || T.getState().onError?.("010", ya.error010());
  const K = (I) => {
    const { defaultEdgeOptions: C, onConnect: z, hasDefaultEdges: Y } = T.getState(), X = {
      ...C,
      ...I
    };
    if (Y) {
      const { edges: te, setEdges: A, onError: k } = T.getState();
      A(dD(X, te, { onError: k }));
    }
    z?.(X), h?.(X);
  }, re = (I) => {
    if (!_)
      return;
    const C = F1(I.nativeEvent);
    if (s && (C && I.button === 0 || !C)) {
      const z = T.getState();
      hh.onPointerDown(I.nativeEvent, {
        handleDomNode: I.currentTarget,
        autoPanOnConnect: z.autoPanOnConnect,
        connectionMode: z.connectionMode,
        connectionRadius: z.connectionRadius,
        domNode: z.domNode,
        nodeLookup: z.nodeLookup,
        lib: z.lib,
        isTarget: R,
        handleId: w,
        nodeId: _,
        flowId: z.rfId,
        panBy: z.panBy,
        cancelConnection: z.cancelConnection,
        onConnectStart: z.onConnectStart,
        onConnectEnd: (...Y) => T.getState().onConnectEnd?.(...Y),
        updateConnection: z.updateConnection,
        onConnect: K,
        isValidConnection: r || ((...Y) => T.getState().isValidConnection?.(...Y) ?? !0),
        getTransform: () => T.getState().transform,
        getFromHandle: () => T.getState().connection.fromHandle,
        autoPanSpeed: z.autoPanSpeed,
        dragThreshold: z.connectionDragThreshold
      });
    }
    C ? y?.(I) : p?.(I);
  }, j = (I) => {
    const { onClickConnectStart: C, onClickConnectEnd: z, connectionClickStartHandle: Y, connectionMode: X, isValidConnection: te, lib: A, rfId: k, nodeLookup: F, connection: ee } = T.getState();
    if (!_ || !Y && !s)
      return;
    if (!Y) {
      C?.(I.nativeEvent, { nodeId: _, handleId: w, handleType: t }), T.setState({ connectionClickStartHandle: { nodeId: _, type: t, id: w } });
      return;
    }
    const se = Z1(I.target), he = r || te, { connection: me, isValid: W } = hh.isValid(I.nativeEvent, {
      handle: {
        nodeId: _,
        id: w,
        type: t
      },
      connectionMode: X,
      fromNodeId: Y.nodeId,
      fromHandleId: Y.id || null,
      fromType: Y.type,
      isValidConnection: he,
      flowId: k,
      doc: se,
      lib: A,
      nodeLookup: F
    });
    W && me && K(me);
    const ge = structuredClone(ee);
    delete ge.inProgress, ge.toPosition = ge.toHandle ? ge.toHandle.position : null, z?.(I, ge), T.setState({ connectionClickStartHandle: null });
  };
  return S.jsx("div", { "data-handleid": w, "data-nodeid": _, "data-handlepos": a, "data-id": `${L}-${_}-${w}-${t}`, className: Ft([
    "react-flow__handle",
    `react-flow__handle-${a}`,
    "nodrag",
    E,
    m,
    {
      source: !R,
      target: R,
      connectable: l,
      connectablestart: s,
      connectableend: u,
      clickconnecting: V,
      connectingfrom: B,
      connectingto: H,
      valid: $,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: l && (!G || D) && (G || le ? u : s)
    }
  ]), onMouseDown: re, onTouchStart: re, onClick: O ? j : void 0, ref: b, ...v, children: g });
}
const El = N.memo(vx(zD));
function OD({ data: t, isConnectable: a, sourcePosition: r = Ae.Bottom }) {
  return S.jsxs(S.Fragment, { children: [t?.label, S.jsx(El, { type: "source", position: r, isConnectable: a })] });
}
function LD({ data: t, isConnectable: a, targetPosition: r = Ae.Top, sourcePosition: l = Ae.Bottom }) {
  return S.jsxs(S.Fragment, { children: [S.jsx(El, { type: "target", position: r, isConnectable: a }), t?.label, S.jsx(El, { type: "source", position: l, isConnectable: a })] });
}
function jD() {
  return null;
}
function HD({ data: t, isConnectable: a, targetPosition: r = Ae.Top }) {
  return S.jsxs(S.Fragment, { children: [S.jsx(El, { type: "target", position: r, isConnectable: a }), t?.label] });
}
const Zu = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, Mv = {
  input: OD,
  default: LD,
  output: HD,
  group: jD
};
function BD(t) {
  return t.internals.handleBounds === void 0 ? {
    width: t.width ?? t.initialWidth ?? t.style?.width,
    height: t.height ?? t.initialHeight ?? t.style?.height
  } : {
    width: t.width ?? t.style?.width,
    height: t.height ?? t.style?.height
  };
}
const UD = (t) => {
  const { width: a, height: r, x: l, y: s } = Fo(t.nodeLookup, {
    filter: (u) => !!u.selected
  });
  return {
    width: pa(a) ? a : null,
    height: pa(r) ? r : null,
    userSelectionActive: t.userSelectionActive,
    transformString: `translate(${t.transform[0]}px,${t.transform[1]}px) scale(${t.transform[2]}) translate(${l}px,${s}px)`
  };
};
function kD({ onSelectionContextMenu: t, noPanClassName: a, disableKeyboardA11y: r }) {
  const l = zt(), { width: s, height: u, transformString: c, userSelectionActive: h } = lt(UD, At), g = wx(), m = N.useRef(null);
  N.useEffect(() => {
    r || m.current?.focus({
      preventScroll: !0
    });
  }, [r]);
  const y = !h && s !== null && u !== null;
  if (xx({
    nodeRef: m,
    disabled: !y
  }), !y)
    return null;
  const p = t ? (b) => {
    const w = l.getState().nodes.filter((R) => R.selected);
    t(b, w);
  } : void 0, v = (b) => {
    Object.prototype.hasOwnProperty.call(Zu, b.key) && (b.preventDefault(), g({
      direction: Zu[b.key],
      factor: b.shiftKey ? 4 : 1
    }));
  };
  return S.jsx("div", { className: Ft(["react-flow__nodesselection", "react-flow__container", a]), style: {
    transform: c
  }, children: S.jsx("div", { ref: m, className: "react-flow__nodesselection-rect", onContextMenu: p, tabIndex: r ? void 0 : -1, onKeyDown: r ? void 0 : v, style: {
    width: s,
    height: u
  } }) });
}
const Dv = typeof window < "u" ? window : void 0, VD = (t) => ({ nodesSelectionActive: t.nodesSelectionActive, userSelectionActive: t.userSelectionActive });
function Ex({ children: t, onPaneClick: a, onPaneMouseEnter: r, onPaneMouseMove: l, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, paneClickDistance: h, deleteKeyCode: g, selectionKeyCode: m, selectionOnDrag: y, selectionMode: p, onSelectionStart: v, onSelectionEnd: b, multiSelectionKeyCode: w, panActivationKeyCode: R, zoomActivationKeyCode: T, elementsSelectable: _, zoomOnScroll: O, zoomOnPinch: E, panOnScroll: L, panOnScrollSpeed: B, panOnScrollMode: H, zoomOnDoubleClick: V, panOnDrag: D, autoPanOnSelection: G, defaultViewport: le, translateExtent: $, minZoom: K, maxZoom: re, preventScrolling: j, onSelectionContextMenu: I, noWheelClassName: C, noPanClassName: z, disableKeyboardA11y: Y, onViewportChange: X, isControlledViewport: te }) {
  const { nodesSelectionActive: A, userSelectionActive: k } = lt(VD, At), F = ko(m, { target: Dv }), ee = ko(R, { target: Dv }), se = ee || D, he = ee || L, me = y && se !== !0, W = F || k || me;
  return xD({ deleteKeyCode: g, multiSelectionKeyCode: w }), S.jsx(ED, { onPaneContextMenu: u, elementsSelectable: _, zoomOnScroll: O, zoomOnPinch: E, panOnScroll: he, panOnScrollSpeed: B, panOnScrollMode: H, zoomOnDoubleClick: V, panOnDrag: !F && se, defaultViewport: le, translateExtent: $, minZoom: K, maxZoom: re, zoomActivationKeyCode: T, preventScrolling: j, noWheelClassName: C, noPanClassName: z, onViewportChange: X, isControlledViewport: te, paneClickDistance: h, selectionOnDrag: me, children: S.jsxs(CD, { onSelectionStart: v, onSelectionEnd: b, onPaneClick: a, onPaneMouseEnter: r, onPaneMouseMove: l, onPaneMouseLeave: s, onPaneContextMenu: u, onPaneScroll: c, panOnDrag: se, autoPanOnSelection: G, isSelecting: !!W, selectionMode: p, selectionKeyPressed: F, paneClickDistance: h, selectionOnDrag: me, children: [t, A && S.jsx(kD, { onSelectionContextMenu: I, noPanClassName: z, disableKeyboardA11y: Y })] }) });
}
Ex.displayName = "FlowRenderer";
const qD = N.memo(Ex), YD = (t) => (a) => t ? Ph(a.nodeLookup, { x: 0, y: 0, width: a.width, height: a.height }, a.transform, !0).map((r) => r.id) : Array.from(a.nodeLookup.keys());
function $D(t) {
  return lt(N.useCallback(YD(t), [t]), At);
}
const XD = (t) => t.updateNodeInternals;
function GD() {
  const t = lt(XD), [a] = N.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((r) => {
    const l = /* @__PURE__ */ new Map();
    r.forEach((s) => {
      const u = s.target.getAttribute("data-id");
      l.set(u, {
        id: u,
        nodeElement: s.target,
        force: !0
      });
    }), t(l);
  }));
  return N.useEffect(() => () => {
    a?.disconnect();
  }, [a]), a;
}
function ID({ node: t, nodeType: a, hasDimensions: r, resizeObserver: l }) {
  const s = zt(), u = N.useRef(null), c = N.useRef(null), h = N.useRef(t.sourcePosition), g = N.useRef(t.targetPosition), m = N.useRef(a), y = r && !!t.internals.handleBounds;
  return N.useEffect(() => {
    u.current && !t.hidden && (!y || c.current !== u.current) && (c.current && l?.unobserve(c.current), l?.observe(u.current), c.current = u.current);
  }, [y, t.hidden]), N.useEffect(() => () => {
    c.current && (l?.unobserve(c.current), c.current = null);
  }, []), N.useEffect(() => {
    if (u.current) {
      const p = m.current !== a, v = h.current !== t.sourcePosition, b = g.current !== t.targetPosition;
      (p || v || b) && (m.current = a, h.current = t.sourcePosition, g.current = t.targetPosition, s.getState().updateNodeInternals(/* @__PURE__ */ new Map([[t.id, { id: t.id, nodeElement: u.current, force: !0 }]])));
    }
  }, [t.id, a, t.sourcePosition, t.targetPosition]), u;
}
function ZD({ id: t, onClick: a, onMouseEnter: r, onMouseMove: l, onMouseLeave: s, onContextMenu: u, onDoubleClick: c, nodesDraggable: h, elementsSelectable: g, nodesConnectable: m, nodesFocusable: y, resizeObserver: p, noDragClassName: v, noPanClassName: b, disableKeyboardA11y: w, rfId: R, nodeTypes: T, nodeClickDistance: _, onError: O }) {
  const { node: E, internals: L, isParent: B } = lt((W) => {
    const ge = W.nodeLookup.get(t), ze = W.parentLookup.has(t);
    return {
      node: ge,
      internals: ge.internals,
      isParent: ze
    };
  }, At);
  let H = E.type || "default", V = T?.[H] || Mv[H];
  V === void 0 && (O?.("003", ya.error003(H)), H = "default", V = T?.default || Mv.default);
  const D = !!(E.draggable || h && typeof E.draggable > "u"), G = !!(E.selectable || g && typeof E.selectable > "u"), le = !!(E.connectable || m && typeof E.connectable > "u"), $ = !!(E.focusable || y && typeof E.focusable > "u"), K = zt(), re = G1(E), j = ID({ node: E, nodeType: H, hasDimensions: re, resizeObserver: p }), I = xx({
    nodeRef: j,
    disabled: E.hidden || !D,
    noDragClassName: v,
    handleSelector: E.dragHandle,
    nodeId: t,
    isSelectable: G,
    nodeClickDistance: _
  }), C = wx();
  if (E.hidden)
    return null;
  const z = ui(E), Y = BD(E), X = G || D || a || r || l || s, te = r ? (W) => r(W, { ...L.userNode }) : void 0, A = l ? (W) => l(W, { ...L.userNode }) : void 0, k = s ? (W) => s(W, { ...L.userNode }) : void 0, F = u ? (W) => u(W, { ...L.userNode }) : void 0, ee = c ? (W) => c(W, { ...L.userNode }) : void 0, se = (W) => {
    const { selectNodesOnDrag: ge, nodeDragThreshold: ze } = K.getState();
    G && (!ge || !D || ze > 0) && mh({
      id: t,
      store: K,
      nodeRef: j
    }), a && a(W, { ...L.userNode });
  }, he = (W) => {
    if (!(Q1(W.nativeEvent) || w)) {
      if (H1.includes(W.key) && G) {
        const ge = W.key === "Escape";
        mh({
          id: t,
          store: K,
          unselect: ge,
          nodeRef: j
        });
      } else if (D && E.selected && Object.prototype.hasOwnProperty.call(Zu, W.key)) {
        W.preventDefault();
        const { ariaLabelConfig: ge } = K.getState();
        K.setState({
          ariaLiveMessage: ge["node.a11yDescription.ariaLiveMessage"]({
            direction: W.key.replace("Arrow", "").toLowerCase(),
            x: ~~L.positionAbsolute.x,
            y: ~~L.positionAbsolute.y
          })
        }), C({
          direction: Zu[W.key],
          factor: W.shiftKey ? 4 : 1
        });
      }
    }
  }, me = () => {
    if (w || !j.current?.matches(":focus-visible"))
      return;
    const { transform: W, width: ge, height: ze, autoPanOnNodeFocus: Ce, setCenter: Se } = K.getState();
    if (!Ce)
      return;
    Ph(/* @__PURE__ */ new Map([[t, E]]), { x: 0, y: 0, width: ge, height: ze }, W, !0).length > 0 || Se(E.position.x + z.width / 2, E.position.y + z.height / 2, {
      zoom: W[2]
    });
  };
  return S.jsx("div", { className: Ft([
    "react-flow__node",
    `react-flow__node-${H}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [b]: D
    },
    E.className,
    {
      selected: E.selected,
      selectable: G,
      parent: B,
      draggable: D,
      dragging: I
    }
  ]), ref: j, style: {
    zIndex: L.z,
    transform: `translate(${L.positionAbsolute.x}px,${L.positionAbsolute.y}px)`,
    pointerEvents: X ? "all" : "none",
    visibility: re ? "visible" : "hidden",
    ...E.style,
    ...Y
  }, "data-id": t, "data-testid": `rf__node-${t}`, onMouseEnter: te, onMouseMove: A, onMouseLeave: k, onContextMenu: F, onClick: se, onDoubleClick: ee, onKeyDown: $ ? he : void 0, tabIndex: $ ? 0 : void 0, onFocus: $ ? me : void 0, role: E.ariaRole ?? ($ ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": w ? void 0 : `${mx}-${R}`, "aria-label": E.ariaLabel, ...E.domAttributes, children: S.jsx(MD, { value: t, children: S.jsx(V, { id: t, data: E.data, type: H, positionAbsoluteX: L.positionAbsolute.x, positionAbsoluteY: L.positionAbsolute.y, selected: E.selected ?? !1, selectable: G, draggable: D, deletable: E.deletable ?? !0, isConnectable: le, sourcePosition: E.sourcePosition, targetPosition: E.targetPosition, dragging: I, dragHandle: E.dragHandle, zIndex: L.z, parentId: E.parentId, ...z }) }) });
}
var QD = N.memo(ZD);
const FD = (t) => ({
  nodesDraggable: t.nodesDraggable,
  nodesConnectable: t.nodesConnectable,
  nodesFocusable: t.nodesFocusable,
  elementsSelectable: t.elementsSelectable,
  onError: t.onError
});
function _x(t) {
  const { nodesDraggable: a, nodesConnectable: r, nodesFocusable: l, elementsSelectable: s, onError: u } = lt(FD, At), c = $D(t.onlyRenderVisibleElements), h = GD();
  return S.jsx("div", { className: "react-flow__nodes", style: hc, children: c.map((g) => (
    /*
     * The split of responsibilities between NodeRenderer and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For example, when you’re dragging a single node, that node gets
     * updated multiple times per second. If `NodeRenderer` were to update
     * every time, it would have to re-run the `nodes.map()` loop every
     * time. This gets pricey with hundreds of nodes, especially if every
     * loop cycle does more than just rendering a JSX element!
     *
     * As a result of this choice, we took the following implementation
     * decisions:
     * - NodeRenderer subscribes *only* to node IDs – and therefore
     *   rerender *only* when visible nodes are added or removed.
     * - NodeRenderer performs all operations the result of which can be
     *   shared between nodes (such as creating the `ResizeObserver`
     *   instance, or subscribing to `selector`). This means extra prop
     *   drilling into `NodeComponentWrapper`, but it means we need to run
     *   these operations only once – instead of once per node.
     * - Any operations that you’d normally write inside `nodes.map` are
     *   moved into `NodeComponentWrapper`. This ensures they are
     *   memorized – so if `NodeRenderer` *has* to rerender, it only
     *   needs to regenerate the list of nodes, nothing else.
     */
    S.jsx(QD, { id: g, nodeTypes: t.nodeTypes, nodeExtent: t.nodeExtent, onClick: t.onNodeClick, onMouseEnter: t.onNodeMouseEnter, onMouseMove: t.onNodeMouseMove, onMouseLeave: t.onNodeMouseLeave, onContextMenu: t.onNodeContextMenu, onDoubleClick: t.onNodeDoubleClick, noDragClassName: t.noDragClassName, noPanClassName: t.noPanClassName, rfId: t.rfId, disableKeyboardA11y: t.disableKeyboardA11y, resizeObserver: h, nodesDraggable: a, nodesConnectable: r, nodesFocusable: l, elementsSelectable: s, nodeClickDistance: t.nodeClickDistance, onError: u }, g)
  )) });
}
_x.displayName = "NodeRenderer";
const KD = N.memo(_x);
function PD(t) {
  return lt(N.useCallback((r) => {
    if (!t)
      return r.edges.map((s) => s.id);
    const l = [];
    if (r.width && r.height)
      for (const s of r.edges) {
        const u = r.nodeLookup.get(s.source), c = r.nodeLookup.get(s.target);
        u && c && GT({
          sourceNode: u,
          targetNode: c,
          width: r.width,
          height: r.height,
          transform: r.transform
        }) && l.push(s.id);
      }
    return l;
  }, [t]), At);
}
const JD = ({ color: t = "none", strokeWidth: a = 1 }) => {
  const r = {
    strokeWidth: a,
    ...t && { stroke: t }
  };
  return S.jsx("polyline", { className: "arrow", style: r, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, WD = ({ color: t = "none", strokeWidth: a = 1 }) => {
  const r = {
    strokeWidth: a,
    ...t && { stroke: t, fill: t }
  };
  return S.jsx("polyline", { className: "arrowclosed", style: r, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, Av = {
  [Gu.Arrow]: JD,
  [Gu.ArrowClosed]: WD
};
function eA(t) {
  const a = zt();
  return N.useMemo(() => Object.prototype.hasOwnProperty.call(Av, t) ? Av[t] : (a.getState().onError?.("009", ya.error009(t)), null), [t]);
}
const tA = ({ id: t, type: a, color: r, width: l = 12.5, height: s = 12.5, markerUnits: u = "strokeWidth", strokeWidth: c, orient: h = "auto-start-reverse" }) => {
  const g = eA(a);
  return g ? S.jsx("marker", { className: "react-flow__arrowhead", id: t, markerWidth: `${l}`, markerHeight: `${s}`, viewBox: "-10 -10 20 20", markerUnits: u, orient: h, refX: "0", refY: "0", children: S.jsx(g, { color: r, strokeWidth: c }) }) : null;
}, Nx = ({ defaultColor: t, rfId: a }) => {
  const r = lt((u) => u.edges), l = lt((u) => u.defaultEdgeOptions), s = N.useMemo(() => WT(r, {
    id: a,
    defaultColor: t,
    defaultMarkerStart: l?.markerStart,
    defaultMarkerEnd: l?.markerEnd
  }), [r, l, a, t]);
  return s.length ? S.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: S.jsx("defs", { children: s.map((u) => S.jsx(tA, { id: u.id, type: u.type, color: u.color, width: u.width, height: u.height, markerUnits: u.markerUnits, strokeWidth: u.strokeWidth, orient: u.orient }, u.id)) }) }) : null;
};
Nx.displayName = "MarkerDefinitions";
var nA = N.memo(Nx);
function Rx({ x: t, y: a, label: r, labelStyle: l, labelShowBg: s = !0, labelBgStyle: u, labelBgPadding: c = [2, 4], labelBgBorderRadius: h = 2, children: g, className: m, ...y }) {
  const [p, v] = N.useState({ x: 1, y: 0, width: 0, height: 0 }), b = Ft(["react-flow__edge-textwrapper", m]), w = N.useRef(null);
  return N.useEffect(() => {
    if (w.current) {
      const R = w.current.getBBox();
      v({
        x: R.x,
        y: R.y,
        width: R.width,
        height: R.height
      });
    }
  }, [r]), r ? S.jsxs("g", { transform: `translate(${t - p.width / 2} ${a - p.height / 2})`, className: b, visibility: p.width ? "visible" : "hidden", ...y, children: [s && S.jsx("rect", { width: p.width + 2 * c[0], x: -c[0], y: -c[1], height: p.height + 2 * c[1], className: "react-flow__edge-textbg", style: u, rx: h, ry: h }), S.jsx("text", { className: "react-flow__edge-text", y: p.height / 2, dy: "0.3em", ref: w, style: l, children: r }), g] }) : null;
}
Rx.displayName = "EdgeText";
const aA = N.memo(Rx);
function mc({ path: t, labelX: a, labelY: r, label: l, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: h, labelBgBorderRadius: g, interactionWidth: m = 20, ...y }) {
  return S.jsxs(S.Fragment, { children: [S.jsx("path", { ...y, d: t, fill: "none", className: Ft(["react-flow__edge-path", y.className]) }), m ? S.jsx("path", { d: t, fill: "none", strokeOpacity: 0, strokeWidth: m, className: "react-flow__edge-interaction" }) : null, l && pa(a) && pa(r) ? S.jsx(aA, { x: a, y: r, label: l, labelStyle: s, labelShowBg: u, labelBgStyle: c, labelBgPadding: h, labelBgBorderRadius: g }) : null] });
}
function zv({ pos: t, x1: a, y1: r, x2: l, y2: s }) {
  return t === Ae.Left || t === Ae.Right ? [0.5 * (a + l), r] : [a, 0.5 * (r + s)];
}
function Cx({ sourceX: t, sourceY: a, sourcePosition: r = Ae.Bottom, targetX: l, targetY: s, targetPosition: u = Ae.Top }) {
  const [c, h] = zv({
    pos: r,
    x1: t,
    y1: a,
    x2: l,
    y2: s
  }), [g, m] = zv({
    pos: u,
    x1: l,
    y1: s,
    x2: t,
    y2: a
  }), [y, p, v, b] = K1({
    sourceX: t,
    sourceY: a,
    targetX: l,
    targetY: s,
    sourceControlX: c,
    sourceControlY: h,
    targetControlX: g,
    targetControlY: m
  });
  return [
    `M${t},${a} C${c},${h} ${g},${m} ${l},${s}`,
    y,
    p,
    v,
    b
  ];
}
function Tx(t) {
  return N.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, sourcePosition: c, targetPosition: h, label: g, labelStyle: m, labelShowBg: y, labelBgStyle: p, labelBgPadding: v, labelBgBorderRadius: b, style: w, markerEnd: R, markerStart: T, interactionWidth: _ }) => {
    const [O, E, L] = Cx({
      sourceX: r,
      sourceY: l,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: h
    }), B = t.isInternal ? void 0 : a;
    return S.jsx(mc, { id: B, path: O, labelX: E, labelY: L, label: g, labelStyle: m, labelShowBg: y, labelBgStyle: p, labelBgPadding: v, labelBgBorderRadius: b, style: w, markerEnd: R, markerStart: T, interactionWidth: _ });
  });
}
const iA = Tx({ isInternal: !1 }), Mx = Tx({ isInternal: !0 });
iA.displayName = "SimpleBezierEdge";
Mx.displayName = "SimpleBezierEdgeInternal";
function Dx(t) {
  return N.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, label: c, labelStyle: h, labelShowBg: g, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: p, style: v, sourcePosition: b = Ae.Bottom, targetPosition: w = Ae.Top, markerEnd: R, markerStart: T, pathOptions: _, interactionWidth: O }) => {
    const [E, L, B] = ch({
      sourceX: r,
      sourceY: l,
      sourcePosition: b,
      targetX: s,
      targetY: u,
      targetPosition: w,
      borderRadius: _?.borderRadius,
      offset: _?.offset,
      stepPosition: _?.stepPosition
    }), H = t.isInternal ? void 0 : a;
    return S.jsx(mc, { id: H, path: E, labelX: L, labelY: B, label: c, labelStyle: h, labelShowBg: g, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: p, style: v, markerEnd: R, markerStart: T, interactionWidth: O });
  });
}
const Ax = Dx({ isInternal: !1 }), zx = Dx({ isInternal: !0 });
Ax.displayName = "SmoothStepEdge";
zx.displayName = "SmoothStepEdgeInternal";
function Ox(t) {
  return N.memo(({ id: a, ...r }) => {
    const l = t.isInternal ? void 0 : a;
    return S.jsx(Ax, { ...r, id: l, pathOptions: N.useMemo(() => ({ borderRadius: 0, offset: r.pathOptions?.offset }), [r.pathOptions?.offset]) });
  });
}
const rA = Ox({ isInternal: !1 }), Lx = Ox({ isInternal: !0 });
rA.displayName = "StepEdge";
Lx.displayName = "StepEdgeInternal";
function jx(t) {
  return N.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, label: c, labelStyle: h, labelShowBg: g, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: p, style: v, markerEnd: b, markerStart: w, interactionWidth: R }) => {
    const [T, _, O] = W1({ sourceX: r, sourceY: l, targetX: s, targetY: u }), E = t.isInternal ? void 0 : a;
    return S.jsx(mc, { id: E, path: T, labelX: _, labelY: O, label: c, labelStyle: h, labelShowBg: g, labelBgStyle: m, labelBgPadding: y, labelBgBorderRadius: p, style: v, markerEnd: b, markerStart: w, interactionWidth: R });
  });
}
const lA = jx({ isInternal: !1 }), Hx = jx({ isInternal: !0 });
lA.displayName = "StraightEdge";
Hx.displayName = "StraightEdgeInternal";
function Bx(t) {
  return N.memo(({ id: a, sourceX: r, sourceY: l, targetX: s, targetY: u, sourcePosition: c = Ae.Bottom, targetPosition: h = Ae.Top, label: g, labelStyle: m, labelShowBg: y, labelBgStyle: p, labelBgPadding: v, labelBgBorderRadius: b, style: w, markerEnd: R, markerStart: T, pathOptions: _, interactionWidth: O }) => {
    const [E, L, B] = P1({
      sourceX: r,
      sourceY: l,
      sourcePosition: c,
      targetX: s,
      targetY: u,
      targetPosition: h,
      curvature: _?.curvature
    }), H = t.isInternal ? void 0 : a;
    return S.jsx(mc, { id: H, path: E, labelX: L, labelY: B, label: g, labelStyle: m, labelShowBg: y, labelBgStyle: p, labelBgPadding: v, labelBgBorderRadius: b, style: w, markerEnd: R, markerStart: T, interactionWidth: O });
  });
}
const oA = Bx({ isInternal: !1 }), Ux = Bx({ isInternal: !0 });
oA.displayName = "BezierEdge";
Ux.displayName = "BezierEdgeInternal";
const Ov = {
  default: Ux,
  straight: Hx,
  step: Lx,
  smoothstep: zx,
  simplebezier: Mx
}, Lv = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null
}, sA = (t, a, r) => r === Ae.Left ? t - a : r === Ae.Right ? t + a : t, uA = (t, a, r) => r === Ae.Top ? t - a : r === Ae.Bottom ? t + a : t, jv = "react-flow__edgeupdater";
function Hv({ position: t, centerX: a, centerY: r, radius: l = 10, onMouseDown: s, onMouseEnter: u, onMouseOut: c, type: h }) {
  return S.jsx("circle", { onMouseDown: s, onMouseEnter: u, onMouseOut: c, className: Ft([jv, `${jv}-${h}`]), cx: sA(a, l, t), cy: uA(r, l, t), r: l, stroke: "transparent", fill: "transparent" });
}
function cA({ isReconnectable: t, reconnectRadius: a, edge: r, sourceX: l, sourceY: s, targetX: u, targetY: c, sourcePosition: h, targetPosition: g, onReconnect: m, onReconnectStart: y, onReconnectEnd: p, setReconnecting: v, setUpdateHover: b }) {
  const w = zt(), R = (L, B) => {
    if (L.button !== 0)
      return;
    const { autoPanOnConnect: H, domNode: V, connectionMode: D, connectionRadius: G, lib: le, onConnectStart: $, cancelConnection: K, nodeLookup: re, rfId: j, panBy: I, updateConnection: C } = w.getState(), z = B.type === "target", Y = (A, k) => {
      v(!1), p?.(A, r, B.type, k);
    }, X = (A) => m?.(r, A), te = (A, k) => {
      v(!0), y?.(L, r, B.type), $?.(A, k);
    };
    hh.onPointerDown(L.nativeEvent, {
      autoPanOnConnect: H,
      connectionMode: D,
      connectionRadius: G,
      domNode: V,
      handleId: B.id,
      nodeId: B.nodeId,
      nodeLookup: re,
      isTarget: z,
      edgeUpdaterType: B.type,
      lib: le,
      flowId: j,
      cancelConnection: K,
      panBy: I,
      isValidConnection: (...A) => w.getState().isValidConnection?.(...A) ?? !0,
      onConnect: X,
      onConnectStart: te,
      onConnectEnd: (...A) => w.getState().onConnectEnd?.(...A),
      onReconnectEnd: Y,
      updateConnection: C,
      getTransform: () => w.getState().transform,
      getFromHandle: () => w.getState().connection.fromHandle,
      dragThreshold: w.getState().connectionDragThreshold,
      handleDomNode: L.currentTarget
    });
  }, T = (L) => R(L, { nodeId: r.target, id: r.targetHandle ?? null, type: "target" }), _ = (L) => R(L, { nodeId: r.source, id: r.sourceHandle ?? null, type: "source" }), O = () => b(!0), E = () => b(!1);
  return S.jsxs(S.Fragment, { children: [(t === !0 || t === "source") && S.jsx(Hv, { position: h, centerX: l, centerY: s, radius: a, onMouseDown: T, onMouseEnter: O, onMouseOut: E, type: "source" }), (t === !0 || t === "target") && S.jsx(Hv, { position: g, centerX: u, centerY: c, radius: a, onMouseDown: _, onMouseEnter: O, onMouseOut: E, type: "target" })] });
}
function fA({ id: t, edgesFocusable: a, edgesReconnectable: r, elementsSelectable: l, onClick: s, onDoubleClick: u, onContextMenu: c, onMouseEnter: h, onMouseMove: g, onMouseLeave: m, reconnectRadius: y, onReconnect: p, onReconnectStart: v, onReconnectEnd: b, rfId: w, edgeTypes: R, noPanClassName: T, onError: _, disableKeyboardA11y: O }) {
  let E = lt((Se) => Se.edgeLookup.get(t));
  const L = lt((Se) => Se.defaultEdgeOptions);
  E = L ? { ...L, ...E } : E;
  let B = E.type || "default", H = R?.[B] || Ov[B];
  H === void 0 && (_?.("011", ya.error011(B)), B = "default", H = R?.default || Ov.default);
  const V = !!(E.focusable || a && typeof E.focusable > "u"), D = typeof p < "u" && (E.reconnectable || r && typeof E.reconnectable > "u"), G = !!(E.selectable || l && typeof E.selectable > "u"), le = N.useRef(null), [$, K] = N.useState(!1), [re, j] = N.useState(!1), I = zt(), { zIndex: C, sourceX: z, sourceY: Y, targetX: X, targetY: te, sourcePosition: A, targetPosition: k } = lt(N.useCallback((Se) => {
    const xe = Se.nodeLookup.get(E.source), Re = Se.nodeLookup.get(E.target);
    if (!xe || !Re)
      return {
        zIndex: E.zIndex,
        ...Lv
      };
    const Ye = JT({
      id: t,
      sourceNode: xe,
      targetNode: Re,
      sourceHandle: E.sourceHandle || null,
      targetHandle: E.targetHandle || null,
      connectionMode: Se.connectionMode,
      onError: _
    });
    return {
      zIndex: XT({
        selected: E.selected,
        zIndex: E.zIndex,
        sourceNode: xe,
        targetNode: Re,
        elevateOnSelect: Se.elevateEdgesOnSelect,
        zIndexMode: Se.zIndexMode
      }),
      ...Ye || Lv
    };
  }, [E.source, E.target, E.sourceHandle, E.targetHandle, E.selected, E.zIndex]), At), F = N.useMemo(() => E.markerStart ? `url('#${fh(E.markerStart, w)}')` : void 0, [E.markerStart, w]), ee = N.useMemo(() => E.markerEnd ? `url('#${fh(E.markerEnd, w)}')` : void 0, [E.markerEnd, w]);
  if (E.hidden || z === null || Y === null || X === null || te === null)
    return null;
  const se = (Se) => {
    const { addSelectedEdges: xe, unselectNodesAndEdges: Re, multiSelectionActive: Ye } = I.getState();
    G && (I.setState({ nodesSelectionActive: !1 }), E.selected && Ye ? (Re({ nodes: [], edges: [E] }), le.current?.blur()) : xe([t])), s && s(Se, E);
  }, he = u ? (Se) => {
    u(Se, { ...E });
  } : void 0, me = c ? (Se) => {
    c(Se, { ...E });
  } : void 0, W = h ? (Se) => {
    h(Se, { ...E });
  } : void 0, ge = g ? (Se) => {
    g(Se, { ...E });
  } : void 0, ze = m ? (Se) => {
    m(Se, { ...E });
  } : void 0, Ce = (Se) => {
    if (!O && H1.includes(Se.key) && G) {
      const { unselectNodesAndEdges: xe, addSelectedEdges: Re } = I.getState();
      Se.key === "Escape" ? (le.current?.blur(), xe({ edges: [E] })) : Re([t]);
    }
  };
  return S.jsx("svg", { style: { zIndex: C }, children: S.jsxs("g", { className: Ft([
    "react-flow__edge",
    `react-flow__edge-${B}`,
    E.className,
    T,
    {
      selected: E.selected,
      animated: E.animated,
      inactive: !G && !s,
      updating: $,
      selectable: G
    }
  ]), onClick: se, onDoubleClick: he, onContextMenu: me, onMouseEnter: W, onMouseMove: ge, onMouseLeave: ze, onKeyDown: V ? Ce : void 0, tabIndex: V ? 0 : void 0, role: E.ariaRole ?? (V ? "group" : "img"), "aria-roledescription": "edge", "data-id": t, "data-testid": `rf__edge-${t}`, "aria-label": E.ariaLabel === null ? void 0 : E.ariaLabel || `Edge from ${E.source} to ${E.target}`, "aria-describedby": V ? `${px}-${w}` : void 0, ref: le, ...E.domAttributes, children: [!re && S.jsx(H, { id: t, source: E.source, target: E.target, type: E.type, selected: E.selected, animated: E.animated, selectable: G, deletable: E.deletable ?? !0, label: E.label, labelStyle: E.labelStyle, labelShowBg: E.labelShowBg, labelBgStyle: E.labelBgStyle, labelBgPadding: E.labelBgPadding, labelBgBorderRadius: E.labelBgBorderRadius, sourceX: z, sourceY: Y, targetX: X, targetY: te, sourcePosition: A, targetPosition: k, data: E.data, style: E.style, sourceHandleId: E.sourceHandle, targetHandleId: E.targetHandle, markerStart: F, markerEnd: ee, pathOptions: "pathOptions" in E ? E.pathOptions : void 0, interactionWidth: E.interactionWidth }), D && S.jsx(cA, { edge: E, isReconnectable: D, reconnectRadius: y, onReconnect: p, onReconnectStart: v, onReconnectEnd: b, sourceX: z, sourceY: Y, targetX: X, targetY: te, sourcePosition: A, targetPosition: k, setUpdateHover: K, setReconnecting: j })] }) });
}
var dA = N.memo(fA);
const hA = (t) => ({
  edgesFocusable: t.edgesFocusable,
  edgesReconnectable: t.edgesReconnectable,
  elementsSelectable: t.elementsSelectable,
  connectionMode: t.connectionMode,
  onError: t.onError
});
function kx({ defaultMarkerColor: t, onlyRenderVisibleElements: a, rfId: r, edgeTypes: l, noPanClassName: s, onReconnect: u, onEdgeContextMenu: c, onEdgeMouseEnter: h, onEdgeMouseMove: g, onEdgeMouseLeave: m, onEdgeClick: y, reconnectRadius: p, onEdgeDoubleClick: v, onReconnectStart: b, onReconnectEnd: w, disableKeyboardA11y: R }) {
  const { edgesFocusable: T, edgesReconnectable: _, elementsSelectable: O, onError: E } = lt(hA, At), L = PD(a);
  return S.jsxs("div", { className: "react-flow__edges", children: [S.jsx(nA, { defaultColor: t, rfId: r }), L.map((B) => S.jsx(dA, { id: B, edgesFocusable: T, edgesReconnectable: _, elementsSelectable: O, noPanClassName: s, onReconnect: u, onContextMenu: c, onMouseEnter: h, onMouseMove: g, onMouseLeave: m, onClick: y, reconnectRadius: p, onDoubleClick: v, onReconnectStart: b, onReconnectEnd: w, rfId: r, onError: E, edgeTypes: l, disableKeyboardA11y: R }, B))] });
}
kx.displayName = "EdgeRenderer";
const mA = N.memo(kx), pA = (t) => `translate(${t.transform[0]}px,${t.transform[1]}px) scale(${t.transform[2]})`;
function gA({ children: t }) {
  const a = lt(pA);
  return S.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: a }, children: t });
}
function yA(t) {
  const a = lm(), r = N.useRef(!1);
  N.useEffect(() => {
    !r.current && a.viewportInitialized && t && (setTimeout(() => t(a), 1), r.current = !0);
  }, [t, a.viewportInitialized]);
}
const vA = (t) => t.panZoom?.syncViewport;
function bA(t) {
  const a = lt(vA), r = zt();
  return N.useEffect(() => {
    t && (a?.(t), r.setState({ transform: [t.x, t.y, t.zoom] }));
  }, [t, a]), null;
}
function xA(t) {
  return t.connection.inProgress ? { ...t.connection, to: _l(t.connection.to, t.transform) } : { ...t.connection };
}
function wA(t) {
  return xA;
}
function SA(t) {
  const a = wA();
  return lt(a, At);
}
const EA = (t) => ({
  nodesConnectable: t.nodesConnectable,
  isValid: t.connection.isValid,
  inProgress: t.connection.inProgress,
  width: t.width,
  height: t.height
});
function _A({ containerStyle: t, style: a, type: r, component: l }) {
  const { nodesConnectable: s, width: u, height: c, isValid: h, inProgress: g } = lt(EA, At);
  return !(u && s && g) ? null : S.jsx("svg", { style: t, width: u, height: c, className: "react-flow__connectionline react-flow__container", children: S.jsx("g", { className: Ft(["react-flow__connection", k1(h)]), children: S.jsx(Vx, { style: a, type: r, CustomComponent: l, isValid: h }) }) });
}
const Vx = ({ style: t, type: a = Yi.Bezier, CustomComponent: r, isValid: l }) => {
  const { inProgress: s, from: u, fromNode: c, fromHandle: h, fromPosition: g, to: m, toNode: y, toHandle: p, toPosition: v, pointer: b } = SA();
  if (!s)
    return;
  if (r)
    return S.jsx(r, { connectionLineType: a, connectionLineStyle: t, fromNode: c, fromHandle: h, fromX: u.x, fromY: u.y, toX: m.x, toY: m.y, fromPosition: g, toPosition: v, connectionStatus: k1(l), toNode: y, toHandle: p, pointer: b });
  let w = "";
  const R = {
    sourceX: u.x,
    sourceY: u.y,
    sourcePosition: g,
    targetX: m.x,
    targetY: m.y,
    targetPosition: v
  };
  switch (a) {
    case Yi.Bezier:
      [w] = P1(R);
      break;
    case Yi.SimpleBezier:
      [w] = Cx(R);
      break;
    case Yi.Step:
      [w] = ch({
        ...R,
        borderRadius: 0
      });
      break;
    case Yi.SmoothStep:
      [w] = ch(R);
      break;
    default:
      [w] = W1(R);
  }
  return S.jsx("path", { d: w, fill: "none", className: "react-flow__connection-path", style: t });
};
Vx.displayName = "ConnectionLine";
const NA = {};
function Bv(t = NA) {
  N.useRef(t), zt(), N.useEffect(() => {
  }, [t]);
}
function RA() {
  zt(), N.useRef(!1), N.useEffect(() => {
  }, []);
}
function qx({ nodeTypes: t, edgeTypes: a, onInit: r, onNodeClick: l, onEdgeClick: s, onNodeDoubleClick: u, onEdgeDoubleClick: c, onNodeMouseEnter: h, onNodeMouseMove: g, onNodeMouseLeave: m, onNodeContextMenu: y, onSelectionContextMenu: p, onSelectionStart: v, onSelectionEnd: b, connectionLineType: w, connectionLineStyle: R, connectionLineComponent: T, connectionLineContainerStyle: _, selectionKeyCode: O, selectionOnDrag: E, selectionMode: L, multiSelectionKeyCode: B, panActivationKeyCode: H, zoomActivationKeyCode: V, deleteKeyCode: D, onlyRenderVisibleElements: G, elementsSelectable: le, defaultViewport: $, translateExtent: K, minZoom: re, maxZoom: j, preventScrolling: I, defaultMarkerColor: C, zoomOnScroll: z, zoomOnPinch: Y, panOnScroll: X, panOnScrollSpeed: te, panOnScrollMode: A, zoomOnDoubleClick: k, panOnDrag: F, autoPanOnSelection: ee, onPaneClick: se, onPaneMouseEnter: he, onPaneMouseMove: me, onPaneMouseLeave: W, onPaneScroll: ge, onPaneContextMenu: ze, paneClickDistance: Ce, nodeClickDistance: Se, onEdgeContextMenu: xe, onEdgeMouseEnter: Re, onEdgeMouseMove: Ye, onEdgeMouseLeave: ft, reconnectRadius: Te, onReconnect: Ie, onReconnectStart: Be, onReconnectEnd: $e, noDragClassName: St, noWheelClassName: Je, noPanClassName: Qe, disableKeyboardA11y: Fe, nodeExtent: gt, rfId: yt, viewport: Xt, onViewportChange: jt }) {
  return Bv(t), Bv(a), RA(), yA(r), bA(Xt), S.jsx(qD, { onPaneClick: se, onPaneMouseEnter: he, onPaneMouseMove: me, onPaneMouseLeave: W, onPaneContextMenu: ze, onPaneScroll: ge, paneClickDistance: Ce, deleteKeyCode: D, selectionKeyCode: O, selectionOnDrag: E, selectionMode: L, onSelectionStart: v, onSelectionEnd: b, multiSelectionKeyCode: B, panActivationKeyCode: H, zoomActivationKeyCode: V, elementsSelectable: le, zoomOnScroll: z, zoomOnPinch: Y, zoomOnDoubleClick: k, panOnScroll: X, panOnScrollSpeed: te, panOnScrollMode: A, panOnDrag: F, autoPanOnSelection: ee, defaultViewport: $, translateExtent: K, minZoom: re, maxZoom: j, onSelectionContextMenu: p, preventScrolling: I, noDragClassName: St, noWheelClassName: Je, noPanClassName: Qe, disableKeyboardA11y: Fe, onViewportChange: jt, isControlledViewport: !!Xt, children: S.jsxs(gA, { children: [S.jsx(mA, { edgeTypes: a, onEdgeClick: s, onEdgeDoubleClick: c, onReconnect: Ie, onReconnectStart: Be, onReconnectEnd: $e, onlyRenderVisibleElements: G, onEdgeContextMenu: xe, onEdgeMouseEnter: Re, onEdgeMouseMove: Ye, onEdgeMouseLeave: ft, reconnectRadius: Te, defaultMarkerColor: C, noPanClassName: Qe, disableKeyboardA11y: Fe, rfId: yt }), S.jsx(_A, { style: R, type: w, component: T, containerStyle: _ }), S.jsx("div", { className: "react-flow__edgelabel-renderer" }), S.jsx(KD, { nodeTypes: t, onNodeClick: l, onNodeDoubleClick: u, onNodeMouseEnter: h, onNodeMouseMove: g, onNodeMouseLeave: m, onNodeContextMenu: y, nodeClickDistance: Se, onlyRenderVisibleElements: G, noPanClassName: Qe, noDragClassName: St, disableKeyboardA11y: Fe, nodeExtent: gt, rfId: yt }), S.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
qx.displayName = "GraphView";
const CA = N.memo(qx), TA = X1(), Uv = ({ nodes: t, edges: a, defaultNodes: r, defaultEdges: l, width: s, height: u, fitView: c, fitViewOptions: h, minZoom: g = 0.5, maxZoom: m = 2, nodeOrigin: y, nodeExtent: p, zIndexMode: v = "basic" } = {}) => {
  const b = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map(), R = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Map(), _ = l ?? a ?? [], O = r ?? t ?? [], E = y ?? [0, 0], L = p ?? jo;
  nx(R, T, _);
  const { nodesInitialized: B } = dh(O, b, w, {
    nodeOrigin: E,
    nodeExtent: L,
    zIndexMode: v
  });
  let H = [0, 0, 1];
  if (c && s && u) {
    const V = Fo(b, {
      filter: ($) => !!(($.width || $.initialWidth) && ($.height || $.initialHeight))
    }), { x: D, y: G, zoom: le } = Wh(V, s, u, g, m, h?.padding ?? 0.1);
    H = [D, G, le];
  }
  return {
    rfId: "1",
    width: s ?? 0,
    height: u ?? 0,
    transform: H,
    nodes: O,
    nodesInitialized: B,
    nodeLookup: b,
    parentLookup: w,
    edges: _,
    edgeLookup: T,
    connectionLookup: R,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: r !== void 0,
    hasDefaultEdges: l !== void 0,
    panZoom: null,
    minZoom: g,
    maxZoom: m,
    translateExtent: jo,
    nodeExtent: L,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: vl.Strict,
    domNode: null,
    paneDragging: !1,
    noPanClassName: "nopan",
    nodeOrigin: E,
    nodeDragThreshold: 1,
    connectionDragThreshold: 1,
    snapGrid: [15, 15],
    snapToGrid: !1,
    nodesDraggable: !0,
    nodesConnectable: !0,
    nodesFocusable: !0,
    edgesFocusable: !0,
    edgesReconnectable: !0,
    elementsSelectable: !0,
    elevateNodesOnSelect: !0,
    elevateEdgesOnSelect: !0,
    selectNodesOnDrag: !0,
    multiSelectionActive: !1,
    fitViewQueued: c ?? !1,
    fitViewOptions: h,
    fitViewResolver: null,
    connection: { ...U1 },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: TA,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: B1,
    zIndexMode: v,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, MA = ({ nodes: t, edges: a, defaultNodes: r, defaultEdges: l, width: s, height: u, fitView: c, fitViewOptions: h, minZoom: g, maxZoom: m, nodeOrigin: y, nodeExtent: p, zIndexMode: v }) => VM((b, w) => {
  async function R() {
    const { nodeLookup: T, panZoom: _, fitViewOptions: O, fitViewResolver: E, width: L, height: B, minZoom: H, maxZoom: V } = w();
    _ && (await BT({
      nodes: T,
      width: L,
      height: B,
      panZoom: _,
      minZoom: H,
      maxZoom: V
    }, O), E?.resolve(!0), b({ fitViewResolver: null }));
  }
  return {
    ...Uv({
      nodes: t,
      edges: a,
      width: s,
      height: u,
      fitView: c,
      fitViewOptions: h,
      minZoom: g,
      maxZoom: m,
      nodeOrigin: y,
      nodeExtent: p,
      defaultNodes: r,
      defaultEdges: l,
      zIndexMode: v
    }),
    setNodes: (T) => {
      const { nodeLookup: _, parentLookup: O, nodeOrigin: E, elevateNodesOnSelect: L, fitViewQueued: B, zIndexMode: H, nodesSelectionActive: V } = w(), { nodesInitialized: D, hasSelectedNodes: G } = dh(T, _, O, {
        nodeOrigin: E,
        nodeExtent: p,
        elevateNodesOnSelect: L,
        checkEquality: !0,
        zIndexMode: H
      }), le = V && G;
      B && D ? (R(), b({
        nodes: T,
        nodesInitialized: D,
        fitViewQueued: !1,
        fitViewOptions: void 0,
        nodesSelectionActive: le
      })) : b({ nodes: T, nodesInitialized: D, nodesSelectionActive: le });
    },
    setEdges: (T) => {
      const { connectionLookup: _, edgeLookup: O } = w();
      nx(_, O, T), b({ edges: T });
    },
    setDefaultNodesAndEdges: (T, _) => {
      if (T) {
        const { setNodes: O } = w();
        O(T), b({ hasDefaultNodes: !0 });
      }
      if (_) {
        const { setEdges: O } = w();
        O(_), b({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registered at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (T) => {
      const { triggerNodeChanges: _, nodeLookup: O, parentLookup: E, domNode: L, nodeOrigin: B, nodeExtent: H, debug: V, fitViewQueued: D, zIndexMode: G } = w(), { changes: le, updatedInternals: $ } = lM(T, O, E, L, B, H, G);
      $ && (nM(O, E, { nodeOrigin: B, nodeExtent: H, zIndexMode: G }), D ? (R(), b({ fitViewQueued: !1, fitViewOptions: void 0 })) : b({}), le?.length > 0 && (V && console.log("React Flow: trigger node changes", le), _?.(le)));
    },
    updateNodePositions: (T, _ = !1) => {
      const O = [];
      let E = [];
      const { nodeLookup: L, triggerNodeChanges: B, connection: H, updateConnection: V, onNodesChangeMiddlewareMap: D } = w();
      for (const [G, le] of T) {
        const $ = L.get(G), K = !!($?.expandParent && $?.parentId && le?.position), re = {
          id: G,
          type: "position",
          position: K ? {
            x: Math.max(0, le.position.x),
            y: Math.max(0, le.position.y)
          } : le.position,
          dragging: _
        };
        if ($ && H.inProgress && H.fromNode.id === $.id) {
          const j = Er($, H.fromHandle, Ae.Left, !0);
          V({ ...H, from: j });
        }
        K && $.parentId && O.push({
          id: G,
          parentId: $.parentId,
          rect: {
            ...le.internals.positionAbsolute,
            width: le.measured.width ?? 0,
            height: le.measured.height ?? 0
          }
        }), E.push(re);
      }
      if (O.length > 0) {
        const { parentLookup: G, nodeOrigin: le } = w(), $ = rm(O, L, G, le);
        E.push(...$);
      }
      for (const G of D.values())
        E = G(E);
      B(E);
    },
    triggerNodeChanges: (T) => {
      const { onNodesChange: _, setNodes: O, nodes: E, hasDefaultNodes: L, debug: B } = w();
      if (T?.length) {
        if (L) {
          const H = uD(T, E);
          O(H);
        }
        B && console.log("React Flow: trigger node changes", T), _?.(T);
      }
    },
    triggerEdgeChanges: (T) => {
      const { onEdgesChange: _, setEdges: O, edges: E, hasDefaultEdges: L, debug: B } = w();
      if (T?.length) {
        if (L) {
          const H = cD(T, E);
          O(H);
        }
        B && console.log("React Flow: trigger edge changes", T), _?.(T);
      }
    },
    addSelectedNodes: (T) => {
      const { multiSelectionActive: _, edgeLookup: O, nodeLookup: E, triggerNodeChanges: L, triggerEdgeChanges: B } = w();
      if (_) {
        const H = T.map((V) => hr(V, !0));
        L(H);
        return;
      }
      L(fl(E, /* @__PURE__ */ new Set([...T]), !0)), B(fl(O));
    },
    addSelectedEdges: (T) => {
      const { multiSelectionActive: _, edgeLookup: O, nodeLookup: E, triggerNodeChanges: L, triggerEdgeChanges: B } = w();
      if (_) {
        const H = T.map((V) => hr(V, !0));
        B(H);
        return;
      }
      B(fl(O, /* @__PURE__ */ new Set([...T]))), L(fl(E, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: T, edges: _ } = {}) => {
      const { edges: O, nodes: E, nodeLookup: L, triggerNodeChanges: B, triggerEdgeChanges: H } = w(), V = T || E, D = _ || O, G = [];
      for (const $ of V) {
        if (!$.selected)
          continue;
        const K = L.get($.id);
        K && (K.selected = !1), G.push(hr($.id, !1));
      }
      const le = [];
      for (const $ of D)
        $.selected && le.push(hr($.id, !1));
      B(G), H(le);
    },
    setMinZoom: (T) => {
      const { panZoom: _, maxZoom: O } = w();
      _?.setScaleExtent([T, O]), b({ minZoom: T });
    },
    setMaxZoom: (T) => {
      const { panZoom: _, minZoom: O } = w();
      _?.setScaleExtent([O, T]), b({ maxZoom: T });
    },
    setTranslateExtent: (T) => {
      w().panZoom?.setTranslateExtent(T), b({ translateExtent: T });
    },
    resetSelectedElements: () => {
      const { edges: T, nodes: _, triggerNodeChanges: O, triggerEdgeChanges: E, elementsSelectable: L } = w();
      if (!L)
        return;
      const B = _.reduce((V, D) => D.selected ? [...V, hr(D.id, !1)] : V, []), H = T.reduce((V, D) => D.selected ? [...V, hr(D.id, !1)] : V, []);
      O(B), E(H);
    },
    setNodeExtent: (T) => {
      const { nodes: _, nodeLookup: O, parentLookup: E, nodeOrigin: L, elevateNodesOnSelect: B, nodeExtent: H, zIndexMode: V } = w();
      T[0][0] === H[0][0] && T[0][1] === H[0][1] && T[1][0] === H[1][0] && T[1][1] === H[1][1] || (dh(_, O, E, {
        nodeOrigin: L,
        nodeExtent: T,
        elevateNodesOnSelect: B,
        checkEquality: !1,
        zIndexMode: V
      }), b({ nodeExtent: T }));
    },
    panBy: (T) => {
      const { transform: _, width: O, height: E, panZoom: L, translateExtent: B } = w();
      return oM({ delta: T, panZoom: L, transform: _, translateExtent: B, width: O, height: E });
    },
    setCenter: async (T, _, O) => {
      const { width: E, height: L, maxZoom: B, panZoom: H } = w();
      if (!H)
        return !1;
      const V = typeof O?.zoom < "u" ? O.zoom : B;
      return await H.setViewport({
        x: E / 2 - T * V,
        y: L / 2 - _ * V,
        zoom: V
      }, { duration: O?.duration, ease: O?.ease, interpolate: O?.interpolate }), !0;
    },
    cancelConnection: () => {
      b({
        connection: { ...U1 }
      });
    },
    updateConnection: (T) => {
      b({ connection: T });
    },
    reset: () => b({ ...Uv() })
  };
}, Object.is);
function Yx({ initialNodes: t, initialEdges: a, defaultNodes: r, defaultEdges: l, initialWidth: s, initialHeight: u, initialMinZoom: c, initialMaxZoom: h, initialFitViewOptions: g, fitView: m, nodeOrigin: y, nodeExtent: p, zIndexMode: v, children: b }) {
  const [w] = N.useState(() => MA({
    nodes: t,
    edges: a,
    defaultNodes: r,
    defaultEdges: l,
    width: s,
    height: u,
    fitView: m,
    minZoom: c,
    maxZoom: h,
    fitViewOptions: g,
    nodeOrigin: y,
    nodeExtent: p,
    zIndexMode: v
  }));
  return S.jsx($M, { value: w, children: S.jsx(gD, { children: b }) });
}
function DA({ children: t, nodes: a, edges: r, defaultNodes: l, defaultEdges: s, width: u, height: c, fitView: h, fitViewOptions: g, minZoom: m, maxZoom: y, nodeOrigin: p, nodeExtent: v, zIndexMode: b }) {
  return N.useContext(fc) ? S.jsx(S.Fragment, { children: t }) : S.jsx(Yx, { initialNodes: a, initialEdges: r, defaultNodes: l, defaultEdges: s, initialWidth: u, initialHeight: c, fitView: h, initialFitViewOptions: g, initialMinZoom: m, initialMaxZoom: y, nodeOrigin: p, nodeExtent: v, zIndexMode: b, children: t });
}
const AA = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function zA({ nodes: t, edges: a, defaultNodes: r, defaultEdges: l, className: s, nodeTypes: u, edgeTypes: c, onNodeClick: h, onEdgeClick: g, onInit: m, onMove: y, onMoveStart: p, onMoveEnd: v, onConnect: b, onConnectStart: w, onConnectEnd: R, onClickConnectStart: T, onClickConnectEnd: _, onNodeMouseEnter: O, onNodeMouseMove: E, onNodeMouseLeave: L, onNodeContextMenu: B, onNodeDoubleClick: H, onNodeDragStart: V, onNodeDrag: D, onNodeDragStop: G, onNodesDelete: le, onEdgesDelete: $, onDelete: K, onSelectionChange: re, onSelectionDragStart: j, onSelectionDrag: I, onSelectionDragStop: C, onSelectionContextMenu: z, onSelectionStart: Y, onSelectionEnd: X, onBeforeDelete: te, connectionMode: A, connectionLineType: k = Yi.Bezier, connectionLineStyle: F, connectionLineComponent: ee, connectionLineContainerStyle: se, deleteKeyCode: he = "Backspace", selectionKeyCode: me = "Shift", selectionOnDrag: W = !1, selectionMode: ge = Ho.Full, panActivationKeyCode: ze = "Space", multiSelectionKeyCode: Ce = Uo() ? "Meta" : "Control", zoomActivationKeyCode: Se = Uo() ? "Meta" : "Control", snapToGrid: xe, snapGrid: Re, onlyRenderVisibleElements: Ye = !1, selectNodesOnDrag: ft, nodesDraggable: Te, autoPanOnNodeFocus: Ie, nodesConnectable: Be, nodesFocusable: $e, nodeOrigin: St = gx, edgesFocusable: Je, edgesReconnectable: Qe, elementsSelectable: Fe = !0, defaultViewport: gt = nD, minZoom: yt = 0.5, maxZoom: Xt = 2, translateExtent: jt = jo, preventScrolling: mt = !0, nodeExtent: ot, defaultMarkerColor: Yn = "#b1b1b7", zoomOnScroll: yn = !0, zoomOnPinch: tn = !0, panOnScroll: Kt = !1, panOnScrollSpeed: Ot = 0.5, panOnScrollMode: kt = vr.Free, zoomOnDoubleClick: ci = !0, panOnDrag: wa = !0, onPaneClick: vn, onPaneMouseEnter: ra, onPaneMouseMove: Mn, onPaneMouseLeave: $n, onPaneScroll: un, onPaneContextMenu: He, paneClickDistance: vt = 1, nodeClickDistance: Ht = 0, children: Vt, onReconnect: mn, onReconnectStart: pt, onReconnectEnd: Pt, onEdgeContextMenu: la, onEdgeDoubleClick: Wt, onEdgeMouseEnter: U, onEdgeMouseMove: Q, onEdgeMouseLeave: J, reconnectRadius: de = 10, onNodesChange: pe, onEdgesChange: Ee, noDragClassName: ve = "nodrag", noWheelClassName: we = "nowheel", noPanClassName: be = "nopan", fitView: Me, fitViewOptions: De, connectOnClick: ke, attributionPosition: Le, proOptions: Ge, defaultEdgeOptions: rt, elevateNodesOnSelect: Rt = !0, elevateEdgesOnSelect: st = !1, disableKeyboardA11y: We = !1, autoPanOnConnect: Lt, autoPanOnNodeDrag: at, autoPanOnSelection: Sa = !0, autoPanSpeed: Dn, connectionRadius: cn, isValidConnection: nn, onError: bn, style: fi, id: xn, nodeDragThreshold: di, connectionDragThreshold: oa, viewport: sa, onViewportChange: Ue, width: bt, height: pn, colorMode: An = "light", debug: hi, onScroll: Ha, ariaLabelConfig: dt, zIndexMode: Xn = "basic", ...an }, Ii) {
  const Rr = xn || "1", Nl = lD(An), mi = N.useCallback((Rl) => {
    Rl.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), Ha?.(Rl);
  }, [Ha]);
  return S.jsx("div", { "data-testid": "rf__wrapper", ...an, onScroll: mi, style: { ...fi, ...AA }, ref: Ii, className: Ft(["react-flow", s, Nl]), id: xn, role: "application", children: S.jsxs(DA, { nodes: t, edges: a, width: bt, height: pn, fitView: Me, fitViewOptions: De, minZoom: yt, maxZoom: Xt, nodeOrigin: St, nodeExtent: ot, zIndexMode: Xn, children: [S.jsx(rD, { nodes: t, edges: a, defaultNodes: r, defaultEdges: l, onConnect: b, onConnectStart: w, onConnectEnd: R, onClickConnectStart: T, onClickConnectEnd: _, nodesDraggable: Te, autoPanOnNodeFocus: Ie, nodesConnectable: Be, nodesFocusable: $e, edgesFocusable: Je, edgesReconnectable: Qe, elementsSelectable: Fe, elevateNodesOnSelect: Rt, elevateEdgesOnSelect: st, minZoom: yt, maxZoom: Xt, nodeExtent: ot, onNodesChange: pe, onEdgesChange: Ee, snapToGrid: xe, snapGrid: Re, connectionMode: A, translateExtent: jt, connectOnClick: ke, defaultEdgeOptions: rt, fitView: Me, fitViewOptions: De, onNodesDelete: le, onEdgesDelete: $, onDelete: K, onNodeDragStart: V, onNodeDrag: D, onNodeDragStop: G, onSelectionDrag: I, onSelectionDragStart: j, onSelectionDragStop: C, onMove: y, onMoveStart: p, onMoveEnd: v, noPanClassName: be, nodeOrigin: St, rfId: Rr, autoPanOnConnect: Lt, autoPanOnNodeDrag: at, autoPanSpeed: Dn, onError: bn, connectionRadius: cn, isValidConnection: nn, selectNodesOnDrag: ft, nodeDragThreshold: di, connectionDragThreshold: oa, onBeforeDelete: te, debug: hi, ariaLabelConfig: dt, zIndexMode: Xn }), S.jsx(CA, { onInit: m, onNodeClick: h, onEdgeClick: g, onNodeMouseEnter: O, onNodeMouseMove: E, onNodeMouseLeave: L, onNodeContextMenu: B, onNodeDoubleClick: H, nodeTypes: u, edgeTypes: c, connectionLineType: k, connectionLineStyle: F, connectionLineComponent: ee, connectionLineContainerStyle: se, selectionKeyCode: me, selectionOnDrag: W, selectionMode: ge, deleteKeyCode: he, multiSelectionKeyCode: Ce, panActivationKeyCode: ze, zoomActivationKeyCode: Se, onlyRenderVisibleElements: Ye, defaultViewport: gt, translateExtent: jt, minZoom: yt, maxZoom: Xt, preventScrolling: mt, zoomOnScroll: yn, zoomOnPinch: tn, zoomOnDoubleClick: ci, panOnScroll: Kt, panOnScrollSpeed: Ot, panOnScrollMode: kt, panOnDrag: wa, autoPanOnSelection: Sa, onPaneClick: vn, onPaneMouseEnter: ra, onPaneMouseMove: Mn, onPaneMouseLeave: $n, onPaneScroll: un, onPaneContextMenu: He, paneClickDistance: vt, nodeClickDistance: Ht, onSelectionContextMenu: z, onSelectionStart: Y, onSelectionEnd: X, onReconnect: mn, onReconnectStart: pt, onReconnectEnd: Pt, onEdgeContextMenu: la, onEdgeDoubleClick: Wt, onEdgeMouseEnter: U, onEdgeMouseMove: Q, onEdgeMouseLeave: J, reconnectRadius: de, defaultMarkerColor: Yn, noDragClassName: ve, noWheelClassName: we, noPanClassName: be, rfId: Rr, disableKeyboardA11y: We, nodeExtent: ot, viewport: sa, onViewportChange: Ue }), S.jsx(tD, { onSelectionChange: re }), Vt, S.jsx(KM, { proOptions: Ge, position: Le }), S.jsx(FM, { rfId: Rr, disableKeyboardA11y: We })] }) });
}
var OA = vx(zA);
function LA({ dimensions: t, lineWidth: a, variant: r, className: l }) {
  return S.jsx("path", { strokeWidth: a, d: `M${t[0] / 2} 0 V${t[1]} M0 ${t[1] / 2} H${t[0]}`, className: Ft(["react-flow__background-pattern", r, l]) });
}
function jA({ radius: t, className: a }) {
  return S.jsx("circle", { cx: t, cy: t, r: t, className: Ft(["react-flow__background-pattern", "dots", a]) });
}
var Oa;
(function(t) {
  t.Lines = "lines", t.Dots = "dots", t.Cross = "cross";
})(Oa || (Oa = {}));
const HA = {
  [Oa.Dots]: 1,
  [Oa.Lines]: 1,
  [Oa.Cross]: 6
}, BA = (t) => ({ transform: t.transform, patternId: `pattern-${t.rfId}` });
function $x({
  id: t,
  variant: a = Oa.Dots,
  // only used for dots and cross
  gap: r = 20,
  // only used for lines and cross
  size: l,
  lineWidth: s = 1,
  offset: u = 0,
  color: c,
  bgColor: h,
  style: g,
  className: m,
  patternClassName: y
}) {
  const p = N.useRef(null), { transform: v, patternId: b } = lt(BA, At), w = l || HA[a], R = a === Oa.Dots, T = a === Oa.Cross, _ = Array.isArray(r) ? r : [r, r], O = [_[0] * v[2] || 1, _[1] * v[2] || 1], E = w * v[2], L = Array.isArray(u) ? u : [u, u], B = T ? [E, E] : O, H = [
    L[0] * v[2] || 1 + B[0] / 2,
    L[1] * v[2] || 1 + B[1] / 2
  ], V = `${b}${t || ""}`;
  return S.jsxs("svg", { className: Ft(["react-flow__background", m]), style: {
    ...g,
    ...hc,
    "--xy-background-color-props": h,
    "--xy-background-pattern-color-props": c
  }, ref: p, "data-testid": "rf__background", children: [S.jsx("pattern", { id: V, x: v[0] % O[0], y: v[1] % O[1], width: O[0], height: O[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${H[0]},-${H[1]})`, children: R ? S.jsx(jA, { radius: E / 2, className: y }) : S.jsx(LA, { dimensions: B, lineWidth: s, variant: a, className: y }) }), S.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${V})` })] });
}
$x.displayName = "Background";
const kv = N.memo($x);
function UA() {
  return S.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: S.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function kA() {
  return S.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: S.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function VA() {
  return S.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: S.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function qA() {
  return S.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: S.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function YA() {
  return S.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: S.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function vu({ children: t, className: a, ...r }) {
  return S.jsx("button", { type: "button", className: Ft(["react-flow__controls-button", a]), ...r, children: t });
}
const $A = (t) => ({
  isInteractive: t.nodesDraggable || t.nodesConnectable || t.elementsSelectable,
  minZoomReached: t.transform[2] <= t.minZoom,
  maxZoomReached: t.transform[2] >= t.maxZoom,
  ariaLabelConfig: t.ariaLabelConfig
});
function Xx({ style: t, showZoom: a = !0, showFitView: r = !0, showInteractive: l = !0, fitViewOptions: s, onZoomIn: u, onZoomOut: c, onFitView: h, onInteractiveChange: g, className: m, children: y, position: p = "bottom-left", orientation: v = "vertical", "aria-label": b }) {
  const w = zt(), { isInteractive: R, minZoomReached: T, maxZoomReached: _, ariaLabelConfig: O } = lt($A, At), { zoomIn: E, zoomOut: L, fitView: B } = lm(), H = () => {
    E(), u?.();
  }, V = () => {
    L(), c?.();
  }, D = () => {
    B(s), h?.();
  }, G = () => {
    w.setState({
      nodesDraggable: !R,
      nodesConnectable: !R,
      elementsSelectable: !R
    }), g?.(!R);
  }, le = v === "horizontal" ? "horizontal" : "vertical";
  return S.jsxs(dc, { className: Ft(["react-flow__controls", le, m]), position: p, style: t, "data-testid": "rf__controls", "aria-label": b ?? O["controls.ariaLabel"], children: [a && S.jsxs(S.Fragment, { children: [S.jsx(vu, { onClick: H, className: "react-flow__controls-zoomin", title: O["controls.zoomIn.ariaLabel"], "aria-label": O["controls.zoomIn.ariaLabel"], disabled: _, children: S.jsx(UA, {}) }), S.jsx(vu, { onClick: V, className: "react-flow__controls-zoomout", title: O["controls.zoomOut.ariaLabel"], "aria-label": O["controls.zoomOut.ariaLabel"], disabled: T, children: S.jsx(kA, {}) })] }), r && S.jsx(vu, { className: "react-flow__controls-fitview", onClick: D, title: O["controls.fitView.ariaLabel"], "aria-label": O["controls.fitView.ariaLabel"], children: S.jsx(VA, {}) }), l && S.jsx(vu, { className: "react-flow__controls-interactive", onClick: G, title: O["controls.interactive.ariaLabel"], "aria-label": O["controls.interactive.ariaLabel"], children: R ? S.jsx(YA, {}) : S.jsx(qA, {}) }), y] });
}
Xx.displayName = "Controls";
const XA = N.memo(Xx);
function GA({ id: t, x: a, y: r, width: l, height: s, style: u, color: c, strokeColor: h, strokeWidth: g, className: m, borderRadius: y, shapeRendering: p, selected: v, onClick: b }) {
  const { background: w, backgroundColor: R } = u || {}, T = c || w || R;
  return S.jsx("rect", { className: Ft(["react-flow__minimap-node", { selected: v }, m]), x: a, y: r, rx: y, ry: y, width: l, height: s, style: {
    fill: T,
    stroke: h,
    strokeWidth: g
  }, shapeRendering: p, onClick: b ? (_) => b(_, t) : void 0 });
}
const IA = N.memo(GA), ZA = (t) => t.nodes.map((a) => a.id), $d = (t) => t instanceof Function ? t : () => t;
function QA({
  nodeStrokeColor: t,
  nodeColor: a,
  nodeClassName: r = "",
  nodeBorderRadius: l = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: u = IA,
  onClick: c
}) {
  const h = lt(ZA, At), g = $d(a), m = $d(t), y = $d(r), p = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return S.jsx(S.Fragment, { children: h.map((v) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    S.jsx(KA, { id: v, nodeColorFunc: g, nodeStrokeColorFunc: m, nodeClassNameFunc: y, nodeBorderRadius: l, nodeStrokeWidth: s, NodeComponent: u, onClick: c, shapeRendering: p }, v)
  )) });
}
function FA({ id: t, nodeColorFunc: a, nodeStrokeColorFunc: r, nodeClassNameFunc: l, nodeBorderRadius: s, nodeStrokeWidth: u, shapeRendering: c, NodeComponent: h, onClick: g }) {
  const { node: m, x: y, y: p, width: v, height: b } = lt((w) => {
    const R = w.nodeLookup.get(t);
    if (!R)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const T = R.internals.userNode, { x: _, y: O } = R.internals.positionAbsolute, { width: E, height: L } = ui(T);
    return {
      node: T,
      x: _,
      y: O,
      width: E,
      height: L
    };
  }, At);
  return !m || m.hidden || !G1(m) ? null : S.jsx(h, { x: y, y: p, width: v, height: b, style: m.style, selected: !!m.selected, className: l(m), color: a(m), borderRadius: s, strokeColor: r(m), strokeWidth: u, shapeRendering: c, onClick: g, id: m.id });
}
const KA = N.memo(FA);
var PA = N.memo(QA);
const JA = 200, WA = 150, e3 = (t) => !t.hidden, t3 = (t) => {
  const a = {
    x: -t.transform[0] / t.transform[2],
    y: -t.transform[1] / t.transform[2],
    width: t.width / t.transform[2],
    height: t.height / t.transform[2]
  };
  return {
    viewBB: a,
    boundingRect: t.nodeLookup.size > 0 ? $1(Fo(t.nodeLookup, { filter: e3 }), a) : a,
    rfId: t.rfId,
    panZoom: t.panZoom,
    translateExtent: t.translateExtent,
    flowWidth: t.width,
    flowHeight: t.height,
    ariaLabelConfig: t.ariaLabelConfig
  };
}, n3 = "react-flow__minimap-desc";
function Gx({
  style: t,
  className: a,
  nodeStrokeColor: r,
  nodeColor: l,
  nodeClassName: s = "",
  nodeBorderRadius: u = 5,
  nodeStrokeWidth: c,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: h,
  bgColor: g,
  maskColor: m,
  maskStrokeColor: y,
  maskStrokeWidth: p,
  position: v = "bottom-right",
  onClick: b,
  onNodeClick: w,
  pannable: R = !1,
  zoomable: T = !1,
  ariaLabel: _,
  inversePan: O,
  zoomStep: E = 1,
  offsetScale: L = 5
}) {
  const B = zt(), H = N.useRef(null), { boundingRect: V, viewBB: D, rfId: G, panZoom: le, translateExtent: $, flowWidth: K, flowHeight: re, ariaLabelConfig: j } = lt(t3, At), I = t?.width ?? JA, C = t?.height ?? WA, z = V.width / I, Y = V.height / C, X = Math.max(z, Y), te = X * I, A = X * C, k = L * X, F = V.x - (te - V.width) / 2 - k, ee = V.y - (A - V.height) / 2 - k, se = te + k * 2, he = A + k * 2, me = `${n3}-${G}`, W = N.useRef(0), ge = N.useRef();
  W.current = X, N.useEffect(() => {
    if (H.current && le)
      return ge.current = gM({
        domNode: H.current,
        panZoom: le,
        getTransform: () => B.getState().transform,
        getViewScale: () => W.current
      }), () => {
        ge.current?.destroy();
      };
  }, [le]), N.useEffect(() => {
    ge.current?.update({
      translateExtent: $,
      width: K,
      height: re,
      inversePan: O,
      pannable: R,
      zoomStep: E,
      zoomable: T
    });
  }, [R, T, O, E, $, K, re]);
  const ze = b ? (xe) => {
    const [Re, Ye] = ge.current?.pointer(xe) || [0, 0];
    b(xe, { x: Re, y: Ye });
  } : void 0, Ce = w ? N.useCallback((xe, Re) => {
    const Ye = B.getState().nodeLookup.get(Re).internals.userNode;
    w(xe, Ye);
  }, []) : void 0, Se = _ ?? j["minimap.ariaLabel"];
  return S.jsx(dc, { position: v, style: {
    ...t,
    "--xy-minimap-background-color-props": typeof g == "string" ? g : void 0,
    "--xy-minimap-mask-background-color-props": typeof m == "string" ? m : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof y == "string" ? y : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof p == "number" ? p * X : void 0,
    "--xy-minimap-node-background-color-props": typeof l == "string" ? l : void 0,
    "--xy-minimap-node-stroke-color-props": typeof r == "string" ? r : void 0,
    "--xy-minimap-node-stroke-width-props": typeof c == "number" ? c : void 0
  }, className: Ft(["react-flow__minimap", a]), "data-testid": "rf__minimap", children: S.jsxs("svg", { width: I, height: C, viewBox: `${F} ${ee} ${se} ${he}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": me, ref: H, onClick: ze, children: [Se && S.jsx("title", { id: me, children: Se }), S.jsx(PA, { onClick: Ce, nodeColor: l, nodeStrokeColor: r, nodeBorderRadius: u, nodeClassName: s, nodeStrokeWidth: c, nodeComponent: h }), S.jsx("path", { className: "react-flow__minimap-mask", d: `M${F - k},${ee - k}h${se + k * 2}v${he + k * 2}h${-se - k * 2}z
        M${D.x},${D.y}h${D.width}v${D.height}h${-D.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
Gx.displayName = "MiniMap";
const a3 = N.memo(Gx), i3 = (t) => (a) => t ? `${Math.max(1 / a.transform[2], 1)}` : void 0, r3 = {
  [Sl.Line]: "right",
  [Sl.Handle]: "bottom-right"
};
function l3({ nodeId: t, position: a, variant: r = Sl.Handle, className: l, style: s = void 0, children: u, color: c, minWidth: h = 10, minHeight: g = 10, maxWidth: m = Number.MAX_VALUE, maxHeight: y = Number.MAX_VALUE, keepAspectRatio: p = !1, resizeDirection: v, autoScale: b = !0, shouldResize: w, onResizeStart: R, onResize: T, onResizeEnd: _ }) {
  const O = Sx(), E = typeof t == "string" ? t : O, L = zt(), B = N.useRef(null), H = r === Sl.Handle, V = lt(N.useCallback(i3(H && b), [H, b]), At), D = N.useRef(null), G = a ?? r3[r];
  N.useEffect(() => {
    if (!(!B.current || !E))
      return D.current || (D.current = MM({
        domNode: B.current,
        nodeId: E,
        getStoreItems: () => {
          const { nodeLookup: $, transform: K, snapGrid: re, snapToGrid: j, nodeOrigin: I, domNode: C } = L.getState();
          return {
            nodeLookup: $,
            transform: K,
            snapGrid: re,
            snapToGrid: j,
            nodeOrigin: I,
            paneDomNode: C
          };
        },
        onChange: ($, K) => {
          const { triggerNodeChanges: re, nodeLookup: j, parentLookup: I, nodeOrigin: C } = L.getState(), z = [], Y = { x: $.x, y: $.y }, X = j.get(E);
          if (X && X.expandParent && X.parentId) {
            const te = X.origin ?? C, A = $.width ?? X.measured.width ?? 0, k = $.height ?? X.measured.height ?? 0, F = {
              id: X.id,
              parentId: X.parentId,
              rect: {
                width: A,
                height: k,
                ...I1({
                  x: $.x ?? X.position.x,
                  y: $.y ?? X.position.y
                }, { width: A, height: k }, X.parentId, j, te)
              }
            }, ee = rm([F], j, I, C);
            z.push(...ee), Y.x = $.x ? Math.max(te[0] * A, $.x) : void 0, Y.y = $.y ? Math.max(te[1] * k, $.y) : void 0;
          }
          if (Y.x !== void 0 && Y.y !== void 0) {
            const te = {
              id: E,
              type: "position",
              position: { ...Y }
            };
            z.push(te);
          }
          if ($.width !== void 0 && $.height !== void 0) {
            const A = {
              id: E,
              type: "dimensions",
              resizing: !0,
              setAttributes: v ? v === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: $.width,
                height: $.height
              }
            };
            z.push(A);
          }
          for (const te of K) {
            const A = {
              ...te,
              type: "position"
            };
            z.push(A);
          }
          re(z);
        },
        onEnd: ({ width: $, height: K }) => {
          const re = {
            id: E,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: $,
              height: K
            }
          };
          L.getState().triggerNodeChanges([re]);
        }
      })), D.current.update({
        controlPosition: G,
        boundaries: {
          minWidth: h,
          minHeight: g,
          maxWidth: m,
          maxHeight: y
        },
        keepAspectRatio: p,
        resizeDirection: v,
        onResizeStart: R,
        onResize: T,
        onResizeEnd: _,
        shouldResize: w
      }), () => {
        D.current?.destroy();
      };
  }, [
    G,
    h,
    g,
    m,
    y,
    p,
    R,
    T,
    _,
    w
  ]);
  const le = G.split("-");
  return S.jsx("div", { className: Ft(["react-flow__resize-control", "nodrag", ...le, r, l]), ref: B, style: {
    ...s,
    scale: V,
    ...c && { [H ? "backgroundColor" : "borderColor"]: c }
  }, children: u });
}
N.memo(l3);
var o3 = "_1bllf8b0", s3 = "_1bllf8b1";
const Vv = 16, u3 = "rgba(186, 158, 255, 0.14)", c3 = "rgba(186, 158, 255, 0.06)", f3 = "rgba(0, 0, 0, 0.6)", d3 = "#1d2023", h3 = "#ba9eff";
function m3({
  nodes: t,
  edges: a,
  nodeTypes: r,
  showMiniMap: l = !0,
  showControls: s = !0,
  fitView: u = !0,
  className: c,
  ariaLabel: h,
  children: g,
  onNodeClick: m
}) {
  const y = [o3, c].filter(Boolean).join(" ");
  return /* @__PURE__ */ S.jsx("div", { className: y, "aria-label": h ?? "node graph", children: /* @__PURE__ */ S.jsxs(
    OA,
    {
      nodes: t,
      edges: a,
      ...r ? { nodeTypes: r } : {},
      fitView: u,
      fitViewOptions: { padding: 0.2 },
      nodesDraggable: !1,
      nodesConnectable: !1,
      elementsSelectable: !0,
      minZoom: 0.2,
      maxZoom: 1.8,
      proOptions: { hideAttribution: !0 },
      onNodeClick: (p, v) => m?.(v),
      children: [
        /* @__PURE__ */ S.jsx(
          kv,
          {
            id: "minor",
            variant: Oa.Dots,
            gap: Vv,
            size: 1.1,
            color: u3
          }
        ),
        /* @__PURE__ */ S.jsx(
          kv,
          {
            id: "major",
            variant: Oa.Lines,
            gap: Vv * 5,
            lineWidth: 1,
            color: c3
          }
        ),
        s && /* @__PURE__ */ S.jsx(XA, { showInteractive: !1 }),
        l && /* @__PURE__ */ S.jsx(
          a3,
          {
            pannable: !0,
            zoomable: !0,
            maskColor: f3,
            nodeColor: () => d3,
            nodeStrokeColor: () => h3,
            className: s3
          }
        ),
        g
      ]
    }
  ) });
}
function p3(t) {
  return /* @__PURE__ */ S.jsx(Yx, { children: /* @__PURE__ */ S.jsx(m3, { ...t }) });
}
var g3 = "a9gtw0", y3 = "a9gtw1", v3 = "a9gtw2", b3 = "a9gtw3", x3 = "a9gtw4", w3 = "a9gtw5";
const S3 = {
  default: "",
  raised: y3,
  inset: v3
};
function ni({
  title: t,
  description: a,
  actions: r,
  children: l,
  className: s,
  elevation: u = "default"
}) {
  const c = [g3, S3[u], s].filter(Boolean).join(" ");
  return /* @__PURE__ */ S.jsxs("section", { className: c, children: [
    (t || r) && /* @__PURE__ */ S.jsxs("header", { className: b3, children: [
      t && /* @__PURE__ */ S.jsx("span", { className: x3, children: t }),
      a && /* @__PURE__ */ S.jsx("span", { className: w3, children: a }),
      r
    ] }),
    l
  ] });
}
const sm = [
  "anchor",
  "qwen_edit",
  "diffusion",
  "stitch",
  "interpolate",
  "mux"
];
function um() {
  return {
    anchor: "idle",
    qwen_edit: "idle",
    diffusion: "idle",
    stitch: "idle",
    interpolate: "idle",
    mux: "idle"
  };
}
function Qu() {
  return {
    phase: "idle",
    jobId: null,
    overallFraction: 0,
    clipIndex: 0,
    numClips: 0,
    step: 0,
    totalSteps: 0,
    vramPeakGib: null,
    outputPath: null,
    renderReport: null,
    errorCode: null,
    errorMessage: null,
    stalled: !1,
    lastFrameAt: null,
    stageStates: um()
  };
}
function E3(t, a, r = Date.now()) {
  return {
    ...Qu(),
    phase: "running",
    jobId: t,
    lastFrameAt: r,
    stageStates: {
      ...um(),
      anchor: "done",
      qwen_edit: a ? "active" : "idle",
      diffusion: a ? "idle" : "active"
    }
  };
}
function _3(t, a, r = Date.now()) {
  const l = { ...t, stalled: !1, lastFrameAt: r };
  switch (a.method) {
    case "svi2.video.progress":
      return { ...l, overallFraction: T3(a.params.fraction) };
    case "svi2.video.clip.started":
      return {
        ...l,
        clipIndex: a.params.clip_index,
        numClips: a.params.num_clips,
        step: 0,
        stageStates: { ...l.stageStates, qwen_edit: M3(l, "qwen_edit"), diffusion: "active" }
      };
    case "svi2.video.clip.step":
      return {
        ...l,
        clipIndex: a.params.clip_index,
        step: a.params.step,
        totalSteps: a.params.total_steps
      };
    case "svi2.video.clip.completed":
      return {
        ...l,
        clipIndex: a.params.clip_index,
        numClips: a.params.num_clips,
        stageStates: a.params.clip_index >= a.params.num_clips - 1 ? { ...l.stageStates, diffusion: "done", stitch: "active" } : l.stageStates
      };
    case "runtime.memory_stats": {
      const s = a.params.vram_peak_gib ?? a.params.vram_used_gib ?? null;
      return s === null ? l : { ...l, vramPeakGib: Math.max(s, l.vramPeakGib ?? 0) };
    }
    case "svi2.video.done":
      return {
        ...l,
        phase: "done",
        overallFraction: 1,
        outputPath: a.params.output_path,
        renderReport: a.params.render_report ?? null,
        vramPeakGib: a.params.render_report?.vram_peak_gib ?? l.vramPeakGib,
        stageStates: {
          anchor: "done",
          qwen_edit: l.stageStates.qwen_edit === "idle" ? "idle" : "done",
          diffusion: "done",
          stitch: "done",
          interpolate: "done",
          mux: "done"
        }
      };
    case "svi2.video.error":
      return {
        ...l,
        phase: "error",
        errorCode: a.params.code,
        errorMessage: a.params.message,
        stageStates: Ix(l.stageStates)
      };
    default:
      return l;
  }
}
function N3(t) {
  return { ...t, phase: "cancelled", stageStates: um() };
}
const R3 = -32108;
function C3(t) {
  return {
    ...t,
    phase: "error",
    stalled: !1,
    errorCode: R3,
    errorMessage: "Lost connection to the render — it may still be running; check History.",
    stageStates: Ix(t.stageStates)
  };
}
function qv(t) {
  return t.phase !== "running" || t.stalled ? t : { ...t, stalled: !0 };
}
function Yv(t) {
  const a = Qu();
  return t.status === "succeeded" && t.outputPath ? {
    ...a,
    phase: "done",
    jobId: t.id,
    overallFraction: 1,
    outputPath: t.outputPath,
    renderReport: t.renderReport,
    vramPeakGib: t.renderReport?.vram_peak_gib ?? null,
    stageStates: {
      anchor: "done",
      qwen_edit: "done",
      diffusion: "done",
      stitch: "done",
      interpolate: "done",
      mux: "done"
    }
  } : t.status === "failed" ? {
    ...a,
    phase: "error",
    jobId: t.id,
    errorCode: t.errorCode,
    errorMessage: t.errorMessage
  } : t.status === "cancelled" ? { ...a, phase: "cancelled", jobId: t.id } : { ...a, jobId: t.id };
}
function T3(t) {
  return Number.isNaN(t) ? 0 : Math.min(1, Math.max(0, t));
}
function M3(t, a) {
  return t.stageStates[a] === "active" ? "done" : t.stageStates[a];
}
function Ix(t) {
  const a = { ...t };
  for (const r of sm)
    a[r] === "active" && (a[r] = "error");
  return a;
}
const Zx = [
  {
    id: "core",
    title: "Basics",
    description: "Resolution, length and playback — the essentials.",
    defaultCollapsed: !1
  },
  {
    id: "quality",
    title: "Quality",
    description: "Denoise steps, guidance, flow shift and seed.",
    defaultCollapsed: !1
  },
  {
    id: "coherence",
    title: "Coherence (canonical mechanics)",
    description: "Defaulted to canonical chaining. Change only for A/B.",
    defaultCollapsed: !0
  },
  {
    id: "transform",
    title: "Transform",
    description: "ICN conditioning noise. Off = rigid ref-lock (recommended).",
    defaultCollapsed: !0
  },
  {
    id: "identity",
    title: "Identity (advanced crutches)",
    description: "Off = canonical. Levers for off-budget drift only.",
    defaultCollapsed: !0
  },
  {
    id: "motion",
    title: "Motion (advanced, diagnostic)",
    description: "RoPE motion scaling. >1.5 deforms faces.",
    defaultCollapsed: !0
  },
  {
    id: "perf",
    title: "Performance / VRAM",
    description: "Block-swap. Higher = less VRAM (counterintuitive).",
    defaultCollapsed: !0
  }
], cm = [
  {
    key: "num_clips",
    label: "Clips",
    tier: "core",
    control: "number",
    min: 1,
    max: 64,
    step: 1,
    default: 5,
    help: "Number of chained clips. Longer take = more clips. Identity holds with one prompt."
  },
  {
    key: "frames_per_clip",
    label: "Frames per clip",
    tier: "core",
    control: "number",
    min: 5,
    max: 129,
    step: 4,
    default: 69,
    help: "Must be 4n+1 (49, 65, 69, 81). 69 @ 5 clips ≈ 20s."
  },
  {
    key: "width",
    label: "Width",
    tier: "core",
    control: "number",
    min: 16,
    max: 1280,
    step: 16,
    default: 832,
    help: "Must be divisible by 16. 832×480 is the trained 480p budget."
  },
  {
    key: "height",
    label: "Height",
    tier: "core",
    control: "number",
    min: 16,
    max: 1280,
    step: 16,
    default: 480,
    help: "Must be divisible by 16. Off-budget weakens identity-lock."
  },
  {
    key: "fps",
    label: "Render fps",
    tier: "core",
    control: "number",
    min: 1,
    max: 60,
    step: 1,
    default: 16,
    help: "Native render fps (playback speed). 16 is the SVI clip rate."
  },
  {
    key: "interpolate_fps",
    label: "Interpolate to fps",
    tier: "core",
    control: "number",
    min: 0,
    max: 120,
    step: 1,
    default: 48,
    help: "Post-render target fps. Adds in-between frames, no speed-up. 0 = off."
  },
  {
    key: "interpolate_method",
    label: "Interpolation",
    tier: "core",
    control: "select",
    default: "rife",
    options: [
      { value: "rife", label: "RIFE (auto)" },
      { value: "rife_torch", label: "RIFE torch" },
      { value: "rife_ncnn", label: "RIFE ncnn" },
      { value: "ffmpeg", label: "ffmpeg minterpolate" }
    ],
    help: "rife = torch IFNet on CUDA → ncnn → ffmpeg fallback."
  },
  {
    key: "num_inference_steps",
    label: "Steps",
    tier: "quality",
    control: "number",
    min: 1,
    max: 100,
    step: 1,
    default: 50,
    help: "Denoise steps per clip. 50 = SVI reference. Fewer = faster, lower quality."
  },
  {
    key: "cfg_scale",
    label: "Guidance (CFG)",
    tier: "quality",
    control: "slider",
    min: 1,
    max: 12,
    step: 0.5,
    default: 4,
    help: "SVI reference = 4.0. Higher = stronger prompt adherence (~1–6)."
  },
  {
    key: "sigma_shift",
    label: "Sigma shift",
    tier: "quality",
    control: "slider",
    min: 0,
    max: 20,
    step: 0.5,
    default: 5,
    help: "FlowMatch shift. Wan default 5.0. Lower (3.5–4.0) = more motion."
  },
  {
    key: "switch_boundary",
    label: "MoE switch boundary",
    tier: "quality",
    control: "slider",
    min: 0,
    max: 1,
    step: 0.05,
    default: 0.9,
    help: "High→low expert switch. Wan2.2 i2v = 0.9. Rarely changed."
  },
  {
    key: "seed_multiplier",
    label: "Seed multiplier",
    tier: "quality",
    control: "number",
    min: 0,
    max: 1e6,
    step: 1,
    default: 42,
    help: "Per-clip seed = seed × clip_idx. Clip 0 always seed 0. Fix for reproducibility."
  },
  {
    key: "pixel_re_encode",
    label: "Pixel re-encode",
    tier: "coherence",
    control: "toggle",
    default: !1,
    help: "Keep OFF (canonical). On = decode→re-encode tail, injects drift. A/B only."
  },
  {
    key: "stitch_mode",
    label: "Stitch mode",
    tier: "coherence",
    control: "select",
    default: "trim",
    options: [
      { value: "trim", label: "Trim (canonical)" },
      { value: "crossfade", label: "Crossfade" }
    ],
    help: "trim = concat + drop overlap (canonical). crossfade = blend seams."
  },
  {
    key: "num_overlap_frame",
    label: "Overlap frames",
    tier: "coherence",
    control: "number",
    min: 1,
    max: 8,
    step: 1,
    default: 5,
    help: "Frames overlapped between clips. SVI reference = 5."
  },
  {
    key: "num_motion_latent",
    label: "Motion latent frames",
    tier: "coherence",
    control: "number",
    min: 0,
    max: 5,
    step: 1,
    default: 1,
    help: "Latent frames carried as motion conditioning. SVI = 1. Higher can freeze motion."
  },
  {
    key: "num_motion_frame",
    label: "Motion tail frames",
    tier: "coherence",
    control: "number",
    min: 1,
    max: 16,
    step: 1,
    default: 4,
    help: "Pixel frames for the motion tail / re-encode depth."
  },
  {
    key: "image_cond_noise_scale",
    label: "ICN scale",
    tier: "transform",
    control: "slider",
    min: 0,
    max: 1,
    step: 0.05,
    default: 0,
    help: "Noise the anchor so the prompt can override the input. 0 = rigid. ~0.7 swaps subject. Prefer edit-then-animate."
  },
  {
    key: "image_cond_noise_bg_protect",
    label: "ICN background protect",
    tier: "transform",
    control: "slider",
    min: 0,
    max: 1,
    step: 0.05,
    default: 0,
    help: "Spatially mask ICN toward frame centre. 0 = uniform, 1 = corners protected."
  },
  {
    key: "ref_pad_num",
    label: "Ref-pad slots",
    tier: "identity",
    control: "number",
    min: -1,
    max: 16,
    step: 1,
    default: 0,
    help: "Bias padding toward the anchor. 0 = off (canonical). -1 = all (freezes motion)."
  },
  {
    key: "adain_factor",
    label: "AdaIN factor",
    tier: "identity",
    control: "slider",
    min: 0,
    max: 1,
    step: 0.05,
    default: 0,
    help: "Per-channel stat-match toward clip-0. Caps colour drift, not geometry. 0.1–0.5 typical."
  },
  {
    key: "blocks_to_swap",
    label: "Blocks to swap",
    tier: "perf",
    control: "slider",
    min: 0,
    max: 40,
    step: 1,
    default: 40,
    help: "DiT blocks offloaded to CPU. Higher = LESS VRAM (40 = lowest peak ~10 GiB). 40 is 16 GB-safe."
  }
];
function D3(t) {
  return cm.filter((a) => a.tier === t);
}
function A3() {
  const t = {};
  for (const a of cm)
    a.default !== void 0 && (t[a.key] = a.default);
  return t;
}
function z3(t) {
  return {
    ...A3(),
    ref_image_path: "",
    prompts: [""],
    last_image_path: null,
    blocks_to_swap: t.blocksToSwap,
    interpolate_method: t.interpolateMethod,
    interpolate_fps: t.interpolateFps,
    models_dir: t.modelsDir || void 0,
    output_path: t.outputDir ? `${t.outputDir}/svi2_out.mp4` : void 0
  };
}
function $v(t, a) {
  return {
    ...t,
    ...a.params,
    ref_image_path: t.ref_image_path,
    last_image_path: t.last_image_path ?? null,
    prompts: t.prompts
  };
}
const Vo = "svi-canonical", O3 = /* @__PURE__ */ new Set([
  "natural-reference-lowvram",
  "natural-rife48-lowvram",
  "forced-motion-24-lowvram",
  "flf2v-morph-lowvram",
  "chained-single-prompt-lowvram"
]), L3 = /* @__PURE__ */ new Set(["svi-canonical-704", "svi-canonical-640"]), j3 = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]);
function H3(t) {
  const a = t.frames_per_clip, r = t.num_clips, l = t.num_overlap_frame ?? 4;
  return !a || !r ? null : a + (r - 1) * (a - l);
}
function B3(t) {
  const a = t.params, r = a.width ?? 480, l = a.height ?? 832, s = `${r}×${l}`, u = H3(a), c = a.fps;
  let h = "—";
  u !== null && c && c > 0 && (h = `${(u / c).toFixed(1)}s`);
  const g = O3.has(t.id), m = a.blocks_to_swap ?? 0, y = m >= 40 ? "~10–11 GiB (16 GB)" : m > 0 ? "mid-VRAM" : "~26 GiB (high-VRAM)";
  return {
    resolution: s,
    duration: h,
    vram: y,
    isLowVram: g,
    isOffDistribution: L3.has(t.id),
    requiresLastImage: typeof a.requires_last_image == "boolean" ? a.requires_last_image : j3.has(t.id)
  };
}
function U3(t) {
  return [...t].sort((a, r) => a.id === Vo ? -1 : r.id === Vo ? 1 : 0);
}
async function k3(t = 25) {
  return Nr(`/render/jobs?limit=${t}`);
}
async function V3(t) {
  return Nr(`/render/jobs/${t}`);
}
async function q3(t) {
  return Nr("/render/start", {
    method: "POST",
    body: JSON.stringify(t)
  });
}
async function Y3(t) {
  return Nr(`/render/jobs/${t}/cancel`, { method: "POST", body: "{}" });
}
function $3(t, a, r) {
  return Z2(`/render/jobs/${t}/events`, a, r);
}
const X3 = 9e4, G3 = 24e4, I3 = 5e3, Qx = N.createContext(null);
function Z3({
  initialSettings: t = i1,
  initialPreset: a = null,
  children: r
}) {
  const [l, s] = N.useState(t), [u, c] = N.useState(
    a?.id ?? Vo
  ), [h, g] = N.useState(() => {
    const z = z3(t);
    return a ? $v(z, a) : z;
  }), [m, y] = N.useState(null), [p, v] = N.useState(null), [b, w] = N.useState({
    enabled: !1,
    prompt: ""
  }), [R, T] = N.useState(Qu), _ = N.useRef(null), O = N.useRef(null), E = N.useCallback(() => {
    O.current !== null && (clearInterval(O.current), O.current = null);
  }, []), L = N.useCallback(() => {
    E(), O.current = setInterval(() => {
      T((z) => {
        if (z.phase !== "running" || z.lastFrameAt === null) return z;
        const Y = Date.now() - z.lastFrameAt;
        return Y >= G3 ? (_.current?.(), _.current = null, E(), C3(z)) : Y >= X3 ? qv(z) : z;
      });
    }, I3);
  }, [E]), B = N.useCallback((z) => {
    c(z.id), g((Y) => $v(Y, z));
  }, []), H = N.useCallback(
    (z, Y) => {
      g((X) => ({ ...X, [z]: Y }));
    },
    []
  ), V = N.useCallback((z) => {
    g((Y) => ({ ...Y, prompts: z }));
  }, []), D = N.useCallback((z, Y) => {
    y(z), g((X) => ({ ...X, ref_image_path: Y }));
  }, []), G = N.useCallback((z, Y) => {
    v(z), g((X) => ({ ...X, last_image_path: Y }));
  }, []), le = N.useCallback((z) => {
    w((Y) => ({ ...Y, ...z }));
  }, []), $ = N.useCallback((z) => {
    s(z);
  }, []), K = N.useCallback(() => {
    _.current?.(), _.current = null, E(), T(Qu());
  }, [E]), re = N.useCallback(async () => {
    _.current?.();
    const { jobId: z } = await q3({ presetId: u, params: h });
    T(E3(z, b.enabled)), _.current = $3(
      z,
      (Y) => {
        T((X) => _3(X, Y));
      },
      () => {
        T((Y) => qv(Y));
      }
    ), L();
  }, [h, u, b.enabled, L]), j = N.useCallback(async () => {
    const z = R.jobId;
    if (!z) return;
    const { status: Y } = await Y3(z);
    Y !== "cancelling" && (_.current?.(), _.current = null, E(), T((X) => N3(X)));
  }, [R.jobId, E]), I = N.useCallback(
    async (z) => {
      _.current?.(), _.current = null, E();
      try {
        const Y = await V3(z.id);
        T(Yv(Y));
      } catch {
        T(Yv(z));
      }
    },
    [E]
  );
  N.useEffect(() => () => {
    _.current?.(), _.current = null, E();
  }, [E]);
  const C = N.useMemo(
    () => ({
      settings: l,
      presetId: u,
      params: h,
      refImageName: m,
      lastImageName: p,
      qwenEdit: b,
      render: R,
      applyPresetById: B,
      updateParam: H,
      setPrompts: V,
      setRefImage: D,
      setLastImage: G,
      setQwenEdit: le,
      setSettings: $,
      startRenderJob: re,
      cancelRenderJob: j,
      resetRender: K,
      showJobResult: I
    }),
    [
      l,
      u,
      h,
      m,
      p,
      b,
      R,
      B,
      H,
      V,
      D,
      G,
      le,
      $,
      re,
      j,
      K,
      I
    ]
  );
  return /* @__PURE__ */ S.jsx(Qx.Provider, { value: C, children: r });
}
function Gi() {
  const t = N.useContext(Qx);
  if (!t)
    throw new Error("useRenderRequest must be used within RenderRequestProvider");
  return t;
}
function Q3(t) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
  r.type = "text/css", a.appendChild(r), r.styleSheet ? r.styleSheet.cssText = t : r.appendChild(document.createTextNode(t));
}
const F3 = (t) => {
  switch (t) {
    case "success":
      return J3;
    case "info":
      return ez;
    case "warning":
      return W3;
    case "error":
      return tz;
    default:
      return null;
  }
}, K3 = Array(12).fill(0), P3 = ({ visible: t, className: a }) => /* @__PURE__ */ ye.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": t
}, /* @__PURE__ */ ye.createElement("div", {
  className: "sonner-spinner"
}, K3.map((r, l) => /* @__PURE__ */ ye.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${l}`
})))), J3 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), W3 = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), ez = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), tz = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), nz = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ ye.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ ye.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})), az = () => {
  const [t, a] = ye.useState(document.hidden);
  return ye.useEffect(() => {
    const r = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", r), () => window.removeEventListener("visibilitychange", r);
  }, []), t;
};
let ph = 1;
class iz {
  constructor() {
    this.subscribe = (a) => (this.subscribers.push(a), () => {
      const r = this.subscribers.indexOf(a);
      this.subscribers.splice(r, 1);
    }), this.publish = (a) => {
      this.subscribers.forEach((r) => r(a));
    }, this.addToast = (a) => {
      this.publish(a), this.toasts = [
        ...this.toasts,
        a
      ];
    }, this.create = (a) => {
      var r;
      const { message: l, ...s } = a, u = typeof a?.id == "number" || ((r = a.id) == null ? void 0 : r.length) > 0 ? a.id : ph++, c = this.toasts.find((g) => g.id === u), h = a.dismissible === void 0 ? !0 : a.dismissible;
      return this.dismissedToasts.has(u) && this.dismissedToasts.delete(u), c ? this.toasts = this.toasts.map((g) => g.id === u ? (this.publish({
        ...g,
        ...a,
        id: u,
        title: l
      }), {
        ...g,
        ...a,
        id: u,
        dismissible: h,
        title: l
      }) : g) : this.addToast({
        title: l,
        ...s,
        dismissible: h,
        id: u
      }), u;
    }, this.dismiss = (a) => (a ? (this.dismissedToasts.add(a), requestAnimationFrame(() => this.subscribers.forEach((r) => r({
      id: a,
      dismiss: !0
    })))) : this.toasts.forEach((r) => {
      this.subscribers.forEach((l) => l({
        id: r.id,
        dismiss: !0
      }));
    }), a), this.message = (a, r) => this.create({
      ...r,
      message: a
    }), this.error = (a, r) => this.create({
      ...r,
      message: a,
      type: "error"
    }), this.success = (a, r) => this.create({
      ...r,
      type: "success",
      message: a
    }), this.info = (a, r) => this.create({
      ...r,
      type: "info",
      message: a
    }), this.warning = (a, r) => this.create({
      ...r,
      type: "warning",
      message: a
    }), this.loading = (a, r) => this.create({
      ...r,
      type: "loading",
      message: a
    }), this.promise = (a, r) => {
      if (!r)
        return;
      let l;
      r.loading !== void 0 && (l = this.create({
        ...r,
        promise: a,
        type: "loading",
        message: r.loading,
        description: typeof r.description != "function" ? r.description : void 0
      }));
      const s = Promise.resolve(a instanceof Function ? a() : a);
      let u = l !== void 0, c;
      const h = s.then(async (m) => {
        if (c = [
          "resolve",
          m
        ], ye.isValidElement(m))
          u = !1, this.create({
            id: l,
            type: "default",
            message: m
          });
        else if (lz(m) && !m.ok) {
          u = !1;
          const p = typeof r.error == "function" ? await r.error(`HTTP error! status: ${m.status}`) : r.error, v = typeof r.description == "function" ? await r.description(`HTTP error! status: ${m.status}`) : r.description, w = typeof p == "object" && !ye.isValidElement(p) ? p : {
            message: p
          };
          this.create({
            id: l,
            type: "error",
            description: v,
            ...w
          });
        } else if (m instanceof Error) {
          u = !1;
          const p = typeof r.error == "function" ? await r.error(m) : r.error, v = typeof r.description == "function" ? await r.description(m) : r.description, w = typeof p == "object" && !ye.isValidElement(p) ? p : {
            message: p
          };
          this.create({
            id: l,
            type: "error",
            description: v,
            ...w
          });
        } else if (r.success !== void 0) {
          u = !1;
          const p = typeof r.success == "function" ? await r.success(m) : r.success, v = typeof r.description == "function" ? await r.description(m) : r.description, w = typeof p == "object" && !ye.isValidElement(p) ? p : {
            message: p
          };
          this.create({
            id: l,
            type: "success",
            description: v,
            ...w
          });
        }
      }).catch(async (m) => {
        if (c = [
          "reject",
          m
        ], r.error !== void 0) {
          u = !1;
          const y = typeof r.error == "function" ? await r.error(m) : r.error, p = typeof r.description == "function" ? await r.description(m) : r.description, b = typeof y == "object" && !ye.isValidElement(y) ? y : {
            message: y
          };
          this.create({
            id: l,
            type: "error",
            description: p,
            ...b
          });
        }
      }).finally(() => {
        u && (this.dismiss(l), l = void 0), r.finally == null || r.finally.call(r);
      }), g = () => new Promise((m, y) => h.then(() => c[0] === "reject" ? y(c[1]) : m(c[1])).catch(y));
      return typeof l != "string" && typeof l != "number" ? {
        unwrap: g
      } : Object.assign(l, {
        unwrap: g
      });
    }, this.custom = (a, r) => {
      const l = r?.id || ph++;
      return this.create({
        jsx: a(l),
        id: l,
        ...r
      }), l;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const Cn = new iz(), rz = (t, a) => {
  const r = a?.id || ph++;
  return Cn.addToast({
    title: t,
    ...a,
    id: r
  }), r;
}, lz = (t) => t && typeof t == "object" && "ok" in t && typeof t.ok == "boolean" && "status" in t && typeof t.status == "number", oz = rz, sz = () => Cn.toasts, uz = () => Cn.getActiveToasts(), gr = Object.assign(oz, {
  success: Cn.success,
  info: Cn.info,
  warning: Cn.warning,
  error: Cn.error,
  custom: Cn.custom,
  message: Cn.message,
  promise: Cn.promise,
  dismiss: Cn.dismiss,
  loading: Cn.loading
}, {
  getHistory: sz,
  getToasts: uz
});
Q3("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function bu(t) {
  return t.label !== void 0;
}
const cz = 3, fz = "24px", dz = "16px", Xv = 4e3, hz = 356, mz = 14, pz = 45, gz = 200;
function Ta(...t) {
  return t.filter(Boolean).join(" ");
}
function yz(t) {
  const [a, r] = t.split("-"), l = [];
  return a && l.push(a), r && l.push(r), l;
}
const vz = (t) => {
  var a, r, l, s, u, c, h, g, m;
  const { invert: y, toast: p, unstyled: v, interacting: b, setHeights: w, visibleToasts: R, heights: T, index: _, toasts: O, expanded: E, removeToast: L, defaultRichColors: B, closeButton: H, style: V, cancelButtonStyle: D, actionButtonStyle: G, className: le = "", descriptionClassName: $ = "", duration: K, position: re, gap: j, expandByDefault: I, classNames: C, icons: z, closeButtonAriaLabel: Y = "Close toast" } = t, [X, te] = ye.useState(null), [A, k] = ye.useState(null), [F, ee] = ye.useState(!1), [se, he] = ye.useState(!1), [me, W] = ye.useState(!1), [ge, ze] = ye.useState(!1), [Ce, Se] = ye.useState(!1), [xe, Re] = ye.useState(0), [Ye, ft] = ye.useState(0), Te = ye.useRef(p.duration || K || Xv), Ie = ye.useRef(null), Be = ye.useRef(null), $e = _ === 0, St = _ + 1 <= R, Je = p.type, Qe = p.dismissible !== !1, Fe = p.className || "", gt = p.descriptionClassName || "", yt = ye.useMemo(() => T.findIndex((He) => He.toastId === p.id) || 0, [
    T,
    p.id
  ]), Xt = ye.useMemo(() => {
    var He;
    return (He = p.closeButton) != null ? He : H;
  }, [
    p.closeButton,
    H
  ]), jt = ye.useMemo(() => p.duration || K || Xv, [
    p.duration,
    K
  ]), mt = ye.useRef(0), ot = ye.useRef(0), Yn = ye.useRef(0), yn = ye.useRef(null), [tn, Kt] = re.split("-"), Ot = ye.useMemo(() => T.reduce((He, vt, Ht) => Ht >= yt ? He : He + vt.height, 0), [
    T,
    yt
  ]), kt = az(), ci = p.invert || y, wa = Je === "loading";
  ot.current = ye.useMemo(() => yt * j + Ot, [
    yt,
    Ot
  ]), ye.useEffect(() => {
    Te.current = jt;
  }, [
    jt
  ]), ye.useEffect(() => {
    ee(!0);
  }, []), ye.useEffect(() => {
    const He = Be.current;
    if (He) {
      const vt = He.getBoundingClientRect().height;
      return ft(vt), w((Ht) => [
        {
          toastId: p.id,
          height: vt,
          position: p.position
        },
        ...Ht
      ]), () => w((Ht) => Ht.filter((Vt) => Vt.toastId !== p.id));
    }
  }, [
    w,
    p.id
  ]), ye.useLayoutEffect(() => {
    if (!F) return;
    const He = Be.current, vt = He.style.height;
    He.style.height = "auto";
    const Ht = He.getBoundingClientRect().height;
    He.style.height = vt, ft(Ht), w((Vt) => Vt.find((pt) => pt.toastId === p.id) ? Vt.map((pt) => pt.toastId === p.id ? {
      ...pt,
      height: Ht
    } : pt) : [
      {
        toastId: p.id,
        height: Ht,
        position: p.position
      },
      ...Vt
    ]);
  }, [
    F,
    p.title,
    p.description,
    w,
    p.id,
    p.jsx,
    p.action,
    p.cancel
  ]);
  const vn = ye.useCallback(() => {
    he(!0), Re(ot.current), w((He) => He.filter((vt) => vt.toastId !== p.id)), setTimeout(() => {
      L(p);
    }, gz);
  }, [
    p,
    L,
    w,
    ot
  ]);
  ye.useEffect(() => {
    if (p.promise && Je === "loading" || p.duration === 1 / 0 || p.type === "loading") return;
    let He;
    return E || b || kt ? (() => {
      if (Yn.current < mt.current) {
        const Vt = (/* @__PURE__ */ new Date()).getTime() - mt.current;
        Te.current = Te.current - Vt;
      }
      Yn.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      Te.current !== 1 / 0 && (mt.current = (/* @__PURE__ */ new Date()).getTime(), He = setTimeout(() => {
        p.onAutoClose == null || p.onAutoClose.call(p, p), vn();
      }, Te.current));
    })(), () => clearTimeout(He);
  }, [
    E,
    b,
    p,
    Je,
    kt,
    vn
  ]), ye.useEffect(() => {
    p.delete && (vn(), p.onDismiss == null || p.onDismiss.call(p, p));
  }, [
    vn,
    p.delete
  ]);
  function ra() {
    var He;
    if (z?.loading) {
      var vt;
      return /* @__PURE__ */ ye.createElement("div", {
        className: Ta(C?.loader, p == null || (vt = p.classNames) == null ? void 0 : vt.loader, "sonner-loader"),
        "data-visible": Je === "loading"
      }, z.loading);
    }
    return /* @__PURE__ */ ye.createElement(P3, {
      className: Ta(C?.loader, p == null || (He = p.classNames) == null ? void 0 : He.loader),
      visible: Je === "loading"
    });
  }
  const Mn = p.icon || z?.[Je] || F3(Je);
  var $n, un;
  return /* @__PURE__ */ ye.createElement("li", {
    tabIndex: 0,
    ref: Be,
    className: Ta(le, Fe, C?.toast, p == null || (a = p.classNames) == null ? void 0 : a.toast, C?.default, C?.[Je], p == null || (r = p.classNames) == null ? void 0 : r[Je]),
    "data-sonner-toast": "",
    "data-rich-colors": ($n = p.richColors) != null ? $n : B,
    "data-styled": !(p.jsx || p.unstyled || v),
    "data-mounted": F,
    "data-promise": !!p.promise,
    "data-swiped": Ce,
    "data-removed": se,
    "data-visible": St,
    "data-y-position": tn,
    "data-x-position": Kt,
    "data-index": _,
    "data-front": $e,
    "data-swiping": me,
    "data-dismissible": Qe,
    "data-type": Je,
    "data-invert": ci,
    "data-swipe-out": ge,
    "data-swipe-direction": A,
    "data-expanded": !!(E || I && F),
    "data-testid": p.testId,
    style: {
      "--index": _,
      "--toasts-before": _,
      "--z-index": O.length - _,
      "--offset": `${se ? xe : ot.current}px`,
      "--initial-height": I ? "auto" : `${Ye}px`,
      ...V,
      ...p.style
    },
    onDragEnd: () => {
      W(!1), te(null), yn.current = null;
    },
    onPointerDown: (He) => {
      He.button !== 2 && (wa || !Qe || (Ie.current = /* @__PURE__ */ new Date(), Re(ot.current), He.target.setPointerCapture(He.pointerId), He.target.tagName !== "BUTTON" && (W(!0), yn.current = {
        x: He.clientX,
        y: He.clientY
      })));
    },
    onPointerUp: () => {
      var He, vt, Ht;
      if (ge || !Qe) return;
      yn.current = null;
      const Vt = Number(((He = Be.current) == null ? void 0 : He.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), mn = Number(((vt = Be.current) == null ? void 0 : vt.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), pt = (/* @__PURE__ */ new Date()).getTime() - ((Ht = Ie.current) == null ? void 0 : Ht.getTime()), Pt = X === "x" ? Vt : mn, la = Math.abs(Pt) / pt;
      if (Math.abs(Pt) >= pz || la > 0.11) {
        Re(ot.current), p.onDismiss == null || p.onDismiss.call(p, p), k(X === "x" ? Vt > 0 ? "right" : "left" : mn > 0 ? "down" : "up"), vn(), ze(!0);
        return;
      } else {
        var Wt, U;
        (Wt = Be.current) == null || Wt.style.setProperty("--swipe-amount-x", "0px"), (U = Be.current) == null || U.style.setProperty("--swipe-amount-y", "0px");
      }
      Se(!1), W(!1), te(null);
    },
    onPointerMove: (He) => {
      var vt, Ht, Vt;
      if (!yn.current || !Qe || ((vt = window.getSelection()) == null ? void 0 : vt.toString().length) > 0) return;
      const pt = He.clientY - yn.current.y, Pt = He.clientX - yn.current.x;
      var la;
      const Wt = (la = t.swipeDirections) != null ? la : yz(re);
      !X && (Math.abs(Pt) > 1 || Math.abs(pt) > 1) && te(Math.abs(Pt) > Math.abs(pt) ? "x" : "y");
      let U = {
        x: 0,
        y: 0
      };
      const Q = (J) => 1 / (1.5 + Math.abs(J) / 20);
      if (X === "y") {
        if (Wt.includes("top") || Wt.includes("bottom"))
          if (Wt.includes("top") && pt < 0 || Wt.includes("bottom") && pt > 0)
            U.y = pt;
          else {
            const J = pt * Q(pt);
            U.y = Math.abs(J) < Math.abs(pt) ? J : pt;
          }
      } else if (X === "x" && (Wt.includes("left") || Wt.includes("right")))
        if (Wt.includes("left") && Pt < 0 || Wt.includes("right") && Pt > 0)
          U.x = Pt;
        else {
          const J = Pt * Q(Pt);
          U.x = Math.abs(J) < Math.abs(Pt) ? J : Pt;
        }
      (Math.abs(U.x) > 0 || Math.abs(U.y) > 0) && Se(!0), (Ht = Be.current) == null || Ht.style.setProperty("--swipe-amount-x", `${U.x}px`), (Vt = Be.current) == null || Vt.style.setProperty("--swipe-amount-y", `${U.y}px`);
    }
  }, Xt && !p.jsx && Je !== "loading" ? /* @__PURE__ */ ye.createElement("button", {
    "aria-label": Y,
    "data-disabled": wa,
    "data-close-button": !0,
    onClick: wa || !Qe ? () => {
    } : () => {
      vn(), p.onDismiss == null || p.onDismiss.call(p, p);
    },
    className: Ta(C?.closeButton, p == null || (l = p.classNames) == null ? void 0 : l.closeButton)
  }, (un = z?.close) != null ? un : nz) : null, (Je || p.icon || p.promise) && p.icon !== null && (z?.[Je] !== null || p.icon) ? /* @__PURE__ */ ye.createElement("div", {
    "data-icon": "",
    className: Ta(C?.icon, p == null || (s = p.classNames) == null ? void 0 : s.icon)
  }, p.promise || p.type === "loading" && !p.icon ? p.icon || ra() : null, p.type !== "loading" ? Mn : null) : null, /* @__PURE__ */ ye.createElement("div", {
    "data-content": "",
    className: Ta(C?.content, p == null || (u = p.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ ye.createElement("div", {
    "data-title": "",
    className: Ta(C?.title, p == null || (c = p.classNames) == null ? void 0 : c.title)
  }, p.jsx ? p.jsx : typeof p.title == "function" ? p.title() : p.title), p.description ? /* @__PURE__ */ ye.createElement("div", {
    "data-description": "",
    className: Ta($, gt, C?.description, p == null || (h = p.classNames) == null ? void 0 : h.description)
  }, typeof p.description == "function" ? p.description() : p.description) : null), /* @__PURE__ */ ye.isValidElement(p.cancel) ? p.cancel : p.cancel && bu(p.cancel) ? /* @__PURE__ */ ye.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: p.cancelButtonStyle || D,
    onClick: (He) => {
      bu(p.cancel) && Qe && (p.cancel.onClick == null || p.cancel.onClick.call(p.cancel, He), vn());
    },
    className: Ta(C?.cancelButton, p == null || (g = p.classNames) == null ? void 0 : g.cancelButton)
  }, p.cancel.label) : null, /* @__PURE__ */ ye.isValidElement(p.action) ? p.action : p.action && bu(p.action) ? /* @__PURE__ */ ye.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: p.actionButtonStyle || G,
    onClick: (He) => {
      bu(p.action) && (p.action.onClick == null || p.action.onClick.call(p.action, He), !He.defaultPrevented && vn());
    },
    className: Ta(C?.actionButton, p == null || (m = p.classNames) == null ? void 0 : m.actionButton)
  }, p.action.label) : null);
};
function Gv() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const t = document.documentElement.getAttribute("dir");
  return t === "auto" || !t ? window.getComputedStyle(document.documentElement).direction : t;
}
function bz(t, a) {
  const r = {};
  return [
    t,
    a
  ].forEach((l, s) => {
    const u = s === 1, c = u ? "--mobile-offset" : "--offset", h = u ? dz : fz;
    function g(m) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((y) => {
        r[`${c}-${y}`] = typeof m == "number" ? `${m}px` : m;
      });
    }
    typeof l == "number" || typeof l == "string" ? g(l) : typeof l == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((m) => {
      l[m] === void 0 ? r[`${c}-${m}`] = h : r[`${c}-${m}`] = typeof l[m] == "number" ? `${l[m]}px` : l[m];
    }) : g(h);
  }), r;
}
const xz = /* @__PURE__ */ ye.forwardRef(function(a, r) {
  const { id: l, invert: s, position: u = "bottom-right", hotkey: c = [
    "altKey",
    "KeyT"
  ], expand: h, closeButton: g, className: m, offset: y, mobileOffset: p, theme: v = "light", richColors: b, duration: w, style: R, visibleToasts: T = cz, toastOptions: _, dir: O = Gv(), gap: E = mz, icons: L, containerAriaLabel: B = "Notifications" } = a, [H, V] = ye.useState([]), D = ye.useMemo(() => l ? H.filter((F) => F.toasterId === l) : H.filter((F) => !F.toasterId), [
    H,
    l
  ]), G = ye.useMemo(() => Array.from(new Set([
    u
  ].concat(D.filter((F) => F.position).map((F) => F.position)))), [
    D,
    u
  ]), [le, $] = ye.useState([]), [K, re] = ye.useState(!1), [j, I] = ye.useState(!1), [C, z] = ye.useState(v !== "system" ? v : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), Y = ye.useRef(null), X = c.join("+").replace(/Key/g, "").replace(/Digit/g, ""), te = ye.useRef(null), A = ye.useRef(!1), k = ye.useCallback((F) => {
    V((ee) => {
      var se;
      return (se = ee.find((he) => he.id === F.id)) != null && se.delete || Cn.dismiss(F.id), ee.filter(({ id: he }) => he !== F.id);
    });
  }, []);
  return ye.useEffect(() => Cn.subscribe((F) => {
    if (F.dismiss) {
      requestAnimationFrame(() => {
        V((ee) => ee.map((se) => se.id === F.id ? {
          ...se,
          delete: !0
        } : se));
      });
      return;
    }
    setTimeout(() => {
      YM.flushSync(() => {
        V((ee) => {
          const se = ee.findIndex((he) => he.id === F.id);
          return se !== -1 ? [
            ...ee.slice(0, se),
            {
              ...ee[se],
              ...F
            },
            ...ee.slice(se + 1)
          ] : [
            F,
            ...ee
          ];
        });
      });
    });
  }), [
    H
  ]), ye.useEffect(() => {
    if (v !== "system") {
      z(v);
      return;
    }
    if (v === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? z("dark") : z("light")), typeof window > "u") return;
    const F = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      F.addEventListener("change", ({ matches: ee }) => {
        z(ee ? "dark" : "light");
      });
    } catch {
      F.addListener(({ matches: se }) => {
        try {
          z(se ? "dark" : "light");
        } catch (he) {
          console.error(he);
        }
      });
    }
  }, [
    v
  ]), ye.useEffect(() => {
    H.length <= 1 && re(!1);
  }, [
    H
  ]), ye.useEffect(() => {
    const F = (ee) => {
      var se;
      if (c.every((W) => ee[W] || ee.code === W)) {
        var me;
        re(!0), (me = Y.current) == null || me.focus();
      }
      ee.code === "Escape" && (document.activeElement === Y.current || (se = Y.current) != null && se.contains(document.activeElement)) && re(!1);
    };
    return document.addEventListener("keydown", F), () => document.removeEventListener("keydown", F);
  }, [
    c
  ]), ye.useEffect(() => {
    if (Y.current)
      return () => {
        te.current && (te.current.focus({
          preventScroll: !0
        }), te.current = null, A.current = !1);
      };
  }, [
    Y.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ ye.createElement("section", {
    ref: r,
    "aria-label": `${B} ${X}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, G.map((F, ee) => {
    var se;
    const [he, me] = F.split("-");
    return D.length ? /* @__PURE__ */ ye.createElement("ol", {
      key: F,
      dir: O === "auto" ? Gv() : O,
      tabIndex: -1,
      ref: Y,
      className: m,
      "data-sonner-toaster": !0,
      "data-sonner-theme": C,
      "data-y-position": he,
      "data-x-position": me,
      style: {
        "--front-toast-height": `${((se = le[0]) == null ? void 0 : se.height) || 0}px`,
        "--width": `${hz}px`,
        "--gap": `${E}px`,
        ...R,
        ...bz(y, p)
      },
      onBlur: (W) => {
        A.current && !W.currentTarget.contains(W.relatedTarget) && (A.current = !1, te.current && (te.current.focus({
          preventScroll: !0
        }), te.current = null));
      },
      onFocus: (W) => {
        W.target instanceof HTMLElement && W.target.dataset.dismissible === "false" || A.current || (A.current = !0, te.current = W.relatedTarget);
      },
      onMouseEnter: () => re(!0),
      onMouseMove: () => re(!0),
      onMouseLeave: () => {
        j || re(!1);
      },
      onDragEnd: () => re(!1),
      onPointerDown: (W) => {
        W.target instanceof HTMLElement && W.target.dataset.dismissible === "false" || I(!0);
      },
      onPointerUp: () => I(!1)
    }, D.filter((W) => !W.position && ee === 0 || W.position === F).map((W, ge) => {
      var ze, Ce;
      return /* @__PURE__ */ ye.createElement(vz, {
        key: W.id,
        icons: L,
        index: ge,
        toast: W,
        defaultRichColors: b,
        duration: (ze = _?.duration) != null ? ze : w,
        className: _?.className,
        descriptionClassName: _?.descriptionClassName,
        invert: s,
        visibleToasts: T,
        closeButton: (Ce = _?.closeButton) != null ? Ce : g,
        interacting: j,
        position: F,
        style: _?.style,
        unstyled: _?.unstyled,
        classNames: _?.classNames,
        cancelButtonStyle: _?.cancelButtonStyle,
        actionButtonStyle: _?.actionButtonStyle,
        closeButtonAriaLabel: _?.closeButtonAriaLabel,
        removeToast: k,
        toasts: D.filter((Se) => Se.position == W.position),
        heights: le.filter((Se) => Se.position == W.position),
        setHeights: $,
        expandByDefault: h,
        gap: E,
        expanded: K,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), gh = "svi2-pro:trigger-render", yh = "svi2-pro:render-state";
function wz() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(gh));
}
function Sz(t) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(yh, { detail: t }));
}
function Ez(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(gh, t), () => window.removeEventListener(gh, t));
}
function _z(t) {
  if (typeof window > "u") return () => {
  };
  const a = (r) => {
    const l = r.detail;
    l && t(l);
  };
  return window.addEventListener(yh, a), () => window.removeEventListener(yh, a);
}
const Nz = /* @__PURE__ */ new Set(["flf2v-morph-lowvram"]), Rz = 832 * 480, Cz = 0.85;
function Fx(t, a) {
  return a && typeof a.requires_last_image == "boolean" ? a.requires_last_image : t !== null && Nz.has(t);
}
function Iv(t, a) {
  return Number.isFinite(t) && t % a === 0;
}
function Tz(t, a) {
  const r = [];
  (!a.hasRefImage || !t.ref_image_path) && r.push({
    field: "ref_image_path",
    message: "A reference (anchor) image is required.",
    severity: "error"
  }), (t.prompts ?? []).some((p) => p.trim().length > 0) || r.push({
    field: "prompts",
    message: "At least one prompt is required.",
    severity: "error"
  });
  const u = t.frames_per_clip ?? 81;
  (u - 1) % 4 !== 0 && r.push({
    field: "frames_per_clip",
    message: `Frames per clip must be 4n+1 (got ${u}). Try ${u - (u - 1) % 4}.`,
    severity: "error"
  });
  const c = t.width ?? 480, h = t.height ?? 832;
  Iv(c, 16) || r.push({
    field: "width",
    message: `Width must be divisible by 16 (got ${c}).`,
    severity: "error"
  }), Iv(h, 16) || r.push({
    field: "height",
    message: `Height must be divisible by 16 (got ${h}).`,
    severity: "error"
  });
  const g = t.num_inference_steps ?? 50;
  (g < 1 || g > 100) && r.push({
    field: "num_inference_steps",
    message: "Steps must be between 1 and 100.",
    severity: "error"
  });
  const m = t.cfg_scale ?? 5;
  (m < 1 || m > 12) && r.push({
    field: "cfg_scale",
    message: "Guidance (CFG) must be between 1 and 12.",
    severity: "error"
  });
  const y = t.num_clips;
  return y !== void 0 && y < 1 && r.push({
    field: "num_clips",
    message: "Clips must be at least 1.",
    severity: "error"
  }), Fx(a.presetId, a.presetParams) && !a.hasLastImage && r.push({
    field: "last_image_path",
    message: "This preset (FLF2V morph) requires a last-image keyframe.",
    severity: "error"
  }), Number.isFinite(c) && Number.isFinite(h) && c * h < Rz * Cz && r.push({
    field: "width",
    message: `${c}×${h} is below the trained 480p budget — identity-lock weakens (off-distribution). Render still proceeds.`,
    severity: "warning"
  }), r;
}
function Mz(t) {
  return t.some((a) => a.severity === "error");
}
function Kx() {
  const {
    params: t,
    presetId: a,
    refImageName: r,
    lastImageName: l,
    render: s,
    startRenderJob: u,
    cancelRenderJob: c
  } = Gi(), h = N.useMemo(
    () => Tz(t, {
      presetId: a,
      hasRefImage: !!r,
      hasLastImage: !!l,
      presetParams: t
    }),
    [t, a, r, l]
  ), g = Mz(h), m = s.phase === "running", [y, p] = N.useState(null), v = N.useCallback(async () => {
    if (g) {
      const w = h.find((R) => R.severity === "error");
      w && p({ field: w.field, token: Date.now() }), gr.error("Fix the highlighted fields before rendering.");
      return;
    }
    try {
      await u(), gr.success("Render started.");
    } catch (w) {
      const R = w instanceof tc ? w.message : "Could not start the render.";
      gr.error(R);
    }
  }, [g, h, u]), b = N.useCallback(async () => {
    try {
      await c();
    } catch {
      gr.error("Could not cancel the render.");
    }
  }, [c]);
  return N.useEffect(() => Ez(() => void v()), [v]), N.useEffect(() => {
    Sz({ busy: m, blocked: g });
  }, [m, g]), { issues: h, blocked: g, busy: m, submit: v, cancel: b, focusRequest: y };
}
const Dz = 220, Az = 80;
function zz(t) {
  switch (t) {
    case "anchor":
      return "Anchor";
    case "qwen_edit":
      return "Qwen edit";
    case "diffusion":
      return "Diffusion";
    case "stitch":
      return "Stitch";
    case "interpolate":
      return "Interpolate";
    case "mux":
      return "Mux";
  }
}
function Oz(t, a) {
  const r = a.params;
  switch (t) {
    case "anchor":
      return "Reference image";
    case "qwen_edit":
      return a.qwenEditEnabled ? "Edit-then-animate" : "Skipped";
    case "diffusion": {
      const l = r.num_clips ?? 1, s = a.render.clipIndex + 1;
      return a.render.phase === "running" ? `Clip ${Math.min(s, l)}/${l}` : `${l} clip${l === 1 ? "" : "s"}`;
    }
    case "stitch":
      return r.stitch_mode === "crossfade" ? "Crossfade" : "Overlap trim";
    case "interpolate":
      return r.interpolate_fps && r.interpolate_fps > 0 ? `→ ${r.interpolate_fps} fps` : "Off";
    case "mux":
      return "Encode mp4";
  }
}
function Lz(t) {
  const a = sm.filter(
    (s) => s !== "qwen_edit" || t.qwenEditEnabled
  ), r = a.map((s, u) => {
    const c = {
      title: zz(s),
      subtitle: Oz(s, t),
      state: t.render.stageStates[s],
      hasInput: u > 0,
      hasOutput: u < a.length - 1
    };
    return {
      id: s,
      type: "pipeline",
      position: { x: u * Dz, y: Az },
      data: c
    };
  }), l = [];
  for (let s = 1; s < a.length; s += 1) {
    const u = a[s - 1], c = a[s];
    !u || !c || l.push({
      id: `${u}->${c}`,
      source: u,
      target: c,
      animated: t.render.stageStates[c] === "active"
    });
  }
  return { nodes: r, edges: l };
}
var jz = "dk8hba0", Hz = { idle: "dk8hba1", active: "dk8hba2", done: "dk8hba3", error: "dk8hba4" }, Bz = "dk8hba5", Uz = "dk8hba6", kz = "dk8hba7", Vz = { idle: "dk8hba8", active: "dk8hba9", done: "dk8hbaa", error: "dk8hbab" }, qz = "dk8hbac";
function Yz({ data: t }) {
  const a = t, r = [jz, Hz[a.state]].join(" "), l = [qz, Vz[a.state]].join(" ");
  return /* @__PURE__ */ S.jsxs("div", { className: r, children: [
    a.hasInput && /* @__PURE__ */ S.jsx(El, { type: "target", position: Ae.Left }),
    /* @__PURE__ */ S.jsxs("div", { className: Bz, children: [
      /* @__PURE__ */ S.jsx("span", { className: Uz, children: a.title }),
      /* @__PURE__ */ S.jsx("span", { className: l, "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ S.jsx("span", { className: kz, children: a.subtitle }),
    a.hasOutput && /* @__PURE__ */ S.jsx(El, { type: "source", position: Ae.Right })
  ] });
}
const $z = { pipeline: Yz };
var Xz = "_1g4g8kk0", Gz = "_1g4g8kk1", Iz = "_1g4g8kk2", Zz = "_1g4g8kk3", Qz = "_1g4g8kk4", Fz = "_1g4g8kk5";
const Kz = {
  idle: "neutral",
  active: "accent",
  done: "success",
  error: "warning"
}, Pz = {
  anchor: "Anchor",
  qwen_edit: "Qwen edit",
  diffusion: "Diffusion",
  stitch: "Stitch",
  interpolate: "Interpolate",
  mux: "Mux"
};
function Jz() {
  const { render: t, params: a, qwenEdit: r } = Gi(), { busy: l, blocked: s, submit: u, cancel: c } = Kx(), h = N.useMemo(
    () => Lz({ render: t, params: a, qwenEditEnabled: r.enabled }),
    [t, a, r.enabled]
  ), g = sm.filter(
    (m) => m !== "qwen_edit" || r.enabled
  );
  return /* @__PURE__ */ S.jsxs("div", { className: Xz, children: [
    /* @__PURE__ */ S.jsx("div", { className: Gz, children: /* @__PURE__ */ S.jsx(
      p3,
      {
        nodes: h.nodes,
        edges: h.edges,
        nodeTypes: $z,
        ariaLabel: "SVI 2.0 Pro render pipeline"
      }
    ) }),
    /* @__PURE__ */ S.jsx("div", { className: Iz, children: /* @__PURE__ */ S.jsxs(
      ni,
      {
        elevation: "raised",
        title: "Pipeline",
        description: "anchor → diffusion → stitch → interpolate → mux. Live state mirrors the render.",
        children: [
          /* @__PURE__ */ S.jsx("div", { className: Zz, children: g.map((m) => /* @__PURE__ */ S.jsxs("div", { className: Qz, children: [
            /* @__PURE__ */ S.jsx("span", { children: Pz[m] }),
            /* @__PURE__ */ S.jsx(ta, { tone: Kz[t.stageStates[m]], children: t.stageStates[m] })
          ] }, m)) }),
          /* @__PURE__ */ S.jsx("div", { className: Fz, children: l ? /* @__PURE__ */ S.jsx(ii, { variant: "danger", onClick: () => void c(), children: "Cancel render" }) : /* @__PURE__ */ S.jsx(ii, { onClick: () => void u(), disabled: s, children: "Render" }) })
        ]
      }
    ) })
  ] });
}
var Zv = fx();
const Px = 0, Jx = 1, Wx = 2, Qv = 3;
var Fv = Object.prototype.hasOwnProperty;
function vh(t, a) {
  var r, l;
  if (t === a) return !0;
  if (t && a && (r = t.constructor) === a.constructor) {
    if (r === Date) return t.getTime() === a.getTime();
    if (r === RegExp) return t.toString() === a.toString();
    if (r === Array) {
      if ((l = t.length) === a.length)
        for (; l-- && vh(t[l], a[l]); ) ;
      return l === -1;
    }
    if (!r || typeof t == "object") {
      l = 0;
      for (r in t)
        if (Fv.call(t, r) && ++l && !Fv.call(a, r) || !(r in a) || !vh(t[r], a[r])) return !1;
      return Object.keys(a).length === l;
    }
  }
  return t !== t && a !== a;
}
const ai = /* @__PURE__ */ new WeakMap(), li = () => {
}, hn = (
  /*#__NOINLINE__*/
  li()
), bh = Object, nt = (t) => t === hn, Aa = (t) => typeof t == "function", Xi = (t, a) => ({
  ...t,
  ...a
}), ew = (t) => Aa(t.then), Xd = {}, xu = {}, fm = "undefined", Po = typeof window != fm, xh = typeof document != fm, Wz = Po && "Deno" in window, e5 = () => Po && typeof window.requestAnimationFrame != fm, tw = (t, a) => {
  const r = ai.get(t);
  return [
    // Getter
    () => !nt(a) && t.get(a) || Xd,
    // Setter
    (l) => {
      if (!nt(a)) {
        const s = t.get(a);
        a in xu || (xu[a] = s), r[5](a, Xi(s, l), s || Xd);
      }
    },
    // Subscriber
    r[6],
    // Get server cache snapshot
    () => !nt(a) && a in xu ? xu[a] : !nt(a) && t.get(a) || Xd
  ];
};
let wh = !0;
const t5 = () => wh, [Sh, Eh] = Po && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  li,
  li
], n5 = () => {
  const t = xh && document.visibilityState;
  return nt(t) || t !== "hidden";
}, a5 = (t) => (xh && document.addEventListener("visibilitychange", t), Sh("focus", t), () => {
  xh && document.removeEventListener("visibilitychange", t), Eh("focus", t);
}), i5 = (t) => {
  const a = () => {
    wh = !0, t();
  }, r = () => {
    wh = !1;
  };
  return Sh("online", a), Sh("offline", r), () => {
    Eh("online", a), Eh("offline", r);
  };
}, r5 = {
  isOnline: t5,
  isVisible: n5
}, l5 = {
  initFocus: a5,
  initReconnect: i5
}, Kv = !ye.useId, pl = !Po || Wz, o5 = (t) => e5() ? window.requestAnimationFrame(t) : setTimeout(t, 1), Gd = pl ? N.useEffect : N.useLayoutEffect, Id = typeof navigator < "u" && navigator.connection, Pv = !pl && Id && ([
  "slow-2g",
  "2g"
].includes(Id.effectiveType) || Id.saveData), wu = /* @__PURE__ */ new WeakMap(), s5 = (t) => bh.prototype.toString.call(t), Zd = (t, a) => t === `[object ${a}]`;
let u5 = 0;
const _h = (t) => {
  const a = typeof t, r = s5(t), l = Zd(r, "Date"), s = Zd(r, "RegExp"), u = Zd(r, "Object");
  let c, h;
  if (bh(t) === t && !l && !s) {
    if (c = wu.get(t), c) return c;
    if (c = ++u5 + "~", wu.set(t, c), Array.isArray(t)) {
      for (c = "@", h = 0; h < t.length; h++)
        c += _h(t[h]) + ",";
      wu.set(t, c);
    }
    if (u) {
      c = "#";
      const g = bh.keys(t).sort();
      for (; !nt(h = g.pop()); )
        nt(t[h]) || (c += h + ":" + _h(t[h]) + ",");
      wu.set(t, c);
    }
  } else
    c = l ? t.toJSON() : a == "symbol" ? t.toString() : a == "string" ? JSON.stringify(t) : "" + t;
  return c;
}, dm = (t) => {
  if (Aa(t))
    try {
      t = t();
    } catch {
      t = "";
    }
  const a = t;
  return t = typeof t == "string" ? t : (Array.isArray(t) ? t.length : t) ? _h(t) : "", [
    t,
    a
  ];
};
let c5 = 0;
const Nh = () => ++c5;
async function nw(...t) {
  const [a, r, l, s] = t, u = Xi({
    populateCache: !0,
    throwOnError: !0
  }, typeof s == "boolean" ? {
    revalidate: s
  } : s || {});
  let c = u.populateCache;
  const h = u.rollbackOnError;
  let g = u.optimisticData;
  const m = (v) => typeof h == "function" ? h(v) : h !== !1, y = u.throwOnError;
  if (Aa(r)) {
    const v = r, b = [], w = a.keys();
    for (const R of w)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(R) && v(a.get(R)._k) && b.push(R);
    return Promise.all(b.map(p));
  }
  return p(r);
  async function p(v) {
    const [b] = dm(v);
    if (!b) return;
    const [w, R] = tw(a, b), [T, _, O, E] = ai.get(a), L = () => {
      const j = T[b];
      return (Aa(u.revalidate) ? u.revalidate(w().data, v) : u.revalidate !== !1) && (delete O[b], delete E[b], j && j[0]) ? j[0](Wx).then(() => w().data) : w().data;
    };
    if (t.length < 3)
      return L();
    let B = l, H, V = !1;
    const D = Nh();
    _[b] = [
      D,
      0
    ];
    const G = !nt(g), le = w(), $ = le.data, K = le._c, re = nt(K) ? $ : K;
    if (G && (g = Aa(g) ? g(re, $) : g, R({
      data: g,
      _c: re
    })), Aa(B))
      try {
        B = B(re);
      } catch (j) {
        H = j, V = !0;
      }
    if (B && ew(B))
      if (B = await B.catch((j) => {
        H = j, V = !0;
      }), D !== _[b][0]) {
        if (V) throw H;
        return B;
      } else V && G && m(H) && (c = !0, R({
        data: re,
        _c: hn
      }));
    if (c && !V)
      if (Aa(c)) {
        const j = c(B, re);
        R({
          data: j,
          error: hn,
          _c: hn
        });
      } else
        R({
          data: B,
          error: hn,
          _c: hn
        });
    if (_[b][1] = Nh(), Promise.resolve(L()).then(() => {
      R({
        _c: hn
      });
    }), V) {
      if (y) throw H;
      return;
    }
    return B;
  }
}
const Jv = (t, a) => {
  for (const r in t)
    t[r][0] && t[r][0](a);
}, f5 = (t, a) => {
  if (!ai.has(t)) {
    const r = Xi(l5, a), l = /* @__PURE__ */ Object.create(null), s = nw.bind(hn, t);
    let u = li;
    const c = /* @__PURE__ */ Object.create(null), h = (y, p) => {
      const v = c[y] || [];
      return c[y] = v, v.push(p), () => v.splice(v.indexOf(p), 1);
    }, g = (y, p, v) => {
      t.set(y, p);
      const b = c[y];
      if (b)
        for (const w of b)
          w(p, v);
    }, m = () => {
      if (!ai.has(t) && (ai.set(t, [
        l,
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        s,
        g,
        h
      ]), !pl)) {
        const y = r.initFocus(setTimeout.bind(hn, Jv.bind(hn, l, Px))), p = r.initReconnect(setTimeout.bind(hn, Jv.bind(hn, l, Jx)));
        u = () => {
          y && y(), p && p(), ai.delete(t);
        };
      }
    };
    return m(), [
      t,
      s,
      m,
      u
    ];
  }
  return [
    t,
    ai.get(t)[4]
  ];
}, d5 = (t, a, r, l, s) => {
  const u = r.errorRetryCount, c = s.retryCount, h = ~~((Math.random() + 0.5) * (1 << (c < 8 ? c : 8))) * r.errorRetryInterval;
  !nt(u) && c > u || setTimeout(l, h, s);
}, h5 = vh, [aw, m5] = f5(/* @__PURE__ */ new Map()), p5 = Xi(
  {
    // events
    onLoadingSlow: li,
    onSuccess: li,
    onError: li,
    onErrorRetry: d5,
    onDiscarded: li,
    // switches
    revalidateOnFocus: !0,
    revalidateOnReconnect: !0,
    revalidateIfStale: !0,
    shouldRetryOnError: !0,
    // timeouts
    errorRetryInterval: Pv ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: Pv ? 5e3 : 3e3,
    // providers
    compare: h5,
    isPaused: () => !1,
    cache: aw,
    mutate: m5,
    fallback: {}
  },
  // use web preset by default
  r5
), g5 = (t, a) => {
  const r = Xi(t, a);
  if (a) {
    const { use: l, fallback: s } = t, { use: u, fallback: c } = a;
    l && u && (r.use = l.concat(u)), s && c && (r.fallback = Xi(s, c));
  }
  return r;
}, y5 = N.createContext({}), v5 = "$inf$", iw = Po && window.__SWR_DEVTOOLS_USE__, b5 = iw ? window.__SWR_DEVTOOLS_USE__ : [], x5 = () => {
  iw && (window.__SWR_DEVTOOLS_REACT__ = ye);
}, w5 = (t) => Aa(t[1]) ? [
  t[0],
  t[1],
  t[2] || {}
] : [
  t[0],
  null,
  (t[1] === null ? t[2] : t[1]) || {}
], S5 = () => {
  const t = N.useContext(y5);
  return N.useMemo(() => Xi(p5, t), [
    t
  ]);
}, E5 = (t) => (a, r, l) => t(a, r && ((...u) => {
  const [c] = dm(a), [, , , h] = ai.get(aw);
  if (c.startsWith(v5))
    return r(...u);
  const g = h[c];
  return nt(g) ? r(...u) : (delete h[c], g);
}), l), _5 = b5.concat(E5), N5 = (t) => function(...r) {
  const l = S5(), [s, u, c] = w5(r), h = g5(l, c);
  let g = t;
  const { use: m } = h, y = (m || []).concat(_5);
  for (let p = y.length; p--; )
    g = y[p](g);
  return g(s, u || h.fetcher || null, h);
}, R5 = (t, a, r) => {
  const l = a[t] || (a[t] = []);
  return l.push(r), () => {
    const s = l.indexOf(r);
    s >= 0 && (l[s] = l[l.length - 1], l.pop());
  };
};
x5();
const Qd = ye.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
// and emitting an error.
// We assume that this is only for the `use(thenable)` case, not `use(context)`.
// https://github.com/facebook/react/blob/aed00dacfb79d17c53218404c52b1c7aa59c4a89/packages/react-server/src/ReactFizzThenable.js#L45
((t) => {
  switch (t.status) {
    case "pending":
      throw t;
    case "fulfilled":
      return t.value;
    case "rejected":
      throw t.reason;
    default:
      throw t.status = "pending", t.then((a) => {
        t.status = "fulfilled", t.value = a;
      }, (a) => {
        t.status = "rejected", t.reason = a;
      }), t;
  }
}), Fd = {
  dedupe: !0
}, Wv = Promise.resolve(hn), C5 = () => li, T5 = (t, a, r) => {
  const { cache: l, compare: s, suspense: u, fallbackData: c, revalidateOnMount: h, revalidateIfStale: g, refreshInterval: m, refreshWhenHidden: y, refreshWhenOffline: p, keepPreviousData: v, strictServerPrefetchWarning: b } = r, [w, R, T, _] = ai.get(l), [O, E] = dm(t), L = N.useRef(!1), B = N.useRef(!1), H = N.useRef(O), V = N.useRef(a), D = N.useRef(r), G = () => D.current, le = () => G().isVisible() && G().isOnline(), [$, K, re, j] = tw(l, O), I = N.useRef({}).current, C = nt(c) ? nt(r.fallback) ? hn : r.fallback[O] : c, z = (Te, Ie) => {
    for (const Be in I) {
      const $e = Be;
      if ($e === "data") {
        if (!s(Te[$e], Ie[$e]) && (!nt(Te[$e]) || !s(he, Ie[$e])))
          return !1;
      } else if (Ie[$e] !== Te[$e])
        return !1;
    }
    return !0;
  }, Y = !L.current, X = N.useMemo(() => {
    const Te = $(), Ie = j(), Be = (Qe) => {
      const Fe = Xi(Qe);
      return delete Fe._k, (() => {
        if (!O || !a || G().isPaused()) return !1;
        if (Y && !nt(h)) return h;
        const yt = nt(C) ? Fe.data : C;
        return nt(yt) || g;
      })() ? {
        isValidating: !0,
        isLoading: !0,
        ...Fe
      } : Fe;
    }, $e = Be(Te), St = Te === Ie ? $e : Be(Ie);
    let Je = $e;
    return [
      () => {
        const Qe = Be($());
        return z(Qe, Je) ? (Je.data = Qe.data, Je.isLoading = Qe.isLoading, Je.isValidating = Qe.isValidating, Je.error = Qe.error, Je) : (Je = Qe, Qe);
      },
      () => St
    ];
  }, [
    l,
    O
  ]), te = Zv.useSyncExternalStore(N.useCallback(
    (Te) => re(O, (Ie, Be) => {
      z(Be, Ie) || Te();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      l,
      O
    ]
  ), X[0], X[1]), A = w[O] && w[O].length > 0, k = te.data, F = nt(k) ? C && ew(C) ? Qd(C) : C : k, ee = te.error, se = N.useRef(F), he = v ? nt(k) ? nt(se.current) ? F : se.current : k : F, me = O && nt(F), W = N.useRef(null);
  !pl && // getServerSnapshot is only called during hydration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Zv.useSyncExternalStore(C5, () => (W.current = !1, W), () => (W.current = !0, W));
  const ge = W.current;
  b && ge && !u && me && console.warn(`Missing pre-initiated data for serialized key "${O}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
  const ze = !O || !a || G().isPaused() || A && !nt(ee) ? !1 : Y && !nt(h) ? h : u ? nt(F) ? !1 : g : nt(F) || g, Ce = Y && ze, Se = nt(te.isValidating) ? Ce : te.isValidating, xe = nt(te.isLoading) ? Ce : te.isLoading, Re = N.useCallback(
    async (Te) => {
      const Ie = V.current;
      if (!O || !Ie || B.current || G().isPaused())
        return !1;
      let Be, $e, St = !0;
      const Je = Te || {}, Qe = !T[O] || !Je.dedupe, Fe = () => Kv ? !B.current && O === H.current && L.current : O === H.current, gt = {
        isValidating: !1,
        isLoading: !1
      }, yt = () => {
        K(gt);
      }, Xt = () => {
        const mt = T[O];
        mt && mt[1] === $e && delete T[O];
      }, jt = {
        isValidating: !0
      };
      nt($().data) && (jt.isLoading = !0);
      try {
        if (Qe && (K(jt), r.loadingTimeout && nt($().data) && setTimeout(() => {
          St && Fe() && G().onLoadingSlow(O, r);
        }, r.loadingTimeout), T[O] = [
          Ie(E),
          Nh()
        ]), [Be, $e] = T[O], Be = await Be, Qe && setTimeout(Xt, r.dedupingInterval), !T[O] || T[O][1] !== $e)
          return Qe && Fe() && G().onDiscarded(O), !1;
        gt.error = hn;
        const mt = R[O];
        if (!nt(mt) && // case 1
        ($e <= mt[0] || // case 2
        $e <= mt[1] || // case 3
        mt[1] === 0))
          return yt(), Qe && Fe() && G().onDiscarded(O), !1;
        const ot = $().data;
        gt.data = s(ot, Be) ? ot : Be, Qe && Fe() && G().onSuccess(Be, O, r);
      } catch (mt) {
        Xt();
        const ot = G(), { shouldRetryOnError: Yn } = ot;
        ot.isPaused() || (gt.error = mt, Qe && Fe() && (ot.onError(mt, O, ot), (Yn === !0 || Aa(Yn) && Yn(mt)) && (!G().revalidateOnFocus || !G().revalidateOnReconnect || le()) && ot.onErrorRetry(mt, O, ot, (yn) => {
          const tn = w[O];
          tn && tn[0] && tn[0](Qv, yn);
        }, {
          retryCount: (Je.retryCount || 0) + 1,
          dedupe: !0
        })));
      }
      return St = !1, yt(), !0;
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
      O,
      l
    ]
  ), Ye = N.useCallback(
    // Use callback to make sure `keyRef.current` returns latest result every time
    (...Te) => nw(l, H.current, ...Te),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (Gd(() => {
    V.current = a, D.current = r, nt(k) || (se.current = k);
  }), Gd(() => {
    if (!O) return;
    const Te = Re.bind(hn, Fd);
    let Ie = 0;
    G().revalidateOnFocus && (Ie = Date.now() + G().focusThrottleInterval);
    const $e = R5(O, w, (St, Je = {}) => {
      if (St == Px) {
        const Qe = Date.now();
        G().revalidateOnFocus && Qe > Ie && le() && (Ie = Qe + G().focusThrottleInterval, Te());
      } else if (St == Jx)
        G().revalidateOnReconnect && le() && Te();
      else {
        if (St == Wx)
          return Re();
        if (St == Qv)
          return Re(Je);
      }
    });
    return B.current = !1, H.current = O, L.current = !0, K({
      _k: E
    }), ze && (T[O] || (nt(F) || pl ? Te() : o5(Te))), () => {
      B.current = !0, $e();
    };
  }, [
    O
  ]), Gd(() => {
    let Te;
    function Ie() {
      const $e = Aa(m) ? m($().data) : m;
      $e && Te !== -1 && (Te = setTimeout(Be, $e));
    }
    function Be() {
      !$().error && (y || G().isVisible()) && (p || G().isOnline()) ? Re(Fd).then(Ie) : Ie();
    }
    return Ie(), () => {
      Te && (clearTimeout(Te), Te = -1);
    };
  }, [
    m,
    y,
    p,
    O
  ]), N.useDebugValue(he), u) {
    if (!Kv && pl && me)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    me && (V.current = a, D.current = r, B.current = !1);
    const Te = _[O], Ie = !nt(Te) && me ? Ye(Te) : Wv;
    if (Qd(Ie), !nt(ee) && me)
      throw ee;
    const Be = me ? Re(Fd) : Wv;
    !nt(he) && me && (Be.status = "fulfilled", Be.value = !0), Qd(Be);
  }
  return {
    mutate: Ye,
    get data() {
      return I.data = !0, he;
    },
    get error() {
      return I.error = !0, ee;
    },
    get isValidating() {
      return I.isValidating = !0, Se;
    },
    get isLoading() {
      return I.isLoading = !0, xe;
    }
  };
}, eb = N5(T5);
var M5 = "_1xasopc0", D5 = "_1xasopc1", A5 = "_1xasopc2", z5 = "_1xasopc3", O5 = "_1xasopc4", L5 = "_1xasopc5", j5 = "_1xasopc6", H5 = "_1xasopc7", B5 = "_1xasopc8";
function U5(t, a) {
  const r = a.split(",").map((u) => u.trim().toLowerCase()).filter(Boolean);
  if (r.length === 0) return !0;
  const l = t.name.toLowerCase(), s = t.type.toLowerCase();
  return r.some((u) => u.startsWith(".") ? l.endsWith(u) : u.endsWith("/*") ? s.startsWith(u.slice(0, -1)) : s === u);
}
function k5(t, a, r) {
  for (const l of t) {
    if (a && !U5(l, a))
      return `"${l.name}" is not an accepted file type.`;
    if (r !== void 0 && l.size > r)
      return `"${l.name}" exceeds the maximum size.`;
  }
  return null;
}
function tb({
  accept: t,
  maxSizeBytes: a,
  multiple: r = !1,
  disabled: l = !1,
  label: s,
  hint: u,
  ariaLabel: c,
  className: h,
  renderPreview: g,
  onFiles: m
}) {
  const y = N.useRef(null), p = N.useId(), v = N.useId(), [b, w] = N.useState(!1), [R, T] = N.useState(null), [_, O] = N.useState([]), E = N.useCallback(
    ($) => {
      if (!$ || $.length === 0) return;
      const K = Array.from($), re = r ? K : K.slice(0, 1), j = k5(re, t, a);
      if (j) {
        T(j);
        return;
      }
      T(null), O(re), m(re);
    },
    [t, a, r, m]
  ), L = N.useCallback(() => {
    l || y.current?.click();
  }, [l]), B = N.useCallback(
    ($) => {
      l || ($.key === "Enter" || $.key === " ") && ($.preventDefault(), L());
    },
    [l, L]
  ), H = N.useCallback(
    ($) => {
      $.preventDefault(), w(!1), !l && E($.dataTransfer.files);
    },
    [l, E]
  ), V = N.useCallback(
    ($) => {
      $.preventDefault(), l || w(!0);
    },
    [l]
  ), D = N.useCallback(($) => {
    $.preventDefault(), w(!1);
  }, []), G = [u ? v : null, R ? p : null].filter(Boolean).join(" "), le = [
    M5,
    b ? D5 : "",
    l ? A5 : "",
    R !== null ? z5 : "",
    h
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ S.jsxs("div", { children: [
    /* @__PURE__ */ S.jsxs(
      "div",
      {
        role: "button",
        tabIndex: l ? -1 : 0,
        "aria-label": c ?? "file dropzone",
        "aria-disabled": l,
        "aria-describedby": G || void 0,
        className: le,
        onClick: L,
        onKeyDown: B,
        onDrop: H,
        onDragOver: V,
        onDragLeave: D,
        children: [
          /* @__PURE__ */ S.jsx(
            "input",
            {
              ref: y,
              type: "file",
              className: O5,
              accept: t,
              multiple: r,
              disabled: l,
              tabIndex: -1,
              onChange: ($) => E($.target.files)
            }
          ),
          /* @__PURE__ */ S.jsx("span", { className: L5, children: s ?? (b ? "Drop to upload" : "Drop a file or click to browse") }),
          u && /* @__PURE__ */ S.jsx("span", { id: v, className: j5, children: u }),
          g && _.length > 0 && /* @__PURE__ */ S.jsx("div", { className: B5, children: g(_) })
        ]
      }
    ),
    R && /* @__PURE__ */ S.jsx("div", { id: p, role: "alert", className: H5, children: R })
  ] });
}
function nb(t) {
  const [a, r] = N.useState(null);
  return N.useEffect(() => {
    if (!t) {
      r(null);
      return;
    }
    const l = URL.createObjectURL(t);
    return r(l), () => URL.revokeObjectURL(l);
  }, [t]), a;
}
async function V5(t) {
  const a = new FormData();
  a.append("file", t);
  const r = await fetch(`${nc}/uploads`, { method: "POST", body: a });
  if (!r.ok) {
    let l = null;
    try {
      l = await r.json();
    } catch {
      l = null;
    }
    throw new tc(
      r.status,
      l?.category ?? "unknown",
      l?.message ?? r.statusText,
      l?.requestId
    );
  }
  return await r.json();
}
function ab(t) {
  const [a, r] = N.useState(null), [l, s] = N.useState(!1), [u, c] = N.useState(null), h = N.useCallback(
    async (g) => {
      if (r(g), c(null), !g) {
        t(null, null);
        return;
      }
      s(!0);
      try {
        const { path: m } = await V5(g);
        t(g.name, m);
      } catch (m) {
        const y = m instanceof tc ? m.message : "Upload failed. Try again.";
        c(y), t(null, null), gr.error(y);
      } finally {
        s(!1);
      }
    },
    [t]
  );
  return { file: a, uploading: l, uploadError: u, pick: h };
}
var q5 = "cyswg40", ib = "cyswg41", rb = "cyswg42", lb = "cyswg43", ob = "cyswg44", sb = "cyswg45", Su = "cyswg46";
const ub = 32 * 1024 * 1024;
function Y5({
  lastImageRequired: t,
  refError: a,
  lastError: r
}) {
  const { setRefImage: l, setLastImage: s } = Gi(), u = N.useCallback(
    (p, v) => l(p, v ?? ""),
    [l]
  ), c = N.useCallback(
    (p, v) => s(p, v),
    [s]
  ), h = ab(u), g = ab(c), m = nb(h.file), y = nb(g.file);
  return /* @__PURE__ */ S.jsxs("div", { className: q5, children: [
    /* @__PURE__ */ S.jsxs("div", { className: ib, children: [
      /* @__PURE__ */ S.jsxs("span", { className: rb, children: [
        "Reference image ",
        /* @__PURE__ */ S.jsx(ta, { tone: "accent", children: "required" })
      ] }),
      /* @__PURE__ */ S.jsx(
        tb,
        {
          accept: "image/*",
          maxSizeBytes: ub,
          ariaLabel: "reference image upload",
          label: h.file ? "Replace reference image" : "Drop the anchor image or browse",
          hint: "Defines identity. Aspect-match to the render resolution; dims divisible by 16.",
          onFiles: (p) => void h.pick(p[0] ?? null),
          renderPreview: () => m ? /* @__PURE__ */ S.jsx("img", { className: lb, src: m, alt: "reference preview" }) : null
        }
      ),
      h.uploading && /* @__PURE__ */ S.jsx("span", { className: sb, children: "Uploading…" }),
      !h.uploading && h.file && /* @__PURE__ */ S.jsx("span", { className: ob, children: h.file.name }),
      h.uploadError && /* @__PURE__ */ S.jsx("span", { role: "alert", className: Su, children: h.uploadError }),
      a && /* @__PURE__ */ S.jsx("span", { role: "alert", className: Su, children: a })
    ] }),
    /* @__PURE__ */ S.jsxs("div", { className: ib, children: [
      /* @__PURE__ */ S.jsxs("span", { className: rb, children: [
        "Last image",
        " ",
        t ? /* @__PURE__ */ S.jsx(ta, { tone: "warning", children: "required for morph" }) : /* @__PURE__ */ S.jsx(ta, { tone: "neutral", children: "optional" })
      ] }),
      /* @__PURE__ */ S.jsx(
        tb,
        {
          accept: "image/*",
          maxSizeBytes: ub,
          ariaLabel: "last image upload",
          label: g.file ? "Replace last image" : "Drop the end keyframe or browse",
          hint: "FLF2V end keyframe. Animates reference → last image over the clip.",
          onFiles: (p) => void g.pick(p[0] ?? null),
          renderPreview: () => y ? /* @__PURE__ */ S.jsx("img", { className: lb, src: y, alt: "last preview" }) : null
        }
      ),
      g.uploading && /* @__PURE__ */ S.jsx("span", { className: sb, children: "Uploading…" }),
      !g.uploading && g.file && /* @__PURE__ */ S.jsx("span", { className: ob, children: g.file.name }),
      g.uploadError && /* @__PURE__ */ S.jsx("span", { role: "alert", className: Su, children: g.uploadError }),
      r && /* @__PURE__ */ S.jsx("span", { role: "alert", className: Su, children: r })
    ] })
  ] });
}
var $5 = "dck790", X5 = "dck791", G5 = "dck792";
function Fu({ title: t, detail: a, action: r, className: l }) {
  const s = [$5, l].filter(Boolean).join(" ");
  return /* @__PURE__ */ S.jsxs("div", { className: s, children: [
    /* @__PURE__ */ S.jsx("span", { className: X5, children: t }),
    a && /* @__PURE__ */ S.jsx("span", { className: G5, children: a }),
    r
  ] });
}
var I5 = "_1880igs0", Z5 = "_1880igs1", Q5 = "_1880igs2", F5 = "_1880igs3", K5 = "_1880igs4", P5 = "_1880igs5", J5 = "_1880igs6";
const W5 = {
  queued: "neutral",
  running: "accent",
  succeeded: "success",
  failed: "warning",
  cancelled: "neutral"
};
function e4({ jobs: t, onOpen: a }) {
  return t.length === 0 ? /* @__PURE__ */ S.jsx(
    Fu,
    {
      title: "No renders yet",
      detail: "Completed renders appear here with their preset, parameters and status."
    }
  ) : /* @__PURE__ */ S.jsx("div", { className: I5, children: t.map((r) => /* @__PURE__ */ S.jsxs("button", { type: "button", className: Z5, onClick: () => a(r), children: [
    /* @__PURE__ */ S.jsxs("span", { className: Q5, children: [
      /* @__PURE__ */ S.jsx("span", { className: F5, children: r.presetId ?? "custom" }),
      /* @__PURE__ */ S.jsx("span", { className: K5, children: t4(r) })
    ] }),
    /* @__PURE__ */ S.jsxs("span", { className: P5, children: [
      /* @__PURE__ */ S.jsx("time", { className: J5, dateTime: r.createdAt, title: n4(r.createdAt), children: a4(r.createdAt) }),
      /* @__PURE__ */ S.jsx(ta, { tone: W5[r.status], children: r.status })
    ] })
  ] }, r.id)) });
}
function t4(t) {
  const a = t.params, r = [];
  return a.width && a.height && r.push(`${a.width}×${a.height}`), a.num_clips && r.push(`${a.num_clips} clips`), a.num_inference_steps && r.push(`${a.num_inference_steps} steps`), r.join(" · ") || "—";
}
function n4(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
function a4(t) {
  const a = new Date(t), r = a.getTime();
  if (Number.isNaN(r)) return "";
  const l = Date.now() - r;
  if (l < 0) return "just now";
  const s = Math.floor(l / 6e4);
  if (s < 1) return "just now";
  if (s < 60) return `${s}m ago`;
  const u = Math.floor(s / 60);
  if (u < 24) return `${u}h ago`;
  const c = Math.floor(u / 24);
  return c < 7 ? `${c}d ago` : a.toLocaleDateString();
}
var i4 = "dgx4n20", r4 = "dgx4n21", l4 = "dgx4n22", o4 = "dgx4n23", s4 = "dgx4n24", u4 = "dgx4n25", c4 = "dgx4n26", f4 = "dgx4n27";
function d4(t) {
  const a = t.trim();
  return (a.split(/(?<=[.!?])\s/)[0] ?? a).replace(/[.!?]+$/, "");
}
function h4({
  presets: t,
  selectedId: a,
  onSelect: r
}) {
  const l = N.useMemo(() => U3(t), [t]), s = N.useRef([]), u = N.useCallback(
    (g) => {
      const m = l[g];
      m && (s.current[g]?.focus(), r(m));
    },
    [l, r]
  ), c = N.useCallback(
    (g, m) => {
      const y = l.length - 1;
      switch (g.key) {
        case "ArrowRight":
        case "ArrowDown":
          g.preventDefault(), u(m === y ? 0 : m + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          g.preventDefault(), u(m === 0 ? y : m - 1);
          break;
        case "Home":
          g.preventDefault(), u(0);
          break;
        case "End":
          g.preventDefault(), u(y);
          break;
      }
    },
    [l, u]
  );
  if (t.length === 0)
    return /* @__PURE__ */ S.jsx(
      Fu,
      {
        title: "No presets available",
        detail: "The preset catalog could not be loaded from the extension."
      }
    );
  const h = Math.max(
    0,
    l.findIndex((g) => g.id === a)
  );
  return /* @__PURE__ */ S.jsx("div", { className: i4, role: "radiogroup", "aria-label": "Render presets", children: l.map((g, m) => {
    const y = B3(g), p = g.id === a, v = g.id === Vo, b = [
      r4,
      v ? l4 : "",
      p ? o4 : ""
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ S.jsxs(
      "button",
      {
        ref: (w) => {
          s.current[m] = w;
        },
        type: "button",
        role: "radio",
        "aria-checked": p,
        tabIndex: m === h ? 0 : -1,
        title: g.description,
        className: b,
        onClick: () => r(g),
        onKeyDown: (w) => c(w, m),
        children: [
          /* @__PURE__ */ S.jsxs("div", { className: s4, children: [
            /* @__PURE__ */ S.jsx("span", { className: u4, children: g.label }),
            v && /* @__PURE__ */ S.jsx(ta, { tone: "accent", children: "Default" })
          ] }),
          /* @__PURE__ */ S.jsx("span", { className: c4, children: d4(g.description) }),
          /* @__PURE__ */ S.jsxs("div", { className: f4, children: [
            /* @__PURE__ */ S.jsx(ta, { tone: "neutral", children: y.resolution }),
            /* @__PURE__ */ S.jsx(ta, { tone: "neutral", children: y.duration }),
            /* @__PURE__ */ S.jsx(ta, { tone: y.isLowVram ? "success" : "neutral", children: y.vram }),
            y.isOffDistribution && /* @__PURE__ */ S.jsx(ta, { tone: "warning", children: "off-distribution" }),
            y.requiresLastImage && /* @__PURE__ */ S.jsx(ta, { tone: "warning", children: "needs last image" })
          ] })
        ]
      },
      g.id
    );
  }) });
}
var m4 = "_1ntn2zv0", p4 = "_1ntn2zv1", g4 = "_1ntn2zv2", y4 = "_1ntn2zv3", v4 = "_1ntn2zv4", b4 = "_1ntn2zv5", cb = "_1ntn2zv6", x4 = "_1ntn2zv7", w4 = "_1ntn2zv8", S4 = "_1ntn2zv9", E4 = "_1ntn2zva";
function _4({ error: t, textareaId: a }) {
  const { params: r, setPrompts: l } = Gi(), [s, u] = N.useState(!1), c = r.prompts ?? [""], h = N.useMemo(
    () => Math.max(1, r.num_clips ?? c.length ?? 1),
    [r.num_clips, c.length]
  ), g = N.useMemo(
    () => c.slice(h).filter((v) => v.trim().length > 0).length,
    [c, h]
  ), m = (v) => {
    const b = c.length > 0 ? [...c] : [""];
    b[0] = v, l(b);
  }, y = (v, b) => {
    const w = Math.max(h, c.length, v + 1), R = Array.from({ length: w }, (T, _) => c[_] ?? "");
    R[v] = b, l(R);
  }, p = (v) => {
    if (u(v), v) {
      const b = c[0] ?? "", w = Math.max(h, c.length);
      l(Array.from({ length: w }, (R, T) => c[T] ?? b));
    }
  };
  return /* @__PURE__ */ S.jsxs("div", { className: m4, children: [
    /* @__PURE__ */ S.jsx("div", { className: p4, children: /* @__PURE__ */ S.jsxs("span", { className: g4, children: [
      /* @__PURE__ */ S.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": s,
          "aria-label": "per-clip prompts",
          className: y4,
          onClick: () => p(!s),
          children: /* @__PURE__ */ S.jsx("span", { className: v4, "aria-hidden": "true" })
        }
      ),
      "Per-clip prompts"
    ] }) }),
    s ? Array.from({ length: h }, (v, b) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: clip position is the stable identity
      /* @__PURE__ */ S.jsxs("div", { className: x4, children: [
        /* @__PURE__ */ S.jsxs("span", { className: w4, children: [
          "Clip ",
          b + 1
        ] }),
        /* @__PURE__ */ S.jsx(
          "textarea",
          {
            id: b === 0 ? a : void 0,
            className: cb,
            "aria-label": `prompt for clip ${b + 1}`,
            "aria-invalid": b === 0 && t !== void 0 ? !0 : void 0,
            value: c[b] ?? "",
            onChange: (w) => y(b, w.target.value)
          }
        )
      ] }, `clip-${b}`)
    )) : /* @__PURE__ */ S.jsx(
      "textarea",
      {
        id: a,
        className: cb,
        "aria-label": "single prompt",
        "aria-invalid": t !== void 0 || void 0,
        placeholder: "One prompt across all clips. Describe MOTION, not appearance change.",
        value: c[0] ?? "",
        onChange: (v) => m(v.target.value)
      }
    ),
    g > 0 && /* @__PURE__ */ S.jsxs("output", { className: b4, children: [
      g,
      " per-clip prompt",
      g > 1 ? "s" : "",
      " beyond the current Clips count ",
      g > 1 ? "are" : "is",
      " kept but hidden. Raise Clips to edit",
      g > 1 ? " them" : " it",
      " again — they are not discarded."
    ] }),
    /* @__PURE__ */ S.jsx("p", { className: S4, children: "Use a single prompt for a coherent long take. To change appearance, edit the anchor keyframe (edit-then-animate) — appearance verbs in the prompt fight the anchor and cause drift." }),
    t && /* @__PURE__ */ S.jsx("span", { role: "alert", className: E4, children: t })
  ] });
}
var N4 = "_1itrxk30", R4 = "_1itrxk31", C4 = "_1itrxk32", T4 = "_1itrxk33", M4 = "_1itrxk34", D4 = "_1itrxk35", A4 = "_1itrxk36", z4 = "_1itrxk37";
function O4() {
  const { qwenEdit: t, setQwenEdit: a } = Gi();
  return /* @__PURE__ */ S.jsxs("div", { className: N4, children: [
    /* @__PURE__ */ S.jsxs("div", { className: R4, children: [
      /* @__PURE__ */ S.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": t.enabled,
          "aria-label": "enable anchor edit",
          className: A4,
          onClick: () => a({ enabled: !t.enabled }),
          children: /* @__PURE__ */ S.jsx("span", { className: z4, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ S.jsxs("span", { className: C4, children: [
        /* @__PURE__ */ S.jsx("span", { className: T4, children: "Transform anchor (edit-then-animate)" }),
        /* @__PURE__ */ S.jsx("span", { className: M4, children: "Edit the reference keyframe with Qwen-Image-Edit before animating. Coherent transformation without per-frame flicker." })
      ] })
    ] }),
    t.enabled && /* @__PURE__ */ S.jsx(
      "textarea",
      {
        className: D4,
        "aria-label": "anchor edit prompt",
        placeholder: "Edit instruction — keep face geometry/pose/framing; change only appearance.",
        value: t.prompt,
        onChange: (r) => a({ prompt: r.target.value })
      }
    )
  ] });
}
var L4 = "ob7g5b0", j4 = "ob7g5b1", H4 = "ob7g5b3", B4 = "ob7g5b4", U4 = "ob7g5b5", k4 = "ob7g5b6", V4 = "ob7g5b7", q4 = "ob7g5b8", Y4 = "ob7g5b9", $4 = "ob7g5ba";
function X4({
  src: t,
  poster: a,
  fpsLabel: r,
  controls: l = !0,
  loop: s = !1,
  muted: u = !1,
  autoPlay: c = !1,
  ariaLabel: h,
  className: g,
  emptyContent: m,
  onEnded: y,
  onReady: p,
  onError: v
}) {
  const [b, w] = N.useState("loading"), [R, T] = N.useState(null), _ = N.useCallback(() => {
    w("ready"), p?.();
  }, [p]), O = N.useCallback(
    (L) => {
      const B = L.target, H = B.error?.message || `media error code ${B.error?.code ?? "?"}`;
      w("error"), T(H), v?.(new Error(H));
    },
    [v]
  ), E = [L4, g].filter(Boolean).join(" ");
  return t ? b === "error" ? /* @__PURE__ */ S.jsx("div", { className: E, role: "alert", "aria-label": h ?? "video playback error", children: /* @__PURE__ */ S.jsxs("div", { className: V4, children: [
    /* @__PURE__ */ S.jsx("div", { className: q4, children: "Could not play video" }),
    /* @__PURE__ */ S.jsx("div", { className: Y4, children: R ?? "unknown error" }),
    /* @__PURE__ */ S.jsx("a", { className: $4, href: t, download: !0, target: "_blank", rel: "noreferrer", children: "Download file" })
  ] }) }) : /* @__PURE__ */ S.jsxs("div", { className: E, children: [
    b === "loading" && /* @__PURE__ */ S.jsx("div", { className: H4, "aria-hidden": "true", children: /* @__PURE__ */ S.jsx("div", { className: B4 }) }),
    r && /* @__PURE__ */ S.jsx("span", { className: U4, children: r }),
    /* @__PURE__ */ S.jsx(
      "video",
      {
        className: j4,
        src: t,
        poster: a,
        controls: l,
        loop: s,
        muted: u,
        autoPlay: c,
        preload: "metadata",
        "aria-label": h ?? "video player",
        onLoadedData: _,
        onEnded: y,
        onError: O,
        children: /* @__PURE__ */ S.jsx("track", { kind: "captions" })
      }
    )
  ] }) : /* @__PURE__ */ S.jsx("div", { className: E, "aria-label": h ?? "no video", children: /* @__PURE__ */ S.jsx("div", { className: k4, children: m ?? "No video to display yet." }) });
}
const ti = {
  DRIVER_TOO_OLD: -32100,
  TORCH_CUDA_MISMATCH: -32101,
  GPU_NOT_SUPPORTED: -32102,
  MODEL_MISSING: -32103,
  MODEL_LOAD_FAILED: -32104,
  VRAM_BUDGET_EXCEEDED: -32105,
  RENDER_FAILED: -32106,
  RENDER_CANCELLED: -32107,
  CONNECTION_LOST: -32108
}, fb = {
  [ti.DRIVER_TOO_OLD]: {
    title: "GPU driver too old",
    hint: "Update your NVIDIA driver to a version compatible with the CUDA build, then retry."
  },
  [ti.TORCH_CUDA_MISMATCH]: {
    title: "Torch / CUDA mismatch",
    hint: "The installed torch build does not match the GPU CUDA runtime. Reinstall the runtime dependencies."
  },
  [ti.GPU_NOT_SUPPORTED]: {
    title: "GPU not supported",
    hint: "This render requires a CUDA-capable GPU. The fake backend can be used for offline checks."
  },
  [ti.MODEL_MISSING]: {
    title: "Model weights missing",
    hint: "One or more model artifacts are not on disk. Re-run the extension install to download them."
  },
  [ti.MODEL_LOAD_FAILED]: {
    title: "Model failed to load",
    hint: "A weight file may be corrupt. Re-download via install, or check the models directory in Settings."
  },
  [ti.VRAM_BUDGET_EXCEEDED]: {
    title: "Out of VRAM",
    hint: "Raise blocks_to_swap (more offload), lower the resolution, or pick a low-VRAM preset."
  },
  [ti.RENDER_FAILED]: {
    title: "Render failed",
    hint: "The render pipeline hit an unexpected error. Check the worker log for details."
  },
  [ti.RENDER_CANCELLED]: {
    title: "Render cancelled",
    hint: "The render was stopped before completion."
  },
  [ti.CONNECTION_LOST]: {
    title: "Lost connection to the render",
    hint: "The live progress stream dropped. The render may still be running — check History for the final result."
  }
};
function G4(t, a) {
  return t !== null && fb[t] ? fb[t] : {
    title: "Render error",
    hint: a ?? "An unknown error occurred during the render."
  };
}
function I4(t) {
  return t ? `${nc}/media?path=${encodeURIComponent(t)}` : null;
}
var Eu = "_1ojc56g0", Z4 = "_1ojc56g1", Q4 = "_1ojc56g2", F4 = "_1ojc56g3", K4 = "_1ojc56g4", P4 = "_1ojc56g5", J4 = "_1ojc56g6", _u = "_1ojc56g7", W4 = "_1ojc56g8", eO = "_1ojc56g9", tO = "_1ojc56ga", nO = "_1ojc56gb", aO = "_1ojc56gc", iO = "_1ojc56gd", rO = "_1ojc56ge", lO = "_1ojc56gf";
function oO({ state: t, onCancel: a, onReset: r }) {
  const [l, s] = N.useState(!1);
  N.useEffect(() => {
    t.phase !== "running" && s(!1);
  }, [t.phase]);
  const u = N.useCallback(() => {
    s(!0), a();
  }, [a]);
  if (t.phase === "idle")
    return /* @__PURE__ */ S.jsx(
      Fu,
      {
        title: "No active render",
        detail: "Pick a preset, set your anchor image and prompt, then start a render to see live progress here."
      }
    );
  if (t.phase === "error") {
    const m = G4(t.errorCode, t.errorMessage);
    return /* @__PURE__ */ S.jsxs("div", { className: Eu, children: [
      /* @__PURE__ */ S.jsxs("div", { className: iO, role: "alert", children: [
        /* @__PURE__ */ S.jsx("span", { className: rO, children: m.title }),
        /* @__PURE__ */ S.jsx("span", { className: lO, children: m.hint })
      ] }),
      /* @__PURE__ */ S.jsx("div", { className: _u, children: /* @__PURE__ */ S.jsx(ii, { variant: "secondary", onClick: r, children: "Dismiss" }) })
    ] });
  }
  if (t.phase === "cancelled")
    return /* @__PURE__ */ S.jsxs("div", { className: Eu, children: [
      /* @__PURE__ */ S.jsx(Fu, { title: "Render cancelled", detail: "The render was stopped before completion." }),
      /* @__PURE__ */ S.jsx("div", { className: _u, children: /* @__PURE__ */ S.jsx(ii, { variant: "secondary", onClick: r, children: "Reset" }) })
    ] });
  const c = t.renderReport?.fps, h = typeof c == "number" ? c : void 0;
  if (t.phase === "done")
    return /* @__PURE__ */ S.jsxs("output", { className: Eu, children: [
      /* @__PURE__ */ S.jsx(
        X4,
        {
          src: I4(t.outputPath),
          fpsLabel: h ? `${h} fps` : void 0,
          ariaLabel: "rendered output"
        }
      ),
      /* @__PURE__ */ S.jsx(sO, { state: t }),
      /* @__PURE__ */ S.jsx("div", { className: _u, children: /* @__PURE__ */ S.jsx(ii, { variant: "secondary", onClick: r, children: "New render" }) })
    ] });
  const g = Math.round(t.overallFraction * 100);
  return /* @__PURE__ */ S.jsxs("div", { className: Eu, children: [
    /* @__PURE__ */ S.jsx(
      "div",
      {
        className: P4,
        role: "progressbar",
        "aria-label": "overall progress",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": g,
        children: /* @__PURE__ */ S.jsx(
          "div",
          {
            className: J4,
            style: { transform: `scaleX(${Math.max(0.02, t.overallFraction)})` }
          }
        )
      }
    ),
    t.stalled && /* @__PURE__ */ S.jsx("output", { className: aO, children: "Still working… no progress for a while — the connection may be lost. The render may still be running; check History if it does not resume." }),
    /* @__PURE__ */ S.jsxs("div", { className: Z4, "aria-live": "polite", children: [
      /* @__PURE__ */ S.jsx(Nu, { label: "Overall", value: `${g}%` }),
      /* @__PURE__ */ S.jsx(
        Nu,
        {
          label: "Clip",
          value: t.numClips ? `${t.clipIndex + 1} / ${t.numClips}` : "—"
        }
      ),
      /* @__PURE__ */ S.jsx(
        Nu,
        {
          label: "Step",
          value: t.totalSteps ? `${t.step} / ${t.totalSteps}` : "—"
        }
      ),
      /* @__PURE__ */ S.jsx(
        Nu,
        {
          label: "VRAM peak",
          value: t.vramPeakGib !== null ? `${t.vramPeakGib.toFixed(1)} GiB` : "—"
        }
      )
    ] }),
    /* @__PURE__ */ S.jsx("div", { className: _u, children: /* @__PURE__ */ S.jsx(ii, { variant: "danger", onClick: u, loading: l, disabled: l, children: l ? "Cancelling…" : "Cancel render" }) })
  ] });
}
function Nu({ label: t, value: a }) {
  return /* @__PURE__ */ S.jsxs("div", { className: Q4, children: [
    /* @__PURE__ */ S.jsx("span", { className: F4, children: t }),
    /* @__PURE__ */ S.jsx("span", { className: K4, children: a })
  ] });
}
function sO({ state: t }) {
  const a = t.renderReport;
  if (!a) return null;
  const r = [];
  return typeof a.frames == "number" && r.push(["Frames", String(a.frames)]), typeof a.duration_seconds == "number" && r.push(["Duration", `${a.duration_seconds.toFixed(1)}s`]), t.vramPeakGib !== null && r.push(["VRAM peak", `${t.vramPeakGib.toFixed(1)} GiB`]), typeof a.sha256 == "string" && r.push(["sha256", `${a.sha256.slice(0, 16)}…`]), t.outputPath && r.push(["Output", t.outputPath]), r.length === 0 ? null : /* @__PURE__ */ S.jsx("div", { className: W4, children: r.map(([l, s]) => /* @__PURE__ */ S.jsxs("div", { className: eO, children: [
    /* @__PURE__ */ S.jsx("span", { className: tO, children: l }),
    /* @__PURE__ */ S.jsx("span", { className: nO, children: s })
  ] }, l)) });
}
var uO = "_1hbttwg0", cO = "_1hbttwg1", fO = "_1hbttwg2", dO = "_1hbttwg3", rw = "_1hbttwg4", hO = "_1hbttwg5", mO = "_1hbttwg7 _1hbttwg6", pO = "_1hbttwg8 _1hbttwg6", db = "_1hbttwg9", gO = "_1hbttwga", yO = "_1hbttwgb", vO = "_1hbttwgc", bO = "_1hbttwgd";
function xO({ spec: t, value: a, error: r, onChange: l }) {
  const s = N.useId(), u = `${s}-help`, c = r ? `${s}-error` : u;
  return /* @__PURE__ */ S.jsxs("div", { className: uO, children: [
    /* @__PURE__ */ S.jsxs("div", { className: cO, children: [
      /* @__PURE__ */ S.jsx("label", { className: fO, htmlFor: s, children: t.label }),
      t.control === "slider" && /* @__PURE__ */ S.jsx("span", { className: dO, children: SO(a) })
    ] }),
    wO(t, a, l, s, c, r !== void 0),
    /* @__PURE__ */ S.jsx("span", { id: u, className: rw, children: t.help }),
    r && /* @__PURE__ */ S.jsx("span", { id: `${s}-error`, role: "alert", className: hO, children: r })
  ] });
}
function wO(t, a, r, l, s, u) {
  switch (t.control) {
    case "toggle": {
      const c = !!a;
      return /* @__PURE__ */ S.jsxs("div", { className: yO, children: [
        /* @__PURE__ */ S.jsx(
          "button",
          {
            type: "button",
            id: l,
            role: "switch",
            "aria-checked": c,
            "aria-describedby": s,
            className: vO,
            onClick: () => r(!c),
            children: /* @__PURE__ */ S.jsx("span", { className: bO, "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ S.jsx("span", { className: rw, children: c ? "On" : "Off" })
      ] });
    }
    case "select":
      return /* @__PURE__ */ S.jsx(
        "select",
        {
          id: l,
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          className: [pO, u ? db : ""].filter(Boolean).join(" "),
          value: String(a ?? t.default ?? ""),
          onChange: (c) => r(c.target.value),
          children: t.options?.map((c) => /* @__PURE__ */ S.jsx("option", { value: c.value, children: c.label }, c.value))
        }
      );
    case "slider":
      return /* @__PURE__ */ S.jsx(
        "input",
        {
          id: l,
          type: "range",
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          className: gO,
          min: t.min,
          max: t.max,
          step: t.step,
          value: hb(a, t),
          onChange: (c) => r(Number(c.target.value))
        }
      );
    default:
      return /* @__PURE__ */ S.jsx(
        "input",
        {
          id: l,
          type: "number",
          inputMode: "numeric",
          "aria-describedby": s,
          "aria-invalid": u || void 0,
          className: [mO, u ? db : ""].filter(Boolean).join(" "),
          min: t.min,
          max: t.max,
          step: t.step,
          value: hb(a, t),
          onChange: (c) => r(Number(c.target.value))
        }
      );
  }
}
function hb(t, a) {
  return typeof t == "number" && Number.isFinite(t) ? t : typeof a.default == "number" ? a.default : a.min ?? 0;
}
function SO(t) {
  return typeof t != "number" ? "—" : Number.isInteger(t) ? String(t) : t.toFixed(2);
}
var EO = "_1f0q5gf0", _O = "_1f0q5gf1", NO = "_1f0q5gf2", RO = "_1f0q5gf3", CO = "_1f0q5gf4", TO = "_1f0q5gf5", MO = "_1f0q5gf6", DO = "_1f0q5gf7", AO = "_1f0q5gf8";
function zO({
  title: t,
  description: a,
  badge: r,
  defaultCollapsed: l = !1,
  collapsible: s = !0,
  className: u,
  children: c
}) {
  const h = N.useId(), [g, m] = N.useState(s ? l : !1), y = [EO, u].filter(Boolean).join(" "), p = [NO, g ? RO : ""].filter(Boolean).join(" "), v = !s || !g;
  return /* @__PURE__ */ S.jsxs("section", { className: y, children: [
    /* @__PURE__ */ S.jsxs(
      "button",
      {
        type: "button",
        className: _O,
        "aria-expanded": v,
        "aria-controls": h,
        disabled: !s,
        onClick: () => s && m((b) => !b),
        children: [
          s && /* @__PURE__ */ S.jsx("span", { className: p, "aria-hidden": "true", children: /* @__PURE__ */ S.jsxs("svg", { viewBox: "0 0 16 16", width: "100%", height: "100%", fill: "none", "aria-hidden": "true", children: [
            /* @__PURE__ */ S.jsx("title", { children: "toggle" }),
            /* @__PURE__ */ S.jsx(
              "path",
              {
                d: "M4 6l4 4 4-4",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            )
          ] }) }),
          /* @__PURE__ */ S.jsxs("span", { className: CO, children: [
            /* @__PURE__ */ S.jsx("span", { className: TO, children: t }),
            a && /* @__PURE__ */ S.jsx("span", { className: MO, children: a })
          ] }),
          r && /* @__PURE__ */ S.jsx("span", { className: DO, children: r })
        ]
      }
    ),
    v && /* @__PURE__ */ S.jsx("div", { id: h, className: AO, children: c })
  ] });
}
var OO = "kn07ek0", LO = "kn07ek1";
function jO({ issues: t }) {
  const { params: a, updateParam: r } = Gi(), l = (s) => t.find((u) => u.field === s && u.severity === "error")?.message;
  return /* @__PURE__ */ S.jsx("div", { className: OO, children: Zx.map((s) => {
    const u = D3(s.id);
    return u.length === 0 ? null : /* @__PURE__ */ S.jsx(
      zO,
      {
        title: s.title,
        description: s.description,
        defaultCollapsed: s.defaultCollapsed,
        badge: s.defaultCollapsed ? /* @__PURE__ */ S.jsx(ta, { tone: "neutral", children: "advanced" }) : void 0,
        children: /* @__PURE__ */ S.jsx("div", { className: LO, children: u.map((c) => /* @__PURE__ */ S.jsx(
          xO,
          {
            spec: c,
            value: a[c.key],
            error: l(c.key),
            onChange: (h) => r(c.key, h)
          },
          c.key
        )) })
      },
      s.id
    );
  }) });
}
var HO = "_1w9jfpf0", BO = "_1w9jfpf1", UO = "_1w9jfpf2", kO = "_1w9jfpf3", VO = "_1w9jfpf4";
const Rh = "svi2-anchor-panel", lw = "svi2-prompt-input";
function qO() {
  const { presetId: t, params: a, render: r, applyPresetById: l, resetRender: s, showJobResult: u } = Gi(), { issues: c, blocked: h, busy: g, submit: m, cancel: y, focusRequest: p } = Kx();
  $O(p);
  const v = eb("svi2/presets", r1), b = eb("svi2/history", () => k3(25)), w = v.data?.presets ?? [], R = b.data?.jobs ?? [], T = Fx(t, a), _ = c.find((H) => H.field === "ref_image_path")?.message, O = c.find((H) => H.field === "last_image_path")?.message, E = c.find((H) => H.field === "prompts")?.message, L = c.find(
    (H) => H.field === "width" && H.severity === "warning"
  )?.message, B = N.useCallback(
    (H) => {
      u(H);
    },
    [u]
  );
  return /* @__PURE__ */ S.jsxs("div", { className: HO, children: [
    /* @__PURE__ */ S.jsxs("div", { className: BO, children: [
      /* @__PURE__ */ S.jsx(
        ni,
        {
          title: "Preset",
          description: "Starting points for a render. Every field stays nudgeable after you apply one.",
          children: /* @__PURE__ */ S.jsx(h4, { presets: w, selectedId: t, onSelect: l })
        }
      ),
      /* @__PURE__ */ S.jsx("div", { id: Rh, children: /* @__PURE__ */ S.jsx(
        ni,
        {
          title: "Anchor",
          description: "The reference image defines identity for the whole take.",
          children: /* @__PURE__ */ S.jsx(
            Y5,
            {
              lastImageRequired: T,
              refError: _,
              lastError: O
            }
          )
        }
      ) }),
      /* @__PURE__ */ S.jsx(ni, { title: "Prompt", description: "One prompt for a coherent take, or per-clip when needed.", children: /* @__PURE__ */ S.jsx(_4, { error: E, textareaId: lw }) }),
      /* @__PURE__ */ S.jsx(ni, { title: "Transform", description: "Edit the anchor before animating it.", children: /* @__PURE__ */ S.jsx(O4, {}) }),
      /* @__PURE__ */ S.jsxs(ni, { title: "Parameters", description: "Grouped by tier. Advanced tiers stay collapsed.", children: [
        L && /* @__PURE__ */ S.jsx("output", { className: VO, children: L }),
        /* @__PURE__ */ S.jsx(jO, { issues: c })
      ] })
    ] }),
    /* @__PURE__ */ S.jsxs("div", { className: UO, children: [
      /* @__PURE__ */ S.jsxs(
        ni,
        {
          title: "Render",
          description: g ? "Render in progress." : "Live progress and output.",
          children: [
            /* @__PURE__ */ S.jsx(oO, { state: r, onCancel: y, onReset: s }),
            !g && /* @__PURE__ */ S.jsx("div", { className: kO, children: /* @__PURE__ */ S.jsx(
              ii,
              {
                variant: "primary",
                disabled: h,
                title: h ? "Fix the highlighted fields before rendering" : void 0,
                onClick: () => void m(),
                children: "Render"
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ S.jsx(ni, { title: "History", description: "Past renders for this deployment.", children: /* @__PURE__ */ S.jsx(e4, { jobs: R, onOpen: B }) })
    ] })
  ] });
}
const YO = {
  ref_image_path: Rh,
  last_image_path: Rh,
  prompts: lw
};
function $O(t) {
  N.useEffect(() => {
    if (!t || typeof document > "u") return;
    const a = YO[t.field];
    if (a) {
      const l = document.getElementById(a);
      mb(l);
      return;
    }
    XO(t.field);
    const r = window.requestAnimationFrame(() => {
      const l = document.querySelector('[aria-invalid="true"]');
      mb(l);
    });
    return () => window.cancelAnimationFrame(r);
  }, [t]);
}
function XO(t) {
  const a = cm.find((s) => s.key === t);
  if (!a) return;
  const r = Zx.find((s) => s.id === a.tier);
  if (!r) return;
  const l = document.querySelectorAll(
    'button[aria-expanded="false"][aria-controls]'
  );
  for (const s of l)
    if (s.textContent?.includes(r.title)) {
      s.click();
      return;
    }
}
function mb(t) {
  if (!t) return;
  const a = t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" ? t : t.querySelector("input, textarea, select, button");
  t.scrollIntoView({ behavior: "smooth", block: "center" }), a?.focus({ preventScroll: !0 });
}
var GO = "_1smvon90", ur = "_1smvon91", cr = "_1smvon92", fr = "_1smvon93", Ru = "_1smvon94", Kd = "_1smvon95 _1smvon94", IO = "_1smvon96", ZO = "_1smvon97";
const QO = [
  { value: "rife", label: "RIFE (auto)" },
  { value: "rife_torch", label: "RIFE torch" },
  { value: "rife_ncnn", label: "RIFE ncnn" },
  { value: "ffmpeg", label: "ffmpeg minterpolate" }
];
function FO() {
  const { settings: t, setSettings: a } = Gi(), [r, l] = N.useState(t), [s, u] = N.useState(!1), c = N.useMemo(
    () => Object.keys(r).some(
      (m) => r[m] !== t[m]
    ),
    [r, t]
  ), h = (m, y) => {
    l((p) => ({ ...p, [m]: y }));
  }, g = async () => {
    u(!0);
    try {
      const m = await F2(r);
      a(m), l(m), gr.success("Settings saved. Applied to new renders.");
    } catch {
      gr.error("Could not save settings.");
    } finally {
      u(!1);
    }
  };
  return /* @__PURE__ */ S.jsxs(
    ni,
    {
      title: "Defaults",
      description: "Applied as the starting values for new renders. Environment levers tune the backend.",
      children: [
        /* @__PURE__ */ S.jsxs("div", { className: GO, children: [
          /* @__PURE__ */ S.jsxs("label", { className: ur, children: [
            /* @__PURE__ */ S.jsx("span", { className: cr, children: "Models directory" }),
            /* @__PURE__ */ S.jsx(
              "input",
              {
                className: Ru,
                value: r.modelsDir,
                placeholder: "Resolved under the host data dir",
                onChange: (m) => h("modelsDir", m.target.value)
              }
            ),
            /* @__PURE__ */ S.jsx("span", { className: fr, children: "Weights root. Leave empty to use the host data dir." })
          ] }),
          /* @__PURE__ */ S.jsxs("label", { className: ur, children: [
            /* @__PURE__ */ S.jsx("span", { className: cr, children: "Output directory" }),
            /* @__PURE__ */ S.jsx(
              "input",
              {
                className: Ru,
                value: r.outputDir,
                placeholder: "Default workspace output",
                onChange: (m) => h("outputDir", m.target.value)
              }
            ),
            /* @__PURE__ */ S.jsx("span", { className: fr, children: "Where rendered mp4s are written." })
          ] }),
          /* @__PURE__ */ S.jsxs("label", { className: ur, children: [
            /* @__PURE__ */ S.jsx("span", { className: cr, children: "Attention backend (SVI2_ATTENTION)" }),
            /* @__PURE__ */ S.jsx(
              "select",
              {
                className: Kd,
                value: r.attentionBackend,
                onChange: (m) => h("attentionBackend", m.target.value),
                children: G2.map((m) => /* @__PURE__ */ S.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ S.jsx("span", { className: fr, children: "flash2 recommended; sdpa is the always-works fallback." })
          ] }),
          /* @__PURE__ */ S.jsxs("label", { className: ur, children: [
            /* @__PURE__ */ S.jsx("span", { className: cr, children: "FP8 compute (SVI2_FP8_COMPUTE)" }),
            /* @__PURE__ */ S.jsx(
              "select",
              {
                className: Kd,
                value: r.fp8Compute,
                onChange: (m) => h("fp8Compute", m.target.value),
                children: I2.map((m) => /* @__PURE__ */ S.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ S.jsx("span", { className: fr, children: "bf16 fixes the Blackwell scaled_mm colour smudge." })
          ] }),
          /* @__PURE__ */ S.jsxs("label", { className: ur, children: [
            /* @__PURE__ */ S.jsx("span", { className: cr, children: "Blocks to swap" }),
            /* @__PURE__ */ S.jsx(
              "input",
              {
                className: Ru,
                type: "number",
                min: 0,
                max: 40,
                value: r.blocksToSwap,
                onChange: (m) => h("blocksToSwap", Number(m.target.value))
              }
            ),
            /* @__PURE__ */ S.jsx("span", { className: fr, children: "40 = 16 GB-safe (most offload, lowest VRAM peak)." })
          ] }),
          /* @__PURE__ */ S.jsxs("label", { className: ur, children: [
            /* @__PURE__ */ S.jsx("span", { className: cr, children: "Interpolation method" }),
            /* @__PURE__ */ S.jsx(
              "select",
              {
                className: Kd,
                value: r.interpolateMethod,
                onChange: (m) => h("interpolateMethod", m.target.value),
                children: QO.map((m) => /* @__PURE__ */ S.jsx("option", { value: m.value, children: m.label }, m.value))
              }
            ),
            /* @__PURE__ */ S.jsx("span", { className: fr, children: "rife → ffmpeg fallback by default." })
          ] }),
          /* @__PURE__ */ S.jsxs("label", { className: ur, children: [
            /* @__PURE__ */ S.jsx("span", { className: cr, children: "Interpolate target fps" }),
            /* @__PURE__ */ S.jsx(
              "input",
              {
                className: Ru,
                type: "number",
                min: 0,
                max: 120,
                value: r.interpolateFps,
                onChange: (m) => h("interpolateFps", Number(m.target.value))
              }
            ),
            /* @__PURE__ */ S.jsx("span", { className: fr, children: "0 = off. 48 from 16 = ×3 smooth playback." })
          ] })
        ] }),
        /* @__PURE__ */ S.jsxs("div", { className: IO, children: [
          /* @__PURE__ */ S.jsx(ii, { loading: s, disabled: !c, onClick: () => void g(), children: "Save settings" }),
          /* @__PURE__ */ S.jsx(
            ii,
            {
              variant: "secondary",
              onClick: () => l(t),
              disabled: s || !c,
              children: "Discard changes"
            }
          ),
          c && /* @__PURE__ */ S.jsx("span", { className: ZO, role: "status", children: "Unsaved changes" })
        ] })
      ]
    }
  );
}
var KO = "_1ugwva20", PO = "_1ugwva21", JO = "_1ugwva22", WO = "_1ugwva23", e8 = "_1ugwva24", t8 = "_1ugwva25", n8 = "_1ugwva26", a8 = "_1ugwva27", i8 = "_1ugwva28";
const r8 = [
  { to: "recipe", label: "Recipe" },
  { to: "dag", label: "Pipeline" },
  { to: "settings", label: "Settings" }
];
function l8() {
  const t = W_(), { deploymentId: a } = $_(), r = o8(t.catalog?.presets ?? []);
  return /* @__PURE__ */ S.jsxs(Z3, { initialSettings: t.settings, initialPreset: r, children: [
    /* @__PURE__ */ S.jsxs("div", { className: KO, children: [
      /* @__PURE__ */ S.jsxs("header", { className: PO, children: [
        /* @__PURE__ */ S.jsxs("div", { className: JO, children: [
          /* @__PURE__ */ S.jsx("h1", { className: WO, children: "SVI 2.0 Pro" }),
          /* @__PURE__ */ S.jsx("p", { className: e8, children: "Long, identity-locked image-to-video from a single anchor image. Chain 4n+1-frame clips with the error-recycling SVI LoRA for coherent long takes." })
        ] }),
        /* @__PURE__ */ S.jsx("nav", { className: t8, "aria-label": "Workspace views", children: r8.map((l) => /* @__PURE__ */ S.jsx(
          n1,
          {
            to: `/${a}/${l.to}`,
            className: ({ isActive: s }) => [n8, s ? a8 : ""].filter(Boolean).join(" "),
            children: l.label
          },
          l.to
        )) })
      ] }),
      /* @__PURE__ */ S.jsx("main", { className: i8, children: /* @__PURE__ */ S.jsx(d2, {}) })
    ] }),
    /* @__PURE__ */ S.jsx(xz, { position: "bottom-right", theme: "dark", richColors: !0 })
  ] });
}
function o8(t) {
  return t.find((a) => a.id === Vo) ?? t[0] ?? null;
}
async function s8() {
  const [t, a] = await Promise.all([
    r1().catch(() => null),
    Q2().catch(() => i1)
  ]);
  return { catalog: t, settings: a };
}
function u8() {
  return [
    {
      path: "/",
      loader: () => uy("/default/recipe")
    },
    {
      path: "/:deploymentId",
      loader: s8,
      Component: l8,
      children: [
        {
          index: !0,
          loader: ({ params: t }) => uy(`/${c8(t, "deploymentId")}/recipe`)
        },
        { path: "recipe", Component: qO },
        { path: "dag", Component: Jz },
        { path: "settings", Component: FO }
      ]
    }
  ];
}
function c8(t, a) {
  const r = t[a];
  if (!r)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return r;
}
const pb = "ext-actions-request", f8 = "ext-actions-declare", d8 = "ext-action-state", gb = "ext-action-invoke", Ch = "svi2-pro:navigate", yb = "svi2-pro.render", vb = "svi2-pro.dag";
function h8(t, a) {
  let r = !1, l = !1;
  const s = () => ({
    id: yb,
    label: r ? "Rendering…" : "Render",
    icon: r ? "hourglass_top" : "movie",
    tone: "primary",
    state: r ? "loading" : l ? "disabled" : "idle",
    tooltip: l ? "Fix the highlighted fields before rendering" : "Start the SVI 2.0 Pro render"
  }), u = () => ({
    primary: s(),
    secondary: {
      id: vb,
      label: "Pipeline",
      icon: "account_tree",
      tone: "secondary",
      tooltip: "Open the pipeline DAG view"
    }
  }), c = () => {
    t.dispatchEvent(
      new CustomEvent(f8, { detail: { actions: u() }, bubbles: !1 })
    );
  }, h = () => {
    t.dispatchEvent(
      new CustomEvent(d8, { detail: { action: s() }, bubbles: !1 })
    );
  }, g = () => c(), m = (p) => {
    const v = p.detail?.id;
    v === yb ? wz() : v === vb && t.dispatchEvent(
      new CustomEvent(Ch, {
        detail: { path: `/${a}/dag` },
        bubbles: !1
      })
    );
  }, y = _z((p) => {
    r = p.busy, l = p.blocked, h();
  });
  return t.addEventListener(pb, g), t.addEventListener(gb, m), c(), {
    dispose: () => {
      y(), t.removeEventListener(pb, g), t.removeEventListener(gb, m);
    }
  };
}
const Th = "svi2-pro-app", m8 = "ext-event", bb = "svi2-pro-stylesheet", xb = ["accent", "density", "card"];
function p8(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function g8() {
  if (typeof document > "u" || document.getElementById(bb)) return;
  const t = new URL("./svi2-pro.css", import.meta.url).href, a = document.createElement("link");
  a.id = bb, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
g8();
class y8 extends HTMLElement {
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
    this.root = SE.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(Ch, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = h8(this, a), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (r) => {
      const l = r.detail?.path;
      l && this.router && this.router.navigate(l);
    };
    this.navigateListener = a, this.addEventListener(Ch, a);
  }
  syncTweaksFromBody() {
    for (const a of xb) {
      const r = p8(a);
      r === void 0 ? delete this.dataset[a] : this.dataset[a] !== r && (this.dataset[a] = r);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: xb.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), r = o2(u8(), { initialEntries: [a] });
    this.router = r, this.root.render(
      /* @__PURE__ */ S.jsx(N.StrictMode, { children: /* @__PURE__ */ S.jsx(u2, { router: r }) })
    );
  }
  resolveInitialEntry() {
    const a = this.getAttribute("route");
    if (a && a.length > 0) return a;
    const r = this.getAttribute("deployment-id");
    return r && r.length > 0 ? `/${r}/recipe` : "/";
  }
  emitHostEvent(a, r) {
    this.dispatchEvent(
      new CustomEvent(m8, {
        detail: { topic: a, payload: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function v8() {
  typeof customElements > "u" || customElements.get(Th) || customElements.define(Th, y8);
}
typeof customElements < "u" && !customElements.get(Th) && v8();
export {
  v8 as register
};
//# sourceMappingURL=svi2-pro.js.map
